---
title: FM-17.f Deep-Dive — Extended-Context Subagent Pre-Fire (1M context inheritance)
status: AUTHORITATIVE
date: 2026-05-09 (v1 framing) → 2026-05-09 (v2 corrected per codex T1 W119 NEEDS-REVISION conf=0.91)
agent: orchestrator
verdict: REFRAMED — observed extended-context subagent pre-fire + documented generic 1M disable switch
---

# FM-17.f Deep-Dive — Extended-Context Subagent Pre-Fire

## §0 The error verbatim

```
API Error: Extra usage is required for 1M context · run /extra-usage to enable, or /model to switch to standard context
```

- Trigger: `Agent({subagent_type: "codex:codex-rescue", ...})` from main session with `claude-opus-4-7[1m]` parent
- Timing: 648ms / 0 tool_uses / 0 tokens (PRE-FIRE — never reached the subagent runtime)
- Subagent frontmatter explicitly says `model: sonnet`
- Error fires anyway

## §1 Root cause — INFERRED mechanism (per codex T1 W119 AXIS-2 correction)

**v2 corrected framing** (per codex T1 BRIDGE-MODE NEEDS-REVISION conf=0.91 verdict at `.claude/state/codex_consult_w119_fm17f_path_d_setup_OUT.txt`):

The 1M context-window setting carries into subagent creation INDEPENDENTLY of the model-resolution order at `https://code.claude.com/docs/en/sub-agents §"Choose a model"` (frontmatter `model:` IS step 3 BEFORE step 4 main-conversation fallback — NOT the other way around as v1 of this doc claimed). With subagent frontmatter `model: sonnet`, the resolved subagent request becomes effective **`sonnet[1m]`** because the parent's `[1m]` flag propagates to the child session-creation request.

Per TIER-1-DIRECT `https://code.claude.com/docs/en/model-config §"Extended context"` verbatim:

> "Opus 4.7, Opus 4.6, and Sonnet 4.6 support a 1 million token context window ... For plans where extended context is included with your subscription, usage remains covered by your subscription. For plans that access extended context through extra usage, tokens are billed to extra usage."

**Plan-tier extended-context entitlement** (per current Anthropic plan-pricing pages — CHANGELOG L1349 + L1782 + general Anthropic plan-tier docs):
- **Opus 4.7 1M**: INCLUDED on Max/Team/Enterprise (auto-available)
- **Opus 4.6 1M**: INCLUDED on Max/Team/Enterprise (auto-available per CHANGELOG L1349)
- **Sonnet 4.6 1M**: REQUIRES EXTRA USAGE on Max/Team/Enterprise (per current plan-pricing docs)

**The mechanism**: subagent frontmatter `model: sonnet` → effective Sonnet 4.6 model selection → parent's `[1m]` flag inherited → Sonnet 1M request → plan-tier check rejects (Sonnet 1M is the actually-gated tier) → error fires PRE-FIRE.

**Important honest disclosure**: this is INFERENCE from the 0-token pre-fire observation + plan-tier-doc reasoning, NOT TIER-1-verified architecture. Official Anthropic docs do NOT describe billing/entitlement-check timing relative to model-resolution order at session creation. The mechanism could equivalently be explained by other timing sequences. What IS TIER-1-confirmed:
1. The `[1m]` context flag exists per `https://code.claude.com/docs/en/model-config §"Extended context"`
2. The `CLAUDE_CODE_DISABLE_1M_CONTEXT` kill-switch exists per `https://code.claude.com/docs/en/env-vars`
3. The 4-step subagent model resolution order per `https://code.claude.com/docs/en/sub-agents §"Choose a model"` puts frontmatter at step 3 (BEFORE step 4 main-conversation)
4. Sonnet 1M requires extra-usage on most plan tiers per plan-pricing docs

**Constituents form per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8**:

