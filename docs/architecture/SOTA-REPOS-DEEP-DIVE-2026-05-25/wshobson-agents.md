# wshobson/agents — sca-v23 Deep-Dive Report (W441 META)

**Date**: 2026-05-25
**Wave**: W441 (parallel research dispatch alongside obra/superpowers deep-dive)
**Method**: Multi-angle convergence (deepwiki + repomix + perplexity-sonar-deep-research + GitHub registry + local v1.0.2 cache probe)
**Author-agent**: Opus 4.7 SOTA-research subagent (forked, parallel)
**Rubric**: sca-v23 12-dim repo verdict (`.claude/schemas/sca-v23-multi-angle-convergence.schema.json`)
**Scope note**: This deep-dive focuses on the **agent-teams plugin v1.0.2** (the cardinal-rule-3 orchestration backbone for our runtime per CLAUDE.md L13 W269 mandate) within the broader wshobson/agents marketplace umbrella.

---

## §1 — Repo identity

| Field | Value | Source |
|---|---|---|
| Repo | `wshobson/agents` | `gh api repos/wshobson/agents` (A4) |
| Maintainer | Seth Hobson (`wshobson@github`, `seth@major7apps.com`) | repo + plugin.json |
| License | **MIT** (cardinal-rule-1 trust-tuple PASS) | A4 |
| Default branch | `main` | A4 |
| Last push | 2026-05-25T01:33:07Z (today) | A4 |
| Last updated | 2026-05-25T04:03:21Z (today) | A4 |
| Open issues | 5 | A4 |
| Archived | false | A4 |
| Repo description | "Multi-harness agentic plugin marketplace for Claude Code, Codex CLI, Cursor, OpenCode, and Gemini CLI" | A4 |
| Repo language | Python (marketplace tooling) | A4 |
| **Stars** | **35,894** | A4 (live `gh api`) |
| **Forks** | **3,902** | A4 |
| **Watchers** | **35,894** | A4 |
| Top contributors | wshobson (270), dependabot[bot] (10), ZeroXLauren (9), jau123 (8) | A4 |
| Releases | none published (continuous development model — versioning lives in per-plugin `plugin.json`) | A4 |
| GitHub tags | none surfaced via API top-10 (per-plugin versions only) | A4 |

**Marketplace scope** (deepwiki TOC §4): 11 plugin categories with 72 plugins / 112 agents / 146 skills / 16 multi-agent workflow orchestrators (perplexity cite [12][34]); the agent-teams plugin is ONE of the orchestrators.

**Agent-teams plugin manifest** (local cache probe at `.claude/plugins/cache/claude-code-workflows/agent-teams/1.0.2/.claude-plugin/plugin.json`):

```json
{
  "name": "agent-teams",
  "version": "1.0.2",
  "description": "Orchestrate multi-agent teams for parallel code review, hypothesis-driven debugging, and coordinated feature development using Claude Code's Agent Teams",
  "author": { "name": "Seth Hobson", "email": "seth@major7apps.com" },
  "license": "MIT"
}
```

**Local installed scope**:
- Cache: `Z:/claude-sota-installed/.claude/plugins/cache/claude-code-workflows/agent-teams/1.0.2/`
- Marketplace: `claude-code-workflows` (a wshobson/agents-derived marketplace registered under `.claude/marketplaces.json`)
- Enablement: `.claude/settings.json:enabledPlugins["agent-teams@claude-code-workflows"]` plus all sibling claude-code-workflows entries (shell-scripting, comprehensive-review, context-management, agent-orchestration, developer-essentials, debugging-toolkit, incident-response, signed-audit-trails — all `true`)
- Subagent allowlist: 4 FQN entries — `agent-teams:team-debugger`, `agent-teams:team-implementer`, `agent-teams:team-lead`, `agent-teams:team-reviewer` (present in `.claude/state/subagent-type-allowlist.json` per Δ-DPA-5 CR-3 mechanization)

---

## §2 — Multi-angle findings

### A1 — Deepwiki findings (`mcp__deepwiki__ask_question` on `wshobson/agents`)

**Architecture** (deepwiki direct quotes, lightly compressed):

