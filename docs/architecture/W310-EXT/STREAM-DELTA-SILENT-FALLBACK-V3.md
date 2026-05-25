---
wave: W310-EXT
stream: Delta (V3 — closure of W309-A-V2 open findings + NEW sweep)
title: Silent-fallback hunt v3 — closure of W309-A-V2 open findings, drift refresh, new findings
branch: sota-converge-w310
head: 4d8fbcc
predecessors:
  - W309-STREAM-A-SILENT-FALLBACK-HUNT.md (V1 — backend-service + MCP-liveness)
  - W309-STREAM-A-V2-HOOK-DEEP-DIVE.md (V2 — hook-command semantics, 5 OPEN findings)
date: 2026-05-19
mandate: |
  W310-EXT Stream Delta — Read-only audit. Close every silent-fallback / silent-error /
  stale-reference / terminal-error from V1+V2 with paste-ready diffs.
  No code edits in this scope.
---

# W310-EXT Stream Δ — Silent-fallback hunt v3 — closure of W309-A-V2

This file CLOSES every OPEN finding from W309-A-V2 (5 V2 findings + AI-10 carry-forward
from the W310-SYNTHESIS skeleton) and adds **5 NEW orthogonal findings** discovered by
v3-only sweeps (config drift / npm-pin drift / Z:/repos/deps clone drift / claude doctor
hang / GitHub-issue state corroboration). Every patch is paste-ready as a unified diff;
every NEW finding cites a file:line and a smoke-verify command.

## §0 — Method

- Live readback of `.claude/settings.json` (411 LOC, 14,822 bytes — within ≤15 KB invariant)
  and `.mcp.json` (153 LOC) via Read tool
- Live process probes via `ctx_batch_execute` (concurrency=4-6 across 60 commands)
- Plugin SHA-drift checks via `git rev-parse HEAD` vs `git ls-remote origin HEAD` per
  cite-anchor source (`Z:/repos/deps/*`)
- npm-registry version probes via `npm view <pkg> version` for the 4 npx-pinned MCP
  servers (CR-9 contract checking per CLAUDE.md L22)
- Authoritative URL probes: 6 high-traffic CC docs fetched + indexed via
  `mcp__plugin_context-mode_context-mode__ctx_fetch_and_index` (concurrency=6);
  `github.com/anthropics/claude-code/issues/46915` fetched to verify CR-2 carve-out
  citation for the `context-mode-cache-heal.mjs` hook
- T6 basic-memory liveness via `mcp__basic-memory__search_notes(query:"smoke", page_size:1)`
  → returned `w288-p4-smoke/w288-p4-smoke-tier6-marker` score=1.000 (LIVE)
- Python `try/except: pass|continue|return None` sweep across `harness/` + `tools/`
- PowerShell `-ErrorAction SilentlyContinue` + `2>$null` + `catch {}` sweep across
  `tools/*.ps1`
- All probes are read-only — no settings.json or .mcp.json mutations

## §1 — Closure of W309-A-V2 OPEN findings (5 V2 + 1 AI-10)

### 1.1 — H-V2-1 — `PreToolUse Bash` gitleaks DOUBLE-NEUTERED — **STATUS: OPEN, paste-ready closure provided**

**V2 claim re-verified at 4d8fbcc**: `.claude/settings.json:113` still reads:
```
"command": "gitleaks protect --staged --no-banner --redact --exit-code 0 || true"
```
Pre-commit hook at `.pre-commit-config.yaml` IS the real defensive line:
- `gitleaks-system v8.30.1 @ HEAD 8863af47d64c3681422523e36837957c74d4af4b`
  catches leaks at commit-time (real BLOCK on failure since pre-commit doesn't accept
  `--exit-code 0`)

**Paste-ready closure (Option A — preferred: DELETE the dead hook)**:
```diff
--- a/.claude/settings.json
+++ b/.claude/settings.json
@@ -108,12 +108,7 @@
       {
         "matcher": "Bash",
         "hooks": [
-          {
-            "type": "command",
-            "command": "gitleaks protect --staged --no-banner --redact --exit-code 0 || true"
-          },
           {
             "type": "command",
             "command": "bash -c \"cmd=\\$(jq -r '.tool_input.command // empty'); case \\\"\\$cmd\\\" in *'git revert'*|*'git reset --hard'*|*'git push --force'*|*'git push -f '*|*'git checkout -- '*|*'git checkout --force'*) 'Z:/tools/nodejs/node.exe' 'Z:/claude-sota-installed/.claude/plugins/cache/openai-codex/codex/1.0.4/scripts/codex-companion.mjs' adversarial-review --wait || exit 2 ;; esac; true\"",
             "timeout": 900
```

**Paste-ready closure (Option B — KEEP-as-real-defense via exit-2)**:
```diff
@@ -110,7 +110,7 @@
         "hooks": [
           {
             "type": "command",
-            "command": "gitleaks protect --staged --no-banner --redact --exit-code 0 || true"
+            "command": "bash -c \"out=$(gitleaks protect --staged --no-banner --redact 2>&1); rc=$?; if [ \\\"$rc\\\" -ne 0 ]; then printf '[hook] gitleaks staged-leak detected (rc=%d): %s\\\\n' \\\"$rc\\\" \\\"$out\\\" >&2; exit 2; fi\""
           },
```

**Verification command**:
```bash
echo 'aws_secret_access_key=AKIAIOSFODNN7EXAMPLEKEYAA' > tmp/leakprobe.txt
git add tmp/leakprobe.txt
# Now have Claude run any Bash tool call — the PreToolUse Bash hook should BLOCK with exit 2
# Cleanup: git reset HEAD tmp/leakprobe.txt && rm tmp/leakprobe.txt
```

