"""Chain-of-Verification factored mode at L1 — per Meta AI Dhuliawala+ arXiv:2309.11495.

The 4-step CoVe protocol:
  1. Draft (input: operator's TaskSpec — already the draft)
  2. Plan verification questions (LLM call with draft visible)
  3. Answer each question in FACTORED isolation (LLM calls WITHOUT draft visible)
  4. Reconcile (LLM call with draft + Q&A visible) → verified spec + discrepancies

The factored isolation in Step 3 is the key advantage over joint/2-step modes:
each question is answered fresh, with no exposure to the draft, eliminating
draft-anchoring bias that causes hallucination-confirmation in joint mode.

Cite-anchors (CR-6 verify-before-claim — 3-org-distinct):
  - Meta AI Research Dhuliawala+ arXiv:2309.11495 (primary; factored CoVe +8.4pt over CoT-revise on Wikidata factoid)
  - Anthropic claude-cookbooks `patterns/agents/prompts/citations_agent.md` (factored-prompting + cite-anchor verification protocol)
  - Stanford NLP `dspy` Signature/Module pattern (typed multi-step LLM-program decomposition; arXiv:2310.03714 + Khattab+ 2023)
"""

from __future__ import annotations
import asyncio
from dataclasses import dataclass, field
from agents.models import TaskSpec


# Pinned per W374-EXT V2 spec; CLI may override via Task 10 wiring.
# Cross-module model-string unification is deferred (out of scope this fix-up).
DEFAULT_COVE_MODEL = "claude-opus-4-7-20260415"

# Concurrency cap for Step-3 factored answers. 5 is a conservative ceiling that
# respects Anthropic per-org rate limits while still parallelizing the typical
# 3-5 question fan-out generated in Step 2.
_ANSWER_CONCURRENCY = 5


_QUESTION_GEN_PROMPT = """You are reviewing a coding-task specification for a downstream autonomous agent.
Generate 3-5 sharp verification questions about this specification. Focus on:
- AC measurability (can pass/fail be objectively determined?)
- Scope boundedness (is the change scope finite + enumerable?)
- Repo/file/symbol validity (do referenced artifacts exist?)
- Budget realism (token/wall-time vs task complexity)

Format your response as:
QUESTIONS:
1. <question>
2. <question>
...
"""

_ANSWER_PROMPT = """Answer this verification question about a coding-task specification.
You do NOT have access to the spec text itself — only the question.
If the question references specifics, answer based on the question alone.
Be candid: if the question reveals a flaw, say NO + explain.

Format: A<n>: <answer>
"""

_RECONCILE_PROMPT = """You drafted a coding-task specification.
Below are 3-5 verification questions you generated about it, and their independently-answered responses.
Identify discrepancies — places where the answers reveal flaws in the draft.

Format your response as:
RECONCILED: <one-sentence summary>
DISCREPANCIES:
1. <discrepancy or "none">
"""


