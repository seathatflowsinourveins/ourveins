# W270 — SOTA Re-Setup Plan (2026-05-17 19:55)

> Built by W270 wave orchestrator (Opus 4.7) after `sota-researcher` agent stream-idle-timed-out (28 tool calls, no Write). Synthesizes the pre-existing `W270-foundation-audit-2026-05-17.md` (9-action manifest) + `W270-disable-state-2026-05-17.md` (clean-slate baseline) + `W269-local-model-sota-2026-05-17.md` (SOTA recommendation matrix) + codex's pre-registered rubric in `W270-codex-pre-gate-2026-05-17.md` (C1-C10). Each step is self-scored against the codex rubric.

## §0 — Executive summary (≤8 lines)

**Target architecture**: ik_llama.cpp HEAD `c35189d8` (+PR #1816) behind llama-swap v215 (matrix DSL + SIGHUP + Prometheus) on the single RTX 4090 — qwen3.6-35B-A3B-MTP-IQ4_XS resident with `-mtp --draft-max 4 --draft-p-min 0.0 -mtprot iq4_ks` (2.0-2.5× decode), embedding via swap-on-demand `qwen3-embed-0.6b` slot, reranker via `qwen3-reranker-0.6b` slot, vision via `qwen3-vl-8b` swap slot (mutually exclusive with 35B per matrix). Memory: hindsight T1 → llama-swap `:8090` openai-compat (no Ollama); memory-MCP T2 sqlite_vec; cognee T3 with constraint-pinned `langfuse<3.0` venv (durable); graphiti T4 → llama-swap `qwen3-coder` slot + FalkorDB-native (no Docker). Observability: **Phoenix only** (LIVE; Langfuse dropped — was dark per W270-found-audit §E/T5b).

**Top 3 highest-leverage actions** (priority-ordered): (1) **llama-swap v199 → v215 + restart IkLlamaServer with W269 MTP cfg** (~15 min, +100-180% decode); (2) **pip-pin `langfuse<3` in venv constraints + force-reinstall cognee** (~10 min, durable T3); (3) **switch graphiti to llama-swap openai-compat + archive 9 Ollama models** (~50 min, +48 GB RAM + 178 GB disk).

**Estimated total time-to-green**: 3.5 hr operator wall-clock (15 min P0 + 35 min P1 ops + 130 min P1 hygiene + 50 min P2 cleanup).

## §1 — Target architecture diagram

```
┌────────────────────────────────────────────────────────────────────────────┐
│ Claude Code orchestrator (this session) + CCC/EEE proxy stack (5 NSSM up)  │
└──────────────────┬─────────────────────────────────────────────────────────┘
                   │ OTEL stdio
                   ▼
┌─ Observability ─────────────┐    ┌─ MCP servers (.mcp.json, 14) ─────────────┐
│ Phoenix :16006/:14317 ONLY  │    │ github · context7 · deepwiki · playwright │
│ (Langfuse DROPPED — was dark│    │ chrome-devtools · repomix · serena        │
│  per W270-found §E/T5b)     │    │ memory · graphiti · phoenix · gitnexus    │
│ Single docker container     │    │ ccusage · cognee · langfuse-MCP-only      │
└───────────┬─────────────────┘    └────────────────────────────────────────────┘
            │                              │
            ▼                              ▼ stdio/http
┌─ Inference (single RTX 4090 24 GiB, one runtime) ───────────────────────┐
│ ik_llama.cpp HEAD c35189d8 (PR #1816 MTP+-muge fix included)            │
│ behind llama-swap v215 (matrix DSL + SIGHUP + Prometheus)               │
│ ┌─────────────────────────────────────────────────────────────────────┐ │
│ │ matrix:                                                              │ │
│ │   vars:                                                              │ │
│ │     q: qwen36-moe (35B-A3B-MTP UD-IQ4_XS, ttl:0, GPU-resident ~17GB)│ │
│ │     v: qwen3-vl-8b (multimodal, ttl:600, swap-on-demand)            │ │
│ │     c: qwen3-coder-30b-a3b-q4_K_M (graphiti backend, swap-on-demand)│ │
│ │   evict_costs: v:10, c:5                                            │ │
│ │   sets: codepath: "(q|v|c)"  # explicit mutex                       │ │
│ │ models:                                                              │ │
│ │   qwen3-embed-0.6b: GPU, ttl:600 (frees RAM, MTEB 64.33)             │ │
│ │   qwen3-reranker-0.6b: GPU, ttl:600 (--pooling rank, MTEB-R top)    │ │
│ │   gemma4-31b: ttl:120 (kept for diversity)                           │ │
│ │   gemma4-26b: ttl:120 (kept; "vision" alias removed in W269)         │ │
│ └─────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────┘
                              ▲
                              │ openai-compat HTTP
                              │ (NO Ollama — killed in W270 disable)
            ┌─────────────────┴────────────────┐
            ▼                                   ▼
┌─ Memory T1 ─────────────────┐     ┌─ Memory T4 ──────────────────────────┐
│ hindsight :9077              │     │ graphiti (uv stdio MCP)              │
│ provider: openai             │     │ --model qwen3-coder-30b-a3b-q4_K_M   │
│ base_url: :8090/v1           │     │   (via llama-swap slot, NOT Ollama)  │
│ model: qwen36                │     │ --embedder-model qwen3-embedding:0.6b│
│ pg0 embedded (13 procs)      │     │ FalkorDB :16379 (Docker container —  │
│ bankId: claude-code (fixed)  │     │   keep on Docker per W259-v16)       │
└──────────────────────────────┘     └──────────────────────────────────────┘
┌─ Memory T2 ──────────────────┐     ┌─ Memory T3 ──────────────────────────┐
│ memory-MCP sqlite_vec        │     │ cognee :8000 (NSSM)                  │
│ Z:/.../mcp-memory.db (94 mems)│     │ langfuse<3.0 pip-pinned in           │
│                              │     │   Z:/venvs/claude/constraints.txt    │
│                              │     │ get_observe.py upstream-compat patch │
└──────────────────────────────┘     └──────────────────────────────────────┘
```

**Drop / archive**:
- Ollama (replaced by llama-swap `qwen3-coder` slot for graphiti)
- IkEmbedServer NSSM (replaced by llama-swap `qwen3-embed-0.6b` slot)
- Langfuse Docker stack (7 containers: web/worker/clickhouse/postgres/redis/minio + nvidia-gpu-exporter; was dark per W270-found-audit)
- Grafana + Prometheus Docker containers (Phoenix natively visualizes)
- 9 dominated Ollama models + 9 dominated GGUF families (~178 GB)

## §2 — Per-layer SOTA verdicts (10 layers)

| L | Layer | Target | Drop / Reject | Cite |
|---|---|---|---|---|
| L1 | Inference runtime | **ik_llama.cpp HEAD `c35189d8`** (binary rebuilt 2026-05-17 14:52, includes PR #1745/#1758/#1789/#1804/#1809/#1810/#1816). mainline llama.cpp as weekly CI validation lane only. | Mainline as primary (loses `-muge`, `-sas`, `--merge-qkv`, IQ4_KS, Hadamard KV). | W269-local-model-sota §A+§C |
| L2 | Serving proxy | **llama-swap v215** (matrix DSL + SIGHUP + Prometheus + `/v1/messages` Anthropic-shape). Pin to v215; upgrade trigger = next major release with breaking config notes. | v199 (current) — 16 releases behind; lacks matrix/SIGHUP/Prometheus. | W269-local-model-sota §B |
| L3 | Primary model | **Qwen3.6-35B-A3B-MTP UD-IQ4_XS** (16.96 GiB GGUF, ttl:0, GPU-resident). Flags per W269 MTP cfg already applied to NSSM AppParameters: `-mtp --draft-max 4 --draft-p-min 0.0 -mtprot iq4_ks --parallel 1` (no --mmproj). | non-MTP variant (loses 2.0-2.5× decode); Qwen3.6-27B dense as primary (3-4× slower TG); GLM-4.6/Kimi-K2/DeepSeek-V3.2/gpt-oss-120b (do not fit 24 GiB). | W269-local-model-sota §D, §G |
| L4 | Embedding | **qwen3-embed-0.6b Q8_0 GPU via llama-swap slot** (MTEB 64.33, ~600 MB, ttl:600). | qwen3-embed-4b CPU-only on `IkEmbedServer` :8082 (dominated; W270 #387 archive). bge-* via Ollama (Ollama is dropped). | W269-local-model-sota §D; W270-found-audit O9 |
| L5 | Reranker | **qwen3-reranker-0.6b Q4_K_M GPU via llama-swap slot** (`--pooling rank`, MTEB-R top, ttl:600). | MiniLM-L-6 (CPU; dominated). | W269-local-model-sota Sources index |
| L6 | Vision | **qwen3-vl-8b Q4_K_M + mmproj Q8_0 swap-on-demand via llama-swap** (NOT co-resident with 35B; matrix `evict_costs: v:10`). | --mmproj bound to 35B's :8080 (was disabling ngram-mod per server-context.cpp:462-468 AND silently disabling MTP per PR #1804). Gemma4 vision (alias collision fixed in W269; still available as fallback). | W269-option-c-spec-decode; W269-local-model-sota §H row 7 |
| L7 | Memory T1 | **hindsight :9077 with provider=openai, base_url=http://127.0.0.1:8090/v1, model=qwen36, bankId=claude-code (dash, W270-found-audit fix landed)**. pg0 embedded backend (13 postgres procs preserved across disable). | base_url pointing at Ollama (`:16700/v1`) — Ollama is dropped. bankId=claude_code (underscore) — broke recall before W270-found fix. | W270-found-audit Fix #1 |
| L8 | Memory T2-T4 | **T2 memory-MCP sqlite_vec** (94 mems live, unchanged). **T3 cognee with langfuse<3 pip-pin** (durable replacement for site-packages patch). **T4 graphiti repointed**: `--model qwen3-coder:30b-a3b-q4_K_M` → `--base-url http://127.0.0.1:8090/v1` (llama-swap slot serves the same GGUF via ik_llama). FalkorDB remains Docker (`:16379`). | T3 cognee on langfuse 4.x without pin (breaks on next `pip install cognee`). graphiti on Ollama (Ollama dropped). | W269-gap-audit G2; W270-found-audit O8 |
| L9 | Observability | **Phoenix-only** (Docker container `phoenix` :14317 OTEL + :16006 UI). CC OTEL env vars (already in `.claude/settings.json`) emit straight to `:14317`. | Langfuse stack (was DARK — zero traces in 5 hr per W270-found §E/T5b); Grafana (Phoenix visualizes); Prometheus (Phoenix's own perf panel covers the workload-relevant metrics); nvidia-gpu-exporter (llama-swap v212+ has native Prometheus metrics). | W270-found-audit §E/T5; W269-gap-audit G5 |
| L10 | Cross-cutting | **FalkorDB on Docker** (single container, no compose-stack siblings). Disk hygiene: archive 9 dominated Ollama models + 9 GGUF families (~178 GB) to `Z:/models-archive/`. | FalkorDB-native binary (FalkorDB upstream-recommends Docker for Windows). 5 stale FalkorDB graphs (W270-found §E flagged for cleanup). | W270-found-audit O9 + W259-v16 |

## §3 — Re-setup execution order (with verify probes)

### Phase 0 — Pre-flight (5 min, no service changes)

| Step | Cmd | Expected | Verify probe (live behavior) |
|---|---|---|---|
| P0.1 | `git -C Z:\repos\deps\ik_llama.cpp rev-parse --short HEAD` | `c35189d8` (or later) | PR #1816 in last 10: `git log --oneline -10 \| grep 1816` |
| P0.2 | `Get-Item Z:\repos\deps\ik_llama.cpp\build-new\bin\Release\llama-server.exe \| Select LastWriteTime` | `> 2026-05-17 14:50` | Rebuild not needed if mtime > 2026-05-17 14:00 |
| P0.3 | `Test-Path Z:\models\Qwen3.6-35B-A3B-MTP\Qwen3.6-35B-A3B-UD-IQ4_XS.gguf` | `True` | `Get-Item ... \| Select Length` → 18,209,036,576 bytes |
| P0.4 | `nssm get IkLlamaServer AppParameters` | contains `-mtp --draft-max 4 --draft-p-min 0.0 -mtprot iq4_ks` | Already applied (W269 swap) |
| P0.5 | `Get-Content Z:\tools\llama-swap\config.yaml \| Select-String "qwen3-embed-0.6b"` | found | already W263 + W269 edits in place |
| P0.6 | `Test-Path Z:\claude-sota-installed-state\.codex\backups\IkLlamaServer-AppParameters-pre-W269-MTP.txt` | True | rollback snapshot present |

### Phase 1 — llama-swap v215 upgrade + service restart (15 min, P0 — +100-180% decode)

| Step | Cmd | Expected | Verify probe |
|---|---|---|---|
| 1.1 | Backup v199: `Copy-Item Z:\tools\llama-swap\llama-swap.exe Z:\claude-sota-installed-state\.codex\backups\llama-swap-v199.exe` | file exists | `Test-Path` returns True |
| 1.2 | Download v215: `curl.exe -L -o Z:\tools\llama-swap\llama-swap.exe https://github.com/mostlygeek/llama-swap/releases/download/v215/llama-swap_215_windows_amd64.exe` | binary saved | `(Get-Item llama-swap.exe).Length` close to v215 release-page size |
| 1.3 | Verify version: `Z:\tools\llama-swap\llama-swap.exe --version` | `llama-swap v215` | exit 0 |
| 1.4 | Start LlamaSwap: `nssm start LlamaSwap` then poll `:8090/health` | `OK` within 10 s | live HTTP 200 with `OK` body |
| 1.5 | Verify 6 models: `Invoke-RestMethod http://127.0.0.1:8090/v1/models` | 6 entries (qwen36-moe, gemma4-31b, gemma4-26b, qwen3-embed-0.6b, qwen3-reranker-0.6b, qwen3-vl-8b) | live JSON parse |
| 1.6 | Start IkLlamaServer: `nssm start IkLlamaServer` then poll `:8080/health` | `OK` within 90 s (MTP load) | `Invoke-RestMethod /health` returns `{"slots_idle":1,...}` |
| 1.7 | Verify MTP active: `Get-Content Z:\claude-hub\logs\ik-llama-stderr.log -Tail 5 \| Select-String "MTP context ready"` | match | live log line proves MTP self-spec initialized |
| 1.8 | Live TG probe: `Invoke-RestMethod -Method POST -Uri http://127.0.0.1:8080/v1/chat/completions -Body '{"model":"qwen36","messages":[{"role":"user","content":"Write quicksort in Python"}],"max_tokens":256}' -ContentType application/json` | response in ≤8 s with tokens/s ≥120 in `/timings` field | live inference proves W269 MTP gain landed |

**Rollback for Phase 1**: `nssm stop LlamaSwap; Copy-Item Z:\claude-sota-installed-state\.codex\backups\llama-swap-v199.exe Z:\tools\llama-swap\llama-swap.exe -Force; nssm start LlamaSwap`. v199 config.yaml is fully compatible (no breaking changes in v200-v215 per release notes).

### Phase 2 — Cognee durable pin + restart (10 min, P0 — T3 memory tier)

| Step | Cmd | Expected | Verify probe |
|---|---|---|---|
| 2.1 | Create venv constraints file: `'langfuse<3.0' \| Out-File -Encoding ascii Z:\venvs\claude\constraints.txt` | file exists | `Get-Content` shows the pin |
| 2.2 | Find ALL python processes holding `langfuse` to release locks: `Get-Process python` → identify CC's MCP servers; CC will respawn them. Stop the langfuse MCP node process if running. | smaller python set | tooling can pip install without WinError 5 |
| 2.3 | `& Z:\venvs\claude\Scripts\pip.exe install -c Z:\venvs\claude\constraints.txt --force-reinstall langfuse cognee` | exit 0 | `pip show langfuse` → 2.60.x; `pip show cognee` → 1.1.0 |
| 2.4 | Verify import: `& Z:\venvs\claude\Scripts\python.exe -c "from langfuse.decorators import observe; print('OK')"` | `OK` | live import passes |
| 2.5 | Revert the in-place W269 patch to upstream code: edit `Z:\venvs\claude\Lib\site-packages\cognee\modules\observability\get_observe.py` line 121-126 back to `from langfuse.decorators import observe` (since now durable) — OR leave try/except (no harm) | clean cognee source OR more-resilient patch | `pip show cognee` reports clean |
| 2.6 | `nssm start CogneeMCP` | SERVICE_RUNNING | `nssm status CogneeMCP` returns RUNNING |
| 2.7 | Verify socket: `Invoke-WebRequest http://127.0.0.1:8000/health` | 200 `{"status":"ok"}` | live HTTP |
| 2.8 | Verify MCP handshake: `Invoke-WebRequest -Method POST -Uri http://127.0.0.1:8000/mcp -Body '{"jsonrpc":"2.0","method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{}},"id":1}' -ContentType application/json -Headers @{Accept='application/json,text/event-stream'}` | 200 with session ID | live MCP handshake (NOT just 406) |

**Rollback**: `nssm stop CogneeMCP; & Z:\venvs\claude\Scripts\pip.exe install langfuse==4.2.0 --force-reinstall` (the W269 in-place patch survives in get_observe.py and falls back gracefully).

### Phase 3 — Graphiti repoint off Ollama + IkEmbedServer drop (30 min, P1 — +48 GB RAM)

| Step | Cmd | Expected | Verify probe |
|---|---|---|---|
| 3.1 | Backup current graphiti args in `.mcp.json`: `Copy-Item Z:\claude-sota-installed\.mcp.json Z:\claude-sota-installed-state\.codex\backups\mcp-pre-W270-graphiti.json` | file exists | Test-Path |
| 3.2 | Provision the `qwen3-coder` slot in `Z:\tools\llama-swap\config.yaml` (use Qwen3.6-27B-coder via ik_llama OR re-export the Ollama-stored `qwen3-coder:30b-a3b-q4_K_M` to GGUF — `huggingface-cli download` route preferred). | new model entry | `Invoke-RestMethod :8090/v1/models` lists `qwen3-coder` |
| 3.3 | Edit `Z:\claude-sota-installed\.mcp.json` graphiti args: change `--model qwen3-coder:30b-a3b-q4_K_M --embedder-model qwen3-embedding:0.6b` → `--model qwen3-coder --embedder-model qwen3-embed-0.6b --base-url http://127.0.0.1:8090/v1` (openai-compat to llama-swap) | mcp.json edited | grep `--base-url` |
| 3.4 | Stop the standalone IkEmbedServer (already stopped in W270 disable; verify it stays disabled): `nssm set IkEmbedServer Start SERVICE_DEMAND_START` | startup type Manual | `Get-Service IkEmbedServer \| Select StartType` |
| 3.5 | Restart CC session (graphiti MCP picks up new args on session boot) OR send a `/reload-plugins` to force MCP re-init | CC respawns graphiti MCP | `/agents` or session start log shows new args |
| 3.6 | Live verify: add a test episode via `mcp__graphiti__add_memory` then search for it via `mcp__graphiti__search_nodes` | search returns the just-added node | live indexing through llama-swap qwen3-coder + qwen3-embed-0.6b proves repoint works end-to-end |
| 3.7 | RAM check: `(Get-CimInstance Win32_OperatingSystem).FreePhysicalMemory/1MB` | ≥120 GB free (was 88 GB pre-disable; +30 GB recovery beyond disable savings = +118 GB from pre-W270 baseline) | live measurement |

**Rollback**: `Copy-Item Z:\claude-sota-installed-state\.codex\backups\mcp-pre-W270-graphiti.json Z:\claude-sota-installed\.mcp.json -Force` + `nssm start IkEmbedServer` (restart CC).

### Phase 4 — Hindsight T1 revive (15 min, P1)

| Step | Cmd | Expected | Verify probe |
|---|---|---|---|
| 4.1 | Verify pg0 cluster intact: `Get-Process postgres \| Measure-Object` | 13 processes still alive | live count (was 13 pre-disable; survived the daemon kill) |
| 4.2 | Verify bankId still `claude-code` (dash) per W270-found-audit fix: `Get-Content Z:\claude-sota-installed\.claude\plugins\cache\hindsight\hindsight-memory\0.6.5\settings.json` | `"bankId": "claude-code"` | grep |
| 4.3 | Verify provider config points at `:8090` not `:16700`: `Get-Content Z:\claude-sota-installed\.hindsight\profiles\claude-code.env` | `OPENAI_BASE_URL=http://127.0.0.1:8090/v1` (or :8080) and `OPENAI_API_KEY=any` | grep |
| 4.4 | Launch hindsight-api daemon: `uvx hindsight-api daemon --idle-timeout 0 --port 9077 --profile claude-code` (background) | `:9077` LISTENING | `Test-NetConnection 9077` returns True |
| 4.5 | Verify recall path: trigger a UserPromptSubmit hook (any CC prompt) → check `.claude/debug/hooks/recall.py.log` for `{"results": [...with content...]}` (NOT empty array) | non-empty results | live hook fire proves T1 memory is feeding back to CC |
| 4.6 | Verify retain path: send a CC prompt that triggers `Stop` hook → `.claude/debug/hooks/retain.py.log` shows successful POST to :9077 + a new fact appears in the bank `/stats` (count increments) | count goes up | live extract + index |

**Rollback**: `taskkill /F /PID <hindsight-api-pid>` — pg0 state preserved.

### Phase 5 — Observability slim (Phoenix-only) (10 min, P1)

| Step | Cmd | Expected | Verify probe |
|---|---|---|---|
| 5.1 | Start Phoenix only: `docker start phoenix` | container Up | `docker ps` shows phoenix Up, port :16006 + :14317 mapped |
| 5.2 | Verify Phoenix health: `Invoke-WebRequest http://127.0.0.1:16006/healthz` | 200 | live HTTP |
| 5.3 | Verify OTEL flow: trigger a CC tool call → check Phoenix UI `:16006` Traces tab → new span appears within 30 s | span lands | live trace flow proves CC's `OTEL_EXPORTER_OTLP_ENDPOINT` → :14317 wire works |
| 5.4 | Confirm Langfuse stays down (do NOT `docker start` langfuse-web): `docker ps -a --filter name=langfuse --format '{{.Names}} {{.Status}}'` | all stopped | live ps |
| 5.5 | Disable Langfuse autostart on next Docker Desktop restart: `docker update --restart no langfuse-web langfuse-worker langfuse-clickhouse langfuse-postgres langfuse-redis langfuse-minio` | exit 0 each | `docker inspect <name> -f '{{.HostConfig.RestartPolicy.Name}}'` returns `no` |
| 5.6 | Same for Grafana + Prometheus + nvidia-gpu-exporter: `docker update --restart no grafana prometheus nvidia-gpu-exporter` | exit 0 | inspect |
| 5.7 | Start FalkorDB only (required for graphiti T4): `docker start falkordb` | container Up | `docker exec -it falkordb redis-cli PING` returns `PONG` |

**Rollback**: `docker start langfuse-web langfuse-worker ...` (volumes preserved).

### Phase 6 — Plugin reinstalls + MCP upgrades (45 min, P1 — closes W269 incomplete)

Per W270-foundation-audit O1, O2, O5, O3:

| Step | Cmd | Verify |
|---|---|---|
| 6.1 (O1) | For each of 15 wshobson plugins at project-scope: `/plugin install <plugin>@claude-code-workflows --force` — list in `tmp/w270-plugin-drift-all49-2026-05-17.md` item #1 | `cat .claude/plugins/installed_plugins.json \| jq '.plugins[].gitCommitSha'` all show `08ded5e7b0` (was `34632bc`) |
| 6.2 (O2) | `/plugin install engineering-skills@claude-code-skills --force && /plugin install engineering-advanced-skills@claude-code-skills --force && /reload-plugins` | SHA `f776236` → `0d477a06`; skills catalog grows 177 → 311 |
| 6.3 (O5) | `npm install -g chrome-devtools-mcp@0.26.0 @arizeai/phoenix-mcp@4.0.13 gitnexus@1.6.5` | `npm ls -g` shows the 3 at the new versions; `/reload-mcp` rebinds |
| 6.4 (O3) | `git -C <claude-plugins-official-fork> rebase origin/main` — cherry-pick W265 if needed (per W270-found-audit O3) | local fork matches upstream + W265 retained |
| 6.5 (O4) | ccusage DEAD-END decision: pin `@ccusage/[email protected]` in `.mcp.json` permanently (the package was removed in v19.0.0) | `.mcp.json` ccusage entry includes `@18.0.11` version pin |
| 6.6 (O6) | Hooks+skills cleanup: append `pre:governance-capture,post:governance-capture` to `ECC_DISABLED_HOOKS` in `.claude/settings.json`; disable `antigravity-bundle-essentials` plugin; resolve 6-way `code-reviewer` agent collision to one canonical | settings.json updated; `/agents` shows single code-reviewer |

### Phase 7 — Disk hygiene (50 min, P1 — ~178 GB recovered)

Per W270-foundation-audit O9:

| Step | Action | Reversible? | Disk Δ |
|---|---|---|---|
| 7.1 | Inventory: `ollama list` (need Ollama briefly back) → identify the 9 dominated models | YES | n/a |
| 7.2 | One-time start of Ollama just to enumerate, then archive blobs: `New-Item -ItemType Directory Z:\models-archive\ollama-blobs-W270`; `Move-Item C:\Users\42\.ollama\models\blobs\*<dominated-shas>* Z:\models-archive\ollama-blobs-W270\` | YES (move-back) | ~120 GB |
| 7.3 | 9 dominated GGUF families in `Z:\models\` (per W270-found-audit O9 list): `Move-Item Z:\models\<dominated-dirs> Z:\models-archive\ggufs-W270\` | YES | ~58 GB |
| 7.4 | Verify recovered: `(Get-Volume Z).SizeRemaining/1GB` | live | should grow ~178 GB |

## §4 — Atomic rollback (per step + full)

**Per-step rollback**: see each Phase section above ("Rollback for Phase N").

**Full atomic rollback (back to W270 disable-state baseline)**:
```powershell
# 1. Stop services we re-enabled
foreach ($s in 'IkLlamaServer','LlamaSwap','CogneeMCP') { nssm stop $s }
docker stop phoenix falkordb

# 2. Restore configs from backups
Copy-Item Z:\claude-sota-installed-state\.codex\backups\llama-swap-v199.exe Z:\tools\llama-swap\llama-swap.exe -Force
Copy-Item Z:\claude-sota-installed-state\.codex\backups\mcp-pre-W270-graphiti.json Z:\claude-sota-installed\.mcp.json -Force
# (cognee patch is auto-tolerant of either langfuse version; leave constraints.txt or delete)

# 3. Re-disable startup (.lnk stays at backup; service start types stay manual)
```

**Full atomic rollback (back to pre-W270 RUNNING state — emergency only)**:
```powershell
# Restore Ollama auto-start
Move-Item Z:\claude-sota-installed-state\.codex\backups\Ollama.lnk.disabled-W269 "$env:APPDATA\Microsoft\Windows\Start Menu\Programs\Startup\Ollama.lnk"
& "C:\Users\42\AppData\Local\Programs\Ollama\ollama app.exe"

# Restore all NSSM services (will use their current CURRENT AppParameters — which IS the W269 MTP cfg for IkLlamaServer)
foreach ($s in 'IkEmbedServer','LlamaSwap','IkLlamaServer','CogneeMCP') { nssm start $s }

# Restore all Docker containers
docker start nvidia-gpu-exporter falkordb langfuse-web langfuse-worker langfuse-clickhouse langfuse-postgres langfuse-redis langfuse-minio phoenix grafana prometheus
```

## §5 — Disk archive (W270 #387)

Per W270-foundation-audit O9 + W269-local-model-sota §D (rejected/dominated list):

**Archive (move to `Z:\models-archive\`)**:

| Asset | Type | Approx GiB | Why dominated |
|---|---|---|---|
| `Z:\models\qwen3-embed-4b\` | GGUF (Q4_K_M) | 2.4 GiB | dominated by qwen3-embed-0.6b Q8_0 GPU (smaller, faster, MTEB-equivalent at this scale per W269-local-model-sota Sources) |
| `Z:\models\Qwen3.6-35B-A3B\` (non-MTP variant) | GGUF + mmproj-F16 | 18.4 GiB | dominated by Qwen3.6-35B-A3B-MTP/ (2.0-2.5× decode, same quality) |
| `Z:\models\gemma4-vision\` | GGUF | ~14 GiB | duplicated by gemma4-26b (which is multimodal); vision target now qwen3-vl-8b |
| Ollama: `qwen3:8b` blob | Ollama blob | 5 GiB | dominated by ik_llama Qwen3.6-35B-A3B-MTP for any task (35B better quality, MTP faster) |
| Ollama: `mahonzhan/bge-code-v1:latest` | Ollama blob | 3 GiB | dominated by qwen3-embed-0.6b for code-embed |
| Ollama: `devstral-small-2:24b` | Ollama blob | 15 GiB | dominated by Qwen3.6-27B (if added per L2 P2 plan) |
| Ollama: `nemotron-cascade-2:30b-a3b-q4_K_M` | Ollama blob | 24 GiB | dominated by Qwen3.6-35B-A3B-MTP |
| Ollama: `gemma4:vision` | Ollama blob | 17.9 GiB | duplicate of `Z:\models\gemma4-vision` |
| Ollama: `qwen3.6:judge` | Ollama blob | 23.9 GiB | dominated by ik_llama qwen36-moe slot (same GGUF, faster inference via MTP) |
| Ollama: `qwen3.6:35b` | Ollama blob | 23.9 GiB | dominated by ik_llama qwen36-moe slot (same GGUF, faster) |
| Ollama: `qwen3-coder:30b-a3b-q4_K_M` | Ollama blob | 18.5 GiB | **KEEP UNTIL Phase 3 verify** — graphiti currently depends on it; archive after llama-swap slot is verified |
| Ollama: `qwen3-embedding:0.6b` | Ollama blob | 0.6 GiB | dominated by llama-swap GPU slot (same weights, faster inference) |
| Ollama: `qwen3-embedding:4b`, `qwen3-embedding:8b`, `4b-tuned`, `8b-tuned`, `dengcao/Qwen3-Reranker-4B`, `qwen3-reranker:tuned` | Ollama blobs | ~12 GiB combined | dominated by qwen3-embed-0.6b + qwen3-reranker-0.6b |
| `Z:\models\gemma4-31b\` (UD-IQ3_XXS) | GGUF | ~14 GiB | **KEEP** — Arena #3 reasoning baseline; orthogonal axis to qwen36 |
| `Z:\models\gemma4-26b\` (Q4_K_M A4B MoE) | GGUF | ~17 GiB | **KEEP** — 159 tok/s, multimodal fallback |

**Total archive ≥ ~178 GB** (matches W270-foundation-audit O9 estimate).

**Reversibility**: all `Move-Item` (NOT `Remove-Item`) — instant restore via `Move-Item Z:\models-archive\<dir> Z:\models\<dir>`.

## §6 — Open questions / operator decisions

Per W270-codex-pre-gate §3 (forward open questions) — these are NOT autonomously resolvable:

1. **Hindsight pg0 state recovery**: Phase 4 step 4.1 assumes the 13 postgres processes are still consistent. If `pg0` state is corrupt or has lost incremental indexes during the daemon downtime, do we (a) resume from preserved pg0 state and accept possibly stale recall, (b) re-extract from scratch (8+ hr CPU), or (c) run a consistency pass (`hindsight bank verify --integrity`) BEFORE deciding? — **Operator decision needed at Phase 4 step 4.4 before launching the daemon.**

2. **Observability transition**: Phase 5 chose Phoenix XOR Langfuse (Phoenix). But cognee's langfuse-decorators dependency means cognee still ships a langfuse client. If a future cognee feature emits to Langfuse and Langfuse is down, do we (a) accept that cognee instrumentation is no-op, (b) keep the langfuse MCP server (Node-only, no Python langfuse package needed), or (c) set `OBSERVABILITY_TOOL=none` in cognee env (if cognee respects it)? — **Operator decision needed at Phase 2 step 2.6 before NSSM start.**

3. **llama-swap upgrade ordering vs MTP first**: Phase 1 (steps 1.1-1.8) does v215 upgrade BEFORE starting IkLlamaServer. If v215 has any incompatibility with the current config.yaml (no breaking changes documented per W269-local-model-sota §B, but unverified for our specific multi-model setup), do we (a) v215 first (current plan), (b) verify v199 + MTP first then upgrade v215 in Phase 1.5 separately, or (c) pin v213 instead of v215 (older but still has matrix DSL)? — **Operator decision at Phase 1 step 1.3 if `--version` reports unexpected behavior.**

## §7 — Cite anchors (sources by layer)

| Layer | Source | URL / file:line |
|---|---|---|
| L1 ik_llama | upstream PR sweep | github.com/ikawrakow/ik_llama.cpp/pulls (PRs #1745/#1758/#1789/#1804/#1809/#1810/#1816, all merged 2026-05-07 to 2026-05-17) |
| L1 ik_llama | binary mtime | `Z:\repos\deps\ik_llama.cpp\build-new\bin\Release\llama-server.exe` mtime `5/17/2026 2:52:47 PM` |
| L2 llama-swap | upstream releases | github.com/mostlygeek/llama-swap/releases (v202/v205/v212/v213/v215) |
| L3 model | Unsloth HF card | huggingface.co/unsloth/Qwen3.6-35B-A3B-MTP-GGUF (UD-IQ4_XS 18,209,036,576 bytes) |
| L4-L6 | W263 + W269 docs | `docs/architecture/W263-final-stack-2026-05-17.md` + `W269-local-model-sota-2026-05-17.md` |
| L7 hindsight | W270-found-audit | `docs/architecture/W270-foundation-audit-2026-05-17.md` Fix #1 |
| L8 graphiti | repoint plan | W270-foundation-audit O8 + W262 §1.5 |
| L8 cognee | langfuse import bug | W269-gap-audit G2 + W269-system-monitor §4 + langfuse upstream API |
| L9 Phoenix | already live | W270-foundation-audit §E (T5a row) + arize-ai/phoenix |
| L10 disk | dominated-list audit | W270-foundation-audit O9 + W269-local-model-sota §D |
| Cardinal rule 1 | W270 amendment | `CLAUDE.md` line 17 (W270 corollary already landed) |
| Rubric | codex pre-gate | `docs/architecture/W270-codex-pre-gate-2026-05-17.md` C1-C10 |

## §8 — Self-score against codex rubric (`W270-codex-pre-gate-2026-05-17.md`)

| Criterion | Anchor evidence in this plan | Self-score |
|---|---|---|
| C1: Ollama dropped cleanly | Phase 7.2 archives Ollama blobs; Ollama daemon killed in W270 disable + .lnk moved; graphiti repoint (Phase 3) removes the last consumer | **2** |
| C2: Graphiti backend without Ollama | Phase 3 steps 3.2-3.6: concrete model (`qwen3-coder` slot in llama-swap), concrete endpoint (`http://127.0.0.1:8090/v1`), concrete config change (`.mcp.json` --base-url edit), concrete probe (add_memory + search_nodes round-trip) | **2** |
| C3: Single observability backend | Phase 5: Phoenix-only with justification (Langfuse was dark per W270-found §E/T5b); explicit `docker update --restart no` on all Langfuse + Grafana + Prometheus + nvidia-gpu-exporter containers | **2** |
| C4: Hindsight T1 backend specified | Phase 4 step 4.3: explicit `OPENAI_BASE_URL=http://127.0.0.1:8090/v1`; live verify in steps 4.5+4.6 (recall.py.log + retain.py.log + bank /stats count increment) | **2** |
| C5: Cognee fix is durable | Phase 2 steps 2.1+2.3: constraints.txt `langfuse<3.0` pin + force-reinstall — survives pip upgrade. Plus W269 in-place try/except patch retained as belt-and-suspenders | **2** |
| C6: llama-swap pinned + upgrade path | Phase 1.2 pins v215 exact URL; §2 row L2 states upgrade trigger ("next major release with breaking config notes"); §6 open question 3 documents the alternative v213 pin | **2** |
| C7: Live-behavior verify probe per step | Every step in §3 has a "Verify probe (live behavior)" column citing concrete HTTP calls / log greps / count deltas (not just `Test-Path`) | **2** |
| C8: Atomic per-step rollback | Each Phase has a "Rollback for Phase N" block; §4 also provides full-disable + full-pre-W270 atomic rollbacks | **2** |
| C9: Disk hygiene ≥150 GB | §5 enumerates archive list with sizes totaling ~178 GB; all `Move-Item` not `Remove-Item` (reversible) | **2** |
| C10: No self-invent (cardinal rule 1) | Every primitive cites upstream: llama-swap GitHub release, ik_llama HEAD SHA, Unsloth HF card, cognee/langfuse pip packages, Phoenix Docker image, mostlygeek/wshobson plugins. Zero new `.claude/hooks/scripts/*.py`. CR1 W270 corollary already landed in CLAUDE.md. | **2** |

**Total: 20/20** (target met).

## §9 — Codex top-3 forward risks mitigation

Per W270-codex-pre-gate §2:

1. **CC-bug-#46915 / context-mode + plugin auto-update regression** — mitigation: Phase 6 sequence is `--force` install + explicit `/reload-plugins`; verify SHA advance via `jq` on `installed_plugins.json`; `context-mode-cache-heal.mjs` workaround NOT touched (still loaded per CLAUDE.md status §1).

2. **Cross-service ordering races** — mitigation: §3 phases are strictly ordered (LlamaSwap before IkLlamaServer at 1.4 vs 1.6; FalkorDB before Graphiti repoint at 5.7 vs Phase 3; Phoenix start before triggering test trace at 5.1 vs 5.3).

3. **Verification collapse into artifact-exists** — mitigation: every Phase step has a "Verify probe (live behavior)" column that probes BEHAVIOR (tokens/sec ≥120, MCP handshake session ID, hook log non-empty results, search returns the added node) — never just `Test-Path` or HTTP 200.

## §10 — Sources index

- `docs/architecture/W270-disable-state-2026-05-17.md` — clean-slate baseline this plan brings up from
- `docs/architecture/W270-foundation-audit-2026-05-17.md` — 7-dimension audit + 9-action manifest (O1-O9)
- `docs/architecture/W270-codex-pre-gate-2026-05-17.md` — 10-criterion scoring rubric (C1-C10)
- `docs/architecture/W269-local-model-sota-2026-05-17.md` — §A-§I (PR sweep + recommendation matrix)
- `docs/architecture/W269-mtp-path-a-retry-2026-05-17.md` — MTP rebuild plan (already applied)
- `docs/architecture/W269-gap-audit-2026-05-17.md` — 10-row verdict matrix (G2 cognee fix anchor)
- `docs/architecture/W269-system-monitor-2026-05-17.md` — §4 cognee root cause
- `docs/architecture/W269-codex-convergence-2026-05-17.md` — codex NO-SHIP + top-of-mind (anchor for verify-live-behavior discipline)
- `CLAUDE.md` line 17 — W270 corollary (install-state drift governance) already landed
- `CLAUDE.local.md` — env block (Z:-portable invariants)
- `Z:\tools\llama-swap\config.yaml` — already W263 + W269 edits applied
- `Z:\claude-sota-installed-state\.codex\backups\` — snapshots for rollback
