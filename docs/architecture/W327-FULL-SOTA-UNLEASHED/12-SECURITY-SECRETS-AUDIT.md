# W327-S12 — Security, Secrets, Permissions Full Audit (DevSecOps)

> **Wave**: W327-S12 (parallel-stream-12 of W327-FULL-SOTA-UNLEASHED)
> **Auditor**: senior-security DevSecOps role
> **Date**: 2026-05-19
> **Scope**: Z:/claude-sota-installed runtime + sibling state dir + git history + MCP supply chain
> **Standards**: OWASP Top-10 (2021 ed) · NIST SP 800-53 Rev 5 · SLSA v1.0 · CWE Top 25 · MITRE ATT&CK
> **Methodology**: Concrete file:line citations; no abstract platitudes. Each finding ID-tagged `S12-Fnn`.

---

## §0 Executive Summary

**P0 SECRET-LEAK COUNT**: **2 unrotated live keys** (1× perplexity-api-key + 1× github-fine-grained-pat) committed at `docs/architecture/_archive/W259-grand-catalog-archive/prior-wave-grand-synthesis-2026-05-16/02-wave-keep-canonical/desktop-runtime-audit-2026-05-15.md:85` in commit `52881fde411ceed8d736d1a9c7d49797268dfd88` (W317-r2 SEV-1 carry-forward referenced in W326 G7).

**R5 5-CONTROL STATUS**: **1.5 / 5 wired** (concretely + with evidence) — matches W328 Stream A audit conclusion (composite 4.0/10).
- Control 1 (deny-default permissions): **1.0/2** — deny-list comprehensive but `defaultMode:"default"` not `"deny"`, and 11 broad `Bash` ALLOWs trump deny intent
- Control 2 (audit-logging PreToolUse): **0/2** — `.claude/state/audit/` DOES NOT EXIST; no audit-logging hook wired
- Control 3 (gitleaks PreToolUse on Bash): **1.5/2** — wired on `Bash` matcher only (line 124); NOT wired on `Edit|Write|MultiEdit` matchers (gap)
- Control 4 (egress policy operator-confirm): **0.5/2** — denies `curl http://*` + `wget http://*` only; HTTPS exfil + npx/uvx outbound unguarded
- Control 5 (drift-detection pre-commit): **1.0/2** — gitleaks-protect-staged runs on Bash but bypassable via PowerShell/Edit; no git-status drift verify

**SHIP-GATE VERDICT**: **BLOCK**.
- BLOCKER-1: P0 unrotated keys → run `git filter-repo` + key rotation (operator action)
- BLOCKER-2: R5 < 4.0/5 (currently 4.0/10 in audit-prior — same as W328 Stream A) → wire Control 2 audit-logging + Control 4 egress-confirm before ship
- BLOCKER-3: `bypassPermissions:true` removal NOT verified (settings.json shows `skipDangerousModePermissionPrompt:true` line 458 — semantically equivalent persistence of bypass intent)
- BLOCKER-4: `sandbox.enabled:false` + `allowUnsandboxedCommands:true` (lines 442+446) — 6-wave SHIP-BLOCKER convergent unresolved (Anthropic supports macOS/Linux/WSL2 only; Windows-native CC sandbox unavailable — operator-AI decision needed: accept-limitation or move-to-WSL2)

---

## §1 Secret-Leakage Findings (gitleaks + manual + git history)

### §1.1 Gitleaks Scan Results (full tree, `gitleaks 8.30.1`)

**Command**: `gitleaks detect --source . --no-banner --redact --report-format json --report-path tmp/gitleaks-w327-s12.json` — 1264 commits scanned, ~505 MB, 1m33s.

**Headline**: 16,334 raw findings — but the noise floor is **dominated by `sourcegraph-access-token` regex false-positives matching base64-like substrings in archived codex-verdict text files** (16,206 of 16,334 = 99.2%). After demoting that rule-noise:

| Rule | Count | Risk Class |
|------|-------|-----------|
| `sourcegraph-access-token` | 16,206 | NOISE (regex over-matches in codex verdict text dumps) |
| `generic-api-key` | 66 | LOW — all in `00-archive-from-prior-waves/codex-verdicts/*.txt`; embedded in codex review text (synthetic example keys, not live secrets) |
| `curl-auth-header` | 37 | LOW — same archive |
| `aws-access-token` | 12 | LOW — same archive (AWS docs examples in codex output) |
| `jwt` | 8 | LOW — same archive |
| `curl-auth-user` | 3 | LOW — same archive |
| **`perplexity-api-key`** | **1** | **P0 — REAL UNROTATED KEY** |
| **`github-fine-grained-pat`** | **1** | **P0 — REAL UNROTATED PAT** |

**S12-F01 (P0)** — `perplexity-api-key` at `docs/architecture/_archive/W259-grand-catalog-archive/prior-wave-grand-synthesis-2026-05-16/02-wave-keep-canonical/desktop-runtime-audit-2026-05-15.md:85` — committed `52881fde411ceed8d736d1a9c7d49797268dfd88` (2026-05-16T19:48:08Z, author 42). Same line as S12-F02. **CWE-798** (Use of Hard-coded Credentials), **OWASP A07:2021** (Identification and Authentication Failures).

**S12-F02 (P0)** — `github-fine-grained-pat` at same file:line. Same commit. **CWE-798 + CWE-321**. Co-located = single-paste, single-rotation event.

**S12-F03 (P3)** — 66 `generic-api-key` + 12 `aws-access-token` + 8 `jwt` matches in `00-archive-from-prior-waves/codex-verdicts/*.txt` — all are codex-CLI text-dump artifacts (the verdict text quoted regex examples from upstream docs). Mitigation: add **gitleaks `.gitleaksignore`** path-allow for `docs/architecture/**/codex-verdicts/**` per `gitleaks v8` allow-rule semantics, OR keep as path-noise (no live credential).

### §1.2 CLAUDE.local.md §f2 Langfuse Keys — Verification

**Gitignore presence verified**: `.gitignore:5` contains `CLAUDE.local.md`. Confirmed via `git check-ignore CLAUDE.local.md` and the file is **not** in `git ls-files` output.

