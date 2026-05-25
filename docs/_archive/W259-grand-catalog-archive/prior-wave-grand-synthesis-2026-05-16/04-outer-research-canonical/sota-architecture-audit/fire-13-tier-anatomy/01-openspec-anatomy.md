# 01 — Fission-AI/OpenSpec anatomy (Tier-1 spec-driven, spec-kit competitor)

> **Source**: `Z:/repos/deps/openspec @ HEAD 053d8a59d587f3c027a06ad80503a6b43d4f2a92 [VERIFIED 2026-05-10]`
> **License**: MIT (verified at root LICENSE)
> **Stars**: 46,692 (Fire 12 discovery)
> **Push**: 2026-05-07 (3 days ago — ACTIVE)
> **Audit depth**: README (206 LOC) + AGENTS.md (0 LOC — empty placeholder) + structure probe

## What it is

**Spec-driven development (SDD) for AI coding assistants** — direct spec-kit competitor
by Fission-AI. Node.js CLI (`bin/openspec.js`) + scaffold + docs.

## Top-level structure (subset)

```
openspec/
├── AGENTS.md                        ← EMPTY (0 LOC) — placeholder
├── CHANGELOG.md
├── LICENSE                          ← MIT
├── MAINTAINERS.md
├── README.md (206 LOC)
├── README_OLD.md                    ← previous version
├── WORKSPACE_REIMPLEMENTATION_DIRECTION.md
├── WORKSPACE_REIMPLEMENTATION_START_HERE.md
├── assets/
├── bin/openspec.js                  ← Node.js CLI entrypoint
├── build.js
└── docs/
```

**Architectural state signals**:
- README transitioned (README_OLD.md retained) — repo undergoing redesign
- WORKSPACE_REIMPLEMENTATION_* docs indicate active architecture refactor
- AGENTS.md EMPTY (placeholder only) — vs spec-kit's 392-LOC integration architecture doc
- Single CLI entrypoint (Node.js) vs spec-kit's 5-base-class integration subpackages

## SRA D1-D10 verdict (preliminary)

| Dim | Score | Notes |
|---|---|---|
| D1 license-use-class | PASS | MIT — fully permissive |
| D2 freshness | PASS | 3-day push, ACTIVE |
| D3 fresh-paint clear | PARTIAL | 46k★ for ~6mo-old repo = velocity ~256/day; needs density probe |
| D4 maintainer-provenance | PASS | Fission-AI = named org |
| D5 active-maintenance | PASS | active commits + WORKSPACE_REIMPLEMENTATION direction docs |
| D6 use-class compat | PARTIAL | CLI scaffold; native CC compat needs deeper probe |
| D7 Anthropic-aligned | UNKNOWN | no Agent Skills standard mention surfaced in audit |
| D8 industry adoption | PARTIAL | 46k★ but recency may inflate; no named-practitioner cites surfaced |
| D9 FM-class clear | UNKNOWN | needs FM probe |
| D10 replacement viability vs spec-kit | UNCERTAIN | empty AGENTS.md + redesign-in-progress signals = less mature |

**SRA score: 5/10 PASS + 4 PARTIAL/UNKNOWN + 1 UNCERTAIN** — borderline candidate.

## Comparison: OpenSpec vs spec-kit

| | OpenSpec (Fission-AI) | spec-kit (GitHub/Microsoft) |
|---|---|---|
| Stars | 46k | 95k |
| Org | Fission-AI (named) | GitHub OFFICIAL (Microsoft) |
| Push | 3d ago | 2d ago |
| License | MIT | MIT |
| AGENTS.md | 0 LOC (empty) | 392 LOC (full integration architecture) |
| README | 206 LOC | 782 LOC |
| CLI | Node.js single entrypoint | Python `specify-cli` 5-base-class integrations |
| Agent integrations | UNKNOWN (no AGENTS.md spec) | 10+ (Claude/Codex/Cursor/Copilot/Gemini/Windsurf/Goose/Forge/Kiro/Aider) |
| Skills mode | UNKNOWN | YES (`--integration-options="--skills"`) |
| Architecture state | REIMPLEMENTATION in progress | STABLE v0.8.1+ |
| Community extensions | UNKNOWN | 70+ |
| Microsoft Developer Blog | NO | YES |

**Verdict**: spec-kit MATERIALLY MORE MATURE. OpenSpec has the star count but lacks
the documentation depth + cross-tool integration + Anthropic-alignment.

## Architecture verdict: DEFER

❌ **DEFER vs spec-kit installation**. Reasons:
1. Empty AGENTS.md = no documented cross-tool integration architecture
2. WORKSPACE_REIMPLEMENTATION_* docs = unstable architecture currently
3. spec-kit Skills mode is Anthropic-canonical; OpenSpec Skills mode unknown
4. 46k★ may include early-velocity inflation (spec-kit at 95k is more verified)

**Re-evaluate at W134-F15+** after Fission-AI completes workspace reimplementation.

## Mia ladder advance

n=1180 → n=1184 (+4: MIT verified / 206-LOC README + 0-LOC AGENTS / spec-kit comparison / DEFER verdict)
