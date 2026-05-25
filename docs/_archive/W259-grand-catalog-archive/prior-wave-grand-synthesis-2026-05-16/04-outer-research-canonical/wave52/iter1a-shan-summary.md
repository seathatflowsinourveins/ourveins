# Wave 52 Iter 1a — shanraisshan/claude-code-best-practice — Executive Summary

**Source repo**: https://github.com/shanraisshan/claude-code-best-practice
**HEAD SHA**: `64fffd53a7c6f8e2e0b1575fdd200b65cda04737`
**Local clone**: `Z:/repos/deps/claude-code-best-practice-shan/`
**Documented CC version**: v2.1.126
**Extraction date**: 2026-05-07
**Patterns extracted**: 117 (35 categories)
**Full data**: `Z:/claude-sota/docs/outer research/wave52/iter1a-shan-extraction.json`

---

## Headline finding

The shan repo's `best-practice/claude-settings.md` is the de-facto authoritative SOTA reference for Claude Code v2.1.126: it documents **60+ settings keys + 175+ env vars** with version stamps. Cross-checking against `Z:/claude-sota/.claude/settings.json` shows **claude-sota has already adopted ~38 of the highest-leverage env-level patterns** (1H prompt caching, fork-subagent, attribution-header strip, git-instructions strip, tool-search auto:5, max output unleash, OTel tool-detail logging, agent-teams flag, autocompact 70%, task-list-id), but **23 patterns are still MISSING** and a further **13 are partially adopted**. The single biggest residual leverage gap is the **Command → Agent → Skill orchestration architecture** (shan's central pattern, demonstrated end-to-end via the weather workflow): claude-sota has all three primitives but does not enforce the strict 3-layer pattern. Among quick wins, the highest-leverage MISSING items are: `CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD=1` (claude-sota has 5 additionalDirectories with no CLAUDE.md loading), `CLAUDE_CODE_AUTO_COMPACT_WINDOW` (decouple compaction from 1M context), `CLAUDE_CODE_SUBPROCESS_ENV_SCRUB` (currently explicitly disabled to 0 — security review item), `agent.isolation:'worktree'` field on all writing subagents, and the `autoMode` classifier configuration.

---

## Top 20 UNADOPTED patterns ranked by leverage

Each row: pattern → why it matters → exact citation → 1-line apply hint.

### 1. `CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD=1` — load CLAUDE.md from --add-dir paths
- **Leverage**: high. claude-sota has 5 entries in `permissions.additionalDirectories` (Z:/repos/deps/, Z:/claude/, Z:/tools/, Z:/venvs/claude/, Z:/repos/) but their CLAUDE.md files are NOT being loaded. Free context win if any of those paths have a CLAUDE.md.
- **Cite**: `best-practice/claude-cli-startup-flags.md:213` @ HEAD 64fffd53.
- **Apply**: add `"CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD": "1"` to settings.json env.

### 2. `autoMode` classifier configuration (auto permission mode)
- **Leverage**: high. v2.1.111 made `auto` mode part of Shift+Tab cycle. Auto mode classifier auto-approves read-only + edits, sends rest through safety check. 3-consecutive / 20-total block fallback. Config is per-environment (trusted infra strings) + allow exceptions + soft_deny rules. NOT read from project settings (anti-injection); user/local/managed only.
- **Cite**: `best-practice/claude-settings.md:239-241,1041-1048` @ HEAD 64fffd53.
- **Apply**: in user-scope settings.json, add `autoMode.environment` describing trusted local infra (CCC at 9327, Z: drive paths) and `autoMode.soft_deny: ["$defaults", "Never run terraform apply"]`.