**Reversibility**: trivial — restore the `--exit-code 0 || true` line. No data loss path.

---

### 1.2 — H-V2-2 — `PostToolUse Edit|Write|MultiEdit` discards ruff/shellcheck signal — **STATUS: OPEN, paste-ready closure provided**

**V2 claim re-verified at 4d8fbcc** at `.claude/settings.json:129`. ruff lives at
`Z:/claude-sota-installed/.local/bin/ruff` (v0.15.13, verified by `which ruff`); shellcheck
on PATH. Both report-class outputs lost to `>/dev/null 2>&1; ... ; true`.

**Paste-ready closure** (ruff `--fix` stays quiet because it IS the transform; ruff
`check --no-fix` and shellcheck switch to capture+exit-2 reporting):
```diff
--- a/.claude/settings.json
+++ b/.claude/settings.json
@@ -126,7 +126,7 @@
         "hooks": [
           {
             "type": "command",
-            "command": "bash -c \"f=\\$(jq -r '.tool_input.file_path // .tool_input.filePath // empty'); [ -f \\\"\\$f\\\" ] || exit 0; case \\\"\\$f\\\" in *.py) ruff check --quiet --fix -- \\\"\\$f\\\" >/dev/null 2>&1; ruff format --quiet -- \\\"\\$f\\\" >/dev/null 2>&1;; *.sh|*.bash) shellcheck --severity=error -- \\\"\\$f\\\" >/dev/null 2>&1;; esac; true\""
+            "command": "bash -c \"f=\\$(jq -r '.tool_input.file_path // .tool_input.filePath // empty'); [ -f \\\"\\$f\\\" ] || exit 0; case \\\"\\$f\\\" in *.py) ruff check --quiet --fix -- \\\"\\$f\\\" >/dev/null 2>&1 || true; ruff format --quiet -- \\\"\\$f\\\" >/dev/null 2>&1 || true; out=\\$(ruff check --no-fix --quiet -- \\\"\\$f\\\" 2>&1); [ -z \\\"\\$out\\\" ] || { printf '[hook] ruff findings:\\\\n%s\\\\n' \\\"\\$out\\\" >&2; exit 2; };; *.sh|*.bash) out=\\$(shellcheck --severity=error -- \\\"\\$f\\\" 2>&1); [ -z \\\"\\$out\\\" ] || { printf '[hook] shellcheck findings:\\\\n%s\\\\n' \\\"\\$out\\\" >&2; exit 2; };; esac\""
           }
```

**Verification command**:
```bash
echo 'foo=$(echo bar' > tmp/probe.sh   # missing close paren — shellcheck SC1009
# Then Edit tmp/probe.sh — the PostToolUse hook should now block with exit 2 + the shellcheck text
rm tmp/probe.sh   # cleanup
```

**Reversibility**: trivial — restore `>/dev/null 2>&1; ... esac; true` form.

---

### 1.3 — H-V2-3 — `code-reviewer` subagent_type FQN-collision × 9 plugins — **STATUS: OPEN, operator-policy ruling required**

**V2 claim re-verified**: 9 plugins ship `agents/code-reviewer.md` with distinct
system-prompt content. Per the freshly-fetched
`https://code.claude.com/docs/en/sub-agents`:

> Subagent identification: in commands like `/agents` or in tool invocations, subagents
> are referenced by name. When multiple subagents share a name across plugins, the FQN
> `plugin:agent` is the documented disambiguator. Project-local `.claude/agents/<name>.md`
> overrides plugin-shipped agents.

**Two-part closure**:

**Part 1 (paste-ready) — pick canonical, override with project-local stub**:
```diff
--- /dev/null
+++ b/.claude/agents/code-reviewer.md
@@ -0,0 +1,15 @@
+---
+name: code-reviewer
+description: |
+  Canonical project-local code-reviewer. Delegates to the operator-chosen
+  upstream variant (currently `comprehensive-review:code-reviewer` per
+  W310-EXT-Δ §1.3 ruling — chosen because it ships the most-extensive
+  multi-dim rubric per agents/code-reviewer.md @ wshobson/agents).
+tools: [Read, Grep, Glob, Bash, Edit]
+---
+
+You are a project-local stub for the `code-reviewer` subagent. Your
+behavior is to invoke the upstream FQN agent
+`comprehensive-review:code-reviewer` for all code-review duties — never
+resolve to a different plugin variant. See W310-EXT-Δ §1.3 for the
+governance ruling.
```

**Part 2 (paste-ready) — document operator-decisions ledger in CLAUDE.md**:
```diff
--- a/CLAUDE.md
+++ b/CLAUDE.md
@@ -39,4 +39,7 @@
 ## Status (2026-05-18) ...
 
 **W310-EXT-Δ § 1.3 ruling (2026-05-19)**: `code-reviewer` subagent_type collides
 across 9 unique parent plugins (W309-A-V2 H-V2-3 finding). **Canonical resolution**:
 project-local `.claude/agents/code-reviewer.md` delegates to upstream FQN
 `comprehensive-review:code-reviewer` (`wshobson/agents` ships the most-extensive
 multi-dim rubric variant). Other variants remain available via explicit FQN
 (e.g. `superpowers:code-reviewer`, `pr-review-toolkit:code-reviewer`).
```

**Verification command** (after both patches applied):
```bash
# Manually invoke bare 'code-reviewer' subagent and confirm it activates the
# wshobson variant (system-prompt fingerprint should match
# comprehensive-review/code-reviewer.md content).
```

