# W318 Stream 3 — CLI Tools Inventory + Awesome-List Gap Analysis

**Date**: 2026-05-19
**Method**: 45-command inventory batch + 5/6 awesome-list READMEs fetched (`awesome-claude-code`, `awesome-cli-apps`, `awesome-shell`, `awesome-nodejs`, `awesome-python`; `Awesome-Windows/Awesome` returned 404, dropped).
**Scope**: tools usable from `permissions.allow` (`npm install -g *`, `uv tool install *`, `gh release download *`, `git clone *`, `docker pull *`, `cargo install *`).

## §1 Inventory (installed)

### Runtimes & package managers (✓ all installed)

| Tool | Version | Source |
|---|---|---|
| node | 22.22.0 (per CLAUDE.md) | `Z:/tools/nodejs/` |
| npm | 11.9.0 | bundled |
| pnpm | 10.32.1 | npm global |
| bun | 1.3.13 | npm global |
| python | 3.x | `Z:/venvs/claude/` (1 630 site-packages) |
| uv | installed | (tool-list exists) |
| cargo | installed | rustup |
| docker | installed | Docker Desktop |
| pwsh | installed | system |
| code (VSCode) | installed | system |
| claude | installed | (W315 ECC plugin context) |
| codex-cli | 0.130.0 | npm global `@openai/codex` |

### Modern Unix replacements (✓ comprehensive)

`ripgrep`, `fd`, `bat`, `fzf` (0.70.0), `zoxide` (0.9.9), `starship` (1.24.2), `delta`, `lazygit`, `jq`, `yq`, `hyperfine`, `tokei`, `shellcheck`.

### Build / lint / format

`ast-grep` (0.42.0), `biome` (2.4.14), `oxlint` (1.59.0), `pyright` (1.1.409), `typescript` (6.0.3), `typescript-language-server` (5.1.3), `vitest` (4.1.6), `markdownlint-cli2` (0.22.1), `repomix` (1.14.0), `ruff`.

### Security (partial)

`gitleaks` ✓, `syft` (1.44.0 SBOM) ✓. **Gaps**: `trufflehog`, `grype`, `trivy`, `semgrep-CLI`, `osv-scanner`, `ripsecrets`.

### MCP server ecosystem (npm-global, ~17 servers)

`@anthropic-ai/claude-agent-sdk`, `@anthropic-ai/sdk`, `@modelcontextprotocol/{inspector,sdk,server-filesystem,server-github,server-sequential-thinking}`, `@arizeai/phoenix-mcp`, `@perplexity-ai/mcp-server`, `@playwright/mcp`, `@upstash/context7-mcp`, `chrome-devtools-mcp`, `@brave/brave-search-mcp-server`, `exa-mcp-server`, `firecrawl-mcp`, `tavily-mcp`, `context-mode`, `mcp-remote`, `mcporter`, `@smithery/cli`, `openapi-mcp-generator`.

### Agent / orchestration CLIs (60 npm globals total)

`@google/gemini-cli` (0.34.0), `@steipete/oracle`, `claude-flow`, `claude-mem`, `ccmanager`, `ccusage`, `ccstatusline`, `oh-my-claude-sisyphus`, `happy-coder`, `headroom-ai`, `agnix`, `langfuse-cli`, `promptfoo` (0.121.11), `ecc-agentshield`, `gitnexus`.

### Python venv (key packages for agentic AI)

`anthropic`, `openai`, `dspy` 3.2.1, `cognee` 1.1.0, `graphiti_core` 0.29.0, `fastapi`/`fastapi_users`/`fastapi_sso`, `httpx`, `httpx_aiohttp`, `pydantic` ecosystem, `chromadb`, `cyclonedx-python-lib` 11.7.0 (SBOM), `cisco-ai-mcp-scanner` 4.6.0, `chonkie`, `claude-agent-sdk` 0.2.82, `fastmcp` 3.3.1, `datamodel-code-generator`, `coverage`, `cryptography` 46.0.7, `accelerate`, `FlagEmbedding`, `google-genai` 1.75.0.

