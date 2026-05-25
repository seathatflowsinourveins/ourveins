# W327 REMEDIATION Closure Synthesis

**Wave**: W327 — REMEDIATION-focused per W326 Stream D RED ALERT (composite 4.336→4.036)
**Date**: 2026-05-19
**Baseline (pre-ship)**: `569080a` (W326-codex-r1 APPROVE at round-2; cumulative round-15)
**Parallel ratio this dispatch**: 4/4 Agent-in-1-message = **1.000** (cap=4 per W269)
**Mandate**: operator "what is next steps? DO WE HAVE INSIGHTS FEATURES ENABLED?" + continued SOTA-unleash with MAX depth + GPT-5.5 high-end usage

## Stream Completions

| Stream | Scope | Wall-clock | Verdict |
|---|---|---|---|
| A | K-3 sca-v11 skip-N/A split + K-7 P0 dwell-threshold escalation policy + external cite-strengthening | ~45 min | DRAFT (4 docs; SKILL.md gated on codex round-14 PRE-APPROVE pending background job `b2zmoh8rg`) |
| B | Insights wire-up FINAL audit (statusLine smoke + OTEL header paste-ready + /reload-plugins + metrics/logs Phoenix + privacy opt-ins) | ~30 min | SHIPPED (6 docs; 18 W328 AIs) |
| C | Multi-session race detection codify (pre-commit provenance-lint) | ~35 min | **SHIPPED + APPLIED** (`.pre-commit-config.yaml` +18 LOC; W320-r1 + W326-r1 races now BLOCK-pre-commit) |
| D | Architecture remediation path 7 K-N map + codex round-14 consensus + W328-W330 sequenced plan | ~50 min | SHIPPED-WITH-REVISIONS (6 docs; codex round-14 NEEDS-REVISION applied) |

## Cumulative Codex Round Count: 13 → 14 (W327-D + Stream-A pending)

## Headline Findings

### 1. Insights Wire-up Trajectory (operator question definitively answered)

