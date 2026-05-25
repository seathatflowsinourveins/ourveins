# W331 OPERATOR-ACTION-BUNDLE — P0-2 + P0-4 + P0-6 + P0-7 + P0-9

> Wave **W331** · 2026-05-19 · branch `goal/W331-sota-convergence` · 5 operator-side actions consolidated. Each item: pre-condition + command snippet + acceptance test + rollback. Total estimated operator-time: ~30 min (sequential) or ~10 min (parallel where independent).
>
> **Composite delta on full apply**: +0.04 to +0.07 (P0-4 alone) + closes 5 SEV-1 operator-blocking carries.

## §1 P0-2 — CLAUDE_CODE_PROJECT_DIR redirect probe + decision tree

**Status**: PENDING-OPERATOR (W331-final 1 carry-forward item; codex r2 PRIMARY+SWAP accepted as deferable to next session)

**Pre-condition**: NO other CC terminals running on Z:\claude-sota-installed (avoid concurrent session-state corruption).

### Step 1 — Active-session probe (mandatory before any rename/migration)

```powershell
# In a non-CC PowerShell terminal:
Get-Process claude | Where-Object { $_.StartTime -gt (Get-Date).AddHours(-24) }
# If output is empty → safe to proceed
# If output shows >0 processes → close other terminals first, then re-probe
```

### Step 2 — /insights read-source probe

```
# In CC (this session OR fresh session):
/insights
# Note the operator-visible HTML report path
# Manually verify which projects/ dir the HTML references (look for sessionId paths)
```

### Step 3 — Decision tree

**If /insights reads `$HOME/.claude/projects/`** (most likely):
```powershell
# RECOMMENDED: drop the env-var override
# Edit CLAUDE.local.md L51: remove the line
#   $env:CLAUDE_CODE_PROJECT_DIR = 'Z:/claude-sota-installed-state/.claude/projects'
# Restart CC
# Verify .claude/projects/ continues to receive new session JSONLs (cat .claude/projects/Z--*/*.jsonl | tail -1)
```

**If /insights reads `CLAUDE_CODE_PROJECT_DIR` (state-side)**:
```powershell
# Migrate 3275 nested JSONLs:
$src = 'Z:\claude-sota-installed\.claude\projects'
$dst = 'Z:\claude-sota-installed-state\.claude\projects'
robocopy $src $dst /MOVE /S /E /COPY:DAT /LOG:Z:\tmp\projects-migrate.log
# Acceptance test: /insights now reads from $dst
```

**Rollback**: re-add the env-var line OR robocopy back. Reversible.

---

## §2 P0-4 — Insights wire-up 14% → 86% (Langfuse + Phoenix + OTEL)

**Status**: 14% applied (statusLine + docs-ready); 86% paste-ready BUT 0% applied. Composite +0.04 to +0.07 unlock.

**Estimated time**: ~16 min (5 sub-steps)

### Step 2.a — Rotate Langfuse keys (SEV-1 carry from W317)

```
# Operator-side via Langfuse admin UI (http://127.0.0.1:3000 → Settings → API keys → Rotate)
# Update CLAUDE.local.md L70-71:
#   $env:LANGFUSE_PUBLIC_KEY = 'pk-lf-NEW-...'
#   $env:LANGFUSE_SECRET_KEY = 'sk-lf-NEW-...'
# Restart CC to inherit new env
```

### Step 2.b — Add OTEL_EXPORTER_OTLP_HEADERS

