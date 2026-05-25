# W259v16 Coverage Audit — EVAL / OBSERVABILITY layer (L4)

> **Mission**: definitive coverage + gap-finding for the W259 grand catalog's **L4 — LLM/agent eval + observability** layer. Per operator directive: does the catalog cover *every* SOTA repo in this field, or are there gaps?
> **Method**: (1) extracted the W259 baseline from `05-scoring/MASTER-SCORING-MATRIX-W259.md` + `05-scoring/BENCHMARK-SCORECARD-D-L4-L5-W259v6.md` + `05-scoring/PER-LAYER-BENCHMARK-SCORECARD-W259v6.md` + `02-layer-deepdive/LAYER-C-evals-obs-serving-routers.md` + `05-scoring/ROUND2-MISSED-SCORED-W259v3.md`; (2) live GitHub MCP discovery — `search_repositories` sorted by stars across topics `llm-evaluation` (1,195 repos), `llm-observability` (182), `prompt-engineering`+evaluation (406), `agent-evaluation` (167), `rag-evaluation` (110); READMEs fetched for gap candidates.
> **Date**: 2026-05-17 · **Authority**: W259v16 Wave-16 coverage-audit agent (L4) · **Cite-class**: `effective_tier=TIER-3-LOCAL-COMPOSITION`.
> **Scope note**: This is a COVERAGE audit, NOT a benchmark re-litigation. Existing W259 scores/dispositions are taken as-is; this doc only asks "is repo X in the catalog, and if not, should it be?"

---

## (a) Baseline — what W259 already catalogues for L4-Eval/Obs

W259 has **strong, repeatedly-revisited L4 coverage** — the layer has its own deep-dive (`LAYER-C`, 54 candidates across 6 sublayers) plus a dedicated benchmark scorecard (`SCORECARD-D`). The scored/dispositioned L4-Eval + L4-Obs repos:

### L4-EVAL (eval / benchmark frameworks)

| Repo | W259 row / location | Composite | Disposition |
|---|---|---|---|
| `UKGovernmentBEIS/inspect_ai` | Master row 8 / SCORECARD-D §A | 89-90 | **T1 INSTALL — #1 L4-Eval** (already runs in `harness/`) |
| `promptfoo/promptfoo` | Master row 9 / SCORECARD-D §A | 88-90 | **T1 INSTALL** (already runs in `harness/`) |
| `confident-ai/deepeval` | Master row 36 / SCORECARD-D §A | 84-86 | T2 STUDY-PILOT |
| `explodinggradients/ragas` | Master row 38 / SCORECARD-D §A | 82-83 | T3 demand-gated |
| `NVIDIA/garak` | Master row 35 | 84 | T2 STUDY-PILOT (red-team eval) |
| `openai/evals` | LAYER-C §1.1 | — | **SKIP** (NOASSERTION license, dev-slowing, superseded by Inspect AI) |
| `EleutherAI/lm-evaluation-harness` | LAYER-C §1 + §6; §4 per-layer top picks | — | **T1 Tier-A** (academic base-model benchmark reference) |
| `Giskard-AI/giskard-oss` | LAYER-C §1.1 | — | candidate (agent test/red-team) — not scored as a row |
| `truera/trulens` | LAYER-C §1.1 | — | candidate (RAG-tracker, Snowflake) — not scored |
| `EvolvingLMMs-Lab/lmms-eval` | LAYER-C §1.1 | — | candidate (multimodal eval) — not scored |
| `stanford-crfm/helm` | LAYER-C §1.1 | — | candidate (holistic eval) — not scored |
| `sierra-research/tau-bench` + `tau2-bench` | LAYER-C §1.1 + ROUND2 row 55 (`tau2-bench` 83) | 83 | T2 STUDY-PILOT (agent benchmark) |
| `THUDM/AgentBench` | LAYER-C §1.1 + §8.4 | — | SKIP (stagnant) |
| `JudgmentLabs/judgeval` | LAYER-C §1.1 | — | candidate (production eval) — not scored |
| `princeton-nlp/SWE-bench`, `openai/mle-bench`, `openai/SWELancer-Benchmark` | LAYER-C §1.1 | — | benchmark datasets (SWELancer SKIP-stale) |
| `Portkey-AI/hoot` | ROUND2 row 41 | 81 | T2 STUDY-PILOT (MCP test) |

