

## 2026-05-09 Wave 112 Ship A2-RECONCILE: shadow-install uninstall (4 Wave 112 Ship A1 CLIs) + UNKNOWN-provenance documentation

### Origin

Wave 112 Ship 2CC commit `7676e72` documented Mia archeology n=31→36 — Ship A1's "5 GENUINE-GAP CLIs" were all SHADOW installs over pre-existing canonical paths. Ship A2-RECONCILE is the operational closure: uninstall 4 Wave 112 shadows; verify Wave 62 + pre-existing fallback paths intact.

### Operations executed

| # | CLI | Uninstall command | Path removed | Smoke post-uninstall |
|---|---|---|---|---|
| 1 | typos | `cargo uninstall typos-cli` | `Z:/claude-sota-installed/.cargo/bin/typos.exe` | `typos --version` → `typos-cli 1.46.0` (Wave 62 `.local/bin/`) ✅ |
| 2 | ast-grep | `cargo uninstall ast-grep` | `Z:/claude-sota-installed/.cargo/bin/ast-grep.exe` + `sg.exe` | `ast-grep --version` → `ast-grep 0.42.0` (npm-global) ✅ |
| 3 | osv-scanner | `rm /c/Users/42/go/bin/osv-scanner.exe` | `C:/Users/42/go/bin/osv-scanner.exe` | `osv-scanner --version` → `osv-scanner version: 2.3.6` (Wave 62 `.local/bin/`) ✅ |
| 4 | lefthook | `npm uninstall -g lefthook` | npm-global lefthook + dependencies | `lefthook --version` → `lefthook version 2.1.4` (WinGet `WinGet/Links/`) ✅ |

(semgrep was uv tool idempotent in Ship A1 — no shadow created; no uninstall needed; PATH-resolved Wave 62 v1.162.0 unchanged)

### Post-uninstall canonical install paths (Mia probe verified)

| CLI | Canonical install | Provenance | CR-9 risk |
|---|---|---|---|
| typos v1.46.0 | `Z:/claude-sota-installed/.local/bin/typos` | Wave 62 fire 6 (manifest §5 L101 INSTALLED) | LOW (cited in manifest) |
| osv-scanner v2.3.6 | `Z:/claude-sota-installed/.local/bin/osv-scanner` | Wave 62 fire 6 (manifest §5 L103 INSTALLED) | LOW (cited in manifest) |
| semgrep v1.162.0 | `Z:/claude-sota-installed/.local/bin/semgrep` | Wave 62 fire 6 (manifest §5 L108 INSTALLED) | LOW (cited in manifest) |
| ast-grep v0.42.0 | `C:/Users/42/AppData/Roaming/npm/ast-grep` | **UNKNOWN-PROVENANCE** (NOT in manifest; npm-global pre-existing) | ⚠️ MEDIUM (CR-9 documentation gap) |
| lefthook v2.1.4 | `C:/Users/42/AppData/Local/Microsoft/WinGet/Links/lefthook` | **UNKNOWN-PROVENANCE** (NOT in manifest; WinGet pre-existing) | ⚠️ MEDIUM (CR-9 documentation gap) |

### UNKNOWN-PROVENANCE documentation gap (Ship A3 queued)

ast-grep (npm-global) + lefthook (WinGet) are pre-existing installs from prior unknown sessions. Per cardinal-rule-9 install-risk discipline: every install MUST be documented in manifest. Two options for next-fire Ship A3:

- **Option A (Acknowledge)**: add manifest §7/§5.5 rows for ast-grep + lefthook with `INSTALLED-VIA-UNKNOWN-CHANNEL — pre-existed before Wave 112 Ship A2-RECONCILE; canonical channel TBD` markers
- **Option B (Re-install via canonical)**: uninstall UNKNOWN-provenance + re-install via cardinal-rule-12 PRIMARY upstream-install channel (cargo for ast-grep; gh release download for lefthook); then update manifest

Recommended Option A for next fire (less destructive; preserves existing functional state); Option B if operator prefers canonical-only state.

### Disk reclaim

