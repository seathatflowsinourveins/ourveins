# SOTA Feature Activation Runbook

> **Status**: AUTHORITATIVE — codification of Anthropic CC CHANGELOG 2.1.x features mapped to this runtime (claude-sota-installed) installed primitives.
>
> **Cite class** (per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8):
> `constituents=[TIER-1-DIRECT @ Anthropic CHANGELOG https://github.com/anthropics/claude-code/blob/fdfbc06c7a6d9ace49c55b3761b1be05d276da6d/CHANGELOG.md §"## 2.1.139" (CC binary 2.1.139 [VERIFIED 2026-05-12 via `claude --version`]; SHA pinned to HEAD of `anthropics/claude-code:main` at 2026-05-12 per Pattern A fix-forward on T3 `2f971597` NEEDS-ATTENTION conf=0.86 medium F-001 "mutable upstream changelog" finding), TIER-1-DIRECT @ Anthropic CC docs https://code.claude.com/docs/en/{settings,sub-agents,hooks,env-vars,agent-view,permission-modes,scheduled-tasks} (live docs — re-verify per CR-1 Marker Decay on next session probe), TIER-3-LOCAL-OPERATOR-DERIVED @ this runtime's installed-state probe 2026-05-12]; effective_tier=TIER-3-LOCAL-COMPOSITION` (MIN_PRECEDENCE — local glue mapping upstream features to runtime state).
>
> **Discipline conformance**: cardinal-rules 1+5+7+8+9+10+11 (per `CLAUDE.md`). Bootstrap-class operator scaffolding — same class as `docs/operator-path-setup.md` (extracted per /doctor 40k-char ceiling).
>
> **Cross-model gate**: codex T1 foreground+tee verdict at `.claude/state/codex_consult_sota_feature_activation_OUT.txt` (Phase 1 bootstrap exception per CR-3).

---

## §1 ACTIVE-now matrix (already wired — verify state)

| Feature | Status | Source-of-truth at file:line |
|---|---|---|
| CC binary 2.1.139 native | INSTALLED-VIA-SYSTEM-PATH | `Z:/claude-sota-installed/.local/bin/claude.exe` [VERIFIED 2026-05-12 via `claude --version`] |
| `defaultMode: bypassPermissions` | ACTIVE (Wave 82d operator-override) | `.claude/settings.json` permissions block; revert trigger per CLAUDE.md §"Intentional divergences" (d) |
| `CLAUDE_CODE_FORK_SUBAGENT=1` | ACTIVE | `.claude/settings.json` env block; per CCBP `claude-settings.md:6,838 @ HEAD 48f2ceb` |
| `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` | ACTIVE | `.claude/settings.json` env block |
| `ENABLE_PROMPT_CACHING_1H=1` | ACTIVE | `.claude/settings.json` env block (TIER-1 per CCBP cache claims) |
| `ENABLE_TOOL_SEARCH=auto:5` | ACTIVE | `.claude/settings.json` env block (deferred-tools mode) |
| `CLAUDE_CODE_EFFORT_LEVEL=xhigh` | ACTIVE | `.claude/settings.json` env block |
| `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=85` | ACTIVE | `.claude/settings.json` env block; launcher-level copies removed W192 F3 Pattern A. CCBP documents upstream default as roughly 95 unless overridden (`Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-settings.md:826 @ HEAD 48f2cebeb88b389b27231c418ceadb65baf813fd`). |
| 11 MCP servers wired | ACTIVE | `.mcp.json` — github / context7 / deepwiki / playwright / chrome-devtools / repomix / serena / memory / graphiti / phoenix / gitnexus |
| 7 plugins enabled | ACTIVE | `.claude/settings.json` enabledPlugins — superpowers / codex / everything-claude-code / pyright-lsp / agent-sdk-dev / ralph-loop / frontend-design |
| 11 plugin marketplaces registered | ACTIVE | `.claude/plugins/marketplaces/` |
| 4-meta-skill stack auto-fire | ACTIVE | superpowers:using-superpowers / addy-agent-skills:using-agent-skills / everything-claude-code:skill-comply / skill-creator (per CLAUDE.md §"Skill Orchestration Discipline") |
| cwc-long-running-agents 5 primitives | INSTALLED + wired | `.local/cwc/` + `.claude/hooks/cwc/` matchers in `.claude/settings.json` PreToolUse blocks (track-read.sh on `Read`; verify-gate.sh on `Write\|Edit\|MultiEdit`; kill-switch.sh + steer.sh on `*`) |
| codex T1-T7 hooks | PARTIAL (T1 + T5 + safety_guard + agent_spawn wired; T2/T3/T6 install-pending Tier 1a per manifest §18.1) | `.claude/hooks/scripts/codex_t1_consult_gate.py` + `.claude/settings.json` hooks; manifest Section 2 |

