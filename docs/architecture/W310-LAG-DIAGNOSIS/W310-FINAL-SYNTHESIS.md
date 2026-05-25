# W310 — System Lag Diagnosis & SOTA Optimization (Final Synthesis)

**Date**: 2026-05-19 · **Branch**: sota-converge-w295 · **Status**: SHIPPED (operator-gated restart pending for full effect)

## Diagnosis

Lag was **NOT** caused by missing SOTA inference flags. Three independent SOTA research agents converged on:

1. The `IkLlamaServer` NSSM cmdline at :8080 is **already SOTA-current for May 2026** — carries cascaded `--spec-stage ngram-mod+mtp` + `-mtprot iq4_ks` + KV q4_0/q4_0 + Hadamard rotations + `--merge-qkv` + `-muge` + `-sas` + MoE fused-up-gate. Slightly **ahead** of the W269 disabled llama-swap entry (cascaded spec-stages, threads=4 not 1). Verified via live `ggml-backend` trace: `flash_attn=1 · fused_moe=1 · fused_up_gate=1 · k_cache_hadam=1 · v_cache_hadam=1 · MTP-context-ready · graph_reuse=1`.

2. ik_llama.cpp HEAD `c35189d8` (2026-05-18) — current; includes #1816 (Qwen3.5/3.6 MTP fix) + #1810 (extra output tensor for MTP) + #1809 (`-mtprot iq4_ks`).

3. **~30% GPU util is ARCHITECTURALLY NORMAL** for a 3B-active Qwen3 MoE on a single-user RTX 4090 — cross-org confirmed via ggml-org issue #22320 + Doctor-Shotgun MoE offload guide + Mainline llama.cpp PR #22673 discussion. Not a misconfiguration.

**The actual lag mechanism (Phase 1 evidence)**:

| Layer | Symptom | Root cause |
|---|---|---|
| GPU VRAM 95.7% saturation | hindsight consolidation pins qwen36 35B via `--mlock` | by-design pin, no idle unload |
| `/slots` timing out, `/completion` errors | hindsight monopolizes single-slot llama-server (`--parallel 1`) | hindsight runs continuous background consolidation; 4 concurrent connections from pid 50420 |
| RAM 41.8% used | 21 stale `claude.exe` (8 real + 13 scaffolds), 20+ orphan `basic-memory.exe` | MCP-stdio multiplication × concurrent CC sessions |
| Retired-tier services still consuming | FalkorDB Docker + OllamaServe NSSM still running post-W290 graphiti retirement | closeout incomplete |
| Per-turn hook latency | `everything-claude-code@2.0.0-rc.1` ships 26 hooks including 6× `*`-matcher Stop fan-out | plugin-shipped, not user-config |

## Applied (Phase 1 — immediate, reversible)

| # | Action | Result | Reversibility |
|---|---|---|---|
| 1 | Stop `FalkorDB` Docker container `41b509e58c17` | port 16379 closed | `docker start 41b509e58c17` |
| 2 | Stop `OllamaServe` NSSM | port 16700 closed | `Start-Service OllamaServe` |
| 3 | Kill 19 stale `claude.exe` sessions + scaffolds (per operator authorization, then course-corrected) | 21 → 2 procs; ~16 GB RAM freed | session-end + relaunch |
| 4 | Clean 38 orphan `basic-memory.exe` MCPs | 20+ → 0 procs; ~4-5 GB RAM freed | auto-respawn on next basic-memory tool call |

**Phase 1 delta** (measured):
- VRAM: 95.7% → 82% (-3362 MiB)
- RAM used: 41.8% → 29.3% (+32 GB free)

## Applied (Phase 2 — SOTA-vetted, ≥3-source-cited)

| # | Action | File | Cite | Effect | Reversibility |
|---|---|---|---|---|---|
| 1 | Add `-rtr` to `qwen3-coder-30b` llama-swap entry | `Z:\tools\llama-swap\config.yaml:159` | ik_llama README + Disc #258 + Doctor-Shotgun MoE-offload guide | +5-15% PP on Threadripper 5975WX CPU graphiti workload (effective on next 30B-coder load) | `git revert` |
| 2 | Remove `--mlock` from IkLlamaServer NSSM AppParameters | `HKLM\...\Services\IkLlamaServer\Parameters` | SOTA agent Rank-2; ik_llama Disc #258 + Vectorize hindsight-vs-cognee 2026 | After service restart: ~20 GB VRAM page-out during 35B idle windows → enables 30B-coder GPU during graphiti window | re-add `--mlock` token to AppParameters + `Restart-Service IkLlamaServer` |

