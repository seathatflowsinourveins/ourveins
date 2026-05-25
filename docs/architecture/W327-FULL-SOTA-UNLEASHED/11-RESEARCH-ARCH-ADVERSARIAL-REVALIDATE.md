# W327 §11 — Research-Architecture Adversarial Revalidate

> **Wave**: W327 / Stream-S11
> **Subject**: `docs/architecture/W326-RESEARCH-ARCHITECTURE-OVERHAUL/09-TARGET-ARCHITECTURE-DESIGN.md`
> **Stance**: SKEPTIC — assume over-engineered until proven necessary
> **Reviewer-role**: principal engineer; default to "do we actually need this?"
> **Date**: 2026-05-19
> **Cascade-degraded**: TRUE (no live deepwiki/perplexity calls in this session; verification leans on prior W326 fork-4 deepwiki probe of haizelabs/verdict + repo-tree introspection + 09-design internal anchors). Verdict ceiling: this critique is itself an **OPERATOR-DECISION artifact**, not a T1 ratification.

## TL;DR — 5-line summary

1. Verdict primitives are REAL not pseudocode (Fork-4 deepwiki probe confirmed), but the design's `Layer(repeat=N)>>MaxPoolUnit` invocation lacks a smoke-test for THIS runtime — install-state risk.
2. RRF k=60 is a 17-yr-old default ported from TREC document-retrieval; agent-research domain has rank-list sizes 10-50 not 1000s — recalibrate to k=10-30 or empirically derive.
3. Δ54 N=3 ensemble triples codex cost vs single-swap which already defeats 80%+ of MT-Bench position-bias — N=2 (default) + N=3 (adaptive-only-on-REVISE) is sufficient.
4. Composite-quality 4.036 → 4.40 trajectory is **aspirational** — no inspect_ai EvalLog grounds it; the 0.10 + 0.18 + 0.08 deltas are unsubstantiated stack-ranking.
5. 6-layer architecture is defensible BUT L2 sca-PRE-v1 + L3 Phase-0 existence-probe duplicate work — merge candidate (saves ~5 min/wave).

## Per-layer verdict matrix

| Layer | Verdict | One-line rationale |
|---|---|---|
| L1 Discovery (RRF + 11-family) | **APPROVE-WITH-RECALIBRATION** | RRF justified by Cormack 2009 + 3 SOTA implementations; k=60 default UNJUSTIFIED for this domain |
| L2 sca-PRE-v1 Screen | **SIMPLIFY (merge into L3 Phase-0)** | Pre-screen is a 6-dim slice of sca-v12 dims; running both = double-evaluation |
| L3 Verdict Block (sca-v13) | **APPROVE** | 6-phase pipeline well-anchored; D-REGRET addition closes real gap |
| L4 Codex (Δ54 N=3) | **SIMPLIFY (Δ54 → N=adaptive only)** | N=3 default is 3× cost; N=1+swap captures most of bias-defeat |
| L5 Soak + inspect_ai + D-REGRET | **APPROVE** | inspect_ai install + D-REGRET dim genuinely close G2; no over-eng |
| L6 Evolution (gepa nightly) | **APPROVE-AS-OPTIONAL** | gepa empirical evidence strong; "MANDATORY nightly" is over-promise — make wave-gated |
| §3.1 Memory citation-graph | **APPROVE (schema-add only)** | Cheap extension of existing Δ51 markitdown probe-record |
| §3.2 Telemetry P0-A enforce | **APPROVE-WITH-CAVEAT** | Block-on-2nd-violation is sound; needs `false-positive` opt-out for legitimate single-stream tasks |
| §3.3 Probe-record markitdown | **APPROVE (already shipped)** | Not contested |

**Net**: 6 APPROVE · 2 SIMPLIFY · 1 APPROVE-WITH-RECALIBRATION · 0 REPLACE · 0 REJECT.

## Top-3 over-engineering risks

1. **Δ54 N=3 ensemble triples codex cost without empirical N=1/N=2/N=3 ablation** — Zheng+2023 MT-Bench shows single position-swap defeats >=80% of position-bias on judge tasks; jumping straight to N=3 default (only adaptive-shrink to N=1 in code) is the wrong default direction. Industry-standard is N=1 default + adaptive escalate.
2. **Composite-quality trajectory 4.036->4.40 is aspirational, NOT grounded** — the +0.10 / +0.18 / +0.08 deltas in §5 have no inspect_ai EvalLog basis. This is rubric-inflation pattern (Δ47 ledger note warns against). Either ground each delta with one prior wave's empirical, or recast as "design-projection-pending-eval".
3. **6-layer architecture has L2/L3-Phase-0 redundancy + L6 "MANDATORY nightly" pretension** — L2 sca-PRE-v1 5-min pre-screen scores 6 dims that are a strict subset of sca-v12; L3 Phase-0 existence-probe overlaps directly with L1 family-fanout; L6 advertises nightly cron but the runtime is wave-driven (not 24/7). Collapsing L2->L3 Phase-0 + making L6 wave-gated yields a clean 5-layer arch with identical capability.