**Hook counts** (per `.claude/settings.json` probe 2026-05-14): 36 top-level hook scripts; 58 wired hook handlers across lifecycle events.

## §2 OPERATOR-INVOKE recipes (CHANGELOG 2.1.x slash commands + CLI flags)

| Recipe | Invocation | When | Cite |
|---|---|---|---|
| `/goal <condition>` | `/goal "all Tier-1a rows INSTALLED + smoke-PASS"` | Multi-turn autonomous run with terminal predicate; shows live elapsed/turns/tokens panel | CHANGELOG 2.1.139 + `https://code.claude.com/docs/en/agent-view` |
| `claude agents` (CLI) | `claude agents` from any shell | List every running/blocked/done CC session in one view (research-preview) | CHANGELOG 2.1.139 |
| `eee --worktree <name>` | `eee --worktree wave-N` | Parallel-safe isolated worktree session (FM-02 race defense) | `Z:/claude-sota/.claude/rules/parallel-session-worktree-isolation.md`; `tools/eee.ps1` `$Args` pass-through L13-17 |
| `claude --agent <name>` | `claude --agent sota-researcher` (via `eee --agent sota-researcher`) | Start main-thread session AS a specific agent; loads agent frontmatter + skills/MCPs | `https://code.claude.com/docs/en/sub-agents` |
| `[1m]` extended context | Activate via `CLAUDE_CODE_DISABLE_1M_CONTEXT` UNSET (default); banner shows "(1M context)" suffix | Long arcs (Opus 4.7 / Sonnet 4.6); rot threshold ~300-400k vs ~150-180k under Path D | `https://code.claude.com/docs/en/model-config §"Extended context"` |
| `/loop <prompt>` | `/loop 30m /audit` cron OR `/loop` dynamic self-pace | Autonomous self-paced loop; CronCreate OR ScheduleWakeup primitives | `https://code.claude.com/docs/en/scheduled-tasks` |
| `/compact <hint>` | `/compact focus on <arc-state>, drop verbose verdict bodies` | Proactive steered context-summarization before local auto-compact target at 85%; exact target is runtime-local, not upstream default | CHANGELOG 2.1.x + CCBP `claude-settings.md:826` |
| `/rewind` / `Esc Esc` | Double-Esc in REPL | Drop failed tail, keep good reads; better than layering corrections | `Z:/claude-sota/.claude/rules/coordination.md §12` |
| `/branch` / `/fork` | `/branch <name>` | Fork conversation for parallel exploration (same filesystem) | CHANGELOG 2.0+ |
| `/handoff` | `/handoff` | Append to HANDOFF.md for cross-session baton | `.claude/commands/handoff.md` (if installed) |
| `/desktop` `/app` | `/desktop` | Open CC desktop app for the current session | CHANGELOG 2.0+ |
| `/effort` | `/effort` (interactive slider) | Adjust effort low/med/high/xhigh per turn | CHANGELOG 2.1.x |
| `/less-permission-prompts` | `/less-permission-prompts` | Scan transcripts → propose prioritized allowlist for settings.json | CHANGELOG 2.1.x |
| `/context all` | `/context all` | Per-skill token estimates with tokenizer-accurate values | CHANGELOG 2.1.139 |
| `claude plugin details <name>` | `claude plugin details superpowers` | Component inventory + projected per-session token cost | CHANGELOG 2.1.139 |
| `/scroll-speed` | `/scroll-speed` | Tune mouse wheel scroll with live preview | CHANGELOG 2.1.139 |
| `/teleport` | `/teleport` | Jump to session location | CHANGELOG 2.0+ |
| `--dangerously-skip-permissions` | flag at startup | Bypass-permissions session start (use sparingly; current runtime already in `bypassPermissions` mode per Wave 82d) | `https://code.claude.com/docs/en/settings` |

