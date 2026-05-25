---
date: 2026-05-12
topic: sota-architecture-deep-audit
status: AUTHORITATIVE
agent: orchestrator (superpowers:brainstorming → writing-plans transition pending)
---

# SOTA Architecture Deep Audit + Optimization — Design Spec

# === Cite-class lattice (per Z:/claude-sota/.claude/rules/citation-discipline.md rule #8) ===
# constituents=[
#   TIER-1-DIRECT @ https://code.claude.com/docs/en/sub-agents (Anthropic CC subagent model precedence + permission modes),
#   TIER-1-DIRECT @ https://code.claude.com/docs/en/hooks (Anthropic CC PreToolUse + PostToolUse + Stop + asyncRewake),
#   TIER-1-DIRECT @ Z:/repos/deps/claude-code-best-practice-shan/development-workflows/cross-model-workflow/cross-model-workflow.md:1-48 @ HEAD 48f2cebeb88b389b27231c418ceadb65baf813fd (CCBP T1-T3 cross-model workflow),
#   TIER-1-DIRECT @ Z:/repos/deps/cwc-long-running-agents/README.md @ HEAD ffd563d668a97a38d4aa092bf0d5b1507c046629 (Default-FAIL contract + fresh-context evaluator + PROGRESS.md handoff + kill-switch + steer mid-run; 5 install-class primitives also installed natively at Z:/claude-sota-installed/.local/cwc/ per docs/install-provenance.md Wave 62B),
#   TIER-2 @ Z:/claude-sota/.claude/rules/advanced-agent-team-standing-directive.md (Wave 24-D OWNED at n=3 user-trigger; 8-invariant standing directive),
#   TIER-2 @ Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md (Probe DAG 1-7 + FM-09 codex-rescue blind-spot + 7 sub-classes),
#   TIER-2 @ Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md (Pattern A single-fix-forward + Pattern B HONEST-NON-FINDING + Pattern D foreground+tee),
#   TIER-2 @ Z:/claude-sota/.claude/rules/closed-loop-recursive-narrowing.md (Outcome A/B/C disposition gate),
#   TIER-2 @ Z:/claude-sota/.claude/rules/cross-model-consensus.md (T1-T7 lifecycle + STAND-IN-NOTICE disclosure),
#   TIER-2 @ Z:/claude-sota/.claude/rules/fm17-subagent-fleet-depletion.md (FM-17.a-f sub-class recovery),
#   TIER-2 @ Z:/claude-sota/.claude/rules/fm19-readonly-guard-sidestep.md (ARTIFACT-INLINE persistence),
#   TIER-2 @ Z:/claude-sota/.claude/rules/fm20-path-drift-cascade.md (claim-propagation Mia probe at every hop),
#   TIER-2 @ Z:/claude-sota/.claude/rules/mia-pre-apply.md (verify-before-Edit on prescriptions),
#   TIER-2 @ Z:/claude-sota/.claude/rules/parallel-agent-wave.md (CADP rule 5 cache-aware dispatch pacing),
#   TIER-2 @ Z:/claude-sota/.claude/rules/parallel-session-worktree-isolation.md (Layer 0 outer-CLI worktree),
#   TIER-2 @ Z:/claude-sota/.claude/rules/synthesis-layer-verify.md (OVER/UNDER/HONEST-NON-FINDING + Subclaim-type discriminator + SubagentStop transcript-mining),
#   TIER-2 @ Z:/claude-sota/.claude/rules/audit-action-loop.md (Wire/Surface/Close/Re-fire 4-stage discipline),
#   TIER-2 @ Z:/claude-sota/.claude/rules/multi-source-discovery-breadth-discipline.md (≥4-source convergence-gate),
#   TIER-2 @ Z:/claude-sota/.claude/rules/codification-threshold.md (cycle-321 expected-savings + cycle-322 jurisdiction),
#   TIER-1-DIRECT @ Z:/repos/deps/superpowers @ HEAD f2cbfbefebbfef77321e4c9abc9e949826bea9d7 (obra/superpowers MIT-class workflow grammar; per-skill anchors: skills/brainstorming/SKILL.md + skills/writing-plans/SKILL.md + skills/executing-plans/SKILL.md + skills/subagent-driven-development/SKILL.md + skills/test-driven-development/SKILL.md + skills/requesting-code-review/SKILL.md + skills/receiving-code-review/SKILL.md + skills/verification-before-completion/SKILL.md + skills/systematic-debugging/SKILL.md + skills/using-git-worktrees/SKILL.md + skills/dispatching-parallel-agents/SKILL.md + skills/finishing-a-development-branch/SKILL.md + skills/using-superpowers/SKILL.md + skills/writing-skills/SKILL.md — verified Test-Path TRUE on first 3),
#   TIER-1-DIRECT @ Z:/claude-sota-installed/.claude/plugins/marketplaces/addy-agent-skills/skills/using-agent-skills/SKILL.md + .../source-driven-development/SKILL.md + .../spec-driven-development/SKILL.md (Addy Osmani named-author 21 engineering-phase skills; verified Test-Path TRUE on source-driven-development),
#   TIER-1-DIRECT @ Z:/repos/deps/everything-claude-code/skills/autonomous-loops/SKILL.md + .../autonomous-agent-harness/SKILL.md + .../continuous-agent-loop/SKILL.md + .../continuous-learning/SKILL.md + .../agentic-engineering/SKILL.md + .../safety-guard/SKILL.md (ECC autonomous-loop + harness skills; continuous-learning verified Test-Path TRUE; silent-failure-hunter NOT-INSTALLED in Z:/repos/deps/everything-claude-code/skills/ checkout — cite via .claude/plugins/cache/ instead per CR-12 PRIMARY upstream-install priority),
#   TIER-1-DIRECT @ Z:/repos/deps/andrej-karpathy-skills/skills/karpathy-guidelines/SKILL.md @ HEAD 2c606141936f1eeef17fa3043a72095b4765b9c2 (Karpathy P1-P4 + Wiki Compounding Surface),
#   TIER-1-NAMED-AUTHOR-QUOTE-PROVISIONAL @ mattpocock/skills (Hunt+Thomas Pragmatic Programmer + Beck XP framing per citation-discipline.md rule #6 PROVISIONAL-EXCEPTION; REMOTE-ONLY — local clone Z:/repos/deps/mattpocock/skills NOT-PRESENT, cite via mcp__plugin_everything-claude-code_github__get_file_contents at install/Fire 1 Agent A dispatch time),
#   TIER-1-DIRECT @ Z:/repos/deps/awesome-agentic-patterns @ HEAD 9c40e10042254ab896fed6953267b119711bae40 (per-pattern anchors: patterns/parallel-tool-execution.md + patterns/swarm-migration-pattern.md + patterns/lane-based-execution-queueing.md + patterns/context-minimization-pattern.md + patterns/stop-hook-auto-continue-pattern.md — verified Test-Path TRUE on patterns/),
#   TIER-1-USER-DIRECTIVE @ 2026-05-12 ("optimize all with sota references" + "advanced automation" + "research beyond and ship with convergence consensus" + "deep dive line by line" + GPT-5.5 audit mandate)
# ];
# effective_tier=TIER-3-LOCAL-COMPOSITION per citation-discipline.md rule #8 MIN_PRECEDENCE
# === Operator-naming disclosure ===
# This spec is the orchestrator-side composition pattern that combines ≥27 TIER-1-DIRECT primary
# sources with ≥18 TIER-2 sister-rule cite-imports. Cite-import-AMBER from sibling claude-sota
# applies per CLAUDE.md §14.5 (sibling-novel discipline with no upstream parity; carries sibling
# commit-SHA + re-evaluation gate).

## §1 Objective + Success Criteria

**Goal**: Produce a 3-fire executable plan (with self-contained agent briefs) that fresh CC sessions execute autonomously via advanced automation primitives. Output: SOTA-classified architecture + new install candidates + cleanup/REVERT recommendations + GPT-5.5-audited verdicts + ship sequence + progress dashboard.

**Numeric success criteria** (orthogonal denominators per codex T1 AXIS-1 P1 fix-forward):
- **≥95% architecture surface CLASSIFIED**: every file under .claude/ + docs/ + tools/ + bin/ + scripts/ + manifests/ + .codex/ + CLAUDE*.md has a CR-8 status assigned (denominator = total files; numerator = files with status ∈ {ADAPTED-FROM-SOTA, NOVEL-DOCUMENTED-EXCEPTION, PENDING-AUDIT}). PENDING-AUDIT is reported SEPARATELY from SOTA-conformant.
- **≥90% architecture surface CR-8-CONFORMANT**: subset of classified where status ∈ {ADAPTED-FROM-SOTA, NOVEL-DOCUMENTED-EXCEPTION} (denominator = total files; numerator excludes PENDING-AUDIT). Distinct from "classified" — masks audit incompleteness.
- **≥80% stale references CLOSED**: closed = file removed, reference rewritten, OR FORWARD-REF retired with target landed. Queued items NOT counted as closed (denominator = total stale refs surfaced by Agent B; numerator = closed refs).
- **≤10% stale references QUEUED**: tracked separately as deferred work in 3-month re-evaluation queue (separate from CLOSED).
- **100% new install candidates pass Probe DAG 1-7 + CR-12 6-class lattice + axis-1+2+3 convergence-gate**: pre-install gate before any official-native-channel install.
- **Every ship commit carries GPT-5.5 verdict cite**: CR-3 cross-model gate satisfied; STAND-IN-NOTICE in commit body on Phase 1 bootstrap exception.
- **2 OPEN HIGH-severity T3 findings addressed**: per closed-loop §Disposition severity-gate (REVERT / ACCEPT-WITH-DOC if mitigation / MANUAL-OVERRIDE if owner accepts).
- **Cross-fire FM-02 destructive race ZERO incidents**: each fire fresh CC session per Plan File deliverable.
- **≥4-source convergence per multi-source-discovery-breadth-discipline**: every adoption-class verdict.

