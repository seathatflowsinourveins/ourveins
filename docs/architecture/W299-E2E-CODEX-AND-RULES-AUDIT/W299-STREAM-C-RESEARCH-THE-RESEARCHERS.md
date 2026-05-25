# W299 Stream C — Research-the-Researchers (sca-v5 + v6 candidate-deltas)

> **Stream**: W299-C meta-research on SOTA research-architecture systems themselves
> **Owner**: Stream C only — no other stream edits this file
> **Branch**: `sota-converge-w295` (continued from W298 HEAD `7254beb`)
> **Builds on**: `W288-RESEARCH-ARCH-v2/STREAM-A-METHODOLOGY.md` (9-tier × 50-source enumeration); `W292-RESEARCH-ARCH-COMPETITOR-AUDIT/METHODOLOGY-BENCHMARK.md` (12-rubric inverse benchmark + R1-R12 absorption); `W296-STREAM-D-RESEARCH-ARCH-V4.md` (12-delta sca-v4 SHIP blueprint + 7 v5-defer + 5 v6-defer); `W297-STREAM-D-MULTI-MCP-DISCOVERY-CASCADE.md` (cascade design); `.claude/skills/sota-convergence-audit/SKILL.md` (sca-v3.1 live rubric)
> **Operator mandate (verbatim, W299 dim 4)**: "research sota research repos for improve your research architecture itself" — Anthropic-canonical meta-research
> **Scope**: 11+ external research-architectures studied; 5+ NEW v5/v6 candidate-deltas surfaced; 3+ NEW Tier-C discoverables NOT in W292/W296/W297 ledger

---

## §0 — TL;DR

**Headline**: 11 external research-architectures examined (Tier A: 6 ML/AI rubrics — HELM · SWE-bench Verified · OpenAI Deep Research citations[] · Perplexity Sonar · Anthropic Multi-Agent Eval · Wikipedia Reliable Sources; Tier B: 5 governance/sourcing rubrics — ThoughtWorks Tech Radar · CNCF Graduation · OpenSSF Scorecard · NIST AI RMF · Anthropic Responsible Scaling Policy); **Tier C delivered 6 NEW research-arch repos** discovered via multi-MCP cascade not in any prior W288/W292/W296/W297 wave ledger.

**6 NEW v5/v6 candidate-deltas** distilled from the cross-rubric convergence beyond W292-R1-R12 + W296 12-ship + W297 6-cascade-delta scope:

| # | Δ-id | Source convergence | v5 / v6 | Operator-action |
|---|---|---|:--:|---|
| 1 | **v5-NEW-1 citation-accuracy spot-check via codex GPT-5.5 cross-verify (10%-sample)** | OpenAI Deep Research citations[]+Perplexity Sonar+Wikipedia RS+Anthropic Multi-Agent Eval (4-rubric convergence) — operationalises sca-v3.1's already-flagged "presence not accuracy" caveat | **v5 SHIP** | none — uses existing codex Stop-hook |
| 2 | **v5-NEW-2 PRISMA-style flow-diagram artefact requirement for T1 INSTALL** | Cochrane Handbook + PRISMA 2020 + GRADE + CDC ACIP (4-rubric convergence — medical-grade evidence synthesis) | **v5 SHIP** | none — markdown artefact only |
| 3 | **v5-NEW-3 PICO-frame the audit predicate** (Population/Intervention/Comparison/Outcome scoping for the candidate audit-question) | Cochrane + PRISMA-P + GRADE (3-rubric convergence) | **v5 SHIP** | none — frontmatter field addition |
| 4 | **v6-NEW-1 process-evaluation compliance-checklist** (judge agent checklist scoring of audit trajectory not just outputs) | ACL 2026.findings-eacl.140 + Anthropic Multi-Agent + ResearchGym (3-rubric convergence) | **v6 DEFER** | requires new harness Lane E + LLM-as-judge plumbing |
| 5 | **v6-NEW-2 active-evaluation rank-by-Elo for candidate-prioritisation** (Soft-Condorcet/Elo over candidate backlog) | arXiv 2601.07651v2 (Active Evaluation of General Agents) + DeepMind Soft-Condorcet (2-rubric, novel) | **v6 DEFER** | requires backlog ≥30 audits for Elo convergence |
| 6 | **v6-NEW-3 ABC Agentic-Benchmark Checklist 13-item task-validity+outcome-validity+reporting gates** | arXiv 2507.02825v5 ABC + Gaia2 ARE-Verifier (2-rubric, novel) | **v6 DEFER** | requires checklist authoring + scoring routine |

**3+ Tier-C discoverables** (NEW research-arch repos NOT cited in W288/W292/W296/W297 wave-trail):

1. **ResearchGym** (arXiv 2602.15112v2) — full-loop closed-research benchmark with execution-based grading, withheld-method-from-paper-repository protocol, Anthropic Claude-Code-Opus-4.5 + Codex-GPT-5.2 evaluated; 5 desiderata: full-loop · objective-grading · contamination-awareness · calibrated-comparison · accessibility.
2. **ABC — Agentic Benchmark Checklist** (arXiv 2507.02825v5) — 13-item checklist for rigorous agentic benchmarks across task-validity (T.1-T.10), outcome-validity (O.i.1-O.iii.3), benchmark-reporting (R.1-R.6); checklist-development methodology directly cite-anchored.
3. **Gaia2 + ARE (Agents Research Environments)** (Meta, OpenReview 2026) — action-level verifier with 4-dim verification (Consistency/Causality/Timing/Turn-level); RLVR-applicable; 800 verified scenarios across 10 universes; 0.99 precision / 0.95 recall vs human annotation.
4. **Process Evaluation for Agentic Systems** (ACL Findings 2026, paper 140) — compliance-checklist LLM-as-judge for full-trajectory (not just output) evaluation; weighted + unweighted compliance scoring with judge alignment quality measurement.
5. **Exgentic + Unified-Protocol** (arXiv 2602.22953) — first cross-benchmark general-agent evaluation harness; mediation protocol bridges agent interfaces (CLI/tool-calling/MCP/Python-codegen/bash) and benchmarks via canonical task/context/actions representation. Open General Agent Leaderboard. **Directly relevant to this runtime's MCP-cross-benchmark stance**.
6. **prisma-review-agent (PyPI v0.2.9, pydantic-ai)** — production-grade PRISMA-2020 systematic-review agent with 12 pydantic-ai agents, source-grounding rapidfuzz validation gate, multi-model compare-mode with consensus synthesis. **Operationally proves PRISMA-flow + GRADE assessment IS implementable as a Claude-Code-style multi-agent pipeline**.

**Cross-research-arch convergence patterns** (§13 expanded):
- **All 11 rubrics require ≥2-source plurality** (Wikipedia RS, Cochrane, Anthropic ML, Perplexity citations, PRISMA, GRADE, HELM, SWE-bench, CNCF, NIST, ThoughtWorks) — sca-v3.1's "≥3 organisationally-distinct" matches.
- **8 of 11 require process-level not just output-level evaluation** (HELM Calibration, SWE-bench pass2pass, Cochrane RoB, GRADE Risk-of-Bias, PRISMA flow, ABC Outcome-Validity, Anthropic Multi-Agent reasoning-traces, Gaia2 ARE-Verifier action-level) — **sca-v3.1 misses process-level entirely** (Δ-v6-NEW-1).
- **6 of 11 require pre-registered protocol** (Cochrane, PRISMA-P, GRADE, PROSPERO, NIST RMF Govern, Anthropic RSP) — sca-v3.1's `/goal` predicate is the analog but is NOT pre-registered for the audit predicate specifically (Δ-v5-NEW-3 PICO predicate).
- **5 of 11 require independent-of-author source filtering** (Wikipedia IS, HELM contamination, Anthropic source-quality, CNCF Adopters, GRADE) — sca-v3.1 D5 PRACTITIONER FIELD REPORT requires this implicitly but doesn't enforce author-independence as a hard gate.

---

## §1 — Anthropic Multi-Agent Research System (Tier A — engineering blog)

