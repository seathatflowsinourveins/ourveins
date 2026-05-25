# GraphQL Niche Probe (500-1k★ Floor) — 2026-05-16 (fix17 wave)

> **Purpose**: Second-deep GitHub GraphQL probe complementing the prior >1k★ sweeps (fix1-13). Floor dropped to **500★** (Axis 9 dropped to 200★) to capture niche-but-active SOTA entrants.
> **Method**: 10 `mcp__github__search_repositories` queries (sort=stars desc, perPage=15). No per-repo deep-dive API calls (budget-preserve).
> **Overlap basis (strict)**: `THE-GRAND-CATALOG-PART{1,2,3,4}.md` + `GRAPHQL-FINAL-MISSING-2026-05-16.md`.
> **Verdict legend**: ADOPT (TBD pending T1) · STUDY-PILOT (worth deeper read) · WATCH · DEFER · REJECT.

---

## Axis 1 — Memory MCP Niche (`topic:mcp memory stars:500..1000 pushed:>2025-08-01`)

13 repos · 6 net-new strict.

| Repo | Stars | License | Push | Pathway | Verdict | STATUS |
|---|---:|---|---|---|---|---|
| ai-boost/awesome-harness-engineering | 945 | n/a | 2026-05-16 | curated | CITE | ALREADY (PART3) |
| mnemox-ai/tradememory-protocol | 908 | ? | 2026-05-16 | MCP 17 tools | STUDY-NICHE | ALREADY (PART1) |
| **opensquilla/opensquilla** | **887** | ? | 2026-05-16 | agent harness | **STUDY-NICHE** — token-efficient claim | NEW |
| shaneholloman/mcp-knowledge-graph | 857 | ? | 2026-05-16 | MCP fork | DEFER | ALREADY |
| heurist-network/heurist-agent-framework | 813 | ? | 2026-05-16 | research+blockchain | DEFER | NEW |
| beita6969/ScienceClaw | 757 | ? | 2026-05-16 | 285-skill pack (sci) | DEFER vertical | NEW |
| Wax | 734 | ? | 2026-05-16 | swift-1-file RAG | DEFER macOS | ALREADY |
| 24kchengYe/MemoMind | 715 | ? | 2026-05-15 | local memory MCP | STUDY-NICHE | ALREADY-EXT (TR-I) |
| Shy2593666979/AgentChat | 715 | ? | 2026-05-16 | platform (CN) | DEFER | NEW |
| miscusi-peek/cheatengine-mcp-bridge | 691 | ? | 2026-05-16 | MCP RE/CTF | DEFER | NEW |
| existence-master/Sentient | 679 | ? | 2026-05-15 | personal AI | DEFER | NEW |
| GeminiLight/MindOS | 588 | ? | 2026-05-16 | human-AI mind-sync | WATCH | NEW |
| vestige | 531 | ? | 2026-05-16 | FSRS-6 spaced-rep | DEFER | ALREADY |

## Axis 2 — Rust LSP Niche (`topic:lsp stars:500..1500 language:Rust`)

8 repos · **8 net-new** (100% — niche layer not previously probed at this floor).

| Repo | Stars | License | Push | Verdict | STATUS |
|---|---:|---|---|---|---|
| **iwe-org/iwe** | **1,028** | ? | 2026-05-16 | **STUDY-PILOT** — LSP+MCP+PKM novel | NEW-P0 |
| tombi-toml/tombi | 928 | ? | 2026-05-16 | DEFER TOML | NEW |
| huggingface/llm-ls | 871 | Apache-2.0 | 2026-05-13 | DEFER — competes with CC | NEW |
| AJenbo/phpantom_lsp | 723 | ? | 2026-05-16 | DEFER PHP-vertical | NEW |
| ubugeeei/vize | 703 | ? | 2026-05-16 | DEFER Vue-vertical | NEW |
| kakoune-lsp/kakoune-lsp | 684 | ? | 2026-05-15 | DEFER editor | NEW |
| blahgeek/emacs-lsp-booster | 666 | ? | 2026-05-13 | DEFER editor | NEW |
| tekumara/typos-lsp | 545 | ? | 2026-05-14 | WATCH spell-checker | NEW |

## Axis 3 — MCP Server Niche (`topic:model-context-protocol stars:500..1000 pushed:>2025-10-01`)

15 repos · 12 net-new strict.

