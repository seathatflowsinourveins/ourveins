# GAP-LAYER L3.5 (Protocol) + L4.75 (Budget) — 2026-05-16

> Sourced from sota-researcher fork (agentId a55c3b09593509b13, 2026-05-16 14:40 PT)
> R1 multi-source ≥4: GitHub MCP + Exa + Context7 + DeepWiki + WebFetch
> CONVERGENCE: 2 STRONG-Axis-1 (≥3-org) primitives surfaced — both MAJOR future-architecture additions.

## §A — L3.5 Agent Protocol Gap Findings

| # | Candidate | ★ | License | 1-line value | Probe-DAG | Verdict |
|---|---|---|---|---|---|---|
| A1 | **CopilotKit/CopilotKit** | 31,452 | MIT | Maker of AG-UI Protocol; agent↔frontend rendering layer; **11+ org adoption** | P1✓ P2✓(11 orgs) P3✓(Bedrock AgentCore) P4✓ P5✓ | **INSTALL T1** |
| A2 | CopilotKit/generative-ui | 1,291 | MIT | AG-UI + A2UI + MCP-Apps reference | Created 2026-03-12 NEW | **STUDY-PILOT** |
| A3 | CopilotKit/aimock | 584 | MIT | Mock LLM/MCP/A2A/AG-UI for testing | Created 2026-03-03 NEW | **STUDY-PILOT** |
| A4 | **humanlayer/humanlayer** | 10,817 | Apache-2 | HITL framework for claude-code/codex/opencode/amp | P1✓ P2✓(4 harnesses) P3✓ P4✓ P5✓ | **INSTALL T2** |
| A5 | assistant-ui | 10,086 | MIT | TS/React chat UI (shadcn + Vercel AI SDK) | Overlaps A1 | **DEFER** |
| A6 | i-am-bee/beeai-framework | 3,255 | Apache-2 | IBM ACP-host agent framework | ACP convergence path | **STUDY-PILOT** |
| A7 | CopilotKit/open-multi-agent-canvas | 492 | MIT | Multi-agent + MCP reference impl | Pattern only | **DEFER** |
| A8 | ai-boost/awesome-harness-engineering | 942 | n/a | Curated harness-eng list NEW Mar-2026 | Cite-source | **STUDY-PILOT** |
| A9 | ai-boost/awesome-a2a | 592 | n/a | Curated A2A protocol catalog | Cite-source | **STUDY-PILOT** |

## §B — L4.75 Budget/Cost Telemetry Gap Findings

| # | Candidate | ★ | License | 1-line value | Probe-DAG | Verdict |
|---|---|---|---|---|---|---|
| B1 | **Portkey-AI/gateway** | 11,746 | MIT | AI Gateway + **1,600 LLMs + 50 guardrails + virtual-keys-with-budget + provider-failover + MCP-aware** | P1✓ P2✓(650+ orgs, 2.5T tokens) P3✓ P4✓ P5✓ | **INSTALL T1** |
| B2 | **Helicone/helicone** | 5,675 | Apache-2 (YC W23) | OSS LLM observability + **Rust AI-Gateway beta Q2-2026** + caching + custom rate limits | P1✓ P2✓ P3✓ P4✓ P5✓ | **INSTALL T2** |
| B3 | langwatch/langwatch | 3,257 | MIT | LLM evals + agent testing + DSPy | Overlaps Phoenix | **STUDY-PILOT** |
| B4 | langwatch/better-agents | 1,520 | MIT | Standards-for-agents pattern catalog NEW Apr-2025 | Cite-source | **STUDY-PILOT** |
| B5 | langwatch/scenario | 880 | MIT | Agentic-codebase testing NEW Apr-2025 | L7 eval candidate | **STUDY-PILOT** |
| B6 | pezzolabs/pezzo | 3,235 | Apache-2 | LLMOps platform | Feature overlap | **DEFER** |
| B7 | CommonstackAI/UncommonRoute | 524 | Apache-2 | "82% cost savings drop-in OpenAI proxy" NEW Mar-2026 | Self-reported only | **STUDY-PILOT** |
| B8 | looplj/axonhub | 3,795 | MIT | OSS AI gateway (Go) w/ failover+cost+tracing | Parity with B1+LiteLLM | **DEFER** |
| B9 | AgentOps-AI/agentops | 5,555 | MIT | Python SDK agent monitoring + cost tracking | Alternative path | **STUDY-PILOT** |

## §C — Convergence Assessment (Axis-1 ≥3-org PASS)

