# W291 Stage-2 Pipeline Run — Batch 2 (Top-4 ranks 5-8)

> **Wave**: W291 Stage-2 typed-evidence + Stage-3 SCORE + Stage-4 adversarial review on candidates 5-8 from W290 F3 discovery.
> **Source-of-truth**: external deepwiki probes; inline-cite-per-claim per W292 R7.
> **Discipline**: dual composites + tier-specific hard-caps + Universal REJECT trigger taxonomy (v3 + W292-grand-synthesis).

---

## §0 — Methodology

Each candidate gets `evidence_pack` (Stream D §2) + `score_card` (Stream D §3) + Stage-4 3-persona adversarial review + final-verdict-line. Inline `cite` field per W292 R7. Computed via:

- `install_score = (D1×1.5 + D2×0.9 + D3×1.3 + D4×1.3 + D5×1.0 + D6×0.9 + D7×1.0 + D8×1.0 + D9×0.7 + D10×1.1 + D11×0.8 + D14×1.1 + D15×1.0) / 13.6`
- `pattern_score = (D2×1.4 + D5×1.0 + D6×0.8 + D8×0.9 + D9×0.8 + D12×0.7 + D13×1.5) / 7.1`

Tier routing per `STREAM-C-RUBRIC-v3.md §3` + EXCEPT clause (R3). Universal REJECT requires D10≤2 (conjunctive: AND no pattern improvement) OR D7≤1 OR D15≤1 OR adversarial-BLOCK.

---

## Candidate 5: `microsoft/PromptWizard`

### Discovery / context
Microsoft Research's task-aware prompt optimisation framework using a self-evolving Critique-N-Refine loop. Targets the prompt-optimisation layer not currently filled in our incumbent set (DSPy is referenced in F3 discovery but not installed; `microsoft/LLMLingua` IS installed but handles prompt-compression, not optimisation).

### evidence_pack

```yaml
candidate: microsoft/PromptWizard
collected_at: 2026-05-18
benchmark:
  - metric: GSM8k accuracy
    value: 90.0
    baseline: DSPy 78.2 / PromptAgent 68.84 / APO 25.67
    delta_vs_baseline: +11.8pp absolute / +15% relative vs DSPy
    source: deepwiki ask_question microsoft/PromptWizard
    cite: "deepwiki:microsoft/PromptWizard#Overview"
  - metric: API call efficiency (GSM8k)
    value: 147
    baseline: DSPy 915 / PromptAgent 2115 / APO 8490
    delta_vs_baseline: -84% vs DSPy
    source: deepwiki ask_question microsoft/PromptWizard
    cite: "deepwiki:microsoft/PromptWizard#Overview"
  - metric: BBH 1-shot
    value: 84.0
    baseline: 5-60x token reduction at $0.05/task
    cite: "deepwiki:microsoft/PromptWizard#Overview"
code_reading:
  - claim: Critique-N-Refine core algorithm
    file: promptwizard/glue/promptopt/techniques/critique_n_refine/core_logic.py
    lines: TBD (deepwiki points to CritiqueNRefine class + get_best_prompt method)
    source: deepwiki
    cite: "deepwiki:microsoft/PromptWizard#Critique-Refine-Technique"
  - claim: Entry-point library interface
    file: GluePromptOpt class
    source: deepwiki demo notebooks (demos/scenarios/dataset_scenarios_demo.ipynb)
    cite: "deepwiki:microsoft/PromptWizard#Overview"
practitioner_report:
  - org: none-found
    outcome: deepwiki returned no production-org cite; gap
    source: deepwiki ask_question microsoft/PromptWizard q5
    cite: "deepwiki:microsoft/PromptWizard"
sources_typed_disagreement: []
```

### score_card

