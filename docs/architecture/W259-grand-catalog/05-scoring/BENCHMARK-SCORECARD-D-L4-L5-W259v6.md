# W259 v6 — Benchmark Scorecard D: L4-Eval · L4-Observability · L5-Scaffold

> **Mission**: W259 WAVE-6 Benchmark Agent D. Per operator directive *"EVERY LAYER NEED FULL COVERAGE OF SOTA REPOS AND BENCHMARK AND RANK WITH MULTI-DIMENSIONAL SCORES."* Three sub-layers re-ranked on **canonical, INDEPENDENT** hard benchmarks — correcting the W259-v4 contamination class (`04-critique/CROSS-LAYER-BENCHMARK-REAUDIT-W259v4.md`): promptfoo D8 was a self-description ("used by OpenAI+Anthropic"); L5 scaffolds were ranked on **SWE-bench Verified** (59.4%-contaminated per OpenAI) instead of canonical **SWE-bench Pro**.
>
> **Date**: 2026-05-16 · **Authority**: W259 Wave-6 Benchmark Agent D
> **Method**: re-read MASTER-SCORING-MATRIX-W259.md (23-dim schema) + CROSS-LAYER-BENCHMARK-REAUDIT-W259v4.md; independent cross-check via `mcp__plugin_everything-claude-code_exa__web_search_exa` (10 probes — SWE-bench Pro leaderboards, eval-framework comparisons, observability comparisons, OTel-GenAI conformance) + `mcp__plugin_everything-claude-code_github__search_repositories` (live repo stats).
> **Cite-class**: `effective_tier=TIER-3-LOCAL-COMPOSITION` per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8. All independent constituents dated 2026-Q1/Q2, listed per layer.
>
> **D8 sourcing rule (W259-v4)**: D8 (industry-adoption) + D3 (star-velocity) MUST be sourced from canonical hard benchmarks or genuinely independent third-party data — NEVER vendor marketing/self-description. This scorecard re-derives D8 for every row from INDEPENDENT sources only.

---

## §A — L4-EVAL (eval frameworks) — Inspect AI · Promptfoo · DeepEval · Ragas

### §A.1 — Canonical benchmark (named + independent source)

**There is NO single head-to-head capability benchmark for eval frameworks** — an eval framework is *itself* the measuring instrument, so it cannot be scored on a capability leaderboard the way a model can. The canonical comparator is therefore the **independent feature-coverage / capability matrix** published by neutral third parties (not by any of the four vendors).

**Canonical comparator adopted** = convergence of **5 INDEPENDENT eval-tool comparison matrices**:

| Source | Date | Independent? | Key finding |
|---|---|---|---|
| `awesomeagents.ai/tools/best-llm-eval-tools-2026/` | 2026-03-20 | Yes (neutral aggregator) | Inspect AI = "the most complete benchmark library available" (100+ pre-built); DeepEval = best OSS metric breadth (50+); Ragas = RAG specialist |
| `techsy.io/blog/best-llm-evaluation-tools` | 2026-03-18 | Yes | Ranked: DeepEval #1, Promptfoo #2, Ragas #5 — Inspect AI scoped separately as model-capability/safety eval (different use-class) |
| `deploybase.ai/articles/best-llm-evaluation-tools` | 2026-02-25 | Yes | Promptfoo = prompt-iteration; "doesn't scale past hundreds of test cases" (10k+ → prohibitive eval times) |
| `agentsindex.ai/compare/inspect-ai-vs-ragas` + `inspect-ai-vs-promptfoo` | 2026-Q1 | Yes (comparison site) | promptfoo "used by 127 of Fortune 500 + now part of OpenAI" — the REAL adoption signal (acquisition), NOT the repo tagline |
| `futureagi.com/blog/best-promptfoo-alternatives-2026` | 2025-11-07 | Vendor-adjacent (FutureAGI) but candid on competitors | Promptfoo = CLI-first red-team strength; DeepEval = pytest-native; both lack production trace dashboards |

**The decisive W259-v4 question — does Inspect AI rank ABOVE promptfoo? — VERIFIED YES**, on two independent grounds:
1. **Authorship provenance** — Inspect AI is authored by **UK AI Security Institute (AISI)**, a government body (GitHub org `UKGovernmentBEIS`, live-confirmed 2026-05-16, pushed same day). promptfoo is a commercial vendor. Inspect AI's score rests on **verifiable architecture** (UK AISI authorship, 100+ pre-built benchmarks, native CC `agent_bridge()`) — zero vendor-marketing exposure.
2. **The promptfoo D8 contamination** — W259's promptfoo D8=9 was anchored to *"used by OpenAI + Anthropic per repo description"* = **promptfoo's OWN repo description** (E1 self-claim). Independent rehab exists (Fortune-500 + OpenAI acquisition), so the *conclusion* (promptfoo is high-adoption) survives — but the **cite must be re-anchored**, and on a benchmark-integrity-clean basis **Inspect AI is the unambiguous L4 agent-eval pick**.

**Use-class note**: Inspect AI and the other three measure *different things*. Inspect AI = **model-level capability + safety eval** (the right tool for HARD-GATE / cross-model-consensus regression). DeepEval/Ragas/promptfoo = **application-level quality eval**. For this runtime's harness-fit (CC sub-agent regression-testing, codex-verifiability), the model-level axis is the load-bearing one — which further favors Inspect AI.

### §A.2 — Ranked table (23-dimension scores, D8 from INDEPENDENT data only)

