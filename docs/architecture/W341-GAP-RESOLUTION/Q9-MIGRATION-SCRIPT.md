# W341-Q9 — Langfuse keys → OS-vault migration (PARTIAL, operator-side)

> **Wave**: W341-GAP-RESOLUTION
> **Date**: 2026-05-20
> **Status**: PARTIAL — operator must rotate keys at Langfuse UI before vault store
> **Source**: codex r1 SHIP-BLOCKER #1 (W340) — Langfuse pk/sk literal in `CLAUDE.local.md §f2` (gitignored but plain-text on disk)
> **Cardinal Rules**: CR-5 (safety via Claude Code permissions, NOT custom guard scripts) + CR-6 (verify-before-claim)
>
> **DO NOT** inline real key values into this file. All `pk-lf-...` / `sk-lf-...` placeholders are illustrative only.

---

## Problem

Per `CLAUDE.local.md §f2` (gitignored per CCBP `claude-memory.md:113`), Langfuse self-hosted credentials live as plain-text PowerShell `$env:` assignments:

```powershell
$env:LANGFUSE_PUBLIC_KEY     = 'pk-lf-<REDACTED>'
$env:LANGFUSE_SECRET_KEY     = 'sk-lf-<REDACTED>'
```

While gitignored prevents leakage to git, the keys remain plain-text on disk under `Z:\claude-sota-installed\CLAUDE.local.md`. Any backup, syncthing, AV cloud-upload, or accidental screenshot exposes them. Codex r1 (W340) flagged this as SHIP-BLOCKER #1.

## Goal

Replace plain-text storage with Windows OS-vault retrieval via `Microsoft.PowerShell.SecretManagement` + `Microsoft.PowerShell.SecretStore` modules (or Windows Credential Manager via `CredentialManager` module — alternative).

Cite anchors:
- **Microsoft.PowerShell.SecretManagement**: `https://learn.microsoft.com/en-us/powershell/utility-modules/secretmanagement/overview`
- **Microsoft.PowerShell.SecretStore**: `https://learn.microsoft.com/en-us/powershell/utility-modules/secretstore/overview`
- **Langfuse self-hosted UI**: `http://127.0.0.1:3000` (per `CLAUDE.local.md §f2`)
- **OWASP Secrets-Management Cheat Sheet**: `https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html`

---

## Migration steps (operator-execute, in order)

### Step 1 — Rotate keys at Langfuse self-hosted UI

**Operator action required** (cannot be automated; webapp interactive flow):

1. Browse to `http://127.0.0.1:3000` (Langfuse self-hosted instance, verified live per W338 Stream D)
2. Sign in with operator credentials
3. Navigate to: `Settings` → `API Keys` (left sidebar)
4. For the project `5.17.2026` (id `cmpa0h6ux0003o6067jlf4jgd` per `CLAUDE.local.md §f2`):
   - Click `Create new API key`
   - Note the new `pk-lf-<NEW>` (public) and `sk-lf-<NEW>` (secret) immediately — secret shown ONLY once
   - DO NOT close the dialog until both values are captured into a temporary password manager (not a file)
5. **DO NOT revoke OLD keys yet** — defer revocation to Step 7 post-verification per codex W341-r1 P2 safe-rollback discipline
6. Verify NEW key works: attempt curl with NEW key → expect `200 OK`

```powershell
# Verification probe — use NEW key (just-issued at Step 4)
$new_pk = 'pk-lf-<NEW>'
$new_sk = 'sk-lf-<NEW>'
$pair = [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes("${new_pk}:${new_sk}"))
curl.exe -s -o $null -w "%{http_code}`n" -H "Authorization: Basic $pair" `
    http://127.0.0.1:3000/api/public/projects
# Expect: 200
```

7. **NOW revoke OLD key pair at Langfuse UI** (Settings → API Keys → Revoke on the OLD pk-lf-<OLD>) — only after Step 6 returned 200 on NEW key
8. Verify revocation: re-run probe with OLD key → expect `401 Unauthorized`

```powershell
# Post-revocation probe — use OLD key
$old_pk = 'pk-lf-<OLD>'
$old_sk = 'sk-lf-<OLD>'
$pair = [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes("${old_pk}:${old_sk}"))
curl.exe -s -o $null -w "%{http_code}`n" -H "Authorization: Basic $pair" `
    http://127.0.0.1:3000/api/public/projects
# Expect: 401
```

### Step 2 — Install vault modules (one-time)

```powershell
# Per https://learn.microsoft.com/en-us/powershell/utility-modules/secretmanagement/install-and-set-up
# Modules ship via PSGallery; signed by Microsoft (CR-1(a) trust-tuple compliance).
Install-Module Microsoft.PowerShell.SecretManagement -Scope CurrentUser -Force
Install-Module Microsoft.PowerShell.SecretStore       -Scope CurrentUser -Force

# Verify
Get-Module -ListAvailable Microsoft.PowerShell.Secret*
# Expect both modules listed with version >= 1.1.x
```

### Step 3 — Register vault + store new keys (interactive)

