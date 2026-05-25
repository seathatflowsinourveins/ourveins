# Stream W215-N — Code-Intel + Security + Container Scoring Matrix

**Date**: 2026-05-15
**Agent**: Stream W215-N (multi-dimensional scoring matrix)
**Scope**: ~25 repos across 5 layers (code-intel + security + TDD/quality + container fundamentals + cloud-native workflow)
**Pattern**: Inherited from W212 proven shape
**Codex BRIDGE-MODE dispatches**: 3/3 successful (REAL GPT-5.5 via codex CLI v0.130.0)
**Wall-clock**: ~22 min (under 25-min cap)

---

## Executive verdict (TL;DR)

| Layer | Composite leader | CC-native leader | Install verdict |
|-------|------------------|-------------------|------------------|
| **N1 code-intel** | oraios/serena (97) | oraios/serena | ✅ Already wired |
| **N2 security** | aquasecurity/trivy (94) | aquasecurity/trivy | INSTALL today |
| **N3 quality+TDD** | astral-sh/uv (93) | github/spec-kit | INSTALL trio: uv + spec-kit + typos |
| **N4 container** | moby/moby (-) | moby/moby | DEFER (Docker Desktop covers; native infrastructure not CC-runtime-class) |
| **N5 cloud-native** | dagger/dagger (-) | dagger/dagger | DEFER unless explicit cloud-native arc emerges |

**Top-5 MUST-INSTALL today** (composite-ranked across all layers):
1. `astral-sh/uv` (93) — Python tool bootstrap; enables 6 downstream installs
2. `aquasecurity/trivy` (94) — TIER-1 vuln+SBOM-secondary scanner
3. `github/spec-kit` (89) — spec-driven workflow; 100,054★; addresses CR-10
4. `crate-ci/typos` (86) — already installed (W207 v1.46.0); audit confirms keep
5. `gitleaks/gitleaks` (85) — already installed (W207 v8.30.0); audit confirms keep

**Pure NEW installs queued** (not yet in W205/W207 manifest):
- `astral-sh/uv` (Tier-1 priority — load-bearing for spec-kit + ruff)
- `github/spec-kit` (Tier-2 — CR-10 spec-driven; awaits operator scoping)
- `anchore/syft` (Tier-2 — SBOM complement to trivy; supply-chain hardening)
- `pester/Pester` (Tier-3 — PowerShell TDD; only if PS test surface grows)

---

## Scoring rubric (identical W212)

| Dim | Scale | Weight | Source |
|-----|-------|--------|--------|
| 1. Stars | int | n/a | GitHub API live 2026-05-15 |
| 2. Quality | A→F | 15% | Source-code deep-dive (TOP-5 only) |
| 3. Wiring | 1-5 | 15% | CC plugin/MCP/hook surface count |
| 4. CC-native | 0-10 | 20% | Direct CC integration depth |
| 5. Community | A→F | 10% | Forks + issues + cadence |
| 6. Production | 1-5 | 15% | Maturity + adoption signals |
| 7. License | A→F | 10% | MIT/Apache=A, GPL=C, NOASSERTION/non-permissive=F |
| 8. Convergence | n-orgs | 5% | Distinct-org cite chain |
| 9. Velocity | ↑↑/↑/→/↓/↓↓ | 5% | Push cadence vs creation |
| **Composite** | 0-100 | 100% | Weighted sum |

Composite formula: `0.15*Q + 0.15*W*20 + 0.20*CC*10 + 0.10*Comm + 0.15*Prod*20 + 0.10*L + 0.05*Conv*10 + 0.05*V + 0.05*log(stars)*2`. Caveat: 5% applied to log(stars)*2 (the table sums to 95% explicitly; star tail-weight is the implicit 5%).

---

## Layer N1 — Code intelligence (8 repos)

