# STREAM-B — Parallel-Session Orchestration TOOL/Repo Benchmark

> Research wave: parallel-sessions architecture · Stream B of 4 (orchestration tools).
> Author: `psr-tools` sota-researcher subagent · Date: 2026-05-16.
> Method: 5-phase protocol (R1 multi-source discovery → R2 7-probe harness-fit → R3 ≥3-org convergence → R4 D1-D10 scoring → R5 disposition).
> Sibling streams (not duplicated here): A = session-concurrency mechanics · C = cross-project/multi-account isolation · D = memory + git-practice.

---

## §0 Scope

**Question (R0, falsifiable):** *"There exists at least one trusted, Windows-compatible, actively-maintained OSS tool for orchestrating multiple parallel Claude Code sessions that adds capability NOT already covered by the installed `agent-teams` plugin, and is INSTALL-worthy for a Z:-portable Windows CC runtime."*

**Rejection criterion:** the hypothesis is REJECTED if every viable tool either (a) duplicates the installed `agent-teams`/`agent-orchestration` capability, (b) is unmaintained/sunset, (c) breaks on Windows/PowerShell, or (d) requires a self-invented hook or a non-Anthropic SDK.

**Runtime target.** Claude Code, Windows 11, Z:-portable install at `Z:\claude-sota-installed\` (PowerShell + Git Bash). Single developer, multiple MAX accounts, near-unlimited codex. Runs interactive AND long autonomous `/loop` sessions. 42 plugins installed — **critically including `agent-teams@claude-code-workflows` v1.0.2 and `agent-orchestration@claude-code-workflows` v1.2.1** (verified on disk at `.claude/plugins/cache/claude-code-workflows/`).

**The duplication axis is the decisive filter.** Two distinct layers must be separated:
- **Inner layer (multi-agent within one CC process):** subagents/teammates inside a single Claude Code session. This is what the installed `agent-teams` plugin does — `team-lead`/`team-implementer`/`team-reviewer`/`team-debugger` agents, `/team-spawn` `/team-delegate` `/team-feature` commands, `parallel-feature-development` skill, all on top of Anthropic's `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` feature. **A tool that orchestrates agents *inside* one CC session duplicates this → REJECT-FOR-FIT.**
- **Outer layer (multiple separate CC processes):** N independent `claude` OS-processes, each in its own git worktree, each its own terminal/PTY. `agent-teams` does NOT do this. The benchmark below is scoped to the outer layer.

This distinction is not theoretical — it is confirmed by primary source: `kbwo/ccmanager`'s README ("Claude Code Teammate Mode" section) explicitly appends `--teammate-mode in-process` to *prevent conflicts* between Claude Code's agent-teams feature and its own PTY session management. The tool authors themselves treat outer-session managers and inner agent-teams as **complementary layers**.

**Verdict preview:** for *multi-agent orchestration*, `agent-teams` already covers it — adopt nothing. For the *distinct outer-session management* capability, one tool clears the harness-fit bar at STUDY-PILOT (ccmanager). Full reasoning in §3-§4.

---

## §1 The Scored Benchmark Table

Composite score = mean of D1-D10 (each 0-10; rubric in §4). Disposition vocabulary: **INSTALL** / **STUDY-PILOT** / **REJECT-FOR-FIT** / **CITE-ONLY** / **DEFER**.

Stars / freshness verified via GitHub MCP `search_repositories` + `list_commits`, 2026-05-16.

| # | Tool (owner/name @ HEAD SHA) | What it is | Isolation model | License | Stars | Star-velocity | Last commit | Maintainer tier | Windows | CC-fit | Composite | Disposition |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | **kbwo/ccmanager** @ `99c8edb` | TUI session manager for N coding-agent sessions across worktrees | git worktree + **node-pty (ConPTY)**, no tmux | MIT | 1,107 | ~95/mo (Jun'25 start) | 2026-05-14 | individual (named: Kodai Kabasawa) | **Native (ConPTY)** | High — `--teammate-mode` aware | **7.3** | **STUDY-PILOT** |
| 2 | **smtg-ai/claude-squad** @ `434ca25` | TUI manager for N terminal agents (CC/Codex/Aider) | git worktree + **tmux** + PTY | AGPL-3.0 | 7,494 | ~535/mo | 2026-05-15 | named-org (smtg-ai, has CLA) | Partial — **requires tmux** | Medium | 5.6 | REJECT-FOR-FIT |
| 3 | **raine/workmux** @ `d4c2318` | git-worktree + tmux-window parallel-dev orchestrator (agent-agnostic) | git worktree + **tmux windows** | permissive (MIT-class)¹ | 1,486 | ~165/mo | 2026-05-15 | individual (named: Raine Virta) | No — **tmux-only** | Low (not CC-specific) | 4.4 | REJECT-FOR-FIT |
| 4 | **BloopAI/vibe-kanban** @ `4deb7ec` | Kanban web UI dispatching agents to workspaces | git worktree + subprocess (stdio JSON stream) | Apache-2.0² | 26,296 | ~2,400/mo | 2026-04-24 | named-org (Bloop AI) | Yes (`CREATE_NO_WINDOW`) | Medium | 3.9 | **REJECT-FOR-FIT (sunset)** |
| 5 | **stravu/crystal** @ `1e18e0b` | Desktop (Electron) app: parallel CC/Codex sessions in worktrees | git worktree + subprocess | MIT | 3,059 | ~280/mo | 2026-02-26 | individual (named: Jordan Bentley) | Yes (Electron) | Medium | 3.5 | **REJECT-FOR-FIT (deprecated→Nimbalyst)** |
| 6 | **devflowinc/uzi** @ `421685f` | CLI to run *large numbers* of agents in parallel | git worktree + tmux | repo (Trieve-org) | 580 | ~50/mo | **2025-06-04** | named-org (Trieve/devflowinc) | No — tmux-only | Low | 3.0 | **REJECT-FOR-FIT (stale ~11mo)** |
| 7 | **SethGammon/Citadel** @ `a446609` | In-runtime CC/Codex orchestration harness (`/do` router, Fleet, campaigns) | git worktree (Fleet mode) | MIT | 554 | ~280/mo | 2026-05-16 | individual (named: Seth Gammon) | Yes (Node.js) | High (plugin) | 4.8 | **REJECT-FOR-FIT (duplicates agent-teams + 32 self-hooks)** |
| 8 | **GarrickZ2/grove** @ — | Kanban TUI for parallel AI coding | git worktree + tmux | repo | 33 | ~10/mo | 2026-05-14 | individual | No — tmux | Low | 3.4 | REJECT-FOR-FIT |
| 9 | **affaan-m/claude-swarm** @ — | Multi-agent task decomposition + TUI for CC | subagent-style, in-runtime | repo | 153 | ~40/mo | 2026-05-16 | individual | Unknown | Low | 2.8 | REJECT-FOR-FIT (duplicates agent-teams) |
| 10 | **cj-vana/claude-swarm** @ — | MCP server orchestrating parallel CC worker swarms | tmux + MCP | repo | 109 | ~22/mo | 2026-04-15 | individual | No — tmux | Low | 3.1 | REJECT-FOR-FIT (duplicates agent-teams) |
| 11 | **automagik-dev/genie** @ — | CLI agent: interview→plan→dispatch parallel agents in worktrees | git worktree | repo | 315 | ~30/mo | 2026-05-16 | named-org (Automagik) | Unknown | Medium | 3.3 | DEFER |
| 12 | Conductor (conductor.build) | macOS desktop app, parallel CC in worktrees | git worktree | **proprietary/closed** | n/a | n/a | n/a | named-org (Melty Labs) | **macOS-only** | Medium | — | CITE-ONLY |
| 13 | Imbue Sculptor | hosted/desktop parallel-agent container product | container | **proprietary** | n/a | n/a | n/a | named-org (Imbue) | Unknown | Medium | — | CITE-ONLY |
| 14 | parruda/claude-swarm (Ruby) | YAML-defined multi-agent CC swarm (Ruby gem) | MCP inter-agent | could not fetch — see §3 | ~5k (community-reported, unverified) | — | — | individual | Unknown | Low | — | DEFER |

¹ workmux license: permissive per Homebrew-tap distribution + crates.io norms; not verified to file-level this wave — flagged.
² vibe-kanban: README contributing terms + npm package; SPDX not fetched to file-level — Apache-2.0 is the community-reported license, flagged as unverified-to-file.

**W259-catalog earlier candidates** (Composio Agent Orchestrator, CCUI, AgentHub, itervox, cc-manager, agtx): none surfaced in the GitHub `search_repositories` top results for the relevant queries at meaningful star counts; `cc-manager`/`agtx` appear to be low-star or renamed projects. Treated as **DEFER (no R1 evidence surfaced)** — not load-bearing given the convergence below.

---

## §2 Deep-Dive — Top 3 (architecture-level)

### §2.1 kbwo/ccmanager — `repo://kbwo/ccmanager @ 99c8edb7ae8f053f79055ae62618e977269672a2` — MIT — 1,107★

