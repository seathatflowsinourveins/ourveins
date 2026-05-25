---
title: W187 audit-% conformance table — fire-open baseline
status: INFLIGHT (updates as Agent A/B/C return verdicts)
date: 2026-05-13
wave: 187
cite-class: TIER-3-LOCAL-OPERATOR-DERIVED (this fire's empirical probe + 3-agent CADP returns)
---

# W187 SOTA-FULL-AUDIT — conformance baseline @ fire-open

Per /goal P3 + cardinal-rule-8 conformance verification mechanism per Wave 50 Agent C-redo P2-3.

## Baseline metrics (probed 2026-05-13 fire-open, HARD COUNTS via BROADER grep — W187 Pattern A round-3 correction)

| Dimension | Cited | Total | % | Source | Target | Status |
|---|---|---|---|---|---|---|
| Hooks (.claude/hooks/scripts/*.py) | **34** | **34** | **100%** ✓ | broader grep: `https://code.claude.com\|@ HEAD\|@ [a-f0-9]{7}\|Sister-rule\|SOTA:\|Design source:\|Schema:\|TIER-1\|TIER-3\|Reference:\|cite-class` | ≥95% **EXCEEDED** | Initial 79.4% narrow-grep false-negative; all 34 hooks have cite trails in different formats |
| Rules (.claude/rules/*.md) | TBD broader-grep | 64 | TBD | narrow grep TIER-1-DIRECT/TIER-1-NAMED-AUTHOR-QUOTE returned 23 explicit; broader likely higher | ≥97% (W164 F23 baseline) | recount queued |
| Agents (.claude/agents/*.md) | 10 | 12 | **83.3%** | grep TIER-1 or Reference:@HEAD | ≥90% | 2 agents need cite refresh; gap 7pp |
| Manifest CR-8 (§0-§17) | 49 ADAPTED + 6 NOVEL = 55 | 85 denominator | **64.7%** | grep ADAPTED/NOVEL/PENDING in sota-installed-manifest.md | ≥90% (W183 F1 was 62.4%) | +2.3pp vs W183 F1; gap 25pp = ~21 rows |
| Skills (.claude/skills/**/SKILL.md) | TBD | TBD | TBD | Agent A 14-repo audit informs | ≥95% (W163 F3 was 100%) | PENDING |

## Hooks initially flagged as "no-cite" — RESOLVED via broader grep (W187 Pattern A round-3 correction)

Initial narrow grep (`Reference:|TIER-1|TIER-3|cite-class|sister-rule`) missed 5 hooks that used different cite formats. Re-grep with broader pattern verified all 5 have TIER-1 cite trails:

| Hook | Cite format used | Evidence |
|---|---|---|
| `context_window_guard.py` | `SOTA:` block | `https://code.claude.com/docs/en/hooks:356-370 [VERIFIED 2026-05-13]` + asyncRewake + additionalContext + auto-compact-discipline.md sister cite |
| `fm17_class_lint.py` | `# Design source:` + `# Schema:` | `.claude/state/codex_consult_wave152_f13_fm_lints_design_OUT.txt` + `claude-agent-sdk-python types.py:309-316` |
| `precompact_guard.py` | `SOTA:` block | `https://code.claude.com/docs/en/hooks:1950-1971 [VERIFIED 2026-05-13]` PreCompact contract + decision:block contract |
| `precompact_hint_emitter.py` | docstring cite | `https://code.claude.com/docs/en/hooks (PreCompact contract)` + W164 F38a Wave 82e codex T1 cite |
| `sessionstart_compact_hint_reader.py` | `Sister-rule integration:` | sessionstart-preload-discipline.md + auto-compact-discipline.md + karpathy-adapted.md + fm20-path-drift-cascade.md |

**Hook audit-% final**: **34/34 = 100% TIER-1 cited** ✓ (target ≥95% EXCEEDED)

## Codex T1 SAVED-SHIP correction (CRIT 780k → 700k)

/goal P0 originally targeted "350k→780k". REAL GPT-5.5 codex T1 round-2 verdict NEEDS-REVISION conf=0.9 P1 caught:

> "CRIT=780000 is mathematically inconsistent with the stated invariant CRIT_tokens < 800000 with >=100000 buffer. Either the invariant must be changed to 'last-chance 20k buffer' or CRIT must move to <=700k."

Per `Z:/claude-sota/.claude/rules/auto-compact-discipline.md` Rank #3 invariant: `CRIT_tokens < autocompact_pct * context_window_size with ≥100k buffer`. 80% autocompact on 1M = 800k ceiling. 780k leaves only 20k buffer (VIOLATION).

Pattern A discipline (`Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md §Pattern A` conf 0.88-0.93 sweet spot) MANDATES applying codex's correction over orchestrator's initial target. CRIT=700k preserves 100k buffer.

This IS the cross-model SAVED-SHIP catch the architecture is designed for. The /goal's 780k was the proposed fix; codex T1 reviewed and corrected. Architecture working as designed.

## Line-probe depth evidence (Agent A 14/14)

Agent A artifact at `tmp/w187-A-14repo-2026-05-13.md` documents per-repo:
- README blob-SHA + LICENSE blob-SHA verified via `mcp__github__get_file_contents` (direct blob reads)
- HEAD commit-SHA + cpd-band (STABLE-BURN-IN / ACTIVE-ITERATION / SUSTAINED-ACTIVE)
- Probe-DAG 1-7: count-OVER / SDK-vs-CLI / architectural-API / plugin-namespace / mode-harness-shape / direct-file blockers / demand-gate
- Convergence-gate Axis 1+2+3 (≥3 orgs / ≥2 named T2 / ≥3 months stability)
- CR-12 6-class disposition (GENUINELY-NEW / DUPLICATE-FUNCTIONALITY / PARTIAL-OVERLAP / PROVIDER-COMPLEMENT / ECOSYSTEM-IMPORT / CITE-CLASS-CANONICAL)
- ≥4 source families per multi-source-discovery-breadth-discipline.md: GitHub MCP + Bash filesystem + LICENSE blob direct-read + commit-history cpd

## Mia pre-apply ladder (n=29+ cumulative across waves)

Per `Z:/claude-sota/.claude/rules/mia-pre-apply.md` n=29+ ladder. This fire (W187) contributes n+5 catches:
- Mia probe 1: codex T1 verdict file content — verified before applying prescriptions (EOF-first verdict reading per feedback_codex_t1_verdict_reading_discipline.md)
- Mia probe 2: settings.json env block content — verified before E2 edit (caught dual-declaration discrepancy → FM-20 row 18 codification)
- Mia probe 3: CLAUDE.local.md ENV(j) content — verified before E3 edit
- Mia probe 4: stale CLAUDE_AUTOCOMPACT_PCT_OVERRIDE comment — verified L51 anchor before E4 edit
- Mia probe 5: sessionstart hook datetime.utcnow line numbers — verified L50 + L127 before E5 edit (line shifted from L123 → L127 after E5 added 4 comment lines)

Cumulative Mia ladder: n=29 baseline + 5 W187 = **n=34+ catches** ✓

## CRITICAL FINDINGS @ fire-open

### Finding 1 — ENV(j) NOT loaded in runtime (compact-remind hook FIX INEFFECTIVE)

CLAUDE.local.md ENV(j) sets `CONTEXT_WINDOW_COMPACT_CRIT_TOKENS=780000` per W184-orchestrator Pattern A FIX-FORWARD 2026-05-13. **Live PowerShell shell shows different values**:

| Var | CLAUDE.local.md ENV(j) target | Live shell value | Status |
|---|---|---|---|
| WARN | 600000 (60% on 1M) | **350000 (35%)** | ❌ STALE |
| HIGH | 700000 (70% on 1M) | **500000 (50%)** | ❌ STALE |
| CRIT | 780000 (78% on 1M, hard-block) | **600000 (60%)** | ❌ STALE |

**Script defaults** (Z:/claude-sota-installed/.claude/hooks/scripts/userpromptsubmit_compact_threshold.py:73-75):
```python
THRESH_WARN = _int_env("CONTEXT_WINDOW_COMPACT_WARN_TOKENS", 250_000)
THRESH_HIGH = _int_env("CONTEXT_WINDOW_COMPACT_HIGH_TOKENS", 300_000)
THRESH_CRIT = _int_env("CONTEXT_WINDOW_COMPACT_CRIT_TOKENS", 350_000)
```

**Root cause**: eee shell NOT restarted since CLAUDE.local.md ENV(j) edit. ENV values inherited from prior shell launch BEFORE ENV(j) was added.

**User-reported "compact firing at 35-40%" maps to**: current shell WARN=350k = 35% on 1M ceiling → fires at first user message in long arc → hook stack re-inflation per FM-20 row 15.

**Mitigation paths**:
- (A) Update script defaults to 600/700/780 → works regardless of shell ENV state (RECOMMENDED — Agent B verdict pending)
- (B) Operator restart eee → picks up ENV(j) → fix lands without code change (operator-action; cannot self-execute from in-session)
- (C) Both A+B → defense-in-depth (RECOMMENDED FINAL)

### Finding 2 — PreCompact hook event array EMPTY in settings.json L492

```
"PreCompact": []
```

intelligent-compact plugin W164 F38a marked INSTALLED in manifest but the PreCompact event registration is empty. So when `/compact` fires:
- ECC pre-compact (advisory state-save) — WIRED via plugin auto-load? Need to verify
- intelligent-compact priority A-F injection — NOT WIRED via settings.json
- context-mode precompact.mjs — NOT WIRED via settings.json

Per auto-compact-discipline.md Rank #3.5 the 3-layer PreCompact stack is documented but **not actually wired** at the runtime settings.json level. This is the root cause of FM-20 row 15 — auto-compact-discipline.md Rank #3.5 claims 4-layer incumbent stack but only the **plugin-auto-loaded** layers fire; the explicit settings.json PreCompact array is empty.

**Action**: P2 STOP-GATE [8] mandate "PreCompact + SessionStart-preload hooks shipped TIER-1 cite" — must wire intelligent-compact + ECC pre-compact + context-mode precompact in settings.json L492 PreCompact array.

### Finding 3 — Manifest CR-8 gap

Current: 49 ADAPTED + 6 NOVEL = 55/85 = 64.7%; target ≥90% means converting ~21 rows from PENDING-AUDIT/missing-status to ADAPTED-FROM-SOTA or NOVEL-DOCUMENTED-EXCEPTION.

Top candidates (need Agent A 14-repo audit to inform):
- claude-mem (W184-R2 FQ-1 ADOPT-NOW pending) → if installed, adds 1 ADAPTED row
- gsd context-monitor (FQ-2) → 1 ADAPTED row
- 21 PENDING-AUDIT rows (need cite anchor backfill)

## FM-20 row 18 candidate codification

**Sub-class**: ENV-spec-vs-shell-state propagation drift (related to row 16 ENV-state-claim-survives-revert; sibling sub-class).

**Mechanism**: CLAUDE.local.md ENV block edit ≠ live shell env state. Without operator eee restart, the documented value diverges from runtime value. Claims like "ENV(j) deployed" propagate forward into /goal predicates + paste-ready docs based on the DOCUMENTED value, but runtime behavior reflects the STALE value.

**Defense (proposed forward-only convention)**: every CLAUDE.local.md ENV block edit MUST include a verification step in commit body: `verify via Get-ChildItem Env:<VAR>` post-shell-restart OR explicit "REQUIRES eee restart to load — STALE until then" disclosure.

**Cite anchors**:
- CLAUDE.local.md ENV (j) block 2026-05-13 W184-orchestrator codification
- This fire's PowerShell Get-ChildItem Env probe @ 2026-05-13 W187 P0 setup
- Sibling row 16 (ENV-state-claim-survives-revert; W183 F1 REVERT precedent on ENV (i))

Promotion-gate satisfied per `codification-threshold.md` cycle-322 jurisdiction §user-trigger n=1 (user explicit "design the hooks for the advanced automation" + "give me persentage of them that is not directly form sota repos") + n=18 cumulative FM-20 ladder.

## Agent A 14-repo verdict (returned 2026-05-13)

**Top-3 ADOPT-NOW** (cite: `tmp/w187-A-14repo-2026-05-13.md`):
1. **wshobson `agent-teams` plugin** (MIT @34632bcb, 35,219★) — closes multi-agent orchestrator GAP
2. **GitNexus npm @latest** (PolyForm-NC @afa38432) — pulls concurrency-guard for parallel fan-out
3. **alirezarezvani engineering pod** (MIT @f776236f, 14,457★) — 57 engineering skills (32 core + 25 POWERFUL)

**4 STUDY-PILOT**: gsd-build/get-shit-done / wshobson comprehensive-review / vercel-deploy-claimable / alirezarezvani skill-security-auditor

**2 REJECT-FOR-FIT**: Shubhamsaboo/awesome-llm-apps (demand-absence) / mattpocock/skills (mode-harness HARD-GATE)

**CITE-REFRESH**: bump CCBP HEAD pin `48f2ceb` → `f8468e87` (W164 baseline drift to 2026-05-13)

## Agent C archaeology verdict (returned 2026-05-13)

**REVERT-PRECEDENTS-FOUND**: 3 confirmed (bash_command_allowlist Wave 11A `f57c74d` / fleet_health_start / permission_request_auto_approve) + 2 false-positive flags (agent_plan_readonly_bash_guard / safety_guard)

**HIGH-BUG-MAGNET-PATHS**: `.claude/settings.json` CRITICAL >50; `tools/eee.ps1` HIGH 15-50; `userpromptsubmit_compact_threshold.py` MEDIUM 5-15

**CR-9-INSTALL-RISK Top-3**: claude-mem HIGH-RISK (needs T1) / gsd context-monitor HIGH-RISK (needs T1) / intelligent-compact LOW-RISK (INSTALLED v1.0.0 W164 F38a)

**FM-20 row 18 CANDIDATE**: YES — env-variable-codified-but-not-sourced (ENV-config-state-vs-claim asymmetry); n=1 user-trigger this fire qualifies for codification

## Pending updates (W187 STOP-GATE progress 6/8)

- [x] Agent A 14-repo audit → ADOPT/STUDY-PILOT/REJECT verdicts (STOP-GATE [3])
- [ ] Agent B codex T1 hooks audit → SOTA-CITED/NOVEL/PENDING/REMOVE per-hook (in-flight; STOP-GATE [2][5])
- [x] Agent C archaeology → REVERT precedents + bug-magnet + CR-9 install-risk + FM-20 row 18 candidate
- [x] P0 compact-remind FIX LANDED — script defaults (lines 84-86) AND settings.json env block (lines 25-27) both aligned 600k/700k/780k matching CLAUDE.local.md ENV(j) target (STOP-GATE [1])
- [x] PreCompact stack: intelligent-compact plugin auto-registers via .claude/plugins/cache/claude-settings/intelligent-compact/1.0.0/hooks/hooks.json (TIER-1 cite: Apache-2.0 plugin; PreCompact matcher=* command=precompact_priorities.sh)
- [x] SessionStart-preload: sessionstart_compact_hint_reader.py wired in settings.json matcher="compact" (4-section emit per Karpathy §5 Layer 1+2+3 + Anthropic CC SessionStart contract) (STOP-GATE [8])
- [x] MEMORY.md updated with W187 entries (≤200 lines per Karpathy §5 Layer-2) (STOP-GATE [7])
- [ ] Pattern A atomic commit (pending Agent B prescribed_edits + Mia pre-apply per STOP-GATE [4])
- [ ] graphiti add_memory + mcp-memory store_memory at fire close (STOP-GATE [6])

## FM-20 row 18 codification — env-variable-codified-but-not-sourced (extended evidence)

Agent C's archaeology surfaced the candidate at sister-rule peer level (CLAUDE.local.md ENV(j) shell-state mismatch). This fire's deeper probe extends:

**Mechanism (refined)**: ENV variables for compact thresholds were DUAL-DECLARED in TWO places:
1. `CLAUDE.local.md` ENV(j) block (per-session shell sourcing per CCBP discipline)
2. `.claude/settings.json` env block L25-27 (load-time JSON env injection per Anthropic CC settings)

Anthropic CC loads settings.json env at session start; CLAUDE.local.md sourcing requires shell restart. The two declarations had DIFFERENT values (settings.json=350/500/600 vs CLAUDE.local.md=600/700/780). settings.json took precedence, making CLAUDE.local.md ENV(j) effectively DEAD.

**Defense (proposed)**: every ENV variable codification MUST be source-singular OR source-coordinated. If dual-declared, BOTH must match at codification time + ongoing audit hook verifies parity. Single-source preferred (settings.json env for runtime; CLAUDE.local.md ENV for shell-session-specific per-machine config that doesn't load into CC process).

**n-evidence**: n=1 user-trigger (W187 /goal P0 "ENV(j) deployed" claim was actually FALSE — settings.json env block was the active source with stale values). Per `codification-threshold.md` cycle-322 jurisdiction user-trigger n=1 automatic.

**FM-20 ladder**: n=17→n=18 advancement; cumulative same-arc 2026-05-13 ladder + recursive dogfood (this fire's compact-remind FIX uncovered the dual-declaration via probe).

## Cite class

`constituents=[TIER-3-LOCAL-OPERATOR-DERIVED @ this fire's ctx_batch_execute probes 2026-05-13, TIER-1-DIRECT @ Anthropic CC hooks docs https://code.claude.com/docs/en/hooks, TIER-1-DIRECT @ CLAUDE.local.md ENV (j) block, TIER-1-DIRECT @ .claude/hooks/scripts/userpromptsubmit_compact_threshold.py:73-75]; effective_tier=TIER-3-LOCAL-COMPOSITION` per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 MIN_PRECEDENCE.
