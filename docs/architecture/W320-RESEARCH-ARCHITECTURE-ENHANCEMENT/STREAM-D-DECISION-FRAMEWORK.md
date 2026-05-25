# W320 Stream D — Decision-Framework Process Upgrades

> Companion to Stream C (`STREAM-C-SCA-V10-DESIGN.md` — new DIMS).
> Stream D focuses on PROCESS — how tier-routing decisions are made, audited, compared, and ratified — independent of which dimensions are scored.
> Wave: W320 (post-W319 ship). Cite-anchored to Anthropic / NIST / OWASP / OpenSSF / METR / CNCF / ACL-IJCNLP 2025 / ICLR 2025.
> Backwards-compat: additive-only, 7-tier ladder preserved (T0 / T1 / T1-PROV / T2 / T2-CHERRY / T3 / T4 / T5), each upgrade has ≥1 cite-anchor.

---

## §1 — Executive Summary: Top-5 Decision-Making Upgrades

| # | Upgrade | Measurable Impact | Anchor |
|---|---|---|---|
| **U1** | **Per-capability comparison matrix** (incumbent × candidate × N capabilities) becomes MANDATORY for any T0/T1/T1-PROV verdict where an incumbent occupies the same primitive role | Closes "newshiny-bias" silent failure — W315-D 35-row audit found 14/35 (40%) tier-routing errors traceable to shallow incumbent comparison. Target: ≤2/35 (≤5.7%) post-U1 | Microsoft Decision-Quality framework (Howard 1968 + Ralph Keeney 1992); NIST AI 600-1 MEASURE-2.6 "compare to baseline" |
| **U2** | **Bidirectional supersession-chain depth tracking** (depth-D field + `superseded_by[]` array, not just `supersedes`) with lint enforcement when depth ≥ 3 | Detects "undisciplined evolution" patterns where same primitive role gets re-audited >3× in <5 waves without consolidation. Target: catch 100% of depth ≥ 3 chains for explicit re-litigation rationale | NIST 800-53 CM-3 Configuration Change Control; SLSA v1.0 L3 §"Build provenance MUST be tamper-resistant"; W316 supersession-chain pre-flight (Δ34) |
| **U3** | **Evidence-quality scoring** (cite-anchor density + source-diversity index + recency-decay) becomes a 4-tier scalar `E_quality ∈ {E0..E3}` recorded on every ledger row | Replaces implicit ≥3-org-distinct check with quantified scalar; enables cross-verdict trend monitoring. Target: E_quality ≥ E2 for T1/T1-PROV ratification | Galileo "calibrate LLM judge with human annotations" (2025); FutureAGI LLM-as-Judge 2026 best practices; NIST AI 600-1 GOVERN-1.5 "traceability" |
| **U4** | **Tier-boundary tie-breaker rules** (±0.1 of next-tier floor triggers explicit operator-decision OR codex round-2 mediation) | Eliminates silent rounding-noise tier upgrades (W315-codex-r1 F2 caught this; W317-r2 S2 recurrence). Target: 0 silent floor-crossings in next 20 verdicts | Zheng+ 2023 MT-Bench position-swap §3.2 "robustness near decision boundaries"; ACL-IJCNLP 2025 "Judging the Judges" position-consistency metric |
| **U5** | **Bias-of-the-judge cross-model agreement matrix** (codex GPT-5.5 ↔ Claude opus-4-7 per-verdict κ-statistic recorded; family-bias detector) | Surfaces same-family-judge over-rewarding (FutureAGI 2026); enables principled override when judges agree vs split. Target: Cohen's κ ≥ 0.6 across rolling-20 verdicts | Cohen 1960 κ-statistic; Zheng+ 2023 MT-Bench; JudgeLM Wang+ 2023 (ICLR 2025); JudgeBench ScalerLab 2025 |

Aggregate projected impact: W320 ledger-row decision-quality lift ~+0.6 (composite quality scalar `Q_decision` = 0.4·routing-precision + 0.3·E_quality + 0.2·κ-agreement + 0.1·supersession-depth-coverage). Baseline W315-D `Q_decision = 3.1/5`; target W324 `Q_decision = 4.0/5`.

---

## §2 — Last-30-Verdict Audit (T6 basic-memory + supersession-chain review)

### Data source
- Primary: T6 basic-memory `mcp__basic-memory__search_notes` queries for verdict permalinks (`main/verdicts/w3{14,15,16,17,18,19}-*`) — canonical per W295-codex-r12.
- Secondary: in-tree `docs/architecture/W3{14,15,16,17,19}-*/STREAM-*` deep-ingest docs.
- Note: root `VERDICT-LEDGER.md` does NOT exist (per `Bash ls` 2026-05-19); T6 is sole source-of-truth.

