# W314 Stream A — Runtime SOTA Conformance Audit

**Wave**: W314 · **Stream**: A (runtime-hardening + NSSM removal) · **Date**: 2026-05-19
**Branch**: `sota-converge-w310` · **Base commit**: `eb5828e ship(W313)`
**Operator directional cues**: "nssm not sota" · "reinstall your runtime" · "pull your runtime with anthropics" · "stale references, dead config"

---

## §1 CLI + npm parity sanity-check

| Probe | Value | Status |
|---|---|---|
| `claude --version` | `2.1.144 (Claude Code)` | OK |
| `npm view @anthropic-ai/claude-code version` | `2.1.144` | OK — **parity confirmed** |
| Anthropic-canonical release-tag `v2.1.144` | `https://github.com/anthropics/claude-code/releases/tag/v2.1.144` (id 324524751, fetched 2026-05-19) | confirms upstream tag exists |
| `CHANGELOG.md` upstream `HEAD:main` sha | `9e5a512f1ed6d64cd99bf022d9e3edebc7b631e4` (size 316,852 bytes, fetched 2026-05-19) | OK; W309 Stream E already absorbed the v2.1.144 delta (background-session `/resume`, plugin "last updated" surfacing, `claude mcp list` parse-error fix). No NEW settings.json contract changes since W309 ingest. |
| settings.json minimumVersion floor | `2.1.144` (set in W310-tail r1 commit `6bf30d7`) | OK — gate is at parity |

**Verdict**: **NO REINSTALL REQUIRED.** Operator's "reinstall your runtime" cue is satisfied by parity check — no upstream content has advanced beyond local `2.1.144`.

---

## §2 CCBP HEAD drift audit

| Item | Value |
|---|---|
| Local clone HEAD | `48f2ceb chore(agent-collections): append 2026-05-08 changelog entry` (the W312-A.10 NOTE was correct) |
| `origin/HEAD` (after fetch) | `48798ca chore(readme): bump badge timestamp to May 18, 2026 11:05 PM PKT` — 3 commits ahead of local |
| Cited SHA in CLAUDE.md L3 | `1386b0e` (badge bump to CC v2.1.143; 1 commit behind local HEAD; 4 commits behind remote) |
| Cited SHA in CLAUDE.local.md L3 | `ac0d87d` (updated codex hooks; 4 commits behind local HEAD; 7 commits behind remote) |

