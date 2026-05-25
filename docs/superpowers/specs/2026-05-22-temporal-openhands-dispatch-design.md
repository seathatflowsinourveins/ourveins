# Durable Agent Dispatch — Temporal × OpenHands Two-Layer — Design Spec (V2, preflight-corrected)

**Date**: 2026-05-22
**Author**: Claude Code (claude-opus-4-7[1m]) orchestrator
**Wave**: provisional `W374-TEMPORAL-OPENHANDS-DISPATCH`
**Skill chain**: `superpowers:brainstorming` → THIS SPEC → `superpowers:writing-plans` → implementation
**Status**: DRAFT — design approved by operator 2026-05-22; **V2 incorporates codex r1 NEEDS-REVISION (8 findings) + environment-preflight findings (port conflict, venv drift, Temporal-CLI-present)**; re-gated by codex r2 before commit.
**Research basis**: `tmp/sota-platform-survey/SYNTHESIS-best-of-the-best-2026-05-22-V2-CORRECTED.md` (codex round-2 **APPROVE**). Versions/licenses primary-source-verified (`gh` API + `git ls-remote` + LICENSE reads, 2026-05-22).
**HARD-GATE**: No infra stand-up / Docker run / worker code until this written spec is operator-approved and a writing-plans plan exists (it does: `docs/superpowers/plans/2026-05-22-temporal-openhands-dispatch.md`).

---

## §0 Goal + scope

Let Claude Code hand a complex, possibly long-running task to a **self-hosted, crash-proof execution backend** and get a verified result without the interactive session babysitting it.

- **OpenHands** (executor) — accepts a task + repo, autonomously plans/edits/tests/completes. Strong open-source SWE standing per **third-party leaderboards (~68–78%; NOT officially `swebench.com`-verified)**. License **core MIT + `enterprise/` source-available**. v1.7.0. Served on **`127.0.0.1:3033`** (Langfuse owns :3000).
- **Temporal** (durable spine) — durable workflow surviving worker crash / host reboot via event-history replay, with retries, timeouts, heartbeats, signals. **MIT** server + Python SDK. CLI **already installed** (v1.6.1 / Server 1.30.1); `temporalio` SDK 1.27.2.

**v1 scope**: CC durably dispatches **one autonomous OpenHands task** through a Temporal workflow with **distinct** retry/budget/failure handling, optional HITL review gate, and Langfuse tracing, returning a structured result. Built in a wave worktree using a **dedicated venv** (`Z:\claude-sota-installed-state\venvs\w374`); nothing touches `main` until smoke + codex APPROVE.

**CLI shape (v1)**: `python tools/dispatch_temporal.py start --task "<t>" [--repo org/repo] [--wall 1800] [--hitl] [--await]` ; `status --id <id>` ; `result --id <id>` ; `signal --id <id> approve|cancel`.

**Deferred** (§15): Goose executor, MCP shim, Temporal Docker cluster, A2A, multi-tenant, K8s, **true pre-execution HITL** (needs OpenHands pause-mode), token/tool budget enforcement (advisory in v1).

---

## §1 Architecture

```
Claude Code ──Bash──▶ tools/dispatch_temporal.py (gRPC client, +TracingInterceptor, client-side traceparent)
                            │ start_workflow / status / result / signal ; JSON stdout ; fail-CLOSED
                            ▼
              Temporal server (localhost:7233, start-dev SQLite)  ── Web UI :8233
                            │ durable event history
                            ▼
              agents/temporal_worker.py  (task_queue="agents", +TracingInterceptor)
                ├ activity start_openhands_conversation ─▶ OpenHands REST 127.0.0.1:3033
                ├ activity poll_openhands (heartbeat; cancellable → stop_conversation)
                ├ workflow budget timer  (race vs poll → cancel → BUDGET_PARTIAL)
                └ signal approve|cancel  (HITL review gate)
                            │ TaskResult{status, result, artifacts, cost, trace_url, event_history_url}
   Claude Code ◀───────────┘     spans ──▶ Langfuse :3000 (OTLP)   ;   history ──▶ Temporal UI :8233
```

**Dedicated venv** isolates `temporalio==1.27.2` (the shared/system env carries 1.20.0 — do not disturb). Each unit independently testable.

---

## §2 Components