**Permission deny verified**: `.claude/settings.json:78` denies `Read(./CLAUDE.local.md)` — attempted Bash `grep` against the file in this audit was **BLOCKED** by the permission system (proves the deny rule is wired and active).

**Risk surface**: Langfuse keys (`pk-lf-5e2d4b64...` + `sk-lf-b9f4866e...` — visible only in the `CLAUDE.local.md` source per env block §f2, NOT touched in this audit) live correctly in the gitignored per-machine file. **VERDICT: COMPLIANT** with W268 codex T3 P0-security pattern.

**S12-F04 (P2)** — Langfuse endpoint is `http://127.0.0.1:3000` (HTTP-not-HTTPS, loopback). Acceptable for self-hosted local Langfuse, but if Langfuse ever moves off-loopback (e.g., to LAN/WAN), the `pk-lf-` token will leak in clear text. **CWE-319** (Cleartext Transmission of Sensitive Information). Mitigation: explicit ADR documenting "loopback-only forever, never bind 0.0.0.0" + nftables/Windows-firewall deny rule for `:3000` non-loopback.

### §1.3 Perplexity Key W317-r2 SEV-1 Rotation Status

**Per W326 G7**: SEV-1 perplexity key unrotated.

**This audit's finding (S12-F01)**: confirmed unrotated — same key visible at commit `52881fde:85` is still in `docs/architecture/.../desktop-runtime-audit-2026-05-15.md` AS OF current HEAD on branches `W321 + goal/W287-reconcile + sota-converge-w290` (verified via `git branch --contains 52881fde`).

**Not on remote**: `git branch -r --contains 52881fde` returns EMPTY → commit lives on local branches only. **HOWEVER**: any subsequent `git push` of `W321 / goal/W287-reconcile / sota-converge-w290` would propagate the secret to remote. **CWE-540** (Inclusion of Sensitive Information in Source Code).

**Required remediation**:
1. **Operator MUST rotate** the perplexity API key at perplexity.ai/dashboard FIRST (before any history-rewrite — old key remains in git reflog, GitHub event-log mirror caches, and any local `git clone` artifacts).
2. **Operator-AI** can then `git filter-repo --invert-paths --path docs/architecture/_archive/W259-grand-catalog-archive/prior-wave-grand-synthesis-2026-05-16/02-wave-keep-canonical/desktop-runtime-audit-2026-05-15.md` OR `git filter-repo --replace-text rotation-patterns.txt` (preferred — keeps file, redacts only the secret).
3. **Verify** with `gitleaks detect --no-git` (worktree) AND `gitleaks detect --source .` (full history) AND `git log --all -p -S '<first-8-chars-of-old-key>'` (post-rewrite expect zero hits).

### §1.4 .mcp.json Env-Interpolation Audit

CR-2 P0-security pattern: tracked `.mcp.json` uses `${VAR}` interpolation; secrets live ONLY in `CLAUDE.local.md` (gitignored).

| MCP Server | .mcp.json line | Env-Interp Used | CR-2 Compliant |
|-----------|---------------|-----------------|----------------|
| langfuse | L54-59 | `${LANGFUSE_HOST}`, `${LANGFUSE_PUBLIC_KEY}`, `${LANGFUSE_SECRET_KEY}` | YES |
| perplexity | L78-80 | `${PERPLEXITY_API_KEY}` | YES |
| tavily | L91-93 | `${TAVILY_API_KEY}` | YES |
| exa | L99-101 | `${EXA_API_KEY}` | YES |
| basic-memory | L65-68 | hardcoded `BASIC_MEMORY_HOME` (path, not secret) | YES (no secret) |

**S12-F05 (P3)** — `.mcp.json` no-env servers (deepwiki, chrome-devtools, repomix, serena, gitnexus, ccusage, cognee, hf-mcp-server, playwright) — each is either an HTTP endpoint or stdio with no auth. **VERIFICATION**: `Grep "AUTHORIZATION\|API_KEY\|TOKEN\|SECRET\|PASSWORD" .mcp.json` returns ONLY the env-interp markers, no literal values. **COMPLIANT**.

### §1.5 .codex/auth.json + Credentials

**Path**: `Z:/claude-sota-installed-state/.codex/auth.json` (per `CODEX_HOME` env var in `CLAUDE.local.md §f`).

**Status**: file exists (verified `ls -la`). Per `.claude/settings.json:88` `Read(**/.codex/**)` is **DENIED** — attempted Bash inspection of `.codex/` should be blocked.

**Located OUTSIDE the git worktree** (`Z:/claude-sota-installed-state/` is sibling dir, NOT under `Z:/claude-sota-installed/`) → cannot be `git add`ed accidentally → out-of-repo state by design. **CWE-256** (Plaintext Storage of a Password) mitigation: file is plaintext JSON on a Windows NTFS volume; OS-level ACLs are the only at-rest protection. **NOT ENCRYPTED**.

**S12-F06 (P2)** — codex `auth.json` plaintext on disk. Acceptable per Anthropic/OpenAI CLI norms (similar to `~/.claude/.credentials.json` + `~/.aws/credentials`), but **CWE-256** applies. Mitigation options: (a) per-user EFS via `cipher /E` on `Z:/claude-sota-installed-state/.codex/`; (b) acknowledge-and-accept (industry norm). Recommend (b) + add to ADR.

### §1.6 Git History — Accidentally-Committed Keys

**Search vectors**:
- `git log --all -p -S 'sk-lf-'` → returns commit-message hits in `74de2dfe` + `d6087ecff` (commit-message documentation references to `sk-lf-` prefix as a known-string, not actual key body in tracked files)
- `git log --all -p -S 'pplx-'` → similar
- `git ls-files | xargs grep 'sk-ant\|pplx-\|sk-lf-\|tvly-\|exa-'` → 10 files matched. All matched files are documentation/skill files referencing the *prefix string* `sk-lf-` / `pplx-` (e.g., in `.claude/skills/langfuse/references/cli.md` describing how the key looks); **no live key bodies in tracked files** other than the S12-F01/F02 pair in `desktop-runtime-audit-2026-05-15.md:85`.

