# S7 — SWE-Bench-Verified Eval Harness

**Wave**: W376
**Stream**: S7 (research-only)
**Source**:
- `princeton-nlp/SWE-bench` (canonical eval harness, GitHub `main` branch as fetched 2026-05-22)
- `princeton-nlp/SWE-bench_Verified` HuggingFace dataset @ commit `c104f840cc67f8b6eec6f759ebc8b2693d585d4a`
- Anthropic SWE-Bench post (URL corrected: `/research/swe-bench-sonnet`, NOT `/research/swe-bench-pro` — latter returns HTTP 404 as of 2026-05-22)
- W375 `tools/eval_gate.py:42-57` (commit-msg gate score consumer)
- W375 spec for W376: `docs/superpowers/specs/2026-05-22-W376-openhands-sdk-alignment-design.md §9` (C2 carry-forward identification)
**Status**: DONE (research-only)

## §1 SWE-Bench-Verified-50 subset definition

**Source-of-truth**: `princeton-nlp/SWE-bench_Verified` HuggingFace dataset.

- **Full dataset size**: 500 instances (single `test` split), as documented at `huggingface.co/datasets/princeton-nlp/SWE-bench_Verified` ("Dataset Summary: SWE-bench Verified is a subset of 500 samples from the SWE-bench test set, which have been human-validated for quality").
- **Dataset commit SHA (pin)**: `c104f840cc67f8b6eec6f759ebc8b2693d585d4a` (HF tree HEAD as of 2026-05-22, "verified over 1 year ago" — stable dataset, no churn).
- **`Verified-50` definition**: **NOT a canonical upstream subset**. The W375 name `Verified-50` is a project-local 50-instance sampling from the 500-instance verified pool, used as a fast eval lane (full 500-instance run is hours-to-days; 50-instance run is minutes-to-hours per W375 §17 ramp rationale). Selection policy MUST be documented at the W377 ramp wave; recommended policy: **stratified sample by `difficulty` field** (the verified dataset includes a 4-value `difficulty` classification — `<15 min fix`, `15 min - 1 hour`, `1-4 hours`, `>4 hours`). Stratified 50 = ~13 per bucket preserves difficulty distribution.
- **Programmatic access**:
  ```python
  from datasets import load_dataset
  ds = load_dataset("princeton-nlp/SWE-bench_Verified", revision="c104f840cc67f8b6eec6f759ebc8b2693d585d4a", split="test")
  # 500 instances; each has 13 fields per §5 schema
  ```