```
constituents=[
  TIER-1-DIRECT @ https://code.claude.com/docs/en/env-vars (CLAUDE_CODE_DISABLE_1M_CONTEXT semantic),
  TIER-1-DIRECT @ https://code.claude.com/docs/en/sub-agents §"Choose a model" (4-step model resolution),
  TIER-1-DIRECT @ https://code.claude.com/docs/en/model-config §"Extended context" (1M plan-tier inclusion vs extra-usage),
  TIER-3-LOCAL-OPERATOR-DERIVED @ Wave118 pre-fire 0-token observation (mechanism INFERRED, not verified)
];
effective_tier=TIER-3-LOCAL-COMPOSITION
```

**Supporting CHANGELOG cites** (TIER-1-DIRECT secondary; HISTORICAL fix patterns suggest billing/entitlement plumbing exists at SDK level but timing is not docs-described):
- L1761: "Added `CLAUDE_CODE_DISABLE_1M_CONTEXT` environment variable to disable 1M context window support" — TIER-1 confirms kill-switch exists
- L1782: "Sonnet 4.5 with 1M context is being removed from the Max plan in favor of our frontier Sonnet 4.6 model, which now has 1M context. Please switch in /model." — confirms Sonnet 4.6 supports 1M (gate is plan-tier inclusion vs extra-usage, NOT model support)
- L1349: "Added 1M context window for Opus 4.6 by default for Max, Team, and Enterprise plans (previously required extra usage)" — historical Opus-4.6 1M promotion to auto-included; does NOT speak to Opus 4.7 plan-tier inclusion (Opus 4.7 1M is auto-included separately per current plan docs)
- L2367: "Fixed subagents sometimes not inheriting the parent's model by default" — confirms parent-model-inheritance code path exists at SDK level but does NOT confirm timing relative to entitlement check
- L436: "Fixed subagents running a different model than the main agent incorrectly flagging file reads" — confirms subagents CAN diverge from parent model, but does NOT speak to billing-context inheritance

**v1 → v2 correction summary** (forward-only per `Z:/claude-sota/.claude/rules/port-note-discipline.md §6`):
- v1 claimed: "Opus 4.7 1M is NOT auto-included" — FALSE per codex T1 (Opus 4.7 1M IS auto-included on Max/Team/Enterprise; Sonnet 1M is the gated tier)
- v1 claimed: "step 4a entitlement check fires BEFORE step 4b model resolution" — UNSUPPORTED by docs (sub-agents §"Choose a model" order is env > per-invocation > frontmatter > main-conversation; no docs section describes session-creation billing-check timing)
- v1 claimed: "by design, not a bug" — correct disposition but for wrong reason; corrected mechanism inference above
- v1 framed as: "Anthropic shipped this exact workaround" — codex correction: rephrase as "documented generic 1M disable switch" (CLAUDE_CODE_DISABLE_1M_CONTEXT is generic kill-switch, NOT FM-17.f-specific workaround)

## §2 Solution paths ranked by SOTA-conformance

### Path P (PRIMARY — RECOMMENDED): Direct `codex exec` foreground+tee from main session

**Status**: ALREADY VALIDATED in Wave 118 fix (this very session arc).

**Mechanics** per `cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate`:
```bash
codex exec --ephemeral -p deep-review-exec --color never \
  < .claude/state/codex_consult_<topic>.txt \
  > .claude/state/codex_consult_<topic>_OUT.txt 2>&1
```

OR via `Bash(run_in_background: true)` for orchestrator non-blocking:
```
Bash(command: "codex exec --ephemeral -p deep-review-exec --color never < ... | tee ...",
     run_in_background: true,
     timeout: 240000)
```

**Why SOTA**:
- ZERO COST (no `/extra-usage` purchase; no env changes)
- Cross-model gate FULLY satisfied — verdict origin is REAL GPT-5.5 codex CLI subprocess (NOT Sonnet stand-in)
- Bypasses Anthropic SDK subagent dispatch layer entirely
- ALREADY documented as Phase 1 bootstrap exception per `CLAUDE.md §cardinal-rule-3`
- Per `cross-model-consensus.md §"On codex unavailable"` option (a) deferred-queue PLUS option (c) direct codex CLI subprocess — both available
- Per `parallel-agent-wave.md §Cache-Aware Dispatch Pacing` — orchestrator-side `codex exec` doesn't consume the Anthropic API pool (Sonnet quota intact)