| Path | Pre-uninstall | Post-uninstall | Delta |
|---|---|---|---|
| `Z:/claude-sota-installed/.cargo/bin/typos.exe` | ~10 MB | (removed) | -10 MB |
| `Z:/claude-sota-installed/.cargo/bin/ast-grep.exe + sg.exe` | ~20 MB | (removed) | -20 MB |
| `C:/Users/42/go/bin/osv-scanner.exe` | ~80 MB | (removed) | -80 MB |
| npm-global lefthook + deps | ~5 MB | (removed) | -5 MB |
| **Total** | ~115 MB | 0 | **-115 MB** |

Combined with Ship 2CC cleanup-worktrees (-42 MB) → **this session arc reclaimed ~157 MB shadow-install + cleanup-leak waste**.

### CR-3 Phase 1 bootstrap exception

Operational uninstall + provenance closure. T1 codex consult DEFERRED per Phase 1 bootstrap exception. T2 commit-time hook IS the cross-model verification net.

### CR conformance

| CR | Status | Evidence |
|---|---|---|
| CR-1 (cite SOTA primary) | ✅ | TIER-1 cites preserved (manifest §5 L101+L103+L108 Wave 62 install rows; sister-rule citations) |
| CR-3 (cross-model T1) | ⚠️ DEFERRED Phase 1 bootstrap exception (T2 commit-gate net) |
| CR-5 (install-priority) | ✅ N/A (uninstall — closes shadow-install state) |
| CR-7 (graduated unleash) | ✅ Phase 3 preserved |
| CR-8 (full-SOTA-content) | ✅ ADAPTED-FROM-SOTA (closes Ship A1 over-claim per Mia archeology #32-36) |
| CR-9 (install-risk) | ✅ MEDIUM→LOW for typos/osv-scanner/semgrep (now manifest-cited canonical paths only); ⚠️ MEDIUM remaining for ast-grep/lefthook (UNKNOWN-provenance pre-existing — Ship A3 queued) |
| CR-10 (research-first) | ✅ Mia archeology probe BEFORE uninstall (verified PATH-resolved versions + alternate install paths) |
| CR-11 (META-process) | ✅ Mia ladder n=36→n=36 (no new OVER catches; reconciliation operationally closed) |
| CR-12 (upstream-install) | ✅ canonical Wave 62 paths preserved per cardinal-rule-12 PRIMARY upstream-install channel |

### What this unlocks

- **Operational hygiene**: 115 MB shadow-install waste reclaimed
- **Manifest accuracy**: typos/osv-scanner/semgrep PATH-resolved versions now match manifest §5 cited versions (no version-drift confusion)
- **CR-9 risk reduction**: 3 of 5 CLIs back to manifest-cited canonical paths only
- **Ship A3 queued**: ast-grep + lefthook UNKNOWN-provenance documentation OR re-install via canonical channel

### Session arc cumulative reclamation

This /loop fire arc total:
- Ship 2CC cleanup-worktrees: 42 MB freed (30 stale agent dirs)
- Ship A2-RECONCILE: 115 MB freed (4 shadow CLI binaries)
- **Total: ~157 MB reclaimed disk**

### Outstanding queue (post Wave 112 Ship A2-RECONCILE)

- 🆕 **Ship A3-document-unknown-provenance**: add manifest rows for ast-grep + lefthook UNKNOWN-provenance OR re-install via canonical channel (operator decision)
- 🆕 Ship 2AA-followup-2: `gitnexus analyze .` bootstrap eee knowledge graph
- 🆕 Ship T1-gate-extension: extend `codex_t1_consult_gate.py` for commit-body-as-system-meta-review
- 🆕 Ship Mia-probe-fortify: codify alternate-install-path probe as standard Mia discipline (rule extension to mia-pre-apply.md) — load-bearing per Mia archeology n=36
- 🚧 Ship M-fleet-mgmt-key (operator action — CPA :8317)
- 🚧 Ship 2N-batch3-G skillOverrides (24h+ Phoenix telemetry)
- 🚧 Ship 2W reframed container wire-or-disclose
- 🚧 Ship 2A-pilot rtk vs snip (operator decision)
- 🚧 Ship 2Y-stage2 cite-anchor migration

### Wave 112 Ship A2-RECONCILE closure note

44th commit in this session arc. Cron `ae540201` armed `7,22,37,52 * * * *` for autonomous /loop continuation. This fire arc cumulative: 8 substantive ships landed (Wave 109 closure + Wave 112 Ship A1 + Ship 2AA + Ship F + Ship 2BB+F-router + Ship 2CC + Ship A2-RECONCILE). Mia ladder n=36 stable.