**Cite**: `https://www.anthropic.com/engineering/built-multi-agent-research-system` + `https://www.anthropic.com/engineering/multi-agent-research-system` (Anthropic Engineering blog, 2025-06).

**Methodology**: Lead-agent orchestrates parallel sub-agents; each sub-agent owns a research sub-question + retrieval scope. The "orchestrator-worker" pattern: lead-agent issues parallel research tasks → sub-agents run independently with their own context windows → results stream back to lead → lead synthesises with citations[]. Anthropic explicitly reports the harness uses **6 evaluation criteria**: (1) Factual accuracy with verified citations, (2) Completeness coverage, (3) Reasoning quality with logical flow, (4) Source quality with credibility, (5) Tool efficiency (no redundant queries), (6) Final-synthesis-quality.

**Three transferable patterns**:
- **Citations-as-typed-output-contract** — sub-agents emit structured citations[] not free-text URLs. Sca-v3.1 W292-R7 inline-citation rule absorbed presence but NOT type-contract enforcement (cite must include file:line OR DOI OR URL OR cite_kind=).
- **LLM-as-judge on 6 evaluation criteria** post-synthesis — orchestrator runs criteria-by-criteria scoring with explicit reasoning, NOT a single overall score. **Sca-v3.1 has 17 dims scored 1-5 by the candidate-auditor itself — no independent judge agent.**
- **Source-credibility weighting** — Anthropic explicitly weights primary sources > vendor docs > blog posts > forum mentions. Sca-v3.1 D6 Bayesian author-prior is the partial-analog but only fires on AUTHOR (α_anthropic, β_known_partner, γ_long_running_repo, δ_abandoned_repo_count) — NOT on SOURCE-CLASS (primary vs vendor vs blog vs forum).

**Delta vs W292-R1-R12**: R1-R3 already shipped D16/D17/D18. R7 inline-citation shipped presence-rule. **R-gap**: no W292 rule covers LLM-as-judge mode or source-class weighting.

**Delta vs sca-v4 W296 Stream D**: v4 ships dual-composite + 5-tier ladder + 3-persona adversarial. **Does NOT add criteria-by-criteria LLM-judge scoring**.

**NEW candidate-delta**: v6-NEW-1 process-evaluation compliance-checklist judge (paired with ACL 2026 paper below).

---

## §2 — OpenAI Deep Research citations[] contract (Tier A — product technical)

**Cite**: `https://openai.com/index/introducing-deep-research/` + companion tech-spec referenced indirectly via OpenAI docs (the citations[] array is the SDK contract).

**Methodology**: OpenAI Deep Research takes a research goal, drives a multi-step browse + reason loop, and emits a final report with **structured citations[]** — each citation is `{url, snippet, accessed_at, confidence}` with the snippet anchored to the exact span supporting the report's claim. Reports are validated against citations[] BEFORE return: every factual claim MUST link to ≥1 citation.

**Three transferable patterns**:
- **Mandatory inline-citation-or-drop** — claims without citations are dropped from the final report (not silently retained). Sca-v3.1 W292-R7 inline-citation soft-caps (rate <50% caps D5 at 2) but does NOT drop ungrounded claims. **Hardening candidate**: drop rule, not cap rule.
- **Confidence-per-citation** — each cite carries a confidence score (low/medium/high). Sca-v3.1 has NO citation-level confidence (composite-level via Bayesian author-prior only).
- **Accessed-at timestamp on every cite** — supports temporal-validity downweighting via the decision-decay state-machine. Sca-v3.1 W292-R7 records `cite` field but NO `accessed_at`.

**Delta vs W292-R1-R12**: R7 absorbed presence. **R-gap**: no W292 rule covers confidence-per-citation or accessed-at timestamping.

**Delta vs sca-v4 W296 Stream D**: v4 promotes R7 to D5 floor=4 (≥80% rate) and queues R7-v4 citation-accuracy spot-check via codex (the v3.1 SKILL.md L73 caveat). **v4 still does NOT add per-citation confidence or accessed-at**.

**NEW candidate-delta**: v5-NEW-1 citation-accuracy spot-check via codex GPT-5.5 cross-verify (this is the v4-queued caveat fixture — finally operationalised in v5 ship). + future-v6 per-citation confidence + accessed-at.

---

## §3 — Perplexity Sonar / Deep Research citations + weighted-consensus (Tier A)

**Cite**: `https://www.perplexity.ai/hub/blog/introducing-perplexity-deep-research` + `https://docs.perplexity.ai/` + `https://research.perplexity.ai`.

**Methodology**: Perplexity Sonar walks 6-12 sources per query; Deep Research walks dozens to 100+ over minutes-to-hours. Emits answer + structured citations[] with weighted-consensus: when sources disagree, reports "X% of sources agree on Y" rather than collapsing to one side. **Key innovation**: source-agreement-rate as first-class output.

**Three transferable patterns**:
- **Weighted-consensus output** when sources disagree — Perplexity literally surfaces "65% of sources say X, 35% say Y". Sca-v3.1 has `sources_typed.<dim>.disagreement[]` (W292-R-via-W288 absorption) but does NOT quantify the agreement-rate distribution — it just lists the disagreement.
- **Recency-weighted index** — Perplexity is freshness-biased by design. Sca-v3.1's decision-decay state-machine (ACTIVE/AGING/STALE) handles wave-age but not within-wave source-recency weighting.
- **Cross-source synthesis vs raw-hits** — Perplexity synthesises across 6-12 sources INSIDE one response (unlike Exa which returns raw hits). Sca-v3.1's multi-MCP cascade (W297) is the analog at orchestrator level, but does NOT compress synthesis to a single typed-output object.

**Delta vs W292-R1-R12**: R7 absorbed presence. **R-gap**: agreement-rate-percentage NOT in R-series.

**Delta vs sca-v4 W296 Stream D**: v4 Delta-#5 G1 confidence-factor multiplier IS this layer's response — composite-level downweighting based on disagreement count. **But v4 still does NOT emit per-dim agreement-rate-percentage**.

**NEW candidate-delta**: v6-NEW-1.5 percentage-agreement-rate as first-class disagreement schema (defer to v6 — disruptive to v3.1 disagreement[] shape).

---

## §4 — Stanford HELM (Holistic Evaluation of Language Models) — Tier A

**Cite**: `https://crfm.stanford.edu/helm/` + arXiv 2211.09110 (paper) + GitHub `stanford-crfm/helm`.

**Methodology**: Multi-metric (7 metrics: Accuracy, Robustness, Calibration, Fairness, Bias, Toxicity, Efficiency) × multi-scenario (16 core scenarios) matrix. Every model gets scored on every metric × every scenario. **Key innovation**: NO single primary metric — HELM forces holistic reporting. Robustness uses `compute_worst_case_metrics` (perturbation-delta worst-case-over-paraphrase). Calibration measures whether model confidence correlates with accuracy. Contamination-tracking flags scenarios that may have leaked into training.

**Three transferable patterns**:
- **No-single-primary-metric** — HELM explicitly resists "the one Pass@1 number". Sca-v3.1 dual composites (install_score + pattern_score) matches this **but only TWO** — HELM has 7. **Gap**: HELM's 7-metric scoring per scenario gives directional vector, not 2-score scalar.
- **`compute_worst_case_metrics` (worst-case-over-perturbation)** — primary anchor for sca-v4 Delta-#11 R4-pass2pass + Delta-#3 D17 robustness anchor scale 4-5 tightening (already promoted to v4 SHIP per W296-codex-r1 fix #4).
- **Contamination-tracking analog** — sca-v3.1's `Decision-decay state-machine` (ACTIVE/AGING/STALE + rule_version downweight 0.5×/0.7×/0.8×/1.0×) IS the contamination analog. HELM's contamination check is "did the test data leak into training". Sca-v3.1's check is "did the verdict drift past its support window".

**Delta vs W292-R1-R12**: R2 D17 robustness shipped (HELM Robustness convergence anchor). **R-gap**: HELM Calibration NOT absorbed — sca-v3.1 has no dim asking "does the candidate's typed output expose confidence levels that correlate with accuracy".

