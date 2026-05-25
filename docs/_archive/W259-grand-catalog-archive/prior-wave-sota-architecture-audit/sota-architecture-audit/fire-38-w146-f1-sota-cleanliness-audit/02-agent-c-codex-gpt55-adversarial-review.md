# Wave 146 Fire 1 Agent C — Path P codex T1 REAL GPT-5.5 #2 adversarial review

**Mode**: REAL GPT-5.5 BRIDGE-MODE via codex CLI v0.130.0 foreground+tee (Path P; bg `bd1zt4xn5`)
**Wall-clock**: 180s
**Tokens**: 86,304 (codex internal)
**OUT cite**: `.claude/state/codex_consult_w146_f1_adversarial_review_OUT.txt` L1226 (JSON verdict at EOF)
**Wave 24-D INV-A**: Agent A + Agent C = 2× REAL GPT-5.5 BRIDGE-MODE — **cross-model gate FULLY SATISFIED** per Agent C JSON field `cross_model_gate_status: "FULLY-SATISFIED"`

## Verdict: **NEEDS-REVISION conf=0.91**

## Agent A assessment

**overall_pct_calibration**: **FAIR**
**method_defensibility** (verbatim):

> "Directionally defensible for a fast T1 cleanliness audit, but too coarse for line-item precision: manifest-heavy weighting is appropriate because the manifest is the declared install truth, while settings/MCP/architecture weighting catches active-runtime drift. **It should be reported as a band, roughly 55-65%, not an exact 61%**."

### Agent A OVER-claims caught (3)

1. **CR-3 P0 over-tiered**: cited hook documents hybrid pattern — hook returns within ~5s while detached codex runs under `CODEX_T1_AUTO_TIMEOUT_SEC=240`. Real issue is visible status + retry semantics, not just hook timeout.
2. **CR-7 P0 over-tiered**: CLAUDE.md explicitly documents Wave 82d as temporary operator override with revert predicates. Should be P1/P0-operational-risk not P0 pure cardinal violation.
3. **Section 17 deprecated PLANNED**: counting deprecated historical Section 17 PLANNED rows as active current state would overstate uncleanness — block explicitly says "do not consult for current status".

### Agent A UNDER-claims caught (3)

1. **Marketplace/cache drift**: addyosmani/agent-skills documented as stale-against-upstream; should count against cleanliness independently of PLANNED rows.
2. **Installed-dormant vs installed-active**: cwc primitives SHA-pinned + copied but many NOT wired; cleaner than PLANNED but not runtime-clean.
3. **Phoenix MCP major-version float**: live npm registry probe (codex node-fetch) reports `@arizeai/phoenix-mcp` latest=**4.0.11 published 2026-05-06T20:44:51.873Z** — current runtime can float across major-version boundary at every MCP startup, not just D6 theoretical risk.

## Agent B assessment

**rejected_repos_soundness**: PARTIAL
**insights_novelty**: MEDIUM
**stand_in_disclosure_proper**: **true** (Agent B correctly disclosed Sonnet stand-in per `cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate`)

## 5 Prescribed_edits Pattern A readiness verdict

| # | Verdict | Rationale (verbatim from Agent C) |
|---|---|---|
| 1 | **MODIFY** | "Do not merely raise the PreToolUse hook timeout. Keep the short sync launcher behavior, but make in-progress, timeout, launch-error, and stale-lock states visible in `.claude/state` and hook output; raising the hook timeout would trade silent failure for invisible latency." |
| 2 | **MODIFY** | "SOTA-cleaner path is to strengthen the temporary-override marker and manifest row, not immediate revert to auto. CLAUDE.md:237 gives explicit Wave 82d predicates for reverting; reverting before classifier reliability and Tier completion would violate the documented operator override rationale." |
| 3 | **APPLY** | "Pin phoenix MCP. Live npm registry probe via node fetch reports `@arizeai/phoenix-mcp` latest=4.0.11, published 2026-05-06T20:44:51.873Z. Use `@arizeai/phoenix-mcp@4.0.11` plus a smoke probe against the configured baseUrl." |
| 4 | **MODIFY** | "Promote promptfoo and mcp-inspector to an install-fire queue with CR-7 operator-gated smoke steps, not direct install inside the same Pattern A fix. mcp-inspector is low-risk; promptfoo/eval harnesses touch evaluation credentials, package execution, and reporting paths." |
| 5 | **MODIFY** | "Do not delete the archaeology block. Move it behind an explicit HISTORICAL/MACHINE-EXCLUDED marker or fenced appendix so automated cleanliness scoring ignores it while port-note historical provenance remains intact." |

