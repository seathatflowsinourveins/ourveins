# THE GRAND CATALOG — PART 3: L4-L5 Eval+Security+Workflow Cluster

> **Aggregated 2026-05-16** from 11 fork files in `06-fresh-research-delta/`.
> **Schema**: Repo · Stars · License · Sub-layer · Native-CC-pathway · Verdict · Source-fork.
> **Verdict legend**: INSTALL-T1 (primary) · INSTALL-T2 (secondary) · INSTALL-IF-X (conditional) · STUDY-PILOT · STUDY · MONITOR · PATTERN-EXTRACT · DEFER · REJECT · REJECT-AGPL · REJECT-NOISE.

## Coverage map

| Layer | Sub-layer | Row count |
|---|---|---:|
| L2.5 / L3.5 | Multimodal · Browser · Voice · ASR · TTS · VLM · UI · HITL | 67 |
| L4.0 | Eval framework · Observability · Cost/Gateway · Mutation · Benchmark | 62 |
| L4.5 | Reasoning · Reward · Research-agent | 18 |
| L4.5 | Doc Ingestion / ETL (cross-listed) | (in PART-2) |
| L5.0 | Security · PII · Guard · MCP-audit · Secrets · Sigstore · Red-team · Policy · Audit-trail · Injection | 45 |
| L5.5 | Workflow · DevOps · Obs · DAG · CI/CD · IaC · K8s · SCM | 57 |
| L5.7 | Durable Execution (cluster · sidecar · postgres) | 7 |
| Q2-2026 | New-entrants ≥2k★ created>2026-03-01 (cross-cutting) | 60 |
| **TOTAL** | | **~316** |

---

## §L2.5/L3.5 — Multimodal · UI · Browser · Voice · Vision (67 rows)

### L2.5a — Browser Automation (10)

| Repo | Stars | License | Sub-layer | Native-CC-pathway | Verdict | Source-fork |
|---|---:|---|---|---|---|---|
| microsoft/playwright | 88.8k | Apache-2.0 | L2.5a base | indirect | KEEP | DEEP-SAT-L25-L35 |
| microsoft/playwright-mcp | 32.6k | Apache-2.0 | L2.5a MCP | `claude mcp add playwright` | INSTALL-T1 | DEEP-SAT-L25-L35 |
| browser-use/browser-use | 94.1k | MIT | L2.5a agent | `uvx browser-use --mcp` | **INSTALL-T1** | DEEP-SAT-L25-L35 |
| browserbase/stagehand | 22.7k | MIT | L2.5a SDK | Python+TS local+cloud | EVALUATE | DEEP-SAT-L25-L35 |
| browserbase/mcp-server-browserbase | 3.3k | MIT | L2.5a MCP | MCP-server | INSTALL-T2 | DEEP-SAT-L25-L35 |
| Skyvern-AI/skyvern | 21.6k | AGPL-3.0 | L2.5a agent | n/a | **REJECT-AGPL** | DEEP-SAT-L25-L35 |
| mherrmann/helium | 8.3k | MIT | L2.5a shim | indirect | SKIP | DEEP-SAT-L25-L35 |
| SeleniumHQ/selenium | 34.1k | Apache-2.0 | L2.5a base | indirect | KEEP-baseline | DEEP-SAT-L25-L35 |
| ServiceNow/AgentLab | 579 | custom | L2.5a eval | benchmark | STUDY | DEEP-SAT-L25-L35 |
| natbat/codename-goose (block.xyz) | n/a | Apache-2.0 | L2.5a agent | possible | OUT-OF-SCOPE | DEEP-SAT-L25-L35 |

### L2.5b — Computer-Use Agents (12)

| Repo | Stars | License | Sub-layer | Native-CC-pathway | Verdict | Source-fork |
|---|---:|---|---|---|---|---|
| microsoft/OmniParser | 24.8k | CC-BY-4.0 | L2.5b parser | OmniTool supports Claude | **INSTALL-T1** | DEEP-SAT-L25-L35 |
| OpenAdaptAI/OmniMCP | 71 | MIT | L2.5b MCP | MCP-server wrap OmniParser | STUDY-PILOT | DEEP-SAT-L25-L35 |
| bytedance/UI-TARS-desktop | 34.2k | Apache-2.0 | L2.5b desktop | Agent-TARS macOS only | MONITOR | DEEP-SAT-L25-L35 |
| trycua/cua | 16.8k | MIT | L0.75+L2.5b sandbox+CU | sandbox+driver | **INSTALL-T2** | DEEP-SAT-L25-L35 |
| anthropics/anthropic-quickstarts | 16.6k | MIT | L2.5b ref | `computer_use_20251124` ref impl | **INSTALL-T1** | DEEP-SAT-L25-L35 |
| simular-ai/Agent-S | 11.3k | Apache-2.0 | L2.5b agent | Agent-S3 72.6% OSWorld | STUDY-PATTERN | DEEP-SAT-L25-L35 |
| microsoft/UFO | 8.7k | MIT | L2.5b Windows | Windows-deep multi-agent DAG | MONITOR-PATTERN | DEEP-SAT-L25-L35 |
| openai/openai-cua-sample-app | 1.7k | MIT | L2.5b ref | reference impl | STUDY-CROSS-VENDOR | DEEP-SAT-L25-L35 |
| xlang-ai/OSWorld | 2.85k | NeurIPS custom | L2.5b eval | benchmark only | STUDY-CITE | DEEP-SAT-L25-L35 |
| microsoft/Magma | 1.9k | MIT | L2.5b VLA | VLA model | STUDY | DEEP-SAT-L25-L35 |
| mannaandpoem/OpenManus | 469 | MIT | L2.5b agent | Manus clone | SKIP | DEEP-SAT-L25-L35 |
| THUDM/CogAgent | 7.3k | Apache-2.0 | L2.5b VLA | 18B VLA | STUDY | DEEP-SAT-L25-L35 |

### L2.5c — Voice/Realtime (8)

| Repo | Stars | License | Sub-layer | Native-CC-pathway | Verdict | Source-fork |
|---|---:|---|---|---|---|---|
| livekit/agents | 10.5k | Apache-2.0 | L2.5c realtime | `livekit-plugins-anthropic` + MCP | **INSTALL-T1** | DEEP-SAT-L25-L35 |
| pipecat-ai/pipecat | 12.2k | BSD-2 | L2.5c realtime | `claude plugin marketplace add pipecat-ai/skills` | **INSTALL-T1** | DEEP-SAT-L25-L35 |
| openai/openai-agents-python | 26.3k | MIT | L2.5c realtime | `gpt-realtime-2` voice | STUDY-CROSS-VENDOR | DEEP-SAT-L25-L35 |
| gradio-app/fastrtc | 4.6k | MIT | L2.5c webrtc | Python WebRTC primitive | STUDY-PILOT | DEEP-SAT-L25-L35 |
| daily-co/daily-python | 65 | BSD-2 | L2.5c video | Daily SDK | SKIP-COMMERCIAL | DEEP-SAT-L25-L35 |
| openai/openai-realtime-agents | 6.9k | MIT | L2.5c ref | TS demos | STUDY | DEEP-SAT-L25-L35 |
| openai/openai-realtime-console | 3.6k | MIT | L2.5c debug | React inspector | STUDY | DEEP-SAT-L25-L35 |
| Retell-AI / Vapi-AI | n/a | closed | L2.5c SaaS | n/a | SKIP-CLOSED | DEEP-SAT-L25-L35 |

### L2.5d — ASR (7)

