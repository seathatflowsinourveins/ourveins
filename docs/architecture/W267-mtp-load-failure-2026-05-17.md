# W267 — MTP-GGUF Load Failure + Rollback (2026-05-17)

> Honest failure log for the W267 attempt to enable MTP via Unsloth's `unsloth/Qwen3.6-35B-A3B-MTP-GGUF` re-upload. Rolled back to pre-W267 AppParameters; service back to healthy on the prior GGUF. The Hadamard KV switch + `--fit` flags went down with the rollback (had to revert ALL together) — to be reapplied separately.

## §1 — What happened

| Step | Action | Result |
|---|---|---|
| 1 | Downloaded `unsloth/Qwen3.6-35B-A3B-MTP-GGUF` (17 GB Q4 UD-IQ4_XS + 3 mmproj variants) | ✅ files on disk at `Z:/models/Qwen3.6-35B-A3B-MTP/` |
| 2 | Verified MTP tail: `gguf_dump | grep nextn` returned 5 hits including `blk.40.nextn.eh_proj.weight` and `qwen35moe.nextn_predict_layers = 1` | ✅ tail tensors present |
| 3 | Backed up live AppParameters → `tmp/nssm-IkLlamaServer-AppParameters.pre-W267.bak` | ✅ rollback path established |
| 4 | Set new AppParameters: new GGUF path + KV q4/q4 + `--k-cache-hadamard` + `--v-cache-hadamard` + `--fit --fit-margin 1024` + `-mtp --draft-max 1 --draft-p-min 0.0` + dropped `-cuda fa-offset=0` | ✅ applied via `nssm set` |
| 5 | `nssm restart IkLlamaServer` | ⚠️ STOP ok; START hit transient PAUSED state (SCM recovered to RUNNING within seconds) |
| 6 | Model load attempted | ❌ **FAILED** at block 40 (the MTP tail layer) |

## §2 — Root cause

`Z:\claude-hub\logs\ik-llama-stderr.log` (rolled at restart):

```
llama_model_load: error loading model:
  check_tensor_dims: tensor 'blk.40.attn_qkv.weight' not found
llama_model_load_from_file: failed to load model
llama_init_from_gpt_params: error: failed to load model
  'Z:\models\Qwen3.6-35B-A3B-MTP\Qwen3.6-35B-A3B-UD-IQ4_XS.gguf'
```

**Diagnosis**: The Unsloth MTP-aware GGUF ships **unmerged QKV** at the MTP tail-block (block 40), while ik_llama's `--merge-qkv` flag pre-fuses `blk.N.{attn_q,attn_k,attn_v}.weight` into `blk.N.attn_qkv.weight` at model-load time. For blocks 0-39 the merge may succeed (or the GGUF has them merged), but block 40 — the MTP tail layer — has a different layout that the `--merge-qkv` path does not handle correctly.

**Not a problem with**:
- MTP infrastructure itself (PR #1810/#1809/#1745 are merged in `1f8c603d`)
- The MTP tail tensors (5 verified present)
- `-mtp --draft-max 1 --draft-p-min 0.0` flag parsing (the error came at tensor load, before any inference flag was exercised)

**IS a problem with**:
- `--merge-qkv` interaction with MTP-tail-bearing GGUFs that ship unmerged QKV

## §3 — Rollback executed

```powershell
$old = Get-Content -Raw 'tmp/nssm-IkLlamaServer-AppParameters.pre-W267.bak'
nssm set IkLlamaServer AppParameters $old
nssm restart IkLlamaServer
```

Service back to RUNNING with the **original (non-MTP, non-Hadamard, non-fit, q8_0/q8_0 KV)** flags. Note: this rollback also reverts the Hadamard KV switch and `--fit` flag that were independently SAFE — they got bundled with the MTP attempt because one AppParameters string holds everything.

## §4 — Three forward paths

### Path A — re-attempt MTP, drop `--merge-qkv`

Edit AppParameters:
- KEEP all the new flags (KV q4/q4 + Hadamard + --fit + -mtp + --draft-max 1 + --draft-p-min 0.0)
- DROP `--merge-qkv` (block 40 incompatibility)

Risk: throughput on blocks 0-39 may decrease ~5-10% without the merge optimization. Test in a non-prod window.

### Path B — keep old GGUF, add ngram-mod self-spec (no MTP, safe)

Edit AppParameters with just W263 safe items:
- KV q8_0/q8_0 → q4_0/q4_0 + `--k-cache-hadamard --v-cache-hadamard` (safe — verified in W265 test before this MTP attempt clobbered it)
- ADD `--fit --fit-margin 1024`
- DROP `-cuda fa-offset=0`
- ADD `--spec-type ngram-mod --spec-ngram-size-n 24 --draft-min 48 --draft-max 64`
- KEEP `--merge-qkv` (no MTP layer to break it)

This is the W265 "safe wave" without the MTP wave-2. Gives ~2 GiB VRAM back + ngram-mod self-spec without touching the QKV merge path.

### Path C — file an Unsloth issue + wait

Report the `blk.40.attn_qkv.weight` mismatch to Unsloth — they may need to re-quant with merged QKV at the MTP tail or document `--no-merge-qkv` as a requirement. Defer MTP locally until that lands.

## §5 — Recommended next step

**Path B first** (safe W263 partial-rollout — KV+Hadamard+fit+ngram-mod without MTP). This:
- Frees ~2 GiB VRAM (KV halving)
- Enables ~96K ctx within budget
- Adds self-spec (ngram-mod is MoE-safe per W263 research)
- ZERO risk of QKV-merge incompatibility (no MTP tail in the original GGUF)

Then **Path A** as a controlled experiment in a quiet window — drop `--merge-qkv`, retest MTP load + measure throughput delta on jobs 0-39.

**Path C** in the background — open issue at `github.com/unslothai/unsloth` referencing the failure log.

## §6 — Lessons (for future MTP migration)

- **Test model load BEFORE committing to a service-managed restart** — should have done a one-shot manual `llama-server.exe <flags>` first to validate the GGUF loads, then committed to NSSM.
- **Separate flag waves** — bundling MTP-experiment with safe W263 rollouts in one AppParameters string forced an all-or-nothing rollback.
- **Keep the rollback backup file** — `tmp/nssm-IkLlamaServer-AppParameters.pre-W267.bak` saved us. Operational discipline win.

## §7 — Status

- `:8080` LIVE again with pre-W267 flags (q8_0/q8_0 KV, no MTP, no Hadamard, no --fit)
- VRAM observability alerts (W267 separate wiring) STILL LIVE
- Langfuse wiring STILL APPLIED on graphiti/cognee/hindsight envs
- 5-tier memory STILL LIVE
- 25 new SOTA repos STILL CLONED + 21 packed

Net effect of W267 wave: most landed cleanly except the MTP experiment, which rolled back cleanly. **No data loss, no service-state degradation.** The rollback file enables a Path-A retry whenever.
