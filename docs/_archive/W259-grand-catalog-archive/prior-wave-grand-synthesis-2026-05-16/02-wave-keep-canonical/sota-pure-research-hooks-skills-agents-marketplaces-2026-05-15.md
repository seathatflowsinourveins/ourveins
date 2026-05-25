# SOTA Research — Hooks + Skills + Agents + Plugin Marketplaces for Z:\claude-sota-pure

**Date**: 2026-05-15 | **Scope**: TIER-1 / TIER-2 upstream-SOTA sources ONLY (excludes sibling Z:/claude-sota + Z:/claude-sota-installed which are TIER-3-LOCAL-OPERATOR-DERIVED) | **Audit method**: filesystem probe of `Z:/repos/deps/` + marketplace.json + plugin.json + frontmatter reads.

---

## PART A — HOOKS

### A.1 Anthropic OFFICIAL — cwc-long-running-agents (TIER-1-DIRECT)

**Source**: `Z:/repos/deps/cwc-long-running-agents @ HEAD ffd563d` + companion `https://github.com/anthropics/cwc-long-running-agents`. Native install at `.local/cwc/`.

`claude-code-config/.claude/settings.json` declares **5 hook primitives** (the canonical cwc-long-running-agents harness):

| ID | Event | Matcher | Purpose | Cite |
|---|---|---|---|---|
| kill-switch.sh | PreToolUse | `*` | Operator emergency stop / mid-run abort | `settings.json:6` |
| steer.sh | PreToolUse | `*` | Mid-run steering / course-correction injection | `settings.json:7` |
| track-read.sh | PreToolUse | `Read` | Reading-trace audit log | `settings.json:14` |
| verify-gate.sh | PreToolUse | `Write\|Edit` | **Default-FAIL contract** — gate writes through evaluator | `settings.json:20` |
| commit-on-stop.sh | Stop | (any) | Auto-commit on session-end / handoff to PROGRESS.md | `settings.json:27` |

All 5 are **shell scripts** (not JSON-embedded Node closures like ECC) — minimal-LOC + auditable + ZERO plugin-cache resolution complexity. CR-1 + CR-8 conformance: TIER-1-DIRECT Anthropic OFFICIAL. **INSTALL-PRIORITY: P0** (foundation).

### A.2 CCBP — 27 Official Hook Events Reference (TIER-1-DIRECT authority)

**Source**: `Z:/repos/deps/claude-code-best-practice-shan/.claude/hooks/HOOKS-README.md @ HEAD 48f2ceb` (TIER-1 shanraisshan independent-named-T1 contributor — distinct org from Anthropic).

Enumerates all **27 CC hook events** with timeout / async / options + 4 handler types (`command` / `prompt` / `agent` / `http`) + matcher semantics + decision-control patterns. Hook events (numbered per HOOKS-README.md table):

1. PreToolUse · 2. PermissionRequest · 3. PostToolUse · 4. PostToolUseFailure · 5. UserPromptSubmit · 6. Notification · 7. Stop · 8. SubagentStart · 9. SubagentStop · 10. PreCompact · 11. PostCompact · 12. SessionStart · 13. SessionEnd · 14. Setup · 15. TeammateIdle · 16. TaskCreated · 17. TaskCompleted · 18. ConfigChange · 19. WorktreeCreate · 20. WorktreeRemove · 21. InstructionsLoaded · 22. Elicitation · 23. ElicitationResult · 24. StopFailure · 25. CwdChanged · 26. FileChanged · 27. PermissionDenied.

**Key SOTA hook options** (per HOOKS-README.md L298-353):
- `async: true` — non-blocking background execution
- `asyncRewake: true` (v2.1.72+) — runs async BUT exits-with-code-2 wakes model with stderr injection (resolves perf-vs-quality binary)
- `timeout: <ms>` — kill-after threshold (default 5000 most events / 30000 Setup)
- `once: true` — fire only once per session (SessionStart / SessionEnd / PreCompact)
- `if: "Bash(git *)"` (v2.1.85+) — conditional pre-spawn (cuts process count)
- `statusMessage: "PreToolUse"` — custom spinner label

**Agent-frontmatter hooks** (v2.1.0+) support 6 events: PreToolUse / PostToolUse / PermissionRequest / PostToolUseFailure / Stop / SubagentStop.