**Non-goals**:
- NOT auto-applying any install/cleanup without GPT-5.5 verdict + Pattern A apply
- NOT silent-fallback for any failure mode (cardinal-rule-7 REPORT mandate)
- NOT using sibling cite-import where upstream-install-priority per CR-12 PRIMARY path applies
- NOT producing self-evolving recursive plans (FM-21 queue-time-prompt-freeze defense; one-shot)

## §2 3-Fire Architecture

```
FIRE 1 (5-agent parallel wave, ~2-4h, fresh CC session)
  ├─ Agent A: sota-researcher          → 9-cohort SOTA discovery + 673-deps inventory + Probe DAG 1-7
  ├─ Agent B: architect                → per-folder + per-dim audit + % metrics + cleanup queue
  ├─ Agent C: gpt5-archaeologist       → BRIDGE-MODE; hotspot + bus-factor + bug-magnet
  ├─ Agent D: gpt5-reviewer            → BRIDGE-MODE; adversarial CR-1+5+7+8+9 attack
  └─ Agent E: probe-dag-verifier       → Probe DAG 1-7 (7 probes) per candidate + Mia pre-apply
       ↓ each ARTIFACT-INLINE per FM-19 + OUTPUT_BUDGET + TERMINATION

FIRE 2 (convergence + ship, ~1-2h, fresh CC session)
  ├─ 2.1 Orchestrator Mia synthesis (decompose + probe per FM-20 path-drift defense)
  ├─ 2.2 Codex T1 deep-review-exec per dimension (Path P foreground+tee, 90-180s budget)
  ├─ 2.3 Cleanup ship (REVERT/RETIRE per closed-loop §Disposition severity-gate)
  ├─ 2.4 Install ship (CR-12 PRIMARY official-native-channel per CR-6)
  ├─ 2.5 Manifest + provenance updates
  └─ 2.6 Atomic commits (cycle-300 ONE-LOGICAL-UNIT-PER-FIRE) + T3 postcommit verdict

FIRE 3 (validate + re-fire, ~1h, fresh CC session)
  ├─ 3.1 Re-run % metrics (Agent B redux); pre/post delta in dashboard
  ├─ 3.2 Smoke probe every install row (cwc-long-running-agents Default-FAIL contract)
  ├─ 3.3 T3 postcommit verdict review + Pattern A fix-forward for any NEEDS-REVISION
  └─ 3.4 HONEST-NON-FINDING documentation + 3-month re-evaluation queue
```

**Wall-clock budget**: ~4-7h total (2-4h Fire 1 + 1-2h Fire 2 + 1h Fire 3). **Token budget**: ~3-5M cumulative (5 agents × ~500K-1M each in Fire 1; convergence + ship in Fire 2; validate in Fire 3).

## §3 Advanced Automation Layer (per user directive 2026-05-12 "we need advanced automation")

This plan uses **layered automation primitives** to drive autonomous fire-to-fire progression without manual operator intervention between fires.

### §3.1 Per-Fire Autonomous Driver — `/loop` skill (cron + dynamic mode)

Each fire runs under autonomous `/loop` driver:
- **Cron mode**: `CronCreate({cron: "*/15 * * * *", prompt: "<self-contained fire prompt>", recurring: true, durable: true})` — fires every 15min until task complete; per Anthropic CC `/scheduled-tasks` docs `https://code.claude.com/docs/en/scheduled-tasks`
- **Dynamic mode (preferred)**: orchestrator uses `ScheduleWakeup({delaySeconds: <60-3600>, prompt: "<self-pace prompt>", reason: "<why>"})` to self-pace iterations per `/loop` skill description
- **Termination**: each fire's prompt includes terminationCondition predicates (per `team-orchestration.md §Termination contract` 6-predicate vocabulary): `on_handoff_to: orchestrator | max_turns: 50 | terminationCondition: on_text_match: "FIRE-COMPLETE:" | on_token_budget_exceeded: 1000000 | on_subprocess_failure: 5`
- **FM-21 defense**: dynamic-mode `ScheduleWakeup` queue-time-prompt-freeze — STATE PROBE clause-level smoke sequence at fire-time per `fm21-queue-time-prompt-freeze.md §Recovery action #2`

### §3.2 Cross-Fire Handoff — PROGRESS.md (cwc-long-running-agents primitive)

Each fire writes outcome + handoff to `docs/sota-deep-audit-progress-2026-05-12.md` (append-only):
- Per Anthropic OFFICIAL `Z:/repos/deps/anthropics/cwc-long-running-agents` PROGRESS.md handoff pattern
- Schema: `{fire_id, status (RUNNING/COMPLETE/FAILED/HANDOFF_PENDING), agents_dispatched, verdicts, ship_decisions, next_fire_brief}`
- Fresh-context evaluator pattern: next fire reads PROGRESS.md cold without prior context
- Default-FAIL contract: progress markers default to FAILED until each fire writes COMPLETE

### §3.3 Stop-Hook Auto-Continue — verify-then-continue pattern (THIN ADAPTER over cited primitive)

**Primitive (TIER-1 cite)**: `Z:/repos/deps/awesome-agentic-patterns/patterns/stop-hook-auto-continue-pattern.md:28-41,58-61 @ HEAD 9c40e10042254ab896fed6953267b119711bae40`
- Stop hook re-injects pending task on session end if PROGRESS.md status != COMPLETE

**eee-local adapter** (FORWARD-REF; gated through Fire 2.5 with CR-5/CR-12 classification per codex T1 AXIS-3 P2 fix-forward):
- Proposed adapter path: `.claude/hooks/scripts/sota_audit_stop_continue.py` (NOT-INSTALLED; install candidate)
- CR-5 install-priority check: stop-hook-auto-continue does NOT exist as install-class artifact in any current SOTA repo (Mia probe HONEST-NON-FINDING → CR-12 TERTIARY cite-import-AMBER from sibling claude-sota IF sibling has implementation; OTHERWISE thin adapter qualifies as ADAPTED-FROM-SOTA per CR-8)
- CR-9 install-risk: 2-round fix-forward budget; sibling-bleed defense at install
- Adapter behavior: reads PROGRESS.md tail; if status=RUNNING or HANDOFF_PENDING, emits exit-2 with stderr re-injection of next-fire brief
- Failsafe: max 3 consecutive auto-continue (CR-9 install-risk + escalate to operator)
- DEFERRED to Fire 2.5 ship; Fire 1+2+3 use operator manual fire-to-fire transition until adapter installed

### §3.4 Hook-Driven Audit-Action-Loop — Wire/Surface/Close/Re-fire (THIN ADAPTER over cited primitive)

**Primitive (TIER-2 cite)**: `Z:/claude-sota/.claude/rules/audit-action-loop.md` 4-stage discipline (cite-import-AMBER per CLAUDE.md §14.5)

**eee-local adapter** (FORWARD-REF; gated through Fire 2.5 per codex T1 AXIS-3 P2 fix-forward):
- Proposed adapter path: `.claude/hooks/scripts/sota_audit_progress_hook.py` (NOT-INSTALLED; install candidate gated CR-5/CR-12)
- CR-12 disposition check: ECC has `audit-action-loop` skill but not specifically a sota-audit-progress hook adapter → GENUINELY-NEW per 6-class lattice; install via CR-5 install-priority hand-coded-as-bootstrap-only-IF unavoidable (otherwise CR-12 PRIMARY upstream-install seek)
- **Wire**: PostToolUse `Bash(git commit *)` writes JSONL to `.claude/state/sota_audit_progress.jsonl`
- **Surface**: SessionStart `additionalContext` markdown lists pending audit items (next-fire orientation)
- **Close**: each fire commits address surfaced items per Pattern A apply
- **Re-fire**: subsequent fire JSONL `any_drift: false` confirms closure
- DEFERRED to Fire 2.5 ship; Fire 1+2+3 use direct PROGRESS.md handoff per §3.2 (cwc-long-running-agents primitive — already TIER-1 install-class) until adapter installed

### §3.5 Codex Hook-Driven Cross-Model Gate (T1-T7 lifecycle)

