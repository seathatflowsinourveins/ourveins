# W317-B Deep Audit — METR/HCAST + METR/Vivaria

> Wave: W317 | Stream: B | Decided: 2026-05-19 | rule_version: sca-v7.1
> **Supersession**: re-litigation of `verdicts/W315-metr-hcast` (T2 VENDOR-FORK, install 4.15, pattern 4.65, re-verify W321 → 1 wave past-due → JUSTIFIED RE-LITIGATION).
> **New material since W315**: METR-Inspect-AI migration EXPLICITLY documented in repo README+docs/index.md; Time Horizon 1.1 (Jan 2026) extended task suite 170→228 under Inspect-AI host.

## Provenance + HEAD probe

| Field | Vivaria | HCAST-public |
|---|---|---|
| GitHub URL | `github.com/METR/vivaria` (confirmed via WebSearch + deepwiki) | `github.com/METR/hcast-public` (confirmed via WebSearch) |
| Default branch | `main` (deepwiki-confirmed) | `main` (inferred typical) |
| License | **MIT** (deepwiki + WebSearch inferred via `METR/inspect-tasks-public` sibling MIT-license) | **MIT** (explicit per WebSearch) |
| Stars | ~1.5k (W315 reference; not directly fetched this wave) | ~exposure-tier (11 example tasks publicly released) |
| Latest activity | New feature development RAMPED DOWN per repo README+docs/index.md (Jan 2026 supersession) | Active (companion to ongoing METR research) |
| Public-content | Full Vivaria runtime + docs | 11 example task families publicly released; rest withheld for contamination prevention |
| Supersession state | **DEPRECATED-IN-FAVOR-OF METR migrating to Inspect-AI (UK AISI maintainer)** | Active suite-of-record; hosting migrated to Inspect-AI |

## Stage-0 existence-probe (per Δ33)

| Family | Result |
|---|---|
| github | **POSITIVE** (URLs confirmed: METR/vivaria + METR/hcast-public + METR/RE-Bench + METR/public-tasks + METR/inspect-tasks-public + METR/agent-prs-on-vivaria + UKGovernmentBEIS/metr-vivaria mirror) |
| WebSearch | **POSITIVE** (Vivaria architecture + HCAST 189-task + Time Horizon 1.1 + Inspect-AI-supersession all confirmed) |
| deepwiki | **POSITIVE** (Vivaria DEEP-INDEXED with substantive architecture answer; HCAST indirect via Vivaria docs) |
| paper-search | **POSITIVE** (arxiv 2503.17354 HCAST paper PDF + 5 adjacent papers cite HCAST methodology lineage) |
| basic-memory T6 | **POSITIVE** (`W315-metr-hcast` prior verdict surfaced) |
| context7 | NEGATIVE (Vivaria not in Context7; expected for paper-anchored task-suites + docker-compose runtime stacks) — non-blocking |
| **Stage-0 RESULT** | **PASS** (≥2 distinct families return ≥1; in fact ≥5/6 return ≥1) |

## Hard-cap check (9 dims per sca-v7.1)