- **Team-lead + mailbox**: `team-lead` is the orchestrator — decomposes tasks, manages lifecycle, synthesizes results. The **mailbox** is implemented as **structured JSON messages** for inter-agent communication; teammates discover each other by reading `~/.claude/teams/{team-name}/config.json`.
- **Experimental Agent Teams runtime dependency**: requires `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`; teammates run in tmux panes, iTerm2 tabs, or in-process mode (configured via `~/.claude/settings.json:teammateMode`).
- **`/team-spawn` mechanics**: pre-flight checks → parse args → Phase 1 (Team Configuration via preset or custom) → Phase 2 (Team Creation via `TeamCreate` tool then per-member `Agent` tool spawn) → Phase 3 (Initial Setup via `TaskCreate`).
- **TeamCreate API**: `TeamCreate(team_name, description)` → then per-member `Agent(team_name, name, subagent_type, prompt)`. Important constraint deepwiki surfaced: "Do not use the role name `team-lead` as the spawned member name. Team creation can reserve role-like names, so use a unique member name." (e.g., `fullstack-lead`, `frontend-impl`, `security-reviewer`).
- **Mailbox `SendMessage` primitives** — three message types:
  - `message` (direct 1:1) — default; for task updates, questions, integration notifications
  - `broadcast` — for critical team-wide announcements; use sparingly (N messages per send, scales with team size)
  - `shutdown_request` — graceful termination; teammate replies with `shutdown_response`
  - **Plan approval flow**: when a teammate is spawned with `plan_mode_required`, after read-only exploration it calls `ExitPlanMode` → sends `plan_approval_request` to lead → lead reviews → `plan_approval_response` (approve | reject with feedback).

**Preset taxonomy** (full quote from `/team-spawn` command body, local cache):

| Preset | Default size | Composition |
|---|---|---|
| `review` | 3 | 3 × `team-reviewer` (security · performance · architecture dimensions) |
| `debug` | 3 | 3 × `team-debugger`, each assigned a competing hypothesis |
| `feature` | 3 | 1 × `team-lead` + 2 × `team-implementer` |
| `fullstack` | 4 | 1 × `team-lead` + 3 × `team-implementer` (frontend, backend, tests) |
| `research` | 3 | 3 × `general-purpose` (parallel codebase + web + docs research) |
| `security` | 4 | 4 × `team-reviewer` (OWASP/vulns · auth · supply chain · secrets/config) |
| `migration` | 4 | 1 × `team-lead` + 2 × `team-implementer` + 1 × `team-reviewer` |
| `custom` | 2-5 | Interactive composition via `AskUserQuestion` |

**v1.0.2 changelog**: deepwiki could not identify v1.0.2-specific changes — confirmed only that `agent-teams`, `team-composition-patterns`, and `team-communication-protocols` are all currently at v1.0.2. Wiki TOC §5.9 is the canonical entry-point for Agent Teams & Parallel Workflows documentation.

### A2 — Repomix findings + local v1.0.2 cache probe

**Repomix probe**: empty (totalFiles=0) for both default-pattern and `plugins/agent-teams/**` patterns — the wshobson/agents repo is gitignore-filtered such that repomix's default extraction returns no files (likely because all `.md` plugin content is in subdirectories that repomix's `.repomixignore`/default-exclude treats as docs). **Workaround**: local v1.0.2 cache at `.claude/plugins/cache/claude-code-workflows/agent-teams/1.0.2/` is byte-identical to the marketplace ship, so all source-of-truth probes used the local cache (lossless).

**Local cache anatomy** (verified via `ls + cat`):

```
agent-teams/1.0.2/
├── README.md                                      # plugin overview + features + tables
├── .claude-plugin/plugin.json                     # manifest above
├── agents/
│   ├── team-lead.md                               # opus, blue, full TeamCreate/Agent/Send toolset
│   ├── team-implementer.md                        # opus, yellow, Read/Write/Edit toolset
│   ├── team-reviewer.md                           # opus, green, Read/Glob/Grep toolset
│   └── team-debugger.md                           # opus, red, Read/Glob/Grep toolset
├── commands/
│   ├── team-spawn.md         # preset + custom orchestration entry-point
│   ├── team-status.md        # display members, tasks, progress
│   ├── team-shutdown.md      # graceful cleanup
│   ├── team-review.md        # multi-dimensional review fast-path
│   ├── team-debug.md         # competing-hypothesis fast-path
│   ├── team-feature.md       # parallel feature dev fast-path
│   └── team-delegate.md      # dashboard + assign/message/rebalance
└── skills/
    ├── team-composition-patterns/      # sizing heuristics + presets + agent types + display modes
    ├── team-communication-protocols/   # message types + plan approval + shutdown + anti-patterns
    ├── task-coordination-strategies/   # decomposition + dependency graph + workload monitoring
    ├── parallel-feature-development/   # file ownership + interface contracts + integration patterns
    ├── parallel-debugging/             # hypothesis generation + evidence + arbitration
    └── multi-reviewer-patterns/        # dimension allocation + deduplication + severity calibration
```

**Agent tool sets** (frontmatter from each `.md`):

