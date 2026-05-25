import httpx
import pytest
from agents.models import TaskSpec
from agents.openhands_client import OpenHandsClient, OpenHandsError


def _c(handler):
    c = OpenHandsClient(base_url="http://oh")
    c._transport = httpx.MockTransport(handler)  # type: ignore[assignment]
    return c


@pytest.mark.asyncio
async def test_start_returns_id():
    c = _c(lambda _req: httpx.Response(200, json={"conversation_id": "abc123"}))
    assert await c.start_conversation(TaskSpec(task="t")) == "abc123"


@pytest.mark.asyncio
async def test_5xx_retryable():
    c = _c(lambda _req: httpx.Response(503, text="down"))
    with pytest.raises(OpenHandsError) as e:
        await c.start_conversation(TaskSpec(task="t"))
    assert e.value.retryable is True


@pytest.mark.asyncio
async def test_4xx_not_retryable():
    c = _c(lambda _req: httpx.Response(422, text="bad"))
    with pytest.raises(OpenHandsError) as e:
        await c.start_conversation(TaskSpec(task="t"))
    assert e.value.retryable is False


@pytest.mark.asyncio
async def test_missing_id_fails_closed():
    c = _c(lambda _req: httpx.Response(200, json={"unexpected": "shape"}))
    with pytest.raises(OpenHandsError) as e:
        await c.start_conversation(TaskSpec(task="t"))
    assert e.value.retryable is False
