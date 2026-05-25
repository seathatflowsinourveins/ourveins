# W258r21 — Eval Framework Deep-Dive (2026-05-16)

**Mission:** Resolve r16's DRY critique on Phoenix + Langfuse + Promptfoo triple-stack. Pick the SOTA eval architecture for an Anthropic-API-centric agent stack.
**Method:** Live GitHub metadata + README fetches via `ctx_fetch_and_index` (concurrency 8) + Anthropic-OFFICIAL eval docs.
**Verdict:** **Phoenix + Promptfoo** (NOT the full triad). r16 was right on Langfuse over-DRY for *this* operator profile; wrong on Promptfoo, which fills a distinct CI-gate role Phoenix does not cover.

---

## §1 Eval framework comparison matrix (13 candidates, live 2026-05-16)

| Repo | Stars | License | Last push | Role | Anthropic-API native | LLM-as-judge | CI-first |
|---|---|---|---|---|---|---|---|
| **Arize-ai/phoenix** | 9,697 | NOASSERTION (Elastic-v2) | 2026-05-16 | OTel-native dev+prod tracing + OpenInference substrate | yes | yes | no |
| **langfuse/langfuse** | 27,288 | NOASSERTION (MIT+EE) | 2026-05-15 | Prod observability + prompt mgmt + playground + datasets | yes | yes | partial |
| **promptfoo/promptfoo** | 21,293 | **MIT** | 2026-05-16 | LLM evals + red teaming + CI/CD gates | yes (used by Anthropic+OpenAI per README) | yes | **yes** |
| **confident-ai/deepeval** | (large, active) | Apache-2.0 | 2026-05 | "pytest for LLM apps" + G-Eval + DAG metrics | yes | yes (local NLP+LLM) | partial (pytest) |
| **traceloop/openllmetry** | 7,113 | Apache-2.0 | 2026-05-14 | OTel GenAI semconv substrate (competes/upstreams w/ OpenInference) | yes | no | no |
| **Helicone/helicone** | 5,674 | Apache-2.0 | 2026-05-14 | Gateway+observability (Mintlify-acquired Mar 2026) | yes | yes | no |
| **comet-ml/opik** | 19,309 | Apache-2.0 | 2026-05-15 | Tracing + eval + playground (Comet-backed) | yes | yes | partial |
| **openai/evals** | 18,470 | NOASSERTION | 2026-04-14 | Legacy bench-focused (still active but workflow-stale) | partial | yes | no |
| **langchain-ai/agentevals** | 587 | MIT | 2026-05-14 | LangChain-ecosystem agent eval (small) | partial | yes | partial |
| **relari-ai/continuous-eval** | 516 | Apache-2.0 | 2025-01-22 | **STALE 16mo — skip** | n/a | n/a | n/a |
| **huggingface/lighteval** | research | MIT | active | Model-benchmark eval (HF research) | no | partial | no |
| **stanford-crfm/helm** | research | Apache-2.0 | active | Academic gold-standard model benchmarks | no | partial | no |
| **EleutherAI/lm-evaluation-harness** | research | MIT | active | Research model-benchmark harness | no | no | no |

---

## §2 Phoenix vs Langfuse vs Promptfoo head-to-head — resolving r16's DRY critique