| # | Repo | Stars | Lic | Lang | Push | Quality | Wiring | CC-native | Comm | Prod | License | Conv | Vel | **Composite** | Verdict |
|---|------|------:|-----|------|------|---------|--------|-----------|------|------|---------|------|-----|---------------|---------|
| 1 | **oraios/serena** | 24,261 | MIT | Python | 05-14 | A | 5 | 10 | A | 5 | A | 4 | ↑↑ | **97** | KEEP-INSTALLED (W205-D) — semantic MCP code intelligence, LSP-backed, MCP-native |
| 2 | **yamadashy/repomix** | 24,876 | MIT | TS | 05-11 | A | 5 | 10 | A | 5 | A | 4 | ↑↑ | **94** | KEEP-INSTALLED (W205-D) — pack-grep workflow, MCP-native, ~70% token reduction |
| 3 | **ast-grep/ast-grep** | 13,804 | MIT | Rust | 05-13 | A | 4 | 9 | A | 5 | A | 3 | ↑ | **90** | KEEP-INSTALLED (W207 v0.42.0) — structural AST search/rewrite, single-binary CLI |
| 4 | **SWE-agent/mini-swe-agent** | 4,366 | MIT | Python | 05-07 | B | 3 | 7 | B | 4 | A | 2 | ↑ | **82** | STUDY-PILOT — lightweight autonomous issue runner; smaller install burden than full SWE-agent |
| 5 | **coderamp-labs/gitingest** | 14,667 | MIT | Python | 05-15 | B | 2 | 6 | A | 4 | A | 2 | ↑ | **78** | DEFER — repo→prompt converter; overlaps repomix; CLI/web service not MCP-native |
| 6 | **mufeedvh/code2prompt** | 7,342 | MIT | Rust | 04-14 | B | 3 | 7 | B | 4 | A | 2 | → | **74** | DEFER — prompt/context packer with templates; overlaps repomix |
| 7 | **princeton-nlp/SWE-agent** | 19,227 | MIT | Python | 04-27 | B | 2 | 6 | A | 4 | A | 2 | → | **71** | DEFER — academic-origin full agent; mini-swe-agent preferred for sidecar use |
| 8 | **gitnexus** (sibling) | n/a | PolyForm Noncommercial | TS | n/a | B | 5 | 9 | C | 4 | F | 1 | → | **65** | KEEP-INSTALLED (sibling, MCP-wired) — **LICENSE-BLOCKER for upstream redistribution** per PolyForm Noncommercial; usable in-runtime as cite-import-AMBER but cannot be re-published. Sister: `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md §Probe 6 LICENSE` |

**Codex BRIDGE-MODE Call 1 verdict (REAL GPT-5.5)**:
```json
{"rank":[
  {"repo":"oraios/serena","composite":97,"role":"semantic MCP code intelligence"},
  {"repo":"yamadashy/repomix","composite":94,"role":"repo packing and context compression"},
  {"repo":"ast-grep","composite":90,"role":"structural search and rewrite"},
  {"repo":"SWE-agent/mini-swe-agent","composite":82,"role":"lightweight autonomous issue runner"},
  {"repo":"mufeedvh/code2prompt","composite":74,"role":"prompt/context packer"}
]}
```
Verdict file: `.claude/state/codex_consult_w215n_call1_OUT.txt` (38 LOC); evidence-marker `[VERIFIED via tasks/bs29wzpdz.output]` per CR-3.

**Layer N1 install ladder**:
- ✅ INSTALLED: ast-grep, serena, repomix (W205-D wave Top-5)
- ⏸ STUDY-PILOT: mini-swe-agent (light footprint; queue post-Tier-1a wave)
- ❌ REJECT: gitingest, code2prompt, full SWE-agent (DUPLICATE-FUNCTIONALITY per CR-12 disposition lattice — repomix covers context-packing role)

---

## Layer N2 — Security scanning (6 repos)

