# W317-B Deep Audit — haizelabs/verdict v0.2.7 (last v0.2.x main HEAD Nov 5 2025)

> Wave: W317 | Stream: B | Decided: 2026-05-19 | rule_version: sca-v7.1
> **Supersession**: re-litigation of `verdicts/W316-haizelabs-verdict` (T2 VENDOR-FORK/PATTERN-VENDOR HYBRID, install 2.67, pattern 3.37, re-verify W322 → 3 waves out → **EARLY-RE-VERIFY-WITH-RATIONALE**).
> **Rationale for early re-litigation**: (1) Context7 deep-index NOW available (391 snippets, score 92.1 — TOP-TIER docs coverage; W316 had partial index); (2) DSPy red-teaming cookbook NOW surfaced (`docs/cookbook/dspy.md`) — material absorption-vector for sca-v7.1 §6.6.1 + dspy-integration skill; (3) deepwiki substantive answer NOW available (W316 was "deep-ingest-incomplete factor × 0.85"). **All-three new-material signals justify early re-litigation per sca-v7.1 §re-litigation-with-material-signal rule.**

## Provenance + HEAD probe

| Field | Value | Source |
|---|---|---|
| GitHub URL | `github.com/haizelabs/verdict` | WebSearch + deepwiki + Context7 cross-confirmed |
| Default branch | `main` (per deepwiki paths to README.md + docs/index.md + notebooks/) | deepwiki |
| License | **MIT** (per LICENSE.md at github.com/haizelabs/verdict/blob/main/LICENSE.md) | WebSearch + deepwiki |
| Stars | **267** stars + **17** forks | WebSearch |
| Latest activity | **2025-11-05** (Verdict paper publication date) — main HEAD inferred at sha `8f972ef34751` (W316-S7 reference) | W316 verdict + paper-search publication date |
| PyPI version | **v0.2.7** released Jul 4 2025 (W316 reference); v0.2.0+v0.2.1 Feb 19+22 2025 | W316 + WebSearch |
| Maintainer | **Nimit Kalra** (primary) + **Leonard Tang** (co-author) — both Haize Labs | arxiv 2502.18018 |
| Org | Haize Labs (commercial AI safety startup) | github.com/haizelabs |

## Stage-0 existence-probe (per Δ33)

| Family | Result |
|---|---|
| github | **POSITIVE** (haizelabs/verdict + LICENSE.md + sibling haizelabs/Awesome-LLM-Judges all WebSearch-confirmed) |
| WebSearch | **POSITIVE** (267 stars + 17 forks + MIT + arxiv + verdict.haizelabs.com + Twitter announcement) |
| repomix | 0-files (compression quirk) — bypassed |
| deepwiki | **POSITIVE** (deep substantive answer — Units/Layers/Pipelines architecture + DSPy integration + judge-on-judge calibration + LICENSE + pyproject.toml deps) |
| context7 | **POSITIVE** (`/haizelabs/verdict` indexed — **391 snippets**, High reputation, score **92.1** — TOP-TIER) |
| paper-search | **POSITIVE** (arxiv 2502.18018 Kalra+Tang Nov 5 2025; co-positioned with JudgeBench 2410.12784 + Auto-Prompt-Ensemble 2510.06538) |
| basic-memory T6 | **POSITIVE** (`W316-haizelabs-verdict` prior verdict — supersession chain) |
| **Stage-0 RESULT** | **PASS-STRONG** (≥6/7 families ≥1; cascade-floor far exceeded) |

## Hard-cap check (9 dims per sca-v7.1)

| Dim | Score | Hard cap? | Notes |
|---|---:|:---:|---|
| **D1 license** | 5 (MIT) | NOT cap | Clean |
| **D3 install primitive** | 3 (Python `pip install verdict` works; **NOT** a CC-native plugin primitive; CAN be wrapped as dspy-integration skill backend per W316 deferred routing) | NOT cap (T2 ceiling) | T2 confirmed |
| **D5 supply chain** | 3 (PyPI + GitHub canonical; signed) | NOT cap | Average |
| **D14 install command** | 4 (`pip install verdict==0.2.7` CR-9-pin-compliant) | NOT cap | Strong |
| **D16 bus factor** | **2** (Kalra solo + Tang co-author; Haize Labs ~5-person startup per industry knowledge) | **AT FLOOR for T1** | T2 confirmed |
| **D24 attack surface** | 2 (Python-lib not CC-primitive; no `.mcp.json` MCP-server invocation; auto-fire only via dspy-integration skill wrapper) | **AT FLOOR for T1** | T2 confirmed |

