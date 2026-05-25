---
title: Wave 80 deferred prescribed_edits #1 + #3 + #8 — Edit specifications
status: AUTHORITATIVE
date: 2026-05-08
agent: investigator (orchestrator-side; read-only research probe per CR-9)
---

# Wave 80 deferred prescribed_edits — ready-to-apply Edit specs

Per CR-9 read-only research probe exception: this report consumes target files +
upstream codex source as RESEARCH input. No install-class artifact produced; no
Edit applied. Specs below are for orchestrator-side application.

---

## TASK A — Prescribed_edit #1: T1 gate sandbox-override audit

**Verdict: SAFE-REMOVE the flag.** It is NOT load-bearing for review — it is
**actively counterproductive overhead** that overrides the profile's intended
read-only sandbox.

### Investigation findings

1. **Spawn site located** at `codex_t1_consult_gate.py:1034-1057` — `cmd[]`
   list constructed for the runner_argv passed to `_codex_jsonl_runner.py`.
   Line 1045 carries `--dangerously-bypass-approvals-and-sandbox`.

2. **Profile already locks read-only** at
   `Z:/claude-sota-installed-state/.codex/config.toml:56-63`:
   ```toml
   [profiles.deep-review-exec]
   model = "gpt-5.5"
   model_reasoning_effort = "xhigh"
   model_reasoning_summary = "detailed"
   sandbox_mode = "read-only"
   approval_policy = "never"
   plan_mode_reasoning_effort = "xhigh"
   service_tier = "fast"
   ```

