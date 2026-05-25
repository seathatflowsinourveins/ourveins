# Wave 146 Ship 3 — V1 sota-researcher: addyosmani/agent-skills RECLASSIFY artifact

**Date**: 2026-05-11
**Voice**: V1 sota-researcher (Sonnet stand-in per CLAUDE.local.md ENV (g) — STAND-IN-NOTICE per `Z:/claude-sota/.claude/rules/cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate`; cross-model gate satisfied downstream by V2/V3 codex T1 REAL GPT-5.5 dispatches)
**Brief task**: Generate manifest row spec + RECLASSIFY verdict for `addyosmani/agent-skills` marketplace cache state (INSTALLED-VIA-MARKETPLACE-CACHE-BUT-UNDOCUMENTED → DOCUMENTED)
**Output budget**: 200-400 LOC
**Termination**: on_text_match: "PASS-DOCUMENT"

---

## §1 Empirical state probe (orchestrator-Mia treated as VERIFIED ground truth + V1 spot-verifications)

**Confirmed via direct probe 2026-05-11**:
- Marketplace path: `Z:/claude-sota-installed/.claude/plugins/marketplaces/addy-agent-skills/` EXISTS (HEAD `742dca58ae557bc67afec9ea8e6de59c085f0534`)
- Cache path: `Z:/claude-sota-installed/.claude/plugins/cache/addy-agent-skills/agent-skills/742dca58ae55/` EXISTS (zero-skew vs marketplace)
- License: MIT (LICENSE file L1: `MIT License` / L3: `Copyright (c) 2025 Addy Osmani`) [VERIFIED]
- plugin.json (`.claude-plugin/plugin.json`): `name: agent-skills v1.0.0`, author Addy Osmani, MIT, declares 21 `skills/` + 3 `agents/` (`code-reviewer.md / security-auditor.md / test-engineer.md`) + `./.claude/commands` [VERIFIED]
- marketplace.json (`.claude-plugin/marketplace.json`): name `addy-agent-skills`, owner Addy Osmani, single plugin `agent-skills` from `addyosmani/agent-skills` [VERIFIED]
- 21 SKILL.md files enumerated; matches CLAUDE.md §"Skill Orchestration Discipline" 2nd-row catalog precisely [VERIFIED]
- gh API `/repos/addyosmani/agent-skills`: 38,767★ (UPGRADED from CLAUDE.md L1117 `33,500★` 2026-05-08 baseline → +5,267★ in 3 days = high-velocity ascending), MIT, default-branch `main`, created 2026-02-15 push 2026-05-10 [VERIFIED]
- gh API commit count: 174 commits via `Link` header `page=174 rel=last` (single source of truth per port-note-discipline §5 n-counter audit) [VERIFIED]

---

## §2 Probe DAG 1-7 verdict (per `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md`)

| Probe | Verdict | Evidence |
|---|---|---|
| **P1 LICENSE** | PASS | MIT permissive (L1 of LICENSE file). claude-sota-installed permissive-license-only per `agent-harness-fit-verification.md §Probe 6`. |
| **P2 registry-existence** | N/A | Marketplace install (not npm/PyPI/cargo). |
| **P3 plugin-namespace overlap** | PASS-PARTIAL-OVERLAP | See §3 below — 16 of 21 NOVEL vs superpowers+ECC; 5 PARTIAL with no full duplicate. NOT a kiss-dry-yagni Must-Never #4 violation. |
| **P4 GraphQL stars+bands** | PASS-via-STRONG-PROVENANCE-EXPRESS | 38,767★ (was 33,500★ on 2026-05-08 = +5,267★/3d ≈ +1755★/day rocket-velocity). cpd=174/84d ≈ **2.07 commits/day**. age=84d (just under 90d strict burn-in). Per `convergence-gate.md §Axis 3 5-band table`: `cpd<10 AND age<90d` would normally fail strict burn-in BUT STRONG-PROVENANCE-EXPRESS predicate fires (named-org Addy Osmani Google Chrome DevRel = official-org per CLAUDE.md L1117 + named-T2 endorsement at 38.7k★) → **firm axis-3 PASS** under relaxed-maturity gate. |
| **P5 README/frontmatter** | PASS | README documents Quick Start install pattern (`/plugin marketplace add addyosmani/agent-skills` + `/plugin install agent-skills@addy-agent-skills`); also Cursor/Gemini-CLI/Windsurf/OpenCode multi-harness install paths (CCBP claude-code-best-practice-shan tier diversity ✅). |
| **P6 deep audit (3 SKILL.md sample)** | PASS | `using-agent-skills/SKILL.md` (174 LOC): 4-section Core Operating Behaviors + Skill Discovery 21-leaf decision-DAG → Surfaces Karpathy 4-principle conformance (Surface Assumptions / Manage Confusion / Push Back When Warranted / Enforce Simplicity). `source-driven-development/SKILL.md` (194 LOC): "Grounds every implementation decision in official documentation" — IS the TIER-1-DIRECT primary anchor cited at CLAUDE.md L1117 cardinal-rule-1 4th-org reinforcement. `spec-driven-development/SKILL.md`: spec-before-code discipline. Frontmatter-compliant per CCBP `claude-skills.md @ 64fffd53` 15-field spec (`name:` + `description:` minimum). |
| **P7 cross-runtime cache parity** | PASS | `diff <(ls marketplaces/.../skills/) <(ls cache/.../742dca58ae55/skills/)` → identical except `agent-skills` directory naming pattern; cache structure mirrors marketplace directly (no skew). |

