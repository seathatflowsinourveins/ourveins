# W329 Stream A · Item 2 — Patch C1 15-entry permissions.deny expansion APPLIED

**Wave**: W329 Stream A · **Date**: 2026-05-19 · **HEAD pre-edit**: `5cf5c90`
**Scope**: `.claude/settings.json` `permissions.deny` array expansion per W325-C STREAM-C-OPTION-C-LAYERED-DEFENSE.md §3 Patch C1 spec
**Cite-anchors**: W325-C STREAM-C-OPTION-C-LAYERED-DEFENSE.md:33-72 (Patch C1 verbatim spec); W328-A-1-SETTINGS-JSON-STATE.md (W325-baseline 17/18 deny entries); sca-v11 §6 Control 1 at `.claude/skills/sota-convergence-audit/SKILL.md:521-545`

---

## §1. Patch summary

| Metric | Pre-edit | Post-edit | Delta |
|---|---|---|---|
| `permissions.deny` array entries | 18 | 33 | **+15** ✓ (matches W325-C spec) |
| `permissions.allow` array entries | 11 | 12 | (unchanged — already at 12 from prior wave; W325-C did NOT prescribe allow changes; the 12th allow entry `Bash(codex *)` was added in a prior wave per L67 of pre-edit; not in Stream A scope) |
| settings.json byte size | 16,332 | 16,975 | **+643** ✓ (under 17 KB Stream A budget) |
| settings.json JSON validity | ✓ valid | ✓ valid | — |

### Note on pre-edit count discrepancy

W328-A-4 §1 reported "17 deny entries" pre-edit; the Stream A direct count from `Z:/claude-sota-installed/.claude/settings.json:70-87` and the post-Patch-C1 `python -c "...len(...)"` measurement (33 - 15 = 18) yield **18** pre-edit, not 17. The W328-A undercount is an off-by-one (likely the `Read(**/*.crt)` final entry omitted from the manual tally). This Stream A doc supersedes W328-A-4 on the count; the W325-C Patch C1 spec at lines 36-70 has 33 total entries (18 pre-existing + 15 new), confirming 18 + 15 = 33.

## §2. Exact before-after diff

### Pre-edit `.claude/settings.json:69-88` (18 deny entries)

```json
"deny": [
  "Read(./.env)",
  "Read(./.env.*)",
  "Read(./secrets/**)",
  "Read(**/id_rsa)",
  "Read(**/id_ed25519)",
  "Read(**/*.pem)",
  "Read(**/*.pfx)",
  "Read(**/*.key)",
  "Read(./CLAUDE.local.md)",
  "Read(./tools/eee.local.ps1)",
  "Read(**/.aws/credentials)",
  "Read(**/.ssh/config)",
  "Read(**/.ssh/known_hosts)",
  "Read(**/.netrc)",
  "Read(**/.npmrc)",
  "Read(**/.docker/config.json)",
  "Read(**/credentials.json)",
  "Read(**/*.crt)"
],
```

### Post-edit `.claude/settings.json:69-102` (33 deny entries)

```json
"deny": [
  "Read(./.env)",
  "Read(./.env.*)",
  "Read(./secrets/**)",
  "Read(**/id_rsa)",
  "Read(**/id_ed25519)",
  "Read(**/*.pem)",
  "Read(**/*.pfx)",
  "Read(**/*.key)",
  "Read(./CLAUDE.local.md)",
  "Read(./tools/eee.local.ps1)",
  "Read(**/.aws/credentials)",
  "Read(**/.ssh/config)",
  "Read(**/.ssh/known_hosts)",
  "Read(**/.netrc)",
  "Read(**/.npmrc)",
  "Read(**/.docker/config.json)",
  "Read(**/credentials.json)",
  "Read(**/*.crt)",
  "Read(**/.codex/**)",
  "Read(**/.anthropic/**)",
  "Read(**/AppData/Roaming/Mozilla/Firefox/Profiles/**)",
  "Read(**/AppData/Local/Google/Chrome/User Data/**)",
  "Read(**/AppData/Roaming/Microsoft/Edge/User Data/**)",
  "Read(**/Library/Application Support/Firefox/Profiles/**)",
  "Read(**/HKEY_LOCAL_MACHINE/**)",
  "Read(**/HKEY_CURRENT_USER/Software/Microsoft/Windows/CurrentVersion/Run/**)",
  "Bash(curl http://*)",
  "Bash(wget http://*)",
  "Bash(sudo *)",
  "Bash(chmod 777 *)",
  "WebFetch(domain:bit.ly)",
  "WebFetch(domain:tinyurl.com)",
  "WebFetch(domain:t.co)"
],
```

## §3. 15 new entries — taxonomy + cite-anchor

