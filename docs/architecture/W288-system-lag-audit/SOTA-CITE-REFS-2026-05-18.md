# W288 — SOTA Cite-Refs Audit (every change anchored to upstream)

**Wave**: W288 system-lag remediation arc, 2026-05-18 (session 1 + session 2).
**Purpose**: For each config/state change applied, cite the authoritative SOTA reference (Anthropic docs, upstream repo file:line@SHA, or empirical W288 evidence). All edits reversible.

---

## A. Hindsight runaway-thread leak (3 env vars + 1 OTEL endpoint fix)

File touched: `Z:\claude-sota-installed\.hindsight\profiles\claude-code.env` (gitignored runtime profile).

### A.1 `HINDSIGHT_EMBED_DAEMON_IDLE_TIMEOUT=900`

| Field | Value |
|---|---|
| Root cause | `--idle-timeout 0` hardcoded as `DEFAULT_DAEMON_IDLE_TIMEOUT = 0` |
| File:line | `hindsight-embed/hindsight_embed/daemon_embed_manager.py:38 @ SHA 9784f657` |
| Env-key mapping | `daemon_embed_manager.py:340` + `profile_manager.py:430` (Stream A traced) |
| Upstream doc | `https://github.com/vectorize-io/hindsight#daemon-lifecycle` (README claim "default 300" is **STALE** — confirmed Stream A audit) |
| Empirical evidence | Old daemon PID 91236 leaked to **469 threads / 21,011 CPU-s** in 2.2h with `--idle-timeout 0`; new daemon PID 145048 cmdline confirms `--idle-timeout 900` |
| Reversibility | Remove line from `claude-code.env`, restart daemon |

### A.2 `HINDSIGHT_API_LLM_TIMEOUT=300`

| Field | Value |
|---|---|
| Root cause | OpenAI SDK `timeout=120s` default, qwen36 35B-A3B Q4 chunk extracts take 60-120s → `APIConnectionError Request timed out` retry storm → thread accumulation |
| File:line | `hindsight_api/engine/providers/openai_compatible_llm.py:313 @ SHA 9784f657` (env read) + `hindsight_api/config.py:499` (default 120.0) |
| Upstream doc | OpenAI Python SDK timeout docs: `https://github.com/openai/openai-python#timeouts` |
| Empirical evidence | Stream A traced 4 retries × 300s observed in `[STUCK_STACK]` log lines for ops `4bf1d90e` and `4045c93f` |
| Reversibility | Remove line; falls back to 120s |

### A.3 `HINDSIGHT_API_LLM_MAX_CONCURRENT=4`

| Field | Value |
|---|---|
| Root cause | Default `32` asyncio fan-out at retain orchestrator gather() — far too wide for slow 35B inference |
| File:line | `hindsight_api/engine/retain/orchestrator.py:1001 @ SHA 9784f657` (gather call) + `hindsight_api/config.py:495` (default 32) |
| Upstream caveat | Stream A flagged: "no semaphore wrap there today; documented upstream patch candidate" — env IS read into config but NOT enforced as a semaphore around `asyncio.gather()` in current source. **Limited effect until upstream PR lands.** |
| Empirical evidence | Thread count still ~470 even with this env set; confirms upstream gap |
| Reversibility | Remove line; falls back to 32 |

### A.4 OTEL endpoint repoint (Phoenix HTTP-OTLP)

| Field | Value |
|---|---|
| Old | `HINDSIGHT_API_OTEL_EXPORTER_OTLP_ENDPOINT=http://127.0.0.1:14317` (Phoenix gRPC port, but hindsight venv only has `opentelemetry_exporter_otlp_proto_http`, no `grpcio` — silent HTTP fallback POSTing HTTP/1.1 into gRPC port) |
| New | `HINDSIGHT_API_OTEL_EXPORTER_OTLP_ENDPOINT=http://127.0.0.1:16006/v1/traces` |
| Root cause | Protocol/transport mismatch — Stream C confirmed by HTTP/2 preface probe (raw SETTINGS frame bytes `00 00 18 04...` identical to `BadStatusLine` in daemon log) |
| Upstream doc | OTLP HTTP/protobuf spec: `https://opentelemetry.io/docs/specs/otlp/#otlphttp` ; Phoenix endpoint paths: `https://docs.arize.com/phoenix/setup/deploying-phoenix` ; Phoenix collector at `:16006` exposes both gRPC + HTTP per upstream README |
| Empirical evidence | `opentelemetry.exporter.otlp.proto.http.trace_exporter` error in daemon log proves HTTP exporter was active despite `PROTOCOL=grpc` setting |
| Reversibility | Restore the old `:14317` line |

---

## B. `.claude/settings.json` — OTEL config parity

