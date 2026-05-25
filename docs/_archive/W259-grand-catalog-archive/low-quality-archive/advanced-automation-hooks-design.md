# Advanced Automation Hooks Design (W163 F7 — Pattern A revision)

# Cite-class lattice per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8:
# constituents=[
#   TIER-1-DIRECT @ https://code.claude.com/docs/en/hooks (Anthropic CC hooks PreToolUse/PostToolUse/SessionStart/UserPromptSubmit/Stop/SubagentStop event semantics + permissionDecision JSON contract at hookSpecificOutput + asyncRewake field + `if` is HOOK-HANDLER level field per §"Hook handler fields" + `timeout` is SECONDS),
#   TIER-1-DIRECT @ Z:/repos/deps/claude-agent-sdk-python/src/claude_agent_sdk/types.py:246-262,265,274,284,344 @ HEAD b512f256450dba8f0dd1399e485563b7deb9c534 (HookInput TypedDicts + _SubagentContextMixin agent_id/agent_type),
#   TIER-3-LOCAL-CONFIG @ existing eee hooks at Z:/claude-sota-installed/.claude/hooks/scripts/*.py (28 scripts; canonical patterns: codex_postcommit_review.py subprocess.Popen detached-launch at L19-21 + fm20_path_drift_lint.py PostToolUse pattern + agent_spawn_gate.py PreToolUse arg-validation + gitleaks_pre_commit_gate.py 6-variant commit matrix at settings.json:5848-7100),
#   TIER-2 @ Z:/claude-sota/.claude/rules/layered-gates-architecture.md §5 layers (canonical event-role mapping),
#   TIER-2 @ Z:/claude-sota/.claude/rules/audit-action-loop.md (Wire/Surface/Close/Re-fire pattern for hook telemetry consumers),
#   TIER-2 @ Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md §Pattern A (single fix-forward at NEEDS-REVISION conf 0.88-0.93),
#   TIER-2 @ Z:/claude-sota/.claude/rules/mia-pre-apply.md §How to apply (apply-boundary verify-before-trust),
#   TIER-2 @ Z:/claude-sota/.claude/rules/parallel-session-worktree-isolation.md §Sub-class (b) staging-index race recovery,
#   TIER-2 @ Z:/claude-sota-installed/.claude/rules/fm21-queue-time-prompt-freeze.md §sub-class .a CronCreate freeze (LOCAL path — sibling-path was UNRESOLVED per codex T1 W163 F7 prescription #7),
#   TIER-2 @ Z:/claude-sota/.claude/rules/karpathy-adapted.md §5 Wiki Compounding Surface,
#   TIER-2 @ Z:/claude-sota/.claude/rules/cross-model-consensus.md §The contract,
#   TIER-3-LOCAL-OPERATOR-DERIVED @ /goal P0 ≥5 PA cycles + P2 MEMORY 3-LAYER + P3 PARALLEL-SAFE GIT mandates as design driver,
#   TIER-3-LOCAL-OPERATOR-DERIVED @ codex T1 W163 F7 verdict at .claude/state/codex_consult_w163_f7_hooks_design_OUT.txt NEEDS-REVISION conf=0.9 + 9 prescribed_edits (this revision = Pattern A apply per Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md §Pattern A)
# ]; effective_tier=TIER-3-LOCAL-COMPOSITION per rule #8 MIN_PRECEDENCE (sss-novel composition over TIER-1-DIRECT Anthropic-hooks-doc substrates + TIER-3-LOCAL-CONFIG existing-hook patterns).

## Goal & scope

Design 7 hooks closing identified gaps in the advanced-automation surface. Each hook automates a discipline currently executed manually per-fire (memory persistence, Layer-2 indexing, Pattern A queueing, FM-02 enforcement, sota-convergence-audit triggering). Combined the 7 hooks enable **seamless invocation** of the convergence-evolve-loop disciplines without operator-typed slash commands.

Per cardinal-rule-7 graduated-unleash + cardinal-rule-11 META-process SOTA discipline: each hook is INSTALL-class (per CR-5 install-priority) when an upstream SOTA primitive exists; CITE-CLASS-ADAPTED when only patterns exist. Per cardinal-rule-9 install-risk: each hook MUST budget 2-round codex T1 fix-forward + version-pin all dependencies.

