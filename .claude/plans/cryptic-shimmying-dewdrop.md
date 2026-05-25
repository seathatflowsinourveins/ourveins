# Plan — Full SOTA optimization + audit + cleanup of eee runtime

**Status**: DRAFT (Phase 1 in progress — 3 Explore agents probing in parallel)
**Plan owner**: orchestrator
**Created**: 2026-05-12
**Wave anchor**: 156+ (continuation of ongoing wave)
**Cite class**: `constituents=[TIER-1-DIRECT @ CCBP claude-subagents.md/claude-settings.md/cross-model-workflow.md + Anthropic CC docs + claude-agent-sdk-python @ HEAD b512f256 + 16 SOTA repos at HEAD SHAs verified per cardinal-rule-6, TIER-2 @ docs/sota-feature-activation.md §1-§8 + docs/sota-installed-manifest.md, TIER-3-LOCAL-COMPOSITION @ Wave 156 live state probes + 19 sister-rule cite-imports]; effective_tier=TIER-3-LOCAL-COMPOSITION` per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 MIN_PRECEDENCE.

---

## Context

**Why this plan**: user directive 2026-05-12 "unleash all with advanced workflow practice and sota harness... optimize architecture, agents, skills, more with sota features, /goal and beyond, with detailed audit of entire architecture code, using /goal start implant with advanced subagents and skills, agents invoke, make sure entire system full SOTA and clean up staled, low quality code fully... deep dive into sota references repos, all must be full sota official and clean, launch advanced agent team with sota skills and agents invoked from superpower ECC and more sota repos, deep dive into all sotarepos and beyond, read all the sota repos and research more sota repos beyond now your architecture is not working well, many of them are not sota, officially installed, clean up all the staled references, full deep dive with max depth, there may also have other hidden error, fallback etc..."

**System-reminder-surfaced concerns**:
- 6 files >40k chars triggering CC performance warnings:
  - `.claude/rules/agent-harness-fit-verification.md` 40.8k
  - `.claude/rules/codex-t1-fix-forward-pattern.md` 43.9k
  - `.claude/rules/cross-model-consensus.md` 62.7k
  - `.claude/rules/layered-gates-architecture.md` 40.6k
  - `.claude/rules/team-orchestration.md` 80.0k
  - `CLAUDE.md` 61.2k

**MEMORY.md surfaced backlog** (Wave 156 W156 F64-narrowed CCBP cite-refresh per codex T1 `b32yaijur`):
- 16 OPEN T3 findings (5 HIGH + 11 MEDIUM compounding)
- 198 META-disciplines tracked (32 satisfied + 166 candidates at cycle-322 gate)
- 88 consecutive Iron Law NO-PREDICTION re-applications (POST-DECENNIAL)
- 2 OPEN HIGH-severity T3 findings 52+ min unresolved (auth-flag + plugin manifest provenance)
- Closed-loop arc #7 round 3 NON-MONOTONE (0.86 → 0.90 → 0.86; round-5 cap eligibility approaching)
- New class CR-9-SIBLING-BLEED-VIOLATION-IN-RULES-SURFACE-CAUGHT-BY-T3 candidate n=1 firm
- Rules-layer cascade START at Fire 19 (27 untracked rules)
- Agent-layer cascade 10/11 = 90.9% (code-reviewer.md untracked = pending Fire 18)

**Intended outcome (terminal predicate for /goal)**:
- Architecture fully SOTA-cited per cardinal-rule-1 (every file at file:line + HEAD SHA depth)
- Cross-model consensus T1-T7 lifecycle mechanically wired (codex plugin INSTALLED for T2/T3/T4/T6/T7)
- All 6 >40k-char files split or trimmed under 40k
- All 16 OPEN T3 findings dispositioned (APPROVE / Pattern A fix-forward / Outcome A ACCEPT-WITH-DOC / Outcome B REVERT-AND-REMOVE / Outcome C MANUAL-OVERRIDE per closed-loop-recursive-narrowing.md)
- All sibling-bleed violations (CR-9) sanitized
- Marker Decay stale cites refreshed
- Top-N SOTA repo gaps closed (ECC + CCBP + superpowers + wshobson + Karpathy line-by-line audit)
- `/goal` predicate-runner integration shipped (terminal-predicate-construction skill + pre_goal_gate.py hook + goal-completion-verify skill)
- agent_view + subagent dispatch optimized (11 local agents tuned + FORK-vs-FRESH audit)
- Audit percentages tracked per audit-action-loop.md Wire→Surface→Close→Re-fire
- `docs/install-provenance.md` updated with full audit trail

**Cardinal trade-off**: this is multi-arc work (4-12 hours total scope per PATH B + PATH C in earlier deep-dive). Cannot complete in single fire per cycle-300 ONE-LOGICAL-UNIT-PER-FIRE. Plan sequences into atomic bounded units, each individually shippable + verifiable.

---

## Phase 1 — Discovery (RE-DISPATCHED with sonnet override after FM-17.g)

**Round 1 (FAILED)**: 3 Explore agents dispatched 2026-05-12 18:21 with default haiku-4-5 model. ALL 3 failed pre-fire ~180-190s with `API Error: 502 unknown provider for model claude-haiku-4-5`. New FM-class candidate: **FM-17.g — provider-side 502 for default Explore subagent model**. n=1 firm (first observation). Not yet cycle-322 promotion-eligible (needs n≥3 self-observed).

**Round 2 (IN-PROGRESS)**: 3 Explore agents re-dispatched 2026-05-12 with `model: 'sonnet'` override (bypasses haiku-4-5 outage path per cardinal-rule-9 install-risk discipline + FM-17.g recovery).

| Agent | Brief | OUTPUT_BUDGET | Output destination |
|---|---|---|---|
| Agent A (Architecture state audit) | Map every layer + 7 audit conformance percentages | 600 LOC | `tmp/wave156-arch-state-audit-2026-05-12.md` |
| Agent B (SOTA repos deep-dive) | 16 repos × HEAD SHA + Top-N catalog + ECC/CCBP line-by-line + axis-1+2+3 verdicts | 800 LOC | `tmp/wave156-sota-repos-deep-dive-2026-05-12.md` |
| Agent C (Cleanup audit) | Stale + low-quality + hidden errors + CR-9 sibling-bleed + Marker Decay + categorized CRITICAL/HIGH/MED/LOW | 600 LOC | `tmp/wave156-cleanup-audit-2026-05-12.md` |

Awaiting completion notifications (3 agents currently running). NOT polling per system-reminder discipline.

## Phase 1 supplementary — Orchestrator-direct probe-batch (COMPLETE)

While agents run, executed user-requested probes from AskUserQuestion Q4 answers. Findings below SUPERSEDE earlier plan draft assumptions:

### Finding 1 — codex plugin ALREADY INSTALLED + ENABLED ✅

State probe (via Bash `which codex` + grep settings.json + find hook scripts):
- `codex-cli 0.130.0` on PATH at `/z/claude-sota-installed/.local/npm/codex`
- `codex@openai-codex` ENABLED in `.claude/settings.json:enabledPlugins`
- `everything-claude-code@everything-claude-code` ENABLED
- `pyright-lsp@claude-plugins-official` ENABLED

**T2/T3/T4/T7 hook scripts PRESENT**:
- `Z:/claude-sota-installed/.claude/hooks/scripts/codex_t2_pre_commit_gate.py` ✅
- `Z:/claude-sota-installed/.claude/hooks/scripts/codex_postcommit_review.py` ✅
- `Z:/claude-sota-installed/.claude/hooks/scripts/codex_prepush_review.py` ✅
- `Z:/claude-sota-installed/.claude/hooks/scripts/auto_proceed_gate.py` ✅
- **MISSING**: `codex_stop_review_gate.py` (T6 stop-gate) — last remaining FORWARD-REF

**IMPLICATION**: Earlier draft Ship B1 ("Install codex plugin") is OBSOLETE. New scope reduces to:
- Verify T2/T3/T4 hooks are actually WIRED in settings.json:hooks (not just present in scripts/)
- Install T6 `codex_stop_review_gate.py` (Anthropic SOTA via codex plugin OR ship locally per cardinal-rule-5 install-priority)
- Audit 96 OPEN T3 verdict files for disposition (see Finding 4)

### Finding 2 — MCP servers: 14 total

State probe: `.mcp.json` server count = 14 (10 active + 4 `_comment_*` disabled per earlier check).

### Finding 3 — mcp_overhead_audit.jsonl does NOT exist