| Repo | Stars | License | Push | Verdict | STATUS |
|---|---:|---|---|---|---|
| irinabuht12-oss/google-meta-ads-ga4-mcp | 987 | ? | 2026-05-15 | DEFER vertical | ALREADY-EXT |
| **SecretiveShell/MCP-Bridge** | **925** | ? | 2026-05-09 | **STUDY-PILOT** — openAI-compat MCP bridge | NEW-P0 |
| SamurAIGPT/awesome-openclaw | 916 | n/a | 2026-05-16 | DEFER different-ecosystem | NEW |
| suekou/mcp-notion-server | 892 | ? | 2026-05-15 | INSTALL-CAND if Notion | ALREADY-EXT |
| **ArcadeAI/arcade-mcp** | **892** | ? | 2026-05-15 | **STUDY-PILOT** — fastmcp analog | NEW |
| SoftInstigate/restheart | 875 | AGPL-3.0 | 2026-05-11 | DEFER AGPL | ALREADY (PART1) |
| bgauryy/octocode-mcp | 832 | MIT | 2026-05-16 | STUDY-PILOT | ALREADY (PART4) |
| zaidmukaddam/scira-mcp-chat | 831 | ? | 2026-05-11 | DEFER | NEW |
| **MinishLab/semble** | **823** | ? | 2026-05-16 | **STUDY-PILOT** — ~98% fewer tokens vs grep | ALREADY-EXT (TR-I) |
| **alexander-zuev/supabase-mcp-server** | **821** | ? | 2026-05-14 | INSTALL-CAND if Supabase | NEW-P1 |
| jacksteamdev/obsidian-mcp-tools | 811 | ? | 2026-05-16 ARCHIVED | DEFER — ARCHIVED | NEW |
| **context-space/context-space** | **809** | ? | 2026-04-30 | **STUDY-PILOT** — context-eng infra Go | NEW-P0 |
| **vllora/vllora** | **803** | ? | 2026-05-15 | **STUDY-PILOT** — agent debugger Rust | NEW-P1 |
| iFurySt/open-codex-computer-use | 801 | ? | 2026-05-16 | DEFER codex-target | NEW |
| **dadbodgeoff/drift** | **781** | ? | 2026-05-15 | **STUDY-PILOT** — pattern-detection MCP novel surface | NEW-P1 |

## Axis 4 — Claude-code Skills Niche

15 repos · 12 net-new strict.

| Repo | Stars | License | Push | Verdict | STATUS |
|---|---:|---|---|---|---|
| conorbronsdon/avoid-ai-writing | 1,478 | MIT | 2026-05-16 | WATCH | ALREADY (PART3) |
| **xingkongliang/skills-manager** | **1,461** | ? | 2026-05-16 | WATCH — desktop UI tier | NEW |
| delibae/claude-prism | 1,443 | ? | 2026-05-16 | DEFER vertical | NEW |
| tradermonty/claude-trading-skills | 1,442 | ? | 2026-05-16 | DEFER vertical | NEW |
| ciembor/agent-rules-books | 1,401 | ? | 2026-05-16 | INSTALL-CAND-P2 | ALREADY (PART3) |
| **CloudAI-X/claude-workflow-v2** | **1,357** | ? | 2026-05-16 | **STUDY-PILOT** — full CC plugin | NEW-P0 |
| Shpigford/chops | 1,339 | ? | 2026-05-16 | WATCH macOS | NEW |
| **OpenCoworkAI/open-cowork** | **1,336** | ? | 2026-05-16 | **STUDY-PILOT** — install-UX | NEW-P0 |
| wuji-labs/nopua | 1,302 | ? | 2026-05-15 | DEFER unverified | ALREADY-EXT |
| PrathamLearnsToCode/paper2code | 1,292 | ? | 2026-05-16 | STUDY-PILOT | ALREADY-EXT (TR-I) |
| zubair-trabzada/ai-legal-claude | 1,273 | ? | 2026-05-16 | DEFER legal-vertical | NEW |
| Eronred/aso-skills | 1,248 | ? | 2026-05-16 | DEFER vertical | NEW |
| **skills-directory/skill-codex** | **1,244** | ? | 2026-05-16 | **STUDY-PILOT** — direct codex-rescue analog | NEW-P0 |
| Prat011/awesome-llm-skills | 1,240 | NOASSERT | 2026-05-16 | DEFER | ALREADY (PART2) |
| **browser-act/skills** | **1,228** | ? | 2026-05-16 | **STUDY-PILOT** — chrome-devtools-mcp alt | NEW-P1 |

## Axis 5 — LLM-Testing Niche (SPARSE — only 1 result)

| Repo | Stars | License | Push | Verdict | STATUS |
|---|---:|---|---|---|---|
| PacificAI/langtest | 557 | ? | 2026-05-11 | WATCH | NEW |

## Axis 6 — Computer-Use Niche

10 repos · 10 net-new strict.

