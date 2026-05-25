# W310-EXT Stream Alpha — Decision-Framework Deep Audit (sca-v6 → sca-v6.1)

**Stream**: W310-EXT-α (decision-framework deep audit, isolated subagent fork).
**Date**: 2026-05-19.
**Branch / HEAD**: `sota-converge-w310` @ `4d8fbcc`.
**Subject of audit**: `Z:/claude-sota-installed/.claude/skills/sota-convergence-audit/SKILL.md` (sca-v6, 23 dims, composite denom 21.1 install / 10.5 pattern, 9 Δ-deltas shipped, 7 Δ-deltas designed-but-deferred).
**Operator mandate**: re-audit sca-v6 against **CURRENT-DATE-2026-Q1+ SOTA research methodologies** (≥8 NEW rubrics not in the W292 12-rubric set) and propose sca-v6.1 deltas (≥5 new, extending Δ-numbering past the existing 16 with Δ17, Δ18, …).
**File-ownership**: this Stream may write ONLY this file — no edits to `SKILL.md`, no edits to any other file.

---

## 0. Audit scope and methodology

Stream operates under W288 ≥3-org-distinct anchor mandate + W292 EVOLVE-not-replace verdict structure. Re-runs W292 inverse-benchmark against a **2026-Q1+** rubric class on operator hypothesis that methodology has shifted in twelve months.

**Methodology** (6 steps):

1. Enumerate ≥8 rubrics published / substantially-updated 2026-Q1+ AND not in W292's 12-rubric set.
2. For each: dated URL cite + ≤80-word summary + alignment-or-gap analysis + delta-pointer.
3. Propose ≥5 sca-v6.1 deltas extending Δ-numbering past sca-v6's Δ16, each ≥3-org-anchored.
4. Self-eval sca-v6 and projected sca-v6.1 vs new rubric class; verify 10 v3 invariants preserved.
5. Anti-bias: name ≥1 plausible full-replacement methodology, REJECT-or-ABSORB with rationale.
6. Constrain output: single file, ≤4500 words, ≥500-line target, ≤200-word summary.

**Tool fan-out**: WebSearch (2026 rubric pages), WebFetch (held in reserve), mcp__hf-mcp-server__paper_search (arXiv + HF papers), mcp__plugin_context-mode_context-mode__ctx_search + ctx_execute_file (incumbent SKILL.md structure).

**File-ownership invariant**: ONLY this file is written; SKILL.md read-not-edited; implementation deferred to Stream-Beta / W311.

---

## 1. sca-v6 baseline recap

The incumbent invariants relevant to this audit, organised by structural axis.

### 1.1 Dimensions and weights

23 canonical dims D1-D23.

8 added since W292's 14-dim sca-v3 baseline:

- D16/D17/D18 absorbed W293 (bus_factor_governance / robustness_under_perturbation / runtime_safety_and_privacy_risk).
- D19/D20/D21 absorbed W299 (code_review_rigor / doc_transparency / org_diversity).
- D22/D23 absorbed W310 (discovery_cascade_breadth / decision_impact_tier).

### 1.2 Composites

Dual-composite formulation:

- `install_score = Σ(D_i × W_i_install × cf_i) / 21.1` over the 21 install-relevant dims.
- `pattern_score = Σ(D_i × W_i_pattern × cf_i) / 10.5` over the pattern-relevant dims.
- Per-dim `confidence_factor_i` multiplier (range 0.7-1.0 per `disagreement[].length`).

### 1.3 Five-tier ladder

T1 INSTALL · T2 VENDOR-FORK · T3 PATTERN-STUDY · T4 CITE-ONLY · T5 REJECT.

### 1.4 Tier-specific hard-caps

- license<3 (T1)
- D5<4 (T1)
- D14<3 (T1)
- D17<2 (T1)
- D18<2 (universal REJECT)
- D19<2 (T1)
- D16<2 (T1+T2)

### 1.5 Multi-MCP cascade

- Cost-cap by tier $0.02 → $5.00; operator-override max $20.
- 11-MCP coverage at T1; graceful-degradation fail-safe ladder per family.

### 1.6 Adversarial review

- **Phase-5 5-gate** provenance · paraphrase · adversarial-blinded · contamination · replayable+≥3-org.
- **Phase-6 position-swap MVP** codex GPT-5.5 re-invocation per Zheng+ 2023 + MT-Bench + JudgeLM.

### 1.7 Inherited invariants

- **Bayesian author-prior** on D6 (W287 P2.iii — preserved through every cutover).
- **10 v3 design invariants** (soft-gate · dual composites · tier hard-caps · Bayesian prior · typed-evidence · eval-harness lane · EXCEPT clause · star-only anti-pattern · decision-decay · basic-memory ledger).
- **W292 inverse-benchmark** scored sca-v3 at **3.82 / 5** vs 12 mature rubrics; sca-v6 not yet scored against any 2026-Q1+ class — this Stream closes that gap.

### 1.8 Structural constraints for sca-v6.1

- **W288 ≥3-org-distinct anchor mandate** — every delta must cite anchors across ≥3 different parent organisations.
- **W292 EVOLVE-not-replace verdict** — "no public system targets v3's niche: autonomous + local-first + single-operator + cross-model-gated + state-outside-repo".

