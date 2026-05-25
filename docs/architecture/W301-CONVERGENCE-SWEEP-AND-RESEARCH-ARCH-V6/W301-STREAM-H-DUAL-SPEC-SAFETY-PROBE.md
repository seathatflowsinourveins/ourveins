# W301 Stream H — IkLlamaServer dual-spec MTP+ngram-mod safety probe

**Wave**: W301.G Stream H · **Date**: 2026-05-18 · **Owner**: research-only (no NSSM mutation) · **Budget**: $0.30

**Live build**: `Z:\repos\deps\ik_llama.cpp\build-new\bin\Release\llama-server.exe` @ SHA `c35189d8` (MSVC 19.44 x64, May 18 2026 build) [VERIFIED via `--version`].

**Live mlocked GGUF**: `Z:\models\Qwen3.6-35B-A3B-MTP\Qwen3.6-35B-A3B-UD-IQ4_XS.gguf` (~17.0 GiB) [VERIFIED via `ls`].

**Live NSSM AppParameters (`:8080`, single-stage MTP)** [VERIFIED via `nssm get IkLlamaServer AppParameters`]:
```
--alias qwen36 --jinja --reasoning-budget 0 --model Z:\models\Qwen3.6-35B-A3B-MTP\Qwen3.6-35B-A3B-UD-IQ4_XS.gguf
--port 8080 --host 127.0.0.1 -c 65536 -ngl 999 -fa on -ctk q4_0 -ctv q4_0 --k-cache-hadamard --v-cache-hadamard
-b 2048 -ub 1024 --merge-qkv -muge -sas --mlock --ctx-checkpoints 8 --ctx-checkpoints-interval 512
--cache-ram 4096 --parallel 1 --threads 4 --threads-batch 4 --no-context-shift --fit --fit-margin 1024
-mtp --draft-max 4 --draft-p-min 0.0 -mtprot iq4_ks
```

## §1 — `--help` flag-presence probe

Direct `llama-server.exe --help` grep for `spec-stage|spec-type|spec-ngram|mtp|draft` confirms (`tmp/llama-probe-18080.log:339-354`):

```
--spec-stage SPEC[:k=v,...]     explicit speculative stage. repeat once for a supported two-stage chain.
                                examples: --spec-stage ngram-mod:n_max=64,n_min=2 --spec-stage mtp:n_max=1
                                supported two-stage shape in this PR: self-spec first, then mtp or draft fallback
--spec-type Name [none | mtp | ngram-cache | ngram-simple | ngram-map-k | ngram-map-k4v | ngram-mod | suffix]
                                single-stage speculative selection when --spec-stage is not used (default: 0)
--spec-ngram-size-n N           ngram size N for ngram-simple/ngram-map speculative decoding ... (default: 12)
-mtp, --multi-token-prediction  legacy shortcut for enabling MTP when --spec-stage is not used (default: false)
```

**Verdict §1**: `--spec-stage` IS PRESENT in build `c35189d8`. The `-mtp` shortcut is explicitly described as the legacy single-stage equivalent. Two-stage chain syntax is supported with **ORDERING CONSTRAINT** documented inline.

## §2 — PR #1789 cross-reference (GitHub MCP)

PR #1789 "**Allow dual speculative decoding**" by SamuelOliveirads, merged 2026-05-15 (merge SHA `f4f4b3ff265cd4ec7228b08ef1b46c22087742b2`) [VERIFIED via `mcp__github__get_pull_request owner=ikawrakow repo=ik_llama.cpp pull_number=1789`].

**Authoritative recipe from PR body**:
```
--spec-stage ngram-mod:n_max=64,n_min=2,spec-ngram-size-n=16
--spec-stage mtp:n_max=3,draft-p-min=0.0
```

**PR's own benchmark on `Qwen3.6-27B-MTP-Q8_0`** (PR body table):
| Mode      | Task    | Speed (no cache) | Speed (with cache)   |
|-----------|---------|-----------------:|---------------------:|
| MTP only  | code    | —                | 60.1 ± 1.0 t/s       |
| Dual spec | code    | 68.1 t/s         | **108.2 ± 18.0 t/s** |
| Dual spec | extract | 54.1 t/s         | 66.8 ± 6.3 t/s       |

The W269 ledger claim "+35-40% on code prompts per PR #1789 [MEASURED on Qwen3.6-27B-MTP-Q8_0: code 60→108 t/s]" matches the PR's `with cache` benchmark column for `Dual spec / code` (108.2 t/s) vs `MTP only / code` (60.1 t/s) — **+80%** with cache (not 35-40%; W269 understated the gain).

PR constraint: "The argument always expects exactly **one self-spec and one traditional spec** (e.g., MTP/draft), nothing else." PRs #1810 and #1816 (`Quantize: add extra output tensor for MTP` and `Fix Qwen3.5/3.6 MTP and -muge`) are downstream MTP fixes, NOT the dual-spec feature itself.

## §3 — Build version vs PR #1789 merge SHA

- Build SHA: `c35189d8` (commit `c35189d83c91aad780aba62b89f2830cb2916223`, May 18 2026 01:26:45 +1000, "fix(server): reset chat parser on slot reuse to prevent crash (#1763) (#1794)") [VERIFIED via `git log -1 c35189d8`].
- PR #1789 merge SHA: `f4f4b3ff` (May 15 2026) — 3 days before build.
- Local git checkout is a detached-HEAD shallow clone (`git branch -a` shows `(HEAD detached from 16996aea)`) which is why `git merge-base --is-ancestor` failed against fetch-state on `origin/main`. However, the **executable proof is conclusive**: the `--help` text contains the multi-stage spec doc lines (§1) AND the runtime error "two-stage speculative mode currently requires a self-spec stage first" (§4) — both behaviors are unambiguously introduced by PR #1789. Build `c35189d8` therefore POSTDATES the PR merge.

