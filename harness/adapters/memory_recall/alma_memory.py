"""W308 Lane-D adapter for RBKunnela/ALMA-memory (W304 Challenger A).

Per W305 Stream A §1.2 — NOT YET LEDGERED, highest-priority challenger
(R@5=0.964 VERIFIED via in-tree `python -m benchmarks.longmemeval.runner`).

W306 shipped the STUB. W308 Stream C upgrades to a real-corpus SKELETON
path (import-probe + dry-run skeleton + fail-loud ImportError). Operator's
`pip install alma-memory[local]==0.10.0` unblocks dry-run smoke; full
LongMemEval runner ships in W309.

Operator-action: BEFORE using --memory-corpus longmemeval WITHOUT --dry-run:
    & Z:\\venvs\\claude\\Scripts\\python.exe -m pip install `
        alma-memory[local]==0.10.0 sentence-transformers

W305 §0.bis Cal-2 (HIGH-4): the "zero-LLM fast mode" + memory_save_fast() /
memory_recall_fast() APIs cited in the README are v11+ features that may
NOT be in pinned PyPI 0.10.0 (latest 2026-05-18). Operator MUST verify
post-install:
    python -c "from alma import ALMA; a = ALMA(); \
print([m for m in dir(a) if 'fast' in m.lower()])"
- Non-empty list -> v11 fast mode shipped -> $0 cost estimate holds.
- Empty list -> v11 fast mode aspirational; fallback to standard LLM-call
  path -> ~$0.50-1 (10 Q) / ~$5-10 (100 Q).
"""

from __future__ import annotations

import importlib.util
from typing import Any

_PACKAGE_NAME = "alma"  # import name; pip name is `alma-memory`
_PYPI_SPEC = "alma-memory[local]==0.10.0"

_PACKAGE_INSTALL_REQUIRED = (
    "W308 Lane-D adapter: RBKunnela/ALMA-memory requires operator install:\n"
    f"    & Z:\\venvs\\claude\\Scripts\\python.exe -m pip install {_PYPI_SPEC} "
    "sentence-transformers\n"
    "Verify fast-mode methods present (W305 §0.bis Cal-2):\n"
    '    python -c "from alma import ALMA; a = ALMA(); '
    "print([m for m in dir(a) if 'fast' in m.lower()])\"\n"
    "Then run: python harness/eval_harness.py --mode memory-recall-lane "
    "--candidate RBKunnela/ALMA-memory --memory-corpus _mock "
    "--memory-sample-size 10 --wave 308\n"
    "Expected: exit 0, VERDICT: PARTIAL recall_precision@5 = 0.570.\n"
    "Real-corpus path: alma.learn() / alma.retrieve() per W305 §1.2; if v11 "
    "fast-mode absent budget ~$5-10 for full LongMemEval-S. W309 ships full "
    "HuggingFace LongMemEval loader."
)

_NOT_YET_IMPLEMENTED_REAL_CORPUS = (
    "W308 ship: real-corpus skeleton + dry-run + import-probe + ImportError "
    "fallback. LongMemEval HuggingFace dataset loading deferred to W309. "
    "Use --memory-corpus _mock or --dry-run for wiring smoke. Wire it per "
    "docs/architecture/W305-D-V6-2-LANE-D-MEM0-HEADHEAD/"
    "W305-STREAM-A-CHALLENGER-API-CONTRACTS.md §1.2: "
    "ALMA.from_config(...).learn(agent=..., task=..., outcome=...) + "
    "alma.retrieve(task=..., agent=..., top_k=5). Per §0.bis Cal-2 verify "
    "v11 memory_save_fast/recall_fast presence in 0.10.0 first; if absent, "
    "fall back to standard LLM-call alma.learn/retrieve."
)

_SUPPORTED_CORPORA = {"longmemeval", "hotpotqa", "twowikimultihop"}


def _package_installed() -> bool:
    return importlib.util.find_spec(_PACKAGE_NAME) is not None


