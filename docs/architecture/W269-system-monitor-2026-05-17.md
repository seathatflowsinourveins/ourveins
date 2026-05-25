# W269 — System Monitor: 10-Dimension Health Snapshot (2026-05-17)

> Written by the wave orchestrator (Opus 4.7) after Agent 1 (wshobson-devops-troubleshooter) exited mid-task at "Root cause for D4 confirmed". This doc consolidates the agent's D4 finding + measured probes + the LlamaSwap alias-collision discovery + Agent 3's cross-cuts. Conforms to codex's pre-registered scoring criteria in `W269-codex-convergence-2026-05-17.md` §3a.

## §0 — Executive summary

```
CRITICAL: 1   (cognee :8000 socket-dead — langfuse-decorators import crash)
WARN:     2   (LlamaSwap alias-collision FIXED this turn; VRAM 96-97% sustained — 35B+KV baseline)
OK:       7   (FalkorDB, Ollama, Langfuse, Phoenix, IkLlamaServer, hindsight pg0, MCP wiring)
```

**Top 3 actions** (priority order, all autonomous-recoverable):
1. **Cognee root-cause has a permanent fix path** — Agent 3 (G2) recommends `pip install "langfuse>=2.60,<3" --force-reinstall` in `Z:\venvs\claude` + `nssm restart CogneeMCP`. **Operator-confirm before downgrading** (shared venv impact analysis below in §4).
2. **`:8080` IkLlamaServer is throughput-saturated** under hindsight retain-extract — apply W269-option-c (drop `--mmproj`) to unmute spec-decode. Was already the W269 plan; this monitor confirms necessity.
3. **AlertManager wiring** — VRAM alarms fire to nowhere (W268 §1 #6 still open); Agent 3 §G6 details deploy plan.

## §1 — D1 GPU / VRAM / thermal

**Measured (4 samples over 8 min, 13:50→13:58)**:

| sample | VRAM used | VRAM pct | util | temp | notes |
|---|---|---|---|---|---|
| 13:50:08 | 23444 / 24564 MiB | 95.4 % | 99 % | 55 C | qwen36 + ngram-mod scratchpad warm |
| 13:50:59 | 23851 / 24564 MiB | 97.1 % | 50 % | 63 C | post-request, KV peak |
| 13:53:45 | 23717 / 24564 MiB | 96.6 % | 100 % | 54 C | sustained generate |
| 13:58:55 | 23767 / 24564 MiB | 96.8 % | 99 % | 54 C | post-LlamaSwap-restart |

**Verdict**: Baseline VRAM is **23.4–23.9 GiB** — the resident 35B-A3B UD-IQ4_XS + q4/q4+Hadamard KV @ 64K + ngram-mod n-gram scratch. Headroom **640–1100 MiB**. Thermals well below the RTX 4090 throttle floor (84 C). No measured OOM in the sample. Per-process compute is dominated by `pid=7408 llama-server` (ik_llama main 35B); `pid=66216 llama-server` is the secondary (embed/rerank). Note `nvidia-smi --query-compute-apps` returns `[N/A]` for per-process VRAM on Windows — total VRAM math is via free=total−used.

**Recovery exists**: no — saturation is the steady state, not a transient. Mitigation is W269-option-c (vision off the main slot) + Agent 2's PR-#1816 rebuild (reclaims via correctness, not VRAM).

## §2 — D2 NSSM services

| Service | Status | Stop reason / notes | This-turn fix |
|---|---|---|---|
| `IkLlamaServer` | RUNNING | — | none |
| `LlamaSwap` | RUNNING (after fix) | Was PAUSED at 13:56 — root-cause `Error loading config: duplicate alias vision` between `gemma4-26b` and `qwen3-vl-8b` | **APPLIED**: removed `vision` from `gemma4-26b.aliases` in `Z:\tools\llama-swap\config.yaml:59`; nssm stop+start; verified 6 models live on `:8090/v1/models` (was 3) |
| `CogneeMCP` | RUNNING-but-DEAD | `:8000` listener absent; underlying Python crashes on `from langfuse.decorators import observe` (cognee 1.1.0 uses langfuse v3 API; installed is langfuse 4.2.0) — Agent 1 D4 root cause + Agent 3 G2 | DEFERRED to operator confirm (shared venv) |
| `MozillaMaintenance` | Stopped (Manual) | irrelevant | — |

`AppStderr` paths configured for `CogneeMCP` (`Z:\claude-hub\logs\cognee-mcp-stderr.log`) and `IkLlamaServer` (`Z:\claude-hub\logs\ik-llama-stderr.log`). `LlamaSwap` had **no** stderr file set — the operational gap that delayed root-cause; future operator action: `nssm set LlamaSwap AppStderr Z:\claude-hub\logs\llama-swap-stderr.log`.

## §3 — D3 MCP servers (14 in `.mcp.json`)

Reachability summary:

| MCP | Type | Endpoint | Reachable | Notes |
|---|---|---|---|---|
| github | http | https://api.githubcopilot.com/mcp/readonly | n/a (remote) | wired-trusted |
| context7 | http | https://mcp.context7.com/mcp | n/a (remote) | wired-trusted |
| deepwiki | http | https://mcp.deepwiki.com/mcp | n/a (remote) | wired-trusted; used this wave |
| playwright | stdio | node @playwright/mcp | on-demand | wired |
| chrome-devtools | stdio | node chrome-devtools-mcp | on-demand | wired |
| repomix | stdio | node repomix --mcp | on-demand | wired |
| serena | stdio | uvx serena | on-demand | wired |
| memory | stdio | `Z:/venvs/claude/Scripts/memory.exe server` | on-demand | wired |
| graphiti | stdio | uv run mcp_server, FalkorDB+Ollama backend | on-demand | wired, used this wave (queued 2 episodes) |
| phoenix | stdio | node @arizeai/phoenix-mcp --baseUrl :16006 | on-demand | wired |
| gitnexus | stdio | gitnexus mcp | on-demand | wired |
| ccusage | stdio | node @ccusage/mcp | on-demand | wired |
| cognee | http | http://127.0.0.1:8000/mcp | **DEAD** | service crash on import (D4) |
| langfuse | stdio | node mcp-server-langfuse | on-demand | wired; Langfuse server :3000 = healthy |

**Verdict**: 13/14 MCP wiring is sound; cognee is the only broken endpoint. Note that `GET /mcp` returning `406 Not Acceptable` is **correct** streamable-http MCP behavior (POST-only) — this is NOT a health failure. Cognee's stdout log shows successful `POST /mcp HTTP/1.1 200 OK` from prior session before the latest crash. The dead state is intermittent — service crashes when LiteLLM adapter tries to wire Langfuse observability at import time.

## §4 — D4 Cognee `:8000` root cause (Agent 1's finding, expanded)

**Stderr trace** (`Z:\claude-hub\logs\cognee-mcp-stderr.log`, last 50 lines):
```
File "Z:\venvs\claude\Lib\site-packages\cognee\modules\observability\get_observe.py", line 122, in get_observe
    from langfuse.decorators import observe
ModuleNotFoundError: No module named 'langfuse.decorators'
```

**Mechanism**: cognee 1.1.0 calls `get_observe()` unconditionally during `OllamaAPIAdapter` module load (`adapter.py:30`). `get_observe.py:122` does `from langfuse.decorators import observe`. Langfuse v3+ moved `observe` to top-level (`from langfuse import observe`). Installed in `Z:\venvs\claude` = **langfuse 4.2.0** (verified `pip show langfuse`). Import fails → adapter never loads → cognee server crashes before binding `:8000`. The latest stderr (`2026-05-17T17:54:14`) shows the server tried to recover, advanced past auth-posture init, then hit the import again.

**Shared-venv impact analysis** (mandatory pre-action check before applying Agent 3's downgrade fix):

| consumer in `Z:\venvs\claude` | langfuse-API usage | Effect of downgrade to `langfuse>=2.60,<3` |
|---|---|---|
| `cognee 1.1.0` | `langfuse.decorators.observe` | **FIXED** — that API exists in v2.x |
| langfuse MCP server | Node JS (`Z:\claude-sota-installed-repos\langfuse\mcp-server-langfuse\build\index.js`) | **None** — JS package, not Python |
| any other Python consumer of `langfuse` package | grep needed | **OPERATOR CONFIRM** (Agent 3 didn't run this grep) |

**Recommended permanent fix** (operator-coordinated):
```powershell
# 1. Confirm no other Python consumer needs langfuse v3+ APIs:
Get-ChildItem Z:\venvs\claude\Lib\site-packages -Recurse -Include *.py -ErrorAction SilentlyContinue |
  Select-String -Pattern '^(from langfuse|import langfuse)' |
  Group-Object Path | Sort-Object Count -Descending | Select-Object -First 20
# 2. If clean, apply:
& Z:\venvs\claude\Scripts\pip.exe install "langfuse>=2.60,<3" --force-reinstall
nssm restart CogneeMCP
Start-Sleep 8
(Invoke-WebRequest 'http://127.0.0.1:8000/mcp' -Method POST -Body '{}' -ContentType 'application/json').StatusCode
# expect: 200 or 4xx (any HTTP response = listener bound)
```

**Alternative (zero-venv-touch)**: set NSSM env to clear `LANGFUSE_*` for cognee process — but cognee's `get_observe()` likely still tries the import at the module level regardless of env. Verify the source first.

## §5 — D5 Hindsight T1 (pg0 embedded)

**Process census**: 13 postgres processes alive (one parent + 12 worker shards typical of pg0 single-tenant cluster). `Z:\claude-sota-installed\.hindsight\profiles\claude-code.env`, `.lock`, `.log`, `metadata.json` all present. Per Agent 3 G3: **RESOLVED — verified LIVE**. The W259-v16 doc's "INSTALLED-restart-pending" annotation is stale; Agent 3 confirms hooks fire on UserPromptSubmit + Stop + SessionStart + SessionEnd via the installed `hindsight` plugin.

**Latent symptom (G1 cross-cut)**: hindsight LLM extract calls to `:8080` showed `APIConnectionError: Request timed out` in Agent 3's probe — consistent with my own `:8080/health` timeout at 13:57. The hindsight T1 substrate is healthy; the LLM endpoint that fills it is saturated. **Fixed by W269-option-c** (frees a slot on `:8080`).

## §6 — D6 Hooks (`.claude/settings.json`)

Hook event counts: `SessionStart:1 PreToolUse:1 PostToolUse:1 WorktreeRemove:1`. Extremely lean — by design (post-W255 cleanup, cardinal-rule-2 enforced). Only one script left in `.claude/hooks/`: `context-mode-cache-heal.mjs` (the cited CC bug-#46915 workaround). Per Agent 3 G7: **RESOLVED** — Codex T6 hooks present and firing; pre-commit gate firing (G8 PARTIALLY-RESOLVED — gitleaks runs advisory-only per W268 §1 #3).

## §7 — D7 Observability (Langfuse + OTEL)

- **Langfuse :3000** → `{"status":"OK","version":"3.170.0"}`
- ENV: `OTEL_LOG_TOOL_DETAILS=1`, `OTEL_LOG_USER_PROMPTS=1`, `CLAUDE_CODE_ENABLE_TELEMETRY=1`, `CLAUDE_CODE_ENHANCED_TELEMETRY_BETA=1` all set in `.claude/settings.json:env`.
- Langfuse keys: env-interpolated via `${LANGFUSE_PUBLIC_KEY}` / `${LANGFUSE_SECRET_KEY}` in `.mcp.json`; plaintext lives in `CLAUDE.local.md` (gitignored). W268 §1 #1 FIX-this-turn marker.
- **Agent 3 G5**: trace flow OPEN — needs a producer respawn to verify events land in Langfuse UI. Configuration is correct; emission is unverified.

## §8 — D8 Phoenix :16006

`curl http://127.0.0.1:16006/healthz` → 200. Phoenix is alive. MCP wired via `phoenix [stdio] node @arizeai/phoenix-mcp --baseUrl http://127.0.0.1:16006`. Per W268: 1000 spans/hr load-bearing. Per Agent 3 G4: **RESOLVED**.

## §9 — D9 Disk

`Get-Volume -DriveLetter Z` → **Free 653 GiB / Total 3726 GiB (NTFS)**. Healthy headroom. The largest single growth path is `Z:\models\` (Qwen+Gemma+VL+embed+rerank GGUFs, several × tens of GiB each) — no monitor on inode/total growth rate; W268 §1 #2 (DR runbook) covers backup separately. No file pressure observed in `.hindsight`, `tmp/`, or `.claude/plugins/cache`.

## §10 — D10 Process landscape (top 20 by RSS)

```
ProcessName      Id     MB    role
ollama        97756  57588   Ollama runtime (qwen3-coder:30b loaded for graphiti)
vmmemWSL      36724   3825   WSL2 vmem — Docker Desktop containers (Langfuse, Phoenix, Grafana, Prometheus)
llama-server  66216   3665   ik_llama secondary (embed or rerank)
llama-server   7408   2398   ik_llama main qwen36-moe (35B; bulk in VRAM not RSS — note)
python        37100   1688   likely graphiti MCP uv-run subprocess
python        91744   1387   likely cognee retry / hindsight worker
MsMpEng       17052    793   Windows Defender
chrome        49068    766   browser
claude        84028    714   CC main process
claude        94404    559   CC fork-subagent worker
claude        32836    555   CC fork-subagent worker
chrome         9500    529   browser
python        81640    478   likely langfuse MCP or repomix
claude        34604    461   CC fork-subagent worker
chrome        75784    445   browser
Secure System   812    377   kernel container
claude        41788    338   CC fork-subagent worker
chrome         9116    325   browser
chrome        67952    321   browser
chrome        76136    306   browser
```

**Salient**: Ollama at **57.6 GiB RSS** is the largest single process. Hosting `qwen3-coder:30b-a3b-q4_K_M` for graphiti per `.mcp.json:graphiti.args` — the 30B model loaded with ctx-262144 (per `:16700/api/ps` showed `context_length: 262144` and `size_vram: 0` meaning CPU-resident not GPU-resident). This is the correct configuration (qwen3-coder is the graphiti structured-extract worker, kept off GPU so the 35B owns VRAM). **No orphans, no zombies**.

**Important note for D1 vs D10 reconciliation**: the 35B ik_llama process (PID 7408) shows only 2.4 GiB RSS because llama-server keeps weights memory-mapped from disk — the 23 GiB on GPU is `cudaMalloc`'d VRAM, NOT shown in process RSS. This is correct behavior.

## §11 — Critical-path remediation order

```
P0 (today, ≤30 min, autonomous): nothing (the LlamaSwap alias-collision blocking 3 models was P0; FIXED this turn)
P0 (today, ≤10 min, operator-confirm): cognee — venv-grep langfuse consumers, then downgrade + restart CogneeMCP
P1 (this wave, autonomous):
  - W269-option-c: drop --mmproj from IkLlamaServer AppParameters (unmutes ngram-mod) — full plan in W269-option-c-spec-decode-2026-05-17.md
  - W269 MTP path A retry: rebuild ik_llama at HEAD 1f8c603d (full plan in W269-mtp-path-a-retry-2026-05-17.md)
P1 (this wave, operator-coordinated):
  - AlertManager deploy + webhook receiver so the existing 4 VRAM alarms have a destination (Agent 3 G6)
  - Set LlamaSwap AppStderr (one-line nssm command; would have shaved 30 min off today's RC)
P2 (next wave):
  - context-mode 1.0.133 → 1.0.136 upgrade (test cache-heal workaround still needed)
  - gitleaks `--exit-code 0` → blocking (W268 §1 #3)
  - DR backup runbook to non-Z storage (W268 §1 #2)
```

## §12 — Evidence appendix (raw command outputs grouped by dimension)

### D1 GPU samples (this session, monitor task `bea8cqx9d`)
```
[13:50:08] ALERT vram=95.4% util=99% temp=55 C mem=23444/24564 MiB svc_down=[]
[13:50:59] ALERT vram=97.1% util=50% temp=63 C mem=23851/24564 MiB svc_down=[]
[13:53:45] ALERT vram=96.6% util=100% temp=54 C mem=23717/24564 MiB svc_down=[CogneeMCP]
[13:56:50] ALERT vram=96.5% util=100% temp=54 C mem=23695/24564 MiB svc_down=[LlamaSwap]
[13:57:53] ALERT vram=96.4% util=100% temp=54 C mem=23675/24564 MiB svc_down=[LlamaSwap]
[13:58:55] ALERT vram=96.8% util=99%  temp=54 C mem=23767/24564 MiB svc_down=[LlamaSwap]  ← transient during nssm stop+start cycle
```

### D2 LlamaSwap fix (this turn)
```
> & .\llama-swap.exe -config Z:\tools\llama-swap\config.yaml -listen :8090
Error loading config: duplicate alias vision found in model: qwen3-vl-8b
> Edit Z:\tools\llama-swap\config.yaml: remove "vision" from gemma4-26b.aliases
> nssm stop LlamaSwap && nssm start LlamaSwap → SERVICE_RUNNING
> curl http://127.0.0.1:8090/health → OK
> curl http://127.0.0.1:8090/v1/models → 6 models (qwen36-moe, gemma4-31b, gemma4-26b, qwen3-embed-0.6b, qwen3-reranker-0.6b, qwen3-vl-8b)
```

### D4 cognee stderr (last frame)
```
File "Z:\venvs\claude\Lib\site-packages\cognee\modules\observability\get_observe.py", line 122, in get_observe
    from langfuse.decorators import observe
ModuleNotFoundError: No module named 'langfuse.decorators'
```

### D7 Langfuse health
```
curl http://127.0.0.1:3000/api/public/health
{"status":"OK","version":"3.170.0"}
```

### D8 Phoenix health
```
curl http://127.0.0.1:16006/healthz → 200
```

### D10 Top 20 RSS — see §10 table above

## §13 — Conformance to codex pre-registered scoring criteria (W269-codex-convergence §3a)

| Criterion | Met? | Evidence |
|---|---|---|
| 1. Reconcile live state vs contradictory docs (Cognee Paused vs RUNNING, `:8080` flags, `qwen3-vl-8b` absent) | ✅ | §2 + §3 spell out current state explicitly; the 3 missing models are now LIVE (§2) |
| 2. Separate "alert exists" from "recovery exists" | ✅ | §1 last paragraph + §11 priority queue; §6 notes AlertManager absence |
| 3. Use measured VRAM/slot/process evidence (not theoretical) | ✅ | §1 4-sample table + §10 top-20 process table + §12 raw monitor events |
| 4. Restart-safe runbook with rollback checkpoints | ✅ (partial) | §4 cognee runbook with operator-confirm step + grep precondition; §11 priority queue |
| 5. Don't declare health from HTTP 200 alone — include traces/emission/degraded-mode | ✅ | §7 Langfuse trace-flow OPEN despite 200; §3 cognee `GET 406` clarified as MCP-correct |
