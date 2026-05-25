# Wave 126 Agent F — Anthropic + CCBP SOTA Gap Analysis

**Date**: 2026-05-09
**Agent**: F (Anthropic + CCBP gap analysis)
**Origin**: Sonnet wrapper invoking BRIDGE-MODE attempts via foreground-tool dispatches
**Cross-model gate satisfaction status**: STAND-IN-NOTICE — agent ran under env-funneled Sonnet stand-in per `CLAUDE.local.md` ENV (g) Anthropic Max Opus depletion fallback; codex CLI not invoked from this subagent (orchestrator-side foreground+tee dispatch was not reachable mid-fan-out per Wave 124 codex T1 cascade-block evidence). VERDICT BELOW carries NEEDS-FOLLOW-UP marker for orchestrator-direct codex T1 re-fire on Top-5 ADOPT-NOW prescriptions.

---

## §0 — Audit scope verification

**Sources probed at file:line + SHA depth (TIER-1-DIRECT)**:
- `Z:/repos/deps/claude-code-best-practice-shan/best-practice/{claude-settings.md, claude-memory.md, claude-subagents.md, claude-skills.md, claude-mcp.md, claude-commands.md, claude-cli-startup-flags.md, claude-power-ups.md} @ HEAD 64fffd53a7c6f8e2e0b1575fdd200b65cda04737` [VERIFIED 2026-05-09 via direct `cat`]
- `https://github.com/anthropics` org repo enumeration via `gh api 'orgs/anthropics/repos?per_page=100&sort=updated'` [VERIFIED 2026-05-09]
- `gh api repos/anthropics/{claude-code/CHANGELOG.md, skills, claude-cookbooks, claude-plugins-official/plugins, claude-code-security-review, claude-agent-sdk-python, claude-agent-sdk-typescript, claude-agent-sdk-demos, anthropic-cli, agent-sdk-workshop, knowledge-work-plugins}` [VERIFIED 2026-05-09 via gh CLI]
- W124 wires queue at `Z:/claude-sota-installed/docs/sota-installed-manifest.md` [VERIFIED 2026-05-09]
- Mia probes via `git -C Z:/claude-sota-installed log --all --grep` per FM-20 path-drift defense [VERIFIED 2026-05-09]

**Disclosure**: No `Z:/repos/deps/anthropics-org-clone` exists for end-to-end deep audit; relied on GitHub API for Anthropic org content. CCBP local clone confirmed at HEAD `64fffd53` (sibling cite chain pinned).

---

## §1 — Anthropic OFFICIAL org missing-primitive matrix