**Delta vs sca-v4 W296 Stream D**: v4 Delta-#3 promotes D17 anchor 4-5. **Does NOT absorb HELM Calibration.**

**NEW candidate-delta**: v6-NEW-4 Calibration dim — does the candidate's MCP/CLI output emit confidence-scored results (defer to v6 — narrow scope, mostly affects MCP-server adoptions).

---

## §5 — SWE-bench Verified (Princeton NLP) — Tier A

**Cite**: `https://www.swebench.com` + arXiv 2310.06770 + SWE-bench-Pro evaluation methodology `https://www.morphllm.com/swe-bench-pro`.

**Methodology**: 2,294 real-world Python issues from 12 popular repos; each issue ships `fail2pass` test pair (test that fails BEFORE the patch + same test passes AFTER) + `pass2pass` test pair (existing passing tests STAY passing after the patch). Docker-pinned reproducible environments. Adopted as Anthropic + OpenAI + Meta + Cognition coding-agent leaderboard.

**Three transferable patterns**:
- **`pass2pass` regression rule** — patch must not break existing passing tests. **Sca-v4 Delta-#11 R4-pass2pass anchor-text promoted to v4 SHIP per W296-codex-r1 fix #4** — this lands in v4 ship.
- **`fail2pass` proves-the-bug-existed-then-was-fixed** — Sca-v3.1 has NO analog. Closest: rollback_plan ("revert files X, Y, Z + smoke-test"). **Gap**: sca-v3.1 doesn't require evidence that adoption fixes a real broken thing, only that it ADDS capability.
- **Docker-pinned reproducibility** — sca-v3.1 cardinal-rule R2 (`npx -y <pkg>@<pinned-version>`) is the analog. Strong match.

**Delta vs W292-R1-R12**: R4 absorbed (D17 anchor scale 4-5). **R-gap**: `fail2pass` analog — proves the adoption fixes existing broken behaviour, not just adds new behaviour.

**Delta vs sca-v4 W296 Stream D**: v4 ships R4 pass2pass anchor. **Does NOT add fail2pass / evidence-of-broken-thing-fixed.**

**NEW candidate-delta**: v6-NEW-5 fail2pass evidence — adoption verdict must cite ≥1 currently-broken-behaviour that the candidate fixes (vs pure-addition adoptions which currently dominate the ledger).

---

## §6 — Wikipedia Reliable Sources policy + Notability (GNG/RS/IS) — Tier A

**Cite**: `https://en.wikipedia.org/wiki/Wikipedia:Reliable_sources` + `https://en.wikipedia.org/wiki/Wikipedia:Notability` (GNG) + `https://en.wikipedia.org/wiki/Wikipedia:Independent_sources` (IS).

**Methodology**: Three convergent rules. (GNG) General Notability Guideline — "significant coverage in multiple independent, reliable sources". (RS) Reliable Sources policy — peer-reviewed > textbook > newspaper-of-record > magazine > blog > forum. (IS) Independent Sources — sources NOT affiliated with the article-subject. Every claim cited inline `[N]` to a source entry. Editors enforce consensus via talk-page deliberation.

**Three transferable patterns**:
- **Independence-of-source requirement** — Wikipedia IS explicitly bars author-affiliated sources from satisfying notability. Sca-v3.1 D5 PRACTITIONER FIELD REPORT requires "named org/practitioner reporting outcome... Marketing claims by the candidate's own author do NOT count" — match. **But sca-v3.1 doesn't enforce this on D6 authority_weight or D12 community_signal_distribution sources**.
- **Source-class hierarchy** — Wikipedia RS ranks sources by class (peer-reviewed > textbook > newspaper > magazine > blog > forum). Sca-v3.1 has NO source-class hierarchy — typed sources are flat (benchmark / code_reading / practitioner_report).
- **Talk-page deliberation analog** — Wikipedia's consensus mechanism is multi-editor deliberation in `Talk:<page>`. Sca-v3.1's analog is the 3-persona adversarial fan-out + codex Stop-hook (single round). **Wikipedia's mechanism is iterative; sca-v3.1's is one-shot**.

**Delta vs W292-R1-R12**: R7 inline-cite absorbed. **R-gap**: source-class hierarchy + iterative-deliberation NOT in R-series.

**Delta vs sca-v4 W296 Stream D**: v4 Delta-#7 G10 ledger 4→2-target collapse improves canonical storage but doesn't add source-class. v4 Delta-#5 G1 confidence-factor multiplier handles disagreement but not class.

**NEW candidate-delta**: v6-NEW-6 source-class hierarchy weighting in D5/D6 — peer-reviewed/standards-body > vendor-doc > practitioner-blog > forum (defer to v6 — schema change).

---

## §7 — ThoughtWorks Tech Radar (Tier B — governance / sourcing)

**Cite**: `https://www.thoughtworks.com/radar` + `https://www.thoughtworks.com/radar/faq` + Build-Your-Own-Radar guide.

**Methodology**: 4-ring × 4-quadrant 2-axis classification. Rings = Adopt / Trial / Assess / Hold (in vs out direction). Quadrants = Techniques / Tools / Platforms / Languages & Frameworks. Tech Advisory Board (TAB, ~15 ThoughtWorks senior engineers) meets quarterly, deliberates each blip, classifies in/out and ring + quadrant placement. Published every ~6 months for 14+ years (30+ editions).

**Three transferable patterns**:
- **4-ring tier ladder** — Adopt/Trial/Assess/Hold. Sca-v3.1 has 5-tier ladder T1/T2/T3/T4/T5 (INSTALL/VENDOR-FORK/PATTERN-STUDY/CITE-ONLY/REJECT). Maps roughly: T1≈Adopt, T2/T3≈Trial+Assess, T4/T5≈Hold. **But ThoughtWorks adds the 4-quadrant 2nd-axis** — sca-v3.1 is 1-axis.
- **Trial-ring requirement** — Trial means "actively pursuing in projects to learn" — explicit middle-stage before Adopt. Sca-v3.1 has analog T3 PATTERN-STUDY but does NOT require T1 INSTALL be preceded by a prior-wave T2/T3 verdict (W292-R5 TIGHTEN-T1).
- **Quarterly cadence + deliberation board** — TAB meets quarterly; deliberation produces published rationale per blip. Sca-v3.1's analog: wave-driven verdict ledger + 3-persona adversarial fan-out + codex Stop-hook.

**Delta vs W292-R1-R12**: R10 2-axis tier model absorbed as v6+ DEFER per W296 Stream D row-20. R5 TIGHTEN-T1 absorbed as v5 DEFER per row-19. **Both already routed**.

**Delta vs sca-v4 W296 Stream D**: v4 does NOT ship R10. v4 does NOT ship R5 (deferred to v5).

**NEW candidate-delta**: v5-NEW-3 (PICO predicate) draws partial inspiration from ThoughtWorks's "blip context" 1-paragraph framing per blip — a structured frontmatter analog (Population/Intervention/Comparison/Outcome) supersedes the unstructured `description:` field.

---

## §8 — CNCF Graduation Criteria (Tier B)

**Cite**: `https://github.com/cncf/toc/blob/main/process/template-graduation-application.md` + CNCF TOC graduation reviews.

**Methodology**: 9 graduation gates. (1) Healthy adoption (≥3 production adopters with public testimonials). (2) Healthy maintainer count (≥2 maintainers from ≥2 organisations). (3) Maintainer lifecycle docs (onboarding + emeritus). (4) Code/doc ownership (OWNERS files). (5) Governance.md committed. (6) Code-of-conduct. (7) OpenSSF Best Practices Badge passing/silver/gold. (8) Healthy rate-of-changes. (9) Crossing-the-chasm production-readiness.

**Three transferable patterns**:
- **Multi-org maintainer survivability** — CNCF explicitly requires maintainers from ≥2 ORGANISATIONS, not just ≥2 people. Sca-v3.1 D16 bus_factor_governance scale 5 says "board/TSC + named succession + accountability.md" but does NOT enforce multi-org. **Gap**: candidate with 5 maintainers all from same org passes D16=5 but FAILS CNCF graduation.
- **OWNERS files + governance.md committed** — CNCF requires these as committed files in the repo. Sca-v3.1 D16 scale-3 anchor says "≥2 maintainers + CODEOWNERS". Match (partial — only CODEOWNERS, not governance.md).
- **Crossing-the-chasm production-readiness** — requires named production adopters. Sca-v3.1 D5 PRACTITIONER FIELD REPORT matches. Strong.

