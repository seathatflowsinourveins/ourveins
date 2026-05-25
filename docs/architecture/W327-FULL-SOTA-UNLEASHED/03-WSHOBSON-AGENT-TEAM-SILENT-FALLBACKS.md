# W327-S3 — wshobson/agents + Agent-Team Silent-Fallback Hunt

> **Wave**: W327-S3 — silent-fallback-hunt deep-audit
> **Scope**: wshobson/agents upstream SOTA + local agent-teams plugin + runtime hook scripts + W319-A HIGH-2/HIGH-3/W325-F4/F5 closure status
> **Date**: 2026-05-19
> **Budget**: K=20 tool calls, M=200k tokens (audit completed under cap)
> **Status**: COMPLETE

## TL;DR — top-3 silent-fallback locations (cite-anchored)

1. **`Z:/claude-sota-installed/tools/preagent-parallel-guard.mjs:4,17,172,178`** — Advisory hook is **EXPLICITLY ADVISORY-ONLY**: header L4 declares "ADVISORY ONLY — never blocks", L17 "Exits 0 always", main() L172 `process.exit(0)` when peer-Agent already dispatched, L178 final `process.exit(0)`. NO 2nd-violation-block logic. Any solo Agent dispatch in a multi-stream context generates an `additionalContext` warning that the orchestrator may IGNORE. The W325-A-F1 measured parallel_ratio_30d = **0.0038** (target ≥0.30) is direct evidence the advisory is being silently bypassed. CLAUDE.md L13 already flags this as W329-D root-cause.
2. **`Z:/claude-sota-installed/tools/preagent-subagent-validator.mjs:99-104` + `:111-115`** — **Soft-fails to exit-0 on TWO error paths**: (a) allowlist file missing → "advisory-absent better than false-block" (L100-104) writes to stderr and exits 0, (b) catch-all in main().catch() (L111-115) writes "soft-fail" to stderr and exits 0. Both paths defeat the W319-A HIGH-3 typo-trap closure if `subagent-type-allowlist.json` is ever stale or unparseable. The allowlist exists today (10685 B, 307 entries, generated 2026-05-19) but there is no freshness check — drift after a plugin add/remove is undetected.
3. **`Z:/claude-sota-installed/.claude/plugins/cache/claude-code-workflows/agent-teams/1.0.2/skills/team-communication-protocols/SKILL.md:159-160`** — Upstream wshobson plugin's ONLY guidance for unresponsive teammates is "check status; if idle, it may have completed; if active, it will process messages once current operation finishes". **Zero auto-mitigation**, zero empty-final-message detection, zero typo-trap guards. This is the upstream root-cause that local `parallel-dispatch-mandate` + `dispatching-parallel-agents-w321-fork` skills compensate for via overlay — but the upstream plugin itself remains silent.

**P0-A patch status**: NOT-APPLIED. `preagent-parallel-guard.mjs` is still 100% advisory (no 2nd-violation block, no telemetry-emit on bypass). See §6.

---

## §1 wshobson/agents upstream inventory + SOTA patterns

**Repository**: `https://github.com/wshobson/agents.git`
**Local clone**: `Z:/repos/deps/agents/`
**HEAD SHA**: `112197c` (`fix(plugin-eval): broaden MISSING_TRIGGER pattern to match canonical phrasings (#530)`, 2026-05-14 09:04:34 -0400)
**Total plugins**: ~75 plugins under `plugins/` (agent-teams, agent-orchestration, conductor, debugging-toolkit, comprehensive-review, etc.)

**Agent-teams upstream structure** (`plugins/agent-teams/`):
- `agents/`: 4 agent definitions — `team-lead.md`, `team-implementer.md`, `team-reviewer.md`, `team-debugger.md`
- `commands/`: 7 slash commands — `team-spawn.md`, `team-debug.md`, `team-delegate.md`, `team-feature.md`, `team-review.md`, `team-shutdown.md`, `team-status.md`
- `skills/`: 6 SKILL.md files — `multi-reviewer-patterns`, `parallel-debugging`, `parallel-feature-development`, `task-coordination-strategies`, `team-communication-protocols`, `team-composition-patterns`
- `.claude-plugin/plugin.json`: version 1.0.2, MIT license, author Seth Hobson

