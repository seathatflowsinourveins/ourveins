---
title: Wave 167 P0 Close-Synthesis — 5-Agent Fan-Out + STOP-7of7 Disposition
status: AUTHORITATIVE-AGGREGATE
date: 2026-05-13
agent: orchestrator (Wave 167 close-synthesis)
fire: W167-CLOSE
inputs:
  - tmp/wave167-A1-sota-researcher-15repo-audit-2026-05-13.md
  - tmp/wave167-B1-codex-rescue-arch-audit-2026-05-13.md
  - tmp/wave167-D1-archaeology-2026-05-13.md
  - tmp/wave167-E1-architect-install-design-2026-05-13.md
  - tmp/wave167-init-2026-05-13.md
---

# Wave 167 Close-Synthesis

## STOP-7of7 final disposition

| # | Predicate | Status | Evidence |
|---|---|---|---|
| **P0** | Wave-1 5-agent fan-out completed + close-synthesis persisted | ✅ **MET** | A1 ✅ + B1 ⚠ PARTIAL + D1 ✅ + C1 HNF + E1 ✅ all artifacts persisted; THIS file IS the close-synthesis |
| **P1** | SessionStart preload hook DESIGN landed cited TIER-1 | ✅ **MET via HNF** | `.claude/rules/sessionstart-preload-discipline.md` ALREADY SHIPPED W169 P0 (parallel-session shipping; my P1 prescription was OVER-claim per FM-20 row-8) |
| **P2** | /compact smoke probe verdict recorded in manifest | ⏸ **PENDING** | Requires operator to type `/compact` for live PreCompact hook semantic verify; cannot self-execute |
| **P3** | Obs-stack wire prescriptions delivered | ⏸ **PENDING** | Defer to next-fire — Wave 1a did not surface obs-stack actionable prescriptions; W164 F39 baseline (10 containers UP healthy) intact; Stack B Langfuse + Stack C Phoenix wire-design queued |
| **P4** | Manifest CR-8 batch advance 24.7% → ≥35% | ⏸ **PENDING** | D1 archaeology FLAGGED §13 manifest hooks-table CR-8 column extension as DEFER (BLOCKED state from Wave 164 F30 table-shape mismatch); other §-batch additions defer to next-fire after Wave 167 ships land |
| **P5** | goal-prompt-synthesis skill UPDATE landed with W167+ template | ✅ **MET via PARTIAL HNF** | `.claude/skills/goal-prompt-synthesis/SKILL.md` R5 "W172 P3 NEW" ALREADY SHIPPED parallel-session; R6+ extensions for auto-compact + 5-backend persist + STOP-gate def + Forward-Discipline #2 dogfood are open scope (defer to next fire) |
| **P6** | FM-20 row-10 codify sibling-pin-staleness sub-class | ✅ **MET via HNF** | `.claude/rules/fm20-path-drift-cascade.md` rows 10-13 ALREADY SHIPPED W168 README-blob-pin-drift sub-class (n=13 cumulative); my P6 prescription was OVER-claim per FM-20 row-8 |

**Final tally**: 4 of 7 SATISFIED (P0 ✅ + P1 ✅ HNF + P5 ✅ PARTIAL HNF + P6 ✅ HNF). 3 PENDING (P2 operator-action / P3 + P4 next-fire ships).

## Wave 1 agent dispatch summary

