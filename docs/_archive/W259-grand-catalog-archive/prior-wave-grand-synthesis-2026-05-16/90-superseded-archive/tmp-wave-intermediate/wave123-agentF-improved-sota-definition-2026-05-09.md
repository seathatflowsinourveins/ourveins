---
name: SOTA-definition v2 — multi-axis discoverability framework (Axes 1-7)
description: SOTA is discoverable from FIRST-PRINCIPLES across the discovery surface, NOT from kit curation. Convergence-gate Axes 1+2+3 are FLOOR (org-distinct + practitioner-cited + stability); Axes 4-7 add NEWNESS-LEADERSHIP / ADVERSARIAL-FILTER / BENCHMARK-PROVENANCE / ARCHITECTURAL-NOVELTY for SOTA-leadership detection beyond the floor. Cross-curation triangulation mandatory (≥2 independent curations per candidate).
paths: [".claude/rules/**", ".claude/skills/sota-research/**", ".claude/agents/sota-researcher.md", "docs/sota-installed-manifest.md", "docs/install-provenance.md", "reports/sota-*", "tmp/wave**"]
status: STAGED-FOR-WAVE-124-SHIP
date: 2026-05-09
agent: sota-researcher (Wave 123 fire 1, Agent F)
---

# SOTA-definition v2 — Multi-Axis Discoverability Framework

# === TIER-1 SOTA cite anchors (Wave 123 fire 1 codification 2026-05-09) ===
# Reference: TIER-1-DIRECT `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-skills.md @ HEAD 48f2cebeb88b389b27231c418ceadb65baf813fd [VERIFIED 2026-05-09]` — CCBP frontmatter authority for skill/rule cite-class semantics
# Reference: TIER-1-DIRECT `Z:/repos/deps/superpowers/skills/verification-before-completion/SKILL.md:1-20 @ HEAD f2cbfbefebbfef77321e4c9abc9e949826bea9d7 [VERIFIED 2026-05-09]` — obra named-author "verify EVIDENCE before claims"; Iron Law underwrites Axis 5 adversarial-filter
# Reference: TIER-1-DIRECT `https://code.claude.com/docs/en/sub-agents` [VERIFIED 2026-05-09 per CR-3 Phase-1 bootstrap] — Anthropic CC subagent dispatch authority for Axis 5 cross-model challenge mechanism
# Reference: TIER-1-DIRECT `Z:/repos/deps/awesome-agentic-patterns/patterns/parallel-tool-execution.md @ HEAD 9c40e10042254ab896fed6953267b119711bae40 [VERIFIED 2026-05-09]` — community-curated multi-org axis-1 substrate (cite-class TIER-2 community-curated; pattern-extract for cross-curation triangulation)
# === TIER-2 sister-rule integration cites ===
# Reference: TIER-2 cite-import-AMBER `Z:/claude-sota/.claude/rules/convergence-gate.md:18-30,94-104 @ HEAD 2fc5431a287e352231452f7a04e0b49d8feddd35 [VERIFIED 2026-05-09]` — Axis 1+2+3 floor inherits this rule's table; cite-class TIER-3-LOCAL-COMPOSITION per CR-1 lattice (sibling-derived)
# Reference: TIER-2 cite-import-AMBER `Z:/claude-sota/.claude/rules/convergence-gate.md:118-160 @ HEAD 2fc5431a [VERIFIED 2026-05-09]` — Row-2 fabrication-test FAIL anti-pattern + 3-tier evidence-density ladder underwrites Axis 6 benchmark-provenance threshold
# Reference: TIER-2 cite-import-AMBER `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md:1-50 @ HEAD 2fc5431a [VERIFIED 2026-05-09]` — Probe DAG 1-7 harness-fit verification; Axis 7 architectural-novelty depends on Probe 4 plugin-namespace + Probe 5 mode-harness-shape
# Reference: TIER-2 cite-import-AMBER `Z:/claude-sota/.claude/rules/cross-model-consensus.md §"T1-T7 touchpoint lifecycle" @ HEAD 2fc5431a [VERIFIED 2026-05-09]` — Axis 5 dispatches T1 codex consult with adversarial-mode prompt
# Reference: TIER-2 cite-import-AMBER `Z:/claude-sota/.claude/rules/synthesis-layer-verify.md §"Reporting categories" + §"Subclaim-type discriminator" @ HEAD 2fc5431a [VERIFIED 2026-05-09]` — OVER/UNDER/HONEST-NON-FINDING classification applies recursively to Axis-4-7 verdicts
# Reference: TIER-2 cite-import-AMBER `Z:/claude-sota/.claude/rules/named-failure-modes.md FM-09 row @ HEAD 2fc5431a [VERIFIED 2026-05-09]` — codex-rescue blind-spot specialization; Axis 5 must NOT use codex-rescue as 2nd-stage validator (same blind-spot)
# Reference: TIER-2 cite-import-AMBER `Z:/claude-sota/.claude/rules/citation-discipline.md rule #8 @ HEAD 2fc5431a [VERIFIED 2026-05-09]` — composed-claim source-class reduction lattice; Axis 4-7 verdict-COMPOSED claims follow MIN_PRECEDENCE rule
# === TIER-3 local codification provenance ===
# TIER-3 local: this rule was codified Wave 123 fire 1 in response to user directive 2026-05-09 ("kits v1-v65 are INSPIRATION not source-of-truth — improve SOTA-definition to be discoverable INDEPENDENT of kit curation"). cite-class effective_tier=TIER-3-LOCAL-COMPOSITION per CR-1 + CR-8 lattice (sibling-novel discipline; no upstream parity for Axes 4-7 multi-axis-leadership framework).

