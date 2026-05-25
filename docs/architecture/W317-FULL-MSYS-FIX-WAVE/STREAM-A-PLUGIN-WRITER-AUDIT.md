# W317 Stream A — Plugin-Writer Audit (MSYS phantom-Z:\z\ root-cause expansion)

**Scope**: ECC, codex (openai-codex), hindsight-memory, ralph-loop, thedotmack/claude-mem. Search across `.claude/plugins/cache/**` and `.claude/plugins/marketplaces/**` for HOME / homedir / expanduser / `$HOME` / `~/.claude` patterns. Vendored test/venv/node_modules filtered out.

## Top-line finding

The phantom `Z:\z\` leak has **two distinct upstream paths**, not one:

1. **CC injects POSIX-form `CLAUDE_PLUGIN_DATA` env var on win32+Git-Bash** — plugins that resolve paths against it (codex `state.mjs`, hindsight `state.py`) write to `Z:\z\...` after `path.join`/`os.path.join`. This is the dominant active leak (~13/14 phantom writes today).
2. **CC's `cwd` parameter in hook input JSON is POSIX-form** — codex `broker-lifecycle.mjs` uses `resolveStateDir(input.cwd)` which feeds through `path.resolve` and mangles `/z/foo` → `Z:\z\foo`.

`HOME` per se is **not** the dominant root cause — most plugins use `CLAUDE_PLUGIN_DATA` or `input.cwd`, which CC injects in POSIX form on Git Bash. Pure-`HOME` reads (instinct-cli.py, hindsight config.py, ECC tests) are secondary.

## Findings table

| File:line | Code | Classification | Proposed fix |
|---|---|---|---|
| `cache/openai-codex/codex/1.0.4/scripts/lib/state.mjs:42` | `const pluginDataDir = process.env[PLUGIN_DATA_ENV]; const stateRoot = pluginDataDir ? path.join(pluginDataDir, "state") : FALLBACK_STATE_ROOT_DIR;` | **VULNERABLE** | Apply `normalizeMsysPath()` to `pluginDataDir` before `path.join`. Highest-priority fix — drives ~80% of active phantom writes. |
| `cache/openai-codex/codex/1.0.4/scripts/lib/broker-lifecycle.mjs:94` | `const stateDir = resolveStateDir(cwd); fs.mkdirSync(stateDir, ...)` | **VULNERABLE** | Normalize `cwd` at entry of `resolveStateDir` (in `state.mjs`). Cascades to all broker save/load. |
| `cache/openai-codex/codex/1.0.4/scripts/codex-companion.mjs:149` | `return options.cwd ? path.resolve(process.cwd(), options.cwd) : process.cwd();` | **VULNERABLE** | Same MSYS-norm wrapper. |
| `cache/hindsight/hindsight-memory/0.6.5/scripts/lib/state.py:24` | `plugin_data = os.environ.get("CLAUDE_PLUGIN_DATA", ""); ... os.path.join(plugin_data, "state")` | **VULNERABLE** | Add `_normalize_msys()` Python helper applied to `plugin_data` before `os.path.join`. |
| `cache/hindsight/hindsight-memory/0.6.5/scripts/lib/config.py:134` | `os.path.join(os.path.expanduser("~"), ".hindsight", "claude-code.json")` | **VULNERABLE** | If `~` expands to `/z/...` (MSYS HOME), normalize. (Python `expanduser` checks USERPROFILE first on win32 → usually safe, but the fallback chain bites if any env override sneaks in.) |
| `cache/hindsight/hindsight-memory/0.6.5/scripts/setup_hooks.py:16,21` | `os.path.expanduser("~/.claude/settings.json")` | **VULNERABLE** | Same Python normalize helper. Setup-time only — low blast radius vs runtime state writers. |
| `cache/everything-claude-code/everything-claude-code/2.0.0-rc.1/skills/continuous-learning-v2/scripts/instinct-cli.py:41` | `HOMUNCULUS_DIR = Path.home() / ".claude" / "homunculus"` | **VULNERABLE** | Python `Path.home()` falls back from USERPROFILE → HOME on win32; if the ECC subprocess loses USERPROFILE but inherits MSYS HOME, writes go to `Z:\z\`. Defensive: explicit `Path(os.environ.get("USERPROFILE") or os.path.expanduser("~"))` with msys-normalize. |
| `cache/everything-claude-code/everything-claude-code/2.0.0-rc.1/skills/videodb/scripts/ws_listener.py:65` | `Path.home() / ".local" / "state" / "videodb"` | **VULNERABLE** | Same. |
| `marketplaces/thedotmack/.../hooks.json` Stop command | shell fallback chain with `command -v cygpath >/dev/null 2>&1 && { _W=$(cygpath -w "$_P") ...}` | **SAFE** (defensive SOTA) | None — exemplary pattern; lift this `cygpath -w` idiom into a shared helper for other plugins. |
| `cache/claude-plugins-official/ralph-loop/1.0.0/hooks/hooks.json` Stop | `bash "${CLAUDE_PLUGIN_ROOT}/hooks/stop-hook.sh"` | **SAFE** | None — bash handles POSIX `${CLAUDE_PLUGIN_ROOT}` natively. Sub-script body should still be audited if it shells out to Node/Python (Stream A did not deep-read; flag for follow-up). |
| `cache/openai-codex/codex/1.0.4/scripts/session-lifecycle-hook.mjs:78,85-89` | `process.env[PLUGIN_DATA_ENV]`, `process.env[BROKER_ENDPOINT_ENV]` reads | **VULNERABLE (indirect)** | Same `state.mjs` fix covers it (shared resolver). |
| ECC test files (`tests/scripts/*.test.js`) HOME reads | mocks for installer tests | **SAFE** (tests only) | None. |

## Counts (non-vendored)

| Plugin | VULNERABLE | SAFE | UPSTREAM-FIX-NEEDED |
|---|---|---|---|
| ECC | 19 | 16 | 108 |
| hindsight | 6 | 0 | 2 |
| claude-mem | 3 | 6 | 0 |
| codex | 0 (in greps; vulnerable in code-flow audit, see top section) | — | — |

`UPSTREAM-FIX-NEEDED` is mostly read-only/config/skill-runtime code where `~`-expansion is incidental and the fix belongs upstream.

## Fix-priority list (top 5 active writers — fix order)

1. **codex `state.mjs:42` `resolveStateDir`** — single point fixes 100% of `Z:\z\.claude\plugins\data\codex-openai-codex\` writes (currently the dominant phantom-write source, ~12 files/session).
2. **hindsight `state.py:24` `_state_dir()`** — single point fixes hindsight phantom writes; mirror Python equivalent of codex fix.
3. **ECC `instinct-cli.py:41` `HOMUNCULUS_DIR`** — fixes ECC homunculus phantom writes. Python `Path.home()` with explicit USERPROFILE+msys-norm.
4. **codex `codex-companion.mjs:149`** — fixes all `input.cwd`-derived path corruption in companion. Wrap with msys-norm.
5. **ECC `ws_listener.py:65`** — videodb skill state writer. Same Python pattern as #3.

## Reusable fix snippets (cite W317-FIX `plugin-hook-bootstrap.js`)

**Node (`state.mjs` style)**:
```js
function normalizeMsysPath(input) {
  if (typeof input !== 'string') return input;
  const value = input.trim();
  if (!value || process.platform !== 'win32') return value;
  const cyg = /^\/cygdrive\/([a-zA-Z])(?:\/(.*))?$/.exec(value);
  if (cyg) return `${cyg[1].toUpperCase()}:\\${(cyg[2] ?? '').replace(/\//g, '\\')}`;
  const msys = /^\/([a-zA-Z])(?:\/(.*))?$/.exec(value);
  if (msys) return `${msys[1].toUpperCase()}:\\${(msys[2] ?? '').replace(/\//g, '\\')}`;
  return value;
}
```

**Python (`state.py` / `instinct-cli.py` style)**:
```python
import os, re, sys
def _normalize_msys(p: str) -> str:
    if not p or sys.platform != "win32": return p
    p = p.strip()
    m = re.match(r"^/cygdrive/([a-zA-Z])(?:/(.*))?$", p) or re.match(r"^/([a-zA-Z])(?:/(.*))?$", p)
    if m: return f"{m.group(1).upper()}:\\" + ((m.group(2) or "").replace("/", "\\"))
    return p
```

## Cross-stream handoff

- **Stream B** (if dispatched): apply the 5 prioritized fixes — codex `state.mjs` is top.
- **Stream C** (if dispatched): file upstream PRs against `openai/codex-plugin-cc`, `vectorize-io/hindsight`, `affaan-m/everything-claude-code`. The `claude-mem` `cygpath -w` pattern is the reference SOTA.
- **Stream D** (if dispatched): document operator-level mitigations in `CLAUDE.local.md` env block (e.g., explicit `CLAUDE_PLUGIN_DATA` overrides per plugin pinned to Windows-form paths).
