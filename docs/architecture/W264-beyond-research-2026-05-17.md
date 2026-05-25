# W264 — Beyond-W259 SOTA Discovery (2026-05-17)

> Persisted from the `sota-researcher` agent's inline return (the role disables Write — main thread persists). Discovery-only across 8 target layers via GH GraphQL + DeepWiki + Apr-May 2026 WebSearch, deduplicated against the 147-entry W259 bold-cell repos.
>
> **H0 (≥10 missing 300★+/2026-active repos; ≥3 score ≥21/30 ADOPT-bar) — VERIFIED.** 24 missing, 12 cleared.

## §0 — SRA D1-D10 + 3-axis convergence (recap)

Each candidate scored D1-D10 (0-3 each, /30) + axis A1/A2/A3 PASS/PARTIAL/FAIL. ADOPT requires composite ≥21 AND all 3 axes PASS.

## §1 — Layer-by-layer ADOPT picks (composite ≥21/30)

### Layer 1 — Agent skills / plugins ecosystem
- **`affaan-m/everything-claude-code`** 185k★ MIT — **already-installed**. W264-agent-orchestration audit recommended REJECT for kitchen-sink overlap; this discovery agent gave ADOPT. **Net verdict: KEEP per current state, watch for true overlap-prune signal.**
- **`addyosmani/agent-skills`** 42.7k★ MIT — Production engineering skills from Addy Osmani (Chrome T1). **ADOPT** 25/30.
- **`vercel-labs/agent-skills` + `vercel-labs/skills`** 26.7k + 18.9k★ Apache-2 — Vercel official + `npx skills` runner. **ADOPT** 25/30.

### Layer 2 — Memory
- **`MemTensor/MemOS`** 9.1k★ — self-evolving memory OS, claimed 35.24% token savings. **ADOPT** 23/30 (verify claim before wire).
- **`MemoriLabs/Memori`** 14.5k★ — agent-native memory infra (distinct from `GibsonAI/memori`). **ADOPT** 22/30.
- **`Tencent/TencentDB-Agent-Memory`** 2.8k★ — 4-tier local-first, zero external deps, Tencent T1. **ADOPT** 22/30.
- **`volcengine/OpenViking`** 24k★ Apache-2 — ByteDance hierarchical context DB. **ADOPT** 23/30.
- Note: W264-memory-ultimate independently concluded the 4-tier stack is SOTA-CONVERGED with 0 displacers. These four are LATERAL candidates (different paradigm), not direct swaps. **All gated by: a concrete corpus/workload that the current 4-tier doesn't already serve.**

### Layer 3 — RAG / context
- **`mksglu/context-mode`** 14.9k★ MIT — measured 98% context reduction; **already-installed**. **KEEP**.
- W264-rag-context independently verdicted REJECT-ALL on new GraphRAG/vector-store MCPs (no corpus to back them).

### Layer 4 — Parallel-session / orchestration
- **`bytedance/deer-flow`** 68k★ Apache-2 — ByteDance long-horizon harness. **ADOPT** 25/30 (eval as a 5th parallel mode, NOT a replacement for agent-teams).
- **`SethGammon/Citadel`** 561★ MIT — 4-tier `/do` routing + campaign persistence + parallel worktrees. **ADOPT** 22/30.
- **`Dicklesworthstone/claude_code_agent_farm`** 833★ MIT — 20+ CC agents parallel with lock-based coordination. **ADOPT** 21/30 (study only; Stream-B verdict already settled — agent-teams is the orchestration layer).

### Layer 5 — Git-workflow for AI
- **`automazeio/ccpm`** 8.1k★ MIT — GH-Issues + git-worktrees PM-skill, issue-as-source-of-truth. **ADOPT** 22/30.

### Layer 6 — Observability / eval
- **`comet-ml/opik`** 19.3k★ Apache-2 — LLM/RAG/agent tracing + evals (Comet T1). **ADOPT** 24/30.
- **`pydantic/logfire`** 4.2k★ MIT — Pydantic-team OTEL-native AI observability. **ADOPT** 23/30.
- W264-observability said Phoenix is load-bearing and Langfuse is DROP. opik+logfire would be eval-loop adds, not replacements.

### Layer 7 — Tool-call reliability
- Niche largely empty on public GH (>100★). BFCL/τ-bench are leaderboard-only. **No ADOPT** beyond W259 inclusion.

### Layer 8 — Background-task / cron
- CC-native `claude --bg` covers it. **No ADOPT** beyond W259.

## §2 — Watchlist (composite 17-20)

`kepano/obsidian-skills`, `mattpocock/skills`, `ComposioHQ/awesome-claude-skills`, `JuliusBrussee/caveman` (65% token cut), `MemMachine`, `thedotmack/claude-mem`, `basicmachines-co/basic-memory`, `memvid/memvid`, `plastic-labs/honcho`, `FlowElement-ai/m_flow`, `supermemoryai/claude-supermemory`, `letta-ai/claude-subconscious`, `CaviraOSS/OpenMemory`, `MemPalace/mempalace` (suspect), `parcadei/Continuous-Claude-v3`, `golutra`, `stravu/crystal`, `claude_codex_bridge`, `agent-of-empires`, `multi-agent-shogun`, `claw-orchestrator`, `d-kuro/gwq`, `nekocode/agent-worktree`, `confident-ai/deepeval`, `coze-dev/coze-loop`, `AutoRAG`, `lmnr-ai/lmnr`, `BlazeUp-AI/Observal`, `traceroot-ai/traceroot`, `engram`, `aannoo/hcom`.

## §3 — Retractions / suspects

- **`MemoClaw`** — no GH match — RETRACTED from the user's pasted memory catalog.
- **`MemPalace/mempalace`** — self-claim "best benchmarked memory" — pending third-party verification.
- **Star-count capped (D3=2/3)**: `affaan-m/everything-claude-code` (185k★) and `obra/superpowers` (195k★) — both real and maintained, but >95th-percentile velocity. Numbers are unusual but verified.

## §4 — Recommendation: quarterly W264-style rescan

Two already-installed repos (`everything-claude-code`, `context-mode`) confirm the W259-catalog has a blind spot at the "newly-trending Jan-Apr 2026 cohort" — ADOPT-grade repos surface within 60-120 days. **Recommendation: schedule a W264-pattern rescan every 90 days.**

## §5 — Cite-class

TIER-3-LOCAL-COMPOSITION (GH API 2026-05-17T16:00Z + DeepWiki spot-check + Apr-May 2026 WebSearch). Star/license/date fields validated via `mcp__github__search_repositories` returns. All ADOPT picks have ≥1 DeepWiki or topic-tag corroboration.

## §6 — Implementation handoff (NOT INSTALLED)

Per cardinal rules, every ADOPT pick must pass:
1. R4 line-by-line audit of the claimed mechanism
2. codex `/codex:review` of the install plan
3. Add to `W259-grand-catalog/01-graphql-discovery/` (not into the immutable layer-deepdive pages)

Source-of-truth dedup set: `tmp/w259_table_repos.txt` (147 lines, regenerable via `grep -hoE '\*\*[a-zA-Z0-9_.-]+/[a-zA-Z0-9_.-]+\*\*' 02-layer-deepdive/*.md | sed 's|\*\*||g' | sort -u`).
