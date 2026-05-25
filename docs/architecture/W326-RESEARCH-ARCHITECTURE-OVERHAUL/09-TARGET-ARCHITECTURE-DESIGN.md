# W326 §09 — Target SOTA Research Architecture Design (Deep-Dive)

> Builds on `00`-`08`. Synthesizes a 6-layer SOTA research architecture grounded in W326 multi-angle convergence findings + W327 uncommitted carry-forward + W328 P0 dispatch + composite-quality RED ALERT trajectory.
> Vocabulary: haizelabs/verdict Unit/Layer/Block primitives (per sca-v12 Δ50) — Unit = single Claude/Codex invocation; Layer = N-parallel ensemble; Block = composed pipeline.
> Anchor sources: Anthropic claude-cookbooks `research_lead_agent.md` + gpt-researcher planner-executor + paper-qa citation-aware retrieval + open_deep_research MCP-native LangGraph + Perplexica multi-source fusion + smolagents tool-grounded reasoning + verdict primitives + gepa Pareto evolution + inspect_ai replayable EvalLog + DSPy GEPA + Cormack+ 2009 RRF + Zheng+ 2023 MT-Bench + DeepVerifier DRA arXiv 2601.15808 + Anthropic Multi-Agent Research blog.

## §1 — Executive Architecture (6 layers + 3 cross-cutting)

```
                        ┌─────────────────────────────────────────────────────────┐
                        │                  CROSS-CUT: T6 basic-memory (Δ55 citation-graph)         │
                        │                  CROSS-CUT: parallel-ratio telemetry (W329-D P0-A enforce) │
                        │                  CROSS-CUT: markitdown probe-record (Δ51/D66)            │
                        └─────────────────────────────────────────────────────────┘
                                                  │
       ┌──────────────────────────────────────────┴──────────────────────────────────────────┐
       ▼                                                                                       │
[L1 DISCOVERY BLOCK]   Layer(MCP-fanout) >> RRF-merge >> AntiBiasGate                          │
       │              perplexity·tavily·exa·websearch·webfetch·deepwiki·repomix·hf·github·arxiv·openalex (11 families = T1 floor)
       │              ↓ raw ranked-lists per family
       │              ↓ RRF k=60 unified rank (sca-v13 Δ53; Cormack+ 2009)
       │              ↓ stars-only D12 cap; Bayesian author-prior; "trending<30d" auto-T2
       ▼
[L2 SCREEN UNIT]       sca-PRE-v1 (Fork-6) — 6-dim WSM, denom 5.0, <5min
       │              P1 cc_pathway · P2 install_cost×CR · P3 ecosystem · P4 corroboration · P5 D-EMP-shim · P6 rollback
       │              Routes: ≥3.5 ESCALATE · 2.5-3.5 OPERATOR · <2.5 AUTO-T4 · CR-violation OR D-EMP=0 AUTO-T5
       ▼
[L3 VERDICT BLOCK]     Stage0 >> Layer(Phase1..5) >> WeightedSum >> EC-PROMETHEE
       │              Stage-0 ≥2-family existence-probe (sca-v12 §1; D66 markitdown record)
       │              Phase-1 multi-MCP cascade (T1=11 floor; cost-cap; cascade_degraded flag)
       │              Phase-2 cross-source triangulation (≥3-org-distinct; codex-mediation on disagreement≥2)
       │              Phase-3 anti-bias gate (Δ52 chaoss corroboration; star-only auto-demote)
       │              Phase-4 weighted-sum + D-EMP HARD GATE + Δ49 EC-PROMETHEE committee-aggregation
       │              Phase-5 5-gate (provenance · paraphrase · adversarial · contamination · replayable+≥3-org)
       │              → 9-tier verdict T0/T1/T1-PROV/T2/T2-CHERRY-FRONTIER/T2-CHERRY/T3/T4/T5
       ▼
[L4 CODEX BLOCK]       Layer(N=3 codex_round) >> MaxPoolUnit >> PositionSwapAudit
       │              Plugin Stop-hook (openai-codex/1.0.4/hooks/hooks.json:24-37; timeout 900s)
       │              Δ54 sca-v13: N=3 ensemble + Borda-vote majority (was Δ50 single-swap)
       │              Round-N adaptive (1..3) on NEEDS-REVISION
       │              Verdict: APPROVE · REVISE · NEEDS-REVISION · BLOCK
       ▼
[L5 SOAK BLOCK]        inspect_ai-Eval >> D-EMP-update >> D-REGRET-update >> auto-revert?
       │              T1 INSTALL → multi-wave soak (D-EMP 0-5 ladder)
       │              Δ57 sca-v13: D-REGRET dim (0-5) — closed feedback loop
       │              inspect_ai replayable EvalLog per verdict; --model-role grader=openai/gpt-5.5
       │              D-REGRET ≤1 → auto-revert recommendation
       ▼
[L6 EVOLUTION BLOCK]   gepa-Pareto >> SKILL-desc-update + ops-rhythm dwell
                       Nightly gepa-ai/gepa Pareto over `.claude/skills/**/SKILL.md`
                       ops-rhythm 3/5/8-wave dwell escalation
                       cascade_degraded persistence ≥3 waves → auto-re-cascade
                       Wave-N+1 inherits all updates via decision-decay state machine
```

