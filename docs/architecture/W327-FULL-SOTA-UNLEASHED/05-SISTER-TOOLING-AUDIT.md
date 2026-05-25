# W327-S5 — Sister-Tooling Audit: context-mode + planning-with-files + GitNexus

**Wave**: W327 Stream S5
**Date**: 2026-05-19
**Deliverable**: `docs/architecture/W327-FULL-SOTA-UNLEASHED/05-SISTER-TOOLING-AUDIT.md`

---

## TL;DR

| Repo | Installed | Upstream HEAD | SHA-Drift | Severity |
|---|---|---|---|---|
| **mksglu/context-mode** | plugin 1.0.141 (commit pre-v1.0.142) | v1.0.142 @ `898ecc9f` 2026-05-19 | **+1 patch behind** | LOW |
| **OthmanAdi/planning-with-files** | plugin 2.38.1 @ `d27008f3` | v2.38.1 @ `d27008f3` 2026-05-16 | **PARITY** | NONE |
| **abhigyanpatwari/GitNexus (plugin)** | plugin 1.3.6 @ `b7927870` | plugin 1.3.6 (HEAD: gitnexus-claude-plugin/ dir advanced 6 commits) | **stale within dir; version-string same** | MED |
| **abhigyanpatwari/GitNexus (npm CLI)** | gitnexus@1.6.5 (global npm) | npm latest 1.6.5, rc 1.6.6-rc.19 | **stable PARITY** | NONE |

**Top-3 update actions** (full plan in §8):
1. **context-mode**: `/plugin update context-mode@context-mode` to pull v1.0.142 (cardinal-rule-2 patch — small zod3-to-v4 + opencode adapter)
2. **GitNexus plugin**: fix `gitnexus@latest` → `gitnexus@1.6.5` pin in `.mcp.json` (CR-9 violation in installed cache *and* upstream); refresh cache via cache-delete + `/plugin install` to pick up 6 wiki + augment-hook commits since 1.3.6 metadata bump
3. **GitNexus root `.mcp.json`**: switch `command: "gitnexus" args: ["mcp"]` → `command: "npx" args: ["-y", "gitnexus@1.6.5", "mcp"]` per W286-cross CR-9 npx-pin contract (current invocation depends on global PATH-resolved `gitnexus` shim — not Z:-portable across machines)

---

## §1 mksglu/context-mode — upstream HEAD vs installed plugin version

**Installed**: `.claude/plugins/cache/context-mode/context-mode/1.0.141/` (also has stale `1.0.136/` dir alongside — version-coexistence pattern).

**Upstream** (`Z:/repos/deps/context-mode`):
- HEAD: `898ecc9f2a1451e9d1f949772def3e6c34447e50` 2026-05-19 `ci: update install stats`
- Latest release tag: `v1.0.142` (between installed v1.0.141 commit `78c9adf` and HEAD `898ecc9f`)