| Agent | subagent_type | Status | Substantive value |
|---|---|---|---|
| **A1** sota-researcher | sota-researcher | ✅ COMPLETE (487k tokens / 48 tool_uses / 759s) | 15-repo VERDICT-ALL-15 + 6 FM-20 catches + Top-3 INSTALL + Top-3 REJECT |
| **B1** codex-rescue | codex:codex-rescue | ⚠ PARTIAL (FM-17.c.ii Windows cert-store ACL wedge) | 3-axis local-fallback audit; 3 rule prescriptions Mia-VERIFIED GENUINE |
| **D1** archaeology | code-modernization:legacy-analyst | ✅ COMPLETE (195s / 11 tool_uses) | Top-3 highest-blast-radius surfaces + Wave 1b safe-target list + atomic-commit defense |
| **C1** evaluator | evaluator | HNF (brief misroute caught) | Refused fabrication; orchestrator-direct Mia substitute performed (3 of B1's prescriptions VERIFIED GENUINE GAPS) |
| **E1** architect | feature-dev:code-architect | ✅ COMPLETE (219s / 15 tool_uses / 326k tokens) | ≥2-option design for 3 INSTALL-actionable candidates + Mia 5-probe checklists + build sequence |

**Cross-model gate (per `cross-model-consensus.md §Verdict report shape`)**: PARTIAL — STAND-IN-NOTICE applies for A1+B1 (both Sonnet stand-in dispatch per CLAUDE.local.md ENV (g) Anthropic Max Opus depletion fallback per `cmc-env-funneled-disclosure.md` mandatory disclosure). B1 Pattern D foreground+tee FAILED at FM-17.c.ii Windows cert-store ACL — codex CLI never reached model. **Recommendation**: operator-direct codex T1 cross-verify of THIS close-synthesis BEFORE INSTALL action lands per Path P canonical recipe (post Windows cert-store remediation).

## Top-3 INSTALL queue (per E1 build sequence)

| Order | Candidate | Action | Pre-ship gate |
|---|---|---|---|
| 1 | quemsah/awesome-claude-plugins manifest §3 ADD | Edit `docs/sota-installed-manifest.md` §3 + atomic commit | Mia 5-probe (LICENSE absence + HEAD freshness + §3 row absence + table-shape parity + CITE-ONLY confirmed) |
| 2 | wshobson/agents 5-plugin cherry-pick | `/plugin marketplace add wshobson/agents@<fresh-HEAD>` + per-plugin opt-in + manifest row | Mia 5-probe (HEAD freshness + 5 plugin dirs exist + Probe 4 namespace + Probe 5 HARD-GATE check + CR-9 REVERT precedent) |
| 3 | alirezarezvani/claude-skills c-level-agents cherry-pick | DEFER unless operator names Probe 7.b use case THIS FIRE | Probe 7.b 5-clause GATE (named consumer required) |

## Top-3 REJECT-FOR-FIT (preserved)

1. **vercel-labs/agent-skills** — Probe 6 MISSING LICENSE file (vendor-marketing claim ≠ enforceable; n=2 cohort with multica-ai + ComposioHQ — LICENSE-missing-but-claimed sub-pattern; FM-09 candidate at n=3+)
2. **mattpocock/skills** — Probe 5 HARD-GATE interactive `/setup-matt-pocock-skills` 3-question prompt (n=4 cohort per `ahfv-seven-sub-classes.md`)
3. **gsd-build/get-shit-done** — Probe 5 HARD-GATE setup + `--dangerously-skip-permissions` requirement (cardinal-rule-7+9 conflict)

## FM-20 ladder advance (n=13 → n=14 candidates this fire)

| # | Sub-class | Evidence |
|---|---|---|
| 14a | repo-rename / ownership-transfer (NEW sub-class) | A1 found multica-ai/andrej-karpathy-skills replaces forrestchang/andrej-karpathy-skills (CLAUDE.md L24-25 + karpathy-adapted.md cite STALE) |
| 14b | row-8 stale-belief-propagation (extension) | This fire's /goal carried 3 OVER prescriptions (P1+P5+P6 — all already-shipped in parallel sessions); orchestrator session-init Mia probe caught at receipt |

**Codification disposition**: defer formal row-14 commit to next-fire per ONE-LOGICAL-UNIT-PER-FIRE (this fire's primary unit was Wave 167 P0 5-agent wave). Evidence preserved in this close-synthesis for next-fire promotion ship.

## Forward Top-5 queue (operator-action)

1. **`/compact <hint>`** to pre-empt rot before next fire (context at 595k+ — STRONGLY recommended per `auto-compact-discipline.md` Rank #3)
2. **Operator decision**: ship Candidate 1 (quemsah manifest row) + Candidate 2 (wshobson 5-plugin)?
3. **Operator decision**: name Probe 7.b use case for Candidate 3 (alirezarezvani c-level-agents) OR confirm DEFER?
4. **Cite-anchor maintenance ship** (5 SHA refreshes batched per FM-20 forward-only): CLAUDE.md L24-25 forrestchang→multica-ai + L42 addyosmani 742dca5→3ff4b518 + L307 hesreallyhim 6ebceefe→614f102a + CLAUDE.local.md L93 CCBP 48f2ceb→f8468e87 + research-protocol.md L137 vinta 07ad9436→5909fa76
5. **FM-20 row 14 codification commit** (repo-rename / ownership-transfer sub-class + row-8 extension evidence) — formalize at next-fire commit per cycle-321 expected-savings fast-path

## 5-surface persist contract (Karpathy §5 + sessionstart-preload-discipline.md)

| Surface | Status this fire |
|---|---|
| Layer 1 JSONL | `.claude/state/*.jsonl` Layer-1 audit trails passive (not directly written this fire — codex T3/T4/T6 hooks fired on session commits) |
| Layer 2 MEMORY.md | DEFERRED to next-fire (MEMORY.md update would add ~1KB; defer until /compact resets context) |
| Layer 3 wiki | ✅ 5 artifacts written: `tmp/wave167-init-2026-05-13.md` + `tmp/wave167-A1-...md` + `tmp/wave167-B1-...md` + `tmp/wave167-D1-...md` + `tmp/wave167-E1-...md` + `tmp/wave167-close-synthesis-2026-05-13.md` (this file) |
| mcp-memory hash | DEFERRED — adding ToolSearch + memory_store call would add ~3-5K context; defer until /compact |
| graphiti episode | DEFERRED — same context-economy reasoning |
| docs/install-provenance.md | DEFERRED — Wave 167 row append queued for next-fire after operator INSTALL decisions land |

⚠️ **Asymmetric-dual-write risk** (FM-20 row 9 sub-class): Layer 3 wiki ✅ but mcp-memory + graphiti DEFERRED — explicit acknowledgment per `synthesis-layer-verify.md §Reporting categories` HONEST-NON-FINDING; NOT silent omission. Next-fire MUST close 5-surface persist after /compact.

## Recursive FM-20 dogfood note

This Wave 167 fire's /goal text itself carried 3 OVER prescriptions (P1+P5+P6) per FM-20 row-8 stale-belief-propagation sub-class — caught via session-init Mia probe at goal-receipt time. The fire that EXECUTES the FM-20 discipline ALSO TESTED the discipline by triggering its own catches. Same recursive-dogfood shape as `mia-pre-apply.md` Wave 16 fire-7 + `fm19-readonly-guard-sidestep.md` Wave 17 D1 + `fm17-subagent-fleet-depletion.md` Wave 34 + `fm21-queue-time-prompt-freeze.md` Wave 152 + `sessionstart-preload-discipline.md` Wave 169 P0 + this Wave 167 close. n=8 cumulative recursive-promotion-fire dogfood evidence including this fire.

## VERDICT-WAVE-167-CLOSE: PARTIAL-MET (4 of 7 STOP predicates satisfied; 3 PENDING per /compact + next-fire scope)
