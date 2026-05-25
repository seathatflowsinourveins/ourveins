# W319 Stream 1 — Programming-Language-Cookbook SOTA + Tooling Gap Audit

**Date**: 2026-05-19
**Scope**: per-language tooling inventory cross-referenced against canonical awesome-lists.

## Key correction to parent context

Parent W318 stated "no Rust toolchain confirmed" — **incorrect**. Rust IS fully installed at `C:/Users/42/.cargo/bin/`: `rustc`, `cargo`, `cargo-clippy`, `cargo-fmt`, `cargo-miri`, `clippy-driver`, `rls`, `rust-analyzer`, `rustdoc`, `rustfmt`, `rustup`. The gap is in cargo-* extension tools (audit/deny/watch), not the toolchain itself.

---

## § 1. Python (venv `Z:/venvs/claude` + system)

Cross-ref: `vinta/awesome-python` (categories: testing, code-quality, packaging, security).

| Tool | Status | Location | Action |
|------|--------|----------|--------|
| ruff | ✗ NOT in venv Scripts | — | **`uv tool install ruff`** (used in PostToolUse hook — verify it resolves via PATH; if not, install) |
| uv | ⚠ unverified | implied by `permissions.allow` | confirm via `uv --version`; if absent: `gh release download -R astral-sh/uv` |
| pre-commit | ✓ | `/z/claude-sota-installed/.local/bin/pre-commit` | none |
| pytest | ✓ | venv Scripts | none — plus `pytest-asyncio`, `pytest-cov`, `pytest-repeat`, `pytest-rerunfailures` |
| hypothesis | ✗ MISSING | — | `uv tool install hypothesis` (property-based testing — paired with pytest) |
| mypy | ✓ | venv Scripts | none |
| pyright | ✓ | venv Scripts | none (also `pyrefly` bonus tool present) |
| poetry / rye | ✗ MISSING | — | **defer** — `uv` supersedes both per Astral SOTA roadmap |
| pip-audit | ✓ | venv Scripts | none |
| bandit | ✓ | venv Scripts | none |
| ruff-format | ✓ (bundled with ruff if installed) | — | covered by ruff fix |
| black | ✓ | venv Scripts | tension with ruff-format — pick one |
| isort | ✓ | venv Scripts | tension with ruff `--fix` `I` rules — pick one |
| coverage | ✓ | venv Scripts | none |
| pipx | ✗ MISSING | — | **defer** — `uv tool install` covers same use case |

**Python missing**: 2 essential (ruff verify, hypothesis), 3 deferred (poetry/rye/pipx supersede by uv).

---

## § 2. Node.js / TypeScript (npm globals + system)

Cross-ref: `sindresorhus/awesome-nodejs`.

| Tool | Status | Location | Action |
|------|--------|----------|--------|
| pnpm | ✓ | `C:/Users/42/AppData/Roaming/npm/pnpm` | none |
| bun | ✓ | `C:/Users/42/.bun/bin/bun` | none |
| biome | ✓ | `C:/Users/42/AppData/Roaming/npm/biome` + `@biomejs` scope | none — modern lint+format unifier |
| prettier | ✗ MISSING | — | `npm install -g prettier` (or skip — biome supersedes) |
| vitest | ✓ | `C:/Users/42/AppData/Roaming/npm/vitest` | none |
| tsx | ✗ MISSING | — | **`npm install -g tsx`** (Node 22 ESM runner, faster than ts-node) |
| ts-node | ✗ MISSING | — | **defer** — tsx supersedes |
| eslint | ✗ MISSING bare | `@eslint` scope present but no bin in PATH | `npm install -g eslint` if non-biome projects exist |
| type-coverage | ✗ MISSING | — | `npm install -g type-coverage` (TS coverage metric) |
| typescript bare | ✗ MISSING global | scoped only | `npm install -g typescript` |
| turbo / nx | ✗ MISSING | — | only needed for monorepo work — defer |
| vite | ✗ MISSING | — | not needed unless building frontend |
| husky | ✗ MISSING | — | **`npm install -g husky`** — paired with lint-staged for git-hook orchestration |
| commitizen | ✓ | `@commitlint` scope + commitizen bin | none |
| lint-staged | ✗ MISSING | — | `npm install -g lint-staged` |

**Node missing**: 4 essential (tsx, typescript bare, husky, lint-staged), 4 nice-to-have (prettier/eslint/type-coverage/vite).

---

## § 3. Rust (correction: toolchain IS installed)

Cross-ref: `rust-unofficial/awesome-rust`.

| Tool | Status | Location | Action |
|------|--------|----------|--------|
| rustc / cargo / clippy / rustfmt / rust-analyzer / rustup / rustdoc | ✓ ALL | `C:/Users/42/.cargo/bin/` | none |
| cargo-audit | ✗ MISSING | — | **`cargo install cargo-audit`** (RustSec advisory DB) |
| cargo-deny | ✗ MISSING | — | **`cargo install cargo-deny`** (license + duplicate + advisory linter) |
| cargo-watch | ✗ MISSING | — | `cargo install cargo-watch` (filesystem-trigger rebuild) |
| cargo-edit | ✗ MISSING | — | `cargo install cargo-edit` (manifest CLI edits) |
| cargo-nextest | ✗ MISSING | — | `cargo install cargo-nextest` (fast test runner — SOTA) |

