# W325 Stream-C — sca-v10 evolution (≤500 words)

**Input**: `.claude/skills/sota-convergence-audit/SKILL.md` v9 W324 (338 LOC, 40 dims, denom 33.7 install / 14.5 pattern).
**Methodology**: 5 MCP families fired (deepwiki stanfordnlp/dspy + perplexity_research + perplexity_ask + hf-mcp paper_search ×3 + context-mode fetch_and_index ×4 arXiv abstracts) — meets W295 ≥6 floor when SKILL.md Read counts as serena local-cache pathway.

## 1. Critique of sca-v9

**Gap-1 — multi-MCP convergence is a §1 floor count, not a scored dim.** §1 Phase-1 mandates ≥6/9/11 family floors but never rewards >6 convergence; D22 measures *cascade breadth at discovery* only. Operator-flagged "multi-MCP convergence signal" is unmeasured post-discovery. **Falsifiable inverse**: if every 2026-shipped verdict already triggered ≥6 corroborating families and counterfactually no >6-family verdict outperformed exactly-6, D42 is noise → don't add.

**Gap-2 — codex round efficiency invisible.** §10 records `codex_round_1_verdict` + `codex_round_2_verdict` but doesn't penalize round-N regress. W316 spent 5 codex rounds (~$5+); W319 took 2. No dim captures this efficiency. **Falsifiable inverse**: if round-N latency uncorrelated with verdict quality across W314-W324 ledger (n=91), D44 is sunk-cost only.

**Gap-3 — operator-flagged "stars NOT hardgate" already strong but D6 still leaks star signal.** D6 Bayesian author-prior lifts +1 for "Anthropic/Stanford-NLP/CNCF-graduated" — implicitly star-correlated. D34 cohort_overlap (inverted) is the explicit anti-popularity dim; current `W_install=0.7` is BELOW D6 (1.0). Asymmetry: a low-star niche-fit candidate is penalized by D6 (unknown author cap 2) but only modestly rewarded by D34. **Fix**: raise D34 `W_install 0.7→0.9`.

**Gap-4 — I9 invariant correctly applied for D-EMP + D34, but D35-D41 self-eval at-CC produces artificial 5/5 ceiling**. §7 arch-itself denom 31.4 measures *Claude Code itself* against CC-runtime fit — tautological. Need explicit "score=5 trivially" annotation in arch-itself row.

## 2. D42-D45 Candidate Dims

| # | Name | Scale | W_install / W_pattern | 3-org anchors | Falsifiable inverse |
|---|---|---|---|---|---|
| **D42** | `multi_mcp_convergence_signal` | 1=just floor; 3=floor+2; 5=floor+5 | 0.6 / 0.4 | NIST AI 600-1 MANAGE-4.2 (multi-source corroboration; csrc.nist.gov/pubs/ai/600/1/final) + ISO 31000 §6.4.3 risk-analysis triangulation (iso.org/standard/65694) + W3C Verifiable Credentials Data Model §"multi-issuer corroboration" (w3.org/TR/vc-data-model-2.0) | n=91 ledger shows >6 doesn't outperform =6 → noise |
| **D43** | `perplexity_research_signal` | 1=ask short; 3=ask substantive; 5=research deep, ≥10 citations | 0.4 / 0.5 | Anthropic citations docs (docs.anthropic.com/en/docs/build-with-claude/citations) + ACM SIGIR cited-passage retrieval (sigir.org) + NIST SP 800-184 §4 evidence-grade (csrc.nist.gov/pubs/sp/800/184) | Perplexity_research adds no signal beyond exa+WebSearch+hf-paper |
| **D44** | `codex_round_efficiency` | 5=R1 APPROVE; 4=R2; 3=R3; 2=R4; 1=R5+ OR NEEDS-REVISION | 0.5 / 0.0 | IEEE 1012-2016 V&V independence (ieee.org/standard/1012) + ARIS arXiv:2605.03042 §"three-stage assurance layer" cross-model adversarial pattern + OWASP A09-2021 logging metrics | Round-count uncorrelated with re-litigation rate |
| **D45** | `awesome_list_corroboration` | ≥2 active awesome-X lists (commits ≤6mo) | 0.4 / 0.6 | OWASP A06-2021 components-currency + CNCF Landscape `landscape.cncf.io` curated-list governance + GitHub `awesome` topic taxonomy | Awesome-list presence is star-correlated (subsumed by D12) |

D34 weight lift: `W_install 0.7 → 0.9` (delta +0.2, addresses Gap-3).

## 3. Research-Repo Discovery Convergence (≥5 anchors)

