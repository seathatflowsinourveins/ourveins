# Agent C Final Architecture Decision: SOTA-Pure Runtime

Date: 2026-05-14
Target: `Z:/claude-sota-pure/`
Decision scope: Option A vs Option B production posture and implementation plan.

VERDICT: choose Option A for production now; build Option B as a parallel evaluation runtime.

## Inputs Read

1. Agent B: `sota-pure-codex-B-2026-05-14.md`
2. Agent A: `sota-pure-research-A-report-2026-05-14.md`
3. Background partial output: `tasks/a14c467e1646b3821.output`, first 200 lines

Background conflict check: no conflicting content was present in the first 200 lines; the file produced no readable conflict evidence.

## Final Decision

Option A remains the operational runtime.

Option B should be built immediately as a clean upstream-sourced runtime, but it should not replace Option A until its plugin, MCP, context, review, and orchestration surfaces pass smoke tests.

This is not a rejection of Option B. It is a staged adoption decision: Option B has the better long-term architecture if it stays genuinely upstream-sourced, but it is not yet a proven parity runtime.

## Rationale

### Option A Strengths

Option A has already shipped major cold-load reduction and operational narrowing.

Agent A: Option A vs Option B says Option A already has proven local behavior and cold-load reduction results.

Agent B: Top-level verdict says the four-starter pure set is a good clean bootstrap but not sufficient for complete coverage.

Option A currently has working surfaces that Option B still needs to prove:

- Graph memory and semantic memory are already present.
- Context continuity and review workflows already exist.
- Code intelligence and MCP breadth are already installed.
- Commit and review gates are already wired locally.
- W197 reduced cold-load pressure substantially.

The main Option A debt is not capability. It is provenance and complexity: about 100 rule files, inherited patterns, and complicated cite chains make the runtime harder to audit and easier to drift.

### Option B Strengths

Option B has the cleaner architectural direction:

- zero local invented rules, skills, agents, or hook scripts;
- runtime behavior sourced from plugin marketplaces, upstream MCPs, and official Claude Code settings;
- smaller bootstrap surface;
- easier audit trail per installed primitive;
- lower long-term maintenance if the plugin ecosystem covers the needed behavior.

Agent A: Final Recommendation says to build `Z:/claude-sota-pure/`, keep local files limited to manifests/settings/MCP selection, install the top five additions, and use smoke-test results as the promotion gate.

Agent B: Q7 Risk assessment says zero local agents/rules/skills is valid, but the bootstrap must explicitly declare marketplace, plugin, MCP, and environment choices.

### Option B Blocking Gaps

The starter four marketplaces are not a complete runtime.

Agent B: Q1 Coverage gap analysis finds missing MCP fleet, auto-compaction policy, full review hook chain, broad specialist agents, runtime hardening, observability, semantic navigation, and memory strategy.

Agent B: Q5 Cross-model review hook chain rejects the claim that `codex@openai-codex` wires the whole installed review chain by itself.

Agent B: Q4 Multi-agent orchestration says `agent-orchestration` alone is not enough; `agent-teams` and focused upstream plugins are needed.

Agent B: Q2 Auto-compact mechanism finds no starter plugin that provides a complete quality-aware proactive compaction primitive; official env controls and context continuity plugins are the closest upstream path.

Agent A: Agent B Gap Synthesis agrees that MCP parity, context continuity, orchestration breadth, review depth, hardening, telemetry, memory, and semantic code navigation are outside the four-starter seed.

## Reconciled Position

Option A is the correct production runtime today because it is already operational and has recently reduced cold-load cost.

Option B is the correct architectural destination if the operator accepts these constraints:

- "pure" means upstream-sourced, not Anthropic-only.
- local files may select and configure upstream primitives, but must not implement replacement behavior.
- gaps without upstream primitives must be documented as gaps, not filled with copied local policies.
- command-driven review can substitute for some local hook behavior only if that reduced automation is accepted explicitly.
- MCPs are first-class runtime dependencies and must be pinned or cited before parity claims.

## Decision Matrix

| Axis | Option A | Option B |
|---|---:|---:|
| Current production readiness | High | Medium-low |
| Proven capability breadth | High | Medium |
| Cold-load simplicity | Improved, still complex | High if kept pure |
| Proven MCP parity | High | Not yet |
| Proven review gate parity | High | Not yet |
| Proven orchestration breadth | High | Not yet |
| Auditability | Medium | High |
| Long-term maintainability | Medium | High if no local invention |
| Migration risk | Low | Medium-high |

Final ranking:

1. Production now: Option A.
2. Strategic build: Option B.
3. Promotion only after smoke gates pass.

## Option B Implementation Plan

### Phase 0: Bootstrap Boundary

Create `Z:/claude-sota-pure/` with only:

- `CLAUDE.md` as a manifest;
- minimal `.claude/settings.json`;
- `.mcp.json`;
- launcher/env wrapper if needed;
- install provenance log;
- no copied local rules, agents, skills, or hook scripts from Option A.

Allowed local content:

- marketplace registrations;
- plugin install commands;
- MCP server registrations;
- environment toggles;
- trust/license notes;
- smoke-test checklist.

Disallowed local content:

- copied Option A hook scripts;
- copied Option A agent files;
- copied Option A skill files;
- copied Option A rule chains;
- locally invented lifecycle gates.

### Phase 1: Starter Marketplaces