**Verdict §3**: Dual-spec IS supported in the in-tree build. No syntax translation needed.

## §4 — Live GGUF compatibility probe on `:18080`

**Probe v1** (incorrect order, `mtp` first per W269 docs):
- Args: `--spec-stage mtp:n_max=3,draft-p-min=0.0 --spec-stage ngram-mod:n_max=64,n_min=2,spec-ngram-size-n=16`
- Result: **EXIT 1 with explicit error** (`tmp/llama-probe-18080.log.err:1`):
  ```
  error: invalid speculative stage configuration: two-stage speculative mode currently requires a self-spec stage first
  ```

**Probe v2** (corrected per PR #1789 + `--help` doc, `ngram-mod` first):
- Args: `--spec-stage ngram-mod:n_max=64,n_min=2,spec-ngram-size-n=16 --spec-stage mtp:n_max=3,draft-p-min=0.0`
- Result: **PARSE PASSED** — process stayed alive past arg-validation, advanced to tensor offload (`tmp/llama-probe-18080-v2.log.err`):
  ```
  llm_load_tensors: offloading 41 repeating layers to GPU
  llm_load_tensors: offloading non-repeating layers to GPU
  llm_load_tensors: offloaded 42/42 layers to GPU
  llm_load_tensors:  CUDA_Host buffer size =   515.31 MiB
  llm_load_tensors:      CUDA0 buffer size = 16839.70 MiB
  ........................................................................................
  ```
- Probe killed at 180s — `:18080` /health did NOT reach 200 in the wait window because the live `:8080` NSSM already mlocks the same GGUF + holds VRAM allocation (16355 MiB available vs ~17810 MiB required for the probe instance, see stderr "Memory available on all devices - compute: 16355 MiB"). This is a co-tenancy artifact, NOT a recipe defect.

**Verdict §4**: GGUF + recipe load cleanly through tensor offload; no architecture-rejection signal. A clean /v1/chat smoke-test would require either (a) stopping the live NSSM first or (b) running probe on a second GPU. Both are out-of-scope for this research-only stream (NSSM mutation is RESEARCH-FORBIDDEN per file-ownership).

## §5 — Rollback plan + operator-AI runbook

Existing backup retained: `Z:\claude-sota-installed-state\.codex\backups\IkLlamaServer-AppParameters-pre-W269-MTP.txt` (550 B, May 17 2026 14:25, `--spec-type ngram-mod` single-stage from pre-W269 baseline). The current single-stage MTP params are also archived at `IkLlamaServer-AppParameters-W269-MTP.txt`.

**Operator-AI `W301-MED-dual-spec-restore` runbook**:
1. `nssm get IkLlamaServer AppParameters > Z:\claude-sota-installed-state\.codex\backups\IkLlamaServer-AppParameters-pre-W301.txt`
2. `nssm stop IkLlamaServer`
3. `nssm set IkLlamaServer AppParameters "<existing args minus '-mtp --draft-max 4 --draft-p-min 0.0' plus '--spec-stage ngram-mod:n_max=64,n_min=2,spec-ngram-size-n=16 --spec-stage mtp:n_max=3,draft-p-min=0.0'>"` (preserve `-mtprot iq4_ks`; the legacy `-mtp` shortcut MUST be removed per `--help` line "legacy shortcut for enabling MTP **when --spec-stage is not used**").
4. `nssm start IkLlamaServer`; wait for `:8080/health` 200; smoke-test `/v1/chat/completions`.
5. **Rollback on failure**: `nssm stop IkLlamaServer; nssm set IkLlamaServer AppParameters "$(cat Z:\claude-sota-installed-state\.codex\backups\IkLlamaServer-AppParameters-pre-W301.txt)"; nssm start IkLlamaServer`.

## §6 — VERDICT

**APPLY-SAFELY**, with **TWO MANDATORY RECIPE CORRECTIONS vs the W269 docs**:

1. **Order**: `--spec-stage ngram-mod:...` MUST precede `--spec-stage mtp:...` (self-spec first; otherwise the server exits with the §4 error). W269 docs had the order BACKWARDS.
2. **Remove legacy `-mtp --draft-max 4 --draft-p-min 0.0`**: per `--help`, the `-mtp` shortcut is "legacy shortcut for enabling MTP when --spec-stage is not used"; mixing the shortcut with `--spec-stage` is unspecified behavior. Operator-AI must strip these from the param string when adding the two `--spec-stage` entries. Retain `-mtprot iq4_ks` (orthogonal, governs MTP output requantization quality).

Cite-evidence summary:
- `--spec-stage` is in-build [§1, `tmp/llama-probe-18080.log:339-341`].
- PR #1789 merged 2026-05-15 before build SHA c35189d8 [§3, GitHub MCP].
- Recipe with corrected order PARSES and progresses to full tensor offload on the live GGUF [§4, `tmp/llama-probe-18080-v2.log.err`].
- Rollback path is fully reversible via NSSM AppParameters restore [§5].
- Expected gain: PR-measured **+80%** code-task t/s with cache on Qwen3.6-27B-MTP-Q8_0 (108.2 vs 60.1 t/s) [§2, PR body benchmark].