| Candidate | Axis-1 orgs | Axis-2 dated artifacts | PASS? |
|---|---|---|---|
| **A1 CopilotKit/AG-UI** | **11+** (Google, MSFT, AWS, Oracle, LangChain, Mastra, PydanticAI, Agno, AG2, LlamaIndex, MAF) | TechCrunch 2026-05-05 + Bedrock AgentCore Mar-2026 + AI2Work + DEV-Medium Mar-2026 | **PASS-STRONG** ✓✓ |
| A4 humanlayer | 4+ harnesses (claude-code/codex/opencode/amp) | GitHub active 2026-05-16 | **PASS** ✓ |
| **B1 Portkey** | **650+ orgs** (claimed) | TrueFoundry + Helicone-blog 2026 + Portkey-docs | **PASS-STRONG** ✓✓ |
| B2 Helicone | YC W23 cohort + Rust-gateway-beta 2026 | TrueFoundry blog + GitHub 5.7k★ | **PASS** ✓ |
| A6 beeai/ACP | IBM primary (1 org); secondary multi | W258r14_protocols.md | **PASS-WEAK** |
| B7 UncommonRoute | 1 (self-reported only) | Single repo | **FAIL** (needs independent verify) |

## §D — Architecture Impact

**D1 — L3.5 adds value over MCP-only? YES.** MCP = tool integration. AG-UI = agent↔frontend rendering. HumanLayer = agent↔human interrupts. Distinct primitives. **Recommend ADD L3.5 = "Agent-Native UI + HITL"** wrapping CopilotKit (rendering) + HumanLayer (interrupts). Existing A2A WATCHLIST stays (server↔server).

**D2 — L4.75 needs own layer or extend L4? NEW LAYER.** L4 (ccusage/claude-cost) = operator-local. L4.75 = fleet-scale routing + budget enforcement + provider-failover — qualitatively different. **Recommend L4.75 = "Fleet AI Gateway"** wrapping Portkey (primary) + Helicone (observability) + LiteLLM (substrate, already in canonical).

**D3 — Top 3 INSTALL per layer for V-FINAL-V2:**

L3.5 (Agent-Native UI + HITL):
1. **CopilotKit** — T1 INSTALL (Axis-1 STRONG)
2. **HumanLayer** — T2 INSTALL
3. beeai-framework — T3 STUDY-PILOT (ACP convergence path)

L4.75 (Fleet AI Gateway):
1. **Portkey** — T1 INSTALL (Axis-1 STRONG)
2. **Helicone** — T2 INSTALL
3. LiteLLM — already canonical (substrate)

## §E — Honest Non-Findings

1. **AGNTCY (Cisco)** — zero GitHub repos match name+pushed:>2026-02-15+stars:>100. Cited in W258r14 as concept only. Re-probe `cisco-agntcy/*` org next wave.
2. **Standalone ACP repos** — bundled inside beeai+goose; **no standalone ≥100★ ACP repo verified**.
3. **RoboCorp/sema4** — zero matches pushed:>2026-02-15. Likely deprecated/rebranded since 2025. Drop from probe set.
4. **AutoGen v2 messaging** — no fresh v2-specific repo. NULL-RESULT.
5. **LangGraph multi-agent state** — exists inside LangGraph proper; no separate primitive. NULL-RESULT.
6. **Mango.io / AISpend** — zero ≥100★ matches. Likely commercial-only.
7. **Budget-aware-cache-warming primitive** — searched; no dedicated repo. **NULL — promote to research-watchlist**.
8. **CopilotKit $27M Series A May-2026** — VERIFIED (positive, not non-finding).
9. **GitHub rate-limit hit** at probe 8. Partial fallback to WebSearch covered AGNTCY+ACP gaps; full GraphQL audit deferred next session.
10. **Convergence on the AG-UI/MCP/A2A three-layer stack** — the 2026 industry playbook per CopilotKit blog + TechCrunch + AI2Work triangulation. Pattern-level finding.

## Sources

- https://ai2.work/blog/copilotkit-raises-27m-to-make-ag-ui-the-standard-for-in-app-ai-agents
- https://techcrunch.com/2026/05/05/copilotkit-raises-27m-to-help-devs-deploy-app-native-ai-agents/
- https://deepwiki.com/CopilotKit/CopilotKit/5.1-ag-ui-protocol-overview
- https://dev.to/copilotkit/deploying-ag-ui-agents-to-production-with-amazon-bedrock-agentcore-3ok0
- https://portkey.ai/docs/product/enterprise-offering/budget-policies
- https://www.truefoundry.com/blog/portkey-alternatives
- https://www.truefoundry.com/blog/helicone-vs-portkey
- https://www.firecrawl.dev/blog/best-llm-observability-tools
- https://github.com/CopilotKit/CopilotKit
- https://github.com/Portkey-AI/gateway
- https://github.com/Helicone/helicone
- https://github.com/humanlayer/humanlayer