**INSTALL-PRIORITY: P1** (foundation reference; informs every other hook ship).

### A.3 ECC HOOKS (TIER-1 named-author Affaan Mustafa MIT)

**Source**: `Z:/repos/deps/everything-claude-code/hooks/hooks.json` + `Z:/repos/deps/everything-claude-code/.claude-plugin/marketplace.json @ HEAD 841beea4`. v2.0.0-rc.1 — 48 agents, 182 skills, 68 commands, **16 hook handlers** across 7 events:

| ID | Event | Matcher | Async | Purpose |
|---|---|---|---|---|
| pre:bash:dispatcher | PreToolUse | `Bash` | sync | Bash preflight (quality + tmux + push + GateGuard) |
| pre:write:doc-file-warning | PreToolUse | `Write` | sync | Doc-file naming warning |
| pre:edit-write:suggest-compact | PreToolUse | `Edit\|Write` | sync | Suggest manual `/compact` at intervals |
| pre:observe:continuous-learning | PreToolUse | `*` | async/10s | Tool-use observation capture |
| pre:governance-capture | PreToolUse | `Bash\|Write\|Edit\|MultiEdit` | sync/10s | Secrets + policy event capture |
| pre:config-protection | PreToolUse | `Write\|Edit\|MultiEdit` | sync/5s | Block linter/formatter config mods |
| pre:mcp-health-check | PreToolUse | `*` | sync | MCP server health gate before MCP-tool exec |
| pre:edit-write:gateguard-fact-force | PreToolUse | `Edit\|Write\|MultiEdit` | sync/5s | Fact-forcing first-edit-per-file gate |
| pre:compact | PreCompact | `*` | sync | Save state before context compaction |
| session:start | SessionStart | `*` | sync | Bootstrap context + detect package manager |
| post:bash:dispatcher | PostToolUse | `Bash` | async/30s | Bash postflight (logs + PR + build notify) |
| post:quality-gate | PostToolUse | `Edit\|Write\|MultiEdit` | async/30s | Quality gate after file edits |
| post:edit:design-quality-check | PostToolUse | `Edit\|Write\|MultiEdit` | sync/10s | Warn frontend drift to generic template |
| post:edit:accumulator | PostToolUse | `Edit\|Write\|MultiEdit` | sync | Record JS/TS edits for batch fmt/typecheck at Stop |
| post:edit:console-warn | PostToolUse | `Edit` | sync | Warn `console.log` after edits |
| post:governance-capture | PostToolUse | `Bash\|Write\|Edit\|MultiEdit` | sync/10s | Governance event capture |
| post:session-activity-tracker | PostToolUse | `*` | sync/10s | Per-session metrics |
| post:observe:continuous-learning | PostToolUse | `*` | async/10s | Tool-use result observation |
| post:mcp-health-check | PostToolUseFailure | `*` | sync | Track failed MCP, mark unhealthy, reconnect |
| stop:format-typecheck | Stop | `*` | sync/300s | Batch Biome/Prettier + tsc on edited JS/TS |
| stop:check-console-log | Stop | `*` | sync | Console.log final check |
| stop:session-end | Stop | `*` | async/10s | Persist session state |
| stop:evaluate-session | Stop | `*` | async/10s | Extract reusable patterns |
| stop:cost-tracker | Stop | `*` | async/10s | Token + cost metrics |
| stop:desktop-notify | Stop | `*` | async/10s | Desktop notification with task summary |
| session:end:marker | SessionEnd | `*` | async/10s | Session end lifecycle marker |

All hooks dispatched via `plugin-hook-bootstrap.js` with multi-fallback `CLAUDE_PLUGIN_ROOT` resolution. **INSTALL-PRIORITY: P2** (post-foundation hook layer).

### A.4 superpowers + wshobson + karpathy hooks

- **superpowers @ HEAD e7a2d164** (Jesse Vincent v5.1.0): **NO hooks/ directory** — skills-only repo
- **wshobson-agents @ HEAD ece811f2** (Seth Hobson v1.6.0 MIT): **NO hooks/ directory** in core repo; per-plugin agents + skills only
- **andrej-karpathy-skills @ HEAD 2c606141** (forrestchang v1.0.0): **NO hooks/ directory** — 1 skill only

