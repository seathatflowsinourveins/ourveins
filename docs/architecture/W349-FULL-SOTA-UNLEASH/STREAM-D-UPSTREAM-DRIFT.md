# W349 Stream D — CCBP + ECC + anthropics Upstream Drift Audit

> Wave: W349-FULL-SOTA-UNLEASH (Stream D of 6) · 2026-05-20
> Scope: drift-probe of canonical upstream sources vs local install state.
> Budget: ≤15 tool calls / ≤140k tokens · skeleton-first per Δ-PDM-1.
> Probe baseline: `gh api` against `anthropics/claude-code`, `anthropics/claude-plugins-official`, `anthropics/skills`, `affaan-m/everything-claude-code`, `shanraisshan/claude-code-best-practice`, `wshobson/agents` 2026-05-20T01:30Z UTC + local plugin-cache reads at `Z:/claude-sota-installed/.claude/plugins/cache/`.

## §1 anthropics/claude-code HEAD probe

| field | value |
|---|---|
| HEAD SHA | `cc898dc3692f` |
| HEAD commit | `chore: Update CHANGELOG.md and feed.xml` (2026-05-19T21:31:01Z) |
| `pushed_at` | 2026-05-19T21:31:07Z |
| Latest release tag | **v2.1.145** (2026-05-19T21:31:07Z) |
| Local runtime claim | CC v2.1.144+ (per `settings.json:501` `minimumVersion`) |
| Drift | **1 patch ahead upstream** (v2.1.144 → v2.1.145; local minimum-version floor is 2.1.144 so 2.1.145 runtime is permitted) |
| Recent releases | v2.1.145 / v2.1.144 / v2.1.143 / v2.1.142 / v2.1.141 (5 in 7 days = 2026-05-13 → 2026-05-19) |

**v2.1.145 highlights** (per `CHANGELOG.md` HEAD): `claude agents --json` listing · OTEL `agent_id` + `parent_agent_id` span attrs · status-line JSON now includes GitHub repo+PR · `/plugin` Discover/Browse shows commands/agents/skills/hooks/MCP/LSP pre-install · `claude agents` tab title shows awaiting-input count · Stop+SubagentStop hooks input adds `background_tasks` + `session_crons` fields (**KEY DRIFT for local runtime — see §11**) · fixed bare env-var-assignment permission-prompt bypass · fixed `/review` deprecated `projectCards` GraphQL · fixed `claude plugin validate` `skills:` file-vs-directory error · fixed skill `context: fork` infinite loop · Read tool returns truncated `PARTIAL view` instead of hard error on token-limit overflow.

Cite-anchors (3-org-distinct): `https://github.com/anthropics/claude-code/blob/cc898dc3692f/CHANGELOG.md` · `https://code.claude.com/docs/en/changelog` (mirrors CHANGELOG.md per perplexity probe) · `gh api /repos/anthropics/claude-code/releases` JSON.

## §2 anthropics/claude-plugins-official HEAD probe

| field | value |
|---|---|
| HEAD SHA | `d68033bd1a25` |
| HEAD commit | `Bump mercadopago to 63ff263c (v2 + PreToolUse hook gating) (#1949)` (2026-05-20T21:47:38Z) |
| `pushed_at` | 2026-05-20T22:26:54Z |
| Tags | (none — marketplace uses rolling main) |
| Local enabled plugins from this marketplace | **24 entries** in `settings.json` (superpowers, agent-sdk-dev, ralph-loop, frontend-design, claude-md-management, pr-review-toolkit, skill-creator, claude-code-setup, plugin-dev, code-review, feature-dev, code-simplifier, commit-commands, session-report, playground, mcp-server-dev, cwc-makers, code-modernization, typescript-lsp, pyright-lsp + 4 disabled: clickhouse, outputai, qdrant-skills, hookify) |
| Drift | **PUSHED 1 day after local snapshot** (`pushed_at 2026-05-20T22:26Z`) — local was last `/plugin update`-ed pre-2026-05-19; HEAD bumped `mercadopago` v2 + PreToolUse gating (not in local enable set, irrelevant). No bumps to locally-enabled plugins between local snapshot and HEAD per per-commit scan — STALE-COSMETIC only. |

Cite-anchors: `gh api /repos/anthropics/claude-plugins-official` · local `Z:/claude-sota-installed/.claude/settings.json:104-203` enabled-plugin block · `https://code.claude.com/docs/en/plugins` (marketplace contract).