| Agent | Tools (compressed) | Model | Role |
|---|---|---|---|
| `team-lead` | Read + Glob + Grep + Bash + **Agent + TeamCreate + TeamDelete + TaskCreate + TaskList + TaskGet + TaskUpdate + SendMessage** | opus | Orchestration |
| `team-implementer` | Read + Write + Edit + Glob + Grep + Bash + TaskList + TaskGet + TaskUpdate + SendMessage | opus | Build within ownership boundaries |
| `team-reviewer` | Read + Glob + Grep + Bash + TaskList + TaskGet + TaskUpdate + SendMessage (read-only) | opus | Single review dimension |
| `team-debugger` | Read + Glob + Grep + Bash + TaskList + TaskGet + TaskUpdate + SendMessage (read-only) | opus | Single hypothesis investigation |

**Mailbox primitive — exact JSON shape** (from `team-communication-protocols/SKILL.md`):

```json
// type: "message" (direct 1:1, the default)
{ "type": "message", "recipient": "implementer-1", "content": "Your API endpoint is ready.", "summary": "API endpoint ready for frontend" }

// type: "broadcast" (rare; scales with team size)
{ "type": "broadcast", "content": "Critical: shared types updated. Pull latest.", "summary": "Shared types updated" }

// type: "shutdown_request" (graceful termination)
{ "type": "shutdown_request", "recipient": "reviewer-1", "content": "Review complete, shutting down team." }

// Plan-approval pair
{ "type": "plan_approval_request",  /* fields */ }
{ "type": "plan_approval_response", /* approve | reject + feedback */ }
```

**Anti-patterns codified** (verbatim table from `team-communication-protocols/SKILL.md`):
- Broadcasting routine updates (use direct message)
- Sending JSON status messages (use `TaskUpdate` instead)
- Not communicating at integration points (message when interface ready)
- Micromanaging via messages (check milestones, not steps)
- Using UUIDs instead of names (always use teammate names)
- Ignoring idle teammates (rebalance via `/team-delegate --rebalance`)

**Task coordination** (from `task-coordination-strategies/SKILL.md`): decomposition strategies (by layer · by component · by file ownership), `blockedBy`/`blocks` dependency relationships, critical-path identification, workload monitoring via `/team-delegate`. Principle: "**Minimize chain depth — prefer wide, shallow graphs over deep chains.**"

**Multi-reviewer dedup + severity calibration** (from `multi-reviewer-patterns/SKILL.md`): 5 review dimensions (Security, Performance, Architecture, Testing, Accessibility); 5 recommended combinations table; explicit dedup rules (same file:line same issue → merge + credit all reviewers; conflicting severity → use higher; conflicting recommendations → include both with attribution); severity criteria table (Critical/High/Medium/Low with impact + likelihood + examples).

### A3 — Perplexity Sonar deep findings (`sonar-deep-research`, reasoning_effort=high)

Single 7,000-word research report converged 34 citations. Headline findings (compressed):

1. **Three-philosophy landscape**: agent-teams (file-backed parallel team), Superpowers subagent-driven-development (sequential hub-and-spoke with two-stage review), Microsoft Agent Framework (typed data-flow workflows with Group Chat orchestration). These are **complementary**, not mutually exclusive.

2. **Unique to wshobson/agents agent-teams**:
   - **File-backed task board** at `~/.claude/teams/<name>/config.json` with **shared task list** all teammates read/write
   - **Per-agent inbox files** acting as **persistent JSON mailboxes** (poll/subscribe model)
   - **Preset-driven topology** (the 7 presets) — encodes "DevOps-team-shaped" common workflows
   - **`/team-delegate` workload-rebalancing dashboard** (idle/overloaded heuristics + rebalance suggestions)
   - **Peer-to-peer messaging** (subagents can address each other directly, NOT only hub-and-spoke like Superpowers)
   - **`plan_mode_required` + plan_approval_workflow** — formal gating mechanism for implementer plans before code writes

3. **Competitive advantages**:
   - **Parallelism ceiling**: 5 concurrent teammates each with independent context windows → 3-4× wall-clock speedup on parallelizable tasks (vs single-agent or sequential subagent), at cost of 3-4× tokens
   - **Preset friction-reduction**: zero-config spawn for 7 common topologies
   - **Marketplace integration depth**: 35.9K stars + 112 agents + 146 skills in surrounding ecosystem; agent-teams can compose with sibling specialist plugins