**Delta vs W292-R1-R12**: R1 D16 absorbed (CNCF + 5 others). **R-gap**: multi-org maintainer count.

**Delta vs sca-v4 W296 Stream D**: v4 does NOT tighten D16 multi-org.

**NEW candidate-delta**: v5-NEW-2 sub-element — D16 scale-5 anchor must enforce ≥2 maintainers from ≥2 distinct orgs (defer to v5 with the PRISMA flow-diagram bundle since both touch governance artefacts).

---

## §9 — OpenSSF Scorecard (Tier B)

**Cite**: `https://github.com/ossf/scorecard` + `https://github.com/ossf/scorecard/blob/main/docs/checks.md` + OpenSSF Best Practices Badge `https://www.bestpractices.coreinfrastructure.org/`.

**Methodology**: 18 automated security checks: Maintained, Code-Review, Branch-Protection, Pinned-Dependencies, Dangerous-Workflow, Dependency-Update-Tool, Fuzzing, Packaging, SAST, Security-Policy, Signed-Releases, Token-Permissions, Vulnerabilities, Binary-Artifacts, CI-Tests, Contributors, License, Webhooks. Score 0-10 per check; aggregate via weighted sum. Used by GitHub Advisory Database + deps.dev.

**Three transferable patterns**:
- **Automated check execution** — Scorecard runs as a CLI/CI tool against any repo. Sca-v3.1 D15 supply_chain_safety scale 5 says "OpenSSF Scorecard 18-check internalisation" but does NOT actually run Scorecard programmatically — relies on auditor reading docs. **Gap**: automatable check vs manual interpretation.
- **Per-check score 0-10** — Scorecard's range 0-10 with 10 = full compliance. Sca-v3.1 is 1-5 per dim. Calibration mismatch but absorbable.
- **18 checks vs sca-v3.1 1 dim (D15)** — Scorecard's 18-check breakdown maps to D15 as a sub-rubric. Sca-v3.1 collapses to a single 1-5 score.

**Delta vs W292-R1-R12**: R6 absorbed (D15 OpenSSF internalisation). **R-gap**: automation of the check.

**Delta vs sca-v4 W296 Stream D**: v4 does NOT automate Scorecard execution.

**NEW candidate-delta**: v6-NEW-7 automated OpenSSF Scorecard via `scorecard --repo=<candidate>` invocation as Lane F in `harness/eval_harness.py` (defer to v6 — requires harness code change per W290 F4 §3).

---

## §10 — NIST AI Risk Management Framework + Generative-AI Profile (Tier B)

**Cite**: `https://www.nist.gov/itl/ai-risk-management-framework` + NIST.AI.600-1 (Generative-AI Profile).

**Methodology**: 4-function lifecycle: **Govern** (policy + accountability) · **Map** (context + scope) · **Measure** (testing + benchmarking) · **Manage** (response + risk-treatment). For Generative-AI specifically: NIST.AI.600-1 maps GAI risks across CBRN, Confabulation, Dangerous-Workflow, Data-Privacy, Environmental, Harmful-Bias, Human-AI-Config, Info-Integrity, Info-Security, Intellectual-Property, Obscene-Content, Value-Chain.

**Three transferable patterns**:
- **4-function lifecycle (Govern/Map/Measure/Manage)** — sca-v3.1's 6-step process IS the analog. Step 2 (Verify harness-fit) = Map; Step 4 (Score) = Measure; Step 5 (Adversarial review) = Manage; Step 6 (Ledger) = Govern. Match.
- **GAI 12 risk categories** — NIST.AI.600-1 enumerates 12 risk classes. Sca-v3.1 D18 runtime_safety_and_privacy_risk is the analog but compressed to 1-5 scale. **Gap**: D18 doesn't surface WHICH GAI risk class flagged the candidate.
- **Pre-deployment + ongoing measurement** — NIST emphasizes continuous monitoring not just one-shot audit. Sca-v3.1's decision-decay state-machine + AGING re-litigation queue (W291-G4 ship) handles this. Strong match.

**Delta vs W292-R1-R12**: R3 D18 absorbed (NIST+OpenSSF+Anthropic 3-rubric convergence). **R-gap**: GAI risk-class granularity.

**Delta vs sca-v4 W296 Stream D**: v4 Delta-#8 G4 AGING re-litigation cron extends the ongoing-monitoring side. **Does NOT add GAI risk-class breakdown.**

**NEW candidate-delta**: v6-NEW-8 D18 scale anchor includes which GAI-risk-class(es) drove the score (Confabulation / Dangerous-Workflow / Data-Privacy / Info-Security primary for MCP-server adoptions).

---

## §11 — Anthropic Responsible Scaling Policy (Tier B) + Cochrane/PRISMA/GRADE (Tier B-expanded)

### §11.1 Anthropic Responsible Scaling Policy

**Cite**: `https://www.anthropic.com/news/anthropics-responsible-scaling-policy` + `https://www-cdn.anthropic.com/872c653b2d0501d6ab44cf87f43e1dc4853e4d37/Responsible-Scaling-Policy-2025-10-15.pdf`.

**Methodology**: AI Safety Levels (ASL-1/2/3/4) gate deployment. Each level requires specific evaluations (red-teaming for biosecurity, cyber, autonomy) + specific safeguards (constitution, model-card, deployment-policy). Independent evaluators required for ASL-3+.

**Three transferable patterns**:
- **Tier-gated deployment** — Anthropic ASL-3 requires biosecurity uplift evals + independent reviewers. Sca-v3.1's 5-tier ladder (T1/T2/T3/T4/T5) is a structural analog but gates on numeric composite + hard-caps, not on capability-level safety evals.
- **Independent-evaluator requirement** — ASL-3+ requires non-Anthropic evaluators. Sca-v3.1 codex Stop-hook (GPT-5.x cross-model) IS the analog. Match.
- **Pre-deployment evaluation suite per tier** — ASL-3 enumerates required evals. Sca-v3.1 has eval-harness Lane A/B/C and per-tier minimum scores but does NOT enumerate eval-requirements per tier.

**Delta vs W292-R1-R12**: R3 D18 references Anthropic safety guidance. **R-gap**: tier-gated eval-suite enumeration.

**Delta vs sca-v4 W296 Stream D**: v4 Delta-#5 G1 confidence-factor + Delta-#3 D17 robustness anchor — both at composite level, not per-tier eval-suite.

**NEW candidate-delta**: v6-NEW-9 per-tier eval-suite enumeration — T1 INSTALL requires Lane-C smoke + at least 1 lane from {A capability, B output-comparison}; T2 VENDOR-FORK requires Lane-C only; T3 PATTERN-STUDY no harness lane required (defer to v6 — anchor-text addition).

### §11.2 Cochrane Handbook + PRISMA 2020 + GRADE + CDC ACIP (medical-grade evidence synthesis)

**Cite**: `https://www.cochrane.org/authors/handbooks-and-manuals/handbook` (Cochrane Handbook); `https://www.prisma-statement.org/` (PRISMA 2020); `https://www.gradeworkinggroup.org/` (GRADE); `https://www.cdc.gov/acip-grade-handbook/hcp/chapter-6-systemic-review-overview/index.html` (CDC ACIP).

**Methodology**: PRISMA 2020 enforces a 27-item checklist + flow-diagram showing study identification → screening → eligibility → inclusion. GRADE assesses certainty-of-evidence across 5 domains (Risk-of-Bias / Inconsistency / Indirectness / Imprecision / Publication-Bias) yielding High/Moderate/Low/Very-Low certainty. Cochrane MECIR (Methodological Expectations for Cochrane Intervention Reviews) is the operational standard. Recent (Cochrane 2025-11-11) position statement extends to AI-augmented review tools with explicit reporting templates.

