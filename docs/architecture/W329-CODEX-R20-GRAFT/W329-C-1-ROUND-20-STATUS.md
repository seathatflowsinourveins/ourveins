# W329-C-1 — Codex Round-20 Status + Retrieval Attempt Log

**Wave**: W329 Stream C — Codex round-20 deferred-graft retrieve
**Date**: 2026-05-19T20:53Z (wall-clock check)
**HEAD**: `5cf5c90`
**Codex job**: `task-mpd2gasc-uuric5`
**Codex session ID**: `019e41db-4fe1-70d0-80ed-fa996c06c55c`
**Codex round number**: 20 (cumulative W319-W328-D)
**Companion runtime version**: openai-codex/codex@1.0.4
**Prompt origin**: `Z:/claude-sota-installed/tmp/W328-D-codex-r20-prompt.txt` (7458 bytes, 4-question scope; composite-arch-quality RE-EVAL + W329-W330 trajectory + SOTA discovery)

---

## §1 Verdict — ABORT / EXPIRED (FROZEN-INVESTIGATING)

**Status**: The codex round-20 job is DEAD-IN-WATER. It has been frozen for **42 minutes 33 seconds** at the "Searching:" prompt phase. The companion task status still reports `running` because no process actively transitioned it to `failed`/`completed`, but observable state proves it cannot recover.

| Diagnostic | Evidence | Conclusion |
|---|---|---|
| `updatedAt` timestamp | `2026-05-19T20:09:59.188Z` | Last state update 43 min ago |
| Log file last-write mtime | `2026-05-19T20:10:19Z` | Log writer dead 43 min ago |
| Wall-clock now | `2026-05-19T20:52:52Z` | Deadline for W329 Stream C met |
| Companion `elapsed` | `44m 0s` (per status --all) | Stale clock |
| Codex parent process PID | `119148` (cmd.exe) | ALIVE but CPU=0 (idle/zombie) |
| Codex child process | NOT FOUND under PID 119148 parent | DEAD (terminated) |
| `progressPreview` | 3× consecutive "Searching:" lines | Stalled at search loop |
| Past typical codex task durations | 49s, 1m13s, 1m18s, 1m41s, 1m55s, 1m57s, 3m27s | Round-20 at 44m is **22×** the upper end |

**Comparison to other long-running codex tasks**: the slowest completed task in the recent history was `task-mpd36lqj-a4je84` at 3m 27s (VERDICT: BLOCK). Round-20 at 44 min is **12.8× longer than the slowest successful completion**.

---

## §2 Retrieval Attempt Log

### §2.1 Attempt 1 — `codex-companion.mjs result task-mpd2gasc-uuric5`

```
$ node Z:/claude-sota-installed/.claude/plugins/cache/openai-codex/codex/1.0.4/scripts/codex-companion.mjs result task-mpd2gasc-uuric5
No job found for "task-mpd2gasc-uuric5". Run /codex:status to list known jobs.
```

**Root cause**: The companion's job-id index does NOT include this round-20 task. The job state file IS findable on disk at `Z:/z/claude-sota-installed/.claude/plugins/data/codex-openai-codex/state/claude-sota-installed-0271062cb1571a49/jobs/task-mpd2gasc-uuric5.{json,log}` (phantom-`Z:/z/` MSYS-path under W317 known bug), but the companion expects the index at the non-phantom path `Z:/claude-sota-installed/.claude/plugins/data/codex-openai-codex/state/claude-sota-installed-0271062cb1571a49/jobs/`, which is EMPTY on disk. The companion's `result` lookup fails because the state file is at the phantom path while the companion looks at the canonical path.

### §2.2 Attempt 2 — `codex-companion.mjs status task-mpd2gasc-uuric5 --json`

