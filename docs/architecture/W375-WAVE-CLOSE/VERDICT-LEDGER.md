# W375 — OpenHands SOTA Implant — Verdict Ledger

**Wave**: W375 — OpenHands SOTA Implant (Temporal-OpenHands γ-hybrid + GPT-5.5 cross-model gate)
**Branch**: `goal/W375-openhands-sota`
**Worktree**: `Z:\claude-sota-installed-W375`
**Date**: 2026-05-22
**Final verdict**: **APPROVE 0.91 (codex r-final-3)**

---

## Round-by-round cross-model gate trail

| Round | Target | Verdict | Conf | P0 / Findings | Resolution |
|---|---|---|---|---|---|
| **Spec rounds** | | | | | |
| r1 | spec V1 | BLOCK | 0.91 | 6 P0 | Replan → R2v2 |
| r2 | spec R2v2 | BLOCK | 0.87 | 8 P0 | Replan → R2v3 |
| r3 | spec R2v3 | NEEDS-REVISION | 0.85 | 5 P0 | Replan → R2v4 |
| r4 | spec R2v4 | NEEDS-REVISION | 0.84 | 3 P0 | Replan → R2v5 |
| r5 | spec R2v5 | NEEDS-REVISION | 0.86 | 2 P0 | Replan → R2v6 |
| r6 | spec R2v6 | **APPROVE** | 0.91 | 0 P0 | Spec ratified → begin build |
| **Build rounds** | | | | | |
| r-final | built code | BLOCK | 0.89 | 3 P0 (DIM-2, DIM-4, DIM-10) + 3 P1 | Fix commit `b7ce6a2` |
| r-final-2 | `b7ce6a2` | BLOCK | 0.89 | 3 prior P0 FIXED; 1 NEW P0 (DIM-14); 3 P1 acceptable | Fix commit `948e5ca` |
| r-final-3 | `948e5ca` | **APPROVE** | 0.91 | DIM-14 fix CORRECT; NEW_P0: NONE; carry-forwards ACCEPTABLE | **SHIP** |

## Cite-anchor cluster (≥3-org-distinct per sca-v18)

| Cite | Org | Purpose | License |
|---|---|---|---|
| `All-Hands-AI/OpenHands` @ `openhands/sdk/llm/auth/openai.py:132-140` | All-Hands-AI | `OPENAI_CODEX_MODELS` allow-list (V6 verify) | MIT |
| `temporalio/python-sdk` v1.27.2 | Temporal Inc | `AddSearchAttributesRequest` API (P0-3 fix) | MIT |
| `arxiv.org/abs/2309.11495` (Meta CoVe) | Meta AI Research | L1 CoVe 4-step factored protocol | preprint |
| `arxiv.org/abs/2502.06233` (CISC jury) | Anthropic+OpenAI researchers | L3 jury aggregation backbone | preprint |
| `haizelabs/verdict` @ `8f972ef3` | Haize Labs | Reliability-weighted jury (W369 P1.2) | MIT |
| `anthropics/claude-cookbooks` @ `39a350b6` | Anthropic PBC | Empty-final-message detection | MIT |
| `PrefectHQ/fastmcp` v3.2 | PrefectHQ | MCP server framework | Apache-2.0 |
| `stripe/openapi` (sha256 idempotency-key pattern) | Stripe | `IdempotentReplayer` design | MIT (docs) |

8 distinct orgs; no single org >50% — sca-v18 floor PASSED.

## DIM-14 codex r-final-2 P0 fix — verbatim

**Codex r-final-2 finding**:
> [DIM-14] L1/L2 FAIL verdicts are silently accepted: `TaskWorkflow` only escalates `AMBIGUOUS`; every other L1/L2 combination becomes `DETERMINISTIC-PASS`, so an L1 or L2 `FAIL` can complete as success.

**Fix applied (commit `948e5ca`)**:

Extracted verdict-routing into pure zero-dependency function `agents/verdict_routing.py:decide_verdict_routing()` with explicit 4-outcome truth-table:
- `DIRECT-FAIL` — either gate FAIL → short-circuit BLOCK (no jury burn)
- `ESCALATE-JURY` — either gate AMBIGUOUS (neither FAIL) → L3 jury
- `DETERMINISTIC-PASS` — BOTH PASS only (formerly all-non-AMBIGUOUS; now restricted)
- `UNKNOWN-FAIL` — unknown/empty verdict → defensive BLOCK

**Codex r-final-3 validation (verbatim)**:
> DIM-14 is fixed: L1/L2 FAIL and malformed verdicts now fail closed, and only jury ACCEPT or both-gates PASS can complete. Wave is ship-ready as v1 with documented carry-forwards; focused pytest is still blocked by the known local logfire/opentelemetry conflict, but isolated router smoke passed.

18-case truth-table direct-python smoke: **18 passed, 0 failed**.

## Documented carry-forwards (operator-stage, codex-accepted)

| # | Carry-forward | Reason | Owner |
|---|---|---|---|
| C1 | OAuth `subscription_login` interactive browser flow | One-time human-in-loop ChatGPT-OAuth; `force_login=False, open_browser=False` will prompt manually on first invoke | Operator |
| C2 | SWE-Bench-Verified harness image registry identification | Real eval ramp blocked on canonical container registry for `swebench/sweb.eval.x86_64.<task>:latest` | Operator + post-SHIP wave |
| C3 | Auto-policy module wiring into submit/confirm/retry paths | Modules ship standalone; integration into dispatch path is follow-up | post-SHIP wave |
| C4 | E2E unconditional `pytest.skip()` removal | 10 skeleton paths in `tests/e2e/test_w375_paths.py` pending OAuth + live Temporal + Docker | Operator |
| C5 | Agent default toolset (`tools=[]` currently empty) | Minimal-tools v1 ship; full toolset follows live OAuth smoke | post-SHIP wave |
| C6 | 13 deferred CLI verbs (ships 9/22) | Initial v1 covers critical-path 9; remaining 13 are convenience | post-SHIP wave |
| C7 | `p10(last_5)` eval ramp (cr6 currently bootstrap-pass mode) | Needs 5 ship baselines before percentile-threshold engages | accumulates over next 5 ships |
| C8 | Replay loop stub | Designed but not wired (low-priority observability) | post-SHIP wave |
| C9 | Local pytest blocked by logfire/opentelemetry version conflict | System Python `logfire` auto-loads `opentelemetry.sdk._logs.ReadableLogRecord` which isn't in installed `opentelemetry-sdk`; not in W375 scope | Operator |

## Wave-close acceptance — full checklist

- [x] Spec written + codex-approved (r6 APPROVE 0.91)
- [x] Plan written + TDD-shaped (30 tasks)
- [x] All 26 P0-P5 plan tasks complete (b7ce6a2)
- [x] 3 r-final P0s fixed (b7ce6a2: DIM-2 jury, DIM-4 L1/L2, DIM-10 search-attrs)
- [x] DIM-14 r-final-2 P0 fixed (948e5ca: verdict-routing extracted)
- [x] **codex r-final-3 APPROVE 0.91**
- [x] Wave-close ledger row written (this file)
- [x] Wave-close synthesis written (`docs/superpowers/W375-WAVE-CLOSE-SYNTHESIS.md`)
- [ ] T6 basic-memory note (write_note pending — see "Next steps" below)
- [ ] PR creation with carry-forward operator-action checklist (operator-stage)
- [ ] Signed-squash-merge to main (operator action only)

## Commit lineage (top of branch)

```
948e5ca fix(W375 SHIP.2): codex r-final-2 DIM-14 P0 (L1/L2 FAIL silently accepted)
b7ce6a2 fix(W375 SHIP.2): codex r-final 3 P0 bugs (jury synthetic, L1/L2 silent-degrade, search-attrs API)
...
```

182 commits total ahead of `main`.

## Next steps (operator-action)

1. Open PR: `gh pr create --base main --head goal/W375-openhands-sota --title "W375 — OpenHands SOTA Implant" --body-file docs/architecture/W375-WAVE-CLOSE/PR-BODY.md`
2. CI runs (7 checks: pre-commit, ruff, gitleaks, commitlint, codex-verdict-trailer, provenance-lint, cr6-w375-eval-regression)
3. Operator-side OAuth `subscription_login` ramp (carry-forward C1)
4. Operator review + squash-merge to `main` (signed)
5. Post-merge follow-up waves for C3 / C5 / C6 / C8

## Cardinal-rule conformance

| Rule | Status | Evidence |
|---|---|---|
| CR-1: trusted-source primitives | ✅ | All 8 cite-anchors org-distinct, MIT/Apache-2.0/preprint licensed, SHA-pinned |
| CR-2: no project-owned hook bodies | ✅ | `cr6-w375-eval-regression` uses `bash -c 'exec python tools/eval_gate.py $(git rev-parse --git-path COMMIT_EDITMSG)'` — direct-CLI invocation, no shim |
| CR-3: installed-plugin subagents | ✅ | All Agent dispatches used FQN form (`agent-skills:*`, `superpowers:*`); subagent-validator gate green |
| CR-4: project behavior in settings.json | ✅ | `.mcp.json` for MCP servers; `.pre-commit-config.yaml` for hooks; no `.claude/rules/*.md` added |
| CR-5: safety via CC permissions + sandboxing | ✅ | `codex exec --sandbox read-only --ephemeral` for L3 jury; FastMCP HMAC two-phase confirm for mutating MCP tools |
| CR-6: verify-before-claim | ✅ | All "DONE/APPROVE" claims cite-anchored to specific codex round + commit SHA + truth-table evidence |

---

# W376 PHASE D — Implementation Ship-Gate Addendum (2026-05-23)