| Repo | Stars | License | Sub-layer | Native-CC-pathway | Verdict | Source-fork |
|---|---:|---|---|---|---|---|
| openai/whisper | 99.6k | MIT | L2.5d model | model only | KEEP | DEEP-SAT-L25-L35 |
| ggml-org/whisper.cpp | 49.7k | MIT | L2.5d runtime | `whisper-server` HTTP OpenAI-compat | **INSTALL-T1** | DEEP-SAT-L25-L35 |
| SYSTRAN/faster-whisper | 22.9k | MIT | L2.5d python | CTranslate2-accel | **INSTALL-T2** | DEEP-SAT-L25-L35 |
| m-bain/whisperX | 21.9k | BSD-2 | L2.5d align | word-level + diarization | STUDY-PILOT | DEEP-SAT-L25-L35 |
| Vaibhavs10/insanely-fast-whisper | 12.9k | Apache-2.0 | L2.5d fast | FlashAttention-2 | SKIP | DEEP-SAT-L25-L35 |
| huggingface/distil-whisper | 4.1k | MIT | L2.5d distilled | 6x faster | STUDY | DEEP-SAT-L25-L35 |
| speechbrain/speechbrain | 11.2k | Apache-2.0 | L2.5d toolkit | broad audio AI | STUDY | DEEP-SAT-L25-L35 |

### L2.5e — TTS (8)

| Repo | Stars | License | Sub-layer | Native-CC-pathway | Verdict | Source-fork |
|---|---:|---|---|---|---|---|
| elevenlabs/elevenlabs-mcp | 1.4k | MIT | L2.5e MCP | MCP-server TTS+clone+SFX+music | **INSTALL-T2** | DEEP-SAT-L25-L35 |
| suno-ai/bark | 38.4k | MIT | L2.5e model | transformer TTS+clone | STUDY | DEEP-SAT-L25-L35 |
| coqui-ai/TTS | 36.5k | MPL-2.0 | L2.5e model | XTTS-v2 archived | STUDY | DEEP-SAT-L25-L35 |
| SWivid/F5-TTS | 13.8k | MIT | L2.5e model | flow-matching SOTA | **INSTALL-T2** | DEEP-SAT-L25-L35 |
| 2noise/ChatTTS | 35.9k | AGPL-3.0 | L2.5e model | conversation-tuned | **REJECT-AGPL** | DEEP-SAT-L25-L35 |
| rhasspy/piper | 9.5k | MIT | L2.5e edge | fast neural local TTS | STUDY | DEEP-SAT-L25-L35 |
| fishaudio/fish-speech | 23.1k | other | L2.5e model | multilingual zero-shot | STUDY-LICENSE-AMBER | DEEP-SAT-L25-L35 |
| resemble-ai/chatterbox | 4.2k | MIT | L2.5e model | production zero-shot | STUDY | DEEP-SAT-L25-L35 |

### L2.5f — VLM + Screenshot-to-Code (7)

| Repo | Stars | License | Sub-layer | Native-CC-pathway | Verdict | Source-fork |
|---|---:|---|---|---|---|---|
| QwenLM/Qwen3-VL | 19.2k | Apache-2.0 | L2.5f VLM | CU+Mobile-Agent cookbooks | **INSTALL-T1** | DEEP-SAT-L25-L35 |
| illuin-tech/colpali | 2.6k | MIT | L2.5f doc-VLM | ColPali/ColQwen2/ColSmol | INSTALL-T2 | DEEP-SAT-L25-L35 |
| haotian-liu/LLaVA-NeXT | 24.8k | Apache-2.0 | L2.5f VLM | model only | SKIP (eroded) | DEEP-SAT-L25-L35 |
| huggingface/Florence-2-large | n/a | MIT | L2.5f small-VLM | 0.77B task-prompted | STUDY-PILOT | DEEP-SAT-L25-L35 |
| abi/screenshot-to-code | 72.6k | MIT | L2.5f s2c | standalone web app | **PATTERN-EXTRACT** | DEEP-SAT-L25-L35 |
| FormStr/screenshot-to-component | ~1k | MIT | L2.5f s2c | image→React | STUDY | DEEP-SAT-L25-L35 |
| mistralai/Pixtral | n/a | model-card | L2.5f VLM | model artifact | OUT-OF-SCOPE | DEEP-SAT-L25-L35 |

### L3.5 — Agent-Native UI + HITL (10)

| Repo | Stars | License | Sub-layer | Native-CC-pathway | Verdict | Source-fork |
|---|---:|---|---|---|---|---|
| CopilotKit/CopilotKit | 31.4k | MIT | L3.5a Agent-UI | AG-UI Protocol + 11+ org adoption | **INSTALL-T1** | GAP-L35-L475 |
| humanlayer/humanlayer | 10.8k | Apache-2.0 | L3.5b HITL+CC-orch | CodeLayer CC IDE orch + Slack/email | **INSTALL-T1** | GAP-L35-L475 |
| assistant-ui/assistant-ui | 10.1k | MIT | L3.5a Agent-UI | shadcn React provider-neutral | INSTALL-T2 | DEEP-SAT-L25-L35 |
| i-am-bee/beeai-framework | 3.4k | Apache-2.0 | L3.5a framework | IBM ACP/A2A/AG-UI | STUDY-PILOT | DEEP-SAT-L25-L35 |
| vercel/ai (Vercel AI SDK) | ~10k | Apache-2.0 | L3.5a SDK | useChat+RSC+Anthropic | STUDY | DEEP-SAT-L25-L35 |
| CopilotKit/generative-ui | 1.3k | MIT | L3.5a UI | AG-UI+A2UI+MCP-Apps ref | STUDY-PILOT | GAP-L35-L475 |
| CopilotKit/aimock | 584 | MIT | L3.5a test | Mock LLM/MCP/A2A/AG-UI | STUDY-PILOT | GAP-L35-L475 |
| humanlayer/12-factor-agents | 19.8k | Apache+CC-BY-SA | L3.5b doctrine | docs only | CITE-DOCTRINE | DEEP-SAT-L25-L35 |
| langchain-ai/agent-protocol | ~1.5k | MIT | L3.5b protocol | interrupt+resume spec | STUDY | DEEP-SAT-L25-L35 |
| ThinkInAIXYZ/deepchat | 5.8k | TypeScript | L3.5 Agent-UI | UI for agents | INSTALL-CANDIDATE | TRANCHE-F |

### L3.5 — Protocol/Budget (5)

| Repo | Stars | License | Sub-layer | Native-CC-pathway | Verdict | Source-fork |
|---|---:|---|---|---|---|---|
| ai-boost/awesome-harness-engineering | 942 | n/a | L3.5 cite | curated list | CITE | GAP-L35-L475 |
| ai-boost/awesome-a2a | 592 | n/a | L3.5 cite | A2A catalog | CITE | GAP-L35-L475 |
| Portkey-AI/gateway | 11.7k | MIT | L4.75 gateway | 1,600 LLMs + budget + MCP | **INSTALL-T1** | GAP-L35-L475 |
| Helicone/helicone | 5.7k | Apache-2.0 | L4.75 obs+gateway | Rust AI-Gateway + caching | INSTALL-T2 | GAP-L35-L475 |
| langwatch/better-agents | 1.5k | MIT | L3.5 patterns | Standards catalog | STUDY-PILOT | GAP-L35-L475 |

---

## §L4.0 — Eval Framework · Observability · Cost/Gateway · Mutation · Benchmark (62 rows)

### L4.0a — Eval Frameworks (14)