## §3 HOOK-AUTHOR recipes (latent CHANGELOG hook fields — currently 0/21 usage)

| Field | Pattern | When | Cite |
|---|---|---|---|
| `asyncRewake: true` | `{"type":"command","command":"...","async":true,"asyncRewake":true}` | Background hook wakes Claude on exit-2 with stderr-as-system-reminder; ZERO per-edit latency + retroactive enforcement on REVERSIBLE actions (Edit/Write). NOT for irreversible (`git push`, `rm -rf`) — those need sync | `https://code.claude.com/docs/en/hooks` lines 436-440; `Z:/claude-sota/.claude/rules/layered-gates-architecture.md §2` |
| `if: <PermissionRule>` | `{"matcher":"Bash","if":"Bash(git *)","hooks":[...]}` | Conditional spawn — filter to specific Bash patterns before spawning process; reduces overhead | CHANGELOG 2.1.x; `https://code.claude.com/docs/en/hooks` |
| `args: string[]` (exec form) | `{"type":"command","args":["python","script.py","${arg}"]}` (no shell, no quoting) | Spawn command directly; path placeholders never need quoting | CHANGELOG 2.1.139 |
| `continueOnBlock: true` | `{"event":"PostToolUse",...,"continueOnBlock":true}` | PostToolUse only — feed rejection reason back to Claude and continue the turn instead of aborting | CHANGELOG 2.1.139 |
| `permissionDecision: "deny"` JSON | hook emits `{"hookSpecificOutput":{"permissionDecision":"deny","permissionDecisionReason":"<why>"}}` | PreToolUse blocking (sync); used by `safety_guard.py` 12-destructive-pattern deny floor | `https://code.claude.com/docs/en/hooks` |
| `updatedInput` with allow | hook emits `{"permissionDecision":"allow","updatedInput":{...}}` | Satisfy `AskUserQuestion` from PreToolUse — headless integrations collect answers via their own UI | CHANGELOG 2.1.139 |
| Hook attribution | `payload.get("agent_id")` + `payload.get("agent_type")` at TOP LEVEL of stdin JSON | Parallel-agent attribution per `Z:/repos/deps/claude-agent-sdk-python/src/claude_agent_sdk/types.py:246-262 @ b512f256` | `.claude/rules/audit-action-loop.md §Hook telemetry contract` |

## §4 SUBAGENT-DISPATCH recipes

| Recipe | When | Cite |
|---|---|---|
| Fork subagent (default in this runtime) | Compound-engineering tasks where subagent needs parent context (mid-design diagrams, web-verify, tangential exploration). `CLAUDE_CODE_FORK_SUBAGENT=1` already ENV-set | `Z:/claude-sota/.claude/rules/team-orchestration.md §"Fork-vs-fresh subagent routing"` |
| Fresh subagent | Adversarial review where parent context could bias; FM-09 2-stage harness-fit verification; clean-slate research | Same rule §"Routing decision" |
| Skill auto-fire 1% rule | Describe task — relevant skill picks up via description-match; no manual invocation needed | `Z:/claude-sota-installed/.claude/plugins/cache/claude-plugins-official/superpowers/<v>/skills/using-superpowers/SKILL.md` |
| FM-17.f Path P (codex exec foreground+tee) | Subagent dispatch fails pre-fire <2s + 0 tokens under parent `[1m]` flag → orchestrator runs codex directly | `Z:/claude-sota/.claude/rules/fm17-subagent-fleet-depletion.md §FM-17.f`; `docs/fm17f-deep-dive-2026-05-09.md` |
| FM-17.f Path D (1M kill-switch) | Activate `CLAUDE_CODE_DISABLE_1M_CONTEXT=1` (CLAUDE.local.md ENV (h)) when explicit fan-out Wave needs 3-5 BRIDGE-MODE subagents as load-bearing | Same rule + ENV (h) block |
| Standing directive 3-5 agent team | Every non-trivial fire spawns 3-5 agent team per Wave 24-D OWNED at n=3 user-trigger | `Z:/claude-sota/.claude/rules/advanced-agent-team-standing-directive.md` |
| CADP rule 5 fleet probe | Before 6th+ subagent dispatch in arc, verify ≥3 accounts show `Session 🟢 <50%` via `python Z:/claude/ccc/tools/status.py` | `Z:/claude-sota/.claude/rules/parallel-agent-wave.md §Cache-Aware Dispatch Pacing` |