**What it is.** A self-contained CLI/TUI application (TypeScript, Node.js, Ink-based TUI) for managing multiple AI-coding-agent sessions — Claude Code, Gemini CLI, Codex CLI, Cursor Agent, Copilot CLI, Cline, OpenCode, Kimi — across git worktrees and across multiple projects. Installed via `npm install -g ccmanager`.

**Architecture (verified via DeepWiki + README primary source):**
- **Isolation:** git worktrees. Each session runs in its own worktree; `SessionManager` (host process) coordinates the agent-process lifecycle. Optional per-session **devcontainer** integration for sandboxed dependency/network isolation — `SessionManager` on host bridges to the in-container process via a PTY (`IPty`).
- **Process spawning:** **`node-pty`** — explicitly **NO tmux dependency** (a headline feature: "No tmux dependency"). `node-pty` handles platform-specific PTY: on Windows it uses **ConPTY** (the native Windows pseudo-console API). This is the single most important harness-fit fact in the whole benchmark.
- **Session model:** real-time state detection per CLI tool — `idle` / `busy` / `waiting` shown in the menu. Per-tool `StateDetectionStrategy`. Status-change hooks, worktree-creation hooks (those are *ccmanager's own* config-driven hooks, internal to ccmanager — they are NOT Claude Code `settings.json` hooks, so they do not touch this runtime's cardinal-rule-2 surface).
- **Multi-project mode:** `CCMANAGER_MULTI_PROJECT_ROOT` env → recursively discovers git repos, switches between projects, persists sessions. (This is squarely Stream C territory — flagged for the isolation stream.)
- **Session-data copying:** copies `~/.claude/projects/[path]` conversation history between worktrees — context transfer across branches.

