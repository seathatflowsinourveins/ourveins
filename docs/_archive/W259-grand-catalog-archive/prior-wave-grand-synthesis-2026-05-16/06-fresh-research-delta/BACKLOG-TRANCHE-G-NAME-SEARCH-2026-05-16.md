# BACKLOG TRANCHE G — Name-Search Re-Probe + 5-Deep-Probe (2026-05-16)

> **Purpose**: Re-probe repos missed by topic-tag-based discovery in Tranches A–E using NAME-SEARCH (`in:name`, `in:user`) instead of `topic:` queries. Per Tranche D non-finding: Aider/Codeium/Cody-proper were missed by `topic:` queries.
>
> **Method**: GraphQL+REST name-searches via GitHub MCP, fetched 2026-05-16 (rate-limited; serialized). Live counts as-of probe time.
>
> **D1–D8 SOTA scoring axes** (per Tranche A/B/C convention):
> - **D1** Star ≥10k OR clearly-elite niche, **D2** Last-commit ≤90 days, **D3** Permissive license OR documented intent-trial, **D4** Production-readiness, **D5** Distinct value vs incumbent already-installed, **D6** Active maintenance (≥1 commit/month), **D7** Composable (CLI/SDK/MCP), **D8** Operational unit-economics fit.

---

## §A — Name-Search Results (30+ rows)

