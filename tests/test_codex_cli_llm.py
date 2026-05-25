# tests/test_codex_cli_llm.py
import json
import os
from unittest.mock import patch, MagicMock


def test_provider_class_exists():
    from agents.codex_cli_llm import CodexCLIProvider

    p = CodexCLIProvider()
    assert callable(p.completion)


def test_render_chat_serializes_message_roles():
    from agents.codex_cli_llm import CodexCLIProvider

    p = CodexCLIProvider()
    rendered = p._render_chat(
        [
            {"role": "system", "content": "you are X"},
            {"role": "user", "content": "say Y"},
            {"role": "assistant", "content": "ok"},
            {"role": "tool", "name": "calc", "content": "42"},
        ]
    )
    assert "[SYSTEM]" in rendered and "you are X" in rendered
    assert "[USER]" in rendered and "say Y" in rendered
    assert "[ASSISTANT]" in rendered and "ok" in rendered
    assert "[TOOL_RESULT" in rendered and "42" in rendered


def test_completion_invokes_codex_with_correct_flags():
    from agents.codex_cli_llm import CodexCLIProvider

    p = CodexCLIProvider()
    fake_response = {"choices": [{"message": {"role": "assistant", "content": "OK"}}]}
    fake_proc = MagicMock(returncode=0)
    fake_proc.communicate.return_value = (b"", b"")
    with (
        patch(
            "agents.codex_cli_llm.subprocess.Popen", return_value=fake_proc
        ) as mock_popen,
        patch("agents.codex_cli_llm.open", create=True) as mock_open,
    ):
        mock_file = MagicMock()
        mock_file.__enter__ = lambda s: mock_file
        mock_file.__exit__ = lambda *a: None
        mock_file.read = MagicMock(return_value=json.dumps(fake_response))
        mock_open.return_value = mock_file
        try:
            p.completion("codex/t1-light", [{"role": "user", "content": "hi"}])
        except Exception:
            # If parsing fails on the mock, we still want to verify the Popen call shape
            pass
        args, kwargs = mock_popen.call_args
        cmd = args[0]
        # Launcher-agnostic: argv[0..] is the platform-resolved codex launcher (bare "codex" on
        # Linux/Docker; the native exe or a cmd.exe shim on Windows). Assert the codex sub-command
        # + flag contract, not the exact launcher token.
        assert "exec" in cmd
        exec_i = cmd.index("exec")
        assert any("codex" in str(tok).lower() for tok in cmd[: exec_i + 1])
        assert "--profile" in cmd and "t1-light" in cmd
        assert "--model" in cmd and "gpt-5.5" in cmd
        assert "--json" in cmd and "--ephemeral" in cmd
        assert cmd[-1] == "-"  # stdin prompt marker (last arg)


def test_completion_env_allowlist():
    from agents.codex_cli_llm import CodexCLIProvider

    p = CodexCLIProvider()
    fake_proc = MagicMock(returncode=0)
    fake_proc.communicate.return_value = (b"", b"")
    with (
        patch.dict(
            os.environ,
            {
                "CODEX_HOME": "/test/codex/home",
                "PATH": "/usr/bin",
                "SECRET_KEY": "should-not-leak",
                "AWS_ACCESS_KEY": "should-not-leak-either",
            },
            clear=False,
        ),
        patch(
            "agents.codex_cli_llm.subprocess.Popen", return_value=fake_proc
        ) as mock_popen,
    ):
        try:
            p.completion("codex/deep-review-exec", [{"role": "user", "content": "hi"}])
        except Exception:
            pass
        env_passed = mock_popen.call_args.kwargs.get("env", {})
        assert "CODEX_HOME" in env_passed
        assert "PATH" in env_passed
        assert "SECRET_KEY" not in env_passed
        assert "AWS_ACCESS_KEY" not in env_passed


def test_completion_non_zero_returncode_invokes_spillover():
    from agents.codex_cli_llm import CodexCLIProvider

    p = CodexCLIProvider()
    fake_proc = MagicMock(returncode=1)
    fake_proc.communicate.return_value = (b"", b"codex failed")
    with patch("agents.codex_cli_llm.subprocess.Popen", return_value=fake_proc):
        with patch.object(p, "_spillover") as mock_spill:
            mock_spill.return_value = "spillover-result"
            p.completion("codex/t1-light", [{"role": "user", "content": "hi"}])
            mock_spill.assert_called_once()


def test_response_schema_is_openai_strict_valid():
    """Every object node in the output schema must set additionalProperties:false and list all
    of its properties in required[] — OpenAI strict structured-output rejects otherwise with a
    400 invalid_json_schema. Regression guard for the bug the W376 live e2e surfaced (the mocked
    subprocess in the other tests never reaches the model backend that validates the schema)."""
    from agents.codex_cli_llm import LITELLM_RESPONSE_SCHEMA

    def check(node):
        if isinstance(node, dict):
            if node.get("type") == "object":
                assert node.get("additionalProperties") is False, (
                    f"object node missing additionalProperties:false -> {node}"
                )
                props = set(node.get("properties", {}).keys())
                required = set(node.get("required", []))
                assert props == required, (
                    f"required[] must equal all properties; props={props} required={required}"
                )
            for value in node.values():
                check(value)
        elif isinstance(node, list):
            for value in node:
                check(value)

    check(LITELLM_RESPONSE_SCHEMA)


def test_codex_argv_prefix_resolves_launcher():
    """argv prefix ends at the codex 'exec' sub-command and names a codex launcher.
    Linux/Docker returns bare 'codex'; Windows resolves the native exe or cmd.exe shim."""
    from agents.codex_cli_llm import _codex_argv_prefix

    prefix = _codex_argv_prefix()
    assert isinstance(prefix, list) and prefix, "prefix must be a non-empty list"
    assert any("codex" in str(tok).lower() or tok == "cmd" for tok in prefix)
