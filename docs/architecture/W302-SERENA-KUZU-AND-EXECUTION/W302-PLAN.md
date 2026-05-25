# W302 Wave — serena Re-audit + Kuzu Retirement Decision + Operator-Action Execution

> **Wave**: W302 (operator's 3 explicit W302 questions: "should we remove serena? any other sota replacements? why still kuzu? kuzu is dead?")
>
> **Branch**: `sota-converge-w295` (continued; HEAD `9779db6` post-W301-codex-r1 fix-iterate).
>
> **Streams**: 2 parallel (A=serena + LSP alternatives · B=Kuzu retirement + graph-DB SOTA) + post-stream synthesis + codex r1 e2e
>
> **Cite-class**: TIER-3-LOCAL-COMPOSITION

## §0 — Pre-flight state + autonomous executions this wave-start

### T2 CONSOLIDATE pre-merge grep gate — PASS

Per W301-D §5 step 1 mitigation requirement: `find .claude -name "*.md" | xargs grep "mcp__memory__"` runs the pre-merge gate before T2 CONSOLIDATE (delete `.mcp.json:memory` block). **Result**: only `.claude/skills/mem-recall/SKILL.md` references `mcp__memory__` AT ALL, and at L32 it explicitly documents the W282d retirement + re-routes to `mcp__basic-memory__search_notes`. **T2 CONSOLIDATE is SAFE** — no consumer skill would silently break.

The 10 matching `docs/architecture/*` references are historical W286-W301 audit citations (non-blocking; descriptive not invocative).

→ **Operator can proceed** with W301 row #3 T2 CONSOLIDATE (delete `.mcp.json:memory` block + keep `plugin:everything-claude-code:memory` only) without skill-breakage risk.

### Hindsight T1 mem amendment (W301 row #4)

DEFER to operator-action — hindsight HTTP endpoint at `:9077/v1/default/banks/claude-code/memories` requires direct POST (no `mcp__hindsight__*` tool); operator-approval recommended for state-mutation to memory tier.

## §1 — Streams

| Stream | Type | Scope | File ownership | Done criteria |
|---|---|---|---|---|
| **A** | re-audit + discovery | **serena sca-v5 18-dim re-audit + LSP/codebase-nav SOTA alternatives** — W296 T2 install_score 4.81 baseline (sca-v3.1; per W300 Stream D backfill row #15); 0% T2 hit-rate per W299-D (never installed). Determine: REMOVE / KEEP / UPGRADE. Plus ≥10 alternatives (ast-grep · zoekt · gitnexus · codemap · srclight · cymbal · symbex · livegrep · aider · cline · 2026-MAY new entrants) | `W302-STREAM-A-SERENA-AND-CODEBASE-NAV-AUDIT.md` | Live state + 18-dim re-audit + ≥10 alternatives + Top-3 + verdict |
| **B** | dependency-status audit + replacement discovery | **Kuzu retirement decision + graph-DB SOTA replacement** — W300-C found upstream archived Oct 2025 + 3 active forks; W301-D queued cognee Kuzu pin audit HIGH AI #2. Decide A/B/C/D (KEEP pin / repoint fork / migrate to NebulaGraph-Memgraph-AGE-CozoDB / retire cognee tier). Audit ≥10 graph-DB alternatives | `W302-STREAM-B-KUZU-RETIREMENT-AND-GRAPH-DB-SOTA.md` | Kuzu archival confirmation + 3-fork audit + ≥10 graph-DB alternatives + A/B/C/D decision + migration plan |

**Coordinator (self)**: synthesis → `W302-AUDIT-2026-05-18.md` → codex r1 e2e → ship-chain commit.

## §2 — File ownership

- `W302-PLAN.md` — coordinator (this)
- `W302-STREAM-A-SERENA-AND-CODEBASE-NAV-AUDIT.md` — Stream A
- `W302-STREAM-B-KUZU-RETIREMENT-AND-GRAPH-DB-SOTA.md` — Stream B
- `W302-AUDIT-2026-05-18.md` — coordinator
- `W302-CODEX-R1.md` — coordinator

NO stream edits: `CLAUDE.md`, `.claude/settings.json`, `.mcp.json`, `.claude/skills/sota-convergence-audit/SKILL.md`, `VERDICT-LEDGER.md` — operator-approval-gated.

## §3 — Anti-bias mandates (carried)

- sca-v5 18-dim full for Stream A re-audit; lite 10-dim for Stream B alternatives
- ≥4 MCP families per stream (per sca-v5 cascade Stage-1)
- Stars NOT a hardgate
- Honest verdicts — don't rubber-stamp W296 T2 verdict for serena; don't auto-recommend Migration C for cognee without cost-estimate
- Source disagreements MUST surface in `sources_typed.<dim>.disagreement[]`
- 2026-MAY freshness MANDATE

## §4 — Cite-anchors

- `docs/architecture/W288-RESEARCH-ARCH-v2/VERDICT-LEDGER.md` — serena W296 T2 row + W300 Stream D backfill
- `docs/architecture/W300-MEMORY-LAYER-SCA-V5-RE-AUDIT/W300-STREAM-C-BROADER-MEMORY-SOTA-DISCOVERY.md §13` — Kuzu archival source-disagreement
- `docs/architecture/W301-MEMORY-ARCHITECTURE-DESIGN/W301-AUDIT-2026-05-18.md §7` — cognee Kuzu pin audit HIGH operator-AI #2
- `.claude/skills/sota-convergence-audit/SKILL.md` — sca-v5 LIVE rubric
- `.mcp.json` — cognee block (Kuzu dependency)
- `CLAUDE.md:31` — T3 cognee description

## §5 — Note on parallel-session work

Discovered `docs/architecture/W301-CONVERGENCE-SWEEP-AND-RESEARCH-ARCH-V6/` directory exists (separate W301 work-stream, possibly from parallel operator-session). My W301 work was at `W301-MEMORY-ARCHITECTURE-DESIGN/`. Both can coexist; no conflict expected. W302 stays scope-controlled to serena + Kuzu.

## §6 — Verification-on-completion

Each stream MUST end with:
- File written + LOC
- ≥3 cite-anchors
- Top 3 findings + confidence levels
- Source-disagreement log
- Cardinal-rule self-check
- Items routed to W302-AUDIT synthesis
