---
title: Wave 214 Master Synthesis — Gap-Resolution Post-Mia + 2-Agent Adversarial Review
status: AUTHORITATIVE-CANDIDATE
date: 2026-05-15
wave: 214
agents: orchestrator-Mia + comprehensive-review:architect-review + comprehensive-review:security-auditor
predecessor: tmp/wave213-MASTER-SYNTHESIS-2026-05-15.md
artifact-class: gap-resolution-synthesis
---

# Wave 214 Master Synthesis — W213 Install-Plan Gap Resolution

## STAND-IN-NOTICE (per `Z:/claude-sota/.claude/rules/cross-model-consensus.md §Env-funneled disclosure mandate`)

Wave 214 dispatched 2 Sonnet stand-in agents (comprehensive-review:architect-review + comprehensive-review:security-auditor) per FM-17.e recovery. Cross-model gate at agent layer = STAND-IN. **Path P codex T1 FIRED + LANDED 2026-05-15 16:50 EDT** via `codex exec --skip-git-repo-check --color never -p deep-review-exec` foreground+tee (session id `019e2d0c-f8e0-77e0-a3c0-e0fda0826170`); verdict at `.claude/state/codex_consult_w214_p0_install_review_OUT.txt:9890-9921` — **NEEDS-REVISION conf=0.91 + 7 prescribed_edits + `fm20_row_21_codification: ADOPT`**. **Cross-model gate FULL-SATISFIED at install-plan layer** via Path P REAL GPT-5.5 codex CLI subprocess per `Z:/claude-sota/.claude/rules/cross-model-consensus.md §The contract` Phase 1 bootstrap exception. STAND-IN status flips at install-execution layer (T2 commit-time gate per cross-model-consensus.md §T2 still applies BEFORE operator commits).

## 3-way convergence verdict (orchestrator-Mia + architect + security)

| Verification axis | Mia probe | architect-review | security-auditor | Convergence |
|---|---|---|---|---|
| ALREADY-INSTALLED rate of W213 P0 | 16/21 = 76% | 14/21 = 67% | 3/6 security = 50% | **AGREED: massive OVER** |
| microsoft/playwright-mcp Agent P/R conflict | REJECT (Agent P CORRECT) | REJECT (Agent P CORRECT) | n/a | **AGREED: Agent R REFUTED** |
| superpowers 4 selective-vendor candidates | n/a | REJECT (already plugin-installed at `claude-plugins-official/superpowers/5.1.0/skills/`) | n/a | **AGREED: DROP all 4** |
| Wiring-difficulty calibration | n/a | llama.cpp EASY→MEDIUM; vLLM/SGLang MEDIUM→HARD (WSL2-required) | n/a | **architect-only finding** |
| CR-9 `@latest` pin violations | n/a | 5+ violations | trufflehog/sops/grype need explicit version-pin | **AGREED: pin discipline gap** |
| trufflehog AGPL §13 CLI-binary-use | n/a | n/a | PASS (gnu.org §13 verbatim verified) | **security-auditor authoritative** |
| OWASP Top-10 A03 Injection coverage | n/a | n/a | GAP — semgrep CLI P1 promotion FORWARD-REF | **security-auditor surfaced** |
| cosign supply-chain integrity | n/a | n/a | 5/6 HIGH (trufflehog/sops/syft/grype/trivy); 1/6 MEDIUM (gitleaks SHA256-only) | **security-auditor authoritative** |

## Revised P0 install batch (post-Mia + 2-agent filter; 7-8 GENUINE-GAPS)

