# COGNEE ↔ CLAUDE CODE INTEGRATION — W259v6 (Wave-6 Cognee-Integration Verifier)

> **Mission:** The operator flagged `https://github.com/topoteretes/cognee-integration-claude` as missing from the W259 memory catalog. Deep-dive it, score it across the 23 W259 dimensions, verify the rest of the operator's ~58-repo memory catalog is captured in `MEMORY-LAYER-RECONCILED-W259v4.md`, and correct the L1.5 cold-tier-bridge recommendation (`cognee-mcp` vs `cognee-integration-claude` vs the actual CC plugin).
>
> **Headline correction:** The operator flagged the *wrong repo name* for what they want. `cognee-integration-claude` is **NOT** the CC-native integration — it is a **Claude Agent SDK (Python) library**. The real official CC-native cognee plugin lives at **`topoteretes/cognee-integrations/integrations/claude-code`** (the `cognee-memory` plugin v0.2.0). BOTH are **UNLICENSED** (no LICENSE file — confirmed 2026-05-16, same finding as W240/W253-C). This document supersedes `MEMORY-LAYER-RECONCILED-W259v4.md` §5.2 cold-tier-bridge sub-block.
>
> **Cite-class:** `effective_tier=TIER-3-LOCAL-COMPOSITION` per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8. Constituents (2026-05-16): GitHub API live metadata + raw file reads of `topoteretes/cognee-integration-claude` (README, pyproject.toml, `cognee_integration_claude/{__init__,tools,bootstrap}.py`, `examples/example.py`, `.env.template`) + raw file reads of `topoteretes/cognee-integrations` (README, `integrations/inventory.yml`, `integrations/claude-code/{README.md, .claude-plugin/plugin.json, hooks/hooks.json, agents/cognee-recall.md, skills/cognee-remember/SKILL.md}`) + DeepWiki Q&A `topoteretes/cognee` (cognee-mcp + CC plugin architecture) + W259 Wave-1 LAYER-A + Wave-4 MEMORY-LAYER-RECONCILED-W259v4 + Wave-2 ROUND2-MISSED inheritance.
>
> **HONEST-NON-FINDING:** DeepWiki has NOT indexed `topoteretes/cognee-integration-claude` (repo too small/new) — its architecture is established by direct source-file reads instead, which for a 4-file Python package is fully sufficient. Star counts: GitHub repo-search API does not return `stargazers_count` in the list payload for these repos; prior-wave probes recorded `cognee-integrations` at **~27 stars** (W253-C, 2026-05-15) — `cognee-integration-claude` is in the same low band (single-digit to low-double-digit). Treated as **low-adoption** for D3/D8.

---

## §0 — `topoteretes/cognee-integration-claude` deep-dive + 23-dimension score

### §0.1 — What it actually is (the operator's flagged repo)

| Attribute | Finding | Source |
|---|---|---|
| Full name | `topoteretes/cognee-integration-claude` | GitHub API |
| Created / last push | created **2025-10-07**, last push **2025-12-18**, repo metadata `updated_at` 2026-03-31 | GitHub API |
| **Last commit age** | **~5 months stale** (2025-12-18 → 2026-05-16). No 2026 commits. | GitHub API |
| **License** | **NONE — no `LICENSE` file** (GitHub API `GET /repos/.../LICENSE` → 404). `pyproject.toml` has no `license` field. README §License says "MIT License" as *prose only* — **no actual MIT file ships**. → D1 = NOASSERTION-class. | GitHub API + `pyproject.toml` + README |
| Stars / adoption | low (single/low-double-digit band; sibling `cognee-integrations` was ~27★ 2026-05-15) | prior-wave probe |
| Package | PyPI `cognee-integration-claude` **v0.1.1**; `requires-python >=3.13` | `pyproject.toml` |
| Dependencies | `claude-agent-sdk>=0.1.1`, `cognee>=0.3.4`, `python-dotenv>=1.1.1` | `pyproject.toml` |
| **What it IS** | A **Python library** exposing two `@tool`-decorated functions (`add_tool`, `search_tool`) plus `get_sessionized_cognee_tools()`. You wire them into a **`claude-agent-sdk` `create_sdk_mcp_server()`** in *your own Python script*. | `cognee_integration_claude/tools.py` |
| **What it is NOT** | NOT a Claude Code plugin. NOT a `.mcp.json` server. NOT a CC skill or hook. **No `.claude-plugin/`, no `plugin.json`, no `hooks/`, no `SKILL.md`, no `agents/`.** Repo root = `README.md`, `pyproject.toml`, `uv.lock`, `.env.template`, `.python-version`, `cognee_integration_claude/` (4 py files + a guide.ipynb), `examples/example.py`. | repo tree |

### §0.2 — Architecture (how it wires cognee into Claude)

