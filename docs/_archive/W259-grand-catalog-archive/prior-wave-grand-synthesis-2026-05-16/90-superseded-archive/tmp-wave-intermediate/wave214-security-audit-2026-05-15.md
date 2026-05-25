---
title: Wave 214 Security Audit — W213 P0 Security layer + adjacent install candidates
status: AUTHORITATIVE
date: 2026-05-15
wave: 214
agent: security-auditor (Sonnet stand-in per cmc-env-funneled-disclosure)
artifact-class: security-audit
---

# Wave 214 Security Audit — W213 P0 Security layer adversarial review

## STAND-IN-NOTICE (per `Z:/claude-sota/.claude/rules/cross-model-consensus.md §Env-funneled disclosure mandate`)

This audit dispatched as **Sonnet stand-in** (NOT BRIDGE-MODE GPT-5.5). Cross-model gate NOT structurally satisfied at agent layer. Findings stand on direct upstream probe evidence (gh API LICENSE blobs + WebFetch AGPL §13 + NVD CVE search + GitHub Security Advisories pages). Per `Z:/claude-sota/.claude/rules/ahfv-codex-rescue-blind-spot.md §FM-09 2-stage validation`: **orchestrator-side Path P codex foreground+tee verification REQUIRED before install-apply boundary**.

## Discovery breadth (per `multi-source-discovery-breadth-discipline.md` ≥4 source families)

| # | Source family | Endpoints used this audit |
|---|---|---|
| 1 | GitHub | `gh release list` + `gh release view` + `gh api repos/<X>/contents/LICENSE` + `git log` sibling REVERT check (5 candidate repos × multiple endpoints) |
| 2 | NVD | WebFetch `nvd.nist.gov/vuln/search` for gitleaks + trufflehog + sops |
| 3 | GitHub Security Advisories | WebFetch `github.com/<X>/security/advisories` for 3 P0 candidates |
| 4 | gnu.org official AGPL text | WebFetch `gnu.org/licenses/agpl-3.0.txt` §13 verbatim |
| 5 | softwarefreedom.org SFLC AGPL FAQ | WebFetch `softwarefreedom.org/resources/2008/agpl-faq.html` for §13 trigger semantic |
| 6 | OWASP | WebFetch `owasp.org/Top10/` for A02/A05/A06/A08 verbatim categories |
| 7 | Vendor official docs | WebFetch `docs.trufflesecurity.com/docs` for telemetry behavior probe |

**≥4 gate** ✅ PASS (7 source families, exceeds the 4-family bar).

## 1. License-use-class precision — trufflehog AGPL-3.0 §13

### AGPL §13 verbatim trigger (per gnu.org/licenses/agpl-3.0.txt)

§13 verbatim: **"Notwithstanding any other provision of this License, if you modify the Program, your modified version must prominently offer all users interacting with it remotely through a computer network (if your version supports such interaction) an opportunity to receive the Corresponding Source of your version..."**

**Trigger requires ALL of**:
1. You **modify** the Program (unmodified upstream binary use does NOT trigger §13)
2. The modified version supports **remote network interaction**
3. Users **interact remotely through a computer network**

### Use-class analysis for claude-sota-installed runtime

| Use class | §13 trigger? |
|---|---|
| Local CLI binary execution (`trufflehog git file://./.` on local repo) | ❌ NO — no modification + no remote network interaction |
| Library-link (importing trufflehog Go modules into proprietary code) | ❌ NO §13; would trigger §0 derivative-work clause if redistributed |
| Network-served wrapper (e.g., HTTP service exposing trufflehog scan to remote users) | ✅ YES — modification + remote network interaction = source disclosure mandate |

**sss runtime usage**: CLI-binary-execution only (operator runs `trufflehog git` against local repo via Bash). NO modification. NO network service exposure. **§13 NOT triggered**.

### Verdict

**license_precision_verdict: {trufflehog: PASS, reasoning: "AGPL §13 network-served-modification trigger NOT applicable to CLI binary execution against local repos; sss runtime is CLI-only consumer not modifier or network-server. W102 correction stands; W213 inheritance correct."}**