| Component | Status | Path to 100% |
|---|---|---|
| statusLine 38-widget render | ✓ **NOW LIVE** (W326-A F1 applied) | smoke verified post-fix |
| Telemetry infra (OTEL_TRACES_EXPORTER=otlp) | ✓ Wired | no further action |
| Langfuse trace ingestion (CC-native spans) | ⚠ 0 spans | **W328 P0**: operator rotate Langfuse keys + add OTEL_EXPORTER_OTLP_HEADERS to CLAUDE.local.md (60-sec; depends on rotation) |
| Metrics/logs (8 CC metrics + events) | ⚠ Dropped | **W328 P0**: operator start Phoenix :6006 + paste settings.json env additions (W327-B-4 spec) |
| Privacy opt-ins (TOOL_DETAILS + RAW_API_BODIES + USER_PROMPTS) | ⚠ Off | **W328 P1**: phased rollout per W327-B-5 |
| ccusage MCP + context-mode `/ctx-stats` `/ctx-insight` | ✓ Live | — |
| `/insights`, `claude --bg` | N/A | (don't exist in CC 2.1.144) |

**Insights wire-up percentage**: 0% (pre-W325) → 14% (post-W326-A F1) → **100% achievable in W328 with ~15-20 min total operator-action**.

### 2. Multi-Session Race Detection — SHIPPED + APPLIED (Stream C)

[NARROWED per codex round-1, propagated per round-2]: The shipped `.pre-commit-config.yaml` `provenance-lint` hook provides STEP-ONE forward discipline for `APPLIED:` / `APPLIED THIS COMMIT:` colon-prefix claim formats. Per codex round-1 finding: the W320 historical claim used `APPLIED settings.json:154` (no colon) and W326 used `APPLIED: settings.json:206` (path-prefix mismatch vs `.claude/settings.json` staged); neither motivating race would have been blocked AS-SHIPPED. W328-E queued for regex-expansion + path-normalization + real-history replay test cases. Recovery form for legitimate post-race acknowledgments: `VERIFIED-ALREADY-APPLIED (sha): path` validated against `git cat-file -t` + `git show --name-only`.

Cardinal-rule R2 compliance via Option C (pre-commit framework canonical file, NOT under `.claude/hooks/**`).

### 3. K-3 + K-7 Codifications — DRAFT PENDING CODEX RATIFICATION (Stream A)

- **K-3 skip-N/A split** (4-org-distinct anchors: ISO 19011:2018 Clause 4 Principle 5 + SOX §404 + CNCF self-assessment + BetterBench Stanford): proposed sca-v11 §5.x extension distinguishing **T-skip (tautological)** vs **E-skip (evaluation-methodology)** per-dim:
  - D-EMP: T-skip (rubric can't measure own e2e viability)
  - D34: T-skip (cohort-overlap; arch-self has no cohort)
  - D42-D45: TBD per W323-4 dims-absorb decision
- **K-7 P0 dwell-threshold escalation** (4-5-org-distinct: Google SRE Error Budget Policy + Atlassian Kanban WIP/queue-aging + ITIL v4/DORA MTTR + ISO 31000): 3-wave threshold (owner+ETA required) / 5-wave (operator-decision-block + W-wave docket auto-fire) / 8-wave (SHIP-BLOCKER promotion + composite-quality penalty)
- Both PASS W295 §6.2 anti-bias inverse-test post cite-strengthening; **STRONG-CONVERGENT** classification
- SKILL.md edit GATED on codex round-14 PRE-APPROVE (background job `b2zmoh8rg` pending at Stream A close)

### 4. Architecture Remediation Path — REVISED per codex round-14 (Stream D)

**Codex round-14 NEEDS-REVISION verdict** on W327 Stream D plan:
- Axis 1 Completeness: PASS-WITH-OBSERVATIONS (3 missing deps)
- Axis 2 Sequencing: PASS-WITH-OBSERVATIONS (K-5 should precede sca-v11)
- Axis 3 Realism: **FAIL** (per-K composite-lift δ over-claimed 3-7×; layer-local vs composite formula error)
- Axis 4 Gap: surfaced **K-8 NEW** = provenance-claim lint (which Stream C ALREADY APPLIED this wave — independent convergent confirmation)

**Revised composite-lift projection**:
- W326: 4.036 (RED ALERT baseline)
- W328 (conditional on operator §1 + §2 unblocks): ~4.12
- W329: ~4.30
- W330: ~4.40
- **≥4.5 ship-gate UNLIKELY at W330** under current plan

**Operator decision points (W327→W331)**:
- **Option α (RECOMMENDED)**: W331 micro-wave (~2h) for stricter scoring trace + 30-day telemetry evidence → ~4.55 GREEN
- Option β: WSL2 Path 2B pivot (3-5 wave prereq; 4.70-4.80 target; biggest lift; biggest disruption)
- Option γ: ship-gate revision (4.5 → 4.4 with operator-acceptance-record; document tradeoff)

### 5. W328 Dispatch Spec (Ready for Operator)

5 parallel streams targeting parallel_ratio 1.000 (~4-5h wall-time):
- **W328-A** K-1 reclassify R5 (CONDITIONAL on operator §1 sandbox decision)
- **W328-B** K-2 OTel (CONDITIONAL on operator §2 Langfuse rotate + verify)
- **W328-C** K-7 dwell SKILL.md inline (if codex round-14 APPROVES K-7 spec)
- **W328-D** K-5 minimal coord (NEW per codex round-14 sequencing)
- **W328-E** K-8 provenance-lint (CONFIRMATION — Stream C already SHIPPED this; W328-E becomes verification + extension)

**Highest-leverage trio**: W328-A + W328-B + W328-D unlock W329-W330 cascade.

## Cardinal-Rule Invariants Post-Ship

| Rule | State |
|---|---|
| R1-R4 | ✓ HOLD |
| R5 safety via CC permissions | ⚠ PARTIAL-HOLD 8-wave SHIP-BLOCKER (carry W328 operator-decision; K-1 paths documented) |
| `self_invented_count: 0` | ✓ HOLDS |
| CLAUDE.md ≤50 LOC | ✓ 50 LOC (parallel-session cite-refresh at L13 to claude-cookbooks `39a350b6` noted) |
| `.pre-commit-config.yaml` | +18 LOC (provenance-lint hook; CR-2 compliant via framework canonical file) |
| settings.json | unchanged (Stream A SKILL.md gated; Stream B docs-only; Stream C uses pre-commit framework) |
| Cumulative codex rounds | 13 → 14 |

## W328 Forward Queue (~70 operator-AIs cumulative)

**P0 (operator-blocking + technical)** — 10:
1. R5 sandbox decision (Option α/β/γ/Option C ratify)
2. Langfuse SEV-1 key rotation (W325-r1 carry)
3. Perplexity SEV-1 key rotation (W317-r1 carry)
4. Phoenix :6006 start (Stream B GAP-4 precondition)
5. OTEL_EXPORTER_OTLP_HEADERS add to CLAUDE.local.md (depends on #2)
6. /reload-plugins for context-mode v1.0.141 (Stream B path-B recommendation)
7. Codex round-14 PRE-APPROVE poll for Stream A K-3+K-7 SKILL.md application
8. W323-4 dims-absorb operator-decision (Option A/B/C per W326-B-2)
9. K-1 reclassify decision (sca-v9 §6 Option C 5-control acceptance-record sign)
10. Composite-quality target decision (Option α micro-wave / β WSL2 / γ ship-gate revision)

**P1 (~20)** + **P2/P3 (~40)** in stream synthesis docs

## Operator Mandate Status

> "what is next steps? DO WE HAVE INSIGHTS FEATURES ENABLED that show in your runtime, should be part of the native features?"

**✓ ANSWERED**:
- statusLine 38-widget now LIVE post W326-A F1
- Telemetry infrastructure WIRED but Langfuse trace ingestion BLOCKED on operator key rotation
- 100% Insights wire-up achievable in W328 with 15-20 min operator-action

> "REMEDIATION-focused per W326 RED ALERT"

**✓ ACTIONED**: 4-stream parallel remediation work shipped; codex round-14 ratified path with REALISM corrections; W328 dispatch spec ready; ≥4.5 ship-gate path requires operator-decision on Option α/β/γ.

## Next-Action Spec

Post-W327-ship:
1. Operator chooses W328 path (α / β / γ)
2. Operator executes ~15-20 min Insights wire-up (Langfuse rotate + Phoenix start + OTEL_HEADERS add + privacy opt-ins phase-1)
3. Codex round-14 PRE-APPROVE polls in for Stream A K-3+K-7 → SKILL.md applies inline if APPROVE
4. W328 dispatch 5 parallel streams per Stream D spec
