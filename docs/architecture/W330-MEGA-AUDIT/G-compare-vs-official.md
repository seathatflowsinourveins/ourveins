# W330 Stream G — Runtime vs Official Anthropics + CCBP + ECC Compare

> Cite-anchored gap analysis for `Z:/claude-sota-installed` against three authorities: (1) docs.anthropic.com / code.claude.com, (2) CCBP `Z:/repos/deps/claude-code-best-practice-shan/best-practice/`, (3) ECC v2.0.0-rc.1 plugin cache. Operator-priority: locate "Insights" feature; enumerate other CC official features not enabled.
>
> Date: 2026-05-19. Subagent: W321-fork (skeleton-first, ≤15 tool calls).

---

## §1 Insights feature status (OPERATOR-PRIORITY)

**FEATURE**: `/insights` — built-in Anthropic Claude Code slash command.

**WHAT IT DOES**: Reads the user's last ~30 days of session transcripts (prompts + Claude responses) from the local `~/.claude/projects/<project>/` JSONL store and generates an interactive HTML report analyzing workflow friction points, project areas touched, command frequency, and where the user's workflow breaks down. Companion command `/team-onboarding` generates an onboarding guide from the same 30-day window.

**HOW IT IS ACTIVATED**:
- **NO settings field, NO env var, NO plugin install required**. The command is a built-in CC slash command shipped by Anthropic — type `/insights` in any interactive CC session and it runs.
- Persistence dependency: requires that session transcripts be written to disk (i.e. `cleanupPeriodDays` must not have purged them and `--no-session-persistence` / `persistSession:false` must NOT have been set).

**WHY IT APPEARED MISSING IN THIS RUNTIME** (verdict):
1. **State-outside-repo redirect**: `CLAUDE.local.md` sets `CLAUDE_CODE_PROJECT_DIR = 'Z:/claude-sota-installed-state/.claude/projects'`. `/insights` looks for transcripts in `~/.claude/projects/` — i.e. under the user's HOME, which is pinned to `Z:\claude-sota-installed` by `$env:USERPROFILE` / `$env:HOME`. If `/insights` reads from `HOME/.claude/projects/` while the runtime writes them to a sibling state directory, the report sees an empty corpus and either errors out or shows "no data" → easily mis-read as "feature missing".
2. **Windows EBUSY race** — the upstream CHANGELOG documents that `/insights` had a Windows-specific `EBUSY` crash fix landed (anthropics/claude-code CHANGELOG entry "Fixed /insights crashing with EBUSY on Windows"). If running a CC version prior to that fix, `/insights` would crash on first invocation on Win11 → also reads as "missing".
3. **CLI minimum-version pin** — `settings.json:455` `minimumVersion: 2.1.144`. If the locally-installed CC binary is older than v2.1.144 and `/insights` requires features newer than the installed binary, it would not show in the slash-command picker.

**FIX**:
- (a) Verify CC version: `claude --version` and confirm ≥2.1.144 (latest in CHANGELOG).
- (b) Verify transcript visibility: `Get-ChildItem $env:HOME\.claude\projects\` — should show `.jsonl` files. If empty (likely, given `CLAUDE_CODE_PROJECT_DIR` redirect), either:
  - (b1) Unset `CLAUDE_CODE_PROJECT_DIR` in `CLAUDE.local.md` so transcripts write to default `~/.claude/projects/` (reverts W259-state-outside-repo design), OR
  - (b2) Symlink `Z:\claude-sota-installed\.claude\projects` → `Z:\claude-sota-installed-state\.claude\projects` so `/insights` finds transcripts at the path it expects.
- (c) Try `/insights` in next session — should now generate the HTML report into `~/.claude/insights/`.

**Cite**:
- Anthropic CHANGELOG `Z:/.../claude-code-changelog-2026-05` indexed entry: `Fixed /insights crashing with EBUSY on Windows`.
- CCBP `claude-commands.md:64,97` @ HEAD `64fffd53` enumerates `/insights` + `/team-onboarding` as built-in commands (per Wave-52 iter1a indexed batch row 18).
- Runtime: `CLAUDE.local.md:51-52` `$env:CLAUDE_CODE_PROJECT_DIR = 'Z:/claude-sota-installed-state/.claude/projects'`.

---

## §2 Anthropics docs — feature manifest vs runtime

Sources fetched + indexed via `ctx_fetch_and_index` at 2026-05-19 from:
- `https://docs.anthropic.com/en/docs/claude-code/settings`
- `https://docs.anthropic.com/en/docs/claude-code/cli-reference`
- `https://docs.anthropic.com/en/docs/claude-code/slash-commands`
- `https://docs.anthropic.com/en/docs/claude-code/statusline`
- `https://docs.anthropic.com/en/docs/claude-code/output-styles`
- `https://docs.anthropic.com/en/docs/claude-code/monitoring-usage`
- `https://docs.anthropic.com/en/docs/claude-code/hooks`
- `https://docs.anthropic.com/en/docs/claude-code/plugins`
- `https://docs.anthropic.com/en/docs/claude-code/memory`
- `https://docs.anthropic.com/en/release-notes/claude-code` (CHANGELOG)