**SOTA patterns observed**:
- Hypothesis-driven debugging (ACH methodology) via `team-debug` → spawns N=3 `team-debugger` agents on competing hypotheses (cell-2 anchor: orchestrator_workers.ipynb)
- Dimension-partitioned code review via `team-review` → security/performance/architecture/testing/accessibility
- File-ownership-boundary parallel feature development via `team-feature` → 1 lead + N implementers with explicit file-list per task
- Preset compositions: `review|debug|feature|fullstack|research|security|migration` (7 presets)
- Communication via `SendMessage` (point-to-point) + `broadcast` (anti-pattern marked for critical-only)
- Task lifecycle via `TaskCreate/TaskUpdate/TaskList/TaskGet` with `blockedBy/blocks` dep graph

**SOTA gaps observed**:
- NO empty-final-message detection anywhere in upstream agents/commands/skills
- NO subagent_type pre-flight validation
- NO retry-with-checkpoint pattern
- NO budget-cap directive in dispatch prompts
- "Troubleshooting" sections are prose-only worker-side advice (lines 157-172 of team-communication-protocols/SKILL.md)

## §2 Local agent-teams plugin install state

| Field | Value |
|-------|-------|
| Install path | `Z:/claude-sota-installed/.claude/plugins/cache/claude-code-workflows/agent-teams/1.0.2/` |
| Marketplace | `claude-code-workflows` (wshobson distribution) |
| Plugin name | `agent-teams` |
| Version | `1.0.2` |
| Cache mtime | 2026-05-18 10:29 |
| `.in_use` marker | Present (plugin enabled) |

**Drift vs upstream**: `diff -q` shows only README.md differs (line-ending normalization from W319-A wave); all agents/commands/skills bodies match. **No upstream drift requiring re-install.**

**Local overlay** (cardinal-rule-4(b)-compliant skills at `.claude/skills/`):
- `parallel-dispatch-mandate/SKILL.md` (220 LOC) — W269 enforcement + F4/F5 + Δ-PDM-1/2/3
- `dispatching-parallel-agents-w321-fork/SKILL.md` (179 LOC) — vendor-fork with Δ-DPA-1..5
- The overlays codify what upstream lacks; they are skill-level (auto-fire by description match) not plugin-level

## §3 Agent-team dispatch silent-fallback failure-mode taxonomy

| # | Failure mode | Detection | Action on no-detection | Sev | Origin |
|---|--------------|-----------|------------------------|-----|--------|
| FM-1 | Empty `final_message` from worker | length<50 chars OR whitespace-only | Orchestrator consumes phantom output as "completed" | HIGH | W319-A HIGH-2 |
| FM-2 | subagent_type typo (hyphen vs underscore) | string-match against allowlist | Silent fallback to `general-purpose` per CLAUDE.md L34 (29%/1586-JSONL audit measured) | HIGH | W319-A HIGH-3 |
| FM-3 | Repomix-pack in fork-dispatch prompt body | parent transcript inheritance + 50K+ pack saturates ~600K fork ctx | Worker silently truncates or returns empty | HIGH | W325 F4 |
| FM-4 | Mid-flight `stream-error` interruption | `tool_result.error_code == "stream-error"` | Orchestrator treats as PASS; re-dispatch duplicates expensive tool calls | HIGH | W325 W321 Stream D |
| FM-5 | SendMessage to unknown recipient | recipient ∉ `~/.claude/teams/{team}/config.json` | Message dropped silently; no error path | HIGH | W319-A HIGH-2 secondary |
| FM-6 | Solo Agent dispatch in multi-stream context | recent assistant turn has only 1 Agent block + multi-stream wording | Advisory warning only; orchestrator may ignore | SEV-1 | W269/W312-D/W325-A-F1 (0.0038 ratio measured) |
| FM-7 | Worker context-exhaust at >140k tokens | cumulative response tokens monitor | Silent truncation; phantom partial result | HIGH | W321 Stream A 184k-exhaust |
| FM-8 | `general-purpose` fallback on case/separator-insensitive resolve | Anthropic CC 2.1.144 changelog | Silent success — typo resolves but to wrong agent | MED | W325 F2 |

## §4 Hook-script audit

### §4.1 `tools/preagent-parallel-guard.mjs`

**Verdict**: ADVISORY-ONLY by design. Multiple exit-0 paths defeat enforcement.

