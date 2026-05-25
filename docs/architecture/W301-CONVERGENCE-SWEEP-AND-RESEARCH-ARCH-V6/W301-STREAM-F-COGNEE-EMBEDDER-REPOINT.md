# W301 Stream F — Cognee Embedder Repoint Runbook (HIGH operator-AI prereq for OllamaServe retire)

> **Status**: RECOMMENDED-APPLY pending operator confirm
> **Owner**: Stream F (parallel-dispatch, file-ownership-isolated)
> **Sibling streams (cite-only)**: A (WinSW migration), C (compose+env template), E (cardinal-rule), W301-CONVERGENCE-LOCAL-MODEL-MONITOR
> **Date**: 2026-05-18 · **Wave**: W301.G
> **Probe budget**: $0.30 T3 cap (under)

---

## §1 — Live state probe (does cognee actually call Ollama today?)

**Operator-AI premise**: "Ollama :16700 is load-bearing for cognee T3 embeddings because cognee's default `embedding_provider='openai'` + no `EMBEDDING_BASE_URL` env → falls back to Ollama qwen3-embedding:0.6b."

**Stream F empirical finding**: **CLAIM FALSIFIED at the routing layer, but Ollama retirement is still safe.**

| Evidence | Source | Verdict |
|---|---|---|
| `nssm get CogneeMCP AppEnvironmentExtra` shows **no `EMBEDDING_*` vars** | Live probe (`AppDirectory=Z:\repos\deps\cognee\cognee-mcp`) | Confirmed |
| `EmbeddingConfig` defaults: `embedding_provider="openai"`, `embedding_model="openai/text-embedding-3-large"`, `embedding_endpoint=None` | `Z:/repos/deps/cognee/cognee/infrastructure/databases/vector/embeddings/config.py:15-19` | Confirmed |
| With `embedding_provider="openai"` (NOT `"ollama"`, NOT `"openai_compatible"`, NOT `"fastembed"`), `get_embedding_engine.py:116` **falls through to `LiteLLMEmbeddingEngine`** — NOT to `OllamaEmbeddingEngine` | `get_embedding_engine.py:82-128` (read directly) | Confirmed |
| DeepWiki `topoteretes/cognee` direct query: *"There is no built-in fallback mechanism to Ollama in this specific scenario; the system will report an embedding failure."* | DeepWiki MCP `ask_question` 2026-05-18 | Confirmed |
| `/api/ps` on Ollama :16700 **does** show `qwen3-embedding:0.6b` loaded (`size_vram=0`, `expires_at=2026-05-19`) | `curl http://127.0.0.1:16700/api/ps` | Loaded — but loaded≠in-use-by-cognee |
| Cognee `data/` dir last write: **2026-04-18** (1 month stale) | `Z:\claude-sota-installed-state\cognee\data\` ls -lat | T3 is largely cold |
| `Z:/repos/deps/cognee/CLAUDE.md:329-331` documents canonical recipe: `EMBEDDING_PROVIDER="ollama"` + `EMBEDDING_MODEL="nomic-embed-text:latest"` + `EMBEDDING_ENDPOINT="http://localhost:11434/api/embed"` | Upstream README | Authoritative |

**Most likely explanation for Ollama having the embed model loaded**: leftover from retired graphiti T4 (per CLAUDE.md W272+W290+W295 AI-5 — `graphiti` is in `disabledMcpjsonServers`, but the FalkorDB+Ollama pair may still be running). Or operator-AI's own probe loaded it during W301 work.

**Practical impact**: cognee `cognify` calls today would either (a) **hard-fail** trying to reach OpenAI cloud with `api_key="local"`, or (b) hard-fail at `LiteLLMEmbeddingEngine.__init__` endpoint validation if any malformed `EMBEDDING_ENDPOINT` were ever set. The repoint operator-AI proposes is the correct fix; the Ollama "load-bearing" framing just isn't accurate at the cognee routing layer.

---

## §2 — Config source-of-truth (provider resolution logic)

**Cite anchor**: `Z:/repos/deps/cognee/cognee/infrastructure/databases/vector/embeddings/get_embedding_engine.py` (lines 82-128) + `config.py` (lines 14-30).

```text
EmbeddingConfig(BaseSettings) with SettingsConfigDict(env_file=".env", extra="allow")
  → pydantic_settings auto-maps field names case-insensitively to env vars.
  → No env_prefix declared → field "embedding_provider" matches env EMBEDDING_PROVIDER.

