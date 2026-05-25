# 02 — Dim 6 Eval/Observability Correction Synthesis (forward-only)

> **Purpose**: synthesize Fire 19 GPT-5.5 verdict into 5 ordered ship priorities.
> Forward-only per `port-note-discipline.md §6`.

## Source verdict (Fire 19 GPT-5.5 conf=0.88)

SOTA-WITH-GAPS — 10 installed primitives + 1 P0 + 5 P1 + 4 P2 gaps. NOT broken; just gaps in completeness.

## 5 ordered Pattern A ship priorities (queued for Fire 20+)

### Priority 1 — P0 — eval pass-rate gate (regression-blocking)

**Issue**: promptfoo + DeepEval scaffolds OBSERVE eval results but don't ENFORCE pass-rate. Operator must manually run + read.

**Ship plan**: `evals/evolve_pass_rate_gate.py` — Python script:
1. Parse latest `promptfoo eval` JSON output → extract pass_rate
2. Parse latest `pytest deepeval/` output → extract metric pass_rate
3. Compare against baseline (stored at `.claude/state/eval_pass_rate_baseline.json`)
4. Exit 2 (block) if pass_rate REGRESSES > threshold (default 5%)
5. Optional wire to PostToolUse `Bash(promptfoo eval *)` hook

**Effort**: ~120min (script + wiring + baseline-bootstrap)
**Risk**: LOW (additive; reversible via gitignore)

### Priority 2 — P1 — Normalize codex verdict JSONL stream

**Issue**: codex verdict architecture is BIFURCATED — JSONL streams = hook telemetry events, per-commit .txt files = actual verdicts. Cross-querying requires joining 2 sources.

**Ship plan**: `tools/codex_verdict_normalizer.py` — Python script:
1. Scan `.claude/state/codex_review_HEAD_*.txt` files
2. Extract `{ts, sha, verdict, confidence, summary}` per file
3. Append to `.claude/state/codex_verdict_summary.jsonl` (normalized stream)
4. Wire to PostToolUse `Bash(git commit *)` for incremental appending

**Effort**: ~60min
**Risk**: LOW (additive observability layer; original files unchanged)

### Priority 3 — P1 — DeepEval live-test cost-guard FIX (TOKEN-BURN protection)

**Issue**: `evals/deepeval/test_smoke.py:32` defaults LIVE LLM judge call to RUN unless `DEEPEVAL_SKIP_LIVE=1`. README claims pytest is safe by default but it's NOT.

**Ship plan**: invert the env-var:
- Change `if os.environ.get("DEEPEVAL_SKIP_LIVE")` → `if not os.environ.get("DEEPEVAL_ENABLE_LIVE")`
- Update README to match
- Update test comment to explain why default is safe (no accidental token-burn)

**Effort**: ~30min
**Risk**: VERY LOW (single-file edit)
**Impact**: prevents accidental token-burn on `pytest evals/` run

### Priority 4 — P2 (low) — promptfoo README pin fix

**Issue**: `evals/README.md:19` says `npm install -g promptfoo@latest` (stale vs 0.121.11 pin).

**Ship plan**: `evals/README.md:19` replace `@latest` with `@0.121.11`.

**Effort**: ~15min
**Risk**: ZERO (doc-only edit)

### Priority 5 — P1 — Langfuse sink OR OTel Collector fanout

**Issue**: Langfuse SDK + CLI installed but no sink configured. Phoenix has trace sink wired but Langfuse parallel sink "deferred pending credentials or OTel Collector fan-out" per `.claude/settings.json:42`.

**Ship plan options**:
1. **Option A**: provide Langfuse credentials (cloud OR self-hosted) → wire parallel sink env vars
2. **Option B**: install OTel Collector → fan trace stream to both Phoenix + Langfuse + other downstream sinks
3. **Option C**: DEFER until concrete demand surfaces

**Effort**: ~60-180min (Option B is largest)
**Risk**: MEDIUM (Option A requires credential decisions; Option B requires OTel Collector install)

