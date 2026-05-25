# Wave 85 Agent B — Per-installed-repo feature audit (codex-rescue BRIDGE-MODE)

**Origin**: 3-agent wave 2026-05-08 11:55
**Agent**: codex:codex-rescue BRIDGE-MODE → real GPT-5.5
**Tool count**: 1 / Duration: 261s

## §1 superpowers feature audit
- **USED (1)**: verification-before-completion concept (in `_guard_base.py:274` fail-closed pattern)
- **NOT-YET-WIRED (10)**: brainstorming / git-worktrees / writing-plans / subagent-driven-dev / executing-plans / TDD / requesting-code-review / finishing-branch / systematic-debugging
- **NOT-APPLICABLE (1)**: writing-skills

## §2 ECC feature audit
- **USED (8)**: plugin core (48 agents/182 skills/68 commands) + Bash preflight + MCP healthcheck + quality-gate + SessionStart context load + session-end persistence + runtime hook controls
- **NOT-YET-WIRED (4)**: GateGuard fact-force (disabled) / Governance capture (disabled) / Continuous learning observe (disabled) / ECC rules copy
- **NOT-APPLICABLE (2)**: Stop format/typecheck (JS-orthogonal) + Desktop notify

## §3 codex plugin feature audit
- **USED (7)**: codex-from-CC plugin + CLI gate + session lifecycle + stop review gate + /codex:review + /codex:adversarial-review + path-mangling rewrite defense
- **NOT-YET-WIRED (4)**: /codex:status, /codex:result, /codex:cancel commands + codex:rescue auto-wire (gate knows it but no automatic dispatch)
- **PARTIAL**: /codex:rescue subagent (manually invokable, not auto)

## §4 cpa-usage-keeper feature audit
- **USED (5)**: standalone persistence + SQLite + aggregated APIs + React dashboard + RESP queue drain + loopback guard
- **NOT-YET-WIRED (3)**: AUTH_ENABLED/LOGIN_PASSWORD + subpath reverse proxy (APP_BASE_PATH)
- **NOT-APPLICABLE (2)**: Linux systemd + Docker/Compose

## §5 context-mode feature audit (BIGGEST GAP)
- **USED (1)**: MCP server install (.mcp.json:32-36)
- **NOT-YET-WIRED (11)**: Sandbox tools (execute/search/index/fetch/stats/doctor — partial via MCP only) + session continuity SQLite/FTS5 + think-in-code routing + output compression + PreToolUse routing hook + PostToolUse capture hook + PreCompact snapshot + SessionStart injection + utility commands stats/doctor/upgrade/purge/insight + analytics dashboard

## §6 PRESCRIPTION (top 3 NOT-YET-WIRED ranked by leverage)

1. **Context-mode full Claude Code plugin/hooks** — currently MCP-only; documented 98% savings + session continuity depend on PreToolUse/PostToolUse/PreCompact/UserPromptSubmit/SessionStart hooks per upstream hooks/hooks.json:2-3,26-121. Install cost already paid; hook wire is gap. **Highest leverage**.

2. **ECC continuous learning/session metrics hooks** — installed but explicitly disabled in settings.json:11 (latency reason). Selective re-enable (observe + session-start only) brings adaptive memory at near-zero latency cost.

3. **CPA dashboard auth hardening** — service auto-started but AUTH_ENABLED/LOGIN_PASSWORD not enforced. Upstream README.en.md:50-52 + .env.example:9-19. Add eee advisory or hard gate unless strictly loopback-bound.

## HANDOFF
verdict_one_line: 5-repo feature audit complete; top-3 NOT-YET-WIRED identified (context-mode hooks = highest leverage; ECC continuous-learning re-enable; cpa-usage-keeper auth hardening). All install costs already paid; remaining work is hook configuration.
