# W376 Codex r1 Multi-Dim Aggregate Findings

**Wave**: W376
**Phase**: B — Codex GPT-5.5 multi-dim adversarial review (parallel 6-dim, single-round)
**Date**: 2026-05-22
**Inputs reviewed**:
- `docs/architecture/W376-RESEARCH/SYNTHESIS.md` (12-stream synthesis, 20-org cite cluster)
- `docs/superpowers/specs/2026-05-22-W376-openhands-sdk-alignment-design.md`
- `docs/superpowers/plans/2026-05-22-W376-openhands-sdk-alignment.md`
- W375 lineage (PR #33 + DIM-15..20)

## Aggregate verdict table

| Dim | Focus | Verdict | Conf | P0 count | Tx file |
|---|---|---|---|---|---|
| D1 | Architecture-correctness | **BLOCK** | 0.91 | 4 | `tmp/openhands-brainstorm/codex-W376-r1-D1-OUTPUT.txt` |
| D2 | Security | **BLOCK** | 0.88 | 3 | `...D2-OUTPUT.txt` |
| D3 | Reliability + error propagation | **BLOCK** | 0.90 | 4 | `...D3-OUTPUT.txt` |
| D4 | Performance | NEEDS-REVISION | 0.88 | 4 | `...D4-OUTPUT.txt` |
| D5 | Observability + operability | **BLOCK** | 0.87 | 5 | `...D5-OUTPUT.txt` |
| D6 | Cite-density + SOTA-alignment | NEEDS-REVISION | 0.88 | 3 | `...D6-OUTPUT.txt` |

**Net**: 4 BLOCK + 2 NEEDS-REVISION across 6 dims · 23 distinct P0s · convergent-evidence on critical paths.

D6 cite metrics: `total_cite_anchors: 368 · distinct_orgs: 20 · claims_without_cite: 6` (sca-v18 floor 6.7× exceeded).

---

## P0 — Architecture (D1)

**A1**: Conversation lifecycle drift. Spec/plan still use `conv.stream_events()` + `await conv.send_message(...)`. SDK contract per S1 §2-§3 is sync `send_message()` + blocking `conv.run()` with callbacks.
  - **FIX**: Rewrite to `Conversation(..., callbacks=[_emit_event])` + `conv.send_message(spec.task)` sync + `await asyncio.to_thread(conv.run)`. Remove all `stream_events()` references.

**A2**: Agent-server spawn stale. Spec/plan still show `3000/tcp`, `/health`, `POST /sessions`, `kill()`. Actual per S2: `8000/tcp`, `OH_SESSION_API_KEYS_0` pre-start env, `/ready` polling (250ms/60s), `container.stop(timeout=30)` then remove.
  - **FIX**: Update `agent_server_spawn.py` design to `INTERNAL_AGENT_PORT=8000`, env-mint session key BEFORE `containers.run()`, `/ready` polling, graceful stop.

**A3**: `pydantic_data_converter` NOT wired. Every `Client.connect(...)` site (worker/CLI/MCP/e2e) omits it despite Pydantic v2 TaskSpec/TaskResult crossing Temporal boundary.
  - **FIX**: Import + pass `temporalio.contrib.pydantic.pydantic_data_converter` at every Client.connect.

**A4**: Heartbeat architecture insufficient for blocking `conv.run()`. Current per-event heartbeat fails for long thinking pauses; `no_progress_seconds/3` can be 200s, violating `heartbeat_timeout/3` rule.
  - **FIX**: Separate watchdog asyncio.Task heartbeating at ≤`heartbeat_timeout/3` cadence while `conv.run()` runs in `to_thread`. Flatline/cancel enforced separately by callback-event progress tracking.

## P0 — Security (D2)

**S1**: LocalWorkspace exposes host. Default `workspace_mode="local"` means hostile task code runs in-process against host workspace.
  - **FIX**: Make `workspace_mode="remote"` the default. LocalWorkspace reserved for explicitly trusted tasks.

**S2**: `spawn_agent_server` boots unsecured. Sketch doesn't pass `OH_SESSION_API_KEYS_0` env BEFORE container.run(), only mints key after `/health`. Attacker can call published API.
  - **FIX**: Mint `session_api_key = secrets.token_urlsafe(32)` + independent `OH_SECRET_KEY` BEFORE containers.run(). Bind published port to `127.0.0.1` only.

**S3**: Network egress allowlisting absent. Default Docker bridge allows arbitrary outbound + leaks DNS.
  - **FIX**: Per-task network + egress gateway/firewall allowing only OpenAI/Anthropic endpoints. Block RFC1918 + metadata + LAN. Pin DNS to gateway.

## P0 — Reliability (D3)

**R1**: `RetryBudget` + `OscillationDetector` + `IdempotentReplayer` NOT wired into dispatch. (Was C3 carry-forward — D3 ELEVATES to P0.)
  - **FIX**: Add admission/retry coordinator before `start_workflow`: compute op_id, acquire idempotency row, use op_id as workflow_id (or durable mapping), call RetryBudget on retryable failures, feed state transitions to OscillationDetector.

**R2**: Pydantic converter missing + no schema_version (overlaps A3).
  - **FIX**: Use `pydantic_data_converter` everywhere + add `schema_version` + backward-compat validators/aliases on TaskSpec/TaskResult.

**R3**: Flatline/heartbeat structurally wrong (overlaps A4). 30s heartbeat_timeout vs 600s flatline budget = retry amplification on 45-90s thinking pauses.
  - **FIX**: Same as A4 — separate watchdog at ≤heartbeat_timeout/3.

**R4**: Container recovery non-compliant. Current = LocalWorkspace, container_id=None, no /ready, docker kill. Remote-mode landing will leave orphans.
  - **FIX**: Same as A2 + label-based reconcile sweep for containers AND networks.

## P0 — Performance (D4)

**P1**: L3 jury sequential. `jury_aggregate_activity` calls 3× synchronous `CodexCLIProvider.completion(timeout=300)` in for-loop. Worst-case 900s + event-loop starvation.
  - **FIX**: `asyncio.gather(asyncio.to_thread(panel_1), asyncio.to_thread(panel_2), asyncio.to_thread(panel_3))`. Add ambiguous-verdict load test.

**P2**: docker-py sync calls in async event loop (overlaps A2 + R4). Every `containers.run/reload/kill/remove` blocks worker.
  - **FIX**: Dedicated `ThreadPoolExecutor` per spawn concurrency, NOT the default pool.

**P3**: No 100-concurrent-task throughput story. `max_concurrent_activities=8` + `mem_limit=2g` + `nano_cpus=2` but no host capacity/backpressure model.
  - **FIX**: Sandbox-slot semaphore from host CPU/RAM/Docker limits. Reject or queue above capacity. Benchmark N=8/32/100.

**P4**: `JuryQuotaLedger` doesn't enforce 5h rolling cost budget. Released slots free immediately → unlimited juries inside 5h.
  - **FIX**: Separate concurrency slots from rolling spend quota. Count all acquired jury runs in 5h window (released or not).

## P0 — Observability (D5)

**O1**: No business-level OTel spans. Only Temporal `TracingInterceptor`. `openhands_run_activity`, L0, L1, L2, L3, cleanup don't create spans or set required attrs.
  - **FIX**: Wrap each activity/cleanup phase in explicit spans. Set attrs (conversation_id, workspace_mode, container_id, elapsed_sec, jury_verdict, slo_class). `record_exception()` + `set_status(ERROR)` on failures.

**O2**: Langfuse LLM trace/cost attribution absent. Routine LLM + codex jury calls NOT bound to Langfuse generations/session IDs. Token usage NOT captured.
  - **FIX**: Langfuse trace per conversation_id. Generation per routine/jury call. `session_id=conversation_id`. Record prompt/completion/total tokens + model/provider.

**O3**: OTel spool not actually replayable. `otel_spool.py` writes `repr(span)` bytes; `replay_loop()` is an explicit stub.
  - **FIX**: Serialize true OTLP protobuf/JSON via SDK exporter path. Implement replay delete-on-success/backoff-on-failure. Unskip Langfuse-disconnect replay e2e.

**O4**: `doctor`/`reconcile` miss remote-mode coverage. Reconcile only removes networks; doctor doesn't check Temporal reachability, Langfuse/OTLP, spool writability, OAuth cache, image presence, data-converter wiring.
  - **FIX**: Extend doctor + reconcile to validate/sweep W376 container labels + image/digest + OTLP/Langfuse health + spool path + OAuth + Temporal worker/server state.

**O5**: SearchAttributes incomplete. `SLOClass` + `ManualReviewPending` defined but never upserted.
  - **FIX**: Upsert `SLOClass` at start, update `ManualReviewPending` + breach-risk periodically.

## P0 — Cite/SOTA (D6)

**C1**: False present-tense Langfuse claim. SYNTHESIS §15.3/§16.3 says "We already run T5 Langfuse v3.174.1" but `CLAUDE.md:36` shows DOWN-CRASH-LOOP.
  - **FIX**: Replace with "image/version present but service currently down; Goose triple-observability is aligned but not reproducible until T5 Langfuse recovery is proven by live probe."

**C2**: Carry-forward inventory missing. §10 lists P0-1..P0-10 but no consolidated C10/C11/C12 + W377+ table.
  - **FIX**: Add §11 (or §18) "Carry-forward inventory" table: ID, source stream, severity, target text, owner wave.

**C3**: Verify-before-claim violation. "5/5 tests passing 2026-05-23 00:53" without command transcript/exit code/artifact.
  - **FIX**: Attach exact command + exit code, OR downgrade to "S5 reports 5/5 passing; independent re-run pending."

## P1 — Additional findings (severity-substantive)

| ID | Dim | Description | Fix |
|---|---|---|---|
| A5 | D1 | `assert container_ctx is not None` production-unsafe (assertions can be optimized away) | Raise `ValueError("remote workspace_mode requires container_ctx")` |
| A6 | D1 | Spec data-flow uses `str(uuid4())` not `spec.conversation_id` | Use `conversation_id=spec.conversation_id` for correlation |
| S4 | D2 | HMAC nonce entropy 16 bytes not ≥32 | Change to `secrets.token_urlsafe(32)` |
| S5 | D2 | Container hardening incomplete: `read_only=False`, no `pids_limit`, unnecessary `cap_add=["NET_BIND_SERVICE"]` | Full hardening: `read_only=True`, `pids_limit`, `cap_drop=["ALL"]`, `security_opt=["no-new-privileges:true"]` |
| S6 | D2 | OAuth credential file ACL unverified | Run `icacls Z:/claude-sota-installed-state/.codex/auth.json`, require owner-only |
| S7 | D2 | Codex profile selection from `model.split("/", 1)[1]` — untrusted-input risk | Enforce profile allowlist |
| R5 | D3 | `l0_validate_activity` raises TaskSpecError without `ApplicationError(type="TaskSpecError", non_retryable=True)` | Raise typed ApplicationError + `non_retryable_error_types` on activity |
| R6 | D3 | IdempotentReplayer cross-process race (SELECT-then-INSERT) | `BEGIN IMMEDIATE` or `INSERT OR IGNORE`/UPSERT |
| R7 | D3 | `gc_async` maps non-RUNNING → local FAILED (incl. completed/cancelled) | Map Temporal terminal states to matching local terminal |
| R8 | D3 | OscillationDetector no success-clear API | Add `record_success(task_id)` + wire to retry/escalation |
| R9 | D3 | `graceful_shutdown_timeout` not set (defaults 0s) | `Worker(..., graceful_shutdown_timeout=timedelta(seconds=300))` |
| P5-10 | D4 | Cold-start histograms unmeasured; spec/plan drift; resource isolation gaps; OTel spool overhead; payload sizing | Various — see D4 OUTPUT for detail |
| O6-10 | D5 | Heartbeat-details CLI surface; bounded histograms; event-store sparsity; C8 replay deferred; MLflow defer | Various — see D5 OUTPUT for detail |
| C4-7 | D6 | § numbering jumps §10→§12; header scope says 8 streams (actually 12); repo discovery exclusions unjustified; cite density uneven in §16 | Renumber + update scope + appendix + add §16 file-line anchors |

---

## Convergent-evidence concentration

3+ dimensions converge on:

1. **Conversation lifecycle rewrite** (A1, R3, R4) — callbacks + sync send + blocking run in to_thread + separate watchdog
2. **Agent-server spawn correction** (A2, R4, S2) — 8000/ready/env-mint/stop(30s) + secure env-pre-spawn
3. **Pydantic data converter wiring** (A3, R2) — at every Client.connect site
4. **Standalone primitives → dispatch path integration** (R1, P4) — admission/retry coordinator
5. **Docker-py sync-to-async offload** (A2, R4, P2) — dedicated ThreadPoolExecutor
6. **Container security hardening** (S2, S5, R4) — env-pre-spawn + read_only + cap_drop

These 6 themes drive the synthesis-v3 revision.

---

## Recommended next steps

**Synthesis-v3**: Apply all 23 P0s to SYNTHESIS.md + cascade to W376 spec + plan
**Codex r2**: Re-fire 6-dim parallel review to verify convergence to APPROVE 0.85+
**Iterate**: r3-r6 if any dim still BLOCKs

Target: all 6 dims APPROVE before PHASE D implementation begins.