| # | Repo Name Searched | Found? | Actual Repo | ★ | Last-Commit | License | D1–D8 Score | Proposed Layer | Verdict |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `Aider-AI/aider` | YES | `Aider-AI/aider` | 44,891 | 2026-05-16 | Apache-2.0 | 8/8 | L40 multi-model orchestration / CLI coding agent | **TIER-1-DISCOVERED-IN-TRANCHE-G** (Tranche D missed it via topic search) |
| 2 | `hotovo/aider-desk` | YES | `hotovo/aider-desk` | 1,218 | 2026-05-16 | Apache-2.0 | 5/8 | desktop UI wrapper | DEFER (lower-priority skin) |
| 3 | `MatthewZMD/aidermacs` | YES | `MatthewZMD/aidermacs` | 895 | 2026-04-28 | Apache-2.0 | 5/8 | Emacs adapter | DEFER (editor-binding adapter; non-CC-runtime) |
| 4 | `tninja/aider.el` | YES | `tninja/aider.el` | 675 | 2026-01-10 | Apache-2.0 | 4/8 | Emacs adapter (older) | DEFER |
| 5 | `lee88688/aider-composer` | YES | `lee88688/aider-composer` | 445 | 2025-03-20 | Apache-2.0 | 3/8 | VSCode extension | DEFER |
| 6 | `Exafunction/codeium` | YES | `Exafunction/codeium` (issue-tracker only; no source code) | 279 | 2026-01-26 | NOASSERTION | 1/8 | issue tracker only — closed-source CC competitor | **REJECT** (closed-source product issue tracker, not installable runtime) |
| 7 | `Exafunction/codeium.el` | YES | `Exafunction/codeium.el` | 632 | 2025-06-27 | MIT | 3/8 | Emacs adapter for closed-source codeium API | REJECT (depends on closed-source API) |
| 8 | `Exafunction/codeium-chrome` | YES | `Exafunction/codeium-chrome` | 135 | 2024-11-12 | MIT | 2/8 | Chrome extension | REJECT (stale + closed-API dependent) |
| 9 | `Exafunction/codeium-react-code-editor` | YES | `Exafunction/codeium-react-code-editor` | 273 | 2024-04-24 | MIT | 2/8 | React component | REJECT (stale + closed-API dependent) |
| 10 | `Exafunction/codeium-parse` | YES | `Exafunction/codeium-parse` (ARCHIVED) | 132 | 2024-10-10 | MIT | 1/8 | tree-sitter parsing tool | REJECT (archived) |
| 11 | `sourcegraph/cody-public-snapshot` | YES (ARCHIVED) | `sourcegraph/cody-public-snapshot` | 3,795 | 2025-08-01 | Apache-2.0 | 3/8 | last open snapshot of Cody | **REJECT** (archived 2025; Cody is now closed-source — public-snapshot is end-of-life) |
| 12 | `sourcegraph/cody-vs` | YES | `sourcegraph/cody-vs` | 84 | 2026-05-13 | NOASSERTION | 2/8 | VS extension | REJECT (depends on closed-source backend) |
| 13 | `sourcegraph/emacs-cody` | YES | `sourcegraph/emacs-cody` | 76 | 2026-05-08 | Apache-2.0 | 2/8 | Emacs adapter | REJECT (depends on closed-source backend) |
| 14 | `sourcegraph/gptel-cody` | YES | `sourcegraph/gptel-cody` | 10 | 2024-11-11 | Apache-2.0 | 1/8 | gptel integration | REJECT (stale) |
| 15 | `sourcegraph/cody-embeddings-discord-bot` | YES (ARCHIVED) | — | 7 | 2025-02-21 | Apache-2.0 | 0/8 | archived | REJECT |
| 16 | `TabbyML/tabby` | YES | `TabbyML/tabby` | 33,522 | 2026-03-02 | Other (custom) | 6/8 | L30 self-hosted code-completion server (Rust) | **TIER-2-OPTIONAL** (self-hosted IDE-completion server; orthogonal to CC runtime — would compete with claude-code/inline, not replace it) |
| 17 | `TabbyML/registry-tabby` | YES | `TabbyML/registry-tabby` | 40 | 2025-05-22 | None | 1/8 | model registry | DEFER (sub-component of #16) |
| 18 | `TabbyML/vim-tabby` | YES | `TabbyML/vim-tabby` | 116 | 2025-01-13 | Apache-2.0 | 2/8 | Vim adapter | DEFER |
| 19 | `TabbyML/homebrew-tabby` | YES | `TabbyML/homebrew-tabby` | 7 | 2026-02-09 | None | 1/8 | package manifest | DEFER |
| 20 | `continuedev/continue` | YES | `continuedev/continue` | 33,221 | 2026-05-15 | Apache-2.0 | 7/8 | L40 multi-IDE coding agent + CI gates | **TIER-2-OPTIONAL** (overlap with CC; useful as cross-IDE adapter for VSCode/JetBrains/CLI) |
| 21 | `continuedev/continuedev-packages` | YES | — | 3 | 2025-05-06 | None | 1/8 | misc packages | DEFER |
| 22 | `continuedev/togetherai-continue-hub` | YES | — | 5 | 2026-05-16 | None | 1/8 | hub block | DEFER |
| 23 | `continuedev/continue-hub-template` | YES | — | 2 | 2025-04-10 | None | 1/8 | template | DEFER |
| 24 | `continuedev/ollama-continue-hub` | YES | — | 0 | 2025-10-02 | None | 0/8 | hub block | DEFER |
| 25 | `phind` (search) | **NO** | (org `phindco` not visible; product is fully closed-source) | — | — | — | 0/8 | — | **REJECT** (no public repo; closed-source SaaS) |
| 26 | `augmentcode/augment.vim` | YES | `augmentcode/augment.vim` | 612 | 2026-01-12 | NOASSERTION | 3/8 | Vim adapter for closed-source Augment Code API | REJECT (closed API) |
| 27 | `augmentcode/auggie` | YES | `augmentcode/auggie` | 213 | 2026-05-15 | NOASSERTION | 3/8 | terminal agent shell for closed-source Augment Code API | REJECT (closed API) |
| 28 | `augmentcode/augment-swebench-agent` | YES | `augmentcode/augment-swebench-agent` | 872 | 2025-06-09 | NOASSERTION | 4/8 | SWE-bench Verified reference impl | **STUDY-ONLY** (open-source SWE-bench tooling reference; not a runtime; license unclear) |
| 29 | `BasicProtein/AugmentCode-Free` | YES (clone-account) | unofficial | 2,007 | 2025-08-24 | MIT | 1/8 | abuse tool | REJECT (third-party "free refill" abuse) |
| 30 | `vber/free-augmentcode` | YES (clone-account) | unofficial | 629 | 2025-08-11 | MIT | 0/8 | abuse tool | REJECT (third-party "free refill" abuse) |
| 31 | `eyaltoledano/claude-task-master` | YES | `eyaltoledano/claude-task-master` | 27,153 | 2026-04-28 | Other (MIT-with-restriction per topic) | 7/8 | L80 task-orchestration drop-in (Cursor/Lovable/Windsurf/Roo) | **TIER-1-DISCOVERED** (re-confirm — was on Tranche C; now metrics ✓✓) |
| 32 | `DevDreed/claude-task-master-extension` | YES | — | 100 | 2025-06-16 | MIT | 2/8 | VSCode extension | DEFER (lower-priority skin) |
| 33 | `automazeio/ccpm` | YES | `automazeio/ccpm` | 8,112 | 2026-05-16 | None | 5/8 | L80 project-management skill — Issues + git-worktrees parallel execution | **TIER-2-OPTIONAL** (recent + high-star; orthogonal to existing CC skills — git-worktree harness is novel; LICENSE missing = D3 risk) |
| 34 | `humanlayer/humanlayer` | YES | `humanlayer/humanlayer` | 10,816 | 2026-05-16 | None? | 6/8 | L45 human-in-the-loop SDK for amp/claude-code/codex/opencode | **TIER-2-OPTIONAL** (strongly-stated CC integration; cross-tool) |
| 35 | `humanlayer/12-factor-agents` | YES | `humanlayer/12-factor-agents` | 19,825 | 2026-05-16 | None | 6/8 | reference doc — agent-engineering principles | **TIER-3-DOCS** (high-quality reference docs; not a runtime install) |
| 36 | `humanlayer/agentcontrolplane` | YES | `humanlayer/agentcontrolplane` | 405 | 2026-05-16 | None | 3/8 | k8s agent scheduler | DEFER (infra-only, requires k8s) |
| 37 | `langwatch/langwatch` | YES | `langwatch/langwatch` | 3,257 | 2026-05-16 | None | 5/8 | L60 LLM-eval + agent-testing platform | **TIER-2-OPTIONAL** (overlap with phoenix/opik/langfuse already in pipeline) |
| 38 | `langwatch/scenario` | YES | `langwatch/scenario` | 880 | 2026-05-15 | None | 4/8 | agentic-testing library | DEFER (specialized; agent simulation) |
| 39 | `langwatch/better-agents` | YES | `langwatch/better-agents` | 1,520 | 2026-05-12 | None | 4/8 | agent-build standards | DEFER (reference; not runtime) |
| 40 | `comet-ml/opik` | YES | `comet-ml/opik` | 19,321 | 2026-05-16 | None | 7/8 | L60 LLM observability + eval | **TIER-1-DISCOVERED** (highest-star observability; broader than helicone; cross-framework) |
| 41 | `Arize-ai/openinference` | YES | `Arize-ai/openinference` | 972 | 2026-05-16 | None | 5/8 | L60 OpenTelemetry instrumentation for AI | TIER-2 (companion to Phoenix; framework-agnostic OTEL instrumentation) |
| 42 | `comet-ml/opik-openclaw` | YES (NEW) | `comet-ml/opik-openclaw` | 614 | 2026-05-16 | None | 4/8 | OpenClaw plugin for Opik | DEFER (alt-runtime plugin) |
| 43 | `traceloop/openllmetry` | YES | `traceloop/openllmetry` | 7,115 | 2026-05-16 | None | 6/8 | L60 OpenTelemetry-based LLM observability | **TIER-2-OPTIONAL** (alternative to phoenix/opik/langfuse; OTEL-native) |
| 44 | `traceloop/openllmetry-js` | YES | `traceloop/openllmetry-js` | 398 | 2026-05-09 | None | 4/8 | TS sister | DEFER (sub-component) |
| 45 | `traceloop/go-openllmetry` | YES | `traceloop/go-openllmetry` | 44 | 2026-04-15 | None | 2/8 | Go sister | DEFER |
| 46 | `Helicone/helicone` | YES | `Helicone/helicone` | 5,677 | 2026-05-16 | None | 6/8 | L60 LLM observability (one-line integration) | **TIER-2-OPTIONAL** (CLI-style proxy; overlap w/ langfuse/opik but lower friction) |
| 47 | `Helicone/ai-gateway` | YES | `Helicone/ai-gateway` | 589 | 2026-05-13 | None | 5/8 | L35 Rust AI gateway (open-source LLM gateway) | **TIER-2-DISCOVERED** (Rust LLM gateway — competitor to LiteLLM proxy) |
| 48 | `AgentOps-AI/agentops` | YES | `AgentOps-AI/agentops` | 5,555 | 2026-05-16 | None | 6/8 | L60 Python agent monitoring SDK | **TIER-2-OPTIONAL** (Python-native; agent-framework-coupled; overlaps phoenix/opik) |
| 49 | `AgentOps-AI/tokencost` | YES | `AgentOps-AI/tokencost` | 1,981 | 2026-05-15 | None | 5/8 | L70 token cost estimator for 400+ LLMs | **TIER-2-DISCOVERED** (useful utility for cost-aware orchestration; novel niche) |
| 50 | `AgentOps-AI/BestGPTs` | YES | — | 1,024 | 2026-05-15 | None | 1/8 | curated list | REJECT (curated-list, not a tool) |
| 51 | `langfuse/langfuse` | YES | `langfuse/langfuse` | 27,309 | 2026-05-16 | None | 7/8 | L60 open-source LLM engineering platform | **TIER-1-DISCOVERED** (highest-star observability + eval + prompt-mgmt + playground; YC W23; self-hostable) |
| 52 | `langfuse/langfuse-python` | YES | — | 401 | 2026-05-15 | None | 4/8 | Python SDK | TIER-2 (sub-component; needed if installing #51) |
| 53 | `langfuse/langfuse-docs` | YES | — | 197 | 2026-05-16 | None | 3/8 | docs | TIER-3-DOCS |
| 54 | `letta-ai/letta` | YES | `letta-ai/letta` | 22,747 | 2026-05-16 | None | 7/8 | L20 stateful-agents platform with advanced memory | **TIER-1-DISCOVERED** (memory-first agent platform — distinct value vs current agent stack) |
| 55 | `letta-ai/letta-code` | YES (NEW) | `letta-ai/letta-code` | 2,495 | 2026-05-16 | None | 5/8 | memory-first coding agent | **TIER-2-DISCOVERED** (younger; competes with CC; memory-first is novel) |
| 56 | `letta-ai/claude-subconscious` | YES (NEW) | `letta-ai/claude-subconscious` | 2,738 | 2026-05-16 | None | 6/8 | "give Claude Code a subconscious" - explicit CC integration | **TIER-1-DISCOVERED** (explicit CC integration; ★2,738 in 4 months) |
| 57 | `smithery-ai/cli` | YES | `smithery-ai/cli` | 719 | 2026-05-16 | None | 5/8 | L65 MCP-server install/manage CLI | **TIER-2-OPTIONAL** (MCP-server registry CLI; CC has its own /plugin install) |
| 58 | `smithery-ai/smithery-cli-mcp` | YES | — | 6 | 2026-01-19 | None | 2/8 | MCP wrapper of #57 | DEFER |
| 59 | `smithery-ai/mcp-to-cli` | YES | — | 10 | 2026-04-28 | None | 2/8 | MCP→CLI bridge | DEFER |
| 60 | `toolhouse-com` / `toolhouse-ai` | **NO** (no org) | — | — | — | — | 0/8 | — | **REJECT** (no official org; only third-party examples like `CharlesCreativeContent/toolhouse-examples` ★34) |
| 61 | `tencentmusic/codebuddy` | **NO** | (no `tencentmusic/codebuddy` repo; org `tencentmusic` exists but no CodeBuddy public repo) | — | — | — | 0/8 | — | **REJECT** (no public repo; CodeBuddy is closed-source SaaS) |
| 62 | `JetBrains/junie` | YES | `JetBrains/junie` | 243 | 2026-05-15 | None | 4/8 | JetBrains AI coding agent (terminal/IDE/CI) — terminal entrypoint open-source; backend closed | **STUDY-ONLY** (low star for vendor scale; mostly closed-source backend dependency) |
| 63 | `JetBrains/junie-guidelines` | YES | `JetBrains/junie-guidelines` | 414 | 2026-05-13 | None | 3/8 | guidelines repo | DEFER (docs/conventions) |
| 64 | `JetBrains/junie-workflows` | YES | `JetBrains/junie-workflows` | 32 | 2026-05-16 | None | 2/8 | workflows | DEFER |
| 65 | `JetBrains/junie-github-action` | YES | `JetBrains/junie-github-action` | 21 | 2026-05-14 | None | 2/8 | GH Action | DEFER |
| 66 | `tempo-labs` / `tempolabs` | **NO** | (no clear org; only `0xStarLabs/StarLabs-Tempo` ★10 unrelated) | — | — | — | 0/8 | — | **REJECT** (no public repo; closed SaaS) |
| 67 | `bmadcode/bmadcode` | YES | `bmadcode/bmadcode` (user profile readme) | 55 | 2026-05-05 | None | 1/8 | user-profile readme | DEFER (not the BMAD-METHOD repo) |
| 68 | `bmad-code-org/BMAD-METHOD` | YES (CORRECT ORG) | `bmad-code-org/BMAD-METHOD` | 47,313 | 2026-05-16 | None | 7/8 | L80 Breakthrough Method for Agile AI-Driven Development | **TIER-1-DISCOVERED** (★47k; very-actively-maintained; project-management method/skill bundle; LICENSE field missing = D3 risk) |
| 69 | `nocfer/bmad-feature-hooks` | YES | — | 2 | 2026-04-23 | None | 1/8 | CC hooks for BMAD | DEFER |
| 70 | `openai/codex` | YES — see §B | `openai/codex` | 83,047 | 2026-05-16 | Apache-2.0 | 8/8 | L40 reviewer CLI | **TIER-1-DISCOVERED** (deep-probe §B; already in plan) |
| 71 | `openai/codex-plugin-cc` | YES (NEW) | `openai/codex-plugin-cc` | 18,811 | 2026-05-16 | None | 7/8 | "Use Codex from Claude Code to review code or delegate tasks" | **TIER-1-DISCOVERED** (★18.8k in <2 months; native CC plugin authored by OpenAI; replaces self-invent codex subprocess) |
| 72 | `openai/codex-universal` | YES | — | 913 | 2026-05-16 | None | 4/8 | Docker base image | TIER-2 (supplementary; sandbox image) |
| 73 | `windsurf` / `getcursor` | **NO** (in earlier batch — both closed-source products with no GitHub repos) | — | — | — | — | 0/8 | — | **REJECT** (no public repo) |
| 74 | `Citadel` / `bernstein` / `KARIMO` / `tutti` / `agentsys` | **NO** | (no high-quality matches; names too generic — cluttered with unrelated repos) | — | — | — | 0/8 | — | **REJECT** (no specific orgs identified; query too ambiguous) |
| 75 | `mendableai/firecrawl-mcp-server` | YES — see §B | actual repo is `firecrawl/firecrawl-mcp-server` (org-transferred) | — | (see §B) | — | — | — | (deep-probe §B) |

**Total rows: 75** (target ≥30 met)

---

## §B — Specific 5-Deep-Probe Results

### B.1 — `openai/codex` (TIER-1; reviewer-CLI baseline)

| Field | Value | Source |
|---|---|---|
| Owner | openai (org, ID 14957082) | api.github.com/repos/openai/codex |
| Description | "Lightweight coding agent that runs in your terminal" | repo metadata |
| Language | Rust | api.github.com |
| ★ | 83,047 | api.github.com 2026-05-16 |
| Forks | 12,035 | — |
| Open issues | 4,381 | — |
| Created | 2025-04-13 | — |
| Last push | 2026-05-16T15:07:58Z (today) | — |
| Updated | 2026-05-16T15:33:10Z (today) | — |
| License | **Apache-2.0** (verified — `key: "apache-2.0"`, `spdx_id: "Apache-2.0"`) | api.github.com |
| README pivot | NPM install: `npm i -g @openai/codex`; brew: `brew install --cask codex`; binary releases per platform; ChatGPT sign-in OR API key auth | repo `README.md` SHA `5cc7fd49` |
| Latest release | (release endpoint returned 184KB; not enumerated by tag here — most-recent commit is today 2026-05-16; ongoing daily release cadence indicated) | api.github.com |
| Active companion | **`openai/codex-plugin-cc`** ★18,811 — official CC plugin per release notes ("Use Codex from Claude Code to review code or delegate tasks") created 2026-03-30 — **CRITICAL FINDING for CLAUDE.md cardinal-rule-1 (W254 §3 install set)**: replaces any self-invent codex subprocess approach | api.github.com |

**Verdict**: TIER-1-CONFIRMED. Already in /goal install set per CLAUDE.md cardinal rules. License clean (Apache-2.0). Active daily commits.

---

### B.2 — `microsoft/playwright-mcp` (verify SUPERSEDED claim)

| Field | Value | Source |
|---|---|---|
| Owner | microsoft (org, ID 6154722) | api.github.com |
| Description | "Playwright MCP server" | repo metadata |
| Language | TypeScript | — |
| ★ | 32,585 | 2026-05-16 |
| Forks | 2,673 | — |
| Open issues | **4** (very low) | — |
| Created | 2025-03-21 | — |
| Last push | 2026-05-12T18:18:54Z (4 days ago) | — |
| Latest release | **v0.0.75** (2026-05-07 — published 9 days ago); bug-fix release: shared browser launch in isolated mode + extension-mode CDP fix | api.github.com 2026-05-07 |
| License | **Apache-2.0** | — |
| Topics | `mcp`, `playwright` | — |
| **SUPERSEDED CLAIM — VERDICT** | **PARTIALLY-SUPERSEDED** — the README explicitly recommends **`microsoft/playwright-cli` + SKILLS** for "coding agents" over MCP, citing token-efficiency: "Modern coding agents increasingly favor CLI–based workflows exposed as SKILLs over MCP because CLI invocations are more token-efficient: they avoid loading large tool schemas and verbose accessibility trees into the model context". But playwright-mcp is **NOT abandoned** — actively maintained (v0.0.75 last week) and explicitly positioned for "specialized agentic loops that benefit from persistent state, rich introspection, and iterative reasoning". | repo `README.md` SHA `bbd258ca` |

**Verdict**: NOT SUPERSEDED, but **DOWNRANKED** by upstream for coding-agent use-case. Prefer `microsoft/playwright-cli` + Playwright SKILLS bundle for CC integration; keep `playwright-mcp` as TIER-2 for stateful browser automation requiring continuous context.

---

### B.3 — `mendableai/firecrawl-mcp-server` (vs core AGPL split)

| Field | Value | Source |
|---|---|---|
| Owner request | `mendableai` (redirects automatically) | — |
| **Actual owner** | **`firecrawl`** (org-transferred — release `html_url` is `https://github.com/firecrawl/firecrawl-mcp-server/releases/tag/v3.2.1`) | api.github.com |
| Description | "MCP server that brings Firecrawl to MCP-compatible AI agents — search, scrape, interact with the live web" | repo `README.md` SHA `fac931be` |
| Language | TypeScript | — |
| Latest release | **v3.2.1** (2025-09-26 — ~8 months ago; cadence has slowed) | api.github.com |
| License | **MIT** (per README "License: MIT License") | repo README |
| **AGPL split verification** | The MCP server (`firecrawl-mcp-server`) is **MIT-licensed** — confirmed in README footer. The core `firecrawl/firecrawl` engine itself is AGPL-licensed (per Tranche B record). **SPLIT CONFIRMED**: MCP wrapper is permissive (MIT) for embedding in any agent; the underlying scraping engine carries AGPL when self-hosting. Cloud API access through MCP server bypasses AGPL terms. | repo README |
| 14 tools | scrape, batch_scrape, check_batch_status, map, search, search_feedback, crawl, check_crawl_status, extract, agent, agent_status, browser_create (deprecated), browser_execute (deprecated), browser_list/delete (deprecated) | repo README |

**Verdict**: TIER-1 MCP-CLEAN-LICENSE (MIT wrapper). Core engine AGPL is irrelevant for cloud-API usage. Release cadence slowed (8 months since last release) — minor D6 concern but tooling itself is stable.

---

### B.4 — `Arize-ai/phoenix` (verify ELv2 license blob)

| Field | Value | Source |
|---|---|---|
| Owner | Arize-ai (org, ID 59858760) | api.github.com |
| Description | "AI Observability & Evaluation" | repo metadata |
| Language | Python | — |
| ★ | 9,701 | 2026-05-16 |
| Forks | 873 | — |
| Open issues | 520 | — |
| Created | 2022-11-09 | — |
| Last push | 2026-05-16T05:36:35Z (today) | — |
| License (GitHub metadata) | `key: "other"`, `spdx_id: "NOASSERTION"` — GitHub cannot auto-classify | api.github.com |
| **LICENSE file content** | **CONFIRMED ELASTIC LICENSE 2.0 (ELv2)** — verbatim text from `LICENSE` file SHA `23d3aa7c`: "Elastic License 2.0 (ELv2) ... **Limitations** You may not provide the software to third parties as a hosted or managed service, where the service provides users with access to any substantial set of the features or functionality of the software." | repo `LICENSE` SHA `23d3aa7c87` |
| Implications | (1) NOT open-source per OSI definition. (2) Source-available — fork+modify allowed. (3) CANNOT offer Phoenix as a managed/hosted service competing with Arize. (4) CAN self-host for internal use. (5) Permissive for embedding/internal-tool usage. | LICENSE text |

**Verdict**: ELv2 CONFIRMED. Acceptable for internal self-hosted observability install. D3 score: 5/8 (source-available, internal-use-OK, but NOT redistributable as a service). Plan-it for INTERNAL self-host only; do NOT redistribute or fork-and-host.

---

### B.5 — `getzep/graphiti-core@0.29.0` (verify version pin)

| Field | Value | Source |
|---|---|---|
| Owner | getzep (org) | api.github.com |
| Repo | `getzep/graphiti` (note: NOT `graphiti-core` — package name differs from repo name) | api.github.com |
| Description | "A temporal graph building library" (per `pyproject.toml` `description` field) | repo `pyproject.toml` SHA `9b4d7494` |
| **Package version pin** | **`version = "0.29.0"`** — VERIFIED at `pyproject.toml:5` | repo `pyproject.toml` |
| Latest release | **`v0.29.0`** — published 2026-04-27 — confirmed via GitHub Releases API | api.github.com |
| License | **Apache-2.0** (`license = "Apache-2.0"` at `pyproject.toml:9`) | repo `pyproject.toml` |
| Python | `requires-python = ">=3.10,<4"` | — |
| Core deps | `pydantic>=2.11.5`, `neo4j>=5.26.0`, `openai>=1.91.0`, `tenacity>=9.0.0`, `numpy>=1.0.0`, `python-dotenv>=1.0.1`, `posthog>=3.0.0` | — |
| Optional groups | `anthropic`, `groq`, `google-genai`, `kuzu`, `falkordb`, `voyageai`, `gliner2`, `neo4j-opensearch`, `sentence-transformers`, `neptune`, `tracing` | — |
| v0.29.0 highlights | Combined node+edge extraction (opt-in via `use_combined_extraction=True` — single LLM call covers what previously took two); multi-episode batched extraction; decoupled timestamp resolution; new `summarize_saga()` API; `fact_triple` episode type; safer attribute merging (no first-class field overwriting); Kuzu schema migration required (`ALTER TABLE RelatesToNode_ ADD reference_time TIMESTAMP`) | release notes 2026-04-27 |

**Verdict**: VERSION PIN `0.29.0` CONFIRMED. License Apache-2.0 (clean). Active and recently released (3 weeks ago). The 0.29 series is positioned as "first of two releases focused on making ingestion meaningfully cheaper" — next release expected to graduate combined-extraction to default. Kuzu users need 1× ALTER TABLE migration.

---

## §C — Aider TIER-1 SOTA Confirmation (missed in Tranche D)

| Field | Value |
|---|---|
| Repo | `Aider-AI/aider` (org `Aider-AI`, ID 172139148) |
| Description | "aider is AI pair programming in your terminal" |
| Homepage | https://aider.chat/ |
| ★ | **44,891** (Tranche D should have caught this) |
| Forks | 4,422 |
| Created | 2023-05-09 |
| Last push | **2026-05-16** (today) — daily/weekly cadence |
| License | **Apache-2.0** (clean) |
| Language | Python |
| Latest release | **v0.86.0** (2025-08-09) — note: 9-month release gap between v0.86 and now, but main branch shows daily commits |
| v0.86.0 highlights | GPT-5 support; Grok-4 (`xai/grok-4` + `openrouter/x-ai/grok-4`); Gemini 2.5 Flash Lite Preview; `openrouter/moonshotai/kimi-k2`; `/clear` confirmation msg; `/undo` first-line display; analytics PostHog SDK update; `litellm==1.75.0` bump; **"Aider wrote 88% of the code in this release"** (self-coding agent claim) |
| Topics | `anthropic`, `chatgpt`, `claude-3`, `cli`, `command-line`, `gemini`, `gpt-3`, `gpt-35-turbo`, `gpt-4`, `gpt-4o`, `llama`, `openai`, `sonnet` |
| D1-D8 score | **8/8** — ★≥10k ✓, last-commit ≤90d ✓, Apache-2.0 ✓, production-ready ✓ (multi-model + git-aware), distinct value vs CC ✓ (multi-model parallel orchestration; CLI-only; codebase-map; supports OpenAI/Anthropic/Gemini/local concurrently), active maintenance ✓ (daily), composable ✓ (CLI + Python SDK + LiteLLM backend), cost-fit ✓ (per-model pricing knob + `--cache-prompts`) |

**Tranche D analysis miss**: Tranche D used `topic:ai-pair-programming` and `topic:ai-coding-assistant` queries which **don't appear in Aider's topic list** (Aider uses `cli`, `command-line`, `anthropic`, `gpt-4` etc instead). Name-search `Aider-AI/aider in:name` returns it as result #1 (★44,891 — third-highest of all CC-adjacent CLI coding agents after openai/codex 83k and BMAD-METHOD 47k).

**Layer placement**: L40 (Multi-model orchestration / CLI coding agent). Companion-but-not-replacement for CC: Aider's strength is multi-model parallel work + git-native checkpointing; CC's strength is plugin/skill ecosystem + Anthropic-native. Use as **codex-equivalent peer-reviewer** in cross-model consensus gate (Aider can call GPT-4o, Gemini-2.5, Grok-4 as the "other model" beside CC).

**Verdict**: **TIER-1-CONFIRMED-IN-TRANCHE-G**. Add to W254 install set or as TIER-1 review alternative to codex per `codex@openai-codex` plugin install plan.

---

## §D — Honest Non-Findings

1. **`phind`** — NO public repo found. Confirmed closed-source SaaS. The org `phindco` is not visible via search (likely private/non-existent). Phind operates only as `phind.com` web product; no GitHub presence to install. **Cannot install.**

2. **`tencentmusic/codebuddy`** — NO repo at `tencentmusic/codebuddy`. The `tencentmusic` org exists on GitHub but does not publish CodeBuddy publicly. CodeBuddy is Tencent's internal/SaaS coding assistant. Third-party `metowolf/TencentMusicApi` ★69 is unrelated (QQ Music API).

3. **`cursor`, `getcursor`, `windsurf`** — NO public repos for the core IDE binaries. Both are closed-source commercial products. Public repos only exist for community-forks/extensions (none of which are TIER-1 candidates).

4. **`toolhouse-com` / `toolhouse-ai` / `toolhouse-community`** — No official `toolhouse-com` or `toolhouse-ai` org found. Only `toolhouse-community/mcp-server-toolhouse` (referenced via mirror at `mcpflow/toolhouse-community_mcp-server-toolhouse` ★0) exists; appears to be community-maintained mirror, not an official-org primary. The Toolhouse product itself is SaaS-only. **REJECT — no install path.**

5. **`tempo` / `tempolabs` / `tempo-labs`** — Cluttered with unrelated repos (`0xStarLabs/StarLabs-Tempo`, `ConnecUs/TempoLabs`, etc — all ★0–10, unrelated to Tempo Labs AI). The actual Tempo Labs (tempo.new) is closed-source SaaS. **REJECT.**

6. **`Citadel`, `bernstein`, `tutti`, `KARIMO`, `agentsys`** — Generic names; cluttered with hundreds of unrelated repos. The originating task contained these as bare keywords without org prefixes, suggesting they may be **placeholders / scope-creep from operator input** rather than actual targeted repos. **Cannot disambiguate without operator-supplied owner prefix.** Recommend operator clarify or drop from backlog.

7. **`bmadcode/BMAD-METHOD`** — User-supplied owner `bmadcode` was INCORRECT. Correct owner is **`bmad-code-org`** (with hyphens). The `bmadcode` username is a separate user profile (★55 user-readme). Easily-missed naming detail; corrected via `bmad-method in:name stars:>500`.

8. **`mendableai/firecrawl-mcp-server`** — The owner `mendableai` redirects to `firecrawl/firecrawl-mcp-server` (org transfer). README still uses `mendableai` URL throughout, but release artifact metadata confirms the canonical owner is now `firecrawl`. Both URLs work (GitHub auto-redirects).

9. **`openai/codex` "latest release" endpoint returned 184KB** — too large to parse; not enumerated by tag here. However, last-commit and release-cadence indicate daily/sub-daily releases. NPM `npm i -g @openai/codex` is the authoritative install path (per README), bypassing the need for a specific GitHub release tag.

10. **License field "None" for many TIER-1 candidates** (BMAD-METHOD, ccpm, humanlayer, langfuse, opik, langwatch, letta, opensite/openllmetry, helicone, agentops, openai/codex-plugin-cc, smithery, augmentcode/*) — GitHub `license` field is null in API metadata for these. This does **NOT** mean the repo lacks a LICENSE file (some have MIT/Apache in the repo root not detected by GitHub auto-classifier). **Recommend tranche-H deep-LICENSE-fetch** for D3 score finalization on each TIER-1/TIER-2 candidate before install commitment.

---

## Synthesis Summary

- **TIER-1-DISCOVERED via name-search (missed in Tranches A-E)**: Aider (#1), claude-task-master re-confirm (#31), opik (#40), langfuse (#51), letta (#54), claude-subconscious (#56), BMAD-METHOD (#68), openai/codex-plugin-cc (#71) — **8 new TIER-1 candidates**.
- **TIER-2-OPTIONAL discovered**: tabby (#16), continue (#20), ccpm (#33), humanlayer (#34), langwatch (#37), traceloop/openllmetry (#43), helicone (#46), agentops (#48), letta-code (#55), smithery-ai/cli (#57), helicone/ai-gateway (#47), AgentOps-AI/tokencost (#49) — **12 TIER-2 candidates**.
- **TIER-2 verified existing**: Arize-ai/openinference (#41), playwright-mcp (B.2 — downranked but not superseded).
- **REJECT (no public install path)**: phind, codebuddy, cursor, windsurf, tempo, toolhouse-com, the codeium/cody closed-source-dependent adapters, the augmentcode closed-API-dependent adapters, the third-party "free refill" abuse tools.
- **5-deep-probe verdicts**: codex Apache-2.0 ✓, playwright-mcp Apache-2.0 partially-superseded but actively-maintained, firecrawl-mcp-server MIT (split confirmed), Phoenix ELv2 confirmed (source-available, self-host-only), graphiti-core 0.29.0 pin verified Apache-2.0 ✓.
- **Aider TIER-1 confirmation**: ★44,891 today, Apache-2.0, daily commits, 8/8 D1-D8 score. The Tranche D miss is methodological — topic-tag queries cannot catch repos that don't subscribe to the queried topic.
- **Critical follow-up**: 13+ TIER-1/TIER-2 candidates have `license: null` in GitHub metadata; deep-LICENSE-fetch required before install commitment.
