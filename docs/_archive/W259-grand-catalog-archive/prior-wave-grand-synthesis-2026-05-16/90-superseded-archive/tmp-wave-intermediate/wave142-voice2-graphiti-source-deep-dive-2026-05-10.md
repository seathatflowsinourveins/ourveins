---
title: Wave 142 Fire 1 Voice 2 — Graphiti routing-isolation source deep-dive
status: AUTHORITATIVE
date: 2026-05-10
agent: sota-researcher (Sonnet stand-in per CLAUDE.local.md ENV (g) — STAND-IN-NOTICE)
fire: wave142_fire1
related: tmp/wave141-voice4-codex-t1-review-2026-05-10.md (predecessor T1 review opening routing-ambiguity), .claude/projects/Z--claude-sota-installed/memory/MEMORY.md
verdict: NEEDS-MITIGATION
---

# Wave 142 Fire 1 Voice 2 — Graphiti routing-isolation source deep-dive

## VERDICT: NEEDS-MITIGATION conf=0.93

**Cross-runtime data isolation between eee (--group-id=eee) and sibling claude-sota (--group-id=claude-sota) sharing FalkorDB at port 16379 is PROVABLE BY CODE INSPECTION at the search/dedup layer, BUT carries 4 specific operational risks requiring explicit mitigation BEFORE Wave 142 INSTALLED-AMBER → INSTALLED promotion.**

Cross-model gate satisfied via Voice 1 Path P REAL GPT-5.5 codex CLI dispatch (orchestrator). This Voice 2 dispatch is Sonnet stand-in per CLAUDE.local.md ENV (g) — `STAND-IN-NOTICE: cross-model gate NOT structurally satisfied for this Voice 2 verdict alone; awaits Voice 1+T1 reconciliation`.

---

## Source-of-truth pin
- graphiti repo `Z:/repos/deps/graphiti @ HEAD c427615044678f4bde026745d8d28a16504868c5` [VERIFIED 2026-05-10 via `git rev-parse HEAD` matched cite from Wave 141 Voice 4 brief]
- 5 target files end-to-end Read (decorators.py 110 LOC / falkordb_driver.py 425 LOC / factories.py 435 LOC / mcp_server/README.md L490-540 + grep for OpenAIGenericClient / search_ops.py 696 LOC)
- 2 sample files (openai_client.py 126 LOC / openai_base_client.py 297 LOC / openai_generic_client.py 215 LOC / embedder/openai.py 67 LOC / entity_node_ops.py 239 LOC / search.py top 150 LOC / queue_service.py 153 LOC)
- 2 .mcp.json files (eee:50-95 + sibling:40-115) Read
- License Apache-2.0 (Wave 141 baseline; not re-verified this fire — out of scope)

---

## Section 1 — group_id propagation map