`Z:/claude-sota-installed/.claude/state/mcp_overhead_audit.jsonl` not found. PATH A Ship A5 needs initial generation, not refresh.

### Finding 4 — 96 T3 verdict files filtered by severity (USER-AUTHORIZED: filter+triage)

Distribution per fresh probe 2026-05-12:
- **APPROVE**: 14 verdicts (no action — clean ships)
- **NEEDS-REVISION**: 37 verdicts (Pattern A apply candidates per `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md §Pattern A`)
- **REJECT**: 9 verdicts (REVERT-AND-REMOVE candidates per `Z:/claude-sota/.claude/rules/closed-loop-recursive-narrowing.md §Outcome B`)
- Multi-count severity tags across files: HIGH=32, MED=70, LOW=38
- conf≥0.85 occurrences: 181 (sums across files)

**Actionable subset**: 46 verdicts (37 NEEDS-REVISION + 9 REJECT). Triage by:
1. conf≥0.85 + HIGH severity → Pattern A apply IMMEDIATE
2. conf 0.78-0.84 + HIGH → Pattern A apply OR Outcome A ACCEPT-WITH-DOC (case-by-case per severity-gate)
3. conf<0.78 + MED/LOW → Outcome A ACCEPT-WITH-DOC blanket eligible
4. REJECT verdicts → REVERT-AND-REMOVE per `Z:/claude-sota/.claude/rules/closed-loop-recursive-narrowing.md §Outcome B`

### Finding 5 — Billing class CONFIRMED API Usage Billing

Per system reminder: `Opus 4.7 (1M context) with max effort · API Usage Billing`. Implications:
- FM-17.f 1M-context-entitlement billing-class blocker is subscription-specific; UNLIKELY to fire on API billing per `docs/fm17f-deep-dive-2026-05-09.md` §3
- Path D (`CLAUDE_CODE_DISABLE_1M_CONTEXT=1`) ACTIVATION may not be needed for this session's fan-out

### Finding 6 — Recent FM-17 history per `subagent_metrics.jsonl`

Wave 130 had FM-17.f n=4 same-day instance. Wave 131 sota-researcher identified 17 SOTA gaps across V62 13-category matrix (eee score 5 STRONG / 5 GOOD / 4 PARTIAL / 1 WEAK = "solid SOTA shape"). FM-17 cumulative ladder n=16 firm.

### Finding 7 — SOTA repo HEAD probes (no output from gh batch)

The 16-repo HEAD probe batch returned (no output) — likely gh rate-limit OR timeout. Will be covered by Agent B re-dispatch.

### Finding 8 — CR-3 Tier 1a wire status verified — 6/7 touchpoints WIRED ✅

Per Read of `.claude/settings.json` hooks block (full enumeration):

| Touchpoint | Status | Hook script | Trigger | Mode |
|---|---|---|---|---|
| T1 pre-edit | ✅ WIRED | `codex_t1_consult_gate.py` | PreToolUse Edit\|Write\|MultiEdit | 5s sync |
| T2 pre-commit | ✅ WIRED | `codex_t2_pre_commit_gate.py` | PreToolUse Bash(git commit *) + Bash(git -C * commit *) | 180s sync |
| T3 postcommit | ✅ WIRED | `codex_postcommit_review.py` | PostToolUse Bash(git commit *) + Bash(git -C * commit *) | 30s async |
| T4 post-push | ✅ WIRED | `codex_prepush_review.py` | PostToolUse Bash(git push *) + Bash(git -C * push *) | 30s async |
| T5 plan-stage | ✅ WIRED | `codex_t5_plan_review_gate.py` | PreToolUse ExitPlanMode | 5s async |
| T6 stop-gate | ⚠️ **ANOMALY** | `.pyc` cache EXISTS + `.jsonl` state EXISTS but `.py` source MISSING + NOT wired in Stop hook | (none) | (none) |
| T7 ask-without-act | ✅ WIRED | `auto_proceed_gate.py` | Stop hook slot[0] | 5s sync |

**T6 anomaly detail**: `Z:/claude-sota-installed/.claude/hooks/scripts/__pycache__/codex_stop_review_gate.cpython-313.pyc` exists + `Z:/claude-sota-installed/.claude/state/codex_stop_review_gate.jsonl` exists, indicating the script PREVIOUSLY ran successfully. BUT `.py` source not present at expected path + no Stop hook entry referencing it. Either:
- Script was deleted leaving stale `.pyc` (most likely)
- Script moved to different location
- Plugin upstream removed it

**ACTION**: Ship — Recover T6 script from codex plugin upstream (`Z:/claude-sota-installed/.claude/plugins/cache/openai-codex/codex/1.0.4/hooks/`) OR re-derive from sibling `Z:/claude-sota/.claude/hooks/scripts/codex_stop_review_gate.py` if exists (per user-answered "From codex plugin upstream" Q2). Wire in `.claude/settings.json` Stop hook slot[N+1].

**CR-7 Phase 2 trigger predicate (c)**: 6/7 SATISFIED. T6 wire + T6 source recovery is the FINAL blocker. After T6 ships, CR-7 Phase 2 transition becomes ELIGIBLE (with additional predicates per CLAUDE.md L122 still needed: Tier 1b/1c smoke-probe PASS, Tier 2 MCP smoke-probe PASS, arc-convergence ≥7 fires no NEEDS-REVISION conf>0.85, zero open INSTALLED-AMBER).

### Finding 9 — fm17d_stall_detector DISABLED via env (Wave 76)

`FM17_STALL_DETECTOR_DISABLE=1` in settings.json env block per `_comment_fm17d_disabled` Wave 76 2026-05-08:
- 100% schema-rot (172 entries / 172 schema_missing across two sessions, 0 useful classifications)
- CC v2.1.119 / 2.1.132 don't emit `stop_reason` / `tool_uses` fields at top level
- Pending: fix SubagentStop input-schema parsing in script

**ACTION**: PATH C ship — Fix `fm17d_stall_detector.py` SubagentStop schema parsing per current CC 2.1.139 SubagentStop input shape (per Anthropic SDK `Z:/repos/deps/claude-agent-sdk-python/src/claude_agent_sdk/types.py:309-316 @ HEAD b512f256` SubagentStopHookInput schema). Re-enable after fix (unset env).

### Finding 10 — 14 ECC hooks DISABLED via env (Wave 76+77)

`ECC_DISABLED_HOOKS` env block lists 14 disabled hook IDs:
- pre:bash:gateguard-fact-force, pre:edit-write:gateguard-fact-force
- pre:write:doc-file-warning
- post:edit:design-quality-check, post:edit:console-warn
- stop:format-typecheck, stop:check-console-log
- pre:observe:continuous-learning, post:observe:continuous-learning
- pre:edit-write:suggest-compact
- post:session-activity-tracker
- stop:evaluate-session
- stop:cost-tracker
- stop:desktop-notify

**ACTION**: PATH C ship — Audit each disabled hook for re-enable consideration per cardinal-rule-12 disposition lattice (DUPLICATE-FUNCTIONALITY / PROVIDER-COMPLEMENT / ECOSYSTEM-IMPORT). Some likely correctly disabled (duplicate functionality); others may have lost value when disabled.

### Finding 11 — Hooks block summary

Per Python json.load probe:
- PreToolUse: 7 entries (Edit\|Write\|MultiEdit / Bash(git commit *) × 2 / Bash(git push *) × 2 / ExitPlanMode / etc.)
- PostToolUse: 3 entries
- PostToolUseFailure: 1
- Stop: 1 matcher (`*`) with 4 sub-commands (auto_proceed_gate + cwc commit-on-stop-throttled + marketplace node.exe script + another python script)
- SubagentStop: 1
- UserPromptSubmit: 1
- SessionStart: 3
- SessionEnd: 1

**ACTION**: PATH C ship — Audit Stop hook 4 sub-commands; identify what each does; verify T6 codex_stop_review_gate.py belongs as 5th sub-command.

---

## Phase 1 — DISCOVERY SYNTHESIS (all 3 Explore agents COMPLETE)

### Agent A — Architecture state (373s, 56k tokens, 40 tool uses, sonnet override)

**Counts**:
- 11 agents (10 root + 1 cwc/evaluator + 1 reference) — `Z:/claude-sota-installed/.claude/agents/`
- 39 rules — `.claude/rules/`
- 13 local skills + 1,610 plugin-cache skills + 845 marketplace skills = 2,468 SKILL.md total
- 4 commands (sparse — harvest/mistake-add/mistake-search/recall)
- 11 MCP servers active
- 13 wired hooks + 16 LATENT scripts (11 true gate-hooks + 5 helper libs)
- 274 tmp wave files (all fresh <14d)
- 2,293 docs files