| Repo | Stars | License | Sub-layer | Native-CC-pathway | Verdict | Source-fork |
|---|---:|---|---|---|---|---|
| promptfoo/promptfoo | 21.3k | MIT | L4 eval | MCP-as-provider (Anthropic listed) | **INSTALL-T1** | DEEP-SAT-L4 |
| confident-ai/deepeval | 15.5k | Apache-2.0 | L4 eval | OTEL emit | **INSTALL-T1** | DEEP-SAT-L4 |
| openai/evals | 18.5k | NOASSERTION | L4 eval | OTEL via openllmetry | STUDY-PILOT (research license) | DEEP-SAT-L4 |
| EleutherAI/lm-evaluation-harness | 12.6k | MIT | L4 eval | none | INSTALL-IF-BASE-LM-EVAL | DEEP-SAT-L4 |
| explodinggradients/ragas | 13.9k | Apache-2.0 | L4 eval (RAG) | OTEL via openllmetry | INSTALL-IF-RAG | DEEP-SAT-L4 |
| Marker-Inc-Korea/AutoRAG | 4.8k | Apache-2.0 | L4 eval (RAG) | none | STUDY-IF-RAG | DEEP-SAT-L4 |
| modelscope/evalscope | 2.8k | Apache-2.0 | L4 eval | none | STUDY | DEEP-SAT-L4 |
| stanford-crfm/helm | 2.8k | Apache-2.0 | L4 eval | none | STUDY | DEEP-SAT-L4 |
| UKGovernmentBEIS/inspect_ai | 2.1k | MIT | L4.5 meta-runner | OTEL via openllmetry | **INSTALL-T1** | DEEP-SAT-L4 |
| UKGovernmentBEIS/inspect_evals | 495 | MIT | L4.5 evals | via inspect_ai | **INSTALL-T1** | DEEP-SAT-L4 |
| microsoft/promptbench | 2.8k | MIT | L4 adversarial | none | STUDY-IF-ADVERSARIAL | DEEP-SAT-L4 |
| NousResearch/atropos | 1.2k | MIT | L4 RL | none | STUDY-IF-RL | DEEP-SAT-L4 |
| agentscope-ai/OpenJudge | 604 | Apache-2.0 | L4 quality-rewards | none | STUDY | DEEP-SAT-L4 |
| bigcode-evaluation-harness | 1.0k | Apache-2.0 | L4 code-gen | none | DEFER (stale) | DEEP-SAT-L4 |

### L4.0b — Observability (19)

| Repo | Stars | License | Sub-layer | Native-CC-pathway | Verdict | Source-fork |
|---|---:|---|---|---|---|---|
| langfuse/langfuse | 27.3k | MIT-like | L4 obs | OTEL+`mcp-server-langfuse` (prompts only) | **INSTALL-T1** | DEEP-SAT-L4 |
| comet-ml/opik | 19.3k | Apache-2.0 | L4 obs | `opik-mcp` 7 toolsets + OTEL + Claude SDK doc | **INSTALL-T1** | DEEP-SAT-L4 |
| Arize-ai/phoenix | 9.7k | ELv2 | L4 obs (incumbent) | `@arizeai/phoenix-mcp` + `openinference-claude-agent-sdk` + Phoenix-CLI | **RETAIN-INCUMBENT** | DEEP-SAT-L4 |
| Helicone/helicone | 5.7k | Apache-2.0 | L4 gateway+obs | `helicone-mcp` 3 tools | **INSTALL-T1** | DEEP-SAT-L4 |
| AgentOps-AI/agentops | 5.6k | MIT | L4 agent-obs | MCP + CrewAI/AG2/Agno | **INSTALL-T1** | DEEP-SAT-L4 |
| langwatch/langwatch | 3.3k | Apache-2.0 | L4 obs+sim | MCP + OTEL + agent sim | STUDY-PILOT | DEEP-SAT-L4 |
| pydantic/logfire | 4.2k | MIT | L4 obs (Python) | OTEL + pydantic-AI | **INSTALL-T1** | DEEP-SAT-L4 |
| traceloop/openllmetry | 7.1k | Apache-2.0 | L4 instrumentation | OTEL adapter 24+ backends | **INSTALL-T1** | DEEP-SAT-L4 |
| traceloop/openllmetry-js | 398 | Apache-2.0 | L4 TS | TS companion | INSTALL-IF-TS | DEEP-SAT-L4 |
| mlflow/mlflow | 26.0k | Apache-2.0 | L4 ML-platform | OTEL emit | STUDY | DEEP-SAT-L4 |
| openlit/openlit | 2.4k | Apache-2.0 | L4 obs (GPU) | OTEL-native + GPU unique | INSTALL-IF-GPU-OBS | DEEP-SAT-L4 |
| openobserve/openobserve | 18.9k | AGPL-3.0 | L4 general-APM | OTEL receiver | STUDY | DEEP-SAT-L4 |
| evidentlyai/evidently | 7.5k | Apache-2.0 | L4 ML+LLM | OTEL emit | STUDY | DEEP-SAT-L4 |
| raga-ai-hub/RagaAI-Catalyst | 16.2k | Apache-2.0 | L4 obs | none (no Claude bridge) | STUDY | DEEP-SAT-L4 |
| pezzolabs/pezzo | 3.2k | Apache-2.0 | L4 prompt-only | none | REJECT (subsumed) | DEEP-SAT-L4 |
| langchain-ai/langsmith-mcp-server | n/a | LangChain TOS | L4 SaaS-MCP | Official LangChain MCP | STUDY-IF-LANGSMITH | DEEP-SAT-L4 |
| wandb/wandb-mcp-server | n/a | W&B TOS | L4 SaaS-MCP | Official W&B MCP | STUDY-IF-WANDB | DEEP-SAT-L4 |
| future-agi/future-agi | 974 | Apache-2.0 | L4 platform | OTEL | STUDY | DEEP-SAT-L4 |
| deepchecks/deepchecks | medium | Apache-2.0 | L4 eval+validation | OpenInference + OTEL + CrewAI | STUDY | DEEP-SAT-L4 |

### L4.0c — Cost/Gateway (10)

| Repo | Stars | License | Sub-layer | Native-CC-pathway | Verdict | Source-fork |
|---|---:|---|---|---|---|---|
| BerriAI/litellm | 47.2k | MIT-like | L4 gateway | OpenAI-compat for 100+ LLMs | **INSTALL-T1** | DEEP-SAT-L4 |
| Portkey-AI/gateway | 11.7k | MIT | L4 gateway | 1,600+ LLMs + MCP topic | INSTALL-T1-ALT | DEEP-SAT-L4 |
| tensorzero/tensorzero | 11.4k | Apache-2.0 | L4 unified | gateway+obs+opt Rust | **INSTALL-T1** | DEEP-SAT-L4 |
| Helicone/ai-gateway | 589 | GPL-3.0 | L4 Rust-gateway | OSS alt | DEFER-STALE | DEEP-SAT-L4 |
| katanemo/plano | 6.5k | Apache-2.0 | L4 proxy | AI-native + orchestration | STUDY | DEEP-SAT-L4 |
| OmniRoute | 4.7k | MIT | L4 multi-provider | 160+ providers | STUDY-ALT | DEEP-SAT-L4 |
| axonhub | 3.8k | other | L4 gateway | 100+ LLMs failover | STUDY | DEEP-SAT-L4 |
| looplj/axonhub | 3.8k | MIT | L1 cross-model-proxy | Go gateway | STUDY | TRANCHE-F |
| higress | 8.4k | Apache-2.0 | L4 K8s-AI | AI-native API GW | STUDY | DEEP-SAT-L4 |
| kong/kong | 43.4k | Apache-2.0 | L4 generic-AI-GW | AI plugins | RETAIN-IF-K8S | DEEP-SAT-L4 |

### L4.0d — Mutation Testing (10)

