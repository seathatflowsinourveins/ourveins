# W326 Stream A — F1: ccstatusline NPX-Pinned Path Fix

**Wave**: W326 Stream A · **Date**: 2026-05-19 · **Pre-edit HEAD**: `f52aebc` (W325-codex-r3 SEV-1 closure APPROVED at r4)
**Owner**: docs/architecture/W326-SETTINGS-FIXES/* — STRICT-FILE-OWNERSHIP
**Source finding**: W325 Stream D F-W325-D-CLEAN-2 (HIGH net-new, W286-A 6th violation)
**File touched**: `Z:/claude-sota-installed/.claude/settings.json` line 206 (single surgical line)
**Reversibility**: 1-line revert (`git checkout -- .claude/settings.json`)

---

## §1 — Before state

```jsonc
"statusLine": {
  "type": "command",
  "command": "node C:/Users/42/AppData/Roaming/npm/node_modules/ccstatusline/dist/ccstatusline.js --config Z:/claude-sota-installed/.claude/ccstatusline/settings.json",
  "padding": 0,
  "refreshInterval": 30
},
```

**Problem** (per W325-D F-W325-D-CLEAN-2):
- Hardcoded `C:/Users/42/AppData/Roaming/npm/...` user-profile path
- Breaks Z:-portability invariant cited at `CLAUDE.local.md§Z-portable install ENV block`
- Convergent with W286-A "5 HIGH violations" finding-class (6th violation slipped through)
- Path DOES resolve on this machine (ccstatusline 2.2.12 installed locally) — but fresh-clone on a machine where user≠`42` OR where npm-root is elsewhere = silent fail (status line just won't render; CC keeps running)
- **NOT a CR-9 compliant invocation** (W286-cross-precedent canonical form is `npx -y <pkg>@<pinned-version>`)

---

## §2 — After state (applied this wave)

```jsonc
"statusLine": {
  "type": "command",
  "command": "npx -y ccstatusline@2.2.19 --config Z:/claude-sota-installed/.claude/ccstatusline/settings.json",
  "padding": 0,
  "refreshInterval": 30
},
```

**Why these specifics**:
- **`npx -y`** — CR-9 canonical invocation form (per W286-cross commits `fcafe05` + `77dc081`); `-y` auto-accepts the install prompt for npx package execution
- **`ccstatusline@2.2.19`** — npm registry `latest` as of 2026-05-19 (probe: `npm view ccstatusline version` → `2.2.19`; 7 patches ahead of locally-installed 2.2.12)
- **Pinned version** per cardinal-rule-9 (no floating `@latest` or unpinned forms; matches W286-A pattern)
- **Config path unchanged** — still references `Z:/claude-sota-installed/.claude/ccstatusline/settings.json` (the actual 3-line × 11/12/12-widget config: model, context-length/percentage/bar, thinking-effort, output-style, claude-account-email, session-usage, weekly-usage, block-timer, compaction-counter, session-cost, session-clock, git-branch, git-changes, worktree-mode, worktree-name, skills, free-memory, version)
- **Padding/refreshInterval preserved** at their prior values (0 / 30s) — no functional behavior change beyond path

---

## §3 — Smoke-test (this session, pre-apply)

```bash
$ echo '{}' | npx -y ccstatusline@2.2.19 --config "Z:/claude-sota-installed/.claude/ccstatusline/settings.json"
[0m[90m | [39m[38;5;96mThinking: xhigh[39m
[0m[38;5;59mAccount: readingcodingandbeyond@gmail.com[39m | [38;5;178mSession: 5.0%[39m | [38;5;178mWeekly: 4.0%[39m | [38;5;59mBlock: 3hr 13m[39m | [38;5;59m↻ 0[39m[90m | [39m[38;5;59mSession: 0m[39m
[0m[38;5;96m⎇ sota-converge-w310[39m | [38;5;178m(+1015,-398)[39m | [38;5;26mSkill: none[39m[90m | [39m[38;5;59mMem: 61.7G/127.8G[39m
```

**Result**: `ccstatusline@2.2.19` resolved via npx, parsed config, rendered the full 3-line status (Thinking + Account/Session/Weekly/Block/Compaction/SessionTime / Branch/Changes/Skill/Memory). **Functional parity with prior hardcoded node-binary invocation.**

**npm registry check**:
```
$ npm view ccstatusline version
2.2.19
$ npm view ccstatusline@2.2.19 dist.shasum
cc215163ff9e087c0351aad791c4e0b3fa5e9a01
```
Latest published 2026-05-19 era — license MIT (verified `npm view ccstatusline@2.2.19 license` → MIT).

---

## §4 — Verification (post-apply)

| Check | Pre-fix | Post-fix | Status |
|---|---|---|---|
| settings.json bytes | 16,055 | 15,998 | ✓ saved 57B (no budget growth) |
| JSON validity | OK | OK | ✓ |
| gitleaks protect --staged --no-banner --redact | n/a | EXIT=0 "no leaks found" | ✓ PASS |
| 1-line diff | n/a | 1 line replaced (statusLine.command) | ✓ surgical |
| ccstatusline functional (rendered status) | yes (machine-locked) | yes (Z:-portable) | ✓ |

```diff
diff --git a/.claude/settings.json b/.claude/settings.json
index 9071d59..3e840e1 100644
--- a/.claude/settings.json
+++ b/.claude/settings.json
@@ -203,7 +203,7 @@
   "defaultShell": "powershell",
   "statusLine": {
     "type": "command",
-    "command": "node C:/Users/42/AppData/Roaming/npm/node_modules/ccstatusline/dist/ccstatusline.js --config Z:/claude-sota-installed/.claude/ccstatusline/settings.json",
+    "command": "npx -y ccstatusline@2.2.19 --config Z:/claude-sota-installed/.claude/ccstatusline/settings.json",
     "padding": 0,
     "refreshInterval": 30
   },
```

---

## §5 — Cardinal-rule conformance

| Rule | Status | Notes |
|---|---|---|
| R1 (trusted-source primitives) | ✓ HOLD | npm registry primary distribution channel for ccstatusline; pinned version per W286-cross |
| R2 (hooks = upstream OR direct-CLI) | ✓ HOLD | statusLine `type:command` is upstream-documented per `https://docs.anthropic.com/en/docs/claude-code/settings` statusLine field; `npx` is a direct-CLI invocation |
| R3 (subagents = upstream) | n/a | Not a subagent change |
| R4 (project behavior in CLAUDE.md + settings.json) | ✓ HOLD | settings.json scope only; no new project-owned hook body created |
| R5 (sandbox/permissions) | ✓ HOLD (no change) | defaultMode/sandbox/bypassPermissions UNTOUCHED — operator-decision still pending W326-D-4 |
| **CR-9 (pinned versions)** | ✓ **RESTORED** | Was-violated (hardcoded local path); now-compliant (`@2.2.19` pinned) |

`self_invented_count: 0` — no new self-invented files created; pure settings.json line edit.

---

## §6 — Forward-AIs

| # | ID | Priority | Description |
|---|---|---|---|
| 1 | W327-A-F1-1 | P3 | Bump ccstatusline pin when 2.2.20+ released (semver patch-cadence is regular — operator can re-pin opportunistically) |
| 2 | W327-A-F1-2 | P3 | Consider migrating `C:/Users/42/AppData/Roaming/npm/node_modules/ccstatusline/` cleanup (now orphan-installed; can `npm uninstall -g ccstatusline` to reclaim ~3.2 MB unpacked) — confirms npx cold-path works without falling back to local global install |

---

## §7 — References

- **W325 source finding**: `Z:/claude-sota-installed/docs/architecture/W325-RUNTIME-V8-SOTA-SWEEP/STREAM-D-CLEANNESS-V8.md` §2 F-W325-D-CLEAN-2
- **W325 CLI context**: `Z:/claude-sota-installed/docs/architecture/W325-RUNTIME-V8-SOTA-SWEEP/STREAM-D-CLI-AND-MCP-V8.md` §1 CLI version table (where ccstatusline absence from PATH was noted)
- **CCBP statusLine schema authority**: `https://docs.anthropic.com/en/docs/claude-code/settings` statusLine field (verified via local clone `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-settings.md`)
- **CR-9 anchor**: W286-cross commits `fcafe05` + `77dc081` (npx -y <pkg>@<pinned-version> canonical form)
- **W286-A finding-class**: 5 HIGH violations + this 6th (`Z:/claude-sota-installed/docs/architecture/CLAUDE-MD-ARCHIVE/CLAUDE-MD-STATUS-PRE-W315.md` W286-A audit)
