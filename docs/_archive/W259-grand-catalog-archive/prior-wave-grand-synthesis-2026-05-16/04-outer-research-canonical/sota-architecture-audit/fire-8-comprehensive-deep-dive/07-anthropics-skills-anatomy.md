# 07 — anthropics/skills anatomy (Tier-0 foundation — Anthropic-OFFICIAL skills source)

> **Source**: `Z:/repos/deps/anthropics-skills @ HEAD f458cee31a7577a47ba0c9a101976fa599385174 [VERIFIED 2026-05-10]`
> **License**: MIXED (NO root LICENSE file; per-skill license clarified in README)
> **Last push**: 2026-05-08 (2 days ago — VERY ACTIVE)
> **Stars**: 131k+ (Anthropic OFFICIAL — TIER-1)
> **Audit depth**: README.md + spec/agent-skills-spec.md + skill-creator/SKILL.md head + structure probe

## ⚠️ Fire 6 license-classification correction (CR-9 dogfood)

Fire 6 classified `anthropics/skills` as "TRULY-UNLICENSED" because there is no
root LICENSE file. **This is partially wrong** per README:23-25:

> Many skills in this repo are **open source (Apache 2.0)**. We've also included
> the document creation & editing skills ... in `skills/docx`, `skills/pdf`,
> `skills/pptx`, and `skills/xlsx` subfolders. These are **source-available, not
> open source**.

**Corrected classification**:
- Most skills: **Apache 2.0** (open source, install-class admissible)
- docx/pdf/pptx/xlsx: **source-available** (read-and-reference, no fork-modify-redistribute)
- Root repo: NO LICENSE file → license-by-attestation-per-skill

**CR-1 admissibility** for individual skills is per-skill, not blanket REJECT.
The Anthropic-OFFICIAL marketplace install path mediates this elegantly.

## The Agent Skills standard (NOT in this repo)

`spec/agent-skills-spec.md` is a REDIRECT-ONLY stub:

```
# Agent Skills Spec

The spec is now located at <https://agentskills.io/specification>
```

The actual normative spec lives at **agentskills.io/specification** — this is the
**canonical Anthropic Agent Skills standard URL** (Dec 2025 open spec).

## What this repo IS

Per README: "skills that demonstrate what's possible with Claude's skills system".
17 reference skills + 1 template + 1 spec-redirect:

| Category | Skills |
|---|---|
| Creative & Design | algorithmic-art, canvas-design, slack-gif-creator, theme-factory, web-artifacts-builder |
| Development & Technical | claude-api, frontend-design, mcp-builder, skill-creator, webapp-testing |
| Enterprise & Communication | brand-guidelines, doc-coauthoring, internal-comms |
| Document (source-available) | docx, pdf, pptx, xlsx |

## Install path — the OFFICIAL Anthropic marketplace (CR-6 canonical)

Per README:48-65 — this repo registers as a **Claude Code Plugin marketplace**:

```bash
/plugin marketplace add anthropics/skills
```

Then install one of TWO plugins:

```bash
/plugin install document-skills@anthropic-agent-skills    # docx/pdf/pptx/xlsx (source-available)
/plugin install example-skills@anthropic-agent-skills     # Apache 2.0 examples
```

After install, invoke by mention: *"Use the PDF skill to extract..."* — Claude auto-discovers
via skill description matching per Anthropic CC `https://code.claude.com/docs/en/skills`.

## skill-creator (the skill-authoring loop primitive)

`skills/skill-creator/SKILL.md` — Anthropic-canonical skill-authoring discipline:

1. Decide what the skill should do + roughly how
2. Write a draft
3. Create test prompts + run claude-with-access-to-the-skill
4. Evaluate qualitatively AND quantitatively
   - Draft quant evals if absent; explain to user
   - Use `eval-viewer/generate_review.py` script to show user results
5. Rewrite based on user evaluation feedback + glaring flaws from quant benchmarks
6. Repeat until satisfied
7. Expand test set + try again at larger scale
8. Run skill description improver (separate script) for triggering-accuracy optimization

This is the **eval-first skill authoring methodology** — quantitative measurement before
shipping. Sister to the cross-model T1-T5 lifecycle in eee but at skill-authoring layer
not commit-layer.