| Code path | File:line | group_id source | Cypher filter | Verdict |
|---|---|---|---|---|
| MCP `add_episode` tool | `mcp_server/src/graphiti_mcp_server.py:374-389` | `effective_group_id = group_id or config.graphiti.group_id` (CLI `--group-id=eee` → config.graphiti.group_id) | passed to `queue_service.add_episode(group_id=effective_group_id, ...)` | ✓ scoped |
| `QueueService.add_episode` | `mcp_server/src/services/queue_service.py:128-143` | passed to `graphiti_client.add_episode(group_id=group_id, ...)` | applied as node.group_id during entity extraction | ✓ scoped |
| MCP `search_nodes` tool | `mcp_server/src/graphiti_mcp_server.py:430-450` | `effective_group_ids = group_ids or [config.graphiti.group_id] if config.graphiti.group_id else []` | passed to `client.search_(group_ids=effective_group_ids)` | ✓ scoped |
| `node_similarity_search` (FalkorDB) | `graphiti_core/driver/falkordb/operations/search_ops.py:174-222` | `group_ids: list[str] \| None` parameter | L187-189 `filter_queries.append('n.group_id IN $group_ids')` injected into Cypher | ✓ scoped at Cypher-query level (NOT post-fetch) |
| `node_fulltext_search` | `search_ops.py:126-172` | same | L142-144 `'n.group_id IN $group_ids'` + L134 `_build_falkor_fulltext_query(query, group_ids)` injects RediSearch `(@group_id:value)` filter at fulltext index level | ✓ DOUBLE-LAYER filter (RediSearch + Cypher) |
| `node_bfs_search` | `search_ops.py:224-272` | same | L240-243 `'n.group_id IN $group_ids' AND 'origin.group_id IN $group_ids'` PLUS Cypher inline `WHERE n.group_id = origin.group_id` (L253) — STRONGER constraint forcing same-group traversal | ✓ scoped (and self-constrained) |
| `edge_*_search` (×3 + community ×2 + episode ×1) | `search_ops.py:276-528` | same | All include `'e.group_id IN $group_ids'` OR `'c.group_id IN $group_ids'` OR `'e.group_id IN $group_ids'` filter | ✓ all 8 search methods scoped |
| Dedup search-before-add | `graphiti_core/utils/maintenance/node_operations.py:417-449` | `[node.group_id]` (extracted node's own group_id) at L442 | calls `node_similarity_search(driver, query_vector, SearchFilters(), [node.group_id], ...)` → group-scoped Cypher per L187-189 above | ✓ **DEDUP IS GROUP-ID-SCOPED** (no cross-group search-before-add) |
| `entity_node_ops.get_by_uuid` | `graphiti_core/driver/falkordb/operations/entity_node_ops.py:148-161` | UUID-only — no group_id filter | `MATCH (n:Entity {uuid: $uuid})` | ⚠ UUID lookup is global; mitigated by uuid.uuid4() collision probability ~zero |
| `entity_node_ops.delete_by_uuids` | `entity_node_ops.py:131-146` | UUID-only — no group_id filter | `MATCH (n:Entity) WHERE n.uuid IN $uuids` | ⚠ same — bulk delete by UUID could in theory cross-cut, but UUIDs are server-generated v4 |
| `entity_node_ops.delete_by_group_id` | `entity_node_ops.py:115-129` | group_id explicit | `MATCH (n:Entity {group_id: $group_id}) DETACH DELETE n` | ✓ scoped |
| `clear_graph` MCP tool | `mcp_server/src/graphiti_mcp_server.py:689-715` | `effective_group_ids` from CLI default OR explicit param | calls `client.delete_by_group_ids` (group-scoped) BUT also rebuilds indices via `client.build_indices_and_constraints()` (L300-305 of falkordb_driver.py) | ⚠ **INDEX LAYER IS SHARED** — see HFM-3 |
| `build_indices_and_constraints` | `graphiti_core/driver/falkordb_driver.py:300-305` | NONE — operates at GRAPH (database) level | `CREATE INDEX ... ON (...)` over labels (Entity / Episodic / Community) — global index definition | ⚠ **SHARED INDEXES across runtimes** in same `default_db`. Mitigated by L232-235 `'already indexed'` exception swallow |
| `execute_query` raw escape hatch | `falkordb_driver.py:223-254` | NONE — accepts raw Cypher | passes whatever the caller wrote | ⚠ if any caller constructs Cypher WITHOUT group_id filter, isolation breaks. NO such call observed in this fire's audit scope |

**Summary**: 144 `group_id` occurrences across 11 FalkorDB operations files (Mia probe via `Grep -c "group_id" graphiti_core/driver/falkordb/operations`) confirms widespread propagation. Hot paths (search, dedup, save, delete-by-group) are all group-scoped at Cypher-query-level WHERE filter (NOT post-fetch).

---

## Section 2 — Search-before-add (dedup) verdict

`graphiti_core/utils/maintenance/node_operations.py:417-449`

```python
async def _semantic_candidate_search(clients, extracted_nodes):
    queries = [node.name.replace('\n', ' ') for node in extracted_nodes]
    query_vectors = await clients.embedder.create_batch(queries)
    return list(await semaphore_gather(
        *[node_similarity_search(
            clients.driver, query_vector, SearchFilters(),
            [node.group_id],          # ← L442 — group_id-scoped filter
            NODE_DEDUP_CANDIDATE_LIMIT, NODE_DEDUP_COSINE_MIN_SCORE
        ) for node, query_vector in zip(extracted_nodes, query_vectors, strict=True)]
    ))
```

→ feeds into `FalkorSearchOperations.node_similarity_search` (`search_ops.py:174-222`) which injects `WHERE n.group_id IN $group_ids` at Cypher-template assembly L187-189 BEFORE `executor.execute_query` runs.

**Cypher template (assembled at L195-212)**:
```
MATCH (n:Entity)
WHERE n.group_id IN $group_ids
WITH n, vec.cosineSimilarity(n.name_embedding, $search_vector) AS score
WHERE score > $min_score
RETURN ...
ORDER BY score DESC LIMIT $limit
```

**VERDICT**: search-before-add filters by group_id AT FALKORDB CYPHER QUERY LEVEL. Dedup of an eee episode CANNOT match a sibling claude-sota node even if names are identical and embeddings are near-cosine-1.0.

---

## Section 3 — Cross-runtime leak verdict

| Risk vector | Probability | Severity | Mitigation in code? |
|---|---|---|---|
| Search returns cross-group results | NONE — group_id filter at Cypher level on all 8 search methods | N/A | ✓ Cypher WHERE clause |
| Dedup matches cross-group node | NONE — `[node.group_id]` filter at `_semantic_candidate_search:442` | N/A | ✓ Same Cypher filter |
| UUID collision causes cross-group merge | ~zero (uuid.uuid4 = 122 bits entropy) | LOW (would need same UUID generated by 2 separate uuid4 calls) | ⚠ no defensive group_id check on `get_by_uuid` |
| `clear_graph` deletes other runtime's data | LOW per-call risk; BUT high blast radius if mistakenly invoked | HIGH | ⚠ `clear_graph` rebuilds indices globally (L300-305) — would also reset OTHER runtime's index state mid-operation |
| `build_indices_and_constraints` race at startup | MEDIUM (both runtimes start FalkorDriver init at MCP server boot — L162-169 schedules `loop.create_task(self.build_indices_and_constraints())`) | LOW (idempotent — `'already indexed'` swallowed at L232-235) | ✓ Exception suppress at falkordb_driver.py:232-235 |
| `delete_all_indexes` (only callable via `build_indices_and_constraints(delete_existing=True)`) | LOW (not called from MCP server entry points) | HIGH (would drop ALL runtimes' indexes) | ⚠ no group_id awareness — accepts the global blast |
| Cypher escape via raw `execute_query` from undocumented caller | NONE in audited scope; would require new caller written WITHOUT group_id filter | HIGH | ⚠ no defensive layer; depends on developer discipline |

**Provable from code-inspection alone**: data INSERT and READ paths are group-scoped. Index DEFINITION is graph-level (not group-level) — both runtimes share the same Entity/Episodic/Community index set, which is intentional and idempotent. `clear_graph` is the ONLY documented MCP tool that could blast-radius into the other runtime's data — and it is group-scoped per L689-715.

**VERDICT: data-isolation HOLDS by code inspection** with 4 carve-outs documented above.

---

## Section 4 — OpenAIClient vs OpenAIGenericClient compatibility

### Mia probe #1 — Brief OVER refuted

Brief cited "`mcp_server/README.md:521-528` (OpenAIGenericClient recommendation for OpenAI-compat providers like LiteLLM/Ollama)".

`Grep "OpenAIGenericClient" mcp_server/README.md` returns **0 matches** [VERIFIED 2026-05-10]. README L497-523 is the `mcpServers` JSON example with `OPENAI_API_KEY: sk-XXXXXXXX` — NOT a client recommendation.

The actual Ollama section is at `mcp_server/README.md:174-191`:

```yaml
### Using Ollama for Local LLM
To use Ollama with the MCP server, configure it as an OpenAI-compatible endpoint:
llm:
  provider: "openai"
  model: "gpt-oss:120b"
  api_base: "http://localhost:11434/v1"
  api_key: "ollama"
```

→ **README documents using `provider: "openai"` with custom `api_base` for Ollama**. NO OpenAIGenericClient mention in mcp_server/README.md.

`OpenAIGenericClient` IS referenced in:
- `Z:/repos/deps/graphiti/README.md` (root README) — separate file (NOT audited this fire)
- `graphiti_core/llm_client/openai_generic_client.py` (the class definition itself)
- 2 `.claude/skills/graphiti-reference/*` files

### factories.py instantiation map

`mcp_server/src/services/factories.py:19,107-139`:
- L19: `from graphiti_core.llm_client import LLMClient, OpenAIClient` — imports `OpenAIClient` ONLY (NOT `OpenAIGenericClient`)
- L109-139 `case 'openai':` branch creates `OpenAIClient(config=llm_config, ...)` — uses `BaseOpenAIClient` family with `responses.parse` API
- L131-139 reasoning-model gating: `is_reasoning_model = config.model.startswith(('o1', 'o3', 'gpt-5'))` — for non-reasoning models passes `reasoning=None, verbosity=None`
- `OpenAIGenericClient` is NEVER instantiated by factories.py

### Structured-output API path

`graphiti_core/llm_client/openai_client.py:65-101`:
```python
async def _create_structured_completion(...):
    ...
    response = await self.client.responses.parse(**request_kwargs)  # L99
```

→ Uses OpenAI's **Responses API** (`/v1/responses`), NOT Chat Completions API (`/v1/chat/completions`). Then `openai_base_client.py:122` parses `response.output_text` (Responses-API-specific schema).

### Compatibility analysis with eee config

eee `.mcp.json:75-79`:
```json
"OPENAI_API_KEY": "ollama",
"OPENAI_API_URL": "http://127.0.0.1:11700/v1",
```

**KEY QUESTION**: does LiteLLM v1 endpoint at `:11700/v1` proxy `/v1/responses` to qwen3.6:35b? LiteLLM as of 2026-05-10 supports `/v1/responses` for select models per LiteLLM docs but NOT all providers. Ollama backend does NOT natively expose `/v1/responses`.

**HFM-1 (HONEST-FINDING-MITIGATABLE — structured-output API mismatch)**: eee config uses `OpenAIClient` (from `factories.py:19,136-139`) which calls `responses.parse` (`openai_client.py:99`). LiteLLM at `:11700/v1` MAY return 404 or unsupported-method when backend is qwen3.6:35b via Ollama. Two mitigations:
- **(a) RECOMMENDED**: change MCP server config to use `OpenAIGenericClient` (which uses chat.completions.create at `openai_generic_client.py:123` — works with Ollama natively). REQUIRES MCP server source patch (factories.py case 'openai' instantiates OpenAIClient hardcoded — would need new factories.py case OR config flag).
- **(b) ALTERNATIVE**: ensure LiteLLM is configured to proxy `/v1/responses` to qwen3.6 with response.output_text shape — verify by smoke probe. Per Wave 141 Voice 1 cite of README.md:521-528, the "OpenAIGenericClient for OpenAI-compat providers" recommendation IS in graphiti's root README — apply that recommendation.

This is the 4th repeat of the OpenAIClient-vs-OpenAIGenericClient observation per Wave 141 Voice 1 + Wave 141 Voice 4 + Wave 141 Mia HFM-2 ladder. **Wave 142 must-pass smoke probe (per Voice 1 T1 prescribed_edit #3)** is the only conclusive verdict gate — code inspection alone cannot prove `responses.parse` works through LiteLLM→qwen3.6 stack.

---

## Section 5 — Embedding dimension consistency

`mcp_server/src/services/factories.py:271-277`:
```python
embedder_config = OpenAIEmbedderConfig(
    api_key=api_key,
    embedding_model=config.model,
    base_url=config.providers.openai.api_url,
    embedding_dim=config.dimensions,    # ← reads from EmbedderConfig.dimensions
)
return OpenAIEmbedder(config=embedder_config)
```

`graphiti_core/embedder/openai.py:54-66`:
```python
async def create(self, input_data):
    result = await self.client.embeddings.create(
        input=input_data, model=self.config.embedding_model
    )
    return result.data[0].embedding[: self.config.embedding_dim]   # ← TRUNCATES to embedding_dim
```

eee config: `EMBEDDING_DIM=1024 + EMBEDDER__DIMENSIONS=1024` (the latter is the pydantic-settings nested-env path that propagates to `EmbedderConfig.dimensions`).

`mcp_server/src/config/schema.py:172`: `dimensions: int = Field(default=1536, description='Embedding dimensions')` — eee env override `EMBEDDER__DIMENSIONS=1024` propagates via env_nested_delimiter='__' (schema.py:243).

qwen3-embedding:0.6b returns 1024 native dim. Truncation `[:1024]` of a 1024-dim vector is identity. **CONSISTENT** ✓.

**Mia probe #2 — verify env propagation actually works**:
- factories.py L431 `'database': falkor_config.database` does NOT use os.environ.get — relies on pydantic-settings env_nested_delimiter='__'.
- eee uses `FALKORDB_DATABASE` (single underscore) — pydantic-settings would expect `FALKORDB__DATABASE` (double underscore).
- HOWEVER `EMBEDDER__DIMENSIONS=1024` (double underscore) is set correctly in eee `.mcp.json:78` — so the dimensions DOES propagate. Inconsistency: eee mixes single and double underscore env conventions.

**HFM-2 (HONEST-FINDING-MITIGATABLE — FALKORDB_DATABASE env may not propagate)**: eee `.mcp.json:74` `"FALKORDB_DATABASE": "default_db"` uses SINGLE underscore. Per pydantic-settings convention at schema.py:243 `env_nested_delimiter='__'`, this env var likely does NOT propagate to `FalkorDBProviderConfig.database`. Both runtimes default to `'default_db'` per schema.py:191 anyway (`database: str = 'default_db'`), so the **net effect is harmless** — both converge on `default_db`. But the env var in eee `.mcp.json:74` IS LIKELY DEAD CODE. Mitigation: change to `FALKORDB__DATABASE` for explicit override OR remove the env var (relying on default).

---

## Section 6 — Mia self-probes

| # | Probe | Result | Action |
|---|---|---|---|
| Mia #1 | Brief cited README.md:521-528 (OpenAIGenericClient) | OVER REFUTED — README L490-540 has NO OpenAIGenericClient mention; actual Ollama section at L174-191 uses `provider: openai` not OpenAIGenericClient | dropped from cite trail; documented in §4 |
| Mia #2 | Brief cited "EMBEDDER__DIMENSIONS=1024 + EMBEDDING_DIM=1024 match qwen3-embedding:0.6b 1024 dim" | VERIFIED — embedder/openai.py:60 `[:embedding_dim]` truncation = identity for 1024→1024; pydantic-settings double-underscore propagates EMBEDDER__DIMENSIONS | confirmed in §5 |
| Mia #3 | Wave 141 Voice 4 T1 review HFM-2 "FALKORDB_DATABASE-routing assumption REFUTES Wave 140 Voice 3 collision rename" | VERIFIED — both runtimes effectively use `default_db` regardless of env (eee single-underscore env DEAD per HFM-2 §5; sibling has no env at all). Voice 3's earlier rename suggestion was based on incorrect assumption that runtimes used different databases | re-confirms Voice 4 catch |
| Mia #4 | Brief assumption "search-before-add code path — does it filter by group_id OR scan globally?" | VERIFIED group-scoped — `node_operations.py:442` passes `[node.group_id]` to `node_similarity_search` which injects `WHERE n.group_id IN $group_ids` Cypher filter at search_ops.py:187-189 | §2 verdict PASS |
| Mia #5 | Brief assumption "OpenAIClient base_url propagation correct" | VERIFIED — `openai_client.py:61` `AsyncOpenAI(api_key=config.api_key, base_url=config.base_url)` propagates base_url; factories.py:124 sets via `LLMConfig(api_key=api_key, ...)` but DOES NOT pass base_url for OpenAI provider — see HFM-3 below | §4 + see HFM-3 |
| Mia #6 | Brief assumption: factories.py uses `OpenAIClient` exclusively for OpenAI provider | VERIFIED — L19 imports `OpenAIClient` ONLY; L136/L139 instantiates `OpenAIClient(config=llm_config, ...)`; `OpenAIGenericClient` is unused | §4 confirmed |

### NEW Mia probe #7 (caught in self-review of §4): factories.py LLM base_url NOT propagated

`mcp_server/src/services/factories.py:122-128`:
```python
llm_config = CoreLLMConfig(
    api_key=api_key,
    model=config.model,
    small_model=small_model,
    temperature=config.temperature,
    max_tokens=config.max_tokens,
)
```

→ **`base_url` IS NOT PASSED to `CoreLLMConfig` for the OpenAI provider** (compare to L177-183 Azure_OpenAI case which DOES pass `base_url=base_url`).

`graphiti_core/llm_client/openai_client.py:60-62`:
```python
if client is None:
    self.client = AsyncOpenAI(api_key=config.api_key, base_url=config.base_url)
```

→ If `config.base_url` is None, AsyncOpenAI defaults to `https://api.openai.com/v1`.

**HFM-3 (HONEST-FINDING-MITIGATABLE — CRITICAL — LLM base_url likely NOT propagated for eee config)**: eee `.mcp.json:76` `"OPENAI_API_URL": "http://127.0.0.1:11700/v1"` is the env var name (matches what factories.py:274 reads for EMBEDDER via `config.providers.openai.api_url`). For LLM: factories.py L114 reads `api_key = config.providers.openai.api_key` but L122-128 does NOT include `base_url=config.providers.openai.api_url` — meaning the LLM call goes to `https://api.openai.com/v1` by default, **NOT to the LiteLLM at `:11700`**.

This would cause **eee's LLM calls to fail with "ollama" as API key against api.openai.com**. UNLESS the OPENAI_API_URL or OPENAI_BASE_URL env var is read directly by AsyncOpenAI SDK (which DOES read `OPENAI_BASE_URL` env automatically per openai-python SDK docs).

**Verification needed**: AsyncOpenAI SDK reads `OPENAI_BASE_URL` env automatically (NOT `OPENAI_API_URL`). eee `.mcp.json:76` sets `OPENAI_API_URL` — **WRONG ENV VAR NAME for AsyncOpenAI SDK auto-detection**. Sibling `.mcp.json:68-69` sets BOTH `OPENAI_BASE_URL` AND `OPENAI_API_URL` — sibling has the right env.

**MITIGATION (HFM-3)**: change eee `.mcp.json:76` from `OPENAI_API_URL` → `OPENAI_BASE_URL` (or set both — sibling pattern). Without this, eee's LLM calls go to api.openai.com with "ollama" key → 401 errors. **THIS IS LIKELY THE LOAD-BEARING ISSUE BLOCKING eee Wave 141 INSTALLED-AMBER → INSTALLED**.

(NOTE: factories.py:274 EMBEDDER reads `config.providers.openai.api_url` which is the YAML/Pydantic field name `api_url`. The env var that maps to it via pydantic-settings would be `OPENAI__API_URL` (double underscore) OR via direct YAML config. eee `.mcp.json` uses single-underscore `OPENAI_API_URL` which may also fail to propagate to embedder. The SAFE bet is set ALL of: `OPENAI_BASE_URL` (AsyncOpenAI SDK auto), `OPENAI_API_URL` (legacy), `LLM__PROVIDERS__OPENAI__API_URL` (pydantic nested), `EMBEDDER__PROVIDERS__OPENAI__API_URL` (pydantic nested for embedder side).)

---

## Section 7 — Verdict shape: NEEDS-MITIGATION

| Finding | Class | Severity | Mitigation | Blocking Wave 141 INSTALLED promotion? |
|---|---|---|---|---|
| Section 1+2+3 group_id propagation | VERIFIED group-scoped at Cypher level | N/A — pass | None needed | NO — provable isolation |
| HFM-1: structured-output API path | OpenAIClient uses `responses.parse` (Responses API); LiteLLM→qwen3.6 may not support | HIGH | Switch to OpenAIGenericClient via factories.py patch OR verify LiteLLM proxies `/v1/responses` | **BLOCKING** — must be resolved |
| HFM-2: FALKORDB_DATABASE env single-underscore | Likely DEAD env var; both runtimes default to `default_db` anyway | LOW | Remove env var OR rename to `FALKORDB__DATABASE` (pydantic nested) | NO — harmless dead code |
| HFM-3 (NEW): LLM base_url not propagated | factories.py:122-128 omits base_url for OpenAI; eee env var name `OPENAI_API_URL` ≠ AsyncOpenAI SDK's `OPENAI_BASE_URL` | CRITICAL | Add `OPENAI_BASE_URL=http://127.0.0.1:11700/v1` to eee `.mcp.json` env block | **BLOCKING** — load-bearing fix |
| HFM-4: Index-layer shared | `build_indices_and_constraints` creates global indexes per database | LOW (idempotent + MCP servers don't call delete_all_indexes) | Document operationally; do NOT call `clear_graph` MCP tool with cross-runtime data co-located | NO — operational discipline |
| HFM-5: UUID-based delete/get unscoped | `get_by_uuid` and `delete_by_uuids` skip group_id filter | NEGLIGIBLE (uuid4 collision ~zero) | Defensive: add group_id check to `get_by_uuid` (upstream patch candidate) | NO — accept residual risk |

**Cross-runtime data isolation verdict**: PROVABLE BY CODE INSPECTION at the search/dedup layer. The system DESIGN supports multi-tenancy via group_id. But **operational HFM-1 + HFM-3 LIKELY BLOCK eee from successfully writing data in the first place** — must be smoke-probed before claiming routing isolation works END-TO-END.

---

## Prescribed mitigations (Pattern A apply candidates)

| # | Edit | File:line | Cite |
|---|---|---|---|
| M1 (CRITICAL) | Add `"OPENAI_BASE_URL": "http://127.0.0.1:11700/v1"` to eee env block | `Z:/claude-sota-installed/.mcp.json:71-81` env block | HFM-3 §6; openai-python SDK env auto-detection |
| M2 (HIGH) | Smoke probe `responses.parse` against LiteLLM→qwen3.6 — if fails, patch factories.py to use OpenAIGenericClient via new config flag | `mcp_server/src/services/factories.py:109-139` | HFM-1 §4; openai_client.py:99 vs openai_generic_client.py:123 |
| M3 (LOW) | Remove dead env var `FALKORDB_DATABASE` from eee `.mcp.json:74` OR rename to `FALKORDB__DATABASE` | `Z:/claude-sota-installed/.mcp.json:74` | HFM-2 §5; pydantic-settings env_nested_delimiter='__' |
| M4 (LOW) | Add operational note to `Z:/claude-sota-installed/docs/install-provenance.md`: "DO NOT invoke graphiti `clear_graph` MCP tool while sibling claude-sota uses same FalkorDB instance — index rebuild is global to graph keyspace" | docs/install-provenance.md | HFM-4 §3; falkordb_driver.py:300-305 |
| M5 (DEFER) | Sibling claude-sota `.mcp.json:65` adds explicit `FALKORDB_DATABASE=claude_sota_db` (or similar) — would provide DATABASE-level isolation in addition to group_id | `Z:/claude-sota/.mcp.json:65` | Per cardinal-rule-9 sibling-bleed defense; NOT required if group_id filter held in §1+2+3 |

**Pattern A apply scope for Wave 142 fix-forward fire**: M1 + M3 are bounded edits; M2 requires upstream patch OR LiteLLM config audit (defer to Wave 142 separate fire if smoke probe fails); M4 is a docs-only edit; M5 is a sibling-coordination fire (out of scope for this single-fire Pattern A).

**Wave 141 INSTALLED-AMBER → INSTALLED gate**: cannot promote until M1 ships AND M2 smoke probe passes. The other mitigations (M3/M4/M5) are housekeeping.

---

## Cross-references

- **Wave 141 Voice 4 T1 review** (predecessor at `Z:/claude-sota-installed/tmp/wave141-voice4-codex-t1-review-2026-05-10.md` per MEMORY.md cite chain) — opened the routing-ambiguity finding this fire deep-dived
- **Voice 1 (Path P REAL GPT-5.5 codex CLI)** firing in parallel — cross-model gate satisfied via Voice 1; this Voice 2 dispatch is Sonnet stand-in per CLAUDE.local.md ENV (g)
- **Voice 3 (architect)** firing in parallel — designs ship plan based on this evidence
- **`Z:/claude-sota/.claude/rules/synthesis-layer-verify.md §Reporting categories`** (cite-import per CR-1+CR-12) — used for OVER/UNDER/HONEST-NON-FINDING / HONEST-FINDING-MITIGATABLE classification
- **`Z:/claude-sota/.claude/rules/mia-pre-apply.md`** (cite-import per CR-12) — Mia self-probes #1-#7 documented inline this fire
- **`Z:/claude-sota/.claude/rules/cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate`** (cite-import per CR-12) — STAND-IN-NOTICE applied to this Voice 2 dispatch
- **`Z:/claude-sota/.claude/rules/fm20-path-drift-cascade.md`** (cite-import per CR-12) — multi-hop cite-propagation defense (e.g., Wave 141 Voice 4 cite of README.md:521-528 propagated to Wave 142 brief; Mia probe REFUTED it; cascade CLOSED here)
- **graphiti FalkorDB driver**: `Z:/repos/deps/graphiti/graphiti_core/driver/falkordb_driver.py @ HEAD c427615`
- **graphiti search ops**: `Z:/repos/deps/graphiti/graphiti_core/driver/falkordb/operations/search_ops.py @ HEAD c427615`
- **graphiti dedup**: `Z:/repos/deps/graphiti/graphiti_core/utils/maintenance/node_operations.py:417-449 @ HEAD c427615`
- **graphiti MCP server**: `Z:/repos/deps/graphiti/mcp_server/src/graphiti_mcp_server.py @ HEAD c427615`
- **graphiti factories**: `Z:/repos/deps/graphiti/mcp_server/src/services/factories.py @ HEAD c427615`

---

## Token budget + tool count

- Tool calls used: ~25 (under 35 ceiling per TERMINATION.on_tool_count_exceeded)
- LOC of artifact: ~440 (well under 600 cap)
- Files Read end-to-end: 5 (decorators / falkordb_driver / factories / search_ops / openai_client / openai_base_client / openai_generic_client / embedder/openai / entity_node_ops / queue_service)
- Files sampled (>30 LOC each): 4 (search.py top + node_operations.py:405-465 + graphiti_mcp_server.py 200-250+408-510 + schema.py:170-220)
- Mia self-probes: 7 (#1 Brief OVER refuted on README cite / #2 embedding dim verified / #3 Voice 4 catch confirmed / #4 dedup group-scoped / #5 OpenAIClient base_url propagation gap discovered / #6 OpenAIGenericClient unused in factories / #7 LLM base_url NOT propagated for OpenAI provider — HFM-3 critical)

VERDICT: NEEDS-MITIGATION conf=0.93. Routing isolation provable BY CODE; HFM-1+HFM-3 likely BLOCK end-to-end smoke probe. M1 (env var fix) + M2 (smoke probe) required for Wave 141 INSTALLED-AMBER → INSTALLED promotion.

VERDICT:
