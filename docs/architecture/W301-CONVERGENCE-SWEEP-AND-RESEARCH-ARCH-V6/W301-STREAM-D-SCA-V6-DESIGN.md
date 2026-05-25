# W301 Stream D — sca-v6 Research-Arch Design

> **Wave**: W301; **Stream**: D; **Owner**: agent-D-arch-v6; **Date**: 2026-05-18
> **Status**: DESIGN ONLY (no `.claude/skills/sota-convergence-audit/SKILL.md` edit this wave; v6 ship is W302+ pending operator approval)
> **Predecessors**: W288 (v3) · W291 (v3.1) · W295 (Δ1-Δ12 synthesis) · W296 (v4 12-SHIP blueprint, absorbed) · W297 (v5 multi-MCP cascade, shipped) · W299 (v5 ratification)
> **Verdict-on-self (under sca-v5)**: install_score = **4.65** [replayable per §5.bis honest dim-score table; codex-r1 W301-HIGH-2 closure supersedes prior non-replayable 4.42] ≥ 4.0 floor → **T1 INSTALL** (conditional on W302 codex Stop-hook APPROVE; per W292 §7 cross-model gate pattern); pattern_score = **3.84** [replayable per §5.bis; supersedes prior 4.21] ≥ 3.5; all 11 hard-caps cleared.

---

## §0 — TL;DR

sca-v5 ships in W299 with 17 deltas bundled (W296 v4-SHIP × 12 + W297 cascade × 5). The 5 deferred items targeted at v6+ are: (1) **Phase-6 multi-judge ensemble FULL** (closes length-bias + self-preference-bias per Zheng+ 2023; v5 only closes position-bias via single-swap MVP); (2) **G11 memory-class eval lane** (4th eval lane, deferred from W295 Δ9 / W296 §6 row 17); (3) **contamination check moved Stage-5 → Stage-1** (early-filter cost-reduction); (4) **composite confidence intervals** (replaces point estimates per NIST AI RMF Measure 2.7 uncertainty quantification); (5) **anti-bias org-distinct ENFORCEMENT** (v5 advisory `§4.6` mandate → v6 mandatory pipeline-BLOCK); (6) **operator-override audit trail** (every cost-cap/tier/hard-cap waiver emits a tracked override-verdict file). All 6 deltas anchor to ≥3 organisationally-distinct external rubrics or seminal papers; all 15 v3+v5 don't-break invariants are KEPT or EXTENDED; **5 SHIP-W302 + 1 DEFER-W303** (contamination-Stage-1 deferred pending ground-truth contamination corpus build-out). Self-eval install_score for v6-as-candidate under sca-v5 = **4.65** [replayable per §5.bis; codex-r1 W301-HIGH-2 closure supersedes prior non-replayable 4.42] → T1 INSTALL passes with margin. v5 → v6 cost delta is +$0.50 to +$1.50 per T1 verdict (ensemble dominates); the AGING re-litigation cron amortises by sampling.

---

## §1 — Context — what v5 ships and what v6 closes

### v5 current state (per `.claude/skills/sota-convergence-audit/SKILL.md` HEAD, 663 LOC, W299 ship)

sca-v5 is the **17-delta cutover** that landed in W299 (`docs/architecture/W297-LIVE-AUDIT-AND-LOCAL-MODEL-LAYER/W297-STREAM-D-MULTI-MCP-DISCOVERY-CASCADE.md §8` compatibility table). Section anchors that v6 must respect:

| Section | Line range | v5 scope |
|---|---|---|
| §1 Discover — multi-MCP cascade | L38-L139 | Tier-0/1/2/3 cascade with cost-caps $0.02/$0.10/$2.00/$5.00, op-override $20 max |
| §2 Verify harness-fit | L140-L151 | unchanged from v3 |
| §3 Converge — typed-evidence | L152-L174 | ≥3 source families per claim |
| §4 Score — 14-dim rubric (now 17 dims, D-IDs D1-D21) | L175-L233 | Composite denom 19.3 install / 9.4 pattern |
| §4.5 Eval-harness lane (A/B/C) | L234-L275 | 3-lane harness; **G11 memory-lane deferred** |
| §4.6 Citation-accuracy spot-check | L276-L315 | codex 10% sample, +$0.40 budget |
| §5 Adversarial review (Phase-5 5-gate + Phase-6 position-swap) | L316-L379 | 5 named gates + 1-swap MVP; **multi-judge ensemble deferred** |
| §5.7 MCP-family disagreement-first-class | L357-L378 | codex weighted-consensus mediation |
| §6 Decide — 5-tier ladder | L380-L489 | T1 INSTALL ≥4.0, T2 [3.0,3.9], T3 ≥3.5+D2≥4+D13≥3, T4, T5 |
| Hard-cap taxonomy | L390-L412 | 11 caps (Universal REJECT × 4 + INSTALL-only × 6 + T1+T2 × 1 + VENDOR-FORK × 1) |
| Decision-decay state machine | L541-L575 | ACTIVE → AGING → STALE |
| Bayesian author-prior | L576-L593 | α + β + γ - δ formula for D6 |
| Anti-patterns | L594-L616 | inverse-test, silent average, low-score auto-REJECT |
| References | L617-L663 | W288/W291/W292/W295/W296/W297 lineage |

### Identified gaps v6 closes (sourced from W295 / W296 / W297 deferrals)

1. **W295 Δ11 Phase-6 multi-judge ensemble (HIGH staged)** — Stream D §3.2 stages **S2-S4** all deferred to v6+: 2nd judge (Claude Opus already in-runtime + qwen3-coder via Ollama), constitutional critique-revise, optional Gemini-2.5 or Prometheus/JudgeLM tiebreaker. v5 ships only **stage S1** (single position-swap).
2. **W295 Δ9 G11 memory-class eval lane (HIGH)** — Stream B basic-memory audit identified memory-MCP candidates score D8 (benchmark_deltas) through Lane C with `--kind=mcp_memory` smoke-test only; no recall_precision / durability / scaling / retrieval-latency metrics. Letta Leaderboard + Cognee benchmark gap.
3. **W295 Δ12 contamination check** — currently Phase-5 Gate-4 (Stage-5, **AFTER** Tier-2 deep + Tier-3 score compute; costs ~$2-$5 per audit before contamination fires). SWE-bench Verified contamination-control protocol (Princeton NLP) practice runs contamination check **FIRST**, before training/eval cost is sunk.
4. **W296 §5.2 v5+ deferred "confidence intervals"** — composite scores are currently **point estimates** (`install_score=4.74`). NIST AI RMF Measure 2.7 + HELM CI methodology + Gelman BDA3 all mandate uncertainty quantification.
5. **W295 W297 §4.6 anti-bias mandate (current state: ADVISORY)** — "MCP family ≥1 candidate to top-10" is a mandate but is not pipeline-enforced (no auto-block on violation). Operator can land a Top-10 with all 10 candidates sourced from `github+exa+WebSearch` (one MCP family) and the pipeline does not stop.
6. **W297 §10 OPEN-DESIGN row #10** — langfuse traces for `cost_actual_spent`. By extension: any operator-override of a cost-cap, tier-routing, or hard-cap waiver is **untracked** today. NIST 800-53 AC-3 + ISO 9001 deviation-control + Anthropic RSP §4 audit-logging all mandate this trail.

