# W318-B Stream — Anthropic Official Ingest

**Wave**: W318 Stream B
**Date**: 2026-05-19
**Sources**: `github.com/anthropics/claude-code` (latest release + CHANGELOG), `github.com/anthropics/claude-code-action`, `code.claude.com/docs`

## §1 — CLI version status (post-baseline reverify)

| Metric | Value | Source |
|---|---|---|
| Currently installed | `2.1.144` | `claude --version` 2026-05-19 |
| `npm view @anthropic-ai/claude-code version` | `2.1.144` | npm registry probe 2026-05-19 |
| Latest GitHub release tag | `v2.1.144` | `api.github.com/repos/anthropics/claude-code/releases/latest` |
| **Delta** | **ZERO — parity confirmed** | — |
| **Reinstall required?** | **NO** | mandate "reinstall and compare" → no SHA-newer upstream exists |

## §2 — claude-code-action repo status

| Metric | Value |
|---|---|
| Latest release tag | `v1` (`v1.0`) |
| Release date | 2025-08-26 (stable since) |
| Total releases | 187 |
| **Delta vs W317** | **ZERO** — still at v1.0 |

claude-code-action is not installed in this runtime (no GitHub Actions workflow consumes it locally); recorded as cite-only.

## §3 — Anthropic CLI 2.1.144 feature-gap analysis vs W317 baseline + W318-FULL-UNLEASH-WAVE Stream 6 backlog

| 2.1.144 NEW feature | Cite | Our runtime status | W319 action |
|---|---|---|---|
| `/resume` supports background sessions; `bg`-marked in agent view | CHANGELOG 2.1.144 line 1 | NOT YET wired in skills (no skill mentions `claude --bg` resume flow) | **W319 operator-AI**: add `--bg` + `/resume` pattern to `background-sessions-skill` or `everything-claude-code:strategic-compact` |
| Elapsed-duration in background-agent completion notifications | CHANGELOG 2.1.144 line 2 | passive — no action needed | NO-OP |
| `/plugin` browse pane shows last-updated date | CHANGELOG 2.1.144 line 3 | passive — auto-benefits `/plugin install` review | NO-OP |
| `/model` session-only by default; press `d` to set default | CHANGELOG 2.1.144 line 4 | aligned with our Opus 4.7 default policy | NO-OP |
| `/extra-usage` → `/usage-credits` rename | CHANGELOG 2.1.144 line 5 | no skill references old name | NO-OP |
| 75s startup-hang fix for unreachable `api.anthropic.com` | CHANGELOG 2.1.144 fix | benefits Z:-portable runtime under captive-portal | NO-OP (auto-benefit) |
| `head`/`tail` satisfy read-before-edit check | CHANGELOG 2.1.144 fix | reduces context-mode override pressure | NO-OP (auto-benefit) |
| `/branch` failing in worktrees fixed | CHANGELOG 2.1.144 fix | benefits our 3 worktrees (main/-W272/-W273) | NO-OP (auto-benefit) |
| `claude mcp list` now shows config errors for malformed `.mcp.json` | CHANGELOG 2.1.144 fix | benefits our `.mcp.json` debug flow | NO-OP (auto-benefit) |
| **Background session worktree-isolation guard applies for `WorktreeCreate` hooks** | CHANGELOG 2.1.144 fix | **directly affects our `WorktreeCreate`/`WorktreeRemove` hooks** in settings.json:141-145 | **W319 operator-AI**: smoke-test `claude --bg` flow against our hooks |
| 2.1.143: scrolling fixes in attached bg sessions on Windows (PgUp/PgDn, mouse wheel, Ctrl+O transcript) | CHANGELOG 2.1.143 | **DIRECTLY relevant to our Windows 11 / Z:-portable runtime** | NO-OP (auto-benefit) |
| 2.1.142: `claude agents` got `--add-dir` `--settings` `--mcp-config` `--plugin-dir` `--permission-mode` `--model` `--effort` `--dangerously-skip-permissions` | CHANGELOG 2.1.142 | enables fine-grained bg session config | **W319 operator-AI**: document in CLAUDE.local.md |
| 2.1.142: Fast mode default Opus 4.7 (was 4.6) | CHANGELOG 2.1.142 | already on Opus 4.7 | NO-OP |
| 2.1.142: Plugins with root-level `SKILL.md` and no `skills/` are surfaced as skill | CHANGELOG 2.1.142 | matches alirezarezvani plugin structure pattern — relevant to W319 alirezarezvani install | NO-OP |
| 2.1.140: `/goal` silent-hang under `disableAllHooks`/`allowManagedHooksOnly` fixed | CHANGELOG 2.1.140 | our settings.json has neither set → never affected | NO-OP (cite-only) |

## §4 — Anthropic feature backlog not yet adopted in this runtime (post-2.1.144)

1. **Background sessions (`claude --bg`)** — W318-FULL-UNLEASH Stream 6 already identified gap; 2.1.144 cements `/resume` integration. NO skill currently invokes `claude --bg` for off-critical-path work (codex-review dispatch, nightly eval). **W319 P0**: author `background-sessions` operator-skill or extend `superpowers:dispatching-parallel-agents` to mention `claude --bg` as mode-4 dispatch. CLAUDE.md L8 already documents "background sessions" as parallel-mode-4, but no skill operationalizes it.
2. **Claude Code Analytics API** — W310-EXT γ identified `https://docs.anthropic.com/en/release-notes/api` Sep-10-2025 release "Claude Code Analytics API"; org-scoped HTTP endpoint at `/docs/en/manage-claude/claude-code-analytics-api`. **NOT wired** (no skill, no MCP, no helper). Deferred to W319+ pending org-API-key availability.
3. **`/plan-goal` + `/plan-loop`** — these are NOT Anthropic primitives, they're planning-with-files (PWF) compositions over `/goal` (v2.1.139) and `/loop` (v2.1.72+). The Anthropic native `/goal` and `/loop` primitives are already used by us via `loop` skill. **Convergent design opportunity** with PWF re-litigation in W318-B-PWF.md.
4. **VS Code session-forking** — CHANGELOG entries reference VS Code session forking; not relevant to our terminal-only Z:-portable.
5. **Skills API (`@anthropic-ai/claude-code-sdk`)** — released earlier (1.0.23); not consumed by our agents (we use the CLI directly).

## §5 — Cite-refresh patches (paste-ready, none needed)

CLAUDE.md L3 cites CCBP `48798ca`, NOT Anthropic CLI. No Anthropic-source cite in CLAUDE.md changes needed.

## §6 — VERDICT

| Item | Verdict |
|---|---|
| CLI 2.1.144 reinstall | **NOT REQUIRED** (already at npm-latest) |
| claude-code-action update | **NOT APPLICABLE** (not installed locally) |
| Background-session integration | **W319 P0 operator-AI** (3 sub-items: skill author + WorktreeCreate hook smoke + CLAUDE.local.md docs) |
| Analytics API wiring | **W320+ DEFERRED** (org-API-key required) |
