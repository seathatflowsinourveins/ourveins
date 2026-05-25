# W263 Grand Plan & Tracker (2026-05-17)

> Single source of truth for the full SOTA-optimization arc that crosses W262 + W263 audits. Tracks status per task, decision points the operator owns, and what's left to ship.
>
> **Status legend:** ✅ DONE this turn · 🟡 IN PROGRESS · 🔴 NEEDS OPERATOR · 🔵 STRATEGIC (defer)

---

## §0 — The grand plan in one paragraph

The runtime is **SHIP-grade**. The W262 sweep converged on the configuration shape; the W263 sweep refined the per-job model+optimization stack with TIER-1 evidence. Of 13 tracked tasks, **6 are complete this turn (autonomous)**, **7 are blocked on operator decisions** — none are blocked on missing information. The hardware (RTX 4090 24 GiB) is the binding constraint; all autonomous changes either fit within the budget or improve VRAM headroom (KV q4/q4 + Hadamard frees ~2 GiB). The next operator-controlled actions in priority order: restart live `:8080` with new KV/spec flags (interrupts active hindsight backlog ~12 facts/min — pick a pause), then queue the model upgrades for Jobs 5+7 (one-time decisions).

---

## §1 — Task ledger (Tasks #356–368)

### Autonomous — ✅ DONE this turn

