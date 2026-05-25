"""W308 Lane-D adapter for mem0ai/mem0 (incumbent baseline anchor).

Per W305 Stream A §1.1 — incumbent T1-INSTALL-with-caveat (AT-RISK W304).

W306 shipped the STUB (mock + NotImplementedError). W308 Stream C upgrades
to a real-corpus SKELETON path (import-probe + dry-run skeleton + fail-loud
ImportError). Operator's `pip install mem0ai==2.0.2` immediately unblocks
the dry-run smoke; the actual LongMemEval HuggingFace loader + LLM calls
ship in W309.

Operator-action: BEFORE using --memory-corpus longmemeval WITHOUT --dry-run:
    & Z:\\venvs\\claude\\Scripts\\python.exe -m pip install mem0ai==2.0.2
    # Requires OPENAI_API_KEY env for default config; budget ~$5-10 for
    # full LongMemEval-S (500 questions, gpt-5-mini extraction + judge).

The _mock corpus path works WITHOUT any install (deterministic fixture).
The --dry-run path on real corpora returns a deterministic skeleton dict
(no LLM spend, no dataset download) so wiring smoke can pass pre-install.
"""

from __future__ import annotations

import importlib.util
from typing import Any

_PACKAGE_NAME = "mem0"  # import name; pip name is `mem0ai`
_PYPI_SPEC = "mem0ai==2.0.2"

_PACKAGE_INSTALL_REQUIRED = (
    "W308 Lane-D adapter: mem0ai/mem0 requires operator install:\n"
    f"    & Z:\\venvs\\claude\\Scripts\\python.exe -m pip install {_PYPI_SPEC}\n"
    "Then run: python harness/eval_harness.py --mode memory-recall-lane "
    "--candidate mem0ai/mem0 --memory-corpus _mock --memory-sample-size 10 "
    "--wave 308\n"
    "Expected: exit 0, VERDICT: PARTIAL recall_precision@5 = 0.520.\n"
    "Real-corpus (longmemeval) requires OPENAI_API_KEY + ~$5-10 budget; full "
    "HuggingFace loader ships in W309 per W305 Stream A §1.1 add()/search()."
)

_NOT_YET_IMPLEMENTED_REAL_CORPUS = (
    "W308 ship: real-corpus skeleton + dry-run + import-probe + ImportError "
    "fallback. LongMemEval HuggingFace dataset loading deferred to W309. "
    "Use --memory-corpus _mock or --dry-run for wiring smoke. Wire it per "
    "docs/architecture/W305-D-V6-2-LANE-D-MEM0-HEADHEAD/"
    "W305-STREAM-A-CHALLENGER-API-CONTRACTS.md §1.1: Memory().add(messages, "
    "user_id=...) + Memory().search(query, filters={'user_id': ...}, top_k=5). "
    "Requires OPENAI_API_KEY env + ~$5-10 USD per full LongMemEval-S run."
)

_SUPPORTED_CORPORA = {"longmemeval", "hotpotqa", "twowikimultihop"}


def _package_installed() -> bool:
    return importlib.util.find_spec(_PACKAGE_NAME) is not None


