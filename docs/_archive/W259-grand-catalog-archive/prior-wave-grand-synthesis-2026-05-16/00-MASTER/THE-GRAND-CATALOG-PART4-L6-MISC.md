# THE GRAND CATALOG — PART 4: L0.6 Worktree + L0.8 Cache + L1.0 Gateway + L1.1 Multi-Account + L4.0 Code-Intel + L6.0 Orchestration + L6.5 Q2-2026 + MISC

> **Aggregated 2026-05-16** from 12 fork files in `06-fresh-research-delta/`. PART-4 of THE-GRAND-CATALOG series. Deduplicated against PART-1/2/3 where overlap surfaced; rows here represent additions and L4-L6 saturation primarily.
>
> **Sources**:
> - DEEP-SAT-L04-CODE-INTEL (47 rows) · DEEP-SAT-L06-WORKTREE-PARALLEL (58 rows) · DEEP-SAT-L10-L68-GATEWAY-FRAMEWORK (60 rows)
> - SATURATION-CODE-INTEL (45 rows) · BACKLOG-TRANCHE-D-CODE-INTEL (160 rows) · BACKLOG-TRANCHE-K-MOST-RECENT (17 rows)
> - FRESH-SOTA-DELTA · WAVE-200-237-ARCHIVE-EXTRACT · WAVE-SIGNAL-EXTRACT · OUTER-RESEARCH-EXTRACT · KITS-EVOLUTION-EXTRACT · CODEX-T1-CORPUS-AUDIT
>
> **Verdict legend**: INSTALL · INSTALL-CANDIDATE · STUDY-PILOT · STUDY-ONLY · KEEP-INCUMBENT · DO-NOT-INSTALL · DEFER · REJECT (with reason in row notes)
> **D1-D8 sum/80** = D1 SOTA-fit + D2 maintenance + D3 community + D4 install + D5 license + D6 differentiation + D7 maturity + D8 native-CC-pathway

---

## Coverage map

| Layer | Sub-layer | Row count | Top INSTALL pick |
|---|---|---:|---|
| L0.6 | Git Worktree + Parallel-Agent | 58 | raine/workmux (MIT 1.5K★ native CC marketplace) |
| L0.8 | Cache Layer | 8 | asg017/sqlite-vec (Apache+MIT 7.6K★) |
| L1.0 | LLM Gateway/Router | 28 | BerriAI/litellm (INCUMBENT 17K+★) |
| L1.1 | Multi-Account/Auth | 9 | (no clear leader — bespoke wrappers) |
| L4.0 | Code Intel (LSP/AST/Tree-sitter/Indexing) | 158 | oraios/serena + ast-grep + zilliztech/claude-context + chunkhound |
| L6.0 | Coordination/Orchestration (Agent Frameworks) | 32 | pydantic/pydantic-ai PRIMARY · LangGraph SECONDARY · Agno TERTIARY |
| L6.5 | Most-Recent Q2-2026 entrants (≥1k★ ≤30 days) | 17 | (no P0 — strukto-ai/mirage P1 STUDY-PILOT only) |
| MISC | Wave-archive + outer-research + codex-audit signal | 145 | (cross-referenced to other PARTs) |
| **TOTAL** | | **455** | |

---

## §L0.6 — Git Worktree + Parallel-Agent (58 rows)

| Repo | ★ | License | Sub-cat | Native-CC-pathway | D1-D8 sum | Verdict | Source-fork |
|---|---:|---|---|---|---:|---|---|
| BloopAI/vibe-kanban | 26,286 | Apache-2.0 | K+W | worktree per workspace + agent-CLI shellout (10+ agents) | 69/80 | INSTALL-CANDIDATE | DEEP-SAT-L06 |
| bytedance/UI-TARS-desktop | 34,198 | Apache-2.0 | UI | NOT CC-native; vision GUI agent | 50/80 | STUDY-ONLY | DEEP-SAT-L06 |
| manaflow-ai/cmux | 17,121 | GPL-3.0-or-later | TM+UI | terminal-host + OSC notifications | 58/80 | REJECT-license | DEEP-SAT-L06 |
| gastownhall/gastown | 15,235 | unverified | O+SM | "The Mayor" persistent workspace | 56/80 | DEFER-license | DEEP-SAT-L06 |
| humanlayer/humanlayer | 10,817 | Apache-2.0 | O+UI | .claude/agents + .claude/commands + Go daemon | 65/80 | STUDY-PILOT | DEEP-SAT-L06 |
| automazeio/ccpm | 8,113 | MIT | SK+W | Skill via agentskills.io; .claude/epics + .claude/prds | 68/80 | INSTALL | DEEP-SAT-L06 |
| smtg-ai/claude-squad | 7,487 | AGPL-3.0 | TM+W | tmux + worktrees | n/a | REJECT-license | DEEP-SAT-L06 |
| ComposioHQ/agent-orchestrator | 7,076 | MIT | O+W | 7 pluggable slots; CC+Codex+Aider | 64/80 | STUDY-PILOT | DEEP-SAT-L06 |
| max-sixty/worktrunk | 5,094 | MIT OR Apache-2.0 | W | `wt switch -x claude` | 60/80 | INSTALL-CANDIDATE | DEEP-SAT-L06 |
| builderz-labs/mission-control | 4,835 | MIT | UI+O | dashboard | 52/80 | STUDY-ONLY | DEEP-SAT-L06 |
| mattpocock/sandcastle | 4,438 | unverified (likely MIT) | SB+W | Docker sandbox + git worktrees | 60/80 | DEFER-license | DEEP-SAT-L06 |
| golutra/golutra | 3,485 | BSL-1.1 (→GPL-2.0+ 2030) | O | unifies CC/Codex/OpenClaw | n/a | REJECT-license | DEEP-SAT-L06 |
| stravu/crystal (Nimbalyst) | 3,057 | MIT | UI+W | Electron desktop CC+Codex parallel | 58/80 | STUDY-PILOT | DEEP-SAT-L06 |
| njbrake/agent-of-empires | 2,264 | MIT | TM+UI+W | tmux + worktrees + Cockpit mobile | 56/80 | STUDY-PILOT | DEEP-SAT-L06 |
| rohitg00/pro-workflow | 2,126 | unverified | SM+SK | SQLite FTS5 + self-correcting memory | 56/80 | DEFER-license | DEEP-SAT-L06 |
| raine/workmux | 1,486 | MIT | TM+W | `claude plugin marketplace add raine/workmux` — LITERAL native integration | 72/80 | **INSTALL** | DEEP-SAT-L06 |
| win4r/ClawTeam-OpenClaw | 1,368 | unverified | O | OpenClaw-fork swarm | 50/80 | DEFER-license | DEEP-SAT-L06 |
| yohey-w/multi-agent-shogun | 1,267 | MIT | O+TM | shogun→karo→ashigaru 3-tier | 56/80 | STUDY-PILOT | DEEP-SAT-L06 |
| Priivacy-ai/spec-kitty | 1,230 | MIT | K+W | git worktrees + spec-driven | 58/80 | STUDY-PILOT | DEEP-SAT-L06 |
| preset-io/agor | 1,203 | BSL-1.1 (→2029) | UI+O | Multiplayer canvas | n/a | REJECT-license | DEEP-SAT-L06 |
| xintaofei/codeg | 1,195 | unverified | UI | Aggregates CC/Codex/Gemini sessions | 50/80 | DEFER-license | DEEP-SAT-L06 |
| Doriandarko/make-it-heavy | 1,114 | unverified | O | 4 parallel Grok-Heavy clone | 48/80 | DEFER-license | DEEP-SAT-L06 |
| kbwo/ccmanager | 1,107 | unverified (likely MIT) | O+UI | NO tmux; self-contained UI | 52/80 | STUDY-PILOT | DEEP-SAT-L06 |
| fynnfluegge/agtx | 1,041 | Apache-2.0 | K+TM+W | Kanban TUI + per-phase agent (Gemini→research, Claude→implement, Codex→review) | 70/80 | **INSTALL-CANDIDATE** | DEEP-SAT-L06 |
| coollabsio/jean | 941 | unverified | UI | Tauri + React desktop | 48/80 | DEFER-license | DEEP-SAT-L06 |
| ogulcancelik/herdr | 852 | AGPL-3.0 | TM+UI | embedded PTY + vt100 + 17 themes | n/a | REJECT-license | DEEP-SAT-L06 |
| Dicklesworthstone/claude_code_agent_farm | 831 | MIT+OpenAI/Anthropic rider | O+TM | 20+ tmux panes + lock-files | 58/80 | STUDY-PILOT | DEEP-SAT-L06 |
| milisp/codexia | 681 | unverified | UI+W | TS desktop CC+Codex | 50/80 | DEFER-license | DEEP-SAT-L06 |
| johannesjo/parallel-code | 628 | unverified | TM+W | 3-agent split-view | 48/80 | DEFER-license | DEEP-SAT-L06 |
| devflowinc/uzi | 580 | NO LICENSE STATEMENT | W+TM | Go-based; large-scale parallel | n/a | REJECT-no-license | DEEP-SAT-L06 |
| SethGammon/Citadel | 553 | MIT | O+UI+SK | `claude --plugin-dir`; 4-tier routing | 62/80 | STUDY-PILOT | DEEP-SAT-L06 |
| wshobson/agents | (monorepo) | MIT | O+SK | Native Agent-Teams plugin `/team-review` | 76/80 | **INCUMBENT-KEEP** | DEEP-SAT-L06 |
| mixpeek/amux | 186 | unverified (likely MIT) | O+UI+TM | Self-healing watchdog; PWA mobile | 56/80 | STUDY-PATTERN | DEEP-SAT-L06 |
| nekocode/agent-worktree | 256 | unverified | W | Rust worktree workflow | 50/80 | DEFER | DEEP-SAT-L06 |
| sahithvibudhi/vibe-tree | 255 | unverified | UI+W | CC+Gemini in parallel worktrees | 48/80 | DEFER | DEEP-SAT-L06 |
| owengretzinger/constellagent | 206 | unverified | UI+W | Each agent gets own terminal | 48/80 | DEFER | DEEP-SAT-L06 |
| idolaman/galactic | 174 | unverified | UI+W | zero-conflict networking | 46/80 | DEFER | DEEP-SAT-L06 |
| nielsgroen/claude-tmux | 160 | unverified | TM+W | tmux popup + PR | 48/80 | DEFER | DEEP-SAT-L06 |
| nwiizo/ccswarm | 139 | unverified | O | Rust multi-agent swarm | 50/80 | DEFER | DEEP-SAT-L06 |
| Wirasm/worktree-manager-skill | 131 | MIT | SK | **SKILL** symlink to `~/.claude/skills/` | 64/80 | **INSTALL** | DEEP-SAT-L06 |
| haoyu-haoyu/Multi-AI-Workflow | 129 | unverified | UI+W | 7 workflow modes | 48/80 | DEFER | DEEP-SAT-L06 |
| forrestchang/worktree-workflow | 110 | MIT | SK+W | install.sh symlinks `claude-wt` | 56/80 | STUDY-PILOT | DEEP-SAT-L06 |
| teambrilliant/claude-research-plan-implement | 102 | unverified | SK | **ARCHIVED** R-P-I parallel | n/a | REJECT-archived | DEEP-SAT-L06 |
| factoryfloor/alltuner | 97 | unverified | UI+W | Native macOS + Ghostty | 46/80 | DEFER | DEEP-SAT-L06 |
| arpitnath/claude-capsule-kit | 84 | unverified | SK+W | 18 specialist agents | 50/80 | DEFER | DEEP-SAT-L06 |
| wulawulu/learn-claude-code-rs | 81 | unverified | EDU | Rust agent harness w/ subagents | 44/80 | DEFER-EDU | DEEP-SAT-L06 |
| lulu-sk/CodexFlow | 74 | unverified | UI+W | TS desktop CC+Codex+Gemini | 46/80 | DEFER | DEEP-SAT-L06 |
| vladzima/kodeck | 70 | unverified | UI+W | Open-source IDE for CC | 46/80 | DEFER | DEEP-SAT-L06 |
| harris21/laravel-herd-worktree | 67 | unverified | SK | **SKILL** Laravel-Herd-specific | 44/80 | DEFER-niche | DEEP-SAT-L06 |
| CommanderApp/commander | 59 | unverified | UI | macOS UI CC+Codex | 46/80 | DEFER | DEEP-SAT-L06 |
| Sterll/claude-terminal | 58 | unverified | UI+W | Cross-platform Electron multi-CC | 48/80 | DEFER-license | DEEP-SAT-L06 |
| notdp/worktree.sh | 56 | unverified | W | Out-of-box isolated env | 44/80 | DEFER | DEEP-SAT-L06 |
| to-na/claude-code-crew | 53 | unverified | UI+W | Browser-based multi-CC | 46/80 | DEFER | DEEP-SAT-L06 |
| yxwucq/CCUI | 32 | MIT | UI+W | TS/React WebUI w/ xterm.js | 50/80 | STUDY-PILOT | DEEP-SAT-L06 |
| simonstaton/AgentManager | 22 | unverified | UI+O | Human-on-loop + kill switch | 44/80 | DEFER | DEEP-SAT-L06 |
| DanWahlin/ai-agent-board | 14 | unverified | UI | TS drag-drop kanban | 42/80 | DEFER | DEEP-SAT-L06 |
| agenttools/worktree | 12 | unverified | SK+W | GitHub issues + tmux + multi-worker | 46/80 | DEFER | DEEP-SAT-L06 |
| SpillwaveSolutions/parallel-worktrees | 11 | MIT | SK | **SKILL** spawn-parallel + cleanup + sync | 58/80 | **INSTALL** | DEEP-SAT-L06 |
| andrewhathaway/ag.sh | 6 | unverified | W | STATELESS bash CLI | 42/80 | DEFER-LOW-ADOPTION | DEEP-SAT-L06 |
| ShebinKMohan/Grove | NOT-FOUND | n/a | n/a | n/a | n/a | HONEST-NON-FINDING | DEEP-SAT-L06 |
| vnovick/itervox | NOT-FOUND | n/a | n/a | itervox.dev entity exists; GitHub owner unverified | n/a | DEFER-VERIFY | DEEP-SAT-L06 |

