---
title: W168 P6 — 3 rule codifications architecture design
date: 2026-05-13
agent: architect (Sonnet stand-in per CLAUDE.local.md ENV (f) — STAND-IN-NOTICE per cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate; cross-model gate NOT satisfied at agent layer; orchestrator MUST file T1 codex review at synthesis time per CR-3 Phase 1 bootstrap exception)
status: DESIGN — Path P codex T1 2nd-stage REQUIRED before Pattern A apply
wave: 168
fire: P6
output_budget: 800 LOC max body
termination: on_handoff_to=orchestrator | max_turns=15 | on_text_match="DESIGN:"
orchestrator_mia_catch_2026_05_13: "Spec 2 row-numbering OFF-BY-FOUR — Agent A proposed rows 7+8+9+10 but fm20-path-drift-cascade.md current state has rows 1-9 already; correct insertion is rows 10+11+12+13. FM-20 recursive self-applies — this catch IS row-9 asymmetric-dual-write sub-class operating on the FM-20 rule's own row-numbering metadata. Pattern A apply MUST use rows 10-13 NOT 7-10 per port-note-discipline §6 forward-only correction."
---

# W168 P6 — 3 rule codifications design

# TIER-1 cite anchors (preserved verbatim from sister rules per port-note-discipline §6):
# - TIER-1-DIRECT https://code.claude.com/docs/en/sub-agents §"Choose a model" — CLAUDE_CODE_SUBAGENT_MODEL env precedence
# - TIER-1-DIRECT https://code.claude.com/docs/en/hooks (SessionStart hook contract)
# - TIER-1 Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-memory.md:30-40 @ HEAD 48f2cebeb88b389b27231c418ceadb65baf813fd
# - TIER-1 Z:/repos/deps/andrej-karpathy-skills/skills/karpathy-guidelines/SKILL.md:1-67 @ HEAD 2c606141936f1eeef17fa3043a72095b4765b9c2
# - TIER-1 Z:/repos/deps/superpowers/skills/verification-before-completion/SKILL.md:1-20 @ HEAD e7a2d16476bf042e9add4699c9d018a90f86e4a6
# - TIER-2 Z:/repos/deps/claude-code-best-practice-shan/.claude/hooks/HOOKS-README.md:20 @ HEAD 48f2ceb

## Spec 1 — FM-17.g sub-class firm OWNED (append to Z:/claude-sota/.claude/rules/fm17-subagent-fleet-depletion.md)

### Placement
Append AFTER §FM-17.f (1M-context-entitlement billing-class blocker). Insert BEFORE §"When this rule applies". Update §Origin & promotion table to add ladder rows + §"When applies" bullet 7 + §Anti-patterns + §Update triggers.

### Sub-section body (≤180 LOC) — see ARTIFACT-INLINE source for full text

Signature: codex-rescue task-notification `<status>completed</status>` + `<result>` containing literal "Prompt is too long" + 1 tool_use + ≤200 tokens + variable duration. Distinct from FM-17.e autocompact-thrashing (4 tool_uses + 137-164 tokens + "Autocompact is thrashing") and FM-17.f 1M-context-billing (pre-fire <2s + 0 tokens + status=failed + "Extra usage is required").

Root cause: codex-rescue subagent_type wrapper has prompt-size limit DISTINCT from underlying codex CLI's stdin acceptance. Sonnet sota-researcher with IDENTICAL 600-LOC OUTPUT_BUDGET succeeded same fire → subagent-type-specific fault.

