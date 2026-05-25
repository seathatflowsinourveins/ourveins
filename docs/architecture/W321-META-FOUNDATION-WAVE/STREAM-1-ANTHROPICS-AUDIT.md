# W321-1 — Anthropic-Official SOTA Convergence Deep Audit

**Date**: 2026-05-19 · **Scope**: anthropics/{claude-code, skills, claude-plugins-official, claude-plugins-community, financial-services, healthcare, life-sciences, knowledge-work-plugins} + canonical `code.claude.com/docs` ingestion · **Mode**: audit-only

Source families consulted (≥6): deepwiki ask_question (4 repo queries) + ctx_fetch_and_index of 8 canonical doc pages (cc-settings/hooks/output-styles/cli-reference/sub-agents/mcp/plugins/skills) + ctx_search on indexed content + cross-reference against `Z:\claude-sota-installed\.claude\settings.json` + `installed_plugins.json` + CLAUDE.md.

---

## §1 — CC features NOT yet wired in our `settings.json`

### Hook event types — 18 documented; we wire 8

| Hook event | Wired | Gap-impact |
|---|---|---|
| `SessionStart` | ✓ | — |
| `PreToolUse` (Bash, Edit\|Write, MCP) | ✓ | — |
| `PostToolUse` | ✓ | — |
| `PostToolUseFailure` | ✓ | — |
| `PreCompact` | ✓ | — |
| `WorktreeRemove` | ✓ | — |
| `Notification` | ✓ | — |
| `TaskCompleted` | ✓ | — |
| **`SessionEnd`** | ✗ project-level | HIGH — only via ECC + codex plugins; project-level not wired. Lose end-of-session emit (cost-tracker, codex-final-review beyond plugin Stop) |
| **`UserPromptSubmit`** | ✗ | HIGH — could auto-inject mem-recall T6 / dispatch parallel-mandate notice / strip secrets from prompts pre-API |
| **`SubagentStart` / `SubagentStop`** | ✗ | HIGH — measure W269 parallel_ratio empirically (currently rolling-30d 0.5875 per W315-r2 Stream E, computed off-line; in-hook would make it live) |
| **`PermissionRequest` / `PermissionDenied`** | ✗ | MED — log auto-grant patterns to refine `permissions.allow` over time |
| **`PostCompact`** | ✗ | LOW — paired with existing PreCompact for full-cycle audit-trail |
| **`FileChanged`** | ✗ | MED — could auto-format / auto-lint when CC modifies certain paths (already partially via PostToolUse Edit/Write) |
| **`Setup`** | ✗ | LOW — fires on `claude --init` / maintenance; not the steady-state surface |
| **`SubagentStart` agent-type matchers** (`general-purpose`, `Explore`, `Plan`, custom names) | ✗ | HIGH — fan-out telemetry needs this |

### Output styles

CC 1.0.81 added native built-in output styles **`Explanatory`** + **`Learning`**. Our `settings.json:outputStyle:"Proactive"` is custom. **Conflict**: "Proactive" is not in the documented canonical set per `cc-output-styles` doc — it's a runtime-custom style. **Verdict**: keep custom (operator-curated for autonomous flow) but document the deviation in CLAUDE.md as a self-aware non-canonical setting.

### Env vars — 175+ documented, ~50 set

High-value env vars NOT currently set in our settings.json (extracted from CC CHANGELOG via deepwiki + `claude-cli-startup-flags.md`):

| Env var | Purpose | Should-set? |
|---|---|---|
| `CLAUDE_CODE_SIMPLE` | Strip skills + memory + custom agents + CLAUDE.md token counting | NO — we want full surface |
| `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC` | Suppress usage-metrics telemetry | OPTIONAL — privacy mode |
| `CLAUDE_CODE_DISABLE_UPDATER` | Block all auto-update paths | YES if pinning CC version for reproducibility |
| `CLAUDE_CODE_DISABLE_AUTOUPDATER` | Disable auto-updater specifically | partial overlap |
| `CLAUDE_CODE_FILE_READ_MAX_OUTPUT_TOKENS` | Override file-read token limit | YES if reading large files frequently |
| `CLAUDE_CODE_PLUGIN_GIT_TIMEOUT_MS` | Plugin marketplace `git clone` timeout | YES — Windows-Git-Bash sometimes slow |
| `CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD=1` | Load `CLAUDE.md` from `--additionalDirectories` paths | OPTIONAL — multi-root workflows |
| `CLAUDE_CODE_HIDE_CWD` | Hide working dir in startup logo | NO — operator wants visibility |
| `CLAUDE_CODE_CERT_STORE=bundled` | Use only bundled CAs | NO — keep system CA store |
| `CLAUDE_BASH_NO_LOGIN=true` | Skip bash login shell | YES — eliminates `/etc/profile` HOME re-pin source per W317-B (defense-in-depth with bash-home-pin shim) |
| `CLAUDE_EFFORT` | Effort for hooks + Bash tool commands | OPTIONAL — pair with `effortLevel` setting |
| `CLAUDE_CODE_ENABLE_TASKS` | Old durable-task system | NO — keep new system |
| `MAX_THINKING_TOKENS` | Override thinking budget | OPTIONAL — we have `effortLevel:xhigh` already |
| `USE_BUILTIN_RIPGREP=0` | Opt out of built-in ripgrep | NO — keep built-in (faster than system rg) |
| `CLAUDE_CODE_SHELL` | Override shell selection | OPTIONAL — we have `defaultShell:powershell` |
| `CLAUDE_CODE_DISABLE_BACKGROUND_TASKS` | Disable background tasks | NO — we use them heavily |

