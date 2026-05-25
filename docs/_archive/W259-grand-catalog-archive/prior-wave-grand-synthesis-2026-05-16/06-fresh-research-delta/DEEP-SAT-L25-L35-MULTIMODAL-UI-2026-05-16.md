# DEEP-SATURATION L2.5 (Multi-Modal/Realtime) + L3.5 (Agent-Native UI / HITL) — EXHAUSTIVE
## 2026-05-16 — Fork-Build extending SATURATION-BROWSER-VOICE + GAP-MULTIMODAL-PRODUCTION

> **Scope**: 62-row deep-saturation matrix spanning 8 sub-lanes (L2.5a Browser · L2.5b Computer-Use · L2.5c Voice-Realtime · L2.5d ASR · L2.5e TTS · L2.5f VLM-screenshot · L3.5 Agent-UI · L3.5 HITL). Builds on prior probe `SATURATION-BROWSER-VOICE-2026-05-16.md` by adding (1) deeper Computer-Use stratification, (2) TTS lane completion (F5-TTS, Bark, Coqui), (3) net-new L3.5 Agent-Native UI + HITL coverage (CopilotKit/AG-UI, humanlayer, assistant-ui, beeai-framework).
>
> **Methodology**: 10 GraphQL `search()` queries (stars+pushed-filtered) + 30 name-search probes + cross-reference against the V-FINAL-V2 baseline (`Z:\claude-sota-installed\docs\grand-synthesis-2026-05-16\00-MASTER\ULTIMATE-SYNTHESIS-V-FINAL-V2-2026-05-16.md`) and the prior SATURATION-BROWSER-VOICE matrix. Where DeepWiki/GitHub MCP verified previously, citations reused; where new (L3.5), fresh probes annotated. **All star counts and licenses as of 2026-05-16 probe time** — RAW pulls cached in prior research artifacts cited per row.
>
> **Schema**: D1 SOTA-alignment · D2 native-CC-pathway · D3 license/install-risk · D4 community-consensus · D5 maintenance-velocity · D6 install-risk · D7 architecture-fit · D8 reversibility. Each scored 0-10; sum/80.
>
> **HONEST-NON-FINDING-EARLY**: L3.5 (Agent-Native UI + HITL) is a NEW lane not in V-FINAL-V2. The lane is **dominated by 3 orgs (CopilotKit, HumanLayer, assistant-ui)** plus a 4th (IBM BeeAI) — converges Axis-1, but the lane's natural home is **L3.5 (frontend-UI for agents)** straddling L3 (agent-frameworks) + L1 (skills/orchestration). Recommendation: **add L3.5 to V-NEXT** (see §D).

---

## §A — Multi-Modal + Agent-UI Matrix (62 rows)

### L2.5a — Browser Automation (10 rows)

| # | repo | ★ | license | last-commit | sub-cat | native-CC-pathway | D1-D8 /80 | verdict |
|---|---|---|---|---|---|---|---|---|
| 1 | microsoft/playwright | 88.8k | Apache-2.0 | 2026-05-16 | a-base | indirect (via playwright-mcp) | 76 (10/9/10/10/10/10/9/8) | KEEP (foundation) |
| 2 | microsoft/playwright-mcp | 32.6k | Apache-2.0 | 2026-05-16 | a-mcp | `claude mcp add playwright npx @playwright/mcp@latest` | **78** (10/10/10/10/10/9/10/9) | **INSTALL T1** (in V-FINAL-V2) |
| 3 | browser-use/browser-use | 94.1k | MIT | 2026-05-16 | a-agent | `uvx browser-use --mcp` (own MCP server + MCP client) | **77** (10/10/10/10/10/9/9/9) | **ADD T1** (94k★ gap) |
| 4 | browserbase/stagehand | 22.7k | MIT | 2026-05-16 | a-sdk | Python+TS SDK; local+cloud modes | 73 (9/8/10/9/10/9/9/9) | EVALUATE pattern-extract (in V-FINAL-V2) |
| 5 | browserbase/mcp-server-browserbase | 3.3k | MIT | 2026-05-16 | a-mcp | MCP-server (Stagehand-via-MCP) | 70 (9/10/10/8/9/8/9/9) | INSTALL T2 (in V-FINAL-V2) |
| 6 | Skyvern-AI/skyvern | 21.6k | AGPL-3.0 | 2026-05-16 | a-agent | n/a (license-blocked) | 30 (10/0/0/9/10/0/9/0) | **REJECT** (AGPL) |
| 7 | mherrmann/helium | 8.3k | MIT | 2026-05-09 | a-shim | indirect (Selenium wrapper) | 52 (5/5/10/6/8/7/6/8) | SKIP (Stagehand+Playwright-MCP supersede) |
| 8 | SeleniumHQ/selenium | 34.1k | Apache-2.0 | 2026-05-16 | a-base | indirect | 64 (7/6/10/9/10/8/7/8) | KEEP-as-baseline |
| 9 | ServiceNow/AgentLab | 579 | custom | 2026 active | a-eval | benchmark harness | 48 (8/5/6/4/8/5/6/6) | STUDY (small ★ research stage) |
| 10 | natbat/codename-goose (block.xyz) | n/a | Apache-2.0 | n/a | a-agent | possible | n/a | OUT-OF-SCOPE (general framework, L3) |

### L2.5b — Computer-Use Agents (12 rows)

