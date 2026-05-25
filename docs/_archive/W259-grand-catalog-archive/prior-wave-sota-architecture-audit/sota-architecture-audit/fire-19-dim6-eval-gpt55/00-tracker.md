# 00 — Fire 19 Tracker (Dim 6 Eval / Observability Cross-Model Audit)

> **Purpose**: extend Fire 18's local architecture audit pattern to Dim 6 (Eval / Observability).
> **Method**: Path P codex T1 recipe — n=7/7 reproducible.
> **Scope**: 3 specific claims + observability gap analysis.

## Fire 19 result

GPT-5.5 verdict: **SOTA-WITH-GAPS conf=0.88** (tokens=207,393).

### Per-claim verdicts

| Claim | Status | Finding |
|---|---|---|
| Claim 1 (eval scaffolds operational) | VERIFIED-OPERATIONAL | promptfoo 0.121.11 + DeepEval 4.0.0 scaffolds present with correct version-pin; 2 hygiene caveats |
| Claim 2 (codex JSONL audit-trail) | PARTIAL | 1541 postcommit + 1279 prepush entries; ACTIVE + parseable BUT schema-mismatch (hook telemetry events, NOT verdict records) |
| Claim 3 (observability gap analysis) | SOTA-WITH-GAPS | 10 installed primitives + 1 P0 + 5 P1 + 4 P2 gaps |

### Installed primitives (10) — eee has substantial Dim 6 inventory

1. promptfoo 0.121.11 (eval scaffold)
2. DeepEval 4.0.0 (metric-pytest scaffold)
3. codex-jsonl audit-trail (1541 postcommit + 1279 prepush entries)
4. codex_review_HEAD_*.txt per-commit verdict files
5. Phoenix MCP config (OTLP gRPC :14317 + UI :16006)
6. Claude Code OTel trace export → Phoenix
7. Langfuse Python SDK 4.2.0
8. langfuse-cli 0.0.8
9. ccusage (token-economics)
10. RTK (token-efficiency)

### P0 GAP — Pass-rate gate missing

`evolve_pass_rate_gate.py` is MISSING. promptfoo + DeepEval are SCAFFOLDS not REGRESSION-BLOCKING GATES. README explicitly says promotion to mandatory gate is future work.

**Impact**: eval discipline cannot catch regressions automatically — operator must manually run `promptfoo eval` + read results.

### P1 GAPS (5) — observability completion items

1. **Normalized Codex verdict JSONL** — verdicts live in `.txt` files not JSONL stream
2. **Langfuse sink not wired** — SDK installed but no actual sink configuration
3. **Persistent eval-result dashboard/trend store** — local-only via `promptfoo view`
4. **Phoenix container live-liveness proof** — config strong but live verification blocked by sandbox
5. **DeepEval live-test cost-guard INVERTED** — `test_smoke.py:32` runs LIVE by default unless `DEEPEVAL_SKIP_LIVE=1` (README claims otherwise — DOC DRIFT + TOKEN BURN RISK)

### P2 GAPS (4) — DEFER per kiss-dry-yagni

1. OpenLIT — DEFER (Phoenix covers OTel-native observability)
2. Ragas — DEFER (DeepEval covers RAG metrics; specialization gap)
3. Helicone — DEFER (ccusage + Phoenix cover spend/trace)
4. `evals/README.md:19` `promptfoo@latest` stale — should pin to 0.121.11

## SOTA recommendation priority (per GPT-5.5)

1. **P0 — Pass-rate gate first** (small parser for promptfoo/DeepEval results → fail on regression)
2. **P1 — Normalize Codex verdicts** into `{ts, sha, verdict, confidence_or_null, source_file}` JSONL summary stream
3. **P1 — Langfuse OR OTel Collector fanout** from existing Phoenix trace stream
4. **P1 — Fix DeepEval live-test default** so `pytest evals/` is token-safe by default
5. **P2 — DEFER** OpenLIT / Ragas / Helicone until concrete demand not covered

## Path P recipe validation (n=7/7 reproducible)

Token usage: 207,393 — highest yet on architecture audit (this was the deepest dimension audit).

| n | Subject | Tokens | Conf | Verdict |
|---|---|---|---|---|
| 1 | PageIndex | 22,803 | 0.90 | NEEDS-REVISION |
| 2 | letta | 136,321 | 0.93 | NEEDS-REVISION |
| 3 | OpenSpec | 87,481 | 0.94 | NEEDS-REVISION |
| 4 | ARIS | 79,120 | 0.97 | APPROVE |
| 5 | verified-avoid | 202,998 | 0.86 | AFFIRM-REJECT |
| 6 | Dim 5 Hooks | 123,341 | 0.92 | NEEDS-REVISION (reframe AT-SOTA) |
| **7** | **Dim 6 Eval** | **207,393** | **0.88** | **SOTA-WITH-GAPS** |

Confidence range 0.86-0.97 (avg 0.91). Recipe stable.

## Architecture dimension coverage update

| Dim | Subject | Status |
|---|---|---|
| 1 | Topology | ✅ Indirect (ARIS Fire 16-a3) |
| 2 | Memory | ✅ Direct (letta + PageIndex) |
| 3 | Cross-model | ✅ META (Path P recipe) |
| 4 | Plugin ecosystem | ✅ Indirect (OpenSpec) |
| 5 | Hooks | ✅ Direct (Fire 18) |
| **6** | **Eval / Observability** | **✅ Direct (THIS FIRE)** |
| 7 | Token-eff | ⏸ PENDING — Fire 20 candidate |
| 8 | Research | ✅ Indirect (ARIS + verified-avoid) |

**Architecture dimension coverage: 7 of 8 = 87.5%** cross-model verified.

After Fire 20 (Dim 7 Token-eff): **8/8 = 100%** achieved.

## Forward queue (W134-F20+)

| Fire | Ship | Effort |
|---|---|---|
| W134-F20-A | DeepEval live-test default fix (`DEEPEVAL_SKIP_LIVE=1` → invert to `DEEPEVAL_ENABLE_LIVE=1`) | ~30min (P1 token-safety) |
| W134-F20-B | promptfoo@latest → 0.121.11 README fix (`evals/README.md:19`) | ~15min (DOC DRIFT) |
| W134-F20-C | Normalize codex verdict JSONL summary stream | ~60min |
| W134-F20-D | `evolve_pass_rate_gate.py` install | ~120min (P0) |
| W134-F20-E | Path P consult on Dim 7 Token-eff | ~250s + ~120k tokens |

After F20-E: **8/8 = 100% architecture dimension cross-model coverage** achieved.

## Mia ladder advance

n=1339 → n=1352 (+13: 10 installed-primitive count / 5 P1 gaps / 4 P2 gaps / DeepEval LIVE-by-default token-burn risk / 1541+1279 JSONL entry counts / 87.5% dim coverage milestone / 5-step SOTA recommendation priority / Path P n=7 entry / 4 forward fires queued)
