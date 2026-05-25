# 03 — Research Architecture Improvement (METHODOLOGY beyond tool list)

> **Trigger**: User clarification 2026-05-10 mid-Fire-28: "they are just a inspiration, you can research sota repos and improve your researchect itself"
> **Pivot**: User-doc is INSPIRATION (TIER-1-USER-DIRECTIVE inspiration class), NOT install prescription. Focus shifts to IMPROVING the research-architecture-itself — methodology, discovery breadth, evaluation depth, recursion cadence — not just adopting prescribed tools
> **Cite class**: TIER-3-LOCAL-COMPOSITION per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 (TIER-2 sister-rule analysis + TIER-1-USER-DIRECTIVE clarification + TIER-3-LOCAL-OPERATOR-DERIVED current state)

## Current research architecture audit (METHODOLOGY perspective)

### Sister-rule inventory (research-relevant — Pattern A apply: claims SOFTENED per codex T1 prescription #6 to "APPEARS-TO" until cite anchors verified at HEAD SHA)

| Rule/Asset | Coverage | Strength | Weakness (PROVISIONAL — cite-anchor verification queued for Fire 29-30 IMP work) |
|---|---|---|---|
| `Z:/claude-sota/.claude/rules/research-protocol.md` | RECALL→INVESTIGATE→VERIFY 3 gates + Tool Routing table + RPI 3-phase + benchmark-first sub-rule + repo-discovery sub-rule + cohort fan-out + 6-probe harness-fit | Strong methodological scaffolding | APPEARS TO LACK: Tool Routing table refresh discipline (n=6+ MCP changes likely since last refresh); benchmark-first scope narrow (adoption-decision only?); Probe 7 demand-gate-split codified? — verify at cite anchors |
| `Z:/claude-sota/.claude/rules/convergence-gate.md` | Axis 1/2/3 + STRONG-PROVENANCE-EXPRESS + cite-class precedent | Strong adoption gate | APPEARS TO LACK: Axis-3 stability bands flexibility (strict-gate edge cases?); explicit rubric-weight derivation rationale |
| `Z:/claude-sota/.claude/rules/sota-research-architecture.md` | 10-dimension SRA D1-D10 verdict lattice | Comprehensive evaluation surface | APPEARS TO LACK: D6 (use-class compatibility) + D7 (Anthropic alignment) explicit weighting; D9 (FM awareness) enforcement-gate mechanism; D11 candidate (supply-chain attestation per SLSA) — verify at sister-rule cite anchors |
| `Z:/claude-sota/.claude/agents/sota-researcher.md` | initialPrompt with cohort fan-out + Probe DAG + harness-fit | Strong agent template | OBSERVED-CURRENT: Often dispatched as Sonnet stand-in (CR-3 cross-model NOT structurally satisfied per CLAUDE.local.md ENV (g) STAND-IN-NOTICE mandate); Mia pre-apply self-discipline strong; APPEARS TO LACK: explicit post-return verification mandate |
| `Z:/claude-sota/.claude/rules/mia-pre-apply.md` | Prescription-validity check before Edit | Strong apply-boundary defense | APPEARS TO LACK: discovery-source-quality drift coverage; agent-emitted file:line claim cite-anchor HEAD-SHA verification mandate |
| `Z:/claude-sota/.claude/rules/fm20-path-drift-cascade.md` | Cross-fire claim-propagation defense | Strong cross-fire integrity | APPEARS TO LACK: proactive prevention via cite-anchor-hash verification (current pattern is recovery-after-detection) |
| `.claude/skills/` (844 SKILL.md files) | 11-marketplace breadth (Anthropic-official + ECC + addy + community + sectoral) | Massive surface area | OBSERVED-CURRENT: Discovery via description-match auto-fire; APPEARS TO LACK: explicit task-class → skill-selection codification |

### Methodology STRENGTHS vs user-doc 9-layer