## Existing hook surface (baseline — 28 scripts / 17 registered)

| Event | Registered count | Coverage |
|---|---:|---|
| PreToolUse | 7 | codex_t1_consult_gate + codex_t2_pre_commit_gate + agent_spawn_gate + agent_plan_readonly_bash_guard + safety_guard + gitleaks_pre_commit_gate + secret_scan_guard + block_no_verify_guard |
| PostToolUse | 3 | codex_postcommit_review + codex_prepush_review + fm20_path_drift_lint |
| PostToolUseFailure | 1 | (failure logger) |
| Stop | 1 | auto_proceed_gate + codex stuck/stop gates |
| SubagentStop | 1 | subagent_stop_telemetry |
| UserPromptSubmit | 1 | (intent parser) |
| SessionStart | 3 | codex_mcp_healthcheck + state probe + others |
| SessionEnd | 1 | session checkpoint |

## Anthropic CC hooks contract corrections (Mia-verified 2026-05-13 per codex T1 W163 F7 prescriptions #1+#2)

Two structural invariants confirmed via Mia probe on existing eee settings.json (24 `if` field occurrences + 52 `timeout` field occurrences):

1. **`if` field is HOOK-HANDLER level**, not matcher-group level. Existing eee canonical example at `Z:/claude-sota-installed/.claude/settings.json:5848-7100` — `gitleaks_pre_commit_gate.py` registered 6× with distinct `if:` clauses at hook-handler level inside `hooks: [...]` array. Anthropic hooks docs at `https://code.claude.com/docs/en/hooks` §"Hook handler fields" confirms `if` is per-handler conditional.

2. **`timeout` is SECONDS, not milliseconds**. All 52 timeout fields in eee settings.json use seconds (5/8/10/30/180/300). Anthropic hooks docs verbatim: `timeout` field is "the timeout in seconds for the hook execution".

3. **Commit matcher matrix** (per existing eee canonical at gitleaks_pre_commit_gate.py registration): for any hook firing on git commit events, register 6 distinct hook-handler entries with these `if:` clauses to cover the full eee commit surface (FM-02 narrow form + rtk wrapper + env-prefix variants):
   - `Bash(git commit *)`
   - `Bash(git -C * commit *)`
   - `Bash(rtk git commit *)`
   - `Bash(rtk git -C * commit *)`
   - `Bash(env * git commit *)`
   - `Bash(env * git -C * commit *)`

4. **DENY mechanism for PreToolUse hooks**: Anthropic hooks docs prescribe stdout-JSON with `hookSpecificOutput.hookEventName: "PreToolUse"` + `permissionDecision: "deny"` + `permissionDecisionReason: <string>`, keep exit 0. The `exit 2 + stderr` mechanism is for advisory-block (asyncRewake/post-hoc); for true DENY, use stdout JSON.

## 7 NEW hooks for advanced automation

### Hook #1 — `memory_persist_post_commit_hook.py` (HIGH-LEVERAGE — DEFERRED pending HTTP-bridge spike)

**Event**: PostToolUse with `matcher: "Bash"`
**Per-handler `if:`**: register 6× covering the full commit matrix (see §"Commit matcher matrix" above)
**Mode**: `async: true` (detached subprocess); `timeout: 30` (seconds); do not block commit completion
**Purpose**: After every `git commit`, automatically persist commit metadata to graphiti L3 + mcp-memory L1 without requiring agent-side MCP calls. Solves /goal P2 mandate "graphiti + mcp-memory store EVERY commit" — currently manually invoked per F-step.

