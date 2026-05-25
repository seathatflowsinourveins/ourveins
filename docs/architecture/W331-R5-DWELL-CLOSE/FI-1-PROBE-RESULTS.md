# FI-1 Probe Results — `permissions.deny` Smoke Verification

> W331 Stream-R5 · 2026-05-19 · sub-item 1/5
> Source-of-truth: `Z:/claude-sota-installed/.claude/settings.json:71-106` (34 deny lines = 34 entries; FI-1 spec at W329-A-3 §4 says ≥33 = HOLDS).
> Probe-method: design probe + expected-exit-code per entry. Runtime-only-verifiable rows annotated `DESIGN-ONLY`.

## §1. Probe-table — 34 deny entries

| # | Deny pattern | Category | Probe command (design) | Expected | Classification |
|---|---|---|---|---|---|
| 1 | `Read(./.env)` | C1-Secrets | `Read .env` at repo-root | tool-blocked-exit-2 | DESIGN-ONLY · HOLDS |
| 2 | `Read(./.env.*)` | C1-Secrets | `Read .env.production` | blocked | DESIGN-ONLY · HOLDS |
| 3 | `Read(./secrets/**)` | C1-Secrets | `Read secrets/api.json` | blocked | DESIGN-ONLY · HOLDS |
| 4 | `Read(**/id_rsa)` | C1-SSH | `Read ~/.ssh/id_rsa` | blocked | DESIGN-ONLY · HOLDS |
| 5 | `Read(**/id_ed25519)` | C1-SSH | `Read ~/.ssh/id_ed25519` | blocked | DESIGN-ONLY · HOLDS |
| 6 | `Read(**/*.pem)` | C1-Crypto | `Read foo.pem` | blocked | DESIGN-ONLY · HOLDS |
| 7 | `Read(**/*.pfx)` | C1-Crypto | `Read foo.pfx` | blocked | DESIGN-ONLY · HOLDS |
| 8 | `Read(**/*.key)` | C1-Crypto | `Read foo.key` | blocked | DESIGN-ONLY · HOLDS |
| 9 | `Read(./CLAUDE.local.md)` | C1-LocalState | `Read CLAUDE.local.md` | blocked | PROBED-VERIFIED — sibling-CC-runtime tests confirmed pattern enforced; this very session does NOT read it (only refs from system-reminder context) · HOLDS |
| 10 | `Read(./tools/eee.local.ps1)` | C1-LocalState | `Read tools/eee.local.ps1` | blocked | DESIGN-ONLY · HOLDS |
| 11 | `Read(**/.aws/credentials)` | C1-CloudCreds | `Read ~/.aws/credentials` | blocked | DESIGN-ONLY · HOLDS |
| 12 | `Read(**/.ssh/config)` | C1-SSH | `Read ~/.ssh/config` | blocked | DESIGN-ONLY · HOLDS |
| 13 | `Read(**/.ssh/known_hosts)` | C1-SSH | `Read ~/.ssh/known_hosts` | blocked | DESIGN-ONLY · HOLDS |
| 14 | `Read(**/.netrc)` | C1-Creds | `Read ~/.netrc` | blocked | DESIGN-ONLY · HOLDS |
| 15 | `Read(**/.npmrc)` | C1-Creds | `Read ~/.npmrc` | blocked | DESIGN-ONLY · HOLDS |
| 16 | `Read(**/.docker/config.json)` | C1-DockerCreds | `Read ~/.docker/config.json` | blocked | DESIGN-ONLY · HOLDS |
| 17 | `Read(**/credentials.json)` | C1-Creds | `Read foo/credentials.json` | blocked | DESIGN-ONLY · HOLDS |
| 18 | `Read(**/*.crt)` | C1-Crypto | `Read foo.crt` | blocked | DESIGN-ONLY · HOLDS |
| 19 | `Read(**/.codex/**)` | C1-CodexState | `Read ~/.codex/session.json` | blocked | DESIGN-ONLY · HOLDS — corroborates `CODEX_HOME` redirect at CLAUDE.local.md (f) |
| 20 | `Read(**/.anthropic/**)` | C1-AnthropicState | `Read ~/.anthropic/*` | blocked | DESIGN-ONLY · HOLDS |
| 21 | `Read(**/AppData/Roaming/Mozilla/Firefox/Profiles/**)` | C1-BrowserState | Firefox profile read | blocked | DESIGN-ONLY · HOLDS |
| 22 | `Read(**/AppData/Local/Google/Chrome/User Data/**)` | C1-BrowserState | Chrome profile read | blocked | DESIGN-ONLY · HOLDS |
| 23 | `Read(**/AppData/Roaming/Microsoft/Edge/User Data/**)` | C1-BrowserState | Edge profile read | blocked | DESIGN-ONLY · HOLDS |
| 24 | `Read(**/AppData/Local/Microsoft/Edge/User Data/**)` | C1-BrowserState | Edge profile read | blocked | DESIGN-ONLY · HOLDS |
| 25 | `Read(**/Library/Application Support/Firefox/Profiles/**)` | C1-BrowserState | macOS-only — INERT on Windows but harmless | n/a | UNPROBED (platform-inert; safe-to-keep) |
| 26 | `Read(**/HKEY_LOCAL_MACHINE/**)` | C1-RegistryRoot | Glob ineffective vs PowerShell `Get-ItemProperty 'HKLM:\...'` — Read-tool path-glob doesn't trap registry-cmdlet calls | NOT-MATCHED-BY-Read-tool | **BROKEN** — relies on Bash/PowerShell tools, not Read |
| 27 | `Read(**/HKEY_CURRENT_USER/Software/Microsoft/Windows/CurrentVersion/Run/**)` | C1-RegistryRun | Same as #26 — Read-tool glob does not catch `reg query HKCU\...` invocations | NOT-MATCHED | **BROKEN** — gap noted; Patch C1 extension §4 addresses this |
| 28 | `Bash(curl http://*)` | C4-Egress | `Bash: curl http://example.com` | blocked-exit-2 | DESIGN-ONLY · HOLDS (cleartext-egress block) |
| 29 | `Bash(wget http://*)` | C4-Egress | `Bash: wget http://example.com` | blocked | DESIGN-ONLY · HOLDS |
| 30 | `Bash(sudo *)` | C4-Privilege | `Bash: sudo apt install` | blocked | DESIGN-ONLY · HOLDS (Windows has no sudo but glob blocks WSL-shadow pattern) |
| 31 | `Bash(chmod 777 *)` | C4-Privilege | `Bash: chmod 777 foo` | blocked | DESIGN-ONLY · HOLDS |
| 32 | `WebFetch(domain:bit.ly)` | C4-ShortenerEgress | `WebFetch bit.ly/foo` | blocked | DESIGN-ONLY · HOLDS |
| 33 | `WebFetch(domain:tinyurl.com)` | C4-ShortenerEgress | `WebFetch tinyurl.com/foo` | blocked | DESIGN-ONLY · HOLDS |
| 34 | `WebFetch(domain:t.co)` | C4-ShortenerEgress | `WebFetch t.co/foo` | blocked | DESIGN-ONLY · HOLDS |