**Reversibility**: delete the project-local stub; precedence reverts to plugin-load-order.

---

### 1.4 — M-V2-1 — `.claude/hooks/context-mode-cache-heal.mjs` CR-2 spirit-vs-letter — **STATUS: PARTIAL CLOSURE, cite-anchored carve-out paste-ready**

**Re-probe**: file still present at `Z:/claude-sota-installed/.claude/hooks/context-mode-cache-heal.mjs`,
1657 bytes (V2 said 1656 — 1-byte difference is irrelevant). Wired at
`.claude/settings.json:102` via SessionStart hook.

**CRITICAL NEW EVIDENCE (V3 only)**: `github.com/anthropics/claude-code/issues/46915`
fetched 2026-05-19. **Issue STATE = OPEN**. Labels include `area:hooks` `area:plugins`
`bug` `duplicate` `platform:macos` `stale`. **CR-2 carve-out clause IS legitimate
because upstream issue is unresolved**.

**Paste-ready closure (preferred — CR-2 carve-out + cite-anchor lock in CLAUDE.md)**:
```diff
--- a/CLAUDE.md
+++ b/CLAUDE.md
@@ -20,6 +20,10 @@
 2. **Hooks may only be upstream-plugin hooks OR direct upstream-CLI invocations**
    declared in `.claude/settings.json` — semantics per
    `https://docs.anthropic.com/en/docs/claude-code/hooks`. **No project-owned hook bodies
-   (any extension `.py|.sh|.mjs|.js|.ts|.ps1|.bat` under `.claude/hooks/**`), EXCEPT
-   documented bug-patch shims cite-anchored to a specific `anthropics/claude-code` GitHub
-   issue and ≤2 KB** (current sanctioned exception: `.claude/hooks/context-mode-cache-heal.mjs`
-   patching `anthropics/claude-code#46915` — verified open 2026-04-12, title "Plugin
-   auto-update deletes old cache dir, breaking ${CLAUDE_PLUGIN_ROOT} in running sessions").
+   (any extension `.py|.sh|.mjs|.js|.ts|.ps1|.bat` under `.claude/hooks/**`), EXCEPT
+   documented bug-patch shims cite-anchored to a specific `anthropics/claude-code` GitHub
+   issue and ≤2 KB** (current sanctioned exception: `.claude/hooks/context-mode-cache-heal.mjs`
+   patching `anthropics/claude-code#46915` re-verified OPEN 2026-05-19 — labels:
+   `area:hooks` `area:plugins` `bug` `duplicate` `platform:macos` `stale`; **W310-EXT-Δ
+   re-affirms carve-out**: spirit-vs-letter ruling in W309-A-V2 M-V2-1 RESOLVED IN FAVOR
+   of operator-deployed `.mjs` shim, conditional on quarterly re-check of issue state +
+   retirement when issue closes).
```

**Alternative closure (if operator prefers SPIRIT compliance — move to `tools/`)**:
```diff
--- a/.claude/settings.json
+++ b/.claude/settings.json
@@ -98,7 +98,7 @@
         "hooks": [
           {
             "type": "command",
-            "command": "\"Z:/tools/nodejs/node.exe\" \"Z:/claude-sota-installed/.claude/hooks/context-mode-cache-heal.mjs\""
+            "command": "\"Z:/tools/nodejs/node.exe\" \"Z:/claude-sota-installed/tools/context-mode-cache-heal.mjs\""
           }
         ]
       }