- **Task ID format**: `<repo_owner>__<repo_name>-<PR_number>`, e.g. `astropy__astropy-12907`, `sympy__sympy-20590` (the latter is the upstream README's smoke-test ID). Exact 50-ID list MUST be checked in at `docs/architecture/W375-EVAL-RESULTS/verified-50-task-ids.txt` as part of W377 ramp.

## §2 Harness image registry

**Confirmed pattern** (cite: `swebench/harness/test_spec/test_spec.py` property `instance_image_key`):

```python
@property
def instance_image_key(self):
    key = f"sweb.eval.{self.arch}.{self.instance_id.lower()}:{self.instance_image_tag}"
    if self.is_remote_image:
        key = f"{self.namespace}/{key}".replace("__", "_1776_")
    return key
```

- **Local-build image name**: `sweb.eval.<arch>.<instance_id_lower>:<tag>` — e.g. `sweb.eval.x86_64.astropy__astropy-12907:latest`.
- **Remote (DockerHub) image name**: `<namespace>/sweb.eval.<arch>.<instance_id_lower>:<tag>` with the literal `__` (double-underscore) substituted to `_1776_` because DockerHub image-name regex rejects `__`. Result: `swebench/sweb.eval.x86_64.astropy_1776_astropy-12907:latest`.
- **Default registry**: **Docker Hub**, namespace `swebench` (cite: README — "By default, the evaluation script pulls images (built for Linux) from [DockerHub](https://hub.docker.com/u/swebench)"). Override via `--namespace ''` (empty string) for fully local build; override via `--namespace <other>` for custom registry namespace.
- **Three image layers** (cite: `swebench/harness/docker_build.py` imports `BASE_IMAGE_BUILD_DIR`, `ENV_IMAGE_BUILD_DIR`, `INSTANCE_IMAGE_BUILD_DIR`):
  1. **Base image** (`sweb.base.<arch>:<tag>`) — Ubuntu + conda + system deps.
  2. **Env image** (`sweb.env.<arch>.<env_id>:<tag>`) — per-(repo, version) conda env with deps installed.
  3. **Instance image** (`sweb.eval.<arch>.<instance_id_lower>:<tag>`) — env image + repo checkout at `base_commit`.
- **GHCR / Anthropic-internal**: NEITHER — only Docker Hub is documented. The Anthropic SWE-Bench paper (`/research/swe-bench-sonnet`) does NOT publish a separate image registry; it builds an agent scaffold on top of the upstream princeton-nlp images.

## §3 Run protocol

**Entrypoint** (cite: README, `swebench/harness/run_evaluation.py:main`):
```bash
python -m swebench.harness.run_evaluation \
    --predictions_path <path_to_predictions.jsonl> \
    --max_workers <int> \
    --instance_ids <id1> <id2> ... \    # OR omit to run all
    --run_id <unique_run_label> \
    --dataset_name princeton-nlp/SWE-bench_Verified \
    --split test \
    [--namespace ''] \                   # add for local build (ARM / non-x86_64)
    [--force_rebuild False] \
    [--cache_level env]                  # base|env|instance|none
```

- **Input contract** (`predictions_path` JSONL or JSON; cite `swebench/harness/grading.py` imports `KEY_INSTANCE_ID, KEY_MODEL, KEY_PREDICTION`):
  ```json
  {"instance_id": "astropy__astropy-12907",
   "model_name_or_path": "claude-opus-4-7",
   "model_patch": "diff --git a/foo.py ...\n"}
  ```
- **Output contract** (`<model>.<run_id>.json` written next to predictions; cite `swebench/harness/reporting.py:make_run_report`):
  ```json
  {"total_instances": 500, "submitted_instances": 50,
   "completed_instances": 48, "resolved_instances": 24,
   "unresolved_instances": 24, "empty_patch_instances": 2,
   "error_instances": 0,
   "resolved_ids": [...], "unresolved_ids": [...],
   "error_ids": [...], "empty_patch_ids": [...],
   "schema_version": 2}
  ```
- **Per-instance return** (cite `run_evaluation.py:run_instance` finally-block): `{"completed": bool, "resolved": bool}`.
- **Scoring**: see §6. `resolved_pct = resolved_instances / submitted_instances` — note that the upstream `report.json` does NOT include `resolved_pct` directly (cite deepwiki); it MUST be computed by the W375 eval-evidence writer.

## §4 Container shape

- **Base image** (`sweb.base.<arch>:<tag>`): Ubuntu (per upstream `Dockerfile` patterns in `swebench/harness/dockerfiles/`), with `DOCKER_USER` (cite: `docker_build.py` import) running as non-root.
- **Env image** layer: Miniconda + per-(repo, version) conda env with pinned Python + repo deps installed at `environment_setup_commit`. Mapping table is `MAP_REPO_VERSION_TO_SPECS` (cite: `test_spec.py` import).
- **Instance image** layer: env image + `git clone` of `repo` at `base_commit` checked out into `/testbed`.
- **Gold-test injection** (cite: `swebench/harness/grading.py` constants `FAIL_TO_PASS, PASS_TO_PASS, APPLY_PATCH_FAIL, APPLY_PATCH_PASS, TESTS_TIMEOUT, START_TEST_OUTPUT, END_TEST_OUTPUT`): at runtime, the harness (a) applies the model's `model_patch`, (b) applies the dataset's `test_patch` (gold test files added by the original PR), (c) runs the test command for that (repo, version), (d) parses stdout between `START_TEST_OUTPUT` and `END_TEST_OUTPUT` markers to extract per-test pass/fail, (e) checks `FAIL_TO_PASS` and `PASS_TO_PASS` lists from the dataset against the test result map.
- **Disk / CPU / memory** (cite README): "at least 120GB of free storage, 16GB of RAM, and 8 CPU cores" recommended host budget. Per-container is unbounded by default — set `--max_workers` to cap parallel concurrent containers.

## §5 Integration with W376 TaskSpec

Mapping from SWE-Bench instance fields (cite: HF dataset schema, 13 fields) → W376 TaskSpec:

| SWE-Bench field | W376 TaskSpec field | Notes |
|---|---|---|
| `problem_statement` | `spec.task` | Verbatim issue text — the prompt body. |
| `repo` | `spec.repo` | e.g. `astropy/astropy` — feeds `github.com/<repo>` URL construction. |
| `base_commit` | `spec.base_commit` (40-char SHA) | Checkout target — agent MUST start at this SHA. |
| `instance_id` | `spec.task_id` | Stable identifier for tracking + log filenames. |
| `version` | `spec.repo_version` | Selects which conda env from `MAP_REPO_VERSION_TO_SPECS`. |
| `environment_setup_commit` | `spec.env_commit` | Used for env-image build, not for agent checkout. |
| `FAIL_TO_PASS`, `PASS_TO_PASS` | NOT in TaskSpec | Held by eval harness only; agent MUST NOT see these (would be eval-leakage). |
| `patch`, `test_patch`, `hints_text` | NOT in TaskSpec | Gold patches — held by harness only; agent MUST NOT see. |
| `difficulty`, `created_at` | NOT in TaskSpec | Metadata for sampling + stratification only. |

- **`spec.workspace_mode`**: MUST be `'remote'` (Docker-container-isolated) when running on SWE-Bench tasks. Local workspace is unsafe because the gold-test injection requires container isolation per §4.
- **`spec.output_contract`**: agent returns a unified-diff patch on stdout in the `model_patch` field of the prediction JSONL row. The harness re-applies inside the container; agent itself does NOT need to invoke the harness.

## §6 Scoring + pass/fail

**Per-instance scoring** (cite: `swebench/harness/grading.py:get_resolution_status`):
```python
if f2p == 1 and p2p == 1:
    return ResolvedStatus.FULL.value   # → resolved=True
elif 0 < f2p < 1 and p2p == 1:
    return ResolvedStatus.PARTIAL.value # → resolved=False (partial does NOT count as resolved)
else:
    return ResolvedStatus.NO.value      # → resolved=False
```

Where `f2p = (FAIL_TO_PASS tests now passing) / |FAIL_TO_PASS|` and `p2p = (PASS_TO_PASS tests still passing) / |PASS_TO_PASS|`. **Both must be 1.0** for `resolved=True`.

**Aggregate score** (cite: `reporting.py:make_run_report`):
- `resolved_pct = resolved_instances / submitted_instances` (computed downstream — NOT in upstream report.json).
- `error_instances` = harness-internal failures (container OOM, network, build error) — NOT model failures; these are EXCLUDED from `submitted` count per the report schema.
- `empty_patch_instances` = model returned an empty `model_patch` — counts as submitted-but-unresolved.

## §7 Eval-gate cr6 integration

**W375 commit-msg hook contract** (cite: `tools/eval_gate.py:42-57`):
- Reads `EVIDENCE_PATH = docs/architecture/W375-EVAL-RESULTS/last-ship-evidence.md`.
- Parses first line matching `^resolved_pct:\s*<float>$` OR `^score:\s*<float>$`.
- Test-mode override via env `W375_EVAL_TEST_SCORE=<float>` (used by W375 unit tests only).

**Live pipeline producer** (W377 design — research recommendation):
1. Operator runs `python -m swebench.harness.run_evaluation --predictions_path <path> --dataset_name princeton-nlp/SWE-bench_Verified --instance_ids <50-id-list> --run_id w375-ship-<git-sha> --max_workers 8`.
2. Wrapper script reads the generated `<model>.<run_id>.json` report.
3. Wrapper computes `resolved_pct = resolved_instances / submitted_instances`.
4. Wrapper writes `last-ship-evidence.md` with header line `resolved_pct: 0.<NN>` (no `%` suffix — eval_gate.py strips it via `.rstrip("%")` but cleaner to omit).
5. Wrapper appends row to `ship-history.jsonl`: `{"score": 0.<NN>, "run_id": "w375-ship-<sha>", "timestamp": "<iso>", "instance_ids": [...]}`.
6. Commit-msg hook runs `eval_gate.py --commit-msg-file $1`, reads both files, applies 5pp regression band (cite: `eval_gate.py:29` `DELTA_PP_THRESHOLD = 0.05`).

**Bootstrap exemption** (cite: `eval_gate.py:127-131`): no evidence + no history → PASS (lets first ship through; first ship establishes baseline). This is exercised on W377 first ship.

## §8 Concurrency + resource limits

**Upstream-recommended host budget** (cite README WARNING block):
- `x86_64` host, 120 GB free storage, 16 GB RAM, 8 CPU cores minimum.
- `--max_workers` capped at `min(0.75 * os.cpu_count(), 24)`.
- ARM (M-series) "experimental" — requires `--namespace ''` (local build, no DockerHub pull).
- Docker Desktop: increase virtual disk to ~120 GB free.

**Per-task budget** (unbounded by default in upstream; OPERATOR MUST add):
- Container timeout: harness has `TESTS_TIMEOUT` constant (cite: `grading.py` import) — enforced per-test, not per-container. Recommend wrapping each `run_instance` with a 30-minute hard wall-clock cap.
- Memory: not capped per container by default; if running concurrent workers on a 16 GB host, set Docker `--memory=4g` ulimit in `docker_utils.py:create_container` (requires source patch — track as W377 follow-up).

**Recommended W377 starting config for Verified-50 lane**:
- `--max_workers 4` (conservative on 8-core 16 GB host; leaves headroom for Claude API client + agent process).
- `--cache_level env` (skip rebuilding env images between runs — saves 10-20 min/run after first warm-up).
- Wall-clock budget: ~2-4 hours for full 50-instance run on warm cache.
- Cold-cache first run: pre-pull all 50 instance images via `docker pull swebench/sweb.eval.x86_64.<id_lower>:latest` overnight (≈50 × 1-2 GB = 50-100 GB pull).

## §9 Cite-anchor cluster

**princeton-nlp/SWE-bench** (3 file:line refs):
- `swebench/harness/test_spec/test_spec.py` `instance_image_key` property — Docker image-name f-string with `_1776_` substitution rule.
- `swebench/harness/run_evaluation.py` `main` + `run_instance` finally-block — entrypoint signature + per-instance `{"completed", "resolved"}` return contract.
- `swebench/harness/grading.py` `get_resolution_status` — `f2p == 1 AND p2p == 1` gate for `ResolvedStatus.FULL` (the canonical pass condition).
- `swebench/harness/reporting.py` `make_run_report` — `report.json` schema (12 fields including `resolved_instances`, `submitted_instances`, `schema_version: 2`).
- `swebench/harness/docker_build.py` — 3-layer image build (base → env → instance) + remote-image pull path.
- README.md — `--namespace ''` ARM override; `min(0.75 * os.cpu_count(), 24)` max_workers cap; 120 GB / 16 GB / 8 CPU host budget; smoke-test invocation `--instance_ids sympy__sympy-20590`.

**HuggingFace dataset**:
- `huggingface.co/datasets/princeton-nlp/SWE-bench_Verified` — 500 instances, 13-field schema, dataset SHA `c104f840cc67f8b6eec6f759ebc8b2693d585d4a`.
- `huggingface.co/datasets/princeton-nlp/SWE-bench_Verified/tree/main` — commit SHA verification.

**Anthropic**:
- `anthropic.com/research/swe-bench-sonnet` — published 2025-01-06; Claude 3.5 Sonnet → 49% on SWE-Bench Verified; describes "agent" scaffold around the model (bash tool, computer-use-style loop); confirms Anthropic uses upstream princeton-nlp harness (NO separate image registry).
- **CORRECTION**: `anthropic.com/research/swe-bench-pro` returns HTTP 404 as of 2026-05-22 — the W376 skeleton URL was wrong; the canonical Anthropic SWE-Bench URL is `/swe-bench-sonnet`. The "SWE-Bench Pro" name does NOT exist on anthropic.com.

**W375 file:line**:
- `Z:/claude-sota-installed-W375/tools/eval_gate.py:27` — `EVIDENCE_PATH = Path("docs/architecture/W375-EVAL-RESULTS/last-ship-evidence.md")`.
- `Z:/claude-sota-installed-W375/tools/eval_gate.py:28` — `SHIP_HISTORY_PATH = Path("docs/architecture/W375-EVAL-RESULTS/ship-history.jsonl")`.
- `Z:/claude-sota-installed-W375/tools/eval_gate.py:29` — `DELTA_PP_THRESHOLD = 0.05` (5pp regression band).
- `Z:/claude-sota-installed-W375/tools/eval_gate.py:42-57` — `_read_current_score` parses `resolved_pct:` or `score:` line.
- `Z:/claude-sota-installed-W375/tools/eval_gate.py:84-92` — `_compute_threshold` (p10(last_5) ramp deferred per V11+codex r5 P2-2).
- `Z:/claude-sota-installed-W375/docs/superpowers/specs/2026-05-22-W376-openhands-sdk-alignment-design.md §9` — C2 carry-forward (SWE-Bench harness image registry identification).

## §10 W377+ wave plan for live eval ramp

**W377 (foundation)** — produce first real `last-ship-evidence.md`:
1. Author `tools/swebench_runner.sh` wrapper invoking `python -m swebench.harness.run_evaluation` with W376-pinned args.
2. Check in `docs/architecture/W375-EVAL-RESULTS/verified-50-task-ids.txt` (stratified-by-difficulty 50-instance ID list).
3. Pre-pull all 50 instance images overnight (cold-cache prep).
4. Implement evidence-file writer: parse `<model>.<run_id>.json` → compute `resolved_pct` → emit `last-ship-evidence.md`.
5. First live ship: bootstrap exemption fires (no history) — establishes baseline score.

**W378 (regression gate active)** — second live ship triggers real 5pp threshold check. If regression: operator either fixes agent OR adds `OVERRIDE-W375-EVAL: <rationale>` trailer (cite: `eval_gate.py:32-38`).

**W379+ (ramp to p10(last_5))** — after 5 ships in `ship-history.jsonl`, upgrade `_compute_threshold` to `p10(last_5) - 0.05` per V11+codex r5 P2-2. Requires history-walker code addition.

**W380+ (full 500 lane)** — once Verified-50 is stable, optionally enable Verified-500 nightly run for higher-fidelity tracking. Time budget: ~24-48 hours on 8-core 16 GB host.

**Out-of-scope for this research wave** (per W375 §9 C2 carry-forward identification): SWE-Bench Pro (anthropic.com/research/swe-bench-pro does NOT exist — URL is hallucinated in the W376 skeleton; the closest match is `/swe-bench-sonnet`); SWE-Bench Multimodal; SWE-Bench Live. All are deferred indefinitely; Verified is the W375-W379+ canonical scope.
