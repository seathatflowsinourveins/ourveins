# W329 Stream D — Operator-Trio Scripts Synthesis

**Wave**: W329 Stream D · **Date**: 2026-05-19
**HEAD**: `5cf5c90`
**Stream D charter**: Produce paste-ready PowerShell scripts for the 3 P0 operator-AIs (Phoenix receivers + settings.json env paste + Langfuse rotation) + an E2E smoke that verifies the full trio
**Owner**: `docs/architecture/W329-OPERATOR-TRIO-SCRIPTS/*` + `tools/w328-trio-*.ps1` (STRICT-FILE-OWNERSHIP)
**Wall-clock**: ~25 min (within budget)
**Verdict**: **SHIP** — 4 paste-ready PS1 scripts + 5 docs delivered; 0 settings.json/CLAUDE.local.md edits (per charter); 0 cardinal-rule violations.

---

## §1 — Files delivered

### Scripts (under `tools/` — NOT `.claude/hooks/`)

| Path | Bytes | Purpose | Idempotent? | Cardinal-rule scope |
|---|---:|---|---|---|
| `tools/w328-trio-1-phoenix-receivers.ps1` | ~9.0 KB | P0-AI-1: edit docker-compose to enable `PHOENIX_ENABLE_METRICS_RECEIVER` + `PHOENIX_ENABLE_LOGS_RECEIVER`; rolling-restart; smoke | ✓ (with `.bak` trail) | R1+R2: edits ONLY `Z:\claude-hub\observability\docker-compose.yml`; NOT settings.json/CLAUDE.local.md |
| `tools/w328-trio-2-settings-validate.ps1` | ~4.5 KB | P0-AI-2: validate operator's settings.json paste; smoke-test Phoenix span receipt | ✓ (read-only) | R1+R4: read-only on settings.json |
| `tools/w328-trio-3-langfuse-verify.ps1` | ~6.5 KB | P0-AI-3: verify (f2) key pair + (f5) header + Langfuse auth + trace flow | ✓ (read-only; masked output) | R1: read-only on CLAUDE.local.md (verifier never reads the file; reads only the resulting env vars) |
| `tools/w328-trio-e2e-smoke.ps1` | ~3.5 KB | Aggregate verifier: composite exit + wire-up % estimate | ✓ (read-only) | R1+R4: composite of read-only sub-steps |

### Docs (under `docs/architecture/W329-OPERATOR-TRIO-SCRIPTS/`)

| Path | Purpose |
|---|---|
| `W329-D-1-PHOENIX-RECEIVERS-SCRIPT.md` | Operator-paste-ready procedure for P0-AI-1 + script reference |
| `W329-D-2-SETTINGS-PASTE-SPEC.md` | The 8-line JSON block + validator reference for P0-AI-2 |
| `W329-D-3-LANGFUSE-ROTATION-SCRIPT.md` | Rotation procedure (UI + CLAUDE.local.md (f2)/(f5)) + verifier reference for P0-AI-3 |
| `W329-D-4-E2E-SMOKE.md` | Composite e2e verifier doc + failure-mode walkthrough |
| `W329-D-5-WIRE-UP-FINAL.md` | Post-trio trajectory: 14% → 86% (closes 5 of 6); remaining 14% = GAP-6 Phase-2 |
| `STREAM-D-SYNTHESIS.md` | this file |

**Total**: 4 scripts (~23.5 KB) + 6 docs (~38 KB) = 10 new files / ~61 KB.
**Touched outside owned paths**: ZERO. settings.json / .mcp.json / CLAUDE.local.md / `.claude/**` UNTOUCHED per cardinal-rule charter.

---

## §2 — Operator checklist (paste-ready, in order)