**Mechanism**:
1. Read stdin JSON (PostToolUse input — contains `tool_input.command` for the git commit cmd)
2. Run `git -C <project> log -1 --format='%H%n%s%n%b%n%an'` to get full commit metadata
3. Run `git -C <project> show --stat HEAD --format=''` for diff stat
4. HTTP POST to graphiti server via `mcp-memory` HTTP bridge OR `codex-companion.mjs` HTTP bridge OR direct local TCP (spike: verify which bridge surface accepts unauthenticated background-script POST)
5. **Sensitive metadata redaction** (per §Anti-patterns "unredacted memory persistence"): scrub `gh_token`, `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, JWT-shape strings from commit body BEFORE POST
6. Log to `.claude/state/memory_persist_post_commit.jsonl` per audit-action-loop discipline
7. Exit 0 (fail-open per cycle-412 silent-failure-ratchet — never block commit on memory persist failure)

**Cite anchor**: Anthropic CC hooks docs PostToolUse `Bash` matcher + sister hook `codex_postcommit_review.py` subprocess.Popen pattern at `Z:/claude-sota-installed/.claude/hooks/scripts/codex_postcommit_review.py:19-21` (CREATE_NEW_PROCESS_GROUP | DETACHED_PROCESS detached-launch).

**Dependency**: HTTP/CLI bridge to graphiti + mcp-memory MUST be verified before this hook ships. Bridge verification = separate spike fire (NOT bundled with this hook).

### Hook #2 — `memory_md_layer2_auto_index_hook.py` (HIGH-LEVERAGE — IMMEDIATELY IMPLEMENTABLE)

**Event**: PostToolUse with `matcher: "Write|Edit"`
**Path filter**: applied INSIDE hook script (not registration) — read stdin `tool_input.file_path`, fnmatch against `**/memory/reference_*.md` → exit 0 immediately if no match
**Mode**: `async: false` (sync); `timeout: 5` (seconds; small file Read + small Edit on MEMORY.md)
**Purpose**: When a new `memory/reference_*.md` file is created (or edited), automatically append a ≤150-char one-line pointer to `MEMORY.md` Layer-2 index per Karpathy §5 Wiki Compounding Surface. Solves /goal P2 Layer-2 mandate.

**Mechanism**:
1. Read stdin JSON — extract `tool_input.file_path`
2. If path does NOT match `**/memory/reference_*.md` OR `**/memory/feedback_*.md` OR `**/memory/project_*.md`: exit 0 fast-path
3. Read first ~30 lines of edited file; parse YAML frontmatter
4. Extract `name:` + `description:` + `metadata.type:` fields; build pointer `- [<title>](<filename>) — <description ≤80 chars>`
5. Read `MEMORY.md`; check if pointer already exists (idempotent)
6. If absent, identify section via `metadata.type` (`reference` / `feedback` / `project` → respective sections); append using atomic temp-file + rename
7. Exit 0

**Concurrency safety**: parallel sessions may both append concurrently; use `MEMORY.md.lock` file via `fcntl.flock` (POSIX) or `msvcrt.locking` (Windows) to serialize writes. Idempotent check in step 5 prevents duplicate entries.

**Cite anchor**: Karpathy §5 Layer-2 index discipline per `karpathy-adapted.md §5 Wiki Compounding Surface` + frontmatter parsing pattern from `agent_frontmatter_audit.py` (existing audit script).

### Hook #3 — `codex_t1_pattern_a_queue_hook.py` (HIGH-LEVERAGE — DEFERRED pending watcher-mechanism decision)

**Mechanism choice — Option A (preferred, INSTALL-class compatible)**: PostToolUse with `matcher: "Bash"` + per-handler `if:` = `Bash(*codex exec*--ephemeral*)` — fires when codex exec command completes; hook reads stdin to find the `--output-last-message <path>` flag value, polls that path for verdict-JSON.

**Mechanism choice — Option B (CITE-CLASS-ADAPTED, fallback)**: Anthropic CC `FileChanged` event (if available in current CC build) with **literal filename** `watchPaths` listing `.claude/state/codex_consult_*_OUT.txt` patterns. Per Anthropic docs the `FileChanged` matcher is literal-filename based, NOT glob — so this requires either enumerating each topic-OUT path OR running a SessionStart-spawned daemon that monitors the state directory.

**Mechanism choice — Option C (REJECTED)**: free-floating fs-watch primitive as if native — refuted by Anthropic hooks docs (no fs-watch primitive). Original W163 F7 design proposed inotify-equivalent which does NOT exist in CC hook subprocess model.

**Mode**: `async: true` (10s spawn cap; main logic in background)
**Purpose**: When codex T1 verdict file at `.claude/state/codex_consult_*_OUT.txt` appears with structured `verdict: NEEDS-REVISION` + `confidence` 0.88-0.93 + `prescribed_edits` ≤10, automatically write a Pattern A queue file at `.claude/state/pattern_a_queue/<topic>.json` that next-agent-turn detects and offers as ship candidate.

**Mechanism**:
1. (Option A) Hook fires post-codex-exec; parse stdin `tool_input.command` for `--output-last-message <path>` flag
2. Read last 200KB of OUT file; balanced-brace-walk for terminal JSON verdict block per `feedback_codex_t1_verdict_reading_discipline.md` (EOF-first)
3. Validate: `verdict == "NEEDS-REVISION"`, `confidence` in [0.88, 0.93], `len(prescribed_edits) ≤ 10`
4. Write Pattern A queue JSON: `{topic, verdict_file, prescribed_edits, mia_pre_apply_status: "pending"}` to `.claude/state/pattern_a_queue/<topic>.json` (atomic temp-rename)
5. Emit stderr `Pattern A candidate queued: <topic>` for SessionStart-additional-context surfacing
6. Exit 0

**Cite anchor**: `codex-t1-fix-forward-pattern.md §Pattern A` (single-fix-forward at NEEDS-REVISION conf 0.88-0.93) + `mia-pre-apply.md` Step 1 (queue before apply).

**Dependency**: Final watcher mechanism selection (Option A vs B) requires Anthropic-docs verification of `FileChanged` event availability in current CC build. Defer to F12+ post-verification spike.

### Hook #4 — `goal_paste_ready_freshness_hook.py` (MEDIUM-LEVERAGE — IMMEDIATELY IMPLEMENTABLE)

**Event**: SessionStart + UserPromptSubmit
**Mode**: `async: false` (sync); `timeout: 3` (seconds)
**Purpose**: At session start AND on every user prompt, detect if `tmp/w<N>-goal-paste-ready.txt` has newer mtime than the active /goal session-state. If yes, emit system-reminder via additionalContext.

**Mechanism**:
1. Find newest `tmp/w*-goal-paste-ready.txt` by mtime
2. Compare against session active-goal mtime (proxy: check `.claude/state/active_goal.txt` if exists; fallback: assume always-stale and surface for operator)
3. If newer paste-ready exists, emit additionalContext: `<system-reminder>Fresh W164.1 /goal predicate at tmp/w164-goal-paste-ready.txt; operator: paste via /goal clear + /goal <contents> to activate.</system-reminder>`
4. Exit 0

**Cite anchor**: Anthropic CC SessionStart hook docs + UserPromptSubmit additionalContext semantic per `https://code.claude.com/docs/en/hooks`.

