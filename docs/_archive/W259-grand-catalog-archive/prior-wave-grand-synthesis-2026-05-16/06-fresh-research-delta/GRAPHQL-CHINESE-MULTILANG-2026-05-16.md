# GRAPHQL Chinese + Multi-Language Ecosystem Deep-Probe — 2026-05-16 (fix15 wave)

> Generated 2026-05-16 by sota-researcher subagent (12 GitHub GraphQL probes via mcp__github__search_repositories).
> Cross-check basis: THE-GRAND-CATALOG-PART1..4, THE-ULTIMATE-MASTER, GRAPHQL-FINAL-MISSING, D1-D10-SCORECARD-V-FINAL, OPERATOR-DECISIONS-V-FINAL, DEEP-SAT-AGGREGATED-DELTA.
> Cite-tier: TIER-3-LOCAL-COMPOSITION (GitHub REST/GraphQL = TIER-2 first-party metadata; STATUS column local-derived).
> Honest scoping: Filtered for LLM/agent/vector/memory/AI/code-intel relevance per probe spec — non-AI infra repos (canal, weui, tinker, dperf, wcdb, MMKV, AliSQL, etc.) excluded.

---

## Section A — Chinese Ecosystem

### A1 alibaba (stars>2000, pushed>2025-10-01)

| Repo | Stars | License | Push | Description | STATUS |
|---|---|---|---|---|---|
| **alibaba/page-agent** | **17,877** | unverified | 2026-05-16 | JS in-page GUI agent — control web UIs with NL, MCP | **NEW-P0** L2.5b GUI/browser-agent (5mo to 17.9k★) |
| **alibaba/MNN** | **15,172** | unverified | 2026-05-16 | Lightweight inference engine, on-device LLM/Edge AI | **NEW-P1** L0.25 inference candidate |
| alibaba/OpenSandbox | 10,660 | unverified | 2026-05-16 | Secure sandbox runtime for AI agents | **ALREADY-CATALOGED** (PART4 §86) |
| alibaba/zvec | 9,633 | Apache-2.0 (fix14b verified) | 2026-05-16 | Lightweight in-process vector DB | **ALREADY-CATALOGED** (GRAPHQL-FINAL-MISSING fix13) |
| alibaba/spring-ai-alibaba | 9,630 | Apache-2.0 | 2026-05-16 | Agentic AI Framework for Java devs | **ALREADY-CATALOGED** (DEFER — Java-only) |
| alibaba/ROLL | 3,160 | unverified | 2026-05-16 | RL Scaling library for LLM post-training | **NEW-P2** L4.5 RL infra |
| alibaba/GraphScope | 3,552 | unverified | 2026-05-14 | One-stop large-scale graph computing | **NEW-P3** L0.1 graph computation |

### A2 bytedance (stars>2000, pushed>2025-10-01)

| Repo | Stars | License | Push | Description | STATUS |
|---|---|---|---|---|---|
| bytedance/deer-flow | 67,992 | inferred-MIT | 2026-05-16 | Long-horizon SuperAgent harness | **ALREADY-CATALOGED** (PART2 INSTALL) |
| bytedance/UI-TARS-desktop | 34,207 | Apache-2.0 | 2026-05-16 | Multimodal AI agent stack | **ALREADY-CATALOGED** (D1-D10 80/100) |
| **bytedance/trae-agent** | **11,553** | unverified | 2026-05-16 | LLM agent for general SWE tasks | **NEW-P0** L2.4 SWE-agent (direct Aider peer) |
| **bytedance/UI-TARS** | **10,597** | unverified | 2026-05-16 | Native-agent GUI interaction (research) | **NEW-P1** L2.5b research/model side |
| bytedance/Dolphin | 8,978 | **Qwen Research License (fix14b REJECT)** | 2026-03-25 | ACL 2025 doc parsing | **REJECT** (non-commercial license) |
| **bytedance/flowgram.ai** | **8,038** | unverified | 2026-05-16 | Workflow dev framework | **NEW-P1** L2/L3 workflow (peer LangGraph/Coze) |

### A3 Tencent (stars>2000, pushed>2025-10-01)