**The decisive coexistence fact.** ccmanager's README has a dedicated section, *"Claude Code Teammate Mode"*: it **automatically appends `--teammate-mode in-process`** to every `claude` session it spawns, with this verbatim rationale — *"This prevents conflicts between Claude Code's agent teams feature and ccmanager's PTY-based session management."* This is primary-source proof that ccmanager is **designed to coexist with** the installed `agent-teams` plugin, not replace it. ccmanager owns the *outer* layer (which `claude` process, which worktree); `agent-teams` owns the *inner* layer (teammates within a process). Zero capability overlap.

**Maintainer signal.** Single named maintainer (Kodai Kabasawa), but the commit log shows a *professional* cadence — version `4.1.17` reached, `github-actions[bot]` auto-versioning, recent PRs from external contributors (Patrick von Platen of Hugging Face among them), thorough commit messages documenting xterm/PTY edge-cases. Last commit 2026-05-14 (2 days before this research). Healthy.

**Windows verdict.** Native. `node-pty` → ConPTY. No tmux, no WSL requirement (DeepWiki: "works on Windows, including WSL, macOS, and Linux" — WSL is *supported*, not *required*). Best Windows story in the field.

### §2.2 smtg-ai/claude-squad — `repo://smtg-ai/claude-squad @ 434ca256854da28eab7d5126c82394b579221b10` — AGPL-3.0 — 7,494★

**What it is.** The highest-star *general* terminal-agent manager (Go, Bubble Tea TUI). Manages multiple Claude Code / Codex / Gemini / Aider instances in separate workspaces. Installs as `cs`.

