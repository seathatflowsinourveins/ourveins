# W328-A-1 — settings.json State (permissions + sandbox + defaultMode)

**Wave**: W328 Stream A · **Date**: 2026-05-19 · **HEAD at audit**: `2c48b1e`
**Source-of-truth**: `Z:/claude-sota-installed/.claude/settings.json` lines read inline (no edits — verification only)
**Provenance**: defaultMode flip introduced in commit `6b4b0b4` (W327-r2-amend, 2026-05-19 15:55:33 -0400), preserved through `2c48b1e` (W327-r3); originated via parallel-session sweep, not W327 Stream D doc-only scope

---

## §1. defaultMode (line 92) — VERIFIED

| Field | Value (HEAD `2c48b1e`) | Pre-W327 value | Cardinal-rule R5 implication |
|---|---|---|---|
| `permissions.defaultMode` | **`"default"`** | `"bypassPermissions"` | R5 8-wave SHIP-BLOCKER **CONFIG-LEVEL UNBLOCK** |

**Diff** (`git diff 569080a 2c48b1e -- .claude/settings.json`):
```diff
@@ -89,7 +89,7 @@
       "Read(**/credentials.json)",
       "Read(**/*.crt)"
     ],
-    "defaultMode": "bypassPermissions"
+    "defaultMode": "default"
   },
```

**Behavioral consequence** (per `https://code.claude.com/docs/en/settings`): Bash/Edit/Write/MCP tool calls NOT listed in `permissions.allow` will now prompt the operator. `bypassPermissions` flag fully removed; the autonomous-loop velocity posture must rely on the explicit allow-list at L58-71.

---

## §2. permissions.allow (lines 58-71) — 11 entries

```json
"allow": [
  "Edit(Z:/claude-sota-installed/.claude/settings.json)",
  "Edit(Z:/claude-sota-installed/CLAUDE.md)",
  "Edit(Z:/claude-sota-installed/docs/sota-installed-manifest.md)",
  "Edit(Z:/claude-sota-installed/docs/install-provenance.md)",
  "Bash(npm install -g *)",
  "Bash(uv tool install *)",
  "Bash(uvx *)",
  "Bash(gh release download *)",
  "Bash(git clone --depth 1 https://github.com/* *)",
  "Bash(docker pull *)",
  "Bash(cargo install *)",
  "Bash(codex *)"
]
```

**Adequacy assessment**:
- 4 Edit-specific paths (settings + memory + manifests) — **narrow + appropriate**
- 8 Bash predicates focused on **install primitives** (npm/uv/uvx/gh-rel/git-clone/docker/cargo) + codex
- **GAP**: zero `Bash(git *)` allow → every `git status` / `git log` / `git diff` will now prompt
- **GAP**: zero `Bash(ls *)`, `Bash(jq *)`, `Bash(rg *)`, `Bash(node *)` → routine workflow primitives prompt-flood
- **GAP**: no `Read(*)` allow → reading source files is gated by `defaultMode` (prompts) rather than allow-list

This matches what W325-C Option A predicted: **~20 new common-operator Bash predicates must be enumerated upfront**. Currently only 8 are enumerated.

---

## §3. permissions.deny (lines 72-91) — 17 entries

```json
"deny": [
  "Read(./.env)", "Read(./.env.*)", "Read(./secrets/**)",
  "Read(**/id_rsa)", "Read(**/id_ed25519)",
  "Read(**/*.pem)", "Read(**/*.pfx)", "Read(**/*.key)",
  "Read(./CLAUDE.local.md)", "Read(./tools/eee.local.ps1)",
  "Read(**/.aws/credentials)", "Read(**/.ssh/config)", "Read(**/.ssh/known_hosts)",
  "Read(**/.netrc)", "Read(**/.npmrc)", "Read(**/.docker/config.json)",
  "Read(**/credentials.json)", "Read(**/*.crt)"
]
```

**Adequacy** (vs W325-C Option C Patch C1 spec at `docs/architecture/W325-R5-UNBLOCK-EXPLORE/STREAM-C-OPTION-C-LAYERED-DEFENSE.md:35-70`):

