# W301 Operator-Ready Artifacts (2026-05-18)

Drafts for operator-AI items queued by W301-CONVERGENCE-LOCAL-MODEL-MONITOR-2026-05-18.md. Each artifact is a ready-to-apply configuration; the operator runs the indicated CLI command after reviewing.

---

## 1. `IkLlamaServer-AppParameters-W301-dual-spec.txt` (W301-MED-dual-spec-restore)

**What**: Replaces current IkLlamaServer NSSM `AppParameters` to restore W269 §0 #2 dual-spec MTP + ngram-mod recipe (gap: current params use `-mtp` single-stage only).

**Evidence**: PR [#1789](https://github.com/ikawrakow/ik_llama.cpp/pull/1789) — dual-spec gives +35-40% on code prompts vs MTP-only [MEASURED on Qwen3.6-27B-MTP-Q8_0: code 60→108 t/s, extract 54→67 t/s]. W269 §A2 confirms `--spec-stage <self>:<args> --spec-stage <traditional>:<args>` syntax.

**Apply**:
```powershell
# 1. Backup current params
nssm get IkLlamaServer AppParameters > Z:\claude-sota-installed-state\.codex\backups\IkLlamaServer-AppParameters-pre-W301-dual-spec.txt

# 2. Apply new params (read from this file)
$newParams = Get-Content Z:\claude-sota-installed\docs\architecture\W301-CONVERGENCE-SWEEP-AND-RESEARCH-ARCH-V6\OPERATOR-READY-ARTIFACTS\IkLlamaServer-AppParameters-W301-dual-spec.txt -Raw
nssm set IkLlamaServer AppParameters $newParams.Trim()

# 3. Smoke-test BEFORE restart (verify the new flag syntax is valid against current ik_llama.cpp HEAD)
& "Z:\repos\deps\ik_llama.cpp\build-new\bin\Release\llama-server.exe" --help 2>&1 | Select-String -Pattern "spec-stage"

# 4. Restart IkLlamaServer NSSM service
nssm restart IkLlamaServer

# 5. Verify it came back up healthy
Start-Sleep -Seconds 30  # MTP requantize cold-load takes ~20s
Invoke-RestMethod -Uri "http://127.0.0.1:8080/health" -TimeoutSec 5
# Expect: {"status":"ok","slots_idle":1,"slots_processing":0}

# 6. Verify model still loaded with the same memory footprint
Invoke-RestMethod -Uri "http://127.0.0.1:8080/v1/models" -TimeoutSec 5
# Expect: {"object":"list","data":[{"id":"qwen36",...}]}
```

**Rollback**:
```powershell
$oldParams = Get-Content Z:\claude-sota-installed-state\.codex\backups\IkLlamaServer-AppParameters-pre-W301-dual-spec.txt -Raw
nssm set IkLlamaServer AppParameters $oldParams.Trim()
nssm restart IkLlamaServer
```

**Recovery time**: ~30 sec NSSM restart + ~20 sec MTP cold-load = ~50 sec total per cycle.

**Risk**: IkLlamaServer is the sole LLM endpoint for hindsight T1 + cognee T3. Downtime during the restart = both tiers fail open (hindsight returns 503, cognee falls back to in-memory). NOT a destructive action; full rollback path in <1 min.

---

## 2. WinSW XML configs (W301-MED-nssm-to-winsw) — TODO

To be written: `IkLlamaServer.xml`, `LlamaSwap.xml` per WinSW v3 XML schema (https://github.com/winsw/winsw/blob/master/doc/xmlConfigFile.md). Include `<envFromFile>` directives to close the SEV-1 langfuse-secret-key registry exposure.

---

## 3. Cognee embedder repoint env-block (W301-HIGH-cognee-embedder-repoint) — TODO

Drop into CogneeMCP `.env` (post-WinSW migration) or NSSM `AppEnvironmentExtra`:

```ini
EMBEDDING_PROVIDER=openai_compatible
EMBEDDING_ENDPOINT=http://127.0.0.1:8090/v1
EMBEDDING_MODEL=qwen3-embed-0.6b
EMBEDDING_API_KEY=local
EMBEDDING_DIMENSIONS=1024
```

After applying:
1. Restart CogneeMCP
2. Smoke-test: `curl -X POST http://127.0.0.1:8000/mcp/cognify -H "Content-Type: application/json" -d '{"text":"W301 smoke test"}'` — verify the chunk lands in `Z:\claude-sota-installed-state\cognee\data\` AND the embedding vector lives in cognee's vector store
3. Re-probe Ollama: `curl http://127.0.0.1:16700/api/ps` — `qwen3-embedding:0.6b` should drop to 0 active references after cognee's keep-alive window expires
4. THEN: stop OllamaServe NSSM service (Endgame-A step 2 complete)

---

## 4. Langfuse secret-key rotation (W301-SEV-1) — TODO

1. Login to Langfuse UI at `http://127.0.0.1:3000`
2. Navigate to Settings → API Keys
3. Generate new key pair (rotate)
4. Update consumers:
   - CogneeMCP env (`LANGFUSE_SECRET_KEY`)
   - CLAUDE.local.md env block (gitignored, line 55)
   - Any other process reading `LANGFUSE_*` env (probe with `findstr /S /M "LANGFUSE_SECRET_KEY" Z:\...` — expected zero hits in tracked files)
5. Delete old key in Langfuse UI
6. Audit System Restore + registry-backups for stale REG_MULTI_SZ values

---

## 5. llama-swap v213+ upgrade (W301-MED-llama-swap-v213) — TODO

```powershell
# 1. Snapshot current binary
Copy-Item Z:\tools\llama-swap\llama-swap.exe Z:\claude-sota-installed-state\.codex\backups\llama-swap-pre-W301.exe

# 2. Stop service
nssm stop LlamaSwap  # (currently STOPPED anyway per W297)
# Also kill standalone exe if running:
Stop-Process -Id 7640 -Force -ErrorAction SilentlyContinue

# 3. Download v213+
$rel = Invoke-RestMethod -Uri "https://api.github.com/repos/mostlygeek/llama-swap/releases/latest"
$asset = $rel.assets | Where-Object { $_.name -match "windows_amd64\.zip$" } | Select-Object -First 1
$zip = "$env:TEMP\llama-swap-$($rel.tag_name).zip"
Invoke-WebRequest -Uri $asset.browser_download_url -OutFile $zip
Expand-Archive -Path $zip -DestinationPath "$env:TEMP\llama-swap-$($rel.tag_name)" -Force

# 4. Swap binary
Copy-Item "$env:TEMP\llama-swap-$($rel.tag_name)\llama-swap.exe" Z:\tools\llama-swap\llama-swap.exe -Force

# 5. Enable Prometheus metrics in config.yaml (add at top level)
# metrics:
#   enabled: true
#   path: /metrics
#   port: 8090   # share with the main listener
# performance:
#   every: 5s

# 6. Restart
nssm start LlamaSwap

# 7. Verify
Invoke-RestMethod -Uri "http://127.0.0.1:8090/v1/models"
Invoke-RestMethod -Uri "http://127.0.0.1:8090/metrics" | Select-Object -First 30
```

---

## 6. nvitop-exporter install (W301-MED-nvitop-exporter)

```powershell
# 1. Install into venv
& Z:\venvs\claude\Scripts\pip.exe install nvitop nvitop-exporter

# 2. NSSM-register (or WinSW-register post-Endgame-A-step-3)
nssm install NvitopExporter Z:\venvs\claude\Scripts\nvitop-exporter.exe
nssm set NvitopExporter AppParameters "--bind-address 127.0.0.1 --port 5050 --interval 5"
nssm set NvitopExporter DisplayName "nvitop Prometheus Exporter (GPU NVML)"
nssm set NvitopExporter Start SERVICE_AUTO_START
nssm start NvitopExporter

# 3. Smoke
Invoke-RestMethod -Uri "http://127.0.0.1:5050/metrics" | Select-Object -First 50
```

---

## Sequencing per W301 §7 roadmap

1. **SEV-1**: rotate langfuse key + audit registry FIRST (highest severity, ~30 min)
2. **HIGH**: cognee embedder repoint (prerequisite for OllamaServe retire; ~2-4 hr including smoke-test)
3. **MEDIUM**: NSSM→WinSW migration (closes SEV-1 class permanently; ~1-2 hr)
4. **MEDIUM**: llama-swap v213+ upgrade (Prometheus metrics unlocks the monitor stack; ~30 min)
5. **MEDIUM**: dual-spec MTP+ngram-mod restore (+35-40% on code prompts; ~15 min)
6. **MEDIUM**: nvitop-exporter install (closes monitor SOTA gap; ~15 min)
7. **MEDIUM**: Docker-compose CogneeMCP (Endgame-A step 4; ~2-3 hr)
8. **LOW**: Docker-compose basic-memory (~1-2 hr)
9. **LOW**: per-model `ttl:` tuning (~5 min)
10. **Q3 2026 review gate**: re-evaluate Endgame-B