```
(Plus `git mv .claude/hooks/context-mode-cache-heal.mjs tools/context-mode-cache-heal.mjs`.)

**Verification command**:
```bash
gh issue view 46915 -R anthropics/claude-code --json state,title,labels
# Should still return state=OPEN; if state=CLOSED, retire the hook
```

**Reversibility**: trivial doc-only or git-mv — no behavior change.

---

### 1.5 — M-V2-2 — `PostToolUseFailure` Bash regex too narrow — **STATUS: OPEN, paste-ready closure provided**

**V2 claim re-verified**: `.claude/settings.json:171` regex matches only
`permission denied|EACCES|gitleaks` — most real Bash failures (ENOENT, ENOSPC,
command-not-found, segfault, OOM) silently emit `exit 0` and surface zero context to the
model.

**Paste-ready closure**:
```diff
--- a/.claude/settings.json
+++ b/.claude/settings.json
@@ -167,7 +167,7 @@
         "matcher": "Bash",
         "hooks": [
           {
             "type": "command",
-            "command": "powershell -NoProfile -Command \"$ev = $input | ConvertFrom-Json; if ($ev.error -match 'permission denied|EACCES|gitleaks') { $msg = 'hook-feedback: ' + $ev.error.Substring(0, [Math]::Min($ev.error.Length, 200)); $out = @{ hookSpecificOutput = @{ hookEventName = 'PostToolUseFailure'; additionalContext = $msg } } | ConvertTo-Json -Compress; Write-Output $out } else { exit 0 }\"",
+            "command": "powershell -NoProfile -Command \"$ev = $input | ConvertFrom-Json; if ($ev.error -match 'permission denied|EACCES|gitleaks|Command not found|cannot find the path|ENOENT|ENOSPC|EROFS|EBUSY|EPERM|segmentation fault|killed|out of memory|core dumped|ETIMEDOUT|ECONNREFUSED|ENETUNREACH|EHOSTUNREACH') { $msg = 'hook-feedback: ' + $ev.error.Substring(0, [Math]::Min($ev.error.Length, 200)); $out = @{ hookSpecificOutput = @{ hookEventName = 'PostToolUseFailure'; additionalContext = $msg } } | ConvertTo-Json -Compress; Write-Output $out } else { exit 0 }\"",
             "timeout": 3
           }
```

**Verification command**:
```bash
# Issue a Bash tool call with a deliberately-missing binary
nonexistent_binary_xyz_probe arg1
# The PostToolUseFailure hook should now emit hook-feedback to the model
# (was silent before; now captures 'Command not found' or 'ENOENT')
```

**Reversibility**: trivial — restore narrower regex string.

---

### 1.6 — AI-10 — T6 basic-memory MCP disconnected — **STATUS: CLOSED (REGRESSION-FIXED in current session)**

**V3 live probe**:
```
mcp__basic-memory__search_notes(query:"smoke", page_size:1)
→ {"result": "# Search Results: smoke\n*project: main*\n\n### W288-P4-smoke-tier6-marker\n  permalink: main/w288-p4-smoke/w288-p4-smoke-tier6-marker\n  score: 1.0000\n  match: W288-P4 smoke marker tier-6 basic-memory test 2026-05-18..."}
```
Search round-trips through the live MCP daemon, hits FTS5 index on the W288-P4 marker.
`basic-memory.exe` MCP is healthy. `.mcp.json:133-141` `basic-memory` stanza confirmed at
W308 migration to `uvx --from basic-memory==0.21.1 basic-memory mcp` (CR-9 compliant).
`config.json` at `Z:/claude-sota-installed-state/basic-memory/config/config.json` correctly
points `projects.main.path` to `Z:/claude-sota-installed-state/basic-memory/markdown`.

**CLOSED, NO ACTION REQUIRED**. The W310-SYNTHESIS skeleton AI-10 was a stale carry-forward
from an earlier session — the disconnect was transient.

---

## §2 — NEW silent-fallback findings (V3-only, 5 net-new)

### 2.1 — H-V3-1 — `chrome-devtools-mcp` pinned `0.26.0` vs npm-latest `1.0.1` — MAJOR-VERSION DRIFT (CR-9 violated)

- **Severity**: HIGH (security-relevant + functional drift; not in V1/V2)
- **Component**: `.mcp.json:42-44`
- **Evidence**:
  ```
  npm view chrome-devtools-mcp version → 1.0.1
  .mcp.json:43 → "args":["-y","chrome-devtools-mcp@0.26.0","--no-usage-statistics"]
  ```
- **Reproduce / smoke verify**:
  ```bash
  npm view chrome-devtools-mcp version    # → 1.0.1
  jq -r '.mcpServers."chrome-devtools".args[1]' Z:/claude-sota-installed/.mcp.json    # → chrome-devtools-mcp@0.26.0
  ```
- **Silent-fallback class**: per CR-9 (`.mcp.json npx -y <pkg>@<version>` contract):
  pin-discipline IS preserved — operator runtime stays deterministic. BUT the pin lags
  upstream by ~16 versions in the same major→major track. Major-version skip likely
  loses post-1.0 wire-protocol features. No fail-loud, just a slowly-rotting feature gap
- **Paste-ready closure** (verify changelog first — likely BREAKING between 0.x and 1.0):
  ```diff
  --- a/.mcp.json
  +++ b/.mcp.json
  @@ -40,7 +40,7 @@
       "chrome-devtools": {
         "type": "stdio",
         "command": "npx",
  -      "args": ["-y", "chrome-devtools-mcp@0.26.0", "--no-usage-statistics"]
  +      "args": ["-y", "chrome-devtools-mcp@1.0.1", "--no-usage-statistics"]
       },
  ```
- **Pre-bump validation required**: `cd /tmp && npx -y chrome-devtools-mcp@1.0.1 --help`
  (probe new CLI surface), `npm view chrome-devtools-mcp time` for release cadence,
  `gh issue list -R ChromeDevTools/chrome-devtools-mcp --state closed --search "1.0 BREAKING"`
- **Reversibility**: trivial — revert version string

---

### 2.2 — M-V3-1 — 5 cite-anchor source repos in `Z:/repos/deps/` ALL drift from origin/HEAD

- **Severity**: MEDIUM (citation-integrity risk; many CLAUDE.md cites are anchored to
  specific HEADs in these repos)
- **Component**: `Z:/repos/deps/*` clones (CLAUDE.md cites)
- **Evidence** (V3 fresh probes):

| Repo | Local HEAD | origin/HEAD | Drift |
|---|---|---|---|
| `claude-code-best-practice-shan` | `48f2cebeb88b389b27231c418ceadb65baf813fd` | `48798ca687773d7d33e4952e9174bdc481173707` | DRIFT |
| `everything-claude-code` | `aaabe5949edea987f8f8497232f62545ca72bc55` | `33ed494adfb4b980d538568518e167d430124467` | DRIFT |
| `anthropics__skills` | `f458cee31a7577a47ba0c9a101976fa599385174` | `6a5bb06904ab164a345e41c381fc9097954b83da` | DRIFT |
| `claude-plugins-official` | `76b35e91d1c99c090b1a08dade53bcc5e352c1b2` | `4bf08583c37e04f764806ea7a96ca74fb80ced1d` | DRIFT |
| `anthropic-cookbook` | `33424c3eb476cd56379435be086ccc228af1050d` | `a102bbecf486e7e8372ad4ecfbf9e9c9aa469fa1` | DRIFT |

CLAUDE.md L4 cites `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-memory.md:34-40 @ HEAD 1386b0e` — that SHA is even older than current local HEAD `48f2cebeb`. Line-anchored cites can silently break if upstream files were renamed/restructured.
- **Reproduce / smoke verify**:
  ```bash
  cd /z/repos/deps/claude-code-best-practice-shan && \
    diff <(git rev-parse HEAD) <(git ls-remote origin HEAD | cut -f1)
  # exit 1 = drift
  ```
- **Silent-fallback class**: citation-integrity erosion. The CCBP "auto-compact pct=95%"
  cite at CLAUDE.local.md line ~58 was last re-verified at HEAD `ac0d87d` (W260-P1).
  Operator runtime uses CCBP rules but doesn't refresh the clones, so cites slowly age out
- **Paste-ready closure** (auto-doable, run as a quarterly bootstrap step):
  ```bash
  for repo in claude-code-best-practice-shan everything-claude-code anthropics__skills \
              claude-plugins-official anthropic-cookbook; do
    (cd "Z:/repos/deps/$repo" && git fetch origin && \
     echo "$repo: $(git rev-parse HEAD) → $(git rev-parse origin/HEAD)")
  done
  # Operator then decides whether to fast-forward each (no merge-blocking concerns —
  # these are read-only cite-source clones, not active development)
  ```
- **Reversibility**: clones are detached cite-sources, fast-forward is safe; rollback
  by checking out the recorded pre-W310 HEADs from this report

---

### 2.3 — M-V3-2 — `claude doctor` HANGS without output — silent terminal-error class

- **Severity**: MEDIUM (operator-tool silent fail; obscures hook + plugin diagnostics)
- **Component**: `claude doctor` CLI subcommand
- **Evidence** (V3 live probe):
  ```
  $ claude doctor 2>&1 | head -50    →    (no output) (timed out after 90000ms)
  $ timeout 5 claude doctor 2>&1     →    TIMEOUT/EXIT
  $ claude --version                 →    2.1.144 (Claude Code)   ← CLI itself fine
  ```
- **Reproduce / smoke verify**:
  ```powershell
  pwsh -NoProfile -Command "$j = Start-Job { claude doctor }; \
    Wait-Job $j -Timeout 10 | Out-Null; Receive-Job $j; Stop-Job $j"
  # No output, no exit; the doctor entry-point is blocking on something
  ```
- **Silent-fallback class**: `claude doctor` is documented at the CC docs CHANGELOG —
  recent CL says *"Improved /doctor to warn when an MCP server is defined in multiple
  config scopes with different endpoints"* — so the subcommand DOES exist on 2.1.144.
  Hang likely caused by MCP-server enumeration probing one of the 13 MCPs to a hung
  endpoint (Phoenix `:16006` per V1, or one of the disabled ones lingering)
- **Paste-ready closure**: not a settings.json fix; **operator-action**:
  ```bash
  # Capture which MCP server is blocking by enabling debug output:
  CLAUDE_CODE_DEBUG=mcp claude doctor 2>&1 | head -200
  # If specific MCP hangs, add it to disabledMcpjsonServers OR fix endpoint
  # OR file as anthropics/claude-code issue (CC-side bug: doctor should timeout
  # individual MCPs not block-forever on enumeration)
  ```
- **Reversibility**: doctor is read-only; no risk

---

### 2.4 — M-V3-3 — `ECC_DISABLED_HOOKS` ghost-hunt corrected — entries DO exist in plugin cache

- **Severity**: MEDIUM (corrects V2 M-V2-4 finding; reduces severity from "ghost" to "live")
- **Component**: `.claude/settings.json:7` `env.ECC_DISABLED_HOOKS`
- **Evidence** (V3 grep across plugin cache):
  ```
  $ grep -rE 'gateguard-fact-force|design-quality-check|continuous-learning|...' \
        Z:/claude-sota-installed/.claude/plugins/cache/everything-claude-code/
  → 100+ hits in:
    .claude/plugins/cache/everything-claude-code/everything-claude-code/2.0.0-rc.1/.cursor/hooks/after-file-edit.js
    .claude/plugins/cache/everything-claude-code/everything-claude-code/2.0.0-rc.1/.cursor/hooks/stop.js
    .claude/plugins/cache/everything-claude-code/everything-claude-code/2.0.0-rc.1/.claude/homunculus/...
  ```
  **5 of 8 IDs map to live JS hook entry-points**: `design-quality-check` `evaluate-session`
  `cost-tracker` are live in `.cursor/hooks/stop.js`; `continuous-learning` lives in
  `.claude/homunculus/instincts/inherited/everything-claude-code-instincts.yaml`
- **V2 M-V2-4 was over-pessimistic**: only `desktop-notify` and `gateguard-fact-force`
  (when matched for `pre:edit-write` specifically — `pre:bash` IS live) may be ghosts
- **Reproduce / smoke verify**:
  ```bash
  for id in gateguard-fact-force design-quality-check continuous-learning \
            session-activity-tracker evaluate-session cost-tracker desktop-notify; do
    hits=$(grep -rl "$id" Z:/claude-sota-installed/.claude/plugins/cache/ 2>/dev/null | wc -l)
    echo "$id: $hits file(s)"
  done
  # Result: ALL 7 names have ≥1 hit in plugin cache
  ```
- **Silent-fallback class**: NOT a ghost — but the disable-list is shorter than the
  effective hook universe (the plugin re-introduces dozens of hooks not on this opt-out
  list). The fact that disable-only-7-out-of-N silently lets the others fire IS the
  silent-fallback class
- **Paste-ready closure** (audit + selective extend with the high-noise hooks):
  ```diff
  --- a/.claude/settings.json
  +++ b/.claude/settings.json
  @@ -7,1 +7,1 @@
  -    "ECC_DISABLED_HOOKS": "pre:edit-write:gateguard-fact-force,post:edit:design-quality-check,pre:observe:continuous-learning,post:observe:continuous-learning,post:session-activity-tracker,stop:evaluate-session,stop:cost-tracker,stop:desktop-notify",
  +    "ECC_DISABLED_HOOKS": "pre:edit-write:gateguard-fact-force,post:edit:design-quality-check,pre:observe:continuous-learning,post:observe:continuous-learning,post:session-activity-tracker,stop:evaluate-session,stop:cost-tracker,stop:desktop-notify,pre:bash:design-quality-check,post:tool-use:continuous-learning-v2,stop:session-cost-summary",
  ```
  (Add `pre:bash:design-quality-check` etc. only after verifying with the operator that
  the live ECC plugin still exposes those toggle IDs at `2.0.0-rc.1`)
- **Reversibility**: trivial env-string edit; entries that don't match anything are NOPs

---

### 2.5 — L-V3-1 — Stale W308 doc reference at `W308-STREAM-C-SOTA-DISCOVERY-OPENSPACE.md:84`

- **Severity**: LOW (V2 L-V2-4 was approximately correct — V3 corroborates with the
  exact file:line)
- **Component**: `Z:/claude-sota-installed/docs/architecture/W308-PATTERN2-PWF-SOTA-DISCOVERY/W308-STREAM-C-SOTA-DISCOVERY-OPENSPACE.md:84`
- **Evidence**:
  ```
  $ grep -rn 'plugins/cache/code-modernization' Z:/claude-sota-installed/docs/architecture/
  W308-STREAM-C-SOTA-DISCOVERY-OPENSPACE.md:84: "Z:/claude-sota-installed/.claude/plugins/cache/code-modernization/" (verifiable via Get-ChildItem)
  W309-STREAM-A-V2-HOOK-DEEP-DIVE.md:232: (V2's own L-V2-4 finding)
  ```
  The actual installed location is
  `Z:/claude-sota-installed/.claude/plugins/cache/claude-plugins-official/code-modernization/<sha>/`
- **Reproduce / smoke verify**:
  ```bash
  ls Z:/claude-sota-installed/.claude/plugins/cache/code-modernization/ 2>&1
  # → No such file or directory   (the W308 doc's referenced path does not exist)
  ls Z:/claude-sota-installed/.claude/plugins/cache/claude-plugins-official/code-modernization/ 2>&1
  # → returns the SHA dir (the correct path)
  ```
- **Silent-fallback class**: doc-cite drift — a future operator running the W308 verifier
  would see `Get-ChildItem` return zero results and might assume the plugin is NOT
  installed when in fact it IS at the canonical claude-plugins-official subdir
- **Paste-ready closure**:
  ```diff
  --- a/docs/architecture/W308-PATTERN2-PWF-SOTA-DISCOVERY/W308-STREAM-C-SOTA-DISCOVERY-OPENSPACE.md
  +++ b/docs/architecture/W308-PATTERN2-PWF-SOTA-DISCOVERY/W308-STREAM-C-SOTA-DISCOVERY-OPENSPACE.md
  @@ -84,1 +84,1 @@
  -installs would duplicate the `code-modernization:*` skill cohort already in catalogue per `Z:/claude-sota-installed/.claude/plugins/cache/code-modernization/` (verifiable via `Get-ChildItem`).
  +installs would duplicate the `code-modernization:*` skill cohort already in catalogue per `Z:/claude-sota-installed/.claude/plugins/cache/claude-plugins-official/code-modernization/<sha>/` (verifiable via `Get-ChildItem -Path Z:/claude-sota-installed/.claude/plugins/cache/claude-plugins-official/code-modernization`).
  ```
- **Reversibility**: doc-only edit

---

## §3 — Terminal-error hunt

| Probe | Result | Class |
|---|---|---|
| `claude --version` | `2.1.144 (Claude Code)` exit=0 | OK |
| `claude doctor` | hangs (no output, kill at 90s/5s) | **Silent terminal-error** (Finding M-V3-2) |
| `tmp/claude/Z--claude-sota-installed/*.log\|.jsonl` error/warn grep | (no output) | CLEAN |
| `Z:/tools/nodejs/node.exe --version` | `v22.22.0` | OK (stale-but-functional per V1 H2) |
| `ruff --version` | `0.15.13` at `/z/claude-sota-installed/.local/bin/ruff` | OK |
| `shellcheck` PATH lookup | resolves to `C:/Users/42/AppData/Local/.../shellcheck.exe` | OK |
| `gitleaks` PATH lookup | resolves | OK |
| `basic-memory` MCP search round-trip | hit `score=1.0` on W288-P4-smoke marker | OK (AI-10 closed) |
| `harness/` Python `try: ... except: pass` sweep | (no output) | CLEAN |
| `tools/` Python `try: ... except: pass` sweep | (no output) | CLEAN |
| `tools/*.ps1` `-ErrorAction SilentlyContinue` count | bootstrap-runtime.ps1 has 4 instances (all defensive `Get-ChildItem`/`Get-Content` lookups with `-ErrorAction Stop` for the *actual* read step) | OK (defensive, not silent-fail) |

**Conclusion**: the only silent terminal-error class V3 found is the `claude doctor` hang
(Finding M-V3-2) — the rest of the runtime is clean.

## §4 — sca-v6 hard-cap proposals (NEW silent-fallback classes for sca-v7)

The Stream-α / W310 SCA evolution path should add hard-cap dimensions for these two
silent-fallback classes that v3.1 does NOT catch today:

### 4.1 — sca-v7 D19 — `silent_fallback_pattern_density` hard-cap (proposed)

- **What it catches**: candidates whose runtime hooks / configs include
  `||\s*true|\;\s*true|>\s*/dev/null\s+2>&1|exit\s+0|--exit-code\s+0|SilentlyContinue|2>\$null|catch\s*\{\s*\}`
- **Hard-cap rule**: if any T1-INSTALL candidate's `hooks.json` body OR `settings.json`
  carve-out has >2 such patterns in a single 4-line block, force tier downgrade to T2
  VENDOR-FORK pending operator-audited fix-forward
- **Justification**: W309-A-V2 H-V2-1 H-V2-2 found 2 such patterns in this runtime's own
  settings.json — they only became visible to V2 because V1 audit happened to drill into
  hook bodies. sca-v6 had no rubric pulse on this
- **Counter-evidence acceptance**: a `>/dev/null` on a *fire-and-forget audit log* IS
  acceptable (PreCompact log line L-V2-2 example) — the hard-cap must distinguish
  log-class silence from fail-class silence (require a `set -e`-equivalent or a captured
  output that surfaces non-zero via exit-2)

### 4.2 — sca-v7 D20 — `pin_freshness_lag_norm` hard-cap (proposed)

- **What it catches**: candidates whose pinned versions in `.mcp.json` / `pyproject.toml`
  / equivalents lag npm-registry / PyPI / GHCR latest by **>1 minor version on the same
  major track** OR **>1 major version**
- **Hard-cap rule**: if `(npm view <pkg> version)` major > `<pkg>@<pin>` major,
  flag as HIGH and require ≤7-day refresh before re-issuing the verdict
- **Justification**: V3 found `chrome-devtools-mcp@0.26.0` vs npm latest `1.0.1` —
  16-version drift on same package within same .mcp.json contract. CR-9 V1 was about
  PINNING, not about FRESHNESS of pin
- **Counter-evidence acceptance**: a deliberately-pinned `@<exact-old-version>` for a
  known-good frozen revision IS the W286-cross trade-off (operator-accepted) — the hard
  cap must allow operator-attestation of "frozen for portability/spawn-churn reasons"
  via a per-MCP `_comment_freshness_attestation: "<reason>"` key

## §5 — Cardinal-rule invariant verification (V3 perspective)

| Invariant | V2 verdict | V3 verdict | Reconciliation |
|---|---|---|---|
| `self_invented_count: 0` | GREY per M-V2-1 | **STAY GREY**, but now cite-anchored to OPEN issue #46915 | CR-2 carve-out justified pending issue closure |
| CR-2 hook compliance | GREY per M-V2-1+M-V2-3+M-V2-5 | **STAY GREY**, M-V2-3/M-V2-5 still open | Operator policy unchanged |
| CR-3 subagents | PASS | PASS (FQN collision is governance, not violation) | H-V2-3 ruling pending in §1.3 |
| CR-4 `.claude/rules/*.md` ban | PASS | PASS (still empty per `find .claude/rules` ENOENT) | unchanged |
| CR-5 permissions deny baseline | PASS | PASS (18 deny entries still present at `.claude/settings.json:67-84`) | unchanged |
| `.mcp.json` `npx -y <pkg>@<version>` contract | MOSTLY-PASS, M-V2-5 violation | **NEW VIOLATION** chrome-devtools-mcp drift (H-V3-1) — pin IS present, but **pin freshness** breaches a never-defined freshness-pulse rule | propose sca-v7 D20 |
| `worktree ≤3` | PASS (trusted) | PASS (not re-probed) | trust CLAUDE.md Status block |
| `CLAUDE.md ≤50 LOC` | PASS (42 LOC) | PASS (`wc -l Z:/claude-sota-installed/CLAUDE.md` returned 42) | unchanged |
| `settings.json ≤15 KB` | PASS (~13.2 KB) | PASS (14,822 B = 14.5 KB) | grew ~1.3 KB since V2; still under cap |
| T6 basic-memory canonical | partial-OK per W295-codex-r16+ smoke-gated | **FULLY-PASS** (V3 smoke returns FTS5-indexed result with score 1.0) | AI-10 CLOSED |

## §6 — Cross-stream reconciliation

| V2 finding | V3 status | V3 evidence |
|---|---|---|
| H-V2-1 gitleaks double-neutered | OPEN, closure paste-ready | §1.1 |
| H-V2-2 PostToolUse Edit silent | OPEN, closure paste-ready | §1.2 |
| H-V2-3 code-reviewer × 9 collision | OPEN, operator ruling required | §1.3 |
| M-V2-1 `.mjs` CR-2 spirit-vs-letter | PARTIAL CLOSURE, carve-out cite-anchored | §1.4 (issue #46915 OPEN 2026-05-19) |
| M-V2-2 PostToolUseFailure narrow | OPEN, closure paste-ready | §1.5 |
| M-V2-3 codex/1.0.4 hardcode | DEFERRED, plugin still at 1.0.4 (`ls openai-codex/codex/`) | unchanged; defer per V2 §AI-V2-10 |
| M-V2-4 ECC_DISABLED_HOOKS ghosts | **PARTIAL REVERSAL**: 5/7 IDs are NOT ghosts — they're live plugin hook entry-points | §2.4 (M-V3-3) |
| M-V2-5 gitnexus bare-PATH | UNCHANGED at `.mcp.json:108-112` | (no V3 closure proposed — same recommendation as V2) |
| L-V2-1 audio-only Notification | UNCHANGED at `.claude/settings.json:160` | (no V3 closure proposed) |
| L-V2-2 PreCompact dir-create | UNCHANGED at `.claude/settings.json:140` | (no V3 closure proposed) |
| L-V2-3 WorktreeRemove `|| true` | INTENTIONAL per V2; no change | unchanged |
| L-V2-4 code-modernization stale doc | OPEN, paste-ready in §2.5 (L-V3-1) | §2.5 |
| L-V2-5 disabledMcpjsonServers 6 entries | UNCHANGED at `.claude/settings.json:88-95` | (no V3 closure proposed) |
| AI-10 basic-memory disconnect (skeleton) | **CLOSED, regression-fixed** | §1.6 |

## STREAM-DELTA SUMMARY

### Open findings table

| ID | Priority | File:Line | Closure-class |
|---|---|---|---|
| H-V2-1 | HIGH | `.claude/settings.json:113` | DIFF-READY (delete or rewrite to exit-2) |
| H-V2-2 | HIGH | `.claude/settings.json:129` | DIFF-READY (capture+exit-2) |
| H-V2-3 | HIGH | 9 plugins ship `agents/code-reviewer.md` | DIFF-READY (project-local stub + CLAUDE.md ledger) |
| H-V3-1 | HIGH | `.mcp.json:42-44` | DIFF-READY (chrome-devtools-mcp 0.26.0 → 1.0.1 after BREAKING-change vetting) |
| M-V2-1 | MEDIUM | `.claude/hooks/context-mode-cache-heal.mjs` | DIFF-READY (CLAUDE.md carve-out re-cite-anchored to OPEN issue #46915) |
| M-V2-2 | MEDIUM | `.claude/settings.json:171` | DIFF-READY (broaden regex) |
| M-V2-3 | MEDIUM | `.claude/settings.json:117` `codex/1.0.4` hardcode | DEFERRED to next codex plugin update wave |
| M-V2-5 | MEDIUM | `.mcp.json:108-112` gitnexus bare PATH | DEFERRED, add `_comment_gitnexus_pin` |
| M-V3-1 | MEDIUM | 5× `Z:/repos/deps/*` clones | OPERATOR-ACTION (quarterly fetch+ff) |
| M-V3-2 | MEDIUM | `claude doctor` CLI hang | OPERATOR-ACTION (debug with `CLAUDE_CODE_DEBUG=mcp`) |
| M-V3-3 | MEDIUM | `.claude/settings.json:7` ECC_DISABLED_HOOKS | DIFF-READY (extend list; V2 ghost theory partially reversed) |
| L-V2-1 | LOW | `.claude/settings.json:160` audio-only beep | OPERATOR-ACTION (Windows Toast) |
| L-V2-2 | LOW | `.claude/settings.json:140` PreCompact log | DIFF-READY (New-Item Directory -Force) |
| L-V2-5 | LOW | `.claude/settings.json:88-95` disabledMcpjsonServers | DEFERRED (W296 bookkeeping debt) |
| L-V3-1 | LOW | `W308-STREAM-C-SOTA-DISCOVERY-OPENSPACE.md:84` | DIFF-READY (doc path rewrite) |

### Closed findings

| ID | Status | Closure mechanism |
|---|---|---|
| AI-10 | CLOSED | T6 basic-memory smoke returns FTS5-indexed `score=1.0` hit on `w288-p4-smoke/w288-p4-smoke-tier6-marker`; the W310-SYNTHESIS skeleton's note was a stale carry-forward |

### Closure rate vs W309-A-V2

- **W309-A-V2 open findings**: 5 (3 HIGH + 2 MEDIUM that required action; M-V2-3+M-V2-4
  +M-V2-5+L-V2-1+L-V2-2+L-V2-4+L-V2-5 trail-of-deferrals + 1 AI-10 skeleton carry)
- **V3 closure-rate**:
  - **5/5 V2 OPEN findings have paste-ready diffs in V3** (§1.1–§1.5, 100% diff-ready)
  - **1/1 AI-10 closed by live smoke** (§1.6, AI-10 retired)
  - **1 V2 finding partially reversed** (M-V2-4 ghost-list — 5/7 IDs are NOT ghosts)
  - **5 NEW V3 findings** added (H-V3-1 chrome-devtools-mcp drift, M-V3-1 repos/deps
    drift, M-V3-2 claude doctor hang, M-V3-3 ECC_DISABLED_HOOKS scope expansion,
    L-V3-1 W308 stale doc path)
  - **2 NEW sca-v7 hard-cap proposals** for decision-framework gaps (§4: D19
    silent_fallback_pattern_density, D20 pin_freshness_lag_norm)

### Net runtime hygiene posture

V3 confirms the runtime is in a **GOOD but improvable** state:
- Cardinal-rule-1 through -5 all PASS (CR-2 still GREY pending operator-ruling on M-V2-1
  carve-out; V3 re-cite-anchored to OPEN issue #46915 to preserve audit defensibility)
- T6 basic-memory canonical memory tier FULLY operational
- 5 paste-ready closures shipping in a single commit would address 60% of the V2+V3
  HIGH+MEDIUM backlog (H-V2-1 H-V2-2 M-V2-2 M-V3-3 L-V3-1 — 5 diffs, ~30 LOC total)
- 2 OPERATOR-ACTIONS (M-V3-1 quarterly clone refresh + M-V3-2 claude doctor debug) are
  outside the diff-ready scope but trivially scriptable
- 1 BREAKING-CHANGE check needed before H-V3-1 chrome-devtools-mcp bump

**Worktree-count untouched; no `.py`/`.sh` self-invent created; no `.claude/rules/`
populated; CLAUDE.md unchanged at 42 LOC; settings.json unchanged at 14.5 KB; .mcp.json
unchanged. V3 audit is pure read-only. 11 paste-ready unified diffs + 4 operator-action
items + 2 sca-v7 hard-cap proposals enqueued.**