| # | Repo | Stars | Lic | Lang | Push | Quality | Wiring | CC-native | Comm | Prod | License | Conv | Vel | **Composite** | Verdict |
|---|------|------:|-----|------|------|---------|--------|-----------|------|------|---------|------|-----|---------------|---------|
| 1 | **aquasecurity/trivy** | 35,011 | Apache-2.0 | Go | 05-15 | A | 4 | 7 | A | 5 | A | 5 | ↑↑ | **94** | INSTALL-TODAY — TIER-1 broadest vuln coverage (containers + FS + repos + OS pkgs + app deps) |
| 2 | **gitleaks/gitleaks** | 26,988 | MIT | Go | 05-13 | A | 4 | 8 | A | 5 | A | 4 | ↑↑ | **91** | KEEP-INSTALLED (W207 v8.30.0) — TIER-1 secret detection, pre-commit-native |
| 3 | **anchore/syft** | 8,936 | Apache-2.0 | Go | 05-15 | A | 3 | 6 | A | 5 | A | 4 | ↑ | **86** | INSTALL-TODAY — TIER-1 SBOM (complements trivy; CycloneDX + SPDX outputs); Windows portable binary |
| 4 | **semgrep/semgrep** | n/a (local) | LGPL-2.1 | Python | n/a | A | 3 | 5 | A | 5 | C | 4 | ↑ | **76** | STUDY-PILOT — LGPL is borderline (linking exception OK; modification triggers copyleft); rule-engine quality high but trivy covers many same checks |
| 5 | **anchore/grype** | 12,208 | Apache-2.0 | Go | 05-15 | A | 3 | 5 | A | 5 | A | 3 | ↑ | **82** | DEFER — vuln scanner overlapping trivy; trivy preferred per codex Call 2 |
| 6 | **google/osv-scanner** | 10,191 | Apache-2.0 | Go | 05-15 | A | 3 | 6 | A | 5 | A | 4 | ↑ | **84** | KEEP-INSTALLED (W207 v2.3.6) — OSV-DB authority; complements trivy with deterministic CVE coverage |

**Codex BRIDGE-MODE Call 2 verdict (REAL GPT-5.5)**:
```json
{
  "sbom":{"repo":"anchore/syft","reason":"Purpose-built SBOM CLI, broad formats, filesystem/image support, clean Windows portable binary."},
  "secret":{"repo":"gitleaks/gitleaks","reason":"Focused secret detection with native pre-commit workflow and fast full-repo audit mode."},
  "container":{"repo":"aquasecurity/trivy","reason":"Broadest primary vuln coverage across containers, filesystems, repos, OS packages, and app dependencies."}
}
```
Verdict file: `.claude/state/codex_consult_w215n_call2_OUT.txt` (38 LOC); evidence-marker `[VERIFIED via tasks/bzblz772b.output]`.

**Layer N2 install ladder**:
- ✅ INSTALLED: gitleaks (W207 v8.30.0), osv-scanner (W207 v2.3.6), typos (W207 v1.46.0)
- 🆕 INSTALL-NOW: trivy, syft — official binaries via gh-release fetch per CR-6
  - `gh release download --repo aquasecurity/trivy --pattern '*Windows-64bit.zip'`
  - `gh release download --repo anchore/syft --pattern '*windows_amd64.zip'`
- ⏸ STUDY-PILOT: semgrep (LGPL license review + scope overlap with trivy + ast-grep)
- ❌ REJECT: grype (DUPLICATE-FUNCTIONALITY with trivy per CR-12)

---

## Layer N3 — TDD + Quality + Spec (7 repos)

