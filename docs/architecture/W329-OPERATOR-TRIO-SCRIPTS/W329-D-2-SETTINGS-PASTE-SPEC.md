# W329 Stream D §2 — P0-AI-2 settings.json env Paste Spec + Validator

**Wave**: W329 Stream D · **Date**: 2026-05-19
**HEAD**: `5cf5c90`
**Charter §2**: settings.json env paste-ready spec (NO auto-apply; operator-decision)
**Owner**: `docs/architecture/W329-OPERATOR-TRIO-SCRIPTS/*` + `tools/w328-trio-2-settings-validate.ps1` (STRICT-FILE-OWNERSHIP)

---

## §1 — One-line verdict

8 JSON lines to paste into `.claude/settings.json`'s `"env"` block. 2 privacy keys (Phase-1) + 6 OTLP exporter keys (Phoenix routing for metrics + logs). Pre-state: settings.json has 7 OTEL keys; needs 8 more (validator: `tools/w328-trio-2-settings-validate.ps1`). The validator does NOT modify settings.json — it parses + smoke-tests.

---

## §2 — Current settings.json env state (re-verified 2026-05-19 ~17:20Z)

```text
Z:/claude-sota-installed/.claude/settings.json (16,464 bytes, JSON valid)
  env (33 keys total; 7 OTEL-related):
    CLAUDE_CODE_ENABLE_TELEMETRY                       = "1"
    OTEL_TRACES_EXPORTER                                = "otlp"
    OTEL_EXPORTER_OTLP_TRACES_ENDPOINT                  = "http://127.0.0.1:3000/api/public/otel/v1/traces"
    OTEL_EXPORTER_OTLP_TRACES_PROTOCOL                  = "http/protobuf"
    OTEL_RESOURCE_ATTRIBUTES                            = "openinference.project.name=eee"
    OTEL_SEMCONV_STABILITY_OPT_IN                       = "gen_ai_latest_experimental"
    OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT  = "false"

  Missing (target post-P0-AI-2 paste):
    OTEL_LOG_TOOL_DETAILS                = "1"                                                  // Phase-1 privacy
    OTEL_LOG_USER_PROMPTS                = "1"                                                  // Phase-1 privacy
    OTEL_METRICS_EXPORTER                = "otlp"                                               // metrics routing
    OTEL_EXPORTER_OTLP_METRICS_ENDPOINT  = "http://127.0.0.1:16006/v1/metrics"                  // → Phoenix
    OTEL_EXPORTER_OTLP_METRICS_PROTOCOL  = "http/protobuf"                                      // standard
    OTEL_LOGS_EXPORTER                   = "otlp"                                               // logs routing
    OTEL_EXPORTER_OTLP_LOGS_ENDPOINT     = "http://127.0.0.1:16006/v1/logs"                     // → Phoenix
    OTEL_EXPORTER_OTLP_LOGS_PROTOCOL     = "http/protobuf"                                      // standard
```

Byte budget: 16,464 + ~440 = 16,904 / 50,000 (~34%). Plenty of headroom.

---

## §3 — Paste-ready JSON block

**Where**: `Z:/claude-sota-installed/.claude/settings.json` → top-level `"env": { ... }` object.

**Insertion point** (recommended): immediately after `OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT` (currently line ~28). This forms a contiguous OTEL group.

**Block to paste verbatim**:

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

**Critical JSON rules** (the validator will catch all 3):
1. The line **immediately above** the inserted block must end with a comma. If it currently doesn't (last key in env), add the comma.
2. Each inserted line ends with a comma EXCEPT possibly the last (depends on whether more env keys follow). Easiest: leave trailing comma on the last inserted line as shown, then keep the next line below it as another env key. JSON parsers reject trailing-comma on the FINAL key in an object.
3. Use ASCII straight quotes `"`, NOT curly smart quotes (a common copy-paste failure on macOS Notes).

**Note**: 6 of the 8 keys are the "6 OTEL keys" referenced by the W328 charter (the OTLP exporter set). The other 2 (`OTEL_LOG_TOOL_DETAILS` + `OTEL_LOG_USER_PROMPTS`) are the privacy Phase-1 set.

---

## §4 — Note on `OTEL_EXPORTER_OTLP_HEADERS`

The paste above does NOT include `OTEL_EXPORTER_OTLP_HEADERS`. That header is set in `CLAUDE.local.md (f5)` (per W329-D-3), NOT in settings.json. Rationale:

- settings.json is **git-tracked**; any literal that could leak via SHA-pinned commits is a security concern.
- The `(f5)` snippet computes the Basic-auth Base64 dynamically from `$env:LANGFUSE_PUBLIC_KEY` + `$env:LANGFUSE_SECRET_KEY`, which live in CLAUDE.local.md (gitignored).
- Phoenix accepts unauthenticated OTLP on `127.0.0.1`, so the header is only needed for the Langfuse traces export — already configured.

---

## §5 — Validation: `tools/w328-trio-2-settings-validate.ps1`

The validator is read-only with respect to settings.json. It:

1. Confirms file exists + parses as JSON (catches the trailing-comma class of paste errors).
2. Confirms all 8 required keys are present with matching values.
3. Optionally (`-RunSmoke`) probes Phoenix `/v1/metrics` + `/v1/logs` to confirm receivers are still 200 (P0-AI-1 prerequisite).

