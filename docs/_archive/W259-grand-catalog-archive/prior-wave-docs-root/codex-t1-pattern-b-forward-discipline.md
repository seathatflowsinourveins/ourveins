# Codex T1 Path P Forward Discipline (Wave 134 Fire 27 series — RETIRED-SUPERSEDED Wave 134 Fire 37)

> **🚨 RETIRED-SUPERSEDED 2026-05-11 per Wave 134 Fire 37 cycle-322 promotion**
> **CANONICAL HOME**: `Z:/claude-sota-installed/.claude/rules/codex-t1-pattern-b-forward-discipline.md` (formal local rule)
> **Reason for retirement**: cycle-322 n=3 promotion threshold satisfied at Fire 28; n=4 ladder advance at Fire 29a; this `docs/` codification PROMOTED to `.claude/rules/` tier per `Z:/claude-sota/.claude/rules/codification-threshold.md` cycle-322 jurisdiction §"n=3 self-observed automatic promotion gate"
> **Reader action**: consult the canonical rule at `Z:/claude-sota-installed/.claude/rules/codex-t1-pattern-b-forward-discipline.md` for the AUTHORITATIVE Forward Discipline #1+#2 codification. This `docs/` version retained for historical provenance per `Z:/claude-sota/.claude/rules/port-note-discipline.md §3 Discipline 2` FORWARD-REF retirement discipline + `Z:/claude-sota/.claude/rules/port-note-discipline.md §6` anti-pattern "Do not rewrite historical commit bodies" (the original Fire 27-E commit `3656bc7` body cites THIS docs/ path; preserved to honor that historical citation)
> **Below content is the pre-promotion state** (preserved verbatim post-V2+V3 hotfix per commit `16d7738`). For authoritative current rule text, see `.claude/rules/codex-t1-pattern-b-forward-discipline.md`.

---

> **Purpose**: codify two empirical Forward Discipline rules for codex T1 Path P prompt construction that prevent Pattern B HNF (HONEST-NON-FINDING) verdicts from budget exhaustion.
> **Cite class**: TIER-3-LOCAL-COMPOSITION per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 (composed-claims discipline + mechanical source-class reduction lattice — see EXCEPTION clause for upstream-primitive-existence pass-through); `constituents=[TIER-3-LOCAL-OPERATOR-DERIVED @ Wave 134 Fire 27-B + 27-D + 27-E codex T1 trace evidence, TIER-2 @ Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md §Pattern B upstream discipline]; effective_tier=TIER-3-LOCAL-COMPOSITION` per MIN_PRECEDENCE.
> **Sister-rule integration**: extends `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md §Pattern B` with prompt-scope-control discipline; referenced by CLAUDE.md cardinal-rule-3 (cross-model consensus) + cardinal-rule-11 (META-process).

## Origin — two Pattern B HNF empirical observations

### Fire 27-B Pattern B HNF (Forward Discipline #1 root cause)

**Date**: 2026-05-10
**Target**: `langchain-ai/langgraph` v1.2.0a7 — 519MB monorepo with 9 sub-packages
**Codex T1 budget**: 300s wall-clock
**Outcome**: Pattern B HONEST-NON-FINDING — codex spent budget on 11+ filesystem probes + 4 web searches + 2 wasted regex parse errors; mid-verdict-composition cutoff
**Root cause**: target repo scope (519MB + 9 sub-packages) exceeded 300s budget for full coverage

### Fire 27-D Pattern B HNF (Forward Discipline #2 root cause)

**Date**: 2026-05-10
**Target**: CR-12 5-class lattice codification (~60 LOC text codification of CLAUDE.md)
**Codex T1 budget**: 300s wall-clock
**Outcome**: Pattern B HONEST-NON-FINDING — codex spent budget on extensive filesystem exploration of 11 prior Wave 134 Fire deliverable anatomies + Wave 142 graphiti probes + Wave 143 ship trail
**Root cause**: codification target was small, BUT codex used filesystem exploration to verify class assignments against historical fires — went too broad

## Forward Discipline #1 — Repo-scope threshold

**Rule**: When D2+D8 pre-screen identifies a candidate with:
- `repo_size_kb > 200,000` (200MB) OR
- `sub_package_count > 5` — **where `sub_package_count` means independently reviewable package/module surfaces** (e.g., distinct `pyproject.toml` / `package.json` / `Cargo.toml` roots in a monorepo), NOT merely top-level directories or platform-integration sub-folders