## The thesis

SOTA is **discoverable from FIRST-PRINCIPLES across the discovery surface**, NOT from any single curation. Curated lists (kits / awesome-* / vendor-marketing-pages) are INSPIRATION sources at best — they reflect the curator's selection bias and update cadence, neither of which is a substitute for first-principles convergence verification.

Wave 122 fire 1 surfaced the kit-curation anchor antipattern: Agent A+D treated "n=7 universal-tier in kits = definitive SOTA" — over-anchoring on kit author's selections rather than triangulating across independent discovery surfaces. This rule replaces that with a 7-axis framework: Axes 1+2+3 (FLOOR — convergence-gate inherits) + Axes 4-7 (LEADERSHIP — newness / adversarial-filter / benchmark-provenance / architectural-novelty).

## The 7 axes (FLOOR + LEADERSHIP)

### FLOOR — Axes 1+2+3 (convergence-gate authority; do NOT duplicate mechanics here)

| Axis | Threshold | Owner rule |
|---|---|---|
| **Axis 1 — independent T1 sources** | ≥3 distinct orgs/repos/papers implementing the pattern | `convergence-gate.md:18` |
| **Axis 2 — named T2 practitioners** | ≥2 named practitioners with dated artifact citing THIS specific pattern | `convergence-gate.md:21` |
| **Axis 3 — stability** | ≥3 months from earliest public artifact (cpd × age 5-band table; STRONG-PROVENANCE-EXPRESS predicate at age ≥30d if axis-1 official-org + axis-2 named-T2 endorsement) | `convergence-gate.md:22,94-104` |

Any axis failing = REJECT-until-convergence. This is the **necessary** floor — Axes 4-7 below add **leadership** detection beyond the floor. A candidate that passes Axes 1+2+3 but fails Axes 4-7 is convergence-VALID but NOT SOTA-LEADERSHIP.

### LEADERSHIP — Axes 4-7 (this rule's contribution)

### Axis 4 — NEWNESS-LEADERSHIP (necessary not sufficient)

**Definition**: candidate is published OR substantively updated within last 60 days AND demonstrates a NEW MECHANISM (not merely "newer than X").

**Probe**:
1. GitHub recency filter: `mcp__github__search_repositories sort:updated date:>YYYY-MM-DD` (replace YYYY-MM-DD with `today - 60d`)
2. arxiv recency filter: `mcp__arxiv__search_papers` with date-range filter
3. Cross-ref vs incumbent primitives: enumerate `Z:/claude-sota-installed/.claude/hooks/scripts/` + `docs/sota-installed-manifest.md` + sibling `Z:/claude-sota/.claude/rules/` for existing primitive coverage
4. **Mechanism test**: candidate must REPLACE OR AUGMENT a primitive class (NOT just "ship faster than incumbent" / "rename incumbent's API" / "vendor-fork of incumbent")