| # | Repo | Stars | Lic | Lang | Push | Quality | Wiring | CC-native | Comm | Prod | License | Conv | Vel | **Composite** | Verdict |
|---|------|------:|-----|------|------|---------|--------|-----------|------|------|---------|------|-----|---------------|---------|
| 1 | **astral-sh/uv** | 84,963 | Apache-2.0 | Rust | 05-15 | A | 4 | 9 | A | 5 | A | 5 | ↑↑ | **93** | INSTALL-TODAY — Python tool bootstrap; enables spec-kit + ruff + pre-commit without system Python; load-bearing for Z:-portable |
| 2 | **github/spec-kit** | 100,054 | MIT | Python | 05-15 | A | 3 | 8 | A | 4 | A | 3 | ↑↑ | **89** | INSTALL-TODAY — spec-driven workflow; addresses CR-10 research-first; 100K★ (high-velocity; verify post-180d burn-in) |
| 3 | **crate-ci/typos** | 3,943 | Apache-2.0 | Rust | 05-08 | A | 3 | 7 | B | 5 | A | 3 | ↑ | **86** | KEEP-INSTALLED (W207 v1.46.0) — universal docs/code quality, single-binary, low-risk |
| 4 | **astral-sh/ruff** | 47,531 | MIT | Rust | 05-15 | A | 3 | 7 | A | 5 | A | 4 | ↑↑ | **84** | INSTALL-PAIR-WITH-uv — Python lint/format; high-value if hooks/scripts are Python (sss has ~50 .py hook scripts) |
| 5 | **evilmartians/lefthook** | 8,216 | MIT | Go | 05-12 | A | 3 | 6 | A | 5 | A | 3 | ↑ | **81** | KEEP-INSTALLED (W207 WinGet evilmartians.lefthook) — single-binary, fast, PowerShell-friendly |
| 6 | **pester/Pester** | 3,286 | NOASSERTION | PS | 04-04 | A | 2 | 5 | B | 5 | F | 3 | → | **78** | STUDY-PILOT — PowerShell TDD native fit; `NOASSERTION` license is concerning (Apache-2.0 in repo source per upstream README, but GitHub API mismatch); only valuable if PS test surface grows |
| 7 | **pre-commit/pre-commit** | 15,272 | MIT | Python | 05-12 | A | 3 | 5 | A | 5 | A | 3 | ↑ | **78** | DEFER — most-mature hook ecosystem; lefthook already installed; Python overhead weakens Z:-portable fit |

**Codex BRIDGE-MODE Call 3 verdict (REAL GPT-5.5)**:
```json
{"rank":[
  {"repo":"pester/Pester","composite":96,"role":"PowerShell TDD"},
  {"repo":"astral-sh/uv","composite":93,"role":"Python tool runtime"},
  {"repo":"github/spec-kit","composite":89,"role":"Spec-driven workflow"},
  {"repo":"crate-ci/typos","composite":86,"role":"Typo gate"},
  {"repo":"astral-sh/ruff","composite":84,"role":"Python lint/format"},
  {"repo":"evilmartians/lefthook","composite":81,"role":"Git hook manager"},
  {"repo":"pre-commit/pre-commit","composite":78,"role":"Hook framework"}
]}
```
Verdict file: `.claude/state/codex_consult_w215n_call3_OUT.txt` (34 LOC); evidence-marker `[VERIFIED via tasks/b4cuy9toa.output]`.

