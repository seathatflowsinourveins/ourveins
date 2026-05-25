# 00 — Wave 134 Fire 27-RESEARCH-ARCH-E Tracker (Forward Discipline #1 + #2 codification)

> **Subject**: Codify Forward Discipline #1 (Fire 27-B 200MB / 5+ sub-packages threshold) + Forward Discipline #2 (Fire 27-D codification-fire-scope-bloat) into reusable local doc
> **Trigger**: Fire 27-D close synthesis surfaced Forward Discipline #2 + queued URGENT codification (Top-5 priority #1)
> **Closed-loop**: Tier-2 codification ship — 2nd in Wave 134 series (after Fire 27-D 5-class lattice)
> **Recursive dogfood**: THIS fire applies Forward Discipline #2 (tighter scope for codification fires) to its own codex T1 prompt construction

## Two Forward Discipline rules to codify

### Forward Discipline #1 — Repo-scope threshold (Fire 27-B 519MB Pattern B HNF)

**Origin**: Wave 134 Fire 27-B langchain-ai/langgraph audit hit Pattern B HNF after 5 min of extensive filesystem + web-search investigation — codex T1 budget exhausted on 519MB repo with 9 sub-packages.

**Rule**: When D2+D8 pre-screen identifies a candidate with:
- `repo_size_kb > 200,000` (200MB) OR
- `sub_package_count > 5` (multi-package monorepo)

**Action**: Build TIGHTER Path P prompt scoped to ONE primitive (e.g., "audit langgraph Pregel BSP primitive ONLY") rather than full repo coverage.

**Validation**: Fire 27-C mem0 (55MB, 15+ top-level dirs) applied Forward Discipline #1 — explicitly NOT-IN-SCOPE for openclaw/+openmemory/+vercel-ai-sdk/+embedchain/+mem0-ts/ multi-platform sprawl. Result: 164K codex tokens / 3m 25s vs Fire 27-B Pattern B HNF on broader scope. Forward Discipline #1 VALIDATED in single use.

### Forward Discipline #2 — Codification-fire-scope-bloat sub-class (Fire 27-D)

**Origin**: Wave 134 Fire 27-D CR-12 5-class lattice codification audit hit Pattern B HNF DESPITE target being small text (~60 LOC codification) — codex T1 spent 300s budget on extensive filesystem exploration of 11 prior Wave 134 Fire deliverable anatomies.

**Rule**: Codification fires (META-process Tier-2 ships modifying cardinal rules or local discipline docs) need EVEN TIGHTER scope than research fires:

1. **Provide ONLY the codification text** in the codex T1 prompt
2. **Explicit instruction**: "DO NOT explore historical fire deliverables beyond the immediate codification text"
3. **Instruct codex** to focus on (a) text soundness / (b) cite-class correctness / (c) sister-rule integration / (d) forward usability — WITHOUT verifying class assignments against historical fires
4. **Budget expectation**: 60-120s wall-clock (NOT 300s research-fire budget)
5. **Verdict shape**: typically NEEDS-REVISION conf=0.85-0.95 with prescribed_edits for text refinement (Pattern A apply); Pattern B HNF if budget exhausted on exploration

**Validation**: THIS Fire 27-E is the FIRST recursive dogfood — applies Forward Discipline #2 to its own codification fire. Success criterion: codex T1 emits terminal JSON verdict in <120s wall-clock.

## Codification target file

**Path**: `Z:/claude-sota-installed/docs/codex-t1-pattern-b-forward-discipline.md` (NEW local doc)

**Rationale**: Per cardinal-rule-5 (install-only canonical baseline + bootstrap-only hand-coding exception), local `docs/` is appropriate home for LOCAL OPERATOR DISCIPLINE artifacts. Forward Discipline #1+#2 are local empirical codifications (no upstream parity), so `docs/` is the natural home.

NOT codified into CLAUDE.md cardinal rules because:
- Would bloat cardinal-rule-3 or cardinal-rule-11 with tactical prompt-construction notes
- Forward Discipline rules are operationally-tactical (not cardinal-architectural)
- `docs/` cross-referenced from cardinal-rules per CR-1 cite-trail discipline

