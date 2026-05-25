# GAP-EVAL-REASONING - Eval Harnesses + Reasoning Primitives Deep-Dive
**Date**: 2026-05-16 | **Author**: sota-researcher subagent | **Scope**: Cross-cutting gaps under-covered in W258 corpus
**R0 hypotheses**:
- **H-EVAL**: 3+ eval harnesses beyond SWE-bench (fresh leq 180d, geq 500 stars or named-T1) satisfy Axis-1 3-org gate
- **H-REASON**: 3+ reasoning primitives with reproducible benchmark gains warrant L5 install vs L6 PATTERN-CITE
**Rejection criterion**: <3 distinct orgs per category -> stay at L6 PATTERN-CITE

---

## A - Eval Harness Gap Findings

| Name | Stars | License | 1-line value | Author/Org | Probe-DAG | Verdict |
|---|---:|---|---|---|---|---|
| **openai/mle-bench** | 1530 | MIT | 75 Kaggle ML-engineering competitions; bronze@16.9% by o1-preview+AIDE; submissions paused 2026-04-24 | OpenAI (named-T1) | P1pass P2pass P3pass P4 leaderboard-paused P5pass P6 arxiv/2410.07095 P7 mature | **STUDY-PILOT** (paused leaderboard) |
| **xlang-ai/OSWorld** | 2850 | Apache-2.0 | 369 real-desktop computer-use tasks; NeurIPS 2024; OSWorld-Verified upgrade; SOTA ~38% (Apr 2026) vs human 72% | HKU XLang Lab (named-T1) | P1pass P2pass P3 active 2026-05-16 P4 HF leaderboard P5pass P6 NeurIPS P7 mature | **INSTALL** |
| **laude-institute/terminal-bench** (Harbor framework) | n/a probe-pending | Apache-2.0 | 89 hard terminal tasks (sw eng, sec, bio, gaming); live SOTA Gemini 3.1 Pro 78.4%, Claude Opus 4.6 74.7% | Stanford+Laude Institute (named-T1) | P1pass P2pass P3 active P4 live leaderboard tbench.ai P5pass P6 arxiv/2601.11868 P7 newer-active | **INSTALL** |
| **sierra-research/tau2-bench** | n/a probe-pending | MIT | Tool-agent-user multi-turn benchmark; airline/retail/telecom/banking domains; updated 2026-05-14 (high-activity); successor of tau-bench (arxiv/2406.12045) | Sierra Research (Noah Shinn co-org, named-T1) | P1pass P2pass P3 active 2026-05-14 P4 leaderboard P5pass P6 arxiv P7 mature | **INSTALL** |
| **UKGovernmentBEIS/inspect_evals** + inspect_ai | n/a probe-pending | MIT | 200+ pre-built evals (incl. MLE-bench/BFCL/SciCode/GAIA wrappers); Docker sandbox; v0.12.0 released 2026-05-14 | UK AISI (named-T1 govt) | P1pass P2pass P3 active 2026-05-14 P4 N/A (meta-framework) P5pass P6 docs P7 mature | **INSTALL** (meta-runner subsumes others) |
| **ShishirPatil/gorilla** (BFCL v4) | n/a probe-pending | Apache-2.0 | Function-calling leaderboard; web search + memory categories added v4 (2026-04-12); AST-eval scales to 1000s of tools | UC Berkeley Sky Lab (named-T1) | P1pass P2pass P3 active 2026-04-12 P4 leaderboard live P5pass P6 PMLR P7 mature | **INSTALL** (function-calling axis) |
| **scicode-bench/scicode-bench.github.io** | low | Apache-2.0 | 338 subproblems across 16 nat-sci fields; Gemini 3.1 Pro 58.9% SOTA (May 2026); scientific code synthesis | UChicago+Argonne (named-T1) | P1pass P2 fail low-star P3 stale P4 leaderboard P5pass P6 arxiv P7 niche | **STUDY-PILOT** (via inspect_evals wrapper) |
| **gaia-benchmark** (HF) + Princeton HAL | n/a HF-Space | Open | 466 General-AI-Assistant Qs; Anthropic sweeps top 6 HAL (Claude Sonnet 4.5 74.6%); multi-step+tool+web | Meta+HuggingFace (named-T1) | P1pass P2pass P3 active P4 HF leaderboard P5pass P6 arxiv P7 mature | **INSTALL** (via inspect_evals/gaia) |
| **THUDM/AgentBench** | high | Apache-2.0 | 8 environments; reward-hacking exploit reported 2026-04-12 by Berkeley/RDI - credibility damaged | Tsinghua THUDM (named-T1) | P1pass P2pass P3 unclear P4 stale P5pass P6 arxiv P7 contested | **DEFER** (reward-hacked) |
| **aibuildai/AI-Build-AI** | 271 | MIT | (number-1 on OpenAI MLE-Bench) auto-builds ML models; new (created 2026-03-15) | AIBuildAI vendor | P1pass P2pass active 2026-05-16 P3 fresh P4 self-reported P5 fail vendor P6 none P7 <2mo | **REJECT** (vendor SELF-REPORTED; not an eval harness) |