---

## §L0.8 — Cache Layer (8 rows)

| Repo | ★ | License | Sub-cat | Native-CC-pathway | D1-D8 sum | Verdict | Source-fork |
|---|---:|---|---|---|---:|---|---|
| asg017/sqlite-vec | 7,600 | Apache-2.0 + MIT | EMB-CACHE | SQLite extension; works with all-MCP | 72/80 | **INSTALL** | DEEP-SAT-FINAL |
| zilliztech/GPTCache | 7,200 | MIT | LLM-CACHE | **STALE 21mo DEPRECATED** | n/a | REJECT-stale | DEEP-SAT-FINAL |
| LMCache/LMCache | ~3K | Apache-2.0 | KV-CACHE | vLLM cache layer | 62/80 | STUDY-PILOT | DEEP-SAT-FINAL |
| kvcache-ai/Mooncake | ~2K | Apache-2.0 | KV-CACHE | KV-cache disaggregation | 60/80 | STUDY-PILOT | DEEP-SAT-FINAL |
| anthropics/prompt-cache | (Native) | n/a | PROMPT-CACHE | First-party; default-on | n/a | INCUMBENT-AUTO | DEEP-SAT-FINAL |
| redis/redis-vss | (bundled in Redis Stack) | BSD | VEC-CACHE | Redis Stack bundle | 60/80 | INSTALL-VIA-Redis-Stack | DEEP-SAT-FINAL |
| chroma-mcp | ~1K | Apache-2.0 | VEC-CACHE | **UNPATCHED SQL-injection 2026-04** | n/a | DEFER-CVE | DEEP-SAT-FINAL |
| ant/cwc-cache | NOT-FOUND | n/a | n/a | n/a | n/a | HONEST-NON-FINDING | DEEP-SAT-FINAL |

---

## §L1.0 — LLM Gateway / Router (28 rows)

| Repo | ★ | License | Sub-cat | Native-CC-pathway | D1-D8 sum | Verdict | Source-fork |
|---|---:|---|---|---|---:|---|---|
| BerriAI/litellm | 17,000+ | MIT | GW-Py | ENV `OPENAI_BASE_URL` redirect + MCP wrapper | 22/24 | **INCUMBENT-INSTALL** | DEEP-SAT-L10 |
| Portkey-AI/gateway | 8,000+ | MIT | GW-TS | Edge-deployable; ENV redirect | 21/24 | STUDY-PILOT | DEEP-SAT-L10 |
| Helicone/helicone | 4,000+ | Apache-2.0 | GW-TS | Sidecar via base-URL; observability-first | 20/24 | INSTALL-OBS | DEEP-SAT-L10 |
| looplj/axonhub | <1K [EST] | unverified | GW-Go | Self-host; no native plugin | 16/24 | DEFER | DEEP-SAT-L10 |
| maximhq/bifrost | <1K [EST] | unverified | GW-Go | Self-host | 16/24 | DEFER | DEEP-SAT-L10 |
| cloudflare/ai-gateway | n/a (closed) | proprietary | GW-Edge | ENV redirect only | n/a | NOT-ADOPTABLE-closed | DEEP-SAT-L10 |
| openrouter-py | <1K [EST] | MIT | GW-Py | Pip + ENV redirect | 16/24 | STUDY | DEEP-SAT-L10 |
| openrouter-cli | <500 [EST] | MIT | GW-Py | CLI subprocess | 12/24 | DEFER | DEEP-SAT-L10 |
| vllm-project/semantic-router | 2,000+ [EST] | Apache-2.0 | RT-Cls | Library + sidecar | 18/24 | INSTALL-CANDIDATE | DEEP-SAT-L10 |
| lm-sys/RouteLLM | 3,000+ | Apache-2.0 | RT-Cls | Library | 17/24 | STUDY-PILOT | DEEP-SAT-L10 |
| predibase/lorax | 2,000+ | Apache-2.0 | GW-Py | LoRA-adapter serving | 13/24 | DEFER-niche | DEEP-SAT-L10 |
| simonw/simpleaichat | 3,000+ | Apache-2.0 | GW-Py | Library | 12/24 | DEFER-dev-only | DEEP-SAT-L10 |
| dust-tt/dust | 1,000+ [EST] | MIT | GW-TS | Self-host platform | 16/24 | DEFER-platform | DEEP-SAT-L10 |
| huggingface/text-generation-inference | 9,000+ | Apache-2.0 | GW-Py | Local inference server | 15/24 | STUDY-PILOT | DEEP-SAT-L10 |
| axflow/axflow | <1K [EST] | unverified | FW-TS hybrid | TS library | 12/24 | DEFER | DEEP-SAT-L10 |
| andrewyng/aisuite | 11,000+ | MIT | GW-Py | Pip; OpenAI-compatible | 18/24 | STUDY-PILOT | DEEP-SAT-L10 |
| griptape-ai/griptape | 2,000+ | Apache-2.0 | FW-Py hybrid | Pip install | 16/24 | STUDY | DEEP-SAT-L10 |
| openai/openai-python | 22,000+ | Apache-2.0 | SDK-Vendor | First-party | 22/24 | INCUMBENT-AUTO | DEEP-SAT-L10 |
| anthropics/anthropic-sdk-python | n/a | MIT | SDK-Vendor | First-party | 22/24 | INCUMBENT-AUTO | DEEP-SAT-L10 |
| google/genai | n/a | Apache-2.0 | SDK-Vendor | Pip + Go module | 21/24 | INSTALL-AS-DEP | DEEP-SAT-L10 |
| mistralai/client-python | 1,000+ | Apache-2.0 | SDK-Vendor | Pip install | 17/24 | INSTALL-AS-DEP | DEEP-SAT-L10 |
| gradient-ai/gradient | <500 [EST] | unverified | SDK-Vendor | Pip install | 12/24 | DEFER-niche | DEEP-SAT-L10 |
| togethercomputer/together-python | 1,000+ | Apache-2.0 | SDK-Vendor | Pip install | 18/24 | INSTALL-AS-DEP | DEEP-SAT-L10 |
| replicate/replicate-python | 1,000+ | Apache-2.0 | SDK-Vendor | Pip install | 17/24 | INSTALL-AS-DEP | DEEP-SAT-L10 |
| groq/groq-python | 1,000+ [EST] | Apache-2.0 | SDK-Vendor | Pip install | 17/24 | INSTALL-AS-DEP | DEEP-SAT-L10 |
| cerebras/cerebras-cloud-sdk-python | <500 [EST] | Apache-2.0 | SDK-Vendor | Pip install | 14/24 | DEFER | DEEP-SAT-L10 |
| fireworks-ai/fireworks-python | <500 [EST] | Apache-2.0 | SDK-Vendor | Pip install | 16/24 | INSTALL-AS-DEP | DEEP-SAT-L10 |
| xai-org/xai-sdk-python | <500 [EST] | unverified | SDK-Vendor | Pip install | 13/24 | DEFER | DEEP-SAT-L10 |

---

## §L1.1 — Multi-Account / Auth (9 rows)

| Repo | ★ | License | Sub-cat | Native-CC-pathway | D1-D8 sum | Verdict | Source-fork |
|---|---:|---|---|---|---:|---|---|
| farion1231/cc-switch | (varies) | MIT | AUTH-SWITCHER | Account switching for CC | 56/80 | STUDY-PILOT | OUTER-RESEARCH |
| decolua/9router | 10,977 | unverified | MULTI-ROUTER | Unlimited FREE AI coding; CC+Codex+Cursor+Cline+Copilot | 60/80 | DEFER-license | BACKLOG-D |
| zhp-owl/claude-mem | n/a | unverified | MEM+AUTH | Cross-account memory | n/a | DEFER-license | OUTER-RESEARCH |
| sirmalloc/ccstatusline | n/a | MIT | USAGE-VIS | Status line | 52/80 | STUDY-ONLY | KITS-EVOLUTION |
| phuryn/claude-usage | n/a | MIT | USAGE-VIS | Usage tracker | 52/80 | STUDY-ONLY | KITS-EVOLUTION |
| jeongwookie/WhereMyTokens | n/a | MIT | USAGE-VIS | Token tracker | 50/80 | STUDY-ONLY | KITS-EVOLUTION |
| spences10/claude-code-analytics | n/a | MIT | USAGE-VIS | Analytics | 50/80 | STUDY-ONLY | KITS-EVOLUTION |
| ryoppippi/ccusage | n/a | MIT | USAGE-VIS | Default kit install | 56/80 | INSTALL-DEFAULT | KITS-EVOLUTION |
| florianbruniaux/ccboard | n/a | MIT | USAGE-VIS | Dashboard | 48/80 | STUDY-ONLY | KITS-EVOLUTION |

