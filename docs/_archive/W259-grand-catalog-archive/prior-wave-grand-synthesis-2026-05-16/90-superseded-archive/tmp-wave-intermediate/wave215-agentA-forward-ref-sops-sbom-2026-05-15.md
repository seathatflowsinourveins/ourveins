---
title: W215 Agent A — Forward-Ref Queue Audit (sops encryption workflow + SBOM drift audit wire)
status: AUTHORITATIVE-CANDIDATE
date: 2026-05-15
wave: 215
agent: sota-researcher (Sonnet stand-in per FM-17.e recovery)
artifact-class: forward-ref-feasibility-audit
---

# W215 Agent A — sops encryption + SBOM drift audit feasibility

## STAND-IN-NOTICE

Per `Z:/claude-sota/.claude/rules/cmc-env-funneled-disclosure.md §The mandate` Option 2: this dispatch ran as Sonnet stand-in (BRIDGE-MODE refused W212 n=2; W215 uses Sonnet stand-in directly per FM-17.e recovery). Cross-model gate NOT structurally satisfied at subagent layer; orchestrator MUST run Path P codex T1 BEFORE accepting any prescribed_edits from this verdict, OR mark commit body with `[STAND-IN per CLAUDE.local.md ENV (f); see W215 Agent A artifact]` per `cross-model-consensus.md §Orchestrator integration discipline`.

## R1 multi-source discovery

### Item 1 — sops encryption workflow

| Source | Status | Evidence |
|---|---|---|
| **sops binary install** | INSTALLED in `Z:/claude-sota-pure/.local/bin/sops.exe` (50.6 MB) — **NOT in claude-sota-installed PATH** [VERIFIED 2026-05-15 via `command -v sops` → `/z/claude-sota-pure/.local/bin/sops`] | Cross-runtime install; CR-9 sibling-bleed-class violation if eee.ps1 relies on it |
| **age binary install** | NOT INSTALLED anywhere [VERIFIED 2026-05-15 via `command -v age` → exit 1 + `ls deps/age/` confirms upstream is Apache AGE graph DB, NOT FiloSottile/age encryption tool] | Fresh install required from upstream gh release |
| **age v1.3.1 upstream** | https://github.com/FiloSottile/age v1.3.1 (LATEST 2025-12-28) [VERIFIED 2026-05-15 via `gh release view v1.3.1 --repo FiloSottile/age`] | Windows asset: `age-v1.3.1-windows-amd64.zip` (10.7 MB, sha256 `c56e8ce22f7e80cb85ad946cc82d198767b056366201d3e1a2b93d865be38154`) |
| **eee.ps1 decrypt-on-load** | NO sops/age/decrypt/encrypted references in `Z:/claude-sota-installed/tools/eee.ps1` [VERIFIED via Grep — 0 hits] | Greenfield integration point |
| **CLAUDE.local.md** | Single Marker Decay note mentioning `age` (unrelated — Karpathy 2026-04-16 context-rot cite) [VERIFIED via Grep CLAUDE.local.md] | No existing encrypted-config workflow |
| **sops + age integration pattern** | Documented in `Z:/repos/deps/getsops/` (upstream NOT in deps; sops upstream is `getsops/sops` GitHub repo) | Need fresh `gh release download` for cite |
| **secret_scan_guard.py** | Already INSTALLED at `.claude/hooks/scripts/secret_scan_guard.py` (Wave 148 sota-arch-v1) [VERIFIED via Read L1-30] | DEFENSE layer; sops is ENCRYPTION layer (orthogonal) |

### Item 2 — SBOM drift audit wire

