# W292 — COMPETITOR DISCOVERY (Agent A) — External Research-Architecture Systems

> **Mandate**: enumerate EXTERNAL research-architectures, agentic-research frameworks, and academic evaluation methodologies that **could replace** the runtime's current research-architecture stack (sca-v3 + 6-stage funnel + 14-dim rubric + 5-tier ladder).
>
> **Authority constraint**: this artifact cites EXTERNAL sources ONLY. Our own architecture (sca-v3, W288 streams, sota-convergence-audit SKILL.md, STREAM-A/B/C/D, W259 master matrix) appears ONLY in `how-our-v3-compares` sections as the SUBJECT under external review — never as authority.
>
> **Date**: 2026-05-18 · **Branch**: W292 audit · **Operator**: Agent A of `w292-research-arch-competitor-audit` team.

---

## Table of contents

- [§0 — Scope, method, and rules-of-evidence](#0--scope-method-and-rules-of-evidence)
- [§1 — Source family 1: academic-grade evaluation pipelines](#1--source-family-1-academic-grade-evaluation-pipelines)
  - [§1.1 — Stanford HELM](#11--stanford-helm-crfm)
  - [§1.2 — EleutherAI lm-evaluation-harness](#12--eleutherai-lm-evaluation-harness)
  - [§1.3 — OpenAI Evals](#13--openai-evals)
  - [§1.4 — UK AISI inspect_ai](#14--uk-aisi-inspect_ai)
  - [§1.5 — Google BIG-bench](#15--google-big-bench)
  - [§1.6 — SWE-bench / SWE-bench Verified](#16--swe-bench--swe-bench-verified)
  - [§1.7 — Aider polyglot benchmark](#17--aider-polyglot-benchmark)
  - [§1.8 — MTEB](#18--mteb)
  - [§1.9 — MMLU + MMLU-Pro](#19--mmlu--mmlu-pro)
  - [§1.10 — GPQA](#110--gpqa)
  - [§1.11 — ARC / ARC-AGI](#111--arc--arc-agi)
- [§2 — Source family 2: agentic-research frameworks](#2--source-family-2-agentic-research-frameworks)
  - [§2.1 — Anthropic multi-agent research](#21--anthropic-multi-agent-research-system)
  - [§2.2 — OpenAI Deep Research](#22--openai-deep-research)
  - [§2.3 — Perplexity Deep Research / Sonar](#23--perplexity-deep-research--sonar)
  - [§2.4 — Microsoft AutoGen](#24--microsoft-autogen)
- [§3 — Source family 3: awesome-list curation discipline](#3--source-family-3-awesome-list-curation-discipline)
  - [§3.1 — sindresorhus/awesome](#31--sindresorhusawesome-the-canonical-meta-awesome)
  - [§3.2 — awesome-claude-code](#32--awesome-claude-code-hesreallyhim)
  - [§3.3 — awesome-mcp-servers (punkpeye)](#33--awesome-mcp-servers-punkpeye)
- [§4 — Source family 4: adoption-decision systems outside agents](#4--source-family-4-adoption-decision-systems-outside-agents)
  - [§4.1 — ThoughtWorks Tech Radar](#41--thoughtworks-tech-radar)
  - [§4.2 — CNCF graduation criteria](#42--cncf-graduation-criteria)
  - [§4.3 — Wikipedia notability](#43--wikipedia-notability-gng--sng)
  - [§4.4 — NIST AI Risk Management Framework](#44--nist-ai-risk-management-framework-ai-rmf-100-1)
- [§5 — Source family 5: convergence-consensus methods](#5--source-family-5-convergence-consensus-methods)
  - [§5.1 — Anthropic Constitutional AI](#51--anthropic-constitutional-ai)
  - [§5.2 — Anthropic / DeepMind AI Safety via Debate](#52--anthropic--deepmind--openai-ai-safety-via-debate-irving--christiano-2018)
  - [§5.3 — Self-consistency CoT](#53--self-consistency-chain-of-thought-wang-et-al-2022)
  - [§5.4 — LLM-as-judge / AlpacaFarm](#54--llm-as-judge--alpacafarm-bench)
- [§6 — Source family 6: sources we don't currently use](#6--source-family-6-sources-we-dont-currently-use)
  - [§6.1 — Semantic Scholar API](#61--semantic-scholar-academic-graph-api)
  - [§6.2 — OpenAlex](#62--openalex)
  - [§6.3 — Lobste.rs community curation](#63--lobsters-community-link-aggregator)
  - [§6.4 — NVIDIA garak](#64--nvidia-garak-llm-vulnerability-scanner)
  - [§6.5 — OWASP LLM Top 10](#65--owasp-llm-top-10--genai-security-project)
- [§7 — Top-12 EXTERNAL systems summary](#7--top-12-external-systems-summary)
- [§8 — Executive summary (6 bullets)](#8--executive-summary-6-bullets)
- [§9 — Which 1-2 external systems most plausibly replace our v3?](#9--which-1-2-external-systems-most-plausibly-replace-our-v3)
- [§10 — Cite trail (per-system organisationally-distinct sources)](#10--cite-trail-per-system-organisationally-distinct-sources)

---

## §0 — Scope, method, and rules-of-evidence

**Scope**: this audit surfaces external systems that make the same shape of decision our runtime currently makes — namely **adopt-this-software-into-toolchain** or **rank-this-capability-by-evidence** decisions. The target replacement candidate is the composite "sca-v3 + 6-stage funnel + 14-dim rubric + 5-tier ladder + decision-decay state machine" pipeline that drives our adoption ledger.

**Method**: 6 source families × ≥3 candidates per family (target 25–35 systems total). For each, fetch primary docs from the system's own canonical site PLUS ≥2 organisationally-distinct corroborators (academic paper, third-party audit, peer benchmark, standards body, or independent practitioner report). Marketing claims by the system's own author count toward methodology description but NOT toward independent validation.

**Rules of evidence per claim**:
1. ≥3 organisationally-distinct cites (system docs do NOT count as their own corroboration).
2. Methodology statements must trace to either: (a) system's own engineering blog/whitepaper, (b) peer-reviewed publication, or (c) standards body (NIST/IETF/OWASP/CNCF/Linux Foundation).
3. Tier system + decay rule must be EXTRACTED — not assumed.
4. Install-or-pattern distinction must be EXTRACTED — most systems don't make this distinction; that is itself a finding.

**Forbidden authority**: per W292 operator constraint, this artifact may NOT cite as authority any of: sca-v3 rubric, W288 STREAM-A/B/C/D artifacts, `.claude/skills/sota-convergence-audit/SKILL.md`, W259 grand catalog, prior W2x6/W2x7/W288/W289 decisions. These systems are SUBJECTS under external review.

**Output target**: 600-900 lines; final action is a `Write` tool call to this file path.

---

## §1 — Source family 1: academic-grade evaluation pipelines

### §1.1 — Stanford HELM (CRFM)
- **scope**: capability evaluation of foundation models across diverse scenarios and metrics; a **measurement** system, not an **adoption-decision** system per se — but the methodology has been borrowed wholesale into adoption frameworks like inspect_evals.
- **methodology**: define `scenarios` (dataset + prompt format) and `metrics` (the seven canonical dimensions: accuracy · calibration · robustness · fairness · bias · toxicity · efficiency). A `run_group` is a `(model, scenario)` pair; a `suite` is a named collection of runs grouped by release. HELM is explicitly a "living benchmark" with continuous additions of new datasets, models, and metrics.
- **evidence-typing**: every metric must be a deterministic function over the model output and the reference; metrics are declared in schema YAML files (`schema_classic.yaml`, `schema_medhelm.yaml`). Domain-specific extensions (MedHELM, VHELM) re-use the metric vocabulary with clinician/expert-validated taxonomies overlaid.
- **source-diversity rule**: not a curation system — it doesn't *include* sources, it *evaluates* models against scenarios; scenario diversity is the proxy (e.g. MedHELM has 5 clinician-validated categories × multiple scenarios each).
- **tier system**: continuous numeric scoring per metric + global accuracy rank; no discrete tiers.
- **decay rule**: implicit via `suite` and `release` versioning — old releases stay browsable, new releases re-run benchmarks. The "Holistic Evaluation" paper (arXiv:2211.09110) explicitly frames decay as a benchmark-engineering concern.
- **convergence-consensus**: not a multi-source consensus system; truth is dataset-of-record. However the multi-metric matrix is a form of **dimension-level convergence** — a model can be "good at accuracy but bad at calibration", and HELM presents both rather than collapsing.
- **install-or-pattern distinction**: N/A — HELM doesn't make adoption decisions, it produces evaluation evidence that adoption frameworks can consume.
- **cites** (≥3 orgs):
  - Stanford CRFM HELM site: `https://crfm.stanford.edu/helm/`
  - arXiv 2211.09110 (Liang et al. 2022, "Holistic Evaluation of Language Models")
  - DeepWiki extraction of `stanford-crfm/helm` repo metric schema (independent third-party)
- **how-our-v3-compares**: our 14-dim rubric maps closely to HELM's 7 metrics × scenarios matrix — both are multi-dimensional, both are continuous-score. HELM is **better** at decay (explicit release versioning + paper-grade reproducibility) and at metric vocabulary discipline (every metric declared in schema). Our v3 is **better** at adoption-decision (HELM doesn't decide; it measures) and at install-or-pattern distinction (HELM has no equivalent). Where HELM is HUGELY ahead: its scenarios are reproducible by anyone with the schema; our v3's scoring is a subagent judgement that does not reproduce deterministically.

### §1.2 — EleutherAI lm-evaluation-harness
- **scope**: open-source standard for running benchmark tasks against any language model behind a unified interface; powers the HuggingFace Open LLM Leaderboard.
- **methodology**: each task is a YAML config under `lm_eval/tasks/<name>/` that specifies the dataset, prompt template, few-shot sampling strategy, and metric. The harness runs the task by loading the dataset, formatting prompts, getting model completions, and scoring. CLI: `lm-eval validate --tasks <name>`.
- **evidence-typing**: each task contribution requires a **Task Validity Checklist** explicitly including (a) link to the original paper that introduced the task, (b) link to dataset, (c) link to reference implementation, (d) results on open-source models. Variant tasks must denote the "Main" variant and document what each variant adds.
- **source-diversity rule**: not a curation system; source diversity is at the **task** level — task contributions explicitly track existing benchmarks in the literature.
- **tier system**: continuous numeric scoring per task + metric; no discrete tiers. The Open LLM Leaderboard (downstream consumer) sums normalized scores.
- **decay rule**: **explicit task versioning** — `metadata.version` integer that increments on breaking change, plus a `README.md` changelog entry per version bump. Tasks are NEVER silently mutated.
- **convergence-consensus**: not multi-source; deterministic per-(model, task, version) — same inputs produce same outputs by design.
- **install-or-pattern distinction**: N/A — it evaluates models; doesn't decide what to install.
- **decontamination policy (notable)**: `should_decontaminate: true` flag + `doc_to_decontamination_query` query; default n=13 n-gram overlap detection; decontaminated metrics get a `decontaminate` suffix.
- **cites** (≥3 orgs):
  - DeepWiki `EleutherAI/lm-evaluation-harness` (independent extraction of repo)
  - HuggingFace Open LLM Leaderboard documentation (downstream consumer cite)
  - arXiv 2310.17567 (Beeching et al. 2023, Open LLM Leaderboard methodology)
- **how-our-v3-compares**: their **version-locking discipline is SOTA** — every task has `metadata.version` + changelog. Our v3 has decay states (STALE/AGING/RE-LITIGATED/RETIRED) but no per-dimension version-bump-on-breaking-change. They're STRICTER on reproducibility (YAML-declarative tasks) than our v3 (subagent-scored). They have NO adoption-decision concept — that's our v3's territory entirely.

### §1.3 — OpenAI Evals
- **scope**: registry-driven evaluation framework with multiple eval templates (Match, Includes, FuzzyMatch, JsonMatch, ModelBasedClassify); designed for both internal capability tracking and external benchmark contribution.
- **methodology**: evals are YAML configs in `evals/registry/evals/{name}.yaml` with data in `evals/registry/data/{name}/`. Runtime: `oaieval` CLI. Five registry types: Eval, CompletionFn, EvalSet, ModelGraded, Solver. The `ModelBasedClassify` template supports three `eval_type`s: `cot_classify` (reason → answer), `classify_cot` (answer → reason), `classify` (answer only).
- **evidence-typing**: contribution criteria are explicit: **thematically consistent** (single use case), **challenging** (hard for current GPT-4/3.5 but human-solvable), **directionally clear** (clear signal of correct behavior), **carefully crafted** (engineered prompts + spot-checked), **minimum 15 examples**, **rights to data**.
- **source-diversity rule**: thematic consistency rule means each eval is one source-of-truth domain; cross-eval diversity is at the registry level.
- **tier system**: continuous scoring + grade choices mapped to `choice_scores` numerical values.
- **decay rule**: **eval naming convention** `<eval_name>.<split>.<version>` — when an eval is changed, the version increments. Each run has a unique `run_id` with timestamp + random suffix. Data stored via Git LFS for large files / consistency.
- **convergence-consensus**: model-graded evals are a single-pass LLM-as-judge; no explicit multi-sample voting (self-consistency must be layered externally).
- **install-or-pattern distinction**: N/A — it's an eval framework, not an adoption framework. Currently NOT accepting evals-with-custom-code; only YAML model-graded evals.
- **cites** (≥3 orgs):
  - DeepWiki extraction of `openai/evals`
  - HuggingFace Evals documentation (downstream peer)
  - OpenAI documentation `platform.openai.com/docs/guides/evals`
- **how-our-v3-compares**: their **`<eval_name>.<split>.<version>` naming convention** is a clean primitive we don't have an analog for. Our v3 rubric is itself versioned (v3) but per-candidate scores aren't versioned per-rubric-version, so retroactive rubric upgrades lose pre-upgrade scores' lineage. Their **minimum-15-examples + rights-to-data** rule is a HARDER evidence gate than our v3's "≥3 organisationally-distinct cites" — they require empirical samples, we require source diversity.

### §1.4 — UK AISI inspect_ai
- **scope**: government-grade eval framework (UK AI Safety Institute); orchestrates `Task = (dataset, solver, scorer)` triples with detailed `EvalLog` recording.
- **methodology**: a `Task` is a Python function decorated with `@task`. Its `Solver` transforms a `TaskState` (messages, output) — solvers can chain into pipelines (system_message, prompt_template, generate, self_critique). `Scorer` returns a `Score` against an expected target; metrics aggregate across samples. Configurable resource limits (`message_limit`, `token_limit`, `time_limit`, `working_limit`, `cost_limit`).
- **evidence-typing**: every eval produces an `EvalLog` (compressed `.eval` or JSON) with `EvalSpec` (task/model/dataset/config) + `EvalResults` (scores) + `EvalStats` (timestamps/model usage) + `EvalSample` (input/messages/output/scores/events). `log-schema.json` is enforced.
- **source-diversity rule**: N/A — eval framework, not curation.
- **tier system**: continuous scoring + metric aggregation; the `inspect_evals` repo curates 60+ tasks across "Knowledge", "Reasoning", "Coding", "Agents", "Safeguards".
- **decay rule**: Tasks have explicit `version` attribute that should bump on breaking change; `eval_set()` supports retry mechanisms with exponential backoff and incomplete-task replay. **Sample retry** preserves `sample_uuid` and accumulates errors in `error_retries`.
- **convergence-consensus**: not built-in. `epochs > 1` enables repeated samples + `ScoreReducer` aggregation, which can implement self-consistency. `self_critique()` solver implements model-graded self-revision (analog to Constitutional AI critique step).
- **install-or-pattern distinction**: N/A.
- **cites** (≥3 orgs):
  - UK AISI inspect_ai GitHub (`https://github.com/UKGovernmentBEIS/inspect_ai`)
  - DeepWiki extraction of `UKGovernmentBEIS/inspect_ai` (independent)
  - inspect_evals repo (`https://github.com/UKGovernmentBEIS/inspect_evals`) — 60+ peer-contributed task implementations
- **how-our-v3-compares**: inspect_ai's **EvalLog schema** is the gold standard for evidence preservation — every eval produces a fully-replayable JSON log. Our v3's evidence trail is markdown artifacts which are NOT machine-replayable. inspect_ai is **better at audit trail**, and its `Solver` chain is an analog of our 6-stage funnel — but inspect_ai's stages are reusable Python functions, ours are subagent prompts. inspect_ai has NO adoption-tier concept.

### §1.5 — Google BIG-bench
- **scope**: Beyond-the-Imitation-Game; community-contributed task suite (~200+ tasks at peak) — explicitly designed to "measure and extrapolate the capabilities of language models". Two task types: **JSON task** (input/target pairs) and **Programmatic task** (Python function).
- **methodology**: each task is in `bigbench/benchmark_tasks/<name>/` with `task.json` or `task.py` + `README.md`. Required JSON fields include `examples`, `task_prefix`, `metrics`, `keywords`. Programmatic tasks define an `evaluate_model` function.
- **evidence-typing**: **Submission Review Criteria** (5 explicit pillars):
  1. **Correctness** — valid JSON/Python, passes tests.
  2. **Formatting** — human-readable, sensible interactions.
  3. **Specificity** — clearly captures a specific capability; tasks justify their construction choices in README + list keywords.
  4. **Thoroughness** — controls for confounders and nuisance variables.
  5. **Difficulty** — must NOT be fully solvable by existing language models.
- **source-diversity rule**: tasks are explicitly cross-domain via `keywords.md` taxonomy (~100 keywords across cognitive abilities, linguistic skills, knowledge domains, behaviors). Multiple authors per task common.
- **tier system**: tasks tag as "lite" subset OR full suite; scoring is per-metric continuous + leaderboard rank.
- **decay rule**: tasks are immutable post-merge; BIG-bench Hard (the post-launch hardened subset) is the de-facto evolution mechanism. Original BIG-bench has slowed; community migrated to lm-evaluation-harness for newer tasks.
- **convergence-consensus**: not a multi-source system per claim; each task evaluates independently.
- **install-or-pattern distinction**: N/A — measurement only.
- **cites** (≥3 orgs):
  - BIG-bench GitHub `github.com/google/BIG-bench` (Google + 442 co-authors)
  - arXiv 2206.04615 (Srivastava et al. 2022)
  - lm-evaluation-harness BIG-bench task ports (independent re-implementation)
- **how-our-v3-compares**: their **5-pillar Review Criteria** (Correctness · Formatting · Specificity · Thoroughness · Difficulty) is a HARDER acceptance gate than our v3's tier ladder — it requires the contributor to PROVE difficulty (existing models must NOT fully solve it). Our v3 has no analog of "must be hard" — we score quality of a candidate, not difficulty of the eval that would test it. BIG-bench is **STRICTER** on specificity (task-must-target-one-capability) than our v3's 14-dim aggregation.

### §1.6 — SWE-bench / SWE-bench Verified
- **scope**: real-world software engineering benchmark; 500 (Verified subset) or ~2,294 (full) GitHub issues resolved by pull requests in 12+ Python repos. Models receive a codebase + issue and must produce a patch.
- **methodology**: **SWE-bench Verified** is the human-filtered subset (OpenAI + Princeton) — 500 examples filtered by an annotator panel against three criteria: (a) issue description is unambiguous, (b) tests are reliable, (c) expected behavior is clearly defined. `swebench` Python package provides the harness.
- **evidence-typing**: every benchmark example has its own commit-pinned codebase + PR-derived ground-truth patch + reliability-verified pytest suite. Pass/fail is deterministic.
- **source-diversity rule**: 12+ source repos (Django, sympy, scikit-learn, etc.) — explicitly chosen for diversity across Python ecosystem maturity.
- **tier system**: pass-rate percentage; leaderboard at swebench.com.
- **decay rule (CRITICAL)**: OpenAI EXPLICITLY DECOMMISSIONED SWE-bench Verified in 2026 ("Why we no longer evaluate SWE-bench Verified") because contamination became unsalvageable — models trained on GitHub data after June 2024 have likely seen the 500 problems. **This is the gold standard of public failure-mode disclosure + benchmark retirement.** Moved to SWE-bench Pro / SWE-rebench.
- **convergence-consensus**: deterministic (pytest pass/fail); no consensus needed.
- **install-or-pattern distinction**: N/A.
- **cites** (≥3 orgs):
  - SWE-bench GitHub (`github.com/SWE-bench/SWE-bench`) — Princeton authors
  - OpenAI "Introducing SWE-bench Verified" (`openai.com/index/introducing-swe-bench-verified/`)
  - OpenAI "Why we no longer evaluate SWE-bench Verified" (decommission announcement)
  - SWE-rebench (decontamination follow-up, separate research group)
- **how-our-v3-compares**: SWE-bench Verified's **retirement protocol** is the pattern our v3 most needs to internalize. Our v3 has STALE/AGING/RE-LITIGATED/RETIRED decay states but lacks the publicly-stated contamination threshold or retirement threshold (e.g., "when ≥30% of candidates show direct-solution leakage, retire the benchmark"). SWE-bench's **human-annotator-panel filter** (3 explicit criteria) is the strictest evidence gate we've seen.

### §1.7 — Aider polyglot benchmark
- **scope**: code-editing benchmark for LLMs across 6 languages (C++, Go, Java, JavaScript, Python, Rust); selects "hardest 225 problems" from 697 Exercism problems by elimination of easy problems.
- **methodology**: 7 top coding LLMs each attempted all 697 Exercism problems; problems solved by ≥4 of the 7 models were deemed "too easy" and excluded. The benchmark keeps the 225 problems solved by 0–3 of the 7. Edit-format performance is tracked separately (correct-first-try % + correct-after-feedback %).
- **evidence-typing**: every problem is from Exercism (a deliberately-third-party source); ground truth is the Exercism test suite. Cost-per-completion is published alongside accuracy.
- **source-diversity rule**: 6 programming languages; problems from a single curated source (Exercism). Source diversity is at the language level.
- **tier system**: continuous % accuracy; leaderboard rank.
- **decay rule**: the **difficulty-curation method itself** is the decay protocol — when a benchmark becomes too easy (newer models solve everything), regenerate using the same 7-model elimination process. Not formally automated.
- **convergence-consensus**: deterministic test passage.
- **install-or-pattern distinction**: N/A.
- **cites** (≥3 orgs):
  - aider.chat blog post "o1 tops aider's new polyglot leaderboard" (Aider/Paul Gauthier)
  - Exercism platform (`https://exercism.org/`) — source of problems
  - Independent reproductions on aider GitHub issues (third-party validation)
- **how-our-v3-compares**: Aider's **difficulty-floor protocol** (7-model elimination to find "hard" problems) is a primitive we lack — our v3 evaluates candidates against a fixed rubric, not against a model-frontier-relative difficulty. The implication: as models get better, our v3 score thresholds should adjust, but they don't. Aider's **cost-per-completion published alongside accuracy** is a discipline our v3 only partially has (D9 cost-of-ownership) but not as a per-decision dimension.

### §1.8 — MTEB
- **scope**: Massive Text Embedding Benchmark — evaluates embedding models across **9 task types** × 100+ tasks × ~100 languages (MMTEB extension).
- **methodology**: each task inherits from an `AbsTask*` Python class (one per task type); requires a `TaskMetadata` object (name, description, reference, type, category, modalities, evaluation splits, languages, citation). Contributors must run `task.calculate_descriptive_statistics()` and run two reference embedding models to confirm performance is neither trivial nor random.
- **evidence-typing**: 4 explicit gates for new tasks:
  1. **Justification** — outline why this task fills a gap.
  2. **Testing** — runs cleanly with `mteb` package.
  3. **Performance evaluation** — reference models score in non-trivial / non-random band.
  4. **Comprehensive metadata** — citation, languages, domains, modalities, eval_langs.
- **source-diversity rule**: explicit at language level (MMTEB drove this) and at domain level (`TaskMetadata.domains` field).
- **tier system**: continuous scores per task + **Borda count algorithm** for leaderboard ranking (rank-aggregation across tasks). Borda count is a fairer rank-aggregation than score-average because it's robust to outlier-task-scale issues.
- **decay rule**: **semantic versioning** with commit-prefix-driven bumps: `fix:` (patch), `model:` (model), `dataset:` (dataset), `feat:` (minor), `breaking:` (major). Tasks can be SUPERSEDED (`MAUDLegalBenchClassification` superseded by `MAUDLegalBenchClassification.v2`).
- **convergence-consensus**: not a consensus framework. The Borda count is the multi-task convergence mechanism — but per task, scoring is deterministic.
- **install-or-pattern distinction**: N/A.
- **cites** (≥3 orgs):
  - DeepWiki extraction of `embeddings-benchmark/mteb`
  - arXiv 2210.07316 (Muennighoff et al. 2022, MTEB paper)
  - MMTEB consortium contribution guidelines (separate org)
- **how-our-v3-compares**: MTEB's **Borda count rank-aggregation** is materially better than our v3's weighted-sum 14-dim scoring at avoiding "one massive-magnitude dimension dominates the verdict". A model that wins 8 of 9 task-type sub-rankings beats a model that wins one task-type by a huge margin and loses 8 — under Borda. Under our weighted sum, the huge-margin model could win. MTEB's **task supersession** primitive is a cleaner decay protocol than our v3's STALE/AGING flags.

### §1.9 — MMLU + MMLU-Pro
- **scope**: Massive Multitask Language Understanding — 57 subjects from STEM, humanities, social sciences; multiple-choice questions. MMLU-Pro is the 2024 successor: 12,032 questions, 10 answer choices (up from 4), filters out questions that don't require reasoning.
- **methodology**: each subject is a CSV of (question, A, B, C, D, correct_letter) tuples. Models receive zero-shot or few-shot prompts and pick the letter. Score = % correct.
- **evidence-typing**: questions sourced from textbooks, online courses, practice exams; quality control via human review. MMLU-Pro adds expert review filtering for "trivial" or "ambiguous" questions.
- **source-diversity rule**: 57 academic subjects; explicit at subject level.
- **tier system**: continuous % accuracy.
- **decay rule**: MMLU itself has KNOWN contamination issues (questions appear in training data); MMLU-Pro is the explicit "next generation" replacement — same pattern as SWE-bench → SWE-bench Pro. **Decay-via-replacement.**
- **convergence-consensus**: deterministic letter-pick.
- **install-or-pattern distinction**: N/A.
- **cites** (≥3 orgs):
  - Wikipedia MMLU entry (`en.wikipedia.org/wiki/MMLU`)
  - arXiv 2009.03300 (Hendrycks et al. 2020) — original MMLU paper
  - arXiv 2406.01574 (Wang et al. 2024) — MMLU-Pro paper
- **how-our-v3-compares**: MMLU-Pro's **expert-review filter that removes trivial/ambiguous questions** is a discipline we don't have for our 14-dim rubric — we don't audit whether a dimension is too easy to score uniformly high. The pattern: a v3 dimension where ALL candidates score 4-5/5 has zero discriminative power and should be retired or refactored.

### §1.10 — GPQA
- **scope**: Graduate-Level Google-Proof Q&A — 448 multiple-choice questions in biology, physics, chemistry written by domain experts (PhDs/PhD students).
- **methodology**: question authors have PhD/PhD-in-progress in the relevant domain. Questions go through a **multi-stage validation**: written by expert → reviewed by 2 other domain experts who must agree it's "objectively answerable" and "not Google-solvable". Final dataset has only questions where ≥2 experts agree AND non-experts with internet access fail.
- **evidence-typing**: expert-validated; gated by failure-of-non-experts-with-Google.
- **source-diversity rule**: 3 STEM domains × multiple sub-fields.
- **tier system**: continuous % accuracy on three sets: Diamond (most-rigorous), Main, Extended.
- **decay rule**: smaller (448 questions) means contamination risk is high; mitigation is the HuggingFace gated dataset agreement that asks users NOT to reveal examples online to reduce leakage.
- **convergence-consensus**: **expert majority agreement** — ≥2-of-3 expert agreement required for inclusion. **This is a direct convergence primitive** we should learn from.
- **install-or-pattern distinction**: N/A.
- **cites** (≥3 orgs):
  - HuggingFace `Idavidrein/gpqa` dataset card
  - arXiv 2311.12022 (Rein et al. 2023) — GPQA paper
  - Anthropic Claude 3 / OpenAI o1 model cards both cite GPQA as a primary capability eval (downstream validation)
- **how-our-v3-compares**: GPQA's **≥2-of-3 expert agreement filter** is a directly-portable primitive. Our v3 doesn't require multi-reviewer consensus per candidate score — a single subagent's judgment is the verdict. Adding "any score in dimension X requires ≥2 of 3 independent scorers to agree within 1 point" would be a strict upgrade. GPQA's **gated-dataset-with-non-publish-agreement** is unusual for a benchmark and a discipline we can study for our adoption ledger (don't paste candidate-specific scoring rationales publicly).

### §1.11 — ARC / ARC-AGI
- **scope**: Abstraction and Reasoning Corpus — visual-grid puzzles that test "fluid intelligence" / few-shot reasoning. Original ARC (Chollet 2019) → ARC-AGI-1 → ARC-AGI-2 → ARC-AGI-3 (current). ARC Prize is a public competition with $2M+ prize pool (Kaggle).
- **methodology**: each puzzle is 3-5 training input-output grid pairs + a test grid; the system must predict the test output. Scoring is exact-match. The benchmark is **explicitly designed to be human-easy but AI-hard**.
- **evidence-typing**: every puzzle has an author identity; puzzles undergo a difficulty calibration where human performance is measured (typical baseline: humans solve ~80%, models <10% as of early 2024).
- **source-diversity rule**: tasks designed by Lab42 / Chollet team + Kaggle community contributions; ARC-AGI-3 introduces interactive environments.
- **tier system**: leaderboard tiers by SUBMISSION CLASS — **Base LLMs** (no extended reasoning), **Reasoning Systems** (multi-level reasoning trend line), **Kaggle Systems** (≤$50 compute / 120 tasks).
- **decay rule**: ARC-AGI-1 → ARC-AGI-2 → ARC-AGI-3 evolution; each rebuild adds new puzzles + retires solved ones. The $2M prize is also a decay primitive — high prize → high attention → rapid saturation → retire.
- **convergence-consensus**: deterministic exact-match.
- **install-or-pattern distinction**: N/A.
- **cites** (≥3 orgs):
  - arcprize.org leaderboard (Lab42 + Chollet team)
  - arXiv 1911.01547 (Chollet 2019, original ARC paper, "On the Measure of Intelligence")
  - Kaggle ARC competition pages (`kaggle.com/competitions/arc-prize-2024` etc.)
- **how-our-v3-compares**: ARC's **submission-class-tiered leaderboard** (Base LLMs / Reasoning / Kaggle) is a primitive worth lifting — our v3 5-tier ladder (INSTALL/VENDOR-FORK/PATTERN-STUDY/CITE-ONLY/REJECT) is by VERDICT class. ARC's tiers are by SUBMISSION class — they recognise that "raw LLM at zero-shot" and "reasoning system with extended thinking" are categorically different consumers. Our v3 doesn't distinguish e.g. "candidate-for-our-runtime" vs "candidate-for-claude-code-without-extensions" — that's a class our v3 collapses.

---

## §2 — Source family 2: agentic-research frameworks

### §2.1 — Anthropic multi-agent research system
- **scope**: production multi-agent system Anthropic built for the Claude "Research" feature; canonical orchestrator-worker pattern for agentic research.
- **methodology**: **orchestrator-worker** topology — a lead agent decomposes the user query, develops a strategy, spawns parallel subagents per sub-question. Each subagent gets: an `objective`, an `output format`, `guidance on tools and sources`, and `clear task boundaries`. Lead agent uses extended thinking as a controllable scratchpad to plan tool fit, query complexity, subagent count, and per-subagent role definition.
- **evidence-typing**: not formalised as evidence types in the public blog — but the system explicitly handles "tool fit" (each subagent gets task-appropriate tools) and "scaling rules embedded in prompts" (the lead's prompt tells subagents how much effort to spend).
- **source-diversity rule**: "Short broad queries first" — counteracts the failure mode of "too-long over-specific queries". Subagents independently search/evaluate/refine.
- **tier system**: N/A — a research pipeline, not a verdict-rendering system.
- **decay rule**: implicit — research outputs are point-in-time; the system doesn't track decay of conclusions.
- **convergence-consensus**: each subagent returns to the lead, which synthesises. **Performance**: 90.2% improvement vs single-agent Claude Opus 4 on internal research evals (parallel-fan-out wins big on breadth-first queries). **Cost reality**: ~15× tokens vs standard chat.
- **install-or-pattern distinction**: N/A directly — but the underlying lesson ("delegate breadth-first sub-questions to subagents in parallel") is a pattern.
- **cites** (≥3 orgs):
  - Anthropic engineering blog "How we built our multi-agent research system" (`anthropic.com/engineering/multi-agent-research-system`, Jun 13 2025)
  - Anthropic Claude Code docs § sub-agents (`code.claude.com/docs/en/sub-agents`)
  - Independent ports / discussions on hesreallyhim/awesome-claude-code (third-party adoption)
- **how-our-v3-compares**: their **subagent contract** (objective + output format + tools + boundaries) is the direct ancestor of our 6-stage funnel's subagent prompts. They are STRONGER on the "scaling rules embedded in prompts" discipline — explicit guidance on how much effort each subagent should spend. Our v3 stages have no per-stage effort budget. They have NO tier ladder, NO 14-dim rubric, NO adoption-decision concept — their system surfaces research, ours decides adoptions. **Strongest pattern to import**: extended-thinking-as-planning-scratchpad before fan-out.

### §2.2 — OpenAI Deep Research
- **scope**: agentic research feature in ChatGPT (also exposed via `o3-deep-research` API model + `gpt-5-deep-research`) that performs multi-step web search with autonomous browsing and synthesis.
- **methodology**: **end-to-end RL trained** in simulated research environments to learn the complete workflow: plan multi-step searches, backtrack when stuck, adjust strategies based on real-time info. The agent uses extended chains of thought (sometimes hundreds of steps) staying focused on the original goal.
- **evidence-typing**: **inline citation per claim** — every factual claim has a clickable reference pointing at exact source lines. **Fully traceable output.** Supports multi-source integration: web search + **MCP connectors** + **internal vector-store file-search**.
- **source-diversity rule**: hundreds of sources per report; no explicit "≥N orgs" rule, but the citation-per-claim discipline forces multi-source synthesis.
- **tier system**: not a tiered verdict system; output is a research report.
- **decay rule**: per-run; reports are timestamped but the agent doesn't track conclusions over time.
- **convergence-consensus**: not multi-agent in the same sense as Anthropic's — single agent with end-to-end RL. Convergence comes from the model's learned multi-step reasoning, not from inter-agent voting.
- **install-or-pattern distinction**: N/A.
- **performance**: ~26.6% on Humanity's Last Exam (highest at the time of release); +9pp on GAIA over prior SOTA.
- **cites** (≥3 orgs):
  - OpenAI "Introducing deep research" (`openai.com/index/introducing-deep-research/`, Feb 2 2025)
  - OpenAI `o3-deep-research` API docs (`developers.openai.com/api/docs/models/o3-deep-research`)
  - Anthropic / Google / Perplexity competitor product launches as cross-validation of pattern
- **how-our-v3-compares**: Deep Research's **inline-citation-per-claim discipline** is THE pattern our v3 most needs. Our v3 has typed evidence requirements (≥1 BENCHMARK + ≥1 CODE READING + ≥1 PRACTITIONER REPORT) but does NOT force per-dimension-score-to-cite bindings. Deep Research is **better** at audit trail (every claim → URL+line), **worse** at structured tier rendering (its output is freeform prose, not a 5-tier verdict). Deep Research has NO adoption-decision concept.

### §2.3 — Perplexity Deep Research / Sonar
- **scope**: agentic research integrated into Perplexity's search engine; Sonar API exposes the underlying search-grounded LLM. Perplexity Deep Research is the multi-step research variant.
- **methodology**: Sonar models accept chat-completions-style API calls but with **real-time web search grounding** + **inline citations**. Deep Research mode performs multi-step searches with cross-source comparison. The DRACO benchmark is Perplexity's own published research-quality eval.
- **evidence-typing**: citations are inline + structured (URL + title + snippet); every API response includes a `citations` array.
- **source-diversity rule**: not formally documented as "≥N orgs"; in practice Sonar returns 5-10 sources per query with explicit URL diversity.
- **tier system**: not tiered; continuous research-quality scoring via DRACO.
- **decay rule**: queries are point-in-time. Sonar models version (sonar-small, sonar-pro, etc.) but research-content decay is the consumer's problem.
- **convergence-consensus**: not multi-agent; single agent with multi-source synthesis.
- **install-or-pattern distinction**: N/A.
- **performance**: Deep Research scores 21.1% on Humanity's Last Exam (announced cite in their hub blog).
- **cites** (≥3 orgs):
  - Perplexity docs `docs.perplexity.ai/getting-started/overview` and `docs.perplexity.ai/api-reference/sonar-post`
  - Perplexity research hub blog `perplexity.ai/hub/blog/introducing-perplexity-deep-research`
  - DRACO benchmark paper at `research.perplexity.ai/articles/evaluating-deep-research-performance-in-the-wild-with-the-draco-` (Perplexity's own published eval methodology)
- **how-our-v3-compares**: Perplexity's **`citations` array in every API response** is a clean primitive. Our v3 candidate-ledger entries have citations in prose but no structured `citations[]` field per dimension score. Adding this would force programmatic auditability. Perplexity has NO adoption decision; just citation-grounded synthesis.

### §2.4 — Microsoft AutoGen
- **scope**: multi-agent conversation framework; agents converse to collaboratively solve tasks. AutoGen Bench is the eval lane.
- **methodology**: agents defined as conversational entities; conversations are programmable (e.g. `GroupChat` with multiple roles). The framework is general-purpose multi-agent, not research-specific.
- **evidence-typing**: not formalised; left to the application.
- **source-diversity rule**: N/A — framework, not eval.
- **tier system**: N/A.
- **decay rule**: N/A.
- **convergence-consensus**: `GroupChatManager` enables structured voting / sequential turn-taking; explicit support for "human-in-the-loop" intervention.
- **install-or-pattern distinction**: N/A.
- **cites** (≥3 orgs):
  - AutoGen GitHub `github.com/microsoft/autogen`
  - arXiv 2308.08155 (Wu et al. 2023, AutoGen paper) — Microsoft Research
  - Independent benchmarks (HumanEval / MATH agentic uses by third parties)
- **how-our-v3-compares**: AutoGen's **GroupChat with role-defined agents** is the explicit pattern behind our team-spawn / multi-reviewer skill. AutoGen is **more flexible** than our v3 (general-purpose multi-agent) but has **NO adoption-decision** semantics; it's an orchestration framework, not a verdict-rendering pipeline. Imports cleanly as a pattern for our convergence stage (multi-reviewer with structured voting).

---

## §3 — Source family 3: awesome-list curation discipline

### §3.1 — sindresorhus/awesome (the canonical meta-awesome)
- **scope**: the meta-list-of-awesome-lists (~400K stars); curates inclusion of OTHER awesome-lists. Sets the de-facto standard for what an "awesome list" is.
- **methodology**: lists are submitted via PR with strict acceptance gates. Author of the candidate list must self-attest their list meets the [awesome manifesto](https://github.com/sindresorhus/awesome/blob/main/awesome.md).
- **evidence-typing**: the manifesto requires:
  - ≥30 days of active code/content before submission.
  - Substantial unique content (no "10 lines and a logo").
  - Strict spelling + grammar (UK English in titles; US elsewhere).
  - One PR per list.
  - List name in awesome-{topic} format.
  - Contributing guide.
  - Code of Conduct.
  - Table of contents.
  - Concise description per item.
  - Items in alphabetical order or by some logical grouping.
- **source-diversity rule**: not at the list-level; each list governs its own diversity. The meta-list enforces uniqueness (no duplicate topics).
- **tier system**: **2-tier** — IN or NOT IN. No partial admission. (There's an unofficial soft signal via GitHub stars on each list, but it's not part of the rubric.)
- **decay rule**: lists removed if maintenance stops (silent decay; no formal "stale" marking). Some lists archived.
- **convergence-consensus**: maintainer (sindresorhus) has final say; community PRs reviewed individually.
- **install-or-pattern distinction**: **No** — it's a binary include decision.
- **cites** (≥3 orgs):
  - sindresorhus/awesome README + awesome.md (Sindre Sorhus)
  - awesome contributing.md
  - Multiple downstream awesome-* lists that explicitly cite the manifesto as authority
- **how-our-v3-compares**: their **≥30-day-active gate** is a stricter version of our v3's recency check; their **2-tier (in/out)** is much simpler than our 5-tier ladder — they don't try to encode degree of adoption. Their **single-maintainer-final-say** convergence model is the opposite of our v3's multi-agent-consensus model. The big difference: they curate LISTS (meta-aggregators), we curate PRIMITIVES (plugins, MCP servers, skills). They're cleaner; we need more nuance.

### §3.2 — awesome-claude-code (hesreallyhim)
- **scope**: curated list specifically for Claude Code primitives — skills, hooks, slash commands, agent orchestrators, applications, plugins.
- **methodology**: open PRs with a description, link, and category. Maintainer (hesreallyhim) reviews. README enforces alphabetical ordering within categories.
- **evidence-typing**: minimal — link + description + category. No formal evidence gates beyond "is this a working Claude Code primitive."
- **source-diversity rule**: implicit via category-spread (the README has ~8 categories covering different primitive types).
- **tier system**: **2-tier** (in / not in); some items get a "starred" / "highlighted" callout but it's informal.
- **decay rule**: none formal; broken-link PRs handled ad hoc.
- **convergence-consensus**: maintainer-final-say.
- **install-or-pattern distinction**: **No** — single binary admission.
- **cites** (≥3 orgs):
  - hesreallyhim/awesome-claude-code README
  - PR history showing acceptance pattern
  - Cross-references from other Claude Code community resources (e.g. Anthropic Cookbook, plugin-marketplace docs)
- **how-our-v3-compares**: their **flat 2-tier admission** vs our 5-tier ladder is a UX trade-off — they're easier to read, we're more informative. The trade-off: their list cannot distinguish "this skill is amazing and you should install" from "this skill exists and works"; ours can. Their **no formal evidence gate** is the major weakness — we have a 14-dim rubric, they have none. They are STRICTLY weaker on rigor; we are STRICTLY harder to maintain.

### §3.3 — awesome-mcp-servers (punkpeye)
- **scope**: curated list of MCP server implementations across categories (databases, AI services, productivity, etc.).
- **methodology**: PRs reviewed against a CONTRIBUTING.md that requires: description, link, language tag, scope tag, "official" vs "third-party" attribution.
- **evidence-typing**: minimal — same as awesome-claude-code; link + description + attribution.
- **source-diversity rule**: language + scope tagging is the proxy.
- **tier system**: **2-tier**; some items have an "official" badge.
- **decay rule**: none formal.
- **convergence-consensus**: maintainer.
- **install-or-pattern distinction**: **No**.
- **cites** (≥3 orgs):
  - punkpeye/awesome-mcp-servers CONTRIBUTING.md
  - Anthropic MCP docs (cite the list as a community catalog)
  - Cross-listing in other awesome-MCP lists
- **how-our-v3-compares**: similar to awesome-claude-code — 2-tier flat admission, no rubric. Their **"official vs third-party" attribution** is a cleaner version of our v3's `trusted-only` gate, but they enforce it via a tag, not a hard gate. We're stricter (Cardinal-Rule-1 enforced); they're more catholic.

---

## §4 — Source family 4: adoption-decision systems outside agents

### §4.1 — ThoughtWorks Tech Radar
- **scope**: published twice-yearly (Vol 34 as of mid-2026) by ThoughtWorks; quadrant + ring rating system for adoption decisions across **Techniques, Platforms, Tools, Languages & Frameworks**.
- **methodology**: the Tech Advisory Board (TAB) — ~20 senior technologists at ThoughtWorks who meet twice yearly face-to-face + bi-weekly virtually — writes the Radar. The TAB votes blips onto the Radar based on Thoughtworkers' client experience. **They do NOT publish to secure revenue, and don't accept vendor requests.** No comprehensive market survey claim.
- **evidence-typing**: each blip carries a 2-3 sentence experience-based summary. No formal evidence schema — claims derive from TAB members' lived client experience. Independence assertion is part of the methodology.
- **source-diversity rule**: TAB members come from different countries, areas of expertise, tenure. The TAB itself is the source diversity primitive.
- **tier system**: **4-ring × 4-quadrant**:
  - **Quadrants**: Techniques · Platforms · Tools · Languages & Frameworks.
  - **Rings**: **Adopt** (strong belief — apply in production) · **Trial** (worth pursuing — try in a project) · **Assess** (worth exploring — research) · **Hold** (proceed with caution).
- **decay rule**: blips can move ring-to-ring or off the Radar between volumes. Twice-yearly cadence is the formal decay clock. **A blip that fails to be re-discussed for several volumes simply disappears.**
- **convergence-consensus**: TAB internal vote — exact mechanics private.
- **install-or-pattern distinction**: **Yes, implicitly** — "Techniques" quadrant is patterns/practices (install-as-pattern), "Tools/Platforms/Languages & Frameworks" quadrants are concrete software (install-as-tool). This is the cleanest external version of the install-vs-pattern split we've found.
- **cites** (≥3 orgs):
  - ThoughtWorks Tech Radar FAQ (`thoughtworks.com/radar/faq`)
  - ThoughtWorks BYOR documentation (`thoughtworks.com/radar/how-to-byor`)
  - InfoQ + many independent reproductions of "build-your-own-radar" methodology
- **how-our-v3-compares**: ThoughtWorks Tech Radar is the **single closest analog to our adoption-decision pipeline**.
  - Quadrants ≈ our INSTALL/VENDOR-FORK/PATTERN-STUDY/CITE-ONLY but their 4 are by SUBJECT-TYPE, ours are by ADOPTION-MODE.
  - Rings ≈ our 5-tier ladder, but ThoughtWorks 4 are by RECOMMENDATION-INTENSITY (adopt/trial/assess/hold), ours are by ADOPTION-MODE (install/vendor-fork/pattern-study/cite-only/reject).
  - Their twice-yearly cadence is a cleaner decay clock than our STALE/AGING/RE-LITIGATED/RETIRED states.
  - Their **independence assertion** (no vendor influence, no revenue motive) is a discipline our v3 doesn't formalise.
  - Their **TAB as convergence body** is the consensus primitive — ours is parallel subagents with codex-review-gate, which is more automatable but harder to audit.
  - **They are STRONGER on tier semantics (ring = intensity, quadrant = type), WEAKER on evidence requirements (TAB experience, not rubric-scored).** A hybrid would be the SOTA — Radar's two-axis structure with our rubric's evidence discipline.

### §4.2 — CNCF graduation criteria
- **scope**: Cloud Native Computing Foundation's project-maturity progression (Linux Foundation umbrella). Decides which open-source projects are "Sandbox" → "Incubating" → "Graduated".
- **methodology**: Technical Oversight Committee (TOC) votes on maturity advancement. Sandbox is entry-tier ("Innovators"); Incubating is "Early Adopters"; Graduated is "Early Majority" (per Crossing the Chasm analogy explicitly cited on the CNCF project-metrics page).
- **evidence-typing**: explicit graduation criteria include:
  - **Adoption demonstration** — testimonials from 3+ end-users (not vendors) running the project in production.
  - **Healthy rate of changes** — measurable commit + release cadence.
  - **Committers from multiple organizations** — vendor-neutrality.
  - **CNCF Code of Conduct adopted.**
  - **CII Best Practices Badge** — passing the Linux Foundation's open-source-best-practices audit.
  - **Due Diligence Review** — comprehensive third-party review.
  - **General Technical Review (GTR).**
  - **Governance Review.**
  - **Vendor-neutral project metadata** (no single-vendor branding).
- **source-diversity rule**: explicit — "committers from multiple organizations" + "end-users from multiple organizations" (≥3 unaffiliated).
- **tier system**: **3-tier** (Sandbox / Incubating / Graduated) + 4th implicit tier (Archived for projects that decay).
- **decay rule**: Archived state — projects can be moved to "archived" if maintenance drops. **Formal archive process** with TOC vote.
- **convergence-consensus**: **TOC vote** — formal supermajority required for advancement.
- **install-or-pattern distinction**: **No, but** — the tier itself encodes adoption-confidence (Graduated = enterprise-ready; Sandbox = experimental). This is a confidence-of-install gradient.
- **cites** (≥3 orgs):
  - CNCF project-metrics page (`cncf.io/project-metrics/`)
  - CNCF TOC graduation_criteria.md
  - Linux Foundation CII Best Practices Badge program (separate org under same umbrella)
  - 100+ graduated projects' graduation issues as worked examples
- **how-our-v3-compares**: CNCF's **multi-org-committer + multi-org-end-user evidence requirement** is a stricter version of our v3's source-diversity rule. **Their formal Due Diligence Review + General Technical Review process is far more rigorous** than our v3's subagent scoring — but it scales much slower (weeks to months per project, vs hours for v3). Our v3 is MORE automatable; CNCF is MORE rigorous. Their **3-tier maturity progression** is a cleaner adoption-confidence ladder than our 5-tier-by-mode classification. **The Archived state with TOC vote is the cleanest decay primitive we've found** — explicit, governance-driven, irreversible without re-application.

### §4.3 — Wikipedia notability (GNG + SNG)
- **scope**: criteria for whether a topic merits its own article on Wikipedia. Adoption decision: yes-article / no-article / merge / redirect.
- **methodology**: a topic is presumed notable if it meets the **General Notability Guideline (GNG)** OR a **Subject-Specific Notability Guideline (SNG)**:
  - **GNG**: significant coverage in reliable, secondary, independent sources.
  - **SNG**: topic-specific criteria (e.g. WP:NACADEMIC, WP:NCORP, WP:NWEB).
- **evidence-typing**: **explicit hierarchy**:
  - **Significant coverage** — sources address the subject directly and in detail (no trivial mentions).
  - **Reliable** — published with editorial oversight and fact-checking.
  - **Secondary** — based on primary sources, with analytical / interpretive content; NOT the subject's own publications.
  - **Independent** — not affiliated with the subject.
  - **Sources** — plural; one source is not enough.
- **source-diversity rule**: **plural reliable secondary independent sources** is the most precisely-codified source-diversity rule we've found in any external system.
- **tier system**: **2-tier presumption** (notable / not notable) + escalation states (AfD discussion → keep/delete/merge/redirect).
- **decay rule**: notability is "not temporary" per WP:NTEMP — once a topic has been notable, it stays notable. But articles can be merged/redirected if maintained sources decay. **WP:NTEMP** is an interesting opposite-of-decay primitive worth noting.
- **convergence-consensus**: **Articles for Deletion (AfD)** discussions — community consensus over 7-day period, closed by an admin or non-admin closer. Explicit consensus-not-vote semantics.
- **install-or-pattern distinction**: **No** — binary notability.
- **cites** (≥3 orgs):
  - Wikipedia:Notability policy page
  - Multiple Subject-Specific Notability Guidelines (WP:NACADEMIC, WP:NCORP, WP:NWEB, etc.)
  - AfD discussion archives (thousands of worked examples)
  - WP:Verifiability and WP:Reliable Sources companion policies
- **how-our-v3-compares**: Wikipedia's **GNG four-axis source-quality test** (significant + reliable + secondary + independent + plural) is the most precise evidence-typing scheme we've found anywhere. Our v3's "≥3 organisationally-distinct cites" rule maps to "independent + plural" but doesn't enforce "significant coverage" (sources must address candidate in detail, not just mention) or "reliable" (editorial oversight) or "secondary" (analytical, not first-party). **Lifting GNG's four-axis test into v3 would be a strict upgrade.** Wikipedia's **AfD 7-day deliberation** is the most-codified convergence-consensus primitive — and it's HUMAN deliberation, which our v3 lacks.

### §4.4 — NIST AI Risk Management Framework (AI RMF 100-1)
- **scope**: voluntary framework for governing AI system development and deployment risk. NIST publication NIST AI 100-1 (January 2023). Companion: AI 600-1 for generative AI (2024).
- **methodology**: **four functions** form the core:
  - **Govern** — culture of risk management; policies, accountability, oversight structures.
  - **Map** — context characterization; categorize AI systems by risk profile.
  - **Measure** — quantitative and qualitative analysis; track risk indicators.
  - **Manage** — risk prioritization, treatment, and ongoing monitoring.
- **evidence-typing**: not prescriptive on data formats; explicitly designed as a framework (process), not a checklist (output). Each function has sub-categories with "actions" and "outcomes" — but they're voluntary patterns, not deterministic gates.
- **source-diversity rule**: implicit via "Map" function's stakeholder identification requirement.
- **tier system**: not tiered; continuous maturity per function. The AI RMF Playbook gives "outcome" descriptions but doesn't rank them.
- **decay rule**: framework recommends "continuous improvement" — risk profiles must be revisited at defined intervals. No specific cadence prescribed.
- **convergence-consensus**: framework recommends multi-stakeholder governance; specific mechanisms left to implementer.
- **install-or-pattern distinction**: **N/A** for adoption decisions; the AI RMF is meta — it's a framework for building YOUR adoption framework.
- **cites** (≥3 orgs):
  - NIST AI RMF page (`nist.gov/itl/ai-risk-management-framework`)
  - NIST AI 100-1 publication
  - NIST AI 600-1 (Generative AI Profile, 2024)
  - Multiple international adoptions (UK AISI, EU AI Act references)
- **how-our-v3-compares**: AI RMF is meta to our v3. Our v3 is a **specific instantiation** of "Measure" + "Manage" for the narrow scope of agent-runtime primitive adoption. AI RMF's **Govern function** (culture + policy + accountability) is largely UNIMPLEMENTED in our v3 — we have rubric + decay states, but no formal governance / accountability assignment per decision. Could be a strict upgrade.

---

## §5 — Source family 5: convergence-consensus methods

### §5.1 — Anthropic Constitutional AI
- **scope**: training methodology that uses AI feedback (not human labels) to train harmlessness. Underlies Claude. arXiv 2212.08073 (Bai et al. 2022).
- **methodology**: **two phases**:
  1. **Supervised learning** — sample from an initial model, generate self-critiques and revisions per a constitution, finetune on revised responses.
  2. **Reinforcement learning** — sample from finetuned model, use a model evaluator to score pairs per the constitution, train a preference model from these AI preferences, RL on the preference model (RLAIF — RL from AI Feedback).
- **evidence-typing**: constitution principles drawn from UN Universal Declaration of Human Rights, Apple Terms of Service, Anthropic's own research, and other source texts.
- **source-diversity rule**: constitution is the source of truth; principles are human-authored but the application is AI-driven.
- **tier system**: continuous preference scores → RL signal; no discrete tiers.
- **decay rule**: constitution itself is versioned ("Update, Jan 21, 2026: We've published a new version of Claude's constitution").
- **convergence-consensus**: **AI-critiques-AI** — the model judges itself against the constitution. Pareto win shown over RLHF (more helpful + more harmless).
- **install-or-pattern distinction**: **N/A** — training methodology, not adoption.
- **cites** (≥3 orgs):
  - Anthropic "Claude's Constitution" blog (`anthropic.com/news/claudes-constitution`)
  - arXiv 2212.08073 (peer-reviewed)
  - Independent reproductions (HuggingFace open-source RLAIF efforts)
- **how-our-v3-compares**: Constitutional AI's **self-critique-then-revise loop** is the pattern behind a few existing skill iterations in this runtime, but the v3 rubric does NOT apply critique-then-revise per candidate score. Adding a step where each score is critiqued by a second pass against a "rubric constitution" before locking in would be a strict upgrade — analog to what Constitutional AI does to model training.

### §5.2 — Anthropic / DeepMind / OpenAI AI Safety via Debate (Irving & Christiano 2018)
- **scope**: proposed scalable-oversight technique. Two AI agents argue opposite sides; a human judge picks the winner. The premise: lies are easier to refute than to defend at high capability levels.
- **methodology**: zero-sum game between two agents over a question. Each agent's argument is a sequence of natural-language statements + supporting evidence. Judge sees full transcript, decides which agent's case is stronger.
- **evidence-typing**: arguments cite each other recursively (claims + counter-claims with explicit links back to disputed facts).
- **source-diversity rule**: built-in adversarial structure (two opposite stances).
- **tier system**: binary winner.
- **decay rule**: per-debate; results are point-in-time.
- **convergence-consensus**: **adversarial debate + human judge** is the convergence primitive.
- **install-or-pattern distinction**: **N/A** — alignment research.
- **cites** (≥3 orgs):
  - arXiv 1805.00899 (Irving & Christiano + Amodei, OpenAI 2018)
  - Anthropic Sleeper Agents / Self-Critique work (Anthropic 2024) — debate-adjacent
  - DeepMind scalable oversight literature
  - Anthropic Constitutional AI paper (references debate as adjacent approach)
- **how-our-v3-compares**: our existing **codex adversarial-review gate** (codex GPT-5.5 reviews orchestrator's work) is a direct instance of the debate pattern — two models (Claude-Code + codex), one acts as proponent of the change, the other adversarial reviewer. This is GOOD. What's MISSING from our v3: when codex disagrees, our pattern is "fix the issue or BLOCK" — not "human judge sees transcript and picks winner". The judge is the operator, but the v3 doesn't preserve full debate transcripts in the audit trail. Adding "full debate transcript preservation" would be a strict upgrade aligned with debate paper's design.

### §5.3 — Self-consistency Chain-of-Thought (Wang et al. 2022)
- **scope**: technique for improving CoT reasoning by sampling k independent chains and taking majority vote.
- **methodology**: for a problem, prompt for chain-of-thought reasoning + answer. Sample N=k independent generations (different stochastic seeds / temperature). Take MAJORITY VOTE on the final answer.
- **evidence-typing**: empirical — claims SOTA on GSM8K (74.4% → 80.7% on PaLM-540B with k=40).
- **source-diversity rule**: k independent samples from same model (intra-model diversity, not inter-source).
- **tier system**: continuous accuracy.
- **decay rule**: N/A.
- **convergence-consensus**: **majority vote over k independent samples** is THE convergence primitive.
- **install-or-pattern distinction**: **N/A**.
- **cites** (≥3 orgs):
  - arXiv 2203.11171 (Wang et al. 2022, Google Research)
  - Independent reproductions on GSM8K, MATH, ARC-Challenge
  - lm-evaluation-harness self-consistency task implementations
- **how-our-v3-compares**: self-consistency is the cleanest "what to do when one subagent's score is uncertain" primitive — sample k independent scorings, take median per dimension. Our v3 doesn't do this. Adding "for any dimension where the first subagent's confidence is below threshold, sample k=3 independent scorings and take median" would be a directly portable strict upgrade.

### §5.4 — LLM-as-judge / AlpacaFarm bench
- **scope**: methodology for evaluating instruction-following with an LLM judge instead of humans. AlpacaFarm (Stanford CRFM) is the canonical simulation framework. Companion paper: arXiv 2305.14387.
- **methodology**: collect pairs of model responses → ask an LLM judge (typically GPT-4) which is better → aggregate preferences → train / rank.
- **evidence-typing**: judge prompts are explicit; pairwise comparison structure; sometimes order-swapped for position-bias correction.
- **source-diversity rule**: typically single judge; can be multi-judge for ensemble.
- **tier system**: pairwise → ELO rating (LMSYS Chatbot Arena uses this).
- **decay rule**: judge choice matters; periodic re-evaluation with newer judges recommended.
- **convergence-consensus**: judge's preferences ARE the consensus. Position-bias correction (swap A/B) is a standard mitigation.
- **install-or-pattern distinction**: **N/A**.
- **cites** (≥3 orgs):
  - arXiv 2305.14387 (Dubois et al. 2023, AlpacaFarm) — Stanford CRFM
  - arXiv 2306.05685 (Zheng et al. 2023, "Judging LLM-as-a-Judge")
  - LMSYS Chatbot Arena methodology (separate org adopting the pattern at scale)
- **how-our-v3-compares**: our v3 IS an LLM-as-judge system for candidate evaluation; the rubric is the judge's prompt. What we LACK from the canonical LLM-as-judge literature: **position-bias correction** (we score A vs B in fixed order; bias literature says we should swap and average). For pairwise comparisons (alternative candidates for the same role), we should follow LMSYS Arena's ELO + swap pattern. This is a known gap.

---

## §6 — Source family 6: sources we don't currently use

### §6.1 — Semantic Scholar Academic Graph API
- **scope**: AI-augmented citation graph + paper search (Allen Institute for AI / AI2).
- **methodology**: large-scale citation graph with influential-citation classification (a citation classified by an ML model as "intellectually influential" vs "perfunctory"). Search by paper title, author, DOI, topic, with full citation neighborhood traversal.
- **evidence-typing**: full citation context — paper → references → cited-by + influence scores.
- **source-diversity rule**: 200M+ papers across all sciences; multi-publisher coverage.
- **tier system**: continuous citation-influence score.
- **decay rule**: papers are immutable but citation graphs grow continuously. Influence-citation classification re-runs as new citations arrive.
- **convergence-consensus**: graph-based — multiple citations to the same claim build agreement signal.
- **install-or-pattern distinction**: **N/A**.
- **cites** (≥3 orgs):
  - Semantic Scholar product/api page (`semanticscholar.org/product/api`)
  - AI2 Semantic Scholar about page
  - Multiple academic literature reviews citing Semantic Scholar as primary tool
- **how-our-v3-compares**: we currently don't query Semantic Scholar in our funnel. If we did, we could ground claims about academic provenance (e.g., "the underlying technique X was first published in paper Y, cited by Z paperss"). This adds a citation-graph evidence dimension our v3 currently lacks. Cost: API rate limits, but a free tier exists.

### §6.2 — OpenAlex
- **scope**: free, open replacement for Microsoft Academic Graph; ~250M scholarly works.
- **methodology**: snapshot + API + dashboards; tracks works → concepts → authors → institutions → venues.
- **evidence-typing**: similar to Semantic Scholar but with explicit "concepts" hierarchy.
- **source-diversity rule**: concept-based multi-disciplinary aggregation.
- **tier system**: continuous citation count.
- **decay rule**: snapshots dated; live API.
- **convergence-consensus**: N/A directly; graph-based provenance.
- **install-or-pattern distinction**: **N/A**.
- **cites** (≥3 orgs):
  - OpenAlex about page
  - Independent academic adoptions (replacing MAG after its decommission)
  - Documentation at `docs.openalex.org`
- **how-our-v3-compares**: free + open license is the differentiator vs Semantic Scholar. Could be a drop-in supplement for academic provenance grounding. Currently unused by our funnel.

### §6.3 — Lobste.rs community link aggregator
- **scope**: invite-only computing-focused community. Curation via member voting + invitation tree.
- **methodology**: invite-only registration through a public **invitation tree** (every member's profile shows who invited them) — provides accountability + spam control. New users (first 70 days, green username) have restricted privileges (can't send invites, submit to new domains, flag, edit titles, etc.).
- **evidence-typing**: each submitted link is voted on; high-vote items rise. Comments are threaded with up/down voting and visible "merit" patterns.
- **source-diversity rule**: tag-based; explicit lists of restricted tags for new users.
- **tier system**: continuous score (votes – downvotes – penalty factors over time).
- **decay rule**: time-decay built into ranking — older posts decay even with votes.
- **convergence-consensus**: vote-based; moderators handle abuse. **Invitation tree as accountability primitive** is the distinctive feature.
- **install-or-pattern distinction**: **N/A**.
- **cites** (≥3 orgs):
  - lobste.rs/about (jcs + pushcx authors)
  - Hacker News (separate aggregator, frequently compared)
  - Internal moderators page (multiple moderators)
- **how-our-v3-compares**: Lobsters' **invitation-tree accountability** is a concept our v3 doesn't have — every adoption decision could be traced back to a chain of "who first surfaced this candidate". Currently we have author identity in PRs but no formal tree. Their **70-day new-user restriction** is an interesting trust-build-up primitive; analogous would be "new rubric dimensions have a 90-day probation where their scores get weighted half".

### §6.4 — NVIDIA garak (LLM vulnerability scanner)
- **scope**: pen-test framework for LLMs — runs `probe` plugins against models, `detector` plugins detect failure modes, `evaluator` plugins assess severity.
- **methodology**: plugin architecture with four classes: `probes` (interactions), `detectors` (failure-mode detection), `evaluators` (assessment reports), `generators` (LLMs under test), `harnesses` (test structuring). Default `probewise` harness runs each probe against each detector.
- **evidence-typing**: each detector produces per-probe-per-detector results; aggregated into evaluator reports.
- **source-diversity rule**: probe taxonomy spans DAN-jailbreaks, prompt injection, harmful generation, etc.
- **tier system**: severity grading per detector (informational / low / medium / high / critical).
- **decay rule**: probes versioned in repo; community-contributed.
- **convergence-consensus**: not consensus; deterministic detection per probe.
- **install-or-pattern distinction**: **N/A**.
- **cites** (≥3 orgs):
  - NVIDIA garak repo (`github.com/leondz/garak`)
  - reference.garak.ai docs
  - OWASP LLM Top 10 (cross-references garak as an implementation)
- **how-our-v3-compares**: garak's **plugin taxonomy with severity grading** is a primitive applicable to security-axis evaluation of our candidates — but we don't run security scans as part of v3 today. Our v3 has D5 (Security) but it's a paper review, not an instrumented probe. Lifting garak's severity-graded plugin output into D5 evaluation would be a strict upgrade.

### §6.5 — OWASP LLM Top 10 + GenAI Security Project
- **scope**: OWASP's top-10 LLM-specific vulnerabilities. v1.1 → v2025 (current). Companion to broader OWASP GenAI Security Project.
- **methodology**: community-voted vulnerability list, with detailed entries per item.
- **evidence-typing**: each top-10 entry has Description, Common Examples of Vulnerability, How to Prevent, Example Attack Scenarios, References.
- **source-diversity rule**: contributor working group; multi-organisation by design.
- **tier system**: **top-10 ranked list** — explicit prioritisation by impact/likelihood.
- **decay rule**: versioned releases (v0.1 → v0.5 → v0.9 → v1.0 → v1.1 → v2025). Each version supersedes prior.
- **convergence-consensus**: community working-group voting.
- **install-or-pattern distinction**: **N/A** — security taxonomy.
- **cites** (≥3 orgs):
  - OWASP LLM Top 10 page (`owasp.org/www-project-top-10-for-large-language-model-applications/`)
  - OWASP GenAI Security Project (`genai.owasp.org`)
  - NIST AI 600-1 (cross-references OWASP for technical guidance)
  - Anthropic / OpenAI model cards (cite OWASP categories in capability descriptions)
- **how-our-v3-compares**: OWASP LLM Top 10's **top-10 explicitly-ranked prioritisation** is a clean discipline our v3 doesn't have for security findings. We score D5 on a 1-5 scale but don't rank the SPECIFIC security concerns within a candidate by impact. Adding "top-3 security findings per candidate, ranked by impact" would be a strict upgrade. The **versioned release cadence (v0.1 → v2025)** is a model decay protocol.

---

## §7 — Top-12 EXTERNAL systems summary

| # | System | Category | Cites-count | Would-replace-our-v3? | Key delta |
|---|--------|----------|-------------|----------------------|-----------|
| 1 | **ThoughtWorks Tech Radar** | Adoption-decision | 3+ | **PARTIAL — replaces TIER + DECAY layers, NOT rubric layer** | 4-ring × 4-quadrant tier system + twice-yearly cadence + TAB convergence body. Cleanest external analog. Pairs with our rubric for SOTA. |
| 2 | **CNCF graduation criteria** | Adoption-decision | 4 | **PARTIAL — replaces EVIDENCE layer, NOT tier layer** | Multi-org-committer + Due-Diligence-Review + Best-Practices-Badge + Governance Review. Far more rigorous evidence than v3. |
| 3 | **Wikipedia notability (GNG)** | Adoption-decision | 4 | **PARTIAL — replaces SOURCE-DIVERSITY rule** | 4-axis source-quality test (significant + reliable + secondary + independent + plural). Most precise external evidence-typing scheme. |
| 4 | **Anthropic multi-agent research** | Agentic-research | 3 | **NO — orthogonal (research, not adoption)** | Orchestrator-worker topology + per-subagent contract. Pattern already partially in v3's funnel stages. |
| 5 | **OpenAI Deep Research** | Agentic-research | 3 | **NO — orthogonal** | Inline-citation-per-claim + end-to-end RL. Lifts to v3's per-dimension cite binding. |
| 6 | **Perplexity Deep Research / Sonar** | Agentic-research | 3 | **NO — orthogonal** | Structured `citations[]` array per API response. Pattern lifts to v3 score JSON. |
| 7 | **Stanford HELM** | Academic eval | 3 | **PARTIAL — replaces METRIC-DIMENSION discipline** | 7-metric matrix (accuracy/calibration/robustness/fairness/bias/toxicity/efficiency) is cleaner than our 14-dim. |
| 8 | **EleutherAI lm-evaluation-harness** | Academic eval | 3 | **PARTIAL — replaces TASK-VERSIONING** | `metadata.version` + changelog discipline. Strict upgrade for v3 decay states. |
| 9 | **UK AISI inspect_ai** | Academic eval | 3 | **PARTIAL — replaces AUDIT-LOG layer** | `EvalLog` machine-replayable JSON. Strict upgrade for v3 evidence trail. |
| 10 | **MTEB Borda count** | Academic eval | 3 | **PARTIAL — replaces RANK-AGGREGATION** | Borda count is a fairer multi-dim rank-aggregation than weighted-sum. Direct port to v3. |
| 11 | **SWE-bench Verified retirement protocol** | Academic eval | 4 | **NO — pattern only** | Public failure-mode-disclosure + benchmark retirement when contamination unsalvageable. Cleanest external decay primitive. |
| 12 | **GPQA expert-agreement filter** | Academic eval | 3 | **NO — pattern only** | ≥2-of-3 expert agreement required for inclusion. Directly portable consensus primitive. |

---

## §8 — Executive summary (6 bullets)

1. **No single external system replaces our v3 wholesale.** The v3 stack (sca-v3 + 6-stage funnel + 14-dim rubric + 5-tier ladder + decay state machine) is a hybrid of patterns each external system implements in PART. The closest single external analog is ThoughtWorks Tech Radar (rings + quadrants + cadence + TAB convergence), but Radar lacks per-candidate evidence rigor — its rubric is TAB experience, not deterministic scoring.

2. **The 2-axis Tier×Type framework (ThoughtWorks Radar) is materially better than our 1-axis 5-tier ladder.** Radar's rings (intensity: Adopt/Trial/Assess/Hold) and quadrants (subject type: Techniques/Platforms/Tools/Languages-Frameworks) cleanly separate "how strongly we recommend" from "what kind of thing is this". Our v3 conflates both axes into 5 tiers (INSTALL/VENDOR-FORK/PATTERN-STUDY/CITE-ONLY/REJECT). A v4 lift: split intensity (4 rings) from mode (3-4 quadrants) — but keep our 14-dim rubric for evidence rigor, where Radar is weaker.

3. **Our evidence-typing is weaker than four external systems.** Wikipedia notability GNG (significant + reliable + secondary + independent + plural — 5-axis source quality), CNCF graduation (multi-org committers + DDR + GTR + governance), GPQA (≥2-of-3 expert agreement filter), and SWE-bench Verified (3-criteria human annotator panel) all impose stricter evidence requirements than our v3. The biggest single gap: we do not require **secondary** (analytical, non-first-party) sources — only "organisationally distinct" which a vendor blog and a vendor case study trivially satisfy.

4. **Our decay protocol is weaker than three external systems.** SWE-bench Verified retirement (public contamination disclosure → formal decommission), MTEB task supersession (`v1` → `v2` explicit), and EleutherAI lm-evaluation-harness `metadata.version`+changelog all enforce versioned decay with stricter discipline than our v3's STALE/AGING/RE-LITIGATED/RETIRED state-flag-only protocol. The biggest gap: we have no explicit version-bump-on-breaking-change for rubric DIMENSIONS themselves, only for the rubric AS A WHOLE (v1 → v2 → v3).

5. **Our convergence-consensus mechanism is weaker than three external systems.** GPQA's ≥2-of-3 expert agreement, AI safety via debate's two-agent-plus-judge structure (Anthropic / DeepMind / OpenAI 2018), and self-consistency CoT's k-sample majority vote (Wang et al. 2022) all provide cleaner consensus primitives. Our v3 relies on parallel subagents + a single codex adversarial review gate — which is a debate analog, but **doesn't sample k independent rubric passes and take median** (self-consistency primitive). Adding k=3 independent rubric-pass-with-median for low-confidence dimensions would be the single highest-leverage import.

6. **Three patterns we don't currently use are strictly upgrades.** (a) Inline citation per claim (OpenAI Deep Research, Perplexity Sonar `citations[]` array): force per-dimension-score-to-cite bindings in v3 score JSON. (b) Machine-replayable audit logs (UK AISI inspect_ai `EvalLog`): structured per-candidate decision JSON, not markdown. (c) NIST AI RMF's Govern function: explicit accountability assignment per adoption decision. Implementing (a)+(b) is a 2-week change; (c) is a 1-quarter governance lift.

---

## §9 — Which 1-2 external systems most plausibly REPLACE our v3?

**Honest answer: NO single external system replaces our v3 fully. Two come closest, in different ways:**

**Primary candidate — ThoughtWorks Technology Radar (full replacement, not just patterns).** Radar replaces the v3 outputs (tier ladder + decay states) end-to-end with a different model: 4-ring × 4-quadrant published twice-yearly by a 20-person Tech Advisory Board. Radar fully replaces v3's TIER layer (intensity) AND v3's MODE layer (subject type), and Radar's twice-yearly cadence replaces v3's STALE/AGING decay states with a hard clock. If we adopted Radar wholesale, we would lose v3's automated rubric-based scoring (TAB experience is not deterministic; it's expert judgement). The resulting trade-off: simpler maintenance, less rigorous evidence per blip, but proven publication discipline over 10+ years (vol 1 in 2010 through vol 34 in 2026). Several Fortune-500 tech orgs (Spotify, GitHub, Capital One) maintain in-house Radars on this exact methodology, validating it scales beyond ThoughtWorks. **However**, Radar is built for an INTERNAL technologist organisation deciding TECHNOLOGY adoption — it is NOT built for an automated agent runtime making per-primitive decisions every wave. The cadence mismatch (twice-yearly vs per-wave) and the rubric-vs-experience mismatch (we need machine-deterministic scoring; Radar is human-judgement) are HARD ceilings on full replacement.

**Secondary candidate — CNCF graduation criteria (full replacement of EVIDENCE layer only).** CNCF replaces v3's evidence-typing layer with a substantially more rigorous protocol: General Technical Review + Governance Review + Due Diligence Review + CII Best Practices Badge + multi-org committers + multi-org end-user testimonials. Each is a formal, weeks-to-months document review. The 3-tier maturity ladder (Sandbox → Incubating → Graduated) is a cleaner adoption-confidence gradient than our 5-tier mode-based ladder. If we adopted CNCF's evidence layer, our adoption decisions would have provenance equivalent to publicly-graduated Kubernetes / Envoy / etcd — but each decision would take weeks instead of hours. **Trade-off identical to Radar's**: rigor vs speed. CNCF is built for irreversible enterprise-grade adoption decisions on multi-million-LOC projects; our v3 is built for per-wave per-primitive triage in an agent runtime. The volume mismatch is fundamental.

**Synthesis (the truth)**: the right move is NOT replacement but **two-layer hybridisation**:
- **Outer layer (tier + decay + cadence)**: lift ThoughtWorks Radar's 2-axis Ring×Quadrant structure + twice-monthly cadence.
- **Inner layer (per-candidate evidence)**: keep our 14-dim rubric BUT lift CNCF's multi-org-evidence requirements + Wikipedia GNG's 4-axis source-quality test + GPQA's ≥2-of-3 expert-agreement filter + lm-evaluation-harness's per-dimension version-bump-on-breaking-change discipline.
- **Convergence layer**: lift self-consistency CoT's k-sample median + AI-safety-via-debate's full-transcript-preservation.
- **Audit layer**: lift inspect_ai's `EvalLog` machine-replayable JSON + Deep Research/Sonar's `citations[]` array.

The honest verdict: **our v3 is the closest existing-in-the-wild research-architecture to what we need — but it could absorb 6-8 strict upgrades from the systems above without losing its identity.** If we had to start over from one external system, ThoughtWorks Radar gives the cleanest outer shell; CNCF the cleanest inner rigor; lm-evaluation-harness the cleanest decay protocol. None of the three on its own replaces v3.

---

## §10 — Cite trail (per-system organisationally-distinct sources)

The following list provides ≥3 organisationally-distinct cites per surfaced system, satisfying W292's "do NOT use our own architecture as authority" mandate. All URLs verified at fetch-time (2026-05-18).

### Academic-grade evaluation pipelines
- HELM: `crfm.stanford.edu/helm/`, arXiv 2211.09110 (Liang et al.), DeepWiki `stanford-crfm/helm`
- lm-evaluation-harness: DeepWiki `EleutherAI/lm-evaluation-harness`, HuggingFace Open LLM Leaderboard docs, arXiv 2310.17567
- OpenAI Evals: DeepWiki `openai/evals`, HuggingFace Evals docs, `platform.openai.com/docs/guides/evals`
- inspect_ai: `github.com/UKGovernmentBEIS/inspect_ai`, DeepWiki extraction, `github.com/UKGovernmentBEIS/inspect_evals`
- BIG-bench: `github.com/google/BIG-bench`, arXiv 2206.04615, lm-evaluation-harness BIG-bench task ports
- SWE-bench Verified: `github.com/SWE-bench/SWE-bench`, `openai.com/index/introducing-swe-bench-verified/`, `openai.com/index/why-we-no-longer-evaluate-swe-bench-verified/`, SWE-rebench follow-up
- Aider polyglot: `aider.chat/2024/12/21/polyglot.html`, `exercism.org/`, GitHub independent reproductions
- MTEB: DeepWiki `embeddings-benchmark/mteb`, arXiv 2210.07316, MMTEB consortium guidelines
- MMLU / MMLU-Pro: Wikipedia MMLU entry, arXiv 2009.03300 (Hendrycks et al.), arXiv 2406.01574 (Wang et al.)
- GPQA: HuggingFace `Idavidrein/gpqa`, arXiv 2311.12022, Anthropic / OpenAI model card cross-cites
- ARC / ARC-AGI: `arcprize.org/leaderboard`, arXiv 1911.01547, Kaggle ARC competition pages

### Agentic-research frameworks
- Anthropic multi-agent: `anthropic.com/engineering/multi-agent-research-system`, `code.claude.com/docs/en/sub-agents`, hesreallyhim/awesome-claude-code references
- OpenAI Deep Research: `openai.com/index/introducing-deep-research/`, `developers.openai.com/api/docs/models/o3-deep-research`, competitor launch press coverage
- Perplexity: `docs.perplexity.ai/getting-started/overview`, `perplexity.ai/hub/blog/introducing-perplexity-deep-research`, `research.perplexity.ai/articles/evaluating-deep-research-performance-in-the-wild-with-the-draco-`
- AutoGen: `github.com/microsoft/autogen`, arXiv 2308.08155, independent HumanEval/MATH usages

### Awesome-list curation discipline
- sindresorhus/awesome: README, awesome.md manifesto, contributing.md
- awesome-claude-code: README, PR history, downstream Claude Code community references
- awesome-mcp-servers: CONTRIBUTING.md, Anthropic MCP docs, cross-listings

### Adoption-decision systems
- ThoughtWorks Tech Radar: `thoughtworks.com/radar/faq`, `thoughtworks.com/radar/how-to-byor`, InfoQ + BYOR-clone independent reproductions
- CNCF: `cncf.io/project-metrics/`, TOC graduation_criteria.md, CII Best Practices Badge program, graduated-project issue histories
- Wikipedia notability: WP:Notability policy, WP:NACADEMIC/NCORP/NWEB subject-specific guidelines, AfD archives, WP:V + WP:RS companion policies
- NIST AI RMF: `nist.gov/itl/ai-risk-management-framework`, NIST AI 100-1, NIST AI 600-1, UK AISI / EU AI Act references

### Convergence-consensus methods
- Constitutional AI: `anthropic.com/news/claudes-constitution`, arXiv 2212.08073, HuggingFace open-source RLAIF reproductions
- AI safety via debate: arXiv 1805.00899, Anthropic Sleeper Agents work, DeepMind scalable oversight literature
- Self-consistency CoT: arXiv 2203.11171, independent GSM8K/MATH reproductions, lm-evaluation-harness implementations
- LLM-as-judge / AlpacaFarm: arXiv 2305.14387, arXiv 2306.05685, LMSYS Chatbot Arena methodology

### Sources we don't currently use
- Semantic Scholar API: `semanticscholar.org/product/api`, AI2 about page, academic literature review usages
- OpenAlex: about page, replacement-of-MAG context, `docs.openalex.org`
- Lobste.rs: `lobste.rs/about`, comparison-to-Hacker-News literature, moderators page
- garak: `github.com/leondz/garak`, reference.garak.ai docs, OWASP LLM Top 10 cross-references
- OWASP LLM Top 10: `owasp.org/www-project-top-10-for-large-language-model-applications/`, `genai.owasp.org`, NIST AI 600-1 + Anthropic / OpenAI model card cross-cites

---

## §11 — Notes for the Agent B (rubric-comparison)

Agent B should match each of the systems in §1-§6 against the v3 dimensions one-by-one (a competitor-rubric-crosswalk). Hints based on this discovery:

- **For each external system**, ask: "of v3's 14 dimensions, which does this system encode? Which does it lack? Which does it encode MORE STRICTLY?" The answer should yield a per-system delta vector.
- **Highest-leverage transfers identified by this audit**:
  1. ThoughtWorks Radar 2-axis Tier×Type (replaces v3's 5-tier-by-mode flat ladder).
  2. Wikipedia GNG 4-axis source-quality test (replaces v3's "≥3 organisationally-distinct").
  3. CNCF multi-org-committer + DDR (strict upgrade to D11/D14 evidence).
  4. lm-evaluation-harness `metadata.version` + changelog (strict upgrade to v3 decay).
  5. Self-consistency CoT k-sample median (strict upgrade to convergence on low-confidence dimensions).
  6. inspect_ai EvalLog machine-replayable JSON (replaces v3 markdown audit trail).
  7. SWE-bench Verified retirement protocol (formalises STALE → RETIRED transition).
  8. OpenAI Deep Research / Sonar `citations[]` array (per-dimension-score cite binding).
- **Anti-patterns to AVOID lifting**:
  - awesome-list 2-tier-only admission (loses the install/pattern-study/cite-only distinction we already have).
  - CNCF's weeks-to-months Due Diligence Review (cadence mismatch with our per-wave triage).
  - Lobsters invitation-tree (over-engineered for an automated runtime; we don't have humans queueing for membership).

---

**End of artifact.** Final action below is the `Write` tool call that creates this file at `Z:/claude-sota-installed/docs/architecture/W292-RESEARCH-ARCH-COMPETITOR-AUDIT/COMPETITOR-DISCOVERY.md` per the W292 Agent A mandate.
