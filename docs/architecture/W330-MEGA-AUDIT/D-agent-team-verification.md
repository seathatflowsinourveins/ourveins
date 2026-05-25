# W330-MEGA-AUDIT Stream D — Agent-team Orchestration Verification

**Wave**: W330 | **Stream**: D | **Date**: 2026-05-19 | **Scope**: Read-only audit
**Operator hypothesis under test**: "agent team orchestration has silent fallback or errors"
**Verdict**: **YES — confirmed**. Silent-fallback risk is structural in the installed primitive (advisory-only guard + zero output-validation in agent-lead synthesis + dispatch-site validation absent). See §5 and §8.

---

## §1 Plugin state (installed_plugins.json)

`agent-teams@claude-code-workflows v1.0.2` — `installed_plugins.json:152-160`
- `installPath`: `Z:/claude-sota-installed/.claude/plugins/cache/claude-code-workflows/agent-teams/1.0.2/`
- `gitCommitSha`: `08ded5e7b0fe57e7f40194775885eba539c3d8e7`
- `installedAt`: 2026-05-18T14:29:22Z; `lastUpdated`: 2026-05-18T19:11:15Z
- Plugin scope: project; activation: enabled in `.claude/settings.json` `enabledPlugins["agent-teams@claude-code-workflows"]: true`

`.claude-plugin/plugin.json` (v1.0.2; author Seth Hobson; MIT) — no `hooks`, `mcpServers`, or `settings` keys (hook-less by design).

## §2 Agent definitions inventory

Path: `.claude/plugins/cache/claude-code-workflows/agent-teams/1.0.2/agents/`

| Agent | Tools (front-matter) | Model | Role |
|---|---|---|---|
| `team-lead.md:1-8` | Read, Glob, Grep, Bash, Agent, **TeamCreate, TeamDelete, TaskCreate, TaskList, TaskGet, TaskUpdate, SendMessage** | opus | Decompose + orchestrate; only agent with `Agent` + `Team*` tools |
| `team-debugger.md:1-7` | Read, Glob, Grep, Bash, TaskList, TaskGet, TaskUpdate, SendMessage | opus | Hypothesis investigator; read-only |
| `team-implementer.md:1-7` | Read, **Write, Edit**, Glob, Grep, Bash, TaskList, TaskGet, TaskUpdate, SendMessage | opus | File-owner builder |
| `team-reviewer.md:1-7` | Read, Glob, Grep, Bash, TaskList, TaskGet, TaskUpdate, SendMessage | opus | Single-dimension reviewer |

Commands (7): `team-spawn.md`, `team-feature.md`, `team-debug.md`, `team-review.md`, `team-delegate.md`, `team-status.md`, `team-shutdown.md`.
Skills (6): `multi-reviewer-patterns`, `parallel-debugging`, `parallel-feature-development`, `task-coordination-strategies`, `team-communication-protocols`, `team-composition-patterns`.

## §3 Upstream wshobson/agents diff

Upstream HEAD `08ded5e7b0fe57e7f40194775885eba539c3d8e7` (2026-05-17 commit `fix: agent teams coordination guardrails (#535)`) — **EXACT MATCH** to installed SHA. **No drift.**

Upstream `plugins/agent-teams/agents/` lists: `team-debugger.md`, `team-implementer.md`, `team-lead.md`, `team-reviewer.md` — same 4 agents.

Upstream `plugins/agent-teams/.claude-plugin/plugin.json` reports `version: 1.0.2` — matches.

**Notable upstream-only plugin we do NOT install**: `plugins/agent-orchestration/agents/context-manager.md` — a sibling plugin in the same upstream repo providing a `context-manager` agent type. Not installed. Out of scope for D-stream but logged for B-stream catalog.

## §4 Hook wiring

- `.claude/plugins/cache/claude-code-workflows/agent-teams/1.0.2/` contains NO `hooks.json` (verified via dir listing — only `README.md`, `agents/`, `commands/`, `skills/`, `.claude-plugin/`)
- `.claude/settings.json` plugin-hook activation map enables `agent-teams@claude-code-workflows: true` but the plugin ships ZERO hook entries — so no SessionStart, no PreToolUse, no Stop, no SubagentStop wiring exists from this primitive
- Implication: **all coordination state is implicit and CC-runtime-managed** (no plugin-side validators, no error-trap shim). Failure modes are NOT instrumented by the plugin author

## §5 Silent-fallback pattern hunt — confirmed hits

### Finding 5.1 — `subagent_type` validation MISSING at dispatch site (W319 H3 trap)

`commands/team-spawn.md:78`, `commands/team-debug.md:44`, `commands/team-feature.md:69`, `commands/team-review.md:32` all instruct the orchestrator to set `subagent_type` to literal strings like `"agent-teams:team-debugger"`. **No pre-flight validation against an allowlist.** Skill `team-composition-patterns/SKILL.md:81-90` has a table of valid types but it is descriptive prose, not a programmatic check. A typo (`agent-teams:team-debuger`) silently falls back to `general-purpose` or fails open in CC runtime — Δ-DPA-1 F4 / W319 H3 footprint.

