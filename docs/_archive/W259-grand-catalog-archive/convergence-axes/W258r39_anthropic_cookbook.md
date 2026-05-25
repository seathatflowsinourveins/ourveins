# W258r39 — Anthropic Cookbook + Quickstarts + SDK Recipes Probe (2026-05-16)

**Verdict: CONFIRMS-W258-v4 + 3 GENUINELY-NEW Anthropic-OFFICIAL working-code references operator should know.** Confidence 0.91.

Note: Repos RENAMED (operator should update bookmarks):
- `anthropics/anthropic-cookbook` → `anthropics/claude-cookbooks` (live)
- `anthropics/anthropic-quickstarts` → `anthropics/claude-quickstarts` (live)
- Old URLs still 30x-redirect

## §1 claude-cookbooks current contents (15 recipes, README dae0afd)

| Topic | Path | Operator-applicable |
|---|---|---|
| Classification | capabilities/classification | n (CC handles) |
| RAG | capabilities/retrieval_augmented_generation | partial (operator has graphiti+repomix) |
| Summarization | capabilities/summarization | partial |
| Tool use — customer service agent | tool_use/customer_service_agent.ipynb | pattern-cite |
| Tool use — calculator | tool_use/calculator_tool.ipynb | pattern-cite |
| Tool use — SQL queries | misc/how_to_make_sql_queries.ipynb | pattern-cite |
| Pinecone RAG | third_party/Pinecone/rag_using_pinecone.ipynb | n (graphiti) |
| Wikipedia search | third_party/Wikipedia/*.ipynb | n |
| VoyageAI embeddings | third_party/VoyageAI/how_to_create_embeddings.md | watchlist |
| Vision — getting started | multimodal/getting_started_with_vision.ipynb | y |
| Vision — best practices | multimodal/best_practices_for_vision.ipynb | y |
| Vision — charts/graphs/forms | multimodal/* | y |
| **Sub-agents** (Haiku + Opus pair) | multimodal/using_sub_agents.ipynb | **y — direct operator pattern** |
| PDF upload | misc/pdf_upload_summarization.ipynb | partial |
| **Automated evaluations** | misc/building_evals.ipynb | **y — bridges to Promptfoo pilot** |
| JSON mode | misc/how_to_enable_json_mode.ipynb | **SUPERSEDED by Anthropic-native structured outputs (r32)** |
| Moderation filter | misc/building_moderation_filter.ipynb | n |
| **Prompt caching** | misc/prompt_caching.ipynb | **y — 1h TTL discipline (operator's ENABLE_PROMPT_CACHING_1H=1)** |

## §2 claude-quickstarts (6 full apps, README b741569)

| App | Demonstrates | Operator-applicable |
|---|---|---|
| Customer Support Agent | KB-backed support | n |
| Financial Data Analyst | Interactive viz via chat | n |
| **Computer Use Demo** | Containerized desktop control; ships **`computer_use_20251124`** (NEWER tool version than v3/v4 cited) + zoom actions | **y — v4 should cite this tool version** |
| **Computer Use Best Practices** | macOS-native ref: explicit tool defs / image sizing+pruning / prompt caching / **server-side compaction** / batched tool calls / sandboxed shell / **trajectory recording** | **y — ALL v4 primitives in working code form** |
| Browser Use Demo | Playwright-backed Claude browser tool | y (operator has Playwright MCP — cross-check pattern) |
| **Autonomous Coding Agent** | **TWO-AGENT pattern (initializer + coding-agent)**, **git progress persistence**, incremental feature list | **y — Anthropic-OFFICIAL ralph-dag pattern** |

## §3 claude-agent-sdk-python examples (17 files, /examples)

Notable: `agents.py` · `filesystem_agents.py` · **`hooks.py` (12KB — most complete hook example)** · `mcp_calculator.py` (MCP server authoring) · `plugin_example.py` + `plugins/` dir (**plugin authoring reference**) · `quick_start.py` · **`session_stores/`** (durable-session pattern — pairs with r36 MCP Tasks SEP-1686) · `setting_sources.py` · `streaming_mode*.py` (3 variants: asyncio / ipython / trio) · `system_prompt.py` · `tool_permission_callback.py` (auto-mode pattern) · `tools_option.py` · `max_budget_usd.py` (cost-gating)

## §4 Working-code coverage for v4 primitives (gap analysis)

| v4 primitive | Anthropic-OFFICIAL working code | Status |
|---|---|---|
| Computer Use | `claude-quickstarts/computer-use-demo` (`computer_use_20251124`) + `computer-use-best-practices` | **✓ but v4 cites old `computer_20250124` — UPDATE** |
| Sub-agent dispatch | `claude-cookbooks/multimodal/using_sub_agents.ipynb` + `claude-quickstarts/autonomous-coding` | ✓ |
| Hooks | `claude-agent-sdk-python/examples/hooks.py` | ✓ |
| MCP server authoring | `claude-agent-sdk-python/examples/mcp_calculator.py` | ✓ |
| Plugin authoring | `claude-agent-sdk-python/examples/plugin_example.py` + `plugins/` | ✓ |
| Prompt caching | `claude-cookbooks/misc/prompt_caching.ipynb` | ✓ |
| Eval recipes | `claude-cookbooks/misc/building_evals.ipynb` + `courses/prompt_evaluations` | ✓ |
| Server-side compaction | `claude-quickstarts/computer-use-best-practices` (in-context) | ✓ |
| Auto-mode permission callback | `claude-agent-sdk-python/examples/tool_permission_callback.py` | ✓ |
| Session-continuity / durable | `claude-agent-sdk-python/examples/session_stores/` | ✓ |
| Cost-budget gating | `claude-agent-sdk-python/examples/max_budget_usd.py` | ✓ |
| **Adaptive thinking** | (No dedicated cookbook recipe yet — API docs only) | **gap — pilot from docs** |
| **Tool search tool** | (No dedicated cookbook recipe yet — API docs only) | **gap — pilot from docs** |
| **Compaction API** | (computer-use-best-practices uses it in-context; no standalone recipe) | **gap — pilot from quickstart** |
| **Managed Agents** | (No public quickstart — beta-only docs) | **gap — beta API only** |
| **Advisor tool** | (No public quickstart — beta-only docs) | **gap — beta API only** |
| **Code-execution-with-MCP** | (No dedicated quickstart) | **gap — pattern only per v4** |

## §5 Top-3 recipes for operator to clone NOW (working starter code)

1. **`anthropics/claude-quickstarts/autonomous-coding`** — Anthropic-OFFICIAL two-agent ralph-dag pattern with git progress persistence. **This SUPERSEDES W258 v4's "Archon ralph-dag pattern-cite"** — clone Anthropic's version instead, it's the official implementation. Critical add for operator.

2. **`anthropics/claude-quickstarts/computer-use-best-practices`** — macOS-native reference packing **6 of v4's primitives into working code** (server-side compaction / batched tool calls / sandboxed shell / prompt caching / trajectory recording / image pruning). Best single-repo reference for v4 §X.1 Anthropic-OFFICIAL primitives in concrete code.

3. **`anthropics/claude-agent-sdk-python/examples/hooks.py`** (12KB) — most complete hook example. Pairs with operator's existing `.claude/settings.json` hook stack; bridges v4 §6 operator-fit migrations.

## §6 Courses (5 — recommended sequence)

`anthropic-api-fundamentals` → `prompt-engineering-interactive-tutorial` (9 chapters) → `real-world-prompting` → `prompt-evaluations` (bridges to Promptfoo) → `tool-use` (pairs with operator's MCP-heavy stack)

## §7 Verdict for v4 update

**v4 should link specific Anthropic-OFFICIAL recipes per install tier:**
- L2 driver § — link `claude-quickstarts/autonomous-coding` for the two-agent ralph-dag pattern (replaces Archon pattern-cite as primary reference)
- L5 scaffold § — link `claude-quickstarts/computer-use-best-practices` as the canonical primitive-bundle reference
- §6 operator-fit migrations § — link `claude-agent-sdk-python/examples/hooks.py` + `tool_permission_callback.py` + `session_stores/`
- §7 patterns § — link `claude-cookbooks/misc/building_evals.ipynb` for the evals-first pattern
- §8 cascade § — link `claude-cookbooks/misc/prompt_caching.ipynb`

**Two repo-rename corrections required:**
- `anthropic-cookbook` → `claude-cookbooks`
- `anthropic-quickstarts` → `claude-quickstarts`

**Tool-version correction:** v4 should reference `computer_use_20251124` (current per quickstart) instead of `computer_20250124`.

Sources: GitHub MCP `get_file_contents` reads at HEAD/main for 5 anthropics/* repos (dae0afd / b741569 / 4e87988 / d99c4d5 / examples-dir listing) 2026-05-16.