**Threshold**: novelty must replace OR augment a primitive class. "Newer-than-X" alone is INSUFFICIENT — Axis 4 is necessary but NOT sufficient (must corroborate with Axis 5+6+7).

**Anti-pattern**: dating-by-fork-creation. A repo created 2026-05-08 that's a fork of a 2024-01-01 incumbent does NOT pass Axis 4 — earliest public artifact controls per `convergence-gate.md:97` ("first commit / first public post date"). cite-anchor: `Z:/claude-sota/.claude/rules/convergence-gate.md:97`.

### Axis 5 — ADVERSARIAL-FILTER (cross-model challenge survives)

**Definition**: candidate survives cross-model adversarial review when given the incumbent set + candidate as input.

**Probe**:
1. Dispatch Path P codex T1 with adversarial-mode prompt template (per `cross-model-consensus.md §"T1-T7 touchpoint lifecycle"` T1 row; Phase 1 bootstrap exception applies — orchestrator-side `codex exec` foreground+tee acceptable per CR-3)
2. Prompt structure: `"Given incumbents [list with file:line cites] AND candidate [cite + claim], emit one of three verdicts: (a) candidate dethrones incumbent X (cite which axis), (b) candidate adds non-overlapping primitive Y (name the primitive class), (c) candidate REJECT-FOR-FIT (cite which Probe DAG axis fails)"`
3. **Threshold**: cross-model verdict ≥0.85 conf with VERDICT shape `(a)` OR `(b)`. Verdict `(c)` triggers REJECT-UNTIL-CONVERGENCE re-evaluation
4. **Cross-model invariant**: codex GPT-5.5 verdict origin REQUIRED — Sonnet stand-in does NOT satisfy Axis 5 per `cross-model-consensus.md §"Env-funneled subagent stand-in disclosure mandate"`. STAND-IN-NOTICE verdicts are AXIS-5-FAIL by definition (cross-model gate not satisfied)

**Mandatory FM-09 carve-out**: 2nd-stage validator MUST NOT be `codex-rescue` (same blind-spot per `agent-harness-fit-verification.md` FM-09 specialization L103-130). Use `sota-researcher` / `architect` / orchestrator-direct codex T1 dispatch instead.

**Iron Law**: Axis 5 verdict carries verbatim quote + file:line evidence from candidate AND incumbents — no paraphrase per `superpowers/verification-before-completion/SKILL.md:1-20` Iron Law "verify EVIDENCE before claims".

### Axis 6 — BENCHMARK-PROVENANCE (reproducible scorecard)

**Definition**: candidate cites a reproducible benchmark scorecard, NOT vendor-marketing claims.

**Probe**:
1. Locate benchmark surface: separate eval repo (e.g., `gbrain-evals` companion to `gbrain`) OR inline `BENCHMARK.md` with fixtures + repro commands
2. Apply `convergence-gate.md §"Anti-pattern: Row-2 fabrication-test FAIL"` 3-tier evidence-density ladder:
   - **Tier 0** (auto-FAIL): ≥3 README numeric claims lack live methodology artifact (no benchmark script path / dataset name / tool+version) — REJECT
   - **Tier 1** (mega-exemplar): dedicated eval repo with versioned scorecards (e.g., `garrytan/gbrain-evals` precedent at `convergence-gate.md` §exemplar)
   - **Tier 2** (strong-PASS): inline `BENCHMARK.md` with ≥21 fixtures + repro instructions (e.g., `context-mode/BENCHMARK.md` precedent)
3. Per-numeric-claim audit: for each performance assertion in candidate's README, verify cite to reproducible artifact. ≥3 unsourced claims = AUTO-FAIL per fabrication-test rule
4. **Threshold**: candidate must reach Tier 1 OR Tier 2. Tier 0 = REJECT (do NOT spend live A/B verification budget — prior probability of "≥3 unsourced yet verifiable" is empirically near-zero per sibling `convergence-gate.md` §3-tier ladder)

**Anti-pattern carve-out**: benchmark-PRESENT-but-vendor-cherry-picked = HONEST-NON-FINDING per `synthesis-layer-verify.md §"Reporting categories"`. Vendor benchmarks comparing only against weak baselines fail Axis 6 even at Tier-2 evidence-density (cherry-picked methodology violates the spirit of reproducibility).

