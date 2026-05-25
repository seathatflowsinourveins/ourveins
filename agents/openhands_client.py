from __future__ import annotations
import os
import httpx
from agents.models import TaskSpec

DEFAULT_BASE = os.environ.get("OPENHANDS_BASE_URL", "http://127.0.0.1:3033")


class OpenHandsError(Exception):
    def __init__(self, message: str, *, retryable: bool) -> None:
        super().__init__(message)
        self.retryable = retryable


class OpenHandsClient:
    def __init__(self, base_url: str = DEFAULT_BASE, timeout: float = 30.0) -> None:
        self._base = base_url.rstrip("/")
        self._timeout = timeout
        self._transport: httpx.AsyncBaseTransport | None = None  # test seam

    def _ac(self) -> httpx.AsyncClient:
        return httpx.AsyncClient(timeout=self._timeout, transport=self._transport)

    @staticmethod
    def _check(r: httpx.Response) -> None:
        if r.status_code >= 500:
            raise OpenHandsError(f"OpenHands {r.status_code}", retryable=True)
        if r.status_code >= 400:
            raise OpenHandsError(
                f"OpenHands {r.status_code}: {r.text}", retryable=False
            )

    async def start_conversation(self, spec: TaskSpec) -> str:
        payload: dict = {"initial_message": {"role": "user", "content": spec.task}}
        if spec.repo:
            payload["selected_repository"] = spec.repo
        async with self._ac() as c:
            r = await c.post(f"{self._base}/api/v1/app-conversations", json=payload)
            self._check(r)
            data = r.json()
            cid = (
                data.get("conversation_id")
                or data.get("app_conversation_id")
                or data.get("id")
            )
            if not cid:
                raise OpenHandsError(
                    f"unexpected start schema: {data}", retryable=False
                )
            return str(cid)

    async def get_conversation(self, conversation_id: str) -> dict:
        async with self._ac() as c:
            r = await c.get(f"{self._base}/api/v1/app-conversations/{conversation_id}")
            self._check(r)
            return r.json()

    async def stop_conversation(self, conversation_id: str) -> None:
        try:
            async with self._ac() as c:
                await c.delete(
                    f"{self._base}/api/v1/app-conversations/{conversation_id}"
                )
        except Exception:
            pass