### A.5 disler/claude-code-hooks-mastery (catalog reference)

**Source**: `Z:/repos/deps/claude-code-hooks-mastery` (40K README.md + `apps/` + `ai_docs/`). Separate hook-pattern reference repo — STUDY-only, not a plugin marketplace.

### A.6 GAPS — Cross-model T1-T7 lifecycle hooks (Sibling-novel, no upstream parity)

The `codex_t1_consult_gate.py` / `codex_t2_pre_commit_gate.py` / `codex_postcommit_review.py` / `codex_prepush_review.py` / `codex_stop_review_gate.py` / `auto_proceed_gate.py` set has **no upstream SOTA equivalent**. These are sibling-novel (TIER-3-LOCAL-OPERATOR-DERIVED at Z:/claude-sota). For a pure-SOTA runtime, the choice is:
- **(a)** Cite-import-AMBER per CR-12 TERTIARY (sibling-novel discipline lacks upstream parity)
- **(b)** Build composition over cwc-long-running-agents primitive set (verify-gate.sh shape) + ECC pre:governance-capture + ECC pre:mcp-health-check — adapt these into a codex-gate variant

Recommendation: **(b)** — compose over cwc-long-running-agents shell-script + ECC dispatcher pattern; document the adaptation per cardinal-rule-1 cite-trail.

---

## PART B — SKILLS

### B.1 Anthropic OFFICIAL Skills (TIER-1-DIRECT — anthropics-skills repo)

**Source**: `Z:/repos/deps/anthropics-skills/.claude-plugin/marketplace.json` (Keith Lazuka klazuka@anthropic.com — Anthropic OFFICIAL). Marketplace: `anthropic-agent-skills` v1.0.0. **3 plugins / 17 skills**:

| Plugin | Skills |
|---|---|
| `document-skills` | xlsx, docx, pptx, pdf (4) |
| `example-skills` | algorithmic-art, brand-guidelines, canvas-design, doc-coauthoring, frontend-design, internal-comms, mcp-builder, skill-creator, slack-gif-creator, theme-factory, web-artifacts-builder, webapp-testing (12) |
| `claude-api` | claude-api (1) |

**ABSOLUTE INSTALL-PRIORITY P0** — these are the canonical Anthropic skill examples. `skill-creator` + `mcp-builder` + `webapp-testing` are load-bearing for any subsequent SOTA build.

### B.2 superpowers Skills (TIER-1 named-T1 Jesse Vincent — v5.1.0)

**Source**: `Z:/repos/deps/superpowers/.claude-plugin/marketplace.json` + `Z:/repos/deps/superpowers/skills/`. **14 skills**:

1. brainstorming · 2. dispatching-parallel-agents · 3. executing-plans · 4. finishing-a-development-branch · 5. receiving-code-review · 6. requesting-code-review · 7. subagent-driven-development · 8. systematic-debugging · 9. test-driven-development · 10. using-git-worktrees · 11. using-superpowers · 12. verification-before-completion · 13. writing-plans · 14. writing-skills.

**INSTALL-PRIORITY P1** — these are the cross-runtime canonical workflow skills (TDD + debugging + plan-execute-verify lifecycle).

### B.3 addy-agent-skills (TIER-1 named-T2 Addy Osmani — 38k+★ MIT)

**Source**: `Z:/repos/deps/addyosmani-agent-skills/.claude-plugin/marketplace.json` + `skills/`. **1 plugin "agent-skills" / 22 engineering-phase skills**:

1. api-and-interface-design · 2. browser-testing-with-devtools · 3. ci-cd-and-automation · 4. code-review-and-quality · 5. code-simplification · 6. context-engineering · 7. debugging-and-error-recovery · 8. deprecation-and-migration · 9. documentation-and-adrs · 10. doubt-driven-development · 11. frontend-ui-engineering · 12. git-workflow-and-versioning · 13. idea-refine · 14. incremental-implementation · 15. performance-optimization · 16. planning-and-task-breakdown · 17. security-and-hardening · 18. shipping-and-launch · 19. source-driven-development · 20. spec-driven-development · 21. test-driven-development · 22. using-agent-skills.