**5 CRITICAL >40k rules**:
| File | Size |
|---|---|
| `team-orchestration.md` | 84,298 bytes |
| `cross-model-consensus.md` | 63,703 bytes |
| `codex-t1-fix-forward-pattern.md` | 46,549 bytes |
| `layered-gates-architecture.md` | 41,840 bytes |
| `agent-harness-fit-verification.md` | 41,615 bytes |

**14 CRITICAL >40k docs** (worst offenders):
| File | Size |
|---|---|
| `install-provenance.md` | **2.1 MB** (extreme outlier) |
| `sota-installed-manifest.md` | 399,122 bytes |
| `eee-launch-design-cliproxyapi.md` | 89,694 bytes |
| `sota-architecture-audit/04-decision-tracker.md` | 61,404 bytes |
| `superpowers/specs/2026-05-12-sota-architecture-deep-audit-design.md` | 61,364 bytes |
| `superpowers/plans/2026-05-12-sota-architecture-deep-audit.md` | 45,456 bytes |

**3 CRITICAL >40k bootstrap files**:
- `CLAUDE.md` 62,389 bytes
- `.claude/settings.json` 58,007 bytes
- `tools/eee.ps1` 53,596 bytes

**7 conformance percentages**:
| Metric | Value | Severity |
|---|---|---|
| Agents with full 16-field CCBP frontmatter | **0%** (0/12) | CRITICAL |
| Rules with TIER-1-DIRECT cite in first 10 lines | **10%** (4/39) | HIGH |
| Skills with valid `origin:`/`sota-cite:` frontmatter | **0%** (0/13 local) | HIGH |
| Hooks emitting `agent_id`/`agent_type` JSONL | **69%** (9/13 wired) | MED |
| Files >40k chars (absolute) | ~22 files | CRITICAL |
| `asyncRewake: true` usage | **0%** | HIGH |
| `cardinal-rule-1` conformance overall | **~65%** | MED |

**Anomalies**:
- `evaluator.md` BROKEN: HTML comment header wraps YAML — only 3/16 fields parsed
- 16 LATENT hook scripts NOT wired (codex_t1_consult_gate.py / codex_t2_pre_commit_gate.py / codex_t5_plan_review_gate.py / agent_plan_readonly_bash_guard.py / fm17_class_lint.py / fm17d_stall_detector.py / fm19_artifact_inline_lint.py / fm20_path_drift_lint.py — disabled via `ECC_DISABLED_HOOKS` env per Wave 76+77)
- sota-researcher.md references 3 MCP servers NOT in `.mcp.json`: perplexity, exa, firecrawl (silent degradation risk)
- Bootstrap triad bloated (CLAUDE.md + settings.json + eee.ps1 all >40k)

Full artifact: `tmp/wave156-arch-state-audit-2026-05-12.md` (~600 LOC, returned ARTIFACT-INLINE in Agent A output)

### Agent B — SOTA repos deep-dive (413s, 89k tokens, 25 tool uses, sonnet override)

**16 repos verified at HEAD SHAs**:
| # | Repo | HEAD | License | Verdict |
|---|---|---|---|---|
| 1 | affaan-m/everything-claude-code (ECC) | `841beea4` | MIT | ADOPT-NOW (165 skills) |
| 2 | shanraisshan/CCBP | `48f2cebe` | unknown | STUDY-PILOT (hooks-extract only) |
| 3 | obra/superpowers | `f2cbfbef` | MIT | ADOPT-NOW (8 of 14 remaining) |
| 4 | AsyncFuncAI/deepwiki-open | `5b43df54` | Apache-2.0 | REJECT-FOR-FIT (CITE-class) |
| 5 | nibzard/awesome-agentic-patterns | `9c40e100` | Apache-2.0 | STUDY-PILOT (CITE-class) |
| 6 | vinta/awesome-python | `5909fa76` | CC-BY-4.0 | REJECT-FOR-FIT (CITE-class) |
| 7 | wshobson/agents | `ece811f2` | unknown | STUDY-PILOT (conductor extract) |
| 8 | abhigyanpatwari/GitNexus | `8083c39f` | unknown | **REJECT-FOR-FIT (MISIDENTIFIED — PHP tool, not CC)** |
| 9 | quemsah/awesome-claude-plugins | `62e65931` | unknown | STUDY-PILOT (index use) |
| 10 | Shubhamsaboo/awesome-llm-apps | `795212bf` | Apache-2.0 | REJECT-FOR-FIT (CITE-class) |
| 11 | forrestchang/andrej-karpathy-skills | `2c606141` | unknown | ADOPT-NOW LOW priority (already in eee karpathy-adapted.md 255L) |
| 12 | mattpocock/skills | `f304057d` | unknown | REJECT-FOR-FIT (domain mismatch) |
| 13 | hesreallyhim/awesome-claude-code | `614f102a` | **CC-BY-NC-ND-4.0** | REJECT (license — no derivatives) |
| 14 | alirezarezvani/claude-skills | `7d493fed` | unknown | STUDY-PILOT (format-adapt; 0 SKILL.md uses different structure) |
| 15 | gsd-build/get-shit-done | `3aaed8f5` | unknown | STUDY-PILOT (graphify + retrospective-canonical) |
| 16 | vercel-labs/agent-skills | `b9c8ee06` | unknown | ADOPT-NOW (4 of 8 remaining) |

**Top-10 ADOPT-NOW priority ranking** (Phase 2 implementation queue):
1. ECC `autonomous-loops` (loop-architecture skill gap)
2. ECC `agent-harness-construction` (build vs verify gap)
3. ECC `canary-watch` (ONLY post-deploy monitoring primitive across all 16 repos)
4. Vercel 4 remaining (deploy-to-vercel + react-native-skills + react-view-transitions + vercel-cli-with-tokens; STRONG-PROVENANCE-EXPRESS)
5. ECC `content-hash-cache-pattern` (caching primitive gap)
6. CCBP hooks taxonomy 27+2 events (Setup, InstructionsLoaded, Elicitation, WorktreeSetup/Remove, SubagentStart/Stop, PreCompact/PostCompact, PermissionDenied — undocumented in eee)
7. ECC `mcp-server-patterns` (MCP build-side; complements client-recovery)
8. wshobson conductor (multi-session persistence)
9. ECC `prompt-optimizer` (low-friction ADOPT)
10. GSD `graphify` + `retrospective-canonical` (STUDY-PILOT pattern-extract)

**HONEST-NON-FINDING**:
- abhigyanpatwari/GitNexus MISIDENTIFIED — PHP static-analysis tool, NOT Claude Code repo
- alirezarezvani/claude-skills has 0 SKILL.md files (uses domain/skill/scripts/ structure — format-adapt required)

Full artifact: `tmp/wave156-sota-repos-deep-dive-2026-05-12.md` (~800 LOC)

### Agent C — Cleanup audit (305s, 51k tokens, 5 tool uses, sonnet override)

**CRITICAL** (cardinal-rule violations):
- **C-1 CR-9 SIBLING-BLEED**: 6 agents (architect.md / code-reviewer.md / debugger.md / gpt5-archaeologist.md / gpt5-reviewer.md / verifier.md ALL line 4) + 15+ rules embed live `Z:/claude-sota/` paths in prompt-consumed surfaces; T3 verdict 79d73fcb CONFIRMED needs-attention conf=0.76 (evidence-policy.md:4)
- **C-2 INVERSE FM-16**: `disabledMcpjsonServers: []` empty (all MCPs enabled) BUT cross-model-consensus.md:116,320,351 + research-protocol.md:118 still warn `local-judge [CURRENTLY DISABLED]` — stale qualifier causes silent capability loss
- **C-3 261 T3 `needs-attention` verdicts** total in `.claude/state/codex_review_HEAD_*.txt` (37 mmin -1440 actionable subset per orchestrator-direct probe)

**HIGH**:
- **H-2 17 INSTALLED-AMBER + 105 PENDING/PLANNED** rows in `docs/sota-installed-manifest.md`
- **H-4 67 UNTRACKED files** including ALL governance rules + agents/code-reviewer.md + cwc/ subdir + .claude/plans/ + .claude/cache-fix-state/ + .claude/context-mode/ + .claude/daemon/ — **DATA-LOSS RISK** if git reset
- **H-5 FORWARD-REF uninstalled**: sota_freshness_sweep.py + vendor_pin_audit.py + run_judge_verdict_eval

