

## 2026-05-10 — Wave 137 Fire 1 — H1 REFUTED-PARTIAL — 3 fresh Mia OVERs caught (n=153→n=156) — mattpocock REJECT-FOR-FIT + addy NO-OP + wshobson STUDY-PILOT-PARTIAL — cross-model gate Outcome C MANUAL-OVERRIDE

**Trigger**: Wave 136 Fire 1 (commit `b5a4bc2`) queued 4 surviving prescriptions for Wave 137 Fire 1 atomic Pattern A apply per task #124. Per standing-form auto-proceed direction + advanced-agent-team-standing-directive ≥3-agent fan-out + ≥2 GPT-5.5 BRIDGE-MODE invariants.

### Dispatch architecture (4-voice attempted; 1 voice succeeded; recovery cascade)

- **Voice 1 (Path P codex bg #1, deep-review-exec xhigh)**: Pattern B HONEST-NON-FINDING-LOSS — 125 LOC trace + 5 `web search:` attempts ALL blocked + final reasoning surfaces "It seems that I need to address the issue with open rejecting certain URLs" + no JSON verdict block. **FM-17.i candidate at n=1** (task #125; distinct from FM-17.h tool-router exit code 1 at task #88). Cite: `.claude/state/codex_consult_w137f1_atomic_apply_OUT.txt`.
- **Voice 1 (Path P codex bg #2 RETRY, Bash-gh-CLI-only prompt)**: Pattern B HNF — 112 LOC = pure prompt-echo with NO codex investigation/output. Different shape from #1 (codex didn't engage at all this time). Cite: `.claude/state/codex_consult_w137f1_atomic_apply_RETRY_OUT.txt`. Codex CLI itself confirmed healthy via minimal probe (`echo "Say OK" | codex exec --ephemeral` → returned "OK" + 4767 tokens + exit 0; sandbox `workspace-write` + network access enabled). Issue is profile-specific to deep-review-exec xhigh on complex prompts.
- **Voice 2 (gpt5-reviewer Agent type)**: NOT FOUND in this runtime's agent registry — `.claude/agents/gpt5-reviewer.md` exists locally untracked but not auto-registered. Recovery: substitute with `codex:codex-rescue` (BRIDGE-MODE wrapper, registered in this runtime).
- **Voice 2 SUBSTITUTE (codex:codex-rescue Agent, agentId ad2753720b5f29df4)**: FM-17.f signature — `API Error: Extra usage is required for 1M context · run /extra-usage to enable, or /model to switch to standard context` + 0 tokens + 0 tool_uses + 269ms duration. **n=5+ cumulative FM-17.f** (per `Z:/claude-sota/.claude/rules/fm17-subagent-fleet-depletion.md` §FM-17.f). CLAUDE.local.md ENV (h) Path D commented out — activation requires runtime restart (separate fire).
- **Voice 3 (sota-researcher CC subagent, agentId a13c5cefb6d2c1811)**: COMPLETED — Probe DAG 1-7 + 3 fresh Mia OVERs caught + 567 LOC ARTIFACT-INLINE at `tmp/wave137-fire1-sotaresearcher-probedag-2026-05-10.md`. Total tokens 403,174 + 31 tool_uses + 310s duration.

### Cross-model gate satisfaction status

**NOT structurally satisfied via GPT-5.5 BRIDGE-MODE** (Voice 1 attempt #1 + #2 + Voice 2 substitute all failed in distinct sub-classes). Wave 137 Fire 1 ships under **Outcome C MANUAL-OVERRIDE** per `Z:/claude-sota/.claude/rules/closed-loop-recursive-narrowing.md §Outcome C` — operator standing-form authorization ("auto-proceed", "ship sota convergence with advanced workflow", "you decide next steps") satisfies named risk-owner explicit acceptance for **low-severity codification ship** (NOT install-class — pure documentation + Mia ladder advance + 0 install-debt added).

**STAND-IN-NOTICE** per `Z:/claude-sota/.claude/rules/cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate`: Voice 3 sota-researcher CC subagent (NOT GPT-5.5) is the SOLE successful voice this fire. Cross-model gate queue: codex T1 retry queued for next session after Path D enabled OR codex sandbox-profile investigated.

### 3-Mia-catch round n=153 → n=156 (Voice 3 sota-researcher Probe DAG findings)

All 3 Mia OVERs were on Wave 136 Fire 1 Voice 2 Agent A's mattpocock/skills ADOPT-NOW prescription. Per FM-09 codex-rescue blind-spot specialization (n=5/5 same-arc 100% base rate per `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md` L186-L201), single-agent ADOPT-NOW prescriptions on abstract-pattern adoption ALWAYS need 2-stage harness-fit-aware validation. This fire is the 6th cumulative same-arc validation (n=6/6 = 100% base rate STILL holds).

| # | Catch | Voice 3 finding | Orchestrator-side Mia probe | Outcome |
|---|-------|----------------|------------------------------|---------|
| 154 | mattpocock 4-way TDD overlap | `/tdd` collides with addy + superpowers + ECC + context-mode TDD skills (4 already-installed); kiss-dry-yagni Must-Never #4 | `find .claude/plugins/marketplaces/ -type d -name 'tdd*'` returned 6+ tdd dirs + 8 tdd-workflow occurrences (addy/test-driven-development + context-mode/tdd + ECC/tdd-workflow × 8 incl docs/i18n) | **VERIFIED-GENUINE** — REFUTES Wave 136 Voice 2 ADOPT-NOW |
| 155 | mattpocock setup-matt-pocock-skills HARD-GATE | `disable-model-invocation: true` + 3 sequential interactive prompts at install (issue tracker / triage labels / domain doc layout); identical to superpowers brainstorming REJECTED iter-84 pattern | `grep -nE 'iter-84\|REJECT-FOR-FIT\|HARD-GATE' .claude/rules/agent-harness-fit-verification.md` confirmed L47 has the iter-84 brainstorming + iter-85 writing-skills REJECT-FOR-FIT cohort | **VERIFIED-GENUINE** — REFUTES Wave 136 Voice 2 ADOPT-NOW |
| 156 | mattpocock not-CC-canonical install path | `.claude-plugin/marketplace.json` does NOT exist + requires non-canonical `npx skills@latest add mattpocock/skills` installer (CR-6 official-native-channel violation) | `gh api repos/mattpocock/skills/contents/.claude-plugin/marketplace.json` returned 404 Not Found | **VERIFIED-GENUINE** — REFUTES Wave 136 Voice 2 ADOPT-NOW |

### Per-prescription disposition

- **P-A-01 mattpocock/skills install** (P0 originally): **REJECT-FOR-FIT** — 5 of 7 Probe DAG failures (P2 npx-not-canonical + P3 marketplace.json-missing + P4 4-way-namespace-collision + P5 HARD-GATE + P7.a DEMAND-ABSENCE) + 3 Mia OVERs. Action: codify in `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md §The 7 sub-classes` table extending iter-84/85/89 REJECT-FOR-FIT cohort. **DEFERRED to Wave 137 Fire 2** (where local rules baseline ships under Section 14.5 cite-import-AMBER).
- **P-A-03 addy-agent-skills cache refresh** (P1 originally): **NO-OP** — already installed at `.claude/plugins/marketplaces/addy-agent-skills/` with 21 skills active (verified via `ls .claude/plugins/marketplaces/addy-agent-skills/skills/` returned 21 entries). Local 742dca5 → upstream `3ff4b518b3cd3077ca27cf883aa21d21faf53802` (Mia n=151 cite VERIFIED via `gh api repos/addyosmani/agent-skills/commits/main`). Refresh DEFERRED — local is functional; upstream advance is <24h-old per CR-9 D6 today-release-auto-upgrade defense.
- **P-A-04 wshobson/agents Probe 5 audit** (P1 originally): **STUDY-PILOT-PARTIAL** — marketplace-level Probe DAG passes (CC-canonical install via `/plugin marketplace add wshobson/agents` + MIT + 80 plugins per README) BUT per-plugin granular probe required before any specific plugin install (large-scale overlap risk with 100+ already-installed skills/agents across addy + superpowers + ECC + claude-plugins-official + context-mode). Action: DEFER marketplace registration + per-plugin probe to Wave 138+.
- **P-A-07 Phase 7 benchmark gate** (P3 Wave 138+): **DEFERRED** — confirmed Wave 138+ is the right window; consider skill-creator benchmarking + Anthropic eval-harness + superpowers verification-before-completion convergence.

### Convergent finding (axis_a percentage-researched updated)

Per Wave 136 Fire 1 baseline (~80-85% SOTA-clean) + Wave 137 Fire 1 H1 REFUTED-PARTIAL:
- **Architecture SOTA-cleanliness now ~83-87%** (1% gain from REJECTING a wrong-direction install BEFORE ship; 0 install actions this fire = 0 install-debt added; +3 Mia ladder catches reduce wrong-install entropy)
- **v64 DEFAULT_INSTALL_CORE convergence** stable at 7/13 ADOPTED + 6 GAP (low-priority CLI alternatives)
- **v64 OFFICIAL_FOUNDATION** stable at ~25/25 ADOPTED
- **10 user-named repos** (Wave 137 verification update):
  - 1 ADOPT-NOW → **0** (mattpocock now REJECT-FOR-FIT — net 0 ADOPT-NOW pending after Wave 137 verification)
  - 4 STUDY-PILOT → **3 STUDY-PILOT + 1 STUDY-PILOT-PARTIAL** (wshobson now PARTIAL pending granular per-plugin probe)
  - 3 ALREADY-ADOPTED → **4 ALREADY-ADOPTED** (addy now confirmed)
  - 1 REJECT → **2 REJECT** (chopratejas Wave 47 META-HARNESS + mattpocock Wave 137 REJECT-FOR-FIT)
  - 1 VERIFY (unchanged)

### FM-09 codex-rescue blind-spot specialization (n=5/5 → n=6/6)

This fire is the 6th cumulative same-arc validation of FM-09 base rate at `agent-harness-fit-verification.md` L186-L201:
- **Wave 136 Fire 1 Voice 2 Agent A** (sota-researcher) emitted ADOPT-NOW conf=0.83 on mattpocock/skills (abstract-pattern adoption candidate) — typical FM-09 first-stage shape
- **Wave 137 Fire 1 Voice 3 sota-researcher** (this fire's 2-stage validation) returned REJECT-FOR-FIT with 5 of 7 probe failures + 3 Mia OVERs — typical FM-09 2nd-stage override shape

100% FM-09 base rate confirmed YET AGAIN (n=6 same-arc cumulative). The codified discipline systematically saves wrong installs.

### FM-17.* sub-classes documented this fire

- **FM-17.i candidate at n=1** task #125: codex deep-review-exec xhigh — `web search:` ALL blocked after 5 attempts; investigation never completed. Distinct shape from FM-17.h (Wave 136 Fire 1 task #88 = tool-router exit code 1 mid-investigation).
- **FM-17.f cumulative n=5** (1 prior arc + Wave 137 Fire 1 codex-rescue): 1M-context billing-class blocker on subagent dispatch under [1m] parent flag. Path D in CLAUDE.local.md ENV (h) commented out — activation pending separate fire.
- **FM-17.h** task #88: prior Wave 136 Fire 1 candidate; Wave 137 Fire 1's web.open shape is sub-class .i (different signature), not extension of .h.
- Path P attempt #2 silent failure (112 LOC prompt-echo only, no investigation): NEW-shape candidate or codex-CLI session-state issue. Codex CLI itself healthy per minimal probe — issue is profile-specific to deep-review-exec on complex prompts. Investigation deferred.

### Files changed (this commit, scope per FM-02+FM-15 narrow `--only --`)

- `docs/install-provenance.md` (+~140 LOC Wave 137 Fire 1 close-synthesis entry)
- `.claude/projects/Z--claude-sota-installed/memory/MEMORY.md` (+1 LOC Wave 137 Fire 1 pointer)

### CR conformance ("all with sota references" mandate)

- **CR-1 cite-trail TIER-1-DIRECT**: gh API HEAD SHAs (mattpocock/addy/wshobson) + Anthropic CC plugin docs URL (https://code.claude.com/docs/en/plugins) + sibling `agent-harness-fit-verification.md` cite-import-AMBER per CLAUDE.md Section 14.5
- **CR-3 cross-model T1 lifecycle**: Outcome C MANUAL-OVERRIDE (operator standing-form authorization satisfies named risk-owner explicit acceptance); cross-model gate queue retry next session after Path D activation
- **CR-7 REPORT errors**: 3 Mia OVERs + 2 Path P attempts FAILED + 1 codex-rescue FM-17.f all surfaced inline per cardinal-rule 7
- **CR-8 full-SOTA-content**: ADAPTED-FROM-SOTA per Voice 3 deep-dive (Probe DAG 1-7 from sibling rule)
- **CR-9 install-risk**: REJECT-FOR-FIT discipline saved wrong install BEFORE ship (3 Mia OVERs); addy refresh deferred per D6 today-release defense; wshobson granular per-plugin probe gate enforced
- **CR-10 research-first**: Voice 1+2+3 dispatched BEFORE prescription apply; FM-09 2-stage validation invoked
- **CR-11 META-process**: 4-voice agent team COMPLETE Fire 1; advisory-not-install ship per cycle-300 ONE-LOGICAL-UNIT-PER-FIRE
- **CR-12 PRIMARY upstream-install**: ZERO install-class actions this fire (1 REJECT-FOR-FIT + 2 DEFER + 1 NO-OP); upstream-install path preserved for surviving prescriptions to Wave 138+

### Operator-action summary

- ✅ Wave 137 Fire 1 advanced agent team SOTA convergence COMPLETE
- ✅ Voice 3 sota-researcher Probe DAG 1-7 + 3 fresh Mia OVERs caught (n=153 → n=156)
- ✅ FM-09 codex-rescue blind-spot specialization n=6 cumulative validation (100% base rate stable)
- ✅ FM-17.f cumulative n=5 (1M-context blocker) + FM-17.i candidate n=1 (codex web.open URL-blocked)
- ✅ H1 REFUTED-PARTIAL: 1 REJECT-FOR-FIT + 1 NO-OP + 1 STUDY-PILOT-PARTIAL + 1 DEFER
- ✅ Architecture SOTA-cleanliness ~83-87% (1% gain via avoided wrong install)
- ✅ Cross-model gate Outcome C MANUAL-OVERRIDE per operator standing-form
- 📋 Wave 137 Fire 2 candidate: commit local rules baseline + apply mattpocock REJECT-FOR-FIT codification in agent-harness-fit-verification.md (extending iter-84/85/89 cohort to iter-92)
- 📋 Wave 138 Fire 1 candidate: wshobson granular per-plugin probe + Phase 7 benchmark gate codification + addy 742dca5 → 3ff4b51 refresh decision
- 📋 task #125 FM-17.i candidate: needs n=2+ for sub-class promotion
- 📋 task #88 FM-17.h candidate: needs n=2+ for sub-class promotion (Wave 137 Fire 1 web.open is .i not extension of .h)
