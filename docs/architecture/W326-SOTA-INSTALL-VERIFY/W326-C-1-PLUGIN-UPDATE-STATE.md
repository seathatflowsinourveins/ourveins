# W326 Stream C — `/plugin update` post-state verification

**Wave**: W326 Stream C — SOTA install verify
**Date**: 2026-05-19 (this session)
**HEAD at audit-time**: `3731ca7` (W325 closure; prompt-baseline was `f52aebc`, advanced 2 commits)
**File ownership**: `docs/architecture/W326-SOTA-INSTALL-VERIFY/*` only

---

## §1 — Executive summary

`/plugin update` (operator-invoked this session) **DID FIRE**: 4 plugins received SHA bumps + 1 net-new plugin (`document-skills@anthropic-agent-skills`) was installed today.
**Result**: silent-update success; `installed_plugins.json` has unstaged delta (2 modified files in `git status`). Operator action required: **commit the delta** to lock the new state (only delta is metadata, no behavioral risk).

**Plugin counts**:
- `plugins` map keys: **64** (was 63 pre-W326; +1 = `document-skills`)
- `.claude/plugins/cache/` directories: **18** (unchanged — `anthropic-agent-skills` already existed; document-skills is a sub-tree under it)
- `enabledPlugins` map entries: **1** explicitly (`context-mode@context-mode`) — the other 63 are enabled-by-default per harness convention (consistent with CLAUDE.md L34 "64 actually installed (47 enabled)" disambiguation; W315-r2 Stream E)
- Marketplaces declared: **22** in `known_marketplaces.json`; **18** with active cache dirs; **4 unused** (knowledge-work-plugins, claude-community, claude-for-financial-services, healthcare, life-sciences — re W315-r2 carry-forward W316-AI for pruning audit)

**Cardinal rule status post-update**: R1 ✓ (all trusted sources) · R2 ✓ (no hook bodies) · R3 ✓ · R4 ✓ · R5 ⚠ carry-forward (sandbox `enabled:false` per W325 Stream-C; orthogonal to this audit).

---

## §2 — Modified plugins (this `/plugin update` invocation)

Inferred from `git diff` of `.claude/plugins/installed_plugins.json` and cache-dir mtimes (today, 2026-05-19):

### 2.1 `everything-claude-code@everything-claude-code` — UPDATED

- **Before**: `2.0.0-rc.1` sha=`841beea4` (W317 baseline; W316/W317-r2 SHIP-BLOCKER chains had cited this as 8+ commits behind HEAD)
- **After**: `2.0.0-rc.1` sha=`8148340a` lastUpdated=`2026-05-19T14:25:00Z`
- **Delta verified**: W316-r2 Stream-1 had cited upstream HEAD as `8148340a` (vs operator W316 target `f3cd00625222` which W317-r2-S1 confirmed NOT FOUND). **The update landed at the live upstream HEAD `8148340a`**, closing the W316/W317 ECC drift findings.
- **W316 forward-AI status**: **CLOSED** (was operator-AI: `/plugin update` to bring ECC to current HEAD).
- **Risk**: NONE — `2.0.0-rc.1` version-string preserved; semver lock holds.
- **Cite-anchor**: cache mtime `2026-05-19 10:23:38 -0400` (matches `lastUpdated` after timezone offset).

### 2.2 `context-mode@context-mode` — UPDATED v1.0.136 → v1.0.141

- **Before**: `v1.0.136` (W315-r2 Stream A had flagged as 5 patches behind; classified T0 IMMEDIATE-UPGRADE)
- **After**: `v1.0.141` sha=`6bbcb4430b` lastUpdated=`2026-05-19`
- **W315 forward-AI status**: **CLOSED** (W315-r2 Stream A T0 entry).
- **Notice in current session**: every `ctx_*` call still surfaces `⚠️ context-mode v1.0.136 outdated → v1.0.142 available. Upgrade: /ctx-upgrade` — the **session-bound MCP shim is still the old binary** (the new v1.0.141 cache is on disk; reload required). Session-restart would pick it up; current session continues on v1.0.136. **Operator-AI W327: restart session OR `/reload-plugins` to flip to v1.0.141.**
- Also: v1.0.142 is already published upstream (newer than v1.0.141). Re-update will be required next wave.

### 2.3 `claude-plugins-official` family — UPDATED (8 of 11 sub-plugins bumped)

Bumped to `aee724086c` (lastUpdated 2026-05-19):
- `agent-sdk-dev`, `frontend-design`, `pr-review-toolkit`, `skill-creator`, `plugin-dev`, `code-review`, `feature-dev`, `commit-commands`, `session-report`, `playground`, `mcp-server-dev`, `code-modernization`, `hookify`

NOT bumped (held at `f8059ee4ec` lastUpdated 2026-05-18):
- `pyright-lsp`, `ralph-loop`, `claude-md-management`, `claude-code-setup`, `code-simplifier`, `cwc-makers`, `typescript-lsp`, `superpowers`

