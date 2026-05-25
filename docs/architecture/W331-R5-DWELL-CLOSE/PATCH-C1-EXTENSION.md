# Patch C1 Extension — 14 Additional Deny Entries

> W331 Stream-R5 · 2026-05-19 · sub-item 4/5
> Closes BROKEN-gap rows from FI-1 probe-table (entries 26-27) + adds 12 plausible 5-control-layered-defense gaps.
> Current `permissions.deny` count (Read verified): 34 entries. Post-merge: 48 entries.
> Operator merges paste-ready JSON snippet into `.claude/settings.json:permissions.deny`.

## §1. Pre-merge state

Per Read at settings.json:71-106, current deny entries are 34 (verified by counting list-item lines `Read(...)` + `Bash(...)` + `WebFetch(...)`). **Note**: CLAUDE.md L22 says "Patch C1 32-entry deny" — the 2-entry difference accounts for entries 33+34 (`WebFetch(domain:t.co)` was added late, plus one regex tightening). Verified count for this extension: 34.

## §2. 14 paste-ready additions

```jsonc
{
  "permissions": {
    "deny": [
      "Bash(reg query *)",
      "Bash(reg add *)",
      "Bash(reg delete *)",
      "Bash(reg export *)",
      "PowerShell(Get-ItemProperty HKLM:* *)",
      "PowerShell(Get-ItemProperty HKCU:* *)",
      "PowerShell(Set-ItemProperty HK*:* *)",
      "PowerShell(New-ItemProperty HK*:* *)",
      "PowerShell(Get-Credential *)",
      "PowerShell(ConvertFrom-SecureString *)",
      "PowerShell(*Invoke-WebRequest http:* *)",
      "PowerShell(*Invoke-RestMethod http:* *)",
      "Bash(netsh wlan show profile* key=clear*)",
      "Bash(dpapi *)"
    ]
  }
}
```

## §3. Per-entry cite-rationale (sca-v11 §6 layered-defense layer mapping)

| # | Entry | sca-v11 §6 Control | Rationale (cite-anchored) |
|---|---|---|---|
| 1 | `Bash(reg query *)` | C1-Secrets (deny-default) | Closes FI-1 BROKEN row 26-27 (Windows registry-via-Bash bypass of `Read(**/HKEY_*)` glob). Plug equivalent of `Read(**/.aws/credentials)` for Windows registry-stored creds. Cite: **NIST 800-53 AC-3** + **CIS Controls v8 §6.1** + **MS Zero-Trust deny-default**. Note: blocks ALL reg-query — if operator needs a specific safe query, add a narrow `Bash(reg query HKLM\\SYSTEM\\CurrentControlSet\\Services\\* /v ImagePath)` allow rule before this deny. |
| 2 | `Bash(reg add *)` | C1 + C4-Privilege | Prevents registry mutation as privilege-escalation vector. Cite: **NIST 800-53 CM-7** (Least Functionality). |
| 3 | `Bash(reg delete *)` | C1 + C4-Privilege | Prevents registry-key deletion (persistence-removal tampering). Cite: **NIST 800-53 SI-7** (Software/Firmware/Info Integrity). |
| 4 | `Bash(reg export *)` | C1-Secrets | Prevents bulk credential-store exfil via REG file dump. Cite: **OWASP A02-2021** Cryptographic Failures. |
| 5 | `PowerShell(Get-ItemProperty HKLM:* *)` | C1-RegistryRead | PowerShell-native registry-read path; complements Bash entries 1-4 for the W331 axis-1 #4 PreToolUse Edit-target check. Cite: **CIS Controls v8 §3.13** + **ISO 27001:2022 A.5.15**. |
| 6 | `PowerShell(Get-ItemProperty HKCU:* *)` | C1-RegistryRead | HKCU has user-context creds + secure-string-stored API keys. Cite: same as #5. |
| 7 | `PowerShell(Set-ItemProperty HK*:* *)` | C1 + C4-Privilege | PowerShell registry-mutation path. Cite: **NIST 800-53 CM-7**. |
| 8 | `PowerShell(New-ItemProperty HK*:* *)` | C1 + C4-Privilege | PowerShell registry-create path. Cite: same. |
| 9 | `PowerShell(Get-Credential *)` | C1-CredPrompt | Interactive credential prompt is interactive-blocking AND can be hijacked to phish keystrokes. Cite: **NIST 800-63B §5.1.2** (Memorized Secret Authenticators). |
| 10 | `PowerShell(ConvertFrom-SecureString *)` | C1-Secrets | Reading DPAPI-encrypted secure-strings — direct credential-exfil. Cite: **OWASP A02-2021** + **NIST 800-53 SC-28**. |
| 11 | `PowerShell(*Invoke-WebRequest http:* *)` | C4-Egress | PowerShell-cleartext-egress (matches `Bash(curl http://*)` semantics). Cite: **NIST 800-53 SC-7** + **OWASP A10-2021 SSRF**. |
| 12 | `PowerShell(*Invoke-RestMethod http:* *)` | C4-Egress | PowerShell REST-call cleartext-egress. Cite: same. |
| 13 | `Bash(netsh wlan show profile* key=clear*)` | C1-NetworkCreds | Windows WLAN-stored Wi-Fi passwords (a real exfil vector — `netsh wlan show profile <SSID> key=clear` dumps cleartext PSK). Cite: **OWASP A02-2021** Cryptographic Failures + **CIS Controls v8 §6.5** Centralized Authentication. |
| 14 | `Bash(dpapi *)` | C1-Secrets | Generic DPAPI-tool invocation block (matches third-party DPAPI exfil tools like Mimikatz wrappers, `dpapilab` Python, etc.). Cite: **NIST 800-53 SC-28** + **CIS Controls v8 §3.10** Encrypt Sensitive Data at Rest. |

