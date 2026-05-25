# 02 — Broader Discovery Pass 3 (5 NEW topic angles → 30 candidates → 10 high-signal)

> **Purpose**: extend Fire 8 + Fire 9 discovery passes with 5 NEW topic angles to find
> SOTA repos missed by narrower queries. Captured 30 candidates via GitHub REST search;
> 10 high-signal warrant deeper consideration.

## 5 NEW query angles (beyond Fire 8/9)

1. `topic:context-engineering pushed:>2026-02-01 stars:>200`
2. `topic:agentic-rag pushed:>2026-02-01 stars:>200`
3. `topic:autonomous-agent pushed:>2026-03-01 stars:>500`
4. `topic:llm-agent pushed:>2026-03-01 stars:>1000`
5. `topic:claude-skill pushed:>2026-05-01 stars:>100`

## 30 discoveries (raw at `_pass3-discoveries.json`)

### 🥇 Top NEW Tier-1 spec-driven candidate

**Fission-AI/OpenSpec** (46,692★ MIT) [2026-05-07]:
- "Spec-driven development (SDD) for AI coding assistants"
- **DIRECT spec-kit COMPETITOR** at comparable star count (95k★ spec-kit vs 46k★ OpenSpec)
- Active push (3 days ago)
- Fission-AI = named org (not individual)
- **Verdict**: 🔬 STUDY-PILOT — investigate vs Github spec-kit; queue Fire 13 comparison

### 🥈 Top NEW Tier-2/3 memory/RAG candidates

**VectifyAI/PageIndex** (30,416★ MIT) [2026-05-08]:
- "Document Index for Vectorless, Reasoning-based RAG"
- VECTORLESS approach = novel architectural angle (avoids embedding-DB cost)
- 30k★ at MIT = strong signal
- **Verdict**: 🔬 STUDY-PILOT for L4 wiki / RAG layer alternative to current sqlite_vec + FalkorDB stack

**zilliztech/claude-context** (10,916★ MIT) [2026-05-06]:
- "Code search MCP for Claude Code. Make entire codebase the context"
- Zilliz (vector-DB org) MCP-native for CC
- **Verdict**: 🔬 STUDY-PILOT — potentially competing with eee's repomix MCP + mcp-memory L1
- Note: zilliztech is the org behind Milvus vector DB; legitimate provenance

**letta-ai/letta** (22,607★ Apache-2.0) [2026-04-12]:
- "Letta is the platform for building stateful agents: AI with persistent memory"
- Stateful agents = direct sister to mem0/zep/graphiti memory primitives
- **Verdict**: 🔬 STUDY-PILOT — comparison with eee's L1 mcp-memory + L3 Graphiti stack

**Storybloq/storybloq** (218★ NOASSERTION) [2026-05-09]:
- "Cross-session context for Claude Code. CLI + MCP server + /s..."
- Direct cross-session memory tool
- Low stars but very fresh; **VERIFY LICENSE before any use**
- **Verdict**: DEFER pending LICENSE clarification

### 🥉 Top NEW Tier-1 method / framework candidates

**microsoft/autogen** (57,888★ CC-BY-4.0) [2026-04-15]:
- "A programming framework for agentic AI"
- Microsoft OFFICIAL
- CC-BY-4.0 license = cite-only acceptable (no fork-modify-redistribute)
- **Verdict**: 📚 CITE-CATALOG only (CC-BY-4.0 prevents install-class use)

**agentscope-ai/agentscope** (24,801★ Apache-2.0) [2026-05-09]:
- "Build and run agents you can see, understand and trust"
- Observable agent framework
- **Verdict**: 🔬 STUDY-PILOT — observability angle complement (sister to openlit INSTALLED)

**HKUDS/DeepCode** (15,468★ MIT) [2026-04-30]:
- "DeepCode: Open Agentic Coding (Paper2Code & Text2Web & Text..."
- HKUDS = Hong Kong University Data Science research lab
- Academic agentic coding (paper-to-code)
- **Verdict**: 📚 CITE-CATALOG (research-oriented; not eee runtime)

**The-Pocket/PocketFlow** (10,597★ MIT) [2026-03-27]:
- "Pocket Flow: 100-line LLM framework. Let Agents build Agents"
- Minimalist meta-framework (100-line philosophy)
- **Verdict**: 📚 CITE-CATALOG (interesting pattern; eee already has minimal philosophy)

### Autonomous research candidates

**wanshuiyin/Auto-claude-code-research-in-sleep** (8,704★ MIT) [2026-05-07]:
- "ARIS ⚔️ (Auto-Research-In-Sleep) — Lightweight Markdown-only autonomous research"
- Direct ARIS pattern (Karpathy mentioned)
- **Verdict**: 🔬 STUDY-PILOT — eee already uses Karpathy 3-layer wiki; ARIS could be the autonomous-research layer

**uditgoenka/autoresearch** (4,381★ MIT) [2026-05-06]:
- "Claude Autoresearch Skill — Autonomous goal-directed iterative research"
- Skill format = Anthropic Agent Skills standard
- **Verdict**: 🔬 STUDY-PILOT for research-protocol.md augmentation

### Vertical-domain skills

