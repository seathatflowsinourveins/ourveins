"""LongMemEval HF dataset loader for Lane-D adapters (W309 Stream D).

First-shipped W309 per `docs/architecture/W309-GAP-RESOLUTION-SOTA-REFS/
W309-STREAM-D-HF-LOADER.md`.

Purpose
-------
Shared loader module factoring the LongMemEval data ingest concern OUT of
each per-candidate adapter. Lazy-imports the `datasets` library so the
module is importable even when `datasets` is NOT installed; the `dry_run`
path returns deterministic mock queries with NO HF network round-trip.

Real-corpus path (dry_run=False)
--------------------------------
- Lazy-imports `datasets`; on ImportError raises a fail-loud message
  pointing operators at `pip install datasets>=2.16.0`.
- Calls `datasets.load_dataset(<slug>, split=<split>, cache_dir=<dir>)`.
- Cache dir defaults to `Z:/claude-sota-installed-state/lane-d-cache/`
  per CLAUDE.md (state-outside-repo discipline + CR-1 trusted-source).
- Returns up to `sample_size` rows normalised to a uniform dict shape:
  `{query_id, query, gold_relevant_ids, context_passages}`.
- HF slug overridable via the `LONGMEMEVAL_HF_SLUG` env var (default
  `letta-ai/LongMemEval` per Letta Leaderboard convention; operator
  can swap to any HF-compatible mirror without code changes).

Dry-run path (dry_run=True OR sample_size<=0)
---------------------------------------------
Returns 3 deterministic mock queries — same shape as the real path —
so adapter wiring can be smoke-tested without an HF download, network
access, or the `datasets` package installed.

Metric helper
-------------
`compute_recall_precision_at_k(retrieved_ids, gold_ids, k)` implements
the canonical R@k metric from the LongMemEval paper + Letta Leaderboard:
R@k = |retrieved_top_k INTERSECT gold| / max(1, min(k, |gold|)).

SOTA refs
---------
- HuggingFace datasets library: https://huggingface.co/docs/datasets
- LongMemEval canonical methodology + paper
- Letta Leaderboard benchmark conventions
- MTEB evaluation conventions
- W305 Lane-D Design §4 (per-adapter benchmark protocol)

Cardinal-rule conformance
-------------------------
- CR-1 trusted: `datasets` is the HuggingFace canonical Python library
  for ML datasets; LongMemEval HF slugs are operator-configurable, not
  baked-in self-invented sources.
- CR-2 hooks: harness/ is the sanctioned location per `eval_harness.py`
  precedent (W259-v9 ship); NOT a `.claude/hooks/scripts/*.py` self-invent.
- CR-3 subagents: this is an import-time helper, not a subagent surface.
- CR-5 safety: introduces no new tool surface; pure-Python data normalize.
- CR-9 version-pin: `datasets>=2.16.0` documented in the operator-action
  fail-loud message (caller is responsible for the install).
"""

from __future__ import annotations

import os
from pathlib import Path
from typing import Any

# ---------------------------------------------------------------------------
# Configuration constants (operator-overridable via env)
# ---------------------------------------------------------------------------

# Default HF slug for LongMemEval. Operator can swap mirrors via env without
# code changes (e.g. an internal-mirror or a pinned-revision fork) — per
# CLAUDE.md cardinal-rule-1 "operator-confirmed trusted sources".
_LONGMEMEVAL_HF_SLUG_DEFAULT = "letta-ai/LongMemEval"

# State-outside-repo cache directory per CLAUDE.local.md (W280 + W295 AI-3
# state-outside-repo discipline). Mirrors CODEX_HOME + project-dir convention.
_CACHE_DIR_DEFAULT = Path("Z:/claude-sota-installed-state/lane-d-cache")

# Default split per LongMemEval canonical methodology — `test` is the
# evaluation split per the paper. Adapters can override via the `split` arg.
_DEFAULT_SPLIT = "test"

# Operator-action fail-loud message — kept verbose so an unfamiliar operator
# can recover with one cut-paste after hitting this on a fresh checkout.
_DATASETS_INSTALL_REQUIRED = (
    "W309 Stream D — LongMemEval HF loader requires the HuggingFace "
    "`datasets` library:\n"
    "    & Z:\\venvs\\claude\\Scripts\\python.exe -m pip install "
    "'datasets>=2.16.0'\n"
    "Then re-run, e.g.:\n"
    "    python harness/eval_harness.py --mode memory-recall-lane "
    "--candidate <slug> --memory-corpus longmemeval --memory-sample-size 10 "
    "--wave 309\n"
    "Or use --dry-run to skip HF download (returns deterministic mock "
    "3-query fixture; zero network, zero spend, zero install)."
)


# ---------------------------------------------------------------------------
# Public API
# ---------------------------------------------------------------------------


