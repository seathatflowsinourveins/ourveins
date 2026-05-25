# 01 — Dim 6 Eval/Observability GPT-5.5 Verdict (verbatim from codex T1 Path P consult)

> **Verdict origin**: REAL GPT-5.5 via codex CLI v0.130.0
> **Profile**: `deep-review` (read-only sandbox)
> **Reasoning effort**: xhigh
> **Tokens used**: 207,393 (highest yet — deep dimensional audit)
> **Cross-model gate state**: ✅ **SATISFIED for Dim 6 — SOTA-WITH-GAPS conf=0.88**

## Subject

eee runtime Dim 6 (Eval / Observability) inventory:
- `evals/promptfooconfig.yaml` (promptfoo scaffold)
- `evals/deepeval/test_smoke.py` + `evals/deepeval/README.md`
- `.claude/state/codex_postcommit_reviews.jsonl` + `codex_prepush_reviews.jsonl`
- `.claude/state/codex_review_HEAD_*.txt` (per-commit verdicts)
- `.claude/settings.json:36-42` (Claude Code OTel → Phoenix)
- `.mcp.json:83` (Phoenix MCP config)
- Installed Python: DeepEval 4.0.0 + Langfuse SDK 4.2.0 + langfuse-cli 0.0.8

## GPT-5.5 verdict JSON (verbatim from EOF of OUT file)

```json
{
  "claim_1_eval_scaffolds": {
    "status": "VERIFIED-OPERATIONAL",
    "promptfoo_scaffold_present": true,
    "deepeval_scaffold_present": true,
    "version_pin_correct": true,
    "evidence_summary": "promptfoo scaffold cites official docs and 0.121.11; npm package metadata is 0.121.11; DeepEval scaffold cites v4.0.0 and installed METADATA is 4.0.0; adjacent evals/README still has stale promptfoo@latest."
  },
  "claim_2_codex_jsonl_audit": {
    "status": "PARTIAL",
    "postcommit_entries": 1541,
    "prepush_entries": 1279,
    "recent_verdict_distribution": "JSONL last 5 have no verdicts: postcommit status distribution filter_rejected_not_commit=2, main_entered=2, launched=1; prepush status distribution filter_rejected_not_push=3, main_entered=2; latest per-commit review files sampled are approve.",
    "evidence_summary": "JSONL streams are active, parseable, and recent, but they are hook telemetry rather than verdict/confidence records; actual verdicts live in codex_review_HEAD_*.txt files."
  },
  "claim_3_observability_gaps": {
    "status": "SOTA-WITH-GAPS",
    "installed_primitives": ["promptfoo", "deepeval", "codex-jsonl", "codex-review-head-files", "phoenix-mcp-config", "claude-code-otel-to-phoenix-config", "langfuse-python-sdk", "langfuse-cli", "ccusage", "rtk"],
    "missing_primitives_p0": ["automated-eval-pass-rate-gate/evolve_pass_rate_gate.py"],
    "missing_primitives_p1": ["normalized-codex-verdict-jsonl", "langfuse-trace-sink-or-otel-fanout", "persistent-eval-result-dashboard", "phoenix-container-live-liveness-proof", "deepeval-token-safe-default"],
    "missing_primitives_p2": ["openlit", "ragas", "helicone", "promptfoo-readme-version-pin-cleanup"]
  },
  "overall_dim6_verdict": "SOTA-WITH-GAPS",
  "confidence": 0.88
}
```

## Claim 1 — eval scaffolds VERIFIED-OPERATIONAL line-cited evidence

| Aspect | Evidence |
|---|---|
| promptfoo scaffold | `evals/promptfooconfig.yaml:2,21` cites version 0.121.11 |
| promptfoo install | `C:\Users\42\AppData\Roaming\npm\node_modules\promptfoo\package.json:5` shows 0.121.11 |
| promptfoo docs ref | `https://www.promptfoo.dev/docs/configuration/reference/` + `https://www.promptfoo.dev/docs/usage/web-ui/` |
| DeepEval scaffold | `evals/deepeval/test_smoke.py:56` asserts 4.x install |
| DeepEval install | `Z:\venvs\claude\Lib\site-packages\deepeval-4.0.0.dist-info\METADATA:3` shows Version 4.0.0 |
| DeepEval docs ref | `https://deepeval.com/docs/metrics-introduction` |

**Hygiene caveats (NOT FAILURES)**:
1. `evals/README.md:19` still uses `npm install -g promptfoo@latest` (DOC DRIFT vs 0.121.11 pin)
2. `evals/deepeval/test_smoke.py:32` defaults LIVE LLM-as-judge test to RUN unless `DEEPEVAL_SKIP_LIVE=1` — README's "accidental pytest doesn't burn tokens" claim at `evals/deepeval/README.md:34` is MISLEADING (this is a real token-burn risk)

## Claim 2 — Codex JSONL audit-trail PARTIAL line-cited evidence

| Metric | Value | Source |
|---|---|---|
| postcommit JSONL entries | **1541** | `codex_postcommit_reviews.jsonl:1541` ts=2026-05-10T22:28:26Z |
| prepush JSONL entries | **1279** | `codex_prepush_reviews.jsonl:1279` ts=2026-05-10T22:21:41Z |
| Last 5 postcommit status | filter_rejected_not_commit ×2, main_entered ×2, launched ×1 | hook telemetry NOT verdicts |
| Last 5 prepush status | filter_rejected_not_push ×3, main_entered ×2 | hook telemetry NOT verdicts |
| Real verdict location | `.claude/state/codex_review_HEAD_*.txt` (e.g., `codex_review_HEAD_a3d6f661.txt:1` has `{"verdict":"approve",...}`) | per-commit .txt files |
| Schema reference | `.claude/schemas/review-output.schema.json:6,36` — requires verdict/summary/findings/next_steps; confidence inside findings only | upstream schema |