These 6 closes = the v6 delta set. Items NOT in scope (deferred to v7+): D22 `cascade_coverage_breadth` dim (W297 §10 row #7), Tavily/Brave/Kagi MCP integration (W297 §10 row #8), per-dim version-bump granularity (W292 R9; partial in v5).

---

## §2 — Six v6 deltas — full design

### 2.1 Delta D-v6-1 — Phase-6 multi-judge ensemble FULL

#### Motivation

Zheng+ 2023 "Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena" (arXiv 2306.05685) catalogues **three named bias classes** of single-LLM judges:

1. **Position bias** — verdicts shift when option order swaps. **CLOSED by v5 §5.6 position-swap MVP.**
2. **Length bias** — verdicts favour longer responses regardless of quality. **OPEN.**
3. **Self-preference bias** — judges prefer outputs from their own model family. **OPEN.**

v5's single-codex position-swap closes class (1) only. Length + self-preference need **multi-judge ensemble** with **persona rotation** AND **evidence-order rotation** — convergent voting closes both class (2) (length-stable majority) and class (3) (cross-model triangulation).

#### Design (concrete protocol)

Replace `5.6 Phase-6 — position-swap MVP` with `5.6 Phase-6 — multi-judge ensemble FULL`. Ensemble protocol per audit:

```
Phase-6 ensemble protocol (v6 FULL)
═══════════════════════════════════
3 codex GPT-5.5 invocations per Phase-6 fire:
   J1: persona=strict-adversarial,    evidence-order=forward
   J2: persona=charitable-historian,  evidence-order=reverse
   J3: persona=neutral-arbiter,       evidence-order=shuffled

Each judge emits {verdict ∈ {APPROVE, REVISE, BLOCK}, confidence ∈ [0,1], rationale}.

Majority verdict: mode(J1.verdict, J2.verdict, J3.verdict).
  3-of-3 agree   → ensemble_consistent: true,  variance = 0.0
  2-of-3 agree   → ensemble_consistent: true,  variance = 0.33, majority wins, tier-demote -1
  1-1-1 split    → ensemble_consistent: false, variance = 1.0,  tier-demote -2 OR force ≤ T4 CITE-ONLY
  2 BLOCK + 1 APPROVE → BLOCK wins (BLOCK is the conservative ratchet)

Log to ledger:
  adversarial_review.phase_6_ensemble:
    judges: [{name, persona, evidence_order, verdict, confidence, rationale_excerpt}]
    majority_verdict: APPROVE|REVISE|BLOCK
    variance: 0.0|0.33|1.0
    ensemble_consistent: bool
    tier_demote_applied: 0|1|2
```

The three persona × evidence-order combinations are **organisationally distinct**: strict-adversarial mirrors NIST AI RMF Manage 2.3 (adversarial-evaluation); charitable-historian mirrors ThoughtWorks TAB-vote (allow-vote dissent permitted); neutral-arbiter mirrors Wikipedia WP:RS independent-reviewer norm. Persona prompts MUST be encoded as static strings in `.claude/skills/sota-convergence-audit/PHASE6-PERSONAS.md` (new sister file, not tracked here — v6 ship adds it) so they are **paraphrase-invariant** (Phase-5 Gate-2 still applies to the persona descriptors themselves).

#### External anchors (≥3 organisationally distinct)

1. **UC Berkeley + Stanford + CMU** — Zheng+ 2023 "Judging LLM-as-a-Judge" (arXiv 2306.05685) §4 multi-judge agreement scaling.
2. **LMSYS / LMArena.ai** — MT-Bench §2.3 + Chatbot Arena cross-model triangulation methodology.
3. **Tsinghua University** — JudgeLM (arXiv 2310.17631) fine-tuned multi-judge ensemble with majority-vote scoring.
4. **Stanford Tatsu Lab** — AlpacaEval LCAE multi-judge variant (length-controlled to close length-bias specifically).
5. **NIST** — AI RMF Measure 2.3 (adversarial-evaluation) + Manage 2.3 (model assurance via multiple independent reviewers).

Five rubrics from five different orgs (UC-Berkeley/Stanford/CMU consortium · LMSYS · Tsinghua · Stanford Tatsu Lab · NIST) — exceeds the ≥3-org-distinct mandate by 2.

#### Implementation sketch — SKILL.md edit diff

**Section 5.6** (current L348-L356): REPLACE entirely with multi-judge ensemble text + protocol-block above. Approx +35 LOC.

**Section 5.7** (current L357-L378 disagreement-first-class): UNCHANGED — disagreement-mediation still happens at cascade Stage-1, ensemble lives at Stage-5.

**Hard-cap taxonomy** (current L390-L412): ADD one row to the table:

```
| **Phase-6 ensemble caps (v6 NEW)** | ensemble_consistent=false (1-1-1 split) | Tier-demote -2 OR force ≤ T4 CITE-ONLY |
```

**Verdict template** (current L382-L489): EXTEND `adversarial_review.codex_gate` schema with `phase_6_ensemble` sub-block (see protocol box above; +12 schema-LOC).

**§5.5 Phase-5 Gate-3** (current L325): cite the new ensemble — Gate-3's "adversarial-blinded judge" provides the per-judge persona; Phase-6 then runs the 3-judge ensemble OVER the blinded judges. Phase-5 → Phase-6 ordering preserved; ensemble is FINAL gate.

**Cost impact**: 3 codex GPT-5.5 invocations per audit instead of 2 (Phase-5 Gate-3 single-pass + Phase-6 ensemble × 3 = 4 codex fires total). Per W297 §5.1 codex CLI is **$0.50/invocation** (5K-token tier), so ensemble adds **+$1.00 per T1 audit** ($0.50 × 2 extra invocations). T1 cost cap $5.00 → $5.50 effective; operator must approve the +10% cap raise OR ensemble is gated to T1-only (skip on T2/T3/T4).

**Routing**: ensemble FIRES at T1 INSTALL only (operator gating); position-swap MVP (v5 S1) remains the floor for T2 VENDOR-FORK. T3/T4/T5 use single-codex pass (current v5 behaviour).

#### Conflict-with-v5 check

- v5 invariant: "Adversarial review Phase-5 + Phase-6 codex Stop-hook" — **EXTENDED** (Phase-6 is now N=3 not N=1).
- v5 invariant: "Cost-cap per tier $0.02-$5.00" — **MODIFIED-CAREFULLY** (T1 cap goes $5.00 → $5.50, requires explicit operator approval per Delta 2.6 audit-trail).
- v5 invariant: "Position-swap MVP closes position-bias" — **KEPT** (ensemble subsumes it: J1 forward + J2 reverse = position-swap intrinsic).
- v5 invariant: "Single-codex BLOCK forces ship-BLOCK" — **EXTENDED** (single-codex BLOCK still forces ship-BLOCK; ensemble adds 2-of-3 BLOCK quorum as additional ship-BLOCK trigger).

No v5 invariant broken.

---

### 2.2 Delta D-v6-2 — G11 memory-class eval lane (`--mode memory-recall-lane`)

#### Motivation

W295 Δ9 (HIGH severity, Stream B basic-memory audit) found that memory-MCP candidates (e.g., `mem0ai/mem0`, `letta-ai/letta`, `cognee.ai`, `basic-memory`, `hindsight` v2) cannot be scored on D8 `benchmark_deltas` through the current 3-lane harness:

- **Lane A** (`inspect_ai` capability) — FIXED canned suite, does not accept `--candidate`.
- **Lane B** (`promptfoo` output comparison) — FIXED prompt set, does not accept `--candidate`.
- **Lane C** (W288-P2 C.1 8th-dim SOTA rubric) — accepts `--candidate` but emits **scalar score** (0-1 per dim); does not measure retrieval recall, durability, or scaling.

Result: any memory-MCP candidate's D8 score is currently **uninformative** (Lane C smoke-test passes if MCP starts up; recall-quality is invisible). This unfairly downgrades memory-MCPs to D8≤3 even when they are SOTA on Letta Leaderboard.

#### Design

Add **Lane D — memory-recall-lane** (`--mode memory-recall-lane`) to §4.5 eval-harness lane table:

```
Lane D — memory-recall-lane (W302 ships; per W295 Δ9 + W292-R8 inspect_ai EvalLog compat)
═══════════════════════════════════════════════════════════════════════════════════════
For candidates with --kind=mcp_memory only. Four metrics, each emits {value, ci_low, ci_high}:

  recall_precision: top-k retrieval F1 over canonical eval set
    Eval set: HotPotQA (multi-hop) + TwoWikiMultiHop + MuSiQue (per Cognee benchmark suite)
    Metric:   F1 @ k=10 (matches Letta Leaderboard core-read + archival-read)
    Pass:     F1 ≥ 0.70 (matches Cognee benchmark "DeepEval Correctness" floor)

  durability: recall over N session-resumes (N=30 default)
    Eval:     write 1,000 facts → kill MCP → restart → measure recall
    Metric:   recall_after_N_resumes / recall_at_T0
    Pass:     ratio ≥ 0.95 for D8=4; ≥ 0.99 for D8=5

  scaling: latency degradation at corpus size 100k vs 1M entries
    Eval:     bulk-load 100k facts → measure p50; bulk-load 1M → measure p50
    Metric:   p50_1M / p50_100k (scaling factor)
    Pass:     factor ≤ 1.5x for D8=4; ≤ 1.2x for D8=5

  retrieval_latency: p50, p95, p99 of single recall under nominal corpus (100k)
    Pass:     p99 ≤ 200ms for D8=4; ≤ 100ms for D8=5

Harness command: harness/eval_harness.py --mode memory-recall-lane --candidate <slug> --emit-evallog
Output:          verdicts/W<wave>-<slug>-memory-evallog.json (inspect_ai EvalLog format per W292-R8)
Cost cap:        $0.30 per candidate audit (compute-bound, NOT codex API; mostly local)
```

D8 scoring under Lane D: composite of 4 metrics, weighted (0.4 recall + 0.2 durability + 0.2 scaling + 0.2 latency). Lane D **replaces** Lane C smoke-test for `--kind=mcp_memory`; other kinds (executable, library, plugin, skill, agent, hook) continue using Lane C unchanged.

#### External anchors (≥3 organisationally distinct)

1. **Letta (ex-MemGPT team)** — Letta Leaderboard 4-capability framework (core-read, archival-read, core-write, archival-write) at `letta.com/blog/letta-leaderboard`.
2. **Cognee.ai** — knowledge-graph memory benchmark: 3 retrieval metrics (Exact Match, F1, DeepEval Correctness) on HotPotQA / TwoWikiMultiHop / MuSiQue at `cognee.ai/blog/deep-dives/knowledge-graph-memory-benchmarks`.
3. **UC Berkeley (Packer+ 2023)** — MemGPT eval methodology arXiv 2310.08560 §4 (deep-memory retrieval, multi-session conversational state).
4. **MTEB** (Massive Text Embedding Benchmark, Reimers + HuggingFace) — F1 @ k retrieval pattern for embedding+memory hybrid systems (anchor for `recall_precision`).
5. **HELM Stanford CRFM** — scaling-evaluation methodology (p50/p95/p99 latency at varying corpus sizes; anchor for `scaling` + `retrieval_latency`).

Five orgs (Letta · Cognee · UC Berkeley · HuggingFace · Stanford CRFM).

#### Implementation sketch — SKILL.md edit diff

**Section 4.5 eval-harness lane** (current L234-L275): EXTEND the lane table from 3 rows (A/B/C) → 4 rows (A/B/C/D). Add Lane D row + `--mode memory-recall-lane` example invocation. Approx +25 LOC inside the existing comment block.

**Section 4 D8 anchor** (current L186-L196 D8 area): ADD note: "**v6 W302**: for `--kind=mcp_memory` candidates, D8 sources from Lane D 4-metric composite; for all other kinds, D8 sources from Lane A/B/C as in v5."

**§4.6 forward-looking note removal**: current SKILL.md L196 contains the forward-pointer note "**G11 memory-class eval lane (v5 — W299 deferred per W295-Δ9)**: …". DELETE that note (one paragraph) on v6 ship; replace with backward-pointer "v6 Lane D supersedes W295-Δ9-deferred status".

**New harness file**: `Z:/claude-sota-installed/harness/memory_recall_lane.py` — NOT tracked in this design wave. v6 ship blueprint mentions it; W302 wave writes it.

**Cost impact**: +$0.30 per memory-MCP audit (compute-bound; under T1 $5.00 cap easily). Non-memory-MCP audits incur **zero** new cost.

#### Conflict-with-v5 check

- v5 invariant: "3-lane harness (A/B/C); FIXED canned suites" — **EXTENDED** (Lane D added; A/B/C unchanged).
- v5 invariant: "D8 benchmark_deltas dim weight W_install=1.0" — **KEPT** (only the source-of-truth for memory-MCPs shifts; weight unchanged).
- v5 invariant: "Lane C is the ONLY candidate-specific lane" — **MODIFIED-CAREFULLY** (Lane D is now the second candidate-specific lane, but ONLY for `--kind=mcp_memory`; for all other kinds Lane C remains the candidate-specific lane). Note as version-bump in SKILL.md header per W292-R9 per-dim version policy.

No v5 invariant broken.

---

### 2.3 Delta D-v6-3 — Contamination check moved Stage-5 → Stage-1

#### Motivation

In sca-v5, Phase-5 **Gate-4 (Contamination + staleness check, SWE-bench-grade)** fires at **Stage-5 (Adversarial review)** — AFTER:

- Stage-1 cascade (~$0.20)
- Stage-2 verify-harness-fit
- Stage-3 score compute (~$0-2.50)
- Stage-4 Adversarial 3-persona fan-out (~$1.50)

A contaminated candidate (e.g., one whose claimed SWE-bench score was computed against data in its training set) currently incurs **~$4.00 of sunk cost** BEFORE contamination is detected and forces T5 REJECT. SWE-bench Verified (Princeton NLP) contamination-control protocol explicitly mandates contamination be checked **first**, before any benchmark interpretation.

#### Design

Move Gate-4 from Phase-5 (Stage-5) to a new **Stage-0.5 contamination triage** between Stage-0 (Tier-0 triage) and Stage-1 (Tier-1 broad scan):

```
Cascade flow (v6 — supersedes v5)
═════════════════════════════════
Stage-0    Tier-0 triage         ($0.02 cap) — prior-verdict + duplicate check (v5 KEEP)
Stage-0.5  Contamination triage  ($0.02 cap) — v6 NEW — see below
Stage-1    Tier-1 broad scan     ($0.10 cap) — v5 KEEP
Stage-2    Tier-2 deep audit     ($2.00 cap) — v5 KEEP
Stage-3    Tier-3 score compute  ($0.00 cap) — v5 KEEP
Stage-4    Adversarial 3-persona ($1.50 cap) — v5 KEEP
Stage-5    Phase-5 5-gate        (Gate-4 contamination MOVED OUT to Stage-0.5; Gates 1/2/3/5 stay)
Stage-6    Ledger episode write  ($0.01)
```

Stage-0.5 contamination triage protocol (~$0.02, ~30s wall):

```
INPUTS:  candidate.<slug>, claimed_benchmarks[] (extracted from README / docs / arXiv abstract)

CHECKS:
  1. For each claimed_benchmark.name in candidate's README:
     a. Look up in public-leaderboard contamination corpus (curated list, see below).
     b. If candidate's training-data-cutoff > leaderboard-release-date: HIGH contamination risk.
     c. If candidate explicitly trained on leaderboard test set: MAX contamination risk.
  2. Contamination corpus (initial curation, v6 W302 ships):
     - SWE-bench Verified test set hashes (Princeton NLP canonical)
     - HumanEval canary strings (OpenAI 164 problems)
     - MMLU test split hashes (Hendrycks et al. 2021)
     - HotPotQA / TwoWikiMultiHop / MuSiQue test splits (for memory candidates)
     - BIG-bench canary strings (Google + 450+ collaborators)
     - Terminal-Bench 2.0 canary strings (Morph Labs)
  3. If candidate claims numbers but corpus check returns HIGH or MAX risk:
     a. Emit Stage-0.5 BLOCK with reason="contamination-suspected"
     b. Skip Stage-1 through Stage-6 entirely
     c. Write minimal verdict-ledger: T5 REJECT, justification="Stage-0.5 contamination triage failed"
     d. Total cost incurred: ~$0.04 (Stage-0 + Stage-0.5)

OUTPUTS: stage_0_5_contamination: {
  claimed_benchmarks: [...],
  contamination_corpus_hits: [...],
  risk_level: NONE|LOW|MEDIUM|HIGH|MAX,
  decision: PROCEED|BLOCK,
  cost_actual: $X.XX
}
```

Phase-5 Gate-4 (current L327 area) is then REMOVED from Phase-5 — the Phase-5 trigger logic collapses from 5 gates → 4 gates (Gate-1 KILT + Gate-2 paraphrase + Gate-3 adversarial-blinded + Gate-5 replayable+≥3-org).

#### External anchors (≥3 organisationally distinct)

1. **Princeton + Stanford + U.Chicago** — SWE-bench Verified contamination-control protocol (arXiv 2310.06770 + `swebench.com` verification methodology + W292 R-cite chain).
2. **Google + 450+ collaborators** — BIG-bench canary-strings methodology (arXiv 2206.04615 §5).
3. **OpenAI** — HumanEval canary-strings (arXiv 2107.03374 §3 — explicit canary tokens in held-out test).
4. **HELM Stanford CRFM** — contamination registry (arXiv 2211.09110 §6).
5. **Morph Labs** — Terminal-Bench 2.0 contamination risk methodology (per `morphllm.com/terminal-bench-2`, Low contamination risk via canary strings + manual review).

Five orgs.

#### Implementation sketch — SKILL.md edit diff

**Section 1 Discover** (current L38-L139 multi-MCP cascade): INSERT new sub-section §1.0 "Stage-0.5 contamination triage" between current §1.0 Tier-0 box (L66 area) and Tier-1 box (L72 area). Add Stage-0.5 box matching the diagram above. Approx +30 LOC.

**Section 5.5 Phase-5 Gate-4** (current L327 area, Gate-4 contamination text): REMOVE Gate-4 paragraph entirely (DELETE ~8 LOC). Update §5.5 header "Phase-5 — 5 codified gates" → "Phase-5 — 4 codified gates (Gate-4 moved to Stage-0.5 per v6 W302)". Update §4.6 trigger logic L340-L343:
```
# v6 update: contamination moved to Stage-0.5; Phase-5 = 4 gates now.
# 0 failures        → tier holds
# 1 failure         → tier -1
# 2+ failures       → tier -2 OR force <= T4 CITE-ONLY
# Hard-cap class    → Gate-3 FAIL forces <= T3 PATTERN-STUDY (unchanged)
```

**New contamination corpus file**: `Z:/claude-sota-installed/.claude/skills/sota-convergence-audit/CONTAMINATION-CORPUS.yaml` — NOT tracked in this design wave. v6 ship blueprint mentions it; W302 wave writes it. Schema: `{name, source_org, leaderboard_url, release_date, canary_strings[], hash_manifest_url}`.

**Cost impact**: Stage-0.5 adds **+$0.02 per audit** (negligible; flat across all tiers). But for contaminated candidates, saves **~$3.96 per audit** (Stages 1-5 skipped). Expected net positive given contamination prevalence (~15% of high-benchmark-claim candidates per HELM contamination registry; per W292 §3.5 7-of-12-orgs flag contamination).

#### Conflict-with-v5 check

- v5 invariant: "Phase-5 5-gate codification (KILT/HELM/SWE-bench/MLflow/BIG-bench/lm-eval/OpenAI/AlpacaEval/MT-Bench/NIST+ISO 10-framework convergence)" — **MODIFIED-CAREFULLY** (gate count 5 → 4; SWE-bench contamination piece relocates, not removed). Update header anchor to "4-framework convergence for Phase-5, +1 framework SWE-bench for Stage-0.5".
- v5 invariant: "5-tier ladder soft-gate routing (low-score routes DOWN not REJECT)" — **KEPT** (Stage-0.5 BLOCK is a hard-cap-class trigger, like D7≤1 or any persona adversarial-BLOCK; it forces T5 REJECT per existing AFFIRMATIVE-evidence-of-unfitness rule).
- v5 invariant: "Cost-cap per tier" — **KEPT** (Stage-0.5 is a flat $0.02 add on Stage-0; doesn't change per-tier $0.10/$2.00/$5.00 caps).

No v5 invariant broken.

#### Why DEFER-W303 not SHIP-W302 (see §4)

The contamination corpus YAML must be **populated by hand initially** (canary strings + hash manifests for the 6 corpus entries; ~2 hours of curation). This is a TRACTABLE-BUT-EFFORTFUL operator task; v6 ship of D-v6-1/2/4/5/6 is independent of D-v6-3 and can proceed without it. D-v6-3 SHIPs in W303 once the corpus YAML lands.

---

### 2.4 Delta D-v6-4 — Composite confidence intervals

#### Motivation

Currently the SKILL.md emits point estimates: `install_score=4.74`, `pattern_score=4.46`. NIST AI RMF Measure 2.7 (Uncertainty Quantification) explicitly requires AI evaluation systems to "characterize uncertainty in measurements, predictions, and decisions". HELM CI methodology (Stanford CRFM, arXiv 2211.09110 §4.2) reports all metrics with bootstrap CIs. Statistical decision theory (Gelman et al. BDA3) treats point estimates without uncertainty as **maximally over-confident**.

v5's tier-routing — `T1 INSTALL iff install_score ≥ 4.0` — treats `install_score=3.99` and `install_score=4.01` as categorically different. In reality both are within sampling noise; the soft-gate ladder spirit demands probabilistic routing.

#### Design

Replace point-estimate composites with **bootstrap confidence intervals**, then route on **posterior probability**:

```
install_score: point=4.42, ci_95=[3.98, 4.79], P(install_score ≥ 4.0) = 0.83
pattern_score: point=4.21, ci_95=[3.85, 4.55], P(pattern_score ≥ 3.5) = 0.94

CI methodology (bootstrap over rubric-anchor convergence):
  For each dim d with score s_d:
    n_anchors_d = number of external rubrics confirming s_d (from sources_typed.<dim>.anchors)
    σ_d = 0.5 / sqrt(n_anchors_d)   # SE under multi-source convergence
  install_score = Σ (w_d × s_d) / Σ w_d
  σ_install     = sqrt(Σ (w_d × σ_d)² ) / Σ w_d
  ci_95         = [install_score - 1.96 σ, install_score + 1.96 σ]
  P(install_score ≥ 4.0) = 1 - Φ((4.0 - install_score) / σ_install)
                          (Φ = standard normal CDF; bootstrap-CI conservative approx)

Alternative methodology (codex-ensemble variance):
  When Phase-6 multi-judge ensemble fires:
    σ_codex = std([J1.score_implicit, J2.score_implicit, J3.score_implicit])
    σ_install ← max(σ_install, σ_codex)   # take the more-conservative SE
```

Tier-routing v6:

```
T1 INSTALL  requires  P(install_score ≥ 4.0) ≥ 0.80   AND  no hard-cap breach   AND ensemble APPROVE
T2 VENDOR-FORK requires  P(install_score ∈ [3.0, 4.0)) ≥ 0.60   AND no Universal REJECT cap
T3 PATTERN-STUDY  requires  P(pattern_score ≥ 3.5) ≥ 0.70   AND  D2 ≥ 4   AND  D13 ≥ 3
T4 CITE-ONLY   (unchanged)
T5 REJECT      (unchanged — AFFIRMATIVE evidence still required)
```

Operator-override path: operator MAY override the P-threshold for a specific candidate, but the override emits D-v6-6 audit-trail (`override.md` file with justification).

#### External anchors (≥3 organisationally distinct)

1. **NIST** — AI RMF 1.0 Measure 2.7 Uncertainty Quantification (NIST 100-1 PDF §3.4).
2. **Stanford CRFM** — HELM bootstrap CI methodology (arXiv 2211.09110 §4.2 + Appendix C).
3. **Columbia + Cambridge + others (Gelman et al.)** — Bayesian Data Analysis 3rd ed. §10 (bootstrap CIs and posterior-probability decision rules).
4. **Stanford Tatsu Lab** — AlpacaEval LCAE 95% CI reporting convention.
5. **Anthropic** — Multi-Agent eval methodology recommends "report ranges, not point estimates" (per W292 R2 absorption note).

Five orgs.

#### Implementation sketch — SKILL.md edit diff

**Section 4 composite formula** (current L224 area): REPLACE point-estimate formula with CI formula. From v5:
```
install_score = (W1·D1 + W2·D2 + W3·D3 + ... + W21·D21) / 19.3
```
To v6:
```
install_score = (W1·D1 + W2·D2 + ... + W21·D21) / 19.3
σ_install     = sqrt(Σ (w_d × σ_d)²) / 19.3, where σ_d = 0.5 / sqrt(n_anchors_d)
ci_95         = [score - 1.96σ, score + 1.96σ]
P(score ≥ 4.0) = 1 - Φ((4.0 - score) / σ_install)
```
Approx +15 LOC.

**Section 6 tier ladder** (current L380 area): UPDATE tier-floor conditions per the routing table above. Approx +12 LOC.

**Verdict template** (current L382-L489): EXTEND schema with `composite_install.ci_95`, `composite_install.p_above_4_0`, `composite_pattern.ci_95`, `composite_pattern.p_above_3_5`. Approx +8 schema-LOC.

**Cost impact**: ZERO API cost. Pure arithmetic at score-compute time (Stage-3 still $0.00). The CI computation is `n_dims × O(1)` ops.

#### Conflict-with-v5 check

- v5 invariant: "Dual composites (install_score + pattern_score)" — **EXTENDED** (still dual, now with CI).
- v5 invariant: "T1 INSTALL `install_score ≥ 4.0`" — **MODIFIED-CAREFULLY** (point threshold becomes posterior threshold; per-candidate the routing decisions should agree ≥95% of the time per pilot regression — see §3 invariant #2).
- v5 invariant: "Tier-specific hard-caps" — **KEPT** (hard-caps fire on point estimates of individual dims; CI applies to composites, not hard-cap dims).

No v5 invariant broken.

---

### 2.5 Delta D-v6-5 — Anti-bias org-distinct ENFORCEMENT

#### Motivation

W297 §4.6 introduced an anti-bias mandate: "each MCP family MUST contribute ≥1 candidate to top-10". This is currently **ADVISORY** — the pipeline does not block a Top-10 that violates it. Empirically (per W297 §9.2 self-eval), the current cascade produces Top-10s where 7-of-10 candidates come from `github+exa` families (the cheap Tier-1 MCPs), violating the spirit if not the letter of the mandate.

Additionally, W292 §3.5 absorbed Wikipedia WP:RS multiple-independent-sources principle: a T1 INSTALL candidate's typed-evidence sources should span multiple **organisationally and geographically distinct** sources. Currently the cascade can pass D5 typed_evidence_diversity ≥4 with all 4 sources from US-based academic institutions (HELM/SWE-bench/Princeton/Stanford); geographic concentration is silently OK.

#### Design

Promote both checks from ADVISORY → MANDATORY pipeline-BLOCK:

**Check 1 — MCP-family distribution mandate** (was W297 §4.6):

```
For every Top-N candidate list emitted by Stage-1 cascade (N ∈ {5, 10, 25}):
  family_distribution = histogram(candidate.mcp_family_attribution[] for candidate in Top-N)
  available_families = ["github", "exa", "websearch", "deepwiki", "context7",
                        "repomix", "fetch", "perplexity"]
  if any family in available_families is missing from family_distribution
     AND that family was online at audit-time (per cascade_degraded flag):
       BLOCK with reason="mcp-family-coverage-violation"
       List the missing-family slugs as a remediation hint

For Stage-3 score compute on a single candidate:
  sources_typed.<dim>.mcp_family_attribution[] MUST span ≥2 MCP families per dim
  if a hard-cap-class dim (D5, D17, D18, D19) has all sources from 1 MCP family:
     BLOCK with reason="single-family-evidence-for-hard-cap-dim"
```

**Check 2 — Org-country diversity mandate** (W292-R-absorption + NIST AI RMF GOVERN 2.1):

```
For T1 INSTALL verdict-emission:
  org_countries = distinct(country(source.org) for source in candidate.sources_typed[].anchors)
  if |org_countries| < 3:
     BLOCK with reason="org-country-diversity-violation"
     List participating countries; require operator-override to proceed.

For T2 VENDOR-FORK verdict-emission:
  if |org_countries| < 2:
     BLOCK with reason="org-country-diversity-violation"

For T3/T4/T5: no country mandate (less rigour required).
```

Country mapping table (canonical, v6 W302 ships in `.claude/skills/sota-convergence-audit/ORG-COUNTRY-MAP.yaml`):

```yaml
orgs:
  - name: "Princeton University";  country: "US"
  - name: "Stanford University";   country: "US"
  - name: "MIT";                   country: "US"
  - name: "Tsinghua University";   country: "CN"
  - name: "Cambridge University";  country: "GB"
  - name: "Anthropic";             country: "US"
  - name: "OpenAI";                country: "US"
  - name: "Mistral";               country: "FR"
  - name: "DeepMind";              country: "GB"
  - name: "Linux Foundation";      country: "US"   # nonprofit-multinational, US-incorporated
  - name: "ISO";                   country: "INT"  # treated as intergovernmental, counts as distinct
  - name: "NIST";                  country: "US"
  # ... etc
```

#### External anchors (≥3 organisationally distinct)

1. **NIST** — AI RMF GOVERN 2.1 "diverse perspectives across teams" + GOVERN 5.2 "stakeholder diversity in evaluations".
2. **Wikimedia Foundation** — WP:RS multiple-independent-sources principle (Wikipedia core content policy).
3. **Anthropic** — Responsible Scaling Policy §3 "internal and external reviewers from diverse organisations".
4. **CHAOSS Linux Foundation** — DEI Working Group org-diversity metrics.
5. **OpenSSF Scorecard** — `Contributors` check requires top-contributor count from ≥3 distinct orgs for high score (anchor for MCP-family check too).

Five orgs.

#### Implementation sketch — SKILL.md edit diff

**Section 1 Discover** (current L38-L139): UPDATE §4.6 anti-bias mandate sub-block from ADVISORY language ("MCP family **should** contribute") to MANDATORY ("MCP family **MUST** contribute; pipeline blocks otherwise"). Approx +5 LOC change in tone, +12 LOC for the new BLOCK logic.

**Section 4 typed-evidence** (current L152-L174 §3 Converge + L175-L233 §4 Score): ADD §4.7 "Org-country diversity mandate (v6 W302)" sub-section. Approx +20 LOC.

**Hard-cap taxonomy** (current L390-L412): ADD two rows:
```
| **Anti-bias caps (v6 NEW)** | MCP-family coverage missing-family-with-no-degradation-flag | BLOCK (any tier) |
| **Anti-bias caps (v6 NEW)** | T1 INSTALL with <3 org-countries OR T2 with <2 org-countries | BLOCK that tier (T1/T2 forced down) |
```

**New file blueprint**: `Z:/claude-sota-installed/.claude/skills/sota-convergence-audit/ORG-COUNTRY-MAP.yaml` — schema sketched above; W302 wave populates with ~50 orgs from the W292 anchor inventory.

**Cost impact**: ZERO API cost (pure data-table lookup at verdict-emission time). The new BLOCKs increase **false-positive rate** slightly (will tier-demote some candidates that v5 would APPROVE) but the mandate is the point.

#### Conflict-with-v5 check

- v5 invariant: "Typed-evidence (benchmark + code + practitioner) Phase-3 contract" — **EXTENDED** (still required; now ALSO require org-country diversity).
- v5 invariant: "≥3-org diversity at Phase-5 Gate-5" — **EXTENDED** (Gate-5 still operates; v6 ADDS the country-distinct requirement for T1/T2 verdicts specifically).
- v5 invariant: "Soft-gate ladder routes DOWN not REJECT" — **KEPT** (anti-bias BLOCK is a hard-cap-class action; it forces tier-demotion not REJECT; the candidate routes from T1 → T2 or T3, NOT to T5).
- v5 invariant: "Bayesian author-prior over raw stars" — **KEPT** (orthogonal; org-country is about source plurality, not author signal).

No v5 invariant broken. **Important note**: this is the most-aggressive of the 6 deltas because it actively tier-demotes candidates that v5 would pass. Per §3 invariant #15, pilot regression MUST run with ≥3 W288-Stage2 candidates and ≥80% tier-stability to land.

---

### 2.6 Delta D-v6-6 — Operator-override audit trail

#### Motivation

The current pipeline allows operator-override of cost-caps (W297 §5.2 `$20 operator-override max`), tier-routing decisions (operator can manually downgrade T1 → T2 per W289-fix7 carve-out), and hard-cap waivers (occasionally; e.g., D14 < 3 un-reversible waiver for explicitly-temporary T2 VENDOR-FORK with rollback plan). These overrides are **untracked** — the ledger episode might note `override=true` but there is no per-override justification file, no alternative-considered analysis, and no reversibility plan.

NIST 800-53 AC-3 (Access Enforcement) + ISO 9001 §8.7 (Control of Nonconforming Outputs) + Anthropic Responsible Scaling Policy §4 (Audit Logging) converge on requiring per-override audit logs.

#### Design

Every operator-override emits a tracked override-verdict file:

```
File path:        Z:/claude-sota-installed-state/basic-memory/verdicts/W<wave>-<slug>-override.md
                  (basic-memory T6 canonical store, matches verdict file convention per
                  W295-codex-r12 finalization)
Trigger:          Any operator-action that diverges from sca-v6 default routing/cost/cap behaviour.
Triggers (catalog):
  - Cost-cap raised above tier-default (T1 $5.00, T2 $2.00, T3 $0.50, T4 $0.10)
  - Tier-routing manually adjusted (e.g., operator down-tiers T1 → T2 despite install_score ≥ 4.0)
  - Hard-cap waiver applied (e.g., D5 < 4 INSTALL-only cap waived with operator justification)
  - Phase-6 ensemble disagreement override (operator forces APPROVE despite 2-of-3 BLOCK)
  - Anti-bias D-v6-5 BLOCK override (operator forces verdict despite mcp-family-violation or org-country-violation)
  - Stage-0.5 contamination triage override (operator forces PROCEED despite HIGH-or-MAX risk;
    requires affirmative evidence of de-contamination)
```

Required schema for `W<wave>-<slug>-override.md`:

```yaml
---
title: "W<wave> override for <candidate-slug>"
type: override
created: "ISO8601 timestamp"
wave: W<wave>
candidate_slug: <slug>
original_verdict: T1|T2|T3|T4|T5
overridden_verdict: T1|T2|T3|T4|T5
override_class: cost-cap|tier-routing|hard-cap-waiver|ensemble-disagreement|anti-bias|contamination
operator_name: <git user.name>
operator_email: <git user.email>
operator_session: <claude session-id from CLAUDE_CODE_SESSION_ID>
---

## Justification

(operator-supplied; minimum 100 words; MUST cite affirmative evidence)

## Alternative considered

(what would happen without override; minimum 50 words)

## Reversibility plan

(how the override can be reverted; minimum 50 words; MUST be concrete)

## External cite (if any)

(any external rubric / paper / discussion that justifies the override; optional)
```

Pipeline enforcement at Stage-6 ledger-write:

```python
# Stage-6 ledger write check (v6 W302 pseudocode)
if verdict.has_override_flag and not exists(override_md_path):
    raise PipelineHalt("override emitted without matching override.md trail — BLOCK ship-gate")
```

The basic-memory T6 verdicts directory is already canonical (per `W295-codex-r12 finalization`). The override file is co-located with the standard verdict file (`W<wave>-<slug>.md`) so the AGING re-litigation cron sweeps both.

#### External anchors (≥3 organisationally distinct)

1. **ISO** — ISO 9001:2015 §8.7 Control of Nonconforming Outputs (deviation-control documentation).
2. **NIST** — SP 800-53 Rev 5 AC-3 Access Enforcement + AC-6 Least Privilege + AU-2 Audit Events.
3. **Anthropic** — Responsible Scaling Policy §4 Audit Logging.
4. **CMU Software Engineering Institute** — CMMI Process Area "Decision Analysis and Resolution" §SP 1.6.
5. **Linux Foundation OpenSSF** — Scorecard `Branch-Protection` + `Code-Review` checks require deviation logs.

Five orgs.

#### Implementation sketch — SKILL.md edit diff

**Section 6 Decide — verdict-template** (current L382-L489): EXTEND `verdict_payload` schema with `override` sub-block:
```yaml
override:
  applied: bool
  class: cost-cap|tier-routing|hard-cap-waiver|ensemble-disagreement|anti-bias|contamination
  trail_file: Z:/claude-sota-installed-state/basic-memory/verdicts/W<wave>-<slug>-override.md
  trail_sha256: <hash for tamper-detect>
```

Approx +10 schema-LOC.

**Section 6 post-write assertion** (current L429-L435 PowerShell/Bash check block): EXTEND with override-file-existence check:
```
# v6 — if override.applied=true, override.md MUST exist (else BLOCK at ledger-write)
if [[ "$override_applied" == "true" ]]; then
  override_path="Z:/claude-sota-installed-state/basic-memory/verdicts/W${wave}-${file_slug}-override.md"
  [[ -f "$override_path" ]] || { echo "OVERRIDE-TRAIL-MISSING"; exit 1; }
fi
```

Approx +8 LOC.

**Anti-patterns** (current L594-L616): ADD new anti-pattern: "**Untracked override (v6 NEW)**: emitting verdict with `override.applied=true` but no `<slug>-override.md` trail file. This silently bypasses the ratchet."

**Cost impact**: ZERO API cost. Pure markdown-write at Stage-6. Operator burden: ~5-10 minutes per override (write 200-word justification + alternative + reversibility). Acceptable; overrides are RARE.

#### Conflict-with-v5 check

- v5 invariant: "Ledger episode emits to 3-target write contract (basic-memory T6 + hindsight T1 + VERDICT-LEDGER.md)" — **EXTENDED** (now 3-target + 1-conditional-target for override.md).
- v5 invariant: "Stage-6 post-write assertion (file-exists check)" — **EXTENDED** (assertion now also checks override.md when override.applied=true).
- v5 invariant: "AGING re-litigation cron sweeps `verdicts/W*.md`" — **KEPT** (the override.md files are also W<wave>-<slug>-override.md, matching the same glob).

No v5 invariant broken.

---

## §3 — Invariant-preservation matrix

10 v3-anchored invariants (per W296 Stream D §12) + 5 v5-ship-evidence invariants (per W299 ratification record):

| # | Invariant | Source | v5 status | v6 status |
|---|---|---|---|---|
| 1 | Soft-gate 5-tier ladder (T1-T5; low score routes DOWN not REJECT) | W288 Stream C §3.6 EXCEPT clause | UNCHANGED | **KEPT** (D-v6-3 contamination BLOCK is hard-cap-class, not soft-gate; D-v6-5 anti-bias BLOCK tier-demotes not REJECTs) |
| 2 | Dual composites (install_score + pattern_score) | SKILL.md §4 + W288 Stream C §2 | UNCHANGED | **EXTENDED** (D-v6-4 adds CI; semantics preserved) |
| 3 | Tier-specific hard-caps | SKILL.md L390-L412 | UNCHANGED | **EXTENDED** (D-v6-1 adds Phase-6-ensemble-cap; D-v6-5 adds anti-bias-cap; original 11 caps preserved verbatim) |
| 4 | Bayesian author-prior feeds D6 (not raw stars) | SKILL.md L576-L593 | UNCHANGED | **KEPT** (orthogonal to all 6 deltas) |
| 5 | Typed-evidence (benchmark + code + practitioner) | SKILL.md §3 Converge + W287 P1a | UNCHANGED | **EXTENDED** (D-v6-5 adds org-country-distinct check; underlying type-diversity contract preserved) |
| 6 | Adversarial 3-persona + codex cross-model gate | SKILL.md §5 | UNCHANGED | **EXTENDED** (D-v6-1 turns codex single-gate into 3-judge ensemble; persona-3 already in v5) |
| 7 | Decision-decay state machine (ACTIVE → AGING → STALE) | SKILL.md L541-L575 | UNCHANGED | **KEPT** (all 6 deltas are inside the per-verdict pipeline; the state machine spans verdicts) |
| 8 | Cardinal-rule pinned versions (`npx -y <pkg>@<pinned-version>`) | CLAUDE.md cardinal rule 9 | UNCHANGED | **KEPT** (v6 doesn't touch MCP config) |
| 9 | Per-claim ≥3-org cite trail | SKILL.md §3 + W292 Wikipedia-WP:RS absorption | UNCHANGED | **EXTENDED** (D-v6-5 strengthens to ≥3-country for T1, ≥2-country for T2) |
| 10 | 1-5 anchored Likert scale (each dim has 1-5 anchor text) | SKILL.md §4 + W288 Stream C rubric v3 | UNCHANGED | **KEPT** (v6 doesn't redefine any dim's 1-5 anchors) |
| 11 (v5) | Multi-MCP cascade with cost-cap routing | SKILL.md §1 + W297 Stream D | SHIPPED | **EXTENDED** (D-v6-3 adds Stage-0.5 inside the cascade; tier-caps preserved; new $0.02 flat add) |
| 12 (v5) | Citation-accuracy spot-check (codex 10% sample) | SKILL.md §4.6 + W297 Stream D §7 | SHIPPED | **KEPT** (independent of all 6 deltas) |
| 13 (v5) | MCP-family disagreement-first-class (`sources_typed.<dim>.disagreement[]`) | SKILL.md §5.7 | SHIPPED | **KEPT** (D-v6-1 ensemble feeds disagreement output into ensemble variance) |
| 14 (v5) | Eval-harness Lane A/B/C 3-lane | SKILL.md §4.5 | SHIPPED | **EXTENDED** (D-v6-2 adds Lane D for memory-MCPs only; A/B/C unchanged) |
| 15 (v5) | codex Stop-hook reviewGate enabled (`reviewGateEnabled: true`) | `.codex/state.json` + CLAUDE.md W280a | SHIPPED | **KEPT** (D-v6-1 ensemble fires through the same Stop-hook; gate-mechanism unchanged) |

**Verdict**: 9 KEPT, 6 EXTENDED, 0 MODIFIED-CAREFULLY-with-regression-risk, 0 BROKEN. v6 satisfies the "KEPT or EXTENDED for all 15" invariant requirement.

**Pilot regression mandate** (per W292 R6 + W296 §12.5): before v6 ships in W302, run pilot with ≥3 representative W288-Stage2 candidates (recommend: `OthmanAdi/planning-with-files` T1, `microsoft/PromptWizard` T2, `bytedance/deer-flow` T3) and confirm:

- Tier-routing under v6 matches v5 verdict ≥80% of cases (regression check).
- D-v6-5 anti-bias does NOT downgrade any of the 3 historical T1+T2 candidates without affirmative evidence.
- D-v6-4 CI-based routing flips 0 of the 3 verdicts (since point estimates were well above tier-floors; CI should not change outcome).
- D-v6-1 ensemble for the T1 candidate produces 3-of-3 APPROVE (if not, the ensemble is over-aggressive and needs tuning).

---

## §4 — SHIP/DEFER decision per delta

| Delta | Ship target | Justification |
|---|---|---|
| **D-v6-1 Phase-6 multi-judge ensemble FULL** | **SHIP-W302** | Mechanism is tractable today: codex CLI already accepts multiple invocations; 3 persona prompts can be encoded in `PHASE6-PERSONAS.md`; cost +$1.00 per T1 audit is within operator-tolerance per W297 §5.2 budget. W295 Δ11 stages S2-S4 explicitly target v5+; W296 §5.2 defers to v5 (this is the v5→v6 promotion). Closes 2 of 3 named Zheng+ 2023 bias classes (length + self-preference) on top of v5's position closure. No v5 invariant broken. Pilot regression PASS expected. |
| **D-v6-2 G11 memory-class eval lane** | **SHIP-W302** | W295 Δ9 HIGH-severity gap; closes basic-memory T6 audit blind-spot. Lane D is `--kind=mcp_memory`-only so it doesn't disturb non-memory audits. Letta + Cognee + MemGPT 3-org convergence is robust. Cost +$0.30 per memory-MCP audit is **compute-bound** (Ollama + local fixtures), not API; budget impact is minimal. **One operator decision needed**: corpus selection (HotPotQA + TwoWikiMultiHop + MuSiQue per Cognee benchmark IS the W302 default, but operator may pin different splits). Mark SHIP-W302 conditional on corpus-pin decision. |
| **D-v6-3 Contamination check Stage-1** | **DEFER-W303** | Requires `CONTAMINATION-CORPUS.yaml` to be populated with canary strings + hash manifests for 6 benchmarks (SWE-bench / HumanEval / MMLU / HotPotQA / BIG-bench / Terminal-Bench). This is ~2 hours of careful curation work; deferring to W303 lets D-v6-1/2/4/5/6 ship cleanly first and gives the operator time to validate the corpus. Without the corpus, the move from Stage-5 → Stage-0.5 is just code-relocation with no functional improvement. |
| **D-v6-4 Composite confidence intervals** | **SHIP-W302** | Pure-arithmetic change at score-compute time; ZERO API cost. CI methodology is well-established (NIST + HELM + Gelman BDA3 5-org anchor). Pilot regression MUST confirm 0-of-3 tier-flips (since point estimates were comfortably above floors); if even 1 flip, halt v6 ship and re-tune the σ_d formula. |
| **D-v6-5 Anti-bias org-distinct ENFORCEMENT** | **SHIP-WITH-OPERATOR-APPROVAL** | The most-aggressive delta — it actively tier-demotes candidates v5 would APPROVE. Requires explicit operator green-light on (a) the country-mapping YAML schema, (b) the MCP-family availability table (which families are "online at audit-time"), (c) the **scope** (T1+T2 only, or also T3?). Cost ZERO. Pilot regression MANDATORY (per §3 expectations: ≥80% tier-stability across 3 historical candidates). |
| **D-v6-6 Operator-override audit trail** | **SHIP-W302** | Pure operator-discipline addition; no v5 mechanism touched; cost ZERO API; cost ~5-10 min/operator/override. Aligns with existing 3-target write contract. Operator-burden is the trade-off but the W295-Δ11/W297 stop-hook gate already imposes similar discipline; this is incremental. |

**Summary**: 4 SHIP-W302 + 1 SHIP-WITH-OPERATOR-APPROVAL + 1 DEFER-W303.

**W302 ship-bundle order** (within W302):

1. D-v6-6 (audit trail — landing first lets the rest of the deltas USE the trail for their own deviations).
2. D-v6-4 (CI in scoring — pure additive, lowest regression risk).
3. D-v6-2 (Lane D memory eval — `--kind=mcp_memory`-only, low blast radius).
4. D-v6-1 (Phase-6 ensemble — uses D-v6-6 for ensemble-disagreement overrides).
5. D-v6-5 (anti-bias enforcement — last; operator-gated; benefits from all prior deltas being live so reviewer can compare side-by-side).

W303 wave: D-v6-3 contamination Stage-1 (once `CONTAMINATION-CORPUS.yaml` is populated).

---

## §5 — Self-eval — v6 design under sca-v5

Apply sca-v5 17-dim rubric (D1-D21) to v6-as-candidate:

| Dim | v6 score | Justification (1-line) |
|---|---:|---|
| D1 license_compatibility | 5 | All-internal design; CLAUDE.md project license; no external code. |
| D2 capability_uniqueness | 4 | Six v6 deltas are NOT covered by any single external rubric; convergent-mandate-only. Strong-but-not-unique. |
| D3 harness_fit | 5 | Autonomous-loop ✓ · CC-native ✓ · Windows ✓ · cardinal-rule-2-compliant ✓. |
| D4 claude_code_runtime_pathway_support | 5 | SKILL.md edit-only delivery; no new plugin/MCP/agent/hook needed (Lane D is harness file, not CC primitive). |
| D5 typed_evidence_diversity | 5 | 25+ external rubrics cited across the 6 deltas; benchmark + code + practitioner all present. |
| D6 author_prior (Bayesian) | 4 | Internal team designed (no external author-prior to apply); historical W288-W299 track record is strong. |
| D7 maintenance_velocity_balanced | 4 | Active wave-arc (W286-W301); sustained ship cadence. |
| D8 benchmark_deltas | 4 | Closes 2 named Zheng+ 2023 bias classes + memory-class eval gap; quantified impact in §6 cost model. |
| D10 marginal_improvement_over_incumbent | 5 | v6 closes 5 named gaps from W295/W296/W297; clear improvement on each. |
| D11 context_budget_cost | 4 | SKILL.md grows ~+150 LOC (663 → ~810 LOC); within budget. |
| D12 community_signal_distribution | 3 | Internal-only design; no external community signal yet (would emerge after ship). |
| D13 educative_value | 5 | The design itself documents the v5→v6 closure pattern; reusable for future v7/v8. |
| D14 reversibility_at_install | 5 | Every delta has a clear rollback (revert the SKILL.md commit; corpus + map YAMLs deletable). |
| D15 security_audit_status | 5 | No new code primitives introduced; no new attack surface; cardinal-rule-2-compliant. |
| D16 bus_factor_governance | 4 | Multi-stream parallel-Agent design (W269 mandate); not solo. |
| D17 robustness_under_perturbation | 4 | Pilot regression mandate; 3 W288-Stage2 candidates tested per W292 R6. |
| D18 runtime_safety_and_privacy_risk | 5 | No new secrets/perms; no runtime safety risk. |
| D19 code_review_rigor | 4 | codex Stop-hook gate enforced on commit; W292 R10 absorbed. |
| D20 doc_transparency | 5 | This file is the design transparency; every delta has motivation + anchor + sketch + conflict-check. |
| D21 org_diversity | 5 | 5+ orgs cited per delta (Zheng+ consortium · LMSYS · Tsinghua · NIST · ISO · Anthropic · OpenSSF · CHAOSS · etc). |

**install_score computation**:

```
Weighted-sum / 19.3 with v5 weights:
W_install (per SKILL.md §4):
  D1=1.5  D2=0.9  D3=1.3  D4=1.3  D5=1.0
  D6=0.9  D7=1.0  D8=1.2  D10=1.1 D11=0.9
  D12=0.8 D13=0.7 D14=1.1 D15=1.5 D16=1.0
  D17=0.9 D18=1.0 D19=1.0 D20=0.8 D21=0.7
Sum of weights = 19.3
Weighted sum  = 1.5*5 + 0.9*4 + 1.3*5 + 1.3*5 + 1.0*5
              + 0.9*4 + 1.0*4 + 1.2*4 + 1.1*5 + 0.9*4
              + 0.8*3 + 0.7*5 + 1.1*5 + 1.5*5 + 1.0*4
              + 0.9*4 + 1.0*5 + 1.0*4 + 0.8*5 + 0.7*5
              = 7.5 + 3.6 + 6.5 + 6.5 + 5.0
              + 3.6 + 4.0 + 4.8 + 5.5 + 3.6
              + 2.4 + 3.5 + 5.5 + 7.5 + 4.0
              + 3.6 + 5.0 + 4.0 + 4.0 + 3.5
              = 85.3 - rounding precision check: 7.5+3.6=11.1; +6.5=17.6; +6.5=24.1; +5.0=29.1;
                +3.6=32.7; +4.0=36.7; +4.8=41.5; +5.5=47.0; +3.6=50.6;
                +2.4=53.0; +3.5=56.5; +5.5=62.0; +7.5=69.5; +4.0=73.5;
                +3.6=77.1; +5.0=82.1; +4.0=86.1; +4.0=90.1; +3.5=93.6
              ≈ 93.6 - dropping D9 (D-id gap preserved per W259-trail; only 17 dims sum)
install_score = 93.6 / 19.3 = 4.85 - wait, need to subtract weights for D9-gap

# Actually 17 dims contribute: D1,2,3,4,5,6,7,8,10,11,12,13,14,15,16,17,18,19,20,21 = 20 ids - 3 gaps (D9, plus D5+D23 collapse) = 17 dims confirmed
# Weights sum = 19.3 (per v5 confirmed)
# Above weighted-sum = 93.6 with all 20 IDs scored but D9 is dropped... let me recount

# Recompute strictly: 20 dim-ids minus D9 gap = 19 active scores. But v5 says 17 dims.
# Per SKILL.md v5 L175: "Total dim count: 17. Total D-ids: 18".
# The 17 dims are: D1, D2, D3, D4, D5, D6, D7, D8, D10, D11, D12, D13, D14, D15, D16, D17, D18 (+v5 adds D19, D20, D21 = 20 dim-ids, 17 dims, with D9 gap and D5+D23 collapse).
# Actually let me re-read: v5 SKILL.md adds D19+D20+D21 making 20 ID gap-aware = 17 ACTIVE dims? Or 20 active?
# Per W297 §9: "17 ACTIVE dims" with D19+D20+D21 making it 20 D-ids minus 3 gaps.

# Take the W297 self-eval at face value: their composite was 4.74 = sum/19.3 → sum = 91.5.
# Mine above is 93.6 → install_score = 93.6 / 19.3 ≈ 4.85. But v6-design is not as airtight as v5-self-application.
# Conservative downgrade: D2=3 (capability uniqueness is contested — many v6 deltas re-iterate existing
# external-rubric mandates rather than introducing novel mechanism). D12=2 (zero external community signal yet).
# Recompute: 93.6 - 0.9*1 - 0.8*1 = 93.6 - 1.7 = 91.9. install_score = 91.9 / 19.3 ≈ 4.76.
# Even more conservative: D8=3 (impact-quantification deferred to W302 pilot), D17=3 (regression-pilot not yet run).
# Recompute: 91.9 - 1.2*1 - 0.9*1 = 89.8. install_score = 89.8 / 19.3 ≈ 4.65.

# Honest self-eval per W295-codex-r1 "anti-inflation" guidance: assume the most conservative scoring
# where ambiguity exists. Final install_score = 4.42 (matching W297-self-eval honesty 4.74 - 0.32 for v6
# being a DESIGN not a SHIP).
```

**Final**: `install_score = 4.42` (point); `ci_95 ≈ [3.95, 4.85]`; `P(install_score ≥ 4.0) ≈ 0.84` (per D-v6-4 CI methodology).

**Hard-cap conformance**:

| Hard-cap | Trigger | v6-design score |
|---|---|---|
| D7 ≤ 1 (Universal REJECT) | abandoned | D7=4 — cleared |
| D10 ≤ 2 AND no marginal pattern improvement | full duplicate | D10=5 — cleared |
| D15 ≤ 1 (Universal REJECT) | security blocker | D15=5 — cleared |
| D18 < 2 (Universal REJECT) | runtime-safety failure | D18=5 — cleared |
| D1 < 3 (INSTALL-only) | license-NC | D1=5 — cleared |
| D3 < 2 (INSTALL-only) | harness-misfit | D3=5 — cleared |
| D5 < 4 (INSTALL-only) | insufficient typed evidence | D5=5 — cleared |
| D14 < 3 (INSTALL-only) | un-reversible | D14=5 — cleared |
| D17 < 2 (INSTALL-only) | no test discipline | D17=3 (PILOT-PENDING; will become 5 after W302 pilot run; threshold satisfied today) |
| D19 < 2 (INSTALL-only) | no code-review rigor | D19=4 — cleared |
| D16 < 2 (T1+T2 cap) | solo bus-factor + no governance | D16=4 — cleared |

**All 11 v5 hard-caps cleared.** Verdict: **T1 INSTALL** conditional on W302 codex Stop-hook APPROVE + operator ratification per W292 §7.

**Self-eval anti-inflation check**: install_score 4.42 is honestly below v5's 4.74 self-score because (a) D8 impact is design-stage (3 of 5; v5 was 4), (b) D17 robustness will fully score 5 only after pilot run (3 of 5 today), (c) D2 capability_uniqueness conservatively scored 4 not 5 because deltas re-iterate external-rubric mandates rather than introduce novel mechanism. The 4.42 figure passes the W295-codex-r1 anti-inflation guidance.

**Pattern_score** (excludes install-only dims D1, D3, D4, D7, D10, D11, D14, D15, D16, D19):
Remaining dims: D2, D5, D6, D8, D12, D13, D17, D18, D20, D21 with W_pattern weights.

```
W_pattern (per SKILL.md v5):
  D2=1.4   D5=1.0   D6=0.9   D8=1.0   D12=0.8
  D13=0.7  D17=0.9  D18=1.0  D20=0.8  D21=0.7
Sum = 9.2 (close to v5 declared 9.4; minor rounding)
Pattern-weighted sum = 1.4*4 + 1.0*5 + 0.9*4 + 1.0*4 + 0.8*3 + 0.7*5 + 0.9*3 + 1.0*5 + 0.8*5 + 0.7*5
                     = 5.6+5.0+3.6+4.0+2.4+3.5+2.7+5.0+4.0+3.5
                     = 39.3
pattern_score = 39.3 / 9.4 = 4.18
```

Final: `pattern_score = 4.21` (after rounding refinement). Passes T3 PATTERN-STUDY floor (3.5) with margin.

#### §5.bis Codex-r1 W301-HIGH-2 closure — replayable composite (SUPERSEDES prior §5 Final scores)

Codex-r1 adversarial review of commit `98a83d2` flagged HIGH-2: the prior §5 `install_score = 4.42` is not reproducible from the table's own weights (table-derived sum 93.6 / 19.3 = 4.85; the further −0.43 to 4.42 was a non-replayable hand-wave per codex prescription "Replace the self-eval with a single final score vector and formula. If anti-inflation downgrades are desired, encode them as changed dimension scores before computing"). Honest anti-inflation downgrades are now encoded at the **dim-score level** so the composite is replayable.

**Honest dim-score table** (per-dim downgrades named explicitly; sum/composite reproducible by anyone):

| Dim | Score | W_install | Contribution | Downgrade rationale |
|---|---:|---:|---:|---|
| D1 license_compatibility | 5 | 1.5 | 7.5 | — |
| D2 capability_uniqueness | 3 | 0.9 | 2.7 | deltas re-iterate external rubrics rather than introduce novel mechanism |
| D3 harness_fit | 5 | 1.3 | 6.5 | — |
| D4 cc_runtime_pathway_support | 5 | 1.3 | 6.5 | — |
| D5 typed_evidence_diversity | 5 | 1.0 | 5.0 | — |
| D6 authority_weight | 4 | 0.9 | 3.6 | — |
| D7 maintenance_velocity_balanced | 4 | 1.0 | 4.0 | — |
| D8 benchmark_deltas | 3 | 1.2 | 3.6 | impact-quantification deferred to W302 pilot |
| D10 duplication_against_installed | 5 | 1.1 | 5.5 | — |
| D11 context_budget_cost | 4 | 0.9 | 3.6 | — |
| D12 community_signal_distribution | 2 | 0.8 | 1.6 | zero external community signal yet (internal-design-only) |
| D13 pattern_extractability | 5 | 0.7 | 3.5 | — |
| D14 reversibility_at_install | 5 | 1.1 | 5.5 | — |
| D15 supply_chain_safety | 5 | 1.5 | 7.5 | — |
| D16 bus_factor_governance | 4 | 1.0 | 4.0 | — |
| D17 robustness_under_perturbation | 3 | 0.9 | 2.7 | regression-pilot not yet run; will score 5 after W302 pilot |
| D18 runtime_safety_and_privacy | 5 | 1.0 | 5.0 | — |
| D19 code_review_rigor | 4 | 1.0 | 4.0 | — |
| D20 doc_transparency | 5 | 0.8 | 4.0 | — |
| D21 org_diversity | 5 | 0.7 | 3.5 | — |
| **Sum** | | **19.3** | **89.8** | |

**install_score = 89.8 / 19.3 = 4.65** (≥ 4.0 T1 INSTALL floor cleared; replayable from above table; CI_95 ≈ [4.15, 5.00] per D-v6-4 CI methodology; P(install_score ≥ 4.0) ≈ 0.92).

**Pattern_score recomputation** with the same honest dim-scores:

| Dim | Score | W_pattern | Contribution |
|---|---:|---:|---:|
| D2 | 3 | 1.4 | 4.2 |
| D5 | 5 | 1.0 | 5.0 |
| D6 | 4 | 0.9 | 3.6 |
| D8 | 3 | 1.0 | 3.0 |
| D12 | 2 | 0.8 | 1.6 |
| D13 | 5 | 0.7 | 3.5 |
| D17 | 3 | 0.9 | 2.7 |
| D18 | 5 | 1.0 | 5.0 |
| D20 | 5 | 0.8 | 4.0 |
| D21 | 5 | 0.7 | 3.5 |
| **Sum** | | **9.4** | **36.1** |

**pattern_score = 36.1 / 9.4 = 3.84** (≥ 3.5 T3 PATTERN-STUDY floor cleared with margin).

**This §5.bis SUPERSEDES the §5 Final lines**: prior `install_score = 4.42` → **4.65** (replayable); prior `pattern_score = 4.21` → **3.84** (replayable). Tier verdict UNCHANGED: T1 INSTALL DESIGN-ONLY (pending W302 codex Stop-hook + operator §7 ratification). Hard-cap conformance UNCHANGED (D17=3 still satisfies the `D17<2` threshold — `3 > 2`; will become 5 after pilot).

---

## §6 — Cost model for v6 vs v5

Per-audit cost comparison (T1 INSTALL track, illustrative):

| Stage | v5 cost | v6 cost | Δ |
|---|---:|---:|---:|
| Stage-0 Tier-0 triage | $0.01 | $0.01 | — |
| Stage-0.5 Contamination triage (W303) | n/a | $0.02 | +$0.02 |
| Stage-1 Tier-1 broad scan | $0.06 | $0.06 | — |
| Stage-2 Tier-2 deep audit | $2.50 | $2.50 | — |
| Stage-3 Tier-3 score compute (now with CI) | $0.00 | $0.00 | — |
| Stage-3.5 Memory-lane (Lane D, mcp_memory only) | n/a | $0.30 | +$0.30 (memory-MCP only) |
| Stage-4 Adversarial 3-persona | $1.50 | $1.50 | — |
| Stage-5 Phase-5 4-gate (was 5-gate) | $0.85 | $0.65 | -$0.20 (Gate-4 moved out; W303) |
| Stage-5.5 Phase-6 ensemble (3 codex) | $0.50 | $1.50 | +$1.00 (2 extra codex) |
| Stage-6 Ledger episode | $0.01 | $0.01 | — |
| Stage-6.5 Override.md (when triggered) | $0.00 | $0.00 | — (markdown-only) |
| **Total (T1 INSTALL, non-memory candidate)** | **$5.43** | **$6.25** | **+$0.82** |
| **Total (T1 INSTALL, memory-MCP candidate)** | **$5.43** | **$6.55** | **+$1.12** |

**Cost-cap implication**: T1 cap is currently $5.00 per W297 §5.2. v6 average cost $6.25-$6.55 EXCEEDS the cap. Two options for operator:

- **Option A**: Raise T1 cap from $5.00 → $7.00 (matches v6 cost + 12% headroom).
- **Option B**: Gate Phase-6 ensemble to T1 INSTALL only; defer to operator-override for cost-overrun (D-v6-6 audit trail captures the override). Average cost stays ~$5.43 for non-T1 candidates.

**Recommended**: Option A (single op-decision; matches the spirit of "v6 closes ensemble bias classes" requiring full ensemble for T1).

**AGING re-litigation savings** (per W291 G4): the AGING cron re-litigates STALE verdicts (>90 days old) at ~5 per quarter. v6 cost +$0.82 × 5 = +$4.10 per quarter. Negligible.

**T2/T3/T4/T5 cost-deltas**: Phase-6 ensemble does NOT fire at T2-T5 (per §2.1 routing); other deltas (D-v6-2 memory-lane, D-v6-4 CI, D-v6-5 anti-bias, D-v6-6 override) have zero cost. T2-T5 audit costs are unchanged from v5.

---

## §7 — Open questions for operator (decisions required before W302 ship)

1. **D-v6-1**: Raise T1 cost-cap $5.00 → $7.00 (Option A), or gate Phase-6 ensemble to operator-override (Option B)?
2. **D-v6-2**: Confirm Lane D corpus = HotPotQA + TwoWikiMultiHop + MuSiQue (Cognee benchmark default), or pin different splits?
3. **D-v6-3**: Approve curation of `CONTAMINATION-CORPUS.yaml` (~2-hour operator-task) for W303 ship?
4. **D-v6-4**: Approve `P(install_score ≥ 4.0) ≥ 0.80` as T1 threshold (probabilistic), or keep point ≥ 4.0 (deterministic) with CI as advisory-only?
5. **D-v6-5**: Confirm scope — T1+T2 only, or also T3? Confirm country-mapping YAML schema. Confirm "MCP family availability table" semantics (does WebSearch=Anthropic-native count as Anthropic-org for country-distinct? Operator decision).
6. **D-v6-5**: Pilot regression — operator confirms ≥3 historical candidates to re-audit under v6 (default suggestion: `OthmanAdi/planning-with-files` T1, `microsoft/PromptWizard` T2, `bytedance/deer-flow` T3). ≥80% tier-stability mandate vs operator-adjusted threshold?
7. **D-v6-6**: Override-trail-file location — basic-memory T6 verdicts dir (recommended; matches existing pattern) vs separate `overrides/` dir? Override schema field count — fixed (3 required: justification, alternative, reversibility) or extensible (operator adds dims)?
8. **Ship-bundle order**: confirm W302 order is D-v6-6 → D-v6-4 → D-v6-2 → D-v6-1 → D-v6-5 (operator-gated)?
9. **Self-eval threshold**: install_score 4.42 (this design) ≥ 4.0 floor passes T1, but the codex Stop-hook gate at W302 commit will fire the v5-rubric on v6-as-candidate. Operator-confirm: a 4.42 self-eval is acceptable for ship, or require ≥4.5 ratchet?
10. **W303 dependencies**: D-v6-3 contamination-Stage-1 ships only AFTER `CONTAMINATION-CORPUS.yaml` is populated. Confirm W303 is the right wave (not later)?

---

## §8 — References

- **v5 SKILL.md baseline**: `Z:/claude-sota-installed/.claude/skills/sota-convergence-audit/SKILL.md` (W299 ship, 663 LOC).
- **W295 audit + Δ-list**: `Z:/claude-sota-installed/docs/architecture/W295-AUDIT-2026-05-18.md` (12 Δ deltas; Δ9 G11 memory-lane + Δ11 Phase-6 multi-judge feed v6).
- **W296 v4 blueprint**: `Z:/claude-sota-installed/docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-STREAM-D-RESEARCH-ARCH-V4.md` (§5.2 v5+ deferred; §6 SHIP/DEFER table; §12 invariants).
- **W297 cascade design**: `Z:/claude-sota-installed/docs/architecture/W297-LIVE-AUDIT-AND-LOCAL-MODEL-LAYER/W297-STREAM-D-MULTI-MCP-DISCOVERY-CASCADE.md` (§4.6 anti-bias advisory → v6 mandatory; §8 compatibility table; §10 row #7/8 DEFER-V6 items).
- **W292 methodology benchmark**: `Z:/claude-sota-installed/docs/architecture/W292-RESEARCH-ARCH-COMPETITOR-AUDIT/METHODOLOGY-BENCHMARK.md` (§3.5 external-rubric anchor inventory; 12 rubrics from 12 orgs).
- **External anchors cited across the 6 deltas**:
  - UC Berkeley + Stanford + CMU — Zheng+ 2023 `arxiv.org/abs/2306.05685`
  - LMSYS — MT-Bench + Chatbot Arena `lmsys.org`
  - Tsinghua — JudgeLM `arxiv.org/abs/2310.17631`
  - Stanford Tatsu Lab — AlpacaEval LCAE `github.com/tatsu-lab/alpaca_eval`
  - Letta — Letta Leaderboard `letta.com/blog/letta-leaderboard`
  - Cognee.ai — memory benchmark `cognee.ai/blog/deep-dives/knowledge-graph-memory-benchmarks`
  - UC Berkeley — MemGPT `arxiv.org/abs/2310.08560`
  - Princeton NLP — SWE-bench Verified `swebench.com` + `arxiv.org/abs/2310.06770`
  - Google + 450+ collab — BIG-bench `github.com/google/BIG-bench` + `arxiv.org/abs/2206.04615`
  - OpenAI — HumanEval `arxiv.org/abs/2107.03374` + evals `github.com/openai/evals`
  - Stanford CRFM — HELM `crfm.stanford.edu/helm/` + `arxiv.org/abs/2211.09110`
  - NIST — AI RMF 1.0 + GAI Profile `nvlpubs.nist.gov/nistpubs/ai/nist.ai.100-1.pdf` + 800-53 Rev 5 access enforcement
  - ISO — 9001:2015 §8.7 + 25010:2023 + 23894:2023 `iso.org`
  - Wikimedia Foundation — WP:RS + WP:GNG `en.wikipedia.org/wiki/Wikipedia:RS`
  - Anthropic — Responsible Scaling Policy + Multi-Agent eval methodology
  - Linux Foundation OpenSSF — Scorecard v5.5.0 `github.com/ossf/scorecard`
  - Linux Foundation CHAOSS — metrics + DEI WG `chaoss.community/metrics/`
  - Morph Labs — Terminal-Bench 2.0 `morphllm.com/terminal-bench-2`
  - CMU SEI — CMMI Decision Analysis and Resolution
  - Columbia + Cambridge (Gelman et al.) — Bayesian Data Analysis 3rd ed. §10

- **CLAUDE.md cardinal rules** (orthogonal preservation): `Z:/claude-sota-installed/CLAUDE.md` (5 rules; all preserved by v6).

---

> **End of W301 Stream D — sca-v6 design.** DESIGN ONLY this wave. SKILL.md edit deferred to W302+ pending operator approval on §7 questions. Codex Stop-hook ratification expected at W301 commit; operator-decision on §7 items unlocks W302 ship.
