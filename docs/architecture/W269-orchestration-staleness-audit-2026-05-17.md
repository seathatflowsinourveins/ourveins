# W269 — Agent-Teams Orchestration Staleness Audit + GPT-5.5 Convergence (2026-05-17)

> **Wave**: W269 | **Date**: 2026-05-17 | **Branch**: main | **Status**: AUDIT-COMPLETE; remediation partial-applied (CLAUDE.md mandate + `teammateMode`); operator-required follow-ups queued.
>
> **Driver**: User complaint — *"why your agent orchestration is staled? we need to using full sota orchestration with wshobson/agents, superpower, ecc and all sota agent skills invoke"*.
>
> **Method**: 5-agent parallel SOTA team dispatched via `superpowers:dispatching-parallel-agents` pattern (meta-demonstration of the very primitive being audited):
>
> 1. `agent-teams:team-lead` (wshobson) — gap list + work-stream decomposition → `tmp/w269-agent-team-lead-2026-05-17.md`
> 2. `sota-researcher` — version-drift cross-verification → `tmp/w269-sota-drift-2026-05-17.md`
> 3. `codex:codex-rescue` (GPT-5.5) — adversarial cross-model verdict → `tmp/w269-codex-gpt55-verdict-2026-05-17.md`
> 4. `incident-response:devops-troubleshooter` — full-dimensional system status → `tmp/w269-system-status-2026-05-17.md`
> 5. `everything-claude-code:harness-optimizer` — architectural review → `tmp/w269-harness-review-2026-05-17.md`

---

## Convergent verdict (3-agent agreement, 1 ground-truth-confirmed)

**PRIMARY CAUSE**: CLAUDE.md mandate missing — pointer-only ≤50-LOC root memory describes agent-teams as one of 4 parallel modes (line 12) but never mandates WHEN to pick which. Confidence **0.84** (codex GPT-5.5) + ~70% (team-lead) + corroborated by harness-optimizer's "no always-loaded rule" layer.

**SECONDARY CAUSES** (compound, all real):