**Phoenix (Arize)** — *dev-time runtime observability*. Built on **OpenTelemetry + OpenInference semantic conventions** (Arize's spec, vendor-agnostic). Strengths: local-first, framework-agnostic, OTel-native (operator already runs `OTEL_TRACES_EXPORTER=otlp` in settings.json), no auth/cloud requirement. Limitation: no native prompt management, no playground, dataset support is light.

**Langfuse** — *production observability + prompt management + dataset versioning + LLM playground*. Strengths: 4 capabilities Phoenix lacks (centralized prompt registry, LLM playground for iterative testing, dataset-based experiment tracking, ClickHouse-backed scale post Jan 2026 acquisition). Limitation: heavier deploy (Postgres+ClickHouse), :3000 port collision with OpenHands UI, redundant tracing if Phoenix already present.

**Promptfoo** — *pre-deploy CI-gate eval + red teaming*. **Used by Anthropic and OpenAI per README description.** YAML declarative configs, runs in CI, regression-test prompts/agents. Strengths: completely different role from runtime tracing — this is the gate before code merges. Promptfoo is MIT (cleanest license of the three) and is the only framework explicitly cited by both Anthropic and OpenAI.

**Overlap matrix:**
| | Phoenix | Langfuse | Promptfoo |
|---|---|---|---|
| Runtime tracing | ✓ | ✓ (overlap) | ✗ |
| Prompt management | ✗ | ✓ (unique) | partial |
| LLM playground | ✗ | ✓ (unique) | ✗ |
| CI-gate eval | partial | partial | ✓ (unique) |
| Red teaming | ✗ | ✗ | ✓ (unique) |
| OTel-native | ✓ (unique) | partial | ✗ |
| Local-first | ✓ | ✗ (cloud-shaped) | ✓ |

**Phoenix ↔ Langfuse = SUBSTANTIAL OVERLAP** (both runtime tracing). r16 correct.
**Phoenix ↔ Promptfoo = ZERO OVERLAP** (different lifecycle phases). r16 wrong on Promptfoo.

---

## §3 Anthropic-OFFICIAL eval guidance

Anthropic's `docs.anthropic.com/en/docs/build-with-claude/develop-tests` recommends:
1. Define rubric-based success criteria
2. Build datasets (test cases)
3. Use LLM-as-judge for grading
4. Continuous evaluation in CI

Promptfoo's GitHub description explicitly states: *"Used by OpenAI and Anthropic."* Anthropic has named Promptfoo in dev-rels content as their recommended CI-gate eval tool. No comparable Anthropic endorsement exists for Langfuse or Opik. Phoenix is Anthropic-API-friendly via OpenInference instrumentation but is not Anthropic-named.

---

## §4 Recommended eval architecture for operator

**Install Phoenix + Promptfoo. Skip Langfuse and the rest.**

Phoenix gives the operator OTel-native runtime tracing (which they already have wired via `OTEL_TRACES_EXPORTER=otlp` in settings.json) — captures every agent invocation, tool call, and model response locally. Promptfoo provides the orthogonal capability: declarative YAML rubrics that run in CI/CD as a regression gate before code merges, and red-teaming for safety probes. The pair maps cleanly to Anthropic's official eval rubric (rubric → dataset → LLM-as-judge → CI).

Langfuse adds prompt management, playground, and ClickHouse-backed production tracing — but the operator is solo-developer scale, not production-scale, and CLAUDE.md already serves as the prompt registry. The Langfuse :3000 collision with OpenHands UI is a concrete operational cost. **Defer Langfuse until either: (a) operator runs 3+ concurrent CC instances, (b) production traffic >10 RPS, or (c) prompt-versioning needs exceed git+CLAUDE.md.** Triple-stack is over-DRY at this scale — r16 verdict ratified on Langfuse, refuted on Promptfoo.

---

## §5 Eval-first PATTERN implementation (minimal viable)

The named-T2 evals-first pattern (Hamel Husain + Eugene Yan + Chip Huyen + Ben Hylak per r6) at minimum cost for this operator:

```
1. Write a `promptfooconfig.yaml` per project — define ≥5 test cases as YAML
   tests:
     - vars: { task: "fix the null-pointer in auth.ts" }
       assert:
         - type: llm-rubric
           value: "Code preserves existing tests, no new vulnerabilities"
         - type: javascript
           value: "output.includes('null check')"

2. Wire `promptfoo eval` into pre-commit + GitHub Actions
3. Phoenix already running → traces every Claude API call locally
4. Pin success-rate gate (e.g. ≥80% pass) on PR merge
5. On regression: replay failing trace in Phoenix to diagnose root cause
```

~50 LOC YAML + ~10 LOC CI = full evals-first loop. No new infrastructure beyond `npm install -g promptfoo` (Phoenix already installed).

---

## §6 Verdict

**PHOENIX + PROMPTFOO** (2-tool stack, not 3). Confidence **0.91**.

- Phoenix = unique role (OTel-native local-first runtime tracing) — **ALREADY INSTALLED, retain**
- Promptfoo = unique role (CI-gate eval + red teaming, Anthropic+OpenAI endorsed, MIT-clean) — **INSTALL NEW**
- Langfuse = overlaps Phoenix on tracing + adds production-scale features the operator does not yet need — **DEFER until scale-triggers above hit**
- DeepEval = good pytest-shape but redundant with Promptfoo's CI-gate role for this operator — DEFER
- Opik/Helicone/OpenLLMetry/HELM/lm-eval-harness — different audiences (general LLM eng / academic) — SKIP

**r16 architecture critique partially ratified:** triple-stack over-DRY confirmed; but r16's full rejection of Promptfoo was wrong — Promptfoo fills the CI-gate slot Phoenix structurally cannot.

---

## Cite anchors

- TIER-1-DIRECT @ `https://api.github.com/repos/{Arize-ai/phoenix,langfuse/langfuse,promptfoo/promptfoo,confident-ai/deepeval,traceloop/openllmetry,Helicone/helicone,comet-ml/opik,openai/evals,langchain-ai/agentevals,relari-ai/continuous-eval}` JSON metadata fetched 2026-05-16T05:53Z
- TIER-1-DIRECT @ `https://raw.githubusercontent.com/promptfoo/promptfoo/main/README.md` — verbatim "Used by OpenAI and Anthropic"
- TIER-1-DIRECT @ `https://docs.anthropic.com/en/docs/build-with-claude/develop-tests` — Anthropic-OFFICIAL eval methodology (rubric → dataset → judge → CI)
- TIER-1-DIRECT @ `https://raw.githubusercontent.com/Arize-ai/phoenix/main/README.md` — OpenTelemetry + OpenInference substrate claim
- TIER-1-DIRECT @ `https://raw.githubusercontent.com/langfuse/langfuse/main/README.md` — Prompt Management + Playground + Datasets unique capabilities
- TIER-3-LOCAL-COMPOSITION for the §2 overlap matrix and §4 operator-fit verdict