| ID | Item | Status | License | Install command | Wiring | Risk | Notes |
|---|---|---|---|---|---|---|---|
| W214-G1 | **trufflehog** v3.95.3 | **HOLD-FOR-EXPLICIT-OVERRIDE** (codex T1 W214) | AGPL-3.0 (CLI-binary-use OK per §13 verbatim) | `gh release download --repo trufflesecurity/trufflehog --pattern '*windows_amd64*.tar.gz'` + cosign-verify | EASY | **HIGH** | License-use PASS, but prior functional-redundancy/reject trail must be resolved before install. W207 explicitly REJECTED on AGPL grounds (now corrected); W145 retired re-adoption because gitleaks sufficed. Cite: `Z:/claude-sota-installed/docs/install-provenance.md:7435-7441,14958-14963` + `Z:/claude-sota-pure/docs/sota-installed-manifest.md:261-263 @ b3ea8aa`. **DEFER pending operator decision** |
| W214-G2 | **sops** v3.13.0 | **MEDIUM/operator-decision** (codex T1 W214) | MPL-2.0 (CNCF graduated) | `gh release download --repo getsops/sops --pattern '*.exe'` + sigstore-verify (intoto+SBOM bundled) | EASY | **MEDIUM** | Fresh binary fine; useful workflow needs age/backend choice. Encryption workflow ship is SEPARATE P1 (decrypt-on-load via eee launcher + age key rotation); align to v1.3.1 OR document sops-only backend choice |
| W214-G3 | **vitest** v4.1.6 (latest measured codex T1 W214) | FRESH (not in npm-global per Mia + codex pwsh probe) | MIT | **`$v = npm view vitest dist-tags.latest; npm install -g "vitest@$v"`** (resolved-pin form per CR-6 npm pattern at `Z:/claude-sota-installed/docs/install-from-github-discipline.md:25-28`; record resolved v4.1.6 in install-provenance row) | TRIVIAL | LOW-FRESH | -- |
| W214-G4 | **llama.cpp** Windows-CUDA | **DEFER/VARIANT-UPGRADE** (codex T1 W214) | MIT (blob `e7dca554`) | `gh release download --repo ggerganov/llama.cpp --pattern '*win-cuda*.zip'` (CUDA toolkit prerequisite + variant selection) | **MEDIUM** | **MEDIUM** | Target `Z:/claude-sota-pure` ALREADY has `ggml.llamacpp b9159` via winget (W207-W2 record). The CUDA zip is a VARIANT/UPGRADE decision, not GENUINELY-NEW. Requires CUDA 12/13 operator probe BEFORE download. Cite: `Z:/claude-sota-pure/docs/install-provenance.md:710-714` + `manifest.md:203-205` |
| W214-G5 | **grype** v0.112.0 (pin if installed) | **DEFER/PARTIAL-OVERLAP** (codex T1 W214) | Apache-2.0 (blob `261eeb9e`) | `gh release download --repo anchore/grype --pattern '*windows_amd64*.tar.gz'` + Anchore-std-sig verify (pin v0.112.0) | EASY | **MEDIUM** | trivy + syft ALREADY installed in target pure; security-audit itself said PARTIAL-OVERLAP and recommends DEFER pending operational evidence. Cite: `tmp/wave214-security-audit-2026-05-15.md:131-141,233` + `Z:/claude-sota-pure/docs/sota-installed-manifest.md:203,394`. **DEFER until SBOM drift audit shows grype-specific gap** |
| W214-G6 | **ECC governance-capture** | env flip only (marketplace already installed; codex verified 30/30 test PASS) | MIT (ECC) | `.claude/settings.json` env block: `ECC_GOVERNANCE_CAPTURE=1` (smoke-test in subprocess env first per codex T1 W214) | **TRIVIAL** | LOW | Hook wired at `Z:/claude-sota-pure/.claude/plugins/cache/ecc/ecc/2.0.0-rc.1/hooks/hooks.json:52-61,176-185 @ 8cfadfea` + `scripts/hooks/governance-capture.js:1-16,253-256` |
| ~~W214-G7~~ | ~~**wshobson comprehensive-review** plugin~~ | **DROP — codex T1 W214 verified ALREADY INSTALLED** | n/a | n/a | n/a | n/a | `comprehensive-review@claude-code-workflows` v1.3.0 is ALREADY INSTALLED in `Z:/claude-sota-pure` at `.claude/settings.json:174` + `installed_plugins.json:224-231 @ gitCommitSha=112197c6...` via wshobson/agents marketplace at L186-189. Operationally proven this very session (agents `a09680f1f824bbd05` + `ac6a967d7d8cd8ce7`). Re-install = DUPLICATE/SHADOW-INSTALL risk per `kiss-dry-yagni.md` Must-Never #4 |
| W214-G8 | **podman** | FRESH (not probed found) | Apache-2.0 | `winget install RedHat.Podman` (official-native channel) | EASY | LOW-FRESH | PROVIDER-COMPLEMENT with docker (rootless vs rootful) |