1. **Cross-model verification (T1-T7)** — eee has formal codex T1/T2/T3 lifecycle hooks (when installed); user-doc doesn't codify cross-model as canonical step
2. **Cohort fan-out + Probe DAG harness-fit** — eee has Probe 1-7 (count-OVER / SDK-vs-CLI / architectural-API / plugin-namespace / mode-harness-shape / direct-file/registry blockers / demand-absence) per `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md` n=12+ evidence; user-doc has triage filters but no formal Probe DAG
3. **Forward Discipline #1+#2** — eee has codified Pattern B HNF avoidance discipline (Fire 27-E codification); user-doc treats benchmark-saturation as caveat #3 but no formal discipline
4. **CR-12 5-class disposition lattice** — eee has GENUINELY-NEW / DUPLICATE-FUNCTIONALITY / PARTIAL-OVERLAP / PROVIDER-COMPLEMENT / ECOSYSTEM-IMPORT classification (Fire 27-D codification); user-doc treats classification implicitly
5. **FM catalog** — eee has named-failure-modes.md with 20+ codified FMs (FM-02 / FM-09 / FM-17 / FM-19 / FM-20 etc.); user-doc has 12 generic failure modes
6. **Recursive promotion-fire dogfood** — eee has cycle-322 n=3 threshold for self-observed pattern promotion; user-doc has quarterly recursion principle but no formal cadence
7. **Pattern A fix-forward + Pattern B HNF disposition** — eee has codified verdict-trajectory disposition (codex-t1-fix-forward-pattern.md); user-doc has feedback loop but no formal verdict-shape

### Methodology WEAKNESSES vs user-doc 9-layer

1. **Discovery breadth narrower than user-doc** — eee primarily uses GitHub MCP + Exa + Firecrawl + Context7 + DeepWiki; user-doc adds OSSInsight + Star History + deps.dev + Snyk Advisor + Sourcebot + arXiv + Semantic Scholar + Papers With Code + Connected Papers / ResearchRabbit
2. **No formal weighted-rubric scoring** — eee uses qualitative SRA D1-D10; user-doc has explicit S25/M20/C25/Co15/L10/P5 with quantitative formulas
3. **No ADR-formal selection** — eee uses install-provenance.md as chronological log; user-doc prescribes log4brains MADR with immutable status transitions + alternatives-archived
4. **No formal benchmark/A-B comparison step** — eee uses codex T1 verdict as proxy; user-doc prescribes skill-creator Executor/Grader/Comparator/Analyzer + Inspect AI + Promptfoo as comparison layer
5. **No formal task-prompt harness** — eee evaluates components in-fire ad-hoc; user-doc prescribes project-derived task prompts (5-10 per evaluation) for skill-creator A/B
6. **No Sigstore maintainer-credibility verification** — eee uses GitHub org/maintainer as proxy; user-doc prescribes Sigstore-signed releases as high-trust requirement
7. **No formal license allowlist enforcement** — eee uses SRA D1 use-class precision; user-doc prescribes SPDX scan in CI + ScanCode + allowlist
8. **No formal `.claudeignore` hardening** — eee uses general OS-secret-pattern denylist (safety_guard.py + secret_scan_guard.py); user-doc prescribes `.claudeignore` with `.env*`, `*.pem`, `id_rsa*`, `.aws/`, `.ssh/` patterns per failure-mode #11
9. **No formal SHA-256 plan-attestation** — eee uses ad-hoc commit-body verification; user-doc prescribes plan-attestation hashes via planning-with-files hooks per failure-mode #7

## Improvements to eee research architecture (ranked by leverage)

### TIER 1 — HIGH-LEVERAGE methodology codifications (1-3 fires each)

#### IMP-A: Discovery breadth expansion (multi-source crawl protocol codification)

**Gap**: research-protocol.md §INVESTIGATE Gate 2 mentions multi-tier search but doesn't codify the MULTI-SOURCE crawl as mandatory n=4+ sources.

**Improvement**: Add to research-protocol.md §"Repo-discovery sub-rule" or sota-research-architecture.md as D11 (Multi-source discovery breadth):
- MUST use ≥4 of: GitHub MCP / OSSInsight HTTP / Star History HTML / deps.dev API / Brave / Exa / Firecrawl / Perplexity / arXiv / Semantic Scholar / Papers With Code
- Score discovery breadth in SRA verdict
- Cite class: TIER-2 (sister-rule extension)