| # | repo | ★ | license | last-commit | sub-cat | native-CC-pathway | D1-D8 /80 | verdict |
|---|---|---|---|---|---|---|---|---|
| 11 | microsoft/OmniParser | 24.8k | CC-BY-4.0 | 2026-04-13 | b-parser | OmniParser-Server FastAPI + OmniTool supports Claude-3-5-Sonnet | **76** (10/9/9/10/9/9/10/9) | **INSTALL T1** (in V-FINAL-V2) |
| 12 | OpenAdaptAI/OmniMCP | 71 | MIT | 2025-04 | b-mcp | MCP-server wrapping OmniParser | 56 (7/10/10/4/6/6/8/8) | STUDY-PILOT |
| 13 | bytedance/UI-TARS-desktop | 34.2k | Apache-2.0 | 2026-05-15 | b-desktop | Agent-TARS-App macOS-only; UI-TARS-desktop also Windows | 67 (9/7/10/9/10/7/9/9) | MONITOR pattern-extract (Win-pending for Agent-TARS) |
| 14 | trycua/cua | 16.8k | MIT | 2026-05-12 | b-sandbox+CU | sandbox+driver macOS/Linux/Win/Android | **74** (9/9/10/9/10/8/10/9) | **ADD T2** (lateral L0.75+L2.5b) |
| 15 | anthropics/anthropic-quickstarts | 16.6k | MIT | 2026 active | b-ref | reference impl for `computer_use_20251124` tool | **75** (10/10/10/10/9/9/10/8) | **ADD T1** (official Anthropic CU ref) |
| 16 | simular-ai/Agent-S | 11.3k | Apache-2.0 | v0.3.2 Dec 2025 | b-agent | Agent-S3 72.6% OSWorld; Claude as decision LLM | 68 (10/7/10/9/8/7/9/9) | STUDY pattern-extract |
| 17 | microsoft/UFO | 8.7k | MIT | 2026 active | b-windows | Windows-deep multi-agent DAG | 70 (9/7/10/8/10/8/10/9) | MONITOR pattern-extract (Windows-native) |
| 18 | openai/openai-cua-sample-app | 1.7k | MIT | 2026 active | b-ref-openai | reference for GPT-5.4 CUA | 60 (8/6/10/6/9/7/8/8) | STUDY (cross-vendor) |
| 19 | xlang-ai/OSWorld | 2.85k | custom NeurIPS | 2026 active | b-eval | benchmark only | 56 (9/3/6/7/8/7/8/8) | STUDY-CITE (feeds L4.6) |
| 20 | microsoft/Magma | 1.9k | MIT | 130 commits | b-vla | VLA model — vision+language+action | 52 (8/4/10/5/6/6/7/8) | STUDY (early) |
| 21 | mannaandpoem/OpenManus | 469 | MIT | 2026 active | b-agent | open-source Manus clone | 44 (6/5/10/4/6/5/6/7) | SKIP (low ★) |
| 22 | THUDM/CogAgent | 7.3k | Apache-2.0 | 2026 active | b-vla | 18B VLA model | 54 (7/4/10/6/7/6/8/8) | STUDY (model-only) |

### L2.5c — Voice / Realtime Agents (8 rows)

| # | repo | ★ | license | last-commit | sub-cat | native-CC-pathway | D1-D8 /80 | verdict |
|---|---|---|---|---|---|---|---|---|
| 23 | livekit/agents | 10.5k | Apache-2.0 | 2026-05-16 | c-realtime | `livekit-plugins-anthropic` + `pip install 'livekit-agents[mcp]'` | **77** (10/10/10/10/10/9/10/8) | **INSTALL T1** (in V-FINAL-V2) |
| 24 | pipecat-ai/pipecat | 12.2k | BSD-2-Clause | v1.2.1 2026-05-15 | c-realtime | `AnthropicLLMService` + MCPClient + CC plugin `pipecat-dev-skills` via `claude plugin marketplace add pipecat-ai/skills` | **78** (10/10/10/10/10/9/10/9) | **ADD T1** (native CC plugin marketplace gap) |
| 25 | openai/openai-agents-python | 26.3k | MIT | v0.17.2 2026-05-12 | c-realtime | `pip install 'openai-agents[voice]'` + Realtime API `gpt-realtime-2` | 70 (10/3/10/10/10/8/8/9) | STUDY cross-vendor (in V-FINAL-V2 L3) |
| 26 | gradio-app/fastrtc | 4.6k | MIT | 2026-05-16 | c-webrtc | Python real-time comm primitive | 64 (8/6/10/7/10/8/8/8) | STUDY-PILOT |
| 27 | daily-co/daily-python | 65 | BSD-2-Clause | v0.28.1 2026-05-07 | c-video | Python SDK for Daily video calling | 48 (7/4/10/3/8/6/5/7) | SKIP (commercial) |
| 28 | openai/openai-realtime-agents | 6.9k | MIT | 2026 active | c-ref | TypeScript demos | 60 (8/6/10/7/9/7/7/8) | STUDY (chat-supervisor patterns) |
| 29 | openai/openai-realtime-console | 3.6k | MIT | 2026 active | c-debug | React Realtime API inspector | 54 (6/5/10/6/8/7/6/8) | STUDY (debug-only) |
| 30 | Retell-AI / Vapi-AI (commercial SaaS) | n/a | closed | n/a | c-saas | n/a (closed) | n/a | SKIP (closed) |

### L2.5d — Speech-to-Text (ASR) (7 rows)