```yaml
candidate: microsoft/PromptWizard
D1_license: 5      # MIT, cite: deepwiki:microsoft/PromptWizard#license
D2_uniqueness: 5    # no installed prompt-opt incumbent; DSPy referenced but not installed
D3_harness_fit: 2  # Python library, no Claude-Code/MCP native integration → requires SDK wrapper
D4_cc_pathway: 1   # no skill / no plugin / no agent / no hook / no MCP
D5_typed_evidence: 4   # benchmark ✓ + code_anchor ✓ + practitioner_report MISSING
D6_authority: 5    # Microsoft official org; Bayesian prior α=2 (T1-equivalent) + γ=1
D7_velocity_balanced: 4
D8_benchmark_deltas: 5   # +15% rel on GSM8k vs DSPy is +10% bucket per W287 P1a table
D9_failure_modes: 3  # ValueError on bad LLM output; no formal RUNBOOK
D10_duplication: 4   # no direct prompt-opt incumbent
D11_context_cost: 3   # adds Python deps + LLM optimisation passes = real cost
D12_community_distribution: 3   # stars-only, caps at 3
D13_pattern_extractability: 5   # Critique-N-Refine pattern is portable
D14_reversibility: 4   # removing Python deps is clean
D15_supply_chain: 4   # MS-official supply chain
install_score: 3.73   # 50.7/13.6
pattern_score: 4.44   # 31.5/7.1
hard_cap_breaches: []   # D3=2 is AT floor (hard_cap_if_below=2 means below 2 caps; 2 OK)
preliminary_tier: T2 VENDOR-FORK
```

### Stage-4 adversarial review

- **Security**: MIT + MS supply chain + no network beyond LLM API calls → APPROVE
- **Architect**: vendor-forking a Python lib into `harness/` adds deps; recommend `tools/promptwizard-vendored/` strategy → REVISE (dep-isolation plan needed)
- **Code-reviewer**: code documented + demo notebooks; practitioner field-reports MISSING → REVISE (need ≥1 named-org cite before any T2→T1 escalation)
- **Consolidated**: REVISE → T2 VENDOR-FORK holds, with a Stage-2.5 deep-dive task in W292+ to collect practitioner reports

### Rollback plan (T2 VENDOR-FORK requires divergence tracking)

- Vendor-fork target: `tools/promptwizard-vendored/critique_n_refine.py` (single-file extract of the algorithm; preserve MIT NOTICE)
- Divergence tracking: pin upstream commit SHA in `tools/README.md` + monthly upstream-drift check via `git ls-remote`
- Rollback: `rm -r tools/promptwizard-vendored/`; recovery <60s; smoke test = `python -c "from harness.eval_harness import main; main()"` still succeeds (no internal dep)

**Final verdict-line**: `microsoft/PromptWizard` → **T2 VENDOR-FORK** (install 3.73, pattern 4.44; Stage-4 REVISE → operator gathers practitioner cites before vendor-fork ship; W292+ Stage-2.5 deep-dive queued)

---

## Candidate 6: `daymade/claude-code-skills` (low-star mandate flagship)

### Discovery / context
18 production-ready Claude Code skills under a plugin marketplace structure with `skill-creator` as an essential meta-skill. Three-level progressive disclosure + SHA-256-anchored `.security-scan-passed` marker + gitleaks integration via `security_scan.py`. Solo-maintainer; <500★ — operator-mandate flagship for "stars not a hardgate".

### evidence_pack