Citations (file:line):
- `:4` — Header comment: *"ADVISORY ONLY — never blocks"* — written-by-design intent
- `:17` — *"Exits 0 always"* — explicit non-blocking contract
- `:33-35` — `SESSION_ROOT_CANDIDATES` hard-codes two specific paths (`Z:/claude-sota-installed/.claude/projects/Z--claude-sota-installed` and `Z:/claude-sota-installed-state/...`); if neither exists, returns null and exits 0 (L166)
- `:50` — `setTimeout(() => resolve({}), 400)` — silent timeout if no stdin within 400ms; the hook may operate on empty event-payload
- `:61-63, :77, :82-84` — 3× empty catch blocks (`/* not here */`, `/* ignore */`, `/* ignore */`) — file-system errors silently swallowed
- `:97-99, :113-115, :140-142` — 3× empty catch blocks in JSONL parsers — malformed records silently skipped
- `:155-157` — stdout-closed swallowed (`/* stdout closed */`) — silent ack if `process.stdout.write` fails
- `:164-166` — `if (!sessionPath) { process.exit(0); }` — silent exit if session-file lookup fails
- `:172` — `if (assistantInfo.agentBlocks >= 2) process.exit(0)` — silent OK on peer-already-dispatched
- `:178` — Final `process.exit(0)` after advisory emission — no enforcement
- `:181` — `main().catch(() => process.exit(0))` — catch-all swallows any exception with exit 0

**Hidden errors**: malformed session JSONL parse errors, FS-access-denied on session dir, stdin-timeout-at-400ms with empty event, stdout-pipe-closed mid-write, unhandled promise rejections in main(). All silently exit 0.

**User impact**: When operator dispatches solo Agent in multi-stream context, the advisory warning is appended to `additionalContext` of the PreToolUse hook output. The orchestrator may or may not surface this in its planning. Empirically measured: W325-A-F1 found actual `parallel_ratio_30d = 0.0038` vs target ≥0.30 — **the advisory is ineffective at correcting solo-fallback behavior**.

### §4.2 `tools/preagent-subagent-validator.mjs`

**Verdict**: BLOCKING (correctly exits 2 on unknown subagent_type) BUT has two soft-fail-to-exit-0 paths.

Citations (file:line):
- `:88` — `process.exit(2)` in `block()` — CORRECT hard-block on unknown subagent_type
- `:91-108` — main() correctly validates: empty/missing → exit 0; BUILTIN → exit 0; allowlist-known → exit 0; allowlist-unknown → block() → exit 2
- `:99-104` — **SOFT-FAIL #1**: if `loadAllowlist()` returns null (file missing/unparseable), writes "advisory skipped (exit 0)" to stderr and exits 0. Defeats W319-A H3 closure if allowlist is ever stale or deleted.
- `:111-115` — **SOFT-FAIL #2**: catch-all in `main().catch(e)` writes "soft-fail: ${e}" to stderr and exits 0. ANY unhandled exception → silent pass.

**Hidden errors**: allowlist drift (plugin add/remove without re-running build script), JSON parse errors in allowlist file, FS-access-denied, race condition on concurrent allowlist regeneration.

**User impact**: If the allowlist file is deleted or corrupted, every subagent_type typo silently routes to `general-purpose` again — the exact failure mode the validator was built to close. There is no freshness/staleness telemetry on the allowlist.

### §4.3 `.claude/hooks/context-mode-cache-heal.mjs`

Only sanctioned project-owned hook per cardinal-rule-2 exception. Not in audit scope (patches `anthropics/claude-code#46915`).

### §4.4 `.claude/settings.json` hooks

- `PreToolUse[Agent]` correctly wires both `preagent-parallel-guard.mjs` + `preagent-subagent-validator.mjs` (timeout 10s each)
- No additional Agent-specific blocking hooks
- Other hooks (Bash gitleaks/trivy, Edit/Write ruff/shellcheck) are out-of-scope for agent-team silent-fallback

## §5 Confirmed silent-fallback list