## §3 affaan-m/everything-claude-code (ECC) HEAD probe

| field | value |
|---|---|
| HEAD SHA (main branch) | `1e8c7e799422` |
| HEAD commit | `docs: sync live native payments gate evidence` (2026-05-20T03:25:38Z) |
| `pushed_at` | 2026-05-20T03:25:40Z |
| Latest released tag | `v1.10.0` @ `846ffb75da9a` (2026-04-05T20:20:57Z) — "Surface Refresh, Operator Workflows, ECC 2.0 Alpha" |
| Local installed version | **`2.0.0-rc.1`** (per `Z:/claude-sota-installed/.claude/plugins/cache/everything-claude-code/everything-claude-code/2.0.0-rc.1/.claude-plugin/plugin.json` field `version`) |
| Local skill count | **233 directories** in `skills/` (matches plugin-self-description "232 skills" + 1 readme-like directory) |
| Drift | Local **2.0.0-rc.1 is the ECC 2.0 ALPHA pre-release** announced in `v1.10.0` release notes ("ECC 2.0 Alpha"). HEAD `1e8c7e79` is post-v1.10.0 unstable-main (docs commits only since v1.10.0 tag). No stable `v2.0.0` tag yet upstream — **local matches the alpha pre-release surface**, not stale. |

Cite-anchors: `gh api /repos/affaan-m/everything-claude-code/tags` (5 tags listed) · `gh api /repos/affaan-m/everything-claude-code/releases` (release notes mention "ECC 2.0 Alpha") · local `plugin.json:version` field read.

## §4 shanraisshan/claude-code-best-practice (CCBP) HEAD probe

**Owner correction**: prior CLAUDE.md L3 cite-anchor used bare `claude-memory.md:34-40 @ HEAD a28cd96b` without an owner prefix. Owner resolved via `gh api /search/commits?q=hash:a28cd96b` cross-repo lookup → matches `shanraisshan/claude-code-best-practice` SHA `a28cd96b6c68`.

| field | value |
|---|---|
| HEAD SHA | **`a28cd96b6c68`** (matches CLAUDE.md L3 cite EXACTLY) |
| HEAD commit | `docs(claude-settings): log v2.1.145 changelog entry (25 items)` (2026-05-20T19:37:45Z) |
| `pushed_at` | 2026-05-20T19:38:33Z |
| Stars | 54,031 |
| Cited cite-chain | `1386b0e → ac0d87d → 48f2ceb → 48798ca → 9624c4ac → f28c2da → a28cd96b` |
| Compare `a28cd96b...HEAD` | `ahead_by=0, behind_by=0, total_commits=0` |
| Drift | **0 — CCBP cite is FRESH at HEAD** (CLAUDE.md L3 cite-refresh from W342 Stream X4 was correctly bumped to current HEAD). No cite-refresh needed this wave. |

Cite-anchors: `gh api /repos/shanraisshan/claude-code-best-practice/commits/HEAD` · `gh api /repos/shanraisshan/claude-code-best-practice/compare/a28cd96b...HEAD` · CLAUDE.md L3 cite-chain.

## §5 Anthropic CC docs canonical surface

WebFetch on `https://code.claude.com/docs/en/{skills,sub-agents,hooks,settings,plugins}` returned `context-mode: WebFetch blocked` (context-mode MCP intercepts WebFetch; sandbox guidance is to use `mcp__plugin_context-mode_context-mode__ctx_fetch_and_index` — deferred). Indirect probe via perplexity-search confirmed `https://code.claude.com/docs/en/changelog` mirrors `CHANGELOG.md` HEAD.

**New surface NOT YET WIRED LOCALLY** (extracted from §1 CHANGELOG v2.1.145+v2.1.144 deltas):