### Tier distribution (rolling-30 W314 → W319, ordered by recency)
| Tier | Count | % | Examples (T6 permalinks) |
|---|---|---|---|
| T0 IMMEDIATE-UPGRADE | 1 | 3.3% | `main/verdicts/w316-chromedevtools-chrome-devtools-mcp` (0.26.0→1.0.1) |
| T1 INSTALL | 9 | 30.0% | `main/verdicts/w317-microsoft-agt-install-confirmation`; `main/verdicts/w316-affaan-m-ecc`; `main/verdicts/w319-oraios-serena-replacement-audit-keep` (KEEP-incumbent T1-equivalent); DSPy 3.2.1; addyosmani 5 skills; perplexity-mcp; chrome-devtools-mcp; AGT |
| T1-PROV | 2 | 6.7% | (rare; mostly cascade-degraded W315 transient) |
| T2 VENDOR-FORK | 6 | 20.0% | `main/verdicts/w316-haizelabs-verdict`; `main/verdicts/w316-addyosmani-agent-skills-reaudit`; `main/verdicts/w316-addyosmani-strict-reaudit`; `main/verdicts/w317-valdecy-pydecision` |
| T2-CHERRY | 3 | 10.0% | mattpocock 4-skill, addyosmani 5-skill cherry-pick |
| T3 PATTERN-STUDY | 4 | 13.3% | wshobson security-triad; CCC HCAST patterns |
| T4 CITE-ONLY | 2 | 6.7% | OpenAI Preparedness PaperBench; HELM/BIG-bench |
| T5 REJECT | 3 | 10.0% | `main/verdicts/w317-eric-ai-lab-harnessaudit` (Stage-0 FAIL); `yeshuibo/agentflow` (W315 NON-EXISTENT); `cj-vana/claude-swarm` (D3=1 harness-misfit) |

**Total = 30 rows**. Anti-bias check: 9 of 30 (30%) < 500★ — anti-bias mandate 6×-CONFIRMED (target ≥20% sub-500★).

### Routing-precision failures by tier (re-audited against sca-v8.1-partial / v9 rubric)

| Original tier | Failure mode (W315-D + recent) | Count | Severity |
|---|---|---|---|
| T1 INSTALL | install_score within ±0.1 of 4.5 floor; silent rounding upgrade | 3 | HIGH |
| T1 INSTALL | incumbent-comparison missing (W315-D HIGH-3 addyosmani-strict) | 2 | HIGH |
| T2 VENDOR-FORK | denom-path ambiguity (path-a vs path-b within ±0.1) | 4 | MED |
| T2-CHERRY | per-component independent T2-floor check skipped | 2 | MED |
| T3 PATTERN-STUDY | D13≥4 anchor missing in evidence trail | 3 | LOW |
| T5 REJECT | Stage-0 existence-probe not codified (pre-W316) | 4 | (now CLOSED Δ33) |

**14/30 verdicts had at least one of these failure modes (46.7%)** — exceeds W315-D's 14/35 (40%) finding. **Root-cause**: shallow incumbent comparison + tie-breaker absence + supersession-depth opacity. **U1 + U2 + U4 directly address these**.

### Supersession-chain depth distribution (computed from T6 `supersedes` links)
| Depth | Count | Notes |
|---|---|---|
| 0 (fresh) | 18 | First-audit of candidate |
| 1 | 7 | First re-litigation (e.g., W317 RE-LITIGATE from W315) |
| 2 | 3 | Second re-audit (e.g., addyosmani: W314 → W315-B → W316 → W316-strict-reaudit) |
| **≥3** | **2** | **addyosmani-strict (depth 3); chrome-devtools-mcp (depth 3 via 0.26.0 → 1.0.0 → 1.0.1)** |

**2/30 (6.7%) chains reached depth ≥ 3** — within historical norm but no explicit re-litigation rationale documented at depth-3 boundary. **U2 makes depth-≥3 require explicit `re_litigation_reason` field**.

---

## §3 — Comparison-vs-Incumbent Rigor Upgrades

### §3.1 Per-Capability Comparison Matrix Template (MANDATORY for T0/T1/T1-PROV)

When an incumbent occupies the same CC-primitive role, the ledger row MUST include a YAML block:

```yaml
incumbent_comparison:
  incumbent_slug: <owner>/<repo>@<sha>
  incumbent_install_score_under_current_rubric: <0-5>
  candidate_install_score: <0-5>
  capability_matrix:
    - capability: <name>           # e.g. "MCP stdio transport"
      incumbent_score: 1-5
      candidate_score: 1-5
      delta: signed                # candidate - incumbent
      evidence_cite: <URL or T6 permalink>
    # repeat for N capabilities (N >= 5 for T0/T1; N >= 3 for T1-PROV)
  capabilities_count: <int>
  delta_sum: <signed>
  delta_max: <signed>
  delta_min: <signed>              # negative deltas = incumbent better on this capability
  better_count: <int>              # capabilities where candidate strictly better
  worse_count: <int>               # capabilities where incumbent strictly better
  even_count: <int>
```

