# W328 Stream B §4 — Privacy Opt-Ins Phase-1 Paste-Ready Spec

**Wave**: W328 Stream B · **Date**: 2026-05-19
**HEAD**: `2c48b1e`
**Charter §4**: Privacy opt-ins phase-1 paste-ready ENV block additions for settings.json
**Owner**: docs/architecture/W328-INSIGHTS-OPERATOR-ENABLED/* (STRICT-FILE-OWNERSHIP)
**Decision**: This stream produces paste-ready spec ONLY. settings.json edits remain operator-decision.

---

## §1 — One-line verdict

**Recommend Phase-1 = `OTEL_LOG_TOOL_DETAILS=1` + `OTEL_LOG_USER_PROMPTS=1`**. Defer `OTEL_LOG_RAW_API_BODIES=1` to Phase-2 until Langfuse SEV-1 key rotation (W327-B-2 carry) completes — RAW_API_BODIES enriches traces with full request/response payloads which is the highest-fidelity-but-also-highest-exposure data class.

---

## §2 — Current settings.json env block (OTEL-related keys only)

```
CLAUDE_CODE_ENABLE_TELEMETRY=1                                    # ✓ telemetry master-switch on
OTEL_TRACES_EXPORTER=otlp                                         # ✓ traces routed to OTLP
OTEL_EXPORTER_OTLP_TRACES_ENDPOINT=http://127.0.0.1:3000/api/public/otel/v1/traces  # ✓ Langfuse
OTEL_EXPORTER_OTLP_TRACES_PROTOCOL=http/protobuf                  # ✓ standard
OTEL_RESOURCE_ATTRIBUTES=openinference.project.name=eee           # ✓ project tag
OTEL_SEMCONV_STABILITY_OPT_IN=gen_ai_latest_experimental          # ✓ latest semantic conventions
OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT=false          # ⚠ msg content disabled (privacy)
# UNSET: OTEL_METRICS_EXPORTER
# UNSET: OTEL_LOGS_EXPORTER
# UNSET: OTEL_LOG_TOOL_DETAILS         ← Phase-1 candidate
# UNSET: OTEL_LOG_USER_PROMPTS         ← Phase-1 candidate
# UNSET: OTEL_LOG_RAW_API_BODIES       ← Phase-2 candidate (deferred)
```

**Byte budget**: settings.json currently 16,464 bytes / ~50KB CC budget = **32% used** / **34,736 bytes headroom**. Adding the 2 Phase-1 keys consumes ~80 bytes — negligible.

---

## §3 — Phase-1 paste-ready block (PREFERRED)

**Operator opens `Z:/claude-sota-installed/.claude/settings.json` in any text editor, locates the `"env": {...}` block (around line 8-60, near the top), and inserts**:

```json
    "OTEL_LOG_TOOL_DETAILS": "1",
    "OTEL_LOG_USER_PROMPTS": "1",
```

**Insertion point**: anywhere within the `"env": {...}` object. Recommended placement: **immediately after `OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT`** so all OTEL keys form a contiguous group. Example:

```json
    "OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT": "false",
    "OTEL_LOG_TOOL_DETAILS": "1",
    "OTEL_LOG_USER_PROMPTS": "1",
    "CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY": "1",
```

**Critical**: ensure trailing-commas only on lines that are NOT the last key in the env object. Standard JSON rule.

---

## §4 — Phase-2 paste-ready block (DEFERRED — apply only after Phase-1 stable + Langfuse key rotation complete)

```json
    "OTEL_LOG_RAW_API_BODIES": "1",
```

**Insertion point**: same env block, after `OTEL_LOG_USER_PROMPTS`.

**Why deferred**:
- W327-B-2 documented Langfuse SEV-1 key-rotation pending — old `pk-lf-*` / `sk-lf-*` keys are POTENTIALLY exposed (W325-r1 finding). Until those are rotated + revoked, sending raw API bodies (full request/response JSON including system prompts, tool definitions, complete model output) to Langfuse risks enriching a trace store that may have been accessed by an attacker.
- Once Langfuse keys are rotated AND the rotation is verified (W328-B-7 SYNTHESIS P0 item), Phase-2 is safe to apply.

---

## §5 — Risk classification (re-confirmation of W327-B-5)

| Variable | Risk class | Data exposed | PII level |
|---|---|---|---|
| `OTEL_LOG_TOOL_DETAILS=1` | LOW | Tool names + parameter names invoked (e.g. "Read file_path=...") | Operator-controlled (paths, queries — no creds in tool params per gitleaks gate) |
| `OTEL_LOG_USER_PROMPTS=1` | LOW-MEDIUM | User prompts CC receives (operator messages) | Operator-controlled (operator writes the prompts; can self-censor if needed) |
| `OTEL_LOG_RAW_API_BODIES=1` | MEDIUM-HIGH | Full model API req/resp JSON including system prompt + tool schemas + complete model output | Includes file content, conversation history, all OS data ingested — operator-controlled but high-fidelity |

**Mitigation context**: this runtime is **local-only infrastructure**:
- Langfuse: `http://127.0.0.1:3000` (loopback-only)
- Phoenix: `http://127.0.0.1:16006` (loopback-only)
- No external trace egress
- Single-operator system
- Disk-encryption at rest (operator-controlled via BitLocker on Z:)

→ The PII surface is local-disk-only. The attacker model is "physical / local-account access" (already a full-compromise), not "external network exfiltration". Under that model, all 3 opt-ins are SAFE-WITH-CAVEATS.

**The caveat** remains the W327-B-2 key-rotation carry: if a prior leaked key gives an external party Langfuse-API access via the `:3000` listener (which is local-only, so they'd need local-net or VPN access), then trace bodies become readable. Until rotation completes, Phase-2 is held.

---

## §6 — Verification post-Phase-1

After operator applies the Phase-1 block and restarts CC (or applies `/reload-plugins` carefully per W328-B-3):

```powershell
# (a) Confirm env vars present in CC process:
# In a CC chat: invoke a Bash command that prints both vars
echo $env:OTEL_LOG_TOOL_DETAILS  # expect: 1
echo $env:OTEL_LOG_USER_PROMPTS  # expect: 1

# (b) Send a test trace via any CC tool call (any Read/Grep/Bash will do)
# Then check Langfuse UI at http://127.0.0.1:3000
# Navigate to: Traces → most recent → inspect the span attributes
# Expect to see: tool name + tool parameters (TOOL_DETAILS) + user prompt (USER_PROMPTS)
```

**Success criteria**: trace spans show new `tool_details` + `user_prompts` attributes that were missing pre-Phase-1.

**Failure modes + mitigation**:
- Vars set but no enrichment in traces → CC may not honor these vars (check CC version supports them; per `https://docs.anthropic.com/en/docs/claude-code/monitoring` they should)
- Trace volume spike — Langfuse DB grows ~2-5x faster (each trace enriched with more data)
- → mitigation: configure Langfuse trace retention policy (W327-B-F5-3 forward-AI)

---

## §7 — Phase-1 closure of W325 gaps GAP-5 + GAP-7

| Gap | Description | Pre-W328 | Post-Phase-1 |
|---|---|---|---|
| GAP-5 | `OTEL_LOG_TOOL_DETAILS` unset → traces missing tool context | OPEN | CLOSES after operator paste |
| GAP-7 | `OTEL_LOG_USER_PROMPTS` unset → traces missing user prompt context | OPEN | CLOSES after operator paste |
| GAP-6 | `OTEL_LOG_RAW_API_BODIES` unset → traces missing full payload | OPEN | DEFERRED to Phase-2 |

**Net** (after Phase-1 applies): 2 of 3 P1-MEDIUM gaps closed = 67% of P1 bucket.

---

## §8 — Risk-mitigation recipe (operator wants Phase-2 SOON)

If operator decides to land Phase-2 in W328 (despite the rotation carry):

1. Rotate Langfuse keys FIRST (W328-B-7 P0 item — Langfuse admin UI at `http://127.0.0.1:3000/setup`)
2. Update `CLAUDE.local.md` `$env:LANGFUSE_PUBLIC_KEY` + `$env:LANGFUSE_SECRET_KEY` lines (W327-B-2 (f5) paste)
3. Restart CC (or `/reload-plugins`)
4. Verify traces flow with new keys (Langfuse UI shows new traces)
5. ONLY THEN: apply Phase-2 `OTEL_LOG_RAW_API_BODIES=1` paste
6. Verify Phase-2 traces include the new full-payload attribute

**Total time**: ~15-20 minutes operator effort if all 6 steps performed sequentially.

---

## §9 — Cardinal-rule verification

| Rule | Status (this doc — no edits) | Status (post-operator-paste) |
|---|---|---|
| R1 trusted primitives | ✓ HOLD | ✓ HOLD (OTEL is standard) |
| R2 direct-CLI hooks | n/a | n/a |
| R3 upstream subagents | n/a | n/a |
| R4 CLAUDE.md + settings.json | ✓ HOLD | ✓ HOLD (env block is legitimate CLAUDE config) |
| R5 sandbox/permissions | ✓ HOLD | ✓ HOLD |
| `self_invented_count` | 0 | 0 |

---

## §10 — References

- W325-B-5 source: `Z:/claude-sota-installed/docs/architecture/W325-INSIGHTS-AUDIT/STREAM-A-GAP-AND-RECOMMENDATIONS.md` §5
- W327-B-5 prior: `Z:/claude-sota-installed/docs/architecture/W327-INSIGHTS-FINAL/W327-B-5-PRIVACY-OPT-INS.md`
- CC monitoring docs: `https://docs.anthropic.com/en/docs/claude-code/monitoring`
- OTEL log opt-ins spec: CC-specific extension to OpenTelemetry — see Anthropic CC docs
- Langfuse OTEL ingest: `https://langfuse.com/docs/integrations/opentelemetry/get-started`
- Live byte-budget probe (this session): 16,464 / 50,000 used = 33% — 34,736 bytes headroom