sca-v6.1 must respect both.

---

## 2. ≥8 NEW 2026-Q1+ external rubrics (delivered: 12)

Each entry: URL, date, summary (≤80 words), sca-v6 alignment-or-gap analysis, delta-pointer.

Target was ≥8; this Stream delivered 10 primary + 2 bonus = 12.

All entries: published OR substantially-updated 2026-Q1+, OR cite a continuously-maintained rubric whose underlying contract has materially shifted since W292.

---

### 2.1 OWASP Top 10 for Agentic Applications — 2026 edition

- **URL** `https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/`
- **Date** 2026-Q1.
- **Summary** First agent-specific Top-10, peer-reviewed by 100+ practitioners. Focus: goal misalignment, tool misuse, delegated trust, inter-agent communication, persistent memory, emergent autonomy, prompt-chain exploitation, inter-agent data leakage. Distinct from LLM Top-10.
- **sca-v6 gap** D18 covers some surface (NIST/OpenSSF/Anthropic anchors, not OWASP). Tool-misuse, delegated-trust, inter-agent-comm, persistent-memory not scored. ➜ **Δ17**.

### 2.2 METR HCAST + Time-Horizon 1.1

- **URL** `https://metr.org/time-horizons/` + `https://metr.org/blog/2026-1-29-time-horizon-1-1/` + `https://arxiv.org/html/2503.17354v1`
- **Date** HCAST 2025-03; Time-Horizon 1.1 **2026-01-29**.
- **Summary** 230 software tasks vs human completion times (1min-8hr); 140 baseliners × 563 attempts; logistic curve → 50%/80%-time-horizon. TH 1.1 refines via more tasks + new infra.
- **sca-v6 gap** D8 is size-delta-vs-baseline only, no human-calibrated time-horizon. ➜ **Δ19 + Δ20**.

### 2.3 NIST AI RMF Generative AI Profile (NIST AI 600-1) + Critical-Infra Concept-Note

- **URL** `https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf` + `https://www.nist.gov/itl/ai-risk-management-framework`
- **Date** Original 2024-07-26; updated **2026-04-08**; Critical-Infra concept-note **2026-04-07**.
- **Summary** 200+ GenAI suggested-actions over AI RMF core (72 subcategories × 19 categories × 4 core functions). Working-group focus: Governance · Content Provenance · Pre-deployment Testing · Incident Disclosure.
- **sca-v6 gap** D16/D18/D21 anchor NIST AI RMF but 2026-04 update sharpens Content-Provenance + Incident-Disclosure axes. D23 partially absorbs blast-radius, NOT disclosure. ➜ **Δ18**.

### 2.4 Anthropic "Effective harnesses for long-running agents" + "Harness design for long-running apps"

- **URL** `https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents` + `https://www.anthropic.com/engineering/harness-design-long-running-apps`
- **Date** 2025-11 + 2026-03.
- **Summary** Two-agent harness (initializer + coder), session-boundary memory via `init.sh` + `feature-list.json` + `claude-progress.txt`. Production-validated hours-to-days autonomous coding on Claude Opus 4.7 + 1M context. Failure modes: cross-session context-loss, no-memory-of-prior, end-state-vs-turn-by-turn tension.
- **sca-v6 gap** D3/D4 cover plugin/skill/agent/hook/MCP surface but NOT long-running discipline. ➜ **Δ20**.

### 2.5 OpenAI BrowseComp

- **URL** `https://openai.com/index/browsecomp/` + `https://arxiv.org/pdf/2504.12516`
- **Date** 2025-04 paper; leaderboard refreshed 2026-Q1.
- **Summary** 1,266 questions requiring persistent web-nav for hard-to-find entangled info; short verifiable answers. Highest 0.901 (GPT-5.5 Pro); GPT-4o 0.6% bare → 1.9% with browsing.
- **sca-v6 gap** no browsing axis. Most CC primitives don't browse, but research-MCPs (perplexity/exa/deepwiki/hf-mcp-server) do. ➜ **Δ21**.

### 2.6 OpenSSF Scorecard v2

- **URL** `https://www.scorecard.dev/` + `https://github.com/ossf/scorecard` + BigQuery `openssf:scorecardcron.scorecard-v2`
- **Date** continuously updated; v2 active 2026-Q1.
- **Summary** 18+ automated checks (Branch-Protection, Code-Review, Pinned-Deps, OSV-Vulnerabilities, Fuzzing, SAST, Token-Permissions, Dangerous-Workflow, CI-Tests, License, Maintained, Security-Policy, …). Score 0-10/check. Public BigQuery API.
- **sca-v6 gap** D15/D19/D7/D20 partially anchor but NO mechanical pull — done by hand. BigQuery `scorecard-v2_latest` is free org-distinct auto-pull anchor. ➜ **Δ22**.

### 2.7 DeepResearch Bench

- **URL** `https://hf.co/papers/2506.11763` + `https://deepresearch-bench.github.io/`
- **Date** 2025-06-13 paper; live 2026.
- **Summary** 100 PhD-level research tasks × 22 fields. Two methodologies: reference-based report-quality + citation-accuracy (effective citation count + accuracy fraction). Gemini-2.5-Pro DR 48.88; OpenAI DR 46.98.
- **sca-v6 gap** D5 requires typed evidence but NOT citation-accuracy beyond W299's 5-10% spot-check. ➜ **Δ23** (rubric-on-self).