**Built-in slash commands** (a non-exhaustive list confirmed in docs + CHANGELOG): `/insights`, `/team-onboarding`, `/compact`, `/context`, `/usage`, `/config`, `/permissions`, `/model`, `/effort`, `/tui`, `/output-style`, `/statusline`, `/skill`, `/voice`, `/hooks`, `/mcp`, `/copy`, `/rename`, `/add-dir`, `/agents`, `/plugin`, `/branch`, `/clear`, `/help`, `/init`. Of these, the runtime **enables** all the underlying features by default (built-ins are always-on) — the only "gap" is whether **operator awareness + invocation discipline** exists. Notable runtime under-utilization: `/insights` (operator flagged) and `/team-onboarding`.

**Built-in settings fields NOT set in current runtime** (selected high-value):
- `availableModels` — restrict model picker (e.g. `["opus[1m]","sonnet","haiku"]`).
- `voice.enabled` / `voice.mode` — push-to-talk dictation (requires Claude.ai account; off by default).
- `feedbackSurveyRate` — control session-quality survey frequency.
- `skillOverrides` — per-skill visibility lock (string global or object map).
- `disableRemoteControl` — block `claude remote-control` if unwanted.
- `viewMode` — startup transcript view mode (`default` | `verbose` | `focus`).
- `prUrlTemplate` — for self-hosted Git platforms.
- `prefersReducedMotion` — accessibility.
- `companyAnnouncements` — startup messages cycle.
- `attribution.commit` / `attribution.pr` — runtime sets `CLAUDE_CODE_ATTRIBUTION_HEADER=0` (env-var path) but does not set the canonical `attribution` object — slightly mis-configured.
- `respectGitignore` — defaults true; no override needed.
- `spinnerTipsOverride` / `spinnerVerbs` — branding / cleanup.
- `agent` — default top-level agent (e.g. agent-teams team-lead).
- `awsAuthRefresh` / `awsCredentialExport` / `gcpAuthRefresh` — N/A (no AWS/GCP).
- `sshConfigs` — N/A unless Desktop SSH used.

**Hook events available but UNUSED in `.claude/settings.json`**:
- `UserPromptSubmit` — pre-LLM prompt processing.
- `Stop` (model stop, distinct from `TaskCompleted` for the task) — used by codex-companion plugin internally; not wired at project level.
- `SessionEnd` — paired with the SessionStart hook already present.
- `PostCompact` — post-compact context summary callback.
- `Setup` — initial CC setup hook.
- `SubagentStop` — fires when a delegated subagent finishes.
- `MCPToolUse` — match patterns on `mcp__<server>__<tool>`.
- `HTTP hooks` (instead of `command` type) — for centralized policy servers.

**OpenTelemetry endpoints in monitoring docs**: runtime sets `OTEL_EXPORTER_OTLP_TRACES_ENDPOINT` (traces) but NOT `OTEL_METRICS_EXPORTER` (metrics) and NOT `OTEL_LOGS_EXPORTER` (logs/events). Per `monitoring-usage` docs both are independent — only traces are flowing to Langfuse :3000. Metrics + events would provide token-spend / tool-activity time-series.

---

## §3 CCBP best-practice — primitive diff vs runtime