| Repo | Stars | License | Push | Description | STATUS |
|---|---|---|---|---|---|
| **Tencent/WeKnora** | **15,069** | unverified | 2026-05-16 | LLM knowledge platform — RAG + autonomous reasoning + **self-maintaining Wiki** | **NEW-P0** L0.3 RAG agent — **FILLS KARPATHY §5 WIKI COMPOUNDING SURFACE GAP** |
| Tencent/AI-Infra-Guard | 3,732 | unverified | 2026-05-16 | AI Red Teaming platform | **ALREADY-CATALOGED** (PART3 L5.0d) |
| **Tencent/ncnn** | **23,234** | unverified | 2026-05-16 | High-perf NN inference (mobile) | **NEW-P2** L0.25 mobile inference peer of MNN |

### A4 baidu (stars>1000, pushed>2025-10-01)

| Repo | Stars | License | Push | Description | STATUS |
|---|---|---|---|---|---|
| baidu/amis | 18,856 | unverified | 2026-05-16 | Frontend low-code framework | EXCLUDED (UI, non-AI) |
| baidu/dperf | 5,559 | unverified | 2026-05-13 | DPDK network load testing | EXCLUDED (network infra) |

> **Saturation observation**: Baidu pubs heavy on classic infra — **ZERO active AI/agent/LLM repos ≥1k★ pushed last 7 months under `baidu/` org**. AI activity migrated to `PaddlePaddle/`.

### A5 huawei (stars>1000, pushed>2025-10-01)

> **SAT-EMPTY** — ZERO matches. Huawei MindSpore lives under `mindspore-ai/`. Internal-corp gravity on Gitee not GitHub.

### A6 topic:llm-china (stars>2000, pushed>2025-08-01)

> **SAT-EMPTY** — ZERO matches. Topic dead; authors use `llm`/`chinese-llm` tags.

### A7 THUDM (stars>2000, pushed>2025-08-01)

| Repo | Stars | License | Push | Description | STATUS |
|---|---|---|---|---|---|
| **THUDM/slime** | **5,704** | unverified | 2026-05-16 | LLM post-training RL Scaling | **NEW-P1** L4.5 RL infra peer alibaba/ROLL |
| THUDM/AgentBench | 3,427 | Apache-2.0 | 2026-05-16 | ICLR'24 LLM-as-agent benchmark | **ALREADY-CATALOGED** (DEFER — reward-hacked) |

### A8 OpenBMB (stars>2000, pushed>2025-08-01)

| Repo | Stars | License | Push | Description | STATUS |
|---|---|---|---|---|---|
| OpenBMB/ChatDev | 33,102 | unverified | 2026-05-16 | ChatDev 2.0 multi-agent collab | **ALREADY-CATALOGED** (PART2 STUDY) |
| **OpenBMB/MiniCPM-V** | **24,942** | unverified | 2026-05-16 | Pocket-sized MLLM for image/video on phone | **NEW-P1** L2.5b/L3 multimodal-on-device |
| **OpenBMB/VoxCPM** | **18,958** | unverified | 2026-05-16 | Tokenizer-free TTS, multilingual | **NEW-P2** L3.5 TTS/voice peer Coqui |
| OpenBMB/MiniCPM | 8,895 | unverified | 2026-05-16 | MiniCPM4 — ultra-efficient LLMs | **NEW-P2** L0.25 small-LLM family |
| OpenBMB/UltraRAG | 5,545 | Apache-2.0 | 2026-05-16 | Low-Code MCP framework for complex RAG | **ALREADY-CATALOGED** (PART1 INSTALL) |

---

## Section B — Multi-Language LSP / Code-Intel

### B1 topic:language-server-protocol (Go probe)

| Repo | Stars | License | Push | Description | STATUS |
|---|---|---|---|---|---|
| **isaacphi/mcp-language-server** | **1,527** | unverified | 2026-05-16 | **MCP server giving clients LSP tools** (def/refs/rename/diagnostics) | **NEW-P0 HIGHEST CC-FIT** — bridges LSP→MCP for CC; complements serena/ast-grep |

### B2 topic:language-server-protocol (TS probe)

