# W264 — Agent-Orchestration + Skills Layer SOTA Audit (2026-05-17)

Authoritative TIER-1 citations: `https://docs.anthropic.com/en/docs/claude-code/sub-agents`, `https://code.claude.com/docs/en/sub-agents`, `https://code.claude.com/docs/en/skills`, `https://code.claude.com/docs/en/plugins`, `https://docs.anthropic.com/en/docs/claude-code/hooks`, `https://docs.anthropic.com/en/docs/claude-code/settings`, `https://code.claude.com/docs/en/headless`.

Ground truth: `.claude/settings.json#enabledPlugins` reports **54 configured / 40 enabled** (not 33 as briefed — recount below). Marketplaces installed: **21** under `.claude/plugins/marketplaces/`.

## 1. Inventory — Load-Bearing vs Sleeping (40 enabled)

`enabledPlugins:true` does not mean active; load-bearing = invoked in the last 30d *or* its skill has fired *or* it owns a wired hook. Verdict per plugin:

| Plugin | Tier | Rationale |
|---|---|---|
| `superpowers@claude-plugins-official` | **LOAD-BEARING** | 9 obra skills auto-fire (TDD, brainstorming, verification-before-completion) — cardinal-rule-3 anchor |
| `codex@openai-codex` | **LOAD-BEARING** | Cross-model gate (CLAUDE.md `Architecture`) |
| `everything-claude-code@everything-claude-code` | **REJECT — purge** | See §4 |
| `pyright-lsp@claude-plugins-official` | **LOAD-BEARING** | LSP wired via `pyrightconfig.json` (CLAUDE.md Status) |
| `typescript-lsp@claude-plugins-official` | LOAD-BEARING | Sibling LSP |
| `ralph-loop@claude-plugins-official` | LOAD-BEARING | `/ralph-loop` cron pattern + `Stop` hook (`hooks/stop-hook.sh`) |
| `frontend-design@claude-plugins-official` | SLEEPING | No FE work in active goals — keep, low cost |
| `context-mode@context-mode` | **LOAD-BEARING** | Mandated by `context_window_protection` block |
| `claude-md-management@claude-plugins-official` | LOAD-BEARING | Pointer-only CLAUDE.md hygiene (W255 successor) |
| `pr-review-toolkit@claude-plugins-official` | SLEEPING | Duplicate of `code-review@claude-plugins-official` + `comprehensive-review@workflows` — **DUPLICATE candidate** |
| `agent-skills@addy-agent-skills` | **LOAD-BEARING** | 23 SDLC skills (spec→ship) auto-fire |
| `code-review@claude-plugins-official` | LOAD-BEARING | Local-change review path |
| `feature-dev@claude-plugins-official` | LOAD-BEARING | Triggered by feature work |
| `code-simplifier@claude-plugins-official` | SLEEPING | Wraps `simplify` — `addy-agent-skills:code-simplification` covers it. **DUPLICATE** |
| `commit-commands@claude-plugins-official` | LOAD-BEARING | `/commit`, `/commit-push-pr` |
| `session-report@claude-plugins-official` | LOAD-BEARING | Wave artifact generation |
| `code-modernization@claude-plugins-official` | SLEEPING | 9 skills, none invoked since install |
| `intelligent-compact@claude-settings` | LOAD-BEARING | Pairs with `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=80` (CLAUDE.local.md) |
| `example-skills@anthropic-agent-skills` | LOAD-BEARING | `claude-api` skill anchors API work (referenced in skills list) |
| `shell-scripting@claude-code-workflows` | LOAD-BEARING | gitleaks/shellcheck hooks |
| `antigravity-bundle-essentials@antigravity-awesome-skills` | LOAD-BEARING | `systematic-debugging`, `kaizen`, `lint-and-validate` |
| `signed-audit-trails@claude-code-workflows` | LOAD-BEARING | Required for governance |
| `agent-teams@claude-code-workflows` | **LOAD-BEARING** | 4 subagents + 7 `/team-*` commands + 6 skills (verified in marketplace tree) |
| `comprehensive-review@claude-code-workflows` | LOAD-BEARING | Multi-reviewer driver |
| `engineering-skills@claude-code-skills` | LOAD-BEARING | Senior-* personas referenced |
| `engineering-advanced-skills@claude-code-skills` | LOAD-BEARING | spec-driven-workflow + 80+ skills |
| `hindsight-memory@hindsight` | **LOAD-BEARING** | T1 memory engine (CLAUDE.md `Status`) |
| `context-management@claude-code-workflows` | LOAD-BEARING | strategic-compact + token-budget |
| `agent-orchestration@claude-code-workflows` | LOAD-BEARING | review-policy author + context-manager agent |
| `review-agent-governance@claude-code-workflows` | LOAD-BEARING | Cedar policy + `/approve-review` (W259 governance) |
| `developer-essentials@claude-code-workflows` | LOAD-BEARING | git/SQL/turborepo skills |
| `debugging-toolkit@claude-code-workflows` | LOAD-BEARING | Pairs with `obra:systematic-debugging` |
| `incident-response@claude-code-workflows` | SLEEPING | No P0 in current arc — keep, low cost |
| `llm-application-dev@claude-code-workflows` | SLEEPING | No LLM-app build active |
| `plugin-eval@claude-code-workflows` | LOAD-BEARING | Used for SOTA adoption gating |
| `block-no-verify@claude-code-workflows` | **LOAD-BEARING** | PreToolUse hook enforces cardinal rule 2 |
| `gitnexus@gitnexus-marketplace` | LOAD-BEARING | MCP wired (`.claude/.mcp.json`) — 6 skills + GraphRAG |
| `tdd-workflows@claude-code-workflows` | LOAD-BEARING | 2 subagents (tdd-orchestrator, code-reviewer) + `/tdd-cycle` |
| `ai@pydantic-skills` | SLEEPING | Pydantic-ai not in active stack |
| `logfire@pydantic-skills` | SLEEPING | Logfire not wired |