### 3. `CLAUDE_CODE_SUBPROCESS_ENV_SCRUB=1` — defense-in-depth credential scrub
- **Leverage**: high (security). Strips Anthropic + cloud-provider creds from subprocess env (Bash tool, hooks, MCP stdio servers). Currently EXPLICITLY DISABLED (=0) in claude-sota — should be revisited. Pair with `CLAUDE_CODE_SCRIPT_CAPS={"deploy.sh": 2}` for per-script invocation limits.
- **Cite**: `best-practice/claude-settings.md:924-925` @ HEAD 64fffd53.
- **Apply**: flip to "1"; verify no hook/MCP/bash flow depends on inheriting ANTHROPIC_AUTH_TOKEN.

### 4. Command → Agent → Skill orchestration architecture
- **Leverage**: very high (architecture). Shan's central pattern. Three components with clear roles: Command (entry, user interaction) → Agent (autonomous data fetch with preloaded skill — 'agent skill') → Skill (output, invoked via Skill tool). Two skill patterns: agent skills (preloaded full content) vs skills (description-loaded, on-demand). Resolution order: Skill > Agent > Command (Command never auto-invoked).
- **Cite**: `orchestration-workflow/orchestration-workflow.md`; `reports/claude-agent-command-skill.md` @ HEAD 64fffd53.
- **Apply**: audit existing claude-sota commands/agents/skills against the 3-layer pattern; identify monolithic agents that should split into command + agent + skill.

### 5. Skill `paths:` lazy auto-activation by file glob
- **Leverage**: very high (lazy context loading). Glob patterns limit when a skill auto-activates. Claude loads skill ONLY when working with matching files. Differs from CLAUDE.md (lazy descendant load by directory); skills can match by language/extension across whole tree.
- **Cite**: `best-practice/claude-skills.md:34` @ HEAD 64fffd53; shan's CLAUDE.md:95 confirms `.claude/rules/*.md` with `paths:` are lazy-loaded.
- **Apply**: audit claude-sota's 207 skills; add `paths:` to skills that are language- or feature-scoped.

### 6. Skill description char cap — 1,536 characters
- **Leverage**: high (context). description + when_to_use combined cap. Verbose descriptions bleed context budget across 200+ skills.
- **Cite**: `best-practice/claude-skills.md:23,28` @ HEAD 64fffd53.
- **Apply**: run audit script over `.claude/skills/**/SKILL.md` frontmatter; flag any over 1,000 chars combined.

### 7. `agent.isolation:'worktree'` for writing subagents + `worktree.sparsePaths`
- **Leverage**: high (parallel-safety, file-conflict prevention). Subagent runs in temp git worktree, auto-cleaned if no changes. Pair with `worktree.sparsePaths` in settings.json to limit checkout to relevant subdirs (cone mode). claude-sota has `worktree.symlinkDirectories` but is missing `sparsePaths`.
- **Cite**: `best-practice/claude-subagents.md:34` + `best-practice/claude-settings.md:131-143` @ HEAD 64fffd53.
- **Apply**: add `worktree.sparsePaths: [".claude", "scripts", "tools"]` etc. and add `isolation: "worktree"` to all writing agents per user's V442 guidance.

### 8. Hook event matrix coverage — claude-sota at ~60%
- **Leverage**: high (instrumentation completeness). Shan demonstrates 25+ event types (PreToolUse, PermissionRequest, PostToolUse, PostToolUseFailure, UserPromptSubmit, Notification, Stop, SubagentStart, SubagentStop, PreCompact, PostCompact, SessionStart, SessionEnd, Setup, TeammateIdle, TaskCreated, TaskCompleted, ConfigChange, WorktreeCreate, WorktreeRemove, InstructionsLoaded, Elicitation, ElicitationResult, StopFailure, CwdChanged, FileChanged, PermissionDenied). claude-sota currently misses: TaskCreated, FileChanged (with matcher), PermissionDenied, Elicitation/ElicitationResult, CwdChanged, WorktreeCreate, Setup, Notification.
- **Cite**: `Z:/repos/deps/claude-code-best-practice-shan/.claude/settings.json:86-441`.
- **Apply**: add high-value missing events: `FileChanged` with matcher `.envrc|.env|.env.local` (security observer), `PermissionDenied` (telemetry), `TaskCreated` (lifecycle).