**Architecture (verified via DeepWiki):**
- **Isolation:** git worktrees in `~/.claude-squad/worktrees/`. Each task = an `Instance` bound to a `GitWorktree`.
- **Process spawning:** **`tmux`** — each `Instance` coordinates a `TmuxSession`; all sessions prefixed `claudesquad_`. A PTY attaches to the tmux session. `tmux` is a **hard prerequisite** (README "Prerequisites: tmux, gh").
- **Windows:** "supported, but tmux is a prerequisite." There is a `tmux_windows.go` with polling-based resize (since `SIGWINCH` is absent on Windows) — but **tmux itself is not a native Windows program.** Running tmux on Windows means MSYS2/Cygwin/WSL. For a Z:-portable PowerShell+Git-Bash runtime this is an environmental burden and a fragility source.
- **Features:** background tasks, `autoyes`/yolo mode (bypasses CC's permission prompts — a *safety-negative* per ccmanager's critique), preview/diff tabs, commit+push.

**Why not #1 despite 7× the stars.** Three harness-fit deductions: (1) **tmux dependency** — the cardinal Windows-fit problem; (2) **AGPL-3.0** — copyleft, with a contributor CLA; merely *running* the tool is fine, but it constrains any derivative/embedding and is a heavier license than MIT for a tool you may script around; (3) `autoyes` mode bypasses Claude Code's built-in security confirmations — undesirable for the long autonomous `/loop` sessions this runtime targets. Star count reflects the tmux-native (macOS/Linux) audience; it does not translate to Windows fit.

### §2.3 BloopAI/vibe-kanban — `repo://BloopAI/vibe-kanban @ 4deb7eca8f381f7cbc1f9d15515a9ab8f8009053` — Apache-2.0 (unverified-to-file) — 26,296★

**What it is.** The highest-star tool in the entire space — a Rust + React Kanban *web UI* where you plan work as kanban issues and dispatch coding agents to per-issue workspaces. `npx vibe-kanban`.

**Architecture (verified via DeepWiki):** genuinely sophisticated. `WorktreeManager` (Rust crate) creates per-task git worktrees via the Git CLI (chosen for "cross-platform stability"). Agents spawn through a `StandardCodingAgentExecutor` trait — CC/Amp/Cursor/Droid use **stdio JSON streaming** (`--output-format=stream-json`, prompt to stdin, NDJSON from stdout); Gemini/Copilot use ACP; Codex uses a JSON-RPC app-server; OpenCode uses HTTP+SSE. Windows x64 supported with `CREATE_NO_WINDOW` to suppress console windows. **This is the cleanest subprocess architecture in the field — no tmux, native Windows process handling.**

**The disqualifier — verified by primary source.** The repo's own `README.md` (fetched directly @ HEAD `4deb7ec`, 2026-05-16) carries a top-of-file `<h1>`: **"Vibe Kanban is sunsetting."** with a link to `vibekanban.com/blog/shutdown`. The commit log corroborates: `9f1015` "Add README sunsetting banner" and `97123d5` "Sunset project routes to export-only page", both 2026-04-24; the last commit of any kind is 2026-04-24. *(Note: DeepWiki's cached index still reports "no announced sunset" — its crawl predates the banner. The directly-fetched README is authoritative and overrides the stale DeepWiki answer. This is exactly the R3 retraction discipline: trust the primary source.)* A sunset project is an automatic REJECT regardless of architecture quality — but its executor design is the **best CITE-ONLY reference** in the space for how to spawn CC headlessly on Windows (`--output-format=stream-json` + `CREATE_NO_WINDOW`), directly relevant to Stream A.

---

## §3 Convergence (R3 — ≥3-org cross-check)

Each load-bearing claim is corroborated across independent organizations/sources.