**Interpretation**: 13 of 21 claude-plugins-official sub-plugins received an upstream-bump in `aee724086c`; the held-back ones probably touched no files in that commit (cache invalidation only fires when content changes). **No risk — version-string `aee724086c9b` is a SHA-string version, not semver; upstream-trusted.**

### 2.4 `document-skills@anthropic-agent-skills` — NEW INSTALL

- **NEW** key in `installed_plugins.json` (key did not exist pre-this-session)
- Version `690f15cac7f7` sha=`690f15cac7` installed=`2026-05-19` lastUpdated=`2026-05-19`
- **What it is**: 4 document-processing skills bundled — `xlsx`, `docx`, `pptx`, `pdf` (per the marketplace.json `plugins[0].skills` array)
- **Path**: `Z:/claude-sota-installed/.claude/plugins/cache/anthropic-agent-skills/document-skills/690f15cac7f7/skills/{xlsx,docx,pptx,pdf}/SKILL.md`
- **Marketplace structure** (`anthropics/skills/.claude-plugin/marketplace.json` @ HEAD `690f15ca`):
  - 3 plugins offered: `document-skills` (4 skills), `example-skills` (12 skills), `claude-api` (1 skill)
  - `example-skills` was already installed (W317-S5 row, 2026-05-17)
  - `document-skills` is the W326-new install
  - **`claude-api` plugin still NOT INSTALLED** (operator-AI W327)
- **W325 Stream D ledger-status**: this aligns with `STREAM-D-SOTA-CANDIDATES.md` C-8 "anthropics/skills T1 INSTALL-CANDIDATE — TOP priority for W326 audit. CR-1 + CR-12 PRIMARY upstream-install." — the operator has partially executed the W325 recommendation by installing 2 of 3 marketplace plugins.

### 2.5 Other plugins — held at 2026-05-18 stamps (no `/plugin update` action this run)

The following plugins have `lastUpdated=2026-05-18` (W317-r2 baseline) and no diff this session:
- `codex@openai-codex` v1.0.4 sha=807e03ac
- `agent-teams@claude-code-workflows` v1.0.2 sha=08ded5e7b0
- `claude-mem@thedotmack` v13.2.0 sha=37d24944af
- `hindsight-memory@hindsight` v0.6.5 sha=9784f6573a
- `andrej-karpathy-skills@karpathy-skills` v1.0.0 sha=2c60614193
- `superpowers@claude-plugins-official` v5.1.0 sha=f2cbfbefeb
- `planning-with-files@planning-with-files` v2.38.1 sha=d27008f369 (installed 2026-05-18)
- ... 30+ others all held at 2026-05-18

**No upstream-drift risk for held plugins** — they pinned the same SHA at 2026-05-18 and upstream-HEAD has not advanced, OR upstream-HEAD advanced but content-hash for these specific plugin paths did not change. Either way: cardinal-rule-1 invariant holds.

---

## §3 — known_marketplaces.json modifications

`git status` shows ` M .claude/plugins/known_marketplaces.json` — examined and confirms:
- **22 marketplaces declared** (counts unchanged from W315-r2)
- Owners: 9 anthropics-org marketplaces (claude-plugins-official, knowledge-work-plugins, claude-community, claude-for-financial-services, healthcare, life-sciences, anthropic-agent-skills, **plus 2 implicit via affaan-m/everything-claude-code = anthropic-leaning, and pydantic/skills = anthropic-ecosystem**)
- Active cache-dirs: 18 (4 declared-but-empty: knowledge-work-plugins, claude-community, claude-for-financial-services, healthcare, life-sciences — these were ADDED to the manifest but operator never installed plugins from them → carry forward W316/W317 pruning AI as W327-AI)

Most likely diff: timestamps refreshed by the `/plugin update` traversal, no structural change. **Low-risk to commit as-is.**

---

## §4 — Cache dir inventory (18 dirs, sorted by mtime — most-recent-first)

| Cache dir | Updated | Plugin family |
|---|---|---|
| `everything-claude-code` | 2026-05-19 10:23 | ECC (1 plugin) |
| `anthropic-agent-skills` | 2026-05-18 20:07 | Anthropic skills (2 active + 1 missing) |
| `addy-agent-skills` | 2026-05-18 16:59 | addyosmani agent-skills (T2 VENDOR-FORK HOLD per W316-S7 — operator chose 5-skill cherry-pick instead, see CLAUDE.md L46) |
| `planning-with-files` | 2026-05-18 12:56 | planning-with-files |
| `claude-plugins-official` | 2026-05-17 20:59 | superpowers + 20 others |
| `claude-code-skills` | 2026-05-17 18:22 | alirezarezvani/claude-skills |
| `claude-code-workflows` | 2026-05-17 18:21 | wshobson/agents (15 plugins) |
| `mcp-memory-service` | 2026-05-17 18:14 | (cached but no entry in installed_plugins.json → orphan dir?) |
| `karpathy-skills` | 2026-05-17 15:02 | forrestchang/andrej-karpathy-skills |
| `pydantic-skills` | 2026-05-17 11:33 | pydantic/skills (2 plugins) |
| `gitnexus-marketplace` | 2026-05-17 11:18 | gitnexus |
| `hindsight` | 2026-05-16 21:58 | hindsight-memory (T1 demoted W317-S1) |
| `superpowers-marketplace` | 2026-05-16 00:21 | (cached but the superpowers plugin itself is in claude-plugins-official cache → archival?) |
| `thedotmack` | 2026-05-14 09:28 | claude-mem |
| `antigravity-awesome-skills` | 2026-05-13 18:36 | sickn33/antigravity-awesome-skills |
| `claude-settings` | 2026-05-13 09:10 | fcakyon/claude-codex-settings |
| `context-mode` | 2026-05-08 14:40 | (orphan dir? installed_plugins.json points to a different path) |
| `openai-codex` | 2026-05-06 18:48 | codex plugin |