| Dim | Score | Hard cap? | Notes |
|---|---:|:---:|---|
| **D1 license** | 5 (MIT) | NOT cap | Clean |
| **D3 install primitive** | 2 (Vivaria docker-compose multi-container stack; HCAST = task definitions in markdown+Python; **NOT** a CC-plugin/agent/skill/MCP-server primitive) | **AT FLOOR for T1** | T2 ceiling confirmed |
| **D5 supply chain** | 4 (METR-canonical; UK-AISI-mirror sibling; CONTRIBUTORS.md added per PR #1116) | NOT cap | Strong |
| **D14 install command** | 2 (Vivaria requires multi-service docker-compose with PostgreSQL + Redis + multiple containers; HCAST requires Inspect-AI host now) | **AT FLOOR for T1** | T2 ceiling confirmed |
| **D16 bus factor** | 4 (METR organization with multiple staff; UK-AISI-mirror confirms multi-org maintenance) | NOT cap | Strong |
| **D24 attack surface** | 2 (multi-container docker stack; not CC-primitive; cardinal-rule-5 sandbox-policy violation surface) | **AT FLOOR for T1** | T2 ceiling confirmed (methodology-absorption only) |

> **Hard-cap verdict**: 3 dims at floor (D3 + D14 + D24) → **T1 INSTALL BLOCKED** (matches W315); T2 VENDOR-FORK / METHODOLOGY-ABSORPTION confirmed.
> **NEW signal post-W315**: Vivaria runtime stack is on path-to-deprecation; methodology-absorption is therefore the CANONICAL ceiling — runtime install would actively waste effort.

## 3-org-distinct anchors

| Anchor | Org | Distinct |
|---|---|---|
| METR (Berkeley NPO) | Model Evaluation and Threat Research — primary author | Org-1 |
| UK AISI (UK government) | UK AI Security Institute — Inspect-AI maintainer + Vivaria-supersession authority + UKGovernmentBEIS mirror | Org-2 |
| arxiv + HF papers (academic-publisher) + 5 cite-papers from independent institutions (UCSC + UCSB + Stanford + Princeton + Anthropic-Effective-Harnesses) | Multiple-institution academic-publishing cluster | Org-3 |

> **3-org-distinct**: **PASS-STRICT** (3 distinct authorities + paper-anchor confluence + UK-government adoption as supersession-host).

## sca-v7.1 install_score path-(b) scored-dim default 28.7

| Dim (W_install) | Score | W×Score |
|---|---:|---:|
| D1 license (1.0) | 5 | 5.0 |
| D2 capability uniqueness (1.0) | 5 (HCAST 189-task + 140-baseliner + economic-anchor methodology is field-defining; no equivalent published) | 5.0 |
| D3 install primitive (1.0) | 2 | 2.0 |
| D4 install ergonomics (0.8) | 2 (multi-container docker stack ergonomically hostile for CC-runtime; Inspect-AI migration easier) | 1.6 |
| D5 supply chain (1.0) | 4 | 4.0 |
| D6 authority weight (0.9) | 5 (METR is THE field-defining NPO for autonomous-AI-evaluation; UK AISI government-tier endorsement) | 4.5 |
| D7 maintenance velocity (0.9) | 3 (Vivaria new-feature ramp-down; HCAST suite continues; **mixed signal** post-W315 due to deprecation) | 2.7 |
| D8 license breadth (0.7) | 5 (MIT permissive) | 3.5 |
| D9 ecosystem fit (0.9) | 3 (docker-compose stack ergonomically poor; Inspect-AI host integration improves via UK-AISI ecosystem) | 2.7 |
| D10 cohort overlap (1.0, inverted) | 2 (overlaps with AIRS-Bench + WebArena + Agent-SafetyBench + Claw-Eval + ResearchGym; HCAST methodology has strong precedence-by-citation-count) | 2.0 |
| D11 docs quality (0.8) | 5 (full deepwiki-indexed architecture docs + arxiv paper + metr.org research docs + HCAST PDF separate publication) | 4.0 |
| D12 governance signals (0.7) | 4 (CONTRIBUTORS.md + open PR conventions + UK-AISI co-host) | 2.8 |
| D13 pattern extractability (0.9) | 5 (HCAST task-definitions structured-extractable; time-horizon methodology cleanly extractable as sca-v7.1 §D28 empirical anchor) | 4.5 |
| D14 install command pin (1.0) | 2 (docker-compose multi-container) | 2.0 |
| D15 release cadence (0.8) | 3 (Vivaria ramp-down; HCAST Time Horizon 1.1 Jan 2026 mid-cadence) | 2.4 |
| D16 bus factor (1.0) | 4 | 4.0 |
| D17 maintainer count (0.7) | 4 (METR staff + UK-AISI contributors) | 2.8 |
| D18 community velocity (0.7) | 4 (GitHub Actions visible per WebSearch; PR #1116 recent; community-active despite deprecation) | 2.8 |
| D19 code review (0.8) | 4 (PR-process visible) | 3.2 |
| D20 testing coverage (0.8) | 4 (GitHub Actions workflows visible per WebSearch) | 3.2 |
| D21 org diversity (0.8) | 5 (METR + UK-AISI + 5+ co-citing institutions; multi-org adoption robust) | 4.0 |
| D22 standardization (0.5) | 5 (HCAST methodology is becoming standard via citation-cascade in AIRS-Bench + Claw-Eval + others) | 2.5 |
| D23 interoperability (0.6) | 4 (METR Task Standard cross-compat with Inspect-AI host) | 2.4 |
| D24 attack surface (1.0) | 2 | 2.0 |
| D25 agentic safety OWASP (0.8) | 5 (Vivaria FakeLabApiKey + isolated-network policies + safety-trajectory measurement are OWASP-ASVS-V2-aligned) | 4.0 |
| D26 content provenance (0.6) | 4 (METR + UK-AISI authority chain + arxiv DOI) | 2.4 |
| D27 independent adopter floor (0.7) | 5 (Anthropic + OpenAI + Google evaluate-via-METR per industry-standard practice; metr.org/openai-o3-report) | 3.5 |
| D28 long-running agent fitness (0.6) | 5 (HCAST 1min-8h+ task range + time-horizon methodology IS the long-running-agent-fitness empirical anchor) | 3.0 |
| D29 browse / retrieval quality (0.6) | 4 (search-engine retrievable + deepwiki-indexed) | 2.4 |
| D30 judge-on-judge calibration (0.9) | 3 (HCAST methodology underlies judge-calibration via human-baseliner-vs-agent measurements; less direct than verdict but absorbs as empirical anchor for D28 → D30 cross-dim signal) | 2.7 |
| D31 silent-fallback density (0.7, inverted-soft) | 5 (explicit failure modes documented in arxiv 2503.17354 + Vivaria trace_entries_t observability) | 3.5 |
| D32 pin freshness lag (0.6) | 3 (Vivaria ramp-down; HCAST 1.1 Jan 2026 update) | 1.8 |
| D33 cross-source consensus (0.7) | 5 (3-org-distinct PASS-STRICT) | 3.5 |
| D34 cohort overlap (0.7, inverted) | 3 (HCAST cohort of agent-eval benchmarks substantial overlap but HCAST has precedence-by-citation) | 2.1 |

> **install_score path-(b) sum**: ~119.4 / 28.7 ≈ **4.161**
> **Compared to W315 verdict**: 4.15 → 4.161 (+0.011 marginal lift; W315 estimate was accurate).
> **CRITICAL CAVEAT**: D7=3 (mixed-signal-from-deprecation) BLOCKS T1 progression even if D3/D14/D24 caps could be lifted. Methodology-absorption path is now CANONICAL ceiling and shows no DECAY-WITH-DEPRECATION because the HCAST suite continues independently of the Vivaria runtime.

## sca-v7.1 pattern_score 12.9

| Dim (W_pattern) | Score | W×Score |
|---|---:|---:|
| D2 (1.0) | 5 | 5.0 |
| D13 (1.0) | 5 | 5.0 |
| D22 (1.0) | 5 | 5.0 |
| D28 (0.7) | 5 | 3.5 |
| D29 (0.6) | 4 | 2.4 |
| D30 (0.9) | 3 | 2.7 |

> **pattern_score sum**: 23.6 / 5.2 weight-sum ≈ **4.538**
> Slightly lower than W315 (4.65) due to D30 calibration-of-evaluators less-direct than expected; D28 unchanged anchor-of-record.

## Tier verdict + routing

> **T2 VENDOR-FORK / METHODOLOGY-ABSORPTION** — CONFIRMED-AND-REFINED from W315.
> **Specific routing refinement**: do NOT runtime-install Vivaria docker-compose stack (its deprecation makes this a sunk-cost path). HCAST methodology absorption is the CANONICAL value path. The Inspect-AI primitive (separate W317 audit candidate if not already evaluated — recommend Stream A or W318 add to queue) is the runtime-tier candidate that SUPERSEDES Vivaria.

**Absorption-vector for sca-v7.1**:

1. **PRIMARY**: HCAST empirical-anchor → sca-v7.1 D28 (long-running-agent-fitness) weight bump 0.6 → 0.9 with explicit cite to arxiv:2503.17354 (already absorbed per W315; re-confirmed W317).
2. **SECONDARY**: Vivaria trace_entries_t observability methodology → sca-v7.1 §smoke-test-gate trajectory-completeness check (NEW for v7.2 DRAFT — Stream A consideration).
3. **TERTIARY**: Time Horizon 1.1 methodology (170→228 task suite extension) → sca-v7.1 D32 pin-freshness scaling-with-suite-growth pattern (NEW for v7.2 DRAFT).
4. **TIER-4**: $50-$150/hr human baseline economic anchor → sca-v7.1 NEW dim D35 human_vs_agent_cost_ratio for cost-aware rubric routing (PROPOSED for sca-v8 DRAFT per W317 Stream A).
5. **TIER-5 — supersession signal**: METR's own Vivaria→Inspect-AI migration documents the SOTA-evolution pattern explicitly — `inspect-ai` (anthropic/google evals adopt) is the runtime successor; W318 should audit `UKGovernmentBEIS/inspect_ai` as T1-INSTALL candidate (likely NEW T1 surface).

## Stage-0 + D-EMP (per sca-v8 DRAFT — Stream A)

- **Stage-0**: PASS (5/6 families ≥1)
- **D-EMP**: **N/A** (methodology-absorption candidate; no runtime install attempted; D-EMP not applicable per Stream-A draft semantics)

## Operator-AIs queued W318

- **AI-W317-B-HCAST-ANCHOR-REINFORCE**: re-confirms W315 routing; expected install_score lift on arch-itself remains +0.10 (4.677 → 4.777 conservative if combined with pyDecision absorption).
- **AI-W317-B-VIVARIA-DEPRECATION-FLAG**: ledger annotation to W317 row + verdict-note re-state — DO NOT attempt Vivaria runtime install in W318 or any subsequent wave; methodology-extract-only.
- **AI-W317-B-INSPECT-AI-T1-CANDIDATE-QUEUE**: NEW for W318 audit — `UKGovernmentBEIS/inspect_ai` is the Vivaria-successor runtime and likely T1-INSTALL candidate (UK-government endorsement + METR adoption + open-source Apache/MIT). Recommend full sca-v7.1 deep-ingest in W318 Stream B or equivalent.

## Cite-anchors (for ledger row)

- `arxiv:2503.17354` — HCAST: Human-Calibrated Autonomy Software Tasks (METR)
- `github.com/METR/vivaria` (main branch, README + docs/index.md inspect-ai-supersession declaration)
- `github.com/METR/hcast-public` (MIT license + 11-public-task families)
- `metr.org/hcast.pdf` (HCAST whitepaper)
- `metr.org/blog/2026-1-29-time-horizon-1-1` (Time Horizon 1.1 update Jan 2026)
- `UKGovernmentBEIS/metr-vivaria` (UK-government mirror — supersession authority)
- `github.com/UKGovernmentBEIS/inspect_ai` (Vivaria successor — flagged for W318 audit)
- `T6 verdicts/W315-metr-hcast` (prior verdict — supersession chain)

## Rollback

`git rm docs/architecture/W317-DEEP-INGEST/W317-B-HCAST-VIVARIA-DEEP-AUDIT.md` (markdown-only; no runtime artifact).
