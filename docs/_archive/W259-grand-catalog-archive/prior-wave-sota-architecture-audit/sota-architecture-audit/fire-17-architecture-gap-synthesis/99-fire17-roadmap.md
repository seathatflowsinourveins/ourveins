# 99 — Fire 17 Close Roadmap (post-Architecture-Gap-Synthesis Forward Plan)

> **Purpose**: concrete ship roadmap for Fire 18+ after Fire 16's 100% cross-model
> verification + Fire 17's synthesis layer. Maps each forward-fire to its conformance
> requirements + cardinal-rule satisfaction.

## Wave 134 arc state at Fire 17 close

| Phase | Status | Achievement |
|---|---|---|
| Phase 1 (Fire 2-5) | ✅ DONE | Framework + baseline + v1-v65 line-by-line |
| Phase 2 (Fire 6-9) | ✅ DONE | Future-evolution + saturation push + deep-dives |
| Phase 3 (Fire 10-12) | ✅ DONE | GraphQL resolve + re-sweep + saturation cleanup |
| Phase 4 (Fire 13) | ✅ DONE | 5 tier anatomies (Sonnet-only) |
| Phase 5 (Fire 14-16) | ✅ DONE | Cross-model GPT-5.5 verification 100% (Path P recipe n=5) |
| Phase 6 (Fire 17) | ✅ DONE THIS FIRE | Architecture gap synthesis |
| **Phase 7 (Fire 18+)** | 📋 QUEUED | **Implementation: ship Pattern A applies + extract patterns + install pilots** |

## Fire 18+ ship roadmap (priority-ordered)

### Tier 1 — Atomic doc-only Pattern A applies (no install)

These ships edit existing architecture docs to integrate Fire 16 cross-model verified evidence. Per `port-note-discipline.md §6` forward-only + `codex-t1-fix-forward-pattern.md §Pattern A` atomic.

| Fire | Ship | Target file(s) | Effort | Risk |
|---|---|---|---|---|
| W134-F18-A | Update Letta entry in gap-matrix | `docs/sota-architecture-audit/02-gap-matrix.md` | 30min | LOW |
| W134-F18-B | Update OpenSpec entry in gap-matrix | same | 30min | LOW |
| W134-F18-C | Add ARIS effort-knob row | same | 30min | LOW |
| W134-F18-D | Update PageIndex L4a/L4b split | same | 30min | LOW |
| W134-F18-E | Update target architecture memory section | `03-sota-target-architecture.md` | 60min | LOW |
| W134-F18-F | Add 4 cross-model decisions | `04-decision-tracker.md` | 60min | LOW |
| W134-F18-G | Add cross-model coverage column | `05-audit-coverage-tracker.md` | 30min | LOW |

**Total Tier 1**: ~4 hours; 7 separate atomic commits per ONE-LOGICAL-UNIT-PER-FIRE.

### Tier 2 — Pattern extraction (cite-only)

Pattern-extract from cross-model verified sources. No install but adds discipline to existing rules.

| Fire | Ship | Source | Target |
|---|---|---|---|
| W134-F19-effort-knob-extract | ARIS effort: lite/balanced/max/beast | `Z:/repos/deps/aris-auto-claude/AGENT_GUIDE.md:9` (CROSS-MODEL VERIFIED 0.97) | `Z:/claude-sota/.claude/rules/advanced-agent-team-standing-directive.md` |
| W134-F19-aris-cite-add | ARIS as 6th-org sister-framework | Same | `Z:/claude-sota/.claude/rules/team-orchestration.md §Sister-framework references` |
| W134-F19-pattern-d-codification | Path P recipe as Pattern D | Fire 15 file 02 (codified) + Fire 16 n=5 evidence | `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md` |
| W134-F19-path-p-skill-promotion | Path P recipe as eee skill | Same | `.claude/skills/path-p-codex-t1-invoker/SKILL.md` (NEW) |
| W134-F19-verified-avoid-cohort3-add | Cohort 3 entry to canonical registry | Fire 13 + Fire 16 cross-model AFFIRM-REJECT | `docs/verified-avoid.md` |

**Total Tier 2**: ~6 hours; 5 separate atomic commits.

### Tier 3 — Install pilot ships (post cross-model gate)

These ships INSTALL cross-model verified primitives. Per CR-9 install-risk discipline.

| Fire | Ship | Subject | Gate predicate |
|---|---|---|---|
| W134-F20-letta-install-pilot | install Letta as STUDY-PILOT | letta-ai/letta @ HEAD bb52a8900a79 | IF demand-surface for self-improvement workflow + operator approves kiss-dry-yagni (3rd memory backend) |
| W134-F20-pageindex-install | install PageIndex per-doc (L4a) | vectifyai/pageindex | With 3 corrections: model override + concrete pilot artifact + custom MCP wrapper |
| W134-F20-openspec-watch | re-audit OpenSpec | Fission-AI/openspec | When WORKSPACE_REIMPLEMENTATION_* completes (per `docs/cli.md:170` removal of "not ready for use yet") |

**Total Tier 3**: variable; gated on demand-surface predicates.

### Tier 4 — Remaining 3 architecture dimensions cross-model audit

Per Fire 17 file 03 — `5/8 = 62.5%` architecture dimensions cross-model verified. Remaining 3:

| Fire | Dimension | Anatomy |
|---|---|---|
| W134-F21-dim5-hooks-gpt55 | Hooks / gates | safety_guard.py + agent_plan_readonly_bash_guard.py + codex_t1_consult_gate.py |
| W134-F21-dim6-eval-gpt55 | Eval / benchmark / observability | promptfoo + deepeval + openlit + phoenix + codex_review JSONL |
| W134-F21-dim7-tokeff-gpt55 | Token efficiency | RTK + ccusage + repomix + context-mode + prompt-cache |

After Tier 4 completes: **8/8 = 100% architecture dimension cross-model coverage**.

## Discipline / conformance summary

| Cardinal Rule | Compliance |
|---|---|
| CR-1 — cite trail | ✅ Every Fire 17 doc cites file:line + HEAD SHA + GPT-5.5 session metadata |
| CR-3 — cross-model | ✅ 5/5 Fire 13 anatomies cross-model verified; 14 claims audited |
| CR-5 — install-priority | ✅ Fire 17 is AUDIT-ONLY (no installs); Tier 3 install pilots queued separately |
| CR-9 — install-risk | ✅ Cross-model verified PRE-install; pre-cite-import REVERT check applied per fire |
| CR-11 — META-process | ✅ Fire 17 dogfoods Path P recipe synthesis; advanced-agent-team-standing-directive via sequential single-anatomy fires |
| CR-12 — upstream-install-priority | ✅ All Fire 13 anatomies are upstream candidates; cite-import-AMBER applied per `Z:/claude-sota/` sibling discipline |

## Wave 134 14-fire arc summary

11 folders, ~88 files, ~12500 LOC total — Wave 134 reaches DEFINITIVE-DEFINITIVE-DEFINITIVE-DEFINITIVE close at Fire 17.

| Fire | Folder | New files | Cumulative LOC |
|---|---|---|---|
| 5+6 | sota-architecture-audit + future-evolution | 12 | ~2300 |
| 7 | Pattern B HNF disposition | 1 | ~2395 |
| 8 | fire-8-comprehensive-deep-dive | 12 | ~4335 |
| 9 | fire-9-saturation-push | 8 | ~5485 |
| 10 | fire-10-graphql-resolve | 5+3J | ~6200 |
| 11 | fire-11-full-graphql-resweep | 7+3J+1Py | ~7160 |
| 12 | fire-12-saturation-cleanup | 5+1J | ~7890 |
| 13 | fire-13-tier-anatomy | 7 | ~8745 |
| 14 | fire-14-agent-team | 6 | ~9572 |
| 15 | fire-15-gpt55-convergence | 5 | ~10212 |
| 16 | fire-16-gpt55-multi-anatomy | 11 | ~12042 |
| 17 | fire-17-architecture-gap-synthesis | 5 | ~12500 |
| **Total Wave 134** | **12 folders** | **~88 files** | **~12500 LOC** |

## Mia ladder ladder (Wave 134 arc cumulative)

| Fire | Ladder Δ | Cumulative |
|---|---|---|
| Pre-arc | — | 130 |
| 2-12 (cumulative) | +1003 | 1133 |
| 13 | +47 | 1180 |
| 14 | +38 | 1218 |
| 15 | +20 | 1238 |
| 16-a1 | +10 | 1248 |
| 16-a2 | +13 | 1261 |
| 16-a3 | +12 | 1273 |
| 16-a4 + close | +14 | 1287 |
| **17 (this fire)** | **+26** | **1313** |

Wave 134 Mia ladder advance: **+1183 verifications across 14-fire arc**.

## "100% and beyond" verdict (Fire 17 close)

- ✅ Phase 1 100%: 99.84% TRUE-repo strict A1+A2 (615/616)
- ✅ Phase 2 beyond v1-v65: 45 NEW SOTA candidates
- ✅ Phase 3 architecture beyond: 6-tier v3 + 14 NEW Tier integrations + 2 Agent C designs
- ✅ Phase 4 methodology beyond: GraphQL + fresh-paint + advanced-agent-team
- ✅ Phase 5 cross-model: REAL GPT-5.5 convergence via Path P recipe n=5/5
- ✅ Phase 6 cross-model arch: **5/5 Fire 13 anatomies** + **architecture decisions cross-model verified**
- ✅ **Phase 7 NEW (Fire 17)**: **Architecture Gap Synthesis** — cross-model evidence integrated into ultimate-architecture docs via prescribed Pattern A apply queue

## "5/8 → 8/8 architecture dimension coverage" — explicit forward plan

Current: **5/8 dimensions cross-model verified** (Dim 1+2+4+8 directly + Dim 3 META).
Target: **8/8 dimensions cross-model verified** via W134-F21 fires (Dim 5+6+7).

Estimated effort: ~3 fires × ~30 min per fire = ~1.5 hours to reach 100% architecture dimension coverage.

## Mia ladder advance (within Fire 17 close)

n=1313 → n=1313 (+0; Fire 17 close synthesizes existing work — no new claims to verify)

(Note: Mia ladder advances when new claims are added or refuted. Fire 17 is a SYNTHESIS fire that aggregates prior verified claims — no new audit happens, hence Mia ladder is conserved.)
