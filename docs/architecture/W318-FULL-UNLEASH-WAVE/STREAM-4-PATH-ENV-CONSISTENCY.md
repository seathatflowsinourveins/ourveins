# W318 Stream 4 — Path/Env Consistency Audit

**Date**: 2026-05-19
**Sources audited**: `.claude/settings.json` (env+permissions+disabledMcpjsonServers), `tools/eee.ps1` (47 `$env:` sets + 4 `Remove-Item`), `.mcp.json` (10 mcpServers + 4 `${VAR}` interpolations), `CLAUDE.local.md` (Read-denied — operator-managed; not audited)

## §1 — Env-var matrix (var × location, path-typed only; settings vs ps1)

| Var | settings.json:env | eee.ps1 | Conflict? |
|---|---|---|---|
| `HOME` | `Z:\claude-sota-installed` (L46 — W317) | `Z:\claude-sota-installed` (L24) | ✓ match |
| `USERPROFILE` | `Z:\claude-sota-installed` (L47 — W317) | `Z:\claude-sota-installed` (L23) | ✓ match |
| `HOMEDRIVE` | — | `Z:` (L25) | ps1-only |
| `HOMEPATH` | — | `\claude-sota-installed` (L26) | ps1-only |
| `CLAUDE_CONFIG_DIR` | — | `Z:/claude-sota-installed/.claude` (L60) | ps1-only |
| `CLAUDE_CODE_TMPDIR` | — | `Z:/claude-sota-installed/tmp` (L61) | ps1-only |
| `CLAUDE_CODE_PLUGIN_CACHE_DIR` | — | `Z:/claude-sota-installed/.claude/plugins` (L62) | ps1-only |
| `CLAUDE_CODE_DEBUG_LOGS_DIR` | — | `Z:/claude-sota-installed/.claude/debug` (L63) | ps1-only |
| `CLAUDE_CODE_GIT_BASH_PATH` | — | `C:\Program Files\Git\bin\bash.exe` (L64) | ps1-only |
| `CLAUDE_CODE_PROJECT_DIR` | — | `Z:/claude-sota-installed-state/.claude/projects` (L170) | ps1-only |
| `CODEX_HOME` | — | `Z:/claude-sota-installed-state/.codex` (L171) | ps1-only |
| `CLAUDE_PLUGIN_DATA` | `Z:\claude-sota-installed\.claude\plugins\data` (L48 — W317) | same (L279 — W317-C) | ✓ match |
| `GATEGUARD_STATE_DIR` | `…\.claude\state\gateguard` (L49 — W317) | same (L280 — W317-C) | ✓ match |
| `AUDIT_ROOT` | `Z:\claude-sota-installed` (L50 — W317) | same (L281 — W317-C) | ✓ match |
| `CLAUDE_MEM_DATA_DIR` | `…\plugins\data\claude-mem` (L51 — W317) | same (L282 — W317-C) | ✓ match |
| `ECC_SESSION_RECORDING_DIR` | `…\session-data\recordings` (L52 — W317) | same (L283 — W317-C) | ✓ match |
| `BASH_ENV` | `Z:/…/bash-home-pin.sh` (L53 — W317) | same (L286 — W317-C) | ✓ match |
| `MSYS_NO_PATHCONV` | `1` (L42) | set L40 then `Remove-Item` L159 | **CONFLICT** (see §2) |
| `MSYS2_ARG_CONV_EXCL` | `*` (L43) | set L41 then `Remove-Item` L160 | **CONFLICT** (see §2) |
| `MSYS2_ENV_CONV_EXCL` | `*` (L44) | set L42 + L163 (redundant) | ✓ match |

47 ps1 vars total / 54 settings vars total / 7 vars overlap (all W317-introduced).

## §2 — Conflicts (severity-ranked)

