# W329 Stream D §5 — Insights Wire-Up Trajectory: FINAL Post-Trio Update

**Wave**: W329 Stream D · **Date**: 2026-05-19
**HEAD**: `5cf5c90`
**Charter §5**: Document post-trio wire-up percentage (86% target), identify remaining 14%
**Owner**: `docs/architecture/W329-OPERATOR-TRIO-SCRIPTS/*` (STRICT-FILE-OWNERSHIP)

---

## §1 — One-line verdict

Post-P0-trio operator action lifts Insights wire-up from **~14% → ~86%** (closing 5 of the 6 outstanding gaps in a single ~15-min operator sequence). The remaining ~14% is **GAP-6** (`OTEL_LOG_RAW_API_BODIES`) Phase-2 — a 1-line paste deferred until P0-trio steady-state is observed (~1 wave) and Langfuse DB headroom is confirmed.

---

## §2 — Final trajectory table

| Phase | Wire-up % | Gaps closed | Source |
|---|---:|---:|---|
| Pre-W325 baseline | 0% | 0 of 7 | (W325 not yet audited) |
| Post-W325-A (audit complete) | 0% | 0 of 7 | 4 P0-CRIT + 3 P1-MED identified |
| Post-W326-A F1 (statusLine fix) | 14% | 1 of 7 (GAP-4) | npx-pinned ccstatusline block landed |
| Post-W327-B (5 paste-ready specs documented) | 14% | 1 of 7 (GAP-4) | Spec-only stream; no edits |
| Post-W328-B (Phoenix-up discovery; deps 6→5) | 14% | 1 of 7 (GAP-4) | Pre-condition resolved (Phoenix already running) |
| Post-W329-D (paste-ready trio scripts) | 14% | 1 of 7 (GAP-4) | This stream: tooling, no edits |
| **Post-operator-apply P0-AI-1 (trio-1)** | 14% | 1 of 7 | Phoenix receivers ON (precondition for GAP-1+2) |
| **Post-operator-apply P0-AI-2 (trio-2)** | **57%** | **4 of 7** (GAP-1+2+5+7) | settings.json 8-OTEL-keys paste lands |
| **Post-operator-apply P0-AI-3 (trio-3)** | **86%** | **6 of 7** (above + GAP-3) | Langfuse auth header live |
| **Future Phase-2 RAW_API_BODIES paste** | 100% | 7 of 7 (above + GAP-6) | 1-line paste; defer ~1 wave |

---

## §3 — Gap-by-gap final status matrix

### P0-CRITICAL (4 gaps)

| Gap | Description | Pre-W329-D | Post-trio-apply | Closure path |
|---|---|---|---|---|
| GAP-1 | Metrics exporter unset → metrics dropped | OPEN | **CLOSED** (trio-1 + trio-2) | `OTEL_METRICS_EXPORTER=otlp` + `OTEL_EXPORTER_OTLP_METRICS_*` keys |
| GAP-2 | Logs exporter unset → events dropped | OPEN | **CLOSED** (trio-1 + trio-2) | `OTEL_LOGS_EXPORTER=otlp` + `OTEL_EXPORTER_OTLP_LOGS_*` keys |
| GAP-3 | Langfuse auth header missing | OPEN | **CLOSED** (trio-3) | (f5) snippet in CLAUDE.local.md |
| GAP-4 | statusLine block absent | CLOSED (W326-A F1) | CLOSED (verified) | n/a |

**Post-trio P0-CRITICAL closed**: 4 of 4 = **100%**.

### P1-MEDIUM (3 gaps)

| Gap | Description | Pre-W329-D | Post-trio-apply | Closure path |
|---|---|---|---|---|
| GAP-5 | `OTEL_LOG_TOOL_DETAILS` unset | OPEN | **CLOSED** (trio-2) | Phase-1 paste (`"OTEL_LOG_TOOL_DETAILS": "1"`) |
| GAP-6 | `OTEL_LOG_RAW_API_BODIES` unset | OPEN | OPEN (Phase-2 deferred) | 1-line paste after steady-state observation |
| GAP-7 | `OTEL_LOG_USER_PROMPTS` unset | OPEN | **CLOSED** (trio-2) | Phase-1 paste (`"OTEL_LOG_USER_PROMPTS": "1"`) |

**Post-trio P1-MEDIUM closed**: 2 of 3 = **67%**.

### Overall

Post-trio: **6 of 7 = ~86%** Insights wire-up.

---

## §4 — Remaining 14% (GAP-6 Phase-2 RAW_API_BODIES)

### What's blocked

GAP-6: `OTEL_LOG_RAW_API_BODIES` unset → traces missing full model API request/response payload (system prompt, tool schemas, complete model output).

### Why deferred

Per W328-B-4 §4 + §8 risk classification:

| Variable | Risk class | Data exposed | Defer reason |
|---|---|---|---|
| `OTEL_LOG_RAW_API_BODIES=1` | **MEDIUM-HIGH** | Full model API JSON: system prompt + tool definitions + complete model output + file content + conversation history | Highest-fidelity-but-also-highest-exposure data class; defer until P0-trio steady-state + Langfuse DB headroom confirmed |

The runtime is **local-only loopback infrastructure**:
- Langfuse: `127.0.0.1:3000` (loopback)
- Phoenix: `127.0.0.1:16006` (loopback)
- No external egress

Under the local-machine attacker model, all 3 OTEL_LOG_* opt-ins are SAFE-WITH-CAVEATS. The defer is operational, not security:
1. Verify Phase-1 traces flow cleanly for ~1 wave (steady-state observation).
2. Confirm Langfuse DB doesn't grow 2-5x faster than expected (the Phase-2 enrichment multiplier per W328-B-4 §6).
3. Then apply Phase-2 1-line paste.

### Phase-2 operator action (when ready)

```json
    "OTEL_LOG_RAW_API_BODIES": "1",
```

Insertion point: same `.claude/settings.json` `env` block, immediately after `OTEL_LOG_USER_PROMPTS`. Restart CC. Done.

**Time**: <1 min.
**Closes**: GAP-6 → 7 of 7 → 100% Insights wire-up.

---

## §5 — Operator-deferred items (non-blocking)

Per W329-D Stream forward-AI carry-out:

| # | Item | Why deferred | Wave |
|---|---|---|---|
| 1 | Phase-2 RAW_API_BODIES paste | Steady-state observation gate | W330+ |
| 2 | Phoenix retention policy (`PHOENIX_MAX_SPANS_PER_SECOND`, TTL config) | Optimization, not wire-up | W329-B-F2-2 |
| 3 | Langfuse trace retention policy | Optimization, not wire-up | W327-B-F5-3 |
| 4 | Document composite-MCP OTEL propagation (cognee + basic-memory emit signals too) | Tangential discovery | W329-B-F5-2 |
| 5 | Verify Phase-1 enrichment shows up in Langfuse traces post-paste | Verification (not wire-up) | W329-B-F4-1 |

None of these block the 86% milestone. All are P2-P3 follow-ons.

---

## §6 — Trajectory chart (text form)

```
     0%                                                          100%
     |───14%───14%───14%───14%───14%───57%──────86%──────────────100%|
     |    |   |   |   |   |   |     |          |
   pre  W326 W327 W328 W329 (P0   (Trio-2     (Trio-3       (Phase-2
   W325  -A   -B   -B   -D   trio   settings   Langfuse      RAW_API_
        statL          docs  trio-1 paste)     auth          BODIES)
        ine                  Phoenix           header)
                             rcvrs)
```

The **+72pp jump from 14% → 86%** is the highest-leverage operator action remaining in the Insights wire-up. The +14pp Phase-2 lift afterward is the final-mile cleanup.

---

## §7 — Cardinal-rule conformance

| Rule | Status |
|---|---|
| R1 trusted primitives | ✓ HOLD |
| R2 direct-CLI hooks only | ✓ HOLD |
| R3 upstream subagents | n/a |
| R4 CLAUDE.md + settings.json | ✓ HOLD (this stream made NO settings.json or CLAUDE.local.md edits) |
| R5 sandbox/permissions | ✓ HOLD |
| `self_invented_count` | 0 |

---

## §8 — Forward-AIs to W330+

| # | ID | Priority | Action |
|---|---|---|---|
| 1 | W330-D-F1 | P1 | Re-measure wire-up % after operator runs the trio; expect 86% |
| 2 | W330-D-F2 | P2 | Apply Phase-2 RAW_API_BODIES paste once steady-state observed |
| 3 | W330-D-F3 | P3 | Configure Phoenix retention TTL + per-trace span cap |
| 4 | W330-D-F4 | P3 | Diff cognee + basic-memory OTel signal emit volume; possibly filter |

---

## §9 — References

- W325-A baseline: `Z:/claude-sota-installed/docs/architecture/W325-INSIGHTS-AUDIT/STREAM-A-SYNTHESIS.md`
- W326-A statusLine F1: `Z:/claude-sota-installed/docs/architecture/W326-SETTINGS-FIXES/STREAM-A-SYNTHESIS.md`
- W327-B trajectory + 5 paste specs: `Z:/claude-sota-installed/docs/architecture/W327-INSIGHTS-FINAL/STREAM-B-SYNTHESIS.md`
- W328-B-6 trajectory pre-trio: `Z:/claude-sota-installed/docs/architecture/W328-INSIGHTS-OPERATOR-ENABLED/W328-B-6-WIRE-UP-TRAJECTORY-UPDATE.md`
- W329-D trio scripts: `Z:/claude-sota-installed/tools/w328-trio-*.ps1`
- W329-D trio docs: `Z:/claude-sota-installed/docs/architecture/W329-OPERATOR-TRIO-SCRIPTS/W329-D-{1,2,3,4}*.md`