### 9. Hook `once: true` field for boundary events
- **Leverage**: medium-high. Fires hook only once per session for SessionStart/PreCompact/SessionEnd. claude-sota's SessionStart fires every iteration (not boundary).
- **Cite**: `Z:/repos/deps/claude-code-best-practice-shan/.claude/settings.json:212,239,253`.
- **Apply**: add `"once": true` to claude-sota's SessionStart, PreCompact, SessionEnd hook entries.

### 10. `type: "prompt"` hooks (CC v2.1.92+) — cheap inline LLM validation
- **Leverage**: very high. Hook with `type:prompt` fires a model invocation as the hook body. Use `model: "haiku"` for cheap inline validation. Events: Stop, SubagentStop, UserPromptSubmit, PreToolUse. Eliminates shell-out latency for LLM gates.
- **Cite**: User's V442 CLAUDE.md ref to pro-workflow hooks.json:24-50 (NOT in shan repo directly, but is an upstream CC SOTA primitive worth listing).
- **Apply**: convert one shell-out judge hook (e.g., codex_t1_consult_gate.py) to a `type:prompt` haiku-backed gate as a pilot.

### 11. `CLAUDE_CODE_AUTO_COMPACT_WINDOW` — decouple compact from 1M model context
- **Leverage**: medium-high. Override the context capacity in tokens used for auto-compaction. Default = full model window (1M for opus[1m]). Set lower (e.g., 500000) on a 1M model to treat as 500K for compaction. claude-sota runs `model: "opus[1m]"` at line 212 — auto-compact at 70% of 1M = 700K, may be too late.
- **Cite**: `best-practice/claude-settings.md:967` @ HEAD 64fffd53.
- **Apply**: add `"CLAUDE_CODE_AUTO_COMPACT_WINDOW": "500000"` to compact at 70% of 500K = 350K, leaving headroom.

### 12. `--strict-mcp-config` for hermetic eval/test runs
- **Leverage**: high (test isolation). Only use MCP servers from --mcp-config; ignore project .mcp.json + user mcpServers. Critical for reproducible eval runs and CI.
- **Cite**: `best-practice/claude-cli-startup-flags.md:115` @ HEAD 64fffd53.
- **Apply**: convert any reproducibility-sensitive cron/CI invocations to `claude --print --strict-mcp-config /path/to/eval-mcp.json --setting-sources project ...`.

### 13. `--max-budget-usd` and `--max-turns` for scripted runs
- **Leverage**: high (cost guard for scripted runs). Print-mode-only budget caps. claude-sota has loop crons that lack explicit budget bounds.
- **Cite**: `best-practice/claude-cli-startup-flags.md:133-134` @ HEAD 64fffd53.
- **Apply**: add `--max-budget-usd 5 --max-turns 25` to all `claude -p` cron invocations in `tools/loop*.ps1`.

### 14. `agent.initialPrompt` — auto-submitted first user turn
- **Leverage**: medium-high. When agent runs as MAIN session (--agent or agent setting), initialPrompt auto-submits as first user turn. Commands/skills processed. Prepended to user prompt. Enables deterministic agent boot behavior.
- **Cite**: `best-practice/claude-subagents.md:35` @ HEAD 64fffd53.
- **Apply**: for agents that always start with the same setup ritual (e.g., recall memory + load skill + state plan), encode it as `initialPrompt:` instead of having every invocation type it.

### 15. `CLAUDE_ENABLE_BYTE_WATCHDOG` + `CLAUDE_STREAM_IDLE_TIMEOUT_MS` — long-run reliability
- **Leverage**: medium-high. Two watchdogs: byte-level (no bytes for 5min default) and event-level (no SSE for 90s default). Long-running tools / slow networks cause premature timeouts. claude-sota uses CCC proxy at 9327 — increase event timeout to handle proxy slow paths.
- **Cite**: `best-practice/claude-settings.md:867,950,951` @ HEAD 64fffd53.
- **Apply**: `"CLAUDE_ENABLE_BYTE_WATCHDOG": "1"`, `"CLAUDE_STREAM_IDLE_TIMEOUT_MS": "300000"` (5min event timeout).

