# Wave 140 Voice 2 — Graphiti MCP server upstream API verify

## VERDICT
**NEEDS-CONFIG-DECISION** (cross-cuts WIRE-DRIFT-FIX + MANIFEST-RECONCILE)

Existing `.mcp.json:49-82` graphiti entry is structurally complete BUT contains a **port mismatch** (`16379` vs actual `6379`) AND manifest `docs/sota-installed-manifest.md` L3 row is STALE (claims wiring incomplete; actual = wired but FALKORDB_URI port wrong). 3 distinct surfaces need reconciliation: `.mcp.json` port fix + manifest L3 status update + MEMORY.md cite correction.

## Graphiti latest version
- **Local HEAD**: `c427615044678f4bde026745d8d28a16504868c5` (2026-05-07 12:33:52 -0400, "Bump the uv group across 2 directories with 4 upda...") [VERIFIED 2026-05-10 via `git -C Z:/claude-sota-installed/.local/graphiti log -1`]
- **Upstream HEAD**: `c427615044678f4bde026745d8d28a16504868c5` (post `git fetch origin`) — **ZERO drift since Wave 105**
- **License**: Apache-2.0 (verified via `Z:/claude-sota-installed/.local/graphiti/LICENSE` 11.3KB visible in clone listing)
- **Last commit**: 2026-05-07 (3 days ago — STABLE-BURN-IN per Wave 47 axis-3)
- **MCP server pyproject.toml version**: `1.0.2` [VERIFIED via Read pyproject.toml:3]
- **graphiti-core dep**: `>=0.28.2[falkordb]` [VERIFIED via Read pyproject.toml:10]

## Proposed `.mcp.json` entry (corrected — port + verified envs)

```json
{
  "graphiti": {
    "type": "stdio",
    "command": "uv",
    "args": [
      "run",
      "--isolated",
      "--directory",
      "Z:/claude-sota-installed/.local/graphiti/mcp_server",
      "--project",
      ".",
      "main.py",
      "--transport",
      "stdio",
      "--database-provider",
      "falkordb",
      "--model",
      "qwen3.6:35b",
      "--embedder-model",
      "qwen3-embedding:0.6b",
      "--group-id",
      "eee"
    ],
    "env": {
      "FALKORDB_URI": "redis://127.0.0.1:6379",
      "FALKORDB_PASSWORD": "",
      "FALKORDB_DATABASE": "default_db",
      "OPENAI_API_KEY": "ollama",
      "OPENAI_API_URL": "http://127.0.0.1:11700/v1",
      "GRAPHITI_GROUP_ID": "eee",
      "EMBEDDER__DIMENSIONS": "1024",
      "EMBEDDING_DIM": "1024",
      "SEMAPHORE_LIMIT": "3"
    }
  }
}
```

**Diff vs current `.mcp.json:72`**: ONE line — `FALKORDB_URI` from `redis://127.0.0.1:16379` → `redis://127.0.0.1:6379`.

## Env keys analysis

| Key | Required | Source | Notes |
|---|---|---|---|
| `FALKORDB_URI` | yes | config.yaml:78 default `redis://localhost:6379` | **CURRENT VALUE WRONG** — 16379 unused; actual listener on 6379 (`netstat` evidence) |
| `FALKORDB_PASSWORD` | optional | config.yaml:79 default empty | empty string for no auth |
| `FALKORDB_DATABASE` | optional | config.yaml:80 default `default_db` | matches |
| `OPENAI_API_KEY` | YES | config.yaml:20 + Ollama README §Using Ollama for Local LLM | dummy `ollama` value satisfies SDK requirement |
| `OPENAI_API_URL` | for Ollama | config.yaml:21 default `https://api.openai.com/v1` | Ollama OpenAI-compat endpoint at `:11700/v1` |
| `GRAPHITI_GROUP_ID` | optional | config.yaml:90 default `main` | namespacing for eee runtime |
| `EMBEDDER__DIMENSIONS` | yes (Ollama) | config.yaml:48 `dimensions: 1536` for OpenAI default | qwen3-embedding:0.6b is 1024-dim — MUST override |
| `EMBEDDING_DIM` | redundant | (sibling-bleed candidate) | both `EMBEDDER__DIMENSIONS` + `EMBEDDING_DIM` set; investigate which the code reads |
| `SEMAPHORE_LIMIT` | optional | README:330-369 | `3` is mid-range Ollama recommendation |