class Adapter:
    """Adapter for mem0ai/mem0 — W308 real-corpus skeleton + dry-run path.

    - corpus=_mock                  -> deterministic mock fixture (exit 0)
    - corpus=<real> + dry_run=True  -> deterministic skeleton fixture (exit 0)
    - corpus=<real> + dry_run=False + package missing -> ImportError (exit 2)
    - corpus=<real> + dry_run=False + package present -> NotImplementedError
                                                          (W309 ships full)
    """

    def run_benchmark(
        self,
        corpus: str,
        sample_size: int,
        dry_run: bool,
    ) -> dict[str, Any]:
        if corpus == "_mock":
            return self._mock_result(sample_size, dry_run)
        if corpus not in _SUPPORTED_CORPORA:
            raise ValueError(
                f"Unsupported corpus: {corpus!r}. Supported: _mock | "
                f"{' | '.join(sorted(_SUPPORTED_CORPORA))}"
            )
        # Dry-run on real corpora short-circuits BEFORE the install-probe — no
        # LLM spend, no install required. For corpus=longmemeval (W309 Stream
        # D), the dispatch routes through `_run_real_corpus` so the loader
        # fires (returns deterministic mock queries when dry_run=True).
        # Other corpora (hotpotqa/twowikimultihop) still emit a flat skeleton.
        if dry_run:
            if corpus == "longmemeval":
                return self._run_real_corpus(
                    corpus, sample_size, client_factory=None, dry_run=True
                )
            return self._stub_dry_run_result(corpus=corpus, sample_size=sample_size)
        if not _package_installed():
            raise ImportError(_PACKAGE_INSTALL_REQUIRED)
        # Lazy-import gated by the install-probe above. The W310 runner will
        # use this _client_factory to instantiate Memory() per W305 §1.1.
        try:
            import mem0  # type: ignore[import-not-found]  # noqa: F401
        except ImportError as exc:
            raise ImportError(
                f"{_PACKAGE_INSTALL_REQUIRED}\nUnderlying: {exc}"
            ) from exc

        def _client_factory() -> Any:
            # mem0's Memory() reads OPENAI_API_KEY from env by default.
            from mem0 import Memory  # type: ignore[import-not-found]

            return Memory()

        return self._run_real_corpus(
            corpus, sample_size, _client_factory, dry_run=False
        )

    # ---- real-corpus runner (W308: NotImplementedError; W309 Stream D: ----
    # ---- dispatches longmemeval to HF loader; HotPotQA/TwoWiki defer)   ----

    def _run_real_corpus(
        self, corpus: str, sample_size: int, client_factory: Any, dry_run: bool
    ) -> dict[str, Any]:
        """Run LongMemEval/HotPotQA/TwoWikiMultiHop against mem0.

        W309 Stream D ships the longmemeval branch (HF loader + dry-run path).
        HotPotQA and TwoWikiMultiHop continue to raise NotImplementedError
        pointing to a later wave.
        """
        if corpus == "longmemeval":
            return self._run_longmemeval(
                sample_size=sample_size,
                dry_run=dry_run,
                client_factory=client_factory,
            )
        # Reference client_factory so the lint pass sees it consumed even
        # before the later-wave HotPotQA/TwoWiki runners are wired.
        _ = (sample_size, client_factory)
        raise NotImplementedError(
            f"{_NOT_YET_IMPLEMENTED_REAL_CORPUS} (corpus={corpus!r})"
        )

    def _run_longmemeval(
        self, sample_size: int, dry_run: bool, client_factory: Any
    ) -> dict[str, Any]:
        """Run LongMemEval against mem0 (W309 Stream D ship).

        Loads HF dataset via `_longmemeval_loader`; dry-run path returns a
        skeleton fixture with a `_loader_query_count` field so smoke can
        confirm the loader fired. Real-corpus add/search loop wires in W310.
        """
        from harness.adapters.memory_recall._longmemeval_loader import (
            load_longmemeval_split,
        )

        queries = load_longmemeval_split(sample_size=sample_size, dry_run=dry_run)

        if dry_run:
            envelope = self._stub_dry_run_result(
                corpus="longmemeval", sample_size=sample_size
            )
            envelope["_loader_query_count"] = len(queries)
            envelope["_skeleton_note"] = (
                f"dry-run skeleton with {len(queries)} mock queries via "
                "_longmemeval_loader (W309 Stream D). Real-corpus add/search "
                "loop wires in W310."
            )
            return envelope

        # Real-corpus path: queries loaded from HF; the candidate add/search
        # loop is the W310 ship. Reference client_factory for lint.
        _ = client_factory
        raise NotImplementedError(
            "W309 Stream D ships HF loader + dry-run path; real-corpus "
            "add/search loop wires in W310. Loader returned "
            f"{len(queries)} real LongMemEval queries; ready for "
            "adapter.run_real_loop() per W305 §1.1 "
            "Memory().add()/search()."
        )

    # ---- fixtures ----

    def _stub_dry_run_result(self, corpus: str, sample_size: int) -> dict[str, Any]:
        """Deterministic skeleton for --dry-run real-corpus invocations.

        Mirrors the mock fixture shape but tagged with the requested corpus +
        skeleton-mode so operators can grep verdicts JSON for `"dry_run": true`.
        """
        return self._build_envelope(
            corpus=corpus,
            sample_size=sample_size,
            dry_run=True,
            note_key="_skeleton_note",
            note_value=(
                f"W308 SKELETON for corpus={corpus!r}. No LLM calls, no "
                "dataset download, no spend. Same shape as a real run so "
                "downstream consumers (verdict-ledger, EvalLog persistence, "
                "D8 benchmark_deltas scoring) can exercise their code paths "
                "pre-install. W309 ships the HuggingFace LongMemEval loader "
                "+ Memory.add()/search() loop + LLM judge."
            ),
        )

    def _mock_result(self, sample_size: int, dry_run: bool) -> dict[str, Any]:
        # Per Mem0's published claim (49% on LongMemEval baseline) — 0.52 sits
        # just above baseline, in PARTIAL band [0.50, 0.60]; distinct from
        # ALMA (0.57) and agentmemory (0.55) for per-adapter wiring sanity.
        return self._build_envelope(
            corpus="_mock",
            sample_size=sample_size,
            dry_run=dry_run,
            note_key="_stub_note",
            note_value=(
                f"W308 mock. Real benchmark requires operator install per "
                f"W305 Stream A §1.1 (pip install {_PYPI_SPEC} + "
                "OPENAI_API_KEY env). --dry-run on real corpora returns a "
                "skeleton fixture without LLM spend."
            ),
        )

    def _build_envelope(
        self,
        corpus: str,
        sample_size: int,
        dry_run: bool,
        note_key: str,
        note_value: str,
    ) -> dict[str, Any]:
        """Shared envelope builder for mock + dry-run skeleton paths."""
        mock_rp5 = 0.52
        return {
            "lane": "memory-recall",
            "candidate": "mem0ai/mem0",
            "corpus": corpus,
            "sample_size": sample_size,
            "baseline_candidate": "mem0ai/mem0",
            "metrics": {
                "recall_precision_at_5": mock_rp5,
                "recall_precision_at_10": 0.58,
                "durability_after_30_resumes": 0.91,
                "p50_retrieval_latency_ms": 50,
                "p95_retrieval_latency_ms": 130,
                "p99_retrieval_latency_ms": 290,
            },
            "delta_vs_baseline": {
                "recall_precision_at_5_pp": (mock_rp5 - 0.49) * 100,
            },
            "traces": [],
            "errors": [],
            "dry_run": dry_run,
            note_key: note_value,
        }