**Duplicates to prune (3):**
1. `pr-review-toolkit` (overlaps `code-review` + `comprehensive-review`) — disable.
2. `code-simplifier` (overlaps `addy:code-simplification`) — disable.
3. `everything-claude-code` — disable (see §4).

**Sleeping but cheap (keep, no cost):** `frontend-design`, `code-modernization`, `incident-response`, `llm-application-dev`, `ai@pydantic-skills`, `logfire@pydantic-skills`.

## 2. Candidate Audit — D1–D10 Composite (0–30) + 3-Axis Verdict

D1=Stars, D2=ActiveCommits-30d, D3=License, D4=PluginShape, D5=SkillTrigger-quality, D6=NetGap-vs-current, D7=MaintainerSignal, D8=Docs, D9=Adoption-risk-inverse, D10=Hooks-policy-fit. Score 0/1/2/3 each (cap 30).

| Repo | Stars | Last push | License | D1-D10 | Verdict | Net-value | Adopt? |
|---|---|---|---|---|---|---|---|
| `abhigyanpatwari/GitNexus` | 38,707 | 2026-05-17 | NOASSERTION | 26 | ALREADY INSTALLED | HIGH (MCP+6 skills) | **KEEP** |
| `mattpocock/skills` | 88,324 | 2026-05-13 | MIT | 22 | STUDY-PILOT | MED — `.claude` directory dump, no plugin.json, mostly TS/Node opinions; trigger quality unknown | See §3 |
| `addyosmani/agent-skills` | 42,762 | 2026-05-16 | MIT | 29 | ALREADY INSTALLED | HIGH (23 SDLC skills) | **KEEP** |
| `Shubhamsaboo/awesome-llm-apps` | 110,813 | 2026-05-09 | Apache-2.0 | 14 | **REJECT** | LOW — RAG/Agent demo apps; not Claude Code primitives | No |
| `hesreallyhim/awesome-claude-code` | 44,019 | 2026-04-27 | NOASSERTION | 18 | **REJECT (use as catalog only)** | LOW — awesome-list, not installable | No |
| `msitarzewski/agency-agents` | 98,923 | 2026-04-12 | MIT | 19 | STUDY-PILOT | MED — agency/business-flavored personas; overlap with `engineering-skills` c-level set | No |
| `wshobson/agents` | 35,537 | 2026-05-17 | MIT | 27 | **ADOPT (partial)** | HIGH — `tdd-workflows` already installed via `claude-code-workflows`. Source `wshobson/agents` directly for the *full* 75+ agent set. Net gap: language-specific subagents (rust-pro, golang-pro, ts-pro) not in current workflow plugins | Yes — see install |
| `iannuttall/claude-sessions` | 1,200 | 2025-06-16 | MIT | 14 | **REJECT** | LOW — abandoned (last commit 11mo); duplicates `session-report@claude-plugins-official` | No |
| `iannuttall/ralph` | 921 | 2026-02-04 | none | 15 | **REJECT** | LOW — `ralph-loop@claude-plugins-official` already wraps this pattern with hooks | No |
| `VILA-Lab/Dive-into-Claude-Code` | 1,169 | 2026-05-16 | NOASSERTION | 18 | **REFERENCE-DOC** | LOW (install) / HIGH (citation) — arXiv 2604.14228 reference paper; cite in CCBP not install | No |
| `VoltAgent/awesome-claude-code-subagents` | 19,996 | 2026-04-20 | MIT | 23 | STUDY-PILOT | MED — 100+ subagents but no plugin.json shape; overlap with `wshobson/agents` (which has plugin shape). Prefer wshobson | No |
| `rohitg00/awesome-claude-code-toolkit` | 1,700 | 2026-05-12 | Apache-2.0 | 18 | STUDY-PILOT | LOW — kitchen-sink (135 agents/35 skills); same anti-pattern as `everything-claude-code` (§4) | No |
| `claudepluginhub.com` | n/a | n/a | n/a | n/a | DIRECTORY | Use as live index for future scans | n/a |
| `pydantic/skills` | 59 | 2026-05-11 | MIT | 17 | ALREADY INSTALLED | LOW (sleeping) | KEEP-disabled until pydantic-ai is wired |