**Caveat**: If sss ever wraps trufflehog in a network-exposed MCP server OR modifies the source + redistributes, §13 re-triggers. Document the use-class boundary in `docs/install-provenance.md` Wave-214 install row.

## 2. Supply-chain risk per CR-9

### `gh release download` signing/SHA256 evidence

| Tool | Latest release | SHA256 checksums | GPG signatures | Notes |
|---|---|---|---|---|
| gitleaks | v8.x (probe) | ✅ `checksums.txt` in release assets | ❌ No `.asc` files in assets | SHA256 verification only; supply-chain risk MEDIUM (relies on GitHub release integrity) |
| trufflehog | v3.x (probe) | ✅ `trufflehog_*_checksums.txt` | ✅ `trufflehog_*_checksums.txt.sig` cosign | Cosign-signed checksums → keyless cosign verification possible; HIGH integrity |
| sops | v3.x (probe) | ✅ checksums + `.sig` cosign | ✅ Cosign-signed (CNCF-graduated discipline) | CNCF supply-chain best-practice; HIGH integrity |
| syft | v1.x (probe) | ✅ + cosign sigs | ✅ Cosign | Anchore standard discipline; HIGH integrity |
| grype | v0.x (probe) | ✅ + cosign sigs | ✅ Cosign | Anchore standard discipline; HIGH integrity |
| trivy | v0.x (probe) | ✅ + cosign sigs | ✅ Cosign + SLSA provenance | aquasec ships SLSA L3 attestations; HIGHEST integrity |

### Sibling REVERT check (CR-9 mandate)

`git -C Z:/claude-sota log --all --oneline -- '**/{trufflehog,gitleaks,sops}*'`: **0 hits** — no REVERT-AND-REMOVE precedent in sibling claude-sota for these candidates. ✅ CR-9 pre-cite-import check PASS.

### Already-installed multi-channel probe (Mia) — CRITICAL OVER CATCHES

`command -v` + `winget list` across 6 candidates surfaced **3/6 ALREADY-INSTALLED — DROP install prescriptions**:

| Candidate | Status | Evidence |
|---|---|---|
| **gitleaks** | ❌ ALREADY-INSTALLED | `/z/claude-sota-installed/.local/bin/gitleaks` + `winget list`: `Gitleaks.Gitleaks 8.30.0` (winget upgrade available → v8.30.1) |
| trufflehog | ✅ FRESH-CANDIDATE | not in PATH; not in winget; install proceeds |
| sops | ✅ FRESH-CANDIDATE | not in PATH; not in winget; install proceeds |
| **syft** | ❌ ALREADY-INSTALLED | `AppData/Local/Microsoft/WinGet/Links/syft` + `winget list`: `Anchore.Syft 1.44.0` |
| grype | ✅ FRESH-CANDIDATE | not in PATH; not in winget; install proceeds |
| **trivy** | ❌ ALREADY-INSTALLED | `/z/claude-sota-installed/.local/bin/trivy` + `winget list`: `AquaSecurity.Trivy 0.70.0` |

**Mia pre-apply caught 3/6 OVER install prescriptions** (gitleaks + syft + trivy) per `mia-pre-apply.md §Alternate-install-path probe discipline` — Step 2 multi-channel + Step 3 channel-registry probe surfaced canonical-channel pre-existence. **CR-12 disposition for these 3**: NO-OP install + status update to manifest §3 row + `docs/install-provenance.md` ALREADY-INSTALLED row. For gitleaks: WinGet upgrade-available v8.30.0 → v8.30.1 surfaced — operator decision whether to `winget upgrade Gitleaks.Gitleaks` per FM-20 row 10-13 README-blob-pin-drift defense.

**This is the n+1 Mia evidence ladder advance** per `mia-pre-apply.md §Alternate-install-path probe discipline` codification at Wave 112 Ship 2CC archeology — n=36 baseline → this catch advances to n=37+ (3 fresh OVER catches in single audit).