| # | Path | LOC | Purpose |
|---|---|---|---|
| 1 | `agents/models.py` | ~45 | `Budget`, `TaskSpec`, `TaskStatus{COMPLETE,FAILED,BUDGET_PARTIAL,CANCELLED}`, `TaskResult` |
| 2 | `agents/openhands_client.py` | ~70 | async REST wrapper; retryable/non-retryable `OpenHandsError`; fail-closed on unknown schema; `stop_conversation` |
| 3 | `agents/otel_inject.py` | ~45 | Langfuse OTLP env; Temporal `TracingInterceptor` factory; **client-side** `langfuse_trace_url` (no `secrets` in workflow) |
| 4 | `agents/temporal_worker.py` | ~110 | activities + `AgentTaskWorkflow` (error taxonomy + budget timer-race) + worker `main()` w/ interceptor |
| 5 | `tools/dispatch_temporal.py` | ~110 | CLI: start/status/result/signal; JSON; fail-CLOSED |
| 6 | `schemas/agent_task.schema.json` | gen | generated from `TaskSpec` |
| 7 | `infra/{temporal,openhands}/README.md` + `infra/wire-pins.json.template` | ~90 | runbooks (`-p 127.0.0.1:3033:3000`) + pins template |
| 8 | `tests/*` | ~500 | models/client/otel unit + workflow (success/FAILED/budget/HITL) + replay + cli + smoke_e2e |
| — | `agents/requirements.txt` | ~10 | pinned deps (CR-9) |

Full task breakdown + complete code: the implementation plan.

---

## §3 Data flow

1. CC runs `dispatch_temporal.py start --task ... --wall 1800 [--hitl] [--await]`.
2. Bridge connects to Temporal (`localhost:7233`, pydantic converter + TracingInterceptor), `start_workflow(AgentTaskWorkflow.run, spec, ...)`; prints `{workflow_id, ui}`; `--await` blocks on result.
3. Worker: activity `start_openhands_conversation` → `POST 127.0.0.1:3033/api/v1/app-conversations` → `conversation_id` (RetryPolicy 3, non-retryable on 4xx). **Start failure → structured `FAILED`, never a raw stack trace.**
4. Workflow races `poll_openhands` (heartbeating; retry 5) against a **deterministic budget timer** (`asyncio.sleep(wall)`). Poll maps OpenHands status → `COMPLETE`/`FAILED`.
5. **Timer wins → cancel poll activity → `stop_conversation` cleanup → `BUDGET_PARTIAL`.** Poll error-exhaust → `FAILED` (distinct from budget).
6. HITL (`--hitl`): on COMPLETE, `wait_condition(approved | cancelled)`; operator `signal --id <id> approve|cancel`. **v1 semantics: OpenHands ran in an isolated scratch workspace (no auto-push), so this is review-before-accept, not pre-execution** (§7).
7. Crash safety: worker/host restart → Temporal replays event history; completed activities not re-run.
8. Returns `TaskResult{...}`; bridge prints JSON; CC synthesizes / writes T6 + verdict-ledger.
9. Tracing: `TracingInterceptor` exports workflow+activity spans to Langfuse :3000; `trace_url` populated client-side; Temporal UI :8233 shows event history.

---

## §4 Connection design

- **v1 — Python CLI bridge** (`dispatch_temporal.py`): CC invokes via Bash; JSON stdout; slots into the W373 `/dispatch` manifest as a `direct-cli` runtime.
- **v2 (deferred) — FastMCP shim** wrapping `start_workflow`/`get_result`/`signal` registered in `.mcp.json`.

---

## §5 Workflow + activity design

- **Start**: `execute_activity(start_openhands_conversation, retry=3)`; wrapped in `try/except → TaskResult(FAILED, error=...)` (codex F1).
- **Budget race** (codex F3): `poll = ensure_future(execute_activity(poll_openhands, heartbeat_timeout=60, retry=5, start_to_close=wall+60))`; `budget = ensure_future(asyncio.sleep(wall))` (deterministic Temporal timer); `await asyncio.wait([poll, budget], FIRST_COMPLETED)`. Poll-first → `budget.cancel()` + result/FAILED; timer-first → `poll.cancel()` (activity gets `CancelledError` → `stop_conversation`) + `BUDGET_PARTIAL`.
- **Signals**: `approve`, `cancel` (HITL).
- **Determinism**: no `secrets`/wallclock/random in workflow body; traceparent generated client-side only (codex F5). Guarded by the replay test.