```powershell
# ===== Pre-flight (read-only sanity check; ~30s) =====
. Z:\claude-sota-installed\tools\w328-trio-1-phoenix-receivers.ps1 -DryRun
. Z:\claude-sota-installed\tools\w328-trio-2-settings-validate.ps1
. Z:\claude-sota-installed\tools\w328-trio-3-langfuse-verify.ps1


# ===== P0-AI-1: Phoenix metrics+logs receivers enable (~3 min) =====
. Z:\claude-sota-installed\tools\w328-trio-1-phoenix-receivers.ps1
# Expect exit 0; verify `metrics=200 logs=200` in [probe] line.


# ===== P0-AI-2: settings.json env block paste (~2 min) =====
# (a) Open in editor:
notepad Z:\claude-sota-installed\.claude\settings.json

# (b) Paste this block into the "env": { ... } object
#     (immediately after OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT):
#     ----------------------------------------------------------
#     "OTEL_LOG_TOOL_DETAILS": "1",
#     "OTEL_LOG_USER_PROMPTS": "1",
#     "OTEL_METRICS_EXPORTER": "otlp",
#     "OTEL_EXPORTER_OTLP_METRICS_ENDPOINT": "http://127.0.0.1:16006/v1/metrics",
#     "OTEL_EXPORTER_OTLP_METRICS_PROTOCOL": "http/protobuf",
#     "OTEL_LOGS_EXPORTER": "otlp",
#     "OTEL_EXPORTER_OTLP_LOGS_ENDPOINT": "http://127.0.0.1:16006/v1/logs",
#     "OTEL_EXPORTER_OTLP_LOGS_PROTOCOL": "http/protobuf",
#     ----------------------------------------------------------

# (c) Save, then validate JSON didn't break:
. Z:\claude-sota-installed\tools\w328-trio-2-settings-validate.ps1
# Expect exit 0.


# ===== P0-AI-3: Langfuse SEV-1 key rotation + (f5) header (~10 min) =====

# (a) Browser → http://127.0.0.1:3000 → Settings → API Keys
#     - Revoke existing pk-lf-* / sk-lf-*
#     - Create new pair; copy both values

# (b) Edit Z:\claude-sota-installed\CLAUDE.local.md
#     - Replace (f2) `$env:LANGFUSE_PUBLIC_KEY = '...'` literal with NEW pk-lf-...
#     - Replace (f2) `$env:LANGFUSE_SECRET_KEY = '...'` literal with NEW sk-lf-...
#     - Confirm (f5) block exists (computes OTEL_EXPORTER_OTLP_HEADERS); if not, paste it from W329-D-3 §4

# (c) Close all CC sessions; relaunch via eee.ps1
. Z:\claude-sota-installed\tools\eee.ps1

# (d) In fresh CC chat, trigger any tool (e.g. ask: "ls Z:/claude-sota-installed")

# (e) Verify
. Z:\claude-sota-installed\tools\w328-trio-3-langfuse-verify.ps1
# Expect exit 0 with trace count >= 1.


# ===== E2E SMOKE (~1 min) =====
. Z:\claude-sota-installed\tools\w328-trio-e2e-smoke.ps1
# Expect [VERDICT] E2E SMOKE PASS / wire-up ~86%.

# Optional: include statusLine regression
. Z:\claude-sota-installed\tools\w328-trio-e2e-smoke.ps1 -IncludeStatusLine
```

**Total operator time**: ~16 min (3 + 2 + 10 + 1).

---

## §3 — Trajectory net (end-of-stream)

| State | Wire-up % | Gaps closed |
|---|---:|---:|
| Entering W329-D | 14% | 1 of 7 (GAP-4 statusLine) |
| Exiting W329-D (no operator action yet) | 14% | 1 of 7 (this stream produced tooling, not edits) |
| Post-operator-apply trio-1 + trio-2 + trio-3 | **86%** | **6 of 7** (above + GAP-1, GAP-2, GAP-3, GAP-5, GAP-7) |
| Post-Phase-2 paste (separate wave) | 100% | 7 of 7 (above + GAP-6) |

The +72pp `14% → 86%` jump is unlocked by ~16 min of operator action, gated by:
- The 3 paste-ready scripts in `tools/`
- The 5 paste-ready spec docs in `docs/architecture/W329-OPERATOR-TRIO-SCRIPTS/`

---

## §4 — Cardinal-rule conformance (full audit)

