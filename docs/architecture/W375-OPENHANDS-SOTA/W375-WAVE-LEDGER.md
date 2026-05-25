# W375 OpenHands SOTA Implant — Wave Ledger

| Phase | Status | Commit | Notes |
|---|---|---|---|
| P0.1 worktree-cut + W374-EXT merge | ✓ DONE | fb9a216 (marker) + 574c1f7 (merge) | spec+quality APPROVE |
| P0.2 deps install + pin-discipline | ✓ DONE | 3e329ad + a7f5349 (pin fix) | spec+quality APPROVE; OAUTH_OPERATOR_ACTION_REQUIRED for P3 |
| P0.3 Langfuse + SWE-Bench prereqs | ✓ DONE_WITH_CONCERNS | ab23918 | Langfuse HTTP 200 OK (v3.174.1); HF dataset cached; benchmarks cloned (OpenHands/benchmarks); SWE-Bench docker image not found on any tried registry (princeton-nlp/swe-bench-eval, swebench/eval, ghcr.io/princeton-nlp/swebench-eval) — operator to investigate correct image name at ship-gate time (P5+) |
| P1 harness scaffold | pending | | |
| P2 agent integration | pending | | |
| P3 eval pipeline | pending | | |
| P4 observability wiring | pending | | |
| P5 ship-gate + SWE-Bench run | pending | | |

## P0.3 Detail

### Step 1 — Langfuse Recovery

- postgres + minio restarted via `docker compose up -d`
- `langfuse-web` + `langfuse-worker` restarted; both reached `running` state
- Health probe: `curl http://127.0.0.1:3000/api/public/health` → `{"status":"OK","version":"3.174.1"}` (HTTP 200)
- **STATUS: RECOVERED**

### Step 2 — SWE-Bench Docker Image

- Tried: `princeton-nlp/swe-bench-eval:latest` → access denied / not found
- Tried: `swebench/eval:latest` → access denied / not found
- Tried: `ghcr.io/princeton-nlp/swebench-eval:latest` → registry denied
- **STATUS: DONE_WITH_CONCERNS** — operator must identify correct image name before P5 ship-gate

### Step 3 — HF Dataset Pre-cache

- Venv: `Z:/claude-sota-installed-state/venvs/w374/Scripts/python.exe`
- Downloaded `princeton-nlp/SWE-bench_Verified` (unauthenticated; HF_TOKEN not set, rate-limited but succeeded)
- Cache path: `Z:\claude-sota-installed\.cache\huggingface\hub\datasets--princeton-nlp--SWE-bench_Verified\snapshots\c104f840cc67f8b6eec6f759ebc8b2693d585d4a`
- **STATUS: DONE**

### Step 4 — OpenHands/benchmarks Clone

- Cloned from `https://github.com/OpenHands/benchmarks`
- Target: `Z:/claude-sota-installed-repos/benchmarks`
- Repo contains: `benchmarks/`, `legacy/`, `tests/`, `vendor/`, `pyproject.toml`, `uv.lock`, `Makefile`
- **STATUS: DONE** (primary URL worked; no fallback needed)

## Pre-W375 carry-forward (operator actions)

- [ ] Run `LLM.subscription_login(..., open_browser=True)` interactively before P3 ships (CREDS_MISSING per P0.2)
- [ ] Identify correct SWE-Bench harness Docker image name (P5 ship-gate prerequisite); check `https://github.com/princeton-nlp/SWE-bench` for current image registry path
- [ ] Optionally set `HF_TOKEN` env var to avoid unauthenticated HF Hub rate limits in CI

## References

- Spec: `docs/superpowers/specs/2026-05-22-W375-openhands-sota-implant-design.md`
- Plan: `docs/superpowers/plans/2026-05-22-W375-openhands-sota-implant.md`
- Codex convergence: r1-r6 transcripts at `tmp/openhands-brainstorm/codex-r{1..6}-W375.txt`