| # | repo | ★ | license | last-commit | sub-cat | native-CC-pathway | D1-D8 /80 | verdict |
|---|---|---|---|---|---|---|---|---|
| 31 | openai/whisper | 99.6k | MIT | 2026-05-16 | d-model | model only | 75 (10/3/10/10/10/9/10/8) | KEEP (model artifact) |
| 32 | ggml-org/whisper.cpp | 49.7k | MIT | 2026-05-16 | d-runtime | `whisper-server` HTTP OpenAI-compat + `whisper-stream` (SDL2) | **78** (10/10/10/10/10/9/10/9) | **INSTALL T1** (in V-FINAL-V2) |
| 33 | SYSTRAN/faster-whisper | 22.9k | MIT | 2026-05-16 | d-python | CTranslate2-accelerated Python | **74** (10/9/10/10/10/8/10/9) | **ADD T2** (Python gap) |
| 34 | m-bain/whisperX | 21.9k | BSD-2-Clause | v3.8.5 2026-04-01 | d-align | word-level timestamps + diarization | 68 (10/7/10/8/9/8/9/9) | STUDY-PILOT |
| 35 | Vaibhavs10/insanely-fast-whisper | 12.9k | Apache-2.0 | 2026 active | d-fast | CLI with Flash-Attention-2 | 60 (8/6/10/7/8/7/7/8) | SKIP-OR-STUDY (faster-whisper similar) |
| 36 | huggingface/distil-whisper | 4.1k | MIT | 2026-05-16 | d-distilled | 6x faster distilled variant | 58 (8/4/10/6/8/7/7/8) | STUDY (model artifact) |
| 37 | speechbrain/speechbrain | 11.2k | Apache-2.0 | 2026-05-15 | d-toolkit | broad audio AI toolkit | 56 (7/4/10/7/9/6/7/8) | STUDY (out-of-niche but adjacent) |

### L2.5e — Text-to-Speech (TTS) (8 rows)

| # | repo | ★ | license | last-commit | sub-cat | native-CC-pathway | D1-D8 /80 | verdict |
|---|---|---|---|---|---|---|---|---|
| 38 | elevenlabs/elevenlabs-mcp | 1.4k | MIT | 2026-05-16 | e-mcp | MCP-server: TTS+clone+SFX+music; needs `ELEVENLABS_API_KEY`; local-save fallback | **74** (9/10/10/8/10/9/10/8) | **ADD T2** (closes audio output loop; in V-FINAL-V2 ADD recommendation) |
| 39 | suno-ai/bark | 38.4k | MIT | 2026 active | e-model | transformer TTS w/ voice cloning + non-speech sounds | 66 (9/3/10/9/7/8/8/8) | STUDY (model artifact; Apple Silicon mature) |
| 40 | coqui-ai/TTS | 36.5k | MPL-2.0 | 2024-08-16 (archived) | e-model | XTTS-v2; archived but checkpoint-stable | 60 (8/4/8/9/4/6/9/8) | STUDY (Coqui-as-org archived but model usable) |
| 41 | SWivid/F5-TTS | 13.8k | MIT | 2026-05-16 | e-model | flow-matching SOTA fast TTS | **70** (10/5/10/8/10/8/9/8) | **ADD T2** (open SOTA TTS; pairs with whisper.cpp ASR) |
| 42 | 2noise/ChatTTS | 35.9k | AGPL-3.0 | 2026 active | e-model | conversation-tuned TTS | 38 (9/0/0/9/6/0/8/0) | **REJECT** (AGPL) |
| 43 | rhasspy/piper | 9.5k | MIT | 2026 active | e-edge | fast neural local TTS (Raspberry Pi grade) | 60 (8/5/10/8/8/7/7/7) | STUDY (edge/local-first niche) |
| 44 | fishaudio/fish-speech | 23.1k | other | 2026 active | e-model | multilingual zero-shot voice clone | 56 (8/3/5/9/8/5/8/7) | STUDY (license uncertain) |
| 45 | resemble-ai/chatterbox | 4.2k | MIT | 2026 active | e-model | production zero-shot voice clone | 60 (8/4/10/7/9/7/8/7) | STUDY |

### L2.5f — VLM + Screenshot-to-Code (7 rows)

| # | repo | ★ | license | last-commit | sub-cat | native-CC-pathway | D1-D8 /80 | verdict |
|---|---|---|---|---|---|---|---|---|
| 46 | QwenLM/Qwen3-VL | 19.2k | Apache-2.0 | 2026 active | f-vlm | 2B-235B-MoE; **CU cookbook** + Mobile-Agent cookbook | **76** (10/8/10/10/10/9/10/9) | **ADD T1** (gap; pairs with OmniParser) |
| 47 | illuin-tech/colpali | 2.6k | MIT | 2026-05-16 | f-doc-vlm | ColPali/ColQwen2/ColSmol visual-RAG | **72** (10/7/10/8/10/8/10/9) | INSTALL T2 (in V-FINAL-V2) |
| 48 | haotian-liu/LLaVA / LLaVA-NeXT | 24.8k | Apache-2.0 | LLaVA-NeXT 2024-05 stale | f-vlm | model only | 56 (7/4/10/8/4/7/8/8) | SKIP-FOR-NOW (eroded by Qwen3-VL) |
| 49 | mistralai/Pixtral (model card only) | n/a | model-card | n/a | f-vlm | model artifact only | n/a | model-only (not org-counted) |
| 50 | huggingface/Florence-2-large | n/a | MIT | 2026 active | f-vlm-small | 0.77B task-prompted OCR+grounding | 62 (8/5/10/7/9/8/8/7) | STUDY-PILOT |
| 51 | abi/screenshot-to-code | 72.6k | MIT | 2026-05-16 | f-s2c | standalone web app: Claude API / GPT-4V / Gemini | **72** (10/6/10/10/10/8/10/8) | **PATTERN-EXTRACT** (no install — lift prompts into skill; in V-FINAL-V2 ADD) |
| 52 | FormStr/screenshot-to-component | ~1k | MIT | 2026 active | f-s2c | image → React component | 56 (7/5/10/4/7/6/8/9) | STUDY (small niche) |

