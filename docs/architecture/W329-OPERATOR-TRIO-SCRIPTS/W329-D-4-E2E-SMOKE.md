# W329 Stream D §4 — End-to-End Smoke Verification

**Wave**: W329 Stream D · **Date**: 2026-05-19
**HEAD**: `5cf5c90`
**Charter §4**: Compose `tools/w328-trio-e2e-smoke.ps1` for full P0-trio verification + 37-widget statusLine regression check
**Owner**: `docs/architecture/W329-OPERATOR-TRIO-SCRIPTS/*` + `tools/w328-trio-e2e-smoke.ps1` (STRICT-FILE-OWNERSHIP)

---

## §1 — One-line verdict

`tools/w328-trio-e2e-smoke.ps1` aggregates 3 (or optionally 4) sub-step verifiers into a single composite verdict + Insights wire-up % estimate. Run after all 3 P0 trio AIs are applied to confirm 86% target reached. Read-only (no config edits).

---

## §2 — What it verifies

| Sub-step | What | Expected exit | Closes which gaps |
|---|---|---:|---|
| 0 (optional with `-IncludeStatusLine`) | `tools/insights-wireup/statusline-smoke.ps1` — 37-widget render regression | 0 | GAP-4 (already closed since W326-A F1) |
| 1 | `w328-trio-1-phoenix-receivers.ps1 -DryRun` — pre-state probe + receiver-state idempotency check | 0 | precondition for GAP-1 + GAP-2 |
| 2 | `w328-trio-2-settings-validate.ps1` — settings.json 8-OTEL-keys validation | 0 | GAP-1 + GAP-2 + GAP-5 + GAP-7 |
| 3 | `w328-trio-3-langfuse-verify.ps1` — (f5) header + Langfuse auth + trace flow | 0 | GAP-3 |

When all sub-steps exit 0 → **6 of 7 gaps closed → ~86% wire-up**.

---

## §3 — Operator invocation (paste-ready)

```powershell
# Default: skip statusLine (separate W326-A regression gate already covered)
. Z:\claude-sota-installed\tools\w328-trio-e2e-smoke.ps1

# Full: include the W326-A statusLine 37-widget regression gate
. Z:\claude-sota-installed\tools\w328-trio-e2e-smoke.ps1 -IncludeStatusLine
```

### Expected output (SUCCESS)

```
================================================================
  w328-trio-e2e-smoke.ps1 (W329 Stream D)
  End-to-end Insights wire-up verification after P0 trio applied
================================================================

--- Step 1: trio-1-phoenix-receivers ---
=== w328-trio-1-phoenix-receivers.ps1 (W329 Stream D) ===
[OK] Phoenix container running: phoenix|Up 9 hours (healthy)|...
[probe] pre-state: traces=200 metrics=200 logs=200
[OK already-applied] Both metrics + logs receivers ALREADY enabled (POST -> 200).

--- Step 2: trio-2-settings-validate ---
=== w328-trio-2-settings-validate.ps1 (W329 Stream D) ===
[OK] settings.json parses as valid JSON.
[OK] All 8 required OTEL keys present with expected values.
  OTEL_LOG_TOOL_DETAILS = 1
  OTEL_LOG_USER_PROMPTS = 1
  ...

--- Step 3: trio-3-langfuse-verify ---
=== w328-trio-3-langfuse-verify.ps1 (W329 Stream D) ===
[env] LANGFUSE_PUBLIC_KEY    : pk-l...4f9e (masked)
[env] LANGFUSE_SECRET_KEY    : sk-l...3ab1 (masked)
[env] OTEL_EXPORTER_OTLP_HEADERS : Authorization=Basic ... <masked>
[OK] Header Base64 decodes to live pair.
[probe] http_code=200
[OK] Langfuse accepts the rotated key pair.
[trace] count_in_last_600s = 14
[SUCCESS] P0-AI-3 verification PASS

================================================================
  E2E status table
================================================================
Step Name                       Status Exit
---- ----                       ------ ----
   1 trio-1-phoenix-receivers   OK        0
   2 trio-2-settings-validate   OK        0
   3 trio-3-langfuse-verify     OK        0

================================================================
  Wire-up trajectory
================================================================
  Baseline (post-W326-A F1)   : 14%
  Achieved this run            : ~86%
  Target post-P0-trio          : 86%
  Remaining (Phase-2 GAP-6)    : +14pp via 1-line RAW_API_BODIES paste
  Full 100% wire-up            : after Phase-2 stable observation

[VERDICT] E2E SMOKE PASS -- all P0 trio AIs applied + verified.
          Insights wire-up at ~86% (6 of 7 gaps closed).
          Next: W329+ steady-state observation, then Phase-2 paste.
```

---

## §4 — Exit codes

| Code | Status | Composite meaning |
|---|---|---|
| 0 | E2E PASS | All sub-steps OK; 86% wire-up confirmed |
| 1 | E2E PARTIAL | ≥1 sub-step needs operator action (per-step output identifies which) |
| 2 | E2E AMBIGUOUS | ≥1 sub-step exit 2 but no hard fails — usually a wait-and-retry case |

The composite exit is the MAX of all sub-step exit codes (worst-case wins).

---