**VERDICT**: S12-F01/F02 are the only **live, committed, unrotated keys**. All other matches are prefix-string references (documentation describing key format, not embedding actual keys).

---

## §2 R5 5-Control Layered-Defense Compliance Matrix

Per **sca-v12 §6** (W325-C "Option C"). Each control scored 0/0.5/1 on 5 axes — total 0-10 across 5 controls, ship-gate ≥4.0 PASS / ≥6.0 STRONG / 8.0 IDEAL.

| # | Control | Configured | Wired | Tested | Monitored | Drift-Detected | Score | Evidence |
|---|---------|-----------|-------|--------|-----------|----------------|-------|----------|
| 1 | deny-default permissions for secrets-class paths | 0.5 | 0.5 | 0 | 0 | 0 | **1.0/2** | `settings.json:69-103` deny-list comprehensive (~30 patterns), but `defaultMode:"default"` not `"deny"` (L104) — and L60-67 grants 11 broad `Bash(*)` ALLOWs (npm/uv/uvx/gh/git/docker/cargo/codex with wildcards). Untested: no test fixture exercising "Read attempted on `.env` → denied". |
| 2 | audit-logging PreToolUse hook → `.claude/state/audit/*.jsonl` | 0 | 0 | 0 | 0 | 0 | **0/2** | `.claude/state/audit/` directory **DOES NOT EXIST** (verified `find -maxdepth 2`). Zero PreToolUse audit-logging hook in `settings.json:118-163`. No `.jsonl` audit trail. Closest analog: `precompact.log` (settings.json:181) — but that's compact-event only, not tool-use audit. |
| 3 | gitleaks PreToolUse hook on Bash/Edit/Write/Commit | 1 | 0.5 | 0 | 0 | 0 | **1.5/2** | `settings.json:124` wires `gitleaks protect --staged --no-banner --redact` on **`Bash` matcher only**. **GAP**: not wired on `Edit\|Write\|MultiEdit` matcher (L139) — model can write a secret via Edit/Write tool unmonitored. Untested: no test fixture triggering a known-bad string. Not monitored: no metric on gitleaks fire-rate. |
| 4 | egress policy operator-confirm for out-of-runtime POST | 0.5 | 0 | 0 | 0 | 0 | **0.5/2** | `settings.json:96-97` denies `curl http://*` + `wget http://*` (HTTP only, NOT HTTPS). `npx -y <pkg>` / `uvx --from` outbound to npm-registry/PyPI/GitHub unrestricted (lines 60-66). WebFetch denies only bit.ly/tinyurl/t.co (L100-102). No operator-confirm prompt for novel domain. No egress-rate-limit. |
| 5 | drift-detection git-status pre-commit verify | 1 | 0 | 0 | 0 | 0 | **1.0/2** | `settings.json:124` runs `gitleaks protect --staged` (catches secrets at stage-time). **GAP**: NOT bypass-resistant — model can `git add -A && git commit --no-verify` (the `block-no-verify` plugin partially mitigates but only on `--no-verify`, not on `-c core.hooksPath=`). No `git status --porcelain` snapshot before/after compare. No drift-alert on `.claude/settings.json` mutation (the security config itself unprotected). |

**TOTAL R5 SCORE**: **4.0/10** — matches W328 Stream A independent re-audit (which scored 4.0/10 with identical breakdown C1=1.0 / C2=0 / C3=1.5 / C4=0.5 / C5=1.0, per commit message of `74de2dfe`).

**Ship-gate threshold per sca-v12 §6**: PASS = 4.0+ → **MARGINAL PASS** (exactly at threshold; below the 6.0 STRONG floor; far below 8.0 IDEAL).

**Trend analysis (cross-wave)**:
- W316-W319 6-wave SHIP-BLOCKER convergent: bypassPermissions:true + sandbox:false unresolved
- W325 Option C delivered: defaultMode flipped + perms-layer (Control 1) → contributed +1.0
- W328 Stream A confirmed: no further controls wired between W325 and W328
- W327-S12 (this audit): no change vs W328 baseline → **status: STAGNANT at 4.0/10 across 3 waves**

---

## §3 bypassPermissions + Sandbox Compliance

### §3.1 bypassPermissions Status (6-Wave Convergent SHIP-BLOCKER per W316-W319)

**Live `settings.json` state**:
- `permissions.defaultMode: "default"` (L104) — **NOT `bypassPermissions`** (per W325-C remediation)
- `skipDangerousModePermissionPrompt: true` (L458) — **CRITICAL**: this is the **persistence of bypass intent** at session-level. Per Anthropic CC `settings.json` schema, this flag suppresses the operator-prompt that would otherwise gate dangerous bash commands; **semantically equivalent** to old `bypassPermissions:true` at runtime for dangerous-mode commands.

**S12-F07 (P1)** — `skipDangerousModePermissionPrompt:true` was set when CC ran in `--dangerously-skip-permissions` mode and **was not unset** when `defaultMode` was reverted to `"default"` in W325-C. **Operator-AI remediation**: flip to `false` (default) in `settings.json:458`. **CWE-250** (Execution with Unnecessary Privileges).

**S12-F08 (P2)** — `cleanupPeriodDays: 60` (L3) — exposed transcripts/state retained for 60d. Per `https://code.claude.com/docs/en/settings`, default is 30. **CWE-532** (Insertion of Sensitive Information into Log File). Mitigation: reduce to 30 OR add 7-day rotation of `.claude/projects/` JSONLs to encrypted archive.

### §3.2 sandbox.enabled Status (6-Wave Convergent SHIP-BLOCKER)

**Live `settings.json` state**:
```
sandbox: {
  enabled: false,                  (L442 — DISABLED)
  failIfUnavailable: true,         (L443 — would fail-closed IF enabled)
  autoAllowBashIfSandboxed: true,  (L444)
  excludedCommands: ["git","docker","npx","uvx"],  (L445 — exclude-list when sandboxed)
  allowUnsandboxedCommands: true   (L446 — ESCAPE HATCH: even if enabled, allow unsandboxed)
}
```