### Operator invocation

```powershell
# (1) Static check immediately after the paste (no CC restart needed)
. Z:\claude-sota-installed\tools\w328-trio-2-settings-validate.ps1

# (2) Full smoke (after operator restarts CC + triggers any tool call)
. Z:\claude-sota-installed\tools\w328-trio-2-settings-validate.ps1 -RunSmoke
```

### Expected output (SUCCESS)

```
=== w328-trio-2-settings-validate.ps1 (W329 Stream D) ===
[OK] Found: Z:\claude-sota-installed\.claude\settings.json
[OK] settings.json parses as valid JSON.
[OK] All 8 required OTEL keys present with expected values.
  OTEL_LOG_TOOL_DETAILS = 1
  OTEL_LOG_USER_PROMPTS = 1
  ...
```

### Exit codes

| Code | Status | Meaning | Action |
|---|---|---|---|
| 0 | OK | All 8 keys present + JSON valid | Proceed to trio-3 |
| 1 | NEEDS-OPERATOR | Missing 1+ keys, or value mismatch | Re-paste from §3 verbatim |
| 2 | PARSE-FAIL | JSON syntax error (trailing comma, smart quotes) | Inspect with `node -e "JSON.parse(...)"` |
| 3 | NO-TRACES | Keys OK + Phoenix receivers OK but no recent spans | Restart CC + trigger tool call |

---

## §6 — Post-paste operator workflow

```powershell
# 1. Open settings.json in editor
notepad Z:\claude-sota-installed\.claude\settings.json
#    OR
code Z:\claude-sota-installed\.claude\settings.json

# 2. Paste the §3 block into the env object (after OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT)

# 3. Save

# 4. Validate JSON didn't break
. Z:\claude-sota-installed\tools\w328-trio-2-settings-validate.ps1

# 5. Restart CC (close all CC sessions, relaunch via eee.ps1)

# 6. In a fresh CC chat, trigger any tool (e.g. operator asks "ls Z:")

# 7. Run smoke test
. Z:\claude-sota-installed\tools\w328-trio-2-settings-validate.ps1 -RunSmoke

# 8. Verify Phoenix UI shows CC-emitted metrics + logs
#    Open http://127.0.0.1:16006 in browser; click Spans / Metrics tab.
```

Total operator time: ~2 min for paste + JSON-validate; ~1 min for restart + tool-call + smoke.

---

## §7 — Why these 8 keys close 4 of 7 gaps

Per W328-B-6 trajectory:

| Gap | Description | This paste closes? |
|---|---|---|
| GAP-1 | Metrics exporter unset | ✓ closes (assuming P0-AI-1 done) |
| GAP-2 | Logs exporter unset | ✓ closes (assuming P0-AI-1 done) |
| GAP-3 | Langfuse auth header missing | ✗ (handled by P0-AI-3) |
| GAP-4 | statusLine block absent | (already closed W326-A) |
| GAP-5 | OTEL_LOG_TOOL_DETAILS unset | ✓ closes |
| GAP-6 | OTEL_LOG_RAW_API_BODIES unset | ✗ (deferred Phase-2) |
| GAP-7 | OTEL_LOG_USER_PROMPTS unset | ✓ closes |

**Closes 4 of 7 gaps** with this single paste. Combined with P0-AI-1 (precondition) and P0-AI-3 (auth header) → 6 of 7 → 86%.

---

## §8 — Cardinal-rule conformance

| Rule | Status |
|---|---|
| R1 trusted primitives | ✓ HOLD (OTEL env-vars are upstream-spec) |
| R2 direct-CLI hooks only | ✓ HOLD (validator in `tools/`, NOT `.claude/hooks/`) |
| R3 upstream subagents | n/a |
| R4 CLAUDE.md + settings.json | ✓ HOLD (paste is `env:` block — legitimate CC config) |
| R5 sandbox/permissions | ✓ HOLD (no permission edits) |
| `self_invented_count` | 0 (validator under `tools/`, operator-curated) |

---

## §9 — References

- W328-B-4 privacy Phase-1: `Z:/claude-sota-installed/docs/architecture/W328-INSIGHTS-OPERATOR-ENABLED/W328-B-4-PRIVACY-OPT-INS-PHASE-1.md`
- W328-B-5 metrics+logs wire: `Z:/claude-sota-installed/docs/architecture/W328-INSIGHTS-OPERATOR-ENABLED/W328-B-5-METRICS-LOGS-PHOENIX-WIRE.md` Option A
- W328-B Stream-B synthesis P0-AI-2: `Z:/claude-sota-installed/docs/architecture/W328-INSIGHTS-OPERATOR-ENABLED/STREAM-B-SYNTHESIS.md` §2
- CC monitoring docs (canonical env-var list): `https://docs.anthropic.com/en/docs/claude-code/monitoring`
- OTLP exporter env spec: `https://opentelemetry.io/docs/specs/otel/protocol/exporter/#configuration-options`
- Live state probe (2026-05-19 ~17:20Z): 7 OTEL keys in env; settings.json 16,464 bytes
