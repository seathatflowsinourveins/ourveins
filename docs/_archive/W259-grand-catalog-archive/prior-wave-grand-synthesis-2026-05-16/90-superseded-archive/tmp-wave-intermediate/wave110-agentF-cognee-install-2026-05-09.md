---
title: Wave 110 Agent F — cognee MCP install path with Ollama-local embeddings
status: AUTHORITATIVE
date: 2026-05-09
agent: sota-researcher (Wave 110 Agent F)
---

# VERDICT: REJECT-FOR-FIT (SUPERSEDED-BY-X)

**Score**: SRA D1-D10 = 6/10 structurally sound, but **D6 use-case + D9 incumbent-precedent FAIL** drive REJECT.

**One-line**: cognee duplicates graphiti L3 temporal-KG functionality already INSTALLED in eee; existing harness rule (`agent-harness-fit-verification.md`) literally cites `cognee → Graphiti L3 verdict` as the canonical SUPERSEDED-BY-X precedent. Recommended action: resolve graphiti MCP wiring (Ship 2N-batch3-B blocker) FIRST before re-auditing cognee.

---

## Section 1 — Pinned cite anchors

| Item | Value | Source |
|---|---|---|
| Canonical org | `topoteretes/cognee` | https://github.com/topoteretes/cognee |
| License | Apache-2.0 | `pyproject.toml:license` |
| cognee version | 1.0.9 | PyPI 2026-05-08T15:34:19 |
| cognee-mcp version | 0.5.4 | `cognee-mcp/pyproject.toml:version` |
| Python requires | `>=3.10,<3.15` | pyproject.toml |
| Recent commits | active 2026-05-08 | github API per_page=10 returned 10 commits |
| Authors | Vasilije Markovic + Boris Arzentar (cognee core) + Igor Ilic + Laszlo Hajdu (mcp) | pyproject.toml authors |
| MCP entrypoint | `cognee-mcp/src/server.py` | direct fetch |
| MCP framework | `mcp.server.FastMCP("Cognee")` | server.py:38 |
| Transports | stdio (default) / sse / http | server.py CLI args |

---

## Section 2 — SRA D1-D10 convergence-gate scoring

Per `.claude/rules/sota-research-architecture.md` (Ship 2X codification HEAD `3322b58`):

| # | Dimension | Verdict | Evidence |
|---|---|---|---|
| **D1** | License-use-class precision | **PASS** | Apache-2.0 (permissive); library-link via Python pkg or library-call via cognee-mcp Docker |
| **D2** | Freshness | **PASS** | v1.0.9 published 2026-05-08 (24 hours ago); cognee-mcp v0.5.4 same day |
| **D3** | Maintenance signal | **PASS** | 10 commits past 24-48h window per github API; multiple contributors (Markovic+Arzentar+Ilic+Hajdu) |
| **D4** | Convergence-gate Axis 1 ≥3 distinct orgs | **PARTIAL** | Single-org (topoteretes); ecosystem mentions in dbhub MCP audit + agent-harness-fit-verification.md |
| **D5** | Named-T2 practitioner endorsements | **WEAK** | ProductHunt + Trendshift badges only; no Boris Cherny / Karpathy / Simon Willison endorsement found |
| **D6** | Use-case compatibility | **FAIL** | **DUPLICATES graphiti L3 temporal-KG already INSTALLED**. cognee = "memory control plane combining embeddings + graphs". Graphiti = temporal-KG with FalkorDB. Both L3 layer. eee already at L1+L2+L3 stack. |
| **D7** | Plugin-namespace probe (Probe 4) | **PASS** | No `cognee` in `.mcp.json` enabled servers (`['github', 'context7', 'deepwiki', 'playwright', 'repomix', 'serena', 'memory']`); not in any loaded plugin |
| **D8** | Mode-harness shape (Probe 5) | **PASS** | autonomous /loop compatible (stdio MCP); no HARD-GATE; lean tool surface |
| **D9** | Failure-mode awareness | **FAIL** | Existing harness rule `agent-harness-fit-verification.md` literally cites: `SUPERSEDED-BY-X — cognee → Graphiti L3 verdict`. n=1 historical decision precedent against cognee adoption |
| **D10** | Replacement viability | **FAIL** | Replacing graphiti with cognee requires retiring v0.29.0 install + FalkorDB container + 0.6.4 MCP wiring work; no marginal benefit identified |