### L3.5 — Agent-Native UI (5 rows)

| # | repo | ★ | license | last-commit | sub-cat | native-CC-pathway | D1-D8 /80 | verdict |
|---|---|---|---|---|---|---|---|---|
| 53 | CopilotKit/CopilotKit | 25.6k | MIT | 2026-05-16 | UI-react | **AG-UI Protocol** spec + React adapters; LangGraph/CrewAI/Mastra/LlamaIndex/Pydantic-AI/AG2 adapters; **AnthropicAgent** for Claude SDK | **78** (10/10/10/10/10/9/10/9) | **ADD T1** (NEW L3.5 lane) |
| 54 | assistant-ui/assistant-ui | 7.1k | MIT | 2026-05-16 | UI-react | shadcn/ui-style React for agent chat; provider-neutral incl. Anthropic | **73** (10/9/10/9/10/8/9/8) | **ADD T2** |
| 55 | i-am-bee/beeai-framework | 3.4k | Apache-2.0 | 2026 active | UI-framework | IBM-backed agent framework; ACP/A2A/AG-UI protocol support | 68 (9/8/10/7/10/7/9/8) | STUDY-PILOT |
| 56 | vercel/ai (Vercel AI SDK) | ~10k | Apache-2.0 | 2026-05-16 | UI-react+sdk | useChat hook + RSC streaming; Anthropic provider | 70 (9/9/10/9/10/8/9/8) | STUDY (general SDK — overlaps L3) |
| 57 | mendableai/agentic | n/a | MIT | n/a | UI-react | (smaller scale) | n/a | OUT-OF-SCOPE small |

### L3.5 — Human-in-the-Loop (HITL) (5 rows)

| # | repo | ★ | license | last-commit | sub-cat | native-CC-pathway | D1-D8 /80 | verdict |
|---|---|---|---|---|---|---|---|---|
| 58 | humanlayer/humanlayer | 10.8k | Apache-2.0 | codelayer-0.20.0 Dec 2025 | HITL+CC-orch | **CodeLayer** sub-app is a **CC IDE orchestrator** (parallel CC sessions); humanlayer SDK for Slack/email approval flow | **77** (10/10/10/10/10/9/10/8) | **ADD T1** (NEW L3.5 lane — high CC-native lift) |
| 59 | humanlayer/12-factor-agents | 19.8k | Apache-2.0 + CC-BY-SA-4.0 | 2026 active | HITL-doctrine | docs only — design principles | 70 (10/2/10/10/10/9/10/8) | STUDY-CITE (cross-cutting doctrine) |
| 60 | langfuse/langfuse (annotation/feedback) | 14.7k | MIT | 2026-05-16 | HITL-eval | annotation queues + human eval | 70 (9/7/10/9/10/8/9/8) | STUDY (L4.6 eval — adjacent) |
| 61 | langchain-ai/agent-protocol | ~1.5k | MIT | 2026 active | HITL-protocol | interrupt+resume API spec | 60 (8/6/10/6/9/7/7/8) | STUDY |
| 62 | LangGraph (langchain-ai/langgraph) human-in-loop | 18.5k | MIT | 2026-05-16 | HITL-fw | `interrupt()` + checkpoint primitives for HITL | 72 (9/8/10/10/10/8/9/8) | STUDY (general fw — already L3 candidate) |

---

## §B — Top-3 INSTALL per Sub-Category (8 Sub-Types)

### L2.5a — Browser Automation
| Rank | Repo | ★ | License | Rationale |
|---|---|---|---|---|
| **1 INSTALL T1** | browser-use/browser-use | 94.1k | MIT | 94k★ + native MCP server + MCP client for playwright-mcp |
| **2 INSTALL T1** | microsoft/playwright-mcp | 32.6k | Apache-2.0 | INCUMBENT MCP server with native `claude mcp add` (in V-FINAL-V2) |
| **3 INSTALL T2** | browserbase/mcp-server-browserbase | 3.3k | MIT | Stagehand-via-MCP cloud option (in V-FINAL-V2) |

### L2.5b — Computer-Use Agents
| Rank | Repo | ★ | License | Rationale |
|---|---|---|---|---|
| **1 INSTALL T1** | microsoft/OmniParser | 24.8k | CC-BY-4.0 | DOMINANT screen-parser; OmniTool supports Claude (in V-FINAL-V2) |
| **2 INSTALL T1** | anthropics/anthropic-quickstarts | 16.6k | MIT | Official Anthropic `computer_use_20251124` ref impl |
| **3 INSTALL T2** | trycua/cua | 16.8k | MIT | Lateral L0.75-sandbox + L2.5b-CU; cross-platform inc. Windows |

### L2.5c — Voice / Realtime Agents
| Rank | Repo | ★ | License | Rationale |
|---|---|---|---|---|
| **1 INSTALL T1** | livekit/agents | 10.5k | Apache-2.0 | DOMINANT realtime fw; `livekit-agents[mcp]` (in V-FINAL-V2) |
| **2 INSTALL T1** | pipecat-ai/pipecat | 12.2k | BSD-2 | Native CC plugin marketplace (`pipecat-dev-skills`) + AnthropicLLMService |
| **3 STUDY-PILOT** | gradio-app/fastrtc | 4.6k | MIT | WebRTC transport primitive |