### Hook #5 — `fm02_atomic_narrow_enforce_hook.py` (MEDIUM-LEVERAGE — IMMEDIATELY IMPLEMENTABLE)

**Event**: PreToolUse with `matcher: "Bash"`
**Per-handler `if:`**: register 6× covering the full commit matrix (see §"Commit matcher matrix" above)
**Mode**: `async: false` (sync); `timeout: 2` (seconds)
**Purpose**: Enforce FM-02 atomic narrow `--only` form per `parallel-session-worktree-isolation.md` Sub-class (b) recovery + `git-cli-grammar-discipline.md` invariants. When parallel session count ≥2 (probed via `tasklist | findstr claude.exe`), DENY `git commit` without `--only` flag OR `-o` shorthand. Solves /goal P3 mandate.

**Mechanism**:
1. Read stdin JSON — extract `tool_input.command`
2. Probe concurrent claude.exe count: `tasklist | findstr /c:"claude.exe" | wc -l` (Windows) or `pgrep -c claude` (POSIX)
3. If count < 2: exit 0 (single-session, narrow form not enforced)
4. If count ≥ 2: parse commit command for `--only` or `-o` flag presence
5. If neither flag present: **emit stdout JSON DENY** per Anthropic CC hooks docs:
   ```json
   {
     "hookSpecificOutput": {
       "hookEventName": "PreToolUse",
       "permissionDecision": "deny",
       "permissionDecisionReason": "FM-02 narrow --only enforce: N claude.exe sessions detected; commit MUST use --only or -o form to scope to specific pathspecs. See parallel-session-worktree-isolation.md §Sub-class (b) staging-index race."
     }
   }
   ```
   Then exit 0 (NOT exit 2 — stdout JSON is the canonical DENY mechanism for PreToolUse)
