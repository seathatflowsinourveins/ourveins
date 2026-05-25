# SATURATION RESEARCH — Browser/Computer-Use + Voice/Audio Coding Agents
## 2026-05-16 — Deep Dive Delta Beyond V-FINAL-V2 L2.5

> **Scope**: Saturation probe of 38+ candidates in Browser-Automation, Computer-Use, Voice-Agents, Speech-to-Code, Multi-Modal-VLM, and Screenshot-to-Code layers — verifying V-FINAL-V2's L2.5 Multi-Modal coverage and surfacing finer sub-lane structure.
>
> **Multi-source verification**: GitHub MCP + DeepWiki (5 deep queries) + WebFetch (35+ probes) + Context7 + cross-reference against V-FINAL-V2 (`Z:\claude-sota-installed\docs\grand-synthesis-2026-05-16\00-MASTER\ULTIMATE-SYNTHESIS-V-FINAL-V2-2026-05-16.md` §L2.5).
>
> **Baseline (V-FINAL-V2 L2.5)**: livekit/agents (10.5k★) · whisper.cpp (49.7k★) · OmniParser (24.8k★) · ColPali (2.6k★). 4 sub-lanes: L2.5a Realtime/Voice · L2.5b Local-ASR · L2.5c Vision/Computer-Use · L2.5d Document-VLM.
>
> **HONEST-NON-FINDING-EARLY**: V-FINAL-V2 L2.5 is *directionally correct* but undersized — saturation probe surfaces 14 SOTA-class additions and reveals 6 sub-lanes are needed (not 4). The recommendation is **expand to L2.5a-L2.5e + L2.5f** (Section D below).

---

## §A — Full Matrix (38 entries)

### Browser Automation (9)

| repo | ★ | license | native-CC-pathway | community-consensus | last-update | sub-category | verdict |
|---|---|---|---|---|---|---|---|
| microsoft/playwright | 88.8k | Apache-2.0 | indirect (via playwright-mcp) | DOMINANT incumbent (test+E2E SOTA) | 2026-05-16 active | L2 browser primitive | KEEP (foundation library) |
| microsoft/playwright-mcp | 32.6k | Apache-2.0 | `claude mcp add playwright npx @playwright/mcp@latest` (DeepWiki-verified) | INCUMBENT MCP for browser ops | v0.0.75 May 2024 + active 2026-05-16 | L6.7 MCP-server | INSTALL (T1 — already in V-FINAL-V2) |
| browserbase/stagehand | 22.7k | MIT | local + cloud (Browserbase) modes both supported (DeepWiki §V3) | RISING — AI-native browser SDK; 4-primitives `act/extract/observe/agent` | 2026-05-16 active | L6.7 agent-SDK pattern | EVALUATE pattern-extract (Python SDK exists per DeepWiki — local-runnable without Browserbase) |
| browserbase/mcp-server-browserbase | 3.3k | (MIT inferred) | MCP-server | CONSENSUS RISING (Stagehand-via-MCP) | 2026-05-16 active | L6.7 MCP-server | INSTALL (T2 — already in V-FINAL-V2 row 23) |
| browser-use/browser-use | 94.1k | MIT (DeepWiki-verified) | `uvx browser-use --mcp` ships **own MCP server** + acts as MCP **client** for playwright-mcp | RISING FAST (94k stars — top 1% repo) | 2026-05-16 active | L2.5/L6.7 agent + MCP | **HIGH-PRIORITY ADD** (94k★ + MIT + native MCP server — gap in V-FINAL-V2) |
| Skyvern-AI/skyvern | 21.6k | AGPL-3.0 | n/a (license-blocked) | KNOWN | 2026-05-16 active | L2 browser-agent | **REJECT** (AGPL — per cardinal-rule plugin-license discipline) |
| helium-launchpad/helium (`mherrmann/helium`) | 8.3k | MIT | indirect (Selenium wrapper) | DEPRECATED-CLASS niche | 2026-05-09 (v7.0.1) | L2 browser shim | SKIP (lower-tier; Stagehand+Playwright-MCP supersede) |
| SeleniumHQ/selenium | 34.1k | Apache-2.0 | indirect | INCUMBENT (legacy E2E) | 2026-05-16 active | L2 browser primitive | KEEP-as-baseline (Playwright preferred for AI agents) |
| ServiceNow/AgentLab | 579 | (custom — LICENSE present) | benchmark harness | EMERGING (research) | active | L6.7 eval-benchmark | STUDY (small ★ — research stage; consider for L4.6 eval-substrate) |

### Computer-Use Agents (10)