| # | Cause | Source | Status |
|---|---|---|---|
| S1 | `superpowers@claude-plugins-official` NOT in `installed_plugins.json` despite cache present at `.claude/plugins/cache/claude-plugins-official/superpowers/5.1.0/` — so `using-superpowers` SessionStart bootstrap (~1,355 tokens of "invoke Skill tool before ANY response" mandate) never fires | Agent E (harness-opt) | GROUND-TRUTH CONFIRMED via `installed_plugins.json` read (no superpowers entries; only `enabledPlugins: {context-mode}`) |
| S2 | `agent-teams@1.0.2` SILENT DRIFT — upstream PR #535 (2026-05-17T00:46Z) "fix: agent teams coordination guardrails" rewrote 7/9 plugin files (all 4 team agent defs + `/team-spawn` command + 2 SKILL.md) but version string did NOT bump; installed SHA `34632bc` vs upstream `08ded5e7`. Standard `/plugin update` may no-op | Agent B (sota-drift) | UPSTREAM CONFIRMED via mcp__github commits |
| S3 | `plugin-eval@0.1.0` minor silent drift (PR #532 + #530 quality fixes, no `version` field) | Agent B | UPSTREAM CONFIRMED |
| S4 | `everything-claude-code@2.0.0-rc.1` content-drift — 285 commits behind on rc1 (ja-JP localization 455 files, AgentShield supply-chain hardening, Zed install target); version string unchanged | Agent B | UPSTREAM CONFIRMED |
| S5 | Skill description-match weakness — `team-composition-patterns` skill fires AFTER orchestrator already decided team mode (refinement, not decision skill); description doesn't match common operator prompts ("audit", "research", "deep-dive") | Agents A + C + E | ROOT FILES READ |
| S6 | No `UserPromptSubmit` hook mechanically forces team-spawn evaluation (and CC cardinal-rule-2 forbids self-invent hook scripts — only upstream plugin hooks or direct CLI invocations allowed) | Agents A + C | SETTINGS READ |

**REFUTED hypotheses** (per codex GPT-5.5 adjudication):

- `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` unset — REFUTED (verified `=1` in settings.json env + via shell probe)
- `CLAUDE_CODE_FORK_SUBAGENT` unset — REFUTED (verified `=1`)
- Plugin broken / partially installed — REFUTED (`agent-teams@1.0.2` correctly registered in `installed_plugins.json` line 312-322 + enabled at marketplace level)

---

## Ground-truth metrics (Agent D + verification reads)

| Dimension | Count | Status |
|---|---|---|
| Plugins installed (`installed_plugins.json`) | 46 | UP (CLAUDE.md "42 plugins" line 31 is stale — UPDATE) |
| Plugins enabled (`enabledPlugins`) | 1 (`context-mode`) | DEGRADED — others not explicitly enabled (skill auto-fire still works from cache) |
| MCP servers | 14 | UP |
| Hooks (settings.json) | 4 top-level (SessionStart, PreToolUse, PostToolUse, WorktreeRemove) | UP, cardinal-rule-2 compliant |
| env vars | 42 | UP; `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`, `CLAUDE_CODE_FORK_SUBAGENT=1`, `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=80` |
| `teammateMode` | `"in-process"` (Agent E auto-applied this fire) | UP (W269-NEW) |
| FalkorDB :16379 | LISTENING | UP |
| Ollama :16700 | LISTENING, 16 models incl. `qwen3-coder:30b-a3b-q4_K_M` + `qwen3-embedding:0.6b` | UP |
| Langfuse :3000 | v3.170.0 OK | UP |
| IkLlamaServer/LlamaSwap :8080 | LISTENING | UP |
| memory-MCP (sqlite_vec) | hit rate 50%, init avg 5.4s | UP |
| **CogneeMCP :8000** | service Running/Auto but port actively refuses connections | **DEGRADED** |
| llama-swap :4747 | no listener (likely re-routed to :8080) | UNKNOWN |
| Disk Z: free | 685.6 GB / 3726 GB (18%) | OK |
| Git tree | dirty: 5 modified + 27 untracked W265-W269 docs | NEEDS-COMMIT |

---

## Plugin SOTA drift summary (Agent B)

| Verdict | Count | Plugins |
|---|---|---|
| **UP-TO-DATE** | 6 | agent-orchestration, comprehensive-review, superpowers (cache 5.1.0), claude-plugins-official 20-bundle, engineering-skills, engineering-advanced-skills |
| **DRIFT-MAJOR-SILENT** | 1 | **agent-teams** — PR #535 rewrites 7/9 plugin files, version not bumped (direct cause amplifier) |
| **DRIFT-MINOR-SILENT** | 1 | plugin-eval — 2 quality PRs, no version field |
| **DRIFT-MAJOR (content)** | 1 | everything-claude-code — 285 commits behind on rc1 |
| **STALE (>30d)** | 0 | — |

**BRIEF CORRECTION**: `anthropics/claude-plugins-official` does NOT supply superpowers. Superpowers is sourced from `obra/superpowers-marketplace` → `obra/superpowers@5.1.0`. The cache dir `claude-plugins-official/superpowers/f2cbfbefebbf/` is an orphaned snapshot (no `plugin.json` at root).

---

## Applied this fire (autonomous, low-risk, reversible)

### A1 — CLAUDE.md mandate added (codex Edit 1, 1 LOC net add, ≤50-LOC budget preserved)

Bullet added immediately after the existing "Parallel execution (4 modes, W259-v8 U4)" bullet:

> **Agent-team trigger (W269 mandate)**: for any research / audit / review / debug / migration / large-feature fire with 2+ independent questions or workstreams, the parent orchestrator MUST first dispatch agent-teams (`/team-spawn research|security|review|debug|feature|migration` or `TeamCreate` + `Agent` teammates with `subagent_type=agent-teams:team-*`) — or parallel subagent fan-out via the Agent tool + `superpowers:dispatching-parallel-agents` pattern — before falling back to solo serial execution. Solo is reserved for trivial tasks, explicitly solo requests, or user-forbidden delegation; non-solo choice MUST record the chosen preset or the reason for not spawning.

This makes the trigger ALWAYS-LOADED (root memory preload per CCBP `claude-memory.md`) — converting "described capability" into "mechanical mandate".

### A2 — `teammateMode: "in-process"` added to `.claude/settings.json` root

Auto-applied by Agent E. Verified present via `ctx_execute_file` probe. Documented at `https://code.claude.com/docs/en/agent-teams`. Codex GPT-5.5 reviewed (verdict: PASS). Only valid mode on Windows without tmux. Reversible: delete the key.

---

## Operator-required follow-ups (CANNOT be done by parent Claude)

> These require typing into an active CC REPL session — the `/plugin install` and `/plugin update` commands are CC built-ins, not Agent-tool-callable. Per CCBP install discipline + cardinal-rule-1.

| # | Command | Why | Verification |
|---|---|---|---|
| O1 | `/plugin install superpowers@claude-plugins-official` | Creates the missing `installed_plugins.json` entry so SessionStart `hooks.json` wires; injects `using-superpowers` bootstrap (~1,355 tokens) mandating Skill tool invocation per-fire | After install, open new CC session; check `.claude/debug/cc-debug.log` for SessionStart hook firing + `hookSpecificOutput.additionalContext` containing `using-superpowers` content |
| O2 | `/plugin update agent-teams@claude-code-workflows` | Pick up PR #535 "fix: agent teams coordination guardrails" rewrite of 7/9 plugin files (version string did not bump) | Verify `gitCommitSha` in `installed_plugins.json` line 320 advances `34632bc` → `08ded5e7`; if no advance, delete cache dir `Z:/claude-sota-installed/.claude/plugins/cache/claude-code-workflows/agent-teams/1.0.2/` and `/plugin install` fresh |
| O3 | `/plugin update plugin-eval@claude-code-workflows` | Pick up PR #532 + PR #530 eval quality fixes | Same SHA-advance verification as O2 |
| O4 (optional) | `/plugin update everything-claude-code@everything-claude-code` | Roll forward to rc1 HEAD `4ca31057` (ja-JP localization + AgentShield supply-chain hardening + Zed install target — all additive) | Verify cache dir SHA advances `841beea4` → `4ca31057`; agents count grows 48→60, skills 182→230 |
| O5 | Investigate `CogneeMCP` DEGRADED | Service Running but :8000 refused | `sc qc CogneeMCP` → confirm bind port; `netstat -anob` → find process PID + actual port; resolve any conflict with :8080 (IkLlamaServer); `Restart-Service CogneeMCP -Force` |

After O1, the **mechanical chain restored**: superpowers SessionStart bootstrap fires → `using-superpowers` mandate injected → skill auto-fire becomes mandatory ("1% rule") → `dispatching-parallel-agents` description matches on audit/research/review keywords → per-fire team-spawn becomes default.

---

## Optional layer 2 (deferred — apply if A1 mandate alone proves insufficient in live traces)

### R3 — Local skill override at `.claude/skills/dispatching-parallel-agents.md`

Per Agent E + Agent A, create local override that survives `/plugin update`. Replace upstream skill description:

```yaml
description: Use when facing any task that contains 2+ separable sub-problems,
  research areas, review dimensions, audit areas, or independent work streams —
  including prompts using words like audit, deep-dive, research, review,
  migration, or comprehensive. Decompose first, then dispatch one agent per
  domain.
```

CC skill-resolution order: local `.claude/skills/` > plugin skills. Cardinal-rule-4 forbids `.claude/rules/`, NOT `.claude/skills/`. Defer until live evidence shows A1 mandate is not enough.

---

## Cost / throughput tradeoff (Agent E)

| Component | Tokens | Amortization |
|---|---:|---|
| `using-superpowers` bootstrap (SessionStart) | ~1,400 | Once per session |
| Skill invoke + `dispatching-parallel-agents` content | ~2,300 | Once per parallelized task |
| Orchestrator context construction per agent | ~1,000-3,000 | Per agent spawned |
| Per-agent execution (3-agent fan-out, ~50k ctx each) | ~150,000 | Per fan-out event |

3-agent parallel ≈ 3× token spend vs solo serial; completes in 1/3 wall-clock. Consistent with declared runtime profile (`CLAUDE_CODE_EFFORT_LEVEL=max`, `effortLevel=xhigh`, 1M ctx). Decision-graph self-limits to prevent over-spawning on coupled tasks; A1 mandate requires evaluation, not unconditional spawning.

---

## Meta-demonstration

**This very audit** was executed via the exact primitive being investigated:
- 5 parallel subagents (1 `agent-teams:team-lead` + 1 `sota-researcher` + 1 `codex:codex-rescue` + 1 `incident-response:devops-troubleshooter` + 1 `everything-claude-code:harness-optimizer`) fired in a single Agent-tool batch
- 2 anchoring skills invoked first (`superpowers:dispatching-parallel-agents` + `agent-teams:team-spawn`)
- Each subagent owned a disjoint output slot in `tmp/w269-*.md` (file-ownership map per `parallel-feature-development` skill)
- Total parallel wall-clock: ~16 minutes (longest fork = Agent E @ 958s) vs estimated ~60 min solo serial → **~4× speedup**
- Zero file-write conflicts; clean decomposition

**Before this fire**: orchestrator-Claude was running serial `ctx_batch_execute` probes (the previously-rejected pattern that triggered the user complaint). **After A1 mandate landed in CLAUDE.md**: future audit/research/review fires will pattern-match the mandate at preload and default to parallel team-spawn.

---

## Cite anchors

- CCBP `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-memory.md:34-40` @ HEAD `ac0d87d88642fb5e885a68a2e49a1962987da8bd` (VERIFIED 2026-05-17 W262 wave)
- Anthropic agent-teams docs: `https://code.claude.com/docs/en/agent-teams`
- Anthropic sub-agents docs: `https://code.claude.com/docs/en/sub-agents`
- Anthropic skills docs: `https://code.claude.com/docs/en/skills`
- Anthropic hooks docs: `https://docs.anthropic.com/en/docs/claude-code/hooks`
- wshobson/agents HEAD: `08ded5e7b0` (2026-05-17T00:46Z) — PR #535 silent drift target
- obra/superpowers HEAD: `f2cbfbefebbf` — up-to-date
- affaan-m/everything-claude-code HEAD: `4ca31057c6` (2026-05-17T17:53Z) — content-drift target
- Agent slot files: `tmp/w269-{agent-team-lead,sota-drift,codex-gpt55-verdict,system-status,harness-review}-2026-05-17.md`
- Prior wave reference: `docs/architecture/W268-final-convergence-2026-05-17.md`

---

## STOP gate

| Predicate | Status |
|---|---|
| All 5 dispatched agents returned with file deliverables | ✅ MET |
| Convergent verdict (≥3 agents agree on PRIMARY cause) | ✅ MET (A+C+E on CLAUDE.md mandate gap) |
| Ground-truth verification of S1 (superpowers install state) | ✅ MET (`installed_plugins.json` read) |
| A1 autonomous fix applied | ✅ MET (CLAUDE.md edit, 1 LOC net add, ≤50-LOC budget preserved) |
| A2 confirmed | ✅ MET (`teammateMode:"in-process"` verified) |
| Operator-required actions enumerated with verification commands | ✅ MET (O1-O5) |
| Synthesis doc written outside `/tmp` (architecture trail) | ✅ MET (this file) |

**W269 wave status**: AUDIT-COMPLETE; autonomous remediation applied; **5 operator-required follow-ups (O1-O5) queued**. Next wave gated on operator typing `/plugin install superpowers@claude-plugins-official` + `/plugin update agent-teams@claude-code-workflows` to close the silent-drift + bootstrap gap.
