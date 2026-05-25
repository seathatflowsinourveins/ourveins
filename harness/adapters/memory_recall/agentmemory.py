"""W308 Lane-D adapter for rohitg00/agentmemory (W304 Challenger B).

Per W305 Stream A §1.4 — NOT YET LEDGERED; 12,859-star Apache-2.0 TS+REST
server with pre-computed LongMemEval fixtures checked into the repo
(R@5=95.2%). W306 shipped the STUB; W308 Stream C upgrades to a real-corpus
SKELETON path (probe + dry-run skeleton + fail-loud fallback). agentmemory
is TS-only, so this adapter's "installed" probe checks Python `httpx` AND
documents both real-corpus paths:

- PREFERRED $0 path (W305 §0.bis Cal-3): clone upstream + parse
  benchmark/data/longmemeval_results_{bm25,hybrid}.json (302KB pre-computed).
- Live HTTP path: npm install -g @agentmemory/agentmemory@0.9.20 + start
  :3111 + POST /api/{memories,search} via httpx. Full impl ships W309.

Per §0.bis Cal-1 (HIGH-3): npm package is SCOPED `@agentmemory/agentmemory`,
NOT unscoped `agentmemory` (which 404s). Per §0.bis Cal-3 (MEDIUM): fixtures
VERIFIED present; W309 reads them directly for $0 first-run cost.
"""

from __future__ import annotations

import importlib.util
from typing import Any

# Python-side probe = httpx (REST client for live-server fallback). PREFERRED
# $0 JSON-fixture path needs only stdlib `json`, but we keep httpx as the
# probe for a uniform operator install-action message.
_NPM_PACKAGE_PROBE = "httpx"
_NPM_SPEC = "@agentmemory/agentmemory@0.9.20"
_UPSTREAM_REPO = "https://github.com/rohitg00/agentmemory"

_PACKAGE_INSTALL_REQUIRED = (
    "W308 Lane-D adapter: rohitg00/agentmemory requires operator setup.\n"
    "PREFERRED $0 path (W305 §0.bis Cal-3 — no LLM, no server, no npm):\n"
    f"    git clone {_UPSTREAM_REPO}.git Z:/repos/agentmemory\n"
    "    # Then read benchmark/data/longmemeval_results_{bm25,hybrid}.json\n"
    "Live HTTP-server path (when JSON fixtures aren't enough):\n"
    f"    npm install -g {_NPM_SPEC}   # SCOPED per §0.bis Cal-1\n"
    "    agentmemory                   # starts HTTP server on :3111\n"
    "    & Z:/venvs/claude/Scripts/python.exe -m pip install httpx\n"
    "Then: python harness/eval_harness.py --mode memory-recall-lane "
    "--candidate rohitg00/agentmemory --memory-corpus _mock "
    "--memory-sample-size 10 --wave 308 (expected exit 0, R@5=0.550).\n"
    "Full real-corpus runner (JSON-fixture reader + HTTP fallback) ships W309."
)

_NOT_YET_IMPLEMENTED_REAL_CORPUS = (
    "W308 ship: real-corpus skeleton + dry-run + import-probe + ImportError "
    "fallback. PREFERRED $0 JSON-fixture parser deferred to W309. Use "
    "--memory-corpus _mock or --dry-run for wiring smoke. Wire it per "
    "W305-STREAM-A-CHALLENGER-API-CONTRACTS.md §1.4 + §0.bis Cal-3 "
    "(PREFERRED $0: clone upstream + read longmemeval_results_*.json; live: "
    "npm install -g @agentmemory/agentmemory@0.9.20 + POST :3111 via httpx)."
)

_SUPPORTED_CORPORA = {"longmemeval", "hotpotqa", "twowikimultihop"}


def _package_installed() -> bool:
    # We do NOT spawn npm here — operator-install discipline per CR-1.
    return importlib.util.find_spec(_NPM_PACKAGE_PROBE) is not None