| # | Conflict | Severity | Disposition |
|---|---|---|---|
| 1 | eee.ps1:L159-160 `Remove-Item Env:\MSYS_NO_PATHCONV` + `MSYS2_ARG_CONV_EXCL` while settings.json:L42-43 sets both | **LOW** (BENIGN NO-OP) | Stream B proved these vars do NOT affect Git-Bash inbound HOME conversion (`msys-2.0.dll` startup logic ignores them); ps1 unsets only affect parent PowerShell shell, CC subprocess inherits from settings.json. Cleanup recommended W318 (drop L159-160). |
| 2 | eee.ps1:L161-162 `Remove-Item Env:\CLAUDE_PLUGIN_ROOT` + `ECC_PLUGIN_ROOT` | NONE | Intentional — CC re-sets `CLAUDE_PLUGIN_ROOT` per-plugin (Anthropic docs); ECC_PLUGIN_ROOT is plugin-internal. Stale env from prior runs is correctly cleared. |
| 3 | eee.ps1:L42 (initial) + L163 (re-set) both set `MSYS2_ENV_CONV_EXCL='*'` | NONE | Redundant but harmless. |

## §3 — Path-existence audit (20/20 EXISTS)

All path-typed env values resolve to existing dirs/files on disk:
- W317-introduced data dirs (5): plugins/data, state/gateguard, plugins/data/claude-mem, session-data/recordings, state/bash-home-pin.sh — all created during W317 apply.
- State-outside-repo (3): -state/.codex, -state/basic-memory + config, -state/.claude/projects — all present.
- MCP backing (3): langfuse mcp-server build/index.js, @ccusage/mcp dist/index.js, @openai/codex bin — all present.
- System (2): Git Bash exe, claude venv python.exe — both present.

**0 stale paths.**

## §4 — Permission-rule audit (`settings.json:permissions`)

`defaultMode: bypassPermissions` makes `allow` rules **documentation only** (no functional effect — bypassPermissions auto-approves). The 4 explicit `Edit(...)` allows + 7 `Bash(...)` patterns are aspirational hints for an operator who later flips `defaultMode` to `auto` or `default`. All 4 Edit-target paths EXIST. All 7 Bash patterns are syntactically valid.

`deny` rules (17 entries): all secret-class patterns (`.env*`, `*.pem/key/pfx/crt`, `id_rsa`, `id_ed25519`, AWS/SSH/Docker/npm/netrc credentials, `CLAUDE.local.md`, `tools/eee.local.ps1`). Both `./CLAUDE.local.md` and `./tools/eee.local.ps1` EXIST → deny-rules actively protecting present files (no speculative-only deny). **0 overlaps** between allow and deny (orthogonal scopes).

**0 stale permission rules.**

## §5 — `.mcp.json` × `disabledMcpjsonServers` audit

`disabledMcpjsonServers: []` (W315 Stream B excised the dead `memory` block; graphiti excised W295). 10 active mcpServers in `.mcp.json`:

deepwiki (http), chrome-devtools (npx-pinned 1.0.1), repomix (npx-pinned 1.14.0), serena (uvx-SHA-pinned), gitnexus (cli), ccusage (node-direct), cognee (http :8000), langfuse (node-direct + 4 `${LANGFUSE_*}` from CLAUDE.local.md), basic-memory (uvx-pinned 0.21.1 — W308), hf-mcp-server (http).

All 10 servers cardinal-rule-9-compliant (version-pinned where applicable). `${LANGFUSE_*}` interpolations resolve via per-machine `tools/eee.local.ps1` (Read-denied here; existence confirmed in §3). **0 servers candidate for disable.**

## Report-back

**0 functional conflicts** (1 cosmetic LOW-severity ps1 `Remove-Item` no-op per §2.1), **0 stale permission rules**, **20/20 paths EXIST**, **10/10 MCP servers correctly enabled**. **Must-fix**: drop `eee.ps1` L159-160 `Remove-Item Env:\MSYS_NO_PATHCONV/MSYS2_ARG_CONV_EXCL` (Wave-50-Fire-42 legacy now benign no-op per Stream B root-cause analysis — clears Stream-C-flagged doc-drift). 0-byte impact, safe single-commit cleanup.