| Patch C1 entry (32 total) | Live (17/32) | Missing (15/32) |
|---|---|---|
| `./.env` / `./.env.*` / `./secrets/**` | ✓ | — |
| `id_rsa` / `id_ed25519` / `*.pem` / `*.pfx` / `*.key` | ✓ | — |
| `./CLAUDE.local.md` / `./tools/eee.local.ps1` | ✓ | — |
| `**/.aws/credentials` / `**/.ssh/config` / `**/.ssh/known_hosts` | ✓ | — |
| `**/.netrc` / `**/.npmrc` / `**/.docker/config.json` | ✓ | — |
| `**/credentials.json` / `**/*.crt` | ✓ | — |
| **`Read(**/.codex/**)`** | ✗ MISSING | Yes |
| **`Read(**/.anthropic/**)`** | ✗ MISSING | Yes |
| **`Read(**/AppData/Roaming/Mozilla/Firefox/Profiles/**)`** | ✗ MISSING | Yes |
| **`Read(**/AppData/Local/Google/Chrome/User Data/**)`** | ✗ MISSING | Yes |
| **`Read(**/AppData/Roaming/Microsoft/Edge/User Data/**)`** | ✗ MISSING | Yes |
| **`Read(**/Library/Application Support/Firefox/Profiles/**)`** | ✗ MISSING | Yes |
| **`Read(**/HKEY_LOCAL_MACHINE/**)`** | ✗ MISSING | Yes |
| **`Read(**/HKEY_CURRENT_USER/Software/Microsoft/Windows/CurrentVersion/Run/**)`** | ✗ MISSING | Yes |
| **`Bash(curl http://*)`** | ✗ MISSING | Yes |
| **`Bash(wget http://*)`** | ✗ MISSING | Yes |
| **`Bash(sudo *)`** | ✗ MISSING | Yes |
| **`Bash(chmod 777 *)`** | ✗ MISSING | Yes |
| **`WebFetch(domain:bit.ly)` / `tinyurl.com` / `t.co`** | ✗ MISSING | Yes |

**Finding**: deny-list is the **W325 pre-Patch-C1 baseline** (17 entries). Patch C1's 15 expanded entries (`.codex/`, `.anthropic/`, browser-profile dirs, registry-hive read patterns, dangerous Bash predicates, shortener-domain WebFetch denies) **NOT applied**. Option C wire was specified as: defaultMode UNCHANGED + sandbox UNCHANGED + Patch C1 expansion. Live config has the **inverse**: defaultMode CHANGED + sandbox UNCHANGED + Patch C1 NOT applied.

---

## §4. sandbox block (lines 429-435) — UNCHANGED post-W327

```json
"sandbox": {
  "enabled": false,
  "failIfUnavailable": false,
  "autoAllowBashIfSandboxed": true,
  "excludedCommands": ["git", "docker", "npx", "uvx"],
  "allowUnsandboxedCommands": true
}
```

**Field-by-field assessment**:

| Field | Live value | Anthropic-canonical Option A spec | Status |
|---|---|---|---|
| `enabled` | `false` | `true` | ✗ unchanged from pre-W327 |
| `failIfUnavailable` | `false` | `true` | ✗ unchanged |
| `autoAllowBashIfSandboxed` | `true` | (sandbox-required to take effect) | inert (enabled=false makes this a no-op) |
| `excludedCommands` | `["git", "docker", "npx", "uvx"]` | should NOT include `npx`, `uvx` (HIGH-risk package runners) per K-1 Path 2B step 5 | ✗ unchanged |
| **`allowUnsandboxedCommands`** | **`true`** | `false` per K-1 Path 2B step 4 | ✗ **UNCHANGED** — this re-introduces the R5 SHIP-BLOCKER pattern |

**Critical finding — `allowUnsandboxedCommands: true`**: per W327-D-1 K-1 Path 2B step 4 (`docs/architecture/W327-ARCH-REMEDIATION-PATH/W327-D-1-K1-THROUGH-K7-REMEDIATION-MAP.md:54`), this field MUST be `false` for R5 hard-hold. Combined with `enabled: false`, the entire sandbox block is **structurally inert on Windows-native** AND if it were ever activated by an OS-migration to WSL2/Linux, `allowUnsandboxedCommands: true` would bypass sandboxing for any command not explicitly excluded — re-introducing the SHIP-BLOCKER pattern post-OS-migration.

**On Windows-native today**: the `enabled: false` makes all 5 sandbox fields inert, so `allowUnsandboxedCommands: true` is **moot in current OS** but **dangerous as latent config** if WSL2 migration ever occurs.

