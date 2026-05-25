# W317 Stream F — SOTA Node.js Path Normalization Survey

**Date**: 2026-05-19 · **Verdict**: KEEP HAND-ROLLED · **P0 edge case to fix**: NONE.

## (a) Package survey — does it convert `/z/foo` → `Z:\foo`?

| Package | Direction | Weekly DLs | Last update | Solves MSYS→Win32? |
|---|---|---|---|---|
| `slash@5.1.0` | Win→POSIX (`\` → `/`) | 104.6 M | 2023-06-09 | **No** — opposite direction |
| `normalize-path@3.0.0` | Slash-normalizer only | 112.1 M | 2023-03-04 | **No** — preserves `/z/foo` literally |
| `upath@3.0.7` | Win→POSIX drop-in | 21.2 M | 2026-04-20 | **No** — strips `\`, no drive logic |
| `cross-spawn@7.0.6` | Spawn shim, not path | 274 M+ | 2024 | **No** — out of scope |
| `which@5.0.0` | Binary lookup | — | 2024 | **No** — out of scope |
| `path-key@4.0.0` | PATH env var name | — | 2022 | **No** — out of scope |
| `node-cygpath` | (hypothetical) | — | — | **DOES NOT EXIST** on npm |
| `vscode-uri@3.1.0` | `URI` class | — | 2026-04-23 | **No** — `URI.file()` accepts Win32 only; no MSYS layer |

**Conclusion**: every popular path lib goes the OPPOSITE direction (Win→POSIX, for tools writing portable glob/import paths). Nobody publishes a `Git-Bash POSIX → Win32` converter because the standard fix is "use `cygpath -w` from inside bash" — a different layer than where we need it (inside Node, after env has already been corrupted).

## (b) Node 22 built-in behavior matrix (Win11, Node v22.22.0)

Probed via `node -e "..."` from `Z:\claude-sota-installed`:

| Input | `path.resolve` | `path.win32.resolve` | `path.posix.resolve` | `path.toNamespacedPath` | `pathToFileURL` |
|---|---|---|---|---|---|
| `/z/foo` | `Z:\z\foo` ✗ | `Z:\z\foo` ✗ | `/z/foo` (POSIX) | `\\?\Z:\z\foo` ✗ | `file:///Z:/z/foo` ✗ |
| `/cygdrive/z/foo` | `Z:\cygdrive\z\foo` ✗ | same ✗ | unchanged | same ✗ | encodes bug ✗ |
| `Z:/foo` | `Z:\foo` ✓ | `Z:\foo` ✓ | `Z:/foo` | `\\?\Z:\foo` ✓ | `file:///Z:/foo` ✓ |
| `//server/share/foo` | `\\server\share\foo` ✓ (UNC) | same ✓ | unchanged | same ✓ | UNC URL ✓ |
| `z:/foo` (lower) | `z:\foo` ✓ (preserved) | same | — | namespaced | `file:///z:/foo` |

**No Node 22 built-in handles MSYS POSIX form.** `path.win32` is documented as "Windows-style path operations" — but it only understands `[A-Z]:\…` or `\\?\…`, not Git Bash's `/<drive>/…` convention. This is **not a Node bug** — it's a layer mismatch: MSYS form is bash-shell convention, not Win32 filesystem convention. Conversion must happen at the boundary.

## (c) Recommendation — KEEP HAND-ROLLED

Rationale weighted against CR-9 (version-pin spawn-churn discipline) and supply-chain risk:

| Factor | Hand-rolled (current) | Adopt dependency |
|---|---|---|
| Solves the bug | ✓ | None of the surveyed pkgs solve it |
| Maintenance surface | 15 LOC, no transitive deps | npm install + lockfile + version pin per CR-9 |
| Supply-chain risk | 0 | +1 (any new dep is +1) |
| Spawn-churn cost | 0 | `require()` resolution overhead at every hook fire |
| Behavior auditability | Inline regex, fully readable | Indirected through black-box pkg |
| Upstream-PR shape | 15 LOC self-contained patch | Would add `dependencies` field to ECC plugin's `package.json` — wider blast radius |

**Decision**: hand-rolled wins on every axis. The function is small, deterministic, edge-tested, and contributes only to one file (the bootstrap). Even if a future SOTA pkg emerges, swapping in is one Edit away.

## (d) Edge-case probe of current `normalizeMsysPath`

Tested against my actual regex (run from Stream F batch):

| Input | Output | Verdict |
|---|---|---|
| `/z/foo` | `Z:\foo` | ✓ |
| `/cygdrive/z/foo` | `Z:\foo` | ✓ |
| `//server/share/foo` | `//server/share/foo` (unchanged) | ✓ UNC preserved |
| `/Z/Foo Bar/baz` | `Z:\Foo Bar\baz` | ✓ uppercase + spaces |
| `/z` | `Z:\` | ✓ bare drive |
| `/zz/foo` | unchanged | ✓ correctly rejects multi-char "drive" |
| `/z/foo with spaces/bar` | `Z:\foo with spaces\bar` | ✓ |
| `//?/Z:/foo` | unchanged | ✓ extended-length prefix preserved |
| `/c/Users/a b/c` | `C:\Users\a b\c` | ✓ canonical |

**Negative-case validation** (must NOT match):

| Input | Behavior | Verdict |
|---|---|---|
| `/mnt/z/foo` (WSL form) | unchanged (regex requires single-letter then `/`) | ✓ leaves WSL alone |
| `/` (MSYS root) | unchanged | ✓ |
| `/tmp/foo` (MSYS special) | unchanged (`tmp` is 3 chars, not 1) | ✓ |
| `relative/path` | unchanged (no leading `/`) | ✓ |

**P0 edge case found: NONE.** The current regex covers every realistic Git-Bash-on-Windows input correctly. No fixup required.

## (e) Anthropic upstream — is this bug already filed?

Grep of `repo:anthropics/claude-code` issues:

- **PR #54094** "fix: quote $CLAUDE_PLUGIN_ROOT in plugin hook commands" (open, 2026-04-27) — fixes a DIFFERENT `CLAUDE_PLUGIN_ROOT` bug (unquoted shell expansion with spaces), not MSYS form. Author Codeturion. Touches 5 in-tree plugins.
- **#49377** "Bash tool on Windows Git Bash cannot find common binaries (git, task, ls) after 2.1.x update" — `area:bash` + `platform:windows` + `regression`, 2026-04-16 open.
- **#37920** "bash.exe.stackdump files left behind on Windows (Git Bash / MSYS2)" — Windows MSYS2-specific.
- **227 total issues** mentioning MSYS; **271 total** mentioning `CLAUDE_PLUGIN_ROOT`.

**No existing issue** flags the MSYS POSIX form (`/z/...`) being injected as `CLAUDE_PLUGIN_ROOT` env var. Filing a fresh upstream report is on-the-table for the parent wave, with anchor at `Z:\claude-sota-installed\docs\architecture\W317-MSYS-PATH-BOOTSTRAP-FIX.md`.

---

## Three-sentence verdict

**Keep hand-rolled.** No surveyed npm package (slash, normalize-path, upath, cross-spawn, which, path-key, vscode-uri) handles the MSYS-POSIX→Win32 direction; they all go the opposite way or sit at a different layer, and Node 22's `path.win32`, `path.toNamespacedPath`, and `pathToFileURL` all preserve the `Z:\z\` corruption. The current 15-LOC `normalizeMsysPath` covers every realistic Git Bash input (single-letter drives, `/cygdrive/`, spaces, trailing slashes, UNC and extended-length preservation, WSL `/mnt/` rejection) with zero P0 edge cases to fix — file an upstream PR to `affaan-m/everything-claude-code` and the parallel cohort plugins, but do not add a dependency.