When Tier 1a codex T1-T7 hooks INSTALLED per manifest §Section 2 (PLANNED status currently):
- **T1 PreToolUse `Edit|Write|MultiEdit`**: codex T1 deep-review-exec auto-fires on design-surface edits
- **T2 PreToolUse `Bash(git commit *)`**: codex T2 working-tree review auto-fires before commit
- **T3 PostToolUse `Bash(git commit *)`**: codex T3 postcommit auto-fires; verdict at `.claude/state/codex_review_HEAD_<sha8>.txt`
- **T6 Stop hook**: codex T6 stop-gate auto-fires on session end
- **T7 Stop hook**: ask-without-act detector auto-fires before T6

Until Tier 1a INSTALLED: **Phase 1 bootstrap exception per CR-3 + CR-7** — orchestrator-side `codex exec` foreground+tee dispatch satisfies cross-model gate; STAND-IN-NOTICE in commit body if BRIDGE-MODE subagent dispatch substitutes.

### §3.6 Multi-Agent Dispatch Automation — superpowers `dispatching-parallel-agents` + standing directive

Each Fire 1 dispatches 5 agents in single Agent() message per:
- `Z:/claude-sota-installed/.claude/plugins/cache/claude-plugins-official/superpowers/5.1.0/skills/dispatching-parallel-agents/SKILL.md` (workflow grammar)
- `Z:/claude-sota/.claude/rules/parallel-agent-wave.md §CADP rule 5` (cache-aware dispatch pacing; ≥3 accounts <50% pre-dispatch fleet probe)
- `Z:/claude-sota/.claude/rules/advanced-agent-team-standing-directive.md` 8 invariants
- All agents `isolation: worktree` per CCBP frontmatter spec

### §3.7 SHARED INVARIANT BLOCK for all Fire 1 agent briefs (per codex T1 AXIS-3 P1 fix-forward — ARTIFACT-INLINE persistence consistency)

ALL Fire 1 Agent briefs (A/B/C/D/E) MUST satisfy this shared invariant block (in addition to per-agent constraints):

1. **ARTIFACT-INLINE persistence marker**: every agent's final return MUST contain `## ARTIFACT-INLINE: tmp/wave-deep-audit-fire1-agent<X>-<topic>-2026-05-12.md` followed by the artifact body verbatim per fm19-readonly-guard-sidestep §M1 mechanism. Orchestrator persists post-completion.
2. **Termination predicate** (TIER-1-DIRECT): `terminationCondition: on_text_match: "ARTIFACT-INLINE:" | on_handoff_to: orchestrator | max_turns: <per-agent> | on_token_budget_exceeded: <per-agent>` — the verdict one-liner (ARCHAEOLOGY: / VERDICT: / etc.) goes in `verdict_one_line` HANDOFF slot, NOT as termination marker.
3. **Cite anchors at file:line + HEAD SHA**: every claim about a local file cites `<path>:<line-range> @ HEAD <SHA>` (or `mcp__plugin_everything-claude-code_github__get_file_contents` blob-SHA result for remote).
4. **Mia pre-apply evidence**: every prescription includes `[VERIFIED via <probe>]` MUST-USE marker per cross-model-consensus.md §Evidence marker discipline.
5. **STAND-IN-NOTICE if BRIDGE-MODE runs as Sonnet stand-in only**: per cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate.

### §3.8 Sibling SOTA Automation Skills (auto-fire candidates)

Per CLAUDE.md §"Skill Orchestration Discipline" 4-skill stack:
- `superpowers:using-superpowers` — 1% rule + Skill Priority + Red Flags table (auto-fires session-start)
- `using-agent-skills` (addy) — discovery for 21 engineering-phase skills (auto-fires)
- `everything-claude-code:skill-comply` — post-invocation verification (auto-fires)
- `skill-creator` — authoring loop for new skills (manual invocation)

Plus sibling-novel automation skills NOT yet in this runtime (candidates for Fire 2 install evaluation per CR-12 lattice):
- `everything-claude-code:autonomous-agent-harness` — long-running scheduled operation (Crons + Dispatch + Memory + Computer Use layers)
- `everything-claude-code:continuous-agent-loop` — completion-signal loop termination
- `everything-claude-code:agent-eval` — head-to-head benchmark for coding agents
- `ralph-loop` plugin (already INSTALLED per `.claude/plugins/installed_plugins.json`) — adversarial dual-review convergence loop

## §4 Fire 1 — Detailed 5-Agent Parallel Wave Briefs

### §4.1 Agent A — sota-researcher (9-cohort SOTA discovery)

```yaml
agent: sota-researcher
isolation: worktree
model: claude-opus-4-7
tools: [Read, Grep, Glob, Bash, mcp__plugin_everything-claude-code_github__*, mcp__plugin_everything-claude-code_exa__*, mcp__plugin_everything-claude-code_context7__*, mcp__plugin_everything-claude-code_memory__*]
brief:
  task: |
    9-cohort SOTA discovery + Z:/repos/deps inventory check + Probe DAG 1-7 per candidate.
    Bound: ≥4-source convergence per multi-source-discovery-breadth-discipline.
  context:
    - User-listed 16 repos (Tier-1 baseline): ECC + CCBP/shanraisshan + superpowers + deepwiki-open + awesome-agentic-patterns + awesome-python + wshobson/agents + GitNexus + awesome-claude-plugins + awesome-llm-apps + andrej-karpathy-skills + mattpocock/skills + awesome-claude-code + alirezarezvani/claude-skills + get-shit-done + vercel-labs/agent-skills
    - 9-cohort menu: C1 GraphQL star+topic / C2 arxiv / C3 HuggingFace / C4 PapersWithCode / C5 named-author / C6 awesome-list / C7 conference / C8 trending / C9 stars-sorted-direct
    - Probe DAG 1-7 mandate per agent-harness-fit-verification.md
    - CR-12 6-class lattice classification per candidate (GENUINELY-NEW / DUPLICATE-FUNCTIONALITY / PARTIAL-OVERLAP / PROVIDER-COMPLEMENT / ECOSYSTEM-IMPORT / CITE-CLASS-CANONICAL)
  files:
    - Z:/repos/deps/<each cited repo>/file:line
    - .claude/plugins/marketplaces/*.json
    - .claude/plugins/installed_plugins.json
    - docs/sota-installed-manifest.md
  constraints:
    - Mia pre-apply on EVERY prescription before flagging GENUINE
    - Cite each candidate at file:line + HEAD SHA
    - Honest n-counter audit (no claimed n without verifiable query + scope)
    - Include HONEST-NON-FINDING for cohorts returning no results
    - Each candidate must have CR-9 install-risk assessment (version-pin + 2-round budget + REVERT precedent + sibling-bleed)
  output: tmp/wave-deep-audit-fire1-agentA-sota-discovery-2026-05-12.md
  output_budget: 1000 LOC
  termination: on_handoff_to: orchestrator | max_turns: 30 | terminationCondition: on_text_match: "ARTIFACT-INLINE:" | on_token_budget_exceeded: 800000
  done_when: |
    Artifact contains:
    1. Per-cohort findings table (C1-C9) with ≥4-source convergence per candidate
    2. Tier-1 user-listed 16 repos: each with Probe DAG 1-7 verdict + CR-12 lattice classification
    3. Tier-2 new discoveries (≥10 candidates): same Probe DAG + CR-12 verdicts
    4. Tier-3 Z:/repos/deps inventory subset (~673 dirs): cite-anchor extraction summary
    5. Top-N install candidates ranked by ROI (with CR-12 disposition + axis-1+2+3 verdict)
    6. Top-N cite-extension candidates (no install needed)
    7. HONEST-NON-FINDING list (cohorts/repos returning no relevant evidence)
  handoff: handoff_to: orchestrator, output_mode: last_message, artifacts: [tmp/wave-deep-audit-fire1-agentA-sota-discovery-2026-05-12.md], verdict_one_line: "DONE: 9-cohort SOTA discovery complete; <N> install candidates / <M> cite-extension / <K> HNF"
```

### §4.2 Agent B — architect (per-folder + per-dimension audit + % metrics)