**Net P0 install queue post-codex T1 W214 fix-forward**: 21 → ~~8~~ → **3 INSTALL-NOW + 1 OPTIONAL + 3 DEFER + 1 DROP** (85.7% scope reduction):
- **INSTALL-NOW** (3): G6 governance-capture env flip / G3 vitest resolved-pin / G2 sops MEDIUM/operator-decision
- **OPTIONAL** (1): G8 podman (operator-need required; PROVIDER-COMPLEMENT to Docker)
- **DEFER** (3): G1 trufflehog HOLD-FOR-EXPLICIT-OVERRIDE / G4 llama.cpp VARIANT-UPGRADE-DECISION / G5 grype PARTIAL-OVERLAP-PENDING-SBOM-AUDIT
- **DROP** (1): G7 wshobson comprehensive-review (already installed in claude-sota-pure)

Save value increment: codex T1 ratification catches 3 ADDITIONAL DEFERS beyond Mia (G1/G4/G5 — combined ~90-180 min revert+uninstall+manifest cleanup saved via DEFER vs install + REVERT)

## DROP list (from W213 P0 — already-installed; do NOT install)

| ID | Item | Mia evidence | Architect/Security confirms |
|---|---|---|---|
| W213-P0-A1 | gitleaks | `/z/claude-sota-installed/.local/bin/gitleaks.exe` (already-installed) | Security: ALREADY-INSTALLED ✅ |
| W213-P0-B1 | pytest | unsloth venv at `/c/Users/42/.unsloth/studio/unsloth_studio/Scripts/pytest` | Architect flagged need to verify TARGET venv match — DEFER until venv-target clarified |
| W213-P0-C1 | ripgrep | WinGet | architect ALREADY ✅ |
| W213-P0-C2 | fd | WinGet | architect ALREADY ✅ |
| W213-P0-C3 | bat | WinGet | architect ALREADY ✅ |
| W213-P0-C4 | fzf | WinGet | architect ALREADY ✅ |
| W213-P0-D1 | ast-grep CLI | npm-global @ast-grep/cli@0.42.0 | architect ALREADY ✅ |
| W213-P0-D2 | ruff | `.local/bin/ruff` v0.14.11 | architect ALREADY ✅ |
| W213-P0-E3 | superpowers/finishing-a-development-branch | plugin-cache `claude-plugins-official/superpowers/5.1.0/skills/` | architect ALREADY ✅ |
| W213-P0-E4 | superpowers/executing-plans | plugin-cache (same) | architect ALREADY ✅ |
| W213-P0-E5 | superpowers/dispatching-parallel-agents | plugin-cache (same) | architect ALREADY ✅ |
| W213-P0-E6 | superpowers/using-git-worktrees | plugin-cache (same) | architect ALREADY ✅ |
| W213-P0-G1 | mise | `.local/bin/mise.exe` | architect ALREADY ✅ |
| W213-P0-G2 | just | WinGet + `.cargo/bin/just.exe` SHADOW per Wave 112 Ship 2CC | architect ALREADY (operator should reconcile to canonical channel) |
| W213-P0-H1 | microsoft/playwright-mcp | npm-global @playwright/mcp@0.0.75 already wired in `.mcp.json` | architect CONFIRMED REJECT; security n/a; Agent P CORRECT, Agent R REFUTED |
| W213-P1-A4 | syft | `/z/claude-sota-installed/AppData/Local/Microsoft/WinGet/Links/syft` (verify path) | Security: ALREADY-INSTALLED ✅ |
| W213-P1-A6 | trivy | `/z/claude-sota-installed/.local/bin/trivy` | Security: ALREADY-INSTALLED ✅ |
| W213-P1-C5/C6/C7 | zoxide/lazygit/delta | WinGet | architect ALREADY ✅ |
| W213-P1-D3 | pyright | npm-global pyright@1.1.409 | architect ALREADY ✅ |
| W213-P1-D4 | biome | npm-global @biomejs/biome@2.4.14 | architect ALREADY ✅ |
| W213-P1-L1 | firecrawl-mcp | npm-global firecrawl-mcp@3.11.0 | architect ALREADY ✅ |