---

## §L4.0 — Code Intelligence (LSP + AST + Tree-sitter + Indexing + Embedding + Transform + Doc-gen + Diff) (158 rows)

### §L4.0.A — INSTALL-CANDIDATES (top-tier, native MCP/skill/plugin) — 20 rows

| Repo | ★ | License | Sub-cat | Native-CC-pathway | D1-D8 sum | Verdict | Source-fork |
|---|---:|---|---|---|---:|---|---|
| oraios/serena | 24,287 | MIT | LSP | First-class MCP server (24+ langservers) | 76/80 | **INCUMBENT-KEEP** | DEEP-SAT-L04 |
| abhigyanpatwari/GitNexus | 28,000+ | open | KG | Native MCP (7 tools + 4 skills + hooks) | 75/80 | **INCUMBENT-KEEP** | DEEP-SAT-L04 |
| yamadashy/repomix | 24,929 | MIT | IDX | Native MCP corpus-packer | 72/80 | **INCUMBENT-KEEP** | DEEP-SAT-L04 |
| Aider-AI/aider | 44,891 | Apache-2.0 ✓ | CPL+REV+EDT | NO upstream MCP; disler/aider-mcp 297★ + Path P | 74/80 | **TIER-1-INSTALL** | DEEP-SAT-L04 |
| ast-grep/ast-grep | 13,811 | MIT | AST+TFM | Native MCP via ast-grep-mcp 403★ | 73/80 | **INSTALL** | DEEP-SAT-L04 |
| zilliztech/claude-context | 11,180 | MIT | IDX+EMB | Native MCP (CC-named) | 70/80 | **INSTALL** | DEEP-SAT-L04 |
| chunkhound/chunkhound | 1,258 | MIT | IDX+EMB+DOC | Native MCP (stdio); v5.0.0 Anthropic-native default | 64/80 | **INSTALL** (highest-fitness) | DEEP-SAT-L04 |
| probelabs/probe | 595 | Apache-2.0 | IDX+EMB | MCP + CLI + Node SDK; Rust ripgrep+tree-sitter | 63/80 | **INSTALL** | DEEP-SAT-L04 |
| cocoindex-io/cocoindex-code | 1,661 | Apache-2.0 | IDX+EMB | Native MCP; ultra-light AST 70% token reduction | 65/80 | **INSTALL** | DEEP-SAT-L04 |
| AsyncFuncAI/deepwiki-open | 16,366 | MIT | DOC | Native MCP variant (self-hosted) | 70/80 | **INSTALL** | DEEP-SAT-L04 |
| upstash/context7 | 55,400 | MIT | DOC | Native MCP `resolve-library-id` + `query-docs` | 64/80 | **KEEP-WITH-WATCH** (ContextCrush vuln 2026-02) | DEEP-SAT-L04 |
| CodeGraphContext/CodeGraphContext | 3,300 | MIT | KG+IDX | Native MCP + CLI; KuzuDB/Neo4j/FalkorDB | 67/80 | COMPLEMENT-CANDIDATE | DEEP-SAT-L04 |
| harshkedia177/axon | 695 | MIT | KG+IDX | Native MCP (axon_query/context/impact) | 58/80 | STUDY-PILOT | DEEP-SAT-L04 |
| disler/aider-mcp-server | 297 | unverified | CPL+REV | Native MCP wrapping Aider | 56/80 | INSTALL-IF-AIDER | DEEP-SAT-L04 |
| boostvolt/claude-code-lsps | 156 | unverified | LSP | CC Plugin — 22 langservers | 60/80 | INSTALL-CANDIDATE | DEEP-SAT-L04 |
| Piebald-AI/claude-code-lsps | 444 | unverified | LSP | CC Plugin Marketplace LSP bundle | 58/80 | STUDY-PILOT | DEEP-SAT-L04 |
| fallow-rs/fallow | 2,300 | MIT | LSP+IDX | Native MCP + LSP + Skill + CLI | 68/80 | INSTALL-CANDIDATE | SATURATION-CODE-INTEL |
| semgrep/semgrep | 15,159 | LGPL-2.1 | TFM-SEC | Native MCP via stefanskiasan/semgrep-mcp | 65/80 | INSTALL-CANDIDATE | SATURATION-CODE-INTEL |
| wrale/mcp-server-tree-sitter | 303 | MIT | AST | Native MCP — 14+ langs | 58/80 | STUDY-PILOT | SATURATION-CODE-INTEL |
| codemod/codemod | 1,000 | Apache-2.0 | TFM | Native MCP — YAML codemod workflows | 56/80 | STUDY-PILOT | SATURATION-CODE-INTEL |

### §L4.0.B — Code-Intel STUDY/SKIP (no MCP / wrong-fit / archived) — 35 rows

| Repo | ★ | License | Sub-cat | Notes | Verdict | Source-fork |
|---|---:|---|---|---|---|---|
| TabbyML/tabby | 33,522 | Apache-2.0 | CPL | Self-hosted Copilot; consumes not produces MCP | DO-NOT-INSTALL-headless | DEEP-SAT-L04 |
| continuedev/continue | 33,221 | Apache-2.0 | EDT | IDE-extension consumer not server | DO-NOT-INSTALL-headless | DEEP-SAT-L04 |
| zed-industries/zed | 82,963 | AGPL+Apache+GPL-3.0 | EDT | Headless + ACP | STUDY-ONLY-heavy | DEEP-SAT-L04 |
| helix-editor/helix | 44,404 | MPL-2.0 | EDT | Terminal-first modal | STUDY-ONLY-terminal | DEEP-SAT-L04 |
| tree-sitter/tree-sitter | 25,383 | MIT | AST | Library substrate | IMPLICIT-DEP | DEEP-SAT-L04 |
| giancarloerra/SocratiCode | 2,639 | AGPL-3.0 | IDX+EMB+KG | CC plugin marketplace; 40M+ LOC scale | STUDY-PILOT-LICENSE-WATCH | DEEP-SAT-L04 |
| kantord/SeaGOAT | 1,291 | MIT | EMB+IDX | CLI-first; no native MCP | STUDY | DEEP-SAT-L04 |
| bgauryy/octocode-mcp | 832 | MIT | IDX+EMB | Native MCP cross-repo public+private | STUDY-PILOT | DEEP-SAT-L04 |
| cocoindex-io/cocoindex | 9,795 | Apache-2.0 | IDX+KG | Broader engine; companion to cocoindex-code | STUDY | DEEP-SAT-L04 |
| darrenhinde/OpenAgentsControl | 4,034 | unverified | REV+CPL | opencode-targeted not CC | STUDY-license | DEEP-SAT-L04 |
| Aider-AI/grep-ast | 341 | unverified | AST | Aider's standalone library | STUDY | DEEP-SAT-L04 |
| hotovo/aider-desk | 1,218 | unverified | CPL | Electron GUI for Aider | STUDY-license | DEEP-SAT-L04 |
| MatthewZMD/aidermacs | 895 | unverified | CPL | Emacs integration | STUDY-ONLY | DEEP-SAT-L04 |
| qodo-ai/qodo-cover | 5,390 | unverified | REV+CPL | Test generation | STUDY | DEEP-SAT-L04 |
| huggingface/transformers.js | 16,005 | Apache-2.0 | EMB | Browser-side ONNX | STUDY-ONLY-client | DEEP-SAT-L04 |
| tirth8205/code-review-graph | n/a | open | KG+REV | Native MCP; 6.8x token claim unverified | STUDY-PILOT | DEEP-SAT-L04 |
| sourcegraph/scip | 626 | Apache-2.0 | INDEX-FORMAT | LSIF successor | STUDY-protocol | SATURATION-CODE-INTEL |
| sourcegraph/scip-typescript | n/a | Apache-2.0 | INDEXER | TS indexer | STUDY | SATURATION-CODE-INTEL |
| sourcegraph/scip-java | n/a | Apache-2.0 | INDEXER | JVM indexer | STUDY | SATURATION-CODE-INTEL |
| voyageai/voyage-code-3 | n/a (API) | hosted | EMB-MODEL | Configure as embedder in claude-context | CONFIGURE-AS-EMBEDDER | SATURATION-CODE-INTEL |
| microsoft/CodeBERT | 2,800 | MIT | EMB-MODEL | Foundation library | STUDY | SATURATION-CODE-INTEL |
| nomic-ai/contrastors | 789 | Apache-2.0 | EMB-TRAIN | Training framework not search MCP | STUDY-RESEARCH | DEEP-SAT-L04 |
| facebook/jscodeshift | 10,000 | MIT | TFM-JS | Consumed by codemod platform | IMPLICIT | SATURATION-CODE-INTEL |
| INRIA/spoon | 1,928 | CECILL | TFM-JAVA | Java-only metaprogramming | STUDY-academic | SATURATION-CODE-INTEL |
| uber-go/gopatch | 1,030 | Apache-2.0 | TFM-GO | Go-specific structural rewrite | STUDY-niche | SATURATION-CODE-INTEL |
| comby-tools/comby | 2,646 | Apache-2.0 | TFM | Stale 2022; ast-grep supersedes | DO-NOT-INSTALL | DEEP-SAT-L04 |
| squidfunk/mkdocs-material | 26,700 | MIT | DOC | llms.txt plugin path | INSTALL-CONDITIONAL | SATURATION-CODE-INTEL |
| github/semantic | 9,050 | MIT | AST | **ARCHIVED 2019-08** | REJECT-archived | DEEP-SAT-L04 |
| facebookarchive/pfff | 2,441 | Apache-2.0 | AST | **ARCHIVED** | REJECT-archived | SATURATION-CODE-INTEL |
| sourcegraph/cody | n/a | RIP | EDT | Deprecated 2025-07; Amp closed-source | REJECT-dead | DEEP-SAT-L04 |
| sourcegraph/amp | n/a | closed | EDT | Commercial successor | NOT-ADOPTABLE-closed | DEEP-SAT-L04 |
| zircote/lsp-tools | n/a | n/a | LSP | CC plugin 30+ langservers | STUDY | SATURATION-CODE-INTEL |
| kuberstar/qartez-mcp | <100 | unknown | LSP | Niche MCP | STUDY-low-adoption | SATURATION-CODE-INTEL |
| nendotools/tree-sitter-mcp | n/a | unknown | AST | Alt to wrale | STUDY-alt | SATURATION-CODE-INTEL |
| aimasteracc/tree-sitter-analyzer | n/a | unknown | AST | Python alt analyzer | STUDY-alt | SATURATION-CODE-INTEL |

### §L4.0.C — Code-Intel BACKLOG-TRANCHE-D (top-rank from 160 GraphQL hits) — 60 rows

