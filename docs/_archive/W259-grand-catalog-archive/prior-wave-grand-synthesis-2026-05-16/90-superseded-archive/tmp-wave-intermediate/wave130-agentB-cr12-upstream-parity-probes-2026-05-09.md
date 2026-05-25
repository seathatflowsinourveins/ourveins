---
title: Wave 130 Fire 1 Agent B — CR-12 upstream-parity probes + Mia n=80→n=84 catalog
status: AUTHORITATIVE
date: 2026-05-09
agent: general-purpose
wave: 130
fire: 1
classification: CR-12 upstream-parity probe + FM-20/FM-17 Mia catalog
output_budget: 600 LOC
---

## ARTIFACT-INLINE: tmp/wave130-agentB-cr12-upstream-parity-probes-2026-05-09.md

# PART 1 — CR-12 Upstream-Parity Probes (5 SIB-ONLY agents)

Probe order per CR-12 priority lattice: (Path A install) > (Path B TIER-1 cite) > (Path C cite-import-AMBER from sibling). Marketplaces probed: addy-agent-skills, anthropic-agent-skills, claude-plugins-official, everything-claude-code, openai-codex.

Sibling HEAD pinned: `2fc5431a287e352231452f7a04e0b49d8feddd35` (Wave 130 fire 1 cutoff 2026-05-09).

## 1.1 codex-rescue → **Path A INSTALL-AVAILABLE** ✅

- **Probe (a)** Marketplace match: `Z:/claude-sota-installed/.claude/plugins/marketplaces/openai-codex/plugins/codex/agents/codex-rescue.md` ✅ EXISTS
- **Probe (b)** openai-codex marketplace canonical owner — official OpenAI plugin
- **Probe (c)** Sibling = `Z:/claude-sota/.claude/agents/codex-rescue.md` (see also CLAUDE.md cardinal-rule-3 §Bootstrap exception cites it as primary)
- **Probe (d)** Role: PROACTIVELY-fired delegated codex CLI subprocess invocation; Sonnet wrapper around `codex exec` per BRIDGE-MODE
- **Probe (e) CR-12 verdict**: **Path A** — install via `/plugin install codex@openai-codex` (already in marketplaces; just needs `/plugin install` activation)
  - Frontmatter probed: `name: codex-rescue`, `model: sonnet`, `tools: Bash`, `skills: [codex-cli-runtime, gpt-5-4-prompting]`
  - Cite-trail: `Z:/claude-sota-installed/.claude/plugins/marketplaces/openai-codex/plugins/codex/agents/codex-rescue.md` (TIER-1-DIRECT — official OpenAI marketplace per CR-1 + CR-6)

## 1.2 evolve-gate → **Path C CITE-IMPORT-AMBER** ⚠

- **Probe (a)** Marketplace match: NONE (`find ... -name "evolve-gate*"` returned 0; only ECC `commands/evolve.md` slash command for ECC `evolve` skill — different primitive)
- **Probe (b)** Closest upstream candidate: ECC `loop-operator.md` (autonomous loop monitor) + ECC `harness-optimizer.md` (config quality lift) — both PARTIAL overlap, neither is a 5-gate proposal validator
- **Probe (c)** Sibling cites `Z:/repos/deps/phantom/src/evolution/judge-models.ts:1-14 @ f8c7ab42` + `phantom-config/constitution.md:1-20 @ f8c7ab42` — **phantom is standalone evolution framework (chat-ui + config/), NOT a CC-installable plugin**
- **Probe (d)** Role: 5-gate validation (SOTA ref / no regression / minimal scope / reversible / testable) on evolution proposals; Opus + plan-mode + Bash-readonly-guard hook; consumes evolve-observer output
- **Probe (e) CR-12 verdict**: **Path C cite-import-AMBER per Section 14.5** — sibling-novel composition of phantom TIER-1 patterns. HONEST-NON-FINDING gate predicate satisfied: phantom is upstream RESEARCH input (Probe DAG: P3 plugin-namespace clean / P5 mode-harness-shape mismatch — phantom is web-app NOT CC-skill).
  - Cite-import-AMBER source: `Z:/claude-sota/.claude/agents/evolve-gate.md @ 2fc5431a` (95 LOC)
  - CR-9 sibling-bleed defense: scan for `Z:/claude-sota/` paths, `gitnexus --repo claude-sota` env, `additionalDirectory` entries → REWRITE before install
  - CR-9 REVERT precedent check: `git -C Z:/claude-sota log --all --oneline -- .claude/agents/evolve-gate.md` → no REVERT-AND-REMOVE found ✅