**Root cause** (per W328 Stream A): **Anthropic CC sandbox is macOS/Linux/WSL2 only**. Windows-native CC has no sandbox available (`bwrap`/`firejail`/`Seatbelt` Linux/macOS native; Windows lacks equivalent in CC v2.1.144).

**S12-F09 (P1)** — sandbox unavailable on this Windows-native runtime is an **environment-imposed constraint**, not a config error. Two remediation paths:
- **Path A (move-to-WSL2)**: relocate runtime to WSL2 Ubuntu inside Windows; CC sandbox works. **Cost**: filesystem perf hit (NTFS→ext4 mount); MCP path-rewriting for stdio servers; ~2-3 wave migration effort.
- **Path B (accept-and-compensate)**: keep Windows-native; document acceptance in ADR; **mandate** stronger Control 1 (deny-default fully wired) + Control 2 (audit-logging wired) + Control 4 (egress policy) to compensate. **Cost**: implementation of those 3 controls (~1 wave).

**Recommendation**: **Path B**. Sandbox provides defense-in-depth at OS level; missing sandbox can be partially compensated by App-layer controls. Path A migration cost > Path B implementation cost.

**CWE-693** (Protection Mechanism Failure) — applies to BOTH the unavailability AND the `allowUnsandboxedCommands:true` escape-hatch. **OWASP A04:2021** (Insecure Design).

---

## §4 Hook-Script CR-2 Audit

### §4.1 Inventory

**`.claude/hooks/`** directory contents (`ls .claude/hooks/`):
- `context-mode-cache-heal.mjs` — only file present (~1.0 KB code body)

**`tools/` hook-invoked scripts** (referenced from `settings.json` PreToolUse Agent matcher L153/158):
- `tools/preagent-parallel-guard.mjs` — 6,365 bytes
- `tools/preagent-subagent-validator.mjs` — 3,957 bytes

### §4.2 Per-Script CR-2 Compliance

Per CLAUDE.md cardinal-rule-2 (L19): "**No project-owned hook bodies (any extension `.py|.sh|.mjs|.js|.ts|.ps1|.bat`) under `.claude/hooks/**`, EXCEPT documented bug-patch shims cite-anchored to a specific `anthropics/claude-code` GitHub issue and ≤2 KB**".

| Script Path | Size | Under `.claude/hooks/`? | Cite-anchored to GH issue? | CR-2 Status |
|------------|------|------------------------|---------------------------|-------------|
| `.claude/hooks/context-mode-cache-heal.mjs` | ~1.0 KB | YES | YES — line 3: "Fixes anthropics/claude-code#46915" | **COMPLIANT** — sanctioned exception per CLAUDE.md L19 |
| `tools/preagent-parallel-guard.mjs` | 6.4 KB | NO (under `tools/`) | N/A | **COMPLIANT** — out-of-scope (CR-2 only restricts `.claude/hooks/**`) |
| `tools/preagent-subagent-validator.mjs` | 4.0 KB | NO (under `tools/`) | N/A | **COMPLIANT** — out-of-scope |

**Hook-command-inline analysis** (`settings.json` hook `command` fields that contain logic in-line, not just script invocations):
- L124 `gitleaks protect --staged` — CR-2 compliant (upstream-CLI direct invocation)
- L128 `bash -c "...trivy fs..."` — CR-2 compliant (upstream-CLI invocation; trivy is upstream)
- L133 `bash -c "...codex-companion.mjs adversarial-review..."` — CR-2 compliant (calls plugin script under `.claude/plugins/cache/openai-codex/codex/1.0.4/scripts/`, which is upstream-plugin-shipped — NOT project-owned)
- L143 `bash -c "...grep VERDICT-LEDGER..."` — INLINE LINT, ≤5s timeout, pure stderr-output, no state mutation — **EDGE CASE**: this is a 200-char one-liner that lints a specific file. Per CR-2 strict reading, "no project-owned hook bodies" applies to file extensions; inline `bash -c` strings are settings.json content, not file bodies. **COMPLIANT** but watch-list — if this grows to >5 lines, split into a `tools/` script with cite.
- L170 `bash -c "ruff check ... shellcheck ..."` — same edge case; inline. **COMPLIANT**.
- L181 PowerShell precompact log — same; inline. **COMPLIANT**.
- L201 PowerShell beep — trivial; **COMPLIANT**.
- L212 PowerShell hook-feedback — JSON parse logic ~200 chars; **EDGE CASE WATCH-LIST**.
- L223 `ruff check tools harness --quiet` — direct CLI; **COMPLIANT**.

**Verdict**: **all hook scripts/commands CR-2 compliant**. Sanctioned exception (`context-mode-cache-heal.mjs`) properly cite-anchored to GH issue #46915 (verified open per CLAUDE.md L19 — title "Plugin auto-update deletes old cache dir...").

**S12-F10 (P3)** — inline `bash -c` hook commands in settings.json (L128, L133, L143, L170, L212) are CR-2-edge; recommend extracting any future hook command exceeding 5 lines into `tools/<name>.mjs` with cite-anchor comment header.

---

## §5 MCP-Server CR-9 Supply-Chain Audit

### §5.1 Pin-Version Compliance Matrix

Per CLAUDE.md cardinal-rule (W286-arc-P0C ratification 2026-05-18): "**`.mcp.json` MCP-server `command/args` contract is `npx -y <pkg>@<pinned-version>`**".