| Rule | Pre-W329-D | Post-W329-D | Δ |
|---|---|---|---|
| R1 trusted primitives only | ✓ HOLD | ✓ HOLD | — |
| R2 direct-CLI hooks only | ✓ HOLD | ✓ HOLD (scripts in `tools/`, NOT `.claude/hooks/**`; invoked manually by operator NOT as hook) | — |
| R3 upstream subagents | ✓ HOLD | ✓ HOLD (no subagent change) | — |
| R4 CLAUDE.md + settings.json | ✓ HOLD | ✓ HOLD (this stream made NO settings.json / CLAUDE.local.md / .mcp.json edits) | — |
| R5 sandbox/permissions | ⚠ PARTIAL-HOLD (carry from W326 closure) | ⚠ PARTIAL-HOLD (untouched) | — |
| CR-9 pinned versions | ✓ HOLD | ✓ HOLD | — |
| `self_invented_count` | 0 | 0 | — |

**Scripts cardinal-rule conformance**:
- All 4 scripts live under `tools/` (operator-curated path per CLAUDE.md L42 + W329-D charter).
- None under `.claude/hooks/**` → R2 conformant.
- None modify defaultMode/sandbox/bypassPermissions → R5 conformant.
- None auto-fire — all invoked manually by operator → not hook semantics.

**Doc cardinal-rule conformance**:
- All 6 docs reference `<redacted-W329-D>` placeholders where pk-lf-* / sk-lf-* would otherwise appear.
- `gitleaks protect --staged` would PASS on all of `docs/architecture/W329-OPERATOR-TRIO-SCRIPTS/*` + `tools/w328-trio-*.ps1`.

---

## §5 — Security posture

### Secrets handling

| Surface | Contains literal keys? | Echoes literal keys? | Gitignored? | OK? |
|---|---|---|---|---|
| `tools/w328-trio-1-phoenix-receivers.ps1` | NO | NO | tracked | ✓ |
| `tools/w328-trio-2-settings-validate.ps1` | NO | NO | tracked | ✓ |
| `tools/w328-trio-3-langfuse-verify.ps1` | NO | NO (mask-Key fn) | tracked | ✓ |
| `tools/w328-trio-e2e-smoke.ps1` | NO | NO | tracked | ✓ |
| All 6 docs in `docs/architecture/W329-OPERATOR-TRIO-SCRIPTS/` | NO (`<redacted-W329-D>` placeholders) | NO | tracked | ✓ |
| `CLAUDE.local.md (f2)` | YES — operator-edited | NO (operator-only) | YES | ✓ (out of scope) |

The verifier `tools/w328-trio-3-langfuse-verify.ps1` uses a `Mask-Key` function that prints only `first4...last4` + masks the Base64 header to first 20 chars. Output is safe-to-share for debugging.

---

## §6 — Discoveries / corrections this stream

1. **Phoenix Compose file path-drift**: container labels report `Z:\claude\observability\docker-compose.yml` but the actual file lives at `Z:\claude-hub\observability\docker-compose.yml`. The trio-1 script auto-detects both candidate paths (no operator-side override needed).
2. **Phoenix env-array form**: docker-compose service uses `environment: - KEY=value` array form (lines 309-311). Trio-1 patches by inserting after `- PHOENIX_GRPC_PORT=4317` to preserve the existing form.
3. **8-key paste spec confirmed**: W328 charter mentioned "8 keys" but listed only 6 in the example. The other 2 are the privacy Phase-1 pair (`OTEL_LOG_TOOL_DETAILS` + `OTEL_LOG_USER_PROMPTS`). All 8 together close 4 of 7 gaps in one paste.
4. **Re-verified pre-state probes (2026-05-19 ~17:20Z)**:
   - `POST /v1/traces` → 200
   - `POST /v1/metrics` → 405
   - `POST /v1/logs` → 405
   - settings.json: 7 OTEL keys present (missing the 8 P0-AI-2 targets)
   - Langfuse `/api/public/ready` → 200

These re-confirm W328-B-2 observations are still valid 30 hours later — no drift since W328 closure.

---

## §7 — Forward-AIs to W330+