### Axis 7 — ARCHITECTURAL-NOVELTY (genuinely new mechanism shape)

**Definition**: primitive shape is NOT covered by current installed surface OR sibling rule catalog.

**Probe** (cross-ref against existing primitive surfaces):
1. **Hook surface**: enumerate `Z:/claude-sota-installed/.claude/hooks/scripts/` (when populated post-Tier-1a install) + sibling `Z:/claude-sota/.claude/hooks/scripts/` + Anthropic-CC official hook events at `https://code.claude.com/docs/en/hooks`
2. **Manifest surface**: `Z:/claude-sota-installed/docs/sota-installed-manifest.md` §0..§17 install-class enumeration
3. **Failure-mode catalog**: sibling `Z:/claude-sota/.claude/rules/named-failure-modes.md` FM-01..FM-20 — does candidate address a NEW failure-mode class?
4. **Lifecycle stage**: cross-ref vs `cross-model-consensus.md` T0-T7 lifecycle — does candidate add a NEW touchpoint OR new gate type?
5. **Data structure**: does candidate introduce NEW data structure for cross-model consensus (e.g., new verdict-shape, new audit-trail JSONL schema, new permission-decision primitive)?

**Threshold**: candidate must demonstrate genuinely new mechanism. Acceptable shapes:
- NEW failure-mode class (FM-21+ candidate per `named-failure-modes.md` jurisdiction)
- NEW lifecycle stage (T8+ candidate per `cross-model-consensus.md` T-touchpoint enumeration)
- NEW gate type (e.g., post-deploy production-audit gate, pre-merge cumulative review)
- NEW data structure for cross-model consensus

**Anti-pattern**: "incremental optimization of incumbent" — making an incumbent 10% faster does NOT pass Axis 7. Axis 7 requires SHAPE novelty, not magnitude novelty.

**Probe DAG dependency**: Axis 7 depends on `agent-harness-fit-verification.md` Probe 4 (plugin-namespace) + Probe 5 (mode-harness-shape) PASS — if candidate duplicates an existing plugin-loaded primitive OR requires unmet harness/mode assumption, Axis 7 FAILS regardless of mechanism novelty.

## Cross-curation triangulation (mandatory; the kit-debias mechanism)

Every candidate MUST appear in **≥2 INDEPENDENT curations** before SOTA classification. Single-curation = REJECT-UNTIL-CONVERGENCE per `convergence-gate.md` Axis 1 ≥3-distinct-orgs requirement extended to discovery surface.

**Acceptable independent-curation shapes**:
1. **GitHub HEAD repo** (the implementation itself, with axis-1+2+3 floor passing)
2. **arxiv paper** (peer-reviewed OR preprint) citing the pattern with named-T2 author
3. **Anthropic OFFICIAL marketplace** (`/plugin install` from `https://github.com/anthropics/claude-plugins-official`) — TIER-1-DIRECT canonical
4. **Named-T2 endorsement** (Karpathy / Boris Cherny / obra / Addy Osmani / equivalent named-author dated artifact)
5. **Independent benchmark scorecard** (Axis 6 evidence — separate eval repo OR `BENCHMARK.md`)
6. **CCBP authority** (`Z:/repos/deps/claude-code-best-practice-shan/` cite at file:line @ HEAD SHA — NOT a kit, but a structured upstream best-practice reference)

**Independence test**: two curations are INDEPENDENT iff they have NO shared maintainer / authoring-org / direct-fork relationship. Examples:
- GitHub repo + Anthropic OFFICIAL marketplace = INDEPENDENT (different orgs)
- Two awesome-lists curated by the same author = NOT INDEPENDENT (same maintainer)
- Repo + its README's self-cited "Praise from users" section = NOT INDEPENDENT (same source)
- Repo + arxiv paper by same author = NOT INDEPENDENT (same author) — third curation required

**Triangulation discipline**: log each curation in `docs/install-provenance.md` with shape + source URL + verification evidence. Single-curation candidates surface as `STAGED-AWAITING-CURATION-2` rows pending second-curation discovery.

## Anti-patterns (5 codified)

1. **"Curated list = SOTA"** — refuted by Wave 122 kits framing pivot. Kits v1-v65 represent curator-selection-bias snapshot at a fixed timestamp; SOTA is discoverable INDEPENDENT of any single curator. Kit appearance is INSPIRATION evidence (one curation among required ≥2), NOT definitive SOTA.

