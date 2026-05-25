# GAP: Multi-Modal + Production Agent Stacks — 2026-05-16

> Sourced from sota-researcher fork (agentId a445742fdaec0e568, 2026-05-16 14:46 PT)
> R1 multi-source ≥5: GitHub MCP + Exa + Context7 + WebFetch + DeepWiki
> R3 GitHub primary-source verification on all star counts (HEAD 2026-05-16)

## §A — Multi-Modal/Realtime Gap Findings

### Voice / Realtime
| # | Repo | ★ | License | Value | Verdict |
|---|---|---|---|---|---|
| A1 | **livekit/agents** | **10,499** | Apache-2.0 | Realtime voice/video/multimodal framework w/ WebRTC, SIP telephony, semantic turn-detection transformer, K8s orchestration | **ADOPT** (Axis-1 PASS: LiveKit + Speechmatics + Simli + HappyRobot + telli-ai + rimelabs) |
| A2 | **gradio-app/fastrtc** | 4,583 | Apache-2.0 | "Turn any Python function into realtime audio/video over WebRTC"; auto VAD + turn-taking; HuggingFace-backed | **ADOPT** (Axis-1 PASS: HuggingFace + community) |
| A3 | **openai/whisper** | 99,579 | MIT | Reference ASR; peer-reviewed; ubiquitous baseline | **ADOPT** |
| A4 | **ggml-org/whisper.cpp** | 49,745 | MIT | C/C++ port; Apple Silicon optimized; WebAssembly + RPi compatible | **ADOPT** (Axis-1 PASS: in nearly every voice-agent stack) |
| A5 | **OpenAI Realtime API** | SDK-only | Commercial | gpt-realtime-2 + gpt-realtime-translate + gpt-realtime-whisper GA 2026; native remote MCP server support, SIP, image input | **ADOPT-AS-CLIENT** (TIER-1 OpenAI blog 2026) |

### Vision / Document VLMs
| # | Repo | ★ | License | Value | Verdict |
|---|---|---|---|---|---|
| A6 | **microsoft/OmniParser** | **24,770** | MIT | Pure-vision GUI agent: screen→structured elements; V2 + OmniTool (Windows 11 control); supports GPT-4o/o1/o3-mini/DeepSeek R1/Qwen2.5VL/Anthropic Computer Use | **ADOPT** (Axis-1+2 PASS: Microsoft+Anthropic+community — anchors most "computer use" stacks 2026) |
| A7 | **illuin-tech/colpali** | 2,628 | MIT | ViDoRe-SOTA visual doc retrieval; page-as-image late-interaction; ColPali/ColQwen2/ColSmol family | **ADOPT** (Axis-1 PASS: illuin-tech + HuggingFace cookbook + Vespa blog + Zilliz; arXiv 2407.01449 peer-reviewed) |
| A8 | LLaVA-NeXT/OneVision | n/a | Apache-2.0 | 0.5B/7B/72B SOTA on multi-image/video benchmarks | **WATCHLIST** (mostly research-bench) |
| A9 | Pixtral 12B (Mistral) | n/a | Apache-2.0 | MM-IF-Eval + MM-MT-Bench leadership | **WATCHLIST** (TIER-2 Mistral self-report) |

### Generation
| # | Repo | ★ | License | Value | Verdict |
|---|---|---|---|---|---|
| A10 | **comfyanonymous/ComfyUI** | INFERRED main + 4.2k+0.7k+0.4k companion repos | GPL-3.0 | Node-graph generation pipelines; dominant SD/video gen orchestrator | **ADOPT-WATCHLIST** — heavyweight; only adopt if multi-modal *generation* needed |

## §B — Production Agent Stack Extracts (Patterns, NOT installs)