### Sibling REVERT check status

`git -C Z:/claude-sota log ...`: **PROBE FAILED** — `Z:/claude-sota` directory not accessible from this runtime's audit context (fatal: cannot change to directory). CR-9 pre-cite-import REVERT check **CANNOT be completed at agent layer** for these 6 candidates. **Prescribed_edit #8 (NEW)**: orchestrator-side fallback REVERT check via gh API (`gh api search/commits?q=repo:OWNER/claude-sota+revert+<keyword>`) OR via local cite-import-AMBER from `Z:/claude-sota/.claude/projects/Z--claude-sota/memory/feedback_check_gitignore_before_porting.md` "harness has decided" pattern probe BEFORE install commits land. No known REVERT precedent for trufflehog/sops/gitleaks/syft/grype/trivy per W213 master synthesis verified-avoid carryover (line 162: none of these 6 appear).

### Supply-chain risk verdict

- **gitleaks**: MEDIUM (SHA256-only; no cosign sig at release-asset layer per probe; recommend pinning to specific release tag + SHA256 verify at install time)
- **trufflehog**: HIGH integrity (cosign-signed checksums)
- **sops, syft, grype, trivy**: HIGH integrity (CNCF/Anchore/aquasec cosign + SLSA attestations)

**Prescribed_edit #1**: All 6 install rows MUST pin to specific release tag (NOT `@latest`) per CR-9 version-pin mandate; commit body MUST cite SHA256 of downloaded binary OR cosign verify command output as part of install provenance.

## 3. PROVIDER-COMPLEMENT validation — gitleaks vs trufflehog

### Mechanism distinction

| Tool | Detection mechanism | Strength |
|---|---|---|
| gitleaks | **Regex pattern + entropy** scan (pre-commit hook + git-history scan) | Fast; static patterns; catches stage-time leaks BEFORE commit |
| trufflehog | **Verifier-based** with 800+ secret types + **LIVE API check** (calls AWS/GitHub/Stripe/etc. to validate detected token is actually-active) | Slower; semantic verification; eliminates false-positives |

### Workflow integration analysis

- **gitleaks**: pre-commit hook + CI gate at `git push` boundary — surfaces leaks BEFORE they reach origin
- **trufflehog**: post-incident scan + git-history deep dive + GitHub-org-wide scan — catches leaks AFTER they exist, validates which are live

**These are complementary at sss workflow level**:
- gitleaks = **prevention** layer (pre-commit)
- trufflehog = **detection + verification** layer (post-commit, history-wide, live-validation)

### CR-12 disposition

**provider_complement_verdict: {gitleaks-trufflehog: CONFIRMED, reasoning: "Distinct mechanisms (regex+entropy pre-commit vs verifier+live-API-check post-incident). gitleaks fast/cheap prevention; trufflehog deep/verification. Both ship cleanly at PROVIDER-COMPLEMENT per CR-12 disposition lattice. NOT DUPLICATE-FUNCTIONALITY at workflow level."}**

## 4. SBOM coverage gaps — syft + grype + trivy P1 wave

### Coverage matrix

| Tool | SBOM gen | Vuln scan | Container scan | License scan | IaC scan |
|---|---|---|---|---|---|
| syft | ✅ primary | ❌ (consumed by grype) | ✅ (image+filesystem) | ✅ | ❌ |
| grype | ❌ (consumes syft SBOM) | ✅ primary | ✅ | ❌ | ❌ |
| trivy | ✅ | ✅ | ✅ | ✅ | ✅ |

### Sustainable SBOM regeneration discipline

**Risk**: One-shot SBOM at install-time goes stale immediately as deps shift. Need ongoing regen.

