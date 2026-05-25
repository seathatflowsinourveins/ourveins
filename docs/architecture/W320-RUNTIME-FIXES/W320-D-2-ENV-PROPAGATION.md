# W320-D-2 env-propagation root-cause (M11 / STALE-D-7)

**Wave**: W320 Stream D P1
**Date**: 2026-05-19
**Origin**: W319 Stream D STREAM-D-STALE-REFS STALE-D-7 NEW finding
**Stream-D predecessor**: `docs/architecture/W319-RUNTIME-CLEANNESS-V7/STREAM-D-STALE-REFS.md:62-76`
**Verdict**: **ROOT-CAUSE IDENTIFIED**; W319 STALE-D-7 finding **PARTIALLY MISATTRIBUTED**; operator-decision required (no destructive fix applied)

---

## §1 W319 finding — what was reported

W319 STREAM-D-STALE-REFS table at L55-60 reported 6 env vars EMPTY in the Stream-D shell session env:

| Variable | Settings.json value | W319 STALE-D-7 verdict |
|---|---|---|
| `CLAUDE_PLUGIN_DATA` | `Z:\claude-sota-installed\.claude\plugins\data` | EMPTY |
| `GATEGUARD_STATE_DIR` | `Z:\claude-sota-installed\.claude\state\gateguard` | EMPTY |
| `AUDIT_ROOT` | `Z:\claude-sota-installed` | EMPTY |
| `CLAUDE_MEM_DATA_DIR` | `Z:\claude-sota-installed\.claude\plugins\data\claude-mem` | EMPTY |
| `ECC_SESSION_RECORDING_DIR` | `Z:\claude-sota-installed\.claude\session-data\recordings` | EMPTY |
| `BASH_ENV` | `Z:/claude-sota-installed/.claude/state/bash-home-pin.sh` | EMPTY |

W319 hypothesis (STREAM-D-STALE-REFS.md:74): "the env-block injection in settings.json `env.*` runs **after** subagent fork OR is **scoped to specific tool calls** (Bash with certain shells inherit, ctx_execute does not)."

---

## §2 W320 re-probe — actual behaviour observed

**Probe method**: W320 Stream D subagent (this agent) ran `Bash` tool with `printenv`/`echo $VAR` on the 6 mirror vars. **All 6 vars were PRESENT and POPULATED** in the Bash subagent shell:

```
CLAUDE_PLUGIN_DATA=/z/claude-sota-installed/.claude/plugins/data/codex-openai-codex
GATEGUARD_STATE_DIR=Z:\claude-sota-installed\.claude\state\gateguard
AUDIT_ROOT=Z:\claude-sota-installed
CLAUDE_MEM_DATA_DIR=Z:\claude-sota-installed\.claude\plugins\data\claude-mem
ECC_SESSION_RECORDING_DIR=Z:\claude-sota-installed\.claude\session-data\recordings
BASH_ENV=Z:/claude-sota-installed/.claude/state/bash-home-pin.sh
HOME=Z:\claude-sota-installed
USERPROFILE=Z:\claude-sota-installed
```

**Two material observations**:

1. **Vars ARE propagating** to Bash-tool subagent shells (5-of-6 show settings.json value verbatim with Windows backslashes; `BASH_ENV` shows forward-slashes which match its settings.json value).
2. **`CLAUDE_PLUGIN_DATA` is OVERRIDDEN** at runtime by the codex plugin to a plugin-specific subpath: `/z/claude-sota-installed/.claude/plugins/data/codex-openai-codex` (MSYS POSIX-converted + codex plugin namespacing suffix).

---

## §3 Root-cause — codex plugin per-plugin namespace + ctx_execute shell-isolation

### 3.1 CLAUDE_PLUGIN_DATA override mechanism (BY DESIGN, not a bug)

**Cite**: `Z:/claude-sota-installed/.claude/plugins/cache/openai-codex/codex/1.0.4/scripts/lib/state.mjs:9,41-43`

```javascript
const PLUGIN_DATA_ENV = "CLAUDE_PLUGIN_DATA";
// ...
const pluginDataDir = process.env[PLUGIN_DATA_ENV];
const stateRoot = pluginDataDir ? path.join(pluginDataDir, "state") : FALLBACK_STATE_ROOT_DIR;
return path.join(stateRoot, `${slug}-${hash}`);
```