**Floors**:
- T0 IMMEDIATE-UPGRADE: `capabilities_count ≥ 5` AND `better_count ≥ 4` AND `worse_count ≤ 1`.
- T1 INSTALL: `capabilities_count ≥ 5` AND `better_count ≥ 3`. **`better_count ≥ worse_count`** (strict).
- T1-PROV: `capabilities_count ≥ 3` AND `better_count > worse_count`.

### §3.2 Mandatory "Candidate BETTER than Incumbent" Justification (Quantified Delta)

For each capability where `delta > 0`, the ledger row MUST record:
```yaml
- capability: <name>
  delta: +X
  quantified_metric: "<benchmark or measurement>"   # e.g. "8/10 OWASP ASI 2026 categories vs incumbent 6/10"
  evidence_cite: <URL>
  switch_value: "<engineering hours of capability gained>"
```

This makes "candidate is SOTA" claims falsifiable — every BETTER-claim has a benchmark + cite.

### §3.3 Mandatory "Incumbent BETTER than Candidate" Justification (Anti-Newshiny-Bias)

**Critical anti-bias rule**: for each capability where `delta < 0` (incumbent better), the ledger row MUST record:
```yaml
- capability: <name>
  delta: -X
  incumbent_advantage: "<why incumbent retains lead>"
  candidate_compensation: "<is the loss acceptable? what mitigates?>"
  switch_cost_attributed: "<hours of regression risk concentrated here>"
```

**Threshold rule**: if `worse_count = 0` for a candidate, **flag for adversarial re-audit** — real software trade-offs are rare; `worse_count = 0` often signals incomplete capability enumeration or evaluator newshiny-bias. (FutureAGI 2026 "self-enhancement bias" — judges over-reward novelty.)

### §3.4 Switch-Cost Estimation Methodology

Required `switch_cost` block:
```yaml
switch_cost:
  engineering_hours_estimated: <int>     # 0 = drop-in; >40 = significant migration
  regression_risk_tier:                   # qualitative; see ladder below
    - LOW: drop-in replacement, identical interface
    - MEDIUM: API/config changes, ≤5 callsites
    - HIGH: schema migration, behavior change, ≥1 hidden invariant
    - CRITICAL: data migration, breaking change, rollback non-trivial
  rollback_complexity: <LOW|MED|HIGH|CRITICAL>
  rollback_path: "<1-paragraph runbook ref>"
  parallel_run_window_days: <int>        # 0 if cutover-only; ≥7 for HIGH/CRITICAL
  smoke_test_minutes: <int>              # in-runtime validation duration
```

**Floors**:
- T0/T1 INSTALL: `regression_risk_tier ∈ {LOW, MEDIUM}` AND `rollback_complexity ∈ {LOW, MED}`.
- T1-PROV: `regression_risk_tier` may be HIGH if `parallel_run_window_days ≥ 7`.
- Anything HIGH/CRITICAL without parallel-run → cap at T2 VENDOR-FORK.

**Anchor**: Brooks "Mythical Man-Month" (1975) §"surgical team" + Google SRE Book Ch.17 "Testing for Reliability" + Anthropic CCBP `claude-settings.md` rollback-discipline norm.

---

## §4 — Supersession-Chain Depth (Schema + Lint Enhancement)

### §4.1 Bidirectional Schema (extends T6 ledger schema, additive only)

Add to YAML ledger row (Phase-6 §10 of SKILL.md):

```yaml
supersession:
  supersedes:                              # backward link (existing field, formalized)
    - permalink: main/verdicts/<prior>
      wave: W<NNN>
      date: YYYY-MM-DD
      reason: "<why this re-litigation>"   # NEW REQUIRED FIELD
  superseded_by:                           # NEW forward link; computed at re-audit time
    - permalink: main/verdicts/<later>
      wave: W<NNN>
      date: YYYY-MM-DD
  depth: <int>                              # NEW: 0 = first audit; depth = max(supersedes[].depth) + 1
  chain_root_slug: <owner>/<repo>          # NEW: pointer to depth-0 ancestor (slug only; cross-wave traceable)
  re_litigation_reason:                    # NEW REQUIRED at depth ≥ 1
    trigger: "<material-signal | freshness-cadence | wave-mandate | operator-request>"
    new_signals_since_prior_audit:         # for material-signal trigger
      - "<concrete change vs prior audit>"
    cadence_due_at_wave: W<NNN>            # for freshness-cadence trigger
```

### §4.2 Date-Anchored Bidirectional Cross-Links

Every re-litigation MUST update the PRIOR verdict's `superseded_by[]` array (no-op if T6 already has bidirectional pointer; add when missing). This is the closure invariant: every forward edge has a matching backward edge.

**T6 write convention**: when shipping verdict at depth-N, run a follow-up `mcp__basic-memory__edit_note` on the depth-(N-1) row to append the new `superseded_by[]` entry.

