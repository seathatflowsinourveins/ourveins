# W329 Stream D §3 — P0-AI-3 Langfuse SEV-1 Key Rotation + Verify Script

**Wave**: W329 Stream D · **Date**: 2026-05-19
**HEAD**: `5cf5c90`
**Charter §3**: Langfuse SEV-1 key rotation + OTEL_EXPORTER_OTLP_HEADERS wire-up (~10 min)
**Owner**: `docs/architecture/W329-OPERATOR-TRIO-SCRIPTS/*` + `tools/w328-trio-3-langfuse-verify.ps1` (STRICT-FILE-OWNERSHIP)

---

## §1 — One-line verdict

Operator workflow: revoke + regenerate Langfuse API keys in the Langfuse UI; paste the new pair into `CLAUDE.local.md (f2)`; paste the `(f5)` snippet (if not already present) that derives `OTEL_EXPORTER_OTLP_HEADERS` from `$env:LANGFUSE_*`; relaunch CC; run `tools/w328-trio-3-langfuse-verify.ps1` to verify auth + trace-flow end-to-end. The script NEVER touches `CLAUDE.local.md` and NEVER echoes literal keys.

---

## §2 — Operator step-by-step (rotation procedure)

### Step 1 — Revoke + regenerate keys in Langfuse UI

1. Open browser to **`http://127.0.0.1:3000`** (self-hosted Langfuse).
2. Sign in with the admin account (per `CLAUDE.local.md` L18 the project is `5.17.2026` id `cmpa0h6ux0003o6067jlf4jgd`; the email is `admin@local.dev` per the docker-compose `LANGFUSE_INIT_USER_EMAIL`).
3. Navigate: **Settings → API Keys** for the project (likely `eee` or `cc-oc-eval` per compose `LANGFUSE_INIT_PROJECT_ID`).
4. For each existing key pair flagged in W325-r1 SEV-1:
   - Click **Revoke** (irreversible — once revoked, every consumer with the old pair starts failing 401)
5. Click **+ Create New API Keys**:
   - Name: e.g. `cc-traces-W329`
   - Click **Create**. The UI displays the new `pk-lf-*` (Public Key) + `sk-lf-*` (Secret Key) ONCE — copy both immediately.
6. (Optional but recommended) Record the new key creation date + key-name + last-4-chars of each in your password manager so a future audit can map "which keys were active when" without storing the full literal.

**Time**: ~2-3 min.

### Step 2 — Paste new pair into CLAUDE.local.md (f2)

Open `Z:/claude-sota-installed/CLAUDE.local.md` in your editor. Locate the existing (f2) block (around line 47-56). Replace the literals on these two lines with the new pair:

```powershell
$env:LANGFUSE_PUBLIC_KEY     = '<paste-NEW-pk-lf-... here>'
$env:LANGFUSE_SECRET_KEY     = '<paste-NEW-sk-lf-... here>'
```

**Important**:
- Use single quotes `'...'` (PowerShell literal — no expansion of `$`).
- CLAUDE.local.md is **gitignored** (per CLAUDE.local.md L18); never commit it.
- Do NOT log / echo / `Write-Output` the key values during paste.

### Step 3 — Confirm `(f5)` snippet exists in CLAUDE.local.md

The (f5) snippet derives `$env:OTEL_EXPORTER_OTLP_HEADERS` from `$env:LANGFUSE_PUBLIC_KEY` + `$env:LANGFUSE_SECRET_KEY` at session start. Without it, CC's exporter sends OTLP with no auth header → Langfuse returns 401 → 0 traces ingested.

If `(f5)` is already in CLAUDE.local.md (look for the comment header `# (f5) W327 -- OTEL auth header`), no action.

If `(f5)` is NOT present, paste the block in §4 below into CLAUDE.local.md, immediately after the existing `(f2) W268 codex T3 P0-security` block.

### Step 4 — Relaunch CC (so the new env is loaded)

```powershell
# Close all CC sessions (terminate the PS process running CC)
# Relaunch via your preferred launcher (eee per CLAUDE.local.md):
. Z:\claude-sota-installed\tools\eee.ps1
```

CC reads CLAUDE.local.md at session-start; relaunching is mandatory.

### Step 5 — Run the verifier

```powershell
. Z:\claude-sota-installed\tools\w328-trio-3-langfuse-verify.ps1
```