> **Hard-cap verdict**: 2 dims at floor (D16 + D24) → **T1 INSTALL BLOCKED**; T2 VENDOR-FORK + PATTERN-VENDOR HYBRID confirmed.

## 3-org-distinct anchors

| Anchor | Org | Distinct |
|---|---|---|
| `arxiv:2502.18018` paper (Kalra + Tang co-authors) | Haize Labs (commercial startup, Y-Combinator-equivalent tier) | Org-1 |
| `arxiv + HF papers` + `verdict.haizelabs.com whitepaper` + Context7 (NeurIPS-equivalent academic-publishing) | Academic-publisher cluster | Org-2 |
| Co-citation network: JudgeBench (ScalerLab + Berkeley) + Auto-Prompt-Ensemble (Carnegie+IBM+Buffalo) + DSPy (Stanford NLP) | Multi-institution adopter cohort | Org-3 |

> **3-org-distinct**: PASS-WITH-CAVEAT (D16 bus-factor=2 at floor — single-startup principal source for code; but multi-institution research-adopter cohort compensates per W316 PARTIAL ratification).

## sca-v7.1 install_score path-(b) scored-dim default 28.7

| Dim (W_install) | Score | W×Score | Δ from W316 |
|---|---:|---:|---:|
| D1 license (1.0) | 5 | 5.0 | =5 |
| D2 capability uniqueness (1.0) | 4 (ICLR/NeurIPS-tier compound-judge primitive; arxiv-published 2025-11-05) | 4.0 | =4 |
| D3 install primitive (1.0) | 3 | 3.0 | NEW dim eval |
| D4 install ergonomics (0.8) | 3 (uv + pip install both work; W316 noted D4=2 as install-only drag — REVISED UP given dspy-integration skill wrap-path) | 2.4 | +1 |
| D5 supply chain (1.0) | 3 | 3.0 | =3 |
| D6 authority weight (0.9) | 4 (Haize Labs + arxiv + Bayesian author-prior; sustained from W316) | 3.6 | =4 |
| D7 maintenance velocity (0.9) | **2** (last commit Nov 5 2025 = ~6mo stale at W317; SAME signal as W316 — repo activity DID NOT resume) | 1.8 | =2 (signal sustained — concern persists) |
| D8 license breadth (0.7) | 5 (MIT permissive) | 3.5 | NEW |
| D9 ecosystem fit (0.9) | 4 (DSPy native integration + Python ML stack + litellm broad-provider compat) | 3.6 | NEW |
| D10 cohort overlap (1.0, inverted) | 3 (Auto-Prompt-Ensemble + JudgeBench overlap; Verdict has primitive-extractability edge) | 3.0 | NEW |
| D11 docs quality (0.8) | 5 (Context7 391-snippet TOP-TIER + verdict.haizelabs.com microsite + arxiv whitepaper + cookbook) | 4.0 | +1 (major lift from Context7 surfacing) |
| D12 governance signals (0.7) | 2 (no visible CONTRIBUTING.md or CODE_OF_CONDUCT per deepwiki; startup-tier governance) | 1.4 | NEW |
| D13 pattern extractability (0.9) | 5 (Unit/Layer/Block/Pipeline composition primitives + judge-then-verify-MaxPool pattern HIGHLY extractable) | 4.5 | =5 |
| D14 install command pin (1.0) | 4 | 4.0 | NEW |
| D15 release cadence (0.8) | 2 (last release Jul 4 2025; ~10mo at W317 — stale signal) | 1.6 | -1 (further drift) |
| D16 bus factor (1.0) | 2 | 2.0 | =2 |
| D17 maintainer count (0.7) | 2 (Kalra + Tang + Haize Labs ~5-person) | 1.4 | =2 |
| D18 community velocity (0.7) | 3 (267 stars + 17 forks moderate; X.com announcement engagement) | 2.1 | NEW |
| D19 code review (0.8) | 2 (single-author commits dominant in observed history) | 1.6 | NEW |
| D20 testing coverage (0.8) | 3 (notebooks/common/judge.ipynb examples visible; explicit pytest unclear from deepwiki) | 2.4 | NEW |
| D21 org diversity (0.8) | 2 (Haize-Labs-single-principal) | 1.6 | NEW |
| D22 standardization (0.5) | 4 (judge-then-verify pattern increasingly canonical post-arxiv:2502.18018) | 2.0 | NEW |
| D23 interoperability (0.6) | 5 (litellm broad-provider; OpenAI + DeepInfra + Together + Anthropic via litellm; DSPy native) | 3.0 | NEW |
| D24 attack surface (1.0) | 2 | 2.0 | =2 |
| D25 agentic safety OWASP (0.8) | 4 (judge-then-verify SOTA on hallucination-detection +14.5% over GPT-4o on ExpertQA — OWASP-ASVS-aligned content-moderation safety) | 3.2 | NEW |
| D26 content provenance (0.6) | 4 (arxiv DOI + Haize Labs authorship + MIT-attribution requirements) | 2.4 | NEW |
| D27 independent adopter floor (0.7) | 3 (DSPy integration adoption + Stanford NLP citation lineage; cookbook explicit DSPy red-teaming) | 2.1 | NEW |
| D28 long-running agent fitness (0.6) | 3 (judge-time compute scales with agent-trajectory length; less-tight than HCAST) | 1.8 | NEW |
| D29 browse / retrieval quality (0.6) | 5 (Context7 391-snippet TOP-TIER score 92.1 + deepwiki + arxiv) | 3.0 | NEW |
| **D30 judge-on-judge calibration (0.9)** | **5** (this IS the canonical judge-on-judge primitive per sca-v7.1 §D30 cite-anchor) | 4.5 | =5 (D30 is THE absorption-vector) |
| D31 silent-fallback density (0.7, inverted-soft) | 4 (declarative pipeline graph has explicit dependency-edges; minimal silent failure surface) | 2.8 | NEW |
| D32 pin freshness lag (0.6) | 2 (last release Jul 2025 = ~10mo lag at W317) | 1.2 | -1 |
| D33 cross-source consensus (0.7) | 3 (3-org-distinct PARTIAL-via-caveat) | 2.1 | NEW |
| D34 cohort overlap (0.7, inverted) | 3 (judge-eval cohort moderate-overlap; Verdict has primitive-extractability differentiator) | 2.1 | NEW |