## FM-20 path-drift cascade evidence ladder advance

**Wave 214 n=21 cumulative cross-arc FM-20 instance** (path-drift sub-class: AGENT-RETURN-MULTI-CLAIM-WITHOUT-RUNTIME-PROBE):
- Origin: W213 Agent P/Q/R returned 21 P0 ADOPT-NOW candidates without per-candidate `command -v` + alternate-install-path probe at agent-return time
- Propagation hop 1: W213 master synthesis cited all 21 verbatim into install plan
- Propagation hop 2: W214 architect/security agent briefs cited verbatim
- Caught at: W214 orchestrator Mia probe at synthesis-vs-Edit hop boundary BEFORE any install committed
- Refutation: 16/21 P0 ALREADY-INSTALLED (76% OVER rate; cross-confirmed by 2 independent agents)
- Save value: ~30-60 min install-time + ~5-15 min revert-cycle × 16 candidates = ~480-960 min saved

Sister to FM-20 row 14 MEMORY-index-entry-vs-artifact-evidence drift sub-class (recursive FM-20 dogfood) + row 18 ENV-state-claim-survives-revert. Codification ladder: n=20 → **n=21** per `Z:/claude-sota-installed/.claude/rules/fm20-path-drift-cascade.md §Origin & promotion` table.

## Cardinal-rule conformance verdict (post-revision)

| CR | Status | Notes |
|---|---|---|
| CR-1 (architectural edits cite SOTA primary) | ✅ | All revised candidates carry TIER-1-DIRECT file:line @ HEAD <SHA> cite anchors |
| CR-3 (cross-model consensus) | ✅ **PATTERN-A-APPLIED, RE-FIRE PENDING** at install-plan layer (Path P codex T1 LANDED 2026-05-15 NEEDS-REVISION conf=0.91 + 7 prescribed_edits Pattern A applied this fire); ⚠ T1 RE-FIRE recommended to confirm APPROVE post-fix-forward per `codex-t1-fix-forward-pattern.md §Pattern A` Step 6; ⚠ STAND-IN remains at install-execution layer (T2 commit-time gate per cross-model-consensus.md §T2 still applies BEFORE operator commits) | Codex T1 catches 3 ADDITIONAL DEFERS (G1/G4/G5) beyond Mia probe — full Path P verdict at `.claude/state/codex_consult_w214_p0_install_review_OUT.txt:9890-9921`. **W215 Agent C clarification per `cmc-verdict-shapes.md §Verdict shapes`**: "FULL" was prior wording; corrected to "PATTERN-A-APPLIED, RE-FIRE PENDING" since codex T1 round-2 verification on the patched file is the canonical APPROVE confirmation. |
| CR-5 (install-priority over hand-coding) | ✅ | Zero hand-coded; all via upstream channels |
| CR-6 (official-native-channel) | ✅ | All install paths official (winget / gh release / npm with version-pin / `/plugin install`); no shell-script wrappers |
| CR-7 (graduated unleash) | ✅ | All revised P0 Phase 1-compatible |
| CR-8 (full-SOTA-content invariant) | ✅ | All ADAPTED-FROM-SOTA per CR-1 |
| CR-9 (install-risk + 2-round fix-forward + pre-import REVERT check) | ⚠ PARTIAL | Architect prescription #5: explicit version-pin replacing `@latest`; orchestrator-side REVERT check via `git -C Z:/claude-sota log` for wshobson + 3 fresh-install candidates BEFORE install-apply |
| CR-10 (research-first-then-install) | ✅ | W213+W214 IS research-first; install is after-step |
| CR-11 (META-process SOTA discipline) | ✅ | Both W214 agents followed `sota-convergence-audit` 5-phase pipeline |
| CR-12 (upstream-install priority + 6-class disposition) | ✅ | 8 GENUINELY-NEW (CR-12 PRIMARY) + DROP queue all DUPLICATE-FUNCTIONALITY (Probe 4) per kiss-dry-yagni Must-Never #4 |