```yaml
candidate: daymade/claude-code-skills
collected_at: 2026-05-18
benchmark:
  - metric: no-benchmark-surface
    note: skill repos have no measurable artifact per W287 P1a no-surface clause → D8 parity-by-default
    cite: "deepwiki:daymade/claude-code-skills"
code_reading:
  - claim: skill-creator meta-skill SKILL.md
    file: skill-creator/SKILL.md
    source: deepwiki
    cite: "deepwiki:daymade/claude-code-skills#skill-creator-the-meta-skill"
  - claim: security_scan.py with gitleaks integration
    file: skill-creator/scripts/security_scan.py
    source: deepwiki
    cite: "deepwiki:daymade/claude-code-skills#Validation-and-Security-Scanning"
  - claim: 3-level progressive disclosure pattern
    file: skill-creator/SKILL.md body documentation
    source: deepwiki
    cite: "deepwiki:daymade/claude-code-skills"
practitioner_report:
  - org: daymade (self-cited)
    outcome: README footer "Built with ❤️ using the skill-creator skill for Claude Code"; v1.13.0 released 2025-10-22
    source: deepwiki ask_question
    cite: "deepwiki:daymade/claude-code-skills#CHANGELOG"
sources_typed_disagreement: []
```

### score_card

```yaml
candidate: daymade/claude-code-skills
D1_license: 5    # MIT (cite: deepwiki:daymade/claude-code-skills#LICENSE)
D2_uniqueness: 4   # meta-skill concept + .security-scan-passed marker; some overlap with installed example-skills:skill-creator
D3_harness_fit: 4   # claude-code-native skills
D4_cc_pathway: 5   # full CC pathway: plugin marketplace + SKILL.md + scripts/
D5_typed_evidence: 4   # code_anchor ✓; benchmark n/a; practitioner = self-cited (weak)
D6_authority: 2   # solo dev; no Anthropic affiliation; Bayesian α=0/β=0/γ partial
D7_velocity_balanced: 3   # solo + 7-month-stale (last 2025-10-22)
D8_benchmark_deltas: 3   # no-benchmark-surface → parity-by-default per W287 P1a
D9_failure_modes: 4   # anti-pattern enforcement + security marker system documented
D10_duplication: 3   # overlaps installed example-skills:skill-creator BUT adds .security-scan-passed + security_scan.py value
D11_context_cost: 3
D12_community_distribution: 3   # low-star + solo; stars-alone caps D12 at 3
D13_pattern_extractability: 5   # meta-skill + 3-level disclosure are highly extractable
D14_reversibility: 5   # skills inherently reversible
D15_supply_chain: 4   # gitleaks integration; no lockfile shown but stdlib-only
install_score: 3.87   # 52.6/13.6
pattern_score: 3.76   # 26.7/7.1
hard_cap_breaches: []
preliminary_tier: T3 PATTERN-STUDY
```

Both composites qualify for multiple tiers; pattern path is the natural fit per operator's "low-star high-quality pattern-study" mandate.

### Stage-4 adversarial review

- **Security**: gitleaks integration is the kind of pattern we WANT to absorb; MIT; solo author = bus-factor-1 (W292 D16 governance) for full INSTALL but PATTERN-STUDY is safe → APPROVE
- **Architect**: meta-skill overlaps installed `example-skills:skill-creator`; the `.security-scan-passed` marker (SHA-256 anchored) + `security_scan.py` are NOVEL and worth lifting into our tools/ or W293 sca-v3.1 → APPROVE (with extraction plan)
- **Code-reviewer**: code is markdown + Python scripts; deepwiki-verified structure; production-readiness not deeply inspected → REVISE (need W292+ code-anchor read of security_scan.py before any lift-into-runtime)
- **Consolidated**: APPROVE-after-REVISE → T3 PATTERN-STUDY confirmed; W293 task: lift `.security-scan-passed` marker pattern + `security_scan.py` content (gitleaks invocation + pickle/shell=True/os.system detectors + absolute-path detector + insecure-HTTP detector) into our pre-commit gate or W293 sca-v3.1 D15 OpenSSF sub-dim implementation

### Pattern-doc_path (T3 PATTERN-STUDY artefact)

W293 will create `docs/architecture/PATTERNS/skill-creator-security-marker.md` documenting:
- The `.security-scan-passed` SHA-256-of-skill-contents marker
- The 5-class security scan (secrets / PII / unsafe-code / absolute-paths / insecure-HTTP)
- The integration point with `skills-janitor`-style dedup discipline

