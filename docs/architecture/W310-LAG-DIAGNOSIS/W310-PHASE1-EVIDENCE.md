# W310 — System Lag Diagnosis (Phase 1: Evidence)

**Date**: 2026-05-19 · **Branch**: sota-converge-w295 · **Skill chain**: superpowers:systematic-debugging + sota-convergence-audit + superpowers:dispatching-parallel-agents

## TL;DR

System lag is **multi-cause** but dominated by:

1. **8+ concurrent CC sessions × 6 stdio MCPs = 48+ MCP processes** (CLAUDE.md `~3 parallel cap` violated)
2. **Dual local-model VRAM contention**: `ik_llama.cpp/llama-server.exe` (qwen36 35B @ :8080 for hindsight) + Ollama (qwen3-embedding 0.6B @ :16700 for cognee) → **23509/24564 MiB = 95.7% VRAM**
3. **graphiti tier RETIRED W290 but FalkorDB+Ollama not stopped** — CLAUDE.md:35 explicitly says "FalkorDB+Ollama can be stopped" — closeout incomplete
4. **20+ basic-memory.exe MCP processes** (~4-5 GB RAM total) — spawn-multiplication across CC sessions
5. **`effortLevel: "xhigh"` + `alwaysThinkingEnabled: true` + `CLAUDE_CODE_EFFORT_LEVEL: "max"`** — every CC turn burns max thinking tokens

## Evidence

### A. GPU

| Metric | Value | Source |
|---|---|---|
| Device | NVIDIA GeForce RTX 4090 (24564 MiB) | nvidia-smi |
| VRAM used | **23509 MiB (95.7%)** | nvidia-smi |
| GPU util | 26% | nvidia-smi |
| Temp / Power | 46°C / 38.11 W | nvidia-smi |

GPU processes (compute, in VRAM):
- `ollama.exe` (pid 8776, 12312) — qwen3-embedding 0.6B @ Q8_0 (2.0 GB)
- `llama-server.exe` (pid 139284) — `Z:\repos\deps\ik_llama.cpp\build-new\bin\Release\` (qwen36 35B; W259-v15 anchors :8080 to hindsight via `HINDSIGHT_API_LLM_BASE_URL=http://127.0.0.1:8080/v1`)

### B. Process inventory

| Class | Count | Total RAM | Largest |
|---|---|---|---|
| `claude.exe` | **21** | ~5.6 GB | pid 121328 (920 MB) |
| `basic-memory.exe mcp` | **20+** | ~4.5 GB | pid 139680 (434 MB) |
| `context-mode/start.mjs` (node) | ~7 | ~1.5 GB | pid 138760 (240 MB) |
| `hindsight-api.exe --daemon` | 1 | 1.7 GB | pid 50420 (17.6 CPU-hours) |
| `pyright langserver.index.js` | 1 | 240 MB | pid 141184 |
| `vmmemWSL` | 1 | 3.4 GB | — |

Per-session `claude.exe` StartTime (8 real recent sessions):
- 19:08:37 / 19:15:08 / 19:27:16 / 22:40:25 / 22:46:47 / 22:56:57 / 23:15:28 / 23:35:14 — all 572-920 MB RAM
- 13 scaffold processes at 17:26 (28-171 MB; likely codex helpers / sub-agent stubs)

### C. Services

| Service | State | Port | Role |
|---|---|---|---|
| `OllamaServe` (NSSM) | Running Auto | 16700 | embedder qwen3-embedding 0.6B |
| `IkLlamaServer` (NSSM) | Running Auto | 8080 | qwen36 35B for hindsight |
| `LlamaSwap` (NSSM) | Running Auto | ? | swap coordinator |
| `IkEmbedServer` (NSSM) | **Stopped Manual** | ? | (alternative embedder) |
| `CogneeMCP` (NSSM) | Running Auto | 8000 | cognee GraphRAG (W282d: DORMANT) |
| `EEE-CLIProxyAPI` | Running Auto | 18317 | API key proxy |
| `EEE-CacheFixProxy` | Running Auto | 19801 | cache proxy |
| `FalkorDB` (Docker) | Running | 16379 | **graphiti backend — should be stopped post-W290 retirement** |
| `Postgres` | Running | 5432 | likely Langfuse v3 store |
| `hindsight-api daemon` | Running | 9077 | hindsight T1 local fallback |