**Canonical TIER-1-NAMED-AUTHOR-QUOTE** for source-driven-development: *"Every framework-specific code decision must be backed by official documentation."* — `Z:/repos/deps/addyosmani-agent-skills/skills/source-driven-development/SKILL.md`. **INSTALL-PRIORITY P1**.

### B.4 Karpathy Skills (TIER-1 named-T1 Andrej Karpathy via forrestchang port)

**Source**: `Z:/repos/deps/andrej-karpathy-skills/.claude-plugin/marketplace.json` + `skills/karpathy-guidelines/`. **1 skill**: karpathy-guidelines — operationalizes 4 Karpathy principles (Think Before Coding / Simplicity First / Surgical Changes / Goal-Driven Execution).

**INSTALL-PRIORITY P1** — load-bearing for cardinal-rule-2.

### B.5 mattpocock-skills (TIER-1 named-T1 Matt Pocock — 48.8k★)

**Source**: `Z:/repos/deps/mattpocock-skills/skills/engineering/`. **10 engineering skills**: diagnose · grill-with-docs · improve-codebase-architecture · prototype · setup-matt-pocock-skills · tdd · to-issues · to-prd · triage · zoom-out.

**⚠ REJECT-FOR-FIT (Probe 5 mode-harness-shape)**: `setup-matt-pocock-skills` has `disable-model-invocation: true` + interactive setup prompts (issue tracker / triage labels / domain doc layout) — incompatible with autonomous /loop mode. Per ahfv-seven-sub-classes iter-92 codification. Other 9 skills (tdd / to-issues / to-prd / diagnose / etc.) are usable.

**INSTALL-PRIORITY P2** — install 9-of-10 skills; skip setup-matt-pocock-skills.

### B.6 vercel-labs/agent-skills (TIER-1 org Vercel Labs)

**Source**: `Z:/repos/deps/vercel-labs-agent-skills/skills/` + `packages/`. **8 skills**: composition-patterns · deploy-to-vercel · react-best-practices · react-best-practices-build · react-native-skills · react-view-transitions · vercel-cli-with-tokens · web-design-guidelines.

**INSTALL-PRIORITY P3** (frontend-focused — install only if React/Vercel surface in scope).

### B.7 ECC Skills (TIER-1 named-author Affaan Mustafa — 182 skills)

**Source**: `Z:/repos/deps/everything-claude-code/skills/` — too many to enumerate; highlights:

- **Agent orchestration**: claude-devfleet, dmux-workflows, autonomous-agent-harness, team-builder, agent-harness-construction, autonomous-loops, council, council-orchestrator
- **Continuous learning**: continuous-learning, continuous-learning-v2, continuous-agent-loop, cost-aware-llm-pipeline
- **GAN harness**: gan-evaluator, gan-generator, gan-planner
- **Token + context**: context-budget, benchmark, agent-eval, agent-sort, agent-introspection-debugging
- **Misc**: a11y-architect, brand-voice, browser-qa, ck (checkpoint), click-path-audit, codebase-onboarding, agent-payment-x402

**INSTALL-PRIORITY P1** — single plugin install covers 48 agents + 182 skills + 68 commands.

### B.8 wshobson Skills (TIER-1 named-T2 Seth Hobson — 150 skills across 79 plugins)

**Source**: `Z:/repos/deps/wshobson-agents/plugins/*/skills/`. Per-plugin granular install (cherry-pick). Top-priority plugins:

- agent-orchestration · agent-teams · conductor · context-management · review-agent-governance · comprehensive-review · tdd-workflows · debugging-toolkit · plugin-eval · protect-mcp · signed-audit-trails · git-pr-workflows · cicd-automation · deployment-validation · incident-response · security-scanning · observability-monitoring · documentation-standards · code-refactoring · codebase-cleanup · framework-migration · shell-scripting.

**INSTALL-PRIORITY P1-P2** — granular per-plugin install (operator picks 5-10).

### B.9 claude-code-plugins-plus-skills (community catalog)

**Source**: `Z:/repos/deps/claude-code-plugins-plus-skills/plugins/`. 18 plugin categories: ai-agency / ai-ml / api-development / business-tools / community / crypto / database / design / devops / examples / mcp / packages / performance / productivity / saas-packs / security / skill-enhancers / testing.

