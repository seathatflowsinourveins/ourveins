# W305 — D-v6-2 G11 Memory-Class Eval Lane-D + Mem0 Head-to-Head Scaffolding

> **Wave**: W305
> **Branch**: `sota-converge-w295` (HEAD `da92e2c` post-W304 codex-r1 closure)
> **Predecessors**: W301 (sca-v6 designed DESIGN-ONLY) · W302+W303 side-channels · W301.E side-channel · W304 (5-source convergence flagged Mem0 AT-RISK)
> **Started**: 2026-05-18
> **Rubric**: sca-v5 active; sca-v6 design pending operator §7 approval; this wave SHIPS partial-v6 SKILL.md edits ONLY for deltas that don't require operator approval (D-v6-2 Lane-D skeleton)
> **Operator mandate (verbatim 3rd-repetition signal)**:
> > "audit your architecture... NO BIASES. INTEGRATE SOTA RESEARCH WITH GPT5.5 UNLEASH... what should be the next priority?... which current repos adaption can be replaced by more sota repos at newest ai landscape in 2026 MAY... improve your decision making itself, depth and comprehensiveness... ship with convergence sota insights and e2e with gpt 5.5"

## §0 TL;DR

W304 synthesis explicitly answered "next priority?" = **W305 P0: D-v6-2 G11 memory-class eval Lane-D BEFORE Mem0 install decision**. W305 ships:
1. `harness/eval_harness.py` Lane-D skeleton (`--mode memory-recall-lane --candidate <slug>`) — operator-runnable when challenger installs land.
2. `W305-LANE-D-DESIGN.md` — concrete benchmark protocol (metrics, datasets, run-config, scoring).
3. `W305-STREAM-A-CHALLENGER-API-CONTRACTS.md` — research output: install path + Python/REST API contract + cost model for each of 6 candidates (Mem0 + 5 challengers from W304 Stream A+B).

Operator-confirm-needed (out of W305 scope): actual `pip install mem0ai` + 5 challenger installs (each a separate cardinal-rule-1 install decision); Langfuse SEV-1 key rotation; OthmanAdi Phase-5 audit-or-deactivate; R4 STRENGTHEN-REVERSAL CLAUDE.md edit; Phoenix MCP backend restart.

## §1 Stream definitions

### Stream A — 5 Mem0-challenger API contract + install path research

- **Owner**: `agent-A-challenger-apis`
- **Owned file**: `docs/architecture/W305-D-V6-2-LANE-D-MEM0-HEADHEAD/W305-STREAM-A-CHALLENGER-API-CONTRACTS.md`
- **Mandate**: For EACH of 6 candidates (incumbent `mem0ai/mem0` + 5 W304-surfaced challengers), research and document:
  1. Install path (pip / npm / Docker / cargo) with exact command + version pin
  2. Python API contract (or REST/TS/Rust as applicable): `add()` / `search()` / `delete()` signatures
  3. LongMemEval benchmark fixture (if provided upstream) OR how to run the benchmark from scratch
  4. Cost model: per-op cost (LLM calls / embeddings) + storage cost + estimated benchmark-run cost
  5. Windows-portability check (since runtime is Z:-portable Win11)
  6. Cardinal-rule conformance check (CR-1 trusted source · CR-2 no self-invented hooks · CR-9 version-pinned)
- **6 candidates**:
  - `mem0ai/mem0` (incumbent T1-with-caveat AT-RISK)
  - `RBKunnela/ALMA-memory` (R@5=0.964 VERIFIED, 43★)
  - `vbcherepanov/total-agent-memory` (R@5=0.962 VERIFIED)
  - `rohitg00/agentmemory` (95.2% cited)
  - Mastra OM (94.87% cited)
  - `Uranid/mnem` (Rust+WASM KG; architectural)
- **Deliverable**: ≤700 lines. 6 candidate cards with the 6-field schema. Cross-reference matrix at end: which 2 candidates have the EASIEST install path (priority for Lane-D first runs).

### Stream B — sca-v6 partial-ship survey: which W301-D deltas can ship WITHOUT operator §7 answers?

