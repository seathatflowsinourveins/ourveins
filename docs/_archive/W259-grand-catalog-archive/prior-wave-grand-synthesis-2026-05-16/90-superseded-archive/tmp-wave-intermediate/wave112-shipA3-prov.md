

## 2026-05-09 Wave 112 Ship A3: document ast-grep + lefthook UNKNOWN-PROVENANCE pre-existing canonical installs

### Origin

Wave 112 Ship A2-RECONCILE commit `e4d731c` queued: "ast-grep + lefthook UNKNOWN-PROVENANCE pre-existing — Ship A3 queued (option A acknowledge OR option B re-install canonical)". Per Mia probe this fire: BOTH pre-existing installs ARE CANONICAL via official native channels (npm-global for ast-grep + WinGet for lefthook). NOT shadow installs — the Wave 112 Ship A1 cargo+npm installs were the shadows. Choosing **Option A (acknowledge in manifest)** since pre-existing installs already use cardinal-rule-12 PRIMARY upstream-install canonical channels.

### Mia probe results (this fire)

| CLI | Pre-existing path | Provenance evidence | Canonical channel? |
|---|---|---|---|
| ast-grep v0.42.0 | `C:/Users/42/AppData/Roaming/npm/ast-grep` (+ `.cmd` + `.ps1` shims) | `npm ls -g` returns `@ast-grep/cli@0.42.0`; install date 2026-03-29 per filesystem mtime | ✅ YES — npm-global is canonical per ast-grep README (`npm install -g @ast-grep/cli`) |
| lefthook v2.1.4 | `C:/Users/42/AppData/Local/Microsoft/WinGet/Links/lefthook.exe` (symlink) | `winget list lefthook` returns `evilmartians.lefthook 2.1.4 (2.1.6 available)`; install date 2026-03-20 per filesystem mtime | ✅ YES — WinGet is canonical Windows native channel per WinGet registry (publisher: evilmartians) |

### Manifest edits applied

**§5.5 Conventional-commits + git-hook orchestrators (L282)**:
- BEFORE: `lefthook ... PLANNED — coexists with pre-commit (Python-side)`
- AFTER: `lefthook ... INSTALLED — Wave 112 Ship A3 documented 2026-05-09 — v2.1.4 via WinGet at C:/Users/42/AppData/Local/Microsoft/WinGet/Links/lefthook.exe (symlink to WinGet/Packages/evilmartians.lefthook_*/lefthook.exe); pre-existed before Wave 112 Ship A1 (install date 2026-03-20 per filesystem mtime); WinGet 2.1.6 available — slight stale per CR-9 D6 today-release-auto-upgrade band; NO immediate upgrade per Wave 112 Ship A1 shadow-install lessons`

**§7 EXPANSION (L405) — Code intelligence**:
- BEFORE: `ast-grep/ast-grep ... PLANNED`
- AFTER: `ast-grep/ast-grep ... INSTALLED — Wave 112 Ship A3 documented 2026-05-09 — v0.42.0 via npm-global at C:/Users/42/AppData/Roaming/npm/ast-grep; registered as @ast-grep/cli@0.42.0 per npm ls -g; pre-existed before Wave 112 Ship A1 (install date 2026-03-29 per filesystem mtime); complement to Serena LSP for structural search via tree-sitter`

### Why option A (acknowledge) over option B (re-install)

Per Mia archeology + cardinal-rule-12: BOTH pre-existing installs ALREADY USE canonical official native channels. Option B (re-install via different channel) would create NEW shadow over canonical install — repeating the Wave 112 Ship A1 anti-pattern. Option A documents the canonical state truthfully without operational change.

Per cardinal-rule-9 install-risk + Wave 112 Ship A1 shadow-install lessons: NO immediate WinGet upgrade for lefthook 2.1.4 → 2.1.6. The version delta is minor; CR-9 D6 today-release-auto-upgrade band acknowledges the slight stale state. Operator can `winget upgrade evilmartians.lefthook` when ready.

### CR-3 Phase 1 bootstrap exception

Doc-only manifest update. T1 codex consult DEFERRED per Phase 1 bootstrap exception. T2 commit-time hook IS the cross-model verification net.

### CR conformance

| CR | Status | Evidence |
|---|---|---|
| CR-1 (cite SOTA primary) | ✅ | TIER-1 cites preserved (ast-grep README + WinGet registry + npm registry as canonical channels per cardinal-rule-12) |
| CR-3 (cross-model T1) | ⚠️ DEFERRED Phase 1 bootstrap exception (T2 commit-gate net) |
| CR-5 (install-priority) | ✅ N/A (acknowledge pre-existing — no new install) |
| CR-7 (graduated unleash) | ✅ Phase 3 preserved |
| CR-8 (full-SOTA-content) | ✅ ADAPTED-FROM-SOTA (cardinal-rule-12 PRIMARY upstream-install via canonical official native channels — npm + WinGet) |
| CR-9 (install-risk) | ✅ MEDIUM→LOW (CR-9 documentation gap closed; both CLIs now manifest-cited at canonical channels) |
| CR-10 (research-first) | ✅ Mia probe BEFORE manifest update (verified canonical channels via `npm ls -g` + `winget list`) |
| CR-11 (META-process) | ✅ Mia ladder n=36 stable (Ship A3 documents pre-existing state — no new OVER catches) |
| CR-12 (upstream-install) | ✅ Both PRIMARY upstream-install via canonical official native channels (npm + WinGet) |

### Disk reclaim cumulative this session arc

- Ship 2CC cleanup-worktrees: 42 MB freed (30 stale agent dirs)
- Ship A2-RECONCILE: 115 MB freed (4 shadow CLI binaries)
- Ship A3: 0 MB (acknowledge-only; no install change)
- **Cumulative: ~157 MB reclaimed disk this session arc**

### Outstanding queue (post Wave 112 Ship A3)

- 🆕 Ship 2AA-followup-2: `gitnexus analyze .` bootstrap eee knowledge graph (operator action OR cron-fire)
- 🆕 Ship T1-gate-extension: extend `codex_t1_consult_gate.py` for commit-body-as-system-meta-review pattern
- 🆕 Ship Mia-probe-fortify: codify alternate-install-path probe as standard Mia discipline (rule extension to mia-pre-apply.md) — load-bearing per Mia archeology n=36
- 🚧 Ship M-fleet-mgmt-key (operator action — CPA :8317)
- 🚧 Ship 2N-batch3-G skillOverrides (24h+ Phoenix telemetry)
- 🚧 Ship 2W reframed container wire-or-disclose
- 🚧 Ship 2A-pilot rtk vs snip (operator decision)
- 🚧 Ship 2Y-stage2 cite-anchor migration

### Wave 112 Ship A3 closure note

45th commit in this session arc. Cron `ae540201` armed `7,22,37,52 * * * *` for autonomous /loop continuation. This /loop fire arc cumulative: 9 substantive ships landed (Wave 109 closure + Wave 112 Ship A1 + Ship 2AA + Ship F + Ship 2BB+F-router + Ship 2CC + Ship A2-RECONCILE + Ship A3). Mia ladder n=36 stable. CR-9 risk for Ship A1 5-CLI series fully closed (5/5 INSTALLED via manifest-cited canonical channels: 3 Wave 62 .local/bin/ + 2 pre-existing canonical npm/WinGet).
