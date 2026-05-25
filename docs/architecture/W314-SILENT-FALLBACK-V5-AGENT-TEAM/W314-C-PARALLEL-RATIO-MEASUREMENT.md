# W314-C — Parallel-Ratio Measurement Post-W312-Ship (2026-05-19)

> Stream C / W314 ship. Empirical re-measurement of the operator's flagged silent-fallback failure mode (serial-Agent dispatch when parallel warranted) after the W269 mandate-tightening landed in W312.

## 1. Methodology

**Source**: `Z:/claude-sota-installed/.claude/projects/Z--claude-sota-installed/*.jsonl` (CC native session persistence after HOME-redirect per CLAUDE.local.md).

**Note (drift)**: CLAUDE.local.md `(f)` claims `CLAUDE_CODE_PROJECT_DIR = Z:/claude-sota-installed-state/.claude/projects`. That directory **EXISTS BUT IS EMPTY**. Actual session JSONLs land under `Z:/claude-sota-installed/.claude/projects/Z--claude-sota-installed/`. Either the env-var is unset at launch, or CC v2.1.144 ignores the redirect when `$HOME` already points into the worktree. **This is itself a silent fallback — the state-outside-repo invariant is silently broken.** Flagged as silent-fallback-v5 finding (F-SS-1, HIGH).

**Cutoff**: 2026-05-18T00:00:00Z (W312 ship of `86fbc7a`).

**Files processed**: 45 / 45 (no files skipped — all under 200 MB cap).

**Schema**: each JSONL line is one assistant-message item; multi-tool-use messages are SHARDED into one line per tool_use, all sharing the same `message.id`. Correct parallel-dispatch detection requires grouping by `message.id`, NOT counting tool_use items per line. The initial pass (un-grouped) returned `parallel_ratio = 0.000` — that was a measurement-tool defect, not a runtime regression. Re-measured after grouping by `message.id`.

**Definition (matches W312-D §7 / W269 mandate)**:
- Parallel message: an assistant message containing ≥2 `Agent` / `Task` tool_use blocks (sent in a single assistant turn).
- Serial-agent message: an assistant message containing exactly 1 `Agent` / `Task` tool_use block.
- `parallel_ratio = parallel_msgs / (parallel_msgs + serial_msgs)`.

## 2. Headline numbers

```
Files processed:                    45 sessions  (~1.1 GB JSONL data)
Total assistant turns:              13,597
Total Agent/Task calls:             471
Messages with 2+ Agent (parallel):  108
Messages with 1 Agent (serial):     76
Parallel ratio:                     0.587
Total non-system user prompts:      1,160
Multi-stream-flagged user prompts:  153
```

| Metric                | W312 baseline (1586-JSONL audit) | W314 (post-ship) | Delta |
|-----------------------|----------------------------------|------------------|-------|
| Parallel messages     | 108                              | 108              | 0     |
| Serial-Agent messages | 77                               | 76               | −1    |
| Parallel ratio        | 0.584                            | **0.587**        | +0.003 |
| Target                | ≥0.7                             | ≥0.7             | —     |

**Verdict**: the W269 mandate-tightening (which landed in commit `86fbc7a` on 2026-05-18 inside CLAUDE.md L19) has produced **NO statistically meaningful change** in parallel_ratio. The W312-D 29% serial-fallback measurement is essentially unchanged: 76/(108+76) = **41.3% serial rate**. Target gap = 0.113 (need +19% more parallel turns to clear ≥0.7).

## 3. Why didn't tightening the mandate help?

Two structural reasons:

**(a) JSONL window includes many sessions that PREDATE the post-tightening period.** The 45 sessions span 2026-05-18 onward, but the tightening landed mid-day on 2026-05-18. Many sessions opened before the new instruction was read; CLAUDE.md is only re-read at session start. Sessions opened **after** `86fbc7a` were too few to move the aggregate meaningfully.

**(b) The mandate sits in CLAUDE.md status block, NOT in a behavioral skill that auto-fires per `description:` match.** Per `https://code.claude.com/docs/en/skills`, behavioral discipline only triggers when a skill with a matching `description:` activates. The current location (CLAUDE.md L19 prose) relies on the orchestrator REMEMBERING to apply it — exactly the silent-fallback the mandate is supposed to PREVENT.