| ID | Task | Result |
|---|---|---|
| 356 | Apply KV-cache upgrade to llama-swap (q4/q4 + Hadamard) | ✅ Edited `Z:\tools\llama-swap\config.yaml` qwen36-moe block: `-ctk q4_0 -ctv q4_0 --k-cache-hadamard --v-cache-hadamard`; also dropped `-cuda fa-offset=0`; added `--fit --fit-margin 1024`. Frees ~2 GiB, enables ~96K ctx. |
| 357 | Add ngram-mod self-spec to llama-swap qwen36-moe | ✅ Appended `--spec-type ngram-mod --spec-ngram-size-n 24 --draft-min 48 --draft-max 64`. Reverses W261's incorrect "drop ngram-mod" advice (MoESD paper targets draft-model spec, not self-spec). |
| 358 | Verify GGUF MTP tail tensor state | ✅ `gguf_dump.py` on Qwen3.6-35B-A3B-UD-IQ4_XS.gguf — `0` hits for `nextn`. Confirmed: MTP unavailable until re-quant. Matches W263 agent 2's prediction. |
| 359 | Download Qwen3-Embedding-0.6B + Qwen3-Reranker-0.6B GGUFs | ✅ Embed Q8_0 (610 MB; Q4_K_M not in official repo so Q8_0 used — quality essentially F16 at the 0.6B scale). Reranker q4_k_m (377 MB). Landed in `Z:\models\qwen3-embed-0.6b\` and `Z:\models\qwen3-reranker-0.6b\`. |
| 360 | Add :8083 reranker target in llama-swap config | ✅ New `qwen3-reranker-0.6b` block with `--pooling rank`; also added `qwen3-embed-0.6b` block. Both behind llama-swap port routing. |
| 361 | Update MEMORY-ULTIMATE-ARCHITECTURE T3 row | ✅ `W259-grand-catalog/03-deepdive/MEMORY-ULTIMATE-ARCHITECTURE-W259v16.md` §1 verdict + T3 row marked REMOVED. Stack is now correctly stated as 4-tier (T0/T1/T2/T4). T1 hindsight row also corrected to LIVE (was "INSTALLED-restart-pending"). |

### Blocked on operator — 🔴 NEEDS DECISION

| ID | Task | What I need from you |
|---|---|---|
| 362 | Restart live `:8080` to apply KV changes | **TIMING decision.** Live :8080 (direct-launched, not via llama-swap) still runs old flags. Restart interrupts hindsight's active backlog (~12 facts/min). Pre-flight: hindsight is at 265 retain_extract_facts, processing steadily, durable in pg0 so interrupt-safe. **Say "restart :8080" and I'll do it.** Alternative: switch to llama-swap-managed path (kill direct :8080, llama-swap will auto-start qwen36-moe from updated config). |
| 363 | Pick Job 5 graphiti extract upgrade | **MODEL choice — pick one:**<br>(a) **Qwen3.5-4B-Instruct** — Q4_K_M ~2.5 GiB, 97.5% tool-call (leads pack); ⚡ 2× faster than 8B<br>(b) **Qwen3.6-27B dense** — Q4 ~16 GiB; SUPERIOR benchmarks but slower<br>(c) **Gemma 4 9B Apache-2.0** — Q4 ~5.5 GiB; SUPERIOR per W263 agent 3 |
| 364 | Pick Job 7 vision-add candidate | **MODEL choice — pick one (NOT co-resident with 35B, llama-swap target):**<br>(a) **Qwen3-VL-8B-Instruct GGUF + mmproj-F16** — ~5 GiB Q4_K_M; same family as 35B (lower friction)<br>(b) **Gemma 4 27B Apache-2.0** — ~17 GiB Q4_K_M; W263 agent 3 verdict: SUPERIOR for vision |
| 365 | Install plugins: tdd-workflows + gitnexus + pydantic-ai | **QUIET window confirmation** — these touch `.claude/settings.json` (contended with W259-v16 arc commits). When ready, run:<br>`/plugin install tdd-workflows@claude-code-workflows`<br>`/plugin marketplace add abhigyanpatwari/GitNexus && /plugin install gitnexus@gitnexus`<br>`/plugin marketplace add pydantic/skills && /plugin install ai@pydantic-skills` |
| 366 | Re-quantize GGUF for MTP support | **PATH choice:**<br>(a) Re-quant from base — needs original FP16/safetensors, ~2-3 hrs, ~20 GiB intermediate disk<br>(b) Wait for Unsloth MTP-aware re-upload (passive)<br>(c) Defer indefinitely — ngram-mod is already providing self-spec |
| 367 | Drop Langfuse docker stack | **CONFIRMATION** — Langfuse has had 0 traces in the last hour (W262-observability-audit); 6 containers idle. Phoenix already covers all live telemetry. Run `docker compose down -v` on its compose file. Operator confirms no future need. |
| 368 | ff-merge `parallel-sessions-arch` to `main` | **QUIET window confirmation** — 8 unmerged commits including `37394f8 feat(parallel-sessions): wire worktree.baseRef + teammateMode + memory busy_timeout`. Procedure: `cd Z:\claude-sota-installed-parallel-arch && git rebase main && cd Z:\claude-sota-installed && git merge --ff-only parallel-sessions-arch`. |

---

## §2 — Strategic / 🔵 deferred

| Item | Trigger to re-test |
|---|---|
| Fine-tuning evaluation | 2026-08-01 OR Job-5 swap + 200 labelled triples |
| Qwen3.7 / Llama-4 / DeepSeek-R2 / Phi-5 swap | HF release notification |
| ASR add (Parakeet-TDT-1.1B or Canary-Qwen-2.5B) | First voice workload |
| ccmanager TUI promotion | ≥3 concurrent sessions render stably under `npx ccmanager` |
| ik_llama.cpp PR tracking | PRs #1810/#1809/#1745, #1547/#1556, #1501/#1504, #1646/#1261, #1527 + MXFP4_MOE landing |

---

## §2.1 — W269 wave (2026-05-17, in flight)

> Wave-orchestrator: `docs/architecture/W269-wave-orchestrator-2026-05-17.md`. 4 specialist agents running in parallel + persistent GPU/NSSM monitor. Convergence verdict slot in orchestrator §7.

| ID | Sub-wave | Owner agent | Output file | Status |
|---|---|---|---|---|
| W269.1 | All-dimension system monitor | wshobson-devops-troubleshooter | `W269-system-monitor-2026-05-17.md` | ⚠️ Agent exited mid-task at D4; orchestrator wrote doc using agent's D4 finding + probes |
| W269.2 | Local-model SOTA + MTP/spec-decode evidence | sota-researcher | `W269-ik-llama-pr-sweep-2026-05-17.md` + `W269-mtp-path-a-retry-2026-05-17.md` | ✅ DONE (split into 2 docs) |
| W269.3 | Gap audit (W267 MTP · cognee :8000 · hindsight · Phoenix · eval-harness · codex T6 · pre-commit · context-mode) | general-purpose | `W269-gap-audit-2026-05-17.md` | ✅ DONE |
| W269.4 | GPT5.5 codex cross-model convergence | codex:codex-rescue | `W269-codex-convergence-2026-05-17.md` | ✅ DONE — verdict **NO-SHIP** |
| W269.0 | Wave-orchestrator + monitor + LlamaSwap fix | Opus 4.7 (this session) | `W269-wave-orchestrator-2026-05-17.md` + `W269-system-monitor-2026-05-17.md` | ✅ DONE — §7 verdict synthesized |

**W269 outcomes** (3 critical root-causes identified, 1 fix landed):

1. **LANDED**: LlamaSwap `vision` alias collision in `Z:\tools\llama-swap\config.yaml:59` (gemma4-26b vs qwen3-vl-8b) — fixed; 6 models now live on `:8090` (was 3 — `qwen3-vl-8b`, `qwen3-embed-0.6b`, `qwen3-reranker-0.6b` were dark). Unblocks W269-option-c precondition.
2. **LANDED**: cognee `:8000` socket-dead — `ModuleNotFoundError: No module named 'langfuse.decorators'`. Surgical 3-line patch applied to `Z:\venvs\claude\Lib\site-packages\cognee\modules\observability\get_observe.py:121-126` (try `from langfuse import observe` first per langfuse v3+/v4+ top-level, fall back to `langfuse.decorators` for v2). After nssm restart: `SERVICE_RUNNING`, `GET :8000/health` → 200, MCP transport alive (session ID logged). T3 memory tier now LIVE. Reversible by restoring the original 1-line import.
3. **DOCUMENTED-PLAN-READY**: ik_llama `llama-server.exe` binary stale (mtime 2026-04-23; predates PR #1745 fix for the W267 MTP load failure). Rebuild plan in `W269-mtp-path-a-retry §4` (3-step controlled retry).

**Codex (GPT5.5) verdict for W265-W269 arc**: **NO-SHIP** — see `W269-codex-convergence-2026-05-17.md` §4. The wave SHIPS partial wins but the larger arc needs an operational-durability freeze (W270 plan).

---

## §3 — Live system state

| Metric | Value | Trend |
|---|---|---|
| GPU used | 23.7 GiB / 24 GiB | stable, 86% util avg (sample size 20 over 20 min) |
| Hindsight retain_extract_facts | 265 successful, 0 failed | +122 in 10 min (≈12/min throughput) |
| Hindsight consolidation | 10 successful, 0 failed | gradual |
| Hindsight backlog drain | from 415 → 0 → adding new | indexed 791 facts during operator's SOTA-OPTIMIZATION sweep + ~122 more by me |
| CPU | down from 100% (stuck loop) | well below saturation |
| Disk Z: free | 716 GiB | plenty |

---

## §4 — Files modified this turn

| File | Change |
|---|---|
| `Z:\tools\llama-swap\config.yaml` | qwen36-moe block: KV q4/q4 + Hadamard + drop fa-offset + add `--fit --fit-margin 1024` + add ngram-mod spec-decode. Added two new model blocks: `qwen3-embed-0.6b` and `qwen3-reranker-0.6b`. |
| `Z:\claude-sota-installed\docs\architecture\W259-grand-catalog\03-deepdive\MEMORY-ULTIMATE-ARCHITECTURE-W259v16.md` | §1 verdict + T3 row: cognee REMOVED. T1 hindsight row corrected to LIVE. |
| `Z:\models\qwen3-embed-0.6b\Qwen3-Embedding-0.6B-Q8_0.gguf` | NEW — 610 MB. |
| `Z:\models\qwen3-reranker-0.6b\Qwen3-Reranker-0.6B-q4_k_m.gguf` | NEW — 377 MB. |
| `Z:\claude-sota-installed\docs\architecture\W263-grand-plan-tracker.md` | NEW — this file. |

---

## §5 — Decision flowchart for operator

```
Have ~5 minutes?
├─ Yes → Task 362: say "restart :8080" → I apply new KV/spec flags
│         Frees ~2 GiB VRAM. Hindsight re-binds in seconds.
└─ No  → Defer. The new config is already in llama-swap; the next natural
         restart picks it up.