**Top-2 high-impact additions**: `CLAUDE_BASH_NO_LOGIN=true` (defense-in-depth for W317 MSYS HOME-pin) + `CLAUDE_CODE_PLUGIN_GIT_TIMEOUT_MS=60000` (Windows reliability).

---

## §2 — Plugins from anthropics marketplaces NOT installed

### `claude-plugins-official` — LSP plugins gap (12 of 13 missing)

We have `pyright-lsp` + `typescript-lsp`. Available but not installed:

| LSP plugin | Lang | Install command needed |
|---|---|---|
| `clangd-lsp` | C/C++ | requires `clangd` binary |
| `csharp-lsp` | C# | requires `csharp-ls` |
| `elixir-ls-lsp` | Elixir | requires `elixir-ls` |
| `gopls-lsp` | Go | requires `gopls` |
| `jdtls-lsp` | Java | requires `jdtls` |
| `kotlin-lsp` | Kotlin | requires `kotlin-lsp` |
| `lua-lsp` | Lua | requires `lua-language-server` |
| `php-lsp` | PHP | requires `intelephense` |
| `ruby-lsp` | Ruby | requires `ruby-lsp` |
| `rust-analyzer-lsp` | Rust | requires `rust-analyzer` (we already have rust-analyzer binary per W319-1) |
| `swift-lsp` | Swift | requires `sourcekit-lsp` |

**Recommendation**: install `rust-analyzer-lsp` (Rust toolchain present per W319-1); rest are JIT-installable when language-specific work surfaces. Don't bulk-install.

### `claude-plugins-official` — development-domain plugins (15+ available, 0 installed)

`adspirer-ads-agent`, `ai-firstify`, `amazon-location-service`, `astronomer-data-agents`, `atomic-agents`, `aws-serverless`, `brightdata-plugin`, plus more deepwiki cut off. **Most are domain-specific** (ads, AWS Serverless, Apache Airflow, scraping); unlikely fit for our research-runtime focus. **Candidate**: `atomic-agents` if we're building agent frameworks — but we have superpowers + agent-teams + agent-orchestration already.

### `anthropics/knowledge-work-plugins` — engineering subset (NEW high-value find)

This marketplace is **not currently in our `extraKnownMarketplaces`** despite being listed in CLAUDE.md. The `engineering` plugin in it offers slash commands `/standup`, `/review`, `/debug`, `/architecture`, `/incident`, `/deploy-checklist` + skills `code-review`, `incident-response`, `system-design`, `tech-debt`, `testing-strategy`, `documentation`. **Overlap analysis** vs our wshobson/agents + comprehensive-review + incident-response plugins:

- `/review` ≈ pr-review-toolkit ✓ have
- `/debug` ≈ debugging-toolkit ✓ have
- `/incident` ≈ incident-response ✓ have
- `tech-debt` — **NET-NEW** (no equivalent currently installed)
- `testing-strategy` — partial overlap with tdd-workflows
- `system-design` — partial overlap with comprehensive-review

**Verdict**: install `knowledge-work-plugins@engineering` for `tech-debt` skill; rest is duplicative.

### Vertical marketplaces (financial / healthcare / life-sciences)

100% domain-specific (LBO models, FHIR APIs, clinical trial protocols). **Skip** — no general-purpose fit.

---

## §3 — Skills gap

We have `example-skills` + `document-skills` from `anthropics/skills` ✓ (the canonical 2 of 3 marketplaces). The 3rd is `claude-api` (a single-plugin marketplace) — **available as a separate sub-plugin** at `anthropics/skills/claude-api/`. We have `claude-api` skill locally via `example-skills@anthropic-agent-skills` but the **standalone `claude-api` plugin (with its own eval harness)** is not installed. **Recommendation**: install `claude-api@anthropic-agent-skills` if heavy Claude SDK work surfaces.

---

## §4 — Open upstream `anthropics/claude-code` bugs affecting us

