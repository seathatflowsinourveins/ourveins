# W266 — Langfuse vs Phoenix Convergence Audit (2026-05-17)

> **Scope**: independently verify or refute the W265 verdict "WIRE Langfuse, do not DROP — complementary to Phoenix."
> **Inputs**: vendor docs (langfuse.com, arize.com), third-party comparisons (ZenML, dev.to, futureagi, laminar, langfuse-self-FAQ), GitHub maintainer discussions, live `docker stats`.
> **Method**: 5 angles, ≥1 citation per claim, verdict at end.

---

## Angle 1 — Vendor positioning (feature matrix)

Phoenix's own feature list ([arize.com/docs/phoenix](https://arize.com/docs/phoenix)) advertises four categories: **Tracing, Evaluation, Prompt Engineering (Prompt Management + Playground + Span Replay), Datasets & Experiments**. So on paper Phoenix DOES have a prompt registry — Arize even shipped CLI `phoenix prompts` commands in Jan 2026 ([laminar.sh comparison](https://laminar.sh/article/arize-phoenix-alternatives-2026)). Langfuse's prompt feature ([langfuse.com/docs/prompts/get-started](https://langfuse.com/docs/prompts/get-started)) adds **labels, GitHub sync, protected labels, caching, fallbacks, runtime-fetch API, trace-linkage by prompt version** — a strict superset on the prompt-workflow axis. ZenML's head-to-head ([zenml.io/blog/langfuse-vs-phoenix](https://www.zenml.io/blog/langfuse-vs-phoenix)) verdicts **Langfuse wins prompt management AND tracing flexibility**; Phoenix wins **notebook ergonomics + OpenInference auto-instrumentation**. Langfuse's own comparison page ([langfuse.com/faq/all/best-phoenix-arize-alternatives](https://langfuse.com/faq/all/best-phoenix-arize-alternatives)) calls Phoenix "primarily for local testing and debugging" with "limited self-host, no feature parity with Arize AX cloud." **Net**: genuinely complementary — Phoenix is a span-rich workbench, Langfuse is the prompt/score/cost ledger plus longer-retention OLAP store (ClickHouse vs Phoenix's PostgreSQL). They are NOT substitutable for the prompt-version + score-history axis.

## Angle 2 — Community / practitioner consensus

The two strongest practitioner signals: (a) [futureagi.com/blog/arize-phoenix-vs-langfuse-2026](https://futureagi.com/blog/arize-phoenix-vs-langfuse-2026) — *"Many stacks end up running both: Phoenix for low-level traces, Langfuse for higher-level product observability"*; (b) [laminar.sh/article/arize-phoenix-alternatives-2026](https://laminar.sh/article/arize-phoenix-alternatives-2026) — *"A strong option for RAG-heavy enterprise applications is Arize Phoenix paired with Langfuse, with Phoenix becoming the primary platform for retrieval evaluation, hallucination tracking, and response quality analysis, while Langfuse manages prompts, cost analytics, and runtime telemetry."* The dev.to practitioner review ([dev.to/soufian.../i-tried-langsmith-langfuse-helicone-and-phoenix](https://dev.to/soufian_azzaoui_85ea1c030/i-tried-langsmith-langfuse-helicone-and-phoenix-heres-what-each-gets-wrong-2cjk)) flags one real Langfuse gap relevant here: *"No MCP support. If you're building with Claude and MCP tools, you're blind"* — but that's an SDK-instrumentation gap that the W265-proposed manual OTLP-bridge from `graphiti`/`cognee`/`hindsight` env-vars **resolves**, since those producers emit standard OpenInference spans. **Net**: the dual-stack pattern is the practitioner default, not an exotic choice.

## Angle 3 — OTEL-bridge operational cost (3 producers → Langfuse)

Vendor sizing guidance ([langfuse.com/self-hosting](https://langfuse.com/self-hosting); [GitHub discussion #5669](https://github.com/orgs/langfuse/discussions/5669)): minimum 4 GiB RAM / 4 vCPU for compose. Independent measurement ([dev.to self-host guide](https://dev.to/signal-weekly/self-host-langfuse-with-docker-llm-observability-without-the-cloud-bill-5cc3)): *"the full stack idles at about 1.5 GB RAM with negligible CPU."* Live `docker stats` on THIS runtime (2026-05-17): web 693 MiB · worker 322 MiB · clickhouse 568 MiB · postgres 59 MiB · redis 17 MiB · minio 311 MiB · grafana 104 MiB = **~2.07 GiB total**, CPU <7% per container. Wiring graphiti+cognee+hindsight adds prompt-rate-bounded OTLP writes — at the current ~1k spans/hr Phoenix is already absorbing, ClickHouse projected growth is **≪10 MB/day** at default retention. The maintainer-recommended levers ([discussion #5669](https://github.com/orgs/langfuse/discussions/5669)) — TTL retention + `dataRetentionDays` — keep this bounded forever. **Operational cost is near-zero given the containers are already running and healthy.**

## Angle 4 — Alternative: Phoenix-only + promptfoo/opik

Could Phoenix + a sidecar (promptfoo for prompt-versioned eval, or Opik) replace Langfuse? Phoenix DOES have a prompt registry, but [agenta.ai/blog/top-open-source-prompt-management-platforms](https://agenta.ai/blog/top-open-source-prompt-management-platforms) ranks Phoenix below Langfuse on registry breadth (no protected labels, no native A/B routing, no fallback chain, no production-version label semantics). promptfoo is a **CI eval runner**, not a runtime prompt-fetch registry. Opik (Apache-2 Comet) is the only credible substitute, but **it is not installed and not in the W259 catalog**; adopting it would replay the W265 install/wire cost on a less-mature project. The honest summary ([futureagi.com](https://futureagi.com/blog/arize-phoenix-vs-langfuse-2026)): *"Phoenix's honest gap is product scope — it is a workbench with no integrated gateway, no simulation product, no prompt optimization loop tied to CI gates, and no first-party guardrail layer."* **Phoenix-only does not cover the gap that 18,408 historical traces + 150,662 observations + Grafana ClickHouse datasource already represent in this runtime.**

## Angle 5 — VRAM / CPU footprint sanity check

Reclaim if dropped: ~2.07 GiB system RAM (NOT VRAM — Langfuse is CPU-side). The W265-flagged 4090 saturation (23.8/24 GiB) is entirely unaffected by Langfuse — it ships zero GPU work. The 2 GiB of system RAM on a workstation with ≥64 GiB is **not the binding resource**. The binding resource is the 1 GiB VRAM margin on the 35B `--parallel 4` lane, which is a GPU-only concern. Dropping Langfuse buys nothing for the actual bottleneck.

---

## Verdict — **CONFIRM-WIRE** (per W265)

| Axis | W265 claim | This audit |
|---|---|---|
| Feature complementarity | Phoenix + Langfuse are complementary | **CONFIRMED** (vendor + 3rd-party + practitioner all converge) |
| Prompt-ledger gap | Phoenix doesn't cover Langfuse's prompt/version/score axis | **CONFIRMED** (Phoenix has registry but narrower breadth) |
| Operational cost | ~2 GiB system RAM, low CPU | **CONFIRMED** (live measurement: 2.07 GiB, <7% CPU) |
| VRAM impact of dropping | Recovers ~2 GiB | **REFUTED as relevant** — it's system RAM, not VRAM; doesn't unblock the 35B lane |
| Historical-data preservation | 18,408 traces / 150,662 observations + Grafana ClickHouse DS | **CONFIRMED** (W262 audit, still live) |

**Action**: proceed with W265 §2 Phases A→E (extract keys → wire `graphiti`/`cognee`/`hindsight` env → verify traces). Reject the W264 DROP. **Do not block on this for the VRAM-saturation alert** — they're independent work items.

## Sources
- [Arize Phoenix docs](https://arize.com/docs/phoenix)
- [Langfuse Prompt Management](https://langfuse.com/docs/prompts/get-started) · [Langfuse self-hosting](https://langfuse.com/self-hosting) · [Langfuse FAQ vs Phoenix](https://langfuse.com/faq/all/best-phoenix-arize-alternatives)
- [ZenML: Langfuse vs Phoenix](https://www.zenml.io/blog/langfuse-vs-phoenix)
- [FutureAGI: Phoenix vs Langfuse 2026](https://futureagi.com/blog/arize-phoenix-vs-langfuse-2026)
- [Laminar: Phoenix alternatives 2026](https://laminar.sh/article/arize-phoenix-alternatives-2026)
- [dev.to: I tried LangSmith, Langfuse, Helicone, Phoenix](https://dev.to/soufian_azzaoui_85ea1c030/i-tried-langsmith-langfuse-helicone-and-phoenix-heres-what-each-gets-wrong-2cjk)
- [Langfuse v3 self-hosting scaling discussion #5669](https://github.com/orgs/langfuse/discussions/5669)
- [Agenta: open-source prompt management 2026](https://agenta.ai/blog/top-open-source-prompt-management-platforms)
- Internal: `Z:\claude-sota-installed\docs\architecture\W265-truth-up-and-langfuse-wiring-2026-05-17.md`, `W265-codex-consensus-2026-05-17.md`, `W262-observability-audit-2026-05-17.md`
- Live: `docker stats` 2026-05-17 ~17:30 local