class Adapter:
    """Adapter for rohitg00/agentmemory — W308 real-corpus skeleton + dry-run.

    - corpus=_mock                  -> deterministic mock fixture (exit 0)
    - corpus=<real> + dry_run=True  -> deterministic skeleton fixture (exit 0)
    - corpus=<real> + dry_run=False + httpx missing -> ImportError (exit 2)
    - corpus=<real> + dry_run=False + httpx present -> NotImplementedError
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
        # so the HF loader fires AND the §0.bis Cal-3 JSON-fixture shortcut
        # path is logged.
        if dry_run:
            if corpus == "longmemeval":
                return self._run_real_corpus(
                    corpus, sample_size, client_factory=None, dry_run=True
                )
            return self._stub_dry_run_result(corpus=corpus, sample_size=sample_size)
        if not _package_installed():
            raise ImportError(_PACKAGE_INSTALL_REQUIRED)
        try:
            import httpx  # noqa: F401  (used only as install-probe proof)
        except ImportError as exc:
            raise ImportError(
                f"{_PACKAGE_INSTALL_REQUIRED}\nUnderlying: {exc}"
            ) from exc

        def _client_factory() -> Any:
            # W305 §1.4 + §0.bis Cal-3: PREFERRED $0 path is the JSON-fixture
            # reader (302 KB pre-computed BM25/hybrid results from upstream).
            # Live HTTP fallback uses httpx against :3111. The W310 wave swaps
            # this sentinel for the real reader; W309 only logs the URLs.
            return {
                "preferred_path": "json_fixture_reader",
                "json_fixture_paths": [
                    "benchmark/data/longmemeval_results_bm25.json",
                    "benchmark/data/longmemeval_results_hybrid.json",
                ],
                "json_fixture_url_base": (
                    "https://raw.githubusercontent.com/rohitg00/agentmemory/main/"
                ),
                "live_fallback_base_url": "http://localhost:3111",
            }

        return self._run_real_corpus(
            corpus, sample_size, _client_factory, dry_run=False
        )

    # ---- real-corpus runner (W308: NotImplementedError; W309 Stream D: ----
    # ---- dispatches longmemeval to HF loader + Cal-3 fixture URL log)    ----

    def _run_real_corpus(
        self, corpus: str, sample_size: int, client_factory: Any, dry_run: bool
    ) -> dict[str, Any]:
        """Run LongMemEval/HotPotQA/TwoWikiMultiHop against agentmemory.

        W309 Stream D ships the longmemeval branch (HF loader + dry-run path
        + Cal-3 JSON-fixture-URL annotation). HotPotQA and TwoWikiMultiHop
        continue to raise NotImplementedError pointing to a later wave; the
        W310 wave ships the actual JSON-fixture parser + HTTP fallback.
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
        """Run LongMemEval against agentmemory (W309 Stream D ship).

        Loads HF dataset via `_longmemeval_loader`; dry-run path returns a
        skeleton fixture with a `_loader_query_count` field PLUS the W305
        §0.bis Cal-3 PREFERRED $0 JSON-fixture URL so smoke can confirm both
        the loader fired AND the shortcut path is being honoured.

        Per W305 §0.bis Cal-3 (Cal-3 PREFERRED $0 path): for real-corpus +
        non-dry-run, instead of running the candidate's API, READ the
        pre-computed JSON fixture from upstream `benchmark/data/
        longmemeval_results_bm25.json` (302 KB) -> parse -> compute R@5
        against fixture's own ground-truth (zero-cost first-run). The W310
        wave wires the actual fetch + parse; W309 skeleton logs the URL.
        """
        from harness.adapters.memory_recall._longmemeval_loader import (
            load_longmemeval_split,
        )

        queries = load_longmemeval_split(sample_size=sample_size, dry_run=dry_run)

        # W305 §0.bis Cal-3 PREFERRED $0 path — logged on every longmemeval
        # invocation (both dry-run and real) so operators reading verdicts
        # JSON can confirm the shortcut wiring.
        cal3_fixture_url = (
            "https://raw.githubusercontent.com/rohitg00/agentmemory/main/"
            "benchmark/data/longmemeval_results_bm25.json"
        )

        if dry_run:
            envelope = self._stub_dry_run_result(
                corpus="longmemeval", sample_size=sample_size
            )
            envelope["_loader_query_count"] = len(queries)
            envelope["_cal3_fixture_url"] = cal3_fixture_url
            envelope["_skeleton_note"] = (
                f"dry-run skeleton with {len(queries)} mock queries via "
                "_longmemeval_loader (W309 Stream D). W305 §0.bis Cal-3 "
                f"PREFERRED $0 path will fetch {cal3_fixture_url} (302 KB) "
                "+ parse + compute R@5 against fixture's own ground-truth "
                "in W310 — $0 first-run."
            )
            return envelope

        _ = client_factory
        raise NotImplementedError(
            "W309 Stream D ships HF loader + dry-run path + Cal-3 URL log; "
            "real-corpus JSON-fixture parser (or HTTP fallback) wires in "
            f"W310. Loader returned {len(queries)} real LongMemEval queries; "
            f"PREFERRED $0 fetch target: {cal3_fixture_url}. Live fallback: "
            "POST :3111 via httpx per W305 §1.4."
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
                "dataset download, no HTTP server, no spend. Same shape as "
                "a real run so downstream consumers (verdict-ledger, EvalLog "
                "persistence, D8 benchmark_deltas scoring) can exercise "
                "their code paths pre-install. W309 ships the PREFERRED $0 "
                "JSON-fixture reader + optional :3111 HTTP fallback."
            ),
        )

    def _mock_result(self, sample_size: int, dry_run: bool) -> dict[str, Any]:
        # agentmemory's published R@5=95.2% — mock at 0.55 (mid-PARTIAL) for
        # stub-time wiring test; distinct from mem0 (0.52) and ALMA (0.57).
        return self._build_envelope(
            corpus="_mock",
            sample_size=sample_size,
            dry_run=dry_run,
            note_key="_stub_note",
            note_value=(
                "W308 mock. Real benchmark requires operator install per "
                f"W305 Stream A §1.4 (npm install -g {_NPM_SPEC}, scoped per "
                "§0.bis Cal-1) OR upstream-repo clone for JSON-fixture "
                "parsing per §0.bis Cal-3 ($0). --dry-run on real corpora "
                "returns a skeleton fixture without LLM spend or HTTP server."
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
        mock_rp5 = 0.55
        return {
            "lane": "memory-recall",
            "candidate": "rohitg00/agentmemory",
            "corpus": corpus,
            "sample_size": sample_size,
            "baseline_candidate": "mem0ai/mem0",
            "metrics": {
                "recall_precision_at_5": mock_rp5,
                "recall_precision_at_10": 0.62,
                "durability_after_30_resumes": 0.93,
                "p50_retrieval_latency_ms": 40,
                "p95_retrieval_latency_ms": 110,
                "p99_retrieval_latency_ms": 250,
            },
            "delta_vs_baseline": {
                "recall_precision_at_5_pp": (mock_rp5 - 0.49) * 100,
            },
            "traces": [],
            "errors": [],
            "dry_run": dry_run,
            note_key: note_value,
        }