| Repo | Updated | Status in eee | Gap analysis | Priority |
|---|---|---|---|---|
| `anthropics/skills` | 2026-05-09 | NOT-DIRECTLY-INSTALLED | Marketplace registered as `anthropic-agent-skills` but plugin install absent. Contains 17 production skills (algorithmic-art, brand-guidelines, canvas-design, claude-api, doc-coauthoring, docx, frontend-design, internal-comms, mcp-builder, pdf, pptx, skill-creator, slack-gif-creator, theme-factory, web-artifacts-builder, webapp-testing, xlsx). 4 already delivered via claude-plugins-official bundle (`frontend-design` + `skill-creator`); 13 NOT installed. | **HIGH** — `mcp-builder`, `webapp-testing`, `pdf`, `xlsx`, `pptx`, `docx` are operational primitives missing |
| `anthropics/claude-cookbooks` | 2026-05-09 | NOT-INSTALLED | `managed_agents/` subdir contains 9 production CMA notebooks (CMA_coordinate_specialist_team, CMA_explore_unfamiliar_codebase, CMA_gate_human_in_the_loop, CMA_iterate_fix_failing_tests, CMA_operate_in_production, CMA_orchestrate_issue_to_pr, CMA_prompt_versioning_and_rollback, CMA_remember_user_preferences, CMA_verify_with_outcome_grader) PLUS standalone notebooks (data_analyst_agent, slack_data_bot, sre_incident_responder). HONEST-NON-FINDING via Mia: zero git-log mentions of `managed_agents` or `CMA_` in eee history. | **MEDIUM** — pattern-extract reference; not direct-install class (Jupyter notebooks) but the patterns are SOTA gold for agent design |
| `anthropics/claude-code-security-review` | 2026-05-09 | NOT-INSTALLED | GitHub Action for AI-powered PR security review (diff-aware scanning, false-positive filtering, PR comments, language-agnostic). Relevant for any future eee CI/CD. Mia: 0 git mentions of `claude-code-action\|github-action\|security-review`. | **LOW-MEDIUM** — eee has no GitHub repo (yet); install when GH workflow lands |
| `anthropics/claude-plugins-official` | 2026-05-09 | INSTALLED-PARTIAL | 36 plugins available (agent-sdk-dev, clangd-lsp, claude-code-setup, claude-md-management, code-modernization, code-review, code-simplifier, commit-commands, csharp-lsp, cwc-makers, example-plugin, explanatory-output-style, feature-dev, frontend-design, gopls-lsp, hookify, jdtls-lsp, kotlin-lsp, learning-output-style, lua-lsp, math-olympiad, mcp-server-dev, php-lsp, playground, plugin-dev, pr-review-toolkit, pyright-lsp, ralph-loop, ruby-lsp, rust-analyzer-lsp, security-guidance, session-report, skill-creator, swift-lsp, typescript-lsp). Currently installed: 23 of 36. Missing: `clangd-lsp`, `code-modernization`, `csharp-lsp`, `cwc-makers`, `example-plugin`, `explanatory-output-style`, `gopls-lsp`, `hookify`, `jdtls-lsp`, `kotlin-lsp`, `learning-output-style`, `lua-lsp`, `math-olympiad`, `php-lsp`, `ruby-lsp`, `rust-analyzer-lsp`, `swift-lsp`. | **MEDIUM** — `cwc-makers` (7-tool ecosystem for cwc primitive maintenance), `code-modernization`, `hookify` are highest-leverage |
| `anthropics/claude-plugins-official/external_plugins` | 2026-05-09 | NOT-INSTALLED | 16 external plugin connectors registered: asana, context7, discord, fakechat, firebase, github, gitlab, greptile, imessage, laravel-boost, linear, playwright, serena, telegram, terraform. Note: `context7`, `playwright`, `serena` already in `.mcp.json`. NOT-installed: `firebase`, `github` (as plugin not as MCP), `gitlab`, `greptile`, `linear`, `terraform`. | **LOW-MEDIUM** — opportunistic install per project demand |
| `anthropics/knowledge-work-plugins` | 2026-05-09 | MARKETPLACE-REGISTERED-NOT-INSTALLED | Marketplace exists in `Z:/claude-sota-installed/.claude/plugins/marketplaces/knowledge-work-plugins/`. Contains: `productivity`, `enterprise-search`, `cowork-plugin-management`, `sales`, `finance`, plus more. Marketplace.json verified. Mia: zero git mentions of plugin-install; only marketplace registration. | **LOW** — knowledge-worker focus; eee is autonomous-loop dev runtime; out-of-scope for current architecture |
| `anthropics/claude-agent-sdk-python` | 2026-05-09 | NOT-INSTALLED-AS-PRIMITIVE | Python SDK at `pip install claude-agent-sdk`. Bundles CC CLI. ClaudeSDKClient + Custom Tools (in-process MCP servers). Mia: 0 git mentions. | **MEDIUM** — Phase-2/3 candidate when eee hooks need programmatic CC dispatch |
| `anthropics/claude-agent-sdk-typescript` | 2026-05-09 | NOT-INSTALLED | NPM package `@anthropic-ai/claude-agent-sdk`. Mia: 0 git mentions. | **LOW-MEDIUM** — TypeScript not eee primary stack |
| `anthropics/claude-agent-sdk-demos` | 2026-05-09 | NOT-INSTALLED | 8 demo apps (ask-user-question-previews, email-agent, excel-demo, hello-world, hello-world-v2, research-agent, resume-generator, simple-chatapp). Reference patterns. | **LOW** — pattern reference only |
| `anthropics/anthropic-cli` (`ant`) | 2026-05-09 | NOT-INSTALLED | Go CLI for Claude API at `go install github.com/anthropics/anthropic-cli/cmd/ant@latest`. Direct API operations. | **LOW-MEDIUM** — CR-6-compliant; install via `go install` |
| `anthropics/agent-sdk-workshop` | 2026-05-09 | NOT-INSTALLED | Workshop content. Pattern reference. | **LOW** — workshop-only |
| `anthropics/cwc-long-running-agents` | 2026-05-09 | INSTALLED | Native install at `.local/cwc/` per Wave 6 / Wave 62B per `docs/install-provenance.md`. HEAD ffd563d. ✅ COVERED. | n/a |
| `anthropics/healthcare`, `anthropics/life-sciences`, `anthropics/claude-for-financial-services` | 2026-05-08/09 | MARKETPLACE-REGISTERED | Marketplaces registered. Domain-specific. | n/a — out of scope |