### Step 6 — Trigger a CC tool call

In the new CC chat, ask the model to run any innocuous tool, e.g.:

```
> ls Z:/claude-sota-installed
```

This emits at least 1 OTLP trace from CC's exporter.

### Step 7 — Re-run the verifier (with trace check)

```powershell
. Z:\claude-sota-installed\tools\w328-trio-3-langfuse-verify.ps1
```

Now it should find ≥1 trace in the last 10 minutes → exit 0 SUCCESS.

**Total operator time**: ~6-10 min (per W327-B-2 §8).

---

## §3 — CLAUDE.local.md (f2) operator-paste reference

This is a **reference paste** for the (f2) block format. The block already exists; only replace the two literals.

```powershell
# (f2) W268 codex T3 P0-security: Langfuse keys live HERE (gitignored), NOT in tracked .mcp.json
#      .mcp.json uses ${LANGFUSE_*} interpolation; these env vars feed it via CC's process env.
#      Self-hosted Langfuse at :3000, project 5.17.2026 (id cmpa0h6ux0003o6067jlf4jgd).
$env:LANGFUSE_HOST           = 'http://127.0.0.1:3000'
$env:LANGFUSE_BASE_URL       = 'http://127.0.0.1:3000'
$env:LANGFUSE_PUBLIC_KEY     = '<paste-NEW-pk-lf-... here>'
$env:LANGFUSE_SECRET_KEY     = '<paste-NEW-sk-lf-... here>'
```

**Old keys to revoke** (per W325-r1 SEV-1):
- Current `(f2)` values in CLAUDE.local.md are flagged as W325-r1 SEV-1 exposed (literal-in-doc historical leak).
- Substitute placeholders: `<redacted-W329-D>` everywhere a literal would otherwise appear in any documentation file.

---

## §4 — CLAUDE.local.md (f5) operator-paste-ready snippet

If `(f5)` is missing from your CLAUDE.local.md, paste this block immediately after the (f2) block:

```powershell
# (f5) W327/W329 -- OTEL auth header for Langfuse OTel ingestion (resolves W325 GAP-3 P0).
#      Sends CC-native traces to Langfuse self-hosted :3000.
#      Format: Authorization=Basic <base64(public_key:secret_key)>
#      Per https://langfuse.com/docs/integrations/opentelemetry/get-started auth requirement.
#      Stays here (gitignored) -- NEVER in tracked settings.json.
#      DEPENDS on (f2) above which sets LANGFUSE_PUBLIC_KEY + LANGFUSE_SECRET_KEY.
#
#      Computes the header value on session-start; no literals in this file.

$_pair = "$($env:LANGFUSE_PUBLIC_KEY):$($env:LANGFUSE_SECRET_KEY)"
$_b64  = [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes($_pair))
$env:OTEL_EXPORTER_OTLP_HEADERS = "Authorization=Basic $_b64"
Remove-Variable _pair, _b64
```

**Why dynamic-derive (vs. literal Base64)**:
- Operator only ever pastes pk + sk in (f2); no separate (f5) literal to rotate.
- If keys are re-rotated in the future, only (f2) changes — (f5) auto-derives.
- Gitleaks gate has zero literal to flag.

---

## §5 — Verifier: `tools/w328-trio-3-langfuse-verify.ps1`

The verifier performs 4 checks in order:

1. **Env-var presence**: `$env:LANGFUSE_PUBLIC_KEY`, `$env:LANGFUSE_SECRET_KEY`, `$env:LANGFUSE_HOST`, `$env:OTEL_EXPORTER_OTLP_HEADERS` all set.
   - If any missing → exit 1 (NEEDS-OPERATOR) or exit 4 (HEADER-MISSING).
2. **Header structural correctness**: parse `Authorization=Basic <b64>`, decode Base64, verify result equals `${pk}:${sk}`.
   - If mismatch → exit 4 (likely (f5) computed against stale (f2); operator relaunch).
3. **Live Langfuse Basic-auth probe**: HTTP GET `${LANGFUSE_HOST}/api/public/projects` with Authorization header.
   - 200 → keys accepted.
   - 401 → exit 2 (AUTH-FAIL; rotation incomplete or wrong project).
4. **Trace flow probe**: query `/api/public/traces?fromTimestamp=<now-600s>` for recent traces.
   - ≥1 trace → exit 0 SUCCESS.
   - 0 traces → exit 3 (NO-TRACES; CC not yet restarted after (f5) paste).