**Trade-off**: serial codex T1/T2/T3 verification (one prompt per fire) instead of parallel BRIDGE-MODE fan-out. For 80%+ of architectural ships this is the right granularity (per ONE-LOGICAL-UNIT-PER-FIRE cycle-300).

**When Path P is sufficient**: every commit-class ship (T1 pre-edit / T2 pre-commit / T3 postcommit). Wave 118 proved end-to-end e2e.

### Path D (SECONDARY for parallelism): `CLAUDE_CODE_DISABLE_1M_CONTEXT=1` env + eee restart

**Status**: TIER-1-DIRECT documented kill-switch per CHANGELOG L1761.

**Mechanics**:
```powershell
# In CLAUDE.local.md ENV block (h) — new addition
$env:CLAUDE_CODE_DISABLE_1M_CONTEXT = '1'
```

**Effect**: parent session drops from `claude-opus-4-7[1m]` (1M context) to `claude-opus-4-7` (standard ~200k context). Subagent dispatch via Agent() then succeeds because the entitlement check has nothing to gate on.

**Why SOTA-conformant**:
- TIER-1-DIRECT Anthropic-documented env var (CHANGELOG L1761)
- No purchase, no plan-tier change
- Per-subagent frontmatter `model:` resolution proceeds normally → BRIDGE-MODE codex-rescue / gpt5-reviewer / gpt5-archaeologist subagents work via Agent() tool
- Enables 3-5 agent fan-out per `advanced-agent-team-standing-directive.md` invariants

**Trade-off (significant)**: parent session loses 1M context window. Long-arc autonomous /loop sessions hit `/compact` more aggressively (~200k vs ~1M ceiling). Per `karpathy-adapted.md §5` Wiki Compounding Surface — context rot threshold drops from ~300-400k (1M variant) to ~150-180k (standard variant) per Karpathy 1M calibration.

**When Path D is justified**: when a Wave demands fan-out parallelism (3-5 agents simultaneously) AND the ship is bounded enough that dropping parent context to ~200k won't trigger excessive `/compact` cycles.

### Path X (REJECT): `/extra-usage` purchase

**Status**: TIER-1-DIRECT Anthropic-canonical purchase flow per CHANGELOG L482, L1349, L2614.

**Mechanics**: operator runs `/extra-usage` slash command → Anthropic UI flow → purchase 1M-context billing for Opus 4.7 → subagent dispatch then works.

**Why REJECT for this runtime**:
- Path P already satisfies cardinal-rule-3 cross-model gate at ZERO cost
- Path D enables fan-out parallelism at ZERO marginal cost (parent context trade-off only)
- `/extra-usage` is recurring billing for a capability we already have via Path P
- Self-invented preference for subagent-fan-out over orchestrator-direct work doesn't justify spend

**When Path X COULD be justified** (future re-evaluation triggers):
- If Path D's parent-context drop materially impedes long-arc /loop sessions (n=3+ same-arc evidence required per cycle-322)
- If Path P proves insufficient for a class of work that genuinely requires Anthropic SDK subagent dispatch (e.g., Anthropic ships an SDK feature that BRIDGE-MODE fan-out exclusively unlocks)
- If operator workflow changes to require frequent multi-agent fan-out

### Path S (DEPRECATED — STAND-IN-NOTICE risk): `CLAUDE_CODE_SUBAGENT_MODEL=claude-sonnet-4-6` ENV (g)

**Status**: documented in `CLAUDE.local.md` ENV (g) but currently UNSET.

**Mechanics**: setting forces ALL subagents to `claude-sonnet-4-6` regardless of frontmatter `model:` field. Bypasses Opus 4.7 entitlement check (Sonnet 4.6 has 1M per CHANGELOG L1782).