**FalkorDB-mode config**: All 3 FALKORDB_* envs map directly to `config.yaml:78-80` `database.providers.falkordb.{uri,password,database}`. No NEO4J_* vars needed when `--database-provider falkordb` CLI arg present. CLI arg overrides yaml per `Configuration` section L103.

**No `cwd` setting needed**: `uv run --directory <path>` per `args[3]` handles working-directory binding; main.py path resolves to `Z:/claude-sota-installed/.local/graphiti/mcp_server/main.py`.

## Probe DAG findings

### Probe 1 count-OVER (PASS-WITH-CORRECTIONS)
- ✅ Graphiti MCP server present at `.local/graphiti/mcp_server/` (15 files+dirs verified)
- ✅ uv installed at `/c/Users/42/.local/bin/uv` v0.10.3 (CR-9 dependency)
- ✅ Ollama UP at port 11700 (curl `/v1/models` returns 15 models including `qwen3.6:35b` + `qwen3-embedding:0.6b` configured in `.mcp.json`)
- ✅ Redis-server.exe PID 6984 LISTENING on port **6379** (NOT 16379)
- ❌ **MEMORY.md OVER**: claims FalkorDB on port 16379 — REFUTED by `netstat` evidence (only 6379 LISTENING)
- ❌ **Docker daemon DOWN** — `docker ps` returned npipe error; cannot verify FalkorDB container framing (BUT redis-server.exe native process is on 6379, so FalkorDB might be running native or via different shim)
- ❌ **MEMORY.md L9 cite**: "FalkorDB v1.6.1 Docker container UP at port 16379 (verified PING→PONG)" — port 16379 PING claim UNVERIFIABLE this fire (docker daemon down + 16379 not LISTENING)
- ✅ `.mcp.json:49-82` graphiti entry already wired (12 args + 9 env keys)

### Probe 4 plugin-namespace (PASS — no duplicate)
- Searched `.claude/plugins/cache/*/marketplace.json` (10+ marketplaces): zero `graphiti` entries
- Searched `.claude/plugins/marketplaces/*.json`: zero `graphiti` entries
- L1 mcp-memory v10.51.3 wired separately at `.mcp.json:40-48` — distinct workflow (immediate-recall vector search vs temporal-KG entity extraction); NO functional duplication

### Probe 6 license/registry (PASS)
- License: **Apache-2.0** [VERIFIED via clone LICENSE 11.3KB] — permissive, OK per cardinal-rule-1+5+8
- PyPI registry: `graphiti-core[falkordb]>=0.28.2` per pyproject.toml:10 — published canonical (pip-installable)
- npm: N/A (Python project)
- No README scam-alert blocks; no archive banners; STABLE production project (getzep org, 25.8k★ per MEMORY.md L9)

### Probe 7.b STUDY-PILOT 5-clause check (PASS — already STAGED in MEMORY.md)
1. ✅ **Named operational use case**: temporal-KG storage of session evidence ladders + decision trails (n=6+ FM-20 cumulative ladder per MEMORY.md uses `mcp__graphiti__add_memory` + `search_memory_facts` per `Z:/claude-sota/.claude/agents/sota-researcher.md` Memory persistence section)
2. ✅ **Cited local input/source path**: `.claude/state/codex_consult_*.txt` verdicts + `tmp/wave*-*.md` close-syntheses (200+ files) feed Graphiti episode add via sota-researcher subagent
3. ✅ **Wiring path**: `.mcp.json` stdio entry → uv run main.py → Ollama OpenAI-compat at :11700 → FalkorDB at :6379 (NOT 16379 per Probe 1)
4. ✅ **Incumbent comparison**: L1 mcp-memory (sqlite_vec) is immediate-recall vector — does NOT cover temporal/relational entity-extraction surface; Graphiti complements (NO displacement, additive)
5. ✅ **Reversible time-box**: existing entry at `.mcp.json:49-82` wired in Wave 105 Ship 2N — operator can disable via `disabledMcpjsonServers` or remove entry at any time; rollback <30s