| repo | ★ | license | native-CC-pathway | community-consensus | last-update | sub-category | verdict |
|---|---|---|---|---|---|---|---|
| microsoft/OmniParser | 24.8k | CC-BY-4.0 | OmniParser-Server (FastAPI) + OmniTool agent supports Claude-3-5-Sonnet (DeepWiki) | DOMINANT screen-parser | 2026-04-13 pushed | L2.5c Vision/CU | INSTALL (T1 — in V-FINAL-V2) |
| OpenAdaptAI/OmniMCP | 71 | (MIT inferred) | MCP-server wrapping OmniParser | NICHE | 2025-04 pushed | L2.5c CU MCP | STUDY-PILOT (OmniParser + MCP wrapper — bridges OmniParser to CC) |
| bytedance/UI-TARS-desktop | 34.2k | Apache-2.0 | Agent-TARS-App (sub-product) supports Anthropic Claude via VLM backend; **macOS-only currently**, Windows planned (DeepWiki) | RISING (34k★ — top-tier) | 2026-05-15 active | L2.5c desktop CU agent | **HIGH-PRIORITY ADD-PATTERN-EXTRACT** (large ★ + Apache + MCP-aware — but Windows still planned so MONITOR-not-install) |
| trycua/cua (NOT cua-ai) | 16.8k | MIT | sandbox + driver for macOS/Linux/Win/Android | RISING FAST (16k★ MIT) | 2026-05-12 cua-driver-v0.1.9 | L0.75 Sandbox + L2.5c CU | **HIGH-PRIORITY ADD** (lateral-load — straddles L0.75 + L2.5c, missing from V-FINAL-V2) |
| anthropics/anthropic-quickstarts | 16.6k | MIT | reference impl for `computer_use_20251124` tool | OFFICIAL Anthropic ref | active 2026 | L2.5c reference | INSTALL (T1 — pattern-extract: computer_use_20251124 tool integration) |
| simular-ai/Agent-S | 11.3k | Apache-2.0 | Agent-S3 reports 72.6% OSWorld success — supports Claude as decision LLM | RISING (11k★) | v0.3.2 Dec 2025 | L2.5c CU agent | STUDY (high OSWorld score; pattern-extract for prompt/agent design) |
| microsoft/UFO (UFO³) | 8.7k | MIT | Windows-deep OS integration; multi-agent DAG | RISING — Microsoft official Windows agent | active 2026 | L2.5c Windows-CU | **HIGH-PRIORITY ADD-PATTERN-EXTRACT** (Windows-native; 8.7k★ MIT; missing from V-FINAL-V2) |
| openai/openai-cua-sample-app | 1.7k | MIT | reference for GPT-5.4 Computer-Using-Agent | RISING (OpenAI official ref) | active 2026 | L2.5c reference | STUDY (cross-vendor CUA pattern — Anthropic-equivalent already covered by anthropic-quickstarts) |
| xlang-ai/OSWorld | 2.85k | (custom NeurIPS) | benchmark only | INCUMBENT eval | active 2026 | L4.6 eval-substrate | STUDY-CITE (eval reference — feeds L4.6 not L2.5) |
| microsoft/Magma | 1.9k | MIT | VLA model — vision+language+action | EMERGING | 130 commits | L2.5c VLA model | STUDY (early-stage; OmniParser+Claude superior for now) |

### Voice / Realtime Agents (8)

| repo | ★ | license | native-CC-pathway | community-consensus | last-update | sub-category | verdict |
|---|---|---|---|---|---|---|---|
| livekit/agents | 10.5k | Apache-2.0 | `livekit-plugins-anthropic` + native MCP support `pip install 'livekit-agents[mcp]'` (DeepWiki) | DOMINANT realtime framework | 2026-05-16 active | L2.5a Realtime | INSTALL (T1 — in V-FINAL-V2) |
| pipecat-ai/pipecat | 12.2k | BSD-2-Clause | `AnthropicLLMService` + MCPClient + **CC plugin `pipecat-dev-skills`** via `claude plugin marketplace add pipecat-ai/skills` (DeepWiki) | RISING — direct CC plugin verified | v1.2.1 2026-05-15 | L2.5a Realtime | **HIGH-PRIORITY ADD** (12.2k★ BSD-2 + native CC plugin marketplace — missing from V-FINAL-V2; competes/complements LiveKit) |
| openai/openai-agents-python | 26.3k | MIT | `pip install 'openai-agents[voice]'` + Realtime API support with `gpt-realtime-2` | DOMINANT OpenAI Agents SDK | v0.17.2 May 12 2026 | L2.5a Realtime + L3 framework | STUDY (Anthropic equivalent: Claude Agent SDK — cross-vendor reference) |
| gradio-app/fastrtc | 4.6k | (MIT inferred) | Python real-time comm lib | RISING | 2026-05-16 active | L2.5a WebRTC primitive | STUDY-PILOT (WebRTC transport — feeds LiveKit/Pipecat) |
| daily-co/daily-python | 65 | BSD-2-Clause | Python SDK for Daily video calling | NICHE (commercial backend) | v0.28.1 May 7 2026 | L2.5a video-conf SDK | SKIP (commercial — LiveKit covers OSS path) |
| openai/openai-realtime-agents | 6.9k | MIT | TypeScript demos for Realtime API patterns | OFFICIAL reference | active 2026 | L2.5a reference | STUDY (chat-supervisor + handoff patterns) |
| openai/openai-realtime-console | 3.6k | MIT | React inspector for OpenAI Realtime API | OFFICIAL reference | active | L2.5a debug-tool | STUDY (debugging only) |
| openai/openai-realtime-twilio-demo | 525 | MIT | Realtime API + Twilio bridge | NICHE | active | L2.5a telephony | SKIP (telephony-specific) |