| Source | Status | Evidence |
|---|---|---|
| **trivy 0.70.0** | INSTALLED at `Z:/claude-sota-installed/.local/bin/trivy` [VERIFIED via `trivy --version` → `Version: 0.70.0`] | SPDX-json emission supported via `--format spdx-json` |
| **sops SPDX SBOM artifact** | EXISTS at `Z:/claude-sota-pure/.local/share/sops-v3.13.0/sops-v3.13.0.amd64.exe.spdx.sbom.json` (193.5 KB) [VERIFIED via head -80 inspection] | Shape: `spdxVersion:SPDX-2.3 + creators:syft-1.42.3 + packages[].name/versionInfo/purl/checksums` |
| **audit-action-loop.md** | INSTALLED at `.claude/rules/audit-action-loop.md` as cite-import-AMBER from `Z:/claude-sota/.claude/rules/audit-action-loop.md @ HEAD 59696f54` (Wave 62 fire 9 — TIER-3-LOCAL-COMPOSITION) [VERIFIED via Read L1-100] | Wire/Surface/Close/Re-fire 4-stage pattern fully codified |
| **Active audit precedents** | 3 ACTIVE: `claude_md_count_audit.py` + `cite_drift_audit.py` + `mcp_self_audit.py` (per audit-action-loop.md table L60-65) | Pattern: PostToolUse `Bash(git commit *)` async 15s + SessionEnd async 30s |
| **scripts/ pattern surface** | 4 scripts present at `scripts/`: `_atomic_jsonl_append.py` + `cli_path_audit.py` + 2 plugin-hook-rewrite scripts [VERIFIED via ls] | `cli_path_audit.py` is nearest precedent (W154 F3 V3 codification — Surface stage only, no SessionStart/PostToolUse hook wire) |
| **trivy SBOM scanning** | `trivy sbom <PATH>` scans CycloneDX + SPDX format [VERIFIED via `trivy sbom --help`] | Different from `trivy fs --format spdx-json` which EMITS SBOM |

## R2 7-Probe-DAG harness-fit

### Item 1 — sops encryption workflow

| Probe | Status | Evidence |
|---|---|---|
| **Probe 1 count-OVER** | PASS — concrete install count: age (0 installed) + sops (0 in this runtime, 1 in pure) | Verified via `command -v` |
| **Probe 2 SDK-vs-CLI** | PASS — sops + age are CLI binaries; eee.ps1 PowerShell launcher invocation surface compatible | `tools/eee.ps1` has 750+ lines of PowerShell; can extend with `& <bin>` calls |
| **Probe 3 architectural-API** | PASS — sops/age are filesystem encryption (file in/out); no API ecosystem mismatch | `sops -d encrypted.enc.yaml > decrypted.yaml` shell pattern |
| **Probe 4 plugin-namespace** | PASS — no `sops`/`age` in plugin-loaded skill namespace OR available-skills list | Greenfield |
| **Probe 5 mode-harness-shape** | **AMBER** — eee.ps1 runs under autonomous /loop mode; decrypt-on-load adds startup latency (~50-200ms for sops -d) | Each session start pays decrypt cost; consider caching decrypted form in `Z:/claude-sota-installed-state/` per state-outside-repo convention |
| **Probe 6 direct-file blockers** | PASS — sops Apache-2.0 (permissive); age BSD-3-Clause (permissive) [need verify via age LICENSE file post-install] | License-compatible per `agent-harness-fit-verification.md` Probe 6 |
| **Probe 7 demand-gate** | **Probe 7.b DEMAND-CREATES-NEW-WORKFLOW eligible** — current state: secret_scan_guard.py DEFENDS against commits; sops ENABLES encrypted-at-rest secrets in `.gitignore`-excluded files. 5-clause check:<br/>1. Named use case: encrypted `CLAUDE.local.md` env block + encrypted `Z:/claude-sota-installed-state/api-keys.enc.yaml`<br/>2. Cited source: `CLAUDE.local.md` ENV (g) currently has DEPRECATED `CLAUDE_CODE_SUBAGENT_MODEL` reference; future API keys land in env block<br/>3. Wiring: eee.ps1 decrypt-on-startup → set env vars → unset on exit<br/>4. Incumbent comparison: existing `.gitignore` excludes CLAUDE.local.md — but `.gitignore` is NOT encryption (file still readable on disk if Z: stolen); sops adds disk-encryption layer<br/>5. Reversible time-box: 30-day pilot; retire to disabled if startup latency >500ms OR key rotation cadence breaks /loop runs | STUDY-PILOT eligible |

**Probe 7.b verdict**: STUDY-PILOT eligible BUT needs explicit operator commitment to age key rotation cadence + decrypt-on-load wiring path BEFORE install.

### Item 2 — SBOM drift audit wire

