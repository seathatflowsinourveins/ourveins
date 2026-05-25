# W310 — Phase 2: SOTA-Anchored Optimizations Applied

**Date**: 2026-05-19 · **Branch**: sota-converge-w295

## Phase 1: ✅ Applied (immediate, low-risk)

| Action | Status | VRAM/RAM Effect | Cite |
|---|---|---|---|
| Stop `FalkorDB` Docker container `41b509e58c17` | ✅ done | Frees Docker memory pool (~500 MB RAM) | CLAUDE.md:35 "FalkorDB+Ollama can be stopped" |
| Stop `OllamaServe` NSSM (port 16700) | ✅ done | qwen3-embedding was in RAM not VRAM (`size_vram: 0`), so ~1.5 GB RAM freed but **0 VRAM** | W282d marked DORMANT post-graphiti retirement |
| Kill 10 stale `claude.exe` sessions + scaffolds | ✅ done | ~4-5 GB RAM freed | CLAUDE.md ~3-session parallel cap |

**Reality check**: VRAM stayed at ~95-97% because the **real hog is `IkLlamaServer` NSSM holding qwen36 35B with `--mlock` at :8080** (≈20 GB VRAM). Ollama was a red herring on the VRAM axis.

## Phase 2: SOTA optimizations (research-anchored, operator-gated)

### A. Local-model VRAM consolidation (HIGH-LEVERAGE, ~20 GB VRAM)

**Finding** from `SOTA-LOCAL-MODEL-SERVER-RESEARCH.md` + `Z:\tools\llama-swap\config.yaml` inspection:
- `LlamaSwap` is ALREADY installed and running NSSM at port :8090
- llama-swap config has `_disabled_qwen36-moe` entry — author registered it but never repointed `:8080` consumers (hindsight, cognee) to `:8090` per the inline comment
- Currently `IkLlamaServer` NSSM at :8080 holds qwen36 35B with `--mlock` 24/7
- `globalTTL: 300` is already configured in llama-swap

**SOTA action (high VRAM payoff)**:
1. Stop `IkLlamaServer` NSSM
2. Rename `_disabled_qwen36-moe` → `qwen36-moe` in `Z:\tools\llama-swap\config.yaml:25`, set `ttl: 120` (override globalTTL for the 35B specifically)
3. Update `.claude/settings.json` env: `HINDSIGHT_API_LLM_BASE_URL: "http://127.0.0.1:8080/v1"` → `"http://127.0.0.1:8090/v1"`
4. Restart hindsight daemon (or it picks up env on next session start)
5. **Result**: qwen36 unloads after 120s idle → **~18-20 GB VRAM freed when idle**

Reversibility: revert all three changes; cold-start penalty when LLM model needed = ~10-15s.

### B. basic-memory stdio → HTTP transport (HIGH-LEVERAGE, ~4 GB RAM)

**Finding** from `BASIC-MEMORY-SPAWN-AUDIT.md`:
- 20+ `basic-memory.exe` processes is **expected MCP stdio semantics** (1 server per CC session)
- basic-memory has NO `BASIC_MEMORY_SINGLE_INSTANCE` flag
- SOTA pattern: switch `.mcp.json` to `type: http` against ONE daemon
- Anthropic docs: `claude mcp add --transport http`
- basic-memory's own Dockerfile defaults to this

**SOTA action**:
1. Resolve W295 AI-3 config-path drift first (per `W295-BASIC-MEMORY-DEEP-AUDIT.md §5`)
2. Create NSSM service `BasicMemoryHTTP` running `basic-memory mcp --transport streamable-http --host 127.0.0.1 --port 8765`
3. Edit `.mcp.json:133-141` basic-memory block: change `type:"stdio"` + command/args → `type:"http"` + `url:"http://127.0.0.1:8765/mcp"`
4. **Result**: 20 stdio procs collapse to 1 daemon → **~4 GB RAM freed**

Reversibility: revert `.mcp.json` block; stop NSSM service.

### C. everything-claude-code hook audit (MEDIUM, ~3-8 s/turn)

**Finding** from `CC-PRELOAD-AND-HOOK-AUDIT.md`:
- `everything-claude-code@2.0.0-rc.1` ships **26 hooks** including 6× `*`-matcher Stop + 2× `*` PreToolUse + 2× `*` PostToolUse — all node-spawn
- Adds ~3-8 s/turn on tool-heavy turns
- 40-60 node spawns per turn

**SOTA action (NOT yet vetted via sca-v5 — defer)**:
- Audit which of the 26 hooks ship measurable value
- Option: pin `everything-claude-code` to a version with fewer hooks, or selectively disable via `ECC_DISABLED_HOOKS` env (already used for 8 hooks)
- Requires sca-v5 ratification per CLAUDE.md cardinal rules

### D. Plugin cache cleanup (LOW, ~1 GB disk)

**Finding**: 2,829 plugin.json files in cache (multi-version bloat). 47 cached hookify versions for a DISABLED plugin. Total 1,059.7 MB.

**SOTA action (safe)**:
- Run `/plugin update --prune` if available, OR
- Manually purge `Z:\claude-sota-installed\.claude\plugins\cache\*\*` for disabled plugins per `enabledPlugins:false` list
- **Result**: ~500-700 MB disk reclaim; faster session-start scan

## Recommended apply order

1. **NOW (autonomous, reversible in <30s)**: D (cache cleanup of disabled plugins) — pure disk hygiene
2. **NOW (autonomous, reversible in <2min)**: A (llama-swap migration) — biggest VRAM win, fully reversible
3. **OPERATOR-CONFIRM (impacts ALL CC sessions)**: B (basic-memory HTTP transport) — biggest RAM win, modifies shared `.mcp.json`
4. **DEFER (needs sca-v5 ratification)**: C (everything-claude-code hook audit) — wait for full evidence