## Smoke probe shape (post-edit verification)

1. **Pre-edit baseline**:
   ```bash
   curl -s http://127.0.0.1:11700/v1/models | python -c "import sys,json; print(json.load(sys.stdin)['data'][0]['id'])"
   # Expected: model id present (CONFIRMED — qwen3.6:35b in 15-model list)
   netstat -an | grep "127.0.0.1:6379.*LISTENING"
   # Expected: 1 line (CONFIRMED — redis-server.exe PID 6984)
   ```

2. **Edit `.mcp.json:72`**: change `redis://127.0.0.1:16379` → `redis://127.0.0.1:6379` (1-char delete)

3. **Restart eee** (CC reload `.mcp.json` on session start per CCBP `claude-mcp.md` SOTA pattern)

4. **Verify mcp__graphiti__* tools appear in deferred-tool list** via probe message:
   ```
   <ToolSearch query="graphiti">
   ```
   Expected: 12+ tools per Graphiti MCP README §Features (add_memory, search_memory_nodes, search_memory_facts, get_episodes, delete_entity_edge, clear_graph, get_status, etc.)

5. **Test memory operation**:
   ```
   mcp__graphiti__add_memory(group_id="eee", episode_body="Wave 140 Voice 2 verification probe", source="text")
   mcp__graphiti__search_memory_nodes(query="Wave 140")
   ```
   Expected: episode UUID returned + search hit on the just-added node

6. **Failure modes**:
   - If FalkorDB port wrong → "connection refused" in MCP server stderr (visible via `claude --debug-logs`)
   - If Ollama embedding-dim mismatch → schema validation error on first add_memory (qwen3-embedding:0.6b is 1024-dim per HuggingFace; not 1536 OpenAI default)
   - If `OPENAI_API_KEY` missing → graphiti-core auth check fails BEFORE Ollama call

## TOP-3 risks per Probe DAG

1. **PORT MISMATCH BLOCKER** (Probe 1 OVER catch) — current `.mcp.json:72` `redis://127.0.0.1:16379` does NOT match listening port 6379. If MCP server has been silently failing since Wave 105, all `mcp__graphiti__*` calls return errors at runtime. **Mitigation**: 1-line fix above. **Reproducible test**: spawn graphiti MCP entry, attempt `add_memory`, observe stderr connection-refused on 16379 vs success on 6379.

