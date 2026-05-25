"""Deterministic mock adapter for smoke-testing Lane-D wiring without installs.

Always returns recall_precision_at_5 = 0.55 (in the PARTIAL band 0.50-0.60).
This lets `python harness/eval_harness.py --mode memory-recall-lane
--candidate _baseline_mock` exit 0 with VERDICT: PARTIAL — proving the lane
parser, args, adapter dispatch, JSON persistence, and verdict-mapping logic
all work end-to-end before any real candidate package is installed.

Cardinal-rule conformance:
- CR-2: this is harness/ code, not `.claude/hooks/scripts/`; allowed.
- CR-5: no tool surface introduced; just returns a fixture dict.
"""

from __future__ import annotations

from typing import Any


class Adapter:
    """Deterministic mock — no real benchmark, no API spend, no installs."""

    def run_benchmark(
        self,
        corpus: str,
        sample_size: int,
        dry_run: bool,
    ) -> dict[str, Any]:
        # Deterministic mid-band result for smoke-test wiring verification.
        mock_rp5 = 0.55
        return {
            "lane": "memory-recall",
            "candidate": "_baseline_mock",
            "corpus": corpus,
            "sample_size": sample_size,
            "baseline_candidate": "mem0ai/mem0",
            "metrics": {
                "recall_precision_at_5": mock_rp5,
                "recall_precision_at_10": 0.62,
                "durability_after_30_resumes": 0.93,
                "p50_retrieval_latency_ms": 45,
                "p95_retrieval_latency_ms": 120,
                "p99_retrieval_latency_ms": 280,
            },
            "delta_vs_baseline": {
                "recall_precision_at_5_pp": (mock_rp5 - 0.49) * 100,
            },
            "traces": [],
            "errors": [],
            "dry_run": dry_run,
            "_mock_note": (
                "This is the deterministic mock fixture. Returns 0.55 "
                "recall_precision@5 (PARTIAL band) to prove lane wiring. "
                "Install real candidate packages per W305 Stream A and "
                "register their adapters in harness/adapters/memory_recall/"
                "__init__.py:_ADAPTER_MODULES to get real benchmarks."
            ),
        }
