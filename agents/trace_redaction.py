# agents/trace_redaction.py
"""codex r3 D2-R2-P0-1 fix: redact secrets from LLM-trace payloads BEFORE they
reach Langfuse / OTel.

Without redaction, attacker-controlled task content can exfiltrate a
session_api_key or an OAuth refresh-token via the trace sink. This module is the
single chokepoint: both the routine-LLM path (agents/llm_factory.py:_on_generation)
and the L3 jury path (agents/jury_activity.py:_emit_jury_generation) call
`redact_llm_trace_payload()` BEFORE every Langfuse `input=`/`output=` and before
every OTel `llm.input`/`llm.output` span attribute.

Patterns scrubbed (spec §7.2.3):
  1. ``Bearer <token>``                       -> ``Bearer [REDACTED]``
  2. ``OH_SESSION_API_KEYS_<n>=<value>``       -> ``OH_SESSION_API_KEYS_<n>=[REDACTED]``
  3. ``OH_SECRET_KEY=<value>``                 -> ``OH_SECRET_KEY=[REDACTED]``
  4. ``oauth_refresh_token=<value>``           -> ``oauth_refresh_token=[REDACTED]``
  5. JWT triplet ``eyJ....<.>.<.>``            -> ``[REDACTED_JWT]``
  6. generic ``token|secret|password|api_key = <value>`` -> ``...=[REDACTED]``

Cite: spec §6.4 §1011-1038 + spec §7.2.3 + codex r3 D2-R2-P0-1 + codex r5 D2-R2-P0-3.
"""

from __future__ import annotations

import re

# Ordered list of (compiled-pattern, replacement). Order matters: the JWT-triplet
# rule must run AFTER the ``Bearer``/``Authorization`` rule so a ``Bearer <jwt>``
# collapses to ``Bearer [REDACTED]`` (rule 1) rather than ``Bearer [REDACTED_JWT]``.
_REDACTION_RULES: list[tuple[re.Pattern[str], str]] = [
    # 1) Bearer tokens (incl. Authorization: Bearer ...). \S+ greedily consumes the
    #    whole token (a JWT triplet has no whitespace, so it is fully eaten here).
    (re.compile(r"Bearer\s+\S+"), "Bearer [REDACTED]"),
    # 2) OH_SESSION_API_KEYS_<n>=<value>
    (re.compile(r"OH_SESSION_API_KEYS_\d+=\S+"), lambda m: _kv_redact(m)),  # type: ignore[list-item]
    # 3) OH_SECRET_KEY=<value>
    (re.compile(r"OH_SECRET_KEY=\S+"), "OH_SECRET_KEY=[REDACTED]"),
    # 4) oauth_refresh_token=<value>
    (re.compile(r"oauth_refresh_token=\S+"), "oauth_refresh_token=[REDACTED]"),
    # 5) Bare JWT triplet (header.payload.signature) — fires only if not already
    #    swallowed by the Bearer rule above.
    (
        re.compile(r"eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+"),
        "[REDACTED_JWT]",
    ),
    # 6) Generic key=value for token/secret/password/api_key (case-insensitive key).
    #    Preserves the key + delimiter (= or :), redacts the value.
    (
        re.compile(
            r"(?P<key>token|secret|password|api[_-]?key)(?P<delim>\s*[:=]\s*)\S+",
            re.IGNORECASE,
        ),
        r"\g<key>\g<delim>[REDACTED]",
    ),
]


def _kv_redact(match: re.Match[str]) -> str:
    """Redact the value of a ``KEY=value`` match, preserving the key + ``=``."""
    key = match.group(0).split("=", 1)[0]
    return f"{key}=[REDACTED]"


def redact_llm_trace_payload(payload: str) -> str:
    """Return ``payload`` with secret-looking substrings replaced by ``[REDACTED]``.

    Non-string inputs are coerced via ``str()`` so the chokepoint is total — a
    caller can never accidentally emit a raw secret object to the trace sink.
    Idempotent: re-running on already-redacted output is a no-op for the redacted
    spans.

    codex r3 D2-R2-P0-1: this is the ONLY place LLM prompt/completion text is
    sanitised before cross-process trace emission.
    """
    if payload is None:
        return ""
    if not isinstance(payload, str):
        payload = str(payload)

    out = payload
    for pattern, replacement in _REDACTION_RULES:
        out = pattern.sub(replacement, out)
    return out