**Final verdict-line**: `daymade/claude-code-skills` → **T3 PATTERN-STUDY** (install 3.87, pattern 3.76; Stage-4 APPROVE-after-REVISE → W293 lift `.security-scan-passed` + `security_scan.py` patterns into sca-v3.1 D15 OpenSSF sub-dim implementation; low-star mandate validated — solo <500★ correctly routes to T3 not T5)

---

## Candidate 7: `levnikolaevich/claude-code-skills`

### Discovery / context
**CRITICAL FINDING — source-typed disagreement surfaced**: Stream B (W290 F3) prelim attributed the `hashline-edit` MCP to `levnikolaevich/claude-code-skills`. DeepWiki probe REJECTS this attribution: levnikolaevich is a CONSUMER of `hashline-edit`, not the implementer. The actual MCP server lives at `Submersible/mcp-hashline-edit-server` (external dependency).

This is exactly the case for the v3 `sources_typed_disagreement[]` schema field — and is the kind of mid-pipeline correction the v3 evidence-typing rule (W288 R3 EXCEPT) was designed to catch. Surfaces honestly here.

### evidence_pack

```yaml
candidate: levnikolaevich/claude-code-skills
collected_at: 2026-05-18
benchmark:
  - metric: no-benchmark-surface
    cite: "deepwiki:levnikolaevich/claude-code-skills"
code_reading:
  - claim: hashline-edit MCP server implementation
    file: NOT IN THIS REPO — external at Submersible/mcp-hashline-edit-server
    note: levnikolaevich is consumer-side only; algorithm details (hash function, atomicity, collision-handling) NOT visible from this codebase
    source: deepwiki
    cite: "deepwiki:levnikolaevich/claude-code-skills#hashline-edit-external-dependency"
  - claim: pipeline-orchestrator ln-1000 worker-pattern
    file: SKILL.md body (ln-1000 series)
    source: deepwiki
    cite: "deepwiki:levnikolaevich/claude-code-skills#Pipeline-Orchestrator"
practitioner_report:
  - org: none-found
    cite: "deepwiki:levnikolaevich/claude-code-skills"
sources_typed_disagreement:
  - dimension: D2_uniqueness
    claim_v1: "hashline-edit MCP is unique to levnikolaevich (Stream B W290 F3 attribution)"
    claim_v2: "hashline-edit MCP is owned by Submersible/mcp-hashline-edit-server; levnikolaevich is consumer-side (deepwiki W291 Stage-2)"
    resolution: claim_v2 is correct; Stream B mis-attributed. Real audit target is Submersible/mcp-hashline-edit-server.
    cite: "deepwiki:levnikolaevich/claude-code-skills#hashline-edit-external-dependency"
```

### score_card

```yaml
candidate: levnikolaevich/claude-code-skills
D1_license: 5    # MIT
D2_uniqueness: 3   # ln-1000 worker-pipeline is somewhat unique; overlaps wshobson/agents + installed agent-teams
D3_harness_fit: 3
D4_cc_pathway: 4   # SKILL.md + MCP config
D5_typed_evidence: 2   # FAIL — headline claim mis-attributed; sources_typed_disagreement[] surfaced; real algorithm NOT visible here
D6_authority: 2
D7_velocity_balanced: 3
D8_benchmark_deltas: 3   # no benchmark surface
D9_failure_modes: 2   # no failure-mode docs visible
D10_duplication: 3   # ln-1000 overlaps installed agent-teams orchestrator + wshobson/agents
D11_context_cost: 3
D12_community_distribution: 2   # very low-star + solo + stars-alone caps at 3 (here even lower)
D13_pattern_extractability: 3   # worker-pipeline pattern lifts; specific MCPs reference external deps
D14_reversibility: 4
D15_supply_chain: 3   # external MCP deps inherit Submersible trust
install_score: 3.20   # 43.6/13.6
pattern_score: 2.54   # 18.0/7.1
hard_cap_breaches: ["D5<4 caps INSTALL"]   # D5=2 below 4 → INSTALL blocked (T1 + T2 both off-table)
preliminary_tier: T4 CITE-ONLY
```