## §5 CROSS-MODEL gate recipes (CR-3 Phase 1 bootstrap exception)

| Touchpoint | Invocation | When | Cite |
|---|---|---|---|
| T1 pre-edit consult | `codex exec --ephemeral -p deep-review-exec --color never < .claude/state/codex_consult_<topic>.txt 2>&1 \| tee .claude/state/codex_consult_<topic>_OUT.txt` | BEFORE Edit/Write on design surface; canonical pair-basename rule (prompt at `<topic>.txt`; verdict at `<topic>_OUT.txt`) | `Z:/claude-sota/.claude/rules/cross-model-consensus.md §The contract`; `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md §Pattern A` |
| T1 verdict reading | `wc -l <OUT>` → `grep -nE "VERDICT:\|conf=\|APPROVE\|NEEDS-REVISION\|REJECT" <OUT> \| tail -20` → `tail -200 <OUT>` | EOF-first discipline per Pattern B (codex echoes templates near start; real verdict at EOF) | Same rule §Pattern A/B |
| T2 working-tree review | `codex exec review --uncommitted` (default profile; `-p` REJECTED on this subcommand) | BEFORE commit on multi-file changes; mechanically enforced once `codex_t2_pre_commit_gate.py` Tier 1a hook installs | `Z:/claude-sota/.claude/rules/codex-cli-flag-positioning.md` |
| T3 postcommit auto | Auto-fires via PostToolUse `Bash(git commit *)` hook (`codex_postcommit_review.py`) | After commit; verdict at `.claude/state/codex_review_HEAD_<sha8>.txt` | Section 2 manifest install row |
| T4 post-push cumulative | Auto-fires via PostToolUse `Bash(git push *)` hook (`codex_prepush_review.py`) | After push; cumulative branch diff vs base; queued-fix-forward | Same Section 2 |
| T5 plan-stage | `/plan-codex-review` slash command (manual) | DURING plan-mode; codex proposes additive Phase-N.5 inserts | `.claude/commands/plan-codex-review.md` |
| T6 stop-gate | Auto-fires via Stop hook (`codex_stop_review_gate.py`) | At session-end on dirty-tree; sync deep-review 900s | Section 2 |
| T7 ask-without-act gate | Auto-fires via Stop hook (`auto_proceed_gate.py`) | At session-end; detects "Reply with A/B" + 0 tool_count; emits decision:block | Section 2 |
| Phase 1 bootstrap exception | While Tier 1a hooks PLANNED: satisfy CR-3 via orchestrator-side foreground+tee codex exec OR BRIDGE-MODE subagent dispatch | This runtime currently in Phase 1; transitions to Phase 2 when Tier 1a INSTALLED + smoke-PASS per cardinal-rule-7 trigger predicate | CLAUDE.md cardinal-rule-3 + cardinal-rule-7 |

## §6 OBSERVABILITY recipes