## 5 Missed gaps neither A nor B caught

| # | Gap | Severity | Suggested action |
|---|---|---|---|
| 1 | Settings manifest row still says Phase 1 default/defaultMode shape while actual `.claude/settings.json` uses bypassPermissions and later comments describe older default framing | P1 | Reconcile Section 0 settings row + trailing settings comments to Wave 82d temporary-override state with revert predicates |
| 2 | Phoenix MCP major-version float is active-runtime supply-chain drift, not just D6 theoretical pinning issue | P1 | Pin `@arizeai/phoenix-mcp@4.0.11` + record registry version/time + smoke outcome in manifest/provenance |
| 3 | Deprecated historical manifest sections can contaminate scoring + future agent prescriptions | P2 | Add machine-readable exclusion marker while preserving historical block verbatim |
| 4 | Installed-but-dormant hooks create distinct cleanliness class neither A nor B fully separated | P2 | Add scoring buckets for INSTALLED-ACTIVE / INSTALLED-DORMANT / INSTALLED-AMBER / PLANNED for reproducible future percentages |
| 5 | Agent B did not connect "read-path token waste" insight to stale research/search MCP Section 8 backlog | P2 | Queue read-path control primitives separately from shell-output RTK work: Serena/Repomix/ast-grep active verification first, research MCPs second |

## Ship recommendation: **2-commit P0-then-P1 split**

**Rationale** (verbatim):

> "The first commit should fix active-runtime risk and false P0 framing: T1 visibility semantics, CR-7 temporary-override marker, phoenix pin. The second commit should clean manifest scoring surfaces: eval/inspector queue and historical Section 17 exclusion. A single atomic Pattern A commit would mix runtime pinning, permission semantics, and manifest archaeology."

### Wave 146 Fire 2 queue (Agent C prescribed top-3):

1. **Pin and smoke @arizeai/phoenix-mcp@4.0.11**
2. **Implement visible T1 auto-spawn status/timeout artifacts** without extending sync hook latency
3. **Reconcile manifest scoring taxonomy and settings-row drift**, including historical-block machine exclusion

## Cross-model gate status

**FULLY SATISFIED** — Agent A (REAL GPT-5.5 #1) + Agent C (REAL GPT-5.5 #2) both via Path P codex CLI v0.130.0 foreground+tee per `cross-model-consensus.md §The contract` Phase 1 bootstrap exception. Agent B Sonnet stand-in correctly disclosed STAND-IN-NOTICE; orchestrator-side synthesis cites Agent A+C as authoritative cross-model verdict pair, Agent B as supplementary discovery probe.

## Cross-validation with Wave 145 arc + Wave 134 Fire 27 series

- **Cross-arc Mia+FM-20 pattern**: Wave 145 Fires 2-9 had 4 FM-20 cascade catches (n=12→15); Wave 146 Fire 1 returned **ZERO** FM-20 catches via Agent A — all 5 prescribed_edits Mia-verified GENUINE. Quality up-tick.
- **CR-12 5-class lattice integration**: Wave 134 Fires 27-A/B/C established 5-class disposition; Wave 146 Fire 1 Agent B exercised all 5 classes across 10 named repos with 0 new install candidates surfaced (HONEST-NON-FINDING confirms saturated discovery surface).
- **Pattern D / Forward Discipline #2**: Both Agent A (180s) + Agent C (180s) wall-clock fit within 60-300s budget per `codex-t1-pattern-b-forward-discipline.md` recipe.