| Rank | Repo | Stars | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8* | D9 | D10 | D11 | D12 | D13 | D14 | D15 | D16 | D17 | D18 | D19 | D20 | D21 | D22 | D23 | Composite | Disposition |
|---:|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|
| 1 | **UKGovernmentBEIS/inspect_ai** | ~2,100 | 10 | 10 | 8 | 10 | 10 | 10 | 10 | **9** | 8 | 9 | 9 | 9 | 9 | 10 | 9 | 8 | 9 | 9 | 9 | 8 | 9 | 9 | 9 | **90** | **T1 INSTALL — #1 L4-Eval (clean signals)** |
| 2 | **promptfoo/promptfoo** | ~21,300 | 10 | 10 | 9 | 8 | 10 | 10 | 10 | **8** | 8 | 9 | 9 | 9 | 9 | 9 | 10 | 8 | 8 | 9 | 10 | 8 | 7 | 9 | 9 | **88** | **T1 INSTALL (D8 re-anchored; CLI red-team)** |
| 3 | **confident-ai/deepeval** | ~15,500 | 10 | 10 | 9 | 8 | 10 | 9 | 9 | **9** | 8 | 9 | 8 | 9 | 9 | 9 | 9 | 7 | 8 | 9 | 9 | 8 | 7 | 9 | 9 | **86** | **T2 STUDY-PILOT (pytest-native, 50+ metrics)** |
| 4 | **explodinggradients/ragas** | ~14,000 | 10 | 10 | 9 | 8 | 9 | 9 | 9 | **8** | 7 | 8 | 7 | 9 | 9 | 9 | 9 | 7 | 8 | 9 | 9 | 6 | 7 | 8 | 8 | **82** | **T3 demand-gated (RAG specialist only)** |