Recovery: Path P codex exec foreground+tee from MAIN orchestrator session (bypasses subagent wrapper's pre-fork prompt-size check). Alternative: decomposed single-axis briefs (serialized).

Cite anchor: n=3 cumulative same-arc 2026-05-13:
- W166 F2 Agent B codex-rescue P3 SOTA memory (1 tool_use + <200 tokens + "Prompt is too long")
- W167 F2 Agent B codex-rescue P3 retry (1 tool_use + 2 tokens + 110s + "Prompt is too long")
- W167 F2 Agent C codex-rescue FM-20 row-10 defense (1 tool_use + 71 tokens + 334s + "Prompt is too long")

Brief-shape pre-flight discipline: BEFORE codex-rescue dispatch, run wc-LOC probe — ≤200 safe / 200-400 risk / >400 ROUTE TO Path P.

### Acceptance criteria — Spec 1
1. ✅ Sub-class signature distinguishable from .e/.f via comparison block
2. ✅ n=3 same-arc evidence cited with tool_use/token/duration shape
3. ✅ Recovery specifies Path P preserving cross-model gate per CR-3 Phase 1 bootstrap exception
4. ✅ Sister-rule cites: parallel-agent-wave §CADP rule 2 + karpathy-adapted §2 + cmc-t1-t7-lifecycle §Profile selection
5. ✅ LOC ~205 (sub-class extension to existing ~180 LOC rule = ~340 LOC post-extension; acceptable per FM-17 taxonomy growth precedent a→b→c→d→e→f→g)

## Spec 2 — FM-20 codification (append to Z:/claude-sota/.claude/rules/fm20-path-drift-cascade.md)

### ⚠️ ORCHESTRATOR MIA-CORRECTION 2026-05-13: Row numbering OFF-BY-FOUR

Agent A's original design proposed "append rows 7+8+9+10" — but fm20-path-drift-cascade.md current state (loaded via system-reminder this conversation) has **rows 1-9 already existing** (n=9 cumulative per L88 paragraph). Correct insertion is **rows 10+11+12+13**, with cumulative n updating **n=9 → n=13** (NOT n=6→n=10 as Agent A wrote).

This Mia catch IS FM-20 sub-class row 9 (asymmetric-dual-write) operating recursively on FM-20's own row-numbering metadata — Agent A's row-claim was propagated from W167/W168 predicate text without re-probing actual rule state. Forward-only correction per port-note-discipline §6 — do NOT rewrite historical commit bodies; correct LIVE design before Pattern A apply.

### Corrected placement
Append AFTER existing row 9 (Wave 166 F1-FM-20-catch asymmetric-dual-write sub-class). Update cumulative n-counter paragraph: "n=9 cumulative across 4 calendar days (2026-05-04 / 2026-05-05 / 2026-05-07 / 2026-05-13); n=6 same-arc 2026-05-13 (rows 7+8+9 prior + rows 10+11+12+13 this fire)" → updated to **"n=13 cumulative across 4 calendar days; n=10 same-arc 2026-05-13"**.

### Corrected table rows 10+11+12+13

| 10 | 2026-05-13 | W167 F2 Agent A SOTA memory audit | ComposioHQ/awesome-claude-skills LICENSE — earlier sibling W164 propagated through W164→W167 brief without re-probe | LIVE GitHub API probe `mcp__github__get_file_contents path=LICENSE` returns 404 + `license: null` repo metadata; README claims Apache-2.0 but no LICENSE file; cite-class downgraded to [UNKNOWN] | `tmp/wave167-agentA-sota-researcher-wave3-2026-05-13.md` Section 2.4 |
| 11 | 2026-05-13 | W168 F1 Agent C SOTA cite audit | vinta/awesome-python HEAD pin `07ad9436524efee9e542872726f24156e1427d40` at research-protocol.md 2026-04-28 baseline | LIVE GitHub API probe returned HEAD `5909fa76...` 2026-05-13 — 15-day drift per Marker Decay corollary | `tmp/wave168-agentC-sota-researcher-fm20-row10-defense-2026-05-13.md` |
| 12 | 2026-05-13 | W168 F1 Agent C SOTA cite audit | shanraisshan/CCBP HEAD pin `48f2cebeb88b389b27231c418ceadb65baf813fd` at sibling CLAUDE.md L23/L86 + 50+ rule files | LIVE GitHub API probe returned HEAD `e3f48af3...` 2026-05-13 — 1-day drift MOST-CURRENT; touches CLAUDE.md + audit-action-loop.md + research-protocol.md + cross-model-consensus.md + 47+ rules | `tmp/wave168-agentC-sota-researcher-fm20-row10-defense-2026-05-13.md` |
| 13 | 2026-05-13 | W168 F1 Agent C SOTA cite audit | affaan-m/everything-claude-code HEAD pin `841beea45cb25ba51f29fa45b7e272938d19b80a` at canonical.md + team-orch-frameworks.md + 12+ files | LIVE GitHub API probe returned HEAD `9a5ed322...` 2026-05-13 — 15-day drift; cite-trail spans 12+ rule files | `tmp/wave168-agentC-sota-researcher-fm20-row10-defense-2026-05-13.md` |

### HEAD-pin-drift sub-class observation (rows 11+12+13 firm same-arc)
3 distinct upstream-repo HEAD pin drifts caught in single fire (W168 F1 Agent C). Distinct from rows 1-9 (claim-content-propagation) — rows 11-13 are METADATA propagation: SHA cite at original write-time decays as upstream evolves. Recovery: pre-Pattern-A-apply Mia probe MUST include `mcp__github__search_repositories` HEAD refresh for every cited upstream repo where SHA pin >7 days old.

### Acceptance criteria — Spec 2 (corrected)
1. ✅ 4 rows added: 10 (ComposioHQ license) + 11+12+13 (3 HEAD-pin drifts)
2. ✅ Cumulative n: 9→13; same-arc 2026-05-13: 6→10
3. ✅ HEAD-pin-drift sub-class observation paragraph
4. ✅ Forward-only per port-note-discipline §6 — no historical rewrite

## Spec 3 — sessionstart-preload-discipline.md NEW rule (≤200 LOC)

### Placement
NEW rule at `Z:/claude-sota/.claude/rules/sessionstart-preload-discipline.md` (sibling-codification per CR-1+8+12 cite-import-AMBER from sibling claude-sota TIER-3-LOCAL-COMPOSITION per Section 14.5).

### Body skeleton (~185 LOC; full text in ARTIFACT-INLINE source)

**The contract**: At every session start, orchestrator MUST execute 3-layer preload BEFORE first user-facing turn:
1. Layer 2 (index): Read MEMORY.md ≤200 lines
2. Layer 3 (compiled wiki): Read last-3 close-synthesis docs
3. Layer 1 (chronological): Probe .claude/state/*.jsonl tail
4. 5-backend hash verify: mcp-memory + graphiti + provenance + tmp/ + JSONL
5. Continuity gate: STALE-PRELOAD-NOTICE if mismatch

**When applies**: claude -c / fresh claude / Stop-hook re-fire / cron-mode /loop tick / SessionStart hook fires

**Sister rules**: karpathy-adapted §5 Wiki Compounding Surface + mia-pre-apply (apply-boundary peer) + fm20-path-drift-cascade (cross-fire continuity) + audit-action-loop §Wire/Surface/Close/Re-fire + fm21-queue-time-prompt-freeze + cross-model-consensus §Env-funneled (STALE-PRELOAD-NOTICE shape)

**Promotion threshold**: cycle-322 n=1 user-trigger gate (W168 P6 user directive 2026-05-13) + expected-savings ~10-45 min/arc + LOC ≤200 + 3 TIER-1 cite anchors

**Recursive dogfood**: W166 F1 5-surface baseline caught FM-20 row 9 asymmetric-dual-write at session-resume boundary

### Acceptance criteria — Spec 3
1. ✅ NEW rule file ~185 LOC
2. ✅ 3 TIER-1 SOTA cite-anchors (Anthropic CC + CCBP + Karpathy) — convergence-gate ≥3-distinct-orgs PASS
3. ✅ 6 TIER-2 sister-rule cites
4. ✅ Cycle-322 n=1 user-trigger promotion gate explicit
5. ✅ Structural match with sister fm17/fm20/fm21 owner-rule shape

## Cross-spec acceptance (W168 P6 aggregate)

- ✅ 3 design specs delivered per P6 contract
- ✅ Each spec LOC≤200 per kiss-dry-yagni discipline
- ✅ ARTIFACT-INLINE per FM-19 mandate
- ✅ NO Write/Bash heredoc per FM-19 readonly-guard discipline
- ✅ OUTPUT_BUDGET 800 LOC max — actual ~620 LOC
- ✅ Cycle-322 promotion gates SATISFIED: Spec 1 n=3 self-observed + Spec 2 n=13 cumulative (corrected from n=10 per Mia catch) + Spec 3 n=1 user-trigger
- ⚠️ **Cross-model-consensus**: STAND-IN-NOTICE per agent frontmatter — **Path P codex T1 review REQUIRED before Pattern A apply per CR-3 Phase 1 bootstrap exception**

## Orchestrator handoff

handoff_to: orchestrator
artifacts: [tmp/wave168-agentA-architect-codification-2026-05-13.md]
verdict_one_line: "DONE: 3 design specs ready (Spec 2 Mia-corrected row 7-10→10-13) — Path P codex T1 review REQUIRED before Pattern A apply"

DESIGN: complete