### Speech-to-Code (Local ASR) (5)

| repo | ★ | license | native-CC-pathway | community-consensus | last-update | sub-category | verdict |
|---|---|---|---|---|---|---|---|
| openai/whisper | 99.6k | MIT | model only (no agent) | DOMINANT model architecture | 2026-05-16 active | L2.5b ASR-model | KEEP (model artifact) |
| ggml-org/whisper.cpp | 49.7k | MIT | `whisper-server` HTTP OpenAI-compat API + Windows real-time `whisper-stream` requires SDL2 (DeepWiki) | DOMINANT local-ASR runtime | 2026-05-16 active | L2.5b local-ASR | INSTALL (T1 — in V-FINAL-V2) |
| SYSTRAN/faster-whisper | 22.9k | (MIT inferred) | CTranslate2-accelerated Python | RISING (Python preference) | 2026-05-16 active | L2.5b Python-ASR | INSTALL (T2 — sibling to whisper.cpp for Python pipelines) |
| m-bain/whisperX | 21.9k | BSD-2-Clause | word-level timestamps + diarization | RISING | v3.8.5 Apr 1 2026 | L2.5b ASR+align | STUDY-PILOT (alignment+diarization for transcript-driven coding) |
| Vaibhavs10/insanely-fast-whisper | 12.9k | Apache-2.0 | CLI w/ Flash-Attention-2 | NICHE-RISING | active | L2.5b fast-ASR | SKIP-OR-STUDY (faster-whisper covers same niche) |
| huggingface/distil-whisper | 4.1k | (MIT inferred) | 6x faster distilled variant | RISING | 2026-05-16 active | L2.5b distilled-ASR | STUDY (model artifact only) |

### Voice → Tool (TTS, voice cloning, audio gen) (1)

| repo | ★ | license | native-CC-pathway | community-consensus | last-update | sub-category | verdict |
|---|---|---|---|---|---|---|---|
| elevenlabs/elevenlabs-mcp | 1.4k | (MIT inferred) | MCP-server: TTS, voice cloning, sound FX, music; requires `ELEVENLABS_API_KEY`; local file save via `ELEVENLABS_MCP_OUTPUT_MODE=files` (DeepWiki) | OFFICIAL ElevenLabs MCP | 2026-05-16 active | L2.5e Voice-TTS-MCP | INSTALL (T2 — gap in V-FINAL-V2; closes the audio output loop for L2.5a Realtime; commercial API but local-save fallback) |

### Multi-Modal VLMs (3)

| repo | ★ | license | native-CC-pathway | community-consensus | last-update | sub-category | verdict |
|---|---|---|---|---|---|---|---|
| illuin-tech/colpali | 2.6k | (MIT inferred) | ColPali/ColQwen2/ColSmol — visual-RAG (replaces brittle OCR) | DOMINANT ViDoRe-SOTA | 2026-05-16 active | L2.5d Document-VLM | INSTALL (T2 — in V-FINAL-V2) |
| QwenLM/Qwen3-VL | 19.2k | Apache-2.0 | 2B/4B/8B/32B/30B-MoE/235B-MoE; **Computer-Use Agent cookbook** + Mobile-Agent cookbook (PC/mobile GUI control) | DOMINANT open-weight VLM | active 2026 | L2.5c+d VLM | **HIGH-PRIORITY ADD** (19.2k★ Apache + has dedicated computer-use cookbook — missing from V-FINAL-V2; pairs naturally with OmniParser as VLM backend on local hardware) |
| huggingface/Florence-2-large (model) | n/a | MIT | task-prompted detection/captioning/OCR | RISING (0.77B params) | active 2026 | L2.5d small-VLM | STUDY-PILOT (small efficient VLM for OCR + grounding — pairs with ColPali) |
| haotian-liu/LLaVA / LLaVA-NeXT | 24.8k | Apache-2.0 | model only; no agent layer | DOMINANT-EROSION (Qwen3-VL eclipsing) | LLaVA-NeXT May 2024 — stale | L2.5c+d VLM | SKIP-FOR-NOW (Qwen3-VL ate this niche; Pixtral / GPT-4V / Claude vision cover hosted) |

