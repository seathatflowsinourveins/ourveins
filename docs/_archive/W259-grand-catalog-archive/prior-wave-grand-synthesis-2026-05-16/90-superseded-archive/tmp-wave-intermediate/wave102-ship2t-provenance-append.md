

## 2026-05-08 Wave 102 — Ship 2T: REMOVE trufflehog AGPL-3.0 license blocker (Pattern A apply per codex T1 NEEDS-REVISION conf=0.91)

### Origin

Wave 102 architecture audit (agent `a79e40ebcea10934c`; 372s / 20 tools / 382535 tokens) caught 4 REJECT-class license blockers + cite-orphans:
1. mksglu/context-mode (Elastic License 2.0)
2. FalkorDB (SSPLv1)
3. **trufflesecurity/trufflehog (AGPL-3.0)** ← THIS SHIP
4. awesome-agentic-patterns (404 cite-orphan)

Per `agent-harness-fit-verification.md` Probe 6: claude-sota is permissive-license-only (MIT / Apache-2.0 / BSD acceptable; AGPLv3 / GPLv3 / SSPL / proprietary REJECT). AGPL-3.0 infects derivative works AND network-use.

### TIER-1 SOTA cite chain

- **TIER-1 audit verdict**: `tmp/wave102-architecture-audit-2026-05-08.md` REVISE-AUDIT conf=0.88 (per-repo verified via `gh api` GitHub API)
- **TIER-1-DIRECT**: `https://github.com/trufflesecurity/trufflehog` 26,097★ AGPL-3.0 (verified upstream)
- **TIER-2 sister rule**: `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md` Probe 6 license-blocker REJECT class
- **TIER-2 sister precedent**: openviking AGPLv3 REJECT (n=1; n=2 cumulative AGPL-3 REJECT including this Ship 2T)

### Operational fix (gitignored binary; no commit needed for binary itself)

```bash
rm -f Z:/claude-sota-installed/.local/bin/trufflehog.exe  # 162MB AGPL-3.0 binary REMOVED
```

Verified: `ls .local/bin/trufflehog.exe` returns "No such file or directory". gitleaks v8.30.1 (MIT) at `.local/bin/gitleaks.exe` (22MB) remains as same-surface replacement.

### Edits (3 files / +/-/~ doc-only)

1. `.claude/hooks/scripts/secret_scan_guard.py:25-26` (4-line comment update) — replace "trufflehog (parent has these; sss may add them later)" with REMOVED/AGPL-3.0 disclosure forward-only
2. `docs/sota-installed-manifest.md:109` (Section 5 entry) — INSTALLED → REJECTED-WAVE-102-AUDIT-AGPL3 + change install-command cell to "DO NOT INSTALL" + historical command preserved in this provenance entry only
3. `docs/sota-installed-manifest.md:388` (Section 14 PLANNED entry) — PLANNED → REJECTED-WAVE-102-AUDIT-AGPL3 with rationale (preserves audit trail per port-note-discipline §6)

### HISTORICAL INSTALL COMMAND (preserved here per codex T1 prescription #3 — manifest cells must NOT carry live install affordance for rejected tools):

```bash
gh release download v3.95.2 --repo trufflesecurity/trufflehog --pattern '*windows_amd64*'
# (historical Wave 62 fire 6 install command; DO NOT RE-EXECUTE; AGPL-3.0 license blocker)
```

### Cross-model T1 gate (real GPT-5.5 e2e via codex CLI foreground+tee — FULLY UNLEASHED per Ship 2P)

| Round | Verdict | Confidence | Outcome |
|---|---|---|---|
| Round-1 | NEEDS-REVISION | 0.91 | Pattern A apply: 6 prescriptions integrated single-round |

Verdict file: `.claude/state/codex_consult_wave102_ship2t_trufflehog_remove_OUT.txt` (627 lines / 80s / 34,118 tokens).

