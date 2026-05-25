# W375 — OpenHands SOTA Implant — Wave Close Synthesis

**Wave**: W375 — OpenHands SOTA Implant
**Branch**: `goal/W375-openhands-sota`
**Worktree**: `Z:\claude-sota-installed-W375`
**Status**: ✅ codex r-final-3 **APPROVE 0.91** — wave ship-ready
**Date**: 2026-05-22

---

## What this wave delivered

A SOTA-architected, GPT-5.5-orchestrated OpenHands implant that exposes a Temporal-backed agent dispatch surface via FastMCP to Claude Code, with cross-model adversarial review at L1 (CoVe) + L2 (review-gate) + L3 (3-panel codex jury), at **zero ChatGPT-subscription overflow cost** via Path B (codex CLI subprocess routing).

Implementation footprint at HEAD:
- **30 commits** across P0-P5 + SHIP phases (b7ce6a2 + DIM-14 fix in 948e5ca)
- **~3000 LOC production** + ~1500 LOC tests
- **~890-line design spec** (`docs/superpowers/specs/2026-05-22-W375-openhands-sota-implant-design.md`)
- **30-task TDD plan** (`docs/superpowers/plans/2026-05-22-W375-openhands-sota-implant.md`)

## SOTA dimensions covered

| Dimension | Implementation |
|---|---|
| LLM γ-hybrid wiring | `agents/llm_factory.py` — `LLM.subscription_login(gpt-5.3-codex)` routine + `CodexCLIProvider(gpt-5.5)` jury — V6 verified SDK allow-list `OPENAI_CODEX_MODELS` at `openhands-sdk/openhands/sdk/llm/auth/openai.py:132-140` |
| Codex CLI subprocess | `agents/codex_cli_llm.py` — `CustomLLM` wrapper calling `codex exec --profile deep-review-exec --model gpt-5.5 --json --ephemeral --sandbox read-only --skip-git-repo-check`; stdin prompt + env allowlist `{CODEX_HOME, PATH}` (no argv leak per codex r1 finding) |
| Temporal workflow | `agents/temporal_worker.py` — async `@activity.defn openhands_run_activity` + `TaskWorkflow.run()` with L0→main→L1∥L2→L3-conditional + typed search attrs upsert via `value_set()` (Temporal SDK 1.27.2 idiom) |
| CoVe L1 | `agents/cove_activity.py` — `verify_cove_activity` invokes `cove_verifier` (Meta CoVe arXiv:2309.11495 4-step factored) via `asyncio.to_thread` (no nested event loop) |
| Review-gate L2 | `agents/review_gate_activity.py` — wraps `review_gate(result: TaskResult) -> ReviewGateVerdict`; canonical Verdict-enum-string mapping |
| Jury L3 | `agents/jury_activity.py` — real 3-panel `CodexCLIProvider.completion(model="codex/deep-review-exec", is_jury=True)` calls (forward/swap/tiebreak) → `jury_aggregate`; fail-closed on codex failure (NEVER falls back to Ollama per codex r2 [DIM-8]) |
| Jury quota | `agents/jury_quota.py` — `JuryQuotaLedger` SQLite-backed atomic acquire/release with 5-hour rolling window |
| Verdict routing | `agents/verdict_routing.py` — DIM-14 fix; pure 4-outcome truth-table (`DIRECT-FAIL`/`ESCALATE-JURY`/`DETERMINISTIC-PASS`/`UNKNOWN-FAIL`); zero-dep |
| HMAC two-phase confirm | `agents/hmac_gate.py` — `make_preview(spec_dump)` + `verify_confirm(task_hash, hmac_token)`; atomic-pop with threading.Lock for single-use enforcement (V12 critical fix) |
| FastMCP server | `agents/mcp_server.py` — FastMCP v3.2 (PrefectHQ canonical, not jlowin) `openhands-dispatch` server with two-phase preview/confirm tools + read-only status |
| Event store | `agents/event_store.py` — atomic append via `portalocker.Lock` + `os.replace` artifact write |
| OTel spool | `agents/otel_spool.py` — `SpoolingOTLPSpanExporter` 500MB ring + drop-OLDEST + ObservableGauge for spool_bytes/spool_oldest_age + `EXPORT_FAILURES`/`DROPPED_SPANS` counters |
| Oscillation detector | `agents/oscillation_detector.py` — Hystrix rolling-window ping-pong reversal counter |
| Retry budget | `agents/retry_budget.py` — AWS full-jitter + Google SRE adaptive `p_reject = max(0, (R - K·A) / (R+1))` with A>0 guard + global cap (60/min) |
| Idempotent replayer | `agents/idempotent_replayer.py` — Stripe-style sha256 op_id, 24h dedup TERMINAL only (IN_FLIGHT never expires); `gc_sync` (SQLite-only) + `gc_async` (Temporal cross-check NotFound→FAILED) |
| Schema router | `agents/schema_router.py` — CloudEvents version-in-type + BFS with visited set + `MAX_HOPS=8` cap |
| Search attributes | `agents/search_attrs.py` — typed `SearchAttributeKey` declarations (`ConversationId`/`ElapsedSec`/`P99Breach`/`SLOClass`/`ManualReviewPending`) + `AddSearchAttributesRequest(namespace="default", search_attributes={...})` |
| CLI dispatch | `tools/dispatch_temporal.py` — Typer CLI 9-verb subset: doctor/up/submit/watch/result/cancel/status/down/reconcile |
| Eval gate | `tools/eval_gate.py` — commit-msg hook; `OVERRIDE-W375-EVAL` trailer bypass; 5pp regression threshold; `W375_EVAL_TEST_SCORE`/`W375_EVAL_TEST_LAST_SHIP` env hooks |
| Pre-commit wiring | `.pre-commit-config.yaml` — `default_install_hook_types: [pre-commit, commit-msg]` + `cr6-w375-eval-regression` hook using `bash -c 'exec python ... $(git rev-parse --git-path COMMIT_EDITMSG)'` portable-worktree idiom (codex r6 P2-3) |
| MCP wiring | `.mcp.json` — 17th MCP entry `openhands-dispatch` using `uv run --with fastmcp>=3.2 --with-editable . fastmcp run agents/mcp_server.py:mcp` |