**INSTALL-PRIORITY P3** — community catalog; cherry-pick.

### B.10 GAPS (not in local deps — remote-only / install-time fetch)

- `alirezarezvani/claude-skills` (235 production-ready skills + 28 agents)
- `gsd-build/get-shit-done` (workflow reference, /gsd-graphify + /gsd-spike + /gsd-sketch)
- `Shubhamsaboo/awesome-llm-apps` (catalog only)
- `vinta/awesome-python` (catalog only)
- `ComposioHQ/awesome-claude-skills` (catalog only)
- `quemsah/awesome-claude-plugins` (catalog only)
- `hesreallyhim/awesome-claude-code` (catalog only)

---

## PART C — AGENTS

### C.1 Anthropic OFFICIAL Agents

- **CC built-ins** (per `https://code.claude.com/docs/en/sub-agents`): `general-purpose`, `Explore`, `Plan` + agent-tool first-class subagent dispatch
- **cwc evaluator.md** (TIER-1 Anthropic): Fresh-context evaluator — gates `verify-gate.sh` Default-FAIL contract
- **anthropic-cookbook/managed_agents/**: 7 production-grade agent notebooks (CMA_explore_unfamiliar_codebase + CMA_gate_human_in_the_loop + CMA_iterate_fix_failing_tests + CMA_operate_in_production + CMA_orchestrate_issue_to_pr + CMA_prompt_versioning_and_rollback + CMA_remember_user_preferences) + data_analyst_agent + slack_data_bot + sre_incident_responder
- **anthropic-cookbook/claude_agent_sdk/**: 5 reference agents (chief_of_staff_agent + observability_agent + research_agent + session_browser_demo + site_reliability_agent) — TIER-1 Python SDK examples

**INSTALL-PRIORITY P0** for managed_agents notebooks — direct reference for Tier-1 agent install.

### C.2 wshobson/agents (184 specialized agents)

Plugin-grouped. Key agents:

| Plugin | Agent | Model | Purpose |
|---|---|---|---|
| agent-orchestration | context-manager | opus | Multi-agent system optimization |
| agent-teams | team-lead | opus | Decompose work + manage team lifecycle + synthesis (Read/Glob/Grep/Bash) |
| agent-teams | team-implementer | opus | Parallel implementer (worktree-fit) |
| agent-teams | team-debugger | opus | Parallel debugger |
| agent-teams | team-reviewer | opus | Parallel reviewer (multi-dim) |
| conductor | conductor-validator | opus | Conductor (Context-Driven Development) setup validator |

**NO `isolation: worktree` field** in wshobson agent frontmatter (uses default isolation). For pure-SOTA on Windows: add `isolation: worktree` per CCBP claude-subagents.md SOTA pattern.

**INSTALL-PRIORITY P1** — granular per-plugin install.

### C.3 ECC 48 Agents

**Source**: `Z:/repos/deps/everything-claude-code/agents/`. Highlights:

- **Architecture**: architect, a11y-architect, code-architect, code-explorer
- **Build**: build-error-resolver, cpp-build-resolver, dart-build-resolver, go-build-resolver, java-build-resolver, kotlin-build-resolver, pytorch-build-resolver, rust-build-resolver
- **Review**: code-reviewer, cpp-reviewer, csharp-reviewer, database-reviewer, flutter-reviewer, go-reviewer, healthcare-reviewer, java-reviewer, kotlin-reviewer, python-reviewer, rust-reviewer, security-reviewer, typescript-reviewer
- **GAN harness**: gan-evaluator, gan-generator, gan-planner
- **Other**: code-simplifier, comment-analyzer, conversation-analyzer, chief-of-staff, doc-updater, docs-lookup, e2e-runner, harness-optimizer, loop-operator, opensource-forker, opensource-packager, opensource-sanitizer, performance-optimizer, planner, pr-test-analyzer, refactor-cleaner, seo-specialist, silent-failure-hunter, tdd-guide, type-design-analyzer

**INSTALL-PRIORITY P1** — single ECC plugin install delivers all 48.

### C.4 claude-agent-sdk-python (TIER-1 OFFICIAL — programmatic substrate)

**Source**: `Z:/repos/deps/anthropics__claude-agent-sdk-python @ HEAD b512f256`. **Not a runtime agent set** — Python SDK for programmatic agent construction. Provides:
- `HookMatcher` class — declarative hook registration
- `_SubagentContextMixin` TypedDict — `agent_id` / `agent_type` propagation
- `ClaudeAgentOptions` + 10 SDK runtime-control methods

Reference cite-substrate; **NOT installed**, used as SDK when building custom MCP servers / hooks.

---

## PART D — PLUGIN MARKETPLACES (canonical URL + install + license)

Marketplaces verified locally with `.claude-plugin/marketplace.json` present:

| # | Marketplace name | URL | Owner | License | Plugins | Convergence Axis-1 |
|---|---|---|---|---|---|---|
| 1 | **anthropic-agent-skills** | `https://github.com/anthropics/skills` | Keith Lazuka @anthropic.com | (Anthropic OFFICIAL) | 3 (document-skills + example-skills + claude-api) → 17 skills | TIER-1 Anthropic |
| 2 | **everything-claude-code** | `https://github.com/affaan-m/everything-claude-code` | Affaan Mustafa | MIT v2.0.0-rc.1 | 1 mega-plugin → 48 agents + 182 skills + 68 commands + 16 hooks | TIER-1 named-T1 |
| 3 | **claude-code-workflows** | `https://github.com/wshobson/agents` | Seth Hobson | MIT v1.6.0 | 79 plugins → 184 agents + 150 skills | TIER-1 named-T2 |
| 4 | **superpowers-dev** | `https://github.com/obra/superpowers` | Jesse Vincent | (MIT per LICENSE) v5.1.0 | 1 plugin → 14 skills | TIER-1 named-T1 |
| 5 | **addy-agent-skills** | `https://github.com/addyosmani/agent-skills` | Addy Osmani | MIT/Apache-2.0 | 1 plugin → 22 skills | TIER-1 named-T2 |
| 6 | **karpathy-skills** | `https://github.com/forrestchang/andrej-karpathy-skills` | forrestchang (Karpathy port) | (per LICENSE) v1.0.0 | 1 plugin → 1 skill | TIER-1 named-T1 |
| 7 | **claude-code-plugins-plus-skills** | community | (multi-author) | (per LICENSE) | 18 categories | TIER-2 community |

**Convergence-gate verdict** (Axis-1 ≥3-distinct-orgs PASS): Anthropic (1) + shanraisshan/CCBP (separate cite for hook reference) + Jesse Vincent / Seth Hobson / Addy Osmani / Matt Pocock / forrestchang / Affaan Mustafa / Vercel Labs = **8+ distinct orgs at firm Axis-1 PASS**.

### D.1 NOT marketplaces (catalog / reference / SDK)

| Repo | Type | Use |
|---|---|---|
| `https://github.com/anthropics/cwc-long-running-agents` | OFFICIAL config bundle | Native install of 5 hook primitives + evaluator.md |
| `https://github.com/anthropics/anthropic-cookbook` | OFFICIAL recipe corpus | Reference for managed_agents + claude_agent_sdk + skills/ + multimodal |
| `https://github.com/anthropics/claude-agent-sdk-python` | Python SDK | Programmatic substrate (HookMatcher + ClaudeAgentOptions) |
| `https://github.com/davila7/claude-code-templates` | Project-template tooling | Bootstrap scaffolds |
| `https://github.com/disler/claude-code-hooks-mastery` | Hook-pattern reference | Study-only |
| `https://github.com/vercel-labs/agent-skills` | Multi-package skill set | No marketplace.json; install per-package |
| `https://github.com/mattpocock/skills` | Multi-skill set | Has `plugin.json` but no `marketplace.json` — install via direct clone + symlink |

### D.2 INSTALL Commands (canonical official channel — CR-6)

```bash
# Anthropic OFFICIAL skills
/plugin marketplace add anthropics/skills
/plugin install document-skills@anthropic-agent-skills
/plugin install example-skills@anthropic-agent-skills
/plugin install claude-api@anthropic-agent-skills

# ECC mega-plugin
/plugin marketplace add affaan-m/everything-claude-code
/plugin install everything-claude-code@everything-claude-code

# wshobson 79-plugin marketplace — cherry-pick
/plugin marketplace add wshobson/agents
/plugin install agent-orchestration@claude-code-workflows
/plugin install agent-teams@claude-code-workflows
/plugin install context-management@claude-code-workflows
/plugin install review-agent-governance@claude-code-workflows
/plugin install comprehensive-review@claude-code-workflows
/plugin install tdd-workflows@claude-code-workflows
/plugin install debugging-toolkit@claude-code-workflows
/plugin install git-pr-workflows@claude-code-workflows

# superpowers
/plugin marketplace add obra/superpowers
/plugin install superpowers@superpowers-dev

# addy
/plugin marketplace add addyosmani/agent-skills
/plugin install agent-skills@addy-agent-skills

# karpathy
/plugin marketplace add forrestchang/andrej-karpathy-skills
/plugin install andrej-karpathy-skills@karpathy-skills

# cwc-long-running-agents (Anthropic OFFICIAL — NOT a marketplace; native install)
git clone --depth 1 https://github.com/anthropics/cwc-long-running-agents.git Z:/claude-sota-pure/.local/cwc
# Copy claude-code-config/.claude/settings.json hooks block into Z:/claude-sota-pure/.claude/settings.json
```

---

## RECOMMENDED PURE-SOTA INSTALL ORDER (Z:\claude-sota-pure)

1. **L0 Foundations** — already-codified bootstrap
2. **Anthropic OFFICIAL** — cwc-long-running-agents (5 hook primitives + evaluator) + anthropics/skills (17 skills including skill-creator + mcp-builder)
3. **ECC mega-plugin** — 48 agents + 182 skills + 16 hooks + 68 commands (single install via `/plugin install everything-claude-code`)
4. **superpowers** — 14 cross-runtime workflow skills (TDD + debugging + plan-execute-verify)
5. **wshobson** cherry-pick 5-10 plugins — agent-orchestration + agent-teams + context-management + review-agent-governance + comprehensive-review + tdd-workflows + debugging-toolkit + git-pr-workflows
6. **addy-agent-skills** — 22 engineering-phase skills (single install)
7. **karpathy-guidelines** — 1 skill (operationalizes cardinal-rule-2)
8. **mattpocock** — 9 of 10 skills (SKIP setup-matt-pocock-skills HARD-GATE)
9. **vercel-labs** (optional, if React/frontend in scope) — install per-package

---

## REJECT-FOR-FIT items (per ahfv Probe 5 mode-harness-shape)

| Skill | Reason | Cite |
|---|---|---|
| `mattpocock/skills/engineering/setup-matt-pocock-skills` | HARD-GATE `disable-model-invocation: true` + 3 sequential interactive prompts (issue tracker / triage labels / domain doc layout) — incompatible with autonomous /loop mode | `Z:/repos/deps/mattpocock-skills/skills/engineering/setup-matt-pocock-skills/SKILL.md:4` |
| `wshobson/agents/plugins/conductor/*` (full plugin) | `conductor-validator` agent assumes Conductor Context-Driven Development substrate at `conductor/index.md` — requires Conductor framework dependency; STUDY-PILOT only | `Z:/repos/deps/wshobson-agents/plugins/conductor/agents/conductor-validator.md:28-30` |

---

## SOURCES NOT-YET-PROBED (remote-only / install-time fetch required)

- `https://github.com/alirezarezvani/claude-skills` — claimed 235 skills + 28 agents; verify via `mcp__github__get_file_contents`
- `https://github.com/gsd-build/get-shit-done` — workflow reference / awesome-claude entry
- `https://github.com/anthropics/claude-code-plugins` — possible Anthropic OFFICIAL plugin marketplace (separate from anthropics/skills) — verify via gh
- `https://github.com/Shubhamsaboo/awesome-llm-apps` — catalog
- `https://github.com/vinta/awesome-python` — catalog
- `https://github.com/ComposioHQ/awesome-claude-skills` — catalog
- `https://github.com/quemsah/awesome-claude-plugins` — catalog
- `https://github.com/hesreallyhim/awesome-claude-code` — catalog

## RESEARCH COMPLETE
