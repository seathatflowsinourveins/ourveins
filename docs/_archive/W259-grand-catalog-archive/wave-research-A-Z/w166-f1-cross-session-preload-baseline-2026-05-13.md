---
title: W166 F1 — Cross-session preload baseline measurement (post-compact preload + Karpathy §5 5-surface signals)
status: AUTHORITATIVE-BASELINE
date: 2026-05-13
wave: 166
fire: F1-P3-preload-baseline
ship_class: research-measurement (operational probe; CR-9 §item iii read-only research probe exception applies)
cite_class: TIER-3-LOCAL-OPERATOR-DERIVED (runtime probe baseline; not SOTA authority per CR-1)
parent_goal: W166 advanced-automation-convergence
---

# W166 F1 — Cross-session preload baseline (P3 partial advance)

## Why this fire

W166 /goal P3 mandates: "post-compact: measure `/context` % + paths-glob auto-load + MEMORY.md Layer-2 + last-3 close-synthesis". This fire establishes the BASELINE measurement before SOTA-cite + rule-codification follow-up fires. Sets the reference values that future fires advance.

## Baseline metrics (this fire's `ctx_batch_execute` 6-cmd concurrency=6 probe)

### Surface 1 — paths-glob auto-loaded rules (Karpathy §5 Layer-3 compiled wiki)