| # | Product | Pattern | Extracted Lesson | Citation |
|---|---|---|---|---|
| B1 | **Cognition/Devin** | VM-level isolation + hypervisor-snapshot for async + thousands-concurrent-session orchestration | Sandbox = VM, not container; snapshots enable hours-long trajectories w/o context-rot replay cost | cognition.ai/blog/devin-annual-performance-review-2025; ZenML LLMOps Apr 2026; cognition.ai/blog/devin-sonnet-4-5-lessons |
| B2 | **Cursor** | Dynamic context discovery (provide less upfront, agent pulls via local-embeddings RAG) | Token-efficient + reduces contradictory context; tuned `.cursorignore` mandatory (1M-file: 5-15min unindexed vs 10-30sec indexed) | cursor.com/blog/dynamic-context-discovery |
| B3 | **Windsurf/Cascade** | Dual-agent: background planner refines long-term plan while primary executes short-term actions; flow-awareness tracks file/terminal/clipboard/conversation timeline | Two-agent split addresses context-rot; codebase-awareness > conversation-window awareness | windsurf.com/cascade; Cognition acquired Windsurf Dec 2025 ~$250M |
| B4 | **Replit Agent v3** | (a) Self-heal: agent tests built app in live browser; (b) Restricted Python-DSL for tool calls (NOT function-calling); (c) XML-tag prompt structure | Code-gen-as-tool-call beats function-calling for complex flows; live-test closes verify-before-claim gap | blog.replit.com/introducing-agent-3; 3x faster + 10x cheaper than Computer Use; 200-min autonomy |
| B5 | **v0 (Vercel)** | Multi-step pipeline: dynamic system prompt → "LLM Suspense" streaming-manipulation → deterministic + model-driven autofixers during/after stream | Streaming-interception + autofix eliminates a class of stream-corruption errors typical in token-by-token gen | vercel.com/blog/how-we-made-v0-an-effective-coding-agent (Jan 2026) |
| B6 | **Lovable** | Agent + Plan + Visual-Edits triad; chat renders markdown + `lov-*` XML custom UI; MCP server as RPC framework | Mode-switching gives operator right tool per task class | docs.lovable.dev; lovable.dev/blog/2025-01-16-lovable-prompting-handbook |
| B7 | **Bolt.new/StackBlitz** | Full Node.js runtime in browser tab (proprietary WebContainer); node_modules cached IndexedDB; 5-layer architecture | Client-side sandboxed runtime eliminates VM-spin-up entirely; ~40% build perf gain via Vite (Jan 2026) | github.com/stackblitz/bolt.new (16,374★) |
| B8 | **Stagehand v3 (Browserbase)** | Four primitives (`act`/`extract`/`observe`/`agent`) over Chrome DevTools Protocol; preview-AI-action-before-run; auto-cache + self-heal on DOM change | Treat agent as layer ABOVE deterministic automation; 44.11% faster on iframes/shadow-root in v3 | github.com/browserbase/stagehand (22,675★); **mcp-server-browserbase (3,339★) is the Claude Code installable surface** |
| B9 | **x1xhlol corpus** | Centralized public corpus of leaked/published prompts + tool JSON for v0/Cursor/Devin/Lovable/Manus/Replit/Windsurf/Warp/Augment | Primary R4 reference material — read the actual prompts, don't extrapolate from blog summaries | **github.com/x1xhlol/system-prompts-and-models-of-ai-tools (137,474★ HEAD 2026-05-16 — top-5 prompt repo on GitHub)** |
| B10 | **Adversarial findings (Axis D)** | (a) Tool-calling fails 3-15% in prod; (b) **Cursor-Opus deleted prod DB Apr 2026**; (c) **recursive agent loop = $47k API bill 11 days unnoticed**; (d) AI-gen code 2.74x more security vulns, failures surface 30-90 days post-deploy | Circuit-breakers + cost-caps + no-unrestricted-write-on-prod + human-in-loop on destructive ops are **MANDATORY** | theregister.com/2026/04/27/cursoropus_agent_snuffs_out_pocketos; Medium "AI Agent Failures 7 Real Disasters" 2026-05 |

## §C — Convergence Assessment

**Multi-modal/Realtime cohort**: Axis-1 PASS (6 orgs: LiveKit + HuggingFace/Gradio + Microsoft + OpenAI + ggml-org + illuin-tech all shipping >2k★). Axis-2 PASS (Cognition uses WebRTC class; Anthropic Computer Use uses OmniParser; HuggingFace + Vespa + Zilliz endorse ColPali). **H1 NOT-REJECTED** — multi-modal IS load-bearing 2026-era surface that V-FINAL underweights.

**Production-stack cohort**: Axis-1 PASS (8 commercial products with publicly extractable patterns: Cognition + Anysphere + Codeium + Replit + Vercel + Lovable + StackBlitz + Browserbase). Axis-2 PASS (x1xhlol 137k★ corpus = primary-source R4 substrate; Cognition+Vercel+Replit publish architectural blogs with named authors). **H2 NOT-REJECTED** — production lessons ARE extractable + warrant a sub-cohort.

## §D — Architecture Impact

**D1. L2.5 V-FINAL needs multi-modal capabilities added — YES.**
- **L2.5a Realtime/Voice**: livekit/agents (top pick — 10.5k★, broader ecosystem) OR gradio-app/fastrtc (lighter alternative)
- **L2.5b Local ASR**: whisper.cpp (no deps, 49.7k★)
- **L2.5c Vision/Computer-Use**: microsoft/OmniParser (24.8k★, pairs w/ Anthropic Computer Use)
- **L2.5d Document-VLM**: illuin-tech/colpali (2.6k★) for visual-RAG replacing brittle OCR