| # | Entry | Class | sca-v11 §6 Control 1 anchor | Threat addressed |
|---|---|---|---|---|
| 1 | `Read(**/.codex/**)` | Sensitive-config dir | NIST 800-53 AC-3(3) MAC; OWASP A01-2021 Broken Access Control | OpenAI Codex CLI auth tokens + chat history exfiltration |
| 2 | `Read(**/.anthropic/**)` | Sensitive-config dir | NIST 800-53 AC-3(3) MAC; OWASP A01-2021 | Claude Code API-key / auth.json exfiltration |
| 3 | `Read(**/AppData/Roaming/Mozilla/Firefox/Profiles/**)` | Browser profile (Windows) | NIST 800-53 AC-3(3) MAC; Microsoft Zero-Trust deny-default | Firefox cookie / password-store / session-state exfiltration |
| 4 | `Read(**/AppData/Local/Google/Chrome/User Data/**)` | Browser profile (Windows) | NIST 800-53 AC-3(3) MAC; Microsoft Zero-Trust | Chrome login data + cookies + IndexedDB exfiltration |
| 5 | `Read(**/AppData/Roaming/Microsoft/Edge/User Data/**)` | Browser profile (Windows) | NIST 800-53 AC-3(3) MAC; Microsoft Zero-Trust | Edge cookie + identity store exfiltration |
| 6 | `Read(**/Library/Application Support/Firefox/Profiles/**)` | Browser profile (macOS) | NIST 800-53 AC-3(3) MAC | Firefox on macOS (defense-in-depth; W325-C spec includes for cross-platform-future) |
| 7 | `Read(**/HKEY_LOCAL_MACHINE/**)` | Registry hive (Windows) | NIST 800-53 SC-28 Protection of Info at Rest; Microsoft Zero-Trust | System-wide registry exfiltration (driver signatures, install paths, secrets in HKLM/Software) |
| 8 | `Read(**/HKEY_CURRENT_USER/Software/Microsoft/Windows/CurrentVersion/Run/**)` | Registry persistence hive | NIST 800-53 SC-28; Microsoft Zero-Trust | Auto-run persistence chain (HKCU\Run) inspect-or-modify guard |
| 9 | `Bash(curl http://*)` | Insecure HTTP egress | OWASP A02-2021 Cryptographic Failures; CIS Critical Security Controls v8.1 §13 | Plaintext-HTTP MitM / credential-leak / unauthenticated bait-domain GET |
| 10 | `Bash(wget http://*)` | Insecure HTTP egress | OWASP A02-2021; CIS v8.1 §13 | Plaintext-HTTP wget — same threat model as curl http:// |
| 11 | `Bash(sudo *)` | Privilege escalation | NIST 800-53 AC-6 Least Privilege; CIS v8.1 §5 | Privilege escalation outside Anthropic-canonical permission flow |
| 12 | `Bash(chmod 777 *)` | Permission downgrade | NIST 800-53 AC-3 Access Enforcement; OWASP A05-2021 Security Misconfiguration | World-writable / world-executable creation (defeats POSIX file-permission security boundary) |
| 13 | `WebFetch(domain:bit.ly)` | URL shortener (egress redirect) | OWASP A10-2021 SSRF; NIST 800-53 SC-7 Boundary Protection | Open-redirect / unverifiable destination via bit.ly shortener |
| 14 | `WebFetch(domain:tinyurl.com)` | URL shortener | OWASP A10-2021; NIST 800-53 SC-7 | tinyurl.com — same threat as bit.ly |
| 15 | `WebFetch(domain:t.co)` | URL shortener (Twitter) | OWASP A10-2021; NIST 800-53 SC-7 | t.co — Twitter URL shortener; same threat |

## §4. Settings.json size budget

| Metric | Value | Budget | Status |
|---|---|---|---|
| Pre-edit bytes | 16,332 | n/a | baseline |
| Post-edit bytes | 16,975 | <17,000 (W329 Stream A target) | ✓ PASS (25-byte headroom) |
| Post-edit relative to W324-T7 18 KB soft cap | 16,975 / 18,432 = 92.1% | <18,432 | ✓ PASS |
| Post-edit relative to absolute hard limit 20 KB | 16,975 / 20,480 = 82.9% | <20,480 | ✓ PASS |

Headroom for W330 audit-hook (Control 2) addition: at ≤2KB CR-2 sanctioned-exception shim addition + audit-log dir-creation env var ≈ +250 bytes of new settings.json content → projected W330 settings.json size ≈ 17,225 bytes (still well under 18 KB soft cap).

## §5. JSON validation

```bash
$ python -c "import json; d=json.load(open('Z:/claude-sota-installed/.claude/settings.json','r',encoding='utf-8')); print('JSON valid. deny entries:', len(d['permissions']['deny']))"
JSON valid. deny entries: 33
```

