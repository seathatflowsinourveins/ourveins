# W328-D-2 — Codex Round-20 Output (raw)

**Date**: 2026-05-19 **Wave**: W328 Stream D
**Cumulative codex round**: 20 (W319-W327 = 16 rounds; W328 Stream A R5-verify implicit r17-r19; this is r20 for composite-arch-quality RE-EVAL post-W327-r3 R5 unblock).
**Codex invocation**: `node ".claude/plugins/cache/openai-codex/codex/1.0.4/scripts/codex-companion.mjs" task --effort high "<prompt>"`
**Prompt path**: `Z:/claude-sota-installed/tmp/W328-D-codex-r20-prompt.txt` (7458 bytes; 4 questions Q1-Q4 + 5 output sections)
**Job ID**: `task-mpd2gasc-uuric5`
**Codex session ID**: `019e41db-4fe1-70d0-80ed-fa996c06c55c`

---

## §1 Job state (W328-D wall-clock deadline)

At Stream D wall-clock budget (target ~50 min; deadline reached at ~45 min for synthesis), codex round-20 status:

| Field | Value |
|---|---|
| Status | running |
| Phase | investigating |
| Elapsed at deadline | ~11 minutes |
| Progress | Multiple `rg -n` commands executed against settings.json / sca-v11 SKILL.md / sandbox docs / ops-rhythm SKILL.md / W325-R5-UNBLOCK-EXPLORE; stalled at "Searching:" prompt for ~5+ minutes |
| Last commands completed | `rg -n 'K-3\|K-7\|skip-N/A\|composite_denom...' (exit 0)` + similar pattern searches |
| Cause of stall | Possibly: complex prompt with 4-question structure + xhigh effort + extended search through many cite-anchored docs; OR codex hit a tool-permission gate ("Command declined" appeared for several PowerShell `Get-Content` line-extract commands earlier) and is iterating on workarounds; OR token-budget paced |

**Past codex task durations for context** (from codex status `--all`):
- `task-mpd23nwb-1rrgay` (W327-r3 r3): 1m 13s → VERDICT: APPROVE
- `task-mpd1ze8x-8hk870` (W327-r2-amend): 1m 18s → VERDICT: REVISE
- `task-mpd1ty6z-zajozu` (W327-r2): 1m 55s → VERDICT: REVISE
- `task-mpd1lgx4-zwcb7f` (W327-r1): 1m 57s → VERDICT: REVISE

This task at 11m is **~6× longer than typical**, suggesting the xhigh-effort + 4-question composite-recompute scope is much deeper than W327 commit-narrowing reviews. **No timeout has fired**; job is still alive.

---

## §2 Decision: defer codex round-20 graft to W328-D ratify check OR W329 entry

Per W328 Stream D scope ("Time-bound ~50 min wall-clock (codex round-20 + synthesis)"), the codex round-20 raw output cannot block Stream D synthesis ship. Two paths forward:

**Path A (selected for this commit)**: Ship Stream D synthesis with codex-round-20-PENDING placeholder; graft codex output into this file + W328-D-4 Appendix-A + W328-D-3 anti-bias gate retrospective check at the NEXT W328 commit OR W329 entry (whichever comes first). This preserves Stream D wall-clock + lets codex continue in background.

**Path B (rejected)**: Cancel codex round-20 and re-dispatch with narrower prompt. Rejected because:
- Cancellation loses the in-flight investigation work
- Narrower prompts risk losing the 4-question composite analysis
- Codex round-20 may yet complete in the next 5-10 minutes

---

## §3 Pre-graft Claude-side anticipated outputs (for traceability)

Per W328-D-4 §5, Claude's anticipated post-r3 composite estimate is **4.136** (range 4.106-4.166).
Per W328-D-5, top SOTA candidates are C2 openobserve + C6 slsa-verifier + C10 AEGIS for W329 deep-dive.

When codex round-20 completes, the following deltas will be measured (per anti-bias gate methodology):

| Measurement | Claude-side | Codex round-20 | Δ check |
|---|---|---|---|
| Composite post-r3 | 4.136 | TBD | |Δ| > 0.05 triggers anti-bias retrospective |
| L1 lift | +0.100 | TBD | |Δ| > 0.05 per layer triggers per-layer inverse-test |
| L7 lift | +0.300 | TBD | |Δ| > 0.05 per layer triggers per-layer inverse-test |
| W331 micro-wave needed? | yes (4.50 marginal) | TBD | binary agreement check |
| Top SOTA candidate K-2 | C2 openobserve | TBD | citation-set comparison |

---

## §4 Carry-forward to W328 closure / W329 entry

**OPEN ITEMS** (codex round-20 graft):
1. **APPENDIX-A in W328-D-4-COMPOSITE-LIFT-RECOMPUTE.md** § Appendix-A — append codex per-layer scores
2. **W328-D-3 anti-bias gate** — add codex over-credit check retrospective once codex output available
3. **W328-D-6 PLAN UPDATE** — incorporate codex's projected W329-W330 trajectory deltas
4. **STREAM-D-SYNTHESIS** — final verdict; APPROVE | REVISE etc.

**WHERE TO COLLECT**: `node codex-companion.mjs result task-mpd2gasc-uuric5` once status shows `Phase: done`.

---

## §5 Cite-anchor

- Codex round-20 job manifest: `Z:/claude-sota-installed/.claude/plugins/data/codex-openai-codex/state/claude-sota-installed-0271062cb1571a49/jobs/task-mpd2gasc-uuric5.log` (path reported by codex status; file actually not yet flushed to disk per ls -la at deadline)
- Codex session ID for `codex resume`: `019e41db-4fe1-70d0-80ed-fa996c06c55c`
- Prompt verbatim: `Z:/claude-sota-installed/tmp/W328-D-codex-r20-prompt.txt`
- Tee'd partial output: `Z:/claude-sota-installed/tmp/W328-D-codex-r20-job.txt` (foreground tee; captured ~30 lines before parent process returned)