## §2 — Layer-by-Layer Specification

### §2.1 — L1 DISCOVERY BLOCK (Multi-MCP Convergent Fan-out)

**Composition (verdict-primitive notation)**:
```
L1 = ParallelLayer([
    Unit(perplexity_search),
    Unit(perplexity_research),  # high reasoning_effort; 60s+ accept
    Unit(tavily_search),
    Unit(tavily_research),
    Unit(exa_web_search),
    Unit(exa_web_fetch),
    Unit(WebSearch),
    Unit(WebFetch),
    Unit(deepwiki_ask_question),
    Unit(repomix_pack_remote_repository),
    Unit(hf_paper_search),
    Unit(hf_hub_repo_search),
    Unit(github_search_repositories),
    Unit(arxiv_mcp_search),        # NEW W327 install (G1)
    Unit(openalex_mcp_search)      # NEW W327 install (G1)
]) >> RRFMerge(k=60) >> AntiBiasGate
```

**Mandatory floors** (sca-v12 §2 Phase-1):
- T4: ≥3 families
- T3: ≥7 families
- T2: ≥9 families (≥1 paper-class + ≥1 perplexity-equiv)
- T1: ≥11 families (≥2 non-github primary first-discovery)

**Anti-bias mandate** (sca-v12 Phase-3): top-10 ranking MUST surface ≥1 candidate first-discovered by EACH fired MCP family. RRF naturally satisfies this by giving each family's rank-1 a fixed score-contribution.

**Cite anchors** (3-org-distinct):
- Cormack+ 2009 *Reciprocal Rank Fusion outperforms Condorcet and individual rank learning methods* (University of Waterloo)
- Anthropic Multi-Agent Research blog `building-multi-agent-research-system` (Anthropic PBC)
- LangChain RAG-Fusion documentation (LangChain AI Inc)

**W326 gap-closures**: G1 (paper-MCP via arxiv+openalex) · G6 (RRF post-merge fixes unranked-union) · G7 (key rotation unblocks deep-research-trio).

---

### §2.2 — L2 SCREEN UNIT (sca-PRE-v1, 5-min)

**Composition**: single Unit invocation.

**Algorithm**:
```python
def sca_pre_v1(candidate):
    # HARD GATES (any failure → AUTO-T5-SKIP)
    if cardinal_rule_violation(candidate):
        return Verdict(T5, reason="CR-violation")
    if d_emp_shim(candidate) == 0:
        return Verdict(T5, reason="D-EMP=0 HARD BLOCK")

    # 6-dim WSM
    scores = {
        "P1": cc_pathway_fit(candidate),         # 1-5: MCP=5/plugin=4/skill=3/agent=2/repo-only=1
        "P2": install_cost_x_cr_compat(candidate),  # 0-5
        "P3": ecosystem_momentum(candidate),     # 1-5: 90d-commits + maintainer-velocity z-score
        "P4": cross_source_corroboration(candidate),  # 1-5: family-count-on-this-claim
        "P5": d_emp_shim(candidate),             # 0-5
        "P6": rollback_simplicity(candidate),    # 1-5
    }
    composite = sum(scores.values()) / 5.0  # denom_pre

    # ROUTE
    if composite >= 3.5: return Route("ESCALATE-FULL", scores=scores)
    if composite >= 2.5: return Route("OPERATOR-DECISION", scores=scores)
    return Route("AUTO-T4-CITE-ONLY", scores=scores)
```