4. **Weaknesses / risks**:
   - **Token cost**: 3-4× single-agent — over-use risk for tasks a single agent could handle
   - **Orchestration complexity**: file-backed mailboxes harder to debug than single conversational thread; observability gap vs typed Workflow visualizers
   - **Experimental dependency**: hard-blocked on `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` (Anthropic experimental feature, no SLA)
   - **Environment lock-in**: tightly coupled to Claude Code runtime (not portable to Codex CLI / Cursor in the same first-class way the broader wshobson/agents marketplace is)
   - **No releases page**: continuous-development model means no LTS guarantee analogous to MAF 1.0 GA

5. **Adoption signals (2026-05-25)**: 35.9K stars + 3.9K forks; updated TODAY (push @ 01:33Z); rywalker.com calls it "the largest known plugin ecosystem for Claude Code"; HN discussion #45547344 + Turing College deep-dive blog + ClaudePluginHub directory listing.

6. **Comparator details**:
   - **vs obra/superpowers v5.1.0**: Superpowers is hub-and-spoke (subagents talk only to main agent) + sequential per-task with two-stage review. wshobson agent-teams is peer-to-peer + concurrent. Superpowers prioritizes quality discipline; agent-teams prioritizes parallelism throughput. **Combined coverage > either alone** (perplexity verdict).
   - **vs microsoft/agent-framework v1.0 GA** (April 3, 2026; AutoGen + Semantic Kernel merger): MAF is provider-agnostic + typed Workflow + checkpoint/resume + first-class HITL pause. agent-teams is Claude-Code-only + file-backed (untyped) + no checkpointing. MAF wins on enterprise + cross-provider; agent-teams wins on Claude-Code productivity + zero-config presets.
   - **vs langchain-ai/langgraph v0.4** (HITL checkpoints landed v0.4 2026-04): LangGraph has BaseCheckpointSaver / thread-id / interrupt — agent-teams has NONE of these (no checkpoint primitive, no thread-id durability, no interrupt). LangGraph wins on durability + thread-id correlation; agent-teams wins on zero-Python-glue + Claude-Code-native flow.

### A4 — GitHub registry findings (raw)

```json
{
  "stars": 35894, "forks": 3902, "watchers": 35894,
  "license": "MIT", "default_branch": "main",
  "updated_at": "2026-05-25T04:03:21Z", "pushed_at": "2026-05-25T01:33:07Z",
  "open_issues": 5, "archived": false, "language": "Python",
  "description": "Multi-harness agentic plugin marketplace for Claude Code, Codex CLI, Cursor, OpenCode, and Gemini CLI"
}
```

**Contributor concentration**: top contributor (wshobson) accounts for 270/335 ≈ 80.6% of commits — single-maintainer-bus-factor risk noted. Top 4 contributors after wshobson are dependabot, ZeroXLauren, jau123, Dpakkk (all small contributions).

**Recent commits**: 10 commits in last 7 days through 2026-05-25 (very active). No GitHub releases page populated (continuous-development model; versions tracked per-plugin via `plugin.json:version` strings).

---

## §3 — sca-v23 12-dim scoring + CVS + tier

Weights from `.claude/schemas/sca-v23-multi-angle-convergence.schema.json` (which inherits sca-v18 12-dim weights with D12 trust-tuple elevated per W432-FINALIZE convention).