Same root cause as A.4 — applied to CC's own OTEL exporter env vars so they don't suffer the same fallback.

| Old | New |
|---|---|
| `OTEL_EXPORTER_OTLP_TRACES_ENDPOINT=http://127.0.0.1:14317` | `http://127.0.0.1:16006/v1/traces` |
| `OTEL_EXPORTER_OTLP_TRACES_PROTOCOL=grpc` | `http/protobuf` |

| Cite |
|---|
| Anthropic OTEL settings: `https://docs.anthropic.com/en/docs/claude-code/settings#environment-variables` |
| OTLP HTTP/protobuf spec: `https://opentelemetry.io/docs/specs/otlp/#otlphttp` |
| Phoenix collector: `https://docs.arize.com/phoenix/setup/deploying-phoenix` |

Reversibility: revert the 2 lines.

---

## C. llama-swap qwen3-vl-8b TTL tightening

File touched: `Z:\tools\llama-swap\config.yaml` — `qwen3-vl-8b` block, `ttl: 600` → `180`.

| Field | Value |
|---|---|
| Root cause | qwen3-vl-8b stayed loaded **4 hours idle** with `ttl: 600` (10 min default per upstream) consuming ~5 GB VRAM; auto-respawn cost on next request is ~10s (cheap) so tighter TTL is the right tradeoff |
| Upstream doc | `https://github.com/mostlygeek/llama-swap#ttl` (per-model `ttl` in seconds; `0` = never unload) |
| Discovered endpoints (Stream C probe) | `:8090/unload?model=<name>` (POST, returns "OK") ; `:8090/running` (list loaded models) ; `:8090/health` ; `:8090/metrics` ; `:8090/v1/models` |
| Empirical evidence | VRAM 99% sat → 92% after `/unload`, confirmed via `/v1/models?id=qwen3-vl-8b` returning ttl=180 after `Restart-Service LlamaSwap` |
| Reversibility | Edit YAML back to `ttl: 600`, restart `LlamaSwap` NSSM |
| Service supervisor | NSSM service `LlamaSwap` (Running, Automatic). Restart via `Restart-Service LlamaSwap -Force` |

---

## D. Windows Defender process/path exclusions

Applied via `Add-MpPreference` cmdlets (admin shell confirmed via `[Security.Principal.WindowsPrincipal]::IsInRole(Administrator)=True`). 8 paths + 4 procs added.

**Paths**:
- `Z:\claude-sota-installed\.claude\plugins`
- `Z:\claude-sota-installed\tmp`
- `Z:\claude-sota-installed-state`
- `C:\Users\42\AppData\Local\uv\cache`
- `C:\Users\42\.local\bin`
- `C:\Users\42\AppData\Roaming\npm`
- `Z:\venvs\claude`
- `Z:\ollama\models`

**Processes**: `ollama.exe`, `llama-server.exe`, `uv.exe`, `uvx.exe`

| Cite |
|---|
| `https://learn.microsoft.com/en-us/windows/security/threat-protection/microsoft-defender-antivirus/configure-process-opened-file-exclusions-microsoft-defender-antivirus` |
| `https://learn.microsoft.com/en-us/powershell/module/defender/add-mppreference` |

| Empirical evidence |
|---|
| MsMpEng WS dropped **717 MB → 274 MB** in <2 min after exclusions applied |
| MsMpEng CPU lifetime ~52k seconds was accumulating at ~0.7 cores continuously prior |

| Reversibility |
|---|
| `Remove-MpPreference -ExclusionPath <path>` (one per entry). Reverse script in `tmp/W288-system-lag-audit/W288-defender-exclusions.ps1` (commented-out block at bottom) |

---

## E. pg0 async_operations queue cleanup (session 2)

Action: `UPDATE async_operations SET status='cancelled' WHERE (status='processing' AND operation_id IN (3 stuck UUIDs)) OR (status='pending' AND task_payload IS NULL AND operation_type='batch_retain')` → **27 rows updated**.

| Field | Value |
|---|---|
| Queue table | `public.async_operations` in pg0 DB `hindsight` (port 5432, user `hindsight`) |
| Schema cite | Verified via `psql \d async_operations` — columns: `operation_id (uuid)`, `bank_id`, `operation_type`, `status (CHECK pending/processing/completed/failed/cancelled)`, `retry_count`, `task_payload (jsonb)`, etc. |
| Cancelled set | 3 stuck "processing" ops (`f947f2ea` 23h 38min old consolidation, `4bf1d90e` + `4045c93f` 3h+ old retains) + 24 pending `batch_retain` with `task_payload IS NULL` (fundamentally broken — can never process) |
| Preserved set | 22 legit `retain` pending + 1 legit `consolidation` pending — these have valid payload + age < 1h |
| Daemon restart required? | Yes — in-memory worker tasks for the 3 stuck ops continued running until daemon restart even after DB status updated; daemon doesn't poll DB for its own claimed task status (Stream A flag: another upstream patch candidate) |
| Reversibility | Status is reversible (`UPDATE ... SET status='pending'`); cancelled rows are not deleted |
| Upstream cite | hindsight task lifecycle: `hindsight_api/worker/poller.py` (file path resolved via `[STUCK_STACK]` Python stack trace in daemon log) |