### 16. `CLAUDE_CODE_SCRIPT_CAPS` — per-script invocation limits (paired with subprocess env scrub)
- **Leverage**: medium (security). JSON object limiting how many times specific scripts may be invoked per session when subprocess env scrub is set. Defense-in-depth.
- **Cite**: `best-practice/claude-settings.md:925` @ HEAD 64fffd53.
- **Apply**: combined with #3 above: `"CLAUDE_CODE_SCRIPT_CAPS": "{\"deploy\":2,\"git push\":3,\"rm\":5}"`.

### 17. Built-in `/security-review` — pending-changes vuln scan
- **Leverage**: high (security gate). Analyzes pending changes for security vulnerabilities (injection, auth, data exposure). Currently AVAILABLE but not regularly invoked. Pair with hook to run on `Bash(git push *)` PreToolUse.
- **Cite**: `best-practice/claude-commands.md:96` @ HEAD 64fffd53.
- **Apply**: add a PreToolUse hook on `Bash(git push *)` that prompts user with `/security-review` results when diff > N lines.

### 18. Built-in `/insights` and `/team-onboarding` — usage analysis
- **Leverage**: medium (introspection / knowledge transfer). `/insights` analyzes session interactions, friction points, project areas. `/team-onboarding` generates onboarding guide from past 30 days. Free analysis layer for fleet learning.
- **Cite**: `best-practice/claude-commands.md:64,97` @ HEAD 64fffd53.
- **Apply**: schedule `/insights` weekly via `/loop 7d /insights`.

### 19. Skill `disable-model-invocation: true` for dangerous skills
- **Leverage**: high (safety). Hides skill from auto-discovery so Claude cannot invoke without explicit user `/skill-name`. Use for deployment, destructive, or high-risk skills.
- **Cite**: `reports/claude-skills-for-larger-mono-repos.md:137` @ HEAD 64fffd53.
- **Apply**: audit claude-sota's 207 skills; flag any that touch deployment, force operations, or external API writes; set `disable-model-invocation: true` on those.

### 20. MCP curation discipline — drop from 24 to ~7 daily-load servers
- **Leverage**: high (cost). Shan's curated daily set is 5 MCPs; r/mcp wisdom: 'Went overboard with 15 MCP servers thinking more = better. Ended up using only 4 daily.' claude-sota currently has 24 MCP servers + 6 explicitly disabled. Even with `ENABLE_TOOL_SEARCH=auto:5` deferral, the connection startup cost + occasional alwaysLoad cost adds up.
- **Cite**: `best-practice/claude-mcp.md:21-29` @ HEAD 64fffd53.
- **Apply**: instrument 30-day MCP usage telemetry (langfuse already configured); demote bottom-quartile servers via `disabledMcpjsonServers`.

---

## Honourable mentions (not in top 20 but worth noting)

- **Per-server `alwaysLoad: true`** (v2.1.121): claude-sota correctly uses this only for `gitnexus` (high-frequency). Pattern is well-applied.
- **Hook `mcp_tool` type** (v2.1.118): claude-sota uses for Graphiti commit ingestion — direct tool invocation in hook, no shell-out. SOTA pattern, well-applied.
- **`headersHelper` with `CLAUDE_CODE_MCP_SERVER_NAME` env** (v2.1.85): not used; relevant if running multiple authed MCP servers with shared helper script.
- **Built-in `/autofix-pr`**: spawns CC-on-the-web session that watches a PR's CI and auto-pushes fixes. High-leverage automation; not in current workflow.
- **Tasks system** (v2.1.16): claude-sota uses `CLAUDE_CODE_TASK_LIST_ID=main` — well-applied. Multi-session task graph with dependencies is a major coordination primitive.
- **Power-ups** (v2.1.90): user-onboarding lessons; nothing to apply, but `/powerup` is the canonical way to surface CC features missed by experienced users.

