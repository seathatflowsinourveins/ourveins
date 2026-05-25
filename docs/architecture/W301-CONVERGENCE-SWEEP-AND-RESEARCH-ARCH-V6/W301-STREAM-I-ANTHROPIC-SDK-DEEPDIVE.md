# W301 Stream I — Anthropic Official SDK Deep-Dive + Runtime Gap Audit

**Wave**: W301.H Stream I | **Date**: 2026-05-18 | **Budget**: T3 ($0.50 cap)
**File ownership**: this file ONLY; W301-OPERATOR-ACTIONS-FEATURE-GAPS owned by Stream G.
**Methodology**: 3-angle convergence per sca-v5 — (A) canonical anthropic docs, (B) practitioner blog field reports, (C) DeepWiki source-code Q&A. Phase-5 Gate-1: every claim mechanically re-fetched at session timestamp 2026-05-19 01:30 UTC.

---

## §1 — Official `anthropics` Org Repo Enumeration

GitHub query `org:anthropics` returned **64 public repos total** via `mcp__plugin_everything-claude-code_github__search_repositories` (paged 50+14). Star counts were not returned by the MCP (all rows show `0`); `pushed_at` and `description` ARE reliable signals. Last-push freshness ≤ 2026-05-19 indicates active. Repos relevant to this runtime, grouped by family:

### §1.1 — SDK family (Python/TS/Go/Java/Ruby/PHP/C#)

| Repo | Pushed | Primary purpose | Installed here? |
|---|---|---|---|
| `anthropics/anthropic-sdk-python` | 2026-05-15 | Direct Claude API access (Messages, beta features, Files, Managed Agents) | **YES** — `anthropic==0.102.0` in `Z:/venvs/claude` (pip show 2026-05-19) |
| `anthropics/anthropic-sdk-typescript` | 2026-05-18 | TS twin of above | **YES** — `@anthropic-ai/sdk@0.95.1` global (npm 2026-05-19) |
| `anthropics/anthropic-sdk-go` | 2026-05-13 | Go SDK | NO |
| `anthropics/anthropic-sdk-java` | 2026-05-13 | Java SDK | NO |
| `anthropics/anthropic-sdk-ruby` | 2026-05-13 | Ruby SDK | NO |
| `anthropics/anthropic-sdk-csharp` | 2026-05-13 | C# SDK | NO |
| `anthropics/anthropic-sdk-php` | 2026-05-13 | PHP SDK | NO |
| `anthropics/anthropic-bedrock-python` / `-typescript` | 2024-02-* | **Legacy** Bedrock-specific wrappers; subsumed by `anthropic[bedrock]` extra (per `platform.claude.com/docs/en/api/sdks/python` 2026-05-19). | N/A |

### §1.2 — Claude Code orchestrator + Agent SDK family

| Repo | Pushed | Primary purpose | Installed here? |
|---|---|---|---|
| `anthropics/claude-code` | 2026-05-19 | The CLI orchestrator (this runtime IS this binary). | **YES** — runtime |
| `anthropics/claude-agent-sdk-python` | 2026-05-19 | Python library: programmatic claude-code agent loop. **88 releases**, latest v0.1.81 (2026-05-11); 6,844 ★ per exa GitHub-stats `https://github.com/anthropics/claude-agent-sdk-python` 2026-05-19. | **PARTIAL** — `claude-agent-sdk==0.1.81` in venv; **also has stale 0.1.33 at user-site `C:/Users/42/AppData/Roaming/Python/Python314/site-packages`** (pip-resolution drift risk). |
| `anthropics/claude-agent-sdk-typescript` | 2026-05-19 | TS twin. Requires claude-code CLI installed (spawns native binary per DeepWiki). | **YES** — `@anthropic-ai/claude-agent-sdk@0.2.133` global |
| `anthropics/claude-agent-sdk-demos` | 2026-03-13 | Reference demos. | N/A (study repo) |
| `anthropics/agent-sdk-workshop` | 2026-03-05 | Workshop tutorial. | N/A |
| `anthropics/claude-code-action` | 2026-05-19 | GitHub Action wrapper around claude-code. | N/A — runtime is local Win11 |
| `anthropics/claude-code-base-action` | 2026-05-19 | Mirror of base-action subdir. | N/A |
| `anthropics/claude-code-security-review` | 2026-02-11 | Security-review GHA. | N/A |