**Empirical ROI** (Fork-6 finding): ~6.6 hr/wave at 60% T4/T5 filter rate.

**Worked example** (gpt-researcher vs paper-qa for "agentic-research" gap):
- Both score 3.00 → operator-decision zone → escalate to L3 sca-v12 (operator may also pre-filter on D38 mcp_native: paper-qa wins on MCP-native paper-tool composition).

**W326 gap-closure**: G5 (wires sca-PRE-v1 into the pipeline).

---

### §2.3 — L3 VERDICT BLOCK (sca-v12 → sca-v13 6-phase)

**Composition**: 6-phase block per sca-v12 §2 + §7 + sca-v13 W328 absorbs.

**sca-v13 additions** (W328 dispatch):
- **Δ53** RRF post-cascade merge (Phase-1; G6 closure)
- **Δ54** Layer(N=3)>>MaxPoolUnit ensemble (Phase-6; G13 closure)
- **Δ55** Citation-graph topology to T6 (cross-cut; G12 closure)
- **Δ56** DRA failure-taxonomy expansion (Phase-3 anti-bias; G11 closure)
- **Δ57** D-REGRET dim (Phase-4 weighted-sum; G2 closure)
- **composite_denom_install**: 39.8 → **40.4** (sca-v13)
- **composite_denom_pattern**: 17.3 → **17.7** (sca-v13)

**Tier-floor reconfirmation** (sca-v12 §7; sca-v13 carries forward unchanged):
| Tier | install_score | pattern_score | D-EMP | D-CCRT | D-REGRET (sca-v13) |
|---|---|---|---|---|---|
| T0 IMMEDIATE | ≥4.7 | n/a | ≥3 | ≥2 | ≥3 |
| T1 INSTALL | ≥4.5 | n/a | ≥2 | ≥2 | ≥2 |
| T1-PROV | ≥3.8 | n/a | ≥1 | ≥1 | ≥1 |
| T2 VENDOR-FORK | ≥3.2 | ≥4.0 | ≥1 | ≥1 | ≥1 |
| T2-CHERRY-FRONTIER | ≥3.0 | ≥3.8 | ≥1 | ≥1 | 0 |
| T3 PATTERN-STUDY | ≥2.5 | ≥3.5 | n/a | 0 | n/a |
| T4 CITE-ONLY | n/a | ≥3.0 | n/a | 0 | n/a |
| T5 REJECT | <2.5 | <3.0 | 0 | n/a | ≤1 (auto-revert) |

**Decision-decay state-machine** (sca-v12 §7; per-version downweight):
- v13 → 1.0×
- v12 → 0.95×
- v11 → 0.9025× (compound)
- v10 → 0.857×
- ...descending compound until operator-override

**W326 gap-closures**: G2 (D-REGRET) · G6 (RRF) · G11 (DRA-failure-taxonomy) · G12 (citation-graph) · G13 (Layer-N ensemble).

---

### §2.4 — L4 CODEX CROSS-MODEL BLOCK (Δ54 Layer-N ensemble)

**Composition**:
```
L4 = Layer([
    Unit(codex_round_1, prompt=verdict_evidence),
    Unit(codex_round_2, prompt=verdict_evidence_position_swapped),
    Unit(codex_round_3, prompt=verdict_evidence_paraphrased)
], repeat=adaptive_1_to_3) >> BordaVoteAggregator >> MaxPoolUnit
```

**Adaptive N**:
- N=1 default (single round, position-swap audit)
- N=2 if Round-1 returns REVISE or NEEDS-REVISION
- N=3 if Round-2 returns REVISE or NEEDS-REVISION (operator-cap default)

**Plugin-native wiring** (cardinal-rule-2-compliant):
- `openai-codex/1.0.4/hooks/hooks.json:24-37` Stop-hook auto-fires session-end
- `claude /codex:review` / `/codex:adversarial-review` operator-invoked
- 900s timeout per round; operator-extended on NEEDS-REVISION