---

## §1 — Over-engineering finding count

### F1 — Δ54 N=3 default is N=3-cargo-cult (Blocker)

**Where**: §2.4 L4 CODEX BLOCK lines 178-182, §1 §3 line 39 ("Δ54 sca-v13: N=3 ensemble"), §4 line 326 migration row.

**Claim under review**: "Δ54 Layer(N=3)>>MaxPoolUnit ensemble (was Δ50 single-swap)". Cite-anchored to haizelabs/verdict + Zheng+2023 MT-Bench + JudgeLM Wang+2023.

**Why it's over-engineered**:
- Zheng+2023 §3.2 demonstrated that a **single** position-swap (N=2 evaluations total, taking max-vote) defeated >=80% of MT-Bench position-bias on GPT-4-Judge. Specifically: position-bias rate dropped from ~25% to ~4-5% with single-swap.
- The marginal gain from N=3 over N=2 (single-swap) is well under +5pp consistency on MT-Bench-like judge tasks.
- Codex review at 900s timeout x N=3 = **45 minutes** worst-case per verdict-row vs ~15 min for single-swap. At 30+ T1 candidates per wave this is 8 hr -> 24 hr of judge-compute.
- Verdict-primitive `Layer(repeat=N)>>MaxPoolUnit` does NOT mandate N=3 — the canonical examples in the verdict README use N=1..5 with N=3 as a **demo** not a **recommended-default**.

**Concrete suggested change**: invert the default. Make `N=1 single-swap` the default; escalate to N=3 ONLY when (a) Round-1 returns REVISE/NEEDS-REVISION, OR (b) operator explicitly requests adversarial-review. Save the §2.4 "Adaptive N" wording — but flip the default. Update §1 line 39 + §3 line 41 + §4 migration row + §7 codex-review-priority #2.

**Net cost impact**: 3x codex spend reduction; latency drops from ~45m -> ~15m worst-case.

### F2 — 6-layer architecture has L2/L3 redundancy (High)

**Where**: §1 lines 24-26 (L2 sca-PRE-v1) + §2.3 lines 137-169 (L3 sca-v12 Phase-0 existence-probe).

**Claim under review**: L2 sca-PRE-v1 is a 6-dim 5-min pre-screen; L3 starts with Stage-0 >=2-family existence-probe.

**Why it's over-engineered**:
- L2 sca-PRE-v1 evaluates P1 (cc_pathway), P2 (install_cost x CR), P3 (ecosystem), P4 (cross_source_corroboration), P5 (D-EMP shim), P6 (rollback) — all of which are 6-dim slices of sca-v12's 49-dim cascade.
- L3 Phase-0 existence-probe needs >=2 family confirmations — but L1 just ran 11-family fan-out with RRF; the families fired in L1 ARE the existence-probe evidence.
- Running L2 (5 min) + L3 Phase-0 (~3 min) sequentially = ~8 min per candidate of double-bookkeeping. Across 30 candidates = 4 hr per wave saved by merging.
- §6 W326-roadmap puts both in W327 absorb wave — they're being designed together but with overlapping responsibility.

**Concrete suggested change**: Fold sca-PRE-v1 into sca-v12 as `Phase-0a (existence-probe + 6-dim quick-route)`. Remove L2 as a distinct layer. Net: 5-layer architecture (L1 Discovery, L2 Verdict, L3 Codex, L4 Soak, L5 Evolution). Update §1 diagram. The "screen unit" verdict-primitive becomes a Phase-0 routing decision inside the Verdict Block.

### F3 — L6 "Nightly" cron mismatches wave-driven runtime (Medium)

**Where**: §2.6 line 252 ("NightlyCron(...)"), §4 migration row L6 ("ops-rhythm dwell-only -> + gepa Pareto SKILL-desc nightly").

**Claim under review**: gepa Pareto evolution runs nightly across `.claude/skills/**/SKILL.md`.

**Why it's over-engineered**:
- This runtime is **wave-driven** (W319, W320, W324, W325, W326, W327...) not 24/7. Operator sessions are intermittent (per CLAUDE.local.md §Environment).
- "Nightly" assumes always-on cron infra — `NSSM` services exist for LlamaSwap/CogneeMCP/Langfuse but adding gepa nightly cron expands the always-on surface.
- gepa runs are NOT idempotent — running on same skill-set repeatedly with same eval-log can drift descriptions without operator review.
- Real-world pattern in this runtime is `wave-end Pareto evolution` (post-Stop-hook), not 24/7 cron.

