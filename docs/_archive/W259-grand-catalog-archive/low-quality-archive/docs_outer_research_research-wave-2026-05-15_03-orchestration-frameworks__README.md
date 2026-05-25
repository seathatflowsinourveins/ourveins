# Layer 3: Agent Orchestration Frameworks Deep-Dive

> See `../05-grand-catalog/GRAND_CATALOG_2026-05-15.md` Sections 6 + 4 (parallel UIs) + 10 (ACP) for full per-framework scoring.

## ADOPT-NOW picks (3 canonical)

1. **anthropics/cwc-long-running-agents** (93) — 5 canonical primitives:
   - Default-FAIL contract
   - Fresh-context evaluator (skill+subagent)
   - PROGRESS.md handoff
   - Kill-switch
   - Steer-mid-run

2. **anthropics/claude-plugins-official `plugins/ralph-loop`** (92) — canonical autonomous-loop primitive. Wins over all community ralph forks (michaelshimeles/ralphy 2.8k, alfredolopez80 134★).

3. **openai/codex CLI + codex-plugin-cc** (95+93) — cross-model T1-T7 gate substrate. Anthropic locks Claude orchestrates / Codex audits topology.

## STUDY-PILOT-FAVORABLE picks (10+)

### Python orchestration frameworks
- **langchain-ai/langgraph** (84) — state-graph orchestration; cite for SOTA pattern
- **langchain-ai/deepagents** (80) — sub-agent pattern; ACP convergence; cite for arg-truncation discipline
- **pydantic/pydantic-ai** (76) — typed-agent framework
- **openai/openai-agents-python** (~25k★ — 78) — Handoff + Tracing primitives
- **google/adk-python** (74) — Google Agent Dev Kit
- **microsoft/autogen** (76) — multi-agent debate pattern reference

### TypeScript orchestration
- **mastra-ai/mastra** (76) — event-sourced workflow with time-travel re-execution

### Multi-agent meta-frameworks
- **ComposioHQ/agent-orchestrator** (80) — DAG mission dispatch (macOS-focused)
- **nutthouse/tutti** — multi-agent worktree
- **fynnfluegge/agtx** (68) — multi-agent runner
- **ruvnet/ruflo** (52k★ — 82) — enterprise swarm orchestration

### Skills/agents with orchestration depth
- **wshobson/agents** Agent Teams plugin (Q2 2026 NEW) — 7 team presets (review/debug/feature/fullstack/research/security/migration)
- **wshobson/agents** Conductor plugin (Q2 2026 NEW) — Context-Driven Development workflow (verify HARD-GATE first)
- **obra/superpowers** subagent-driven-development + dispatching-parallel-agents skills

### Alt-runtime coding agents (out-of-CC primary scope)
- **aaif-goose/goose** (76) — Apache-2.0 standalone Rust desktop/CLI/API + ACP host
- **sst/opencode** (72) — alt coding agent
- **google-gemini/gemini-cli** (104k★ — 80) — alt-runtime for cross-harness skill testing
- **OpenHands/OpenHands** + software-agent-sdk (74) — alt agent SDK
- **NousResearch/hermes-agent** (152k★ — 78) — Nous Research alternative ecosystem
- **HKUDS/nanobot** (42k★ — 74) — HKU lab agent harness
- **code-yeongyu/oh-my-openagent** (58k★ — 82) — multi-agent TUI runtime (renamed from oh-my-opencode)
- **Yeachan-Heo/oh-my-claudecode** (34k★ — 74) — Teams-first multi-agent orchestration
- **aden-hive/hive** (10k★ — 74) — Multi-Agent Harness for production AI

### Parallel operator UIs
- **smtg-ai/claude-squad** (78) — tmux+worktree; **NOT supported on Windows-native** per FM-04
- **farion1231/cc-switch** (72k★ — 86) — Tauri/Rust cross-platform desktop all-in-one
- **yxwucq/CCUI**, **jamesrochabrun/AgentHub**, **BloopAI/vibe-kanban** — CC dashboards
- **iOfficeAI/AionUi** (25k★ — 78) — local-first cowork for 20+ CLIs
- **bytedance/UI-TARS-desktop** (34k★ — 78) — multimodal GUI agent
- **CherryHQ/cherry-studio** (46k★ — 82) — AI productivity studio
- **eigent-ai/eigent** (14k★ — 76) — Cowork local-first alternative

### Methodology / spec-driven
- **bmad-code-org/BMAD-METHOD** (78) — multi-day feature task graphs
- **eyaltoledano/claude-task-master** (75) — PRD-driven task master
- **automazeio/ccpm** (73) — PM workflow
- **Wirasm/PRPs-agentic-eng** (72) — PRP methodology
- **github/spec-kit** (78) — GitHub-official spec-driven dev
- **Fission-AI/OpenSpec** (74) — alt spec-driven

### ACP cross-runtime convergence (Wave 5 A10 fully-closed)
- **agentclientprotocol/python-sdk** (78) — Axis-1+2+3 PASS via 4-org convergence
- **agentclientprotocol/claude-agent-acp** (~1.7k — 78) — official ACP Claude adapter

### LLM routers
- **router-for-me/CLIProxyAPI** (33k★ — 82) — wraps Gemini/Codex/CC as OpenAI-compat API
- **musistudio/claude-code-router** (74) — LLM router

## DEFER (out-of-CC scope or duplicate)

- **microsoft/agent-framework** — Azure-centric production-deploy
- **agno-agi/agno** — service-deployment-centric
- **crewAIInc/crewAI** — CR-12 DUPLICATE-FUNCTIONALITY of cwc+claude-agent-sdk for CC scope
- **huggingface/smolagents** — CodeAgent paradigm doesn't fit CC tool-use shape

## Key insights

1. **Anthropic locks the topology**: Claude orchestrates / Codex audits. cwc-long-running-agents + claude-agent-sdk + ralph-loop are the native CC primitives.

2. **3-way methodology** (superpowers + wshobson + addy-osmani — Layer 2) overlaps with this Layer 3 via the orchestration skills inside each plugin. Together they cover serial + parallel + DAG orchestration.

3. **Python orchestration frameworks** (langgraph / deepagents / autogen / smolagents / crewai / agno) are mostly out-of-CC-scope for native install but valuable as pattern references for arg-truncation / handoff / sub-agent / event-sourcing disciplines.

4. **ACP convergence FULLY-CLOSED**: 4-org Axis-1 PASS (Anthropic + jj-vcs + OpenAI + Linux-Foundation/AAIF). ADOPT-NOW eligible via `agentclientprotocol/claude-agent-acp` adapter.

5. **Parallel operator UI choice is environment-dependent**:
   - Windows: cc-switch 4.9 (Tauri/Rust cross-platform)
   - macOS: claude-squad 4.1 (tmux+worktree) OR Composio AO 4.2 (DAG)
   - Cross-runtime: AionUi 4.11 (20+ CLIs supported)

See Grand Catalog Section 6 + 4 + 10 for full dimensional scoring.