```json
{
  "workspaceRoot": "Z:/claude-sota-installed",
  "job": {
    "createdAt": "2026-05-19T20:09:08.508Z",
    "updatedAt": "2026-05-19T20:09:59.188Z",
    "id": "task-mpd2gasc-uuric5",
    "kind": "task",
    "kindLabel": "rescue",
    "title": "Codex Task",
    "workspaceRoot": "Z:/claude-sota-installed",
    "summary": "You are GPT-5.5 codex acting as adversarial cross-model peer in an Anthropic Claude Code arch...",
    "status": "running",
    "phase": "investigating",
    "pid": 119148,
    "logFile": "\\z\\claude-sota-installed\\.claude\\plugins\\data\\codex-openai-codex\\state\\claude-sota-installed-0271062cb1571a49\\jobs\\task-mpd2gasc-uuric5.log",
    "threadId": "019e41db-4fe1-70d0-80ed-fa996c06c55c",
    "turnId": "019e41db-69fc-7b01-a82c-6d8a53fdccf7",
    "progressPreview": [
      "Command completed: pwsh.exe rg -n 'K-3|K-7|skip-N/A|composite_deno... (exit 0)",
      "Searching:",
      "Searching:",
      "Searching:"
    ],
    "elapsed": "44m 0s",
    "duration": null
  }
}
```

**Companion CAN find via `status`** because `status` does a different lookup (probably from `state.json`'s in-memory tail of recent jobs vs `result`'s persistent lookup). But there is no graftable output — just the frozen progress preview.

### §2.3 Attempt 3 — Direct log file read

`Z:/z/claude-sota-installed/.claude/plugins/data/codex-openai-codex/state/claude-sota-installed-0271062cb1571a49/jobs/task-mpd2gasc-uuric5.log`:

Last 5 log lines (timestamps `2026-05-19T20:09:55Z` → `2026-05-19T20:10:19Z`):
```
[20:09:55.877Z] Command completed: rg -n 'rule_version|skip-N/A|skip|N/A|... (exit 0)
[20:09:55.881Z] Command failed: rg -n '.*' docs/architecture/W325-R5-U... (exit 1)
[20:09:55.889Z] Command completed: rg -n 'K-3|K-7|skip-N/A|composite_deno... (exit 0)
[20:09:59.076Z] Searching:
[20:10:08.804Z] Searching:
[20:10:19.847Z] Searching:
```

**No "Assistant message" event after 20:09:46Z**. No "Command completed" event after 20:09:55Z. No subsequent log activity at all after 20:10:19Z (last "Searching:" timestamp).

### §2.4 Attempt 4 — `codex resume` (deferred)

Per Stream C scope: `codex resume 019e41db-4fe1-70d0-80ed-fa996c06c55c` is an OPTION but in the W329-C-context (40-min wall-clock budget for this stream), starting a fresh codex resume is risky — it could itself hang for tens of minutes and consume the rest of the budget without producing graftable output. **Not attempted**. The fresh round-22 fire (R-1 in W330 follow-ups, below) is the preferred path.

---

## §3 Root cause hypothesis: prompt complexity + xhigh-effort + tool-permission gate cascade

Comparing round-20 prompt characteristics to recently-completed shorter tasks:

| Task | Effort | Prompt size | Questions | Duration | Outcome |
|---|---|---|---|---|---|
| `task-mpd23nwb-1rrgay` (W327-r3 r3) | medium | ~3 KB | 1 (binary APPROVE check) | 1m 13s | APPROVE |
| `task-mpd1ze8x-8hk870` (W327-r2-amend) | medium | ~3 KB | 1 | 1m 18s | REVISE |
| `task-mpd2gasc-uuric5` (round-20) | **xhigh** | **7.5 KB** | **4** (composite recompute + 7 layers + bypass + trajectory + 5-10 SOTA candidates) | **frozen at 11m → dead at 44m** | NONE |

**Plausible cause chain**:
1. **xhigh-effort** = much deeper investigation per question
2. **4 questions** = 4× the codex reasoning load vs single-axis verdicts
3. **Multiple PowerShell command declines** in early phase (per log: ~5 `Command declined: (exit -1)` for Get-Content / Test-Path snippets that hit local policy guard); codex attempted workarounds via `rg`
4. **PowerShell PolicyGuard hooks** likely caused codex's investigation loop to spend excessive time enumerating allowed/denied commands and retrying
5. **At "Searching:" phase** (a codex-internal reasoning state, not a tool call), the process simply did not return — likely an OpenAI-side timeout or a codex companion bug under xhigh-effort + complex prompt