THEN build TIGHTER Path P prompt scoped to ONE primitive rather than full repo coverage.

**Action template**:
- Identify the SINGLE highest-value primitive (e.g., "Pregel BSP" for langgraph; "Handoff primitive" for openai-agents-python)
- Build codex T1 prompt that explicitly says: "audit the X primitive ONLY; do NOT explore other sub-packages OR multi-platform integrations"
- Provide explicit NOT-IN-SCOPE list (e.g., "skip openclaw/ + openmemory/ + vercel-ai-sdk/ + embedchain/ + mem0-ts/")

**Validation**: Fire 27-C mem0 audit (55MB but 15+ top-level dirs — mostly platform integrations, not independently reviewable packages) applied Forward Discipline #1 — explicit NOT-IN-SCOPE list. Result: **164K codex tokens / 3m 25s** vs Fire 27-B Pattern B HNF on broader scope. Clean STUDY-PILOT-PATTERN-EXTRACT @ conf=0.87 verdict.

## Forward Discipline #2 — Codification-fire-scope-bloat sub-class

**Rule**: Codification fires (META-process Tier-2 ships modifying cardinal rules or local discipline docs) need EVEN TIGHTER scope than research fires:

1. **Provide ONLY the codification text** in the codex T1 prompt (NOT the broader historical context)
2. **Explicit instruction**: "DO NOT explore historical fire deliverables beyond the immediate codification text"
3. **Instruct codex** to focus on:
   - (a) text soundness — is each definition / claim / cross-reference correct?
   - (b) cite-class correctness — is the constituents/effective_tier disclosure correct per citation-discipline.md rule #8?
   - (c) sister-rule integration — are cross-references aligned with sibling rule semantics?
   - (d) forward usability — would future operators apply this discipline correctly?
4. **Budget expectation**: 60-120s wall-clock target (NOT 300s research-fire budget). This is a TARGET budget, NOT a hard cap that prevents obvious findings — codex MAY exceed the target if needed to articulate a critical concern, but the prompt should not encourage broad exploration that would justify the broader budget.
5. **Verdict shape**: JSON-strict verdict at EOF; APPROVE when clean, NEEDS-REVISION when concrete text refinements are required (with prescribed_edits), REJECT when codification is fundamentally unsound. Do NOT bias toward NEEDS-REVISION when APPROVE is valid.

