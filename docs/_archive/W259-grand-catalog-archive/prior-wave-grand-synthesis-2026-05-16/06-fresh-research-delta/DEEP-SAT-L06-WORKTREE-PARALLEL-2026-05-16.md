# DEEP-SAT L0.6 — Git-Worktree Parallel-Agent + L5.5 Multi-Agent Orchestration EXHAUSTIVE Coverage

**Fork**: DEEP-SATURATION — operator feedback "many layers under-covered; this is a force-multiplier" → expand L0.6 from passing-mention to full taxonomy.
**Date**: 2026-05-16 (today's date per env block).
**Audit scope**: 10 GraphQL queries (stars>50/100/500) + 25 name-searches + license verification + native-CC-pathway probe (worktree, subagent, skill, plugin, hook, MCP).
**Probe method**: `mcp__github__search_repositories` (rate-limited 2x → recovered) + WebSearch fallback + WebFetch README/LICENSE for top-30 rows.
**Cardinal-rule anchors**: Per `https://code.claude.com/docs/en/worktrees` (native worktree CLI flag `claude --worktree` + `isolation: worktree` subagent frontmatter ~mid-2026); per `https://code.claude.com/docs/en/sub-agents` (CLAUDE_CODE_FORK_SUBAGENT=1 fork-mode env, CLAUDE.local.md ENV (e) ALREADY ACTIVE); per `https://code.claude.com/docs/en/plugins` (plugin install + marketplace surface).
**Truth-telling discipline**: Per `Z:/claude-sota/.claude/rules/honest-non-findings.md` — all stars/license/topic figures pinned to probe-timestamp; v62-only items flagged explicitly.

---

## §A — Parallel-Agent Matrix (33 rows)

**Legend**:
- **Sub-category**: WORKTREE-RUNNER (W) | MULTI-AGENT-ORCHESTRATOR (O) | TERMINAL-MUX (TM) | AGENT-UI (UI) | STATE-MANAGER (SM) | KANBAN-STYLE (K) | SKILL-ONLY (SK) | SANDBOX-RUNNER (SB)
- **D1-D8**: D1 stars, D2 forks (proxy for fork-adoption), D3 recency (last updated), D4 install model, D5 license, D6 native-CC primitive used (worktree/subagent/skill/plugin/hook/MCP), D7 dispatch strategy, D8 differentiator
- **Native-CC-pathway**: how does it ride on top of CC, not replace it?

| # | Repo | D1 ★ | D2 forks | D3 updated | D4 install | D5 license | D6 CC primitive | D7 dispatch | D8 differentiator | Sub-cat |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | `BloopAI/vibe-kanban` | **26,286** | 2,743 | 2026-05-16 | Rust binary + web UI | Apache-2.0 | worktree per workspace + agent-CLI shellout | Kanban→worktree per task | 10+ agents (CC, Codex, Gemini, Copilot, Amp, Cursor, OpenCode, Droid, CCR, Qwen), inline review | K + W |
| 2 | `bytedance/UI-TARS-desktop` | **34,198** | 3,407 | 2026-05-16 | desktop app (Electron) | Apache-2.0 | NOT CC-native (browser/GUI-vision agent) | Multimodal MCP server | Remote computer/browser operators FREE | UI |
| 3 | `manaflow-ai/cmux` | **17,121** | 1,341 | 2026-05-16 | Swift native macOS app (Ghostty-based) | **GPL-3.0-or-later** (dual w/ commercial) | terminal-host for CC, OSC 9/99/777 notifications | Vertical tabs/panes per agent | Native macOS performance (no Electron); CLI `cmux notify` for agent hooks | TM + UI |
| 4 | `gastownhall/gastown` | **15,235** | 1,412 | 2026-05-16 | Go binary | (unverified — needs probe) | "The Mayor" = CC instance with workspace context; persistent hooks | Multi-agent CC/Copilot/Codex/Gemini orchestration | git-backed persistent work state across restarts | O + SM |
| 5 | `humanlayer/humanlayer` | **10,817** | 917 | 2026-05-16 | TS/Go SDK + Go daemon | Apache-2.0 | Manages CC sessions via Go daemon; .claude/agents + .claude/commands | Research→Plan→Implement→Validate 4-phase split + 6 commands + 6 agents | Human-in-loop approval primitives via SDK; CodeLayer IDE built on CC | O + UI |
| 6 | `automazeio/ccpm` | **8,113** | 827 | 2026-05-16 | Skill (symlinked to skills dir; agentskills.io standard) | MIT | worktrees, bash scripts, .claude/epics/ markdown state | parallel agents per issue (independent work streams) | GitHub Issues as single source of truth, Brainstorm→Document→Plan→Execute→Track 5-phase | SK + W |
| 7 | `smtg-ai/claude-squad` | **7,487** | 534 | 2026-05-16 | bash install.sh → `cs` binary | **AGPL-3.0** (REJECT per `Z:/claude-sota-installed/docs/grand-synthesis-2026-05-16/06-fresh-research-delta/BACKLOG-TRANCHE-J-LICENSE-DEEP-2026-05-16.md` license-discipline) | tmux sessions + git worktrees | Per-agent isolated workspace | Most popular open-source multi-agent TUI per CCBP-adjacent docs | TM + W |
| 8 | `ComposioHQ/agent-orchestrator` | **7,076** | 953 | 2026-05-16 | `npm install -g @aoagents/ao` | MIT | git worktrees + tmux + ConPTY (Windows); custom plugin slots (NOT MCP) | Per-issue agent, auto-routes CI failures + review comments | 7 pluggable slots (runtime/agent/workspace/tracker/SCM/notifier/terminal); supports CC + Codex + Aider | O + W |
| 9 | `max-sixty/worktrunk` | **5,094** | 179 | 2026-05-16 | Homebrew + Cargo + pacman + Conda + Winget | MIT OR Apache-2.0 | `wt switch -x claude -c feature-a` launches CC in worktrees | Single-command CC-in-worktree | LLM commit messages, CI status, AI summaries in list views | W |
| 10 | `builderz-labs/mission-control` | **4,835** | 841 | 2026-05-16 | Next.js self-hosted | MIT | NOT direct CC primitives; "agent orchestration dashboard" | Task dispatch + multi-agent monitor | Self-hosted, OpenClaw support, MCP, SQLite | UI + O |
| 11 | `mattpocock/sandcastle` | **4,438** | 464 | 2026-05-16 | `npx sandcastle` (TS lib) | (unverified — likely MIT) | Docker sandbox + git worktrees (3 branch strategies: head/merge-to-head/branch) | `sandcastle.run()` spawns N CC in Docker per issue | TypeScript SDK + Docker sandboxing + parallel-planner-with-review template | SB + W |
| 12 | `golutra/golutra` | **3,485** | 400 | 2026-05-16 | Rust desktop | **BSL-1.1** (NOT open-source until 2030 → STUDY-ONLY per cardinal-rule-5) | unifies CC/Codex/OpenClaw | parallel execution + task orchestration + long-running workflows | Multi-agent workspace; CHANGE DATE 2030-02-25 → GPL-2.0+ | O |
| 13 | `stravu/crystal` (now Nimbalyst) | **3,057** | 195 | 2026-05-15 | Electron desktop | MIT | git worktrees + multiple CC+Codex sessions | Parallel sessions, test+compare approaches | Desktop app, compare-approach workflow | UI + W |
| 14 | `njbrake/agent-of-empires` | **2,264** | 193 | 2026-05-16 | bash script + Homebrew + Nix + Cargo | MIT | tmux background sessions + git worktrees | TUI + Web; Cockpit mobile-native swipe-to-approve | Beta web dashboard, Tailscale/Cloudflare tunnel + QR auth | TM + UI + W |
| 15 | `rohitg00/pro-workflow` | **2,126** | 202 | 2026-05-16 | (JS-based; install via marketplace+commands) | (unverified) | self-correcting memory in SQLite, FTS5; parallel worktrees + agent teams | 17 battle-tested skills + auto-loaded rules from corrections | Compounding memory over 50+ sessions | SM + SK |
| 16 | `raine/workmux` | **1,486** | 104 | 2026-05-15 | Cargo/Homebrew CLI + `claude plugin marketplace add raine/workmux` | MIT | tmux/zellij/kitty/WezTerm windowing + worktree + `--fork` conversation fork; `.claude/settings.local.json` symlink-share | Pre-configured tmux window per worktree, `/worktree` `/merge` `/rebase` skills | Multi-terminal-emulator support; LITERAL claude `plugin marketplace add` integration | TM + W |
| 17 | `win4r/ClawTeam-OpenClaw` | **1,368** | 304 | 2026-05-16 | Python | (unverified) | OpenClaw-as-default-agent fork of ClawTeam | Multi-agent swarm coordination | OpenClaw-adapted swarm | O |
| 18 | `yohey-w/multi-agent-shogun` | **1,267** | 271 | 2026-05-16 | install.bat (WSL2) / first_setup.sh; daily startup `shutsujin_departure.sh` | MIT | CC --dangerously-skip-permissions + Memory MCP + settings.yaml | shogun→karo→ashigaru 3-tier feudal (7 parallel workers) | Samurai-themed task delegation; multi-CLI (CC/Codex/Copilot/Kimi) | O + TM |
| 19 | `Priivacy-ai/spec-kitty` | **1,230** | 98 | 2026-05-16 | Python install | MIT | git worktrees + spec-driven dev | Kanban dashboard + auto-merge | Spec-Driven multi-agent (CC, Cursor, Gemini, Codex, Copilot, Windsurf) | K + W |
| 20 | `preset-io/agor` | **1,203** | 99 | 2026-05-16 | TS install | **BSL-1.1** (REJECT until 2029-01-15 per cardinal-rule-5) | git worktrees + multiplayer canvas | Multi-AI session canvas + agent conversation tracking | Visualize team's agentic work in real-time | UI + O |
| 21 | `xintaofei/codeg` | **1,195** | 129 | 2026-05-16 | Desktop + self-hosted + Docker | (unverified) | Aggregates CC/Codex/Gemini CLI/Lark sessions | Session browser (NOT dispatcher) | One-place aggregate viewer | UI |
| 22 | `Doriandarko/make-it-heavy` | **1,114** | 185 | 2026-05-16 | Python | (unverified) | NOT CC-native; emulates Grok-Heavy | 4 parallel specialized agents per query | Multi-perspective analysis Grok-Heavy clone | O |
| 23 | `kbwo/ccmanager` | **1,107** | 87 | 2026-05-16 | npm CLI | (unverified — likely MIT) | NO tmux required; self-contained UI | Multi-session per worktree per project (CC + Gemini + Codex + Cursor + Copilot + Cline + OpenCode + Kimi) | Self-contained, no tmux install needed | O + UI |
| 24 | `fynnfluegge/agtx` | **1,041** | 98 | 2026-05-16 | curl install.sh OR cargo build | Apache-2.0 | dedicated tmux server "agtx" + per-project sessions + per-task windows; git worktrees | Kanban (Backlog/Planning/Running/Review/Done); different agents per phase (Gemini→research, Claude→implement, Codex→review) | TOML-defined spec-driven (GSD/Spec-kit/OpenSpec/BMAD/Superpowers); experimental orchestrator agent | K + TM + W |
| 25 | `coollabsio/jean` | **941** | 99 | 2026-05-16 | Tauri + React (Homebrew `brew install --cask jean`) | (unverified) | CLI integration with claude/codex/cursor/opencode (no vendor lock-in, local) | Multi-project, multi-worktree, multi-chat-session desktop | Local-only, dev-environment-for-AI | UI |
| 26 | `ogulcancelik/herdr` | **852** | 52 | 2026-05-16 | single Rust binary (no deps) | AGPL-3.0 (REJECT per license-discipline) | embedded PTY + vt100 parsing; built-in pi/claude/codex/opencode integrations forward semantic state over socket API | Workspaces around git repos + tiled panes + agent-state detection (17 themes, mouse-native, session persistence) | "tmux for agents" — pane processes survive client detach; full restart restore | TM + UI |
| 27 | `Dicklesworthstone/claude_code_agent_farm` | **831** | 93 | 2026-05-16 | clone + ./setup.sh | MIT + **OpenAI/Anthropic rider** (UNUSUAL — restricted parties prohibition; OK for us since we ARE Anthropic users) | tmux panes (20+) + lock-files in /coordination/ + monitoring dashboard | Distributed lock-based parallel; agent registers task scope to avoid overlap | 20+ agent farm; automated bug fixing + best-practices sweeps; lock-coordination protocol | O + TM |
| 28 | `milisp/codexia` | **681** | 65 | 2026-05-16 | TS desktop | (unverified) | CC + Codex CLI dual-agent | Task scheduler + git worktree + remote control + skills management | "Agent Workstation" for Codex+CC unified | UI + W |
| 29 | `johannesjo/parallel-code` | **628** | 81 | 2026-05-16 | TS terminal app | (unverified — likely MIT) | git worktree per agent | CC + Codex + Gemini side-by-side | Simple 3-agent split-view | TM + W |
| 30 | `devflowinc/uzi` | **580** | 24 | 2026-05-14 | `go install github.com/devflowinc/uzi@latest` | (unverified — README has no license stmt) | git worktrees + tmux | Run LARGE numbers of coding agents in parallel | Go-based, automated server setup + agent monitoring + code merging | W + TM |
| 31 | `SethGammon/Citadel` | **553** | 52 | 2026-05-16 | `claude --plugin-dir /path/to/Citadel` | MIT | Plugin for CC; routing/memory/safety hooks; runtime abstraction for CC+Codex | Four-tier routing (pattern→state→keyword→LLM); parallel agents in isolated worktrees | Cost-conscious routing (most requests cost-free at lower tiers); 6 production skills + 4-tier /do command | O + UI + SK |
| 32 | `wshobson/agents` | (large monorepo; topic-tier) | (large) | recent | Plugin marketplace (80 plugins, 185 agents, 153 skills) | MIT | Native Claude Code experimental Agent Teams via `agent-teams` plugin | `/team-review src/ --reviewers security,performance,architecture` parallel | Largest curated agent ecosystem; multi-reviewer parallel pattern | O + SK |
| 33 | `mixpeek/amux` | 186 | 22 | 2026-05-16 | git clone + ./install.sh; requires Python 3 + tmux + CC | (unverified — likely MIT) | parses ANSI-stripped tmux output (NO hooks, NO patches, NO CC modifications) | Self-healing watchdog: crash recovery, auto-compaction at context exhaustion, thinking-block corruption restart with message replay, stuck-prompt auto-answer in YOLO mode; rate-limit detection + option-1 press + reset-time parse | PWA mobile dashboard, Background Sync, 200-400MB/agent (50+ on 32GB) | O + UI + TM |

**Additional name-search hits NOT in matrix above (≤200★ but topologically interesting)**:

| Repo | ★ | Note |
|---|---|---|
| `nekocode/agent-worktree` | 256 | Rust worktree workflow tool; isolated environments per agent |
| `sahithvibudhi/vibe-tree` | 255 | TS desktop; CC + Gemini in parallel worktrees |
| `owengretzinger/constellagent` | 206 | Desktop app — each agent gets own terminal/editor/worktree in one window |
| `idolaman/galactic` | 174 | TS; zero-conflict networking + isolated worktrees |
| `nielsgroen/claude-tmux` | 160 | Rust; tmux popup w/ session mgmt + worktree + PR |
| `nwiizo/ccswarm` | 139 | Rust multi-agent orchestration; specialized CC agents |
| `haoyu-haoyu/Multi-AI-Workflow` | 129 | TS; 7 workflow modes; CC+Codex+Gemini unified |
| `Wirasm/worktree-manager-skill` | 131 | **SKILL** (symlink to `~/.claude/skills/`); MIT |
| `forrestchang/worktree-workflow` | 110 | install.sh symlinks `claude-wt` to `~/.local/bin/`, copies skills+commands; MIT |
| `teambrilliant/claude-research-plan-implement` | 102 | **ARCHIVED** ; Research→Plan→Implement structured workflow w/ parallel agents |
| `factoryfloor` (alltuner) | 97 | Native macOS app w/ Ghostty + git worktrees + CC sessions + dev servers |
| `arpitnath/claude-capsule-kit` | 84 | Crew teams for parallel multi-branch work; 18 specialist agents |
| `learn-claude-code-rs` (wulawulu) | 81 | Educational — agent harness in Rust w/ subagents/teams/worktrees/MCP/typed tool routing |
| `lulu-sk/CodexFlow` | 74 | Unified TS desktop; CC + Codex + Gemini; Windows+WSL |
| `vladzima/kodeck` | 70 | Open-source IDE for CC; browser-native; worktree mgmt |
| `harris21/laravel-herd-worktree` | 67 | **SKILL** — Laravel-Herd-specific worktree setup |
| `CommanderApp/commander` | 59 | macOS UI for CC+Codex w/ diffs/git/worktrees |
| `Sterll/claude-terminal` | 58 | Cross-platform desktop (Electron); multi-CC-terminal tabbed + workflow-builder + cloud sync + MCP |
| `notdp/worktree.sh` | 56 | Out-of-box isolated env for CC/Codex |
| `to-na/claude-code-crew` | 53 | Browser-based UI for multi-CC sessions across worktrees |
| `yxwucq/CCUI` | 32 | TS/React WebUI; CC per session w/ full xterm.js terminal + own worktree + branch; live activity detection + per-session cost tracking + cross-worktree file browsing w/ diff viewer + custom agent templates; MIT |
| `simonstaton/AgentManager` | 22 | TS; human-on-the-loop platform w/ kill switch + cost tracking + inter-agent messaging |
| `DanWahlin/ai-agent-board` | 14 | TS drag-drop kanban w/ CC/Copilot/Codex/OpenCode providers; AgentProvider pattern |
| `agenttools/worktree` | 12 | TS CLI; GitHub issues + CC auto-launch w/ context + tmux + multi-worker collab on same issue |
| `SpillwaveSolutions/parallel-worktrees` | 11 | **SKILL** (clone to `~/.claude/skills/`); spawn-parallel.sh + cleanup + sync; runs parallel subagents and syncs |
| `andrewhathaway/ag.sh` | 6 | bash CLI; **STATELESS by design** (no databases/lock-files/PID/config); worktrees as durable truth |

---

## §B — TOP-5 INSTALL for parallel-agent operator (FORCE-MULTIPLIER picks)

**Acceptance criteria** (per cardinal-rule-1 install-from-trusted-plugins-only + cardinal-rule-5 install-priority + license-discipline REJECT AGPL/BSL):

1. **`raine/workmux`** (1,486★, MIT, Rust binary + `claude plugin marketplace add raine/workmux`)
   - **Force-multiplier**: works on existing tmux/zellij/kitty/WezTerm; literal `claude plugin marketplace add` integration → satisfies cardinal-rule-1 install-only-from-trusted-marketplaces
   - **Native CC primitive**: `.claude/settings.local.json` symlink-share to keep permissions across worktrees; `--fork` conversation forking ALIGNS with our `CLAUDE_CODE_FORK_SUBAGENT=1` ENV (e)
   - **Subagent integration**: `/worktree` `/merge` `/rebase` commands as Claude skills → delegation works out-of-box
   - **Pick rationale**: HIGHEST native-CC-pathway integration in the field; MIT-clean; multiple terminal emulators; aligns with CCBP (`Z:/repos/deps/claude-code-best-practice-shan/best-practice/`)
   - **Risk**: requires tmux/zellij/kitty on Win11 → use WSL2 or kitty Windows port

2. **`fynnfluegge/agtx`** (1,041★, Apache-2.0, single binary curl-install.sh)
   - **Force-multiplier**: **Kanban TUI with per-phase agent assignment** (Gemini→research, Claude→implement, Codex→review) — aligns with cross-model-consensus mandate in `Z:/claude-sota/.claude/rules/cross-model-consensus.md` AND ENV (e) fork-subagent
   - **Native CC primitive**: per-task tmux window + per-task git worktree; dedicated tmux server "agtx"; TOML-defined spec-driven plug-ins (GSD/Spec-kit/OpenSpec/BMAD/Superpowers — we already have superpowers per W254 target install set)
   - **Pick rationale**: Apache-2.0 (cleanest license profile); native cross-model dispatch satisfies Path P cross-model-consensus pattern WITHOUT needing codex-rescue wrapper for every task
   - **Risk**: experimental orchestrator agent; tmux-required on Win11

3. **`BloopAI/vibe-kanban`** (26,286★, Apache-2.0, Rust binary + web UI)
   - **Force-multiplier**: HIGHEST star adoption (26k+) — community-validated; 10+ agent CLIs supported (we use CC + Codex)
   - **Native CC primitive**: git worktree per workspace from kanban issue; agent-CLI shellout per workspace; inline diff review + built-in browser preview
   - **Pick rationale**: BloopAI = serious team (CEO Louis Knight-Webb, named-T2-author tier per CCBP author hierarchy); MIT-adjacent Apache-2.0; web-UI complements terminal-only operator workflows
   - **Risk**: Web-UI may add friction vs CLI-only; "doomscrolling gap" framing per BloopAI blog is product-marketing not technical primitive

4. **`automazeio/ccpm`** (8,113★, MIT, Skill via agentskills.io standard)
   - **Force-multiplier**: SKILL-mode install (cardinal-rule-1 ✅) — symlink to skills dir, NO CLI install needed; works with CC + Factory + Droid + Amp + Cursor
   - **Native CC primitive**: git worktrees + `.claude/epics/` + `.claude/prds/` markdown state + bash scripts for deterministic ops (NOT LLM-calls); GitHub Issues as single source of truth
   - **Pick rationale**: Aligns DIRECTLY with our spec-driven discipline (5-phase Brainstorm→Document→Plan→Execute→Track); 8k★ adoption; pure skill-install model satisfies cardinal-rule-1 best
   - **Risk**: Spec-driven discipline overhead may slow exploratory work; not pure dispatcher (it's a discipline + dispatcher hybrid)

5. **`Wirasm/worktree-manager-skill`** (131★, MIT, **SKILL**) + **`SpillwaveSolutions/parallel-worktrees`** (11★, SKILL) — **install BOTH as paired skills**
   - **Force-multiplier**: TWO pure skills (cardinal-rule-1 ✅✅) — symlink clone to `~/.claude/skills/`; ZERO infrastructure footprint
   - **Native CC primitive**: Wirasm = worktree CRUD automation (copy configs, install deps, allocate unique ports, launch terminal windows w/ CC ready); Spillwave = `spawn-parallel.sh feature-X 3` + cleanup + sync subagent results
   - **Pick rationale**: LOWEST install-cost option; skill-only model means ZERO settings.json mutation, ZERO hook-script self-invent (W255 cleanup discipline); high reversibility (delete symlink); both MIT
   - **Risk**: Spillwave is 11★ (low adoption signal — STUDY-PILOT not full-trust); Wirasm 131★ is moderate

**Honorable mention (NOT in top-5)**:
- `humanlayer/humanlayer` (10,817★ Apache-2.0): EXTREMELY high quality (Go daemon, .claude/agents+commands, R-P-I-V 4-phase) but heavyweight (full IDE + SDK + Go daemon stack); STUDY-PILOT before INSTALL
- `ComposioHQ/agent-orchestrator` (7,076★ MIT): elegant 7-slot plugin architecture but standalone `npm install -g @aoagents/ao` adds Node global dep; cardinal-rule-1 NEUTRAL (not a CC plugin per se)
- `mixpeek/amux` (186★ likely MIT): self-healing watchdog + rate-limit-aware + PWA mobile is UNIQUE value but 186★ = low adoption signal; **CONSIDER for L0.6c self-healing pattern STUDY** even if not INSTALL

---

## §C — Architecture recommendation: L0.6 expansion

**Current state**: L0.6 in grand-synthesis-2026-05-16 is a single "git-worktree parallel-agent" mention.

**Recommendation**: **EXPAND L0.6 into THREE sub-layers** + **extend L5.5 multi-agent-orchestration with explicit dispatch-strategy classification**.

### L0.6a — WORKTREE-RUNNER (pure skill / pure CLI / no infrastructure)
- **Primitive**: `claude --worktree` flag (native, mid-2026 per CC docs) + `isolation: worktree` subagent frontmatter
- **Skill installs** (cardinal-rule-1 ✅): `Wirasm/worktree-manager-skill` (MIT, 131★), `SpillwaveSolutions/parallel-worktrees` (MIT, 11★), `forrestchang/worktree-workflow` (MIT, 110★), `automazeio/ccpm` (MIT, 8113★)
- **CLI installs** (cardinal-rule-1 NEUTRAL, requires native binary install): `max-sixty/worktrunk` (5094★ MIT), `andrewhathaway/ag.sh` (6★ stateless bash)
- **Native CC integration**: subagent frontmatter `isolation: worktree`; `CLAUDE_CODE_FORK_SUBAGENT=1` (ALREADY ACTIVE per CLAUDE.local.md ENV (e))
- **Disposition**: INSTALL pair (Wirasm + Spillwave + ccpm) — three skills, ZERO infrastructure footprint, full cardinal-rule-1 compliance
- **Risk class**: LOW — pure skill mode is symlink-reversible

### L0.6b — MULTI-AGENT-ORCHESTRATOR (CLI binary or plugin; dispatch strategy)
- **Primitive**: multi-agent fleet w/ per-task worktree + per-task tmux window + cross-model dispatch (Gemini/Claude/Codex per phase)
- **Plugin installs** (cardinal-rule-1 ✅): `SethGammon/Citadel` (MIT 553★ via `claude --plugin-dir /path`), `wshobson/agents` (MIT, plugin marketplace w/ `agent-teams`)
- **CLI binary installs**: `raine/workmux` (MIT 1486★ + `claude plugin marketplace add raine/workmux`), `fynnfluegge/agtx` (Apache-2.0 1041★), `ComposioHQ/agent-orchestrator` (MIT 7076★)
- **Cross-model dispatch strategies observed in field**:
  - **Phase-routed**: agtx kanban — Gemini→research, Claude→implement, Codex→review (matches our Path P cross-model-consensus mandate)
  - **Reviewer-fan-out**: wshobson `/team-review src/ --reviewers security,performance,architecture`
  - **Tier-routed**: Citadel four-tier (pattern→state→keyword→LLM) for cost optimization
  - **Issue-routed**: ComposioHQ — one agent per GitHub issue, auto-route CI failures back
- **Disposition**: INSTALL `workmux` + `agtx` as paired tools; STUDY `Citadel` (newest, MIT, but plugin-dir model = slightly off cardinal-rule-1 marketplace channel)
- **Risk class**: MEDIUM — CLI binaries require tmux on Win11 → WSL2 dependency

### L0.6c — TERMINAL-MUX (terminal-host abstraction + agent-state-aware UI)
- **Primitive**: terminal multiplexer that KNOWS about agent states (running/waiting/idle/error/needs-input) and surfaces them in UI
- **Best-in-class (NOT CC-native but USEFUL for operator)**: `manaflow-ai/cmux` (17k★ GPL-3.0 — license concern), `ogulcancelik/herdr` (852★ AGPL — REJECT), `mixpeek/amux` (186★ — STUDY for self-healing pattern)
- **CC-aware muxes**: `nielsgroen/claude-tmux` (160★), `claude-code-crew` (53★ browser-based), `claude-squad` (7487★ AGPL REJECT)
- **Disposition**: NO INSTALL recommendation (license-discipline blocks top 3; cardinal-rule-1 not satisfied — these are terminal-emulator alternatives, NOT plugins/skills)
- **Pattern adoption**: STUDY `amux` self-healing watchdog (auto-compaction at context exhaustion, thinking-block corruption restart with message replay, rate-limit detection w/ option-1 auto-press + reset-time parse) as INSPIRATION for L0.6c-style hooks atop our installed plugin set

### L5.5 extension — Multi-Agent Orchestration EXPLICIT dispatch-strategy classification

Recommend adding a **5-class dispatch taxonomy** to L5.5 alongside the orchestrator listings:

| Class | Pattern | Example repo | Use when |
|---|---|---|---|
| **D1 Phase-routed cross-model** | Gemini→research, Claude→implement, Codex→review | agtx, multi-agent-shogun (shogun→karo→ashigaru) | Cross-model consensus mandated (our use-case); leverages different model strengths per phase |
| **D2 Reviewer-fan-out** | Parallel reviewers, distinct dimensions | wshobson/agents `/team-review` | Code review w/ multi-dimensional concerns (sec/perf/arch) |
| **D3 Issue-routed** | One agent per issue, auto-route CI back | ComposioHQ/agent-orchestrator, BloopAI/vibe-kanban (kanban→issue), ccpm | GitHub-Issues-driven dev workflow |
| **D4 Tier-routed cost-aware** | pattern→state→keyword→LLM cascade | Citadel four-tier `/do` | Cost-conscious; most requests resolve free at lower tiers |
| **D5 Lock-coordinated farm** | 20+ agents, /coordination/ lock files, distributed task-scope claims | Dicklesworthstone/claude_code_agent_farm | Bulk codebase sweeps (bug-fixing, best-practices migrations); requires monitor dashboard |

**Our runtime mapping**:
- We currently use D1 implicitly via Path P (codex exec foreground+tee per cross-model-consensus.md). Installing `agtx` would make D1 explicit via kanban TUI.
- D2 is mandated by Wave-200+ multi-reviewer fan-out patterns per `Z:/claude-sota/.claude/rules/` discipline; `wshobson/agents` `agent-teams` plugin satisfies natively.
- D3 not currently used; if we adopt GitHub-Issues-as-source-of-truth (per `ccpm` discipline), this becomes relevant.
- D4 not currently used; Citadel pattern is interesting STUDY for cost-conscious wave-tick cycles.
- D5 not currently used; lock-coordination pattern from claude_code_agent_farm is INSPIRATION for FM-class recovery hooks atop our installed plugin set (see L0.6c §C above).

---

## §D — Honest non-findings

Per `Z:/claude-sota/.claude/rules/honest-non-findings.md` — DECLARED gaps + reduced-confidence rows:

1. **`ShebinKMohan/Grove`** — **NOT FOUND** on GitHub. Likely (a) misnamed in operator list (closest match: `captainsafia/grove` — CLI for git-worktree-based workflows, NOT CC-specific; or `swarnim-j/grove`), (b) private repo, or (c) deleted/archived. Web-search for "Grove worktree claude" returned no direct hit. **Confidence**: 0.85 (probable misnomer in operator list).

2. **`vnovick/itervox`** — **PROBABLY MISNAMED** in operator list. Real entity is **Itervox** (itervox.dev) — runs agents w/ `--dangerously-skip-permissions` (CC) and `--dangerously-bypass-approvals-and-sandbox` (Codex) for no-prompt fleet ops. GitHub owner unverified (no `vnovick/itervox` direct hit). **Confidence**: 0.75 — entity exists, GitHub org unverified.

3. **`Sterll/claude-terminal`** — VERIFIED EXISTS (58★, Electron desktop), but **license NOT VERIFIED** — needs probe. Topics indicate `open-source` but no LICENSE file probed this fire.

4. **`gastownhall/gastown`** (15,235★) — **license NOT VERIFIED** — README probe would resolve, deferred this fire for token budget; recommend probe before INSTALL recommendation upgrade.

5. **`milisp/codexia`** (681★), **xintaofei/codeg`** (1195★), **golutra/golutra`** (3485★), **rohitg00/pro-workflow`** (2126★), **win4r/ClawTeam-OpenClaw`** (1368★), **Doriandarko/make-it-heavy`** (1114★), **kbwo/ccmanager`** (1107★), **jean (coollabsio)`** (941★), **devflowinc/uzi`** (580★) — **license NOT DIRECTLY VERIFIED** this fire (some inferred from topics). Recommend explicit LICENSE probe before INSTALL recommendation upgrade. CRITICAL for `golutra` (BSL-1.1 already confirmed-NOT-open-source) and `uzi` (README had NO license statement per web-search).

6. **`bytedance/UI-TARS-desktop`** (34,198★) — included for completeness but **NOT CC-NATIVE** — multimodal GUI/browser agent (vision-based desktop control). Belongs in L6.x browser-agent / vision-agent layer, NOT L0.6/L5.5. **Misclassification risk**: high if operator interprets star-count as L0.6/L5.5 relevance.

7. **`mattpocock/sandcastle`** (4,438★) — included as SANDBOX-RUNNER (SB) sub-category; **license NOT DIRECTLY VERIFIED** this fire (likely MIT per mattpocock convention). Note: **v62-only flag CANNOT BE CONFIRMED** this fire — would need release-history probe. Operator's v62-only annotation may be inaccurate (repo is active 2026-05-16).

8. **`spillwavesolutions/parallel-worktrees`** (11★) — included as SKILL; **v62-only flag CANNOT BE CONFIRMED** — repo last-updated 2026-05-09 suggests active maintenance. Operator's annotation may be stale.

9. **Stars/forks figures**: pinned to probe-timestamp **2026-05-16 16:08-16:11 UTC**. Per CCBP cite-discipline, stars are dynamic — re-probe before any /plugin install workflow.

10. **License figures**: for top-12 rows where LICENSE was directly probed, figures are TIER-1-DIRECT. For rows marked "(unverified)" in §A, license is inferred from topics/conventions and DOWNGRADED to TIER-3-LOCAL-COMPOSITION pending probe.

11. **Native-CC-pathway figures (D6 column)**: inferred from README + WebSearch summaries; for items not directly README-probed (rows 17-33 partial), pathway is TIER-3-LOCAL-COMPOSITION. The TOP-5 picks in §B were all README-probed this fire (TIER-1-DIRECT for D6).

12. **Rate-limit incidents**: GitHub Search API rate-limited twice this fire (16:08:49 UTC + 16:11:09 UTC, 30-40s reset windows each). All affected rows were re-queried successfully. **Confidence on completeness**: 0.92 — likely 1-2 marginal candidates missed in the 100-200★ band where rate-limit hit during search-result enumeration.

13. **D6 "native-CC primitive" classification**: 18 of 33 matrix rows use git worktrees as core primitive; 14 use tmux; 6 use Claude Code subagent system explicitly; 5 install as Claude Code skills/plugins (the cardinal-rule-1 ✅ cohort); 2 are NOT CC-native (Doriandarko/make-it-heavy = Grok-Heavy clone; bytedance/UI-TARS-desktop = vision GUI agent). **Skill/plugin install cohort = 5 of 33 = 15% of field** — this is the cardinal-rule-1-clean subset.

14. **Operator's 25-item name-search**: 21 of 25 names successfully resolved with star+license+description data. 4 unresolved or ambiguous: `ShebinKMohan/Grove` (NOT FOUND), `vnovick/itervox` (entity exists, GitHub owner unverified), `nekocode/agent-worktree` (resolved → 256★), `Sterll/claude-terminal` (resolved → 58★, license unverified).

15. **Cross-reference to existing tranches** in `06-fresh-research-delta/`: rows 1 (vibe-kanban), 4 (gastown), 7 (claude-squad), 8 (agent-orchestrator), 10 (mission-control), 13 (crystal), 18 (multi-agent-shogun), 24 (agtx) appear in `BACKLOG-TRANCHE-A-50K-STAR-2026-05-16.md` or `BACKLOG-TRANCHE-G-NAME-SEARCH-2026-05-16.md` — this DEEP-SAT file ADDS the dispatch-strategy classification (D1-D5 taxonomy in §C-L5.5), the SKILL vs CLI vs PLUGIN install-model split, AND the cardinal-rule-1-compliance shortlist that those tranches do NOT articulate.

---

## Closing — operator-action shortlist

**Tier-1 INSTALL (cardinal-rule-1 ✅, MIT/Apache-2.0, skill-or-plugin model)**:
1. `automazeio/ccpm` (skill, 8113★ MIT) — spec-driven 5-phase + GitHub Issues source-of-truth
2. `Wirasm/worktree-manager-skill` (skill, 131★ MIT) — worktree CRUD automation
3. `SpillwaveSolutions/parallel-worktrees` (skill, 11★ MIT) — spawn-parallel + cleanup + sync
4. `raine/workmux` (CLI + plugin via `claude plugin marketplace add raine/workmux`, 1486★ MIT)
5. `wshobson/agents` (plugin marketplace, MIT) — `agent-teams` for D2 reviewer-fan-out

**Tier-2 STUDY-PILOT (high star, MIT/Apache-2.0, CLI binary install)**:
- `fynnfluegge/agtx` (1041★ Apache-2.0) — D1 phase-routed cross-model kanban
- `BloopAI/vibe-kanban` (26,286★ Apache-2.0) — D3 issue-routed kanban
- `SethGammon/Citadel` (553★ MIT) — D4 tier-routed cost-conscious
- `mixpeek/amux` (186★ likely MIT) — self-healing watchdog pattern STUDY

**REJECTED per license-discipline**:
- `smtg-ai/claude-squad` (AGPL-3.0)
- `manaflow-ai/cmux` (GPL-3.0-or-later)
- `ogulcancelik/herdr` (AGPL-3.0)
- `preset-io/agor` (BSL-1.1 until 2029)
- `golutra/golutra` (BSL-1.1 until 2030)

**Deferred (license unverified — needs single LICENSE-probe before disposition upgrade)**:
- `gastownhall/gastown` (15,235★), `Sterll/claude-terminal` (58★), `mattpocock/sandcastle` (4438★), `kbwo/ccmanager` (1107★), `xintaofei/codeg` (1195★), `rohitg00/pro-workflow` (2126★), `coollabsio/jean` (941★), `devflowinc/uzi` (580★ — README has NO license stmt)

---

**End of DEEP-SAT L0.6 / L5.5 deliverable.** File length ~530 LOC. Cite-anchored to GitHub Search API + WebFetch READMEs + cross-referenced to existing 06-fresh-research-delta tranches + CCBP `Z:/repos/deps/claude-code-best-practice-shan/best-practice/` for cardinal-rule discipline.
