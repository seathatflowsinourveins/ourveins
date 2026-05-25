# 04 — Roadmap Fire-by-Fire (post-Fire-28; Wave 134 Fire 29-40+ candidates)

> **Trigger**: User clarification 2026-05-10 — research-architecture is INSPIRATION-grounded methodology improvement, NOT just install-list execution
> **Cite class**: TIER-3-LOCAL-COMPOSITION per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8
> **Authority sources**: 03-research-architecture-improvement.md TIER-1 IMP-A-G ranking + 02-gap-matrix.md INSTALL-NOW/LATER classification
> **🚨 Pattern A apply 2026-05-10 mid-Fire-28**: codex T1 NEEDS-REVISION conf=0.89 + 8 prescribed_edits applied to 03-research-architecture-improvement.md. THIS FILE IS SUPERSEDED by the §"Recommended Fire 29-35 sequence" table in 03-research-architecture-improvement.md (which now has corrected dependencies + sub-fire splits + 3 new IMP candidates IMP-K + IMP-L + IMP-M). See 03 for the canonical roadmap. Sections below are PRELIMINARY draft retained for cross-reference only.

## Sequencing principles

1. **Methodology BEFORE tool-bulk**: TIER-1 IMP rankings prioritized over INSTALL-NOW gap-matrix items (per user clarification "improve your researchect itself")
2. **Per cycle-300 ONE-LOGICAL-UNIT-PER-FIRE**: each Fire = 1 codification ship + atomic commit; multi-component fires split unless inseparable
3. **Per CR-3 cross-model**: every architectural fire submitted to codex T1 review
4. **Per CR-9 install-risk**: install-class fires budget 2-round fix-forward; first-round APPROVE is exception
5. **Per CR-12 5-class lattice**: install candidates explicitly classified BEFORE adoption
6. **Per Forward Discipline #2**: codification fires use TIGHT codex T1 prompts (60-180s budget; TEXT only; no historical exploration)
7. **Per cycle-322 jurisdiction**: n=3 self-observed pattern promotes feedback→rule

## Forward Discipline #2 cycle-322 promotion gate

| Dogfood | Fire | Outcome |
|---|---|---|
| n=1 | Fire 27-E | NEEDS-REVISION conf=0.91 + Pattern A 6-edit |
| n=2 | Fire 27-F | APPROVE conf=0.91 round 1 (empty prescribed_edits) |
| n=3 | **Fire 28 (THIS FIRE)** | **Codex T1 review of 03-research-architecture-improvement.md in flight** → if APPROVE/NEEDS-REVISION terminal JSON, n=3 PROMOTION ACHIEVED |

If Fire 28 codex T1 produces terminal JSON within budget (regardless of APPROVE vs NEEDS-REVISION), Forward Discipline #2 reaches cycle-322 n=3 promotion threshold and becomes eligible for formal codification as a sister rule.

## Fire 29 — IMP-A: Multi-source discovery breadth codification

**Subject**: Add D11 multi-source discovery breadth to sota-research-architecture.md OR §"Discovery breadth sub-rule" to research-protocol.md
**Effort**: ~1 fire
**Deliverables**:
- Sister-rule edit (research-protocol.md OR sota-research-architecture.md)
- Codex T1 review per CR-3
- Atomic commit per FM-02 sub-class (b)

**Specific rule text**:
> "Discovery breadth gate: any SOTA-research fire MUST query ≥4 distinct sources from: GitHub MCP / OSSInsight HTTP / Star History HTML / deps.dev API / Brave Search / Exa / Firecrawl / Perplexity / arXiv / Semantic Scholar / Papers With Code / DeepWiki Directory. Single-source convergence is FRAGILE per `convergence-gate.md` Axis 1 ≥3-distinct-orgs requirement. Score discovery breadth in SRA verdict; <4 sources = DOWNGRADE-WITH-DISCLOSURE."

**Risk**: Low (sister-rule edit; no install dependency)

## Fire 30 — IMP-B: Weighted rubric formal codification

**Subject**: Create `docs/rubric.md` with quantitative weighted formula; sota-research-architecture.md adds §"Quantitative rubric" reference
**Effort**: ~1 fire
**Deliverables**:
- `docs/rubric.md` with S25/M20/C25/Co15/L10/P5 + computation formulas (per user-doc Part 5 template adapted to eee D1-D10)
- sota-research-architecture.md §"Quantitative rubric" reference + sister-rule integration
- sota-researcher agent initialPrompt mention of rubric.md

**Risk**: Medium (rubric weights must align with SRA D1-D10 — careful mapping needed)

## Fire 31a/b — IMP-C: log4brains install + ADR template codification

**Subject**: Install log4brains via official-native-channel (`npm i -g log4brains`); create `docs/adr/` folder; codify ADR template
**Effort**: ~2 fires (split)

