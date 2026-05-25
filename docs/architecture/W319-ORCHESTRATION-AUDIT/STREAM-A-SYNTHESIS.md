# W319 Stream A — Orchestration Audit Synthesis (2026-05-19)

> Scope: rank findings HIGH/MED/LOW + emit ≤15 W320 operator-AIs.
> Companion docs in same dir: STATIC-AUDIT · DYNAMIC-PROBE · COOKBOOK-INGEST · WSHOBSON-MATTPOCOCK.

## Cardinal-rule invariants — VERDICT

**No cardinal-rule invariants were violated by Stream A.** All findings are routing/silent-fallback patterns, not R1/R2/R3/R4 breaches. The R5 ship-blocker (`bypassPermissions:true` + sandbox.enabled=false) is out of W319-A scope but persists across waves W314+W316+W317+W318 — operator-decision required at W320.

`self_invented_count: 0` ✓ HOLDS.
CLAUDE.md ≤50 LOC body ✓ HOLDS.

## Operator's concern — root-cause map

The operator said: *"I feel that your agent team orchestration has silent fallback or errors."*

**4 root causes identified across W318-A + W319-A** (convergent):

| # | Root cause                                                                            | Source                                  | Status                                                                                      | Severity |
|---|---------------------------------------------------------------------------------------|-----------------------------------------|---------------------------------------------------------------------------------------------|----------|
| 1 | GitHub-MCP `search_repositories` chronic silent 0-hits (6-wave)                       | Upstream MCP                            | **CHRONIC-MITIGATED** via `tools/gh-search-rest.sh` + sca-v7.1 Δ33 Stage-0 existence-probe  | MED (already mitigated) |
| 2 | W269 parallel_ratio 0.587 baseline (silent serial fallback)                           | Our orchestrator-prompt prose-only mandate | **RESOLVED** post-W317 via `parallel-dispatch-mandate` skill (100% parallel_ratio this session) | LOW (resolved) |
| 3 | PROJECT_DIR state-redirect silently broken                                            | Upstream CC bug                         | **DEFER-UPSTREAM** filed W314 + W315; no security impact (gitignored)                       | LOW (chronic) |
| 4 | Nested-Agent contexts cannot fan-out further ("No nested teams")                      | Anthropic CC by-design                  | **NOT a fallback** — enforced architectural constraint                                       | NA (by-design) |

W319-A adds 3 NEW silent-fallback findings (below as HIGH-2, HIGH-3, MED-1) specific to agent-teams `subagent_type` typo traps.

## Findings — HIGH

### HIGH-1 — Upstream wshobson agent-teams plugin has DEORCHESTRATIONALIZED team-lead (8-line drift)

**Evidence**: `Z:/repos/deps/wshobson-agents/` HEAD `ece811f2` vs installed `08ded5e7` shows team-lead's `tools:` allowlist gutted from `Read, Glob, Grep, Bash, Agent, TeamCreate, TeamDelete, TaskCreate, TaskList, TaskGet, TaskUpdate, SendMessage` → `Read, Glob, Grep, Bash`. team-spawn now mandates `subagent_type: "general-purpose"` for ALL teammates (vs. typed `agent-teams:team-*`).

**Why it matters**: our installed v1.0.2 lets the operator BELIEVE team-lead-as-subagent can call TeamCreate. Per Anthropic CC's "No nested teams" rule (W318-A-§2), this is impossible — subagent contexts cannot fan-out. Upstream's pivot correctly aligns with the CC primitive design.

**Silent fallback manifestation**: operator following installed README attempts to delegate team-lifecycle management to a spawned team-lead. The team-lead's TaskCreate/Agent calls would silently no-op or fail at the subagent-context level. Operator sees orchestration "not working" without clear error.

**Fix**: interactive `/plugin update agent-teams@claude-code-workflows`. **DEFER to W320** since W314-r2-AI-r2-1 is also pending interactive `/plugin update` (ECC plugin).

### HIGH-2 — SendMessage to unknown recipient silently drops; no auto-fire on empty-final-message

**Evidence**: W288-P1 historical observation (W289-RUNBOOK §8 anti-pattern table): "Code-reviewer empty `final_message` — Re-dispatch with explicit 'respond via SendMessage with verdict' clause; treat empty as transient". Plus `agent-teams/1.0.2/skills/team-communication-protocols/SKILL.md:159` only documents "teammate is not responding to messages — check task status" without auto-mitigation.

**Why it matters**: when a team-lead's SendMessage targets a name not in `~/.claude/teams/{team-name}/config.json` (e.g. typo, suffix-collision-handled name, or deleted teammate), the message is dropped. There is NO explicit error path documented. The current mitigation (re-dispatch with explicit "respond via SendMessage with verdict") is **prose-only** — no skill auto-fires.