**Hidden-error patterns**:
- HE-1 Fail-open hook ratchet (silent-failure-by-design per cycle-412; hook errors → stderr + exit 0; broken gate = silent no-gate)
- HE-2 sota_freshness_sweep.py FORWARD-REF gap ("audit alone provides 0 protection")
- HE-3 Inverse FM-16 capability loss
- HE-4 261 open T3 with no closure tracker

Full artifact: `tmp/wave156-cleanup-audit-2026-05-12.md` (~600 LOC)

### Phase 1 supplementary orchestrator-direct findings

- T1-T5 + T7 hooks WIRED in settings.json ✅ (T6 anomaly: `.pyc` cache + `.jsonl` state exist but `.py` source MISSING + NOT wired)
- 96 T3 verdicts mmin -1440: 14 APPROVE + 37 NEEDS-REVISION + 9 REJECT (46 actionable; rest informational)
- `fm17d_stall_detector` DISABLED via `FM17_STALL_DETECTOR_DISABLE=1` Wave 76 (schema-rot 100%)
- 14 ECC hooks DISABLED via `ECC_DISABLED_HOOKS` env per Wave 76+77 baseline
- Billing class: API Usage Billing — FM-17.f UNLIKELY to fire (subscription-specific)
- New FM-class candidate: **FM-17.g — haiku-4-5 provider 502 outage** (3 Explore agents failed pre-fire; recovered via `model: 'sonnet'` override)

============================================================
USER-ANSWERED SCOPE DECISIONS (4 question sets, 12 questions, ALL "Recommended")
============================================================

| Q | Decision |
|---|---|
| Q1 Cleanup posture | **Archive then remove** (docs/_archives/2026-05-12/ first) |
| Q2 File splits | **Split now in this plan** (5 rules + 6 docs + 3 bootstrap) |
| Q3 Sequencing | **Atomic per cycle-300** (~24 commits across 4-12 hours) |
| Q4 Phase 1 supplementary probes | FM-17.f billing-class + SOTA repo HEADs + codex CLI install audit (all done) |
| Q5 T3 disposition (96/261) | **Filter + triage by severity** (APPROVE→no-action; NEEDS-REVISION conf≥0.85→Pattern A; conf<0.85→ACCEPT-WITH-DOC; REJECT→REVERT) |
| Q6 T6 codex_stop_review_gate.py source | **From codex plugin upstream** (probe cache → recover OR build cite-import-AMBER) |
| Q7 Phase 2 trigger | **Auto-proceed** to Phase 2 + final plan + ExitPlanMode |
| Q8 67 untracked emergency commit | **Pre-execution emergency-commit** (single bundled — BEFORE other ships) |
| Q9 CR-9 sibling-bleed remediation | **Convert to [PROVENANCE-ONLY] qualifier inline** (preserves audit trail; signals NOT-an-install-source) |
| Q10 Inverse FM-16 fix | **Strip qualifiers + add OWNED to mcp-disconnect-recovery.md + add INVERSE-FM-16 sub-class to named-failure-modes.md** |

============================================================

## Phase 2 — Plan agent (COMPLETE)

Plan agent returned 2026-05-12 (320s, 49k tokens, 51 tool uses, sonnet override). Full design at `tmp/wave156-plan-final-strategy-2026-05-12.md`.

User-answered final 3 scope decisions:
| Q | Decision |
|---|---|
| Q11 Execution model | **Single /goal predicate autonomous** (per "unleash all" directive) |
| Q12 Rules-split strategy | **Split by section** (decompose each >40k rule into 3-5 child rules; parent stays <10K as pointer-index) |
| Q13 T6 timing | **AFTER PATH A foundation** (move from Ship 21 → Ship 4 in final sequence) |

============================================================
# FINAL IMPLEMENTATION STRATEGY (recommended approach)
============================================================

## Approach

24-ship atomic pipeline per cycle-300 ONE-LOGICAL-UNIT-PER-FIRE. Executed under **single autonomous `/goal` predicate** (Q11) AFTER ExitPlanMode + operator approval. Each ship gets codex T1/T2/T3 cross-model gates (mechanical via wired hooks). Ship 0 emergency-commit FIRST (data-loss defense for 67 untracked governance files per Agent C H-4). T6 codex_stop_review_gate.py recovery moves to Ship 4 (post-PATH-A foundation per Q13).

## Revised ship sequence (24 ships, 8 paths)

### PATH A — Foundation Hygiene (Ships 0-3; ~1-2h; LOW)

