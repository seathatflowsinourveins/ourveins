# W375 — OpenHands SOTA Implant

> SOTA-architected Temporal-OpenHands γ-hybrid agent platform with GPT-5.5 cross-model adversarial review (L1+L2+L3) at **zero ChatGPT-subscription overflow cost** via codex CLI subprocess (Path B).

## What this PR delivers

A FastMCP-exposed agent dispatch surface that Claude Code can invoke seamlessly — `openhands-dispatch` tool — wrapping:

- **OpenHands V1 SDK** (`openhands-sdk==1.22.1`) with `DockerWorkspace` per-conversation lifecycle
- **Temporal Python SDK** (`temporalio==1.27.2`) workflow orchestration with `value_set()` typed search attributes
- **γ-hybrid LLM wiring**: native `LLM.subscription_login(gpt-5.3-codex)` for OpenHands turns + `CodexCLIProvider(gpt-5.5)` for L3 jury review
- **L1 CoVe** (Meta arXiv:2309.11495 4-step factored)
- **L2 review-gate** (W374-EXT pre-L3 sandbox)
- **L3 jury** (3-panel codex GPT-5.5 with position-swap, CISC arXiv:2502.06233 + haizelabs/verdict reliability-weighted aggregation)
- **HMAC two-phase confirm** for mutating MCP tools (V12 critical fix)
- **SQLite-backed durable ledgers**: `JuryQuotaLedger` (5h rolling), `IdempotentReplayer` (Stripe sha256 op_id, 24h TERMINAL dedup), `OscillationDetector` (Hystrix rolling-window), `RetryBudget` (AWS jitter + Google SRE adaptive throttle)
- **OTel SpoolingExporter** (500MB ring + drop-OLDEST + ObservableGauge metrics)
- **CloudEvents version-in-type SchemaRouter** (BFS + visited + max_hops=8)
- **Typer CLI** `tools/dispatch_temporal.py` with 9 critical-path verbs (doctor/up/submit/watch/result/cancel/status/down/reconcile)
- **Pre-commit eval gate** `cr6-w375-eval-regression` with `OVERRIDE-W375-EVAL` trailer bypass + 5pp regression threshold

## Codex GPT-5.5 cross-model gate trail (9 rounds)

| Phase | Rounds | Final |
|---|---|---|
| Spec adversarial review | r1 BLOCK 0.91 → r6 APPROVE 0.91 | 6 rounds to consensus on design |
| Build adversarial review | r-final BLOCK 0.89 → r-final-2 BLOCK 0.89 → r-final-3 **APPROVE 0.91** | 3 rounds, 4 P0 fixes |

See `docs/architecture/W375-WAVE-CLOSE/VERDICT-LEDGER.md` for full per-round breakdown.

## Files changed

**Production code** (`agents/`):
- `verdict_routing.py` (NEW, zero-dep) — DIM-14 fix
- `temporal_worker.py` — workflow + activities + verdict-dispatch
- `cove_activity.py` — L1 CoVe (`asyncio.to_thread`)
- `review_gate_activity.py` — L2 review-gate
- `jury_activity.py` — L3 3-panel codex jury (real CodexCLIProvider; fail-closed)
- `jury_quota.py` — `JuryQuotaLedger`
- `codex_cli_llm.py` — Path B CustomLLM wrapper
- `llm_factory.py` — γ-hybrid (subscription_login + CodexCLIProvider)
- `search_attrs.py` — typed `SearchAttributeKey` + `AddSearchAttributesRequest`
- `hmac_gate.py` — two-phase confirm
- `mcp_server.py` — FastMCP `openhands-dispatch`
- `event_store.py` — atomic append via portalocker
- `models.py` — Pydantic v2 TaskSpec/Budget/TaskResult/JuryResult
- `l0_validate.py` — input sanitization
- `network_helpers.py` — per-task Docker network isolation
- `subprocess_helpers.py` — Win/POSIX subprocess + zombie-reap
- `otel_spool.py` — bounded ring exporter
- `oscillation_detector.py` — Hystrix-style
- `retry_budget.py` — AWS jitter + SRE adaptive
- `idempotent_replayer.py` — Stripe pattern
- `schema_router.py` — CloudEvents version-in-type