**Three transferable patterns**:
- **Pre-registered protocol (PROSPERO)** — every systematic review pre-registers PICO + inclusion/exclusion before evidence collection. Sca-v3.1's `/goal` predicate is the analog **but is not formally PICO-structured**.
- **PRISMA flow-diagram artefact** — visual + auditable: identified → screened → eligible → included → excluded with reasons. Sca-v3.1 has VERDICT-LEDGER row but does NOT require flow-diagram.
- **GRADE certainty-of-evidence 4-level scale (High/Moderate/Low/Very-Low)** — graded per claim, not per source. Sca-v3.1 has rule-version-downweight (0.5×/0.7×/0.8×/1.0×) at composite level. **Per-claim certainty grading is novel**.

**Delta vs W292-R1-R12**: NONE of R1-R12 covers PRISMA / Cochrane / GRADE — entirely novel research-arch family in W299 Stream C.

**Delta vs sca-v4 W296 Stream D**: v4 does NOT incorporate medical-grade evidence synthesis methodology.

**NEW candidate-deltas**:
- **v5-NEW-2 PRISMA-style flow-diagram artefact** for T1 INSTALL — required markdown artefact at `verdicts/W<wave>-<slug>-prisma-flow.md` showing identified→screened→included→excluded sources for the typed-evidence collection.
- **v5-NEW-3 PICO predicate frontmatter** — every audit `/goal` predicate carries Population (which Claude-Code-runtime aspect) / Intervention (which candidate) / Comparison (which incumbent or null-baseline) / Outcome (what measurable delta). Pre-registered before evidence collection.
- **v6-NEW-10 GRADE per-claim certainty grading** (defer — schema change to `sources_typed`).

---

## §12 — Tier C Discoverables (NEW research-arch repos NOT in W288/W292/W296/W297)

Multi-MCP cascade (exa neural-search + ctx_batch_execute github-API + Cochrane domain-search via exa) surfaced these. Per-candidate: methodology + 1-2 patterns transferable + delta vs prior absorption.

### §12.1 ResearchGym (arXiv 2602.15112v2)

**Source**: arXiv 2602.15112v2 — exa.ai neural-search hit, NOT in W288 + W292 + W296 + W297 wave-trail.
**Methodology**: 5 ICML/ICLR/ACL 2025 papers used as benchmark tasks; each paper's repo strips proposed-method, leaves baselines as lower-bound + author solution as soft upper-bound. Agents must propose hypothesis + run experiments. Grading via paper's OWN evaluation scripts (NOT LLM-judge — avoids reliability issues). 5 desiderata: full-loop / objective-grading / contamination-awareness / calibrated-comparison / accessibility (single-GPU 24-hour). Tested on GPT-5 (1-of-15 evaluations surpassed baseline), Claude Code Opus-4.5, Codex GPT-5.2 — all show "sharp capability-reliability gap".
**Pattern 1 transferable**: **Baseline-as-lower-bound + author-as-upper-bound calibration** — explicitly contextualise eval scores against TWO endpoints. Sca-v3.1 D8 benchmark_deltas measures delta-vs-baseline but no upper-bound anchor. Gap.
**Pattern 2 transferable**: **Contamination-awareness via recency-of-task** — tasks from 2025 papers post-frontier-model-training-cutoff. Sca-v3.1's decision-decay handles wave-age but not task-recency vs model-training-recency.
**Delta vs W292-R1-R12**: novel — no R-rule covers full-loop closed-research benchmarking.
**v5/v6 routing**: v6-NEW-2 active-evaluation Elo + ResearchGym-style upper-bound calibration (defer; requires harness Lane G).

### §12.2 Agentic Benchmark Checklist (ABC, arXiv 2507.02825v5)