**6 prescribed_edits applied per `codex-t1-fix-forward-pattern.md` Pattern A**:
1. ✅ APPEND this docs/install-provenance.md Wave 102 Ship 2T entry BEFORE commit (Pattern A prescription #1)
2. ✅ KEEP manifest L388 as REJECTED rather than deleting (preserves audit trail)
3. ✅ CHANGE manifest L109 install-command cell to "DO NOT INSTALL" with historical command in provenance only
4. ✅ secret_scan_guard.py wording: trufflehog appears ONLY as REMOVED/AGPL disclosure, not paired-tool
5. ✅ CR-9 install-risk LOW confirmed (gitignored never-invoked binary removal + comment/manifest edits = ZERO functional regression)
6. ✅ KEEP Probe 6 install-pipeline gate codification as SEPARATE ship (queued as Ship 2X); mention only as successor discipline here

### REPLACEMENT ALREADY-INSTALLED

- gitleaks v8.30.1 (MIT) at `.local/bin/gitleaks.exe` (22MB)
- Covers same secret-scan surface as trufflehog
- Wired in PreToolUse Bash hook per Wave 97 Ship 1B+1C+1D
- ZERO functional regression from trufflehog removal (was NOT actively invoked — only cited in `secret_scan_guard.py:26` comment as paired-licensed-sister-tool; updated this fire to REMOVED disclosure)

### Mia probe evidence

- `grep -rnE 'trufflehog' tools/ scripts/ .claude/hooks/ .claude/settings.json` returned ONLY `secret_scan_guard.py:26` (comment, not invocation)
- gitleaks v8.30.1 verified active: `.local/bin/gitleaks.exe version` returned `8.30.1`
- trufflehog binary file deleted: `ls .local/bin/trufflehog.exe` returns "No such file or directory"

### CR-9 install-risk LOW

- Gitignored binary removal (operational fix; no commit affects binary state)
- Comment + manifest doc-only edits (reversible via git revert)
- Reversible: `gh release download v3.95.2 --repo trufflesecurity/trufflehog --pattern '*windows_amd64*'` (HISTORICAL — DO NOT RE-EXECUTE per AGPL-3.0 license blocker)
- ZERO functional regression (was NOT actively invoked anywhere)

### Forward discipline (Wave 102 audit lesson n=1 NEW; codification queued as separate Ship 2X)

**Install pipeline must apply Probe 6 license-gate AT install time.** n=3 same-arc license-blocker installations caught by Wave 102 audit:
- mksglu/context-mode (Elastic License 2.0)
- FalkorDB (SSPLv1)
- trufflesecurity/trufflehog (AGPL-3.0)

Means systematic discipline gap. Per cycle-322 jurisdiction n≥3 self-observed promotion bar EXCEEDED. Codification candidate: promote Probe 6 application to mechanical pre-install hook (NEW Ship 2X — separate from Ship 2T per cycle-300 ONE-LOGICAL-UNIT-PER-FIRE).

### Wave 102 — 21st ship in this session arc

| Wave | Commit | Ship |
|---|---|---|
| 101-2Q | `5cc1633` | cwc commit-on-stop throttle wrapper |
| 101-2Q-prov | `7f64461` | Ship 2Q provenance |
| (Wave 102 architecture audit Sonnet stand-in fan-out) | n/a | full-architecture audit verdict |
| **102-2T** | **THIS** | **REMOVE trufflehog AGPL-3.0 license blocker (Pattern A apply)** |

### CR COMPLIANCE

- **CR-1**: TIER-1 audit verdict + sister-rule cites
- **CR-3**: real GPT-5.5 codex T1 e2e BEFORE commit (NEEDS-REVISION 0.91 + 6-prescription Pattern A apply)
- **CR-5**: install-priority — replacement gitleaks ALREADY-INSTALLED
- **CR-6**: official-native-channel preserved (gitleaks via gh release; trufflehog REMOVED — never re-install per Probe 6)
- **CR-7**: Phase 1 — operational fix; doesn't change permission scope
- **CR-8**: ADAPTED-FROM-SOTA — Probe 6 license-discipline lattice
- **CR-9**: install-risk LOW (gitignored never-invoked binary removal + comment/manifest edits)
- **CR-10**: research-first — Mia probe confirmed zero functional invocation
- **CR-11**: META-process SOTA — audit → REJECT-class identification → Pattern A apply → atomic commit
- **CR-12**: SATISFIED — gitleaks (MIT) is upstream-direct replacement; ZERO sibling cite-import

### Outstanding queue (Wave 102 follow-on ships)

- **Ship 2U**: REMOVE/DISABLE mksglu/context-mode plugin (Elastic License 2.0 license blocker)
- **Ship 2V**: FalkorDB → KuzuDB migration (SSPLv1 license blocker; graphiti backend swap; operator-decision class)
- **Ship 2W**: fix awesome-agentic-patterns dangling cite trail in rules (404 cite-orphan)
- **Ship 2X**: codify Probe 6 license-gate as mechanical pre-install hook (n=3 self-observed promotion candidate)
- **Ship 2Y**: re-pin stale local HEADs (CCBP 6 days behind + codex 17 days behind)
- **Ship 2Z**: forrestchang/andrej-karpathy-skills NO-LICENSE authority-chain risk resolution (verify Karpathy endorsement OR retire cite to verbatim source URL)

### Update triggers

Re-evaluate this ship when:
- A 4th license-blocker install lands (n=4 promotes Ship 2X to absolute necessity)
- gitleaks coverage gap surfaces (would re-evaluate trufflehog replacement)
- Anthropic CC ships native secret-scan primitive that obviates both gitleaks and trufflehog