| # | Severity | File:Line | Description | Hidden errors | Recommendation |
|---|----------|-----------|-------------|---------------|----------------|
| 1 | CRITICAL | `tools/preagent-parallel-guard.mjs:4,17,178,181` | Advisory-only with no 2nd-violation block; final `exit(0)` always | Solo-dispatch bypassed silently; measured 0.0038 parallel ratio | Add session-counter that escalates to `exit(2)` BLOCK after 2nd solo-dispatch in multi-stream context within 60s window; emit telemetry to `state/parallel-dispatch.jsonl` |
| 2 | HIGH | `tools/preagent-parallel-guard.mjs:61-63,77,82-84,97-99,113-115,140-142,155-157` | 7× empty catch blocks swallow FS/parse/stdout errors | Malformed JSONL, FS-deny, stdout-closed all silent | Replace with `console.error('parallel-guard error:', e)` on stderr (visible to orchestrator) + JSONL audit entry |
| 3 | HIGH | `tools/preagent-parallel-guard.mjs:50` | 400ms stdin timeout silently produces empty event | Hook operates on empty input | Increase to 2000ms + emit stderr warning on timeout |
| 4 | HIGH | `tools/preagent-subagent-validator.mjs:99-104` | Soft-fail-to-exit-0 if allowlist missing | Allowlist drift undetected | Add allowlist freshness check (mtime vs `.claude/plugins/cache/*/agents/` mtime); fail-loud to exit-2 if >24h stale |
| 5 | HIGH | `tools/preagent-subagent-validator.mjs:111-115` | Catch-all soft-fail-to-exit-0 in main().catch() | Any exception silently passes | Log to `.claude/state/subagent-validator-errors.jsonl` + always emit stderr |
| 6 | HIGH | `.claude/plugins/cache/claude-code-workflows/agent-teams/1.0.2/skills/team-communication-protocols/SKILL.md:159-160` | Upstream "teammate not responding" guidance is prose-only "check status, wait" | SendMessage to unknown recipient drops silently; FM-1 + FM-5 unaddressed in upstream | Local overlay `parallel-dispatch-mandate` already codifies the F5 detection — verify upstream hasn't shipped a fix in newer version |
| 7 | HIGH | `.claude/plugins/cache/claude-code-workflows/agent-teams/1.0.2/agents/team-lead.md:80-83` | "Collect — gather results as teammates complete tasks" with no empty-detection | Phantom-completed worker output consumed as valid | Already addressed by local `parallel-dispatch-mandate` F5; cannot patch upstream plugin in cache |
| 8 | MEDIUM | `.claude/plugins/cache/claude-code-workflows/agent-teams/1.0.2/commands/team-spawn.md:75-80` | `subagent_type` passed as raw string; no pre-flight validation in command itself | Typo silently falls back to general-purpose | Already addressed by `preagent-subagent-validator.mjs` PreToolUse hook |

## §6 P0-A patch recommendation — `preagent-parallel-guard.mjs`

**Current state**: Lines 4, 17, 178, 181 all encode "advisory-only, never block". W325-A-F1 measured the resulting parallel_ratio at 0.0038 — the advisory is being silently bypassed.

**Recommended patch** (skeleton; do not apply in this audit wave):

```javascript
// NEW: persistent violation counter
const VIOLATION_LOG = 'Z:/claude-sota-installed/.claude/state/parallel-dispatch-violations.jsonl';
const WINDOW_MS = 60_000;
const BLOCK_THRESHOLD = 2;

async function recordViolation(sessionId, reason) {
  const entry = { ts: Date.now(), sessionId, reason };
  try {
    await appendFile(VIOLATION_LOG, JSON.stringify(entry) + '\n');
  } catch (e) {
    console.error('parallel-guard violation-log write failed:', e.message);
  }
}

async function countRecentViolations(sessionId) {
  try {
    const txt = await readFile(VIOLATION_LOG, 'utf8');
    const cutoff = Date.now() - WINDOW_MS;
    return txt.split('\n').filter(Boolean)
      .map(l => { try { return JSON.parse(l); } catch { return null; } })
      .filter(r => r && r.sessionId === sessionId && r.ts >= cutoff)
      .length;
  } catch { return 0; }
}

// In main():
if (MULTI_STREAM_RE.test(haystack)) {
  await recordViolation(sessionId, 'solo-dispatch-in-multi-stream-context');
  const recent = await countRecentViolations(sessionId);
  if (recent >= BLOCK_THRESHOLD) {
    process.stderr.write(`W326 parallel-dispatch BLOCK: ${recent} solo-dispatches in ${WINDOW_MS}ms window. Per W269 cardinal mandate, dispatch 2+ Agent calls in ONE message.\n`);
    process.exit(2);  // BLOCKING — escalate to hard-stop
  }
  emitAdvisory('multi-stream wording detected but solo Agent dispatch observed');
}
process.exit(0);
```

**Why exit 2**: per `https://docs.anthropic.com/en/docs/claude-code/hooks` exit-2 from PreToolUse blocks the tool call and surfaces stderr to the orchestrator. This converts the failing 0.0038 ratio into measurable parallel-dispatch enforcement.

**Risk**: false-positive block when the operator genuinely needs serial dependent dispatch. Mitigation: include heuristic check for "sequential" / "dependency" / "wait for" wording in the assistant's recent text to suppress block.

**Status**: NOT-YET-APPLIED. Recommended for W328 P0-A1-LANDING.

## §7 W319-A HIGH-2/HIGH-3 + W325 F4/F5 closure status