| Repo | Stars | License | Push | Verdict | STATUS |
|---|---:|---|---|---|---|
| **ghostwright/ghost-os** | **1,453** | ? | 2026-05-16 | **STUDY-PILOT** — self-learning computer-use | NEW-P0 |
| OpenCoworkAI/open-cowork | 1,336 | dup A4 | — | STUDY-PILOT | NEW |
| **jmerelnyc/Photo-agents** | **884** | ? | 2026-05-16 | **STUDY-PILOT** — vision-grounded memory + self-written skills | NEW-P0 |
| **microsoft/WindowsAgentArena** | **858** | ? | 2026-05-14 | **STUDY-PILOT** — Windows benchmark rare | NEW-P1 |
| iFurySt/open-codex-computer-use | 801 | dup A3 | — | DEFER | NEW |
| **cuga-project/cuga-agent** | **734** | ? | 2026-05-14 | **STUDY-PILOT** — enterprise + policy-aware | NEW-P1 |
| instavm/clickclickclick | 694 | ? | 2026-05-09 | WATCH android | NEW |
| suitedaces/computer-agent | 635 | ? | 2026-05-11 | WATCH Rust desktop | NEW |
| coasty-ai/open-computer-use | 584 | ? | 2026-05-16 | **STUDY-PILOT** — "82% OSWorld" verify R3 | NEW |
| **CelestoAI/SmolVM** | **543** | ? | 2026-05-15 | **STUDY-PILOT** — sandbox infra | NEW-P1 |

## Axis 7 — LLM-Evaluation Niche

7 repos · 5 net-new strict.

| Repo | Stars | License | Push | Verdict | STATUS |
|---|---:|---|---|---|---|
| cyberark/FuzzyAI | 1,410 | ? | 2026-05-16 | INSTALL | ALREADY-EXT (TR-H) |
| **microsoft/prompty** | **1,212** | ? | 2026-05-16 | **STUDY-PILOT** — MS-official prompt format | NEW-P0 |
| **cvs-health/uqlm** | **1,150** | ? | 2026-05-13 | **STUDY-PILOT** — UQ-grounded hallucination detection | NEW-P0 |
| **BlazeUp-AI/Observal** | **1,117** | ? | 2026-05-16 | **STUDY-PILOT** — HITL obs+eval platform | NEW-P1 |
| **JudgmentLabs/judgeval** | **1,035** | ? | 2026-05-16 | **STUDY-PILOT** — RL-grounded agent improvement | NEW-P0 |
| onejune2018/Awesome-LLM-Eval | 636 | n/a | 2026-05-11 | CITE | NEW |
| ValueByte-AI/Awesome-LLM-in-Social-Science | 621 | n/a | 2026-05-12 | DEFER vertical | NEW |

## Axis 8 — LLM-Cache Niche (SATURATED)

> **Axis 8: ZERO net-new** — `llm-cache` topic surface empty. Real caching inside larger frameworks (anthropic/litellm/vllm) or under different topic names (`prompt-cache`, `gptcache`) — already cataloged in `DEEP-SAT-FINAL-CACHE-PEER-CC-TEMPLATES`.

## Axis 9 — Multi-Account Niche (Axis 9 floor 200★)

4 repos · 4 net-new strict.

| Repo | Stars | License | Push | Verdict | STATUS |
|---|---:|---|---|---|---|
| **realiti4/claude-swap** | **372** | ? | 2026-05-16 | **STUDY-PILOT** — Python switch CC accounts | NEW-P0 |
| **webcoyote/sandvault** | **272** | ? | 2026-05-15 | **STUDY-PILOT** — macOS user-acct+sandbox-exec | NEW-P1 |
| guanxiaol/WindsurfPoolAPI | 218 | ? | 2026-05-16 | DEFER Windsurf-target | NEW |
| edwin-hao-ai/Awareness-Local | 217 | ? | 2026-05-08 | DEFER overlaps MemoMind | NEW |

## Axis 10 — Multi-Agent Coordination Niche

15 repos · 13 net-new strict.