### L4-OBSERVABILITY (tracing / obs)

| Repo | W259 row / location | Composite | Disposition |
|---|---|---|---|
| `arize-ai/phoenix` | Master row 25 / SCORECARD-D §B | 86-87 | **T0-INSTALLED** (incumbent) |
| `langfuse/langfuse` | Master row 10 / SCORECARD-D §B | 87-89 | **T1 INSTALL** |
| `comet-ml/opik` | Master row 30 / SCORECARD-D §B | 86-87 | T2 STUDY-PILOT |
| `Helicone/helicone` | Master row 28 / SCORECARD-D §B | 84-86 | T2 STUDY-PILOT |
| `langchain-ai/langsmith` | SCORECARD-D §B (NEW row) | 66 | **T3 REJECT-FOR-FIT** (proprietary, no self-host) |
| `traceloop/openllmetry` | Master row 45 | 83 | T3 demand-gated (OTel instrumentation) |
| `mlflow/mlflow` | LAYER-C §2.1 | — | candidate (classic ML + LLM) — not scored |
| `pydantic/logfire` | LAYER-C §2.1 | — | candidate (Pydantic-tilt obs) — not scored |
| `lmnr-ai/lmnr` (Laminar) | LAYER-C §2.1 | — | candidate (agent obs, YC S24) — not scored |
| `AgentOps-AI/agentops` | LAYER-C §2.1 + §8.4 | — | SKIP (activity slowing) |
| `wandb/weave` | LAYER-C §2.1 | — | candidate (W&B-tilt) — not scored |
| `Helicone/ai-sdk-provider` | ROUND2 row 44 | 80 | T2 STUDY-PILOT |
| `lunary-ai/lunary` | LAYER-C §2.1 + §8.4 | — | SKIP (sub-significant) |

**Baseline verdict**: the catalog covers the **canonical L4 set thoroughly** — every top-tier eval framework (Inspect AI, promptfoo, DeepEval, Ragas, lm-eval-harness, garak) and every top-tier OSS observability tool (Phoenix, Langfuse, Opik, Helicone, OpenLLMetry, MLflow, Logfire, Laminar, LangSmith) is present, scored or at minimum named-in-LAYER-C with a disposition. Braintrust is correctly noted-and-excluded (closed-source). This is one of the **best-covered layers** in W259.

---

## (b) SOTA repos found via live GitHub discovery — IN-CATALOG / GAP verdict

Star counts are live as of 2026-05-17. "In catalog?" = scored row OR named in `LAYER-C` with a disposition.