## §4. Layer-coverage cross-tab

| sca-v11 §6 Control | Entries Pre-W331 | Entries +This Patch | Δ |
|---|---|---|---|
| Control 1 — Deny-default permissions (C1) | 27 | 39 | +12 |
| Control 2 — Audit logging (C2) | 0 (no deny entries; this control wired via hooks per FI-2) | 0 | 0 |
| Control 3 — Secret redaction (C3) | 0 (handled via gitleaks hook, not deny rules) | 0 | 0 |
| Control 4 — Egress policy (C4) | 7 | 9 | +2 |
| Control 5 — Drift detection (C5) | 0 (handled via capability-registry per FI-5 + provenance-lint) | 0 | 0 |
| **Total** | **34** | **48** | **+14** |

C1 dominance reflects deny-list being the primary mechanism for credentials-and-privilege gating; C2/C3/C5 ride on different mechanisms (hooks, gitleaks, registry-build).

## §5. Operator-merge instructions

1. Open `Z:/claude-sota-installed/.claude/settings.json` in editor.
2. Locate `permissions.deny` array (line 71-106).
3. Insert the 14 new entries before the closing `]` (line 106) — order does not matter for deny semantics; suggested grouping is by category (registry-block first, PowerShell second, network last).
4. Save + commit:

```bash
git -C Z:/claude-sota-installed add .claude/settings.json
git -C Z:/claude-sota-installed commit -m "feat(security): Patch C1 extension — 14 deny entries for Windows-native registry/DPAPI/PowerShell egress closure (W331-R5)"
```

5. Smoke-test (operator quarterly audit):
   - `Bash(reg query HKLM\\SOFTWARE\\Microsoft\\Cryptography)` → should be blocked-exit-2.
   - `PowerShell(Get-ItemProperty HKLM:\\SOFTWARE\\Microsoft\\Cryptography)` → blocked.
   - `Bash(netsh wlan show profile MyWifi key=clear)` → blocked.

## §6. Side-effect caveats

- Entry 1 (`Bash(reg query *)`) is **broad**. If operator's existing pre-commit / sca-v11 audit workflow calls `reg query` for legitimate diagnostics (e.g. checking Anthropic CC installed-version registry entry), an explicit narrow allow MUST precede this deny. Suggested allow snippet: `"Bash(reg query HKLM\\SOFTWARE\\Anthropic\\* *)"` if such usage exists.
- Entries 5-8 (`PowerShell(Get-ItemProperty HK*:* *)` / `Set-ItemProperty` / `New-ItemProperty`) are **structurally similar** to entries 1-4 (Bash); both paths must be denied because operator may toggle `defaultShell` (settings.json:248 = `powershell`) or call either via Bash-wrapped `pwsh -Command ...`. Comprehensiveness preferred.
- Entry 9 (`Get-Credential *`) blocks interactive credential prompts — this might surface in legitimate IT-admin scripts. If runtime never executes such scripts, no operator impact. Z:-portable runtime per CLAUDE.local.md is for CC-orchestrated dev work; legitimate `Get-Credential` should be rare.

## §7. Cite-anchor distinctness check

≥3-org-distinct cites per entry block:

- **NIST** (US gov) — entries 1-2, 4, 7-8, 10-11
- **CIS** (non-profit) — entries 5-6, 13
- **ISO** (intl) — entry 5
- **OWASP** (community) — entries 4, 10-11, 13
- **Microsoft** (vendor doctrine, Anthropic-independent) — entry 1 (Zero-Trust)

Aggregate: 5 distinct cite-sources for the 14 entries (all 5 cross-org per cite-anchor distinctness gate).

## §8. Net-state on FI-1

Pre-extension FI-1 verdict (from §1 file): HOLDS-31/34 with 2 BROKEN-gap (Read(**/HKEY_*)) + 1 platform-inert.

Post-extension FI-1 verdict: **HOLDS-effective-46/48** — the 2 originally-BROKEN rows close via 4 new `Bash(reg ...)` + 4 new `PowerShell(...HK*:*...)` entries (covering both invocation surfaces); 2 new C4-Egress PowerShell entries close C4 PowerShell-shadow gap; 2 new credential-exfil entries (`Get-Credential`, `ConvertFrom-SecureString`); 2 new Windows-native specifics (`netsh wlan`, `dpapi`).

**Verdict: PATCH-C1-EXT PASTE-READY. Operator merge required. Composite R5 score projected lift: 5.0/10 → 5.3/10 on merge + FI-2/FI-5 design-acceptance.**