### Finding 5.2 — empty `final_message` swallow (W321 F5 root cause unguarded)

`team-lead.md:78-84` "Team Lifecycle Protocol" steps 4-5: "Collect — Gather results as teammates complete tasks. Synthesize — Merge results into consolidated output." **No language requiring strip-and-test of worker output before consumption.** No `if (empty) requeue` directive. No mention of `final_message` content validation. The agent will happily synthesize from empty-string outputs without raising.

`grep -rn 'empty\|null\|undefined\|missing\|silently'` against entire `agents/` dir returned **zero defensive checks** — the lone hit was an unrelated "missing indexes" string in `team-reviewer.md:30` (N+1 query review topic).

### Finding 5.3 — fork-mode context inheritance NOT documented (Δ-DPA-1 F4)

No reference to `CLAUDE_CODE_FORK_SUBAGENT` in any agent or command file. No repomix-pack-embed pattern in prompt templates. CC subagents inherit conversation history per CLAUDE.local.md L37 `CLAUDE_CODE_FORK_SUBAGENT=1`, but the plugin authors do not acknowledge this in agent docs — risk of orchestrator dispatching workers without explicit context attachment when fork mode is off.

### Finding 5.4 — `team-spawn.md:11-13` pre-flight check is operator-readable string only

> "Verify that `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` is set: If not set, inform the user … Stop execution if not enabled"

This is a prose instruction for the orchestrator LLM, not a hook or runtime gate. If the LLM skips the check, `TeamCreate` will be unavailable at tool-call time and the dispatch may silently degrade to plain `Agent` calls without team scaffolding.

### Finding 5.5 — `team-spawn.md:84-89` reserved name collision warning is fragile

> "Do not use the role name `team-lead` as the spawned member name. Team creation can reserve role-like names, so use a unique member name and address the teammate by the actual name returned by `Agent` or listed in `~/.claude/teams/{team-name}/config.json`."

Acknowledges a silent reserved-name collision exists in the underlying CC `TeamCreate` runtime. Mitigation is again prose-only ("use a unique member name"). No programmatic name-uniqueness check.

### Finding 5.6 — host-side parallel-ratio guard is **advisory-only** (W325-A F1 root cause)

`tools/preagent-parallel-guard.mjs:5` documents itself as: `ADVISORY ONLY — never blocks. Exits 0 always.`
`tools/parallel-ratio-telemetry.mjs:24-25`: `TARGET_RATIO = 0.30 // W325 target floor (W269 ideal 0.70; F1 measured 0.0034)`. Confirms baseline 0.0034 = 99.66% silent-serial fallback. The guard hook described in CLAUDE.md L19 as "blocking on 2nd-violation" is **not currently blocking** — settings.json activation status not changed since W326 P0-A1 ship.

## §6 mattpocock/skills + wshobson cross-check

`mattpocock/skills` HEAD `d54c497aa94400a496d3f2c38be10fa5f284c5a9` (2026-05-19T16:07Z, "Improved wording of /handoff"). Structure: monolithic `skills/` dir (per-skill SKILL.md), NOT an agent-teams primitive — does **not** ship agents, commands, or team orchestration tools. Useful for skill-pattern learning (caveman/handoff/diagnose vendor-forked into this runtime per CLAUDE.md L43) but not a competing agent-teams source.

`wshobson/agents` HEAD `08ded5e7` = installed SHA. Sibling plugins in same repo of potential agent-teams relevance:
- `plugins/agent-orchestration/agents/context-manager.md` — NOT installed; candidate add for W331
- `plugins/comprehensive-review/` — installed separately per `installed_plugins.json`
- `plugins/full-stack-orchestration/` — NOT installed

## §7 W325-A telemetry status

`tools/parallel-ratio-telemetry.mjs` exists (`Z:/claude-sota-installed/tools/`).
- Reads JSONLs from `.claude/projects/Z--claude-sota-installed/` + state-redirect dir
- Computes `parallel_ratio = N(turns ≥2 Agent tool_use blocks) / N(Agent-dispatching turns)`
- Last documented baseline (in source comment + CLAUDE.md L19): **0.0034 = SEV-1** (99.66% silent-serial fallback over W325-A 1676-turn audit denom)
- Target floor 0.30; ideal 0.70 per W269 mandate
- Exit 0 always (telemetry, not gating)

`tools/preagent-parallel-guard.mjs` exists.
- W326 P0-A1 ship label
- Hook type: `PreToolUse[Agent]`
- Heuristic: multi-stream-context regex match on recent operator prompt/assistant turn
- **ADVISORY ONLY — exits 0 always — never blocks**
- This is the W329-D §3 confirmed root cause of "0.0034 baseline persisting despite W326 ship": the guard never enforces