| Recipe | Invocation | Cite |
|---|---|---|
| Per-skill token estimates | `/context all` | CHANGELOG 2.1.139 |
| Plugin token-cost projection | `claude plugin details <name>` | CHANGELOG 2.1.139 |
| OTEL span agent attribution | API requests carry `x-claude-code-agent-id` + `x-claude-code-parent-agent-id` headers; `claude_code.llm_request` OTEL spans include `agent_id` + `parent_agent_id` attributes | CHANGELOG 2.1.139 |
| Scheduled-task timestamp markers | Transcripts now include markers when `/loop` / `CronCreate` fire | CHANGELOG 2.1.x |
| Subagent transcript mining | `.claude/state/subagent_transcripts.jsonl` per `subagent_transcript_mine.py` SubagentStop hook (4th OVER/UNDER/HNF detection axis) | `Z:/claude-sota/.claude/rules/synthesis-layer-verify.md §SubagentStop transcript-mining` |
| Hook telemetry attribution | All JSONL-emitting hooks persist `agent_id` + `agent_type` at top level per SDK `_SubagentContextMixin` | `.claude/rules/audit-action-loop.md §Hook telemetry contract` |
| ctx_stats / ctx_search | `mcp__plugin_context-mode_context-mode__ctx_stats` for context consumption; `ctx_search` for indexed-corpus retrieval | context-mode plugin |
| MCP overhead audit | Static cost via chars/4 token estimate per `Z:/repos/deps/cnighswonger-claude-code-cache-fix/docs/extension-impact-guide.md:323-325` derivation | `.claude/rules/audit-action-loop.md §When this discipline applies` row mcp_overhead_audit |

## §7 LATENT-flip operator activations (uncomment / re-flip / re-add when needed)

| Flip | Location | Trigger | Cite |
|---|---|---|---|
| `CLAUDE_CODE_DISABLE_1M_CONTEXT=1` | `CLAUDE.local.md` ENV (h) (currently commented) | Activate ONLY for explicit fan-out Waves declaring 3-5 BRIDGE-MODE subagent dispatch as load-bearing per advanced-agent-team-standing-directive invariants; preserves cross-model gate at ZERO cost vs Path P preserves 1M | `docs/fm17f-deep-dive-2026-05-09.md §3 Path D` |
| `permissions.defaultMode: "auto"` revert | `.claude/settings.json` permissions | Revert from current `bypassPermissions` (Wave 82d temporary override) when 3 predicates hold: (1) Anthropic classifier reliable, (2) Tier 5 manifest rows INSTALLED+smoke-PASS, (3) arc-convergence ≥7 fires no NEEDS-REVISION conf>0.85 | `CLAUDE.md §"Intentional divergences" (d)` + CCBP `claude-settings.md:251 @ 48f2ceb` SOTA-canonical |
| `MAX_THINKING_TOKENS` re-add | `.claude/settings.json` env block | Was Wave 77 DROPPED per fleet-arch-vs-official top-offender #1; re-add IF specific reasoning depth benchmark demonstrates value per CR-10 research-first | `tools/eee.ps1:78` historical comment + CCBP `claude-settings.md` env table |
| `ANTHROPIC_MODEL` global override | `tools/eee.ps1` env block | DO NOT set globally per CLAUDE.md §"Intentional divergences" (a) — per-agent frontmatter `model:` is load-bearing in this runtime; no global override | `CLAUDE.md §"Intentional divergences"` row (a) |
| `CLAUDE_PLUGIN_ROOT` | `tools/eee.ps1` env block (currently commented) | Set after first `/plugin install` lands; per manifest install-row | CLAUDE.local.md ENV (b) + `Z:/claude-sota/CLAUDE.local.md` Wave 50 Pattern 6 Step 7 |
| `CLAUDE_CODE_DISABLE_CRON=1` | session env | Immediately stop scheduled cron jobs mid-session | CHANGELOG 2.1.x |
| Plugin enable/disable | `.claude/settings.json` enabledPlugins | Add/remove plugin per CR-12 PRIMARY upstream-install path | `https://code.claude.com/docs/en/plugins` |
| asyncRewake hook retrofits | `.claude/settings.json` hooks blocks (currently 0/21 use it) | Convert sync REVERSIBLE-action hooks (gitnexus impact guard etc.) to `async: true, asyncRewake: true` per layered-gates §2 pattern selection | `Z:/claude-sota/.claude/rules/layered-gates-architecture.md §2 asyncRewake pattern` |

## §8 UPDATE TRIGGERS

Re-evaluate this runbook when:

- **CC binary bumps past 2.1.139** — refresh CHANGELOG cite anchors + add new features
- **New feature ships in CHANGELOG** matching ACTIVE/LATENT/UNUSED axes — add row to relevant section
- **FM-17.* sub-class additions** (currently a/b/c/d/e/f per `Z:/claude-sota/.claude/rules/fm17-subagent-fleet-depletion.md`) — extend §4 subagent-dispatch recipes
- **Tier 1a hooks (T2/T3/T6) install** — flip §5 cross-model gate rows from PLANNED to ACTIVE
- **Wave 82d operator-override expires** — bypassPermissions reverts to `auto`; flip §7 latent-flip row
- **A new TIER-1-DIRECT cite class emerges** (e.g., Anthropic ships new official-docs URL) — update cite-class header
- **Plugin marketplace addition** — refresh §1 ACTIVE-now matrix counts
- **`CLAUDE_CODE_FORK_SUBAGENT=1` deprecates or becomes default** — flip §4 fork-subagent recipe accordingly
- **Sibling claude-sota ships a parity runbook** — re-evaluate cite-class lattice (this runbook may flip from design-novel to cite-import-AMBER per CR-12 lattice)

## Cross-references

- `Z:/claude-sota/.claude/rules/cross-model-consensus.md` — T1-T7 lifecycle mechanics (§5 cross-model gate refers here, does NOT duplicate)
- `Z:/claude-sota/.claude/rules/fm17-subagent-fleet-depletion.md §FM-17.f` — subagent dispatch failure recovery (§4 Path P+D refers here)
- `Z:/claude-sota/.claude/rules/layered-gates-architecture.md` — hook architecture mechanics (§3 hook-author refers here)
- `Z:/claude-sota/.claude/rules/parallel-session-worktree-isolation.md` — worktree isolation (§2 `--worktree` recipe refers here)
- `Z:/claude-sota/.claude/rules/parallel-agent-wave.md §CADP` — cache-aware dispatch pacing (§4 standing-directive refers here)
- `Z:/claude-sota/.claude/rules/audit-action-loop.md §Hook telemetry contract` — agent_id/agent_type propagation (§3 hook attribution refers here)
- `Z:/claude-sota/.claude/rules/synthesis-layer-verify.md §SubagentStop transcript-mining` — 4th OVER/UNDER/HNF axis (§6 observability refers here)
- `docs/operator-path-setup.md` — bootstrap-extracted operator reference STRUCTURAL PRECEDENT
- `docs/sota-installed-manifest.md` §18.1 — Tier 0/1a/1b/1c/2/3/4/5 enumeration (§1 ACTIVE-now matrix refers here)
- `docs/fm17f-deep-dive-2026-05-09.md` — FM-17.f 1M-context-entitlement billing-class blocker deep-dive (§4 + §7 refer here)
- `https://github.com/anthropics/claude-code/blob/fdfbc06c7a6d9ace49c55b3761b1be05d276da6d/CHANGELOG.md` §"## 2.1.139" — TIER-1-DIRECT authority for every recipe cited in §2-§7 (SHA-pinned immutable anchor per T3 `2f971597` F-001 fix-forward 2026-05-12; HEAD of `anthropics/claude-code:main` at codification time; re-verify SHA on next CHANGELOG bump per CR-9 install-risk discipline)
- `https://code.claude.com/docs/en/{settings,sub-agents,hooks,env-vars,agent-view,permission-modes,scheduled-tasks}` — TIER-1-DIRECT supporting docs

## Provenance

- **Codification fire**: 2026-05-12 post-CHANGELOG-survey turn (user directive *"optimize all with our architecture, utilize them in future sessions"*)
- **Empirical probes**: orchestrator-direct Read/Grep/Glob (Explore subagent dispatch failed FM-17-class 502 on claude-haiku-4-5 3/3 same-arc 2026-05-12)
- **Cross-model gate**: codex T1 foreground+tee verdict at `.claude/state/codex_consult_sota_feature_activation_OUT.txt` (Phase 1 bootstrap exception per CR-3)
- **Plan file**: `.claude/plans/fluttering-wandering-pond.md` (approved 2026-05-12)
- **Audit-trail**: append-only entry in `docs/install-provenance.md` under Wave-NEW-N row