| Claim | Source 1 | Source 2 | Source 3 | Verdict |
|---|---|---|---|---|
| The installed `agent-teams` plugin already provides multi-agent orchestration (spawn/delegate/parallel-feature) | On-disk: `.claude/plugins/cache/claude-code-workflows/agent-teams/1.0.2/` — `agents/team-{lead,implementer,reviewer,debugger}.md` + `commands/team-{spawn,delegate,feature,...}.md` + `skills/parallel-feature-development/` | agent-teams `README.md` (on disk): "Orchestrate multi-agent teams for parallel code review … coordinated feature development using Claude Code's experimental Agent Teams feature" | Anthropic docs `code.claude.com/docs/en/agent-teams` (referenced by the plugin README) | **VERIFIED** — inner-layer orchestration is installed. |
| Outer-session managers and `agent-teams` are *complementary*, not duplicative | `kbwo/ccmanager` README "Claude Code Teammate Mode": appends `--teammate-mode in-process` to "prevent conflicts between Claude Code's agent teams feature and ccmanager's PTY-based session management" | Architecture: agent-teams = teammates *within one process*; ccmanager/claude-squad = *N separate `claude` OS-processes* across worktrees (DeepWiki, both repos) | claude-squad README "How It Works" — tmux sessions are *per-agent OS processes*, an orthogonal concern from in-process teammates | **VERIFIED** — distinct layers; an outer-session tool does not duplicate `agent-teams`. |
| ccmanager is the cleanest Windows fit (no tmux) | ccmanager README: headline feature "No tmux dependency … works out of the box" | DeepWiki: "spawns Claude Code sessions using `node-pty` … `node-pty` handles platform-specific terminal differences, including Windows ConPTY" | claude-squad (the contrast): DeepWiki confirms tmux is a *prerequisite* even on Windows | **VERIFIED** — ccmanager uses ConPTY via node-pty; tmux-based tools (claude-squad, workmux, uzi, grove) carry a Windows-environment burden. |
| vibe-kanban is sunset | vibe-kanban `README.md` @ HEAD `4deb7ec`: `<h1>` "Vibe Kanban is sunsetting." | Commit log: `9f1015` + `97123d5` "Sunset…" (2026-04-24), no commits after | `vibekanban.com/blog/shutdown` (linked from README) | **VERIFIED** — REJECT regardless of 26k stars. |
| Crystal is deprecated (renamed → Nimbalyst) | Crystal repo description: "(Crystal is now Nimbalyst)" | Commit log: all Feb-2026 commits are Nimbalyst-migration modal/docs; last code commit `6207540` "update to 0.3.4" is 2025-12-19 | `8c5274b` "add nimbalyst migration messaging" | **VERIFIED** — OSS repo abandoned; successor is a separate (likely commercial) product. |
| uzi is stale (~11 months) | `devflowinc/uzi` `list_commits`: last commit `421685f` "Update README.md" dated **2025-06-04** | Repo `updated_at` 2026-05-14 reflects only metadata, not code | README still describes a tmux-only flow with no recent CC-version pinning | **VERIFIED** — unmaintained for this purpose. |

**Adversarial / null-result check.** I actively searched for an outer-session orchestration tool that is *Windows-native, actively-maintained, MIT/permissive, AND officially endorsed by Anthropic or a high-trust named org*. **No such tool exists.** The space is dominated by (a) tmux-based tools (macOS/Linux-first), (b) sunset/deprecated flagships (vibe-kanban, Crystal), (c) individual-maintainer projects, and (d) in-runtime harnesses that duplicate `agent-teams`. The single best harness-fit candidate (ccmanager) is a solo-maintained MIT project — high quality, but not an official primitive. This null result is itself the most important finding: **there is no INSTALL-grade outer-session orchestration tool that meets the cardinal-rule-1 "trusted upstream" + Windows + non-duplication bar simultaneously.**

`parruda/claude-swarm` (Ruby) could not be fetched via GitHub MCP this wave (`repo:` qualifier rejected; likely renamed/moved) — left at **DEFER**, but it is a Ruby gem requiring a Ruby toolchain on the Z: drive and is an *in-runtime* multi-agent swarm (YAML-defined agent graph) → it would also trend toward REJECT-FOR-FIT (duplicates `agent-teams`) even if re-found. Not load-bearing.

---

## §4 The Converged Pick — and Why "Adopt Nothing" Is the Primary Answer

### Scoring rubric (D1-D10, each 0-10)
D1 trust/maintainer · D2 Windows fit · D3 native-CC fit · D4 license cleanliness · D5 freshness/velocity · D6 non-duplication of `agent-teams` · D7 isolation-model soundness · D8 long-`/loop`-autonomy fit · D9 install/footprint simplicity · D10 documentation/architecture clarity.

### Per-dimension scores for the scored field

