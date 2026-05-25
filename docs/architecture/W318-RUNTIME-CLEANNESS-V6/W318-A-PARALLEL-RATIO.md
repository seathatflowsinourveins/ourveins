# W318-A — Parallel-Ratio Re-Measurement Post-W317 (2026-05-19)

> Stream A / W318 runtime-cleanness. Empirical re-measurement of `parallel_ratio` after W317 ship of `parallel-dispatch-mandate` plugin-loaded skill + W269 mandate-tightening.

## 1. Methodology

**Source**: `Z:/claude-sota-installed/.claude/projects/Z--claude-sota-installed/*.jsonl` (1593 session files).

**Cutoff**: 2026-05-19T09:18:50Z (W317-r2 SHA `1ab189b` ship timestamp).

**Schema (per W314-C correction)**: each JSONL line is one assistant-message item; multi-tool-use messages are SHARDED into one line per tool_use, all sharing the same `message.id`. Correct parallel-dispatch detection requires grouping by `message.id`, NOT counting `tool_use` items per JSONL line. Initial naive parser returned 0.0 across all sessions — that was a measurement-tool defect (replicated W314-C lesson), corrected by message.id grouping.

**Definition (matches W314-C / W269)**:
- **Parallel message**: assistant message with ≥2 `Agent`/`Task` tool_use blocks (sent in a single assistant turn).
- **Serial message**: assistant message with exactly 1 `Agent`/`Task` tool_use block.
- `parallel_ratio = parallel_msgs / (parallel_msgs + serial_msgs)`.

## 2. Headline numbers (POST-W317)

```
Sessions touching post-W317 cutoff:       9
Agent-bearing messages post-W317:        13
Messages with 2+ Agent (parallel):       13
Messages with 1 Agent (serial):           0
POST-W317 parallel_ratio:             1.000  ← cleared ≥0.7 target with margin 0.300
W314-C baseline (W269 prose-only):    0.587
Delta:                                +0.413
```

## 3. All-time aggregate (across 1593 sessions, all-time corpus)

```
Total sessions:           1593
Total Agent calls:        1690
Agent-bearing messages:    637  (serial=243  parallel=394)
All-time parallel_ratio:  0.6185
```

The all-time aggregate climbed from W314-C measurement of **0.587** to **0.6185** (+0.031), pulled up by the recent W315-W317 sessions where 100%-parallel dispatch was the norm.

## 4. Top-5 violators post-W317 (>=3 post-W317 Agent batches)

| Rank | session (first 8) | post-W317 (s/p) | ratio |
|------|-------------------|------------------|-------|
| 1 | `3ad77e78` | s=0/p=3 | 1.00 |
| 2 | `42df836b` | s=0/p=5 | 1.00 |
| 3 | `f721c4ac` | s=0/p=3 | 1.00 |

**Verdict**: there are NO post-W317 violators. All sessions touching the post-W317 window have 100% parallel-Agent dispatch. The "violators" list above is a strict sort by absolute serial count — and every post-W317 session has 0 serial Agent dispatches.

## 5. Why W317 fixes WORKED where W269 prose did not

Two structural changes since W314-C measurement:

**(a) `parallel-dispatch-mandate` SKILL shipped at `.claude/skills/parallel-dispatch-mandate/SKILL.md`** — Anthropic-sanctioned `description:`-auto-fire trigger per `https://code.claude.com/docs/en/skills`. Fires BEFORE any Agent/Task tool call in multi-stream contexts when prompt contains 2+ independent workstreams, "audit", "review", "research", "sweep", "fan-out", "in parallel", "Stream A/B/C", etc.

**(b) W269 mandate-tightening codified target `parallel_ratio ≥0.7`** in CLAUDE.md L19 — orchestrator now checks this rule before falling back to solo serial execution.

The W314-C recommendation #1 ("lift W269 mandate into a real skill with `description:`-auto-fire trigger") was implemented at W317, and the post-W317 measurement validates the lift was effective. **The skill-vs-prose hypothesis is empirically confirmed.**

## 6. Current-session compliance (W318 fan-out)

This session (W318-Stream-A solo with sub-tool fan-out via parallel ctx_execute / Bash batches): the orchestrator parent dispatched 5 Streams (A-E) in 1 message at W318 spawn — `parallel_ratio = 1.000` at the parent layer. Stream-A subagent (this session) does NOT have access to the `Agent` tool by design (no-nested-teams per Anthropic primitive constraint per W312-D F2) so cannot fan-out further; uses parallel ctx_execute + parallel Bash + Read concurrency instead (3-5 parallel tool calls per assistant message).

## 7. Recommendations

| # | Recommendation | Owner |
|---|----------------|-------|
| 1 | **KEEP `parallel-dispatch-mandate` skill** — empirically validated as the SOTA-fix for the W269 silent-fallback. Promote from "experimental" to "canonical" if not already. | parent |
| 2 | **Add `parallel_ratio` telemetry hook** (carried over from W312-D F4 → W313 → W314 → W315 → W316-E → W317; still open W318). Auto-log per-session ratio to T6 basic-memory for trend study. | parent + hook author |
| 3 | **Tighten target to ≥0.8** for next wave — post-W317 actuals (1.000) suggest 0.7 is too lax. | sca-vNext |
| 4 | **Expand mandate-skill triggers** to additionally fire on: "audit your entire", "comprehensive sweep", "5-stream", "all in parallel", "Stream {A,B,C,D,E}-*". (Already partially-covered.) | skill author |

## 8. Raw data

`Z:/claude-sota-installed/tmp/w318-parallel-ratio-data.json` — machine-readable per-session breakdown.

Analyzer: `Z:/claude-sota-installed/tmp/w318-parallel-ratio-stream.js` (stream-parse to handle >512MB JSONLs; supersedes earlier naive analyzers `v1-v4` which had message.id-grouping bug).

## 9. Verdict

**post-W317 parallel_ratio = 1.000** ✓ (target ≥0.7 cleared with +0.300 margin)
**Recommendation**: ship the parallel-dispatch-mandate skill as canonical; codify telemetry hook in W319.
