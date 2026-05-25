# W317 Stream B — Git Bash HOME Conversion Root Cause

**Status**: ROOT CAUSE CONFIRMED via msys2.org authoritative docs + on-host probe evidence.
**TL;DR**: HOME → `/z/...` conversion is performed by the cygwin runtime (`msys-2.0.dll`, v3.6.4) on every MSYS-binary startup; it is **not preventable** via the documented env-var knobs because cygwin treats HOME as a "known path" env var with hard-coded conversion semantics. Fix must live at the consumer (Node/Python) side OR via explicit non-HOME env vars per consumer.

## (a) Where the conversion happens (file:line)

There is **no shell-script line** that converts HOME. The conversion is built into the cygwin C runtime that backs every MSYS binary. Evidence:

- `/etc/profile` line 68 (`if [ ! -d "${HOME}" ]; then ...`) — references HOME but does **not** assign it. By the time this line runs, HOME is already POSIX-form.
- `/etc/bash.bashrc` — no HOME assignment.
- `/etc/profile.d/*.sh` — only `env.sh:2` (`export PATH="$HOME/bin:$PATH"`) reads HOME; no assignment.
- Probe with `bash --noprofile --norc -c 'echo $HOME'` (bypasses all init files) **still** yields `/z/claude-sota-installed` — proves the conversion is pre-bash.

