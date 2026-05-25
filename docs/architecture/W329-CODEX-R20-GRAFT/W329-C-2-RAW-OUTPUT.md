# W329-C-2 — Codex Round-20 Raw Output

**Wave**: W329 Stream C — Codex round-20 deferred-graft retrieve
**Date**: 2026-05-19T20:53Z
**Status**: ZERO graftable raw output (job frozen for 43+ min at "Searching:")
**Reference**: see W329-C-1-ROUND-20-STATUS.md for full retrieval-attempt log

---

## §1 Available Codex Round-20 Artifacts (partial / pre-stall)

The only available codex round-20 artifacts are: (a) the partial tee'd output captured by the foreground dispatch (~30 lines, pre-stall investigation phase); (b) the log file inside the phantom-`Z:/z/` MSYS state directory (35 lines, captured through 2026-05-19T20:10:19Z). No assistant-completion message was ever produced.

### §1.1 Codex round-20 partial tee (pre-stall investigation)

Path: `Z:/claude-sota-installed/tmp/W328-D-codex-r20-job.txt` (3474 bytes, 30 lines)

Key events captured:

```
[codex] Starting Codex task thread.
[codex] Thread ready (019e41db-4fe1-70d0-80ed-fa996c06c55c).
[codex] Turn started (019e41db-69fc-7b01-a82c-6d8a53fdccf7).
[codex] Assistant message captured: I'll verify the local config and shipped artifacts first, then cross-check the external SOTA ...
[codex] Running command: pwsh -Command '$i=0; Get-Content .claude/settings.jso...
[codex] Running command: pwsh -Command 'if (Test-Path .claude/skills/ops-rhyth...
[codex] Command declined: pwsh -Command '$i=0; Get-Content .claude/settings.jso... (exit -1)
[codex] Command declined: pwsh -Command 'if (Test-Path .claude/skills/ops-rhyth... (exit -1)
[codex] Running command: pwsh -Command 'if (Test-Path docs/architecture/W325-R...
[codex] Running command: pwsh -Command 'rg -n "K-3|skip|N/A|composite_denom|op...
[codex] Command declined: pwsh -Command 'if (Test-Path docs/architecture/W325-R... (exit -1)
[codex] Command completed: pwsh -Command 'rg -n "K-3|skip|N/A|composite_denom|op... (exit 0)
[codex] Assistant message captured: The direct line-number PowerShell snippets hit the local policy guard, but plain `rg` works. ...
[codex] Running command: pwsh -Command "rg -n '\"defaultMode\"|\"allowUnsandbo...
[codex] Running command: pwsh -Command "rg -n 'dwell|8-wave|5-wave|3-wave|pena...
[codex] Running command: pwsh -Command "if (Test-Path docs/architecture/W325-R...
[codex] Command declined: pwsh -Command "if (Test-Path docs/architecture/W325-R... (exit -1)
[codex] Running command: pwsh -Command "rg -n 'K-3|skip-N/A|skip|N/A|composite...
[codex] Command completed: pwsh -Command "rg -n 'dwell|8-wave|5-wave|3-wave|pena... (exit 0)
[codex] Command completed: pwsh -Command "rg -n '\"defaultMode\"|\"allowUnsandbo... (exit 0)
[codex] Command completed: pwsh -Command "rg -n 'K-3|skip-N/A|skip|N/A|composite... (exit 0)
[codex] Running command: pwsh -Command "rg -n '.*' docs/architecture/W325-R5-U...
[codex] Running command: pwsh -Command "rg -n 'K-3|K-7|skip-N/A|composite_deno...
[codex] Running command: pwsh -Command "rg -n 'rule_version|skip-N/A|skip|N/A|...
[codex] Running command: pwsh -Command 'git rev-parse --short HEAD'
[codex] Command declined: pwsh -Command 'git rev-parse --short HEAD' (exit -1)
[codex] Command completed: pwsh -Command "rg -n 'rule_version|skip-N/A|skip|N/A|... (exit 0)
[codex] Command failed: pwsh -Command "rg -n '.*' docs/architecture/W325-R5-U... (exit 1)
[codex] Command completed: pwsh -Command "rg -n 'K-3|K-7|skip-N/A|composite_deno... (exit 0)
[codex] Searching:
```

### §1.2 Codex round-20 state log (phantom-`Z:/z/` path, full)

Path: `Z:/z/claude-sota-installed/.claude/plugins/data/codex-openai-codex/state/claude-sota-installed-0271062cb1571a49/jobs/task-mpd2gasc-uuric5.log` (4704 bytes, 40 lines)

Last 3 events before freeze:

```
[2026-05-19T20:09:59.076Z] Searching:
[2026-05-19T20:10:08.804Z] Searching:
[2026-05-19T20:10:19.847Z] Searching:
```

**No subsequent log activity for 42 minutes 33 seconds (through wall-clock 2026-05-19T20:52:52Z)**.

### §1.3 Codex round-20 state JSON

Path: `Z:/z/claude-sota-installed/.claude/plugins/data/codex-openai-codex/state/claude-sota-installed-0271062cb1571a49/jobs/task-mpd2gasc-uuric5.json` (784 bytes)