**Diff `1386b0e..HEAD` on cited best-practice/*.md anchors**:

```
66 71 best-practice/claude-commands.md   (substantive — slash-command surface refresh)
 9 47 best-practice/claude-settings.md   (38 net deletions — likely consolidation)
 1  1 best-practice/claude-skills.md     (typo/SHA tick)
 1  1 best-practice/claude-subagents.md  (typo/SHA tick)
```

**Diff vs cite anchors** (memory.md:34-40, memory.md:113, settings.md:826, settings.md:877-921):

- **`best-practice/claude-memory.md:34-40`** (CLAUDE.md cite anchor for ancestor/descendant CLAUDE.md loading) — **CONTENT-STABLE between `1386b0e` and HEAD `48f2ceb`** (line-by-line diff: zero changes). Cite-SHA refresh is a hygienic SHA tick only.
- **`best-practice/claude-memory.md:113`** (CLAUDE.local.md cite anchor for gitignored local memory) — **CONTENT-STABLE** (line-by-line diff: zero changes).
- **`best-practice/claude-settings.md:826`** (auto-compact `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` cite — W280c REMOVAL anchor) — **CONTENT-STABLE**. Verbatim row at HEAD still reads: *"Default is ~95%. Set lower (e.g., `50`) to trigger compaction earlier. Values above 95% have no effect."*
- **`best-practice/claude-settings.md:877-921`** (CLAUDE.local.md ENV-block authority cite) — **CONTENT-STABLE** for the cited rows (env-var table including `CLAUDE_CODE_GIT_BASH_PATH`, `CLAUDE_CODE_TMPDIR`, etc.). Confirmed by `git show HEAD:best-practice/claude-settings.md | sed -n '873,925p'`.

**Recommendation**: refresh CLAUDE.md L3 cite `1386b0e → 48f2ceb` and CLAUDE.local.md L3 cite `ac0d87d → 48f2ceb`. Both are SHA-tick only; content is unchanged at the cited line ranges. **No content-rewrite required.**

**Verdict**: **GREEN — cite-tick fresh-up only.**

---

## §3 ECC HEAD drift audit

| Item | Value |
|---|---|
| Local ECC marketplace name | `everything-claude-code` |
| Local ECC source (per `known_marketplaces.json`) | `github: affaan-m/everything-claude-code` |
| Local lastUpdated | `2026-05-17T15:16:23.843Z` |
| Upstream redirect | `affaan-m/everything-claude-code` → `affaan-m/ECC` (repo renamed; GitHub redirects transparently) |
| Upstream latest commit | `33ed494a` by Jamkris, 2026-05-19T00:21:31Z — "scheduled refresh" class |
| Upstream latest release | `v1.10.0` (tag at `https://github.com/affaan-m/ECC/releases/tag/v1.10.0`) — the marketplace.json keys v2.0.0-rc.1 are PRE-release alpha; v1.10.0 is the "What's New" GA |
| **Note (Stream W314 instructions reference)** | The W314 instructions reference `github.com/sutt/everything-claude-code` — this returns **HTTP 404**. The canonical org is `affaan-m`, not `sutt`. **Assumption logged**: instruction was probably an outdated mnemonic. |

**Net-new primitives since W312 ECC ratification (W286-arc-P0C, 2026-05-18)**:

- Per the v2.0.0-rc.1 surface refresh notes already ingested:
  - **Dashboard GUI** (`ecc_dashboard.py` / `npm run dashboard`) — Tkinter desktop app w/ theme toggle. **Not adopted, not auto-fire-triggered.** Out-of-band primitive — no CC integration value.
  - **Operator-lane skills**: `brand-voice`, `social-graph-ranker`, `connections-optimizer`, `customer-billing-ops`, `ecc-tools-cost-audit`, `google-workspace-ops`, `project-flow-ops`, `workspace-surface-audit` — these are all enabled via `everything-claude-code@everything-claude-code: true` in our `enabledPlugins` (we install the meta-plugin; ECC ships skills under it).
  - **Media tooling**: `manim-video`, `remotion-video-creation`. Already auto-fire-available via plugin skills.
  - **Framework patterns**: `nestjs-patterns` (NEW). Already auto-fire-available.
  - **ECC 2.0 Rust control-plane prototype** in `ecc2/` directory. **Alpha-only.** Not a runtime concern for W314.

- Commits since `2026-05-17T15:16:23` (local lastUpdated) → 2026-05-19 (15 most recent commits surveyed): all are "scheduled refresh" / metadata tick / asset hygiene per the Jamkris committer pattern. **No new auto-fire skill primitives.**

**Verdict**: **GREEN — 2-day drift but only catalog-tick churn; no net-new primitive to adopt or evaluate.** Re-run `/plugin update everything-claude-code` at next housekeeping wave to refresh marketplace SHA. W313-class hygiene.

---

## §4 Stale references audit

Verified against actual disk state + grep across `.mcp.json` + `.claude/settings.json` + `CLAUDE.md`.

### §4.1 Top-5 PASTE-READY findings

| # | Finding | Evidence | Severity | Paste-ready remediation |
|---|---|---|---|---|
| **F1** | **CLAUDE.md L35 says "C:/Users/42/.cognee VERIFIED MISSING" — actual cognee data lives at `Z:/claude-sota-installed/.cognee` (15071 B) + `Z:/claude-sota-installed-state/.cognee` (15071 B)** | PowerShell probe 2026-05-19: `Test-Path C:/Users/42/.cognee = False`; `Test-Path Z:/claude-sota-installed/.cognee = True (15071B)`; `Test-Path Z:/claude-sota-installed-state/.cognee = True (15071B)` | **HIGH** (cardinal-rule-1 cite-drift) | Edit CLAUDE.md L35 cognee row: `data-dir cite ~~C:/Users/42/.cognee VERIFIED MISSING~~ → Z:/claude-sota-installed-state/.cognee (state-outside-repo per CLAUDE.local.md (f) redirect)`; closes W312-A.7 deferred operator-AI |
| **F2** | **CLAUDE.md L3 cites `1386b0e`; CLAUDE.local.md L3 cites `ac0d87d`. Local CCBP HEAD is `48f2ceb`** | `git -C Z:/repos/deps/claude-code-best-practice-shan rev-parse HEAD → 48f2cebeb88b389b27231c418ceadb65baf813fd`; cite-anchor lines content-stable between SHAs | **MEDIUM** (W312-A.10 deferred) | CLAUDE.md L3: `@ HEAD 1386b0e → @ HEAD 48f2ceb`; CLAUDE.local.md L3: `@ ac0d87d → @ 48f2ceb` |
| **F3** | **CLAUDE.md L34 says "64 plugins installed"; actual `enabledPlugins` count = 47 enabled / 21 disabled / 68 total. Cache-dir count = 18 (marketplaces, not plugins)** | `installed_plugins.json`: 47 true, 21 false; `cache/` subdir count = 18 marketplace-level dirs containing many sub-plugins each | **MEDIUM** (drift of count, not function) | CLAUDE.md L34: `64 plugins installed → 47 plugins enabled / 21 disabled (68 listed, across 18 marketplaces)`; close W311 C-A drift |
| **F4** | **CLAUDE.md L28-L31 references `chrome-devtools-mcp@0.26.0` while upstream `latest` tag at `https://github.com/ChromeDevTools/chrome-devtools-mcp/releases/latest` is `chrome-devtools-mcp-v0.26.0` per fetched API (id 324329454, the same)** | `mcp.json` line 28: `npx -y chrome-devtools-mcp@0.26.0`; upstream latest release id 324329454 = tag `chrome-devtools-mcp-v0.26.0` confirmed via API | **NO-OP / RESOLVED** — operator decision pending was for 1.0.1 major bump but latest is still 0.26.0 | Close W310-γ + W312-B-3 as **OBSOLETE-RESOLVED**; no major drift exists. Upstream has NOT shipped 1.0.1; W310 audit was speculative |
| **F5** | **3 retired services confirmed STOPPED on disk: FalkorDB :16379 = closed, Ollama :16700 = closed, Phoenix :16006 = closed**. NSSM `CogneeMCP` :8000 = LIVE. Langfuse :3000 = LIVE. hindsight :9077 = LIVE | `Test-NetConnection -Port X` matrix 2026-05-19 | **GREEN — confirms by-design state**, but CLAUDE.md L35-L37 phrasing "FalkorDB+Ollama **can** be stopped" is now stale; they ARE stopped | CLAUDE.md L35-36: "**FalkorDB+Ollama can be stopped** → **FalkorDB+Ollama+Phoenix are STOPPED (confirmed W314)**"; close W312-A.6 (Ollama-down intent) as confirmed-intentional |

### §4.2 Secondary findings (informational)

- **`memory.exe` retire-candidate (W300-AI-1)**: `Z:/venvs/claude/Scripts/memory.exe` is **PRESENT** on disk. But `.mcp.json` has `mcpServers` count = 10 with NO `memory` entry — block was already excised in W313 Stream A `5a350d1` (CLAUDE.md L29 still references the historical `disabledMcpjsonServers` mention, which is now `[]`). **Operator-AI W314-A-AI-1**: delete the `memory.exe` binary at next housekeeping (5 LOC change to CLAUDE.md L29 to remove the parenthetical retire-candidate clause). **Defer to W315** — non-urgent.
- **`graphiti` retirement (W295)**: `.mcp.json` mcpServers count = 10. There is **NO graphiti server entry** in the current 10-server set (deepwiki + chrome-devtools + repomix + serena + gitnexus + ccusage + cognee + langfuse + basic-memory + hf-mcp-server). Already excised in W313 Stream A. CLAUDE.md L36 still says "`.mcp.json:64-77` block preserved for inspection" — this is **stale**; the block was deleted. **Operator-AI W314-A-AI-2**: tweak CLAUDE.md L36 to remove the "preserved for inspection" clause.
- **`gitnexus`**: present in `.mcp.json` (stdio, `gitnexus mcp`) but per W312-C is **DEACTIVATE-confirmed** in `enabledPlugins`. Active MCP entry vs deactivated plugin = **harmless asymmetry** (MCP server can be auto-spawned even when the plugin gate is closed) — no remediation needed.
- **`installed_plugins.json` + `known_marketplaces.json` dirty in git**: both files are runtime state. `installed_plugins.json` has 47 enabled + 21 disabled (68 total). `known_marketplaces.json` lists 18 marketplaces with `lastUpdated` timestamps. The git churn is normal — `lastUpdated` ticks every time CC reloads the plugin cache. **CLAUDE.md W280 closeout** notes `.claude/plugins/data/` is gitignored, but `installed_plugins.json` + `known_marketplaces.json` are still tracked. **Operator-AI W314-A-AI-3**: decide whether to add these two files to `.gitignore` (they are churn-class), or accept the churn-noise tradeoff. **Defer to W315**.

---

## §5 Plugin install integrity

| Probe | Value | Status |
|---|---|---|
| `enabledPlugins[*] === true` count | **47** | match operator-truth |
| `enabledPlugins[*] === false` count | **21** | match operator-truth |
| `enabledPlugins[*]` total keys | **68** | match operator-truth |
| `.claude/plugins/cache/<marketplace>/` directory count | **18** | OK — these are MARKETPLACE roots, not plugins; each marketplace ships N plugins |
| `mcpServers` in `.mcp.json` | **10** (deepwiki, chrome-devtools, repomix, serena, gitnexus, ccusage, cognee, langfuse, basic-memory, hf-mcp-server) | matches W313 Stream A `5a350d1` 16→10 excision |
| `disabledMcpjsonServers` in `settings.json` | **`[]`** (empty) | matches W313 Stream A — no resurrected dead blocks |
| settings.json `hooks` registered | SessionStart=1, SessionEnd=1, Stop=1, PreToolUse=1, PostToolUse=1, PreCompact=1, WorktreeRemove=1, Notification=1, PostToolUseFailure=1, TaskCompleted=1 | OK |

**`installed_plugins.json` git-dirty investigation**:
- This file is **runtime state** that CC writes every time a plugin marketplace `lastUpdated` ticks. Specifically, `anthropic-agent-skills` lastUpdated bumped from `2026-05-17T15:16:34.850Z` (baseline) → `2026-05-19T05:39:00.769Z` (this session), and `claude-plugins-official` ticked too.
- This is NOT a manifest drift; it is **expected runtime churn**. CLAUDE.md should either gitignore these two files OR accept the rolling-churn pattern (W282B already flagged the same observation as "runtime state churn, gitignored shouldn't be tracked").

**Verdict**: **PASS — plugin install integrity intact.** `installed_plugins.json` dirty state is **expected runtime churn**, not real drift.

---

## §6 Summary verdict matrix

| Dimension | Status | Confidence |
|---|---|---|
| CLI + npm parity | **PARITY OK** (both at 2.1.144) | HIGH |
| CCBP cite SHA freshness | **STALE-BUT-CONTENT-VALID** (cite anchors unchanged) | HIGH |
| ECC drift | **CATALOG-TICK ONLY** (no net-new primitive) | HIGH |
| Stale references | **5 findings, 3 of which were already-resolved by W313 Stream A** | HIGH |
| Plugin install integrity | **PASS** (47/21/68 = match) | HIGH |
| NSSM SOTA replacement | **see §W314-A-NSSM-REPLACEMENT** | HIGH |

**APPROVE** for synthesis layer to:
1. Apply CLAUDE.md cite-SHA refresh (`1386b0e → 48f2ceb`)
2. Apply CLAUDE.md L34 plugin count refresh (`64 → 47 enabled / 21 disabled / 68 listed`)
3. Apply CLAUDE.md L35 cognee data-dir cite fix (`C:/Users/42/.cognee → Z:/claude-sota-installed-state/.cognee`)
4. Apply CLAUDE.md L36 stale-clause prune (`.mcp.json:64-77 block preserved` no longer true)
5. Trigger NSSM replacement per §W314-A-NSSM-REPLACEMENT — recommended path: **(d) direct uvx stdio MCP**

**BLOCK** on:
- None at this audit layer. All 5 findings are paste-ready.