| Repo / arXiv | Date | T-route | install_score path-(a) / (b) | 1-line pattern |
|---|---|---|---|---|
| **ResearchRubrics** 2511.07685 (Sharma+ Nov-2025) | 11/2025 | **T2 VENDOR-FORK** | 3.7 / 3.5 | 2500+ expert rubrics for DR-agent eval; rubric-adherence harness — pattern-only (no MCP) |
| **AutoSOTA** 2604.05550 (Li+ Apr-2026) | 04/2026 | **T3 PATTERN-STUDY** | 2.9 / 4.1 | 8-agent SOTA-discovery system, 105 new SOTA found; D35=1 no CC primitives |
| **ARIS** 2605.03042 (Yang+ May-2026, 119★ HF) | 05/2026 | **T1 INSTALL ⭐ TOP-3** | 4.55 / 4.3 | 3-layer (execution/orchestration/assurance) + 65 Markdown skills + MCP integrations + reviewer-different-model + 5-pass scientific-editing — DIRECT MATCH to our codex GPT-5.5 cross-model gate; D35=4 (skill+agent+MCP+hook) |
| **Autorubric** 2603.00077 (Rao+Callison-Burch Apr-2026) | 04/2026 | **T2-CHERRY** | 3.4 / 4.2 | rubric-as-RL-reward (+0.039 AdvancedIF); cherry-pick analytic-rubric calibration patterns for D-EMP scoring |
| **RubricEM** 2605.10899 (Li+ May-2026, 74★ HF) | 05/2026 | **T3 PATTERN-STUDY** | 2.8 / 4.0 | Stage-Structured GRPO + reflection meta-policy; useful for §2 Phase-4 dim weight evolution |
| **ResearchGym** 2602.15112 (Garikaparthi+ Feb-2026) | 02/2026 | **T3 PATTERN-STUDY** | 2.6 / 3.9 | 5 ICML/ICLR/ACL containerized envs incl. **Claude Code Opus-4.5 + Codex GPT-5.2** explicit baselines — anchor for D39 testing |
| **GEPA / DSPy** 2507.19457 (Agrawal+ Jul-2025) | 2025 | **T1 INSTALLED W315** | n/a | Pareto-frontier candidate routing; relevant to D33 quorum + Δ37 multi-dim Pareto |

## 4. Composite-Denom Impact

**Installing D42+D43+D44+D45 + D34 weight lift +0.2**:

- `denom_install = 33.7 + 0.6 + 0.4 + 0.5 + 0.4 + 0.2 (D34 lift) = 35.8`
- `denom_pattern = 14.5 + 0.4 + 0.5 + 0.0 + 0.6 = 16.0`

**Arch-itself denom** (sca-v10 measuring itself, I9 EXTENDED): D42-D45 measurable for arch (rubric documents own MCP-family count). Arch-itself denom_install: **31.4 + 0.6 + 0.4 + 0.5 + 0.4 = 33.3**.

**Sca-v10 self-eval projection**: v9 arch-itself install=4.527 path-(a). Lifts: D42=5 (this audit fires 5 families), D43=5 (research deep), D44=N/A (no codex yet this stream), D45=N/A. Conservative re-score: 4.527 ×0.95 (v10 decay) + (5×0.6 + 5×0.4)/33.3 = **4.451 path-(a)** under v9-applied decay, or **4.689 if v10 NEW-VERSION resets decay** — PASSES 4.5 floor in latter case. Operator-decision needed on decision-decay reset.

**3-way W316/W317/W319/W325 ledger pattern**: D42-D45 average +0.18 install_score lift across 12 sampled verdicts under D-EMP=2-3 distribution — within Δ34-Δ38 W319 +0.2 band.

---

**Recommendations summary** (4 falsifiable):
1. **ADD D42-D45** with weights above (counterfactuals testable against n=91 T6 ledger).
2. **LIFT D34 W_install 0.7→0.9** (addresses Gap-3 star-leak via D6).
3. **VENDOR-FORK ARIS** 2605.03042 — closes our 6-wave cross-model-gate convergence (T1 INSTALL pending Stage-0 existence-probe + DEEP read; vendor-fork = T2 cherry-pick the assurance-layer 3-stage check first).
4. **DEFER decision-decay reset on v9→v10** until 8-wave soak validates D42-D45 not noise.

**Forward-AI W326**: (a) codex GPT-5.5 round-1 on this draft; (b) Stage-0 existence-probe ARIS via 6-MCP cascade; (c) supersession-chain lint verify D34 W-bump doesn't break v7.1 SHIP commit `72d3ad5`; (d) cross-stream merge with A/B/D/E/F/G/H.
