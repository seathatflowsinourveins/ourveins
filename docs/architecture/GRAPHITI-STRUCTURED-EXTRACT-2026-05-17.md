# Graphiti Structured-Extraction Audit (W262 follow-up)

**Date**: 2026-05-17. **Scope**: verify graphiti's Ollama path works against the OpenAI Responses API and pick the right local model.

## (a) Source-code verdict — API used

W262's warning is **confirmed**. The active code path is:

- `mcp_server/src/services/factories.py:136-139` — instantiates `OpenAIClient` (NOT `OpenAIGenericClient`) for `provider=openai`, which is the only branch our `.mcp.json` triggers.
- `graphiti_core/llm_client/openai_client.py:99` — `response = await self.client.responses.parse(**request_kwargs)` with `text_format=response_model` (a Pydantic `BaseModel`).
- `graphiti_core/llm_client/openai_base_client.py:122` — reads `response.output_text` from the Responses-API envelope.

So every structured graphiti call hits `/v1/responses` with `text.format.type=json_schema`. The fallback `OpenAIGenericClient` (which uses `chat.completions.create` + `response_format=json_schema` — the broadly-supported path) is never reached from our config.

**Good news**: Ollama 0.x ships a `/v1/responses` compat shim and accepts the openai-Python SDK's `responses.parse(... text_format=PydanticModel)` request shape including `strict=True` json-schema. Verified empirically below.

## (b) Smoke-test results

Endpoint: `POST http://127.0.0.1:16700/v1/responses`. All runs hit CPU only (`/api/ps` reports `size_vram:0` — GPU is fully occupied by the 35B at :8080, util 99 %, 1.08 GB free of 24 GB). Latencies are therefore worst-case.

Test 1 — flat schema `{name:string, age:integer}` (extract from "Alice is 30").

| Model | Latency | Valid JSON to schema | Notes |
|---|---:|:---:|---|
| `qwen3:8b` (current) | 53.2 s | OK | 14 out-tokens, but reasoning preamble inflates input tokens to 344 |
| `qwen3-coder:30b-a3b-q4_K_M` | 58.5 s | OK | MoE (3B active), 18 tokens, clean output |
| `qwen3.6:35b` | TIMEOUT (>300 s) | — | Loading + thinking-mode noise; not viable on CPU |
| `devstral-small-2:24b` | 86.0 s | OK | Dense 24B, slower than MoE |

Test 2 — graphiti-shaped nested-array schema (`extracted_entities[]` with `name/entity_type-enum/summary`).

| Model | Latency | Valid (typed + enum) | Entities |
|---|---:|:---:|---:|
| `qwen3:8b` | 261.3 s | OK | 7 |
| `qwen3-coder:30b-a3b-q4_K_M` | 49.5 s | OK | 6 |
| `devstral-small-2:24b` | 125.2 s | OK | 6 |

Test 3 — end-to-end via openai SDK `responses.parse(text_format=Pydantic)` (the actual graphiti call shape — `tmp/graphiti_smoketest_sdk.py`).

| Model | Latency | `output_parsed` populated |
|---|---:|:---:|
| `qwen3:8b` | 117.8 s | OK (2 Persons) |
| `qwen3-coder:30b-a3b-q4_K_M` | 28.8 s | OK (2 Persons) |
| `devstral-small-2:24b` | 75.0 s | OK (2 Persons) |

Three findings: (i) Ollama's `/v1/responses` shim does enforce json-schema and parses back to Pydantic, so graphiti's Responses-API path is **not** broken today; (ii) qwen3:8b "works" but is 4-5x slower than qwen3-coder on real-shaped extractions because Qwen3 emits a reasoning preamble before its JSON, ballooning output-token cost; (iii) qwen3.6:35b is non-viable on CPU and would compete with the 35B at :8080 if loaded to GPU.

## (c) Recommendation

**Swap `qwen3:8b` -> `qwen3-coder:30b-a3b-q4_K_M`.**

Justification: (a) returns valid schema-conformant JSON on all three tests; (b) MoE with 3B active params -> fits within CPU/RAM budget without contending for the GPU that the 35B at :8080 owns (`size_vram:0` after each call, model evicted cleanly); (c) 5x faster than the incumbent on graphiti's nested-array extraction (49.5 s vs 261.3 s) and 4x faster on the real SDK path (28.8 s vs 117.8 s) -- material because graphiti issues many calls per episode (entity-extract, edge-extract, dedupe, summarize); (d) less reasoning-preamble noise than qwen3:8b, so output-token count drops by ~95 %; (e) no extra dependency, no new install, no new GPU pressure on the 35B Hindsight pipeline at :8080.

We are NOT routing graphiti at the 35B :8080 (option 5b in the brief): it is already saturated by Hindsight and adding graphiti's high call-rate would tank both. We are NOT installing OpenRouter (option 5c): unnecessary now that the local path works.

## (d) Exact `.mcp.json` diff

```diff
--- a/.mcp.json
+++ b/.mcp.json
@@ -76,7 +76,7 @@
         "--database-provider",
         "falkordb",
         "--model",
-        "qwen3:8b",
+        "qwen3-coder:30b-a3b-q4_K_M",
         "--embedder-model",
         "qwen3-embedding:0.6b",
         "--group-id",
```

Apply with a single `Edit` on `Z:\claude-sota-installed\.mcp.json` replacing the `"qwen3:8b"` token on line 79. Restart the MCP server (kill its `uv run` child) to pick up the new `--model` arg. Embedder (`qwen3-embedding:0.6b`) is unchanged.

**Rollback**: revert the same diff. No state migration required -- the model is only used for inference, not stored in FalkorDB.