---

## §5. Hooks security-relevant rows

### §5.1 PreToolUse Bash hook (line 106-125) — gitleaks WIRED

```
gitleaks protect --staged --no-banner --redact || exit 2
```

**Status**: ✓ WIRED · **Control 3 (secret redaction)**: ACTIVE

### §5.2 PreToolUse Bash hook — trivy fs gated to git-push/commit/pr-create

```
case "$cmd" in *'git push'*|*'git commit'*|*'gh pr create'*)
  trivy fs --quiet --skip-dirs .claude/plugins ... --severity HIGH,CRITICAL ... ;;
```

**Status**: ✓ WIRED · **Control 3 advisory layer**: ACTIVE

### §5.3 PreToolUse Bash hook — destructive-op codex-adversarial-review gate

```
case "$cmd" in
  *'git revert'*|*'git reset --hard'*|*'git push --force'*|*'git push -f '*|*'git checkout -- '*|*'git checkout --force'*)
    'Z:/tools/nodejs/node.exe' 'Z:/claude-sota-installed/.claude/plugins/cache/openai-codex/codex/1.0.4/scripts/codex-companion.mjs' adversarial-review --wait || exit 2 ;;
esac
```

**Status**: ✓ WIRED · **Control 4 (egress / destructive-op gate)**: PARTIAL

### §5.4 PreToolUse Agent hook (lines 137-150) — preagent-parallel-guard + preagent-subagent-validator

```
"Z:/tools/nodejs/node.exe" "Z:/claude-sota-installed/tools/preagent-parallel-guard.mjs"
"Z:/tools/nodejs/node.exe" "Z:/claude-sota-installed/tools/preagent-subagent-validator.mjs"
```

**Status**: ✓ WIRED (new in W327) · **R2 cardinal-rule spirit-question**: `tools/preagent-*.mjs` are project-owned hook bodies OUTSIDE `.claude/hooks/**` literal scope; the W327-r3 commit msg explicitly flags this as a **W328-A boundary-doc question** (R2 specifies `.claude/hooks/**` as restricted path).

### §5.5 PostToolUseFailure Bash hook (lines 195-204) — hook-feedback

```
PostToolUseFailure hook captures permission denied | EACCES | gitleaks errors → emits hookSpecificOutput.additionalContext for next-tool feedback
```

**Status**: ✓ WIRED · **Control 2 (audit-trail partial)**: PARTIAL — captures FAILED tool fires only; does NOT log every Bash/Edit/Write/MCP fire as Control 2 spec requires (SHA-256 hash chain to `.claude/state/audit/<YYYY-MM-DD>.jsonl`).

### §5.6 No Control 2 audit-log hook present

`ls -la .claude/state/audit/` → **directory does NOT exist**. Control 2 audit-logging PreToolUse hook writing `.claude/state/audit/<YYYY-MM-DD>.jsonl` SHA-256 hash chain is **NOT WIRED** (carry-forward per W325-C §4 table row 2).

---

## §6. Cardinal-rule self-check (post-W327)

| Rule | Live status | Evidence |
|---|---|---|
| **R1** Install primitives from trusted plugins/skills/agents | ✓ HOLD | `enabledPlugins` block at L225-294; install manifests; SHA-pinned in `.mcp.json` |
| **R2** Hooks = upstream-plugin OR direct-CLI; no project-owned hook bodies in `.claude/hooks/**` | ◐ HOLD-LITERAL · SPIRIT-QUESTION | `.claude/hooks/context-mode-cache-heal.mjs` is CR-2 sanctioned-exception; `tools/preagent-*.mjs` invoked AS hooks but live OUTSIDE `.claude/hooks/**` path — W327-r3 commit msg explicitly flags this as W328-A doc question |
| **R3** Subagents = installed upstream agents | ✓ HOLD | Agent tool fan-out + agent-teams plugin; no self-invented agents |
| **R4** Project behavior in CLAUDE.md + settings.json | ✓ HOLD | This file; no `.claude/rules/*.md` ad-hoc auto-fire prompts; `self_invented_count: 0` per W255 |
| **R5** Safety via permissions + sandboxing | ◐ **PARTIAL-HOLD UPGRADED** vs W326 baseline | `defaultMode: default` lifts permission-side hold; sandbox block remains structurally inert (Windows-native constraint per K-1 path 2B); Patch C1 deny expansion NOT applied; Controls 2+5 NOT fully wired |