### §1.3 — Skills / Plugins / Extensions

| Repo | Pushed | Primary purpose | Installed here? |
|---|---|---|---|
| `anthropics/skills` | 2026-05-17 | Public "Agent Skills" repo (origin of `anthropic-agent-skills` marketplace + `example-skills` / `document-skills`). | **YES** — present at `.claude/plugins/cache/anthropic-agent-skills/{document-skills,example-skills}/`. W301 row-19 = T1-INSTALLED. |
| `anthropics/claude-plugins-official` | 2026-05-19 | Official Anthropic-managed plugin directory. | NEEDS-AUDIT (see §4). |
| `anthropics/claude-plugins-community` | 2026-05-13 | Community plugin mirror (read-only). | likely-used as marketplace src |
| `anthropics/knowledge-work-plugins` | 2026-05-18 | Knowledge-worker plugin set. | NO |
| `anthropics/claude-for-legal` | 2026-05-18 | Legal-workflow plugins. | N/A |
| `anthropics/life-sciences` | 2026-05-08 | Life-sciences marketplace. | N/A |
| `anthropics/financial-services` | 2026-05-18 | Finance plugins. | N/A |
| `anthropics/dxt` → renamed `anthropics/mcpb` | 2025-06-26 (last) | Desktop-Extension / MCP-Bundle (`.mcpb`) packaging spec — **for Claude Desktop, NOT Claude Code**. See §3.4. | N/A — this runtime IS Claude Code |

### §1.4 — Education, tooling, support

`anthropics/anthropic-cookbook` (now `claude-cookbooks`, pushed 2026-05-18) · `anthropics/courses` (2025-11-13) · `anthropics/prompt-eng-interactive-tutorial` (2026-03-01) · `anthropics/anthropic-cli` ("The CLI for the Claude API", 2026-05-13, distinct from claude-code) · `anthropics/devcontainer-features` · `anthropics/homebrew-claude` / `-tap` · `anthropics/anthropic-tokenizer-typescript` (2024-03-04, stale) · `anthropics/claude-quickstarts` (2026-05-13) · `anthropics/cwc-workshops` / `cwc-long-running-agents`.

### §1.5 — Research / paper repos (out of scope)

`hh-rlhf`, `ConstitutionalHarmlessnessPaper`, `DecompositionFaithfulnessPaper`, `sleeper-agents-paper`, `sycophancy-to-subterfuge-paper`, `toy-models-of-superposition`, `rogue-deploy-eval`, `political-neutrality-eval`, `PySvelte`, `attribution-graphs-frontend`, `headvis`, `model-cards`, `claude-constitution`, `claudes-c-compiler`, `original_performance_takehome`, `anthropic-retrieval-demo`, `claude-code-monitoring-guide`, `evals`, `s5cmd`, `redis-py`, `blobfile`, `buffa`, `connect-rust`, `tailscale-hint-extension`, `riv2025-long-horizon-coding-agent-demo`, `claude-ai-mcp`, `claude-desktop-buddy`, `anthropic-tools` (deprecated 2024).

---

## §2 — Per-SDK API Surface

### §2.1 — `claude-code` CLI (already the orchestrator)

Under-utilized features owned by Stream G — see `W301-OPERATOR-ACTIONS-FEATURE-GAPS.md` (13 rows). Not duplicated here per file-ownership contract.

### §2.2 — `claude-agent-sdk-python` (v0.1.81)