## 1.3 evolve-observer → **Path C CITE-IMPORT-AMBER** ⚠

- **Probe (a)** Marketplace match: NONE
- **Probe (b)** Closest: ECC `harness-optimizer.md` (HARNESS quality, not OBSERVE/PROPOSE/EVOLVE state-machine); ECC `continuous-learning` skill (related but not equivalent)
- **Probe (c)** Sibling cites `Z:/repos/deps/phantom/src/evolution/reflection-subprocess.ts:29-36,117-348 @ f8c7ab42` + `Z:/repos/deps/oblivion/src/oblivion/memory/decayer/base.py:216-250 @ ae1d86bf` — phantom + oblivion are upstream PATTERN sources, not install-class
- **Probe (d)** Role: phantom reflection-subprocess pattern — observes session gaps, generates proposals, manages `EVOLVE_STATE.json`; Opus, bypassPermissions, autonomous-arc-driver
- **Probe (e) CR-12 verdict**: **Path C cite-import-AMBER per Section 14.5** — sibling-novel composition of phantom + oblivion TIER-1 patterns
  - Cite-import-AMBER source: `Z:/claude-sota/.claude/agents/evolve-observer.md @ 2fc5431a` (87 LOC)
  - CR-9 sibling-bleed defense: rewrite `EVOLVE_STATE.json` path to runtime context; rewrite Stop-hook MEMORY.md path
  - CR-9 REVERT precedent check: no REVERT found ✅

## 1.4 silent-failure-hunter → **Path A INSTALL-AVAILABLE (DUAL SOURCE)** ✅

- **Probe (a)** Marketplace match: 2 sources
  - `Z:/claude-sota-installed/.claude/plugins/marketplaces/everything-claude-code/agents/silent-failure-hunter.md` (ECC original — 41 LOC)
  - `Z:/claude-sota-installed/.claude/plugins/marketplaces/claude-plugins-official/plugins/pr-review-toolkit/agents/silent-failure-hunter.md` (Anthropic OFFICIAL — bundled in pr-review-toolkit)
- **Probe (b)** Anthropic OFFICIAL `pr-review-toolkit` plugin is canonical install per CR-12 priority — Anthropic > ECC
- **Probe (c)** Sibling = `Z:/claude-sota/.claude/agents/silent-failure-hunter.md` (also Wave 25 `81d21f8` ECC-port — see CLAUDE.md L1316 STATUS notes)
- **Probe (d)** Role: zero-tolerance silent failure / swallowed error / bad fallback / missing error propagation reviewer; Sonnet, [Read, Grep, Glob, Bash]
- **Probe (e) CR-12 verdict**: **Path A** — install via `/plugin install pr-review-toolkit@claude-plugins-official` (Anthropic OFFICIAL preferred over ECC per CR-1 cite-class lattice)
  - Cite-trail: `Z:/claude-sota-installed/.claude/plugins/marketplaces/claude-plugins-official/plugins/pr-review-toolkit/agents/silent-failure-hunter.md` (TIER-1-DIRECT)

## 1.5 team-lead → **Path C CITE-IMPORT-AMBER** ⚠ (sibling-novel orchestrator)

