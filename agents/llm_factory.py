# agents/llm_factory.py
"""γ-hybrid LLM factory per spec §5 v6.

- make_routine_llm(): native LLM.subscription_login(vendor='openai', model=OPENHANDS_SUBSCRIPTION_MODEL)
                      for OpenHands routine turns. $0 cost via ChatGPT-OAuth.
- make_jury_llm():    LLM(model='codex/deep-review-exec') routed through CodexCLIProvider
                      LiteLLM CustomLLM (wired in P3.1) for GPT-5.5 L3 jury.

Env hedge OPENHANDS_SUBSCRIPTION_MODEL: default 'gpt-5.3-codex'; fallback 'gpt-5.2-codex' per V6
(SDK allow-list OPENAI_CODEX_MODELS @ openhands-sdk/openhands/sdk/llm/auth/openai.py:132-140).
"""

import inspect
import os

from openhands.sdk import LLM
from openhands.sdk.llm.auth.openai import subscription_login_async

from agents.trace_redaction import (  # codex r5 D2-R2-P0-3: redact before trace emit
    redact_llm_trace_payload,
)

OPENHANDS_SUBSCRIPTION_MODEL_DEFAULT = "gpt-5.3-codex"


def get_subscription_model() -> str:
    """Resolve the routine subscription model from env hedge."""
    return os.environ.get(
        "OPENHANDS_SUBSCRIPTION_MODEL", OPENHANDS_SUBSCRIPTION_MODEL_DEFAULT
    )


def make_routine_llm() -> LLM:
    """Routine OpenHands LLM via subscription_login (PKCE OAuth, $0 cost).

    SYNC entry point — for use only OUTSIDE a running asyncio event loop. The
    SDK's sync subscription_login() internally calls asyncio.run(...), which
    raises RuntimeError when called from a running event loop (e.g. inside a
    Temporal activity). Use make_routine_llm_async() from async contexts.

    Cite: openhands-sdk/openhands/sdk/llm/auth/openai.py:825 (sync wrapper);
    DIM-16 e2e finding (live worker boot 2026-05-22).
    """
    return LLM.subscription_login(
        vendor="openai",
        model=get_subscription_model(),
        force_login=False,
        open_browser=False,
    )


class _Usage:
    """Minimal token-usage carrier surfaced to the Langfuse generation hook.

    Mirrors the ``usage.input`` / ``usage.output`` / ``usage.total`` attribute
    surface the spec's ``_on_generation`` expects. Real SDK usage objects expose
    the same triple; this stand-in is used until the SDK call-hook is wired.
    """

    __slots__ = ("input", "output", "total")

    def __init__(self, prompt_tokens: int, completion_tokens: int) -> None:
        self.input = prompt_tokens
        self.output = completion_tokens
        self.total = prompt_tokens + completion_tokens


class _LangfuseRoutineLLM:
    """Thin async wrapper binding a routine LLM to a Langfuse generation hook.

    codex r4 D5-finding-1 + codex r5 D2-R2-P0-3: every ``acomplete()`` emits a
    Langfuse generation whose ``input``/``output`` are redacted via
    ``redact_llm_trace_payload()`` BEFORE cross-process trace emission, with token
    attribution in ``usage={prompt_tokens, completion_tokens, total_tokens}``.

    The wrapper delegates all non-``acomplete`` attribute access to the underlying
    SDK ``LLM`` so existing call sites that touch ``.model`` / ``.config`` keep
    working.
    """

    def __init__(self, llm, on_generation, model: str) -> None:
        self._llm = llm
        self._on_generation = on_generation
        self._model = model

    def __getattr__(self, name):
        # Delegate everything we do not override to the wrapped SDK LLM.
        return getattr(self._llm, name)

    async def acomplete(self, messages=None, **kwargs):
        """Run a routine completion and emit a redacted Langfuse generation.

        Returns the underlying SDK response when the wrapped LLM exposes an
        ``acomplete``; otherwise returns a minimal echo dict so the trace path is
        still exercised (used in tests where the SDK LLM is not a real client).
        """
        messages = messages or []
        prompt = "\n".join(
            str(m.get("content", "")) for m in messages if isinstance(m, dict)
        )

        # Delegate to the real SDK LLM when available; fall back to an echo so the
        # generation hook (and its redaction chokepoint) is always exercised.
        completion_text = ""
        usage = _Usage(prompt_tokens=len(prompt.split()), completion_tokens=0)
        inner = getattr(self._llm, "acomplete", None)
        if callable(inner):
            response = inner(messages=messages, **kwargs)
            if inspect.isawaitable(response):
                response = await response
            completion_text = _extract_text(response)
            usage = _extract_usage(response, prompt, completion_text)
        else:
            response = {"choices": [{"message": {"content": completion_text}}]}

        # Emit Langfuse generation through the redaction chokepoint.
        self._on_generation(self._model, prompt, completion_text, usage)
        return response


def _extract_text(response) -> str:
    """Best-effort text extraction from an SDK/LiteLLM response or dict."""
    if response is None:
        return ""
    choices = getattr(response, "choices", None)
    if choices is None and isinstance(response, dict):
        choices = response.get("choices")
    if choices:
        first = choices[0]
        msg = getattr(first, "message", None)
        if msg is None and isinstance(first, dict):
            msg = first.get("message", {})
        content = getattr(msg, "content", None)
        if content is None and isinstance(msg, dict):
            content = msg.get("content", "")
        return content or ""
    return ""


