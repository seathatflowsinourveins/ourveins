

---

## 2026-05-10 — Wave 144 Fire 1 — astral-sh/uv RECLASSIFY (PLANNED → INSTALLED-VIA-SYSTEM-PATH)

**Trigger**: Wave 139A V2 sota-researcher TOP-5 #2 finding (manifest staleness — uv operationally used in 5+ install commands but row at `docs/sota-installed-manifest.md:434` was status PLANNED). Closes Ship 2 of Wave 143+ priority-ordered roadmap auto-proceed sequence.

**3-voice fan-out** (LOW-risk doc-only RECLASSIFY):

| Voice | Type | Verdict | Conf |
|-------|------|---------|------|
| V1 orchestrator-side Mia probe | Binary verification + alternate-channel probe | INITIAL clean (1-binary) | n/a |
| V2 Path P codex T1 | REAL GPT-5.5 codex CLI v0.130.0 foreground+tee 300s DEFAULT profile | NEEDS-REVISION + 3 prescribed_edits | 0.95 |
| V3 Path P codex T1 review | REAL GPT-5.5 codex CLI (Pattern A revision verification) | APPROVE + ship_readiness=READY + v2_prescriptions_applied=ALL_3 + all CR YES | 0.93 |

**V2 critical catches** (Pattern A integrated):
1. Edit didn't apply initially (Read-before-Edit constraint) → Edit retry succeeded after manifest Read
2. Python311 Scripts/uv.exe shadow (`uv 0.9.13 (7ca92dcf6 2025-11-26)`) that V1's `command -v` probe missed — `Get-Command -All uv` PowerShell enumeration catches what bash `command -v` misses for non-PATH-priority installs
3. Cite-anchor referenced non-existent `reference_w139a_voice2_sota_researcher_2026_05_10.md` standalone file — entry actually lives inline in MEMORY.md L60 area; corrected reference

**Operational state captured in manifest cell**:
- Canonical: `C:/Users/42/.local/bin/uv.exe` v0.10.3 (PATH-resolved standalone CLI install per upstream `https://docs.astral.sh/uv/getting-started/installation/`)
- Secondary: `C:/Users/42/AppData/Local/Programs/Python/Python311/Scripts/uv.exe` v0.9.13 (transitive Python lib install; Required-by: prefect)
- CR-9 alternate-channel probe COMPLETE: BOTH binaries enumerated; canonical wins via PATH ordering; secondary NOT harmful shadow (legitimate Python-lib bundle for prefect package; serves distinct consumer chain)
- cargo/go-bin/npm-global/winget/pipx probed — no additional installs

**Cross-model gate satisfaction**: FULLY SATISFIED via 2× REAL GPT-5.5 (V2 NEEDS-REVISION 0.95 + V3 APPROVE 0.93) per CR-3 Phase 1 Path P bootstrap exception.

**Files modified**:
- `Z:/claude-sota-installed/docs/sota-installed-manifest.md` — Section 10 EXPANSION uv row at L434 RECLASSIFIED PLANNED → INSTALLED-VIA-SYSTEM-PATH (~1 LOC delta but cell content expanded ~5x with both-binaries disclosure + CR-9 probe rationale + cross-model gate cite)
- `Z:/claude-sota-installed/docs/install-provenance.md` — this entry

**Ladder advances**:
- Pattern D candidate: n=15 → n=17 (W144F1 V2 + V3 both Pattern D Path P dispatches; both strict-conform)
- Mia: n=203 → n=204 (V2 catch on Get-Command -All shadow detection that orchestrator command -v probe missed)
- FM-09 codex-rescue blind-spot: 6/6 100% unchanged
- FM-17.f cumulative: n=6 firm unchanged
- FM-20 path-drift cascade: n=11 unchanged

**Cardinal-rules conformance**: CR-1 ✅ + CR-3 ✅ + CR-7 unchanged + CR-8 ✅ + CR-9 ✅ (alternate-channel probe complete + non-harmful shadow classification) + CR-10 ✅ + CR-11 ✅

**Wave 144 Fire 1 SHIPPED CLEAN at this runtime SHA <PENDING — captured at commit>**. Atomic chain held FM-15 (options before `--`) + FM-02 sub-class (b)+(c) defense (`--only -F <msg> -- <pathspec>`).

**Wave 145+ candidates queued** per next-session prompt §3 priority-ordered roadmap:
- Ship 3 Wave 142.B L3 Graphiti live-claude E2E persistence + responses.parse smoke probe (operator-action-gated)
- Ship 4 Wave 145 outer-research kits convergence pass (125 audited repos with SRA D1-D10 + Probe DAG 1-7 lens; MEDIUM-risk discovery)
- Ship 5 Wave 141A.2 safety_guard.py +15-20 NEW Docker deny patterns (HIGH-risk security hardening)