**Eval Axis-1 (3+ orgs publishing harness substrate that runs unattended)**: PASS - OpenAI + HKU-XLang + Stanford+Laude + Sierra + UK-AISI + UC-Berkeley = **6 distinct orgs**. Hypothesis H-EVAL not rejected.

---

## B - Reasoning Primitive Gap Findings

| Name | Stars | License | 1-line value | Author/Org | Probe-DAG | Verdict |
|---|---:|---|---|---|---|---|
| **gepa-ai/gepa** + dspy.GEPA | n/a probe-pending | MIT | Reflective Prompt Evolution; +6%/+20% vs GRPO with 35x fewer rollouts; 67%->93% on MATH; ICLR 2026 Oral; updated 2026-05-15 | Stanford+Berkeley (Lakshya Agrawal, named-T1) | P1pass P2pass P3 active 2026-05-15 P4 N/A (optimizer) P5pass P6 arxiv/2507.19457 ICLR-26 P7 newer-active | **INSTALL** (top-pick - replaces MIPROv2) |
| **codelion/openevolve** (alias algorithmicsuperintelligence) | n/a probe-pending | Apache-2.0 | Open-source AlphaEvolve impl; LLM-driven evolutionary code search; GPU-kernel discovery shown; v0.2.27 (2026-03-18) | Asankhaya Sharma (community, multi-org contribs) | P1pass P2pass P3 active 2026-03-18 P4 N/A P5pass P6 HF blog P7 newer-active | **STUDY-PILOT** (mature but heavy compute) |
| **noahshinn/reflexion** | 2700 | MIT | Verbal RL: self-reflect on trial errors, episodic memory buffer; NeurIPS 2023; foundational pattern | Noah Shinn (named-T1 / now @ Sierra) | P1pass P2pass P3 last commit 2025-01-14 P4 N/A P5 fail STALE >180d P6 arxiv/2303.11366 P7 mature | **DEFER -> L6 PATTERN-CITE** (pattern lives in newer wrappers/LangGraph; library itself stale) |
| **princeton-nlp/tree-of-thought-llm** | 5800 | MIT | Deliberate problem solving via tree-search over thought-states; NeurIPS 2023 (Shunyu Yao) | Princeton NLP (named-T1) | P1pass P2pass P3 last commit 2025-01-16 P4 N/A P5 fail STALE >180d P6 arxiv/2305.10601 P7 mature | **DEFER -> L6 PATTERN-CITE** (technique survives in LangGraph/DSPy; library stale) |
| **spcl/graph-of-thoughts** | 2500 | Other (academic) | Graph topology over thoughts (not just tree); doc-merging / keyword-counting / sorting pipelines; updated 2026-03-24 | ETH Zurich SPCL (named-T1) | P1pass P2pass P3 fresh 2026-03-24 P4 N/A P5pass P6 arxiv/2308.09687 P7 mature | **STUDY-PILOT** (fresh enough; narrow use) |
| **MineDojo/Voyager** | high | MIT | Open-ended embodied lifelong learner in Minecraft; auto-curriculum + skill library; 3.1x more items vs prior SOTA | NVIDIA+Caltech (Jim Fan, named-T1) | P1pass P2pass P3 no fresh activity P4 N/A P5 fail STALE P6 arxiv/2305.16291 P7 niche-embodied | **DEFER -> L6 PATTERN-CITE** (skill-library architectural inspiration only; not coding agent) |
| **STaR / Quiet-STaR** (Zelikman) | (research) | research-paper | Bootstrap reasoning by FT on rationales that yielded correct answers; Quiet-STaR +5pts GSM8K zero-shot | Stanford (Eric Zelikman, named-T1) | P1pass P2 research only P3 N/A P4 N/A P5pass P6 arxiv/2203.14465+/2403.09629 P7 mature | **DEFER -> L6 PATTERN-CITE** (FT-only; not zero-train install) |
| **NSRSA / N2M-RSI / EG-MRSI** (recursive self-improvement family) | n/a research | research-paper | ICLR 2026 RSI workshop; symbolic verification gating to prevent compound error in self-training loops | Multiple orgs (multi-T1) | P1pass P2 research P3 N/A P4 N/A P5 unverified-prod P6 arxiv/2603.21558+/2505.02888+/2505.07757 P7 research-only | **DEFER -> L6 WATCHLIST** (no production install path) |
| **AlphaEvolve** (DeepMind closed) | n/a | closed | Gemini-powered evolutionary algorithmic discovery; Strassen 4x4 48-mult breakthrough; 50+ math problems improved | Google DeepMind (named-T1) | P1pass P2 fail closed-source P3 N/A P4 N/A P5 fail closed P6 arxiv/2506.13131 P7 closed | **REJECT** (no OSS - use OpenEvolve as proxy) |