**Score**: 6 PASS + 1 PARTIAL + 1 WEAK + 2 FAIL = 6/10 structurally PASS but D6+D9 are LOAD-BEARING gates that override.

---

## Section 3 — Backend dependencies (concrete)

cognee-mcp v0.5.4 dependency: `cognee[postgres-binary,docs,neo4j]>=1.0.0,<2.0.0` (default extras include neo4j). Optional dependency groups in cognee pyproject:
- **`postgres` / `postgres-binary`** — PostgreSQL (eee has langfuse-postgres @ :15432 but credential-isolated)
- **`neo4j`** — Neo4j (eee has FalkorDB @ :16379 — Redis-compatible, NOT Neo4j-compatible)
- **`chromadb`** — ChromaDB vector store (eee has Qdrant @ :6600 — different)
- **`ollama`** — Local model support (PRESENT)
- **Default vector DB** — `lancedb` (file-based, no container needed)
- **Default graph DB** — file-based (NetworkX KG, no container needed)

**Conflict check**: cognee-mcp default port `8000` (HTTP transport) — eee not using :8000, no conflict.

---

## Section 4 — Ollama integration (CONFIRMED)

cognee `.env.template` explicit Ollama config block:

```bash
########## Local LLM via Ollama ###############################################
LLM_API_KEY="ollama"
LLM_MODEL="llama3.1:8b"
LLM_PROVIDER="ollama"
LLM_ENDPOINT="http://localhost:11434/v1"
EMBEDDING_PROVIDER="ollama"
EMBEDDING_MODEL="nomic-embed-text:latest"
EMBEDDING_ENDPOINT="http://localhost:11434/api/embed"
EMBEDDING_DIMENSIONS=768
HUGGINGFACE_TOKENIZER="nomic-ai/nomic-embed-text-v1.5"
```

**eee Ollama state**:
- Endpoint: `http://127.0.0.1:11700/api/embeddings` (port 11700 NOT 11434 default)
- `qwen3-embedding:0.6b` PRESENT, returns 1024-dim vectors (verified live)
- Other embedding models: `qwen3-embedding:4b` (2381 MB), `qwen3-embedding:8b` (4460 MB), `qwen3-embedding:8b-tuned`, `qwen3-embedding:4b-tuned`
- LLM models: qwen3.6:35b, qwen3-coder:30b, devstral-small-2:24b, gemma4:vision

**No `nomic-embed-text` installed locally**. Would need `ollama pull nomic-embed-text` (768-dim) OR adapt cognee config to qwen3-embedding (1024-dim).

---

## Section 5 — Use-case duplication evidence (D6+D9 load-bearing FAIL)

### Existing harness rule precedent

`Z:/claude-sota-installed/.claude/rules/agent-harness-fit-verification.md` Probe 7 discriminator (verbatim):

> `SUPERSEDED-BY-X` (related to Probes 4/5): a workflow exists, but an incumbent primitive already owns it or was selected by prior verdict (e.g., **cognee → Graphiti L3 verdict**)

This is an n=1 historical decision precedent against cognee, codified into the rule layer. The rule cites cognee as the EXEMPLAR for SUPERSEDED-BY-X classification.

### Functional overlap

| Capability | cognee | graphiti (INSTALLED) |
|---|---|---|
| Knowledge graph | NetworkX default / Neo4j optional | FalkorDB (Redis-graph) |
| Embeddings | LiteLLM-backed (any provider) | OpenAI default; Ollama support v0.29+ |
| Vector store | LanceDB default / Chromadb optional / Qdrant via plugin | Embedded in graph |
| Memory abstraction | "control plane for agents" | "temporal-KG for agents" |
| MCP entry | cognee-mcp 0.5.4 | mcp_server/main.py (cloned) |
| eee status | NOT INSTALLED | INSTALLED (graphiti-core 0.29.0 + FalkorDB UP) |