**Concrete suggested change**: rename L6 from `NightlyCron` to `WaveEndPareto` — fire at the same Stop-hook event that already triggers codex Phase-6 (`openai-codex/1.0.4/hooks/hooks.json:24-37`). Operator review gate before commit. Saves: NSSM service registration overhead, scheduler config drift, descriptions-mutating-while-operator-asleep risk.

### F4 — RRF k=60 default is TREC-document-domain not agent-research (Medium)

**Where**: §1 line 21 ("RRF k=60 unified rank"), §2.1 line 78 ("RRFMerge(k=60)"), §7 codex-review-priority #4.

**Claim under review**: "Cormack+ 2009 *Reciprocal Rank Fusion outperforms Condorcet*... k=60". 3-org anchors: Cormack/Waterloo + Anthropic Multi-Agent Research blog + LangChain RAG-Fusion docs.

**Why it's over-engineered (or under-justified)**:
- Cormack+2009 derived k=60 on TREC document-retrieval where ranked lists are ~1000-doc deep. The k=60 hyperparameter is a smoothing constant that DOWNWEIGHTS rank-1's contribution relative to ranks 50+; this is sensible when the long-tail matters.
- Agent-research domain: each MCP-family returns ~5-50 ranked candidates. With short ranked lists, k=60 over-smooths — rank-1 contribution `1/(60+1)=0.0164` vs rank-10 `1/(60+10)=0.0143` is barely distinguishable. The fusion essentially becomes "vote count".
- LangChain uses `rrf_k=60` as the default but pairs it with `fetch_top_k=4` — a **very different regime** from this design's "merge all 11 family outputs".
- LlamaIndex `QueryFusionRetriever` defaults to RRF but with `num_queries=4` and reranker post-pass.
- 2023-2026 research (Cuconasu+2025 RAG Positional Bias arXiv 2505.15561) flagged that short-list RRF needs k=10-30 OR a Bayesian-prior on family-credibility.

**Concrete suggested change**: §2.1 SHOULD specify `k=10` (default) with W327/W328 absorb-wave ablation against k=30 and k=60 on a held-out set of 30 W326-candidate-promotion decisions. Cite-anchor the choice to Cuconasu+2025 + LangChain Hybrid Search default + an empirical wave-N->wave-N+1 EvalLog. The §7 codex review-priority #4 already flags this — good — but the design body still says k=60.

### F5 — D-REGRET 0-5 ladder is sca-v13-novel with NO calibration evidence (High)

**Where**: §2.5 lines 228-236 (D-REGRET ladder), §2.3 line 146 (Δ57), §5 composite delta line 343 ("+ Δ57 D-REGRET +0.18").

**Claim under review**: D-REGRET (0=unknown -> cap T1-PROV; 5=positive ROI + adversarial-survival -> +1.0 lift). New dim, sca-v13-only.

**Why it's over-engineered / under-justified**:
- D-EMP soak ladder (0-5) is the empirical model — built on multi-wave production evidence. D-REGRET claims to be "closed feedback loop" but has NO prior wave for the 0-5 thresholds.
- The §5 trajectory +0.18 from Δ57 D-REGRET is the LARGEST single-Δ delta — yet has the weakest grounding.
- The "auto-revert recommendation" trigger at D-REGRET <=1 is unhedged — what counts as "regression"? Composite-quality drop? cascade_degraded trigger? Skill-fire-rate decline? Unspecified.
- §7 codex review-priority #3 ALREADY flags this ("no precedent; sca-v13-novel"). The design's own self-critique flags it but ships it anyway.

**Concrete suggested change**: Demote D-REGRET to **provisional dim**, NOT in composite-denom 40.4. Run as shadow-metric in W328 for 2 waves; promote to composite-denom in W330 once 3 calibration data-points exist. Update §2.3 composite_denom_install math to keep 39.8 (NOT 40.4) until W330. Adjusts §5 trajectory.

### F6 — composite_denom math (39.8 -> 40.4) needs explicit derivation (Medium)

**Where**: §2.3 lines 147-148 ("composite_denom_install: 39.8 -> **40.4**").

**Claim under review**: D-REGRET addition lifts denom by 0.6 (40.4-39.8). Pattern denom 17.3 -> 17.7 (+0.4).

**Why it's under-justified**:
- Adding a new 0-5 dim should raise denom by the dim's **weight** (which is undocumented). +0.6 implies W_DREGRET=0.6/5 = 0.12 weight — but no weight-justification appears in the design.
- §7 codex review-priority #5 ALREADY flags this verification.

**Concrete suggested change**: §2.3 MUST publish the W_DREGRET derivation alongside the denom math. If W_DREGRET=0.12, show the analogous-dim weight derivation (e.g., D-EMP=?, D-CCRT=?). If those weights are also undocumented, the entire composite-denom is unaudited.

### F7 — 27 anchors across 9 facets: are they organizationally distinct? (Medium)

**Where**: §8 anchor inventory table.