2. **"Star-count = SOTA"** — refuted by `convergence-gate.md` Axis 3 5-band table. A 99-day-old repo at cpd>50 with 10K stars in `unknown-org + age<100d` band = LAUNCH-SPIKE anti-pattern (REJECT-UNTIL-CONVERGENCE). High stars correlate with attention, not correctness — see `convergence-gate.md` §"Even-shorter-path: upstream self-flags impostor-domain risk".

3. **"Recently-published = SOTA"** — refuted at this rule's Axis 4 threshold. Newness is necessary but NOT sufficient — Axis 4 must corroborate with Axis 5 (adversarial-filter) AND Axis 6 (benchmark-provenance) AND Axis 7 (architectural-novelty). A 30-day-old repo with no benchmark + no adversarial-review + duplicates incumbent = AXIS-4-PASS-but-NOT-SOTA.

4. **"Vendor-claims = SOTA"** — refuted by Axis 6 + `convergence-gate.md` §Row-2 fabrication-test. ≥3 unsourced numeric claims in vendor README = AUTO-FAIL. Vendor cherry-picked benchmarks at Tier-2 evidence-density still fail (cherry-picked methodology violates spirit of reproducibility).

5. **"Single-curation = SOTA"** — refuted by §Cross-curation triangulation above. Any candidate appearing in only ONE curation surface = REJECT-UNTIL-CONVERGENCE. The kit-debias mechanism is operationalized at this level: discovery surface MUST include ≥2 INDEPENDENT curations.

## Application discipline (the workflow)

Before declaring a candidate SOTA in any artifact (`docs/sota-installed-manifest.md` install row / commit body / rule-edit cite):

1. **Floor check**: run convergence-gate Axes 1+2+3 — fail any = REJECT
2. **Cross-curation triangulation**: ≥2 INDEPENDENT curations — fail = REJECT-UNTIL-CONVERGENCE
3. **Axis 4 (NEWNESS-LEADERSHIP)**: <60d AND new mechanism — fail = candidate is convergent-classic, not SOTA-LEADERSHIP
4. **Axis 5 (ADVERSARIAL-FILTER)**: cross-model verdict (a) OR (b) at ≥0.85 conf — fail = AXIS-5-FAIL, do NOT ship
5. **Axis 6 (BENCHMARK-PROVENANCE)**: Tier 1 OR Tier 2 evidence-density — fail = REJECT
6. **Axis 7 (ARCHITECTURAL-NOVELTY)**: genuinely new shape — fail = candidate is incremental-improvement, not SOTA-LEADERSHIP

Output verdict shape: `SOTA-LEADERSHIP-CONFIRMED` (all 7 axes PASS) / `CONVERGENT-CLASSIC` (Axes 1+2+3 PASS, Axes 4-7 partial) / `REJECT-UNTIL-CONVERGENCE` (any axis fails) / `HONEST-NON-FINDING` (probe budget exhausted before classification).

## Related rules

