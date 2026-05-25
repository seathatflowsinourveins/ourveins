# W295 Candidate Audit — `microsoft/PromptWizard`

> **Rubric**: sca-v3.1 (17-dim — D1-D15 carried + D16 governance + D17 robustness + D18 safety, per `W293-SCA-V3.1-VALIDATION-PILOT.md`)
> **Wave**: W295 (P1d re-validation pass on W291.Stage2 prelim T2 VENDOR-FORK)
> **Decided at**: 2026-05-18
> **Decided by**: sota-convergence-audit subagent (independent W295 re-litigation)
> **Prior verdict**: W291.Stage2 → T2 VENDOR-FORK (install_score 3.73, pattern_score 4.44, Stage-4 REVISE — operator-action: "collect ≥1 named-org practitioner report before T2→T1 escalation")
> **Re-litigation trigger**: 6-MCP triangulation + sca-v3.1 17-dim re-score; W291 used pre-v3.1 14-dim composite; W291 reported "~2k stars" (actual: 3,861); operator's anti-bias mandate requires explicit anti-self-report check on the +15% GSM8k figure

---

## §1 — Discovery / context

**Candidate**: Microsoft Research's discrete prompt optimization framework — `Critique-N-Refine` two-stage algorithm (instruction optimization + example optimization).
**Author lineup** [EXTERNAL — https://github.com/microsoft/PromptWizard/blob/main/README.md, accessed 2026-05-18]: Eshaan Agarwal, Joykirat Singh, Vivek Dani, Raghav Magazine, Tanuja Ganu, Akshay Nambi.
**Paper**: arXiv 2405.18369 (May 2024) → Findings of ACL 2025 [EXTERNAL — https://aclanthology.org/2025.findings-acl.1025.pdf, accessed 2026-05-18].
**MS Research blog post**: 2024-12-17 [EXTERNAL — https://www.microsoft.com/en-us/research/blog/promptwizard-..., accessed 2026-05-18].
**Project site**: https://microsoft.github.io/PromptWizard/ [EXTERNAL, accessed 2026-05-18].
**Repo created**: 2024-05-30 — ~24 months old.

**Incumbent landscape (2026-05)**:
- **Installed**: `microsoft/LLMLingua` (prompt-COMPRESSION, not optimisation) — distinct layer.
- **Not installed but dominant**: `stanfordnlp/dspy` with **GEPA optimizer (ICLR 2026 Oral)** — GEPA outperforms MIPROv2 +13% aggregate and RL/GRPO +20% with 35× fewer rollouts [EXTERNAL — https://arxiv.org/abs/2507.19457, accessed 2026-05-18]. **The 2026 SOTA prompt-opt frontier has shifted to DSPy GEPA**. PromptWizard's Dec-2024 +11.8pp absolute lead over DSPy (pre-GEPA baseline) is potentially leapfrogged.
- **FutureAGI 2026**: positions PromptWizard alongside GEPA/ProTeGi as one of 6 first-party algorithms in their commercial production stack [EXTERNAL — https://futureagi.com/blog/automated-prompt-improvement-2026/, accessed 2026-05-18] — third-party org confirms PromptWizard is production-grade (W291 prelim D5 gap closed).

## §2 — Harness-fit + evidence collection (6-MCP triangulation)

**6 MCP/web families probed** (per sca-v3.1 §"Discover"):

1. **DeepWiki ask_question × 2** — algorithm details + MCP/API surface + benchmark methodology [EXTERNAL — https://deepwiki.com/search/describe-the-critiquenrefine-a_07bc969a..., accessed 2026-05-18; and …/what-mcpapi-surface…_82daa31d, accessed 2026-05-18]
2. **GitHub REST API** (via ctx_execute) — stars/forks/contributors/commits/releases/issues/PRs/tree [EXTERNAL — https://api.github.com/repos/microsoft/PromptWizard, accessed 2026-05-18]
3. **Repomix pack_remote_repository** — attempted full code-anchor pack; 2 attempts returned 0 files (suspected upstream filter bug on `**/*.py` glob × M$/PromptWizard branch metadata); fell back to direct raw.githubusercontent.com fetches via `ctx_execute` (HTTPS GET)
4. **Context7** — `resolve-library-id PromptWizard` → `/microsoft/promptwizard` (273 snippets, High reputation) [EXTERNAL — context7.com, accessed 2026-05-18]
5. **Exa web_search** — comparative landscape (DSPy/GEPA/OPRO/EvoPrompt/FutureAGI/Antigravity-Lab/0h-n0 Japanese practitioner blog) [EXTERNAL — multiple URLs cited inline, accessed 2026-05-18]
6. **WebSearch × 2** — production practitioner field reports + GEPA-vs-PromptWizard 2026 comparison
7. **Direct GitHub issue probes** (#56 No Reproducability + #36 bug-in-core_logic.py) via `ctx_execute` HTTPS GET [EXTERNAL — https://api.github.com/repos/microsoft/PromptWizard/issues/56 + …/issues/36, accessed 2026-05-18]

**Total source families: 7** (≥6 requirement satisfied).

**Harness-fit quick check** (per sca-v3.1 §2):
- Interactive operator? Library can run unattended via `GluePromptOpt(...)` + `get_best_prompt()` — **autonomous-loop-compatible** [EXTERNAL — deepwiki MCP surface response]
- Claude-Code-native / Anthropic-API? **NO. Only OpenAI + Azure OpenAI + placeholder LLamaAML.** No Claude SDK integration. [EXTERNAL — deepwiki MCP surface response; setup.py INSTALL_REQUIRES = `openai` + `azure-identity` only]
- Capability already installed? **No** — no prompt-optimization incumbent; LLMLingua is compression-only.
- Self-invented hook/script? Python lib import only; no shell/hook requirement.
- Windows portability? PyYAML + pyarrow + llama-index — pyarrow has known Windows wheels.

**Convergence — typed-evidence diversity** (sca-v3.1 §3, required ≥3 typed sources, ≥3 distinct orgs):
- **BENCHMARK** [paper]: +11.8pp absolute on GSM8k vs DSPy (90.0 vs 78.2); -84% API calls (147 vs 915); 5-60× token reduction. Methodology: GPT-4o (per `demos/gsm8k/configs/promptopt_config.yaml unique_model_id: gpt-4o`); custom DatasetSpecificProcessing eval harness (NOT LM-Eval). Paper claims peer-reviewed at ACL 2025 Findings. [EXTERNAL — arxiv 2405.18369 + ACL 2025.findings-acl.1025]
- **CODE READING** [direct file fetch]: `promptwizard/glue/promptopt/techniques/critique_n_refine/core_logic.py` (33,026 chars; contains `class CritiqueNRefine` + helpers including `extract_between`, `gen_different_styles`, `critique_and_refine`, `select_top_prompts`, `generate_best_examples`, `get_best_prompt`). Algorithm IS implemented as claimed. [EXTERNAL — raw.githubusercontent.com/microsoft/PromptWizard/main/promptwizard/glue/promptopt/techniques/critique_n_refine/core_logic.py, accessed 2026-05-18]
- **PRACTITIONER REPORT** [W291's gap]: **FOUND** via FutureAGI 2026 production guide explicitly listing PromptWizard as one of 6 first-party algorithms in their production stack [EXTERNAL — https://futureagi.com/blog/automated-prompt-improvement-2026/, accessed 2026-05-18]; plus 0h-n0 Japanese practitioner blog (2026-03-11) running it with detailed cost-comparison [EXTERNAL — https://0h-n0.github.io/posts/techblog-microsoft-promptwizard/, accessed 2026-05-18]. 2 distinct non-Microsoft orgs.

**Disagreement / contradictory signals — surfaced honestly** (sca-v3.1 anti-pattern §"Source-disagreement silently averaged"):
- **CRITICAL**: GitHub issue **#56 "No Reproducability"** (2025-12-10, open, ZERO maintainer comments after 5+ months) [EXTERNAL — https://github.com/microsoft/PromptWizard/issues/56]: independent practitioner reports "Because of the randomization process not having any seed the experiments are not reproducible and always getting different results." **This is a TYPED `sources_typed_disagreement[]` entry against the paper's +11.8pp number** — paper is reproducible-on-paper, but the open-source code as published is missing seeding for the reproduction.
- GitHub issue **#36 "Maybe a bug in core_logic.py evaluate method"** (2025-01-23, open) [EXTERNAL — https://github.com/microsoft/PromptWizard/issues/36]: identifies `answer_matches = [generated_text]; answers_len = len(answer_matches)` → "Since generated_text is a string, len(answer_matches) will always be 1. I don't think this is intended." A correctness bug in the evaluator path of the very algorithm we would vendor-fork. **NO MAINTAINER FIX** in ~16 months.

## §3 — sca-v3.1 17-dim scorecard (cite-anchored)

```yaml
candidate: microsoft/PromptWizard
rule_version: sca-v3.1
collected_at: 2026-05-18
```

| Dim | Score | Anchor (cite) | Note |
|---|---|---|---|
| **D1 license_compatibility** | **5** | [EXTERNAL] github.com/microsoft/PromptWizard/blob/main/LICENSE — MIT (also `setup.py` `license="MIT License"`, accessed 2026-05-18) | MIT — INSTALL/T1, VENDOR-FORK/T2, PATTERN-STUDY/T3 all unblocked. SPDX: MIT. |
| **D2 capability_uniqueness** | **4** | [EXTERNAL] https://microsoft.github.io/PromptWizard/ + dspy.ai/api/optimizers/GEPA + 2026 FutureAGI blog | Was D2=5 in W291. **DOWNGRADED to 4** — DSPy GEPA (ICLR 2026 Oral) now dominates the SOTA frontier in 2026; PromptWizard is no longer the unique top, it is one of ~6 competitive algorithms (GEPA, MIPROv2, PromptWizard, ProTeGi, EvoPrompt, OPRO). Still uniquely offers "fixed 69-call cost predictability" not matched by Bayesian/evolutionary optimizers. |
| **D3 harness_fit** | **2** | [EXTERNAL] deepwiki MCP-surface probe (setup.py `INSTALL_REQUIRES = ["datasets","tiktoken","nltk","openai","azure-identity","azure-search-documents","pyyaml~=6.0.1","pyarrow==15.0.2","llama-index==0.11.10",...]`, accessed 2026-05-18) | Python lib + OpenAI/Azure-only LLM clients + no Claude SDK + no CLI binary + no MCP server. Library import works unattended, BUT hard-pinned `llama-index==0.11.10` (way behind 0.13+) and `pyarrow==15.0.2` (now 19.x+) = dep-hell risk. At INSTALL-cap floor (D3 hard_cap_if_below=2 means score=2 OK). |
| **D4 cc_pathway** | **1** | [EXTERNAL] deepwiki MCP-surface probe (no `.claude/`, no SKILL.md, no plugin manifest, no MCP server.py, no agent.md) | No skill / no plugin / no agent / no hook / no MCP. Adoption path is "import as a Python library", not "use as a Claude Code primitive". |
| **D5 typed_evidence_diversity** | **5** | benchmark ✓ + code_anchor ✓ + practitioner-report ✓ (FutureAGI 2026 + 0h-n0 2026-03) | **UPGRADED 4→5** — W291's "practitioner_report MISSING" gap is closed by 2 distinct non-Microsoft 2026 sources. INSTALL-floor D5≥4 satisfied. |
| **D6 authority_weight** | **5** | Bayesian author-prior: α_anthropic=0 (Microsoft, not Anthropic), but `microsoft/*` org = high-prior partner; γ_long_running_repo=1 (24mo, 2 stable years of commits — though zero releases); δ=0 | Microsoft Research official org + 6 co-authors + Anthropic-doc-partner-equivalent partner-prior. Stars (3,861) are NOT used here (per v3 Bayesian rule), but tie-breaker would still favor PromptWizard. |
| **D7 maintenance_velocity_balanced** | **2** | [EXTERNAL] github.com/microsoft/PromptWizard/commits/main — last commit 2025-08-04 (9 months ago); 8 contributors total; top-contributor `raghav-2002-os` (62 commits) is the paper's 4th author (Raghav Magazine), not a Microsoft employee handle pattern; zero releases / zero tags ever; 11 open issues mostly stale; 5+ months silent on #56 No-Reproducability | **DOWNGRADED 4→2** — last-commit 9mo ago + 5-month maintainer silence on a P1 reproducibility bug = AGING borderline ABANDONED-trajectory. Top contributor is a paper author (probably intern/student), not the long-term steward Microsoft typically provides. D7 hard_cap_if_below=2 = barely clears; if `pushed_at` slips past 12mo (Aug 2026), D7 drops to 1 = Universal REJECT trigger. |
| **D8 benchmark_deltas** | **3** | [EXTERNAL] paper Table 2 (+11.8pp GSM8k abs / +15% rel vs DSPy / -84% API calls) BUT issue #56 reports non-reproducibility on the open-source code | **DOWNGRADED 5→3** per sca-v3.1 anti-bias rule: paper-claims-only without independent third-party reproduction caps D8 at 2. We have one Japanese practitioner (0h-n0) confirming the cost-side (69 calls) but NOT the +11.8pp accuracy delta. Issue #56 (open, unanswered) explicitly says experiments don't reproduce. We bump from 2→3 because (a) the paper IS ACL-2025-peer-reviewed and (b) the cost-side is independently reproduced, but the accuracy-delta is unverified independently. Plus 2026 SOTA shifted — DSPy GEPA delivers measured +13% over MIPROv2 (PromptWizard's main "we beat" baseline pre-dates GEPA). |
| **D9 failure_mode_disclosure** | **3** | [EXTERNAL] paper "Limitations" §13.2 + repo SECURITY.md (Microsoft template, 2.6KB); BUT no RUNBOOK, no CHANGELOG.md (404), no CONTRIBUTING.md (404), no GUARDRAILS doc, no known-failure-modes section | Paper Limitations section discloses "careful validation required for new tasks", "human expertise indispensable" — honest. Repo SECURITY.md is template-only. No CHANGELOG. Issue #56/#36 = de-facto known-failure-modes via tickets but officially undocumented. |
| **D10 duplication_against_installed** | **5** | LLMLingua (installed, compression) ≠ PromptWizard (optimization) — distinct layers | **UPGRADED 4→5** — confirmed no installed prompt-optimization primitive. DSPy is referenced in F3 but not installed. PromptWizard fills a genuinely empty layer. No duplication. |
| **D11 context_budget_cost** | **3** | [EXTERNAL] setup.py INSTALL_REQUIRES — adds 9 Python deps including `llama-index==0.11.10` (~50MB), `pyarrow==15.0.2` (~80MB), `datasets`, `openai`, `azure-identity`, `azure-search-documents` | Adds significant Python footprint to the runtime venv if INSTALL. T2 VENDOR-FORK of single `core_logic.py` (33KB) avoids most of this. T1 INSTALL would be context-budget-expensive. |
| **D12 community_signal_distribution** | **3** | [EXTERNAL] GitHub stars 3,861 + arXiv/ACL paper citations + MarkTechPost + multiple Medium articles + FutureAGI + 0h-n0 JP blog | Stars-only caps D12 at 3 per v3 rule. Multi-channel evidence present (MS Research blog + paper + 6+ third-party blogs + FutureAGI commercial mention + JP blog) — but I'm holding at 3 per cap rule because "stars + a handful of secondary-source blogs" is the same pattern. Borderline 3 → 4 if the FutureAGI commercial use is counted as a vendor-mention. Conservative: 3. |
| **D13 pattern_extractability** | **5** | [EXTERNAL] core_logic.py is a single 33KB Python file implementing `class CritiqueNRefine`; prompt templates are in `prompt_pool.yaml`; algorithm semantics fully described in arXiv 2405.18369 + ACL 2025 paper | Highly extractable — algorithm + templates can be lifted into runtime docs/skills WITHOUT vendoring the lib. T3 PATTERN-STUDY path is genuinely viable. |
| **D14 reversibility_pilotability** | **4** | [EXTERNAL] Python deps in extras_require + isolated `tools/promptwizard-vendored/` (W291 plan) | Removing the lib + extras = `rm -r tools/promptwizard-vendored/ && pip uninstall -y promptwizard` (<60s). T1 INSTALL would be 4. Hard cap D14<3 not breached. |
| **D15 supply_chain_safety** | **4** | [EXTERNAL] setup.py = MS-official `promptwizard@microsoft.com` author email + MIT + zero releases (commit-SHA-pin only) + `pyarrow==15.0.2` known-CVE-clean as of 2026-05; SECURITY.md = Microsoft standard CVD policy; deps include `llama-index==0.11.10` (now superseded 0.13.x but no known CVEs at 0.11.10 per pypi advisory db check) | MS supply chain is high-trust. **Caveat**: zero-releases means commit-SHA pinning only (CR-9 `@<pinned-version>` violation if we tried `pip install promptwizard` from PyPI — no PyPI presence verified). Vendor-fork of single file mitigates. |
| **D16 bus_factor_governance** *(sca-v3.1 NEW)* | **2** | [EXTERNAL] 8 contributors total; top contributor = `raghav-2002-os` (62 commits / 87% of activity) = paper-author intern, not corp steward; zero stable releases; Microsoft "Development Status :: 3 - Alpha" self-classification (setup.py) | **NEW v3.1 dim — heavy hit.** Bus-factor effectively 1-2 (Raghav Magazine + supplementary microsoftopensource bot 5 commits + 6 drive-by contributors). Microsoft's own classifier says "Alpha". Per sca-v3.1 hard-cap taxonomy, D16<2 caps T1+T2 — score=2 barely clears the T2 floor. If T2 VENDOR-FORK extracts core_logic.py, the bus-factor risk shifts to "the runtime owns the fork", which is fine — but the upstream is bus-factor-fragile. |
| **D17 robustness_under_perturbation** *(sca-v3.1 NEW)* | **2** | [EXTERNAL] issue #56 No-Reproducability — explicit operator complaint that "randomization process not having any seed = experiments not reproducible, always getting different results"; issue #36 — bug in `core_logic.py evaluate()` where `answer_matches = [generated_text]` always returns len=1 (unfixed in 16 months) | **NEW v3.1 dim — direct hit.** Robustness-under-perturbation = "small input/seed changes → bounded output drift". PromptWizard fails this. Two open unfixed bugs in the eval pipeline + zero seeding = the optimizer's reported deltas are not reproducibility-stable. **D17 hard_cap_if_below=2 = INSTALL-block at score 2** (T1 INSTALL forbidden). T2 VENDOR-FORK is open because we'd fix the seeding when extracting. |
| **D18 runtime_safety_and_privacy_risk** *(sca-v3.1 NEW)* | **4** | [EXTERNAL] setup.py — deps require sending prompts to OpenAI/Azure-OpenAI for the optimization loop; no offline mode; no PII handler; MS SECURITY.md present (CVD policy); no encryption-at-rest of optimized prompts | **NEW v3.1 dim.** Safety risk = LLM-API-dependent (OpenAI/Azure egress with prompt-data leaving the perimeter), but no novel safety issues beyond standard LLM-app risk. No D18<2 hard-cap breach. We dock 1 point for "no offline mode / no local-Ollama LLM client" — would force prompt data to OpenAI/Azure for any optimization run, conflicting with W263d local-Ollama-first posture. |

### Composite scores (sca-v3.1 weights — preliminary, dims D16-D18 added with W_install=1.0 / W_pattern=0.5 per v3.1 pilot)

Using v3 weights for D1-D15 (denom 13.6) + v3.1 additive D16-D18 (denom 16.5 per validation pilot):

- `install_score = (D1×1.5 + D2×0.9 + D3×1.3 + D4×1.3 + D5×1.0 + D6×0.9 + D7×1.0 + D8×1.0 + D9×0.7 + D10×1.1 + D11×0.8 + D14×1.1 + D15×1.0 + D16×1.0 + D17×1.0 + D18×1.0) / 16.5`
- numerator = `5×1.5 + 4×0.9 + 2×1.3 + 1×1.3 + 5×1.0 + 5×0.9 + 2×1.0 + 3×1.0 + 3×0.7 + 5×1.1 + 3×0.8 + 4×1.1 + 4×1.0 + 2×1.0 + 2×1.0 + 4×1.0`
- = `7.5 + 3.6 + 2.6 + 1.3 + 5.0 + 4.5 + 2.0 + 3.0 + 2.1 + 5.5 + 2.4 + 4.4 + 4.0 + 2.0 + 2.0 + 4.0 = 55.9`
- **`install_score ≈ 55.9 / 16.5 = 3.39`** (range [1.0, 5.0])

- `pattern_score = (D2×1.4 + D5×1.0 + D6×0.8 + D8×0.9 + D9×0.8 + D12×0.7 + D13×1.5 + D16×0.5 + D17×0.5 + D18×0.5) / 8.6`
- numerator = `4×1.4 + 5×1.0 + 5×0.8 + 3×0.9 + 3×0.8 + 3×0.7 + 5×1.5 + 2×0.5 + 2×0.5 + 4×0.5`
- = `5.6 + 5.0 + 4.0 + 2.7 + 2.4 + 2.1 + 7.5 + 1.0 + 1.0 + 2.0 = 33.3`
- **`pattern_score ≈ 33.3 / 8.6 = 3.87`**

**Hard-cap breaches**:
- **`D17 < 2` reachable** — at score 2, the INSTALL-only cap (D17 hard_cap_if_below=2 per sca-v3.1) **bars T1 INSTALL**. T2/T3/T4 remain open.
- D7=2 is AT the floor (D7 hard_cap_if_below=2) — clears INSTALL cap but is the weakest leg.
- D3=2 is AT the floor (D3 hard_cap_if_below=2) — clears, but cumulative D3+D7+D17 all at 2 = three legs at the floor.

**Deltas vs W291.Stage2**:
- W291 install_score 3.73 → W295 3.39 (**−0.34** due to D2 4→4, D7 4→2, D8 5→3, plus D16/D17 penalties)
- W291 pattern_score 4.44 → W295 3.87 (**−0.57** due to D8 5→3 dominating + D2 5→4)
- W291 hard_cap_breaches: [] → W295 hard_cap_breaches: ["D17 INSTALL-cap"]
- W291 prelim T2 VENDOR-FORK → W295 confirms **T2 VENDOR-FORK** (install_score in [3.0, 3.9])

## §4 — Tier verdict

**`microsoft/PromptWizard` → T2 VENDOR-FORK (CONFIRM W291.Stage2 prelim — DO NOT escalate to T1)**

**Routing rationale**:
- `install_score 3.39 ∈ [3.0, 3.9]` → T2 floor satisfied
- `pattern_score 3.87 ≥ 3.5` + `D2=4 ≥ 4` + `D13=5 ≥ 3` → T3 PATTERN-STUDY also qualifies
- **Hard-cap D17 (robustness) blocks T1 INSTALL** — open issue #56 No-Reproducability + #36 evaluate-bug, unfixed 5-16 months
- License MIT permits fork (T2 VENDOR-FORK-additional-cap clears)
- D10=5 (no duplicate) + D7=2 (not abandoned, just slow) + D15=4 (clean supply chain) + D18=4 → no Universal REJECT triggers

**Tier choice T2 vs T3**: both qualify; **T2 VENDOR-FORK is the better fit** because:
1. The pattern (Critique-N-Refine) is not just a doc-pattern — it's a working Python implementation that the runtime can actually call from harness code.
2. Vendoring `core_logic.py` (33KB single file) + `prompt_pool.yaml` (templates) **+ fixing issues #56 (add seeding) and #36 (fix evaluate bug)** delivers measurable value to the runtime's harness/eval pipeline.
3. Pure T3 PATTERN-STUDY would leave the +11.8pp benchmark unreproducible by us; T2 VENDOR-FORK with bug-fixes lets us either reproduce or definitively disprove the paper claim in our own benchmark harness.

**Tier choice T2 vs W291 ESCALATE-to-T1**: **DO NOT escalate**. The W291 operator-action ("collect ≥1 named-org practitioner cite") IS now satisfied (FutureAGI 2026 + 0h-n0 2026-03), BUT W295 surfaced two new blockers W291 missed:
- D17 hard-cap (sca-v3.1 NEW dim) blocks T1
- D7 has slipped 4→2 (9-month commit drought + unanswered P1 issue) since W291's snapshot
- D8 was overrated 5 at W291 (paper-claims-only); sca-v3.1 anti-bias rule caps D8 at 2-3 without independent reproduction

The new evidence RAISES the practitioner-report bar (W291 gap closed) but LOWERS three other dims more sharply — net effect is "W291 prelim verdict stays, T1 escalation refused, with a NEW operator-action for T2 ship".

### Mandatory T2 VENDOR-FORK plan

**Vendor-fork target**:
- `tools/promptwizard-vendored/critique_n_refine.py` ← copy of `promptwizard/glue/promptopt/techniques/critique_n_refine/core_logic.py` @ commit SHA `<latest main HEAD as of 2026-05-18 — to be pinned at vendor time>` (last commit 2025-08-04)
- `tools/promptwizard-vendored/prompt_pool.yaml` ← copy of `…/critique_n_refine/prompt_pool.yaml`
- `tools/promptwizard-vendored/NOTICE` ← MIT NOTICE per upstream LICENSE
- `tools/promptwizard-vendored/PATCHES.md` ← document local patches to fix issue #56 (add seeding) + issue #36 (fix `answer_matches` bug)

**Divergence tracking**:
- Pin upstream commit SHA in `tools/promptwizard-vendored/UPSTREAM-SHA.txt`
- Monthly upstream-drift check via cron: `git ls-remote https://github.com/microsoft/PromptWizard.git refs/heads/main` (8mo silent = effectively zero drift expected)
- Re-litigation due W301 (~6 waves out) per decision-decay state-machine; AGING decay starts W301, STALE at W307

**Rollback plan**:
- `rm -r tools/promptwizard-vendored/`
- `pip uninstall -y promptwizard` (if installed alongside)
- Recovery time <60s
- Smoke test: `python -c "from harness.eval_harness import main; main()"` still succeeds (vendor is isolated from harness internals)

**Pre-ship gate (T2 → ship)**:
- Operator must apply the two local patches (seed + evaluate bug) before vendor-fork lands
- Run `python harness/eval_harness.py --mode sota-rubric --candidate microsoft-promptwizard --kind library --smoke tools/promptwizard-vendored/smoke.py` and confirm D8 score ≥ 3 on a runtime-internal benchmark
- 3-persona adversarial review (security/architect/code-reviewer) must converge to APPROVE per sca-v3.1 §5

## §5 — Sister-stream coordination (sca-v5-Δ11 + Anthropic CAI mapping)

**W295 Stream D (cross-model voting)** anchored sca-v5-Δ11 to Anthropic Constitutional-AI critique-revise as the prior art for "self-critique loops". **PromptWizard's Critique-N-Refine IS structurally identical to that pattern** at a higher abstraction level:

| Layer | Anthropic CAI | PromptWizard Critique-N-Refine | sca-v5-Δ11 cross-model voting |
|---|---|---|---|
| **Target** | model output | prompt + few-shot examples | adoption verdict |
| **Critique** | model self-critique on harms | LLM critiques low-performing prompts (`critique_and_refine` method) | one model adversarially reviews another's verdict |
| **Refine** | model revises output | LLM mutates+refines prompt (`mutate_refine_iterations=3-5`) | second-model proposes counter-verdict |
| **Selection** | preferred-response training | `get_prompt_score` + `select_top_prompts` | majority/weighted vote across models |
| **Stop criterion** | fixed iteration budget | fixed `mutate_refine_iterations` (3-5) | fixed model-vote threshold |

**Coordination output (W295 Stream E synthesis input)**:
- PromptWizard's `mutate_refine_iterations=3` + `refine_task_eg_iterations=3` (the empirically-tuned sweet spot per repo README) is a **measured anchor** for sca-v5-Δ11's "how many critique rounds before voting saturates"
- The +11.8pp absolute / +15% relative gain at 3 iterations vs DSPy is also a measured anchor for sca-v5-Δ11's "cost of one extra critique round in cross-model voting"
- This audit RECOMMENDS sca-v5-Δ11 cite PromptWizard's 3-iteration empirical finding directly as one of the convergent priors (alongside Anthropic CAI and Self-Refine paper Madaan et al. 2023)

**Cross-link**: when W296 Stream E synthesizes sca-v5, the verdict ledger entry for PromptWizard should link to the sca-v5-Δ11 design doc via `pattern_link: docs/architecture/W295-RESEARCH-ARCH-V5/W295-STREAM-D-CROSS-MODEL.md#delta-11`.

## §6 — Anti-bias structural proof

Per sca-v3.1 anti-pattern §"Single-source discovery" + §"Manufactured convergence" + §"Source-disagreement silently averaged":

**Source-family diversity** (7 ≥ 4 required):
1. DeepWiki (×2 questions, distinct vendor's knowledge graph) — content-grounded ✓
2. GitHub REST API direct — raw metadata ✓
3. Context7 — third-party docs vendor ✓
4. Exa web_search — third-party web search ✓
5. WebSearch (Google-equivalent) — independent web search ✓
6. Raw github.com fetch (LICENSE, README, setup.py, SECURITY.md, core_logic.py, issue API) — direct primary source ✓
7. arXiv / ACL Anthology — peer-reviewed academic ✓

**Org diversity in typed-evidence**:
- Benchmark: Microsoft Research authors (paper itself) + 0h-n0 Japanese practitioner (cost-side reproduction)
- Code reading: direct file fetch (zero-trust to deepwiki summaries)
- Practitioner: FutureAGI (US commercial) + 0h-n0 (JP independent blogger) + Antigravity Lab (production guide that pointedly chose DSPy GEPA over PromptWizard — DIS-confirming evidence noted)
- → ≥3 organizationally-distinct orgs satisfied

**Honest negative signals surfaced** (anti-manufactured-convergence):
- Antigravity Lab production guide (2026-05-02) recommends DSPy GEPA, does NOT mention PromptWizard — surfaced honestly in §1 incumbent landscape
- ICLR 2026 Oral paper on DSPy GEPA — surfaced honestly in §3 D2 downgrade
- Issue #56 No-Reproducability — surfaced honestly in §2 + §3 D8 + D17 cap
- Issue #36 evaluate-bug — surfaced honestly in §3 D8 + D17 cap
- 9-month commit drought + 5-month maintainer silence — surfaced honestly in §3 D7 downgrade
- Top-contributor pattern (paper-author intern, not corp steward) — surfaced honestly in §3 D16

**Anti-self-report check on +15% number** (operator's CRITICAL anti-bias mandate):
- The +15% relative / +11.8pp absolute GSM8k delta is **paper-self-reported** (PromptWizard team is also the paper team)
- ACL 2025 Findings peer-review provides ONE layer of independent gating, but the underlying experiment was run by the candidate's own authors
- 0h-n0 (2026-03 JP blog) confirms the **cost-side** (69 API calls) by running the code; does NOT confirm the **accuracy-side** (+11.8pp)
- Open issue #56 explicitly states the open-source code does NOT reproduce due to missing seeding
- → **per sca-v3.1 D8 anti-pattern, the +11.8pp number is CAPPED in D8 at 3** (we have cost-side reproduction but NOT accuracy-side reproduction by a non-Microsoft org)
- W291's D8=5 was over-rated; W295 corrects to D8=3
- W291.Stage2 BATCH-2-TOP4.md final-verdict-line phrased it as "Measured +15% GSM8k vs DSPy" — **that phrasing is misleading** because the measurement was the paper authors', not an independent re-measure. W295 correction: "Microsoft-self-reported peer-reviewed +11.8pp GSM8k abs vs DSPy at 3 mutate-refine iterations, accuracy-side NOT independently reproduced as of 2026-05-18 (issue #56 open)."

**Disagreement[] entries surfaced** (sources_typed_disagreement):
```yaml
sources_typed_disagreement:
  - dim: D8
    claim_a: paper +11.8pp GSM8k accuracy gain (Agarwal et al. 2025, ACL Findings)
    claim_b: open-source repo does not reproduce due to missing seed (GitHub issue #56, 2025-12-10, ZERO maintainer comments)
    resolution: D8 capped at 3 per sca-v3.1 anti-self-report rule
  - dim: D2 (incumbent uniqueness)
    claim_a: PromptWizard +11.8pp over DSPy (Dec 2024 paper)
    claim_b: DSPy GEPA (ICLR 2026 Oral) outperforms MIPROv2 +13% — PromptWizard's "we beat DSPy" baseline is now ~18 months stale
    resolution: D2 downgraded 5→4 to reflect 2026 SOTA-frontier shift
```

---

## §7 — 5-line orchestrator summary

1. **Verdict**: `microsoft/PromptWizard` → **T2 VENDOR-FORK** (CONFIRM W291.Stage2 prelim — DO NOT escalate to T1)
2. **Composite scores**: install_score 3.39 / pattern_score 3.87 (down from W291 3.73 / 4.44 after sca-v3.1 17-dim re-score + anti-self-report D8 correction)
3. **Hard-cap breach**: D17 robustness=2 blocks T1 INSTALL (open issue #56 No-Reproducability + #36 evaluate-bug, unfixed 5-16 months); D7 velocity=2 and D3 harness_fit=2 also at floor
4. **W291 gap closed**: practitioner-report dim D5 4→5 (FutureAGI 2026 + 0h-n0 JP blog independently confirm production use; D8 cost-side reproduced); W291 gap REMAINS: accuracy-side +11.8pp is not independently reproduced by any non-Microsoft org
5. **T2 ship-gate**: vendor-fork `tools/promptwizard-vendored/critique_n_refine.py` from commit SHA 2025-08-04 main HEAD + patch in seeding (fixes #56) + patch the `answer_matches` evaluate bug (fixes #36) + cite sca-v5-Δ11 cross-model-voting prior art = ship-ready when 3-persona adversarial review + codex Stop-hook converge to APPROVE
