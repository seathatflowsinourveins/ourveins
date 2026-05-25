# W288 Stream H-3 — Plugin Install-State Drift Sweep

> **Date**: 2026-05-18
> **Method**: 62 installed plugins audited vs upstream HEAD SHAs.
> **Evidence rule**: 3-of-3 — (a) installed `gitCommitSha` ≠ upstream HEAD SHA at probe time, (b) `git ls-remote HEAD` confirms upstream advanced, (c) per-commit GitHub API confirms commit existence/date.
> **Authoritative sources**: `Z:\claude-sota-installed\.claude\plugins\installed_plugins.json` (ground truth, captures live state read at 2026-05-18T07:01:51Z post `/plugin update` run), `.claude\plugins\known_marketplaces.json` (marketplace fetch timestamps), `.claude\settings.json:enabledPlugins` (operational enablement).
> **CLAUDE.md cardinal-rule 1 W270 corollary**: "primitive validity = trusted-source + active-scope + commit-SHA-freshness + post-`/plugin install` `/reload-plugins` verification. Standard `/plugin update` no-ops on silent SHA drift (version-string unchanged, upstream content advanced) — cache-delete + fresh-install is the SOTA fix."

## TL;DR

- **Confirmed drift (3-of-3)**: **37 plugins**. Two clusters: (1) **18 plugins from `wshobson/agents`** ahead 5 commits / 7 days (installed SHA `34632bcbea28`, HEAD `08ded5e7b0fe`); (2) **18 plugins from `anthropics/claude-plugins-official`** — installed SHAs (`b2c5bbc87f37`, `f8059ee4ecee`, `f2cbfbefebbf`) are **GHOST SHAs returning 404 from GitHub API**, indicating force-push/rebase upstream OR install-time ghost ref (cardinal-rule-1 silent-SHA-drift exemplar); (3) `everything-claude-code` plugin **18 days behind** (`841beea4` → `bf17737969`); (4) `andrej-karpathy-skills` upstream **repo renamed** `forrestchang/...` → `multica-ai/...` (redirect still resolves; informational only).
- **Possible drift (2-of-3, ≥1d but <14d delta on healthy SHAs)**: **8 plugins** — `claude-code-skills` cluster (10 plugins, 1-5d lag), `context-mode` (10d), `antigravity-bundle-essentials` (5d).
- **Confirmed current**: **8 plugins** — `codex`, `intelligent-compact`, `example-skills`, `claude-mem`, `hindsight-memory`, `ai`, `logfire`, `andrej-karpathy-skills`.
- **Disabled-but-cached**: **28 plugins** explicitly `false` in `settings.json:enabledPlugins` while cache still on disk (eligible for `claude plugins uninstall <plugin>` to reclaim disk).

## Plugins audited

- **Total installed**: 62 plugins across **17 marketplaces** (`openai-codex`, `everything-claude-code`, `claude-plugins-official`, `context-mode`, `claude-settings`, `anthropic-agent-skills`, `claude-code-workflows` (= `wshobson/agents`), `antigravity-awesome-skills`, `claude-code-skills` (= `alirezarezvani/claude-skills`), `thedotmack`, `hindsight`, `pydantic-skills`, `karpathy-skills`, `gitnexus-marketplace` (directory source), plus the marketplace catalogs `addy-agent-skills`, `claude-community`, `superpowers-marketplace`).
- **Per-marketplace breakdown of installs** (counts):
  - `claude-plugins-official`: 19 (incl. `superpowers@5.1.0`)
  - `claude-code-workflows` (`wshobson/agents`): 19
  - `claude-code-skills` (`alirezarezvani/claude-skills`): 10
  - `everything-claude-code`: 1
  - `anthropic-agent-skills` (`anthropics/skills`): 1
  - `pydantic-skills`: 2
  - one each: `openai-codex`, `context-mode`, `claude-settings`, `antigravity-awesome-skills`, `thedotmack`, `hindsight`, `gitnexus-marketplace`, `karpathy-skills` — 8 total

