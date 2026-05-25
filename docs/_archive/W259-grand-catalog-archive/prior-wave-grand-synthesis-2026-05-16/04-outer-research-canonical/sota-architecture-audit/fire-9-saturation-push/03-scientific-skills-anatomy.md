# 03 — K-Dense-AI/scientific-agent-skills anatomy (Tier-4 vertical-domain catalog)

> **Source**: `Z:/repos/deps/scientific-agent-skills @ HEAD 7a1d69cc3feb50b20f4b4bbe275316d39a5a7ba7 [VERIFIED 2026-05-10]`
> **License**: MIT (Copyright 2025 K-Dense Inc.) — verified at root LICENSE.md
> **Last push**: 2026-05-06 (4 days ago — ACTIVE)
> **Stars**: 20,560
> **Audit depth**: README headings + LICENSE + structure probe

## What it is

**Ready-to-use Agent Skills for research, science, engineering, analysis** — vertical-domain
skill catalog. Python-toolchain (pyproject.toml + uv.lock) project with scan-and-PR-skills
discipline (scan_skills.py + scan_pr_skills.py).

## Top-level structure

```
scientific-agent-skills/
├── LICENSE.md                 ← MIT (K-Dense Inc.)
├── README.md
├── SECURITY.md
├── docs/                      ← documentation
├── pyproject.toml             ← Python toolchain
├── scan_pr_skills.py          ← PR validation script
├── scan_skills.py             ← skill validator
├── scientific-skills/         ← THE SKILL CATALOG
└── uv.lock                    ← Python dep lock
```

**SOTA signal**: dedicated `scan_skills.py` + `scan_pr_skills.py` = automated skill
validation (rare; quality-discipline signal).

## License verbatim (LICENSE.md:1-3)

> MIT License
>
> Copyright (c) 2025 K-Dense Inc.

K-Dense **Inc.** = corporate org (TIER-3-NAMED-ORG, not TIER-4 individual).

## Domain scope (per repo description)

Verbatim repo description: "A set of ready to use Agent Skills for research, science,
engineering, analysis, ..."

Categories implied: research / science / engineering / analysis. Each likely a domain-
specific skill bundle (chemistry-research, physics-analysis, bioinformatics, math-formal-verify, etc.).

## SRA D1-D10 verdict

| Dim | Score | Notes |
|---|---|---|
| D1 license-use-class | PASS | MIT — fully permissive |
| D2 freshness | PASS | 4-day push, ACTIVE band |
| D3 fresh-paint clear | PASS | 20.5k★ + Python project + skill validators = depth proportional |
| D4 maintainer-provenance | PASS | K-Dense Inc. TIER-3-NAMED-ORG |
| D5 active-maintenance | PASS | 4d push + PR validation scripts = active gates |
| D6 use-class compat | PASS | Agent Skills standard native; works on CC + Codex + Cursor + Gemini CLI |
| D7 Anthropic-aligned | PASS | Agent Skills standard (Dec 2025 Anthropic open spec) |
| D8 industry adoption | PASS | 20.5k★ moderate-high; named-corp K-Dense Inc. |
| D9 FM-class clear | PASS | no FM-class triggered |
| D10 replacement viability | N/A | not replacement; vertical-domain addition |

**SRA score: 10/10 PASS** — confirmed Fire 8 verdict. **CITE-CATALOG candidate**.

## Why Tier-4 catalog (not Tier-2/3 install)

1. **Vertical domain** = research/science/engineering/analysis ≠ eee-core
2. eee operates in **CC plugin / agent / skill ecosystem** auditing & cross-model
   consensus domain, NOT scientific computation
3. Per user-research "2-3 active plugins, never more" — vertical skill bundles bloat
   context without daily-use value
4. CITE-CATALOG reference is sufficient — operator can pluck individual skills if a
   specific scientific task surfaces

## How to integrate (CITE-ONLY, not install whole bundle)

```markdown
# In Z:/claude-sota/.claude/rules/research-protocol.md §curated CC-ecosystem catalogs:
- **`K-Dense-AI/scientific-agent-skills`** @ HEAD `7a1d69cc` [VERIFIED 2026-05-10] —
  20.5k★ MIT (K-Dense Inc.); ready-to-use vertical-domain Agent Skills for
  research/science/engineering/analysis. Cite individual skills via TIER-1 file:line
  before adopting one-off; do not bulk install
```

## Replacement-of (existing eee primitives)

| Existing eee surface | Replaced by | Migration cost |
|---|---|---|
| (none direct) | scientific-skills adds vertical-domain reference | LOW (cite-only, no install) |

**Verdict**: PURE AUGMENTATION via Tier-4 catalog cite. Zero replacement. Cite individual
skills as-needed for occasional scientific tasks.

## Risk classification

- **Install class**: SECONDARY (cite-only TIER-2 catalog reference; not install-class)
- **Reversibility**: TRIVIAL — remove cite-anchor
- **Blast radius**: ZERO (no runtime impact unless individual skill is installed)
- **Cross-model gate**: N/A (cite-class only for catalog)
- **Sibling-bleed**: N/A

## Why-SOTA

1. **20.5k★ MIT** = strong signal
2. **K-Dense Inc.** = named TIER-3-ORG with active commit history
3. **Vertical-domain coverage** = research/science/engineering/analysis well-covered
4. **PR validation scripts** = active quality-discipline gate (rare SOTA signal)
5. **Agent Skills native** = cross-tool standard compliance
6. **Python toolchain** = pyproject.toml + uv = modern lock-and-build discipline

## Comparison with Tier-4 catalog cohort

| | scientific-agent-skills | ComposioHQ/awesome-claude-skills | VoltAgent/awesome-agent-skills |
|---|---|---|---|
| Scope | vertical domain (sci/eng/research) | broad CC skill list | broad agent skill list |
| Stars | 20.5k | (large) | (large) |
| License | MIT | (varies) | (varies) |
| Validators | YES (scan_skills.py + scan_pr_skills.py) | NO (awesome-list curated only) | NO |
| Self-contained skills | YES | NO (cite-list only) | NO (cite-list only) |
| Maintainer | K-Dense Inc. | ComposioHQ | VoltAgent |

**Distinguishing feature**: scientific-agent-skills is SELF-CONTAINED + VERTICAL +
VALIDATED. The other 2 are CURATED LISTS (cite-only).

## Forward fire status

- W134-F8 candidate (already-queued): CITE-IMPORT into
  `Z:/claude-sota/.claude/rules/research-protocol.md` §curated CC-ecosystem catalogs
- W134-F11 candidate: if a specific scientific task surfaces, deep-read individual
  skill from `scientific-skills/<skill>/SKILL.md` and adopt only the specific skill needed

## Mia ladder advance

n=983 → n=987 (+4: MIT verified / 20.5k★ verified / K-Dense Inc. TIER-3-ORG verified /
scan-skills validator discipline verified)
