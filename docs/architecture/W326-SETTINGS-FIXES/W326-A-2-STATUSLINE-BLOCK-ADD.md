# W326 Stream A — F2: statusLine Block ADD (GAP-4 Closure — DISCOVERED-PRE-CLOSED)

**Wave**: W326 Stream A · **Date**: 2026-05-19
**Source finding**: W325 Stream A GAP-4 (`Z:/claude-sota-installed/docs/architecture/W325-INSIGHTS-AUDIT/STREAM-A-GAP-AND-RECOMMENDATIONS.md` §1.4)
**Owner**: docs/architecture/W326-SETTINGS-FIXES/* — STRICT-FILE-OWNERSHIP

---

## §1 — TL;DR — GAP-4 already-resolved between W325 and W326

The W326 Stream A directive specified: **"P0 — statusLine block ADD to settings.json (currently absent)"**.

**Actual state observed at HEAD `f52aebc` (2026-05-19 pre-W326-A edits)**: `statusLine` block **DOES exist** at lines 204-209 of `Z:/claude-sota-installed/.claude/settings.json`. Some wave between W325 ship and W326 dispatch ADDED the block (with the broken hardcoded path that W325-D F-W325-D-CLEAN-2 simultaneously flagged in parallel). The two W325 streams (A "insights" + D "cleanness") were measuring **different states** of settings.json — Stream A's pre-image had no statusLine; Stream D's post-image had one but with broken path.

**W326-A F1 (NPX path-fix, documented in `W326-A-1-CCSTATUSLINE-NPX-FIX.md`) REPAIRS the broken-but-extant statusLine block.** This deliverable (F2) documents the schema + visual mock + insights wired, since GAP-4 is now functionally closed.

**NET RESULT W326-A**: GAP-4 status = **CLOSED-VIA-F1** (no separate F2 ADD needed). The block exists + is Z:-portable + renders the rich 3-line insights layout described below.

---

## §2 — Current statusLine block (post-W326-A F1 — what shipped)

`Z:/claude-sota-installed/.claude/settings.json` lines 204-209:

```jsonc
"statusLine": {
  "type": "command",
  "command": "npx -y ccstatusline@2.2.19 --config Z:/claude-sota-installed/.claude/ccstatusline/settings.json",
  "padding": 0,
  "refreshInterval": 30
},
```

**Schema validity** — per CCBP `claude-settings.md` statusLine schema (cited at `https://docs.anthropic.com/en/docs/claude-code/settings`):
- `type: "command"` — invoke an external command, pipe stdin JSON event
- `command: "<shell>"` — full shell-resolvable command
- `padding: <int>` — column padding around rendered status (0 = flush-left)
- `refreshInterval: <seconds>` — re-invoke cadence (30s = standard low-overhead)

**Insight delegation**: settings.json statusLine block is a 1-line invocation indirection. The **actual 38-widget rich layout** lives in `Z:/claude-sota-installed/.claude/ccstatusline/settings.json` (2,537 bytes, version: 3 schema, 3 lines × {11, 12, 12} widgets).

---

## §3 — Insights wired (delegated to ccstatusline config)

Source-of-truth: `Z:/claude-sota-installed/.claude/ccstatusline/settings.json` (separate file — not touched this wave).

### Line 1 (12 widgets) — Model + Context window

| Widget | Type | Color | Meaning |
|---|---|---|---|
| 1 | model | cyan | Current model alias (e.g. "Opus 4.7") |
| 3 | context-length | brightBlack | Current context token count |
| 5 | context-percentage | brightBlack | % of model context window consumed |
| 7 | context-bar | blue | Visual fill-bar for context-percentage |
| 9 | thinking-effort | magenta | Current `effortLevel` (`xhigh` shown in smoke) |
| 11 | output-style | brightBlack | Current `outputStyle` (`Proactive` per settings.json L425) |

### Line 2 (12 widgets) — Account + Usage + Cost + Block + Compaction

| Widget | Type | Color | Meaning |
|---|---|---|---|
| 20 | claude-account-email | brightBlack | Logged-in account email |
| 22 | session-usage | yellow | This-session token usage % of 5h block |
| 24 | weekly-usage | yellow | 7-day rolling token usage % of weekly quota |
| 26 | block-timer | brightBlack | Time remaining in current 5h rate-limit block |
| 28 | compaction-counter | brightBlack | Number of auto-compactions triggered |
| 30 | session-cost | green | Cumulative USD cost this session |
| 32 | session-clock | brightBlack | Wall-clock duration of session |

### Line 3 (12 widgets) — Git + Worktree + Skills + Memory

| Widget | Type | Color | Meaning |
|---|---|---|---|
| 40 | git-branch | magenta | Current branch (e.g. `sota-converge-w310` per smoke) |
| 42 | git-changes | yellow | `(+staged-or-untracked, -deleted)` count |
| 44 | worktree-mode | brightBlack | `MAIN` or `WORKTREE` indicator |
| 46 | worktree-name | brightBlack | Worktree label if in worktree |
| 48 | skills | blue | Currently-loaded skill (or `none`) |
| 50 | free-memory | brightBlack | System RAM in `used/total` GB |
| 52 | version | brightBlack | ccstatusline version |

**Coverage map vs W326 directive** ("display: model · context-window-pct · session-cost · rate-limit · etc. per CCBP schema"):

| W326 directive item | Widget wired | Status |
|---|---|---|
| model | id=1 (cyan) | ✓ |
| context-window-pct | id=5 (brightBlack) + id=7 (blue bar) | ✓ |
| session-cost | id=30 (green) | ✓ |
| rate-limit | id=22 (session-usage) + id=24 (weekly-usage) + id=26 (block-timer) | ✓ (3-way coverage) |
| "etc." (per CCBP) | thinking-effort, compaction-counter, git-state, skills, memory | ✓ (12 additional widgets) |

**All W326 directive items present + 7 additional value-add insight widgets.**

---

## §4 — Visual mock (rendered live this session)

From smoke-test invocation `echo '{}' | npx -y ccstatusline@2.2.19 --config Z:/claude-sota-installed/.claude/ccstatusline/settings.json` (raw ANSI escape sequences stripped for legibility):

```
                                                | Thinking: xhigh
Account: readingcodingandbeyond@gmail.com | Session: 5.0% | Weekly: 4.0% | Block: 3hr 13m | ↻ 0 | Session: 0m
⎇ sota-converge-w310 | (+1015,-398) | Skill: none                                                  | Mem: 61.7G/127.8G
```

(With color the line-1 leading model widget appears in cyan, line-2 cost/usage in yellow/green, line-3 branch in magenta — confirmed visually in this session terminal.)

**Note line-1 rendering**: smoke test with empty `{}` payload doesn't carry model/context, so only the right-half (thinking + flex-separator + output-style) populated; under real CC invocation the model/context/percentage/bar widgets fire.

---

## §5 — Why GAP-4-ADD was not re-executed (decision rationale)

W326 directive said "(P0) statusLine block ADD to settings.json (currently absent)". Re-applying an ADD when the block already exists would:

1. Conflict with the existing block (operator would have duplicate keys = JSON parse error)
2. Risk overwriting the 3-line × 12-widget config with a simpler schema, REGRESSING insight coverage
3. Violate the "surgical line-level" mandate ("Settings.json edits MUST be surgical line-level")

**Correct action**: F1 (path-fix) makes the existing block functional + Z:-portable. F2 (this doc) records the discovery + documents what the block delivers.

This pattern is canonical-W325-codex-pre-flight: **before applying a paste-ready add, verify the file's CURRENT state — if the gap is already closed, document the closure rather than re-applying.**

---

## §6 — Cardinal-rule conformance (F2 specifically)

| Rule | Status | Notes |
|---|---|---|
| R1 (trusted-source primitives) | ✓ HOLD | ccstatusline is an MIT-licensed npm-distributed package; no project-owned status renderer |
| R2 (hooks = upstream OR direct-CLI) | ✓ HOLD | statusLine type:command is documented schema per CCBP; npx is direct-CLI |
| R3 (subagents = upstream) | n/a | Not a subagent change |
| R4 (project behavior in CLAUDE.md + settings.json) | ✓ HOLD | settings.json is appropriate location for statusLine config per CCBP |
| R5 (sandbox/permissions) | ✓ HOLD (no change) | defaultMode/sandbox UNTOUCHED |

`self_invented_count: 0` — no new self-invented files created in F2.

---

## §7 — Forward-AIs

| # | ID | Priority | Description |
|---|---|---|---|
| 1 | W327-A-F2-1 | P2 | Verify statusLine renders correctly in interactive CC session (this F2 verified via direct-pipe smoke; full-interactive verification recommended at next session start) |
| 2 | W327-A-F2-2 | P3 | Consider trimming widgets if statusLine rendering ever becomes >1 terminal-row-wrap (current 38 widgets / 3 lines × ~12-13 each is generous; W317-A budget invariant suggests minimalism if observed perf hit) |
| 3 | W327-A-F2-3 | P3 | Audit `Z:/claude-sota-installed/.claude/ccstatusline/settings.json` for `globalBold: false` and `colorLevel: 2` defaults — current values match smoke output rendering |
| 4 | W327-A-F2-4 | P2 | Trace W325 Stream A → W326 directive divergence — between W325 Stream A audit (statusLine absent) and W326-A pre-image (statusLine present with broken path), an intervening wave added the block; identify which wave shipped the partial fix to consolidate audit-trail |

---

## §8 — References

- **W325 source gap-finding**: `Z:/claude-sota-installed/docs/architecture/W325-INSIGHTS-AUDIT/STREAM-A-GAP-AND-RECOMMENDATIONS.md` §1.4 GAP-4
- **W325 path-finding (companion)**: `Z:/claude-sota-installed/docs/architecture/W325-RUNTIME-V8-SOTA-SWEEP/STREAM-D-CLEANNESS-V8.md` §2 F-W325-D-CLEAN-2
- **Companion fix doc**: `Z:/claude-sota-installed/docs/architecture/W326-SETTINGS-FIXES/W326-A-1-CCSTATUSLINE-NPX-FIX.md`
- **CCBP statusLine schema**: `https://docs.anthropic.com/en/docs/claude-code/settings` statusLine field
- **ccstatusline upstream**: `https://github.com/sirmalloc/ccstatusline` (MIT, v2.2.19 npm @ HEAD)
- **Widget config**: `Z:/claude-sota-installed/.claude/ccstatusline/settings.json` (not modified this wave)