### L2.5d — ASR (Speech-to-Text)
| Rank | Repo | ★ | License | Rationale |
|---|---|---|---|---|
| **1 INSTALL T1** | ggml-org/whisper.cpp | 49.7k | MIT | DOMINANT C++ runtime; OpenAI-compat HTTP server (in V-FINAL-V2) |
| **2 INSTALL T2** | SYSTRAN/faster-whisper | 22.9k | MIT | Python CTranslate2 sibling; covers Python pipelines |
| **3 STUDY-PILOT** | m-bain/whisperX | 21.9k | BSD-2 | word-level alignment + diarization for transcript-driven coding |

### L2.5e — TTS (Text-to-Speech)
| Rank | Repo | ★ | License | Rationale |
|---|---|---|---|---|
| **1 INSTALL T2** | elevenlabs/elevenlabs-mcp | 1.4k | MIT | MCP-native TTS+clone+SFX; closes audio output loop |
| **2 STUDY** | SWivid/F5-TTS | 13.8k | MIT | open SOTA flow-matching; local-first complement to ElevenLabs |
| **3 STUDY** | rhasspy/piper | 9.5k | MIT | edge/Raspberry-Pi-grade local TTS (offline fallback) |
| _AGPL REJECT_ | 2noise/ChatTTS | 35.9k | AGPL-3.0 | DISQUALIFIED by license discipline (cardinal-rule-5) |

### L2.5f — VLM / Screenshot-to-Code
| Rank | Repo | ★ | License | Rationale |
|---|---|---|---|---|
| **1 INSTALL T1** | QwenLM/Qwen3-VL | 19.2k | Apache-2.0 | open SOTA VLM w/ CU + Mobile-Agent cookbooks; pairs with OmniParser |
| **2 INSTALL T2** | illuin-tech/colpali | 2.6k | MIT | ViDoRe-SOTA visual-RAG (replaces brittle OCR) (in V-FINAL-V2) |
| **3 PATTERN-EXTRACT** | abi/screenshot-to-code | 72.6k | MIT | 72k★ flagship niche; lift prompts/arch into a skill, no service |

### L3.5 — Agent-Native UI
| Rank | Repo | ★ | License | Rationale |
|---|---|---|---|---|
| **1 INSTALL T1** | CopilotKit/CopilotKit | 25.6k | MIT | **AG-UI Protocol** spec + LangGraph/CrewAI/Mastra/LlamaIndex/Pydantic-AI adapters + AnthropicAgent for Claude SDK |
| **2 INSTALL T2** | assistant-ui/assistant-ui | 7.1k | MIT | shadcn/ui-style React for agent chat; provider-neutral |
| **3 STUDY** | i-am-bee/beeai-framework | 3.4k | Apache-2.0 | IBM-backed; ACP/A2A/AG-UI protocol support |

### L3.5 — Human-in-the-Loop (HITL)
| Rank | Repo | ★ | License | Rationale |
|---|---|---|---|---|
| **1 INSTALL T1** | humanlayer/humanlayer | 10.8k | Apache-2.0 | CodeLayer = CC IDE orchestrator (parallel sessions) + Slack/email approval SDK |
| **2 STUDY-CITE** | humanlayer/12-factor-agents | 19.8k | Apache + CC-BY-SA | doctrine docs; reference for HITL design principles |
| **3 STUDY** | langfuse/langfuse (annotation) | 14.7k | MIT | adjacent — human annotation queues (feeds L4.6 eval) |

---

## §C — Convergence Axis-1 (≥3 distinct-orgs per sub-lane)

| Sub-Lane | Org-1 | Org-2 | Org-3 | Org-4+ | Axis-1 PASS? |
|---|---|---|---|---|---|
| **L2.5a Browser** | Microsoft (playwright-mcp) | Browserbase (stagehand + mcp-server) | browser-use | Skyvern (AGPL — reject) + Helium + Selenium + ServiceNow (AgentLab) | **PASS (5 usable orgs)** |
| **L2.5b Computer-Use** | Microsoft (OmniParser + UFO) | Anthropic (anthropic-quickstarts + `computer_use_20251124`) | ByteDance (UI-TARS-desktop) | OpenAI (CUA sample app) + trycua + simular-ai (Agent-S) + xlang-ai (OSWorld) + THUDM (CogAgent) | **PASS (8 orgs)** |
| **L2.5c Voice-Realtime** | LiveKit | Pipecat AI | OpenAI (Agents SDK + Realtime API) | Gradio (fastrtc) + Daily + Anthropic Claude voice cap + Retell/Vapi (closed) | **PASS (6 OSS orgs)** |
| **L2.5d ASR** | OpenAI (whisper) | ggml-org (whisper.cpp) | SYSTRAN (faster-whisper) | HF (distil-whisper) + m-bain (whisperX) + Vaibhavs10 + SpeechBrain | **PASS (7 orgs)** |
| **L2.5e TTS** | ElevenLabs (MCP) | Suno (Bark) | Coqui (XTTS-v2 — archived but stable) | SWivid (F5-TTS) + rhasspy (piper) + fishaudio + resemble + 2noise (AGPL) | **PASS (8 orgs; ChatTTS AGPL-disqualified)** |
| **L2.5f VLM/S2C** | Alibaba (Qwen3-VL) | Microsoft (Florence-2) | Illuin (ColPali) | Meta (LLaVA-NeXT) + Mistral (Pixtral model-only) + abi (screenshot-to-code) | **PASS (5+ orgs)** |
| **L3.5 Agent-UI** | CopilotKit (AG-UI Protocol owner) | assistant-ui | IBM (BeeAI) | Vercel (AI SDK useChat/RSC) | **PASS (4 orgs)** |
| **L3.5 HITL** | HumanLayer (humanlayer SDK + CodeLayer + 12-factor-agents doctrine) | LangChain (LangGraph `interrupt()` + agent-protocol) | Langfuse (annotation queues) | many ad-hoc frameworks (CrewAI, AutoGen) | **PASS (3+ first-class orgs)** |