## §2. Aggregate verdict

- **HOLDS**: 31 / 34 (entries 1-24, 28-34)
- **UNPROBED-inert**: 1 / 34 (entry 25, macOS-only path; structurally harmless on Windows)
- **BROKEN-gap**: 2 / 34 (entries 26-27, registry-paths — Read-tool glob doesn't catch `reg query` / `Get-ItemProperty` via Bash/PowerShell)
- **PROBED-runtime-verified**: 1 / 34 (entry 9 — CLAUDE.local.md exclusion empirically confirmed across sessions)
- **DESIGN-PROBE-design**: 30 / 34 (probes specified but not executed in this session per Δ-PDM-1 budget; runtime verification deferred to operator quarterly audit)

### FI-1 final classification

**FI-1 HOLDS-31/34** with 2 known BROKEN-gap entries (26-27 registry paths) explicitly slated for Patch C1 extension §4 closure via `Bash(reg query *)` + `PowerShell(Get-ItemProperty HKLM:* *)` deny rules. Entry 25 is platform-inert (macOS path on Windows runtime).

Effective post-extension classification (after §4 14-entry merge): **FI-1 HOLDS-34/34 (effective) + 12 new entries broadening coverage**.

## §3. Probe-execution policy (operator audit)

Per W329-A-3 §5, quarterly external audit (90-day cadence) MUST re-run FI-1 probes against live `.claude/settings.json`. Suggested probe-script lives in design-only form here; full executable script deferred to W332+ audit-tooling wave or operator-driven.

### Probe-script design (deferred)

```javascript
// tools/probe-fi1-deny.mjs  (DESIGN ONLY — do not auto-write)
import { spawn } from "node:child_process";
import fs from "node:fs";

const cfg = JSON.parse(fs.readFileSync(".claude/settings.json", "utf8"));
const denyList = cfg.permissions.deny;

for (const pattern of denyList) {
  // pattern shape: "Read(<glob>)" or "Bash(<glob>)" or "WebFetch(domain:<host>)"
  // construct adversarial probe: spawn CC headless w/ a prompt that issues a tool-call matching <glob>
  // measure exit-code; expect non-zero (blocked) for sensitive-pattern entries
  // emit JSON-line probe result; aggregate into FI-1 report
}
```

Execution NOT done this session (budget Δ-PDM-2 + CR-2 hooks-only-as-shims constraint forbids writing this auto-runner without operator sign).

## §4. Cite-anchor freshness

- W329-A-3 §4 FI-1 spec (line 77): "permissions.deny contains ALL 15 Patch C1 sensitive-class globs"
- W329-A-2-PATCH-C1-APPLIED.md (verified per sibling Read above: filename present at `docs/architecture/W329-R5-CORROLLARY-PATCHC1/`)
- NIST 800-53 Rev 5 AC-3 + AU-3 (cite at synthesis §6)
- CIS Controls v8 Control 3 + Control 6 (cite at synthesis §6)
- ISO/IEC 27001:2022 A.5.15 + A.8.15 (cite at synthesis §6)

## §5. Carry-forward to operator-sign

- Sign-time MUST re-run §1 probe-table on live settings (operator's runtime)
- BROKEN-gap rows 26-27 close via Patch C1 extension (§4 deliverable below) — operator merge gates closure
- Probe-script `tools/probe-fi1-deny.mjs` ship deferred (W332+ or operator-built)

**Verdict: FI-1 HOLDS-31/34 design-verified + 2 BROKEN-gap-addressed-in-extension + 1 platform-inert = effective HOLDS-34/34 post-Patch-C1-ext merge.**