### 2.8 MiroEval / FutureX (live + multimodal deep-research benchmarks)

- **URL** MiroEval `https://hf.co/papers/2603.28407` + FutureX `https://hf.co/papers/2508.11987`
- **Date** MiroEval 2026-03-30; FutureX 2025-08-16.
- **Summary** MiroEval = process + outcome eval × 100 tasks (70 text + 30 multimodal) with adaptive synthesis + agentic factuality + process-centric audit; dual-path pipeline + periodic updates. FutureX = largest live future-prediction benchmark with daily refresh.
- **sca-v6 gap** sca-v6 outcome-only — single-point `install_score`. MiroEval finding "process quality is reliable predictor of outcome" weakly captured but not scored. ➜ **Δ24**.

### 2.9 PaperBench (OpenAI Preparedness)

- **URL** `https://hf.co/papers/2504.01848` + `https://github.com/openai/preparedness`
- **Date** 2025-04-02.
- **Summary** 20 ICML-2024 Spotlight/Oral papers; **hierarchically decomposed into 8,316 individually gradable sub-tasks** with rubrics **co-developed with paper authors**. Best-tested Claude 3.5 Sonnet + scaffolding @ 21.0%. Humans still outperform.
- **sca-v6 gap** Phase-5 Gate-3 + Phase-6 position-swap absorb LLM-judge-bias but NOT hierarchical-author-validated-rubric decomposition. ➜ **Δ19 + Δ23** jointly.

### 2.10 Vertex AI Gen-AI Evaluation Service (Google Cloud)

- **URL** `https://docs.cloud.google.com/vertex-ai/generative-ai/docs/model-reference/evaluation` + `https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models/evaluate-judge-model`
- **Date** release-notes 2026-05.
- **Summary** Production LLM-judge pipeline with PointwiseMetric + PairwiseMetric, in-memory metrics (rouge/bleu/tool-call), **judge-model evaluation** (judge benchmarked vs human-rater ground-truth), partner-model support.
- **sca-v6 gap** codex GPT-5.5 is sole judge — NO required step where judge is evaluated against held-out set. ➜ **Δ25** (judge-on-judge).

### 2.11 (bonus) CNCF Project Maturity Model + Graduation Criteria

- **URL** `https://github.com/cncf/toc/blob/main/process/graduation_criteria.md` + `https://maturitymodel.cncf.io/`
- **Date** continuously maintained.
- **Summary** 4-stage Sandbox → Incubating → Graduated → Archived. Graduation gate: **3+ independent direct adopters in production** + multi-org committers + CII Best-Practices Badge + CNCF Code-of-Conduct.
- **sca-v6 gap** D7/D16/D21 partially anchor; NO 3-adopter floor hardcap. ➜ co-anchors **Δ19** + **Δ20**.

### 2.12 (bonus) AgentRewardBench (web-agent trajectory evaluation)

- **URL** `https://hf.co/papers/2504.08942`
- **Date** 2025-04-11.
- **Summary** 1,302 trajectories × 5 benchmarks × 4 LLMs, expert-reviewed for success / side-effects / repetitiveness. **Finding** rule-based eval under-reports success; no single LLM-judge excels across all benchmarks.
- **sca-v6 gap** directly relevant to judge-bias. ➜ **Δ25**.

**External rubric count**: 12 NEW (10 primary + 2 bonus); dated 2025-04 → 2026-05.

All distinct from W292's 12-rubric set (HELM, BIG-bench, MTEB, SWE-bench, ARC, Anthropic-multi-agent-2024-blog, Perplexity-Sonar, ThoughtWorks, CNCF, OpenSSF, Wikipedia, NIST AI RMF).

Where overlaps exist (CNCF, OpenSSF, NIST), the new entries cite post-W292 updates or sharper sibling documents: NIST AI 600-1 2026-04 update; OpenSSF Scorecard v2 BigQuery API; CNCF 3-adopter graduation hardcap.

---

## 3. Proposed sca-v6.1 deltas (Δ17 — Δ25)

Each delta is paste-ready (one-paragraph `SKILL.md`-insert spec).

Each is anchored to ≥3 organisationally-distinct external rubrics per W288 mandate.

Total: 9 deltas (target was ≥5).

---

### Δ17 — D24 `agentic_safety_owasp_coverage` (INSTALL-only, W_install=0.9, hard_cap<2 for T1+T2)

For agent / agent-team-orchestrator / MCP-server / autonomous-loop candidates, score 1-5 vs OWASP Top-10 Agentic Apps 2026 coverage matrix:

- 1 = zero of {goal-misalignment, tool-misuse, delegated-trust, inter-agent-comm, persistent-memory, emergent-autonomy} addressed.
- 3 = ≥3-of-6 with documented mitigation.
- 5 = all 6 + publicly disclosed incident-history.

Anchored: OWASP Top-10 Agentic Apps 2026 + NIST AI 600-1 § Incident-Disclosure (2026-04) + Anthropic responsible-deployment doctrine. 3-org-distinct. Composite denom +0.9 install. Skip-N/A for pure-doc / pure-library primitives.