CCBP catalog at `Z:/repos/deps/claude-code-best-practice-shan/best-practice/` enumerates 8 docs:
- `claude-cli-startup-flags.md`
- `claude-commands.md`
- `claude-mcp.md`
- `claude-memory.md`
- `claude-power-ups.md`
- `claude-settings.md` (60+ settings, 180+ env vars, ~1800 LOC)
- `claude-skills.md`
- `claude-subagents.md`

**CCBP-recommended primitives we have**:
- `cleanupPeriodDays`, `env`, `permissions.allow/ask/deny`, `hooks` (SessionStart/PreToolUse/PostToolUse/PreCompact/WorktreeRemove/Notification/TaskCompleted), `disabledMcpjsonServers`, `defaultShell: powershell`, `statusLine` (ccstatusline), `outputStyle`, `alwaysThinkingEnabled`, `effortLevel: xhigh`, `minimumVersion`, `tui: fullscreen`, `autoMemoryEnabled: false`, `skipDangerousModePermissionPrompt`, `theme`, `teammateMode: in-process`, `enabledPlugins` (47/64), `extraKnownMarketplaces` (22), `sandbox.*`, `worktree.symlinkDirectories/sparsePaths` (empty arrays).

**CCBP-recommended primitives MISSING**:
- `worktree.baseRef` (v2.1.133) — defaults to `"fresh"`; setting `"head"` would carry uncommitted changes into worktree.
- `autoMode` — auto-mode permission classifier (research preview); not configured; `useAutoModeDuringPlan` not set.
- `policyHelper` / `parentSettingsBehavior` — managed-only; N/A for this non-MDM runtime.
- `model` (top-level) — relies on launcher / CLI flag; could pin `"opus[1m]"`.
- `attribution.{commit,pr}` — see §2.
- `modelOverrides` — N/A unless Bedrock/Vertex/Foundry.
- `apiKeyHelper` / `forceLoginMethod` / `forceLoginOrgUUID` — N/A unless enforcing org login.
- `disableSkillShellExecution` — security tighten if external skills used.
- `showThinkingSummaries` — currently default `false`; would improve transcript audit-trail.
- `allowedHttpHookUrls` / `httpHookAllowedEnvVars` — N/A (no HTTP hooks used).
- `fastModePerSessionOptIn` — N/A.

**CCBP env-var primitives MISSING** (from claude-settings.md §11 "Environment Variables via env"):
- `OTEL_METRICS_EXPORTER=otlp` — see §2.
- `OTEL_LOGS_EXPORTER=otlp`.
- `CLAUDE_CODE_IDE_SKIP_AUTO_INSTALL` — N/A (no IDE).
- `MAX_THINKING_TOKENS` — pair with `alwaysThinkingEnabled`.
- `CLAUDE_CODE_EXTRA_BODY` — per-request body extras.

Cite: `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-settings.md:6,82-104,247-264,355-471,500-712`.

---

## §4 ECC v2.0.0-rc.1 — feature diff vs runtime enablement

ECC plugin at `Z:/claude-sota-installed/.claude/plugins/cache/everything-claude-code/everything-claude-code/2.0.0-rc.1/`. Inventory:
- **Commands**: 75 (e.g. `/plan`, `/tdd`, `/code-review`, `/insights`-equivalent `/harness-audit`, `/learn`, `/skill-create`, `/save-session`, `/resume-session`, `/sessions`, `/context-budget`, `/santa-loop`, `/orchestrate`, `/devfleet`, `/loop-start`, `/cost-report`, `/security-scan`, `/ecc-guide`, `/learn-eval`, `/evolve`, `/promote`, `/instinct-{status,export,import}`, `/skill-{health,create}`, `/quality-gate`, `/refactor-clean`, `/prune`, `/multi-{plan,workflow,backend,frontend,execute}`, `/pr`, `/jira`, etc.). Documented in `COMMANDS-QUICK-REF.md`.
- **Agents**: ~40+ specialized subagents (chief-of-staff, architect, code-reviewer, code-simplifier, conversation-analyzer, loop-operator, harness-optimizer, doc-updater, e2e-runner, gan-{evaluator,generator,planner}, language-specific reviewers/build-resolvers, etc.).
- **Skills**: 232 directories — huge surface. Selected high-value: `agent-architecture-audit`, `agent-eval`, `agent-harness-construction`, `agentic-engineering`, `autonomous-loops`, `benchmark`, `canary-watch`, `claude-devfleet`, `click-path-audit`, `codebase-onboarding`, `configure-ecc`, etc.
- **Hooks**: shipped at `hooks/hooks.json` — session-persistence + pre/post-tool hooks. Wired via `ECC_HOOK_PROFILE`+`ECC_DISABLED_HOOKS` env-var gating in `scripts/hooks/run-with-flags.js`.