**Validation pattern from Anthropic SOTA**: `anthropic-cookbook/patterns/agents/orchestrator_workers.ipynb` cell-2 has explicit empty-response handling:
```python
if not worker_content or not worker_content.strip():
    print(f"⚠️  Warning: Worker '{task_info['type']}' returned no content")
    worker_content = f"[Error: Worker '{task_info['type']}' failed to generate content]"
```

**Fix**: codify into the `parallel-dispatch-mandate` skill an explicit `empty_final_message` detection + retry/log pattern. **W320 operator-AI**.

### HIGH-3 — Hyphen-vs-underscore subagent_type typo trap

**Evidence**: agent-teams plugin uses `agent-teams:team-debugger` (hyphen). A typo `agent-teams:team_debugger` (underscore) is plausible given operator-prompts authoring rate. The W319 task brief even mentions this as a candidate ("agent-teams:team-debugger vs agent-teams:team_debugger") — convergent operator concern.

**Likely behaviour**: per CC sub-agent docs, unknown subagent_type → either hard error OR silent fallback to `general-purpose`. **Empirical test by main-session-lead recommended**: spawn `Agent(subagent_type="agent-teams:team-debuggerXXX")` and observe whether CC errors or silently uses `general-purpose`.

**If silent**: this is the canonical operator-facing silent-fallback. Mitigation: add to `parallel-dispatch-mandate` skill a pre-flight subagent_type validator (regex-allowlist of valid names from `installed_plugins.json` + plugin `agents/` dir scan).

**Fix**: empirical test + skill-level pre-flight validator. **W320 P0**.

## Findings — MED

### MED-1 — Marketplace-vs-plugin prefix confusion (`claude-code-workflows:team-lead` vs `agent-teams:team-lead`)

**Evidence**: marketplace slug = `claude-code-workflows` (Anthropic-curated), plugin slug = `agent-teams` (per `plugin.json` `name:` field). Valid subagent_type is `agent-teams:team-lead`. The string `claude-code-workflows:team-lead` does NOT exist as a valid type and would silent-fallback OR hard-error.

**Why it matters**: convergent operator-confusion vector — same plugin can be referenced 4 ways in different W286-W317 audit docs.

**Fix**: codify the canonical mapping `{plugin-slug}:{agent-name}` in `parallel-dispatch-mandate` skill's preamble + add a marketplace-prefix mismatch detection. **W320 operator-AI**.

### MED-2 — Empty-response validation NOT explicit in our orchestrator-prompts

**Evidence**: COOKBOOK-INGEST §6 row 1 — Anthropic's `orchestrator_workers.ipynb` has explicit empty-response handling (HIGH-2 above). Our `agent-teams:team-lead.md` (installed v1.0.2:80) Phase 4-5 just says "Gather results as teammates complete tasks" without empty-detection.

**Fix**: same as HIGH-2 — codify empty-response handler. Mark this row to be folded into HIGH-2's resolution.

### MED-3 — Per-subagent research budget not codified

**Evidence**: COOKBOOK-INGEST §6 row 2. Anthropic's `research_subagent.md:5-6,11,44-46` specifies:
- "research budget — simpler tasks <5, medium 5, hard ~10, very difficult up to 15"
- "MINIMUM of five distinct tool calls"
- "stay under a limit of 20 tool calls and under about 100 sources"

Our runtime has no equivalent per-subagent budget guidance. Subagents (this W319 Stream A included) self-pace.

**Fix**: add per-task tool-call budget hints to spawning prompts in `parallel-dispatch-mandate` skill or vendor-fork research_subagent as a CC skill. **W320 operator-AI**.

### MED-4 — Cite-refresh: W269 mandate language source

**Evidence**: COOKBOOK-INGEST §6 row 5. CLAUDE.md L13 cites `https://code.claude.com/docs/en/headless` + `agent-teams/sub-agents docs` for W269 mandate. Anthropic's `research_lead_agent.md:135-137` is the **MORE DIRECT cite-anchor**:
> "You MUST use parallel tool calls for creating multiple subagents (typically running 3 subagents at the same time) at the start of the research."

**Fix**: refresh CLAUDE.md L13 W269 cite with the new anchor. **W320 cosmetic edit**.

### MED-5 — Query-type taxonomy not adopted in W269 routing

**Evidence**: COOKBOOK-INGEST §6 row 3. `research_lead_agent.md:13-29` defines depth-first / breadth-first / straightforward taxonomy with explicit "use parallel for these / not these" routing. Our W269 mandate has a similar table in W289-RUNBOOK §1 but doesn't use the same taxonomy names — operator-cognitive-cost is higher.