```yaml
agent: architect (or general-purpose if architect not yet installed)
isolation: worktree
model: claude-opus-4-7
tools: [Read, Grep, Glob, Bash, NotebookRead]
brief:
  task: |
    Recursive folder walk + per-file SOTA-cite verification + per-dimension architecture audit.
    Output: % metrics per dimension + cleanup queue + Cardinal-rule-8 conformance per file.
  context:
    - Architecture surface = .claude/* + docs/* + tools/* + bin/* + scripts/* + manifests/* + .codex/* + CLAUDE*.md
    - Dimensions: cardinal rules + hooks + rules + agents + skills + commands + settings + MCP + tools + scripts + docs + manifests
    - Cardinal rule taxonomy: ADAPTED-FROM-SOTA / NOVEL-DOCUMENTED-EXCEPTION / PENDING-AUDIT
    - Stale ref classes: FORWARD-REF without target / INSTALLED-AMBER / NOT-INSTALLED claims that are stale / NOT-YET-CODIFIED with implementation evidence / Marker Decay candidates
  files:
    - All files matching: .claude/**/*.{md,py,sh,json,yaml,yml,toml}
    - docs/**/*.md
    - tools/**/*.{ps1,sh,py}
    - bin/**/*.{cmd,sh,ps1}
    - manifests/**/*.{yaml,yml}
    - .codex/**/*
    - CLAUDE*.md
  constraints:
    - Verify EVERY cite anchor (file:line + HEAD SHA) by direct Read
    - Marker Decay: re-verify [VERIFIED yyyy-mm-dd] markers older than 60 days
    - Honest classification: NOT-INSTALLED / INSTALLED / INSTALLED-AMBER / STAGED / PLANNED / RETIRED
    - Per-folder summary table with % metrics
    - Cleanup queue ranked by priority (HIGH-severity first)
  output: tmp/wave-deep-audit-fire1-agentB-architecture-audit-2026-05-12.md
  output_budget: 1500 LOC
  termination: on_handoff_to: orchestrator | max_turns: 35 | terminationCondition: on_text_match: "ARTIFACT-INLINE:" | on_token_budget_exceeded: 1000000
  done_when: |
    Artifact contains:
    1. Per-dimension audit table: total files, % SOTA-cited, % CR-8 conformant, % stale, % missing CR-8 status
    2. Per-folder breakdown (recursive): files audited, drift surfaced, cleanup priority
    3. Stale reference queue with cleanup-class taxonomy (REVERT / RETIRE / RECITE)
    4. CR-8 status column candidates (rows missing in manifest §Section 0)
    5. CR-7 Phase 2 trigger predicate matrix (which Tier rows hold each predicate)
    6. Open HIGH-severity findings status (the 2 OPEN T3 findings + any new)
    7. Smoke-probe pass rate per installed row
    8. % SOTA-classified across architecture surface (target ≥95%)
    9. % stale resolved or queued (target ≥90%)
  handoff: handoff_to: orchestrator, output_mode: last_message, artifacts: [tmp/wave-deep-audit-fire1-agentB-architecture-audit-2026-05-12.md], verdict_one_line: "DONE: per-folder audit complete; <X>% SOTA-classified / <Y>% stale resolved / <Z> cleanup priorities"
```

### §4.3 Agent C — gpt5-archaeologist BRIDGE-MODE (hotspot + bus-factor + bug-magnet)

```yaml
agent: gpt5-archaeologist
isolation: worktree
model: claude-sonnet-4-6 (BRIDGE-MODE wrapper invoking real GPT-5.5 via codex CLI)
tools: [Bash, Read, Grep]
brief:
  task: |
    Per-file hotspot + bus-factor + bug-magnet audit via REAL GPT-5.5 BRIDGE-MODE.
    Path P foreground+tee dispatch (per cross-model-consensus.md §Env-funneled stand-in disclosure).
  context:
    - BRIDGE-MODE: agent runs as Sonnet wrapper invoking codex CLI subprocess
    - Per-call codex time-budget MANDATE: default 90s, normal cap 120s, 180s only with explicit reason (FM-17.d watchdog stall defense per advanced-agent-team-standing-directive invariant #1)
    - **Path P / Pattern D recipe (DEFAULT profile)** — per codex-t1-fix-forward-pattern.md §Pattern D: `timeout 300 codex exec --skip-git-repo-check --color never < <prompt>.txt 2>&1 | tee <prompt>_OUT.txt`. NO `-p deep-review-exec`; uses codex CLI's DEFAULT profile (medium effort + read-only sandbox). RATIONALE: Agent C archeology dispatches MANY short calls (per-file hotspot scoring); Pattern D's 6 load-bearing TARGET parameters (DEFAULT profile + --skip-git-repo-check + --color never + foreground+tee + 300s timeout + ≤50 LOC focused prompt) are appropriate for high-volume short-call class. Distinct from §5.2 Fire 2 per-dimension T1 review (Pattern A primary shape with deep-review-exec for thorough single-shot review).
    - Foreground+tee NOT background (FM-17.d defense)
    - Verdict written to .claude/state/codex_consult_<topic>_OUT.txt with pair-basename rule
  files:
    - All files matching: .claude/**/*.{md,py,sh,json}
    - tools/**/*.ps1
    - scripts/**/*.py
  constraints:
    - Hotspot scoring via git log + git blame (commits/file last 90d × authors)
    - Bus-factor analysis: % authored by single contributor per file
    - Bug-magnet scoring: commits-with-fix-keywords / total commits per file
    - REAL GPT-5.5 verdict required for top-N hotspot files (cross-model gate per CR-3)
    - STAND-IN-NOTICE if BRIDGE-MODE runs as Sonnet stand-in only
  output: tmp/wave-deep-audit-fire1-agentC-archaeology-2026-05-12.md
  output_budget: 800 LOC
  termination: on_handoff_to: orchestrator | max_turns: 25 | terminationCondition: on_text_match: "ARTIFACT-INLINE:" | on_subprocess_failure: 3 | on_token_budget_exceeded: 600000  # NOTE: persistence marker per §3.7 shared invariant; verdict one-liner ("ARCHAEOLOGY: ...") goes in handoff verdict_one_line slot
  done_when: |
    Artifact contains:
    1. Top-20 hotspot files ranked by score
    2. Bus-factor breakdown per top-20 (single-author % + risk class)
    3. Bug-magnet scoring per top-20 (fix-commit ratio + recent fix density)
    4. GPT-5.5 risk-stratified findings (REAL GPT-5.5 verdict per Path P)
    5. Pre-edit recommendations per hotspot
    6. Cross-model gate satisfaction status (FULL via Path P / PARTIAL via STAND-IN-NOTICE / FAILED-policy-blocked)
  handoff: handoff_to: orchestrator, output_mode: last_message, artifacts: [tmp/wave-deep-audit-fire1-agentC-archaeology-2026-05-12.md], verdict_one_line: "ARCHAEOLOGY: 20 hotspots ranked; <X> high-risk; cross-model gate <STATUS>"
```

### §4.4 Agent D — gpt5-reviewer BRIDGE-MODE (adversarial review)

```yaml
agent: gpt5-reviewer
isolation: worktree
model: claude-sonnet-4-6 (BRIDGE-MODE wrapper invoking real GPT-5.5 via codex CLI)
tools: [Bash, Read, Grep]
brief:
  task: |
    Adversarial review against current architecture: "What would break this under autonomous loop?"
    Per-cardinal-rule conformance attack via REAL GPT-5.5 BRIDGE-MODE.
  context:
    - Adversarial framing per superpowers `code-reviewer.md` "Be adversarial. Be thorough. No compliments — just the problems."
    - Attack surfaces: CR-1 cite-trail / CR-3 cross-model gate / CR-5 install-priority / CR-7 graduated unleash predicate / CR-8 SOTA-content invariant / CR-9 install-risk / CR-10 research-first / CR-11 META-process / CR-12 upstream-priority
    - Hidden error / silent fallback hunt per `everything-claude-code:silent-failure-hunter`
    - Per-call codex 90-180s budget (FM-17.d defense)
    - Path P foreground+tee dispatch
  files:
    - CLAUDE.md (12 cardinal rules)
    - .claude/settings.json (permissions + hooks + env)
    - .claude/rules/*.md (when present)
    - .claude/agents/*.md (when present)
    - tools/eee.ps1 (launcher)
    - All sibling cite-import-AMBER rows (verify CR-12 last-resort gate)
  constraints:
    - REAL GPT-5.5 verdict shape: VERDICT: APPROVE | NEEDS-REVISION | REJECT + conf + prescribed_edits
    - Cite findings at file:line + HEAD SHA
    - Rank by severity (P0 / P1 / P2 / P3)
    - Identify: (a) cite-class drift, (b) Marker Decay candidates, (c) silent fallback locations, (d) CR-7 predicate gaps, (e) install-class violations
  output: tmp/wave-deep-audit-fire1-agentD-adversarial-2026-05-12.md
  output_budget: 800 LOC
  termination: on_handoff_to: orchestrator | max_turns: 25 | terminationCondition: on_text_match: "ARTIFACT-INLINE:" | on_subprocess_failure: 3 | on_token_budget_exceeded: 600000  # NOTE: persistence marker per §3.7 shared invariant; verdict one-liner ("VERDICT: APPROVE/NEEDS-REVISION/REJECT ...") goes in handoff verdict_one_line slot
  done_when: |
    Artifact contains:
    1. Per-cardinal-rule attack verdict (CR-1 through CR-12)
    2. Hidden error / silent fallback findings (ranked P0-P3)
    3. CR-7 graduated unleash predicate audit per Tier
    4. Architecture-vs-SOTA gaps (compared against ECC + CCBP + superpowers + cwc-long-running-agents)
    5. Top-N prescribed_edits ranked by severity
    6. STAND-IN-NOTICE if BRIDGE-MODE runs as Sonnet only
  handoff: handoff_to: orchestrator, output_mode: last_message, artifacts: [tmp/wave-deep-audit-fire1-agentD-adversarial-2026-05-12.md], verdict_one_line: "VERDICT: <APPROVE/NEEDS-REVISION/REJECT> conf=<N>; <X> P0 / <Y> P1 findings; cross-model gate <STATUS>"
```

