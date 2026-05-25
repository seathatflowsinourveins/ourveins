# Wave 233 Agent W — Streaming/Realtime SOTA Coverage (May 2026)

Date: 2026-05-15
Agent: Agent W (sota-researcher specialization for streaming layer)
Brief: tmp/w233-agentW-brief.md (orchestrator-side)
W226-M baseline: R0 REJECTED — layer uncovered in W220-W231 catalog (memory/eval/RAG/observability/CLI focus)

## §1 Phantom-cite results (5 layers × candidates)

| # | Candidate | Org | Stars | HEAD SHA | Last commit | Phantom? |
|---|---|---|---|---|---|---|
| 1 | livekit/agents | livekit (org #1, IPO-stage) | 10,495 | `9077c24ae053fded8f3b694039161bc29a393fc4` | 2026-05-15T13:43Z | NO — ACTIVE |
| 2 | livekit/agents-js | livekit | 828 | (sibling) | 2026-05-15T21:44Z | NO — ACTIVE |
| 3 | pipecat-ai/pipecat | pipecat-ai (Daily.co) | 12,220 | `71feb42711d2cfd9e4f7ea6adc55f45d85e38773` | 2026-05-15T22:19Z (Release 1.2.1) | NO — ACTIVE |
| 4 | vercel/ai | vercel (org #2) | 24,250 | `757d69e412e1c10758aede21e074c7fde40dea0d` | 2026-05-15T23:14Z | NO — ACTIVE |
| 5 | centrifugal/centrifugo | centrifugal (FZambia) | 10,271 | `6c63df16c42232af19cc8ec0ffd05f832e44c3b6` | 2026-05-09T13:18Z (v6.7.2) | NO — ACTIVE |
| 6 | kanapuli/mcp-kafka | kanapuli (solo) | 77 | `afc4ed5cc50566656a6e640e21693c726c04aaf5` | 2025-03-18 (UPDATE: repo-last-updated 2026-05-04) | NO — STALE-RISK |
| 7 | tuannvm/kafka-mcp-server | tuannvm (solo) | 50 | — | 2026-05-15T15:50Z | NO — ACTIVE |
| 8 | streamnative/streamnative-mcp-server | streamnative (org) | 24 | — | 2026-04-30 | NO — ACTIVE |
| 9 | sinadarbouy/mcp-nats | sinadarbouy (solo) | 45 | — | 2026-04-12 | NO — ACTIVE |
| 10 | sparfenyuk/mcp-proxy | sparfenyuk (solo) | 2,520 | — | 2026-05-15T21:49Z | NO — ACTIVE (stdio↔HTTP+SSE bridge) |
| 11 | midday-ai/ai-sdk-tools | midday-ai (org) | 2,059 | — | 2026-05-11T20:40Z | NO — ACTIVE (Vercel AI SDK helper) |
| 12 | coder/aisdk-go | coder (org #3) | 41 | — | 2026-05-13T19:21Z | NO — Vercel data-stream port |
| 13 | dograh-hq/dograh | dograh-hq (single-org) | 1,045 | — | 2026-05-15T23:53Z | NO — Voice-AI built on pipecat |

**Zero phantoms** in core candidates. CRITICAL FINDING: "deepgram-mcp" / "openai-realtime-mcp" first-class server-class candidates **DO NOT EXIST** as canonical first-party MCP servers May 2026 — they exist only as patterns/examples embedded in livekit-agents + pipecat. STT/TTS/realtime-voice delivered via **agent frameworks**, NOT discrete MCP servers.

## §2 Top-5 candidates × convergence-gate (Axis 1+2+3+4)

### Candidate A: livekit/agents (Python) + agents-js (TypeScript)
- **Axis 1**: PASS firm — LiveKit (org#1 Series B) + Pipecat README cite + OpenAI Realtime API docs cite
- **Axis 2**: PASS — Russ d'Sa / Dave Magnani (LiveKit founders) public talks 2024-2026
- **Axis 3**: PASS firm sustained-active-maintenance (cpd 4-7/day × 18mo)
- **Axis 4**: Probe 5 mode-harness-shape **CAUTION** (autonomous /loop incompatible with persistent agent-server); Probe 7.b STUDY-PILOT.b eligible only IF voice-AI in roadmap
- **License**: Apache-2.0 ✅
- **CR-12**: GENUINELY-NEW
- **Grade**: **B+** (A on most axes; Probe 5+7 pull down)

### Candidate B: pipecat-ai/pipecat (12,220★ Apache-2.0)
- **Axis 1-3**: All PASS firm (~17mo age, 80+ integrations, Daily.co + pipecat-ai org)
- **Axis 4**: Identical Probe 1-7 as LiveKit
- **CR-12**: PARTIAL-OVERLAP with Candidate A — pick ONE
- **Discriminator**: Pipecat wider integration breadth (80+ STT/LLM/TTS); LiveKit tighter WebRTC coupling
- **Grade**: **B+**

### Candidate C: vercel/ai (24,250★ Apache-2.0)
- **Axis 1-3**: All PASS firm
- **Axis 4**: Probe 5 **REJECT-FOR-FIT** — frontend streaming wrapper for Next.js/React UI, NOT orchestrator-host primitive; Probe 7.a DEMAND-ABSENCE
- **CR-12**: DUPLICATE-FUNCTIONALITY-ADJACENT (claude-sota-pure uses Anthropic SDK directly)
- **Grade**: **D** — wrong layer

### Candidate D: centrifugal/centrifugo (10,271★ Apache-2.0)
- **Axis 1-3**: All PASS firm (10 years, FZambia named-T1, v6.7.2)
- **Axis 4**: Probe 7.a DEMAND-ABSENCE (no web frontend in claude-sota-pure)
- **CR-12**: ECOSYSTEM-IMPORT-FUTURE
- **Grade**: **C**

### Candidate E: Kafka/NATS MCPs (kanapuli/tuannvm/streamnative/sinadarbouy)
- **Axis 1**: borderline — only streamnative is org-level; 1/3 distinct orgs
- **Axis 2**: FAIL — no named-T2
- **Axis 4**: Probe 7.a DEMAND-ABSENCE (no broker in stack)
- **CR-12**: REJECT-FOR-FIT
- **Grade**: **F**

## §3 Per-candidate A-F grade summary (W232 §7 10-dim rubric)

| Candidate | Stars | Velocity | Org | T2-cite | License | Probe-DAG | SOTA-align | Install | Docs | Ecosystem | **OVERALL** |
|---|---|---|---|---|---|---|---|---|---|---|---|
| livekit/agents | A | A | A | A | A | C | A | B | A | A | **B+** |
| pipecat/pipecat | A | A | A | A | A | C | A | B | A | A | **B+** |
| vercel/ai | A | A | A | A | A | F | C | C | A | A | **D** |
| centrifugal/centrifugo | A | A | A | A | A | F | B | B | A | A | **C** |
| kanapuli/mcp-kafka | C | D | F | F | A | F | C | C | D | C | **F** |
| sparfenyuk/mcp-proxy | A | A | C | C | A | A | A | A | A | C | **A-** |
| midday-ai/ai-sdk-tools | A | A | C | C | A | F | C | C | A | C | **D** |

## §4 CR-12 6-class disposition

| Candidate | CR-12 Class | Rationale |
|---|---|---|
| livekit/agents + pipecat | **GENUINELY-NEW** conditional | Voice-AI = new workflow class; needs operator commitment |
| vercel/ai | **DUPLICATE-FUNCTIONALITY-ADJACENT** | Frontend wrapper; claude-sota-pure uses SDK directly |
| centrifugal/centrifugo | **ECOSYSTEM-IMPORT-FUTURE** | Excellent primitive, no current driver |
| kanapuli/mcp-kafka | **PROVIDER-COMPLEMENT-ABSENT** | No Kafka cluster |
| sparfenyuk/mcp-proxy | **CITE-CLASS-CANONICAL** | stdio↔HTTP+SSE bridge architecture reference |

## §5 Top-3 ADOPT-NOW recommendations

**None — all candidates fail Probe 7.a/b demand-gate**

Honest verdict: streaming/realtime is GENUINELY-NEW workflow class that does NOT exist in claude-sota-pure. ADOPT-NOW requires operator-cited workflow consumer per Probe 7.b 5-clause check — all UNSET.

Hypothetical future install (NOT for this fire):
```bash
# IF voice/video workflow lands:
pip install "livekit-agents[openai,silero,deepgram,cartesia,turn-detector]"
# OR (pick ONE per PARTIAL-OVERLAP):
uv add "pipecat-ai[deepgram,openai,cartesia,daily,silero]"
# stdio↔SSE bridge (cite-class architecture reference only):
pip install mcp-proxy
```

## §6 Layer-by-layer verdict

| Layer | Verdict | Reasoning |
|---|---|---|
| **Audio (STT/TTS)** | REJECT-FOR-FIT (DEMAND-ABSENCE) | No voice workflow; elevenlabs-mcp already-ADOPTED for one-shot TTS |
| **Video** | REJECT-FOR-FIT | No video workflow |
| **Realtime messaging (Kafka/NATS)** | REJECT-FOR-FIT | No event-stream consumer; no broker |
| **WebSocket/SSE** | **STUDY-PILOT.b CITE-CLASS** | sparfenyuk/mcp-proxy = architecture reference for stdio↔HTTP+SSE bridge |
| **Streaming-LLM** | NOOP | Anthropic SDK already streams natively |
| **Tool-streaming** | NOOP | Anthropic streaming-toolcalling native primitive |
| **MCP streaming protocol** | CITE-CLASS | Anthropic MCP spec + sparfenyuk/mcp-proxy debug tool |

## §7 Critical findings

1. **Streaming/realtime layer NOT MISSING — NOT REQUIRED** under current workflow set. W226-M R0 REJECTED was structurally correct.
2. **"deepgram-mcp" / "openai-realtime-mcp" do NOT exist as standalone MCP servers** May 2026. STT/TTS ships through agent frameworks.
3. **Vercel AI SDK wrong-layer** — 24k★ for Next.js/React, NOT CLI-host orchestrators.
4. **Centrifugo excellent but demand-absent** — no browser frontend.
5. **MCP Streamable HTTP + SSE transport** = Anthropic MCP spec itself (already adopted); no new install.
6. **Tool-streaming already-native** in Claude Code.
7. **Vendor-lock-in risk** — LiveKit Cloud / Daily.co SaaS unless self-hosting WebRTC media server.
8. **HARD-GATE Probe 5 incompatibility** — persistent agent-server vs autonomous /loop fires architecturally incompatible.

verdict_one_line: HONEST-NON-FINDING — streaming/realtime layer is REJECT-AT-LAYER for claude-sota-pure (no consumer workflow exists); W226-M R0 REJECTED was structurally correct. Best-in-class candidates (livekit-agents B+, pipecat B+) await operator commitment to voice/video workflow. ONLY cite-class adoption: sparfenyuk/mcp-proxy stdio↔SSE bridge as architecture reference for MCP transport portability.