Both target **L3 temporal-KG / agent-memory** layer. Per `kiss-dry-yagni.md` Must-Never #4 (no duplicate functionality).

### Active blocker on graphiti incumbent

Graphiti is INSTALLED but NOT WIRED in `.mcp.json` per CLAUDE.md L213:
> Graphiti MCP server cloned at `Z:/claude-sota-installed/.local/graphiti/mcp_server/` (HEAD c427615; entry-point main.py); `.mcp.json` wiring queued for next fire (requires NEO4J_URI or FalkorDB-mode env config + OPENAI_API_KEY).

Same OPENAI_API_KEY blocker would apply to cognee unless Ollama-only config used. Installing cognee BEFORE resolving graphiti wiring would compound the L3 unwired-state, not solve it.

---

## Section 6 — IF-OPERATOR-OVERRIDES install steps (CONDITIONAL — not recommended)

If the operator decides to install cognee anyway (e.g., to evaluate as graphiti-replacement under Probe 7.b STUDY-PILOT after explicit graphiti REJECT), the plan would be:

### 6.1 Pre-install Ollama embedding model

```bash
# qwen3-embedding:0.6b is already present (1024-dim) — adapt cognee EMBEDDING_DIMENSIONS to match
# OR pull nomic-embed-text for canonical cognee path:
ollama pull nomic-embed-text
```

### 6.2 Install cognee-mcp from canonical upstream (CR-6 official native channel)

```bash
# Pinned version per CR-9 (NOT @latest)
cd Z:/claude-sota-installed/.local
git clone --depth 1 --branch v1.0.9 https://github.com/topoteretes/cognee.git
cd cognee/cognee-mcp
pip install uv
uv sync --dev --all-extras --reinstall
```

### 6.3 Configure `.env` for Ollama-local-only mode

```bash
# Z:/claude-sota-installed/.local/cognee/cognee-mcp/.env
LLM_API_KEY="ollama"
LLM_MODEL="qwen3.6:35b"
LLM_PROVIDER="ollama"
LLM_ENDPOINT="http://127.0.0.1:11700/v1"
EMBEDDING_PROVIDER="ollama"
EMBEDDING_MODEL="qwen3-embedding:0.6b"
EMBEDDING_ENDPOINT="http://127.0.0.1:11700/api/embed"
EMBEDDING_DIMENSIONS=1024
# Default LanceDB + NetworkX = file-based, no Postgres/Neo4j needed
```

### 6.4 `.mcp.json` entry (stdio transport)

```json
"cognee": {
  "type": "stdio",
  "command": "Z:/claude-sota-installed/.local/cognee/cognee-mcp/.venv/Scripts/python.exe",
  "args": ["Z:/claude-sota-installed/.local/cognee/cognee-mcp/src/server.py", "--transport", "stdio"],
  "env": {
    "PYTHONUNBUFFERED": "1"
  }
}
```

### 6.5 Verify

```bash
# Inside CC after restart, ToolSearch should surface mcp__cognee__cognify / search / prune / etc.
```

### 6.6 Rollback (per launch-discipline.md §1 Reversible)

```bash
# Remove .mcp.json entry; remove venv; rm -rf .local/cognee/
```

---

## Section 7 — Anti-patterns (D9 explicit)

1. **Adopt cognee while graphiti L3 wiring queued** — produces 2 unwired L3 layers + slot-occupation pattern documented in `agent-harness-fit-verification.md` Probe 7 (disabled-MCP cohort historic n=6). Wave 27 caveat: "MCP slot occupation without operational driver — historically the disabled-MCP cohort pattern".
2. **Adopt cognee as graphiti replacement without Probe 7.b 5-clause check** — would violate `agent-harness-fit-verification.md` hard precondition "DEMAND-CREATES-NEW-WORKFLOW.b is ONLY available for structurally sound primitives that create a genuinely new, non-duplicative workflow". cognee-vs-graphiti is duplicative L3, not new-workflow.
3. **Install cognee@latest without version pin** — violates CR-9 install-risk discipline. Pinned `v1.0.9` required.
4. **Use OpenAI embeddings (cognee default)** — defeats operator-confirmed Ollama-only scope; introduces OPENAI_API_KEY dependency that already blocks graphiti.