**Bhanunamikaze/Agentic-SEO-Skill** (509★ MIT) [2026-05-05]:
- "An LLM-first SEO analysis skill for Antigravity, Codex, Claude..."
- Cross-tool SEO vertical
- **Verdict**: 📚 CITE-CATALOG (vertical, not eee-core)

**eugeniughelbur/obsidian-second-brain** (1,029★ MIT) [2026-05-10]:
- "Claude Code skill for Obsidian. Turn your vault into a living..."
- Obsidian integration
- **Verdict**: 📚 CITE-CATALOG (Obsidian-specific)

### Re-confirmed Fire 9 findings

- **ruvnet/ruflo** (48,421★ MIT) — already Fire 9 STUDY-PILOT candidate (CONFIRMED still valid)
- **volcengine/OpenViking** (23,737★ AGPL-3.0) — Fire 6 REJECT-LICENSE confirmed (AGPL = library/network-served REJECT for eee runtime)
- **microsoft/ai-agents-for-beginners** (61,112★ MIT) — educational; CITE-CATALOG
- **shanraisshan/claude-code-best-practice** (52,136★ MIT) — eee ALREADY CITES (CCBP)
- **gsd-build/get-shit-done** (61,308★ MIT) — already Fire 6/8 CITE-IMPORT

### Other discoveries (DEFER / REJECT)

| Repo | Stars | License | Verdict reason |
|---|---|---|---|
| Snailclimb/JavaGuide | 155k | Apache-2.0 | Chinese Java interview guide — UNRELATED to CC |
| ChatTTS | 39k | AGPL-3.0 | Speech generation — UNRELATED |
| lsdefine/GenericAgent | 10.5k | MIT | Self-evolving agent — interesting but DEFER for review |
| Upsonic/Upsonic | 7.8k | MIT | Python agent framework | DEFER vs existing eee framework |
| EvoMap/evolver | 7.4k | GPL-3.0 | GEP-powered self-evolving | GPL-3.0 reject for library use |
| ModelEngine-Group/nexent | 4.4k | MIT | Zero-code platform | DEFER |
| stakpak/agent | 1.5k | Apache-2.0 | "Ship your code, on autopilot" | DEFER |
| JuneYaooo/gpt-image2-ppt-skills | 417 | Apache-2.0 | OpenAI gpt-image-2 PPT | UNRELATED |
| bitwize-music-studio/claude-ai-music-skills | 169 | CC0-1.0 | Music production skills | UNRELATED |
| likaku/Mck-ppt-design-skill | 130 | Apache-2.0 | PPT design | UNRELATED |

## Top 10 actionable NEW candidates summary

| # | Repo | Stars | License | Tier | Action |
|---|---|---|---|---|---|
| 1 | Fission-AI/OpenSpec | 46k | MIT | Tier-1 method | 🔬 STUDY-PILOT vs spec-kit (W134-F13) |
| 2 | VectifyAI/PageIndex | 30k | MIT | Tier-3 memory | 🔬 STUDY-PILOT vectorless-RAG (W134-F13) |
| 3 | letta-ai/letta | 23k | Apache-2.0 | Tier-3 memory | 🔬 STUDY-PILOT stateful-agents (W134-F13) |
| 4 | agentscope-ai/agentscope | 25k | Apache-2.0 | Tier-1 framework | 🔬 STUDY-PILOT observable-agents |
| 5 | zilliztech/claude-context | 11k | MIT | Tier-2 utility | 🔬 STUDY-PILOT vs repomix (W134-F13) |
| 6 | wanshuiyin/Auto-claude-code-research-in-sleep | 8.7k | MIT | Tier-3 research | 🔬 STUDY-PILOT ARIS autonomous research |
| 7 | microsoft/autogen | 58k | CC-BY-4.0 | Tier-5 reference | 📚 CITE-CATALOG only (CC-BY-4.0) |
| 8 | HKUDS/DeepCode | 15k | MIT | Tier-5 reference | 📚 CITE-CATALOG |
| 9 | The-Pocket/PocketFlow | 11k | MIT | Tier-5 reference | 📚 CITE-CATALOG |
| 10 | uditgoenka/autoresearch | 4.4k | MIT | Tier-3 skill | 🔬 STUDY-PILOT research-protocol augment |

## Cumulative baseline update

- Fire 11 baseline: 640 raw / 603 TRUE
- Fire 12 pass-3 discoveries: 30 raw, 10 high-signal
- **Cumulative post-Fire-12: 670 raw / ~610 TRUE** (assuming 7 overlap-with-Fire-9-already-discovered)

## Forward fire candidates (W134-F13+)

- **W134-F13-OpenSpec-vs-spec-kit**: head-to-head comparison
- **W134-F13-PageIndex-vectorless-RAG**: probe vs existing sqlite_vec + Graphiti
- **W134-F13-letta-vs-Graphiti**: stateful-agent comparison
- **W134-F13-zilliztech-vs-repomix**: code-search MCP comparison
- **W134-F13-ARIS-research-protocol-augment**: integrate ARIS pattern into research-protocol.md
- **W134-F13-fission-org-provenance**: verify Fission-AI provenance + named-author analysis

## Mia ladder advance

n=1140 → n=1158 (+18: 30 candidates probed at REST-API depth / 10 high-signal triaged /
5 STUDY-PILOT classifications / 3 CITE-CATALOG / 12 DEFER/REJECT)