## Agent Skills spec essence (from skill-creator + skills/* observable behavior)

Per the redirect-target spec + skill files in this repo:

**SKILL.md frontmatter (YAML)**:
- `name`: unique skill identifier
- `description`: triggering text (load-bearing — Anthropic-discovery uses description matching)
- (optional fields per `https://code.claude.com/docs/en/skills`)

**Loading pattern**: ~100 tokens loaded at session start (frontmatter only); full body
loaded on-demand when description matches user task (progressive disclosure).

## SRA D1-D10 verdict

| Dim | Score | Notes |
|---|---|---|
| D1 license-use-class | PASS (per-skill, not blanket) | Apache 2.0 majority + source-available for documents |
| D2 freshness | PASS | 2-day push, ACTIVE band |
| D3 fresh-paint clear | PASS | 131k★ over 4+ months, depth proportional |
| D4 maintainer-provenance | PASS | Anthropic OFFICIAL TIER-1 (highest possible) |
| D5 active-maintenance | PASS | README updates 2 days ago + plugin-marketplace integration |
| D6 use-class compat | PASS | OFFICIAL CC plugin marketplace = canonical install path |
| D7 Anthropic-aligned | PASS | This IS Anthropic-aligned (it's Anthropic's repo) |
| D8 industry adoption | PASS | 131k★ + adopted-as-standard by Codex/Cursor/Gemini CLI/Antigravity/Windsurf |
| D9 FM-class clear | PASS | no known FM-class triggered |
| D10 replacement viability | N/A | foundational — not replacing anything |

**SRA score: 10/10 PASS** — TIER-0 foundation primitive.

## Why-SOTA — the canonical authority

1. **Anthropic OFFICIAL marketplace** — `/plugin marketplace add anthropics/skills` is the
   single-command install path that respects per-skill licensing
2. **Agent Skills standard birthplace** — Dec 2025 open spec NOW adopted by Codex / Cursor /
   Gemini CLI / Antigravity / Windsurf (per user-research synthesis)
3. **skill-creator** = Anthropic-canonical skill-authoring methodology with quant evals
4. **17 reference skills** = pattern-extraction source for any custom skill design
5. **Source-available docx/pdf/pptx/xlsx** = production-grade document-handling skills
   used in Claude's official document capabilities

## Replacement-of (existing eee primitives)

| Existing eee surface | Replaced by | Migration cost |
|---|---|---|
| `.claude/plugins/marketplaces/claude-plugins-official/` (already INSTALLED Tier-0) | OVERLAPS with `anthropics/skills` marketplace; verify if `claude-plugins-official` IS this repo OR a superset | LOW probe cost (Mia required) |
| Custom skill-authoring discipline | Replace with `skill-creator` Anthropic-canonical | LOW (additive) |

**Verdict**: requires Mia probe to determine if `claude-plugins-official` and
`anthropics/skills` overlap. If they're the same, this is already INSTALLED. If different,
install via marketplace + use `skill-creator` skill.

## Risk classification

- **Install class**: PRIMARY (cardinal-rule-6 canonical — `/plugin marketplace add` is the
  Anthropic-canonical install path; not git clone)
- **Reversibility**: HIGH — `/plugin uninstall` or marketplace removal
- **Blast radius**: LOW per-plugin (document-skills + example-skills install individually)
- **Cross-model gate**: required before commit (CR-3)
- **Sibling-bleed**: N/A
- **License per-skill verification**: REQUIRED — verify each skill's individual LICENSE
  before adopting

## Forward fire status

- W134-F8 candidate: Mia probe — verify if `anthropics/skills` marketplace overlaps with
  existing `claude-plugins-official` install at `.claude/plugins/marketplaces/`
- If non-overlapping: install one or both plugins via `/plugin install ...@anthropic-agent-skills`
- W134-F9 hygiene: file upstream issue re NO ROOT LICENSE FILE (Fire 6 finding) —
  Anthropic-OFFICIAL repo should clarify root license-by-attestation

## Mia ladder advance

n=935 → n=940 (+5: license per-skill correction / agent-skills-spec.md redirect verified /
marketplace install path verified / skill-creator methodology verified / 17-skill inventory verified)
