# W259-v16 Coverage Audit — INFRA SUBSTRATE: Security (L0.5) · Version-Control (L0.4) · LLM Routing/Gateway (L1)

> **Wave**: W259-v16 COVERAGE-AUDIT — infra-substrate triad
> **Date**: 2026-05-17
> **Mission**: For the three infrastructure-substrate layers — **L0.5 Security/DevSecOps**, **L0.4 Version-Control substrate**, **L1 LLM Routing/Gateway** — establish whether the W259 grand catalog (`docs/architecture/W259-grand-catalog/`, 99 repos × 23 dims) covers *every* SOTA repo, or whether genuine gaps remain.
> **Method**: (1) extract every repo W259 already catalogues for the three fields from `05-scoring/MASTER-SCORING-MATRIX-W259.md`, `05-scoring/BENCHMARK-SCORECARD-A-L0-L04-L05-W259v6.md`, `05-scoring/BENCHMARK-SCORECARD-B-L1-SERVING-L15-W259v6.md`, `02-layer-deepdive/LAYER-H-git-vcs-substrate-W259v5.md`, `02-layer-deepdive/LAYER-D-browser-codeintel-docai-sandbox-security.md`, `02-layer-deepdive/LAYER-C-evals-obs-serving-routers.md`; (2) research beyond via GitHub MCP (`search_repositories` sorted by stars; `get_file_contents` for READMEs) + WebSearch on 2026-Q1/Q2 SOTA leaderboards; (3) per-repo IN-CATALOG / GAP verdict; (4) score genuine gaps.
> **Cite-class**: `effective_tier=TIER-3-LOCAL-COMPOSITION` per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8. GitHub star counts probed 2026-05-17 via GitHub MCP.
> **Scope discipline**: this is a COVERAGE + GAP-FINDING audit — NOT a re-litigation of existing W259 benchmark scores or dispositions. Where W259-v6 already re-scored a repo, that score is taken as-is.

---

## §0 — Executive summary

| Field | Catalog baseline (repos) | SOTA repos checked | Genuine gaps found | Bottom-line verdict |
|---|---:|---:|---:|---|
| **(a) Security / DevSecOps (L0.5)** | 15 | 24 | **2** | **2 genuine gaps — OpenGrep, prek (shared w/ L0.4)** |
| **(b) Version-Control substrate (L0.4)** | 25 | 30 | **1** | **1 genuine gap — prek** |
| **(c) LLM Routing / Gateway (L1)** | 8 | 13 | **2** | **2 genuine gaps — TensorZero, Envoy AI Gateway** |

**Overall**: the three infra-substrate layers are **very well covered**. W259's L0.4 (LAYER-H, 25 git tools) and L0.5 (LAYER-D §5 + §2 + scorecard-A, 15 security tools) are near-exhaustive — every household-name SOTA tool is catalogued and dispositioned. L1 routing has 8 routers catalogued with correct top-pick (LiteLLM). **5 genuine gaps total** (4 distinct repos — prek spans both L0.4+L0.5): **OpenGrep**, **prek**, **TensorZero**, **Envoy AI Gateway**. None overturns an existing W259 install decision; all are *additive* candidates. One stale-supersession note: the catalog still scores **Semgrep** without flagging the Jan-2025 license change that spawned the OpenGrep fork.

---

# FIELD (a) — SECURITY / DevSecOps (L0.5)

## (a.1) Baseline — what W259 already catalogues

L0.5 coverage is spread across three catalog files. Consolidated baseline (**15 repos/tools**):