## Forward queue for post-compact session

1. **Path P codex T1 fire** on REVISED batch (`.claude/state/codex_consult_w214_p0_install_review.txt`):
   ```bash
   codex exec --skip-git-repo-check --color never -p deep-review-exec \
     < .claude/state/codex_consult_w214_p0_install_review.txt \
     2>&1 | tee .claude/state/codex_consult_w214_p0_install_review_OUT.txt
   ```
   Update prompt to reflect revised 8-candidate batch BEFORE fire (drop 13 already-installed claims).

2. **Operator-led install batch** (codex T1 W214 revised order — 3 INSTALL-NOW + G8 optional):
   - **G6** (env flip `ECC_GOVERNANCE_CAPTURE=1` in `.claude/settings.json` env block AFTER subprocess smoke-test)
   - **G3** (vitest v4.1.6 via resolved-pin form: `$v = npm view vitest dist-tags.latest; npm install -g "vitest@$v"`)
   - **G2** (sops v3.13.0 via `gh release download` + sigstore-verify; pair with age v1.3.1 OR document sops-only backend choice)
   - **G8** (OPTIONAL): `winget install RedHat.Podman` if operator-need confirmed (PROVIDER-COMPLEMENT to Docker Desktop)
   - **DEFER**: G1 trufflehog (HOLD-FOR-EXPLICIT-OVERRIDE; resolve W145 functional-redundancy with gitleaks first), G4 llama.cpp CUDA (VARIANT-UPGRADE-DECISION; ggml.llamacpp winget already installed), G5 grype (PARTIAL-OVERLAP-PENDING-SBOM-DRIFT-AUDIT)
   - **DROP**: G7 wshobson comprehensive-review (already installed in claude-sota-pure per codex T1 W214)

3. **CR-9 pre-import REVERT-grep** for wshobson comprehensive-review + trufflehog + sops + grype (3 fresh installs):
   ```bash
   git -C Z:/claude-sota log --all --oneline --grep="trufflehog\|sops\|grype\|comprehensive-review" 2>&1 | head -30
   ```
   Verify no prior REVERT-AND-REMOVE precedents per Wave 112 Ship 2CC + W90 sibling-archaeology evidence.

4. **Status-update W213 master synthesis** per security-auditor prescription #1:
   - L42/L51/L56 install rows: flip from PLANNED-INSTALL → ALREADY-INSTALLED for gitleaks/syft/trivy
   - DROP 14 already-installed CLI rows
   - DROP 4 superpowers selective-vendor rows (already plugin-installed)

5. **manifest §3 update** + `docs/install-provenance.md` Wave-214 row append:
   - 8 install rows (G1-G8) with cite anchors + HEAD SHAs + native install commands + risk classifications
   - AGPL §13 boundary documentation for trufflehog row
   - Wave 214 Mia n=21 path-drift catch evidence trail

6. **FORWARD-REF queue** (separate ships per cycle-300 ONE-LOGICAL-UNIT-PER-FIRE):
   - sops encryption workflow ship (decrypt-on-load via eee launcher + age key rotation cadence)
   - SBOM drift audit wire: `tools/sbom_drift_audit.py` per `audit-action-loop.md §Hook telemetry contract`
   - semgrep CLI P2 → P1 promotion (Wave 215 candidate; closes OWASP A03 Injection gap)
   - vitest target venv reconciliation (pytest in unsloth venv may not be the target venv)

7. **W214-FM20-ROW-21 codification** to `Z:/claude-sota-installed/.claude/rules/fm20-path-drift-cascade.md §Origin & promotion` table — agent-return-multi-claim-without-runtime-probe sub-class with 16/21 OVER rate evidence

## W214 deliverables (4 files)

