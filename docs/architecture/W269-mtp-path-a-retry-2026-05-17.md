# W269 — MTP Path-A Retry (Qwen3.6-35B-A3B-MTP) (2026-05-17)

> Follow-up to `W267-mtp-load-failure-2026-05-17.md`. Investigates the true root cause of the `check_tensor_dims: tensor 'blk.40.attn_qkv.weight' not found` error and supplies a correct, controlled retry plan. ik_llama HEAD pinned at `1f8c603d`.

## §1 — Corrected root cause: stale binary, not `--merge-qkv`

W267 attributed the failure to `--merge-qkv` interacting with the MTP tail. Closer reading of the source falsifies that hypothesis and yields a different (cleaner) fix.

1. **PR #1745 ("qwen35moe : support MTP tail layer", merged 2026-05-07, ancestor of HEAD)** explicitly identifies our exact error text in its PR body: *"Before this change, Qwen3.6 35B-A3B MTP GGUFs fail to load because the Qwen35MoE loader treats the MTP tail as a recurrent layer and looks for tensors such as `blk.40.attn_qkv.weight`."* The fix marks the MTP tail non-recurrent so the loader takes the standard-attention path (`attn_q/attn_k/attn_v`).
2. The fix is verifiable in current source: `src/llama-hparams.cpp:514-524` (`LLM_ARCH_QWEN35MOE` branch) sets `hparams.recurrent_layer_arr[i] = false` for any `i >= n_main_layers` (i.e. the MTP tail), then `src/llama-load-tensors.cpp:1563-1568` (`create_qwen35moe_tensors`) routes that layer into the standard `LLM_TENSOR_ATTN_Q/K/V` create path (NOT the recurrent `LLM_TENSOR_ATTN_QKV` path at `:1576`).
3. `--merge-qkv` is in fact a **no-op for `LLM_ARCH_QWEN35MOE`**: `create_qwen35moe_tensors` (`src/llama-load-tensors.cpp:1512-1619`) never calls the `merge_qkv()` helper (`src/llama-load-tensors.cpp:3601`). The only architectures that consult `ml.merge_qkv` are the ones whose loaders explicitly invoke `merge_qkv(tn, i, ...)` (e.g. `qwen3_moe_tensors` at `:2727`, `glm4_moe_tensors` at `:3395`, `qwen35_tensors` at `:1677` — see grep over `src/llama-load-tensors.cpp` for `use_mmap_buffer &= !merge_qkv`).
4. The compiled binary in production is stale. `Z:\repos\deps\ik_llama.cpp\build-new\bin\Release\llama-server.exe` has `Modify: 2026-04-23 10:41:44` — **two weeks before PR #1745 merged**. The source tree was pulled to `1f8c603d` later, but the binary was never rebuilt. NSSM's `Application` path (verified via `nssm get IkLlamaServer Application`) resolves to that stale binary.

**True diagnosis**: the running binary predates PR #1745, so its `qwen35moe` loader still treats block 40 as recurrent and asks for `blk.40.attn_qkv.weight`, which Unsloth's MTP GGUF doesn't provide (it ships separate `attn_q/attn_k/attn_v`, confirmed via `gguf_dump.py` — tensors 738/734/740 at block 40). The first commit author got the symptom right; the mechanism (`--merge-qkv`) was a red herring.

## §2 — GGUF tensor evidence (block 39 vs block 40)