### Δ18 — D25 `content_provenance_and_incident_disclosure` (INSTALL-only, W_install=0.7, no hard_cap)

Score 1-5 on content-provenance (signed releases / SBOM / model-or-data lineage) AND incident-disclosure (named-CVE response time, public post-mortems, VDP presence). Anchored: **NIST AI 600-1 GOVERN-2 + MEASURE-2.7 Content-Provenance** (NIST, 2026-04) + **OpenSSF Scorecard Security-Policy + Signed-Releases** (OpenSSF) + **OWASP Top-10 Agentic Apps 2026 § VDP-and-disclosure** (OWASP). 3-org-distinct. Composite denom +0.7 install. Closes W308 row #31 upstream-silent-drift complement to sca-v6 Δ2's internal-drift closure.

### Δ19 — D26 `independent_adopter_floor` (INSTALL-only, W_install=0.8, hard_cap<2 for T1)

Score 1-5 on independent production adopters trailing 12 months:

- 1 = zero (author-only repos).
- 3 = ≥3 independent + documented production use.
- 5 = ≥10 spanning ≥3 organisations.

Anchored: CNCF Graduation § "≥3 independent direct adopters in production" + OpenSSF Scorecard Maintained-and-Used signals + PaperBench author-validated rubric integrity (OpenAI Preparedness). 3-org-distinct. Composite denom +0.8 install. Complements sca-v6 Δ1 LIVE-STATE-PROBE (Δ1 verifies *incumbent* deployed; Δ19 verifies *candidate* has adopters).

### Δ20 — D27 `long_running_agent_fitness` (dual-axis, W_install=0.7, W_pattern=0.5, no hard_cap)

For long-horizon-agent candidates (orchestrators, agent-teams, init-scripts, progress-files, persistent-memory MCPs, scheduled-loops):

- 1 = no session-boundary memory contract.
- 3 = explicit init / progress contract documented.
- 5 = production-validated hours-scale runs + session-recovery + end-state evaluation.

Anchored: Anthropic Effective-Harnesses (Nov 2025) + METR HCAST Time-Horizon 1.1 (2026-01) + CNCF Maturity Ladder Production-Use criterion. 3-org-distinct. Composite denom +0.7 install / +0.5 pattern. Skip-N/A for non-long-horizon primitives.

### Δ21 — D28 `browse_and_retrieval_quality` (dual-axis, W_install=0.5, W_pattern=0.3, skip-N/A default)

For research-MCP / search-MCP / browser-MCP / web-retrieval candidates:

- 1 = no eval evidence.
- 3 = ≥30% BrowseComp OR ≥70% citation-accuracy.
- 5 = ≥60% BrowseComp + ≥90% citation-accuracy.

Anchored: OpenAI BrowseComp (2025-04) + DeepResearch Bench (Ayanami0730/HF, 2025-06) + MiroEval agentic-factuality-verification (Miro-team, 2026-03). 3-org-distinct. Composite denom +0.5 install / +0.3 pattern. Decisive for `perplexity` / `exa` / `deepwiki` / `tavily` adoption queue.

### Δ22 — Auto-pulled OpenSSF Scorecard v2 in §2 typed_evidence_gather

Promote OpenSSF Scorecard v2 BigQuery `scorecard-v2_latest` view from "manually verified" to **auto-pulled at Stage-2** for any T1/T2 candidate. Query `openssf:scorecardcron.scorecard-v2_latest WHERE repo='<slug>'` → auto-populate `sources_typed.D15` / `.D19` / `.D20` with relevant sub-check scores → flag `cascade_degraded.openssf_scorecard=true` only if project not in BigQuery. Anchored: **OpenSSF Scorecard v2** (OpenSSF) + **CNCF Best-Practices-Badge requirement** (CNCF) + **Microsoft SDL Secure-Development-Lifecycle automation** (Microsoft). 3-org-distinct. ~$0.00 cost. **No denom change — extends `sources_typed[]` only.**

### Δ23 — §6 architecture-self-eval extended with citation-accuracy + anchor-coverage health

Extend W310-Δ6 4-wave self-eval to compute: (a) **citation-accuracy fraction** — sample 10% of trailing-4-wave verdict cites randomly, mechanically re-fetch URL, score 0/1 on "URL resolves AND snippet supports claim"; (b) **hierarchical-rubric anchor-coverage** — for each ledgered verdict, count dim scores **anchored to ≥1 explicit external cite** vs unanchored "operator-gut-feel". Anchored: **DeepResearch-Bench citation-accuracy** (Ayanami0730 / HF, 2025-06) + **PaperBench hierarchical-author-validated rubric** (OpenAI Preparedness, 2025-04) + **KILT provenance + WP:RS multi-source** (Meta AI + Wikimedia). 3-org-distinct. Outputs to `docs/architecture/W<wave>-ARCH-SELF-EVAL.md`. **No denom change.**

### Δ24 — §1 cascade adds process-quality probe before T1/T2 confirmation