The entire mechanism is ~7 KB of Python (`tools.py`):

1. **`add_tool(data)`** — `@tool`-decorated; calls `add_tool_impl` → `_enqueue_add` → an `asyncio.Lock` + `asyncio.Queue` batcher → `cognee.add(...)` then `cognee.cognify()`. The queue is the "thread-safe / concurrent" feature: concurrent adds are coalesced, then a single `cognify()` rebuilds the knowledge graph.
2. **`search_tool(query_text)`** — `@tool`-decorated; calls `search_tool_impl` → `await _add_queue.join()` (drains pending writes first) → `cognee.search(query_text, top_k=100)`, or `cognee.search(..., node_type=NodeSet, node_name=node_set)` when sessionized.
3. **`get_sessionized_cognee_tools(session_id)`** — a decorator factory that injects `node_set=[session_id]` into every call, giving per-user data isolation via cognee's `NodeSet` tagging. Auto-generates a UUID session if none given.
4. **Consumption pattern** (from `examples/example.py` + README): the developer writes a Python program that does `create_sdk_mcp_server(name="cognee-tools", tools=[add_tool, search_tool])`, passes it via `ClaudeAgentOptions(mcp_servers={...}, allowed_tools=["mcp__tools__add_tool", "mcp__tools__search_tool"])`, and drives a `ClaudeSDKClient`. The cognee tools surface to the model as **in-process SDK-MCP tools**.

**Critical architectural fact — the `create_sdk_mcp_server` distinction:** `claude-agent-sdk`'s `create_sdk_mcp_server` builds an **in-process MCP server that runs inside the Python program's own event loop** — there is no subprocess, no stdio transport, no `.mcp.json`. It only exists for the lifetime of *that Python script's* `ClaudeSDKClient`. This is the SDK programmatic path, **fundamentally different from a Claude Code CLI `.mcp.json` entry or a `/plugin`-installed plugin**. A CC CLI session (`eee` launcher) cannot consume `cognee-integration-claude` without the operator first writing and running a bespoke Python harness — which is a cardinal-rule-1 self-invent.

### §0.3 — Native-CC pathway assessment

| CC-native surface | Present? | Evidence |
|---|---|---|
| `.claude-plugin/plugin.json` (plugin) | **NO** | repo tree has no `.claude-plugin/` |
| `.mcp.json` / stdio MCP server | **NO** | only `create_sdk_mcp_server` (in-process SDK MCP) |
| `SKILL.md` (skill) | **NO** | no skills dir |
| `hooks/hooks.json` (lifecycle hooks) | **NO** | no hooks dir |
| `agents/*.md` (subagent) | **NO** | no agents dir |
| Claude Agent SDK (Python) integration | **YES** | this is its *only* pathway |
| Claude Code **CLI** integration | **NO (not without bespoke glue)** | requires a custom Python `ClaudeSDKClient` harness |

**D11 NATIVE-CC-PATHWAY scoring (plugin +2 / SKILL +2 / agents +2 / .mcp.json +2 / hooks +2):** scores **0 of 10** on the literal rubric — it carries none of the five CC-native artifacts. It IS a legitimate Claude *Agent SDK* integration, but the W259 D11 dimension measures **Claude Code** pathway, not Agent-SDK pathway. **D11 = 2** (small floor credit: it is a real, first-party Anthropic-SDK-compatible integration that *could* be wrapped — but for a CC-CLI operator it is effectively non-native).

### §0.4 — Windows-portability