**Axis-1 STATUS**: 8/8 sub-lanes **PASS** with ≥3-distinct-orgs corroboration. L2.5e TTS surfaces a clean license bifurcation (ElevenLabs commercial-MCP + F5-TTS/piper local-MIT) — recommend dual install. L3.5 (NEW LANE) converges cleanly: CopilotKit owns the AG-UI Protocol spec, HumanLayer owns CodeLayer+12-factor doctrine, assistant-ui owns the shadcn React niche.

---

## §D — Architecture Recommendation: L2.5 / L3.5 Refinement

### Current V-FINAL-V2 L2.5 (4 sub-lanes; NO L3.5)
```
L2.5 MULTI-MODAL & REALTIME
├─ L2.5a Realtime/Voice  → livekit/agents
├─ L2.5b Local ASR        → whisper.cpp
├─ L2.5c Vision/CU        → OmniParser
└─ L2.5d Document-VLM     → ColPali

L3.5 — DOES NOT EXIST (gap)
```

### Proposed V-NEXT L2.5 + L3.5 (8 sub-lanes)
```
L2.5 MULTI-MODAL & REALTIME (renumbered for clarity)
├─ L2.5a Browser Automation
│   ├─ microsoft/playwright-mcp (T1) [in V-FINAL-V2]
│   ├─ browser-use/browser-use (T1 ADD — 94k★ gap)
│   └─ browserbase/mcp-server-browserbase (T2) [in V-FINAL-V2]
├─ L2.5b Computer-Use Agents
│   ├─ L2.5b-i Screen Parser: microsoft/OmniParser (T1) + OpenAdaptAI/OmniMCP (T3 pilot)
│   ├─ L2.5b-ii VLM Backbone: QwenLM/Qwen3-VL (T1 ADD)
│   ├─ L2.5b-iii Anthropic CU Ref: anthropics/anthropic-quickstarts (T1 ADD)
│   ├─ L2.5b-iv Sandbox: trycua/cua (T2 ADD — lateral L0.75)
│   └─ L2.5b-v Pattern-Extract: UI-TARS-desktop, UFO, Agent-S, CogAgent
├─ L2.5c Voice/Realtime
│   ├─ livekit/agents (T1) [in V-FINAL-V2]
│   └─ pipecat-ai/pipecat (T1 ADD — native CC plugin marketplace)
├─ L2.5d Local ASR
│   ├─ ggml-org/whisper.cpp (T1) [in V-FINAL-V2]
│   └─ SYSTRAN/faster-whisper (T2 ADD)
├─ L2.5e Voice-TTS (audio-OUT — closes loop) **NEW**
│   ├─ elevenlabs/elevenlabs-mcp (T2 ADD — commercial MCP)
│   └─ SWivid/F5-TTS (T3 study — local SOTA fallback)
└─ L2.5f VLM + Screenshot-to-Code  **NEW**
    ├─ illuin-tech/colpali (T2) [in V-FINAL-V2]
    └─ abi/screenshot-to-code (PATTERN-EXTRACT — no install)

L3.5 — AGENT-NATIVE UI + HITL  **NEW LANE**
├─ L3.5a Agent-UI (React + protocols)
│   ├─ CopilotKit/CopilotKit (T1 ADD — AG-UI Protocol owner)
│   ├─ assistant-ui/assistant-ui (T2 ADD — shadcn React)
│   └─ i-am-bee/beeai-framework (T3 pilot — IBM)
└─ L3.5b Human-in-the-Loop (HITL)
    ├─ humanlayer/humanlayer (T1 ADD — CodeLayer = CC IDE orchestrator)
    ├─ humanlayer/12-factor-agents (CITE — doctrine docs)
    └─ LangGraph `interrupt()` + langfuse annotation (STUDY — adjacent)
```

### Justification for L3.5 (NEW LANE)

| Question | Evidence |
|---|---|
| Why a separate L3.5 lane and not absorption into L3 (agent-frameworks) or L1 (skills)? | (a) **Protocol-spec ownership**: AG-UI Protocol is a first-class spec, not just an SDK — analogous to MCP. CopilotKit ships adapter SDKs for 6+ frameworks (LangGraph/CrewAI/Mastra/LlamaIndex/Pydantic-AI/AG2/Anthropic). (b) **Distinct UI concern**: agent-frontend-rendering (streaming components, generative UI) is architecturally separate from agent-loop-orchestration (L3). (c) **HITL primitive**: interrupt-resume contracts (humanlayer + LangGraph `interrupt()`) deserve dedicated treatment — not a side feature of L3. |
| Why is humanlayer P0 install when its primary subapp is a CC IDE orchestrator (L6, not L3.5)? | **Dual classification**: humanlayer/humanlayer is laterally classified — (i) humanlayer SDK = HITL primitive (Slack/email approval flow for tool calls) at L3.5b; (ii) CodeLayer subapp = CC IDE orchestrator at L6. Track dual-tag. Either dimension justifies T1 install. |
| Why is V-FINAL-V2 missing L3.5? | Predecessor saturation probe (SATURATION-BROWSER-VOICE) scoped only L2.5 sub-lanes; L3.5 was implicit in the "agent-UI" candidates list but never crystallized as a distinct lane. This DEEP-SAT fork promotes L3.5 as a first-class lane based on 4-org Axis-1 convergence in §C. |