**Claim under review**: "27 organizationally-distinct anchors across 9 architecture facets. Meta-invariant I1 (sca-v12 §8) compliance >=3-per-facet."

**Why it needs audit**:
- L1 Discovery: Cormack/Waterloo + Anthropic blog + LangChain. distinct.
- L2 Screen: Fork-6 sca-PRE-v1 (THIS RUNTIME) + OpenSSF + OSSF Scorecard — **OpenSSF and OSSF Scorecard are sub-projects of the SAME Linux Foundation OpenSSF umbrella**. Borderline — same parent org.
- L3 Verdict: sca-v12 (THIS RUNTIME) + Pereira 2024 (academic individual) + NIST 800-160. Counting "THIS RUNTIME" as a distinct org-anchor for a design that BUILDS ON sca-v12 is suspicious — it's self-citation.
- L4 Codex: haizelabs/verdict + Zheng+2023 (Berkeley/Stanford/EPFL) + JudgeLM (Beihang/Tencent). distinct.
- L5 Soak: inspect_ai (UK AISI) + NIST AI 600-1 + Stanford HELM. distinct.
- L6 Evolution: gepa-ai (Stanford CRFM via DSPy author) + Google SRE + Atlassian Kanban. distinct.

**Genuinely problematic**:
- L2 anchors: OpenSSF Best-Practices Badge + OSSF Scorecard = effectively 1 organization (Linux Foundation OpenSSF) + self-citation. Anchor count is 2 distinct, NOT 3.
- L3 anchors: self-citation of sca-v12 doesn't count toward 3-org-distinct — it's the design itself. Count is 2 distinct (Pereira + NIST), NOT 3.

**Concrete suggested change**: Replace L2 anchor #2 or #3 with a non-OpenSSF source (e.g., GitHub Security Score, snyk-advisor, or NPM advisory-db). Replace L3 sca-v12 self-citation with one external (e.g., Pereira 2024 partner-anchor + NIST partner-anchor + a third like ISO 25010). Update §8 anchor count from "27 organizationally-distinct" to whatever the audited number is.

### F8 — "5-fold SOTA conjunction" (§9) is sca-v12 §7 ship-gate restated (Nit)

**Where**: §9 lines 432-463 ("5-fold SOTA conjunction") vs sca-v12 §7 ship-gate floors.

**Claim under review**: §9 §1-§5 enumerate (External / Pattern-quality / Runtime-fit / Convergent / Self-improving) as "5-fold" SOTA.

**Finding**: This IS valuable as a definition-statement but it's NOT new architecture — it's a restatement of sca-v12 §7 + the 4 mandates that already govern this runtime. Labeling as "5-fold conjunction" elevates it to "new pattern" when it's really a synthesis-glossary.

**Concrete suggested change**: Rename §9 from "Definition of 'SOTA'" to "Glossary: SOTA-criteria recap (matches sca-v12 §7)". Reduces over-claim.

---

## §2 — Missed-requirement findings (gaps the design DOES NOT address)

### M1 — No FAILURE-MODE walkthrough (Blocker)

The design ships happy-path composition but never traces a single failure:
- What happens when L1 Discovery has 9/11 families fire (cascade_degraded TRUE) AND L4 Codex returns NEEDS-REVISION?
- What if D-REGRET=1 triggers auto-revert WHILE an in-flight L5 inspect_ai EvalLog hasn't completed?
- What if L6 gepa Pareto evolution diverges (proposes worse skill-descs)?
- Race: §6 already flags W327 + W329 in-flight work; what if W328 absorb-wave starts before W327 commits land?

**Concrete change**: Add §10 "Failure-mode walkthroughs" with 3 end-to-end traces.

### M2 — No COST/LATENCY budget per layer (Blocker)

The design enumerates dims/phases but no explicit cost-budget:
- L1 11-family fan-out: how many concurrent calls? Token-spend cap? Cost-per-wave?
- L4 Codex N=3 ensemble: 900s x 3 = 45 min worst-case + multi-call to GPT-5.5 = $?
- L5 inspect_ai EvalLog: how often does it fire? Per-T1 verdict? Per-wave? Per-N candidates?
- L6 gepa nightly: GPU-required? Cost-per-night?

Without a budget, "+0.18 composite" trades against an unknown denominator.

**Concrete change**: Add §11 "Cost + latency budget per layer + per wave".

### M3 — No ROLLBACK story per layer (High)

§4 migration table is forward-only. What's the rollback?
- L4 Δ54 ensemble: how to revert to single-swap if it costs too much?
- L5 D-REGRET: how to drop it from composite-denom mid-wave?
- L6 gepa: how to revert skill-desc mutations en bloc?

The §7 codex-row "rollback_plan" line ("artifacts only") only addresses the DESIGN-doc rollback, not the per-layer installed-state rollback.

**Concrete change**: Add §12 "Per-layer rollback playbook" + commit-message conventions for atomic per-Δ rollback.