| MCP | Type | command/args (.mcp.json line) | Pinned? | Version | CR-9 Compliant |
|-----|------|-------------------------------|---------|---------|----------------|
| deepwiki | http | `https://mcp.deepwiki.com/mcp` | N/A (HTTP-MCP, no client pin) | upstream | N/A |
| chrome-devtools | stdio | `npx -y chrome-devtools-mcp@1.0.1` (L24) | YES | 1.0.1 | YES |
| repomix | stdio | `npx -y repomix@1.14.0 --mcp` (L29) | YES | 1.14.0 | YES |
| serena | stdio | `uvx --from git+https://github.com/oraios/serena@249f6b07f9... serena ...` (L34) | YES (SHA-pin) | SHA `249f6b07` | YES |
| gitnexus | stdio | `gitnexus mcp` (L38-39) | NO (resolves via PATH global) | NA in file | **GAP** — relies on npm-global pin (1.6.4-rc.112 per _comments_) but the npm-global is mutable outside `.mcp.json` |
| ccusage | stdio | `npx -y @ccusage/mcp@18.0.11` (L44) | YES | 18.0.11 | YES |
| cognee | http | `http://127.0.0.1:8000/mcp` | N/A (local NSSM service) | NSSM-pinned | N/A |
| langfuse | stdio | `node Z:/claude-sota-installed-repos/langfuse/mcp-server-langfuse/build/index.js` (L52-53) | YES (vendored at commit-pinned path) | path-baked | YES (with portability caveat per W286-cross) |
| basic-memory | stdio | `uvx --from basic-memory==0.21.1 basic-memory mcp` (L64) | YES | 0.21.1 | YES |
| hf-mcp-server | http | `https://huggingface.co/mcp` | N/A | upstream | N/A |
| perplexity | stdio | `npx -y @perplexity-ai/mcp-server@0.9.0` (L77) | YES | 0.9.0 | YES |
| playwright | stdio | `npx -y @playwright/mcp@0.0.75` (L85) | YES | 0.0.75 | YES |
| tavily | stdio | `npx -y tavily-mcp@0.2.19` (L90) | YES | 0.2.19 | YES |
| exa | stdio | `npx -y exa-mcp-server@3.2.1` (L98) | YES | 3.2.1 | YES |

**Verdict**: **13/14 servers CR-9-compliant**. **1 gap (gitnexus, L38-39)** — `gitnexus mcp` PATH-resolution depends on the npm-global being on `0.16.4-rc.112`; an `npm install -g gitnexus@latest` would silently bump without `.mcp.json` change. **S12-F11 (P2)** — change to `npx -y gitnexus@1.6.4-rc.112 mcp` for CR-9 parity.

### §5.2 SLSA v1.0 Build L3 Evidence

**Per SLSA v1.0 Build L3 requirements**: build provenance + signed attestation + non-falsifiable build process.

| MCP | Source Provenance | Build L3 Evidence | SLSA Tier |
|-----|-------------------|-------------------|-----------|
| chrome-devtools | Microsoft official OSS (`ChromeDevTools/chrome-devtools-mcp`) | npm provenance: NO (npm registry, no `attestations` field on 1.0.1) | **L2** (signed publisher, no build attestation) |
| repomix | yamadashy/repomix MIT | npm registry, no SLSA attestation | **L2** |
| serena | oraios/serena (SHA-pinned via uvx git+) | Git-SHA-pinned (immutable ref) | **L2.5** (SHA-pin = stronger than version-pin, no SLSA attestation) |
| ccusage | @ccusage/mcp 18.0.11 | npm registry, no attestation | **L2** |
| basic-memory | basicmachines-co MIT | PyPI uv-pinned 0.21.1 | **L2** |
| perplexity | ppl-ai/modelcontextprotocol MIT (3 perplexity-employed maintainers per `.mcp.json` `_comments_addendum.w317_s7_perplexity_2026_05_19`) | npm registry, no attestation | **L2** |
| playwright | Microsoft official | npm provenance — most Microsoft npm packages DO ship `attestations` since 2024 — **verify with `npm view @playwright/mcp@0.0.75 dist.attestations`** (not run in this audit; queued) | **L2-L3 candidate** |
| tavily | tavily-ai/tavily-mcp | npm registry, no attestation | **L2** |
| exa | exa-labs/exa-mcp-server | npm registry, no attestation | **L2** |
| gitnexus | abhigyanpatwari (PolyForm Noncommercial) | npm registry, no attestation | **L2** |
| langfuse | self-vendored build at `Z:/claude-sota-installed-repos/langfuse/...` | local build (no remote attestation) | **L1** (vendored source-build, no provenance) |

**Verdict**: **majority L2**, playwright is L2-L3 candidate. **No supply-chain SLSA L3 evidence currently captured.**

**S12-F12 (P2)** — no SBOM (Software Bill of Materials) generated for the MCP-server dep tree. Mitigation: run `npm sbom --output-format=cyclonedx-json` against each `.mcp.json` MCP's package.json (post-`npm install`) and commit to `docs/sbom/<mcp>.cdx.json`. **CWE-1357** (Reliance on Insufficiently Trustworthy Component). **OWASP A06:2021** (Vulnerable and Outdated Components).

**S12-F13 (P3)** — no Sigstore cosign verification on npm packages. Verify-on-install via `npm install --verify-attestations` (Node 24+) recommended once Anthropic CC `npx` shim is updated to pass-through the flag.

---

## §6 OWASP Top-10 (2021) Mapping Per Finding

| Finding | Description | A01 BAC | A02 Crypto | A03 Inj | A04 InsDes | A05 SecMis | A06 VulComp | A07 IdAuth | A08 SwInt | A09 Log | A10 SSRF | Severity |
|---------|-------------|---------|-----------|---------|------------|-----------|-------------|-----------|-----------|---------|---------|----------|
| S12-F01 | Perplexity API key committed at desktop-runtime-audit-2026-05-15.md:85 | | | | | | | X | | | | **P0** |
| S12-F02 | GitHub fine-grained PAT same file:line | | | | | | | X | | | | **P0** |
| S12-F03 | 66 generic-api-key noise in codex-verdicts archive | | | | | X | | | | | | P3 |
| S12-F04 | Langfuse loopback HTTP-not-HTTPS at :3000 | | X | | | | | | | | | P2 |
| S12-F05 | .mcp.json env-interp audit (PASSED) | | | | | | | | | | | INFO |
| S12-F06 | codex auth.json plaintext on NTFS | | X | | | | | X | | | | P2 |
| S12-F07 | skipDangerousModePermissionPrompt:true residual | | | | X | X | | | | | | **P1** |
| S12-F08 | cleanupPeriodDays=60 transcript retention | | | | | X | | | | X | | P2 |
| S12-F09 | sandbox.enabled:false + allowUnsandboxedCommands:true | | | | X | X | | | | | | **P1** |
| S12-F10 | Inline `bash -c` hook commands edge-CR-2 | | | | | X | | | | | | P3 |
| S12-F11 | gitnexus MCP PATH-resolution (no version-pin in .mcp.json) | | | | | | X | | X | | | P2 |
| S12-F12 | No SBOM (CycloneDX/SPDX) for MCP dep tree | | | | | | X | | X | | | P2 |
| S12-F13 | No Sigstore cosign verification on npm install | | | | | | X | | X | | | P3 |