Value-add over bare `anthropic` SDK (DeepWiki `anthropics/claude-agent-sdk-python` ask_question 2026-05-19 + GitHub release notes `https://github.com/anthropics/claude-agent-sdk-python/releases/tag/v0.1.81`):

1. **In-process custom tools (SDK MCP servers)** — `@tool` decorator + `create_sdk_mcp_server()`. Tools run in the same Python process — no IPC, type-safe, direct access to host app state. Pattern: `claude-agent-sdk-python/README.md` §"Custom Tools".
2. **Lifecycle hooks as Python callables** — `PreToolUse`, `PostToolUse`, `Stop`, `SessionStart`, `SessionEnd`, `UserPromptSubmit`, `SubagentStart/Stop`, `PermissionRequest`. Wired via `HookMatcher(matcher="Bash", hooks=[fn])`.
3. **Stateful session client** — `ClaudeSDKClient` async-context for multi-turn dialog + interrupts + dynamic message injection; `query()` is the one-shot helper.
4. **Session management** — `fork_session()`, `delete_session()`, `rename_session()`, `tag_session()`, `list_sessions()` (0.1.46+); `enable_file_checkpointing` + `rewind_files()` to revert workspace.
5. **CLI bundling** — wheels carry a pinned `claude-code` CLI version (current bundle: 2.1.139). No separate install.

Recent shipped features (CHANGELOG: 0.1.74–0.1.81): `include_hook_events` stream events; `strict_mcp_config` for fully-deterministic MCP sets; `defer` hook decision + `DeferredToolUse` round-trip; `add_mcp_server()` / `remove_mcp_server()` for runtime MCP control; `xhigh` effort level (Opus-4.7-specific); `EffortLevel` type export; auto-cleanup of orphan `claude` subprocesses on parent exit.

### §2.3 — `anthropic-sdk-python` (v0.102.0)

DeepWiki + `https://platform.claude.com/docs/en/api/sdks/python` 2026-05-19:

- **Beta-feature catalog** via `AnthropicBetaParam`: `prompt-caching-2024-07-31`, `computer-use-2025-01-24`, `files-api-2025-04-14`, `context-management-2025-06-27`, `skills-2025-10-02`, `managed-agents-2026-04-01`, `dev-full-thinking-2025-05-14`, `interleaved-thinking-2025-05-14`, `oauth-2025-04-20`.
- **Tool use** generally available (no beta header).
- **Files API** under `client.beta.files`: upload/list/retrieve_metadata/download/delete.
- **Streaming** via `client.messages.stream()` (context-mgr) or `stream=True` (iterable).
- **Batch processing** via `client.messages.batches.create()` returning `.jsonl` results.
- **OAuth flow** via `AccessTokenAuth` (`oauth-2025-04-20`); supports Workload Identity Federation + auth profiles (added 0.98.0).
- **Managed Agents** under `client.beta.agents` / `.environments` / `.sessions.events.stream()` — server-side agent loop, REST API contract. Requires beta header `managed-agents-2026-04-01` (verified `platform.claude.com/docs/en/managed-agents/quickstart` 2026-05-19).
- **Provider extras**: `anthropic[bedrock]`, `anthropic[vertex]`, `anthropic[aws]`, base includes Foundry; `anthropic[aiohttp]` for concurrency.

### §2.4 — `claude-agent-sdk-typescript` (@anthropic-ai/claude-agent-sdk 0.2.133)

DeepWiki ask 2026-05-19: requires `claude-code` CLI; spawns native binary subprocess. Adds: `Session` interface + `SessionStore` (S3/Postgres/Redis mirrors); `Task*` system (`TaskCreate`/`TaskGet`/`TaskUpdate`/`TaskList`) replacing deprecated `TodoWrite`; `startup()` + `WarmQuery` pre-warming; deep MCP integration with proxied-server auto-reconnect + per-tool permission policies; `skills` option for granular session-level skill loading.

