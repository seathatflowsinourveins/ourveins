# W269 — Option C: Spec-Decode Unlock via Vision Separation (2026-05-17)

> Cite: `ik_llama.cpp/examples/server/server-context.cpp:462-468 @ HEAD` — multimodal path forcibly resets `params_base.speculative.type = COMMON_SPECULATIVE_TYPE_NONE` and clears stages unless the stage is `COMMON_SPECULATIVE_TYPE_MTP`. `ngram-mod` is **not** MTP → silently disabled. W267 Path B applied the KV q4/Hadamard/fit + ngram-mod flags but log line `SRV_WRN "speculative decoding is not supported by multimodal, it will be disabled"` fires because `--mmproj` is still bound on `IkLlamaServer:8080`.

## Decision

Adopt **Option C — separate concerns**: `:8080` becomes text-only 35B with `ngram-mod` self-spec live; vision migrates to llama-swap target `qwen3-vl-8b` on `:8090`. The 35B+VL co-resident path is dead (22.4 GiB > budget); llama-swap eviction is acceptable because no CC-side caller consumes vision (W264 §4 confirms `mmproj` is loaded but unused).

## Current state (probed 2026-05-17)

- `:8080/v1/models` → `qwen36` (35B-A3B UD-IQ4_XS), served by NSSM `IkLlamaServer`. AppParameters carries `--mmproj …mmproj-F16.gguf` AND the four spec-decode flags — the mmproj wins, spec-decode is dead.
- `:8090/v1/models` → `gemma4-26b`, `gemma4-31b`, `qwen36-moe`. **`qwen3-vl-8b` is in `config.yaml` but NOT in the live model list** — llama-swap was not reloaded after the W267 config edit. Reload required before Option C is testable.
- 35B is double-mounted (NSSM `:8080` + llama-swap `qwen36-moe`). Out of scope for W269; keep `:8080` as the CC fast-path consumer endpoint.

## Change set

### 1. Reload llama-swap (precondition)

```powershell
nssm restart LlamaSwap   # or whichever service wraps llama-swap
# verify: curl -s http://127.0.0.1:8090/v1/models | jq '.data[].id'
# expect: gemma4-26b, gemma4-31b, qwen36-moe, qwen3-embed-0.6b, qwen3-vl-8b, qwen3-reranker-0.6b
```

### 2. IkLlamaServer NSSM AppParameters — exact new value

Drop `--mmproj …`. Everything else preserved verbatim from the current value (probed via `nssm get IkLlamaServer AppParameters`).

```text
--alias qwen36 --jinja --reasoning-budget 0 --model Z:\models\Qwen3.6-35B-A3B\Qwen3.6-35B-A3B-UD-IQ4_XS.gguf --port 8080 --host 127.0.0.1 -c 65536 -ngl 999 -fa on -ctk q4_0 -ctv q4_0 --k-cache-hadamard --v-cache-hadamard -b 2048 -ub 1024 --merge-qkv -muge -sas --mlock --ctx-checkpoints 8 --ctx-checkpoints-interval 512 --cache-ram 4096 --parallel 4 --threads 4 --threads-batch 4 --no-context-shift --fit --fit-margin 1024 --spec-type ngram-mod --spec-ngram-size-n 24 --draft-min 48 --draft-max 64
```

Apply:

```powershell
nssm stop    IkLlamaServer
nssm set     IkLlamaServer AppParameters '--alias qwen36 --jinja --reasoning-budget 0 --model Z:\models\Qwen3.6-35B-A3B\Qwen3.6-35B-A3B-UD-IQ4_XS.gguf --port 8080 --host 127.0.0.1 -c 65536 -ngl 999 -fa on -ctk q4_0 -ctv q4_0 --k-cache-hadamard --v-cache-hadamard -b 2048 -ub 1024 --merge-qkv -muge -sas --mlock --ctx-checkpoints 8 --ctx-checkpoints-interval 512 --cache-ram 4096 --parallel 4 --threads 4 --threads-batch 4 --no-context-shift --fit --fit-margin 1024 --spec-type ngram-mod --spec-ngram-size-n 24 --draft-min 48 --draft-max 64'
nssm start   IkLlamaServer
```

## Verification gates (must pass before declaring done)