### Plugins (cache, 18 installed)

`addy-agent-skills`, `anthropic-agent-skills`, `antigravity-awesome-skills`, `claude-code-skills`, `claude-code-workflows`, `claude-plugins-official`, `claude-settings`, `context-mode`, `everything-claude-code`, `gitnexus-marketplace`, `hindsight`, `karpathy-skills`, `mcp-memory-service`, `openai-codex`, `planning-with-files`, `pydantic-skills`, `superpowers-marketplace`, `thedotmack`.

### Marketplaces (23 declared)

Above + `abhigyanpatwari-GitNexus`, `claude-community`, `claude-for-financial-services`, `healthcare`, `knowledge-work-plugins`, `life-sciences`.

## §2 Awesome-list cross-reference matrix

| Tool | awesome-claude-code | awesome-cli-apps | awesome-shell | awesome-nodejs | awesome-python | Installed? |
|---|---|---|---|---|---|---|
| ripgrep / fd / bat / fzf / zoxide / starship | — | ✓ | ✓ | — | — | ✓ |
| delta / lazygit / hyperfine / tokei | — | ✓ | ✓ | — | — | ✓ |
| bun / pnpm / vitest / biome | — | — | — | ✓ | — | ✓ |
| ast-grep / oxlint / repomix / promptfoo | ✓ | — | — | ✓ | — | ✓ |
| **trivy / grype / trufflehog / semgrep** | — | ✓ | ✓ | — | ✓ (semgrep) | **✗** |
| **act** | — | ✓ | ✓ | — | — | **✗** |
| **just** | — | ✓ | ✓ | — | — | **✗** |
| **typos / shfmt** | — | ✓ | ✓ | — | — | **✗** |
| **deno** | — | — | — | ✓ | — | **✗** |
| **dive / lazydocker** | — | ✓ | — | — | — | **✗** |
| **glow / mods / charmbracelet/gum** | — | ✓ | ✓ | — | — | **✗** |
| **NVIDIA/garak** (LLM red-team) | ✓ (W258r20 cited) | — | — | — | ✓ | **✗** |
| **osv-scanner** | — | — | — | — | ✓ | **✗** |
| **ripsecrets** | — | — | ✓ | — | — | **✗** |
| **xh / httpie** | — | ✓ | ✓ | — | — | **✗** |
| **goose-vcs / git-absorb** | — | ✓ | ✓ | — | — | **✗** |
| **dasel** | — | ✓ | ✓ | — | — | **✗** |
| **shepherd** (claude bg-process tracker) | ✓ (community) | — | — | — | — | **✗** |
| **shield** (security orchestrator) | ✓ (community) | — | — | — | — | **✗** |

## §3 Top-10 install recommendations

Ranked by (a) cited by ≥2 lists OR ≥1 list + already-cited in this runtime's W258/W259 catalogs, and (b) closes a current capability gap.

