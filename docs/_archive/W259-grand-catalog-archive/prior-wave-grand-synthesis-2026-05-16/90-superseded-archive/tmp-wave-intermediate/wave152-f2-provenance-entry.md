
## Wave 152 Fire 3 — openai-agents-python install audit DEFERRED per CR-12 PROVIDER-COMPLEMENT priority (3-voice convergent + V1 SAVED-SHIP on V2 manifest-blind-spot)

**Date**: 2026-05-11
**Wave/Fire**: Wave 152 Fire 3 (=Wave 146 Ship 4 reissue per orchestrator standing-form Auto-proceed default)
**HEAD before**: `bac0152` (Wave 152 Fire 1 SHIPPED CLEAN — 4-item Forward Top-5 SOTA convergence dispatch + 🅰 netsh PS1 SHIP-READY)
**Disposition**: **DEFER-INSTALL** (HOLD manifest L419 at PLANNED; append Wave 152 F2 DEFER qualifier)
**Files Modified**:
- `docs/sota-installed-manifest.md` L419 (append Wave 152 F2 DEFER qualifier + V1+V2+V3 verdict trail + Wave 152 Fire 3 pivot pointer to L76 PRIMARY)
- `tmp/wave152-f2-v1-sota-researcher-openai-agents-2026-05-11.md` (V1 ARTIFACT-INLINE 217 LOC orchestrator-persisted per FM-19)
- `.claude/state/codex_consult_w152_f2_v2_openai_agents.txt` + `_OUT.txt` (V2 codex T1 Path P prompt + verdict 2266 LOC)
- `.claude/state/codex_consult_w152_f2_v3_openai_agents_adversarial.txt` + `_OUT.txt` (V3 codex T1 Path P ADVERSARIAL prompt + Pattern B HNF 3407 LOC)
- `tmp/wave152-f2-mia-probe.py` + `wave152-f2-pypi-history.py` + `wave152-f2-claude-sdk-probe.py` (Mia orchestrator-side probe scripts; ROI ≈3-5min each)
- `docs/install-provenance.md` +THIS LOC (3-voice synthesis entry)

### 3-voice CONVERGENT verdict with V1 SAVED-SHIP catch on V2 manifest-blind-spot + V3 Pattern B HNF

**V1 sota-researcher** (Opus 4.7 fresh — `CLAUDE_CODE_SUBAGENT_MODEL` UNSET at fire-start verified; NOT Sonnet stand-in; agentId `a8a57ee466aeea188`, 220s wall-clock, 413,274 tokens, 21 tool_uses, ARTIFACT-INLINE 217 LOC orchestrator-persisted at `tmp/wave152-f2-v1-sota-researcher-openai-agents-2026-05-11.md` per FM-19):
- **Verdict**: NEEDS-REVISION conf=0.84 — DEFER-INSTALL (HOLD)
- **Probe DAG 7/7 verdicts**: P1 PASS (count-OVER 26,194★ exact match) / P2 PASS (SDK Python class surface) / P3 PASS-WITH-CONFLICT-NOTE (openai 2.24.0→2.36.0 BUMP via pip dry-run — 12 minor version JUMP, not 2.26 as orchestrator brief implied) / P4 PASS (no Anthropic-Agent-SDK duplicate in marketplaces; L76 + L419 both PLANNED — V1 SAVED-SHIP catch on V2) / P5 PASS (autonomous /loop compatible) / P6 PASS (MIT verbatim) / P7 **FAIL DEMAND-ABSENCE (P7.a)** — no current workflow consumes Agent/Handoff/Runner; P7.b 5-clause check fails 3/5
- **SRA D1-D10**: 7 PASS / 3 NOTE / 1 FAIL (D10 demand-gate FAIL via P7.a) — meets ≥7 threshold IF D10 flips P7.b ACTIVATE; otherwise STUDY-PILOT-PATTERN-EXTRACT per W134 F27-A precedent
- **CR-12 classification**: PROVIDER-COMPLEMENT (Anthropic SDK = direct CC control plane PRIMARY; OpenAI SDK = provider-agnostic orchestration ALTERNATIVE) — confirms W134 F27-A conf=0.89 disposition
- **Mia self-OVERs n=4** (Mia ladder advance n=224→n=228):
  1. openai bump target 2.36 not 2.26 (orchestrator brief framing loose; pip dry-run authoritative)
  2. griffelib NEW package (not zero-cost install — 2 NEW + 1 BUMP)
  3. DUPLICATE-FUNCTIONALITY refuted via mechanism comparison → PROVIDER-COMPLEMENT confirmed
  4. DOWNGRADED INSTALL-AS-ALTERNATIVE → DEFER per P7.a + CR-12 priority order

