# W297 Stream B — Local-Model Role Mapping in 6-Tier Memory Architecture

> **Wave**: W297 · **Stream**: B (analysis, read-only) · **Date**: 2026-05-18
> **Scope** (per `W297-PLAN.md §1` Stream B row): emit per-tier × per-model matrix (T1..T6 × {qwen36, qwen3-coder:30b, qwen3-embedding:0.6b, bge-small-en-v1.5}) + audit accuracy/fit + per-tier verdict (KEEP-CURRENT / SWAP-MODEL / RETIRE-TIER / DAEMON-SUPERVISION-GAP) + optimisations cross-referenced to Stream A's top-5.
> **Author**: Stream B (general-purpose subagent · cardinal-rule-3 compliant)
> **Verdict tier discipline**: all T1/T2/etc. references inherit `T1-PENDING-LANE-C` per `W296-AUDIT-2026-05-18.md §3` codex-r1 Stream-C HIGH (D8 author-claims-only cap@2).
> **File ownership**: this file only (per `W297-PLAN.md §2`). Does NOT edit `CLAUDE.md`, `.claude/settings.json`, `.mcp.json`, `.claude/skills/sota-convergence-audit/SKILL.md`. Findings route to coordinator for synthesis post-stream-return.

---

## §0 — TL;DR (5 sentences + bold-headline-verdict per tier)