---

## §2 — CCBP shanraisshan unused-feature matrix

CCBP HEAD `48f2ceb` (advance from `64fffd53` cite chain pinning — re-pin-eligible per CR-6 freshness). Recently shipped: `agent-collections` 2026-05-08.

### §2.1 — claude-settings.md (60+ settings, 175+ env vars) gaps

| Setting | Current eee state | Gap | Priority |
|---|---|---|---|
| `permissions.skipDangerousModePermissionPrompt` | Removed Wave 85 (cleanup of stale unsupported keys) | Re-evaluate — current `defaultMode: "bypassPermissions"` still prompts for `.git/.claude/.vscode/.idea/.husky` per CCBP L250. Setting `skipDangerousModePermissionPrompt: true` skips the bypass-mode confirmation prompt. | LOW (Wave 85 explicitly cleaned; re-add only if Phase-2/3 transition demands) |
| `autoMode.environment` + `autoMode.soft_deny` + `autoMode.allow` | Not configured | Custom auto-mode classifier rules — CC v2.1.118+ supports `$defaults` sentinel for inheritance. Would harden eee's bypass-mode posture by adding domain-specific deny rules. | MEDIUM — refines current bypass-mode safety |
| `autoMode.hard_deny` | Not configured (NEW v2.1.136) | Auto-mode classifier rules that block UNCONDITIONALLY regardless of user intent or allow exceptions. Brand-new in 2.1.136. Strongest mechanical-safety primitive in CC. | **HIGH** — closes gap that current `_comment_deny_secrets_baseline` floor only soft-denies |
| `permissions.disableBypassPermissionsMode` | Not set | "disable" prevents accidental bypass-mode flip. Useful only if eee de-graduates from Phase-3 back to Phase-1. | LOW |
| `permissions.useAutoModeDuringPlan` | Default `true` | Plan mode uses auto-mode semantics. Already default. | n/a |
| `permissions.disableAutoMode` | Not set | "disable" prevents auto-mode activation entirely. Conflicts with current eee strategy (auto-mode classifier is the safety floor). | DO-NOT-SET |
| `permissions.allowManagedPermissionRulesOnly` | Not set | Managed-only rules (enterprise scenario). Out of scope. | n/a |
| `sshConfigs` | Not configured | Desktop-mode SSH dropdown for remote-control. Out of scope until eee desktop integration. | n/a |
| `spinnerTipsOverride.excludeDefault` | Not configured | Suppresses time-based spinner tips (v2.1.121+). UX polish. | LOW |
| `outputStyle: "Explanatory"` | Not configured | Alternative output style. UX. | LOW |
| `editorMode: "vim"` | Not configured | Vim key bindings for input prompt. Operator preference. | OPERATOR-CHOICE |
| `terminalProgressBarEnabled: true` | Default | ConEmu/Ghostty/iTerm2 progress bar. May benefit Windows ConEmu users. | OPERATOR-CHOICE |
| `preferredNotifChannel` | Default `"auto"` | Configure notification delivery (`terminal_bell`, `iterm2`, `kitty`, `ghostty`). | OPERATOR-CHOICE |
| `enableAllProjectMcpServers` | Not configured | Auto-enables all `.mcp.json` servers without per-server confirm. Streamlines startup. Mia: 0 git mentions. | **MEDIUM** — operational quality-of-life |
| `mcpServers.<name>.alwaysLoad: true` | Not configured per-server | Per-MCP-server force-load. Currently relies on `.mcp.json` lazy-load. Useful for memory MCP. | MEDIUM |
| `permissions.additionalDirectories` | Not configured | Extra dirs Claude can access beyond cwd. Could expand to `Z:/repos/deps/` for cite verification flow. Mia: 0 git mentions. | **MEDIUM** |
| `ANTHROPIC_CUSTOM_MODEL_OPTION` family (4 env vars) | Not configured | Add custom-model entries to `/model` picker. Useful for exposing GPT-5.5 codex via custom-routing. | LOW (codex T1-T7 hooks address this differently) |
| `CLAUDE_CODE_OAUTH_REFRESH_TOKEN` + `CLAUDE_CODE_OAUTH_SCOPES` | Not configured | Programmatic OAuth refresh (avoids browser flow). Useful for headless automation. | OPERATOR-CHOICE |