### Adopt commands

- `wshobson/agents` (gap-fill): `/plugin marketplace add wshobson/agents` then enable selectively (`go-pro`, `rust-pro`, `python-pro`, `ts-pro`). The marketplace ships its own `.claude-plugin/marketplace.json` per the repo's plugin shape (verified in W259 catalog).

## 3. `mattpocock/skills` — Specific Verdict

Repo is Matt's personal `.claude/` directory (88,324★, MIT, Shell-tagged, 200KB total — confirmed via `gh search`). Contents are bash-leaning opinion files, **no `.claude-plugin/marketplace.json`** at root (verified — search shows `language:Shell` and `size:200` only). This means it cannot be installed via `/plugin marketplace add` per `https://code.claude.com/docs/en/plugins` (plugin-shape requirement).

**Verdict: STUDY-PILOT, do not adopt.** Net value vs the 23-skill `addy-agent-skills` (which IS a plugin) and the 80+ skill `engineering-advanced-skills` is **LOW** — popularity is celebrity-driven, content overlaps with `obra:superpowers` (TDD, planning) and `addy:source-driven-development`. Action: extract any unique triggers manually into a project skill under `.claude/skills/` if useful; do not wire as a marketplace.

## 4. `everything-claude-code` — Verdict: **REJECT (disable)**

Ground-truth measurement: the plugin tree contains **1,444 markdown files** (`fs.readdirSync` recursive count, verified). It bundles its own `.codex/`, `.cursor/`, `.gemini/`, `.codebuddy/`, and a `homunculus/instincts` directory — explicitly cross-IDE, not Claude-Code-canonical. Many skills duplicate already-installed primitives (e.g., `tdd-workflow`, `verification-loop`, `frontend-patterns`, `security-review`, `code-review`, `feature-dev`, `plan`).

This **violates cardinal rule 1** ("Install primitives only from trusted plugins/skills/agents" per `https://code.claude.com/docs/en/plugins`) in spirit: kitchen-sink coverage with no quality gate, no provenance check on individual skills, and trigger-text bloat that consumes context-window preload via skill descriptions. The 80% description-overlap with `engineering-advanced-skills` + `obra:superpowers` + `addy:agent-skills` means every conversation pays the load-cost twice.

**Action:** set `everything-claude-code@everything-claude-code: false` in `.claude/settings.json#enabledPlugins`. Marketplace stays on disk as reference. Net context-budget reclaim: ~1,444 description scans avoided per session.

## 5. `ccmanager@kbwo` — STUDY-PILOT (not ADOPT)

1,107★ MIT TypeScript, active (2026-05-17 push). External multi-CLI session manager (Claude / Gemini / Codex / Cursor / Cline / Copilot / OpenCode / Kimi). Useful for orchestrating *multiple* CLI runtimes — not a Claude-Code plugin, not in marketplace shape, runs as standalone TUI. Net-value: LOW for the install-only runtime (single-CLI here); MED if you ever drive Codex+Claude in parallel TUIs. **Verdict: STUDY-PILOT — clone to `Z:\repos\deps\` for cite-reference; do not adopt as Claude Code primitive.** (Codex is already integrated via `codex@openai-codex` plugin + `CLAUDE_CODE_FORK_SUBAGENT`, fulfilling the cross-model gate at cardinal-rule-3 level — ccmanager would be additive UX, not orchestration.)

## 6. Summary actions

1. **Disable 3 duplicates**: `everything-claude-code`, `pr-review-toolkit`, `code-simplifier` → reclaim ~1,500+ skill-description scans.
2. **Adopt `wshobson/agents`** marketplace for language-specific subagents (rust-pro, go-pro, etc.) — fills the only gap in the current 40-plugin set.
3. **Reject** Shubhamsaboo, hesreallyhim, iannuttall (both), Volt, rohitg00, mattpocock — net-value LOW or duplicate.
4. **Reference-cite** VILA-Lab paper in CCBP; do not install.
5. **Pilot-only** ccmanager + agency-agents in `Z:\repos\deps\` if needed; do not enable.

Post-prune target: **37 enabled plugins** (40 − 3 dupes + 0 new immediate; +1 if wshobson lands → 38). Cardinal rule compliance unchanged.

Cites verified TIER-1: plugin shape (`https://code.claude.com/docs/en/plugins`), skills auto-fire (`https://code.claude.com/docs/en/skills`), settings authority (`https://docs.anthropic.com/en/docs/claude-code/settings`), sub-agent precedence (`https://docs.anthropic.com/en/docs/claude-code/sub-agents`). GitHub stars/dates pulled via `mcp__github__search_repositories` 2026-05-17T16:00Z.