Precedence chain (pydantic_settings default):
  1. OS environment variables       ← what NSSM AppEnvironmentExtra feeds
  2. .env file in CWD               ← would be Z:\repos\deps\cognee\cognee-mcp\.env (NOT PRESENT today)
  3. Class default values           ← embedding_provider="openai" is the active default today

create_embedding_engine() switch (get_embedding_engine.py:82-128):
  if embedding_provider == "fastembed":         → FastembedEmbeddingEngine (local CPU; no remote)
  elif embedding_provider == "ollama":          → OllamaEmbeddingEngine    (POSTs to endpoint)
  elif embedding_provider == "openai_compatible": → OpenAICompatibleEmbeddingEngine
                                                  (openai SDK, base_url=endpoint, /v1 auto-suffix)
  else:                                          → LiteLLMEmbeddingEngine  (litellm; default fallback)
```

Cognee env vars that the runtime actually reads (verified by grep over `cognee/infrastructure/.../embeddings/`):

| Env var | Mapped field | Notes |
|---|---|---|
| `EMBEDDING_PROVIDER` | `embedding_provider` | Drives the switch above |
| `EMBEDDING_MODEL` | `embedding_model` | For `openai_compatible`, sent as `model=` to llama-server |
| `EMBEDDING_ENDPOINT` | `embedding_endpoint` | Base URL; `OpenAICompatibleEmbeddingEngine.py:107-111` normalises to `…/v1` |
| `EMBEDDING_API_KEY` | `embedding_api_key` | Falls back to `LLM_API_KEY` (i.e., `OPENAI_API_KEY="local"`) when unset |
| `EMBEDDING_DIMENSIONS` | `embedding_dimensions` | Default 3072 (text-embedding-3-large size). MUST set to 1024 for qwen3-embed-0.6b |
| `EMBEDDING_MAX_COMPLETION_TOKENS` | `embedding_max_completion_tokens` | Default 8191; qwen3-embed-0.6b ctx is 8192 |
| `EMBEDDING_BATCH_SIZE` | `embedding_batch_size` | Default 36 |
| `EMBEDDING_API_VERSION` | `embedding_api_version` | Azure-flavoured; leave unset |

**`EMBEDDING_API_URL` (operator-AI's suggested name) is NOT a cognee env var** — the correct name is `EMBEDDING_ENDPOINT`. Setting `EMBEDDING_API_URL` would be a no-op silently swallowed by `extra="allow"`. Stream F corrects this in §3.

**Q: does `EMBEDDING_PROVIDER` override the LLM provider?** No. `LLMConfig` (separate `BaseSettings` class at `cognee/infrastructure/llm/config.py:15-88`) is read independently. `LLM_MODEL`+`OPENAI_BASE_URL`+`OPENAI_API_KEY` continue routing the LLM through IkLlama :8080. The two are decoupled.

---

## §3 — Repoint env block (exact recipe)

**Append to CogneeMCP NSSM `AppEnvironmentExtra`** (keep all existing keys; ADD these 5):

```text
EMBEDDING_PROVIDER=openai_compatible
EMBEDDING_MODEL=qwen3-embed-0.6b
EMBEDDING_ENDPOINT=http://127.0.0.1:8090/v1
EMBEDDING_DIMENSIONS=1024
EMBEDDING_MAX_COMPLETION_TOKENS=8000
```

Rationale:
- `openai_compatible` (NOT `openai_compatible` is the literal switch-case value at `get_embedding_engine.py:104`) routes to `OpenAICompatibleEmbeddingEngine` (uses `openai` SDK directly, NOT litellm — which avoids known litellm-vs-llama.cpp incompatibilities, see `OpenAICompatibleEmbeddingEngine.py:3-12`).
- `EMBEDDING_ENDPOINT=http://127.0.0.1:8090/v1` — the engine auto-normalises to `/v1` per `OpenAICompatibleEmbeddingEngine.py:107-111`; including `/v1` upfront is the safest form.
- `EMBEDDING_DIMENSIONS=1024` — matches qwen3-embed-0.6b's actual output (verified live: `dim=1024`, see §4 (a)). Default 3072 would cause vector-store dimension mismatch on first write.
- `EMBEDDING_MAX_COMPLETION_TOKENS=8000` — leaves headroom under qwen3's 8192 ctx window (llama-swap config: `-c 8192`).
- `EMBEDDING_API_KEY` omitted intentionally → falls back to `LLM_API_KEY` (i.e., `OPENAI_API_KEY="local"`), which llama-server accepts as a no-op token.