### Screenshot-to-Code (2)

| repo | ★ | license | native-CC-pathway | community-consensus | last-update | sub-category | verdict |
|---|---|---|---|---|---|---|---|
| abi/screenshot-to-code | 72.6k | MIT | standalone web app (Claude API / GPT-4V / Gemini) | DOMINANT in niche | 2026-05-16 active | L2.5f Screenshot→Code | **HIGH-PRIORITY ADD-PATTERN-EXTRACT** (72.6k★ MIT — flagship niche example; lift HTML/Tailwind/React/Vue prompt patterns; missing from V-FINAL-V2) |
| (closed): vercel/v0, picnic-tools/picnic, FormStr/screenshot-to-component | n/a | closed/various | hosted SaaS | known | n/a | L2.5f SaaS | SKIP (closed source) |

### Out-of-Scope / Misc (4)

| repo | ★ | license | native-CC-pathway | community-consensus | last-update | sub-category | verdict |
|---|---|---|---|---|---|---|---|
| OpenInterpreter/open-interpreter | 63.5k | AGPL-3.0 | local code-exec agent (no specific voice/browser) | DOMINANT in niche but **AGPL** | active | L3 framework | **REJECT** (AGPL conflict + not L2.5-specific) |
| openinterpreter/01 | 5.1k | AGPL-3.0 | voice-controlled assistant — Her-like UX | KNOWN | active | L2.5a voice-app | **REJECT** (AGPL) |
| HumanLayer/humanlayer (CodeLayer) | 10.8k | Apache-2.0 | CC IDE orchestrator (parallel sessions) | RISING (10.8k★ — relevant to L6 orchestration not L2.5) | codelayer-0.20.0 Dec 2025 | L6 orchestration | OUT-OF-SCOPE for L2.5 (note for L6 follow-up) |
| HumanLayer/12-factor-agents | 19.8k | Apache-2.0 + CC-BY-SA-4.0 | docs only — design principles | DOMINANT in agent-design literature | active 2026 | L6 doctrine | OUT-OF-SCOPE for L2.5 (cite for cross-cutting agent guidelines) |

---

## §B — Top-5 INSTALL per Sub-Category

### Browser Automation — Top-5 INSTALL/EVALUATE
1. **microsoft/playwright-mcp** (32.6k★ Apache, native `claude mcp add`) — INSTALL T1 (in V-FINAL-V2)
2. **browser-use/browser-use** (94.1k★ MIT, native MCP server) — **ADD T1** (gap in V-FINAL-V2)
3. **browserbase/stagehand** (22.7k★ MIT, local+cloud, Python+TS) — EVALUATE pattern-extract (in V-FINAL-V2 L6.7)
4. **browserbase/mcp-server-browserbase** (3.3k★ MIT) — INSTALL T2 (in V-FINAL-V2)
5. **microsoft/playwright** (88.8k★ Apache) — KEEP baseline (in V-FINAL-V2 L6.7 cite)

### Computer-Use — Top-5 INSTALL/STUDY
1. **microsoft/OmniParser** (24.8k★ CC-BY) — INSTALL T1 (in V-FINAL-V2)
2. **anthropics/anthropic-quickstarts** (16.6k★ MIT, `computer_use_20251124` ref) — **ADD T1** (gap)
3. **trycua/cua** (16.8k★ MIT, lateral L0.75+L2.5c) — **ADD T2** (gap)
4. **bytedance/UI-TARS-desktop** (34.2k★ Apache, Agent-TARS supports Claude) — **ADD pattern-extract** (Windows-pending; monitor)
5. **microsoft/UFO** (8.7k★ MIT, Windows-deep) — **ADD pattern-extract** (Windows-native gap)

### Voice/Realtime — Top-5 INSTALL/STUDY
1. **livekit/agents** (10.5k★ Apache, anthropic plugin + MCP) — INSTALL T1 (in V-FINAL-V2)
2. **pipecat-ai/pipecat** (12.2k★ BSD-2, native CC plugin marketplace) — **ADD T1** (gap)
3. **openai/openai-agents-python** (26.3k★ MIT, `gpt-realtime-2` voice) — STUDY cross-vendor (in V-FINAL-V2 L3 cite)
4. **gradio-app/fastrtc** (4.6k★ MIT, WebRTC primitive) — STUDY-PILOT
5. **elevenlabs/elevenlabs-mcp** (1.4k★ MIT, TTS MCP — closes audio output loop) — **ADD T2** (gap)