---

## Patterns INTENTIONALLY removed/disabled (flag for re-review)

These are NOT recommendations to re-enable — just inventory of explicit disables:
- `CLAUDE_CODE_SUBAGENT_MODEL` removed (settings.json:42 comment) — env had top priority and overrode 3 agents declaring `model: sonnet` AND consumed 5x cost on every subagent. **Keep removed**.
- `MCP_CONNECTION_NONBLOCKING` removed from ambient (line 45 comment) — would race MCP startup for every -p call. Scoped to `tools/loop7h_remediation_cron.ps1` only. **Keep scoped**.
- `MAX_THINKING_TOKENS=31999` removed (line 38 comment) — dead env on Opus 4.7 (adaptive thinking is the only supported mode). **Keep removed**.
- `CLAUDE_CODE_SUBPROCESS_ENV_SCRUB=0` (security flag explicitly OFF). **Re-review** — see #3 above.
- 5 plugin hooks.json renamed to .disabled (settings.json:8 comment): explanatory-output-style, learning-output-style, hookify, ralph-loop, security-guidance. **Per official Anthropic docs convention; keep**.

---

## Citations index (HEAD 64fffd53a7c6f8e2e0b1575fdd200b65cda04737)

- `best-practice/claude-settings.md` — 80,907 bytes — settings keys + 175+ env vars (PRIMARY)
- `best-practice/claude-cli-startup-flags.md` — 9,953 bytes — startup flags + subcommands + startup env
- `best-practice/claude-mcp.md` — 5,252 bytes — MCP catalog + scopes + auth
- `best-practice/claude-memory.md` — 5,496 bytes — CLAUDE.md ancestor/descendant loading
- `best-practice/claude-skills.md` — 3,915 bytes — 15 frontmatter fields + 6 official skills
- `best-practice/claude-subagents.md` — 4,189 bytes — 16 frontmatter fields + 5 built-in agents
- `best-practice/claude-commands.md` — 19,503 bytes — 15 frontmatter fields + 75 built-in commands
- `best-practice/claude-power-ups.md` — 1,954 bytes — 10 power-ups (v2.1.90)
- `implementation/claude-{agent-teams,commands,skills,subagents,scheduled-tasks}-implementation.md` — concrete examples
- `orchestration-workflow/orchestration-workflow.md` — 9,872 bytes — Command → Agent → Skill weather demo
- `reports/claude-agent-command-skill.md` — 8,860 bytes — when-to-use-what comparison table
- `reports/claude-agent-memory.md` — 4,152 bytes — agent memory frontmatter (v2.1.33)
- `reports/claude-global-vs-project-settings.md` — 11,842 bytes — scope hierarchy + Tasks + Agent Teams
- `reports/why-harness-is-important.md` — 9,795 bytes — 10 architectural capabilities prompts can't match
- `reports/claude-skills-for-larger-mono-repos.md` — 7,339 bytes — nested .claude/skills/ discovery
- `reports/claude-advanced-tool-use.md` — 14,210 bytes — PTC + Dynamic Filtering + Tool Search + Examples (mostly API/SDK, not CLI)
- `reports/claude-agent-sdk-vs-cli-system-prompts.md` — 13,458 bytes — modular CLI prompt (~269 base + 110+ fragments)
- `reports/claude-spinner-verbs-and-tips.md` — 8,065 bytes — built-in tips (extracted from CC binary)
- `reports/llm-day-to-day-degradation.md` — 24,011 bytes — Anthropic Sept 2025 postmortem + MoE variance
- `reports/claude-usage-and-rate-limits.md` — 4,167 bytes — /usage, /extra-usage, /cost
- shan repo's own `.claude/settings.json` — 443 lines — comprehensive hook event taxonomy
- shan repo's own `CLAUDE.md` — 127 lines — discipline rules (200-line CLAUDE.md cap, separate-commits-per-file, etc.)
