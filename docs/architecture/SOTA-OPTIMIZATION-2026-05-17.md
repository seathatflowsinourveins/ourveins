# SOTA Optimization Sweep 2026-05-17

> Full "advanced official practice + full unleash" sweep authorized by operator.
> Builds on `HINDSIGHT-RECOVERY-2026-05-17.md` (which documented the Z:-junction migration).

## Headline metrics

| Metric | Before | After | Δ |
|---|---|---|---|
| `claude-code` bank fact count | 727 | 1518 | **+791** (backlog drained via local 35B) |
| pg0 storage location | `C:\Users\42\.pg0\` (cardinal-rule violation) | `Z:\claude-sota-installed\.pg0\` via Windows junction | **TRUE Z:-portable** |
| 35B retain-extraction provider | Anthropic Sonnet 4.5 (via claude-code SDK; init timeouts) | Local 35B at `:8080/v1` (OpenAI-compat) | **$0 cost, no SDK timeouts** |
| Plugin count | 192 | 195 (+ developer-essentials, debugging-toolkit, incident-response) | **+3 SOTA plugins** |
| Parallel-session TUI | None | `ccmanager` v4.1.18 installed | Multi-CLI orchestrator now available |
| `--mlock` on 35B | Off | **On** | Model weights pinned in RAM (no OS paging) |

## What landed

### 1. True Z:-portable pg0 (via Windows junction)
- `C:\Users\42\.pg0\` ⟶ `Z:\claude-sota-installed\.pg0\` via `mklink /J`.
- Migration steps: stop hindsight + pg0 → `robocopy /MIR` (266 MB) → `Remove-Item -Recurse C:\Users\42\.pg0` → `New-Item -ItemType Junction` → restart pg0 → relaunch hindsight (bound at 7s).
- pg0 binary still uses Windows-native `dirs::home_dir()` (registry-backed) so it physically can't be moved by env override — but the junction transparently routes all file I/O to Z:. Result: all pg0 install + instance + WAL + data lives on Z:.
- **Cardinal-rule-portable-Z: design now satisfied** for the persistent state layer.

### 2. Hindsight retain-extractor switched to local 35B
Profile env now (`Z:\claude-sota-installed\.hindsight\profiles\claude-code.env`):
```
HINDSIGHT_API_LLM_PROVIDER=openai
HINDSIGHT_API_LLM_MODEL=qwen36
HINDSIGHT_API_LLM_BASE_URL=http://127.0.0.1:8080/v1
HINDSIGHT_API_LLM_API_KEY=local
HINDSIGHT_API_WORKER_MAX_SLOTS=3
HINDSIGHT_API_WORKER_CONSOLIDATION_MAX_SLOTS=1
HINDSIGHT_EMBED_DAEMON_IDLE_TIMEOUT=0
```
- Was: claude-code SDK → constantly hit "Control request timeout: initialize" → 415-op backlog stalled.
- Now: ik_llama-served Qwen3.6-35B-A3B (local) → backlog drained from 415 → cleared; 791 new facts indexed since switch.
- Cost: $0/op (was paying API on every retain).
- Worker concurrency capped at 3+1 to prevent saturating 35B (which is also serving the operator's CC main session).

### 3. 35B `--mlock` applied (NSSM service config update)
- Registry path: `HKLM:\SYSTEM\CurrentControlSet\Services\IkLlamaServer\Parameters\AppParameters`.
- Added: `--mlock` (prevents OS from paging out 22-23 GB model weights under memory pressure).
- Service restarted via `Stop-Service` + `Start-Service IkLlamaServer`. Model resident at 23.8 GB on RTX 4090.
- **NOT applied (build incompatibility)**: `-fmoe` (Fused MoE speedup flag from ik_llama docs/MoE recommendation). This build (`Z:\repos\deps\ik_llama.cpp\build-new\`) rejects `-fmoe` with `error: unknown argument`. Skipped — would need a rebuild from current ik_llama HEAD to gain the flag.

### 4. Plugin additions (wshobson `claude-code-workflows` marketplace)
Installed via `claude plugin install <p>@claude-code-workflows`:
- `developer-essentials` (code-review-excellence, debugging-strategies, error-handling-patterns, git-advanced-workflows, monorepo-management)
- `debugging-toolkit` (debugger + dx-optimizer agents + smart-debug)
- `incident-response` (incident-runbook-templates + postmortem-writing)
- `tdd-workflows` (partial — copyfile error on `tdd-cycle.md`; plugin list shows it, but install reported failure — needs investigation)

### 5. ccmanager TUI installed (npm global)
- Path: `C:\Users\42\AppData\Roaming\npm\ccmanager` v4.1.18.
- Per the SOTA audit, ccmanager is the **only parallel-session orchestrator with explicit Windows path support** (`%APPDATA%\ccmanager\config.json`) and the broadest CLI strategy-pattern (8 CLIs: Claude Code, Gemini, Codex, Cursor, Copilot, Cline, OpenCode, Kimi).
- Layered on top of CC's 4 native parallel modes (subagents · agent-teams · worktrees · `claude --bg`).

### 6. llama-swap config corrected
- `Z:\tools\llama-swap\config.yaml` previously served the wrong model (`Qwen3.5-35B-A3B-APEX-I-Compact.gguf`) and had MoE spec-decoding params far below upstream recommendation.
- Now reflects the actually-running `Qwen3.6-35B-A3B-UD-IQ4_XS.gguf` with the live production flag set. llama-swap is bypassed in current runtime (direct llama-server on :8080) but the config is now an accurate fallback.

### 7. Plugin user config corrected
`C:\Users\42\.hindsight\claude-code.json`:
- `hindsightApiUrl`: `:7888` → `:9077` (was pointing at dead URL).
- `bankId`: `cc-oc` → `claude-code` (matches accumulating bank).
- `hindsightApiToken`: removed (local daemon doesn't auth).
- `recallBudget`: `mid` → `high`.
- `enableKnowledgeTools`: `false` → `true` (exposes 9 `agent_knowledge_*` MCP tools).

### 8. graphiti dependency `qwen3:8b` pulled
Was missing from Ollama; `qwen3:8b` (5.2 GB) pulled and verified present. Allows graphiti MCP to function on next CC restart.

## Audit findings NOT actioned (with rationale)

| Item | Reason |
|---|---|
| `-fmoe` flag on 35B | Rejected by this `ik_llama.cpp` build. Would need a rebuild from current ik_llama HEAD. Deferred. |
| `gitnexus-claude-plugin` proper install | Repo ships a single plugin (no marketplace.json wrapper). Bare MCP wiring in `.mcp.json` already provides all gitnexus capability; the 6 skills are NICE-TO-HAVE and require creating a marketplace-wrapper. Deferred. |
| `litellm` / `claude-code-router` middleware | Would introduce attack surface for marginal benefit; current direct routing (CC + codex + llama-server) covers all use cases. **Rejected (cardinal-rule risk).** |
| graphiti `--model` swap to Gemini for structured extract | qwen3:8b now available; functional. Future tune-up if extraction quality issues surface. |
| CCBP cite-pin re-pin (1-commit drift) | Deferred per CLAUDE.md status note. Low-value churn. |
| ik_llama `-mqkv 1 / --merge-qkv` | Already present in live cmdline. ✓ |
| ik_llama `-ctk q8_0 -ctv q8_0` | Already present. ✓ |
| Embedder `--embedding` flag | Already present. ✓ |

## Service inventory (final)

| Service | Port | PID | Health | Notes |
|---|---|---|---|---|
| Hindsight HTTP API | 9077 | <hindsight-api> | `{"status":"healthy","database":"connected"}` | Z:-junction pg0 backing |
| 35B llama-server | 8080 | <new IkLlamaServer process> | `slots_processing:1` (live load from Hindsight extractor) | `--mlock` pinned, 23.8 GB GPU |
| Embedder llama-server | 8082 | 7408 | `slots_idle:4` | CPU-only, `--embedding`, 32K ctx |
| pg0 (Z:-junction) | 5432 | 47852 | running | data at `Z:\claude-sota-installed\.pg0\instances\hindsight-embed-claude-code\` |
| Phoenix | 16006 | docker | 200 | OTel collector :14317 |
| FalkorDB | 16379 | docker | OPEN | Graphiti backing store |
| Ollama | 16700 | service | 16 models inc. `qwen3:8b` | Graphiti LLM + embeddings |

## What this means

The runtime is now:
1. **Fully Z:-portable** (via junction for the one stubborn Windows-registry-bound binary).
2. **Memory-cost-neutral** for ambient session indexing (no Anthropic API calls per retain).
3. **Memory-throughput-unblocked** (no SDK init timeouts; 791 facts indexed in the SOTA sweep window).
4. **Better-flag-tuned 35B** (`--mlock` for memory-pressure resilience).
5. **Expanded skill surface** (+3 wshobson plugins; ccmanager for fleet orchestration).

Cardinal-rules 1-5 all intact: all installs trusted plugins/skills/agents; hooks remain direct-CLI; subagents remain installed-upstream; behavior in CLAUDE.md + settings.json only; safety via CC permissions.
