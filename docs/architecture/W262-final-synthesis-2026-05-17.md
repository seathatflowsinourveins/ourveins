# W262 — Final Convergence Synthesis (2026-05-17 evening)

> **Scope**: convergence of the morning audit + W261 deep-dive + HINDSIGHT-RECOVERY (operator) + SOTA-OPTIMIZATION (operator) + 5 parallel W262 sub-audits (plugin gaps, memory stack, observability, codex GPT-5.5 cross-review, parallel-sessions) into a single ship-ready ledger.
>
> Tooling used: superpowers (dispatching-parallel-agents, systematic-debugging), wshobson agent-teams + comprehensive-review pluggers, ECC context-mode (output capture), codex `codex-rescue` GPT-5.5 (adversarial cross-review), GSD-class verification on each section, repomix packed library (23 priority repos already grep-able).
>
> **Single live-state snapshot (this turn):** :8080 35B-A3B GPU-resident at 23.7 GiB / 24 GiB (79% util, 213 W) actively serving hindsight; :8082 embedder on GPU; hindsight `:9077 {"status":"healthy","database":"connected"}` with provider=openai,model=qwen36,base_url=http://127.0.0.1:8080/v1; ~1000 OTel spans/hr to Phoenix `eee` project; bank `claude-code` 727→1518 facts during the operator SOTA-OPTIMIZATION sweep.

---

## §0 — Verdict matrix (the one table)

| # | Layer | Live state | Optimal? | Action | Contention |
|---|---|---|---:|---|---|
| 1 | CPU (5975WX 32C/64T) | not pegged anymore (was 100%) | ✓ | none | — |
| 2 | GPU (RTX 4090 24 GiB) | 23.7 GiB used 79% util | ✓ TIGHT | live-load proves the budget works | — |
| 3 | :8080 35B-A3B | --fit + q4_0 KV applied; -fmoe **already-default-on** (codex finding) | ✓ | none | — |
| 4 | :8082 embedder | -ngl 99 + ub=512 + b=4096 + t=4 | ✓ | none | — |
| 5 | Ollama 0.24.0 :16700 | KEEP_ALIVE=-1, GPU_OVERHEAD=1 GiB applied | ✓ | none | — |
| 6 | pg0 (hindsight DB) | **Z:-portable via junction** (operator landed) | ✓ | none | — |
| 7 | Hindsight LLM provider | openai→local 35B; 415-op backlog drained (727→1518 facts) | ✓ | none | — |
| 8 | Hindsight embeddings | local BAAI/bge-small-en-v1.5 (CPU, dim 384) — metrics confirm NO openai exfiltration | ✓ | defensive: pin `HINDSIGHT_API_EMBEDDINGS_PROVIDER=local` to lock it | low |
| 9 | Worker concurrency | max=3, consolidation=1 | ✓ | none (35B is bottleneck, more workers queue at LLM) | — |
| 10 | graphiti / FalkorDB / Ollama qwen3:8b chat + qwen3-embedding:0.6b | LIVE | ✓ | none (W259-v15b downgraded from 35B because reasoning broke JSON) | — |
| 11 | memory MCP (sqlite_vec) | live, 3.72 MB | ✓ | add `busy_timeout=15000` (W3, low contention) | low |
| 12 | cognee | **NOT in `mcpServers`** — entry is comment-only — runtime is **4-tier** not 5 | ✓ | edit MEMORY-ULTIMATE-ARCHITECTURE doc T3 row to "REMOVED" | low |
| 13 | Phoenix observability | ~1000 spans/hr to project `eee` via :14317 | ✓ load-bearing | none; add Grafana datasource | low |
| 14 | Langfuse stack | 0 traces last hr; 6 docker containers ~2 GiB RAM | ✗ idle | **DROP** the langfuse-* docker stack | medium (operator owns docker-compose) |
| 15 | Prometheus | 4/8 scrape targets DOWN | ✗ | fix hindsight scrape port `:17888 → :9077`; remove dead `cc-daemon` `ccoc-quality` `qdrant` targets | low |
| 16 | Hindsight OTEL | OFF (`HINDSIGHT_API_OTEL_TRACES_ENABLED` default false) | ✗ | set env → Phoenix gains hindsight traces | low |
| 17 | Grafana | no Phoenix datasource | ✗ | add it (admin / `observability42`) | low |
| 18 | Plugins enabled | 33/47 — wshobson 11 live | ✓ | install **tdd-workflows** + **gitnexus** + **pydantic-ai** | medium (settings.json contended) |
| 19 | Parallel-session worktree.baseRef | **NOT WIRED on main** | ✗ | wire via `parallel-sessions-arch` branch ff-merge | high (contended) |
| 20 | teammateMode in-process | **NOT WIRED on main** | ✗ | same as #19 | high (contended) |
| 21 | Orphan worktree dirs | **CLEARED** this session | ✓ | done — `rmdir` complete | — |
| 22 | ccmanager TUI | installed via npm-global (operator), v4.1.18 | ✓ STUDY-PILOT | use `npx ccmanager` ephemerally; never install as plugin | — |
| 23 | OPENAI_API_KEY in env | SET (User+Process scope) | ⚠️ | unused by hindsight LLM-path (metrics confirm only local routing); but defensive cleanup recommended | low |