## §8 Remediation (priority-ordered)

**P0-A** (W329-D proposed, still unshipped): flip `preagent-parallel-guard.mjs` from advisory `exit 0` to **blocking exit 2 on 2nd-violation per session**. Implementation: add session-scoped counter (write `Z:/claude-sota-installed-state/.claude/parallel-guard-counter.json` per session_id), block on count ≥2, emit hookSpecificOutput.decision=`block`. Estimated effort: 30 LOC, 1 commit.

**P0-B** (Stream D specific): add **dispatch-site subagent_type allowlist validator** as a separate `PreToolUse[Agent]` hook. Allowlist: `["agent-teams:team-lead", "agent-teams:team-implementer", "agent-teams:team-reviewer", "agent-teams:team-debugger", "general-purpose", "Explore", "Plan", "context-manager"]`. Reject typos with exit 2 + diagnostic. Closes Finding 5.1.

**P1** (Stream D specific): add **`SubagentStop` hook** that reads the child agent's final transcript line and rejects empty `final_message`/`content` arrays with `decision=block` + force-requeue. Closes Finding 5.2 (W321 F5). Estimated effort: 50 LOC.

**P2**: install upstream `plugins/agent-orchestration` (provides `context-manager` agent for explicit cross-agent context handoff). Closes Finding 5.3 gap. Adds 1 plugin.

**P3** (doc-only): add operator-facing skill stanza in `superpowers:dispatching-parallel-agents` (vendor-fork already at `Z:/claude-sota-installed/.claude/skills/dispatching-parallel-agents-w321-fork`) calling out the silent-serial dispatch pattern; auto-fires on multi-stream prompts. Already partially done — confirm wiring at next wave.

## §9 Cite-anchors

- Installed plugin: `Z:/claude-sota-installed/.claude/plugins/cache/claude-code-workflows/agent-teams/1.0.2/`
- Agents: `agents/{team-lead,team-debugger,team-implementer,team-reviewer}.md:1-8`
- Commands: `commands/{team-spawn,team-feature,team-debug,team-review,team-delegate,team-status,team-shutdown}.md`
- Skills: `skills/{multi-reviewer-patterns,parallel-debugging,parallel-feature-development,task-coordination-strategies,team-communication-protocols,team-composition-patterns}/SKILL.md`
- Plugin manifest: `.claude-plugin/plugin.json` v1.0.2
- Telemetry source: `Z:/claude-sota-installed/tools/parallel-ratio-telemetry.mjs:1-180`
- Guard source: `Z:/claude-sota-installed/tools/preagent-parallel-guard.mjs:1-60` (`ADVISORY ONLY — never blocks. Exits 0 always.`)
- Upstream HEAD: `gh api repos/wshobson/agents/commits/HEAD` → `sha:08ded5e7b0fe57e7f40194775885eba539c3d8e7` (2026-05-17, fix #535 "agent teams coordination guardrails")
- Upstream agent-teams dir: `gh api repos/wshobson/agents/contents/plugins/agent-teams/agents` → identical 4 .md files
- Upstream agent-orchestration (uninstalled): `gh api repos/wshobson/agents/contents/plugins/agent-orchestration/agents/context-manager.md`
- mattpocock/skills HEAD: `gh api repos/mattpocock/skills/commits/HEAD` → `sha:d54c497aa94400a496d3f2c38be10fa5f284c5a9` (2026-05-19, /handoff wording; no team primitive)
- CC docs: `https://docs.anthropic.com/en/docs/claude-code/sub-agents`, `https://code.claude.com/docs/en/headless`
- W325-A F1 baseline: CLAUDE.md L19; W329-D §3 root cause (hardcoded advisory-only `exit 0`)

---

**One-paragraph summary**: agent-teams@claude-code-workflows v1.0.2 (SHA `08ded5e7`) is installed at exact-upstream-parity with `wshobson/agents` HEAD — zero version drift, zero file diff. The plugin ships 4 agents (team-lead/implementer/reviewer/debugger) + 7 commands + 6 skills, but ships **no hooks.json and no programmatic validators** — all coordination guarantees are prose instructions to the orchestrator LLM. Operator's silent-fallback hypothesis is confirmed across SIX dimensions (§5.1–5.6): missing subagent_type allowlist validation at dispatch site, missing empty-final_message reject in team-lead synthesis phase, undocumented fork-mode context handoff, prose-only experimental-flag pre-flight, prose-only reserved-name collision warning, and W325-A F1 baseline 0.0034 confirmed persistent because `preagent-parallel-guard.mjs:5` is hardcoded `ADVISORY ONLY — never blocks`. Top 3 remediation: (P0-A) flip the parallel-guard to blocking exit-2 on 2nd violation per session; (P0-B) add a separate subagent_type allowlist `PreToolUse[Agent]` hook; (P1) add a `SubagentStop` hook that rejects empty final_message with force-requeue.