### §2.5 — `anthropics/dxt` ⇒ renamed `anthropics/mcpb` (Desktop Extension / MCP Bundle)

DeepWiki + `https://github.com/anthropics/mcpb/` 2026-05-19: **`.dxt` files renamed to `.mcpb`**, CLI `dxt` → `mcpb`, package `@anthropic-ai/dxt@0.2.6` (last) → `@anthropic-ai/mcpb@2.1.2` (current, npm view 2026-05-19). MCPB = zip archive + `manifest.json` for **single-click local-MCP-server install in Claude Desktop on macOS/Windows** (not Claude Code; `compatibility.claude_desktop` semver). Two GitHub bug threads — #28775 ("DXT not available in Code tab") + #39674 ("DXT extension tools not permitted in Co-work") — confirm DXT/MCPB tools do NOT auto-flow into Claude Code subprocesses, so the format is **not applicable to this runtime**.

---

## §3 — Multi-Angle Convergence (Value-add Synthesis)

**Angle A (Anthropic canonical docs)** · **Angle B (field reports)** · **Angle C (source-code DeepWiki)** converge as follows:

| SDK | A (docs say) | B (field says) | C (source says) | Verdict |
|---|---|---|---|---|
| `claude-agent-sdk-python` | "Same agent loop that powers Claude Code, programmable in Python" (`docs.claude.com/en/docs/agent-sdk/python` 2026-05-19) | Autoolize 2026-05-05 playbook (40 prod agents): subagent decomposition cuts tokens 30-45%; hooks "basically non-negotiable" for prod; SDK is "Alpha on PyPI" but "stable for tool-using single/shallow-multi-agent workloads"; UCIS issue #653 cites 4-agent docker fleet running daily on v0.1.48 | DeepWiki: `ClaudeAgentOptions` wraps CLI flags; `@tool` + `create_sdk_mcp_server` give in-process MCP; hooks are `HookMatcher`-routed | **MUST-INSTALL** for programmatic agent fan-out beyond `Agent` tool; already partially installed → just clean version drift |
| `anthropic-sdk-python` | Direct API + Managed Agents + beta features | Standard Python practice; aiohttp extra for concurrency | DeepWiki confirms OAuth flow + Files API + Managed Agents v1 | **ALREADY INSTALLED**; nice-to-have to upgrade to current minor + audit beta-flag usage |
| `claude-agent-sdk-typescript` | TS twin | Used by VS-Code-style integrations | DeepWiki confirms spawns native CLI | **ALREADY INSTALLED**; no action needed |
| `dxt` / `mcpb` | "for AI desktop applications like Claude Desktop"  | GitHub bugs #28775/#39674 confirm Claude Code does NOT honor DXT/MCPB | DeepWiki + MANIFEST.md: `compatibility.claude_desktop` semver only | **NOT-APPLICABLE** to this runtime |
| `anthropics/claude-quickstarts` | Reference apps for Claude API | n/a | n/a | nice-to-have / CITE-ONLY |
| `anthropics/claude-cookbooks` (nee anthropic-cookbook) | Recipes | n/a | n/a | CITE-ONLY |
| `anthropics/courses` + `prompt-eng-interactive-tutorial` | Education | n/a | n/a | CITE-ONLY |
| `anthropic-cli` (`ant`) | "The CLI for the Claude API" (Managed Agents helper) | Used in quickstart bash blocks | n/a | nice-to-have for ad-hoc API ops |

---

## §4 — Runtime Gap Audit

**Probe results (mechanically verified 2026-05-19 01:25 UTC):**