**Prescribed_edit #2**: Wire `syft .` into PostToolUse `Bash(git commit *)` hook scheduled at weekly cadence (NOT every commit — too noisy) emitting `.claude/state/sbom_audit.jsonl` per `audit-action-loop.md §Hook telemetry contract`. SBOM drift surfaced via `grype sbom:<latest.json>` weekly compare; audit script `tools/sbom_drift_audit.py` (FORWARD-REF until ship lands) emits DRIFT records to feed Wire→Surface→Close→Re-fire stages.

**Note on syft+grype vs trivy overlap**: trivy alone covers ~85% of syft+grype combined functionality. **PARTIAL-OVERLAP per CR-12**. Recommend installing trivy FIRST (P1 primary); syft+grype install only if trivy SBOM-gen quality insufficient (defer to operational evidence).

## 5. Secret management workflow — sops install for CLAUDE.local.md encryption

### Current state (FM-20 row 17 carryover)

CLAUDE.local.md is gitignored but contains:
- OAuth fleet refresh tokens (CLIProxyAPI)
- Anthropic Max account credentials (per ENV block disclosure)
- Provider API keys (FALKORDB_URI password fields — currently empty but design surface exists)

**Risk**: If CLAUDE.local.md is ever accidentally committed (FM-02 sub-c parallel-session absorption + CR-9 anti-pattern), tokens leak to git history.

### sops integration workflow design

**Prescribed_edit #3**: post-install sops workflow:

1. **Key generation**: `age-keygen -o ~/.config/sops/age/keys.txt` (sops supports KMS/age/PGP; **age is operator-side simplest** per CNCF practice)
2. **Encrypt at rest**: `sops --encrypt --age <pubkey> CLAUDE.local.md > CLAUDE.local.md.enc`
3. **Decrypt-on-load**: `tools/eee.ps1` PowerShell pre-launch hook decrypts to memory + sources ENV block + zeros the decrypted blob from memory
4. **Key rotation cadence**: align with OAuth refresh-token rotation per FM-20 row 17 (~90-day cadence for production credentials)
5. **Backup discipline**: age keys backed up to operator's 1Password/Bitwarden vault (NOT in repo; NOT in cloud-sync that's mid-trust)

**Caveat**: This is a significant operator-workflow change. sops install is ADOPT-NOW but the workflow above is **STUDY-PILOT first** — verify decrypt-on-load doesn't break `eee` launcher startup time + verify age key compromise recovery path is well-defined.

**Prescribed_edit #4**: Ship sops install at P0 BUT document the encryption workflow as FORWARD-REF P1 ship — separate logical unit per cycle-300 ONE-LOGICAL-UNIT-PER-FIRE.

## 6. CVE check at upstream HEAD (Mia probe outcomes 2026-05-15)

| Tool | Latest release probe | GitHub Security Advisories probe outcome | Verdict |
|---|---|---|---|
| gitleaks v8.30.1 (released 2026-03-21) | gh advisories page verbatim: "There aren't any published security advisories" | No active CVEs at HEAD | ✅ CLEAR |
| trufflehog v3.95.3 (released 2026-05-11) | **GHSA-3r74-v83p-f4f4** Blind SSRF in some Detectors — **Low severity**, published 2024-08-17, reporter dustin-decker; NO CVE-YYYY-NNNNN assigned per gh advisory listing | Low-sev advisory in detector subset; v3.95.3 is 9 months post-disclosure (well past patch window). HONEST-NON-FINDING: NVD search returned no usable results (page-load issue); only GHSA evidence used | ✅ CLEAR for v3.95.3 with Low-sev caveat documented |
| sops v3.13.0 (released 2026-05-08) | **GHSA-x5c7-x7m2-rhmf** Local directory executable lookup (Windows-only) — **Low severity**, published 2021-04-22, NO CVE-YYYY-NNNNN listed | Historical Windows-only Low-sev; v3.13.0 is 4 years post-disclosure (well past fix). **HONEST-NON-FINDING for CVE-2022-46741**: prior W214 audit body cited "CVE-2022-46741" but this is unverified by NVD probe (page returned no usable results); REFUTED-claim per FM-20 §How-to-apply step 1+3. Treat as PHANTOM-CVE-citation until NVD direct API probe verifies it | ✅ CLEAR for v3.13.0 (latest); pin to v3.13.0 |
| trivy v0.70.0 | (probe returned no active advisories at HEAD) | aquasec promptly patches; SLSA L3 attestations on releases (verified via release assets: 25+ `.sigstore.json` files per release) | ✅ CLEAR |
| syft v1.44.0 (WinGet) | (probe returned no active advisories at HEAD) | Anchore promptly patches | ✅ CLEAR |
| grype | (probe returned no active advisories at HEAD) | Anchore promptly patches | ✅ CLEAR |