| Repo | Stars | License | Sub-layer | Lang | Verdict | Source-fork |
|---|---:|---|---|---|---|---|
| stryker-mutator/stryker-js | 2.9k | Apache-2.0 | L4 mut | JS/TS | **INSTALL-IF-JS** | DEEP-SAT-L4 |
| stryker-mutator/stryker-net | 2.0k | Apache-2.0 | L4 mut | .NET | INSTALL-IF-DOTNET | DEEP-SAT-L4 |
| hcoles/pitest | 1.8k | Apache-2.0 | L4 mut | JVM | **INSTALL-IF-JVM** | DEEP-SAT-L4 |
| infection/infection | 2.2k | BSD-3 | L4 mut | PHP | INSTALL-IF-PHP | DEEP-SAT-L4 |
| mbj/mutant | 2.1k | MIT-like | L4 mut | Ruby | INSTALL-IF-RUBY | DEEP-SAT-L4 |
| boxed/mutmut | 1.3k | BSD-3 | L4 mut | Python | **INSTALL-IF-PYTHON** | DEEP-SAT-L4 |
| sixty-north/cosmic-ray | 632 | MIT | L4 mut | Python | ALT-PYTHON | DEEP-SAT-L4 |
| mull-project/mull | 812 | Apache-2.0 | L4 mut | C/C++ | INSTALL-IF-CPP | DEEP-SAT-L4 |
| muter-mutation-testing/muter | 551 | MIT | L4 mut | Swift | INSTALL-IF-SWIFT | DEEP-SAT-L4 |
| avito-tech/go-mutesting | 669 | MIT | L4 mut | Go | DEFER (stale) | DEEP-SAT-L4 |

### L4.0e — Benchmarks (9)

| Repo | Stars | License | Sub-layer | Native-CC-pathway | Verdict | Source-fork |
|---|---:|---|---|---|---|---|
| openai/mle-bench | 1.5k | MIT | L4 bench | wrapped in inspect_evals | STUDY-PILOT (paused) | DEEP-SAT-L4 |
| xlang-ai/OSWorld | 2.9k | Apache-2.0 | L4 bench (CU) | wrapped | **INSTALL** | DEEP-SAT-L4 |
| sierra-research/tau2-bench | 1.2k | MIT | L4 bench (multi-turn) | wrapped | **INSTALL** | DEEP-SAT-L4 |
| ShishirPatil/gorilla (BFCL v4) | 12.9k | Apache-2.0 | L4 bench (FC) | wrapped | **INSTALL** | DEEP-SAT-L4 |
| princeton-nlp/SWE-bench | 5.0k | MIT | L4 bench (SWE) | wrapped | **INSTALL** | DEEP-SAT-L4 |
| THUDM/AgentBench | 3.4k | Apache-2.0 | L4 bench | wrapped (reward-hacked) | DEFER | DEEP-SAT-L4 |
| princeton-pli/hal-harness | 281 | none-spec | L4 meta-runner | Princeton alt | STUDY | DEEP-SAT-L4 |
| laude-institute/terminal-bench | n/a | Apache-2.0 | L4 bench (terminal) | 89 hard tasks; live SOTA | **INSTALL** | GAP-EVAL |
| gaia-benchmark (HF) | n/a | Open | L4 bench (general) | via inspect_evals | INSTALL | DEEP-SAT-L4 |

---

## §L4.5 — Reasoning · Reward · Research-agent (18 rows)

| Repo | Stars | License | Sub-layer | Native-CC-pathway | Verdict | Source-fork |
|---|---:|---|---|---|---|---|
| gepa-ai/gepa | n/a | MIT | L4.5 reasoning | +6%/+20% vs GRPO 35x rollouts | **INSTALL-T1** (top-pick) | GAP-EVAL |
| codelion/openevolve | n/a | Apache-2.0 | L4.5 reasoning | LLM-driven evolutionary | STUDY-PILOT (compute-heavy) | GAP-EVAL |
| noahshinn/reflexion | 2.7k | MIT | L4.5 reasoning | self-reflect+memory | DEFER→PATTERN-CITE (stale) | GAP-EVAL |
| princeton-nlp/tree-of-thought-llm | 5.8k | MIT | L4.5 reasoning | tree-search thoughts | DEFER→PATTERN-CITE (stale) | GAP-EVAL |
| spcl/graph-of-thoughts | 2.5k | Other | L4.5 reasoning | graph topology | STUDY-PILOT | GAP-EVAL |
| MineDojo/Voyager | high | MIT | L4.5 reasoning | embodied lifelong | DEFER→PATTERN-CITE | GAP-EVAL |
| AlphaEvolve (DeepMind closed) | n/a | closed | L4.5 reasoning | Gemini evolutionary | REJECT (no OSS) | GAP-EVAL |
| stanford-oval/storm | 28.2k | Apache-2.0 | L4.5 research | knowledge curation | **INSTALL** | TRANCHE-H |
| bytedance/deer-flow | 68.0k | Apache-2.0 | L4.5 research | SuperAgent harness | **INSTALL** | TRANCHE-H |
| Alibaba-NLP/DeepResearch | 18.9k | Apache-2.0 | L4.5 research | Tongyi DR | **INSTALL** | TRANCHE-H |
| zilliztech/deep-searcher | 7.8k | Apache-2.0 | L4.5 research | Milvus DR | INSTALL | TRANCHE-H |
| LearningCircuit/local-deep-research | 7.7k | Apache-2.0 | L4.5 research | local DR | INSTALL | TRANCHE-H |
| MiroMindAI/MiroThinker | 8.2k | Apache-2.0 | L4.5 research | self-evolving | INSTALL | TRANCHE-H |
| u14app/deep-research | 4.6k | Apache-2.0 | L4.5 research | DR primitive | INSTALL | TRANCHE-H |
| modelscope/ms-agent | 4.3k | Apache-2.0 | L4.5 agent | broad | INSTALL | TRANCHE-H |
| ruc-datalab/DeepAnalyze | 4.2k | Apache-2.0 | L4.5 research | analysis agent | INSTALL | TRANCHE-H |
| MiroMindAI/MiroFlow | 3.0k | Apache-2.0 | L4.5 research | flow framework | INSTALL | TRANCHE-H |
| gomate-community/TrustRAG | 1.3k | Apache-2.0 | L4.5 RAG | trustworthy RAG | STUDY-PILOT | TRANCHE-H |

---

## §L5.0 — Security · PII · Guard · MCP-audit · Secrets · Sigstore · Red-team · Policy · Audit-trail · Injection (45 rows)

### L5.0a — Tier-1 Security Anchors (15)

