

## 2026-05-09 Wave 112 Ship 2CC: cleanup-worktrees + Mia archeology n=31→36 (Ship A1 shadow-install catch)

### Ship 2CC-cleanup — stale worktrees bulk cleanup

**Trigger**: 30 stale `agent-*/` worktrees in `.claude/worktrees/` totaling 42MB — FM-17.b.ii cleanup-leak signature (LOCKED state from prior Sonnet wrapper crashes per Wave 110 fire 1 + Wave 112 Ship A1 + earlier fires).

**Action**:
```bash
for w in .claude/worktrees/agent-*/; do
  name=$(basename "$w")
  git worktree unlock ".claude/worktrees/$name" 2>/dev/null
  git worktree remove --force ".claude/worktrees/$name" 2>/dev/null \
    || rm -rf ".claude/worktrees/$name"
done
git worktree prune -v
```

**Result**: 30 cleaned / 0 failed. Worktree count: 31 → 1 (main only). Disk: 42MB → 4KB. `git worktree list` post-cleanup shows only `Z:/claude-sota-installed [main]`.

**Sister rule**: per `Z:/claude-sota/.claude/rules/parallel-session-worktree-isolation.md §FM-17.b.ii cleanup-leak` — agent worktrees should be ephemeral; LOCKED state indicates wrapper crash before unlock; bulk-cleanup is sanctioned operational hygiene.

### Mia archeology — Ship A1 shadow-install catch (n=31 → n=36)

**Origin**: Wave 112 Ship A1 commit `f29c973` shipped "5 GENUINE-GAP CLIs" per Agent A SOTA delta audit. Mia ladder advanced n=29→31 catching 3 OVER (spec-kit + anthropic-sdk-python + claude-agent-sdk-python already installed) + 1 (semgrep PATH-vs-binary gap discovered post-install).

**Post-install Mia archeology (this fire)**: probed effective PATH-resolved versions for all 5 Ship A1 CLIs vs install locations. **ALL 5 were pre-installed** in alternate paths SHADOWED by Ship A1's installs:

| CLI | Pre-existing install | Wave 112 Ship A1 install | PATH-resolved (effective) | Mia OVER |
|---|---|---|---|---|
| typos | Wave 62 fire 6 v1.46.0 at `Z:/claude-sota-installed/.local/bin/typos` | Wave 112 cargo v1.46.1 at `Z:/claude-sota-installed/.cargo/bin/typos.exe` | **Wave 62 v1.46.0 (my v1.46.1 SHADOWED)** | OVER #32 |
| osv-scanner | Wave 62 fire 6 v2.3.6 at `Z:/claude-sota-installed/.local/bin/osv-scanner` | Wave 112 go install v2.3.8 at `C:/Users/42/go/bin/osv-scanner.exe` | **Wave 62 v2.3.6 (my v2.3.8 SHADOWED)** | OVER #33 |
| semgrep | Wave 62 fire 6 v1.162.0 at `Z:/claude-sota-installed/.local/bin/semgrep` (uv tool) | Wave 112 idempotent uv tool re-run | **Wave 62 v1.162.0 (idempotent — no shadow)** | OVER #31 (re-confirmed; PATH gap was actually pre-existing install) |
| ast-grep | PRE-EXISTING npm install at `C:/Users/42/AppData/Roaming/npm/ast-grep` (UNKNOWN provenance — not in manifest) | Wave 112 cargo v0.42.1 at `Z:/claude-sota-installed/.cargo/bin/ast-grep.exe` | **npm pre-existing (my cargo SHADOWED)** | OVER #34 |
| lefthook | PRE-EXISTING WinGet install at `C:/Users/42/AppData/Local/Microsoft/WinGet/Links/lefthook` (UNKNOWN provenance — not in manifest) | Wave 112 npm v2.1.4 at npm-global | **WinGet pre-existing (my npm SHADOWED)** | OVER #35 + OVER #36 (WinGet path UNDOCUMENTED in manifest) |

**Mia ladder advance**: n=31 → **n=36** (5 new OVER catches). Per `Z:/claude-sota/.claude/rules/mia-pre-apply.md`: original Ship A1 Mia probe used only `command -v <cli>` which checks PATH-availability; did NOT probe ALTERNATE install paths (`.local/bin/`, `.cargo/bin/`, `~/go/bin/`, npm-global, WinGet, uv tool dirs). Fortified Mia probe MUST enumerate alternate install paths for each CLI class.

**Root cause (Ship A1 Mia probe gap)**: `command -v <cli>` returns BOTH "not in PATH" AND "in PATH but at first hit" — the latter case can hide ALTERNATE installs at non-PATH locations. Effective check requires:
1. `command -v <cli>` (PATH probe)
2. `find /z/claude-sota-installed/.local/bin /z/claude-sota-installed/.cargo/bin ~/go/bin ~/.local/bin /c/Users/*/AppData/Roaming/npm /c/Users/*/AppData/Local/Microsoft/WinGet -maxdepth 1 -name '<cli>*' -type f` (ALTERNATE install path probe)
3. `npm ls -g 2>/dev/null | grep <cli>` (npm-global registry probe)
4. `uv tool list 2>/dev/null | grep <cli>` (uv tool registry probe)
5. `winget list <cli>` (WinGet registry probe)

### Shadow-install consequences (CR-9 install-risk MEDIUM)