```json
{
  "id": "task-mpd2gasc-uuric5",
  "kind": "task",
  "kindLabel": "rescue",
  "title": "Codex Task",
  "workspaceRoot": "Z:/claude-sota-installed",
  "jobClass": "task",
  "summary": "You are GPT-5.5 codex acting as adversarial cross-model peer in an Anthropic Claude Code arch...",
  "write": false,
  "createdAt": "2026-05-19T20:09:08.508Z",
  "sessionId": "42df836b-6b6a-458c-adb5-f62755808880",
  "status": "running",
  "startedAt": "2026-05-19T20:09:08.704Z",
  "phase": "investigating",
  "pid": 119148,
  "logFile": "\\z\\claude-sota-installed\\.claude\\plugins\\data\\codex-openai-codex\\state\\claude-sota-installed-0271062cb1571a49\\jobs\\task-mpd2gasc-uuric5.log",
  "threadId": "019e41db-4fe1-70d0-80ed-fa996c06c55c",
  "turnId": "019e41db-69fc-7b01-a82c-6d8a53fdccf7"
}
```

Note the `logFile` path begins with `\z\claude-sota-installed\...` — this is the W317 phantom-MSYS-path bug surfacing through codex companion state serialization.

---

## §2 Token cost analysis — UNKNOWN

Codex round-20 has produced ZERO tokens-used metric because the task never reached the `[codex] tokens used` marker that completed tasks emit. The standard completion path emits:

```
SUCCESS: The process with PID xxx ... has been terminated.
SUCCESS: ...
tokens used
XX,XXX
<verdict block>
```

Round-20 emitted only the early investigation events (~30 log lines) and stalled at "Searching:" — no token-usage report.

**Estimate**: Based on the 30-line log activity (assistant-messages ≈ 200 tokens each × 2 = 400, command-output ingestion ≈ 100 tokens per `rg` × 12 commands = 1200), the task likely consumed **1500-3000 tokens** before stall. Compare to typical completed codex review at ~40,000 tokens. The stall happened during the codex internal reasoning loop, NOT during tool-use, so the token cost is at the LOW end of the curve.

---

## §3 Captured Claude-side anticipated outputs (for W330 round-22 comparison)

When W330 round-22 fires, the following Claude-side anticipated outputs from W328-D-4 will be the baseline to compare:

| Output | Claude-side primary | Claude-side anti-bias-capped |
|---|---|---|
| L1 Cardinal-Rules score | 4.585 (+0.100) | 4.585 (+0.100) — no cap |
| L2 Orchestration score | 3.950 (+0.100) | 3.925 (+0.075) — K-7 enforcement gap cap |
| L3 Memory | 4.300 (0) | 4.300 (0) |
| L4 Research/Decision | 4.510 (+0.200) | 4.460 (+0.150) — K-3 metadata-only cap |
| L5 Install/Wire | 4.300 (0) | 4.300 (0) |
| L6 Observability | 3.750 (0) | 3.750 (0) |
| L7 Safety/Governance | 3.757 (+0.300) | 3.682 (+0.225) — R5 double-count + K-8 course-correction + K-7 enforcement cap |
| **Sum** | 29.152 | 29.002 |
| **Composite (÷7)** | 4.165 | **4.143** |
| **Δ from 4.036** | +0.129 | +0.107 |

**Codex round-22 should produce a comparable layer table**. Any |Δ| > 0.05 per layer triggers W295 §6.2 inverse-test re-litigation.

---

## §4 SOTA candidates that round-20 was asked to surface

The round-20 prompt §Q4 asked for 5-10 SOTA candidates across 4 K-N dimensions:
- **K-2** L6 observability backends (alternatives to Phoenix: Grafana Tempo, Honeycomb, Lightstep, Jaeger, OpenObserve)
- **K-4** supply-chain attest (in-toto, cosign, Sigstore, SLSA L3 verifiable-build implementations)
- **K-5** wave-coord primitive (real "session-coordinator" repo SOTA)
- **K-6** hook RCE / signed-audit-trails hardening patterns

Claude-side picks already documented in `W328-D-5-SOTA-CANDIDATES-NEW.md`:
- **C2** openobserve (T1 for K-2 observability) — primary recommendation
- **C6** slsa-verifier (T1 for K-4 supply-chain) — primary recommendation
- **C10** AEGIS pattern (T1 for K-6 hardening) — pattern-only adoption

Codex round-22 will be asked to ratify or revise these.

---

## §5 Cite-anchor master

- W328-D-2 (round-20 dispatch + prompt): `docs/architecture/W328-COMPOSITE-REVAL-AND-SOTA/W328-D-2-CODEX-ROUND-20-OUTPUT.md`
- Codex round-20 prompt (verbatim): `Z:/claude-sota-installed/tmp/W328-D-codex-r20-prompt.txt`
- Codex round-20 partial tee: `Z:/claude-sota-installed/tmp/W328-D-codex-r20-job.txt`
- Codex round-20 state log (phantom): `Z:/z/claude-sota-installed/.claude/plugins/data/codex-openai-codex/state/claude-sota-installed-0271062cb1571a49/jobs/task-mpd2gasc-uuric5.log`
- W317 MSYS-path bug: `docs/architecture/W317-FULL-MSYS-FIX-WAVE/` (broader context for phantom-Z:/z/ path appearance)
- Companion: `Z:/claude-sota-installed/.claude/plugins/cache/openai-codex/codex/1.0.4/scripts/codex-companion.mjs`