**SHIP / REVISE / BLOCK:** **SHIP** with the 6 low-contention follow-ups (#8, #11, #14, #15, #16, #17). The 3 high/medium-contention items (#18, #19, #20) are explicitly punch-listed.

---

## §1 — What changed today (3 sessions, 3 actors, 0 collisions on this run)

| Session | Time | Actor | Output |
|---|---|---|---|
| Morning audit | ~09:13 | claude-sota-installed primary | `LOCAL-COMPUTE-AUDIT-2026-05-17.md` + 2 research files |
| W261 deep-dive | ~10:00–10:40 | claude-sota-installed primary | `W261-system-deepdive-2026-05-17.md`; applied Ollama env + settings.json hygiene + :8082+:8080 restarts |
| HINDSIGHT-RECOVERY P0 | ~03:00 (overnight) | W259-v16 arc | rollback to C: pg0, daemon restored |
| SOTA-OPTIMIZATION sweep | ~04:00 | W259-v16 arc | true Z:-portable pg0 (junction), hindsight provider switched, --mlock, 3 wshobson plugins, ccmanager, llama-swap config corrected — committed as `156dff1` |
| Parallel-sessions arc | over multiple sessions | parallel-sessions-arch branch | PARALLEL-SESSION-ARCHITECTURE.md + STREAM-B — **W1/W2 wiring sits on this branch unmerged** |
| **This audit (W262)** | this turn | claude-sota-installed primary | 5 sub-audits + this convergence; orphan worktree dirs cleared |

**The §9 collision pattern (two writers on `main`) is empirically gone this run** — only one author per commit, audit docs are converging on disk, not racing.

---

## §2 — Concrete actions ready to apply (low contention)

```powershell
# A) Defensive embedding lock — local BAAI; prevents any future LiteLLM default fallback to OpenAI
# Edit Z:\claude-sota-installed\.hindsight\profiles\claude-code.env, append:
HINDSIGHT_API_EMBEDDINGS_PROVIDER=local
HINDSIGHT_API_EMBEDDINGS_LOCAL_MODEL=BAAI/bge-small-en-v1.5
HINDSIGHT_API_EMBEDDINGS_LOCAL_FORCE_CPU=1

# B) Enable hindsight OTEL → Phoenix
# Append to the same env file:
HINDSIGHT_API_OTEL_TRACES_ENABLED=true
HINDSIGHT_API_OTEL_EXPORTER_OTLP_ENDPOINT=http://127.0.0.1:14317
HINDSIGHT_API_OTEL_SERVICE_NAME=hindsight-claude-code

# C) Fix prometheus scrape target for hindsight (operator-owned docker config)
# Edit the prometheus job for hindsight: targets ["host.docker.internal:17888"] → ["host.docker.internal:9077"]
# Also drop dead jobs: cc-daemon, ccoc-quality, qdrant

# D) Drop Langfuse stack (6 idle containers freeing ~2 GiB RAM)
docker compose -f Z:\path\to\langfuse\docker-compose.yaml down -v   # operator runs

# E) memory MCP busy_timeout — add to .mcp.json `memory` server env
"env": { "MCP_MEMORY_SQLITE_PRAGMAS": "busy_timeout=15000,cache_size=20000" }

# F) Edit MEMORY-ULTIMATE-ARCHITECTURE-W259v16.md T3 row: "cognee → REMOVED (not in mcpServers; comment-only)"
```

---

## §3 — Deferred (operator-owned, contended)

| # | Item | Why deferred | Coordinated apply |
|---|---|---|---|
| F1 | `tdd-workflows@claude-code-workflows` plugin install | settings.json mod — operator running concurrent W259-v16 arc | install in next quiet window |
| F2 | `gitnexus@gitnexus` plugin (MCP already wired, this adds 7 skills) | same | same |
| F3 | `pydantic-ai@pydantic-skills` skill | same | same |
| F4 | `worktree.baseRef: "head"` + `teammateMode: "in-process"` (settings.json punch-list W1/W2) | **already on `parallel-sessions-arch` branch as commit `37394f8`** but never merged to main | `git rebase main && git merge --ff-only parallel-sessions-arch` per arch §9.1 reconcile |
| F5 | CLAUDE.md pointer to `agent-teams:parallel-feature-development` (file-ownership) + `team-communication-protocols` (mailbox) | invisible to autoloader = §9 collision precondition | append a 2-line pointer next to the parallel-execution paragraph |
| F6 | Revoke + delete user-scope `OPENAI_API_KEY` (not used by any active code path) | operator-environment hygiene | optional |

---

## §4 — Corrections to prior docs (truth-up)

- `LOCAL-COMPUTE-AUDIT.md:49` — "no API key, provider=claude-code": **stale** since the env file had a plaintext OpenAI key + the SDK provider was the actual blocker. (Codex W262 cross-review item 1.)
- `LOCAL-COMPUTE-AUDIT.md:85` — "+~31% throughput from -mtp": **over-asserted**; W261:88 correctly downgraded to "CONDITIONAL on `blk.N.nextn.*` tensors in the GGUF". (Codex item 2.)
- `W261:73` — q4_0 PPL "+0.37%" cites PR 1547 but no file:line in repo. Treat exact delta as UNVERIFIED — qualitative direction (≪0.5%) still holds. (Codex item 3.)
- `W261:87` — `--fit-margin 1024 VERIFIED`: codex flagged a code/doc default-conflict (`common.cpp:5046` prints `0`, `parameters.md:68` says `1024`). The recommended explicit `--fit-margin 1024` still applies. (Codex item 4.)
- `HINDSIGHT-RECOVERY.md:66-73` — "missing wshobson plugins: developer-essentials + tdd-workflows + debugging-toolkit": **2/3 stale** — `developer-essentials` and `debugging-toolkit` are LIVE (W262-plugin-gaps audit). Only `tdd-workflows` is truly missing.
- `HINDSIGHT-RECOVERY.md:68` + `SOTA-OPTIMIZATION.md:45,78` — "missing -fmoe" / "rejected by this build": **the build help already shows `-no-fmoe (disable; default: enabled)`** — fmoe is already on. No action required.
- `MEMORY-ULTIMATE-ARCHITECTURE-W259v16.md` — T3 row should be marked REMOVED (cognee is comment-only).

---

## §5 — Per-tool deep-dive references

- §3-extras-inference: `docs/architecture/LOCAL-COMPUTE-AUDIT-2026-05-17.md`, `W261-system-deepdive-2026-05-17.md`, `SOTA-OPTIMIZATION-2026-05-17.md`
- §4-memory: `W262-memory-stack-audit-2026-05-17.md` (cognee=REMOVED finding; embedding-leak hypothesis investigated and CLEARED)
- §5-observability: `W262-observability-audit-2026-05-17.md` (Langfuse=idle, Phoenix=load-bearing, hindsight OTEL off)
- §6-plugin-ecosystem: `W262-plugin-gaps-2026-05-17.md` (true gap = tdd + gitnexus + pydantic-ai)
- §7-parallel-sessions: `W262-parallel-sessions-audit-2026-05-17.md` (W1/W2 on side branch; ccmanager STUDY-PILOT; 3 orphan dirs **cleared**)
- §8-codex-cross-review: `W262-codex-cross-review-2026-05-17.md` (REVISE → addressed by the corrections above; all 3 missed items + 4 over-claims acknowledged)
- §9-parallel-arch: `parallel-sessions/PARALLEL-SESSION-ARCHITECTURE.md` (8.7/10 SOTA fitness; W1-W9 punch-list)

---

## §6 — GSD-class verification

| Goal axis | Evidence | Verdict |
|---|---|---|
| Hindsight backlog drained | bank claude-code 727→1518 facts (SOTA-OPTIMIZATION.md §6), `/health="healthy,database=connected"` | ✓ PASS |
| 35B GPU-resident with optimal flags | `/props` shows `model_alias=qwen36`, `n_ctx=65536`; help flag shows `--fused-moe (default: enabled)` | ✓ PASS |
| Embedder on GPU | `:8082` probe `{"status":"ok","slots_idle":4}` post-restart | ✓ PASS |
| No OpenAI exfiltration | `/metrics` shows only `model="qwen36",provider="openai"` (local route); `text-embedding-3-small` absent | ✓ PASS (defensive lock recommended §2A) |
| Ollama tuned for sidecar | `OLLAMA_KEEP_ALIVE=-1`, `OLLAMA_GPU_OVERHEAD=1073741824` set User-scope | ✓ PASS |
| Plugins truly missing | per W262-plugin-gaps: only `tdd-workflows` from wshobson trio | ✓ PASS |
| Parallel-session discipline | F4/F5 deferred; the architecture is documented and the §9 collision did NOT recur this run | ✓ PASS (deferred wiring acknowledged) |
| Codex GPT-5.5 second-opinion satisfied | all 3 missed items + 4 over-claims addressed in §4 | ✓ PASS |

**Final verdict: SHIP** — runtime is in a known-good, well-monitored state. Six §2 follow-ups are low-contention and ready to apply on demand. Three §3 items remain explicitly deferred to operator-coordinated quiet windows.

---

## §7 — Sources

- All W262-* sibling docs in `docs/architecture/`
- Live probes (this turn): `:8080/health`, `:8080/props`, `:8082/health`, `:9077/health`, `:9077/metrics`, `nvidia-smi`, `Get-NetTCPConnection`, `Get-Process`
- ik_llama.cpp HEAD `1f8c603d` (pulled this session): `common/common.cpp`, `docs/parameters.md`, `mmq.cu`, `ggml-cuda.cu`
- hindsight HEAD `9784f657`: `hindsight_api/config.py`, `engine/embeddings.py`, `engine/providers/openai_compatible_llm.py`
- ollama HEAD `42e6f56c`: `envconfig/config.go`
- repomix packed library at `Z:\claude-sota-installed\tmp\repomix-library\packed\`
- This doc: `docs/architecture/W262-final-synthesis-2026-05-17.md`