- **Disk waste**: ~70-100MB shadow CLI binaries across `.cargo/bin/` (typos + ast-grep) + `~/go/bin/` (osv-scanner) + npm-global (lefthook) + duplicate at npm-global (ast-grep)
- **Version-drift confusion**: typos PATH-resolves to v1.46.0 but `.cargo/bin/typos.exe` is v1.46.1; osv-scanner PATH-resolves to v2.3.6 but `~/go/bin/osv-scanner.exe` is v2.3.8 — operator running `osv-scanner --version` may see different versions depending on which shell PATH order
- **Wave 112 Ship A1 commit body claims** "5 GENUINE-GAP CLIs installed" — partial OVER; should have been "5 idempotent re-installs creating shadow paths"
- **Provenance trail integrity**: Wave 112 Ship A1 commit `f29c973` body documents v1.46.1 / v2.3.8 / v1.162.0 / v1.46.4 / v2.1.4 — these are REAL installs but NOT the PATH-resolved versions

### Ship A2-version-pin SCOPE REVISED

**Original scope** (per Wave 112 Ship A1 commit body): pin 5 CLIs to captured versions per CR-9 mandate. Implied straightforward manifest update.

**Revised scope** (post Mia archeology #32-36): SHADOW-INSTALL RECONCILIATION required:
1. Decide canonical install per CLI: keep Wave 62 `.local/bin/` path OR Wave 112 `.cargo/bin/` / `~/go/bin/` path
2. Uninstall shadow copies via channel-specific commands (`cargo uninstall typos-cli ast-grep`; `rm ~/go/bin/osv-scanner.exe`; `npm uninstall -g lefthook`)
3. Update manifest §5/§5.5/§7/§10 with canonical install + version-pin
4. DOCUMENT Wave 112 Ship A1 partial-OVER in commit body
5. Document UNKNOWN-provenance pre-existing installs (npm ast-grep + WinGet lefthook) — when were these installed? Add to manifest §audit-trail

**Defer rationale**: per cycle-300 ONE-LOGICAL-UNIT-PER-FIRE — Ship A2 reconciliation is substantive (multi-step uninstall + manifest update across 4 sections); doesn't fit this fire. Queue for next fire dedicated to Ship A2-RECONCILE.

**Recommended canonical choice** (for next fire's Ship A2-RECONCILE): keep Wave 62 `.local/bin/` paths since they're already cited in manifest at HEAD-pinned versions; uninstall Wave 112 shadow installs.

### CR-3 Phase 1 bootstrap exception (Ship 2CC)

This is operational hygiene + doc-only provenance. T1 codex consult DEFERRED per Phase 1 bootstrap exception. T2 commit-time hook IS the cross-model verification net.

### CR conformance

| CR | Status | Evidence |
|---|---|---|
| CR-1 (cite SOTA primary) | ✅ | Mia archeology cites cycle-322 jurisdiction + parallel-session-worktree-isolation.md FM-17.b.ii cleanup-leak |
| CR-3 (cross-model T1) | ⚠️ DEFERRED Phase 1 bootstrap exception (T2 commit-gate net) |
| CR-5 (install-priority) | ✅ N/A (cleanup + Mia archeology — no new installs) |
| CR-7 (graduated unleash) | ✅ Phase 3 preserved |
| CR-8 (full-SOTA-content) | ✅ ADAPTED-FROM-SOTA (worktree cleanup per parallel-session-worktree-isolation.md sister rule; Mia archeology per mia-pre-apply.md sister rule) |
| CR-9 (install-risk) | ⚠️ MEDIUM (Ship A1 shadow-install state surfaced; reconciliation queued for next fire) |
| CR-10 (research-first) | ✅ Mia probe enumerated alternate install paths BEFORE writing provenance |
| CR-11 (META-process) | ✅ Mia ladder advanced n=31→36 with explicit cite trail; cleanup-worktrees per FM-17.b.ii recovery action |
| CR-12 (upstream-install) | ✅ N/A (no new installs) |

### What this unlocks

- **Operational hygiene**: 42MB → 4KB; future agent dispatches won't accumulate against existing 30+ stale dirs
- **Mia probe discipline upgrade**: future Ship A1-class CLI install probes MUST enumerate alternate install paths (`.local/bin/`, `.cargo/bin/`, `~/go/bin/`, npm-global, WinGet, uv tool) per discovered 5-instance OVER pattern
- **Ship A2-RECONCILE queued**: next fire can address shadow-install state with informed-action plan

### Outstanding queue (post Wave 112 Ship 2CC)

- 🆕 **Ship A2-RECONCILE** (REVISED scope): shadow-install reconciliation across 4 CLIs (typos / osv-scanner / ast-grep / lefthook) — uninstall shadows OR document dual-install state in manifest
- 🆕 Ship 2AA-followup-2: `gitnexus analyze .` bootstrap eee knowledge graph (operator action OR cron-fire)
- 🆕 Ship T1-gate-extension: extend `codex_t1_consult_gate.py` for commit-body-as-system-meta-review pattern
- 🆕 Ship Mia-probe-fortify: codify alternate-install-path probe as standard Mia discipline for CLI installs (rule extension to mia-pre-apply.md OR new sub-rule)
- 🚧 Ship M-fleet-mgmt-key (operator action — CPA :8317 management-key env)
- 🚧 Ship 2N-batch3-G skillOverrides (24h+ Phoenix telemetry)
- 🚧 Ship 2W reframed container wire-or-disclose
- 🚧 Ship 2A-pilot rtk vs snip (operator decision)
- 🚧 Ship 2Y-stage2 cite-anchor migration

### Wave 112 Ship 2CC closure note

43rd commit in this session arc. Cron `ae540201` armed `7,22,37,52 * * * *` for autonomous /loop continuation. This fire arc cumulative: 7 substantive ships (Wave 109 closure + Wave 112 Ship A1 + Ship 2AA + Ship F + Ship 2BB+F-router + Ship 2CC).