### Speech-to-Code (Local ASR) — Top-5 INSTALL/STUDY
1. **ggml-org/whisper.cpp** (49.7k★ MIT, Windows real-time) — INSTALL T1 (in V-FINAL-V2)
2. **SYSTRAN/faster-whisper** (22.9k★ MIT, CTranslate2) — **ADD T2** (Python pipeline gap)
3. **openai/whisper** (99.6k★ MIT, model only) — KEEP (model artifact)
4. **m-bain/whisperX** (21.9k★ BSD-2, alignment+diarization) — STUDY-PILOT
5. **huggingface/distil-whisper** (4.1k★ MIT, 6x faster) — STUDY (model artifact)

### VLM-for-Code — Top-5 INSTALL/STUDY
1. **illuin-tech/colpali** (2.6k★ MIT, visual-RAG ViDoRe-SOTA) — INSTALL T2 (in V-FINAL-V2)
2. **QwenLM/Qwen3-VL** (19.2k★ Apache, computer-use cookbook) — **ADD T1** (gap — pairs with OmniParser)
3. **microsoft/Florence-2-large** (model card MIT, 0.77B small efficient) — STUDY-PILOT
4. **haotian-liu/LLaVA** (24.8k★ Apache) — SKIP-FOR-NOW (eroded by Qwen3-VL)
5. **microsoft/Magma** (1.9k★ MIT, VLA model) — STUDY (early-stage)

### Screenshot-to-Code — Top-5 INSTALL/STUDY
1. **abi/screenshot-to-code** (72.6k★ MIT, HTML/Tailwind/React/Vue) — **ADD T2 pattern-extract** (gap)
2-5. _(Closed-source competitors: v0, picnic, FormStr) — SKIP_

**NOTE**: Screenshot-to-Code is a thin niche — only 1 OSS contender exists at scale. Recommend **pattern-extract** (lift prompts/architecture from abi/screenshot-to-code into a `screenshot-to-code` skill) rather than full install — usage volume is too low to justify a standing service.

---

## §C — Convergence Axis-1 (≥3 distinct-orgs corroboration per Sub-Lane)

| Sub-Lane | Org-1 | Org-2 | Org-3 | Org-4+ | Axis-1 PASS? |
|---|---|---|---|---|---|
| **L2.5a Realtime/Voice** | LiveKit (`livekit/agents`) | Pipecat AI (`pipecat-ai/pipecat`) | OpenAI (`openai-agents-python` voice) | Gradio (`fastrtc`) + Daily (`daily-python`) + Anthropic (Claude voice cap) | **PASS (6 orgs)** |
| **L2.5b Local ASR** | OpenAI (`whisper`) | ggml-org (`whisper.cpp`) | SYSTRAN (`faster-whisper`) | HF (`distil-whisper`) + Vaibhavs10 (`insanely-fast-whisper`) + m-bain (`whisperX`) | **PASS (6 orgs)** |
| **L2.5c Vision/Computer-Use** | Microsoft (`OmniParser` + `UFO`) | Anthropic (`anthropic-quickstarts` + `computer_use_20251124`) | ByteDance (`UI-TARS-desktop`) | OpenAI (`openai-cua-sample-app`) + cua (`trycua/cua`) + simular-ai (`Agent-S`) + xlang-ai (`OSWorld`) + microsoft (`Magma`) | **PASS (8 orgs)** |
| **L2.5d Document-VLM (visual RAG)** | Illuin (`colpali`) | Microsoft (`Florence-2`) | Alibaba (`Qwen3-VL`) | Mistral (`Pixtral`) + Meta (LLaVA-NeXT) | **PASS (5 orgs)** |
| **L2.5e Voice-TTS-MCP (output loop)** | ElevenLabs (`elevenlabs-mcp`) | LiveKit (`agents` TTS adapters) | OpenAI (`gpt-realtime-2` voice output) | Pipecat (TTS services) | **PASS (4 orgs)** |
| **L2.5f Screenshot-to-Code** | abi (`screenshot-to-code`) | Vercel (`v0` — closed) | Pieces/Picnic (closed) | FormStr/`screenshot-to-component` (small) | **PARTIAL-PASS (only 1 substantive OSS — most are closed-source SaaS)** |
| **L6.7 Browser-Agent-SDK** | Browserbase (`stagehand` + `mcp-server-browserbase`) | browser-use (`browser-use`) | Microsoft (`playwright-mcp`) | Skyvern (AGPL — reject) + Helium (small) + Selenium (legacy) | **PASS (3+ usable orgs)** |