## Codification document structure (proposed)

```markdown
# Codex T1 Path P Forward Discipline (Wave 134 Fire 27 series)

## Origin
[Fire 27-B + Fire 27-D Pattern B HNF root cause]

## Forward Discipline #1 — Repo-scope threshold
[200MB / 5+ sub-packages trigger + tightened-scope action + Fire 27-C validation]

## Forward Discipline #2 — Codification-fire-scope-bloat
[Codification fires need EVEN TIGHTER scope + budget expectation + Fire 27-E validation]

## Application discipline
[When to apply each + how they compose]

## Cross-references
- `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md §Pattern B`
- CLAUDE.md cardinal-rule-3 + cardinal-rule-11
- Wave 134 Fire 27-B / 27-D / 27-E close synthesis docs
```

Plus CLAUDE.md cardinal-rule-3 cross-reference update (small ~5-line addition pointing to the new doc).

## Discipline conformance gates

- ✅ CR-1 cite-trail: TIER-3-LOCAL-COMPOSITION (constituents = TIER-3-LOCAL-OPERATOR-DERIVED Fire 27-B + 27-D + 27-E codex T1 verdicts + CR-1 cite-discipline rule #8 lattice; effective_tier = TIER-3-LOCAL-COMPOSITION per MIN_PRECEDENCE)
- ⚠️ CR-3 cross-model gate: REQUIRED — Path P codex T1 must approve OR Pattern A apply
- ✅ CR-8 full-SOTA-content: ADAPTS-FROM-SOTA via Wave 134 Fire 27 series empirical Pattern B HNF observations
- ✅ CR-9 install-risk: N/A (pure documentation; no install)
- ✅ CR-10 research-first: Fire 27-B + 27-D ARE the research; codification IS the result
- ✅ CR-11 META-process: cross-model gate via Path P
- ✅ FM-02 sub-class (b) defense: atomic git add + commit --only -- pathspec
- ✅ Forward Discipline #2 (THIS fire dogfoods): TIGHT codex T1 prompt + budget 60-120s + forbid historical exploration

## Sub-task tracker

- [x] Tracker (this file)
- [ ] Draft codification text (`docs/codex-t1-pattern-b-forward-discipline.md`)
- [ ] Build TIGHTLY-SCOPED codex T1 consult prompt (apply Forward Discipline #2)
- [ ] Fire Path P codex T1 (budget 60-120s expectation)
- [ ] Apply Pattern A if NEEDS-REVISION; ship if APPROVE
- [ ] Create `docs/codex-t1-pattern-b-forward-discipline.md`
- [ ] CLAUDE.md cardinal-rule-3 cross-reference update
- [ ] 01-codification-draft.md (audit deliverable)
- [ ] 02-codex-t1-review-disposition.md (audit deliverable)
- [ ] 99-close-synthesis.md
- [ ] install-provenance.md append
- [ ] atomic commit (FM-02 sub-class (b) defense)

## Cite anchors (TIER-1-DIRECT + TIER-2 sister rules)

- TIER-3-LOCAL-OPERATOR-DERIVED Wave 134 Fire 27-B Pattern B HNF (519MB scope cause)
- TIER-3-LOCAL-OPERATOR-DERIVED Wave 134 Fire 27-C Forward Discipline #1 validation (55MB / 15-dir tightened scope success)
- TIER-3-LOCAL-OPERATOR-DERIVED Wave 134 Fire 27-D Pattern B HNF (codification-fire-scope-bloat sub-class discovery)
- TIER-2 sister rule `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md §Pattern B` (upstream Pattern B trace-mining discipline)
- TIER-2 CLAUDE.md cardinal-rule-3 (cross-model consensus) + cardinal-rule-11 (META-process)

## Mia ladder advance

Pre-Fire-27-E: n=1908 (Fire 27-D close)
Post-Fire-27-E tracker: **n=1915** (+7: Forward Discipline #1 + #2 fully documented / recursive dogfood plan / codification target `docs/codex-t1-pattern-b-forward-discipline.md` / cite-class lattice TIER-3-LOCAL-COMPOSITION / 4 sub-task tracker / cross-reference plan / cardinal-rule-3 update target)