NSSM apply command (PowerShell, single transaction):

```powershell
$existing = (nssm get CogneeMCP AppEnvironmentExtra) -join "`r`n"
$addendum = @"
EMBEDDING_PROVIDER=openai_compatible
EMBEDDING_MODEL=qwen3-embed-0.6b
EMBEDDING_ENDPOINT=http://127.0.0.1:8090/v1
EMBEDDING_DIMENSIONS=1024
EMBEDDING_MAX_COMPLETION_TOKENS=8000
"@
nssm set CogneeMCP AppEnvironmentExtra "$existing`r`n$addendum"
nssm restart CogneeMCP
```

**Post-WinSW migration (Stream A)**: same 5 keys go into the `<env>` block of `CogneeMCP.xml`.

---

## §4 — Smoke-test gates

| Gate | Command | Pass criterion | Status |
|---|---|---|---|
| (a) Pre-flight: llama-swap embeddings reachable | `curl -s -X POST http://127.0.0.1:8090/v1/embeddings -H 'Content-Type: application/json' -d '{"model":"qwen3-embed-0.6b","input":"smoke"}'` | HTTP 200 + `data[0].embedding` length=1024 | **PASS (live-verified 2026-05-18)** — Stream F probe returned `dim=1024 model=qwen3-embed-0.6b usage={prompt_tokens:9}` in 0.7s |
| (a2) Batch-mode | same with `"input":["t1","t2"]` | `count=2, dim_0=dim_1=1024` | **PASS** — `count=2 dim_0=1024 dim_1=1024` |
| (b) Apply env vars | NSSM block in §3 | `nssm get CogneeMCP AppEnvironmentExtra` shows new keys | pending operator |
| (c) Restart service | `nssm restart CogneeMCP` | `nssm status CogneeMCP` returns `SERVICE_RUNNING` within 10s | pending |
| (d) Cold-load wait | `Start-Sleep 30` | Allows uvicorn + cognee import to settle | pending |
| (e) Cognee MCP /health | `curl -s http://127.0.0.1:8000/health` | Returns `{"status":"ok"}` | pre-verified GREEN |
| (f) Embedding-write smoke | Call cognee MCP tool `cognify` with `text="W301 cognee repoint smoke"` via Claude Code's `mcp__cognee__cognify` (the NSSM port :8000 is MCP-over-HTTP at path `/mcp`, NOT REST — so direct `curl /mcp/cognify` is the wrong probe). Operator should fire this from a fresh CC session post-restart. | Returns success token; vector-store insert visible in `Z:\claude-sota-installed-state\cognee\data\databases\cognee_db` LastWriteTime > restart time | pending operator |
| (g) Route confirm: llama-swap got the call, not Ollama | `curl -s http://127.0.0.1:8090/running` shows `qwen3-embed-0.6b` slot active; `curl -s http://127.0.0.1:16700/api/ps` shows qwen3-embedding `expires_at` UNCHANGED from before the cognify call | qwen3-embed-0.6b in llama-swap `/running` + qwen3-embedding:0.6b expires_at frozen on Ollama | pending operator |