| Repo | Stars | License | Push | Verdict | STATUS |
|---|---:|---|---|---|---|
| kyegomez/awesome-multi-agent-papers | 1,484 | n/a | 2026-05-16 | DEFER | ALREADY-EXT |
| **covibes/zeroshot** | **1,478** | ? | 2026-05-16 | **STUDY-PILOT** — autonomous-eng CC+codex+OpenCode+gemini orchestrator | NEW-P0 |
| **google-deepmind/concordia** | **1,425** | ? | 2026-05-16 | **STUDY-PILOT** — DeepMind generative social sim | NEW-P0 |
| DemonDamon/FinnewsHunter | 1,422 | ? | 2026-05-14 | DEFER finance | NEW |
| yohey-w/multi-agent-shogun | 1,267 | MIT | 2026-05-16 | STUDY-PILOT | ALREADY (PART4) |
| **SmythOS/sre** | **1,266** | ? | 2026-05-15 | **STUDY-PILOT** — agent runtime TS | NEW-P0 |
| Jenqyang/Awesome-AI-Agents | 1,122 | n/a | 2026-05-15 | CITE | NEW |
| **google/adk-js** | **1,118** | Apache-2.0 | 2026-05-16 | **STUDY-PILOT** — Official Google ADK TS port | NEW-P0 |
| dohooo/helmor | 1,085 | ? | 2026-05-16 | STUDY-PILOT | ALREADY-EXT |
| hanruihua/ir-sim | 1,075 | ? | 2026-05-14 | DEFER robotics | NEW |
| **nrslib/takt** | **1,053** | ? | 2026-05-16 | **STUDY-PILOT** — YAML agent-coord topology | NEW-P0 |
| Toni-SM/skrl | 1,049 | ? | 2026-05-15 | DEFER RL-vertical | NEW |
| **massgen/MassGen** | **1,015** | ? | 2026-05-16 | **STUDY-PILOT** — frontier-model orchestration | NEW-P0 |
| **repowise-dev/claude-code-prompts** | **1,010** | ? | 2026-05-16 | **STUDY-PILOT** — CC prompts reverse-eng | NEW-P0 |
| **modu-ai/moai-adk** | **1,010** | ? | 2026-05-16 | **STUDY-PILOT** — SPEC-First ADK (24 agents+52 skills+TDD/DDD+Go CLI) | NEW-P0 most-direct competitor |

---

## Summary

| Metric | Count |
|---|---:|
| Probes executed | 10/10 |
| Total repos surfaced | 88 |
| **Net-new ≥500★ strict** | **~64** |
| Saturated axes (0 net-new) | 1 (Axis 8 llm-cache) |
| Sparse axes (≤2 net-new) | 1 (Axis 5 llm-testing) |

### Top 5 STUDY-PILOT Promotions (cross-axis)

1. **modu-ai/moai-adk** (1,010★, Axis 10) — SPEC-First CC ADK most-direct competitor — full-stack 24 agents + 52 skills + TDD/DDD + Go CLI
2. **SecretiveShell/MCP-Bridge** (925★, Axis 3) — openAI-compat exposing MCP tools to non-MCP clients
3. **microsoft/prompty** (1,212★, Axis 7) — MS-official prompt asset format + observability
4. **iwe-org/iwe** (1,028★, Axis 2) — LSP + MCP markdown-PKM hybrid
5. **cvs-health/uqlm + JudgmentLabs/judgeval** (Axis 7 cluster) — UQ + RL-grounded eval

### Saturation Evidence

- **Only 1/10 axis fully saturated** at 500★ floor → **niche saturation NOT confirmed** below 1k★. Most axes still yield candidates.
- L0.2 memory MCP SATURATED >500★ (11/13 known)
- L0.8 llm-cache SATURATED at all floors  
- L4 llm-testing topic SPARSE (dying in favor of `llm-evaluation`)
- L0.4 LSP / L0.7 MCP / L2.6 skills / L6.0 multi-agent remain ACTIVE — third-pass 200-500★ recommended OR accept 500★ as practical installer floor

### 19 NEW-P0/P1 CANDIDATES surfaced

`iwe-org/iwe` (LSP+MCP+PKM) · `SecretiveShell/MCP-Bridge` · `ArcadeAI/arcade-mcp` · `MinishLab/semble` · `alexander-zuev/supabase-mcp-server` · `context-space/context-space` · `vllora/vllora` · `dadbodgeoff/drift` · `CloudAI-X/claude-workflow-v2` · `OpenCoworkAI/open-cowork` · `skills-directory/skill-codex` · `browser-act/skills` · `ghost-os` · `Photo-agents` · `WindowsAgentArena` · `cuga-agent` · `SmolVM` · `prompty` · `uqlm` · `judgeval` · `Observal` · `realiti4/claude-swap` · `sandvault` · `covibes/zeroshot` · `concordia` · `SmythOS/sre` · `google/adk-js` · `takt` · `MassGen` · `repowise/claude-code-prompts` · `modu-ai/moai-adk`

### Adversarial / Null-Result Findings

- **Axis 8 zero is a finding** — caching not surfacing as standalone topic. Runtime's current cache discipline is positioned correctly.
- **Axis 5 near-empty** — `llm-testing` dying in favor of `llm-evaluation`. Pivot probe phrasing.
- **Axis 6 coasty-ai/open-computer-use "82% OSWorld" claim** — flagged `[SELF-REPORTED]` until R3 verification.

### Honest Conclusion

**Hypothesis**: "Niche 500-1k★ band still yields meaningful SOTA candidates the >1k★ sweep missed."
**Verdict**: **CONFIRMED**. ~64 net-new strict candidates. 5 high-leverage STUDY-PILOT promotions. Only 1/10 axis saturated.

**No repos promoted to ADOPT.** All require R3 primary-source verification before adoption. This document is the surfacing artifact, not the adoption decision.