**ECC hooks DISABLED in runtime** (see `settings.json:7`):
`ECC_DISABLED_HOOKS=pre:edit-write:gateguard-fact-force,post:edit:design-quality-check,pre:observe:continuous-learning,post:observe:continuous-learning,post:session-activity-tracker,stop:evaluate-session,stop:cost-tracker,stop:desktop-notify`

Of these, three are arguably worth re-enabling for visibility:
- `stop:cost-tracker` — per-stop session cost log; complements `/cost-report` and OTEL metrics.
- `stop:evaluate-session` — `/learn-eval`-style quality eval.
- `post:session-activity-tracker` — feeds `/sessions` browse history.

**ECC commands UNDER-UTILIZED** (paths exist but not invoked in recent waves per JSONL audit signal):
- `/harness-audit` — would audit this very runtime's harness config.
- `/learn-eval` — extract patterns + self-eval, complements `/insights`.
- `/skill-health` — portfolio health dashboard for the 33 local + plugin skills.
- `/context-budget` — analyze context window usage (relevant to W325-A 0.0036 parallel-ratio scandal).
- `/multi-plan` / `/multi-workflow` — multi-model collaborative planning (codex consult parallel).
- `/orchestrate` — guide for tmux/worktree multi-agent (W259-v8 U4 mode-4).
- `/devfleet` — orchestrate parallel CC agents (would close W325 parallel_ratio gap).
- `/cost-report` — per-session $$ rollup.
- `/security-scan` — security sweep.
- `/santa-loop` — adversarial review loop (already partially used via dual-review).

**ECC `agents/` UNDER-UTILIZED** (no recent dispatch per parent-task survey):
- `chief-of-staff` — meta-orchestrator suitable for /goal-loop wave entry.
- `harness-optimizer` — directly addresses W325/W329 harness-tuning waves.
- `conversation-analyzer` — feeds /insights-style retrospective.
- `loop-operator` — would replace ad-hoc /loop predicates.

**ECC profile**: `ECC_HOOK_PROFILE=standard` (vs `light`/`full`/`mvp`/`team` per ECC docs). `full` would re-enable more telemetry; `mvp` would tighten.

**ECC governance**: `ECC_GOVERNANCE_CAPTURE=0` — governance-capture pipeline disabled. Per ECC `RULES.md` and `the-longform-guide.md` this turns off the auto-captured decision log; opting in adds T6-basic-memory-equivalent layer.

Cite:
- `Z:/claude-sota-installed/.claude/plugins/cache/everything-claude-code/everything-claude-code/2.0.0-rc.1/COMMANDS-QUICK-REF.md:1-159`
- `Z:/claude-sota-installed/.claude/plugins/cache/everything-claude-code/everything-claude-code/2.0.0-rc.1/CLAUDE.md:1-72`
- `Z:/claude-sota-installed/.claude/plugins/cache/everything-claude-code/everything-claude-code/2.0.0-rc.1/.claude/rules/everything-claude-code-guardrails.md:1-44`
- `Z:/claude-sota-installed/.claude/plugins/cache/everything-claude-code/everything-claude-code/2.0.0-rc.1/.claude/rules/node.md:1-50`

---

## §5 Gap inventory table