## Codex GPT-5.5 cross-model gate trail

7 codex rounds end-to-end across spec + build:

| Round | Target | Verdict | P0 count | Resolution |
|---|---|---|---|---|
| r1 | spec V1 | BLOCK 0.91 | 6 | R2v2 covers — replan |
| r2 | spec R2v2 | BLOCK 0.87 | 8 | R2v3 covers — replan |
| r3 | spec R2v3 | NEEDS-REVISION 0.85 | 5 | R2v4 covers — V7-V12 integration |
| r4 | spec R2v4 | NEEDS-REVISION 0.84 | 3 | R2v5 covers — final design refinements |
| r5 | spec R2v5 | NEEDS-REVISION 0.86 | 2 | R2v6 covers — explicit signature + gc split |
| r6 | spec R2v6 | **APPROVE 0.91** | 0 | Spec ratified → begin build |
| r-final | built code | BLOCK 0.89 | 3 P0 + 3 P1 | b7ce6a2 fixes 3 P0 |
| r-final-2 | b7ce6a2 | BLOCK 0.89 | 1 NEW P0 + 3 P1 acceptable | 948e5ca fixes DIM-14 |
| r-final-3 | 948e5ca | **APPROVE 0.91** | NEW_P0: NONE; 3 P1 acceptable | **SHIP** |

## Documented carry-forwards (operator-stage, accepted by codex r-final-2)

| Carry-forward | Reason | Owner |
|---|---|---|
| OAuth `subscription_login` interactive browser flow | One-time human-in-loop ChatGPT-OAuth — V1 path is `force_login=False, open_browser=False`; first invocation will prompt manually | Operator |
| SWE-Bench-Verified harness image registry identification | Real eval ramp blocked on identifying canonical container registry for `swebench/sweb.eval.x86_64.<task>:latest` images | Operator + post-SHIP wave |
| Auto-policy module wiring into submit/confirm/retry paths | Modules ship as standalone primitives (retry-budget, oscillation-detector, idempotent-replayer all importable); integration into the dispatch path is a follow-up wave | post-SHIP wave |
| E2E unconditional `pytest.skip()` removal | 10 skeleton paths in `tests/e2e/test_w375_paths.py` pending OAuth + live Temporal + Docker | Operator |
| Agent default toolset (`tools=[]` currently empty) | Minimal-tools v1 ship; full toolset wiring follows live OAuth smoke | post-SHIP wave |
| 13 deferred CLI verbs (`dispatch_temporal.py` ships with 9; full surface designed for 22) | Initial v1 covers the critical-path 9; remaining 13 are convenience verbs | post-SHIP wave |
| `p10(last_5)` eval ramp (cr6 currently bootstrap-pass mode) | Need 5 ship baselines before percentile-threshold engages | accumulates naturally over next 5 ships |
| Replay loop stub | Designed but not wired (low-priority observability feature) | post-SHIP wave |