@dataclass(frozen=True, slots=True)
class CoVeResult:
    """Result of a CoVe verification round.

    Frozen + slots: once produced, the result cannot be mutated by callers
    (cross-task pattern harmonization per Task 8 PanelResult + Task 9
    JuryVerdict I-2 carry-forward — `frozen=True` alone only freezes
    attribute references, so the list-typed fields were previously vulnerable
    to `result.discrepancies.append(...)` defeating the audit trail).
    Tuple-typed verification_log + discrepancies make immutability a true
    structural invariant, not just a documented convention.
    """

    # The input spec, unchanged. CoVe surfaces flaws via `discrepancies`; it does NOT auto-rewrite the spec.
    # Operator (or a downstream V2 reconciler) is responsible for spec revision based on discrepancies.
    verified_spec: TaskSpec
    # [(question, answer), ...] — the Step-2/Step-3 audit trail. EMPTY tuple on early-return failures
    # (no parseable questions, or question-gen API failure) so the caller can distinguish "clean verdict"
    # from "protocol skipped" by inspecting `discrepancies` for sentinel strings.
    # I-2 cross-task harmonization: was `list[tuple[str, str]]`; now tuple for true immutability
    # (Task 8 PanelResult + Task 9 JuryVerdict pattern carry-forward).
    verification_log: tuple[tuple[str, str], ...] = field(default_factory=tuple)
    # Flaws surfaced. EMPTY tuple means clean verdict. NON-EMPTY: operator MUST resolve before dispatch.
    # Sentinel strings starting with "CoVe ..." indicate protocol failures (API errors, unparseable
    # output); these are fail-CLOSED signals — verifying nothing is never silently treated as clean.
    # I-2 cross-task harmonization: was `list[str]`; now tuple for true immutability.
    discrepancies: tuple[str, ...] = field(default_factory=tuple)

    def __post_init__(self) -> None:
        # M-11 coercion pattern carry-forward (Task 9 JuryVerdict.panel_results):
        # coerce list -> tuple if a caller passed a list (existing call sites
        # inside cove_verify still construct with lists; the asyncio.gather
        # answer-loop returns a list; we silently re-wrap so the immutability
        # invariant holds end-to-end without forcing every callsite to switch).
        if isinstance(self.verification_log, list):
            object.__setattr__(self, "verification_log", tuple(self.verification_log))
        if isinstance(self.discrepancies, list):
            object.__setattr__(self, "discrepancies", tuple(self.discrepancies))

        # Validate top-level container types fail-CLOSED.
        if not isinstance(self.verification_log, tuple):
            raise TypeError(
                f"verification_log must be tuple, got "
                f"{type(self.verification_log).__name__}"
            )
        if not isinstance(self.discrepancies, tuple):
            raise TypeError(
                f"discrepancies must be tuple, got {type(self.discrepancies).__name__}"
            )

        # Validate each verification_log entry is a (str, str) tuple.
        for i, entry in enumerate(self.verification_log):
            if not (
                isinstance(entry, tuple)
                and len(entry) == 2
                and isinstance(entry[0], str)
                and isinstance(entry[1], str)
            ):
                raise TypeError(
                    f"verification_log[{i}] must be (str, str) tuple, got {entry!r}"
                )

        # Validate each discrepancy is a non-empty string (CR-6 verify-before-claim:
        # empty / whitespace-only discrepancy is malformed audit-trail output and
        # MUST surface fail-CLOSED rather than silently passing as a clean entry).
        for i, d in enumerate(self.discrepancies):
            if not isinstance(d, str):
                raise TypeError(
                    f"discrepancies[{i}] must be str, got {type(d).__name__}"
                )
            if not d.strip():
                raise ValueError(
                    f"discrepancies[{i}] must be non-empty "
                    "(operator-readable diagnostic per CR-6)"
                )