| # | Feature/Primitive | Authority | Our state | Gap class | Recommendation |
|---|---|---|---|---|---|
| **0** | **`/insights` slash command** | **anthropics built-in** | **Active by default but EMPTY corpus due to `CLAUDE_CODE_PROJECT_DIR` redirect to `Z:/claude-sota-installed-state/.claude/projects` while command reads from `$HOME/.claude/projects`** | **MIS-CONFIGURED (path-redirect)** | **Symlink `Z:\claude-sota-installed\.claude\projects` → `Z:\claude-sota-installed-state\.claude\projects` OR drop the env-var redirect; verify CC ≥ 2.1.144** |
| 1 | `/team-onboarding` | anthropics built-in | Same as #0 — built-in, empty corpus | MIS-CONFIGURED (path) | Same fix as #0 |
| 2 | OTEL metrics + logs exporters | anthropics monitoring docs | Only traces wired (`OTEL_EXPORTER_OTLP_TRACES_ENDPOINT`) | MISSING (env vars) | Add `OTEL_METRICS_EXPORTER=otlp` + `OTEL_LOGS_EXPORTER=otlp` + matching `_ENDPOINT` vars |
| 3 | Hook events: `UserPromptSubmit`, `SessionEnd`, `PostCompact`, `Setup`, `SubagentStop` | anthropics hooks docs | None of these wired in `.claude/settings.json:hooks` (only SessionStart + PreToolUse + PostToolUse + PreCompact + WorktreeRemove + Notification + PostToolUseFailure + TaskCompleted present) | MISSING (8 hook surfaces unused) | Wire `SessionEnd` for cost-rollup, `UserPromptSubmit` for parallel-dispatch guard, `SubagentStop` for parallel-ratio telemetry |
| 4 | `availableModels` | anthropics settings | Not set | MISSING | Set `["opus[1m]","opus","sonnet","haiku"]` to lock model picker |
| 5 | `skillOverrides` (object form) | anthropics settings v2.1.129 | Not set | MISSING | Use to silence the noisier of the 33 local skills (e.g. `parallel-dispatch-mandate: "user-invocable-only"` while iterating) |
| 6 | `attribution.{commit,pr}` | anthropics settings | Half-config: env-var `CLAUDE_CODE_ATTRIBUTION_HEADER=0` set but no `attribution` object | MIS-CONFIGURED | Add `attribution: {commit: "", pr: ""}` for explicit no-attribution OR drop the env var and use canonical form |
| 7 | `worktree.baseRef` | anthropics settings v2.1.133 | Defaults `"fresh"` | MISSING (optional) | Set `"head"` if W280d 3 parallel sessions want uncommitted-tracked-files in spawned worktrees |
| 8 | ECC `/harness-audit` | ECC v2.0.0-rc.1 cmd | Available, never invoked | DISABLED (operator) | Run `/harness-audit` weekly via `/loop 7d /harness-audit` |
| 9 | ECC `/learn-eval` + `/evolve` + `/skill-health` | ECC v2.0.0-rc.1 cmds | Available, never invoked | DISABLED (operator) | Add to wave-closure protocol |
| 10 | ECC `/devfleet` + `/orchestrate` + `/multi-{plan,workflow}` | ECC v2.0.0-rc.1 cmds | Available, never invoked | DISABLED (operator) | Would close W325-A parallel_ratio 0.0036 baseline gap |
| 11 | ECC hooks `stop:cost-tracker` + `stop:evaluate-session` + `post:session-activity-tracker` | ECC v2.0.0-rc.1 hooks | Disabled via `ECC_DISABLED_HOOKS` (`.claude/settings.json:7`) | DISABLED (operator) | Re-enable for session telemetry feeding /insights + /cost-report |
| 12 | ECC `agents/chief-of-staff` + `harness-optimizer` + `conversation-analyzer` + `loop-operator` | ECC v2.0.0-rc.1 agents | Available, never dispatched | DISABLED (operator) | Use `chief-of-staff` as wave-orchestrator entry; `harness-optimizer` for W325/W329 follow-on |
| 13 | ECC `ECC_GOVERNANCE_CAPTURE` | ECC v2.0.0-rc.1 env | `0` (disabled) | DISABLED (operator) | Set `1` to capture decision-trail into ECC; complements T6 basic-memory |
| 14 | ECC `ECC_HOOK_PROFILE=full` | ECC v2.0.0-rc.1 env | `standard` | UNDER-PROFILED | Move to `full` after re-enabling the cost+session hooks (#11) |
| 15 | `voice.enabled` push-to-talk | anthropics settings | Not configured | MISSING (optional) | Only if dictation desired (requires Claude.ai login) |
| 16 | `prefersReducedMotion`, `spinnerTipsOverride`, `companyAnnouncements`, `viewMode` | anthropics settings | All defaults | MISSING (cosmetic) | Set per operator preference; low impact |
| 17 | `disableRemoteControl` | anthropics settings v2.1.128 | Not set (default = remote-control enabled) | UNDER-LOCKED | Set `true` if remote-control unwanted; security-tighten |
| 18 | `disableSkillShellExecution` | anthropics settings v2.1.91 | Not set (default = shell-exec allowed in skills) | UNDER-LOCKED | Set `true` to harden against compromised local skills |
| 19 | `showThinkingSummaries` | anthropics settings | Default `false` | UNDER-OBSERVED | Set `true` to surface thinking-block summaries in transcript (improves /insights signal) |
| 20 | CHANGELOG: latest CC version | anthropics release-notes | Pin `minimumVersion: 2.1.144` | VERIFY | Confirm installed CC ≥ 2.1.144 with `claude --version` |

---

## §6 Install-state cross-check

- `.claude/settings.json:237-306` declares 68 plugin entries; 47 enabled + 21 disabled.
- `.claude/plugins/cache/` lists 18 marketplace dirs (per `ls` in §4 prep) — matches CLAUDE.md L37 "18 dirs".
- Of 22 marketplaces declared in `extraKnownMarketplaces`, 16 are actively referenced by enabled plugins (per W315-r2 disambiguation noted in CLAUDE.md L37) — 6 unused defs queued for W316 audit.
- ECC plugin **enabled** at `everything-claude-code@everything-claude-code: true` (settings.json:240). All 75 commands + 232 skills + ~40 agents reachable.
- Built-in slash commands always available — runtime state does NOT affect their presence; only `/insights`-style features that read transcript history depend on path consistency.

---

## §7 Cite-anchors (≤30 LOC)

**Anthropic docs (URLs)**:
- `https://docs.anthropic.com/en/docs/claude-code/settings`
- `https://docs.anthropic.com/en/docs/claude-code/cli-reference`
- `https://docs.anthropic.com/en/docs/claude-code/slash-commands`
- `https://docs.anthropic.com/en/docs/claude-code/statusline`
- `https://docs.anthropic.com/en/docs/claude-code/output-styles`
- `https://docs.anthropic.com/en/docs/claude-code/monitoring-usage`
- `https://docs.anthropic.com/en/docs/claude-code/hooks`
- `https://docs.anthropic.com/en/docs/claude-code/plugins`
- `https://docs.anthropic.com/en/docs/claude-code/memory`
- `https://docs.anthropic.com/en/release-notes/claude-code` (CHANGELOG; specifically "Fixed `/insights` crashing with `EBUSY` on Windows")

**CCBP** (`Z:/repos/deps/claude-code-best-practice-shan/best-practice/`):
- `claude-settings.md:6` (60+ settings / 180+ env vars statement)
- `claude-settings.md:82-104` (Display & Core settings table)
- `claude-settings.md:247-264` (permissions / auto-mode)
- `claude-settings.md:355-471` (MCP / sandbox / plugins)
- `claude-settings.md:500-712` (Model / display / status-line / file-suggestion)
- `claude-commands.md:64,97` (`/insights` + `/team-onboarding` enumerated)

**ECC** (`Z:/claude-sota-installed/.claude/plugins/cache/everything-claude-code/everything-claude-code/2.0.0-rc.1/`):
- `COMMANDS-QUICK-REF.md:1-159` (75-cmd catalog)
- `CLAUDE.md:1-72`
- `.claude/rules/everything-claude-code-guardrails.md:1-44`
- `.claude/rules/node.md:1-50`
- `agents/` dir listing (40+ files)
- `skills/` dir listing (232 dirs)
- `hooks/hooks.json` (gated via `ECC_DISABLED_HOOKS` + `ECC_HOOK_PROFILE`)

**Runtime** (`Z:/claude-sota-installed/`):
- `.claude/settings.json:1-461` full settings ref
- `.claude/settings.json:7` ECC_DISABLED_HOOKS list
- `.claude/settings.json:9-10` ECC_GOVERNANCE_CAPTURE=0 / ECC_HOOK_PROFILE=standard
- `.claude/settings.json:24-28` OTEL trace endpoint config (metrics + logs missing)
- `.claude/settings.json:107-228` hooks dictionary (missing 8 event types per §2)
- `.claude/settings.json:237-306` enabledPlugins map
- `.claude/settings.json:455` minimumVersion 2.1.144
- `CLAUDE.local.md:51-52` CLAUDE_CODE_PROJECT_DIR redirect (root cause of §1 "missing Insights")