**Effort**: ~1 fire (sister-rule edit + codex T1 review)

**Expected value**: catches candidates missed by GitHub-only search (Sourcegraph alternatives, academic-paper-anchored repos, npm-only repos)

#### IMP-B: Weighted rubric formal codification

**Gap**: sota-research-architecture.md has 10 dimensions but no QUANTITATIVE weighted formula like user-doc S25/M20/C25/Co15/L10/P5.

**Improvement**: Codify `docs/rubric.md` with weighted formula per user-doc Part 5 template; sota-research-architecture.md adds §"Quantitative rubric (rubric.md)" reference; update sota-researcher initialPrompt to score per rubric.

**Effort**: ~1 fire (rubric.md + sister-rule edit)

**Expected value**: deterministic ranking; sensitivity-check via ±5% weight perturbation; cross-fire-comparable scoring

#### IMP-C: ADR formalization (log4brains adoption)

**Gap**: install-provenance.md is chronological per-fire log; no formal ADR with immutable status (Proposed/Accepted/Deprecated/Superseded) + alternatives-archived + decision-drivers.

**Improvement**: Install log4brains (`npm i -g log4brains`); create `docs/adr/` folder; codify ADR template per user-doc Part 5; per-fire decisions get ADR entry; install-provenance.md continues as chronological audit log; ADRs are decision-permanent.

**Effort**: ~2 fires (install + template codification + first dogfood ADR)

**Expected value**: decision-archive for future recursion; rejected-alternatives explicitly archived; ADR-discoverable via static-site hot-reload

#### IMP-D: Skill-creator A/B integration (Pattern A apply: per codex T1 prescription #1 — VERIFY-BEFORE-INSTALL framing per CR-9 alternate-channel probe + CR-12 DUPLICATE-FUNCTIONALITY defense)

**Gap**: cross-model-consensus.md has formal T1/T2/T3 lifecycle but no behavioral A/B comparison step for component selection.