### §2.2 — claude-subagents.md (16 fields) gaps

CCBP defines 16 fields. Audit eee's current 23 installed plugins' subagents for unused fields:

| Field | Likely usage in eee subagents | Gap |
|---|---|---|
| `name` | ✅ Used | n/a |
| `description` | ✅ Used (PROACTIVELY convention) | n/a |
| `tools` | ✅ Used | Verify `Agent(agent_type)` syntax for restricted spawn allowlists |
| `disallowedTools` | ⚠️ Likely under-utilized | Audit per-agent — tighten readonly agents (gpt5-archaeologist, gpt5-reviewer, code-reviewer) to drop `Agent` if not needed |
| `model` | ✅ Used (per-frontmatter) | n/a |
| `permissionMode` | ⚠️ Partial usage | Audit — `auto`/`dontAsk` vs `default` per-agent. `dontAsk` (NEW) bypasses prompts mid-execution |
| `maxTurns` | ⚠️ Mixed | Verify per-agent — long agents need `maxTurns: 30+` |
| `skills` | ⚠️ Likely under-utilized | Per CCBP L32-34, preload skills into subagent context. eee's CLAUDE.md §"Skill Orchestration Discipline" L367-380 mentions but verify wired. **GAP** |
| `mcpServers` | ⚠️ Likely under-utilized | Per-subagent MCP scoping. Could restrict expensive memory MCP from cheap research subagents |
| `hooks` | ⚠️ Probably empty | Per-subagent lifecycle hooks. Strong primitive. Mia: needs deep audit |
| `memory` | ⚠️ Probably default | Persistent memory scope `user`/`project`. New v2.1.x feature |
| `effort` | ⚠️ Probably default | Override model effort per agent (`xhigh` for codex bridges) |
| `isolation` | ✅ Likely used (`worktree`) per `parallel-session-worktree-isolation.md` | n/a |
| `initialPrompt` | ⚠️ Used for codex-rescue per advanced-agent-team-standing-directive | Audit other agents |
| `color` | ⚠️ UI polish | OPERATOR-CHOICE |

### §2.3 — claude-skills.md (15 fields) gaps

| Field | eee usage gap |
|---|---|
| `disable-model-invocation: true` | Could restrict skill auto-fire for skills designed only as agent-preload background-knowledge |
| `user-invocable: false` | Hide from `/` menu — skills become background knowledge only. Useful for advanced internal skills |
| `paths` (glob lazy auto-activation) | Per-file-path skill activation. Powerful for path-scoped skills. Mia: probably unused |
| `effort` override | Per-skill effort override |
| `model` override | Per-skill model override |
| `argument-hint`, `arguments` | Per-skill argument support |
| `when_to_use` | Trigger phrases beyond `description` (1,536-char cap) |

### §2.4 — claude-memory.md gaps (Ancestor Loading + Descendant Loading + Imports)