```powershell
# Append to CLAUDE.local.md ENV block:
$env:OTEL_EXPORTER_OTLP_HEADERS = 'authorization=Basic ' + [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes("$env:LANGFUSE_PUBLIC_KEY`:$env:LANGFUSE_SECRET_KEY"))
$env:OTEL_EXPORTER_OTLP_ENDPOINT = 'http://127.0.0.1:3000/api/public/otel/v1/traces'
$env:OTEL_SERVICE_NAME = 'claude-code-sota-installed'
$env:OTEL_RESOURCE_ATTRIBUTES = 'service.namespace=claude-sota,service.version=2.1.144,deployment.environment=installed'
```

### Step 2.c — Trio scripts apply order: {3, 1, 2}

```powershell
# Per W328-B-4/B-5 + W330-A1 §2.c:
. Z:\claude-sota-installed\tools\w328-trio-3.ps1  # Phoenix recv enable (docker recreate)
. Z:\claude-sota-installed\tools\w328-trio-1.ps1  # Langfuse OTEL endpoint configure
. Z:\claude-sota-installed\tools\w328-trio-2.ps1  # OTEL exporter Phase-1 keys
# Then end-to-end smoke:
. Z:\claude-sota-installed\tools\w328-trio-e2e-smoke.ps1
# Expected: ≥1 trace lands in Langfuse + ≥1 metric in Phoenix
```

### Step 2.d — 8 OTEL keys paste to settings.json:env

```json
// .claude/settings.json :: env block additions per W328-B-4
{
  "OTEL_TRACES_EXPORTER": "otlp",
  "OTEL_METRICS_EXPORTER": "otlp",
  "OTEL_LOGS_EXPORTER": "otlp",
  "OTEL_EXPORTER_OTLP_PROTOCOL": "http/protobuf",
  "OTEL_EXPORTER_OTLP_TRACES_ENDPOINT": "http://127.0.0.1:3000/api/public/otel/v1/traces",
  "OTEL_EXPORTER_OTLP_METRICS_ENDPOINT": "http://127.0.0.1:16006/v1/metrics",
  "OTEL_EXPORTER_OTLP_LOGS_ENDPOINT": "http://127.0.0.1:16006/v1/logs",
  "OTEL_METRIC_EXPORT_INTERVAL": "60000"
}
```

### Step 2.e — Acceptance test

```
# After CC restart:
# 1. Dispatch any Agent call (triggers ≥1 trace/log)
# 2. Verify in Langfuse UI: new trace appears under project "5.17.2026" (cmpa0h6ux0003o6067jlf4jgd)
# 3. Verify in Phoenix UI (http://127.0.0.1:16006): new metric appears
# 4. /insights renders with >0 traces (was 0 before wire-up)
```

**Rollback**: revert CLAUDE.local.md + settings.json env block; restart CC; Langfuse traces stop appearing.

---

## §3 P0-6 — GitNexus plugin update (v1.3.6 → 803f0bed Windows FTS fix)

**Status**: PENDING-OPERATOR (downgraded P0→P1 per codex axis-2 #7-8; BM25 not on hot path)

**Pre-condition**: confirm GitNexus is actually used for the repo:
```
gitnexus status . 2>&1 | head -5
# If "not indexed" → defer update to W332+; skip rest
```

**Update command** (operator-interactive — CC requires confirmation):
```
/plugin update gitnexus@gitnexus-marketplace
/reload-plugins
# Verify: gitnexus --version reports post-803f0bed SHA
```

**Acceptance test**: BM25 FTS query works without Windows FTS-extension load error:
```
gitnexus query "class TestFoo" --bm25
# Expected: results returned without 'no such module: fts5' error
```

**Rollback**: `/plugin install gitnexus@gitnexus-marketplace --version 1.3.6` + `/reload-plugins`.

---

## §4 P0-7 — Node.js v22.22.0 → v22.22.3 LTS upgrade

**Status**: PENDING-OPERATOR; defer unless CVE-specific evidence (per REMEDIATION-PLAN-V2 P0.7)

### Step 1 — CVE-specific probe

```powershell
# WebFetch operator-side: https://nodejs.org/en/blog/vulnerability
# Search for CVEs affecting 22.22.0 fixed in 22.22.1/22.22.2/22.22.3
# Typical surface: openssl/undici/uv patches
```

### Step 2 — Decision

**If specific CVE found affecting our use case**: upgrade immediately.

**If no specific CVE**: defer to next quarterly maintenance window (e.g., W340+).

### Step 3 — Upgrade procedure (if going ahead)

```powershell
# Via nvm-windows OR fnm OR fresh installer
nvm install 22.22.3
nvm use 22.22.3
node --version  # verify 22.22.3
# Restart all NSSM services depending on node (LlamaSwap, CogneeMCP)
nssm restart LlamaSwap
nssm restart CogneeMCP
```

**Acceptance test**: all node-dependent services healthy; CC + pre-commit hooks all functional.

**Rollback**: `nvm use 22.22.0` (if installed via nvm) OR re-install 22.22.0 MSI.

---

## §5 P0-9 — Perplexity SEV-1 key rotation (W317-r1 9-wave carry)

**Status**: PENDING-OPERATOR (operator-only — dashboard access required)

**Procedure**:
1. Login to https://www.perplexity.ai/settings/api
2. Revoke current API key (SEV-1: exposed in W317-r1 9 waves ago; rotation overdue)
3. Generate new API key
4. Update CLAUDE.local.md (gitignored) — add OR replace line:
   ```powershell
   $env:PERPLEXITY_API_KEY = 'pplx-NEW-...'
   ```
5. Restart CC to inherit new env

**Acceptance test**:
```
# In CC:
# Trigger perplexity_search via mcp__perplexity__perplexity_search
# Verify: results returned (not 401 Unauthorized)
```

**Rollback**: revert CLAUDE.local.md edit (re-add old key — but old key already revoked at provider so no real rollback path; this rotation is one-way for security).

---

## §6 Bundle execution order (recommended)

| Order | Item | Duration | Independent of others? |
|---|---|---|---|
| 1 | P0-9 Perplexity rotation | 2 min | YES |
| 2 | P0-2 /insights probe (step 2 only) | 3 min | YES |
| 3 | P0-4 §2.a Langfuse rotate | 3 min | YES |
| 4 | P0-4 §2.b-§2.e OTEL wire | 13 min | DEPENDS on 3 |
| 5 | P0-2 decision tree apply | 5 min | DEPENDS on 2 |
| 6 | P0-6 GitNexus probe | 1 min | YES |
| 7 | P0-6 update (if probe says go) | 2 min | DEPENDS on 6 |
| 8 | P0-7 CVE probe | 2 min | YES |
| 9 | P0-7 upgrade (if CVE) | 5 min | DEPENDS on 8 |

Parallel-safe groups:
- Group A (5 min total, all independent): {1, 2, 3, 6, 8}
- Group B (sequential after Group A): {5, 4, 7, 9}

## §7 Composite-recovery projection per item

| Item | Standalone composite delta | Cumulative if applied |
|---|---|---|
| P0-2 fix | +0.02 | 4.257 |
| P0-4 full apply | +0.07 | 4.327 |
| P0-6 update (if BM25 used) | +0.01 | 4.337 |
| P0-7 upgrade (if CVE) | +0.01 | 4.347 |
| P0-9 rotation | +0.00 (security only — no composite) | 4.347 |
| **TOTAL** | **+0.11** | **4.347** (still YELLOW upper-band) |

Composite to ≥4.5 GREEN requires **additionally**:
- R5 acceptance-record sign (+0.20) → 4.547 ✓
- K-4 slsa-verifier install (+0.07) → see W331-SOTA-GIT-PRACTICE §3
- P0-5 (b)(c)(e)(f) git-practice landings (+0.05-0.10)

## §8 Cite-anchors (≥3-org-distinct)

- Anthropic CC docs: `https://code.claude.com/docs/en/observability` (OTEL wiring), `https://code.claude.com/docs/en/plugins` (gitnexus update)
- Langfuse: `https://langfuse.com/docs/observability/sdk/typescript/example-vercel-ai` (OTEL traces)
- Node.js: `https://nodejs.org/en/blog/vulnerability` (CVE advisory)
- NIST SP 800-218 PW.7 + RV.1 (continuous-monitoring framework — independent of vendor)
- OpenTelemetry: `https://opentelemetry.io/docs/specs/otlp/` (protocol spec)

## §9 Rollback summary

All 5 items reversible. Worst case: revert CLAUDE.local.md edits + restart CC → state restored. P0-9 is one-way at provider (security rotation is by-design irreversible at the key value; access to provider unchanged).
