---
title: W229 FINAL — Pattern A Fix-Forward from W229 MASTER UPDATE + codex T1 9 prescribed_edits
status: AUTHORITATIVE-AGGREGATE
date: 2026-05-15
wave: 229
predecessor: W229 MASTER UPDATE + codex T1 NEEDS-REVISION conf=0.9 (9 prescribed_edits)
artifact-class: synthesis-pattern-A-fix-forward
target-runtime: Z:\claude-sota-pure\
cross-model-gate: TIER-1-DIRECT SATISFIED via codex T1 Path P REAL GPT-5.5 dispatch at `.claude/state/codex_consult_w229_master_update_ratification_OUT.txt` session-id `019e2e12-dcc5-7273-afab-27dfc4b8cbdc` 2026-05-15
codex-T1-verdict: NEEDS-REVISION conf=0.9 | F-001..F-009 ALL integrated single-atomic-apply
next-action: Step D — Phase 1 install execution to Z:\claude-sota-pure\
---

# W229 FINAL — Pattern A Fix-Forward Apply

This document supersedes `wave229-MASTER-UPDATE-saturation-confirmed-2026-05-15.md` per codex T1 W229 NEEDS-REVISION conf=0.9 9-prescribed_edits Pattern A apply. All 9 corrections integrated atomically per `codex-t1-fix-forward-pattern.md §Pattern A`.

## 1. Saturation Diagnostic — REFRAMED (F-001 + F-002 P1)

**ORIGINAL claim** (REVISED): "Saturation diagnostic FIRES; 3/3 categories confirm architectural saturation"

**REVISED per codex T1 F-001 + F-002**:

> **Soft saturation / blind-probing SKIP recommended by analogy** (not literal standing-directive trigger match).

**Deviations from canonical trigger** (record explicitly):
- W229 had **3 agents** (A/B/C), not the canonical 5 for the saturation rule
- W229 produced **1 ADOPT-NOW survivor** (EveryInc/CE), not 0 OVER catches as the canonical trigger requires

**Per-category outcome**:

| Agent | Category | Probed | ADOPT-NOW | Outcome |
|---|---|---|---|---|
| W229-A | Agent framework / orchestration / multi-agent / plugin residuals | 20 | 1 (EveryInc/CE) + 1 unresolved (ComposioHQ) | **LOW-YIELD but NOT EXHAUSTED** pending ComposioHQ re-evaluation post-claude-squad-retraction |
| W229-B | Memory / RAG / eval / observability residuals | 9 | 0 | **ARCHITECTURAL SATURATION CONFIRMED** — W216+W223 winners cover all use cases |
| W229-C | Tools / CLI / utility / DevEx / security residuals | 31 | 0 | **OPERATIONALLY EXHAUSTED** — CLI 8/8 ALREADY-INSTALLED (W224-A 87% baseline verified) |

**Revised conclusion**: 2/3 categories saturated; agent/orchestration is low-yield not exhausted. SKIP-condition recommendation is by analogy, not literal trigger fire.

## 2. EveryInc/compound-engineering-plugin — ADOPT-NOW-PENDING-MIA+T1 (F-003 + F-004 + F-005)

**REFRAMED per codex T1 F-003**: This is **W163 INSTALL candidate revalidated by W228-B + W229-A cross-validation**, NOT W229 first-discovery. (Note: specific W163 artifact location not pin-cited in this document; codex T1 raised the prior-fire reference; treat as cross-fire validation evidence pending separate W163 audit-trail probe.)

