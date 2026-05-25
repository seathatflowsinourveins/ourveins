# 02 — Current vs Ultimate Architecture Gap Matrix (post-100% cross-model close)

> **Purpose**: comprehensive cross-dim gap map showing CURRENT state vs ULTIMATE target
> per architecture dimension, with concrete ship path + cite anchor + effort estimate.
> All gaps cross-model verified across Fire 13-20.

## Aggregate gap summary

| Severity | Count | Source Fires |
|---|---|---|
| P0 (critical) | 1 | Fire 19 (Eval) |
| P1 (important) | 8 | Fire 19 (5) + Fire 20 (3) |
| P2 (low) | 7 | Fire 19 (4) + Fire 20 (3) |
| **TOTAL** | **16** | Cross-model verified across 8 dims |

## P0 GAP (1)

| ID | Gap | Dim | Source | Cite | Effort | Risk |
|---|---|---|---|---|---|---|
| P0-1 | `evolve_pass_rate_gate.py` install (regression-blocking eval) | Dim 6 | Fire 19 conf=0.88 | `evals/README.md:40` says future work | 120min | LOW |

**Why P0**: promptfoo + DeepEval are scaffolds NOT regression-blocking gates. Eval discipline is observe-only; regressions don't auto-block. This is the SINGLE critical gap across all 8 dimensions.

## P1 GAPS (8)

### Dim 6 Eval P1 (5)

| ID | Gap | Cite | Effort |
|---|---|---|---|
| P1-1 | Normalize codex verdict JSONL stream | `.claude/state/codex_*_reviews.jsonl` schema-mismatch with `.txt` verdicts | 60min |
| P1-2 | DeepEval LIVE-default fix (TOKEN-BURN protection) | `evals/deepeval/test_smoke.py:32` inverted cost-guard | 30min |
| P1-3 | Langfuse sink OR OTel Collector fanout | `.claude/settings.json:42` defers Langfuse parallel sink | 60-180min |
| P1-4 | Persistent eval-result dashboard/trend store | `promptfoo view` local-only | (DEFER) |
| P1-5 | Phoenix container live-liveness proof | `docker ps` sandbox-blocked verification | (smoke probe) |

### Dim 7 Token-Eff P1 (3)

| ID | Gap | Cite | Effort |
|---|---|---|---|
| P1-6 | LiteLLM/Portkey active token middleware | Currently passive ccusage/cpa; `docs/sota-installed-manifest.md:282` lists LiteLLM as planned | 240min |
| P1-7 | Mechanical per-agent prefix_freeze enforcement | `docs/v64-stable-prefix-convention.md:60,137,242` FORWARD-REF | (DEFER) |
| P1-8 | Mechanical fork-vs-fresh subagent routing | FM-17.f documented at `docs/install-provenance.md:6449,13053` | (DEFER) |

## P2 GAPS (7)

### Dim 6 Eval P2 (4) — all DEFER

| ID | Gap | Rationale |
|---|---|---|
| P2-1 | OpenLIT | DEFER — Phoenix covers OTel-native (DUPLICATE per kiss-dry-yagni) |
| P2-2 | Ragas | DEFER — DeepEval covers RAG metrics (specialization) |
| P2-3 | Helicone | DEFER — ccusage + Phoenix cover spend/trace (SaaS-gateway analytics) |
| P2-4 | promptfoo README `@latest` → `@0.121.11` | DOC DRIFT; 15min fix |

### Dim 7 Token-Eff P2 (3)

| ID | Gap | Cite | Effort |
|---|---|---|---|
| P2-5 | Autocompact threshold drift (settings=70 vs launcher=85) | `.claude/settings.json:33` vs `tools/eee.ps1:85` — pick source-of-truth | 15min |
| P2-6 | ccusage statusline comment drift | `.claude/settings.json:483,605` — live uses ccstatusline; eee-status uses ccusage | 15min |
| P2-7 | ANTHROPIC_PROMPT_CACHE_* env vars unused | Replaced by ENABLE_PROMPT_CACHING_1H + context-mode + CLIProxyAPI — DOCUMENT | 15min |

## Pattern A apply ship sequencing (Fire 21+)

### Tier 1 — Token-safety + P0 (priority NOW)

| # | Ship | Priority | Effort | Risk |
|---|---|---|---|---|
| 1 | W134-F22-A: DeepEval LIVE-default fix (P1-2) | TOKEN-SAFETY | 30min | VERY LOW |
| 2 | W134-F22-B: evolve_pass_rate_gate.py install (P0-1) | REGRESSION-BLOCKING | 120min | LOW |
| 3 | W134-F22-C: Codex verdict normalizer (P1-1) | OBSERVABILITY | 60min | LOW |

### Tier 2 — Doc-drift cleanup (cheap wins)

| # | Ship | Priority | Effort |
|---|---|---|---|
| 4 | W134-F23-A: promptfoo README pin (P2-4) | DOC DRIFT | 15min |
| 5 | W134-F23-B: Autocompact threshold reconcile (P2-5) | DOC DRIFT | 15min |
| 6 | W134-F23-C: ccusage statusline comment fix (P2-6) | DOC DRIFT | 15min |
| 7 | W134-F23-D: ANTHROPIC_PROMPT_CACHE_* documentation (P2-7) | DOC DRIFT | 15min |

### Tier 3 — Pattern extraction (cite-only, no install)

