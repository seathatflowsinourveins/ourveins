# 06 — Piebald-AI/claude-code-system-prompts anatomy (Tier-5 reference)

> **Source**: `Z:/repos/deps/claude-code-system-prompts @ HEAD 648d3b33b1301bde1585b86156ac8c9d07fe3d8c [VERIFIED 2026-05-10]`
> **License**: MIT (verified at root LICENSE)
> **Version**: v2.1.137 (released 2026-05-08)
> **Last push**: 2026-05-08 (2 days ago — VERY ACTIVE)
> **Stars**: ~10k (per Fire 6 audit)
> **Audit depth**: structure probe + CHANGELOG.md head + system-prompts/ directory inventory

## What it is

**Reverse-engineered Anthropic CC internals** — system prompts, tool descriptions,
sub-agent prompts (Plan / Explore / Task), CLAUDE.md generation prompt. Single best
reference for understanding HOW Claude Code actually reasons. Read once, bake learnings
into your own skills.

## Top-level structure

```
claude-code-system-prompts/
├── README.md
├── CLAUDE.md                 ← reference CLAUDE.md (NOT eee-applicable)
├── CHANGELOG.md              ← version history (489 LOC)
├── LICENSE                   ← MIT
├── system-prompts/           ← agent prompts (CC internals)
│   └── *.md (many files; partial inventory below)
└── tools/                    ← tool descriptions extracted from CC
    └── *.md
```

## system-prompts/ inventory (partial — first 10 of larger set)

```
agent-prompt-agent-creation-architect.md
agent-prompt-auto-mode-rule-reviewer.md
agent-prompt-background-agent-state-classifier.md
agent-prompt-background-job-agent-instructions.md
agent-prompt-bash-command-description-writer.md
agent-prompt-bash-command-prefix-detection.md
agent-prompt-batch-slash-command.md
agent-prompt-claude-guide-agent.md
agent-prompt-claudemd-creation.md
agent-prompt-coding-session-title-generator.md
updatePrompts.js              ← scraper script
```

These are **the actual prompts CC uses internally** — agent-creation logic, auto-mode
rule review, background agent state classification, bash command description writing,
bash prefix detection, batch slash command handling, the claude-guide agent, CLAUDE.md
creation, session title generation, ... etc.

## Why this is Tier-5 reference (read once, then close)

Per user-research synthesis:
> "Read this and you'll write better skills."

The value isn't installing it as a runtime primitive. The value is **understanding the
internal language of Claude Code** so you can write skills + agents that match CC's
own conventions:

- How does CC describe a bash command? See `agent-prompt-bash-command-description-writer.md`
- How does CC detect a bash prefix? See `agent-prompt-bash-command-prefix-detection.md`
- How does CC structure auto-mode rule review? See `agent-prompt-auto-mode-rule-reviewer.md`
- How does CC generate session titles? See `agent-prompt-coding-session-title-generator.md`
- How does CC's claude-guide-agent work? See `agent-prompt-claude-guide-agent.md`

## CHANGELOG essence (active maintenance signal)

Per CHANGELOG head:

- **v2.1.137** (2026-05-08): _No changes to the system prompts in v2.1.137._ (release-only bump)
- **v2.1.136**: _+121 tokens_ — minor update
- **v2.1.133**: `+121 tokens` — Bash dedicated-tools-preference bullet + thinking-frequency
  reminder narrowing + EnterWorktree `worktree.baseRef` documentation
- **v2.1.132**: 3.4KB — substantial update with multiple sections

**Tracking velocity**: Piebald-AI maintains pace with Anthropic CC releases. v2.1.137
matches CC v2.1.137 release tag, suggesting per-CC-release prompt extraction.

## Token-delta tracking

CHANGELOG explicitly tracks `+N tokens` per release — this is a **load-bearing
observable** for skill authors who want to understand context-budget growth in CC's
own prompts over time. eee's own Karpathy §5 Wiki Compounding Surface discipline
applies analogously.

## SRA D1-D10 verdict

| Dim | Score | Notes |
|---|---|---|
| D1 license-use-class | PASS | MIT — fully permissive (cite-class use; not install-class) |
| D2 freshness | PASS | 2-day push, ACTIVE |
| D3 fresh-paint clear | PASS | 10k★ multi-year history, deep substantive content |
| D4 maintainer-provenance | PASS | Piebald-AI TIER-3-NAMED-ORG |
| D5 active-maintenance | PASS | per-CC-release sync velocity |
| D6 use-class compat | PASS | CITE-CLASS reference; not install-class (no runtime impact) |
| D7 Anthropic-aligned | PASS | reverse-engineers Anthropic's own conventions = canonical Anthropic-style |
| D8 industry adoption | PASS | 10k★ + cited across libhunt reviewers as best CC-internals reference |
| D9 FM-class clear | PASS | no FM-class concern (read-only reference) |
| D10 replacement viability | N/A | reference-only |

**SRA score: 10/10 PASS** — **CITE-IMPORT TIER-2** to eee's citation-discipline.md.

## How to integrate (CITE-IMPORT, not install)

This is NOT a runtime install. It's a **TIER-2 cite-anchor** to be referenced from
`Z:/claude-sota/.claude/rules/citation-discipline.md` AND eee's skill-authoring docs:

```markdown
# Reference: Z:/repos/deps/claude-code-system-prompts/system-prompts/agent-prompt-bash-command-description-writer.md @ HEAD 648d3b33 [VERIFIED 2026-05-10] — Anthropic CC's own bash-command-description prompt; cite anchor for skills that emit bash descriptions
```

Cite-class verdict per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8:
- `constituents=[TIER-3-LOCAL-OPERATOR-DERIVED @ Piebald reverse-engineering @ Piebald commit-SHA]`
- `effective_tier=TIER-2` (reverse-engineered Anthropic internals; not OFFICIAL Anthropic
  primary-source publication but high-fidelity 10k★ TIER-3-NAMED-ORG with named-author
  Piebald and per-CC-release sync velocity)

## Replacement-of (existing eee primitives)

| Existing eee surface | Augmented by | Cost |
|---|---|---|
| Ad-hoc CLAUDE.md authoring | Reference `agent-prompt-claudemd-creation.md` for Anthropic-canonical structure | LOW (read once) |
| Skill description authoring | Reference Piebald's tool-description patterns | LOW |
| Subagent prompt design | Reference Piebald's sub-agent prompts (Plan/Explore/Task) | LOW |

**Verdict**: PURE AUGMENTATION via cite-anchors. No replacement; no install. Reference
material that improves authoring quality across all eee skill/agent/CLAUDE.md surfaces.

## Risk classification

- **Install class**: SECONDARY (cardinal-rule-1 cite-anchor at file:line + HEAD SHA — NOT install-class)
- **Reversibility**: TRIVIAL — remove cite-anchors
- **Blast radius**: ZERO (no runtime impact)
- **Cross-model gate**: N/A (cite-class only)
- **Sibling-bleed**: N/A

## Forward fire status

- W134-F8 candidate: CITE-IMPORT TIER-2 reference into citation-discipline.md
- W134-F9 candidate: deep-read 3-5 most-relevant agent prompts to extract Anthropic-canonical
  patterns for eee's own skill/agent authoring (e.g., `agent-prompt-claude-guide-agent.md`,
  `agent-prompt-claudemd-creation.md`, `agent-prompt-coding-session-title-generator.md`)

## Mia ladder advance

n=945 → n=949 (+4: MIT verified / v2.1.137 verified / 10+ agent-prompt inventory verified /
per-CC-release sync velocity verified)