**Improvement**:
- **Step 1 (VERIFY-FIRST)**: Probe whether skill-creator capability is already installed via existing plugins; query `/plugin list` + `find .claude/plugins/cache -name "*.md" -path "*skill-creator*"` + grep marketplace.json files. CR-9 alternate-channel probe per Wave 112 Ship 2CC discipline.
- **Step 2 (INSTALL if absent)**: `/plugin install skill-creator@claude-plugins-official` via CR-6 official-native-channel
- **Step 3 (HARNESS CODIFICATION)**: codify project-task-prompt harness pattern; reference cross-model-consensus.md §Eval-case mandate Phase 1 (already exists for `evals/codex_miss_cases.jsonl`); add `evals/component_comparison_tasks.jsonl` for behavioral A/B
- **Step 4 (INTEGRATION)**: Inspect AI for SWE-bench-style evals on project tasks (Inspect AI already installed per Fire 28 probe)
- **Sister-rule integration target** (per codex T1 prescription #7): `evals/` directory docs + cross-model-consensus.md §Eval-case mandate

**Effort**: ~3 sub-fires (Fire 32a verify + install / Fire 32b harness design / Fire 32c initial A/B trial)

**Expected value**: behavioral comparison beyond verdict-quality; A/B catches semantic differences that paper-cite-counting misses

### TIER 2 — MEDIUM-LEVERAGE codifications (1-2 fires each)

#### IMP-E: Failure-mode comprehensive cross-reference (per codex T1 prescription #2/#3 — plan-attestation MOVED to IMP-C umbrella)

**Gap**: named-failure-modes.md has 20+ FMs; user-doc has 12 generic failure modes; mappings unclear.

**Improvement**: Add to named-failure-modes.md cross-reference table mapping user-doc failure modes to eee FM-N entries (e.g., user-doc "Prompt injection in research data" → FM-X new candidate; user-doc "Hallucinated repos" → existing Mia pre-apply discipline; etc.). SHA-256 plan-attestation codification MOVED to IMP-C umbrella per codex T1 prescription #3 (ADR/provenance formalization scope).

**Sister-rule integration target** (per codex T1 prescription #7): `Z:/claude-sota/.claude/rules/named-failure-modes.md`

**Effort**: ~1 fire

#### IMP-F: `.claudeignore` hardening + secret-pattern audit

**Gap**: eee has safety_guard.py + secret_scan_guard.py hooks; explicit `.claudeignore` file not codified.

**Improvement**: Create `.claudeignore` at workspace root with user-doc failure-mode #11 patterns (`.env*`, `*.pem`, `id_rsa*`, `.aws/`, `.ssh/`); audit hooks for coverage gap; document `.claudeignore` precedence over hook-level filters.

**Sister-rule integration target** (per codex T1 prescription #7): existing safety/secret hooks docs + queued security discipline doc

**Effort**: ~1 fire (create file + audit + sister-rule edit if needed)

#### IMP-G: Sigstore maintainer-credibility codification

**Gap**: eee SRA D4 maintainer-provenance tier doesn't formally probe Sigstore signatures.

**Improvement**: Add to SRA D4 sub-clause: "TIER-1-OFFICIAL OR TIER-2-NAMED-PRACTITIONER may be UPGRADED with Sigstore-verified release attestations; verification command: `cosign verify-attestation <artifact>`"; install cosign CLI as optional probe.

**Sister-rule integration target** (per codex T1 prescription #7): `Z:/claude-sota/.claude/rules/sota-research-architecture.md` D4 sub-clause + optional security docs

**Effort**: ~1 fire (sister-rule edit + optional install)

#### IMP-H: License allowlist (Pattern A apply — SPLIT per codex T1 prescription #4: license allowlist UPGRADED to TIER-2, NOT DEFER)

**Gap**: eee has OSV-Scanner + Trivy; no formal license allowlist (was a listed weakness #7); per codex T1 prescription #4 cannot DEFER something listed as weakness.

**Improvement**: Codify `docs/license-allowlist.md` with SPDX list (MIT / Apache-2.0 / BSD / MPL); add CI gate via `trivy fs --license` (Trivy already installed; no new tool); cross-link from SRA D1 use-class-precision lattice.

**Sister-rule integration target** (per codex T1 prescription #7): `Z:/claude-sota/.claude/rules/sota-research-architecture.md` D1 + queued security docs

**Effort**: ~1 fire (file + cite-link)

**Disposition**: TIER-2 INSTALL-LATER (corrected from prior DEFER)

### TIER 3 — LOWER-LEVERAGE codifications (genuine DEFER per CR-12 anti-patterns)

#### IMP-I: SBOM-pinned scanning (Pattern A apply — SPLIT FROM IMP-H per codex T1 prescription #4: SBOM scanning separate from license allowlist)

**Gap**: eee has OSV-Scanner + Trivy; no SBOM-pinned cross-build scanning (e.g., Syft + Grype + Dependency-Track).

**Improvement**: Install Syft + Grype OR Dependency-Track for continuous portfolio monitoring.

**Disposition**: DEFER (per CR-12 PARTIAL-OVERLAP with Trivy SBOM mode; per kiss-dry-yagni Must-Never #4; revisit when managing 10+ services per user-doc)

#### IMP-J: Sourcebot self-host (DEFERRED per user-doc anti-pattern + CR-12 PARTIAL-OVERLAP)

**Gap**: eee has no self-hosted multi-repo code search at scale.

**Disposition**: DEFER (eee is single-runtime; user-doc anti-pattern "do not install Sourcegraph + Sourcebot"; CR-12 PARTIAL-OVERLAP with ast-grep + Grep + RepoMix; revisit at 10+ repos scale)

### NEW IMP candidates added per codex T1 missing_improvements_candidates (3 additions)

#### IMP-K: Discovery source-quality scoring (separate from breadth count)

**Trigger**: codex T1 prescription "missing_improvements_candidates" #1 — discovery breadth count alone is INSUFFICIENT; each source has different signal quality.

**Improvement**: Augment IMP-A (multi-source discovery breadth gate) with per-source QUALITY scoring (e.g., named-org first-party API > community catalog > scraped HTML); SRA D11 should weight quality not just count; codify source-trust hierarchy in `docs/research-source-trust-hierarchy.md`.

**Sister-rule integration target**: sota-research-architecture.md D11 sub-clause + research-protocol.md §Discovery sub-rule

**TIER**: TIER-1 (complements IMP-A; deferred to Fire 29 follow-up OR sub-fire 29b)

#### IMP-L: Benchmark/eval corpus versioning for reproducibility

**Trigger**: codex T1 prescription "missing_improvements_candidates" #2 — weighted rubric scores aren't reproducible across fires without versioned eval corpus.

**Improvement**: Version `evals/codex_miss_cases.jsonl` + future `evals/component_comparison_tasks.jsonl` + future `docs/rubric.md` with explicit version tags (semver: rubric-v1.0.0, eval-corpus-v1.0.0); fire commits cite eval-corpus version + rubric version; sensitivity analysis tracks across versions.

**Sister-rule integration target**: cross-model-consensus.md §Eval-case mandate Phase 1 + future docs/rubric.md

**TIER**: TIER-2 (depends on IMP-B rubric codification first)

#### IMP-M: Discovery-candidate ALREADY-INSTALLED / CANDIDATE / RESEARCH-ONLY status field

**Trigger**: codex T1 prescription "missing_improvements_candidates" #3 — discovery candidates need explicit status to prevent duplicate-research or duplicate-install attempts.

**Improvement**: Codify candidate-tracking taxonomy in research-protocol.md OR sota-research-architecture.md: every discovery candidate carries one of {ALREADY-INSTALLED / POSSIBLY-INSTALLED-VERIFY / FRESH-CANDIDATE / ECOSYSTEM-REFERENCE / RESEARCH-ONLY / REJECTED-DOCUMENTED}; sota-researcher initialPrompt mandates status declaration; Mia pre-apply checks status before promotion to install-class.

**Sister-rule integration target**: research-protocol.md §Repo-discovery sub-rule + sota-researcher.md initialPrompt + mia-pre-apply.md status-validation extension

**TIER**: TIER-1 (high-leverage; prevents duplicate-install class of FM)

## Discovery: BEYOND user-doc — fresh SOTA repos to research in subsequent fires

Per user clarification "you can research sota repos and improve your researchect itself" — eee should run fresh discovery NOT constrained by user-doc list. Queued candidates for separate research fires (post-Fire 28 codex T1):

### Discovery sources eee should add to research protocol

1. **OSSInsight trending API** — `https://api.ossinsight.io/v1/trends/...` — 10B GitHub events; reveals 2026-fresh repos
2. **Hacker News + Reddit pull** — `r/MachineLearning` + `r/LocalLLaMA` + `r/ClaudeAI` + HN front-page — community signal
3. **Anthropic CC plugin marketplace fresh-listings** — `/plugin marketplace list` periodic re-scan
4. **claude-plugins-official + addy-agent-skills marketplace VERSION bumps** — periodic re-scan for added skills
5. **GitHub trending API direct** — `gh api search/repositories?q=topic:claude-code+sort:updated`
6. **arXiv stat.ML + cs.AI fresh papers** — `arxiv.org/list/cs.AI/recent` + Semantic Scholar trending
7. **DeepWiki Directory** — `deepwiki.com/explore` for newly-indexed repos
8. **codex CLI plugin ecosystem** — codex-plugin marketplaces for cross-vendor SOTA primitives

### Specific repos eee should research (BEYOND user-doc, fresh-discovery candidates — Pattern A apply: codex T1 prescription #5 added STATUS column)

| # | Candidate | Status | Notes |
|---|---|---|---|
| 1 | **anthropics/claude-agent-sdk-python** @ `b512f256` | FRESH-CANDIDATE | Wave 139A Top-5 #1 STUDY-PILOT (Python hooks wiring); needs Probe DAG audit |
| 2 | **eyaltoledano/claude-task-master** | FRESH-CANDIDATE | Wave 139A Top-5 #3 DEEP-PROBE-PENDING (task-mgmt orchestration) |
| 3 | **github/spec-kit** | ALREADY-INSTALLED | Wave 139A Top-5 #4 STUDY-PILOT-PATTERN-EXTRACT (pattern extraction queued for Fire 33b) |
| 4 | **swe-bench/swe-bench** | RESEARCH-ONLY | Wave 139A Top-5 #5 DEFER-EVAL-AXIS (reference benchmark; saturated per user-doc caveat #1) |
| 5 | **microsoft/markitdown** | ALREADY-INSTALLED | Pattern-extract for doc-ingestion (.local/bin/markitdown.exe) |
| 6 | **astral-sh/uv + ruff + ty** | ALREADY-INSTALLED | uv used in install commands; ruff via pre-commit; ty not verified |
| 7 | **fly/litefs + DuckDB + LanceDB** | RESEARCH-ONLY | Local vector store alternatives to sqlite-vec; current sqlite-vec sufficient |
| 8 | **getzep/zep** | RESEARCH-ONLY | Temporal knowledge graph alternative to Graphiti (incumbent); DUPLICATE-FUNCTIONALITY per CR-12 unless gap surfaces |
| 9 | **Cline / Continue.dev / Aider** | ECOSYSTEM-REFERENCE | Alternative agent harnesses; cross-pollination only (not adoption candidates) |
| 10 | **NEW Anthropic plugins shipped post-2026-05-01** | POSSIBLY-INSTALLED-VERIFY | 11 marketplaces connected; periodic re-scan for new plugin releases |
| 11 | **NEW awesome-* lists in last 30 days** | ECOSYSTEM-REFERENCE | `gh search repos awesome-claude-code created:>2026-04-10`; discovery-hint only (per failure-mode #2) |
| 12 | **VoltAgent / agno-agi / smolagents** | ECOSYSTEM-REFERENCE | Sister framework architecture cross-pollination (referenced in team-orchestration.md); RESEARCH-ONLY not adoption |

**Status taxonomy** (per codex T1 prescription #5 + IMP-M codification target):
- **FRESH-CANDIDATE**: not in eee; legitimate Probe DAG candidate
- **POSSIBLY-INSTALLED-VERIFY**: status ambiguous; needs targeted probe before classification
- **ALREADY-INSTALLED**: verified present in eee; pattern-extract OR upgrade candidate only
- **RESEARCH-ONLY**: reference / comparison / academic value; not an install candidate
- **ECOSYSTEM-REFERENCE**: discovery-hint catalogs / sister frameworks; not direct adoption
- **REJECTED-DOCUMENTED**: prior REJECT verdict on file (avoid re-research per `feedback_check_gitignore_before_porting.md` pattern)

## Recommended Fire 29-35 sequence (per IMP priorities — Pattern A apply per codex T1 prescription #8: Fire 33 explicitly depends on Fire 29+30; Fire 32 sub-fire breakdown explicit)

| Fire | Subject | Depends on | Effort | TIER |
|---|---|---|---|---|
| 29a | IMP-A: Multi-source discovery breadth codification (research-protocol.md OR sota-research-architecture.md D11 sub-rule) | — | ~1 fire | TIER-1 |
| 29b | IMP-K: Discovery source-quality scoring (sub-clause of IMP-A; SRA D11 weight quality not just count) | Fire 29a | ~1 fire | TIER-1 |
| 30 | IMP-B: Weighted rubric formal codification (docs/rubric.md + SRA/convergence-gate cross-link) | — | ~1 fire | TIER-1 |
| 31a | IMP-C step 1: log4brains install via official-native-channel + initial smoke probe | — | ~1 fire | TIER-1 |
| 31b | IMP-C step 2: ADR template codification + first dogfood ADR + plan-attestation FOLDED IN per codex T1 prescription #3 | Fire 31a | ~1 fire | TIER-1 |
| 32a | IMP-D step 1: VERIFY-FIRST skill-creator capability (probe `/plugin list` + marketplace.json grep); INSTALL via official channel ONLY IF ABSENT (CR-9 alternate-channel probe) | — | ~1 fire | TIER-1 |
| 32b | IMP-D step 2: Project-task-prompt harness codification (`evals/component_comparison_tasks.jsonl` + cross-model-consensus.md §Eval-case mandate integration) | Fire 32a | ~1 fire | TIER-1 |
| 32c | IMP-D step 3: First dogfood A/B trial (e.g., L8 observability backend choice) | Fire 32b | ~1 fire | TIER-1 |
| 33a | Fresh SOTA discovery — apply IMP-A discovery breadth gate (Fire 29a output) + IMP-K quality scoring (Fire 29b output); query: anthropics/claude-agent-sdk-python / eyaltoledano/claude-task-master / NEW Anthropic CC plugins / arXiv recent | Fire 29a + 29b | ~1 fire | TIER-1 |
| 33b | Fresh SOTA top-3 deep-dive — Probe DAG 1-7 + CR-12 5-class disposition per IMP-M status taxonomy (Fire 28 codified) | Fire 33a | ~1 fire | TIER-1 |
| 34 | IMP-E: Failure-mode comprehensive cross-reference (named-failure-modes.md ↔ user-doc 12 FMs) | — | ~1 fire | TIER-2 |
| 35 | IMP-F: .claudeignore hardening + secret-pattern audit | — | ~1 fire | TIER-2 |
| 36 | IMP-G: Sigstore maintainer-credibility codification (SRA D4 sub-clause + optional cosign install) | Fire 30 | ~1 fire | TIER-2 |
| 37 | IMP-H: License allowlist codification (SPLIT FROM SBOM-pinned scanning per codex T1 prescription #4) | Fire 30 | ~1 fire | TIER-2 |
| 38 | IMP-L: Benchmark/eval corpus versioning (depends on IMP-B rubric existence) | Fire 30 + Fire 32c | ~1 fire | TIER-2 |
| 39 | IMP-M: Discovery-candidate status taxonomy codification in research-protocol.md / sota-researcher initialPrompt | Fire 28 close | ~1 fire | TIER-1 |
| 40+ | Forward Discipline #2 cycle-322 promotion + further fresh SOTA discovery + carryover Fire 27-F Top-5 | Fire 28 codex T1 cycle-322 met | per evidence | per tier |

**Per codex T1 prescription #8 dependency clarification**: Fire 33a explicitly depends on Fire 29a+29b (uses the multi-source breadth gate + quality scoring from those fires). Fire 32 broken into 3 explicit sub-fires per cycle-300 ONE-LOGICAL-UNIT-PER-FIRE. Fire 38 depends on both IMP-B rubric (Fire 30) AND first A/B trial (Fire 32c) so versioning has empirical data.

## Cite anchor

- TIER-1-USER-DIRECTIVE clarification 2026-05-10 mid-Fire-28 ("they are just a inspiration, you can research sota repos and improve your researchect itself")
- TIER-2 sister rules: research-protocol.md / convergence-gate.md / sota-research-architecture.md / agent-harness-fit-verification.md / mia-pre-apply.md / fm20-path-drift-cascade.md / codex-t1-fix-forward-pattern.md / cross-model-consensus.md / kiss-dry-yagni.md / named-failure-modes.md
- TIER-3-LOCAL-OPERATOR-DERIVED: Wave 134 Fire 27 series (CR-12 lattice / Forward Discipline / INFRASTRUCTURE-CONVERGENT) + Wave 139A V2 TOP-5 + Wave 144 reclassify + extensive cross-arc accumulation

## Mia ladder advance (Fire 28 improvement doc)

n=2008 (gap-matrix) → **n=2030** (+22: methodology audit + STRENGTHS vs user-doc + WEAKNESSES vs user-doc + IMP-A multi-source discovery + IMP-B weighted rubric + IMP-C log4brains ADR + IMP-D skill-creator A/B + IMP-E FM cross-reference + IMP-F .claudeignore hardening + IMP-G Sigstore + IMP-H SBOM allowlist DEFER + IMP-I Sourcebot DEFER + 8 fresh discovery sources beyond user-doc + 12 specific fresh-discovery repo candidates + Fire 29-36 sequence + Effort/TIER classification + sister-rule strength/weakness audit + sota-researcher Sonnet-stand-in caveat + Mia post-return verification optional caveat + path-drift recovery-after-detection caveat + Pattern A vs A/B comparison gap + ADR vs install-provenance distinction + recursive promotion-fire dogfood note)