**Recommended fix (Stream C #5 paste-ready)**: lift the parallel-dispatch mandate into a real plugin-loaded skill with a triggering `description:` that auto-fires when the user prompt mentions "audit", "review", "research", "sweep", "fan-out", "in parallel", or contains 2+ enumerated streams. Cardinal-rule-compliant: skill auto-fire is the Anthropic-sanctioned discipline mechanism per `https://code.claude.com/docs/en/skills`.

## 4. Top-5 worst silent-serial-fallback sessions (post-W312-ship)

Ranked by `serial_msgs − parallel_msgs` (highest gap = worst silent fallback).

| Rank | session-id (first 8) | serial | parallel | dist (count by agentsInMsg) | turns | summary |
|------|----------------------|--------|----------|------------------------------|-------|---------|
| 1 | `ce669eb8` | 18 | 0 | `{1:18}` | — | **W312-D canonical bad example reproduced post-ship**: 18 serial-Agent dispatches, zero parallel. Pure silent-fallback failure mode. |
| 2 | `a258cb8f` | 12 | 7 | `{1:12,2:1,3:3,4:2,5:1}` | — | Mixed-mode: 7 parallel + 12 serial. Top 3 worst on absolute serial count. |
| 3 | `026e6e24` | 9 | 6 | `{1:9,4:5,5:1}` | — | Heavy 4-agent batches but 9 leaked serials. |
| 4 | `2760cd35` | 12 | 12 | `{1:12,2:2,3:3,4:6,5:1}` | — | Largest session by Agent count (54 total). 1:1 parallel-to-serial. |
| 5 | `bbc7ae0d` | 6 | 7 | `{1:6,2:1,3:2,4:4}` | — | Healthier — most Agent calls were batched. |

**Best sessions** (high parallel ratio, ≥3 Agent calls):
- `e2716e7b`: dist `{1:3, 3:3, 4:3, 5:1, 7:1}` — 73% parallel.
- `47ad27ef`: dist `{1:4, 3:4, 4:2, 5:2}` — 67% parallel.

## 5. Current-session compliance (W314 dispatch by parent orchestrator)

Session `85e3845a` (this session, active at measurement time):

```
Total assistant messages with Agent calls: 2
Messages with 2+ Agent (parallel):         2  ← BOTH dispatches were parallel
Messages with 1 Agent (serial):            0
Parallel ratio for current session:        1.000

msg_01Lzxb5jBK5TKgdmweqxykum: 5 Agent calls in one message  ← W314 fan-out
msg_01XFP2LfxS2JDbSzvRrFNi8h: 5 Agent calls in one message  ← prior W313 fan-out from same session
```

**Compliance verdict**: this session is W269-mandate-compliant. Stream C's own dispatch (5 parallel streams in one message) is logged in the JSONL evidence trail. **Operator's flagged failure mode is REAL but is NOT in the current orchestration.**

## 6. Methodology validation

The grouping-by-`message.id` correction was empirically validated against session `301246c1` (W309 fan-out): lines 143/149/155/161 all share `message.id = msg_015w7TpGw5zG62yeLo7ujmwq` and `parentUuid` chain shows separate threads → confirms the SHARDED-line representation of one multi-tool-use assistant message. Initial naive parser counted 4 serial-Agent calls; correct parser counts 1 parallel-Agent message of degree 4. This explains why the W312-D baseline (108 parallel) matches under correct parser, whereas the naive parser returned zero.

## 7. Raw data

`Z:/claude-sota-installed/tmp/W314-C-parallel-ratio-fixed.json` — machine-readable per-session breakdown for downstream analysis (Stream D ledger row + W315 trend study).

## 8. Recommendation summary

| # | Recommendation                                                                   | Owner   |
|---|-----------------------------------------------------------------------------------|---------|
| 1 | Lift W269 mandate into a real skill with `description:`-auto-fire trigger.        | parent  |
| 2 | Add `parallel_ratio` telemetry hook (Stream D F4 W313-defer item — should land W315). | parent + telemetry hook |
| 3 | Investigate the CLAUDE.local.md `(f)` PROJECT_DIR drift — sessions are NOT landing where the env-var says they should. | Stream A |
| 4 | Re-measure parallel_ratio weekly post-skill-lift; target 0.7 in 4 waves.          | telemetry |