---

## §6 Error handling (distinct outcomes — codex F1)

| Failure | Outcome | Mechanism |
|---|---|---|
| start 5xx/network, retry-exhaust | `FAILED` (start) | RetryPolicy + try/except → structured result |
| start 4xx contract | `FAILED` (non-retryable) | `ApplicationError(non_retryable=True)` |
| poll 5xx/network exhaust | `FAILED` (poll) | RetryPolicy + workflow try/except |
| OpenHands run returns error status | `FAILED` | status mapping |
| wall-time budget exceeded | `BUDGET_PARTIAL` | timer-race → cancel → `stop_conversation` |
| operator cancel during HITL | `CANCELLED` | `cancel` signal |
| stuck worker | reschedule | `heartbeat_timeout` |
| host reboot / worker crash | resume | event-history replay |
| Temporal/OpenHands unreachable (bridge) | exit 2 + JSON error | fail CLOSED |
| unknown OpenHands schema | `FAILED` non-retryable | client fail-closed (codex F8) |

---

## §7 Budget + HITL

- **Budget**: `wall_time_seconds` enforced by the Temporal timer-race (§5). `max_tool_calls`/`max_tokens` are **advisory in v1** (passed to OpenHands run config where supported; not workflow-enforced).
- **HITL — v1 semantics (codex F2)**: OpenHands executes in an **isolated scratch workspace with no auto-push**, so its work is contained until accepted. The `--hitl` gate is **review-before-accept** (operator inspects the completed result before it's marked accepted), **NOT a pre-execution gate**. **True pre-apply HITL** (pausing OpenHands before it edits/opens a PR) requires OpenHands pause-mode + a separate gated publish activity — **deferred to v1.1**. For any task that would write to a shared/remote repo, v1's rule is: keep work in the scratch workspace; do not wire auto-push.

---

## §8 Observability (codex F5)

Temporal `temporalio.contrib.opentelemetry.TracingInterceptor` on **both** client and worker auto-exports workflow + activity spans over OTLP to **Langfuse :3000** (`/api/public/otel`, Basic auth from env). Trace ids come from a **client-side** OTel span the bridge opens (never `secrets`/random inside workflow code); the worker's interceptor nests workflow+activity spans under it. `TaskResult.trace_url` is populated client-side from that trace id; Temporal Web UI :8233 is the durable event-history audit.

---

## §9 Security / CR-1

- **Licenses (verified)**: OpenHands core MIT (`enterprise/` excluded), Temporal server + SDK MIT. No AGPL/SSPL/BSL in path.
- **Network (codex F4)**: OpenHands `docker run -p 127.0.0.1:3033:3000` (**localhost-bound**, not all-interfaces); Temporal `start-dev` localhost. No inbound exposure.
- **Pins (CR-9, codex F6)**: OpenHands image digest + Temporal versions + `temporalio==1.27.2` recorded in `infra/wire-pins.json` (generated from `.template`; git-ignored until filled — no placeholders committed).
- **Secrets**: LLM + Langfuse keys via process env (CLAUDE.local.md, gitignored); none tracked.
- **Containment**: OpenHands runs agent-authored code in its Docker sandbox only; scratch workspace mount; no host-credential mounts; HITL for shared-repo writes.

---

## §10 Self-host deployment (Windows-Z:)

- **venv**: `py -3 -m venv Z:/claude-sota-installed-state/venvs/w374`; install `agents/requirements.txt`; call `"$VENV/Scripts/python.exe"` explicitly (do NOT assume the shared `Z:\venvs\claude` or system `C:\Python314` — preflight found system Python with `temporalio 1.20.0`).
- **Temporal**: CLI already present (`temporal --version` ≥ 1.6.x); `temporal server start-dev --db-filename Z:/claude-sota-installed-state/temporal/dev.db --ui-port 8233` (7233/8233 verified free).
- **OpenHands**: digest-pinned Docker on `127.0.0.1:3033`, scratch workspace under `Z:/claude-sota-installed-state/openhands/`.
- **Worker**: `"$VENV/Scripts/python.exe" agents/temporal_worker.py` (long-running; NSSM-supervisable later).

---

## §11 Testing

Unit (models/client/otel) + workflow via `WorkflowEnvironment.start_time_skipping` (success / **FAILED-distinct-from-budget** / **budget-cancel (small real wall, ~2s, no hang)** / HITL-signal) + **replay/determinism** + CLI fail-closed + live e2e smoke + negative e2e (OpenHands-down → FAILED, distinct, no silent pass). Per the plan's TDD tasks.

---

## §12 Quality gates

CR-1 (license+pin) · CR-2 (no hook bodies) · CR-5 (sandbox/localhost/secrets) · CR-6 (verify-before-claim: test exits + smoke stdout + Temporal history links) · all §11 tests green · **codex round-1 APPROVE on the implementation** · wave worktree + `--force-with-lease`.

---

## §13 Risk + rollback

OpenHands harmful code → sandbox + scratch + HITL → `docker compose down -v` + delete scratch. Temporal dev SQLite throwaway → delete `dev.db`. Runaway → heartbeat/budget/`signal cancel`. Supply-chain → digest/version pins. Wave rollback: tag `pre-W374-temporal-openhands`; `git revert` (never `reset --hard`); teardown order = OpenHands container → Temporal db → worker → venv → `.gitignore`d pins.

---

## §14 Acceptance criteria

Components written+committed in worktree · `start-dev` + OpenHands :3033 up clean · unit+replay green · e2e smoke COMPLETE · negative e2e FAILED-distinct · Langfuse trace + Temporal history visible · §12 gates incl. codex APPROVE · digests in `wire-pins.json` · T6 note + verdict-ledger · PR `--force-with-lease`.

---

## §15 Out-of-scope (v1)

Goose executor; MCP shim; Temporal cluster; A2A; multi-tenant; K8s; Temporal Cloud; **true pre-execution HITL**; workflow-enforced token/tool budgets; non-coding task templates.

---

## §16 Cite-anchors (≥3 org-distinct)

- **Temporal** — `docs.temporal.io` (workflows/activities/signals/retry/heartbeat/`asyncio` determinism/`TracingInterceptor`) + `temporalio/sdk-python` 1.27.2 (MIT, gh-verified) + `temporalio/temporal` server (MIT; CLI bundles Server 1.30.1 for `start-dev`).
- **OpenHands** — `docs.openhands.dev` (`/api/v1/app-conversations`, headless) + `OpenHands/OpenHands` v1.7.0 (LICENSE-verified: core MIT + `enterprise/` source-available).
- **Anthropic** — `code.claude.com/docs/en/sub-agents`; `docs.anthropic.com/.../claude-code/headless`.
- **OpenTelemetry/Langfuse** — OTLP/HTTP + Langfuse `/api/public/otel`.
- **Cross-model gate** — `tmp/sota-platform-survey/codex-round2-review.txt` (research APPROVE) + `tmp/sota-platform-survey/codex-W374-spec-plan-review.txt` (r1 NEEDS-REVISION, fixes applied in V2).
- **Standards** — OWASP A06 (pinning), NIST SP 800-218 PW.7, CR-1..CR-6.

---

## §17 Spec self-review (V2)

- **Placeholders**: none (pins live in `.template`; real file generated). ✓
- **Consistency**: ports (3033 OpenHands / 7233+8233 Temporal / 3000 Langfuse), venv path, error taxonomy, HITL semantics, CLI flags all match the V2 plan. ✓
- **Scope**: single OpenHands task; deferrals explicit. ✓
- **Ambiguity**: budget=wall (token/tool advisory); HITL=review-before-accept (not pre-exec); connection=CLI bridge v1. ✓
- **Codex r1 8 findings**: F1 taxonomy §6/§5; F2 HITL §7; F3 timer-race §5 + non-hang test §11; F4 localhost §9; F5 OTel §8; F6 pins §9; F7 CLI §0; F8 fail-closed §6. All addressed. ✓
- **Preflight**: port→3033, dedicated venv, Temporal-CLI-detect. ✓

---

## §18 Transition

writing-plans output exists (`docs/superpowers/plans/2026-05-22-temporal-openhands-dispatch.md`, V2). Re-gate via codex r2 on this V2 spec + plan, then commit, then subagent-driven build of Tasks 0–6 (code+tests, no infra), HALT before Task 7–8.
