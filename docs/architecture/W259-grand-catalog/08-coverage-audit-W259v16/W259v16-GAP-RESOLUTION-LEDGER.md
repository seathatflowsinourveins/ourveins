# W259-v16 — Gap-Resolution Ledger

> "gap resolute all" — operator directive 2026-05-17. Closes every gap surfaced by the W259-v16 audits (memory evidence audit + 7-audit all-layers coverage sweep). `effective_tier = TIER-3-LOCAL-COMPOSITION`.
>
> **⚠ §2 SUPERSEDED IN PART (2026-05-17)** — the subsequent max-depth deep-dive ("gap resolute with max depth") found **2 of 22 ARE install-grade**: `j178/prek` (INSTALL-NOW — drop-in `pre-commit` replacement) and `opengrep/opengrep` (fills the commit gate's empty SAST slot). Both are commit-gate upgrades held for operator sign-off. §1 (hindsight) and §3 (install-recommended) below still stand. Authoritative resolution: `deep-resolution/GAP-RESOLUTION-DEEPDIVE-SYNTHESIS.md`.

## §1 — Functional gap (executed this pass)

| Gap | Root cause | Resolution | Status |
|---|---|---|---|
| hindsight fact-extraction inert | hindsight's plugin `settings.json` ships `llmProvider: null` — no LLM bound for memory extraction | `HINDSIGHT_LLM_PROVIDER=claude-code` added to `.claude/settings.json` `env` — hindsight extracts via the Claude Code session model (no external API key, zero-cloud) | ✅ **RESOLVED** — active at next restart |

This was the **only** gap that left an installed component non-functional. Now closed. Reversible in <1 min (delete the env key).

## §2 — The 22 coverage-completeness gaps — RESOLVED (catalogued)

All 22 are catalogued + dispositioned in `05-scoring/MASTER-SCORING-MATRIX-W259.md §5`. Audit verdict: **none is install-grade for this runtime** — each is a peer framework with no native-CC pathway, a niche/young repo, or a duplicate of a catalogued primitive. Resolution = the §5 entry. No install action — installing WATCH/PILOT/CITE-tier repos would contradict the SOTA verdict.

- **3 scored-row adds** — `HKUDS/LightRAG`, `HKUDS/RAG-Anything`, `raga-ai-hub/RagaAI-Catalyst` were the only high-star repos genuinely missing a catalog row; now scored in §5.
- **18 dispositioned non-install** — STUDY-PILOT / CITE-PATTERN / WATCH per the layer audits (`agno`, `mastra`, `deepagents`, `strands-agents`, `TensorZero`, `get-shit-done`, `qwen-code`, `evidently`, `Kiln`, `langwatch`, `OpenGrep`, `claude-hud`, …). Logged for future re-check; not installed.
- **1 runtime-relevant deferral** — `j178/prek` (Rust `pre-commit` replacement): STUDY-PILOT logged. The current `.pre-commit-config.yaml` security gate works correctly; prek is an elective future swap, not a fix.

**0 of 22 require an install.** All 22 closed.

## §3 — Catalog install-RECOMMENDED items (pre-existing — not coverage gaps)

The W259 catalog's own RECOMMENDED-not-yet-installed set. These are **not broken gaps** — the runtime is fully operational without them; they are elective enhancements that need a shared-venv / server mutation (`Z:\venvs\claude` is shared across 3 runtimes — an install warrants an explicit operator go).

| Item | Layer | Resolution |
|---|---|---|
| `BerriAI/litellm` | L1 router | Install-ready — an escape-valve for non-Claude routing; install when that routing is actually needed. Not blocking. |
| `pydantic-ai` + `instructor` | L2.5 knowledge | Install-ready (official CC skill paths exist) — pending operator go for the shared-venv mutation. |
| `cognee` | L1.5 cold tier (T3) | Install-ready (`pip install cognee` + `claude mcp add cognee`) — the cold GraphRAG tier; server-start is an operator-elective. |

## §4 — Verdict

- **1 functional gap** — fixed this pass (hindsight LLM provider wired).
- **22 coverage-completeness gaps** — all closed: catalogued + dispositioned in matrix §5; 0 install-grade.
- **3 install-recommended items** — documented install-ready; elective, pending an operator go (shared-venv mutation).
- **0 gaps remain open.** The W259 install set is unchanged and correct; the catalog is saturated. Gap resolution complete.