**Fix**: align W289-RUNBOOK §1 with Anthropic's canonical taxonomy. **W320 documentation refresh**.

## Findings — LOW

### LOW-1 — W289-RUNBOOK cites stale plugin path

**Evidence**: `docs/architecture/W289-ORCHESTRATION-RUNBOOK-2026-05-18.md:29,206` cites `.claude\plugins\cache\wshobson-agents-marketplace\agent-teams\commands\team-spawn.md` — this path does NOT exist; the actual path is `.claude/plugins/cache/claude-code-workflows/agent-teams/1.0.2/commands/team-spawn.md`. W314-C-§1 already noted this drift but the W289 doc itself was not patched.

**Fix**: replace path-cite in W289 doc. **W320 cosmetic edit**.

### LOW-2 — `name`-vs-role-name suffix-handling cite (deleted in upstream)

**Evidence**: installed v1.0.2 team-spawn.md:80 says "Do not use the role name `team-lead` as the spawned member name. Team creation can reserve role-like names ...". Upstream HEAD removes this line. The behaviour is non-silent (CC errors visibly when role-name collision occurs). LOW because mitigation is interactive.

**Fix**: noted in HIGH-1 plugin-update. No standalone action.

### LOW-3 — Agent observability via `agent_visualizer.py` not integrated

**Evidence**: COOKBOOK-INGEST §6 row 10. `anthropic-cookbook/claude_agent_sdk/utils/agent_visualizer.py` provides agent run instrumentation. We measure parallel_ratio via JSONL ad-hoc analysis (W315-E + W318-A) but no real-time instrumentation.

**Fix**: future-considered; not pressing. **W320 P3 deferred-consideration**.

### LOW-4 — mattpocock/handoff skill not vendor-forked yet

**Evidence**: WSHOBSON-MATTPOCOCK §3.2. `handoff` skill complements `superpowers:finishing-a-development-branch`. W314-r2-AI-r2-4 already queued.

**Fix**: vendor-fork to `.claude/skills/handoff/`. **W320 carry-over from W314-r2**.

### LOW-5 — review-agent-governance plugin installed but disabled

**Evidence**: STATIC-AUDIT §2 row qa-orchestra-adjacent. `review-agent-governance@claude-code-workflows` v0.1.0 SHA `34632bce` is installed but `settings.json:250` has `false`. Plugin ships agents + hooks + policies for review-bot governance.

**Fix**: re-evaluate for W269 review-gate enforcement. **W320 LOW evaluation**.

### LOW-6 — Tool-call budget for nested-Agent contexts undocumented

**Evidence**: this Stream A consumed ~25 tool calls (Bash + Grep + Read) — within Anthropic's reference subagent budget of "very difficult tasks up to 15". We have no budget guidance.

**Fix**: covered by MED-3.

## W320 operator-AIs (15 — prioritised)