Register the clean seed marketplaces:

```text
/plugin marketplace add anthropics/claude-plugins-official
/plugin marketplace add wshobson/agents
/plugin marketplace add addyosmani/agent-skills
/plugin marketplace add openai/codex-plugin-cc
```

Add the required continuation marketplace:

```text
/plugin marketplace add mksglu/context-mode
```

Optional but recommended because Agent A includes it as a starter-level primitive:

```text
/plugin marketplace add obra/superpowers
```

### Phase 2: Core Plugin Installs

Install baseline command, context, review, and method plugins:

```text
/plugin install codex@openai-codex
/plugin install context-mode@context-mode
/plugin install superpowers@superpowers
/plugin install agent-skills@addy-agent-skills
/plugin install agent-teams@claude-code-workflows
/plugin install comprehensive-review@claude-code-workflows
/plugin install ralph-loop@claude-plugins-official
```

Agent A: Top-5 Additional Plugins/MCPs identifies `context-mode`, `agent-teams`, `comprehensive-review`, `ralph-loop`, and the MCP baseline pack as the highest-priority additions.

Agent B: Q3 Auto-proceed / Stop-hook auto-continue says `ralph-loop` is the closest official plugin equivalent for bounded Stop-hook iteration, while `codex@openai-codex` is review gating rather than generic continuation.

### Phase 3: Environment Settings

Use official settings/env surfaces rather than local hook invention:

```powershell
$env:CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS = "1"
$env:CLAUDE_AUTOCOMPACT_PCT_OVERRIDE = "50"
```

Agent A: Fresh Bootstrap content recommends these toggles.

Agent B: Q2 Auto-compact mechanism says the official auto-compact env setting is the closest available upstream primitive, while `context-mode` provides continuity rather than a quality-aware trigger.

### Phase 4: MCP Baseline

Register MCPs in two waves.

HTTP first:

- GitHub MCP
- Context7
- DeepWiki

Local stdio second:

- Playwright MCP
- Repomix
- Serena
- GitNexus

Agent A: MCP Baseline Pack says this closes the largest Agent B gap.

Agent B: Q1 Coverage gap analysis says the starter plugins do not install the current MCP fleet.

Optional second wave:

- memory MCP;
- temporal graph memory;
- Phoenix or equivalent observability.

These should be added only after the baseline MCPs smoke cleanly, unless the first workload requires them.

### Phase 5: Hardening Plugins

Install after baseline behavior is stable:

```text
/plugin install protect-mcp@claude-code-workflows
/plugin install review-agent-governance@claude-code-workflows
/plugin install hookify@claude-plugins-official
```

Agent A: Secondary Additions marks these as useful but policy-bearing.

Do not use these to recreate the full Option A local hook chain unless an upstream plugin owns the behavior.

### Phase 6: Workload-Specific Plugins

Demand-load workload plugins instead of installing a maximal agent catalog:

```text
/plugin install python-development@claude-code-workflows
/plugin install javascript-typescript@claude-code-workflows
/plugin install backend-development@claude-code-workflows
/plugin install frontend-mobile-development@claude-code-workflows
/plugin install security-scanning@claude-code-workflows
/plugin install incident-response@claude-code-workflows
```

Agent B: Q4 Multi-agent orchestration recommends installing focused upstream `wshobson/agents` plugins by need rather than hand-coding a large agent directory.

### Phase 7: Smoke Gates

Option B cannot be promoted until these pass:

1. Plugin registry shows all required plugins installed.
2. `codex@openai-codex` status and review command work.
3. `context-mode` status works and persists/restores context state.
4. `agent-teams` loads with the experimental team setting enabled.
5. `comprehensive-review` command runs on a small repo.
6. `ralph-loop` runs with a finite iteration cap and exits on completion.
7. GitHub, Context7, and DeepWiki MCPs respond.
8. Playwright MCP launches and can inspect a page.
9. Repomix can pack a test repo.
10. Serena can start and expose code-navigation tools.
11. GitNexus can index or report status for a test repo.
12. Secrets are absent from tracked files.
13. License/trust notes exist for every third-party primitive.
14. Install provenance records plugin version, repo, and HEAD or package version.

### Phase 8: Promotion Criteria

Promote Option B only when all are true:

- all Phase 7 smoke gates pass;
- no local copied rules, hooks, skills, or agents exist;
- MCP state and secrets live outside tracked repo files;
- every non-Anthropic primitive has explicit trust and license notes;
- missing review-hook parity is either closed by upstream plugins or accepted as a deliberate command-driven workflow change;
- memory and observability strategy is chosen and smoke-tested;
- Option B completes at least one real engineering task with review and context recovery.

## What Not To Claim

Do not claim Option B is complete after installing only the four starter marketplaces.

Do not claim full review hook parity from `codex@openai-codex` alone.

Do not claim Anthropic-only purity if using third-party plugin marketplaces.

Do not claim quality-aware proactive compaction unless an upstream primitive actually provides it.

Do not claim MCP parity until every baseline MCP is registered and smoke-tested.

## Final Recommendation

Keep `Z:/claude-sota-installed/` as production.

Build `Z:/claude-sota-pure/` now as a measured parallel runtime.

Treat Option B as successful only if it stays upstream-sourced and passes smoke gates. If a gap has no upstream primitive, document the gap or accept reduced behavior; do not recreate Option A's local policy layer inside the pure runtime.
