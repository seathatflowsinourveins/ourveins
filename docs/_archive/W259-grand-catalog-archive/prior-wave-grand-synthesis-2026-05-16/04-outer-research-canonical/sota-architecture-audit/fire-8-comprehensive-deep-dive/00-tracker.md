# Wave 134 Fire 8 — Comprehensive line-by-line deep-dive arc

> **Folder**: `Z:/claude-sota-installed/docs/sota-architecture-audit/fire-8-comprehensive-deep-dive/`
> **Created**: 2026-05-10 post-Fire 7 Pattern B HNF disposition
> **Parent arc**: Wave 134 (Fire 5+6 close at commits `583d0bb` + `ac8ea8a` + `88adcd6`)
> **Driver**: user directive re-issued post-compaction — "create a folder for this task...
> reach 100% and beyond... most comprehensive repos deep dive... definitive architecture
> for your future evolve aim... DEEP DIVE AND RESEARCH BEYOND REPOS BY LINE BY LINE READ"

## Arc state at Fire 8 open

**Fire 6 baseline** (commit `ac8ea8a`):
- 614-repo cumulative baseline (609 v1-v65 + 5 extension)
- 8.14% strict line-by-line (50/614)
- 91.21% programmatic SRA (560/614)
- 98.37% attempted (604/614)
- Mia ladder n=920

**Fire 7 state** (commit `88adcd6`):
- T1 on install plan returned Pattern B HONEST-NON-FINDING (zero-investigation variant)
- 0 installs executed
- DEFERRED-PENDING-FIX disposition per `closed-loop-recursive-narrowing.md §Outcome A`
- Mia n=921

## Fire 8 mission

User explicitly requested re-issued depth — go BEYOND Fire 6's 8.14% strict.
Target: full line-by-line ANATOMY of the architectural-anchor repos that drive
the definitive 6-tier architecture (Fire 6 `05-definitive-architecture.md`).

**This fire is AUDIT, NOT INSTALL** — Fire 7 install gate remains DEFERRED;
audit/read-only operations are unblocked per `cross-model-consensus.md`.

## Deep-dive targets (8 architectural-anchor repos)

| # | Repo | HEAD SHA | Pushed (days ago) | Role in arch | Fire-6 verdict |
|---|---|---|---|---|---|
| T1 | github/spec-kit | `688ca1b` | 2d | Tier-1 method (spec-driven) | 🥇 INSTALL F7 |
| T2 | automazeio/ccpm | `7d7e462` | 53d | Tier-2 PM (PRD→epic→tasks) | 🥇 INSTALL F7 |
| T3 | OthmanAdi/planning-with-files | `6cd6254` | 5d | Tier-2 PM (minimalist) | 🥇 INSTALL F7 |
| T4 | buildermethods/agent-os | NEW clone | 0d | Tier-3 standards | 🥇 INSTALL F8 |
| T5 | obra/superpowers | `f2cbfbe` | 6d | Tier-1 method (INSTALLED) | ✅ DEEP-ANATOMY |
| T6 | Piebald-AI/claude-code-system-prompts | `648d3b3` | 2d | Tier-5 reference (CC internals) | 🆕 CITE-IMPORT F8 |
| T7 | anthropics/skills | `f458cee` | 2d | Tier-0 foundation (Agent Skills SPEC) | ⚠️ TRULY-UNLICENSED but THE spec source |
| T8 | bmad-code-org/BMAD-METHOD | `e36f219` | 9d | Tier-1 method alternative | ⚠️ DEFER per Probe 7.b |

## Deliverables in this folder

| File | Purpose | LOC target |
|---|---|---|
| `00-tracker.md` | This file | ~150 |
| `01-spec-kit-anatomy.md` | Line-by-line: README + AGENTS.md + skills integration | ~200 |
| `02-ccpm-anatomy.md` | Line-by-line: skill/ccpm/SKILL.md + commands | ~200 |
| `03-planning-with-files-anatomy.md` | Line-by-line: skills/ + commands/ + hash-attestation | ~200 |
| `04-agent-os-anatomy.md` | Line-by-line: commands/ + profiles/ + standards-injection | ~200 |
| `05-superpowers-anatomy.md` | Line-by-line: 14 skills + CLAUDE.md + RELEASE-NOTES | ~250 |
| `06-piebald-system-prompts-anatomy.md` | Line-by-line: agent-prompts + tool-descriptions | ~200 |
| `07-anthropics-skills-anatomy.md` | Line-by-line: agent-skills-spec.md + 17 reference skills | ~250 |
| `08-extended-repo-discovery.md` | Find MORE SOTA repos beyond Fire 6's 614 baseline | ~200 |
| `09-comparison-decision-matrix.md` | Why-SOTA / replacement-of / comparison per repo | ~300 |
| `10-definitive-architecture-v2.md` | REVISED 6-tier architecture incorporating Fire 8 findings | ~300 |
| `11-coverage-tracker-v2.md` | Post-Fire-8 honest coverage % | ~150 |

## Coverage target

Fire 6: 50/614 = 8.14% strict line-by-line
Fire 8 add: 8 architectural-anchor repos × ~200 LOC line-by-line read each = **58/614 = 9.45% strict** (incremental gain conservative; bigger contribution is QUALITY not COUNT — the 8 are the LOAD-BEARING ones for the architecture decision)

Plus extended-repo-discovery may add 10-20 new SOTA repos pushing cumulative
baseline to ~625-635.

## Cardinal-rule conformance for this fire

- CR-1: every deep-dive cites file:line + HEAD SHA per the SHA table above
- CR-5: install-priority — this fire is AUDIT only (zero installs); Fire 7 install gate still DEFERRED
- CR-8: full-SOTA-content invariant — every claim cites verbatim source
- CR-9: install-risk N/A (no installs); REVERT check still informs decision-matrix
- CR-11: META-process — fire shape follows `audit-action-loop.md` Wire/Surface/Close discipline
- CR-12: upstream-install-priority — all deep dives are upstream-anchor primary-source reads

## Mia ladder

n=921 (pre-Fire-8) → target n≈970 (~50 new line-by-line read verifications)