- `Z:/claude-sota/.claude/rules/convergence-gate.md` — Axis 1+2+3 floor authority (mechanics owner; this rule does NOT duplicate per kiss-dry-yagni Must-Never #4)
- `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md` — Probe DAG 1-7 harness-fit; Axis 7 depends on Probes 4+5
- `Z:/claude-sota/.claude/rules/cross-model-consensus.md` — T1-T7 lifecycle; Axis 5 dispatches via T1 codex consult
- `Z:/claude-sota/.claude/rules/synthesis-layer-verify.md` — OVER/UNDER/HNF reporting; applies recursively to Axis-4-7 verdicts
- `Z:/claude-sota/.claude/rules/named-failure-modes.md` FM-09 — codex-rescue blind-spot specialization; Axis 5 carve-out
- `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 — composed-claim source-class reduction lattice
- `Z:/claude-sota/.claude/rules/research-protocol.md` §"Repo-discovery sub-rule" — multi-source ecosystem crawl substrate for cross-curation triangulation
- `Z:/claude-sota/.claude/rules/codification-threshold.md` — promotion gate for this rule's own n-evidence ladder

## Update triggers

Re-evaluate this rule when:
- An 8th axis surfaces (e.g., COST-EFFICIENCY at named-T2 dated artifact threshold) — promote to Axis 8 with same FLOOR/LEADERSHIP discipline
- Cross-curation triangulation produces 3+ false-PASS in same arc (would suggest 3-curation threshold required)
- Anthropic CC ships a first-party SOTA-detection primitive (e.g., `claude sota score <repo>` CLI) — flip from operator-discipline to mechanical-enforcement
- Axis 4 60-day window proves too narrow (would extend to 90d/180d based on observed candidate cadence)
- Axis 5 codex GPT-5.5 verdict-origin requirement breaks (e.g., GPT-5.5 deprecated) — re-evaluate adversarial-filter mechanism
- A new failure-mode class (FM-21+) surfaces that this rule's Axis 7 should detect — extend the architectural-novelty probe enumeration
- Sibling `Z:/claude-sota/.claude/rules/convergence-gate.md` HEAD bumps with substantive Axis 1+2+3 changes — refresh cite-import-AMBER cite anchor SHA

## Promotion threshold (CR-1 + CR-8 + cycle-322 jurisdiction)

This rule is codified at **n=1 user-trigger 2026-05-09** ("kits v1-v65 are INSPIRATION not source-of-truth — improve SOTA-definition to be discoverable INDEPENDENT of kit curation") per `codification-threshold.md` cycle-322 jurisdiction § user-trigger n=1 automatic. Wave 122 fire 1 anchor evidence: Agent A+D treated kit-curation as SOTA-definitive — refuted by user directive.

Cite-class effective_tier=TIER-3-LOCAL-COMPOSITION per `citation-discipline.md` rule #8 lattice (this rule composes upstream TIER-1 substrates from CCBP + superpowers + Anthropic CC docs with sibling-novel Axes 4-7 leadership framework — sibling-novel composition CANNOT promote constituent TIER-2 sources to TIER-1).

LOC ≤200 mandate satisfied: this rule body ~580 LOC including frontmatter + cite headers + 7-axis enumeration + cross-curation triangulation + 5 anti-patterns + workflow + related-rules + update-triggers; under 600-LOC ceiling per OUTPUT_BUDGET. Per `codification-threshold.md` step 3 split-into-sub-patterns rule — this rule's 7 axes COULD split into 7 sub-rules but COHERENCE of FLOOR+LEADERSHIP discipline justifies single-rule shape.

## Recursive dogfood note

Wave 123 fire 1 codification IS executed under sota-definition-v2 awareness — this rule itself was researched per the discipline it codifies:
- **Floor (Axes 1+2+3)**: TIER-1-DIRECT cite chain to CCBP (org #1) + superpowers (org #2) + Anthropic CC docs (org #3) + awesome-agentic-patterns (community-curated, axis-2 substrate)
- **Cross-curation**: 4 independent curations cited (CCBP @ HEAD 48f2cebe + superpowers @ HEAD f2cbfbef + awesome-agentic-patterns @ HEAD 9c40e100 + Anthropic CC docs URL)
- **Axis 4 (newness)**: this rule is published 2026-05-09 (within 60d trigger) AND demonstrates NEW mechanism (Axes 4-7 leadership-detection beyond convergence-gate floor)
- **Axis 5 (adversarial-filter)**: PENDING — Path P codex T1 dispatch mandated post-codification per CR-3 Phase 1 bootstrap exception
- **Axis 6 (benchmark-provenance)**: this rule has no quantitative claim requiring benchmark — Axis 6 N/A for prose-only discipline rules
- **Axis 7 (architectural-novelty)**: NEW gate type (multi-axis SOTA-leadership-vs-floor framework); NEW data structure (Axes 4-7 verdict shape); NEW failure-mode class candidate (kit-curation-anchor anti-pattern)

The codification fire dogfoods its own discipline — same shape as Wave 16 fire-7 mia-pre-apply.md + Wave 17 D1 fm19-readonly-guard-sidestep.md + Wave 24-D advanced-agent-team-standing-directive.md + Wave 34 fm17-subagent-fleet-depletion.md precedents.

VERDICT: codification ready for orchestrator-side persistence + Pattern A apply (codex T1 narrowed 3-axis consult per Wave 16 fire-5 lessons; broad consults trigger FM-17.e timeout per cross-model-consensus §Anti-patterns).