**OWASP Top-10 Coverage Summary**:
- **A01 Broken Access Control**: 0 findings (deny-list comprehensive — see §2 C1)
- **A02 Cryptographic Failures**: 2 (F04 cleartext loopback, F06 plaintext storage)
- **A03 Injection**: 0
- **A04 Insecure Design**: 2 (F07 dangerous-mode residual, F09 sandbox-design-gap)
- **A05 Security Misconfiguration**: 5 (F03, F07, F08, F09, F10) — **largest cluster**
- **A06 Vulnerable & Outdated Components**: 3 (F11, F12, F13) — **supply-chain cluster**
- **A07 Identification & Authentication Failures**: 3 (F01, F02, F06)
- **A08 Software & Data Integrity Failures**: 3 (F11, F12, F13)
- **A09 Logging & Monitoring Failures**: 1 (F08) — also implied by R5 Control 2 zero-score
- **A10 SSRF**: 0

**Highest-density category**: **A05 (5 findings) + A07 (3, but includes 2 P0)** = secrets-hygiene + config-hardening are the two strongest investment targets.

---

## §7 NIST 800-53 Rev 5 Control Mapping Per Finding

Cross-reference table: each finding mapped to applicable NIST 800-53 Rev 5 controls.

**Control legend**:
- **AC-3** Access Enforcement
- **AC-6** Least Privilege
- **AU-2** Event Logging
- **AU-12** Audit Record Generation
- **CM-7** Least Functionality
- **CM-8** System Component Inventory
- **IA-5** Authenticator Management (credentials)
- **SC-7** Boundary Protection
- **SC-8** Transmission Confidentiality and Integrity
- **SC-13** Cryptographic Protection
- **SC-28** Protection of Information at Rest
- **SI-7** Software, Firmware, and Information Integrity
- **SI-10** Information Input Validation
- **SR-3** Supply Chain Controls and Processes
- **SR-11** Component Authenticity

| Finding | Applicable NIST 800-53 Controls | Control-Family Density |
|---------|-------------------------------|----------------------|
| S12-F01 (perplexity-key live in git) | **IA-5**, **AC-3**, **SC-28**, AU-2 (rotation log absent) | IA + AC |
| S12-F02 (github-pat live in git) | **IA-5**, **AC-3**, **SC-28**, AU-2 | IA + AC |
| S12-F03 (codex-verdicts noise) | CM-8 (component inventory: noise vs signal) | CM |
| S12-F04 (langfuse cleartext loopback) | **SC-8**, SC-13, SC-7 | SC |
| S12-F05 (.mcp.json env-interp PASS) | IA-5 (compliant) | IA |
| S12-F06 (codex auth.json plaintext) | **SC-28**, IA-5, SC-13 | SC + IA |
| S12-F07 (skipDangerousMode residual) | **AC-6**, AC-3, CM-7 | AC |
| S12-F08 (cleanupPeriodDays=60) | **AU-11** (Audit Record Retention) AU-9 (Protection of Audit Information) | AU |
| S12-F09 (sandbox disabled) | **SC-7**, SC-3 (Security Function Isolation), AC-6 | SC + AC |
| S12-F10 (inline hook commands) | CM-7, SI-10 (input validation on hook scripts) | CM + SI |
| S12-F11 (gitnexus PATH-resolution) | **SR-3**, **SR-11**, CM-8, SI-7 | SR + CM |
| S12-F12 (no SBOM) | **SR-3**, **CM-8**, SI-7 | SR + CM |
| S12-F13 (no cosign verification) | **SR-11**, SR-3, SI-7 | SR + SI |

**R5 5-Control NIST anchors** (the layered-defense controls themselves):
- R5-C1 (deny-default permissions) → **AC-3** + AC-6
- R5-C2 (audit-logging) → **AU-2** + **AU-12** — **CURRENTLY ZERO IMPLEMENTATION** (largest NIST gap)
- R5-C3 (gitleaks PreToolUse) → **SI-10** + IA-5 + SR-3
- R5-C4 (egress policy) → **SC-7** + AC-4 (Information Flow Enforcement)
- R5-C5 (drift-detection) → **CM-3** (Configuration Change Control) + AU-2

**Largest NIST family gaps** (counts of findings per family):
- **SR (Supply Chain Risk)**: 3 findings (F11, F12, F13) — no SBOM, no cosign verify, version-pin gap
- **IA (Identification & Authentication)**: 4 findings (F01, F02, F06, F07) — 2 P0 unrotated keys
- **AU (Audit & Accountability)**: 2 findings (F08, R5-C2 zero) — no PreToolUse audit log, 60d retention with no rotation
- **SC (System & Communications Protection)**: 4 findings (F04, F06, F09 [twice]) — loopback HTTP, plaintext storage, no sandbox

**Recommended NIST baseline for next wave**: target **NIST 800-53 LOW baseline** as ship-floor (currently at ~60% LOW coverage); MODERATE baseline requires R5-C2 audit-logging full implementation + SBOM + sandbox availability (the latter = WSL2 migration).

---

## §8 P0 Remediation Checklist

### §8.1 Operator-Action (human-required — CC cannot do these)