---

## F. Already-correct invariants (NOT changed this session)

These were SOTA-correct before W288 started; verified during audit.

| Setting | Value | Cite |
|---|---|---|
| CLAUDE.md ≤50 LOC pointer-only | 42 LOC | CCBP `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-memory.md:34-40 @ HEAD 48f2ceb` |
| `CLAUDE_CODE_FORK_SUBAGENT=1` | on | Anthropic sub-agents: `https://docs.anthropic.com/en/docs/claude-code/sub-agents` |
| `CLAUDE_CODE_DISABLE_AUTO_MEMORY=1` | on | preserves pointer-only preload budget |
| `CLAUDE_CODE_SUBAGENT_MODEL` | **UNSET** (correctly) | deprecated; setting it funnels all subagents to a Sonnet stand-in, defeating fork model-inheritance |
| `CLAUDE_CODE_DISABLE_1M_CONTEXT` | **UNSET** (correctly) | 1M context is the SOTA primitive per `https://code.claude.com/docs/en/model-config` |
| `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` | **UNSET** (correctly) | Anthropic default ~95% per CCBP `claude-settings.md:826` |
| `ENABLE_PROMPT_CACHING_1H=1` | on | `https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching#1-hour-cache` |
| `ENABLE_TOOL_SEARCH=auto:5` | on | deferred tools per `https://docs.anthropic.com/en/docs/claude-code/configuration` |
| `effortLevel: xhigh` + `alwaysThinkingEnabled: true` | on (per operator W288 turn-back) | max quality; operator explicitly chose to keep |
| `stopReviewGate: true` | on (per operator W288 turn-back) | codex GPT-5.5 adversarial Stop-time review; cardinal rule 2 enforcement |
| pg0 location | Z:-portable via Windows junction → `Z:\claude-sota-installed\.pg0` | Stream B finding — W287 P2 effectively already done |
| qwen36 :8080 supervision | NSSM `IkLlamaServer` standalone with mlock | Stream C — deliberate (not a swap leak); KEEP |

---

## G. Open follow-ups (not applied — require operator decision)

| # | Item | Cite / why deferred |
|---|---|---|
| 1 | Close 4-5+ of N CC sessions to reduce per-session MCP multipliers | Operator explicitly waived this session |
| 2 | Remove dead `qwen36-moe` block from `Z:\tools\llama-swap\config.yaml:16-43` | Cosmetic per Stream C; not load-bearing |
| 3 | File upstream issue against `vectorize-io/hindsight` for `--idle-timeout 0` default + null-payload retain orphans + `LLM_MAX_CONCURRENT` semaphore | Stream A patch candidates |
| 4 | pg0 junction final-cleanup (`cmd /c rmdir` the C: junction so future starts use `Z:\` natively) | Needs maintenance window + NSSM/Task Scheduler probe for `USERPROFILE=C:` references (Stream B watchpoint) |
| 5 | Replace `python.exe` blanket Defender exclusion with strict path-pinned version | Stream A leakage-surface consideration; broad-exclusion safety tradeoff |

---

## H. Audit folder index

```
Z:\claude-sota-installed\tmp\W288-system-lag-audit\
├── H1-resource-audit.md            # Local resource + process audit
├── H2-mcp-plugin-audit.md          # MCP server + plugin overhead
├── H3-hooks-preload-audit.md       # Hook chain + preload bloat
├── H4-api-cache-audit.md           # Anthropic API + cache health
├── SYNTHESIS-2026-05-18.md         # Phase 1 synthesis
├── STREAM-A-hindsight-upstream.md  # Deep-dive: hindsight source (this is the gold)
├── STREAM-B-pg0-z-migration.md     # Deep-dive: pg0 junction (mostly already done)
├── STREAM-C-otel-llamaswap.md      # Deep-dive: OTEL + llama-swap qwen36 NSSM
├── FINAL-SUMMARY-2026-05-18.md     # Session 1 consolidated summary
├── W288-defender-exclusions.ps1    # Admin-PowerShell script (now executed)
└── SOTA-CITE-REFS-2026-05-18.md    # This file
```