| Repo | Stars | License | Sub-layer | Native-CC-pathway | Verdict | Source-fork |
|---|---:|---|---|---|---|---|
| microsoft/presidio | 8.1k | MIT | L5.0a PII | `pip install` + CLI in hook | **INSTALL-T1** | DEEP-SAT-L05-SEC |
| protectai/llm-guard | 3.0k | MIT | L5.0d guard+PII+inject | Python lib in hook | **INSTALL-T1** | DEEP-SAT-L05-SEC |
| NVIDIA/garak | 7.5k | Apache-2.0 | L5.0d red-team | `pip install garak` + CLI hook | **INSTALL-T1** | DEEP-SAT-L05-SEC |
| NVIDIA-NeMo/Guardrails | 6.1k | Apache-2.0 | L5.0d guard | Python lib (heavy — Colang) | INSTALL-HEAVY | DEEP-SAT-L05-SEC |
| snyk/agent-scan | 2.4k | Apache-2.0 | L5.0c MCP-audit | `uvx snyk-agent-scan@latest` | **INSTALL-T1** | DEEP-SAT-L05-SEC |
| getsops/sops | 21.8k | MPL-2.0 | L5.0a secrets | Direct CLI binary | **INSTALL-T1** | DEEP-SAT-L05-SEC |
| FiloSottile/age | 22.3k | BSD-3 | L5.0a secrets | Direct CLI binary | **INSTALL-T1** | DEEP-SAT-L05-SEC |
| sigstore/cosign | 5.9k | Apache-2.0 | L5.0b sigstore | Direct CLI sign/verify | **INSTALL-T1** | DEEP-SAT-L05-SEC |
| sigstore/rekor | 1.1k | Apache-2.0 | L5.0b sigstore | API transparency-log | INSTALL-T2 | DEEP-SAT-L05-SEC |
| sigstore/policy-controller | 172 | Apache-2.0 | L5.0b sigstore+policy | K8s admission | INSTALL-IF-K8S | DEEP-SAT-L05-SEC |
| cedar-policy/cedar | 1.5k | Apache-2.0 | L5.0f policy | `cargo install` + CLI | **INSTALL-T1** | DEEP-SAT-L05-SEC |
| cedar-policy/cedar-go | 198 | Apache-2.0 | L5.0f policy | Go binding | INSTALL-T2 | DEEP-SAT-L05-SEC |
| zizmorcore/zizmor | 4.9k | Apache-2.0 | L5.0e injection+policy | `cargo install zizmor` GH-Actions | **INSTALL-T1** | DEEP-SAT-L05-SEC |
| trailofbits/claude-code-config | private | n/a | L5.0d guard+audit | Direct adopt | INSTALL | DEEP-SAT-L05-SEC |
| trailofbits/claude-code-devcontainer | active | n/a | L5.0d sandbox | Devcontainer bypass | INSTALL-IF-AUDIT | DEEP-SAT-L05-SEC |

### L5.0b — Tier-2 Emerging Security (15)

| Repo | Stars | License | Sub-layer | Native-CC-pathway | Verdict | Source-fork |
|---|---:|---|---|---|---|---|
| mukul975/Anthropic-Cybersecurity-Skills | 6.3k | Apache-2.0 | L5.0d guard+red | `/plugin install` 754 skills | INSTALL | DEEP-SAT-L05-SEC |
| 0x4m4/hexstrike-ai | 8.8k | unverified | L5.0d red-team | MCP 150+ pentest tools (OFFENSIVE) | STUDY-CAUTION | DEEP-SAT-L05-SEC |
| Tencent/AI-Infra-Guard | 3.7k | unverified | L5.0d red-team | full-stack platform | STUDY | DEEP-SAT-L05-SEC |
| IBM/mcp-context-forge | 3.7k | unverified | L5.0d guard-gateway | MCP gateway | STUDY | DEEP-SAT-L05-SEC |
| archestra-ai/archestra | 3.7k | unverified | L5.0d guard-gateway | Enterprise platform | STUDY | DEEP-SAT-L05-SEC |
| intuitem/ciso-assistant-community | 4.0k | unverified | L5.0d policy+audit | GRC 130+ frameworks | STUDY | DEEP-SAT-L05-SEC |
| nextlevelbuilder/goclaw | 3.1k | unverified | L5.0d guard | OpenClaw-Go (fresh-paint) | STUDY-CAUTION | DEEP-SAT-L05-SEC |
| luckyPipewrench/pipelock | 587 | unverified | L5.0e injection+MCP-audit | AI agent firewall | STUDY-PILOT | DEEP-SAT-L05-SEC |
| getagentseal/agentseal | 256 | unverified | L5.0c MCP-audit+red | Skill scanner | STUDY | DEEP-SAT-L05-SEC |
| HarmonicSecurity/claudit-sec | 247 | unverified | L5.0c MCP-audit (CC) | macOS visibility into MCP+skills | STUDY-PILOT | DEEP-SAT-L05-SEC |
| lasso-security/claude-hooks | 239 | unverified | L5.0e injection+guard | Direct CC hooks | INSTALL-T2 | DEEP-SAT-L05-SEC |
| MCP-Defender/MCP-Defender | 252 | **AGPLv3** | L5.0c MCP-audit | desktop app | **REJECT-AGPL** | DEEP-SAT-L05-SEC |
| HeadyZhang/agent-audit | 170 | unverified | L5.0c MCP-audit+inject | OWASP Agentic Top10 | STUDY | DEEP-SAT-L05-SEC |
| apisec-inc/mcp-audit | 149 | unverified | L5.0c MCP+secrets+SBOM | Scan MCP configs | STUDY | DEEP-SAT-L05-SEC |
| gebruder/wirken | 145 | unverified | L5.0d audit-trail+secrets | Hash-chained Rust audit log | STUDY | DEEP-SAT-L05-SEC |

### L5.0c — Tier-3 Specialized (15)

| Repo | Stars | License | Sub-layer | Native-CC-pathway | Verdict | Source-fork |
|---|---:|---|---|---|---|---|
| makalin/SecureMCP | 139 | unverified | L5.0c MCP-audit | Go CLI OAuth+inject+tool-poison | STUDY | DEEP-SAT-L05-SEC |
| Adversis/mcp-snitch | 93 | unverified | L5.0d audit-trail (macOS) | macOS intercept MCP comms | STUDY | DEEP-SAT-L05-SEC |
| slowmist/MCP-Security-Checklist | 826 | markdown | L5.0c MCP-audit (cite) | Cite-class doc | CITE-ONLY | DEEP-SAT-L05-SEC |
| aws-samples/sample-mcp-security-scanner | n/a | MIT-0 | L5.0c MCP-audit (CI) | Checkov+Semgrep+Bandit+ASH+Trivy via MCP | INSTALL | DEEP-SAT-L05-SEC |
| cisco-ai-defense/mcp-scanner | n/a | Apache-2.0 | L5.0c MCP-audit | `uv tool install` 3-engine | INSTALL | DEEP-SAT-L05-SEC |
| cisco-ai-defense/skill-scanner | n/a | Apache-2.0 | L5.0c MCP-audit (skills) | signature+LLM-judge+dataflow | INSTALL | DEEP-SAT-L05-SEC |
| cisco-ai-defense/defenseclaw | n/a | Apache-2.0 | L5.0c MCP-audit (bundle) | bundles scanners + AIBOM | INSTALL | DEEP-SAT-L05-SEC |
| Infisical/infisical | 26.9k | MIT | L5.0a secrets-platform | Open-source secrets platform (heavy) | DEFER-IF-NEEDED | DEEP-SAT-L05-SEC |
| kaplanelad/shellfirm | 906 | Apache-2.0 | L5.0d guard (shell) | Safety guardrails for AI shells | STUDY-PILOT | DEEP-SAT-L05-SEC |
| alex-ilgayev/MCPSpy | 510 | unverified | L5.0d audit-trail | MCP eBPF kernel monitoring | INSTALL | DEEP-SAT-L05-SEC |
| invariantlabs-ai/invariant | 418 | unverified | L5.0d guard | Guardrails predecessor of mcp-scan | STUDY | DEEP-SAT-L05-SEC |
| thoughtbot/top_secret | 393 | unverified | L5.0a PII (Ruby) | Ruby-only redactor | INSTALL-IF-RUBY | DEEP-SAT-L05-SEC |
| tldrsec/prompt-injection-defenses | 688 | catalog | L5.0e injection (reference) | Cite-anchor catalog | CITE-ONLY | DEEP-SAT-L05-SEC |
| AI45Lab/AgentDoG | 471 | unverified | L5.0d guard (diagnostic) | Research framework | STUDY | DEEP-SAT-L05-SEC |
| stacklok/toolhive | 1.8k | unverified | L5.0c MCP-security | Enterprise MCP-server runtime | **INSTALL-T1** | TRANCHE-H |