Deepwiki could not enumerate open issues (no GitHub API access from that surface). Known via CC CHANGELOG ingest + W315/W317 prior research:

| # | Description | Status | Workaround |
|---|---|---|---|
| #46915 | Plugin auto-update deletes old cache dir, breaks `${CLAUDE_PLUGIN_ROOT}` mid-session | OPEN (verified 2026-04-12 per CLAUDE.md cardinal-rule-2 exception) | `.claude/hooks/context-mode-cache-heal.mjs` (R2 ≤2 KB shim) ✓ wired |
| (no #) | `claude doctor` hangs 30s exit=124 | OPEN (W312-A.2 since W312) | use `/plugin status` instead |
| (no #) | `CLAUDE_CODE_PROJECT_DIR` state-redirect silently broken in 2.1.144 (JSONL written in-tree) | OPEN | use in-tree `.claude/session-data/` |
| W317-discovered | CC injects `CLAUDE_PLUGIN_ROOT` POSIX-form `/z/...` on Win32+Git-Bash | OPEN — PR draft staged in W317 Stream E | `plugin-hook-bootstrap.js` MSYS normalize + BASH_ENV shim ✓ wired |

**CHANGELOG counter-evidence**: many Windows/Git-Bash issues were FIXED in CC 1.0.x → 2.1.144 (BashTool EINVAL, hooks silently failing on cmd.exe→Git-Bash, MSYS2 stdout discarded, CLAUDE_PLUGIN_ROOT resolution paths). Our runtime is on the post-fix side; the remaining open items are runtime-specific edge cases.

---

## §5 — Stale references in our CLAUDE.md / docs

CLAUDE.md cites stable HEAD SHAs from CCBP / ECC / wshobson; these are W315 Stream B re-verified. **No stale-cite findings this audit** beyond what W315-r2 / W314 already documented. The cc-docs URL pattern in CLAUDE.md uses `code.claude.com/docs/en/` and `docs.anthropic.com/en/docs/claude-code/` interchangeably — both resolve, but `code.claude.com/docs` is the now-canonical surface per the Mintlify-hosted doc set (CC plugin pages all redirect there). **Minor**: standardize CLAUDE.md cite-stems on `code.claude.com/docs/en/` for the active surfaces; keep `docs.anthropic.com` only for legacy doc-cites.

---

## §6 — Doc-vs-config conflicts

| # | Conflict | Severity | Resolution |
|---|---|---|---|
| C1 | `outputStyle: "Proactive"` is custom (not in canonical Explanatory/Learning set) | LOW | document deviation in CLAUDE.md as operator-curated; not a violation |
| C2 | `disabledMcpjsonServers: []` empty even though `perplexity` may be redundant with Opus 4.7 native WebSearch (per operator's `sequential-thinking` precedent) | LOW | operator-decision for next wave |
| C3 | `permissions.allow` lacks `Bash(uvx *)` even though we install via `uv tool install *` (close but different command) — uvx is the run-form | MED | add `Bash(uvx *)` to permissions.allow |
| C4 | We use `Bash(codex *)` permission but the codex plugin's full namespace is `Bash(codex *)` covering subcommands — verified OK | n/a | none |
| C5 | `defaultMode: "bypassPermissions"` is the highest-trust mode per `cc-settings` docs; combined with our deny-list this is intentional but worth documenting in CLAUDE.md | LOW | document explicitly |
| C6 | Hook subagent `tools` field allows whitelisting but our `.claude/agents/*.md` use full-toolset (default) — per `cc-sub-agents` docs, narrower tool whitelist improves safety | MED | per-agent tool-narrowing pass W321+ |
| C7 | `cleanupPeriodDays: 60` overrides docs default `30` — operator-intent; document | LOW | already in settings.json comment |

---

## Report-back

(1) **Features missing** from canonical Anthropic surface: 6 hook event types unwired (SessionEnd at project level, UserPromptSubmit, SubagentStart/Stop, PermissionRequest, PostCompact, FileChanged) + 2 high-impact env vars unset (`CLAUDE_BASH_NO_LOGIN=true`, `CLAUDE_CODE_PLUGIN_GIT_TIMEOUT_MS=60000`); custom `outputStyle:"Proactive"` is operator-curated non-canonical (documented deviation, not violation). (2) **Plugins installable that aren't**: 11 LSP plugins (only `rust-analyzer-lsp` worth installing given existing toolchain) + `anthropics/knowledge-work-plugins@engineering` for the NET-NEW `tech-debt` skill (other skills duplicate existing installs). (3) **Most-critical doc-vs-config conflict**: **C3** — `permissions.allow` is missing `Bash(uvx *)` despite us using uvx-based install for basic-memory and recommending it for W319-1 SOTA tooling; without this grant, every `uvx` invocation prompts. Add `Bash(uvx *)` to `permissions.allow`.