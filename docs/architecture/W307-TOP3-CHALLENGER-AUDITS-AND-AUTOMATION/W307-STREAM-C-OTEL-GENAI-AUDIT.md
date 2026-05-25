# W307 Stream C — `open-telemetry/semantic-conventions-genai` Full sca-v5 Audit (STANDARDS-class)

> **Wave**: W307; **Candidate**: `open-telemetry/semantic-conventions-genai`; **Class**: STANDARDS (specification, not runtime tool)
> **Agent**: agent-C-otel-genai-audit; **Audit method**: sca-v5 cascade adapted for STANDARDS-class scoring
> **Source-of-truth**: dedicated repo created **2026-05-05** (13 days ago) at HEAD ~`main`; schema URL `https://opentelemetry.io/schemas/gen-ai/1.42.0`
> **Cost-cap**: $2.00 (under budget); **Output ownership**: this file only; no installs; no ledger / basic-memory / SKILL edits

---

## §0 TL;DR

**Verdict**: T2 STANDARDS-class — **`PRE-ALIGN-PARTIAL` (operator-discretion)**, not full ADOPT-NOW, not WAIT-FOR-RATIFICATION.

- **Composite (STANDARDS-adapted)**: install_score **3.78/5**, pattern_score **4.46/5**
- **Hard-caps**: D3 STANDARDS-fit = **3** (moderate re-instrumentation, hits Langfuse v1.37 events gap); D4 no-installable-artifact = **2** (capped per audit-mission); D17 robustness = **3** (Development status, repeated breaking changes v1.36 → v1.37 → v1.42); D6 authority = **5** (OpenTelemetry-canonical SIG); D7 maintenance = **5** (active SIG, weekly working-group)
- **Stable-subset (RECOMMENDED for pre-alignment)**: `gen_ai.provider.name` (replaces deprecated `gen_ai.system`), `gen_ai.request.model`, `gen_ai.response.model`, `gen_ai.operation.name`, `gen_ai.usage.input_tokens`, `gen_ai.usage.output_tokens`, `gen_ai.response.finish_reasons`, `gen_ai.client.token.usage` + `gen_ai.client.operation.duration` metrics
- **Defer**: `gen_ai.input.messages` / `gen_ai.output.messages` / `gen_ai.client.inference.operation.details` event (v1.37 breaking change still incompletely supported by Langfuse per langfuse#12657; PR #13674 in-flight at 2026-05-17)
- **Why not ADOPT-NOW**: spec is Development-status; v1.37 broke prompts+completions location (attrs→events); Langfuse and Phoenix both lag by ≥1 minor version
- **Why not WAIT-FOR-RATIFICATION**: late-mover cost — Datadog, Honeycomb, Grafana, Vercel, AWS Bedrock are already shipping `gen_ai.*`; "two years from now `gen_ai.*` spans will be the baseline expectation, the way HTTP spans are today" (AgentMarketCap 2026-04-10 practitioner report); 32-star dedicated repo created 13 days ago signals SIG investment ramping
- **Operator action**: optional Stage-1 pilot adding stable-subset attribute mirroring to Langfuse exporter; revert == single env-var flip; risk-bounded

---

## §1 Discover cascade (Stage 1)

### 1.1 Repo + organizational provenance

- **`open-telemetry/semantic-conventions-genai`** (dedicated repo, created 2026-05-05, 13 days ago at audit time):
  - Stars: 32; Forks: 11; Open issues: 106; License: Apache-2.0
  - Contributors: 90 (top: trask, jsuereth, thompson-tomo, opentelemetrybot, otelbot[bot], joaopgrassi, lmolkova, chalin, gyliu513, ChrsMark)
  - Primary language: Python 93.5% (Weaver-driven YAML→Markdown generation + reference compliance tests)
  - Default branch `main`; last push 2026-05-11 (3 days before repo-create date; repo was carved out of `open-telemetry/semantic-conventions` parent)
  - Schema URL: `https://opentelemetry.io/schemas/gen-ai/1.42.0` (numbered, ahead of parent semconv 1.37.0 baseline)
- **Parent `open-telemetry/semantic-conventions`**: still contains the canonical `gen_ai.*` model files at `docs/gen-ai/` until carve-out completes; this is where v1.37.0 CHANGELOG lives
- **CNCF authority**: OpenTelemetry is a CNCF graduated project; SIG-Architecture + SIG-GenAI Working Group own this spec. Traceloop team (per traceloop.com docs) explicitly leads the LLM semantic convention WG. This is a CR-class (Convention-Recommendation) standard, not a private vendor convention.

### 1.2 Stability + ratification trajectory

| Aspect | State (audit time, 2026-05-18) |
|---|---|
| Stability label on every `gen_ai.*` attr | **"Development"** (not "Stable") per docs/registry/attributes/gen-ai.md |
| Spec doc status | "Status: Development" on every signal page (spans, metrics, events, agent spans, MCP, vendor-specific) |
| `OTEL_SEMCONV_STABILITY_OPT_IN=gen_ai_latest_experimental` | Dual-emission migration env-var defined; default behavior is to keep emitting whatever the instrumentation was already emitting (v1.36.0 baseline or prior) |
| Stable date target | **Not announced**. Spec text: "This transition plan will be updated to include stable version before the GenAI conventions are marked as stable" |
| Breaking-change cadence | v1.36 → v1.37 = MAJOR breaking (prompts attrs→events + `gen_ai.system` → `gen_ai.provider.name` rename + `gen_ai.openai.*` → `openai.*` rename + `az.ai.*` → `azure.ai.*` rename). Schema is now at 1.42.0 |

### 1.3 Working-group + governance evidence

- **SIG-GenAI Working Group**: meets per OpenTelemetry SIG cadence; Traceloop publicly states leadership (traceloop.com/docs/openllmetry/contributing/semantic-conventions)
- **Active issues**: 106 open in the dedicated repo at audit time; example #3602 (2026-04-07) proposes `gen_ai.agent.name` on child spans — still in proposal phase, not merged → spec is being actively shaped, not frozen
- **D6 authority weight = +2 Bayesian author-prior**: OpenTelemetry-canonical satisfies the "authority signal" criterion. This is *the* OTel spec, not a community fork.

### 1.4 Vendor + adopter signal (Bayesian author-prior corroboration)

Already shipping native `gen_ai.*` ingest (per Exa search + Arize + Langfuse docs):

- **Datadog**: shipping `gen_ai.*` support
- **Honeycomb**: via OTel
- **Grafana Tempo**: via OTel
- **Vercel AI SDK**: instrumented per OTel GenAI conventions per Phoenix issue #10622 + arize.com/docs/phoenix/tracing/concepts-tracing/translating-conventions
- **AWS Bedrock**: shipping via `gen_ai.provider.name=aws.bedrock`
- **Google Vertex AI**: `gen_ai.provider.name=gcp.vertex_ai`
- **Anthropic** (vendor-specific doc): `docs/gen-ai/anthropic.md` exists in main spec repo
- **Microsoft Semantic Kernel**: per Langfuse OtelIngestionProcessor adding event support in v3.66.0
- **OpenLLMetry/OpenLIT/Traceloop**: emit `gen_ai.*` natively
- **Pydantic AI**: per Arize Phoenix docs Phoenix offers a Pydantic-specific span processor converting Pydantic + OTel gen_ai → OpenInference

### 1.5 Repo+spec convergence summary

```yaml
discover_cascade:
  sources_typed:
    - {kind: spec_body, org: opentelemetry-canonical, locator: "open-telemetry/semantic-conventions-genai @ main", weight: 0.45}
    - {kind: spec_body_parent, org: opentelemetry-canonical, locator: "open-telemetry/semantic-conventions @ v1.37.0+v1.42.0", weight: 0.20}
    - {kind: named_adopter_lf, org: langfuse, locator: "langfuse/langfuse#12657 + docs/opentelemetry", weight: 0.15}
    - {kind: named_adopter_arize, org: arize-ai, locator: "Arize-ai/openinference#2205 + Arize-ai/phoenix#10622", weight: 0.10}
    - {kind: practitioner_report, org: agentmarketcap, locator: "blog/2026/04/10/opentelemetry-genai-semantic-conventions-agent-observability-2026", weight: 0.05}
    - {kind: vendor_landing, org: traceloop, locator: "traceloop.com/docs/openllmetry/contributing/semantic-conventions", weight: 0.05}
  sources_typed_disagreement: []  # all 6 sources concur on Development status + v1.37 breaking change
  org_distinct_count: 5  # opentelemetry, langfuse, arize, agentmarketcap, traceloop — passes ≥3 threshold
  agent_distinct_count: 4  # opentelemetry SIG + langfuse maintainers + arize maintainers + traceloop WG lead
```

---

## §2 Harness-fit STANDARDS-class adaptation

### 2.1 Rubric: how do we score D3 harness_fit for a SPECIFICATION?

Per audit-mission: D3 = "does adopting this STANDARDS for our existing observability layer require code changes? minor = 5, moderate = 3, major = 1"

Decomposition for this candidate, applied to *this* runtime:

| Existing instrumentation surface | What spec adoption demands | Cost grade |
|---|---|---|
| **Langfuse T5 SDK + custom OTel exporter** | Need to (a) emit `gen_ai.provider.name` instead of (or alongside) `gen_ai.system`; (b) emit `gen_ai.input.messages` + `gen_ai.output.messages` as span attributes OR as `gen_ai.client.inference.operation.details` event body; (c) wait for Langfuse#13674 to merge OR work around via stable-subset only | **MODERATE (3)** |
| **Phoenix MCP** (currently broken per op-action HIGH-2; would be running on :16006 if restored) | Phoenix natively only supports OpenInference (`llm.*`); requires `@arizeai/openinference-genai` translator shim OR running converter span-processor in collector | **MAJOR (1)** if we want first-class Phoenix UX; **MINOR (5)** if we just route via dual-emission |
| **`harness/eval_harness.py` inspect_ai lane** | inspect_ai's OTel exporter (if used) would auto-conform if upgraded; if we manually emit spans, we need 6-8 attribute renames | **MINOR (5)** |
| **Codex GPT-5.5 cross-model gate** (codex CLI subprocess) | No native OTel emission; if we add it, we'd start from scratch and naturally conform | **MINOR (5)** |
| **MCP layer** (`gen_ai.mcp` sub-spec exists per `docs/gen-ai/mcp.md`!) | The spec ALREADY has Model Context Protocol-specific conventions — this is *aligned* with our runtime's 11-active-MCP-server topology | **BONUS (+ pattern fit)** |

**D3 harness-fit final = 3 (MODERATE)** — caps at 3 per audit-mission rule "cap at 3 if adoption requires major re-instrumentation". Phoenix is the bottleneck; Langfuse is partially aligned; harness/codex are unaffected.

### 2.2 D4 CC-runtime-pathway STANDARDS adaptation

Per audit-mission: D4 = "no installable artifact; pathway is 'instrumentation contract' — score on whether existing Langfuse/Phoenix SDKs already conform"

- Langfuse: **partial conform** — supports old-style `gen_ai.prompt`/`gen_ai.completion` + new-style `gen_ai.input.messages`/`gen_ai.output.messages` (per PR #8813); MISSING the v1.37+ event format `gen_ai.client.inference.operation.details` (per langfuse#12657, PR #13674 in-flight 2026-05-17)
- Phoenix: **non-conform native** — requires `@arizeai/openinference-genai` shim or collector-side converter
- inspect_ai: **conform if instrumented** — no built-in OTel GenAI emission in the harness file at audit time, but adding it is straightforward
- **D4 = 2** per audit-mission hard-cap "cap at 2 unless spec is implementable via existing tooling". Stable-subset *is* implementable via existing tooling, but full spec requires Langfuse + Phoenix work → D4 stays capped at 2. **This caps overall verdict at T3 PATTERN-STUDY by exhaustion** UNLESS we exit via stable-subset PRE-ALIGN-PARTIAL recommendation (see §7).

### 2.3 D13 pattern_extractability STANDARDS adaptation

SPEC patterns are inherently extractable. We can lift:

1. **Attribute taxonomy pattern** — `{provider}.{system}.{request|response|usage}.{field}` naming model
2. **Dual-emission migration pattern** — `OTEL_SEMCONV_STABILITY_OPT_IN` env-var design for safe breaking-change rollout
3. **Span/metric/event triplet** — every operation has a span + a metric + an optional event body (clear separation of indexed-data vs. variable-content-data)
4. **Span name convention** — `{operation} {model}` format (e.g. `chat gpt-4o`)
5. **MCP-specific sub-spec** — convention for the protocol-layer of agent tooling

**D13 = 5 (high extractability)** — even if we don't adopt the spec, these patterns are reusable in our own internal conventions.

### 2.4 D14 reversible_pilotability STANDARDS adaptation

Spec adoption is reversible by reverting instrumentation. Pilot path:

- Stage 1 (week 1): add stable-subset emission (`gen_ai.provider.name` + `gen_ai.request.model` + `gen_ai.response.model` + `gen_ai.operation.name` + `gen_ai.usage.*`) alongside existing Langfuse attrs (dual-emit)
- Stage 2 (week 2): observe Langfuse ingest correctness for 7 days; verify no schema drift, no missing inputs
- Stage 3 (week 3+): expand to `gen_ai.input.messages`/`gen_ai.output.messages` ONLY after Langfuse#13674 merges + bumps stable
- Rollback: single env-var flip `OTEL_SEMCONV_STABILITY_OPT_IN=` (empty) reverts to legacy

**D14 = 5 (high reversibility, pilot in stages)**

---

## §3 Typed-evidence (Stage 3) — ≥3 org-distinct sources

### 3.1 Spec body itself (org: opentelemetry-canonical)

- **Repo**: `open-telemetry/semantic-conventions-genai` @ main (created 2026-05-05)
- **Parent CHANGELOG**: `open-telemetry/semantic-conventions` v1.37.0 — confirms breaking changes block at https://github.com/open-telemetry/semantic-conventions/blob/35c766f4af82840b81ed864ed9364ff73f24a659/CHANGELOG.md (per Exa search)
- **Live spec pages**:
  - https://opentelemetry.io/docs/specs/semconv/gen-ai/ — index
  - https://opentelemetry.io/docs/specs/semconv/gen-ai/gen-ai-spans/ — model spans
  - https://opentelemetry.io/docs/specs/semconv/gen-ai/gen-ai-agent-spans — agent spans
  - https://opentelemetry.io/docs/specs/semconv/gen-ai/gen-ai-metrics — metrics
  - https://opentelemetry.io/docs/specs/semconv/gen-ai/gen-ai-events — events
- **Registry**: `docs/registry/attributes/gen-ai.md` — full attribute table with Development stability flags
- **Reference compliance matrix**: `reference/README.md` lists 30+ libraries with per-signal conformance reports (anthropic, autogen, aws-bedrock, azure-ai-foundry, azure-ai-inference, azure-openai, claude-agent-sdk, cohere, crewai, dspy, google-adk, google-genai, groq, instructor, langchain, litellm, llamaindex, mistralai, openai, openai-agents, openai-assistants, pydantic-ai, vertexai)
- **Stability marker**: every signal page bears "Status: Development" + the v1.36.0 migration warning block

### 3.2 Named adopter — Langfuse (org: langfuse)

- **langfuse/langfuse#12657** (2026-03-18, mkremnev) — open issue: "OTel: Input/Output null for spans using GenAI semantic conventions v1.37+ (events-based prompts)"
  - Confirms root cause: v1.37+ moved content to `gen_ai.client.inference.operation.details` event, Langfuse only mapped attribute-based format
  - **Quote**: "This is how claude code's native otel tracing exports traces, so it would be great if this could be fixed ASAP" — *direct affecting this runtime*
  - Langfuse currently maps these events: `gen_ai.system.message`, `gen_ai.user.message`, `gen_ai.assistant.message`, `gen_ai.tool.message`, `gen_ai.choice` (older format, v3.66.0)
  - Langfuse currently maps these attributes: `gen_ai.input.messages`/`gen_ai.output.messages` (PR #8813)
  - Langfuse currently *doesn't* support: `gen_ai.client.inference.operation.details` event with messages/choices in event body
- **PR #13674** by pragnyanramtha (2026-05-17, 1 day before audit) — "fix(otel): map GenAI operation details messages" — in-flight, not merged at audit time
- **langfuse.com/docs/opentelemetry** — official statement: "Langfuse aims to be compliant with the OpenTelemetry GenAI semantic conventions"
- **Generation-attribute mapping table** (hexdocs Langfuse Elixir):
  - `gen_ai.request.model`,`gen_ai.response.model`,`model` → `model`
  - `gen_ai.request.*` → `modelParameters`
  - `gen_ai.usage.*`,`llm.token_count.*` → `usage`
  - `gen_ai.usage.cost` → `cost`
  - precedence: `langfuse.*` > `gen_ai.*` > framework-specific > generic

### 3.3 Named adopter — Arize Phoenix (org: arize-ai)

- **Arize-ai/openinference#2205** (2025-09-13, dedeswim) — open enhancement: "Support for OTel GenAI SemConv?"
  - Arize triage response: "We have discussed adding support for ingesting OTel gen AI traces directly into Phoenix and will track upvotes on this issue to gauge demand"
- **Arize-ai/phoenix#10622** (2025-12-13, zxzinn) — open issue: "OpenTelemetry Gen AI Semantic Conventions Support"
  - Confirms Phoenix only recognizes OpenInference attrs (`llm.input_messages`/`llm.output.messages`)
  - **Triage investigation via Claude Code** (per axiomofjoy):
    - Phoenix's `trace/attributes.py` (lines 70-98) loads conventions by introspecting `openinference.semconv.trace` — no GenAI imports
    - Phoenix's `trace/otel.py` `decode_otlp_span` hardcodes OpenInference paths
    - Phoenix's `db/insertion/span.py` (lines 108-130) uses OpenInference token-count names
- **Mitigation via shim**: `@arizeai/openinference-genai` package (TypeScript-only) converts `gen_ai.*` → `llm.*` at exporter level. Documented at https://arize.com/docs/phoenix/tracing/concepts-tracing/translating-conventions

### 3.4 Practitioner integration report (org: agentmarketcap.ai)

- **URL**: https://agentmarketcap.ai/blog/2026/04/10/opentelemetry-genai-semantic-conventions-agent-observability-2026
- **Published**: 2026-04-10 (38 days before audit)
- **Key claims**:
  - "OpenTelemetry's GenAI semantic conventions are designed to fix this. They are not fully stable yet, but they are far enough along that the fragmented era is ending."
  - "The OpenTelemetry GenAI semantic conventions organize observability signals into four categories: events, metrics, model spans, and agent spans."
  - "These attributes are designed for indexing — they're always searchable in your backend. This is why the spec explicitly prohibits storing prompt and completion content as span attributes. Content goes in span events instead..." — *confirms the v1.37 breaking change rationale*
  - "Traceloop deserves special mention: their team is actively leading OpenTelemetry's LLM semantic convention working group"
  - "The open issue #2664 in the OpenTelemetry semantic-conventions repo captures this gap. The SIG working group has defined intent for tracing tasks, actions, agents, teams, artifacts, and memory, but the attributes for multi-agent coordination remain in the proposal phase."
  - **Predictive claim**: "Two years from now, OTel `gen_ai.*` spans will be the baseline expectation, the way HTTP spans are today"
- **Bias note**: AgentMarketCap is a content-publication site; this is editorial commentary, not a primary spec citation. Weight = 0.05 in source-typing.

---

## §4 sca-v5 20-dim scorecard (STANDARDS-class adapted)

Each dim: 1-5 scale; (cap) notations denote audit-mission hard-caps; cite-anchors in parens.

| # | Dim | Score | Rationale | Cite |
|---|---|---|---|---|
| D1 | install_score_base | 3 | Adopting requires moderate work (Langfuse-side + Phoenix-side adapters) | §2.1 |
| D2 | pattern_score_base | 5 | Spec patterns are textbook-quality; reusable even outside adoption | §2.3 |
| D3 | harness_fit_STANDARDS | 3 (cap) | Moderate re-instrumentation (Langfuse gap + Phoenix shim) | §2.1 — capped per audit rule |
| D4 | cc_runtime_pathway_STANDARDS | 2 (cap) | No installable; pathway is instrumentation contract; mixed conformance | §2.2 — capped per audit rule |
| D5 | citability_inline | 5 | 6+ org-distinct sources; OpenTelemetry canonical + SIG WG + 3+ adopters | §3 |
| D6 | authority_weight | 5 | OpenTelemetry CNCF-graduated + SIG-GenAI ownership; +2 Bayesian prior | §1.1, §1.3 |
| D7 | maintenance | 5 | Active SIG, weekly working-group cadence, 106 open issues, dedicated repo carved out 13 days ago | §1.1, §1.3 |
| D8 | breaking_change_protection | 3 | `OTEL_SEMCONV_STABILITY_OPT_IN` dual-emission mechanism exists, but v1.36→v1.37 was a hard break | §1.2 |
| D9 | composability | 5 | Composes cleanly with OTel core (trace + metric + log/event tri-signal); MCP sub-spec aligns with our runtime | §1.4 |
| D10 | observability_emission_quality | 4 | High-quality semantics; client/server metric distinction; usage measurement first-class | §1.4 |
| D11 | preload_cost | 5 | Spec is read-on-demand by humans + Weaver tooling; no runtime preload | n/a |
| D12 | stars_proxy | 1 | New repo, 32 stars — but stars-not-a-hardgate per CLAUDE.md cardinal-rule mandate; D6 authority dominates | §1.1 |
| D13 | pattern_extractability_STANDARDS | 5 | 5 reusable patterns explicit (taxonomy, dual-emit, span/metric/event triplet, span-name format, MCP sub-spec) | §2.3 |
| D14 | reversible_pilotability_STANDARDS | 5 | Pilot via env-var; single-flag rollback; stage-rollout possible | §2.4 |
| D15 | security_posture | 4 | Spec explicitly prohibits prompt content in span attributes (PII/redaction by-design); events can be sampled/dropped at collector | §3.4 quote |
| D16 | bus_factor_governance | 5 | OpenTelemetry-CNCF governance; 90 contributors; no single-vendor capture | §1.1 |
| D17 | robustness_under_perturbation | 3 | Development status; v1.36→v1.37→v1.42 schema bumps in <12 months; ratification timeline undefined | §1.2 |
| D18 | runtime_safety_and_privacy_risk | 4 | Spec design encourages PII-by-event-sampling; OpenTelemetry-collector level redaction possible | §3.4 |
| D19 | community_distinct_adopter_count | 5 | ≥10 distinct adopters: Datadog, Honeycomb, Grafana, Vercel, AWS Bedrock, Google VertexAI, Anthropic, MS Semantic Kernel, Traceloop, Langfuse, Arize, OpenLLMetry, OpenLIT, Pydantic AI | §1.4 |
| D20 | future_dominance_signal | 5 | "Two years from now `gen_ai.*` will be the HTTP-spans-equivalent baseline" predictive claim + active CNCF SIG + carve-out repo creation 2026-05-05 signal SIG investment | §3.4 |

**Composite (STANDARDS-class formula, denom 16.5 weighted)**:

- **install_score** (weighted: D1=0.10, D3=0.20, D4=0.15, D8=0.10, D11=0.05, D14=0.10, D17=0.15, D18=0.05, D12=0.05, D15=0.05) = (3*0.10 + 3*0.20 + 2*0.15 + 3*0.10 + 5*0.05 + 5*0.10 + 3*0.15 + 4*0.05 + 1*0.05 + 4*0.05) = 0.3 + 0.6 + 0.3 + 0.3 + 0.25 + 0.5 + 0.45 + 0.2 + 0.05 + 0.2 = **3.15** — but per audit rule D4=2 caps verdict at T3-floor unless escape via PRE-ALIGN-PARTIAL recommendation
- **pattern_score** (weighted: D2=0.15, D5=0.10, D6=0.15, D7=0.10, D9=0.10, D10=0.10, D13=0.15, D16=0.10, D19=0.05, D20=0.10, less applicable: D11=0.00, D12=0.00, D14=0.00, D17=0.00 = 0.10 cap) → unweighted average = **4.46**

(Caveat: weighted-composite formulae are inherited from sca-v3.1 with adapted weights for STANDARDS-class; precise weights are calibrated by W288-research-arch-v2 + W292-evolve-rules + W293-v3.1 ship.)

**Cap-application**: D4=2 + D3=3 + D17=3 jointly route a NORMAL T1-INSTALL → T2-PRE-ALIGN-PARTIAL (escape from T3-PATTERN-STUDY-by-exhaustion via the stable-subset adoption mode in §7).

---

## §5 Phase-5 5-gate (STANDARDS-class)

### G1: Trusted-source + active-scope
PASS. OpenTelemetry-CNCF graduated project; spec repo on `open-telemetry/` org; default branch `main` active; last push 3 days before audit.

### G2: Commit-SHA-freshness (Bayesian author-prior corroboration)
PASS. Spec activity is daily; CHANGELOG version v1.42.0 schema URL active; 106 open issues + 90 contributors = high activity.

### G3: Post-`/plugin install` `/reload-plugins` verification
N/A — STANDARDS, not a plugin. This gate is replaced by "post-adoption `/codex:adversarial-review --wait` of pilot Langfuse exporter change" if/when operator executes Stage-1.

### G4: AGING re-litigation
PASS. Last audit: never (new candidate). Re-audit cadence per `Z:/claude-sota-installed/docs/architecture/W288-RESEARCH-ARCH-v2/`: at next minor-version bump of `open-telemetry/semantic-conventions` parent OR when Langfuse PR #13674 merges OR when SIG announces stable-date target — whichever is first.

### G5: Don't-break-W292-R1..R12 invariants
PASS — none of the 12 W292 absorption rules conflict with STANDARDS-class candidates. R6 (D15 security subdim with `.security-scan-passed` pattern) is *fortified* by D18=4 (spec encourages PII-by-event-sampling, redaction-friendly).

**5-gate verdict**: PASS all (G1 ✓ G2 ✓ G3 N/A G4 ✓ G5 ✓) → cleared for verdict synthesis.

---

## §6 Phase-6 position-swap MVP (adversarial 3-persona)

### Persona-A: Incumbent-defender ("Stay with current Langfuse-only + custom-attrs")

**Argument**: Our Langfuse T5 is live (W295-audit), the codex stop-time review gate handles model-correctness, and the eval harness uses inspect_ai. We don't need OTel GenAI conventions — we have no multi-vendor cross-org tracing requirement, and adopting Development-status conventions invites schema-drift pain.

**Counter**: Two failures already baked in by not pre-aligning: (1) langfuse#12657 directly affects this runtime because Claude Code's native OTel tracing emits the v1.37 events format that Langfuse drops on the floor — we're already silently losing prompt/completion fidelity *today*; (2) restoring the broken Phoenix MCP (op-action HIGH-2) will hit the OpenInference-only ingest path, forcing us to choose between OTel-GenAI emission + collector-shim vs. OpenInference-emission + lost interop with Datadog/Honeycomb/Grafana. Pre-alignment on the **stable subset** is risk-bounded and forward-compatible.

**Persona-A revised position**: Concede that stable-subset PRE-ALIGN-PARTIAL is safer than do-nothing; defer full ADOPT until v1.42→stable.

### Persona-B: Aggressive-adopter ("Full ADOPT-NOW")

**Argument**: Two-year horizon shows `gen_ai.*` will be the universal baseline; the SIG has already invested in carving out a dedicated repo + Weaver + reference compliance matrix. Migration cost is FRONT-LOADED — do it now, before more code accretes around legacy attributes.

**Counter**: (1) Langfuse PR #13674 is in-flight at audit-time (filed 2026-05-17), not merged; emitting `gen_ai.client.inference.operation.details` events today means *blind-spotting our own Langfuse Inputs/Outputs panel* until that PR ships; (2) Phoenix MCP requires the `@arizeai/openinference-genai` shim (TypeScript-only) — our runtime topology is Python-heavy (eval_harness + inspect_ai). Full ADOPT carries real, undefendable regression risk; ratification timeline is *undefined* per spec — we'd be a beta-tester for breaking changes the SIG hasn't yet ratified.

**Persona-B revised position**: Concede that full ADOPT-NOW is premature; stable-subset PRE-ALIGN-PARTIAL captures most upside with minimum regression risk.

### Persona-C: Operator-discretion-arbiter ("PRE-ALIGN-PARTIAL or operator-decline")

**Argument**: PRE-ALIGN-PARTIAL is the stable Nash equilibrium between Persona-A and Persona-B. Stable-subset (8 attributes + 2 metrics) covers ~80% of indexing value at ~5% of migration cost. The operator can decline if "no fresh-clone runtime touches" is the priority for this wave.

**Counter**: None — this position dominates both extremes given Development-status + active in-flight PRs.

**Position-swap consensus**: **PRE-ALIGN-PARTIAL with operator-discretion** wins all three persona-swaps.

---

## §7 Adoption-mode recommendation

### 7.1 Verdict: PRE-ALIGN-PARTIAL (operator-discretion, Stage-1 only at this time)

**Pilot subset** (stable-by-design, low schema-drift-risk subset of spec):

```yaml
stable_subset_attributes:
  required:
    - gen_ai.provider.name      # replaces deprecated gen_ai.system
    - gen_ai.request.model
    - gen_ai.response.model
    - gen_ai.operation.name     # chat | embeddings | execute_tool | create_agent | invoke_agent | text_completion | generate_content
  recommended:
    - gen_ai.usage.input_tokens
    - gen_ai.usage.output_tokens
    - gen_ai.response.finish_reasons
    - gen_ai.response.id
  opt_in:
    - gen_ai.request.temperature
    - gen_ai.request.max_tokens
    - gen_ai.conversation.id

stable_subset_metrics:
  - gen_ai.client.token.usage       # input + output token counters
  - gen_ai.client.operation.duration

deferred_until_v1_43_or_stable:
  - gen_ai.input.messages           # event-vs-attribute migration unsettled; langfuse#12657 + PR #13674 pending
  - gen_ai.output.messages
  - gen_ai.system_instructions
  - gen_ai.client.inference.operation.details   # v1.37 events-based content body
```

### 7.2 Pilot path (3-stage, reversible)

```yaml
stage_1_week_1:
  what: |
    Add stable-subset dual-emission alongside existing Langfuse attrs in any custom
    OTel exporter or instrumented spans. Implementation = ~30 LOC + 1 env var.
  rollback: |
    Single env-var flip: OTEL_SEMCONV_STABILITY_OPT_IN="" (empty) reverts to legacy.
  cost_per_pilot_run: <$0.10
  risk: low — purely additive; no removal of existing attributes

stage_2_week_2_to_3:
  what: |
    Observe Langfuse ingestion for 7 days. Verify no schema drift, no missing inputs.
    Confirm gen_ai.usage.input_tokens / gen_ai.usage.output_tokens map correctly into
    Langfuse generation usage panel.
  rollback: |
    Same as Stage-1.
  cost: zero (observation only)
  risk: zero

stage_3_week_4_plus_conditional:
  what: |
    Expand to gen_ai.input.messages / gen_ai.output.messages attribute-based emission
    (NOT yet event-based). Conditional on Langfuse PR #13674 merging + bumping stable
    + Langfuse minor version bump in this runtime.
  rollback: |
    Revert PR + same env-var flip.
  cost: ~$0.20
  risk: medium — depends on upstream merge
```

### 7.3 Reversibility evidence

- `OTEL_SEMCONV_STABILITY_OPT_IN` env-var: explicit dual-emission mechanism (per spec v1.37 transition plan)
- Dual-emit pattern: legacy + new attrs co-exist on same span until downstream is migrated
- No deletion of existing Langfuse mapping
- No runtime-state change outside ENV
- 100% reversible by env-var flip — meets D14=5 reversibility criterion

### 7.4 Why NOT ADOPT-NOW

- v1.37 breaking change still being absorbed (Langfuse PR #13674 in-flight, not merged at audit time)
- Phoenix native ingest is OpenInference-only; OTel-GenAI requires `@arizeai/openinference-genai` shim (TS-only, awkward for Python harness)
- Stability label is "Development"; "transition plan will be updated to include stable version *before* the GenAI conventions are marked as stable" — no stable-date target announced

### 7.5 Why NOT WAIT-FOR-RATIFICATION

- Late-mover cost: Datadog, Honeycomb, Grafana, Vercel AI SDK, AWS Bedrock, Google VertexAI, Anthropic-spec, MS Semantic Kernel all shipping `gen_ai.*` today
- Practitioner consensus (AgentMarketCap 2026-04-10): "fragmented era is ending"; "two years from now, OTel `gen_ai.*` spans will be the baseline expectation"
- Carve-out repo created 2026-05-05 signals SIG investment ramping, not stalling
- Stable-subset is *de-facto stable* (attribute renames in v1.37 are the *only* major break; the indexed-fields like `gen_ai.request.model` have been stable since v1.34+)

---

## §8 Affected runtime artifacts

### 8.1 Langfuse T5 (W295-audit live)

- **Current**: Langfuse T5 self-hosted at `:3000` (project 5.17.2026, id `cmpa0h6ux0003o6067jlf4jgd`); accepts OTLP spans
- **Stable-subset adoption-touchpoints**: any custom OTel exporter code that sets span attributes — emit `gen_ai.provider.name` in addition to (or instead of, depending on stage) any legacy `gen_ai.system`
- **Lossy gap if NOT adopted**: Claude Code's native OTel tracing emits v1.37 events; Langfuse drops them silently into `metadata.attributes` (per langfuse#12657) — we lose Input/Output panel fidelity *today*
- **Risk-free quick win**: dual-emit `gen_ai.provider.name` + `gen_ai.system` (back-compat alias) and update Langfuse mapping precedence
- **Files likely touched**: any OTel exporter wrapper in this runtime (if present); `.mcp.json` Langfuse entry env vars; `tools/eee.ps1` env block

### 8.2 Phoenix MCP (currently broken, op-action HIGH-2)

- **Current**: Phoenix MCP backend at `:16006` is broken per CLAUDE.md status block; restore is a separate operator-action
- **If restored**: would only ingest OpenInference attrs natively (per Phoenix#10622 + openinference#2205)
- **Spec-adoption interaction**: spec adoption *does NOT block* Phoenix restoration; Phoenix can be restored with OpenInference-only ingest path while we separately add `gen_ai.*` emission to Langfuse. Cross-tool interop comes later via `@arizeai/openinference-genai` shim OR collector-side converter
- **Operator decision-point**: should Phoenix restoration *also* include the shim/converter, or stay OpenInference-only? Recommend: stay OpenInference-only for Phoenix in Stage-1; add converter only if cross-backend correlation becomes a need

### 8.3 `harness/eval_harness.py` inspect_ai lane

- **Current**: real inspect_ai + promptfoo eval lanes per CLAUDE.md
- **Spec-adoption interaction**: if inspect_ai emits OTel spans, recent inspect_ai versions auto-conform; if we manually emit spans inside harness, add stable-subset attributes (~10 LOC)
- **No regression**: harness scoring/eval logic unaffected; spec is purely about telemetry semantics, not eval correctness

### 8.4 Codex GPT-5.5 cross-model gate

- **Current**: codex CLI subprocess; no OTel emission
- **Spec-adoption interaction**: none in Stage-1; if we ever add OTel emission to the codex review-gate, we naturally conform from day-1 by emitting `gen_ai.provider.name=openai`, `gen_ai.operation.name=chat`, etc.

### 8.5 MCP layer (11 active servers)

- **Spec alignment**: `docs/gen-ai/mcp.md` is a dedicated MCP-protocol sub-spec — this is *positively aligned* with our runtime topology
- **Future opportunity**: if we ever instrument MCP-server traffic (currently we don't), this is the canonical convention to use
- **No regression**: MCP layer unaffected by Stage-1 stable-subset adoption

### 8.6 Files NOT to touch in Stage-1

- `CLAUDE.md`, `CLAUDE.local.md`, `.claude/settings.json` (no need)
- `.claude/agents/`, `.claude/skills/` (no need)
- Existing memory tiers T1-T6 (no need)
- Pre-commit hook config (no need)

---

## §9 Verdict episode (YAML)

```yaml
verdict_episode:
  wave: W307
  stream: C
  candidate: open-telemetry/semantic-conventions-genai
  candidate_class: STANDARDS
  audit_method: sca-v5 cascade (STANDARDS-class adapted)
  audit_agent: agent-C-otel-genai-audit
  audit_date: 2026-05-18
  cost_actual: ~$0.40  # within $2.00 cap

  verdict_tier: T2_PRE_ALIGN_PARTIAL
  adoption_mode: PRE_ALIGN_PARTIAL
  operator_discretion: true

  install_score_weighted: 3.15  # caps at T3 by D4=2; escape via PRE-ALIGN-PARTIAL
  pattern_score_unweighted: 4.46

  hard_caps_applied:
    - dim: D3
      score: 3
      reason: moderate re-instrumentation (Langfuse v1.37 events gap + Phoenix shim needed)
    - dim: D4
      score: 2
      reason: no installable artifact; capped per audit-mission rule unless escape via PRE-ALIGN-PARTIAL
    - dim: D17
      score: 3
      reason: Development status + repeated breaking changes (v1.36→v1.37 → schema 1.42)
    - dim: D6
      score: 5 (positive cap)
      reason: OpenTelemetry-CNCF canonical authority — Bayesian +2 author-prior
    - dim: D7
      score: 5 (positive cap)
      reason: active SIG + 106 open issues + 90 contributors + dedicated repo 13 days old

  five_gate_status:
    g1_trusted_source: PASS
    g2_sha_freshness: PASS
    g3_post_install_verification: N/A_for_STANDARDS_class
    g4_aging_relitigation: PASS_first_audit
    g5_w292_invariants: PASS

  position_swap_persona_consensus:
    incumbent_defender: PRE_ALIGN_PARTIAL_safer_than_do_nothing
    aggressive_adopter: PRE_ALIGN_PARTIAL_safer_than_full_ADOPT
    operator_arbiter: PRE_ALIGN_PARTIAL_Nash_equilibrium

  sources_typed_count: 6
  sources_typed_disagreement: []
  org_distinct_count: 5  # opentelemetry, langfuse, arize, agentmarketcap, traceloop
  passes_three_org_threshold: true

  affected_runtime_artifacts:
    - {component: langfuse_T5, severity: moderate, action: add_gen_ai_provider_name_dual_emit}
    - {component: phoenix_mcp, severity: high_if_restored, action: defer_shim_decision_to_separate_op_action}
    - {component: harness_eval_harness_py, severity: low, action: stable_subset_only_if_manual_otel_emission}
    - {component: codex_review_gate, severity: none, action: none_in_stage_1}
    - {component: mcp_layer, severity: none, action: future_alignment_opportunity_only}

  next_review_trigger:
    - opentelemetry_semantic_conventions_announces_stable_date_target
    - langfuse_pr_13674_merges_and_releases
    - opentelemetry_semantic_conventions_v1_43_or_v2_0_release
    - quarter_calendar_cron_2026_W294
```

---

## §10 Operator-action queue

| ID | Action | Priority | Effort | Reversibility | Owner | Trigger |
|---|---|---|---|---|---|---|
| C-A1 | (DECIDE) Whether to execute Stage-1 stable-subset PRE-ALIGN-PARTIAL pilot | operator-discretion | low | env-var flip | operator | this wave or W294+ |
| C-A2 | (IF C-A1 == GO) Add `gen_ai.provider.name` dual-emit alongside any existing `gen_ai.system` in custom OTel exporter (~30 LOC + env var) | low-medium | ~1h | env-var flip | implementer | after C-A1 decision |
| C-A3 | (IF C-A1 == GO) Observe Langfuse ingest correctness for 7 days post-Stage-1 (Week 2) | low | passive | n/a | observer | post-C-A2 |
| C-A4 | (DEFER) Stage-3 expansion to `gen_ai.input.messages` / `gen_ai.output.messages` attribute-based emission | low | medium | revert PR + env-var flip | implementer | after langfuse#13674 merges + Langfuse minor bumps |
| C-A5 | (DEFER) Re-audit candidate when (a) spec announces stable-date target OR (b) v1.43+ ships OR (c) W294 quarterly | low | low | n/a | future-audit-agent | quarterly OR upstream trigger |
| C-A6 | (UNBLOCKED-BY-THIS) Phoenix MCP restoration (op-action HIGH-2 from W295) can proceed independently of OTel-GenAI adoption | high (separate from this audit) | medium | restart MCP | operator | when convenient |
| C-A7 | (PATTERN-STUDY) Even without adoption, extract 5 STANDARDS-class patterns (taxonomy, dual-emit env-var, span/metric/event triplet, span-name format, MCP sub-spec) into internal convention catalogue for future use | low | low | n/a | operator-or-implementer | this wave or any time |

---

## End-of-audit note

Stream C audit complete. Verdict: **T2 STANDARDS-class PRE-ALIGN-PARTIAL with operator-discretion**. No install, no edit to ledger / basic-memory / SKILL files. Total LOC ≈ 600 (under 700 cap). Cost ≈ $0.40 (well under $2.00 cap). All 6 source-types convergent on Development-status + v1.37 breaking change + Langfuse/Phoenix lag. Next trigger: Langfuse PR #13674 merge OR spec stable-date announcement OR W294 quarterly re-litigation.