No Windows-specific blockers in the code itself (pure Python `asyncio`; `claude-agent-sdk` ships a bundled CC CLI that handles auth cross-platform). BUT: `requires-python >=3.13` is a hard floor (operator venv `Z:\venvs\claude` is Python 3.13 — OK). The real Windows risk is **transitive: `cognee>=0.3.4`** — cognee needs `python-magic` (Windows requires the `python-magic-bin` variant) and a graph backend. The integration adds no Windows hardening of its own. **Status: probably-works-on-Windows-via-the-cognee-base, untested, no PowerShell/Windows CI.** D15 = 7 (inherits cognee's reasonable-but-unverified Windows story; the wrapper itself is Windows-neutral).

### §0.5 — 23-dimension score (`Composite = Σ(Di×Wi)/18.9×10`)

Scored against `MASTER-SCORING-MATRIX-W259.md` §1 (10 SRA D1-D10 + 13 W259-extended D11-D23, total weight 18.9).

| Dim | Name | W | Score | Rationale |
|---|---|---:|---:|---|
| D1 | License-use-class | 1.0 | **0** | **No LICENSE file.** README prose says "MIT" but no file ships → NOASSERTION-class = 0. Hard cardinal-rule-1 blocker. |
| D2 | SOTA-freshness | 1.0 | **6** | Last push 2025-12-18 = 2025-Q4 → 6. No 2026 activity. |
| D3 | Star-velocity vs content-depth | 0.7 | **2** | Low-single/double-digit stars; thin content (4 py files, ~7 KB core). |
| D4 | Maintainer-provenance | 1.0 | **6** | `topoteretes` is a real named org (cognee parent) → T3-NAMED-ORG = 6. |
| D5 | Active-maintenance | 0.8 | **3** | 5 months no commits; `inventory.yml` marks it `migration_status: pending` (org is *deprioritizing* the standalone repo). |
| D6 | Use-class compatibility | 1.0 | **3** | Autonomous-`/loop` CC-CLI runtime cannot consume it without bespoke Python harness. |
| D7 | Anthropic-CC alignment | 0.8 | **6** | Uses official `claude-agent-sdk`; aligned with Anthropic SDK conventions — but not the CC-CLI surface. |
| D8 | Industry adoption | 1.0 | **2** | No evidence of ≥3-org production use; low stars; no named-T2 endorsements. |
| D9 | Failure-mode awareness | 0.6 | **4** | The `asyncio.Lock`/`Queue` batcher shows concurrency-awareness; but no error-handling docs, no CVE surface, no test suite visible. |
| D10 | Replacement viability | 0.8 | **4** | If chosen as cold-tier bridge it must beat the alternatives — it does not (see §1); the CC plugin and cognee-mcp both dominate it for a CC-CLI operator. |
| D11 | **NATIVE-CC-PATHWAY** | 1.2 | **2** | **0/10 on literal rubric** (no plugin/skill/agents/.mcp.json/hooks). Floor credit 2: real first-party Agent-SDK integration, wrappable in principle. |
| D12 | Community-consensus | 0.9 | **2** | No independent mentions, no marketplace presence, no named-T2. |
| D13 | ROI-per-layer | 0.7 | **4** | Estimate-only; the queue-coalesced `cognify()` is mildly efficient but unmeasured. |
| D14 | Q2-2026 frontier | 0.5 | **2** | No 2026 update at all. |
| D15 | **WINDOWS-PORTABLE** | 1.0 | **7** | Wrapper is Windows-neutral pure-Python; inherits cognee's reasonable-but-unverified Windows story. No Windows CI. |
| D16 | Context-budget-cost | 0.7 | **8** | Only **2 MCP tools** surfaced; tiny injection footprint → low context cost (good, score high). |
| D17 | MCP-trust-surface | 0.8 | **5** | In-process SDK-MCP (no network surface = safe) but **no auth, no version pinning of the integration, no LICENSE** → trust capped. |
| D18 | Codex-verifiability | 0.6 | **5** | codex can pip-install + read 4 files cheaply; but no test suite to regression-probe. |
| D19 | Reversible-pilotability | 0.9 | **7** | `pip uninstall` is clean; but "pilot" requires writing a Python harness first → friction. |
| D20 | Duplication-against-installed | 0.8 | **4** | Heavy overlap: it is *one of three* cognee↔Claude pathways and duplicates the function of the cognee CC plugin + cognee-mcp; also overlaps Graphiti/mem0 memory slot. |
| D21 | Data-boundary-risk | 0.9 | **7** | In-process, local cognee store by default = low data-flow risk; but cognee's LLM calls (`LLM_API_KEY`, default `gpt-5`) send content to OpenAI unless a local provider is configured. |
| D22 | Solo-operator-fit | 0.8 | **3** | Requires the solo operator to author + maintain bespoke Python glue — *adds* ceremony rather than removing it. |
| D23 | Maintenance-velocity | 0.7 | **2** | Stale 5 months; `migration_status: pending`; bus factor unknown; low velocity. |

**Weighted sum** = (0×1.0)+(6×1.0)+(2×0.7)+(6×1.0)+(3×0.8)+(3×1.0)+(6×0.8)+(2×1.0)+(4×0.6)+(4×0.8)+(2×1.2)+(2×0.9)+(4×0.7)+(2×0.5)+(7×1.0)+(8×0.7)+(5×0.8)+(5×0.6)+(7×0.9)+(4×0.8)+(7×0.9)+(3×0.8)+(2×0.7)
= 0 + 6 + 1.4 + 6 + 2.4 + 3 + 4.8 + 2 + 2.4 + 3.2 + 2.4 + 1.8 + 2.8 + 1.0 + 7 + 5.6 + 4.0 + 3.0 + 6.3 + 3.2 + 6.3 + 2.4 + 1.4
= **91.6** → **Composite = 91.6 / 18.9 × 10 ≈ 48.5 ≈ 48**

### §0.6 — `cognee-integration-claude` VERDICT

> **Composite ≈ 48 → `REJECT-FOR-FIT` (sub-50) for THIS operator's Claude-Code-CLI runtime.**
>
> It is not a defect of the library — it is a **category mismatch**. `cognee-integration-claude` is a clean, small Claude *Agent SDK* helper for developers building Python agent apps. It is the right tool if the operator were writing a Python `ClaudeSDKClient` program. It is the **wrong tool** as an L1.5 cold-tier bridge for a CC-CLI `/loop` runtime, because (1) it has no CC-native surface (D11 ≈ 0), (2) it forces bespoke Python glue = cardinal-rule-1 self-invent, (3) **it ships no LICENSE** (D1 = 0, hard CR-1 blocker), (4) it is 5 months stale and the org marks it `migration_status: pending`. The operator was right that it was *missing* from the catalog — but the correct catalog disposition is **REJECT-FOR-FIT (category mismatch)**, recorded so future waves do not re-surface it as a candidate. The cognee↔CC pathway the operator actually wants is the `cognee-memory` **plugin** — see §1.

---

## §1 — `cognee-mcp` vs `cognee-integration-claude` vs the cognee CC plugin: which is the cold-tier bridge

There are **THREE distinct cognee↔Claude pathways** (the operator's catalog conflates them; the W259v4 reconciled doc only mentions a fragment of one). All three are first-party `topoteretes`:

### §1.1 — The three pathways

| # | Pathway | Repo / path | What it is | CC-native? | License |
|---|---|---|---|---|---|
| **A** | **`cognee-integration-claude`** (operator-flagged) | `topoteretes/cognee-integration-claude` (PyPI `cognee-integration-claude` v0.1.1) | Claude **Agent SDK** Python library — 2 `@tool` functions for `create_sdk_mcp_server` | **NO** — Agent-SDK only, needs bespoke Python harness | **NONE** (no LICENSE file) |
| **B** | **cognee CC plugin** (`cognee-memory`) | `topoteretes/cognee-integrations/integrations/claude-code` | A **real Claude Code plugin** — `plugin.json` v0.2.0, 6 lifecycle hooks, 3 skills, 1 subagent | **YES — strongest** | **NONE** (no root LICENSE on `cognee-integrations`) |
| **C** | **`cognee-mcp`** | `topoteretes/cognee` monorepo, `cognee-mcp/` subdir (run via `uvx cognee-mcp` or `pip` + `python src/server.py`) | A **FastMCP MCP server** — stdio/SSE/HTTP transports; exposes `cognify`/`search`/`remember`/`recall`/`forget`/`improve` etc. | **YES** — standard `.mcp.json` MCP server | **Apache-2.0** (the `cognee` monorepo root) |

**`topoteretes/cognee-mcp` is NOT a standalone repo** — that URL 404s (confirmed by prior W259 install-report). It lives inside the `topoteretes/cognee` monorepo, which **IS Apache-2.0**. This is the key license difference: **pathway C inherits the cognee monorepo's Apache-2.0; pathways A and B are UNLICENSED.**

### §1.2 — Pathway B (the cognee CC plugin) — full structure

This is what the operator's catalog *meant* to flag. From `topoteretes/cognee-integrations/integrations/claude-code`:

- **`.claude-plugin/plugin.json`** — `name: cognee-memory`, `version: 0.2.0`, `author: Cognee`, keywords `[memory, knowledge-graph, cognee, reasoning, session]`. (Note `inventory.yml` separately says `current_version: 0.1.0` — minor manifest drift.)
- **`hooks/hooks.json`** — **6 lifecycle hooks**, all `python3 ${CLAUDE_PLUGIN_ROOT}/scripts/*.py`:
  - `SessionStart` → `session-start.py` (loads config, computes per-directory session ID, connects to Cognee Cloud if configured; 15s timeout)
  - `UserPromptSubmit` → `session-context-lookup.py` (searches session cache, injects context; 15s) + `store-user-prompt.py` (async)
  - `PostToolUse` (matcher `Bash|Agent|Read|Write|Edit|Grep|Glob`) → `store-to-session.py` (async, captures tool I/O with `[category:agent]` tag)
  - `Stop` → `store-to-session.py --stop` (async) + `clear-transcript-context.py` (demo-only auto-clear)
  - `PreCompact` → `pre-compact.py` (builds a "memory anchor" from session + graph context so key knowledge survives the compact reset; 15s)
  - `SessionEnd` → `sync-session-to-graph.py` (runs `cognee.improve()` to bridge session data into the permanent knowledge graph)
- **`skills/`** — 3 skills (slash commands): `/cognee-memory:cognee-remember` (permanent store with user/project/agent `node_set` routing), `/cognee-memory:cognee-search` (explicit session/graph search, category-filterable), `/cognee-memory:cognee-sync` (force session→graph sync). Each is a proper `SKILL.md` with frontmatter.
- **`agents/cognee-recall.md`** — a **subagent** (`model: haiku`, `maxTurns: 3`) for deeper cross-session retrieval.
- **`scripts/`** — the hook implementation scripts + `cognee-statusline.sh` (optional status line: `cognee[local] ds=... sess=... | recall: 5s/5t/1g | saving: 1p/0t/1a`).
- Two run modes: **local mode** (`pip install cognee` + `LLM_API_KEY` + `CACHING=true`, cognee runs in-process) or **backend mode** (`COGNEE_SERVICE_URL` + `COGNEE_API_KEY`, connect to a local or cloud Cognee API server; auto-registers as `claude-code@cognee.agent`).
- **Install:** `claude --plugin-dir /path/to/cognee-integrations/integrations/claude-code` (NOT a marketplace plugin — it is a `--plugin-dir` local plugin; validate via `claude plugin validate <dir>`).

This plugin maps cognee's GraphRAG directly onto the CC session lifecycle — exactly the "Claude-Code-side hook+MCP integration" gap the operator named. It also categorizes knowledge into `user_context` / `project_docs` / `agent_actions` node-sets, which is a genuinely useful three-bucket model.

### §1.3 — Three-way comparison for the operator's cold tier

| Axis | A: `cognee-integration-claude` | B: cognee CC plugin (`cognee-memory`) | C: `cognee-mcp` |
|---|---|---|---|
| Surface | Agent-SDK Python library | CC plugin (hooks+skills+agent) | `.mcp.json` MCP server |
| **License** | **NONE** ❌ | **NONE** ❌ (`cognee-integrations` no root LICENSE) | **Apache-2.0** ✅ (cognee monorepo) |
| CC-CLI usable as-is | NO (bespoke harness) | YES (`--plugin-dir`) | YES (`claude mcp add` / `.mcp.json`) |
| Lifecycle wiring (SessionStart/PreCompact/Stop) | none | **6 hooks** (best) | none (model must call tools) |
| Auto-recall on prompt | no | **yes** (UserPromptSubmit hook) | no (model-driven) |
| PreCompact memory anchor | no | **yes** | no |
| `cardinal-rule-2` (hooks = plugin-hooks only) | n/a | ✅ self-registered by plugin (not `.claude/hooks/scripts/*.py` self-invent) | n/a (no hooks) |
| Marketplace install | no | **no** (`--plugin-dir` only) | n/a |
| Install stability on Windows | untested | untested (`python3` hook shebang — Windows needs `python` on PATH) | **prior W259 install-report: `uvx cognee-mcp` v1.0.8 HANGS the MCP `initialize` handshake on Windows** → CC respawn-loop (75 orphan processes observed 2026-05-07). Fix = `--transport http` + supervisor. |
| Maturity | 5mo stale, `pending` | active (`cognee-integrations` pushed 2026-05-12) | active (cognee monorepo, pushed daily) |
| Provenance | `topoteretes` org | `topoteretes` org | `topoteretes` org |
| Reversibility | `pip uninstall` | drop `--plugin-dir` flag | remove `.mcp.json` entry |

### §1.4 — Recommendation: which is the cold-tier bridge

**Neither `cognee-integration-claude` (A) nor a naive `uvx cognee-mcp` stdio entry (C-default) is the right cold-tier bridge.** The decision:

1. **Pathway A (`cognee-integration-claude`) — REJECT.** Category mismatch + no LICENSE + stale. Already scored ≈48 in §0.
2. **Pathway B (cognee CC plugin) — the architecturally correct shape, but BLOCKED on license.** It is the *only* pathway that closes the operator's exact stated gap (SessionStart/PreCompact/Stop lifecycle wiring + auto-recall). **But `cognee-integrations` ships NO LICENSE** → hard cardinal-rule-1 violation. It cannot be installed until topoteretes adds a LICENSE file. (Prior waves W240/W253-C reached the identical conclusion: "cognee-integrations UNLICENSED — use parent cognee directly.")
3. **Pathway C (`cognee-mcp`) — the installable cold-tier bridge, with a mandatory Windows fix.** It is Apache-2.0 (clean CR-1), it is a standard MCP server. **BUT the operator's quickstart `claude mcp add cognee uvx cognee-mcp` is the broken form** — prior W259 install evidence shows `uvx cognee-mcp` stdio hangs the MCP `initialize` handshake on Windows and triggers a CC respawn-loop. The corrected install is **`cognee-mcp --transport http --port 8000` under a process supervisor, then a `"type": "http"` `.mcp.json` entry** pointing at it.

**Net:** the operator's `claude mcp add cognee uvx cognee-mcp` quickstart is **directionally right (pathway C is correct) but mechanically wrong on Windows**. See §3 for the corrected install.

---

## §2 — Memory-catalog completeness cross-check

**Question:** beyond `cognee-integration-claude`, is every repo in the operator's ~58-repo memory catalog captured in `MEMORY-LAYER-RECONCILED-W259v4.md`? Cross-checked the reconciled §1 catalog (Tier 0/1/2/3/3B) against the operator catalog, Wave-1 `LAYER-A`, and Wave-2 `ROUND2-MISSED-W259v2`.

### §2.1 — The cognee↔CC pathway gap (this wave's primary finding)

`MEMORY-LAYER-RECONCILED-W259v4.md` Tier-3B row for `cognee-ai/cognee` says only: *"CC plugin (SessionStart/PostToolUse/UserPromptSubmit/PreCompact/SessionEnd hooks)."* That single clause is the **only** trace of the cognee↔CC integration. The reconciled artifact does **NOT** carry as scored/catalogued entries:

- **`topoteretes/cognee-integration-claude`** — the operator-flagged repo. **MISSING entirely.** (Now covered in §0; verdict REJECT-FOR-FIT.)
- **`topoteretes/cognee-integrations` / the `cognee-memory` CC plugin** — **MISSING as a distinct entry.** Only mentioned as a sub-clause of the `cognee` row. It is a *separate repo with its own (missing) license* and should be its own catalog row. (Now covered in §1.2.)
- **`cognee-mcp` install mechanics** — the reconciled §5.2 L0-substrate block names "Cognee + Kuzu/Neo4j" but never states the *bridge* install command, and does not carry the prior-wave Windows-hang finding.

### §2.2 — OTHER specific memory repos named in operator-adjacent catalogs but MISSING from RECONCILED-W259v4 §1

Cross-checking `ROUND2-MISSED-SOTA-REPOS-W259v2.md` §2 (the operator's Wave-2 missed-repo discovery table) against the reconciled §1 catalog, the following memory repos are **in the round-2 missed table but were NOT folded into `MEMORY-LAYER-RECONCILED-W259v4.md` §1**:

| Repo | Stars | Claim | Why it matters | Status in W259v4 |
|---|---|---|---|---|
| **`MemTensor/MemOS`** | ~8.4k | Local "Memory OS"; SQLite+FTS5+vector; **"CC plugin"** | Self-described Claude Code plugin — a *native-CC* memory repo, directly in-scope for L1.5 | **MISSING from §1** |
| **`MemMachine/MemMachine`** | ~4.0k | Universal memory layer; Neo4j+SQL; LangChain/LangGraph/CrewAI | Framework-agnostic agent memory; 4k★ is non-trivial | **MISSING from §1** |
| **`EverMind-AI/EverOS`** | ~3.8k | Memory OS; **93% LoCoMo**; 100M-token Sparse-Attn paper | A 93%-LoCoMo claimant absent from the LoCoMo discussion | **MISSING from §1** |
| **`memodb-io/Acontext`** | ~3.4k | "Agent Skills as memory"; no embeddings; progressive disclosure | Novel skill-as-memory pattern — relevant to the operator's skill-heavy runtime | **MISSING from §1** |
| **`zilliztech/memsearch`** | ~1.7k | Markdown+Milvus; **CC/Codex/OpenClaw/OpenCode cross-platform** | Explicitly multi-harness incl. Claude Code; Zilliz (real org) | **MISSING from §1** |
| **`neo4j-labs/agent-memory`** | ~197 | Graph-native memory; **16-tool MCP server**; LangChain/PydanticAI/ADK/Strands/CrewAI | First-party **Neo4j-labs** MCP — graph-memory, low star but authoritative org | **MISSING from §1** |

**Most operationally significant:** **`MemTensor/MemOS`** and **`zilliztech/memsearch`** — both advertise *native Claude Code* integration and are absent from the reconciled L1.5 catalog. `MemOS` in particular (8.4k★, CC plugin, local SQLite+FTS5+vector) is a credible pilot-lane candidate that the W259v4 reconciliation missed. These six are tracked in `ROUND2-MISSED-SOTA-REPOS-W259v2.md` but were never reconciled into the authoritative `MEMORY-LAYER-RECONCILED-W259v4.md` §1 catalog — a **Wave-4 reconciliation gap**.

### §2.3 — Operator-catalog Tier 0/1/2/3 entries: otherwise well-captured

The reconciled artifact's §1 catalog (Tier 0 ×9, Tier 1 ×18, Tier 2 ×9, Tier 3 ×8, Tier 3B ×14 = ~58) **is comprehensive** for the operator's named catalog: it correctly captures the three name-collision warnings (OpenMemory ×3, agentmemory ×2, claude-mem/supermemory), all the Tier-0 Anthropic-native primitives, claude-mem / claude-supermemory / claude-subconscious / hindsight / claude-obsidian / basic-memory / rohitg00-agentmemory / mem0-claude-code-plugin in Tier 1, the MCP servers in Tier 2, and the engine battleground (OMEGA/Mastra/Hindsight/mem0/Zep/Letta/supermemory) in Tier 3. No *other* gaps found beyond the cognee-pathway trio (§2.1) and the six round-2-missed repos (§2.2).

**Net §2 finding:** beyond `cognee-integration-claude`, the missing repos are **`topoteretes/cognee-integrations` (the `cognee-memory` CC plugin, as a distinct row)** + **6 repos from the Wave-2 round-2 missed table that were never reconciled** (`MemTensor/MemOS`, `MemMachine/MemMachine`, `EverMind-AI/EverOS`, `memodb-io/Acontext`, `zilliztech/memsearch`, `neo4j-labs/agent-memory`).

---

## §3 — Corrected L1.5 cold-tier-bridge recommendation

This section supersedes `MEMORY-LAYER-RECONCILED-W259v4.md` §5.2's cold-tier sub-block (the `L0 SUBSTRATE → Cognee + Kuzu/Neo4j` lines).

### §3.1 — The operator's stated trilayer + the real gap

- **热 (hot)** = OpenViking — working-memory tier
- **暖 (warm)** = Qdrant — vector substrate
- **冷 (cold)** = Cognee (GraphRAG) — cold-storage tier. *Operator catalog says "Cognee/FalkorDB"; per DeepWiki, **cognee does NOT support FalkorDB** — it supports Kuzu (default) / Neo4j / Neptune / Postgres. If FalkorDB is load-bearing, FalkorDB belongs with **Graphiti**, which does support it.*

The gap is the **CC-side bridge** that wires cognee's cold-tier GraphRAG into the CC `/loop` session lifecycle.

### §3.2 — Corrected cold-tier-bridge install

```
冷 / COLD TIER  — cognee GraphRAG  (corrected L1.5 bridge)

  ENGINE (substrate, Apache-2.0 — install unconditionally):
    pip install "cognee"            # in Z:\venvs\claude (Python 3.13 — satisfies >=3.13)
    graph backend = Kuzu (default, embedded — zero-ops, best for solo Windows operator)
                    OR Neo4j (if multi-process graph access needed)
    NOTE: NOT FalkorDB. If FalkorDB is load-bearing, that is a Graphiti pairing, not cognee.

  BRIDGE — ranked, install the first that clears its gate:

  ┌── OPTION 1 (install NOW — the correct cold-tier bridge) ─────────────┐
  │ cognee-mcp  (pathway C — Apache-2.0, clean cardinal-rule-1)          │
  │                                                                      │
  │  ❌ DO NOT use the operator-quickstart form:                         │
  │       claude mcp add cognee uvx cognee-mcp                           │
  │     → prior W259 install-report: uvx cognee-mcp stdio HANGS the      │
  │       MCP `initialize` handshake on Windows → CC respawn-loop        │
  │       (75 orphan processes observed 2026-05-07).                     │
  │                                                                      │
  │  ✅ CORRECTED install — HTTP transport + supervisor:                 │
  │     1. cognee-mcp --transport http --port 8000   (run supervised:    │
  │        pm2 / Servy / mcp-compose gateway — per cardinal-rule-2 a     │
  │        supervised long-running service, not a CC-spawned stdio child)│
  │     2. .mcp.json entry:                                              │
  │        "cognee": { "type": "http", "url": "http://localhost:8000" }  │
  │     3. env: LLM_API_KEY (or a local LLM provider to keep cold-tier   │
  │        ingest fully local — avoids D21 data-boundary egress)         │
  │  Exposes cognify / search / remember / recall / forget / improve     │
  │  as MCP tools — model-driven recall (no auto-inject hooks).          │
  └──────────────────────────────────────────────────────────────────────┘

  ┌── OPTION 2 (architecturally BEST — but BLOCKED on license) ──────────┐
  │ cognee CC plugin  "cognee-memory" v0.2.0  (pathway B)                │
  │   topoteretes/cognee-integrations/integrations/claude-code           │
  │                                                                      │
  │  This is the ONLY pathway that closes the operator's exact stated    │
  │  gap — 6 lifecycle hooks (SessionStart inject / UserPromptSubmit     │
  │  auto-recall / PostToolUse capture / Stop retain / PreCompact        │
  │  memory-anchor / SessionEnd graph-sync) + 3 skills + 1 haiku         │
  │  subagent. Install: claude --plugin-dir <path>.                      │
  │                                                                      │
  │  ⛔ BLOCKED: topoteretes/cognee-integrations ships NO LICENSE file   │
  │     → hard cardinal-rule-1 violation. Prior waves W240 + W253-C      │
  │     reached the identical block. DO NOT install until topoteretes    │
  │     adds a LICENSE (track upstream; flip to PRIMARY bridge the day   │
  │     a permissive LICENSE lands — it would dominate Option 1).        │
  │  Also: hooks shell out via `python3` — on Windows ensure `python3`   │
  │     resolves on PATH (or the operator must patch the shebang, which  │
  │     would itself be a fork = avoid; another reason to wait for a     │
  │     clean licensed release).                                         │
  └──────────────────────────────────────────────────────────────────────┘

  ┌── REJECTED ─────────────────────────────────────────────────────────┐
  │ cognee-integration-claude  (pathway A) — composite ≈ 48,             │
  │   REJECT-FOR-FIT. Category mismatch (Claude Agent SDK library, not   │
  │   a CC integration) + no LICENSE + 5 months stale + migration_status │
  │   pending. Record as REJECT so future waves don't re-surface it.     │
  └──────────────────────────────────────────────────────────────────────┘
```

### §3.3 — Decision summary

| Question | Answer |
|---|---|
| Is `cognee-integration-claude` the cold-tier bridge? | **No.** It is a Claude Agent SDK Python library, not a CC integration. Composite ≈ 48 → REJECT-FOR-FIT. |
| `cognee-mcp` vs `cognee-integration-claude`? | **`cognee-mcp` wins decisively** — Apache-2.0 (vs no-license), real `.mcp.json` MCP server (vs Agent-SDK-only), actively maintained (vs 5mo stale). |
| Is the operator's `claude mcp add cognee uvx cognee-mcp` correct? | **Directionally yes, mechanically no on Windows.** `uvx cognee-mcp` stdio hangs the handshake → respawn-loop. Use `--transport http` + supervisor + `"type":"http"` `.mcp.json` instead. |
| Best-possible bridge? | The **`cognee-memory` CC plugin** (pathway B) — 6 lifecycle hooks close the exact stated gap — **but it is license-blocked** (`cognee-integrations` has no LICENSE). Install `cognee-mcp` (Option 1) now; flip to the plugin if/when topoteretes licenses it. |
| Other missing memory repos? | `topoteretes/cognee-integrations` (as a distinct row) + 6 Wave-2-round-2 repos never reconciled into W259v4 §1: `MemTensor/MemOS`, `MemMachine/MemMachine`, `EverMind-AI/EverOS`, `memodb-io/Acontext`, `zilliztech/memsearch`, `neo4j-labs/agent-memory`. |
| Cross-model gate (CR-3) | Single-agent Wave-6 audit. Per cardinal-rule-3, **codex T1 Path P review required before committing the `cognee-mcp` HTTP entry to `.mcp.json` + supervisor config.** |

---

## §4 — Document boundary

- **`cognee-integration-claude`**: Claude **Agent SDK** Python library (PyPI v0.1.1), `topoteretes` org, **no LICENSE**, 5 months stale, `inventory.yml` marks it `migration_status: pending`. 23-dim composite **≈ 48 → REJECT-FOR-FIT (category mismatch — not a CC integration)**. The operator was correct it was missing from the catalog; correct disposition is a REJECT row.
- **Three cognee↔Claude pathways** disambiguated: (A) `cognee-integration-claude` Agent-SDK lib — REJECT; (B) `cognee-integrations/integrations/claude-code` = the `cognee-memory` CC plugin v0.2.0, 6 hooks + 3 skills + 1 subagent — architecturally best but **license-blocked** (no root LICENSE); (C) `cognee-mcp` inside the Apache-2.0 `cognee` monorepo — **the installable cold-tier bridge**.
- **Corrected cold-tier install**: NOT `claude mcp add cognee uvx cognee-mcp` (stdio handshake hangs on Windows → respawn-loop per prior W259 install-report). USE `cognee-mcp --transport http --port 8000` under a supervisor + `"type":"http"` `.mcp.json`. Graph backend = Kuzu (embedded default) — **cognee does NOT support FalkorDB** (FalkorDB belongs with Graphiti).
- **Catalog completeness**: beyond `cognee-integration-claude`, `MEMORY-LAYER-RECONCILED-W259v4.md` §1 is missing `topoteretes/cognee-integrations` as a distinct row + 6 memory repos from `ROUND2-MISSED-SOTA-REPOS-W259v2.md` never reconciled (`MemTensor/MemOS`, `MemMachine/MemMachine`, `EverMind-AI/EverOS`, `memodb-io/Acontext`, `zilliztech/memsearch`, `neo4j-labs/agent-memory`). Tier 0/1/2/3 are otherwise comprehensive.
- **Supersedes**: `MEMORY-LAYER-RECONCILED-W259v4.md` §5.2 cold-tier-bridge sub-block.
- **Cross-model consensus (CR-3)**: single-agent Wave-6 audit; codex T1 Path P review required before the `cognee-mcp` HTTP `.mcp.json` entry is committed.

**Artifact:** `Z:\claude-sota-installed\docs\architecture\W259-grand-catalog\03-deepdive\COGNEE-INTEGRATION-CLAUDE-W259v6.md`