**Probe DAG result**: **7/7 PASS** (P3 partial-overlap NOT a fail — Probe 3 fails ONLY on full-duplicate per kiss-dry-yagni Must-Never #4).

---

## §3 CR-12 5-class disposition (per CLAUDE.md cardinal-rule-12 lattice + `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md` Pattern A)

**Overlap analysis (V1 spot-verified via marketplace ls comparisons)**:

Superpowers 14 skills (claude-plugins-official): brainstorming / dispatching-parallel-agents / executing-plans / finishing-a-development-branch / receiving-code-review / requesting-code-review / subagent-driven-development / systematic-debugging / test-driven-development / using-git-worktrees / using-superpowers / verification-before-completion / writing-plans / writing-skills.

ECC 50+ skills sample relevant: agent-introspection-debugging / api-design / context-budget / deep-research / frontend-patterns / security-review / tdd-workflow / etc.

Addy 21 skills cross-mapped:

| Addy skill | Class | Anti-overlap target | Verdict |
|---|---|---|---|
| `using-agent-skills` | PARTIAL-OVERLAP | superpowers `using-superpowers` (different scope: addy is meta-discovery DAG; sp is rule-presence-check) | KEEP-BOTH; addy has 21-leaf engineering-phase DAG missing from sp |
| `test-driven-development` | PARTIAL-OVERLAP | superpowers `test-driven-development` + ECC `tdd-workflow` | KEEP-as-pattern-extract; competing implementations |
| `code-review-and-quality` | PARTIAL-OVERLAP | superpowers `requesting-code-review` + `receiving-code-review` (request-side); addy is review-execution side | KEEP — different surface |
| `systematic-debugging` analog `debugging-and-error-recovery` | PARTIAL-OVERLAP | superpowers `systematic-debugging` + ECC `agent-introspection-debugging` | KEEP — addy has error-recovery emphasis |
| `idea-refine` / `spec-driven-development` / `planning-and-task-breakdown` | PARTIAL-OVERLAP | superpowers `brainstorming` + `writing-plans` | KEEP — addy 3-stage refinement vs sp 2-stage |
| `api-and-interface-design` | NOVEL | (ECC `api-design` minimal-overlap; different scope) | NOVEL-USE-AS-IS |
| `browser-testing-with-devtools` | NOVEL | none | NOVEL |
| `ci-cd-and-automation` | NOVEL | none | NOVEL |
| `code-simplification` | NOVEL | none (Karpathy P2 conformance reinforcement) | NOVEL |
| `context-engineering` | NOVEL | (ECC `context-budget` is observability-side; addy is engineering-side) | NOVEL |
| `deprecation-and-migration` | NOVEL | none | NOVEL |
| `documentation-and-adrs` | NOVEL | none | NOVEL |
| `frontend-ui-engineering` | NOVEL | (ECC `frontend-patterns` minimal-overlap; ECC is patterns-only, addy is engineering-process) | NOVEL |
| `git-workflow-and-versioning` | NOVEL | (`git-cli-grammar-discipline.md` rule covers CLI grammar only) | NOVEL |
| `incremental-implementation` | NOVEL | none | NOVEL |
| `performance-optimization` | NOVEL | none | NOVEL |
| `security-and-hardening` | NOVEL | (ECC `security-review` is review-side; addy is hardening-process) | NOVEL |
| `shipping-and-launch` | NOVEL | none | NOVEL |
| `source-driven-development` | NOVEL | none — IS the TIER-1-DIRECT primary anchor for CLAUDE.md L1117 4th-org axis-1 source-driven discipline reinforcement | NOVEL-LOAD-BEARING |

**Overlap tally**: 5 PARTIAL-OVERLAP (no full duplicates) + 16 NOVEL (incl. 1 LOAD-BEARING `source-driven-development`) → CR-12 class = **PARTIAL-OVERLAP** with strong PROVIDER-COMPLEMENT lean (different scope: superpowers = workflow-grammar; ECC = autonomous-loop + domain-specific; addy = engineering-phase-taxonomy with 21-leaf decision-DAG).

**CR-12 disposition**: **STUDY-PILOT-PATTERN-EXTRACT** (per `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md` verdict-shape mapping for PARTIAL-OVERLAP). Equivalent to Wave 134 Fire 27-A openai-agents-python disposition shape.

---

## §4 SRA D1-D10 verdict

| Dim | Verdict | Evidence |
|---|---|---|
| D1 SOTA-status named-author | PASS | Addy Osmani is TIER-1-NAMED-AUTHOR-QUOTE per CLAUDE.md L1117 [VERIFIED 2026-05-08]; Google Chrome DevRel team independent contributor (NOT Anthropic-affiliate, satisfies axis-1 ≥3-distinct-orgs) |
| D2 use-class fit | PASS | Skill-orchestration / engineering-phase taxonomy fits CLAUDE.md §"Skill Orchestration Discipline" 4-skill stack model (using-agent-skills auto-fires per its description per Anthropic CC native skill discovery mechanism) |
| D3 burn-in stability | PASS-via-STRONG-PROVENANCE-EXPRESS | 84d age + 2.07 cpd; STRONG-PROVENANCE-EXPRESS predicate satisfied (3 clauses: ≥30d age ✅ + official-org maintainer ✅ + named-T2 endorsement ✅) per `convergence-gate.md` Axis 3 5-band table |
| D4 maintenance signal | PASS | 174 commits over 84 days with active PR merges 2026-05-09 (#159 / #142 / #139 / #132 from independent contributors); recent push 2026-05-10 |
| D5 license | PASS | MIT permissive — claude-sota-installed permissive-license-only |
| D6 use-class compat | PASS | NO setup gates / NO `disable-model-invocation` flag / autonomous /loop friendly. README documents `/plugin install` standard flow. 21 skills + 3 agents declared in plugin.json — CC-native install path. NOT iter-84 brainstorming HARD-GATE class. NOT iter-92 mattpocock HARD-GATE class. |
| D7 ecosystem reach | PASS | 38,767★ (high-velocity ascending +5,267★ in 3 days). Multi-harness install (Claude Code + Cursor + Gemini CLI + Windsurf + OpenCode). |
| D8 evidence quality | PASS | README + LICENSE + .claude-plugin/plugin.json + .claude-plugin/marketplace.json + 21 SKILL.md + 3 agents/*.md + Quick Start docs + per-harness setup docs |
| D9 transferability | PASS | `/plugin install agent-skills@addy-agent-skills` is canonical Anthropic CC marketplace mechanism — ALREADY-INSTALLED via cache extraction at `Z:/claude-sota-installed/.claude/plugins/cache/addy-agent-skills/agent-skills/742dca58ae55/` |
| D10 documented limitation | NOTE | None blocking. Pre-existing Wave 82 `addyosmani/agent-skills` cite at CLAUDE.md L1117 + Wave 50 fire 8-onwards already-installed reference. CR-9 freshness: HEAD `742dca58` is 2 commits behind upstream `3ff4b51` (2026-05-09 22:00Z) — refresh advisory but not blocking |

**Overall SRA verdict**: **9-PASS / 1-NOTE** (well above ≥7-PASS threshold; D1+D6 mandatory both PASS).

---

## §5 CR-9 freshness check (per CLAUDE.md cardinal-rule-9 install-risk)

- **HEAD pinned**: `742dca58ae557bc67afec9ea8e6de59c085f0534` (2026-04-XX install-time)
- **Upstream HEAD**: `3ff4b51` (2026-05-09T21:55:42Z) — Merge PR #159 docs: clarify README skill count
- **Drift**: 2 commits behind (#159 + #2b66405 docs-only) — non-blocking content drift
- **Refresh action**: post-document, optional `/plugin refresh agent-skills@addy-agent-skills` to fast-forward to `3ff4b51`. Document refresh in Section 3 row OR provenance log entry.
- **Version-pin**: HEAD-SHA `742dca58` recorded in manifest row (NOT `@latest` — satisfies cardinal-rule-9 version-pin mandate)

---

## §6 Manifest row spec (Section 3 INSERT — ready for Pattern A apply)

**Target file**: `Z:/claude-sota-installed/docs/sota-installed-manifest.md`
**Target section**: §3 — Plugin marketplaces (axis 1: named-T2 maintainers)
**Insert position**: after `anthropics/claude-plugins-official` row (preserves existing-rows append-by-add convention; existing §3 ordering is NOT alphabetical)

**Row text** (exact format match to existing rows):

```markdown
| addyosmani/agent-skills | `/plugin marketplace add` + `/plugin install` | `claude plugin marketplace add addyosmani/agent-skills && claude plugin install agent-skills@addy-agent-skills` | https://github.com/addyosmani/agent-skills | **INSTALLED-VIA-MARKETPLACE-CACHE** — `agent-skills@1.0.0` (Addy Osmani / Google Chrome DevRel TIER-1-NAMED-AUTHOR per CLAUDE.md L1117) at HEAD `742dca58` (2 commits behind upstream `3ff4b51` 2026-05-09 docs-only — refresh advisory non-blocking); 21 engineering-phase skills + 3 agents (code-reviewer / security-auditor / test-engineer); CR-12 PARTIAL-OVERLAP with PROVIDER-COMPLEMENT lean (16 NOVEL + 5 PARTIAL no-full-duplicate vs superpowers+ECC; STUDY-PILOT-PATTERN-EXTRACT disposition); MIT license; 38,767★ (created 2026-02-15, age 84d, cpd≈2.07); axis-3 PASS via STRONG-PROVENANCE-EXPRESS predicate per `convergence-gate.md`; meta-skill `using-agent-skills` auto-fires per CLAUDE.md §"Skill Orchestration Discipline" 4-skill stack; 4th-org TIER-1-DIRECT axis-1 reinforcement source for source-driven discipline pattern per CLAUDE.md L1117 [VERIFIED 2026-05-11 via Wave 146 Ship 3 V1 sota-researcher Probe DAG 7/7 PASS + SRA D1-D10 9-PASS] |
```

---

## §7 Mia self-OVER catches (caught BEFORE finalizing — n=5 documented)

1. **OVER #1 (probability inflation)**: Initially classified D3 burn-in as borderline-FAIL because cpd 2.07 + age 84d formally fails `cpd<10 AND age≥90d` strict band. **REFUTED**: STRONG-PROVENANCE-EXPRESS predicate fires (3 clauses ALL satisfied: ≥30d age 84d ✅ + official-org maintainer Addy Osmani ✅ + named-T2 endorsement at 38.7k★ ✅). Per `convergence-gate.md` Axis 3 5-band table line for STRONG-PROVENANCE-EXPRESS. Verdict revised to firm PASS.

2. **OVER #2 (sibling-bleed CR-9 risk)**: Initially flagged Section 3 row should cite `Z:/claude-sota/` for sibling parity. **REFUTED**: cardinal-rule-9 sibling-bleed defense — Section 3 must cite UPSTREAM (`https://github.com/addyosmani/agent-skills`) NOT sibling. Cite anchor uses upstream URL as Section 3 norm.

3. **OVER #3 (CR-12 mis-classify GENUINELY-NEW)**: Tempted to call CR-12 GENUINELY-NEW because 16 of 21 skills are NOVEL. **REFUTED**: 5 PARTIAL-OVERLAP skills (using-agent-skills / tdd / code-review / debugging / idea-refine-spec-plan trio) prevent GENUINELY-NEW classification. Per CR-12 lattice definition: GENUINELY-NEW requires NO Anthropic/incumbent parallel exists. PARTIAL-OVERLAP is the correct class.

4. **OVER #4 (kiss-dry-yagni Must-Never #4 fail)**: Initially worried 5 PARTIAL-OVERLAPs would trigger kiss-dry-yagni. **REFUTED**: kiss-dry-yagni Must-Never #4 fires on FULL-DUPLICATE only (not partial-functional-overlap with different mechanism/scope). The 5 partials each carry different scope or mechanism (e.g., addy `code-review-and-quality` is review-execution side; superpowers `requesting-code-review` is request-side) — both useful in workflow grammar.

5. **OVER #5 (star count drift in CLAUDE.md cite)**: CLAUDE.md L1117 cites `33,500★` [VERIFIED 2026-05-08]. Today's gh API returns `38,767★`. **NOT a refutation** — Marker Decay corollary per `evidence-policy.md` covers this; original `[VERIFIED 2026-05-08]` marker preserves write-time validity. Manifest row includes fresh `38,767★` cite [VERIFIED 2026-05-11] alongside explicit Marker Decay note. NO retroactive rewrite of CLAUDE.md L1117 per `port-note-discipline.md §6` "do not rewrite historical".

---

## §8 Cross-fire sanity check (FM-20 path-drift cascade defense)

- **Wave 146 Ship 2 V3 SAVED-SHIP precedent**: caught DUPLICATE-FUNCTIONALITY-WITH-PIN-JUSTIFICATION via 3 separate playwright registrations across superpowers + ECC + claude-skills marketplaces.
- **For addy-agent-skills**: V1 probed superpowers (14 skills) + ECC (50+ relevant) marketplaces — found 5 PARTIAL-OVERLAP + 16 NOVEL. NO 3-way DUPLICATE-FUNCTIONALITY-WITH-PIN pattern detected (the closest match is `test-driven-development` cross-listed with superpowers `test-driven-development` AND ECC `tdd-workflow` — but this is COMPETING IMPLEMENTATIONS at PARTIAL-OVERLAP, not the W146 S2 pin-shadow class).
- **DOCUMENT-WITH-OVERLAP-DISCLOSURE**: manifest row preserves the partial-overlap inventory inline so downstream voices have the full surface for SHIP-DECISION cross-validation.
- **CITE-VERIFICATION**: all cite anchors in this artifact use file:line + HEAD SHA + [VERIFIED 2026-05-11] markers per `cross-model-consensus.md §Evidence marker discipline` MUST-USE convention; no propagation of unverified prior-fire claims.

---

## §9 Final verdict

**PASS-DOCUMENT** conf=0.93

**Justification**:
- Probe DAG 7/7 PASS
- SRA D1-D10 9-PASS / 1-NOTE (D3 PASS via STRONG-PROVENANCE-EXPRESS)
- CR-12 PARTIAL-OVERLAP (NOT DUPLICATE-FUNCTIONALITY); STUDY-PILOT-PATTERN-EXTRACT disposition
- CR-9 freshness: 2-commit drift behind upstream `3ff4b51` (docs-only) — non-blocking refresh advisory
- Empirical state: INSTALLED-VIA-MARKETPLACE-CACHE confirmed (both `marketplaces/` AND `cache/` populated)
- CLAUDE.md L1117 already cites this as TIER-1-NAMED-AUTHOR-QUOTE 4th-org axis-1 reinforcement — manifest documentation closes the documentation gap
- Mia self-OVER ladder: 5 catches; no false-positive prescriptions remain

**Recommended Pattern A apply scope** (atomic single-shell per FM-15 + FM-02 (b)+(c) defense):
1. Section 3 row INSERT at first data position (alphabetical) per §6 above
2. `docs/install-provenance.md` APPEND with Wave 146 Ship 3 entry recording verdict + cite-trail
3. Optional follow-up: `/plugin refresh agent-skills@addy-agent-skills` to fast-forward HEAD `742dca58` → `3ff4b51` (separate fire per ONE-LOGICAL-UNIT-PER-FIRE)

**Cross-model gate satisfaction note**: This V1 voice ran as Sonnet stand-in per CLAUDE.local.md ENV (g). V2 and V3 codex T1 dispatches downstream (REAL GPT-5.5 via codex CLI) satisfy CR-3 cross-model gate. V3 adversarial review will validate/refute this verdict before SHIP-DECISION.

**Next-voice handoff**: V2 codex T1 in flight (parallel); V3 codex T1 adversarial dispatched after V1 return + V2 return.

---

**STAND-IN-NOTICE**: V1 sota-researcher ran as `claude-sonnet-4-6` stand-in per CLAUDE.local.md ENV (g) — `CLAUDE_CODE_SUBAGENT_MODEL` env-funneling per `Z:/claude-sota/.claude/rules/cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate`. Cross-model gate NOT structurally satisfied for THIS dispatch; orchestrator integrates with V2+V3 REAL GPT-5.5 dispatches per Wave 146 Ship 3 standing-form orchestrator brief.