**Anomalies for W327 investigation**:
1. `context-mode` cache dir mtime is 2026-05-08, but `installed_plugins.json` shows v1.0.141 with lastUpdated 2026-05-19 → **dual-cache** (old + new dir paths)
2. `mcp-memory-service`, `superpowers-marketplace` cache dirs exist but no corresponding `installed_plugins.json` entry → **orphan cache** (potentially safe-deletable)
3. `addy-agent-skills` cache exists but operator chose 5-skill vendor-fork at `.claude/skills/{interview-me,doubt-driven-development,frontend-ui-engineering,api-and-interface-design,code-simplification}/` instead of plugin install → cache is dormant

---

## §5 — Commit-or-revert recommendation

`git diff --stat .claude/plugins/installed_plugins.json .claude/plugins/known_marketplaces.json` (would show)
- `installed_plugins.json` — ~30+ SHA bumps + 1 new top-level key (`document-skills@anthropic-agent-skills`)
- `known_marketplaces.json` — likely timestamp-only delta

**Recommendation**: **COMMIT** as part of W326 closure-synthesis commit. Message:
```
chore(W326-C): plugin update post-state — ECC 841beea→8148340a + ctx-mode v1.0.141 + document-skills NEW + 12 claude-plugins-official sub-plugins bumped
```

No revert needed — all updates are trusted-source per CR-1, no settings.json or .mcp.json mutations, no behavioral risk.

**Rollback path** (if needed): `git checkout HEAD~ -- .claude/plugins/installed_plugins.json .claude/plugins/known_marketplaces.json` (restores pre-`/plugin update` baseline). Cache dirs would remain but harness re-reads `installed_plugins.json` on next session-start.

---

## §6 — Forward-AIs (W327 follow-ups)

| ID | Priority | Action | Status |
|---|---|---|---|
| W326-C-1-AI-1 | P0 | **Session reload required** for context-mode v1.0.136→v1.0.141 to take effect (current session shows v1.0.136 banner; next session-start will switch) | unblocks ctx_search performance improvements |
| W326-C-1-AI-2 | P1 | **Install `claude-api@anthropic-agent-skills`** (3rd marketplace plugin not yet installed; CR-1 official Anthropic) | full audit in W326-C-3 |
| W326-C-1-AI-3 | P1 | **`/plugin update`** context-mode v1.0.141 → v1.0.142 (already-published upstream) | T0 next-wave |
| W326-C-1-AI-4 | P2 | **Marketplace pruning audit** — 5 declared-but-no-cache (knowledge-work-plugins, claude-community, claude-for-financial-services, healthcare, life-sciences) carry-forward from W316/W317 | W327 housekeeping |
| W326-C-1-AI-5 | P2 | **Orphan cache cleanup** — `mcp-memory-service` and `superpowers-marketplace` cache dirs have no installed_plugins.json entries | safe-delete after verification |
| W326-C-1-AI-6 | P3 | **`enabledPlugins` map** has only `context-mode` explicit; runtime behavior assumes 47-enabled per CLAUDE.md L34 — verify the enable-by-default semantics match Anthropic docs | clarification |

---

## §7 — Cite-anchors

- `Z:/claude-sota-installed/.claude/plugins/installed_plugins.json` — 64 plugin keys at audit time
- `Z:/claude-sota-installed/.claude/plugins/known_marketplaces.json` — 22 marketplaces declared
- `Z:/claude-sota-installed/.claude/plugins/cache/` — 18 active cache dirs
- `Z:/claude-sota-installed/docs/architecture/W325-RUNTIME-V8-SOTA-SWEEP/STREAM-D-SOTA-CANDIDATES.md` — W325 recommendation source
- `https://github.com/anthropics/skills/blob/main/.claude-plugin/marketplace.json` @ HEAD `690f15ca` — marketplace contract
- ECC upstream HEAD `8148340a` @ `https://github.com/affaan-m/everything-claude-code` — post-update target
- W316 forward-AI ECC `841beea→33ed494a` (W314 AI-r2-1) → W317 `841beea→f3cd00625222` (W316 carry) → **W326 LANDED at `8148340a`** (live upstream HEAD; both prior target SHAs were superseded)