---

## §7. State-vs-spec drift summary

**What W327 ACTUALLY shipped (commit `6b4b0b4`/`2c48b1e`)**:
1. ✓ `defaultMode: bypassPermissions` → `default`
2. ✓ PreToolUse Agent hook for preagent-parallel-guard + preagent-subagent-validator
3. ✗ NO sandbox block changes
4. ✗ NO permissions.deny expansion (Patch C1 missing 15 entries)
5. ✗ NO operator-acceptance-record file authored (`docs/architecture/W325-R5-UNBLOCK-EXPLORE/STREAM-C-OPERATOR-ACCEPTANCE-RECORD.md` does NOT exist)
6. ✗ NO Control 2 audit-log hook (`.claude/state/audit/` dir absent)
7. ✗ NO CLAUDE.md R5-W325-corollary line added

**What W325-C Option C SPECIFIED**:
1. ✗ defaultMode UNCHANGED (Option C preserves `bypassPermissions`)
2. ✗ sandbox UNCHANGED
3. ✓ permissions.deny EXPANDED with 15 Patch C1 entries
4. ✓ operator-acceptance-record FILE AUTHORED + operator-signed
5. ✓ CLAUDE.md R5-W325-corollary pointer line added
6. ✓ Control 2 audit-log hook wired (CR-2 ≤2KB sanctioned-exception)
7. ✓ Control 5 quarterly drift-audit hook wired

**What W327-D K-1 Path 2A SPECIFIED** (W327-D-1 §2 lines 42-47):
1. Reclassify W325-C "EQUIVALENT-HOLD" → "R5-WINDOWS-NATIVE-ACCEPTED-RISK"
2. Author + operator-sign acceptance record with 5 falsifiable-inverse claims
3. Wire signed-audit-trails plugin attest of acceptance-record commit
4. CLAUDE.md R5-W325-corollary line
5. Wire Control 2 audit-logging PreToolUse hook

**What W327-D K-1 Path 2B SPECIFIED** (W327-D-1 §2 lines 50-55):
1. `permissions.defaultMode` → `default` ✓ DONE
2. `permissions.disableBypassPermissionsMode: "disable"` (managed setting) ✗ NOT ADDED
3. `sandbox.failIfUnavailable: true` ✗ NOT CHANGED
4. `sandbox.allowUnsandboxedCommands: false` ✗ NOT CHANGED
5. Remove `npx`, `uvx` from `sandbox.excludedCommands` ✗ NOT CHANGED
6. WSL2/devcontainer/VM migration plan ✗ NOT INITIATED

**Verdict**: live config matches **Path 2B step 1 ONLY** (out of 5 steps + WSL2 prereq). Sandbox-side knobs (steps 2-5) are unchanged from W326-codex-K1-CRITICAL baseline.

---

## §8. Cite-anchors

- `Z:/claude-sota-installed/.claude/settings.json` HEAD `2c48b1e` lines 57-94 (permissions block) + 429-435 (sandbox block) + 106-150 (hooks)
- `git log` HEAD: commit `2c48b1e` (W327-codex-r3) authored 2026-05-19T15:58:49-04:00; commit `6b4b0b4` (W327-codex-r2-amend) authored 2026-05-19T15:55:33-04:00 (defaultMode flip origin)
- `docs/architecture/W325-R5-UNBLOCK-EXPLORE/STREAM-C-OPTION-C-LAYERED-DEFENSE.md` lines 35-70 (Patch C1 spec) + lines 76-91 (sandbox UNCHANGED spec) + line 90 (defaultMode UNCHANGED spec)
- `docs/architecture/W327-ARCH-REMEDIATION-PATH/W327-D-1-K1-THROUGH-K7-REMEDIATION-MAP.md` lines 42-55 (Path 2A + 2B specs)
- `https://code.claude.com/docs/en/sandboxing` (Windows-native NOT in supported list)
- `https://code.claude.com/docs/en/settings` (permissions schema + sandbox schema)
- W327-r3 commit message verbatim "R5 NOW FULL-HOLD post defaultMode='default'" claim — this Stream A verification IDENTIFIES that claim as **OVERCLAIM** (see W328-A-4)