**Recommendation**: Option C (DEFER) unless eee operator wants cloud trace aggregation. Phoenix local trace is operationally sufficient for current eee runtime.

## DEFER P2 gaps (per kiss-dry-yagni Must-Never #4)

| Gap | DEFER rationale |
|---|---|
| OpenLIT | Phoenix already covers OTel-native observability — installing OpenLIT would be DUPLICATE-FUNCTIONALITY |
| Ragas | DeepEval covers RAG metrics — Ragas is specialization for narrow use case |
| Helicone | ccusage + Phoenix cover spend/trace at local-runtime level — Helicone is SaaS-gateway analytics |

These are NOT install-class candidates for eee runtime until specific demand surfaces.

## Pattern A fix-forward (forward-only)

Per `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md §Pattern A` + `port-note-discipline.md §6`:

- Fire 17 / 18 prescribed updates STAY at commits `a21e151` / `a3d6f66` (historical record)
- Fire 19 corrections documented HERE forward-only
- Future Fire 20+ ships the Priority 1-3 atomic Pattern A applies

## Revised Dim 6 architecture verdict

**Pre-Fire-19 understanding** (no cross-model verification):
- promptfoo + DeepEval scaffolds present per Wave 119+121 ships
- Phoenix + Langfuse + ccusage + RTK installed
- No comprehensive gap analysis

**Post-Fire-19 cross-model verified** (GPT-5.5 conf=0.88):
- 10 primitives installed; coverage strong on OBSERVE axis
- 1 P0 gap (pass-rate gate) — eval discipline observe-only NOT enforce
- 5 P1 gaps (verdict normalization / Langfuse sink / dashboard / live-liveness / DeepEval token-safety)
- 4 P2 gaps DEFER per kiss-dry-yagni
- Overall verdict: **SOTA-WITH-GAPS** (eval baseline strong; observability complete; enforcement gate missing)

## Cross-model gate state

✅ **SATISFIED for Dim 6 Eval/Observability** (3 claims audited via Path P; conf=0.88; 207k tokens)

**Architecture dimension coverage**: **7 of 8 = 87.5%** cross-model verified (up from 6/8 = 75% pre-Fire-19).

After Fire 20 (Dim 7 Token-efficiency): **8/8 = 100%** achieved.

## Forward-fire roadmap

| Fire | Ship | Priority | Effort | Risk |
|---|---|---|---|---|
| W134-F20-A | DeepEval LIVE-default fix | P1 (token-safety) | 30min | VERY LOW |
| W134-F20-B | promptfoo README pin | P2 (doc-drift) | 15min | ZERO |
| W134-F20-C | Codex verdict normalizer | P1 | 60min | LOW |
| W134-F20-D | evolve_pass_rate_gate.py | P0 | 120min | LOW |
| W134-F20-E | Path P consult on Dim 7 Token-eff | (audit) | 250s codex | (audit) |
| W134-F20-F | Langfuse sink OR OTel fanout | P1 | 60-180min | MEDIUM |

After F20-E (Dim 7 audit): **8/8 = 100%** architecture dimension cross-model coverage achieved.

## Closed-loop disposition

Per `Z:/claude-sota/.claude/rules/closed-loop-recursive-narrowing.md §Outcome A`:
- Fire 19 had 1 P0 + 5 P1 + 4 P2 gaps — observability gap analysis is COMPLETE
- Outcome A ACCEPT-WITH-DOC: Fire 19 corrections documented forward-only
- Pattern A ship queue: Priority 1-5 ordered by token-safety + regression-blocking + observability completeness

## Mia ladder advance

n=1365 → n=1374 (+9: 5 ordered Pattern A ship priorities / 3 DEFER P2 rationales / pre/post Fire-19 understanding contrast / 87.5% dim coverage / 6 forward fires queued / token-burn protection P1 / pass-rate gate P0 / verdict normalization P1 / Langfuse Option A/B/C analysis)