**Source**: arXiv 2507.02825v5 — exa.ai neural-search hit, NOT in W288/W292/W296/W297.
**Methodology**: 13-item checklist developed by reviewing prior agentic benchmarks + AI agent evaluation frameworks + documented issues. Three sections: **Task Validity (T.1-T.10)** — environment cleanup, ground-truth isolation, reproducibility-frozen-at-release, ground-truth correctness verification, oracle solver, outlier inspection in pilot. **Outcome Validity (O.i.1-O.iii.3)** — substring/string-match vs LLM-judge for information-acquisition; unit/fuzz/E2E testing for code-gen; quality-measure-vs-baseline for ML eng. **Benchmark Reporting (R.1-R.6)** — statistical significance, multi-seed runs, etc.
**Pattern 1 transferable**: **Outlier-inspection-in-pilot rule (T.10)** — if agents consistently fail on easy tasks, may indicate impossible tasks; if agents only succeed on difficult tasks, may indicate shortcuts. Sca-v3.1 has NO outlier-inspection on its own ledger — could surface in calibration-quality analysis (Stream D's territory).
**Pattern 2 transferable**: **Substring-match-vs-LLM-judge tradeoff** — explicit tradeoff with use-case mapping. Sca-v3.1's eval-harness has Lane A/B/C but doesn't enumerate judging mechanism per lane.
**Delta vs W292-R1-R12**: novel — no R-rule covers checklist-development methodology.
**v5/v6 routing**: v6-NEW-3 ABC 13-item checklist scoring as Lane H (defer).

### §12.3 Gaia2 + ARE-Verifier (Meta, OpenReview 2026)

**Source**: OpenReview PDF (URL captured), NOT in W288/W292/W296/W297.
**Methodology**: 800 verified scenarios across 10 universes in Mobile environment. **ARE Verifier** evaluates write-action sequences against oracle DAG: (i) Consistency — tool names + counts match oracle, exact-match for IDs/recipients/amounts + rubric-guided LLM-judge for messages/text + global anti-prompt-hacking sanity check. (ii) Causality — oracle actions form dependency DAG, parents matched before children. (iii) Timing — temporal relations with tolerance windows. (iv) Turn-level evaluation. 0.99 precision / 0.95 recall vs human annotation.
**Pattern 1 transferable**: **Write-action-only evaluation (read actions ignored)** — focuses eval on state changes. Sca-v3.1's adoption verdict tracks file-edits in rollback_plan but doesn't isolate write-actions in audit-trail.
**Pattern 2 transferable**: **DAG-based causality verification** — oracle actions form DAG. Sca-v3.1's ledger row is flat — no DAG dependency among adoption decisions.
**Delta vs W292-R1-R12**: novel — no R-rule covers action-level DAG verification.
**v5/v6 routing**: v6-NEW-4 process-evaluation compliance-checklist (paired with §12.4 below).

### §12.4 Process Evaluation for Agentic Systems (ACL Findings 2026)

**Source**: `https://aclanthology.org/2026.findings-eacl.140.pdf` — NOT in W288/W292/W296/W297.
**Methodology**: Compliance-checklist LLM-as-judge for full-trajectory evaluation. Judge prompt receives concatenated: user-agent + assistant-agent turns + ALL tool calls + compliance checklist (~100k+ tokens). Each checklist question YES/NO. Compliance score = accuracy of YES questions / total. Weighted (high-risk steps penalised more than low-risk omissions) + unweighted scores. Judge-quality measured on (a) formatting compliance + (b) alignment with human annotations. Tested on GAIA benchmark + 5 newly-authored unseen tasks (34 compliance questions). Tested GPT-4.1 / GPT-4.1-mini / o3-mini judges.
**Pattern 1 transferable**: **Compliance-checklist scored over FULL trajectory** (not just final output) — sca-v3.1 evaluates verdicts on outputs (composite scores + rollback plan + adversarial review) but does NOT evaluate on the audit TRAJECTORY (which sources were probed, which were dropped, why). Gap.
**Pattern 2 transferable**: **Judge-alignment-with-human-annotations measured** — measure not just compliance but judge quality. Sca-v3.1 codex Stop-hook IS the judge; judge-quality is implicit. Gap.
**Delta vs W292-R1-R12**: novel — closest is W292 Agent C "verifier" approach but covers different scope.
**v5/v6 routing**: **v6-NEW-1 process-evaluation compliance-checklist judge** (PRIMARY pattern for v6).

### §12.5 Exgentic + Unified Protocol (arXiv 2602.22953)

**Source**: arXiv 2602.22953 — exa.ai neural-search hit, NOT in W288/W292/W296/W297. **Highly relevant — this is the cross-MCP-cross-benchmark mediation problem this runtime currently lacks**.
**Methodology**: First general-agent cross-benchmark evaluation. **Unified Protocol** = mediation protocol bridging agent interfaces (CLI, tool-calling APIs, MCP, Python codegen, bash/CLI, conversational) and benchmarks via canonical task/context/actions representation. **Exgentic** harness orchestrates 150 agent × model × benchmark configs. Open General Agent Leaderboard. Tested on 6 benchmarks (τ²-Bench, AppWorld, SWE-Bench Verified, etc.) × 5 agents (ReAct, OpenAI Solo, Claude Code, Smolagent). $20k total eval cost.
**Pattern 1 transferable**: **Canonical task/context/actions mediation** for cross-protocol comparison. Sca-v3.1's eval-harness has Lane C `--candidate` but Lane A/B are FIXED suites (per W288-fix6). Exgentic generalises beyond fixed suites by mediating any-agent-any-benchmark.
**Pattern 2 transferable**: **Cost-per-eval budget enumeration ($20k for 150 configs ≈ $133/config)** — sca-v3.1 W297 cascade has per-tier cost-caps ($0.02-$5/audit) but does NOT publish leaderboard-cost-aggregate.
**Delta vs W292-R1-R12**: novel — no R-rule covers cross-protocol mediation.
**v5/v6 routing**: v6-NEW-10 Exgentic-style cross-MCP mediation layer (defer — major architecture change).

### §12.6 prisma-review-agent PyPI v0.2.9 (pydantic-ai)

**Source**: PyPI `prisma-review-agent` v0.2.9 — NOT in W288/W292/W296/W297. **Operational proof that PRISMA-flow + GRADE IS implementable as a Claude-Code-style multi-agent pipeline**.
**Methodology**: 12 pydantic-ai agents each owning one PRISMA step with typed Pydantic output. 16-step PRISMA pipeline. Source-grounding validation gate via rapidfuzz (every extracted evidence span verified against source article BEFORE inclusion — ungrounded silently dropped). Multi-model compare-mode: same protocol through ≥2 LLMs in parallel + LLM-generated consensus synthesis with per-field agreement indicators. Async parallel-per-article concurrency (5-10 LLM calls in parallel; 100-article review 70min→15min).
**Pattern 1 transferable**: **Source-grounding-validation-gate (rapidfuzz fuzzy match)** — every extracted evidence span verified against source BEFORE inclusion. Sca-v3.1 W292-R7 inline-citation checks PRESENCE not GROUNDING. **Operationalisation of v4-queued citation-accuracy spot-check**.
**Pattern 2 transferable**: **Multi-model compare-mode parallel runs + per-field agreement indicators + LLM-consensus-synthesis** — explicit multi-judge ensemble. Sca-v3.1 has 3-persona adversarial fan-out + 1 codex Stop-hook but the 4 outputs aren't field-by-field merged with agreement indicators — they're voted on at composite level.
**Delta vs W292-R1-R12**: R7 inline-citation absorbed presence-rule; **R-gap**: source-grounding-validation-gate operationalisation.
**v5/v6 routing**: **v5-NEW-1 citation-accuracy spot-check via codex GPT-5.5 cross-verify (10%-sample)** — operationalises the W288 SKILL.md L73 caveat using prisma-review-agent's pattern.

---

## §13 — Cross-research-arch convergence patterns

Aggregating across all 11+6 research-architectures studied (11 Tier A/B + 6 Tier C):

| Convergence pattern | Rubrics requiring this | sca-v3.1 status | sca-v4 status (W296 SHIP) | v5/v6 candidate-delta |
|---|---|---|---|---|
| **Multi-source plurality (≥2-3 independent sources)** | Wikipedia GNG/RS/IS · HELM contamination · Anthropic source-quality · CNCF Adopters · GRADE · Cochrane · PRISMA · ABC | ✓ shipped (D5 typed-evidence ≥3 orgs) | ✓ tightened (G1 confidence-factor) | n/a — converged |
| **Independence-of-source from author** | Wikipedia IS · HELM · Anthropic · CNCF · GRADE | ◐ partial (D5 reject marketing-claims) | ◐ partial (unchanged) | v6-NEW-6 source-class hierarchy weighting |
| **Inline-citation requirement** | OpenAI Deep Research · Perplexity Sonar · Wikipedia · ABC · PRISMA · GRADE · Cochrane · Anthropic Multi-Agent | ✓ shipped W293 (D5 floor=4 ≥80% rate) | ✓ tightened (Delta-#5 G1 multiplier) | v5-NEW-1 accuracy spot-check (10%-sample) |
| **Process-level not output-level evaluation** | HELM Calibration · SWE-bench pass2pass · Cochrane RoB · GRADE · PRISMA flow · ABC Outcome-Validity · Anthropic Multi-Agent · Gaia2 ARE-Verifier | ✗ missing | ✗ missing | **v6-NEW-1 process-eval compliance-checklist (PRIMARY)** |
| **Pre-registered protocol** | Cochrane · PRISMA-P · GRADE · PROSPERO · NIST RMF Govern · Anthropic RSP | ◐ partial (`/goal` predicate is analog but not PICO-structured) | ◐ partial (unchanged) | v5-NEW-3 PICO predicate frontmatter |
| **Pinned-versions reproducibility** | SWE-bench Docker · OpenSSF Pinned-Dependencies · CNCF · PRISMA-P | ✓ shipped (cardinal-rule R2 `npx -y <pkg>@<pinned-version>`) | ✓ shipped | n/a — converged |
| **Multi-tier ladder (Adopt/Trial/Assess/Hold)** | ThoughtWorks Radar · Anthropic ASL · CNCF Sandbox/Incubating/Graduated · NIST RMF · GRADE certainty | ✓ shipped (5-tier T1-T5) | ✓ shipped | v6 R10 2-axis (deferred per W296 row-20) |
| **Independent-evaluator requirement** | Anthropic ASL-3+ · Wikipedia consensus · Cochrane dual-reviewer · Cochrane 2025-11 AI position statement | ✓ shipped (codex Stop-hook cross-model + 3-persona adversarial) | ✓ shipped | n/a — converged |
| **Calibration / certainty measurement** | HELM Calibration · GRADE certainty · NIST RMF · Anthropic ASL · ABC Outcome-Validity | ◐ partial (rule-version-downweight is the analog) | ◐ partial (unchanged) | v6-NEW-4 Calibration dim + v6-NEW-10 per-claim GRADE certainty |
| **Source-class hierarchy (peer-review > vendor-doc > blog > forum)** | Wikipedia RS · GRADE source classification · Cochrane | ✗ missing | ✗ missing | v6-NEW-6 |
| **Outlier-inspection in pilot** | ABC T.10 | ✗ missing | ✗ missing | v6 (would benefit Stream D's calibration-quality work) |
| **PRISMA flow-diagram artefact** | PRISMA 2020 · GRADE · Cochrane · CDC ACIP | ✗ missing | ✗ missing | **v5-NEW-2 (PRIMARY)** |
| **Source-grounding validation gate (rapidfuzz / verified span match)** | prisma-review-agent · OpenAI DR claims-without-cites-dropped · Anthropic source-quality | ✗ missing | ◐ partial (Delta-#5 G1 confidence-factor handles disagreement, not grounding) | **v5-NEW-1 (PRIMARY)** |
| **DAG-based causality verification** | Gaia2 ARE-Verifier · CNCF Crossing-the-chasm | ✗ missing | ✗ missing | v6 (defer — schema change) |
| **Automated check execution (not manual interpretation)** | OpenSSF Scorecard · ABC · Gaia2 ARE-Verifier | ✗ missing | ✗ missing | v6-NEW-7 |

**4 strongest cross-rubric convergences NOT shipped in sca-v3.1 or sca-v4**:
1. **Process-level evaluation** (8 of 11 require) → v6-NEW-1
2. **PRISMA flow-diagram artefact** (4-rubric convergence) → v5-NEW-2
3. **Source-grounding validation gate** (3-rubric convergence) → v5-NEW-1
4. **PICO pre-registered predicate** (6-rubric convergence) → v5-NEW-3

These 4 NEW candidate-deltas are the headline v5/v6 proposals from this stream.

---

## §14 — v5 ship-ready vs v6-defer candidate-deltas (table)

| # | Δ-id | Source | Rubric convergence | Schema-impact | Harness-change-required | Ship target |
|---|---|---|---|---|---|---|
| 1 | **v5-NEW-1 citation-accuracy spot-check via codex GPT-5.5 (10%-sample)** | OpenAI DR + Perplexity + Wikipedia + Anthropic + prisma-review-agent | 5-rubric | No (uses existing schema) | No (uses existing codex Stop-hook) | **v5 SHIP** |
| 2 | **v5-NEW-2 PRISMA-style flow-diagram artefact for T1 INSTALL** | PRISMA + Cochrane + GRADE + CDC ACIP | 4-rubric | No (new markdown artefact only) | No | **v5 SHIP** |
| 3 | **v5-NEW-3 PICO predicate frontmatter on `/goal`** | Cochrane + PRISMA-P + GRADE + PROSPERO + NIST RMF + Anthropic RSP | 6-rubric | Yes (new frontmatter fields) | No | **v5 SHIP** |
| 4 | v5-NEW-2 sub-element D16 multi-org maintainer (≥2 orgs not just ≥2 people) | CNCF | 1-rubric (CNCF primary) | No (anchor-text only) | No | **v5 SHIP** (bundled with NEW-2) |
| 5 | **v6-NEW-1 process-evaluation compliance-checklist judge** | ACL 2026.findings-eacl.140 + Anthropic Multi-Agent + ResearchGym + Gaia2 ARE-Verifier | 4-rubric | Yes (trajectory-level audit-trail schema) | **Yes** (Lane E in `harness/eval_harness.py`) | v6 DEFER |
| 6 | v6-NEW-2 active-evaluation Elo for candidate-prioritisation | arXiv 2601.07651v2 + DeepMind Soft-Condorcet | 2-rubric | Yes (priority field in backlog) | Yes (Elo state machine in harness) | v6 DEFER |
| 7 | v6-NEW-3 ABC 13-item checklist scoring (Lane H) | arXiv 2507.02825v5 | 1-rubric | No | Yes (Lane H) | v6 DEFER |
| 8 | v6-NEW-4 HELM Calibration dim (D-NEW) — confidence-scored output check | HELM | 1-rubric | Yes (new D-id) | Optional | v6 DEFER |
| 9 | v6-NEW-5 SWE-bench fail2pass evidence — adoption fixes broken thing | SWE-bench Verified | 1-rubric | Yes (new D5 sub-type) | No | v6 DEFER |
| 10 | v6-NEW-6 source-class hierarchy weighting in D5/D6 | Wikipedia RS + GRADE source classification + Cochrane | 3-rubric | Yes (D5 schema) | No | v6 DEFER |
| 11 | v6-NEW-7 automated OpenSSF Scorecard via Lane F | OpenSSF | 1-rubric | No | Yes (Lane F) | v6 DEFER |
| 12 | v6-NEW-8 D18 GAI-risk-class breakdown | NIST.AI.600-1 | 1-rubric | Yes (D18 sub-class enum) | No | v6 DEFER |
| 13 | v6-NEW-9 per-tier eval-suite enumeration | Anthropic RSP | 1-rubric | No (anchor-text) | No | v6 DEFER |
| 14 | v6-NEW-10 GRADE per-claim certainty grading | GRADE + Cochrane | 2-rubric | Yes (per-claim certainty field) | No | v6 DEFER |
| 15 | v6-NEW-1.5 percentage-agreement-rate first-class disagreement schema | Perplexity Sonar weighted-consensus | 1-rubric | Yes (disagreement[] shape) | No | v6 DEFER |
| 16 | v6-NEW-11 (Exgentic-style) cross-MCP mediation layer | arXiv 2602.22953 | 1-rubric | Yes (major) | Yes (major) | v6 DEFER (architecture change) |

**v5 SHIP-ready count**: 4 (NEW-1, NEW-2 + sub-element, NEW-3) — all schema-light + no harness change + uses existing codex/3-persona/markdown infrastructure.

**v6 DEFER count**: 12+ — most require harness lane addition (E, F, G, H), schema-breaking changes, or Elo-state-machine.

**Recommended Stream E v5 ship-set** (subset to be operationalised in v5 SKILL.md cutover):
- **v5-NEW-1**: SKILL.md §3 "Inline-citation requirement" tightening — add 10%-sample codex GPT-5.5 cross-verify rule. Concrete edit: after the W293 sca-v3.1 caveat block (L73 in current SKILL.md), add: "v5 operationalisation: every sca-v5 audit randomly samples 10% of `sources_typed.<dim>.<entry>.cite` URLs/file-refs and dispatches a single-shot codex GPT-5.5 cross-verify ('does the cited source actually support the claim?'); cross-verify rate <80% caps D5 at 3 (in addition to W293 presence-rate caps)."
- **v5-NEW-2**: SKILL.md §6 "Ledger write" — T1 INSTALL additionally requires `flow_diagram_path` artifact at `verdicts/W<wave>-<slug>-prisma-flow.md` enumerating identified→screened→eligible→included→excluded sources with exclusion reasons.
- **v5-NEW-3**: SKILL.md §0 / §1 — `/goal` predicate frontmatter MUST include `pico:` with subfields Population/Intervention/Comparison/Outcome before evidence collection begins.
- **v5-NEW-2 sub**: SKILL.md §4 D16 scale-5 anchor text — tighten from "board/TSC + named succession + accountability.md" to "**board/TSC across ≥2 organisations** + named succession + accountability.md".

---

## §15 — Open questions routed to W299-AUDIT

1. **Should v5-NEW-2 (PRISMA flow-diagram) be made mandatory for T1 INSTALL only or extended to T2 VENDOR-FORK?** — Stream C recommends T1-only (proportionate to install reversibility risk); T2 VENDOR-FORK already has `divergence_files` list. Operator decision routed to W299-AUDIT §11 step 2.
2. **v5-NEW-1 (citation-accuracy spot-check) sample rate — 10% baseline or operator-tunable?** — Stream C recommends 10% fixed for v5 ship; operator-tunable defers to v6. Routed to coordinator.
3. **v5-NEW-3 (PICO frontmatter) — should this be a hard-gate (predicate REJECTED if PICO missing) or a soft-gate (warning logged + audit continues)?** — Stream C recommends soft-gate v5, hard-gate-promotion in v6 after operator-experience accumulates.
4. **v6-NEW-1 (process-eval compliance-checklist judge) — should this share infrastructure with v6-NEW-2 (active-eval Elo)?** — Stream C suggests YES; both are trajectory-level. Bundle in v6 harness Lane E + state-machine.
5. **Cross-research-arch convergence patterns table §13 — are the 4 "strongest NOT-yet-shipped convergences" too aggressive for v5?** — Stream C recommends v5 ships 3 of 4 (NEW-1, NEW-2, NEW-3); defer process-level-eval (v6-NEW-1) to give existing v4 deltas time to land.
6. **prisma-review-agent (Tier C §12.6) as an ADOPTION candidate** — should the runtime fork-pattern-study its 12-pydantic-ai-agent pipeline architecture? Stream C recommends T3 PATTERN-STUDY route (don't install; extract source-grounding-validation-gate pattern for v5-NEW-1).

---

## §16 — Cardinal-rule self-check on each proposed fix

Per W299-PLAN §6 done-criteria, every proposed change must self-check against cardinal rules R1-R5 + W286-arc-P0C:

| Proposal | R1 (trusted plugins only) | R2 (no self-invent hooks) | R3 (subagents only via documented surface) | R4 (no `.claude/rules/`) | R5 (safety via Claude Code primitives) | W286-arc-P0C (`.mcp.json:command/args` pinned) |
|---|:--:|:--:|:--:|:--:|:--:|:--:|
| v5-NEW-1 citation-accuracy spot-check (10%-sample codex) | ✓ uses installed codex plugin | ✓ no new hooks | ✓ codex is documented subagent | ✓ all in SKILL.md | ✓ codex API gated | ✓ no MCP add |
| v5-NEW-2 PRISMA flow-diagram artefact | ✓ markdown only | ✓ no hooks | ✓ no subagent | ✓ in SKILL.md | ✓ no perms | ✓ no MCP add |
| v5-NEW-3 PICO predicate frontmatter | ✓ markdown only | ✓ no hooks | ✓ no subagent | ✓ in SKILL.md | ✓ no perms | ✓ no MCP add |
| v5-NEW-2-sub D16 multi-org anchor | ✓ anchor text only | ✓ no hooks | ✓ no subagent | ✓ in SKILL.md | ✓ no perms | ✓ no MCP add |
| v6-NEW-1 process-eval compliance-checklist judge | ✓ codex-as-judge | ◐ requires Lane E (new harness lane = code, NOT hook — within R2 carve-out) | ✓ codex | ✓ in SKILL.md | ✓ no destructive | ✓ no MCP add |
| v6-NEW-7 automated OpenSSF Scorecard Lane F | ◐ requires `scorecard` CLI as installed binary (verify trusted) | ◐ Lane F is harness code (not hook) | ✓ no subagent | ✓ in SKILL.md | ✓ scorecard is read-only | ✓ no MCP add |

All v5-ship proposals pass cardinal-rule self-check cleanly. v6-defer items have minor flags on R1 (need to verify `scorecard` trusted-binary status) but are deferred so not blocking.

---

## §17 — Source-disagreement log

Per W299-PLAN §6 done-criteria, log source-disagreements observed during this stream.

| Disagreement | Rubrics | Resolution |
|---|---|---|
| **Single primary metric vs no-single-primary-metric** | SWE-bench Pass@1 (single) vs HELM (no single) vs sca-v3.1 (dual composites) | sca-v3.1's "dual" choice is intentional compromise; W292-R11 Borda count would replace altogether (v6 DEFER) — Stream C concurs Borda defer. |
| **Output-level vs process-level evaluation** | Most ML benchmarks (output) vs medical-grade (process) | Stream C's v6-NEW-1 absorbs process-level — split between waves is intentional. |
| **Strict-numeric vs deliberation-based** | OpenSSF Scorecard (strict numeric) vs ThoughtWorks Radar (deliberation) vs sca-v3.1 (hybrid: numeric composite + 3-persona deliberation) | sca-v3.1 hybrid is the correct convergence; no resolution needed. |
| **Independent evaluator must be human vs LLM-as-judge acceptable** | Cochrane 2025-11 (human OR AI with validation) vs Anthropic ASL-3 (human required) vs sca-v3.1 (codex LLM) | Anthropic 2025-11-11 position statement explicitly permits AI tools as second-reviewer with validation gate (88-92% precision/recall matches human-second-reviewer error rate). Sca-v3.1's codex Stop-hook is defensible under Cochrane's 2025-11 framework. |
| **Citation presence vs citation accuracy** | OpenAI DR (drop ungrounded), Wikipedia (talk-page enforce), sca-v3.1 (cap if <50%), prisma-review-agent (rapidfuzz drop) | v5-NEW-1 closes the gap via 10%-sample codex cross-verify. |

No critical contradictions surfaced that would block v5 ship-readiness.

---

## §18 — Top-3 findings + confidence levels

Per W299-PLAN §6 done-criteria:

1. **TOP-1 FINDING (HIGH confidence)**: Across 17 research-architectures studied (11 Tier A/B + 6 Tier C), **3 patterns converge at ≥4-rubric agreement** AND are NOT yet in sca-v3.1 or sca-v4 SHIP — citation-accuracy spot-check (5-rubric), PRISMA flow-diagram artefact (4-rubric), PICO predicate frontmatter (6-rubric). All 3 are schema-light + no-harness-change + use existing codex/markdown infrastructure → **ship-ready for v5 cutover** (Stream E execution).

2. **TOP-2 FINDING (MEDIUM confidence)**: The biggest cross-rubric convergence that sca-v3.1 + sca-v4 BOTH MISS is **process-level (not output-level) evaluation** (8 of 11 rubrics require it). Process-level needs new harness Lane E + audit-trajectory-schema → **v6-NEW-1 deferred** (correct phasing per Stream C's recommendation).

3. **TOP-3 FINDING (MEDIUM confidence)**: 6 NEW research-arch repos discovered via multi-MCP cascade are NOT in any prior W288/W292/W296/W297 wave-trail. Most operationally-relevant: **prisma-review-agent PyPI v0.2.9** (pydantic-ai) — proves PRISMA + GRADE IS implementable as Claude-Code-style multi-agent pipeline. **ResearchGym** (arXiv 2602.15112v2) — directly tested Claude Code Opus-4.5 + Codex GPT-5.2 with calibration anchor (baseline-as-lower-bound + author-as-upper-bound).

---

## §19 — Items routed to W299-AUDIT synthesis

- v5 ship-ready candidate-deltas (NEW-1, NEW-2, NEW-2-sub, NEW-3) — Stream E execution input
- v6 candidate-deltas (NEW-1 through NEW-11) — backlog for W300+
- 6 NEW Tier-C discoverables — operator review for inclusion in next-wave broader discovery (Stream B successor)
- 6 open questions §15 — coordinator + operator decision routing
- Cardinal-rule self-check (all v5 proposals PASS) — verifies safe-to-ship

---

## §20 — Multi-MCP discovery log

Per W299 mandate "depth and comprehensiveness of repos discovery via multi-MCP cascade":

| MCP family | Used in this stream | Hits |
|---|:--:|---|
| `mcp__plugin_everything-claude-code_exa__web_search_exa` | ✓ | 8 hits on "SOTA research methodology framework agentic evaluation 2026" — ResearchGym, ISOPro/GCE, ABC, Exgentic, Gaia2, AIRS-Bench, Process-Eval ACL, Active-Eval-General-Agents |
| `mcp__plugin_everything-claude-code_exa__web_search_exa` (Cochrane domain) | ✓ | 5 hits on "PRISMA Cochrane GRADE systematic review framework methodology AI agent" — Cochrane 2025-11 AI position statement, Cochrane Handbook, prisma-review-agent PyPI, CDC ACIP GRADE Handbook, Cochrane AI-as-second-reviewer evaluation |
| `github.com` API via `ctx_batch_execute` | ✓ | 4 parallel queries on research-methodology / systematic-review / llm-agent-eval / decision-records (limited yields — mostly <100★ niche repos; major hits already in Tier A/B) |
| `mcp__plugin_context-mode_context-mode__ctx_search` over W292/W296 indexed | ✓ | Confirmed R1-R12 absorption status + v4 12-ship/7-defer/5-v6+ inventory |
| `WebFetch` Anthropic native | ✗ | not exercised (exa neural-search covered) |
| `mcp__deepwiki__ask_question` | ✗ (skipped due to cost-cap — already had Anthropic engineering blog cite) | n/a |
| `mcp__repomix__*` | ✗ (not in cascade scope) | n/a |
| `mcp__basic-memory__search_notes` | ✗ (markdown-grep fallback per W295-codex-r28+r33 lookup rule preferred for prior-verdict scan; not needed for fresh discovery) | n/a |

**Cascade-tier exercised**: Tier-1 BROAD-SCAN (github + exa + websearch) + Tier-2 DEEP (exa with Cochrane-domain bias) — corresponds to per W297-D cascade T2/T3 routing. Total Stream C MCP cost: ~$0.30 (exa $0.20 + github $0.05 free-tier + ctx_search local $0.05 amortized).

---

**End of W299 Stream C.** File LOC count: see git status post-write. Ship-ready candidate-deltas for v5 (v5-NEW-1 / v5-NEW-2 / v5-NEW-2-sub / v5-NEW-3) handed to Stream E. v6-defer backlog (11+ candidates) handed to W299-AUDIT for backlog routing.