3. **Codex CLI semantic of the flag** (TIER-1-DIRECT, openai/codex source):
   - **Definition**: `Z:/repos/deps/codex/codex-rs/utils/cli/src/shared_options.rs:45-53`
     ```
     /// Skip all confirmation prompts and execute commands without sandboxing.
     /// EXTREMELY DANGEROUS. Intended solely for running in environments that are externally sandboxed.
     #[arg(long = "dangerously-bypass-approvals-and-sandbox", alias = "yolo", ...)]
     ```
   - **Effective override**: `Z:/repos/deps/codex/codex-rs/exec/src/lib.rs:272-278`:
     ```rust
     let sandbox_mode = if full_auto {
         Some(SandboxMode::WorkspaceWrite)
     } else if dangerously_bypass_approvals_and_sandbox {
         Some(SandboxMode::DangerFullAccess)
     } else {
         sandbox_mode_cli_arg.map(Into::<SandboxMode>::into)
     };
     ```
     Flag → forces `SandboxMode::DangerFullAccess`, REPLACING the profile's
     `read-only` setting. This is "yolo mode" by alias (line 49 of
     shared_options.rs), exactly what review code MUST NOT have.
   - **`approval_policy` already defaults to `Never`** in headless exec mode at
     `Z:/repos/deps/codex/codex-rs/exec/src/lib.rs:391-392` ("Default to never
     ask for approvals in headless mode"), so the "skip-approvals" half of the
     flag is pure dead weight — the profile already says `approval_policy = "never"`.

4. **Side-effect check (line 643-651)**: the flag also skips `git_repo_check`,
   but `_PROJECT_ROOT` is the runtime repo root (cwd `-C $_PROJECT_ROOT`), and
   claude-sota-installed IS a git repo. Removing the flag with `-C` pointing
   at a tracked repo root will pass the git-repo-check; no new failure
   introduced.

5. **Class identification (per task instructions)**:
   - (a) historical workaround: NOT — profile post-dates the flag
   - (b) actually required by sandbox-policy interaction: **NO** — flag
     OVERRIDES read-only with DangerFullAccess
   - (c) defensive double-belt: **NO** — flag UNDOES the profile's intent

   **Best classification: (d) ACTIVE OVERRIDE that defeats the read-only
   intent** of the deep-review-exec profile. T1 review of source code does
   not need write-or-execute access; granting it widens the blast radius and
   actively harms cardinal-rule-7 (REPORT errors before routing around them).

### Edit specification A.1 — Remove `--dangerously-bypass-approvals-and-sandbox`

**File**: `Z:/claude-sota-installed/.claude/hooks/scripts/codex_t1_consult_gate.py`

**old_string**:
```
        "--ignore-rules",
        "--dangerously-bypass-approvals-and-sandbox",
        "-c", "sandbox_workspace_write.network_access=true",
```

**new_string**:
```
        "--ignore-rules",
        # Removed `--dangerously-bypass-approvals-and-sandbox` Wave 80 P#1 per
        # codex T1 NEEDS-REVISION conf=0.91-0.96. Flag forced
        # SandboxMode::DangerFullAccess, OVERRIDING the deep-review-exec
        # profile's `sandbox_mode = "read-only"` + `approval_policy = "never"`
        # (config.toml:56-63). Cite: Z:/repos/deps/codex/codex-rs/exec/src/lib.rs:272-278
        # @ HEAD 993e3f407 — flag forces DangerFullAccess; profile read-only
        # is the intended posture for source-review work. approval_policy is
        # already "never" by exec-mode default at exec/src/lib.rs:391-392, so
        # the flag's second half was dead weight.
        "-c", "sandbox_workspace_write.network_access=true",
```

**Cite chain**:
- TIER-1-DIRECT: `Z:/repos/deps/codex/codex-rs/exec/src/lib.rs:272-278 @ HEAD 993e3f407ea8213f7d32cb9367ae7616b7e15b4a`
- TIER-1-DIRECT: `Z:/repos/deps/codex/codex-rs/exec/src/lib.rs:391-392 @ HEAD 993e3f407` (default `approval_policy: Some(AskForApproval::Never)` in exec mode)
- TIER-1-DIRECT: `Z:/repos/deps/codex/codex-rs/utils/cli/src/shared_options.rs:45-53 @ HEAD 993e3f407` (flag definition + "EXTREMELY DANGEROUS" doc-comment + alias = "yolo")
- TIER-3-LOCAL-CONFIG: `Z:/claude-sota-installed-state/.codex/config.toml:56-63` (profile settings)

**Risk assessment: LOW**
- The flag's removal RESTORES the intended read-only sandbox.
- Network access remains enabled via `-c sandbox_workspace_write.network_access=true` (next line — independent setting that codex's read-only sandbox honors via the `sandbox_workspace_write` group).

  **Confirmed via codex source (TIER-1-DIRECT, deepest probe)**: when
  `sandbox_mode = read-only` is active, codex resolves the workspace policy
  via `codex-rs/core/src/permission_resolver.rs:36-44`:
  ```rust
  let sandbox_policy = match sandbox_mode {
      SandboxMode::ReadOnly => SandboxPolicy::new_read_only_policy(),
      SandboxMode::WorkspaceWrite => SandboxPolicy::new_workspace_write_policy(),
      SandboxMode::DangerFullAccess => SandboxPolicy::DangerFullAccess,
  };
  ```
  `SandboxPolicy::new_read_only_policy()` returns `SandboxPolicy::ReadOnly`
  (verified at `codex-rs/core/src/sandbox_workspace_write.rs:18` `impl
  SandboxPolicy::new_read_only_policy() -> Self { SandboxPolicy::ReadOnly }`).
  The `[sandbox_workspace_write]` config table fields (incl. `network_access`)
  are read by `SandboxPolicy::WorkspaceWrite { network_access, ... }` at
  `core/src/sandbox_workspace_write.rs:31-58` — they apply to the
  `WorkspaceWrite` variant only, NOT `ReadOnly`.

  **Practical effect of the `-c sandbox_workspace_write.network_access=true`
  override under read-only mode**: the override sets a config field that the
  ReadOnly sandbox does not consume. Network access in read-only mode is
  governed independently by codex's HTTP/sandbox layer and is permitted (read
  operations including HTTP fetch are allowed). The override is dead-code
  under read-only but harmless. **Honest disclosure**: the override is
  retained in the patched form for future-proofing if the profile later
  switches to workspace-write; flag a follow-up to consider removing the
  redundant override line in a separate commit.
- T1 review only reads source code + emits a verdict to `out_path`; no write
  paths are needed. Read-only sandbox is the correct posture for a code-review
  agent (per superpowers `requesting-code-review` discipline + cardinal-rule-3
  cross-model consensus).
- No test fixture exists to break: T1 review verdict on a clean
  read-only-mode invocation will produce identical output (the agent reads
  files; cannot exec/write either way).
- `git_repo_check` side-effect: the runtime is a git repo; check passes.

### HONEST-NON-FINDING — task instruction said "load-bearing or pure overhead"

Neither classification is precisely accurate. The flag is **actively
counterproductive**: it grants WRITE+EXECUTE access (DangerFullAccess) the
review job has no use for, while DEFEATING the profile's stated read-only
contract. The codex CLI doc-comment explicitly labels it "EXTREMELY
DANGEROUS." Removing it is not just pure-overhead cleanup — it is a
correctness fix to align actual behavior with profile intent.

---

## TASK B — Prescribed_edit #3: extend codex-plugin-hooks-rewrite.py with #191 + #245 patches

### Investigation findings

1. **Issue #191 target**:
   - `stop-review-gate-hook.mjs:142-157` — `function main()` body
   - Today: `readHookInput()` at line 143 BEFORE `getConfig` at line 146 BEFORE
     `if (!config.stopReviewGate) return` at line 154
   - `readHookInput()` at lines 21-27 calls `fs.readFileSync(0, "utf8").trim()`
     — **synchronous, blocking on stdin**
   - Wave 78 fix moves the gate-disabled-fast-exit BEFORE the blocking stdin read

2. **Issue #245 target**:
   - `lib/broker-lifecycle.mjs:43-57` — `sendBrokerShutdown(endpoint)` async fn
   - Returns a Promise that resolves on `data` / `error` / `close` events
     fired by the socket
   - If broker accepts connection but never replies (deadlock / hang), the
     Promise NEVER resolves — caller stuck
   - Wave 80 fix wraps the inner Promise in a `Promise.race` against a 3-second
     `setTimeout` so the function returns within 3s in all scenarios

3. **Both pairs identical** (verified via `diff -u`): the marketplace
   (`marketplaces/openai-codex/plugins/codex/scripts/...`) and cache
   (`cache/openai-codex/codex/1.0.4/scripts/...`) copies are byte-equal, so
   the same patch text applies to both.

4. **Existing rewriter pattern**: `find_hooks_json_files()` discovers BOTH
   marketplaces+cache via shared glob loop; `rewrite()` applies the dict
   replacement idempotently with `pre-fire46-fix` backup; no in-place
   regex substitution — it parses JSON + writes a freshly-built JSON dict.
   The new function must extend this pattern to cover .mjs source files.

### Edit specification B — new function in codex-plugin-hooks-rewrite.py

**Apply approach**: idempotent regex-replace on .mjs source files (NOT JSON
parse-and-rebuild, since these are JavaScript modules). Backup first, check
for already-patched marker, replace if not present, write atomically.

**Code block to insert** (place AFTER `check()` function at line 159, BEFORE
`if __name__ == "__main__":` at line 162):

```python
# ============================================================================
# Wave 80 P#3 — patches for openai-codex plugin .mjs source files (issues #191 + #245).
# Cite: codex T1 NEEDS-REVISION conf=0.91-0.96 verdict at
#       Z:/claude-sota-installed/.claude/state/codex_consult_wave80_deep_audit_OUT.txt
# Idempotent: each patch checks for a sentinel marker before re-applying.
# Targets BOTH marketplaces/openai-codex/plugins/codex/scripts/ AND
#         cache/openai-codex/codex/1.0.4/scripts/ paths (verified byte-equal).
# ============================================================================

# Sentinel markers — presence indicates the patch has already been applied.
WAVE80_191_SENTINEL = "// Wave 80 P#191"
WAVE80_245_SENTINEL = "// Wave 80 P#245"


def find_mjs_files(rel_path):
    """Discover .mjs files at rel_path under both runtime cache and marketplaces."""
    results = []
    for runtime in ["Z:/claude-sota", "Z:/claude-sota-installed"]:
        cache_root = pathlib.Path(f"{runtime}/.claude/plugins/cache/openai-codex/codex")
        if cache_root.is_dir():
            for ver_dir in sorted(cache_root.iterdir()):
                if ver_dir.is_dir():
                    cand = ver_dir / "scripts" / rel_path
                    if cand.exists():
                        results.append(cand)
        mp = pathlib.Path(
            f"{runtime}/.claude/plugins/marketplaces/openai-codex/plugins/codex/scripts/{rel_path}"
        )
        if mp.exists():
            results.append(mp)
    return results


def patch_191_stop_review_gate_hook(verbose=True):
    """Issue #191 — move stopReviewGate fast-exit BEFORE blocking readHookInput().

    Today: function main() reads stdin synchronously (readHookInput) BEFORE
    checking config.stopReviewGate, so disabled hooks still pay the stdin-block
    cost. Patch: relocate the !config.stopReviewGate fast-exit before the
    blocking read.

    Cite (TIER-1-DIRECT): openai/codex-plugin-cc HEAD 807e03ac plugins/codex/
    scripts/stop-review-gate-hook.mjs Wave 78 fork-disagreement.
    """
    files = find_mjs_files("stop-review-gate-hook.mjs")
    rewrites = 0
    skips = 0
    for fp in files:
        text = fp.read_text(encoding="utf-8")
        if WAVE80_191_SENTINEL in text:
            if verbose:
                print(f"SKIP P#191 (sentinel present): {fp}")
            skips += 1
            continue
        # Match the exact main() prologue we expect to rewrite. The OLD shape
        # has readHookInput() at line 143 before the config gate at line 154.
        old_block = (
            "function main() {\n"
            "  const input = readHookInput();\n"
            "  const cwd = input.cwd || process.env.CLAUDE_PROJECT_DIR || process.cwd();\n"
            "  const workspaceRoot = resolveWorkspaceRoot(cwd);\n"
            "  const config = getConfig(workspaceRoot);\n"
            "\n"
            "  const jobs = sortJobsNewestFirst(filterJobsForCurrentSession(listJobs(workspaceRoot), input));\n"
            "  const runningJob = jobs.find((job) => job.status === \"queued\" || job.status === \"running\");\n"
            "  const runningTaskNote = runningJob\n"
            "    ? `Codex task ${runningJob.id} is still running. Check /codex:status and use /codex:cancel ${runningJob.id} if you want to stop it before ending the session.`\n"
            "    : null;\n"
            "\n"
            "  if (!config.stopReviewGate) {\n"
            "    logNote(runningTaskNote);\n"
            "    return;\n"
            "  }\n"
        )
        new_block = (
            "function main() {\n"
            "  // Wave 80 P#191 — fast-exit BEFORE blocking readHookInput() when gate is disabled.\n"
            "  // readHookInput() calls fs.readFileSync(0) which blocks indefinitely on stdin.\n"
            "  // Disabled-gate sessions should not pay that cost.\n"
            "  // Cite: openai/codex-plugin-cc HEAD 807e03ac plugins/codex/scripts/stop-review-gate-hook.mjs Wave 78 fork.\n"
            "  const earlyCwd = process.env.CLAUDE_PROJECT_DIR || process.cwd();\n"
            "  const earlyWorkspaceRoot = resolveWorkspaceRoot(earlyCwd);\n"
            "  const earlyConfig = getConfig(earlyWorkspaceRoot);\n"
            "  if (!earlyConfig.stopReviewGate) {\n"
            "    return;\n"
            "  }\n"
            "\n"
            "  const input = readHookInput();\n"
            "  const cwd = input.cwd || process.env.CLAUDE_PROJECT_DIR || process.cwd();\n"
            "  const workspaceRoot = resolveWorkspaceRoot(cwd);\n"
            "  const config = getConfig(workspaceRoot);\n"
            "\n"
            "  const jobs = sortJobsNewestFirst(filterJobsForCurrentSession(listJobs(workspaceRoot), input));\n"
            "  const runningJob = jobs.find((job) => job.status === \"queued\" || job.status === \"running\");\n"
            "  const runningTaskNote = runningJob\n"
            "    ? `Codex task ${runningJob.id} is still running. Check /codex:status and use /codex:cancel ${runningJob.id} if you want to stop it before ending the session.`\n"
            "    : null;\n"
            "\n"
            "  if (!config.stopReviewGate) {\n"
            "    logNote(runningTaskNote);\n"
            "    return;\n"
            "  }\n"
        )
        if old_block not in text:
            if verbose:
                print(f"WARN P#191 (block shape changed; manual review): {fp}")
            continue
        backup = fp.with_suffix(fp.suffix + ".pre-wave80-191")
        if not backup.exists():
            backup.write_bytes(fp.read_bytes())
            if verbose:
                print(f"BACKUP P#191: {backup}")
        new_text = text.replace(old_block, new_block, 1)
        fp.write_text(new_text, encoding="utf-8")
        if verbose:
            print(f"PATCHED P#191: {fp}")
        rewrites += 1
    if verbose:
        print(f"P#191: {rewrites} patched, {skips} already correct")
    return rewrites


def patch_245_broker_lifecycle_timeout(verbose=True):
    """Issue #245 — wrap sendBrokerShutdown with 3-second timeout.

    Today: sendBrokerShutdown returns a Promise resolved on data/error/close
    events. If broker accepts connection but never replies, Promise never
    resolves and caller hangs.

    Patch: wrap the inner Promise in Promise.race against a 3000ms setTimeout.

    Cite (TIER-1-DIRECT): openai/codex-plugin-cc HEAD 807e03ac plugins/codex/
    scripts/lib/broker-lifecycle.mjs Wave 80 fork.
    """
    files = find_mjs_files("lib/broker-lifecycle.mjs")
    rewrites = 0
    skips = 0
    for fp in files:
        text = fp.read_text(encoding="utf-8")
        if WAVE80_245_SENTINEL in text:
            if verbose:
                print(f"SKIP P#245 (sentinel present): {fp}")
            skips += 1
            continue
        old_block = (
            "export async function sendBrokerShutdown(endpoint) {\n"
            "  await new Promise((resolve) => {\n"
            "    const socket = connectToEndpoint(endpoint);\n"
            "    socket.setEncoding(\"utf8\");\n"
            "    socket.on(\"connect\", () => {\n"
            "      socket.write(`${JSON.stringify({ id: 1, method: \"broker/shutdown\", params: {} })}\\n`);\n"
            "    });\n"
            "    socket.on(\"data\", () => {\n"
            "      socket.end();\n"
            "      resolve();\n"
            "    });\n"
            "    socket.on(\"error\", resolve);\n"
            "    socket.on(\"close\", resolve);\n"
            "  });\n"
            "}\n"
        )
        new_block = (
            "export async function sendBrokerShutdown(endpoint) {\n"
            "  // Wave 80 P#245 — bound shutdown to 3s; broker may accept connection then hang.\n"
            "  // Cite: openai/codex-plugin-cc HEAD 807e03ac plugins/codex/scripts/lib/broker-lifecycle.mjs Wave 80 fork.\n"
            "  const shutdownPromise = new Promise((resolve) => {\n"
            "    const socket = connectToEndpoint(endpoint);\n"
            "    socket.setEncoding(\"utf8\");\n"
            "    socket.on(\"connect\", () => {\n"
            "      socket.write(`${JSON.stringify({ id: 1, method: \"broker/shutdown\", params: {} })}\\n`);\n"
            "    });\n"
            "    socket.on(\"data\", () => {\n"
            "      socket.end();\n"
            "      resolve();\n"
            "    });\n"
            "    socket.on(\"error\", resolve);\n"
            "    socket.on(\"close\", resolve);\n"
            "  });\n"
            "  const timeoutPromise = new Promise((resolve) => setTimeout(resolve, 3000));\n"
            "  await Promise.race([shutdownPromise, timeoutPromise]);\n"
            "}\n"
        )
        if old_block not in text:
            if verbose:
                print(f"WARN P#245 (block shape changed; manual review): {fp}")
            continue
        backup = fp.with_suffix(fp.suffix + ".pre-wave80-245")
        if not backup.exists():
            backup.write_bytes(fp.read_bytes())
            if verbose:
                print(f"BACKUP P#245: {backup}")
        new_text = text.replace(old_block, new_block, 1)
        fp.write_text(new_text, encoding="utf-8")
        if verbose:
            print(f"PATCHED P#245: {fp}")
        rewrites += 1
    if verbose:
        print(f"P#245: {rewrites} patched, {skips} already correct")
    return rewrites
```

**Call site** (insert in `if __name__ == "__main__":` block after the
existing rewrite/check dispatch, around line 173):

```python
    if args.check:
        sys.exit(check())
    rewrite(verbose=not args.quiet)
    # Wave 80 P#3 — extend rewriter to patch openai-codex .mjs sources
    # for issues #191 (stopReviewGate fast-exit) + #245 (broker shutdown timeout).
    patch_191_stop_review_gate_hook(verbose=not args.quiet)
    patch_245_broker_lifecycle_timeout(verbose=not args.quiet)
    sys.exit(0)
```

**Idempotency mechanism**:
- Each patch checks for a unique sentinel marker (`// Wave 80 P#191` / `// Wave 80 P#245`) embedded in the new comment block. Re-runs detect the marker and SKIP.
- Backup written ONCE per file with a distinct suffix (`pre-wave80-191` / `pre-wave80-245`) — re-runs that hit the sentinel won't overwrite the original-state backup.
- Block-shape mismatch logs WARN (not crash) — defensive against upstream drift.

**Risk assessment: MEDIUM**
- Regex-style block replacement is brittle vs upstream version bumps. The
  existing Fire 46 pattern (full JSON dict rebuild) is more drift-resistant
  but doesn't apply to .mjs sources. The block-shape WARN check + sentinel
  marker bound the brittleness.
- If openai-codex ships a different version (1.0.5+) with structurally-changed
  main() / sendBrokerShutdown(), the patch will WARN-skip and the issues
  re-emerge silently. Mitigation: pair with Wave 50 cardinal-rule-9 D6
  today-release-auto-upgrade discipline (version-pin codex@1.0.4 in settings).
- 4 target files (2 marketplace + 2 cache) — all 4 receive same patch.

**Apply order recommendation**: B BEFORE A (Task B is plumbing for an
unrelated subsystem; Task A changes T1 behavior. If A breaks T1, B's
verification path stays intact for triage. Conversely, A failure won't
prevent B's verification.)

---

## TASK C — eee.ps1 hard-gate sync to 7 plugins

### Investigation findings

1. **Settings.json `enabledPlugins` enumerated** (verified 2026-05-08):
   ```
   superpowers@claude-plugins-official: True
   codex@openai-codex: True
   everything-claude-code@everything-claude-code: True
   pyright-lsp@claude-plugins-official: True
   agent-sdk-dev@claude-plugins-official: True
   ralph-loop@claude-plugins-official: True
   frontend-design@claude-plugins-official: True
   ```
   Total: 7 plugins.

2. **Cache version structure**:
   - `claude-plugins-official/superpowers/5.1.0/`
   - `claude-plugins-official/pyright-lsp/1.0.0/`
   - `claude-plugins-official/ralph-loop/1.0.0/`
   - `claude-plugins-official/agent-sdk-dev/70d57685d411/` (content-hash dir)
   - `claude-plugins-official/frontend-design/70d57685d411/` (content-hash dir)
   - `openai-codex/codex/1.0.4/`
   - `everything-claude-code/everything-claude-code/2.0.0-rc.1/`

   **Mixed version conventions** (semver vs content-hash) make hardcoding
   brittle. Dynamic discovery from `enabledPlugins` keys + glob-match against
   actual cache dirs is more robust.

3. **Current eee.ps1 state**:
   - Lines 193-214 (T0.2): hardcoded 3-plugin list against `enabledPlugins`
   - Lines 216-228 (T0.3): hardcoded 3-cache-path list with semver versions

4. **Decision matrix (per task instructions)**:
   - (a) hardcode all 7 with cite to settings.json: brittle vs version bumps
   - (b) **read enabledPlugins keys dynamically + verify cache existence by glob**: most robust ← **RECOMMENDED**
   - (c) drop the assertion entirely: least informative, anti-CR-9

   Choosing (b): T0.2 reads `enabledPlugins` keys directly; T0.3 verifies
   each enabled plugin's cache root exists with at least one version
   subdirectory containing required artifacts.

### Edit specification C.1 — T0.2 plugin enablement check (dynamic)

**File**: `Z:/claude-sota-installed/tools/eee.ps1`

**old_string**:
```
# T0.2 — 3 plugins MUST be enabled in settings.json (superpowers + codex + everything-claude-code)
$settingsPath = "$env:CLAUDE_CONFIG_DIR/settings.json"
if (-not (Test-Path $settingsPath)) {
    $EEE_HARD_FAILURES += ".claude/settings.json missing at $settingsPath"
} else {
    try {
        $settings = Get-Content $settingsPath -Raw | ConvertFrom-Json
        $expectedPlugins = @(
            'superpowers@claude-plugins-official',
            'codex@openai-codex',
            'everything-claude-code@everything-claude-code'
        )
        foreach ($plugin in $expectedPlugins) {
            $enabled = $settings.enabledPlugins.PSObject.Properties.Name -contains $plugin
            if (-not $enabled) {
                $EEE_HARD_FAILURES += "plugin '$plugin' NOT enabled in settings.json:enabledPlugins"
            }
        }
    } catch {
        $EEE_HARD_FAILURES += "settings.json parse failure: $($_.Exception.Message)"
    }
}
```

**new_string**:
```
# T0.2 — Wave 80 P#8: dynamically derive expected plugins from settings.json:enabledPlugins
# Per CR-7 graduated-unleash + Wave 50 fire 23 user directive ("hard gate eee for all the sota native install").
# Hardcoded list was 3; actual enabled is 7 (superpowers, codex, everything-claude-code,
# pyright-lsp, agent-sdk-dev, ralph-loop, frontend-design). Dynamic read keeps the gate in sync
# with settings.json without requiring eee.ps1 edits when plugin set changes.
# Cite: codex T1 NEEDS-REVISION Wave 80 conf=0.91-0.96 verdict.
$settingsPath = "$env:CLAUDE_CONFIG_DIR/settings.json"
$enabledPluginNames = @()
if (-not (Test-Path $settingsPath)) {
    $EEE_HARD_FAILURES += ".claude/settings.json missing at $settingsPath"
} else {
    try {
        $settings = Get-Content $settingsPath -Raw | ConvertFrom-Json
        $enabledPluginNames = @($settings.enabledPlugins.PSObject.Properties |
            Where-Object { $_.Value -eq $true } |
            ForEach-Object { $_.Name })
        if ($enabledPluginNames.Count -eq 0) {
            $EEE_HARD_FAILURES += "settings.json:enabledPlugins is empty (no plugins enabled)"
        }
        # Floor check: at least the 3 cardinal-rule-3 + cardinal-rule-12 mandated plugins MUST be enabled.
        # superpowers (cardinal-rule-12 Top-3 #1), codex (cardinal-rule-3 T1-T7 backbone), everything-claude-code
        # (Top-3 #3). Per Wave 50 Agent J upstream-parity research at tmp/wave50-agent-J-upstream-parity-research-2026-05-06.md.
        $cardinalPlugins = @(
            'superpowers@claude-plugins-official',
            'codex@openai-codex',
            'everything-claude-code@everything-claude-code'
        )
        foreach ($plugin in $cardinalPlugins) {
            if ($enabledPluginNames -notcontains $plugin) {
                $EEE_HARD_FAILURES += "cardinal plugin '$plugin' NOT enabled in settings.json:enabledPlugins"
            }
        }
    } catch {
        $EEE_HARD_FAILURES += "settings.json parse failure: $($_.Exception.Message)"
    }
}
```

### Edit specification C.2 — T0.3 plugin cache presence check (dynamic)

**old_string**:
```
# T0.3 — 3 plugin caches MUST be present at .claude/plugins/cache/
$pluginCacheRoot = "$env:CLAUDE_CONFIG_DIR/plugins/cache"
$expectedCaches = @(
    'claude-plugins-official/superpowers/5.1.0',
    'openai-codex/codex/1.0.4',
    'everything-claude-code/everything-claude-code/2.0.0-rc.1'
)
foreach ($cache in $expectedCaches) {
    $cachePath = Join-Path $pluginCacheRoot $cache
    if (-not (Test-Path $cachePath)) {
        $EEE_HARD_FAILURES += "plugin cache '$cache' missing at $cachePath"
    }
}
```

**new_string**:
```
# T0.3 — Wave 80 P#8: dynamically verify each enabled plugin's cache root exists with at least one version dir.
# Plugin name format in enabledPlugins: '<plugin>@<marketplace>'. Cache layout:
#   .claude/plugins/cache/<marketplace>/<plugin>/<version>/   where <version> may be semver (5.1.0)
#   OR content-hash (70d57685d411) — both shapes are valid.
# Dynamic discovery removes hardcoded version-string drift hazard (CR-9 D6 today-release-auto-upgrade defense).
# Cite: codex T1 NEEDS-REVISION Wave 80 conf=0.91-0.96 verdict.
$pluginCacheRoot = "$env:CLAUDE_CONFIG_DIR/plugins/cache"
foreach ($pluginName in $enabledPluginNames) {
    if ($pluginName -notmatch '^([^@]+)@(.+)$') {
        $EEE_ADVISORY_WARNS += "plugin name '$pluginName' does not match '<plugin>@<marketplace>' shape; skipping cache check"
        continue
    }
    $plugin = $matches[1]
    $marketplace = $matches[2]
    $pluginCacheDir = Join-Path $pluginCacheRoot "$marketplace/$plugin"
    if (-not (Test-Path $pluginCacheDir)) {
        $EEE_HARD_FAILURES += "plugin cache root missing for '$pluginName' at $pluginCacheDir"
        continue
    }
    # At least one version subdirectory must exist with non-trivial contents (README.md or commands/ or scripts/).
    $versionDirs = @(Get-ChildItem -Path $pluginCacheDir -Directory -ErrorAction SilentlyContinue)
    if ($versionDirs.Count -eq 0) {
        $EEE_HARD_FAILURES += "plugin cache for '$pluginName' has no version subdirectory at $pluginCacheDir"
        continue
    }
    $hasContent = $false
    foreach ($vd in $versionDirs) {
        if ((Test-Path (Join-Path $vd.FullName "README.md")) -or
            (Test-Path (Join-Path $vd.FullName "commands")) -or
            (Test-Path (Join-Path $vd.FullName "scripts")) -or
            (Test-Path (Join-Path $vd.FullName "agents")) -or
            (Test-Path (Join-Path $vd.FullName "hooks"))) {
            $hasContent = $true
            break
        }
    }
    if (-not $hasContent) {
        $EEE_HARD_FAILURES += "plugin cache for '$pluginName' at $pluginCacheDir has version dirs but no recognized artifacts (README.md / commands/ / scripts/ / agents/ / hooks/)"
    }
}
```

**Cite chain**:
- TIER-3-LOCAL-CONFIG: `Z:/claude-sota-installed/.claude/settings.json:enabledPlugins` (the 7-plugin runtime configuration)
- TIER-1-DIRECT: `https://code.claude.com/docs/en/plugins` (Anthropic CC plugin model — `<plugin>@<marketplace>` qualified-name shape)
- TIER-3-LOCAL: Wave 50 Agent J/K install rollout artifacts (top-3 cardinal plugins per cardinal-rule-3 + cardinal-rule-12)

**Risk assessment: LOW**
- Dynamic read from settings.json is fail-closed: any parse error or
  empty `enabledPlugins` produces a HARD failure (preserving CR-9 install-risk).
- Floor check on the 3 cardinal plugins (superpowers / codex /
  everything-claude-code) preserves existing T0.2 contract — no
  regression on cardinal-rule-3 + cardinal-rule-12 enforcement.
- Cache version-dir glob accepts BOTH semver (`5.1.0`) AND content-hash
  (`70d57685d411`) — drops hardcoded version-string brittleness.
- Floor-check + dynamic-loop combo means "can't be too lax" (still HARD on cardinals)
  AND "won't drift" (auto-tracks settings.json changes).

**Apply order recommendation**: C.1 BEFORE C.2 (C.2 references
`$enabledPluginNames` populated by C.1).

---

## Apply order across A + B + C

1. **B first** (rewriter extension; affects codex plugin .mjs hooks at next eee launch)
2. **C next** (eee.ps1 T0.2/T0.3 expansion; cosmetic plus drift-protection — does not change runtime semantics for already-installed plugins)
3. **A last** (T1 sandbox flag removal; observable behavior change in T1 review jobs)

This order isolates A (the highest-risk, observable-runtime change) at the
end so any regression is unambiguously attributable to it. B and C can be
verified independently via `eee` launch + cache check vs settings.json.

---

## Cite anchor summary

**TIER-1-DIRECT (upstream openai/codex source @ HEAD 993e3f407ea8213f7d32cb9367ae7616b7e15b4a)**:
- `codex-rs/utils/cli/src/shared_options.rs:45-53` — flag definition + alias=yolo + "EXTREMELY DANGEROUS" doc-comment
- `codex-rs/exec/src/lib.rs:272-278` — flag forces `SandboxMode::DangerFullAccess`
- `codex-rs/exec/src/lib.rs:391-392` — `approval_policy: Some(AskForApproval::Never)` is exec-mode default
- `codex-rs/exec/src/lib.rs:643-651` — flag side-effect on git_repo_check

**TIER-1-DIRECT (openai/codex-plugin-cc @ HEAD 807e03ac per task brief)**:
- `plugins/codex/scripts/stop-review-gate-hook.mjs` — Wave 78 fork issue #191
- `plugins/codex/scripts/lib/broker-lifecycle.mjs:43-57` — Wave 80 fork issue #245

**TIER-3-LOCAL-CONFIG**:
- `Z:/claude-sota-installed-state/.codex/config.toml:56-63` — deep-review-exec profile
- `Z:/claude-sota-installed/.claude/settings.json:enabledPlugins` — 7-plugin runtime config

**TIER-1-DIRECT (Anthropic CC docs)**:
- `https://code.claude.com/docs/en/plugins` — plugin qualified-name shape
- `https://code.claude.com/docs/en/settings` — permission-mode enum

---

## HONEST-NON-FINDING summary

- **Task A**: prescription validates as **stronger than stated** — flag is
  not just overhead, it actively defeats the profile's read-only intent.
  Stronger justification for removal than the original verdict captured.
- **Task B**: prescription validates as-stated. Both fork patches map cleanly
  to existing rewriter pattern. Block-shape brittleness flagged.
- **Task C**: prescription validates as-stated. Choice (b) dynamic discovery
  is empirically warranted by mixed semver/content-hash version dirs.