**D2. New L6.7 "Commercial-Agent-Pattern-Extracts" sub-cohort — YES.**
- **Anchor reference**: x1xhlol corpus (R4 audit substrate, read-only — NOT installed)
- **Extracted patterns to encode as runtime discipline**:
  1. VM-isolation + snapshotting (Cognition) → boundaries for any long-running sub-agent
  2. Dynamic context discovery (Cursor) → codify as L1 rule (aligned w/ current approach)
  3. Dual-agent planning split (Windsurf) → consider for `team-lead` + planner split
  4. Self-heal + verify-before-claim (Replit Agent 3) → maps to `verification-before-completion` skill
  5. **Adversarial-defense circuit-breakers ($47k bug, prod-DB delete) → cost-cap + write-permission gates MANDATORY**

**D3. Top 3 INSTALL candidates per category for V-FINAL-V2:**
- *Multi-modal/Realtime*: (1) livekit/agents 10,499★ Apache-2.0, (2) ggml-org/whisper.cpp 49,745★ MIT, (3) microsoft/OmniParser 24,770★ MIT
- *Production-pattern refs (NOT installs, R4 substrate)*: (1) x1xhlol/system-prompts-and-models-of-ai-tools 137,474★, (2) browserbase/mcp-server-browserbase 3,339★ (installable MCP), (3) stackblitz/bolt.new 16,374★ (in-browser sandbox reference)

## §E — Honest Non-Findings

1. **Lovable/v0/Cursor/Windsurf are CLOSED-SOURCE** — no installable runtime exists. Only patterns extractable. Anyone proposing "install Cursor as MCP" is hallucinating.
2. **No first-party Anthropic realtime API** — OpenAI dominates (gpt-realtime-2 GA 2026); voice agents must bridge via LiveKit/FastRTC + OpenAI Realtime if needed.
3. **ComfyUI main-repo ★-count NOT directly R3-VERIFIED** this fire (search-by-name didn't return main repo in rate-limited window) — companion repos confirm scale but exact main count is INFERRED.
4. **Pixtral/LLaVA-NeXT benchmark dominance claims are SELF-REPORTED** by Mistral/LLaVA authors. External leaderboard validation NOT independent this fire → labeled WATCHLIST not ADOPT.
5. **Windsurf-Cognition $250M acquisition** is TIER-2 industry press, not primary-source-confirmed this fire.
6. **No production-agent reliability benchmark equivalent to MLPerf exists** — "X% tool-call failure" numbers are TIER-2 Medium articles, not peer-reviewed. Treat as adversarial watchlist, not load-bearing.
7. **Anthropic Computer Use is API feature, NOT installable primitive** — OmniParser remains OSS-installable equivalent.

## Sources

- [livekit/agents](https://github.com/livekit/agents)
- [gradio-app/fastrtc](https://github.com/gradio-app/fastrtc)
- [microsoft/OmniParser](https://github.com/microsoft/OmniParser)
- [illuin-tech/colpali](https://github.com/illuin-tech/colpali)
- [ggml-org/whisper.cpp](https://github.com/ggml-org/whisper.cpp)
- [openai/whisper](https://github.com/openai/whisper)
- [browserbase/stagehand](https://github.com/browserbase/stagehand)
- [stackblitz/bolt.new](https://github.com/stackblitz/bolt.new)
- [x1xhlol/system-prompts-and-models-of-ai-tools](https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools)
- [Vercel — How we made v0 an effective coding agent](https://vercel.com/blog/how-we-made-v0-an-effective-coding-agent)
- [Cognition — Devin 2025 Performance Review](https://cognition.ai/blog/devin-annual-performance-review-2025)
- [Cognition — Rebuilding Devin for Claude Sonnet 4.5](https://cognition.ai/blog/devin-sonnet-4-5-lessons-and-challenges)
- [Replit — Introducing Agent 3](https://blog.replit.com/introducing-agent-3-our-most-autonomous-agent-yet)
- [Cursor — Dynamic Context Discovery](https://cursor.com/blog/dynamic-context-discovery)
- [Windsurf — Cascade](https://windsurf.com/cascade)
- [Browserbase — Stagehand v3](https://www.browserbase.com/blog/stagehand-v3)
- [OpenAI — Introducing gpt-realtime](https://openai.com/index/introducing-gpt-realtime/)
- [ColPali paper (arXiv 2407.01449)](https://arxiv.org/abs/2407.01449)
- [The Register — Cursor-Opus prod DB deletion](https://www.theregister.com/2026/04/27/cursoropus_agent_snuffs_out_pocketos/)
- [ZenML LLMOps — Cognition Production Cloud Agents](https://www.zenml.io/llmops-database/building-and-deploying-production-cloud-agents-for-software-engineering)