`gguf_dump.py "Z:/models/Qwen3.6-35B-A3B-MTP/Qwen3.6-35B-A3B-UD-IQ4_XS.gguf"` shows blocks 39 and 40 carry **identical attention layouts** — both ship unmerged `attn_q.weight`, `attn_k.weight`, `attn_v.weight`, `attn_output.weight`, plus q/k norms. Block 40 additionally has the 4 `nextn.{eh_proj,enorm,hnorm,shared_head_norm}.weight` tensors (PR #1745 wires these into `create_qwen35moe_tensors:1598-1614`). Neither block has any `attn_qkv.weight` — so the requested tensor literally does not exist in the file, confirming the loader was looking for the wrong name.

Metadata also confirms: `general.architecture = qwen35moe`, `qwen35moe.block_count = 41`, `qwen35moe.nextn_predict_layers = 1`, `qwen35moe.full_attention_interval = 4` (relevant for `is_recurrent` initialization at `llama-hparams.cpp:519`).

## §3 — The fix: rebuild, then re-attempt with `-mtp`

Rebuild from HEAD `1f8c603d` and the loader will take the post-#1745 path automatically. `--merge-qkv` neither helps nor hurts on `qwen35moe`; the operator may keep it in place for parity with the pre-W267 baseline.

## §4 — Three-step controlled retry

### Step 1 — rebuild the binary (cite `1f8c603d`)

```powershell
$env:CMAKE_BUILD_PARALLEL_LEVEL = 12
cmake --build Z:\repos\deps\ik_llama.cpp\build-new --config Release --target llama-server 2>&1 | Tee-Object Z:\claude-sota-installed\tmp\W269-rebuild.log
# verify the binary mtime moves past 2026-05-07 (the PR #1745 merge date):
Get-Item Z:\repos\deps\ik_llama.cpp\build-new\bin\Release\llama-server.exe | Select Name,LastWriteTime
```

Expected outcome: build succeeds (HEAD is clean per `git status` at `1f8c603d`); binary `LastWriteTime > 2026-05-07`. If the build fails, fall back to §6 rollback.

### Step 2 — load-only validation (one-shot, no NSSM)

Per W267 lesson §6: validate the GGUF loads before committing to a service restart.

```powershell
& Z:\repos\deps\ik_llama.cpp\build-new\bin\Release\llama-server.exe `
  --model Z:\models\Qwen3.6-35B-A3B-MTP\Qwen3.6-35B-A3B-UD-IQ4_XS.gguf `
  --mmproj Z:\models\Qwen3.6-35B-A3B-MTP\mmproj-F16.gguf `
  --port 8090 --host 127.0.0.1 -c 8192 -ngl 999 -fa on `
  -ctk q8_0 -ctv q8_0 -b 2048 -ub 1024 --merge-qkv -muge --mlock `
  --threads 4 --threads-batch 4 --no-context-shift
```

Pass criteria: server logs `llama_model_load_from_file: ... done` (NO `check_tensor_dims` error). The expected MTP-load-side log line per PR #1745: `XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX Using output_extra.weight as MTP output` is **only** printed when `-mtp` is set AND the GGUF carries an `output_extra.weight` tensor (PR #1810 feature); absence is benign for our IQ4_XS GGUF (it doesn't have `output_extra`). Stop the test server with Ctrl-C once `:8090` accepts a `GET /health`.

### Step 3 — enable MTP and bench

If Step 2 passes, edit NSSM AppParameters:

1. Change `--model` to the MTP GGUF path (`Z:\models\Qwen3.6-35B-A3B-MTP\Qwen3.6-35B-A3B-UD-IQ4_XS.gguf`) and `--mmproj` to the matching MTP mmproj.
2. **Remove** `--spec-type ngram-mod --spec-ngram-size-n 24 --draft-min 48 --draft-max 64` (ngram-mod stage conflicts with MTP — `common/common.cpp:1955` throws `-mtp/--multi-token-prediction cannot be combined with --spec-stage`).
3. **Add** `-mtp --draft-max 1 --draft-p-min 0.0` (matches PR #1745 validation invocation).
4. Keep `--merge-qkv` (no-op on this arch; consistent with baseline).

```powershell
$new = '--alias qwen36 --jinja --reasoning-budget 0 ' +
       '--model Z:\models\Qwen3.6-35B-A3B-MTP\Qwen3.6-35B-A3B-UD-IQ4_XS.gguf ' +
       '--mmproj Z:\models\Qwen3.6-35B-A3B-MTP\mmproj-F16.gguf ' +
       '--port 8080 --host 127.0.0.1 -c 65536 -ngl 999 -fa on ' +
       '-ctk q4_0 -ctv q4_0 --k-cache-hadamard --v-cache-hadamard ' +
       '-b 2048 -ub 1024 --merge-qkv -muge -sas --mlock ' +
       '--ctx-checkpoints 8 --ctx-checkpoints-interval 512 --cache-ram 4096 ' +
       '--parallel 4 --threads 4 --threads-batch 4 --no-context-shift ' +
       '--fit --fit-margin 1024 ' +
       '-mtp --draft-max 1 --draft-p-min 0.0'
nssm set IkLlamaServer AppParameters $new
nssm restart IkLlamaServer
```

Verify in `Z:\claude-hub\logs\ik-llama-stderr.log`: look for `common_speculative_state_mtp: created MTP context` (PR #1745 validation banner) and absence of `check_tensor_dims`. Then sweep-bench:

```powershell
& Z:\repos\deps\ik_llama.cpp\build-new\bin\Release\llama-sweep-bench.exe `
  --model Z:\models\Qwen3.6-35B-A3B-MTP\Qwen3.6-35B-A3B-UD-IQ4_XS.gguf `
  -ngl 999 -fa on -p 1024 -n 256 -mtp --draft-max 1 --draft-p-min 0.0
```

## §5 — Throughput expectation (RTX 4090 + UD-IQ4_XS A3B)

PR #1745 (RTX 4070, Q5_K_M): TG 44.8 t/s baseline → 43.9–47.2 t/s with `-mtp --draft-max 1 --draft-p-min 0.0`; **+0 to +5% TG, ~94% draft acceptance**. PR #1810 (RTX 3090 / split-mode `graph`, IQ4_KS): 65 t/s → 132 t/s; **2.0×** — but that uses `--draft-max 4` AND `-mtprot iq4_ks` (PR #1809's on-the-fly re-quantized output tensor).

Expected on RTX 4090 + UD-IQ4_XS, `--draft-max 1` only (matching PR #1745 conservative config): TG +5–15%, PP roughly flat-to-slightly-down (PR #1745: 153 → 134-141 t/s, -8%). A follow-up wave can experiment with `-mtprot iq4_ks --draft-max 4` for the higher 2× gain demonstrated by PR #1810 (`common/common.cpp` parses `--mtp-requantize-output-tensor` / `-mtprot`; default = unset).

## §6 — Rollback (binary identical to W267 baseline)

If Step 2 fails:

```powershell
$old = Get-Content -Raw Z:\claude-sota-installed\tmp\nssm-IkLlamaServer-AppParameters.pre-W267.bak
nssm set IkLlamaServer AppParameters $old
# the rebuilt binary at the same path is forward-compatible with pre-W267 flags;
# it does NOT need to be reverted to the 2026-04-23 binary.
nssm restart IkLlamaServer
```

If Step 3 fails after Step 2 passed (binary loads MTP GGUF but server misbehaves under load), revert just the AppParameters string and keep the rebuilt binary — the rebuild is an unambiguous improvement (latest fixes, no behavioral change for non-MTP loads).

## §7 — Open items / followups

- File one-line PR-comment heads-up on PR #1745 noting "binary timestamp predates merge" trap (operational tip, not a code fix).
- Wave to enable `-mtprot iq4_ks --draft-max 4` for the 2× TG gain after Step 3 stabilizes.
- Consider switching to MTP-aware GGUF for the *non-MTP* path too once Step 3 succeeds (same file, ignore `-mtp` flag → same throughput as today, plus the option to flip MTP on per-session).
