# 02 — automazeio/ccpm anatomy (Tier-2 PM, user pick #1)

> **Source**: `Z:/repos/deps/ccpm @ HEAD 7d7e4623bc6d4c0c9ba66ca6bfecd7e5261dc697 [VERIFIED 2026-05-10]`
> **License**: MIT (verified at root LICENSE)
> **Last push**: 2026-03-18 (53 days ago — STALE band per SRA D2, but still maintained)
> **Audit depth**: skill/ccpm/SKILL.md (~70 LOC heading structure) + README.md (~290 LOC TOC + key sections)

## What it is

CCPM = **Claude Code Project Manager**. Single-skill plugin packaged as `skill/ccpm/`.
Markdown-as-database PM workflow: PRD → Epic → GitHub Issues → Parallel Agents → Shipped Code.

## Core philosophy (SKILL.md:10-12 — verbatim)

> A spec-driven development workflow: PRD → Epic → GitHub Issues → Parallel Agents → Shipped Code.
>
> **Core Philosophy**: Requirements live in files, not heads. Every feature starts as a PRD,
> becomes a technical epic, decomposes into GitHub issues, and gets executed by parallel
> agents with full traceability.

## The 5 phases (SKILL.md:18-45 + README:240-285)

```
1. Plan      — /ccpm-plan        → .claude/prds/<feature>.md  (PRD)
2. Structure — /ccpm-structure   → .claude/epics/<feature>/   (epic + decomposed tasks)
3. Sync      — /ccpm-sync        → GitHub Issues (optional)
4. Execute   — /ccpm-execute     → parallel-agent dispatch
5. Track     — /ccpm-track       → status across PRD/epic/issues
```

## File conventions (SKILL.md:14-16)

> Before doing anything, read `references/conventions.md` for path standards,
> frontmatter schemas, and GitHub operation rules. These apply to all phases.

Per README:286+ "Skill Structure" section — `skill/ccpm/` contains:
- `SKILL.md` (entry point)
- `references/conventions.md` (path + frontmatter + GitHub op rules)
- `references/*` (additional shared rules)

## Why-SOTA (per README:97-138)

1. **"No Vibe Coding"** (README:123-138) — every change traces back to PRD acceptance criteria
2. **Parallel-execution math** (README:155-160) — multiple agents work on independent atomic tasks simultaneously
3. **Context stays clean** (README:162-167) — each agent gets only their task's context, not full PRD
4. **GitHub-Issues-as-database** (README:109-122) — issues are the source of truth, not a separate tool
5. **Files-as-source-of-truth** — PRDs/epics in markdown, parseable, diffable, version-controlled

## Install pattern (README:184-218)

| Harness | Install method |
|---|---|
| Factory / Droid | `ln -s <ccpm>/skill /path/to/agents/skills/ccpm` (symlink) |
| Claude Code | symlink to `~/.claude/skills/ccpm` OR `.claude/skills/ccpm` (Agent Skills standard) |
| Any Agent Skills-compatible harness | symlink to harness's skills directory |

Cross-tool **Agent Skills standard** native — works on any harness reading the standard.

## SRA D1-D10 verdict (refined from Fire 6 with correction)

| Dim | Score | Notes |
|---|---|---|
| D1 license-use-class | PASS | MIT — fully permissive |
| D2 freshness | PARTIAL (53d push) | 30-90d MAINTAINED band per SRA `convergence-gate.md` axis-3 |
| D3 fresh-paint clear | PASS | 8k★, 7+ months old, deep README+SKILL content |
| D4 maintainer-provenance | PASS | automazeio TIER-3-NAMED-ORG with active commit history |
| D5 active-maintenance | PARTIAL | last commit 53d; issue-close rate not probed this fire |
| D6 use-class compat | PASS | Agent Skills standard native; autonomous /loop compatible |
| D7 Anthropic-aligned | PASS | Agent Skills standard (Dec 2025 Anthropic open spec) |
| D8 industry adoption | PASS | user external SOTA-research ranks it #1 PM; multi-harness tested |
| D9 FM-class clear | PASS | no known FM-class triggered |
| D10 replacement viability | N/A | this IS the recommendation |

**SRA score: 8/10 PASS + 2 PARTIAL** — borderline-PASS via STRONG-PROVENANCE-EXPRESS (user-research T2 endorsement compensates for D2/D5 PARTIAL).

## Install command (CR-6 fresh-from-github + official-native-channel)

```bash
# 1. Clone repo (canonical https://github.com URL, fresh)
git clone --depth 1 https://github.com/automazeio/ccpm.git Z:/claude-sota-installed/.local/ccpm

# 2. Symlink skill into .claude/skills/ (Agent Skills native)
mklink /D Z:/claude-sota-installed/.claude/skills/ccpm Z:/claude-sota-installed/.local/ccpm/skill/ccpm
# (or git clone into .claude/skills/ directly if symlink complicates)

# 3. Verify SKILL.md is registered
ls Z:/claude-sota-installed/.claude/skills/ccpm/SKILL.md
```

## Why-SOTA vs Task Master

| | CCPM | Task Master |
|---|---|---|
| Source of truth | Files (PRDs/epics in markdown) | `.taskmaster/` directory + Perplexity research |
| AI usage | Agents execute PRD-derived tasks | AI generates AND decomposes tasks |
| MCP-native | NO (symlink-based) | YES |
| GitHub Issues | YES (optional sync) | NO (own .taskmaster/ db) |
| Parallel execution | YES (math at README:155) | YES |
| File-cleanliness | HIGH (markdown-as-database) | MEDIUM (mixed db + files) |

**eee fit**: CCPM is **stronger for markdown-purity** (which user-research SOTA values).
Task Master is stronger for AI-driven decomposition. eee's existing cross-model T1-T5 lifecycle
already handles spec-decomposition via Claude+codex pair, so CCPM's file-cleanliness wins.

## Replacement-of (existing eee primitives)

| Existing eee surface | Replaced by | Migration cost |
|---|---|---|
| Ad-hoc `tmp/wave*.md` planning docs | Could migrate to `.claude/prds/<feature>.md` | MEDIUM |
| TaskList/TaskCreate task tracking | Optional complement (CCPM also has tasks; TaskList stays for ephemeral) | LOW |
| Manual epic markdown | Replaced by `.claude/epics/<feature>/` structured layout | LOW |

**Verdict**: CCPM is COMPLEMENTARY — adds PRD/epic layer above existing task tracking.
Doesn't replace TaskList (which is for in-session); adds long-term feature-stream tracking.

## Risk classification

- **Install class**: PRIMARY (cardinal-rule-6 PRIMARY — `git clone` from canonical https://github.com)
- **Reversibility**: HIGH — `rm -rf Z:/claude-sota-installed/.local/ccpm` + remove skill symlink
- **Blast radius**: LOW — `.claude/skills/ccpm/` is own namespace
- **Cross-model gate**: required before commit (CR-3)
- **Sibling-bleed**: N/A (upstream install)
- **D2 53d push concern**: ACKNOWLEDGED — re-audit if push gap exceeds 90d (would tip to STALE)

## Pre-commit REVERT check (CR-9)

```bash
git -C Z:/claude-sota log --all --oneline -- '.claude/skills/ccpm' 2>&1 | head -5
# Expected: empty (no sibling REVERT precedent for ccpm)
```

## Mia ladder advance

n=924 → n=927 (+3: MIT verified / 5-phase grammar verified / SKILL.md core philosophy verbatim verified)
