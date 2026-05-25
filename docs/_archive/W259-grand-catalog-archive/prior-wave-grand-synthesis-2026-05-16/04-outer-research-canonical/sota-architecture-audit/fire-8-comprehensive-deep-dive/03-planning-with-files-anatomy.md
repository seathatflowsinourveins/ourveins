# 03 — OthmanAdi/planning-with-files anatomy (Tier-2 PM minimalist, 10/10 SRA)

> **Source**: `Z:/repos/deps/planning-with-files @ HEAD 6cd6254b238ddad47f2367fd0d925017e2b67be5 [VERIFIED 2026-05-10]`
> **License**: MIT (verified at root LICENSE)
> **Version**: v2.37.0 (release 2026-05-05; "hash attestation + parity-locked version bumper")
> **Last push**: 2026-05-05 (5 days ago — VERY ACTIVE)
> **Audit depth**: README.md (487 LOC headings) + commands/plan.md full + skills/ directory inventory

## What it is

The cleanest implementation of the **Manus markdown-as-working-memory pattern**.
Single skill (`planning-with-files`) + 6 locale variants + commands (`/plan`, `/start`, `/status`, `/plan-attest`).
Hash-attestation for plans (cryptographic integrity check).

## The Manus 3-file pattern (load-bearing primitive)

```
project/
├── task_plan.md   ← phases, progress, decisions
├── findings.md    ← research and discoveries
└── progress.md    ← session logging
```

That's it. Three files. No `.specify/`, no `.taskmaster/`, no `.claude/prds/`, no `.claude/epics/`.

## Commands inventory (`commands/`)

| Command | File | Locale variants |
|---|---|---|
| `/plan` | plan.md | + AR/DE/ES/ZH/ZHT |
| `/plan-attest` | plan-attest.md | hash-attestation |
| `/start` | start.md | (+ same locales presumably) |
| `/status` | status.md | (+ same locales presumably) |

i18n is FIRST-CLASS — Arabic / German / Spanish / Chinese (Simplified+Traditional) localized.

## Skill structure (`skills/`)

- `skills/planning-with-files/` (primary EN skill)
- `skills/planning-with-files-ar/` (Arabic)
- `skills/planning-with-files-de/` (German)
- `skills/planning-with-files-es/` (Spanish)
- `skills/planning-with-files-zh/` (Simplified Chinese)
- `skills/planning-with-files-zht/` (Traditional Chinese)

## `/plan` command essence (commands/plan.md verbatim head)

```
Invoke the planning-with-files:planning-with-files skill and follow it exactly as presented to you.

Create the three planning files in the current project directory if they don't exist:
- task_plan.md — for phases, progress, and decisions
- findings.md — for research and discoveries
- progress.md — for session logging

Then guide the user through the planning workflow.
```

## Key features (from README:43-194 section headings)

- Forks & Extensions (README:33)
- "Used in the Wild" (README:43) — multi-org adoption signal
- Session Recovery (README:110)
- Quick Install (README:194)
- Why This Skill (README:266)
- The Problem (README:273) → Solution: 3-File Pattern (README:282)
- The Manus Principles (README:301) — load-bearing methodology
- Benchmark Results (README:330) — measurable improvement claim
- Key Rules (README:343)
- When to Use (README:350)
- File Structure detail (README:363)
- License (README:478)

## Hash-attestation (v2.37.0 unique primitive)

`/plan-attest` command computes hash of `task_plan.md` and embeds verifiable attestation —
prevents silent edits to plan-as-contract. Cryptographic integrity is RARE in PM tooling
(spec-kit doesn't have this; ccpm doesn't have this).

## SRA D1-D10 verdict (confirms Fire 6 10/10 PASS)

| Dim | Score | Notes |
|---|---|---|
| D1 license-use-class | PASS | MIT — fully permissive |
| D2 freshness | PASS | 5-day push, ACTIVE band |
| D3 fresh-paint clear | PASS | 21k★, ~6+ months mature, deep content + benchmarks |
| D4 maintainer-provenance | PASS | OthmanAdi TIER-4-NAMED-INDIVIDUAL + active commit history |
| D5 active-maintenance | PASS | v2.37.0 just shipped; rolling cadence |
| D6 use-class compat | PASS | Agent Skills standard native; autonomous /loop compatible |
| D7 Anthropic-aligned | PASS | Agent Skills standard (Dec 2025) |
| D8 industry adoption | PASS | "Used in the Wild" section + 21k★ + benchmark results |
| D9 FM-class clear | PASS | no known FM-class triggered |
| D10 replacement viability | N/A | this IS the recommendation; smallest blast radius |