| Repo | Stars | License | Push | Description | STATUS |
|---|---|---|---|---|---|
| eclipse-theia/theia | 21,512 | unverified | 2026-05-16 | Cloud + desktop IDE framework | EXCLUDED |
| typescript-language-server | 2,482 | MIT-equiv (fix14b verified vscode-derivative) | 2026-05-16 | Unofficial TS/JS LSP | **ALREADY-CATALOGED** (EVALUATE) |
| jupyter-lsp/jupyterlab-lsp | 1,990 | unverified | 2026-05-13 | LSP for JupyterLab | **NEW-P3** notebook-specific |

### B3 topic:tree-sitter (stars>500, pushed>2025-08-01)

| Repo | Stars | License | Push | Description | STATUS |
|---|---|---|---|---|---|
| **safishamsi/graphify** | **48,519** | unverified | 2026-05-16 | Multi-CLI skill — folder → KG (CC/Codex/Cursor/Gemini/OpenCode) | **NEW-P0** L0.4+L1 · `[POPULAR-BUT-UNVERIFIED]` `[MARKETING-LANGUAGE]` (48k★ in 6 weeks) |
| tree-sitter/tree-sitter | 25,386 | MIT | 2026-05-16 | Incremental parsing substrate | **ALREADY-CATALOGED** (PART4 IMPLICIT-DEP) |
| **Wilfred/difftastic** | **25,311** | unverified | 2026-05-16 | Structural diff understanding syntax | **NEW-P1** L0.4/L4.5 review-aid |
| tirth8205/code-review-graph | 16,612 | unverified | 2026-05-16 | Local KG for CC; 6.8× token reduction | **ALREADY-CATALOGED** (`[MARKETING-LANGUAGE]`) |
| nvim-treesitter/nvim-treesitter | 13,907 | unverified | 2026-05-16 | Neovim TS configs (**ARCHIVED**) | EXCLUDED |
| ast-grep/ast-grep | 13,811 | MIT | 2026-05-16 | CLI for code structural search/lint/rewrite | **ALREADY-CATALOGED** (D1-D10 90/100 INSTALL-T1) |
| **biomejs/gritql** | **4,502** | unverified | 2026-05-16 | Query language for code | **NEW-P1** L0.4 named-T3 biomejs-org |
| afnanenayet/diffsitter | 2,373 | unverified | 2026-05-14 | Tree-sitter AST difftool | **NEW-P2** L0.4/L4.5 |
| DeusData/codebase-memory-mcp | 2,363 | MIT (fix14b verified) | 2026-05-16 | High-perf code-intel MCP; 155 langs | **ALREADY-CATALOGED** (fix13 NEW-P0) |
| **Ataraxy-Labs/sem** | **2,006** | unverified | 2026-05-15 | Semantic VCS — entity diffs/blame/impact, 26 langs | **NEW-P0** L0.4+L6 git-augmentation for coding agents |
| **cocoindex-io/cocoindex-code** | **1,663** | unverified | 2026-05-16 | Lightweight embedded code-search CLI (AST); 70% token save | **NEW-P1** L0.4 peer of chunkhound |
| **Ataraxy-Labs/weave** | **1,007** | unverified | 2026-05-16 | Entity-level git merge driver (~95% conflict reduction for parallel agents) | **NEW-P0** L0.6 worktree-parallel |

### B4 topic:incremental-parser

> **SAT-EMPTY** — saturation by B3.

---

## Summary

### Total net-new ≥1k★: 15 NEW candidates