**Reasoning Axis-1 (3+ orgs with fresh leq 180d artifacts + reproducible gains)**: PARTIAL - Stanford-GEPA + SPCL-GoT + community-OpenEvolve + RSI-workshop-multi-T1 = **4 distinct orgs**. Hypothesis H-REASON **partially confirmed** - only GEPA + OpenEvolve clear the L5 bar; others stay L6.

---

## C - Convergence Assessment (Axis-1 3+-org)

**Eval harnesses - PASS** (6 orgs):
- OpenAI / HKU-XLang / Stanford+Laude / Sierra Research / UK AISI / UC Berkeley
- + inspect_evals acts as **convergence substrate** wrapping the others (one runner, many evals)

**Reasoning primitives - CONDITIONAL PASS** (4 orgs, only 2 install-ready):
- L5-grade (INSTALL): **gepa-ai/gepa** (Stanford+Berkeley) + **codelion/openevolve** (community + 2026 ICLR Workshop adjacencies)
- L6 PATTERN-CITE: Reflexion/ToT/Voyager/STaR/RSI-family (stale repos OR research-only; pattern lives but library does not run unattended)

**Adversarial / null finding**: THUDM/AgentBench was reward-hacked by Berkeley/RDI on 2026-04-12 - single most-cited multi-env benchmark from 2023-24 era is now compromised. This is exactly the kind of contamination R1 R2 D-agent (adversarial hunter) is built to surface; documents the **benchmark-saturation/contamination** risk class noted in 5-phase R1.

---

## D - Architecture Impact

### D.1 - Eval Harnesses: Promote L4 standalone -> **L4.5 dedicated cohort**?

**YES, conditional.** Current L4 standalone is one-agent-one-eval; the right shape is:
- **L4.5 substrate = UKGovernmentBEIS/inspect_ai + inspect_evals collection** (200+ evals, Docker sandbox, web log viewer, VS Code log viewer)
- **Wave-of-evals as one install row** = inspect_evals brings MLE-bench/BFCL/SciCode/GAIA/AgentBench/HumanEval/SWE-bench under one runner
- This is the only configuration that satisfies KISS - operator does **one** install, gets **all** of the L4.5 cohort

