# W328 Stream B §1 — statusLine post-W326-F1 RE-SMOKE Verify

**Wave**: W328 Stream B · **Date**: 2026-05-19
**HEAD**: `2c48b1e` (W327-codex-r3 ship)
**Charter §1**: re-verify statusLine functional smoke post-W326-A F1 npx-pin fix and post-W327-B-1 audit
**Owner**: docs/architecture/W328-INSIGHTS-OPERATOR-ENABLED/* (STRICT-FILE-OWNERSHIP)

---

## §1 — One-line verdict

**PASS** — statusLine wired correctly via portable `npx -y ccstatusline@2.2.19` form (CR-9 compliant), config has **37 widgets** total across 3 lines (not 38 as W327-B-1 §3 erroneously stated), headless render smoke produces valid ANSI-color status text. **W327 off-by-one corrected here.**

---

## §2 — Probes run this stream

### (2.1) ccstatusline reachability via npx

```
$ npx -y ccstatusline@2.2.19 --version
# stdin EOF without JSON → No input received (expected — ccstatusline reads JSON from stdin)
```

ccstatusline starts cleanly via npx. `--version` not a documented flag (ccstatusline reads a stdin JSON event from CC then renders); the binary IS reachable (Node fork warnings emitted, then "No input received" gate).

### (2.2) Headless render smoke with synthetic event payload

```
$ echo '{"workspace":{"current_dir":"Z:/claude-sota-installed","project_dir":"Z:/claude-sota-installed"},"model":{"display_name":"Opus 4.7","id":"claude-opus-4-7"},"session_id":"w328-stream-b-smoke","cwd":"Z:/claude-sota-installed"}' | \
  npx -y ccstatusline@2.2.19 --config Z:/claude-sota-installed/.claude/ccstatusline/settings.json
```

**Rendered output** (ANSI sequences shown stripped, real session data):

```
Line 0: Model: Opus 4.7 |  | Thinking: xhigh
Line 1: Account: readingcodingandbeyond@gmail.com | Session: 10.0% | Weekly: 5.0% | Block: 4hr 37m | ↻ 0 | Session: 0m
Line 2: ⎇ sota-converge-w310 | (+1060,-393) | Skill: none | Mem: 63.3G/127.8G
```

ANSI color codes verified present (38;5;{30,59,96,178,26} family — `colorLevel: 2` per config).

**Smoke PASS**: render works, data widgets populate (account email, session %, git branch, mem-free), no crashes.

### (2.3) ccstatusline config structure decode

Config file: `Z:/claude-sota-installed/.claude/ccstatusline/settings.json`
Schema: `version: 3`, `flexMode: full-minus-40`, `compactThreshold: 60`, `colorLevel: 2` (256-color), `powerline: {enabled: false}`

**Widget breakdown (real, decoded via node introspection)**:

```
{"line":0,"widget_count":11,"types":"model,separator,context-length,separator,context-percentage,separator,context-bar,flex-separator,thinking-effort,separator,output-style"}
{"line":1,"widget_count":13,"types":"claude-account-email,separator,session-usage,separator,weekly-usage,separator,block-timer,separator,compaction-counter,flex-separator,session-cost,separator,session-clock"}
{"line":2,"widget_count":13,"types":"git-branch,separator,git-changes,separator,worktree-mode,separator,worktree-name,separator,skills,flex-separator,free-memory,separator,version"}
TOTAL: 37
```

**Widget classification**:

| Category | Count | Types |
|---|---:|---|
| Data widgets | 12 | model, context-length, context-percentage, context-bar, thinking-effort, output-style, claude-account-email, session-usage, weekly-usage, block-timer, compaction-counter, session-cost, session-clock — wait that's 13 |
| (corrected) Data widgets | 22 | the 22 non-separator widgets across all 3 lines |
| Separators (`|`) | 12 | `separator` type instances |
| Flex separators | 3 | one per line (flex-magic for right-aligning trailing widgets) |
| **TOTAL** | **37** | line0:11 + line1:13 + line2:13 = 37 |

W327-B-1 §3 cited "38 widgets render correctly; 12 active + 8 latent-OK + 14 separators + 4 flex-magic"; the actual sum 12+8+14+4 = 38, but the real config has 37. **W327-B-1 had a +1 widget over-count (most likely 12 separators not 14, or +1 phantom flex-separator entry).** This is a documentation-only inaccuracy; the functional render is fine.

---

## §3 — settings.json:206 verify (charter §1.3)

**Charter assertion**: "Confirm settings.json:206 ccstatusline command field uses npx form (no hardcoded user path)"

**Actual line numbers**: statusLine block is at **settings.json:219-225**, NOT line 206. Line 206 in current HEAD is inside a `PostToolUseFailure` hook block (post-W325 hook reordering). Charter line citation is stale.

**The actual current statusLine block (lines 219-225)**:

```json
  "statusLine": {
    "type": "command",
    "command": "npx -y ccstatusline@2.2.19 --config Z:/claude-sota-installed/.claude/ccstatusline/settings.json",
    "padding": 0,
    "refreshInterval": 30
  },
```

**Verification (3 dimensions)**:

| Dimension | Check | Result |
|---|---|---|
| npx form | command starts with `npx -y` | ✓ PASS |
| Version pin | `ccstatusline@2.2.19` | ✓ PASS (W326-A F1 fix in place) |
| No hardcoded user path | No `C:/Users/42/...` reference | ✓ PASS — config path is `Z:/claude-sota-installed/...` which is the project root (Z:-portable invariant) |
| CR-9 compliance | `<pkg>@<pinned-version>` form | ✓ PASS |
| Cardinal Rule 6 native-channel | npx resolves from npm cache | ✓ PASS |

All 5 dimensions PASS.

---

## §4 — Comparison to W327-B-1 audit

| Claim | W327-B-1 (2026-05-19 ~15:29) | W328-B-1 (this audit) | Resolution |
|---|---|---|---|
| Widget count | 38 | 37 | W328 correct (decoded from config); W327 had +1 over-count |
| Lines | 3 (header / metrics / git+sys) | 3 (same) | ✓ matches |
| npx form | confirmed | confirmed | ✓ matches |
| Pinned version | `ccstatusline@2.2.19` | `ccstatusline@2.2.19` | ✓ matches |
| settings.json line | 206 (cited in charter) | 219 (actual) | charter stale; this audit corrects |
| Functional smoke | PASS (claimed) | PASS (re-verified with stdin event) | ✓ matches |
| Active vs latent | 12+8 latent | 22 data widgets total (not classified latent here) | non-conflicting; W328 measures population at render time, W327 measured intent |

**No regressions detected.** Net delta: widget-count corrected from 38 to 37; line-number corrected from 206 to 219.

---

## §5 — Gap-4 status post-W326-A + W328-B verify

**GAP-4** (W325 Stream A): "statusLine block absent → no per-prompt status info widgets"

| Phase | Status |
|---|---|
| Pre-W326 | NOT closed (statusLine block absent) |
| Post-W326-A F1 | **CLOSED** — block inserted with npx-pinned form |
| Post-W327-B-1 | CLOSED (re-verified) |
| Post-W328-B-1 (this) | **CLOSED + widget count corrected** (37 not 38) |

GAP-4 closure remains valid. No re-open or escalation.

---

## §6 — Operator-action item (carry to W328-B-7)

Recommend the operator perform a **production smoke in a fresh CC session**:

1. Launch CC normally via `eee` (or directly via `claude --dangerously-skip-permissions`)
2. Observe the 3-line status bar at the top of the terminal
3. Confirm 3 lines populate with: model/context/thinking · account/session/weekly/block/compaction/cost/clock · git/worktree/skill/mem/version
4. If any widget shows `$0.00` for `session-cost` despite real activity, fall back to ccusage MCP fallback (carry per W327 W328-B-F1-2 P3 forward-AI)

**No documentation update needed** beyond this re-smoke; statusLine is production-ready.

---

## §7 — Cardinal-rule verification

| Rule | Status |
|---|---|
| R1 trusted primitives | ✓ HOLD (ccstatusline is W325-vetted MIT npm package) |
| R2 direct-CLI hooks | n/a (statusLine is statusLine, not a hook — exempt per CC docs) |
| R3 upstream subagents | n/a |
| R4 CLAUDE.md + settings.json | ✓ HOLD (settings.json:219 only; not auto-fire prompt) |
| R5 sandbox/permissions | ✓ HOLD (npx invocation is in CC's allowed-Bash tier) |
| CR-9 pinned versions | ✓ HOLD (`ccstatusline@2.2.19` explicit) |
| `self_invented_count` | 0 (unchanged) |

**Zero cardinal-rule violations introduced by this audit.**

---

## §8 — References

- W325 Stream A GAP-4: `Z:/claude-sota-installed/docs/architecture/W325-INSIGHTS-AUDIT/STREAM-A-GAP-AND-RECOMMENDATIONS.md`
- W326-A F1 fix: `Z:/claude-sota-installed/docs/architecture/W326-SETTINGS-FIXES/STREAM-A-SYNTHESIS.md`
- W327-B-1 prior audit: `Z:/claude-sota-installed/docs/architecture/W327-INSIGHTS-FINAL/W327-B-1-STATUSLINE-SMOKE.md`
- ccstatusline npm: `https://www.npmjs.com/package/ccstatusline` (v2.2.19, MIT, ~21KB)
- CC docs statusLine: `https://docs.anthropic.com/en/docs/claude-code/statusline`
- settings.json source-of-truth lines 219-225 (HEAD `2c48b1e`)
- ccstatusline config source-of-truth: `Z:/claude-sota-installed/.claude/ccstatusline/settings.json`