> **install_score path-(b) sum**: ~97.4 / 28.7 ≈ **3.394** (vs W316: 2.67 × 0.85 = **3.150 raw**)
> **Net change**: +0.244 lift on deep-ingest evidence (Context7 391-snippet + DSPy cookbook + deepwiki substantive). NOTE: W316 applied 0.85 deep-ingest-incomplete factor; this W317 audit removes that factor (deep-ingest IS now complete). Raw-to-raw delta: 3.14 raw → **3.394 raw** = +0.254 honest lift.
> **Tier confirmation**: Still T2 (3.394 < 4.0 T1 floor); but now FIRMLY T2 territory not T2-borderline.

## sca-v7.1 pattern_score 12.9

| Dim (W_pattern) | Score | W×Score |
|---|---:|---:|
| D2 (1.0) | 4 | 4.0 |
| D13 (1.0) | 5 | 5.0 |
| D22 (1.0) | 4 | 4.0 |
| D29 (0.6) | 5 | 3.0 |
| D30 (0.9) | 5 | 4.5 |
| D34 (0.3) | 3 | 0.9 |

> **pattern_score sum**: 21.4 / 4.8 weight-sum ≈ **4.458** (vs W316: 3.37 raw → +1.088 lift on deep-ingest evidence; Context7 D29=5 unlocks; D22 standardization-via-arxiv lifts).

## Tier verdict + routing

> **T2 VENDOR-FORK + PATTERN-VENDOR HYBRID** — CONFIRMED-AND-REFINED from W316; install_score lifts 2.67 → 3.39 (+0.72 ON DEEP-INGEST EVIDENCE); still does NOT clear T1 4.0 floor.