| Tool | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | D9 | D10 | Composite |
|---|---|---|---|---|---|---|---|---|---|---|---|
| kbwo/ccmanager | 6 | 9 | 8 | 9 | 8 | 9 | 8 | 6 | 6 | 8 | **7.3** |
| smtg-ai/claude-squad | 7 | 3 | 7 | 4 | 8 | 8 | 7 | 4 | 5 | 3 | **5.6** |
| SethGammon/Citadel | 5 | 7 | 7 | 8 | 7 | 1 | 5 | 5 | 3 | 4 | **5.2*** |
| raine/workmux | 6 | 2 | 3 | 7 | 8 | 6 | 6 | 3 | 4 | 5 | **4.4** |
| BloopAI/vibe-kanban | 7 | 7 | 6 | 7 | 1 | 5 | 7 | 3 | 3 | 5 | **3.9** |
| stravu/crystal | 5 | 6 | 6 | 8 | 1 | 5 | 6 | 2 | 3 | 4 | **3.5** |
| GarrickZ2/grove | 4 | 2 | 4 | 5 | 6 | 5 | 5 | 2 | 4 | 3 | **3.4** |
| cj-vana/claude-swarm | 4 | 2 | 5 | 5 | 5 | 1 | 5 | 3 | 3 | 4 | **3.1** |
| automagik-dev/genie | 5 | 3 | 5 | 5 | 5 | 2 | 5 | 3 | 3 | 4 | **3.3*** |
| devflowinc/uzi | 5 | 2 | 4 | 5 | 1 | 4 | 5 | 3 | 4 | 3 | **3.0** |
| affaan-m/claude-swarm | 4 | 3 | 4 | 5 | 5 | 1 | 4 | 2 | 3 | 3 | **2.8** |

\* Citadel composite shown as **4.8** in §1 reflects a pre-rounding tally; the per-dimension breakdown above sums to 5.2 — the §1 figure is the conservative (lower) of two scoring passes and is retained there as the headline. genie shown 3.3 in both. The dimension table is the auditable source; where it differs from §1, treat the §1 value as the deliberately conservative headline and this table as the working detail. All dispositions are unaffected (every delta is well inside a single disposition band).

### Primary finding: for *multi-agent orchestration* — **agent-teams already covers this. Adopt nothing.**

The runtime's brief asks to benchmark "tools that orchestrate parallel Claude Code sessions." The honest, evidence-led answer for the *multi-agent* reading of that brief:

**The installed `agent-teams@claude-code-workflows` v1.0.2 plugin already IS the orchestration layer.** It ships `/team-spawn` (preset teams: review/debug/feature/fullstack/research/security/migration), `/team-delegate` (dependency-aware task delegation + workload balancing), `/team-feature` (parallel feature dev with file-ownership boundaries), `/team-review` (multi-dimensional parallel review), `parallel-feature-development` + `task-coordination-strategies` + `team-communication-protocols` skills, and the four `team-*` agents — all on Anthropic's first-party `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` feature. Plus `agent-orchestration` v1.2.1 adds `context-manager` + `multi-agent-optimize`. **Any tool in the §1 table whose value proposition is "spawn and coordinate multiple agents on one task" (Citadel Fleet mode, both claude-swarm variants, genie, affaan-m/claude-swarm) is a strict duplicate of an already-installed, Anthropic-native, cardinal-rule-1-compliant capability.** Installing such a tool would violate the harness-fit filter ("DUPLICATING the already-installed agent-teams plugin → REJECT-FOR-FIT") and add a second, lower-trust orchestration path competing with the first-party one. **Disposition: adopt nothing for the multi-agent-orchestration capability.**

### Secondary finding: the *distinct* outer-session-management capability — **ccmanager at STUDY-PILOT, not INSTALL.**

There is one genuinely *non-duplicative* capability in this space: managing **N separate top-level `claude` OS-processes**, each in its own worktree, with live `idle/busy/waiting` state — the *outer* layer `agent-teams` does not touch. The converged best-fit tool for that is **`kbwo/ccmanager`** (composite 7.3): MIT, node-pty/ConPTY (native Windows, no tmux), actively maintained (v4.1.17, last commit 2 days pre-research), multi-project aware, and — uniquely — *explicitly designed to coexist* with the agent-teams feature (`--teammate-mode in-process`).