**Rust missing**: 5 cargo extensions; cargo-audit + cargo-deny + cargo-nextest are SOTA-must-have.

---

## § 4. PowerShell

Cross-ref: `janikvonrotz/awesome-powershell`.

| Module | Status | Version | Action |
|--------|--------|---------|--------|
| PSScriptAnalyzer | ✓ | 1.25.0 | none — runs against PS1 files |
| Pester | ✓ | 5.7.1 + 3.4.0 (dup) | clean up 3.4.0 dup |
| PSReadLine | ✓ | 2.4.5 + 2.0.0 (dup) | clean up 2.0.0 dup |
| Plaster | ✗ MISSING | — | `Install-Module Plaster -Scope CurrentUser` (template scaffolding) |
| InvokeBuild | ✗ MISSING | — | `Install-Module InvokeBuild -Scope CurrentUser` (build automation) |
| platyPS | ✗ MISSING | — | `Install-Module platyPS -Scope CurrentUser` (markdown help generator) |

**PowerShell missing**: 3 modules; PSScriptAnalyzer already wired implicitly via Stream-2 audit recommendations.

---

## § 5. Cross-cutting / system

| Tool | Status | Location | Action |
|------|--------|----------|--------|
| pre-commit | ✓ | `.local/bin/pre-commit` | none |
| commitizen | ✓ | npm global | none |
| lefthook | ✓ | WinGet Links | none — alternative to husky |
| gitleaks | ✓ | `.local/bin/gitleaks` | none — wired into PreToolUse |
| shellcheck | ✓ | WinGet Links | none |
| shfmt | ✓ | `C:/Users/42/go/bin/shfmt` | none |
| jq | ✓ | chocolatey | none |
| yq | ✓ | WinGet | none |
| fd / rg / bat | ✓ ALL | WinGet | none |
| just | ✗ MISSING | — | **`cargo install just`** (cross-platform task runner) |
| task | ✗ MISSING | — | defer — `just` covers same use case |
| trivy | ✗ MISSING | — | **`gh release download -R aquasecurity/trivy`** (broad supply-chain scan) |
| grype | ✗ MISSING | — | **`gh release download -R anchore/grype`** (vuln scan against syft SBOMs) |
| syft | ⚠ unverified | parent claimed 1.44.0 | confirm with `syft --version` |
| trufflehog | ✗ MISSING | — | `gh release download -R trufflesecurity/trufflehog` (git-history secret scan) |
| semgrep | ✗ MISSING bare | `pysemgrep` in venv only | `uv tool install semgrep` |
| osv-scanner | ✗ MISSING | — | `gh release download -R google/osv-scanner` |
| act | ✗ MISSING | — | `gh release download -R nektos/act` (GitHub Actions local) |
| typos | ✗ MISSING | — | `cargo install typos-cli` |
| lazygit | ✗ MISSING | — | `gh release download -R jesseduffield/lazygit` |
| delta | ✗ MISSING | — | `cargo install git-delta` (better git diff UI) |
| dust | ✗ MISSING | — | `cargo install du-dust` (fast `du` alt) |
| hyperfine | ✗ MISSING | — | `cargo install hyperfine` (benchmark tool) |
| tokei | ✗ MISSING | — | `cargo install tokei` (LOC counter) |

**System missing**: 13 SOTA tools; security-stack (trivy/grype/trufflehog/osv-scanner) + rust-ergonomic (delta/dust/lazygit) are highest-impact.

---

## § Top-5 Cross-Language High-Impact Installs

Ranked by ≥2 awesome-list mentions, security relevance, and gap-blocking:

1. **`uv tool install ruff`** (verify or install) — already wired into PostToolUse hook; if PATH-fail, hook silently misses lint
2. **`cargo install cargo-audit cargo-deny cargo-nextest`** (3 in one batch) — closes Rust security supply-chain gap; pairs with Stream-3 W318 trivy+grype
3. **`gh release download -R aquasecurity/trivy + -R anchore/grype + -R trufflesecurity/trufflehog`** — full security supply-chain triad (broad-vuln + SBOM-vuln + git-history-secrets)
4. **`cargo install just typos-cli git-delta du-dust`** (4 in one batch) — cross-language ergonomic + task runner (`just` doubles as cross-language make replacement)
5. **`Install-Module Plaster, InvokeBuild, platyPS -Scope CurrentUser`** (3 in one batch) — PowerShell SOTA modules; pairs with Stream-2 W318 Set-StrictMode push

## Allow-list compliance

All recommended installs use grants already in `.claude/settings.json:permissions.allow`:

- `gh release download *` → trivy, grype, trufflehog, osv-scanner, act, lazygit
- `cargo install *` → cargo-audit, cargo-deny, cargo-nextest, cargo-watch, just, typos-cli, git-delta, du-dust, hyperfine, tokei
- `uv tool install *` → ruff, hypothesis, semgrep
- `npm install -g *` → tsx, typescript, husky, lint-staged, prettier, eslint

No new permission grants required.

## Out-of-scope flag

W318 Stream-3 already recommended trivy/grype/garak/trufflehog/semgrep/osv-scanner/act/just/shfmt/typos. This stream **confirms and extends** by adding language-specific tools the W318 generic CLI sweep missed (cargo-* extensions, PS modules, hypothesis, tsx, husky).