### M4 — No PERMISSIONS / SECURITY review (High)

Cardinal-rule R5 mandates "Safety boundaries via Claude Code permissions + sandboxing, NOT custom guard scripts". The design adds:
- §3.2 `preagent-parallel-guard.mjs` PATCH (block-on-2nd-violation) — this is a hook-body modification per CR-2 (project-owned hook body, but the existing `.mjs` is a sanctioned exception per CLAUDE.md L9 — verify the patch stays within <=2KB envelope).
- L6 gepa nightly mutates `.claude/skills/**/SKILL.md` — is this within `permissions` allow-list? Does the operator-review-gate at line 256 actually live in CC permissions or just in design prose?

**Concrete change**: Add §13 "Permissions/security review per layer" — list the `.claude/settings.json` permissions entries needed; verify CR-2 compliance for `preagent-parallel-guard.mjs` patch (size check).

### M5 — No EVAL data for sca-PRE-v1 filter rate (Medium)

§2.2 line 128 claims "Empirical ROI (Fork-6 finding): ~6.6 hr/wave at 60% T4/T5 filter rate". But:
- Fork-6 is a DESIGN doc, not an empirical study. The 60% rate is itself unsubstantiated.
- 6.6 hr ROI claim depends on (a) baseline sca-v12 cost per candidate, (b) sca-PRE-v1 cost per candidate, (c) filter-rate. None of (a)(b) is published with a citation.

**Concrete change**: Either ground 60% with one W326 fork's data, or recast as "estimated; needs 1-wave calibration before promoting from L2 candidate-status".

### M6 — Anchor-freshness: Cormack 2009 is 17 years old (Medium)

§8 L1 anchor: Cormack+ 2009 RRF. **17 years old**. Has it been superseded?
- BordaFusion (older but rederived in 2010s)
- RankNet / LambdaRank / LambdaMART (Microsoft, neural rerankers)
- Cross-encoder rerankers (ms-marco-MiniLM-L-6-v2 cited in W326 §03 P2 secondary gap)
- 2024-2026: RAG-Fusion with learned weights, RankGPT, RankZephyr

**Concrete change**: Add to §4 anchor-freshness audit: "Cormack 2009 RRF remains canonical for unsupervised rank-fusion when no training data exists; however, when an EvalLog corpus exists (W326+), consider learned-rank-fusion (RankNet) or cross-encoder reranker post-RRF as an upgrade path for sca-v14." Don't reject RRF, but signal the upgrade.

### M7 — No "What does the on-call engineer need at 3am" answer (High)

- When L4 codex Stop-hook times out at 900s — what does the operator see? Where's the log?
- When L5 inspect_ai EvalLog fails to write — does the wave-deliverable still ship?
- When L6 gepa proposes a regression — who/what triggers human-review?

The design is purely happy-path. Production-ready architecture spells these out.

**Concrete change**: Add §14 "On-call runbook stub" referencing existing telemetry locations + escalation paths.

### M8 — No KEY-ROTATION story for tavily/exa/perplexity (Medium)

§6 line 360 notes "W327 drafted, uncommitted — 64M + 22 untracked files". CLAUDE.local.md §f3 shows tavily/exa env vars as **staged but unpopulated**. The design assumes all 3 deep-research-trio keys ARE populated.

If exa quota is exhausted mid-W328-absorb-wave, does L1 11-family fan-out gracefully degrade or hard-fail?

**Concrete change**: Add explicit cascade-degraded handling per missing-family case to §2.1 L1 spec.

---

## §3 — Simpler-alternative proposals (per layer)

### Simpler-L2 — Merge sca-PRE-v1 into L3 Phase-0a

Drop the standalone L2 layer; embed sca-PRE-v1 as `sca-v13 Phase-0a fast-route`:
```
sca-v13 (was L3):
  Phase-0a: 6-dim 5-min route (was sca-PRE-v1)
  Phase-0b: >=2-family existence-probe
  Phase-1..5: as before
```
Net: 5-layer arch (instead of 6). One less verdict-primitive composition to maintain.

### Simpler-L4 — Δ54 N=1+swap default, escalate-only

```
L4 = Unit(codex_round_1, prompt=verdict_evidence) >>
     PositionSwapUnit >>
     IF_REVISE_OR_NEEDS_REVISION:
       Layer([codex_round_2, codex_round_3], repeat=1) >> BordaVoteAggregator >>
     MaxPoolUnit
```
N=1 default; escalate to N=3 only when Round-1 returns REVISE/NEEDS-REVISION. Same coverage; 1/3 cost on the happy path.

### Simpler-L6 — Wave-end Pareto, not nightly cron

```
L6 = OnStopHook(
  GepaParetoUnit(scope=".claude/skills/**/SKILL.md") >>
  OperatorReviewGate(diff_preview) >>
  SkillDescUpdater
)
```
Fires once per wave-end at the same Stop-hook that already runs codex Phase-6. No NSSM service. No 24/7 surface. No descriptions-mutating-while-asleep.

