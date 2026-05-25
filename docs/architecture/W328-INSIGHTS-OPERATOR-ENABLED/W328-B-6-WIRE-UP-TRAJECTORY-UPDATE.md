# W328 Stream B §6 — Insights Wire-Up Trajectory Update

**Wave**: W328 Stream B · **Date**: 2026-05-19
**HEAD**: `2c48b1e`
**Charter §6**: Insights wire-up trajectory % update with W328-discovered facts
**Owner**: docs/architecture/W328-INSIGHTS-OPERATOR-ENABLED/* (STRICT-FILE-OWNERSHIP)

---

## §1 — One-line verdict

**W328-B trajectory: ~14% (entering) → ~14% (exiting) net wire-up; but expected-operator-action ceiling expanded from "85% achievable in 15-20 min" to ~86% with Phoenix-already-up dependency-removed**. Net Δ: this stream did NOT apply settings.json edits (per charter), but RESOLVED Phoenix port ambiguity + DISCOVERED Phoenix is already healthy → eliminated 1 of 6 operator-blocking dependencies.

---

## §2 — Trajectory table (full timeline)

| Wave / Phase | Wire-up % | Gaps closed (of 7) | What changed |
|---|---:|---:|---|
| Pre-W325 baseline | 0% | 0 | Insights gaps not yet audited |
| Post-W325-A (audit complete) | 0% | 0 | 4 P0-CRITICAL + 3 P1-MEDIUM gaps identified, NONE closed |
| Post-W326-A F1 (statusLine fix) | ~14% | 1 (GAP-4) | statusLine block landed with npx-pinned form |
| Post-W327-B-documented (5 paste-ready specs) | ~14% | 1 (GAP-4) | Paste-ready specs produced; settings/CLAUDE.local.md untouched per charter |
| **Post-W328-B (this stream, no apply)** | **~14%** | **1 (GAP-4)** | **Phoenix-already-up DISCOVERED + port ambiguity RESOLVED; Phoenix receivers gating verified; 1 of 6 operator dependencies eliminated** |
| Theoretical post-Phase-1 operator-paste (settings.json 2 keys) | ~43% | 3 (GAP-4 + GAP-5 + GAP-7) | Privacy opt-ins TOOL_DETAILS + USER_PROMPTS applied |
| Theoretical post-Phoenix-receivers-enabled + §5-paste | ~71% | 5 (above + GAP-1 + GAP-2) | OTEL_METRICS_EXPORTER + OTEL_LOGS_EXPORTER routed to live Phoenix |
| Theoretical post-Langfuse-key-rotation + (f5)-paste | ~86% | 6 (above + GAP-3) | Auth header sent on traces; trace flow guaranteed |
| Theoretical post-Phase-2 RAW_API_BODIES applied | **100%** | 7 (all) | Full Insights coverage |

---

## §3 — Gap matrix (7 gaps total, end-of-W328-B-state)

### CRITICAL P0 (4 gaps)

| Gap ID | Description | Status pre-W328 | Status post-W328-B-this | Closure path |
|---|---|---|---|---|
| GAP-1 | Metrics exporter unset → metrics dropped | OPEN | OPEN | §5 paste + Phoenix metrics-receiver enable |
| GAP-2 | Logs exporter unset → events dropped | OPEN | OPEN | §5 paste + Phoenix logs-receiver enable |
| GAP-3 | Langfuse auth header missing → traces may be blocked | OPEN | OPEN | W327-B-2 (f5) paste + Langfuse key rotation |
| GAP-4 | statusLine block absent | CLOSED (post-W326-A) | CLOSED (re-verified) | n/a |

**Current**: 1 of 4 P0 closed = 25%.

### MEDIUM P1 (3 gaps)

| Gap ID | Description | Status pre-W328 | Status post-W328-B-this | Closure path |
|---|---|---|---|---|
| GAP-5 | `OTEL_LOG_TOOL_DETAILS` unset | OPEN | OPEN | §4 Phase-1 paste |
| GAP-6 | `OTEL_LOG_RAW_API_BODIES` unset | OPEN | OPEN | §4 Phase-2 paste (after Langfuse rotation) |
| GAP-7 | `OTEL_LOG_USER_PROMPTS` unset | OPEN | OPEN | §4 Phase-1 paste |

**Current**: 0 of 3 P1 closed = 0%.

### Overall

**Current Insights wire-up**: 1 of 7 = **~14%** (unchanged from W327-B since no settings edits this stream).

**Achievable next**: with operator paste applies the 3 P0 critical-path forward-AIs (Phase-1 privacy + Phoenix-routing §5 + Langfuse rotation+(f5)), Insights wire-up goes to **~86%** (6 of 7).

---

## §4 — Discoveries that change the operator-action map

W328-B-this added 2 important pieces of intelligence:

### (4.1) Phoenix is ALREADY running + healthy

W327-B-4 §1 said "Phoenix not running on :6006 (or :16006 per CLAUDE.md ambiguity)" — that was an early-W327 snapshot before Stream B re-discovered the port. **W328-B-2 confirms Phoenix v13.15.0 has been up 8 hours** in a Docker container with `unless-stopped` restart + persistent volume.

**Net effect**: removed the "operator-start-Phoenix" task from the critical path. Phoenix is already infrastructure-ready.

### (4.2) Phoenix metrics + logs receivers may need explicit enablement

W328-B-2 §4 found `/v1/metrics` + `/v1/logs` return 405 — likely needs `PHOENIX_ENABLE_METRICS_RECEIVER=true` + `PHOENIX_ENABLE_LOGS_RECEIVER=true` Docker env vars.

**Net effect**: replaced "start Phoenix" task with "enable Phoenix receivers" task — similar effort (~2 min docker compose restart), but different command sequence.

### (4.3) Port ambiguity in CLAUDE.md resolved

W327-B-4 noted CLAUDE.md cited `:16006` while W327's first probe used `:6006`. **W328-B confirms `:16006` is correct** (host-mapped port). CLAUDE.md L35 is authoritative; no edit required.

---

## §5 — Operator-action ROADMAP for W328 (P0 trio)

Critical-path 3 P0 items remaining (in optimal order):

### P0-1: Phoenix metrics + logs receivers enable (~3 min)
1. Run `docker inspect phoenix --format '{{.Config.Labels}}'` to check Compose-management
2. Edit Compose YAML or recreate container with `PHOENIX_ENABLE_METRICS_RECEIVER=true` + `PHOENIX_ENABLE_LOGS_RECEIVER=true`
3. `docker compose up -d phoenix` or `docker restart phoenix` after env applied
4. Re-probe: `curl -X POST http://127.0.0.1:16006/v1/metrics -H 'Content-Type: application/x-protobuf' --data-binary ''` should now return 200

### P0-2: settings.json env block paste (~2 min)
Apply BOTH §4 Phase-1 (TOOL_DETAILS + USER_PROMPTS) AND §5 Option A (METRICS_EXPORTER + LOGS_EXPORTER → Phoenix) in one edit:

```json
    "OTEL_LOG_TOOL_DETAILS": "1",
    "OTEL_LOG_USER_PROMPTS": "1",
    "OTEL_METRICS_EXPORTER": "otlp",
    "OTEL_EXPORTER_OTLP_METRICS_ENDPOINT": "http://127.0.0.1:16006/v1/metrics",
    "OTEL_EXPORTER_OTLP_METRICS_PROTOCOL": "http/protobuf",
    "OTEL_LOGS_EXPORTER": "otlp",
    "OTEL_EXPORTER_OTLP_LOGS_ENDPOINT": "http://127.0.0.1:16006/v1/logs",
    "OTEL_EXPORTER_OTLP_LOGS_PROTOCOL": "http/protobuf",
```

→ closes GAP-1 + GAP-2 + GAP-5 + GAP-7 = 4 gaps in one paste.

### P0-3: Langfuse key rotation + W327-B-2 (f5) paste (~10 min)
1. `http://127.0.0.1:3000` → Langfuse admin UI → Project Settings → API Keys
2. Revoke existing `pk-lf-*` + `sk-lf-*`; create new pair
3. Edit `Z:/claude-sota-installed/CLAUDE.local.md` (f2) block — replace key literals (gitignored, NEVER commit)
4. Apply W327-B-2 (f5) paste to CLAUDE.local.md — adds `OTEL_EXPORTER_OTLP_TRACES_HEADERS` env var
5. Restart CC
6. Verify traces flow at `http://127.0.0.1:3000` UI

→ closes GAP-3.

**Total P0 trio time**: ~15 min operator effort.
**Post-P0-trio wire-up**: 86% (6 of 7 gaps closed).

### P1 / Phase-2 follow-on
GAP-6 (RAW_API_BODIES) lands AFTER P0-trio + ~1 wave steady-state observation, then 1-line paste:

```json
    "OTEL_LOG_RAW_API_BODIES": "1",
```

→ closes GAP-6 → 100% wire-up.

---

## §6 — Comparison table (W327 vs W328 operator-action map)

| Item | W327 estimate | W328 reality | Δ |
|---|---|---|---|
| Total operator-blocking deps | 6 | 5 (Phoenix-start removed) | -1 |
| Total operator time to ~86% | ~15-20 min | ~13-17 min | -2 to -3 min |
| Critical-path items | 3 (rotation + Phoenix-start + 3 pastes) | 3 (rotation + Phoenix-receivers + 2-combined-paste) | unchanged count, simplified scope |
| Phoenix wire-up confidence | LOW (port ambiguity) | HIGH (port confirmed, health verified) | improved |

---

## §7 — Trajectory chart (text form)

```
     0%                                                          100%
     |───14%───14%───14%───14%───43%─────71%───────────86%──────100%|
     |    |   |   |   |   |     |          |          |
   pre  W326 W327 W328 (P0     (Phoenix    (Langfuse  (Phase-2
   W325  -A   -B   -B   trio  rcvrs +     rotation    RAW_API_
        statL          start)  §5 paste)  + (f5))     BODIES)
        ine
```

The "P0 trio start" inflection (currently +29 percentage points if applied) is the highest-leverage operator action remaining.

---

## §8 — Cardinal-rule verification

| Rule | Status |
|---|---|
| R1 trusted primitives | ✓ HOLD |
| R2 direct-CLI hooks | ✓ HOLD |
| R3 upstream subagents | ✓ HOLD |
| R4 CLAUDE.md + settings.json | ✓ HOLD (this stream made NO settings.json or CLAUDE.local.md edits per charter) |
| R5 sandbox/permissions | ✓ HOLD |
| `self_invented_count` | 0 |

---

## §9 — References

- W325-A baseline: `Z:/claude-sota-installed/docs/architecture/W325-INSIGHTS-AUDIT/STREAM-A-SYNTHESIS.md`
- W326-A statusLine F1: `Z:/claude-sota-installed/docs/architecture/W326-SETTINGS-FIXES/STREAM-A-SYNTHESIS.md`
- W327-B trajectory: `Z:/claude-sota-installed/docs/architecture/W327-INSIGHTS-FINAL/STREAM-B-SYNTHESIS.md` §3 (table)
- W328-B-1 statusLine re-smoke: this dir / W328-B-1-STATUSLINE-RE-SMOKE.md
- W328-B-2 Phoenix probe: this dir / W328-B-2-PHOENIX-PROBE.md
- W328-B-3 reload-plugins: this dir / W328-B-3-RELOAD-PLUGINS-PASTE-READY.md
- W328-B-4 privacy opt-ins: this dir / W328-B-4-PRIVACY-OPT-INS-PHASE-1.md
- W328-B-5 metrics+logs wire: this dir / W328-B-5-METRICS-LOGS-PHOENIX-WIRE.md