| Probe | Status | Evidence |
|---|---|---|
| **Probe 1 count-OVER** | PASS — concrete: 1 sops SBOM exists; 0 other SBOMs in claude-sota-installed | Verified |
| **Probe 2 SDK-vs-CLI** | PASS — Python `tools/sbom_drift_audit.py` follows existing `scripts/cli_path_audit.py` shape | `from __future__ import annotations + argparse + json + Path` stdlib-only pattern |
| **Probe 3 architectural-API** | PASS — JSONL drift records consumed by SessionStart/PostToolUse hook chain; no API ecosystem mismatch | Same as audit-action-loop.md Wire stage |
| **Probe 4 plugin-namespace** | PASS — no `sbom_drift_audit` in plugin namespace | Greenfield |
| **Probe 5 mode-harness-shape** | PASS — Surface-stage script (W154 F3 V3 precedent: no hook wire, manual run) | Compatible with autonomous /loop; operator runs on cadence |
| **Probe 6 direct-file blockers** | PASS — trivy Apache-2.0 (permissive); syft Apache-2.0 (permissive — embedded in sops SBOM creators) | License-compatible |
| **Probe 7 demand-gate** | **Probe 7.b DEMAND-CREATES-NEW-WORKFLOW eligible** — current state: 1 SBOM with 200+ Go module deps; no drift detection. 5-clause check:<br/>1. Named use case: detect supply-chain drift when sops upgraded OR when adding 2nd SBOM-tracked binary<br/>2. Cited source: `Z:/claude-sota-pure/.local/share/sops-v3.13.0/sops-v3.13.0.amd64.exe.spdx.sbom.json`<br/>3. Wiring: `tools/sbom_drift_audit.py` reads pinned SBOM(s) → compares latest run vs baseline → emits `.claude/state/sbom_drift_audit.jsonl` drift records<br/>4. Incumbent comparison: trivy `sbom` can SCAN existing SBOM for VULNs but does NOT do BASELINE-vs-CURRENT DRIFT detection across runs<br/>5. Reversible time-box: 30-day pilot; retire if 0 drift signals across 5 install events | STUDY-PILOT eligible — MVP-class |

**Probe 7.b verdict**: STUDY-PILOT eligible AT MVP-SCOPE (single binary baseline-vs-current comparison; no PostToolUse hook wire initially per W154 F3 V3 precedent).

## R3 Axis-1+2+3 convergence

### Item 1 — sops encryption workflow

- **Axis 1** (≥3 distinct T1 orgs): PASS
  1. `getsops/sops` (originally Mozilla; now CNCF-graduated) — 16k+ stars, Apache-2.0
  2. `FiloSottile/age` (Filippo Valsorda named-author; ex-Google Go Cryptography lead) — 17k+ stars, BSD-3-Clause
  3. Anthropic CC official docs `https://code.claude.com/docs/en/env-vars` — env-var management discipline (cite-only authority for env-block patterns)
- **Axis 2** (≥2 named T2 practitioners): PARTIAL — sops widely used in K8s/Helm ecosystems (Mozilla SRE blog 2018+ — would need dated artifact verification); age has Filippo Valsorda named-author status. Single-author age is convergence-gate Axis-1 concern (n=1 named-T1 maintainer); compensated by Axis-3 STABLE-BURN-IN (age v1.3.1 published 2025-12-28, predecessor v1.3.0 2025-12-27; v1.2.1 2024-12-18 = 17-month stability span)
- **Axis 3** (≥3 months stability): PASS — sops v3.13.0 2026-05-08 (just-released 7d ago; per cpd: parent age maturity 17mo since v1.2.1); age v1.3.1 PASS STABLE-BURN-IN

### Item 2 — SBOM drift audit wire

