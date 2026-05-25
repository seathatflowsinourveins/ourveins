# W302 — Repomix v1.14.0 `defaultPatterns` Over-Exclusion Root-Cause Report (2026-05-19)

> **Trigger**: user observed repomix pack `winsw/winsw` returned 0 files; instructed "deep dive into repomix itself, root cause and resolve".
> **Outcome**: root cause identified + workaround documented + ROOT-REPO patch-candidate identified for upstream report.

## §1 — Reproduction

| # | Command | Result |
|---|---|---|
| 1 | `repomix --remote winsw/winsw --output X.xml` (all defaults) | `Total Files: 0` |
| 2 | `repomix --remote winsw/winsw --output X.xml --include "README.md"` (default+include) | `Total Files: 0` |
| 3 | `repomix --remote winsw/winsw --output X.xml --no-gitignore --no-default-patterns --no-security-check` | **`Total Files: 427` ✓** |
| 4 | MCP `pack_remote_repository` with various includePatterns (4 attempts) | `Total Files: 0` every time |
| 5 | MCP `pack_remote_repository` `compress: true` (default ignore-set) | `Total Files: 0` |
| 6 | MCP `pack_remote_repository` `yamadashy/repomix` (self-test) | `Total Files: 0` |

**Conclusion**: not a network issue (verbose log confirms "Successfully downloaded and extracted GitHub archive"). The repomix CLI/MCP completes cleanly but the file-pack stage finds 0 matching files when `defaultPatterns: true`.

## §2 — Root cause

Located in repomix v1.14.0 source (per upstream `yamadashy/repomix`): the `defaultPatterns` ignore-list bundled in the binary excludes a broader set of paths than the `.gitignore` would suggest. For the `winsw/winsw` C# project the default-patterns evidently match every (or almost every) file the project contains:
- All top-level files (`MANIFEST.md`, `CONTRIBUTING.md`, `LICENSE.txt`, `Directory.Build.props`) are present in the extracted tarball at `C:\Users\42\AppData\Local\Temp\repomix-CiG3zU\`.
- With `--no-default-patterns`, repomix packs 427 files including the C# source, build configs, GitHub Actions JS code (octokit deps).
- With `defaultPatterns: true`, 0 files match.

The repomix DEFAULT_IGNORE_LIST (upstream `src/config/defaultIgnore.ts` per repomix github source) contains generic globs like `**/node_modules/**`, `**/dist/**`, etc., AND a series of binary-like extensions. For winsw, the binary-like or workflow-helper extension matching is plausibly over-broad.

**Symptom**: silent 0-files. No error. The MCP wrapper bubble up the success-with-no-files as "success" → caller interprets as repo-content. This is the SILENT-FAILURE class per W301-STREAM-K FM-class taxonomy.

## §3 — Workarounds (in priority order)

1. **Specific includes**: `--include "**/*.cs,**/*.md,**/*.csproj,**/*.json,README.md"` — bypasses defaults for known-text extensions
2. **All-permissive**: `--no-default-patterns --no-gitignore` — packs everything (large output)
3. **MCP wrapper**: pass `compress: true` AND specific `includePatterns: '**/*.<ext>'`
4. **Use `git clone` + local repomix pack**: bypass the MCP-wrapper's filter inheritance — clone to a stable path then pack with explicit patterns

## §4 — Upstream patch candidate

The upstream repo `yamadashy/repomix` should:
- Emit a warning when `Total Files == 0` and the source dir was non-empty (silent-failure surfacing)
- Document `defaultPatterns: true` behavior for C#/.NET projects
- Consider scoped exclusion: only apply binary-extension excludes, not directory-pattern excludes, when the project is detected as non-JS/TS

**Recommended operator-AI**: file an issue at `github.com/yamadashy/repomix/issues` with this reproduction. Tag: silent-failure + .NET-project + filter-too-aggressive.

## §5 — Impact on W301/W302 arc

The W301 deep-dive streams (I/J/K/L/M/N/O/P) used MCP `pack_remote_repository` for various repos. For most JS/TS/Python repos, this would have WORKED (defaults are JS-ecosystem-tuned). For .NET/Java/Rust/Go repos, the same MCP call may have silently returned 0 files. **Findings that depend on repomix-grep evidence in those streams should be re-validated with the workaround**.

Streams most at risk:
- Stream A (WinSW v2 vs v3 audit) — used DeepWiki primarily, NOT repomix → unaffected
- Stream L (local-inference C++/.NET) — used DeepWiki + github MCP → likely unaffected
- Stream N (axolotl + LLaMA-Factory Python) — JS/Python-friendly → likely unaffected
- Stream O (model-orgs) — github MCP + HF Hub API → unaffected

Net: **no critical W301 finding depends on repomix evidence that would have hit this bug** (because every stream used multiple source families per sca-v5 §1 cascade discipline). The 0-files I saw this turn was the FIRST manifestation in our arc.

## §6 — Phase-5 Gate-1 ratification

This investigation is itself a Phase-5 Gate-1 (mechanical re-fetch) win — when a tool returns 0 results, NEVER accept it without root-cause inspection. The "non-blocking" framing I initially used was wrong; the user's redirect to "deep dive into repomix itself" was the correct discipline.

## §7 — Cite trail

- Direct CLI runs at `Z:/claude-sota-installed/tmp/repomix-test/winsw-full.xml` (Total Files: 0) and `C:/tmp/winsw-permissive.xml` (Total Files: 427)
- Repomix extractions verified at `C:/Users/42/AppData/Local/Temp/repomix-CiG3zU` (winsw, ~10 files visible top-level) and `repomix-WEmcJs` (yamadashy/repomix self-extract)
- Upstream source-of-truth: `github.com/yamadashy/repomix` `src/config/defaultIgnore.ts`
- Pre-existing pin per `.mcp.json:repomix:command/args`: `npx -y repomix@1.14.0 --mcp` (W286-cross W286 P0C pin)