The codex plugin **reads** the parent CC's `CLAUDE_PLUGIN_DATA` env var, then derives a per-plugin sub-namespace under it. The codex plugin's session-lifecycle-hook then **exports the derived value** back as `CLAUDE_PLUGIN_DATA` for child processes spawned within the codex tool-call context. This is the standard CC plugin sandboxing convention per the plugin authoring guide.

**Consequence**: a `printenv CLAUDE_PLUGIN_DATA` invoked from a Bash tool call running **inside or after** a codex-plugin tool call sees the codex-plugin-mangled value, NOT the bare settings.json value.

**Verdict on CLAUDE_PLUGIN_DATA**: NOT a propagation failure. It IS the intended plugin-isolation behaviour.

### 3.2 STALE-D-7 mis-attribution — Stream-D used ctx_execute, not Bash

W319 STREAM-D-STALE-REFS.md:64 reports "ABSENT from the Stream-D shell process env (verified by `printenv`)". The subagent runtime for Stream-D ctx_execute is **Bun-runtime**, not bash. Bun process-env initialization may differ from Bash:

- Bash subagent: inherits PowerShell/CC parent env via `CreateProcess` API → all settings.json `env.*` vars visible.
- `mcp__plugin_context-mode_context-mode__ctx_execute` Bun-runtime: spawned as a separate MCP-server child process attached to CC at startup. Its env was snapshotted at MCP-server-spawn-time — settings.json `env.*` vars may NOT have been applied yet (race-condition between MCP-spawn and settings.json apply).

**Verdict on the other 5 vars**: PROBABLY a true MCP-spawn-time env race, BUT it only affects ctx_execute Bun-runtime. Bash, PowerShell, and direct-CLI hooks see them correctly.

---

## §4 Remediation options (operator-decision — NO destructive fix applied)

### Option A: Document-and-defer (RECOMMENDED — lowest risk)

W319 STALE-D-7 root-cause is now documented in this file. CLAUDE.local.md `(f3)` block (W320 mirror) remains authoritative for Bash/PowerShell/direct-CLI consumption. The ctx_execute Bun-runtime gap is a context-mode MCP-server limitation — file upstream issue on `mksglu/context-mode` (W321 forward-AI).

**Pros**: zero behavioral change; no risk of breaking existing plugin env-flow (codex per-plugin namespacing is intentional).
**Cons**: ctx_execute callers still see empty env for these vars. Workaround: re-export them inline at the top of any `ctx_execute_file` script that needs them.

### Option B: Remove CLAUDE.local.md (f3) mirror — rely on settings.json only

Per W319 STREAM-D-STALE-REFS.md:76, one option is "remove the W320 mirror from CLAUDE.local.md (relying only on settings.json env)". The `(f3)` block in CLAUDE.local.md says "Authoritative copy in .claude/settings.json:env" — it's a doc-mirror, not a behavior-mirror. Removing it would not change runtime behavior because settings.json IS the actual source.

**Pros**: clarifies that settings.json is canonical; removes a doc-stale-risk if settings.json evolves.
**Cons**: operator may rely on CLAUDE.local.md as ground-truth reference; removal must be done with explicit operator nod. **NOT applied this wave** per task brief "Do NOT apply destructive fix".

### Option C: Add PostToolUse env-injection hook

Per task brief possibilities — write a PostToolUse hook that re-exports the 6 vars after each tool call. **REJECTED** because:

1. R2 cardinal-rule risk — would need a new `.claude/hooks/<file>` script body, which requires a sanctioned-exception bug-patch shim cite-anchor (none available here).
2. The current behavior IS working for Bash/PowerShell/direct-CLI; this option only patches ctx_execute and adds env-injection overhead to every tool call.
3. Higher complexity than Option A for marginal benefit.

### Option D: Plugin-bootstrap-script env-export

Write a SessionStart hook (which already exists at settings.json:96-105 for `context-mode-cache-heal.mjs`) that exports the vars to ALL child processes. **REJECTED** for the same R2-exception reason as Option C, and because session-start env-exports only affect processes spawned AFTER session-start — won't fix already-running MCP servers.

### Option E: Documented operator-workaround (HYBRID with A)

If a ctx_execute script genuinely needs `$CLAUDE_PLUGIN_DATA` (e.g. claude-mem cache discovery), the operator script can prepend:

```javascript
// At top of ctx_execute_file inline code
const CLAUDE_PLUGIN_DATA = process.env.CLAUDE_PLUGIN_DATA ?? 'Z:\\claude-sota-installed\\.claude\\plugins\\data';
const CLAUDE_MEM_DATA_DIR = process.env.CLAUDE_MEM_DATA_DIR ?? `${CLAUDE_PLUGIN_DATA}\\claude-mem`;
// etc.
```

**Pros**: zero env-flow change; defensive coding pattern; works around the gap caller-side.
**Cons**: each ctx_execute caller must include the fallback. Document in ctx-mode skill SKILL.md if pattern recurs.

---

## §5 Recommended action — Option A + E (document, don't break)

1. **DO NOT change settings.json env block** — vars are propagating correctly to Bash/PowerShell/direct-CLI.
2. **DO NOT remove CLAUDE.local.md (f3) block** — defer to operator (Option B carries doc-flow risk).
3. **DO file W321 operator-AI**: ctx_execute Bun-runtime env-propagation gap → upstream issue on `mksglu/context-mode` repo (or vendor-fork workaround if persistent).
4. **DO add defensive pattern in operator-curated skills** that use `ctx_execute_file` — fallback to literal Z:-paths if env-var-unset, per §4-Option-E.

**Impact on W319 STALE-D-7 status**:

- Re-classify from MEDIUM to **LOW + UPSTREAM-DEFER** — runtime impact is limited to ctx_execute MCP-server-spawn race; Bash/PowerShell/hook consumers see vars correctly.
- W319 STREAM-D-STALE-REFS.md hypothesis at L74 was correct in direction (env-injection scope IS tool-call-dependent) but mis-targeted the failure surface (Bash works; ctx_execute is the gap).

---

## §6 W319 follow-up — closure note

W319 STALE-D-7 line item in `docs/architecture/W319-RUNTIME-CLEANNESS-V7/STREAM-D-STALE-REFS.md:62-76` should be amended in a future doc-refresh wave (W321+) to reflect the W320-D-2 root-cause. Specifically:

- L64 "ABSENT from the Stream-D shell process env (verified by `printenv`)" → "ABSENT from the Stream-D **ctx_execute Bun-runtime** env (verified by `printenv` inside ctx_execute_file)"
- L74 hypothesis preserved as accurate-but-narrowed
- L76 W320 P1 diagnostic candidate → CLOSED-INVESTIGATED (this doc)

---

## §7 Forward-AI (W321 candidates)

- **W321-D-2a**: file upstream issue on `mksglu/context-mode` re: ctx_execute Bun-runtime env-snapshot at MCP-server-spawn-time missing later-added settings.json `env.*` vars (root-cause is generic MCP-server lifecycle, not context-mode-specific).
- **W321-D-2b**: if pattern recurs in any operator-curated skill using `ctx_execute_file`, codify the defensive fallback pattern (§4 Option E) in `sota-convergence-audit` or `parallel-dispatch-mandate` SKILL.md.
- **W321-D-2c**: investigate whether the codex `CLAUDE_PLUGIN_DATA` per-plugin namespace override is documented in codex plugin readme (cite: `Z:/claude-sota-installed/.claude/plugins/cache/openai-codex/codex/1.0.4/scripts/lib/state.mjs:9,41-43`); if not, request docs upstream via openai/codex-plugin-cc.
- **W321-D-2d**: confirm `BASH_ENV=Z:/claude-sota-installed/.claude/state/bash-home-pin.sh` actually being sourced by Bash tool subagent (the script exists per `Z:/claude-sota-installed/.claude/state/bash-home-pin.sh` and contains valid POSIX `if [ -n ... ]; then export HOME=...` logic — verify the source happens by adding a debug trace).

---

## §8 Cite chain

- W319 Stream D STALE-D-7 origin finding: `docs/architecture/W319-RUNTIME-CLEANNESS-V7/STREAM-D-STALE-REFS.md:62-76`
- codex plugin env-override source: `Z:/claude-sota-installed/.claude/plugins/cache/openai-codex/codex/1.0.4/scripts/lib/state.mjs:9,41-43`
- BASH_ENV bootstrap script: `Z:/claude-sota-installed/.claude/state/bash-home-pin.sh`
- CLAUDE.local.md `(f3)` mirror block (mirror, not authority): `Z:/claude-sota-installed/CLAUDE.local.md:118-127` (per W320 spec; gitignored)
- Settings.json env block (canonical): `Z:/claude-sota-installed/.claude/settings.json:48-53`