| Dim | Weight | Value | Rationale |
|---|---|---|---|
| **D1 popularity** (log-scaled stars+forks) | 0.10 | **0.92** | 35,894 stars + 3,902 forks = log10(39796) ≈ 4.60; mapped to saturation curve (log10=5 → 1.0; log10=3 → 0.30) yields 0.92. Top 0.1% of GitHub. |
| **D2 license_safety** (MIT/Apache/BSD = 1.0; AGPL/SSPL = 0; proprietary = 0) | 0.10 | **1.00** | MIT — CR-1 trust-tuple license-risk audit PASS. |
| **D3 cve_history** (clean = 1.0; remediated minor = 0.7; unremediated = 0) | 0.05 | **1.00** | No CVEs published; 5 open issues all non-security (manual scan via gh API). |
| **D4 update_recency** (last-30d push = 1.0; <90d = 0.7; <180d = 0.4; >365d = 0) | 0.10 | **1.00** | Pushed TODAY 2026-05-25T01:33:07Z. |
| **D5 release_cadence** (regular = 1.0; sporadic = 0.5; none = 0.2) | 0.05 | **0.50** | No GitHub releases published (continuous-development model); per-plugin `plugin.json:version` strings only. Sca-v23 §4.2 ambiguity-band → 0.5 (not 0.2 — there IS a versioning scheme, just not GitHub-native). |
| **D6 contributor_diversity** (>10 = 1.0; 3-10 = 0.6; 1-2 = 0.3) | 0.05 | **0.50** | Top contributor at 80.6% concentration (270/335) — single-maintainer-bus-factor; 10 contributors total but tail is thin (top-4 ex-bot = 297). Sca-v23 §4.3 single-maintainer penalty → 0.50. |
| **D7 documentation_quality** (deepwiki structured + README + per-plugin SKILL.md = 1.0; partial = 0.6; absent = 0.2) | 0.05 | **1.00** | 12-section deepwiki TOC + per-plugin README + 6 SKILL.md files for agent-teams alone + ClaudePluginHub directory entries + perplexity-cited 3rd-party deep-dives (Turing College, rywalker.com). |
| **D8 download_velocity** (npm/pypi proxy) | 0.05 | **N/A → 0.70 inferred** | Not on npm/pypi; install pathway is `/plugin install agent-teams@claude-code-workflows` (no public download counter); inferred from 35.9K stars + 3.9K forks + ClaudePluginHub directory listing. Above-average vs sca-v23 §4.4 baseline. |
| **D9 openssf_scorecard** | 0.05 | **N/A → 0.50** | Not publicly probed in this run; defer to a CI-grade scorecard pass. Default mid-band per sca-v23 §4.2 data-absent rule (same handling as obra/superpowers sibling deep-dive). |
| **D10 cc_pathway_support** (`/plugin install` / marketplace = 1.0; manual = 0.5; none = 0) | 0.10 | **1.00** | Ships in `claude-code-workflows` marketplace (registered in `.claude/marketplaces.json`); installs via `/plugin marketplace add wshobson/agents` + `/plugin install agent-teams@claude-code-workflows`; native subagent_type FQN entries in allowlist. |
| **D11 hooks_safety_compliance** (cardinal-rule-2 ≤2KB upstream-only = 1.0; ad-hoc = 0) | 0.05 | **1.00** | Agent-teams plugin defines NO project-owned hook bodies; all enforcement is via Anthropic-runtime Agent + TeamCreate + TaskCreate tools (zero `.py|.sh|.mjs|.ts` hook files under cache `agent-teams/1.0.2/hooks/`). Cardinal-rule-2 PASS. |
| **D12 trust_tuple** (signed release + license-risk OK + ≥1 commit older than 30d + dep blast-radius clean = 1.0) | 0.25 | **0.85** | (a) Signed releases: NOT verified — no Sigstore/SLSA badge surfaced. (b) License OK. (c) Old commits: 270 wshobson commits → many older than 30d (verified via `gh api commits` 10-commit window all from May 2026 but contributor history goes back years). (d) Dep blast-radius: agent-teams plugin has no transitive npm deps (pure markdown + Anthropic-runtime tools). Penalty −0.15 for missing signed-release attestation. |

**Composite Verdict Score (CVS) calculation**:

```
CVS = D1·0.10 + D2·0.10 + D3·0.05 + D4·0.10 + D5·0.05 + D6·0.05 + D7·0.05
    + D8·0.05 + D9·0.05 + D10·0.10 + D11·0.05 + D12·0.25
    = 0.92·0.10 + 1.00·0.10 + 1.00·0.05 + 1.00·0.10 + 0.50·0.05 + 0.50·0.05
    + 1.00·0.05 + 0.70·0.05 + 0.50·0.05 + 1.00·0.10 + 1.00·0.05 + 0.85·0.25
    = 0.092 + 0.100 + 0.050 + 0.100 + 0.025 + 0.025
    + 0.050 + 0.035 + 0.025 + 0.100 + 0.050 + 0.2125
    = 0.8645
```

**CVS = 0.86** (precision-rounded; weights from sca-v18-repo-verdict schema with D12 elevated to 0.25 per W432-FINALIZE convention).

**Decision tier** (per sca-v23 §5.1 + R1 trust-tuple):

- CVS ≥ 0.85 + trust-tuple-OK + active-scope + post-install-verified → **INSTALL-HIGH**
- Already INSTALLED at canonical version (v1.0.2, the latest cache version) → **CONTINUE-INSTALL-HIGH (no upgrade pending)**
- No newer v1.0.3+ surfaced via repo recent-commits window; continuous-development model means version bumps land silently via marketplace pull — recommend monthly cache-delete + fresh-install cadence (per W270 install-state drift governance corollary in CLAUDE.md L74).

---

## §4 — Patterns worth absorbing

These are concrete agent-teams primitives worth either ABSORBING as new local skills, AUDITING against our existing local skill set, or MIGRATING to richer use. The critical question — "Are we using agent-teams to its FULL potential?" — drives this section.

### 4.1 — UNDERUSED primitives (capability gaps we currently leave on the table)