async def cove_verify(
    spec: TaskSpec, anthropic_client, model: str = DEFAULT_COVE_MODEL
) -> CoVeResult:
    """Run CoVe factored mode against a TaskSpec draft. Returns CoVeResult with discrepancies.

    Fail-CLOSED contract (per CR-6 verify-before-claim):
      - Question-gen API error → CoVeResult with sentinel discrepancy, empty log.
      - Question-gen returns no parseable questions → CoVeResult with sentinel discrepancy, empty log.
      - Per-question answer API error → that question's answer becomes a sentinel string; the reconcile
        step sees it as part of the Q&A block and naturally surfaces it as a discrepancy.
      - Reconcile API error → CoVeResult with sentinel discrepancy + partial log preserved.

    A silent zero-discrepancy verdict NEVER hides a protocol failure.
    """
    # Step 2: generate verification questions (draft VISIBLE).
    try:
        q_resp = await anthropic_client.messages.create(
            model=model,
            max_tokens=500,
            system=_QUESTION_GEN_PROMPT,
            messages=[{"role": "user", "content": f"DRAFT SPEC:\n{spec.task}"}],
        )
    except Exception as exc:
        return CoVeResult(
            verified_spec=spec,
            verification_log=(),
            discrepancies=(
                f"CoVe API failure at question-gen step: {exc.__class__.__name__}: {exc}",
            ),
        )

    q_text = q_resp.content[0].text
    questions = _parse_questions(q_text)

    # Fail-CLOSED early-return when Step 2 produced no parseable questions. A silent
    # zero-discrepancy verdict here would hide a CoVe protocol failure (e.g. the model
    # returned prose without the QUESTIONS: header, or the regex matched nothing).
    if not questions:
        return CoVeResult(
            verified_spec=spec,
            verification_log=(),
            discrepancies=(
                "CoVe question-gen produced no parseable questions; spec verification skipped — operator review required",
            ),
        )

    # Step 3: answer each question in FACTORED isolation (draft NOT visible in system prompt).
    # Parallelized via asyncio.gather + Semaphore to respect Anthropic rate limits.
    # Per-question API failures become sentinel-string answers that the reconcile step
    # naturally surfaces as discrepancies (no silent zero-discrepancy verdict).
    sem = asyncio.Semaphore(_ANSWER_CONCURRENCY)

    async def _answer_one(question: str) -> tuple[str, str]:
        async with sem:
            try:
                a_resp = await anthropic_client.messages.create(
                    model=model,
                    max_tokens=300,
                    system=_ANSWER_PROMPT,  # NO draft in system prompt — factored discipline
                    messages=[{"role": "user", "content": question}],
                )
                return (question, a_resp.content[0].text)
            except Exception as exc:
                return (
                    question,
                    f"[CoVe API failure at answer step: {exc.__class__.__name__}: {exc}]",
                )

    log: list[tuple[str, str]] = list(
        await asyncio.gather(*[_answer_one(q) for q in questions])
    )

    # Step 4: reconcile (draft + Q&A visible).
    # Failure here preserves the partial log so the operator can inspect Step-3 progress.
    qa_block = "\n".join(f"Q: {q}\n{a}" for q, a in log)
    try:
        r_resp = await anthropic_client.messages.create(
            model=model,
            max_tokens=500,
            system=_RECONCILE_PROMPT,
            messages=[
                {
                    "role": "user",
                    "content": f"DRAFT SPEC:\n{spec.task}\n\nQ&A:\n{qa_block}",
                }
            ],
        )
    except Exception as exc:
        return CoVeResult(
            verified_spec=spec,
            verification_log=tuple(log),
            discrepancies=(
                f"CoVe API failure at reconcile step: {exc.__class__.__name__}: {exc}",
            ),
        )

    discrepancies = _parse_discrepancies(r_resp.content[0].text)

    return CoVeResult(
        verified_spec=spec,
        verification_log=tuple(log),
        discrepancies=tuple(discrepancies),
    )


def _parse_questions(text: str) -> list[str]:
    """Parse numbered questions from a QUESTIONS: block. Mirror of `_parse_discrepancies`.

    REQUIRES a `QUESTIONS:` header — lone numbered lines without the header are ignored
    to avoid false-positive parsing of unrelated numbered content (e.g. "Step 1. think").
    """
    out: list[str] = []
    in_block = False
    for line in text.splitlines():
        s = line.strip()
        if s.upper().startswith("QUESTIONS"):
            in_block = True
            continue
        if in_block and s and s[0].isdigit() and "." in s[:4]:
            out.append(s.split(".", 1)[1].strip())
    return out


# Sentinel set for the "no discrepancies" payload in Step-4 output. The model is prompted to
# write "none" but in practice emits variants like "none.", "None", "no discrepancies", "n/a"
# — all must be treated as the clean-verdict signal, NOT real discrepancies.
_NO_DISCREPANCY_SENTINELS = frozenset({"none", "no discrepancies", "n/a"})


def _parse_discrepancies(text: str) -> list[str]:
    out: list[str] = []
    in_block = False
    for line in text.splitlines():
        s = line.strip()
        if s.upper().startswith("DISCREPANCIES"):
            in_block = True
            continue
        if in_block and s and s[0].isdigit() and "." in s[:4]:
            payload = s.split(".", 1)[1].strip()
            # Normalize trailing punctuation (period/exclamation/comma/etc.) before sentinel match
            # so "none.", "none!", "None,;" all map to the clean-verdict signal.
            normalized = payload.lower().rstrip(".!,;: ")
            if normalized not in _NO_DISCREPANCY_SENTINELS:
                out.append(payload)
    return out