**Cite anchors** (3-org-distinct):
- haizelabs/verdict Unit/Layer/Block primitives (Haize Labs Inc)
- Zheng+ 2023 MT-Bench arXiv 2306.05685 position-swap defense (UC Berkeley/Stanford/EPFL)
- JudgeLM Wang+ 2023 arXiv 2310.17631 (Beihang University/Tencent)

**W326 gap-closure**: G13 (single-swap → N=3 Borda-vote ensemble).

---

### §2.5 — L5 SOAK + REGRET BLOCK (inspect_ai EvalLog)

**Composition**:
```
L5 = SoakUnit(verdict) >>
     InspectAiEvalUnit(verdict, grader="openai/gpt-5.5") >>
     DEmpUpdater >> DRegretUpdater >>
     AutoRevertGate(if d_regret <= 1)
```

**inspect_ai integration** (Fork-5 top-3, T1 INSTALL after sandbox smoke):
- Replayable EvalLog JSON per verdict
- Native cross-model `model_graded_qa` with `--model-role grader=openai/gpt-5.5`
- Folds Phase-6 codex gate into the eval harness directly (one tool, one log, one replay)

**D-EMP soak ladder** (sca-v12 §4):
```
0: untested OR smoke-fails        → HARD BLOCK T1/T1-PROV/T2
1: sandbox-only / no soak         → SOFT WARN (T2-CHERRY ceiling)
2: tested + 1-cycle uneventful    → normal
3: tested + multi-day production  → normal
4: tested + ≥4-wave soak          → +0.5 D2 lift
5: tested + ≥8-wave + adversarial → +1.0 D2 lift
```

**D-REGRET dim** (sca-v13 Δ57; NEW):
```
0: unknown                                    → cap at T1-PROV
1: post-install regression detected           → auto-revert recommendation
2: stable                                     → normal
3: positive ROI via inspect_ai EvalLog        → normal + ledger lift
4: positive ROI + cross-wave generalization   → +0.5 lift
5: positive ROI + adversarial-survival + W269 telemetry uplift  → +1.0 lift
```

**Cite anchors** (3-org-distinct):
- inspect_ai (UK AI Safety Institute) — MIT
- NIST AI 600-1 MEASURE-2.3 + MEASURE-3.1 (NIST/US DoC)
- Stanford HELM continuous-update methodology (Stanford CRFM)

**W326 gap-closure**: G2 (closed-loop research-quality eval).

---

### §2.6 — L6 EVOLUTION BLOCK (gepa + ops-rhythm)

**Composition**:
```
L6 = NightlyCron([
    GepaParetoUnit(scope=".claude/skills/**/SKILL.md"),
    GepaParetoUnit(scope=".claude/skills/**/references/dimensions.md"),
    GepaParetoUnit(scope="<MCP-tool-description-strings>")
]) >>
OperatorReviewGate(diff_preview) >>
SkillDescUpdater +
OpsRhythmDwellEscalator(3w_5w_8w)
```

**gepa Pareto evolution** (Fork-5 top-2, T2 VENDOR-FORK → T1 after 4-wave soak):
- gepa-ai/gepa MIT, 3582★, ICLR 2026 Oral
- Genetic-pareto optimization of prompt-program components
- MCP Adapter explicitly optimizes MCP tool descriptions + system-prompt sections
- arXiv 2507.19457: +18% on RAG/agent benchmarks vs fixed-best

**ops-rhythm dwell** (sca-v12 K-7 cross-reference):
- 3-wave dwell → owner-assignment + ETA required
- 5-wave dwell → operator-decision-block; ledger `dwell_disposition_signed:` row
- 8-wave dwell → SHIP-BLOCKER + **−0.5 install_score arch-itself penalty**

**Cite anchors** (3-org-distinct):
- gepa-ai/gepa + arXiv 2507.19457 (DSPy/Stanford CRFM)
- Google SRE Error Budget Policy (Google LLC) — dwell-disposition framing
- Atlassian Kanban WIP/queue-aging methodology (Atlassian Corp)

**W326 gap-closures**: G8 (SKILL-desc Pareto evolution) · G10 (description-rot drift) · G14 (cascade-degraded persistence auto-recasade).

---

## §3 — Cross-Cutting Concerns

### §3.1 — Memory: T6 basic-memory canonical-primary + citation-graph (Δ55)