Want vision capability?
├─ Yes → Task 364: pick (a) Qwen3-VL-8B or (b) Gemma 4 27B
└─ No  → Defer. The current 35B is text-only at :8080.

Want faster graphiti extraction?
├─ Yes → Task 363: pick (a) 4B, (b) 27B, (c) 9B
└─ No  → qwen3:8b still fine.

Quiet window?
├─ Yes → Task 365 (plugins) + 368 (parallel-sessions-arch merge)
└─ No  → defer; W259-v16 arc may be live-editing settings.json.

Langfuse no longer needed?
├─ Yes → Task 367: docker compose down -v (frees ~2 GiB RAM)
└─ No  → keep; near-zero cost.
```

---

## §6 — What I need from you now

Three concrete asks, any order:

1. **Task 362** — say "restart :8080" if/when you want the live server to apply the new KV q4/q4 + Hadamard + ngram-mod flags. Free ~2 GiB; hindsight downtime ~30s. Or say "skip" to defer.
2. **Task 363/364** — pick your model variant for Jobs 5 and 7 (the lists above). Or say "park" to leave both as W259 incumbents.
3. **Task 365/368** — confirm a quiet window for the plugin installs + branch merge, OR say "park" and I'll watch for one autonomously.

For anything else (Tier 3 strategic / 🔵), no input needed — they're on triggers.