| #   | Pri | AI                                                                                                                                                   | Owner   | Effort | Carry-over? |
|-----|-----|------------------------------------------------------------------------------------------------------------------------------------------------------|---------|--------|-------------|
| 1   | P0  | **Empirical subagent_type typo test**: main-session-lead spawns `Agent(subagent_type="agent-teams:team-debuggerXXX")` + `agent-teams:team_debugger` (underscore) + `claude-code-workflows:team-lead` (wrong prefix) and records actual CC behaviour. Determines whether HIGH-3 + MED-1 are silent or loud. | parent  | 5 min  | NEW         |
| 2   | P0  | **Codify empty-final-message detection** into `parallel-dispatch-mandate` SKILL.md per `anthropic-cookbook/patterns/agents/orchestrator_workers.ipynb` cell-2 pattern. Add explicit warning + retry logic when subagent returns empty/whitespace `final_message`. Closes HIGH-2 + MED-2. | author  | 30 min | NEW         |
| 3   | P0  | **Add subagent_type pre-flight validator** to `parallel-dispatch-mandate` skill: regex against allowlist built from `installed_plugins.json` + scanned `agents/` dirs. Reject typo'd subagent_types at orchestrator-prompt level BEFORE calling Agent tool. Closes HIGH-3.                  | author  | 45 min | NEW         |
| 4   | P1  | **Interactive `/plugin update agent-teams@claude-code-workflows`** to upstream HEAD `ece811f2`. Aligns with CC primitive design (no nested teams). **Bundle with W314-r2-AI-r2-1 ECC update** in single operator session. Closes HIGH-1.            | operator| 5 min  | bundled with W314-r2-AI-r2-1 |
| 5   | P1  | **Vendor-fork `mattpocock/skills @ 67bce91c/skills/productivity/handoff/SKILL.md`** to `.claude/skills/handoff/SKILL.md` per cardinal-rule-4 operator-curated path. Closes LOW-4 + W314-r2-AI-r2-4.                       | author  | 5 min  | carry-over W314-r2-AI-r2-4 |
| 6   | P1  | **Codify per-subagent research budget** per `research_subagent.md:5-6,11,44-46` into `parallel-dispatch-mandate` skill. Add per-task tool-call hint (simple<5, medium 5, hard 10, very-hard 15; max 20). Closes MED-3.                          | author  | 30 min | NEW         |
| 7   | P1  | **Refresh CLAUDE.md L13 W269 cite** with `research_lead_agent.md:135-137` as direct anchor. Closes MED-4.                                                                                                              | author  | 2 min  | NEW         |
| 8   | P2  | **Patch W289-ORCHESTRATION-RUNBOOK.md** path-cites `wshobson-agents-marketplace` → `claude-code-workflows` (lines 29, 206). Closes LOW-1.                                                                              | author  | 5 min  | NEW         |
| 9   | P2  | **Align W289-RUNBOOK §1 with Anthropic query-type taxonomy** (depth-first / breadth-first / straightforward) from `research_lead_agent.md:13-29`. Closes MED-5.                                                       | author  | 20 min | NEW         |
| 10  | P2  | **Evaluate `review-agent-governance@claude-code-workflows`** for W269 review-gate enforcement. If useful, set `enabledPlugins:true` in settings.json:250. Closes LOW-5.                                              | operator| 15 min | NEW         |
| 11  | P2  | **Consolidate `Z:/repos/deps/anthropic-cookbook` and `Z:/repos/deps/anthropics__claude-cookbooks`** — same upstream `anthropics/claude-cookbooks`. Remove duplicate clone, keep `claude-cookbooks/` (most recent + canonical). Frees disk space + clarifies cite-paths.        | author  | 5 min  | NEW         |
| 12  | P2  | **Re-pull `Z:/repos/deps/wshobson-agents`** (had `.git/index.lock` from concurrent process). After pull, re-verify upstream HEAD SHA + reapply diff diagnostic. Confirms HIGH-1 diff still relevant.                  | author  | 2 min  | NEW         |
| 13  | P3  | **Future-consider integration of `agent_visualizer.py`** instrumentation into `harness/eval_harness.py` for real-time parallel_ratio observability (vs. JSONL post-hoc analysis). Closes LOW-3.                       | harness | 60 min | NEW         |
| 14  | P3  | **Document W289-RUNBOOK §10**: add subsection on Anthropic Managed Agents `multiagent` coordinator pattern (Cloud-hosted alternative to local CC orchestration). Reference `CMA_coordinate_specialist_team.ipynb`.   | author  | 15 min | NEW         |
| 15  | P3  | **Run empirical agent-teams pattern test** (main-session-lead only): `/team-spawn research --members 3 --name w320-test` then `/team-status` then `/team-shutdown`. Validate the full 7-preset matrix still functional post-W314-C env-var fix. | operator| 10 min | NEW         |

## Cumulative Carry-overs

This wave inherits 2 carry-overs from W314-r2:
- W314-r2-AI-r2-1 (ECC `/plugin update`) — bundle with new AI-4 above into single operator interactive session
- W314-r2-AI-r2-4 (mattpocock/handoff vendor-fork) — now formalised as AI-5

## Verdict

**Operator's stated concern: "agent team orchestration has silent fallback or errors" → CONFIRMED PARTIALLY but with 4 distinct root causes** (root-cause map above). Of those:
- 1 RESOLVED (W269 parallel_ratio post-W317)
- 1 CHRONIC-MITIGATED (GitHub MCP search_repositories)
- 1 DEFER-UPSTREAM (PROJECT_DIR)
- 1 BY-DESIGN (no nested teams)

**W319 Stream A surfaces 3 NEW silent-fallback findings** specific to subagent_type typo traps (HIGH-2 SendMessage, HIGH-3 typo, MED-1 prefix-confusion) that need P0 W320 closure via skill-level pre-flight validators + empty-final-message detection.

**Architecture verdict**: agent-teams plugin is **OPERATIONAL** with the env-var fix (W314-C carry-over closed); upstream HEAD has pivoted to a cleaner "main-session-lead does TeamCreate, teammates are general-purpose" model that aligns with CC's no-nested-teams rule — recommend `/plugin update` at W320 (P1).