| # | ID | Priority | Description |
|---|---|---|---|
| 1 | W330-D-F1 | P1 | Re-measure wire-up % after operator runs the trio; expect 86% |
| 2 | W330-D-F2 | P2 | Apply Phase-2 RAW_API_BODIES paste once steady-state observed (1-line: `"OTEL_LOG_RAW_API_BODIES": "1"`) |
| 3 | W330-D-F3 | P3 | Configure Phoenix retention TTL + per-trace span cap; cite Phoenix env-var docs |
| 4 | W330-D-F4 | P3 | Diff cognee + basic-memory OTel signal emit volume (W328-B-5 §7 carry); possibly filter |
| 5 | W330-D-F5 | P3 | Document the 37-widget canonical statusLine config (W328-B-1 corrected from 38) |

---

## §8 — Stream verdict

**SHIP** — W329 Stream D completed the charter within budget:

- ✅ 4 paste-ready PS1 scripts authored (`tools/w328-trio-*.ps1`)
- ✅ 6 paste-ready operator docs authored (`docs/architecture/W329-OPERATOR-TRIO-SCRIPTS/*`)
- ✅ 0 settings.json / CLAUDE.local.md / .mcp.json / `.claude/**` edits per charter
- ✅ 0 cardinal-rule violations introduced
- ✅ Operator-runnable: `~16 min effort → +72pp wire-up jump (14% → 86%)`
- ✅ Phase-2 `RAW_API_BODIES` deferred to W330+ per W328-B-4 §4 risk-classification rationale
- ✅ All literal credentials redacted as `<redacted-W329-D>` per charter security clause

**Operator-blocking ratio post-W329-D**: same as W328-B end-of-stream — 5 operator actions remaining, but all 5 are now compressed into 3 paste-ready scripts + 1 paste-ready JSON block + 1 documented UI procedure. Total operator wall-clock ~16 min.

---

## §9 — References

- W325 Stream A baseline: `Z:/claude-sota-installed/docs/architecture/W325-INSIGHTS-AUDIT/STREAM-A-*.md`
- W326-A statusLine F1: `Z:/claude-sota-installed/docs/architecture/W326-SETTINGS-FIXES/STREAM-A-SYNTHESIS.md`
- W327-B 5 paste-ready specs: `Z:/claude-sota-installed/docs/architecture/W327-INSIGHTS-FINAL/STREAM-B-SYNTHESIS.md`
- W328-B 7 paste-ready specs + P0 trio identification: `Z:/claude-sota-installed/docs/architecture/W328-INSIGHTS-OPERATOR-ENABLED/STREAM-B-SYNTHESIS.md`
- W328 existing helper scripts (precedent for tools/ ownership): `Z:/claude-sota-installed/tools/insights-wireup/*.ps1`
- This stream's scripts: `Z:/claude-sota-installed/tools/w328-trio-{1,2,3}-*.ps1` + `w328-trio-e2e-smoke.ps1`
- This stream's docs: `Z:/claude-sota-installed/docs/architecture/W329-OPERATOR-TRIO-SCRIPTS/W329-D-{1,2,3,4,5}*.md` + `STREAM-D-SYNTHESIS.md`
- Cited primary docs:
  - `https://docs.anthropic.com/en/docs/claude-code/settings` (settings.json schema)
  - `https://docs.anthropic.com/en/docs/claude-code/monitoring` (OTEL env-var list)
  - `https://docs.arize.com/phoenix/references/configuration` (PHOENIX_ENABLE_*_RECEIVER)
  - `https://docs.docker.com/compose/compose-file/05-services/` (env-array form)
  - `https://langfuse.com/docs/integrations/opentelemetry/get-started` (Basic-auth)
  - `https://opentelemetry.io/docs/specs/otel/protocol/exporter/#configuration-options` (OTEL_EXPORTER_OTLP_HEADERS spec)
- Live probes this session (2026-05-19 ~17:20Z):
  - Phoenix `:16006` — `Up 9 hours (healthy)`; `/v1/traces=200 /v1/metrics=405 /v1/logs=405`
  - Langfuse `:3000` — `/api/public/ready=200`
  - settings.json — 16,464 bytes; 7 OTEL keys present
  - Compose file located — `Z:\claude-hub\observability\docker-compose.yml` (phoenix service lines 301-322)
- HEAD SHA: `5cf5c90` (verified at session start)