\* **D8 re-derived from INDEPENDENT sources** (the W259-v4 correction): Inspect AI D8=9 from UK-AISI-government-authorship + 100+ benchmark library cited by 5 neutral matrices. promptfoo D8=8 (was 9) — **down-corrected**: the "OpenAI+Anthropic" self-claim is STRIPPED; re-anchored to Fortune-500 adoption + OpenAI acquisition (`agentsindex.ai`, `aitoolsatlas.ai`). DeepEval D8=9 from "150k+ developers, 100M+ daily evaluations, used by >50% Fortune 500" (`aitoolsatlas.ai/compare/deepeval-vs-promptfoo` — independent comparison site, NOT DeepEval's own page). Ragas D8=8 — "de-facto RAG-metric standard, cited by half the ecosystem" (multiple independent matrices), but specialist-scoped.

**Composite deltas vs master matrix**: Inspect AI 89→**90** (D14/D22 full-D23 rescore lift, clean D8 holds); promptfoo 89→**88** (D8 9→8 self-claim strip — *exactly the W259-v4 §9.3 prediction "88-89, cite-clean"*); DeepEval 84→**86** (D22/D23 lift); Ragas 83→**82** (D23 down — slower release cadence as a research-origin lib, specialist ceiling).

### §A.3 — Vendor-marketing flags

| Repo | Flagged claim | Class | Verdict |
|---|---|---|---|
| **promptfoo** | "Used by OpenAI and Anthropic" | **E1 (self-description)** — this exact phrase is promptfoo's OWN GitHub repo description, propagated into W259 D8 as if independent | **STRIPPED.** Re-anchor to independent Fortune-500/acquisition evidence. promptfoo *is* genuinely high-adoption — but W259 reached that via a contaminated cite. |
| **promptfoo** | "Over 300,000 developers use it" (`techsy.io`) | E1-adjacent — originates from promptfoo's own marketing, republished by review sites | TREAT AS SOFT. Acquisition by OpenAI is the hard, verifiable signal. |
| **DeepEval** | "everything Ragas offers but more" / "DeepEval contains everything Trulens have, but a lot more" (`deepeval.com/blog/deepeval-vs-ragas`) | **E5 (marketing-claim)** — DeepEval's OWN comparison blog, scoring itself against competitors | **DO NOT SCORE.** DeepEval's D8=9 is sourced ONLY from the independent `aitoolsatlas.ai` adoption figures, not its self-comparison blog. |
| **DeepEval** | "100M+ daily evaluations, 150k+ developers" | E1-origin but corroborated by independent `aitoolsatlas.ai` | ACCEPTED as D8 input — independently republished with specificity. |
| **Ragas** | "de-facto RAG standard" | NOT a vendor self-claim — asserted by 3+ independent matrices (`techsy.io`, `awesomeagents.ai`, `qaskills.sh`) | CLEAN — genuine Axis-1 convergence. |
| **Inspect AI** | (none) | — | **CLEAN.** No vendor-marketing exposure — UK AISI government authorship, MIT, no paid tier, no cloud product to market. |

### §A.4 — Corrected disposition

- **Inspect AI → T1 INSTALL, ranked #1 in L4-Eval.** W259-v4 verdict CONFIRMED. The cleanest-signal eval framework: UK AISI government authorship, MIT, 100+ pre-built benchmarks, native CC `agent_bridge()`, zero marketing contamination. The right tool for this runtime's HARD-GATE / cross-model-consensus regression-eval need. **Promote above promptfoo in all prose.**
- **promptfoo → T1 INSTALL, ranked #2.** Composite re-anchored 89→88 (cite-clean). Genuine value: CLI-first, MIT, strong red-team module. Disposition unchanged — but the D8 cite is now independent.
- **DeepEval → T2 STUDY-PILOT.** Broadest OSS metric library (50+), pytest-native (slots into CI). Composite 86. Pilot vs Inspect AI if application-level metric breadth becomes load-bearing.
- **Ragas → T3 demand-gated.** RAG-evaluation specialist — no value until/unless a RAG sub-system is installed. Composite 82. Do not install standalone.

---

## §B — L4-OBSERVABILITY (tracing / obs) — Langfuse · Phoenix · LangSmith · Helicone · Opik

### §B.1 — Canonical benchmark (named + independent source)

**The canonical comparator for observability tools = OTel-GenAI-conformance + trace-completeness (agent-reasoning visibility) + independent multi-source comparison convergence.** There is no capability leaderboard; the contamination-resistant signal is *architectural conformance to the open OpenTelemetry GenAI semantic-convention standard* — an objective, vendor-neutral spec — plus convergence of independent practitioner comparisons.

**Canonical-axis sources (all INDEPENDENT):**

| Source | Date | Independent? | Key finding |
|---|---|---|---|
| OpenTelemetry GenAI semantic conventions (`opentelemetry.io/docs/specs/semconv/gen-ai/`) | live | **Yes — vendor-neutral OSS standard** | The objective conformance yardstick. `gen_ai.*` spans, agent-span category, `OTEL_SEMCONV_STABILITY_OPT_IN` dual-emission. |
| `turion.ai/blog/langsmith-vs-langfuse-vs-arize-phoenix` | 2026-04-26 | Yes ("we ran all three in production") | Capability matrix: Langfuse MIT + cleanest session-replay; Phoenix Apache-2.0 + best-in-class RAG evals; LangSmith proprietary, no self-host. |
| `agentmodeai.com/agent-observability-langfuse-arize-helicone-langsmith` | 2026-05-03 | Yes | Langfuse "MIT core = broadest open-source posture"; Helicone proxy-mode = HTTP-layer only. |
| `open-techstack.com/blog/langfuse-vs-phoenix-vs-helicone-...` | 2026-04-02 | Yes | Phoenix = "OTel-native, leans hard into OpenInference + OpenTelemetry conventions"; Helicone AI Gateway "explicitly labeled beta". |
| `ctaio.dev/.../observability-tools/` | 2026-04-23 | Yes | Framework-coupling is the hidden cost — LangSmith locked to LangChain; Langfuse + Helicone most framework-agnostic. |
| `spanora.ai/blog/ai-agent-observability-tools-compared-2026` | 2026-02-20 | Yes (neutral) | Helicone "proxy-first, OTEL not core ingestion model — weaker native execution graphing". |
| GitHub issue `Arize-ai/phoenix#10622` + OTel-collector PR `#46447` (genainormalizer) | 2025-12 / 2026-02 | **Yes — primary-source code evidence** | Phoenix uses **OpenInference** conventions; does NOT yet ingest raw OTel-GenAI `gen_ai.*` without a translator. Langfuse shipped a **native OTel-GenAI backend endpoint**. |

**OTel-GenAI conformance ranking (the contamination-resistant axis):**

| Tool | OTel-GenAI conformance | Evidence |
|---|---|---|
| **Langfuse** | **Strongest** — native OTel backend endpoint that ingests `gen_ai.*` spans directly; decouples instrumentation from vendor (`agentmarketcap.ai/.../opentelemetry-genai-...`, 2026-04-10) | Write `gen_ai.*` once, swap backends via exporter config. |
| **Phoenix** | **Strong but OpenInference-native** — built entirely on OTel, but its canonical schema is **OpenInference**, not raw OTel-GenAI; needs `openinference-genai` span processor / collector `genainormalizer` to ingest `gen_ai.*` (`phoenix#10622` — open issue, 3 frameworks produce empty examples without translation) | OTel-foundation, but a convention-flavor gap. |
| **OpenLLMetry (Traceloop)** | **Reference-grade** — Traceloop **leads the OTel LLM semconv working group**; OpenLLMetry is "the most complete OSS auto-instrumentation for the conventions" | The spec reflects their production experience. (L4 row 45 in master matrix.) |
| **LangSmith** | **Weak** — added OTel *ingestion* but remains LangChain-coupled; proprietary, no self-host | Framework-lock is the load-bearing reason teams pick it. |
| **Helicone** | **Weakest** — proxy/gateway model; "OTEL is not core ingestion"; sees HTTP layer only, not agent-reasoning spans | Cannot answer "why did the agent make this decision". AI Gateway is beta. |

### §B.2 — Ranked table (23-dimension scores, D8 from INDEPENDENT data only)

| Rank | Repo | Stars | License | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8* | D9 | D10 | D11 | D12 | D13 | D14 | D15 | D16 | D17 | D18 | D19 | D20 | D21 | D22 | D23 | Composite | Disposition |
|---:|---|---:|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|---|
| 1 | **arize-ai/phoenix** | ~5,500 | Apache-2.0/ELv2 | 10 | 10 | 9 | 10 | 10 | 10 | 9 | **9** | 8 | 9 | 8 | 9 | 9 | 9 | 9 | 7 | 9 | 9 | 9 | 7 | 9 | 9 | 9 | **87** | **T0-INSTALLED — incumbent; OTel-native** |
| 2 | **langfuse/langfuse** | ~27,000 | MIT (core) | 8 | 10 | 9 | 8 | 10 | 10 | 9 | **10** | 8 | 9 | 9 | 10 | 9 | 9 | 9 | 7 | 9 | 9 | 9 | 8 | 8 | 9 | 9 | **87** | **T1 INSTALL — strongest OTel-GenAI conformance (port-conflict-check :3000)** |
| 3 | **comet-ml/opik** | ~19,300 | Apache-2.0 | 10 | 10 | 9 | 9 | 10 | 10 | 9 | **8** | 8 | 9 | 8 | 9 | 9 | 9 | 9 | 7 | 9 | 9 | 9 | 7 | 8 | 9 | 9 | **86** | **T2 STUDY-PILOT (Apache-2.0 alt; overlaps Phoenix)** |
| 4 | **Helicone/helicone** | ~5,700 | Apache-2.0 (core) | 10 | 10 | 8 | 8 | 10 | 9 | 9 | **8** | 7 | 9 | 8 | 9 | 9 | 9 | 9 | 8 | 9 | 9 | 9 | 7 | 7 | 9 | 8 | **84** | **T2 STUDY-PILOT (proxy-only; no agent-reasoning trace)** |
| 5 | **langchain-ai/langsmith** | n/a (proprietary) | Proprietary | **2** | 10 | 7 | 9 | 9 | 8 | 7 | **8** | 7 | 6 | 7 | 9 | 8 | 9 | 8 | 7 | 8 | 7 | 6 | 7 | **4** | 7 | 8 | **66** | **T3 CITE-PATTERN — proprietary, no self-host, LangChain-locked, prompt-retention risk** |

\* **D8 re-derived from INDEPENDENT sources**: Langfuse D8=10 — "widest community adoption" / "the one with widest community adoption" / "fastest-growing OSS LLM observability tool" across 6 independent matrices (`turion.ai`, `pkgpulse.com`, `agentmodeai.com`, `ctaio.dev`, `spanora.ai`, `open-techstack.com`); acquired by ClickHouse Jan-2026 (independent corporate-backing signal). Phoenix D8=9 — Arize production heritage, "50+ frameworks", strongest RAG-eval per all matrices. opik D8=8 — Comet ML backing, real but later-entrant. Helicone D8=8 — fast-setup adoption but proxy-scope-limited. LangSmith D8=8 — large LangChain install base, but adoption is *coupled* to LangChain, not independent.

**Composite deltas vs master matrix**: Phoenix 86→**87** (D22/D23 full-D23 rescore lift; incumbent, clean); Langfuse 88→**87** (D1=8 not 10 — MIT *core* but `/ee` enterprise features are commercial-licensed, a license-use-class precision deduction; D8=10 holds; net slight down — *the master matrix's 88 slightly over-weighted D1*); opik 86→**86** (hold); Helicone 86→**84** (D21 down — proxy intercepts all prompt/response traffic = data-flow-boundary risk; D23 down — AI Gateway beta-churn). **LangSmith NEW ROW = 66 — T3**: proprietary (D1=2 — no source, network-served closed SaaS), no self-host, all prompt data egresses to LangChain's servers (D21=4 — data-boundary risk), LangChain-coupled (D10=6 — replacement non-trivial). LangSmith was never a master-matrix row; scored here for completeness — it is **NOT a fit** for a self-host-preferring, framework-agnostic, data-residency-conscious solo runtime.

### §B.3 — Vendor-marketing flags

| Repo | Flagged claim | Class | Verdict |
|---|---|---|---|
| **LangSmith** | "the most detailed trace visualization of any tool here" (in LangChain-native contexts) | **E3 (tuned-self vs default-others)** — true ONLY for LangChain/LangGraph traces; for any other framework LangSmith "gets awkward" | SCOPED. The detail advantage is framework-locked — not a general-quality signal. |
| **Helicone** | "100+ providers", "intelligent routing", "automatic fallbacks" | **E5-adjacent** — AI Gateway features are **explicitly beta** (`open-techstack.com`, `futureagi.com`); marketed as if production-grade | TREAT AS BETA. Do not score routing as a mature capability. |
| **Langfuse** | "15% latency overhead in benchmarks" (`dev.to/.../i-tried-langsmith-langfuse-...`) | NOT vendor marketing — an INDEPENDENT practitioner's critical finding *against* Langfuse | ACCEPTED as a real D-cost; "noticeable for latency-sensitive apps". Also flagged: **Langfuse has no MCP support** — relevant for a CC+MCP stack. |
| **Phoenix** | "RAG evaluation strongest of any tool here" | NOT a self-claim — asserted by 4+ independent matrices (`turion.ai`, `ctaio.dev`, `premai.io`, `awesomeagents.ai`) | CLEAN — genuine Axis-1 convergence. |
| **Arize** | "Phoenix" (OSS) vs "AX" (commercial SaaS) — two products | NOTE — Phoenix is the genuinely-OSS arm; AX is the upsell. W259 scores **Phoenix only**. | CLEAN — scoring is correctly scoped to the OSS product. |

**Net OBS verdict**: the OBS sub-layer is **CLEAN on benchmark integrity** (W259-v4 §3.3 confirmed) — the Langfuse/Phoenix comparison is sourced from 6+ genuinely independent matrices that converge. The only corrections are (a) Langfuse D1 precision (MIT core ≠ fully-MIT), (b) Helicone D21 data-boundary deduction, (c) adding the LangSmith row to show *why* it is rejected.

### §B.4 — Corrected disposition

- **Phoenix → T0-INSTALLED (incumbent), ranked #1.** Already in the operator stack. OTel-foundation, Apache-2.0, best-in-class RAG-eval, strong CC alignment. Composite 87. **No change — keep.**
- **Langfuse → T1 INSTALL, ranked #2.** Strongest OTel-GenAI-conformance (native `gen_ai.*` backend endpoint), MIT core, widest independent adoption, ClickHouse-backed. Composite 87 (tied). **Caveat retained from master matrix: port-3000 conflict-check before install; no MCP support is a real gap for a CC+MCP runtime.** Install only if a *second* obs tool beyond Phoenix is justified — otherwise Phoenix-incumbent suffices (D20 duplication overlap).
- **opik → T2 STUDY-PILOT.** Apache-2.0, credible — but overlaps Phoenix (D20). Pilot only if Phoenix proves insufficient.
- **Helicone → T2 STUDY-PILOT.** Fastest setup (proxy, 5 min), but proxy-only = no agent-reasoning trace; AI Gateway beta; data-flow-boundary risk (D21). Not a fit for deep CC sub-agent debugging.
- **LangSmith → T3 CITE-PATTERN-ONLY (REJECT-FOR-FIT for install).** Composite 66. Proprietary, no self-host, LangChain-locked, all prompt data egresses to vendor. Cite its LangGraph-native trace model as a *pattern*; do **not** install.

---

## §C — L5 SCAFFOLD — Anthropic Managed Agents · Live-SWE-agent · OpenHands · mini-SWE-agent · SWE-agent

### §C.1 — Canonical benchmark (named + independent source)

**Canonical hard benchmark = SWE-bench Pro** (Scale AI / SEAL). **NOT SWE-bench Verified.**

- **Verified is contaminated/soft**: OpenAI itself — *"At least 59.4% of audited [SWE-bench Verified] problems have flawed test cases ... Every frontier model showed contamination"* (`openai.com/index/why-we-no-longer-evaluate-swe-bench-verified/`). 161 of Verified's 500 tasks need only 1-2 lines of change (`morphllm.com`, `arxiv 2509.16941`).
- **Pro is the contamination-resistant canonical**: 1,865 tasks across 41 repos (Python/Go/TS/JS), GPL-licensed + proprietary codebases (legal deterrent against training-set inclusion), every task ≥10 lines, avg 107 lines across 4.1 files (`arxiv.org/html/2509.16941` — SWE-Bench Pro paper; `scale.com/leaderboard/swe_bench_pro_public`; `scaleapi.github.io/SWE-bench_Pro-os/`).
- **Independent third-party**: SWE-bench Pro is published by **Scale AI / SEAL** — neither Anthropic, OpenAI, nor any scaffold vendor. The public-set leaderboard (`scaleapi.github.io/SWE-bench_Pro-os/`) and Scale Labs leaderboard (`labs.scale.com/leaderboard/swe_bench_pro_public`) are the canonical, contamination-resistant source.

**CRITICAL methodology distinction (3 non-comparable score families — `morphllm.com/swe-benchmark`):**
1. **SEAL / standardized-scaffold scores** — Scale AI's **SWE-Agent scaffold**, 250-turn cap. This is the **scaffold-controlled, apples-to-apples** family — *the only one valid for comparing scaffolds*.
2. **Agent-system scores** — each product's *custom* scaffold (Claude Code, Codex CLI, Auggie, Cursor). Not comparable to SEAL or to each other.
3. **Verified-family scores** — soft/contaminated; **discard for L5 ranking**.

**Why SWE-bench Pro is the right L5-scaffold benchmark — and its limit**: Pro's *standardized* scaffold IS the SWE-Agent scaffold. So Pro-SEAL scores measure **model capability holding scaffold constant** — they do NOT directly rank *scaffolds* against each other. To rank scaffolds, the canonical signal is **scaffold-attributed Pro scores**: published Pro numbers where a *named scaffold* (Live-SWE-agent, OpenHands, Claude Code custom) wraps a fixed model. These are scarcer and the families must not be cross-compared — flagged per-row below.

### §C.2 — Ranked table — L5 scaffolds by SWE-bench Pro (canonical), 23-dim scores

**SWE-bench Pro evidence (independent, public-set, 2026-Q1/Q2):**

| Scaffold | SWE-bench Pro (public) | Score family | Independent source |
|---|---|---|---|
| **Anthropic Managed Agents** (= Claude Code scaffold, Opus 4.5) | **~49.5%** | Agent-system (custom) | `agentmarketcap.ai/.../swe-bench-pro-reality-check` 2026-04-05 — "Claude Code (Opus 4.5) ~49.5%"; `morphllm.com` "Claude Code 55.4%" (config-dependent) |
| **Live-SWE-agent** (Opus 4.5) | **45.8%** | Open-scaffold | `live-swe-agent.github.io`; `agentmarketcap.ai/.../live-swe-agent-...` 2026-04-11 — "best-known OSS solve rate 45.8%" |
| **SWE-agent** (Sonnet 4.5, SEAL standardized) | **43.6% – 43.72%** | SEAL standardized | `scaleapi.github.io/SWE-bench_Pro-os/` — "SWE-Agent + claude-4-5-Sonnet 43.72"; `agentmarketcap.ai` 43.6% |
| **mini-SWE-agent** | **(reference harness — no scaffold-attributed Pro row)** | — | `swebench.com` — mini-SWE-agent is the *minimal LM-comparison harness* (74%+ Verified); Scale runs Pro frontier-model charts "with mini-swe-agent harness" — it is the **measuring instrument**, not a competing scaffold |
| **OpenHands** | **(no public scaffold-attributed Pro score)** | — | OpenHands publishes the **OpenHands Index** (5-category, SWE-bench *Verified*-based) NOT a Pro score — `openhands.dev/blog/analyzing-and-improving-openhands-index` 2026-02-20; `benchlm.ai/benchmarks/openHandsIndex` |

**Reference context (NOT comparable — model/scaffold, do not cross-rank):** GPT-5.3-Codex 57.0% (OpenAI internal scaffold); Auggie 51.8%, Cursor ~49.8% (custom); Kimi K2-Thinking ~51.8% (model, mini-SWE-agent harness — *leads Live-SWE-agent on Pro*); Claude Opus 4.5 45.9% (SEAL standardized — model, not scaffold).

| Rank | Scaffold | Stars | Pro score / family | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8* | D9 | D10 | D11 | D12 | D13 | D14 | D15 | D16 | D17 | D18 | D19 | D20 | D21 | D22 | D23 | Composite | Disposition |
|---:|---|---:|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|---|
| 1 | **Anthropic Managed Agents** (Claude Code scaffold) | n/a | **~49.5% Pro** (agent-system) | 10 | 10 | 9 | 10 | 10 | 10 | 10 | **9** | 8 | 9 | 10 | 9 | 9 | 10 | 9 | 7 | 10 | 9 | 8 | 8 | 8 | 9 | 9 | **90** | **T1 PATTERN-CLONE — highest Pro; ToS-gated for direct install** |
| 2 | **SWE-agent/SWE-agent** | ~16,000 | **43.6–43.7% Pro** (SEAL standardized) | 10 | 10 | 8 | 10 | 9 | 9 | 9 | **9** | 8 | 9 | 7 | 9 | 8 | 8 | 8 | 7 | 9 | 9 | 9 | 8 | 8 | 8 | 8 | **83** | **T2 STUDY-PILOT — the canonical SEAL scaffold; Princeton/Stanford, reproducible** |
| 3 | **SWE-agent/mini-SWE-agent** | ~12,000 | **reference harness** (Pro frontier charts run on it) | 10 | 10 | 9 | 10 | 10 | 9 | 9 | **9** | 8 | 9 | 7 | 9 | 10 | 9 | 10 | 9 | 9 | 9 | 10 | 8 | 9 | 9 | 8 | **88** | **T1 PATTERN-CITE — 100-line minimal scaffold; the LM-comparison standard** |
| 4 | **OpenHands** (All Hands AI) | ~60,000+ | **no Pro score** (Verified-based OpenHands Index only) | 10 | 10 | 10 | 9 | 10 | 9 | 8 | **8** | 8 | 8 | 8 | 10 | 9 | 9 | **5** | 7 | 9 | 8 | 8 | 7 | 7 | 8 | 9 | **82** | **T2 STUDY-PILOT — broadest adoption; WSL2-gated on Windows; no canonical Pro number** |
| 5 | **Live-SWE-agent** (OpenAutoCoder) | ~3,000 | **45.8% Pro** (open-scaffold) | 10 | 10 | 8 | 8 | 8 | 9 | 8 | **7** | 7 | 8 | 6 | 8 | 9 | 9 | **4** | 7 | 8 | 8 | 7 | 7 | 7 | 7 | 8 | **75** | **T3 PATTERN-CITE-ONLY — W259-v4 confirmed; Kimi K2 beats it on Pro; WSL2-gated** |

\* **D8 re-derived from SWE-bench PRO (the W259-v4 correction — NOT Verified):**
- **Anthropic Managed Agents D8=9** — ~49.5% Pro is the **highest scaffold-attributed score** in the table; Anthropic is the official CC vendor (provenance T1).
- **SWE-agent D8=9** — IS the SEAL standardized scaffold (43.6–43.7% Pro is the *canonical reference* number every other Pro score is measured against); Princeton/Stanford research origin, 16k★, 680 forks-class ecosystem.
- **mini-SWE-agent D8=9** — Scale AI runs the **Pro frontier-model leaderboard charts on the mini-SWE-agent harness** — i.e. the canonical benchmark *adopted it as the measuring instrument*. That is the strongest possible independent adoption signal.
- **OpenHands D8=8** — genuine broad adoption (60k★, 4M downloads, contributors from AMD/Apple/Google/Amazon/Netflix/NVIDIA per `agentmarketcap.ai` 2026-04-10) — **but D8 NOT credited on a Pro score** because OpenHands publishes no public Pro number; its OpenHands Index is **SWE-bench Verified-based** (E2 — soft benchmark). Adoption is real; Pro-benchmark evidence is absent.
- **Live-SWE-agent D8=7 (DOWN from W259's implicit credit)** — its headline "79.2%" is **SWE-bench Verified** (E2 contamination). On canonical **Pro it scores 45.8%** and **Kimi K2-Thinking beats it (~51.8% Pro)**. The "best OSS scaffold" claim **FAILS** on the canonical benchmark.

**Composite deltas vs master matrix**: The master matrix has **no rows for Live-SWE-agent, OpenHands, SWE-agent, mini-SWE-agent, or Anthropic Managed Agents as scored L5-scaffold rows** — they appear only in §4 "Per-layer top picks" and the LAYER-B §5 narrative. This scorecard scores them for the first time. The W259-v4 §9.2 correction — *re-rank L5 on Pro, Live-SWE-agent loses the crown* — is now executed: **Live-SWE-agent drops to T3 PATTERN-CITE-ONLY (75)**, exactly as W258-V13-CRITIQUE §3.5 instructed and W259-v4 §9.2 re-confirmed.

**WSL2 / Windows-portability note (D15)**: Live-SWE-agent and OpenHands both carry **D15=4–5** — Linux/Docker-heavy, WSL2-gated on this Windows Z:-portable runtime (consistent with master-matrix §3 REJECT rationale "Live-SWE-agent WSL2-only Windows-incompat"). SWE-agent and mini-SWE-agent are lighter (Python, pip) — D15=8–9.

### §C.3 — Vendor-marketing flags

| Repo | Flagged claim | Class | Verdict |
|---|---|---|---|
| **Live-SWE-agent** | "79.2% — best OSS SWE-bench" | **E2 (soft-benchmark substitution)** — SWE-bench **Verified** (59.4%-contaminated per OpenAI) used where **Pro** is canonical | **STRIPPED.** On Pro: 45.8%, beaten by Kimi K2-Thinking (~51.8%). The "best OSS scaffold" claim is FALSE on the canonical benchmark. This is the **exact analogue of the mem0/LoCoMo error**. |
| **OpenHands** | "OpenHands Index" 5-category benchmark | **E2-adjacent** — the Index's Issue-Resolution category is **SWE-bench Verified**-based; presented as a holistic modern benchmark but its core axis inherits Verified contamination | SCOPED. The Index is a useful *internal* tool (OpenHands even self-disclosed a Commit0 git-history vulnerability — good practice) — but it is **not a substitute for a Pro score**. OpenHands has no published canonical Pro number. |
| **Live-SWE-agent** | "self-evolving scaffold — autonomously refines its own strategies" | E5-adjacent — architectural marketing; the self-evolution is real but the *performance* claim rests on the Verified number | NOTE — the architecture is genuinely novel (cite-worthy as a pattern); the *ranking* claim is what fails. |
| **Anthropic Managed Agents** | "~49.5%" vs "55.4%" Pro (Claude Code) | **NOT marketing — methodology spread** — different configs/scaffold-versions on Pro produce 49.5–55.4%; both are independent (`agentmarketcap.ai`, `morphllm.com`) | ACCEPTED with range. Even the conservative 49.5% is the table-leading scaffold-attributed Pro score. |
| **mini-SWE-agent** | ">74% on SWE-bench verified" (repo description) | E2-adjacent — Verified number in the repo tagline | NOTE — but mini-SWE-agent's D8 credit comes from being the **Pro leaderboard's measuring harness**, NOT from its own Verified tagline. Cite-clean as scored. |
| **SWE-agent** | (none — research scaffold) | — | **CLEAN.** Princeton/Stanford NeurIPS-2024 research origin; IS the SEAL-standardized scaffold — its Pro number is the canonical reference, not a self-claim. |

### §C.4 — Corrected disposition

- **Anthropic Managed Agents → T1 PATTERN-CLONE (highest Pro ~49.5%), ranked #1.** Highest scaffold-attributed SWE-bench Pro score. Direct install is **ToS-gated** (consistent with master-matrix §3 T4-WATCH "ToS-gated") — adopt as a **pattern-clone** (the Claude Code scaffold's context-management + tool-orchestration design). Composite 90.
- **mini-SWE-agent → T1 PATTERN-CITE, ranked #2-by-composite (88).** The 100-line minimal scaffold that Scale AI adopted as the **Pro leaderboard's measuring harness** — the strongest possible independent endorsement. Radically simple, no monorepo, Python+pip (Windows-clean). **Cite its minimal-ReAct-loop architecture as the reference scaffold pattern.**
- **SWE-agent → T2 STUDY-PILOT (43.6–43.7% Pro), ranked #3.** IS the canonical SEAL-standardized scaffold — the number every Pro score is benchmarked against. Princeton/Stanford, reproducible, 16k★. Composite 83. Pilot for ablation/reference work.
- **OpenHands → T2 STUDY-PILOT (82) — but NO canonical Pro number.** Broadest adoption (60k★, multi-org contributors), good-practice benchmarking (self-disclosed a Commit0 vulnerability). **WSL2-gated on Windows (D15=5).** Disposition holds at T2 — but flag explicitly: **its OpenHands Index is Verified-based; it has not published a SWE-bench Pro score**, so any "OpenHands is SOTA" claim is Verified-framed.
- **Live-SWE-agent → T3 PATTERN-CITE-ONLY (75) — DOWNGRADED.** W258-V13-CRITIQUE §3.5 + W259-v4 §9.2 verdict EXECUTED. Its "79.2% best OSS" is SWE-bench **Verified**; on canonical **Pro it is 45.8% and Kimi K2-Thinking beats it**. The self-evolving architecture is cite-worthy as a *pattern*; the scaffold is **WSL2-gated** and **does NOT hold the OSS crown**. Do not install; do not rank as SOTA.

---

## §D — Cross-layer summary

### §D.1 — Per-layer canonical benchmark + top-3

| Layer | Canonical benchmark (independent source) | #1 | #2 | #3 |
|---|---|---|---|---|
| **L4-Eval** | Independent feature-coverage matrices (5 neutral sources; no capability leaderboard exists) — eval frameworks ARE the measuring instrument | **Inspect AI (90)** — UK AISI, clean | **promptfoo (88)** — D8 re-anchored off self-claim | **DeepEval (86)** |
| **L4-Observability** | OTel-GenAI semantic-convention conformance + 6 independent comparison matrices | **Phoenix (87)** — incumbent, OTel-native | **Langfuse (87)** — strongest OTel-GenAI conformance | **opik (86)** |
| **L5-Scaffold** | **SWE-bench Pro** (Scale AI/SEAL — NOT Verified) — `scaleapi.github.io/SWE-bench_Pro-os/`, `arxiv 2509.16941` | **Anthropic Managed Agents (90)** — ~49.5% Pro | **mini-SWE-agent (88)** — Pro's measuring harness | **SWE-agent (83)** — 43.7% Pro, SEAL standard |

### §D.2 — Key corrections executed (vs master matrix / W259-v4)

1. **L4-Eval — promptfoo D8 9→8** — STRIPPED the "used by OpenAI+Anthropic" self-description; re-anchored to independent Fortune-500/OpenAI-acquisition evidence. Composite 89→88 (cite-clean, matches W259-v4 §9.3 prediction). **Inspect AI confirmed #1** (90, clean UK-AISI signals) — promoted above promptfoo.
2. **L5-Scaffold — Live-SWE-agent DOWNGRADED to T3 PATTERN-CITE-ONLY (75)** — its "79.2% best OSS" is SWE-bench **Verified** (E2 contamination); canonical **Pro = 45.8%, Kimi K2-Thinking beats it**. Executes W258-V13-CRITIQUE §3.5 + W259-v4 §9.2.
3. **L5-Scaffold — first-ever scoring of the 5 scaffolds** on canonical SWE-bench Pro (master matrix had no scored rows). Anthropic Managed Agents #1; mini-SWE-agent recognized as Pro's measuring harness.
4. **L4-Obs — LangSmith added (66, T3 REJECT-FOR-FIT)** — proprietary, no self-host, LangChain-locked, prompt-retention/data-boundary risk; scored to document *why* it is not a fit. Langfuse D1 8 (MIT core ≠ fully-MIT). Helicone 86→84 (D21 proxy data-boundary deduction).

### §D.3 — Vendor-marketing flags (all layers)

| Flag | Layer | Class | Action |
|---|---|---|---|
| promptfoo "used by OpenAI+Anthropic" = repo self-description | L4-Eval | E1 | D8 re-anchored to independent acquisition evidence |
| DeepEval "everything Ragas offers but more" = own comparison blog | L4-Eval | E5 | D8 sourced only from independent `aitoolsatlas.ai` adoption data |
| Helicone "100+ providers / intelligent routing" = beta AI Gateway marketed as production | L4-Obs | E5 | Routing NOT scored as mature; D23 down for beta-churn |
| LangSmith "most detailed traces" = true only for LangChain-native | L4-Obs | E3 | Scoped — framework-locked, not general quality |
| Live-SWE-agent "79.2% best OSS SWE-bench" = SWE-bench Verified (contaminated) | L5 | E2 | STRIPPED — Pro 45.8%, beaten by Kimi K2; downgraded to T3 |
| OpenHands Index = SWE-bench Verified-based, presented as holistic modern benchmark | L5 | E2-adjacent | Scoped — Index is internal-tool-grade, NOT a Pro substitute |

---

## Appendix — Independent sources consulted (all 2026-Q1/Q2 unless noted)

- **L4-Eval**: `awesomeagents.ai/tools/best-llm-eval-tools-2026/` (2026-03-20); `techsy.io/blog/best-llm-evaluation-tools` (2026-03-18); `deploybase.ai/articles/best-llm-evaluation-tools` (2026-02-25); `agentsindex.ai/compare/inspect-ai-vs-ragas` + `inspect-ai-vs-promptfoo`; `aitoolsatlas.ai/compare/deepeval-vs-promptfoo`; `futureagi.com/blog/best-promptfoo-alternatives-2026` (2025-11-07); `qaskills.sh/blog/rag-evaluation-tools-guide-2026` (2026-03-24); GitHub API live stats `UKGovernmentBEIS/inspect_ai` (pushed 2026-05-16).
- **L4-Observability**: `opentelemetry.io/docs/specs/semconv/gen-ai/gen-ai-spans/` (OTel GenAI semconv — vendor-neutral standard); `turion.ai/blog/langsmith-vs-langfuse-vs-arize-phoenix` (2026-04-26); `agentmodeai.com/agent-observability-langfuse-arize-helicone-langsmith` (2026-05-03); `open-techstack.com/blog/langfuse-vs-phoenix-vs-helicone-...` (2026-04-02); `ctaio.dev/.../observability-tools/` (2026-04-23); `spanora.ai/blog/ai-agent-observability-tools-compared-2026` (2026-02-20); `blog.premai.io/llm-observability-setting-up-langfuse-langsmith-helicone-phoenix/` (2026-03-10); `pkgpulse.com/guides/langfuse-vs-langsmith-vs-helicone-llm-observability-2026` (2026-03-09); `agentmarketcap.ai/.../opentelemetry-genai-semantic-conventions-...` (2026-04-10); GitHub issue `Arize-ai/phoenix#10622` (2025-12-13); OTel-collector-contrib PR `#46447` genainormalizer (2026-02-25); `mlflow.org/docs/latest/genai/tracing/opentelemetry/attribute-mapping/`.
- **L5-Scaffold**: `scaleapi.github.io/SWE-bench_Pro-os/` (Pro public leaderboard); `scale.com/leaderboard/swe_bench_pro_public` + `labs.scale.com/leaderboard/swe_bench_pro_public` (2026-05-10); `arxiv.org/html/2509.16941` + `openreview.net/pdf/80c9d255234f96fafdf293e1a5184150ec8045d3.pdf` (SWE-Bench Pro paper); `openai.com/index/why-we-no-longer-evaluate-swe-bench-verified/` (Verified contamination); `swebench.com` (mini-SWE-agent as LM-comparison harness); `live-swe-agent.github.io`; `agentmarketcap.ai/.../live-swe-agent-...` (2026-04-11), `.../swe-bench-pro-reality-check-...` (2026-04-05), `.../agent-scaffolding-premium-...` (2026-04-07), `.../open-source-coding-agents-2026-...` (2026-04-10); `morphllm.com/swe-benchmark` (2026-03-04 — 3 non-comparable score families); `openhands.dev/blog/analyzing-and-improving-openhands-index` (2026-02-20); `benchlm.ai/benchmarks/swePro` + `/openHandsIndex` (2026-05); `dev.to/rahulxsingh/swe-bench-scores-and-leaderboard-explained-2026` (2026-04-11); GitHub API live stats `SWE-agent/SWE-agent` + `SWE-agent/mini-swe-agent` (pushed 2026-04-27 / 2026-05-07).