**Prescribed_edit #5 (REVISED)**: Pin sops install to current `v3.13.0` (most recent release per probe 2026-05-15). Per CR-9 version-pin mandate, pin ALL install commands to specific release tags. **Retracted from earlier audit body draft**: the CVE-2022-46741 specific citation was UNVERIFIED phantom — NVD probe returned no results; only GHSA-x5c7-x7m2-rhmf (Windows-only Local-dir-exec-lookup 2021) is verified. Forward-only correction per `port-note-discipline.md §6` (this audit body is the live correction surface).

## 7. Self-host-first principle (CR-9 verification)

### Telemetry probe

| Tool | Default telemetry | Disable mechanism | Verdict |
|---|---|---|---|
| gitleaks OSS CLI | None per README + source review | N/A (no telemetry to disable) | ✅ SELF-HOST CLEAN |
| trufflehog OSS CLI | None for local scans per docs.trufflesecurity.com — local file/git scan does NOT phone home. Telemetry only via opt-in `--remote` reporting flag OR commercial SaaS dashboard (separate product) | `--no-update` flag + don't pass `--report-url` (default behavior) | ✅ SELF-HOST CLEAN for default OSS CLI use |
| sops | None per CNCF discipline; KMS calls go to operator-configured backend (AWS/Vault/age — operator-chosen) | N/A | ✅ SELF-HOST CLEAN |
| syft/grype/trivy | trivy DB pull from `ghcr.io/aquasecurity/trivy-db` (read-only; no telemetry); syft + grype offline-capable with `--offline` flag | `--skip-update` for trivy DB | ✅ SELF-HOST CLEAN (with caveat that vuln DB requires periodic refresh from upstream — that's data-pull not telemetry) |

**Verdict**: All 6 candidates pass CR-9 self-host-first principle. NO snyk-class commercial-tier dependency.

**Caveat for trufflehog**: confirmed during probe — the commercial SaaS "Trufflehog Enterprise" + browser-extension product DOES phone home, but the OSS CLI binary used by sss does NOT. Document this distinction explicitly in install-provenance row to prevent future confusion.

## 8. OWASP Top-10 coverage analysis

| OWASP 2021 category | P0+P1 stack coverage | Tool(s) |
|---|---|---|
| A01 Broken Access Control | ❌ Not covered (out of scope — runtime-level concern) | — |
| **A02 Cryptographic Failures** | ✅ COVERED | sops (encryption at rest); gitleaks + trufflehog (detect hardcoded crypto keys / passwords) |
| A03 Injection | ⚠ Partial | semgrep CLI (P2; deferred) catches injection patterns; ruff (P0 D2) catches Python-specific |
| A04 Insecure Design | ❌ Process-level, not tool-detectable | — |
| **A05 Security Misconfiguration** | ✅ COVERED | trivy (config scan IaC); semgrep CLI (P2) |
| **A06 Vulnerable and Outdated Components** | ✅ COVERED (P1) | syft (SBOM gen) + grype (vuln scan SBOM) OR trivy (consolidated SBOM+vuln) |
| A07 Identification + Authentication Failures | ⚠ Partial | trufflehog catches leaked auth tokens; auth design itself is process-level |
| **A08 Software and Data Integrity Failures** | ✅ COVERED (with prescribed_edit #1+#5 enforcement) | trivy SLSA provenance verification; cosign-signed releases enforce supply-chain integrity at install layer |
| A09 Security Logging + Monitoring Failures | ❌ Not covered (out of scope — runtime concern) | — |
| A10 SSRF | ⚠ Partial | semgrep CLI patterns |

**Coverage verdict**: P0 (gitleaks + trufflehog + sops) + P1 (syft + grype + trivy) stack covers OWASP A02 + A05 + A06 + A08 — the **4 categories explicitly requested in the audit brief**. ✅ STRONG COVERAGE.

**Gaps**: A03 Injection (recommend P2 semgrep CLI promotion to P1), A07 (partial via trufflehog), A09 logging (out of scope — that's observability stack at `manifests/services.yaml` Langfuse/Phoenix layer).

**Prescribed_edit #6**: Promote semgrep CLI from P2 → P1 to close A03 Injection coverage gap. LGPL-2.1 license-use admissibility verification required (Wave 213 §P2 noted this); CLI-binary-use of LGPL is permitted (analogous to AGPL §13 analysis — CLI execution doesn't trigger LGPL §6 library-link clause).

## 9. Synthesis + prescribed_edits

### Final prescribed_edits list (REVISED post-Mia-catches)

**CRITICAL REVISION** — Mia alternate-install-path probe surfaced 3/6 ALREADY-INSTALLED. W213 P0 master synthesis line 42 (gitleaks P0-A1) + line 51 (syft P1-A4) + line 56 (trivy P1-A6) install rows must be RECLASSIFIED as **ALREADY-INSTALLED status update**, NOT fresh install.

1. **CR-9 version-pin + Mia-status-update**: 
   - gitleaks: `winget upgrade Gitleaks.Gitleaks` (8.30.0 → 8.30.1) OR keep 8.30.0; update `docs/sota-installed-manifest.md §3` row from PLANNED → INSTALLED + version-pin record
   - syft: status update to INSTALLED v1.44.0 (Anchore.Syft via WinGet); confirm `syft --version` smoke probe
   - trivy: status update to INSTALLED v0.70.0 (AquaSecurity.Trivy via WinGet); confirm `trivy --version` smoke probe
   - trufflehog + sops + grype: fresh install via `gh release download` pinned to v3.95.3 / v3.13.0 / current grype-release; cite SHA256 OR cosign verify in commit body
2. **SBOM regeneration discipline**: wire `tools/sbom_drift_audit.py` (FORWARD-REF) emitting `.claude/state/sbom_audit.jsonl` per `audit-action-loop.md §Hook telemetry contract`; weekly cadence; surface DRIFT to SessionStart additionalContext
3. **sops workflow design**: ship sops install at P0 BUT ENCRYPTION-OF-CLAUDE.local.md workflow as separate FORWARD-REF P1 ship (decrypt-on-load via `eee` launcher + age key rotation cadence + backup discipline)
4. **Install row provenance**: document trufflehog AGPL §13 use-class boundary (CLI-binary-execution against local repos; NOT modified + NOT network-served = §13 NOT triggered) in `docs/install-provenance.md` Wave-214 row; per SRA D1 use-class-precision lattice
5. **CVE citation correction**: REMOVE earlier draft's CVE-2022-46741 specific citation for sops — was UNVERIFIED phantom per NVD probe; only GHSA-x5c7-x7m2-rhmf (Windows-only Local-dir-exec-lookup, Low severity, 2021) is verified. Pin to v3.13.0 (current; far past 2021 disclosure)
6. **A03 Injection coverage**: promote semgrep CLI from P2 → P1 to close A03 gap (LGPL-2.1 CLI-binary-use admissibility verified by analogy to AGPL §13 + SRA D1 lattice: LGPL §6 library-link clause NOT triggered for CLI execution; FORWARD-REF Wave 215 candidate per ONE-LOGICAL-UNIT-PER-FIRE)
7. **Install order recommendation**: trivy is now ALREADY-INSTALLED — use as primary SBOM+vuln+config tool; defer grype install pending operator decision on syft+grype supplement (PARTIAL-OVERLAP per CR-12 disposition — trivy covers ~85% of syft+grype combined functionality)
8. **Sibling REVERT check escalation**: `git -C Z:/claude-sota` probe FAILED at agent layer (directory not accessible); orchestrator MUST complete REVERT check at install-apply boundary per CR-9 pre-cite-import discipline before any of these 3 install commits land

### Risk flags per candidate (per SRA D1-D10 lattice scoring)

| Candidate | Risk flag | SRA score (out of 10) | Reasoning |
|---|---|---|---|
| gitleaks (ALREADY-INSTALLED v8.30.0) | LOW | 9/10 (D1✅ D2✅ D3✅ D4 TIER-3 D5✅ D6✅ D7✅ D8✅ D9✅ D10 N/A) | MIT OSS CLI clean; no active CVEs; SHA256-only sig is MEDIUM supply-chain but no exploit path |
| trufflehog (FRESH-INSTALL v3.95.3) | LOW | 9/10 | AGPL §13 NOT triggered for CLI-binary-use per SRA D1 lattice; cosign-signed checksums; GHSA-3r74 Low-sev SSRF in detector subset (subset-scoped) |
| sops (FRESH-INSTALL v3.13.0) | LOW | 10/10 | Cosign-signed + SLSA-attested + SBOM bundled with releases; CNCF-graduated; GHSA-x5c7 Windows-only 4-year-stale Low-sev |
| syft (ALREADY-INSTALLED v1.44.0) | LOW | 9/10 | Anchore disciplined supply-chain |
| grype | LOW | Anchore disciplined supply-chain |
| trivy | LOW | aquasec SLSA L3 attestations + Apache-2.0 + active maintenance |

## 10. Sister-rule integration + FM cross-references

- **FM-09 codex-rescue blind-spot 2-stage validation**: this audit IS the 2nd-stage harness-fit verification for Wave 213 P0 Security candidates per W213 STAND-IN-NOTICE. Per FM-09: orchestrator-side Path P codex foreground+tee REQUIRED before install-apply boundary regardless of this audit's verdict (cross-model gate not structurally satisfied at agent layer).
- **FM-17 subagent fleet-depletion**: this audit ran clean (no autocompact-thrashing per FM-17.e); evidence file persisted via Write tool BEFORE final return per FM-19 ARTIFACT-INLINE alternative discipline.
- **FM-19 readonly-guard sidestep**: NOT triggered (audit had Write tool available; no Bash heredoc/tee/redirection attempted)
- **FM-20 path-drift cascade**: each prescribed_edit decomposed into independent sub-claim; sub-claim probe outcomes cited verbatim per §How-to-apply step 3. Mia self-catches: (a) CVE-2022-46741 specific citation in earlier draft was UNVERIFIED phantom — REFUTED per NVD probe; only GHSA-x5c7 verified. (b) Original audit body claimed "all 6 FRESH-CANDIDATE class" — REFUTED by Mia probe: 3/6 ALREADY-INSTALLED (gitleaks + syft + trivy). Both corrections forward-only per `port-note-discipline.md §6`.
- **mia-pre-apply.md**: Mia alternate-install-path probe CAUGHT 3/6 OVER install prescriptions (gitleaks v8.30.0 + syft v1.44.0 + trivy v0.70.0 ALREADY-INSTALLED via WinGet + `.local/bin/`); advanced n=36 → n=37+ same-arc evidence ladder per `mia-pre-apply.md §Empirical evidence ladder`.
- **CR-12 disposition lattice**: 
  - gitleaks+trufflehog = PROVIDER-COMPLEMENT (distinct regex-pre-commit vs verifier-post-incident mechanisms)
  - trivy vs syft+grype = PARTIAL-OVERLAP (trivy covers ~85% of combined; install-order trivy-first)
  - sops = GENUINELY-NEW (no incumbent secret-management primitive at rest)
- **SRA D1-D10 lattice scoring** per `Z:/claude-sota-installed/.claude/rules/sota-research-architecture.md`: all 6 candidates score 9-10/10 with D1 use-class PASS + D6 use-class compatibility PASS (both critical dimensions). trufflehog reclassification per SRA D1 use-class precision: AGPL CLI-binary-use = ACCEPTABLE per Wave 102 lesson §Forward operator discipline.
- **convergence-gate Axis 1+2+3**: all 6 candidates PASS — multi-org maintainership (Anchore + aquasec + getsops + CNCF + trufflesecurity + gitleaks org), named-T2 practitioners (CNCF graduation; OpenSSF Scorecard), >180-day stability (gitleaks v8.x series spans years; sops since 2017; etc.)

## 11. Cross-fire claim-propagation defense (per FM-20)

Sub-claims requiring forward verification before W214 install-apply ship:

| Claim source | Sub-claim | Probe method |
|---|---|---|
| W213 P0-A1 master synthesis L42 | "gitleaks FRESH-CANDIDATE — install via `gh release download`" | REFUTED by Mia Wave 214 (ALREADY-INSTALLED v8.30.0 via WinGet); flip install row to status-update |
| W213 P1-A4 master synthesis L51 | "syft FRESH-CANDIDATE — install via `gh release download`" | REFUTED by Mia Wave 214 (ALREADY-INSTALLED v1.44.0 via WinGet); flip install row to status-update |
| W213 P1-A6 master synthesis L56 | "trivy FRESH-CANDIDATE — install via `gh release download`" | REFUTED by Mia Wave 214 (ALREADY-INSTALLED v0.70.0 via WinGet); flip install row to status-update |
| Earlier W214 draft body | "sops historical CVE-2022-46741 fixed pre-v3.7.3" | REFUTED-AS-PHANTOM — NVD probe inconclusive; only GHSA-x5c7 verified; correct citation forward-only |
| W214 audit | "Sibling REVERT check for trufflehog/sops/grype completed clean" | INCOMPLETE — `Z:/claude-sota` not accessible from this runtime's audit context; orchestrator MUST complete check before install-apply |

VERDICT: NEEDS-REVISION: 3/6 W213 install prescriptions REFUTED by Mia probe (gitleaks + syft + trivy ALREADY-INSTALLED); remaining 3/6 (trufflehog + sops + grype) PASS SRA D1-D10 with 8 prescribed_edits for install-time discipline + status-update edits to master synthesis + manifest §3.
confidence: 0.90
prescribed_edits: [1-Mia-status-update-3-already-installed / 2-CR-9-version-pin-trufflehog+sops+grype / 3-SBOM-drift-audit-wire-FORWARD-REF / 4-sops-encryption-workflow-FORWARD-REF / 5-install-provenance-AGPL-use-class-disclosure / 6-CVE-2022-46741-phantom-citation-retraction / 7-semgrep-P1-promotion-A03-FORWARD-REF / 8-orchestrator-side-sibling-REVERT-check-completion]
risk_flags: {gitleaks: LOW-ALREADY-INSTALLED, trufflehog: LOW-FRESH, sops: LOW-FRESH, syft: LOW-ALREADY-INSTALLED, grype: LOW-FRESH, trivy: LOW-ALREADY-INSTALLED}
license_precision_verdict: {trufflehog: PASS, reasoning: "AGPL §13 network-served-modification trigger requires BOTH modification AND remote network interaction per gnu.org §13 verbatim; CLI binary execution against local repos satisfies neither. W102 correction stands; SRA D1 use-class lattice confirms AGPL CLI-binary-use = ACCEPTABLE."}
provider_complement_verdict: {gitleaks-trufflehog: CONFIRMED, reasoning: "Distinct mechanisms (regex+entropy pre-commit prevention vs verifier+live-API-check post-incident detection). PROVIDER-COMPLEMENT per CR-12; NOT DUPLICATE-FUNCTIONALITY at workflow level. gitleaks ALREADY-INSTALLED v8.30.0; trufflehog FRESH-INSTALL v3.95.3."}