6. Otherwise (narrow form present): exit 0

**Cite anchor**: `parallel-session-worktree-isolation.md §Sub-class (b) staging-index race` + `git-cli-grammar-discipline.md` invariant #1+#2 (options before `--`) + Anthropic hooks docs `hookSpecificOutput.permissionDecision` PreToolUse DENY contract.

### Hook #6 — `sota_convergence_audit_auto_trigger_hook.py` (MEDIUM-LEVERAGE — IMMEDIATELY IMPLEMENTABLE)

**Event**: UserPromptSubmit
**Mode**: `async: false` (sync); `timeout: 3` (seconds)
**Purpose**: When user prompt mentions GitHub URLs OR known SOTA repo names not yet audited (cross-ref `docs/sota-installed-manifest.md` + `docs/verified-avoid.md`), inject system-reminder suggesting `sota-convergence-audit` skill invocation. Solves /goal P6 awesome-list-audit auto-discovery.

**Mechanism**:
1. Read stdin JSON — extract user prompt text
2. Regex match GitHub URL patterns OR known repo names from /goal P5 queue
3. Cross-check against `docs/sota-installed-manifest.md` (installed list) + `docs/verified-avoid.md` (rejected list)
4. If repo not in either list: emit additionalContext `<system-reminder>Repo <name> mentioned but not in manifest/verified-avoid. Invoke sota-convergence-audit skill via Skill tool with args=<repo>.</system-reminder>`
5. Exit 0

**Cite anchor**: `sota-convergence-audit` skill auto-fire triggers (per available-skills list) + `sota-research-architecture.md` D1-D10 pipeline.

### Hook #7 — `cron_freshness_monitor_hook.py` (LOW-LEVERAGE — DEFERRED pending Cron-state-access verification)

**Event**: SessionStart
**Mode**: `async: false` (sync); `timeout: 5` (seconds)
**Purpose**: Probe active CronList state vs current /goal version. If cron exists with stale prompt body (older than current /goal mtime by >2h), emit additionalContext warning per FM-21 queue-time-prompt-freeze.

**Mechanism**:
1. Probe `CronList` state — verification spike required: CC may expose state via session-runtime API, OR via state file at `.claude/state/cron_jobs.json`, OR may require external mechanism
2. For each cron job: compare prompt-creation-time to current /goal active timestamp
3. If gap > 2h: emit additionalContext `<system-reminder>Cron <id> prompt frozen at <old-ts> vs current /goal <new-ts>; per FM-21 .a, consider CronDelete + CronCreate refresh.</system-reminder>`
4. Exit 0

**Cite anchor**: `Z:/claude-sota-installed/.claude/rules/fm21-queue-time-prompt-freeze.md` sub-class (a) CronCreate freeze recovery action #1 (LOCAL path — sibling-path `Z:/claude-sota/.claude/rules/fm21-queue-time-prompt-freeze.md` does NOT exist per Mia probe 2026-05-13).

**Dependency**: CC Cron state-access mechanism MUST be verified before this hook ships. Verification spike = separate fire (NOT bundled with this hook).