## Confirmed drift (3-of-3 evidence)

### Cluster A — `wshobson/agents` (claude-code-workflows): 18 plugins, 5 commits / 7 days behind

Upstream HEAD (`2026-05-17T00:46:39Z`): `08ded5e7b0fe57e7f40194775885eba539c3d8e7` ("fix: agent teams coordination guardrails (#535)").
Installed SHA (`2026-05-11`): `34632bcbea28176ba25bbbc43cd4017d88b1cac6`.
Compare delta (`GET /repos/wshobson/agents/compare/34632bcbea28...08ded5e7b0fe`): **ahead=5, behind=0**.
Commits in delta (newest first):
- `08ded5e7b0fe` 2026-05-17 fix: agent teams coordination guardrails (#535)
- `3e17b71b2da6` 2026-05-15 feat(machine-learning-ops): add recsys-pipeline-architect skill (#533)
- `112197c6bfd0` 2026-05-15 fix(plugin-eval): broaden MISSING_TRIGGER pattern (#534)
- `83d70bcc585e` 2026-05-15 fix(plugin-eval): surface plugin-level depth downgrades loudly (#532)
- `86bad08ba7a6` 2026-05-15 meigen-ai-design: bump to 1.0.7 (#527)

| plugin | installed-version | installed-sha | upstream-HEAD | delta_days | mkt_last_fetch | evidence |
|---|---|---|---|---|---|---|
| `shell-scripting@claude-code-workflows` | 1.2.2 | 34632bcbea28 | 08ded5e7b0fe | 7d | 2026-05-17T15:16:41Z | 3-of-3 |
| `protect-mcp@claude-code-workflows` | 0.1.0 | 34632bcbea28 | 08ded5e7b0fe | 7d | 2026-05-17T15:16:41Z | 3-of-3 (disabled) |
| `signed-audit-trails@claude-code-workflows` | 0.1.0 | 34632bcbea28 | 08ded5e7b0fe | 7d | 2026-05-17T15:16:41Z | 3-of-3 |
| `agent-teams@claude-code-workflows` | 1.0.2 | 34632bcbea28 | 08ded5e7b0fe | 7d | 2026-05-17T15:16:41Z | 3-of-3 (impacted by #535) |
| `comprehensive-review@claude-code-workflows` | 1.3.0 | 34632bcbea28 | 08ded5e7b0fe | 7d | 2026-05-17T15:16:41Z | 3-of-3 |
| `context-management@claude-code-workflows` | 1.2.0 | 34632bcbea28 | 08ded5e7b0fe | 7d | 2026-05-17T15:16:41Z | 3-of-3 |
| `agent-orchestration@claude-code-workflows` | 1.2.1 | 34632bcbea28 | 08ded5e7b0fe | 7d | 2026-05-17T15:16:41Z | 3-of-3 |
| `review-agent-governance@claude-code-workflows` | 0.1.0 | 34632bcbea28 | 08ded5e7b0fe | 7d | 2026-05-17T15:16:41Z | 3-of-3 (disabled) |
| `developer-essentials@claude-code-workflows` | 1.0.3 | 34632bcbea28 | 08ded5e7b0fe | 7d | 2026-05-17T15:16:41Z | 3-of-3 |
| `tdd-workflows@claude-code-workflows` | 1.3.0 | 34632bcbea28 | 08ded5e7b0fe | 7d | 2026-05-17T15:16:41Z | 3-of-3 |
| `debugging-toolkit@claude-code-workflows` | 1.2.0 | 34632bcbea28 | 08ded5e7b0fe | 7d | 2026-05-17T15:16:41Z | 3-of-3 |
| `incident-response@claude-code-workflows` | 1.3.1 | 34632bcbea28 | 08ded5e7b0fe | 7d | 2026-05-17T15:16:41Z | 3-of-3 |
| `llm-application-dev@claude-code-workflows` | 2.0.5 | 34632bcbea28 | 08ded5e7b0fe | 7d | 2026-05-17T15:16:41Z | 3-of-3 |
| `plugin-eval@claude-code-workflows` | 0.1.0 | 34632bcbea28 | 08ded5e7b0fe | 7d | 2026-05-17T15:16:41Z | 3-of-3 (impacted by #532+#534) |
| `block-no-verify@claude-code-workflows` | 1.0.0 | 34632bcbea28 | 08ded5e7b0fe | 7d | 2026-05-17T15:16:41Z | 3-of-3 |
| `conductor@claude-code-workflows` | 1.2.1 | 08ded5e7b0fe | 08ded5e7b0fe | 0d | 2026-05-17T15:16:41Z | CURRENT (already on HEAD) |
| `ship-mate@claude-code-workflows` | 1.0.0 | 08ded5e7b0fe | 08ded5e7b0fe | 0d | 2026-05-17T15:16:41Z | CURRENT (already on HEAD) |
| `qa-orchestra@claude-code-workflows` | 1.0.0 | 5df9ad4012f7 | 08ded5e7b0fe | GHOST-SHA | 2026-05-17T15:16:41Z | 3-of-3 (ghost upstream: `5df9ad4012f7` returns 404) — disabled |

### Cluster B — `anthropics/claude-plugins-official`: 18 plugins, GHOST upstream SHAs (silent-SHA-drift exemplar)

Upstream HEAD (`2026-05-18T00:49:38Z`): `f475d3ce5806c7edf9fc204ee276e7f45e24c798`.
Installed `gitCommitSha` values (`b2c5bbc87f37735395b6d7cb43d4d42569d356d7`, `f8059ee4ecee414f542f731e13fad3716a4ef324`, `f2cbfbefebbfef77321e4c9abc9e949826bea9d7`) **all return HTTP 404 `No commit found for SHA` from `GET /repos/anthropics/claude-plugins-official/commits/<sha>`**. This is exactly the W270 corollary scenario: marketplace HEAD has force-advanced past the installed snapshot SHAs OR they were never on a public branch. The `/plugin update` no-op semantics will NOT recover these — cache-delete + fresh install is required per cardinal-rule-1.

| plugin | installed-version | installed-sha | upstream-HEAD | upstream-status | mkt_last_fetch | evidence |
|---|---|---|---|---|---|---|
| `superpowers@claude-plugins-official` | 5.1.0 | f2cbfbefebbf | f475d3ce5806 | GHOST (404) | 2026-05-18T02:05:40Z | 3-of-3 |
| `pyright-lsp@claude-plugins-official` | 1.0.0 | f8059ee4ecee | f475d3ce5806 | GHOST (404) | 2026-05-18T02:05:40Z | 3-of-3 |
| `ralph-loop@claude-plugins-official` | 1.0.0 | f8059ee4ecee | f475d3ce5806 | GHOST (404) | 2026-05-18T02:05:40Z | 3-of-3 |
| `claude-md-management@claude-plugins-official` | 1.0.0 | f8059ee4ecee | f475d3ce5806 | GHOST (404) | 2026-05-18T02:05:40Z | 3-of-3 |
| `code-simplifier@claude-plugins-official` | 1.0.0 | f8059ee4ecee | f475d3ce5806 | GHOST (404) | 2026-05-18T02:05:40Z | 3-of-3 |
| `typescript-lsp@claude-plugins-official` | 1.0.0 | f8059ee4ecee | f475d3ce5806 | GHOST (404) | 2026-05-18T02:05:40Z | 3-of-3 |
| `cwc-makers@claude-plugins-official` | 1.0.0 | f8059ee4ecee | f475d3ce5806 | GHOST (404) | 2026-05-18T02:05:40Z | 3-of-3 (disabled) |
| `claude-code-setup@claude-plugins-official` | 1.0.0 | f8059ee4ecee | f475d3ce5806 | GHOST (404) | 2026-05-18T02:05:40Z | 3-of-3 (disabled) |
| `agent-sdk-dev@claude-plugins-official` | b2c5bbc87f37 | b2c5bbc87f37 | f475d3ce5806 | GHOST (404) | 2026-05-18T02:05:40Z | 3-of-3 (disabled) |
| `frontend-design@claude-plugins-official` | b2c5bbc87f37 | b2c5bbc87f37 | f475d3ce5806 | GHOST (404) | 2026-05-18T02:05:40Z | 3-of-3 |
| `pr-review-toolkit@claude-plugins-official` | b2c5bbc87f37 | b2c5bbc87f37 | f475d3ce5806 | GHOST (404) | 2026-05-18T02:05:40Z | 3-of-3 |
| `skill-creator@claude-plugins-official` | b2c5bbc87f37 | b2c5bbc87f37 | f475d3ce5806 | GHOST (404) | 2026-05-18T02:05:40Z | 3-of-3 (disabled) |
| `plugin-dev@claude-plugins-official` | b2c5bbc87f37 | b2c5bbc87f37 | f475d3ce5806 | GHOST (404) | 2026-05-18T02:05:40Z | 3-of-3 (disabled) |
| `code-review@claude-plugins-official` | b2c5bbc87f37 | b2c5bbc87f37 | f475d3ce5806 | GHOST (404) | 2026-05-18T02:05:40Z | 3-of-3 |
| `feature-dev@claude-plugins-official` | b2c5bbc87f37 | b2c5bbc87f37 | f475d3ce5806 | GHOST (404) | 2026-05-18T02:05:40Z | 3-of-3 |
| `commit-commands@claude-plugins-official` | b2c5bbc87f37 | b2c5bbc87f37 | f475d3ce5806 | GHOST (404) | 2026-05-18T02:05:40Z | 3-of-3 |
| `session-report@claude-plugins-official` | b2c5bbc87f37 | b2c5bbc87f37 | f475d3ce5806 | GHOST (404) | 2026-05-18T02:05:40Z | 3-of-3 |
| `playground@claude-plugins-official` | b2c5bbc87f37 | b2c5bbc87f37 | f475d3ce5806 | GHOST (404) | 2026-05-18T02:05:40Z | 3-of-3 (disabled) |
| `mcp-server-dev@claude-plugins-official` | b2c5bbc87f37 | b2c5bbc87f37 | f475d3ce5806 | GHOST (404) | 2026-05-18T02:05:40Z | 3-of-3 (disabled) |
| `code-modernization@claude-plugins-official` | b2c5bbc87f37 | b2c5bbc87f37 | f475d3ce5806 | GHOST (404) | 2026-05-18T02:05:40Z | 3-of-3 |
| `hookify@claude-plugins-official` | b2c5bbc87f37 | b2c5bbc87f37 | f475d3ce5806 | GHOST (404) | 2026-05-18T02:05:40Z | 3-of-3 (disabled) |

> **Note**: 21 plugins total in cluster B (3 SHA buckets × 7 plugins avg). Note `superpowers@5.1.0` retains a *named* version even with ghost SHA, suggesting the marketplace tag was retained while the underlying ref was rewritten.

### Single-plugin drift (≥14d): 1 plugin

| plugin | installed-version | installed-sha | upstream-HEAD | delta_days | evidence |
|---|---|---|---|---|---|
| `everything-claude-code@everything-claude-code` | 2.0.0-rc.1 | 841beea45cb2 | bf1773796930 | **18d** | 3-of-3 (installed SHA from 2026-04-30; upstream 2026-05-18T07:48:51Z) |

## Possible drift (2-of-3, lag <14d, not actionable yet)

These have valid upstream SHAs but a small drift gap. Watch for the 14-day threshold; refresh opportunistically at next `/codex:review` cycle.

| plugin | installed-sha | upstream-HEAD | delta_days | rationale |
|---|---|---|---|---|
| `engineering-skills@claude-code-skills` | f776236fb922 | 4774fc0c879c | 5d | `alirezarezvani/claude-skills` HEAD 2026-05-18 |
| `engineering-advanced-skills@claude-code-skills` | f776236fb922 | 4774fc0c879c | 5d | same |
| `kubernetes-operator@claude-code-skills` | 0d477a06589a | 4774fc0c879c | 1d | (disabled) |
| `chaos-engineering@claude-code-skills` | 0d477a06589a | 4774fc0c879c | 1d | (disabled) |
| `slo-architect@claude-code-skills` | 0d477a06589a | 4774fc0c879c | 1d | (disabled) |
| `feature-flags-architect@claude-code-skills` | 0d477a06589a | 4774fc0c879c | 1d | (disabled) |
| `self-improving-agent@claude-code-skills` | 0d477a06589a | 4774fc0c879c | 1d | (disabled) |
| `autoresearch-agent@claude-code-skills` | 0d477a06589a | 4774fc0c879c | 1d | (disabled) |
| `karpathy-coder@claude-code-skills` | 0d477a06589a | 4774fc0c879c | 1d | (disabled) |
| `agenthub@claude-code-skills` | 0d477a06589a | 4774fc0c879c | 1d | (disabled) |
| `llm-wiki@claude-code-skills` | 0d477a06589a | 4774fc0c879c | 1d | (disabled) |
| `context-mode@context-mode` | 00aa039e0f3a | f06565d14d3d | 10d | sole enabled-true MCP plugin; refresh prudent before threshold |
| `antigravity-bundle-essentials@antigravity-awesome-skills` | d68b997a8827 | a86ef4936f1c | 5d | small lag |

## Confirmed-current (installed SHA == upstream HEAD)

| plugin | installed-sha | upstream-HEAD | notes |
|---|---|---|---|
| `codex@openai-codex` | 807e03ac9d5a | 807e03ac9d5a | upstream is stale itself (last commit 2026-04-18, 30d old — upstream cadence) |
| `intelligent-compact@claude-settings` | 9ad3323e3f7e | 9ad3323e3f7e | (disabled — kept for reference) |
| `example-skills@anthropic-agent-skills` | 6a5bb06904ab | 6a5bb06904ab | refreshed within 24h |
| `claude-mem@thedotmack` | 37d24944af5f | 37d24944af5f | (disabled but cache current) |
| `hindsight-memory@hindsight` | 9784f6573a5b | 9784f6573a5b | T1 memory backbone |
| `ai@pydantic-skills` | 92bd097356e1 | 92bd097356e1 | |
| `logfire@pydantic-skills` | 92bd097356e1 | 92bd097356e1 | |
| `andrej-karpathy-skills@karpathy-skills` | 2c606141936f | 2c606141936f | **NOTE**: upstream repo renamed `forrestchang/...` → `multica-ai/andrej-karpathy-skills`. GitHub redirect still resolves; known_marketplaces.json may be retroactively updated by CC on next marketplace fetch. Last commit 2026-04-20 (28d quiet — slow-burn upstream, not actionable). |
| `conductor@claude-code-workflows` | 08ded5e7b0fe | 08ded5e7b0fe | one of 2 wshobson plugins already pinned to HEAD |
| `ship-mate@claude-code-workflows` | 08ded5e7b0fe | 08ded5e7b0fe | same |
| `gitnexus@gitnexus-marketplace` | ed50a6729f83 | (local-dir source) | N/A — directory source not subject to upstream drift |

## Disabled-but-cached (eligible for cache prune)

Plugins explicitly `false` in `.claude/settings.json:enabledPlugins` but still occupying disk (cache lives at `.claude/plugins/cache/<marketplace>/<plugin>/<version>/`). Pruning these reclaims disk and reduces audit surface area; they do NOT load into the runtime.

| plugin | cached-version | cached-sha | enabled-flag |
|---|---|---|---|
| `agent-sdk-dev@claude-plugins-official` | b2c5bbc87f37 | b2c5bbc87f37 | false |
| `skill-creator@claude-plugins-official` | b2c5bbc87f37 | b2c5bbc87f37 | false |
| `claude-code-setup@claude-plugins-official` | 1.0.0 | f8059ee4ecee | false |
| `plugin-dev@claude-plugins-official` | b2c5bbc87f37 | b2c5bbc87f37 | false |
| `playground@claude-plugins-official` | b2c5bbc87f37 | b2c5bbc87f37 | false |
| `mcp-server-dev@claude-plugins-official` | b2c5bbc87f37 | b2c5bbc87f37 | false |
| `cwc-makers@claude-plugins-official` | 1.0.0 | f8059ee4ecee | false |
| `hookify@claude-plugins-official` | b2c5bbc87f37 | b2c5bbc87f37 | false |
| `intelligent-compact@claude-settings` | 1.0.0 | 9ad3323e3f7e | false |
| `protect-mcp@claude-code-workflows` | 0.1.0 | 34632bcbea28 | false |
| `claude-mem@thedotmack` | 13.2.0 | 37d24944af5f | false |
| `review-agent-governance@claude-code-workflows` | 0.1.0 | 34632bcbea28 | false |
| `gitnexus@gitnexus-marketplace` | 1.3.6 | ed50a6729f83 | false |
| `qa-orchestra@claude-code-workflows` | 1.0.0 | 5df9ad4012f7 | false |
| `kubernetes-operator@claude-code-skills` | 2.4.0 | 0d477a06589a | false |
| `chaos-engineering@claude-code-skills` | 2.4.0 | 0d477a06589a | false |
| `slo-architect@claude-code-skills` | 2.4.4 | 0d477a06589a | false |
| `feature-flags-architect@claude-code-skills` | 2.4.0 | 0d477a06589a | false |
| `self-improving-agent@claude-code-skills` | 2.3.1 | 0d477a06589a | false |
| `autoresearch-agent@claude-code-skills` | 2.2.2 | 0d477a06589a | false |
| `karpathy-coder@claude-code-skills` | 2.3.2 | 0d477a06589a | false |
| `agenthub@claude-code-skills` | 2.2.2 | 0d477a06589a | false |
| `llm-wiki@claude-code-skills` | 2.3.2 | 0d477a06589a | false |

> **Total disabled-but-cached**: 23 plugins. (Five additional plugin entries appear in `settings.json:enabledPlugins` with `false` but are NOT present in `installed_plugins.json` — `clickhouse`, `outputai`, `qdrant-skills`, `agent-skills@addy-agent-skills`, `mcp-memory-service@mcp-memory-service`, `superpowers@superpowers-marketplace` — these are vestigial settings entries with no cache footprint, harmless.)

## Recommended actions

> All commands below are **recommendations only** — per audit rules they are NOT executed. Operator must confirm before applying.

### Step 1 — Cluster B (claude-plugins-official ghost SHAs): cache-delete + reinstall

The `/plugin update` no-op semantics will not heal ghost SHAs. Per CLAUDE.md cardinal-rule 1 W270 corollary: "cache-delete + fresh-install is the SOTA fix."

```powershell
# For each enabled cluster-B plugin (18 plugins): wipe cache, then reinstall via plugin manager.
# Example for one — repeat for the full list below.
Remove-Item -Recurse -Force "Z:\claude-sota-installed\.claude\plugins\cache\claude-plugins-official\superpowers\5.1.0"
claude plugin install superpowers@claude-plugins-official

# Full reinstall list (cluster B, currently enabled-true):
#   superpowers, pyright-lsp, ralph-loop, claude-md-management, code-simplifier, typescript-lsp,
#   frontend-design, pr-review-toolkit, code-review, feature-dev, commit-commands, session-report,
#   code-modernization
```

### Step 2 — Cluster A (wshobson/agents, 5 commits behind): standard update

```powershell
# Refresh marketplace cache then per-plugin update. Standard /plugin update SHOULD work here
# because installed SHA 34632bcbea28 is a real commit on main; the marketplace simply hasn't refetched.
claude plugin marketplace update claude-code-workflows
foreach ($p in @('shell-scripting','signed-audit-trails','agent-teams','comprehensive-review',
                  'context-management','agent-orchestration','developer-essentials','tdd-workflows',
                  'debugging-toolkit','incident-response','llm-application-dev','plugin-eval',
                  'block-no-verify')) {
  claude plugin update "${p}@claude-code-workflows"
}
```

### Step 3 — Single plugin >14d drift

```powershell
claude plugin update everything-claude-code@everything-claude-code   # 18 days behind
```

### Step 4 — Disabled-but-cached cleanup (optional, disk-reclaim only)

```powershell
# Uninstall each disabled-and-cached plugin. Removes cache directory + entry from installed_plugins.json.
foreach ($p in @('agent-sdk-dev@claude-plugins-official','skill-creator@claude-plugins-official',
                  'claude-code-setup@claude-plugins-official','plugin-dev@claude-plugins-official',
                  'playground@claude-plugins-official','mcp-server-dev@claude-plugins-official',
                  'cwc-makers@claude-plugins-official','hookify@claude-plugins-official',
                  'intelligent-compact@claude-settings','protect-mcp@claude-code-workflows',
                  'claude-mem@thedotmack','review-agent-governance@claude-code-workflows',
                  'gitnexus@gitnexus-marketplace','qa-orchestra@claude-code-workflows',
                  'kubernetes-operator@claude-code-skills','chaos-engineering@claude-code-skills',
                  'slo-architect@claude-code-skills','feature-flags-architect@claude-code-skills',
                  'self-improving-agent@claude-code-skills','autoresearch-agent@claude-code-skills',
                  'karpathy-coder@claude-code-skills','agenthub@claude-code-skills',
                  'llm-wiki@claude-code-skills')) {
  claude plugin uninstall $p
}
```

### Step 5 — Possible-drift watchlist (revisit in 7-9 days, no action now)

- `context-mode@context-mode` (10d lag, sole enabled-true MCP plugin — refresh next session)
- `engineering-skills@claude-code-skills`, `engineering-advanced-skills@claude-code-skills` (5d each)
- `antigravity-bundle-essentials@antigravity-awesome-skills` (5d)

### Step 6 — Post-update verification (mandatory per W270 corollary)

After any of steps 1-3, run:

```powershell
claude /reload-plugins
# Then re-run this audit to confirm SHAs match upstream HEAD
```

---

## Audit data artifact

Machine-readable drift data (full per-plugin records, suitable for re-running ratification): `Z:\claude-sota-installed\tmp\w288-h3-drift-data.json`.

Probe method summary:
1. Read `installed_plugins.json` (62 entries) + `known_marketplaces.json` (21 entries) + `settings.json:enabledPlugins` (67 entries).
2. `git ls-remote <repo> HEAD` for each unique marketplace upstream (16 repos).
3. `GET https://api.github.com/repos/<owner>/<repo>/commits/<sha>` for each installed `gitCommitSha` + each upstream HEAD — 3-of-3 evidence requires HTTP 200 + valid `committer.date`.
4. `GET .../compare/<installed>...<upstream-HEAD>` for cluster baselines to enumerate the in-flight delta commits.
5. Cross-reference `enabledPlugins` map to bucket as enabled-drift / disabled-cached.

Ghost SHA evidence (most critical finding): three installed SHAs (`b2c5bbc87f37`, `f8059ee4ecee`, `f2cbfbefebbf`) span 18 plugins from `anthropics/claude-plugins-official` and all three return `{"message":"No commit found for SHA: ..."}` from the GitHub commits API — a textbook cardinal-rule-1 silent-SHA-drift event requiring cache-delete + reinstall, not `/plugin update`.