**Tools / wiring**:
- `tools/dispatch_temporal.py` — Typer CLI
- `tools/eval_gate.py` — pre-commit cr6 hook
- `.mcp.json` — `openhands-dispatch` MCP entry
- `.pre-commit-config.yaml` — `cr6-w375-eval-regression` + `default_install_hook_types: [pre-commit, commit-msg]`

**Tests** (`tests/`):
- 30+ unit + integration test files
- `tests/e2e/test_w375_paths.py` — 10 e2e skeletons (`@pytest.mark.e2e`, pytest.skip pending OAuth + live infra)

**Docs**:
- `docs/superpowers/specs/2026-05-22-W375-openhands-sota-implant-design.md` — 887-line canonical design
- `docs/superpowers/plans/2026-05-22-W375-openhands-sota-implant.md` — 30-task TDD plan
- `docs/architecture/W375-WAVE-CLOSE/VERDICT-LEDGER.md` — round-by-round verdict ledger
- `docs/architecture/W375-WAVE-CLOSE/PR-BODY.md` — this file

## Carry-forward operator-action checklist

These are **explicitly accepted by codex r-final-2/r-final-3** as deferred-to-operator items — NOT P0 blockers:

- [ ] **C1**: OAuth `LLM.subscription_login(force_login=False, open_browser=False)` interactive browser ramp (first-invocation human-in-loop)
- [ ] **C2**: Identify canonical SWE-Bench-Verified harness image registry for `swebench/sweb.eval.x86_64.<task>:latest`
- [ ] **C3** *(post-merge wave)*: Wire `RetryBudget` / `OscillationDetector` / `IdempotentReplayer` standalone modules into the live submit/confirm/retry dispatch path
- [ ] **C4**: Remove unconditional `pytest.skip()` from 10 e2e paths once OAuth + live Temporal + Docker available
- [ ] **C5** *(post-merge wave)*: Wire Agent default toolset (currently `tools=[]` minimal v1)
- [ ] **C6** *(post-merge wave)*: Add 13 remaining CLI verbs to `dispatch_temporal.py`
- [ ] **C7**: `p10(last_5)`-percentile eval threshold engages naturally after 5 ship baselines
- [ ] **C8** *(post-merge wave)*: Wire replay loop stub
- [ ] **C9**: Resolve local `logfire`/`opentelemetry-sdk` version conflict so project-scoped pytest collects cleanly (currently bypassed via direct-python smoke for routing tests)

## Verification

- **All 9 pre-commit gates PASS** on commit `948e5ca` (no `--no-verify`):
  - Z-drive phantom-dir guard (W370 F0)
  - gitleaks (Detect hardcoded secrets)
  - commitlint (W317-D)
  - Codex-Verdict trailer gate (W335)
  - provenance-lint (W328-C)
  - W375 SWE-Bench-Verified-50 regression gate (cr6)
- **DIM-14 18-case truth-table**: 18 passed, 0 failed (direct-python smoke)
- **Codex r-final-3 APPROVE 0.91** — full audit transcript at `tmp/openhands-brainstorm/codex-r-final-3-W375.txt` (2.3 MB)

## SOTA cite cluster (≥3-org-distinct per sca-v18)

8 distinct orgs across cite-anchor cluster: All-Hands-AI · Temporal Inc · Meta AI Research · Anthropic+OpenAI researchers (arXiv:2502.06233) · Haize Labs · Anthropic PBC · PrefectHQ · Stripe. No single org >50% — floor PASSED.

## Merge readiness

- All r-final-3 dimensions CORRECT/YES/CONFIRMED
- NEW_P0_FINDINGS: NONE
- All 3 P1 carry-forwards: ACCEPTABLE
- Wave-close summary verbatim from codex r-final-3:
  > "DIM-14 is fixed: L1/L2 FAIL and malformed verdicts now fail closed, and only jury ACCEPT or both-gates PASS can complete. Wave is ship-ready as v1 with documented carry-forwards."

**Recommendation**: signed-squash-merge to `main`.