### Stage-4 adversarial review

- **Security**: external MCP dep inherits THIRD-PARTY trust on Submersible → REVISE (re-audit the REAL target)
- **Architect**: source-typed-disagreement surfaced is exactly the v3 design intent — capture it as evidence-of-rubric-working; pipeline-orchestrator pattern overlaps installed agent-teams → REVISE (route real audit to Submersible)
- **Code-reviewer**: ln-1000 pipeline-orchestrator pattern is referenced from external sources; not original to this repo → APPROVE-CITE-ONLY
- **Consolidated**: REVISE → spawn separate W292+ audit for `Submersible/mcp-hashline-edit-server` as the REAL hashline-edit implementer

**Final verdict-line**: `levnikolaevich/claude-code-skills` → **T4 CITE-ONLY** (install 3.20, pattern 2.54; D5 hard-cap blocks INSTALL; Stage-4 REVISE → re-audit `Submersible/mcp-hashline-edit-server` separately; soft-gate honored — D10/D7/D15 all OK so NOT T5 REJECT despite low scores)

**Soft-gate validation**: low absolute scores routed DOWN the ladder to T4, NOT T5 REJECT. No D10≤2, no D7≤1, no D15≤1, no adversarial-BLOCK → affirmative-evidence-of-unfitness ABSENT → T4 is correct per W292 grand-synthesis §3.6 EXCEPT clause.

---

## Candidate 8: `rohitg00/awesome-claude-code-toolkit`

### Discovery / context
Mega-aggregator catalogue: 135 agents + 35 skills + 42 commands + 150 plugins + 8 MCP configs + 15 rules + 7 CLAUDE.md templates, drawing from 100+ contributor repos. Apache-2.0. Notable: includes `skills-janitor` plugin (dedup discipline) AND explicitly references `wshobson/agents` (already-installed) + `hesreallyhim/awesome-claude-code` (already-consulted).

### evidence_pack

```yaml
candidate: rohitg00/awesome-claude-code-toolkit
collected_at: 2026-05-18
benchmark:
  - metric: aggregate count
    value: "135 agents / 35 skills / 42 commands / 150 plugins / 8 MCPs / 15 rules / 7 CLAUDE.md templates"
    source: deepwiki + .claude-plugin/marketplace.json
    cite: "deepwiki:rohitg00/awesome-claude-code-toolkit#Overview"
code_reading:
  - claim: Apache-2.0 license
    file: LICENSE
    source: deepwiki
    cite: "deepwiki:rohitg00/awesome-claude-code-toolkit#license"
  - claim: skills-janitor dedup discipline (the unique-pattern claim worth lifting)
    file: plugins/ (skills-janitor)
    source: deepwiki
    cite: "deepwiki:rohitg00/awesome-claude-code-toolkit#skills-janitor"
  - claim: aggregator structure (plugins/ + agents/ + skills/ + commands/ + hooks/ + rules/ + templates/claude-md/ + mcp-configs/ + contexts/ + examples/ + setup/)
    file: repo-root
    source: deepwiki
    cite: "deepwiki:rohitg00/awesome-claude-code-toolkit#directory-structure"
practitioner_report:
  - org: rohitg00 (Rohit Ghumare; solo aggregator) + 100+ contributor sources by reference
    outcome: "Last Updated Mar 2026"; star history badge present (count not captured)
    cite: "deepwiki:rohitg00/awesome-claude-code-toolkit"
sources_typed_disagreement: []
```

### score_card