| Repo | Stars | License | In W259 catalog? | Verdict |
|---|---:|---|---|---|
| langfuse/langfuse | 27.3k | MIT (core) | YES — master row 10 | IN-CATALOG |
| mlflow/mlflow | 26.0k | Apache-2.0 | YES — LAYER-C §2.1 | IN-CATALOG (named, not row-scored) |
| promptfoo/promptfoo | 21.3k | MIT | YES — master row 9 | IN-CATALOG |
| comet-ml/opik | 19.3k | Apache-2.0 | YES — master row 30 | IN-CATALOG |
| openai/evals | 18.5k | NOASSERTION | YES — LAYER-C §8.4 | IN-CATALOG (correctly SKIP) |
| **raga-ai-hub/RagaAI-Catalyst** | **16.2k** | Apache-2.0 | **NO** | **GENUINE GAP** (agent obs+eval SDK, high-star) |
| confident-ai/deepeval | 15.5k | Apache-2.0 | YES — master row 36 | IN-CATALOG |
| explodinggradients/ragas | 13.9k | Apache-2.0 | YES — master row 38 | IN-CATALOG |
| EleutherAI/lm-evaluation-harness | 12.6k | MIT | YES — LAYER-C §1/§6 | IN-CATALOG (Tier-A) |
| arize-ai/phoenix | 9.7k | Elastic-v2 | YES — master row 25 | IN-CATALOG (incumbent) |
| NVIDIA/garak | 7.8k | Apache-2.0 | YES — master row 35 | IN-CATALOG |
| **evidentlyai/evidently** | **7.5k** | Apache-2.0 | **NO** | **GENUINE GAP** (ML+LLM obs, 100+ metrics, 7y org) |
| traceloop/openllmetry | 7.1k | Apache-2.0 | YES — master row 45 | IN-CATALOG |
| Helicone/helicone | 5.7k | Apache-2.0 | YES — master row 28 | IN-CATALOG |
| coze-dev/coze-loop | 5.5k | Apache-2.0 | NO | CORRECTLY-EXCLUDED (ByteDance Coze-platform-coupled; agent-optimization platform, not a CC-fit primitive) |
| Giskard-AI/giskard-oss | 5.4k | Apache-2.0 | YES — LAYER-C §1.1 | IN-CATALOG (named, not row-scored) |
| **Kiln-AI/Kiln** | **4.8k** | MIT | **NO** | **GENUINE GAP** (eval+RAG+synthetic-data desktop tool; MCP-aware; Windows-native) |
| Marker-Inc-Korea/AutoRAG | 4.8k | Apache-2.0 | NO | CORRECTLY-EXCLUDED (RAG-pipeline AutoML; niche, no CC pathway — even Ragas is only T3 demand-gated here) |
| lm-sys/RouteLLM | 4.9k | Apache-2.0 | YES — LAYER-C §4 | IN-CATALOG (router, SKIP-stale) |
| pydantic/logfire | 4.2k | MIT | YES — LAYER-C §2.1 | IN-CATALOG (named, not row-scored) |
| Agenta-AI/agenta | 4.1k | MIT (Apache for OSS) | NO | CORRECTLY-EXCLUDED (LLMOps platform; overlaps Langfuse/Phoenix on D20; no CC-native surface) |
| truera/trulens | 3.3k | MIT | YES — LAYER-C §1.1 | IN-CATALOG (named, not row-scored) |
| THUDM/AgentBench | 3.4k | Apache-2.0 | YES — LAYER-C §8.4 | IN-CATALOG (correctly SKIP) |
| **langwatch/langwatch** | **3.3k** | MIT (+ EE dir) | **NO** | **GENUINE GAP** (eval + agent-testing platform; DSPy-native; OTel) |
| **ianarawjo/ChainForge** | **3.0k** | MIT | **NO** | **MARGINAL GAP** (visual prompt battle-testing; academic-origin) |
| lmnr-ai/lmnr (Laminar) | 2.9k | Apache-2.0 | YES — LAYER-C §2.1 | IN-CATALOG (named, not row-scored) |
| microsoftarchive/promptbench | 2.8k | MIT | NO | CORRECTLY-EXCLUDED (**ARCHIVED** — moved to `microsoftarchive` org) |
| openlit/openlit | 2.4k | Apache-2.0 | NO | CORRECTLY-EXCLUDED (OTel-native obs; real but overlaps Phoenix+Langfuse+OpenLLMetry on D20; later entrant) |
| uptrain-ai/uptrain | 2.3k | Apache-2.0 | NO | CORRECTLY-EXCLUDED (eval platform; low maintenance velocity — superseded by DeepEval/Ragas) |
| sierra-research/tau-bench | 1.2k | MIT | YES — LAYER-C §1.1 + ROUND2 | IN-CATALOG |
| Scale3-Labs/langtrace | 1.2k | Apache-2.0 | NO | CORRECTLY-EXCLUDED (OTel LLM tracing; overlaps OpenLLMetry/Phoenix; modest velocity) |
| wandb/weave | 1.1k | Apache-2.0 | YES — LAYER-C §2.1 | IN-CATALOG (named, not row-scored) |
| BlazeUp-AI/Observal | 1.1k | (check) | NO | CORRECTLY-EXCLUDED (new 2026-03; HITL obs platform; unproven, no strong org) |
| JudgmentLabs/judgeval | 1.0k | Apache-2.0 | YES — LAYER-C §1.1 + SCORECARD §1 | IN-CATALOG |
| mozilla-ai/any-agent | 1.2k | Apache-2.0 | NO | MARGINAL (agent-framework abstraction w/ eval; Mozilla org) — borderline L2/L4 |
| **Not-Diamond/self-care** | 24 | MIT | **NO** | **GENUINE GAP — native-CC plugin** (low-star but: official Claude Code plugin, ingests CC trace JSON) |
| evilmartians/agent-prism | 344 | MIT | NO | MARGINAL GAP (React trace-viz components; strong org — Evil Martians) |
| traceroot-ai/traceroot | 560 | (check) | NO | CORRECTLY-EXCLUDED (YC S25 but very new/small; agent self-healing obs) |
| relari-ai/continuous-eval | 516 | Apache-2.0 | NO | CORRECTLY-EXCLUDED (low velocity, last push 2026-04; superseded by DeepEval) |