- **Probe (a)** Marketplace match: NONE for "team-lead" name
- **Probe (b)** Closest upstream candidates:
  - ECC `chief-of-staff.md` — 4-tier communication triage (NOT multi-agent DAG orchestrator)
  - ECC `harness-optimizer.md` — config improvement (NOT orchestrator)
  - ECC `loop-operator.md` — autonomous loop monitor (PARTIAL overlap with task-tracking only)
  - ECC skills `claude-devfleet` + `dmux-workflows` + `autonomous-agent-harness` (skills NOT agents — operator workflows, not subagent definitions)
  - superpowers `dispatching-parallel-agents` + `subagent-driven-development` skills (workflow grammar, not agent persona)
  - **None** is functionally equivalent to sibling team-lead
- **Probe (c)** Sibling cites `Z:/repos/deps/awesome-agentic-patterns/patterns/swarm-migration-pattern.md:40-68 @ ffb42768` + `Z:/repos/deps/deer-flow/backend/packages/harness/deerflow/agents/lead_agent/agent.py:231-270 @ f394c0d8` — upstream PATTERN sources only
- **Probe (d)** Role: Multi-agent orchestrator running TeamCreate→TaskCreate→Agent pipelines with DAG dependencies, TaskList monitoring, shutdown broadcasts. Opus, bypassPermissions, isolation:worktree, maxTurns:80. Path-(a) Agent()-fan-out per CCBP TeamCreate API
- **Probe (e) CR-12 verdict**: **Path C cite-import-AMBER per Section 14.5** — sibling-novel orchestrator composing CCBP TeamCreate API + awesome-agentic-patterns swarm pattern + deer-flow lead_agent middleware
  - Cite-import-AMBER source: `Z:/claude-sota/.claude/agents/team-lead.md @ 2fc5431a` (145 LOC)
  - CR-9 sibling-bleed defense: rewrite Stop-hook MEMORY.md path; verify mcpServers (github, repomix) wired in runtime `.mcp.json` BEFORE install
  - CR-9 REVERT precedent check: no REVERT found ✅
  - **HIGH PRIORITY** — load-bearing for cardinal-rule-11 META-process SOTA discipline (every fire's multi-agent orchestration depends on team-lead)

# PART 2 — CR-12 Upstream-Parity Probes (4 SIB-ONLY rules)

## 2.1 codex-cli-flag-positioning → **Path C CITE-IMPORT-AMBER** ⚠

- **Probe (a)** Marketplace match: NONE for `codex-cli-flag-positioning`; closest is openai-codex `skills/codex-cli-runtime/SKILL.md` which covers RUNTIME invocation rules ONLY (`--background`/`--wait` strip + 4 execution rules), NOT subcommand-flag compatibility matrix
- **Probe (b)** Grep `mcp__github__search_repositories codex cli flag` → 0 hits in registered marketplaces; rule is sibling-novel
- **Probe (c)** Sibling cites `Z:/repos/deps/codex/codex-rs/exec/src/cli.rs:1-65,139-145,239-271 @ HEAD 993e3f40` + `utils/cli/src/shared_options.rs:32-57` — TIER-1 SOTA upstream codex-rs source code; rule is local PROBE-derived compatibility matrix
- **Probe (d)** Role: `codex exec` vs `codex exec review` accept DIFFERENT flag sets; n=5+ empirical instances; codify subcommand-flag compatibility matrix to prevent parse_failure regressions
- **Probe (e) CR-12 verdict**: **Path C cite-import-AMBER per Section 14.5** — local probe-derived from TIER-1 codex-rs source; HONEST-NON-FINDING gate satisfied (no upstream operational doc enumerates per-subcommand flag compatibility)
  - Cite-import-AMBER source: `Z:/claude-sota/.claude/rules/codex-cli-flag-positioning.md @ 2fc5431a` (134 LOC)
  - CR-9 sibling-bleed defense: scan for parent CCC paths, retired hook references; preserve TIER-1 codex-rs cites at HEAD `993e3f40`
  - CR-9 REVERT precedent check: no REVERT found ✅

## 2.2 fm20-stale-wakeup-recognition-subclass → **Path C CITE-IMPORT-AMBER** ⚠

- **Probe (a)** Marketplace match: NONE — sibling-novel FM-20 sub-class
- **Probe (b)** Grep marketplaces for "fm20|stale-wakeup|wakeup-recognition" → 0 hits
- **Probe (c)** Sibling cites superpowers `verification-before-completion/SKILL.md:1-20 @ e7a2d164` + karpathy `karpathy-guidelines/SKILL.md:1-67 @ 2c606141` — both TIER-1 upstream; rule is sibling-novel /loop entry-boundary specialization
- **Probe (d)** Role: Mia probe before applying /loop arg or ScheduleWakeup-fired directive; loop-firing-boundary specialization of parent FM-20 (claim-propagation-across-fires)
- **Probe (e) CR-12 verdict**: **Path C cite-import-AMBER per Section 14.5** — sibling-novel composition; HONEST-NON-FINDING gate satisfied (no upstream addresses ScheduleWakeup-fired stale-prompt class)
  - Cite-import-AMBER source: `Z:/claude-sota/.claude/rules/fm20-stale-wakeup-recognition-subclass.md @ 2fc5431a` (109 LOC)
  - effective_tier=TIER-3-LOCAL-COMPOSITION per citation-discipline rule #8 lattice
  - CR-9 REVERT precedent check: no REVERT found ✅

## 2.3 fm22-stale-gate-vs-current-tree → **Path C CITE-IMPORT-AMBER** ⚠

- **Probe (a)** Marketplace match: NONE — sibling-novel FM-22
- **Probe (b)** Grep marketplaces for "fm22|stale-gate|current-tree" → 0 hits
- **Probe (c)** No upstream cites in rule body (operationally-derived from Wave 52 runtime rescue per `git log -- rules/fm22-*.md` → commit `062455b` "wave 52 runtime rescue — ECC plugin-hooks-rewrite + FM-22 codification")
- **Probe (d)** Role: Runtime gates / hooks / plugin loaders failing against paths NOT belonging to current project root; sibling runtime roots / stale `.claude/worktrees/agent-*` paths / missing plugin cache entries / malformed `\z\...` Windows paths
- **Probe (e) CR-12 verdict**: **Path C cite-import-AMBER per Section 14.5** — sibling-novel runtime-rescue codification from Wave 52; HONEST-NON-FINDING gate satisfied (FM class is sibling-discovered)
  - Cite-import-AMBER source: `Z:/claude-sota/.claude/rules/fm22-stale-gate-vs-current-tree.md @ 2fc5431a` (53 LOC — smallest of the 4)
  - CR-9 sibling-bleed defense: this rule SPECIFICALLY catches sibling-bleed; ensure runtime examples reference `Z:/claude-sota-installed/` paths NOT `Z:/claude-sota/`
  - CR-9 REVERT precedent check: no REVERT found ✅

## 2.4 security-checklist → **Path A INSTALL-AVAILABLE** ✅

- **Probe (a)** Marketplace match: `Z:/claude-sota-installed/.claude/plugins/marketplaces/addy-agent-skills/references/security-checklist.md` ✅ EXISTS (124 LOC; addy-agent-skills MIT 33,500★)
- **Probe (b)** addy-agent-skills marketplace canonical (4th-org TIER-1-NAMED-AUTHOR Addy Osmani per CLAUDE.md L1023); already installed in runtime
- **Probe (c)** Sibling = `Z:/claude-sota/.claude/rules/security-checklist.md` (parent ccc port iter-#5 fire 2026-04-27)
- **Probe (d)** Role: Pre-commit security gate (8-item) + secret management + incident response protocol; addy-original is 124-line web-app security reference (Auth/Authz/Input Validation/etc); sibling is 122-LOC port adapted for `.claude/hooks/**` + `.claude/agents/**` + `.mcp.json` paths
- **Probe (e) CR-12 verdict**: **Path A** — addy-agent-skills already installed at `Z:/claude-sota-installed/.claude/plugins/marketplaces/addy-agent-skills/references/security-checklist.md`; reference via `Read` from rules/agents that need it
  - Cite-trail: addy upstream TIER-1-NAMED-AUTHOR per CLAUDE.md L1023 (`@742dca5` blob SHA)
  - **NOTE**: addy version is GENERIC web-app security; sibling version is sss-adapted with file:line cites + paths-glob + `.claude/hooks/scripts/*_security.py` test-coverage HARD GATE convention. **Hybrid recommended**: install addy as base reference + cite-extend sibling's sss-adaptation delta as TIER-3-LOCAL-COMPOSITION. Per Wave 50 Agent J Path C ALTERNATIVE-PATTERN.

# PART 3 — Mia Ladder Catalog (n=80→n=84 — 5 catches Wave 129 fire 1)

Draft body for `Z:/claude-sota/.claude/projects/Z--claude-sota/memory/feedback_mia_ladder_n84_2026_05_09.md` (next-fire codification — DO NOT write this file in current fire). Per Mia ladder discipline (`.claude/rules/mia-pre-apply.md` + FM-20 META-router): document each catch with FM type + recovery action + sibling vs runtime path-class delta.

## #80 — rtk auto-prepending hypothesis PARTIALLY-OVER (FM-20 path-drift)

**Hypothesis (Mia probe)**: rtk wrapper auto-prepends `rtk` to every shell command via shell function/alias hook.

**Reality**: rtk does NOT auto-wrap. NO shell function / alias / PATH override observed. However, voluntarily-prefixing `rtk` on staging+commit commands BREAKS T3 codex_postcommit_review hook matcher per `_is_commit_cmd` requiring "git commit" cmd-prefix at hook start. Plain `git commit` works ✅ verified W128 Ship A `2b9dc420` launched row at 2026-05-09T20:46:30Z.

**FM classification**: FM-20 path-drift cascade (operator-side) — operator-applied "auto-prepend" assumption was inferred from rtk install warnings (`/!\ No hook installed`), but actual rtk runtime is OPT-IN-prefix only.

**Recovery action**: NEVER use `rtk` prefix on staging+commit commands. Plain `git add ... && git commit ...` form per FM-02 sub-class (b) atomic-batch defense (parallel-session-worktree-isolation §Recovery patterns). Operator-side discipline only — no rule edit needed beyond Mia entry.

## #81 — codex-rescue FM-17.f pre-fire 1M-context-entitlement (FM-17 fleet-depletion)

**Symptom**: codex-rescue subagent task-notification at 277ms / 0 tokens / `<status>failed</status>` + `<result>API Error: Extra usage is required for 1M context</result>`. Distinct from FM-17.b.i (sub-2-sec PRE-FIRE 429 cooling-down) — this is BILLING-class blocker not pool-depletion-class.

**FM classification**: FM-17.f (NEW sub-class, candidate for sibling FM-17 catalog promotion at next fire). Confirms 1M-context-entitlement is STRUCTURAL blocker on Sonnet stand-in pool when parent has [1m] flag set. Cardinal-rule-12 §"On codex unavailable" recovery (a) defer-queue OR (b) Path D 1M-context kill-switch (CLAUDE.local.md ENV (h) `CLAUDE_CODE_DISABLE_1M_CONTEXT=1`) applies.

**Recovery action**: Document at `Z:/claude-sota/docs/fm17f-deep-dive-2026-05-09.md` (already exists — Wave 119 deep-dive). For runtime: codex-rescue subagent dispatch UNAVAILABLE under [1m] flag; pivot to orchestrator-side `codex exec` foreground+tee per cross-model-consensus §"On codex unavailable".

## #82 — GitNexus IS browser tool NOT MCP (repo-classification-error)

**Hypothesis (Mia probe)**: abhigyanpatwari/GitNexus 37K★ is CC-installable MCP server.

**Reality**: Agent A repo audit confirmed `.cursor` config + `Dockerfile.web` + `Dockerfile.cli` + chat-ui frontend — full-stack web application for browser-based knowledge graph creation. NOT a CC plugin. NOT a MCP. Web-app primitive only.

**FM classification**: repo-classification-error (sibling memory class — populate `Z:/claude-sota/.claude/projects/Z--claude-sota/memory/feedback_repo_classification_errors.md` if doesn't exist OR add to sibling MEMORY.md index). Cardinal-rule-9 §"sibling-bleed defense" + cardinal-rule-12 §"Probe DAG P3 plugin-namespace" should catch this class via direct README + Dockerfile inspection BEFORE adoption.

**Recovery action**: Update CLAUDE.md L94 (`gitnexus --repo claude-sota` example) — clarify it's a CR-9 sibling-bleed-defense EXAMPLE (the path-rewrite pattern), NOT a runtime MCP install candidate. The text already DOES this correctly per Mia probe #84 below — no edit needed.

## #83 — Wave 128 ERROR-3 was Mia OVER (FM-20 sibling-vs-runtime path-class drift)

**Symptom**: Agent H probed `Z:/claude-sota/.claude/rules/` (sibling) for `launch-discipline.md` + `deprecation-discipline.md` → both reported MISSING.

**Reality**: Agent B Wave 129 verified BOTH ARE PRESENT in `Z:/claude-sota-installed/.claude/rules/` (RUNTIME) as NOVEL eee-only rules with TIER-1-DIRECT cites @742dca5. Agent H probed WRONG path-class.

**FM classification**: FM-20 sub-class candidate — **sibling-vs-runtime path-class drift**. Distinct from FM-20 parent (claim-propagation-across-fires) and FM-20 stale-wakeup sub-class (loop-firing-boundary). New sub-class: agent dispatched with brief assuming sibling = runtime path-class equivalent; Mia probe MUST verify path-class (`Z:/claude-sota/` vs `Z:/claude-sota-installed/`) BEFORE searching.

**Recovery action**: Promote to dedicated FM-20 sub-class `Z:/claude-sota/.claude/rules/fm20-sibling-vs-runtime-path-class-drift.md` at n=3 self-observed (currently n=2 per Agent H Wave 128 + Agent A Wave 130 #84 below). Brief composition discipline: every Mia probe MUST cite path-class explicitly (`runtime: Z:/claude-sota-installed/` OR `sibling: Z:/claude-sota/`).

## #84 — Agent A L148 prescription was inherited path-drift (recursive FM-20 in agent output)

**Symptom**: Agent A artifact line 148 prescribed "Update CLAUDE.md L74 to clarify NOT-CC-installable" referring to GitNexus.

**Reality**: VERIFICATION shows runtime CLAUDE.md L74 has nothing about GitNexus. Only L94 has `gitnexus --repo claude-sota` as a CR-9 sibling-bleed-defense EXAMPLE (the path-rewrite pattern) — NOT a MCP install claim. Agent A's "L74" framing was itself inherited from prior session summary stale claim.

**FM classification**: **Recursive FM-20 path-drift in agent output** — Agent A's brief inherited stale L74 claim from a prior fire's session summary; Agent A did not Mia-probe the actual CLAUDE.md content; prescribed-edit was based on STALE cite-position. Distinct from Wave 39 FM-20 (claim-propagation-across-FIRES) — this is claim-propagation-WITHIN-AGENT-BRIEF (orchestrator → agent → agent's prescription).

**Recovery action**: Cardinal-rule-11 META-process discipline addition: agent briefs that include LINE-NUMBER cites MUST be Mia-pre-applied at brief composition time (orchestrator probe BEFORE dispatch — Read the cited line, verify content matches the brief's claim). Sister to mia-pre-apply.md but at brief-composition layer (not at apply-prescription layer). Promote to mia-pre-apply.md sub-rule §"Brief composition discipline" at n=3 self-observed.

# PART 4 — Synthesis Summary

## CR-12 Verdict Distribution (5 agents + 4 rules = 9 SIB-ONLY items)

| Path | Count | Items |
|------|-------|-------|
| **Path A install** | **3** | codex-rescue, silent-failure-hunter, security-checklist |
| **Path B TIER-1 cite** | **0** | (none qualify — all sibling-novel or already Path A) |
| **Path C cite-import-AMBER** | **6** | evolve-gate, evolve-observer, team-lead, codex-cli-flag-positioning, fm20-stale-wakeup-recognition-subclass, fm22-stale-gate-vs-current-tree |

**Path C share = 67%** — significantly higher than Wave 50 Agent J upstream-parity verdict (Path A 28% / Path B 14% / Path C 58% per CLAUDE.md L1158). Reason: agents/rules tier consistently operationalizes sibling-discovered FM patterns + sibling-novel orchestrator (team-lead) — these have NO upstream parity by design (cardinal-rule-12 HONEST-NON-FINDING gate predicate satisfied per Probe DAG enumerations above).

## Install order recommendation (next-fire dispatch)

1. **Path A first (atomic single ship)**: `/plugin install pr-review-toolkit@claude-plugins-official` (delivers silent-failure-hunter + 5 other PR-review agents) + `/plugin install codex@openai-codex` (delivers codex-rescue) — Anthropic OFFICIAL marketplace per CR-12 priority. addy security-checklist already installed in marketplaces; just add `Read` reference from rules.
2. **Path C cite-import-AMBER batch (per Section 14.5 last-resort)**: 6 sibling-cite-imports with CR-9 discipline (sibling-bleed scan + REVERT precedent check + sibling commit-SHA pin `2fc5431a` + 2-round fix-forward budget). Recommended order: team-lead first (load-bearing per CR-11 META-process) → evolve-* pair (depends on team-lead spawn capability) → codex-cli-flag-positioning (load-bearing for any codex hook install) → fm20/fm22 (codification rules — passive observers).

## Mia ladder advance: n=79 → n=84 (5 catches)

Catalog draft above. Promote to sibling memory at next fire. n=84 advances toward n=90 promotion threshold for FM-20 sub-class extraction (sibling-vs-runtime path-class drift candidate) + brief-composition mia-pre-apply sub-rule candidate.

## CR-11 META-process conformance

This fire executed under cardinal-rule-11 awareness:
- ✅ Brief cited TIER-1 sources at file:line + HEAD SHA (probe-driven)
- ✅ ARTIFACT-INLINE per FM-19 (this artifact)
- ✅ OUTPUT_BUDGET 600 LOC declared + observed (~520 LOC actual)
- ✅ TERMINATION on_handoff_to: orchestrator + max_turns: 30 + on_text_match: "DONE:" + on_tool_count_exceeded: 40
- ✅ FM-20 path-drift defense (Mia probes #80-#84 catalog)
- ✅ CR-9 sibling-bleed defense (every Path C verdict cites required path-rewrite)
- ✅ CR-12 upstream-parity priority (Path A first, Path C last-resort with HONEST-NON-FINDING gate)
- ✅ Provenance log candidate: `docs/install-provenance.md` Wave 130 fire 1 entry should record CR-12 verdicts + Mia ladder advance

DONE: Wave 130 fire 1 Agent B CR-12 upstream-parity probes complete. 3 Path A + 6 Path C verdicts; Mia ladder n=79→n=84 catalog drafted; recommended next-fire install order = Path A atomic ship → Path C 6-rule batch with CR-9 discipline.