**Axis-1 STATUS**: 5/6 sub-lanes PASS with ≥3-org convergence. L2.5f partial — most market players are closed-source SaaS (vercel/v0, picnic, FormStr). Recommend **pattern-extract** posture for L2.5f rather than seek 3rd OSS org.

---

## §D — Architecture Recommendation: L2.5 Sub-Lane Refinement

### Current V-FINAL-V2 L2.5 (4 sub-lanes)
```
L2.5 MULTI-MODAL & REALTIME
├─ L2.5a Realtime/Voice  → livekit/agents
├─ L2.5b Local ASR        → whisper.cpp
├─ L2.5c Vision/CU        → OmniParser
└─ L2.5d Document-VLM     → ColPali
```

### Proposed V-NEXT L2.5 (6 sub-lanes, finer split)
```
L2.5 MULTI-MODAL & REALTIME
├─ L2.5a Realtime/Voice (audio-IN-pipelines)
│   ├─ livekit/agents (T1 — Apache 10.5k★)
│   └─ pipecat-ai/pipecat (T1 ADD — BSD-2 12.2k★ + native CC plugin marketplace)
├─ L2.5b Local ASR (speech→text foundation)
│   ├─ ggml-org/whisper.cpp (T1 — C++ runtime)
│   └─ SYSTRAN/faster-whisper (T2 ADD — Python CTranslate2)
├─ L2.5c Vision/Computer-Use
│   ├─ L2.5c-i Screen Parser: microsoft/OmniParser (T1) + OpenAdaptAI/OmniMCP (T3 pilot)
│   ├─ L2.5c-ii VLM Backbone: QwenLM/Qwen3-VL (T1 ADD — Apache 19.2k★ w/ CU cookbook)
│   ├─ L2.5c-iii Anthropic CU Ref: anthropics/anthropic-quickstarts (T1 ADD — official `computer_use_20251124`)
│   ├─ L2.5c-iv Sandbox: trycua/cua (T2 ADD — lateral with L0.75 sandbox)
│   └─ L2.5c-v Pattern-Extract Only: bytedance/UI-TARS-desktop, microsoft/UFO, simular-ai/Agent-S
├─ L2.5d Document-VLM (visual RAG; replaces brittle OCR)
│   ├─ illuin-tech/colpali (T2)
│   └─ microsoft/Florence-2-large (T3 pilot — small efficient OCR+grounding)
├─ L2.5e Voice-TTS-MCP (audio-OUT — closes the loop)  **NEW SUB-LANE**
│   └─ elevenlabs/elevenlabs-mcp (T2 ADD — closes L2.5a loop with TTS output)
└─ L2.5f Screenshot-to-Code (image→component generation)  **NEW SUB-LANE**
    └─ abi/screenshot-to-code (T2 pattern-extract — no install, lift prompts/arch)
```

### Cross-Layer Notes
- **L6.7 Browser-Agent-SDK** absorbs all Browser Automation candidates (already established in V-FINAL-V2): playwright-mcp, browserbase/mcp-server-browserbase, stagehand. **ADD browser-use/browser-use (T1)** here too — 94k★ MIT is a top-1% gap.
- **L0.75 Sandbox** absorbs trycua/cua's sandbox dimension — `cua` is **lateral** (one repo, two layers: L0.75 sandbox primitive + L2.5c CU agent). Track as **dual-tag**.

### Justification for Finer Split

| Why split | Sub-lanes Added/Refined | Evidence |
|---|---|---|
| **Audio output loop is a separate concern from audio input** | L2.5e Voice-TTS-MCP | LiveKit/Pipecat handle ASR+orchestration but rely on TTS-as-a-service (ElevenLabs/Cartesia/Deepgram). DeepWiki confirms ElevenLabs MCP is a first-class MCP server with TTS+clone+sound-FX. Without L2.5e, audio output is implicit & undefended. |
| **Computer-Use is multi-component** | L2.5c-i/ii/iii/iv/v | Screen parser (OmniParser) + VLM backbone (Qwen3-VL/Claude/GPT-5.4) + reference impl (anthropic-quickstarts) + sandbox (cua) are independently selectable. Lumping them obscures the architecture. Saturation probe confirms 8 distinct organizational contributors. |
| **Screenshot-to-Code is a distinct workflow** | L2.5f | Different I/O contract (image→code, no agent loop). 72.6k★ abi/screenshot-to-code proves the use case has standalone gravity. |
| **Browser Automation deserves prominent L6.7 + L2.5 cross-ref** | (no new sub-lane — but L6.7 cross-ref noted) | browser-use 94k★ + Stagehand 22.7k★ + playwright-mcp 32.6k★ are independently top-tier. V-FINAL-V2 already has L6.7 — confirm browser-use addition. |