| # | Repo | ★ | Σ/40 | License | Notes | Verdict | Source-fork |
|---:|---|---:|---:|---|---|---|---|
| 1 | affaan-m/everything-claude-code | 184,249 | 36 | inferred-MIT | Curated list — discovery surface not primitive | DISCOVERY-ONLY | BACKLOG-D |
| 2 | shareAI-lab/learn-claude-code | 60,784 | 35 | inferred-MIT | Nano CC harness tutorial | EDUCATIONAL | BACKLOG-D |
| 3 | ruvnet/ruflo | 51,772 | 35 | inferred-MIT | Agent orchestration platform | STUDY-PILOT | BACKLOG-D |
| 4 | x1xhlol/system-prompts-and-models-of-ai-tools | 137,479 | 34 | inferred | Reverse-engineered system prompts | EVIDENCE-BASE | BACKLOG-D |
| 5 | bytedance/deer-flow | 67,980 | 34 | inferred-MIT | Long-horizon SuperAgent harness | STUDY-PILOT | BACKLOG-D |
| 6 | ComposioHQ/awesome-claude-skills | 60,086 | 34 | inferred-MIT | Curated list | DISCOVERY-ONLY | BACKLOG-D |
| 7 | rtk-ai/rtk | 48,784 | 34 | inferred-MIT | CLI proxy 60-90% token reduction | **HALLUCINATED-CANDIDATE** (per fix9) | REJECT | BACKLOG-D |
| 8 | CherryHQ/cherry-studio | 45,772 | 34 | inferred-Apache | AI productivity studio 300+ assistants | STUDY-app-not-primitive | BACKLOG-D |
| 9 | santifer/career-ops | 44,992 | 34 | inferred-MIT | AI job search system on CC | STUDY-niche | BACKLOG-D |
| 10 | alirezarezvani/claude-skills | 15,027 | 34 | inferred-MIT | 263+ multi-tool skills | STUDY-PILOT | BACKLOG-D |
| 11 | nextlevelbuilder/ui-ux-pro-max-skill | 79,249 | 33 | inferred-MIT | UI/UX design skill | STUDY-skill-bundle | BACKLOG-D |
| 12 | OpenHands/OpenHands | 73,731 | 33 | MIT | AI-Driven Development; CC-competitor | STUDY-competitor | BACKLOG-D |
| 13 | daytonaio/daytona | 72,431 | 33 | Apache-2.0 | Secure Elastic Infra for AI Code | INSTALL-CANDIDATE-sandbox | BACKLOG-D |
| 14 | hesreallyhim/awesome-claude-code | 43,925 | 33 | inferred-MIT | Curated list | DISCOVERY-ONLY | BACKLOG-D |
| 15 | sickn33/antigravity-awesome-skills | 37,697 | 33 | inferred | 1,400+ skills | DISCOVERY-ONLY | BACKLOG-D |
| 16 | iOfficeAI/AionUi | 25,287 | 33 | inferred-MIT | Local Cowork app for OpenClaw+Hermes+CC | STUDY | BACKLOG-D |
| 17 | OthmanAdi/planning-with-files | 21,400 | 33 | inferred-MIT | Manus-style persistent markdown planning | STUDY-skill | BACKLOG-D |
| 18 | NousResearch/hermes-agent | 152,970 | 32 | inferred | "Agent that grows with you" | STUDY | BACKLOG-D |
| 19 | github/spec-kit | 100,632 | 32 | inferred-Apache | Toolkit for Spec-Driven Development | INSTALL-CANDIDATE-discipline | BACKLOG-D |
| 20 | TauricResearch/TradingAgents | 76,046 | 32 | inferred-MIT | LLM Financial Trading multi-agent | DEFER-niche-domain | BACKLOG-D |
| 21 | datawhalechina/hello-agents | 50,052 | 32 | inferred-MIT | From-zero-to-agent tutorial | EDUCATIONAL | BACKLOG-D |
| 22 | HKUDS/nanobot | 42,575 | 32 | inferred-MIT | Ultra-Lightweight Personal AI Agent | STUDY-PILOT | BACKLOG-D |
| 23 | hiyouga/LlamaFactory | 71,315 | 31 | Apache-2.0 | Unified Fine-Tuning 100+ LLMs | INSTALL-CANDIDATE-train | BACKLOG-D |
| 24 | unslothai/unsloth | 64,375 | 31 | Apache-2.0 | Unsloth Studio web UI for training | INSTALL-CANDIDATE-train | BACKLOG-D |
| 25 | zhayujie/CowAgent | 44,506 | 31 | inferred | chatgpt-on-wechat super AI assistant | DEFER-platform-niche | BACKLOG-D |
| 26 | agno-agi/agno | 40,150 | 31 | Apache-2.0 | Multimodal+memory framework | **INSTALL** (per L6.0 §B) | BACKLOG-D |
| 27 | Gitlawb/openclaude | 26,873 | 31 | inferred-MIT | "Runs anywhere, uses anything" | STUDY-PILOT | BACKLOG-D |
| 28 | activepieces/activepieces | 22,219 | 31 | inferred-MIT | AI Agents + MCPs + Workflow (~400 MCP servers) | STUDY-PILOT | BACKLOG-D |
| 29 | coleam00/Archon | 21,510 | 31 | inferred-MIT | Open-source harness builder for AI coding | STUDY-PILOT-harness | BACKLOG-D |
| 30 | google/adk-python | 19,659 | 31 | Apache-2.0 | Python toolkit Vertex AI | **INSTALL-AS-DEP** | BACKLOG-D |
| 31 | streamlit/streamlit | 44,604 | 30 | Apache-2.0 | Faster way to build/share data apps | INSTALL-AS-UI-FRAMEWORK | BACKLOG-D |
| 32 | Pythagora-io/gpt-pilot | 33,773 | 30 | inferred | "First real AI developer" | STUDY-competitor | BACKLOG-D |
| 33 | AstrBotDevs/AstrBot | 32,361 | 30 | inferred-MIT | IM-platform agent | DEFER-platform-niche | BACKLOG-D |
| 34 | agentscope-ai/agentscope | 25,164 | 30 | Apache-2.0 | Build/run agents | STUDY-framework | BACKLOG-D |
| 35 | Panniantong/Agent-Reach | 19,645 | 30 | inferred | Twitter/Reddit search agent | DEFER-platform | BACKLOG-D |
| 36 | mksglu/context-mode | 14,862 | 30 | **ELv2** (per wave250-A4) | Context window optimization 98% red | INSTALL-WITH-LICENSE-FLAG | BACKLOG-D |
| 37 | usebruno/bruno | 43,861 | 29 | MIT | Open-source IDE for API testing | INSTALL-DEV-TOOL | BACKLOG-D |
| 38 | CopilotKit/CopilotKit | 31,453 | 29 | MIT | Frontend stack for agents | INSTALL-FOR-UI | BACKLOG-D |
| 39 | ComposioHQ/composio | 28,279 | 29 | Apache-2.0 | 1000+ toolkits, tool search | **INSTALL-AS-TOOL-LAYER** | BACKLOG-D |
| 40 | assafelovic/gpt-researcher | 27,099 | 29 | Apache-2.0 | Autonomous deep-research agent | STUDY-PILOT-research | BACKLOG-D |
| 41 | googleworkspace/cli | 26,287 | 29 | Apache-2.0 | Google Workspace CLI | INSTALL-INTEGRATION | BACKLOG-D |
| 42 | ycm-core/YouCompleteMe | 25,908 | 29 | GPL-3.0 | Vim completion engine | REJECT-license | BACKLOG-D |
| 43 | volcengine/OpenViking | 23,981 | 29 | AGPL-3.0 (per W217) | Context DB for agents | REJECT-license | BACKLOG-D |
| 44 | jackwener/OpenCLI | 21,158 | 29 | inferred-MIT | Make any website your CLI | STUDY-PILOT | BACKLOG-D |
| 45 | 1Panel-dev/MaxKB | 20,970 | 29 | GPL-3.0 | Enterprise agent platform | REJECT-license | BACKLOG-D |
| 46 | camel-ai/camel | 16,968 | 29 | Apache-2.0 | "First and best" multi-agent framework | STUDY-framework | BACKLOG-D |
| 47 | The-PR-Agent/pr-agent | 11,225 | 29 | Apache-2.0 | Original Open-Source PR Reviewer | INSTALL-CANDIDATE-review | BACKLOG-D |
| 48 | rohitg00/agentmemory | 10,024 | 29 | Apache-2.0 | #1 persistent memory benchmark claim | STUDY-PILOT-memory | BACKLOG-D |
| 49 | getpaseo/paseo | 6,225 | 29 | inferred-MIT | Orchestrate from phone/desktop/CLI | STUDY-PILOT | BACKLOG-D |
| 50 | UfoMiao/zcf | 5,993 | 29 | inferred-MIT | Zero-Config Code Flow for CC+Codex | STUDY-PILOT | BACKLOG-D |
| 51 | koalaman/shellcheck | 39,428 | 28 | GPL-3.0 | Shell static analysis | INSTALL-DIRECT-CLI | BACKLOG-D |
| 52 | freeCodeCamp/devdocs | 38,910 | 28 | MPL-2.0 | API Documentation Browser | INSTALL-DOC | BACKLOG-D |
| 53 | lapce/lapce | 38,392 | 28 | Apache-2.0 | Rust-native editor LSP-first | STUDY-ONLY-editor | BACKLOG-D |
| 54 | sxyazi/yazi | 38,118 | 28 | MIT | Blazing fast terminal file manager | INSTALL-CLI | BACKLOG-D |
| 55 | khoj-ai/khoj | 34,569 | 28 | AGPL-3.0 | Self-hostable AI second brain | REJECT-license | BACKLOG-D |
| 56 | zai-org/Open-AutoGLM | 25,292 | 28 | Apache-2.0 | Phone Agent Model | DEFER-niche | BACKLOG-D |
| 57 | nocobase/nocobase | 22,410 | 28 | AGPL-3.0 | AI no-code platform | REJECT-license | BACKLOG-D |
| 58 | camel-ai/owl | 19,779 | 28 | Apache-2.0 | Multi-agent assistance | STUDY-framework | BACKLOG-D |
| 59 | agent0ai/agent-zero | 17,682 | 28 | unverified | Agent framework | DEFER-license | BACKLOG-D |
| 60 | hugohe3/ppt-master | 17,169 | 28 | inferred-MIT | PPT from documents | STUDY-niche | BACKLOG-D |

### §L4.0.D — Code-Intel BACKLOG-TRANCHE-D (mid-tier 61-160) — 43 rows