```powershell
# Register a new SecretStore vault named 'claude-sota'
Register-SecretVault -Name 'claude-sota' `
    -ModuleName Microsoft.PowerShell.SecretStore `
    -DefaultVault

# First-time vault unlock — operator chooses master password
# (stored OS-side via DPAPI; never written to disk in plain-text)
Set-SecretStoreConfiguration -Authentication Password `
    -PasswordTimeout 28800 `
    -Interaction Prompt `
    -Confirm:$false

# Store NEW keys from Step 1
# Replace <NEW-PK> and <NEW-SK> with the rotated values from Langfuse UI
Set-Secret -Vault 'claude-sota' -Name 'langfuse-pk' -Secret '<NEW-PK>'
Set-Secret -Vault 'claude-sota' -Name 'langfuse-sk' -Secret '<NEW-SK>'

# Verify
Get-SecretInfo -Vault 'claude-sota'
# Expect: 2 entries — langfuse-pk, langfuse-sk
```

### Step 4 — Edit `CLAUDE.local.md §f2`

Replace lines (operator-edit; not automated since CLAUDE.local.md is gitignored and per-machine):

**BEFORE** (plain-text):
```powershell
$env:LANGFUSE_PUBLIC_KEY     = 'pk-lf-<OLD>'
$env:LANGFUSE_SECRET_KEY     = 'sk-lf-<OLD>'
```

**AFTER** (vault retrieval):
```powershell
# W341-Q9 — keys migrated to Microsoft.PowerShell.SecretStore vault 'claude-sota'
# (rotated 2026-05-20; old values revoked at Langfuse UI Step 1)
$env:LANGFUSE_PUBLIC_KEY     = (Get-Secret -Vault 'claude-sota' -Name 'langfuse-pk' -AsPlainText)
$env:LANGFUSE_SECRET_KEY     = (Get-Secret -Vault 'claude-sota' -Name 'langfuse-sk' -AsPlainText)
```

Leave `LANGFUSE_HOST` + `LANGFUSE_BASE_URL` unchanged (`http://127.0.0.1:3000` is not secret).

### Step 5 — Verify Langfuse still authenticates

```powershell
# Re-source the ENV block (re-run the .ps1 that loads CLAUDE.local.md §f2,
# or restart the CC session to pick up the new vault-resolved values)

# Probe: health endpoint with Basic auth
$pair = [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes(
    "${env:LANGFUSE_PUBLIC_KEY}:${env:LANGFUSE_SECRET_KEY}"))
$status = curl.exe -s -o $null -w "%{http_code}" `
    -H "Authorization: Basic $pair" `
    http://127.0.0.1:3000/api/public/health
Write-Host "Langfuse /api/public/health -> $status"
# Expect: 200
```

**Cardinal Rule 6 verification gate**: only mark Q9 CLOSED when Step-5 probe returns `200` AND `Get-Secret` returns the expected length (`pk-lf-` prefix, 43+ chars total per Langfuse convention).

---

## Rollback

If migration fails (vault corruption, module-load error, Langfuse UI revoke didn't take):

1. Re-store plain-text keys in `CLAUDE.local.md §f2` (paste from temporary password manager)
2. Unregister vault:
   ```powershell
   Unregister-SecretVault -Name 'claude-sota'
   ```
3. Rollback semantics by phase:
   - **Pre-Step-7 (before old-key revocation)**: old keys still valid; operator can restore from CLAUDE.local.md backup OR re-issue via Step 1-4 with fresh keys
   - **Post-Step-7 (after old-key revocation)**: old keys are REVOKED (401); operator MUST restore using the NEW keys captured in the temporary password manager at Step 4 (do NOT close the password manager until vault setup verified end-to-end). If new keys also lost: re-issue at Langfuse UI (Step 1-4 again).

---

## Out-of-scope (defer to W342+)

- **OTEL OTLP_HEADERS Basic-auth migration** (W341-Q3 — blocked by Q9 closure; once new keys are in vault, OTEL env block at `.claude/settings.json:env.OTEL_EXPORTER_OTLP_HEADERS` needs same vault-retrieval pattern)
- **Other secrets in CLAUDE.local.md** — currently only Langfuse has literal keys (`TAVILY_API_KEY` + `EXA_API_KEY` are commented placeholders at §g)
- **Vault backup/sync** — `SecretStore` writes to `%LOCALAPPDATA%\Microsoft\PowerShell\secretmanagement\localstore`; consider periodic export per `Export-CliXml` (OS-DPAPI-bound; only re-importable on same Windows user account)

---

## Anti-pattern guards (W341 contract)

- **CR-5** held: vault is OS-level (DPAPI); not a custom guard script
- **CR-6** held: Step-5 probe (HTTP 200) is the verifiable claim — no "DONE" without curl exit
- **Δ-G49** held: this script is non-empty; PARTIAL status is explicit, not silent skip
- **NO leaked keys**: every `pk-lf-` / `sk-lf-` in this file is `<NEW>` / `<OLD>` / `<REDACTED>` placeholder

---

## References

- W340 codex r1 SHIP-BLOCKER #1 (operator-sign-queue closure)
- W341 task_plan.md §"Agent dispatch" row C (this skill's mandate)
- `CLAUDE.local.md §f2` (current state; operator-edit-target Step 4)
- `docs/architecture/W333-CONTINUE/` Langfuse stack recovery (Docker compose migration context)
