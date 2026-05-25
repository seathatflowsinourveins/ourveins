---
title: Wave 167 P0 B1 — Codex-rescue Architecture-vs-SOTA E2E Audit
status: AUTHORITATIVE-WITH-STAND-IN-NOTICE
date: 2026-05-13
agent: codex-rescue (subagent_type: codex:codex-rescue) BRIDGE-MODE attempted
wave: W167
fire: P0-B1
duration_ms: 677588
tool_uses: 2
---

# Wave 167 P0 B1 — Codex-rescue Architecture-vs-SOTA E2E

## STAND-IN-NOTICE (per cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate)

**Cross-model gate NOT FULLY satisfied for this dispatch.** Pattern D `codex exec` foreground+tee failed at Windows certificate-store ACL probe ("Access is denied" on native root CA store) per `Z:/claude-sota/.claude/rules/fm17-subagent-fleet-depletion.md §FM-17.c.ii Codex Win cert-store ACL` signature. Three separate foreground-tee calls attempted per FM-17.d decomposition discipline; all three blocked at TLS-handshake before model execution. **Local fallback audit with cite anchors produced instead — orchestrator-direct probes only; codex CLI never reached model.**

Recovery options (FM-17.c.ii standard recipe):
- (a) Re-dispatch from MAIN orchestrator process context — already attempted; same cert-store wedge fired (suggests deeper Windows ACL issue, not worktree-vs-main inheritance)
- (b) Pattern P canonical recipe per `cmc-t1-t7-lifecycle.md §The contract` — same root cause; `codex exec` itself fails before model invocation
- (c) Defer codex T1 cross-verify to operator-side after Windows cert-store ACL remediated

Commit body MUST include `B1 codex-rescue dispatch hit FM-17.c.ii Windows cert-store ACL; local-fallback audit produced; cross-model gate NOT satisfied for this dispatch; codex T1 re-verify queued post-cert-store-fix`.

## AXIS 1 — Hook Layer (34 installed hooks per local probe)

| # | Finding | Disposition | Cite anchor |
|---|---|---|---|
| 1 | **GAP P1** Fresh-context evaluator from CWC not wired to active invocation boundary | INSTALL | Upstream `Z:/repos/deps/cwc-long-running-agents/claude-code-config/.claude/agents/evaluator.md:1-25 @ HEAD ffd563d` |
| 2 | **REJECT-FOR-FIT P2** Raw `commit-on-stop.sh` auto-commits dirty state silently | KEEP local throttled wrapper | Local `.claude/hooks/scripts/cwc/commit-on-stop-throttled.sh` is correct substitute |
| 3 | **ADOPT P1** PreCompact Python trio (precompact_guard.py + precompact_hint_emitter.py + sessionstart_compact_hint_reader.py) | ALIGNED + INSTALLED | Upstream `Z:/repos/deps/claude-codex-settings/plugins/intelligent-compact/hooks/scripts/precompact_priorities.sh:33-55 @ HEAD 32151b93` |

## AXIS 2 — Rule Layer (64 installed locally, sibling has 37)

⚠️ **FM-20 vigilance**: B1's count "sibling has 37" needs verification — sibling claude-sota typically has 60+ rules per W166 baseline. Counting methodology may differ (codification-only vs all .md files). Mia probe required before applying B1's "MUST install" prescriptions.

Three rules B1 prescribes for install:

| # | Rule | B1 prescription | Mia probe required |
|---|---|---|---|
| 1 | `codex-cli-flag-positioning.md` | cite-import-AMBER from sibling | Probe: does this rule already exist locally? Upstream anchor at `Z:/repos/deps/codex/codex-rs/exec/src/cli.rs:1-65 @ HEAD 993e3f40` |
| 2 | `fm22-stale-gate-vs-current-tree.md` | sibling-novel, CR-9 path rewrite before install | Probe: local has `fm22-bridge-mode-refuse-as-injection-subclass.md` (different sub-class); parent `fm22-stale-gate-vs-current-tree.md` may NOT be locally installed |
| 3 | `security-checklist.md` | reconstruct from upstream | Upstream `Z:/repos/deps/affaan-m-everything-claude-code/rules/common/security.md:3-29 @ HEAD 841beea4` |

**SHOULD-NOT-PORT**: any sibling rule with unrewritten `Z:/claude-sota/` install paths (CR-9 sibling-bleed defense).

## AXIS 3 — Skill Layer (861 SKILL.md installed)

| # | Finding | Disposition | Cite anchor |
|---|---|---|---|
| 1 | **DUPLICATE P3** addyosmani agent-skills | NO ACTION (already installed under `.claude/plugins/marketplaces/addy-agent-skills/`) | — |
| 2 | **GAP P2** superpowers name-level coverage audit needed | PROBE (verify 7 mandatory workflows: brainstorming/worktrees/writing-plans/tdd/review) | `Z:/repos/deps/superpowers/README.md:156-170 @ HEAD f2cbfbef` |
| 3 | **DEFER P2** bulk alirezarezvani/claude-skills (235 skills) | DEFER (demand-gated only per Probe 7.b 5-clause) | — |
| 4 | **REJECT-FOR-FIT P2** Anthropic demo skills | NO INSTALL (not production-grade) | `Z:/repos/deps/anthropics__skills/README.md:24 @ HEAD f458cee3` |

## Overall Top-5 GAPs to close this wave

1. **Codex runtime certificate-store failure** (P0 — blocks Pattern D itself; impacts cross-model gate FULL achievement)
2. **Fresh-context evaluator active invocation boundary** (P1 — CWC primitive not wired)
3. **`codex-cli-flag-positioning.md` cite-import** (P1 — Mia probe first)
4. **`fm22-stale-gate-vs-current-tree.md` cite-import** (P1 — with CR-9 path rewrite; Mia probe first)
5. **Skill duplicate registry before further skill installs** (P2 — defensive)

## VERDICT-ARCH-COMPLETE: PARTIAL

- ✅ Local probes completed (3 axes audited, cite anchors emitted)
- ❌ Codex E2E model verdict unavailable (FM-17.c.ii Windows cert-store ACL wedge)
- ❌ Cross-model gate NOT FULLY satisfied for this dispatch (STAND-IN-NOTICE applies)
- ⚠️ All "MUST install" prescriptions require Mia pre-apply per `mia-pre-apply.md` n=108+ ladder (D1+B1 agree local rules=64 — parallel-session shipping may have subsumed B1's prescriptions per FM-20 row-8 stale-belief-propagation defense)

## Confidence & Gaps

- Cross-model gate UNSATISFIED until codex CLI Windows cert-store ACL remediated OR alternative cross-model path established
- All 3 "MUST install" prescriptions need pre-apply Mia probe (Glob `.claude/rules/<rule-name>.md` BEFORE assuming missing)
- Sibling rule count "37" claim may be FM-20 OVER (sibling typically has 60+ rules); independent verification needed
- 861 SKILL.md count includes plugin-bundle skills — true edit-target count is much smaller per D1 archaeology (922 SKILL.md across 21 plugins + 14 marketplaces)
