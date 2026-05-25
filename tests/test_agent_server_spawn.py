import pytest
import uuid
from unittest.mock import MagicMock, patch, AsyncMock
from agents.models import TaskSpec, Budget


@pytest.mark.asyncio
async def test_spawn_agent_server_calls_docker_containers_run():
    """spawn_agent_server invokes docker.from_env().containers.run with
    correct image + detach + ports + labels + network."""
    from agents.agent_server_spawn import spawn_agent_server

    spec = TaskSpec(task="echo", budget=Budget(), conversation_id=str(uuid.uuid4()))

    mock_container = MagicMock()
    mock_container.id = "abc123def456"
    mock_container.attrs = {
        "NetworkSettings": {
            "Ports": {"8000/tcp": [{"HostPort": "55001"}]}  # codex r1 A2: 8000 NOT 3000
        }
    }
    mock_container.reload = MagicMock()

    mock_client = MagicMock()
    mock_client.containers.run.return_value = mock_container

    with patch("agents.agent_server_spawn.docker.from_env", return_value=mock_client):
        with patch(
            "agents.agent_server_spawn._wait_for_ready",  # codex r1 A2: /ready NOT /health
            AsyncMock(return_value=True),
        ):
            ctx = await spawn_agent_server(spec, net_name="w375-test-net")

    # Codex r1 A2 + S2 BLOCKER FIX: env minted BEFORE containers.run()
    call_kwargs = mock_client.containers.run.call_args.kwargs
    env = call_kwargs.get("environment", {})
    assert "OH_SESSION_API_KEYS_0" in env, (
        "S2 BLOCK: session_api_key MUST be in env BEFORE containers.run()"
    )
    assert "OH_SECRET_KEY" in env, (
        "S2 BLOCK: secret_key MUST be in env BEFORE containers.run()"
    )
    # ≥32-byte entropy (codex r1 S4)
    assert len(env["OH_SESSION_API_KEYS_0"]) >= 32, "S4: nonce entropy ≥32"

    # Codex r1 A2 fix: port 8000 NOT 3000
    assert "8000/tcp" in call_kwargs.get("ports", {})
    # Codex r1 S5 fix: 127.0.0.1 bind
    assert call_kwargs["ports"]["8000/tcp"] == ("127.0.0.1", None)

    # Codex r1 S5 hardening parametric (covered in NEW Task 23)
    assert call_kwargs.get("read_only") is True, "S5: read_only=True"
    assert call_kwargs.get("pids_limit") == 512, "S5: pids_limit=512"
    assert call_kwargs.get("cap_drop") == ["ALL"], "S5: cap_drop=ALL"
    assert call_kwargs.get("security_opt") == ["no-new-privileges:true"], (
        "S5: no-new-privileges"
    )

    assert call_kwargs.get("detach") is True
    assert call_kwargs.get("network") == "w375-test-net"
    labels = call_kwargs.get("labels", {})
    assert (
        labels.get("w375.purpose") == "per-task-isolation"
    )  # codex r1 R4: align with reconcile-sweep label
    assert labels.get("w375.conversation_id") == spec.conversation_id

    # Assert returned ContainerContext shape
    assert ctx.container_id == "abc123def456"
    assert ctx.port == 55001
    assert ctx.session_api_key == env["OH_SESSION_API_KEYS_0"]  # codex r1 A2: same key


@pytest.mark.asyncio
async def test_wait_for_ready_returns_true_on_200():
    """codex r2 D1-A2 + D3-r2-P0-2: use /ready NOT /health (spec §5.3)."""
    from agents.agent_server_spawn import _wait_for_ready

    mock_response = MagicMock()
    mock_response.status_code = 200

    with patch("agents.agent_server_spawn.httpx.AsyncClient") as mock_client_cls:
        mock_client = MagicMock()
        mock_client.__aenter__ = AsyncMock(return_value=mock_client)
        mock_client.__aexit__ = AsyncMock(return_value=False)
        mock_client.get = AsyncMock(return_value=mock_response)
        mock_client_cls.return_value = mock_client

        ok = await _wait_for_ready(55001)
        assert ok is True


@pytest.mark.asyncio
async def test_wait_for_ready_retries_on_503_until_200():
    """codex r2 D1-A2: /ready returns 503 until mark_initialization_complete fires."""
    from agents.agent_server_spawn import _wait_for_ready

    responses = [
        MagicMock(status_code=503),
        MagicMock(status_code=503),
        MagicMock(status_code=200),
    ]
    with patch("agents.agent_server_spawn.httpx.AsyncClient") as mock_client_cls:
        mock_client = MagicMock()
        mock_client.__aenter__ = AsyncMock(return_value=mock_client)
        mock_client.__aexit__ = AsyncMock(return_value=False)
        mock_client.get = AsyncMock(side_effect=responses)
        mock_client_cls.return_value = mock_client
        ok = await _wait_for_ready(55001)
        assert ok is True


@pytest.mark.asyncio
async def test_stop_agent_server_calls_container_stop_timeout_30_then_remove():
    """codex r2 D1-A2 + D3-r2-P0-2: graceful stop(timeout=30) NOT kill() (spec §5.5)."""
    from agents.agent_server_spawn import stop_agent_server
    from agents.workspace_factory import ContainerContext

    ctx = ContainerContext(container_id="abc", port=1234, session_api_key="sk")

    mock_container = MagicMock()
    mock_client = MagicMock()
    mock_client.containers.get.return_value = mock_container

    with patch("agents.agent_server_spawn.docker.from_env", return_value=mock_client):
        await stop_agent_server(ctx)

    mock_client.containers.get.assert_called_once_with("abc")
    mock_container.stop.assert_called_once_with(
        timeout=30
    )  # SIGTERM + 30s lifespan drain
    mock_container.remove.assert_called_once()
    mock_container.kill.assert_not_called()  # codex r2 D3-r2-P0-2: kill() is escalation-only


@pytest.mark.asyncio
async def test_failed_spawn_runs_stop_timeout_30_plus_remove():
    """codex r2 D3-r2-P0-2: failed-spawn cleanup uses stop(30)+remove, NOT kill()."""
    from agents.agent_server_spawn import spawn_agent_server

    mock_container = MagicMock()
    mock_client = MagicMock()
    mock_client.containers.run.return_value = mock_container
    # simulate /ready never coming up → spawn raises after deadline
    with (
        patch("agents.agent_server_spawn.docker.from_env", return_value=mock_client),
        patch(
            "agents.agent_server_spawn._wait_for_ready", AsyncMock(return_value=False)
        ),
    ):
        with pytest.raises(RuntimeError):
            # codex r3 D1-R2-P0-2 fix: spawn_agent_server signature is (spec, net_name)
            # — calling without net_name raised TypeError before validating cleanup path.
            await spawn_agent_server(
                spec=MagicMock(conversation_id="conv-x"),
                net_name="oh-net-test",
            )
    mock_container.stop.assert_called_once_with(timeout=30)
    mock_container.remove.assert_called_once()
    mock_container.kill.assert_not_called()