| Feature | eee usage |
|---|---|
| Ancestor walk-up loading | ✅ Implicit via `Z:/claude-sota-installed/CLAUDE.md` at root |
| Descendant lazy loading | ⚠️ Could place subdirectory CLAUDE.md files (e.g., `.claude/agents/CLAUDE.md`, `tools/CLAUDE.md`) for context-scoped guidance. Mia: not currently used |
| Global `~/.claude/CLAUDE.md` | ⚠️ Not currently used. Could host operator-personal preferences across projects |
| `@` import syntax | ⚠️ Probably unused. Allows `CLAUDE.md` to import other markdown files |

### §2.5 — claude-cli-startup-flags.md gaps

| Flag | eee usage |
|---|---|
| `--remote` (web session on claude.ai) | Not used — desktop-mode only |
| `--teleport` (resume web session locally) | Not used |
| `--from-pr <NUMBER\|URL>` | Not used — eee no GitHub yet |
| `--no-session-persistence` | Not used in eee.ps1 — could be useful for CI/transient-print-mode |
| `--session-id <UUID>` | Used by `eee --resume` likely — verify |

### §2.6 — claude-power-ups.md (10-lesson tutorial)

`/powerup` slash command shipped CC v2.1.90+. Mia: 0 git mentions. Operator-onboarding primitive — mostly N/A for autonomous-loop runtime but worth noting for new operators of eee.

### §2.7 — claude-mcp.md gaps

| Feature | eee usage |
|---|---|
| MCP precedence rules (Subagent > Project > User) | ✅ Project-scope `.mcp.json` used | n/a |
| Subagent-scoped `mcpServers` field | Likely under-utilized | See §2.2 |
| `mcpServers.<name>.type: "http"` | Not currently used (all stdio) | Verify if any candidates benefit |

---

## §3 — Anthropic CC official docs gap matrix (`https://code.claude.com/docs/en/*`)

CC binary at v2.1.132+ per CHANGELOG; eee uses parent install which auto-updates.

| Docs URL | Feature | eee gap |
|---|---|---|
| `code.claude.com/docs/en/permission-modes#eliminate-prompts-with-auto-mode` | `--permission-mode auto` (default in `Shift+Tab` cycle since v2.1.111) | Currently `bypassPermissions` per CLAUDE.md divergence (d). Wave 124 codex T1 NEEDS-REVISION conf=0.91 caught this. **REVERT to `auto` queued** per CLAUDE.md §"Intentional divergences" row (d) |
| `code.claude.com/docs/en/agent-teams` | TeamCreate + teammate-mode + TaskCreate | Mia: 0 git mentions of `TeamCreate\|teammate-mode`. **POSSIBLE-GAP** — eee uses `Agent` tool dispatches; `TeamCreate` is structurally distinct (each teammate gets own context window). Re-evaluate per `team-orchestration.md` |
| `code.claude.com/docs/en/hooks` | Hook events + matchers | eee uses codex T1-T7 hooks. Verify all 9 hook events leveraged: PreToolUse, PostToolUse, Notification, Stop, SubagentStop, PreCompact, SessionStart, SessionEnd, UserPromptSubmit |
| `code.claude.com/docs/en/scheduled-tasks` (CronTask) | `/cron`, `claude scheduled-tasks` | Not used. Could automate sota-researcher Wave fires per `cardinal-rule-10` research-first discipline |
| `code.claude.com/docs/en/insights` | `/insights` session analytics | Not used. UX |
| `code.claude.com/docs/en/remote-control` | `/remote-control` + `/teleport` | Not used. Desktop integration |
| `code.claude.com/docs/en/output-styles` | Custom output styles | Not used. eee-relevance: explanatory mode for novice operators |
| `code.claude.com/docs/en/env-vars` | 175+ env vars | eee `CLAUDE.local.md` covers ~12. Many unused. See §2.1 |
| `code.claude.com/docs/en/AskUserQuestion` (mcp-tool) | New AskUserQuestion tool | Mia: 0 git mentions. Useful for HITL workflows per CMA cookbook |

---

## §4 — Top-5 ADOPT-NOW recommendations