def load_longmemeval_split(
    split: str = _DEFAULT_SPLIT,
    sample_size: int = 10,
    cache_dir: Path | None = None,
    dry_run: bool = False,
    hf_slug: str | None = None,
) -> list[dict[str, Any]]:
    """Load LongMemEval queries for a Lane-D adapter.

    Returns a list of normalised query dicts with keys:
      - `query_id`: str — stable per-query identifier
      - `query`: str — the question to ask the memory system
      - `gold_relevant_ids`: list[str] — IDs of relevant memory entries
      - `context_passages`: list[str] — context passages for the query

    Args:
        split: HF dataset split (default `"test"` per LongMemEval canonical).
        sample_size: max rows to return; clamps to `len(dataset)` if smaller.
            `sample_size <= 0` is interpreted as a dry-run sentinel (returns
            the 3-query mock fixture; matches the loader-design intent of
            "skip the download when the caller wants no data").
        cache_dir: HF cache override; defaults to
            `Z:/claude-sota-installed-state/lane-d-cache/` (state-outside-repo).
        dry_run: when True, return the 3-query mock fixture WITHOUT importing
            `datasets` or hitting HF — useful for wiring-smoke pre-install.
        hf_slug: HF dataset slug override; falls back to env
            `LONGMEMEVAL_HF_SLUG`, then to the default `letta-ai/LongMemEval`.

    Raises:
        ImportError: if `datasets` is not installed AND `dry_run=False` AND
            `sample_size > 0`. Message points operators at the pinned
            `pip install datasets>=2.16.0` install command.
    """
    if dry_run or sample_size <= 0:
        # `sample_size or 3` -> 3 when 0 falsy (explicit dry-run sentinel),
        # else honour the caller's request for n mock queries.
        return _mock_queries(sample_size if sample_size > 0 else 3)

    cache_dir = cache_dir or _CACHE_DIR_DEFAULT
    hf_slug = hf_slug or os.environ.get(
        "LONGMEMEVAL_HF_SLUG", _LONGMEMEVAL_HF_SLUG_DEFAULT
    )

    try:
        import datasets  # type: ignore[import-not-found]
    except ImportError as exc:
        raise ImportError(_DATASETS_INSTALL_REQUIRED) from exc

    # State-outside-repo discipline (CLAUDE.local.md W280 + W295 AI-3).
    # `parents=True` accommodates fresh checkouts; `exist_ok=True` is idempotent.
    cache_dir.mkdir(parents=True, exist_ok=True)

    # `load_dataset` is the canonical HF API per
    # https://huggingface.co/docs/datasets/en/loading. Operator-configurable
    # split + cache_dir; no implicit network on cache-hit.
    ds = datasets.load_dataset(hf_slug, split=split, cache_dir=str(cache_dir))

    queries: list[dict[str, Any]] = []
    for i, row in enumerate(ds):
        if i >= sample_size:
            break
        # Defensive shape-normalisation — LongMemEval mirrors vary in column
        # names (`query` vs `question`, `gold_relevant_ids` vs `relevant_ids`,
        # `context_passages` vs `contexts`). Fall back through known aliases.
        # `row` is dict-like at runtime (HF datasets rows expose .get / [])
        # but pyright's stub-less `load_dataset` infers `list[Unknown]`; cast
        # to Any so `.get(...)` resolves under static analysis.
        row_any: Any = row
        queries.append(
            {
                "query_id": row_any.get("query_id") or f"query_{i}",
                "query": row_any.get("query") or row_any.get("question") or "",
                "gold_relevant_ids": (
                    row_any.get("gold_relevant_ids")
                    or row_any.get("relevant_ids")
                    or []
                ),
                "context_passages": (
                    row_any.get("context_passages") or row_any.get("contexts") or []
                ),
            }
        )
    return queries


def compute_recall_precision_at_k(
    retrieved_ids: list[str], gold_ids: list[str], k: int = 5
) -> float:
    """Compute R@k for a single LongMemEval query.

    Formula (per LongMemEval paper + Letta Leaderboard methodology):
        R@k = |retrieved_top_k INTERSECT gold| / max(1, min(k, |gold|))

    The `min(k, |gold|)` denominator caps the score at 1.0 when the gold
    set is smaller than k (you can't retrieve more relevant items than
    exist). `max(1, ...)` guards divide-by-zero on empty `gold_ids`
    (a degenerate case — a query with no relevant items scores 0.0).

    Args:
        retrieved_ids: ordered list of memory IDs returned by the candidate
            (rank-1 first); the function takes the top-k by list order.
        gold_ids: list of ground-truth relevant memory IDs.
        k: cutoff rank. Default 5 per Lane-D `recall_precision_at_5`.

    Returns:
        R@k as a float in [0.0, 1.0].
    """
    if not gold_ids:
        return 0.0
    top_k = retrieved_ids[:k]
    intersection = len(set(top_k) & set(gold_ids))
    # min(k, |gold|) is the maximum-possible intersection size — capping
    # the denominator at this value makes the metric a proper precision-at-k
    # / recall-at-k hybrid in the small-gold-set regime.
    return intersection / max(1, min(k, len(gold_ids)))


# ---------------------------------------------------------------------------
# Private helpers
# ---------------------------------------------------------------------------


def _mock_queries(n: int = 3) -> list[dict[str, Any]]:
    """Return n deterministic mock queries for wire-smoke (no HF dependency).

    The mock shape mirrors the real loader output 1:1 so an adapter's
    `_run_longmemeval` can run end-to-end against either path without
    branching on `dry_run`. Determinism (same input -> same output) is
    required by the smoke-test verdict-mapping which expects reproducible
    R@k values across invocations.
    """
    return [
        {
            "query_id": f"mock_q{i}",
            "query": f"Mock query {i}: what did we decide about X{i}?",
            "gold_relevant_ids": [f"memory_{i}a", f"memory_{i}b"],
            "context_passages": [
                f"Context {i}.1: lorem ipsum about X{i}.",
                f"Context {i}.2: dolor sit amet X{i} relevant fact.",
            ],
        }
        for i in range(n)
    ]


__all__ = [
    "load_longmemeval_split",
    "compute_recall_precision_at_k",
]