## §5 — 37-widget statusLine regression check

When invoked with `-IncludeStatusLine`, the e2e smoke also runs `tools/insights-wireup/statusline-smoke.ps1`. This script (authored W328-B in `tools/insights-wireup/`) parses `.claude/ccstatusline/settings.json` and confirms:

- 3 lines × {11, 13, 13} widgets = **37 widgets total** (per W328-B-1 §2.3 verified count, NOT the 38 W327-B-1 over-cited).
- Live `npx -y ccstatusline@2.2.19 --config <path>` render produces ≥1 non-empty line + ≥4 ANSI escape sequences.
- settings.json `statusLine.type === "command"`, `refreshInterval` present.

The check is a regression-gate: the P0 trio paste edits the `env` block, NOT the `statusLine` block. The widget count should be invariant. If it drifts, something else changed.

**Note**: this is an OPTIONAL inclusion — the prompt charter calls it "regression check". Default e2e smoke skips it because it's an independent dimension (Insights wire-up is exporter/auth/privacy; statusLine is local-render).

---

## §6 — Failure-mode walkthrough

### Case A: trio-1 exit 1 (Phoenix not running)

```
[NEEDS-OPERATOR] Phoenix container 'phoenix' is NOT running.
  Start it first: docker compose -f <compose-file> up -d phoenix
```

→ Operator runs `docker compose -f Z:\claude-hub\observability\docker-compose.yml up -d phoenix` and re-runs e2e.

### Case B: trio-2 exit 1 (settings.json missing keys)

```
[FAIL] Missing keys (3 of 8):
  - OTEL_METRICS_EXPORTER
  - OTEL_EXPORTER_OTLP_METRICS_ENDPOINT
  - OTEL_EXPORTER_OTLP_METRICS_PROTOCOL
```

→ Operator re-pastes the §3 block from W329-D-2-SETTINGS-PASTE-SPEC.md and re-runs e2e.

### Case C: trio-2 exit 2 (JSON parse error)

```
[FAIL] settings.json parse error -- the paste likely introduced a syntax issue:
       Unexpected token } at position 16842
```

→ Operator inspects the paste for trailing-comma or smart-quote issues, runs `node -e "JSON.parse(...)"` to pinpoint, fixes, re-runs.

### Case D: trio-3 exit 2 (Langfuse 401)

```
[AUTH-FAIL] Langfuse returned 401 -- key pair is NOT valid in this Langfuse instance.
```

→ Operator re-rotates per W329-D-3 §2; updates (f2); relaunches CC; re-runs e2e.

### Case E: trio-3 exit 3 (no traces)

```
[NO-TRACES] Langfuse auth OK but no traces in last 600s.
```

→ Operator restarts CC, triggers a tool call (e.g. `ls`), waits 30s, re-runs e2e.

### Case F: trio-3 exit 4 (header missing)

```
[HEADER-MISSING] OTEL_EXPORTER_OTLP_HEADERS not in shell env.
```

→ Operator adds the (f5) block from W329-D-3 §4 to CLAUDE.local.md; relaunches CC; re-runs e2e.

---

## §7 — Wire-up % calculation

The e2e smoke uses this map to compute the `Achieved this run` line:

| Sub-step OK | Wire-up % achieved |
|---|---:|
| statusline-smoke only | 14% (GAP-4 only; baseline) |
| + trio-1 OK | 14% (no env vars applied yet; precondition only) |
| + trio-2 OK | 57% (4 of 7 gaps closed: GAP-1+2+5+7 closed assuming trio-1 prereq) |
| + trio-3 OK | 86% (6 of 7 gaps closed: above + GAP-3) |
| + Phase-2 RAW_API_BODIES applied (separate wave) | 100% (GAP-6 closes) |

The `Achieved this run` line reports the highest tier reached across the green sub-steps.

---

## §8 — Cardinal-rule conformance

| Rule | Status |
|---|---|
| R1 trusted primitives | ✓ HOLD |
| R2 direct-CLI hooks only | ✓ HOLD (script in `tools/`, NOT `.claude/hooks/`) |
| R3 upstream subagents | n/a |
| R4 CLAUDE.md + settings.json | ✓ HOLD (read-only) |
| R5 sandbox/permissions | ✓ HOLD |
| `self_invented_count` | 0 |

---

## §9 — References

- Trio sub-scripts:
  - `Z:/claude-sota-installed/tools/w328-trio-1-phoenix-receivers.ps1`
  - `Z:/claude-sota-installed/tools/w328-trio-2-settings-validate.ps1`
  - `Z:/claude-sota-installed/tools/w328-trio-3-langfuse-verify.ps1`
- statusLine regression: `Z:/claude-sota-installed/tools/insights-wireup/statusline-smoke.ps1` (W328-B authored)
- W328-B-1 widget-count verification: `Z:/claude-sota-installed/docs/architecture/W328-INSIGHTS-OPERATOR-ENABLED/W328-B-1-STATUSLINE-RE-SMOKE.md` (37, not 38)
- W328-B-6 trajectory: `Z:/claude-sota-installed/docs/architecture/W328-INSIGHTS-OPERATOR-ENABLED/W328-B-6-WIRE-UP-TRAJECTORY-UPDATE.md`