| # | Repo | Stars | Layer | Priority |
|---|---|---|---|---|
| 1 | **safishamsi/graphify** | 48,519 | L0.4+L1 multi-CLI skill | **NEW-P0** `[MARKETING-LANGUAGE]` `[POPULAR-BUT-UNVERIFIED]` |
| 2 | **alibaba/page-agent** | 17,877 | L2.5b GUI browser-agent | **NEW-P0** |
| 3 | **Tencent/WeKnora** | 15,069 | L0.3 RAG + Self-Maintaining Wiki | **NEW-P0** (Karpathy §5 gap-filler) |
| 4 | **bytedance/trae-agent** | 11,553 | L2.4 SWE-agent | **NEW-P0** |
| 5 | **Ataraxy-Labs/sem** | 2,006 | L0.4+L6 semantic VCS for agents | **NEW-P0** |
| 6 | **isaacphi/mcp-language-server** | 1,527 | L0.4 LSP→MCP bridge | **NEW-P0 HIGHEST CC-FIT** |
| 7 | **Ataraxy-Labs/weave** | 1,007 | L0.6 entity-level git merge | **NEW-P0** |
| 8 | OpenBMB/MiniCPM-V | 24,942 | L2.5b/L3 multimodal-on-device | **NEW-P1** |
| 9 | Wilfred/difftastic | 25,311 | L0.4/L4.5 structural diff | **NEW-P1** |
| 10 | alibaba/MNN | 15,172 | L0.25 mobile inference | **NEW-P1** |
| 11 | bytedance/UI-TARS | 10,597 | L2.5b GUI research | **NEW-P1** |
| 12 | bytedance/flowgram.ai | 8,038 | L2/L3 workflow framework | **NEW-P1** |
| 13 | THUDM/slime | 5,704 | L4.5 RL post-training | **NEW-P1** |
| 14 | biomejs/gritql | 4,502 | L0.4 query language | **NEW-P1** |
| 15 | cocoindex-io/cocoindex-code | 1,663 | L0.4 code-search MCP | **NEW-P1** |

(P2/P3 tail: Tencent/ncnn, alibaba/ROLL, alibaba/GraphScope, OpenBMB/VoxCPM, OpenBMB/MiniCPM, jupyterlab-lsp, diffsitter)

### Top 5 NEW with native-CC-pathway potential

1. **isaacphi/mcp-language-server** (1,527★) — **HIGHEST CC-FIT**. Native MCP server, gives CC LSP-class semantic tools across any LSP-enabled language. Direct slot at L0.4 alongside serena. No prior catalog entry — pure delta.
2. **Tencent/WeKnora** (15,069★) — **HIGH CC-FIT**. Self-maintaining Wiki + RAG + reasoning agent. Differentiator is the **self-maintaining Wiki primitive** = directly missing per Karpathy §5 Wiki Compounding Surface.
3. **bytedance/trae-agent** (11,553★) — **MEDIUM-HIGH CC-FIT**. Direct peer of Aider/Codex/SWE-agent. Bake-off at L2.4 vs Aider.
4. **safishamsi/graphify** (48,519★) — **MEDIUM CC-FIT WITH FLAG**. Self-describes as multi-CLI skill. 6 weeks to 48.5k★ = `[POPULAR-BUT-UNVERIFIED]` window. Verify before adoption.
5. **Ataraxy-Labs/sem + weave** pair (2,006★ + 1,007★) — **HIGH CC-FIT for parallel-agent workflows**. `sem` = entity-level diffs/blame/impact; `weave` = entity-level git merge ~95% conflict reduction. Both purpose-built for `topic:coding-agents`. Direct fit L0.6.

### 3 Saturation observations

1. **Chinese mega-orgs heavily dominated by NON-AI infra at 2k+★** — most growth in alibaba/bytedance/tencent since 2025-10 is JVM/mobile/UI/DB. AI footprint per org saturates at 4-7 active LLM/agent repos. **No truly novel layer surface emerged** that wasn't already populated by Western incumbents.
2. **Baidu + Huawei ZERO active AI repos ≥1k★ in last 7 months** — Baidu migrated to `PaddlePaddle/`, Huawei MindSpore is under `mindspore-ai/`, internal-corp gravity on Gitee. The `topic:llm-china` topic is not load-bearing. Only NEW Chinese-ecosystem deltas worth surfacing came from **named-org probes**, not topic-based discovery.
3. **LSP / tree-sitter ecosystem highly saturated at runtime-primitive layer** — incumbent tree-sitter (25k★) + ast-grep (13.8k★) + chunkhound (1.3k★) already cover substrate. Net-new entries are predominantly **(a) niche language bindings or editor plugins** (excluded), or **(b) MCP-wrappers bridging LSP/AST to CC**. The MCP-bridge bucket has exactly TWO load-bearing additions: `isaacphi/mcp-language-server` and `Ataraxy-Labs/weave`.

### HONEST-NON-FINDING (handoff items)

Did NOT probe `paddlepaddle/`, `modelscope/`, `sjtu-*`, `mindspore-ai/`, `qwen-team/`, `deepseek-ai/`, `internlm/` — these are likely the next-wave Chinese-ecosystem surfaces if this delta is pursued further.