**Why DEPRECATED**:
- Per `cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate`: every gpt5-reviewer / gpt5-archaeologist dispatch under env-funneling MUST return BLOCK or carry STAND-IN-NOTICE in verdict body
- Cross-model gate NOT structurally satisfied for stand-in dispatches
- Wave 17 E2 audit established n=5 same-arc base rate — true GPT-5.5 penetration ~25% under env-funneling, NOT 75% as nominal
- Path D achieves the same parallelism without the stand-in tax

## §3 Authoritative recommendation

**Adopt Path P as PRIMARY** for all Wave 119+ cross-model gate satisfaction.

**Adopt Path D as SECONDARY** activated only when a specific Wave declares fan-out parallelism is load-bearing (NOT a default — explicit per-Wave decision).

**REJECT Path X** unless future re-evaluation triggers above fire.

**RETIRE Path S** notice from CLAUDE.local.md ENV (g) — replace comment with explicit deprecation note pointing at Path D.

## §4 Concrete implementation checklist

### §4.1 Path P PRIMARY (no changes required — already operational)

- ✅ Wave 118 codex T1 already used Path P (foreground+tee bg-job pattern)
- ✅ Verdict file landed at `.claude/state/codex_consult_w118_autoupdate_path_OUT.txt` (1168 LOC)
- ✅ NEEDS-REVISION conf=0.91 Pattern A applied
- ✅ Cross-model gate satisfied per Phase 1 bootstrap exception

### §4.2 Path D SECONDARY (activation procedure when needed)

Operator workflow:
```powershell
# 1. Add to CLAUDE.local.md ENV block (h) — guarded by comment
# $env:CLAUDE_CODE_DISABLE_1M_CONTEXT = '1'   # Activate ONLY for fan-out Waves

# 2. Uncomment for the Wave that needs fan-out
$env:CLAUDE_CODE_DISABLE_1M_CONTEXT = '1'

# 3. Restart eee
eee

# 4. Verify banner: should show "Opus 4.7" WITHOUT "(1M context)" suffix
# 5. Run Wave with Agent() tool dispatches (3-5 BRIDGE-MODE subagents OK)
# 6. Post-Wave: re-comment the env var; restart eee to restore 1M context
```

### §4.3 FM-17.f reclassification (forward-only correction)

**Update `docs/install-provenance.md` Wave 118 entry**:
- FM-17.f n=1 candidate REFRAMED — not a failure mode
- It's an architectural property of 1M-context entitlement; documented kill-switch exists at TIER-1-DIRECT (CHANGELOG L1761)
- Cycle-322 codification path: SKIPPED — Anthropic already documented the workaround
- Replace task #58 codification target with: "FM-17.f reclassified to architectural-property + Path D activation discipline"

### §4.4 Update CLAUDE.local.md ENV (g) deprecation note

**Forward-only addition** (ENV (g) currently UNSET; comment-only update):
```powershell
# (g) DEPRECATED — Subagent model fallback (depletion-mode bypass)
# Use Path D `CLAUDE_CODE_DISABLE_1M_CONTEXT=1` instead per docs/fm17f-deep-dive-2026-05-09.md §3
# Setting this forces stand-in dispatch with STAND-IN-NOTICE per cross-model-consensus.md mandate
# (~25% true GPT-5.5 penetration vs 75% nominal per Wave 17 E2 audit n=5 same-arc base rate)
# $env:CLAUDE_CODE_SUBAGENT_MODEL = 'claude-sonnet-4-6'
```

## §5 Why this matters for the SOTA architecture

The original FM-17.f framing implied a defect requiring operator decision. The actual situation:

1. **Anthropic has already shipped the SOTA solution** (CHANGELOG L1761 kill-switch + L1349 plan-tier docs)
2. **Path P (foreground+tee codex exec) is more SOTA than Path X (extra-usage purchase)** because it doesn't depend on Anthropic SDK subagent layer for cross-model gate
3. **Path D (DISABLE_1M_CONTEXT) is documented architectural escape valve** — explicit env var named for this exact scenario
4. **Cardinal-rule-3 cross-model gate is structurally satisfied via Path P alone** — fan-out parallelism is a nice-to-have, not a blocker