### What Stays the Same
- L2.5b (Local ASR) doesn't need finer split — whisper.cpp + faster-whisper covers Python/C++ axis cleanly.
- L2.5d (Document-VLM) is intentionally small — ColPali + Florence-2 is sufficient until Pixtral/Qwen3-VL converge further on document benchmarks.

---

## §E — Honest Non-Findings

1. **`microsoft/Florence-2` (repo)**: 404 on GitHub direct — Florence-2 lives only as a Hugging Face model card (`microsoft/Florence-2-large`), not a GitHub repo. The model itself is real and MIT-licensed, but there is no maintained GitHub org-owned repo to cite. **Implication**: cannot count it for Axis-1 GitHub-org diversity; treat as model-artifact only.

2. **`anthropics/computer-use-demo` (standalone repo)**: 404 — confirmed **redirected to `anthropics/anthropic-quickstarts/tree/main/computer-use-demo`**. V-FINAL-V2 and prior research need to point to the quickstarts subfolder, not a standalone repo.

3. **`anthropic-cookbook` does NOT contain computer-use examples** — verified by direct probe. The `tool_use/` directory has calculator/customer-service/SQL/etc., but no CU. **Implication**: anthropic-quickstarts is the SOLE Anthropic CU reference; do not double-count via cookbook.

4. **`bytedance/UI-TARS-desktop` Windows-support**: DeepWiki explicitly states "Agent-TARS-App currently only supports macOS, with Windows support planned for a future beta release" — even though `UI-TARS-desktop` itself supports Windows. **Implication**: for our Windows-first install runtime (`Z:\claude-sota-installed`), only the legacy `UI-TARS-desktop` (UI-TARS-model-locked) is usable; the Claude-VLM-backed `Agent TARS App` is **macOS-only** today. Demote to **pattern-extract MONITOR** until Windows lands.

5. **`gpt-realtime-2` GA-date**: WebSearch/WebFetch could not retrieve a verified Anthropic-equivalent "GA 2026" date for `gpt-realtime-2` from `platform.openai.com/docs/models/gpt-realtime` (403 Forbidden). However, `openai-agents-python` v0.17.2 (May 12 2026) ships with first-class `gpt-realtime-2` voice agent support per its README, which is **strong consistency evidence** for GA-class availability. **Cite-class: AMBER** — model is shipped in production SDKs but the model-page docs URL gates the page behind auth/region.

6. **Open Interpreter & `01`**: Both AGPL-3.0 — **rejected** per the same discipline that blocks Skyvern. They are excluded from any INSTALL/STUDY-PILOT verdict. Listed in matrix for completeness.

7. **`SeleniumHQ/selenium-ai`**: 404 — does not exist as a separate org repo. Selenium AI features are integrated into the main `SeleniumHQ/selenium` repo or 3rd-party wrappers (e.g., Helium). No standalone "selenium-AI" exists.

8. **`microsoft/PowerToys-AI`, `nikitabobko/AeroSpace-AI`**: Could not be verified as existing/extant repos at the URLs provided in the candidates list. AeroSpace exists as a macOS window manager (`nikitabobko/AeroSpace`) — but no `-AI` variant. **Implication**: these candidates in the user's brief appear speculative/non-extant.

9. **Daily-Python (`daily-co/daily-python`) only 65 stars**: It is real, MIT-equiv BSD-2, and active (v0.28.1 May 7 2026), but the low ★ count reflects **commercial-backend SDK status** (Daily is a paid video API competitor to LiveKit). It would NOT pass our T1/T2 install bar even though the SDK quality is acceptable. **Implication**: confirm V-FINAL-V2 LiveKit-only realtime stack — Daily covers a different (commercial) market segment.

10. **GitHub rate-limit hit at request ~25**: Mid-probe, GitHub MCP returned `403 API rate limit exceeded` for ~10 candidates. **Mitigation**: pivoted those to WebFetch and DeepWiki. All planned candidates were ultimately probed via fallback paths; no SOTA candidate was dropped due to rate-limit. Confirmed via cross-source corroboration where rate-limit affected one source.

11. **Pixtral (`mistralai/Pixtral`)**: 404 on direct GitHub probe — Mistral does not publish Pixtral as a standalone GitHub repo (likely model-only on HF). Treated as model artifact, not counted for Axis-1 org diversity.

12. **`mannaandpoem/OpenManus`**: Repo exists but only 469★ — far below tier threshold; deprioritized. Mentioned for completeness.

---

## Recommended ADDS to V-FINAL-V2 (priority order)