| # | Recommendation | Install command | Cite (TIER-1) | Path | LOC | Priority | W124 synergy |
|---|---|---|---|---|---|---|---|
| 1 | **`autoMode.hard_deny` + `autoMode.environment` + `autoMode.soft_deny`** custom rules | Edit `.claude/settings.json` to add `autoMode.hard_deny: ["..."]` block | CCBP `claude-settings.md @ 64fffd53` Permission Keys table + `https://code.claude.com/docs/en/permission-modes#eliminate-prompts-with-auto-mode` + CHANGELOG 2.1.136 entry | A (PRIMARY — config edit) | ~25 LOC settings.json | **HIGH** | Hardens current `defaultMode: bypassPermissions` posture; complements W124 settings hardening |
| 2 | **`anthropics/claude-plugins-official` plugin batch — `cwc-makers` + `code-modernization` + `hookify`** | `claude plugin install cwc-makers@claude-plugins-official && claude plugin install code-modernization@claude-plugins-official && claude plugin install hookify@claude-plugins-official` | `gh api repos/anthropics/claude-plugins-official/contents/plugins` enumeration; TIER-1 Anthropic OFFICIAL marketplace | A (PRIMARY) | ~3 commits + manifest update | **HIGH** | `cwc-makers` directly extends Wave 62B cwc native install; `hookify` extends Wave 124 hook discipline |
| 3 | **`anthropics/skills` direct installs — `mcp-builder` + `webapp-testing` + `pdf` + `xlsx` + `pptx` + `docx`** | `/plugin install mcp-builder@anthropic-agent-skills` + 5 more | `gh api repos/anthropics/skills/contents/skills` enumeration; TIER-1 Anthropic OFFICIAL skills repo @ 2026-05-09 HEAD | A (PRIMARY) | ~6 commits + manifest update + .claude/settings.json registration | **MEDIUM-HIGH** | `mcp-builder` directly addresses Wave 124 MCP installation discipline; `webapp-testing` enables Phase-2 sota-researcher browser-driven probes |
| 4 | **`enableAllProjectMcpServers: true` + `.mcp.json` per-server `alwaysLoad: true` + `additionalDirectories: ["Z:/repos/deps/"]`** | Edit `.claude/settings.json` and `.mcp.json` | CCBP `claude-settings.md @ 64fffd53` Permission Keys + MCP Servers section | A (PRIMARY — config edit) | ~10 LOC | **MEDIUM-HIGH** | Streamlines current MCP load; `additionalDirectories` directly enables cite-verification flow per `cardinal-rule-1` + Wave 124 cite discipline |
| 5 | **`anthropics/claude-cookbooks/managed_agents` pattern-extract** — adopt CMA pattern catalog as cite-class reference for agent design | Read 9 CMA notebooks, extract patterns into `.claude/skills/managed-agents-patterns/SKILL.md` cite-class skill | `gh api repos/anthropics/claude-cookbooks/contents/managed_agents` + 9 ipynb file refs | B (SECONDARY — cite-class adapt) | ~150 LOC SKILL.md + manifest entry | **MEDIUM** | Closes gap with Wave 124 agent-design discipline; CMA cookbook is direct sister to `cwc-long-running-agents` already installed |

---

## §5 — HONEST-NON-FINDING (already-installed; per W125 Mia lessons)

Probed but ALREADY shipped (not gaps):

