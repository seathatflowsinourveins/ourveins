# W265 — Truth-up + Langfuse Wiring (2026-05-17 post-codex-consensus)

> Follow-on to `W265-codex-consensus-2026-05-17.md` (codex GPT-5.5 adversarial cross-review). This doc owns:
> 1. The 5 W264 over-claim corrections in a single truth-up table (historical W264 doc stays as-committed)
> 2. The Langfuse wiring sequence (codex-blessed)
> 3. The VRAM-saturation backpressure alert design (codex's #1 unattended risk)
> 4. The "freeze new model/plugin work" gate (codex's recommended next move)

---

## §1 — W264 truth-up table (corrections, do not retroactively edit committed doc)

| W264 line | Stated | Actually | Source |
|---|---|---|---|
| `§0 row 9` "DROP Langfuse (0 traces/hr)" | DROP | **WIRE** — passes 3-axis convergence-gate (SRA 8/10), Phoenix is complementary not redundant | `W265-codex-consensus §Claim1` |
| `§2 T3` "cognee REMOVED — comment-only" | REMOVED | **LIVE** — NSSM service `CogneeMCP` PID 85944, `.mcp.json:113-116` is the active block; `.mcp.json:11` `_comments.cognee_w259v8` says "NOW LIVE" | commit `1eeebd8` |
| `§0 row 5 + §4` "SHIP with 3 disables + 3 installs" | SHIP-applied | **SHIP-decided, NOT-applied** — settings.json:129,136,143 still have `everything-claude-code=true`, `pr-review-toolkit=true`, `code-simplifier=true` | live `.claude/settings.json` audit |
| `§0 row 7` "Parallel sessions SHIP" | SHIP | **DOC-CONVERGED, NOT-OPERATIONALLY-SHIPPED** — `parallel-sessions-arch` is NOT-FF-mergeable per W264-git audit | `git merge-base` math |
| `§1 closing line` "First time 4090 has slack since W260" | slack | **NO slack** — live 23.8/24 GiB used, 86% util sustained, 1 GiB margin under 4-slot scaling | this session's monitor |

**Net effect on the SHIP verdict**: 9/9 layers were converged in DECISION but only 6/9 are SHIP-APPLIED. The honest verdict is **6/9 SHIP-applied + 3/9 SHIP-decided-pending-apply**.

---

## §2 — Langfuse wiring sequence (codex-blessed)

### Phase A — extract Langfuse keys (operator-driven, 30 sec)

```powershell
# 1. Open Langfuse UI
start http://127.0.0.1:3000
# 2. Login: admin / observability42 (per W262-observability-audit:9)
# 3. Settings → API Keys → Create new project key
# 4. Capture the pk-lf-* (public) and sk-lf-* (secret) values
# 5. Note the project ID
```

If the operator runs `docker logs langfuse-web` we can also extract the bootstrap key the first-run sets. But Phase A via UI is the canonical path.

### Phase B — wire `graphiti` MCP (highest LLM-call volume, best test bed)

Edit `Z:\claude-sota-installed\.mcp.json` `graphiti` server env block — append:

```jsonc
"env": {
  "...": "...existing...",
  "LANGFUSE_HOST": "http://127.0.0.1:3000",
  "LANGFUSE_PUBLIC_KEY": "<pk-lf-...>",
  "LANGFUSE_SECRET_KEY": "<sk-lf-...>"
}
```

Restart CC (`/clear` or new session) — `graphiti-mcp` re-spawns with the env. Verify in Langfuse UI: Traces tab should show a new trace within 60 sec on the next `add_episode` call.

### Phase C — wire cognee NSSM service env

```powershell
# NSSM AppParameters: edit via `nssm edit CogneeMCP`
# Add to AppEnvironmentExtra (one per line):
LANGFUSE_HOST=http://127.0.0.1:3000
LANGFUSE_PUBLIC_KEY=<same>
LANGFUSE_SECRET_KEY=<same>
# Then: nssm restart CogneeMCP
```

Cognee uses LiteLLM internally; LiteLLM picks up Langfuse env vars automatically via its callback system.

### Phase D — wire hindsight daemon env

Append to `Z:\claude-sota-installed\.hindsight\profiles\claude-code.env`:

```env
# W265 §2D — Langfuse wiring (codex GPT-5.5 consensus)
LANGFUSE_HOST=http://127.0.0.1:3000
LANGFUSE_PUBLIC_KEY=<same>
LANGFUSE_SECRET_KEY=<same>
# Optional: route hindsight's structured-output prompts via Langfuse Prompts API
HINDSIGHT_API_PROMPT_PROVIDER=langfuse
HINDSIGHT_API_PROMPT_LANGFUSE_PROMPT_NAME=retain_extract_facts
```

Hindsight daemon picks up env on next SessionStart-hook respawn (or manual `Stop-Process` of the daemon).

### Phase E — verify three-source convergence in Langfuse UI

Open `http://127.0.0.1:3000` → Traces tab. Expect within 5 minutes:
- Traces from `service.name=graphiti-mcp`
- Traces from `service.name=cognee-mcp` (or however cognee tags itself)
- Traces from `service.name=hindsight-api`

If only Phoenix gets traces and Langfuse stays at 0, the env wiring didn't propagate — check `Get-Process | Where-Object {$_.ProcessName -match 'python|node'} | Select-Object Id, @{n='LANGFUSE_HOST';e={(Get-WmiObject Win32_Process -Filter "ProcessId=$($_.Id)").CommandLine}}`.

### Phase F (later, optional) — migrate hot prompts to Langfuse Prompts API

Once Phase E shows traces, migrate the 3 highest-volume prompts to Langfuse Prompts:
1. Hindsight `retain_extract_facts` (structured-output, called 12/min)
2. Graphiti `entity_extract` (per-message)
3. Graphiti `relation_extract` (per-entity-pair)

Benefit: prompt-version A/B testing on the `qwen3-coder:30b-a3b` graphiti swap that just landed.

---

## §3 — VRAM-saturation backpressure alert (codex's #1 unattended risk)

The risk: **35B with `--parallel 4` shares VRAM across 4 concurrent KV-cache slots**. At 65K ctx each, theoretical worst case = 4 × ~1.6 GiB KV per slot = ~6.4 GiB just for slot-KV, plus 16.4 GiB model weights = ~23 GiB. Live shows 23.8 GiB used, 1 GiB margin. **A 5th request gets refused or OOMs.**

### Alert wiring

Prometheus scrape on `nvidia-smi --query-gpu=memory.used --format=csv` (via `nvidia-smi-exporter` docker container — choose `gpu_memory_used_bytes`):

```yaml
# alerts.yaml — append to prometheus rules
groups:
  - name: gpu_vram
    rules:
      - alert: VRAMNearCeiling
        expr: gpu_memory_used_bytes / gpu_memory_total_bytes > 0.96
        for: 30s
        labels: { severity: warning }
        annotations:
          summary: "GPU VRAM > 96% — 4-slot 35B near saturation"
      - alert: HindsightSlotsExhausted
        expr: llama_server_slots_idle{port="8080"} == 0
        for: 60s
        labels: { severity: warning }
        annotations:
          summary: "All 4 :8080 slots in-use for >60s — request queue building"
```

Manual probe equivalent (for now, before Prometheus rules land):

```powershell
while ($true) {
  $g = nvidia-smi --query-gpu=memory.used,memory.free,utilization.gpu --format=csv,noheader
  $h = (Invoke-WebRequest -Uri http://127.0.0.1:8080/health -UseBasicParsing).Content
  $ts = (Get-Date).ToString("HH:mm:ss")
  "$ts | $g | $h" | Out-File -Append Z:\claude-sota-installed\tmp\vram-monitor.log
  Start-Sleep -Seconds 30
}
```

### Mitigation paths if alert fires

1. **Reduce `--parallel 4 → 2`** in NSSM service config — halves worst-case slot-KV
2. **Reduce `-c 65536 → 32768`** — halves per-slot KV ceiling
3. **Both** — for the safest budget on the 1-GiB-margin GPU

---

## §4 — Freeze new-work gate (codex's next-move)

**Until §2 Phase E shows traces in Langfuse AND §3 VRAM alert is wired, the following are FROZEN:**

- New plugin installs (W262 Task 365's `tdd-workflows` + `gitnexus` + `pydantic-ai` — actually some already done by parallel session; verify)
- Re-quantize GGUF for MTP (Task 366)
- Job 5/7 further model swaps (Job 7 Qwen3-VL-8B downloaded but llama-swap target not exercised yet — that's fine, it's idle)
- Plugin disables (the 3 dupes from W264-agent-orch audit) — would cause restarts under no-VRAM-margin

**Unfrozen (operator-time-only)**:
- Phase A (extract Langfuse keys) — UI click
- Phase B-D (wire env vars) — file edits, no live restart needed yet
- Phase E (verify) — natural traffic test

---

## §5 — What I need from operator

1. **Langfuse keys** — `pk-lf-*` (public) + `sk-lf-*` (secret) from `http://127.0.0.1:3000` Settings → API Keys. I'll write them into the three env files and run Phase E.
2. **Confirm `--parallel 4` is the intended scaling** (current NSSM config). If yes, §3 VRAM alert wiring is justified. If no, drop to `--parallel 2` and the risk evaporates.
3. **Status on the deferred plugin disables** — should I proceed with the 3 disables (`everything-claude-code`, `pr-review-toolkit`, `code-simplifier`) in a quiet window, or hold?

---

## §6 — Sources

- `Z:\claude-sota-installed\docs\architecture\W265-codex-consensus-2026-05-17.md` (codex GPT-5.5 adversarial)
- `Z:\claude-sota-installed\docs\architecture\W264-ULTIMATE-SYNTHESIS-2026-05-17.md` (over-claim source)
- `Z:\claude-sota-installed\docs\architecture\W262-observability-audit-2026-05-17.md` (W262 prior DROP verdict — now superseded)
- `Z:\claude-sota-installed\.mcp.json:11,113-116` (cognee LIVE evidence)
- `Z:\claude-sota-installed\.claude\settings.json:129,136,143` (plugin disables still unapplied)
- Live state: GPU 23.8/24 GiB 86% util, :8080 NSSM `--parallel 4`, :9077 hindsight healthy
