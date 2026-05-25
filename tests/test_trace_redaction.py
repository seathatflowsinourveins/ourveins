# tests/test_trace_redaction.py (codex r3 D2-R2-P0-1)
"""codex r3 D2-R2-P0-1 fix: redact_llm_trace_payload() MUST strip OAuth/JWT/Bearer/
OH_SESSION/OH_SECRET/env-secret patterns BEFORE the payload reaches Langfuse/OTel.

Without redaction, attacker-controlled task content can exfiltrate session_api_key
or OAuth refresh-tokens via the trace sink.

DEVIATION FROM PLAN (reported to orchestrator): two install-time realities forced
small test-only adjustments (production code follows the plan verbatim):
  1. openhands-sdk==1.22.1 is NOT installed in this venv -> a fake ``openhands.sdk``
     is injected into sys.modules before importing agents.llm_factory (mirrors
     tests/test_workspace_factory.py).
  2. The installed langfuse==4.2.0 has NO ``Langfuse.trace()`` method (W376 IF-1
     migrated production to the v4 ``langfuse.start_observation(...)`` API); so this
     test patches ``agents.llm_factory.Langfuse`` with a MagicMock. The behavioural
     assertion the test verifies (input AND output both flow through
     redact_llm_trace_payload before trace emission) is unchanged.
"""

import sys
import types
from unittest.mock import AsyncMock, MagicMock

import pytest


def _install_openhands_stub() -> None:
    if "openhands.sdk.llm.auth.openai" in sys.modules:
        return
    pkg = types.ModuleType("openhands")
    sdk = types.ModuleType("openhands.sdk")
    llm_pkg = types.ModuleType("openhands.sdk.llm")
    auth_pkg = types.ModuleType("openhands.sdk.llm.auth")
    openai_mod = types.ModuleType("openhands.sdk.llm.auth.openai")
    sdk.LLM = MagicMock(name="LLM")  # type: ignore[attr-defined]

    async def _subscription_login_async(**kwargs):
        llm = MagicMock(name="RoutineLLM")
        llm.acomplete = AsyncMock(
            return_value={
                "choices": [{"message": {"content": "ok"}}],
                "usage": {"prompt_tokens": 5, "completion_tokens": 2},
            }
        )
        return llm

    openai_mod.subscription_login_async = _subscription_login_async  # type: ignore[attr-defined]
    sys.modules["openhands"] = pkg
    sys.modules["openhands.sdk"] = sdk
    sys.modules["openhands.sdk.llm"] = llm_pkg
    sys.modules["openhands.sdk.llm.auth"] = auth_pkg
    sys.modules["openhands.sdk.llm.auth.openai"] = openai_mod


_install_openhands_stub()


# gitleaks:allow — test fixtures are clearly-fake placeholders; not real secrets
@pytest.mark.parametrize(
    "raw,expected_redacted_token",
    [
        (
            "Bearer FAKE_TEST_TOKEN_aaaaaaaaaaaaaaaa",
            "Bearer [REDACTED]",
        ),  # gitleaks:allow
        (
            "Authorization: Bearer FAKE_JWT.FAKE_PAYLOAD.FAKE_SIG",
            "Authorization: Bearer [REDACTED]",
        ),  # gitleaks:allow
        (
            "OH_SESSION_API_KEYS_0=FAKE_TEST_FIXTURE_PLACEHOLDER",
            "OH_SESSION_API_KEYS_0=[REDACTED]",
        ),  # gitleaks:allow
        (
            "OH_SECRET_KEY=FAKE_TEST_FIXTURE_PLACEHOLDER",
            "OH_SECRET_KEY=[REDACTED]",
        ),  # gitleaks:allow
        (
            "oauth_refresh_token=FAKE-TEST-REFRESH-PLACEHOLDER",
            "oauth_refresh_token=[REDACTED]",
        ),  # gitleaks:allow
        # JWT triplet — fake structure
        (
            "eyJFAKE_HEADER.FAKE_PAYLOAD.FAKE_SIGNATURE",
            "[REDACTED_JWT]",
        ),  # gitleaks:allow
    ],
)
def test_redact_strips_secret_patterns(raw, expected_redacted_token):
    from agents.trace_redaction import redact_llm_trace_payload

    out = redact_llm_trace_payload(raw)
    assert "[REDACTED" in out, f"redaction did not fire for: {raw!r}"
    # raw secret value must NOT appear in output
    if "Bearer " in raw:
        secret = raw.split("Bearer ", 1)[1]
        assert secret not in out


@pytest.mark.asyncio
async def test_langfuse_path_invokes_redaction():
    """codex r3 D2-R2-P0-1: every Langfuse input/output MUST flow through redaction."""
    from unittest.mock import patch

    calls = []

    def fake_redact(payload):
        calls.append(payload)
        return "[REDACTED_BY_FAKE]"

    # W376 IF-1: v4 langfuse — start_observation() returns the generation handle.
    mock_langfuse = MagicMock()
    mock_langfuse.start_observation.return_value = MagicMock()

    with (
        patch("agents.llm_factory.redact_llm_trace_payload", side_effect=fake_redact),
        # W376 IF-1: Langfuse is a lazy in-function import — patch at its source.
        patch("langfuse.Langfuse", return_value=mock_langfuse),
    ):
        from agents.llm_factory import make_routine_llm_async

        llm = await make_routine_llm_async(conversation_id="conv-redact-test")
        await llm.acomplete(
            messages=[{"role": "user", "content": "Bearer secret-token-1234567890"}]
        )
    # input AND output both routed through redaction:
    assert len(calls) >= 2, (
        "codex r3 D2-R2-P0-1: both input and output must call redact_llm_trace_payload"
    )