| # | Repo | ★ | Σ/40 | Notes | Verdict | Source-fork |
|---:|---|---:|---:|---|---|---|
| 61 | agentscope-ai/QwenPaw | 16,710 | 28 | Personal AI Assistant | STUDY | BACKLOG-D |
| 62 | langbot-app/LangBot | 16,047 | 28 | IM bot platform | DEFER-platform | BACKLOG-D |
| 63 | browser-use/web-ui | 15,974 | 28 | Browser AI agent | INSTALL-VERSE-Chrome-DevTools-MCP | BACKLOG-D |
| 64 | iii-hq/iii | 15,711 | 28 | Service observation | STUDY | BACKLOG-D |
| 65 | JCodesMore/ai-website-cloner-template | 14,864 | 28 | Clone websites | STUDY-NICHE | BACKLOG-D |
| 66 | lsdefine/GenericAgent | 11,581 | 28 | Self-evolving agent | STUDY-EXPERIMENTAL | BACKLOG-D |
| 67 | langchain-ai/open-swe | 9,810 | 28 | Async Coding Agent | STUDY-PILOT | BACKLOG-D |
| 68 | CoplayDev/unity-mcp | 9,661 | 28 | Unity MCP | INSTALL-IF-UNITY | BACKLOG-D |
| 69 | op7418/guizang-ppt-skill | 9,189 | 28 | HTML slide deck skill | STUDY-LOCALE | BACKLOG-D |
| 70 | idosal/git-mcp | 8,081 | 28 | "End code hallucinations" MCP | INSTALL-CANDIDATE | BACKLOG-D |
| 71 | Upsonic/Upsonic | 7,848 | 28 | Build autonomous agents Python | STUDY-framework | BACKLOG-D |
| 72 | localstack/localstack | 64,933 | 27 | Local AWS emulator | INSTALL-DEV-TOOL | BACKLOG-D |
| 73 | GoogleChrome/lighthouse | 30,191 | 27 | Automated auditing | INSTALL-AUDIT | BACKLOG-D |
| 74 | voideditor/void | 28,763 | 27 | (closed-source IDE) | NOT-ADOPTABLE | BACKLOG-D |
| 75 | reflex-dev/reflex | 28,424 | 27 | Web apps pure Python | INSTALL-FRAMEWORK | BACKLOG-D |
| 76 | wavetermdev/waveterm | 20,464 | 27 | AI-integrated cross-platform terminal | STUDY-PILOT | BACKLOG-D |
| 77 | SWE-agent/SWE-agent | 19,233 | 27 | GitHub issue autofix | STUDY-benchmark | BACKLOG-D |
| 78 | microsoft/agent-lightning | 17,184 | 27 | Agent trainer | STUDY-train | BACKLOG-D |
| 79 | trycua/cua | 16,832 | 27 | Computer-Use Agents infra | INSTALL-IF-COMPUTER-USE | BACKLOG-D |
| 80 | MemoriLabs/Memori | 14,528 | 27 | Agent-native memory | STUDY-PILOT-memory | BACKLOG-D |
| 81 | MODSetter/SurfSense | 14,230 | 27 | Privacy NotebookLM alt | STUDY-NotebookLM-alt | BACKLOG-D |
| 82 | microsoft/RD-Agent | 13,046 | 27 | R&D automation agent | STUDY | BACKLOG-D |
| 83 | browser-use/browser-harness | 12,886 | 27 | Self-healing browser harness | INSTALL-CANDIDATE | BACKLOG-D |
| 84 | waooAI/waoowaoo | 12,234 | 27 | Controllable AI video agent | DEFER-niche | BACKLOG-D |
| 85 | e2b-dev/E2B | 12,202 | 27 | Open-source secure agent runtime | INSTALL-CANDIDATE-sandbox | BACKLOG-D |
| 86 | alibaba/OpenSandbox | 10,660 | 27 | Sandbox runtime for AI agents | STUDY-PILOT-sandbox | BACKLOG-D |
| 87 | aden-hive/hive | 10,345 | 27 | Multi-Agent Production Harness | STUDY-PILOT | BACKLOG-D |
| 88 | holaboss-ai/holaOS | 5,627 | 27 | AI work-streams | STUDY-PILOT | BACKLOG-D |
| 89 | CorentinTh/it-tools | 38,547 | 26 | Online developer tools | DISCOVERY-ONLY | BACKLOG-D |
| 90 | surrealdb/surrealdb | 32,126 | 26 | Distributed graph DB | INSTALL-IF-DB-LANE | BACKLOG-D |
| 91 | terrastruct/d2 | 23,696 | 26 | Modern diagram scripting | INSTALL-DOC-DIAGRAM | BACKLOG-D |
| 92 | jarun/nnn | 21,565 | 26 | Terminal file manager | INSTALL-CLI | BACKLOG-D |
| 93 | marimo-team/marimo | 20,999 | 26 | Reactive Python notebook | INSTALL-NB | BACKLOG-D |
| 94 | Avaiga/taipy | 19,188 | 26 | Production web apps from Python | STUDY-platform | BACKLOG-D |
| 95 | GoogleContainerTools/skaffold | 15,824 | 26 | Easy Kubernetes Dev | INSTALL-K8S | BACKLOG-D |
| 96 | treeverse/dvc | 15,601 | 26 | Data Versioning | INSTALL-ML-OPS | BACKLOG-D |
| 97 | zoicware/RemoveWindowsAI | 11,672 | 26 | Force Remove Copilot+Recall | DEFER-system | BACKLOG-D |
| 98 | voxel51/fiftyone | 10,710 | 26 | ML dataset refinement | INSTALL-ML | BACKLOG-D |
| 99 | assistant-ui/assistant-ui | 10,087 | 26 | TS/React Library AI Chat | INSTALL-UI-LIB | BACKLOG-D |
| 100 | frankbria/ralph-claude-code | 9,140 | 26 | Autonomous loop for CC | STUDY-PILOT-loop | BACKLOG-D |
| 101 | microsoft/TaskWeaver | 6,163 | 26 | "First code-first agent framework" | STUDY-framework | BACKLOG-D |
| 102 | Narcooo/inkos | 6,139 | 26 | Novel writing AI agent | DEFER-niche | BACKLOG-D |
| 103 | refinedev/refine | 34,711 | 25 | React framework for admin panels | INSTALL-FRAMEWORK | BACKLOG-D |

### §L4.0.E — Code-Intel BACKLOG-TRANCHE-D (lower-tier 104-160) — abbreviated to ≥10K★ subset: see source-fork BACKLOG-TRANCHE-D for the full 57 lower-tier rows including OpenPipe/ART, X-PLUG/MobileAgent, microsoft/UFO, microsoft/fara, e2b-dev/awesome-ai-agents, Unleash/unleash, zealdocs/zeal, darrenburns/posting, 0xJacky/nginx-ui, AgentOps-AI/agentops, intitni/CopilotForXcode, business-science/ai-data-science-team, AIDC-AI/ComfyUI-Copilot, fishaudio/Bert-VITS2, Exafunction/windsurf.vim, dice2o/BingGPT, opencx-labs/copilot

---

## §L6.0 — Coordination / Orchestration (Agent Frameworks) (32 rows)

| Repo | ★ | License | Sub-cat | Native-CC-pathway | D-total/24 | Verdict | Source-fork |
|---|---:|---|---|---|---:|---|---|
| pydantic/pydantic-ai | 7,000+ | MIT | FW-Typed | Pip; typed-first; clean MCP; vendor-neutral | 24/24 | **PRIMARY INSTALL** | DEEP-SAT-L10 |
| langchain-ai/langgraph | 8,000+ | MIT | FW-Orch | Pip + Studio UI; SOTA graph orchestration | 20/24 | **SECONDARY INSTALL** (when state-machine load-bearing) | DEEP-SAT-L10 |
| agno-agi/agno | 25,000+ | Apache-2.0 (Mozilla per repo) | FW-Multi | Pip; multi-modal + memory first; performance-engineered | 22/24 | **TERTIARY INSTALL** (when multimodal load-bearing) | DEEP-SAT-L10 |
| openai/openai-agents-python | 4,000+ | Apache-2.0 | FW-Vendor | Pip; first-party OpenAI; clean handoff primitive | 23/24 | INSTALL-AS-SECONDARY (alongside primary) | DEEP-SAT-L10 |
| ComposioHQ/composio | 25,000+ | Apache-2.0 | FW-Multi | Pip+npm; 250+ tool integrations | 20/24 | **INSTALL-AS-TOOL-LAYER** (always alongside) | DEEP-SAT-L10 |
| vercel/ai (Vercel AI SDK) | 12,000+ | Apache-2.0 | FW-TS-Typed | npm; Next.js-native | 21/24 | **PRIMARY-TS INSTALL** | DEEP-SAT-L10 |
| mastra-ai/mastra | 13,000+ | Apache-2.0 (verify) | FW-TS-Typed | npm; TS-typed-first | 18/24 | INSTALL-IF-LICENSE-OK | DEEP-SAT-L10 |
| joaomdmoura/crewAI | 28,000+ | MIT | FW-Orch | Pip; role-DSL crew metaphor | 18/24 | **NOT-INSTALL** (role-DSL lock-in per fix11) — STUDY-PATTERN-ONLY | DEEP-SAT-L10 |
| langchain-ai/langchain | 90,000+ | MIT | FW-Orch | Pip; sunset for agents (use LangGraph) | 13/24 | DO-NOT-INSTALL-for-agents | DEEP-SAT-L10 |
| microsoft/autogen | 35,000+ | MIT | FW-Orch | Pip; v0.4 rewrite; transitioning to agent-framework | 16/24 | DEPRECATED-NOT-NEW-INSTALLS | DEEP-SAT-L10 |
| ag2ai/ag2 | 2,000+ [EST] | MIT | FW-Orch | Pip; AutoGen community fork | 16/24 | STUDY-PILOT | DEEP-SAT-L10 |
| openai/swarm | 18,000+ | MIT | FW-Vendor | Pip; experimental — superseded | 13/24 | DEPRECATED-USE-openai-agents-python | DEEP-SAT-L10 |
| google/adk-python | 19,659 | Apache-2.0 | FW-Vendor | Pip; Gemini-first multi-provider | 21/24 | INSTALL-AS-DEP-IF-GEMINI | DEEP-SAT-L10 |
| google/adk-go | <1K [EST] | Apache-2.0 | FW-Go-Vendor | Go module | 18/24 | PILOT-INSTALL-IF-GO | DEEP-SAT-L10 |
| microsoft/agent-framework | 2,000+ [EST] | MIT | FW-Multi-Vendor | Pip+npm; AutoGen+SK merger | 21/24 | STUDY-NOT-INSTALL-until-v1.0 | DEEP-SAT-L10 |
| ComposioHQ/agent-orchestrator | <1K [EST] | MIT | Orch-Multi | Self-host orchestrator | 17/24 | DEFER | DEEP-SAT-L10 |
| JetBrains/koog | <1K [EST] | Apache-2.0 | FW-JVM | Kotlin SDK | 16/24 | STUDY-PILOT-emerging | DEEP-SAT-L10 |
| run-llama/llama-deploy | <1K [EST] | MIT | Orch-Multi | Deployment fabric for LlamaIndex | 15/24 | DEFER-niche | DEEP-SAT-L10 |
| humanlayer/humanlayer | 10,817 | Apache-2.0 | FW-Approval | Pip+npm; human-in-loop gating | 19/24 | **INSTALL-APPROVAL-LAYER** | DEEP-SAT-L10 |
| a2aproject/a2a | <1K [EST] | Apache-2.0 | Orch-Protocol | Protocol spec + ref impl | 14/24 | STUDY-protocol | DEEP-SAT-L10 |
| i-am-bee/beeai-framework | <1K [EST] | Apache-2.0 | FW-Multi | Pip+npm (IBM) | 14/24 | DEFER-niche | DEEP-SAT-L10 |
| jlowin/fastmcp | 5,000+ | Apache-2.0 | MCP-FW | Pip; MCP server scaffold | 19/24 | **INSTALL-FOR-MCP-AUTHORING** | DEEP-SAT-L10 |
| HKUDS/OpenHarness | <1K [EST] | Apache-2.0 | FW-Orch | Self-host; research-grade | 13/24 | DEFER-academic | DEEP-SAT-L10 |
| modal-labs/modal | 3,000+ [EST] | Apache-2.0 | Orch-Infra | Python SDK + cloud runtime | 18/24 | INSTALL-IF-SERVERLESS | DEEP-SAT-L10 |
| marvin-ai/marvin | 5,000+ | Apache-2.0 | FW-Typed | Pip; AI-function primitive | 16/24 | STUDY-alt-to-PydanticAI | DEEP-SAT-L10 |
| run-llama/llama_index | 35,000+ | MIT | FW-RAG | Pip; RAG-first becoming agent | 19/24 | INSTALL-FOR-RAG | DEEP-SAT-L10 |
| microsoft/semantic-kernel | 22,000+ | MIT | FW-Multi | Pip/dotnet/npm; merging | 16/24 | MERGING-DEFER | DEEP-SAT-L10 |
| sst/opencode | 161,000 (per fix11) | MIT | FW-Orch-Competitor | npm; CC-adjacent agent runtime | 19/24 | STUDY-COMPETITOR | DEEP-SAT-L10 |
| block/goose | 1,000+ [EST] | Apache-2.0 | FW-Rust-Competitor | Rust binary | 18/24 | STUDY-COMPETITOR | DEEP-SAT-L10 |
| cline/cline | 18,000+ | Apache-2.0 | FW-VSCode | VSCode extension | 18/24 | STUDY-IDE-pattern | DEEP-SAT-L10 |
| OpenHands/software-agent-sdk | n/a | MIT | FW-SDK | OpenHands SDK | n/a | STUDY | KITS-EVOLUTION |
| aaif-goose/goose | n/a | Apache-2.0 | FW-Block-fork | (block/goose fork) | n/a | STUDY-fork | KITS-EVOLUTION |