### D. MCP servers (`.mcp.json`)

Active (10):
- HTTP: `deepwiki`, `cognee`, `github` (disabled), `context7` (disabled), `hf-mcp-server`
- Stdio: `chrome-devtools`, `repomix`, `serena`, `gitnexus`, `ccusage`, `langfuse`, `basic-memory`

Disabled (via `disabledMcpjsonServers` in settings.json:88-95): `memory`, `github`, `context7`, `playwright`, `graphiti`, `phoenix`.

Net active stdio MCPs spawned per CC session: **6** (chrome-devtools, repomix, serena, gitnexus, ccusage, langfuse, basic-memory).

### E. Hook fan-out

settings.json hooks (8 events):
- **SessionStart** — context-mode cache-heal (`context-mode-cache-heal.mjs`, bug-patch shim per CLAUDE.md cardinal-rule-2)
- **PreToolUse:Bash** — `gitleaks protect` (every Bash call!) + codex adversarial-review-gate for destructive git ops
- **PostToolUse:Edit|Write|MultiEdit** — `ruff format` + `shellcheck` per file extension
- **PreCompact:auto** — log to file
- **Notification** — PowerShell beep (cardinal-rule-2)
- **PostToolUseFailure:Bash** — error capture
- **TaskCompleted** — `ruff check tools harness`
- **WorktreeRemove** — `git worktree prune`

Hot-path latency offenders:
- `gitleaks protect` on every Bash invocation — typically 100-500 ms but adds up
- `ruff check` on every TaskCompleted (30s timeout — but it runs)

### F. Env

`Z:\claude-sota-installed\.claude\settings.json`:
- `NODE_OPTIONS=--max-old-space-size=4096` — 4 GB heap per node child
- `MCP_TOOL_TIMEOUT=300000` (5 min)
- `CLAUDE_CODE_EFFORT_LEVEL=max` + `effortLevel: "xhigh"` + `alwaysThinkingEnabled: true`
- `ANTHROPIC_SMALL_FAST_MODEL=claude-haiku-4-5-20251001` (correct — fast inline judge)
- OTEL telemetry on (every call traces to langfuse :3000)
- `CLAUDE_CODE_FORK_SUBAGENT=1` (per CLAUDE.md spec — correct)

### G. Plugins (settings.json `enabledPlugins`)

**Enabled: 36** (true) · **Disabled: 18** (false). Per CLAUDE.md target: "62 plugins installed" — present count matches design.

## Root-cause synthesis

The lag is **NOT a single bug**. It is **systemic** resource exhaustion:

| Layer | Root cause | Severity | Fix difficulty |
|---|---|---|---|
| **CC harness** | 8 concurrent sessions × multiplier effect | HIGH | E (operator close 5 stale) |
| **Memory tier** | 20+ basic-memory.exe procs from stdio-per-session | HIGH | M (single-instance flag if supported) |
| **Local model** | qwen36 35B held in VRAM 24/7 for hindsight even when idle | HIGH | M (LlamaSwap unload-on-idle) |
| **Retired tier** | graphiti tier closeout incomplete — FalkorDB+Ollama still running | MEDIUM | E (stop FalkorDB, stop OllamaServe IF cognee can use ik_llama) |
| **Hooks** | gitleaks-on-every-bash + ruff-on-task-completed | LOW | M (move to background or fewer matchers) |
| **CC config** | xhigh thinking + always-thinking + max effort | LOW | E (downgrade for routine turns) |

## Next actions (Phase 2 — propose, NOT yet apply)

1. **OPERATOR DECISION REQUIRED — kill 5 stale CC sessions** (DESTRUCTIVE; could lose in-flight work in those terminals)
2. **OPERATOR DECISION REQUIRED — stop FalkorDB Docker container** (cite-anchored to CLAUDE.md:35 "can be stopped" — SAFE per spec)
3. **Research-pending (parallel agents in flight):**
   - SOTA local-model server consolidation (Ollama vs ik_llama.cpp; quant audit on qwen36)
   - basic-memory single-instance pattern (or HTTP-transport migration)
   - CC plugin/hook preload audit
4. **No-op-safe immediate fixes after agents return**: settings.json env adjustments (downgrade effortLevel for routine turns; lazy-load hooks)