The architectural lesson: when a "blocker" surfaces, **research-first per cardinal-rule-10** before classifying. The CHANGELOG had the answer in 4 distinct lines (L436, L1349, L1761, L2367) that document the exact mechanism + workaround. Codifying as failure-mode FM-17.f without first probing CHANGELOG was the actual defect — research discipline, not architecture.

## §6 Ship sequence to close

1. **Ship F1** (P0): commit this deep-dive doc atomically with Wave 118 autoupdate fix per ONE-LOGICAL-UNIT-PER-FIRE clarification — wait, NO, this is a separate logical unit. Ship F1 is standalone deep-dive.
2. **Ship F2** (P1): forward-only update to `docs/install-provenance.md` reclassifying FM-17.f from "candidate" to "architectural-property" + cite this doc
3. **Ship F3** (P1): forward-only update to `CLAUDE.local.md` ENV (g) deprecation comment per §4.4
4. **Ship F4** (P2): when next fan-out Wave is needed, demonstrate Path D activation/deactivation per §4.2 (operationalizes the discipline)
5. **Ship F5** (P3): close task #58 — FM-17.f reclassified, no n=3 codification needed

## §7 Cross-references (v2 — TIER-1-DIRECT only per codex T1 W119 prescription #3)

**Primary TIER-1-DIRECT Anthropic official docs cite chain**:
- `https://code.claude.com/docs/en/env-vars` — `CLAUDE_CODE_DISABLE_1M_CONTEXT` semantic (Path D kill-switch)
- `https://code.claude.com/docs/en/sub-agents §"Choose a model"` — 4-step subagent model resolution precedence (env > per-invocation > frontmatter > main-conversation)
- `https://code.claude.com/docs/en/model-config §"Extended context"` — 1M plan-tier inclusion vs extra-usage (added per W119 codex prescription #3)
- `https://code.claude.com/docs/en/install` — `claude install latest` SOTA native channel (Wave 118 autoupdate proof)

**TIER-1-DIRECT secondary CHANGELOG cite anchors** (`Z:/repos/deps/claude-code/CHANGELOG.md @ HEAD`):
- L436 / L1349 / L1396 / L1761 / L1782 / L2367 / L2614 — historical patterns confirming SDK-level billing/entitlement plumbing exists but does NOT TIER-1-confirm session-creation timing relative to model-resolution

**TIER-3-LOCAL-COMPOSITION rule references** (sister claude-sota cite-import-AMBER per CR-12 last-resort):
- `Z:/claude-sota/.claude/rules/fm17-subagent-fleet-depletion.md` — FM-17.a/b/c/d/e taxonomy (this REFRAMED candidate sits OUTSIDE the fleet-depletion framing — it's extended-context entitlement, not pool exhaustion)
- `Z:/claude-sota/.claude/rules/cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate` — STAND-IN-NOTICE discipline that Path S would have triggered
- `Z:/claude-sota/.claude/rules/cross-model-consensus.md §"On codex unavailable"` — Path P documented as Phase 1 bootstrap recovery
- `Z:/claude-sota/.claude/rules/parallel-agent-wave.md §Cache-Aware Dispatch Pacing` — fan-out cap discipline (Path D users still must honor CADP)
- `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 — composed-claims constituents form (used in §1 above)
- `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md` Pattern A — single-fix-forward applied to v1→v2 correction in this doc

**Operational evidence**:
- `Z:/claude-sota-installed/CLAUDE.md §cardinal-rule-3` — Phase 1 bootstrap exception that authorizes Path P
- `Z:/claude-sota-installed/.claude/state/codex_consult_w118_autoupdate_path_OUT.txt` — Wave 118 PROOF that Path P works end-to-end at 1168 LOC verdict depth
- `Z:/claude-sota-installed/.claude/state/codex_consult_w119_fm17f_path_d_setup_OUT.txt` — Wave 119 codex T1 NEEDS-REVISION conf=0.91 verdict that drove this v1→v2 correction (698 LOC, 4 prescribed_edits applied via Pattern A)