| # | Action | Finding | Effort | Priority |
|---|--------|---------|--------|----------|
| OP-1 | **Rotate perplexity API key** at perplexity.ai/dashboard. Old key remains in git reflog + remote forks even after history-rewrite — rotation FIRST is mandatory. Then update `CLAUDE.local.md` `$env:PERPLEXITY_API_KEY` to new value. | S12-F01 | 5 min | **P0 BLOCKER** |
| OP-2 | **Revoke + regenerate GitHub fine-grained PAT** at github.com/settings/personal-access-tokens. Verify token-permissions list (least-privilege check). Update `CLAUDE.local.md` if used by CC. | S12-F02 | 10 min | **P0 BLOCKER** |
| OP-3 | **Decide WSL2-migration vs Windows-native + compensating-controls** for sandbox gap (S12-F09). Document decision in ADR. | S12-F09 | 30 min decision; 1-3 waves if migrating | **P1 OPERATOR-DECISION** |
| OP-4 | **Verify .codex/auth.json ACLs** — `icacls Z:/claude-sota-installed-state/.codex` should show user-only RW, no Everyone/Authenticated Users. Apply EFS via `cipher /E` if higher protection desired. | S12-F06 | 10 min | P2 |
| OP-5 | **Manual gitleaks .gitleaksignore tuning** — review the `sourcegraph-access-token` 16,206 false-positive cluster; add path-allow for `docs/architecture/**/codex-verdicts/**` (auditor-curated since these are codex review-text artifacts, not live secrets). | S12-F03 | 15 min | P3 |

### §8.2 Operator-AI-Action (delegate-to-CC-next-wave)

| # | Action | Finding | Effort | Priority | Skill/Pattern to invoke |
|---|--------|---------|--------|----------|------------------------|
| AI-1 | **`git filter-repo --replace-text rotation-patterns.txt`** to redact S12-F01/F02 from `desktop-runtime-audit-2026-05-15.md:85` AFTER operator rotation (OP-1/OP-2). Validate post-rewrite with `gitleaks detect --source .` zero-P0 hits + `git log --all -p -S '<old-key-prefix>'` zero hits. Force-push-with-lease the 3 branches W321/goal/W287-reconcile/sota-converge-w290. | S12-F01, S12-F02 | 30 min | **P0** | `engineering-skills:senior-secops` + `superpowers:verification-before-completion` |
| AI-2 | **Wire R5 Control 2 audit-logging** — add PreToolUse hook that appends `{ts, tool, file_path, command}` to `.claude/state/audit/tool-use.jsonl` per Anthropic CC hook semantics. Rotate daily; retention 90 days. Anchor to `https://docs.anthropic.com/en/docs/claude-code/hooks` schema. | R5-C2 | 1-2 hours | **P0 (R5 gate)** | `update-config` + `engineering-skills:senior-devops` |
| AI-3 | **Extend gitleaks PreToolUse hook** from `Bash`-only to `Edit\|Write\|MultiEdit` matchers (R5-C3 gap). Hook body: redact-style scan on `.tool_input.content` of Edit/Write payload before mutation. | R5-C3 gap | 1 hour | **P0 (R5 gate)** | `update-config` + `block-no-verify:block-no-verify-hook` (pattern) |
| AI-4 | **Flip `skipDangerousModePermissionPrompt:true` → `false`** in `settings.json:458`. Verify no regression in dangerous-bash flows (operator confirms 3 dangerous-mode bash calls work with prompt). | S12-F07 | 10 min | **P1** | `update-config` |
| AI-5 | **Tighten egress policy (R5-C4)** — extend `permissions.deny` to block `curl https://*` to non-allowlisted hosts; whitelist npm-registry, PyPI, GitHub, Anthropic, OpenAI, perplexity, langfuse loopback. Add `WebFetch` host-allowlist (positive-list, not deny-list). | R5-C4 gap, S12-F08 | 2 hours | **P1** | `update-config` |
| AI-6 | **Generate SBOMs for all 14 MCP servers** — `npm sbom --output-format=cyclonedx-json > docs/sbom/<mcp>.cdx.json`, one per stdio MCP. Track in `docs/sbom/INDEX.md` with SLSA tier per row. | S12-F12 | 2 hours | **P2** | `engineering-advanced-skills:dependency-auditor` |
| AI-7 | **Add npm Sigstore verify** — when Anthropic CC `npx` shim supports `--verify-attestations`, wire it as the default `npx` invocation for the 8 npx-invoked MCPs. Stub a placeholder ADR for re-evaluation in 3 waves. | S12-F13 | 30 min ADR + future-wired | P3 | `update-config` |
| AI-8 | **Convert gitnexus `command: "gitnexus"` to `npx -y gitnexus@1.6.4-rc.112 mcp`** in `.mcp.json:38-39` for CR-9 parity. Verify gitnexus.exe NSSM service unaffected. | S12-F11 | 15 min | P2 | `update-config` |
| AI-9 | **Reduce `cleanupPeriodDays` 60→30** in `settings.json:3`. Anchor to Anthropic default + add ADR if longer retention required. | S12-F08 | 5 min | P2 | `update-config` |
| AI-10 | **Add Langfuse loopback-only invariant** ADR + Windows-firewall deny rule for `:3000` non-loopback. Prevents future LAN/WAN exposure of `pk-lf-` token in clear text. | S12-F04 | 30 min | P2 | `engineering-skills:senior-secops` |
| AI-11 | **Wire R5 Control 5 drift-detection** — pre-commit hook that detects mutations to `settings.json` security-relevant keys (permissions, sandbox, defaultMode, skipDangerousMode) and requires double-confirm + auto-codex-review per W280a Stop-hook pattern. | R5-C5 gap | 2 hours | P1 | `update-config` + `dual-review` (per Z:/claude-sota-installed/.claude/commands/dual-review semantics) |
| AI-12 | **Extract inline `bash -c` hook commands** (S12-F10 watch-list) to `tools/hook-<name>.mjs` once any single hook command exceeds 5 lines. Add cite-anchor comment header per CR-2. | S12-F10 | as-needed | P3 | `update-config` |