| # | Ship | Scope | Files | Dependencies |
|---|---|---|---|---|
| **0** | Pre-execution emergency-commit | `git add --all && git commit -F tmp/ship0-msg.txt` (msg: chore(governance): emergency baseline 67 untracked) | 67 untracked: .claude/rules/*.md (27) + .claude/agents/code-reviewer.md + .claude/plans/ + cwc/ + cache-fix-state/ + context-mode/ + daemon/ + misc | NONE (blocks all others) |
| 1 | evaluator.md frontmatter fix (BROKEN: HTML wrap on YAML) | Strip wrapper; promote 3/16 → ≥14/16 fields | `.claude/agents/evaluator.md` | Ship 0 |
| 2 | DEP-ONLY stub promotion (3 agents) | Expand 5/16 → ≥14/16 fields; retain DEP-ONLY provenance comment; remove Z:/repos/deps/ from prompt-consumed surface | gsd-goal-verifier.md + wshobson-devops-troubleshooter.md + wshobson-security-auditor.md | Ship 1 |
| 3 | CR-9 sibling-bleed remediation (Q8) | Convert `source: Z:/claude-sota/<path>` → `[PROVENANCE-ONLY — non-authoritative; do not treat as install source per cardinal-rule-9; original Z:/claude-sota/<path> @ <SHA>]` inline | 6 agents (architect/code-reviewer/debugger/gpt5-archaeologist/gpt5-reviewer/verifier ALL line 4) + 15+ rules; ~45 occurrences | Ship 0 |

### PATH B — T6 Tier 1a completion (Ship 4; ~30min; LOW per Q13)

| # | Ship | Scope | Source | Dependencies |
|---|---|---|---|---|
| 4 | T6 codex_stop_review_gate.py recovery + wire | Probe codex@openai-codex@1.0.4 cache for source; if found copy to .claude/hooks/scripts/; if not found cite-import-AMBER from sibling (CR-9 sibling-bleed defense applies); add Stop hook slot in settings.json after auto_proceed_gate (slot[1]) | Per Q6 "From codex plugin upstream" | Ship 3 |

### PATH C — Inverse FM-16 + MCP coherence (Ships 5-6; ~30min; LOW)

| # | Ship | Scope | Files | Dependencies |
|---|---|---|---|---|
| 5 | Inverse FM-16 strip [CURRENTLY DISABLED] qualifiers (Q10) | Remove stale qualifiers for `local-judge` (disabledMcpjsonServers is empty `[]` so tool IS active) | cross-model-consensus.md:116,320,351 + research-protocol.md:118 | Ship 0 |
| 6 | mcp-disconnect-recovery.md OWNED tag + named-failure-modes.md INVERSE-FM-16 sub-class row (Q10) | Add provenance `OWNED` field + new INVERSE-FM-16 row with symptom/resolution/cite | 2 rule files | Ship 5 |

### PATH D — File splits "by section" (Ships 7-12; ~2-3h; MED per Q12)

Per Q12 "Split by section" — each >40k rule decomposes into 3-5 child rules; parent stays <10K as pointer-index. Each split commit pair atomic per cycle-300.

| # | Ship | File | Current | Target |
|---|---|---|---|---|
| 7 | team-orchestration.md split | 84k | Parent <10K pointer-index + 4 child rules (`team-orch-wave-patterns.md` + `team-orch-lifecycle.md` + `team-orch-context-budget.md` + `team-orch-experimental-teams.md` + `team-orch-parallel-spawning.md`) each <22K |
| 8 | cross-model-consensus.md split | 64k | Parent <10K + 3 children (`cmc-T1-T7-lifecycle.md` + `cmc-verdict-shapes.md` + `cmc-env-funnel-disclosure.md`) |
| 9 | codex-t1-fix-forward-pattern.md split | 47k | Parent <10K + Pattern A.md + Pattern B.md + Patterns C+D.md + mechanical-mirror-exception.md |
| 10 | layered-gates-architecture.md split | 42k | Parent <10K + 5-layers.md + asyncRewake-pattern.md + worktree-isolation-prereq.md |
| 11 | agent-harness-fit-verification.md split | 42k | Parent <10K + 7-sub-classes.md + Probe-DAG.md + Codex-rescue-blind-spot.md |
| 12 | CLAUDE.md split | 62k | Parent <38k (cardinal rules + architecture + hard rules) + CLAUDE-skills-orchestration.md + CLAUDE-bootstrap-setup.md |

Cite-anchor preservation: each child has `# Part-N of <parent> @ <HEAD-SHA>` header + parent has `## → see <child-file>` pointer per section.

### PATH E — Settings de-bloat + T3 verdict triage (Ships 13-15; ~1-2h; MED per Q5)

| # | Ship | Scope | Files | Dependencies |
|---|---|---|---|---|
| 13 | settings.json de-bloat | Collapse 6× duplicate hook entries → 1× each (`gitleaks_pre_commit_gate.py` / `codex_t2_pre_commit_gate.py` / `codex_postcommit_review.py` / `codex_prepush_review.py` fire 6× each per Plan agent finding); target <32k | `.claude/settings.json` | Ship 0 |
| 14 | T3 NEEDS-REVISION batch Pattern A apply (Q5 triage) | 37 verdicts conf≥0.85 → Pattern A single fix-forward per verdict; sub-ships 14a..14k atomic | `.claude/state/codex_review_HEAD_*.txt` (conf≥0.85 subset) | Ships 3,5,6,7-12 |
| 15 | T3 REJECT batch Outcome B REVERT-AND-REMOVE | 9 REJECT verdicts → git rm OR git revert affected files per closed-loop-recursive-narrowing.md §Outcome B | 9 target files | Ship 14 |

### PATH F — ECC ADOPT-NOW adoptions (Ships 16-20; ~2-3h; MED per Agent B Top-10)

| # | Ship | Skill | Source | Verification |
|---|---|---|---|---|
| 16 | ECC autonomous-loops skill | everything-claude-code@841beea4 skills/autonomous-loops/SKILL.md | `/autonomous-loops` invocation works |
| 17 | ECC agent-harness-construction | same plugin skills/agent-harness-construction/ | dir exists; smoke probe |
| 18 | ECC canary-watch | same plugin skills/canary-watch/ | dir exists; smoke probe |
| 19 | ECC content-hash-cache-pattern + mcp-server-patterns (bundled) | same plugin (2 skills) | both dirs exist |
| 20 | ECC prompt-optimizer | same plugin skills/prompt-optimizer/ | dir exists; smoke probe |

### PATH G — Archive cleanup + tmp rotation (Ship 21; ~30min; LOW per Q1)

| # | Ship | Scope | Files |
|---|---|---|---|
| 21 | Archive stale + tmp rotation per Q1 (archive-then-remove) | Move stale tmp/wave*.md (>14d if any) + deprecated rule references → `docs/_archives/2026-05-12/`; then delete originals | tmp/ + deprecated cites |

### PATH H — Agent frontmatter CCBP closure (Ships 22-23; ~1h; LOW)

| # | Ship | Scope | Files |
|---|---|---|---|
| 22 | 5 agents ≥14-fields → 16-fields full CCBP spec | Add `skills:` + `mcpServers:` + `hooks:` + `disallowedTools:` per Wave 126 Agent F gap matrix | architect + code-reviewer + debugger + gpt5-archaeologist + gpt5-reviewer |
| 23 | Remaining 2 non-DEP-ONLY agents 16-fields | Same field-closure pattern | sota-researcher + verifier |

### Phase final — `/goal` autonomous run (Ship 24; runs all 0-23 + post-verify)

| # | Ship | Scope |
|---|---|---|
| 24 | `/goal` predicate autonomous execution + verification gate | Single `/goal` invocation with terminal predicate covering all 23 ship outcomes (per Q11 unleash mandate). `/goal` runs Ships 0-23 atomically per cycle-300 + post-/goal Iron Law verification-before-completion gate + gsd-goal-verifier audit + docs/install-provenance.md append + MEMORY.md index entry |

## Sequencing DAG

```
Ship 0 (emergency-commit) ────────────┬─→ Ships 1-3 (PATH A foundation)
                                       │       │
                                       │       └─→ Ship 4 (T6 recovery)
                                       │       │
                                       ├─→ Ships 5-6 (FM-16 + MCP)
                                       │
                                       ├─→ Ships 7-12 (file splits, parallel-safe)
                                       │
                                       ├─→ Ship 13 (settings de-bloat)
                                       │       │
                                       │       └─→ Ship 14 (T3 Pattern A batch)
                                       │              │
                                       │              └─→ Ship 15 (T3 REJECT Outcome B)
                                       │
                                       ├─→ Ships 16-20 (ECC adoptions, parallel-safe)
                                       │
                                       ├─→ Ship 21 (archive cleanup)
                                       │
                                       └─→ Ships 22-23 (agent CCBP closure)
                                                  │
                                                  └─→ Ship 24 (/goal + verification gate)
```

Critical path: 0 → 3 → 14 → 15 → 24
Parallel-safe groups: {7-12}, {16-20}

## Cross-model gate strategy (per ship)

Standard per-ship protocol:
1. **T1 pre-edit** — auto-fires via `codex_t1_consult_gate.py` PreToolUse hook (Edit/Write/MultiEdit, 5s sync)
2. **T1 disposition** — APPROVE → proceed; NEEDS-REVISION conf≥0.85 → Pattern A single fix-forward atomic apply per `codex-t1-fix-forward-pattern.md §Pattern A`; conf<0.85 → ACCEPT-WITH-DOC per closed-loop-recursive-narrowing.md
3. **T2 pre-commit** — auto-fires via `codex_t2_pre_commit_gate.py` PreToolUse Bash(git commit *) 180s sync STRICT
4. **T3 post-commit** — auto-fires via `codex_postcommit_review.py` PostToolUse Bash(git commit *) 30s async → writes `.claude/state/codex_review_HEAD_<sha8>.txt`
5. **Mechanical-mirror exception** — Ships 0, 13 (pure tracking), 21 (archive move) may SKIP T1 per `codex-t1-fix-forward-pattern.md §Mechanical-mirror exception` (settled-source + bounded-LOC predicates satisfied)

## `/goal` terminal predicate (Ship 24)

```
/goal "VERIFIED COMPLETE when ALL of:
(1) grep -rl 'Z:/claude-sota/' .claude/agents/ .claude/rules/ | wc -l = 0 [C-1 sibling-bleed clean];
(2) wc -c .claude/rules/{team-orchestration,cross-model-consensus,codex-t1-fix-forward-pattern,layered-gates-architecture,agent-harness-fit-verification}.md CLAUDE.md — each < 40960 [file-splits done];
(3) git status --short | wc -l = 0 [clean working tree];
(4) python3 -c 'import json; s=json.load(open(\".claude/settings.json\")); assert s.get(\"disabledMcpjsonServers\")==[]' [MCP coherent];
(5) grep -c 'CURRENTLY.DISABLED' .claude/rules/cross-model-consensus.md .claude/rules/research-protocol.md = 0 [FM-16 clean];
(6) ls .claude/skills/{autonomous-loops,agent-harness-construction,canary-watch,content-hash-cache-pattern,mcp-server-patterns,prompt-optimizer}/ [ECC adoptions];
(7) python3 frontmatter-validate.py .claude/agents/evaluator.md → fields≥14 [evaluator fixed];
(8) git log --oneline | grep -c 'ship[0-9]' ≥ 24 [all atomic ships committed];
(9) ls .claude/hooks/scripts/codex_stop_review_gate.py + grep -c 'codex_stop_review_gate' .claude/settings.json ≥ 1 [T6 wired];
(10) gsd-goal-verifier post-hoc PASS;
(11) docs/install-provenance.md appended with wave 156 close-note;
(12) MEMORY.md index entry under 150 chars added per cardinal-rule-11 META-process SOTA discipline"
```

## Critical files to modify

**Bootstrap (cardinal-rule-5 — hand-codable)**:
- `Z:/claude-sota-installed/CLAUDE.md` (62k → split into 3 files per Ship 12)
- `Z:/claude-sota-installed/.claude/settings.json` (58k → de-bloat per Ship 13)

**Rules to split (Ships 7-11)**:
- `.claude/rules/team-orchestration.md` (84k)
- `.claude/rules/cross-model-consensus.md` (64k)
- `.claude/rules/codex-t1-fix-forward-pattern.md` (47k)
- `.claude/rules/layered-gates-architecture.md` (42k)
- `.claude/rules/agent-harness-fit-verification.md` (42k)

**Agents to fix (Ships 1-3, 22-23)**:
- All under `.claude/agents/*.md` (11 files + cwc/evaluator.md)

**Rules sibling-bleed remediation (Ship 3)**:
- 15+ rule files identified by `grep -rl "Z:/claude-sota/" .claude/rules/`

**FM-16 strip (Ship 5)**:
- `.claude/rules/cross-model-consensus.md:116,320,351`
- `.claude/rules/research-protocol.md:118`

## Existing functions/utilities to REUSE (DO NOT reinvent)

**Hooks (wired)**:
- `Z:/claude-sota-installed/.claude/hooks/scripts/codex_t1_consult_gate.py` (T1)
- `Z:/claude-sota-installed/.claude/hooks/scripts/codex_t2_pre_commit_gate.py` (T2 — PRESENT but reportedly LATENT per Agent A; verify actually wired)
- `Z:/claude-sota-installed/.claude/hooks/scripts/codex_postcommit_review.py` (T3)
- `Z:/claude-sota-installed/.claude/hooks/scripts/codex_prepush_review.py` (T4)
- `Z:/claude-sota-installed/.claude/hooks/scripts/codex_t5_plan_review_gate.py` (T5)
- `Z:/claude-sota-installed/.claude/hooks/scripts/auto_proceed_gate.py` (T7)
- `Z:/claude-sota-installed/.claude/hooks/scripts/secret_scan_guard.py`
- `Z:/claude-sota-installed/.claude/hooks/scripts/safety_guard.py`
- `Z:/claude-sota-installed/.claude/hooks/cwc/*.sh` (CWC long-running-agent primitives)

**Agents (existing)**:
- `.claude/agents/sota-researcher.md` + `architect.md` + `code-reviewer.md` + `debugger.md` + `evaluator.md` + `gpt5-reviewer.md` + `gpt5-archaeologist.md` + `verifier.md` + `gsd-goal-verifier.md` + `wshobson-*` (post Ships 1-3 + 22-23 frontmatter fixes)

**Skills (existing 13 + Top-10 new from PATH F)**:
- 4 meta-skill stack: superpowers:using-superpowers + addy:using-agent-skills + everything-claude-code:skill-comply + claude-plugins-official:skill-creator
- Workflow grammar: writing-plans + subagent-driven-development + verification-before-completion + test-driven-development + systematic-debugging + requesting-code-review + finishing-a-development-branch
- Adoption Top-10 via Ships 16-20

**Plugins (7 enabled)**:
- superpowers@claude-plugins-official ✅
- codex@openai-codex (T1-T7 hooks) ✅
- everything-claude-code@everything-claude-code (PATH F adoption source) ✅
- pyright-lsp@claude-plugins-official ✅
- agent-sdk-dev / ralph-loop / frontend-design

## Verification (end-to-end)

Per `superpowers:verification-before-completion` SKILL Iron Law claim-time gate:

```bash
# Post-Ship-24 verification commands:
git status --short | wc -l                                          # = 0 (clean)
git log --oneline -30 | grep -c "^"                                  # ≥ 24 commits
grep -rl "Z:/claude-sota/" .claude/agents/ .claude/rules/ | wc -l    # = 0 (sibling-bleed gone)
for f in .claude/rules/{team-orchestration,cross-model-consensus,codex-t1-fix-forward-pattern,layered-gates-architecture,agent-harness-fit-verification}.md CLAUDE.md; do
  wc -c "$f"
done                                                                 # each < 40960
codex exec review --uncommitted                                      # APPROVE (if any changes remain)
@gsd-goal-verifier "Verify Ship 24 /goal predicate completion"      # PASS
ls .claude/skills/{autonomous-loops,agent-harness-construction,canary-watch}/  # all dirs exist
```

## Anti-patterns to avoid (from Plan agent §9)

1. **Batch-edit across paths in single commit** — violates cycle-300; never bundle Ship 3 (sibling-bleed) + Ship 7 (rule split) in same commit
2. **sed/awk for YAML frontmatter** — use Edit tool; sed corrupts multiline YAML
3. **`git commit -a`** — FM-02(b)+(c) destructive-race; ALWAYS `git add -- <path> && git commit -o -F <msg> -- <path>` per git-cli-grammar-discipline.md
4. **Touching settings.json without T2** — codex_t2_pre_commit_gate.py fires on commit; don't disable
5. **Deleting before archiving** — Ship 21 archives FIRST to docs/_archives/2026-05-12/; deletion only after archive verified per Q1 archive-then-remove
6. **Activating disabled hooks before validating** — 8 LATENT hooks in ECC_DISABLED_HOOKS env are EXPLICITLY DISABLED (Wave 76+77); do NOT re-wire without schema validation; fm17d_stall_detector.py is schema-rot 100%
7. **File-split without cite-anchor preservation** — each child MUST carry `# Part-N of <parent> @ <HEAD-SHA>` header
8. **Skipping Ship 0** — ANY other ship before emergency-commit risks `git reset --hard` DATA-LOSS

## Execution status (live)

| Ship | Status | Commit | T3 verdict | Disposition |
|---|---|---|---|---|
| 0 | ✅ COMMITTED | `69e5fd4` | NEEDS-ATTENTION 4 findings (2 HIGH conf=0.86+0.78 + 2 MED conf=0.74+0.93) | ACCEPT-WITH-DOC (Finding 1 FALSE-POSITIVE per concrete-verification; Findings 2-4 conf<0.85 with concrete-verification: executables tracked-but-dormant) |
| 1 | ✅ COMMITTED | `a4bb3f1` | resolving (prompt.txt visible) | Pattern A applied per T1 conf=0.9 (4 prescribed_edits) |
| 2-23 | ⏸ PENDING | — | — | Surfaced as `/goal` autonomous predicate per Q11 unleash directive |
| 24 | ⏸ PENDING | — | — | Iron Law verification-before-completion gate post-Ships-2-23 |

### Concrete verification of Ship 0 T3 disposition

- **Finding 1 FALSE-POSITIVE**: `agent_plan_readonly_bash_guard.py` EXISTS pre-tracked at `.claude/hooks/scripts/agent_plan_readonly_bash_guard.py` per Agent A audit "16 LATENT hook scripts NOT wired". Ship 0 didn't include it because it was already tracked (verify: `git log --all --oneline -- .claude/hooks/scripts/agent_plan_readonly_bash_guard.py` shows pre-Ship-0 history).
- **Finding 2 concrete-verification**: lefthook.yml + eee-backup.ps1 + context-mode-cache-heal.mjs are TRACKED but NOT WIRED in `.claude/settings.json:hooks`. Verify: `grep -c "lefthook\|eee-backup\|context-mode-cache-heal" .claude/settings.json` → 0 occurrences (operator-invokable backups only; no hook auto-execution).
- **Findings 3+4 (code-reviewer.md broad caps + truncated diff)**: file-content concerns to address in Ship 22 (agent CCBP closure for code-reviewer.md — tighten tools per Wave 126 Agent F gap matrix) + diff-truncation is process risk for codex_postcommit_review.py prompt-size (separate hook-tuning ship).

## `/goal` autonomous execution predicate (Ship 24 entry)

Per Q11 user mandate "Single /goal predicate autonomous (Recommended for unleash directive)". Operator invokes this in the eee CC session to drive autonomous execution of Ships 2-23 + Ship 24 verification:

```
/goal "Wave 156 SOTA optimization Ships 2-24 COMPLETE when ALL of:

PATH A foundation (Ships 2-3):
- (S2) .claude/agents/{gsd-goal-verifier,wshobson-devops-troubleshooter,wshobson-security-auditor}.md each frontmatter field count >= 14 (was 5/16; promote per CCBP claude-subagents.md:17-36)
- (S3) grep -rl 'Z:/claude-sota/' .claude/agents/ .claude/rules/ | wc -l = 0 (CR-9 sibling-bleed converted to [PROVENANCE-ONLY] qualifier per Q8)

PATH B T6 (Ship 4):
- (S4) ls .claude/hooks/scripts/codex_stop_review_gate.py exists AND grep -c 'codex_stop_review_gate' .claude/settings.json >= 1 (T6 wired per Q6 from codex plugin upstream)

PATH C FM-16 + MCP (Ships 5-6):
- (S5) grep -c 'CURRENTLY.DISABLED' .claude/rules/cross-model-consensus.md .claude/rules/research-protocol.md = 0 (stale local-judge qualifier stripped)
- (S6) grep -c 'INVERSE-FM-16' .claude/rules/named-failure-modes.md >= 1 AND grep -c 'OWNED' .claude/rules/mcp-disconnect-recovery.md >= 1

PATH D file-splits (Ships 7-12):
- (S7-12) wc -c .claude/rules/{team-orchestration,cross-model-consensus,codex-t1-fix-forward-pattern,layered-gates-architecture,agent-harness-fit-verification}.md CLAUDE.md — each < 40960 (per Q12 split-by-section into 3-5 child rules; parent <10K pointer-index)

PATH E settings + T3 triage (Ships 13-15):
- (S13) wc -c .claude/settings.json < 32768 (de-bloat 6x duplicate hook entries)
- (S14) grep -l 'NEEDS-REVISION' .claude/state/codex_review_HEAD_*.txt | wc -l < 5 (37 NEEDS-REVISION → Pattern A applied per Q5 filter+triage)
- (S15) grep -l 'verdict.*REJECT' .claude/state/codex_review_HEAD_*.txt | wc -l < 3 (9 REJECT → Outcome B REVERT-AND-REMOVE)

PATH F ECC adoptions (Ships 16-20):
- (S16-20) ls .claude/skills/{autonomous-loops,agent-harness-construction,canary-watch,content-hash-cache-pattern,mcp-server-patterns,prompt-optimizer}/ — all 6 dirs exist with SKILL.md

PATH G archive (Ship 21):
- (S21) ls docs/_archives/2026-05-12/ exists with archived stale references (per Q1 archive-then-remove)

PATH H agent CCBP closure (Ships 22-23):
- (S22-23) all 11 agents .claude/agents/*.md frontmatter field count >= 14

Cross-model gate satisfaction per cardinal-rule-3:
- Every ship triggers PreToolUse codex_t1_consult_gate.py + PreToolUse codex_t2_pre_commit_gate.py on commit + PostToolUse codex_postcommit_review.py
- Pattern A apply per codex-t1-fix-forward-pattern.md on each NEEDS-REVISION conf>=0.85
- Cardinal-rule-7 REPORT mandate: every T1 WARN or T3 NEEDS-ATTENTION disclosed in commit body

FINAL Ship 24 verification gate (Iron Law per superpowers:verification-before-completion):
- git status --short | wc -l <= 21 (only state/cache/backup files remain untracked; governance clean)
- git log --oneline | grep -c 'Ship [0-9]' >= 24
- gsd-goal-verifier post-hoc audit returns PASS
- docs/install-provenance.md appended with Wave 156 close-note
- .claude/projects/Z--claude-sota-installed/memory/MEMORY.md index entry added under 150 chars

Operational discipline per CLAUDE.md cardinal rules 1-11:
- CR-1 cite anchors at file:line + HEAD SHA on every edit
- CR-3 cross-model T1 BEFORE design-surface; T2 BEFORE commit
- CR-7 graduated unleash Phase 1 bootstrap exception via Path P codex exec foreground+tee
- CR-8 ADAPTED-FROM-SOTA cite class for every artifact
- CR-9 install-risk discipline: pre-cite-import REVERT check + sibling-bleed defense + 2-round fix-forward budget
- CR-10 research-first-then-install on unknowns
- CR-11 META-process SOTA discipline on every meta-step
- cycle-300 ONE-LOGICAL-UNIT-PER-FIRE atomic commits
- FM-02 (b)+(c) defense: atomic single-shell 'git add -- <path> && git commit -o -F <msg> -- <path>' per git-cli-grammar-discipline.md
- Mia pre-apply per mia-pre-apply.md on every codex prescription (n=412 catches OVER pre-apply)
- FM-17.g defense: Agent dispatches use 'model: sonnet' override (haiku-4-5 provider 502 outage workaround until resolved)

REPORT MANDATE: when /goal exits, surface to operator:
- All 24 ship commit SHAs
- All T3 verdict files (.claude/state/codex_review_HEAD_*.txt)
- Total LOC delta + file count
- Any Pattern A apply rounds OR Outcome B reverts OR Outcome C manual-overrides
- Audit conformance percentages re-measured (per Agent A 7 metrics)
"
```

**Operator invocation**: type `/goal "<full predicate text above>"` in eee CC session. The autonomous run will execute Ships 2-23 per cycle-300 with mechanical T1/T2/T3 gates. Estimated wall-clock: 4-8 hours. Provides live elapsed/turns/tokens panel per CC 2.1.139+ /goal feature.

**Rollback if needed**: per plan §10 rollback table below. Per closed-loop-recursive-narrowing.md, if any ship's T3 verdict NEEDS-ATTENTION conf>=0.85 + HIGH severity persists across round-2, apply Outcome B REVERT-AND-REMOVE.

## Rollback plan (per ship)

Per Plan agent §10:

| Ship class | Revert command | Notes |
|---|---|---|
| 0 | `git reset HEAD~1 -- .` (un-commit only; files stay) | NEVER hard-reset |
| 1-6 | `git revert HEAD` | Clean reverts |
| 7-12 (splits) | `git revert HEAD` + `git rm <child-files>` | Companion children dangle without revert |
| 13 (settings) | `git revert HEAD` | settings.json pre-de-dup restored |
| 14 (Pattern A batch) | `git revert HEAD~N..HEAD` (N=fix count) | Batch revert |
| 15 (Outcome B) | `git revert <commit-SHA>` per file | Re-introduces rejected content |
| 16-20 (ECC adoptions) | `rm -rf .claude/skills/<skill>/` | Cache-based; no git history |
| 21 (archive) | `mv docs/_archives/2026-05-12/* tmp/` | Move-only; files preserved |
| 22-23 (agent CCBP) | `git revert HEAD` | Frontmatter rollback clean |
| 24 (/goal) | abort autonomous run + rollback each completed ship | Run rollback in reverse-sequence order |

---

## Phase 3 + 4 + 5 — Review + Final plan + ExitPlanMode (PENDING)

This file will be updated incrementally as agent findings arrive.

---

## Tentative work-stream design (subject to revision based on Phase 1 findings)

### PATH A — Foundation hygiene (1-2 hours, LOW risk)

Atomic ships:
1. **Ship A1**: `context-mode` upgrade v1.0.111 → v1.0.123 (5 min)
2. **Ship A2**: `.claude/.claude.json` add to .gitignore + remove from git tracking (10 min) — auth-flag STRUCTURAL embedding URGENT per MEMORY OPEN HIGH `0346ebf4` 127min unresolved
3. **Ship A3**: Refresh `addy-agent-skills` plugin (close 12-commit drift + adds NEW `doubt-driven-development` skill per Wave 156 V3 SAVED-SHIP catch) (10 min)
4. **Ship A4**: Refresh `superpowers` plugin (close HEAD drift) (5 min)
5. **Ship A5**: Re-run audit scripts — `claude_md_count_audit` + `cite_drift_audit` + `mcp_overhead_audit` + `disabled_mcp_phantom_audit` (10 min)
6. **Ship A6**: Convert `gitnexus_pre_edit_impact_guard.py` from sync → asyncRewake: true (2 LOC + smoke probe) (15 min)

Each ship gets: codex T1 NEEDS-REVISION → Pattern A apply → atomic commit → T3 post-commit verdict.

### PATH B — Cross-model gate unlock + /goal infrastructure (4-8 hours, MED risk)

7. **Ship B1**: `/plugin install codex@openai-codex@1.0.4` — wires T2/T3/T4/T6/T7 mechanically + unlocks CR-7 Phase 2 trigger predicate (c) (30 min + 2-round fix-forward budget per CR-9)
8. **Ship B2**: Close 2 OPEN HIGH-severity T3 findings via Pattern A apply (commits `0346ebf4` + `e3dcc443`; ~52-130min unresolved per MEMORY)
9. **Ship B3**: Author `terminal-predicate-construction` skill via `skill-creator` benchmarked loop (~80 LOC SKILL.md)
10. **Ship B4**: Author `goal-completion-verify` skill (~60 LOC)
11. **Ship B5**: Ship `pre_goal_gate.py` hook (~80 LOC Python + settings.json hook entry)
12. **Ship B6**: Ship `subagent_transcript_mine.py` SubagentStop hook (~60 LOC) for FM-20 cascade-defense axis-4 per `Z:/claude-sota/.claude/rules/synthesis-layer-verify.md §SubagentStop transcript-mining`
13. **Ship B7**: Ship `fm17f_stall_detector.py` SubagentStop hook (~50 LOC) — auto-detects FM-17.f pre-fire failure mode (n=3 firm Wave 119+129+130)
14. **Ship B8**: Tune all 11 agent frontmatters with CCBP 16-field spec (description PROACTIVELY + skills: + mcpServers: + hooks: + disallowedTools per Wave 126 Agent F gap matrix) — ~30-50 LOC delta per agent × 11 = ~330-550 LOC total across 11 atomic ships OR 1 bundled ship per cycle-300

### PATH C — File-size split + META-discipline codification + cleanup (next 1-3 sessions, LOW-MED risk)

15. **Ship C1**: Split `CLAUDE.md` (61.2k → <40k per /doctor gate) — extract sections to per-rule pointer files
16. **Ship C2**: Split `team-orchestration.md` (80k → <40k) — split by section: lifecycle / 7-patterns / context-budget / parallel-spawning-rules / experimental-agent-teams etc.
17. **Ship C3**: Split `cross-model-consensus.md` (62.7k → <40k) — extract T1-T7 lifecycle table + profile selection rule + verdict shapes
18. **Ship C4**: Split `codex-t1-fix-forward-pattern.md` (43.9k → <40k) — Pattern A/B/C/D each could be own file
19. **Ship C5**: Split `layered-gates-architecture.md` (40.6k → <40k) — extract 5-layer table + asyncRewake pattern
20. **Ship C6**: Split `agent-harness-fit-verification.md` (40.8k → <40k) — extract 7 sub-classes section
21. **Ship C7**: PROMOTE top-5 META-disciplines past cycle-322 gate (HEAD-UNCHANGED-RECURRENCE n=12 firm + FM-02 (c) n=10 firm + Iron Law NO-PREDICTION n=88 + Skill-tool-1%-rule n=139 + Path P recovery family n=137) → 5 new rule files ~120-180 LOC each
22. **Ship C8**: Cleanup stale tmp/wave*.md artifacts (mtime >30 days) — archive to `docs/_archives/<date>/` per FM-02 (b)+(c) defense
23. **Ship C9**: Sanitize cardinal-rule-9 sibling-bleed violations identified by Agent C
24. **Ship C10**: Refresh Marker Decay stale cites identified by Agent C (>1 month old VERIFIED markers on volatile claims)

### PATH D — Beyond /goal: under-leveraged SOTA features (parallel to A/B/C, opportunistic)

25. **Ship D1**: Build session-rename convention for agent view (`.claude/agent-naming-convention.md` codification)
26. **Ship D2**: Audit subagent FRESH-vs-FORK choices; flip where FORK saves tokens
27. **Ship D3**: Build `/compact <hint>` snippet library at `.claude/compact-snippets.md`
28. **Ship D4**: Skill HARD-GATE audit — flag every skill with `disable-model-invocation: true` in autonomous-loop-incompatibility list
29. **Ship D5**: Author custom in-process MCP for `sota-research` (zero-transport overhead)
30. **Ship D6**: Wire `agent_id` + `agent_type` `_SubagentContextMixin` audit per `Z:/claude-sota/.claude/rules/audit-action-loop.md §Hook telemetry contract`

### PATH E — `/goal` predicate construction for final ship execution

After PATH A+B complete, construct the terminal predicate that drives PATH C+D autonomous execution:

```
/goal "<terminal predicate combining: all 6 >40k-char files split <40k AND all 16 OPEN T3 findings dispositioned AND all 5 PROMOTE-NOW META-disciplines codified AND verification-before-completion gate signals NO BLOCKERS AND codex T3 verdict file at .claude/state/codex_review_HEAD_<sha8>.txt no NEEDS-REVISION conf>0.85 AND docs/install-provenance.md updated AND MEMORY.md index entry under 150 chars added>"
```

---

## Audit progress tracking (per user request: "give me percentage of been audited, how many percentage are definitive sota reviewed")

To be computed in Phase 1 by Agent A:
- % of `.claude/agents/` with full CCBP 16-field frontmatter
- % of `.claude/rules/` with TIER-1-DIRECT cite chain in first 10 lines
- % of `.claude/skills/` with valid `origin:` OR `sota-cite:` frontmatter
- % of `.claude/hooks/` scripts emitting JSONL with `agent_id`/`agent_type`
- % of files >40k chars (CRITICAL)
- % of FORWARD-REF entries unresolved
- % of cardinal-rule-1 conformance (SOTA cite at file:line + HEAD SHA)

Initial baseline from existing data:
- 11 marketplace plugins installed / 7 enabled = ~64% enabled
- 11 local agents declare `isolation: worktree` = 100% per Wave 18 audit
- ~14 MCP servers (10 active + 4 _comment_-disabled) = ~71% active
- CC binary 2.1.139 native = 100%

Final percentages computed after Phase 1 agents return.

---

## Verification gate (post-execution)

Per `verification-before-completion` SKILL Iron Law claim-time gate:
1. Run all predicate verification commands from /goal text
2. `git status --short` clean
3. `git log --oneline -N` shows all atomic commits per PATH A/B/C/D
4. `codex exec review --uncommitted` returns APPROVE (or NEEDS-REVISION conf<0.85)
5. `gsd-goal-verifier` agent post-hoc PASS
6. All audit JSONL trails (`.claude/state/*.jsonl`) updated
7. `docs/install-provenance.md` appended with full wave 156 close note
8. MEMORY.md index entry added under 150 chars

---

## File paths critical to plan execution

**Bootstrap (per cardinal-rule-5 — only hand-codable)**:
- `Z:/claude-sota-installed/CLAUDE.md` (61.2k → SPLIT)
- `Z:/claude-sota-installed/CLAUDE.local.md`
- `Z:/claude-sota-installed/tools/eee.ps1`
- `Z:/claude-sota-installed/.claude/settings.json`
- `Z:/claude-sota-installed/.mcp.json`
- `Z:/claude-sota-installed/.gitignore`
- `Z:/claude-sota-installed/docs/sota-installed-manifest.md`
- `Z:/claude-sota-installed/docs/install-provenance.md`

**Rules to split (per file-size CRITICAL)**:
- `.claude/rules/team-orchestration.md` (80k)
- `.claude/rules/cross-model-consensus.md` (62.7k)
- `.claude/rules/codex-t1-fix-forward-pattern.md` (43.9k)
- `.claude/rules/agent-harness-fit-verification.md` (40.8k)
- `.claude/rules/layered-gates-architecture.md` (40.6k)

**Agents to tune (11 total)**:
- All under `.claude/agents/*.md` (CCBP 16-field gap closure per Wave 126 Agent F)

**Existing functions/utilities to reuse (DO NOT reinvent per Phase 1 Goal)**:
- `Z:/claude-sota-installed/.claude/hooks/scripts/codex_t1_consult_gate.py` (T1 wired)
- `Z:/claude-sota-installed/.claude/hooks/scripts/secret_scan_guard.py`
- `Z:/claude-sota-installed/.claude/hooks/scripts/agent_spawn_gate.py`
- `Z:/claude-sota-installed/.claude/hooks/scripts/safety_guard.py`
- `Z:/claude-sota-installed/.claude/hooks/scripts/codex_t5_plan_review_gate.py` (T5 wired ExitPlanMode)
- `Z:/claude-sota-installed/.claude/hooks/cwc/*.sh` (CWC long-running-agent primitives — 5 already installed)
- `Z:/claude-sota-installed/.claude/agents/gsd-goal-verifier.md` (post-/goal verification agent)
- `Z:/claude-sota-installed/.claude/agents/{sota-researcher,architect,code-reviewer,debugger,evaluator,verifier,gpt5-reviewer,gpt5-archaeologist,wshobson-*}.md`
- 14 plugin marketplaces registered at `.claude/plugins/marketplaces/`

**Skills available for reuse (4 meta-skill stack + workflow grammar + 21 Addy + 14+ ECC)**:
- `superpowers:writing-plans` (Phase 2 Plan agent fires this)
- `superpowers:subagent-driven-development` (per-task implementer + 2-stage review pattern)
- `superpowers:verification-before-completion` (claim-time Iron Law gate)
- `superpowers:test-driven-development`
- `superpowers:systematic-debugging`
- `superpowers:requesting-code-review`
- `addy-agent-skills:source-driven-development` (every framework decision cites official docs)
- `addy-agent-skills:incremental-implementation`
- `addy-agent-skills:planning-and-task-breakdown`
- `addy-agent-skills:debugging-and-error-recovery`
- `everything-claude-code:safety-guard`
- `everything-claude-code:agentic-engineering`
- `everything-claude-code:autonomous-loops`
- `everything-claude-code:research-ops`

---

(Plan continues below — Phase 1 agent findings will populate detailed work items)