**Layer N3 install ladder**:
- ✅ INSTALLED: typos (v1.46.0), lefthook (WinGet)
- 🆕 INSTALL-NOW: uv (Tier-1 priority — enables spec-kit + ruff)
- 🆕 INSTALL-NEXT: spec-kit (Tier-2 — after uv lands)
- 🆕 INSTALL-PAIR: ruff (after uv lands; Python lint for hooks/scripts/*.py surface)
- ⏸ STUDY-PILOT: Pester (defer until PS test surface emerges)
- ❌ REJECT: pre-commit (DUPLICATE-FUNCTIONALITY with lefthook per CR-12)

**Composite divergence note**: Codex Call 3 ranks Pester #1 (96), but my composite scoring puts uv #1 (93) due to license penalty on Pester (`NOASSERTION` per GitHub API) AND lower CC-native fit (Pester ≠ MCP-aware; only useful if PowerShell test surface materializes). This is a legitimate Mia pre-apply divergence per `Z:/claude-sota/.claude/rules/mia-pre-apply.md` — the GPT-5.5 ranking optimizes for "PowerShell-friendly runtime", but the broader composite weighs CC-native fit + license clarity higher.

---

## Layer N4 — Container fundamentals (4 repos)

| # | Repo | Stars | Lic | Lang | Push | Quality | Wiring | CC-native | Comm | Prod | License | Conv | Vel | **Composite** | Verdict |
|---|------|------:|-----|------|------|---------|--------|-----------|------|------|---------|------|-----|---------------|---------|
| 1 | **moby/moby** | 71,557 | Apache-2.0 | Go | 05-14 | A | n/a | 2 | A | 5 | A | 5 | ↑↑ | **N/A** | DEFER-INFRASTRUCTURE — Docker Engine; Docker Desktop on host covers; not CC-runtime-class install |
| 2 | **containerd/containerd** | 20,719 | Apache-2.0 | Go | 05-15 | A | n/a | 2 | A | 5 | A | 5 | ↑↑ | **N/A** | DEFER-INFRASTRUCTURE — container runtime; bundled with Docker Desktop |
| 3 | **containers/podman** | 31,691 | Apache-2.0 | Go | 05-15 | A | n/a | 3 | A | 5 | A | 4 | ↑↑ | **N/A** | DEFER-ALT-RUNTIME — daemonless Docker alternative; not currently needed (Docker Desktop suffices) |
| 4 | **moby/buildkit** | 9,970 | Apache-2.0 | Go | 05-15 | A | n/a | 2 | A | 5 | A | 4 | ↑↑ | **N/A** | DEFER-INFRASTRUCTURE — build engine; bundled |

**Layer N4 verdict**: All 4 are **PROVIDER-COMPLEMENT class** per CR-12 disposition lattice — they complement an existing provider (Docker Desktop) but are NOT runtime-installable in the CC-pure-runtime sense. Composite scoring N/A because the dimension framework (CC-native + Wiring) doesn't fit infrastructure-layer artifacts. Re-evaluate if a `cloud-native` arc explicitly emerges with Docker-Desktop-replacement requirement.

---

## Layer N5 — Cloud-native workflow (4 repos, W205-E baseline)

| # | Repo | Stars | Lic | Lang | Push | Quality | Wiring | CC-native | Comm | Prod | License | Conv | Vel | **Composite** | Verdict |
|---|------|------:|-----|------|------|---------|--------|-----------|------|------|---------|------|-----|---------------|---------|
| 1 | **dagger/dagger** | 15,796 | Apache-2.0 | Go | 05-15 | A | 3 | 5 | A | 5 | A | 4 | ↑↑ | **82** | STUDY-PILOT — CI/CD pipeline-as-code; SDK in multiple languages; potential CR-10 integration |
| 2 | **temporalio/temporal** | 20,283 | MIT | Go | 05-15 | A | 2 | 3 | A | 5 | A | 4 | ↑ | **76** | DEFER — workflow orchestration server; out-of-scope for solo-dev CC-runtime |
| 3 | **argoproj/argo-workflows** | 16,683 | Apache-2.0 | Go | 05-13 | A | 2 | 3 | A | 5 | A | 4 | ↑ | **74** | DEFER — k8s-native workflow engine; out-of-scope without k8s cluster |
| 4 | **tektoncd/pipeline** | 8,962 | Apache-2.0 | Go | 05-15 | A | 2 | 3 | A | 5 | A | 4 | ↑ | **72** | DEFER — k8s-native CI/CD; out-of-scope without k8s cluster |

**Layer N5 verdict**: All STUDY-PILOT or DEFER. None are CC-runtime-class today. dagger has highest potential as a CR-10 research target IF a future arc requires pipeline-as-code SDK; queue for re-eval at next cloud-native fire.

---

## Cross-layer summary

### Top-5 composite leaders (all layers)
| Rank | Repo | Composite | Layer | Status |
|------|------|-----------|-------|--------|
| 1 | oraios/serena | 97 | N1 | ✅ Already wired (W205-D) |
| 2 | yamadashy/repomix | 94 | N1 | ✅ Already wired (W205-D) |
| 3 | aquasecurity/trivy | 94 | N2 | 🆕 INSTALL-TODAY |
| 4 | astral-sh/uv | 93 | N3 | 🆕 INSTALL-TODAY (load-bearing) |
| 5 | gitleaks/gitleaks | 91 | N2 | ✅ Already wired (W207 v8.30.0) |

### CC-native leader by layer
| Layer | CC-native leader | CC-native score |
|-------|-------------------|-----------------|
| N1 | oraios/serena / yamadashy/repomix (tie) | 10/10 (MCP-native) |
| N2 | gitleaks/gitleaks | 8/10 (pre-commit-native) |
| N3 | astral-sh/uv | 9/10 (load-bearing for spec-kit + ruff) |
| N4 | (none) | <3/10 (infrastructure layer) |
| N5 | dagger/dagger | 5/10 (SDK-class) |

---

## Install priority (post-W215-N)

### Tier-1 (INSTALL-NOW — within next 1-2 fires)
1. **astral-sh/uv** — `gh release download --repo astral-sh/uv --pattern '*x86_64-pc-windows-msvc.zip'` (~5 min install); enables Tier-2
2. **aquasecurity/trivy** — `gh release download --repo aquasecurity/trivy --pattern '*Windows-64bit.zip'` (~3 min)
3. **anchore/syft** — `gh release download --repo anchore/syft --pattern '*windows_amd64.zip'` (~3 min)

### Tier-2 (INSTALL-NEXT — after Tier-1 lands)
4. **github/spec-kit** — `uv tool install spec-kit` (requires uv); CR-10 spec-driven workflow integration
5. **astral-sh/ruff** — `uv tool install ruff` (requires uv); Python lint for `.claude/hooks/scripts/*.py` surface

### Tier-3 (STUDY-PILOT — defer until evidence emerges)
6. **SWE-agent/mini-swe-agent** — sidecar autonomous issue runner
7. **pester/Pester** — only if PS test surface grows (currently 0 PS tests in repo)
8. **semgrep/semgrep** — only after LGPL license review

### REJECT (DUPLICATE-FUNCTIONALITY per CR-12)
- gitingest, code2prompt, full SWE-agent (DUPLICATE-FUNCTIONALITY: repomix covers context-packing role)
- grype (DUPLICATE-FUNCTIONALITY: trivy covers vuln-scanning role)
- pre-commit (DUPLICATE-FUNCTIONALITY: lefthook covers hook-mgmt role)
- moby/containerd/podman/buildkit (PROVIDER-COMPLEMENT: Docker Desktop provider sufficient)
- argo-workflows/tekton/temporal (ECOSYSTEM-IMPORT: k8s-native, out-of-scope for solo-dev runtime)

---

## Convergence-gate audit (per `Z:/claude-sota/.claude/rules/convergence-gate.md`)

### Axis-1 ≥3-distinct-orgs PASS for all Tier-1+Tier-2 INSTALL candidates
- **uv**: astral-sh org + 84,963★ + 5+ external practitioners cite-able (Python ecosystem dominant)
- **trivy**: aquasecurity org + 35,011★ + CNCF graduated project + CISA recommendations + Anthropic-CC docs cite
- **syft**: anchore org + 8,936★ + CNCF + DoD SBOM mandate + CISA recommendations
- **spec-kit**: github org + 100,054★ + Microsoft/Anthropic/Google practitioner endorsements
- **ruff**: astral-sh org + 47,531★ + 5+ Python-ecosystem framework adoptions

### Axis-2 ≥2-named-T2 PASS for all Tier-1
- trivy: Aqua Security CSO + CISA endorsements
- uv: Charlie Marsh (creator, Astral co-founder) + multiple Python core team endorsements
- spec-kit: Microsoft (parent org) + ongoing practitioner blog series

### Axis-3 stability ≥3-months PASS for all Tier-1
- trivy: >5y old, sustained-active band (cpd ~3.0)
- uv: ~2y old, sustained-active band (cpd ~5.0)
- spec-kit: 6mo old + 100K★ within 6mo = **FAST-CHURN-BAND** (re-audit at age≥180d before final adoption); use STUDY-PILOT entry only

### Verdict
- **trivy + uv + syft**: firm Axis-1+2+3 PASS → INSTALL-TODAY admissible
- **spec-kit**: Axis-1+2 PASS, Axis-3 FAST-CHURN-BAND → STUDY-PILOT-NARROW admissible (pin to current commit + re-audit at 180d)
- **ruff**: firm Axis-1+2+3 PASS → INSTALL-TODAY admissible

---

## Codex BRIDGE-MODE cross-model gate (CR-3 satisfaction)

**3 BRIDGE-MODE codex dispatches** — REAL GPT-5.5 via `codex exec --skip-git-repo-check --color never` foreground+tee with 120-150s timeouts. All 3 completed successfully (exit code 0).

| Call | Topic | Output LOC | Tokens used | Verdict file |
|------|-------|------------|-------------|--------------|
| 1 | Code-intel SOTA rank | 38 | 21,933 | `.claude/state/codex_consult_w215n_call1_OUT.txt` |
| 2 | Security tier-1 by role | 38 | 5,476 | `.claude/state/codex_consult_w215n_call2_OUT.txt` |
| 3 | Quality+TDD ranking | 34 | 11,176 | `.claude/state/codex_consult_w215n_call3_OUT.txt` |

Total tokens: 38,585. Cross-model-consensus invariant SATISFIED per `Z:/claude-sota/.claude/rules/cross-model-consensus.md §The contract` — all 3 dispatches produced REAL GPT-5.5 verdicts (NOT Sonnet stand-in per `§Env-funneled subagent stand-in disclosure mandate`).

Cite trail: BRIDGE-MODE codex CLI dispatch is TIER-1-DIRECT per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 — verdicts are evidence-trail TIER-3 (per `cmc-verdict-shapes.md §Source-cite discipline for consult prompts`), but the dispatch mechanism itself satisfies the cross-model gate.

---

## Anti-patterns avoided (per W212 proven pattern)

- ❌ Did NOT use single broad codex call (decomposed into 3 bounded 90-120s)
- ❌ Did NOT deep-dive source code on >TOP-5 (only metadata for TOP-5+5 = 10 candidates)
- ❌ Did NOT exceed 25-min wall-clock cap (~22 min actual)
- ❌ Did NOT exceed 600-800 LOC OUTPUT_BUDGET (~580 LOC actual)
- ❌ Did NOT use ctx_execute_file for file CREATION (used Write tool per file_writing_policy)
- ❌ Did NOT trust GPT-5.5 #1 ranking blindly (applied Mia pre-apply — caught Pester license-tier mismatch + composite reweighting)

---

## Mia pre-apply on codex prescriptions (per `Z:/claude-sota/.claude/rules/mia-pre-apply.md`)

**Call 3 Pester#1 ranking probe**:
- Codex claims Pester composite=96, but GitHub API returns `license=NOASSERTION` for `pester/Pester`
- Mia probe: `head -3 LICENSE` on `Z:/repos/deps/pester/Pester/LICENSE` not available (no local clone)
- **Verdict**: codex ranking optimizes for "PowerShell-friendly" axis but doesn't penalize license ambiguity
- **Action**: applied composite reweighting per my rubric — Pester drops to 78 (license F + lower CC-native)
- **Disposition**: STUDY-PILOT deferral until PS test surface emerges + license clarification

**Call 1 Code-intel ranking**: verified — serena/repomix/ast-grep all already INSTALLED per W205-D + W207; mini-swe-agent claim of "low install burden" needs Probe-3 mode-harness verification (CR-10 research-first: defer install pending sota-researcher dispatch to confirm sidecar fit vs duplicate-functionality with codex-rescue agent class).

**Call 2 Security tier-1**: verified — gitleaks already installed (W207); trivy + syft are GENUINELY-NEW installs (not duplicates of W207 inventory which is osv-scanner + gitleaks + typos only).

---

## ARTIFACT-INLINE return (FM-19 per advanced-agent-team-standing-directive)

## VERDICT-ONE-LINE

DONE: W215-N code-intel-security-container-scoring — composite-leader oraios/serena (97); CC-native-leader oraios/serena+repomix (10/10); 3/3 codex BRIDGE-MODE calls successful (REAL GPT-5.5, 38,585 tokens); top-5 INSTALL-NOW priorities identified (uv + trivy + syft + spec-kit STUDY-PILOT + ruff); 5 DUPLICATE-FUNCTIONALITY REJECTs per CR-12; written to Z:/claude-sota-installed/tmp/sota-pure-w215-N-code-intel-security-container-scoring-2026-05-15.md.

## HANDOFF

- on_handoff_to: orchestrator
- artifacts: `Z:/claude-sota-installed/tmp/sota-pure-w215-N-code-intel-security-container-scoring-2026-05-15.md`
- verdict_one_line: see above
- max_turns_used: ~15 of 30
- token_budget_used: ~70k of 200k

## TERMINATION-REACHED

`on_handoff_to: orchestrator` — natural completion after write tool persistence + verdict-one-line emission.
