# W327 Stream B — F2: OTEL Auth Header Paste-Ready Spec for Operator CLAUDE.local.md

**Wave**: W327 Stream B · **Date**: 2026-05-19
**HEAD**: `569080a`
**Source**: W325 Stream A GAP-3 (P0 CRITICAL — Langfuse traces blocked)
**Owner**: docs/architecture/W327-INSIGHTS-FINAL/* — STRICT-FILE-OWNERSHIP
**Verdict for this dimension**: **BLOCKING-OPERATOR** — paste-ready spec drafted; key rotation required first; cannot self-apply (cardinal-rule no settings/CLAUDE.local.md edits this stream).

---

## §1 — Why this is the highest-priority Insights gap

Per W325 Stream A §2.1 + STREAM-A-LANGFUSE-DATA-VERIFY.md §1:
- Langfuse :3000 OTel ingest endpoint live + auth-accepting (verified HTTP 200 on `/api/public/ready` this session)
- `OTEL_EXPORTER_OTLP_HEADERS` UNSET in `.claude/settings.json:env` → ALL CC traces being rejected with HTTP 401
- 0 CC-native spans in Langfuse despite hundreds of CC sessions

The fix is a 1-line env-var ADD to CLAUDE.local.md. The blockers are: (a) operator Langfuse SEV-1 key rotation pending (per W326 closure carry); (b) cardinal-rule-2 + this-stream charter prohibits editing CLAUDE.local.md.

---

## §2 — Langfuse OTel doc citation chain

**Primary doc** (Langfuse OpenTelemetry getting-started):
- `https://langfuse.com/docs/integrations/opentelemetry/get-started`
- Live URL probe this session: `200 OK` on `/api/public/ready` confirms Langfuse alive at `http://127.0.0.1:3000`

**Required header per Langfuse doc**:
- `Authorization=Basic <base64(LANGFUSE_PUBLIC_KEY:LANGFUSE_SECRET_KEY)>`
- Auth scheme: HTTP Basic over the OTLP HTTP endpoint
- Endpoint shape: `${LANGFUSE_HOST}/api/public/otel/v1/traces` (settings.json L… `OTEL_EXPORTER_OTLP_TRACES_ENDPOINT` already set; only the header is missing)

**OTel spec reference** (vendor-neutral):
- `https://opentelemetry.io/docs/specs/otel/protocol/exporter/#configuration-options` — `OTEL_EXPORTER_OTLP_HEADERS` is the canonical env-var name for adding HTTP headers to all signals (or use `OTEL_EXPORTER_OTLP_TRACES_HEADERS` for trace-signal-specific)
- Format: `key1=value1,key2=value2` (comma-separated)
- Whitespace around `=` matters in some implementations; safest form is no-space (`Authorization=Basic <b64>`)

---

## §3 — Paste-ready PowerShell snippet for CLAUDE.local.md

**Location**: append to existing `## Z:-portable install ENV block` section, after the `(f2) W268 codex T3 P0-security` block (which already follows this pattern for Langfuse keys).

```powershell
# (f5) W327 — OTEL auth header for Langfuse OTel ingestion (resolves W325 GAP-3 P0).
#      Sends CC-native traces to Langfuse self-hosted :3000.
#      Format: Authorization=Basic <base64(public_key:secret_key)>
#      Per https://langfuse.com/docs/integrations/opentelemetry/get-started auth requirement.
#      Stays here (gitignored) — NEVER in tracked settings.json.
#      DEPENDS on (f2) above which sets LANGFUSE_PUBLIC_KEY + LANGFUSE_SECRET_KEY.
#
#      Compute the header value on session-start via PS expression:

$_pair = "$($env:LANGFUSE_PUBLIC_KEY):$($env:LANGFUSE_SECRET_KEY)"
$_b64  = [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes($_pair))
$env:OTEL_EXPORTER_OTLP_HEADERS = "Authorization=Basic $_b64"
Remove-Variable _pair, _b64
```

**Why this form**:
- **Live-derives** from `$env:LANGFUSE_PUBLIC_KEY` + `$env:LANGFUSE_SECRET_KEY` already set at (f2)
- **No literal keys** in CLAUDE.local.md beyond what (f2) already exposes (operator key rotation only touches (f2) — (f5) auto-rebuilds the header)
- **Cleans up** intermediate vars to keep PS env clean
- **One-time** compute on session start; no per-call overhead

**Alternative — literal base64 form** (use ONLY if you cannot rely on (f2) being set first):

```powershell
# (f5-alt) Literal form — paste actual base64 string (only use if (f2) order-of-evaluation issue)
$env:OTEL_EXPORTER_OTLP_HEADERS = 'Authorization=Basic <redacted-W327>'
# To compute the literal value:
#   $_pair = 'pk-lf-<your-pub>:sk-lf-<your-sec>'
#   [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes($_pair))
```

The dynamic form (no-literal) is preferred; documented as primary spec.

---

## §4 — Pre-paste DEPENDENCY chain

**MUST be resolved before (f5) paste lands operator value**:

1. **Operator Langfuse SEV-1 key rotation pending** (per W326 closure carry):
   - W325-r1 + this Stream B + prior streams cite that the previous LANGFUSE_PUBLIC_KEY / LANGFUSE_SECRET_KEY in CLAUDE.local.md (f2) were exposed in W325 docs as literal `pk-lf-<redacted-W327>` / `sk-lf-<redacted-W327>`
   - Operator-action: log into self-hosted Langfuse `:3000` → Settings → API keys → Revoke both pk-lf-... + sk-lf-... → Issue new pair → Update CLAUDE.local.md (f2) `$env:LANGFUSE_PUBLIC_KEY` + `$env:LANGFUSE_SECRET_KEY` with new values
   - After rotation, (f5) snippet above derives the new header automatically — no separate update to (f5)
   - **Reference** for rotation procedure: Langfuse self-hosted admin UI (no upstream doc URL needed for self-hosted UI flow; consult local `/admin` panel)

2. **Operator confirms self-hosted Langfuse project ID** still matches CLAUDE.local.md context:
   - W325 carry-line in CLAUDE.local.md notes: `Self-hosted Langfuse at :3000, project 5.17.2026 (id cmpa0h6ux0003o6067jlf4jgd)`
   - Settings.json env should reference `OTEL_RESOURCE_ATTRIBUTES=openinference.project.name=eee` (or whichever project the rotated keys are scoped to)
   - **If rotation moves to a new project**, also update settings.json `OTEL_RESOURCE_ATTRIBUTES` — that's a tracked-settings edit (not this stream's scope; flag for W328 operator-AI)

---

## §5 — Post-rotation SMOKE test sequence

Once operator completes (f5) paste + key rotation:

### Step 1 — Restart CC session
```powershell
# In a fresh PS session
. .\tools\eee.ps1  # OR equivalent CC launcher per CLAUDE.local.md§Launcher
# Confirms (f5) `$env:OTEL_EXPORTER_OTLP_HEADERS` is set on launch
```

### Step 2 — Verify env-var visible to CC
```powershell
$env:OTEL_EXPORTER_OTLP_HEADERS
# Expected: 'Authorization=Basic <new-base64>'
# If empty: (f5) snippet failed (likely (f2) key vars unset); re-check CLAUDE.local.md sourcing order
```

### Step 3 — Trigger a CC tool use
Within the new CC session, run any innocuous tool call. Example:
```
> ls Z:/claude-sota-installed
```
This generates at least 1 OTel span (the Bash tool invocation).

### Step 4 — Verify Langfuse ingested the trace
```powershell
$pair = "$($env:LANGFUSE_PUBLIC_KEY):$($env:LANGFUSE_SECRET_KEY)"
$b64  = [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes($pair))
curl -sS -H "Authorization: Basic $b64" "$($env:LANGFUSE_HOST)/api/public/traces?limit=10" `
  | ConvertFrom-Json `
  | Select -ExpandProperty data `
  | Select id, name, timestamp `
  | Format-Table -AutoSize
```

**Expected output**: 1+ new traces with names matching `claude_code.*` or `chat` or `tool_use`, timestamped within ~10s of the Step-3 invocation.

**If 0 new traces**:
- Check `$env:OTEL_EXPORTER_OTLP_TRACES_ENDPOINT` is `http://127.0.0.1:3000/api/public/otel/v1/traces` (already-set per W325 audit)
- Check `$env:CLAUDE_CODE_ENABLE_TELEMETRY` is `1` (already-set per W325 audit)
- Check `$env:OTEL_TRACES_EXPORTER` is `otlp` (already-set per W325 audit)
- Tail CC stderr/debug logs for OTel exporter errors: `Get-Content "$env:CLAUDE_CODE_DEBUG_LOGS_DIR/*.log" -Tail 50 | Select-String -Pattern 'otel|trace|export'`

### Step 5 — Verify trace structure (Langfuse UI)
Open `http://127.0.0.1:3000` in browser → navigate to project (eee) → Traces view. New traces should show:
- name: derived from CC tool invocation
- input/output: empty if `OTEL_LOG_TOOL_DETAILS` is unset (next-stream's privacy opt-in)
- span tree: chat → tool_use(Bash) → result
- resource attributes: `openinference.project.name=eee` per OTEL_RESOURCE_ATTRIBUTES

---

## §6 — Security posture

### Secrets-handling review

| Surface | Contains literal keys? | Gitignored? | OK? |
|---|---|---|---|
| `CLAUDE.local.md` (f2) — LANGFUSE_PUBLIC_KEY / LANGFUSE_SECRET_KEY | YES — literal | YES (per `.gitignore` + CLAUDE.local.md L18) | ✓ |
| `CLAUDE.local.md` (f5) — OTEL_EXPORTER_OTLP_HEADERS | NO — derived from (f2) at runtime | YES (same file) | ✓ |
| `.claude/settings.json` — env block | NO — never has literal keys | TRACKED | ✓ |
| `.mcp.json` — langfuse server entry | NO — uses `${LANGFUSE_*}` interpolation | TRACKED | ✓ |

**No new secret exposure**. The base64 of `pk:sk` is reversible — anyone with the base64 has both keys. Keeping it derived (not literal) in CLAUDE.local.md adds defense-in-depth: if the gitignored file leaks through some channel, the static base64 still has to be regenerated each session from the underlying pk+sk pair.

### W325 docs key-redaction status

Per W326 closure note: W325 audit docs (e.g. `STREAM-A-GAP-AND-RECOMMENDATIONS.md` §1.3, `STREAM-A-LANGFUSE-DATA-VERIFY.md`) reference the historical keys as `<REDACTED-W325-r1-SEV-1>` / `<REDACTED-W325-r1-SEV-1-base64>` placeholders. After operator rotation lands, these can stay redacted (the audited keys are now-invalid; placeholders are correct).

### gitleaks gate

The dynamic form in (f5) above contains NO literal secrets. Even if CLAUDE.local.md is misconfigured-tracked (`git add -f`), gitleaks won't trigger on `$env:OTEL_EXPORTER_OTLP_HEADERS = "Authorization=Basic $_b64"` because there's no high-entropy literal.

---

## §7 — Insights wire-up % contribution

This dimension addresses **GAP-3 (P0 CRITICAL — Langfuse auth header missing)**, which is the single highest-impact Insights gap per W325 Stream A.

**Current state**: not yet closed (operator-action required — key rotation + (f5) paste).
**Post-operator-action**: closed → +1 of 4 P0 gaps → +25% of CRITICAL bucket.

**Cumulative Insights wire-up after this dimension closes**:
- 2 of 4 P0 closed (GAP-3 + GAP-4 statusLine via W326-A F1)
- Net: 50% of CRITICAL bucket
- Remaining: GAP-1 (metrics) + GAP-2 (logs) — see W327-B-4 doc

---

## §8 — Operator-action checklist

| # | Action | Where | Time |
|---|---|---|---|
| 1 | Rotate Langfuse keys at `http://127.0.0.1:3000` admin UI | Browser | ~2 min |
| 2 | Update (f2) `$env:LANGFUSE_PUBLIC_KEY` + `$env:LANGFUSE_SECRET_KEY` in `Z:/claude-sota-installed/CLAUDE.local.md` | Editor | ~1 min |
| 3 | Append (f5) snippet from §3 above to `Z:/claude-sota-installed/CLAUDE.local.md` | Editor | ~1 min |
| 4 | Restart CC session (close + reopen) | CC | ~30s |
| 5 | Verify `$env:OTEL_EXPORTER_OTLP_HEADERS` is set | PS | ~5s |
| 6 | Trigger a CC tool use, verify Langfuse traces view shows new spans | Browser + CC | ~2 min |

**Total operator time**: ~6 min.
**Dependencies**: Langfuse :3000 admin UI access; PS shell.
**Reversibility**: 1-line revert of (f5) snippet; (f2) rotation is one-way (must keep new keys).

---

## §9 — Cardinal-rule conformance

| Rule | Status | Notes |
|---|---|---|
| R1 (trusted-source primitives) | ✓ HOLD | OTEL spec env-var + Langfuse doc cited |
| R2 (hooks = upstream OR direct-CLI) | ✓ HOLD | No hook addition |
| R3 (subagents = upstream) | n/a | Not a subagent change |
| R4 (project behavior in CLAUDE.md + settings.json) | ✓ HOLD | CLAUDE.local.md is operator's per-machine pref file (W259-v8 docs); env-var lives there per W325-A Path-B recommendation |
| R5 (sandbox/permissions) | ✓ HOLD (no change) | No permission edit |

**This stream**: 0 file edits to settings.json / .mcp.json / CLAUDE.local.md — full charter compliance. All paste-ready operator-action.

`self_invented_count: 0` — paste-ready spec only.

---

## §10 — References

- **W325 GAP-3 source**: `Z:/claude-sota-installed/docs/architecture/W325-INSIGHTS-AUDIT/STREAM-A-GAP-AND-RECOMMENDATIONS.md` §1.3
- **W325 synthesis**: `Z:/claude-sota-installed/docs/architecture/W325-INSIGHTS-AUDIT/STREAM-A-SYNTHESIS.md` §2.1
- **Langfuse OTel doc**: `https://langfuse.com/docs/integrations/opentelemetry/get-started`
- **OTel spec**: `https://opentelemetry.io/docs/specs/otel/protocol/exporter/#configuration-options`
- **CLAUDE.local.md (f2) precedent**: `Z:/claude-sota-installed/CLAUDE.local.md` lines 47-56 (Langfuse keys env-var pattern)
- **W326 closure carry**: `Z:/claude-sota-installed/docs/architecture/W326-SETTINGS-FIXES/STREAM-A-SYNTHESIS.md` §4 (Langfuse SEV-1 carry)