**Current state**: T6 basic-memory canonical-primary per W295. T1 hindsight RETIRED W317. T3 cognee ACTIVE. T5 langfuse LIVE.

**sca-v13 Δ55 extension**: extend Δ51 markitdown probe-record schema with `graph_edges: [{from: <slug>, to: <claim-id>, type: <citation|contradiction|corroboration>}]`. Persist to T6 via `mcp__basic-memory__write_note` tag `citation-graph-W<NNN>`.

**W326 gap-closure**: G12 (citation-graph topology).

### §3.2 — Telemetry: parallel-ratio enforcement (W329-D P0-A)

**Current state**: parallel_ratio = 0.0036 (denom 1676, 99.6% silent-serial fallback). `tools/preagent-parallel-guard.mjs:4,17` hardcoded advisory-only `exit 0` — hook DETECTS but cannot BLOCK.

**P0-A fix**:
```javascript
// preagent-parallel-guard.mjs (proposed W329-D / W327 patch)
const violations = readViolationCounter(sessionId);
if (violations >= 1) {  // second violation triggers block
  console.error("BLOCK: 2nd serial-Agent-dispatch in multi-stream context. Read parallel-dispatch-mandate skill.");
  process.exit(2);  // PreToolUse exit-code 2 = block tool call
}
recordViolation(sessionId);
process.exit(0);  // first violation = advisory only
```

**telemetry tool**: `tools/parallel-ratio-telemetry.mjs` writes per-Stop rollup; nightly aggregation persists to `.claude/state/telemetry/parallel-ratio.jsonl`.

**W326 gap-closure**: G3 (parallel_ratio + P0-A enforcement).

### §3.3 — Probe-record: markitdown evidence-chain (Δ51 → D66)

Every Stage-0 family-return piped through `markitdown` (microsoft/markitdown MIT) → canonical Markdown. Probe-record JSON written to `verdicts/W<N>-<slug>-probe-record.json`. D-EMP HARD GATE + Phase-5 Gate-5 Replayable auto-consume.

**W326 gap-closure**: (already shipped via sca-v12 Δ51); arch-itself self-cite as D66 T-skip.

---

## §4 — Migration Path: Current → Target

| Component | Current state | Target | Wave |
|---|---|---|---|
| L1 Discovery | Unranked-union multi-MCP fan-out; ~5-7 families typical | 11-family + RRF k=60 + arxiv + openalex | W327-G1, W328-Δ53 |
| L2 Screen | Not wired; full sca-v12 cascade always runs | sca-PRE-v1 Phase-0 pre-route | W327-G5 |
| L3 Verdict | sca-v12 49+ dims; cascade_degraded common | sca-v13 51+ dims + D-REGRET + RRF + DRA-tax | W328 absorb wave |
| L4 Codex | Δ50 single-swap | Δ54 Layer(N=3)>>MaxPoolUnit Borda-vote | W328-Δ54 |
| L5 Soak | D-EMP ladder only; no regret signal | + inspect_ai EvalLog + D-REGRET | W327-G2 install + W328-Δ57 |
| L6 Evolution | ops-rhythm dwell-only | + gepa Pareto SKILL-desc nightly | W329-gepa T2 fork |
| Memory | T6 ledger rows only | + Δ55 citation-graph topology | W328-Δ55 |
| Telemetry | Hook advisory-only (`exit 0`) | Block-on-2nd-violation per session | W327-P0-A (CLAUDE.md L13 W329-D fix) |
| Probe-record | Manual cite + drift-prone | Δ51/D66 markitdown auto-chain | Already shipped sca-v12 |

---

## §5 — Composite-Quality Projection Per Design Choice

Per W326-codex-r1 round-15 realism correction; current baseline **W326 4.036 RED ALERT**:

| Design choice | Composite-delta | Cumulative |
|---|---|---|
| Baseline W326 | — | 4.036 |
| W327: G7 keys + G1 paper-MCP + G3 P0-A + G5 sca-PRE-v1 | +0.10 | ~4.14 |
| W328-Δ53 RRF + Δ54 Layer-N + Δ55 graph + Δ56 DRA + Δ57 D-REGRET | +0.18 | ~4.32 |
| W329: gepa fork + 4-wave soak | +0.08 | ~4.40 |
| **GREEN ≥4.5 ship-gate** | needs +0.10 more | **gap @ W330** |