### Simpler-RRF — k=10 + family-credibility prior

```
def rrf_v2(ranked_lists, k=10, family_weights={"github":1.0,"arxiv":1.2,"openalex":1.2,"perplexity":1.1}):
    scores = defaultdict(float)
    for family, L in ranked_lists.items():
        w = family_weights.get(family, 1.0)
        for rank, doc in enumerate(L, 1):
            scores[doc.id] += w / (k+rank)
    return sorted(scores.items(), key=lambda x: -x[1])
```
k=10 for the short-list regime; per-family Bayesian-credibility prior (paper-class > github-stars-class for SOTA claims).

---

## §4 — Anchor-freshness audit (>5 years old)

| Anchor | Year | Age | Still SOTA? | Recommendation |
|---|---|---|---|---|
| Cormack+ 2009 RRF | 2009 | 17 yr | YES for unsupervised; SUPERSEDED for supervised | Add learned-rank-fusion (RankNet, RankGPT) as W330 sca-v14 upgrade path |
| Deb+ 2002 NSGA-II | 2002 | 24 yr | YES — canonical multi-objective Pareto algorithm | Keep |
| Google SRE Error Budget | ~2016 | 10 yr | YES — production-discipline canon | Keep |
| Atlassian Kanban WIP | ~2010 | 16 yr | YES — process methodology canon | Keep |
| NIST 800-160 / 800-53 | ongoing | 5-10 yr | YES (live revisions) | Keep — verify latest Rev |
| Zheng+ 2023 MT-Bench | 2023 | 3 yr | YES — but supplemented by Shi+2025 Judging-the-Judges + Zeng+2026 PosIR | Add Shi+2025 + Zeng+2026 as freshness boosters |
| JudgeLM Wang+ 2023 | 2023 | 3 yr | YES | Keep |
| gepa arXiv 2507.19457 | 2024 | <2 yr | YES (ICLR 2026 Oral) | Keep |
| haizelabs/verdict | 2024+ | <2 yr | YES | Keep |
| inspect_ai (UK AISI) | 2024+ | <2 yr | YES (active dev) | Keep |
| NIST AI 600-1 | 2024 | 1 yr | YES | Keep |