- **Owner**: `agent-B-sca-v6-partial-ship`
- **Owned file**: `docs/architecture/W305-D-V6-2-LANE-D-MEM0-HEADHEAD/W305-STREAM-B-SCA-V6-PARTIAL-SHIP-SURVEY.md`
- **Mandate**: Of the 6 W301-D v6 deltas (D-v6-1 Phase-6 ensemble · D-v6-2 Lane-D · D-v6-3 contamination Stage-1 · D-v6-4 composite CIs · D-v6-5 anti-bias enforcement · D-v6-6 operator-override audit trail), identify which can be SAFELY shipped to `.claude/skills/sota-convergence-audit/SKILL.md` THIS wave without requiring operator approval on the 10 §7 open questions:
  - D-v6-2 Lane-D — DEFINITELY SHIPS (parent's harness skeleton + design doc this wave).
  - D-v6-4 composite CIs — does this require operator approval? Identify the §7 question if so.
  - D-v6-6 override audit trail — does this require operator approval? Identify §7 question.
  - D-v6-1 / D-v6-3 / D-v6-5 — likely NOT safe (cost-cap raise + anti-bias enforcement scope).
- **For each delta**: cite the W301-D §7 question that GATES it (if any); recommend SHIP-NOW / DEFER / OPERATOR-APPROVE.
- **Deliverable**: ≤300 lines. 6-row delta table + recommendation per delta + draft SKILL.md edit text for each SHIP-NOW candidate.

## §2 Parent-owned work (this wave)

1. **`harness/eval_harness.py` Lane-D skeleton** — add `--mode memory-recall-lane` parser branch that:
   - Accepts `--candidate <slug>` (one of the 6 candidate slugs)
   - Loads candidate adapter from `harness/adapters/memory_recall/<slug>.py` (placeholder)
   - Runs 3 benchmarks: LongMemEval + HotPotQA + TwoWikiMultiHop (placeholders for now)
   - Emits inspect_ai-compatible EvalLog JSON to `verdicts/W<wave>-<slug>-lane-d-evallog.json`
   - Returns `{lane: "memory-recall", candidate, baseline: mem0, metric: recall_precision_at_5, value, delta_vs_baseline, traces}`
2. **`W305-LANE-D-DESIGN.md`** — concrete protocol:
   - Lane name + invocation
   - Metrics (recall_precision, durability, scaling, retrieval-latency p50/p95/p99)
   - Datasets (LongMemEval, HotPotQA, TwoWikiMultiHop; pinned splits)
   - Run-config (sample size, seed, retries, timeout)
   - Scoring rubric (Δ vs Mem0 baseline → D8 benchmark_deltas mapping)
   - Eval-log schema (inspect_ai compatible)
3. **`W305-SYNTHESIS-2026-05-18.md`** — cross-stream synthesis + next priority for W306
4. **Codex GPT-5.5 e2e gate** — codex:codex-rescue async on commit; address HIGH inline; MEDIUM defer per W288/W289 precedent

## §3 Out-of-scope (operator-confirm-required)

- Actual `pip install mem0ai==<pin>` and the 5 challenger installs (each a separate cardinal-rule-1 install decision; operator-action queue items)
- Actual Lane-D benchmark RUNS (require the installs above)
- SKILL.md edits for sca-v6 deltas that depend on operator §7 answers (Stream B will identify which can ship safely)
- SEV-1 Langfuse key rotation (operator-only — secret handling)
- HIGH operator-action items 1-5 from W304 carry-forward queue

## §4 Cardinal-rule invariants — must hold post-wave

- CLAUDE.md ≤ 50 LOC; settings.json ≤ 15 KB; ≤ 3 worktrees
- `self_invented_count: 0`
- T6 basic-memory + VERDICT-LEDGER.md ledger contract
- codex `reviewGateEnabled: true`
- 6-tier memory contract unchanged (T1+T2-split+T3+T4-RETIRED+T5+T6)

## §5 Wave-success criteria

- 2/2 streams produce non-empty deliverables
- `harness/eval_harness.py` Lane-D skeleton lands + smoke-test (parser branch reachable; placeholder error message correct)
- W305-LANE-D-DESIGN.md committed with concrete protocol
- Codex round-1 verdict: APPROVE or REVISE-MEDIUM-only (no HIGH unaddressed)
- Branch ready to commit; operator confirms push when ready