**Wave**: W376 — OpenHands SDK Alignment (full TDD implementation of the 28-task plan)
**Final verdict**: **APPROVE 0.91 (codex GPT-5.5 shipgate-r4)** · model_reasoning_effort=high

## PHASE D ship-gate convergence trail

| Round | Target | Verdict | Conf | Findings | Resolution |
|---|---|---|---|---|---|
| shipgate-r1 | PHASE D code `4ba97db..734caba` (13 commits, 39 files) | **BLOCK** | 0.91 | 3 P0 (egress not fail-closed; CLI pydantic-converter missing; CLI admission bypass) + 3 P1 (langfuse v4 session-attr; L0 non-retryable; test masking) | 3 file-disjoint fix agents (opus, write-and-test-no-commit) |
| shipgate-r2 | fix diff | NEEDS-REVISION | 0.88 | 5/6 FIXED; sole blocker = autoflake-stripped `pydantic_data_converter` import | orchestrator re-added import |
| shipgate-r3 | fix diff | NEEDS-REVISION | 0.87 | ALL 6 production FIXED; gap = jury token-attr test only key-presence (+ AST audit found `AdmissionCoordinator` import ALSO stripped → re-added) | strengthened jury test to assert input/output/total |
| shipgate-r4 | fix diff | **APPROVE** | 0.91 | All 6 FIXED; NEW_FINDINGS: none | **SHIP** |

## The 6 findings → resolution

| ID | Finding | Fix | Commit |
|---|---|---|---|
| P0-1 | Remote egress not fail-closed (per-task net was a plain bridge, no `--internal`) | `_ensure_network` passes `--internal`; sidecar dual-home preserves allowlisted egress | `2d937be` |
| P0-2 | CLI `Client.connect` sites omit `data_converter` | DRY `_connect_temporal()` helper + `pydantic_data_converter` import | `65cce7c` |
| P0-3 | CLI submit bypasses admission; op_id omits `workspace_mode` | route through `AdmissionCoordinator.submit_workflow` + op_id includes workspace_mode | `65cce7c` |
| P1-1 | langfuse v4 session via metadata not native API | `propagate_attributes` + `start_as_current_observation` (lazy import, redaction kept) | `b140459` |
| P1-2 | L0 invalid-spec retried | `ApplicationError(non_retryable=True)` + `RetryPolicy(non_retryable_error_types)` | `b140459` |
| P1-3 | tests mask gaps | converter test hard-assert; egress internal-net + direct-route-denial; token-attr {input,output,total} | `2d937be`+`65cce7c`+`b140459` |

**Bonus catch (verify-before-claim)**: the autoflake PostToolUse hook stripped TWO imports
(`pydantic_data_converter` + `AdmissionCoordinator`) added-while-momentarily-unused; the AST +
`exec_module` audit caught both (codex only flagged the first). Resolved + deterministically verified.

## Test evidence

- Full venv suite (`Z:/venvs/claude`): **279 passed, 31 skipped**. The 7 failed + 116 errors are 100% PRE-EXISTING non-W376 (`test_*_security.py` testing W255-removed `.claude/hooks/scripts` hooks; `test_mcp_server.py` fastmcp env import; `test_w130_*`).
- `exec_module(dispatch_temporal)` clean: `DISPATCH_EXEC_OK adm=True pdc=True`.

## Commits (this addendum)

```
5e9ab0e docs(W376+W378): ship-gate verdict + W378 sca-v20 convergence synthesis
65cce7c fix(W376-shipgate-P0-2+P0-3): CLI pydantic converter + admission routing
b140459 fix(W376-shipgate-P1-1+P1-2): langfuse v4 session-attr + L0 non-retryable
2d937be fix(W376-shipgate-P0-1): egress fail-closed — per-task net --internal
```

## W378 SOTA-convergence synthesis (sca-v20, committed `5e9ab0e`)

16 repos scored. Top INSTALL signal = wshobson/agents EXPAND + plugin-eval (mechanizes the
sca-v20 quality-gate). OpenHands / gpt-researcher / Dify → PATTERN-STUDY. Composio → staged-pilot
INSTALL. No installed-repo drift. 9 carry-forwards; all INSTALL-class promotions operator-sign-gated.

## W376 carry-forwards

| # | Carry-forward | Owner |
|---|---|---|
| CF-W376-1 | Live e2e (Tasks 13-14) blocked on operator-sign'd `pip install openhands-sdk==1.22.1` into shared venv | Operator (CR-1) |
| CF-W376-2 | Pre-existing `test_*_security.py` failures (W255-removed hooks) + `test_mcp_server.py` fastmcp env | post-ship cleanup |
| CF-W376-3 | autoflake-strips-momentarily-unused-imports hazard — consider `# noqa` or import-ordering guard | post-ship |
| CF-W378-1..9 | W378 adoption-degree decisions (INSTALL-class operator-sign-gated) | Operator + codex-gate |