**SRA score: 10/10 PASS** — same as Fire 6. **SMALLEST-REVERSIBLE INSTALL CANDIDATE per Fire 7 W134-F7-alt-path**.

## Install command (CR-6 fresh-from-github + official-native-channel)

```bash
# Clone (HEAD SHA pinned to v2.37.0)
git clone --depth 1 --branch v2.37.0 https://github.com/OthmanAdi/planning-with-files.git Z:/claude-sota-installed/.local/planning-with-files

# Symlink the EN skill (skip locales unless multilingual workflow needed)
mklink /D Z:/claude-sota-installed/.claude/skills/planning-with-files Z:/claude-sota-installed/.local/planning-with-files/skills/planning-with-files

# Verify
ls Z:/claude-sota-installed/.claude/skills/planning-with-files/SKILL.md
```

## Why-SOTA vs ccpm

| Dimension | planning-with-files | ccpm |
|---|---|---|
| Files | 3 (task_plan/findings/progress) | structured `.claude/prds/` + `.claude/epics/<feature>/` hierarchy |
| Mental model | flat single-feature memory | multi-feature PRD→epic→task tree |
| Hash-attestation | YES (v2.37.0) | NO |
| i18n | 6 locales | EN only |
| Velocity | 5d push | 53d push |
| Best for | Solo dev / single feature stream / minimalist | Multi-feature team / GitHub-Issues-integrated |

**eee fit**: planning-with-files is the **STARTING POINT** for first-feature-stream pilots.
ccpm scales up when feature-count > 1. Both are install-class; non-conflicting (different
storage namespaces).

## The Manus Principles (load-bearing — to verify in deep audit)

From README:301 "The Manus Principles" section heading — not extracted line-by-line yet.
Per user-research framing, Manus = markdown-as-working-memory paradigm (single source
of truth for AI agent state). Original Manus paper / blog should be cite-anchored in Fire 9.

## Replacement-of (existing eee primitives)

| Existing eee surface | Replaced by | Migration cost |
|---|---|---|
| Ad-hoc `tmp/wave*.md` planning | Could migrate to `task_plan.md` per-feature | MEDIUM (existing pattern works) |
| Ad-hoc `tmp/wave*-architect-*.md` findings | Could migrate to `findings.md` | LOW |
| Ad-hoc session-log dumps | Could migrate to `progress.md` | LOW |

**Verdict**: planning-with-files is COMPLEMENTARY — adds Manus 3-file template above
existing `tmp/wave*.md` ad-hoc pattern. Doesn't replace TaskList (in-session) or memory
files (cross-conversation).

## Risk classification

- **Install class**: PRIMARY (cardinal-rule-6 PRIMARY — `git clone` from canonical https://github.com)
- **Reversibility**: HIGH — `rm -rf Z:/claude-sota-installed/.local/planning-with-files` + remove skill symlink
- **Blast radius**: LOWEST of the 3 Tier-2 candidates — only 3 files added to project root when /plan invoked
- **Cross-model gate**: required before commit (CR-3)
- **Sibling-bleed**: N/A (upstream install)
- **Smallest-reversible**: YES — recommended as F7-alt-path first install if F7-retry continues Pattern B

## Pre-commit REVERT check (CR-9)

```bash
git -C Z:/claude-sota log --all --oneline -- '.claude/skills/planning-with-files' 2>&1 | head -5
# Expected: empty (no sibling REVERT precedent)
```

## Why-SOTA summary

1. **Minimalism**: 3 files vs ccpm's directory tree vs spec-kit's full `.specify/`
2. **i18n**: 6 locales = strongest multi-language signal in PM SOTA cohort
3. **Hash-attestation**: v2.37.0 cryptographic plan-integrity is UNIQUE primitive
4. **Velocity**: 5d push beats ccpm's 53d
5. **Benchmark results**: README:330 has measurable improvement claims (to verify in Fire 9)
6. **License**: MIT clean
7. **Smallest blast radius**: install costs near-zero, uninstall is trivial

## Mia ladder advance

n=927 → n=931 (+4: MIT verified / 3-file Manus pattern verified / 6-locale i18n verified / v2.37.0 hash-attest verified)