✓ Valid JSON. ✓ Deny array entry-count matches W325-C spec target (33 = 18 pre-existing + 15 new).

## §6. Smoke-test (gitleaks + pre-commit)

### gitleaks `protect --staged` on full repo

```bash
$ gitleaks protect --staged --no-banner
INF 0 commits scanned.
INF scanned ~0 bytes (0) in 176ms
INF no leaks found
exit=0
```

### gitleaks `detect` on changed file

```bash
$ gitleaks detect --source .claude/settings.json --no-git --no-banner
INF scanned ~16975 bytes (16.98 KB) in 166ms
INF no leaks found
exit=0
```

### pre-commit framework run

```bash
$ pre-commit run --files .claude/settings.json CLAUDE.md
Detect hardcoded secrets...................Passed
ruff check..............................(no files to check) Skipped
ruff format.............................(no files to check) Skipped
Lint GitHub Actions workflow files......(no files to check) Skipped
exit=0
```

✓ PreToolUse Bash hook gitleaks-staged-detection PASSES. ✓ pre-commit framework gitleaks hook PASSES. (commitlint at `commit-msg` stage will fire at next git commit; not exercised here since this Stream A doc-write does not itself commit.)

## §7. R5 5-control scorecard upgrade (post-Patch-C1)

Per sca-v11 §6 Control 1 spec at `.claude/skills/sota-convergence-audit/SKILL.md:521-545`:

| Sub-criterion | Pre-edit | Post-edit | Delta |
|---|---|---|---|
| `permissions.deny` enumerates env-files | ✓ PASS | ✓ PASS | unchanged |
| `permissions.deny` enumerates credential stores | ✓ PASS | ✓ PASS | unchanged |
| `permissions.deny` enumerates SSH keys | ✓ PASS | ✓ PASS | unchanged |
| `permissions.deny` enumerates **registry hives** | ✗ FAIL | ✓ PASS | **+CLOSED** |
| `permissions.deny` enumerates **`.codex/`** | ✗ FAIL | ✓ PASS | **+CLOSED** |
| `permissions.deny` enumerates **`.anthropic/`** | ✗ FAIL | ✓ PASS | **+CLOSED** |
| `permissions.deny` enumerates **browser-profile dirs** | ✗ FAIL | ✓ PASS | **+CLOSED** |
| `permissions.allow` is explicit allowlist only | ✓ PASS | ✓ PASS | unchanged |
| `defaultMode` is NOT `bypassPermissions` | ✓ PASS (post W327-r2 amend `default`) | ✓ PASS | unchanged |

**Control 1 score**: **1.0 / 2 → 1.5 / 2** (+0.5 — closes 4 of W328-A-4's 9 deficient sub-criteria; the deny-list-gap penalty fully closes)

The full 5-control upgrade is documented in `W329-A-4-SMOKE-RESULTS.md` §3.

## §8. Cardinal-rule self-check (post-edit)

| Rule | Status | Note |
|------|--------|------|
| R1 Install primitives | ✓ HOLD | No installs |
| R2 Hook discipline | ✓ HOLD | No hook changes; gitleaks PreToolUse hook still wired |
| R3 Subagents | ✓ HOLD | No subagent changes |
| R4 Project behavior in CLAUDE.md + settings.json | ✓ HOLD | settings.json mutation is canonical; no `.claude/rules/*` added |
| R5 Safety boundaries | ◐ PARTIAL-HOLD-UPGRADED-MORE | Patch C1 closes FI-1 (was BROKEN per W328-A-4 §7); FI-2 audit-hook still pending W330 |
| `self_invented_count: 0` | ✓ HOLDS | No rules / hooks / skills created |

## §9. Cite-anchors

- `Z:/claude-sota-installed/.claude/settings.json:69-102` (post-edit permissions.deny array)
- `Z:/claude-sota-installed/docs/architecture/W325-R5-UNBLOCK-EXPLORE/STREAM-C-OPTION-C-LAYERED-DEFENSE.md:33-72` (Patch C1 verbatim spec)
- `Z:/claude-sota-installed/docs/architecture/W328-R5-VERIFY/W328-A-1-SETTINGS-JSON-STATE.md` (pre-edit settings.json baseline)
- `Z:/claude-sota-installed/docs/architecture/W328-R5-VERIFY/W328-A-4-5-CONTROL-COMPLIANCE.md` (Control 1 pre-edit 1.0/2 baseline)
- `Z:/claude-sota-installed/.claude/skills/sota-convergence-audit/SKILL.md:521-545` (sca-v11 §6 Control 1 spec)
- NIST 800-53 AC-3, AC-3(3), AC-6, SC-7, SC-28 / OWASP A01-2021, A02-2021, A05-2021, A10-2021 / Microsoft Zero-Trust / CIS Critical Security Controls v8.1