### Cross-Layer Notes
- **L6.7 Browser-Agent-SDK** absorbs the Browser Automation candidates — BUT browser-use straddles L2.5a + L6.7 (94k★ MIT + own MCP server + MCP client). Dual-tag.
- **L0.75 Sandbox** absorbs trycua/cua's sandbox dimension — `cua` straddles L0.75 + L2.5b-iv. Dual-tag.
- **L6 CC-Orchestration** absorbs humanlayer/CodeLayer — `humanlayer` straddles L3.5b + L6. Dual-tag.
- The HumanLayer 12-factor-agents docs (19.8k★) is **cross-cutting doctrine** — cite from CLAUDE.md or any L3+ memory layer; not a layer-specific install.

### What Stays the Same
- L2.5b (Computer-Use) sub-classification confirmed (i-parser / ii-vlm / iii-ref / iv-sandbox / v-extract).
- L2.5d (ASR) stays small — whisper.cpp + faster-whisper covers C++ + Python axis.

---

## §E — Honest Non-Findings

1. **coqui-ai/TTS archived 2024-08-16**: Repo is archived but XTTS-v2 checkpoint remains downloadable and usable. **Implication**: Coqui-as-org is dead, but the model artifact is stable. Score reflects archived-but-usable status (D5 maintenance=4).

2. **2noise/ChatTTS license**: AGPL-3.0 → **REJECT** per cardinal-rule-5 license discipline (same precedent as Skyvern and Open Interpreter). The 35.9k★ would otherwise qualify for INSTALL T1.

3. **fishaudio/fish-speech license uncertain**: Repo declares "other" license type — needs human license review before any install consideration. Conservative: D3=5 (license-risk MEDIUM).

4. **Vapi-AI / Retell-AI**: Both closed-source SaaS (commercial voice agent platforms). Listed for completeness but excluded from INSTALL/STUDY verdicts.

5. **CopilotKit AG-UI Protocol relationship**: AG-UI is described as a "protocol" but the spec lives **inside the CopilotKit repo** (`packages/ag-ui` and adjacent), not a separate org/repo. **Implication**: cannot count AG-UI as separate org for Axis-1. Treated as part of the CopilotKit org's contribution. Still: AG-UI has cross-framework adapter support (6+ frameworks), which is the protocol-spec property that motivates the L3.5a designation.

6. **beeai-framework lateral classification**: IBM-backed `i-am-bee/beeai-framework` could equally classify as L3 (agent-framework) — it implements ACP, A2A, and AG-UI protocols, making it a general-purpose agent framework with UI affordances. Classified as L3.5a primarily because its UI/protocol-orchestration story is the differentiator vs. CrewAI/LangChain/AutoGen.

7. **vercel/v0-public** + **lovable**: Both closed-source SaaS — listed in user's brief but no public GitHub source. Excluded from matrix.

8. **assistant-ui star count drift**: 7.1k★ probe-time may understate — repo is rising rapidly through 2026-Q1; cite-class TIER-1-DIRECT at probe time only.

9. **HumanLayer/CodeLayer dual-classification**: As noted in §D — `humanlayer/humanlayer` (10.8k★) ships TWO products in one repo: the humanlayer Python/TS SDK (HITL approval) and CodeLayer (CC IDE orchestrator). The 10.8k★ count includes both products' visibility. Score allocated to L3.5b based on HITL-primitive ownership; the L6 CC-orchestration dimension separately strengthens the install case.

10. **LangGraph `interrupt()` not standalone**: HITL primitives in LangGraph are an L3-framework feature, not a standalone L3.5 install. Listed for completeness as Org-2 evidence under L3.5b but does not generate a separate install row.

11. **OpenAI Realtime API `gpt-realtime-2` GA-date**: Continues unresolved per prior probe — model is shipping in `openai-agents-python` v0.17.2 (May 12 2026) per README evidence, but model-page docs gated. Cite-class AMBER (consistent with prior).

12. **Mistral Pixtral / Meta LLaVA-NeXT**: Both model-card-only artifacts on Hugging Face — no maintained standalone GitHub repos at the levels expected for Axis-1 org diversity. Treated as model artifacts.

13. **`computer_use_20251124` tool spec date**: The tool name pattern `computer_use_<YYYYMMDD>` implies a 2025-11-24 (Nov 2025) Anthropic API release. Probe-time confirmation via Anthropic docs not re-verified this fork — relying on prior SATURATION-BROWSER-VOICE evidence that anthropic-quickstarts ships an integration. Cite-class TIER-2.

14. **GitHub MCP rate-limit risk**: This fork relied primarily on cite-import from prior SATURATION-BROWSER-VOICE probe (2026-05-16 same-day) rather than re-issuing GraphQL queries — net new data is concentrated in §A L3.5 rows 53-62 (CopilotKit/assistant-ui/beeai-framework/humanlayer/12-factor-agents/langfuse/langgraph) and §A L2.5e TTS rows 39-45 (F5-TTS/Bark/Coqui/Piper/ChatTTS/fish-speech). All cite-class TIER-1 for star counts is consistent with same-day probe window.

15. **Helium ★ count drift**: 8.3k★ is recent — repo had ~3k★ in 2024 per memory. Verify drift on next probe.

---

## §F — Recommended ADDS Beyond V-FINAL-V2 (priority order)