Lower-star tail (`judgeval` peers, `eval-view`, `pandaprobe`, `langeval`, `litmux`, `evalstats`, `vero-eval`, `dokimos`, `every_eval_ever`, dozens of RAG-eval micro-tools <500★) — **correctly excluded**: niche, single-author, or no strong org, per operator directive ("low-star repos rarely matter unless part of a strong org").

---

## (c) Genuine-gap list — scored

Scoring axes: stars · native-CC pathway · license · org-strength · recency · fit-for-this-runtime. 1-10 each; "Fit" weighs harness-relevance (this runtime already runs inspect_ai + promptfoo + Phoenix).

| # | Repo | Stars | Native-CC pathway | License | Org strength | Recency | Fit | Verdict |
|--:|---|---:|---|---|---|---|---|---|
| 1 | **Not-Diamond/self-care** | 24 (2/10) | **10 — official CC plugin** (`/plugin marketplace add Not-Diamond/self-care`; 3 skills, agents, scheduled-task autosync; ingests **Claude Code trace JSON** + LangSmith/Langfuse) | MIT (10) | Not Diamond — funded model-routing startup, named org (6) | 2026-04, MIT, but README says **"not in active development"** (5) | **9 — directly analyses CC agent traces for goal-drift / missed-action / grounding; FM-class-detection overlaps this runtime's verified-avoid discipline** | **GAP — ADD as T2/T3 CITE-PATTERN.** The ONLY genuinely native-CC L4 primitive found. Strong conceptual fit (CC trace QA). Caveat: maintenance-frozen → cite-pattern over hard-install, OR pilot then pin. |
| 2 | **raga-ai-hub/RagaAI-Catalyst** | 16.2k (9/10) | 4 — Python SDK; OpenTelemetry-based tracing → instruments Claude Agent SDK calls; no plugin/MCP | Apache-2.0 (10) | RagaAI — funded AI-testing company (6) | 2026-05 active, 3.6k forks (9) | 6 — agent obs+eval+self-hosted dashboard; overlaps Phoenix/Langfuse (D20) but adds agentic-system debug + execution-graph view | **GAP — ADD as T2 STUDY-PILOT row.** Highest-star uncatalogued L4 repo (16.2k > DeepEval). Genuine omission; merits a scored row even if D20-overlap caps adoption. |
| 3 | **evidentlyai/evidently** | 7.5k (7/10) | 3 — Python lib; no CC-native surface | Apache-2.0 (10) | Evidently AI — established (since 2020) ML-monitoring org (7) | 2026-05 active, 100+ metrics (8) | 5 — ML+LLM obs/testing; broad metric library; overlaps DeepEval on metrics, Phoenix on obs | **GAP (minor) — ADD as named LAYER-C candidate.** Real SOTA tool W259 missed; but no CC pathway → cite-not-install, like trulens/helm. |
| 4 | **Kiln-AI/Kiln** | 4.8k (5/10) | 4 — MCP-aware (lists `mcp` topic); desktop app + Python lib; Windows-native build | MIT (10) | Kiln AI — named org (5) | 2026-05 active (8) | 6 — eval + RAG + synthetic-data + fine-tuning; **Windows-native is a genuine fit-bonus** for this Z:-portable runtime; broad scope dilutes eval focus | **GAP (minor) — ADD as named LAYER-C candidate.** MIT + Windows-native + MCP-aware is a better-than-average fit; worth a pilot note. |
| 5 | **langwatch/langwatch** | 3.3k (4/10) | 3 — OTel ingestion; Python/TS SDK; no plugin/MCP | MIT core (+EE dir) (8) | LangWatch — funded startup (5) | 2026-05 very active (8) | 5 — eval + agent-testing + DSPy-native; overlaps Langfuse/Phoenix/Opik heavily (D20) | **GAP (minor) — note in LAYER-C.** Credible but a 4th obs/eval platform behind Phoenix+Langfuse+Opik; demand-gated at best. |
| 6 | **evilmartians/agent-prism** | 344 (3/10) | 5 — React components for OTel agent-trace visualization; embeddable, not a plugin | MIT (10) | **Evil Martians — strong, well-known dev-tools org** (8) | 2026-05 active (8) | 4 — trace-viz UI library; not a harness primitive but strong-org signal merits a mention | **MARGINAL GAP — note only.** Strong org is the only reason to flag it; not an install candidate (UI-component library). |