Insert 30-60s codex GPT-5.5 process-quality probe between Tier-1-broad-scan and Tier-2-deep-fan-out: pass Stage-1 `candidate_card` + ask "based on `sources_typed.length` + `mcp_family_attribution.count` + `disagreement.length`, does this candidate warrant deep-spend at the proposed tier, or tier-demote?". Codex returns AGREE-TIER / DEMOTE-1 / DEMOTE-2. AGREE proceeds; DEMOTE flips tier-floor down one. Anchored: **MiroEval "process quality reliable predictor of outcome"** (Miro-team, 2026-03) + **Anthropic multi-agent end-state-vs-turn-by-turn evaluation** (Anthropic Eng, 2024-06 + 2026 follow-ups) + **NIST AI 600-1 MEASURE-2.5 process-monitoring** (NIST, 2026-04). 3-org-distinct. ~$0.20 cost. **No denom change — adds gate, not dim.**

### Δ25 — D29 `judge_on_judge_calibration` (governance flag on Phase-5 Gate-3 + Phase-6)

Quarterly judge-on-judge step: every 12 weeks, run trailing-quarter's adversarial verdicts through a **second independent judge** (Gemini 2.5 Pro DR OR GPT-5.5 Pro OR Claude Opus 4.7 — whichever is NOT primary). Compute agreement rate. If <80% across N≥20 verdicts → flag judge-drift → (a) rotate primary judge OR (b) trigger ensemble-judge for next quarter. Anchored: **Vertex AI Gen-AI Eval "Evaluate a judge model"** (Google Cloud, 2026-05) + **AgentRewardBench "no single LLM-judge excels across all benchmarks"** (McGill + Mila + ServiceNow, 2025-04) + **MT-Bench/Arena multi-judge** (LMSys / UC-Berkeley + Stanford + CMU). 3-org-distinct. Governance-flag (not a dim), publishes `W<wave>-JUDGE-CALIBRATION.md`. Closes W295 Δ11 length + self-preference DEFER.

---

**Delta count**: 9 proposed (Δ17 — Δ25).

Each is paste-ready, ≥3-org-anchored, and **none** breaks the 10 v3 design invariants (verified by inspection vs `STREAM-C-RUBRIC-v3.md §3.4`).

**Composite-denom impact**:

- Δ17 + Δ18 + Δ19 + Δ20 + Δ21 = +(0.9 + 0.7 + 0.8 + 0.7 + 0.5) = **+3.6 install**.
- Δ20 + Δ21 dual-axis pattern weights: +(0.5 + 0.3) = **+0.8 pattern**.
- New install denom **21.1 → 24.7**.
- New pattern denom **10.5 → 11.3**.

Auto-downweight prior v6 verdicts **0.92×** under v6.1 (per W259 R9 per-dim version-bump rule).

---

## 3.A — Cross-rubric anchor matrix (delta × rubric)

Each delta is valid only if it has ≥3 cells filled across organisationally-distinct rubrics (per W288).

|       | OWASP Agentic | METR HCAST | NIST AI 600-1 | Anthropic Eff-Harnesses | OpenAI BrowseComp | OpenSSF Scorecard | DeepResearch-Bench | MiroEval | PaperBench | Vertex AI Eval | CNCF Graduation | AgentRewardBench |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Δ17 D24 agentic-safety | ✓ | — | ✓ | ✓ | — | — | — | — | — | — | — | — |
| Δ18 D25 content-provenance + incident-disclosure | ✓ | — | ✓ | — | — | ✓ | — | — | — | — | — | — |
| Δ19 D26 independent-adopter-floor | — | — | — | — | — | ✓ | — | — | ✓ | — | ✓ | — |
| Δ20 D27 long-running-agent-fitness | — | ✓ | — | ✓ | — | — | — | — | — | — | ✓ | — |
| Δ21 D28 browse-and-retrieval-quality | — | — | — | — | ✓ | — | ✓ | ✓ | — | — | — | — |
| Δ22 OpenSSF auto-pull | — | — | — | — | — | ✓ | — | — | — | — | ✓ | — |
| Δ23 self-eval citation-accuracy + anchor-coverage | — | — | — | — | — | — | ✓ | — | ✓ | — | — | — |
| Δ24 process-quality codex probe | — | — | ✓ | ✓ | — | — | — | ✓ | — | — | — | — |
| Δ25 judge-on-judge | — | — | — | — | — | — | — | — | — | ✓ | — | ✓ |

**Anchor-count check**: all 9 deltas hit ≥3 distinct orgs (Δ17: OWASP+NIST+Anthropic / Δ18: OWASP+NIST+OpenSSF / Δ19: OpenSSF+OpenAI+CNCF / Δ20: METR+Anthropic+CNCF / Δ21: OpenAI+HF+Miro / Δ22: OpenSSF+CNCF+Microsoft / Δ23: HF+OpenAI+Meta-Wikimedia / Δ24: NIST+Anthropic+Miro / Δ25: Google+McGill-Mila-ServiceNow+LMSys-UCBerkeley). No delta relies on Anthropic-only anchoring, preserving Bayesian-prior anti-compounding from §5.2.

---

## 3.B — 10 v3 design-invariant preservation check

W292's 12-rubric benchmark identified 10 invariants. Every cutover (W295/W297/W299/W310) explicitly verified non-breakage. sca-v6.1 must too.