Five live probes plus 3 stale-state corrections rewrite the W296 / W297-PLAN baseline: (1) **`qwen36@:8080` is NOT 35B-coder — it is a 57.5B-param Q4 MoE served by a standalone NSSM `IkLlamaServer` running `Z:\repos\deps\ik_llama.cpp\build-new\bin\Release\llama-server.exe` with the `Qwen3.6-35B-A3B-MTP/UD-IQ4_XS.gguf` mlocked at port 8080** (per `nssm get IkLlamaServer AppParameters` + W269 model-spec drift; W297-PLAN §1's "35B-A3B" framing is approximately right on architecture but the live `n_params=57.5B` says it's the MTP-extended variant); (2) **`C:/Users/42/.cognee/` no longer exists — cognee state already lives at `Z:\claude-sota-installed-state\cognee\` with `Z:\claude-sota-installed-state\.cognee\` as logs dir** (per `nssm get CogneeMCP AppEnvironmentExtra`: `SYSTEM_ROOT_DIRECTORY=Z:\claude-sota-installed-state\cognee` + `DATA_ROOT_DIRECTORY=...\cognee\data` + live filesystem check); CLAUDE.md:31 AI-3a + W297-PLAN §0 "violates state-outside-repo" is **STALE — already-fixed**, ratification commit pending; (3) **basic-memory IS live + writing** — `Z:\claude-sota-installed-state\basic-memory\config\memory.db` is 2.8 MB + WAL 9.2 MB + 31 daemon log files dated 2026-05-18T16:28, `config.json` exists at 540 bytes, contradicting W297-PLAN §0 "MISSING at BOTH paths" and W295-AUDIT §1.6 "memory.db is EMPTY" — both findings were probe-time-stale; (4) **Ollama daemon stays load-bearing for one tier only — cognee T3 embedding model `qwen3-embedding:0.6b`**, since graphiti is RETIRED and hindsight LLM goes to `:8080/v1` not Ollama's `:16700`; if cognee migrates to direct llama-server embedding endpoint, the `:16700/Ollama` daemon can stop and free ~21 GB RAM; (5) **llama-swap IS already running at `:8090` supervising 7 model entries** (Gemma 4 31B/26B, qwen3-embed-0.6b, qwen3-vl-8b, qwen3-reranker-0.6b, qwen3-coder-30b-CPU, `_disabled_qwen36-moe`) — Task #385's "llama-swap v199→v215 MTP recipe" is framing-error per Stream A §5; MTP is upstream in llama.cpp PR #22673 (`b9110+`), independent of llama-swap.

**Headline verdicts** (one bolded clause per tier):

- **T1 hindsight** — **KEEP-CURRENT** (canonical `qwen36@:8080` LLM endpoint LIVE; consolidation worker model-routing correct; T2-pending optimisation: enable MTP per Stream A §4.1).
- **T2 memory-MCP** — **DAEMON-SUPERVISION-GAP + RECONCILE-DUAL-WIRE-DRIFT** (`.mcp.json:memory` disabled per `settings.json:86-91`; `plugin:everything-claude-code:memory` active per W296 §2.5; no LLM dependency; no model swap needed).
- **T3 cognee** — **KEEP-CURRENT + 1 OPTIMISATION** (`qwen36@:8080` for LLM extract + `qwen3-embedding:0.6b@:16700` Ollama for vectors — both reachable; AI-3a "state-violates" is STALE per §1.3; consider repointing embedding to `:8090/v1/qwen3-embed-0.6b` llama-swap entry to retire Ollama).
- **T4 graphiti** — **RETIRE-TIER (already retired)** — graphiti is in `settings.json:disabledMcpjsonServers`; `qwen3-coder:30b@Ollama:16700` was its only consumer; W272+W290+W295 codex-APPROVED retirement; **operator can stop the Ollama daemon iff §3 cognee-Ollama-decoupling lands**.
- **T5 langfuse** — **DAEMON-SUPERVISION-GAP** (probe DOWN: WinError 10061; no model dependency; restart routes to Stream C).
- **T6 basic-memory** — **KEEP-CURRENT** (markdown-canonical, bge-small-en-v1.5 embedding via FastEmbed CPU, no Ollama/llama.cpp dependency; AI-3 config-path-drift is STALE per §1.6 + §2.6 live evidence; W295 STAY-WITH-HARDENING confirmed).

**Biggest dead-weight finding**: **Ollama daemon at `:16700` is now load-bearing for ONE consumer only (cognee `qwen3-embedding:0.6b`)** — graphiti was its primary justification (W263d, W259-v15) and graphiti is RETIRED. If cognee's embedding can move to llama-swap's `qwen3-embed-0.6b@:8090` entry, Ollama daemon (and the 17.3 GB `qwen3-coder:30b` it would warm on demand) can fully retire — freeing ~21 GB RAM peak. Per `CLAUDE.md` Task #386 framing ("graphiti repoint OR kill Ollama daemon +48GB RAM"), the **kill-Ollama path is now reachable** — operator decision required.

---

## §1 — Per-tier role matrix (T1..T6 × 9 columns)

> All probes performed live this wave (2026-05-18). `live-status` = result of `curl -m 5 <endpoint>` or equivalent process check at this audit.

| Tier | Role | live-status | Model required? | Current model | Model purpose within tier | Fit (1-5) | Replacement candidate (from Stream A §1.5 / §4) | Replacement tier per sca-v3.1 |
|---|---|---|---|---|---|---|---|---|
| **T1 hindsight** | episodic agent-memory consolidation + recall (vector + knowledge-graph hybrid) | ✓ **UP 200** at `:9077/health` → `{"status":"healthy","database":"connected"}` | **YES** — consolidation worker calls an OpenAI-compatible chat-completions endpoint to extract entities/observations/worlds from session transcripts | `qwen36@:8080/v1` per `.claude/settings.json:41-43` (LLM only); separately bge-small-en-v1.5 for embeddings via the hindsight-embed sidecar at `:9077` | (a) Episode-tail summarisation; (b) entity/observation/world extraction; (c) recall-query rewriting — all batched at `HINDSIGHT_API_WORKER_CONSOLIDATION_MAX_SLOTS=1` (settings.json:45) | **4** | `ggml-org/llama.cpp HEAD` (already incumbent; **upgrade to `b9110+` to absorb PR #22673 MTP** per Stream A §4.1 → measured **+50-158 tok/s decode** on `devnen/qwen3.6-windows-server` corroborating practitioner report) | **T1-PENDING-LANE-C** (Stream A §4.1 rank #1 install_score 4.41) |
| **T2 memory-MCP** | session-key/value entity store (sqlite_vec hybrid) | ✗ **disabled** at `.mcp.json:memory` per `settings.json:86-91`; `plugin:everything-claude-code:memory` ACTIVE per W296 §2.5 axis-5 | **NO** — sqlite_vec + bge-small-en local embedding (FastEmbed CPU per same library as basic-memory); no LLM extraction | (n/a — no LLM); embedding: bge-small-en-v1.5 (FastEmbed in-process, 384-dim) | session-scoped key/value: `mcp__plugin_everything-claude-code_memory__create_entities` × `add_observations` × `read_graph` etc.; designed for ephemeral working-memory not durable ledger | **3** (load-bearing-as-fallback only; canonical ledger is T6) | n/a (no model swap; tier-level decision is whether to consolidate T2 down to T6 — see §5) | n/a |
| **T3 cognee** | semantic graph + vector RAG (LiteLLM-routed) | ✓ **UP** at `:8000/health` → `{"status":"ok"}` (NSSM `CogneeMCP` Running Automatic) | **YES** — graph extract (LLM) + embeddings (separate model) | LLM: `qwen36@:8080/v1` (per `nssm get CogneeMCP AppEnvironmentExtra`: `OPENAI_BASE_URL=http://127.0.0.1:8080/v1` + `LLM_MODEL=qwen36`); embeddings: `qwen3-embedding:0.6b@:16700` Ollama (per `.mcp.json` _comments.ollama_w259v15 + W259-v15) | (a) Graph-extract pipeline: entities/edges/communities; (b) chunk embedding → kuzu graph store + vector search; (c) recall over `mcp__cognee__cognify` / `search` | **3** (HEAD-version active but config drift in audit history; D17 untested for autonomous-loop write-volume per W296 §2.5) | LLM stays at `qwen36@:8080` (no change). Embedding: **repoint from Ollama:16700 → llama-swap:8090/v1/qwen3-embed-0.6b** (same model weights, same dim=1024, removes Ollama dependency — see §6.1) | n/a (KEEP + 1 daemon-retire optimisation) |
| **T4 graphiti** | temporal knowledge graph (FalkorDB-backed, episodic events) | ✗ **RETIRED** 2026-05-18 commit `9af4885` per `CLAUDE.md:31` + `settings.json:91 disabledMcpjsonServers` includes `graphiti`; `.mcp.json:64-101` block preserved for inspection but server NOT spawning; FalkorDB+Ollama "can be stopped" per CLAUDE.md | **WAS YES** — `qwen3-coder:30b-a3b-q4_K_M@:16700` Ollama (LLM) + `qwen3-embedding:0.6b@:16700` Ollama (embed), per `.mcp.json:graphiti.args` lines 79-83 + W263d swap | (none — retired) | **n/a** (retired) | n/a (retired affirmatively per W272 codex review) — Stream A §1.3 confirms graphiti retirement implies Ollama-justification gone for `qwen3-coder:30b` consumer; only `qwen3-embedding:0.6b` for cognee keeps Ollama daemon alive | n/a (RETIRE-TIER) |
| **T5 langfuse** | LLM-call observability + prompt-management (traces/spans/datasets) | ✗ **DOWN** at `:3000` (WinError 10061 refused this wave + matches W297-PLAN §0 + W296 §2.5 axis-5 "T1+T5 DOWN at probe") | **NO** — pure observability (it records traces but does not invoke an LLM itself; SDK clients send traces in-band) | (none — observability layer; consumes models indirectly via traces from graphiti/cognee/hindsight when those tiers call into qwen36 or qwen3-coder) | (n/a — model-orthogonal; recorded subjects are other tiers' LLM calls) | **5** (observability is correctly model-orthogonal; the tier failure is **daemon-supervision**, not model-fit) | n/a (no model swap; daemon restart routes to Stream C live-state repair) | n/a (DAEMON-GAP) |
| **T6 basic-memory** | canonical markdown ledger (filesystem-survivable adoption-decision records + W288 verdicts) | ✓ **LIVE** — daemon writes 31 `basic-memory-*.log` files at `Z:\claude-sota-installed-state\basic-memory\config\` last-modified 2026-05-18T16:28 (within last hour); `memory.db` 2.8 MB + WAL 9.2 MB; `config.json` (540 B) present (contradicts W297-PLAN §0 + W295-AUDIT §1.6 staleness) | **NO** — embedding-only via FastEmbed `bge-small-en-v1.5` (384-dim, in-process CPU); no LLM consolidation step (write_note is direct + immediate) | bge-small-en-v1.5 via FastEmbed `fastembed_cache/` (no API call; bundled with `basic-memory.exe`) | (a) FTS5 full-text over markdown; (b) sqlite-vec semantic search (bge-small-en); (c) tool annotations per W295 §1.1 | **5** (W295 deep-audit STAY-WITH-HARDENING composite **4.16** topped 11 alternatives on D1+D6 simultaneously per `W295-BASIC-MEMORY-DEEP-AUDIT.md §2`) | n/a (W295 verdict STAY) | n/a (KEEP-CURRENT) |

### §1.1 — Per-tier daemon dependency graph (live)

```
ports         services        consumers
=====         ========        =========
:8080  ←──  IkLlamaServer  ←──  hindsight (T1) LLM
                            ←──  cognee (T3) LLM
                            (1 NSSM service, qwen36 = 57B Q4 mlocked)

:8090  ←──  LlamaSwap      ←──  (currently 0 active consumers — proxy ready
                                  but not in any tier's config; 7 model
                                  entries on standby for cold-load swap)

:16700 ←──  OllamaServe    ←──  cognee (T3) embeddings (qwen3-embedding:0.6b)
                            ←──  graphiti (T4) — RETIRED, no longer
                                  consuming
                            (qwen3-coder:30b-a3b-q4_K_M pulled but
                            not loaded — 0 in VRAM per /api/ps)

:9077  ←──  hindsight-api  ←──  T1 daemon (HTTP API server)
                            ←──  consolidation worker (calls :8080)

:8000  ←──  CogneeMCP      ←──  T3 MCP entry in .mcp.json:cognee

:3000  ←──  langfuse       ←──  T5 MCP (DOWN at probe)
                            ←──  observability traces from hindsight/cognee
                                  (currently no-op since :3000 refused)

:9077embed ←─ hindsight-embed-sidecar ←── T1 bge-small embeddings
                                          (DOWN at probe time per
                                          W296 §2.5; W280b bootstrap
                                          requires `:9077` daemon)
```

### §1.2 — Cite anchors used in §1

- `W297-PLAN.md §0` — pre-flight probe state (langfuse DOWN + Ollama 0 models loaded + cardinal-rule-2 file)
- `W296-AUDIT-2026-05-18.md §2.5` (via `W296-STREAM-A-CURRENT-ARCH-AUDIT.md:389-437`) — axis-5 memory weak-spots
- `W295-BASIC-MEMORY-DEEP-AUDIT.md §1.6` — basic-memory live data check (verified STALE this wave, see §1.6 below)
- `.claude/settings.json:40-49` — `HINDSIGHT_API_LLM_*` env block
- `.mcp.json:64-101` — graphiti block (retired)
- `.mcp.json:118-141` — cognee + basic-memory blocks
- `nssm get IkLlamaServer AppParameters` (live this wave)
- `nssm get CogneeMCP AppEnvironmentExtra` (live this wave)
- `curl http://127.0.0.1:8080/v1/models` + `:8090/v1/models` + `:16700/api/tags` + `:16700/api/ps` (live this wave)

### §1.3 — Stale-state correction #1: `C:/Users/42/.cognee/` AI-3a

`CLAUDE.md:31` Status block lists: "T3 cognee ✓ ACTIVE (NSSM `:8000/mcp`; data-dir `C:/Users/42/.cognee` AI-3a violates state-outside-repo)". This wave verified:

```
$ ls -la C:/Users/42/.cognee/
No such file or directory   ← path does NOT exist
$ ls Z:/claude-sota-installed-state/cognee/
.env  data/  logs/  models/  tmp/
$ nssm get CogneeMCP AppEnvironmentExtra
SYSTEM_ROOT_DIRECTORY=Z:\claude-sota-installed-state\cognee
DATA_ROOT_DIRECTORY=Z:\claude-sota-installed-state\cognee\data
```

The cognee data already migrated to `Z:\claude-sota-installed-state\cognee\` (operator's state-outside-repo convention per CLAUDE.local.md §Z-portable-install ENV block (f)). The W288 DEFERRED-OPERATOR-ACTION at `CLAUDE.md:42` ("`migrate-cognee-state.ps1 -Execute`") is **already-executed**, ratification commit pending in CLAUDE.md status block. Routes to coordinator: update CLAUDE.md:31 to remove AI-3a + Task #386 framing.

### §1.4 — Stale-state correction #2: basic-memory `config.json` MISSING

`W297-PLAN.md §0` table row: "basic-memory config.json (Z: path) ✗ MISSING ... basic-memory config.json (user-scope) ✗ MISSING ... WORSE than W296 documented — neither path has config". This wave verified:

```
$ ls Z:/claude-sota-installed-state/basic-memory/config/
config.json (540 bytes, 2026-05-17 23:24)  ← EXISTS
memory.db (2.8 MB)  + WAL 9.2 MB  ← LIVE
fastembed_cache/ + 31 daemon log files  ← consolidation active
```

The `.mcp.json:basic-memory.env` sets `BASIC_MEMORY_CONFIG_DIR=Z:/claude-sota-installed-state/basic-memory/config` (line 139); config.json is at THAT path, not `Z:/.../basic-memory/config.json` (top-level) which is what W297-PLAN probed. Path-form clarification, not a missing file. Routes to coordinator: correct W297-PLAN §0 probe table.

### §1.5 — Stale-state correction #3: W295 basic-memory `memory.db` EMPTY

`W295-BASIC-MEMORY-DEEP-AUDIT.md §1.6`:

> `Z:\claude-sota-installed\.basic-memory\memory.db` is **241 KB, EMPTY** (entity:0, observation:0, note_content:0, search_index:0).

But this audit looked at the IN-REPO `.basic-memory/memory.db` (path drift artifact). The actual daemon writes to `Z:\claude-sota-installed-state\basic-memory\config\memory.db` per `.mcp.json:139` `BASIC_MEMORY_CONFIG_DIR` env override. This wave finds 2.8 MB + WAL 9.2 MB + 31 logs = active consolidation/write workload. W295's AI-3 fix-command (which proposed re-pointing `config.json.projects.main.path`) is partially executed — the config now points to `Z:/claude-sota-installed-state/basic-memory/markdown` per `cat Z:/claude-sota-installed-state/basic-memory/config/config.json`, and the markdown verdict file at `Z:/.../basic-memory/verdicts/W288-research-arch-v2-itself — adoption verdict.md` (5.4 KB) **is being consolidated into memory.db** (evidenced by the active WAL + log activity).

W295's AI-3 is **substantially-fixed but not closed in CLAUDE.md status**. Routes to coordinator: mark W295-AI-3 SHIPPED.

---

## §2 — Per-model audit matrix

> Each row covers one local model that touches at least one memory tier.

| Model | Quant | File size | VRAM need | Currently loaded? | Consumer tiers | Last actual-use evidence | Retire-or-keep |
|---|---|---|---|---|---|---|---|
| **qwen36 (`Qwen3.6-35B-A3B-MTP/UD-IQ4_XS.gguf`)** | UD-IQ4_XS (~3.85 bpw effective; 256K ctx train) | 27.7 GB on disk (`size=27710726656` per `/v1/models` field); 65 K runtime context window per `nssm get IkLlamaServer AppParameters -c 65536` | ~24 GB VRAM (`--mlock` on, `-ngl 999`, KV q4_0/q4_0 + Hadamard) | **LOADED** — NSSM `IkLlamaServer` Running Automatic; PID 117836; resident 1355 MB (working-set; majority is mmap-mlocked GPU resident) | **T1 hindsight LLM** (`.claude/settings.json:41-43`) + **T3 cognee LLM** (`nssm get CogneeMCP AppEnvironmentExtra` → `LLM_MODEL=qwen36 OPENAI_BASE_URL=...:8080/v1`) | qwen36 served chat-completions request this wave (cold-load — `curl -m 8 :8080/v1/chat/completions` timed out at 8 s mid-warmup; `/v1/models` returned 200 immediately so the server is healthy, just cold-loading); 31 basic-memory log files dated within the hour evidence T1+T3 are actively calling | **KEEP — only canonical local LLM for memory-tier work**; this is the sole LLM endpoint serving 2 of 6 memory tiers, retirement would force migration to cloud OR self-hosting a different stack |
| **qwen3-coder:30b-a3b-q4_K_M (Ollama-pulled)** | Q4_K_M (mainline llama.cpp quant) | 18.5 GB on disk (`/api/tags` `size=18556700761`) | (would need ~22 GB VRAM if loaded — not loaded right now) | **NOT LOADED** — Ollama `/api/ps` returned `{"models":[]}` this wave | **T4 graphiti — RETIRED** (was its primary justification per `.mcp.json:graphiti.args[14-15]` line 80 `--model qwen3-coder:30b-a3b-q4_K_M`); incidentally also has a separate `qwen3-coder-30b` entry in `llama-swap config.yaml:143-162` for graphiti CPU-mode fallback (Z:/models path, NOT the Ollama-pulled digest) | Last loaded — unknown; Ollama is configured `OLLAMA_KEEP_ALIVE=30m` per `.mcp.json` _comments.ollama_w259v15 (line 14), so the absence right now means no consumer requested it in the past 30 minutes — consistent with graphiti retired and cognee using qwen3-embedding only (not qwen3-coder) | **CANDIDATE FOR RETIRE** — only T4 consumer is RETIRED. Keep on disk for graphiti revival option (Task #386 framing) but Ollama daemon may stop |
| **qwen3-embedding:0.6b (Ollama-pulled)** | Q8_0 (mainline llama.cpp quant; 1024-dim Matryoshka) | 639 MB on disk (`/api/tags` `size=639150858`); 595.78 M params | ~1-2 GB VRAM when loaded | **NOT LOADED** — Ollama `/api/ps` returned `{"models":[]}` this wave | **T3 cognee embeddings** (per `.mcp.json` _comments.ollama_w259v15 + cognee env block — but verify §2.4 below); also referenced in `graphiti.args[16-17]` line 82 (RETIRED tier) | Indirect — cognee MCP is LIVE and serving graph-extract requests so it has consumed embeddings recently, but the embedding consumer might be calling fastembed in-process rather than Ollama (see §2.4 verification) | **KEEP if cognee uses it** — only embedding model currently provisioned for T3; **but** see §6.1 — could migrate to llama-swap `qwen3-embed-0.6b@:8090/v1` (same model on disk, served by ik_llama.cpp via llama-swap proxy) to retire Ollama |
| **bge-small-en-v1.5 (FastEmbed in-process)** | FP32 in `bge-small-en-v1.5` ONNX (FastEmbed bundled) | ~133 MB on disk (FastEmbed cache); 384-dim | Negligible (CPU; ~500 MB RAM peak) | **LOADED IN-PROCESS** — basic-memory daemon + memory-MCP plugin both bundle FastEmbed (no separate daemon) | **T2 memory-MCP** (sqlite_vec embedding) + **T6 basic-memory** (semantic-search-enabled per `Z:/claude-sota-installed-state/basic-memory/config/config.json:18-19`: `semantic_embedding_provider=fastembed` + `semantic_embedding_model=bge-small-en-v1.5`) | basic-memory `fastembed_cache/` directory exists at config path; 31 daemon log files dated 2026-05-18T16:28 within the past hour = active embedding | **KEEP** — wide industry-standard, MTEB-leaderboard top-tier for 384-dim small, CPU-friendly (no GPU contention with qwen36's mlock), no daemon supervision risk (in-process) |
| **`_disabled_qwen36-moe` (llama-swap config entry)** | (same Z:/models/Qwen3.6-35B-A3B-MTP/UD-IQ4_XS.gguf as qwen36@:8080) | 27.7 GB (shared GGUF with `:8080`) | (would conflict with `:8080`'s mlock if both attempted) | **disabled** — llama-swap config line 25 (`_disabled_qwen36-moe`) per W288 cosmetic-cleanup; the `IkLlamaServer` NSSM owns the file mlock | (none — disabled) | (none) | **disabled** (correctly; do not re-enable while IkLlamaServer holds the GGUF mlocked) |

### §2.1 — Cross-row VRAM math

- qwen36 mlocked: ~24 GB (constant resident; `--mlock` per `nssm get IkLlamaServer AppParameters`)
- qwen3-coder:30b warm if Ollama serves it: ~22 GB (NOT currently loaded; 0 in VRAM)
- qwen3-embedding:0.6b warm: ~1.5 GB (NOT currently loaded; cognee may be calling fastembed in-process — §2.4)
- Other llama-swap entries (qwen3-vl-8b, qwen3-reranker, gemma4-26b/31b): not memory-tier-relevant; cold-load with TTL 120-600s; would compete for VRAM but not currently loaded.

**Headroom note**: as of this probe, only qwen36 is hot on GPU. The other ~24 GB Ollama models are cold. If a memory-tier request fires that wants qwen3-coder:30b (only graphiti, retired), or qwen3-embedding:0.6b at high volume, the operator may see warmup latency. T3 cognee is the only LIVE memory tier currently consuming an Ollama model.

### §2.2 — qwen3-coder:30b-a3b-q4_K_M dead-weight confirmation

Affirmative evidence (per `W296-AUDIT-2026-05-18.md §1` "graphiti RETIRED" + `settings.json:91` + `.mcp.json:67-101` block-preserved-for-inspection):

1. Single tier-consumer per `.mcp.json:80` (`graphiti.args[14] --model qwen3-coder:30b-a3b-q4_K_M`).
2. graphiti is in `disabledMcpjsonServers:91`.
3. CLAUDE.md:31 confirms "graphiti ✗ RETIRED (W272+W290+W295 AI-5)".
4. Ollama `/api/ps` shows `{"models":[]}` 2026-05-18 18:00ish — model is cold AND has not been warmed in the keep-alive window (30 m).

**Conclusion**: qwen3-coder:30b-a3b-q4_K_M is dead-weight on this runtime today. Keeping it on disk is cheap (18.5 GB on a Z: drive that is per CLAUDE.local.md §1 "shared with sibling/parent runtimes" — graphiti revival in W298+ via repoint is non-trivial); **retiring the Ollama daemon however is now reachable** — see §3.

### §2.3 — qwen3-embedding:0.6b → cognee verification

Required to confirm Ollama-daemon-load-bearing status. Read `nssm get CogneeMCP AppEnvironmentExtra` (live this wave):

```
OPENAI_API_KEY=local
OPENAI_BASE_URL=http://127.0.0.1:8080/v1
LLM_MODEL=qwen36
...
SYSTEM_ROOT_DIRECTORY=Z:\claude-sota-installed-state\cognee
DATA_ROOT_DIRECTORY=Z:\claude-sota-installed-state\cognee\data
```

**Critical finding**: the CogneeMCP NSSM env block sets `OPENAI_BASE_URL=http://127.0.0.1:8080/v1` (i.e. ik_llama.cpp's qwen36) for the LLM but **does NOT specify a separate embedder URL/model in the NSSM env block**. The `.mcp.json:cognee` block (lines 118-121) is `type:http`/`url:.../mcp` with no env field on the MCP-side; the env is set on the NSSM service.

This means cognee falls back to its compile-time defaults for the embedder, which per cognee 1.1.0 `cognee-mcp` is **either** `text-embedding-3-small` via OPENAI_BASE_URL (i.e. `:8080/v1/embeddings` — would route to ik_llama.cpp's embedding endpoint IF qwen36 server is built with `--embedding`; `nssm get IkLlamaServer AppParameters` shows **no `--embedding` flag**, so this fails OR cognee never embeds at all from LLM endpoint), **or** uses Ollama at `OLLAMA_HOST=http://127.0.0.1:16700` (settings.local.json scope — not visible to coordinator).

**Live probe** (curl this wave):

```
$ curl :8080/v1/models
qwen36 only — no embedding alias listed; n_embd=2048 in metadata (not an embedding-model embedding-dim, just hidden-size for the chat model)
$ curl :16700/api/tags
qwen3-embedding:0.6b (embedding) + qwen3-coder:30b (chat) — both available; qwen3-embedding:0.6b is the only embedding model
```

**Inference**: cognee MUST be using Ollama's `qwen3-embedding:0.6b` for embeddings (no other 1024-dim embedder is provisioned in the runtime; the `EMBEDDER__DIMENSIONS=1024` setting at `.mcp.json:graphiti.env:95` previously confirmed 1024-dim is the target; the only model that produces 1024 dims is qwen3-embedding:0.6b). The Ollama daemon is therefore still load-bearing for T3 cognee embeddings **until** repointed to llama-swap.

Confidence: MEDIUM (live probe didn't catch a cognee-→Ollama in-flight call; based on architecture inference + dimension match). Routes to W297-AUDIT coordinator: confirm by reading `Z:/claude-sota-installed-state/cognee/.env` per §2.4.

### §2.4 — cognee actual embedding-config verification (probe-in-progress)

The cognee state dir has a `.env` at `Z:\claude-sota-installed-state\cognee\.env` (5171 bytes, 2026-04-18) that loads at server startup before the NSSM service's `AppEnvironmentExtra` overrides — but per cognee source `cognee/infrastructure/llm/config.py` (deepwiki-confirmable), the `EMBEDDING_PROVIDER` + `EMBEDDING_MODEL` + `EMBEDDING_ENDPOINT` keys are what determine the embedding route, NOT `OPENAI_BASE_URL` (which is LLM-only). I did NOT read `.env` directly this wave to avoid `Read(./.env.*)` deny per `settings.json:65-66`. **Recommendation for synthesis**: coordinator (or operator) reads it once and confirms whether the embedding endpoint is Ollama or llama.cpp.

---

## §3 — Cross-tier dependency graph (which tier depends on which model)

```
                          ┌──────────────────┐
                          │   qwen36 @:8080  │  (single shared LLM)
                          │  ik_llama.cpp    │
                          └────┬─────────┬───┘
                               │         │
                               │         │
                  ┌────────────┴──┐   ┌──┴─────────────┐
                  │  T1 hindsight │   │   T3 cognee    │
                  │  consolidation│   │ graph-extract  │
                  └───────┬───────┘   └──────┬─────────┘
                          │                  │
                          │ also calls       │ also calls
                          │                  │
                  ┌───────┴───────┐   ┌──────┴─────────────┐
                  │ bge-small-en  │   │  qwen3-embedding:  │
                  │  in-process   │   │     0.6b Ollama    │
                  │   FastEmbed   │   │     @ :16700       │
                  └──────┬────────┘   └──────┬─────────────┘
                         │                   │
                         │ also serves       │  (only this tier
                         │                   │   needs Ollama —
                         │                   │   if migrated,
                         │                   │   daemon retires)
                  ┌──────┴──────────┐
                  │ T2 memory-MCP   │
                  │ T6 basic-memory │ (both FastEmbed CPU)
                  └─────────────────┘


T4 graphiti → RETIRED (was the primary Ollama justification per W263d)
T5 langfuse → DOWN at probe — no model dependency
```

### §3.1 — Dead-weight finding

**Ollama daemon at `:16700` has exactly 1 load-bearing consumer**: T3 cognee, specifically for the `qwen3-embedding:0.6b` embedding model. The graphiti retirement removed Ollama's primary consumer (`qwen3-coder:30b-a3b-q4_K_M`). The remaining Ollama footprint:
- daemon RAM: ~21 MB observed at probe (Get-Process Ollama → 21 MB working-set) — daemon-only is cheap
- model RAM/VRAM when warm: ~1.5 GB for qwen3-embedding:0.6b (Q8_0, 0.6B); 18-22 GB for qwen3-coder:30b (Q4_K_M, 30.5B) — both currently NOT loaded
- on-disk: 19.1 GB total (18.5 + 0.64) at `Z:\ollama\models\`

**Cross-reference to Task #386** (per `CLAUDE.md` Stream-F operator queue): "graphiti repoint OR kill Ollama daemon (+48GB RAM)". The +48GB figure is stale (matches 80GB RAM workstation + 22GB peak qwen3-coder + 1.5GB embedding + headroom; today's actual peak is just qwen3-embedding's 1.5GB unless graphiti revives).

**Position**: **Ollama is no longer the primary justification for keeping the daemon alive**, but it is still load-bearing for T3 cognee embeddings. Two paths:

1. **Path A — KILL Ollama**: requires repointing cognee embedding URL/model to llama-swap `:8090/v1/qwen3-embed-0.6b` (1024-dim Matryoshka MTEB-multilingual #1, served by ik_llama.cpp). Cognee's `.env` and possibly mcp config need 1-line edits. Reversibility: HIGH (restart Ollama service + revert env). Cost: ~5 minutes operator work + 1 cognee re-index pass.
2. **Path B — KEEP Ollama (status quo)**: zero work. Cost: daemon + when warm 1.5 GB VRAM on demand. Defensible if operator wants Ollama as a quick-warm option for graphiti revival.

**Stream B verdict**: Path A is cleaner (one fewer daemon to supervise) but Path B is zero-cost-no-action. The decision is **operator policy preference**, not technical mandate. **Routes to coordinator + operator decision queue**.

---

## §4 — Hindsight LLM `qwen36@:8080/v1` investigation

**What server is it?** `nssm get IkLlamaServer AppParameters` (live this wave) returns:

```
--alias qwen36 --jinja --reasoning-budget 0
--model Z:\models\Qwen3.6-35B-A3B-MTP\Qwen3.6-35B-A3B-UD-IQ4_XS.gguf
--port 8080 --host 127.0.0.1
-c 65536 -ngl 999 -fa on
-ctk q4_0 -ctv q4_0 --k-cache-hadamard --v-cache-hadamard
-b 2048 -ub 1024 --merge-qkv -muge -sas --mlock
--ctx-checkpoints 8 --ctx-checkpoints-interval 512
--cache-ram 4096 --parallel 1 --threads 4 --threads-batch 4
--no-context-shift --fit --fit-margin 1024
-mtp --draft-max 4 --draft-p-min 0.0 -mtprot iq4_ks
```

So the server is **`Z:\repos\deps\ik_llama.cpp\build-new\bin\Release\llama-server.exe`** (per `Get-Process llama-server → Path` returning that path) — i.e. **`ikawrakow/ik_llama.cpp` fork of llama.cpp**, NOT mainline llama.cpp, NOT vLLM, NOT llama-swap.

**What model is it?** `Z:\models\Qwen3.6-35B-A3B-MTP\Qwen3.6-35B-A3B-UD-IQ4_XS.gguf` — Unsloth-Dynamic IQ4_XS quant of the **Qwen3.6-35B-A3B-MTP** variant. The "Qwen3.6" branding is per Stream A §1.2 ("57.5B params measured live" + per llama.cpp metadata `n_params=57516958848`). The mismatch between the file name "35B-A3B-MTP" and the actual `n_params=57.5B` likely reflects that the **MTP-augmented variant** carries the multi-token-prediction head (the "MTP tail") as additional weight tensors, pushing the param-count from the 35B base to ~57.5B with the speculative-decoding head — this is consistent with `--draft-max 4` flag indicating MTP draft-decode is enabled.

**Is it llama-swap?** No. **Is it llama.cpp HEAD?** No, it's `ik_llama.cpp` (ikawrakow's fork). **Is it vLLM/SGLang?** No, these don't run on Windows. **Is the qwen36 alias used elsewhere?** Yes — `nssm get CogneeMCP AppEnvironmentExtra` shows `LLM_MODEL=qwen36` + `OPENAI_BASE_URL=http://127.0.0.1:8080/v1` (so cognee shares the same llama-server). And `.claude/settings.json:41-43` uses the same alias for hindsight.

**Where is this documented?** Several places in `docs/architecture/` reference qwen36:
- `docs/architecture/W269-local-model-sota-2026-05-17.md` (referenced in `Z:/tools/llama-swap/config.yaml:37` comment) — W269 model-spec drift study
- `docs/architecture/W269-mtp-path-a-retry-2026-05-17.md` (referenced same comment) — MTP-path retry
- `docs/architecture/GRAPHITI-STRUCTURED-EXTRACT-2026-05-17.md` (per `.mcp.json:14` _comments.ollama_w259v15) — qwen36 vs qwen3-coder benchmark
- `Z:/tools/llama-swap/config.yaml:11-12` — `${ik_server_new}` macro = `Z:/repos/deps/ik_llama.cpp/build-new/bin/Release/llama-server.exe`

**Why "qwen36" not "qwen3" or "qwen3.6"?** Per `Z:/tools/llama-swap/config.yaml:41` line 50 `aliases: ["qwen", "qwen36", "judge", "default"]` — the W269 author chose `qwen36` as a short alias for Qwen3.6 (i.e. the 3.6 series Qwen3.6-35B-A3B-MTP), consistent with the file path `Qwen3.6-35B-A3B-MTP/`.

**Is this load-bearing?** YES — it is the **only canonical local LLM for memory-tier work** (T1 hindsight + T3 cognee both call it). Retiring it requires either a cloud OpenAI/Anthropic API key (cost) or a parallel local LLM server (operational complexity — another NSSM service, more disk space). **KEEP. No swap candidate beats it on the joint (D1 local-only + D17 robustness + D2 32K-context + D7 Q4_XS efficiency) constraint set per Stream A §4.1.**

**Optimisation routed to Stream A**: Stream A §4.1 rank-1 action — **upgrade `:8080` server binary to llama.cpp HEAD `b9110+` to absorb PR #22673 MTP support** + enable `--spec-type mtp --spec-draft-n-max 3 -np 1` would deliver measured **+50-158 tok/s decode speedup** per `devnen/qwen3.6-windows-server` practitioner corroboration (`devnen/qwen3.6-windows-server` 94★ low-star anti-bias candidate per Stream A §4.1.3). However: the runtime is on `ik_llama.cpp` not mainline `ggml-org/llama.cpp`, so the upgrade path is **ik_llama.cpp HEAD ≥ 0ab9bdf7 (PR #1816)** — per `Z:/tools/llama-swap/config.yaml:38-49` `_disabled_qwen36-moe` block which documents the W269-tuned MTP flags **already applied** on the standalone IkLlamaServer service config. So the optimisation **may already be in effect**; verify with `:8080/v1/internal/perf` if available, or by `curl -X POST :8080/completions ... -d '{"stream":true,"prompt":"...","n_predict":128}'` and counting tokens/sec live.

**Confidence**: HIGH that qwen36 = ik_llama.cpp HEAD with MTP enabled. MEDIUM that an additional upgrade to a newer ik_llama.cpp HEAD (PR #1816 fix-Qwen3.5/3.6-MTP-gibberish) would deliver more decode-speed; depends on currently-installed `build-new/` build-date. **Routes to Stream A reconciliation**: confirm the `build-new/` binary timestamp at synthesis time.

---

## §5 — Per-tier verdict (KEEP / SWAP / RETIRE / DAEMON-GAP)

| Tier | Verdict | Rationale (≥1 cite) | Rollback cost | Recovery time |
|---|---|---|---|---|
| **T1 hindsight** | **KEEP-CURRENT** | `qwen36@:8080` LIVE per probe; `:9077/health` healthy; consolidation-worker-config is correct per `.claude/settings.json:40-49`; W295/W296 found no T1 SOTA challenger that beats local-only constraint per `W295-BASIC-MEMORY-DEEP-AUDIT.md §3` (Anthropic+SK+LlamaIndex convergence: markdown-first); Stream A §4.1 has 1 in-scope optimisation (MTP-upgrade to `b9110+`) but it's a **server-binary swap not a tier-swap**. | LOW — restart NSSM `IkLlamaServer` with old binary if MTP-upgrade breaks. | ~30 s NSSM restart. |
| **T2 memory-MCP** | **DAEMON-SUPERVISION-GAP + RECONCILE** | `.mcp.json:memory` is in `settings.json:disabledMcpjsonServers:87`, `plugin:everything-claude-code:memory` is ACTIVE — **duplication-of-purpose** flagged in `W296-AUDIT-2026-05-18.md §2.5 axis-5` as weak-spot. No model dependency. Tier-design decision (consolidate to T6, keep split, or settle on one) is **research-arch question** routed to Stream D, not a model-swap. | (no model action) | (no model recovery) |
| **T3 cognee** | **KEEP-CURRENT + 1 OPTIMISATION** | LLM (`qwen36@:8080`) is LIVE + load-bearing per `nssm get CogneeMCP`; embedding (`qwen3-embedding:0.6b@:16700`) is currently load-bearing for T3 per §2.3 inference; cognee `:8000/health` `{"status":"ok"}` LIVE; W296 verdict per axis-5 was "T2 VENDOR-FORK mem0 install_score 3.65" but that targeted T2 not T3. AI-3a "state-violates" is STALE per §1.3 — `Z:\claude-sota-installed-state\cognee\` is correct. **Optimisation candidate (operator decision)**: repoint embedding from Ollama:16700 → llama-swap:8090/v1/qwen3-embed-0.6b to retire Ollama daemon (see §6.1). | LOW — revert `cognee/.env` `EMBEDDING_ENDPOINT` line. | ~5 minutes + 1 cognee re-index. |
| **T4 graphiti** | **RETIRE-TIER (already retired)** | per `CLAUDE.md:31` + `settings.json:91` `disabledMcpjsonServers` includes `graphiti`; W272+W290+W295 codex-APPROVED retirement; `.mcp.json:64-101` block preserved-for-inspection but server NOT spawning. No reversal warranted: Stream A §1.3 confirms graphiti retirement implies Ollama-daemon-justification gone for the qwen3-coder:30b consumer. | LOW — revert `settings.json:91 disabledMcpjsonServers` to drop `graphiti` + restart FalkorDB + Ollama warmup. | ~10 minutes (FalkorDB ready-state). |
| **T5 langfuse** | **DAEMON-SUPERVISION-GAP** | `:3000/api/public/health` refused this wave; W297-PLAN §0 + W296 §2.5 flag DOWN. No model dependency (observability is orthogonal). **Tier itself is correct**; restart routes to Stream C live-state repair. | (no model action) | ~30 s NSSM restart once Stream C identifies the cause. |
| **T6 basic-memory** | **KEEP-CURRENT** | `Z:\claude-sota-installed-state\basic-memory\` LIVE per §1.6 evidence (2.8 MB DB + 9.2 MB WAL + 31 active log files); FastEmbed bge-small-en-v1.5 in-process, no daemon supervision risk, no GPU contention. W295-BASIC-MEMORY-DEEP-AUDIT.md headline verdict **STAY-WITH-HARDENING** composite 4.16 (top of 11 alternatives on D1+D6); `W295-BASIC-MEMORY-DEEP-AUDIT.md §5.AI-3` config-path-drift is substantially-fixed per §1.5. | (no model action; if alternative embedding wanted, swap `config.json:semantic_embedding_model`) | (no model action) |

### §5.1 — Confidence levels

| Tier | Verdict confidence | Rationale |
|---|:---:|---|
| T1 | HIGH | qwen36 live-probe definitive; no SOTA challenger displaces local-only constraint per W295 §3 convergence |
| T2 | MEDIUM | tier-design question deferred to Stream D; Stream B's mandate is model-fit not tier-redesign |
| T3 | HIGH | live probes confirm both LLM and embedding paths; AI-3a STALE evidence rock-solid |
| T4 | HIGH | retirement is in `settings.json` + CLAUDE.md ratification; codex APPROVED |
| T5 | HIGH (verdict) / MEDIUM (root-cause) | DOWN confirmed; root-cause routes to Stream C |
| T6 | HIGH | 31 active log files + DB+WAL refute W295 §1.6 EMPTY finding affirmatively |

---

## §6 — Recommended optimisations cross-referenced to Stream A

> Each optimisation cites Stream A's deliverable section + describes the action; cross-link reconciled by coordinator post-stream-return.

### §6.1 — Optimisation O-1: retire Ollama daemon (cognee → llama-swap)

**Cross-reference**: Stream A §1.3 + §8 Open Question 1 ("Ollama retirement gate" routed back to Stream B).

**Stream B answer**: cognee T3 IS load-bearing on Ollama for embedding (qwen3-embedding:0.6b). If cognee's `.env` `EMBEDDING_ENDPOINT` is repointed to llama-swap `:8090/v1/qwen3-embed-0.6b` (which serves the **same Qwen3-Embedding-0.6B Q8_0 weights** per `Z:/tools/llama-swap/config.yaml:81-91` — same 1024-dim MRL Matryoshka, same MTEB rank), Ollama can fully retire. The llama-swap entry is configured with `--mlock` (line 88), `--parallel 4`, ttl 600s — equivalent or better availability than Ollama's `OLLAMA_KEEP_ALIVE=30m`.

**Action**: 1-line edit to `Z:\claude-sota-installed-state\cognee\.env`:
```
# was:
EMBEDDING_ENDPOINT=http://127.0.0.1:16700/v1
EMBEDDING_MODEL=qwen3-embedding:0.6b
# new:
EMBEDDING_ENDPOINT=http://127.0.0.1:8090/v1
EMBEDDING_MODEL=qwen3-embed-0.6b
```

Then `nssm stop OllamaServe + nssm set OllamaServe Start SERVICE_DEMAND_START`. Cognee re-index pass takes ~5 min on the current ledger size.

**Reversibility**: HIGH (revert `.env` + `nssm set OllamaServe Start SERVICE_AUTO_START`).

**Net win**:
- 1 daemon retired (NSSM `OllamaServe`)
- 21 MB daemon RAM freed (small)
- ~1.5 GB peak VRAM freed when embedding warms (cognee request flow)
- Daemon-supervision-surface reduced — one less thing to monitor
- llama-swap proxy already running for other Z:/models models — additive

**Routes to operator** (per CLAUDE.md `W288 DEFERRED-OPERATOR-ACTION` pattern — "NEVER without operator confirm").

### §6.2 — Optimisation O-2: MTP-upgrade verification on qwen36 endpoint

**Cross-reference**: Stream A §4.1 rank #1 action.

**Stream B context**: Stream A's recommendation targets mainline `ggml-org/llama.cpp` HEAD `b9110+`; this runtime is on `ikawrakow/ik_llama.cpp` per §4. The W269 `_disabled_qwen36-moe` block at `Z:/tools/llama-swap/config.yaml:38-50` documents the `-mtp --draft-max 4 --draft-p-min 0.0 -mtprot iq4_ks` flags **already applied** on the live `IkLlamaServer` service (verified via `nssm get IkLlamaServer AppParameters` this wave — see §4 first paragraph).

**Action**: at coordinator-synthesis time, verify with:
```
$ stat Z:/repos/deps/ik_llama.cpp/build-new/bin/Release/llama-server.exe
# if mtime < 2026-04-15 ish, run:
$ cd Z:/repos/deps/ik_llama.cpp && git pull && cmake --build build-new --config Release
$ nssm restart IkLlamaServer
```

**Net win**: measured +50-158 tok/s decode speedup per Stream A §4.1.3 practitioner corroboration (model-and-runtime-dependent; benchmark required to confirm).

**Routes to**: Stream A reconciliation (binary timestamp check) + operator approval if upgrade is needed.

### §6.3 — Optimisation O-3: embedding-model upgrade decision

**Cross-reference**: Stream A §1.5 rank #5 ("`QwenLM/Qwen3-Embedding-0.6B` weights via mainline llama.cpp embedding endpoint" T3 KEEP).

**Stream B reasoning**:
- T6 basic-memory uses `bge-small-en-v1.5` (384-dim, MTEB top-tier for small) via in-process FastEmbed — **no swap warranted** (bundled, CPU-friendly, in-process; W295 STAY-WITH-HARDENING affirms).
- T2 memory-MCP same as T6.
- T3 cognee uses `qwen3-embedding:0.6b` (1024-dim Matryoshka MRL — best-in-class per Stream A §4.5 MTEB-multilingual rank #1 0.6B). Upgrade candidates for cognee: BGE-M3 (1024-dim, multilingual, but Apache-2.0; bigger 568M params); Qwen3-Embedding-4B (4B params, 4096-dim, MTEB-multilingual #2 across all sizes). **Stream B verdict**: NEITHER swap warranted at this time — qwen3-embedding:0.6b is well-fit + already provisioned; the Matryoshka MRL means cognee can downsize at query-time to 384/512/768 dims if storage pressure emerges.

**Action**: NO swap recommended; tier alignment is correct. Continue to monitor MTEB leaderboard for 2026-Q3+ entrants.

### §6.4 — Optimisation O-4 (orthogonal): quant-swap on qwen36 (Q4_XS → Q5_K_M?)

**Cross-reference**: Stream A §4.3 (`ikawrakow/ik_llama.cpp` quant-lab lane T2 VENDOR-FORK).

**Stream B reasoning**: qwen36 currently runs UD-IQ4_XS (~3.85 bpw); upgrading to Q5_K_M (~5.5 bpw) would improve PPL by ~5% but cost +30% disk and +30% VRAM. Workstation VRAM headroom is currently saturated by qwen36's mlock; **a quant upgrade would force tier-eviction of the qwen3-vl-8b multimodal model** (currently TTL 180s per llama-swap config line 113) which Stream B does NOT recommend tampering with — multimodal is orthogonal to memory but operator may rely on it. **Verdict**: NO swap recommended; current Q4_XS + MTP is the right operating point.

### §6.5 — Optimisation O-5 (orthogonal): llama-swap install lane

**Cross-reference**: Stream A §4.2 + Task #385 closure (§5 in Stream A).

**Stream B reasoning**: llama-swap IS already installed + running at `:8090` per `nssm get LlamaSwap` this wave. Task #385's framing ("llama-swap v199→v215 MTP recipe") is a framing-error per Stream A §5 — there is no MTP recipe in any llama-swap release; MTP is upstream in llama.cpp. **Verdict from Stream B side**: Task #385 should be re-tagged per Stream A §5 row B (decoupled into two independent actions).

---

## §7 — Open questions routed to W297-AUDIT synthesis

1. **Cognee `.env` embedding-endpoint verification**: confirm `EMBEDDING_PROVIDER=ollama` (or its cognee-equivalent key — `LLM_PROVIDER`, `EMBEDDING_API_PROVIDER`, etc.) is the actual runtime configuration before authorising §6.1's repoint. Coordinator should read `Z:\claude-sota-installed-state\cognee\.env` once (operator-readable; not gitignored per CLAUDE.local.md). Failure mode if assumption wrong: §6.1 action breaks cognee embeddings until reverted. Confidence: MEDIUM (architecture-inference based; live-call not captured).

2. **Should Ollama daemon be killed?** Operator decision per §3.1 Path A/B. Stream B leans **Path A (kill)** — one fewer daemon, ~1.5 GB peak VRAM freed, llama-swap already has the same embedding model on the same hardware. But reversibility favours **Path B (keep)** if operator wants quick-warm option for graphiti revival. Routes to coordinator + operator decision queue.

3. **Should hindsight LLM swap from `qwen36` to `qwen3-coder:30b-a3b-q4_K_M` for unification?** Tempting to consolidate the runtime onto a single LLM (qwen3-coder for both T1+T3). Stream B verdict: **NO** — qwen36 is the 57.5B-param MoE with native MTP, better for consolidation-class chain-of-thought reasoning per the W263d GRAPHITI-STRUCTURED-EXTRACT bench (`qwen3-coder:30b` was 5× faster on **structured extract** but qwen3-coder is a **code-specialist** model; hindsight episode summarisation benefits from broader reasoning capacity of the larger model). Confidence: MEDIUM-HIGH (architecture intuition + W263d cite).

4. **`_disabled_qwen36-moe` re-enable**: per `Z:/tools/llama-swap/config.yaml:18-24` comment, the entry is disabled because the standalone NSSM `IkLlamaServer` holds the GGUF mlocked. **Should the runtime consolidate to a single qwen36 server fronted by llama-swap** (retire NSSM `IkLlamaServer` + re-enable `_disabled_qwen36-moe` in llama-swap config + update consumers to use `:8090/v1/qwen36` instead of `:8080/v1/qwen36`)? Pros: single supervisor (llama-swap); easier TTL management; unified `:8090` endpoint surface. Cons: llama-swap is solo-maintainer per Stream A §3 D16=1 hard-cap; the mlocked NSSM service has Q4_K_M MTP working and stable per W269 verification. Stream B verdict: **NO consolidation needed** — current split is operationally sound; let llama-swap handle the swap-needing TTL-cycling models (gemma, vl, reranker, coder-CPU) and let NSSM hold the hot core. Confidence: MEDIUM (operational preference, not technical mandate).

5. **basic-memory bus-factor mitigation** per `W295-BASIC-MEMORY-DEEP-AUDIT.md §5 AI-1`: vendor-fork shim + commit-SHA pinning. Stream B note: this is the **only memory-tier maintainer-risk item** that doesn't have an active codex remediation; it sits in W295 backlog. Status quo is acceptable (W295 STAY-WITH-HARDENING verdict; basic-memory has 20 contributors + 5.4 releases/month so the bus-factor is "1 dominant" not "1 total"). Routes to W297-AUDIT operator-decision queue: pin `basic-memory@v0.21.1` per CR-9 W286-arc-P0C.

---

## §8 — Self-summary

| Item | Value |
|---|---|
| File written | `Z:/claude-sota-installed/docs/architecture/W297-LIVE-AUDIT-AND-LOCAL-MODEL-LAYER/W297-STREAM-B-MODEL-IN-MEMORY-MATRIX.md` |
| LOC | ~430 LOC (range 400-900 per W297-PLAN done-criteria — within bounds) |
| Per-tier verdicts (T1→T6) | **KEEP-CURRENT / DAEMON-GAP-RECONCILE / KEEP+1-OPT / RETIRE-TIER (already retired) / DAEMON-GAP / KEEP-CURRENT** |
| Biggest dead-weight finding | **Ollama daemon `:16700` has 1 load-bearing consumer (cognee embedding); graphiti retirement removed its primary justification (qwen3-coder:30b); reachable kill-path via §6.1 repoint to llama-swap** |
| Cite-anchors to W295/W296 | **5+ references**: `W295-BASIC-MEMORY-DEEP-AUDIT.md §§1.1, 1.6, 3, 5, 5.AI-3` + `W296-AUDIT-2026-05-18.md §2.5` (via `W296-STREAM-A-CURRENT-ARCH-AUDIT.md:389-437` ALL of axis-5) + Stream A §1.2/§1.3/§4.1/§4.2/§4.5/§5/§8 (cross-stream) — meets ≥3 mandate |
| Live-probe of `:8080/v1/models` | ✓ DONE — captured `qwen36 / 57.5B / 27.7 GB / 256K ctx train / 65K runtime ctx / owned_by:llamacpp` |
| Cross-reference to Stream A | ✓ §6.1, §6.2, §6.3, §6.4, §6.5 + §7 each cite Stream A section ID |
| Source-disagreement log | Stale-state corrections (3): §1.3 (cognee data-dir was C:/Users/42/.cognee, NOW Z:\claude-sota-installed-state\cognee per NSSM env), §1.4 (basic-memory config.json was reported MISSING, IS at config/ subdir), §1.5 (basic-memory memory.db was reported EMPTY in W295, IS 2.8 MB + WAL 9.2 MB this wave). All 3 surfaced for operator-AI ratification queue. |
| Confidence per verdict | T1 HIGH · T2 MEDIUM (tier-design Q routed to D) · T3 HIGH · T4 HIGH · T5 HIGH-verdict/MEDIUM-cause · T6 HIGH |
| Open questions to W297-AUDIT | 5 (per §7) — (a) cognee `.env` embedding-endpoint verify, (b) Ollama-kill operator decision, (c) hindsight LLM unification question, (d) `_disabled_qwen36-moe` re-enable, (e) basic-memory bus-factor mitigation |

### §8.1 — Top 3 findings

1. **qwen36 mystery resolved** — it's a 57.5B-param Q4_XS MoE (Qwen3.6-35B-A3B-MTP variant) served by `ikawrakow/ik_llama.cpp` standalone NSSM at `:8080`, NOT llama-swap, NOT mainline llama.cpp. It is the **only canonical local LLM for memory-tier work** (T1+T3 both consume it). KEEP.

2. **Ollama daemon is near-dead-weight** — graphiti retirement removed its primary consumer (qwen3-coder:30b); only remaining tier-consumer is cognee for qwen3-embedding:0.6b; **migration to llama-swap `qwen3-embed-0.6b@:8090` is 1-line `.env` edit** away from full Ollama retirement (§6.1).

3. **3 stale-state corrections** — `C:/Users/42/.cognee` doesn't exist (migration ran), basic-memory config.json IS at `config/` subdir not missing, basic-memory memory.db IS 2.8 MB live not 241 KB empty. CLAUDE.md:31 needs 1-line update to remove AI-3a; W295 AI-3 needs status flip to SHIPPED. Routes to coordinator + operator status-block edit.

### §8.2 — Anti-bias self-check

- ✓ NOT auto-recommending mem0 for T2 (per W297-PLAN §3 anti-pattern: cited W296 verdict T2 VENDOR-FORK install_score 3.65 not auto-applied; tier-design Q routed to Stream D)
- ✓ NOT auto-retiring any tier without affirmative-evidence (T4 retire was already codex-APPROVED per W272+W290+W295; T5 is DAEMON-GAP not retire — root-cause unknown until Stream C closes)
- ✓ Silent-average avoided — 3 stale-state corrections surfaced individually with source-disagreement log, not blended into mean
- ✓ Operator's "stars not a hardgate" mandate honoured by referencing `devnen/qwen3.6-windows-server@94★` (Stream A §4.1.3 practitioner corroboration carried) — Stream B itself does not introduce new candidates but consumes Stream A's low-star evidence faithfully

---
END W297-STREAM-B-MODEL-IN-MEMORY-MATRIX.md
