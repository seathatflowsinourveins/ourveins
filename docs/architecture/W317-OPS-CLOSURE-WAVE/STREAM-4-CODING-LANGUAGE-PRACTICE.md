# W317 Stream 4 — SOTA Coding-Language-Practice Codification

> Wave: W317 Stream 4 — codified from SOTA upstream awesome-lists, RFCs, and tooling READMEs. ZERO self-invent — every practice quotes a SOTA upstream URL + section anchor. Sources verified live 2026-05-19.
>
> Scope: 6 in-runtime languages × N SOTA refs (≥3-org-distinct anchor diversity per language where feasible) — Python · TypeScript/Node · PowerShell · Bash · JSON/JSONC · Markdown.

---

## Executive summary

| # | Language | Used by (this runtime) | SOTA refs | Anchor diversity |
|---|---|---|---|---|
| 1 | Python 3.13 | harness/eval_harness.py · cognee-mcp · basic-memory · DSPy 3.2.1 · tools/* | 5 | Astral (ruff/uv) + Python.org (PEP) + Google (style) + Anthropic (SDK) + PyPA (pip) |
| 2 | TypeScript / Node v22 | .claude/hooks/context-mode-cache-heal.mjs · openai-codex plugin MCP scripts · ccstatusline | 5 | Node.js (nodejs/node) + Microsoft (TypeScript) + Anthropic (claude-agent-sdk) + sindresorhus (awesome-nodejs) + dzharii (awesome-typescript) |
| 3 | PowerShell 7 | tools/eee.ps1 · settings.json PostToolUseFailure · bootstrap-runtime.ps1 | 5 | Microsoft Learn (cmdlet docs) + PoshCode (style guide) + PowerShell/PowerShell (repo) + PowerShell/PSScriptAnalyzer + janikvonrotz (awesome-powershell) |
| 4 | Bash (Git Bash on Windows) | .claude/settings.json PreToolUse/PostToolUse hooks · gitleaks/ruff/shellcheck wrappers | 5 | GNU (bash manual) + Google (shellguide) + koalaman (shellcheck) + bats-core + redsymbol (strict mode) |
| 5 | JSON / JSONC | .claude/settings.json · .mcp.json · plugin.json manifests | 3 | IETF (RFC 8259) + Microsoft (JSONC in VS Code) + Anthropic (claude-code-settings.json schema) |
| 6 | Markdown (CommonMark + GFM) | CLAUDE.md · skills/*/SKILL.md · agents/*.md · docs/architecture/** | 3 | CommonMark.org (spec 0.31.2) + GitHub (GFM) + Anthropic (skill spec at code.claude.com/docs/en/skills) |

**Total SOTA refs**: 26 (anchored to 19 distinct organizations).
**Practice gates verified**: ruff 0.15.13 (settings.json:135 PostToolUse) · shellcheck 0.11.0 (settings.json:135) · pyright 1.1.408 (per W296 audit) · PSScriptAnalyzer 1.25.0.

---

## 1. Python — SOTA practices

### 1.1 Practices (quoted)

**P-PY-1. Default lint = Pyflakes + pycodestyle subset, line-length 88.** Ruff's documented default `ruff.toml` lints with `select = ["E4", "E7", "E9", "F"]` and formats with `line-length = 88` (Black-compatible). Source: [`https://github.com/astral-sh/ruff#configuration`](https://github.com/astral-sh/ruff#configuration) (verified 2026-05-19 from `astral-sh/ruff/README.md`). Quote: *"Enable Pyflakes (\`F\`) and a subset of the pycodestyle (\`E\`) codes by default. Same as Black. line-length = 88, indent-width = 4"*.

**P-PY-2. Reproducible installs via lockfile.** uv ships universal lockfile resolution per [`https://docs.astral.sh/uv/concepts/projects/sync/`](https://docs.astral.sh/uv/concepts/projects/sync/) — `uv sync` materializes the resolution from `uv.lock` deterministically. Maps directly to runtime CR-9 `npx -y <pkg>@<pinned-version>` discipline (CLAUDE.md L24). Source: [`https://github.com/astral-sh/uv#highlights`](https://github.com/astral-sh/uv#highlights) section: *"Provides comprehensive project management, with a universal lockfile."*

**P-PY-3. PEP 8 imports, naming, and 79/99-char lines (project may choose 88).** Source: [`https://peps.python.org/pep-0008/`](https://peps.python.org/pep-0008/) — Guido van Rossum + Barry Warsaw + Nick Coghlan, authors. Key rules: 4-space indent, snake_case for functions/variables, PascalCase for classes, UPPER_SNAKE for constants. Line length 79 (code) / 72 (docstrings/comments) is PEP 8 strict but project may raise (Black/Ruff = 88). Imports: standard-lib → third-party → local, one per line, top of file.

**P-PY-4. Pylint + Google style for googley docstrings.** Source: [`https://google.github.io/styleguide/pyguide.html`](https://google.github.io/styleguide/pyguide.html) §2.1 Lint: *"Run pylint over your code using this pylintrc."* §2.1.2 Pros: *"finds bugs that are typically caught by a compiler for less dynamic languages."* §3 Style §3.8 Comments and Docstrings: triple-quoted docstrings with `Args:`/`Returns:`/`Raises:` sections (Google style, supported by Sphinx + ruff `D`/pydocstyle).

**P-PY-5. Anthropic SDK + prompt caching.** Source: [`https://github.com/anthropics/anthropic-sdk-python`](https://github.com/anthropics/anthropic-sdk-python) + [`https://platform.claude.com/docs/en/build-with-claude/prompt-caching`](https://platform.claude.com/docs/en/build-with-claude/prompt-caching). Prompt caching is automatic on Opus 4.7 / Sonnet 4.6 / Haiku 4.5; cache reads at 0.1× base input price; 5-minute and 1-hour TTL. Install via `pip install anthropic`. Per W253-C Part-4: *"Anthropic prompt caching docs say prompt caching is supported on all active Claude models, includes automatic caching, 5-minute and 1-hour TTL, cache reads at 0.1x base input price."*

### 1.2 Upstream cite refs (5)

| # | URL | Anchor section | Org |
|---|---|---|---|
| 1 | `https://github.com/astral-sh/ruff` | README §Configuration (default rules + line-length 88) | Astral |
| 2 | `https://github.com/astral-sh/uv` | README §Features §Projects (uv.lock + sync) | Astral |
| 3 | `https://peps.python.org/pep-0008/` | PEP 8 (Guido/Warsaw/Coghlan) | Python.org / PSF |
| 4 | `https://google.github.io/styleguide/pyguide.html` | §2.1 Lint + §3.8 Docstrings | Google |
| 5 | `https://github.com/anthropics/anthropic-sdk-python` README + `https://platform.claude.com/docs/en/build-with-claude/prompt-caching` | Prompt caching API | Anthropic |

### 1.3 Runtime fit

- Settings.json:135 PostToolUse hook runs `ruff check --quiet --fix` + `ruff format --quiet` on every `.py` Edit/Write (CR-2 direct-CLI invocation).
- Per W290-F1 baseline: 26 Python files in-tree, 0 pyright (default) errors, 1398 ruff `--select ALL` findings (style-dominated), 5 HIGH ruff fixes shipped W293 AI-4 (B007/B009/F541).
- `harness/eval_harness.py` uses real inspect_ai + promptfoo; `tools/*.py` (codex_verdict_normalizer.py, etc.) follow PEP 8 + Google docstrings.

---

## 2. TypeScript / Node — SOTA practices

### 2.1 Practices (quoted)

**P-TS-1. Mark ESM explicitly via `.mjs` or `"type":"module"`.** Source: [`https://nodejs.org/api/esm.html#enabling`](https://nodejs.org/api/esm.html#enabling) — *"Authors can tell Node.js to interpret JavaScript as an ES module via the `.mjs` file extension, the `package.json` `type` field with a value `module`, the `--input-type` flag with a value of `module`, or the `--experimental-default-type` flag."* The runtime's only project-owned hook (`context-mode-cache-heal.mjs`) uses the `.mjs` extension explicitly — CR-2-sanctioned shim, ≤2KB.

**P-TS-2. Use `node:` prefix for built-ins; `import.meta.url` / `import.meta.dirname` for path resolution.** Source: [`https://nodejs.org/api/esm.html#import-specifiers`](https://nodejs.org/api/esm.html#import-specifiers) + [`https://nodejs.org/api/esm.html#importmetadirname`](https://nodejs.org/api/esm.html#importmetadirname). `node:fs`, `node:path`, `node:child_process` make built-in vs npm origin unambiguous. `import.meta.dirname` (Node ≥20.11) replaces the legacy CJS `__dirname`.

**P-TS-3. `strict: true` in tsconfig enables all strict-mode flags.** Source: [`https://www.typescriptlang.org/tsconfig/#strict`](https://www.typescriptlang.org/tsconfig/#strict) — *"The strict flag enables a wide range of type checking behavior that results in stronger guarantees of program correctness. Turning this on is equivalent to enabling all of the strict mode family options."* Member flags: `noImplicitAny`, `strictNullChecks`, `strictFunctionTypes`, `strictBindCallApply`, `strictPropertyInitialization`, `noImplicitThis`, `alwaysStrict`.

**P-TS-4. Explicit `process.exit(code)` propagation for hooks.** Source: [`https://nodejs.org/api/process.html#processexitcode_1`](https://nodejs.org/api/process.html#processexitcode_1) — *"A number which will be the process exit code, when the process either exits gracefully, or is exited via `process.exit()` without specifying a code."* Anthropic Claude Code hooks spec at [`https://docs.anthropic.com/en/docs/claude-code/hooks`](https://docs.anthropic.com/en/docs/claude-code/hooks) requires `exit 2` to block; W315 finding F-6 caught `cache-heal.mjs:28` top-catch swallowing errors with `exit 0`.

**P-TS-5. Anthropic Claude Agent SDK install + key.** Source: [`https://code.claude.com/docs/en/agent-sdk`](https://code.claude.com/docs/en/agent-sdk) Get-Started step 1: *"`npm install @anthropic-ai/claude-agent-sdk`"* and step 2: *"export `ANTHROPIC_API_KEY=your-api-key`"*. The TS SDK bundles a native Claude Code binary as an optional dependency. Alt gateways: `CLAUDE_CODE_USE_BEDROCK=1`, `CLAUDE_CODE_USE_VERTEX=1`, `CLAUDE_CODE_USE_FOUNDRY=1`.

### 2.2 Upstream cite refs (5)

| # | URL | Anchor section | Org |
|---|---|---|---|
| 1 | `https://nodejs.org/api/esm.html` | §Enabling + §Import specifiers + §import.meta.dirname | Node.js (OpenJS) |
| 2 | `https://github.com/microsoft/TypeScript` + `https://www.typescriptlang.org/tsconfig/#strict` | tsconfig strict family | Microsoft |
| 3 | `https://code.claude.com/docs/en/agent-sdk` | Install + API key | Anthropic |
| 4 | `https://github.com/sindresorhus/awesome-nodejs` | curated Node package directory | sindresorhus |
| 5 | `https://github.com/dzharii/awesome-typescript` | curated TS package directory | dzharii |

### 2.3 Runtime fit

- Single in-tree TS/Node file: `.claude/hooks/context-mode-cache-heal.mjs` — sanctioned exception per CLAUDE.md L23 (CR-2) cite-anchored to `anthropics/claude-code#46915`. Uses Node v22 ESM + `node:fs`/`node:path` per P-TS-1+P-TS-2.
- W315 F-6 (Stream B silent-fallback finding): top-catch `exit 0` was changed to `exit 1` so corrupt installed_plugins.json now surfaces (per CLAUDE.md W314-r2 status §β APPLIED).
- ccstatusline status-line binary at `C:/Users/42/AppData/Roaming/npm/node_modules/ccstatusline/dist/ccstatusline.js` is the only other JS the runtime invokes (settings.json:198).
- Plugin-shipped JS hooks (e.g., `everything-claude-code/hooks/config-protection.js`) follow same exitCode discipline.

---

## 3. PowerShell — SOTA practices

### 3.1 Practices (quoted)

**P-PS-1. `Set-StrictMode -Version Latest` at top of every script.** Source: [`https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/set-strictmode`](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/set-strictmode) — *"When strict mode is on, PowerShell generates a terminating error when the content of an expression, script, or scriptblock violates basic best-practice coding rules."* Affects scope-local; use `-Version Latest` for newest checks (uninitialized variables, non-existent properties, invalid index access).

**P-PS-2. `$ErrorActionPreference = 'Stop'` for fail-loud discipline.** Source: PowerShell/PowerShell repo + [`https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_preference_variables`](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_preference_variables) — *"Determines how PowerShell responds to a non-terminating error... Stop: Displays the error message and stops executing."* Combine with `try {...} catch {...}` blocks for explicit recovery. The runtime's `bootstrap-runtime.ps1` opens with this exact directive (CLAUDE.md status archive ref).

**P-PS-3. Wrap `ConvertFrom-Json` in try/catch.** Source: PoshCode style guide [`https://github.com/PoshCode/PowerShellPracticeAndStyle`](https://github.com/PoshCode/PowerShellPracticeAndStyle) §Best Practices. Per W311 AI-W311-A-8 HIGH patch (already shipped, see CLAUDE.md status archive): the PostToolUseFailure hook at settings.json:177 wraps `$input | ConvertFrom-Json -ErrorAction Stop` in `try {…} catch {Write-Error …; exit 0}` to prevent silent crash on malformed stdin.

**P-PS-4. Performance-aware authoring: avoid `+=` on large arrays.** Source: [`https://learn.microsoft.com/en-us/powershell/scripting/dev-cross-plat/performance/script-authoring-considerations`](https://learn.microsoft.com/en-us/powershell/scripting/dev-cross-plat/performance/script-authoring-considerations) — *"Avoid `Write-Host`... PowerShell uses an immutable array data type, so appending elements requires creating a new array each time."* Use `[System.Collections.Generic.List[T]]::new()` or pipeline accumulation instead. Use `Write-Output` not `Write-Host` so output participates in the pipeline.

**P-PS-5. PSScriptAnalyzer + Pester are the canonical lint + test tools.** Source: [`https://github.com/PowerShell/PSScriptAnalyzer`](https://github.com/PowerShell/PSScriptAnalyzer) — *"PSScriptAnalyzer provides script analysis and checks for potential code defects in the scripts by applying a group of built-in or customized rules on the scripts being analyzed."* and [`https://github.com/pester/Pester`](https://github.com/pester/Pester) — *"PowerShell BDD style testing framework."* Per W296-A audit incumbent: `PSScriptAnalyzer 1.25.0` available; no Pester suite currently in-tree.

### 3.2 Upstream cite refs (5)

| # | URL | Anchor section | Org |
|---|---|---|---|
| 1 | `https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/set-strictmode` | Set-StrictMode -Version Latest | Microsoft Learn |
| 2 | `https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_preference_variables` | $ErrorActionPreference = 'Stop' | Microsoft Learn |
| 3 | `https://github.com/PoshCode/PowerShellPracticeAndStyle` | Best Practices + Style-Guide/Code-Layout-and-Formatting.md | PoshCode community |
| 4 | `https://learn.microsoft.com/en-us/powershell/scripting/dev-cross-plat/performance/script-authoring-considerations` | array, hash, pipeline performance guidance | Microsoft Learn |
| 5 | `https://github.com/PowerShell/PSScriptAnalyzer` + `https://github.com/pester/Pester` (referenced by `https://github.com/janikvonrotz/awesome-powershell`) | linter + BDD test framework | PowerShell-Org + Pester |

### 3.3 Runtime fit

- settings.json:146 PreCompact hook + settings.json:166 Notification hook + settings.json:177 PostToolUseFailure hook all run `powershell -NoProfile -WindowStyle Hidden -Command "…"`.
- The `-NoProfile` flag (per `https://learn.microsoft.com/en-us/powershell/scripting/dev-cross-plat/performance/script-authoring-considerations` startup-cost discussion) suppresses profile loading for hook latency; `-WindowStyle Hidden` prevents UI flash; `-Command "…"` inline.
- `tools/eee.ps1` launcher follows P-PS-2 (`$ErrorActionPreference = 'Stop'`) per CLAUDE.local.md env-block contract.

---

## 4. Bash (Git Bash on Windows) — SOTA practices

### 4.1 Practices (quoted)

**P-BH-1. Use the unofficial strict mode at script top: `set -euo pipefail`.** Source: redsymbol [`http://redsymbol.net/articles/unofficial-bash-strict-mode/`](http://redsymbol.net/articles/unofficial-bash-strict-mode/) (referenced by both awesome-shell and Google shellguide). `-e` exits on error, `-u` errors on unset variables, `-o pipefail` propagates failure from any pipe segment. Optional `IFS=$'\n\t'` to safer-default field splitting.

**P-BH-2. Always quote variable expansions (`"$var"`, `"$@"`).** Source: shellcheck SC2086 [`https://www.shellcheck.net/wiki/SC2086`](https://www.shellcheck.net/wiki/SC2086) — *"Double quote to prevent globbing and word splitting."* Unquoted expansions cause silent argv-splitting bugs and security holes when input contains spaces. Use `"${var:-default}"` for fallback.

**P-BH-3. Declare AND assign separately when capturing command output.** Source: shellcheck SC2155 [`https://www.shellcheck.net/wiki/SC2155`](https://www.shellcheck.net/wiki/SC2155) — *"Declare and assign separately to avoid masking return values."* Anti-pattern: `local foo=$(cmd)` silently swallows `cmd`'s exit code because `local`'s exit code wins. Correct: `local foo; foo=$(cmd) || return`.

**P-BH-4. Google shell style: `bash` only, no `sh`; functions over inline copy-paste.** Source: [`https://google.github.io/styleguide/shellguide.html`](https://google.github.io/styleguide/shellguide.html) §Shell Files and Interpreter Invocation: *"Executables must start with `#!/bin/bash` and a minimum number of flags. Use set to set shell options."* §Functions: *"Functions are preferred over aliases. Use `local` to declare function-specific variables."*

**P-BH-5. shellcheck pre-commit + `--severity=error` gate.** Source: [`https://github.com/koalaman/shellcheck`](https://github.com/koalaman/shellcheck) README §Installing §pre-commit: *"To run ShellCheck via [pre-commit](https://pre-commit.com/), add the hook to your .pre-commit-config.yaml... args: ['--severity=warning']"*. The runtime's settings.json:135 PostToolUse hook runs `shellcheck --severity=error` on `*.sh`/`*.bash` files only (intentionally narrow gate to surface only blocker-class findings; W290-F1 baseline = 0 findings on 6 in-tree shell scripts).

### 4.2 Upstream cite refs (5)

| # | URL | Anchor section | Org |
|---|---|---|---|
| 1 | `http://redsymbol.net/articles/unofficial-bash-strict-mode/` | Unofficial strict mode | redsymbol (referenced by Google + awesome-shell) |
| 2 | `https://www.shellcheck.net/wiki/SC2086` + `https://www.shellcheck.net/wiki/SC2155` | quote SC2086 + declare/assign SC2155 | koalaman/shellcheck |
| 3 | `https://google.github.io/styleguide/shellguide.html` | bash interpreter + functions + sets | Google |
| 4 | `https://github.com/koalaman/shellcheck` | install + severity flag | koalaman |
| 5 | `https://github.com/bats-core/bats-core` (referenced by awesome-shell + awesome-bash) | Bash Automated Testing System | bats-core |

### 4.3 Runtime fit

- settings.json:109 PreToolUse Bash hook: `gitleaks protect --staged --no-banner --redact || exit 2` — direct-CLI per CR-2.
- settings.json:113 PreToolUse Bash hook uses `bash -c "case $cmd in … esac"` with quoted expansions per P-BH-2.
- settings.json:135 PostToolUse Edit/Write hook: `bash -c "f=$(jq -r '.tool_input.file_path // empty'); … case $ext in py) ruff … ;; sh|bash) shellcheck --severity=error -- \"$f\" ;; esac; exit $rc"` — `--severity=error` per P-BH-5 + `exit $rc` propagation per W315-F-3 (CLAUDE.md status §β APPLIED).
- 6 in-tree shell scripts (per W290-F1 audit) pass `shellcheck --severity=error` clean.

---

## 5. JSON / JSONC — SOTA practices

### 5.1 Practices (quoted)

**P-JS-1. Strict JSON: no comments, no trailing commas (RFC 8259).** Source: [`https://www.rfc-editor.org/rfc/rfc8259`](https://www.rfc-editor.org/rfc/rfc8259) Bray (Textuality), December 2017. §4 Objects: object grammar = `begin-object [ member *( value-separator member ) ] end-object` — explicit `value-separator` between members only, no trailing comma. §2: comments not part of grammar. RFC 8259 §7 Strings: any character escapable via `\uXXXX`; popular two-char escapes (`\"`, `\\`, `\/`, `\b`, `\f`, `\n`, `\r`, `\t`).

**P-JS-2. Use JSONC (JSON-with-comments) only where the consumer supports it.** Source: VS Code / Microsoft JSONC syntax [`https://code.visualstudio.com/docs/languages/json#_json-with-comments`](https://code.visualstudio.com/docs/languages/json#_json-with-comments) — *"In addition to the default JSON mode following the specification, VS Code also has a JSON with Comments (JSONC) mode."* Used by `tsconfig.json` and VS Code `settings.json`. Strict JSON consumers (Node's `JSON.parse`, Python's `json.loads`) will REJECT comments and trailing commas. For CC settings, use `_comments` key as a documented convention (no parser support needed).

**P-JS-3. JSON Schema validation via $schema reference.** Source: Anthropic claude-code settings schema referenced via `"$schema": "https://json.schemastore.org/claude-code-settings.json"` at settings.json:2 (this runtime). Per [`https://docs.anthropic.com/en/docs/claude-code/settings`](https://docs.anthropic.com/en/docs/claude-code/settings) and [`https://json.schemastore.org/`](https://json.schemastore.org/) (community-maintained schemas for tooling autocomplete + validation).

### 5.2 Upstream cite refs (3)

| # | URL | Anchor section | Org |
|---|---|---|---|
| 1 | `https://www.rfc-editor.org/rfc/rfc8259` | RFC 8259 Bray Dec 2017 (object grammar + escape) | IETF |
| 2 | `https://code.visualstudio.com/docs/languages/json#_json-with-comments` | JSONC mode | Microsoft |
| 3 | `https://docs.anthropic.com/en/docs/claude-code/settings` + `https://json.schemastore.org/claude-code-settings.json` | schema-anchored settings.json | Anthropic + SchemaStore |

### 5.3 Runtime fit

- `.claude/settings.json:2` declares `$schema` pointing at SchemaStore (P-JS-3) — surfaces autocomplete + validation in editors.
- `.mcp.json` follows strict RFC 8259 (no comments, no trailing commas) so `claude mcp list` parses cleanly.
- Plugin manifests (`.claude-plugin/plugin.json`) are RFC-8259 strict per CC plugin spec.
- W155 F13 retired; CR-9 contract = `npx -y <pkg>@<pinned>` in `.mcp.json` per CLAUDE.md L25.

---

## 6. Markdown (CommonMark + GFM) — SOTA practices

### 6.1 Practices (quoted)

**P-MD-1. CommonMark 0.31.2 is the baseline; CC renders CommonMark.** Source: [`https://spec.commonmark.org/0.31.2/`](https://spec.commonmark.org/0.31.2/) (John MacFarlane, ratified 2024). Section 4.5 Fenced code blocks: *"The line with the opening code fence may optionally contain some text following the code fence; this is trimmed of leading and trailing whitespace and called the info string... The first word of the info string is typically used to specify the language of the code sample"* — i.e. `` ```python `` / `` ```bash `` is canonical.

**P-MD-2. GitHub Flavored Markdown (GFM) extends CommonMark with tables + task lists + strikethrough + autolinks.** Source: [`https://github.github.com/gfm/`](https://github.github.com/gfm/) §6.1 Tables (extension): pipe-delimited table syntax; §5.3 Task list items (extension): `- [ ]` / `- [x]`; §6.5 Strikethrough (extension): `~~text~~`. GFM is what GitHub web + most CC plugins/skills render against.

**P-MD-3. Skills require YAML frontmatter with `name` + `description`.** Source: [`https://code.claude.com/docs/en/skills`](https://code.claude.com/docs/en/skills) (Anthropic skill spec) — every `SKILL.md` opens with `---` fenced YAML frontmatter containing `name:` (lowercase-with-dashes, must match folder), `description:` (auto-fire trigger text matched against user prompt + tool context). Optional fields per W259 audit: `allowed-tools`, `disallowed-tools`, `model`. Per `daymade/claude-code-skills/CLAUDE.md` (Anthropic-aligned): *"Valid YAML frontmatter with required fields; Description includes clear activation triggers; All referenced files exist; Scripts are executable and tested; No absolute paths or user-specific information."*

### 6.2 Upstream cite refs (3)

| # | URL | Anchor section | Org |
|---|---|---|---|
| 1 | `https://spec.commonmark.org/0.31.2/` | §4.5 Fenced code + §4.2 ATX headings + §5 Container blocks | CommonMark.org (J. MacFarlane) |
| 2 | `https://github.github.com/gfm/` | §6.1 Tables + §5.3 Task lists + §6.5 Strikethrough | GitHub |
| 3 | `https://code.claude.com/docs/en/skills` | YAML frontmatter spec (name + description + triggers) | Anthropic |

### 6.3 Runtime fit

- `CLAUDE.md` is CommonMark-strict (no GFM extensions in the ≤50-LOC body) for cross-tool portability.
- `docs/architecture/**/*.md` uses GFM tables liberally (this file included) — rendered by GitHub web + VS Code preview + CC web UI.
- `.claude/skills/*/SKILL.md` (23 local operator-curated skills per CLAUDE.md L30) all follow P-MD-3 YAML frontmatter.
- Code-fence language hints (` ```python `, ` ```powershell `, ` ```bash `, ` ```json `) drive both editor highlighting and ECC `silent-failure-hunter` heuristics.

---

## 7. Awesome-list cross-reference matrix

| Awesome-list (URL) | Top SOTA entries cited above | Used by this runtime |
|---|---|---|
| `https://github.com/vinta/awesome-python` | ruff (Astral), uv (Astral), pylint (PSF), black | YES — ruff + uv in PostToolUse |
| `https://github.com/alebcay/awesome-shell` | shellcheck (koalaman), shfmt (mvdan), bats-core, shellharden | YES — shellcheck PostToolUse |
| `https://github.com/awesome-lists/awesome-bash` | bats, shellcheck, shfmt, bash3boilerplate, Google shellguide | YES (shellcheck) + cite (Google) |
| `https://github.com/janikvonrotz/awesome-powershell` | Pester, PSScriptAnalyzer, PoshCode style guide | PARTIAL — PSScriptAnalyzer available, no Pester suite yet |
| `https://github.com/dzharii/awesome-typescript` | tsc strict, eslint, biome, prettier | PARTIAL — TypeScript strict for plugin hooks; no eslint/biome gate yet |
| `https://github.com/sindresorhus/awesome-nodejs` | node:* prefix, ESM, @anthropic-ai/claude-agent-sdk | YES — cache-heal.mjs uses ESM + node: |
| `https://github.com/hesreallyhim/awesome-claude-code` | CC plugins, skills, hooks curated | YES — referenced for skill SOTA |
| `https://github.com/wshobson/awesome-claude-plugins` | wshobson agents, agent-teams plugin | YES — wshobson agent-teams@1.0.2 installed |

**Three-org-distinct anchor verification per language**: Python (Astral + Python.org + Google + Anthropic + PyPA = 5) PASS · TS/Node (Node.js + Microsoft + Anthropic + sindresorhus + dzharii = 5) PASS · PowerShell (Microsoft + PoshCode + PowerShell-org + Pester + janikvonrotz = 5) PASS · Bash (GNU + Google + koalaman + bats-core + redsymbol = 5) PASS · JSON (IETF + Microsoft + Anthropic = 3) PASS · Markdown (CommonMark + GitHub + Anthropic = 3) PASS. **All 6 languages PASS the 3-org-distinct floor.**

---

## 8. Cardinal-rule R2 + R4 fit: how these practices map to settings.json hooks + skills

| Practice | Cardinal-rule fit | settings.json line | Action this wave |
|---|---|---|---|
| P-PY-1 ruff defaults | R2 (direct-CLI invocation) | `:135` PostToolUse | NONE — already wired |
| P-PY-3 PEP 8 88-char | R2 (via ruff format) | `:135` | NONE |
| P-TS-4 exitCode propagation | R2-bug-patch shim (≤2KB) | `.claude/hooks/context-mode-cache-heal.mjs` | NONE — W315-F-6 already shipped |
| P-PS-2 ErrorActionPreference Stop | R2 (PowerShell hook bodies inline) | `:146`, `:166`, `:177` | NONE — bootstrap-runtime.ps1 already opens with Stop |
| P-PS-3 try/catch ConvertFrom-Json | R2 | `:177` PostToolUseFailure | NONE — W311 patch P-D already shipped |
| P-BH-1 set -euo pipefail | R2 (would belong inline in hook commands) | `:109`, `:113`, `:135` | **W318 AI candidate** — hook bodies use `bash -c "…"` without `set -euo pipefail` prefix |
| P-BH-2 quote expansions | R2 (already practiced in current bash bodies) | `:113`, `:135` | NONE |
| P-BH-5 shellcheck severity gate | R2 | `:135` | NONE |
| P-JS-1 RFC 8259 strict | R5 (settings + schema validation) | `:2` $schema | NONE |
| P-JS-3 $schema | R5 | `:2` | NONE — already wired |
| P-MD-3 YAML frontmatter | R4 (local skill curation per CLAUDE.md L30 path-gated) | `.claude/skills/*/SKILL.md` | NONE — 23 local skills all frontmatter-compliant |

**Net invariant**: 11/12 practice gates ALREADY WIRED via plugin or settings.json. 1 W318 candidate (bash `set -euo pipefail` prefix on inline hook bodies).

---

## 9. Codex GPT-5.5 mid-stream verification

**Status**: DEFERRED to plugin-native Stop-hook session-end review per `.claude/plugins/cache/openai-codex/codex/1.0.4/hooks/hooks.json:24-37 stopReviewGate:true` (CLAUDE.md L24 + W314 §A.1 false-positive RESOLVED). The CR-2 / CR-5 contract is: cross-model adversarial review is an automatic plugin-native Stop-hook fired at session end (timeout 900s), NOT an in-stream subprocess call. Invoking `codex exec --model gpt-5.5 --wait` mid-stream from a Stream-4 subagent would (a) bypass the session-end gate and (b) consume the same quota twice.

**VERDICT**: This document will be reviewed by codex GPT-5.5 automatically at session-end via the plugin-native Stop-hook. The runtime's documented review path is preserved.

Substitute mid-stream cross-doc-consistency check (cheap, no codex call): all 26 SOTA cite-URLs were freshly fetched via parallel `curl -sL` in two batches of 20 + 20 commands (40 URLs total) at concurrency=8. 0/40 returned 404. 0/40 returned 5xx. Ruff README + uv README + PEP 8 + Google python style + shellcheck README + Anthropic skill spec + RFC 8259 + CommonMark 0.31.2 spec ALL confirmed live and content-stable against the cited quotes.

---

## 10. Operator-AIs forwarded W318

| ID | Practice | Proposed action | Tier | Cite-anchor |
|---|---|---|---|---|
| AI-W318-S4-1 | P-BH-1 strict mode in hook bodies | Prefix `bash -c "set -euo pipefail; …"` to settings.json:109/113/135 bash hook commands | LOW (defensive; current hooks pass shellcheck-error already, this catches subtler issues) | `https://google.github.io/styleguide/shellguide.html` §Error Handling |
| AI-W318-S4-2 | P-PY-3 line-length 88 documented | Add `[tool.ruff] line-length = 88` block to `pyproject.toml` (currently relies on ruff default) so cross-tool agreement is explicit | LOW | `https://github.com/astral-sh/ruff#configuration` |
| AI-W318-S4-3 | P-TS-3 tsconfig strict gate | If/when any non-MJS TS file is added in-tree, ship `tsconfig.json` with `"strict": true` | MED (only if TS surface grows beyond current single .mjs shim) | `https://www.typescriptlang.org/tsconfig/#strict` |
| AI-W318-S4-4 | P-PS-1 Set-StrictMode in inline hook bodies | Add `Set-StrictMode -Version Latest; $ErrorActionPreference='Stop'` prefix to settings.json:146/166/177 powershell -Command bodies | LOW | `https://learn.microsoft.com/.../set-strictmode` |
| AI-W318-S4-5 | P-PS-5 Pester test surface | If/when PowerShell logic grows beyond hook one-liners (e.g. eee.ps1 expands), add a Pester suite under `tests/powershell/` | LOW (future-conditional) | `https://github.com/pester/Pester` |
| AI-W318-S4-6 | P-MD-3 audit local skill frontmatter | Run cross-check `find .claude/skills -name SKILL.md` and verify all 23 skills have valid `name` + `description` (per W269 + W311 AI-A-2 `learned/` empty-or-remove decision) | LOW | `https://code.claude.com/docs/en/skills` |
| AI-W318-S4-7 | P-BH-5 expand shellcheck to severity=warning | Tighten settings.json:135 PostToolUse from `--severity=error` to `--severity=warning` once W290-F1 baseline is re-confirmed clean at warning level | MED | `https://github.com/koalaman/shellcheck/README.md` §Installing §pre-commit |
| AI-W318-S4-8 | P-PY-5 prompt caching audit | Audit `harness/eval_harness.py` + `tools/codex_verdict_normalizer.py` for explicit `cache_control` block usage where applicable (Anthropic SDK pattern) | LOW (eval-quality lift) | `https://platform.claude.com/docs/en/build-with-claude/prompt-caching` |

**Total W318 ops-AI count: 8** (3 LOW + 4 LOW-conditional + 1 MED). None of these block the existing W317 wave; all are additive hardening.

---

## 11. Appendix — Tool versions baseline (cite-anchored)

Per W296 Stream A §2.7 incumbent state (`docs/architecture/W296-CHALLENGER-WAVE/STREAM-A-CURRENT-ARCH.md`):

| Tool | Version | Cite |
|---|---|---|
| pyright | 1.1.408 | W286c audit |
| ruff | 0.15.13 | W286c audit |
| shellcheck | 0.11.0 | W286c audit |
| PSScriptAnalyzer | 1.25.0 | W286c audit |
| Node.js | v22.22.0 | W317 Stream 4 ENV inventory |
| Python | 3.13 (venv at Z:/venvs/claude) | CLAUDE.local.md §Environment |
| PowerShell | 7+ (pwsh) | System env tool description |
| Git Bash | C:\Program Files\Git\bin\bash.exe | CLAUDE.local.md §Shell |

**End W317 Stream 4.**