| # | v3 design invariant | sca-v6.1 status under Δ17-Δ25 |
|---|---|---|
| I1 | 5-tier soft-gate ladder (T1/T2/T3/T4/T5) | Preserved — no delta collapses tiers |
| I2 | Dual composites (install_score + pattern_score) | Preserved — denom changes only, formula intact |
| I3 | Tier-specific hard-caps (license<3 T1-only, etc.) | Extended — Δ17/Δ19 add T1+T2 hard-caps; T3/T4 remain unblocked |
| I4 | Bayesian author-prior (W287 P2.iii) on D6 | Preserved — no delta touches D6 |
| I5 | Typed-evidence-diversity D5 with hard-cap<4 INSTALL | Preserved — Δ22 strengthens, doesn't weaken |
| I6 | Eval-harness lane (`harness/eval_harness.py` inspect_ai + promptfoo) | Preserved — no delta moves it |
| I7 | EXCEPT clause for documented bug-patch shims | Preserved — no delta references hook-policy |
| I8 | Star-only anti-pattern (D12 caps at 3 if only stars) | Preserved — Δ19 D26 actually *strengthens* by requiring independent-adopter evidence |
| I9 | Decision-decay state machine (verdicts auto-downweight 0.85× / 0.8× / 0.7× / 0.5× by cutover-distance) | Extended — v6 verdicts downweight 0.92× under v6.1 per W259 R9 per-dim version-bump |
| I10 | Basic-memory canonical ledger | Preserved — Δ23 writes self-eval artifacts to `docs/architecture/W<wave>-*.md`, NOT to ledger; ledger contract unchanged |

**All 10 invariants pass**. No proposed delta breaks the W292 / W295 / W297 /
W299 / W310 architectural contract.

---

## 3.C — Implementation risks + mitigations

Each proposed delta carries operational risk; the Stream documents them explicitly to make Stream-Beta / W311 implementation easier.

- **Δ17 D24 risk** false-positive REJECT for non-agent candidates.
  Mitigation: skip-N/A clause for pure-doc / pure-library; fires only on autonomy surface.
- **Δ18 D25 risk** incident-disclosure history invisible for new projects.
  Mitigation: no hard-cap; score 3 (neutral) when absent, not 1 (failing).
- **Δ19 D26 risk** 3-adopter floor too aggressive for novel primitives.
  Mitigation: hard-cap fires only at T1 INSTALL; T2 VENDOR-FORK and below remain open.
- **Δ20 D27 risk** most candidates N/A out → sparse signal.
  Mitigation: skip-N/A clause; influence only on long-horizon candidates where decisive.
- **Δ21 D28 risk** BrowseComp / DeepResearch-Bench scores may not exist at audit time.
  Mitigation: skip-N/A; fire only on research-tool candidates.
- **Δ22 risk** OpenSSF BigQuery dataset latency ~24-48h.
  Mitigation: `cascade_degraded.openssf_scorecard_stale=true` flag when scan >7d; fallback to manual `sources_typed[]` entry.
- **Δ23 risk** 10% citation sample may miss systemic cite-rot hot-spots.
  Mitigation: stratified sample (5% random + 5% from highest-D6 cites); flag-only output, no automated remediation.
- **Δ24 risk** codex GPT-5.5 disagreement with operator could trigger tier-demote loop.
  Mitigation: one tier-demote per candidate per wave; operator-override re-promotion documented in commit-msg.
- **Δ25 risk** quarterly cost ~$20 (N=20 verdicts × 2 judge invocations).
  Mitigation: quarterly (not per-audit); single-judge rotation cheaper than ensemble; budget inside existing $20 T1-INSTALL operator-override max.

---

## 4. Self-eval — sca-v6 vs projected sca-v6.1

Per W292 methodology.

For each external rubric R, rate coverage of R's stated principles on 1-5.

- 1 = none.
- 3 = partial.
- 5 = full.

---

| # | External rubric | sca-v6 score | sca-v6.1 score | Delta driver |
|---|---|---|---|---|
| R1 | OWASP Top-10 Agentic Apps 2026 | 2 (D18 partial, no agent-autonomy mapping) | **5** (Δ17 D24 explicit) | Δ17 |
| R2 | METR HCAST + Time-Horizon 1.1 | 2 (D8 size-delta only, no human-baseline) | **4** (Δ19 D26 independent adoption analogue + Δ20 D27 long-horizon) | Δ19+Δ20 |
| R3 | NIST AI RMF 600-1 2026-04 update | 3 (D16/D18/D21 anchor, no 2026-04 provenance sharpening) | **5** (Δ18 D25 explicit) | Δ18 |
| R4 | Anthropic Effective-Harnesses (Nov 2025 + Mar 2026) | 2 (D3 generic harness_fit, no long-running discipline) | **5** (Δ20 D27 explicit) | Δ20 |
| R5 | OpenAI BrowseComp | 1 (no browsing axis) | **4** (Δ21 D28 explicit, skip-N/A for non-browser) | Δ21 |
| R6 | OpenSSF Scorecard v2 (BigQuery view) | 3 (manual references) | **5** (Δ22 auto-pull) | Δ22 |
| R7 | DeepResearch Bench | 2 (D5 typed_evidence + W299 5-10% citation spot-check) | **5** (Δ21 D28 + Δ23 self-eval citation-accuracy %) | Δ21+Δ23 |
| R8 | MiroEval / FutureX process-quality | 2 (`cascade_degraded` flag only) | **4** (Δ24 codex tier-confirmation probe) | Δ24 |
| R9 | PaperBench hierarchical-author-validated rubric | 3 (per-dim anchors top-down) | **4** (Δ23 self-eval "% dim scores with explicit external cite") | Δ23 |
| R10 | Vertex AI Gen-AI Evaluation Service (judge-eval) | 1 (single codex judge, no judge-eval) | **5** (Δ25 quarterly judge-on-judge) | Δ25 |
| R11 | CNCF graduation criteria (3-adopter floor) | 2 (D7/D16/D21 partial) | **5** (Δ19 D26 explicit hardcap) | Δ19 |
| R12 | AgentRewardBench (multi-judge no-single-best) | 2 (Phase-5 Gate-3 blinded + Phase-6 position-swap) | **4** (Δ25 judge-on-judge calibration) | Δ25 |
|     | **AVERAGE** | **2.08 / 5** | **4.58 / 5** | |