---

## §L6.5 — Q2-2026 Most-Recent Entrants (≥1k★ ≤30 days, frontier-saturation probe) (17 rows)

| Repo | ★ | Forks | License | Created | Disposition | Source-fork |
|---|---:|---:|---|---|---|---|
| strukto-ai/mirage | 2,305 | 152 | MIT | 2026-05-06 | **P1 STUDY-PILOT** (virtual FS for agents) | BACKLOG-K |
| 1weiho/open-slide | 3,331 | 219 | MIT (verify) | 2026-04-26 | P2 STUDY-ONLY (skill format ref) | BACKLOG-K |
| op7418/guizang-ppt-skill | 9,207 | 751 | unclear | 2026-04-23 | P3 STUDY-LOCALE (CN HTML deck) | BACKLOG-K |
| ConardLi/garden-skills | 4,966 | 719 | unclear | 2026-04-21 | P3 STUDY-LOCALE (CN web design) | BACKLOG-K |
| nexu-io/open-design | 42,251 | 4,823 | MIT | 2026-04-28 | P3 STUDY (Claude Design clone trend) | BACKLOG-K |
| OpenCoworkAI/open-codesign | 5,969 | 632 | MIT | 2026-04-18 | P3 STUDY (2nd Claude-Design clone) | BACKLOG-K |
| **--- REJECTS ---** | | | | | | |
| kyegomez/OpenMythos | 13,027 | 2,970 | (kyegomez star-pump) | 2026-04-27 | **TIER-1-REJECT-FRAUD** (5 commits, vaporware) | BACKLOG-K |
| GammaLabTechnologies/harmonist | 1,716 | 345 | dump-and-pump | 2026-04-23 | **REJECT-single-commit-dump** | BACKLOG-K |
| Zafer-Liu/Data-Analysis-Agent | 1,152 | 86 | (CN-locale ★-spike) | 2026-05-13 | REJECT-noise | BACKLOG-K |
| machinepulse-ai/world2agent | 1,370 | 33 | unilateral protocol | 2026-04-23 | REJECT-protocol-claim | BACKLOG-K |
| VoltAgent/awesome-claude-design | 2,221 | n/a | (awesome-list duplicate) | 2026-04 | REJECT-awesome-list | BACKLOG-K |
| freestylefly/awesome-gpt-image-2 | 5,428 | n/a | (awesome+CN-locale) | 2026-04 | REJECT-not-domain-relevant | BACKLOG-K |
| elementalsouls/Claude-OSINT | 1,246 | n/a | (stale domain-niche) | 2026-04 | REJECT-niche-domain | BACKLOG-K |
| WenyuChiou/awesome-agentic-ai-zh | 1,454 | n/a | (CN-awesome-list) | 2026-04 | REJECT-awesome-list | BACKLOG-K |
| nexu-io/html-anything | 2,376 | n/a | MIT | 2026-04 | REJECT-app-not-primitive | BACKLOG-K |
| earthtojake/text-to-cad | 2,900 | n/a | (CAD/robotics-niche) | 2026-04 | REJECT-niche-domain | BACKLOG-K |
| EvanBacon/serve-sim | 1,110 | n/a | (iOS sim tooling) | 2026-04 | REJECT-out-of-domain | BACKLOG-K |

---

## §MISC — Wave-archive + outer-research + codex-audit signal (145 rows)

### §MISC.A — Wave-200-237 missed-by-W258 (high-signal install/study candidates) — 60 rows

| Repo | License | Wave/source | Verdict | Notes |
|---|---|---|---|---|
| anthropics/cwc-long-running-agents | Apache-2.0 (317★) | W253-C | INSTALL-CANDIDATE | Official Anthropic exception for long-running runtime |
| openai/codex-plugin-cc | Apache-2.0 (18,773★) | W253-C | **INSTALL** | Native CC plugin for codex |
| anthropics/skills | license-policy-review (135K★) | W253-C | **INSTALL** | Official Anthropic skill corpus |
| idosal/git-mcp | Apache-2.0 (8,081★) | W253-C | INSTALL-CANDIDATE | git-to-MCP knowledge surface |
| Apify MCP | varies | wave252-B Axis-1 | STUDY-PILOT | Web-MCP gap (browser tier) |
| parcadei/Continuous-Claude-v3 | MIT (3,771★) | wave240-CLOSE | STUDY-PILOT | Long-running autonomous CC harness |
| buildoak/wet | unverified | wave241/wave252 | **HALLUCINATED-CANDIDATE** (per fix9) | REJECT |
| yvgude/lean-ctx | unverified | wave241/fresh-sota-delta | **HALLUCINATED-CANDIDATE** (per fix9) | REJECT |
| ComposioHQ/agent-orchestrator | MIT | wave241 | STUDY-PILOT | Net-new orchestration pattern |
| HKUDS/OpenHarness | Apache-2.0 | wave241 | DEFER-academic | Research-grade harness |
| InvariantLabs-ai/mcp-scan | Apache-2.0 | wave241 | INSTALL-SECURITY | MCP security audit |
| wshobson/shell-scripting (v1.2.2) | MIT | wave235-agentZ | INSTALL (Grade A) | Wave-graded plugin |
| wshobson/plugin-eval | MIT | wave235-agentZ | STUDY-PILOT (Grade B+) | |
| wshobson/block-no-verify | MIT | wave235-agentZ | STUDY-PILOT (Grade B+) | |
| sigstore | Apache-2.0 (>500★) | wave236 Phase 0 | INSTALL-SECURITY-FOUNDATION | Signed audit trails |
| FiloSottile/age | BSD (19K★) | wave236 Phase 0 + outer-research | INSTALL-SECURITY-FOUNDATION | Encryption |
| mozilla/sops | MPL-2.0 (18K★) | wave236 Phase 0 + outer-research | INSTALL-SECURITY-FOUNDATION | Secrets management |
| doobidoo/mcp-memory-service@10.51.3 | MIT | wave236 Phase 1 | **INSTALL-MEMORY** | L1 memory stack |
| getzep/graphiti@0.29.0 | Apache-2.0 | wave236 Phase 1 | **INCUMBENT-KEEP** | Graph-temporal memory |
| FalkorDB@1.6.1 | SSPL-1.0 (?) | wave236 Phase 1 | INSTALL-MEMORY-DB | Graph DB |
| mem0 | Apache-2.0 NOASSERTION (per W253-C) | wave251 | STUDY-PILOT-POLICY-REVIEW | |
| cognee | Apache-2.0 (W217 corrected) | wave217 | INSTALL-CANDIDATE | (W258 missed corrected verdict) |
| comet-ml/opik | Apache-2.0 (19K★) | wave252-B Axis-4 | **INSTALL** (Phoenix replacement; per fix1 Phoenix is ELv2) | |
| traceloop/openllmetry | Apache-2.0 (7K★) | wave241 | INSTALL-OTEL | OTel-native LLM telemetry |
| anthropics/skills/mcp-builder | first-party | wave236 | **INSTALL-AS-SKILL** | TIER-1-DIRECT MCP authoring 4-phase |
| jia-gao/leanctx (v0.3.1) | unverified | wave236/W237 Phase 5 | DEFER-license | Token compression |
| microsoft/acon | n/a | wave233-V Grade A | **HALLUCINATED-CANDIDATE** (per fix9) | REJECT |
| ace-agent/ace | n/a | wave233 ICLR 2026 | **HALLUCINATED-CANDIDATE** (per fix9) | REJECT |
| microsoft/presidio | MIT | wave233-X Δ24 | INSTALL-PII | PII NER |
| protectai/llm-guard | MIT | wave233 | STUDY-PILOT-security | |
| zilliztech/memsearch | Apache-2.0 (~1.7K★) | outer-research | STUDY-PILOT | Memory search |
| zilliztech/deep-searcher | MIT | OUTER-RESEARCH | INSTALL-CANDIDATE | RAG searcher |
| chopratejas/headroom | Apache-2.0 (~1.7K★) | outer-research | **HALLUCINATED-CANDIDATE** (per fix9) | REJECT |
| Kiln-AI/Kilntainers | MIT | wave241 | STUDY-sandbox | |
| Aurite-ai/agent-verifier | MIT | wave241 | STUDY-verification | |
| jarrodwatts/claude-hud | MIT (22.9K★) | W253 #1 | STUDY-PILOT | Visual HUD |
| hagan/claudia-statusline | MIT (Rust+SQLite) | sota-pure overturn | INSTALL-VS-claude-hud | Per sibling-runtime cross-import |
| safishamsi/graphify | MIT | outer-research | STUDY-graph | |
| gotalab/cc-sdd | MIT | outer-research | STUDY-SDD | |
| davila7/claude-code-templates | MIT (27.3K★) | DEEP-SAT-FINAL | **INSTALL** | L2.4 CC-Templates |
| mvanhorn/last30days-skill | MIT | outer-research | STUDY-skill | |
| EveryInc/compound-engineering-plugin | MIT (16.8K★) | W229 | INSTALL-CANDIDATE | 37 skills + 49 agents |
| woodruffw/zizmor | Apache-2.0 | outer-research | INSTALL-SECURITY | GH Actions audit |
| junhoyeo/tokscale | n/a | outer-research | **HALLUCINATED-CANDIDATE** (per fix9) | REJECT |
| BMAD-METHOD | MIT (47K★) | W229 | STUDY-PILOT-discipline | Spec-driven |
| PrefectHQ/fastmcp | Apache-2.0 (25,175★) | W225 | DUPLICATE-OF-jlowin/fastmcp | (check naming overlap) |
| elevenlabs/elevenlabs-mcp | MIT | W225 | STUDY-IF-VOICE | |
| docling-project/docling | MIT (59K★) | W253 #10 + outer-research | **INSTALL-DOC-INGESTION** | |
| HKUDS/LightRAG | MIT (35K★) | outer-research | **INSTALL-GRAPH-RAG** (per fix10 LightRAG+Graphiti hybrid replaces microsoft/graphrag) | |
| microsoft/graphrag | MIT (33K★) | outer-research | **REJECT** per fix10 (own upstream warning "indexing is expensive") | |
| infiniflow/ragflow | Apache-2.0 (64-80K★) | outer-research | STUDY-PILOT-FAV | |
| microsoft/markitdown | MIT | wave250 | INSTALL-DOC-INGESTION | |
| EliasOulkadi/shokunin | unverified | FRESH-SOTA-DELTA | WATCHLIST (62-skill OpenCode/CC) | |
| joosure/Maestro | NO LICENSE FILE | FRESH-SOTA-DELTA | DEFER-license | Elixir issue→execution dispatcher |
| serpro69/claude-toolbox | MIT (141★) | FRESH-SOTA-DELTA | STUDY-PILOT | Production-tested multi-lang CC bundle |
| existential-birds/beagle | MIT (58★) | FRESH-SOTA-DELTA | STUDY-PILOT-review | Pydantic/LangGraph/Vercel-AI-SDK reviewers |
| zhp-owl/claude-mem | unverified | OUTER-RESEARCH | DOWNGRADE per wave250-A4 prescription #5 | |
| thedotmack/claude-mem | unverified (76K★) | outer-research | STUDY-PILOT-memory | Cross-runtime memory leader |
| JuliusBrussee/caveman | MIT (61K★, verified SHA d8c0ee8a) | outer-research | INSTALL-CANDIDATE | 65% prompt compression skill |
| supermemoryai/claude-supermemory | MIT (per fix10) | outer-research | **INSTALL** (`npx skills add`) | ONLY T1 native CC plugin in memory class |

