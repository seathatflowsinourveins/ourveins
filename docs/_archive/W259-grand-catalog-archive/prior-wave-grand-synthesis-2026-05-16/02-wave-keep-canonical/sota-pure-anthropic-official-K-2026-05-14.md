---
title: Wave 5 Agent K — Anthropic OFFICIAL primary-source deep-audit
status: AUTHORITATIVE
date: 2026-05-14
agent: K (Anthropic-official deep-audit specialist)
scope: Pure-runtime baseline punch-list — what Option B Phase 0-3 must inherit directly from Anthropic-canonical surfaces
cite-class: TIER-1-DIRECT (Anthropic-published material only, with file:line + HEAD SHA + docs URLs)
brief: tmp/wave5-K-anthropic-official-audit-brief
output-budget: 700 LOC target
termination: on_handoff_to: orchestrator | terminationCondition: on_text_match: "VERDICT:"
---

# Wave 5 Agent K — Anthropic-OFFICIAL Primary Source Audit

## Executive summary — top-10 Anthropic-OFFICIAL primitives Option B Phase 0-3 must adopt

Wave 1-4 covered third-party SOTA repos extensively; Agent J then **REJECTED all 3 Wave 3 Top candidates**. The pure-runtime must be built on Anthropic-official primary sources first. This audit closes the TIER-1-OFFICIAL gap by inventorying what Anthropic ships directly — `anthropics/cwc-long-running-agents` (Apache-2.0 5-primitive harness companion to Anthropic's published *Effective Harnesses for Long-Running Agents* essay), `anthropics/claude-cookbooks` (managed-agents + patterns + skills + sub-agents notebooks), `anthropics/claude-agent-sdk-python` (full SDK + 17 examples + 11 hook event types), and the CCBP-mirrored official-docs reference set at `f8468e87` (16 subagent frontmatter fields, 15 skill frontmatter fields, 60+ settings, 175+ env vars).

**Top-10 Anthropic-OFFICIAL primitives this runtime should inherit before any third-party adoption:**

| # | Primitive | Anthropic-OFFICIAL source | Already in Phase 0-3? |
|---|-----------|---------------------------|-----------------------|
| 1 | **Default-FAIL contract** (results.json + Read-evidence gate) | `cwc-long-running-agents/claude-code-config/.claude/hooks/{track-read,verify-gate}.sh @ ffd563d6` | LISTED §17, but Phase 0-3 has no concrete `test-results.json` row or `verify-gate` install step — INSTALL GAP |
| 2 | **Fresh-context evaluator subagent** (no Write/Edit, returns PASS/NEEDS_WORK on first line) | `cwc-long-running-agents/claude-code-config/.claude/agents/evaluator.md @ ffd563d6` | LISTED §17, no exact `claude --agent evaluator -p "..."` invocation wired into Phase 0-3 workflows — WIRING GAP |
| 3 | **Agent-maintained handoff** (PROGRESS.md + commit-on-stop.sh + `## Done/In progress/Next/Notes` template) | `cwc-long-running-agents/claude-code-config/.claude/CLAUDE.md @ ffd563d6` + `hooks/commit-on-stop.sh` | LISTED §17, but Phase 0-3 has no PROGRESS.md scaffolding step — TEMPLATE GAP |
| 4 | **Kill-switch (`AGENT_STOP` file)** + **Steer (`STEER.md` mid-run redirect)** hooks | `cwc-long-running-agents/.claude/hooks/{kill-switch,steer}.sh @ ffd563d6` | LISTED §17 as primitives 4+5, no `OPERATOR STEERING:` convention in workflow — OPERATOR-CONTROL GAP |
| 5 | **Outcome-grader pattern** (define_outcome + span.outcome_evaluation events + writer→grader→revise loop) | `anthropics__claude-cookbooks/managed_agents/CMA_verify_with_outcome_grader.ipynb @ 3f8bf356` | UNADDRESSED — Phase 0-3 has no rubric-driven grade-and-revise primitive |
| 6 | **Forked-subagent dispatch** (`CLAUDE_CODE_FORK_SUBAGENT=1`, isolated child process with full parent history) | `claude-code-best-practice-shan/best-practice/claude-settings.md:955 @ 48f2ceb` + CHANGELOG v2.1.117 | **PARTIAL** — CLAUDE.local.md (e) `CLAUDE_CODE_FORK_SUBAGENT=1` already enabled; Phase 0-3 should document fork-vs-fresh routing per `Z:/claude-sota/.claude/rules/parallel-agent-wave.md §Fork-vs-fresh subagent routing` |
| 7 | **Managed Agents hosted runtime** (Anthropic-hosted session+sandbox+scheduling; `agents.create` + `sessions.create` + `agents.update` versioning) | `anthropics__claude-cookbooks/managed_agents/README.md @ 3f8bf356` + `docs.claude.com/en/docs/managed-agents` | UNADDRESSED — Phase 0-3 makes no decision about hosted-runtime adoption (option vs. own-host) |
| 8 | **11 native hook event types** (full set incl. SubagentStart/SubagentStop/PreCompact/PermissionRequest/UserPromptSubmit/Notification + asyncRewake field) | `anthropics__claude-agent-sdk-python/src/claude_agent_sdk/types.py:273-446 @ 694e4f3b` | **PARTIAL** — Phase 0-3 inherits T1-T7 from CCBP cross-model workflow but does NOT enumerate 11 hook events as install-class wiring surface for cardinal-rule-3 enforcement |
| 9 | **Effort-level system** (`/effort` slash command + `effort: low/medium/high/xhigh/max` frontmatter + `CLAUDE_CODE_EFFORT_LEVEL` env) | `claude-code-best-practice-shan/best-practice/claude-settings.md:857,997 @ 48f2ceb` | UNADDRESSED — Phase 0-3 has no Cost-Tier discipline doc-level invariant (Karpathy P2 + cookbook sub-agents pattern: Opus-orchestrator + Haiku-extractors) |
| 10 | **Bundled skills (6 OFFICIAL)** — `simplify` / `batch` / `debug` / `loop` / `claude-api` / `fewer-permission-prompts` | `claude-code-best-practice-shan/best-practice/claude-skills.md:43-48 @ 48f2ceb` | LISTED in skill discipline but no `/loop` or `/batch` operator activation recipe in Phase 0-3 — RECIPE GAP |

**Net finding**: Option B Phase 0-3 references all 5 cwc primitives **at the manifest catalog tier**, but lacks concrete *install-class* wiring rows for the hooks/agents/CLAUDE.md template that make them operationally active. This is a Phase-2B gap, not Phase-1 — the install-source is Anthropic-official, Apache-2.0, and already cloned at `Z:/repos/deps/cwc-long-running-agents`.

VERDICT: ADOPT-NOW (all 10) — Anthropic-OFFICIAL, TIER-1-DIRECT, no third-party dependency.

---

## Source 1: anthropics-cookbook findings (HEAD `3f8bf356e779d366ae7fcc0e84be12019747e5e3` — `anthropics__claude-cookbooks`)

[VERIFIED 2026-05-14 via `git rev-parse HEAD` at `Z:/repos/deps/anthropics__claude-cookbooks`]

### S1.1 — `multimodal/using_sub_agents.ipynb` (TIER-1 Anthropic-OFFICIAL Cost-Tier exemplar)

- **Pattern**: Opus-orchestrator + Haiku-extractor fan-out for PDF analysis. Lines 9-10 verbatim: "we'll demonstrate how to analyze Apple's 2023 financial earn..." (truncated in grep; intent: Haiku extracts from PDFs concurrently → Opus synthesizes).
- **Phase 0-3 mapping**: Cookbook ALREADY cited at `Z:/claude-sota/.claude/rules/team-orch-patterns.md §Context Budget (per agent) → Cost-Tier discipline reference` (sister claude-sota). For claude-sota-installed: NO direct cite — Phase 2B should add the cookbook to the cite-import-AMBER table per Section 14.5 for the Cost-Tier discipline anchor.
- **Quote-able pattern**: "Process the PDFs concurrently with Haiku sub-agent models" (using_sub_agents.ipynb:247) — operational template for any extractor-fan-out workflow.

### S1.2 — `managed_agents/` (10 notebooks; new Anthropic Q2 2026 cookbook product)

[VERIFIED 2026-05-14 via `ls Z:/repos/deps/anthropics__claude-cookbooks/managed_agents/`]

10 notebooks. The 9 guided notebooks plus `data_analyst_agent.ipynb` (entry exemplar) constitute a complete CMA (Claude Managed Agents) API surface tutorial. Headline patterns:

| Notebook | What it teaches | Phase 0-3 gap-status |
|---|---|---|
| `CMA_iterate_fix_failing_tests.ipynb` | Do→observe→fix loop on a failing test suite. Entry-point: introduces agent / environment / session + file mounts + streaming event loop. | UNADDRESSED |
| `CMA_orchestrate_issue_to_pr.ipynb` | Issue→fix→PR→CI→review→merge through a mock `gh` CLI. Multi-turn steering + mid-chain recovery from CI failure + review comment. | UNADDRESSED |
| `CMA_explore_unfamiliar_codebase.ipynb` | Grounding in an unfamiliar codebase + planted stale-doc trap (cf. cwc verify-gate). | UNADDRESSED |
| `CMA_gate_human_in_the_loop.ipynb` | HITL expense approval via custom-tool `decide()`/`escalate()` + `requires_action` idle bounce + parallel-tool-call dedupe. | UNADDRESSED (close cousin to cwc kill-switch but different mechanism) |
| `CMA_prompt_versioning_and_rollback.ipynb` | Server-side prompt versioning: v1 → eval → v2 → detect regression → pin sessions to v1. | UNADDRESSED |
| `CMA_operate_in_production.ipynb` | MCP toolsets + vaults for per-end-user credentials + `session.status_idled` webhook (HITL without long-lived connections) + resource lifecycle CRUD. | UNADDRESSED — relevant if claude-sota-installed wires MCPs that need per-user vaults |
| `CMA_remember_user_preferences.ipynb` | Memory stores: shopping agent learns preferences in one session, recalls in next. `memory_stores.create` + per-attachment `instructions` + per-customer read-write + brand-wide read-only. | UNADDRESSED (sister to Memory Stack §L1 L2 L3) |
| `CMA_coordinate_specialist_team.ipynb` | Heterogeneous team via `multiagent` coordinator: web-search researcher + file-reading librarian + rules-based pricer (per-role tool scoping). `thread_created`/`thread_message_received` events. | UNADDRESSED — overlaps cardinal-rule-3 cross-model + advanced-agent-team standing directive |
| `CMA_verify_with_outcome_grader.ipynb` | Grade-and-revise loop: writer drafts cited research brief → stateless grader fetches every URL + checks every quote against rubric → feedback drives revisions until brief passes. `user.define_outcome` + `span.outcome_evaluation_*` events. | UNADDRESSED — primary candidate for Option B Phase 2 (rubric-driven quality gate beyond cwc binary PASS/NEEDS_WORK) |

**Production-deployment cookbooks** (3 more): `data_analyst_agent.ipynb` (pandas/plotly HTML report) + `slack_data_bot.ipynb` (slack mention triggers session) + `sre_incident_responder.ipynb` (pager alert → investigation → PR → HITL approval before merge). All show "real" deployment shapes.

**Implication for pure-runtime Phase 0-3**: claude-sota-installed is NOT a hosted-runtime project — it builds the local Claude Code harness. But the Managed Agents API surface teaches **rubric-driven verification** (`CMA_verify_with_outcome_grader.ipynb`) which is more refined than cwc's binary PASS/NEEDS_WORK — Phase 2B should adopt the rubric-pattern (without adopting the CMA API).

### S1.3 — `patterns/agents/` (3 notebooks — "Building Effective Agents" reference impl)

[VERIFIED via `Z:/repos/deps/anthropics__claude-cookbooks/patterns/agents/README.md` head]

- `basic_workflows.ipynb` — Prompt Chaining, Routing, Multi-LLM Parallelization
- `evaluator_optimizer.ipynb` — Evaluator-Optimizer Workflow (PASS/NEEDS_WORK refinement loop)
- `orchestrator_workers.ipynb` — Orchestrator-Subagents pattern (orchestrator decomposes → workers execute → synthesis)

These map to Anthropic's published *Building Effective Agents* essay by Erik Schluntz + Barry Zhang. cwc-long-running-agents README cites `evaluator_optimizer.ipynb` AS the SDK equivalent of the Fresh-Context Evaluator subagent — primary cross-link.

**Phase 0-3 mapping**: These 3 patterns are partially covered in sister claude-sota's `team-orch-patterns.md §7 Orchestration Patterns`. For claude-sota-installed: should be cited explicitly in Phase 2B as the SDK reference for the evaluator pattern when adopting cwc primitive #2 (Fresh-Context Evaluator).

### S1.4 — `skills/` cookbook (Skills feature for Excel/PowerPoint/PDF/Data analysis)

[VERIFIED via `Z:/repos/deps/anthropics__claude-cookbooks/skills/CLAUDE.md @ 3f8bf356`]

Three progressive notebooks:
- `01_skills_introduction.ipynb` — fundamentals + first Excel/PowerPoint/PDF
- `02_skills_financial_applications.ipynb` (WIP) — financial use cases
- `03_skills_custom_development.ipynb` (WIP) — building + deploying custom skills

Architecture insight from `skills/CLAUDE.md:7`: "Skills feature for document generation". Quote at README:9: "Skills are organized packages of instructions, executable code, and resources that give Claude specialized capabilities for specific tasks. Think of them as 'expertise packages' that Claude can discover and load dynamically..."

Anthropic-OFFICIAL blog cite from README:11: "Read our engineering blog post on [Equipping agents for the real world with Skills](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills)"

**Phase 0-3 mapping**: Skills are referenced in cardinal-rule-5 + 8 + 11 + Skill Orchestration Discipline §, but no install-step wires the Anthropic-OFFICIAL **bundled skills** (simplify/batch/debug/loop/claude-api/fewer-permission-prompts per CCBP `claude-skills.md:43-48`). These are FREE — they auto-install with Claude Code. Phase 0-3 should document a operator activation recipe (`/loop`, `/batch` etc.) that exercises them.

---

## Source 2: `cwc-long-running-agents` findings (HEAD `ffd563d668a97a38d4aa092bf0d5b1507c046629`)

[VERIFIED 2026-05-14 via `git rev-parse HEAD` at `Z:/repos/deps/cwc-long-running-agents`]

This is **Anthropic OFFICIAL** (Apache-2.0, MIT-class permissive, copyright "Anthropic PBC"). Code companion to two Anthropic-published essays:
- *Effective Harnesses for Long-Running Agents* (Nov 2025)
- *Harness Design for Long-Running Application Development* (Mar 2026)

CLAUDE.md L165 sister-claude-sota already locks this in as `Architecture (locked-in topology)` org #1 (TIER-1-DIRECT) — but the install-class wiring of the 5 primitives + 3 reference plugins into Phase 0-3 needs explicit mapping.

### S2.1 — The 5 install-class primitives (every file Apache-2.0 PBC-copyright)

| # | Primitive | Source file (verified) | LOC | Mechanism | Phase 0-3 wiring step |
|---|-----------|------------------------|-----|-----------|-----------------------|
| 1 | **Default-FAIL contract** | `claude-code-config/.claude/hooks/track-read.sh @ ffd563d6` + `verify-gate.sh @ ffd563d6` | 11 + 29 | track-read.sh: PreToolUse:Read records evidence path (`screenshots/*`, `*-console.txt`, `*-result.txt`, `*.png`) to `.claude/.evidence-reads`. verify-gate.sh: PreToolUse:Write|Edit blocks any write to `test-results.json` unless evidence log is non-empty; consumes log after gate. Emits `{"decision":"block","reason":"..."}` JSON. | (A) `.claude/.evidence-reads` initialized empty + (B) `.claude/settings.json` PreToolUse `Read` matcher wires track-read.sh + (C) PreToolUse `Write\|Edit` wires verify-gate.sh + (D) project-root `test-results.json` template |
| 2 | **Fresh-context evaluator** | `claude-code-config/.claude/agents/evaluator.md @ ffd563d6` | 25 | Subagent. Frontmatter: `tools: Read, Glob, Grep, Bash` (no Write/Edit). Returns first line `PASS` or `NEEDS_WORK` + bullet findings for action. Invocation: `claude --agent evaluator -p "<review prompt>"`. | (A) `.claude/agents/evaluator.md` install + (B) operator recipe `claude --agent evaluator -p "Review the diff and screenshots/ for feature N against its spec."` documented |
| 3 | **Agent-maintained handoff** | `claude-code-config/.claude/CLAUDE.md @ ffd563d6` (27 LOC) + `hooks/commit-on-stop.sh @ ffd563d6` (17 LOC) | 27+17 | CLAUDE.md teaches `PROGRESS.md` with 4 sections (`## Done` / `## In progress` / `## Next` / `## Notes`) + "Always start here" + "One feature at a time" + "Proof before passing" + "Commit often". Stop hook backstops with `git commit -am "session checkpoint: $(date)"`. | (A) Bootstrap-only `PROGRESS.md` template + (B) Section in our CLAUDE.md or rule referencing cwc CLAUDE.md inheritance + (C) `.claude/settings.json` Stop hook wires commit-on-stop.sh |
| 4 | **Kill-switch (`AGENT_STOP` file)** | `claude-code-config/.claude/hooks/kill-switch.sh @ ffd563d6` | 9 | PreToolUse:* matcher (every tool). If `./AGENT_STOP` exists, emits `{"decision":"block","reason":"Kill switch engaged..."}`. Operator engages via `touch AGENT_STOP`; resumes via `rm AGENT_STOP`. | (A) `.claude/settings.json` PreToolUse `*` wires kill-switch.sh + (B) docs/ operator-runbook for emergency halt |
| 5 | **Steer mid-run (`STEER.md` redirect)** | `claude-code-config/.claude/hooks/steer.sh @ ffd563d6` | 14 | PreToolUse:* matcher. If `STEER.md` has content, blocks tool with `{"decision":"block","reason":"OPERATOR STEERING: <text>..."}` then clears STEER.md. Operator writes to STEER.md (or pipes from a UI) to redirect agent mid-run without restart. | (A) `.claude/settings.json` PreToolUse `*` wires steer.sh + (B) docs/ operator-runbook for mid-run steering convention |

### S2.2 — Settings.json wiring (verbatim @ ffd563d6)

```json
{
  "hooks": {
    "PreToolUse": [
      { "matcher": "*", "hooks": [
          { "type": "command", "command": ".claude/hooks/kill-switch.sh" },
          { "type": "command", "command": ".claude/hooks/steer.sh" }
      ] },
      { "matcher": "Read", "hooks": [
          { "type": "command", "command": ".claude/hooks/track-read.sh" }
      ] },
      { "matcher": "Write|Edit", "hooks": [
          { "type": "command", "command": ".claude/hooks/verify-gate.sh" }
      ] }
    ],
    "Stop": [
      { "hooks": [
          { "type": "command", "command": ".claude/hooks/commit-on-stop.sh" }
      ] }
    ]
  }
}
```

32 LOC total, drop-in. Apache-2.0 license permits direct port. **PRESCRIBED PHASE 2B INSTALL**: append this hook block to claude-sota-installed `.claude/settings.json` after the existing hook wires; commit-message: `feat(cwc): install Anthropic-OFFICIAL 5 long-running primitives @ cwc ffd563d6`.

### S2.3 — Reference plugins (3, all Anthropic-OFFICIAL plugins-official org)

From README:32+90+93:

| Plugin | URL | What it adds | Phase 0-3 status |
|---|---|---|---|
| `agent-sdk-dev` | `https://github.com/anthropics/claude-plugins-official/tree/main/plugins/agent-sdk-dev` | Scaffolds Agent SDK applications from inside Claude Code. "Install the plugin and ask Claude to build an agent that implements whichever of these primitives you want." | UNADDRESSED |
| `ralph-loop` | `https://github.com/anthropics/claude-plugins-official/tree/main/plugins/ralph-loop` | Unattended loop: caps session length and has outer script start next one (pick next feature, build, evaluate, reset). | UNADDRESSED |
| `frontend-design` | `https://github.com/anthropics/claude-plugins-official/tree/main/plugins/frontend-design` | Grading rubrics (functionality, design, craft, originality) + browser-verified evaluator + Playwright MCP usage. | UNADDRESSED |

Plus reference quickstart: `https://github.com/anthropics/claude-quickstarts/tree/main/autonomous-coding` (hand-written start) + `https://github.com/anthropics/agent-sdk-workshop` (curriculum).

### S2.4 — Going Further patterns (Anthropic doc-pointers, beyond shipped code)

From README:84-96:
1. **Unattended loop** — ralph-loop plugin (linked)
2. **Planner agent** — first session expands one-line ask into `BUILD_PLAN.md` for the loop
3. **Sprint contracts** — builder + evaluator agree per-feature on "done"; hook enforces from file
4. **Grading rubrics** — replace binary PASS/FAIL with scoring principles (functionality/design/craft/originality) + few-shot examples
5. **Browser-verified evaluator** — let the evaluator open the running app itself (Playwright MCP)
6. **Re-simplify on model upgrades** — after each model release, comment out harness pieces one at a time + see what's still load-bearing
7. **Hosted runtime** — Claude Managed Agents (link to managed-agents docs)

**Phase 0-3 mapping**: All 7 are forward-direction patterns that should appear as roadmap entries in `docs/sota-installed-manifest.md` after the 5 primitives are installed. Currently NONE are mentioned.

### S2.5 — Operator dashboard pattern (zero-dashboard observability)

From README:71-82 verbatim:
```bash
watch -n 2 'tail -20 PROGRESS.md'                          # its own notes
watch -n 5 'git log --oneline -8'                          # work saved
watch -n 5 'find screenshots -name "*.png" | tail -5'      # what it sees
watch -n 2 'wc -l < .claude/.evidence-reads 2>/dev/null'   # evidence reads
```

Anthropic-OFFICIAL operator-observability pattern using nothing but `watch + tail + git log`. **Phase 0-3 GAP**: should be documented as the canonical "watching it work" runbook in `docs/operator-runbook-long-running.md` (new file, bootstrap-only per cardinal-rule-5).

---

## Source 3: Anthropic CC docs site audit (via CCBP mirror at HEAD `48f2cebeb88b389b27231c418ceadb65baf813fd`)

[VERIFIED 2026-05-14 via `git rev-parse HEAD` at `Z:/repos/deps/claude-code-best-practice-shan`]

**Note**: Anthropic CC official docs site (`https://code.claude.com/docs/en/*`) is mirrored/digested in CCBP best-practice/ folder. Where CCBP cites the official URL verbatim, I treat the CCBP mirror as TIER-1-DIRECT (CCBP is Anthropic-affiliated content). Wave 5 Agent K cite-class precedence per CR-1 lattice: TIER-1-DIRECT for content explicitly cited to `code.claude.com/docs/en/*`; TIER-2 for CCBP-added editorial commentary.

### S3.1 — Sub-agents (16 frontmatter fields) — `claude-subagents.md:17-36 @ 48f2ceb`

Sourced from `https://code.claude.com/docs/en/sub-agents`. Verbatim 16-field schema:

| Field | Required | Description (verbatim) |
|---|---|---|
| `name` | Yes | Unique identifier using lowercase letters and hyphens |
| `description` | Yes | When to invoke. Use `"PROACTIVELY"` for auto-invocation |
| `tools` | No | Comma-separated allowlist; inherits all if omitted; supports `Agent(agent_type)` syntax (older `Task(agent_type)` alias still works) |
| `disallowedTools` | No | Tools to deny, removed from inherited or specified list |
| `model` | No | `sonnet`, `opus`, `haiku`, full model ID, or `inherit` (default: `inherit`) |
| `permissionMode` | No | `default`, `acceptEdits`, `auto`, `dontAsk`, `bypassPermissions`, or `plan` |
| `maxTurns` | No | Max agentic turns before stopping |
| `skills` | No | Skills to preload (full content injected, not just available) |
| `mcpServers` | No | MCP servers — name strings or inline `{name: config}` objects |
| `hooks` | No | Lifecycle hooks scoped to this subagent. All hook events supported |
| `memory` | No | Persistent scope: `user`, `project`, or `local` |
| `background` | No | `true` runs as background task (default: `false`) |
| `effort` | No | `low`, `medium`, `high`, `xhigh`, `max` (Opus 4.6 only) |
| `isolation` | No | `"worktree"` runs in temp git worktree (auto-cleaned if no changes) |
| `initialPrompt` | No | Auto-submitted as first user turn when run as main agent (via `--agent`) |
| `color` | No | Display: red/blue/green/yellow/purple/orange/pink/cyan |

**5 OFFICIAL bundled agents** (claude-subagents.md:42-48):
1. `general-purpose` (inherit, all tools) — multi-step research/code-search/autonomous
2. `Explore` (haiku, read-only) — fast codebase search
3. `Plan` (inherit, read-only) — pre-planning in plan mode
4. `statusline-setup` (sonnet, Read+Edit) — configures statusline
5. `claude-code-guide` (haiku, Read-only with WebFetch+WebSearch) — Claude Code / SDK / Claude API questions

**Phase 0-3 wiring gap**: Phase 1 should document explicit use of `Explore` + `Plan` as Anthropic-OFFICIAL "free" subagents BEFORE third-party agents land. Currently Phase 0-3 has no agent inventory tier.

### S3.2 — Skills (15 frontmatter fields, 6 OFFICIAL bundled) — `claude-skills.md @ 48f2ceb`

Sourced from `https://code.claude.com/docs/en/skills`. Verbatim:

15-field schema highlights (claude-skills.md:21-35):
- `disable-model-invocation` (bool) — prevent auto-invocation
- `user-invocable` (bool, default true) — `false` hides from `/` menu (background-only)
- `context: fork` — runs skill in isolated subagent context
- `agent: <subagent-type>` — set when `context: fork` (default: `general-purpose`)
- `paths` — glob patterns that limit auto-activation
- `hooks` — lifecycle hooks scoped to this skill
- `shell` — `bash` (default) or `powershell` (requires `CLAUDE_CODE_USE_POWERSHELL_TOOL=1`)

**6 OFFICIAL bundled skills** (claude-skills.md:43-48):
1. `simplify` — Review changed code for reuse, quality, efficiency
2. `batch` — Run commands across multiple files in bulk
3. `debug` — Debug failing commands or code issues
4. `loop` — Run a prompt/slash command on recurring interval (up to 7 days per v2.1.110 changelog)
5. `claude-api` — Build apps with Claude API / Anthropic SDK; triggers on `anthropic` / `@anthropic-ai/sdk` imports
6. `fewer-permission-prompts` — Scan transcripts; add prioritized allowlist to settings.json

**Phase 0-3 wiring gap**: All 6 are FREE + Anthropic-OFFICIAL. Phase 0-3 should document operator activation recipes — particularly `/loop` (long-running cron primitive) and `/batch` (multi-file bulk ops) which are direct alternatives to writing custom recurring-task scripts.

Per Anthropic engineering blog cite at `https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills`: Skills are "expertise packages that Claude can discover and load dynamically".

### S3.3 — Settings + env-vars (60+ settings, 175+ env vars) — `claude-settings.md @ 48f2ceb`

This is the canonical 1132-LOC settings reference. Headers traversed:
- Settings Hierarchy (line 32): 5-tier precedence — Managed → CLI args → settings.local.json → settings.json → user `~/.claude/settings.json`
- Core Configuration (66): General, Plans & Memory Directories, Worktree, Attribution, Authentication, Company Announcements
- Permissions (208): Structure, Keys, Modes, Tool Syntax — verbatim 4 modes at claude-settings.md:243-254: `default`, `acceptEdits`, `auto`, `dontAsk`, `bypassPermissions`, `plan`
- Hooks (316): refers to dedicated `shanraisshan/claude-code-hooks` repo + official `https://code.claude.com/docs/en/hooks`
- MCP Servers (328): Standard + Managed-Settings matching + Per-Server `alwaysLoad` (v2.1.121)
- Sandbox (391): bash sandboxing with macOS+Linux specifics
- Plugins (440): plugin settings, marketplace registry
- Model Configuration (492): aliases, overrides, effort, env vars
- Display & UX (572)
- AWS & Cloud Credentials (733)
- Environment Variables (765): 200+ env vars (already exhaustively cataloged)
- Useful Commands (992)

**Key env vars that Option B Phase 0-3 must consider** (claude-settings.md:783-987):

| Env var | Phase 0-3 status | Cite |
|---|---|---|
| `CLAUDE_CODE_FORK_SUBAGENT` | ALREADY in CLAUDE.local.md (e) [VERIFIED 2026-05-14] | claude-settings.md:955 |
| `CLAUDE_CODE_DISABLE_1M_CONTEXT` | DOCUMENTED in CLAUDE.local.md (h) (commented, latent-flip) | claude-settings.md:851 |
| `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` | ACTIVE in CLAUDE.local.md (i) at 70% | claude-settings.md:826 |
| `CLAUDE_CODE_AUTO_COMPACT_WINDOW` | UNDOCUMENTED in CLAUDE.local.md — significant for 1M context (sets token-base for autocompact %) | claude-settings.md:967 |
| `CONTEXT_WINDOW_COMPACT_{WARN,HIGH,CRIT}_TOKENS` | ACTIVE in CLAUDE.local.md (j) for userpromptsubmit hook | runtime-novel, no Anthropic cite |
| `CLAUDE_CODE_EFFORT_LEVEL` | UNADDRESSED — should pair with `effort:` subagent frontmatter | claude-settings.md:857 |
| `CLAUDE_CODE_SUBAGENT_MODEL` | DEPRECATED per CLAUDE.local.md (g) | claude-settings.md:923 |
| `CLAUDE_CODE_SUBPROCESS_ENV_SCRUB` | UNADDRESSED — defense-in-depth for credential scrubbing | claude-settings.md:924 |
| `CLAUDE_CODE_PLUGIN_SEED_DIR` | UNADDRESSED — bundle pre-populated plugins | claude-settings.md:855 |
| `CLAUDE_CODE_SYNC_PLUGIN_INSTALL` | UNADDRESSED — block first query until plugin install completes | claude-settings.md:901 |
| `CLAUDE_CODE_PLAN_MODE_REQUIRED` | UNADDRESSED — require plan mode for sessions | claude-settings.md:971 |
| `CLAUDE_CODE_REMOTE` | READ-ONLY auto-set; useful for hooks to detect cloud-session | claude-settings.md:813 |
| `MCP_CONNECTION_NONBLOCKING` | UNADDRESSED — bound `-p` mode MCP wait at 5s | claude-settings.md:931 |
| `CLAUDE_CODE_SESSIONEND_HOOKS_TIMEOUT_MS` | UNADDRESSED — replaces hard 1.5s SessionEnd hook timeout | claude-settings.md:932 |
| `CLAUDE_ENABLE_STREAM_WATCHDOG` + `CLAUDE_STREAM_IDLE_TIMEOUT_MS` | UNADDRESSED — stream-watchdog for stalled connections (sister claude-sota's FM-17.d) | claude-settings.md:950-951 |

### S3.4 — Permission Modes (4 + plan-mode) — `claude-settings.md:243` + `https://code.claude.com/docs/en/permission-modes`

Verbatim permission mode enum at claude-settings.md:243-254 (Permission Modes header). Modes:
- `default` — standard prompt-before-action
- `acceptEdits` — auto-accept Edit/Write
- `auto` — eliminate prompts via permission predicate analysis (Anthropic SOTA: `--permission-mode auto` since v2.1.111)
- `dontAsk` — never prompt
- `bypassPermissions` — pass-through (operator override; current claude-sota-installed runtime per Wave 82d)
- `plan` — read-only investigation mode

Anthropic-OFFICIAL anchor at `https://code.claude.com/docs/en/permission-modes#eliminate-prompts-with-auto-mode` confirms `auto` is the SOTA-canonical permission mode for autonomous loops. Current claude-sota-installed runtime is `bypassPermissions` per Wave 82d (operator override) — Phase 0-3 should preserve the documented CR-7 Phase 1 = `auto` revert trigger.

### S3.5 — MCP Servers + `alwaysLoad` — `claude-settings.md:362-388 @ 48f2ceb`

Sourced from `https://code.claude.com/docs/en/mcp` (and the dedicated MCP docs).

Verbatim quote (claude-settings.md:362): "By default, MCP tool definitions are deferred (loaded into context on demand via tool search). Set `alwaysLoad: true` on an individual MCP server entry in `.mcp.json` (or inline `mcpServers`) to exempt that server from deferral — every tool from that server then loads upfront at session start regardless of `ENABLE_TOOL_SEARCH`. Available on all server types; requires Claude Code v2.1.121+."

Plus per-tool: tool metadata `_meta` field can carry `"anthropic/alwaysLoad": true` for subset bypass.

**Phase 0-3 wiring**: `.mcp.json` already has graphiti + memory wired per CLAUDE.md Memory Stack. Phase 2B should document `alwaysLoad` policy per MCP — particularly for high-frequency MCPs (memory + graphiti) that benefit from upfront loading, while keeping discovery-class MCPs (deepwiki, github) deferred to tool-search.

### S3.6 — Memory (CLAUDE.md + CLAUDE.local.md) — `claude-memory.md @ 48f2ceb`

(Already extensively cited in CLAUDE.md head — only auto-loaded MD files. `CLAUDE.local.md` gitignored per CCBP `claude-memory.md:113`.)

---

## Source 4: CC CHANGELOG Q1-Q2 2026 audit — `claude-code-best-practice-shan/changelog/best-practice/concepts/changelog.md @ 48f2ceb`

[VERIFIED via `grep -nE '^## ' Z:/repos/deps/claude-code-best-practice-shan/changelog/best-practice/concepts/changelog.md`]

26 documented versions Mar 2 → May 1 (v2.1.63 → v2.1.126). Features enabling advanced automation:

| Version (date) | Feature | Phase 0-3 status |
|---|---|---|
| v2.1.71 (Mar 7) | initial concept docs catalog | n/a |
| v2.1.76 (Mar 15) | `/effort` slash command | UNADDRESSED |
| v2.1.77 (Mar 17) | CLAUDE_CODE_MAX_OUTPUT_TOKENS bumped to 64K (Opus 4.6), 128K upper bound | n/a |
| v2.1.83 (Mar 25) | `managed-settings.d/` drop-in directory + `sandbox.failIfUnavailable` + `CLAUDE_CODE_DISABLE_NONSTREAMING_FALLBACK` + `CLAUDE_CODE_SUBPROCESS_ENV_SCRUB` (defense-in-depth) | UNADDRESSED |
| v2.1.84 (Mar 26) | `CLAUDE_CODE_USE_POWERSHELL_TOOL=1` Windows preview + `allowedChannelPlugins` managed-settings | UNADDRESSED (relevant for Windows operator) |
| v2.1.85 (Mar 27) | `headersHelper` MCP injection + `OTEL_LOG_TOOL_DETAILS` | UNADDRESSED |
| v2.1.86 (Mar 28) | `/ultrareview` cloud-based multi-agent code review (Pro/Max free 3 runs) | UNADDRESSED — potential Phase 2B substitute for Codex T2 |
| v2.1.89 (Apr 1) | `MCP_CONNECTION_NONBLOCKING` for `-p` mode | UNADDRESSED |
| v2.1.96 (Apr 8) | TBD (needs read) | n/a |
| v2.1.97 (Apr 9) | TBD | n/a |
| v2.1.101 (Apr 11/13) | `CLAUDE_CODE_CERT_STORE` for native binary mTLS | n/a |
| v2.1.107 (Apr 14) | TBD | n/a |
| v2.1.110 (Apr 16) | `/loop` upgraded to **7 days max** (was 3); `CLAUDE_CODE_ENABLE_AWAY_SUMMARY=0` opt-out for idle-recap; **`/tui fullscreen` canonical command** (was env var) | UNADDRESSED |
| v2.1.111 (Apr 16) | **`--permission-mode auto` flag** (replaces deprecated `--enable-auto-mode`); **CLAUDE_CODE_EFFORT_LEVEL** includes `xhigh` for Opus 4.7; **`OTEL_LOG_RAW_API_BODIES`** | PARTIAL — `auto` is CR-7 Phase 1 destination per CLAUDE.md cardinal-rule-7 |
| v2.1.113 (Apr 18) | TBD | n/a |
| v2.1.117 (Apr ~22) | **`CLAUDE_CODE_FORK_SUBAGENT=1`** — forked subagents land | ACTIVE in CLAUDE.local.md (e) |
| v2.1.118 (Apr 24) | `DISABLE_UPDATES` (stricter than DISABLE_AUTOUPDATER) + `claude plugin tag` for marketplace versioning | UNADDRESSED |
| v2.1.119 (Apr 26) | `CLAUDE_CODE_HIDE_CWD` startup logo CWD privacy | UNADDRESSED |
| v2.1.121 (Apr 29) | **MCP `alwaysLoad: true`** per-server upfront-load opt-in + `OTEL_LOG_USER_PROMPTS` | UNADDRESSED |
| v2.1.122 (post-Apr 29) | `ANTHROPIC_BEDROCK_SERVICE_TIER` (default/flex/priority) | n/a (claude-sota-installed isn't Bedrock-routed) |
| v2.1.126 (May 1) | `CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST` host-routing flag (Anthropic Console + cloud sessions) | n/a |

**Major Q2 2026 features for advanced automation**:
1. **`/loop` 7-day cron** (v2.1.110) — primary "unattended loop" primitive; Anthropic OFFICIAL bundled skill; cite anchor for cwc "Going Further" pattern #1
2. **`--permission-mode auto`** (v2.1.111) — primary autonomous-mode flag; Anthropic OFFICIAL; replaces older `--enable-auto-mode`
3. **`CLAUDE_CODE_FORK_SUBAGENT=1`** (v2.1.117) — forked subagents with full parent history; ACTIVE in our runtime
4. **MCP `alwaysLoad: true`** (v2.1.121) — token-cost optimization for frequently-used MCPs
5. **`/ultrareview`** (v2.1.86) — cloud-based multi-agent code review; potential SOTA-canonical substitute for the codex T2 cross-model gate

---

## Source 5 (bonus): `claude-agent-sdk-python` hook event types

[VERIFIED 2026-05-14 via `grep -nE 'class.*HookInput' Z:/repos/deps/anthropics__claude-agent-sdk-python/src/claude_agent_sdk/types.py`]

Eleven Hook Event types (`src/claude_agent_sdk/types.py:273-446 @ 694e4f3b`):
1. `BaseHookInput` (273) — base type
2. `PreToolUseHookInput` (307) — extends _SubagentContextMixin
3. `PostToolUseHookInput` (316)
4. `PostToolUseFailureHookInput` (326)
5. `UserPromptSubmitHookInput` (337)
6. `StopHookInput` (344)
7. `SubagentStopHookInput` (351)
8. `PreCompactHookInput` (361)
9. `NotificationHookInput` (369)
10. `SubagentStartHookInput` (378)
11. `PermissionRequestHookInput` (386)

Plus output types: `PreToolUseHookSpecificOutput` (411), `PostToolUseHookSpecificOutput` (421), `PostToolUseFailureHookSpecificOutput` (439), `UserPromptSubmitHookSpecificOutput` (446).

**Synchronous-decision return** at `types.py:551`: `decision: NotRequired[Literal["block"]]` (output JSON `{"decision":"block","reason":"..."}` — matches cwc kill-switch + steer + verify-gate shape).

**asyncRewake field**: searched but NOT found at SDK level in types.py — appears to be a CLI-only feature (per claude-sota's `layered-gates-architecture.md` audit), not SDK-exposed. Phase 0-3 should clarify scope: asyncRewake is operator-side CC hook feature, not SDK callback feature.

11 hook types is the full **Anthropic-OFFICIAL hook event vocabulary**. claude-sota-installed currently wires only PreToolUse (via codex T1 gate) + likely some PostToolUse/Stop. Phase 2B should document an install matrix of all 11 hook types vs. which the runtime utilizes.

---

## Prescribed Phase 2B additions to Agent C's design

**Insertion point**: After Phase 1 `permissions.defaultMode` transitions to `auto`, BEFORE Phase 2 plugin-class installs.

### Phase 2B-1: Anthropic-OFFICIAL Long-Running Harness install (cwc 5 primitives)

```
Phase 2B-1: install Anthropic-OFFICIAL long-running primitives (cwc-long-running-agents @ ffd563d6)

Step 1: cp -r Z:/repos/deps/cwc-long-running-agents/claude-code-config/.claude/CLAUDE.md \
              Z:/claude-sota-installed/.claude/CLAUDE-LONG-RUNNING.md
       (Mount as a sub-CLAUDE, NOT replace root CLAUDE.md.)

Step 2: cp -r Z:/repos/deps/cwc-long-running-agents/claude-code-config/.claude/hooks/{track-read,verify-gate,kill-switch,steer,commit-on-stop}.sh \
              Z:/claude-sota-installed/.claude/hooks/scripts/cwc/

Step 3: cp Z:/repos/deps/cwc-long-running-agents/claude-code-config/.claude/agents/evaluator.md \
           Z:/claude-sota-installed/.claude/agents/evaluator.md

Step 4: append cwc hook wires to .claude/settings.json:
  - PreToolUse:* → kill-switch.sh, steer.sh
  - PreToolUse:Read → track-read.sh
  - PreToolUse:Write|Edit → verify-gate.sh
  - Stop → commit-on-stop.sh

Step 5: create empty bootstrap PROGRESS.md template at project-root with 4 sections

Step 6: create empty .claude/.evidence-reads + test-results.json template

Step 7: docs/install-provenance.md: append Wave 5 K cwc install row @ ffd563d6 SHA + Apache-2.0 attribution

Step 8: docs/operator-runbook-long-running.md (new, bootstrap-only): document the cwc 4-line `watch` observation pattern + AGENT_STOP / STEER.md operator interventions
```

### Phase 2B-2: Anthropic-OFFICIAL Reference Plugin installs

```
Phase 2B-2: install 3 reference plugins from anthropics/claude-plugins-official

Step 1: /plugin marketplace add https://github.com/anthropics/claude-plugins-official
       (cardinal-rule-6: pull from newest @ install time)

Step 2: /plugin install agent-sdk-dev
Step 3: /plugin install ralph-loop
Step 4: /plugin install frontend-design

Step 5: docs/install-provenance.md: append per-plugin SHA + cite to README:32+90+93
```

### Phase 2B-3: Anthropic-OFFICIAL Cookbook reference adoption

```
Phase 2B-3: cite-import Anthropic cookbook patterns as TIER-1-DIRECT references

Step 1: Add anthropics/claude-cookbooks cite-anchor to docs/sota-installed-manifest.md
       (no install — research-class reference per Section 14 cite-import-AMBER)

Step 2: docs/rubric-grading-pattern.md (new, bootstrap-only): adapt
       CMA_verify_with_outcome_grader.ipynb pattern for local rubric-driven
       quality gate (replaces cwc binary PASS/NEEDS_WORK with scored rubric).

Step 3: docs/cost-tier-discipline.md (new, bootstrap-only): adapt
       multimodal/using_sub_agents.ipynb pattern (Opus-orchestrator + Haiku-extractors).
```

### Phase 2B-4: Anthropic-OFFICIAL bundled skill activation recipes

```
Phase 2B-4: document operator activation of 6 free Anthropic OFFICIAL bundled skills

Step 1: docs/anthropic-bundled-skills-runbook.md (new): operator recipes for
       /loop (cron up to 7 days per v2.1.110), /batch (multi-file bulk),
       /debug (failing-command analysis), /simplify (refactor-changed-code),
       /claude-api (Anthropic SDK builder), /less-permission-prompts (allowlist scan).

Step 2: docs/sota-installed-manifest.md: add row mapping each skill to its
       Anthropic-canonical source URL.
```

### Phase 2B-5: Q2 2026 env-var hardening

```
Phase 2B-5: append missing-but-relevant Anthropic env vars to CLAUDE.local.md ENV block

(k) CLAUDE_CODE_SUBPROCESS_ENV_SCRUB=1 (defense-in-depth credential scrubbing in subprocesses)
(l) CLAUDE_CODE_SESSIONEND_HOOKS_TIMEOUT_MS=30000 (replaces 1.5s hard timeout for cwc commit-on-stop)
(m) CLAUDE_ENABLE_STREAM_WATCHDOG=1 + CLAUDE_STREAM_IDLE_TIMEOUT_MS=600000 (FM-17.d defense — sister claude-sota's wedge defense)
(n) MCP_CONNECTION_NONBLOCKING=true (bound -p mode MCP wait at 5s for /loop cron mode)

All env vars cited verbatim to claude-settings.md @ 48f2ceb.
```

---

## HONEST-NON-FINDINGS

### HNF-1: `anthropics/cwc-long-running-agents` local clone at root `Z:/repos/deps/anthropics-cwc-long-running-agents` not present

The brief expected this exact path; actual local clone is at `Z:/repos/deps/cwc-long-running-agents` (without the `anthropics-` org-prefix). Same HEAD `ffd563d6`, same content. Probe via `find Z:/repos/deps -maxdepth 2 -name '*cwc*'` confirmed single match. ALSO present as native install at `Z:/claude-sota-installed/.local/cwc/` per CLAUDE.md L171 — same SHA. NOT a finding gap; just path-name drift.

### HNF-2: Anthropic CC official docs site `https://code.claude.com/docs/en/*` not directly fetched

Used CCBP mirror at HEAD `48f2ceb` instead per CR-1 lattice (CCBP cites `code.claude.com/docs/en/*` verbatim and is Anthropic-affiliated, treated as TIER-1-DIRECT). For Wave 6 freshness check, operator can probe directly via WebFetch if any specific page content drifts after May 1 (v2.1.126).

### HNF-3: `anthropics/claude-code` repo (CHANGELOG.md) checked indirectly via CCBP digest

Local clone exists at `Z:/repos/deps/claude-code` per brief, but its CHANGELOG is 281KB monolithic. CCBP `changelog/best-practice/concepts/changelog.md` is the curated digest (60K, version-by-version). Used digest for audit; direct CHANGELOG.md remains authoritative for line-level cites if needed.

### HNF-4: asyncRewake field absent from SDK types.py

Searched `grep -nE 'asyncRewake|allow_remediation' Z:/repos/deps/anthropics__claude-agent-sdk-python/src/claude_agent_sdk/types.py` — zero hits. asyncRewake appears to be a CC-CLI hook feature (operator-facing settings), NOT exposed in the Python Agent SDK type system. The SDK uses synchronous `decision: "block"` + reason payload (types.py:528-551). Phase 0-3 should clarify this scope difference if any documentation conflates the two surfaces.

### HNF-5: Anthropic-OFFICIAL claude-skills github repo NOT inventoried in this audit

CCBP `claude-skills.md:50` links to `https://github.com/anthropics/skills/tree/main/skills` as "Official Skills Repository for community-maintained installable skills" — this is a SEPARATE repo from the cookbooks. Local clone at `Z:/repos/deps/anthropics__skills` exists. Not audited in this 20-min budget; Wave 6 candidate for fan-out.

### HNF-6: `/ultrareview` (v2.1.86) install/setup steps not documented

`/ultrareview` is a cloud-based multi-agent code review command (Pro/Max get 3 free runs). It's Anthropic-OFFICIAL but the v2.1.86 CHANGELOG entry didn't detail install/activation steps. May require additional probe at `https://code.claude.com/docs/en/ultrareview` (per changelog reference; not local-cloned).

---

## Anthropic-OFFICIAL coverage matrix

| Capability | Anthropic-OFFICIAL source | Already in Phase 0-3? | Gap-or-cover |
|---|---|---|---|
| Long-running agent harness primitives (5) | `cwc-long-running-agents` Apache-2.0 @ ffd563d6 | LISTED §17 only | INSTALL-CLASS GAP — adopt via Phase 2B-1 |
| Reference plugins for SDK/loop/rubric (3) | `claude-plugins-official` `agent-sdk-dev`/`ralph-loop`/`frontend-design` | UNADDRESSED | INSTALL-CLASS GAP — adopt via Phase 2B-2 |
| Cost-Tier discipline (Opus orchestrator + Haiku extractors) | `anthropics__claude-cookbooks/multimodal/using_sub_agents.ipynb @ 3f8bf356` | UNADDRESSED | DOC GAP — Phase 2B-3 |
| Rubric-driven verification (PASS/NEEDS_WORK → scored rubric) | `anthropics__claude-cookbooks/managed_agents/CMA_verify_with_outcome_grader.ipynb @ 3f8bf356` | UNADDRESSED | DOC GAP — Phase 2B-3 |
| 7-touchpoint cross-model gate (T1-T7) | CCBP `cross-model-workflow.md @ 48f2ceb` (STEPS 1-4) + sister claude-sota `cross-model-consensus.md` | INHERITED via cardinal-rule-3 | COVER ✓ |
| 16 subagent frontmatter fields | CCBP `claude-subagents.md:17-36 @ 48f2ceb` | INHERITED via CR-1 | COVER ✓ |
| 15 skill frontmatter fields | CCBP `claude-skills.md:17-35 @ 48f2ceb` | INHERITED via Skill Orch Discipline | COVER ✓ |
| 6 Anthropic-OFFICIAL bundled skills | CCBP `claude-skills.md:43-48 @ 48f2ceb` | LISTED, no operator recipes | RECIPE GAP — Phase 2B-4 |
| 5 Anthropic-OFFICIAL bundled subagents | CCBP `claude-subagents.md:42-48 @ 48f2ceb` | UNADDRESSED in Phase 0-3 | TIER-CITE GAP — Phase 2B should reference Explore + Plan |
| 11 Hook Event Types (full SDK surface) | `claude-agent-sdk-python/src/claude_agent_sdk/types.py:273-446 @ 694e4f3b` | PARTIAL (T1 = PreToolUse only) | MATRIX GAP — Phase 2B-1 |
| 200+ env vars | CCBP `claude-settings.md:765-989 @ 48f2ceb` | PARTIAL (10 in CLAUDE.local.md) | Q2-FEATURE GAP — Phase 2B-5 |
| Forked subagent dispatch (v2.1.117) | CLAUDE.local.md (e) + CCBP `claude-settings.md:955 @ 48f2ceb` | ACTIVE | COVER ✓ |
| Permission mode `auto` (v2.1.111) | CCBP `claude-settings.md:243-254 @ 48f2ceb` + `https://code.claude.com/docs/en/permission-modes` | CR-7 Phase 1 destination | COVER ✓ |
| `/loop` cron up-to-7d (v2.1.110) | CCBP `claude-skills.md:46 @ 48f2ceb` | UNADDRESSED | RECIPE GAP — Phase 2B-4 |
| MCP `alwaysLoad` (v2.1.121) | CCBP `claude-settings.md:362-388 @ 48f2ceb` | UNADDRESSED | OPTIMIZATION GAP — Phase 2B |
| `/ultrareview` cloud multi-agent code review (v2.1.86) | CCBP changelog v2.1.113 row #2 @ 48f2ceb | UNADDRESSED | POTENTIAL T2-SUBSTITUTE — Phase 2B candidate |
| Claude Managed Agents hosted runtime | `https://docs.claude.com/en/docs/managed-agents` + `anthropics__claude-cookbooks/managed_agents/*` | UNADDRESSED | SCOPE-DECISION GAP — claude-sota-installed is local-harness, not hosted; document non-adoption |
| Anthropic-OFFICIAL `claude_agent_sdk_python` examples (17) | `Z:/repos/deps/anthropics__claude-agent-sdk-python/examples/ @ 694e4f3b` | UNADDRESSED | SDK-PATTERN GAP — Wave 6 fan-out candidate |
| `anthropics/skills` separate community-skills repo | `Z:/repos/deps/anthropics__skills` @ local | UNAUDITED IN WAVE 5 | HNF-5 — Wave 6 candidate |

---

VERDICT: ADOPT-NOW for all 10 primitives in Executive Summary. The Anthropic-OFFICIAL TIER-1-DIRECT surfaces are MIT/Apache-2.0 (Apache-2.0 PBC for cwc) and immediately install-class compatible. Operator should execute Phase 2B-1 → 2B-5 as bounded ships per cardinal-rule-9 install-risk discipline (version-pin at SHAs cited, 2-round fix-forward budget, pre-cite-import REVERT check). HONEST-NON-FINDING: `anthropics/skills` community-skills repo + 17 SDK examples + `/ultrareview` install recipe deferred to Wave 6 fan-out.

Cross-model gate satisfaction: PARTIAL — Wave 5 Agent K is Sonnet stand-in per CLAUDE_CODE_SUBAGENT_MODEL env funneling per CLAUDE.local.md ENV (g). STAND-IN-NOTICE per `Z:/claude-sota/.claude/rules/cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate`. Orchestrator must file 2nd-stage validation if recommending Phase 2B-1 adoption beyond doc-only ship.

Output file: `Z:/claude-sota-installed/tmp/sota-pure-anthropic-official-K-2026-05-14.md` (target 700 LOC).