**Note on (f)**: CogneeMCP is FastMCP-over-HTTP per `cognee-mcp/src/server.py:73` (`mcp = FastMCP("Cognee")`) launched with `--transport http --port 8000 --path /mcp`. The endpoint is an MCP JSON-RPC stream, not a REST `POST /mcp/cognify` route — that's why operator-AI's proposed direct curl returned 404 in Stream F's probe. The correct verification is via an MCP client (Claude Code session) calling the registered `cognify` tool.

---

## §5 — Rollback gate (90s SLO)

If any of (b)-(g) fails within 90s of restart, execute:

```powershell
# Restore prior env (drop the 5 new keys)
$existing = (nssm get CogneeMCP AppEnvironmentExtra)
$rolled = ($existing -split "`r?`n") | Where-Object {
  $_ -notmatch '^(EMBEDDING_PROVIDER|EMBEDDING_MODEL|EMBEDDING_ENDPOINT|EMBEDDING_DIMENSIONS|EMBEDDING_MAX_COMPLETION_TOKENS)='
}
nssm set CogneeMCP AppEnvironmentExtra ($rolled -join "`r`n")
nssm restart CogneeMCP
Start-Sleep 15
Invoke-RestMethod -Uri http://127.0.0.1:8000/health -TimeoutSec 5
```

**Expected recovery time**: ~20s (nssm restart 5-10s + uvicorn cold-load 10-15s). Health endpoint should return `{"status":"ok"}` within 30s. If it does NOT, escalate — there may be an unrelated cold-restart issue, do not blame the env rollback.

**Vector-store dimension caveat**: if §4 (f) lands ANY embedding via the new 1024-dim provider into the pre-existing 3072-dim collection, subsequent reads from the same collection may dimension-mismatch. The `cognee_db` last-written 2026-04-18 means the collection schema is largely fresh; safest rollback is to **also purge** `Z:\claude-sota-installed-state\cognee\data\databases\cognee_db` if any successful 1024-dim insert occurred (~2MB file, negligible to lose given 1-month staleness).

---

## §6 — OllamaServe retirement preflight (5-min observation)

Once §4 (b)-(g) all PASS, run the retirement preflight:

```powershell
# 5-minute observation window — watch Ollama for any embedding traffic
$start = Get-Date
Write-Output "Observation window: $start to $($start.AddMinutes(5))"
1..30 | ForEach-Object {
  $ps = Invoke-RestMethod -Uri http://127.0.0.1:16700/api/ps -TimeoutSec 3 -ErrorAction SilentlyContinue
  $ts = (Get-Date).ToString('HH:mm:ss')
  $embed = $ps.models | Where-Object { $_.name -match 'embed' }
  if ($embed) {
    Write-Output "$ts | embed loaded: $($embed.name) expires=$($embed.expires_at) size_vram=$($embed.size_vram)"
  } else {
    Write-Output "$ts | no embed model loaded"
  }
  Start-Sleep 10
}
```

**Retire-safe criteria** (ALL must hold across the 5-min window):
- `expires_at` of `qwen3-embedding:0.6b` MUST NOT advance (no fresh embedding call refreshing the TTL).
- No NEW embedding model name appears (e.g. `nomic-embed-text` from the upstream cognee CLAUDE.md recipe).
- Cognee `cognify` operation in §4 (f) DID complete successfully without touching Ollama (verified by (g)).

If retire-safe holds:

```powershell
nssm stop OllamaServe
nssm set OllamaServe Start SERVICE_DEMAND_START   # downgrade from AUTO_START so it doesn't auto-revive
```