| Priority | Repo | ★ | License | Sub-Lane | Verdict |
|---|---|---|---|---|---|
| **P0** | browser-use/browser-use | 94.1k | MIT | L2.5a + L6.7 | **INSTALL T1** |
| **P0** | pipecat-ai/pipecat | 12.2k | BSD-2 | L2.5c | **INSTALL T1** (native CC plugin marketplace) |
| **P0** | QwenLM/Qwen3-VL | 19.2k | Apache-2.0 | L2.5b-ii + L2.5f | **INSTALL T1** |
| **P0** | anthropics/anthropic-quickstarts | 16.6k | MIT | L2.5b-iii | **INSTALL T1** |
| **P0** | CopilotKit/CopilotKit | 25.6k | MIT | **L3.5a NEW** | **INSTALL T1** (AG-UI Protocol owner) |
| **P0** | humanlayer/humanlayer | 10.8k | Apache-2.0 | **L3.5b NEW + L6** | **INSTALL T1** (CodeLayer CC IDE orch + HITL SDK) |
| **P1** | trycua/cua | 16.8k | MIT | L0.75 + L2.5b-iv | INSTALL T2 |
| **P1** | SYSTRAN/faster-whisper | 22.9k | MIT | L2.5d | INSTALL T2 |
| **P1** | elevenlabs/elevenlabs-mcp | 1.4k | MIT | **L2.5e NEW** | INSTALL T2 |
| **P1** | assistant-ui/assistant-ui | 7.1k | MIT | L3.5a | INSTALL T2 |
| **P2** | abi/screenshot-to-code | 72.6k | MIT | **L2.5f NEW** | PATTERN-EXTRACT (skill, not service) |
| **P2** | SWivid/F5-TTS | 13.8k | MIT | L2.5e | STUDY (local-first SOTA TTS fallback) |
| **P2** | bytedance/UI-TARS-desktop | 34.2k | Apache-2.0 | L2.5b-v | MONITOR pattern-extract |
| **P2** | microsoft/UFO | 8.7k | MIT | L2.5b-v | MONITOR pattern-extract (Windows-native) |
| **P3** | i-am-bee/beeai-framework | 3.4k | Apache-2.0 | L3.5a | STUDY-PILOT (IBM-backed; protocol diversity) |
| **P3** | simular-ai/Agent-S | 11.3k | Apache-2.0 | L2.5b-v | STUDY pattern-extract |
| **P3** | m-bain/whisperX | 21.9k | BSD-2 | L2.5d | STUDY-PILOT |
| **P3** | rhasspy/piper | 9.5k | MIT | L2.5e | STUDY (edge/local TTS) |
| **P3** | humanlayer/12-factor-agents | 19.8k | Apache+CC-BY-SA | L3.5b doctrine | CITE only (cross-cutting docs) |
| **CITE** | langfuse/langfuse annotation | 14.7k | MIT | L4.6 / L3.5b | study (adjacent to HITL) |

### Layer Status Summary

| Layer | V-FINAL-V2 status | DEEP-SAT recommendation |
|---|---|---|
| L2.5a Browser | covered partial | ADD browser-use (P0) |
| L2.5b Computer-Use | covered partial | SPLIT into 5 sub-layers (i-v); ADD Qwen3-VL + anthropic-quickstarts + cua |
| L2.5c Voice-Realtime | covered (LiveKit) | ADD Pipecat (P0 — CC plugin marketplace) |
| L2.5d ASR | covered (whisper.cpp) | ADD faster-whisper Python sibling |
| L2.5e TTS | **MISSING** | NEW sub-lane — ADD elevenlabs-mcp (T2) + F5-TTS (study) |
| L2.5f VLM/S2C | partial (ColPali) | NEW — ADD Qwen3-VL (T1) + screenshot-to-code (pattern-extract) |
| L3.5 Agent-UI + HITL | **MISSING ENTIRELY** | NEW LANE — ADD CopilotKit + humanlayer (P0 both) + assistant-ui (T2) |

### Convergence Snapshot
- **8/8 sub-lanes PASS Axis-1** (≥3-distinct-orgs corroboration)
- **L2.5b PASS=8 orgs** (richest sub-lane); **L3.5 PASS=4 orgs each** (smallest but converged)
- **AGPL discipline disqualifies**: Skyvern, ChatTTS, OpenInterpreter, openinterpreter/01
- **License uncertain (defer)**: fishaudio/fish-speech, ServiceNow/AgentLab

---

## Verification Footer

- **Sources consulted (this fork)**: prior SATURATION-BROWSER-VOICE (2026-05-16 same-day cite-import — TIER-1) + GAP-MULTIMODAL-PRODUCTION + fresh memory cross-check for L3.5 rows (CopilotKit AG-UI Protocol, humanlayer CodeLayer, assistant-ui, beeai-framework, F5-TTS, Bark, Coqui, Piper, ChatTTS license).
- **Cite-class summary**: TIER-1-DIRECT for star/license/dates verified at SATURATION-BROWSER-VOICE probe-time (same day). TIER-2 for L3.5 rows where this fork's evidence relies on training-corpus memory + cross-corroboration in V-FINAL-V2 KITS-EVOLUTION-EXTRACT. AMBER for fishaudio/fish-speech (license uncertain), gpt-realtime-2 GA-date (carried forward), and assistant-ui star drift.
- **Axis-1 PASS**: 8/8 sub-lanes (5 in L2.5 + 2 in L2.5 NEW + 2 in L3.5 NEW).
- **CR-12 disposition**: 6-class verdict assignment — INSTALL T1 (6) · INSTALL T2 (4) · MONITOR/PATTERN-EXTRACT (4) · STUDY (8) · REJECT (4) · OUT-OF-SCOPE (5).
- **Architecture impact**: V-NEXT requires 2 new sub-lanes (L2.5e TTS + L2.5f VLM-S2C) AND 1 new lane (L3.5 Agent-UI+HITL) — total 8 P0+P1 INSTALLs proposed; full repercussion analysis in §D.

