# W259-v16 — Ultimate Memory-Layer Architecture

> The definitive memory architecture for the `claude-sota-installed` runtime, wired to persist across context-less future sessions. Convergence of: the W259 catalog, the W259-v16 memory-SOTA evidence audit (`MEMORY-SOTA-EVIDENCE-AUDIT-W259v16.md`), and a research-beyond pass (88 agent-memory repos surveyed via 3 GitHub topic sweeps).
> `effective_tier = TIER-3-LOCAL-COMPOSITION`. Date: 2026-05-17.

## §1 — Verdict: a composed 5-tier stack (re-instated)

The SOTA memory layer is NOT one engine — it is five tiers (T0/T1/T2/T3/T4), each a distinct role, each already wired. **T3 cognee status flipped twice on 2026-05-17**: W262 audit marked it REMOVED based on `.mcp.json:11` (then comment-only), but the W259-v16 arc's `feat(W263b): cognee-mcp LIVE — T3 cold-tier memory engine wired` commit (`1eeebd8`) RE-WIRED it into the active `mcpServers` block. Current state is LIVE:

| Tier | Role | Engine | Status | Auto-wiring (future context-less sessions) |
|---|---|---|---|---|
| **T0** | Hot working-memory | CC-native — `CLAUDE.md` `@imports` + compaction (Auto Memory deliberately off) | **LIVE** | session-start native load |
| **T1** | Session memory (recall + retain) | **`hindsight`** plugin v0.6.5 (MIT; embedded `pg0` backend, Z:-junction) | **LIVE** (W262 verified — 1518 facts indexed, daemon healthy :9077, openai-compat → local 35B `:8080/v1`) | plugin hooks — SessionStart / UserPromptSubmit-recall / Stop-retain / SessionEnd + plugin MCP |
| **T2** | Warm vector store | `memory` MCP — doobidoo/mcp-memory-service, `sqlite_vec` | **LIVE** | `.mcp.json` stdio, auto-connect |
| **T3** | Cold doc-GraphRAG | **`cognee` MCP** (W259-v16 arc re-wired 2026-05-17 via `1eeebd8`) | **LIVE** (was REMOVED at W262 audit time; re-instated same day) | `.mcp.json` `type:http` — auto-connect when cognee server running |
| **T4** | Temporal knowledge graph | `graphiti` MCP — FalkorDB `:16379` + Ollama `qwen3:8b` `:16700` | **LIVE** | `.mcp.json` stdio, auto-connect |

All four already-installed pieces (T0/T2/T4 live + T1 installed) stay in **distinct roles — nothing is replaced**. hindsight (T1) is purely additive: session-scoped recall/retain that the other tiers do not provide.

## §2 — T1 / hindsight: memory PRIMARY — confirmed, reason corrected

The W259-v16 evidence audit CONFIRMED hindsight as memory PRIMARY but RETRACTED W259's stated reason. The claim "hindsight's 91.4% LongMemEval was independently reproduced by Virginia Tech + Washington Post" is **FALSE** — those parties co-author hindsight's own paper (arXiv 2512.12818); co-authorship ≠ independent reproduction. **No memory engine has an independently-reproduced LongMemEval number; no official leaderboard exists** — OMEGA 95.4 / Mastra 94.87 / hindsight ~94.6 are a statistical tie inside the judge-noise band.

hindsight wins on the **operational axes**, not the benchmark: the only memory engine with a full native-CC plugin (4 lifecycle hooks + MCP + `create-agent` skill), MIT-licensed, verified Windows-local, zero-cloud-capable. For a Claude Code runtime, integration is the decisive axis.

## §3 — Load-bearing pre-restart fix

hindsight's plugin `settings.json` (`.claude/plugins/cache/hindsight/hindsight-memory/0.6.5/settings.json`) ships `llmProvider: null`. hindsight's fact-extraction needs an LLM; left null (or defaulting to the quota-dead `OPENAI_API_KEY`) it cannot extract memories. **Fix: set `HINDSIGHT_LLM_PROVIDER=claude-code`** — hindsight then uses the Claude Code session's own model for extraction (zero external key, session-local). Apply to `.claude/settings.json` `env` BEFORE the next restart (the embedded daemon spins up at SessionStart). Verify the exact env-var name/value against hindsight's plugin docs first.

## §4 — Research-beyond: 88 memory repos surveyed — no displacement

3 GitHub topic sweeps surveyed 88 agent-memory repos. New repos not previously in the W259 catalog: `zilliztech/memsearch`, `Tencent/TencentDB-Agent-Memory`, `FlowElement-ai/m_flow`, `CaviraOSS/OpenMemory`, `MemTensor/MemOS`, `oceanbase/powermem`, `zjunlp/LightMem` (ICLR 2026), `samvallad33/vestige` (FSRS decay), `memvid/claude-brain`, `swarmclawai/swarmvault`, plus `MemTensor/HaluMem` (a new memory-hallucination benchmark). A W260 completeness pass additionally evaluated `volcengine/OpenViking` (ByteDance, 24k★ — the operator-named "openviking"): LoCoMo-only self-report, no LongMemEval, AGPLv3, heavy Go/Rust/C++/VLM infra → does not displace hindsight; reinforces the saturated-field verdict.

**Verdict: none displaces the 5-tier architecture** — they lack a native-CC plugin pathway, lack comparable benchmarks, or are too young (no burn-in). The architecture is saturated. `MemTensor/HaluMem` is the single item worth a future watch — a memory-hallucination benchmark could re-rank the field if it gains independent adoption.

## §5 — Future-session persistence

The architecture is self-wiring: T0 is CC-native (loads at session start); T2/T3/T4 auto-connect via `.mcp.json`; T1/hindsight auto-loads via its plugin hooks + MCP. A context-less future session inherits all five tiers with **zero in-context memory required** — the design goal.