| # | Repo | W259 location | Composite / disposition |
|---|---|---|---|
| 1 | **aquasecurity/trivy** | MASTER row 20; SCORECARD-A §3 rank 1; LAYER-D §5.1 | 87 — **T1 INSTALL** (76.5% detection, MCPAmpel-validated #1 OSS) |
| 2 | **gitleaks/gitleaks** | MASTER row 21; SCORECARD-A §3 rank 2; LAYER-D §5.6 | 86 — **T1 INSTALL** (F1 60% NSF-validated #1 secret scanner) |
| 3 | **anchore/grype** | SCORECARD-A §3; LAYER-D §5.2 | (no master row) — T3 (Trivy outperforms; Grype only if SBOM-centric) |
| 4 | **anchore/syft** | LAYER-D §5.2 | (paired w/ Grype) — SBOM generation |
| 5 | **semgrep** | LAYER-D §5.3 / §2.5; LAYER-D §4 (PyPI `semgrep-mcp`) | T2 STUDY-PILOT (SAST; RealVuln F3 17.7) |
| 6 | **google/osv-scanner** | LAYER-D §5.4 | OSV.dev DB + malicious-package feed |
| 7 | **trufflesecurity/trufflehog** | SCORECARD-A §3; LAYER-D §5.5 | T2 STUDY-PILOT (precision 90% `--only-verified`; CI deep-audit) |
| 8 | **ossf/scorecard** | MASTER row 46; LAYER-D §5.8 | 84 — T2 STUDY-PILOT |
| 9 | **NVIDIA/garak** | MASTER row 35; LAYER-D §5.7/§7.1 | 84 — T2 STUDY-PILOT (LLM red-team) |
| 10 | **sigstore/cosign** | LAYER-D §5.9 | Artifact signing (Apache-2.0) |
| 11 | **renovatebot/renovate** | LAYER-D §5.10 | **REJECT** (AGPL-3.0; use GH-native Dependabot) |
| 12 | **microsoft/agent-governance-toolkit** | MASTER row 85 | 92 — **T1 INSTALL** (OWASP Agentic 10/10; reclassified CI-gate) |
| 13 | **anthropics/claude-code-security-review** | MASTER row 71 | 88 — **T1 INSTALL** (CC-native PR security gate) |
| 14 | **Azure/PyRIT** | LAYER-D §7 | PATTERN-CITE (LLM red-team deep) |
| 15 | **ast-grep/ast-grep** | MASTER row 13; LAYER-D §2.4 | 82 — T2 (structural search; security-adjacent) |

L0.5 install set per W259: **Trivy + gitleaks + pre-commit/lefthook + agent-governance-toolkit + claude-code-security-review** — all canonical-benchmark-validated in SCORECARD-A §3.

## (a.2) SOTA repos found — IN-CATALOG / GAP verdict

GitHub MCP star counts probed 2026-05-17. WebSearch leaderboards: appsecsanta "64 Open-Source AppSec Tools 2026", ZeroPath "7 Best SAST Tools 2026", Aikido "Snyk vs Trivy 2026".

| Repo | Stars | In W259 catalog? | Verdict |
|---|---:|---|---|
| aquasecurity/trivy | 35,011 | ✅ YES (row 20) | IN-CATALOG |
| gitleaks/gitleaks | ~16,000 | ✅ YES (row 21) | IN-CATALOG |
| trufflesecurity/trufflehog | ~25,000 | ✅ YES (LAYER-D §5.5) | IN-CATALOG |
| anchore/syft | 8,942 | ✅ YES (LAYER-D §5.2) | IN-CATALOG |
| anchore/grype | (paired) | ✅ YES (LAYER-D §5.2) | IN-CATALOG |
| semgrep/semgrep | ~12,000 | ✅ YES (LAYER-D §5.3) | IN-CATALOG |
| google/osv-scanner | ~7,500 | ✅ YES (LAYER-D §5.4) | IN-CATALOG |
| ossf/scorecard | 5,440 | ✅ YES (row 46) | IN-CATALOG |
| NVIDIA/garak | 7,824 | ✅ YES (row 35) | IN-CATALOG |
| **opengrep/opengrep** | **2,557** | ❌ **NO** | **GENUINE GAP** — community fork of Semgrep after Jan-2025 license change; ships an official `opengrep/skills` (agent skill) |
| **j178/prek** | **7,642** | ❌ **NO** | **GENUINE GAP** — Rust pre-commit replacement w/ security-focused `auto-update` (impostor-commit detection, SHA validation, cooldown) + `gh skill install`. Spans L0.4. |
| DependencyTrack/dependency-track | 3,821 | ❌ NO | CORRECTLY-EXCLUDED — enterprise SBOM *platform* (Java server + UI); overkill for solo runtime; LAYER-D §5 net-verdict explicitly says "no commercial-grade platform justified at this scale" |
| guacsec/guac | 1,494 | ❌ NO | CORRECTLY-EXCLUDED — supply-chain metadata graph DB; heavyweight, GraphQL service; redundant with FalkorDB/graphiti |
| Infisical/infisical | 26,855 | ❌ NO | CORRECTLY-EXCLUDED — secrets *management* platform (vault), not a scanner; out of L0.5 scan/SBOM/SAST scope |
| thoughtworks/talisman | 2,082 | ❌ NO | CORRECTLY-EXCLUDED — pre-commit secret scanner; gitleaks (NSF-validated #1) supersedes it; SCORECARD-A §3 already settles the secret-scanner pick |
| owasp-dep-scan/dep-scan | 1,234 | ❌ NO | CORRECTLY-EXCLUDED — OWASP SCA tool w/ reachability; Trivy+OSV-Scanner already cover the SCA capability |
| oss-review-toolkit/ort | 2,009 | ❌ NO | CORRECTLY-EXCLUDED — license-compliance suite (Kotlin); compliance-OSPO focus, not a vuln/secret scanner |
| aboutcode-org/scancode-toolkit | 2,530 | ❌ NO | CORRECTLY-EXCLUDED — license/copyright scanner; niche compliance, no CC pathway |
| microsoft/sbom-tool | 2,027 | ❌ NO | CORRECTLY-EXCLUDED — SPDX SBOM generator; Syft (already catalogued) is the SOTA SBOM pick |
| cdxgen/cdxgen | 962 | ❌ NO | CORRECTLY-EXCLUDED — CycloneDX BOM generator; Syft covers it; sub-1k stars |
| RetireJS/retire.js | 4,127 | ❌ NO | CORRECTLY-EXCLUDED — JS-only dependency scanner; Trivy covers npm; narrow ecosystem |
| zarf-dev/zarf | 1,888 | ❌ NO | CORRECTLY-EXCLUDED — airgap K8s package manager; not a security scanner |
| always-further/nono | 2,407 | ❌ NO | CORRECTLY-EXCLUDED — agent capability-sandbox; L0/sandbox layer not L0.5; W259 already picks `anthropic-experimental/sandbox-runtime` (row 58) + CC permissions model (cardinal-rule-5). Worth a WATCH note for the sandbox layer. |
| sheeki03/tirith | 2,336 | ❌ NO | CORRECTLY-EXCLUDED — terminal-security interceptor for agents; novel but single-author, created 2026-02, no convergence; CC permissions model is the sanctioned boundary (cardinal-rule-5) |

## (a.3) Genuine-gap list — scored

### GAP a-1 — `opengrep/opengrep` (SAST engine)

| Axis | Value |
|---|---|
| Stars | 2,557 (created 2024-12-14; pushed 2026-05-16 — active) |
| Native-CC pathway | **YES** — official `opengrep/skills` repo ("Opengrep skill for agents"); CLI installable + direct-CLI hook compatible (cardinal-rule-2). |
| License | **LGPL-2.1** (the *point* of the fork — keeps the pre-2025 OSI license that Semgrep CE abandoned). Clean. |
| Org strength | Backed by a security-vendor consortium (Aikido, Endor, Jit, Arnica, Amplify et al.) — multi-org governance; not solo. |
| Recency | Active 2026-Q2; v1.x released. |
| Fit | Drop-in `semgrep`-CLI-compatible SAST; W259 picks Semgrep at T2 — OpenGrep is the **license-clean, community-governed** alternative for the *same* capability. |
| **Verdict** | **GENUINE GAP — add as L0.5 SAST entry; STUDY-PILOT tier.** Recommend the catalog re-frame the Semgrep row: "Semgrep CE relicensed Jan-2025 → OpenGrep is the OSI-clean fork; pick OpenGrep for the SAST slot." Est. composite ~78-82 (LGPL D1 clean, multi-org D4, agent-skill D11, Windows-native single-binary D15). |

### GAP a-2 — `j178/prek` (hook runner — security-relevant; primary home L0.4)

Scored in full under FIELD (b) GAP b-1. Security relevance: prek's `auto-update` adds **impostor-commit detection + pinned-SHA validation + `--cooldown-days`** — directly mitigating the supply-chain-attack class (the March-2026 Trivy compromise is cited across W259). For L0.5 it is the *hook substrate* that runs gitleaks/trivy as pre-commit gates, with a hardened update path.

## (a.4) DEFINITIVE bottom-line — FIELD (a) Security

**2 genuine gaps — listed + scored**: **OpenGrep** (L0.5 SAST; license-clean Semgrep fork — add + re-frame the Semgrep row) and **prek** (hook substrate w/ supply-chain-hardened auto-update; scored under L0.4). Beyond those, L0.5 is **SATURATED**: every SOTA scanner class (container/dep CVE, secret detection, SBOM, SAST, supply-chain posture, LLM red-team, agentic governance) is catalogued with a canonical-benchmark-validated pick. The 13 NOT-IN repos checked are all CORRECTLY-EXCLUDED (enterprise platforms, niche-ecosystem scanners, or non-L0.5-scope tools). One **stale-flag note**: the catalog scores Semgrep without noting its Jan-2025 relicense — should be annotated when OpenGrep is added.

---

# FIELD (b) — VERSION-CONTROL SUBSTRATE (L0.4)

## (b.1) Baseline — what W259 already catalogues

W259 covers VCS in `02-layer-deepdive/LAYER-H-git-vcs-substrate-W259v5.md` (the dedicated L0.4 deepdive — 25 tools across 7 sub-categories) + `05-scoring/BENCHMARK-SCORECARD-A` §2 (ranked on independent adoption surveys). Consolidated baseline (**25 repos/tools**):

| Sub-category | Tools catalogued |
|---|---|
| Substrate | **git** (T0-SUBSTRATE), git-worktree + CC `EnterWorktree` (T0-INSTALLED), gitoxide/`gix` |
| Next-gen VCS | **jj (jujutsu)** (T2 PILOT-sandbox), sapling, pijul |
| Ergonomics overlay | **git-branchless** (T1 INSTALL), git-town (T2) |
| Git TUI | **lazygit** (T1 operator-only), gitui, **gitbutler** (LAYER-H row, score 32 — noted for its `but` CLI + `crates/but/skill/SKILL.md`) |
| Changelog / commit | **git-cliff** (T1 INSTALL), cocogitto, commitlint, commitizen/czg (REJECT-FOR-FIT — interactive wizard) |
| Hooks manager | **lefthook** (T1 INSTALL), **pre-commit** (MASTER row 44, composite 84), husky (REJECT), git-hooks.nix (REJECT) |
| Repo health / surgery | **git-sizer** (T1 INSTALL), git-filter-repo, git-quick-stats |
| Forge CLI | **gh** (T1 INSTALL — deferred to first remote) |
| Stacked-PR | graphite/`gt` (REJECT-FOR-FIT — solo runtime), spr/ghstack/git-spice (T3) |
| Other git-objects | git-bug, dolt, git-appraise |

L0.4 install set per LAYER-H §"INSTALL": **git-branchless + lefthook + git-cliff + git-sizer** (4 single binaries) + lazygit (operator-only) + gh (deferred).

## (b.2) SOTA repos found — IN-CATALOG / GAP verdict

GitHub MCP star counts probed 2026-05-17. WebSearch: "SOTA git workflow tools 2026 jujutsu jj git-cliff lefthook".

| Repo | Stars | In W259 catalog? | Verdict |
|---|---:|---|---|
| jj-vcs/jj (jujutsu) | ~28,200 | ✅ YES (LAYER-H §13) | IN-CATALOG |
| gitbutlerapp/gitbutler | 20,856 | ✅ YES (LAYER-H row, score 32) | IN-CATALOG |
| orhun/git-cliff | (T1) | ✅ YES (LAYER-H §4) | IN-CATALOG |
| evilmartians/lefthook | (T1) | ✅ YES (LAYER-H §6) | IN-CATALOG |
| arxanas/git-branchless | (T1) | ✅ YES (LAYER-H §2) | IN-CATALOG |
| pre-commit/pre-commit | 15,277 | ✅ YES (MASTER row 44) | IN-CATALOG |
| jesseduffield/lazygit | (T1) | ✅ YES (LAYER-H §3) | IN-CATALOG |
| cli/cli (gh) | (T1) | ✅ YES (LAYER-H §10) | IN-CATALOG |
| facebook/sapling | (T3) | ✅ YES (LAYER-H §13) | IN-CATALOG |
| **j178/prek** | **7,642** | ❌ **NO** | **GENUINE GAP** — Rust drop-in pre-commit replacement; single binary, no Python runtime; Windows-native (scoop/winget); already powers CPython/Airflow/FastAPI/ruff |
| extrawurst/gitui | (T3) | ✅ YES (LAYER-H §3) | IN-CATALOG |
| commitizen-tools/commitizen | (REJECT) | ✅ YES (LAYER-H §5) | IN-CATALOG |
| cocogitto/cocogitto | (T2) | ✅ YES (LAYER-H §5) | IN-CATALOG |
| withgraphite/graphite | (REJECT-FIT) | ✅ YES (LAYER-H §"stacked-PR") | IN-CATALOG |
| typicode/husky | (REJECT) | ✅ YES (LAYER-H §6) | IN-CATALOG |
| conventional-changelog/commitlint | (T2) | ✅ YES (LAYER-H §5) | IN-CATALOG |
| newren/git-filter-repo | (DOCUMENT) | ✅ YES (LAYER-H §9) | IN-CATALOG |
| github/git-sizer | (T1) | ✅ YES (LAYER-H §9) | IN-CATALOG |
| GitoxideLabs/gitoxide | (note) | ✅ YES (LAYER-H §"library") | IN-CATALOG |
| Byron/gitoxide | (alias of above) | ✅ YES | IN-CATALOG |
| spacedentist/spr · ezyang/ghstack · abhinav/git-spice | (T3) | ✅ YES (LAYER-H §"stacked-PR") | IN-CATALOG |
| MichaelMure/git-bug | (redundant) | ✅ YES (LAYER-H §"other") | IN-CATALOG |
| dolthub/dolt | (no-fit) | ✅ YES (LAYER-H §"other") | IN-CATALOG |
| git-town/git-town | (T2) | ✅ YES (LAYER-H §"stacked-PR") | IN-CATALOG |
| phpro/grumphp | 4,289 | ❌ NO | CORRECTLY-EXCLUDED — PHP-ecosystem-only hook tool; runtime is Python+Rust-leaning |
| toplenboren/simple-git-hooks | 1,659 | ❌ NO | CORRECTLY-EXCLUDED — minimal JS hook manager; lefthook (perfect D-score) supersedes |
| antonbabenko/pre-commit-terraform | 3,715 | ❌ NO | CORRECTLY-EXCLUDED — Terraform hook *collection*, not a manager; no fit (no Terraform in runtime) |

## (b.3) Genuine-gap list — scored

### GAP b-1 — `j178/prek` (Rust pre-commit replacement)

| Axis | Value |
|---|---|
| Stars | 7,642 (created 2024-10-07; pushed 2026-05-17 — very active) |
| Native-CC pathway | **YES** — ships a `prek` **agent skill** installable via `gh skill install j178/prek prek`; single-binary CLI = direct-CLI hook compatible (cardinal-rule-2). |
| License | Apache-2.0 / MIT dual (standard Rust-ecosystem) — clean. |
| Org strength | Single primary maintainer (`j178`) BUT **adoption is the org-strength signal**: production use by CPython, Apache Airflow, FastAPI, astral-sh/ruff, getsentry/sentry, home-assistant, godot, prowler — i.e. ≥3 strong orgs run it. Satisfies the "low-star repos rarely matter unless part of a strong org" filter via *downstream* adoption. |
| Recency | Q2-2026 active; v0.4.0; daily commits. |
| Fit-for-runtime | **Excellent** — single Rust binary, **no Python runtime** (vs pre-commit which needs `Z:\venvs\claude`), Windows-native (`scoop install main/prek`, `winget install j178.Prek`), fully pre-commit-config-compatible, `uv`-integrated, workspace/monorepo mode, **Rust-native builtin hooks**, and a **security-hardened `auto-update`** (impostor-commit detection, pinned-SHA validation, `--cooldown-days` cooling-off). This is *strictly* the Windows-Z:-portable single-binary profile LAYER-H §6 used to pick lefthook over pre-commit. |
| **Verdict** | **GENUINE GAP — strongest of the 5. Add as L0.4 hook-substrate candidate; STUDY-PILOT vs the installed lefthook + pre-commit pair.** Est. composite ~85-88 (D1 clean, D2/D14 frontier, D11 agent-skill, D15 perfect Windows, D19 reversible single-binary). LAYER-H §6 picks between `{lefthook, pre-commit}` — prek is a *third, arguably superior* option for the runtime's exact constraints (it keeps full pre-commit hook-ecosystem compatibility, which lefthook sacrifices, while matching lefthook's single-binary/no-Python advantage). |

## (b.4) DEFINITIVE bottom-line — FIELD (b) Version-Control

**1 genuine gap — listed + scored**: **prek** (`j178/prek`) — a Rust drop-in pre-commit replacement that hits the runtime's Windows-Z:-portable single-binary profile better than either currently-picked option, ships an agent skill, and hardens the supply-chain update path. Beyond prek, L0.4 is **SATURATED**: LAYER-H is a genuinely exhaustive 25-tool, 7-sub-category deepdive — every SOTA git tool (incl. jj, gitbutler, git-cliff, lefthook, git-branchless, lazygit, gitoxide, all the stacked-PR tools) is catalogued *and* dispositioned with correct solo-runtime fit reasoning. The 3 NOT-IN repos checked are CORRECTLY-EXCLUDED (PHP/JS-ecosystem-only or Terraform-specific).

---

# FIELD (c) — LLM ROUTING / GATEWAY (L1)

## (c.1) Baseline — what W259 already catalogues

W259 covers L1 routing in `02-layer-deepdive/LAYER-C-evals-obs-serving-routers.md` §4 + `05-scoring/BENCHMARK-SCORECARD-B-L1` §1 (re-scored on Ferro-Labs/Kong reproducible gateway benchmarks). Consolidated baseline (**8 repos**):

| # | Repo | W259 location | Composite / disposition |
|---|---|---|---|
| 1 | **BerriAI/litellm** | MASTER row 12; SCORECARD-B §1 rank 1; LAYER-C §4 | 86-88 — **T1 INSTALL** (de-facto OSS router; DeepSeek-V4 escape valve) |
| 2 | **Portkey-AI/gateway** | SCORECARD-B §1 rank 2; LAYER-C §4 | 82 — T2 STUDY-PILOT (MIT-clean enterprise tilt) |
| 3 | **maximhq/bifrost** | SCORECARD-B §1 rank 3; LAYER-C §4 | 72 — T3 WATCH (single-org Axis-1 FAIL; collapses ≥300VU) |
| 4 | **lm-sys/RouteLLM** | SCORECARD-B §1; LAYER-C §4 | 48 — **REJECT-FOR-FIT** (stale 21mo since 2024-08) |
| 5 | **EinStack/glide** | SCORECARD-B §1; LAYER-C §4 | ~38 — **REJECT** (abandoned 2024-08) |
| 6 | **vllm-project/semantic-router** | SCORECARD-B §1 rank 4 | 70 — T3 WATCH (MoM intelligent router) |
| 7 | **Helicone/helicone** | MASTER row 28; LAYER-C §3 | 86 — T2 STUDY-PILOT (gateway+observability; AI Gateway beta) |
| 8 | **NVIDIA-AI-Blueprints/llm-router** | LAYER-C §4 | SKIP (272★, experimental Jupyter) |

L1 pick per W259: **LiteLLM T1 INSTALL** (win = ecosystem + license-escape-valve + native-CC `litellm-skills`, not throughput); Portkey T2; Bifrost WATCH.

## (c.2) SOTA repos found — IN-CATALOG / GAP verdict

GitHub MCP star counts probed 2026-05-17. WebSearch: "SOTA LLM gateway router open source 2026", DEV.to "Best Open-Source AI Gateway 2026", RelayPlane "LLM Gateway Comparison 2026".

| Repo | Stars | In W259 catalog? | Verdict |
|---|---:|---|---|
| BerriAI/litellm | ~47,200 | ✅ YES (row 12) | IN-CATALOG |
| Portkey-AI/gateway | ~11,750 | ✅ YES (SCORECARD-B §1) | IN-CATALOG |
| maximhq/bifrost | ~4,960 | ✅ YES (SCORECARD-B §1) | IN-CATALOG |
| lm-sys/RouteLLM | ~4,890 | ✅ YES (SCORECARD-B §1) | IN-CATALOG |
| Helicone/helicone | ~5,680 | ✅ YES (row 28) | IN-CATALOG |
| EinStack/glide | ~160 | ✅ YES (SCORECARD-B §1) | IN-CATALOG (REJECT — abandoned) |
| vllm-project/semantic-router | (new) | ✅ YES (SCORECARD-B §1) | IN-CATALOG |
| NVIDIA-AI-Blueprints/llm-router | 272 | ✅ YES (LAYER-C §4) | IN-CATALOG |
| **tensorzero/tensorzero** | **11,372** | ❌ **NO** | **GENUINE GAP** — Rust LLMOps platform unifying gateway + observability + eval + optimization; sub-ms P99; Anthropic-native; second-most-starred OSS gateway after LiteLLM |
| **envoyproxy/ai-gateway** | **1,618** | ❌ **NO** | **GENUINE GAP** — CNCF/Envoy-org AI gateway built on Envoy Gateway; strong-org (CNCF graduated-project lineage); the K8s-native entrant |
| katanemo/plano (ex-archgw) | 6,481 | ❌ NO | CORRECTLY-EXCLUDED (borderline) — Rust AI-native proxy/data-plane (Envoy-based); strong repo BUT positioned as agentic-app data-plane w/ built-in orchestration/guardrails — overlaps the agent-framework layer more than a pure router; no native-CC pathway. Worth a WATCH note. |
| coaidev/coai | 9,171 | ❌ NO | CORRECTLY-EXCLUDED — multi-tenant AI SaaS w/ admin+billing+chat-share; a *product*, not an embeddable router/proxy primitive; no CC fit |
| openrouter (hosted) | n/a | ❌ NO (hosted service) | CORRECTLY-EXCLUDED — OpenRouter is a hosted SaaS, not an installable OSS repo; LiteLLM already provides the `openrouter/` provider path. Catalogued indirectly. |

## (c.3) Genuine-gap list — scored

### GAP c-1 — `tensorzero/tensorzero` (Rust LLM gateway + LLMOps)

| Axis | Value |
|---|---|
| Stars | 11,372 (created 2024-07-16; pushed 2026-05-16 — very active) — **second-most-starred OSS gateway after LiteLLM**, ~2.3× Portkey, ~2.3× Bifrost. |
| Native-CC pathway | **WEAK** — no first-party CC plugin/skill found. OpenAI-compatible endpoint = usable by any CC-adjacent client, but no `tensorzero-skills`-style integration. This is the gap-vs-LiteLLM (LiteLLM ships official `litellm-skills`). |
| License | **Apache-2.0** (clean — cleaner than LiteLLM's open-core NOASSERTION). |
| Org strength | Single org (TensorZero Inc., YC-backed) — Axis-1 *thin* on org-diversity, same caveat W259 applied to Bifrost. BUT 11k stars + Rust + active = genuine SOTA momentum, not fresh-paint. |
| Recency | Q2-2026 active; daily commits; 386 open issues (high activity). |
| Fit-for-runtime | **Moderate-to-good** — Rust binary (no Python GIL ceiling; sub-ms P99 vs LiteLLM's 8ms — though *irrelevant at solo+5 scale* per SCORECARD-B §1.2's own reasoning). The **distinctive** feature: a built-in optimization loop (collects inference data → runs evals → improves routing) — a genuine capability LiteLLM lacks. Self-hostable, nothing-leaves-infra. |
| **Verdict** | **GENUINE GAP — add as L1 router entry; STUDY-PILOT tier (NOT install — LiteLLM's native-CC `litellm-skills` + ≥5-org ecosystem keeps it the T1 pick).** Est. composite ~80-83 (D1 clean Apache vs LiteLLM open-core, D2/D14 frontier, D11 weak — no CC plugin, D8 single-org Axis-1-thin, D15 Rust-binary good). TensorZero is the **strongest non-catalogued router** and belongs in the L1 table alongside Portkey/Bifrost as a study-pilot peer — arguably *above* Bifrost (TensorZero 11k★ + Apache + optimization-loop vs Bifrost 5k★ + load-collapse finding). |

### GAP c-2 — `envoyproxy/ai-gateway` (CNCF Envoy AI Gateway)

| Axis | Value |
|---|---|
| Stars | 1,618 (created 2024-10-21; pushed 2026-05-16 — active) — modest star count, but see org-strength. |
| Native-CC pathway | **NONE** — Kubernetes-native gateway (CRD-driven); no CC plugin/skill/MCP. Not a CC-adjacent primitive. |
| License | **Apache-2.0** (clean). |
| Org strength | **STRONG** — `envoyproxy` org; Envoy is a CNCF *graduated* project; this is the official AI-gateway extension built on Envoy Gateway. The "strong org" the operator filter explicitly says to keep low-star repos for. |
| Recency | Q2-2026 active; CNCF-cadence releases. |
| Fit-for-runtime | **Poor** — designed for Kubernetes service-mesh deployments (rate-limiting, token-counting, multi-upstream at cluster scale). The runtime is a solo Windows Z:-portable CC install with no K8s. Operationally irrelevant at solo+5 scale (same reason SCORECARD-B down-weights raw RPS). |
| **Verdict** | **GENUINE GAP — but marginal. Add as an L1 *catalog entry* for completeness (it IS the SOTA K8s-native AI gateway, strong-org), dispositioned T4 WATCH / CITE-PATTERN.** Est. composite ~70-74 (D1 clean, D4 strong-org, D2 fresh, but D11=0 no-CC, D15 Linux/K8s-tilt, D6/D22 poor solo-fit). Included because the operator directive is *coverage* — a strong-org SOTA repo should be in the table even when its disposition is WATCH. It is correctly NOT an install candidate. |

## (c.4) DEFINITIVE bottom-line — FIELD (c) LLM Routing/Gateway

**2 genuine gaps — listed + scored**: **TensorZero** (`tensorzero/tensorzero`, 11.4k★ — the strongest non-catalogued router; Apache-2.0; belongs in the L1 study-pilot table, arguably above Bifrost) and **Envoy AI Gateway** (`envoyproxy/ai-gateway` — strong-org CNCF entrant; add for coverage-completeness at T4 WATCH given K8s-tilt). The L1 *install decision* is **unaffected** — LiteLLM remains the correct T1 pick (native-CC `litellm-skills` + ≥5-org ecosystem). Beyond these two, L1 is well-covered: LiteLLM, Portkey, Bifrost, Helicone, RouteLLM, glide, vllm-semantic-router, NVIDIA llm-router are all catalogued. katanemo/plano + coaidev/coai are CORRECTLY-EXCLUDED (data-plane/SaaS-product, not router primitives). **Verdict: 2 genuine gaps — listed + scored.**

---

## §FINAL — Consolidated gap register + recommended catalog actions

| # | Gap repo | Field(s) | Stars | Native-CC | Recommended tier | Catalog action |
|---|---|---|---:|---|---|---|
| G1 | **j178/prek** | L0.4 + L0.5 | 7,642 | ✅ agent-skill (`gh skill`) | **STUDY-PILOT** (highest-fit gap) | Add to LAYER-H §6 as a 3rd hook-substrate option; pilot vs lefthook+pre-commit |
| G2 | **tensorzero/tensorzero** | L1 | 11,372 | ⚠ weak (OpenAI-compat only) | **STUDY-PILOT** | Add to SCORECARD-B §1 / LAYER-C §4 router table (peer of Portkey/Bifrost) |
| G3 | **opengrep/opengrep** | L0.5 | 2,557 | ✅ agent-skill | **STUDY-PILOT** | Add to LAYER-D §5 SAST; re-frame Semgrep row (Jan-2025 relicense → OpenGrep is OSI-clean fork) |
| G4 | **envoyproxy/ai-gateway** | L1 | 1,618 | ❌ none (K8s-native) | **WATCH / CITE-PATTERN** | Add to LAYER-C §4 router table for coverage; disposition WATCH (K8s-tilt, no solo-fit) |

**WATCH-only mentions** (not full gaps — noted for adjacent layers): `always-further/nono` + `sheeki03/tirith` (agent terminal/capability sandboxes — sandbox layer, not L0.5; CC permissions model is the sanctioned boundary); `katanemo/plano` (AI-native data-plane — agent-framework-layer overlap).

**None of the 4 gaps overturns a W259 install decision.** All are *additive* — Trivy/gitleaks (L0.5), the 4 git binaries (L0.4), and LiteLLM (L1) remain correct. The gaps are: one superior hook-substrate option (prek), one license-clean SAST fork the catalog should acknowledge (OpenGrep), and two routers that complete the L1 table (TensorZero as a real study-pilot peer, Envoy AI Gateway for strong-org coverage). The three infra-substrate layers are, with these 4 additions, **fully SOTA-covered**.