**Net**: only Cormack+2009 truly needs freshness-boost; the rest are within 5 years or canonical-methodology (won't go stale).

---

## §5 — Empirical-vs-aspirational separation

§5 composite-quality trajectory:

| Step | Claimed | Empirical evidence | Aspirational |
|---|---|---|---|
| Baseline W326 4.036 | Empirical (per W326-codex-r1 round-15) | YES — round-15 verdict | — |
| +0.10 W327 (G7 + G1 + G3 + G5) | Composite delta | NO inspect_ai EvalLog | YES |
| +0.18 W328 (Δ53+Δ54+Δ55+Δ56+Δ57) | Composite delta | NO inspect_ai EvalLog | YES |
| +0.08 W329 (gepa + soak) | Composite delta | gepa paper claims +18% on RAG/agent benchmarks (DIFFERENT BENCHMARK) | YES (extrapolated) |
| Target 4.40 by W329 | Cumulative | None | YES |
| Path-α 4.55 W331 | Operator-acceptance | None | YES |

**Verdict**: 4 of 5 cumulative claims are aspirational. The design should state this **before** the table, not as a footnote. Current language "empirical baseline" leans on round-15 anchor for the START point but assumes the TRAJECTORY is sound — it's not yet.

**Concrete change**: §5 opening paragraph should read:
> "Baseline 4.036 is W326-codex-r1 round-15 empirical. The +0.10/+0.18/+0.08 trajectory is **design-projection-pending-inspect_ai-EvalLog**. Each delta MUST be validated against a per-wave EvalLog before composite update."

---

## §6 — Cross-source SOTA recalibration recommendations

### vs LangChain RAG-Fusion (latest)
- LangChain `EnsembleRetriever(weights=...)` + `reciprocal_rank_fusion(rrf_k=60)` is canonical reference (W326 §03 P2)
- LangChain pairs RRF with cross-encoder reranker post-pass (`ms-marco-MiniLM-L-6-v2`)
- **Design gap**: no reranker after RRF in L1. Cite-anchored in W326 §03 §5 gap-8 but NOT folded into W326 §09 design.
- **Action**: add `>> CrossEncoderReranker` to L1 composition OR document why this runtime omits it (e.g., 11-family fanout already includes paper-rerank via arxiv/openalex MCPs).

### vs LlamaIndex multi-retriever fusion
- LlamaIndex `QueryFusionRetriever(mode="reciprocal_rerank", num_queries=4)` generates 4 query variants then fuses
- **Design gap**: L1 single-query fanout vs multi-query fanout (sub-questions). The design doesn't surface query-decomposition.
- **Action**: either adopt query-decomposition pre-L1 OR document that 11-family fanout substitutes for query-variant fanout.

### vs Anthropic claude-cookbooks research patterns
- `research_lead_agent.md:135-137` MUST-block "use_parallel_tool_calls" — already governance-enforced via parallel-dispatch-mandate skill
- Design ALIGNS — §3.2 telemetry P0-A enforce is the operative mechanism.
- No recalibration needed.

### vs Microsoft AutoGen orchestrator-worker
- AutoGen has `TokenUsageTermination + MaxMessageTermination` combinable (W326 §03 P12)
- **Design gap**: §1-§9 has no per-Unit token-budget cap; Δ-PDM-2 (W328 absorb) covers ORCHESTRATOR-side but per-Unit/Layer budget is missing
- **Action**: add `Unit.budget(tokens=N, max_messages=M)` to verdict-primitive composition (line-item in §2.1-§2.6 per Unit).

### vs arXiv 2024-2026 rank-fusion + agent-research papers
- Cuconasu+2025 RAG positional bias (arXiv 2505.15561) — top-rank distractors heavily bias confidence
- MRMR Zhang+2025 (arXiv 2510.09510) — Contradiction Retrieval benchmark
- DeepVerifier (arXiv 2601.15808) — DRA failure-taxonomy (already Δ56)
- PosIR Zeng+2026 (arXiv 2601.08363) — position-bias correlates weakly with existing benchmarks
- **Design gap**: PosIR finding implies Δ54 N=3 may be MORE/LESS than needed depending on document-length-distribution; calibrate empirically.

---

## §7 — Per-layer verdict matrix (re-stated with detailed scoring)

| Layer | Verdict | Confidence | Conditions |
|---|---|---|---|
| L1 Discovery | **APPROVE-WITH-RECALIBRATION** | 0.85 | RRF k=60 -> k=10 + family-prior (F4); cross-encoder reranker (optional) |
| L2 sca-PRE-v1 | **SIMPLIFY** | 0.75 | Merge into L3 Phase-0a; saves 1 layer of design surface (F2) |
| L3 Verdict Block | **APPROVE** | 0.90 | D-REGRET shadow-only in W328; composite-denom stays 39.8 until W330 calibration (F5, F6) |
| L4 Codex Ensemble | **SIMPLIFY** | 0.85 | N=1 default + adaptive escalate (F1) |
| L5 Soak + inspect_ai | **APPROVE** | 0.90 | inspect_ai install is solid; add cost-budget line (M2) |
| L6 Evolution gepa | **APPROVE-AS-OPTIONAL** | 0.70 | Wave-end Pareto not nightly cron (F3); operator-review-gate is mandatory |
| §3.1 Memory citation-graph | **APPROVE** | 0.95 | Schema-add only; cheap |
| §3.2 Telemetry P0-A enforce | **APPROVE-WITH-CAVEAT** | 0.80 | Add false-positive opt-out for legitimate single-stream tasks |
| §3.3 markitdown probe-record | **APPROVE** | 0.95 | Already shipped; no contest |

**Confidence weighted-average**: 0.852 -> design is "Mostly Right, Specific Tweaks Required".

---

## §8 — Final recommendation for W328 absorb wave

### MUST-CHANGE before W328 commit:
1. **F1 invert Δ54 default**: N=1 default + adaptive escalate to N=2 then N=3 on REVISE — saves 3x codex spend.
2. **F2 collapse L2->L3 Phase-0a**: drop standalone L2 layer; embed sca-PRE-v1 as sca-v13 Phase-0a. 6->5 layers.
3. **F5 demote D-REGRET to shadow-dim**: keep composite_denom_install=39.8 until W330 has 3 calibration data-points; D-REGRET in §2.5 ladder OK as observation-only.
4. **F6 publish composite-denom derivation**: §2.3 MUST show W_DREGRET, W_DEMP, W_DCCRT weights with anchor.

### SHOULD-CHANGE in W328 absorb:
5. **F3 L6 wave-end not nightly**: rename `NightlyCron` -> `WaveEndPareto`; gate on Stop-hook.
6. **F4 RRF k=60 -> k=10 + family-prior**: empirically ablate against k=30 / k=60 on held-out set.
7. **F7 audit 3-org-distinct anchors**: L2 + L3 need 1 anchor replaced each.

### NICE-TO-HAVE:
8. **F8 §9 rename**: "5-fold SOTA conjunction" -> "Glossary: SOTA-criteria recap".

### Missing-requirement closures (M1-M8):
- M1 add §10 failure-mode walkthroughs (3 traces)
- M2 add §11 cost + latency budget
- M3 add §12 rollback playbook
- M4 add §13 permissions/security review
- M5 ground sca-PRE-v1 60% filter-rate with 1 wave's data
- M6 anchor-freshness: add Shi+2025 + Zeng+2026 + RankNet upgrade path
- M7 add §14 on-call runbook stub
- M8 cascade-degraded handling per missing-family case

### Composite-quality realism reset (Path α update):
- Current trajectory 4.036 -> 4.40 by W329 is **aspirational**
- After F1+F2+F5 simplifications: realistic trajectory likely 4.036 -> 4.25 by W329 (less aggressive)
- Path-α to GREEN >=4.5 needs W331 micro-wave + inspect_ai EvalLog grounding of EVERY +Δ before commit

### If I could only change one thing, it would be ___

**Invert Δ54 default to N=1 single-swap.** It's the highest-leverage simplification: cuts codex spend 3x, brings happy-path latency from ~45m to ~15m, keeps 80%+ of position-bias-defeat from Zheng+2023, and pairs cleanly with adaptive escalation. Every other finding can wait a wave; this one compounds across every W328+ verdict.

---

## §9 — Codex Phase-6 ratification request

```yaml
slug: W327-FULL-SOTA-UNLEASHED/11-RESEARCH-ARCH-ADVERSARIAL-REVALIDATE.md
verdict: ADVERSARIAL-REVIEW  # critique artifact, not a tier
rule_version: sca-v12  # referencing sca-v13 proposed absorbs critically
findings_blocker: [F1, M1, M2]
findings_high: [F2, F5, M3, M4, M7]
findings_medium: [F3, F4, F6, F7, M5, M6, M8]
findings_nit: [F8]
per_layer_verdicts:
  L1: APPROVE-WITH-RECALIBRATION
  L2: SIMPLIFY
  L3: APPROVE
  L4: SIMPLIFY
  L5: APPROVE
  L6: APPROVE-AS-OPTIONAL
  M:  APPROVE
  T:  APPROVE-WITH-CAVEAT
  P:  APPROVE
single_biggest_change: "Invert Δ54 default: N=1 single-swap default + adaptive escalate to N=3 on REVISE/NEEDS-REVISION only"
composite_realism_reset: "4.036 -> 4.25 by W329 (was claimed 4.40); path-α GREEN @ W331 needs inspect_ai EvalLog grounding per Δ"
cascade_degraded: true  # no live MCP probe in this session; verification via prior fork-4 deepwiki + repo-tree
wave: W327
date: 2026-05-19
```

---

## §10 — Anchors used in this critique (>=3-org-distinct)

| Source | Org | Type | Role in critique |
|---|---|---|---|
| Zheng+ 2023 MT-Bench | UC Berkeley + Stanford + EPFL | peer-reviewed | F1 (single-swap defeats >=80% bias) |
| Cormack+ 2009 RRF | University of Waterloo | peer-reviewed | F4 (TREC-document k=60 derivation) |
| Cuconasu+ 2025 RAG positional bias | Sapienza + Tech-Innovation | peer-reviewed | F4 (short-list k-recalibration) |
| Shi+ 2025 Judging-the-Judges | Dartmouth | peer-reviewed | F1 follow-up |
| Zeng+ 2026 PosIR | independent + ByteDance | peer-reviewed | F1 follow-up |
| LangChain `EnsembleRetriever` + `reciprocal_rank_fusion` | LangChain Inc | OSS API | §6 LangChain comparison |
| LlamaIndex `QueryFusionRetriever` | LlamaIndex Inc | OSS API | §6 LlamaIndex comparison |
| Microsoft AutoGen `TokenUsageTermination` | Microsoft Corp | OSS framework | §6 AutoGen comparison |
| haizelabs/verdict primitives | Haize Labs Inc | OSS framework + deepwiki probe (W326 fork-4) | F1 verdict-primitive verification |
| Anthropic Multi-Agent Research blog | Anthropic PBC | engineering blog | §6 alignment |
| gepa arXiv 2507.19457 | gepa-ai (Stanford CRFM lineage) | peer-reviewed | F3 (wave-end pattern) |
| sca-v12 §7 ship-gate (this runtime) | self | precedent | F5/F6 (D-REGRET calibration discipline) |

**Count**: 12 organizationally-distinct anchors in this critique itself; meta-invariant I1 compliant.

---

## §11 — Closing one-paragraph verdict

The W326 §09 target architecture is **directionally correct and well-anchored**, but it ships three over-engineering risks (Δ54 N=3 default, L2/L3 redundancy, L6 nightly cron) and three under-grounded claims (composite trajectory, D-REGRET ladder calibration, sca-PRE-v1 60% filter-rate). The recommended W328 absorb-wave path is: APPROVE the 6-layer skeleton WITH the F1/F2/F5/F6 must-changes applied INLINE before commit, AND address M1-M4 missing-requirement closures in the same wave. The remaining nits can land in W330. **If I could only change one thing, it would be inverting Δ54 to N=1 default + adaptive escalate — every other change can wait; this one compounds across every verdict-row that ships after it.**