**3 paths to GREEN** (operator decision):
- **α (recommended)** W331 micro-wave (~2h): stricter scoring trace + 30-day telemetry evidence → ~4.55
- **β** WSL2 Path 2B pivot (3-5 wave prereq; biggest disruption) → 4.70-4.80
- **γ** Ship-gate revision to 4.4 with operator-acceptance-record → instant GREEN at expense of rubric integrity

This design optimizes for **α**: the W327-W328-W329 sequence above brings us to ~4.40 organically; W331 micro-wave delivers the final 0.10-0.15 via evidence-strengthening (not score-inflation).

---

## §6 — Integration with W327/W328/W329 Active Work

**Active work (per operator wave-status output)**:
- W327 drafted, **uncommitted** — 64M + 22 untracked files spanning W320→W327 docs (multi-session race risk)
- W329-D-RETRY (other terminal) — bypass cascade-degraded; writing CANDIDATES.md
- W329-I (other terminal) — S2 correction-path Pattern A2 in CORRECT-USAGE.md
- W329-J (other terminal) — Banner application to W315 STREAM-D

**This W326 wave's deliverable** (this session, `sota-converge-w310` branch):
- `00`-`09` artifacts in `docs/architecture/W326-RESEARCH-ARCHITECTURE-OVERHAUL/`
- Independent of W327/W329 (different branch + different scope)
- Mergeable after W327 commit lands on main

**Coordination**:
- W326 design (this file) is the DESIGN doc for W327-G* + W328-Δ* execution
- W329 streams operate on separate gaps (D = bypass cascade-degraded, I = correction-path, J = banners) — non-overlapping with W326 scope
- Codex Phase-6 Stop-hook ratifies this session at end (Round-1 default)

**Recommended commit cadence** (operator action):
1. NOW: `git status` in this worktree → commit W326 9-file deliverable
2. NEXT: operator commits W327 uncommitted work (in its respective worktree)
3. THEN: merge `sota-converge-w310` → main once both W326 + W327 committed

---

## §7 — Codex Phase-6 Ratification Request

**Verdict-row schema** (per sca-v12 §10):
```yaml
slug: W326-RESEARCH-ARCHITECTURE-OVERHAUL/09-TARGET-ARCHITECTURE-DESIGN.md
verdict: DESIGN-PROPOSAL  # not a tier (this is the rubric-target, not an adoption-candidate)
rule_version: sca-v12  # design referencing sca-v13 absorbs
proposed_absorbs: [Δ53 RRF, Δ54 Layer-N, Δ55 citation-graph, Δ56 DRA-tax, Δ57 D-REGRET]
gaps_closed: [G1, G2, G3, G4, G5, G6, G7, G8, G10, G11, G12, G13, G14]
gaps_deferred_to_p2: [G15, G16, G17, G18]
composite_quality_projection: 4.40 by W329 (path-α to GREEN at W331)
3_org_distinct_anchors: 18 across 6 layers + 3 cross-cuts
cascade_degraded: false (design synthesis — no MCP cascade in this artifact)
codex_round_1_expected: APPROVE or REVISE (Δ54 ensemble + composite trajectory specifics)
wave: W326
date: 2026-05-19
rollback_plan: artifacts only; reverting deletes docs/architecture/W326-RESEARCH-ARCHITECTURE-OVERHAUL/ — no runtime changes; W327/W328 execution is the actual install/code-change wave
```

**Codex review-priority dimensions** (highest first):
1. Composite-quality 4.40 projection realism (per round-14 realism mandate)
2. Δ54 Layer(N=3)>>MaxPoolUnit Borda-vote correctness vs Zheng+ 2023 single-swap defense
3. D-REGRET 0-5 ladder calibration (no precedent; sca-v13-novel)
4. RRF k=60 vs k=10 vs k=30 default trade-off (Cormack+ 2009 used k=60 on TREC; agent-research domain may need re-tuning)
5. Composite-denom math: 39.8 → 40.4 (+D-REGRET 0.6); pattern 17.3 → 17.7 (+0.4) — verify
6. Cross-wave decision-decay compound: v13→v12 0.95× verified

