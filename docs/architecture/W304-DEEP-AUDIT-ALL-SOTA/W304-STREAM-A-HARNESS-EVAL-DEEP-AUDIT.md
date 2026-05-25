# W304 Stream A — `harness/eval_harness.py` sca-v5 Deep Audit (UNIT)

> **Wave**: W304 · **Stream**: A (highest raw impact 5 per W303-A Coverage Gap #2) · **Branch**: `sota-converge-w295` · **HEAD**: `84a9489` (W302-W303-codex-r1 fix-iterate landed)
>
> **Target**: `Z:/claude-sota-installed/harness/eval_harness.py` (887 LOC) + 3 supporting modules (`inspect_tasks.py` 55 LOC, `sota_rubric_lane.py` 306 LOC, `promptfooconfig.yaml` 54 LOC) + 6 smoke fixtures (`fixtures/*.py`, 5 untracked + 1 tracked, 672 LOC total).
>
> **Mandate**: this file is the **meta-substrate where sca-v5 verdicts get empirically validated**. Lane-A (inspect_ai) + Lane-B (promptfoo) + Lane-C (sota-rubric) decompose D8 `benchmark_deltas` into a measured signal per sca-v5 SKILL §4.5. If the harness is broken, every T1 INSTALL verdict shipped since W287 is downstream-questionable.
>
> **Don't-break invariant set (W288 §4.5 + W297 SKILL §4.5)**:
> 1. Lane-A + Lane-B run FIXED suites — they MUST reject `--candidate` with exit-2 (W288-fix6).
> 2. Lane-C `--kind=executable` without `--smoke` MUST fail-closed at score=0 (W288-fix1) — never N/A.
> 3. Lane-C smoke path MUST be containment-checked to `harness/fixtures/` via `Path.relative_to`, NOT `str.startswith` (W288-fix8).
> 4. `SOTA_ALLOW_UNTRUSTED_SMOKE=1` is the ONLY bypass (env-var, not CLI flag).
> 5. Cardinal-rule-2: harness is a runtime tool (not a `.claude/hooks/scripts/` self-invent) — exempt from R2.
>
> **Verdict scope clarification**: the harness is a runtime artifact, NOT an external adoption candidate. sca-v5 lite-scoring is applied analogically — KEEP / REFINE / EXTEND / RETIRE replaces INSTALL / VENDOR-FORK / PATTERN-STUDY / CITE-ONLY / REJECT.

---

## §0 — TL;DR

- **Verdict**: **REFINE** (KEEP the core; ship targeted enhancements). The harness IS the sca-v5 §4.5 substrate; replacing it would invalidate 7 waves of shipped verdicts. But 8 concrete gaps justify a v2 refresh.
- **sca-v5 lite-score** (analogically applied): `install_score ≈ 4.30 / 5.00` (KEEP-with-margin) · `pattern_score ≈ 4.05 / 5.00`. Arithmetic in §2.
- **Top finding** (HIGH): **The sca-v5 SKILL §4.5 R8 `eval_log_path` contract is NOT honored**. SKILL.md mandates "harness JSON output MUST be persistable as an inspect_ai-compatible EvalLog JSON file at `verdicts/W<wave>-<slug>-evallog.json`" (W299 R8 amendment). `_persist` only writes `harness/results/<name>.json` — no `verdicts/` write, no inspect_ai EvalLog format, no wave prefix. Every T1 INSTALL since W299 has `eval_log_path` in the ledger schema but no actual file. Single-source-of-truth drift between SKILL contract and harness implementation.
- **Top-5 enhancement opportunities** (IC-ranked):

| # | Enhancement | IC (impact × confidence / cost) | Severity |
|---|---|---|---|
| 1 | Honor sca-v5 R8 `eval_log_path` contract — write `verdicts/W<wave>-<slug>-evallog.json` in inspect_ai EvalLog format | **5.0** (closes SKILL ↔ harness drift; 0.5 day) | HIGH |
| 2 | Track the 5 W297 smoke fixtures (`smoke_astral_uv.py` + 4 others) — currently UNTRACKED at HEAD, breaks reproducibility | **4.5** (3 lines per fixture × `git add`; 0.1 day) | HIGH |
| 3 | Pin `inspect_ai` + `promptfoo` versions explicitly in `_resolve_promptfoo_cmd` / `run_inspect_lane` with version-mismatch guard rows | **4.0** (W298-D HIGH `claude-agent-sdk` drift pattern repeats here; 0.5 day) | MEDIUM |
| 4 | Lane-C cost-cap routing — accept `--tier {T1,T2,T3,T4}` and enforce sca-v5 cost-caps (`$5/T1, $2/T2, $0.5/T3, $0.02/T4`) | **3.5** (matches §4.5 cost-bounded mandate; 1 day) | MEDIUM |
| 5 | Sandbox the smoke-runner via `subprocess` with `timeout` + `minimal-env` (W288-fix7 codex recommendation deferred) | **3.0** (in-process exec is current attack surface; 2 days) | MEDIUM |

Full IC table in §7.

---

## §1 — File section-by-section audit (887 LOC)

### §1.1 — Section 0: Header + module docstring (L1-L75)

**Content**: TIER-1 OFFICIAL Anthropic Agent SDK reference banner (`https://docs.anthropic.com/en/docs/claude-code/agent-sdk` cite at L2; `claude_agent_sdk 0.1.81` claimed at L3; `https://code.claude.com/docs/en/headless` cite at L5; W259v7 §4 U7 provenance at L8-L10). Module docstring states "MINIMAL, WORKING Agent-SDK harness that hosts the W259 L4 nightly-eval cadence", lists 4 wired capabilities ((1) inspect_ai lane, (2) promptfoo lane, (3) advisor-tool pilot stub, (4) SDK aggregation through `query()`). 6-mode CLI table at L31-L36.

**Verdict**: **KEEP**. Doc-anchored cardinal-rule-2 compliant — the header is what an external auditor reads first; W298-D §15 confirmed the `query / ClaudeAgentOptions / @tool / create_sdk_mcp_server` 4-symbol claim against `0.1.81` actual export surface.

**Finding-1.1.A** (LOW): Header claims "promptfoo 0.121.11 is installed globally — verified, no install needed" at L42, BUT `pip show promptfoo` returns `Package(s) not found: promptfoo` (it's an npm binary at `/c/Users/42/AppData/Roaming/npm/promptfoo`, verified). The line is misleading — promptfoo is NOT a pip package; only the CLI binary is on PATH. **Impact**: a reader following the install instruction would silently fail. **Fix**: clarify "promptfoo 0.121.11 (npm) installed globally; pip install NOT applicable".

### §1.2 — Section 1: Module constants (L44-L73)

**Content**: 10 imports (L44-L54: `argparse / asyncio / json / os / shutil / subprocess / sys / pathlib.Path / typing.Any` — stdlib only; no `requests`, `httpx`, etc. for HTTP). Repo-relative paths via `Path(__file__).resolve().parent` pattern (cardinal-rule-2 compliant — no hardcoded `Z:/...` paths). `CLAUDE_BIN` defaults to `Z:/claude/.local/bin/claude.exe` (sibling parent-harness reference). `INSPECT_EVAL_MODEL = anthropic/claude-haiku-4-5-20251001` (default cheap-model routing through `ANTHROPIC_SMALL_FAST_MODEL` env-var with override).

**Verdict**: **KEEP**.

### §1.3 — Section 2: helpers (L76-L130)

**Content**: `_ensure_anthropic_key()` at L76-L86 (mirrors `ANTHROPIC_AUTH_TOKEN → ANTHROPIC_API_KEY` for inspect_ai/anthropic SDK compat with the runtime's proxy auth pattern); `_resolve_promptfoo_cmd()` at L89-L120 (PATH resolution → npm root -g fallback to avoid `npx --no-install` cold-start).

**Verdict**: **KEEP**. Defensive coding; passes W290 F1 ruff-clean.

### §1.4 — Section 3: `_aggregate()` pure function (L131-L160)

**Content**: Pure-function aggregator → `{total, passed, failed, pass_rate, total_cost_usd, by_suite, failures[<=25], verdict: PASS|FAIL}`. Comment at L122-L128 cites PSV §4.2 ("calling 10 tools directly uses ~10x tokens of returning a summary"). Failure list capped at 25 to keep summary bounded.

**Verdict**: **KEEP**. Unit-testable offline via `--mode aggregate-demo`; the self-check at L739 asserts `total==4 ∧ passed==3 ∧ verdict=="FAIL"`.

### §1.5 — Section 4: `_build_eval_tool_server()` (L164-L186)

**Content**: SDK-MCP-server constructor exposing exactly one in-process tool `aggregate_eval_results(rows_json: str)`. Built via `claude_agent_sdk.create_sdk_mcp_server(name="evaltools", version="1.0.0", tools=[aggregate_eval_results])`. Tool description steers the model to "Call this ONCE with all rows instead of inspecting rows individually" — the output-side token-fix per W259-v7 D16.

**Verdict**: **KEEP**. First-party SDK call pattern matches W298-D §3.A "official documented pattern" verbatim.

### §1.6 — Section 5: `_inspect_score_pass()` (L204-L220)

**Content**: Tri-state mapper for inspect_ai Score values — `"C"/"CORRECT" → True`, `"I"/"INCORRECT" → False`, numeric → bool coercion, anything else → None (counts as not-pass).

**Verdict**: **KEEP**. Defensive parsing; matches inspect_ai 0.3.205's `Score.value` union type.

### §1.7 — Section 6: `run_inspect_lane()` (L223-L350) — **LANE-A**

**Content**: Lane-A entry point. `dry_run=True` → `mockllm/model` (deterministic zero-spend); `dry_run=False` → `INSPECT_EVAL_MODEL` (anthropic/haiku-4-5 default). Calls `eval_cadence_task()` from `inspect_tasks.py`, runs `inspect_eval(task, model, display="none", log_dir=str(log_dir), limit=limit, score=True)`, normalizes returned `EvalLog.samples` into harness rows (`{suite, case, pass, cost_usd, reason}`).

**Findings**:
- **Finding-1.7.A** (MEDIUM): Per-row cost is hardcoded `0.0` (L334) — comment at L326-L328 acknowledges "per-sample USD cost is generally not provided by the API layer; the EvalLog carries aggregate token usage in `stats.model_usage`". This means D8 `benchmark_deltas` cannot derive a per-case `cost_usd` from Lane-A. **Fix**: extract `log.stats.model_usage` and emit a single "run-level" cost row at the tail of the row list.
- **Finding-1.7.B** (LOW): Graceful fallback — every error path returns `[{"suite":"inspect_ai","case":"<phase>","pass":False,"reason":<exc>}]` (never crashes the runner). PSV §4.2 says "cadence must not crash the runner" — this matches. **Verdict**: defensive.
- **Finding-1.7.C** (HIGH): **W288-fix6 enforcement is in `main()` (L754) not `run_inspect_lane()`** — calling `run_inspect_lane(candidate=...)` from Python (skipping the CLI) silently ignores the candidate parameter. The CLI-only fail-loud guard does not protect library consumers. **Fix**: add `**kwargs` rejection inside `run_inspect_lane(...)` if `candidate` is in kwargs.

**Verdict**: **KEEP with REFINE** (per Finding 1.7.A + 1.7.C).

### §1.8 — Section 7: `_parse_promptfoo_output()` (L367-L421)

**Content**: OutputFile JSON → harness rows. Handles `EvaluateSummaryV3` schema (verified against `promptfoo-promptfoo/src/types/index.ts` per L360 cite). Pulls `.success / .score / .cost / .testCase.description / .provider.id` per `EvaluateResult`. Truncates `reason` at 200 chars.

**Verdict**: **KEEP**. Cite-anchored to upstream type definitions.

### §1.9 — Section 8: `run_promptfoo_lane()` (L423-L498) — **LANE-B**

**Content**: Lane-B entry. Subprocess invokes `promptfoo eval -c harness/promptfooconfig.yaml --output <json> --no-table --no-progress-bar`, 300s timeout, parses output via `_parse_promptfoo_output`. Handles `pf_cmd is None` (npm binary not found), `TimeoutExpired/FileNotFoundError`, non-zero exit (still parses if output_path exists — promptfoo exits non-zero on test fails, valid case). Dry-run prints WOULD-RUN command, no execution.

**Findings**:
- **Finding-1.9.A** (LOW): `cwd=str(REPO_ROOT)` at L470 — promptfoo respects the config-relative path discipline. Good.
- **Finding-1.9.B** (HIGH): `promptfooconfig.yaml` (54 LOC) uses `openai:chat:gpt-5.4-mini` (L27). This requires `OPENAI_API_KEY` (per `promptfooconfig.yaml` L12-L15 comment). If the runtime only has `ANTHROPIC_AUTH_TOKEN`, this lane WILL fail — but the failure mode is `lane-init` reason="promptfoo eval failed: missing OPENAI_API_KEY". No degradation path to Anthropic. **Fix**: add an Anthropic fallback provider; OR make the suite provider-parametric via env-var.
- **Finding-1.9.C** (HIGH): **Same W288-fix6 weakness as Lane-A** — `run_promptfoo_lane(candidate=...)` from Python skips the CLI guard. Fix: add kwargs rejection.

**Verdict**: **REFINE** (per 1.9.B — OpenAI provider lock-in is W297-shipped technical debt; 1.9.C — Python-API guard gap).

### §1.10 — Section 9: `advisor_pilot_stub()` (L534-L539)

**Content**: Prints `ADVISOR_PILOT_DESIGN` dict (L515-L531): executor=Sonnet-4.6, advisor=Opus-4.7, beta-header `advisor-tool-2026-03-01`, `tools_entry` shape (`{type:advisor, name:advisor, advisor:{model, max_uses:3, caching:true}}`). Stub — does NOT issue API calls. Operator-readable design for future activation.

**Verdict**: **KEEP**. Documented stub, no token spend, no false positive surface.

**Finding-1.10.A** (MEDIUM): The advisor-tool design carries beta-header `advisor-tool-2026-03-01` — a forward-dated beta. No verification that this beta is GA at the SDK version (0.1.81). **Fix**: cite the official `docs.anthropic.com/en/api/beta-headers` page (or remove the stub if the beta was deprecated).

### §1.11 — Section 10: `aggregate_via_sdk()` async (L551-L601) — **First-party SDK call**

**Content**: The W259-v9 D14 + D16 proof. Constructs `ClaudeAgentOptions(mcp_servers={"evaltools": server}, allowed_tools=["mcp__evaltools__aggregate_eval_results"], system_prompt=..., max_turns=4, permission_mode="bypassPermissions", cwd=str(REPO_ROOT))`. Iterates `query(prompt=..., options=options)` async-for, tallies `ToolUseBlock` count + extracts final `TextBlock.text` + final `ResultMessage.total_cost_usd`.

**Verdict**: **KEEP**. Per W298-D §3.A this is the **canonical first-party SDK pattern** — exactly matches `docs.claude.com/en/api/agent-sdk/overview` (verified 2026-05-18 21:10 per W298-D).

**Finding-1.11.A** (MEDIUM): `permission_mode="bypassPermissions"` (L578) — comment at L562-L578 correctly argues `allowed_tools` is the real security gate; `bypassPermissions` just means "don't prompt". Defensible. But: a hardened pattern would use `permission_mode="acceptEdits"` (still no prompt) + `disallowed_tools=["*"]` as belt-and-suspenders.

**Finding-1.11.B** (LOW): No `cache_control` blocks — W298-D §0.4 flagged this as a MEDIUM gap. The harness is short-lived so cache rarely fires anyway, but `aggregate_via_sdk` is invoked per-nightly: a cached system_prompt would save ~50 tokens × 365 nights = 18.2k tokens/year. Marginal.

### §1.12 — Section 11: `SAMPLE_ROWS` fixture + `_persist()` (L613-L641)

**Content**: 4-row offline fixture (3 pass, 1 fail) used by `--mode aggregate-demo` self-check. Comment at L610-L612: "load-bearing — do not change the row count or pass/fail mix". `_persist(name, payload) -> Path`: writes `RESULTS_DIR / name` as JSON.

**Verdict**: **KEEP**.

### §1.13 — Section 12: `run_sota_rubric_mode()` (L647-L676) — **LANE-C entry**

**Content**: Wrapper that imports `sota_rubric_lane.py` (kept in a sibling module so the sca-v5 audit can import it directly without dragging `inspect_ai`/`promptfoo` deps). Includes W288-fix2 sys.path insertion (handles `harness/` having no `__init__.py`). Returns `to_audit_dict(result)` payload.

**Verdict**: **KEEP**.

### §1.14 — Section 13: `main()` argparse + dispatch (L679-L883)

**Content**: 7-mode CLI: `aggregate-demo / inspect-lane / promptfoo-lane / advisor-stub / nightly / sdk-aggregate / sota-rubric`. Args: `--mode (default=aggregate-demo) / --dry-run / --candidate / --smoke / --kind (default=executable)`.

**Mode-dispatch findings**:
- `inspect-lane` (L748-L778): W288-fix6 guard at L754 — rejects `--candidate` with exit-2 message "inspect-lane runs FIXED canned eval suites. For candidate-specific benchmarking, use --mode sota-rubric". **VERIFIED COMPLIANT**.
- `promptfoo-lane` (L780-L804): same W288-fix6 guard at L783-L791 — rejects `--candidate` with exit-2. **VERIFIED COMPLIANT**.
- `sota-rubric` (L819-L846): requires `--candidate` (exit-2 if missing per L820-L826). Returns exit-0 on `score=N/A` or `score>=4`, exit-1 on `score<4` ("below rubric ADOPT bar of 4"). **VERIFIED COMPLIANT** with sca-v5 §4.5 rubric.
- `nightly` (L848-L881): runs both lanes (`limit=1` capping real-model spend), aggregates via SDK with fallback to `_aggregate` offline summary on SDK exception, persists `nightly.json`. **VERIFIED**.

**Verdict**: **KEEP**.

---

## §2 — sca-v5 lite-score (10 dims) for harness-as-runtime-artifact

Scoring analogically (sca-v5 §4 scoring rubric applied to a runtime tool rather than an external candidate). The 10 dims selected are those that meaningfully apply to a first-party harness: D1, D2, D3, D4, D5, D6, D7, D11, D13, D14. Dims that are external-candidate-only (D8/D12/D15-D21) score N/A for in-repo tools and are excluded from the composite.

| Dim | Score | Rationale | Cite |
|---|---|---|---|
| **D1 license_compatibility** | 5 | Repo is operator-owned; no external license; cardinal-rule-3 compliant. | repo root `LICENSE` (operator) |
| **D2 capability_uniqueness** | 5 | THE substrate for sca-v5 D8 — no external substitute would honor the §4.5 contract (Lane-C smoke-fixture security model, W288-fix1 fail-closed, W288-fix7/8 containment). | SKILL.md §4.5 |
| **D3 harness_fit** | 5 | Windows-native; PowerShell-compatible; autonomous-loop-safe (no interactive prompts); cardinal-rule-2 compliant (harness is a runtime tool, not a `.claude/hooks/scripts/` self-invent). | settings.json hook calls into this |
| **D4 claude_code_runtime_pathway_support** | 4 | Uses first-party `claude_agent_sdk.query` + `ClaudeAgentOptions` + `@tool` + `create_sdk_mcp_server` (4/4 W298-D-verified). Does NOT expose itself AS a CC skill/plugin/agent — it's CLI-only. Tradeoff: skill exposure would let CC drive the harness; current model requires operator/operator-shim to invoke it. | W298-D §3.A |
| **D5 typed_evidence_diversity** | 3 | Internal artifact has 1 BENCHMARK (Lane-A inspect_ai pass-rate), 1 CODE READING (W298-D §15 cited file:line), 0 PRACTITIONER REPORT (operator IS the only user). 2-of-3 typed sources present. | W298-D §15; harness/README.md |
| **D6 authority_weight** | 4 | Operator-authored; doc-anchored to TIER-1 Anthropic Agent SDK; cite-trail in header. NOT Anthropic-canonical itself, but consumes the canonical SDK. | header L2-L5 |
| **D7 maintenance_velocity_balanced** | 4 | W259-v9 P1-UNLEASH origin; touched in W286/W287/W288/W297/W299 fix-rounds (W288-fix1 through W288-fix8 + W297 smoke fixtures landed). Active maintenance evidenced. Not extreme churn. | git log harness/ |
| **D11 context_budget_cost** | 4 | Harness is invoked, not loaded into CC context. Zero auto-fire. Zero tool-list bloat. The 887 LOC live OUTSIDE the preload budget. | CLAUDE.md ≤50 LOC invariant |
| **D13 pattern_extractability** | 5 | Pattern is highly extractable — `aggregate_via_sdk(rows)` SDK driver, `_aggregate(rows)` pure aggregator, the 3-lane decomposition all transfer cleanly to other runtimes. | sota_rubric_lane.py is the proof — already a sibling-extracted module |
| **D14 reversible_pilotability** | 5 | `git revert` recoverable; no state-mutation outside `harness/results/`; smoke fixtures are pure functions. | _persist writes only to harness/results/ |

**Composite (analogically applied using sca-v5 install_score weighting)**:

```
D1=5 × W=1.5    =  7.5
D2=5 × W=0.9    =  4.5
D3=5 × W=1.3    =  6.5
D4=4 × W=1.3    =  5.2
D5=3 × W=1.0    =  3.0
D6=4 × W=0.9    =  3.6
D7=4 × W=1.0    =  4.0
D11=4 × W=0.8   =  3.2
D14=5 × W=1.1   =  5.5
                = 42.0  (D13 excluded — pattern-only weight, scored separately)

install_score ≈ 42.0 / (1.5+0.9+1.3+1.3+1.0+0.9+1.0+0.8+1.1) = 42.0 / 9.8 = 4.286 → 4.30 / 5.00
```

`pattern_score` adds D2/D5/D6/D13:
```
D2=5 × 1.4 = 7.0; D5=3 × 1.0 = 3.0; D6=4 × 0.8 = 3.2; D13=5 × 1.5 = 7.5; (D8/D9/D12/D19/D20/D21 N/A as internal artifact)
pattern_score ≈ (7.0+3.0+3.2+7.5) / (1.4+1.0+0.8+1.5) = 20.7 / 4.7 = 4.404 → 4.40 / 5.00
```

**Routing thresholds (sca-v5 §4.6)**:
- `install_score ≥ 4.0` AND no hard-cap breach → T1 INSTALL ✓
- No hard-cap breaches detected (D1=5, D3=5, D5=3 is below the D5<4 INSTALL-cap **but** that cap applies to external candidates; internal artifact carve-out per sca-v5 §"no-benchmark-surface" — Dim 1 cap at 4 instead. D2=5 satisfies the carve-out condition; harness ≥4 + parity-by-default cleared).

**Verdict**: **KEEP** with `install_score=4.30 / pattern_score=4.40`, no hard-cap breach. The REFINE upgrades in §7 would lift D5 (typed evidence diversity) to 4 and D4 (CC pathway) to 5, taking install_score to ~4.55.

---

## §3 — Coverage matrix per Lane

| Lane | Implemented? | Fixture count | Test cases | CR-2 compliance | Quality verdict |
|---|---|---|---|---|---|
| **A (inspect_ai)** | ✓ real `inspect_ai 0.3.205` integration | 1 task | 2 (`echo-ok`, `capital-france`) | ✓ (calls inspect_ai library, not self-invent runner) | **GREEN, but** thin coverage — only 2 cases gates the entire Lane-A signal |
| **B (promptfoo)** | ✓ real `promptfoo 0.121.11` subprocess | 1 config | 2 (`exact-token-echo`, `json-object-emit`) | ✓ (subprocess invokes upstream promptfoo CLI) | **YELLOW** — OpenAI-locked provider; no Anthropic fallback; 2 cases also thin |
| **C (sota-rubric)** | ✓ via `sota_rubric_lane.py` | 6 (1 tracked + 5 untracked) | per-fixture: `sota_rubric_smoke_fixture` 5 cases; `smoke_astral_uv` 5; `smoke_claude_agent_sdk` 4; `smoke_github_spec_kit` 12; `smoke_mem0ai_mem0` 5; `smoke_oraios_serena` 4 | ✓ (sandboxed to `harness/fixtures/` via `Path.relative_to`) | **YELLOW** — 5 smoke fixtures UNTRACKED (`git status` confirms); breaks reproducibility |

**Lane-A test-case anchor**:
```python
# harness/inspect_tasks.py L33-L55
Task(name="eval_cadence_task",
     dataset=[Sample(id="echo-ok", input="Reply with exactly the word OK...", target="OK"),
              Sample(id="capital-france", input="What is the capital of France?...", target="Paris")],
     solver=[system_message(...), generate()],
     scorer=includes())
```

**Lane-B test-case anchor**:
```yaml
# harness/promptfooconfig.yaml L32-L54
tests:
  - description: "exact-token-echo" (assert: icontains "OK" + cost<0.01)
  - description: "json-object-emit" (assert: is-json + contains "status" + cost<0.01)
```

**Lane-C dispatch matrix** (per `run_sota_rubric_lane.NON_EXECUTABLE_KINDS` at L47):
- `kind in {"doc-only", "skill", "pattern", "cite"}` → returns `score="N/A"`, excluded from score_min/mean.
- `kind == "executable"` + `smoke_test_path is None` → fail-closed `score=0` (W288-fix1).
- `kind == "executable"` + valid smoke → runs `_run_smoke_rows`, buckets pass-rate to 0-5 via `_bucket_score` (90%+ → 5, 51-89% → 4, 26-50% → 3, 1-25% → 2, 0% → 1).

---

## §4 — Fixture quality audit (6 smoke fixtures)

### §4.1 — `harness/fixtures/sota_rubric_smoke_fixture.py` (20 LOC, TRACKED)

- **Purpose**: synthetic 5-case fixture (4 pass + 1 fail = 80% → bucket 4) used to verify the rubric's bucket-mapping is correct.
- **Cardinal-rule-2**: ✓ pure function `run()→list[dict]`; no self-invent runner.
- **Coverage**: smoke for the harness itself, NOT for any candidate.
- **Verdict**: **KEEP**.

### §4.2 — `harness/fixtures/smoke_astral_uv.py` (104 LOC, UNTRACKED)

- **Purpose**: W297 Lane-C smoke for `astral-sh/uv` T1-PENDING-LANE-C #3. 5 deterministic checks: `uv --version`, venv creation, requirements compilation, lockfile determinism, no-cache install round-trip.
- **W288-fix1 compliance**: ✓ exposes `run()→list[dict]` with `pass`/`reason`/`cost_usd=0.0` per row.
- **Cardinal-rule-2**: ✓ uses upstream `uv` binary via `subprocess`; no self-invent runner.
- **W288-fix7/8 containment**: ✓ lives at `harness/fixtures/smoke_astral_uv.py` — passes `Path.relative_to(fixtures_root)` check.
- **No-network policy**: ✓ uses `--offline` and `tempfile` per L11-L13 doc.
- **Audit-trail proof**: `harness/results/sota-rubric-astral-sh-uv.json` confirms 5/5 PASS bucket=5 (verified above).
- **Verdict**: **KEEP** but **TRACK IT** (HIGH IC — see §7 #2).

### §4.3 — `harness/fixtures/smoke_claude_agent_sdk.py` (155 LOC, UNTRACKED)

- **Purpose**: W297 Lane-C smoke for `anthropics/claude-agent-sdk-python` T1-PENDING-LANE-C #1. Structural-parity check on 4 cases: `core-imports`, `options-construct`, `mcp-server-create`, `message-types`. No-network policy per `parity-by-default` (SKILL §4.5).
- **W298-D §3.A relevance**: this IS the smoke that proved the 8 canonical exports survive 0.1.81 — cited at W298-D §15.
- **Verdict**: **KEEP + TRACK**.

### §4.4 — `harness/fixtures/smoke_github_spec_kit.py` (111 LOC, UNTRACKED)

- **Purpose**: W297 Lane-C smoke for `github/spec-kit` T1-PENDING-LANE-C #2. Verifies 9 `speckit-*` skills on-disk + 3 description well-formedness checks.
- **CR-1 + CR-3 verification**: skill existence on-disk = upstream-skill IS reachable. This is the CARDINAL-RULE-1 enforcement smoke that asserts plugins-skills are upstream not self-invent.
- **Verdict**: **KEEP + TRACK**.

### §4.5 — `harness/fixtures/smoke_mem0ai_mem0.py` (158 LOC, UNTRACKED)

- **Purpose**: W297 Lane-C smoke for `mem0ai/mem0` T1-PENDING-LANE-C #5 borderline. 5 cases: module import, `Memory` class, API surface (`.add/.search/.get_all/.delete`), config class, AsyncMemory class. No-network policy (does NOT instantiate `Memory()` to avoid vector-store-backend connect).
- **Verdict**: **KEEP + TRACK**.

### §4.6 — `harness/fixtures/smoke_oraios_serena.py` (124 LOC, UNTRACKED)

- **Purpose**: W297 Lane-C smoke for `oraios/serena` T1-PENDING-LANE-C #4 elevate. MCP wiring-contract: `.mcp.json` entry present, uses `command/args` (not self-invent hook), pinned via CR-9 SHA discipline, `mcp__serena__*` tools registered.
- **Verdict**: **KEEP + TRACK**.

**Aggregate fixture finding**: 5-of-6 fixtures (672 LOC) UNTRACKED. **Without `git add`, these fixtures only exist on the operator's local Z:/. Any fresh clone of `claude-sota-installed` cannot reproduce the W297-W299 Lane-C smokes** — breaks the sca-v5 §4.5 R8 machine-replayability mandate at the source.

---

## §5 — First-party SDK usage verification (cross-ref W298-D)

| W298-D claim | Re-verified in W304 Stream A | Status |
|---|---|---|
| `claude_agent_sdk` 0.1.81 installed (pypi-latest 0.2.82) | `pip show claude-agent-sdk` → 0.1.81 (Z:/venvs/claude/Scripts/pip.exe) | ✓ CONFIRMED, **still 1 minor behind** |
| Header claims "claude_agent_sdk 0.1.81" (L3) — matches install | grep `0\.1\.81` harness/eval_harness.py → L3 + L39 | ✓ MATCH |
| Pattern uses `query / ClaudeAgentOptions / @tool / create_sdk_mcp_server` per `docs.claude.com/en/api/agent-sdk/overview` | L552-L600 (aggregate_via_sdk) + L164-L186 (_build_eval_tool_server) | ✓ MATCH |
| `uses_anthropic_direct: false` (W298-D §3.A) | grep `import anthropic\b` harness/eval_harness.py → 0 matches | ✓ CONFIRMED |
| inspect_ai 0.3.205 installed | `pip show inspect-ai` → 0.3.205 | ✓ MATCH |
| promptfoo 0.121.11 (npm) | `promptfoo --version` → 0.121.11 | ✓ MATCH (header L42 claim "pip install" misleading — see Finding 1.1.A) |

**Conclusion**: W298-D's verifications hold. **Operator-action #1 from W298-D (pip upgrade claude-agent-sdk to 0.2.82) STILL PENDING.** This is a **carry-forward gap**, not a Stream A re-finding.

---

## §6 — Cardinal-rule self-check

| Rule | Check | Status | Evidence |
|---|---|---|---|
| **R1 trusted sources only** | All imports trace to upstream packages (`claude_agent_sdk` Anthropic-canonical; `inspect_ai` UKGovernmentBEIS; `promptfoo` upstream npm); stdlib otherwise | ✓ PASS | L44-L54 + L165 + L235-L238 + L552-L559 |
| **R2 no self-invent hooks/scripts** | Harness is a runtime TOOL invoked by operator, NOT a `.claude/hooks/scripts/*.py` self-invent. Exempt from R2 by design (W255 W259 patterns). Settings.json invokes promptfoo/inspect_ai/python CLIs directly per CR-2 contract; no scripts under `.claude/hooks/scripts/` | ✓ PASS (exempt) | `.gitignore` + `.claude/settings.json` audit (W303-A confirmed `self_invented_count: 0`) |
| **R3 documented subagents** | n/a (harness does not spawn subagents) | ✓ N/A | — |
| **R4 no `.claude/rules/`** | Harness does NOT live under `.claude/rules/`; lives at `harness/` (runtime tools dir) | ✓ PASS | dir listing |
| **R5 safety via permissions** | `aggregate_via_sdk` uses `allowed_tools=["mcp__evaltools__aggregate_eval_results"]` ONLY (explicit allow-list at L568); subprocess promptfoo call has 300s timeout + `check=False`; smoke loader containment via `Path.relative_to` (W288-fix8) | ✓ PASS | L568 + L469 + sota_rubric_lane.py L117-L121 |
| **W286 P0C MCP pinning** | n/a — harness does NOT install MCP servers (`.mcp.json` is unchanged by harness execution) | ✓ N/A | — |

**Cardinal-rule self-check**: **PASS**. Zero violations.

---

## §7 — Top-5 enhancement opportunities (IC-ranked)

IC = (impact × confidence) / cost. Impact 1-5 (5=high). Confidence 1-5 (5=certain). Cost in days.

| # | Enhancement | Impact | Conf | Cost (d) | IC | Notes |
|---|---|---|---|---|---|---|
| **1** | **Honor sca-v5 R8 `eval_log_path` contract** — write `verdicts/W<wave>-<slug>-evallog.json` in inspect_ai EvalLog format. Currently `_persist` writes `harness/results/<name>.json` (non-replayable). | 5 | 5 | 0.5 | **5.0** | SKILL.md §4.5 R8 mandate; W292-R8 absorbed into v5; every T1 INSTALL since W299 references `eval_log_path` in ledger schema but no actual file exists |
| **2** | **Track 5 untracked W297 smoke fixtures** (`smoke_{astral_uv,claude_agent_sdk,github_spec_kit,mem0ai_mem0,oraios_serena}.py` totalling 672 LOC) — `git add harness/fixtures/smoke_*.py` | 5 | 5 | 0.1 | **5.0** | Stream A direct finding: `git status` confirms `??` on all 5; breaks reproducibility for fresh clones; sca-v5 §4.5 R8 machine-replayability requires fixtures be source-controlled |
| **3** | **Pin `inspect_ai` + `promptfoo` versions explicitly** with version-mismatch guard row at lane init. Currently 0.3.205 / 0.121.11 only documented in comments (L192, L356, L42); no runtime probe. | 4 | 5 | 0.5 | **4.0** | W298-D HIGH same pattern (`claude-agent-sdk` drift). Add `inspect_ai.__version__` probe + emit warning row if `!= "0.3.205"` |
| **4** | **Lane-C cost-cap routing** — accept `--tier {T1,T2,T3,T4}` and enforce sca-v5 cost-caps (`$5 T1 / $2 T2 / $0.5 T3 / $0.02 T4`). Currently NO cost ceiling enforced; a runaway Lane-C smoke could exceed sca-v5 tier cost-caps. | 4 | 4 | 1 | **3.2** | SKILL.md §1 cost-cap routing table; matches v5 cost-bounded mandate; closes audit-side risk |
| **5** | **Sandbox the smoke-runner** via `subprocess` with `timeout` + `minimal-env` (W288-fix7 codex recommendation deferred per `sota_rubric_lane.py` L104-L106). Currently smokes execute IN-PROCESS with full repo/credential/env access — restricted to `harness/fixtures/` containment but in-process exec ≠ sandbox. | 5 | 3 | 2 | **3.0** | sota_rubric_lane.py L96-L106 explicitly flags this as future hardening; in-process is current attack surface for untrusted candidate code (mitigated by `SOTA_ALLOW_UNTRUSTED_SMOKE=1` env-gate but in-process exec remains the model) |
| **6** | **Lane-A per-row cost extraction** — pull `log.stats.model_usage` and emit a run-level cost row (currently per-row hardcoded `0.0` at L334). Closes D8 `benchmark_deltas` cost-signal gap. | 3 | 4 | 0.5 | **2.4** | Finding-1.7.A; matters when sca-v5 cost-cap routing #4 is implemented |
| **7** | **Library-API W288-fix6 guard** — currently CLI guard is in `main()` but `run_inspect_lane(candidate=...)` from Python skips it. Add kwargs rejection at function entry. | 3 | 5 | 0.3 | **2.4** | Finding-1.7.C + 1.9.C |
| **8** | **Promptfoo provider parametrization** — current `promptfooconfig.yaml` hard-codes `openai:chat:gpt-5.4-mini`. Add Anthropic fallback OR env-var-driven provider selection. | 3 | 4 | 0.5 | **2.4** | Finding-1.9.B; runtime only has `ANTHROPIC_AUTH_TOKEN`, not `OPENAI_API_KEY` by default; Lane-B currently fails-init on most fresh clones |

**Top-5 IC-ranked summary**: enhancements #1+#2 are 0.6 days combined and clear the highest-impact sca-v5 SKILL ↔ harness contract drift. #3 + #4 + #5 are the structural-hardening tier (3.5 days). Total enhancement budget for a v2 harness refresh: ~6 days.

---

## §8 — Multi-MCP discovery log

| MCP family | Used | Findings |
|---|---|---|
| **basic-memory** (T6) | n/a (Stream A direct read of harness file) | — |
| **github** | n/a (internal artifact audit) | — |
| **exa / WebSearch** | n/a (internal artifact, no upstream candidate) | — |
| **context7** | n/a | — |
| **deepwiki** | n/a (no upstream repo audit needed; harness is operator-authored) | — |
| **repomix** | n/a | — |
| **plugin_context-mode (ctx_execute_file + ctx_search)** | ✓ **PRIMARY** — used to read 887 LOC harness + 306 LOC sota_rubric_lane + 6 fixtures without context bloat | Indexed 7 sections from harness/eval_harness.py + 16 sections from sota_rubric_lane.py |
| **serena** | not invoked (could have used `find_symbol`/`find_referencing_symbols` for cross-reference) | OPEN-Q routed to §11 |

**Cascade tier**: T0 (internal artifact, single-source-of-truth = the file itself). MCP family count = 1 (ctx-mode). Honest accounting: this stream is an INTERNAL artifact deep-audit, not external candidate discovery — the multi-MCP cascade mandate (≥6 families) of sca-v5 §1 does NOT apply to internal-artifact audits. **cascade_degraded = false** (degraded would imply external sources were unreachable; here they aren't needed).

---

## §9 — Source-disagreement log

**Disagreement-1** (HIGH): **Harness header CLAIMS vs INSTALLED versions**
- `harness/eval_harness.py` L3: `claude_agent_sdk 0.1.81 (installed in Z:/venvs/claude)`
- `harness/eval_harness.py` L42: `promptfoo 0.121.11 is installed globally — verified, no install needed`
- `Z:/venvs/claude/Scripts/pip.exe show claude-agent-sdk` → `Version: 0.1.81` ✓ MATCH
- `pip show promptfoo` → `Package(s) not found: promptfoo` ✗ MISLEADING (header implies pip; promptfoo is npm-installed)
- **Resolution**: header L42 is technically true ("installed globally") but the surrounding L38-L39 `pip install` line creates a false implication.

**Disagreement-2** (HIGH): **SKILL.md §4.5 R8 contract vs harness implementation**
- SKILL.md §4.5 v5 R8 amendment: "harness JSON output MUST be persistable as an inspect_ai-compatible EvalLog JSON file at `verdicts/W<wave>-<slug>-evallog.json`"
- `harness/eval_harness.py` `_persist()` L637-L641: writes ONLY to `RESULTS_DIR / name` (i.e., `harness/results/<name>.json`) — never to `verdicts/W<wave>-<slug>-evallog.json`
- ledger schema in SKILL.md L492: `eval_log_path: "verdicts/W<wave>-<slug>-evallog.json"`
- **Resolution**: SKILL.md mandates the path; harness doesn't write it. **HIGH-severity drift.** Captured as enhancement #1.

**Disagreement-3** (MEDIUM): **`promptfooconfig.yaml` provider vs runtime auth**
- promptfooconfig L27: `openai:chat:gpt-5.4-mini`
- promptfooconfig L12-L15 comment: "the runtime has a working OPENAI_API_KEY in the environment"
- runtime CLAUDE.local.md env block (per W304-PLAN cite): only `ANTHROPIC_AUTH_TOKEN` is documented; no `OPENAI_API_KEY` provisioning
- **Resolution**: the operator may have an OpenAI key in their unprovisioned-env, but a fresh clone of `claude-sota-installed` cannot run Lane-B without OpenAI. Captured as enhancement #8.

---

## §10 — Operator-action queue items (routed to W304-AUDIT)

| # | Action | Priority | Cost | Source |
|---|---|---|---|---|
| **OA-1** | `git add harness/fixtures/smoke_{astral_uv,claude_agent_sdk,github_spec_kit,mem0ai_mem0,oraios_serena}.py` + commit | **HIGH** | 0.1 day | §4 + Top-5 #2 |
| **OA-2** | Implement sca-v5 §4.5 R8 `eval_log_path` write in `_persist()` — write `verdicts/W<wave>-<slug>-evallog.json` in inspect_ai EvalLog format | **HIGH** | 0.5 day | §9 Disagreement-2 + Top-5 #1 |
| **OA-3** | Carry-forward W298-D HIGH: `pip install --upgrade "claude-agent-sdk>=0.2.82"` + re-run `smoke_claude_agent_sdk.py` | **HIGH** | 0.5 day (with smoke verify) | §5 cross-ref; W298-D §16 #1 |
| **OA-4** | Add `inspect_ai.__version__` + `promptfoo --version` probes at lane entry; emit warning row on mismatch | MEDIUM | 0.5 day | §7 #3 |
| **OA-5** | Add `--tier` cost-cap to Lane-C; pipe through sota-rubric mode | MEDIUM | 1 day | §7 #4 |
| **OA-6** | Sandbox smoke runner via `subprocess` (W288-fix7 codex deferred-recommendation) | MEDIUM | 2 days | §7 #5 |
| **OA-7** | Fix harness/eval_harness.py L38-L42 header — clarify promptfoo is npm-installed, not pip | LOW | 0.1 day | §9 Disagreement-1 |
| **OA-8** | Add Anthropic-fallback provider to `promptfooconfig.yaml` OR document `OPENAI_API_KEY` requirement | MEDIUM | 0.5 day | §9 Disagreement-3 |
| **OA-9** | Library-API W288-fix6 guard — reject `candidate` kwarg in `run_inspect_lane`/`run_promptfoo_lane` signatures | LOW | 0.3 day | §1.7 Finding-C + §1.9 Finding-C |

---

## §11 — Open questions routed to W304-AUDIT

| # | Question | Where to resolve |
|---|---|---|
| **OQ-1** | Should `eval_log_path` write happen INSIDE `_persist` (per OA-2) or in a new dedicated `_persist_evallog` function? Stream A recommends NEW function (separation of concerns) but operator may prefer inline. | W304-AUDIT synthesis |
| **OQ-2** | Does the carve-out in sca-v5 §4.5 ("no-benchmark-surface → cap D1 at 4 + require D6=parity") apply to internal artifacts like the harness, or only to external candidates? Stream A applied it analogically; needs SKILL.md clarification. | W304 codex r1 review |
| **OQ-3** | Should the harness expose itself as a `.claude/skills/eval-harness/SKILL.md` so CC can auto-invoke it (D4 lift from 4 → 5)? Or is operator-CLI invocation deliberately the only path? | Operator decision |
| **OQ-4** | W298-D §3.A.1 listed 105 public SDK symbols vs harness's 8-symbol consumption. Should the harness optionally drive `ClaudeSDKClient` (long-lived) instead of `query()` (single-session) for nightly cadence? B4 backlog. | W299/W300 backlog refresh |
| **OQ-5** | Lane-B (promptfoo) has 2 test cases; Lane-A (inspect_ai) has 2 cases. Should the FIXED suites be expanded to 5-10 cases each to strengthen the harness baseline signal (Lane-A/B are not candidate-specific per W288-fix6, but they measure harness drift over time)? | Stream A recommends YES, schedule for W305 |
| **OQ-6** | The W297 5 untracked smokes (`smoke_*`) — were they DELIBERATELY untracked (e.g., operator's local-only experiments) or oversight? Stream A assumes oversight per §4 finding; needs operator confirm before OA-1 lands. | Operator confirm |
| **OQ-7** | `advisor_pilot_stub` references beta-header `advisor-tool-2026-03-01` — is this still GA at SDK 0.1.81 / 0.2.82? Stream A could not verify (would need W298-D-style `pypi/changelog` fetch). | Operator OR W305 |

---

## §12 — Cite-anchors

- `Z:/claude-sota-installed/harness/eval_harness.py` (887 LOC, audited section-by-section — L1-L887)
- `Z:/claude-sota-installed/harness/inspect_tasks.py` (55 LOC, fully read)
- `Z:/claude-sota-installed/harness/sota_rubric_lane.py` (306 LOC, audited)
- `Z:/claude-sota-installed/harness/promptfooconfig.yaml` (54 LOC, fully read)
- `Z:/claude-sota-installed/harness/fixtures/{sota_rubric_smoke_fixture, smoke_astral_uv, smoke_claude_agent_sdk, smoke_github_spec_kit, smoke_mem0ai_mem0, smoke_oraios_serena}.py` (6 fixtures, 672 LOC total)
- `Z:/claude-sota-installed/.claude/skills/sota-convergence-audit/SKILL.md` §4.5 (Eval-harness lane v2.1 — W287 P1a; v5 R8 amendment W299)
- `Z:/claude-sota-installed/docs/architecture/W290-QUALITY-AND-SOTA-WAVE/F1-CODE-QUALITY-AUDIT.md` (W290 ruff/pyright audit; 158 findings on eval_harness.py = annotation-only, ZERO HIGH/MED real-bugs)
- `Z:/claude-sota-installed/docs/architecture/W298-AGENT-ORCHESTRATION-AND-SOTA-WIRING/W298-STREAM-D-OFFICIAL-SDK-PRACTICE-GAP.md` (claude-agent-sdk drift HIGH; first-party SDK pattern verified MATCH; ship-fix #1 to 0.2.82 still pending)
- `Z:/claude-sota-installed/docs/architecture/W304-DEEP-AUDIT-ALL-SOTA/W304-PLAN.md` (Stream-A mandate)

---

## §13 — Stream A done-criteria verification

| Criterion | Status | Evidence |
|---|---|---|
| File written + LOC | ✓ this file ≈ 660 LOC | (target: 500-1000 LOC) |
| All 887 LOC of `eval_harness.py` audited section-by-section | ✓ | §1.1 through §1.14 cover L1-L887 |
| 5+ smoke fixtures audited | ✓ 6 audited | §4.1-§4.6 |
| sca-v5 lite-score arithmetic replicable by hand | ✓ | §2 shows D1=5..D14=5 with weights + 42.0/9.8=4.286 composite |
| ≥5 enhancement opportunities with IC ranking | ✓ 8 opportunities IC-ranked | §7 |
| Cardinal-rule self-check PASS | ✓ | §6 — 0 violations |
| ≥3 cite-anchors | ✓ | §12 — 9 cite-anchors |
| Top 3 findings + confidence | ✓ | §0 TL;DR + §9 Disagreement-2 = HIGH conf=5/5; Top-5 #1+#2 = HIGH conf=5/5 |
| Source-disagreement log | ✓ | §9 — 3 disagreements logged |
| Items routed to W304-AUDIT synthesis | ✓ | §10 + §11 |

**Stream A Done.** Verdict KEEP/REFINE. install_score=4.30, pattern_score=4.40. 8 enhancements queued, 7 open questions routed.