**Do NOT `nssm remove` yet** — keep the service definition for 7 days as a rollback hatch.

---

## §7 — Open questions

1. **The 1-month-stale cognee `data/` dir** suggests cognee T3 is largely unused in real-world workflow. If true, the entire repoint may be lower-priority than W301.G suggests, and the operator-AI HIGH classification could be DEMOTED to MEDIUM. Stream F flags but does not decide. *Recommendation*: pair this repoint with at least one fresh `cognify` call from the operator's actual workflow to validate the path is real before retiring Ollama.

2. **LLM/embedding provider independence**: confirmed independent at the config layer (separate `BaseSettings` classes), but `OpenAICompatibleEmbeddingEngine.__init__` accepts `api_key=embedding_api_key or llm_api_key` (`get_embedding_engine.py:112`) — so if the operator later sets a real `OPENAI_API_KEY`, it would leak into the embedding call. **Mitigation**: keep `OPENAI_API_KEY=local` (current value); local llama-server ignores the token. Document this coupling.

3. **Pre-existing 3072-dim vectors in `cognee_db`** (sqlite via `litellm-LANCE` per cognee defaults): if any survived from a prior real-OpenAI run, mixing them with new 1024-dim qwen3-embed inserts will produce silent retrieval errors. The cognify smoke in §4 (f) should be a *fresh* dataset, OR the operator should accept the §5 caveat and purge `cognee_db` post-repoint.

4. **CogneeMCP NSSM logs at `Z:\claude-hub\logs\cognee-mcp-{stdout,stderr}.log`** — the path is in a sibling runtime (`claude-hub`) which is NOT one of the documented runtimes (claude-sota-installed | claude-sota | claude). Stream F could not read it directly. *Recommendation*: relocate via `nssm set CogneeMCP AppStdout Z:\claude-sota-installed-state\cognee\logs\cognee-mcp-stdout.log` (matches the SYSTEM_ROOT_DIRECTORY convention) before applying §3, so post-restart errors are observable from this runtime.

5. **`OPENAI_COMPATIBLE` is the literal cognee provider name** (with `_`, not `-`). Operator-AI's brief used `openai_compatible` correctly; Stream F verified spelling against `get_embedding_engine.py:104`.

6. **Tokenizer fallback**: `OpenAICompatibleEmbeddingEngine.get_tokenizer()` first tries `HuggingFaceTokenizer(model="qwen3-embed-0.6b", ...)` — which will likely FAIL (no HF repo by that name) and fall back to `TikTokenTokenizer(model=None, ...)`. This is benign (logged as warning at `OpenAICompatibleEmbeddingEngine.py:254-259`) but operator should expect a "Could not get tokenizer from HuggingFace" line in the stderr log post-restart.

---

## Decision

**RECOMMENDED-APPLY pending operator confirm.**

- §1 falsifies operator-AI's framing but confirms the repoint is still the right move (cognee would otherwise hard-fail on first cognify).
- §3 env block is exact, name-corrected (`EMBEDDING_ENDPOINT` not `EMBEDDING_API_URL`), and dimension-correct (1024 not 3072).
- §4 (a) live-verified pre-flight PASS at 0.7s; (b)-(g) pending operator action.
- §5 rollback is 20s + a possible 2MB cognee_db purge.
- §6 retirement preflight is a 5-min observation, then `nssm stop` with `SERVICE_DEMAND_START` rollback hatch (NOT `nssm remove` for 7 days).
- §7 flags 6 caveats, none of which block APPLY.

**Operator actions**:
1. Decide on §7 Q1 (is cognee T3 actually used?) — if NO, downgrade priority.
2. Apply §3 NSSM env block.
3. Run §4 (b)-(g) with a fresh CC session for the cognify smoke.
4. Run §6 5-min preflight.
5. If all green: `nssm stop OllamaServe` with the demand-start downgrade.

End. Stream F complete.
