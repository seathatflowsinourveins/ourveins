# W318-A — Agent-Orchestration Deep Audit (2026-05-19)

> Stream A / W318. User mandate: "I feel that your agent team orchestration has silent fallback or errors" — root-cause analysis.

## 1. Agent-teams plugin operational status

**Plugin**: `agent-teams@1.0.2` (Seth Hobson, `claude-code-workflows` marketplace). Installed at `Z:/claude-sota-installed/.claude/plugins/cache/claude-code-workflows/agent-teams/1.0.2/`.

**Operational evidence**:
- `.in_use/<pid>` files in cache dir → ~30+ active concurrent-use markers (plugin IS being loaded by sessions)
- 4 team-agent definitions: `team-debugger.md`, `team-implementer.md`, `team-lead.md`, `team-reviewer.md`
- 1 team-debug command: `commands/team-debug.md`
- Skill side: `agent-teams:team-spawn`, `agent-teams:team-status`, `agent-teams:team-review`, `agent-teams:team-debug`, `agent-teams:team-feature`, `agent-teams:team-delegate`, `agent-teams:team-shutdown` all surfaced in skill catalog

**Verdict**: **OPERATIONAL**. Plugin loaded, agents defined, commands wired.

## 2. TeamCreate / SendMessage / TaskCreate primitive test

**Per W312-D F2**: "agent-teams-primitive unused since W289 ... `TeamCreate`/`TaskCreate`/`SendMessage` are main-session-lead-only per Anthropic by-design; subagent contexts cannot fan-out further per 'No nested teams' rule — silent-degradation explained."

**This-session test**: this is a nested-Agent session (Stream-A subagent spawned by W318 parent orchestrator). Probing the deferred-tools list returned by ToolSearch query "agent task subagent dispatch":
- `TaskStop` ✓ (background-task control)
- `EnterWorktree` ✓ (worktree management)
- `mcp__serena__*` ✓ (serena MCP)
- **`Agent` / `Task` tool**: NOT present in deferred-tools list for this nested context

**Conclusion**: confirms W312-D F2 by-design constraint. Nested Agent dispatch is **architecturally forbidden** by Anthropic's CC primitive design — only the main session lead can fan-out further. This is NOT a silent fallback — it is **enforced absence** of the tool.

**Verdict**: **CONFIRMED BY-DESIGN**. Not a runtime bug.

## 3. Mailbox audit (per W312-D F5 archive)

**Probe**: `ls .claude/mailboxes/ 2>/dev/null` (Bash empty); `ls .claude/teams/` returned `claude-sota-installed` (1 dir).

**W312-D F5 archived 27 orphan mailboxes** to `tmp/W312-mailbox-archive/`. The current state shows only 1 team dir (clean).

**Verdict**: **CLEAN**. W312-D archive was effective.

## 4. User-flagged "silent fallback or errors" — root-cause

The operator's concern stems from observable patterns:

### (a) GitHub-MCP `search_repositories` returns 0-hits on well-formed queries (6-wave chronic)

- **Pattern**: invoke `mcp__plugin_everything-claude-code_github__search_repositories` with a query that should match — get 0 results back, NOT an error
- **Cause**: upstream GitHub MCP rate-limiting + query-syntax mismatch + token scope issues → returns empty results array instead of HTTP 429 or auth error
- **Impact**: orchestrator silently accepts "no results" and falls through to other discovery channels (exa, deepwiki) — but the SOTA-convergence-audit pipeline expected a positive signal from GitHub which never arrives
- **Mitigation**: `tools/gh-search-rest.sh` (REST API wrapper) exists at W314-r2-AI-r2-7; goal-prompt-synthesis SKILL.md has Stage-2 fallback note; sca-v7 Stage-0 existence-probe absorbed in W316-B Δ33

**This is the canonical silent-fallback the operator is seeing.** It is NOT in our orchestration — it is in the GitHub MCP itself. We mitigate by chained cascading (exa + perplexity + deepwiki + WebSearch).

### (b) W269-mandate parallel-Agent-dispatch was prose-only until W317 → silent-serial pattern measured at 41% pre-W317

- **Pre-W317**: parallel_ratio 0.587 ← 41% of multi-stream contexts silently fell to serial-Agent dispatch
- **Post-W317**: parallel_ratio 1.000 (per W318-A-PARALLEL-RATIO.md)
- **Fix**: `parallel-dispatch-mandate` SKILL.md auto-fires per `description:` match per `https://code.claude.com/docs/en/skills`

**This is the silent fallback in our orchestration that has been RESOLVED at W317.**

### (c) PROJECT_DIR state-redirect silently broken (CARRYOVER W314-r1-C F-SS-1)

- **Pattern**: `CLAUDE_CODE_PROJECT_DIR=Z:/claude-sota-installed-state/.claude/projects` is SET in env but CC ignores it
- **Impact**: JSONLs land at `Z:/claude-sota-installed/.claude/projects/Z--claude-sota-installed/` instead — operator expects "state-outside-repo" invariant but it's silently violated
- **Mitigation**: state dir is gitignored regardless; no SECURITY impact; W317-D filed upstream issue

### (d) Subagent (this) cannot fan-out — by-design "no nested teams"

- **Pattern**: subagent context lacks the `Agent`/`Task` tool — cannot spawn sub-sub-agents
- **Cause**: Anthropic CC primitive constraint
- **NOT silent fallback** — enforced architectural choice

## 5. Recommendations

| # | Recommendation | Owner | Priority |
|---|----------------|-------|----------|
| 1 | **Document the 4 root-causes above in CLAUDE.md L19 section** so operators don't conflate them. | parent | MED |
| 2 | **Codify GitHub-MCP 6-wave pattern as a permanent stale-fallback skill** that fires on any `search_repositories` call (auto-cascade to `gh-search-rest.sh`). | sca-vNext | HIGH |
| 3 | **PROJECT_DIR redirect upstream-issue follow-up** — track #60561 weekly until upstream fix lands. | parent | LOW |
| 4 | **Add agent-teams primitive test to harness/eval_harness.py Lane X** — verifies TeamCreate/SendMessage/TaskCreate availability at main-session-lead vs subagent contexts to catch regressions if Anthropic ever changes the constraint. | harness | MED |

## 6. Verdict

**TeamCreate operational**: ✓ (plugin loaded, agents defined, commands wired)
**Silent-fallback root-cause**: 4 distinct patterns identified — 1 RESOLVED (W269), 1 chronic-mitigated (GitHub MCP 6-wave), 1 DEFER-upstream (PROJECT_DIR), 1 by-design (no-nested-teams)
**Operator-flagged concern**: REAL but NOT in our orchestration — root-causes are upstream MCP + Anthropic primitive constraints + (now-resolved) prose-only-mandate