| ID | Description | Status | Evidence |
|----|-------------|--------|----------|
| W319-A HIGH-2 | Empty-final-message silent drop | **CONFIRMED-FIXED-IN-SKILL** | `parallel-dispatch-mandate/SKILL.md:24-62` (F5 section) codifies cookbook detect-and-retry; cite-anchor `claude-cookbooks@2eed173a/patterns/agents/orchestrator_workers.ipynb cell-2` |
| W319-A HIGH-3 | Hyphen-vs-underscore subagent_type typo trap | **PARTIALLY-FIXED** | `preagent-subagent-validator.mjs:88` blocks with exit-2 (HARD-BLOCK) — works when allowlist present and parsable. BUT soft-fails at L99-104 + L111-115 → drift/corrupt allowlist re-opens the trap |
| W325 F4 | NO repomix-pack inside fork-dispatched Agent body | **CONFIRMED-FIXED-IN-SKILL** | `parallel-dispatch-mandate/SKILL.md:64-86` documents NO-pack-in-fork mandate + 5 mandatory orchestrator behaviors. SKILL-level only — no hook enforces |
| W325 F5 | Empty-final-message detection codified | **CONFIRMED-FIXED-IN-SKILL** | Same `parallel-dispatch-mandate/SKILL.md:38-62` F5 section explicitly codifies the cookbook canonical guard. NO hook-level enforcement (worker output isn't filtered by a hook) |

**Critical caveat**: HIGH-2 + F4 + F5 closures are **skill-level prose** — they fire by description-match and depend on orchestrator-AI compliance. No hook BLOCKS empty-final-message consumption. The W325-A-F1 measured parallel_ratio 0.0038 demonstrates skill-only enforcement is empirically weak. Hook-level enforcement (analogous to `preagent-subagent-validator.mjs` for typo trap) is the SOTA approach.

## §8 SOTA agent-team patterns to adopt from wshobson/agents (top-5)

1. **File-ownership boundary enforcement** (`team-lead.md:60-65`) — every parallel implementer gets EXCLUSIVE file ownership; shared files are lead-owned with sequential application. Adopt as standard W327+ parallel-dispatch protocol; pair with the local skeleton-first-write pattern.

2. **Hypothesis-driven debugging (ACH)** (`team-debug.md:26-50`) — categorize hypotheses into 6 classes (logic/data/state/integration/resource/environment) before parallel investigation. Adopt as standard W327+ debug-dispatch template — currently the orchestrator generates ad-hoc hypotheses.

3. **Dimension-partitioned review** (`team-review.md` + `multi-reviewer-patterns/SKILL.md`) — assign each reviewer ONE dimension (security/perf/arch/test/a11y) with explicit deduplication rules at L36-58 (same-file:line merge, conflicting-severity → higher, etc.). Already partially absorbed in `comprehensive-review` plugin; cross-pollinate the dedup rules.

4. **Confidence-rated evidence reporting** (`team-debugger.md:46-50`) — `High/Medium/Low` confidence with confirming + contradicting evidence cited at file:line. Adopt as standard W327+ subagent-return-format — many returns today lack contradicting-evidence sections.

5. **Lifecycle protocol with `shutdown_request` + `TeamDelete`** (`team-lead.md:76-84`) — explicit 7-phase lifecycle (Spawn/Assign/Monitor/Collect/Synthesize/Shutdown/Cleanup). Adopt as canonical W327+ team-spawn workflow; currently the runtime sometimes orphans teams without explicit shutdown.

## References

- Anthropic Claude Code Hooks — `https://docs.anthropic.com/en/docs/claude-code/hooks` (exit-2 blocking semantics)
- Anthropic Sub-Agents — `https://docs.anthropic.com/en/docs/claude-code/sub-agents` (subagent_type schema + forked transcript inheritance)
- Anthropic Multi-Agent Research — `https://www.anthropic.com/research/built-multi-agent-research-system` (15× token-burn)
- claude-cookbooks @ `2eed173a` — `patterns/agents/orchestrator_workers.ipynb` cell-2 (canonical empty-response guard)
- wshobson/agents @ `112197c` — upstream SOTA reference
- CLAUDE.md L13/L19/L34 — parallel-dispatch + W269 + 29%/1586-JSONL audit anchor
- W319-ORCHESTRATION-AUDIT/STREAM-A-SYNTHESIS.md — HIGH-2 + HIGH-3 sourcing
- W325-AUDIT-WAVE/STREAM-A-ORCHESTRATION-SILENT-FALLBACK-V2.md — F1 SEV-1 measured 0.0038 ratio + F4/F5 codification
- `.claude/skills/parallel-dispatch-mandate/SKILL.md` — local enforcement overlay
- `.claude/skills/dispatching-parallel-agents-w321-fork/SKILL.md` — W321 vendor-fork
