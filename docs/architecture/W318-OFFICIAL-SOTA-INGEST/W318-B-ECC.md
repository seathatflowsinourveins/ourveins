# W318-B Stream — Everything-Claude-Code (ECC) Line-by-Line Ingest

**Wave**: W318 Stream B
**Date**: 2026-05-19
**Source**: `Z:/repos/deps/everything-claude-code`

## §1 — SHA delta

| Metric | Value |
|---|---|
| CLAUDE.md cite SHA (W314-r2 status) | `33ed494a` |
| Local & upstream HEAD | `b62f8075` |
| Commits since `33ed494a` | **20** |
| Marketplace version | `2.0.0-rc.1` (UNCHANGED — no version bump) |
| Installed plugin cache version | `2.0.0-rc.1` (`Z:/claude-sota-installed/.claude/plugins/cache/everything-claude-code/everything-claude-code/2.0.0-rc.1/`) |

## §2 — Substantive content changes (33ed494a..HEAD)

```
20 commits / 62 files changed / +3568 / -289 LOC
```

### Categorized

**A. Release-pack tooling (NEW, non-primitive)**:
- `b62f8075 chore: add release video visual qa` (release video QA pipeline)
- `855e8c83 chore: gate release video publish candidates`
- `f3cd0062 chore: add release video self-eval gate`
- `e209afc8 chore: gate ECC release video suite (#1992)`
- `8141f690 chore: gate canonical ECC release identity (#1991)`
- `9ee1e155 docs: define ECC 2.0 hypergrowth release lane`
- `7a0645ed docs: add ECC 2 growth outreach pack (#1993)`
- `d135e03d docs: refresh May 19 operator dashboard`
- `c07276a3 docs: refresh May 19 publication evidence`

**B. Repo-rename housekeeping (`everything-claude-code` → `ECC`)**:
- `2199b223 docs: keep renamed README install paths usable`
- `b66fa78f Apply suggestion from @karnavpargi`
- `673dff97 Update README links to new repository name 'ECC'`

**C. Windows-fitness bug-fixes (DIRECTLY relevant to our Z:-portable runtime!)**:
- `6cb194a3 fix(hooks): avoid escaped quotes in plugin bootstrap`
- `f93e8f68 fix(hooks): use shared renameWithRetry in writeWarnState (ecc-context-monitor)`
- `116e61d8 fix(lib): retry rename on Windows EPERM/EACCES/EBUSY in writeBridgeAtomic`
- `7c2f7131 fix(hooks): use unique tmp suffix in writeWarnState (ecc-context-monitor)`
- `28548f67 fix(lib): use unique tmp suffix in writeBridgeAtomic to eliminate ENOENT race`
- `d904edc6 test(lib): make concurrent-write test actually concurrent + use regex matcher for assert.throws`
- `5acb01a2 test(lib): concurrent writeBridgeAtomic + tmp-cleanup regression`

**D. Audit/feature**:
- `af9b2c1c feat: extend harness audit integration scoring (#1990)` — extended harness-audit scoring

### Primitive count comparison

| ECC primitive class | W314-r2 cited count | W318-r0 upstream count | Delta |
|---|---|---|---|
| Agents | 60 | 60 | 0 |
| Skills | 230 (W314-r2 cite) | 232 (marketplace.json 2026-05-19) | +2 |
| Commands | 75 | 75 | 0 |
| Marketplace plugins | 1 (single ECC plugin) | 1 | 0 |
| Plugin version | `2.0.0-rc.1` | `2.0.0-rc.1` | **0 (NO version bump despite 20 commits)** |

## §3 — NEW ECC primitives not yet ratified in this runtime

**Files added since `33ed494a` (NEW files only, code/docs):**