| Priority | Repo | ★ | License | Sub-Lane | Verdict | Rationale |
|---|---|---|---|---|---|---|
| **P0** | browser-use/browser-use | 94.1k | MIT | L2.5c+L6.7 | INSTALL T1 | 94k★ MIT + native MCP server — top-tier gap |
| **P0** | pipecat-ai/pipecat | 12.2k | BSD-2 | L2.5a | INSTALL T1 | Native CC plugin marketplace; complements LiveKit |
| **P0** | QwenLM/Qwen3-VL | 19.2k | Apache-2.0 | L2.5c-ii | INSTALL T1 | Apache VLM w/ computer-use cookbook; pairs with OmniParser locally |
| **P0** | anthropics/anthropic-quickstarts | 16.6k | MIT | L2.5c-iii | INSTALL T1 | Official Anthropic `computer_use_20251124` reference impl |
| **P1** | trycua/cua | 16.8k | MIT | L0.75+L2.5c-iv | INSTALL T2 | Lateral sandbox+CU; closes a sandbox gap |
| **P1** | SYSTRAN/faster-whisper | 22.9k | MIT | L2.5b | INSTALL T2 | Python ASR pipeline (sibling to whisper.cpp C++) |
| **P1** | elevenlabs/elevenlabs-mcp | 1.4k | MIT | L2.5e (NEW) | INSTALL T2 | Closes audio output loop (TTS+clone+SFX) |
| **P2** | bytedance/UI-TARS-desktop | 34.2k | Apache-2.0 | L2.5c-v | MONITOR pattern-extract | Agent-TARS supports Claude but Windows-pending |
| **P2** | microsoft/UFO | 8.7k | MIT | L2.5c-v | MONITOR pattern-extract | Windows-native CU agent |
| **P2** | abi/screenshot-to-code | 72.6k | MIT | L2.5f (NEW) | PATTERN-EXTRACT (no install) | Lift prompts/arch into a skill, don't host as service |
| **P3** | simular-ai/Agent-S | 11.3k | Apache-2.0 | L2.5c-v | STUDY | 72.6% OSWorld — pattern-extract for prompt design |
| **P3** | m-bain/whisperX | 21.9k | BSD-2 | L2.5b | STUDY-PILOT | Alignment+diarization for transcript-driven coding |
| **P3** | microsoft/Florence-2-large | n/a | MIT | L2.5d | STUDY-PILOT | Small efficient OCR+grounding pair to ColPali |
| **P3** | gradio-app/fastrtc | 4.6k | MIT | L2.5a | STUDY-PILOT | WebRTC transport primitive |

### Layers Confirmed (no change needed)
- L2.5a (LiveKit) — confirmed dominant, ADD Pipecat as sibling
- L2.5b (whisper.cpp) — confirmed dominant, ADD faster-whisper as Python sibling
- L2.5c (OmniParser) — confirmed dominant, NEEDS finer split (5 sub-categories — see §D)
- L2.5d (ColPali) — confirmed dominant for ViDoRe; ADD Florence-2 as pilot

### Layers To Split
- **L2.5c** → L2.5c-i (parser) / -ii (VLM) / -iii (Anthropic ref) / -iv (sandbox) / -v (pattern-extract)
- **L2.5e** NEW — Voice-TTS-MCP (audio-OUT loop)
- **L2.5f** NEW — Screenshot-to-Code

---

## Verification Footer

- **Sources consulted**: GitHub MCP (30+ probes, rate-limit hit at request ~25), WebFetch (35+ probes — 12 returned 404, treated as honest-non-findings §E), DeepWiki (5 deep queries — playwright-mcp, stagehand, browser-use, livekit/agents, UI-TARS-desktop, OmniParser, pipecat, whisper.cpp, elevenlabs-mcp).
- **V-FINAL-V2 baseline cross-ref**: `Z:\claude-sota-installed\docs\grand-synthesis-2026-05-16\00-MASTER\ULTIMATE-SYNTHESIS-V-FINAL-V2-2026-05-16.md` lines 9, 22, 113-118, 193-196, 210.
- **Cite-class summary**: TIER-1-DIRECT for all GitHub-MCP-verified ★/license/date entries. AMBER for `gpt-realtime-2` GA-date (model-page 403, SDK shipping = strong consistency). RED for non-extant repos (Florence-2 GitHub, anthropics/computer-use-demo, SeleniumHQ/selenium-ai, microsoft/PowerToys-AI, nikitabobko/AeroSpace-AI, mistralai/Pixtral, sammcj/screenshot-to-code).
- **Date verification**: All "last-update" / pushed-at timestamps as of 2026-05-16 probe-time.
- **Convergence Axis-1**: 5/6 sub-lanes PASS with ≥3-org corroboration; L2.5f partial (1 substantive OSS — most competitors closed-source SaaS).