This pattern matches the documented codex failure mode where the inner reasoning loop can stall when the prompt has too many parallel investigation branches.

---

## §4 W330 follow-up: fresh round-22 fire with narrower prompt

The codex round-20 task should be canceled (`codex-companion.mjs cancel task-mpd2gasc-uuric5`) and re-fired as round-22 in W330 with the following adjustments:

| Original (round-20) | W330 round-22 fix |
|---|---|
| 4 questions in single prompt | Split into 2× 2-question dispatches (Q1+Q2 first, Q3+Q4 second) |
| `--effort xhigh` | `--effort high` (test if "medium" sufficient first; only escalate if reasoning quality insufficient) |
| 7-layer table recompute | Pre-fill 4 layers (L3, L5, L6 = unchanged from W326-D; L1 pre-computed at 4.585) and ask codex only for L2, L4, L7 |
| 5-10 SOTA candidates | Drop to 3-5; defer to a Stream D follow-up |
| Single 40-min wall-clock | Two 15-min waves; budget for retry on first failure |

**Estimated dispatch time**: ~3 min per narrowed fire. Total round-22 budget ~10 min wall-clock (matches the 1-3min historical norm).

---

## §5 Operator action items

- [ ] Cancel `task-mpd2gasc-uuric5` via `node codex-companion.mjs cancel task-mpd2gasc-uuric5` to free the stale PID 119148 cmd.exe (zombie cleanup)
- [ ] OPTIONAL: investigate W317 phantom-`Z:/z/` MSYS-path bug as it caused `result` lookup to fail; the companion's log path `\z\claude-sota-installed\...` is the smoking gun
- [ ] Schedule W330 round-22 with narrower prompt per §4

---

## §6 Anti-bias-gate impact (preview for W329-C-3)

Since round-20 produced ZERO graftable output, the W328-D-3 anti-bias gate retrospective is DEFERRED to W330 round-22 graft. The W328-D-3 file remains at "PENDING CODEX RETROSPECTIVE" but Claude-side anti-bias cap holds at 4.143 ± 0.05 per §5 of that document.

**No composite re-eval delta from round-20**: W328-D-4 composite estimate of **4.143** (anti-bias capped) is unchanged. The W329 trajectory projections remain at:
- W329 close target: ~4.20-4.30 YELLOW upper-band
- W330 close target: ~4.39
- W331 micro-wave required for ≥4.5

This is explored in detail in `W329-C-4-COMPOSITE-RE-EVAL-UPDATE.md`.

---

## §7 Cite-anchor master

- W328-D-2 (codex round-20 dispatch context): `docs/architecture/W328-COMPOSITE-REVAL-AND-SOTA/W328-D-2-CODEX-ROUND-20-OUTPUT.md`
- W328-D-3 (anti-bias gate): `docs/architecture/W328-COMPOSITE-REVAL-AND-SOTA/W328-D-3-ANTI-BIAS-GATE.md`
- W328-D-4 (composite recompute baseline): `docs/architecture/W328-COMPOSITE-REVAL-AND-SOTA/W328-D-4-COMPOSITE-LIFT-RECOMPUTE.md`
- Codex round-20 prompt: `Z:/claude-sota-installed/tmp/W328-D-codex-r20-prompt.txt`
- Codex round-20 partial tee'd output: `Z:/claude-sota-installed/tmp/W328-D-codex-r20-job.txt`
- Codex round-20 state log (phantom-path): `Z:/z/claude-sota-installed/.claude/plugins/data/codex-openai-codex/state/claude-sota-installed-0271062cb1571a49/jobs/task-mpd2gasc-uuric5.{json,log}`
- W317 MSYS phantom-path bug: `docs/architecture/W317-FULL-MSYS-FIX-WAVE/` (broader context)
- Companion runtime: `Z:/claude-sota-installed/.claude/plugins/cache/openai-codex/codex/1.0.4/scripts/codex-companion.mjs`