### Fire 31a — Install log4brains + initial smoke probe
- `npm i -g log4brains` install via CR-6
- `log4brains init` in claude-sota-installed
- Verify static-site hot-reload works (`log4brains preview`)
- Update manifest §17 with INSTALLED entry

### Fire 31b — ADR template codification + first dogfood ADR
- Create `docs/adr-template.md` adapted from user-doc Part 5
- Create `docs/adr/0001-adopt-log4brains-as-adr-tool.md` as first dogfood ADR (self-referential)
- Update install-provenance.md with ADR cross-reference convention
- Document install-provenance.md (chronological log) vs ADR (decision-permanent) discipline split

**Risk**: Low (npm-install + doc-template; CR-9 alternate-channel probe per Wave 112 Ship 2CC)

## Fire 32a/b/c — IMP-D: skill-creator install + A/B harness codification

**Subject**: Install skill-creator plugin; codify project-task-prompt harness + A/B comparison workflow
**Effort**: ~3 fires (split per cycle-300)

### Fire 32a — skill-creator install
- `/plugin install skill-creator@claude-plugins-official`
- Verify plugin loaded
- Update manifest §3 with INSTALLED entry

### Fire 32b — Project-task-prompt harness codification
- Create `evals/component_comparison_tasks.jsonl` — 5-10 project-derived task prompts
- Codify pattern: each task = {input prompt, expected_output_shape, scoring_rubric}
- Reference cross-model-consensus.md §Eval-case mandate Phase 1 integration

### Fire 32c — First dogfood A/B
- Run skill-creator eval against `evals/component_comparison_tasks.jsonl`
- Test on a real component-selection decision (e.g., L8 observability backend choice Langfuse vs Phoenix vs SigNoz)
- Document Executor → Grader → Comparator → Analyzer outcomes

**Risk**: Medium (skill-creator is plugin-based; A/B comparison patterns need adaptation to claude-sota workflow)

## Fire 33a/b — Fresh SOTA discovery (BEYOND user-doc list)

**Subject**: Multi-source discovery dispatch + Probe DAG audit on fresh-discovery candidates
**Effort**: ~2 fires

### Fire 33a — Discovery sweep
- Apply IMP-A discovery breadth gate (≥4 sources)
- Query: anthropics/claude-agent-sdk-python @ HEAD bump / eyaltoledano/claude-task-master / NEW Anthropic CC plugin marketplace listings post-2026-05-01 / arXiv cs.AI + stat.ML last 14 days
- Compile candidate list with surface signals + Snyk/OSV/Scorecard if applicable

### Fire 33b — Top-3 deep-dive
- Pick top-3 from Fire 33a discovery
- Probe DAG 1-7 per agent-harness-fit-verification.md
- CR-12 5-class disposition
- INSTALL-NOW vs CITE-ADAPT vs DEFER per Fire 28 gap-matrix protocol

**Risk**: Medium (FM-09 codex-rescue blind-spot — second-stage harness-fit verifier required; FM-17.f 1M-context blocker if BRIDGE-MODE used)

## Fire 34 — IMP-E: Failure-mode comprehensive cross-reference + plan-attestation codification

**Subject**: Cross-reference named-failure-modes.md to user-doc 12 FMs; codify SHA-256 plan-attestation discipline
**Effort**: ~1 fire

**Deliverables**:
- named-failure-modes.md §"User-doc FM cross-reference" table mapping user-doc FMs to eee FM-N entries
- New rule `Z:/claude-sota/.claude/rules/plan-attestation-discipline.md` codifying SHA-256 plan-attestation via planning-with-files hooks (if planning-with-files installed in Fire 28 follow-up)

**Risk**: Low (sister-rule edit + new-rule creation; no install dependency)

## Fire 35 — IMP-F: `.claudeignore` hardening + secret-pattern audit

**Subject**: Create `.claudeignore` with user-doc failure-mode #11 patterns; audit safety_guard.py + secret_scan_guard.py for coverage gap
**Effort**: ~1 fire

**Deliverables**:
- `.claudeignore` at workspace root with `.env*` + `*.pem` + `id_rsa*` + `.aws/` + `.ssh/` patterns
- Audit hook scripts for secret-pattern coverage parity
- Sister-rule edit if coverage gap surfaces

**Risk**: Low (file creation + hook audit; CR-9 sibling-bleed defense — no sibling content)

## Fire 36 — IMP-G: Sigstore maintainer-credibility codification

**Subject**: Add SRA D4 sub-clause for Sigstore-verified release attestations; optionally install cosign CLI
**Effort**: ~1 fire

**Deliverables**:
- sota-research-architecture.md D4 sub-clause edit
- Optional: `gh release download --repo sigstore/cosign` install via CR-6
- Manifest update if cosign installed