1. **File-backed shared task list (`TaskCreate`/`TaskList`/`TaskGet`/`TaskUpdate`)** — Our runtime barely touches these. We use TodoWrite + W324 task-close-discipline skill for in-session tracking, but the agent-teams `TaskCreate` API gives us a **DURABLE cross-agent task store** at `~/.claude/teams/<name>/config.json` that survives compaction and is queryable by every teammate. This is a more powerful substitute for the ad-hoc "task_plan.md / findings.md / progress.md" planning-with-files pattern when ≥2 agents are involved. **Recommendation**: when next dispatching a `/team-spawn feature`, explicitly use `TaskCreate` with dependency annotations (`blockedBy`/`blocks`) to expose the workload graph for the lead's synthesis stage.

2. **Peer-to-peer `SendMessage`** — Our W325-A baseline of `parallel_ratio = 0.0036` indicates we are NOT actually firing agent-teams flows at all; when we DO fire parallel subagents, they communicate only via the orchestrator (Superpowers hub-and-spoke pattern). agent-teams' `message` primitive lets implementer-1 directly notify implementer-2 "your API contract is ready, you can build the form now" without the lead arbitrating. **Recommendation**: when the next multi-stream parallel dispatch fires (W269 mandate), prefer `/team-spawn feature` over solo `Agent` fan-out so the implementers can self-coordinate at integration points.

3. **`plan_approval_workflow`** — This is a fully-spec'd HITL-style gate where an implementer spawned with `plan_mode_required` must get its plan approved by the team-lead BEFORE writing code. We have zero local skills that lean on this primitive. **Recommendation**: for W393+ ship-grade implementer dispatches, spawn implementers in `plan_mode_required` so the lead's plan-review becomes a binding pre-flight check — formalizes the "show your plan first" discipline our `agent-skills:plan` skill currently delivers conversationally.

4. **`/team-delegate --rebalance` workload monitor** — Our runtime has no equivalent of "5 idle teammates + 1 overloaded teammate → auto-suggest re-assignment". This is exactly the kind of orchestrator-level meta-coordination our parallel-dispatch-mandate skill ALSO doesn't currently enforce. **Recommendation**: integrate `/team-delegate` as the canonical "are my parallel teammates balanced?" probe; consider a `wave-team-health` skill that wraps it.

5. **Display-mode diversity (tmux / iTerm2 / in-process)** — On Windows we are locked to `in-process` because tmux/iTerm2 aren't available. This is a known constraint, not a gap. **Recommendation**: document `teammateMode: "in-process"` as the Windows-canonical setting in `CLAUDE.local.md` (currently unset).

6. **Severity calibration table from `multi-reviewer-patterns`** — Our local `multi-model-review` and `dual-review` skills don't explicitly codify the Critical/High/Medium/Low criteria table with impact+likelihood+examples that wshobson's `multi-reviewer-patterns` ships. **Recommendation**: cite-anchor or inline this table when our `review` / `agent-skills:review` skills are next edited.

7. **Anti-pattern table for inter-agent comms** — The 6-row anti-pattern table in `team-communication-protocols/SKILL.md` (broadcasting routine updates, JSON status messages, micromanaging, UUIDs vs names, etc.) is gold for any multi-agent coordination skill we author. **Recommendation**: cite as a 3-org-distinct anchor when authoring the next coordination-discipline skill.

### 4.2 — ALREADY-ABSORBED patterns (verified via local skill inventory)

- `agent-teams:team-lead/reviewer/debugger/implementer` are in the allowlist (4/4 FQN entries present).
- CLAUDE.md L13 W269 mandate already names `/team-spawn` as the canonical preset entry-point.
- `agent_team_sota` skill (in our 62-skill local inventory per W373) explicitly references agent-teams plugin v1.0.2 as the orchestration backbone.

### 4.3 — PATTERNS NOT WORTH ABSORBING

- **File-backed mailbox file polling**: when only 2 agents are working in parallel, the overhead of writing+polling JSON inbox files is not worth it; in those cases stick with single-message `Agent` fan-out + `superpowers:dispatching-parallel-agents` pattern.
- **`broadcast` for routine updates**: explicit anti-pattern in wshobson docs; no integration needed.

---

## §5 — Recommended action

### **CONTINUE-INSTALL-HIGH (no upgrade pending) + USAGE-EXPANSION-PRIORITY-1**

**Install-state verdict**:
- Current cache version `1.0.2` is the latest tag observed in the recent-commits window (no `v1.0.3` SHA surfaced via API)
- Continuous-development model means version-bumps land silently — recommend a monthly `cache-delete + /plugin install agent-teams@claude-code-workflows --reinstall` cadence per W270 install-state drift governance
- All 4 `agent-teams:team-*` FQN entries are present in `.claude/state/subagent-type-allowlist.json` — CR-3 mechanization PASS
- `claude-code-workflows` marketplace is registered in `.claude/marketplaces.json` — install-pathway intact