### Security: what the verifier echoes

The script NEVER prints literal `pk-lf-*` or `sk-lf-*` values. It prints:
- First/last 4 chars of each key (e.g. `pk-l...4f9e`)
- First 20 chars of `OTEL_EXPORTER_OTLP_HEADERS` only, followed by `... <masked>`
- HTTP response codes
- Trace count + first 3 trace IDs (not their content)

Safe to share verifier output in screenshots / pastes.

### Exit-code map

| Code | Status | Meaning | Action |
|---|---|---|---|
| 0 | SUCCESS | All 4 checks pass | Trio-3 done; proceed to e2e-smoke |
| 1 | NEEDS-OPERATOR | LANGFUSE_PUBLIC_KEY / SECRET_KEY not in shell | Edit (f2) + relaunch CC |
| 2 | AUTH-FAIL | Langfuse returns 401 | Key pair invalid; re-rotate per §2 |
| 3 | NO-TRACES | Auth OK but no recent spans | Restart CC + trigger tool call |
| 4 | HEADER-MISSING | OTEL_EXPORTER_OTLP_HEADERS not set or stale | Add (f5) block + relaunch CC |

---

## §6 — Why this rotation is SEV-1

Per W325-r1 finding (re-cited in W327-B-2 §4):
- Prior CLAUDE.local.md (f2) `LANGFUSE_PUBLIC_KEY` and `LANGFUSE_SECRET_KEY` literals were exposed in W325 audit docs (placeholder substitutions notwithstanding; cardinal-rule R2 review caught them).
- Any actor with file-read on Z: pre-cleanup OR with git-history access to the wave-W325 commits could extract them.
- Langfuse self-hosted at `:3000` is **loopback-only** (W324 finding) so the attacker model is "local-machine compromise" — but rotation still required (defense-in-depth + W325-r1 SEV-1 process).

Once rotated:
- Old keys return 401 on `/api/public/*` → exposed historical leak is neutralized.
- New keys live only in gitignored CLAUDE.local.md.
- Audit trail: Langfuse UI logs "Key X revoked at TIMESTAMP by USER_X".

---

## §7 — Security: redaction protocol for any debug output

If you need to share verifier output for debugging:
- The verifier already masks literals; safe-to-share by default.
- If you copy `$env:OTEL_EXPORTER_OTLP_HEADERS` for any reason (e.g. comparing against `OTEL_EXPORTER_OTLP_HEADERS` set differently), replace the Base64 with `<redacted-W329-D>` before pasting anywhere.
- gitleaks pre-commit hook will catch literal pk-lf-* / sk-lf-* attempts to commit.

---

## §8 — Cardinal-rule conformance

| Rule | Status |
|---|---|
| R1 trusted primitives | ✓ HOLD (Langfuse OTel docs cited) |
| R2 direct-CLI hooks only | ✓ HOLD (verifier in `tools/`, not under `.claude/hooks/`) |
| R3 upstream subagents | n/a |
| R4 CLAUDE.md + settings.json | ✓ HOLD (CLAUDE.local.md is operator-edited; verifier does NOT touch it) |
| R5 sandbox/permissions | ✓ HOLD |
| `self_invented_count` | 0 |

---

## §9 — References

- W327-B-2 (source of (f5) snippet design): `Z:/claude-sota-installed/docs/architecture/W327-INSIGHTS-FINAL/W327-B-2-OTEL-HEADER-PASTE-READY.md`
- W328-B-7 carry (Langfuse SEV-1 rotation pending): per STREAM-B-SYNTHESIS §2 P0-AI-3
- Langfuse OTel doc: `https://langfuse.com/docs/integrations/opentelemetry/get-started`
- OTEL_EXPORTER_OTLP_HEADERS spec: `https://opentelemetry.io/docs/specs/otel/protocol/exporter/#configuration-options`
- Self-hosted Langfuse compose: `Z:/claude-hub/observability/docker-compose.yml` services `langfuse-web` + `langfuse-postgres` + `langfuse-clickhouse`
- Live state (2026-05-19): Langfuse `/api/public/ready` → 200; `:3000` listening
- CLAUDE.local.md (f2) target: lines ~47-56 (per W327-B-2 §6 audit)