class Adapter:
    """Adapter for RBKunnela/ALMA-memory — W308 real-corpus skeleton + dry-run.

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
        # Dry-run on real corpora short-circuits BEFORE the install-probe.
        # corpus=longmemeval (W309 Stream D) routes through `_run_real_corpus`
        # so the HF loader fires (returns deterministic mock queries).
        if dry_run:
            if corpus == "longmemeval":
                return self._run_real_corpus(
                    corpus, sample_size, client_factory=None, dry_run=True
                )
            return self._stub_dry_run_result(corpus=corpus, sample_size=sample_size)
        if not _package_installed():
            raise ImportError(_PACKAGE_INSTALL_REQUIRED)
        try:
            import alma  # type: ignore[import-not-found]  # noqa: F401
        except ImportError as exc:
            raise ImportError(
                f"{_PACKAGE_INSTALL_REQUIRED}\nUnderlying: {exc}"
            ) from exc

        def _client_factory() -> Any:
            # W305 §1.2: ALMA.from_config(".alma/config.yaml") is the canonical
            # entry-point. The W310 wave will materialize the config or swap
            # this factory. For W309 a bare ALMA() suffices for probe-only.
            from alma import ALMA  # type: ignore[import-not-found]

            return ALMA()

        return self._run_real_corpus(
            corpus, sample_size, _client_factory, dry_run=False
        )

    # ---- real-corpus runner (W308: NotImplementedError; W309 Stream D: ----
    # ---- dispatches longmemeval to HF loader; HotPotQA/TwoWiki defer)   ----

    def _run_real_corpus(
        self, corpus: str, sample_size: int, client_factory: Any, dry_run: bool
    ) -> dict[str, Any]:
        """Run LongMemEval/HotPotQA/TwoWikiMultiHop against ALMA.

        W309 Stream D ships the longmemeval branch (HF loader + dry-run path).
        HotPotQA and TwoWikiMultiHop continue to raise NotImplementedError
        pointing to a later wave; full alma.learn()/retrieve() (or v11
        memory_save_fast/recall_fast if §0.bis Cal-2 verified) wires in W310.
        """
        if corpus == "longmemeval":
            return self._run_longmemeval(
                sample_size=sample_size,
                dry_run=dry_run,
                client_factory=client_factory,
            )
        _ = (sample_size, client_factory)
        raise NotImplementedError(
            f"{_NOT_YET_IMPLEMENTED_REAL_CORPUS} (corpus={corpus!r})"
        )

    def _run_longmemeval(
        self, sample_size: int, dry_run: bool, client_factory: Any
    ) -> dict[str, Any]:
        """Run LongMemEval against ALMA (W309 Stream D ship).

        Loads HF dataset via `_longmemeval_loader`; dry-run path returns a
        skeleton fixture with a `_loader_query_count` field so smoke can
        confirm the loader fired. Real-corpus learn/retrieve loop wires in W310
        (per §0.bis Cal-2 verify v11 fast-mode methods or fall back to
        standard alma.learn/retrieve).
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
                "_longmemeval_loader (W309 Stream D). Real-corpus "
                "learn/retrieve loop wires in W310 (verify v11 fast-mode "
                "per §0.bis Cal-2 first)."
            )
            return envelope

        _ = client_factory
        raise NotImplementedError(
            "W309 Stream D ships HF loader + dry-run path; real-corpus "
            "learn/retrieve loop wires in W310. Loader returned "
            f"{len(queries)} real LongMemEval queries; ready for "
            "adapter.run_real_loop() per W305 §1.2 "
            "alma.learn()/retrieve() (or v11 fast-mode if Cal-2 verified)."
        )

    # ---- fixtures ----

    def _stub_dry_run_result(self, corpus: str, sample_size: int) -> dict[str, Any]:
        """Deterministic skeleton for --dry-run real-corpus invocations."""
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
                "+ alma.learn()/retrieve() (or v11 fast-mode if present)."
            ),
        )

    def _mock_result(self, sample_size: int, dry_run: bool) -> dict[str, Any]:
        # ALMA's published R@5=0.964 — mock at 0.57 (high-PARTIAL) to stay in
        # band for stub-time wiring test; distinct from mem0 (0.52) and
        # agentmemory (0.55).
        return self._build_envelope(
            corpus="_mock",
            sample_size=sample_size,
            dry_run=dry_run,
            note_key="_stub_note",
            note_value=(
                "W308 mock. Real benchmark requires operator install per "
                f"W305 Stream A §1.2 (pip install {_PYPI_SPEC} + "
                "sentence-transformers). Per §0.bis Cal-2: post-install "
                "VERIFY v11 fast-mode methods before relying on $0 cost. "
                "--dry-run on real corpora returns a skeleton fixture."
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
        mock_rp5 = 0.57
        return {
            "lane": "memory-recall",
            "candidate": "RBKunnela/ALMA-memory",
            "corpus": corpus,
            "sample_size": sample_size,
            "baseline_candidate": "mem0ai/mem0",
            "metrics": {
                "recall_precision_at_5": mock_rp5,
                "recall_precision_at_10": 0.65,
                "durability_after_30_resumes": 0.95,
                "p50_retrieval_latency_ms": 25,
                "p95_retrieval_latency_ms": 80,
                "p99_retrieval_latency_ms": 180,
            },
            "delta_vs_baseline": {
                "recall_precision_at_5_pp": (mock_rp5 - 0.49) * 100,
            },
            "traces": [],
            "errors": [],
            "dry_run": dry_run,
            note_key: note_value,
        }