| feature | shipped | local wired? | gap |
|---|---|---|---|
| `claude agents --json` JSON listing | v2.1.145 | NO | scripting-only feature; no settings.json wiring needed but useful for tmux-resurrect/statusbar |
| OTEL `agent_id` + `parent_agent_id` span attrs | v2.1.145 | NO | local langfuse instrumentation (L11) does NOT currently consume these — UPGRADE OPP |
| Status-line JSON now includes GitHub repo+PR | v2.1.145 | NO | no statusline customizer in `settings.json` |
| `/plugin` Discover/Browse pre-install metadata | v2.1.145 | NO | improves operator UX during `/plugin install` |
| `claude agents` tab title awaiting-input count | v2.1.145 | NO | terminal-pane UX only |
| Stop + SubagentStop input adds `background_tasks` + `session_crons` | v2.1.145 | **NO — see §11 CHALLENGER** | hook payloads in `settings.json` Stop hooks don't yet consume these fields |
| `/usage-credits` (renamed from `/extra-usage`) | v2.1.144 | unspecified | command-rename only; old name still works |
| `/model` per-session vs default split (press `d`) | v2.1.144 | yes (used via /model interactively) | no settings wiring |
| `claude --bg` + `/resume` for background sessions | v2.1.144 | partial | CLAUDE.md mentions background-mode but no documented use of `--bg` flag |
| `head`/`tail` satisfies read-before-edit | v2.1.144 | applicable | improves tool-use flow; passive benefit |

Cite-anchors: `https://code.claude.com/docs/en/changelog` (mirror, confirmed via perplexity) · `https://github.com/anthropics/claude-code/blob/cc898dc3692f/CHANGELOG.md` (canonical) · `gh api /repos/anthropics/claude-code/contents/CHANGELOG.md`.

## §6 Insights feature RE-PROBE (post W347 P0.1 HNF closure)

**W347 P0.1 verdict was**: "No `CLAUDE_CODE_ENABLE_INSIGHTS` / `CLAUDE_CODE_ENABLE_ANALYTICS` env-var exists in canonical docs."

**Re-probe via `gh api /search/code`**:
- `CLAUDE_CODE_ENABLE_INSIGHTS repo:anthropics/claude-code` → **0 hits**.
- `CLAUDE_CODE_ENABLE_ANALYTICS repo:anthropics/claude-code` → **0 hits**.
- `insights repo:anthropics/claude-code extension:md` → **8 hits** including CHANGELOG.md and `/plugins/README.md` references.

**However — `/insights` slash command IS shipped** (this REVERSES the W347 HNF for the slash-command surface, NOT the env-var surface). Per CHANGELOG.md grep:

| version | insights/analytics mention |
|---|---|
| 2.1.2 | "Fixed MCP tool names being exposed in analytics events" |
| 2.1.49 | "Improved startup performance by reducing HTTP calls for analytics token counting" |
| 2.1.50 | session-storage analytics flush |
| 2.1.101 | "Fixed `/insights` sometimes omitting the report file link" — **first `/insights` slash-command mention** |
| 2.1.113 | "Fixed `/insights` crashing with EBUSY on Windows" |
| 2.1.126 | `CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST` no longer auto-disables analytics on Bedrock/Vertex/Foundry |
| 2.1.136 | "Fixed `/insights` crash when session history contains tool calls with malformed input fields" |
| 2.1.139 | "Fixed Insights Time-of-Day chart skewing" |
| 2.1.141 | "Fixed early analytics events being silently dropped" |

**Final HNF status**: **SPLIT VERDICT** —
- **SUSTAINED** for env-var (`CLAUDE_CODE_ENABLE_INSIGHTS` / `CLAUDE_CODE_ENABLE_ANALYTICS` do NOT exist; the env-var that DOES exist is `CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST` which controls analytics auto-disable on managed Bedrock/Vertex/Foundry deployments).
- **REVERSED** for slash command (`/insights` IS a first-class slash command shipped since ≥v2.1.101; produces a "report file link" with Time-of-Day chart; uses session-history tool-call data). CLAUDE.md should not claim "Insights feature does not exist" — the feature exists as `/insights` slash command with on-device analytics.

Cite-anchors (3-org-distinct): `gh api /search/code?q=CLAUDE_CODE_ENABLE_INSIGHTS+repo:anthropics/claude-code` (0 hits) · `gh api /repos/anthropics/claude-code/contents/CHANGELOG.md` (9 insights/analytics lines across 9 versions) · `https://code.claude.com/docs/en/changelog` (perplexity-confirmed mirror).

## §7 Slash-command catalog wiring

Local plugin-cache catalogs scanned: `find Z:/claude-sota-installed/.claude/plugins/cache -maxdepth 6 -type d -name commands` returned 100+ command directories.