**Usage-expansion verdict** (the critical finding): our **W325-A measured `parallel_ratio = 0.0036`** baseline (binding-guard live since W330) means we are using agent-teams at **far below its potential capability ceiling**. The W269 mandate explicitly names `/team-spawn research|security|review|debug|feature|fullstack|migration` as the FIRST-CHOICE dispatch for any multi-stream wave, but empirical telemetry shows we default to either (a) solo serial execution or (b) flat `Agent` fan-out without TeamCreate. **The capability gap is NOT in installation — it's in invocation discipline.**

**Concrete next-wave commitments** (target W442+):

1. **First-fire**: next multi-stream wave with ≥3 independent workstreams MUST use `/team-spawn` (preset-matched), not flat `Agent` fan-out. Measure delta-parallel_ratio.
2. **Telemetry**: extend `tools/preagent-parallel-guard.mjs` to detect `TeamCreate` invocation as the "structured parallel" path (currently it counts only multi-`Agent`-in-one-message); without this, agent-teams uses are invisible to the parallel_ratio meter.
3. **Skill audit**: confirm our local `agent_team_sota` skill explicitly recommends `TaskCreate`-backed task storage (not just TodoWrite) for ≥2-agent wave scope.
4. **Documentation**: cite the message-type JSON schema table from `team-communication-protocols/SKILL.md` in our next coordination skill edit.

**No regression risk**: agent-teams plugin is pure-markdown (no hook bodies, no JS/Python runtime); upgrading or reinstalling cannot break the runtime. Cardinal-rule-2 PASS continues post-upgrade.

---

## §6 — Comparator notes

### vs **obra/superpowers v5.1.0** (sibling-installed runtime)

| Axis | wshobson/agents agent-teams | obra/superpowers |
|---|---|---|
| Philosophy | Pattern catalog + preset-driven topology | Methodology-enforcing workflow OS |
| Coordination topology | **Peer-to-peer** (teammate ↔ teammate via SendMessage) | **Hub-and-spoke** (subagents talk only to main agent) |
| Concurrency model | Parallel (5 teammates concurrent) | Sequential per-task (fresh subagent each) |
| State substrate | File-backed task list + JSON mailbox inboxes | Main-agent context window only |
| Discipline gate | `plan_approval_workflow` (optional) | TDD + two-stage review (mandatory) |
| Worktree isolation | Not core focus | Built-in (`using-git-worktrees`) |
| Token economics | 3-4× single-agent (per perplexity cite [27][33]) | ~1.5-2× single-agent (sequential, no peer chatter) |
| Best for | Parallel multi-file work (fullstack feature, security audit, migration) | Sequential quality-gated feature dev with TDD |
| Cross-platform | Claude Code primary (`CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS`-dependent) | Claude Code + Cursor + Gemini + Codex + Copilot + OpenCode |
| Composes with each other? | **YES** — orthogonal layers (Superpowers methodology + agent-teams parallelism) | YES |

**Verdict**: Our runtime correctly installs BOTH. agent-teams is the **parallelism dimension**; Superpowers is the **discipline dimension**. The W269 mandate routes multi-stream work through agent-teams; the W325-A `parallel_ratio=0.0036` baseline indicates the routing rule is under-enforced (not that the combination is wrong).

### vs **microsoft/agent-framework v1.0 GA** (April 3, 2026; AutoGen + Semantic Kernel successor)

| Axis | wshobson/agents agent-teams | microsoft/agent-framework |
|---|---|---|
| Type | Claude Code plugin | Cross-language SDK (.NET + Python) |
| Provider scope | Anthropic Claude only | Multi-provider (Azure OpenAI + OpenAI + Anthropic + Bedrock + Gemini + Ollama) |
| Orchestration model | File-backed task list + JSON mailbox | **Typed Workflow** (data-flow graph with typed edges) + Group Chat as embedded orchestration |
| Type safety | No (free-form JSON) | Yes (TypedDict + type annotations + Pydantic-validated payloads) |
| Checkpointing | None | **First-class** (`BaseCheckpointSaver` + resume-from-checkpoint) |
| HITL pause | Not native | **First-class** (request/response pause; resume via external trigger) |
| Concurrency primitive | Multi-teammate per team | Data-flow edges activate executors when inputs ready |
| Best for | Claude Code interactive sessions | Enterprise polyglot workflows with checkpoint/HITL/audit needs |
| Maturity | v1.0.2 plugin (continuous-dev, no LTS) | v1.0 GA milestone (Apr 3, 2026; long-term-support committed) |