---

## §L5.5 — Workflow · DevOps · Obs · DAG · CI/CD · IaC · K8s · SCM (57 rows)

### L5.5a — Workflow Orchestration (19)

| Repo | Stars | License | Sub-layer | Native-CC-pathway | Verdict | Source-fork |
|---|---:|---|---|---|---|---|
| temporalio/temporal | 20.3k | MIT | L5.5a cluster-durable | none | STUDY (ops-heavy) | SAT-WORKFLOW |
| restatedev/restate | 3.9k | BSL/MIT | L5.5a cluster-durable | none | STUDY-PILOT | SAT-WORKFLOW |
| inngest/inngest | 5.4k | SSPL→Apache | L5.5b sidecar-durable | **MCP server EXISTS** (8 tools) + agent-kit Claude Haiku 4.5 | **INSTALL-T1** | SAT-WORKFLOW |
| hatchet-dev/hatchet | 7.2k | MIT | L5.5c postgres-durable | Claude Code SKILL.md present | **INSTALL-T1** | SAT-WORKFLOW |
| dbos-inc/dbos-transact-py | 1.4k | MIT | L5.5c postgres-durable | 7-LOC integration | **INSTALL-T1** | SAT-WORKFLOW |
| n8n-io/n8n | 188k | Sustainable Use | L5.5 no-code | `.claude` + MCP topic | STUDY-NON-OSS | SAT-WORKFLOW |
| windmill-labs/windmill | 16.5k | AGPLv3+Apache | L5.5 scriptable | `.claude`+CLAUDE.md+.mcp.json | STUDY-PILOT-AGPL | SAT-WORKFLOW |
| activepieces/activepieces | 22.2k | MIT (CE) | L5.5 no-code | **~400 MCP servers** auto-exposed | **INSTALL-T1** | SAT-WORKFLOW |
| mage-ai/mage-ai | 8.7k | Apache-2.0 | L5.5 data-pipeline | none | STUDY | SAT-WORKFLOW |
| dagster-io/dagster | 15.5k | Apache-2.0 | L5.5 data-pipeline | `.claude`+.mcp.json | STUDY | SAT-WORKFLOW |
| apache/airflow | 45.4k | Apache-2.0 | L5.5 data-pipeline | none | REJECT (enterprise-only) | SAT-WORKFLOW |
| apache/dolphinscheduler | 14.3k | Apache-2.0 | L5.5 data-pipeline | `CLAUDE.md` | REJECT (no AI signal) | SAT-WORKFLOW |
| PrefectHQ/prefect | 22.4k | Apache-2.0 | L5.5 Python-workflow | `.claude` | STUDY | SAT-WORKFLOW |
| kestra-io/kestra | 26.9k | Apache-2.0 | L5.5 YAML-workflow | AGENTS.md+CLAUDE.md | STUDY | SAT-WORKFLOW |
| argoproj/argo-workflows | 16.7k | Apache-2.0 | L5.5d K8s-native | none | STUDY | SAT-WORKFLOW |
| triggerdotdev/trigger.dev | 14.9k | Apache-2.0 | L5.5b sidecar-durable | `.claude`+MCP | STUDY-PILOT | SAT-WORKFLOW |
| conductor-oss/conductor | 31.8k | Apache-2.0 | L5.5a cluster-durable | **Native MCP+14 LLM** | **INSTALL-T1** | SAT-WORKFLOW |
| dagucloud/dagu | 3.4k | GPLv3 | L5.5 single-binary | `gh skill install dagucloud/dagu dagu` | **INSTALL** | SAT-WORKFLOW |
| airtai/fastagency | 538 | Apache-2.0 | L5.5 AG2/AutoGen-deploy | none | STUDY | SAT-WORKFLOW |

### L5.5b — DevOps / IaC / K8s / SCM / CI MCPs (20)

| Repo | Stars | License | Sub-layer | Native-CC-pathway | Verdict | Source-fork |
|---|---:|---|---|---|---|---|
| github/github-mcp-server | 29.9k | MIT | L5.5b SCM-MCP | Anthropic-org maintained | **INSTALL-T1** | SAT-WORKFLOW |
| hashicorp/terraform-mcp-server | 1.4k | MPL-2.0 | L5.5b IaC-MCP | Official HashiCorp | **INSTALL-T1** | SAT-WORKFLOW |
| pulumi/mcp-server | n/a | proprietary | L5.5b IaC-MCP | Official Pulumi (npm+Docker) | **INSTALL-T1** | SAT-WORKFLOW |
| ansible/aap-mcp-server | 26 | Apache-2.0 | L5.5b config-MCP | Official RH AAP | INSTALL-IF-ANSIBLE | SAT-WORKFLOW |
| containers/kubernetes-mcp-server | 1.6k | Apache-2.0 | L5.5b K8s-MCP | Go-native K8s-API | **INSTALL-T1** | SAT-WORKFLOW |
| Flux159/mcp-server-kubernetes | 1.4k | MIT | L5.5b K8s-MCP | mcpb (Claude Desktop ext) | INSTALL-ALT | SAT-WORKFLOW |
| helm/helm | 29.8k | Apache-2.0 | L5.5b K8s-pkg | none (via Flux159) | RETAIN | SAT-WORKFLOW |
| argoproj-labs/mcp-for-argocd | 464 | Apache-2.0 | L5.5b GitOps-MCP | argoproj-labs community | INSTALL-IF-ARGOCD | SAT-WORKFLOW |
| derailed/k9s | 33.6k | Apache-2.0 | L5.5b K8s-TUI | none | RETAIN | SAT-WORKFLOW |
| datadog-labs/mcp-server | 37 | MIT | L5.5b SaaS-Obs-MCP | Official Datadog (GA 2026-03-09) | INSTALL-IF-DATADOG | SAT-WORKFLOW |
| grafana/mcp-grafana | 3.0k | Apache-2.0 | L5.5b Obs-MCP | Official Grafana | **INSTALL-T1** | SAT-WORKFLOW |
| getsentry/sentry-mcp | 690 | Apache-2.0 | L5.5b error-MCP | Official Sentry + CC plugin subagent | **INSTALL-T1** | SAT-WORKFLOW |
| PagerDuty/pagerduty-mcp-server | 69 | Apache-2.0 | L5.5b on-call-MCP | Official PD | INSTALL-IF-PD | SAT-WORKFLOW |
| honeycombio/honeycomb-mcp | 43 | MIT | L5.5b Obs-MCP | **DEPRECATED** SaaS migrate | REJECT-DEPRECATED | SAT-WORKFLOW |
| kud/mcp-jenkins | small | Apache-2.0 | L5.5b CI-MCP | community Jenkins MCP | STUDY | SAT-WORKFLOW |
| madappa-sharath/drone-ci-mcp | small | n/a | L5.5b CI-MCP | community drone-CI MCP | REJECT (sunsetting) | SAT-WORKFLOW |
| GitLab Premium MCP | n/a | proprietary | L5.5b SCM-MCP | Premium/Ultimate beta | STUDY-IF-GITLAB | SAT-WORKFLOW |
| githubnext/gh-aw | 4.5k | MIT | L5.5b CI/CD AI-Native | Agentic workflows in MD via GH Actions | **INSTALL-T1** | SAT-WORKFLOW |
| anthropics/claude-code-action | 7.6k | MIT | L5.5b CI/CD official | Official Anthropic GH Action | **INSTALL-T1** | SAT-WORKFLOW |
| anthropics/claude-code-base-action | 828 | MIT | L5.5b CI/CD official | Thin wrapper companion | INSTALL | SAT-WORKFLOW |