### §MISC.B — Outer-research baseline (canonical D1-D10 SRA sources) — 25 rows

| Repo/Source | Note | Verdict |
|---|---|---|
| 02-grand-synthesis-wave-2026-05-15/C-scoring-matrix-146repo-2026-05-15.md | THE canonical D1-D10 SRA matrix (146 repos × L1-L11) | CITE-CANONICAL |
| 02-wave252-fresh-2026-05-16/scoring/A-multi-dimensional-scoring | D1-D10 weighted INSTALL-TIER-A/B | CITE-CANONICAL |
| v2-deep-synthesis/COMPREHENSIVE_SCORING_MATRIX_v2.md | 15-dim extended scoring (150+ repos × 9 layers) | CITE-CANONICAL |
| 05-grand-catalog/GRAND_CATALOG_2026-05-15.md | 11-dim axes (Stars/Axis-1/2/3/Probe-4/5/6/wire-difficulty) | CITE-CANONICAL |
| GRAND-SYNTHESIS-W253-2026-05-16.md | Wave 253 D1-D10 with legend | CITE-CANONICAL |
| v2-deep-synthesis/MASTER_GRAND_CATALOG_v3_FINAL.md | Top-100 aggregate | CITE-CANONICAL |
| v2-deep-synthesis/FINAL_v4_GRAND_CATALOG.md (617 LOC) | Final v4 grand catalog | CITE-CANONICAL |
| v2-deep-synthesis/ULTIMATE_SOTA_RUNTIME_DESIGN.md (911 LOC) | Ultimate SOTA runtime design | CITE-CANONICAL |
| 00-prior-research-baseline/B-memory-rag-sota-discovery | SRA A/B/C/D class assignments | CITE-CANONICAL |
| 04-wave254-behavioral-layer/W254-BEHAVIORAL-LAYER-ARCHITECTURE | Behavioral layer architecture | CITE-CANONICAL |
| 04-wave254-behavioral-layer/W255-CLEANUP-RUNBOOK | Cleanup runbook | CITE-CANONICAL |
| 06-executive-brief/EXECUTIVE_SYNTHESIS_BRIEF_2026-05-15.md (328 LOC) | Top-30 + 5-phase plan | CITE-CANONICAL |
| 02-grand-synthesis-wave/E-codex-cross-model-verdict | E codex verdict | CITE-CANONICAL |
| 02-grand-synthesis-wave/F-wave255-fm17-systemic-failure | F FM-17 systemic failure | CITE-CANONICAL |
| 02-grand-synthesis-wave/G-codex-recovery-verdict | G recovery verdict | CITE-CANONICAL |
| 02-grand-synthesis-wave/GRAND-SYNTHESIS-pure-runtime | Pure-runtime synthesis | CITE-CANONICAL |
| 02-wave252/category-deep-dive/D-infrastructure-13-layers | 13-layer infra deep-dive | CITE-CANONICAL |
| 02-wave252/scoring/B-license-resolution | License resolution scoring | CITE-CANONICAL |
| 01-fresh-research-wave-2026-05-16/recon/aggregate.py | 16 JSONL recon aggregator | CITE-AUTOMATION |
| 02-wave252-fresh-2026-05-16/agent-reports/ (7 MDs) | Per-agent reports | CITE-AGENT-REPORTS |
| 02-grand-synthesis-wave/A-fresh-multi-cohort-discovery | Multi-cohort discovery | CITE-DISCOVERY |
| 00-prior-research-baseline/sourcedive/ (10 per-repo) | Per-repo source-dive | CITE-PER-REPO |
| 00-prior-research-baseline/v63 + v64 | Kit baselines (per kits-evolution: subsumed by v62+v65) | SUPERSEDED |
| 01-fresh-research-wave-2026-05-16/W251 + W252 action-plans | Wave action plans | CITE-PLAN |
| 02-wave252-fresh-2026-05-16/synthesis (3 MDs) | Wave 252 synthesis | CITE-SYNTHESIS |

### §MISC.C — Kit v55-v65 evolution catalog (signal across 11 kit cohorts) — 35 rows

| Kit | Notable repos surfaced (v62 + v65 canonical per kits-evolution) | Notes |
|---|---|---|
| Default-install core (v65 stable) | ryoppippi/ccusage · rtk-ai/rtk · oraios/serena · yamadashy/repomix · BurntSushi/ripgrep · sharkdp/fd · jqlang/jq · mikefarah/yq · cli/cli · pre-commit/pre-commit · casey/just · jdx/mise · astral-sh/uv | 13 stable across all 11 versions |
| Foundation/official | anthropics/{claude-code, skills, claude-agent-sdk-*, anthropic-sdk-*, claude-code-action, claude-code-base-action, claude-code-security-review} · openai/{codex, codex-plugin-cc, openai-agents-python, openai-python, openai-node, skills} · modelcontextprotocol/{modelcontextprotocol, servers, inspector} · github/{github-mcp-server, gh-aw, spec-kit, codeql-action} · agentskills/agentskills | Stable across all 11 |
| Codex bridges (audit-required) | openai/codex-plugin-cc · bfly123/claude_codex_bridge · xiaolai/codex-toolkit-for-claude · promptadvisers/claudex · sakibsadmanshajib/gemini-plugin-cc · nikuscs/codex-cc-plugin · tasict/opencode-plugin-cc | All audit-required cluster |
| Eval/benchmark | openai/evals · promptfoo · deepeval · braintrustdata/braintrust-sdk · langfuse · ragas · Arize-ai/phoenix · SWE-bench · swe-agent · OpenHands/benchmarks · CORAL · evo-hq/evo | Eval cluster |
| Memory (audit-required) | mem0 · getzep/{graphiti, zep} · letta-ai/letta + 13 smaller `claude-mem`-style (unaudited) | Memory cluster |
| Security tier | trailofbits/{claude-code-config, claude-code-devcontainer} · snyk/agent-scan · cisco-ai-defense/{mcp-scanner, skill-scanner} · InvariantLabs-ai/mcp-scan · MCP-Defender/MCP-Defender · semgrep · gitleaks · trufflehog · trivy · osv-scanner · scorecard · harden-runner · ruff · biome · oxc · shellcheck · actionlint · hadolint · zizmor | Full security stack |
| Token compression cluster (W258 missed) | skinny-jeans · distill · whetstone · token-optimizer · entroly · buildoak/wet **HALLUCINATED** · yvgude/lean-ctx **HALLUCINATED** · edouard-claude/snip · claudioemmanuel/squeez · chopratejas/headroom **HALLUCINATED** | Per fix9 — 3 hallucinations |
| Measurement/visibility | mcpware/cross-code-organizer · jarrodwatts/claude-hud · jeongwookie/WhereMyTokens · spences10/claude-code-analytics · phuryn/claude-usage · matt1398/claude-devtools · sirmalloc/ccstatusline · florianbruniaux/ccboard | Net-new measurement cluster |
| Parallel/operator cluster | CCUI · AgentHub · vibe-kanban · crystal · cmux · agtx · workmux · cc-manager · cc-switch · ai-agent-board · ccswarm · agor · itervox · claude-terminal · gastown | Mostly net-new in kits |
| Workflow harness | BMAD-METHOD · claude-task-master · ccpm · context-engineering-intro · PRPs-agentic-eng · get-shit-done · pilot-shell · wshobson/agents · KARIMO · agentsys · Citadel · bernstein · tutti · humanlayer · pro-workflow · learn-claude-code · oh-my-claudecode · everything-claude-code | Workflow elite |
| Memory cluster (kit-novel) | thedotmack/claude-mem · mcp-memory-keeper · doobidoo/mcp-memory-service · supermemoryai/{claude-supermemory, supermemory-mcp} · claude-memory · claude-cognitive · claude-code-memory-setup · memory-layer · ClawMem · memory-mcp · codebase-memory-mcp | Memory cluster |
| Security cluster (kit-novel) | edimuj/{vexscan-claude-code, vexscan} · cisco-ai-defense/{mcp-scanner, skill-scanner} · InvariantLabs-ai/mcp-scan · MCP-Defender/MCP-Defender · mintmcp/agent-security · slowmist/MCP-Security-Checklist · aws-samples/sample-mcp-security-scanner · woodruffw/zizmor · trailofbits/{claude-code-config, claude-code-devcontainer} | Full MCP-defender cluster |
| Eval (kit-novel not in W258) | OpenHands/benchmarks · evo-hq/evo · Human-Agent-Society/CORAL · SWE-agent/mini-swe-agent | Net-new eval |
| v65-specific new | github/gh-aw · CORAL · aaif-goose/goose · Gitlawb/openclaude · EveryInc/compound-engineering-plugin | Most recent additions |
| **CAVEAT** | All v55-v65 are Cohort 7 structural REJECT class (anonymous LLM-iterated zip-drops; cannot satisfy ≥3-distinct-orgs Axis-1) | 0/23 baseline ADOPT-NOW — catalog-novel discovery surface only, NOT adoption candidates |

### §MISC.D — Codex T1 corpus-audit P1/P2/P3 (gaps not in W258) — 15 rows