**Drift**: 1 patch version. Recent commits since v1.0.141:
- `78c9adf` 1.0.141 → `de9ce84` rebuild bundles → `0ea3a25` merge next → `7c82220` fix(opencode): coerce stringified primitives on native plugin path (#627) → `76559cf` fix(upgrade): fail loud (#628) → `5235f3f` fix(pi): curl/wget escape hatch (#625) → ... → bumps to v1.0.142

**Plugin metadata** (installed `openclaw.plugin.json` and upstream `.claude-plugin/plugin.json`):
```json
{
  "id": "context-mode",
  "name": "Context Mode",
  "version": "1.0.141",  // upstream: 1.0.142
  "sandbox": { "mode": "permissive", "filesystem_access": "full", "system_access": "full" }
}
```

**Diff v1.0.141 → v1.0.142** (per `git diff --stat`): 18 files; +663/-267 lines:
- `cli.bundle.mjs` / `server.bundle.mjs` rebuilds (274 + 180 line bundle deltas — auto-generated)
- `src/adapters/opencode/plugin.ts` (-25 lines) + new `src/adapters/opencode/zod3tov4.ts` (+131 lines) — schema-version compat layer
- `start.mjs` (+49) — MCP boot path
- 3 new test files: `zod3tov4.test.ts` (+148), `opencode-plugin.test.ts` (+23), `start-mjs-mcp-boot.test.ts` (+76)

**Verdict**: routine patch. Low-risk auto-update target.

**License**: ELv2 (Elastic License 2.0 — source-available; CR-9 risk MED noted in `.mcp.json` _comments W79).

---

## §2 OthmanAdi/planning-with-files audit + local install state

**Installed**: `.claude/plugins/cache/planning-with-files/planning-with-files/2.38.1/`. Single version dir (clean cache).

**Upstream** (`Z:/repos/deps/planning-with-files`):
- HEAD: `d27008f369a5c58f315ce74194ff1c21b9a0eedc` 2026-05-16 `fix: v2.38.1 swap plan-injection delimiter from --- to === to avoid YAML doc-separator collision`
- Latest release tag: `v2.38.1` (matches installed)

**Drift**: **PARITY — no action required.**

**Plugin metadata** (matches upstream verbatim):
```json
{
  "name": "planning-with-files",
  "version": "2.38.1",
  "license": "MIT",
  ...
}
```

**6 lang-variant SKILL.md** confirmed present in cache (matches system-reminder skill list):
- `skills/planning-with-files/SKILL.md` (canonical EN)
- `skills/planning-with-files-ar/SKILL.md`
- `skills/planning-with-files-de/SKILL.md`
- `skills/planning-with-files-es/SKILL.md`
- `skills/planning-with-files-zh/SKILL.md`
- `skills/planning-with-files-zht/SKILL.md` (Traditional Chinese — not in default skill-namespace list, but exists in cache)

**License**: MIT (clean).

**Recent v2.38.0 → v2.38.1 changes**:
- v2.38.1: Cosmetic — delimiter swap `---BEGIN PLAN DATA---` → `===BEGIN PLAN DATA===` to fix Claude Code skill picker garbled description (YAML-doc-separator collision with hook scalars).
- v2.38.0: Major Claude Code turn-loop integration — `/plan-goal` (composes with `/goal`), `/plan-loop` (composes with `/loop`), `PreCompact` hook, `templates/loop.md`, Codex `PermissionRequest` adapter, OpenCode SQLite session catchup, 17 new tests.

---

## §3 abhigyanpatwari/GitNexus — upstream vs current install (plugin + MCP)

### §3.1 Plugin `.claude-plugin/`

**Installed**: `.claude/plugins/cache/gitnexus-marketplace/gitnexus/1.3.6/.claude-plugin/plugin.json`

**Upstream**: `Z:/repos/deps/gitnexus/gitnexus-claude-plugin/.claude-plugin/plugin.json` — **also v1.3.6** (version string has NOT advanced even though the dir has 6 commits since v1.3.6 was originally cut):

```
105efd0f feat(wiki): --lang <lang> flag for multilanguage wiki (#1613)
ed50a672 fix(wiki): remove hidden 60s default timeout, validate flags (#1651)
89c03b2e fix: skip Claude augment hook when GitNexus server owns DB (#1493)
a3eef48c fix(cli): make --no-stats actually omit volatile counts (#1477)
88d3df77 feat(wiki): --timeout and --retries flags (#1543)
ec4624af fix(hooks): cap concurrent augment subprocesses (#1486)
b7927870 fix(hook): resolve canonical repo root + guard read-only FTS ensure (#1226)   <-- installed at HERE
```

**SHA-drift**: installed `1.3.6 @ b7927870` is **6 commits behind** the gitnexus-claude-plugin/ dir HEAD on the gitnexus monorepo. The plugin version string `1.3.6` is unchanged (silent SHA drift — exact W270 corollary case from CLAUDE.md cardinal-rule-1).

**7 plugin skills** (installed matches upstream): `gitnexus-cli`, `gitnexus-debugging`, `gitnexus-exploring`, `gitnexus-guide`, `gitnexus-impact-analysis`, `gitnexus-pr-review`, `gitnexus-refactoring`.

### §3.2 Plugin-shipped `.mcp.json`

**Installed** `cache/gitnexus-marketplace/gitnexus/1.3.6/.mcp.json`:

```json
{ "mcpServers": { "gitnexus": { "command": "npx", "args": ["-y", "gitnexus@latest", "mcp"] } } }
```

**CR-9 VIOLATION**: `gitnexus@latest` — D6 today-release-auto-upgrade risk per `.mcp.json` _comments §gitnexus + W155 F13 + W286-cross. Upstream has the **same violation**, so a plain plugin update will not fix it — needs operator override OR upstream PR.

### §3.3 Project root `.mcp.json` entry

```json
"gitnexus": { "type": "stdio", "command": "gitnexus", "args": ["mcp"] }
```

**Two CR-9 sub-violations**:
1. `command: "gitnexus"` relies on PATH-resolved shim at `C:/Users/42/AppData/Roaming/npm/gitnexus` → bakes Windows user-profile into runtime (Z:-portability broken on relocation; same liability the W286 P0C contract fixed for `basic-memory.exe`).
2. No version pin — installed shim is `gitnexus@1.6.5` (verified `npm view gitnexus version` + `npm list -g`). The `.mcp.json` _comments §gitnexus claims pin `1.6.4-rc.112` (W134), but stable npm dist-tag `latest=1.6.5` has been silently picked up by global npm upgrades. **Stale-reference**: comment block describes a state superseded by silent npm upgrades.

### §3.4 npm CLI version

- Global: `gitnexus@1.6.5`
- npm dist-tags: `latest=1.6.5` (parity), `rc=1.6.6-rc.19` (RC channel active)
- Monorepo HEAD: `98addbd6` 2026-05-09 — `chore(deps)(deps-dev): bump @types/node` — quiet 10-day window since.

**License**: PolyForm Noncommercial 1.0.0 (per `.mcp.json` _comments §gitnexus — RETAIN-WITH-DOWNGRADE-DEEP-DIVE-VERIFIED for eee local-runtime non-commercial use).

---

## §4 Per-repo new-features-since-install delta

### §4.1 context-mode (1.0.141 → 1.0.142)
- `src/adapters/opencode/zod3tov4.ts` — Zod v3-to-v4 schema-version translation layer for opencode native plugin path
- `start.mjs` MCP boot rework + boot-path tests
- Minor opencode adapter coerce-primitives fix (#627)

### §4.2 planning-with-files (parity)
*No new features — installed is the canonical HEAD.* Recent v2.38 batch (already shipped):
- `/plan-goal` slash command (composes with v2.1.139 `/goal`)
- `/plan-loop` slash command (composes with v2.1.72+ `/loop`)
- `PreCompact` hook
- Codex `PermissionRequest` adapter
- OpenCode SQLite session-catchup (live schema `session(id, directory, time_created, ...)` + `part`)
- Plan-tamper SHA-256 attestation with `===BEGIN PLAN DATA===` fence (v2.38.1 fix)

### §4.3 GitNexus (plugin static; CLI bug-fix burst)
Since installed plugin commit `b7927870`:
- **Multi-language wiki**: `gitnexus wiki --lang <lang>` (#1613)
- **Wiki timeout/retries**: `--timeout N --retries N` flags (#1543, #1651) — fixes silent 60s timeout
- **Hook concurrency cap**: prevents augment subprocess fork-bomb (#1486)
- **Skip-augment when server owns DB**: avoids hook + server race (#1493)
- **CLI --no-stats fix**: actually omits volatile counts (#1477)

Monorepo since installed npm 1.6.5 (3rd-party-only churn, no CLI feature):
- Search FTS missing-index warning (#1418)
- LadybugDB Windows lock + WAL corruption recovery (#1430, #1417)
- MCP list_repos parallelization (#1416)
- pino structured logger (#1336)
- ReDoS in cobol-preprocessor + URL/regex sanitization (#1331, #1330)
- MCP server stdout discipline + crypto.randomBytes tempfiles (#1383, #1387)

---

## §5 Stale-references list — configs/paths pointing to old upstream

| File | Line | Stale | Truth |
|---|---|---|---|
| `.mcp.json` | _comments §gitnexus W132 | "Version-pinned 1.6.4-rc.112" | Installed actually `gitnexus@1.6.5` (stable advanced past pinned RC) |
| `.mcp.json` mcpServers.gitnexus | `command: "gitnexus", args: ["mcp"]` | PATH-resolved shim, no version pin | Should be `npx -y gitnexus@1.6.5 mcp` per CR-9 |
| `.mcp.json` _comments | "W259-v9 P1 U10 audit lists gitnexus [stdio]" | OK | OK |
| Plugin cache `cache/context-mode/context-mode/1.0.136/` | stale version dir co-exists with 1.0.141 | OLD installed version | Garbage-collect at next plugin update |
| Plugin cache `cache/gitnexus-marketplace/gitnexus/1.3.6/.mcp.json` | `gitnexus@latest` | CR-9 violation in plugin-shipped MCP | Upstream PR or local-override needed |
| Plugin cache `cache/gitnexus-marketplace/gitnexus/1.3.6/hooks/hooks.json.pre-w275-fix` | leftover backup | W275 patch lifecycle artifact | Verify W275 fix lands upstream → remove |
| `.mcp.json` _comments §cognee | "cognee 1.26.0 ... NOW LIVE" + "graph backend = Kuzu" | LadybugDB-fork now (W308 comment) | Both comments present — internally consistent, no action |

---

## §6 SOTA-pattern adoption recommendations

1. **Adopt planning-with-files v2.38.0 `/plan-loop` + `/plan-goal` integration** — pairs naturally with W327 ops-rhythm. Already installed; ensure operator-side `templates/loop.md` is copied to `.claude/loop.md` if `/loop` cadence-pattern is to be used.
2. **Adopt context-mode v1.0.142 `start.mjs` MCP-boot path** — closes opencode-adapter latent zod-version mismatch. Bump is mechanical.
3. **Adopt GitNexus `gitnexus wiki --lang <lang>`** for multilanguage documentation gen if/when a wiki-gen workflow is added — currently no W327 wave consumes it.
4. **Pattern-only**: planning-with-files's `===BEGIN PLAN DATA===` injection-fence delimiter is the SOTA pattern for tamper-attested-plan files; reuse for any new `task_plan.md`-style artifact (avoid YAML doc-separator collision).
5. **Pattern-only**: GitNexus `--no-stats` flag pattern — omits volatile-count diff noise; useful for ALL diff-reporting CLIs.

---

## §7 cardinal-rule-2 compliance check per tool (hook-policy)

Cardinal rule 2: "Hooks may only be upstream-plugin hooks OR direct upstream-CLI invocations declared in `.claude/settings.json`. No project-owned hook bodies under `.claude/hooks/**` except documented bug-patch shims ≤2 KB."

| Tool | Hook surface | Compliance |
|---|---|---|
| **context-mode** | 4 hooks in plugin-shipped `cache/.../1.0.141/hooks/hooks.json` (PreToolUse, PostToolUse, PreCompact, SessionStart) → `node {pluginRoot}/hooks/*.mjs` shims | **COMPLIANT** — plugin-shipped, lives inside `cache/` dir, not `.claude/hooks/`. NOTE: installed file diverges from upstream (path normalization on install) — `diff -q` shows differs — but content semantics are upstream-equivalent |
| **gitnexus plugin** | 2 hooks in plugin-shipped `cache/.../1.3.6/hooks/hooks.json` (PreToolUse on Grep/Glob/Bash, PostToolUse on Bash) → `node {abs-path}/gitnexus-hook.js` | **COMPLIANT WITH CAVEAT** — plugin-shipped, but installed file has been LOCALLY PATCHED (W275: "PATCHED W275 2026-05-17 — absolute Win32 paths bypass CC's POSIX-form CLAUDE_PLUGIN_ROOT injection on Windows"). Backup `hooks.json.pre-w275-fix` retained. This is a runtime-local override of plugin-shipped content; cardinal-rule-2 spirit-of-rule requires upstream-PR or documented bug-patch shim. Currently violates the "shipped-by-upstream" invariant unless W275 patch lands upstream. **Action**: file upstream issue or migrate to a `.claude/hooks/` documented shim (≤2 KB) with bug-patch citation |
| **planning-with-files** | 5 hooks declared INLINE in `skills/planning-with-files/SKILL.md` YAML frontmatter (UserPromptSubmit, PreToolUse, PostToolUse, Stop, PreCompact) — all shell-script `if [ -f task_plan.md ]; then ...` one-liners (no external file) | **COMPLIANT** — upstream-plugin-shipped, ZERO project-owned hook files written. SKILL.md frontmatter is the canonical hook-delivery vehicle for skills. Hook bodies are pure POSIX shell, embed `===BEGIN PLAN DATA===` injection-attestation pattern |

**Aggregate verdict**: 2 of 3 fully compliant; gitnexus plugin has a local-patch lifecycle issue that should be migrated to a documented bug-patch shim or upstreamed.

---

## §8 W327 update plan per tool

### §8.1 context-mode → v1.0.142 (auto-applied / low-risk)

```bash
/plugin update context-mode@context-mode      # pulls v1.0.142
/reload-plugins                                # per W270 corollary
# Verify: ctx_doctor — confirm 5/6 PASS (FTS5/SQLite + hooks + version + runtimes + perf)
```

**Rollback**: cache `cache/.../1.0.141/` retained alongside `1.0.142/` automatically; downgrade via plugin disable + re-enable old.

### §8.2 planning-with-files — NO ACTION

Already at HEAD `d27008f3` v2.38.1. Optional: copy `cache/.../2.38.1/templates/loop.md` → `Z:/claude-sota-installed/.claude/loop.md` if W327 wants `/loop`-driven plan-cadence (per v2.38.0 changelog: "`/loop` only reads these two paths; copy is required, not auto-wired").

### §8.3 GitNexus — 3-step intervention

**Step 1 (BLOCK-LEVEL)**: Patch `.mcp.json` root `gitnexus` mcpServers entry per W286-cross CR-9 contract:

```json
"gitnexus": {
  "type": "stdio",
  "command": "npx",
  "args": ["-y", "gitnexus@1.6.5", "mcp"]
}
```

(Drops the PATH-resolved shim → Z:-portable + version-pinned. Trade-off: ~0.5–1s cold-start. Same trade-off operator-accepted W286 for playwright/chrome-devtools/repomix/phoenix.)

**Step 2 (cardinal-rule-2 cleanup)**: Migrate the W275 local hooks.json patch:
- Option A (preferred): File upstream PR to gitnexus monorepo with the Win32-absolute-path normalization
- Option B: Delete `cache/.../1.3.6/hooks/hooks.json.pre-w275-fix` after migrating the patch logic to a documented bug-patch shim at `.claude/hooks/gitnexus-win32-path-shim.mjs` ≤2 KB, cite-anchored to a specific anthropics/claude-code GitHub issue
- Option C: Accept the cardinal-rule-2 caveat with explicit W327 note in CLAUDE.md (similar to W255 cleanup spirit)

**Step 3 (silent-SHA-drift refresh)**: Re-pull gitnexus-claude-plugin to pick up 6 commits since installed `b7927870`:

```bash
# Per W270 corollary — standard /plugin update no-ops on silent SHA drift (version-string unchanged)
rm -rf Z:/claude-sota-installed/.claude/plugins/cache/gitnexus-marketplace
/plugin install gitnexus@gitnexus-marketplace   # forces fresh clone
/reload-plugins
```

After re-pull, **the gitnexus@latest CR-9 violation in plugin-shipped `.mcp.json` will persist** (upstream issue) — operator should add a `_comments` entry to project-root `.mcp.json` noting that the plugin-shipped MCP entry is shadowed by the project-root entry (which takes precedence per `https://code.claude.com/docs/en/mcp`).

### §8.4 Aggregate W327 commit

After Steps 1–3 applied:

```bash
git add .mcp.json .claude/hooks/  CLAUDE.md  # if cardinal-rule-2 caveat added
git commit -m "ship(W327-S5): sister-tooling audit — gitnexus CR-9 pin + W275 patch lifecycle"
```

---

## Summary

- **context-mode**: 1 patch behind (v1.0.142 trivial)
- **planning-with-files**: PARITY
- **GitNexus**: silent-SHA-drift within plugin dir (6 commits) + CR-9 violation in `.mcp.json` (`gitnexus@latest` + bare-command shim) + W275 cardinal-rule-2 local-patch caveat

Cite-anchors:
- `https://github.com/mksglu/context-mode/tree/v1.0.142` @ `898ecc9f`
- `https://github.com/OthmanAdi/planning-with-files/tree/v2.38.1` @ `d27008f3`
- `https://github.com/abhigyanpatwari/GitNexus/tree/main/gitnexus-claude-plugin` @ `b7927870` (installed) vs HEAD-of-dir `105efd0f`
- `Z:/claude-sota-installed/.mcp.json` _comments §gitnexus + §w286_cross_npx_pinned_v2 (CR-9 contract)
- CLAUDE.md cardinal-rule-2 + W270 corollary (silent-SHA-drift)