| Component | Status | Evidence |
|---|---|---|
| Python `anthropic` 0.102.0 | INSTALLED | `pip show anthropic` in `Z:/venvs/claude/Scripts/pip.exe` |
| Python `claude-agent-sdk` 0.1.81 (venv) | INSTALLED | same |
| Python `claude-agent-sdk` 0.1.33 (user-site) | **DRIFT** | second pip show resolves `C:\Users\42\AppData\Roaming\Python\Python314\site-packages` v0.1.33 — if a script runs outside the venv it grabs the stale copy |
| Python `claude-code-sdk` 0.0.25 | INSTALLED (legacy) | npm/pip; superseded by `claude-agent-sdk` per CHANGELOG "Migrating from Claude Code SDK" |
| Python `langchain-anthropic` 1.4.3 | INSTALLED | pip list |
| NPM `@anthropic-ai/sdk@0.95.1` | INSTALLED global | `npm list -g --depth=0` |
| NPM `@anthropic-ai/claude-agent-sdk@0.2.133` | INSTALLED global | same |
| NPM `@anthropic-ai/mcpb@2.1.2` (or `dxt@0.2.6`) | **NOT INSTALLED** | `npm view` returns the published version but `npm list -g` shows no match — correct since MCPB targets Claude Desktop |
| `anthropics/skills` (anthropic-agent-skills marketplace) | INSTALLED | `.claude/plugins/cache/anthropic-agent-skills/{document-skills,example-skills}/` + `.claude/plugins/marketplaces/anthropic-agent-skills/` (W301 row-19 T1-INSTALL verified) |
| `anthropics/claude-plugins-official` | **NEEDS-AUDIT** | not visible in plugin cache directory tree but referenced from `known_marketplaces.json` — could be the same content under a different folder name. Operator action: `claude plugins list \| grep -i anthropic` |
| `anthropics/claude-plugins-community` | NOT-DIRECTLY-VISIBLE | similar |
| `anthropics/dxt`-`mcpb` | NOT INSTALLED & NOT APPLICABLE | this runtime is Claude Code, not Claude Desktop (see §3) |

**Two ledger findings:**
1. **DRIFT** — User-site Python 3.14 has stale `claude-agent-sdk 0.1.33`. Any script run with bare `python` (vs `Z:/venvs/claude/Scripts/python`) will resolve the stale copy. **Operator fix**: `python -m pip uninstall claude-agent-sdk` against the user-site Python.
2. **AUDIT** — `claude-plugins-official` install state not confirmed via filesystem alone; need `claude plugin list` to verify.

---

## §5 — Top-3 ADOPT-NOW Recommendations

Ranked by `value × ease-of-pilot`. sca-v5 lite-score uses key dims D1 (license), D3 (harness-fit), D4 (CC-pathway), D5 (typed-evidence), D6 (authority-weight; anthropic-canonical = 5).

### Recommendation #1 — Resolve `claude-agent-sdk` Python user-site drift (T1, EASIEST FIX)

- **Tier**: **T1 INSTALL** (already installed; this is hygiene, not new adoption).
- **Effort**: 5 min. **Smoke-test**: `python -c "import claude_agent_sdk; print(claude_agent_sdk.__version__)"` must report `0.1.81` from BOTH the venv interpreter (`Z:/venvs/claude/Scripts/python`) and the user-site interpreter; if user-site still shows 0.1.33, run `python -m pip uninstall -y claude-agent-sdk` outside the venv.
- **Rollback**: `pip install claude-agent-sdk==0.1.33` against user-site (re-pins old).
- **sca-v5 lite**: D1=5 (MIT) · D3=5 (already wired) · D4=5 (native pathway) · D5=5 (pip show probe) · D6=5 (anthropic-canonical) ⇒ pass.

### Recommendation #2 — Pilot `claude-agent-sdk-python` in-process MCP for ONE local script (T1, HIGH VALUE)

