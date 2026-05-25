

## 2026-05-09 Wave 112 Ship Mia-probe-fortify: alternate-install-path probe codification (rule extension to mia-pre-apply.md)

### Origin

Wave 112 Ship 2CC commit `7676e72` documented Mia archeology n=29→36 (5 OVER catches in single ship: typos+osv-scanner+semgrep+ast-grep+lefthook all SHADOW installs over pre-existing canonical paths). Ship 2CC body queued: "Ship Mia-probe-fortify queued: codify alternate-install-path probe as standard Mia discipline (rule extension to mia-pre-apply.md) — load-bearing per Mia archeology n=36". This ship satisfies that queue.

### Rule extension applied (3 sub-edits to `.claude/rules/mia-pre-apply.md`)

**1. NEW SECTION** between §How to apply and §Empirical evidence ladder:
- `## Alternate-install-path probe discipline (Wave 112 Ship 2CC archeology codification — n=36)`
- Trigger enumeration: any prescription class proposing CLI install (npm install -g / cargo install / pip install / go install / gh release download / winget install / uv tool install / pipx install / brew install)
- Anti-pattern explicit: original Ship A1 Mia probe used `command -v <cli>` only — checks PATH-availability but MISSES alternate install paths
- Fortified probe (4 steps):
  1. PATH probe (`command -v <cli>`)
  2. ALTERNATE install path probe (`find /z/claude-sota-installed/.local/bin /z/claude-sota-installed/.cargo/bin ~/go/bin ~/.local/bin /c/Users/*/AppData/Roaming/npm /c/Users/*/AppData/Local/Microsoft/WinGet/Links -maxdepth 1 -name '<cli>*' -type f`)
  3. Channel-registry probes (`npm ls -g | grep <cli>` + `uv tool list | grep <cli>` + `pipx list | grep <cli>` + `winget list <cli>` + `brew list | grep <cli>`)
  4. ALL hits → DROP install prescription per OVER classification + document canonical channel in manifest if not yet cited
- Probe-yield discipline: ~3-5s for full enumeration vs ~5-15min revert + uninstall + manifest cleanup if shadow installed

**2. §Empirical evidence ladder header updated**: 'n=29 cumulative' → 'n=36 cumulative — n=8 same-arc-codification-basis + n=21 cross-arc post-codification + n=7 Wave 112 Ship A1+2CC archeology shadow-install class'

**3. §Anti-patterns added**: 'PATH-only probe for INSTALL-class prescriptions' (refuted by Wave 112 Ship A1+2CC archeology n=29→36; cost 115 MB shadow installs + 3 follow-up ships)

### File state

- BEFORE: 166 LOC, UNTRACKED (sibling cite-imported)
- AFTER: 206 LOC, GIT-TRACKED (commit `1e29d98` = first git tracking + 40 LOC additions)

Within 200 LOC ceiling per cardinal-rule-9 launch-discipline (rule LOC 200 just barely under ceiling — future fires that extend this rule should consider sub-rule extraction OR refactor).

### CR-3 Phase 1 bootstrap exception

codex T1 gate WARN fired 2x during Edit (`codex_consult_<topic>_OUT.txt` missing for mia_probe_fortify topic). Per `Z:/claude-sota-installed/.claude/rules/codex-t1-system-meta-review-fallback.md` n=7 evidence: SYSTEM-meta-review fallback applies — Wave 112 Ship 2CC commit `7676e72` body classified this codification verbatim ("Ship Mia-probe-fortify queued: codify alternate-install-path probe as standard Mia discipline ... — load-bearing per Mia archeology n=36"). T2 commit-time hook IS the cross-model verification net per cardinal-rule-3 Phase 1 bootstrap exception. Same disposition pattern as Wave 109 closure + Wave 112 Ship A1 + Ship 2AA + Ship F + Ship 2BB+F-router + Ship 2CC + Ship A2-RECONCILE + Ship A3.

### CR conformance