| Gate | Command | Pass criterion |
|---|---|---|
| G1: spec-decode active | `nssm stop IkLlamaServer; Start-Sleep 2; Get-Content (nssm get IkLlamaServer AppStdoutLog) -Tail 200 | sls "speculative"` after restart | Sees `loading draft / ngram-mod stage` lines; **does NOT** see `not supported by multimodal` |
| G2: server healthy | `curl -s http://127.0.0.1:8080/health` | `{"status":"ok"}` (or `slots_idle>=1`) |
| G3: vl reachable | `curl -s http://127.0.0.1:8090/v1/models | jq -r '.data[].id' | sls qwen3-vl-8b` | one match |
| G4: ngram-mod fires under load | After 3 long-context completions, `curl -s :8080/slots | jq '.[0].draft_attempts'` | `> 0` (W263 §5 expectation; if 0 over 100 tokens, `--spec-ngram-size-n` is too aggressive) |

## Test plan — three sample prompts

| # | Endpoint | Payload | Expected |
|---|---|---|---|
| T1 | `POST :8080/v1/chat/completions` model=`qwen36` | `"messages":[{"role":"user","content":"Write a 200-token Python quicksort with comments"}], "max_tokens":300` | 200+ tokens, slot stats show `draft_attempts>0` & non-zero `draft_accepted` |
| T2 | `POST :8090/v1/chat/completions` model=`qwen3-vl-8b` | OpenAI-vision schema with base64 image + `"What is in this image?"` | Coherent caption; cold-load latency expected ≤45 s (model is 4.7 GB + 718 MB mmproj over PCIe) |
| T3 | `POST :8080/...` model=`qwen36` immediately after T2 | Plain text prompt | Response within ≤30 s (llama-swap evicted VL, 35B re-loads from disk-cache; subsequent calls are warm) |

T1 isolates spec-decode; T2 isolates vision; T3 measures the swap-cost — the central Option-C tradeoff.

## VRAM math (16 GB target GPU class assumed; W264 inventory)

- Text 35B-A3B UD-IQ4_XS + q4/q4 KV @ 64K + 4096 cache-ram + Hadamard: **~17.0 GiB** (W263 §5 measurement after Path B).
- `ngram-mod` self-spec: **+0 GiB** (no second model — draft tokens come from the model's own n-gram cache).
- Vision Qwen3-VL-8B Q4_K_M + mmproj Q8_0 @ 32K + q4/q4 + 2048 cache-ram: **~5.4 GiB**.
- Co-resident: 22.4 GiB → over budget on every consumer GPU in inventory. llama-swap MUST evict the 35B when VL is invoked. Eviction is automatic via llama-swap `globalTTL: 300` + per-target `ttl: 600` on VL.

## Operator UX (paste-ready handoff)

- **Text (default)**: `POST http://127.0.0.1:8080/v1/chat/completions` with `model: "qwen36"`. Spec-decode is now active — expect 1.2-1.4× decode speedup on long generations (W263 §5 projection from PRs 1261/1646).
- **Vision (on-demand)**: `POST http://127.0.0.1:8090/v1/chat/completions` with `model: "qwen3-vl-8b"` and an OpenAI-shape image content block. **First call evicts the 35B and cold-loads VL — budget 30-60 s.** Next plain-text call to `:8080` re-loads the 35B at similar cost. Avoid interleaving in latency-sensitive flows.

## Risk analysis

| Risk | Severity | Mitigation |
|---|---|---|
| CC-side caller silently relies on `:8080` mmproj | **None observed** — W264-inference-gpu §4 audit found zero vision call-sites; mmproj was loaded-but-unused | Grep `Z:\claude-sota-installed\.claude\**` for `image_url` / `mmproj` before flip; rollback = re-add `--mmproj …mmproj-F16.gguf` to AppParameters (≤2 min) |
| llama-swap doesn't actually evict under VRAM pressure | Medium — llama-swap uses TTL not VRAM-based eviction | T3 of test plan measures it; if eviction fails, add `groups:` config to declare 35B and VL mutually-exclusive (llama-swap `swap.example.yaml` §`groups`) |
| Spec-decode hurts more than helps on short prompts | Low | `--spec-ngram-size-n 24` is W263-tuned; revert to llama.cpp default 5 if `draft_accepted/draft_attempts < 0.4` over 1k tokens |
| `ngram-mod` MoE-safety regression | Low — PR 1261 explicitly skips expert forward (W263 §5 cite) | Watch perplexity bench delta; W267 baseline already +0.37%/+0.15% from KV change is the floor |

## Rollback

`nssm stop IkLlamaServer; nssm set IkLlamaServer AppParameters <pre-W269 value>; nssm start IkLlamaServer`. Pre-W269 value preserved in `Z:\claude-sota-installed-state\.codex\backups\IkLlamaServer-AppParameters-pre-W269.txt` — capture before applying step 2.