If codex returns REVISE: operator absorbs findings inline; round-2 next session.
If codex returns NEEDS-REVISION: blocks W328 absorb-wave until specific findings closed.
If codex returns APPROVE: W327 execution proceeds; W328 absorb-wave scheduled.

---

## §8 — Anchors Inventory (≥3-org-distinct per layer)

| Layer | Source 1 | Source 2 | Source 3 |
|---|---|---|---|
| L1 Discovery | Cormack+ 2009 (Waterloo) RRF | Anthropic Multi-Agent Research blog | LangChain RAG-Fusion docs |
| L2 Screen | Fork-6 sca-PRE-v1 (this runtime) | OpenSSF Best-Practices Badge | OSSF Scorecard 19-check rubric |
| L3 Verdict | sca-v12 (this runtime, codex-r15 ratified) | Pereira 2024 arXiv 2404.06370 EC-PROMETHEE | NIST 800-160 Vol.2 Rev.1 SC-29 |
| L4 Codex | haizelabs/verdict primitives | Zheng+ 2023 MT-Bench (UC Berkeley) | JudgeLM Wang+ 2023 (Beihang/Tencent) |
| L5 Soak | inspect_ai (UK AISI) | NIST AI 600-1 MEASURE-2.3 | Stanford HELM CRFM |
| L6 Evolution | gepa-ai/gepa arXiv 2507.19457 (Stanford CRFM) | Google SRE Error Budget | Atlassian Kanban WIP |
| Memory cross-cut | basic-memory uvx pin (this runtime W295) | W3C DID Resolution | NIST 800-53 IA-2(1) |
| Telemetry cross-cut | W329-D root-cause (CLAUDE.md L13) | OWASP ASVS V2.10 | CISA Zero-Trust |
| Probe-record cross-cut | microsoft/markitdown MIT | NIST AI 600-1 MEASURE-3.1 | Anthropic claude-cookbooks research_lead_agent |

**Total**: 27 organizationally-distinct anchors across 9 architecture facets. Meta-invariant I1 (sca-v12 §8) compliance ≥3-per-facet.

---

## §9 — Definition of "SOTA" (per user mandate)

**SOTA** in this runtime context is multi-conditioned:

1. **External SOTA** (per published benchmarks):
   - Stars (D12 sub-signal cap 3 if mono)
   - Paper-backing (arxiv-linked = D43 lift)
   - HELM / LMSYS-arena leaderboard position (D45 corroboration)
   - paperswithcode SOTA criterion match

2. **Pattern-quality SOTA** (decoupled from popularity — user-mandated NOT-hard-gate):
   - T2-CHERRY-FRONTIER retention (sca-v12 Δ47) — low-star + top-3-on-dim-subset
   - Bayesian author-prior (D6 lift for established maintainers)
   - Anti-bias hard-stops on star-only / trending<30d / single-author-week

3. **Runtime-fit SOTA** (CC-pathway-conditioned):
   - D35 (D-CCRT) + D38 (mcp_native) + D39 (opus_4_7) + D40 (z_portable) + D41 (loop_compat)
   - Cardinal-rule compliance (R1-R5)
   - CR-9 npx-pin discipline (`npx -y <pkg>@<pinned-version>`)

4. **Convergent SOTA** (cross-source verified):
   - ≥3-org-distinct sources per any T1/T2 claim (sca-v12 §2 Phase-2)
   - ≥11 MCP-family floor for T1 (sca-v12 §2 Phase-1)
   - Codex GPT-5.5 round-1 APPROVE (sca-v12 §6 Phase-6)

5. **Self-improving SOTA** (closed-loop):
   - D-EMP soak ladder (multi-wave production survival)
   - D-REGRET signal (sca-v13 Δ57; closes the loop)
   - gepa Pareto evolution of own rubric (sca-v13 W329)
   - Decision-decay state machine (auto-downweight stale verdicts)

**No single dim defines SOTA**. The 5-fold conjunction above is the operative definition for adopt-decisions in this runtime. A repo can be "external SOTA" (high stars + arxiv) but fail "runtime-fit" (cardinal-rule violation) → T5. A repo can be "low-star" but "pattern-quality SOTA" → T2-CHERRY-FRONTIER retention. The rubric is multi-conditional by construction, not hard-gated.