```yaml
candidate: rohitg00/awesome-claude-code-toolkit
D1_license: 5    # Apache-2.0 (cite: deepwiki marketplace.json)
D2_uniqueness: 3   # aggregator-value; primitives mostly belong to others
D3_harness_fit: 4
D4_cc_pathway: 5   # full CC pathway primitive surface
D5_typed_evidence: 4   # code_anchor ✓; aggregate counts ✓; benchmark n/a
D6_authority: 2   # solo aggregator; Bayesian α=0/β=0/γ marginal
D7_velocity_balanced: 5   # fresh (Mar 2026)
D8_benchmark_deltas: 3
D9_failure_modes: 3   # skills-janitor handles dedup but opt-in
D10_duplication: 2   # HEAVY: aggregates installed wshobson/agents + already-consulted awesome-claude-code
D11_context_cost: 2   # 135 agents × 35 skills × 42 commands = massive context-budget if fully loaded
D12_community_distribution: 3   # star count not captured; aggregator
D13_pattern_extractability: 3   # mostly pointers; skills-janitor sub-component is genuinely unique
D14_reversibility: 3
D15_supply_chain: 3   # 100+ contributor sources = transitive supply-chain risk
install_score: 3.52   # 47.9/13.6
pattern_score: 3.03   # 21.5/7.1
hard_cap_breaches: []   # D10=2 is AT floor (REJECT only if D10≤2 AND no pattern improvement; skills-janitor IS pattern improvement → not auto-REJECT)
preliminary_tier: T4 CITE-ONLY
```

**D10 conjunctive-rule note (per W289-fix7)**: D10=2 alone does NOT auto-REJECT. The rule is "D10≤2 AND no pattern improvement to lift". `skills-janitor` dedup plugin IS a pattern improvement we don't have. So D10=2 → soft-gate routes DOWN, not REJECT.

But pattern_score 3.03 < 3.5 floor AND D2=3 < 4 → T3 PATTERN-STUDY denied. Routes to T4 CITE-ONLY by exhaustion.

### Stage-4 adversarial review

- **Security**: aggregator-as-supply-chain-risk; if installed, transitive trust on 100+ contributor repos → REVISE (DO NOT install whole; CITE-ONLY safe)
- **Architect**: D10 duplication is the dominant signal — wshobson/agents already installed; awesome-claude-code already consulted; net marginal value is the AGGREGATION INDEX itself + skills-janitor → APPROVE-CITE-ONLY
- **Code-reviewer**: skills-janitor plugin specifically is worth a separate audit; the parent aggregator-class is index-class — APPROVE-with-followup
- **Consolidated**: APPROVE-CITE-ONLY → T4 final; spawn separate W292+ audit for `skills-janitor` sub-plugin (could elevate to T3 PATTERN-STUDY if its dedup discipline is high-quality)

**Final verdict-line**: `rohitg00/awesome-claude-code-toolkit` → **T4 CITE-ONLY** (install 3.52, pattern 3.03; D10=2 + D11=2 dominant; soft-gate routes DOWN not REJECT because `skills-janitor` IS pattern-improvement; W292+ audit of skills-janitor sub-component queued)

---

## Batch-2 summary (Top-4 ranks 5-8)

| Candidate | install_score | pattern_score | Hard caps | Final tier | Stage 4 verdict |
|---|---:|---:|---|---|---|
| 5. microsoft/PromptWizard | 3.73 | 4.44 | none | **T2 VENDOR-FORK** | REVISE → operator-action collect ≥1 practitioner cite before T2→T1 escalation |
| 6. daymade/claude-code-skills | 3.87 | 3.76 | none | **T3 PATTERN-STUDY** | APPROVE-after-REVISE → W293 lift `.security-scan-passed` + `security_scan.py` patterns into sca-v3.1 D15 OpenSSF sub-dim |
| 7. levnikolaevich/claude-code-skills | 3.20 | 2.54 | D5<4 caps INSTALL | **T4 CITE-ONLY** | REVISE → re-audit `Submersible/mcp-hashline-edit-server` separately (Stream B mis-attribution caught) |
| 8. rohitg00/awesome-claude-code-toolkit | 3.52 | 3.03 | none (D10=2 borderline) | **T4 CITE-ONLY** | APPROVE-CITE-ONLY → audit `skills-janitor` sub-plugin separately |

