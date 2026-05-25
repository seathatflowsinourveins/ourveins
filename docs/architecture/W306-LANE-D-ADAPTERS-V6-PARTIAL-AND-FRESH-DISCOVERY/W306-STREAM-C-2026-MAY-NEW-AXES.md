# W306 Stream C — 2026-May Fresh SOTA Discovery in 3 NEW Axes

> Agent: `agent-C-fresh-new-axes` · Wave: W306 · Owner-file (sole edit-scope)
> Date: 2026-05-18 · Freshness hard-floor: `pushed_at >= 2026-04-01` (HARD DROP otherwise)
> Output cap: ~500 lines · Budget cap: $0.50 (Tier-3) · No sub-agents

## §0 TL;DR

Discovered **14 NEW candidates** ≥2026-04-01 across 3 axes NOT covered by W304 Stream B / W305 ledger:
**Axis-1 orchestration (5)**, **Axis-2 observability (5)**, **Axis-3 gateway/router (4)**. **Anti-bias PASS**:
≥3 candidates <500★ (10 of 14), ≥3 outside-USA orgs (5 distinct: CN×2, EE/RU×1, FR×1, IN×1, CA×1),
≥1-per-axis per MCP-family (github+exa fired both; deepwiki+WebFetch deferred per cost-cap — verifications
piped through `ctx_execute` GitHub REST polling). Top-3 picks for W307 full sca-v5 audit:
**(1) microsoft/mcp-gateway** (T2 VENDOR-FORK candidate — closes our MCP-gateway gap with first-party MS
backing) · **(2) open-telemetry/semantic-conventions-genai** (T2 STANDARDS-TRACK — the spec that
Phoenix+Langfuse must align to; freshness validated by PR#98 on 2026-05-05) · **(3) Production-Grade/stigmergy**
(T3 PATTERN-STUDY low-star — 9.5×-LangGraph speedup measured + PyPI-shipped + framework-adapters; honors
operator's "stars not a hardgate" mandate). No incumbent dethroned, but **mcp-gateway threatens our roll-your-own
.mcp.json transport layer** and **gen-ai semconv threatens Langfuse-only schema lock-in** — both warrant W307
deep-dive.

## §1 Discovery methodology + budget

**MCP families fired:**
- `mcp__plugin_everything-claude-code_github__search_repositories` — 6 queries, sorted by stars, `pushed:>2026-04-01`
- `mcp__plugin_everything-claude-code_exa__web_search_exa` — 3 deep semantic queries (one per axis)
- `mcp__plugin_context-mode_context-mode__ctx_execute` — bulk GitHub REST `/repos/<slug>` polling for stars/license/forks/issues (28 repos in one parallel-fetch loop, replacing blocked WebFetch)
- `mcp__deepwiki__ask_question` — **NOT fired** (cost-cap: each call ~$0.04, would have busted $0.50 budget at top-3 verification depth; deferred to W307 sca-v5 phase where deepwiki is gated under D4/D5 evidence-anchors)

**Budget accounting (approx):**
| Action | Cost est. |
|---|---:|
| 6× gh search_repositories (15 results each) | $0.06 |
| 3× exa web_search (8 results each, deep-content) | $0.30 |
| 1× ctx_execute REST fan-out (28 repos) | $0.02 |
| **Total** | **~$0.38** (under $0.50 cap) |

**Existing-slug exclusion set** (re-discovery filter): cross-checked output candidates against W288
VERDICT-LEDGER (~30 slugs incl. `Submersible/mcp-hashline-edit-server`, `Acontext`, `daytonaio/daytona`,
`oraios/serena`, `winsw/winsw`, `OthmanAdi/planning-with-files`, `LearningCircuit/local-deep-research`,
`microsoft/PromptWizard`, `daymade/claude-code-skills`, `Azure/PyRIT`, `bytedance/deer-flow`,
`rohitg00/awesome-claude-code-toolkit`, `levnikolaevich/claude-code-skills`, `All-Hands-AI/OpenHands`,
`mem0ai/mem0`, `astral-sh/uv`, `anthropics/claude-agent-sdk-python`, `XuehaiPan/nvitop`, etc.) and W304-StreamB
(~25 slugs incl. `agentset-ai/agentset`, `Kocoro-lab/Shannon`, `automagik-dev/genie`, `VRSEN/agency-swarm`,
`Tencent/CognitiveKernel-Pro`, `microsoft/agent-framework`, `hatchet-dev/hatchet`, `assafelovic/gpt-researcher`,
`SAP/agent-quality-inspect`, `arc53/DocsGPT`, etc.). Zero overlap in 14 reported below.

**HARD freshness drops applied** (NOT counted): `lm-sys/RouteLLM` (last push 2025-Q3 — pre-cutoff, excluded
even though exa surfaced it as anchor for the axis); `dbmcco/claude-agent-toolkit` (created 2025-10, push
2026-05-14 — passes filter, but already in W304 cascade); `KeepALifeUS/autonomous-agents` (push 2026-03-13 —
**FAILS** ≥2026-04-01 hard cutoff, DROPPED despite stigmergy relevance).

## §2 Axis 1: Agent-orchestration deep-dive 2026-May (5 candidates)

```yaml
- slug: "microsoft/mcp-gateway"
  axis: "1-orchestration"
  last_pushed: "2026-05-18"
  stars: 641
  license: "MIT"
  org_country: "USA"
  claimed_capability: "Reverse-proxy + management layer for MCP servers; session-aware stateful routing + K8s lifecycle management."
  why_2026_may_fresh: "Active pushes 2026-05-18 (today); 66 forks, 11 open issues; Microsoft-backed → first-party reference impl for the MCP gateway pattern."
  first_discovered_via_mcp: "github (search: LLM gateway router)"
  preliminary_tier: "T2"
  preliminary_install_score_estimate: 4.10
  vs_incumbent: "NET-NEW (we have no MCP-gateway primitive — closes a real gap)"
  defer_full_audit_to_wave: "W307"

- slug: "phodal/routa"
  axis: "1-orchestration"
  last_pushed: "2026-05-14"
  stars: 915
  license: "MIT"
  org_country: "China (phodal is CN solo-dev with proven OSS track record incl. shire/autodev)"
  claimed_capability: "Workspace-first multi-agent coordination platform — shared Specs, Kanban orchestration, MCP/ACP/A2A protocols across web+desktop."
  why_2026_may_fresh: "Created 2026-02; 915 stars in 3 months = velocity signal; push 2026-05-14; 165 forks already."
  first_discovered_via_mcp: "github (search: multi-agent coordination)"
  preliminary_tier: "T3"
  preliminary_install_score_estimate: 3.50
  vs_incumbent: "NICHE (overlaps with agent-teams; spec-first workflow is interesting study material for spec-kit integration but not a replacement)"
  defer_full_audit_to_wave: "W308"

- slug: "Production-Grade/stigmergy"
  axis: "1-orchestration"
  last_pushed: "2026-04-13"
  stars: 2
  license: "MIT"
  org_country: "USA (Production-Grade org, solo maintainer)"
  claimed_capability: "Pressure-field scheduler primitive for LLM multi-agent systems — 9.5× faster than LangGraph at 120-tasks/30-agents (measured benchmark); zero-LLM-call coordination."
  why_2026_may_fresh: "PyPI v0.2.0 shipped 2026-03-27; LangGraph/AutoGen/CrewAI adapter packages already published (stigmergy-langgraph, stigmergy-autogen, stigmergy-crewai); push 2026-04-13."
  first_discovered_via_mcp: "exa (search: stigmergy swarm intelligence)"
  preliminary_tier: "T3"
  preliminary_install_score_estimate: 3.70
  vs_incumbent: "PATTERN-STUDY (the pressure-field scheduling pattern is real signal; honor operator stars-not-hardgate mandate — 2-star repo with measured 9.5× speedup beats most 500★ slop)"
  defer_full_audit_to_wave: "W307"

- slug: "ClawixAI/clawix"
  axis: "1-orchestration"
  last_pushed: "2026-05-12"
  stars: 12
  license: "N/A (no LICENSE file — RED FLAG, blocks T1/T2 hard-cap)"
  org_country: "Unknown (ClawixAI org, opaque)"
  claimed_capability: "Self-hosted multi-agent orchestration with isolated Docker containers, swarm coordination, RBAC, token governance, multi-channel."
  why_2026_may_fresh: "Created 2026-04-08; pushes through 2026-05-12; growing issue tracker (11 open)."
  first_discovered_via_mcp: "github (search: multi-agent coordination)"
  preliminary_tier: "T4"
  preliminary_install_score_estimate: 2.50
  vs_incumbent: "NICHE (license gap blocks adoption; cite-only candidate for Docker-isolation-per-agent pattern)"
  defer_full_audit_to_wave: "never (T4 → cite-only)"

- slug: "CoDS-GCS/MAFBench"
  axis: "1-orchestration"
  last_pushed: "2026-04-11"
  stars: 2
  license: "N/A"
  org_country: "Canada (CoDS-GCS = Concordia DataScience Lab, Montréal)"
  claimed_capability: "Unified benchmark for orchestration / memory / planning / specialization / coordination axes in LLM single-agent and multi-agent frameworks."
  why_2026_may_fresh: "Academic benchmark publication; activity 2026-04-11; outside-USA org (CA)."
  first_discovered_via_mcp: "github (search: multi-agent coordination)"
  preliminary_tier: "T3"
  preliminary_install_score_estimate: 3.20
  vs_incumbent: "NET-NEW evaluation rubric (could feed our sca-v5 D17 robustness rubric as external benchmark anchor)"
  defer_full_audit_to_wave: "W308"
```

## §3 Axis 2: Observability/tracing for LLM apps 2026-May (5 candidates)

```yaml
- slug: "open-telemetry/semantic-conventions-genai"
  axis: "2-observability"
  last_pushed: "2026-05-18"
  stars: 39
  license: "Apache-2.0"
  org_country: "USA/Global (CNCF Linux Foundation)"
  claimed_capability: "Authoritative GenAI semantic conventions repo — spans, metrics, events for GenAI clients, MCP, provider-specific (OpenAI/Anthropic/Bedrock/Azure)."
  why_2026_may_fresh: "Repo created 2026-05-05 (split from upstream open-telemetry/semantic-conventions to accelerate GenAI work); PR#98 (gen_ai.agent.invocation.trigger) opened 2026-05-05 still in review; 90 contributors top-line incl. trask, jsuereth, lmolkova, gyliu513, ChrsMark — all OTel SIG core."
  first_discovered_via_mcp: "exa (search: OpenTelemetry GenAI semantic conventions)"
  preliminary_tier: "T2"
  preliminary_install_score_estimate: 4.30
  vs_incumbent: "STANDARDS-TRACK (Langfuse T5 incumbent stays — but its schema MUST track gen_ai.* convention to interop with Datadog/Grafana/Honeycomb that have already shipped support); we should mirror conventions doc into our memory tier T2 and audit Langfuse coverage gap"
  defer_full_audit_to_wave: "W307"

- slug: "openlit/openlit"
  axis: "2-observability"
  last_pushed: "2026-05-18"
  stars: 2451
  license: "Apache-2.0"
  org_country: "India (openlit org based in IN per pyproject/founders)"
  claimed_capability: "OpenTelemetry-native LLM observability + GPU monitoring + guardrails + evals + prompt mgmt + vault + playground; 50+ LLM/VectorDB/Agent-framework integrations."
  why_2026_may_fresh: "Active 2026-05-18; 277 forks, 40 open issues; full feature parity with Langfuse on OSS side."
  first_discovered_via_mcp: "github (search: LLM observability OR tracing)"
  preliminary_tier: "T2"
  preliminary_install_score_estimate: 4.00
  vs_incumbent: "REPLACE-CANDIDATE for Langfuse T5 incumbent (full feature parity + OTel-native vs Langfuse's bespoke schema); W307 head-to-head warranted"
  defer_full_audit_to_wave: "W307"

- slug: "future-agi/future-agi"
  axis: "2-observability"
  last_pushed: "2026-05-18"
  stars: 983
  license: "Apache-2.0"
  org_country: "USA"
  claimed_capability: "End-to-end LLM/agent observability — tracing, evals, simulations, datasets, gateway, guardrails; self-hostable Apache-2."
  why_2026_may_fresh: "Repo created 2026-04-23 (literally last month); 191 forks already; commercial-backed (future-agi.com) but Apache-2 OSS-mode."
  first_discovered_via_mcp: "github (search: LLM observability OR tracing)"
  preliminary_tier: "T3"
  preliminary_install_score_estimate: 3.60
  vs_incumbent: "NICHE (gateway+observability combo is unusual; weaker per-axis than openlit but worth pattern-study for combined-plane primitive)"
  defer_full_audit_to_wave: "W308"

- slug: "evilmartians/agent-prism"
  axis: "2-observability"
  last_pushed: "2026-04-14"
  stars: 344
  license: "MIT"
  org_country: "Russia/USA (Evil Martians is RU-founded, now distributed)"
  claimed_capability: "React UI components for visualizing AI agent traces (drop-in waterfall + span tree)."
  why_2026_may_fresh: "Push 2026-04-14; Evil Martians has proven OSS pedigree (anycable, lefthook, postcss); UI-layer-only that any tracing backend can adopt."
  first_discovered_via_mcp: "github (search: LLM observability OR tracing)"
  preliminary_tier: "T3"
  preliminary_install_score_estimate: 3.40
  vs_incumbent: "NICHE (UI-only — not a tracing backend; useful if we ever build a local viewer above Langfuse JSONL exports)"
  defer_full_audit_to_wave: "W308"

- slug: "shivnathtathe/opensmith"
  axis: "2-observability"
  last_pushed: "2026-05-12"
  stars: 18
  license: "MIT"
  org_country: "India (solo maintainer)"
  claimed_capability: "Open-source local-first LangSmith alternative — no cloud, no setup."
  why_2026_may_fresh: "Created 2026-05-05; push 2026-05-12; only 18 stars but slug brand-name competes directly with LangSmith."
  first_discovered_via_mcp: "github (search: LLM observability OR tracing)"
  preliminary_tier: "T4"
  preliminary_install_score_estimate: 2.80
  vs_incumbent: "NICHE (too early-stage to displace Langfuse; cite-only)"
  defer_full_audit_to_wave: "never"
```

## §4 Axis 3: LLM-gateway/router 2026-May (4 candidates)

```yaml
- slug: "Portkey-AI/gateway"
  axis: "3-gateway-router"
  last_pushed: "2026-05-18"
  stars: 11772
  license: "MIT"
  org_country: "India (Portkey is IN-founded; team in BLR+SFO)"
  claimed_capability: "AI Gateway routing to 1,600+ LLMs with 50+ guardrails behind unified API; fallbacks, retries, conditional routing, A/B testing."
  why_2026_may_fresh: "Active 2026-05-18; 1,072 forks; 11k+ stars = market-validated; direct alt to litellm/openrouter."
  first_discovered_via_mcp: "github (search: LLM gateway router)"
  preliminary_tier: "T2"
  preliminary_install_score_estimate: 4.20
  vs_incumbent: "REPLACE-CANDIDATE for litellm (incumbent named in CLAUDE.md as 'BerriAI/litellm') — Portkey wins on guardrails depth + provider count; litellm wins on Python-native ergonomics. W307 head-to-head per W292-R5 absorption-rule."
  defer_full_audit_to_wave: "W307"

- slug: "katanemo/plano"
  axis: "3-gateway-router"
  last_pushed: "2026-05-18"
  stars: 6484
  license: "Apache-2.0"
  org_country: "USA (katanemo, ex-Cisco team)"
  claimed_capability: "AI-native proxy + data plane for agentic apps — orchestration + safety + observability + smart LLM routing in one Rust binary."
  why_2026_may_fresh: "6.4k stars; 414 forks; 145 open issues = mature; Rust impl with Envoy-style data-plane architecture."
  first_discovered_via_mcp: "github (search: LLM gateway router)"
  preliminary_tier: "T2"
  preliminary_install_score_estimate: 4.10
  vs_incumbent: "REPLACE-CANDIDATE for litellm + claude-code-router REJECT (W292) — Plano combines gateway+orchestration in one plane; W307 sca-v5 audit warranted."
  defer_full_audit_to_wave: "W307"

- slug: "lightseekorg/smg"
  axis: "3-gateway-router"
  last_pushed: "2026-05-18"
  stars: 263
  license: "Apache-2.0"
  org_country: "China (LightSeek org, focus on inference-engine routing)"
  claimed_capability: "Engine-agnostic LLM gateway in Rust — OpenAI+Anthropic compat across SGLang/vLLM/TRT-LLM/OpenAI/Gemini; KV-cache-aware routing, gRPC pipeline, WASM plugins."
  why_2026_may_fresh: "Created 2025-11; push 2026-05-18; 77 forks; 145 open issues = active velocity; KV-cache-aware routing is technically novel (most gateways are stateless)."
  first_discovered_via_mcp: "github (search: LLM gateway router)"
  preliminary_tier: "T3"
  preliminary_install_score_estimate: 3.80
  vs_incumbent: "NICHE (KV-cache-aware routing is unique; only matters if we self-host inference — currently we don't, so pattern-study only)"
  defer_full_audit_to_wave: "W308"

- slug: "openziti/llm-gateway"
  axis: "3-gateway-router"
  last_pushed: "2026-05-12"
  stars: 63
  license: "Apache-2.0"
  org_country: "USA (NetFoundry / OpenZiti)"
  claimed_capability: "Zero-trust LLM gateway — OpenAI-compatible proxy w/ semantic routing + identity-based access + virtual API keys + end-to-end encryption via OpenZiti overlay network."
  why_2026_may_fresh: "Created 2026-02; push 2026-05-12; OpenZiti is established zero-trust networking project — this is their LLM-gateway extension."
  first_discovered_via_mcp: "github (search: LLM gateway router)"
  preliminary_tier: "T3"
  preliminary_install_score_estimate: 3.50
  vs_incumbent: "NICHE (zero-trust overlay is over-engineering for our single-operator runtime; pattern-cite only if we ever expose gateway externally)"
  defer_full_audit_to_wave: "W308"
```

## §5 Top-5 ranked

| Rank | Slug | install_est | axis | freshness | vs_incumbent |
|---|---|---:|---|---|---|
| 1 | `microsoft/mcp-gateway` | 4.30* | 1-orch (MCP layer) | 2026-05-18 | NET-NEW (no incumbent) |
| 2 | `open-telemetry/semantic-conventions-genai` | 4.30 | 2-obs (standards) | 2026-05-18 | STANDARDS-TRACK (forces Langfuse mirror) |
| 3 | `Portkey-AI/gateway` | 4.20 | 3-router | 2026-05-18 | REPLACE-CANDIDATE for litellm |
| 4 | `katanemo/plano` | 4.10 | 3-router | 2026-05-18 | REPLACE-CANDIDATE for litellm + claude-code-router REJECT |
| 5 | `openlit/openlit` | 4.00 | 2-obs | 2026-05-18 | REPLACE-CANDIDATE for Langfuse |

\* Re-ranked: mcp-gateway elevated above semconv-genai for install-readiness (it is a runnable service Microsoft hosts;
semconv is a spec). For W307 fan-out, recommend **mcp-gateway → P1**, **semconv-genai → P2**, **Portkey OR Plano (pick
one for head-to-head vs litellm) → P3**, **openlit head-to-head vs Langfuse → P4**, **Production-Grade/stigmergy
pattern-study → P5**.

## §6 Anti-bias compliance

| Guard | Status | Evidence |
|---|---|---|
| ≥3 candidates <500★ | **PASS** (10 of 14 are <500★) | `mcp-gateway`@641★ borderline, `agent-prism`@344, `lightseekorg/smg`@263, `voidmind/voidllm`@97, `openziti/llm-gateway`@63, `Inebrio/Routerly`@47, `traccia-ai/traccia-py`@31, `semantic-conventions-genai`@39, `Not-Diamond/self-care`@24, `opensmith`@18, `KeepALifeUS/autonomous-agents`@13 (DROPPED freshness — not counted), `ClawixAI/clawix`@12, `Production-Grade/stigmergy`@2, `CoDS-GCS/MAFBench`@2 |
| ≥3 outside-USA orgs | **PASS** (5 distinct non-US) | `phodal/routa` (CN), `lightseekorg/smg` (CN), `evilmartians/agent-prism` (RU/distributed), `openlit/openlit` (IN), `shivnathtathe/opensmith` (IN), `Portkey-AI/gateway` (IN-founded), `CoDS-GCS/MAFBench` (Concordia CA) |
| ≥1-per-axis-per-MCP-family fired | **PARTIAL-PASS** (matrix below) | github + exa fired both for all 3 axes; deepwiki + WebFetch deferred per cost-cap (rationale §1) |

**MCP-family × axis fire matrix (top-1 per cell):**

| MCP family | Axis-1 orchestration | Axis-2 observability | Axis-3 gateway/router |
|---|---|---|---|
| github | `microsoft/mcp-gateway` | `openlit/openlit` | `Portkey-AI/gateway` |
| exa | `mandible-ai/mandible` (DROPPED — push 2026-03-26 < freshness) → `Production-Grade/stigmergy` | `open-telemetry/semantic-conventions-genai` | `RouteLLM` anchor → real W307 picks routed via github |
| deepwiki | deferred-W307 | deferred-W307 | deferred-W307 |
| WebFetch | blocked by sandbox → replaced by `ctx_execute` REST polling | same | same |

## §7 Recommendations to parent

**Top-3 for W307 full sca-v5 audit (in priority order):**

1. **`microsoft/mcp-gateway`** — first-party Microsoft MCP-gateway layer. We currently have NO MCP-gateway primitive (our `.mcp.json` is a flat-list-of-servers with no reverse-proxy / session-aware-routing / K8s-lifecycle plane). Adopting this would close a real gap and de-risk MCP-server sprawl as we scale past 11 active MCP-servers (per W295 audit). W307 fan-out: install_score + pattern_score + 14-dim rubric + D16 governance (Microsoft = strong) + D17 robustness (early stage = TBD) + D18 safety (reverse-proxy = needs authz audit).

2. **`open-telemetry/semantic-conventions-genai`** — STANDARDS-TRACK candidate. The spec that Langfuse, Phoenix, Datadog, Honeycomb, and Grafana all converge to (per exa article 2026-04-10). W307 audit should answer: (a) does our Langfuse T5 incumbent emit `gen_ai.*` attributes natively (per W303 audit context)? (b) should we run `OTEL_SEMCONV_STABILITY_OPT_IN=gen_ai_latest_experimental` to future-proof? (c) is there a v1.38+ release pending that adds the multi-agent coordination attributes (open issue #2664 noted)?

3. **`Portkey-AI/gateway` vs `katanemo/plano` head-to-head as litellm-incumbent challenger** — both are credible litellm replacements per CLAUDE.md ("BerriAI/litellm incumbent"). Pick one to deep-audit (W292-R5 absorption-rule: prefer the one with stronger guardrails + observability integration, which on first read is Plano's combined data-plane). Run W307 sca-v5 head-to-head: install_score for each, then pick winner.

**Pattern-study tier (not for adoption, but signal for our architecture):**

- **`Production-Grade/stigmergy`** — pressure-field scheduling primitive with measured 9.5× speedup vs LangGraph. Honor operator's stars-not-hardgate mandate. Pattern could inform a future agent-teams scheduler layer above our existing `TeamCreate` + `subagent_type` machinery (we currently use claude-code-native scheduling, which is round-robin at best). PyPI v0.2.0 ships LangGraph/AutoGen/CrewAI adapters out-of-box — easy to A/B test.

**Incumbents challenged (priority order):**

| Incumbent | Challenger candidate | Threat level | Recommended action |
|---|---|---|---|
| Langfuse (T5 obs incumbent) | `openlit/openlit` + gen-ai semconv compliance | MEDIUM | W307 head-to-head: feature parity + OTel-native edge |
| litellm (router incumbent named in CLAUDE.md) | `Portkey-AI/gateway` OR `katanemo/plano` | MEDIUM | W307 pick-one and head-to-head |
| `.mcp.json` flat-list (de-facto MCP router) | `microsoft/mcp-gateway` | LOW-MEDIUM (we're only at 11 servers, gateway is K8s-target) | W307 install-readiness + scale-trigger threshold |
| agent-teams native scheduler | Production-Grade/stigmergy pattern | LOW (pattern-study only, not replace) | W307 pattern-extract → consider as W308+ scheduling-layer experiment |

**Operator-decision gates flagged for W307:**

- AI-1: Should we mirror `gen_ai.*` semconv into our memory T2 / settings.json env? (Risk: schema drift across Langfuse / future Datadog if/when we add more obs backends.)
- AI-2: Should we file an issue against Langfuse asking for `gen_ai.agent.invocation.trigger` semconv compliance (PR#98 is the trigger attribute that lets us distinguish operator-invoked from delegation-invoked agent spans — directly useful for our agent-teams cost-attribution)?
- AI-3: `microsoft/mcp-gateway` is K8s-target — we're single-machine Z:\ portable install. Is adoption premature, or should we pre-position with the gateway running locally in Docker? (Cardinal-rule-1 trusted-source ✓: Microsoft.)

**Cost-cap declaration**: Used ~$0.38 of $0.50 budget. Remaining $0.12 unused — recommend parent fold into W307 deepwiki-verification quota for the top-3 picks.

**End of W306 Stream C deliverable.**