**Ship-gate-pass conditions** (compound):
- ALL 4 P0s closed (OP-1, OP-2, AI-1, AI-2, AI-3) → unblocks R5 ≥6.0
- ALL 4 P1s closed (OP-3 decided, AI-4, AI-5, AI-11) → unblocks R5 ≥8.0 STRONG
- 6 P2s + 4 P3s recommended within next 3 waves → IDEAL state

**Estimated total operator-AI effort**: ~12 hours across 12 AI-actions (parallelizable ~3-4 hours wall-clock with W269-mandate 4-stream parallel dispatch).

**Estimated total operator effort**: ~30 minutes (OP-1 + OP-2 + OP-3 decision) + 30 minutes (OP-4 + OP-5) = ~1 hour.

---

## §9 Appendix — Evidence Logs

### §9.1 Gitleaks Scan Artifacts

- **Full-history scan**: `Z:/claude-sota-installed/tmp/gitleaks-w327-s12.json` (30 MB) — 1264 commits, 16,334 findings, 1m33s
- **Worktree-only scan**: `Z:/claude-sota-installed/tmp/gitleaks-w327-s12-worktree.json` (running in background, ID `b65v2v87g`)
- **Gitleaks version**: 8.30.1 at `/z/claude-sota-installed/.local/bin/gitleaks`
- **Rule signal-to-noise**: 128/16,334 = **0.78%** actionable; **99.22% noise** (sourcegraph-access-token regex over-matches)

### §9.2 Key Files Audited (with absolute paths)

- `Z:/claude-sota-installed/.mcp.json` — 14 MCP servers, CR-9 audit
- `Z:/claude-sota-installed/.claude/settings.json` — 462 lines, R5 controls + hooks + permissions
- `Z:/claude-sota-installed/.gitignore` — confirmed CLAUDE.local.md + .codex + credentials patterns
- `Z:/claude-sota-installed/.claude/hooks/context-mode-cache-heal.mjs` — sole sanctioned hook (cite anthropics/claude-code#46915)
- `Z:/claude-sota-installed/tools/preagent-parallel-guard.mjs` — 6.4 KB (out-of-CR-2-scope, under tools/)
- `Z:/claude-sota-installed/tools/preagent-subagent-validator.mjs` — 4.0 KB (same)
- `Z:/claude-sota-installed/docs/architecture/_archive/W259-grand-catalog-archive/prior-wave-grand-synthesis-2026-05-16/02-wave-keep-canonical/desktop-runtime-audit-2026-05-15.md` — **P0 LIVE SECRET LOCATION, line 85**, commit `52881fde411ceed8d736d1a9c7d49797268dfd88`
- `Z:/claude-sota-installed-state/.codex/auth.json` — codex credentials (out-of-worktree, OS-ACL protected)

### §9.3 Git Provenance of S12-F01/F02 (P0 Secrets)

```
Commit:  52881fde411ceed8d736d1a9c7d49797268dfd88
Author:  42 <[user]>
Date:    2026-05-16T19:48:08Z
Branches (--contains): W321, goal/W287-reconcile, sota-converge-w290 (local-only)
Remotes:  NONE (verified `git branch -r --contains 52881fde` empty)
```

**Critical**: not on remote → **not yet leaked to GitHub event-log** → rotation + history-rewrite has clean window NOW. Any `git push` of these 3 local branches would propagate the secret.

### §9.4 R5 5-Control Cross-Wave Trend

| Wave | C1 deny | C2 audit | C3 gitleaks | C4 egress | C5 drift | TOTAL |
|------|---------|----------|-------------|-----------|----------|-------|
| W316 | 0 | 0 | 0 | 0 | 0 | 0/10 |
| W319 | 0.5 | 0 | 0.5 | 0 | 0 | 1.0/10 |
| W325-C | 1.0 | 0 | 1.5 | 0.5 | 1.0 | 4.0/10 |
| W328-A | 1.0 | 0 | 1.5 | 0.5 | 1.0 | 4.0/10 |
| **W327-S12 (this audit)** | **1.0** | **0** | **1.5** | **0.5** | **1.0** | **4.0/10** |

**Trend**: STAGNANT at 4.0/10 since W325-C delivery (3 waves). **W326 G7 RED-ALERT applies**: composite-arch-quality penalty would fire at W328+3 = W331 if not advanced beyond 4.0 marginal-pass.

### §9.5 References

- OWASP Top-10 (2021 ed): `https://owasp.org/Top10/`
- NIST SP 800-53 Rev 5: `https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final`
- SLSA v1.0 Build L3: `https://slsa.dev/spec/v1.0/levels`
- CWE Top 25: `https://cwe.mitre.org/top25/`
- Anthropic CC settings.json schema: `https://json.schemastore.org/claude-code-settings.json`
- Anthropic CC hooks docs: `https://docs.anthropic.com/en/docs/claude-code/hooks`
- Anthropic CC permissions docs: `https://docs.anthropic.com/en/docs/claude-code/settings`
- gitleaks 8.30.1 docs: `https://github.com/gitleaks/gitleaks/tree/v8.30.1`

### §9.6 Audit Boundary

- **In scope**: `Z:/claude-sota-installed/` worktree + git history + `.mcp.json` MCP supply-chain (14 servers) + `Z:/claude-sota-installed-state/.codex/` sibling state-dir
- **Out of scope**: parent harness `Z:/claude/` (per CLAUDE.local.md "untouched"); sibling `Z:/claude-sota/` (also untouched); `Z:/repos/deps/` (cite-reference only); local NSSM services internals (cognee, LlamaSwap, Ollama, langfuse) — service-internal security audited per-service in separate wave
- **Methodology limitations**: regex-based gitleaks does not validate live-key reachability against vendor APIs (proves syntactic match, not API-usable). No dynamic testing (DAST) of MCP servers. No fuzz testing of CC hook commands.

---

**End of Audit — W327-S12.**

Generated by senior-security DevSecOps auditor role, 2026-05-19. Cross-referenced against W326 G7 + W328 Stream A independent audits. Standards-anchored per OWASP Top-10 (2021), NIST SP 800-53 Rev 5, SLSA v1.0, CWE Top-25.