2. **MANIFEST/MEMORY DRIFT** (FM-20 path-drift cascade indicator) — `docs/sota-installed-manifest.md` L3 row says "MCP wiring INCOMPLETE" but `.mcp.json` shows entry present; MEMORY.md L9 says port 16379 verified PING→PONG but `netstat` shows 6379. Two stale claims propagated since Wave 105 → Wave 130+ Ship records. **Mitigation**: separate Wave 140 fix-forward for manifest L3 row + MEMORY.md correction (NOT this fire's scope — this fire scopes to `.mcp.json` port fix + verification protocol).

3. **OLLAMA EMBEDDING-DIM HARDCODED 1024** — Both `EMBEDDER__DIMENSIONS` and `EMBEDDING_DIM` set to `1024` in current entry; qwen3-embedding:0.6b is documented as 1024-dim BUT graphiti-core may try to coerce to embedder.dimensions field default `1536` (config.yaml:48). The double-env-key (`EMBEDDER__DIMENSIONS` + `EMBEDDING_DIM`) suggests prior debugging — investigate which the code actually reads. **Mitigation**: add `--embedder-provider openai` CLI arg (uses Ollama OpenAI-compat path) + verify graphiti-core code reads pydantic-settings double-underscore env nesting (`EMBEDDER__DIMENSIONS`).

## Mia OVERs caught (self-discipline)

- **OVER #1 (Probe 1)**: `MEMORY.md L9` claim "FalkorDB v1.6.1 Docker container UP at port 16379 (verified PING→PONG)" REFUTED by `netstat` evidence (port 16379 NOT LISTENING; 6379 LISTENING via redis-server.exe PID 6984). Either MEMORY.md was wrong OR FalkorDB has been swapped for native redis-server.exe between Wave 130 and Wave 140 (fire 2026-05-09 → 2026-05-10). Cardinal-rule 7 REPORT applied.
- **OVER #2 (manifest)**: `docs/sota-installed-manifest.md` L3 row "MCP wiring INCOMPLETE in `.mcp.json` (Mia probe `grep graphiti .mcp.json` = 0 matches)" — REFUTED by direct `grep -n graphiti .mcp.json` returning lines 49-82 entry. Manifest text stale since Wave 105 Ship 2N-batch3-D doc-drift correction left wiring partially landed but text not bumped.
- **OVER #3 (own pre-apply candidate)**: I almost claimed "FalkorDB Docker container UP" propagating MEMORY.md uncorrected. Caught via direct `docker ps` probe failure → forced fresh `netstat` evidence-collection. FM-20 cascade defense applied — refused to propagate sibling-source claim without runtime probe.

## Recommended Wave 140 follow-up fires

1. **Wave 140 Fire 2**: Apply `.mcp.json:72` 1-line port fix (`16379` → `6379`); smoke-probe; commit.
2. **Wave 140 Fire 3**: Reconcile `docs/sota-installed-manifest.md` L3 row + MEMORY.md L9 port claim per FM-20 path-drift cascade defense (cumulative ladder n=6+ → n=7+).
3. **Wave 140 Fire 4** (deferred): Investigate `EMBEDDER__DIMENSIONS` vs `EMBEDDING_DIM` double-env redundancy via `graphiti-core` source read at PyPI HEAD; pick canonical.

## Cross-model gate disclosure

This verdict is sota-researcher subagent output (CC harness, Sonnet stand-in dispatch per `Z:/claude-sota/.claude/rules/cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate`). Cross-model consensus invariant NOT structurally satisfied; orchestrator-side T1 codex review on consolidated Voice 1+2+3 synthesis required BEFORE Wave 140 Fire 2 commit per CR-3 Phase 1 bootstrap exception.

## Cite trail (cardinal-rule-1 + cardinal-rule-8 conformance)

- **TIER-1-DIRECT**: `Z:/claude-sota-installed/.local/graphiti/mcp_server/main.py @ HEAD c427615` (entry-point — backwards-compat wrapper around `src/graphiti_mcp_server.py:main`)
- **TIER-1-DIRECT**: `Z:/claude-sota-installed/.local/graphiti/mcp_server/config/config.yaml:73-87 @ HEAD c427615` (database.providers.falkordb env contract)
- **TIER-1-DIRECT**: `Z:/claude-sota-installed/.local/graphiti/mcp_server/config/config-docker-falkordb.yaml:69-77 @ HEAD c427615` (FalkorDB-mode reference)
- **TIER-1-DIRECT**: `Z:/claude-sota-installed/.local/graphiti/mcp_server/README.md:174-190 @ HEAD c427615` (Using Ollama for Local LLM section)
- **TIER-1-DIRECT**: `Z:/claude-sota-installed/.local/graphiti/mcp_server/README.md:222-242 @ HEAD c427615` (Environment Variables canonical list)
- **TIER-1-DIRECT**: `Z:/claude-sota-installed/.local/graphiti/mcp_server/pyproject.toml:1-15 @ HEAD c427615` (project version + deps)
- **TIER-1-DIRECT**: `Z:/claude-sota-installed/.local/graphiti/CLAUDE.md` (project overview, MCP server location, FalkorDB v1.1.2+ requirement)
- **TIER-3-LOCAL**: `Z:/claude-sota-installed/.mcp.json:49-82` (current wiring — 1 stale port + valid envs)
- **TIER-3-LOCAL** (refuted): `Z:/claude-sota-installed/docs/sota-installed-manifest.md` L3 row (REFUTED by direct probe — STAGED for FM-20 fix-forward)
- **TIER-3-LOCAL** (refuted): `Z:/claude-sota-installed/.claude/projects/Z--claude-sota-installed/memory/MEMORY.md` L9 port 16379 claim (REFUTED by netstat 6379)

VERDICT: NEEDS-CONFIG-DECISION — 1-char `.mcp.json:72` port fix unblocks L3 Graphiti MCP wire; manifest/memory reconciliation deferred to follow-up fires per ONE-LOGICAL-UNIT-PER-FIRE.