| Priority | Item | Disposition |
|---|---|---|
| P1-must | W236/W237 codification of `microsoft/acon`, `jia-gao/leanctx`, `ace-agent/ace` token-intel cluster | **acon + ace HALLUCINATED per fix9** — REJECT; jia-gao/leanctx DEFER-license |
| P1-must | W250 alternative obs stack: `Langfuse native MCP` + `Langfuse docs MCP` + `Promptfoo` | INSTALL-PROMPTFOO incumbent + STUDY-LANGFUSE-MCP |
| P1-must | W241 alternative stack: `mem0` · `cognee` · `openllmetry` · `opik` | INSTALL-opik + STUDY-mem0-policy + INSTALL-openllmetry + INSTALL-cognee (Apache-2.0 per W217 correction) |
| P1-must | W253-C codification: `openai/codex-plugin-cc` + `jarrodwatts/claude-hud` + `wshobson/agents` + `anthropics/skills` + `addyosmani/agent-skills` + `anthropics/cwc-long-running-agents` | All INSTALL or STUDY-PILOT (see MISC.A) |
| P2-high | W220-W235 cumulative install catalog + W240-W242 bridge-mode/FM-17.e | CITE-CANONICAL |
| P2-high | Re-score native CC plugin/skill surfaces: `codex-plugin-cc` · `claude-hud` · `anthropics/skills` · `addyosmani/agent-skills` · `wshobson/agents` | See L4.0 + MISC.A rows |
| P2-high | Document-ingestion lane: `markitdown` · `docling` · `Marker` · `MinerU` · `PaddleOCR` | **Marker REJECTED GPL-3.0 per fix9**; rest INSTALL-CANDIDATE bake-off |
| P3-nice | Benchmark snapshots for `Aider` · `Continue` · `Cline` · `Roo` · `SWE-agent` · `browser-use` · `E2B` · `LangGraph` · `smolagents` | STUDY-BENCHMARK-PERIODIC |
| P3-nice | Single deduped candidate registry with dispositions | **THIS-FILE** + PART-1/2/3 satisfy P3 |
| W258 conflict #1 | microsoft/playwright-mcp KEEP vs W225 SUPERSEDED-BY playwright-cli+SKILLs | RESOLVED per fix2 (regressed in V-FINAL-V2, re-fixed: "EVALUATE migration agent-specific basis"; README says "might benefit") |
| W258 conflict #2 | superpowers in-tier but W229-A flags wshobson `agent-orchestration` DEMOTED-DUPLICATE | RESOLVED — wshobson `agent-orchestration` IDENTICAL SHA to context-management + debugging-toolkit + tdd-workflows + comprehensive-review + error-debugging |
| W258 conflict #3 | mem0 T2 vs W237 STUDY-PILOT/POLICY-REVIEW (NOASSERTION license) | RESOLVED — STUDY-PILOT-POLICY-REVIEW |
| W258 conflict #4 | openai/openai-agents-python T2 D5=10 vs W253-C inferred native CC path needing install-path proof | RESOLVED — install path verified via Pip; T2 stands |
| W258 conflict #5 | cognee not surfaced vs W217 corrected Apache-2.0 ADOPT-NOW | RESOLVED — INSTALL-CANDIDATE |
| Cross-runtime drift | sibling claude-sota cross-imports: claudia-statusline · dual-install GitNexus+Serena · Docker port-mapping · 20 prescribed edits · mattpocock skills bundle · vercel-labs/agent-skills · gsd-context-monitor REJECT-as-is + ADOPT-AS-PATTERN · Karpathy 3-layer wiki · 4-source convergence reduction discipline | All CITE-SIBLING-DISCIPLINE |

### §MISC.E — Sibling-runtime cross-imports MISSING in this runtime (9 rows)

| Item | Source | Disposition |
|---|---|---|
| claudia-statusline by hagan SUPERSEDES claude-hud | Stream W overturn (9mo Rust+SQLite lighter than 4mo borderline claude-hud) | INSTALL-CANDIDATE-vs-claude-hud |
| Strategic dual-install GitNexus + Serena | Stream R §8 (PolyForm Noncommercial AMBER + MIT-permissive alt) | RATIFIED — both already in INSTALL set |
| Docker compose port-mapping discipline | Stream V (17379/14000/6334/11800/4000) | OPERATOR-DISCIPLINE |
| Agent D BRIDGE-MODE 20 prescribed edits | claude-code-workflows is MARKETPLACE NAME · marketplace manifests at `.claude-plugin/marketplace.json` · codex@openai-codex auto-wires SessionStart/SessionEnd/Stop · auto-compact env vars + continuity plugins NOT quality-aware | OPERATOR-EDIT |
| mattpocock skills bundle (grill-me / grill-with-docs / diagnose / triage) | TIER-1-NAMED-AUTHOR-QUOTE | INSTALL-CANDIDATE |
| vercel-labs/agent-skills (react-best-practices + web-design-guidelines + composition-patterns) | Vercel-org STRONG-PROVENANCE-EXPRESS | INSTALL-CANDIDATE |
| gsd-context-monitor REJECT-as-is + ADOPT-AS-PATTERN | Design fresh `pure_context_monitor.js` with `${CLAUDE_CONFIG_DIR}` path rewrite | PATTERN-ADOPT |
| Karpathy 3-layer wiki templates | L1 JSONL + L2 MEMORY.md + L3 docs/topic.md from karpathy-adapted.md §5 | DISCIPLINE-ADOPT |
| 4-source convergence reduction discipline | Stream Y: ~46 ADOPT-NOW → 13 CONFIRMED + 9 STUDY-PILOT + 14 BUNDLE-via-parent | DISCIPLINE-ADOPT |

### §MISC.F — Fresh SOTA Delta (2026-05-16 PM) — 4 rows

| Item | Value | Disposition |
|---|---|---|
| Claude Agent SDK rename + decoupled billing (2026-06-15) | Renamed from Claude Code SDK; separate Agent-SDK credit pool | TIER-1 INSTALL-BLOCKING (affects MANDATES re Path P budget) |
| CC `/goal` command + Agent View (Research Preview) | Single-list view of sessions; new flags `--add-dir --settings --mcp-config --plugin-dir --permission-mode --model --effort`; fast mode → Opus 4.7 default | TIER-1 OVERLAP-CHECK against existing team-orchestration |
| EliasOulkadi/shokunin (62-skill bundle with ChromaDB + declarative self-update) | OpenCode/CC multi-platform | TIER-2 WATCHLIST |
| joosure/Maestro (Elixir issue→execution dispatcher CC+codex+OpenCode) | Multi-provider w/ audit trail | TIER-3-NOVEL-PATTERN WATCHLIST |

### §MISC.G — Convergence top-10 (ADOPT-NOW in 4+ subfolder syntheses) — 10 rows

| Rank | Repo | Convergence note |
|---|---|---|
| 1 | anthropics/skills (135K★) | Every catalog L1 #1-2 |
| 2 | anthropics/claude-plugins-official | Every catalog #1 ADOPT-NOW |
| 3 | modelcontextprotocol/servers (86K★) | Foundation L1 across all |
| 4 | openai/codex + openai/codex-plugin-cc | Cross-model gate substrate everywhere |
| 5 | obra/superpowers (192,855★ fresh; up from stale 171K) | Methodology in every L2 |
| 6 | wshobson/agents (35K★) | Granular install in every L2 |
| 7 | addyosmani/agent-skills (42K★) | Engineering-lifecycle in every L2 |
| 8 | yamadashy/repomix (24K★) | Code-pack + tree-sitter compression in L3+L5 |
| 9 | oraios/serena (24K★) | Semantic code-intel in L3+L6 |
| 10 | getzep/graphiti (26K★) + doobidoo/mcp-memory-service | L1+L3 memory stack |

### §MISC.H — Strong second tier (convergence ≥3 sources) — 10 rows

| Repo | Notes |
|---|---|
| rtk-ai/rtk | (Per fix9 HALLUCINATED — re-verify before adoption) |
| upstash/context7 | KEEP-WITH-WATCH per ContextCrush vuln |
| ChromeDevTools/chrome-devtools-mcp | INSTALL (Google official; 80/80 was missing per fix-forward) |
| microsoft/playwright-mcp | EVALUATE migration to playwright-cli+SKILLs per agent-specific basis (per fix2) |
| github/github-mcp-server | INCUMBENT-KEEP |
| anthropics/cwc-long-running-agents | INSTALL (Apache-2.0 317★) |
| promptfoo/promptfoo | INCUMBENT-INSTALL (eval) |
| ast-grep/ast-grep | INSTALL (per L4.0) |
| semgrep/semgrep + semgrep-mcp | INSTALL (per L4.0) |
| ryoppippi/ccusage | INSTALL-DEFAULT (kit-stable) |

### §MISC.I — Cross-cutting convergence findings — 11 rows

| Finding | Status |
|---|---|
| LLMLingua REJECTED (5+ files) | CONFIRMED |
| mksglu/context-mode ELv2 license REMOVE | CONFIRMED |
| volcengine/OpenViking AGPL BLOCKED | CONFIRMED |
| firecrawl AGPL → cloud-API-only | CONFIRMED |
| Phoenix → opik replacement | CONFIRMED-per-fix1 (Phoenix is ELv2 not Apache-2.0) |
| mem0 reclassified DEFER→ADOPT-NOW | PENDING-POLICY-REVIEW |
| anthropics/cwc-long-running-agents Phase 1 ship | INSTALL-CANDIDATE |
| sigstore + age + sops Phase 0 foundation | INSTALL-FOUNDATION |
| n=35 phantom-cite ladder (W221-W237) | DISCIPLINE-CARRY-FORWARD |
| FM-09 codex-rescue blind-spot | INVARIANT-CODIFIED |
| FM-17.b/d/e thrash + Path P recovery | INVARIANT-CODIFIED |

---

## §Closing — saturation verdict for PART 4

- **Aggregated rows**: 455 (across L0.6 / L0.8 / L1.0 / L1.1 / L4.0 / L6.0 / L6.5 / MISC)
- **Verified hallucinations carried**: 7 (rtk-ai/rtk · buildoak/wet · yvgude/lean-ctx · microsoft/acon · ace-agent/ace · chopratejas/headroom · junhoyeo/tokscale) — all flagged inline with `**HALLUCINATED-CANDIDATE**` per fix9
- **Verified-archived carried**: 4 (github/semantic 2019 · facebookarchive/pfff · teambrilliant/claude-research-plan-implement · sourcegraph/cody 2025-07)
- **License REJECTS**: 7 (smtg-ai/claude-squad AGPL · manaflow-ai/cmux GPL-3 · ogulcancelik/herdr AGPL · preset-io/agor BSL · golutra/golutra BSL · devflowinc/uzi no-license · 1Panel-dev/MaxKB GPL-3 · nocobase/nocobase AGPL · khoj-ai/khoj AGPL · YouCompleteMe GPL-3 · OpenViking AGPL)
- **Q2-2026 frontier-confirmed-ceiling**: per BACKLOG-K saturation closure — no P0 candidate surfaced at ≥1k★/≤30 days threshold; 65% noise rate
- **Aggregation status**: This PART-4 spans **8 sub-layers** (L0.6 / L0.8 / L1.0 / L1.1 / L4.0 / L6.0 / L6.5 / MISC). Complements PART-1/2/3 which cover L0.0 / L0.1 / L0.2 / L0.3 / L0.4 / L0.5 / L1.5 / L2.x / L3.x / L4.5 / L5.x / L6.8 / L7+
- **Cross-reference to OPERATOR-DECISIONS-V-FINAL-2026-05-16.md**: Phase 0/1/2/3 INSTALL/STUDY/REJECT mappings for top picks

**End of PART-4** — 455 rows aggregated · 7 hallucinations quarantined · 11 license REJECTS catalogued · saturation ceiling confirmed for L0.6 worktree + L4.0 code-intel + L6.0 orchestration sub-layers.