| # | Ship | Priority | Effort |
|---|---|---|---|
| 8 | W134-F24-A: ARIS effort-knob extract to advanced-agent-team-standing-directive.md | PATTERN | 45min |
| 9 | W134-F24-B: ARIS 6th-org sister-framework reference | PATTERN | 30min |
| 10 | W134-F24-C: Pattern D codification in codex-t1-fix-forward-pattern.md | PATTERN | 60min |
| 11 | W134-F24-D: Path P recipe → `.claude/skills/path-p-codex-t1-invoker/SKILL.md` | PATTERN | 60min |
| 12 | W134-F24-E: 4-prescribed Dim 5 hook documentation updates | PATTERN | 60min |

### Tier 4 — Install pilot ships (gated on demand)

| # | Ship | Gate predicate | Effort |
|---|---|---|---|
| 13 | W134-F25-A: Letta install pilot | demand-surface for self-improvement workflow | 120min |
| 14 | W134-F25-B: PageIndex per-doc install (L4a) | with 3 corrections applied | 90min |
| 15 | W134-F25-C: OpenSpec re-audit | WORKSPACE_REIMPLEMENTATION_* completes | 30min |

### Tier 5 — DEFER per concrete demand (forward-ref)

| # | Item | Defer rationale |
|---|---|---|
| 16 | LiteLLM/Portkey active middleware | Wait for cost overrun signal |
| 17 | Per-agent prefix_freeze enforcement | Wait for cache-hit-rate degradation |
| 18 | Fork-vs-fresh subagent routing | Wait for FM-17.f recurrence |
| 19 | Langfuse cloud sink | Wait for cloud aggregation requirement |
| 20 | Phoenix live-liveness smoke probe | When operator can run docker ps |
| 21 | Persistent eval dashboard | per kiss-dry-yagni (DEFER) |

### Tier 6 — DEFER per kiss-dry-yagni Must-Never #4

| Item | Defer rationale |
|---|---|
| OpenLIT | Phoenix covers OTel-native (DUPLICATE) |
| Ragas | DeepEval covers RAG metrics |
| Helicone | ccusage + Phoenix cover spend/trace |

## Effort vs impact map

| Effort | Impact | Items |
|---|---|---|
| LOW (15-30min) | HIGH | P1-2 DeepEval fix; P0-1 split off ranking |
| LOW (15-30min) | LOW | 4 doc-drift fixes (P2-4 through P2-7) |
| MEDIUM (45-90min) | HIGH | P0-1 evolve_pass_rate_gate; pattern extracts (ARIS effort-knob; Pattern D; skill promotion) |
| HIGH (120-240min) | MEDIUM | LiteLLM active middleware; Letta install |
| HIGH (DEFER) | LOW | Forward-ref items (prefix-freeze; fork-routing) |

## Concrete ship roadmap (Tier 1 prioritized order)

```
Fire 22 (NOW):
├── W134-F22-A: DeepEval LIVE fix (30min, P1-2, TOKEN-SAFETY)
├── W134-F22-B: evolve_pass_rate_gate.py install (120min, P0-1)
└── W134-F22-C: Codex verdict normalizer (60min, P1-1)

Fire 23 (next):
├── W134-F23-A: promptfoo README pin (15min, P2-4)
├── W134-F23-B: Autocompact threshold reconcile (15min, P2-5)
├── W134-F23-C: ccusage statusline comment fix (15min, P2-6)
└── W134-F23-D: ANTHROPIC_PROMPT_CACHE_* doc (15min, P2-7)

Fire 24 (pattern extraction):
├── W134-F24-A: ARIS effort-knob extract (45min)
├── W134-F24-B: ARIS 6th-org sister-framework (30min)
├── W134-F24-C: Pattern D codification (60min)
├── W134-F24-D: Path P skill promotion (60min)
└── W134-F24-E: Dim 5 hook documentation updates (60min)

Fire 25+ (install pilots, demand-gated):
├── Letta install pilot (IF demand surfaces)
├── PageIndex per-doc install (IF L4a queued)
└── OpenSpec re-audit (IF WORKSPACE_REIMPLEMENTATION_* completes)
```

## Total wave-of-arc effort estimate

| Tier | Items | Effort | Risk |
|---|---|---|---|
| Tier 1 (P0 + token-safety) | 3 ships | ~210min | LOW |
| Tier 2 (doc-drift) | 4 ships | ~60min | ZERO |
| Tier 3 (pattern extracts) | 5 ships | ~255min | LOW |
| Tier 4 (install pilots) | 3 ships | ~240min (gated) | MEDIUM |
| Tier 5+6 (DEFER) | 9 items | (forward-ref) | (DEFER) |
| **TOTAL** | **15 active ships** | **~12.75 hours** | (across tiers) |

## Architecture maturity post-Tier-1 ships

After Fire 22 Tier 1 completion:
- ✅ 1 P0 → 0 P0
- ✅ 8 P1 → 5 P1 (DeepEval + verdict normalizer + 1 P1 closed)
- ✅ Eval discipline: observe-only → REGRESSION-BLOCKING
- ✅ Token-burn protection: at-risk → SAFE
- ✅ Codex verdict observability: bifurcated (.txt + JSONL) → UNIFIED JSONL stream

This is the FASTEST path to closing the load-bearing gaps.

## Mia ladder advance

n=1420 → n=1432 (+12: aggregate gap summary / 1 P0 + 8 P1 + 7 P2 detailed table / 6-tier ship roadmap / effort-impact map / concrete ship roadmap diagram / total effort estimate ~12.75hr / architecture maturity post-Tier-1 projection / 4 P2 doc-drift batched / Tier 3 pattern-extract enumerated / Tier 4 install-pilot gates documented / Tier 5+6 DEFER rationale / Wave 134 arc forward visibility)