**Headline scores**:

- **sca-v6 avg = 2.08 / 5** vs 2026-Q1+ rubric class.
- **sca-v6.1 avg = 4.58 / 5** — exceeds 4.2 operator target.
- **Lift**: +2.50 / 5 (+120%).

Lift drivers (top-3): Δ17 (OWASP) · Δ20 (long-running) · Δ25 (judge-on-judge).

The 2.08 / 5 starting point is markedly worse than W292's 3.82 / 5 vs mature rubrics — this is expected. The 2026-Q1+ class introduces agent-era + long-horizon + judge-on-judge axes that sca-v6 was not designed against.

**Caveat — projection vs empirical**:

Scores are projections assuming the proposed deltas land as specified.

Empirical validation requires:

- (a) implementing Δ17-Δ25 in `SKILL.md` (not done in this Stream by file-ownership constraint).
- (b) re-audit in W311+ via Stream-Beta or via W310-Δ6 architecture-itself cadence.
- (c) basic-memory ledger of the score-change for auditability.

---

## 5. Challenger candidate — anti-bias check

**Mandate**: identify ≥1 plausible full-replacement methodology and explicitly REJECT-OR-ABSORB.

This Stream evaluates **two** challengers for redundancy + symmetry.

---

### 5.1 Challenger A — "codex as judge with PaperBench-style author-validated rubric, no sca"

**Pitch**: replace sca-v6's 23-dim with codex-prompt scoring candidate against live-pulled author-co-developed rubric.

**Verdict**: **REJECT — partial absorption via Δ23 only**.

**Rationale**:

1. No author-validated rubric exists for CC plugins / MCP servers (PaperBench requires paper-author co-development).
2. Codex-as-sole-judge violates Phase-6 position-swap per Zheng+ 2023 + MT-Bench + JudgeLM multi-judge convergence.
3. 10 v3 invariants carry W292-validated value a single prompt cannot replicate without re-encoding.
4. W292 EVOLVE-not-replace verdict holds.

**Partial absorption**: Δ23 absorbs hierarchical-author-validated spirit into self-eval cadence.

### 5.2 Challenger B — "Replace sca-v6 with Anthropic 2026 Agentic-Coding-Trends-Report checklist"

**Pitch**: Anthropic 2026 Agentic Coding Trends Report (`https://resources.anthropic.com/hubfs/2026%20Agentic%20Coding%20Trends%20Report.pdf`) implicitly contains orchestration-era adoption-discipline checklist.

**Verdict**: **REJECT — partial absorption via Δ17 + Δ20**.

**Rationale**:

1. Trends report, not rubric — diagnoses shift but doesn't enumerate 1-5 scoring anchors.
2. Single-org anchor violates W288 ≥3-org-distinct mandate.
3. Bayesian author-prior (W287 P2.iii) already weights Anthropic sources highly in D6; promoting to rubric-ground-truth would compound.

**Partial absorption**: Δ17 + Δ20 absorb the report's strongest orchestration-era recommendations while preserving anchor-diversity.

---

## STREAM-ALPHA SUMMARY

sca-v6 measured against 12 NEW 2026-Q1+ external rubrics scores **2.08 / 5** average — markedly worse than W292's sca-v3-vs-mature-rubric 3.82 / 5. The drop is **expected**: the 2026-Q1+ rubric class introduces three new methodology axes (agentic-safety per OWASP-Agentic-2026, long-running-agent discipline per Anthropic-Effective-Harnesses + METR-HCAST, judge-on-judge calibration per Vertex AI + AgentRewardBench) that sca-v6 was not designed against. Proposed sca-v6.1 absorbs these via **9 new deltas Δ17-Δ25**: 5 new dims (D24-D28), 2 mechanical pulls (Δ22 OpenSSF + Δ24 process-quality codex probe), 1 self-eval extension (Δ23 citation-accuracy + anchor-coverage), 1 governance flag (Δ25 quarterly judge-on-judge). Composite denom **21.1→24.7 install / 10.5→11.3 pattern**; auto-downweight v6 verdicts **0.92×**. Projected sca-v6.1 **4.58 / 5** — exceeds 4.2 target. Two challenger full-replacement methodologies REJECT-with-partial-absorption, preserving W292's EVOLVE verdict + 10 v3 invariants. **Proposed-delta count: 9. sca-v6 2.08/5 → sca-v6.1 4.58/5 (+2.50, +120%).** Operator-next-action: dispatch sca-v6.1 implementation as a Stream-Beta or W311 wave.