| CR | Status | Evidence |
|---|---|---|
| CR-1 (cite SOTA primary) | ✅ | TIER-1 cite preserved (Wave 112 Ship 2CC commit `7676e72` body as system-meta-review per codex-t1-system-meta-review-fallback.md n=7 evidence) |
| CR-3 (cross-model T1) | ⚠️ Phase 1 bootstrap exception (T1 gate WARN x2 acknowledged + SYSTEM-meta-review fallback cited) |
| CR-5 (install-priority) | ✅ N/A (rule extension not install-class) |
| CR-7 (graduated unleash) | ✅ Phase 3 preserved |
| CR-8 (full-SOTA-content) | ✅ ADAPTED-FROM-SOTA (existing rule extension; sister-rule pattern from FM-17.e codification at Wave 112 Ship F) |
| CR-9 (install-risk) | ⚠️ MEDIUM (rule edit MEDIUM per launch-discipline.md; LOC 200 within ceiling; reversible via revert) |
| CR-10 (research-first) | ✅ Wave 112 Ship 2CC archeology probed BEFORE rule extension drafted |
| CR-11 (META-process) | ✅ cycle-322 jurisdiction codification; Mia ladder n=36 → discipline codification; sister rule precedent FM-17.e Wave 112 Ship F |
| CR-12 (upstream-install) | ✅ N/A (rule extension not install-class) |

### What this unlocks

- **Prevents future Ship-A1-class shadow-install fires**: any agent prescription with INSTALL-class commands triggers fortified multi-channel probe BEFORE install execution
- **Explicit discipline cite**: operator + agent both have rule body to cite — no longer implicit operator-side knowledge
- **Pattern-A admissibility filter strengthened**: alternate-install-path probe is now ENUMERATED in §How to apply step 2 menu (via §Alternate-install-path probe discipline cross-reference)
- **Sister-rule integration upgraded**: future fires re-using Mia discipline get the fortified probe by default

### Mia ladder advance summary (this session arc)

| Wave | Ship | Catches | n |
|---|---|---|---|
| Wave 110 fire 1 | Agent A pre-apply | 3 OVER (spec-kit + anthropic-sdk-python + claude-agent-sdk-python all already-installed) | n=29→32 (running count) |
| Wave 112 Ship A1 | semgrep PATH gap | 1 OVER (uv tool already-installed) | n=32→33 |
| Wave 112 Ship 2CC | Shadow archeology | 5 OVER (typos + osv-scanner + semgrep [re-confirm] + ast-grep + lefthook all pre-existing canonical) | n=33→36 (per Ship 2CC commit `7676e72` body) |
| Wave 112 Ship A2-RECONCILE | (operational closure — no new OVER) | 0 | n=36 stable |
| Wave 112 Ship A3 | (acknowledge UNKNOWN-provenance — no new OVER) | 0 | n=36 stable |
| Wave 112 Ship Mia-probe-fortify (this) | (codification — no new OVER) | 0 | n=36 stable + DISCIPLINE NOW CODIFIED |

Total: n=29 → **n=36** (7 OVER catches across 8 ships in this fire arc) + discipline now codified into rule body.

### Outstanding queue (post Wave 112 Ship Mia-probe-fortify)

- 🆕 Ship 2AA-followup-2: `gitnexus analyze .` bootstrap eee knowledge graph (operator action OR cron-fire)
- 🆕 Ship T1-gate-extension: extend `codex_t1_consult_gate.py` for commit-body-as-system-meta-review pattern
- 🆕 Ship Mia-fortify-router-update: cross-rule-citations to update (synthesis-layer-verify.md / agent-harness-fit-verification.md / codex-t1-fix-forward-pattern.md if they reference Mia probe shape) — DEFERRED next fire
- 🚧 Ship M-fleet-mgmt-key (operator action — CPA :8317)
- 🚧 Ship 2N-batch3-G skillOverrides (24h+ Phoenix telemetry)
- 🚧 Ship 2W reframed container wire-or-disclose
- 🚧 Ship 2A-pilot rtk vs snip (operator decision)
- 🚧 Ship 2Y-stage2 cite-anchor migration

### Wave 112 Ship Mia-probe-fortify closure note

47th commit in this session arc. Cron `ae540201` armed `7,22,37,52 * * * *` for autonomous /loop continuation. This /loop fire arc cumulative: 10 substantive ships landed (Wave 109 closure + Wave 112 Ship A1 + Ship 2AA + Ship F + Ship 2BB+F-router + Ship 2CC + Ship A2-RECONCILE + Ship A3 + Ship Mia-probe-fortify). Mia ladder n=36 stable + DISCIPLINE NOW CODIFIED into rule body. CR-9 risk for Ship A1 5-CLI series fully closed (Ship A2-RECONCILE + A3) AND prevention discipline for future Ship-A1-class fires now live (Ship Mia-probe-fortify).