def _extract_usage(response, prompt: str, completion: str) -> "_Usage":
    """Pull token usage from a response, else estimate from word counts."""
    usage = getattr(response, "usage", None)
    if usage is None and isinstance(response, dict):
        usage = response.get("usage")
    if usage is not None:
        pt = (
            getattr(usage, "prompt_tokens", None)
            or (usage.get("prompt_tokens") if isinstance(usage, dict) else None)
            or 0
        )
        ct = (
            getattr(usage, "completion_tokens", None)
            or (usage.get("completion_tokens") if isinstance(usage, dict) else None)
            or 0
        )
        return _Usage(prompt_tokens=int(pt), completion_tokens=int(ct))
    return _Usage(
        prompt_tokens=len(prompt.split()), completion_tokens=len(completion.split())
    )


async def make_routine_llm_async(conversation_id: str) -> LLM:
    """Build a routine-tier LLM bound to a Langfuse generation handle.

    Per spec §7.2 + codex r4 D5-finding-1 + codex r5 D5-O2: routine LLM calls MUST
    emit a Langfuse ``generation`` with ``usage={prompt_tokens, completion_tokens,
    total_tokens}`` so token attribution flows into the same trace as the
    workflow-level span. ``conversation_id`` is REQUIRED (positional, no default)
    so the Langfuse ``session_id`` never silently becomes ``""`` — callers MUST
    pass ``spec.conversation_id`` from ``openhands_run_activity()`` to preserve the
    cross-tier (workflow ↔ routine LLM ↔ jury) trace-correlation invariant.

    Async variant — REQUIRED from inside Temporal activities or any running event
    loop. Calls subscription_login_async directly, avoiding the sync wrapper's
    nested asyncio.run() error (DIM-16).

    Cite: openhands-sdk/openhands/sdk/llm/auth/openai.py:752 (async entry);
    codex r4 D5-finding-1 + codex r5 D5-O2 + codex r5 D2-R2-P0-3.
    """
    # codex r5 D5-O2 hard-fail: empty conversation_id breaks Langfuse session correlation.
    if not conversation_id:
        raise ValueError(
            "codex r5 D5-O2: conversation_id required (was empty); "
            "pass spec.conversation_id from openhands_run_activity()"
        )

    # W376 IF-1: lazy langfuse import — module import must NOT pull langfuse (the
    # batch_evaluation submodule trips pydantic.v1 ConfigError on the broken
    # C:\Python314 interpreter; only the venv imports it cleanly).
    # W376 PHASE D P1-1: also import the module-level ``propagate_attributes`` context
    # manager (langfuse 4.2.0) — it is NOT an instance method, so it must be imported
    # from the package, alongside ``Langfuse``.
    from langfuse import (
        Langfuse,
        propagate_attributes,
    )  # codex r4 D5-finding-1 + r-shipgate P1-1

    # 1) caller-driven OAuth refresh + build the routine LLM (existing impl, DIM-16).
    llm = await subscription_login_async(
        vendor="openai",
        model=get_subscription_model(),
        force_login=False,
        open_browser=False,
    )

    # 2) wire Langfuse generation handle (session_id = conversation_id).
    langfuse = Langfuse(
        public_key=os.environ.get("LANGFUSE_PUBLIC_KEY"),
        secret_key=os.environ.get("LANGFUSE_SECRET_KEY"),
        host=os.environ.get("LANGFUSE_HOST"),
    )

    def _on_generation(model: str, prompt, completion, usage) -> None:
        """LLM call-hook: emit Langfuse generation event with token attribution.

        codex r5 D2-R2-P0-3: prompt + completion are redacted BEFORE Langfuse
        ``input=``/``output=`` so hostile task content cannot inject OAuth/session/
        env secrets into the trace. Redaction is enforced HERE (single chokepoint)
        — spec §6.4 §1011-1038.

        W376 IF-1: migrated to langfuse 4.2.0 ``start_as_current_observation`` API
        (v2 ``langfuse.trace()`` + ``trace.generation()`` were removed in v4).

        W376 PHASE D P1-1 (codex ship-gate): session correlation MUST ride on the
        langfuse-native session attribute, NOT ``metadata={"session_id": ...}``.
        In langfuse 4.2.0 session-level token/cost rollups key off the OTel session
        attribute set via the module-level ``propagate_attributes(session_id=...)``
        context manager — arbitrary ``metadata`` keys are NOT indexed for session
        aggregation. We open the generation as the *current* span (so the propagated
        session attribute attaches to it) inside that context.
        """
        # codex r5 D2-R2-P0-3: scrub OAuth/session/env-looking secrets BEFORE emit.
        redacted_prompt = redact_llm_trace_payload(prompt)
        redacted_completion = redact_llm_trace_payload(completion)
        # P1-1: propagate the langfuse-native session attribute across this span.
        with propagate_attributes(session_id=conversation_id):
            with langfuse.start_as_current_observation(
                name=model,
                as_type="generation",
                input=redacted_prompt,
            ) as gen:
                gen.update(
                    model=model,
                    output=redacted_completion,
                    usage_details={
                        "input": usage.input,
                        "output": usage.output,
                        "total": usage.total,
                    },
                )
        langfuse.flush()  # v4 explicit flush

    # Attach the hook on the raw LLM (introspectable) and return a wrapper whose
    # acomplete() drives the hook through the redaction chokepoint.
    try:
        llm._on_generation = _on_generation  # noqa: SLF001
    except (AttributeError, ValueError):
        # Some SDK LLM models are frozen pydantic objects; the wrapper still carries
        # the hook, so trace emission is unaffected.
        pass
    return _LangfuseRoutineLLM(llm, _on_generation, get_subscription_model())


def make_jury_llm() -> LLM:
    """L3 codex jury LLM (Path B GPT-5.5 via CodexCLIProvider, wired in P3.1)."""
    return LLM(model="codex/deep-review-exec", max_output_tokens=16384)