**Validation**: Fire 27-E (THIS file's source codification fire) is the FIRST recursive dogfood — applies Forward Discipline #2 to its own codification fire. **Cumulative validation results** (n=2 dispatches against same doc):
- **Initial dispatch** (commit `3656bc7`): codex T1 NEEDS-REVISION conf=0.91 in **18s wall-clock / 7,575 tokens / 198-LOC verdict file** at `.claude/state/codex_consult_w134_f27e_forward_discipline_OUT.txt` — Pattern A 6-edit apply integrated atomically per `codex-t1-fix-forward-pattern.md §Pattern A`
- **V2+V3 hotfix verification** (THIS commit): V2 Path P codex T1 NEEDS-REVISION conf=0.91 in **35s wall-clock / 13,968 tokens / 311-LOC verdict file** at `.claude/state/codex_consult_w134_f27e_fd_doc_review_OUT.txt` + V3 Path P codex T1 review NEEDS-REVISION conf=0.88 in **1s wall-clock / 15,280 tokens / 257-LOC verdict file** at `.claude/state/codex_consult_w134_f27e_v3_review_OUT.txt` + V1 sota-researcher Mia probe (2/5 VERIFIED + 3/5 OVER on secondary metrics) → Pattern A 5-additional-edit hotfix apply integrated atomically

n=2 dispatches: 2/2 returned NEEDS-REVISION conf=0.91 on independent prompts (strong empirical reinforcement of substantive codification complexity). vs Fire 27-D Pattern B HNF at 300s / 3,883 LOC verdict-file size. Cross-arc cycle-322 empirical validation requires n=2+ FURTHER codification fires (different docs) for full discipline promotion per `Z:/claude-sota/.claude/rules/codification-threshold.md`.

## Application discipline

### When to apply each

| Fire class | Apply | Notes |
|---|---|---|
| Path P research audit on small repo (<50MB, ≤5 independently-reviewable sub-packages, single-platform) | NEITHER | Default 300s research-fire budget |
| Path P research audit on large monorepo or multi-platform | **#1 only** | Scope to single primitive |
| Path P research audit on TIER-1-OFFICIAL with extensive ecosystem | **#1 only** | Scope-tighten despite TIER-1 provenance |
| META-process codification ship (cardinal-rule edit or local discipline doc) | **#2 only** | Target is text, not repo (NOTE: "META-process" replaces earlier "Tier-2" terminology to disambiguate from cite-tier classification per V2 prescription #3) |
| META-process codification ship that cross-references multiple prior fires | **#2 + explicit historical-fire NOT-IN-SCOPE bounds** | Include codification text only + explicit "do not explore historical fire anatomies beyond cite anchors" instruction |

### Composing #1 + #2 (the only BOTH condition)

Apply BOTH ONLY when a codification fire ALSO references a large upstream repo or multi-package surface (i.e., BOTH the codification-fire criteria AND the repo-scope-threshold criteria fire together):
- Provide ONLY the codification text (Forward Discipline #2)
- DO NOT include large repo dump in the prompt (Forward Discipline #1 — reference upstream repo by file:line cite, NOT by full content)
- Apply both NOT-IN-SCOPE bounds + historical-context skip + repo-scope tightening

The earlier "Tier-2 codification ship that cross-references multiple prior fires" row alone is NOT a BOTH case (no repo-scope trigger present); it's #2-only with explicit historical-fire NOT-IN-SCOPE bounds.

### Prompt-construction checklist (compact)

For every codex T1 Path P prompt, verify:

- [ ] **Target sizing**: estimate target size (LOC / KB / independently-reviewable sub-packages)
- [ ] **Forward Discipline #1 trigger check**: `repo_size_kb > 200,000` OR `sub_package_count > 5` (independently reviewable surfaces)?
- [ ] **Forward Discipline #2 trigger check**: is this a codification fire (cardinal-rule edit or local discipline doc)?
- [ ] **Codification text only**: when #2 fires, include ONLY the codification text — no broader context
- [ ] **Non-scope explicitly stated**: when #1 fires, explicit NOT-IN-SCOPE list (skipped sub-packages / platforms / dirs)
- [ ] **Historical-fire skip explicit**: when #2 fires, explicit "DO NOT explore historical fire deliverable anatomies beyond cite anchors" instruction
- [ ] **Audit dimensions named**: list 3-6 specific audit dimensions (e.g., text soundness / cite-class correctness / sister-rule integration / forward usability)
- [ ] **Target budget declared**: 60-120s for codification; 300s research max — phrased as TARGET, not hard cap
- [ ] **Verdict shape**: JSON-strict at EOF; require prescribed_edits ONLY for actionable text changes (do not bias toward NEEDS-REVISION when APPROVE is valid)

## Cross-references

### Sister rules
- `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md §Pattern B` — upstream Pattern B trace-mining discipline (parent rule); Forward Discipline #1 + #2 extend prompt-scope-control to prevent triggering Pattern B in the first place
- `Z:/claude-sota/.claude/rules/cross-model-consensus.md §"Bundle multiple design surfaces in one T1"` — anti-pattern in cross-model-consensus.md notes that broad T1 consults trigger Pattern B; Forward Discipline #1 + #2 are the operational counterparts
- `Z:/claude-sota-installed/CLAUDE.md` cardinal-rule-3 (cross-model consensus workflow) — references this doc for Path P prompt-scope-control discipline
- `Z:/claude-sota-installed/CLAUDE.md` cardinal-rule-11 (META-process SOTA discipline) — every cardinal-rule edit invokes Forward Discipline #2

### Wave 134 empirical evidence trail

| Fire | Discipline triggered | Outcome |
|---|---|---|
| Fire 27-A (openai-agents-python) | Neither (well under thresholds per `.claude/state/codex_consult_w134_f27a_openai_agents_python_OUT.txt` Wave 134 Fire 27-A verdict file) | Clean STUDY-PILOT-PATTERN-EXTRACT 0.89 in 238K tokens (verdict-file metrics; secondary "3m 42s / 28MB" figures live in commit body of `4a811d9` orchestrator-side observations only, NOT codex-emitted) |
| **Fire 27-B (langgraph)** | **#1 SHOULD have applied (519MB / 4-alpha-cascade `langchain-core` + `langgraph-checkpoint` + `langgraph-sdk` + `langgraph-prebuilt` + 6+ `langgraph-*` internal deps = 10+ sub-packages per commit `3a4ede7` body verbatim)** | Pattern B HNF — root cause for Forward Discipline #1 codification |
| Fire 27-C (mem0) | **#1 applied** (15+ top-level dirs — mostly platform integrations, not independently reviewable packages per L29 sub-package definition) | Clean STUDY-PILOT-PATTERN-EXTRACT 0.87 in 164K tokens / 3m 25s — Forward Discipline #1 VALIDATED (per commit `92f9ea1` body verbatim) |
| **Fire 27-D (CR-12 5-class lattice)** | **#2 SHOULD have applied (codification fire)** | Pattern B HNF — root cause for Forward Discipline #2 codification (per commit `23ea082` body verbatim) |
| Fire 27-E (THIS fire) | **#2 applied** (codification fire) | n=2 cumulative dispatches both NEEDS-REVISION conf=0.91: initial (commit `3656bc7`) 18s/7,575 tokens/198-LOC verdict + Pattern A 6-edit apply; this hotfix (V2 35s/13,968 tokens/311-LOC + V3 1s/15,280 tokens/257-LOC + V1 Mia probe 2/5 VERIFIED + 3/5 OVER on secondary metrics) → Pattern A 5-additional-edit hotfix apply → Forward Discipline #2 VALIDATED (recursive dogfood SUCCESS — codex emitted terminal JSON verdict in 18-35s on BOTH dispatches, well within FD#2 budget expectation 60-120s) |

## Future evolution

When a 3rd Pattern B HNF sub-class emerges (Wave 135+ or beyond), promote this doc to a full sister-rule at `Z:/claude-sota-installed/.claude/rules/` IF the new sub-class adds operational complexity beyond what local-doc cross-reference can handle.

Currently: 2 sub-classes (#1 research-scope, #2 codification-scope) covered by this local doc + CLAUDE.md cross-reference.

## Cite anchor

- Origin: Wave 134 Fire 27-B Pattern B HNF (2026-05-10) + Fire 27-D Pattern B HNF (2026-05-10)
- Codification ship: W134-F27-RESEARCH-ARCH-E (2026-05-10)
- Sister-rule discipline: `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md §Pattern B` (upstream)
- Validated by: Fire 27-C (Forward Discipline #1 — VALIDATED via Pattern A apply on commit `92f9ea1`) + Fire 27-E (Forward Discipline #2 recursive dogfood — n=2 cumulative dispatches both NEEDS-REVISION conf=0.91 → 6+5 cumulative Pattern A edits applied → VALIDATED)
- Wave 134 Fire 27-E hotfix close-synthesis cite: Layer-3 wiki at `Z:/claude-sota-installed/.claude/projects/Z--claude-sota-installed/memory/reference_w134_fire27e_hotfix_close_synthesis_2026_05_10.md` (post-commit append per Karpathy §5 Wiki Compounding Surface)
- Cumulative-dispatch validation note: n=2 independent codex T1 dispatches against same doc both returned NEEDS-REVISION conf=0.91 with substantively different prescribed_edit sets (initial: 6 edits / hotfix: 5 + 2 V3 additional + 3 V1 OVER catches). Strong empirical reinforcement that the doc has substantive content amenable to multi-pass refinement; n=2+ further codification fires (different docs) required for cross-arc cycle-322 promotion of FD#1+#2 from local-doc to full sister-rule per `Z:/claude-sota/.claude/rules/codification-threshold.md`
- Honest meta-Mia self-correction (orchestrator-side Mia OVER caught pre-commit): initial hotfix-fire commit-msg draft incorrectly attributed L54 metric drift to "FM-17.j codex auto-apply" — actual cause was prior-dispatch metrics from commit `3656bc7` cited correctly; hotfix dispatch added different metrics. FM-17.j theory REFUTED; corrective re-Edit applied per `Z:/claude-sota/.claude/rules/mia-pre-apply.md` orchestrator-side discipline + `port-note-discipline.md §6` "Do not rewrite historical metrics" anti-pattern