**Schema-mismatch interpretation**: my consult asked for "verdict, confidence" schema in JSONL streams. Reality: codex verdict architecture is BIFURCATED:
- **JSONL streams** = hook telemetry events (filter_rejected_not_commit / main_entered / launched / etc.)
- **Per-commit .txt files** = actual verdict + confidence + findings

This is NOT a bug — it's the actual codex review architecture. My consult misframed the schema expectation.

## Claim 3 — SOTA-WITH-GAPS observability line-cited evidence

### Installed primitives (10 verified)

| Primitive | Location | Source |
|---|---|---|
| promptfoo | `evals/promptfooconfig.yaml` | npm-global v0.121.11 |
| DeepEval | `evals/deepeval/` | PyPI v4.0.0 |
| codex-jsonl audit | `.claude/state/codex_*_reviews.jsonl` | 1541 + 1279 entries |
| codex-review-head | `.claude/state/codex_review_HEAD_*.txt` | per-commit verdicts |
| Phoenix MCP config | `.mcp.json:83` | OTLP gRPC :14317 + UI :16006 |
| Claude Code OTel → Phoenix | `.claude/settings.json:36` | local trace sink |
| Langfuse Python SDK | Z:\venvs\claude\Lib\site-packages | v4.2.0 |
| langfuse-cli | Z:\venvs\claude\Scripts | v0.0.8 |
| ccusage | npm-global | token economics |
| RTK | tools/rtk_filter.py | token efficiency |

### P0 GAP — Pass-rate gate

**Missing**: `evolve_pass_rate_gate.py` — promptfoo/DeepEval are SCAFFOLDS not REGRESSION-BLOCKING GATES
**Evidence**: `evals/README.md:40` explicitly says "promotion to mandatory gate is future work after eval discipline matures"
**Impact**: eval results are observed but NOT enforced; regressions don't auto-block

### P1 GAPS (5)

| # | Gap | Severity | Evidence |
|---|---|---|---|
| 1 | Normalized codex verdict JSONL | P1 | Verdicts in .txt files NOT JSONL stream |
| 2 | Langfuse sink not wired | P1 | SDK + CLI installed but `.claude/settings.json:42` defers parallel sink "pending credentials or OTel Collector fan-out" |
| 3 | Persistent eval-result dashboard/trend | P1 | `promptfoo view` local-only; no Confident dashboard wire |
| 4 | Phoenix container live-liveness | P1 | Config strong but `docker ps` sandbox-blocked — not LIVE verified |
| 5 | DeepEval LIVE-by-default | P1 | `test_smoke.py:32` runs LIVE LLM judge unless `DEEPEVAL_SKIP_LIVE=1` — INVERTED cost-guard (token-burn risk) |

### P2 GAPS (4)

| # | Gap | Severity | Rationale |
|---|---|---|---|
| 1 | OpenLIT | P2 | DEFER — Phoenix covers OTel-native observability |
| 2 | Ragas | P2 | DEFER — DeepEval covers RAG metrics |
| 3 | Helicone | P2 | DEFER — ccusage + Phoenix cover spend/trace |
| 4 | promptfoo@latest doc drift | P2 | `evals/README.md:19` → pin to 0.121.11 |

## SOTA references verified

- promptfoo: `https://www.promptfoo.dev/docs/configuration/reference/`
- DeepEval: `https://deepeval.com/docs/metrics-introduction`
- OpenLIT: `https://docs.openlit.io/latest/sdk/overview`
- Phoenix: `https://arize.com/docs/phoenix`
- Langfuse: `https://langfuse.com/docs`
- Ragas: `https://docs.ragas.io/en/latest/references/evaluate/`
- Helicone: `https://docs.helicone.ai/guides/cookbooks/cost-tracking`

## GPT-5.5 SOTA recommendation priority (verbatim)

1. Add a small pass-rate gate first: parse promptfoo/DeepEval results and fail on pass-rate regression before adding new eval frameworks
2. Normalize Codex review outputs into a verdict JSONL summary stream with `{ts, sha, verdict, confidence_or_null, source_file}`
3. Wire either Langfuse sink or an OTel Collector fan-out from the existing Phoenix trace stream
4. Fix DeepEval live-test default so `pytest evals/` is token-safe by default
5. Defer OpenLIT/Ragas/Helicone until there is concrete demand not covered by Phoenix + DeepEval + promptfoo + ccusage

## Cite trail

- Codex consult prompt: `.claude/state/codex_consult_w134_f19_dim6_eval_focused.txt`
- Codex consult OUT (verdict): `.claude/state/codex_consult_w134_f19_dim6_eval_focused_OUT.txt`
- eee Dim 6 inventory paths (10 primitives listed in "Installed primitives" table above)
- Path P recipe: `fire-15-gpt55-convergence/02-path-p-recovery-recipe.md`

## Mia ladder advance

n=1352 → n=1365 (+13: 10-row installed-primitive table / 5 P1 gap rows / 4 P2 gap rows / DeepEval LIVE-by-default cost-guard inversion / promptfoo doc-drift identified / 1541+1279 JSONL entry verification / Phoenix sandbox-blocked live-liveness scope note / GPT-5.5 5-step recommendation priority / SOTA references verified across 7 ecosystem URLs / verdict JSON captured / schema-bifurcation analysis (JSONL vs .txt files) / Wave 119 Ship 5 + Wave 121 Ship 2 lineage cited / codex verdict architecture clarified)