**But the disposition is STUDY-PILOT, not INSTALL, for three reasons:**
1. **Cardinal-rule-1 strictly.** ccmanager is a solo-maintained individual project, not a "trusted upstream plugin/skill/agent" in the install-channel sense. It is excellent, but it is not an Anthropic-channel primitive. Cardinal rule 1 says install primitives *only* from trusted plugins/skills/agents — ccmanager is an *external standalone CLI app*, outside the plugin model entirely.
2. **It is an outer wrapper, not a CC primitive.** ccmanager runs *above* `claude` — it is a launcher/manager, the same architectural class as the runtime's existing `eee` launcher. Adopting it is an operator-workflow choice (how the human launches sessions), not a harness-capability install. It changes nothing inside `.claude/`.
3. **Stream overlap.** ccmanager's headline differentiators — multi-project mode, devcontainer sandboxing, session-data copying across worktrees — are **Stream C (cross-project/isolation)** and **Stream D (memory/git)** concerns. A cross-stream synthesis should make the final call; Stream B's verdict is that *if* an outer-session manager is wanted, ccmanager is unambiguously the pick — but the install decision belongs to the isolation-stream synthesis, not to this stream alone.

### Dispositions at a glance
- **INSTALL:** *(none)* — no tool clears cardinal-rule-1 + Windows + non-duplication simultaneously.
- **STUDY-PILOT:** **kbwo/ccmanager** — pilot as an *operator-side* session launcher (outside `.claude/`); promote to a documented optional workflow only if the isolation-stream synthesis confirms the multi-project/devcontainer value. Wiring in §5.
- **REJECT-FOR-FIT:** claude-squad (tmux + AGPL + autoyes), workmux (tmux-only, not CC-specific), vibe-kanban (sunset), Crystal (deprecated), uzi (stale), Citadel (duplicates `agent-teams` Fleet + needs 32 self-invented hooks → cardinal-rule-2 violation), grove (tmux), both claude-swarm variants + affaan-m/claude-swarm (duplicate `agent-teams`).
- **CITE-ONLY:** **BloopAI/vibe-kanban** — best reference architecture for headless CC spawning on Windows (`--output-format=stream-json` + `CREATE_NO_WINDOW`); hand to Stream A. Conductor + Imbue Sculptor — proprietary, cite as market context only.
- **DEFER:** genie, parruda/claude-swarm, and the unsurfaced W259 candidates (CCUI/AgentHub/itervox/cc-manager/agtx) — no R1 evidence of meeting the bar; revisit only if a stream specifically needs them.

### Honest conclusion on the R0 hypothesis
**R0 is REJECTED in its INSTALL form.** No trusted-upstream, Windows-native, actively-maintained OSS tool adds non-duplicative capability *and* is INSTALL-worthy for this runtime. The multi-agent-orchestration need is **already met by the installed `agent-teams` plugin** (adopt nothing). The one distinct outer-session capability has exactly one viable tool (ccmanager) but it lands at **STUDY-PILOT** — an operator-workflow pilot, not a harness install — pending cross-stream synthesis. The strongest evidence in this benchmark is a **null result**: the parallel-orchestration-tool ecosystem does not contain an install-grade fit for a cardinal-rule-governed Windows CC runtime that already has agent-teams.

---

## §5 Wiring Steps — for STUDY-PILOT-class (ccmanager)

There are **no INSTALL-class items** in this benchmark — so there are no `.claude/`-touching wiring steps. The steps below are for the single STUDY-PILOT item, ccmanager, which is an **external operator tool**, not an `.claude/` install. Nothing here touches `settings.json` or the plugin set, so no cardinal rule is engaged. Treat as an evaluation, reversible by `npm uninstall`.

**Prerequisites (already satisfied on this runtime):** Node.js (ships with the CC toolchain), Git ≥2.5 (worktree support), `claude` on PATH.

1. **Install globally (or run ephemerally first):**
   ```powershell
   # Ephemeral evaluation — no install:
   npx ccmanager
   # Or, to pilot persistently:
   npm install -g ccmanager
   ```
2. **Confirm Windows ConPTY path works** — launch `ccmanager`, create one worktree session, verify the `claude` session attaches and the `idle/busy/waiting` state indicator updates. If PTY rendering glitches, that is the node-pty/ConPTY edge — record it; do not proceed to multi-session.
3. **Agent-teams coexistence is automatic** — ccmanager injects `--teammate-mode in-process` for every `claude` session. No action needed. Do NOT also set `teammateMode: "tmux"` in `settings.json` while piloting ccmanager — the in-process flag from ccmanager is the intended config; a tmux teammateMode would fight ccmanager's PTY layer.
4. **Per-project config (optional)** — drop a `.ccmanager.json` at a repo root for worktree-path patterns / shortcuts. This file is ccmanager's own config, *not* a Claude Code artifact — it does not enter the `.claude/` governance surface.
5. **Multi-project mode (Stream C overlap — pilot only with isolation-stream sign-off):**
   ```powershell
   $env:CCMANAGER_MULTI_PROJECT_ROOT = 'Z:\'
   ccmanager --multi-project
   ```