## Settings.json registration block (proposed addition — corrected per codex T1 W163 F7 prescriptions #1+#2)

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "Z:/venvs/claude/Scripts/python.exe Z:/claude-sota-installed/.claude/hooks/scripts/memory_persist_post_commit_hook.py",
            "if": "Bash(git commit *)",
            "async": true,
            "timeout": 30
          },
          {
            "type": "command",
            "command": "Z:/venvs/claude/Scripts/python.exe Z:/claude-sota-installed/.claude/hooks/scripts/memory_persist_post_commit_hook.py",
            "if": "Bash(git -C * commit *)",
            "async": true,
            "timeout": 30
          },
          {
            "type": "command",
            "command": "Z:/venvs/claude/Scripts/python.exe Z:/claude-sota-installed/.claude/hooks/scripts/memory_persist_post_commit_hook.py",
            "if": "Bash(rtk git commit *)",
            "async": true,
            "timeout": 30
          },
          {
            "type": "command",
            "command": "Z:/venvs/claude/Scripts/python.exe Z:/claude-sota-installed/.claude/hooks/scripts/memory_persist_post_commit_hook.py",
            "if": "Bash(rtk git -C * commit *)",
            "async": true,
            "timeout": 30
          },
          {
            "type": "command",
            "command": "Z:/venvs/claude/Scripts/python.exe Z:/claude-sota-installed/.claude/hooks/scripts/memory_persist_post_commit_hook.py",
            "if": "Bash(env * git commit *)",
            "async": true,
            "timeout": 30
          },
          {
            "type": "command",
            "command": "Z:/venvs/claude/Scripts/python.exe Z:/claude-sota-installed/.claude/hooks/scripts/memory_persist_post_commit_hook.py",
            "if": "Bash(env * git -C * commit *)",
            "async": true,
            "timeout": 30
          }
        ]
      },
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "Z:/venvs/claude/Scripts/python.exe Z:/claude-sota-installed/.claude/hooks/scripts/memory_md_layer2_auto_index_hook.py",
            "async": false,
            "timeout": 5
          }
        ]
      }
    ],
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "Z:/venvs/claude/Scripts/python.exe Z:/claude-sota-installed/.claude/hooks/scripts/fm02_atomic_narrow_enforce_hook.py",
            "if": "Bash(git commit *)",
            "async": false,
            "timeout": 2
          },
          {
            "type": "command",
            "command": "Z:/venvs/claude/Scripts/python.exe Z:/claude-sota-installed/.claude/hooks/scripts/fm02_atomic_narrow_enforce_hook.py",
            "if": "Bash(git -C * commit *)",
            "async": false,
            "timeout": 2
          },
          {
            "type": "command",
            "command": "Z:/venvs/claude/Scripts/python.exe Z:/claude-sota-installed/.claude/hooks/scripts/fm02_atomic_narrow_enforce_hook.py",
            "if": "Bash(rtk git commit *)",
            "async": false,
            "timeout": 2
          },
          {
            "type": "command",
            "command": "Z:/venvs/claude/Scripts/python.exe Z:/claude-sota-installed/.claude/hooks/scripts/fm02_atomic_narrow_enforce_hook.py",
            "if": "Bash(rtk git -C * commit *)",
            "async": false,
            "timeout": 2
          },
          {
            "type": "command",
            "command": "Z:/venvs/claude/Scripts/python.exe Z:/claude-sota-installed/.claude/hooks/scripts/fm02_atomic_narrow_enforce_hook.py",
            "if": "Bash(env * git commit *)",
            "async": false,
            "timeout": 2
          },
          {
            "type": "command",
            "command": "Z:/venvs/claude/Scripts/python.exe Z:/claude-sota-installed/.claude/hooks/scripts/fm02_atomic_narrow_enforce_hook.py",
            "if": "Bash(env * git -C * commit *)",
            "async": false,
            "timeout": 2
          }
        ]
      }
    ],
    "SessionStart": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "Z:/venvs/claude/Scripts/python.exe Z:/claude-sota-installed/.claude/hooks/scripts/goal_paste_ready_freshness_hook.py",
            "async": false,
            "timeout": 3
          }
        ]
      }
    ],
    "UserPromptSubmit": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "Z:/venvs/claude/Scripts/python.exe Z:/claude-sota-installed/.claude/hooks/scripts/goal_paste_ready_freshness_hook.py",
            "async": false,
            "timeout": 3
          },
          {
            "type": "command",
            "command": "Z:/venvs/claude/Scripts/python.exe Z:/claude-sota-installed/.claude/hooks/scripts/sota_convergence_audit_auto_trigger_hook.py",
            "async": false,
            "timeout": 3
          }
        ]
      }
    ]
  }
}
```

**Deferred hooks** (NOT registered until verification spikes complete):
- Hook #3 `codex_t1_pattern_a_queue_hook.py` — depends on Option A (Bash matcher post-codex-exec) vs Option B (`FileChanged` event availability) decision
- Hook #7 `cron_freshness_monitor_hook.py` — depends on CC Cron state-access mechanism verification
- Hook #1 `memory_persist_post_commit_hook.py` registered in block above is contingent on HTTP/CLI bridge verification spike; ship gate enforces "verify-bridge-first" before this commit entry activates

## Ship strategy (per cycle-300 ONE-LOGICAL-UNIT-PER-FIRE + codex T1 W163 F7 prescription #9)

This W163 F7 fire: design doc only (this artifact). Implementation ships per-hook in subsequent fires, split between IMMEDIATELY-IMPLEMENTABLE and DEFERRED-PENDING-VERIFICATION-SPIKE:

**Immediately implementable** (no external bridge/watcher dependency):
- F8 PA #2: Hook #2 `memory_md_layer2_auto_index_hook.py` (smallest scope, ~120 LOC including concurrency lock)
- F9 PA #3: Hook #5 `fm02_atomic_narrow_enforce_hook.py` (~100 LOC; 6× registration, stdout-JSON DENY contract)
- F10 PA #4: Hook #4 `goal_paste_ready_freshness_hook.py` (~120 LOC; satisfies compound STOP)
- F11 PA #5: Hook #6 `sota_convergence_audit_auto_trigger_hook.py` (~150 LOC; manifest cross-check + regex)

**Deferred pending verification spike** (separate spike-fire each):
- Spike-A: graphiti + mcp-memory HTTP/CLI bridge — verify which surface accepts unauthenticated POST from background subprocess
- Spike-B: Anthropic CC `FileChanged` event availability + literal-filename `watchPaths` mechanism
- Spike-C: Anthropic CC Cron state-access mechanism (state file vs runtime API)
- F12+: Hook #1 (after Spike-A) / Hook #3 (after Spike-B) / Hook #7 (after Spike-C)

Each hook ships under Pattern A discipline: codex T1 Path P NEEDS-REVISION verify → ≤10 prescribed → Mia n=200+ → FM-02 atomic narrow commit + `tests/test_<hook>_security.py` per `layered-gates-architecture.md §9 DENY-emitting HARD GATE`.

## Anti-patterns

1. **Skipping codex T1 verify on hook design** — refuted by CR-3 + cycle-300. Hooks are design surface; T1 verify is mandatory (this fire's NEEDS-REVISION verdict is the dogfood evidence).
2. **`if` nesting drift (matcher-group vs hook-handler level)** — refuted by Anthropic hooks docs §"Hook handler fields" + existing eee canonical at `settings.json:5848-7100` 24 `if` fields ALL at hook-handler level. Placing `if` at matcher-group level causes silent mis-wiring (matcher fires regardless of conditional).
3. **Timeout-unit drift (ms vs seconds)** — refuted by Anthropic hooks docs "timeout in seconds" + existing eee canonical 52 timeout fields ALL in seconds. Setting `timeout: 30000` for "30 seconds" actually requests 30,000 seconds (~8.3 hours) — silent timeout never fires.
4. **Hook calls MCP tools directly** — refuted by hook execution model (subprocess from CC runtime, no MCP context). Hooks MUST use HTTP/CLI bridges to MCP services (graphiti REST, mcp-memory CLI).
5. **`@latest` install without version-pin** — refuted by CR-9. Each hook's dependencies (Python packages, codex CLI) MUST carry explicit version pin OR `@latest-acknowledged-D6-risk` marker.
6. **Sync block on slow operations** — refuted by Anthropic CC hooks docs. Mode discipline: sync for fast gates (≤5s); async for slow operations (HTTP, codex, MCP); asyncRewake when retroactive wake is acceptable.
7. **No fail-open** — refuted by cycle-412 silent-failure-ratchet. Every hook MUST fail-open on internal exceptions (exit 0 + stderr log). Only DENY-emitting hooks (Hook #5 FM-02 enforce) emit stdout-JSON permissionDecision deny on the specific condition.
8. **Unbounded duplicate hook fanout** — registering same hook N× without per-handler `if:` filtering causes N× execution per matched tool call. Each registration MUST carry a distinct `if:` clause OR matcher pattern (not both wildcards).
9. **Hook recursion / concurrent writes** — hooks that fire on PostToolUse `Write|Edit` and themselves Write/Edit can recurse (Hook #2 writes MEMORY.md → fires Hook #2 again). Mitigate via: (a) Hook #2 path filter EXCLUDES `MEMORY.md` itself, (b) fcntl/msvcrt lockfile prevents concurrent writes from parallel sessions, (c) idempotent-append check (re-read before append) prevents duplicate entries.
10. **Unredacted memory persistence of sensitive commit metadata** — Hook #1 posts commit body to graphiti/mcp-memory; commit bodies CAN contain inline-pasted secrets (gh tokens, API keys, JWT) that operator didn't notice. Hook #1 MUST scrub patterns matching `ghp_*`, `sk-ant-*`, `sk-*`, `xoxb-*`, `AKIA*`, JWT-shape `[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+` BEFORE POST. Sister: `gitleaks_pre_commit_gate.py` patterns.
11. **Free-floating fs-watch presented as Anthropic-native** — refuted by codex T1 W163 F7 prescription #5. CC hook subprocess model has NO fs-watch primitive. Use PostToolUse Bash parsing OR explicit `FileChanged` event with literal-filename watchPaths.

## Sister-rule integration (8 cites — consistent with header constituents + cite-class line)

- `layered-gates-architecture.md §5 canonical layers` — each hook maps to a layer (1 front-gate / 2 commit-gate / 3 audit-trail / 4 stop-gate / 0 worktree)
- `audit-action-loop.md §Wire/Surface/Close/Re-fire` — every hook writing JSONL is a Wire stage; SessionStart consumers surface drift; operator/agent closes
- `codex-t1-fix-forward-pattern.md §Pattern A` — Hook #3 codifies Pattern A discovery automation; this design's revision IS a Pattern A apply
- `mia-pre-apply.md §How to apply` — Hook #3 produces queue that next-agent applies Mia probe before Edit
- `parallel-session-worktree-isolation.md §Sub-class (b)` — Hook #5 enforces narrow `--only` form for parallel-safe commits
- `Z:/claude-sota-installed/.claude/rules/fm21-queue-time-prompt-freeze.md §sub-class .a` (LOCAL path) — Hook #7 surfaces cron-staleness
- `karpathy-adapted.md §5 Wiki Compounding Surface` — Hook #2 maintains Layer-2 index
- `cross-model-consensus.md §The contract` — Hook #1 ensures memory persistence per `EVERY ship`

## Update triggers

Re-evaluate this design when:
- A new Anthropic CC hook event type ships (e.g., PreCommit, PreNetworkRequest)
- The MCP HTTP/CLI bridge mechanism becomes available natively in CC (would obviate Hook #1 HTTP-bridge spike)
- `FileChanged` event availability confirmed in current CC build (would enable Hook #3 Option B)
- CC exposes Cron state-access mechanism (would unblock Hook #7)
- A 4th distinct hook gap surfaces beyond the 7 listed
- A 2nd anti-pattern from this list fires in implementation (would mechanize as pre-commit lint)

## Cite class for this design doc

`constituents=[
  TIER-1-DIRECT @ Anthropic CC hooks docs (https://code.claude.com/docs/en/hooks) — `if` is hook-handler field + `timeout` is seconds + permissionDecision stdout-JSON DENY contract,
  TIER-1-DIRECT @ Z:/repos/deps/claude-agent-sdk-python b512f256 HookInput TypedDicts,
  TIER-3-LOCAL-CONFIG @ Z:/claude-sota-installed/.claude/hooks/scripts/*.py existing 28-script canonical patterns + settings.json:5848-7100 24× `if`-field + 52× seconds-timeout canonical,
  TIER-2 @ Z:/claude-sota/.claude/rules/layered-gates-architecture.md + audit-action-loop.md + codex-t1-fix-forward-pattern.md + mia-pre-apply.md + parallel-session-worktree-isolation.md + karpathy-adapted.md + cross-model-consensus.md sister-rule integrations,
  TIER-2 @ Z:/claude-sota-installed/.claude/rules/fm21-queue-time-prompt-freeze.md (LOCAL path),
  TIER-3-LOCAL-OPERATOR-DERIVED @ /goal P0-P6 mandates as design driver,
  TIER-3-LOCAL-OPERATOR-DERIVED @ codex T1 W163 F7 verdict NEEDS-REVISION conf=0.9 + 9 prescribed_edits + Mia 6-probe verification 2026-05-13
]; effective_tier=TIER-3-LOCAL-COMPOSITION` per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 MIN_PRECEDENCE.