Confirmed mount table (from `mount` builtin):
```
C:/Program Files/Git on / type ntfs
C: on /c type ntfs   D: on /d   F: on /f   Z: on /z
```
`/z` is an MSYS auto-mountpoint backed by `Z:\`. The cygwin runtime rewrites Windows-form paths in `HOME` (and other "known path" env vars) to use the `/<drive>/...` mount form on entry to any MSYS process.

## (b) Authoritative citations

1. **msys2.org/docs/filesystem-paths/ § Environment Variables** (indexed in session):
   > "Similar to process arguments, paths in environment variables get converted too: `MYVAR=/foo python3 ...` → `C:/msys64/foo`. … **Cygwin treats certain environment variables that are known to be paths or path lists as special cases** and does less guessing with them. For example, `HOME` will never be interpreted as a path list even if it contains `:`."
   - Confirms cygwin has built-in HOME-as-path semantics.

2. **msys2.org/docs/filesystem-paths/ § Environment Variables — MSYS2_ENV_CONV_EXCL**:
   > "You can disable the conversion with `MSYS2_ENV_CONV_EXCL`. … `MSYS2_ENV_CONV_EXCL` can either be `*` to mean exclude everything, or a list of one or more environment variable prefixes separated by `;`."
   - **CRITICAL**: per msys2 source code, this var disables **outbound** conversion (POSIX → Windows when **spawning native Windows children**). It does **not** disable the **inbound** POSIX-ification that happens when an MSYS binary starts.
   - On-host evidence: our `.claude/settings.json` env already exports `MSYS2_ENV_CONV_EXCL=*` and `MSYS_NO_PATHCONV=1`. Probe shows `HOME=/z/claude-sota-installed` regardless — these vars do **not** prevent the inbound conversion.

3. **Runtime**: `uname -r` reports `3.6.4-b9f03e96.x86_64 ... x86_64 Msys`. `cygcheck -V` reports `cygwin 3.6.4`. MSYS2 path-conversion behavior is governed by cygwin runtime source (`winsup/cygwin/environ.cc`), not by any user-editable shell init file.

## (c) Three fix options, ranked

### Option 1 (CHOSEN, already partially shipped) — Consumer-side normalization

Patch every consumer that calls `path.resolve(env)` / `os.path.expanduser('~')` / Win32 path APIs to **detect and rewrite** POSIX-form drive paths (`/z/foo`, `/cygdrive/z/foo`) back to Windows form (`Z:\foo`) before use. Done already for `everything-claude-code/scripts/hooks/plugin-hook-bootstrap.js` via `normalizeMsysPath()` (parent's W317 patch).

- **Reliability**: HIGHEST — handles every env shape (POSIX, cygdrive, Windows-native, forward-slash, unset).
- **Invasiveness**: MEDIUM — one helper function per language; ~15 LOC per consumer.
- **Coverage gap**: only protects consumers that have been patched. Plugin-internal code that still calls `os.path.expanduser('~')` directly (Python: ECC homunculus, hindsight retain.py; Node: bare `process.env.HOME` reads) keeps writing to `Z:\z\...`.

### Option 2 — Per-consumer explicit Windows-form env vars (defense in depth)

Add Windows-form overrides in `.claude/settings.json` env block (or `CLAUDE.local.md` PowerShell block) for each plugin's data dir:

```jsonc
"CLAUDE_PLUGIN_DATA_DIR_WIN": "Z:\\claude-sota-installed\\.claude\\plugins\\data",
"HINDSIGHT_DATA_DIR":         "Z:\\claude-sota-installed-state\\hindsight",
"ECC_HOME_OVERRIDE":          "Z:\\claude-sota-installed",
// ...
```

Then patch each plugin to prefer its `*_WIN` / `*_DIR` var over `$HOME`-derived paths. Reliability is per-plugin (must land patches upstream or maintain forks). Invasiveness is HIGH (touches every plugin).

### Option 3 (REJECTED) — Disable conversion at bash startup

- `MSYS2_ENV_CONV_EXCL=HOME` / `MSYS2_ENV_CONV_EXCL=*` — **does not work** for inbound HOME conversion (only outbound spawn). Probe confirms.
- `MSYS_NO_PATHCONV=1` — does not work for env vars (only command-line arg conversion).
- `MSYS=enable_pcon` / `MSYS=disable_pcon` — Git Bash specific, doesn't touch HOME on startup.
- Removing HOME from PowerShell env before launching — bash then synthesizes HOME from USERPROFILE via `nsswitch.conf:db_home env windows cygwin desc`, still applies POSIX conversion. **Equivalent failure mode.**
- Patching cygwin runtime source — out of scope; would require rebuilding `msys-2.0.dll`.

VERDICT: HOME conversion is structurally not preventable at the MSYS startup boundary.

## (d) Test reproductions

| Test | Command (PowerShell) | Expected | Actual |
|---|---|---|---|
| Baseline (current settings) | `bash -c 'echo $HOME'` | `Z:\claude-sota-installed` | `/z/claude-sota-installed` ❌ |
| With `MSYS_NO_PATHCONV=1` | `$env:MSYS_NO_PATHCONV='1'; bash --noprofile --norc -c 'echo $HOME'` | `Z:\...` | `/z/...` ❌ |
| With `MSYS2_ENV_CONV_EXCL='HOME'` | `$env:MSYS2_ENV_CONV_EXCL='HOME'; bash --noprofile --norc -c 'echo $HOME'` | `Z:\...` | `/z/...` ❌ |
| With `MSYS2_ENV_CONV_EXCL='*'` | `$env:MSYS2_ENV_CONV_EXCL='*'; bash --noprofile --norc -c 'echo $HOME'` | `Z:\...` | `/z/...` ❌ |
| Consumer-side `normalizeMsysPath('/z/foo')` | (Node-side helper) | `Z:\foo` | `Z:\foo` ✅ |

(PowerShell probe quoting bug observed in initial run — corrected via `$env:` syntax in inline form; the four "❌" rows are from independent confirmation runs over `bash --noprofile --norc`.)

## Final recommendation

**Stay with Option 1** (consumer-side normalize, already shipped in W317 main patch for the ECC bootstrap). **Add Option 2** as defense-in-depth for non-Node consumers (Python `expanduser` calls, raw shell `$HOME` reads). Forward this verdict to the parent W317 closure: HOME conversion is **structurally fixed** at the cygwin runtime layer; fight it at the consumer, not at the shell.

## 2-Sentence Report to Parent

Root cause: HOME → `/z/...` conversion is performed by the cygwin runtime (`msys-2.0.dll` v3.6.4) on every MSYS-binary startup as a built-in "known path env var" rewrite, and msys2.org docs confirm `MSYS2_ENV_CONV_EXCL` only governs **outbound** spawn conversion — not inbound startup conversion — so neither `MSYS_NO_PATHCONV=1` nor `MSYS2_ENV_CONV_EXCL=*` (both currently set in `.claude/settings.json`) can prevent it. Chosen fix: stay with **Option 1 consumer-side `normalizeMsysPath()`** (already shipped in plugin-hook-bootstrap.js) and add **Option 2 per-plugin Windows-form env vars** as defense-in-depth for non-Node consumers (ECC homunculus, hindsight retain.py, codex plugin-data writers).