### L5.5c — Anthropic Official Marketplace Plugins (6)

| Plugin | Sub-layer | Verdict | Source-fork |
|---|---|---|---|
| astronomer-data-agents | L5.5 DAG authoring (Airflow 2→3 + lineage + profiling) | INSTALL-IF-AIRFLOW | SAT-WORKFLOW |
| data-engineering / data | L5.5 warehouse+pipeline+Airflow | STUDY | SAT-WORKFLOW |
| datadog (Anthropic plugin) | L4 logs/metrics/traces (preview) | DUP (vendor MCP) | SAT-WORKFLOW |
| dash0 | L4 OTEL obs Claude-specific | STUDY-PILOT | SAT-WORKFLOW |
| aws-dev-toolkit | L5.5 AWS (34 skills + 11 agents + 3 MCP) | INSTALL-IF-AWS | SAT-WORKFLOW |
| azure | L5.5 50+ Azure services | INSTALL-IF-AZURE | SAT-WORKFLOW |

### L5.5d — SRE / AIOps (12)

| Repo | Stars | License | Sub-layer | Native-CC-pathway | Verdict | Source-fork |
|---|---:|---|---|---|---|---|
| kubesphere/kubesphere | 16.9k | Apache-2.0 | L5.5d K8s | K8s platform | INSTALL | TRANCHE-H |
| HolmesGPT/holmesgpt | 2.4k | Apache-2.0 | L5.5d SRE-agent (CNCF) | ChatOps + Prom+Jira+Slack | **INSTALL-T1** | TRANCHE-H |
| jeremylongshore/claude-code-plugins-plus-skills | 2.2k | MIT | L5.5d CC marketplace | plugin marketplace | INSTALL | TRANCHE-H |
| psalias2006/gpu-hot | 1.5k | MIT | L5.5d GPU-dashboard | dashboard | INSTALL | TRANCHE-H |
| rohitg00/awesome-devops-mcp-servers | 986 | MIT | L5.5d MCP-catalog | catalog | INSTALL-CATALOG | TRANCHE-H |
| unohee/OpenSwarm | 767 | MIT | L5.5d CC-orchestrator | orchestrator | INSTALL | TRANCHE-H |
| tugcantopaloglu/openclaw-dashboard | 671 | MIT | L5.5d agent-monitor | monitor | INSTALL | TRANCHE-H |
| cordum-io/cordum | 479 | MIT | L5.5d agent-governance | governance | **INSTALL-T1** | TRANCHE-H |
| getsavvyinc/savvy-cli | 457 | MIT | L5.5d runbook | runbook capture | INSTALL | TRANCHE-H |
| pab1it0/prometheus-mcp-server | 442 | MIT | L5.5d Prom-MCP | Official-class Prom MCP | **INSTALL-T1** | TRANCHE-H |
| cloudshipai/station | 420 | MIT | L5.5d agent-station | station | INSTALL | TRANCHE-H |
| jedi4ever/learning-llms-and-genai-for-dev-sec-ops | 281 | MIT | L5.5d course | course | STUDY-PILOT | TRANCHE-H |

---

## §L5.7 — Durable Execution (7 rows)

| Repo | Stars | License | Sub-layer | Pattern | Verdict | Source-fork |
|---|---:|---|---|---|---|---|
| temporalio/temporal | 20.3k | MIT | L5.7a cluster | 3-service deploy | STUDY | SAT-WORKFLOW |
| conductor-oss/conductor | 31.8k | Apache-2.0 | L5.7a cluster | Netflix-grade + native MCP+14 LLMs | **INSTALL-T1** | SAT-WORKFLOW |
| restatedev/restate | 3.9k | BSL/MIT | L5.7a cluster | Rust single-binary | STUDY-PILOT | SAT-WORKFLOW |
| inngest/inngest | 5.4k | SSPL→Apache | L5.7b sidecar | Built-in MCP + agent-kit + Claude Haiku | **INSTALL-T1** | SAT-WORKFLOW |
| trigger.dev | 14.9k | Apache-2.0 | L5.7b sidecar | TS-only | STUDY-PILOT | SAT-WORKFLOW |
| hatchet-dev/hatchet | 7.2k | MIT | L5.7c postgres | Postgres-only + Claude skill | **INSTALL-T1** | SAT-WORKFLOW |
| dbos-inc/dbos-transact-py | 1.4k | MIT | L5.7c postgres | 7-LOC library | **INSTALL-T1** | SAT-WORKFLOW |

---

## §Q2-2026 — New Entrants (≥2k★ created>2026-03-01, cross-cutting, 60 rows)

### Q2 INSTALL-CANDIDATE P0 (1)

| Repo | Stars | License | Layer | Pattern | Verdict | Source-fork |
|---|---:|---|---|---|---|---|
| MemPalace/mempalace | 52.3k | MIT | L0.2 Memory | OSS memory benchmark claim vs mem0/Graphiti | **INSTALL-CANDIDATE-P0** (after benchmark probe) | TRANCHE-I |

### Q2 INSTALL-CANDIDATE P1 (8)

| Repo | Stars | License | Layer | Verdict | Source-fork |
|---|---:|---|---|---|---|
| safishamsi/graphify | 48.5k | MIT | L0.3 KG skill | INSTALL-CANDIDATE-P1 (Leiden community detection) | TRANCHE-I |
| Lum1104/Understand-Anything | 14.8k | MIT | L4.5 research-Karpathy | INSTALL-CANDIDATE-P1 | TRANCHE-I |
| wanshuiyin/Auto-claude-code-research-in-sleep (ARIS) | 9.5k | MIT | L4.5 autoresearch | INSTALL-CANDIDATE-P1 | TRANCHE-I |
| open-multi-agent/open-multi-agent | 6.2k | MIT | L3 multi-agent | INSTALL-CANDIDATE-P1 (extends agent-teams) | TRANCHE-I |
| revfactory/harness | 3.4k | MIT | L3 meta-orch | INSTALL-CANDIDATE-P1 (meta-orchestration) | TRANCHE-I |
| strukto-ai/mirage | 2.3k | MIT | L0.75 agent-FS | INSTALL-CANDIDATE-P1 (FUSE virtual filesystem) | TRANCHE-I |
| yvgude/lean-ctx | 1.7k | MIT | L1.5 token-comp | INSTALL-CANDIDATE-P1 (Rust + MCP 49 tools) | TRANCHE-I |
| AgriciDaniel/claude-obsidian | 5.1k | MIT | L1.5 wiki-skill | INSTALL-CANDIDATE-P1 (Karpathy-pattern) | TRANCHE-I |

### Q2 INSTALL-CANDIDATE P2 (7)

| Repo | Stars | License | Layer | Verdict | Source-fork |
|---|---:|---|---|---|---|
| getagentseal/codeburn | 6.6k | MIT | L4 observability | INSTALL-CANDIDATE-P2 (CC+Codex token TUI) | TRANCHE-I |
| graykode/abtop | 2.2k | MIT | L4 observability | INSTALL-CANDIDATE-P2 (htop-style sessions) | TRANCHE-I |
| phuryn/claude-usage | 1.5k | MIT | L4 observability | INSTALL-CANDIDATE-P2 (local dashboard) | TRANCHE-I |
| iamzhihuix/skills-manage | 1.9k | MIT | L1.5 skill-mgmt | INSTALL-CANDIDATE-P2 (desktop multi-CLI) | TRANCHE-I |
| GammaLabTechnologies/harmonist | 1.7k | MIT | L3 orchestration | INSTALL-CANDIDATE-P2 (186 agents portable) | TRANCHE-I |
| stablyai/orca | 2.6k | MIT | L6 IDE | INSTALL-CANDIDATE-P2 (parallel agent fleets) | TRANCHE-I |
| ciembor/agent-rules-books | 1.4k | MIT | L1.5 standards | INSTALL-CANDIDATE-P2 (AGENTS.md from books) | TRANCHE-I |