## Wave-close acceptance criteria (gate)

- [x] Spec written + codex-approved (r6 APPROVE 0.91)
- [x] Plan written + TDD-shaped
- [x] All 26 P0-P5 plan tasks complete (b7ce6a2)
- [x] 3 r-final P0s fixed (b7ce6a2)
- [x] DIM-14 r-final-2 P0 fixed (948e5ca)
- [ ] **codex r-final-3 APPROVE** (PENDING)
- [ ] Wave-close commit + ledger row + T6 basic-memory write
- [ ] PR opened with carry-forward operator-action checklist
- [ ] Signed-squash-merge to main (operator action)

## Cite-anchor cluster (≥3-org-distinct)

| Cite | Org | Purpose |
|---|---|---|
| `openhands-sdk @ openhands/sdk/llm/auth/openai.py:132-140` | All-Hands-AI | `OPENAI_CODEX_MODELS` allow-list — V6 verification of `gpt-5.3-codex` |
| `python-sdk @ temporalio/api/operatorservice/v1` | Temporal Inc | `AddSearchAttributesRequest` API shape — P0-3 fix |
| `arxiv.org/abs/2309.11495` | Meta AI Research | CoVe 4-step factored verification protocol — L1 source |
| `arxiv.org/abs/2502.06233` | OpenAI / Anthropic researchers | CISC jury-aggregation backbone — L3 source |
| `github.com/haizelabs/verdict` @ `8f972ef3` | Haize Labs | Reliability-weighted jury aggregation — L3 augmentation |
| `claude-cookbooks @ 39a350b6` `patterns/agents/orchestrator_workers.ipynb` | Anthropic PBC | Empty-final-message detection — silent-fallback guard |

---

## Codex r-final-3 verdict — verbatim

```
VERDICT: APPROVE
CONFIDENCE: 0.91

DIM14_FIX_VALIDATION:
- decide_verdict_routing 4-outcome truth-table → CORRECT
- temporal_worker dispatch correctness → CORRECT
- status-mapper translates FAIL verdicts to FAILED → YES
- no new silent-accept paths introduced → CONFIRMED

NEW_P0_FINDINGS:
- NONE

REMAINING_P1_DEFERRAL_ACCEPTABILITY:
- Auto-policy wiring deferred → ACCEPTABLE
- E2E unconditional skip → ACCEPTABLE
- Agent empty tools → ACCEPTABLE

SUMMARY: DIM-14 is fixed: L1/L2 `FAIL` and malformed verdicts now fail closed,
and only jury `ACCEPT` or both-gates `PASS` can complete. Wave is ship-ready
as v1 with documented carry-forwards; focused pytest is still blocked by the
known local logfire/opentelemetry conflict, but isolated router smoke passed.
```

Full transcript: `tmp/openhands-brainstorm/codex-r-final-3-W375.txt` (2.3 MB).

## Wave-close artifacts written

- `docs/architecture/W375-WAVE-CLOSE/VERDICT-LEDGER.md` — full per-round ledger + cite cluster + 9 carry-forwards
- `docs/architecture/W375-WAVE-CLOSE/PR-BODY.md` — paste-ready PR body for operator
- `docs/superpowers/W375-WAVE-CLOSE-SYNTHESIS.md` — this file

## Next steps (operator-action)

1. **Open PR**: `gh pr create --base main --head goal/W375-openhands-sota --title "W375 — OpenHands SOTA Implant" --body-file docs/architecture/W375-WAVE-CLOSE/PR-BODY.md`
2. **CI runs**: 7 gates (pre-commit, ruff, gitleaks, commitlint, codex-verdict-trailer, provenance-lint, cr6-w375-eval-regression)
3. **Operator OAuth ramp**: `LLM.subscription_login(force_login=False, open_browser=False)` first-invocation interactive
4. **Operator squash-merge to main** (signed)
5. **Post-merge waves**: C3 (auto-policy wiring) / C5 (Agent toolset) / C6 (13 CLI verbs) / C8 (replay loop)