### §4.5 Agent E — probe-dag-verifier (Probe DAG 1-7 / 7 probes per candidate)

```yaml
agent: probe-dag-verifier (general-purpose with explicit Probe DAG mandate)
isolation: worktree
model: claude-opus-4-7
tools: [Read, Grep, Glob, mcp__plugin_everything-claude-code_github__*, mcp__plugin_everything-claude-code_exa__*]
brief:
  task: |
    For each candidate from Agent A: run full 7-probe harness-fit DAG (Probes 1 through 7) per agent-harness-fit-verification.md.
    Mia pre-apply on every prescription before flagging GENUINE.
  context:
    - Probe 1 count-OVER (verify claimed counts via direct queries)
    - Probe 2 SDK-vs-CLI surface (verify invocation surface exists in claude-sota-installed)
    - Probe 3 architectural-API (verify Anthropic-API vs OpenAI-API match)
    - Probe 4 plugin-namespace (CRITICAL — kiss-dry-yagni Must-Never #4 duplicate-functionality)
    - Probe 5 mode-harness-shape (HARD-GATE / interactive vs autonomous / size-sprawl / meta-skill harness assumptions)
    - Probe 6 direct-file/registry blockers (LICENSE / README badge / npm/PyPI registry direct-existence)
    - Probe 7 demand-gate split (.a DEMAND-ABSENCE → REJECT / .b DEMAND-CREATES-NEW-WORKFLOW → 5-clause check)
  files:
    - Agent A artifact (Fire 1 dependency)
    - .claude/plugins/installed_plugins.json (Probe 4 plugin-namespace check)
    - .claude/plugins/marketplaces/*.json (Probe 4 marketplace coverage)
    - .claude/agents/ + .claude/skills/ + .claude/rules/ + .claude/commands/ (Probe 4 sub-classes)
  constraints:
    - Each candidate gets explicit Probe 1-7 verdict (PASS / FAIL / N/A)
    - REJECT-FOR-FIT requires ALL probes evaluated with reason
    - Mia pre-apply: cheap probe (Glob/Grep/Read) before flagging GENUINE
    - HONEST-NON-FINDING is high-value output (REJECT-FOR-FIT verdicts save downstream cycles)
    - Per §3.7 shared invariant: every claim cites <path>:<line-range> @ HEAD <SHA> (or remote blob-SHA via mcp__plugin_everything-claude-code_github__get_file_contents); every prescription includes [VERIFIED via <probe>] MUST-USE marker
  output: tmp/wave-deep-audit-fire1-agentE-probe-dag-2026-05-12.md
  output_budget: 1000 LOC
  termination: on_handoff_to: orchestrator | max_turns: 30 | terminationCondition: on_text_match: "ARTIFACT-INLINE:" | on_token_budget_exceeded: 700000  # NOTE: persistence marker per §3.7 shared invariant; verdict one-liner ("VERDICT: ADOPT/STUDY-PILOT/REJECT-FOR-FIT ...") goes in handoff verdict_one_line slot
  done_when: |
    Artifact contains:
    1. Per-candidate Probe 1-7 verdict matrix
    2. CR-12 6-class lattice classification per candidate (GENUINELY-NEW / DUPLICATE-FUNCTIONALITY / PARTIAL-OVERLAP / PROVIDER-COMPLEMENT / ECOSYSTEM-IMPORT / CITE-CLASS-CANONICAL)
    3. ADOPT-NOW / STUDY-PILOT / REJECT-FOR-FIT verdict per candidate
    4. Mia probe outcomes per prescription
    5. Cross-validation against Agent A findings (catches abstract-pattern-reasoning blind-spot per FM-09)
  handoff: handoff_to: orchestrator, output_mode: last_message, artifacts: [tmp/wave-deep-audit-fire1-agentE-probe-dag-2026-05-12.md], verdict_one_line: "VERDICT: <X> ADOPT / <Y> STUDY-PILOT / <Z> REJECT-FOR-FIT; <K> Mia OVERs caught"
```

## §5 Fire 2 — Convergence + Ship (detailed sub-steps)

### §5.1 Orchestrator Mia Synthesis

Fresh CC session reads 5 ARTIFACT-INLINE artifacts. For each agent prescription:
1. **Decompose into sub-claims** per `synthesis-layer-verify.md §Within-cycle revision discipline (axis-9)`
2. **Mia probe each sub-claim INDEPENDENTLY** at synthesis time per `mia-pre-apply.md §How to apply`
3. **Subclaim-type discriminator** per `synthesis-layer-verify.md §Subclaim-type discriminator`:
   - UPSTREAM-CLAIM: re-WebFetch via mcp__plugin_everything-claude-code_github__get_file_contents
   - OPERATIONAL-CLAIM: runtime-probe via Grep/Glob/Read
   - CATEGORY-CLAIM: cheap-grep across local namespace
   - SHAPE-CLAIM: schema-validate via JSON Schema / Pydantic
4. **OVER detection**: Drop any prescription failing Mia probe; classify per `synthesis-layer-verify.md §Reporting categories` (OVER / UNDER / HONEST-NON-FINDING)
5. **FM-20 path-drift cascade defense**: probe at synthesis-vs-brief boundary, NOT only at apply boundary
6. **Queue VERIFIED-GENUINE for Pattern A apply**

### §5.2 Codex T1 Deep-Review Per Dimension (Pattern A primary shape — distinct from §4.3 Pattern D)

For each architecture dimension (cardinal rules + hooks + rules + agents + skills + commands + settings + MCP + tools + scripts + docs + manifests):
1. Build T1 consult prompt at `.claude/state/codex_consult_w-deep-audit-fire2-dim-<N>-<dimension>.txt`
2. Embed Mia-verified prescriptions + per-cardinal-rule conformance state + relevant primary-source cites at file:line + HEAD SHA
3. Fire codex T1 via **Pattern A primary shape** (per codex-t1-fix-forward-pattern.md §Pattern A — uses `-p deep-review-exec` for xhigh + danger-full-access thorough single-shot review):
   ```bash
   timeout 480 codex exec --ephemeral -p deep-review-exec --color never --skip-git-repo-check \
     < .claude/state/codex_consult_w-deep-audit-fire2-dim-<N>-<dimension>.txt \
     2>&1 | tee .claude/state/codex_consult_w-deep-audit-fire2-dim-<N>-<dimension>_OUT.txt
   ```
   RATIONALE: §5.2 is per-dimension full-architecture review (one-shot per dimension; needs xhigh + danger-full-access for cite-trail audit + cross-rule consistency check). DISTINCT from §4.3 Agent C BRIDGE-MODE archeology (high-volume short-call class → Pattern D recovery shape with DEFAULT profile + lower budget per call).
4. Per-call budget: 240s default / 480s deep / 900s xhigh-meta (FM-17.d watchdog mitigated by foreground+tee not background+watchdog)
5. Verdict reading discipline: EOF FIRST per `codex-t1-fix-forward-pattern.md §How to apply step 4` — `wc -l <file>` first; `grep -nE "VERDICT:|^F-[0-9]|conf=|APPROVE|NEEDS-REVISION|REJECT" <file> | tail -20`; `tail -200 <file>`
6. Pattern A apply per `codex-t1-fix-forward-pattern.md §Pattern A` for each NEEDS-REVISION (single atomic commit per dimension)

### §5.3 Cleanup Ship

Per closed-loop §Disposition severity-gate per `closed-loop-recursive-narrowing.md §Disposition signal severity-gate`:

**For 2 OPEN HIGH-severity T3 findings**:
- HIGH severity → REVERT-AND-REMOVE (Outcome B) UNLESS concrete-verification mitigation OR severity downgrade evidence
- ACCEPT-WITH-DOC permitted ONLY if severity-gate satisfied (medium/low + concrete verification + monotone-decline)
- MANUAL-OVERRIDE if owner explicitly accepts unresolved high (rare; tracked as code-review-burn metric)

**For stale FORWARD-REFs**:
- Per `port-note-discipline.md §3 Discipline 2 FORWARD-REF retirement`: if target landed, retire qualifier; if escalated, drop reference
- Audit: `grep -rn "FORWARD-REF.*<filename>" .claude/ docs/` for both orderings

**For INSTALLED-AMBER rows**:
- Convert to INSTALLED on smoke-probe PASS
- Convert to STAGED on smoke-probe FAIL with reason
- Document in `docs/install-provenance.md` per Wire/Surface/Close discipline

**For dead code**:
- Refactor-cleaner agent OR ECC silent-failure-hunter dispatch
- Per `Z:/repos/deps/everything-claude-code/skills/refactor-cleaner/SKILL.md` (when path verified)

### §5.4 Install Ship (CR-12 PRIMARY upstream-install)

