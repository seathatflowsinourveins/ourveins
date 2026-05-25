

## 2026-05-09 Wave 112 Ship 2AA-followup-2: gitnexus analyze HONEST-NON-FINDING (Ship 2AA-debug queued)

### Origin

Wave 112 Ship 2AA commit `eecc2da` queued: "operator action suggested: Run `gitnexus analyze .` in eee runtime to index claude-sota-installed itself; mcp__gitnexus__impact + detect_changes return real symbols only after indexing". This fire attempted the bootstrap.

### Attempts (3 variations)

| # | Command | Duration | Exit | Output | meta.json | Registry |
|---|---|---|---|---|---|---|
| 1 | `gitnexus analyze . --skip-agents-md --no-stats` | 3s | 0 | "Skipped 1 large files (>512KB)" — `docs/install-provenance.md` | NOT created | NOT populated |
| 2 | `gitnexus analyze . --skip-agents-md --no-stats --name eee --verbose` | 3s | 0 | Same as #1 | NOT created | NOT populated |
| 3 | `gitnexus analyze --force --skip-agents-md --no-stats --verbose` | 2s | 0 | Same | NOT created | NOT populated |
| 4 | `GITNEXUS_NO_GITIGNORE=1 gitnexus analyze --force ...` | 3s | 0 | "Skipped 2 large files" — adds `AppData/Local/Packages/Microsoft.DesktopAppInstaller_8wekyb3d8bbwe/AC/INetCache/G0JKXRKD/source2[1].msix` | NOT created | NOT populated |

All attempts: `.gitnexus/lbug` + `.gitnexus/lbug.wal` (32KB total) created BUT `meta.json` MISSING.

### Root cause hypothesis (Mia probe surfaced)

`Z:/claude-sota-installed/AppData/` EXISTS — HOME redirect side-effect (`USERPROFILE=Z:\claude-sota-installed` per CLAUDE.local.md ENV (a) creates Windows-conventional AppData/ subdir under the redirected HOME). `gitnexus analyze .` resolves CWD relative paths AND walks AppData/ as part of "current directory" content.

This is a Windows + HOME-redirect quirk with gitnexus path resolution:
1. CLAUDE.local.md ENV (a): `USERPROFILE=Z:\claude-sota-installed` (HOME redirect for portable runtime)
2. Some Windows apps create `Z:/claude-sota-installed/AppData/Local/...` cache directories
3. gitnexus walks subdirs of `.` (the eee repo) AND finds the Windows AppData cache (which is technically under the redirected HOME)
4. The walking encounters non-source content + bails early (silent — no error, just incomplete crawl)
5. meta.json never gets written → `gitnexus list` returns "No indexed repositories"

Confirmed: `ls -d /z/claude-sota-installed/AppData/` returns the dir (exists); gitnexus's analyze appears to bail when encountering this non-source content tree.

### Cleanup applied this fire

`rm -rf /z/claude-sota-installed/.gitnexus/` — removed broken 32KB index. `.gitnexus/` is gitignored per `.gitignore` so no git state change.

### HONEST-NON-FINDING per `synthesis-layer-verify.md §Reporting categories`

Ship 2AA-followup-2 attempted bootstrap. Result: NEGATIVE — gitnexus analyze does not produce a usable index in eee runtime under current HOME-redirect configuration. mcp__gitnexus__impact + detect_changes will continue to return "No indexed repositories found" until Ship 2AA-debug resolves the path-walk issue.

### Ship 2AA-debug queued (next-fire)

**Hypotheses to investigate**:
1. **Add `.gitnexusignore` excluding AppData/** — `.gitnexusignore` per gitnexus README supports `.gitignore`-style negation; could explicitly exclude `AppData/` + other Windows-conventional paths under HOME redirect
2. **Run gitnexus from a sub-directory** — `cd .claude/rules && gitnexus analyze .` would scope crawl to a subset; verify analyze works on small scope first
3. **Use `--max-file-size` adjustment** — the docs/install-provenance.md is 678KB > 512KB default; raise threshold OR exclude it explicitly
4. **Probe `gitnexus analyze` with explicit path arg** — `gitnexus analyze /z/claude-sota-installed/.claude/` to scope to claude config dir only
5. **Investigate gitnexus version** — v1.6.3 may have known Windows + HOME-redirect bug; check upstream issues

**Next fire scope**: try hypothesis 1 (`.gitnexusignore` AppData/) first since it's least invasive. If still fails, hypothesis 4 (subdirectory scope).

### CR-3 Phase 1 bootstrap exception

Operational debug fire + HONEST-NON-FINDING report. T1 codex consult DEFERRED. T2 commit-time hook IS the cross-model verification net.

### CR conformance

| CR | Status | Evidence |
|---|---|---|
| CR-1 (cite SOTA primary) | ✅ | gitnexus README cites preserved (--max-file-size + .gitnexusignore + GITNEXUS_NO_GITIGNORE env) |
| CR-3 (cross-model T1) | ⚠️ DEFERRED Phase 1 bootstrap exception (T2 commit-gate net) |
| CR-5 (install-priority) | ✅ N/A (debug attempt — no new install) |
| CR-7 (graduated unleash) | ✅ Phase 3 preserved |
| CR-8 (full-SOTA-content) | ✅ ADAPTED-FROM-SOTA (gitnexus official docs cited per Mia probe enumeration) |
| CR-9 (install-risk) | ✅ LOW (broken index removed; .gitnexus/ gitignored — no git state change) |
| CR-10 (research-first) | ✅ Mia probe BEFORE writing provenance (4 analyze variations + AppData/ existence check + meta.json absence verification) |
| CR-11 (META-process) | ✅ HONEST-NON-FINDING discipline per `synthesis-layer-verify.md §Reporting categories` |
| CR-12 (upstream-install) | ✅ N/A (gitnexus already INSTALLED Wave 112 Ship 2AA; this is operational bootstrap attempt) |

### Outstanding queue (post Wave 112 Ship 2AA-followup-2 HNF)

- 🆕 **Ship 2AA-debug**: investigate gitnexus analyze HOME-redirect path-walk bug (5 hypotheses queued above; try `.gitnexusignore` AppData/ first)
- 🆕 Ship T1-gate-extension: extend `codex_t1_consult_gate.py` for commit-body-as-system-meta-review pattern
- 🆕 Ship Mia-fortify-router-update: cross-rule-citations (LOW priority — sister rules already cross-reference Mia outbound; bidirectional inbound less critical)
- 🚧 Ship M-fleet-mgmt-key (operator action — CPA :8317)
- 🚧 Ship 2N-batch3-G skillOverrides (24h+ Phoenix telemetry)
- 🚧 Ship 2W reframed container wire-or-disclose
- 🚧 Ship 2A-pilot rtk vs snip (operator decision)
- 🚧 Ship 2Y-stage2 cite-anchor migration

### Wave 112 Ship 2AA-followup-2 HNF closure note

48th commit in this session arc. Cron `ae540201` armed `7,22,37,52 * * * *` for autonomous /loop continuation. This /loop fire arc cumulative: 11 substantive ships (10 ships + this HNF closure). HONEST-NON-FINDING discipline preserved per cardinal-rule-7 + synthesis-layer-verify.md §Reporting categories.