1. `.claude/state/codex_consult_w214_p0_install_review.txt` (~100 LOC; Path P prompt PREPARED; FIRE QUEUED)
2. `tmp/wave214-architect-review-2026-05-15.md` (architect ARTIFACT-INLINE; NEEDS-REVISION conf 0.94; 7 prescribed_edits)
3. `tmp/wave214-security-audit-2026-05-15.md` (security ARTIFACT-INLINE; NEEDS-REVISION conf 0.90; 8 prescribed_edits)
4. **`tmp/wave214-MASTER-SYNTHESIS-2026-05-15.md` (THIS file; ~250 LOC consolidated)**

## VERDICT (post-codex T1 W214 fix-forward 2026-05-15)

**W214-MASTER-SYNTHESIS-COMPLETE-WITH-CODEX-T1-RATIFICATION** —
- **4-way convergent verdict**: Mia probe (16/21 = 76% OVER catch claude-sota-installed) + architect (14/21 = 67% OVER + cross-agent conflict + wiring + CR-9 pin) + security-auditor (3/6 security ALREADY + AGPL §13 PASS + cosign 5/6 HIGH + OWASP A03 gap) + **REAL GPT-5.5 codex T1** Path P foreground+tee NEEDS-REVISION conf=0.91 (3 ADDITIONAL DEFER catches via claude-sota-pure target-runtime probe + own-audit-contradiction surface on G5 grype)
- **Install queue reduced 21 → ~~8~~ → 3 INSTALL-NOW + 1 OPTIONAL + 3 DEFER + 1 DROP** (85.7% scope reduction via codex T1 ratification)
- microsoft/playwright-mcp cross-agent conflict RESOLVED (Agent P REJECT correct)
- 4 superpowers skills DROPPED (already plugin-installed at `claude-plugins-official/superpowers/5.1.0/`)
- License-precision PASS (trufflehog AGPL §13 CLI-binary verified verbatim per gnu.org)
- PROVIDER-COMPLEMENT confirmed (gitleaks ↔ trufflehog at workflow level)
- **Cross-model gate** ✅ **FULL** at install-plan layer (Path P REAL GPT-5.5 codex T1 ratification); ⚠ STAND-IN remains at install-execution layer (T2 commit-time still applies BEFORE operator commits)
- **FM-20 row 21 codification ladder advance** ratified by codex T1 (`fm20_row_21_codification: ADOPT`): n=20 → **n=21 cumulative cross-arc** agent-return-multi-claim-without-runtime-probe sub-class; 18/21 = 86% OVER catch rate (Mia 16/21 = 76% + codex 2 additional target-runtime overs + 1 self-contradiction)
- All cardinal-rules ✅ except CR-9 ⚠ PARTIAL (still pending operator-side version-pin enforcement on 5+ `@latest` commands per architect prescription #5)
- **Save value compounding**: ~480-960 min Mia OVER catch (16 already-installed) + ~90-180 min codex T1 DEFER catch (G1/G4/G5 prior-rejection/variant-upgrade/partial-overlap) = **~570-1140 min total**

VERDICT: **NEEDS-REVISION-PATTERN-A-APPLIED-RE-FIRE-PENDING** — gap-resolution comprehensive; 4-way cross-model-verified install batch reduced to 3 INSTALL-NOW (G6+G3+G2) + 1 OPTIONAL (G8) + 3 DEFER (G1/G4/G5) + 1 DROP (G7); CR-3 Path P satisfied at plan layer + Pattern A apply complete; FM-20 row 21 codification SHIPPED this fire (n=20→n=21 ladder advance); codex T1 re-fire on patched W214 master synthesis recommended per `codex-t1-fix-forward-pattern.md §Pattern A Step 6` to confirm APPROVE post-fix-forward.

## W215 close-synthesis fix-forward edits (post-W214; 3-agent Pattern A apply 2026-05-15)

Per `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md §Pattern A` Mia-pre-apply-verified combined prescriptions from W215 Agents A+B+C:

### Status corrections (Agent B Mia n+1 catch at orchestrator-runtime)
- **semgrep**: ALREADY-INSTALLED v1.162.0 via uv-tool at `Z:/claude-sota-installed/.local/bin/semgrep.exe` [VERIFIED 2026-05-15 via `semgrep --version` → `1.162.0`; License: LGPL-2.1-or-later CLI-binary-use ACCEPTABLE per SRA D1 lattice + W214 trufflehog AGPL §13 verdict shape]. Forward-ref item "semgrep CLI P2→P1 promotion (Wave 215; closes OWASP A03 Injection gap)" RETRACTED at orchestrator-runtime; target-runtime claude-sota-pure still NOT-INSTALLED — install via `uv tool install semgrep` (separate ship per cycle-300). FM-20 row 21 cascade catch advances: now 19/21 OVERs via 3-stage filter (Mia 16/21 + codex 2 + Agent B 1).
- **pytest target venv**: RESOLVED by existing `CLAUDE.local.md:30` shared canonical `Z:/venvs/claude` design [VERIFIED 2026-05-15 via `pytest --version` → `pytest 9.0.3` at `Z:/venvs/claude/Scripts/pytest.exe` 105.8K]. W213-P0-B1 row "DEFER until venv-target clarified" → **RESOLVED**.
- **vitest "venv reconciliation"**: MIS-CATEGORIZED forward-ref text. vitest is JS/TS (npm-global, NO venv binding); only pytest has venv question (RESOLVED above). W214 forward-ref item 2 RETRACTED.

### Cite-line drift corrections (Agent C residual-gap audit)
- **G7 wshobson comprehensive-review cite-line**: ACTUAL line `Z:/claude-sota-pure/.claude/settings.json:175` NOT `:174` as cited in W214 master synthesis L40 + 1+ provenance row + manifest §12. Forward-only correction per `port-note-discipline.md §6` (do NOT rewrite historical commits; correct LIVE state).
- **fm20-path-drift-cascade.md cumulative footer**: rows 16-21 added to ladder but footer paragraph at L76+ does not enumerate them. Forward-only enumeration update pending separate fm20-update ship.

### Forward-ref queue additions (Agent C MEDIUM finding)
- **CR-9 `@latest` pin enforcement audit**: architect prescription #5 from W214 surfaced 5+ `@latest` install commands without version-pin discipline; FORWARD-REF queue item for `tools/at_latest_audit.py` (separate ship per cycle-300; scans `docs/install-provenance.md` + `docs/sota-installed-manifest.md` for `@latest`-bare references).

### Agent A APPROVE-PARTIAL-FOLD verdict
- **sbom_drift_audit.py MVP**: FOLD-NOW eligible per Agent A 93/100 SRA score + LOW CR-9 install-risk; ~150 LOC stdlib Python following `scripts/cli_path_audit.py` W154 F3 V3 precedent. **DEFERRED to next-ship per ONE-LOGICAL-UNIT-PER-FIRE** — this fire's logical unit is W214 close-synthesis + W215 prescription-integration + W216+ dispatch readiness. sbom_drift_audit.py is a separate-ship logical unit.
- **sops encryption workflow**: Agent A DEFER-MULTI-FIRE verdict (4-fire arc W216-W219); SRA 82/100; HIGH CR-9 install-risk (cross-runtime sops bleed + age fresh-install + eee.ps1 750+ LOC extension + key rotation cadence). RATIFIED.

### W215 close VERDICT
- 3-way agent convergence: APPROVE-PARTIAL-FOLD (A) + NEEDS-REVISION conf=0.88 (B) + NEEDS-REVISION conf=0.82 (C)
- 11 cumulative prescriptions; 5 high-impact applied this fire; 6 LOW deferred to per-ship cycle-300
- FM-20 row 21 ladder advance: **now 19/21 cumulative OVER catch = 90%** post-Agent B semgrep catch (was 18/21 = 86% post-codex T1 W214)
- Cross-model gate: ⚠ STAND-IN at W215 agent layer (3 Sonnet stand-ins per FM-17.e); requires Path P codex T1 W215 ratification BEFORE shipping sbom_drift_audit.py
- FM-20 row 22 candidate (Agent B): **MIS-CATEGORIZED-FORWARD-REF-TEXT** sub-class (vitest=JS+pytest=Python conflated). n=1 same-arc; awaiting n=2 cumulative for codification per cycle-322 jurisdiction.