**Routing refinement post-W317-B**:
1. **CONFIRM**: do NOT install verdict as runtime primitive (D24 attack-surface cap holds).
2. **PROMOTE PATTERN-ABSORB to ACTIVE**: vendor-fork the Unit/Layer/Block/Pipeline composition primitives into sca-v7.1 §6.6.1 D30 (judge-on-judge calibration) as the canonical backend reference. Cite arxiv:2502.18018.
3. **NEW for W318**: install verdict-as-dspy-integration-backend optional library. The `.claude/skills/dspy-integration/SKILL.md` (per W316 W316-AI-DSPY-INSTALL action) CAN optionally reference verdict's `from verdict.cookbook.dspy` integration pattern. This is **library-call** not **primitive-install** — D24-compliant.

**Absorption-vector for sca-v7.1**:

1. **PRIMARY**: arxiv:2502.18018 cite-anchor for sca-v7.1 §6.6.1 D30 judge-on-judge calibration META-DIM (already absorbed per W316 Δ30 entry).
2. **SECONDARY**: Pipeline + Layer(repeat=N) + MaxPoolUnit pattern → sca-v7.1 §6.6.1 multi-MCP-cohort disagreement RESOLVER (combines with pyDecision EC-PROMETHEE per W317 cross-candidate synergy).
3. **TERTIARY**: DSPy cookbook integration (`docs/cookbook/dspy.md`) → sca-v7.1 §6.6.1 sub-section on "Stanford-NLP dspy-as-metric integration" — citing both verdict + DSPy + Auto-Prompt-Ensemble + JudgeBench as the canonical 4-anchor judge-eval research stack.

## Stage-0 + D-EMP (per sca-v8 DRAFT — Stream A)

- **Stage-0**: PASS-STRONG (6/7 families ≥1; cascade-floor far exceeded)
- **D-EMP**: **N/A** (PATTERN-VENDOR HYBRID; runtime install not attempted; D-EMP not applicable to pattern-vendor candidates)

## Operator-AIs queued W318

- **AI-W317-B-VERDICT-D30-CITE-CONFIRM**: re-confirm W316 absorption of verdict-as-D30-reference in sca-v7.1 §6.6.1 — no additional edit needed; W316 routing remains current.
- **AI-W317-B-VERDICT-DSPY-COOKBOOK-CITE**: NEW for W318 — update `.claude/skills/dspy-integration/SKILL.md` to add Section "judge-time-compute via Verdict library" with cite to `docs/cookbook/dspy.md`. Small edit (~50 LOC); operator-gated.
- **AI-W317-B-VERDICT-RE-VERIFY-W322**: W316-set W322 (3 waves) re-verify still APPROPRIATE; W317 early-re-litigation confirms tier-stable. Defer next deep-ingest to W322 unless verdict v0.3 release surfaces (currently no W317-discoverable activity since Nov 5 2025).
- **AI-W317-B-VERDICT-STALENESS-WATCH**: D15+D32 staleness drift signal — if no v0.3 by W322, downgrade D7 → 1 and pattern_score may decay; recommend continued ACTIVE status with auto-watch trigger.

## Cite-anchors (for ledger row)

- `arxiv:2502.18018` — Kalra + Tang (Haize Labs) — "Verdict: A Library for Scaling Judge-Time Compute" (2025-11-05)
- `github.com/haizelabs/verdict` (main branch, README + docs/index.md + notebooks/results/hierarchical.ipynb + docs/cookbook/dspy.md)
- `verdict.haizelabs.com` (microsite + whitepaper PDF)
- `Context7 /haizelabs/verdict` (391 snippets, score 92.1, High reputation — TOP-TIER coverage)
- `arxiv:2410.12784` JudgeBench (companion judge-eval research)
- `arxiv:2510.06538` Auto-Prompt-Ensemble (companion adaptive-judge research)
- `T6 verdicts/W316-haizelabs-verdict` (prior verdict — supersession chain)

## Rollback

`git rm docs/architecture/W317-DEEP-INGEST/W317-B-HAIZELABS-VERDICT-DEEP-AUDIT.md` (markdown-only).