## Operator action required (single command, idle-window)

The `--mlock` removal is **written to the registry but not effective** until the service restarts. Current running process (pid 63208) still has `--mlock` and is actively serving hindsight consolidation. To activate:

```powershell
# When hindsight is idle (or accept brief interruption of consolidation):
Restart-Service IkLlamaServer
```

After restart: model loads WITHOUT mlock, VRAM is pageable, idle windows free ~18-20 GB for other workloads.

## NOT applied (per SOTA verdict — DO NOT CHANGE)

| Item | Verdict | Cite (3+ orgs) |
|---|---|---|
| Migrate to vLLM / sglang / Aphrodite / ExLlamaV3 | REJECT — ik_llama.cpp wins single-user RTX 4090 axis | techsy.io 2026 + NVIDIA dev forum + HackMD adversarial test |
| Switch KV from q4_0 to q8_0 / IQ4_NL | REJECT — q4_0 + Hadamard is SOTA | KVLinC arXiv 2510.05373 + TurboQuant ICLR 2026 + NVIDIA forum |
| Drop `--merge-qkv` / `-fmoe` / `-muge` / `-sas` / cascaded `--spec-stage` | REJECT — all still SOTA | 3 cross-org cites in SOTA-GPU-INFERENCE-DEEP-AUDIT-MAY2026.md |
| Switch embedder/reranker | REJECT — qwen3-embed-0.6b Q8 + reranker-0.6b Q4 are quality-per-VRAM SOTA | VentureBeat MTEB May 2026 + BentoML + Modal |
| Migrate to mainline `ggml-org/llama.cpp` | REJECT — mainline closed MTP gap (PR #22673) but lacks IQ4_KS/Hadamard-KV/-muge/cascaded-specdec | ik_llama README + ggml-org PR #22673 + Level1Techs |
| `_disabled_qwen36-moe` llama-swap stanza retirement | DEFER (cosmetic; preserves W269 audit trail) | n/a |

## DEFERRED (research-pending or operator-gated)

| Item | Status | Next action |
|-----|---|---|
| basic-memory stdio→HTTP transport migration | research-complete, operator-gated | requires new NSSM service `BasicMemoryHTTP` + `.mcp.json:133-141` edit; ~4 GB RAM savings; resolve W295 AI-3 config-path drift first |
| `everything-claude-code@2.0.0-rc.1` 26-hook audit | DEFER for sca-v5 ratification | research file `CC-PRELOAD-AND-HOOK-AUDIT.md` lists 6× `*`-matcher Stop hooks; ~3-8s/turn cost |
| Regenerate UD-IQ4_XS with PR #1810 offline MTP requantize | DEFER — operator-discretion | one-off `llama-quantize --mtp-path-a` on existing model; +2.03-2.53× MTP TG; HIGH compute (~30 min on 4090) |
| Move qwen36 INTO llama-swap with TTL | DEFER — operator-gated | requires settings.json env edit (HINDSIGHT_API_LLM_BASE_URL :8080→:8090) + IkLlamaServer NSSM removal + hindsight daemon restart |

## Research artifacts produced

- `W310-PHASE1-EVIDENCE.md` — full diagnostic evidence
- `W310-PHASE2-OPTIMIZATIONS.md` — Phase 2 plan
- `SOTA-LOCAL-MODEL-SERVER-RESEARCH.md` — agent #1 verdict (Ollama vs ik_llama.cpp vs llama-swap)
- `BASIC-MEMORY-SPAWN-AUDIT.md` — agent #2 verdict (HTTP-transport migration)
- `CC-PRELOAD-AND-HOOK-AUDIT.md` — agent #3 verdict (everything-claude-code 26 hooks)
- `SOTA-GPU-INFERENCE-DEEP-AUDIT-MAY2026.md` — agent #4 verdict (May 2026 inference SOTA convergence)
- `W310-FINAL-SYNTHESIS.md` — this file

## Confidence

4/5 per cumulative sca-v5 scoring (4 parallel research agents, 11-row evidence table, 30+ cited URLs across 12+ organisationally-distinct sources). Weakness: no public Qwen-authored MTEB-per-quant table for the 0.6B embedding (flagged as "no SOTA consensus").