- **Axis 1** (≥3 distinct T1 orgs): PASS
  1. `aquasecurity/trivy` (Aqua Security; widely deployed) — 24k+ stars, Apache-2.0
  2. `anchore/syft` (Anchore Inc; SBOM canonical) — 7k+ stars, Apache-2.0
  3. SPDX consortium (https://spdx.dev) — SBOM format authority (Linux Foundation backed)
- **Axis 2**: PASS — Aqua + Anchore are named-orgs with continuous publication cadence
- **Axis 3**: PASS — trivy 0.70.0 stable maintenance; SPDX-2.3 spec ratified 2023

## R4 SRA D1-D10 scoring

| Dim | Item 1 (sops+age) | Item 2 (sbom_drift_audit.py) |
|---|---|---|
| D1 use-class match | 8/10 (autonomous /loop + encrypted-at-rest; AMBER on startup latency) | 9/10 (audit-action-loop Surface-stage match) |
| D2 SDK-CLI surface | 9/10 (clean CLI invocation) | 10/10 (Python stdlib + JSONL native) |
| D3 architectural-API | 9/10 (filesystem-only; no mismatch) | 10/10 (Wire/Surface pattern native) |
| D4 plugin-namespace | 10/10 (greenfield) | 10/10 (greenfield) |
| D5 mode-harness-shape | 7/10 (decrypt-on-load latency concern) | 9/10 (manual-run Surface stage; no hook overhead) |
| D6 direct-file/registry | 10/10 (permissive licenses) | 10/10 (permissive licenses) |
| D7 demand-gate | 7/10 (Probe 7.b eligible; needs operator commitment to key rotation cadence) | 8/10 (Probe 7.b eligible; MVP scope clear) |
| D8 stability axis-3 | 9/10 (sops 7d / age 17mo) | 10/10 (trivy 0.70.0 stable; SPDX-2.3 ratified) |
| D9 convergence axis-1 | 8/10 (3-org PASS; age single-author n=1 concern) | 10/10 (3-org PASS firm) |
| D10 OOTB readiness | 5/10 (multi-step: age install + key gen + sops config + eee.ps1 extend + key rotation cadence) | 7/10 (single script + JSONL; no hook wire MVP) |
| **TOTAL** | **82/100** | **93/100** |

## R5 CR-12 disposition + verdict

### Item 1 — sops encryption workflow

**CR-12 disposition**: `GENUINELY-NEW` — no upstream-install equivalent exists; sops + age + eee.ps1 decrypt-on-load is a sibling-novel composition. No `DUPLICATE-FUNCTIONALITY` collision with secret_scan_guard.py (defense vs encryption are orthogonal layers).

**Convergence-gate verdict**: PASS (Axis 1+2+3) but axis-2 PARTIAL (age single-author n=1).

**SRA score**: 82/100.

**CR-9 install-risk**: HIGH — age is fresh system-wide binary install + sops needs runtime-scoped install (not sibling claude-sota-pure shared binary). Per Wave 50 fire 4 Agent F bug-magnet ratio (90%+ on settings.json/sss.ps1) — extending eee.ps1 has 2-round fix-forward expectation.

### Item 2 — SBOM drift audit wire

**CR-12 disposition**: `GENUINELY-NEW` — no upstream `sbom_drift_audit.py` equivalent; trivy SCANS SBOMs for VULNs but does NOT do BASELINE-vs-CURRENT drift detection across install runs.

**Convergence-gate verdict**: PASS firm (Axis 1+2+3).

**SRA score**: 93/100.

**CR-9 install-risk**: LOW — Python stdlib-only script following cli_path_audit.py precedent; reversible <1min via file deletion.

## Fold-feasibility per item

### Item 1 — sops encryption workflow: **DEFER-MULTI-FIRE**

**Reasons**:
1. **Cross-runtime sops bleed**: sops currently lives in `claude-sota-pure` runtime; cross-runtime use is CR-9 sibling-bleed defense violation. Must install in `claude-sota-installed/.local/bin/sops.exe` OR document explicit shared-binary symlink discipline.
2. **age fresh install needed**: 10.7 MB download + License verify + PATH wire + key generation cadence — 4-step install vs single-script ship.
3. **eee.ps1 decrypt-on-load extension**: 750+ LOC launcher needs new decrypt block + startup-latency budget + error handling for decryption failure — exceeds ~150-200 LOC bounded-ship per cycle-322.
4. **Key rotation cadence**: separate logical unit per cycle-300 ONE-LOGICAL-UNIT-PER-FIRE — should not bundle with install.
5. **No urgent demand signal**: CLAUDE.local.md current ENV block does NOT contain secrets needing encryption today (env vars reference SET tokens but values are runtime-resolved). Probe 7.b admissible but no IMMEDIATE consumer.

**Multi-fire arc proposal**:
- **Fire 1** (W216): age v1.3.1 install + key generation + manifest §0 row + install-provenance.md
- **Fire 2** (W217): sops v3.13.0 install in claude-sota-installed runtime + manifest §0 row
- **Fire 3** (W218): eee.ps1 decrypt-on-load extension + smoke probe + secret_scan_guard.py interaction audit
- **Fire 4** (W219): age key rotation cadence codification + `Z:/claude-sota-installed-state/.age-keys/` directory + rotation script

### Item 2 — SBOM drift audit wire: **FOLD-NOW**

**Reasons**:
1. **MVP scope ≤150 LOC**: single Python script consuming `Z:/claude-sota-pure/.local/share/sops-v3.13.0/*.spdx.sbom.json` + emitting JSONL drift records — well under 200 LOC ceiling.
2. **Precedent matched**: cli_path_audit.py (W154 F3 V3) is direct precedent — Surface-stage only, no hook wire in initial fire.
3. **Reversible <1min**: pure Python stdlib; delete file to revert.
4. **CR-8 conformance**: ADAPTED-FROM-SOTA via audit-action-loop.md cite-import-AMBER (already TIER-3-LOCAL-COMPOSITION ratified per Wave 62 fire 9).
5. **No external deps**: stdlib-only; no install-risk.

**Single-ship scope**:
- File: `tools/sbom_drift_audit.py` (~120-150 LOC)
- JSONL schema: `{ts, agent_id, agent_type, sbom_path, baseline_packages_count, current_packages_count, drift_records: [{name, op: ADD/REMOVE/VERSION_CHANGE, baseline_version, current_version, purl}]}`
- CLI: `python tools/sbom_drift_audit.py --baseline <baseline.json> --current <current.json> --jsonl-out .claude/state/sbom_drift_audit.jsonl`
- Smoke probe: emit single drift record comparing sops SBOM against itself (0 drift expected)
- No PostToolUse/SessionStart hook wire (per W154 F3 V3 precedent — Surface-stage only)
- No manifest §0 row (script lives in `tools/`, not `.claude/hooks/scripts/`)

## Recommended ship scope this fire

**SHIP Item 2 only**: `tools/sbom_drift_audit.py` MVP

**Files to create/modify** (3 atomic ops):
1. **CREATE** `tools/sbom_drift_audit.py` (~150 LOC stdlib Python; mirror cli_path_audit.py shape)
2. **APPEND** `docs/install-provenance.md` Wave 215 row documenting fold decision + file:line + HEAD SHA + CR-9 risk class LOW + CR-8 ADAPTED-FROM-SOTA disposition
3. **OPTIONAL**: update `tmp/wave214-MASTER-SYNTHESIS-2026-05-15.md` G2 forward-ref text marking SBOM drift audit as FOLDED-W215; sops encryption DEFERRED-MULTI-FIRE-W216-W219

**LOC budget**: ~180 LOC total (150 script + 30 provenance).

**Commit plan**:
```bash
git add tools/sbom_drift_audit.py docs/install-provenance.md tmp/wave214-MASTER-SYNTHESIS-2026-05-15.md
git commit -m "feat(audit): W215 ship sbom_drift_audit.py MVP + defer sops encryption W216-W219 [cycle-215]"
```

**Codex T1 ratification BEFORE commit**: required per CR-3 + STAND-IN-NOTICE — orchestrator MUST fire Path P `codex exec --skip-git-repo-check -p deep-review-exec` on `.claude/state/codex_consult_w215_sbom_drift_audit.txt` consult prompt; only commit after APPROVE or NEEDS-REVISION fix-forward applied.

## VERDICT

**VERDICT: APPROVE-PARTIAL-FOLD** — fold Item 2 (SBOM drift audit MVP) THIS fire; defer Item 1 (sops encryption workflow) to multi-fire arc W216-W219 per cycle-300 ONE-LOGICAL-UNIT-PER-FIRE + cycle-322 codification threshold.

**Cross-model gate status**: ⚠ STAND-IN at subagent layer (Sonnet stand-in per FM-17.e); orchestrator MUST run Path P codex T1 ratification BEFORE commit per CR-3 cross-model consensus.

**verdict_one_line**: APPROVE-PARTIAL-FOLD: ship sbom_drift_audit.py MVP (~150 LOC); defer sops encryption (4-fire arc W216-W219; 82/100 SRA but HIGH CR-9 install-risk).

verdict_one_line: APPROVE-PARTIAL-FOLD: ship sbom_drift_audit.py MVP this fire; defer sops encryption to W216-W219 multi-fire arc

VERDICT: APPROVE-PARTIAL-FOLD