**Tier distribution (batch-2)**: 1 T2 VENDOR-FORK · 1 T3 PATTERN-STUDY · 2 T4 CITE-ONLY · 0 T5 REJECT. Combined with batch-1 (from W290 PIPELINE-RUN-rank-01-05.md): 2 INSTALL + 1 VENDOR-FORK (+1 in batch-2) + multiple T3/T4 + 0 REJECT.

---

## §N — Executive summary (5 bullets)

1. **Operator's low-star-mandate VALIDATED**: 2 of 4 candidates are <500★ (daymade@<500, levnikolaevich@<500). Both correctly route to T3 PATTERN-STUDY or T4 CITE-ONLY — NEITHER auto-REJECT. The soft-gate principle (low absolute scores route DOWN, not REJECT) held end-to-end. Required affirmative evidence (D10≤2 AND no-pattern-improvement, D7≤1, D15≤1, adversarial-BLOCK) was absent in both cases.

2. **v3 sources_typed_disagreement[] surfaced + worked correctly**: Stream B (W290 F3) mis-attributed the hashline-edit MCP to `levnikolaevich`; deepwiki Stage-2 probe revealed the real owner is `Submersible/mcp-hashline-edit-server`. v3's mid-pipeline correction mechanism (W288 R3 EXCEPT) caught the error. Real audit target now queued; original candidate downgraded to T4 with explicit disagreement-trail.

3. **PromptWizard is the standout T2 candidate**: install_score 3.73 + pattern_score 4.44 — first non-Stream-B-top-4 candidate to surface measured-benchmark deltas with reproducible methodology (+15% rel on GSM8k vs DSPy; -84% API calls). Pattern_score > install_score → vendor-fork path is correct (extract Critique-N-Refine algorithm; preserve MIT). Operator-action: collect ≥1 named-org practitioner report before any T2→T1 escalation.

4. **daymade meta-skill flags two reusable patterns for sca-v3.1**: `.security-scan-passed` SHA-256-anchored marker + `security_scan.py` 5-class scanner (secrets/PII/unsafe-code/absolute-paths/insecure-HTTP). These map directly onto W292-R6 (OpenSSF Scorecard sub-dims for D15) — i.e., this PATTERN-STUDY candidate produces concrete W293 implementation deliverables.

5. **Aggregator-class candidates correctly route to T4 by exhaustion, not REJECT**: rohitg00's mega-toolkit has D10=2 borderline (heavy duplication with installed wshobson/agents) BUT `skills-janitor` IS a pattern improvement, so the W289-fix7 D10 conjunctive rule blocks auto-REJECT. Pattern_score 3.03 < 3.5 floor + D2=3 < 4 → no T3 path; D6=2 < 4 → no T4-by-authority lift; lands at T4 by exhaustion. The skills-janitor sub-component is the real adoption target — queued for separate audit. This validates the v3 design that pure-aggregators-without-novel-primitives belong at T4.

---

## Artefact-trail

- Output: `Z:/claude-sota-installed/docs/architecture/W291-STAGE2-PIPELINE-RUNS/BATCH-2-TOP4.md` (this file)
- Probes: 4 × `mcp__deepwiki__ask_question` (PromptWizard, daymade, levnikolaevich, rohitg00) — all cited inline per W292 R7
- Companion: `W290-QUALITY-AND-SOTA-WAVE/PIPELINE-RUN-rank-01-05.md` + `PIPELINE-RUN-rank-06-10.md` (batch-1 from W290)
- Follow-up audits queued: `Submersible/mcp-hashline-edit-server` (real hashline-edit owner) + `skills-janitor` sub-plugin (within rohitg00 aggregator)
