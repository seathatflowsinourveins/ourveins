"""W301-D D-v6-2 G11 memory-class eval Lane-D — adapter package.

First-shipped W305 per `docs/architecture/W305-D-V6-2-LANE-D-MEM0-HEADHEAD/
W305-LANE-D-DESIGN.md`.

Provides a uniform adapter contract so the lane (`harness/eval_harness.py
--mode memory-recall-lane`) can dispatch to any of the 6 W304-surfaced
candidates:

- `mem0ai/mem0` (incumbent T1-INSTALL-with-caveat AT-RISK W304)
- `RBKunnela/ALMA-memory` (R@5=0.964 VERIFIED)
- `vbcherepanov/total-agent-memory` (R@5=0.962 VERIFIED)
- `rohitg00/agentmemory` (95.2% cited, pending Lane-D reproduction)
- `mastra-ai/mastra` (94.87% cited, pending Lane-D reproduction)
- `Uranid/mnem` (Rust+WASM KG architectural; no published % yet)

Each candidate's adapter is a separate module exposing `run_benchmark()`
per the contract in `README.md`. Until the operator installs a candidate
package, only `_baseline_mock` is callable — that provides a deterministic
fixture for smoke-testing the lane wiring without any real install.

Cardinal-rule conformance:
- CR-1 (trusted): adapters wrap upstream packages from PyPI / npm / Docker
  (per W305 Stream A install paths); no self-invented backends.
- CR-2 (hooks): this is harness/ code, NOT `.claude/hooks/scripts/`; the
  harness/ directory is the sanctioned project-owned eval code location
  per `harness/eval_harness.py` precedent (W259-v9 ship).
- CR-3 (subagents): this is not a subagent; it's an eval-lane adapter
  package called from a CLI entry point.
- CR-5 (safety): adapters do not introduce new tool surfaces; they call
  candidate package APIs.
"""

from __future__ import annotations

from typing import Any, Protocol


class MemoryRecallAdapter(Protocol):
    """Adapter contract for a single memory-class candidate.

    See `README.md` for the full contract + worked example.
    """

    def run_benchmark(
        self,
        corpus: str,
        sample_size: int,
        dry_run: bool,
    ) -> dict[str, Any]:
        """Run the configured benchmark; return Lane-D result dict.

        Result dict shape (inspect_ai-EvalLog-compatible per W292 R8):
            {
              "lane": "memory-recall",
              "candidate": "<owner>/<repo>",
              "corpus": "longmemeval | hotpotqa | twowikimultihop | _mock",
              "sample_size": <int>,
              "baseline_candidate": "mem0ai/mem0",
              "metrics": {
                "recall_precision_at_5": <float 0.0-1.0>,
                "recall_precision_at_10": <float 0.0-1.0>,
                "durability_after_30_resumes": <float 0.0-1.0>,
                "p50_retrieval_latency_ms": <int>,
                "p95_retrieval_latency_ms": <int>,
                "p99_retrieval_latency_ms": <int>,
              },
              "delta_vs_baseline": {
                "recall_precision_at_5_pp": <float, points>,
              },
              "traces": [<list of inspect_ai trace dicts or empty>],
              "errors": [<list of error strings or empty>],
              "dry_run": <bool>,
            }
        """
        ...


# Adapter registry — operator adds entries here AFTER installing each
# candidate package per W305 Stream A install-path table.
_ADAPTER_MODULES = {
    "_baseline_mock": "harness.adapters.memory_recall._baseline_mock",
    "mem0ai/mem0": "harness.adapters.memory_recall.mem0",  # W306 STUB; operator-install: pip install mem0ai==2.0.2 (W305 §1.1)
    "RBKunnela/ALMA-memory": "harness.adapters.memory_recall.alma_memory",  # W306 STUB; operator-install: pip install alma-memory[local]==0.10.0 (W305 §1.2, §0.bis Cal-2)
    # "vbcherepanov/total-agent-memory": "harness.adapters.memory_recall.tam",    # operator-install: pip install total-agent-memory (verify pkg name)
    "rohitg00/agentmemory": "harness.adapters.memory_recall.agentmemory",  # W306 STUB; operator-install: npm install -g @agentmemory/agentmemory@0.9.20 (W305 §1.4, §0.bis Cal-1/3)
    # "mastra-ai/mastra": "harness.adapters.memory_recall.mastra",                # operator-install: npm install @mastra/memory + Node bridge
    # "Uranid/mnem": "harness.adapters.memory_recall.mnem",                       # operator-install: cargo build + Python FFI bindings
}


def load_adapter(candidate_slug: str) -> MemoryRecallAdapter:
    """Load and return the adapter for a candidate.

    Raises KeyError if the candidate is not registered (operator must
    add the install path + uncomment the registry entry).
    Raises ImportError if the registered module cannot be imported
    (operator must install the underlying package first).
    """
    if candidate_slug not in _ADAPTER_MODULES:
        registered = ", ".join(sorted(_ADAPTER_MODULES))
        raise KeyError(
            f"Adapter for '{candidate_slug}' not registered. Registered "
            f"adapters: {registered}. See README.md for how to add a new "
            f"candidate adapter after install."
        )
    module_path = _ADAPTER_MODULES[candidate_slug]
    import importlib

    module = importlib.import_module(module_path)
    if not hasattr(module, "Adapter"):
        raise ImportError(
            f"Module {module_path} loaded but does not expose an 'Adapter' "
            f"class. Per adapter contract, each module must define class "
            f"Adapter(MemoryRecallAdapter) with run_benchmark(...)."
        )
    return module.Adapter()


__all__ = ["MemoryRecallAdapter", "load_adapter"]