---

## Section 8 — HONEST-NON-FINDING declarations

Per `synthesis-layer-verify.md §Reporting categories`:

1. **HNF on D5 named-T2 endorsement strength**: I did not find specific dated artifacts from named-T2 practitioners (Karpathy / Cherny / Willison / Anthropic engineers) endorsing cognee. ProductHunt + Trendshift badges are not equivalent. Re-verify with deeper web search if STUDY-PILOT path opens.

2. **HNF on D4 Axis-1 ≥3-distinct-orgs**: convergence-gate not closed. Only topoteretes single-org cite verified. Cognee community-plugin ecosystem exists (`cognee-community`, `cognee-openclaw`, `cognee-integrations/claude-code`) but these are same-org satellites.

3. **HNF on cognee-vs-graphiti operational benchmark**: no measured benchmark comparing cognee L3 retrieval vs graphiti L3 retrieval on agent-memory tasks found in upstream docs or third-party reports. Decision is structural (L3 duplication) not benchmark-driven.

4. **HNF on Wave 50 historical decision detail**: 4 file paths in `docs/outer research/wave52/` mention cognee but I did not deep-read for the exact rationale that produced the `agent-harness-fit-verification.md` SUPERSEDED-BY-X codification. Treating as authoritative since rule layer is the artifact.

---

## Section 9 — Recommended action

**Action 1 (highest priority)**: Resolve Ship 2N-batch3-B graphiti MCP wiring blocker first.
- Decision needed: FalkorDB-mode env config + Ollama embeddings (eliminate OPENAI_API_KEY dependency)
- Add `.mcp.json` entry for graphiti pointing at `Z:/claude-sota-installed/.local/graphiti/mcp_server/main.py`
- Smoke-probe `mcp__graphiti__add_memory` + `mcp__graphiti__search_memory_nodes`

**Action 2 (after 6+ months operational data on graphiti)**: Re-audit cognee at convergence-gate Axis-3 ≥6mo burn-in. If graphiti shows specific gaps cognee uniquely solves (e.g., better cognify-ingestion of unstructured docs, or instructor/baml structured-output advantage), file Probe 7.b STUDY-PILOT 5-clause check.

**Action 3 (DEFER — anti-pattern)**: Do NOT install cognee in this Wave 110 cycle. The harness rule layer already encoded the precedent.

---

## Section 10 — Cite trail

| Cite | Path | Verified |
|---|---|---|
| cognee repo | https://github.com/topoteretes/cognee | 2026-05-09 via github API |
| cognee PyPI | https://pypi.org/pypi/cognee/json | 2026-05-09; v1.0.9 |
| cognee `.env.template` | https://raw.githubusercontent.com/topoteretes/cognee/main/.env.template | 2026-05-09 |
| cognee-mcp pyproject | https://raw.githubusercontent.com/topoteretes/cognee/main/cognee-mcp/pyproject.toml | 2026-05-09 |
| cognee-mcp server.py | https://raw.githubusercontent.com/topoteretes/cognee/main/cognee-mcp/src/server.py | 2026-05-09 |
| Ollama local probe | http://127.0.0.1:11700/api/embeddings | 2026-05-09 LIVE |
| harness rule SUPERSEDED-BY-X | `Z:/claude-sota-installed/.claude/rules/agent-harness-fit-verification.md` | 2026-05-09 grep |
| graphiti install state | `Z:/claude-sota-installed/CLAUDE.md` Memory Stack section | 2026-05-09 read |
| existing .mcp.json | `Z:/claude-sota-installed/.mcp.json` | 2026-05-09 read |
| kiss-dry-yagni Must-Never #4 | `Z:/claude-sota-installed/.claude/rules/kiss-dry-yagni.md` | 2026-05-09 grep |

VERDICT: REJECT-FOR-FIT (SUPERSEDED-BY-X by graphiti L3 incumbent) — defer to graphiti wiring resolution first.