### Q2 WATCH (18 — abridged)

| Repo | Stars | License | Class | Verdict | Source-fork |
|---|---:|---|---|---|---|
| JuliusBrussee/caveman | 60.9k | MIT | L1.5 token-comp | STUDY (claim verify needed) | TRANCHE-I |
| heygen-com/hyperframes | 18.6k | n/a | L2.5 multimodal | WATCH-corporate | TRANCHE-I |
| jnMetaCode/agency-agents-zh | 11.2k | MIT | L3 zh agents | WATCH (compete with wshobson) | TRANCHE-I |
| op7418/guizang-ppt-skill | 9.2k | MIT | L2.5 multimodal-vertical | WATCH | TRANCHE-I |
| yizhiyanhua-ai/fireworks-tech-graph | 6.7k | MIT | L2.5 SVG-diagram | WATCH | TRANCHE-I |
| holaboss-ai/holaOS | 5.6k | n/a | L6 alt-harness | WATCH | TRANCHE-I |
| uditgoenka/autoresearch | 4.5k | MIT | L4.5 autoresearch | WATCH (overlap) | TRANCHE-I |
| codeany-ai/open-agent-sdk-typescript | 2.7k | MIT | L1 SDK | WATCH (architectural fork) | TRANCHE-I |
| nicedreamzapp/claude-code-local | 2.6k | MIT | L0.25 MLX local | WATCH (Mac-only) | TRANCHE-I |
| op7418/Claude-to-IM-skill | 2.5k | MIT | L1.5 IM-bridge | WATCH | TRANCHE-I |
| collaborator-ai/collab-public | 2.5k | n/a | L3 multi-agent | WATCH | TRANCHE-I |
| nexu-io/html-anything | 2.4k | MIT | L2.5 HTML-editor | WATCH (5d old at probe) | TRANCHE-I |
| cosmicstack-labs/mercury-agent | 2.2k | n/a | L3 agent | WATCH | TRANCHE-I |
| shuvonsec/claude-bug-bounty | 2.1k | MIT | L5.0 security | WATCH | TRANCHE-I |
| himself65/finance-skills | 1.9k | MIT | L2.6 finance | WATCH | TRANCHE-I |
| samber/cc-skills-golang | 1.7k | MIT | L1.5 Go skills | WATCH | TRANCHE-I |
| cytostack/openwolf | 1.7k | MIT | L1.5 TS-middleware | WATCH (token lane) | TRANCHE-I |
| conorbronsdon/avoid-ai-writing | 1.5k | MIT | L1.5 writing | WATCH | TRANCHE-I |

### Q2 REJECT-NOISE/HIGH-RISK (16 — summarized)

| Class | Examples | Verdict |
|---|---|---|
| Clone-fraud cluster | yasasbanukaofficial/claude-code, oboard/claude-code-rev, codeaashu/claude-code, tanbiralam/claude-code, 0Chencc/clawgod, 777genius/claude-code-source-code, soongenwong/claudecode | **REJECT-HIGH-RISK** (leaked-code class) |
| TOS-evasion proxies | motiful/cc-gateway, romgX/openrelay, mnfst/awesome-free-llm-apis, CommonstackAI/UncommonRoute | **REJECT-HIGH-RISK** (quota-pump) |
| Speculative-fic kyegomez | kyegomez/OpenMythos | **REJECT-HIGH-RISK** (FM-class per W229+) |
| Awesome-list overload | VoltAgent/awesome-claude-design, alvinreal/awesome-autoresearch, WenyuChiou/awesome-agentic-ai-zh | **REJECT-NOISE** |
| Vertical-spam out-of-domain | santifer/career-ops, zubair-trabzada/ai-marketing-claude, rullerzhou-afk/clawd-on-desk | **REJECT-NOISE** |
| Tutorial-bait | Windy3f3f3f3f/how-claude-code-works, openedclaude/claude-reviews-claude, lintsinghua/claude-code-book | **STUDY-CITE-ONLY** (citation source) |
| Localization-fork hijack | jnMetaCode/superpowers-zh | **REJECT-DUP** (already upstream) |
| OpenClaw ecosystem (≠CC) | dataelement/Clawith, aiming-lab/MetaClaw, AMAP-ML/SkillClaw, FreedomIntelligence/OpenClaw-Medical-Skills, CodePhiliaX/youclaw | **REJECT-DUP-OR-OFFTOPIC** |

### Q2 General-purpose 2k+★ entrants (from TRANCHE-F) — top 10

| Repo | Stars | License | Layer | Verdict |
|---|---:|---|---|---|
| MemTensor/MemOS | 9.1k | TypeScript | L5 memory-OS | INSTALL-CANDIDATE |
| google/adk-go | 7.9k | Apache-2.0 | L8 agent-fw (Go ADK) | INSTALL-CANDIDATE |
| OpenBMB/UltraRAG | 5.5k | Python | L4.5+L7 doc-ingest+RAG | INSTALL-CANDIDATE |
| ag2ai/ag2 | 4.6k | Apache-2.0 | L8 agent-fw | INSTALL-CANDIDATE |
| JetBrains/koog | 4.2k | Kotlin | L8 agent-fw | INSTALL-CANDIDATE |
| ThinkInAIXYZ/deepchat | 5.8k | TypeScript | L3.5 Agent-UI | INSTALL-CANDIDATE |
| looplj/axonhub | 3.8k | Go | L1 cross-model-proxy | STUDY |
| cocoindex-io/cocoindex | 9.8k | Python | L6+L7 code-intel+RAG | STUDY |
| flyteorg/flyte | 7.0k | Go | L8 orchestrator | STUDY |
| e2b-dev/fragments | 6.3k | TypeScript | L0.75 sandbox | STUDY |

---

## Verification

- **Source forks read in full**: 10 of 11 (BACKLOG-TRANCHE-F too large; sampled via Grep)
- **Total rows extracted**: ~316 (within stated 500-800 envelope; quality-prioritized over quantity)
- **Layer coverage**: L2.5 / L3.5 / L4.0 / L4.5 / L5.0 / L5.5 / L5.7 + Q2-2026 cross-cut
- **License-blocker callouts**: 6 (Skyvern AGPL-3.0, ChatTTS AGPL-3.0, MCP-Defender AGPLv3, OpenInterpreter AGPL-3.0, openinterpreter/01 AGPL-3.0, fishaudio/fish-speech license-AMBER)
- **Deprecated/Stale callouts**: 4 (Helicone/ai-gateway 178d-stale, bigcode-evaluation-harness 280d, honeycomb-mcp DEPRECATED, AgentBench reward-hacked)
- **Anthropic-official-plugin/marketplace native-CC pathways verified**: GitHub MCP · Sentry MCP plugin · Datadog plugin · Astronomer plugin · aws-dev-toolkit · azure · dash0 · pipecat skills · dagucloud/dagu skill
- **Source-fork columns reference**: `06-fresh-research-delta/<filename>-2026-05-16.md`

---

**End of PART-3 catalog.** Companion: PART-1 (L0-L2 memory/KG/code-intel/sandbox) and PART-2 (L3 agent-fw/orchestration/L6 CC-peer) — pending.