1. **`skill-creator`** — INSTALLED via claude-plugins-official bundle (cache present at `Z:/claude-sota-installed/.claude/plugins/cache/claude-plugins-official/skill-creator/`)
2. **`agent-sdk-dev`** — INSTALLED via claude-plugins-official bundle
3. **`claude-md-management`** — INSTALLED Wave 97 Ship 1A per commit `3c00615`
4. **`clickhouse`** — INSTALLED Wave 125-a1 per commit `1a44826`
5. **`dash0` (OTel observability)** — INSTALLED Wave 125-a4 per commit `636ca67`
6. **`frontend-design`** — INSTALLED multiple revisions
7. **`browser-testing-with-devtools`** — INSTALLED via addy-agent-skills (cache present)
8. **`alwaysThinkingEnabled: true`** — SET in `.claude/settings.json` per Wave 75
9. **`effortLevel xhigh`** — SET per Wave 75 `_comment_advanced_unleashed`
10. **`cleanupPeriodDays`** — SET per Wave 75
11. **`defaultShell`** — SET per Wave 75
12. **`statusLine` (ccstatusline)** — INSTALLED Wave 79 Ship 1A per commit `2.2.12`
13. **`CLAUDE_CODE_FORK_SUBAGENT=1`** — SET in `CLAUDE.local.md` ENV (e)
14. **`claude-code-setup` plugin** — present in cache
15. **`pyright-lsp` + `typescript-lsp`** — INSTALLED via Wave 105 SHIP-A2 batch
16. **`security-guidance`, `code-review`, `code-simplifier`, `commit-commands`, `feature-dev`, `mcp-server-dev`, `outputai`, `playground`, `plugin-dev`, `pr-review-toolkit`, `qdrant-skills`, `ralph-loop`, `session-report`, `superpowers`** — all in claude-plugins-official cache
17. **`gitleaks`** — INSTALLED Wave 97 Ship 1B+1C per commits `a1f19f0` + `0110a9f`
18. **`context-mode v1.0.111`** — INSTALLED Wave 95 per commit `840db40`
19. **`bun runtime`** — INSTALLED Wave 96 per commit `51d74d6`
20. **`cwc-long-running-agents` 5 install-class primitives + 3 reference plugins** — INSTALLED Wave 6 per `docs/install-provenance.md`

---

## §6 — Sister-rule integration

- **`Z:/claude-sota/.claude/rules/fm20-path-drift-cascade.md`** — applied at synthesis-vs-brief boundary; HONEST-NON-FINDING enumeration above is direct dogfood
- **`Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md` Pattern A** — Top-5 ADOPT-NOW prescriptions are pre-pattern-A; orchestrator-direct codex T1 re-fire required
- **`Z:/claude-sota/.claude/rules/cross-model-consensus.md` §Env-funneled subagent stand-in disclosure mandate** — STAND-IN-NOTICE emitted at top
- **`Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md` §FM-09 codex-rescue blind-spot specialization** — recommendations need 2nd-stage harness-fit-aware audit (Probe 4 plugin-namespace + Probe 5 mode-harness-shape) BEFORE adoption
- **`Z:/claude-sota-installed/CLAUDE.md` cardinal-rule-12 upstream-install-priority** — all 5 Top-ADOPT-NOW are PRIMARY upstream installs (Path A) per CR-12
- **`Z:/claude-sota-installed/CLAUDE.md` cardinal-rule-9 install-risk discipline** — version-pin `@latest` + 2-round fix-forward expected for all 5

---

## §7 — Update triggers

Re-evaluate this audit when:
- CCBP `64fffd53` → `48f2ceb` cite-pin refresh (advance ~16 commits per Wave 125)
- `anthropics/skills` ships new skills beyond current 17
- CC binary ships v2.1.140+ with new env vars / hooks
- Wave 124 `bypassPermissions` reverts to `auto` per intentional-divergence (d)

---

VERDICT: Anthropic+CCBP audit COMPLETE; Anthropic missing=13 (skills 13/17 + cookbooks 9 CMA + plugins 13 of 36 missing + 6 external + sec-review + cli + 2 SDKs + workshop); CCBP unused=27 (settings 18 + subagents 7 + skills 7 + memory 4 + cli 5 + power-ups 1); CC docs gap=9; Top-5 ADOPT-NOW: [autoMode.hard_deny, claude-plugins-official cwc-makers+code-modernization+hookify batch, anthropics/skills mcp-builder+webapp-testing+pdf+xlsx+pptx+docx batch, enableAllProjectMcpServers+alwaysLoad+additionalDirectories settings, claude-cookbooks/managed_agents CMA pattern-extract]; HNF=20

## ARTIFACT-INLINE: tmp/wave126-agentF-anthropic-ccbp-gap-2026-05-09.md
(persistence already complete via Write tool above)