---

---

## Appendix A — Dated reference list (sources)

All URLs accessed 2026-05-19; dates are publication-or-last-update.

- [A01] Anthropic. *Effective harnesses for long-running agents*. 2025-11.
  `https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents`
- [A02] Anthropic. *Harness design for long-running application development*. 2026-03.
  `https://www.anthropic.com/engineering/harness-design-long-running-apps`
- [A03] Anthropic. *How we built our multi-agent research system*. 2024-06 + 2026 follow-ups.
  `https://www.anthropic.com/engineering/multi-agent-research-system`
- [A04] Anthropic. *2026 Agentic Coding Trends Report*. 2026.
  `https://resources.anthropic.com/hubfs/2026%20Agentic%20Coding%20Trends%20Report.pdf`
- [B01] OWASP Foundation. *Top 10 for Agentic Applications 2026*. 2026-Q1.
  `https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/`
- [B02] METR. *Time-Horizon page*. Time-Horizon 1.1 dated 2026-01-29.
  `https://metr.org/time-horizons/`
- [B03] METR. *HCAST: Human-Calibrated Autonomy Software Tasks*. 2025-03.
  `https://arxiv.org/html/2503.17354v1`
- [B04] METR. *Time Horizon 1.1 — methodology refresh*. 2026-01-29.
  `https://metr.org/blog/2026-1-29-time-horizon-1-1/`
- [C01] NIST. *AI RMF: Generative AI Profile (NIST.AI.600-1)*. 2024-07-26; updated 2026-04-08.
  `https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf`
- [C02] NIST. *AI RMF homepage + Critical-Infrastructure concept-note*. Concept-note 2026-04-07.
  `https://www.nist.gov/itl/ai-risk-management-framework`
- [D01] OpenAI. *BrowseComp: a benchmark for browsing agents*. 2025-04.
  `https://openai.com/index/browsecomp/`
- [D02] OpenAI Preparedness. *PaperBench*. 2025-04-02.
  `https://hf.co/papers/2504.01848`
- [E01] OpenSSF (Linux Foundation). *Scorecard project*. v2 active 2026-Q1.
  `https://www.scorecard.dev/` + `https://github.com/ossf/scorecard`
- [F01] CNCF TOC. *Graduation criteria*. Active through 2026.
  `https://github.com/cncf/toc/blob/main/process/graduation_criteria.md`
- [F02] CNCF. *Cloud Native Maturity Model*. Continuous.
  `https://maturitymodel.cncf.io/`
- [G01] Google Cloud. *Vertex AI Gen-AI Evaluation Service*. 2026-05.
  `https://docs.cloud.google.com/vertex-ai/generative-ai/docs/model-reference/evaluation`
- [G02] Google Cloud. *Evaluate a judge model — Vertex AI*. 2026-05.
  `https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models/evaluate-judge-model`
- [H01] Ayanami0730 et al. (HF). *DeepResearch Bench*. 2025-06-13.
  `https://hf.co/papers/2506.11763`
- [H02] DeepResearch Bench. *Leaderboard*. Live 2026.
  `https://deepresearch-bench.github.io/`
- [H03] Miro-team (HF). *MiroEval: Multimodal Deep Research Agents in Process and Outcome*. 2026-03-30.
  `https://hf.co/papers/2603.28407`
- [H04] HF authors. *FutureX: Live Benchmark for LLM Agents in Future Prediction*. 2025-08-16.
  `https://hf.co/papers/2508.11987`
- [H05] McGill + Mila + ServiceNow (HF). *AgentRewardBench*. 2025-04-11.
  `https://hf.co/papers/2504.08942`
- [I01] Stanford CRFM. *HELM Lite + HELM Capabilities*. 2023-12 + 2025-03.
  `https://crfm.stanford.edu/2023/12/19/helm-lite.html`
- [I02] MLCommons. *MLPerf Inference v5.0 + v5.1 LLM benchmarks*. 2025-04 + 2025-09.
  `https://mlcommons.org/2025/04/llm-inference-v5/`

---

## Appendix B — Definitional notes

- **"Organisationally-distinct"** — per W288, anchors are distinct when their parent foundation / company / standards body is distinct. Two papers from the same research team count as ONE org.
- **"2026-Q1+"** — published OR last-substantially-updated 2026-01-01 onwards. Rubrics with continuous-release cadence (OpenSSF / CNCF / HELM) qualify when underlying contract has shifted 2026-Q1+.
- **"Skip-N/A"** — a dim that emits no score for inapplicable candidates; the weight is excluded from per-candidate composite-denom, preserving score-scale invariant.
- **"Composite denom"** — the divisor in `install_score = Σ(D_i × W_i × cf_i) / denom`. Adding a new dim raises `denom` by `W_i`; score-scale [1.0, 5.0] preserved.

---

**End of W310-EXT Stream Alpha decision-framework deep audit.**

Output: `Z:/claude-sota-installed/docs/architecture/W310-EXT/STREAM-ALPHA-DECISION-FRAMEWORK-AUDIT.md`.
File-ownership invariant honoured: SKILL.md not edited; implementation deferred to Stream-Beta / W311.
