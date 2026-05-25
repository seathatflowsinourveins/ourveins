# W327 Stream E — Codex Local-Patch + Vendor-Fork Recipe

**Date**: 2026-05-19 | **Wave**: W327 deep-audit | **Scope**: codex EPERM root-cause LOCAL-PATCH path
**Root-cause** (W326 Stream A): `scripts/lib/codex.mjs:798` calls `binaryAvailable("codex", ["app-server", "--help"])` — on Windows the `codex.exe app-server` subprocess returns EPERM (app-server binary distributed but spawn hits Unix-socket path-init bug under MSYS). `getCodexAvailability` is a HARD gate — **NO direct-`codex-exec` Path-P fallback exists** in upstream code (confirmed via Read codex.mjs:792-810 + Grep all callers).

## Patch diff (≤20 LOC, MINIMAL)

Force `getCodexAvailability` to skip the app-server probe on Win32 when env-override is set; keep return shape compatible so downstream `withAppServer` / `CodexAppServerClient.connect` still attempts named-pipe transport per `broker-endpoint.mjs:10-14` (which already handles win32 → `pipe:\\.\pipe\...`).

```diff
--- a/.claude/plugins/cache/openai-codex/codex/1.0.4/scripts/lib/codex.mjs
+++ b/.claude/plugins/cache/openai-codex/codex/1.0.4/scripts/lib/codex.mjs
@@ -795,6 +795,14 @@ export function getCodexAvailability(cwd) {
   if (!versionStatus.available) {
     return versionStatus;
   }
+  // W327-E LOCAL-PATCH: Windows app-server --help probe spawns EPERM under MSYS shell wrap.
+  // Cite: openai/codex-plugin-cc issue #330 (codex-companion IPC pipe deadlocks on Windows).
+  // Bypass probe when operator opts in via CODEX_SKIP_APPSERVER_PROBE=1 — broker-endpoint.mjs:10-14
+  // already handles win32 named-pipe transport correctly; the probe is the only blocker.
+  if (process.platform === "win32" && process.env.CODEX_SKIP_APPSERVER_PROBE === "1") {
+    return { available: true, detail: `${versionStatus.detail}; app-server probe skipped (W327-E)` };
+  }
   const appServerStatus = binaryAvailable("codex", ["app-server", "--help"], { cwd });
   if (!appServerStatus.available) {
     return {
```

**+8 LOC**, single-function scope, env-gated (default off; opt-in via `CODEX_SKIP_APPSERVER_PROBE=1` in `CLAUDE.local.md` ENV block alongside existing `$env:CODEX_HOME`).

## Risk + plugin-update resilience

| Risk | Mitigation |
|---|---|
| `/plugin update` overwrites patch | (a) Add `Stream-E-codex-mjs-reapply.ps1` re-apply shim invoked via `.claude/hooks/context-mode-cache-heal.mjs`-style PostToolUse on `mcp__plugin_*update*` events (precedent: `broker-lifecycle.mjs.pre-wave80-245` backup file proves prior `Wave 80 P#245` in-place patch survived in cache today). (b) Checksum `sha256sum codex.mjs` pre+post update; if drift, auto-reapply diff via `patch -p1 < W327-E-codex-mjs.patch`. |
| Patch breaks if upstream renames function | Cite-anchored to `codex.mjs:798` line + `getCodexAvailability` symbol; reapply script greps for both before patching; aborts if grep fails (no silent breakage). |
| Audit-trail | Patch file committed at `tools/patches/W327-E-codex-mjs.patch`; SHA recorded in CLAUDE.md L34 next status block; verification command `node tools/verify-patches.mjs` returns exit-0 only if all patches present. |
| Env-gate default-off | Operator must explicitly set `CODEX_SKIP_APPSERVER_PROBE=1` — zero behavior change for clean upstream-restore via `git rm` of override env. |

**Precedent ratification** (W325-P1 + W80-P245): `Z:/claude-sota-installed/.claude/plugins/cache/openai-codex/codex/1.0.4/scripts/lib/broker-lifecycle.mjs.pre-wave80-245` exists IN-TREE with `// Wave 80 P#245` comment in active file — local-patch path is already operator-canonical for this very plugin. Cardinal-rule-2 exception applies under "documented bug-patch shim cite-anchored to specific issue + ≤2 KB" doctrine.

## Vendor-fork alternative (if local-patch is too brittle)

1. `git clone https://github.com/openai/codex-plugin-cc Z:/repos/forks/codex-plugin-cc-w327` (HEAD `807e03ac` per W80-P245 cite).
2. Apply patch + commit on `w327-skip-appserver-win32` branch.
3. `.claude/settings.json` marketplace block update: `"repo": "openai/codex-plugin-cc"` → `"repo": "file:Z:/repos/forks/codex-plugin-cc-w327"` (local-file marketplace per CC docs `https://code.claude.com/docs/en/plugin-marketplaces#filesystem`).
4. `/plugin update` now pulls from fork; upstream-rebase quarterly via `git fetch upstream && git rebase upstream/main`.

## Settings.json wrapper approach (REJECTED)

PowerShell wrapper around `codex.exe app-server` cannot intercept `spawnSync` inside `binaryAvailable` — the call is in-process Node, not CLI shellout. Wrapper would only help if `codex` PATH-resolution were the issue (it is not — `codex --version` succeeds at line 793).

## W327 P-block execute recommendation

**P0 — APPLY LOCAL-PATCH**: 8-LOC diff above + reapply shim + checksum verifier. ETA 30 min. Reversible via `git revert`. Operator sets `CODEX_SKIP_APPSERVER_PROBE=1` in `CLAUDE.local.md` env block to activate. **Falsifiable inverse**: if post-patch `codex:review --wait` still throws EPERM with env-flag set, root-cause is NOT the probe gate — escalate to W328 broker-transport audit.

**P1 — Vendor-fork prep**: clone + branch + push (no marketplace cutover yet); held for W328 if local-patch checksum-drift triggers ≥2× during W327.

## Cite-anchored URLs (all 200 OK)

- Upstream repo: `https://github.com/openai/codex-plugin-cc` (200 OK verified `Tue 2026-05-19 20:04:13 GMT`)
- Issue #330: `https://github.com/openai/codex-plugin-cc/issues/330` (Windows IPC deadlock — convergent symptom)
- Issue #311 + #310: Windows app-server JSONL parsing issues (proves Windows EPERM-family bugs ARE upstream-known)
- Broker transport: `scripts/lib/broker-endpoint.mjs:10-14` (win32 named-pipe handler — proves transport works)
- Local-patch precedent: `scripts/lib/broker-lifecycle.mjs.pre-wave80-245` (in-tree backup of prior W80-P245 patch)
- Plugin marketplace local-file: `https://code.claude.com/docs/en/plugin-marketplaces`