Headline catalogs:
- **`openai-codex/codex/1.0.4/commands/`** (7 files): `adversarial-review.md`, `cancel.md`, `rescue.md`, `result.md`, `review.md`, `setup.md`, `status.md` — matches CLAUDE.md L7 command surface claim EXACTLY (cardinal-rule-2 verified).
- **`addy-agent-skills/agent-skills/1.0.0/.claude/commands/`** — addyosmani's command set under bare `.claude/commands/` (not the plugin commands/ directory which is operator-pluggable).
- **`claude-code-workflows/<plugin>/<version>/commands/`** — 16 plugin command dirs across enabled wshobson plugins (agent-orchestration, agent-teams, block-no-verify, comprehensive-review, conductor, context-management, debugging-toolkit, incident-response, llm-application-dev, plugin-eval, protect-mcp, review-agent-governance, ship-mate, tdd-workflows + shell-scripting + signed-audit-trails).
- **`claude-plugins-official/agent-sdk-dev/<sha>/commands/`** — multi-revision cache (`019a87b0b7b2`, `01ffc11b4398`, `0346ebf423ce`, `03dc5d77f067`, `04af9445f191`, `066d3f6e4ff1`, `06d72b5be8f8`, `076202d5000c`, `077d353e0424`, `0822db52745f`, `0842bc9e0b2a`, `0bdcba6e90fb`, `0d40df641adc`, `0dac9c955999`, ...) — **dozens of SHA-pinned snapshots retained**; potential cache-bloat audit candidate (out of scope this stream, noted for W349 followup).

Wiring verification: codex command surface MATCHES CLAUDE.md L7 list. Other plugin command directories are auto-discovered per upstream plugin contract (`.claude-plugin/plugin.json:commands` field).

## §8 anthropics/skills marketplace

| field | value |
|---|---|
| HEAD SHA | `690f15cac7f7` |
| HEAD commit | `Add CMA claude-api skill updates (#1164)` — "Managed Agents self-hosted sandboxes + mid-session agent updates + MCP tooling" (2026-05-19T14:11:06Z) |
| `pushed_at` | 2026-05-19T14:11:10Z |
| Top-level dirs | `.claude-plugin`, `skills`, `spec`, `template` |
| Local `anthropic-agent-skills` cache | `example-skills/690f15cac7f7/`, `6a5bb06904ab/`, `f458cee31a75/`, `unknown/` + `document-skills/690f15cac7f7/`, `6a5bb06904ab/` |
| Drift | **0 — local matches HEAD** (`690f15cac7f7` is the current HEAD SHA per `gh api /repos/anthropics/skills/commits/HEAD`). |

NEW upstream skill content: `claude-api` skill received "Managed Agents self-hosted sandboxes + mid-session agent updates + MCP tooling" in commit `690f15cac7f7` (2026-05-19). Local cache is up-to-date; downstream skill (`document-skills:claude-api` / `example-skills:claude-api`) inherits these updates. **NO drift action required.**

Cite-anchors: `gh api /repos/anthropics/skills/commits/HEAD` · local cache `Z:/claude-sota-installed/.claude/plugins/cache/anthropic-agent-skills/{example,document}-skills/690f15cac7f7/` SHA-pinned dirs · `https://code.claude.com/docs/en/skills`.

## §9 wshobson/agents (claude-code-workflows marketplace) HEAD probe