**Risk**: Low (sister-rule edit + optional install)

## Fire 37+ — Forward Discipline #2 cycle-322 promotion (if Fire 28 codex T1 completes terminal JSON)

**Subject**: Promote Forward Discipline #1+#2 from `docs/codex-t1-pattern-b-forward-discipline.md` to formal sister rule `Z:/claude-sota/.claude/rules/codex-t1-pattern-b-forward-discipline.md` per cycle-322 n=3 self-observed promotion threshold
**Effort**: ~1 fire

**Triggers**: Fire 28 codex T1 produces terminal JSON (regardless of APPROVE/NEEDS-REVISION) — that's the 3rd dogfood (n=3) post Fire 27-E (n=1) + Fire 27-F (n=2)

**Deliverables**:
- New rule file `Z:/claude-sota/.claude/rules/codex-t1-pattern-b-forward-discipline.md`
- Update CLAUDE.md cardinal-rule-X cross-reference if appropriate
- Codex T1 review of new rule (which itself is a Forward Discipline #2 dogfood — recursive)

**Risk**: Low (codification ship; methodology already validated)

## Fire 38+ — Forward Top-5 from Fire 27-F (carryover candidates)

| Fire | Subject |
|---|---|
| 38 | W134-F26-A-PILOT — Cisco mcp-scanner Phase 1-4 pilot execution |
| 39 | W134-F24-C3 — Task Master Selective MCP Tool-Loading extract |
| 40 | W134-F27-A-PATTERN-EXTRACT — Update team-orchestration.md w/ 9 file:line refs |
| 41 | W134-F27-B-C-PATTERN-EXTRACT — Pregel/Channels/Checkpoint + Lifecycle Hook patterns |

## Quarterly recursion (per user-doc Caveat: architecture evaluates itself)

**Subject**: Re-run L3-L5 evaluation on every architecture component every quarter
**Cadence**: 2026-08-10 (Q3 review) / 2026-11-10 (Q4 review) / 2027-02-10 (Q1 review)
**Deliverables**:
- Re-probe each installed primitive: still maintained? still SOTA? alternatives that emerged?
- Refresh `docs/install-provenance.md` with quarter-end snapshot
- Generate new ADRs for any replacements
- Bump version-pins per CR-9 install-risk discipline

## Sub-arc tracking summary

| Sub-arc | Fires | Outcome |
|---|---|---|
| TIER-1 methodology improvements | Fire 29-32 | 4 IMPs codified |
| Fresh SOTA discovery | Fire 33a/b | 2-fire dispatch + top-3 deep-dive |
| TIER-2 medium-leverage | Fire 34-36 | 3 IMPs codified |
| Forward Discipline cycle-322 promotion | Fire 37 | Formal rule promotion (if n=3 satisfied) |
| Carryover Forward Top-5 | Fire 38-41 | Wave 134 series closures |
| Quarterly recursion | 2026-08-10+ | Q3/Q4/Q1 architecture re-audits |

## Discipline conformance per fire

ALL Fire 29-37+ atomic commits MUST:
- Apply CR-3 cross-model gate (codex T1 review)
- Apply CR-9 install-risk discipline (version-pin / alternate-channel probe / sibling-bleed defense)
- Apply CR-12 5-class lattice classification BEFORE install
- Apply Forward Discipline #2 (TIGHT codex T1 prompt; 60-180s budget; TEXT only)
- Apply FM-02 sub-class (b) defense (atomic single-shell git add + commit --only -- pathspec)
- Apply Pattern A on NEEDS-REVISION (single atomic apply 0.85-0.95 conf)
- Apply Pattern B HNF disposition on timeout (trace-mine + ship-as-designed + T3-shifted)
- Mia pre-apply on prescribed_edits before Edit
- FM-20 path-drift cascade defense across fires (decompose claims; per-claim Mia probe at synthesis time)

## Mia ladder advance (Fire 28 roadmap)

n=2030 (research-architecture-improvement) → **n=2052** (+22: Fire 29 IMP-A roadmap + Fire 30 IMP-B + Fire 31a/b IMP-C split + Fire 32a/b/c IMP-D split + Fire 33a/b fresh discovery + Fire 34 IMP-E + Fire 35 IMP-F + Fire 36 IMP-G + Fire 37 Forward Discipline promotion + Fire 38-41 carryover + Quarterly recursion cadence + 7 sequencing principles + Forward Discipline #2 cycle-322 promotion gate table + sub-arc tracking summary + per-fire discipline conformance checklist + cycle-300 ONE-LOGICAL-UNIT-PER-FIRE split rationale + Fire 31a vs 31b split + Fire 32a/b/c split + Fire 33a discovery vs 33b deep-dive split + Effort/Risk estimates + Triggers/Outcomes for promotion fire)