- **Tier**: **T1 INSTALL** (SDK is on disk; this is adoption of its capability surface).
- **Adoption surface**: pick the smallest script in `tools/` that currently spawns an external Python subprocess for a single deterministic action; rewrite as an `@tool`-decorated function fed to `create_sdk_mcp_server(...)` per `claude-agent-sdk-python/README.md` §"Custom Tools" (verbatim contract verified DeepWiki 2026-05-19).
- **Effort**: ~2-4 hours for the first pilot (Autoolize playbook 2026-05-05 §"Start small": "30 prompt unit tests + 10 property tests" before fan-out).
- **Smoke-test**: `python -m my_pilot_module` runs the agent loop end-to-end with the in-process MCP server; verify `mcp__<name>__<tool>` shows up in the model's tool list and a call returns expected output.
- **Rollback**: delete the new module; existing CLI flow is unaffected (in-process MCP coexists with external MCPs per "Mixed Server Support").
- **sca-v5 lite**: D1=5 (MIT) · D3=4 (cardinal-rule-2 still applies; pilot is Python script, not a settings.json hook) · D4=5 · D5=5 (Autoolize field report + GitHub issue #653 + README) · D6=5 ⇒ pass.

### Recommendation #3 — Install + smoke-test `anthropic[aiohttp]` extra for high-concurrency probes (T2, LOW-RISK)

- **Tier**: **T2 VENDOR-FORK** is overkill; this is just an **extras flag**. Treat as **T1 INSTALL** of `anthropic` extra (not a fork).
- **Why**: many W288-W301 streams fan out 4-8 concurrent web fetches via the codex companion or context-mode `ctx_fetch_and_index`. Bare `httpx` async is fine, but `pip install "anthropic[aiohttp]"` switches the SDK HTTP backend to aiohttp for ~30-40% lower contention under high QPS (`platform.claude.com/docs/en/api/sdks/python` 2026-05-19 §"Using aiohttp for better concurrency").
- **Effort**: 1 min. **Smoke-test**: a 16-prompt batch via `anthropic.AsyncAnthropic()` with `http_client=aiohttp_client` — observe wall-clock vs the default.
- **Rollback**: `pip uninstall aiohttp` (leaves anthropic SDK on httpx default).
- **sca-v5 lite**: D1=5 · D3=4 · D4=4 (not a CC-pathway feature; it benefits Python scripts that talk to the API directly, e.g. eval harness) · D5=4 (canonical doc only — no third-party benchmark in this stream's evidence pack; benchmark would be a Tier-3 follow-up) · D6=5 ⇒ pass with reserved D5.

---

## §6 — Phantom-Feature Contamination Check (Gate-4)

Every feature-existence claim above was mechanically probed. Findings:

| Claim | Probe | Verdict |
|---|---|---|
| `create_sdk_mcp_server` + `@tool` exist in claude-agent-sdk-python | DeepWiki ask + GitHub README highlight + PyPI v0.1.81 docs | **REAL** |
| `HookMatcher`, `PreToolUse/PostToolUse/Stop/SessionStart/UserPromptSubmit/SubagentStart/PostToolUseFailure` hooks | Autoolize 2026-05-05 + Exa hits + DeepWiki | **REAL** (note: `PostToolUseFailure` exists at SDK level — Stream G owns the CC settings.json wiring gap) |
| `include_hook_events` + `strict_mcp_config` + `defer` decision + `add_mcp_server` / `remove_mcp_server` | GitHub release notes 0.1.74-0.1.81 | **REAL** |
| `xhigh` effort level + `EffortLevel` type | GitHub release notes 0.1.81 (PR #951) | **REAL** |
| `anthropic.beta.agents` + `client.beta.sessions.events.stream` + `managed-agents-2026-04-01` header | `platform.claude.com/docs/en/managed-agents/quickstart` 2026-05-19 | **REAL** |
| `oauth-2025-04-20` + `AccessTokenAuth` + Workload Identity Federation | DeepWiki anthropic-sdk-python | **REAL** |
| `anthropic[aiohttp]` extra | `platform.claude.com/docs/en/api/sdks/python` §"Using aiohttp" | **REAL** |
| `mcpb` rename + `@anthropic-ai/mcpb@2.1.2` | `npm view @anthropic-ai/mcpb version` returned `2.1.2`; `npm view @anthropic-ai/dxt version` returned `0.2.6` (legacy) | **REAL** |
| DXT/MCPB applies to Claude Code | GitHub issues #28775 + #39674 | **REFUTED** (the format does NOT auto-flow into Claude Code — this is a non-applicability finding, not a phantom claim) |
| `anthropics/skills` T1-INSTALLED in this runtime | `dir .claude/plugins/cache/anthropic-agent-skills/` returned 2 subdirs | **REAL** |

**Phantom-feature contamination count: 0.** One non-applicability finding (DXT/MCPB ↛ Claude Code) is correctly flagged in §3 and §4 as NOT-APPLICABLE rather than propagated as an adoption claim.

One known-unknown: `claude-plugins-official` install state requires runtime probe `claude plugin list` (filesystem alone is ambiguous) — flagged in §4 as NEEDS-AUDIT, not as a phantom.

---

## §7 — Cite Index

1. `https://github.com/anthropics/claude-agent-sdk-python` (DeepWiki + Exa, 2026-05-19) — SDK feature list.
2. `https://github.com/anthropics/claude-agent-sdk-python/releases/tag/v0.1.81` (Exa, 2026-05-11 publish) — CHANGELOG.
3. `https://pypi.org/project/claude-agent-sdk/0.1.81/` (Exa, 2026-05-19) — PyPI metadata.
4. `https://docs.claude.com/en/docs/agent-sdk/python` (Exa, 2026-05-19) — Agent SDK vs CLI vs Managed Agents tables.
5. `https://platform.claude.com/docs/en/api/sdks/python` (Exa, 2026-05-19) — Python SDK + aiohttp extra + provider extras.
6. `https://platform.claude.com/docs/en/managed-agents/overview` + `/quickstart` + `/sessions` (Exa, 2026-05-19) — Managed Agents v1 surface + `managed-agents-2026-04-01` header.
7. `https://autoolize.com/blog/claude-agent-sdk-production-playbook/` (Exa, 2026-05-05) — 40-production-agent field report.
8. `https://aiworkflowlab.dev/article/how-to-build-production-ai-agents-claude-agent-sdk-...` (Exa, 2026-03-26) — production-pattern guide.
9. `https://github.com/anthropics/claude-agent-sdk-python/issues/653` (Exa, 2026-03-07) — UCIS 4-agent prod feedback.
10. `https://claude.com/docs/connectors/building/mcpb` (Exa, 2026-05-19) — MCPB build doc.
11. `https://github.com/anthropics/mcpb/` (Exa, 2026-05-19) — DXT→MCPB rename notice + manifest spec.
12. `https://github.com/anthropics/claude-code/issues/28775` + `/issues/39674` (Exa, 2026-02-25 + 2026-03-27) — DXT/MCPB not flowing into Claude Code.
13. DeepWiki ask_question results: `anthropics/claude-agent-sdk-python`, `anthropics/anthropic-sdk-python`, `anthropics/claude-agent-sdk-typescript`, `anthropics/dxt` (2026-05-19).
14. Mechanical probes (2026-05-19 01:25 UTC):
    - `Z:/venvs/claude/Scripts/pip show anthropic` ⇒ 0.102.0
    - `Z:/venvs/claude/Scripts/pip show claude-agent-sdk` ⇒ 0.1.81 (venv)
    - `pip show claude-agent-sdk` (no path) ⇒ 0.1.33 at user-site (drift)
    - `npm list -g --depth=0` ⇒ `@anthropic-ai/sdk@0.95.1` + `@anthropic-ai/claude-agent-sdk@0.2.133`
    - `npm view @anthropic-ai/mcpb version` ⇒ `2.1.2`
    - `npm view @anthropic-ai/dxt version` ⇒ `0.2.6`
    - `dir Z:/claude-sota-installed/.claude/plugins/cache/anthropic-agent-skills/` ⇒ 2 subdirs present.
