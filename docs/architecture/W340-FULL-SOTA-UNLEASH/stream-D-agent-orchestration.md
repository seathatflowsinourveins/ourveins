# W340 Stream D — Agent Orchestration Architectural Audit

**Wave**: W340 FULL-SOTA-UNLEASH
**Stream**: D — Agent Orchestration
**Date**: 2026-05-20

> **POST-COMMIT ANNOTATION (W340 wave-close, 2026-05-20)**: Findings F2 (UserPromptSubmit hook dead-code) **CLOSED in this same commit** via `.claude/settings.json` wiring `tools/parallel-guard-userpromptsubmit.mjs`. References below to "4 SEV-1 gaps" / "UserPromptSubmit ... NOT wired" / "F2 dead-code" describe PRE-COMMIT audit-time state (snapshot semantics — historically accurate as of audit). Live reconciliation surface = `ARCHITECTURE-V2.md` L51 + L149 + L205. Remaining open gaps = F3 (allowlist regen vapor), F4 (165 bare-name FQN), F5 (ambiguity-warn) → carry-forward W341.
**Runtime**: `Z:\claude-sota-installed` (Windows 11 Pro, Z:-portable install)
**Auditor scope**: subagent inventory · allowlist coverage · parallel-dispatch guard · validator enforcement · agent-teams plugin · env-var wiring · hook integration · SOTA comparison · FQN discipline · gap-vs-SOTA discipline skills · regeneration mechanism
**Cardinal-rule anchors**: CR-3 (sub-agents) + CR-5 R5-corollary (dual-mode guards) + W269/W312-D parallel-mandate + W331 axis-1 #5 (allowlist) + W333 Stream D Finding #5 (FQN discipline) + W338-P0d test contract
**SOTA references**: `wshobson/agents@deepwiki` (wshobson/agents § Agent Teams & Parallel Workflows #5.9), `anthropics/claude-cookbooks @ 39a350b6 patterns/agents/prompts/research_lead_agent.md:135-137`, `https://docs.anthropic.com/en/docs/claude-code/sub-agents`, `https://code.claude.com/docs/en/headless`

---

## Executive Summary

The runtime's agent-orchestration layer is **mostly cardinal-rule-compliant** but has **4 SEV-1 and 5 SEV-2 gaps** that prevent it from reaching SOTA-grade discipline. All 6 required orchestration skills (`agent-budget-discipline`, `checkpoint-resume`, `worker-failure-termination-guard`, `empty-final-message-guard`, `dispatching-parallel-agents-w321-fork`, `parallel-dispatch-mandate`) are present locally; `agent-teams@claude-code-workflows` plugin is enabled with all 4 teammates (`team-lead`, `team-reviewer`, `team-debugger`, `team-implementer`), 6 skills, 7 commands; the W326 P0-A2 allowlist (`subagent-type-allowlist.json`) has 307 entries with 0 missing-from-cache drift; both `preagent-parallel-guard.mjs` and `preagent-subagent-validator.mjs` exit-2 BLOCK in production paths with documented operator escape-hatches. **However**, four structural defects remain: (1) **no `--regenerate` mechanism / no `build-subagent-allowlist.mjs` script exists** — the allowlist is static and silently drifts as plugins update; (2) the **UserPromptSubmit hook for parallel-intent detection exists on disk (`tools/parallel-guard-userpromptsubmit.mjs` 3690 B) but is NOT wired into `.claude/settings.json:hooks.UserPromptSubmit` (empty array)** — the W331-r3 P0.1 closure is half-installed; (3) **165 duplicate bare-name allowlist entries** (code-reviewer collides across 7 distinct plugin sources) directly violate W333 Stream D Finding #5 FQN-discipline; (4) **CLAUDE.md L13 claims `agent-teams` plugin lives at `.claude/plugins/cache/agent-teams/` — it does not; it lives at `.claude/plugins/marketplaces/claude-code-workflows/plugins/agent-teams/`** (audit-trap echoing the W332 hooks-discovery trap).

---

## Audit Dimension 1 — Subagent Inventory

### 1.1 Counts and locations

| Source | Count | Method | Citation |
| --- | --- | --- | --- |
| Plugin cache `.claude/plugins/cache/**/agents/*.md` | 6,479 files (re-cached versions) | `Get-ChildItem -Recurse -Filter '*.md' \| Where FullName -match '\\agents\\'` | `tmp/W340-stream-D-agents-plugin.txt:1-6479` |
| Distinct plugin-agent pairs (after dedupe across version-snapshots) | 162 | grouped by `(plugin-source, filename)` | computed |
| Distinct bare agent names | 130 | `Split-Path Leaf -Unique` | computed |
| Local `.claude/agents/*.md` | 4 | direct enumeration | `tmp/W340-stream-D-agents-local.txt` |
| `agent-teams` plugin teammates | 4 | `.claude/plugins/marketplaces/claude-code-workflows/plugins/agent-teams/agents/` | filesystem |

**Local agents** (operator-curated, NOT plugin-shipped) — all valid in allowlist:
- `evaluator.md`, `gpt5-archaeologist.md`, `wshobson-devops-troubleshooter.md`, `wshobson-security-auditor.md`

**Agent-teams plugin teammates** (`Z:\claude-sota-installed\.claude\plugins\marketplaces\claude-code-workflows\plugins\agent-teams\agents\`):
- `team-debugger.md` · `team-implementer.md` · `team-lead.md` · `team-reviewer.md`

### 1.2 Filename collision (FQN-discipline violation)

Top 10 collisions across distinct plugin sources (excludes cache-version snapshots):

| Filename | Distinct plugins | Source plugins (sample) |
| --- | --- | --- |
| `code-reviewer.md` | **7** | comprehensive-review, incident-response, tdd-workflows, feature-dev, pr-review-toolkit, agent-skills (vendored), everything-claude-code |
| `analyzer.md` | 3 | document-skills, example-skills, skill-creator |
| `code-simplifier.md` | 3 | code-simplifier (self), pr-review-toolkit, everything-claude-code |
| `comparator.md` | 3 | document-skills, example-skills, skill-creator |
| `grader.md` | 3 | document-skills, example-skills, skill-creator |
| `wiki-ingestor.md` | 2 | engineering-advanced-skills, llm-wiki |
| `security-auditor.md` | 2 | comprehensive-review, code-modernization |
| `experiment-runner.md` | 2 | autoresearch-agent, engineering-advanced-skills |
| `debugger.md` | 2 | debugging-toolkit, incident-response |
| `context-manager.md` | 2 | agent-orchestration, context-management |

**Severity**: SEV-1
**Gap-vs-SOTA**: `wshobson/agents` deepwiki documents canonical FQN form `agent-teams:team-reviewer`, `agent-teams:team-lead`, etc. The W333 Stream D Finding #5 mandate (CLAUDE.md L20) requires FQN-form `<plugin>:<agent-name>`; bare `code-reviewer` is ambiguous across 7 sources.
**Recommended fix**: Add a `SubagentDispatchedTypeWarn` advisory ladder to `preagent-subagent-validator.mjs` — when a bare-name resolves to ≥2 FQN options in the allowlist, emit a hookSpecificOutput WARNING listing the candidate FQNs and the most-recently-loaded resolution. Promote to hard-block in W341 after a 1-wave grace period.

---

## Audit Dimension 2 — Allowlist Coverage

### 2.1 File state

| Field | Value | Citation |
| --- | --- | --- |
| Path | `Z:\claude-sota-installed\.claude\state\subagent-type-allowlist.json` | filesystem |
| Size | 10,685 bytes | `Get-Item .Length` |
| `_count` field | 307 | `subagent-type-allowlist.json:3` |
| Actual `allow[]` length | **307** (matches doc) | computed |
| `built_in[]` length | 4 (`Explore`, `Plan`, `Sonnet-only`, `general-purpose`) | `:314-319` |
| `_generated` field | `2026-05-19` | `:4` |
| Bare-name entries in allow | 142 | computed |
| FQN-form entries in allow | 165 | computed |

### 2.2 Drift vs current cached agent inventory

| Probe | Result |
| --- | --- |
| Distinct bare agent names in plugin cache | 130 |
| Distinct bare names missing from allowlist | **0** (no drift detected) |
| Duplicate bare+FQN entries (W333 FQN-discipline violations) | **165** entries |

**Severity (coverage)**: SEV-3 (no missing entries — current state is OK).
**Severity (FQN-discipline)**: SEV-1 — 165 bare-name entries collide with FQN entries; `code-reviewer` resolves to 7 distinct plugin agents.
**Gap-vs-SOTA**: `wshobson/agents` ships explicit FQN-only namespaces (`agent-teams:team-*`). The 142 bare entries in this runtime's allowlist are a non-compliant convenience surface that defeats the W333 F5 discipline.
**Recommended fix**: Migrate the bare-name entries to a separate `legacy_bare_aliases[]` list with deprecation flag; emit `LEGACY-BARE-ALIAS-WARN` hookSpecificOutput on use; remove in W342+.

### 2.3 Allowlist regeneration mechanism — **MISSING**

`subagent-type-allowlist.json:2` `_doc` field claims: *"Refresh by re-running tools/preagent-subagent-validator.mjs --regenerate (or rebuild via build script)."*

| Probe | Result |
| --- | --- |
| `tools/build-subagent-allowlist.mjs` | NOT FOUND |
| `tools/regen-subagent-allowlist.mjs` | NOT FOUND |
| `tools/preagent-subagent-validator.mjs --regenerate` flag handler | **NOT IMPLEMENTED** — file only has `main()` reading event from stdin; no argv parsing |
| `writeFile` to `subagent-type-allowlist.json` anywhere in `tools/` | **NONE** |
| SessionStart hook that rebuilds allowlist | NONE |

**Severity**: SEV-1
**Gap-vs-SOTA**: CLAUDE.md L20 promises *"refresh via `--regenerate` flag or W332.2 build-script"* — neither exists. Allowlist is hand-curated and will silently drift on plugin add/remove.
**Recommended fix**: Write `tools/build-subagent-allowlist.mjs` (W341 P0-A): walks `.claude/plugins/{cache,marketplaces}/**/agents/*.md` + `.claude/agents/*.md`, extracts `name:` frontmatter, emits both bare and FQN entries, persists `_generated` ISO date + plugin-SHA manifest. Wire as `SessionStart` hook with idempotent skip if filesystem mtime < manifest mtime.

---

## Audit Dimension 3 — Parallel-Dispatch Guard State

### 3.1 `tools/preagent-parallel-guard.mjs`

| Property | Value | Citation |
| --- | --- | --- |
| Mode | **Dual: ADVISORY (1st violation) + BLOCKING exit 2 (2nd consecutive)** | `preagent-parallel-guard.mjs:4-11, :382-399` |
| 1st violation behavior | Emits `hookSpecificOutput.additionalContext` warning, exit 0 | `:170-181, :401-406` |
| 2nd consecutive behavior | `process.stderr.write` block message, **exit 2** | `:382-398` |
| Counter state file | `${CLAUDE_CODE_TMPDIR}/.parallel-guard-counter-${sessionId}.json` | `:198-201` |
| Tick file (race-free turn-window) | `${tickBase}/.parallel-guard-ticks-${safeId}.jsonl` | `:301-302` (POSIX.1-2017 §3.293 PIPE_BUF guarantee) |
| Operator escape hatches | (a) `CLAUDE_PARALLEL_GUARD_DISABLE=1` env var; (b) marker file `.claude/state/parallel-guard-bypass.marker` | `:251-269` |
| Multi-stream signal source | (i) UPS-hook intent flag (preferred); (ii) JSONL text-scan fallback via `MULTI_STREAM_RE` regex `:42-43` | `:357-372` |
| TTL false-positive guard | 5 min (`VIOLATION_TTL_MS`) | `:185` |
| Counter reset triggers | parallel evidence (≥2 Agent blocks in PRIOR turn) OR turn-window tick count ≥2 OR 5-min idle | `:327-333, :350-356, :375-377` |
| Hook wired in `.claude/settings.json` | YES — `hooks.PreToolUse[Agent]` first entry | `settings.json:hooks.PreToolUse[Agent][0]` |

**Severity**: SEV-3 (compliant — W330 P0-A upgrade landed and is wired).
**Gap-vs-SOTA**: Counts as CR-5-exception-condition-(b) per CLAUDE.md L22 — dual-mode is the sanctioned R5-corollary pattern. The W325-A F1 SEV-1 root cause (`parallel_ratio=0.0036 over 1676 sessions`) is mechanically closed by the L382-399 exit-2 path **provided** the UPS-hook intent flag is set (see Dimension 7 for the wiring gap).
**Note**: This is the strongest enforcement point in the orchestration layer.

---

## Audit Dimension 4 — Subagent Validator State

### 4.1 `tools/preagent-subagent-validator.mjs`

| Property | Value | Citation |
| --- | --- | --- |
| Unknown subagent_type | **BLOCKS exit 2** with fuzzy top-5 suggestions | `:79-89, :107-108` |
| Suggestion algorithm | Prefix-match + substring-match, cap 5 | `:64-77` |
| Built-in bypass | `Explore`, `Plan`, `Sonnet-only`, `general-purpose` always pass | `:32, :97` |
| Empty subagent_type bypass | Yes — exit 0 if `typeof sub !== 'string' \|\| sub.length === 0` | `:94-96` |
| Soft-fail conditions | (a) allowlist file missing/unparsable → exit 0 + stderr advisory | `:99-105` |
| Soft-fail on validator crash | Yes — `catch` block at `:111-115` exits 0 with stderr advisory | `:111-115` |
| Allowlist source override | `W326_SUBAGENT_ALLOWLIST` env var | `:28-30` |
| Hook wired in `.claude/settings.json` | YES — `hooks.PreToolUse[Agent]` second entry | `settings.json:hooks.PreToolUse[Agent][1]` |

**Severity**: SEV-3 (compliant for production behavior).
**Gap-vs-SOTA**: The validator does NOT emit a warning for ambiguous bare-names that resolve to multiple FQN candidates — see Dim-1.2 + Dim-2.2 fix.
**Recommended fix (incremental)**: Add ambiguity-detection between L97 (builtin check) and L98 (allow check): if `sub` is bare AND `allow` contains ≥2 entries matching `*:${sub}`, emit `hookSpecificOutput.additionalContext` warning listing the FQN candidates, then continue to allow-check.

---

## Audit Dimension 5 — Agent-Teams Plugin Presence

### 5.1 Filesystem location (CLAUDE.md L13 audit-trap)

**CLAUDE.md L13** claims agent-teams is dispatched via `subagent_type=agent-teams:team-*`; implies the plugin is installed and active.

| Probe | Result | Citation |
| --- | --- | --- |
| `.claude/plugins/cache/agent-teams/` | **DOES NOT EXIST** | filesystem |
| `.claude/plugins/cache/wshobson*/agents/` | DOES NOT EXIST | filesystem |
| `.claude/plugins/marketplaces/claude-code-workflows/plugins/agent-teams/` | **EXISTS** — agents/skills/commands all present | filesystem |
| `enabledPlugins["agent-teams@claude-code-workflows"]` | `true` | `settings.json:enabledPlugins` |
| Marketplace record | `Z:\claude-sota-installed\.claude\plugins\marketplaces\claude-code-workflows\plugins\agent-teams\.claude-plugin\plugin.json` | filesystem |
| Source repo | `wshobson/agents` (under `claude-code-workflows` marketplace alias) | `settings.json:extraKnownMarketplaces.claude-code-workflows` |

### 5.2 Inventory

| Component | Count | Filenames |
| --- | --- | --- |
| Agents (subagent types) | 4 | `team-debugger.md`, `team-implementer.md`, `team-lead.md`, `team-reviewer.md` |
| Skills | 6 | `multi-reviewer-patterns`, `parallel-debugging`, `parallel-feature-development`, `task-coordination-strategies`, `team-communication-protocols`, `team-composition-patterns` |
| Commands | 7 | `team-debug.md`, `team-delegate.md`, `team-feature.md`, `team-review.md`, `team-shutdown.md`, `team-spawn.md`, `team-status.md` |
| Hooks | 0 | n/a |

### 5.3 Allowlist coverage for agent-teams

| Entry | Present? |
| --- | --- |
| `agent-teams:team-lead` | ✓ `:21` |
| `agent-teams:team-reviewer` | ✓ `:22` |
| `agent-teams:team-debugger` | ✓ `:19` |
| `agent-teams:team-implementer` | ✓ `:20` |
| Bare `team-lead`, `team-reviewer`, `team-debugger`, `team-implementer` | ✓ all 4 also present `:292-295` — **bare-vs-FQN duplicates per Dim-2.2** |

**Severity**: SEV-2 (audit-trap; functional but documentation drift)
**Gap-vs-SOTA**:
1. CLAUDE.md L13 implies a cache-path; the plugin lives in marketplaces — operators relying on cache-path patterns will misdiagnose presence.
2. The 4 bare-name `team-*` entries are W333 F5 violations.

**Recommended fix**:
1. CLAUDE.md L13 cite update: `marketplaces/claude-code-workflows/plugins/agent-teams/` (NOT `cache/agent-teams/`).
2. Per Dim-2.2, demote bare team-* entries to `legacy_bare_aliases[]`.

---

## Audit Dimension 6 — Sub-agent Env-Var Settings

| Variable | Required | Process env | settings.json env | Status |
| --- | --- | --- | --- | --- |
| `CLAUDE_CODE_FORK_SUBAGENT` | `=1` | `1` ✓ | `1` ✓ | OK |
| `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` | `=1` | `1` ✓ | `1` ✓ | OK |
| `CLAUDE_CODE_SUBAGENT_MODEL` | UNSET | unset ✓ | unset ✓ | OK |
| `teammateMode` (settings.json top-level) | "in-process" (Anthropic-recommended for Windows) | n/a | `"in-process"` ✓ | OK |

**Severity**: SEV-3 (fully compliant).
**Citation**: `.claude/settings.json:env` (lines containing `CLAUDE_CODE_*`); `:teammateMode` near end of file.

---

## Audit Dimension 7 — Hook Integration with Agent Tool

### 7.1 `.claude/settings.json` hooks (Cardinal-Rule-2-compliant)

| Hook | Matcher | Commands | Citation |
| --- | --- | --- | --- |
| `PreToolUse[Agent]` | `Agent` | (1) `preagent-parallel-guard.mjs` timeout=10; (2) `preagent-subagent-validator.mjs` timeout=10 | `settings.json:hooks.PreToolUse` block |
| `UserPromptSubmit` | — | **EMPTY ARRAY** (NOT WIRED) | `settings.json:hooks.UserPromptSubmit` |
| `SessionStart` | — | `context-mode-cache-heal.mjs` (sanctioned 2 KB bug-patch shim) | `settings.json:hooks.SessionStart` |
| `PreToolUse[Bash]` | `Bash` | gitleaks · trivy · codex adversarial-review on destructive git | `settings.json:hooks.PreToolUse[Bash]` |
| `PreToolUse[Edit\|Write]` | `Edit\|Write` | W317-A Δ34 verdict-ledger lint | `settings.json:hooks.PreToolUse[Edit\|Write]` |
| `PostToolUse[Edit\|Write\|MultiEdit]` | — | ruff + shellcheck per-file lint | — |
| `TaskCompleted` | — | `ruff check tools harness --quiet` | — |
| `Stop` | — | (driven by openai-codex plugin `hooks.json` per CLAUDE.md L10 audit-trap) | plugin `hooks.json` |

### 7.2 UserPromptSubmit gap — **W331-r3 P0.1 half-installed**

| Probe | Result |
| --- | --- |
| `tools/parallel-guard-userpromptsubmit.mjs` exists | YES — 3690 bytes |
| Purpose | Sets `multiStreamIntent` flag in counter state file per UPS message text (closes W331-r3 P0.1 codex r2 gap #1) |
| `parallel-guard.mjs:357-372` consults the intent flag | YES — `state.multiStreamIntent` is the preferred signal source |
| Hook wired in settings.json | **NO — `hooks.UserPromptSubmit: []`** |

**Severity**: SEV-1 — Without the UPS hook wired, `parallel-guard.mjs:362-367` falls back to JSONL text-scan only. The JSONL fallback is described in code comments as "defensive — handles sessions started before the UserPromptSubmit hook was wired" — meaning the code expects UPS to be wired.

**Gap-vs-SOTA**: The W331-r3 P0.1 closure cited in CLAUDE.md / W331 verdicts depends on intent flag being set per turn. Currently the runtime is operating on legacy JSONL-tail scan, which has the documented W325-A F1 measurement bias (assistant turn vs user turn timing).

**Recommended fix**: Add to `settings.json:hooks.UserPromptSubmit`:

```json
{
  "hooks": [
    {
      "type": "command",
      "command": "\"Z:/tools/nodejs/node.exe\" \"Z:/claude-sota-installed/tools/parallel-guard-userpromptsubmit.mjs\"",
      "timeout": 5
    }
  ]
}
```

### 7.3 Plugin-level Task/Agent hooks

| Plugin | hooks.json with Agent/Task matcher | Citation |
| --- | --- | --- |
| context-mode @ 1.0.146 | YES (cache + marketplace copies both) | `.claude/plugins/cache/context-mode/context-mode/1.0.146/hooks/hooks.json` |
| Other plugins (76 total hooks.json) | None with Task/Agent matcher | computed scan |
| `agent-teams` plugin | No hooks shipped (only agents/skills/commands) | per inventory above |

**Severity**: SEV-3 (informational — context-mode's PreToolUse[Agent] is sanctioned and tracked separately).

---

## Audit Dimension 8 — SOTA Comparison (deepwiki)

### 8.1 `anthropics/claude-code` deepwiki query

**Result**: deepwiki could not find the Agent tool implementation in the public-indexed slice of `anthropics/claude-code`. Confirmed `subagent_type` parameter exists, references "Improved Agent tool `subagent_type` matching to accept case- and separator-insensitive values" (changelog), and references forked subagents. **No canonical FQN convention documentation was returned** — meaning either the public docs at `https://docs.anthropic.com/en/docs/claude-code/sub-agents` are the authoritative source (case-/separator-insensitive matching is documented) or the FQN discipline is an emergent best-practice of the plugin ecosystem (not enforced by core).

**Implication**: The W333 F5 FQN-discipline mandate is a **runtime-level enforcement gap** in core CC; the runtime's W326 P0-A2 allowlist validator is the only enforcement layer. This **elevates** the importance of fixing Dim-1.2 + Dim-2.2 + Dim-4.1 ambiguity-warn upgrade.

### 8.2 `wshobson/agents` deepwiki query — KEY SOTA SOURCE

Key extracted patterns (full verbatim available in audit gather log):

| Pattern | Detail |
| --- | --- |
| Three-phase lifecycle | TeamCreate → TaskCreate/TaskList monitoring → TeamDelete cleanup |
| FQN convention | `general-purpose`, `Explore`, `Plan`, `agent-teams:team-reviewer`, `agent-teams:team-debugger`, `agent-teams:team-implementer`, `agent-teams:team-lead` |
| `/team-spawn` preset reality | Uses `general-purpose` for all teammates (FQN form is documented but `general-purpose` is the deployed choice for full tool access) |
| Review-team dispatch | 3 × `team-reviewer` with dimensions security/performance/architecture; finding-dedupe on file:line; severity-merge to higher rating |
| Debug-team dispatch | 3 × `team-debugger`, each assigned a hypothesis; evidence categorized (Direct/Correlational/Testimonial/Absence); arbitration as Confirmed/Plausible/Falsified/Inconclusive |
| Feature-team dispatch | 1 × team-lead + 2 × team-implementer; file-ownership decomposition; approval gate before parallel execution |
| File-ownership rules | (1) one owner per file; (2) explicit boundaries in task description; (3) interface contracts for shared boundaries; (4) shared files routed through lead sequentially |
| Sharing pattern | Read-only contract file (`types/auth-contract.ts`) imported but not modified by parallel implementers |
| Conflict resolution | Implementer requests change via message → owner applies sequentially |
| Note from deepwiki | Ownership is **not technically enforced**; relies on agent adherence to documented rules |

**SOTA alignment**:
- This runtime's installed `agent-teams` plugin **matches** the wshobson canonical patterns 1:1.
- The W269/W312-D mandate (CLAUDE.md L13) **exceeds** wshobson by requiring 2+ Agent calls in 1 assistant message; wshobson's `/team-spawn` does this via `TeamCreate` followed by parallel `Agent` calls (deepwiki: "uses the `Agent` tool to spawn individual teammates").
- The W326 P0-A2 allowlist + W330 P0-A parallel-guard exit-2 path **exceeds** wshobson — wshobson has no parallel-dispatch enforcement; this is a runtime-specific R5-corollary innovation.

---

## Audit Dimension 9 — Agent-Teams Plugin Skills (presets, workflow)

Six skill files at `.claude/plugins/marketplaces/claude-code-workflows/plugins/agent-teams/skills/`:

| Skill | Trigger summary (from description: header) |
| --- | --- |
| `team-composition-patterns` | Team sizing heuristics + 7 presets (review/debug/feature/fullstack/research/security/migration); display-mode selection (tmux/iTerm2/in-process) |
| `team-communication-protocols` | Message-type selection (message/broadcast/shutdown_request); plan-approval gate; graceful shutdown |
| `parallel-debugging` | Competing-hypothesis investigation; evidence categorization; root-cause arbitration |
| `parallel-feature-development` | File-ownership decomposition; conflict-avoidance; integration patterns |
| `multi-reviewer-patterns` | Parallel reviews across dimensions; finding dedupe; severity calibration |
| `task-coordination-strategies` | Task decomposition; dependency graphs; workload balance |

**Seven `/team-*` commands** at `.claude/plugins/marketplaces/claude-code-workflows/plugins/agent-teams/commands/`:

| Command | Purpose | Pre-flight verifies `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` |
| --- | --- | --- |
| `team-spawn` | Spawn team with preset/custom composition | YES (`team-spawn.md:11-13`) |
| `team-debug` | Debug via competing-hypotheses team | (per command body) |
| `team-review` | Multi-dimensional review team | — |
| `team-feature` | Parallel feature dev with file ownership | — |
| `team-status` | Display team members + task status | — |
| `team-delegate` | Delegation dashboard | — |
| `team-shutdown` | Graceful shutdown + cleanup | — |

**Severity (presence)**: SEV-3 — fully present and wired.
**Severity (settings.json `teammateMode: "in-process"`)**: SEV-3 — Anthropic-recommended for Windows-native runtime per CLAUDE.md cardinal-rule-5 R5-corollary.

**Mailbox / SendMessage discipline** (from team-communication-protocols SKILL.md): three message types (`message`, `broadcast`, `shutdown_request`), broadcast deprecated except for shared-state changes (N-to-1 cost), shutdown_request triggers graceful teammate exit.

---

## Audit Dimension 10 — Gap Analysis (discipline skills)

All 6 required skills are present locally at `.claude/skills/`:

| Skill | Size | Present? | Auto-fire description coverage |
| --- | --- | --- | --- |
| `agent-budget-discipline` | 9,061 B | ✓ | Mid-loop max-message/token/time termination (langgraph MIT) |
| `checkpoint-resume` | 7,348 B | ✓ | BaseCheckpointSaver/thread-id/interrupt for stateful orchestrators |
| `worker-failure-termination-guard` | 7,473 B | ✓ | Δ-G50 fail-CLOSED worker-exception handling — never silently exit-0 worker exceptions |
| `empty-final-message-guard` | 6,572 B | ✓ | Δ-G49 — empty teammate output triggers re-dispatch or OrchestrationError |
| `dispatching-parallel-agents-w321-fork` | 12,250 B | ✓ | W321 vendor-fork of obra/superpowers — adds skeleton-first-write, context-budget hard-cap, subagent_type pre-flight validation |
| `parallel-dispatch-mandate` | 17,069 B | ✓ | W269 enforcement skill (must-fire before any Agent dispatch in 2+ stream context) |

**Plus**: `citations-agent`, `mcp-agent-patterns` (5 reusable workflow patterns: Router, ParallelLLM, Orchestrator, Evaluator-Optimizer, MCPAggregator).

**Severity**: SEV-3 — all required discipline skills are installed.

**Gap-vs-SOTA — auto-fire enforcement**: The skills are **descriptionally** registered to fire on trigger phrases, but the runtime has no test confirming they actually auto-fire under multi-stream workloads. The W325-A F1 measurement (parallel_ratio=0.0036 over 1676 sessions) **predates** the W330 P0-A enforcement landing, so post-W330 telemetry has not been re-measured.

**Recommended fix (W341)**: Re-run W325-A F1 telemetry post-W330 P0-A + UPS-hook-wiring to confirm parallel_ratio has lifted ≥0.7 (target from CLAUDE.md L13).

---

## Audit Dimension 11 — FQN Discipline Audit (bare subagent_type)

Probe: search `.claude/skills/`, `docs/architecture/`, `.claude/agents/` for `subagent_type:\s*"<bare-name>"` literal violations.

| Bare pattern | Hits | Files |
| --- | --- | --- |
| `"code-reviewer"` | **2** | `docs/architecture/_archive/W259-grand-catalog-archive/prior-wave-grand-synthesis-2026-05-16/90-superseded-archive/tmp-wave-intermediate/wave105-agentC-architect-install-plan-2026-05-08.md:55` (archived); `docs/architecture/W309-RESEARCH-ARCH-AUDIT-AND-SOTA-CONVERGENCE/W309-STREAM-A-V2-HOOK-DEEP-DIVE.md:112` |
| `"debugger"`, `"team-lead"`, `"team-reviewer"`, `"security-auditor"`, `"code-architect"`, `"experiment-runner"` | 0 | clean |

**Severity**: SEV-3 — minimal violations; one is archived (acceptable), one is in W309 audit-prose context (informational mention, not a live dispatch).

**Active dispatch surface (CLAUDE.md, current SKILLs)**: clean.

**Gap-vs-SOTA**: None — the runtime's live dispatch surface is FQN-clean.

---

## Audit Dimension 12 — Subagent-Allowlist Regeneration Mechanism

**See Dimension 2.3** — `tools/build-subagent-allowlist.mjs` does not exist; `preagent-subagent-validator.mjs --regenerate` flag is not implemented.

| Evidence | Result |
| --- | --- |
| Files matching `tools/*subagent*` | only `preagent-subagent-validator.mjs` |
| Files matching `tools/*allowlist*` | none |
| Files matching `tools/*build*` | none under `tools/` (only `bootstrap-runtime.ps1` references "REGENERATE defaults" for unrelated config) |
| `writeFile` to `subagent-type-allowlist.json` in any `tools/*.mjs` | none |
| SessionStart hook rebuilding allowlist | none |

**Severity**: SEV-1 — claimed mechanism is **vapor**.

**Recommended fix**: Implement `tools/build-subagent-allowlist.mjs` (~120 LOC stdlib-only Node 22):
1. Walk `.claude/plugins/{cache,marketplaces}/**/agents/*.md` + `.claude/agents/*.md`
2. Extract `name:` from YAML frontmatter (or fallback to filename basename)
3. Compute FQN as `<plugin-name>:<agent-name>` from path
4. Detect bare-name collisions across ≥2 plugins → emit to `_ambiguous_bare_names[]` separately
5. Persist with `_generated` ISO-8601 + `_plugin_manifest_sha256` (hash of sorted plugin-name list) for drift detection
6. Wire as SessionStart hook with idempotent skip if manifest SHA matches stored value (no churn on cold-start).

---

## Cross-cutting findings

### F1 — CLAUDE.md L13 audit-trap (agent-teams cache-vs-marketplace)
**SEV-2**. CLAUDE.md doc-cite implies cache-path; reality is marketplace-path. Same shape as W332 settings.json-vs-plugin-hooks.json audit-trap. Fix: update L13 cite to marketplace path.

### F2 — UserPromptSubmit hook half-installed (W331-r3 P0.1)
**SEV-1**. The intent-flag script exists; the wiring does not. Fix: 6-line addition to `settings.json:hooks.UserPromptSubmit`.

### F3 — Allowlist regeneration is vapor (W326 P0-A2 doc-cite false)
**SEV-1**. Claimed `--regenerate` flag does not exist. Fix: implement `tools/build-subagent-allowlist.mjs` + SessionStart hook.

### F4 — FQN-discipline duplicate bare-names (W333 F5 violations)
**SEV-1**. 165 bare-name entries in allowlist; `code-reviewer` collides 7 plugins. Fix: demote to `legacy_bare_aliases[]` with deprecation warning, then remove in W342+.

### F5 — Validator ambiguity-warn missing
**SEV-2**. Validator does not warn when bare-name resolves to multiple FQN candidates. Fix: 10-line insertion between L97 (builtin) and L98 (allow) — detect ambiguous bare, emit hookSpecificOutput, then continue.

### F6 — Post-W330 parallel_ratio not re-measured
**SEV-2**. W325-A F1 measured `parallel_ratio=0.0036` pre-W330 P0-A landing. No post-landing telemetry confirms the lift toward target ≥0.7. Fix: re-run W325-A F1 telemetry in W341.

### F7 — `general-purpose` is the actual `/team-spawn` choice
**SEV-3** (informational). Per wshobson deepwiki: "/team-spawn uses `general-purpose` as the subagent_type for all teammates" despite `agent-teams:team-*` FQNs being documented. This is **upstream behavior**, not a runtime defect — but operators reading CLAUDE.md L13 may be surprised when their `/team-spawn` invocations dispatch general-purpose agents in practice.

---

## Top-5 Orchestration Gaps (priority order)

| # | Gap | Severity | Fix complexity | Wave target |
| --- | --- | --- | --- | --- |
| 1 | UserPromptSubmit hook not wired (W331-r3 P0.1 half-installed) | SEV-1 | 6 LOC settings.json edit | W341 P0 |
| 2 | `build-subagent-allowlist.mjs` does not exist (W326 P0-A2 doc-cite false) | SEV-1 | ~120 LOC stdlib-only Node 22 script + SessionStart hook | W341 P0 |
| 3 | 165 bare-name FQN-violation allowlist entries (W333 F5) | SEV-1 | Migrate to `legacy_bare_aliases[]` + deprecation flag; require validator update | W341 P1 |
| 4 | Validator does not detect bare-name FQN ambiguity (Dim 4.1) | SEV-2 | ~10 LOC insertion in `preagent-subagent-validator.mjs:97` | W341 P1 |
| 5 | Post-W330 parallel_ratio not re-measured (W325-A F1 stale) | SEV-2 | Re-run telemetry harness against 30d session JSONL | W341 P2 |

---

## File paths referenced (all absolute)

- `Z:\claude-sota-installed\CLAUDE.md` (cardinal rules)
- `Z:\claude-sota-installed\.claude\settings.json` (hooks + env + enabledPlugins)
- `Z:\claude-sota-installed\.claude\state\subagent-type-allowlist.json` (307 entries)
- `Z:\claude-sota-installed\tools\preagent-parallel-guard.mjs` (419 LOC, dual-mode advisory+blocking)
- `Z:\claude-sota-installed\tools\preagent-subagent-validator.mjs` (115 LOC, hard-block exit 2 on unknown)
- `Z:\claude-sota-installed\tools\parallel-guard-userpromptsubmit.mjs` (3690 B, **NOT WIRED**)
- `Z:\claude-sota-installed\.claude\plugins\marketplaces\claude-code-workflows\plugins\agent-teams\` (4 agents, 6 skills, 7 commands)
- `Z:\claude-sota-installed\.claude\skills\{agent-budget-discipline, checkpoint-resume, dispatching-parallel-agents-w321-fork, empty-final-message-guard, parallel-dispatch-mandate, worker-failure-termination-guard}\SKILL.md`
- `Z:\claude-sota-installed\.claude\agents\{evaluator, gpt5-archaeologist, wshobson-devops-troubleshooter, wshobson-security-auditor}.md` (4 local agents)
- `Z:\claude-sota-installed\tmp\W340-stream-D-agents-plugin.txt` (6479-line enumeration)
- `Z:\claude-sota-installed\tmp\W340-stream-D-agents-local.txt` (4 local agents)

---

## Closing notes

**Strengths to preserve in W341**:
- Dual-mode CR-5-exception guard discipline (advisory + binding) — exemplar of the R5-corollary pattern
- Race-free POSIX.1-2017 §3.293 PIPE_BUF append-only tick-file design in `preagent-parallel-guard.mjs:287-313`
- W338-P0d test-fixture mode isolation via `CLAUDE_CODE_TMPDIR` short-circuits
- Operator escape hatches at three layers (env var + marker file + validator soft-fail) — ergonomic without defeating enforcement
- Allowlist coverage is 100% for current plugin-cache state (no missing entries)
- All 6 discipline skills present + 8 total orchestration-related local skills

**Top single-commit fix** (highest leverage / lowest risk): **wire UserPromptSubmit hook to `parallel-guard-userpromptsubmit.mjs`** (F2). This restores the message-level intent signal that `preagent-parallel-guard.mjs:357-372` was designed to consume, closing the W331-r3 P0.1 audit-trail and unblocking the W325-A F1 re-measurement (F6).
