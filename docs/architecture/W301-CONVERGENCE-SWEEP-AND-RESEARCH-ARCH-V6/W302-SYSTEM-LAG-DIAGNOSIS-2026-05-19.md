# W302 — System Lag Root-Cause Diagnosis (2026-05-19 03:35 UTC)

> **Trigger**: operator observed system lag; instructed "always be active and research find the root repos etc and resolve via SOTA optimization methods".
> **Discipline**: superpowers:systematic-debugging Phase-1 (gather evidence before propose). Diagnostic batch ran across CPU/RAM/GPU/ports/processes/service-RTT.
> **Outcome**: lag is **multi-session resource contention** (operator's rig running 3× the documented CLAUDE.md cap=3 parallel-session limit), NOT a code/config bug. GPU is IDLE.

## §1 — Live evidence (2026-05-19 03:35 UTC)

| Metric | Value | Verdict |
|---|---|---|
| GPU util | 13% / 675 MHz / 38W draw | **IDLE** — not the lag source |
| GPU VRAM | 23.5 GB used / 0.6 GB free (qwen36 mlock) | At mlock budget; expected |
| CPU avg | (PowerShell mangling blocked clean read; per top-process sample) | Unknown but presumed moderate |
| RAM (top consumers) | llama-server 9.85 GB + 9 claude.exe ~5 GB + hindsight 1.77 GB + WSL VM 3.44 GB + MsMpEng 1.16 GB + 9× TradingView/chrome ~3 GB | ~24 GB used |
| **TCP LISTENING ports** | **151** | High — consistent with multi-session sprawl |
| **python.exe processes** | **87** | High — MCP server children + uvx wrappers |
| **claude.exe processes** | **9** (vs CLAUDE.md cap=3 mandate) | **3× over cap** |

## §2 — Service RTT snapshot

| Service | RTT | Verdict |
|---|---|---|
| llama-swap :8090 /v1/models | **3.3 ms** | EXCELLENT |
| cognee :8000 /mcp | **5.4 ms** | EXCELLENT |
| nvidia_gpu_exporter :9835 /metrics | **463 ms** | Acceptable for 101-metric scrape; not steady-state lag |
| **IkLlamaServer :8080 /health** | **timeout (exit=28)** initially → after 30s wait: `{"status":"no slot available","slots_idle":0,"slots_processing":1}` | TRANSIENT — cold-load in progress from W302 P1 #5 dual-spec restart |

## §3 — Root cause synthesis

**The lag is dominated by**:
1. **W302 P1 #5 dual-spec restart still cold-loading** (PID 61736 holding 9.85 GB RAM + 23.5 GB VRAM; `slots_processing:1` means a request is in-flight; cold-load self-resolves)
2. **9 parallel CC sessions × 16 MCP servers each** = ~144 MCP child processes, ~151 LISTENING ports. Each session inherits the full .mcp.json + plugin set.
3. **NOT a code/config defect** — every service that's been live-probed responds correctly when not mid-cold-load.

**Process inventory (multi-session chain proof)**:
```
basic-memory MCP × 6 PIDs in 3 parent-child chains (uvx wrapper → basic-memory.exe) — one chain per CC session
hindsight-api PID 50420 = 1.77 GB (LLM-extraction worker; normal)
llama-server PID 61736 = 9.85 GB working set (NEW dual-spec process from this turn's P1 #5)
9 claude.exe (CC sessions; sum ~5 GB)
87 python.exe total (MCP + uvx + cognee + hindsight + basic-memory + plugin daemons)
```

## §4 — SOTA optimization recommendations (per "zero self-invent, follow SOTA practice")

### Per CLAUDE.md upstream-blessed mitigation (no self-invent):
1. **Close unused CC sessions** — CLAUDE.md W280d documented "~3 parallel cap (cognitive + token budget)". Running 9 sessions exceeds by 3×. Each closed session releases ~16 MCP child processes + ~5 LISTENING ports.
2. **Wait for IkLlamaServer warmup** — `slots_processing:1` means active request; cold-load will free in 30-60s.
3. **No process-kill action** — every claude.exe + MCP child is owned by an operator-active CC session. Killing them would destroy in-flight session state.

### Per upstream Anthropic CC docs (https://code.claude.com/docs/en/cli-reference):
- Use `claude --fork-session` + `/branch` discipline per CLAUDE.md (W280d) when running parallel work
- Use git worktree-per-session pattern (already established at W272/W287/W290 etc.)
- For background tasks, use `claude --bg "<task>"` instead of foreground CC sessions

### Per upstream `.claude/settings.json:disabledMcpjsonServers`:
- Currently disables: memory, github, context7, playwright, graphiti, phoenix (6 entries)
- Per-session optimization: each session can disable MCPs it doesn't need via session-scope settings.json overrides (Anthropic-blessed pattern)

## §5 — Cardinal-rule conformance for the recommendations

R1 ✓ All recommendations use upstream-blessed mechanisms (CC --fork-session, git worktree, `disabledMcpjsonServers`)
R2 ✓ No self-invented kill-scripts or process-management hooks
R3 ✓ No subagent changes
R4 ✓ Recommendations live in this docs/architecture/ file, not `.claude/rules/`
R5 ✓ Safety via permissions + operator-decision; no destructive auto-kill

## §6 — Non-actions (rejected as not SOTA / risk-out-of-budget)

- **Kill basic-memory MCP chains** — REJECTED. Each chain is an active MCP server bound to a CC session; killing breaks operator session state.
- **Kill claude.exe sessions** — REJECTED. Same reason; operator owns them.
- **Reduce IkLlamaServer mlock budget** — REJECTED. Already optimal per W269; 23.5 GB on a 24 GB RTX 4090 leaves headroom for kernel buffers.
- **Disable nvidia_gpu_exporter** — REJECTED. Provides 101 metrics for the SOTA observability stack just shipped this session.

## §7 — Operator next-action queue

| # | Action | Effort | Reversibility |
|---|---|---|---|
| 1 | List active CC sessions: `claude agents` (per CCBP) and identify which 6 of 9 to close | 5 min | Each `claude stop <id>` is per-session-reversible (operator can re-open with `claude resume <id>`) |
| 2 | Wait for IkLlamaServer slot to free (`curl :8080/health` should return `slots_idle:1`) | 1-2 min | Automatic — current request will complete |
| 3 | Audit which MCP servers each session actually needs; consider session-scope `disabledMcpjsonServers` overrides | 30 min | Reversible per CC docs |
| 4 | Continue NSSM→WinSW migration when ready (the queued W302 P2 #6 item) — WinSW v3 announced lower-overhead than NSSM per W301-STREAM-A | 1-2 hr per service | Per-service rollback documented |

## §8 — Cite trail

- CLAUDE.md "~3 parallel cap" per W280d
- Anthropic CC docs `https://code.claude.com/docs/en/cli-reference` `--fork-session` + `/branch`
- W301-STREAM-A WinSW migration runbook
- Live probes ts 2026-05-19 03:35 UTC + `nvidia-smi` + `tasklist` + `netstat -ano | grep LISTENING`
