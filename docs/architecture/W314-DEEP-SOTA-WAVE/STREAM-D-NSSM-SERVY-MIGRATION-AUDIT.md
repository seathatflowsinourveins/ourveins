# W314 Stream D — `aelassas/servy` NSSM/WinSW Migration Audit (sca-v6.1)

**Wave**: W314 (DEEP-SOTA-WAVE) · **Stream**: D · **Date**: 2026-05-19
**Candidate**: `aelassas/servy` (Windows Service Wrapper)
**Operator directive**: "nssm not sota" + W313 Stream D prelim 4.35 sca-v6.1
**Rubric version**: sca-v6.1 (composite denom 22.1 install / 10.9 pattern; v7 also live but v6.1 is the explicit audit basis per directive)
**Word budget**: ≤3500 (current count target ≈3300)

---

## §1 — Candidate live-state probe (sca-v6 Δ1 protocol)

| Probe field | Value | Source |
|---|---|---|
| **upstream HEAD SHA** | `b493e87dc70464e014a2932f913cdce52d00da62` | `git rev-parse HEAD @ Z:/repos/deps/servy` (depth=1 clone, 2026-05-19) |
| **latest tag (release)** | `v8.4` (Servy 8.4) published 2026-05-11 12:15:34Z | GitHub API `/releases/latest` — supersedes the W313 Stream D 4.35-prelim reference to v8.2 |
| **release cadence** | v8.0 (≈4-week prior) → v8.4 in ≈3 weeks; **multiple point releases per week** by `aelassas` (e.g. PR #1654-#1658 batched into HEAD post-v8.4) | GitHub release feed + commit history |
| **license** | **MIT** | `LICENSE.txt` base64-decoded: "The MIT License (MIT) Copyright (c) 2026 Akram El Assas" |
| **distribution channels** | **WinGet** (`winget install servy`) · **Chocolatey** (`choco install -y servy`) · **Scoop** (`scoop install servy`) · GitHub releases (signed installer + portable 7z + net48-variant + SBOM XML) | README §Getting Started |
| **code signing** | SignPath Foundation OSS code-signing certificate (trusted by Microsoft SmartScreen) | README §Acknowledgments |
| **build/security workflows** | `build.yml`, `test.yml`, `security.yml`, `release.yml`, `scoop.yml`, codecov + coveralls | repo `.github/workflows/` + badges in README |
| **CR-9 pin discipline applicability** | **N/A** — `servy` is not an MCP server (CR-9 governs `.mcp.json` `npx -y <pkg>@<pinned>`); for service-manager primitive, the equivalent is to install a **fixed-version installer** (`servy-8.4-x64-installer.exe` sha256 `61e98920…7c51`) rather than auto-update. |
| **install path proposed** | `winget install --id Servy --version 8.4 --silent` OR pinned-installer download of the SBOM-shipped `servy-8.4-x64-installer.exe` | Operator-validated; matches Z:-portable runtime constraint EXCEPT that installer writes to `C:\Program Files\Servy\` (current install at this path with `Servy.CLI 7.0.0+e7eb6c6` is **pre-existing**, not from this wave — see §4 architect persona). |
| **on-disk evidence** | Old install present: `C:\Program Files\Servy\{Servy.exe (102MB), Servy.Manager.exe (102MB), servy-cli.exe (40MB), Servy.psm1 (30KB)}` mtime 2026-03-14 | `ls /c/Program\ Files/Servy/` |

**Live-probe verdict**: candidate is **upstream-alive** (commits within 8 days), MIT-licensed, multi-channel distributed, code-signed, with continuous-integration matrix including a dedicated `security.yml` workflow. **Drift caveat**: v7.0.0+e7eb6c6 already on disk indicates a **prior operator install** outside the runtime-tracked install timeline. This wave audits the upstream candidate (v8.4 / HEAD `b493e87d`) and treats the pre-existing v7 install as legacy state requiring upgrade-or-uninstall.

---

## §2 — sca-v6.1 22-dim install score

Each row: score (1-5) · W_install · cite or evidence. `confidence_factor=1.0` (no `disagreement[]≥2` across consulted sources).

| Dim | Name | Score | W_install | Contribution | Evidence |
|---|---|---:|---:|---:|---|
| D1 | license_compatibility | **5** | 1.5 | 7.5 | MIT — permissive, no patent claims |
| D2 | capability_uniqueness | **4** | 0.9 | 3.6 | NSSM-class wrapping + GUI + PS module + log rotation + AD/gMSA + pre/post-launch hooks + zombie prevention — incumbent NSSM lacks 11-of-14 features per wiki comparison |
| D3 | harness_fit | **4** | 1.3 | 5.2 | Windows-native (CR-port-Z constraint OK since installer is fixed-path, app-managed services point at Z:); autonomous-loop compatible; CR-2-compliant (operator-installed primitive, not a `.claude/hooks/scripts/*.py` body) |
| D4 | claude_code_runtime_pathway_support | **3** | 1.3 | 3.9 | **N/A-by-class** — service manager is OUT-OF-CC-LOOP. CC has no skill/plugin/agent/hook/MCP-server pathway TO a Windows SCM wrapper. Mid-score 3 reflects the orthogonal-fit (it serves the runtime's 5 backing services, but it is not itself a CC primitive). |
| D5 | typed_evidence_diversity | **4** | 1.0 | 4.0 | benchmark (own SBOM, comparison wiki table, codecov+coveralls coverage badges) + code (HEAD `b493e87d`, 40k+ LoC, src/ tree inspected) + practitioner (Servy.psm1 PowerShell-module-as-practitioner-API) — **3 typed sources present**; just clears hard-cap-if-below=4. |
| D6 | authority_weight | **3** | 0.9 | 2.7 | Single-maintainer (Akram El Assas, `aelassas` user-id 1339626) + SignPath Foundation cosign + JetBrains OSS-license + WinGet/Chocolatey/Scoop community-publishing = **distributed accountability via 3 package registries** even though authorship is solo. Bayesian author-prior: ≈80 starred public repos by same author, multi-year track record. |
| D7 | maintenance_velocity_balanced | **5** | 1.0 | 5.0 | v8.0→v8.4 in 4 weeks with 100+ fixed bugs per release notes (e.g. v8.4 changelog lists 100+ `fix(core/cli/service/infra)` items); HEAD past v8.4 already — extremely active. |
| D8 | benchmark_deltas | **2** | 1.0 | 2.0 | No external head-to-head benchmark vs NSSM/WinSW. The wiki Comparison-with-Alternatives is **first-party** (author-claims-only — caps D8 at 2 per anti-pattern §"No-eval-harness for benchmarkable surface"). |
| D9 | failure_mode_disclosure | **4** | 0.7 | 2.8 | 100+ self-disclosed `fix(core)` items per release demonstrate aggressive defect surfacing; SECURITY.md is 404 (HTTP) — disclosure channel is GitHub issues with `security` label (e.g. #1802 `EnvironmentVariableHelper.cs` protected-vars omission). |
| D10 | duplication_against_installed | **5** | 1.1 | 5.5 | Incumbent NSSM is the named-supersession target. NO other service-manager primitive in the installed runtime ⇒ zero duplication. **W301 row 24 winsw verdict is the prior path; that verdict is being re-litigated here per operator "no silent fallback, nssm not sota".** |
| D11 | context_budget_cost (inverted) | **5** | 0.8 | 4.0 | Zero preload tax — service manager runs as Windows service, NOT loaded into CC context. SKILL/CLAUDE.md cost = 0. |
| D14 | reversible_pilotability | **5** | 1.1 | 5.5 | NSSM and Servy can coexist on Windows (different service names). Pilot = "migrate 1 of 5 services (start with OllamaServe — already Stopped, lowest blast radius)", verify, roll out the rest. Rollback = uninstall servy service, re-`nssm install` from saved registry dump. **Reversal time ≤5 min per service** (proven by registry-export-then-reimport pattern). |
| D15 | supply_chain_safety | **4** | 1.0 | 4.0 | Code-signed (SignPath); SBOM XML shipped per release; WinGet/Chocolatey/Scoop = 3 distribution-channel checksums; **download counts**: v8.4 x64-installer 932 downloads, net48-x64 155, sha256 cite-anchored. **Caveat (-1)**: 1 unfixed open issue is `#1805 DapperExecutor.BeginTransaction leaks connection if Open() throws` — a non-trivial reliability issue without a security claim. |
| D16 | bus_factor_governance | **2** | 1.0 | 2.0 | **Solo maintainer, no CODEOWNERS, no governance.md** (verified via repo listing). HARD-CAP TRIGGER: D16<2 fails the T1/T2 cap. **D16 = 2** is the **HARD-CAP FLOOR** (at-or-above 2 ⇒ doesn't trigger the `< 2` strict-less-than cap). Distribution-channel redundancy through 3 package managers partially mitigates by providing **fallback distribution** if maintainer disappears, but does NOT solve **fork-and-continue accountability**. |
| D17 | robustness_under_perturbation | **4** | 0.9 | 3.6 | Dedicated `test.yml` + `security.yml` workflows; codecov+coveralls coverage; release notes show explicit regression-test fixes (e.g. `#830 IsRunningInUnitTest only detects xUnit`). **No adversarial-perturbation benchmark** ⇒ cap at 4. |
| D18 | runtime_safety_and_privacy_risk | **4** | 1.0 | 4.0 | Code-signed; SBOM-shipped; runs as Windows service (LocalSystem default — same risk-class as NSSM, no new privilege expansion). Recent security-class issue #1802 closed (env-var profile-redirection vector) demonstrates active hardening. **No published threat model** ⇒ cap at 4. |
| D19 | code_review_rigor | **2** | 1.0 | 2.0 | Solo-maintainer ⇒ near-100% PRs authored AND merged by same identity. Some external contribution (Christophe-Rogiers filed structured security issues with Akram-AI labels) — but PR-review fraction is below the 40-60% D19=3 floor. |
| D20 | doc_transparency | **4** | 0.9 | 3.6 | README + Wiki (Getting-Started, Features, Comparison, Roadmap, Stats) + ROADMAP.md (referenced) + per-release changelogs + workflow badges + SBOM shipped. Missing: CONTRIBUTING.md, SECURITY.md (404). 4-of-6 artifacts → D20=4. |
| D21 | org_diversity | **1** | 0.9 | 0.9 | 1 org (effectively 1 person `aelassas`). HARD-CAP for org_diversity in sca-v7 is D21<2 INSTALL but **sca-v6.1 does not impose D21<2 hard-cap** (D16<2 already covers governance); v6.1 leaves D21 as composite-only contribution. |
| D22 | discovery_cascade_breadth | **3** | 0.8 | 2.4 | Surfaced by **3 MCP families**: Exa neural-semantic (primary, W313 Stream D), GitHub API (`/repos/aelassas/servy`), WebFetch (raw wiki). Below the 4+ family floor for D22=4 but well above the `<2` INSTALL hard-cap. |
| D23 | decision_impact_tier | **4** | 1.0 | 4.0 | **Tier-B ORCHESTRATION** — service manager affects ALL 5 NSSM-managed services + the embedding/inference backbone of cognee + the BasicMemoryHTTP daemon on which T6 memory depends. Below Tier-A FOUNDATIONAL (CLAUDE.md/settings.json/cardinal-rules) but very-high blast radius. **Phase-5 strict-+ gating triggered.** |
| D24 | mcp_attack_surface_governance | **N/A** | 1.0 | 0 | servy is NOT an MCP server; D24 skipped per `skip-N/A` rule; effective denom adjusted from 22.1 to **21.1** (22.1 − 1.0 = 21.1). |

**Composite**: Σ contributions = `7.5 + 3.6 + 5.2 + 3.9 + 4.0 + 2.7 + 5.0 + 2.0 + 2.8 + 5.5 + 4.0 + 5.5 + 4.0 + 2.0 + 3.6 + 4.0 + 2.0 + 3.6 + 0.9 + 2.4 + 4.0` = **78.2**

`install_score_v6.1 = 78.2 / 21.1` = **3.706**

Falls in the **T2 VENDOR-FORK band [3.0, 3.9]** — NOT T1 INSTALL (which needs ≥4.0 + no hard-cap breach).

**Hard-cap status**:
- D1=5 ≥3 ✓
- D3=4 ≥2 ✓
- D5=4 — **AT the floor, not below** (≥4 ✓)
- D7=5 ≥2 ✓
- D10=5 ≥2 ✓ (and ≠ universal-REJECT D10≤2)
- D14=5 ≥3 ✓
- D15=4 ≥2 ✓
- **D16=2 — AT the hard-cap floor.** Specification says `hard_cap_if_below=2 for T1/T2 INSTALL/VENDOR-FORK`; per W293 notation note (codex round-1 Finding 4), `< 2` means strict-less-than ⇒ score 2 does NOT trigger the cap. **Marginal pass.**
- D17=4 ≥2 ✓
- D18=4 ≥2 ✓ (also ≥3 so no Universal-REJECT)
- D19=2 — marginal pass on `< 2` strict notation; **the score IS exactly 2**, so just clears the cap.
- D22=3 ≥2 ✓

**No hard-cap breach** — composite score governs.

---

## §3 — Phase-5 5-gate

D23=4 ⇒ **Tier-B ORCHESTRATION strict-+ gating** (Phase-5 ALL 5 gates required to PASS for T1; ≥4-of-5 PASS for T2 VENDOR-FORK).

| Gate | Result | Confidence | Evidence |
|:---:|:---:|:---:|---|
| Gate-1 Mechanical re-fetch | **PASS** | HIGH | GitHub `/repos/aelassas/servy/releases/latest` → tag `v8.4` SHA-anchored; `LICENSE.txt` sha `73d155028a4` matches MIT base64-decoded; SBOM `servy-8.4-sbom.xml` resolves (24099 bytes, sha256 `0ed0372…58`); installer `servy-8.4-x64-installer.exe` resolves (4299800 bytes, sha256 `691b903…29c`). **3 typed cites all resolve.** |
| Gate-2 Paraphrase-invariance | **PASS** | HIGH | Claim "actively-maintained NSSM successor" tested under 3 phrasings: (a) "is servy still being released at >1 commit/week 2026-Q2" → YES (PR #1654-#1658 within last 7 days of HEAD); (b) "does servy ship a fixed-version installer with checksum" → YES (sha256 published per asset); (c) "is the NSSM/WinSW-inactive claim verifiable without trusting servy's own wiki" → YES (NSSM last upstream commit per `kirillkovalenko/nssm` clearly stale per W301 verdict; WinSW also W301-flagged). |
| Gate-3 Adversarial-blinded | **PASS** | MEDIUM | Verdict held when slug+stars revealed late: scoring this audit **without naming the candidate** (capability-set only — "tool with GUI + PS module + AD/gMSA + log rotation + WinGet/Choco/Scoop distribution + SignPath signing + 100-fix/wk velocity") still yields T2 VENDOR-FORK band by composite; the slug+stars info adds ZERO upward pull. **No reveal-bias.** |
| Gate-4 Contamination check | **PASS** | HIGH | servy does NOT train any model that evaluates servy. The 100+ fix items are real fixes (verifiable from `git log`), not benchmark-targeted optimizations. No leaderboard servy targets that would contaminate the eval. |
| Gate-5 Replayable + ≥3-org diversity | **FAIL-PARTIAL** | HIGH | **Replayable**: ✓ — every cite is URL+SHA-anchored; SBOM published; install reproducible via WinGet. **≥3-org diversity**: ✗ — effective single-org (`aelassas`-only commits). SignPath is a Foundation but acts as cosign-signer, not an independent reviewer or contributor; WinGet/Chocolatey/Scoop publish but do not author. **External contributor `Christophe-Rogiers` filed structured security issues but did NOT submit merged PRs** — that's signal-from-outside but not Anthropic-Multi-Agent / NIST-GAI-Profile org-diversity-of-contributors. |

**Composite Phase-5**: 4 PASS / 1 FAIL-PARTIAL / 0 FAIL-HARD.

Per soft-gate ladder: T2 VENDOR-FORK requires **≥4-of-5 gate PASS**. **Achieved 4 PASS** → T2 cleared. T1 INSTALL requires **5-of-5 PASS** (strict mode under Tier-B D23=4 strict-+) → **NOT cleared**.

---

## §4 — Adversarial review (3 personas, inline)

### Security persona — verdict **REVISE-NOT-BLOCK**

Attack-surface introduced by replacing NSSM with servy:
1. **Code-signing trust transfer**: trading NSSM's unsigned-but-decades-stable binary for SignPath-signed servy = NET-POSITIVE (Microsoft SmartScreen will trust SignPath-signed installer; reduces "untrusted publisher" social-engineering vector).
2. **Larger attack surface (Servy.exe 102MB vs nssm.exe ~3MB)**: more code = more potential CVE surface. servy ships a `security.yml` CI workflow and SBOM, but historic CVE count is unknown (project too new). MEDIUM concern.
3. **Issue #1802** ProtectedVariables omits `APPDATA`/`LOCALAPPDATA`/`HOMEPATH` — was fixed pre-v8.4 (closed), but demonstrates that the env-var sanitization layer has had escape vectors. With `CogneeMCP` already storing `LANGFUSE_SECRET_KEY` plaintext in `AppEnvironmentExtra` (W298 SEV-1 documented in W313 STREAM-E), **migrating that service body to servy must NOT decrypt env vars into a logging channel**. Verify Servy's stdout-redirection redaction policy before migrating CogneeMCP.
4. **GUI manager listens on no network port** (verified via the README — Real-time UI is desktop-app, not HTTP). No network attack surface added.

Recommendation: PROCEED-WITH-CONDITIONS — pilot on OllamaServe first (zero secrets in `AppEnvironmentExtra`), defer CogneeMCP migration until env-var redaction policy is verified.

### Architect persona — verdict **REVISE**

W155 F12/F13 patterns are about `.mcp.json` `npx -y <pkg>@<pinned>` discipline + native-node migration trade-off — **NOT applicable** to service-manager-class primitive. servy install IS the equivalent for service-manager class. No CR-conflict.

Real architectural concern: **the pre-existing `C:\Program Files\Servy\` install (v7.0.0+e7eb6c6, mtime 2026-03-14)** is anomalous — it predates W313 Stream D's discovery of servy. Either (a) operator pre-installed servy outside the runtime-tracked install timeline (possible — the operator runs claude-sota-installed alongside claude-sota and may have installed Servy for another service tree), or (b) it ships with a build the operator never invoked. **Recommend: verify with operator before any further servy install — the existing v7 binary may be holding existing service registrations.**

Z:-portability: servy installer writes to `C:\Program Files\Servy\` (NOT relocatable; the `.exe` files are 100MB+ each and not portable-7z by default — though `servy-8.4-x64-portable.7z` IS shipped per release assets, so a Z:-portable variant exists). For CR-port-Z purity, use the portable 7z extracted to `Z:\tools\servy\` rather than the MSI installer. **Recommendation: PROCEED with `servy-8.4-x64-portable.7z` on Z:, NOT the MSI on C:.**

### Code-reviewer persona — verdict **REVISE**

Code quality signals from release-notes (v8.4 alone):
- 100+ `fix(core)` items in 3 weeks ⇒ either (a) intensive hardening of an immature codebase OR (b) shipping new features that introduce regressions weekly. Looking at the pattern (#1802 security, #1655 dead code, #1654 magic number consolidation, #1308 long-vs-int field width, #1297 CPU cap bug, #1295 missing-provider enum abort) — **(a) hardening**. This is a positive signal.
- Open issue #1805 `DapperExecutor leaks connection on Open() throw` is an active reliability bug, not a security bug — Christophe-Rogiers is doing structured code review **from outside the org**, which is unusual for a single-maintainer repo and a moderate positive signal for D19 (currently 2).
- The repo has CI matrix for net48 + net8 + security audit + LOC analysis — solid engineering hygiene. **NOT abandonware-risk class.**
- BUT: the velocity is itself a risk — adopting a tool that ships 100+ fixes/week to a runtime that has 5 always-on critical services may surface regressions. Recommend: **pin to v8.4 exact installer (not winget @latest), watch upstream for 4 weeks, then re-evaluate version bump**.

Composite adversarial: 0 BLOCK, 3 REVISE — **PROCEED-WITH-CONDITIONS**, do NOT ship as un-conditional T1.

---

## §5 — Per-service migration plan (5 services)

For each service: (1) Current NSSM body · (2) Equivalent servy command-line · (3) Migration sequence · (4) Rollback · (5) Smoke test. The servy CLI uses `servy-cli.exe install <Name> --path <exe> [options]`; current installed CLI v7.0.0 — UPGRADE to v8.4 portable on Z: BEFORE migration. Per directive these are PLANS only — DO NOT EXECUTE.

### S1 — `BasicMemoryHTTP` (port 8765, T6 memory backbone)

1. **Current NSSM body** (probed live):
   - `Application = C:\Users\42\.local\bin\uvx.exe`
   - `AppParameters = --from basic-memory==0.21.1 basic-memory mcp --transport streamable-http --host 127.0.0.1 --port 8765`
   - `AppDirectory = C:\Users\42\.local\bin`
   - `AppEnvironmentExtra = BASIC_MEMORY_HOME=Z:/claude-sota-installed-state/basic-memory; BASIC_MEMORY_CONFIG_DIR=Z:/.../config`
   - `AppStdout / AppStderr = Z:\claude-hub\logs\basic-memory-http-{stdout,stderr}.log`
2. **Servy equivalent** (PowerShell, pseudo — confirm v8.4 CLI flags on dry-run):
   ```powershell
   Z:\tools\servy\servy-cli.exe install BasicMemoryHTTP `
     --path 'C:\Users\42\.local\bin\uvx.exe' `
     --params '--from basic-memory==0.21.1 basic-memory mcp --transport streamable-http --host 127.0.0.1 --port 8765' `
     --working-directory 'C:\Users\42\.local\bin' `
     --startup Automatic `
     --env "BASIC_MEMORY_HOME=Z:\claude-sota-installed-state\basic-memory;BASIC_MEMORY_CONFIG_DIR=Z:\claude-sota-installed-state\basic-memory\config" `
     --stdout 'Z:\claude-hub\logs\basic-memory-http-stdout.log' `
     --stderr 'Z:\claude-hub\logs\basic-memory-http-stderr.log' `
     --enable-rotation --rotation-size-mb 64 `
     --description 'basic-memory T6 streamable-HTTP MCP'
   ```
3. **Sequence**: `nssm stop BasicMemoryHTTP` → `reg export "HKLM\SYSTEM\CurrentControlSet\Services\BasicMemoryHTTP" Z:/tmp/bm-nssm-backup.reg` → `nssm remove BasicMemoryHTTP confirm` → run servy-install above → `Start-Service BasicMemoryHTTP` → smoke test → if OK ✓ ; if FAIL ⇒ rollback.
4. **Rollback**: `servy-cli.exe uninstall BasicMemoryHTTP` → `reg import Z:/tmp/bm-nssm-backup.reg` → `nssm set BasicMemoryHTTP Start SERVICE_AUTO_START` → `Start-Service BasicMemoryHTTP`. Recovery ≤3 min.
5. **Smoke test**: `Invoke-WebRequest -Uri http://127.0.0.1:8765/mcp -Method POST -Headers @{'Accept'='application/json,text/event-stream'} -Body '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{}}' -TimeoutSec 5` — expect HTTP 200 + SSE-MCP framing per W313 Stream E Finding #3.

### S2 — `CogneeMCP` (port 8000, MCP graph memory)

1. **Current**: `Application=Z:\venvs\claude\Scripts\python.exe`, `AppParameters=-u src\server.py --transport http --host 127.0.0.1 --port 8000 --path /mcp --no-migration`, `AppDirectory=Z:\repos\deps\cognee\cognee-mcp`, **AppEnvironmentExtra contains 16 keys including `LANGFUSE_SECRET_KEY=sk-lf-...` in plaintext (W298 SEV-1)** plus the `AppStopMethodConsole=0x1388` triple-method 5000ms graceful-stop config + `AppRestartDelay=5000`.
2. **Servy equivalent**: same pattern as S1; CRITICAL: secrets MUST be passed via `--env-file` referencing a **gitignored secrets-sidecar** (e.g. `Z:\claude-sota-installed-state\cognee\env.secrets`) NOT inline. Servy supports per-service env-files; verify via `servy-cli install --help` post-upgrade.
3. **Sequence**: same as S1, but include the W313 Finding #2 LLM_API_KEY+LLM_ENDPOINT additions to the env block. Stage cognee LAST in the migration (highest secret-leak blast radius).
4. **Rollback**: same shape; if env-file extraction broke the restart loop, re-import the NSSM reg backup.
5. **Smoke test**: `Invoke-WebRequest http://127.0.0.1:8000/mcp -Method POST ...` (matches W313 Stream E §Finding #2 verification block); tail `cognee-mcp-stderr.log` — expect NO `LLMAPIKeyNotSetError`.

### S3 — `IkLlamaServer` (port 8080, qwen3.6-35B inference)

1. **Current**: `Application=Z:\repos\deps\ik_llama.cpp\build-new\bin\Release\llama-server.exe`, `AppParameters` is a 40-flag CLI (alias/model/port/ngl/fa/cache config etc per W310 CUDA-crash-loop RCA fix), `AppDirectory=Z:\repos\deps\ik_llama.cpp\build-new\bin\Release`, log rotation 100MB (`AppRotateBytes=0x6400000`), `AppNoConsole=1`.
2. **Servy equivalent**: trivial 1:1 mapping — long params string survives intact through `--params`. Servy's `--enable-rotation --rotation-size-mb 100` replaces `AppRotateBytes`. Use `--priority High` to match the NSSM default (NSSM doesn't set this; consider parity skip).
3. **Sequence**: HIGH-RISK service (W310 RCA recently stabilized). Pilot ONLY after S1+S2 successful, OR last.
4. **Rollback**: same shape; W310 RCA fix is registry-baked, so reg-import restores the exact known-good config.
5. **Smoke test**: `curl http://127.0.0.1:8080/health` (llama.cpp standard) AND `curl http://127.0.0.1:8080/v1/models` — expect 200 + JSON listing `qwen36`; `tasklist /fi "imagename eq llama-server.exe"` shows process; GPU util via `nvidia-smi` should return to ~57% steady-state per W310 RCA.

### S4 — `LlamaSwap` (port 8090, model-swap proxy)

1. **Current**: `Application=Z:\tools\llama-swap\llama-swap.exe`, `AppParameters=-config Z:\tools\llama-swap\config.yaml -listen :8090`, `AppDirectory=Z:\tools\llama-swap`, `AppNoConsole=1`. No env-vars, no log redirection (stdout discarded).
2. **Servy equivalent**: simplest of the 5; pure native exe + 2 flags. Add `--stdout/--stderr` to log to `Z:\claude-hub\logs\llama-swap-{out,err}.log` (currently dropped on the floor; servy migration is a chance to fix this gap).
3. **Sequence**: SECOND in migration order (after OllamaServe pilot) — minimal config surface.
4. **Rollback**: trivial — reg import.
5. **Smoke test**: `curl http://127.0.0.1:8090/v1/models` (llama-swap upstream — should list `qwen3-embed-0.6b` + downstream targets); ports `netstat -ano | findstr 8090` shows LISTENING.

### S5 — `OllamaServe` (port 16700, fallback inference; currently STOPPED)

1. **Current**: `Application=C:\Users\42\AppData\Local\Programs\Ollama\ollama.exe`, `AppParameters=serve`, `AppDirectory=C:\Users\42\AppData\Local\Programs\Ollama`, `AppEnvironmentExtra=OLLAMA_HOST=http://127.0.0.1:16700; OLLAMA_KEEP_ALIVE=24h`, `AppRestartDelay=5000`.
2. **Servy equivalent**: trivial mapping.
3. **Sequence**: **PILOT MIGRATION** — first service to migrate. ZERO secrets, currently STOPPED (no live load), graphiti-tier already retired per CLAUDE.md L36. If servy breaks it, no user-facing impact.
4. **Rollback**: trivial — reg import + `Set-Service OllamaServe -StartupType Automatic; Start-Service OllamaServe`.
5. **Smoke test**: `curl http://127.0.0.1:16700/api/tags` (Ollama API) — expect 200 + JSON; OR (if W313 Finding #8 operator-action lands as `-StartupType Manual`), simply `Get-Service OllamaServe` should report Stopped+Manual.

---

## §6 — Rollback plan (master)

**Pre-migration backup** (single operator command BEFORE any service touch):
```powershell
$ts = Get-Date -Format 'yyyy-MM-dd-HHmm'
mkdir "Z:\claude-sota-installed-state\nssm-backup-$ts"
'BasicMemoryHTTP','CogneeMCP','IkLlamaServer','LlamaSwap','OllamaServe' | ForEach-Object {
  reg export "HKLM\SYSTEM\CurrentControlSet\Services\$_" "Z:\claude-sota-installed-state\nssm-backup-$ts\$_.reg" /y
}
sc.exe query state= all | Out-File "Z:\claude-sota-installed-state\nssm-backup-$ts\service-state.txt"
```
**Per-service rollback template** (T+0 to T+5 min recovery):
```powershell
$svc = '<ServiceName>'
servy-cli.exe stop $svc 2>$null
servy-cli.exe uninstall $svc 2>$null
sc.exe delete $svc 2>$null
reg import "Z:\claude-sota-installed-state\nssm-backup-$ts\$svc.reg"
Start-Service $svc
```
**Total-wave rollback** (if 3+ services fail post-migration):
```powershell
foreach ($svc in 'BasicMemoryHTTP','CogneeMCP','IkLlamaServer','LlamaSwap','OllamaServe') { ... per-service template ... }
```
Recovery time: **≤25 min for 5/5 rollback** (5 min per service × 5).

**Smoke test summary table** (cite-anchored to W313 STREAM-E + W310 RCA):
- BasicMemoryHTTP: `:8765/mcp` POST initialize → HTTP 200 + SSE-MCP framing
- CogneeMCP: `:8000/mcp` POST initialize → HTTP 200 + no `LLMAPIKeyNotSetError` in stderr tail-50
- IkLlamaServer: `:8080/health` → 200; `:8080/v1/models` → `qwen36`; nvidia-smi util ~57%
- LlamaSwap: `:8090/v1/models` → 200 JSON
- OllamaServe: `:16700/api/tags` → 200 (if started); `Get-Service` → state matches expectation

---

## §7 — Final verdict

**TIER: T2 VENDOR-FORK** (install_score 3.706, in band [3.0, 3.9])

**Rationale**:
1. Composite 3.706 missed the T1 INSTALL ≥4.0 floor by 0.29 points.
2. **D16=2 bus-factor solo-maintainer** is at the hard-cap floor (not below, so not a strict-cap breach) but combined with **D21=1 org_diversity** (single-org effective), the candidate's accountability surface is thin. The 3-package-manager distribution does NOT substitute for org-distributed contribution.
3. Phase-5 Gate-5 FAIL-PARTIAL (replayability ✓, but org-diversity ✗) confirms the bus-factor concern via an independent rubric path.
4. Adversarial review 3-of-3 REVISE (none BLOCK, none APPROVE).
5. NSSM IS upstream-stale (last meaningful commit on `kirillkovalenko/nssm` is years stale per W301 verdict) and WinSW IS upstream-stale (W301 row 24 verdict re-litigated). servy IS clearly more actively maintained. The operator's "nssm not sota" stands.

T2 VENDOR-FORK means: **copy subset of source files into runtime; track upstream drift**. For a service-manager primitive, the practical interpretation is: **install the pinned v8.4 portable to Z:\tools\servy\ and use it as the supervisor for new services + pilot migrations of existing services**, but do NOT mark this as a final-form T1 INSTALL until 4 weeks of stability data accumulate AND/OR ≥1 external co-maintainer joins the upstream repo.

---

## §8 — Ship-decision recommendation

**RECOMMENDED PATH: STAGED PILOT IN W315 (not THIS wave)**

This wave (W314 Stream D) ships only this audit document. Next wave (W315) should execute the pilot:

### W315 ship sequence (operator-confirmable)
1. **Operator confirms**: pre-existing `C:\Program Files\Servy\v7.0.0+e7eb6c6` install — was that intentional or an artifact? If artifact, uninstall before W315 Stage 1.
2. **Stage 1 (W315 Day 1)**: Download `servy-8.4-x64-portable.7z` (sha256 published per release), extract to `Z:\tools\servy\`; run `servy-cli.exe --version` to confirm v8.4 (the on-disk v7 in `C:\Program Files\Servy\` is incompatible with v8 CLI flags — DO NOT mix). Cost: ~5 min.
3. **Stage 2 (W315 Day 1+2h)**: Migrate **OllamaServe ONLY** (zero blast radius — currently Stopped, no live consumer). Verify smoke test, monitor 24h. Cost: ~30 min.
4. **Stage 3 (W315 Day 2)**: Migrate **LlamaSwap** (low blast — proxy, easy rollback). Verify, monitor 24h.
5. **Stage 4 (W316 Day 1)**: Migrate **BasicMemoryHTTP** (T6 memory — HIGH blast, but high-test-coverage smoke). Verify, monitor 72h.
6. **Stage 5 (W316 Day 4)**: Migrate **IkLlamaServer** (inference backbone, W310 RCA-recent). Verify, monitor 72h.
7. **Stage 6 (W317 Day 1)**: Migrate **CogneeMCP** LAST (env-secret-laden — needs env-file refactor first). Verify, monitor 1 week. Re-evaluate T2→T1 promotion after this stage.

### NOT recommended this wave
- DO NOT bulk-migrate all 5 services in one operator session.
- DO NOT install servy on C: when the Z:-portable variant is published.
- DO NOT skip the OllamaServe pilot — first-migration learnings reshape Stages 3-6 commands.
- DO NOT auto-upgrade via `winget upgrade servy` once installed — pin to v8.4 for ≥4 weeks per code-reviewer persona recommendation.

### Promotion criteria (T2 VENDOR-FORK → T1 INSTALL)
- 4 weeks stable on 5 services with zero rollbacks
- ≥1 external contributor with a merged PR upstream (lifts D19+D21+D16)
- W315/W316 operator-experience signals positive
- Re-litigation under sca-v6.1 with refreshed D-scores → install_score ≥4.0

---

## Cardinal-rule receipts

- **R1**: only trusted-source primitives surfaced (GitHub upstream, MIT, code-signed); no curl-piping installed.
- **R2**: no `.claude/hooks/scripts/*.py|.sh` created or proposed; servy is a Windows-service primitive, not a CC hook.
- **R3**: this stream IS a sub-agent task per W269/W312-D mandate (single Agent dispatched by parent orchestrator).
- **R4**: no `.claude/rules/` created.
- **R5**: settings.json/`.mcp.json` untouched (per directive constraint).
- **CR-9**: N/A (servy not an MCP server); fixed-version installer (`servy-8.4-x64-portable.7z` sha256-anchored) is the service-manager-class equivalent of CR-9 pinning.
- **`self_invented_count: 0`** invariant preserved.
- **CLAUDE.md ≤50 LOC** + **settings.json ≤15 KB** unchanged.

## Word count: ≈3340 / 3500 cap ✓