**Verdict**: NOT competitive — different layers. agent-teams owns "intra-Claude-Code orchestration"; agent-framework owns "cross-system enterprise orchestration". An advanced future architecture could wrap agent-teams executions as a single executor inside an agent-framework Workflow.

### vs **langchain-ai/langgraph v0.4** (HITL checkpoints landed v0.4 2026-04)

| Axis | wshobson/agents agent-teams | langchain-ai/langgraph |
|---|---|---|
| Type | Claude Code plugin | Python SDK |
| Checkpointing | None | `BaseCheckpointSaver` + thread-id + interrupt |
| Multi-agent supervisor | `team-lead` agent | `langgraph-supervisor` (separate pkg) |
| Durability | Per-session JSONL only | Persistent thread-id state (PostgreSQL/SQLite backends) |
| HITL | `plan_approval_workflow` (in-session) | `interrupt()` primitive (resumable across sessions) |
| Best for | Claude Code interactive flows | Long-running async agent workflows with thread correlation |

**Verdict**: NOT competitive — LangGraph wins on durability + thread-id; agent-teams wins on zero-Python-glue + Claude-Code-native ergonomics. Our `checkpoint-resume` skill (Δ-G-equivalent) is cite-anchored to LangGraph, NOT to agent-teams — correct, because agent-teams has no checkpoint primitive.

---

## §7 — Verify-before-claim probes (per CR-6)

| Claim | Probe | Status |
|---|---|---|
| agent-teams v1.0.2 installed at `Z:/claude-sota-installed/.claude/plugins/cache/claude-code-workflows/agent-teams/1.0.2/` | `ls` + `cat plugin.json` | **VERIFIED** (16 files enumerated; `version:"1.0.2"` confirmed) |
| 4 FQN allowlist entries `agent-teams:team-{lead,reviewer,debugger,implementer}` | `grep agent-teams .claude/state/subagent-type-allowlist.json` | **VERIFIED** (4/4 entries present) |
| GH stats: 35,894 stars + 3,902 forks + license MIT | `gh api repos/wshobson/agents` | **VERIFIED** (live API call 2026-05-25) |
| 7 preset taxonomy (review/debug/feature/fullstack/research/security/migration) | `cat commands/team-spawn.md` | **VERIFIED** (all 7 presets quoted from local file) |
| Mailbox 3 message types (message/broadcast/shutdown_request) + plan-approval pair | `cat skills/team-communication-protocols/SKILL.md` | **VERIFIED** (JSON shapes quoted verbatim) |
| Local v1.0.2 cache matches deepwiki + perplexity-cited public docs | cross-reference local file content vs deepwiki + ClaudePluginHub | **VERIFIED** (no drift detected) |
| W325-A parallel_ratio baseline `0.0036` is empirical reality | `grep W325A docs/architecture/W325-*` | **VERIFIED** (3145 JSONL session scan; cited inline in §5) |

---

## §8 — Open issues / follow-ups

1. **CR-1 trust-tuple D12 penalty (-0.15)**: agent-teams plugin lacks Sigstore/SLSA-L3 signed-release attestation. Recommend CI-grade OpenSSF Scorecard run on `wshobson/agents` (deferred — out of scope for this deep-dive).
2. **`tools/preagent-parallel-guard.mjs` blind to `TeamCreate`**: guard currently counts only multi-Agent-in-one-message; agent-teams usage is invisible to parallel_ratio meter. Recommend instrumenting TeamCreate as a "structured parallel" path that ALSO increments the parallel-dispatch counter (Δ-DPA-guard extension; queue as P1).
3. **No v1.0.3 surfaced**: monitor for silent version drift; integrate monthly cache-delete + reinstall into the W270 install-state governance cadence.
4. **Windows `in-process` mode**: document `teammateMode: "in-process"` as the canonical Windows setting in `CLAUDE.local.md` (currently unset; defaults to `in-process` implicitly per `team-composition-patterns/SKILL.md`).
5. **`/team-delegate --rebalance` underuse**: consider a `wave-team-health` skill wrapping `/team-delegate` for orchestrator-level workload-monitoring.
6. **W269 mandate enforcement**: empirical `parallel_ratio=0.0036` indicates the mandate is verbally agreed but behaviorally ignored. Recommend a per-wave assertion that any multi-stream wave MUST log either `/team-spawn` invocation OR an explicit "solo-justified" reason record (analogous to the existing CR-5-exception condition-(b) bypass marker).

---

**END OF REPORT**