| # | Tool | Current | Proposed | Rationale | Install (allow-list compliant) |
|---|---|---|---|---|---|
| 1 | **trivy** | none | aquasecurity/trivy | OSS-first 2026 stack (W259-LAYER-D) — containers + filesystem + repos + IaC + secrets, breadth. Pairs with syft+grype. | `gh release download --repo aquasecurity/trivy --pattern '*windows*amd64*.zip'` |
| 2 | **grype** | syft only | anchore/grype | SBOM-driven SCA depth with EPSS+KEV prioritization. syft→grype is the canonical pair. | `gh release download --repo anchore/grype --pattern '*windows*amd64*.zip'` |
| 3 | **trufflehog** | gitleaks only | trufflesecurity/trufflehog | Secrets scanner *with verification* (gitleaks does fast-scan; trufflehog validates). | `gh release download --repo trufflesecurity/trufflehog --pattern '*windows*amd64*.zip'` |
| 4 | **semgrep** | none (CLI) | uv tool | SAST — industry consensus 2026 stack. `cisco-ai-mcp-scanner` in venv depends on the family. | `uv tool install semgrep` |
| 5 | **osv-scanner** | none | google/osv-scanner | OSV.dev + malicious-package feed; standard supply-chain layer. | `gh release download --repo google/osv-scanner --pattern '*windows*amd64*.zip'` |
| 6 | **NVIDIA/garak** | none | NVIDIA/garak | LLM vulnerability scanner — probe Claude API workflows for jailbreaks/prompt-injection. W258r20 already cited as AUGMENT. Operator has `.audit-garak/` dir signal. | `uv tool install garak` |
| 7 | **act** | none | nektos/act | Run GitHub Actions locally. ≥2 awesome-list cite + supports the `.github/workflows/` review loop. | `gh release download --repo nektos/act --pattern '*Windows_x86_64*.zip'` |
| 8 | **just** | none | casey/just | Modern make alternative — cleaner task-runner ergonomics; `justfile` is becoming the de-facto standard. | `cargo install just` |
| 9 | **shfmt** | shellcheck only | mvdan/sh | POSIX shell formatter — pairs with shellcheck. Defensive-shell gap. | `gh release download --repo mvdan/sh --pattern '*windows*amd64*.exe'` |
| 10 | **typos-cli** | none | crate-ci/typos | Fast spell-check for source code — pre-commit hook target. | `cargo install typos-cli` |

### Honorable mentions (defer to W319)

- **deno** — modern JS runtime with permission model; bun is installed and covers similar ground.
- **dive** / **lazydocker** — Docker TUI extensions; only if docker workflow expands.
- **xh** — modern HTTPie-style HTTP client in Rust.
- **glow** / **mods** / **gum** — charmbracelet TUI toolkit, narrow utility.
- **shepherd** + **shield** (claude-plugins-community) — pending CR-9 plugin install via `/plugin install`.

## §4 Deprecated / replace candidates (DROP list)

| Tool | Status | Recommended action |
|---|---|---|
| `tree-sitter-dart@` (no version) | broken install (empty version string) | `npm uninstall -g tree-sitter-dart` — reinstall with explicit version or drop |
| `context-mode@` (no version) | same broken pattern | reinstall: plugin already installed under `@plugins/cache/context-mode/context-mode/1.0.141/` is the canonical; npm-global appears redundant |
| `herdctl-monorepo@` (no version) | broken | investigate — likely scaffold leftover |
| `claude-code-cache-fix` (3.5.4) | overlaps with W317 bootstrap fix + native context-mode-cache-heal.mjs shim | DROP after W317 burn-in confirms no `Z:\z\` regression for 7 days |
| `claude-flow` (3.5.48) | CR-12 DUPLICATE per W259 LAYER-B §2.5 (kickoff pattern → wshobson agent-teams native) | EVALUATE — keep only if specific workflow uses it |
| `oh-my-claude-sisyphus` (4.9.3) | unclear scope / dup of `superpowers` workflows | AUDIT W319 |
| `happy-coder`, `headroom-ai` | UI helpers, no cited utility | AUDIT W319 |
| `microsoft/autogen` (if surfaces) | MAINTENANCE-MODE per Microsoft 2026 (→ agent-framework) | already not installed; cite as REJECT |

## §5 Capability-gap summary

Closes 4 of 5 SOTA-2026 security-stack layers (was syft+gitleaks → +trivy+grype+trufflehog+semgrep+osv-scanner = full OSS supply-chain stack consensus). Adds LLM-red-team layer (`garak`) which is absent. Closes shell-quality gap (`shfmt` + `typos`). Adds local CI parity (`act`). Net: 7 critical security/eval primitives + 3 ergonomic ones, all install via existing allow-list grants.

---

**Report-back**: 60 npm globals + 1 630 venv packages + 18 plugins currently installed; top-10 recommended adds close the OSS supply-chain security stack + LLM red-team + local CI parity; top-3 installs are **trivy** (containers+IaC+repos breadth), **grype** (SBOM-driven SCA depth, pairs with installed syft), and **NVIDIA/garak** (LLM vuln scanner, W258r20 already cited as AUGMENT).