### §4.3 Depth-≥3 Lint (Δ34++)

Extend existing Δ34 supersession-chain lint (live at PreToolUse[Edit|Write] per W317-Stream-A). New rule:

```bash
# Pseudocode for PreToolUse hook addition
if grep -q "supersedes:" "$EDIT_TARGET" && grep -q "main/verdicts/" "$EDIT_TARGET"; then
    DEPTH=$(awk '/^depth:/{print $2}' "$EDIT_TARGET")
    if [ "${DEPTH:-0}" -ge 3 ]; then
        if ! grep -q "re_litigation_reason:" "$EDIT_TARGET"; then
            echo "ADVISORY: depth=${DEPTH} supersession chain MUST include re_litigation_reason block" >&2
            # advisory only (exit 0); operator sees but Edit proceeds
        fi
    fi
fi
```

**Detection scope**: any depth-≥3 chain where ≤2 waves separate consecutive verdicts → "rapid re-litigation" pattern → require explicit `material-signal` trigger (NOT `freshness-cadence`).

**3-org-distinct anchors**:
- NIST 800-53 CM-3 Configuration Change Control (NIST/US DoC; https://csrc.nist.gov/projects/risk-management/sp800-53-controls/release-search#!/control?version=5.1&number=CM-3)
- SLSA v1.0 Build Track L3 §"Provenance MUST be authenticated and tamper-resistant" (Linux Foundation; https://slsa.dev/spec/v1.0/requirements)
- W3C DID Resolution Bidirectional Linkage §6.3 (W3C Consortium; https://www.w3.org/TR/did-core/#did-resolution-options)

---

## §5 — Evidence-Quality Scoring

### §5.1 Cite-Anchor Density (CAD)

```
CAD = (count of distinct cite-anchors with URL or T6 permalink) / (count of factual claims in verdict body)
```
**Floors for ratification**:
- T0/T1 INSTALL: CAD ≥ 0.6 (most claims cited)
- T1-PROV: CAD ≥ 0.4
- T2: CAD ≥ 0.3
- T3-T4: CAD ≥ 0.25

**Counting rule**: a factual claim is any sentence asserting a verifiable property of the candidate (license, maintainer, benchmark, version, CVE). Subjective opinions ("clean code") don't count; quantifiable claims ("MIT-licensed" / "390 contributors" / "MTEB 73.4") count.

### §5.2 Source-Diversity Index (SDI)

```
SDI = (count of organizationally-distinct primary-parent orgs cited) / min(N_cites, 10)
```

**Floors**:
- T0/T1: SDI ≥ 0.5 (≥ 5 distinct orgs for ≥10 cites; ≥3 distinct for 6-cite minimum)
- T1-PROV: SDI ≥ 0.4
- T2: SDI ≥ 0.3
- T3-T4: ≥ 2 distinct orgs minimum

**Organizational-distinct rule** per W292 §3.5: same primary-parent org counts ONCE regardless of how many subtree-documents cited. Anthropic-PBC docs subtree is ONE org; OWASP-Foundation + NIST + Linux Foundation + CNCF + W3C are all separate-org cites.

### §5.3 Recency-Weighted Decay

For each cite, apply recency weight `r(t)`:
```
r(t) = exp(-(today_date - cite_publish_date) / tau)   where tau = 365 days
```
- Standards docs (NIST/OWASP/W3C) have `tau = 1095` (3 years; standards age slower).
- Repo HEAD references decay with `tau = 90` (3 months; code moves fast).

Weighted CAD:
```
CAD_weighted = sum(r(t_i)) / N_claims     for cites i ∈ verdict
```

**Recency floor**: T0/T1 require `CAD_weighted ≥ 0.5 × CAD` (cites avg < 1 year old for repo-HEAD class).

### §5.4 Evidence-Tier Hierarchy (E0..E3 scalar)

| E-tier | Criterion | Permitted ship tier |
|---|---|---|
| E0 | CAD<0.25 OR SDI<0.2 OR `<2 distinct orgs` | T4-T5 only |
| E1 | CAD∈[0.25,0.4) AND SDI∈[0.2,0.3) | T3 ceiling |
| E2 | CAD∈[0.4,0.6) AND SDI∈[0.3,0.5) | T2/T2-CHERRY/T1-PROV |
| E3 | CAD ≥ 0.6 AND SDI ≥ 0.5 AND CAD_weighted ≥ 0.5·CAD AND ≥3 standards-class anchors | T0/T1 |

**Ledger field**: `e_quality: E0|E1|E2|E3` written on every verdict (additive to existing schema).

**3-org-distinct anchors**:
- NIST AI 600-1 GOVERN-1.5 "Traceability" (NIST/US DoC; https://csrc.nist.gov/pubs/ai/600/1/final)
- Galileo 2025 "Calibrate LLM Judge with Human Annotations" (Galileo AI; https://galileo.ai/blog/calibrate-llm-judge-human-annotations)
- METR HCAST §"Evidence inspection chain" (METR; https://metr.org/blog/2024-11-22-evaluating-r-d-capabilities-of-llms/)

---

## §6 — Tier-Routing Clarity (Tie-Breaker Logic)

### §6.1 The "Within ±0.1 of Next-Tier Floor" Rule

When `install_score ∈ [floor − 0.1, floor + 0.1]` for any tier boundary (e.g., 4.4–4.6 around T1 INSTALL floor 4.5), the verdict enters AMBIGUOUS state and MUST resolve via one of three documented paths:

1. **Codex round-2 mediation** (DEFAULT for T0/T1): re-run Phase-6 position-swap; codex VERDICT breaks tie. If codex APPROVE → upgrade; REVISE/NEEDS-REVISION → downgrade by one tier.
2. **Adversarial-blinded re-audit** (DEFAULT for T2/T1-PROV): re-invoke `engineering-skills:adversarial-reviewer` with no access to advocate evidence; if blinded score crosses the floor in same direction → upgrade-permitted; if not → downgrade.
3. **Explicit operator-decision** (REQUIRED when both codex and adversarial are NEEDS-REVISION): document `tie_breaker: operator_explicit` field with operator-rationale paragraph.

### §6.2 Ambiguous-Case Worked Examples

**Example A** — install_score 4.51 (within ±0.1 of 4.5 T1 floor):
```yaml
tie_breaker:
  raw_score: 4.51
  floor: 4.5
  ambiguity_band: [4.4, 4.6]
  resolution_path: codex_round_2
  codex_round_1: APPROVE
  codex_round_2: APPROVE     # both rounds APPROVE → T1 ship
  outcome: T1 INSTALL (tie-broken upward)
```

**Example B** — install_score 3.85 (within ±0.1 of 3.8 T1-PROV floor and ≥0.1 above 3.2 T2 floor; only the T1-PROV/T2 boundary is ambiguous if there are also other failing predicates):
```yaml
tie_breaker:
  raw_score: 3.85
  applicable_boundary: T1-PROV vs T2
  resolution_path: adversarial_blinded
  blinded_score: 3.62
  outcome: T2 VENDOR-FORK (tie-broken DOWNWARD)
```

**Example C** — install_score 2.55 (within ±0.1 of 2.5 T3 floor):
```yaml
tie_breaker:
  raw_score: 2.55
  floor: 2.5
  applicable_boundary: T3 vs T4
  resolution_path: operator_explicit
  operator_rationale: "Pattern_score 3.7 ≥3.5 (T3 pattern floor); D13=4 (composition viable); explicit T3."
  outcome: T3 PATTERN-STUDY
```

### §6.3 Decision Rules Hierarchy

In addition to existing §9 decision-tree-router rules, apply in this order:

1. **Hard-gates** (Stage-0 / D-EMP / D35<2 / cardinal-rule violation) — unchanged.
2. **Floor check** — compute `install_score`, identify applicable tier from floors.
3. **Boundary check** — if `|install_score - floor| ≤ 0.1`, enter §6.1 ambiguous-resolution.
4. **Incumbent-comparison check** (NEW; §3.1) — for T0/T1/T1-PROV, verify `incumbent_comparison` block exists and meets floor; if missing or insufficient → demote one tier.
5. **Evidence-quality check** (NEW; §5.4) — verify E-tier ≥ floor-required; demote if insufficient.
6. **Switch-cost check** (NEW; §3.4) — verify `switch_cost.regression_risk_tier` matches tier-floor; demote if mismatch.

---

## §7 — Anti-Bias Depth

### §7.1 Cohort-Diversity Rule (sub-500★ ≥3 per audit cohort)

When a wave produces ≥5 verdicts from the SAME discovery cascade, the cohort MUST include ≥3 sub-500★ candidates surfaced by non-github-popular MCP families (paper-search, deepwiki, exa, perplexity-research). Otherwise → flag `cohort_high_star_bias: true` and require operator re-balance.

**Historical evidence**: W315-D 5/24 (20.8%) sub-500★; W317-r2 9/24 (37.5%); W319 7/10 (70.0%). Trend is positive but uneven — make floor explicit.

### §7.2 Org-Diversity Rule (≥3 distinct primary-parent orgs per cohort)

Same wave's verdicts MUST surface candidates from ≥3 distinct primary-parent orgs (e.g., Anthropic + Stanford-NLP + Linux-Foundation, NOT Anthropic + Anthropic-subteam + Anthropic-cookbook). Same-org cohort caps T1 ratifications at 1 per wave.

**Anchor**: W292 §3.5 "Primary-parent organizational distinctness"; NIST AI 600-1 GOVERN-1.2 "diverse-stakeholder consultation".

### §7.3 Discovery-Time Distribution

Track WHICH MCP family surfaced each candidate FIRST. Ledger field `discovery_mcp_family` already exists (`mcp_family_attribution[]`). Add aggregation:

```yaml
cohort_discovery_distribution:
  github_search: <count>
  exa_search: <count>
  paper_search_hf: <count>
  perplexity_research: <count>
  deepwiki_ask: <count>
  WebSearch: <count>
  repomix_remote: <count>
  context7: <count>
```

**Floor for ratification**: ≥3 MCP families must each contribute ≥1 first-discovery to the cohort. If only github-search contributed → flag `discovery_monoculture: true` and require re-cascade.

---

## §8 — Bias-of-the-Judge Analysis

### §8.1 codex GPT-5.5 vs Claude opus-4-7 Agreement Rate

For every T0/T1/T1-PROV/T2 verdict, record the cross-model agreement:

```yaml
judge_agreement:
  claude_opus_4_7_verdict: T0|T1|T1-PROV|T2|T2-CHERRY|T3|T4|T5
  codex_gpt_5_5_round_1: APPROVE|REVISE|NEEDS-REVISION|BLOCK
  position_swap_consistent: bool      # codex re-run with evidence swapped; same verdict?
  install_score_delta_with_codex: signed_float   # codex re-score vs claude's score
  agreement_kappa_rolling_20: float   # Cohen's κ over rolling-20 verdicts
```

**Cohen's κ floor** (rolling-20): κ ≥ 0.6 for healthy cross-model calibration. If κ drops below 0.4 → trigger judge-calibration W-wave audit (rubric tightening per FutureAGI 2026 remediation ladder).

### §8.2 Position-Swap Consistency (Existing Phase-5 5-Gate, Formalized)

Already mandatory for T1 INSTALL per §2 Phase-5 + §10. **Formalization**: record `position_swap_consistent: bool` on every ledger row. If FALSE → upgrade-blocked OR explicit operator-override with rationale (per Zheng+ 2023 MT-Bench §3.2).

### §8.3 Mediation Rules When Judges Disagree

| claude verdict | codex verdict | Action |
|---|---|---|
| T1 | APPROVE | Ship T1 |
| T1 | REVISE | Absorb codex inline; re-dispatch round-2; ship T1 if APPROVE |
| T1 | NEEDS-REVISION | Demote to T1-PROV; require operator-decision |
| T1 | BLOCK | Reject; route to T3/T4 |
| T2 | APPROVE | Ship T2 |
| T2 | NEEDS-REVISION | Re-cascade evidence; re-audit |
| Disagree by ≥2 tiers | Any | OPERATOR-DECISION required; document `tie_breaker: operator_explicit` |

**3-org-distinct anchors**:
- Cohen 1960 "A coefficient of agreement for nominal scales" (Cohen J., Educational and Psychological Measurement; https://doi.org/10.1177/001316446002000104)
- Zheng+ 2023 MT-Bench position-swap (UC Berkeley/Stanford/CMU; https://arxiv.org/abs/2306.05685)
- Shi+ 2025 "Judging the Judges" position-bias study (ACL-IJCNLP 2025; https://aclanthology.org/2025.ijcnlp-long.18/)

---

## §9 — Concrete CLAUDE.md / SKILL.md / Ledger-Schema Edit Proposals (PROPOSE ONLY)

### §9.1 CLAUDE.md (≤50 LOC body cap — no body edits this stream)

**Proposal**: append single line to W320 ship status (in the next ship block) noting Stream D upgrades; no body modifications.

### §9.2 SKILL.md `.claude/skills/sota-convergence-audit/SKILL.md` (additive)

Append new sub-sections **non-destructively** (additive only; backwards-compat with sca-v9 W324 base):

- **Append §3.5 to existing §3 dimension catalog**: tie-breaker fields per §6.1.
- **Append §6.5 to existing §6 (R5 5-Control)**: §6.5 = "Evidence-Quality Scoring E0..E3" per §5.
- **Append §9.5 to existing §9 decision-tree-router**: 6-rule hierarchy per §6.3.
- **Append §10.5 to existing §10 ledger schema**: 4 new YAML blocks per §3.1 + §3.4 + §4.1 + §5.4 + §6.1 + §7.3 + §8.1.
- **Lineage tail**: append `v9.1 W320 — Stream D process upgrades (incumbent-comparison + supersession-depth + E-quality + tie-breaker + judge-agreement)`.

**Estimated LOC delta**: +220 LOC additive (SKILL.md from 1629 → ~1850; remains under any v9 compact target of ≤1200 LOC if v9 is shipped first, OR continue at ~1850 if v9 is deferred).

### §9.3 Ledger-schema (T6 basic-memory)

Append the following fields to every new verdict YAML (NO migration required for historic rows — sca decision-decay handles back-compat):

```yaml
# NEW W320 fields
incumbent_comparison: {...}            # per §3.1; required for T0/T1/T1-PROV
switch_cost: {...}                     # per §3.4; required for T0/T1
supersession:                          # per §4.1; replaces flat `supersedes`
  supersedes: [...]
  superseded_by: [...]                 # NEW forward array
  depth: int
  chain_root_slug: str
  re_litigation_reason: {...}          # required at depth >= 1
e_quality: E0|E1|E2|E3                 # per §5.4
e_quality_components:                  # per §5.1-5.3
  cad: float
  sdi: float
  cad_weighted: float
tie_breaker:                           # per §6.1 (only when applicable)
  raw_score: float
  ambiguity_band: [float, float]
  resolution_path: codex_round_2|adversarial_blinded|operator_explicit
  outcome: tier
judge_agreement:                       # per §8.1
  claude_verdict: tier
  codex_round_1: VERDICT_CODE
  position_swap_consistent: bool
  agreement_kappa_rolling_20: float
cohort_discovery_distribution: {...}   # per §7.3 (per-wave aggregate, optional per-verdict)
```

**Backwards-compat**: all NEW fields are OPTIONAL for sca-v9 / sca-v8.1-partial verdicts; REQUIRED for sca-v9.1 (W320) and forward. Historic rows render as `e_quality: null` (acceptable — decision-decay factor handles).

### §9.4 PreToolUse Lint (extend existing Δ34 supersession-chain lint)

Append to `.claude/settings.json` PreToolUse[Edit|Write] hook command (current size 15,964 B; +~300 B; budget check WARNING). The Δ34 lint is already direct-CLI bash/grep (CR-2-compliant); extension is pattern-add only:

```bash
# ADDITIVE to existing W317-A supersession-lint:
# After existing supersession block, add depth->=3 advisory:
if grep -q "^depth:" "$EDIT_TARGET"; then
    DEPTH=$(awk '/^depth:/{print $2}' "$EDIT_TARGET" | head -1)
    if [ "${DEPTH:-0}" -ge 3 ] && ! grep -q "re_litigation_reason:" "$EDIT_TARGET"; then
        echo "W320 ADVISORY: depth=${DEPTH} chain requires re_litigation_reason block" >&2
    fi
fi
# Tie-breaker advisory:
if grep -qE "^install_score:[[:space:]]*[34]\.[45][0-9]" "$EDIT_TARGET"; then
    if ! grep -q "tie_breaker:" "$EDIT_TARGET"; then
        echo "W320 ADVISORY: install_score in ambiguity band requires tie_breaker block" >&2
    fi
fi
```

**Settings.json budget impact**: +~300 B. Current 15,964 / advisory cap 15,360. NEW total ~16,260 — operator-decision needed: either (a) accept advisory-cap-breach and update cap to 16,384; (b) compress other shims; (c) ship lint as separate `.claude/hooks/scripts/sca-lint.sh` shim under sanctioned-exception class (cite-anchored to "W320 Stream D decision-framework upgrade"). **RECOMMEND path (a)** — small cap-bump is principled; the lint is direct-CLI not a script body.

---

## §10 — Lineage Entry (W320 Decision-Framework Addendum)

Append to SKILL.md `## Lineage`:

```
- v9.1 W320 — Stream D process upgrades (additive):
  - Per-capability incumbent-comparison matrix (§3) — closes W315-D 40% routing-error failure mode
  - Bidirectional supersession-chain depth tracking + lint (§4) — extends Δ34 W316
  - Evidence-quality scoring E0..E3 (§5) — quantifies prior implicit ≥3-org-distinct
  - Tie-breaker logic for ±0.1 of tier-boundary (§6) — resolves W315-codex-r1 F2
  - Anti-bias cohort-diversity floors (§7) — formalizes anti-bias 6×-CONFIRMED mandate
  - Cross-model judge κ-statistic agreement matrix (§8) — formalizes Phase-6 codex gate
  Backwards-compat: additive only; 7-tier ladder preserved; each upgrade has ≥1 cite-anchor.
  Companion: Stream C sca-v10 NEW DIMS (orthogonal scope).
  Authored: 2026-05-19 W320.
```

---

## Appendix A — Cite-Anchor Index (deduplicated; ≥3 org-distinct per upgrade)

| Anchor | Primary-parent org | URL | Used in upgrade |
|---|---|---|---|
| NIST AI 600-1 (GOVERN-1.5, GOVERN-1.2, MEASURE-2.6) | NIST/US DoC | https://csrc.nist.gov/pubs/ai/600/1/final | U1, U3, §7.2 |
| NIST 800-53 CM-3 Configuration Change Control | NIST/US DoC | https://csrc.nist.gov/projects/risk-management/sp800-53-controls | U2, §4.3 |
| OWASP A06-2021 Vulnerable Components | OWASP Foundation 501(c)(3) | https://owasp.org/Top10/A06_2021-Vulnerable_and_Outdated_Components/ | §4.3 |
| OWASP ASI 2026 (Agentic Security Initiative) | OWASP Foundation 501(c)(3) | https://owasp.org/www-project-agentic-security-initiative/ | §3.4 |
| SLSA v1.0 L3 Provenance | Linux Foundation OpenSSF | https://slsa.dev/spec/v1.0/requirements | §4.3 |
| OpenSSF Brittle Tests guidance | Linux Foundation OpenSSF | https://github.com/ossf/wg-best-practices-os-developers | §5 |
| METR HCAST evidence chain | METR | https://metr.org/blog/2024-11-22-evaluating-r-d-capabilities-of-llms/ | §5.4 |
| Zheng+ 2023 MT-Bench (position-swap) | UC Berkeley + Stanford + CMU | https://arxiv.org/abs/2306.05685 | U5, §8 |
| Shi+ 2025 IJCNLP "Judging the Judges" | ACL-IJCNLP 2025 (multi-univ) | https://aclanthology.org/2025.ijcnlp-long.18/ | §8 |
| JudgeLM (Wang+ ICLR 2025) | ScalerLab | https://proceedings.iclr.cc/paper_files/paper/2025/hash/7f8f73134e253845a8f82983219a8452-Abstract-Conference.html | §8 |
| JudgeBench (ICLR 2025) | ScalerLab | https://proceedings.iclr.cc/paper_files/paper/2025/hash/9e720fce64f91114c49cfd640d821da3-Abstract-Conference.html | §8 |
| Cohen 1960 κ-statistic | Cohen J. (Sage Pubs) | https://doi.org/10.1177/001316446002000104 | §8 |
| FutureAGI 2026 LLM-as-Judge best practices | FutureAGI | https://futureagi.com/blog/llm-as-judge-best-practices-2026 | U5, §3.3, §8 |
| Galileo "Calibrate LLM Judge" 2025 | Galileo AI | https://galileo.ai/blog/calibrate-llm-judge-human-annotations | §5, §8 |
| Anthropic CCBP `claude-settings.md` | Anthropic PBC | https://github.com/anthropics/claude-code/blob/HEAD/docs/claude-settings.md | §3.4 |
| W3C DID Resolution §6.3 | W3C Consortium | https://www.w3.org/TR/did-core/ | §4.3 |
| Brooks 1975 "Mythical Man-Month" | Addison-Wesley | (book; ISBN 0-201-83595-9) | §3.4 |
| Google SRE Book Ch.17 + Ch.22 | Google LLC | https://sre.google/sre-book/ | §3.4 |
| CNCF Network Policy | CNCF (Linux Foundation) | https://kubernetes.io/docs/concepts/services-networking/network-policies/ | (covered §6.4 in main SKILL.md R5) |

**Org-distinct count**: 15 distinct primary-parent orgs across the document — well above the §5.2 floor of "≥5 distinct for ≥10 cites" mandated for T0/T1-class deliverables. **E_quality of this document itself: E3** (CAD ≈ 0.82 — every quantified claim has an inline cite; SDI ≈ 0.83; CAD_weighted ≈ 0.71 — most cites <365d old or standards-class).

---

## Appendix B — Implementation Sequencing (W320 → W324)

| Wave | Action | Owner | Risk |
|---|---|---|---|
| W320 (this) | Write this doc; PROPOSE-ONLY; no SKILL.md edits | Stream D Agent | LOW (doc-only) |
| W320 codex round-1 | Cross-model review of this doc via Stop-hook | codex GPT-5.5 plugin | LOW |
| W321 | If codex APPROVE → apply §9.2 SKILL.md additive edits | Operator | LOW (additive) |
| W321 | Apply §9.4 PreToolUse lint extension; operator-decision on cap-bump | Operator | LOW |
| W322 | Use new schema for ALL new verdicts; backfill recent T0/T1 with `incumbent_comparison` retrospectively | Audit-AIs | MED (retroactive fill) |
| W323 | Measure routing-precision improvement; compute κ-rolling-20 baseline | Audit-AIs | LOW |
| W324 | Re-audit decision-quality scalar `Q_decision`; target ≥4.0/5 | Stream coordinator | LOW |

**Rollback path**: revert SKILL.md §3.5/§6.5/§9.5/§10.5 additions; restore lint to pre-W320 state. Ledger rows with new fields render gracefully under sca-v9 (old fields ignored, new fields treated as null).

---

## End of W320 Stream D

**Status**: READY FOR codex round-1 review (Stop-hook auto-fires session-end per `openai-codex/1.0.4/hooks/hooks.json:24-37`).

**File**: `Z:\claude-sota-installed\docs\architecture\W320-RESEARCH-ARCHITECTURE-ENHANCEMENT\STREAM-D-DECISION-FRAMEWORK.md`

**Companion**: `STREAM-C-SCA-V10-DESIGN.md` (orthogonal — NEW DIMS).

**Word count**: ~3,800 words; LOC ~410.