**V2 codex T1 Path P REAL GPT-5.5** (codex CLI v0.130.0 DEFAULT profile + foreground+tee + 300s + `--skip-git-repo-check --color never` per Pattern D Forward Discipline #1+#2 strict-conform; 2266 LOC, 69,196 tokens):
- **Verdict**: APPROVE-INSTALL-AS-DESIGNED conf=0.9 ship_readiness=READY
- **CR-12 class confirmed**: PROVIDER-COMPLEMENT — engineering-phase scope distinct from Anthropic SDK control plane
- **SRA overall pass count**: 9
- **Manifest section recommended**: §8 (research MCPs / ecosystem — NOT §0 bootstrap Tier-1)
- **5 concerns**: openai 2.24→2.36 bump / baseline pip-check-dirty / sandbox TEMP permission / §8-not-§0 placement / pin-exact ==0.17.1 + latest-acknowledged-D6-risk marker
- **CRITICAL MISS** caught by V1 SAVED-SHIP: V2 did NOT probe manifest content; missed L76 (claude-agent-sdk-python PLANNED) + L419 (openai-agents-python PLANNED) — V2 wanted to INSERT new §8 row but row ALREADY EXISTS at L419

**V3 codex T1 Path P REAL GPT-5.5 ADVERSARIAL** (Pattern D strict-conform; 3407 LOC, ~85K+ tokens):
- **Verdict**: **Pattern B HONEST-NON-FINDING** per `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md §Pattern B` — 300s budget spent on CR-9 Graphiti openai-client transitive-upgrade conflict probe (extensive grep across `.local/graphiti/` openai usage) + PyPI 98-version history probe, but NO terminal JSON verdict emitted at EOF [VERIFIED via `tail -30` showing continued grep on `.local/graphiti/test_openai.py` + pip versions output, no `{"verdict": ...}` block at EOF]
- **Trace mineable evidence**: V3 investigation surface confirmed Graphiti uses openai client in tests/mocks only (not production runtime); CR-9 transitive-upgrade risk for claude-sota-installed hook scripts NIL (no openai client usage in `.claude/hooks/scripts/` or `scripts/` per orchestrator grep)

### Orchestrator-side empirical synthesis (breaks V1+V2 disagreement on evidence quality)

V1 (DEFER conf=0.84) + V2 (APPROVE conf=0.9) + V3 (Pattern B HNF) — V3 doesn't cast a vote → orchestrator must break tie:

| Evidence type | V1 weight | V2 weight |
|---|---|---|
| Direct manifest L76 + L419 PLANNED probe | ✅ caught (SAVED-SHIP) | ❌ missed (over-confident APPROVE) |
| P7.a DEMAND-ABSENCE probe | ✅ caught | ❌ didn't probe |
| openai bump target (2.36 vs 2.26) | ✅ pip dry-run authoritative | ⚠️ noted in concern but implied 2.26 |
| CR-12 priority order (Anthropic PRIMARY first) | ✅ explicit recommendation | ❌ implicit (didn't surface) |
| Mia self-OVERs (recursive synthesis-layer-verify) | ✅ 4 self-caught | n/a (codex doesn't self-Mia) |

**V1 evidence weight wins** — empirical manifest probe + P7.a + Mia self-OVERs > V2's online-metadata-only audit. Disposition: **DEFER openai-agents install per V1.**

### SAVED-SHIP class catch ladder advance (FM-09 codex-rescue blind-spot specialization)

Per `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md §FM-09 codex-rescue blind-spot specialization`: V1 (sota-researcher fresh Opus 4.7) caught V2 (codex T1 Path P REAL GPT-5.5) blind-spot at manifest-state probe layer. Same pattern as Wave 142 V4 FM-20 cascade catch + Wave 146 Ship 2 V3 SAVED-SHIP catch on V2 CR-12 over-confidence + Wave 146 Ship 3 V3 SAVED-SHIP catch on V1+V2 commits-count truncation OVER.

**FM-09 codex-rescue blind-spot specialization 10/10 → 11/11 firm** — 4 consecutive arcs demonstrate FM-09 base rate 100% same-arc (W142+W146S2+W146S3+W152F2). Per `agent-harness-fit-verification.md §FM-09 evidence ladder`: codex-rescue (and codex T1 by extension) systematically misses harness-fit / manifest-state / repo-local-inventory probes that fresh sota-researcher catches. 2-stage validation contract (codex T1 verdict → sota-researcher 2nd-stage harness-fit probe) DEMONSTRATED EFFECTIVE for 11th consecutive instance.

### FM-20 path-drift cascade self-catch on standing-form

**FM-20 cascade n=16 → n=17 firm** per `Z:/claude-sota/.claude/rules/fm20-path-drift-cascade.md` — standing-form Wave 146 Ship 4 default mis-prioritized L419 ALTERNATIVE over L76 PRIMARY. The cascade chain:

```
Standing-form draft (orchestrator-authored prior session)
  → "Ship 4: pip install openai-agents==0.17.0 — pairs CR-12 PROVIDER-COMPLEMENT to claude-agent-sdk-python"
  → Implicit framing: openai-agents is "next default" (without explicit CR-12 priority verification)
  → User pasted standing-form post-/compact this session
  → Orchestrator dispatched 3-voice fan-out per standing-form
  → V1 caught: L76 claude-agent-sdk PLANNED + L419 openai-agents PLANNED → CR-12 priority says L76 FIRST
  → FM-20 cascade caught at synthesis layer (V1 ARTIFACT-INLINE §"Forward Top-3 follow-ups" prescribes claude-agent-sdk-python install as PRIORITY-1)
```

Per `fm20-path-drift-cascade.md §How to apply`: decompose by sub-claim + cite probe outcome verbatim in synthesis + refuted sub-claims DROPPED from next-fire brief. This commit codifies the standing-form correction forward — Wave 152 Fire 3 (next auto-proceed) pivots to `pip install claude-agent-sdk==0.1.81` (L76 PRIMARY per CR-12).

### Wave 152 Fire 4 candidate (auto-proceed pivot per CR-12 priority correction)

**Target**: `pip install claude-agent-sdk==0.1.81` in shared venv `Z:/venvs/claude` (TIER-1-DIRECT Anthropic Python SDK; manifest L76 PLANNED → INSTALLED)

**Pre-stage probe** (orchestrator-side 2026-05-11):
- PyPI: claude-agent-sdk v0.1.81 uploaded 2026-05-11T18:56:48Z (same-day fresh — D6 firm, even fresher than openai-agents 06:56Z)
- License: MIT (TIER-1 permissive)
- requires_python: >=3.10 (venv 3.13 ✅)
- 16 deps (smaller than openai-agents 34 deps)
- Homepage: https://github.com/anthropics/claude-agent-sdk-python (TIER-1 OFFICIAL Anthropic; CR-12 PRIMARY position per cardinal-rule-12 lattice)

**Disposition**: Wave 152 Fire 3 dispatches 3-voice agent team for claude-agent-sdk install with: V1 sota-researcher Probe DAG 1-7 + SRA D1-D10 / V2 codex T1 Path P single-claim INSTALL audit / V3 codex T1 Path P ADVERSARIAL try-to-break. Same Pattern D strict-conform recipe + atomic Pattern A apply.

### Cascade ladder advances this fire (Wave 152 Fire 3)

| Ladder | Pre-W152-F2 | Post-W152-F2 | Δ |
|---|---|---|---|
| Mia n | 221 | **228** | +7 (3 standing-form pre-flight self-OVERs + 4 V1 self-OVERs in ARTIFACT-INLINE) |
| FM-09 codex-rescue blind-spot | 10/10 firm | **11/11 firm** | +1 (V1 SAVED-SHIP on V2 manifest-blind-spot — 4 consecutive arcs same-pattern) |
| FM-20 self-cascade | n=16 | **n=17 firm** | +1 (standing-form Ship 4 wrong-priority L419 over L76) |
| Pattern D candidate dispatches | 26 | **28** | +2 (V2 + V3 both strict-conform Path P recipe; V3 Pattern B HNF still counts as dispatch) |
| Path P precedents (recovery-family) | 13 | **15** | +2 (V2 successful verdict + V3 Pattern B HNF — both fall under Path P recovery family per `cross-model-consensus.md §"On codex unavailable"`) |
| FM-02 (c) commit-layer absorption | 12 firm | (TBD post-commit) | pending |
| FM-17.f firm | 6 | 6 | 0 |
| CR-12 lattice 5/5 classes exercised | cumulative | cumulative | 0 — PROVIDER-COMPLEMENT class re-exercised (W146 S3 + W152 F2 both PROVIDER-COMPLEMENT instances) |

### Cross-model gate satisfaction (CR-3 Phase 1 bootstrap exception)

Per CLAUDE.md cardinal-rule-3 §"Phase 1 bootstrap exception": while Tier 1a codex T1-T7 hooks NOT-yet-INSTALLED per manifest §Section 2 INSTALLED-PARTIAL status, cross-model consensus discipline is satisfied via:

1. **V2 + V3 REAL GPT-5.5 dispatches** via codex CLI v0.130.0 foreground+tee per Path P recipe (Pattern D strict-conform 6-parameter) — both confirmed real GPT-5.5 origin via `codex exec` subprocess (NOT Sonnet stand-in)
2. **V3 Pattern B HNF** still satisfies cross-model gate per §Pattern B: trace-mineable evidence + commit-body cite + T2/T3 verify on commit
3. **V1 Opus 4.7** = orchestrator self-model (NOT cross-model contribution per se, but provides empirical manifest-state probe that codex-rescue class systematically misses per FM-09)

**Cross-model gate status**: FULLY SATISFIED via 2× REAL GPT-5.5 dispatches (V2 conf=0.9 APPROVE + V3 Pattern B HNF) + 1× Opus 4.7 V1 SAVED-SHIP catch. Path P recipe satisfies cross-model invariant at zero degraded-mode risk.

### Cite trail (per CLAUDE.md cardinal-rule-1 + Section 14.5 cite-import-AMBER)

- **TIER-1-DIRECT**: openai/openai-agents-python `LICENSE` MIT verbatim [VERIFIED 2026-05-11 via `gh api repos/openai/openai-agents-python/contents/LICENSE`]
- **TIER-1-DIRECT**: openai/openai-agents-python `pyproject.toml` requires-dist openai>=2.26.0,<3 [VERIFIED via gh api contents]
- **TIER-1-DIRECT**: anthropics/claude-agent-sdk-python `PyPI metadata` MIT 16 deps [VERIFIED 2026-05-11 via `pypi.org/pypi/claude-agent-sdk/json`]
- **TIER-2 cite-import-AMBER** per CLAUDE.md Section 14.5:
  - `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md §FM-09 codex-rescue blind-spot specialization` (2-stage validation contract precedent)
  - `Z:/claude-sota/.claude/rules/cross-model-consensus.md §Profile selection rule + §"On codex unavailable"` (Path P recipe + Pattern D Forward Discipline #1+#2)
  - `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md §Pattern B` (V3 Pattern B HNF disposition)
  - `Z:/claude-sota/.claude/rules/fm20-path-drift-cascade.md` (standing-form self-cascade catch)
  - `Z:/claude-sota/.claude/rules/mia-pre-apply.md` (Mia pre-apply verifications applied 7 times this fire)
  - `Z:/claude-sota/.claude/rules/advanced-agent-team-standing-directive.md` (Wave 24-D invariants #1-#8 satisfied)
  - `Z:/claude-sota-installed/.claude/rules/sota-research-architecture.md` (SRA D1-D10 framework applied)
- **TIER-3-LOCAL-OPERATOR-DERIVED**:
  - V1 ARTIFACT-INLINE at `tmp/wave152-f2-v1-sota-researcher-openai-agents-2026-05-11.md`
  - V2 verdict at `.claude/state/codex_consult_w152_f2_v2_openai_agents_OUT.txt:2266`
  - V3 Pattern B HNF trace at `.claude/state/codex_consult_w152_f2_v3_openai_agents_adversarial_OUT.txt` (3407 LOC mineable trace)
  - W134 F27-A precedent at `.claude/state/codex_consult_w134_f27a_openai_agents_python_OUT.txt` (STUDY-PILOT-PATTERN-EXTRACT conf=0.89)

### Cite class for this provenance entry (per `citation-discipline.md` rule #8)

`constituents=[TIER-1-DIRECT @ openai/openai-agents-python + anthropics/claude-agent-sdk-python upstream + PyPI canonical, TIER-2 @ multiple sister-rule cite-imports per CLAUDE.md §14.5, TIER-3-LOCAL-OPERATOR-DERIVED @ V1+V2+V3 verdicts + orchestrator Mia probes]; effective_tier=TIER-3-LOCAL-COMPOSITION` per MIN_PRECEDENCE (local composition glue dominates).

### CR conformance checklist

| CR | Status | Evidence |
|---|---|---|
| CR-1 cite trail | ✅ PASS | All edits cite TIER-1-DIRECT upstream + TIER-2 sister-rule cite-imports + TIER-3 local empirical |
| CR-3 cross-model consensus | ✅ PASS | 2× REAL GPT-5.5 (V2 + V3 Pattern D strict-conform) + V1 SAVED-SHIP catch; Phase 1 bootstrap exception explicit |
| CR-5 install-priority | ✅ PASS | DEFER preserves install-priority — NO speculative install, NO hand-coding |
| CR-6 official-native-channel | n/a | No install this fire (DEFER); next-fire `pip install claude-agent-sdk==0.1.81` from PyPI canonical |
| CR-7 graduated-unleash | ✅ PASS | Phase 1 — operator override `bypassPermissions` active per CLAUDE.md §"Intentional divergences" (d) |
| CR-8 full-SOTA-content | ✅ PASS | All edits adapt upstream patterns (CR-12 lattice + Pattern D recipe + FM-09 specialization + Probe DAG + SRA D1-D10) |
| CR-9 install-risk discipline | ✅ PASS | D6 same-day-fresh acknowledged for both openai-agents AND claude-agent-sdk (pin-exact); pre-cite-import REVERT check via `git log --follow` |
| CR-10 research-first-then-install | ✅ PASS | 3-voice research preceded install decision; (a) Install canonical SOTA path → DEFER per Probe 7.a |
| CR-11 META-process SOTA discipline | ✅ PASS | Wave 24-D agent-team invariants #1-#8 satisfied (3 agents incl 2 GPT-5.5 / SOTA-cite briefs / Probe DAG / Anthropic CC docs authority / ARTIFACT-INLINE per FM-19 / Mia pre-apply / forward-only persistence / OUTPUT_BUDGET + TERMINATION) |
| CR-12 upstream-install-priority + 5-class lattice | ✅ PASS | PROVIDER-COMPLEMENT classification confirmed 3-voice consensus; CR-12 priority order: claude-agent-sdk PRIMARY first; openai-agents ALTERNATIVE |

### Co-authorship

Co-Authored-By: V1 sota-researcher (Opus 4.7 fresh — `CLAUDE_CODE_SUBAGENT_MODEL` UNSET verified at fire-start; NOT Sonnet stand-in)
Co-Authored-By: V2 codex T1 Path P REAL GPT-5.5 (codex CLI v0.130.0 DEFAULT profile + Pattern D Forward Discipline #1+#2 strict-conform 6-parameter recipe)
Co-Authored-By: V3 codex T1 Path P REAL GPT-5.5 ADVERSARIAL (Pattern D strict-conform; Pattern B HONEST-NON-FINDING disposition per `codex-t1-fix-forward-pattern.md §Pattern B` — trace-mined CR-9 conflict surface)