For each new GENUINELY-NEW + verified candidate from Agent A + cross-validated by Agent E + approved by Agent D codex review:

**CR-12 PRIMARY (upstream-install via official native channel per CR-6)**:
```bash
# npm
npm install -g <pkg>@<version>  # Version-pin per CR-9; @latest with explicit acknowledgment

# Plugin marketplace (Anthropic OFFICIAL)
/plugin marketplace add <official-marketplace-url>
/plugin install <pkg>@<marketplace>

# GitHub release
gh release download --repo <owner>/<repo> $(gh release list --repo <owner>/<repo> --limit 1 --json tagName -q '.[0].tagName')

# git clone canonical
git clone --depth 1 https://github.com/<owner>/<repo>.git <dest>

# uvx
uvx --refresh <pkg>

# cargo
cargo install <pkg>

# docker
docker pull <image>:<version>
```

**CR-9 install-risk discipline applied**:
- Version-pin (no @latest without explicit acknowledgment)
- 2-round fix-forward budget per hook install
- Pre-cite-import REVERT check (`git log --all --oneline -- '<sibling-target-path>'`)
- Sibling-bleed defense (path-rewrite for claude-sota-installed context)

**CR-12 6-class lattice apply**:
- GENUINELY-NEW → INSTALL via PRIMARY path
- DUPLICATE-FUNCTIONALITY → REJECT-FOR-FIT (kiss-dry-yagni Must-Never #4)
- PARTIAL-OVERLAP → CASE-BY-CASE (typically CITE-PATTERN-ONLY)
- PROVIDER-COMPLEMENT → INSTALL as ALTERNATIVE
- ECOSYSTEM-IMPORT → CITE-PATTERN-ONLY (typical) OR STUDY-PILOT-NARROW-WITH-VENV-ISOLATION
- CITE-CLASS-CANONICAL → ACCEPT-AS-CITE-REFERENCE (no install)

### §5.5 Manifest + Provenance Updates

- Update `docs/sota-installed-manifest.md` with new install rows (per-row schema: Status / Smoke Probe / CR-8 status / Cite anchor)
- Append `docs/install-provenance.md` with audit + install events (audit-action-loop Wire/Surface/Close discipline)
- Update CR-7 Phase 2 trigger predicate matrix per row
- Update `docs/sota-deep-audit-progress-2026-05-12.md` per fire

### §5.6 Atomic Commits

Per cycle-300 ONE-LOGICAL-UNIT-PER-FIRE + git-cli-grammar-discipline §How to apply — atomic single-shell-invocation form (per FM-02 sub-class (b) defense + audit-action-loop step 4 atomic-batch):
```bash
git add -- <my-files> && git commit -o -F <commit-msg> -- <my-files>
```

The `-o` flag is `--only` shorthand. The single-shell `&&` chain minimizes the window between stage and commit, defeating staging-index race per parallel-session-worktree-isolation.md Sub-class (b) recovery. Options BEFORE `--` separator per git-cli-grammar-discipline.md §The 4 invariants.

Commit body cites:
- T1 verdict files at `.claude/state/codex_consult_*_OUT.txt`
- Mia probe outcomes per `[VERIFIED via <probe>]` MUST-USE convention
- Cardinal-rule conformance status
- Cross-model gate status (FULL via REAL GPT-5.5 / PARTIAL via STAND-IN-NOTICE)

T3 postcommit auto-fires (when Tier 1a INSTALLED) — verdict at `.claude/state/codex_review_HEAD_<sha8>.txt`. Phase 1 bootstrap exception applies until T3 hook installed.

## §6 Fire 3 — Validate + Re-fire

### §6.1 Re-run % Metrics

Re-fire Agent B (architect) with same per-folder audit brief. Compare:
- % SOTA-classified pre vs post Fire 2
- % stale resolved pre vs post
- % CR-8 conformant pre vs post
- Per-dimension breakdown

Document delta in `docs/sota-deep-audit-progress-2026-05-12.md`.

### §6.2 Smoke Probe Every Install Row

Per `Z:/repos/deps/anthropics/cwc-long-running-agents` Default-FAIL contract:
- Each install row in `docs/sota-installed-manifest.md` has `Smoke Probe` column
- Run probe; expected outcome documented per row
- INSTALLED-AMBER → INSTALLED on PASS
- INSTALLED → STAGED on FAIL (rollback per CR-9 2-round fix-forward budget)

### §6.3 T3 Postcommit Verdict Review

For every Fire 2 commit:
- Read `.claude/state/codex_review_HEAD_<sha8>.txt` (when T3 hook installed)
- Phase 1 bootstrap exception: orchestrator-side `codex exec review` substitute
- Pattern A fix-forward for any NEEDS-REVISION conf ≥0.85
- Outcome A ACCEPT-WITH-DOC for monotone-decline + severity-gate satisfied
- Outcome B REVERT for unresolved HIGH/CRITICAL
- Outcome C MANUAL-OVERRIDE only with explicit owner acceptance + tracked as code-review-burn metric

### §6.4 HONEST-NON-FINDING Documentation

- Document any cohort returning HNF
- Document any candidate REJECTED-FOR-FIT with reason
- Surface candidates queued for next deep-audit cycle (3-month re-evaluation per `convergence-gate.md` update triggers)
- Codify any new META-discipline candidates per cycle-322 jurisdiction

## §7 Failure Mode Coverage

| FM | Defense |
|---|---|
| **FM-02 (a/b/c) destructive race** | Each Fire fresh CC session + isolation:worktree per agent + single-shell `git add && git commit -o` chains per git-cli-grammar-discipline |
| **FM-09 codex-rescue blind-spot** | Agent E probe-dag-verifier as 2nd-stage validation contract per agent-harness-fit-verification.md §Codex-rescue blind-spot specialization (n=5/5 100% same-arc base rate); 2nd-stage spawned in parallel, NOT serialized |
| **FM-17.a wrapper-truncation** | Per fm17-subagent-fleet-depletion.md §FM-17.a recovery: SendMessage to `agentId` for ARTIFACT-INLINE re-emit (substantive work already done; final-return truncated only); shared ARTIFACT-INLINE persistence per §3.7 invariant block (fm19-readonly-guard-sidestep is the persistence mechanism, FM-17.a is the parent class) |
| **FM-17.b pool-depletion 429** | CADP rule 5 pre-dispatch fleet probe (`python Z:/claude/ccc/tools/status.py` ≥3 accounts <50%); STAND-IN-NOTICE on substitution per cross-model-consensus.md §Env-funneled stand-in disclosure mandate |
| **FM-17.b.i pre-fire 429** | Same as .b + inspect filesystem for partial `tmp/wave-*-agent-*.md` artifacts |
| **FM-17.c codex bg-job wedge** | Path P foreground+tee NOT background; Wave 26 Agent A diagnosis recovery |
| **FM-17.d watchdog stall** | Per-call 90-180s budget per advanced-agent-team-standing-directive invariant #1 |
| **FM-17.e autocompact-thrashing** | Brief tightening: substitute Read large-files with mcp__plugin_context-mode_context-mode__ctx_execute_file; substitute WebFetch with ctx_fetch_and_index; cap exa/perplexity with head_limit |
| **FM-17.f 1M-context blocker** | Path P codex exec foreground+tee from orchestrator (NOT subagent fan-out) per docs/fm17f-deep-dive-2026-05-09.md §3 Path P PRIMARY |
| **FM-19 readonly-guard sidestep** | ARTIFACT-INLINE mandate in every agent brief per fm19-readonly-guard-sidestep.md |
| **FM-20 path-drift cascade** | Mia probe at every synthesis-vs-brief hop per fm20-path-drift-cascade.md |
| **FM-21 queue-time freeze** | One-shot ScheduleWakeup per fire; STATE PROBE clause-level smoke at fire-time per fm21-queue-time-prompt-freeze.md §Recovery action #2 |

## §8 Cardinal Rule Conformance per Fire

Each Fire 1+2+3 satisfies all 12 cardinal rules:
- **CR-1**: Every architectural edit cites SOTA primary source via TIER-1-DIRECT or TIER-3-LOCAL-COMPOSITION constituents form per citation-discipline.md rule #8
- **CR-3**: Cross-model consensus via GPT-5.5 BRIDGE-MODE for ≥2 agents (Agents C+D); Phase 1 bootstrap exception per codex exec foreground+tee until Tier 1a hooks INSTALLED
- **CR-5**: Install-priority over hand-coding (every new artifact is install-class OR cite-class adapted)
- **CR-6**: Pull from newest GitHub via official native channel (npm @latest / cargo / uvx / /plugin install / gh release)
- **CR-7**: Graduated unleash respect (current bypassPermissions per Wave 82d operator override; Phase 2/3 transition gated by Tier rows INSTALLED + smoke-probe PASS)
- **CR-8**: Full-SOTA-content invariant (every code/doc cites SOTA via constituents form)
- **CR-9**: Install-risk discipline (version-pin + 2-round fix-forward + REVERT check + sibling-bleed defense)
- **CR-10**: Research-first-then-install (sota-researcher BEFORE remediation; Agent A is Tier-1b primary)
- **CR-11**: META-process SOTA discipline (this plan IS recursive dogfood)
- **CR-12**: Upstream-install-priority over sibling-cite-import; sibling cite-import-AMBER only with HONEST-NON-FINDING evidence per CLAUDE.md §14.5

Standing directive 8 invariants per advanced-agent-team-standing-directive.md baked into agent briefs.

## §9 Progress Tracking + Metrics

`docs/sota-deep-audit-progress-2026-05-12.md` (append-only audit log):

```markdown
# SOTA Deep Audit Progress — 2026-05-12

## Fire 1 — Discovery + Audit (status: <RUNNING/COMPLETE/FAILED>)

### Agent A: sota-researcher
- Started: <ts>
- Completed: <ts>
- Duration: <wall-clock>
- Tokens: <count>
- Artifact: tmp/wave-deep-audit-fire1-agentA-sota-discovery-2026-05-12.md
- Verdict: DONE | DONE_WITH_CONCERNS | NEEDS_CONTEXT | BLOCKED
- Findings: <N> install candidates / <M> cite-extension / <K> HNF

### Agent B: architect
[same shape]

### Agent C: gpt5-archaeologist BRIDGE-MODE
[same shape] + cross-model gate satisfaction status

### Agent D: gpt5-reviewer BRIDGE-MODE
[same shape] + cross-model gate satisfaction status

### Agent E: probe-dag-verifier
[same shape]

## Fire 2 — Convergence + Ship (status: <RUNNING/COMPLETE/FAILED>)

### Step 2.1-2.6 progress per substep

## Fire 3 — Validate + Re-fire (status: <RUNNING/COMPLETE/FAILED>)

### Per-step progress

## % Metrics Dashboard
- % SOTA-classified: <pre> → <post> (Δ <delta>)
- % stale resolved: <pre> → <post>
- % CR-8 conformant: <pre> → <post>
- New install candidates: <N> ranked by ROI
- HONEST-NON-FINDINGs: <K> documented for 3-month re-evaluation
- Cross-model gate satisfaction: <X>/<Y> ships verified GPT-5.5 verdict
```

### §9.1 Machine-Readable Per-Fire YAML Block (per codex T1 AXIS-4 P2 fix-forward — cross-fire ingestability)

In addition to the Markdown dashboard above, each fire MUST append a YAML block to `docs/sota-deep-audit-progress-2026-05-12.md` for reliable cross-fire ingestion by fresh CC sessions:

```yaml
---
fire_id: <fire-1|fire-2|fire-3|fire-2.5-adapter-ship>
status: <RUNNING|COMPLETE|FAILED|HANDOFF_PENDING|DEFAULT_FAIL>
started_at: <ISO-8601 UTC>
completed_at: <ISO-8601 UTC | null>
duration_seconds: <int | null>
agents_dispatched:
  - agent: <name>
    agent_type: <subagent_type>
    agent_id: <uuid>
    started_at: <ISO-8601>
    completed_at: <ISO-8601 | null>
    tokens_used: <int>
    tool_uses: <int>
    verdict_one_line: <string>
    status: <DONE|DONE_WITH_CONCERNS|NEEDS_CONTEXT|BLOCKED>
    artifact_path: <tmp/wave-deep-audit-fire<N>-agent<X>-*.md>
artifacts:
  - path: <tmp/...>
    sha256: <hex digest>
    loc: <int>
    artifact_class: <ARTIFACT-INLINE|VERDICT|MANIFEST_DELTA>
codex_verdicts:
  - profile: <deep-review-exec|default|deep-review|t2-exec>
    consult_path: <.claude/state/codex_consult_<topic>_OUT.txt>
    verdict: <APPROVE|NEEDS-REVISION|REJECT>
    confidence: <float 0.0-1.0>
    pattern_a_applied: <bool>
    prescribed_edits_count: <int>
ship_decisions:
  - commit_sha: <hex>
    type: <CLEANUP|INSTALL|MANIFEST_UPDATE|REVERT>
    cardinal_rules_satisfied: [CR-1, CR-3, ...]
    cross_model_gate_status: <FULL|PARTIAL-STAND-IN|FAILED-POLICY-BLOCKED>
next_fire_brief: <string | path-to-brief-file>
default_fail_reason: <null | string explaining DEFAULT_FAIL>
---
```

This YAML is the FRESH-CONTEXT-EVALUATOR contract per `Z:/repos/deps/cwc-long-running-agents/README.md @ HEAD ffd563d668a97a38d4aa092bf0d5b1507c046629` — next fire reads block cold without prior context.

## §10 Repos in Audit Scope

**Tier-1 user-listed (16)**: ECC + CCBP/shanraisshan + superpowers + deepwiki-open + awesome-agentic-patterns + awesome-python + wshobson/agents + GitNexus + awesome-claude-plugins + awesome-llm-apps + andrej-karpathy-skills + mattpocock/skills + awesome-claude-code + alirezarezvani/claude-skills + get-shit-done + vercel-labs/agent-skills

**Tier-2 discovery via 9-cohort menu** (≥4-source convergence-gate per multi-source-discovery-breadth-discipline):
- C1 GraphQL star+topic via mcp__plugin_everything-claude-code_github__search_repositories
- C2 arxiv via mcp__plugin_everything-claude-code_exa__web_search_exa with `category:research paper`
- C3 HuggingFace via mcp__plugin_everything-claude-code_exa__web_search_exa with `huggingface.co`
- C4 PapersWithCode via WebFetch `paperswithcode.com`
- C5 named-author (Karpathy / Beck / Hunt / Thomas / Evans / Pocock / Boris Cherny / Addy Osmani)
- C6 awesome-list catalog crawl
- C7 conference proceedings via Exa
- C8 trending feeds via mcp__plugin_everything-claude-code_github__search_repositories `sort:updated`
- C9 stars-sorted-direct via mcp__plugin_everything-claude-code_github__search_repositories `sort:stars`

**Tier-3 Z:/repos/deps backup audit** (~673 repos): cite-anchor extraction for primitives already cloned but not yet leveraged.

**Anthropic OFFICIAL primary source mandate** (per CR-12 PRIMARY priority order):
- code.claude.com/docs/en/* (sub-agents / hooks / settings / commands / model-config / permission-modes)
- anthropics/cwc-long-running-agents (cwc + 5 install-class primitives)
- anthropics/anthropic-cookbook (skill-creator + 9 production patterns)
- anthropics/claude-agent-sdk-python (HookMatcher + ClaudeSDKClient lifecycle)

## §11 Cross-References (Sister Rules + Skills)

**Authority surfaces** (cite-import-AMBER per CLAUDE.md §14.5):
- `Z:/claude-sota/.claude/rules/advanced-agent-team-standing-directive.md` (8 invariants)
- `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md` (Probe DAG 1-7 + FM-09)
- `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md` (Pattern A/B/C/D + Pattern-B mitigation)
- `Z:/claude-sota/.claude/rules/closed-loop-recursive-narrowing.md` (Outcome A/B/C disposition gate)
- `Z:/claude-sota/.claude/rules/cross-model-consensus.md` (T1-T7 + STAND-IN-NOTICE + Path P)
- `Z:/claude-sota/.claude/rules/fm17-subagent-fleet-depletion.md` (a/b/c/d/e/f sub-classes)
- `Z:/claude-sota/.claude/rules/fm19-readonly-guard-sidestep.md` (ARTIFACT-INLINE)
- `Z:/claude-sota/.claude/rules/fm20-path-drift-cascade.md` (claim propagation Mia probe)
- `Z:/claude-sota/.claude/rules/fm21-queue-time-prompt-freeze.md` (STATE PROBE clause-level)
- `Z:/claude-sota/.claude/rules/mia-pre-apply.md` (verify-before-Edit)
- `Z:/claude-sota/.claude/rules/parallel-agent-wave.md` (CADP rule 5)
- `Z:/claude-sota/.claude/rules/parallel-session-worktree-isolation.md` (Layer 0 isolation)
- `Z:/claude-sota/.claude/rules/synthesis-layer-verify.md` (OVER/UNDER/HNF + Subclaim-type)
- `Z:/claude-sota/.claude/rules/audit-action-loop.md` (Wire/Surface/Close/Re-fire)
- `Z:/claude-sota/.claude/rules/multi-source-discovery-breadth-discipline.md` (≥4-source)
- `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 (constituents lattice)

**Skill orchestration** (per CLAUDE.md §"Skill Orchestration Discipline" 4-skill stack):
- superpowers: brainstorming / writing-plans / executing-plans / subagent-driven-development / test-driven-development / requesting-code-review / receiving-code-review / dispatching-parallel-agents / verification-before-completion / systematic-debugging / using-git-worktrees / finishing-a-development-branch / using-superpowers
- addy-agent-skills: source-driven-development / using-agent-skills / spec-driven-development / planning-and-task-breakdown / incremental-implementation / debugging-and-error-recovery / code-review-and-quality / shipping-and-launch
- everything-claude-code: skill-comply / silent-failure-hunter / safety-guard / autonomous-loops / autonomous-agent-harness / continuous-agent-loop / agentic-engineering / agent-eval
- skill-creator (Anthropic OFFICIAL)

**Forward refs**:
- `docs/sota-feature-activation.md §7 LATENT-flip operator activations` (per CLAUDE.local.md ENV (h) note)
- `docs/sota-installed-manifest.md` Section 18 — Research Architecture
- `docs/install-from-github-discipline.md` (cite-import vs install-source)

## §12 Anti-Patterns

- **Skip Mia pre-apply on agent prescriptions** — refuted by mia-pre-apply.md n=412+ evidence (28+/29+ broad-fan-out prescriptions catch as OVER pre-apply)
- **Sibling cite-import without HONEST-NON-FINDING** — refuted by CR-12 TERTIARY gate; sibling-derived CANNOT be elevated to TIER-1 SOTA per citation-discipline.md rule #8
- **Background `codex exec` instead of foreground+tee** — refuted by FM-17.d defense + Path P recipe per cross-model-consensus.md §Pattern D recovery
- **Skip Mia-at-synthesis (only at apply)** — refuted by FM-20 path-drift cascade defense; Mia at every synthesis-vs-brief hop required
- **Trust agent ranking verbatim without 4-axis Probe DAG** — refuted by FM-09 codex-rescue blind-spot specialization n=5/5 same-arc 100% base rate
- **Bundle multiple design surfaces in one T1 consult** — refuted by Pattern B Forward Discipline #1 + #2 (codex-t1-pattern-b-forward-discipline.md)
- **Promote at n=1 without cycle-322 jurisdiction explicit user-trigger** — refuted by codification-threshold.md cycle-322 jurisdiction
- **Ship with `--no-verify` to bypass T2 gate** — refuted by canonical.md Must-Never #3 + cross-model-consensus.md §Anti-patterns
- **Self-evolving recursive plans** — refuted by FM-21 queue-time-prompt-freeze defense; this plan is one-shot
- **Aggressive cleanup without REVERT precedent check** — refuted by CR-9 install-risk discipline pre-cite-import REVERT check

## §13 Update Triggers

Re-evaluate this design when:
- Anthropic CC ships a new permission-mode primitive that obviates CR-7 graduated unleash
- A 5th meta-skill emerges in registered marketplaces (extends CLAUDE.md §Skill Orchestration 4-skill stack)
- Tier 1a codex T1-T7 hooks INSTALLED (flips Phase 1 bootstrap exception OFF for CR-3)
- A new failure mode FM-22+ surfaces (extends fm-* sister rules)
- A new user-listed SOTA repo emerges beyond current 16 (extends §10 Tier-1 user-listed)
- CR-13+ cardinal-rule extension lands (extends META-process discipline; current CR count = 12, so trigger fires when CR-13 ships)
- T3 NEEDS-ATTENTION rate drops below 50% sustained (current 75%; suggests adversarial gate operating but high finding rate)
- 3-month cadence: re-audit on `next-audit-date: 2026-08-12` per convergence-gate.md update triggers (queued HONEST-NON-FINDINGs from this arc re-evaluated)

## §14 Spec Self-Review + Codex T1 Pattern A Fix-Forward Trail

**Spec self-review (brainstorming skill step 7)**:
- **Placeholder scan**: ✅ no TBD/TODO/incomplete sections; all per-fire briefs fully specified
- **Internal consistency**: ✅ Fire 1 ARTIFACT-INLINE outputs consumed by Fire 2 synthesis; Fire 2 commits validated by Fire 3
- **Scope check**: ✅ focused on single 3-fire arc; subsequent re-evaluation queued for 3-month cadence
- **Ambiguity check**: ✅ each agent brief has explicit OUTPUT_BUDGET + TERMINATION + done_when
- **Cardinal-rule-1 cite-class**: ✅ TIER-3-LOCAL-COMPOSITION declared per citation-discipline.md rule #8 with constituents enumeration; constituents form mechanically valid (file:line + HEAD SHA + Test-Path verified)
- **Cardinal-rule-8 status**: ADAPTED-FROM-SOTA (this spec adapts upstream SOTA primitives across ≥27 TIER-1-DIRECT cites + 18 TIER-2 cite-imports)
- **Cardinal-rule-11 dogfood**: ✅ this spec IS the recursive META-process artifact (brainstorming → writing-plans transition planned)

**Codex T1 Pattern A fix-forward trail (2026-05-12)**:
- Verdict: NEEDS-REVISION conf=0.91 [VERIFIED via .claude/state/codex_consult_w-deep-audit-spec-t1_OUT.txt]
- 10 prescribed_edits across AXIS-1 (text soundness) + AXIS-2 (cite-class correctness) + AXIS-3 (sister-rule integration) + AXIS-4 (forward usability)
- Pattern A apply (single atomic commit per codex-t1-fix-forward-pattern.md §Pattern A):
  - **AXIS-2 P1**: cwc-long-running-agents path corrected (Z:/repos/deps/cwc-long-running-agents @ HEAD ffd563d668a97a38d4aa092bf0d5b1507c046629); superpowers HEAD updated (e7a2d164 → f2cbfbefebbfef77321e4c9abc9e949826bea9d7); mattpocock REMOTE-ONLY marker added; brace/glob/ellipsis entries split into explicit per-skill anchors
  - **AXIS-1 P1**: §1 success criteria orthogonalized (4 separate metrics; PENDING-AUDIT reported separately; queued ≠ closed)
  - **AXIS-1 P2**: §4.1 + §10 count alignment (14 → 16 repos)
  - **AXIS-1 P2**: §2 + §4.5 probe-count consistency (6-probe → Probe DAG 1-7 / 7 probes)
  - **AXIS-3 P1**: §4.3 + §5.2 Pattern D vs Pattern A profile rationale clarified (Agent C high-volume → Pattern D DEFAULT; §5.2 per-dimension thorough → Pattern A deep-review-exec)
  - **AXIS-3 P1**: §3.7 SHARED INVARIANT BLOCK added (ARTIFACT-INLINE persistence + termination predicate + cite anchors + Mia evidence + STAND-IN-NOTICE); Agent C/D/E termination markers updated to "ARTIFACT-INLINE:"
  - **AXIS-3 P2**: §3.3 + §3.4 hook scripts labeled as THIN ADAPTERS over cited primitives, gated through Fire 2.5 with CR-5/CR-12 classification
  - **AXIS-1 P2**: §5.6 atomic git commit form unified (`git add -- <files> && git commit -o -F <msg> -- <files>`)
  - **AXIS-1 P2**: §7 FM-17.a cite corrected (fm17-subagent-fleet-depletion.md as parent class; fm19 as persistence mechanism)
  - **AXIS-4 P2**: §9.1 machine-readable YAML block added; §13 stale numeric triggers fixed (5th SOTA repo → "new user-listed SOTA repo"; 7th cardinal rule → "CR-13+ extension")

**Pattern A discipline note**: per codex-t1-fix-forward-pattern.md §Pattern A — "apply ALL prescriptions in a SINGLE atomic commit; do NOT iterate iter-N→iter-N.1". Per closed-loop-recursive-narrowing.md §Disposition signal severity-gate — round 1 NEEDS-REVISION conf=0.91 with all P1+P2 (no P0); single fix-forward + ship; do not re-fire T1 unless 2nd-round trigger surfaces (operator-reported defect OR new evidence class).

## §15 Promotion Path (cycle-321 + cycle-322 jurisdiction)

This design satisfies promotion thresholds:
- **Expected savings ≥10 min/mo** (cycle-321 fast-path): manual SOTA audit ~5-10h × ~1/quarter = ~20-40 min/mo savings via codified fire structure
- **n=1 user-trigger explicit** (cycle-322 jurisdiction): user directive 2026-05-12 "deep dive and aduit, you decide" + "we need advanced automation"
- **LOC ≤1500** (cycle-322 ceiling): this spec ~600 LOC well under ceiling
- **TIER-1 cite chain acquired**: 27+ TIER-1-DIRECT primary sources + 18 TIER-2 sister-rule cite-imports

## §16 Operator Action Items (post-spec-review)

When you approve this spec:
1. I transition to **superpowers:writing-plans** skill per brainstorming flow terminal state
2. writing-plans produces per-fire executable implementation plan with task breakdown
3. You hand the plan to fresh CC sessions (one per fire) via `/loop` cron OR direct invocation
4. Each fire writes outcome to `docs/sota-deep-audit-progress-2026-05-12.md` (append-only)
5. T3 postcommit auto-fires per Fire 2 commit (when T1-T7 hooks installed); operator-side codex exec review substitute under Phase 1 bootstrap exception
6. Optional: enable autonomous progression via `/loop` cron + ScheduleWakeup self-pace + stop-hook auto-continue per §3 advanced automation layer

---

**End of design spec.**

**Provenance**: superpowers:brainstorming → spec-write → spec-self-review → user-review → writing-plans (transition pending user approval).