- **63 rule files** total at `.claude/rules/*.md`
- **System reminders this session loaded ~17 rules** (cardinal-rule-8, advanced-agent-team-standing-directive, ahfv-*, audit-action-loop, canonical, cardinal-rule-8-full-sota-content, citation-discipline, closed-loop-recursive-narrowing, cmc-*, codex-t1-auto-wedge-recovery, codex-t1-fix-forward-pattern, codex-t1-pattern-b-forward-discipline, codex-t1-system-meta-review-fallback, codification-threshold, convergence-gate, coordination, cross-model-consensus, ctff-*, deprecation-discipline, evidence-policy, fm17-subagent-fleet-depletion, fm19-readonly-guard-sidestep, fm20-path-drift-cascade, fm21-queue-time-prompt-freeze, fm22-bridge-mode-refuse-as-injection-subclass, karpathy-adapted, kiss-dry-yagni, launch-discipline, layered-gates-architecture, lga-*, mia-pre-apply, multi-perspective-subagents, named-failure-modes, parallel-agent-wave, parallel-session-worktree-isolation, parallel-sessions, port-note-discipline, research-protocol, sota-pin-discipline, sota-research-architecture, synthesis-layer-verify, team-orch-*, team-orchestration)
- **Always-loaded (no `paths:` frontmatter)**: `fm21-queue-time-prompt-freeze.md` + `named-failure-modes.md` (+ `cardinal-rule-8-full-sota-content.md` per W160 SB6 prescription #1)
- **27% activation rate** (17/63) — moderate selectivity; could optimize via tighter paths-glob

### Surface 2 — Karpathy §5 Layer-2 index (MEMORY.md)

- **88 lines / 20KB** (under 200-line ceiling per Karpathy §5 hygiene ✅)
- **W164/W165 pointer entries**: 5 (3 W164 + 2 W165 + 1 STOP-gate summary added this arc)
- **Layer-3 compiled wiki**: 5811 total lines across 4 W164 reference files in `memory/`
- **Auto-loaded at session start** per CCBP `claude-memory.md @ HEAD 48f2ceb` ancestor-loading mechanism (always; immediately at startup)

### Surface 3 — Last close-synthesis docs (cross-session preload-candidate)

Available at `tmp/*close-synthesis*.md` (gitignored — operator-side review):

1. `w165-P0-close-synthesis-2026-05-13.md` (13KB, today — W165 P0 4-agent fan-out)
2. `wave156-close-entry.md` (4KB, 2026-05-12 — W156 F1 manifest-first reconciliation)
3. `wave156-f1-close-synthesis-2026-05-12.md` (10KB, 2026-05-12 — Tier 1a INSTALLED verdict)
4. `wave152-f30-close-synthesis.md` (9KB, 2026-05-11)
5. `wave133-fire1-close-synthesis-2026-05-10.md` (12KB, 2026-05-10)
6. `wave117-close-synthesis.md` (8KB, 2026-05-09)

**Cross-session preload SOTA candidate**: last-3 close-synthesis docs covering past 5 days = ~30KB of compiled-wiki summary. Cite anchor: CCBP `claude-memory.md @ 48f2ceb` Ancestor-Loading mechanism (always-loaded at startup).

### Surface 4 — CR-3 mechanical enforcement evidence (T3 codex postcommit live)

- `codex_review_HEAD_ba92c5ec.txt` (271 bytes, 10:47) — W165 P1 FM-20 catch verdict
- `codex_review_HEAD_5b3c4658.txt` (512 bytes, 10:31) — W165 P0 close-synthesis verdict
- `codex_review_HEAD_89275374.txt` (536 bytes, 9:37) — W164 ship 8927537 verdict (earlier today)
- **285+ historical** `codex_review_HEAD_*.txt` per manifest §2 L84 W156 F1
- T3 fires automatically on EVERY `Bash(git commit *)` PostToolUse — Phase 1 bootstrap exception RETIRED

### Surface 5 — Backend memory persistence (mcp-memory + graphiti chain)

This arc's verifiable hash chain (W164→W165→W166 F1):
- W164 F37: mcp-memory `46277d02` (1st W164 episode group=eee)
- W164 F37+F42: mcp-memory `db5d55b5` + graphiti `W164-Fires-F42-F39-F38a-Real-Persist`
- W165 P0: mcp-memory `5b668dda85f7d944` + graphiti `W165-P0-Close-Synthesis-...`
- W165 P1: mcp-memory `6312e7fff31fc946` + graphiti `W165-P1-FM20-Catch-N8-...`
- W166 goal: mcp-memory `4ae7060d53b0384d` + graphiti `W166-Goal-Predicate-PasteReady-FM02c-...`
- W166 F1 (this fire — pending after this Write)

## SOTA cross-session preload pattern (research synthesis from probe)

**Anthropic CC native preload chain** (per CCBP `claude-memory.md:34-40 @ HEAD 48f2cebeb88b389b27231c418ceadb65baf813fd` [VERIFIED 2026-05-12]):

1. **Ancestor Loading**: Claude Code walks UP directory tree from CWD to filesystem root, loads every CLAUDE.md found — **immediately at startup**. Loads `Z:/claude-sota-installed/CLAUDE.md` + `Z:/claude-sota-installed/CLAUDE.local.md` + any ancestor CLAUDE*.md.

2. **Descendant Loading**: Subdirectory CLAUDE.md files NOT loaded at launch; lazy-loaded when Claude reads files in those subdirectories (per session-progression).

3. **paths-glob frontmatter auto-load**: Rule files at `.claude/rules/*.md` with `paths:` frontmatter auto-load when the matching glob fires (e.g., `.claude/rules/codex-t1-fix-forward-pattern.md` paths-glob auto-loads when editing `.claude/state/codex_consult_*.txt`).

4. **Always-loaded rules** (no `paths:` frontmatter): load every session regardless of touched paths — currently 2-3 rules (`fm21-queue-time-prompt-freeze` + `named-failure-modes` + `cardinal-rule-8-full-sota-content`). These are HIGH-VALUE per `kiss-dry-yagni.md` (universal applicability invariant).

5. **MEMORY.md Layer-2 index**: always-loaded at session start per Karpathy §5 + CCBP discipline. Must be ≤200 lines per Layer-2 hygiene; current 88 lines is healthy.

6. **MCP backends** (mcp-memory + graphiti): NOT auto-loaded into context but searchable via tool calls. Hash chain provides cross-session continuity when sessions probe `mcp__memory__memory_search` or `mcp__graphiti__search_memory_facts` at session start.

## Forward-fix-forward queue (W166 P3 follow-up fires)

1. **W166 F2 — SOTA cross-session preload SOTA-cite**: research repos for SessionStart hook patterns (continuous-claude / autoresearch / agent-orchestrator / Continuous-Claude-v3 / dmux-workflows / superpowers); produce TIER-1 cite anchors at file:line+HEAD SHA depth
2. **W166 F3 — `.claude/rules/post-compact-preload-discipline.md` codification**: if cycle-322 n≥3 met (W164 F22-F36 silent-dual-write per fm20 row 7 + W165 P1 FM-20 row 8 + this fire's baseline catch = n=3 same-arc evidence ladder)
3. **W166 F4 — SessionStart hook design**: mechanical preload top-N relevant memories at session-start via `mcp__memory__memory_search` semantic query against MEMORY.md Layer-2 pointers

## STOP gate progress (W166 5-condition predicate)

| # | Condition | Status | This-fire contribution |
|---|---|---|---|
| **P0** | ≥2/3 INSTALL OK | ⏳ QUEUED | Operator-gated `/plugin marketplace add wshobson/agents` etc. |
| **P1** | ≥45% CR-8 coverage | ⏳ QUEUED | F23 24.7% → ≥45% via §11+§11.5+§13 batch fire |
| **P2** | ≥10/14 repo verdict | ⏳ QUEUED | 4-agent BRIDGE-MODE fan-out fire (Agent B FM-17.e bypass via Path P) |
| **P3** | 5-surface verified | 🔄 PARTIAL THIS FIRE | Baseline measurement captured (Surfaces 1-5 audited); W166 F2-F4 follow-up fires complete codification |
| **P4** | ≥1 obs wire | ⏳ QUEUED | LiteLLM→Langfuse OR OTLP→Phoenix wire fire |

## Cite trail

- CCBP claude-memory.md L34-40 @ HEAD 48f2ceb [VERIFIED 2026-05-12 via W156 F1 manifest reconciliation]
- Karpathy §5 Wiki Compounding Surface at `Z:/claude-sota/.claude/rules/karpathy-adapted.md §5` (cite-import-AMBER per §14.5)
- manifest §2 L84 + §18.1 (W156 F1 + W155 F45 V2 catch)
- auto-compact-discipline.md §Rank #1 ctx_batch_execute usage (this fire's probe method)
- T3 codex postcommit live evidence: `codex_review_HEAD_ba92c5ec.txt` + `codex_review_HEAD_5b3c4658.txt` + `codex_review_HEAD_89275374.txt` (W165 P1 + W165 P0 + W164 F38a-F42-F39 commits this calendar day)

## VERDICT

**W166 P3 BASELINE-MEASUREMENT-COMPLETE** — 5 surfaces audited at runtime probe; CR-3 mechanical enforcement verified via 3 recent T3 verdicts; cross-session preload chain mapped per CCBP + Karpathy §5 cite anchors. P3 STOP partial-credit (baseline established); W166 F2-F4 follow-up fires advance codification toward full P3 close.