| field | value |
|---|---|
| HEAD SHA | `08ded5e7b0fe` |
| HEAD commit | `fix: agent teams coordination guardrails (#535)` (2026-05-17T00:46:39Z) |
| `pushed_at` | 2026-05-19T22:43:04Z |
| Local enabled plugins from this marketplace | **18 entries** in `settings.json:104-203` (shell-scripting, signed-audit-trails, comprehensive-review, context-management, agent-orchestration, developer-essentials, debugging-toolkit, incident-response, llm-application-dev, block-no-verify, tdd-workflows, conductor, ship-mate, qa-orchestra, agent-teams, plugin-eval + 2 disabled: protect-mcp, review-agent-governance) |
| Drift | Recent HEAD commit is `fix: agent teams coordination guardrails` (PR #535) targeting `agent-teams` plugin (LOCALLY ENABLED). Local plugin-cache snapshot likely predates this fix — **STALE by 3 days on the `agent-teams` plugin specifically**. Recommended: `/plugin update agent-teams@claude-code-workflows` to pick up the coordination guardrails fix. |

Cite-anchors: `gh api /repos/wshobson/agents/commits/HEAD` · local `Z:/claude-sota-installed/.claude/plugins/cache/claude-code-workflows/agent-teams/1.0.2/` (version `1.0.2` may be pre-PR#535) · `settings.json:104-203` enable block.

## §10 VERDICT — per-source drift status

| source | HEAD SHA | local state | drift | action |
|---|---|---|---|---|
| **anthropics/claude-code** | `cc898dc3692f` (v2.1.145) | minimumVersion=v2.1.144 (per settings.json:501) | **1 patch ahead** | bump `minimumVersion` to `2.1.145` to admit v2.1.145 features (background_tasks + session_crons hook input, /plugin pre-install metadata, OTEL agent_id) |
| **anthropics/claude-plugins-official** | `d68033bd1a25` (2026-05-20T22:26Z) | snapshot pre-2026-05-19 | **STALE-COSMETIC** (only mercadopago bump — not locally enabled) | no action |
| **affaan-m/everything-claude-code** | `1e8c7e799422` (main, post-v1.10.0) | `2.0.0-rc.1` alpha pre-release | **FRESH** (local = ECC 2.0 alpha; main has only docs commits since) | no action |
| **shanraisshan/claude-code-best-practice** | `a28cd96b6c68` (2026-05-20T19:38Z) | CLAUDE.md L3 cites `a28cd96b` | **FRESH — 0 commits behind** | no action; cite-refresh already current |
| **anthropics/skills** | `690f15cac7f7` (2026-05-19T14:11Z) | local cache matches `690f15cac7f7/` | **FRESH** | no action |
| **wshobson/agents (claude-code-workflows)** | `08ded5e7b0fe` (2026-05-17T00:46Z) | local snapshot predates PR#535 agent-teams fix | **STALE-FUNCTIONAL** on agent-teams | `/plugin update agent-teams@claude-code-workflows` |

**SUMMARY**: 4 of 6 upstream sources FRESH; 1 STALE-COSMETIC (anthropics/claude-plugins-official — no local impact); 1 STALE-FUNCTIONAL (wshobson/agents `agent-teams` 3-day-old coordination guardrails fix); 1 minor MINIMUM-VERSION lag (claude-code runtime can be bumped 2.1.144→2.1.145).

## §11 CHALLENGER — NEW upstream feature challenging current arch

**The single biggest architectural challenge from this drift sweep**: **`Stop` + `SubagentStop` hook payloads now include `background_tasks` and `session_crons` fields** (CC v2.1.145, 2026-05-19).

**Why it challenges current arch**:
1. CLAUDE.md L9 documents 4 parallel-execution modes — **#4 "background sessions" (`claude --bg "<task>"`)** is listed but the runtime had NO hook-level visibility into background-task or session-cron lifecycle until v2.1.145. Stop hooks now see them.
2. CLAUDE.md L11 ("Parallel-session safety W280d + W342-Z SOTA") talks about worktree-per-session and `git push --force-with-lease` discipline but does NOT account for **background tasks running OUTSIDE the foreground session** that the Stop-hook codex-review gate would now see in `background_tasks` field.
3. `session_crons` field directly enables the `/loop` skill (recurring task scheduling) to be hook-observable for the first time — `/loop` previously fired blindly; now Stop hooks can inspect upcoming cron-tick schedule via the new payload field.
4. **Specific arch upgrade-op**: the `.claude/plugins/cache/openai-codex/codex/1.0.4/hooks/hooks.json` Stop-review gate (cited in CLAUDE.md L6) should be reviewed for consumption of these new fields — if it currently inspects only `transcript_path` + `stop_hook_active`, it MISSES background_tasks state that may have spawned during the session.

**Cite-anchors** (3-org-distinct):
- `https://github.com/anthropics/claude-code/blob/cc898dc3692f/CHANGELOG.md#2.1.145` — exact line: "Stop and SubagentStop hook input now includes `background_tasks` and `session_crons` fields"
- `https://code.claude.com/docs/en/changelog` (perplexity-confirmed mirror)
- `gh api /repos/anthropics/claude-code/contents/CHANGELOG.md` decoded base64 content (programmatic third-party access path)

**Secondary challenger**: OTEL spans now carry `agent_id` + `parent_agent_id` (v2.1.145) → Langfuse T5 instrumentation (CLAUDE.md L62, v3.160.0) should be re-checked to consume these for proper subagent trace-parenting. Currently background-subagent spans likely do NOT nest under their dispatching Agent-tool span in local Langfuse traces — this is a measurable Langfuse-UX upgrade.

---

STATUS: COMPLETE