```
A docs/releases/2.0.0-rc.1/operator-readiness-dashboard-2026-05-19.md
A docs/releases/2.0.0-rc.1/partner-sponsor-talks-pack.md
A docs/releases/2.0.0-rc.1/publication-evidence-2026-05-19.md
A docs/releases/2.0.0-rc.1/release-url-ledger-2026-05-19.md
A docs/releases/2.0.0-rc.1/video-suite-production.md
A docs/releases/2.0.0/ecc-2-hypergrowth-release-command-center.md
A scripts/release-video-suite.js  (1096 LOC)
A tests/scripts/release-video-suite.test.js (327 LOC)
```

**Verdict**: ALL new files are release-pack tooling + docs. **ZERO new agents/skills/commands.** The `+2 skills` in marketplace count (230→232) is documentation-only delta in the `description` field, NOT new primitive directories.

### NEW primitives ALREADY available in installed `2.0.0-rc.1` (W314-r2 forwarded operator-AIs)
From W314-r2 silent-fallback findings:
1. `silent-failure-hunter` agent — W314 Stream β AI-r2-4 candidate, NOT yet wired into project settings
2. `invisible-Unicode safety regression` PreToolUse hook — W314 Stream β AI-r2-2 candidate (CR-2-exception-anchor)

These are PRE-existing in `2.0.0-rc.1` — already installed but not wired/configured. They are W319 operator-AI carryforwards, not new primitives.

## §4 — Cite-refresh patches (paste-ready)

CLAUDE.md status appendix references `33ed494a` and `2.0.0-rc.1` (latter is plugin version, not SHA). Optional refresh:

```diff
-ECC `aaabe594→33ed494a` docs+Unicode-Tag CI; superpowers stable v5.1.0
+ECC `33ed494a→b62f8075` Windows-EPERM/EACCES retry fixes + release-pack tooling + harness-audit scoring extension; plugin version unchanged at `2.0.0-rc.1`; superpowers stable v5.1.0
```

The Windows-fitness fixes alone justify a cite-refresh; they directly benefit our `writeWarnState`/`writeBridgeAtomic` calls under the Z: drive.

## §5 — `/plugin install` recommendations

**No new ECC plugins need installing.** The installed `everything-claude-code@2.0.0-rc.1` plugin is the SAME version upstream; primitive count is +2 description-only.

For the silent-fallback-hunter / Unicode-safety operator-AIs from W314-r2, these are within the installed plugin — wiring is settings.json configuration, NOT new install:

```bash
# Already installed — verify via /plugin (no reinstall):
/plugin
> everything-claude-code@2.0.0-rc.1  (installed, current)

# To pick up Windows ENOENT fixes from new HEAD b62f8075, the standard /plugin update flow:
/plugin update everything-claude-code@2.0.0-rc.1
# But W317-D found this fails per resolver bug (operator-pending)
```

Per W317-D operator-pending finding: `claude plugin install everything-claude-code` is the workaround when `/plugin update` resolver-bugs out. **W319 operator-AI**: ratify the Windows-fitness fixes via `claude plugin install everything-claude-code` once operator approves; current installed version is functionally-equivalent for non-Z: paths but lacks the EPERM/EACCES retry that would benefit our Z:-drive ops.

## §6 — VERDICT

| Item | Verdict |
|---|---|
| ECC version delta | **NO version bump** (2.0.0-rc.1 stable; +20 commits / +3568 LOC) |
| New primitives (agents/skills/commands) | **ZERO net new** (release-pack tooling + Windows fixes only) |
| Cite-refresh patch required | **OPTIONAL** (Windows-fitness fixes justify forward to `b62f8075`) |
| `/plugin install` commands | **NONE required** (version-stable; W319 operator-AI to pick up Windows fixes via reinstall workaround) |
| **W319 forwards** | (1) Cite-SHA refresh `33ed494a → b62f8075`; (2) `claude plugin install everything-claude-code` to pick up Windows EPERM/EACCES + ENOENT race fixes (5 commits worth); (3) wire `silent-failure-hunter` + invisible-Unicode hook per W314-r2 AI-r2-2/AI-r2-4 |