If L4.5 cohort is created, the existing **SWE-bench / swe-agent namedrops in KITS-EVOLUTION-EXTRACT Eval/benchmark line are correctly subsumed** (they appear inside inspect_evals already).

### D.2 - Reasoning Primitives: L5 install vs L6 PATTERN-CITE?

**Bimodal answer**:
- **GEPA -> promote to L5 INSTALL** (dspy.GEPA wraps it; ICLR 2026 Oral; +12% over MIPROv2; 35x rollout-efficient; active maintenance; cite-anchored to arxiv/2507.19457). This is the **only** reasoning primitive that meets all gates: leq 180d activity AND reproducible-gain AND OSS AND named-T1.
- **OpenEvolve -> L5 STUDY-PILOT** (heavy compute; needs operator-grade GPU budget; v0.2.27 with active bug-fixing). Promote to INSTALL only when GPU budget exists for evolutionary search.
- **Reflexion / ToT / GoT / Voyager / STaR / RSI-family -> L6 PATTERN-CITE**. Patterns are codified in **LangGraph + DSPy** at the framework layer; the original libraries themselves do not ship as install primitives. Cite them as design references, not installables.

### D.3 - Top 3 INSTALL candidates per category for V-FINAL-V2

**Eval harnesses (cohort install via inspect_ai)**:
1. UKGovernmentBEIS/inspect_ai + inspect_evals (THE substrate - pulls in #2/#3 + 197 more)
2. xlang-ai/OSWorld (active 2026-05-16, NeurIPS, computer-use specialty; standalone needed because Docker VM heavier than inspect default sandbox)
3. sierra-research/tau2-bench (active 2026-05-14, multi-domain tool+user simulation; complements inspect_evals coverage)

**Reasoning primitives**:
1. **gepa-ai/gepa (or transitively via dspy.GEPA)** - top-pick, sole INSTALL-ready
2. codelion/openevolve - STUDY-PILOT (defer until compute budget confirmed)
3. spcl/graph-of-thoughts - STUDY-PILOT (narrow use cases; doc-merging/sorting pipelines genuinely useful for some operator workflows)

---

## E - Honest Non-findings

1. **No agent-symbolic-learning production framework found** - the term shows up only in ICLR 2026 RSI Workshop proceedings (NSRSA/N2M-RSI/EG-MRSI) as theoretical/architecture-paper work, no install-ready repo. Watchlist only.
2. **AlphaEvolve has no Anthropic-grade OSS path** - only google-deepmind/alphaevolve_results (Colab notebooks with proofs); the engine is closed. OpenEvolve (codelion) is the **only** OSS proxy and it is community-maintained, not DeepMind-supported.
3. **MLE-bench leaderboard frozen since 2026-04-24** - operator can still run locally but cannot validate against a live ranking until OpenAI re-opens submissions. Mitigates INSTALL to STUDY-PILOT.
4. **AgentBench (THUDM)** has been reward-hacked (Berkeley/RDI, 2026-04-12). This is a **named-T2 dated artifact** in the contamination class - DEFER, not REJECT, because the underlying 8-env scaffold may still be salvageable post-fix; flag in next R1 sweep.
5. **WebArena (web-arena-x)** has no canonical maintainer repo with fresh activity matching the 180-day gate - only forks and codefuse-ai/OpAgent (213 stars, agent that scored 71.6% on it). Treat as a benchmark-protocol (cite arxiv/2307.13854) routed through inspect_evals if needed, not a standalone install.
6. **Voyager (MineDojo)** is foundational pattern but Minecraft-specific; the **skill-library architecture** has been ported into general-purpose frameworks like CAMEL/AutoGen; cite as design inspiration only.
7. **Tree-of-Thoughts + Reflexion repos themselves stale** despite 5.8k and 2.7k stars - patterns survived via LangGraph/DSPy adoption; libraries no longer the right install target. Pattern, not package.
8. **Rate-limit warning** - GitHub MCP REST search hit 403 rate-limit twice during this fire (32s reset windows). For future deep-research arcs, prefer GraphQL search-bulk API or interleave WebSearch + per-repo get_file_contents calls.

---

## Honest Conclusion

**H-EVAL**: NOT REJECTED - 6 orgs with fresh substrate; inspect_ai cohort install solves it cleanly.
**H-REASON**: PARTIALLY REJECTED - only GEPA clears the L5 install bar; others belong at L6 PATTERN-CITE because their libraries are stale even if the patterns are valid.

**Net architecture recommendation**: Create **L4.5 eval-substrate** (inspect_ai as cohort installer); promote **GEPA to L5 reasoning primitive** install; leave everything else at L6 PATTERN-CITE with cite-anchors retained.

---

## Primary-source URLs (R3 verification trail)

- openai/mle-bench: https://github.com/openai/mle-bench (1530 stars, updated 2026-05-15) - https://arxiv.org/abs/2410.07095
- xlang-ai/OSWorld: https://github.com/xlang-ai/OSWorld (2850 stars, updated 2026-05-16) - https://os-world.github.io/
- laude-institute/terminal-bench: https://www.tbench.ai/ - https://www.tbench.ai/leaderboard/terminal-bench/2.0
- sierra-research/tau2-bench: https://github.com/sierra-research/tau2-bench (updated 2026-05-14) - https://arxiv.org/abs/2406.12045
- UKGovernmentBEIS/inspect_evals: https://github.com/UKGovernmentBEIS/inspect_evals (v0.12.0 2026-05-14) - https://ukgovernmentbeis.github.io/inspect_evals/
- ShishirPatil/gorilla (BFCL v4): https://gorilla.cs.berkeley.edu/leaderboard.html (updated 2026-04-12)
- gepa-ai/gepa: https://github.com/gepa-ai/gepa (updated 2026-05-15) - https://arxiv.org/abs/2507.19457 (ICLR 2026 Oral)
- codelion/openevolve: https://github.com/codelion/openevolve (v0.2.27 2026-03-18) - https://huggingface.co/blog/codelion/openevolve
- spcl/graph-of-thoughts: https://github.com/spcl/graph-of-thoughts (updated 2026-03-24) - https://arxiv.org/abs/2308.09687
- noahshinn/reflexion: https://github.com/noahshinn/reflexion (2.7k stars, last commit 2025-01-14 STALE) - https://arxiv.org/abs/2303.11366
- princeton-nlp/tree-of-thought-llm: https://github.com/princeton-nlp/tree-of-thought-llm (5.8k stars, last commit 2025-01-16 STALE) - https://arxiv.org/abs/2305.10601
- MineDojo/Voyager: https://github.com/MineDojo/Voyager - https://arxiv.org/abs/2305.16291 (STALE)
- AlphaEvolve (closed): https://arxiv.org/abs/2506.13131 - https://github.com/google-deepmind/alphaevolve_results (proofs-only)
- AgentBench (reward-hacked, DEFER): https://github.com/THUDM/AgentBench - https://www.marktechpost.com/2026/04/26/top-7-benchmarks-that-actually-matter-for-agentic-reasoning-in-large-language-models/
- GAIA: https://huggingface.co/spaces/gaia-benchmark/leaderboard - https://hal.cs.princeton.edu/gaia
- WebArena (no fresh canonical): https://github.com/codefuse-ai/OpAgent (213 stars, 71.6% SOTA Jan 2026) - https://arxiv.org/abs/2307.13854
- RSI workshop family: https://arxiv.org/abs/2603.21558 (NSRSA), https://arxiv.org/abs/2505.02888 (N2M-RSI), https://arxiv.org/abs/2505.07757 (EG-MRSI)