**Not gaps** (verified correctly-excluded): `coze-loop` (ByteDance Coze-platform-coupled), `AutoRAG`/`agenta`/`openlit`/`langtrace`/`uptrain`/`continuous-eval` (real tools but D20-overlap with installed Phoenix or superseded — consistent with W259 already gating even Ragas/OpenLLMetry to T3), `promptbench` (ARCHIVED), and the <500★ micro-tool tail.

**Catalogued-but-aging note**: `openai/evals` (NOASSERTION, dev-slowing), `THUDM/AgentBench` (stagnant), `AgentOps` (activity slowing), `RouteLLM` (stale 2024-08) — W259 already flags all four as SKIP/superseded. No correction needed; the catalog's freshness calls are accurate.

---

## (d) DEFINITIVE bottom-line

**Verdict: layer NOT saturated — but very close. 1 high-priority + 3 minor + 2 marginal genuine gaps (6 total).**

The W259 L4-Eval/Obs layer is **one of the best-covered layers in the catalog** — the canonical eval frameworks and OSS observability tools are all present, scored or dispositioned, and the freshness/supersession calls (openai/evals, AgentBench, AgentOps, RouteLLM) are accurate. There is **no missing canonical tool**.

The genuine gaps are:
1. **`raga-ai-hub/RagaAI-Catalyst` (16.2k★, Apache-2.0)** — the **highest-star uncatalogued L4 repo**, out-starring catalogued DeepEval; a real omission deserving a scored T2 row.
2. **`Not-Diamond/self-care` (MIT)** — low-star but the **single genuinely native-CC L4 primitive** in existence: an official Claude Code plugin that analyses CC agent traces for goal-drift/grounding/missed-action. Highest *fit* of any gap despite lowest stars; recommend T2-pilot or T3 cite-pattern (it is maintenance-frozen).
3. **`evidentlyai/evidently`**, **`Kiln-AI/Kiln`**, **`langwatch/langwatch`** — minor gaps: real SOTA-adjacent tools to add as named LAYER-C candidates (Kiln's MIT + Windows-native + MCP-awareness gives it the best fit of the three).
4. **`evilmartians/agent-prism`** — marginal; flag only for strong-org signal.

None of the six changes the layer's install picks (inspect_ai + promptfoo + Phoenix remain the right stack, all three already running). The gaps are **catalog-completeness omissions**, not architecture errors — most acutely RagaAI-Catalyst (a scored-row omission) and self-care (the native-CC-pathway omission the rest of the catalog's D11 emphasis would predict W259 to want).
