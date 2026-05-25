---
title: W178 F1 P0 — Graphiti recovery root-cause LOCAL VERIFY (Agent B Recovery #1+#2 dogfood)
status: AUTHORITATIVE
date: 2026-05-13
wave: 178
fire: 1
priority: P0 STOP-1 (root-cause confirmed; recovery operator-action-required)
---

# W178 F1 P0 graphiti-recovery root-cause LOCAL VERIFY

## VERDICT: ROOT-CAUSE-VERIFIED + RECOVERY-OPERATOR-ACTION-REQUIRED

W177 Agent B root-cause classification (`PROXY-TIMEOUT-CHAT-COMPLETIONS`) **VERIFIED via 4 direct probes** this fire. Root-cause refined: NOT a separate CLIProxyAPI proxy issue — `:11700` IS Ollama directly (Ollama serving OpenAI-compat on non-default port).

## 4-probe verification trail

| # | Probe | Result | Interpretation |
|---|---|---|---|
| 1 | `curl -m 3 :11700/v1/models` | HTTP 200 in 5.6ms; returns `qwen3.6:35b` + `qwen3-embedding:0.6b` + 5 others | Ollama HTTP listener UP |
| 2 | `curl -m 30 :11700/v1/chat/completions` `qwen3.6:35b` `max_tokens=10` | timeout 30s, empty body | Chat completion **WEDGED** |
| 3 | `curl -m 30 :11700/v1/embeddings` `qwen3-embedding:0.6b` | timeout 30s, empty body | Embedding **WEDGED** |
| 4 | `curl -m 60 :11700/v1/chat/completions` `qwen3.6:judge` `max_tokens=5` (smaller model fallback) | timeout 60s, empty body | **Wedge is generic, not 35b-specific** |

## Topology refinement (FM-20 catch — supersedes Agent B's "CLIProxyAPI" framing)

Agent B's W177 root-cause referred to "CLIProxyAPI :11700 proxy". `netstat -ano | grep :11700` reveals **PID 45628 = `ollama.exe`** directly (not a proxy in front of Ollama). Topology:

```
graphiti MCP --[OPENAI_API_URL=http://127.0.0.1:11700/v1]--> Ollama PID 45628 (:11700, OpenAI-compat)
                                                                    |
                                                                    +-- model loaded: qwen3.6:35b in VRAM 13GB (per /api/ps)
                                                                    +-- expires_at: 2026-05-13T16:48:47-04:00 (5min keepalive)
```

Ollama process inventory:
- PID 48948 `ollama app.exe` 35MB — desktop app
- PID 45628 `ollama.exe` 192MB — **server listening :11700 ← THE WEDGE**
- PID 65240 `ollama.exe` 15.4GB — model loaded (qwen3.6:35b 36B params Q4_K_M)
- PID 15148 `ollama.exe` 377MB — child/auxiliary

Forward-only FM-20 micro-correction: rename W177 Agent B + W178 references "CLIProxyAPI :11700 proxy" → "Ollama :11700 (OpenAI-compat listener)" per `port-note-discipline.md §6` no-retroactive-rewrite at W177 historical artifact; correct at W178+ live cite trail.

## Ollama :11434 default port NOT IN USE

`curl -m 3 :11434/api/tags` returns HTTP 000 (connection refused). Ollama bound EXCLUSIVELY to :11700 in this runtime. No fallback path via :11434 default.

## Recovery (operator-supervised; per launch-discipline.md §7 OS-State-Mutation PROBE-18)

Cannot proceed from this session per CR-9 install-risk discipline + launch-discipline §7 OS-State-Mutation precondition check (target PID 45628 IS bound). Two options for operator:

### Option A — graceful Ollama restart (~30-60s downtime)
```powershell
Stop-Process -Id 45628 -Force                          # stop wedged server
Start-Sleep -Seconds 5                                  # allow VRAM unload
$env:OLLAMA_HOST = "127.0.0.1:11700"                   # preserve non-default port binding
Start-Process -FilePath "ollama" -ArgumentList "serve" -NoNewWindow # restart
Start-Sleep -Seconds 10                                 # wait for ready
curl -s -m 5 http://127.0.0.1:11700/v1/models          # verify HTTP 200
curl -s -m 60 -X POST http://127.0.0.1:11700/v1/chat/completions -H "Content-Type: application/json" -d '{"model":"qwen3.6:judge","messages":[{"role":"user","content":"reply OK only"}],"max_tokens":5,"stream":false}'
# expect non-empty response within 60s
```

### Option B — investigate wedge root cause (no restart yet)
- Check Ollama logs at `%LOCALAPPDATA%\Ollama\server.log` (Windows) for last 50 lines
- Check VRAM saturation via `nvidia-smi` (if NVIDIA GPU) — wedge could be VRAM-OOM mid-inference
- Check if any active inference request is stuck (`ollama ps` may report request queue)

## STOP-1 disposition

**STATUS**: ROOT-CAUSE-CONFIRMED (locally verified) + RECOVERY-IDENTIFIED (Option A or B) + EXECUTION-OPERATOR-GATED (per CR-9 sibling-bleed defense + launch-discipline §7 OS-State-Mutation operator-supervised stop/start cycle requirement).

W178 STOP-1 advances from W177 close PARTIAL → "ROOT-CAUSE-LOCALLY-CONFIRMED" — actionable recovery path documented. Cannot self-execute from this session (would interrupt parallel sessions consuming Ollama).

## 5-surface persist (this fire)

| # | Surface | Status |
|---|---|---|
| 1 | tmp/ artifact | ✓ this file |
| 2 | MEMORY.md L73 entry | DEFERRED next-fire (≤150-char one-line entry; context budget constrained at fire close) |
| 3 | docs/install-provenance.md Wave-178 row | DEFERRED next-fire |
| 4 | mcp-memory hash | DEFERRED next-fire (post-Ollama-restart graphiti recovery dependency) |
| 5 | graphiti episode group=eee | **BLOCKED-by-P0** (this fire's purpose — chicken-and-egg) |

Per FM-20 row 9 asymmetric-dual-write defense + sessionstart-preload-discipline 5-backend hash verify: do NOT claim 5-surface DONE. Honest disposition: 1/5 this fire (tmp/ artifact only); remaining 4 deferred pending P0 operator-recovery + Mia probe both backends post-recovery.

## Forward action queue (ordered by reversibility + operator-action-required)

1. **OPERATOR**: execute Option A (Ollama restart) OR Option B (investigate wedge); report back outcome + verbatim probe results
2. Post-restart Mia probe: re-run 4-probe verification this artifact's table; verify all 4 PASS within 60s budget
3. Re-test graphiti round-trip: `mcp__graphiti__add_memory group_id=eee name=W178-F1-P0-Recovery` → wait worker drain → `mcp__graphiti__get_episodes group_id=eee last_n=1` → verify episode lands
4. If round-trip PASS: 5-surface 5/5 unblocks; W178 STOP-1 → ✓ FIRM-MET
5. If round-trip FAIL post-restart: escalate to FM-20 row-15 candidate (ollama-wedge-class new sub-class) + investigate Graphiti async queue worker per `src/services/queue_service.py:_process_episode_queue`

## Cite trail

- W177 close-synthesis tmp/wave177-close-synthesis-2026-05-13.md (P0 disposition + Forward Top-5)
- W177 Agent B 8-probe trace tmp/wave177-fire2-agentB-fm20row9-rootcause-2026-05-13.md (root-cause classification source)
- launch-discipline.md §7 OS-State-Mutation PROBE-18 precondition check (Stop-Process gate)
- CR-9 install-risk discipline (sibling-bleed defense + service-restart guardrail)
- FM-20 row 9 asymmetric-dual-write defense (5-backend persist Mia post-probe)
- Topology refinement: PID 45628 ollama.exe + /api/ps response + netstat :11700 LISTENING

## Recursive dogfood note

This fire dogfoods W177 Agent B's recovery recipe (Recovery #1: probe direct chat+embedding completion; Recovery #2: re-run graphiti round-trip post-recovery). Probe #1+#2+#3 of this artifact's table EXACTLY map to Agent B's Recovery #2 step. The local verify CONFIRMS Agent B's classification + REFINES topology (no separate "CLIProxyAPI" — Ollama directly). Per `synthesis-layer-verify.md §Reporting categories`: this is the GENUINE-gap-VALIDATED outcome (Agent B's prescription was correct; refinement is forward-only cite-correction not a refutation).