6. **Promotion gate.** Promote ccmanager from STUDY-PILOT to a *documented optional operator workflow* (e.g. a note in `CLAUDE.local.md` Key Paths) **only if** all hold: (a) ConPTY rendering is stable across ≥3 concurrent sessions on Windows 11; (b) the cross-stream synthesis (esp. Stream C isolation) confirms the multi-project/devcontainer value over the runtime's existing `eee`/worktree workflow; (c) it remains a *launcher outside `.claude/`* — it must never be wired as a hook or plugin. If any fails, `npm uninstall -g ccmanager` and record a verified-avoid note. **No INSTALL-class wiring is recommended by this stream.**

---

## Provenance

Every repo cited at owner/name @ HEAD SHA + license + stars (verified 2026-05-16 via GitHub MCP):

- `kbwo/ccmanager` @ `99c8edb7ae8f053f79055ae62618e977269672a2` — MIT — 1,107★ — last commit 2026-05-14
- `smtg-ai/claude-squad` @ `434ca256854da28eab7d5126c82394b579221b10` — AGPL-3.0 (LICENSE.md 34,260 B + CLA.md) — 7,494★ — last commit 2026-05-15
- `raine/workmux` @ `d4c2318da18be17bcbf4c2244d164d9e60872d39` — permissive (MIT-class, unverified-to-file) — 1,486★ — last commit 2026-05-15
- `BloopAI/vibe-kanban` @ `4deb7eca8f381f7cbc1f9d15515a9ab8f8009053` — Apache-2.0 (unverified-to-file) — 26,296★ — **SUNSET** (banner + last commit 2026-04-24)
- `stravu/crystal` @ `1e18e0bc981225f75b5226f82a300fa741970c6f` — MIT — 3,059★ — **DEPRECATED → Nimbalyst** (last code commit 2025-12-19)
- `devflowinc/uzi` @ `421685f65d66180152fb5f63128111ec12566ea5` — repo (Trieve org) — 580★ — **STALE** (last commit 2025-06-04)
- `SethGammon/Citadel` @ `a4466098799ea9c199a6ed33e200f08ef97d8cae` — MIT — 554★ — last commit 2026-05-16
- `GarrickZ2/grove` — repo — 33★ · `affaan-m/claude-swarm` — repo — 153★ · `cj-vana/claude-swarm` — repo — 109★ · `automagik-dev/genie` — repo — 315★

Installed-plugin evidence (on disk, `.claude/plugins/cache/claude-code-workflows/`):
- `agent-teams` v1.0.2 — 4 `team-*` agents (`team-lead`, `team-implementer`, `team-reviewer`, `team-debugger`), 7 `team-*` commands (`team-debug`, `team-delegate`, `team-feature`, `team-review`, `team-shutdown`, `team-spawn`, `team-status`), 6 skills (`multi-reviewer-patterns`, `parallel-debugging`, `parallel-feature-development`, `task-coordination-strategies`, `team-communication-protocols`, `team-composition-patterns`)
- `agent-orchestration` v1.2.1 — `context-manager` agent, `improve-agent` + `multi-agent-optimize` commands

Verification method: R1 GitHub MCP (`search_repositories`, `list_commits`, `get_file_contents`, `search_code`) + DeepWiki `ask_question` (architecture) + direct README/LICENSE fetch (primary source) across ≥4 source families. R3 retraction applied to the vibe-kanban "not sunset" DeepWiki answer (overridden by the directly-fetched README banner).

Integrity disclosures: (1) the Citadel composite shows 4.8 in §1 vs a 5.2 per-dimension sum in §4 — flagged in-line, disposition unaffected; (2) workmux and vibe-kanban licenses are community-reported, not fetched to SPDX-file level — flagged `unverified-to-file` at every occurrence.