**Fresh metadata verified 2026-05-15 via gh API + raw GitHub marketplace.json read**:
- **16,815★ MIT** (gh API license.spdx_id verified)
- **37 skills + 49 agents** (NOT 51 agents — W229-A 51 was over-count by 2; W163 figure 49 was correct; counts from `https://api.github.com/repos/EveryInc/compound-engineering-plugin/contents/plugins/compound-engineering/{skills,agents}`)
- **Maintainer**: Kieran Klaassen (Every Inc, kieran@every.to) — NOT Cole Murray (W229-A's attribution was incorrect)
- **Marketplace contains 2 plugins**: `compound-engineering` (37 skills + 49 agents) + `coding-tutor` (3 commands + 1 skill by Nityesh Agarwal)
- **Last update**: 2026-05-15T23:53:25Z (fresh)
- **Multi-platform**: CC + Codex + Cursor + Copilot + Droid + Qwen + OpenCode + Pi + Gemini + Kiro

**Install command (CORRECTED per F-004 — plugin-qualified syntax)**:
```
/plugin marketplace add EveryInc/compound-engineering-plugin
/plugin install compound-engineering@compound-engineering-plugin
```

**Scope decision (F-004 prescription)**: `coding-tutor@compound-engineering-plugin` is **OUT OF SCOPE for primary install** — its tutorial/spaced-repetition framing is not aligned with claude-sota-pure's architectural-primitive focus. Re-evaluate as STUDY-PILOT only.

**Status per F-005**: **ADOPT-NOW-PENDING-MIA+T1** (NOT plain ADOPT-NOW).

**Pre-commit blockers** (Mia pre-apply REQUIRED before install commit lands):
1. **Probe 4 plugin-namespace**: verify `/ce-*` slash-command namespace does NOT collide with `/superpowers:*` + `/skill:*` + `/wsh-*` + `/skill-creator:*` + `/comprehensive-review:*` namespaces installed in claude-sota-pure
2. **Probe 5 mode-harness-shape**: enumerate 49 CE agent names + cross-check against 28 wshobson + 8 sss-installed agents for name collisions in `.claude/agents/` registry
3. **Mia is pre-commit blocker, not install-time check** — per codex T1 F-005 verbatim: "namespace and agent-name collision checks are pre-commit blockers for the adoption row"

**Cross-model gate**: Codex T1 ADOPT-NOW-defensibility VERIFIED `everyinc_ce_adopt_defensible: true` at conf=0.9; install commit gated on Mia + fresh T1 on install plan per CR-3.

## 3. ComposioHQ/agent-orchestrator — RE-EVALUATION-REQUIRED

W229-A scored ComposioHQ as `SUPERSEDED-BY-claude-squad` but claude-squad is now retracted (F-007 below). With incumbent retracted:
- **ComposioHQ disposition**: PENDING — re-evaluate as PROVIDER-COMPLEMENT or GENUINELY-NEW for parallel-agent orchestration class
- License: MIT (W229-A verified)
- Stars: 7,062 (W229-A verified)
- **Action**: Defer to separate fire for clean re-evaluation; do NOT include in W229-FINAL install batch

## 4. W228-A Retractions — REVISED per codex T1 F-006/F-007/F-008/F-009

### 4.1 trufflehog — REJECT/RETIRE (reason CORRECTED per F-006)

**ORIGINAL**: "RETRACT — CR-9 license blocker (AGPL-3.0)"

**REVISED per F-006**: **REJECT/RETIRE — functional redundancy with gitleaks INSTALLED v8.30.1**

> Verbatim codex T1: "AGPL CLI-binary use acceptable under SRA D1, while the durable rejection basis is functional redundancy with gitleaks"

**AGPL disclosed but NOT primary blocker** for CLI-binary use class.

### 4.2 smtg-ai/claude-squad — RE-PROBE-USE-CLASS (reason CORRECTED per F-007)

**ORIGINAL**: "RETRACT — CR-9 license blocker (AGPL-3.0)"

**REVISED per F-007**: **Re-probe use-class** — AGPL may be acceptable for local standalone TUI/binary use under SRA D1 use-class precision

**Concrete blockers to verify for actual rejection** (per F-007 prescription):
- Windows/runtime fit (claude-sota-pure is Windows-Z-portable)
- Duplicate vs operator UI alternatives (ComposioHQ may now be the alternative)
- Distribution risk (AGPL becomes relevant ONLY if redistributing in claude-sota-pure install bundle)

**Status**: DEFER to separate re-probe fire; do NOT include in W229-FINAL install batch.

### 4.3 zilliztech/claude-context — DEFER (CORRECTED per F-008)

**ORIGINAL**: "RETRACT — DUPLICATE-FUNCTIONALITY vs Serena"

**REVISED per F-008**: **DEFER / PARTIAL-OVERLAP vs Serena**

> Verbatim codex T1: "W228-A classified claude-context as DEFER, not REJECT"

**Action**: DEFER (overlaps with Serena INSTALLED; revisit if vector-semantic code search becomes load-bearing)

### 4.4 mksglu/context-mode — INSTALLED/KEEP or STUDY-PILOT-W-CAVEAT (CORRECTED per F-008)

**ORIGINAL**: "RETRACT — NOASSERTION + rtk-overlap"

**REVISED per F-008**: **INSTALLED/KEEP** (provenance shows context-mode is already installed/upgraded in claude-sota-pure runtime per `.claude/context-mode/` directory listing)

> Verbatim codex T1: "context-mode is already installed/upgraded in the runtime"

**Caveat**: STUDY-PILOT-W-CAVEAT — Elastic-2.0 trust-AMBER per Wave-2 Agent D Edit #12 (license re-evaluate if production-scale re-distribution becomes relevant)

### 4.5 yxwucq/CCUI — REJECT (REPHRASED per F-009)

**ORIGINAL**: "RETRACT — Probe 6 + LOW-STAR + CR-9 NO-LICENSE stale"

**REVISED per F-009**: **REJECT — NO-LICENSE + low-star/stale Axis-3 fail** (full blocker chain preserved: missing LICENSE + 32★ low-star + Axis-3 stability failure compound)

## 5. Codex T1 W224 Prescribed Edits — UNCHANGED (6 prescriptions still pending install-time apply)

These were validated in W229 MASTER UPDATE §2.2; codex T1 W229 did not contest them. Apply at install time:

1. **playwright-mcp → playwright-cli + SKILLS**: Microsoft self-deprecates MCP for coding agents per `microsoft/playwright-mcp@ae27b86/README.md:1-30`
2. **spec-kit → TARGET-PROBE-FIRST not CORE**: PARTIAL-OVERLAP with CCPM + BMAD; demote from CORE tier
3. **cwc-long-running-agents LICENSE inconsistency Apache-2.0 vs MIT — re-probe at install commit**
4. **anthropics/claude-plugins-official is marketplace-directory not repo-wide-license** — per-plugin LICENSE verify required
5. **Qwen3-Embedding/Reranker are HF model artifacts not GitHub installs** — pin HF revisions via `hf download` not `git clone`
6. **FalkorDB SSPL local-service-only caveat explicit**: SSPL acceptable for local Docker container, NOT redistributable

## 6. Wave52/iter2b Anthropic-Official Unadopted Patterns — Apply at Phase 1 install

7 patterns from `Z:/claude-sota-installed/docs/outer research/_archives/wave52/iter2b-advanced-unadopted.md` still UNCLOSED 6 months after surfacing. Apply at install-time:

| Pattern | Where to apply |
|---|---|
| `CLAUDE_CODE_USE_POWERSHELL_TOOL=1` | Audit + enable in `Z:/claude-sota-pure/.claude/settings.json:env` |
| `CLAUDE_CODE_SESSIONEND_HOOKS_TIMEOUT_MS=60000` | Enable in `.claude/settings.json:env` |
| `OTEL_LOG_USER_PROMPTS=1` + `OTEL_LOG_RAW_API_BODIES=1` | Enable for telemetry/audit in `.claude/settings.json:env` |
| `explanatory-output-style@claude-plugins-official` | `/plugin install explanatory-output-style@claude-plugins-official` |
| `--system-prompt-file <path>` | Wrap launcher in `Z:/claude-sota-pure/tools/eee-pure.ps1` |
| `--max-budget-usd` SDK flag | Add to `tools/eee-pure.ps1` per-arc budget cap |
| `ANTHROPIC_SMALL_FAST_MODEL` pins | Pin in `CLAUDE.local.md` ENV block (per-machine) |

## 7. Phase 1 — Z:\claude-sota-pure\ Install Execution Plan

Per `docs/sota-installed-manifest.md` numbering (§11 = W225 already shipped; §12 = W214 gap-resolution), the W229 install batch lands as **§13 — W229 W229-FINAL install batch** with 3 rows:

### Row 1: EveryInc/compound-engineering-plugin

**STATUS**: ADOPT-NOW-PENDING-MIA+T1

**Pre-commit gate** (Mia pre-apply):
```bash
# Probe 4 plugin-namespace
ls Z:/claude-sota-pure/.claude/plugins/cache/ 2>&1 | awk '/compound|ce-/ {print}'
# Probe 5 mode-harness-shape — agent name collision check
ls Z:/claude-sota-pure/.claude/plugins/cache/compound-engineering-plugin/compound-engineering/*/agents/*.md 2>&1 | xargs -I {} basename {} .md | sort > /tmp/ce_agents.txt
ls Z:/claude-sota-pure/.claude/agents/*.md 2>&1 | xargs -I {} basename {} .md | sort > /tmp/sss_agents.txt
comm -12 /tmp/ce_agents.txt /tmp/sss_agents.txt  # any output = name collision
# Probe 5 mode-harness-shape — skill namespace collision check
ls Z:/claude-sota-pure/.claude/plugins/cache/compound-engineering-plugin/compound-engineering/*/skills/ 2>&1 > /tmp/ce_skills.txt
```

**Install** (only if Mia probes return zero collisions):
```bash
# In claude CLI:
/plugin marketplace add EveryInc/compound-engineering-plugin
/plugin install compound-engineering@compound-engineering-plugin
# DO NOT install coding-tutor — out of scope
```

**Post-install codex T1 ratification REQUIRED** per CR-3 before manifest+commit lands.

### Row 2: explanatory-output-style@claude-plugins-official (Wave52/iter2b pattern)

**STATUS**: ADOPT-NOW per cardinal-rule-9 install-risk (low-risk — Anthropic-official plugin, no collision risk with installed marketplace)

**Install**:
```
/plugin install explanatory-output-style@claude-plugins-official
```

### Row 3: ENV block additions (Wave52/iter2b patterns)

**STATUS**: ADOPT-NOW per Wave52/iter2b unclosed-since-Q4 evidence

**Apply to** `Z:/claude-sota-pure/.claude/settings.json:env`:
```json
{
  "CLAUDE_CODE_USE_POWERSHELL_TOOL": "1",
  "CLAUDE_CODE_SESSIONEND_HOOKS_TIMEOUT_MS": "60000",
  "OTEL_LOG_USER_PROMPTS": "1",
  "OTEL_LOG_RAW_API_BODIES": "1"
}
```

**Apply to** `Z:/claude-sota-pure/CLAUDE.local.md` ENV block:
```powershell
# Wave52/iter2b pattern — Anthropic-official small-fast model pin
$env:ANTHROPIC_SMALL_FAST_MODEL = 'claude-haiku-4-5-20251001'  # per https://code.claude.com/docs/en/env-vars
```

**Apply to** `Z:/claude-sota-pure/tools/eee-pure.ps1`:
```powershell
# Wave52/iter2b pattern — per-arc budget cap
# Add CLI flag pass-through: --max-budget-usd <amount> for SDK budget enforcement
```

## 8. Pattern A Apply Verification

Per `codex-t1-fix-forward-pattern.md §Pattern A`:
- **9 prescriptions** integrated atomically (within ≤10 sweet spot)
- **conf 0.9** within 0.88-0.93 sweet spot
- **Single fix-forward**: NO iter-N+1.1 layering
- **T3 postcommit auto-verifies**: post-commit codex T3 hook will fire and write verdict to `.claude/state/codex_review_HEAD_<sha8>.txt`

**All 9 prescriptions applied**:

| ID | Severity | Applied at |
|---|---|---|
| F-001 | P1 | §1 saturation reframed to "soft SKIP by analogy" + deviations recorded |
| F-002 | P1 | §1 category outcome 2/3 saturated + 1/3 low-yield-not-exhausted |
| F-003 | P2 | §2 reframed as W163-revalidated (cross-fire validation) |
| F-004 | P2 | §2 refreshed counts (37+49 verified) + plugin-qualified install command + coding-tutor scope-out |
| F-005 | P1 | §2 ADOPT-NOW-PENDING-MIA+T1 status + pre-commit blocker discipline |
| F-006 | P1 | §4.1 trufflehog reason corrected to functional-redundancy-with-gitleaks |
| F-007 | P1 | §4.2 claude-squad re-probe-use-class (deferred to separate fire) |
| F-008 | P1 | §4.3 claude-context DEFER + §4.4 context-mode INSTALLED/KEEP |
| F-009 | P2 | §4.5 CCUI full blocker chain preserved |

## 9. VERDICT

**W229 FINAL VERDICT**: Pattern A fix-forward applied atomically per codex T1 W229 NEEDS-REVISION conf=0.9 9-prescribed_edits. Cross-model gate SATISFIED via REAL GPT-5.5 codex T1 at session-id `019e2e12-dcc5-7273-afab-27dfc4b8cbdc`. Saturation reframed as soft SKIP. 1 ADOPT-NOW-PENDING-MIA+T1 (EveryInc/CE, 16.8K★ MIT, 37+49 verified) + 1 ADOPT-NOW (explanatory-output-style) + 3 ENV pattern adoptions for Phase 1 install batch. 2 retractions DEFERRED to separate fires (claude-squad use-class re-probe + ComposioHQ re-evaluation). 1 INSTALLED/KEEP (context-mode). 1 DEFER (claude-context). 2 confirmed REJECTs (trufflehog redundancy + CCUI full-blocker-chain).

**Next step**: Step D — execute Phase 1 install batch §13 to `Z:/claude-sota-pure/` with Mia pre-apply probe gates + codex T2 commit-time gate per CR-3.
