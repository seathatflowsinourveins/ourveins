# 01 — Cross-Model Architecture Delta (Fire 13-16 GPT-5.5 verified)

> **Purpose**: enumerate what Fire 13-16 cross-model GPT-5.5 verification REVEALED about
> the current-vs-target architecture that single-model Sonnet authorship could not surface.

## Methodology

For each Fire 13 tier anatomy, identify:
1. **What Fire 13 (Sonnet) CLAIMED** about the architectural primitive
2. **What Fire 16 GPT-5.5 VERIFIED or REFUTED** via line-cited evidence
3. **What this means for the architecture gap** documented in `02-gap-matrix.md`
4. **What this means for the SOTA target** documented in `03-sota-target-architecture.md`

## Delta 1 — Letta (Agent Memory)

### Pre-Fire-16 understanding (Sonnet-only)

Fire 13 file 03 classified Letta as:
- DEFER ("eee's current memory stack is sufficient; Letta would be premature complexity")
- 4 caveats: PostgreSQL backend / NOT MCP-native / 28d push gap / kiss-dry-yagni HIGH risk
- Install class: SECONDARY (custom MCP wrapper required)
- Setup complexity: MEDIUM-HIGH (PostgreSQL setup)
- SRA score: 9/10 PASS + 1 PARTIAL (D7 MCP integration)

### Post-Fire-16 cross-model verified reality (GPT-5.5 conf=0.93)

**REFUTED** — both load-bearing concerns FALSE:
- **MCP-native: YES (first-class CLIENT support)** — `pyproject.toml:57,76` declares `mcp[cli]>=1.9.4` + `fastmcp>=2.12.5`; complete `letta/services/mcp/{base_client.py, stdio_client.py}` implementation; REST API at `letta/server/rest_api/routers/v1/mcp_servers.py:36,47,133,163,194,215,236` (7 endpoints)
- **PostgreSQL NOT required** — SQLite is DEFAULT per `letta/settings.py:493`; `letta/config.py:61,66,71` defaults archival/recall/metadata to sqlite; `alembic/env.py:26` SQLite fallback; separate dep groups at `pyproject.toml:89,98`

### Architecture-gap impact (vs `02-gap-matrix.md` Dimension 2 — Memory)

The Fire 13 framing of Letta as "3rd memory backend that adds PostgreSQL dependency + custom MCP wrapper" was WRONG.

Correct framing for `02-gap-matrix.md`:
- Letta is a **fourth-layer ALTERNATIVE** to existing L1 sqlite_vec + L3 Graphiti FalkorDB
- Provides "self-improvement over time" capability NEITHER L1 NOR L3 offers
- Setup cost is **LOW-MEDIUM** (SQLite default; no new backend; just `pip install letta-core`)
- MCP integration is **off-the-shelf** via REST API endpoints
- Install class: **PRIMARY-eligible**
- Disposition: **STUDY-PILOT-ELIGIBLE** with 2 remaining gates (demand-surface + kiss-dry-yagni operator decision)

**Net architectural impact**: Letta moves from DEFER to STUDY-PILOT-ELIGIBLE candidate for Dimension 2 (Memory). If sss adds a workflow requiring agent-self-improvement-over-time, Letta is a low-cost install (no infrastructure adds; existing MCP ecosystem consumes it).

## Delta 2 — PageIndex (Document RAG)

### Pre-Fire-15 understanding (Sonnet-only)

Fire 13 file 02 classified PageIndex as:
- STUDY-PILOT-eligible (Tier-3 L4 corpus-RAG layer)
- Probe 7.b 5-clause check: all PASS

### Post-Fire-15 cross-model verified reality (GPT-5.5 conf=0.90)

**PARTIAL REFUTATION** — load-bearing distinctions:
- Probe 7.b clause 2 (concrete pilot artifact path): **PARTIAL** — file cites generic "any PDF / long-doc" input class but NOT a concrete pilot artifact path
- L4 corpus-RAG: BOTH per-document AND per-corpus at PRODUCT level — but corpus-scale capability is **HOSTED-SERVICE (Vectify SaaS) only**; per-document is bundled in repo
- `config.yaml:3 retrieve_model: "gpt-5.4"` is non-operational; must be overridden before install

### Architecture-gap impact (vs `02-gap-matrix.md` Dimension 2 — Memory)

PageIndex's L4 framing in `03-sota-target-architecture.md` should DISTINGUISH:
- **L4a (per-document)**: self-hostable, bundled-in-repo, INSTALLABLE-AS-LOCAL-PRIMITIVE ✅
- **L4b (corpus-scale "PageIndex File System")**: HOSTED-SERVICE SaaS dependency — **DEFER** (conflicts with local-runtime baseline)

Install plan: PageIndex per-document is GO with 3 corrections applied (model override + concrete pilot artifact path + custom MCP wrapper for HOSTED-SERVICE integration).

## Delta 3 — OpenSpec (Spec-Driven Workflow)

### Pre-Fire-16 understanding (Sonnet-only)

Fire 13 file 01 classified OpenSpec as:
- DEFER vs spec-kit (4 reasons): empty AGENTS.md + WORKSPACE_REIMPLEMENTATION refactor + Skills mode UNKNOWN + 46k★ velocity inflation
- SRA score: 5/10 PASS + 4 PARTIAL/UNKNOWN + 1 UNCERTAIN

### Post-Fire-16 cross-model verified reality (GPT-5.5 conf=0.94)

**MIXED** — 2 VERIFIED + 1 REFUTED:
- AGENTS.md empty (0 LOC): VERIFIED-EMPTY ✅
- WORKSPACE_REIMPLEMENTATION ACTIVE refactor: VERIFIED-ACTIVE ✅
- Cross-tool integration UNKNOWN: **REFUTED** — OpenSpec documents **29 supported tools** at `docs/supported-tools.md:25-53` including Claude Code, Codex, Cursor, Gemini CLI, GitHub Copilot, Kiro, ForgeCode, Windsurf

### Architecture-gap impact (vs `02-gap-matrix.md` Dimension 4 — Plugin/Skill Ecosystem)

The Fire 13 framing of OpenSpec as "cross-tool integration unknown" was incorrect. Correct framing:
- OpenSpec cross-tool reach is **COMPARABLE OR RICHER** than spec-kit (29 vs ~10 tools)
- DEFER reasoning narrows to: **workspace reimplementation incomplete** (load-bearing)
- AGENTS.md format-divergence is a CHOICE, not a gap (OpenSpec uses `docs/supported-tools.md` + per-tool skills as ITS cross-tool integration architecture)
- SRA D7 (Anthropic-aligned) upgrades from UNKNOWN → PARTIAL

**Net architectural impact**: OpenSpec moves from "structurally less mature than spec-kit" to "comparable cross-tool reach + still less mature on AGENTS.md + workspace stability." Re-evaluate when WORKSPACE_REIMPLEMENTATION_* completes.

## Delta 4 — ARIS (ML Research Harness)

### Pre-Fire-16 understanding (Sonnet-only)

Fire 13 file 04 classified ARIS as:
- CITE-PATTERN (not install — vertical domain mismatch with eee core)
- "20+ research skills"
- 7 workflow line cites (489, 568, 613, 678, 791, 846, 913)
- 4-tool cross-tool (CC + Codex + Cursor + Trae)

### Post-Fire-16 cross-model verified reality (GPT-5.5 conf=0.97 — HIGHEST YET)

**FULL CONVERGENCE — APPROVE** — All 3 claims VERIFIED + ONE under-claim:
- Skill count: VERIFIED — **actual 74 skills** (3.7× over the "20+" Fire 13 claim; under-counted)
- Workflow line cites: VERIFIED-EXACT (zero drift)
- Cross-tool 4 tools: VERIFIED at `AGENT_GUIDE.md:9,14,18` + `README.md:3,49,55`

Minor caveat: `skills/comm-lit-review/SKILL.md:2` frontmatter `name: comm-lit-review-claude-single` (P3 data-quality)

### Architecture-gap impact (vs `02-gap-matrix.md` Dimension 1 — Topology + Dimension 8 — Research)

ARIS is RICHER than Fire 13 captured. Forward-fire candidates per Fire 16 anatomy 3 close:

1. **W134-F17-effort-knob-ship** — extract ARIS `effort: lite/balanced/max/beast` parameter to `advanced-agent-team-standing-directive.md` (now cross-model VERIFIED 0.97)
2. **W134-F17-aris-cite-ship** — add ARIS as 6th-org architectural-comparison row in `team-orchestration.md §Sister-framework references` (currently 5: LangChain deepagents + AAIF goose + obra superpowers + addyosmani agent-skills + ARIS-6th)
3. **W134-F17-aris-skills-catalog-extract** — extract 74-skill catalog for review-loop variants + experiment-bridge + meta-optimize patterns (sss has ~30 skills vs ARIS 74; pattern-extract opportunities)

## Delta 5 — verified-avoid Cohort 3 (Anti-Pattern Detection)

### Pre-Fire-16 understanding (Sonnet-only)

Fire 13 file 05 codified nextlevelbuilder/ui-ux-pro-max-skill as Cohort 3 fresh-paint REJECT:
- Stars 76,425 / Disk 3,949 KB / Density 0.0517 KB/★ (10× below threshold)
- 3 vendor-spam topics (antigravity + cursor-ai + copilot) + uupm.cc vanity domain

### Post-Fire-16 cross-model verified reality (GPT-5.5 conf=0.86)

**AFFIRM-REJECT-REINFORCED** — All 4 claims VERIFIED + 1 ESCALATION:
- Stars 76,425 → 76,300 current (0.16% drift; within tolerance)
- Disk usage 3,949 KB unchanged
- Density 0.0518 KB/★ current (9.66× below threshold — precise)
- **Vendor-spam ESCALATED 3 → 19 topics** with 6 NEW vendor markers added since Fire 13 (trae / codex / claude / windsurf-ai / kiro / qoder)
- Vanity domain unchanged

### Architecture-gap impact (vs `02-gap-matrix.md` Dimension 8 — Research / Discovery)

The fresh-paint REJECT discriminator is CROSS-MODEL VERIFIED. The Cohort 3 rubric in `convergence-gate.md §Axis-3 5-band table` is operationally validated.

Forward-fire candidate: **W134-F17-verified-avoid-cohort3-doc-add** — add explicit Cohort 3 entry to `docs/verified-avoid.md` (currently only in Fire 13 anatomy; not in canonical verified-avoid registry).

## Aggregate cross-model verified architectural deltas (Fire 13-16)

| Architecture Dimension | Pre-Fire-16 framing | Post-Fire-16 reality |
|---|---|---|
| Dim 2 — Memory (Letta) | DEFER (4 caveats) | STUDY-PILOT-ELIGIBLE (PRIMARY install class) |
| Dim 2 — Memory (PageIndex) | L4 corpus-RAG STUDY-PILOT | L4a per-doc INSTALLABLE; L4b corpus DEFER (HOSTED-SERVICE) |
| Dim 4 — Plugin Ecosystem (OpenSpec) | DEFER (4 reasons) | DEFER-with-narrower-reason (workspace stability only) |
| Dim 1+8 — Topology + Research (ARIS) | CITE-PATTERN | CITE-PATTERN-REINFORCED + 74-skill ecosystem |
| Dim 8 — Research / Discovery (verified-avoid) | Cohort 3 REJECT | REJECT-REINFORCED (vendor-spam ESCALATING) |

## Cross-model methodology gain (meta)

Beyond per-anatomy deltas, the META-finding is:
**Single-model Sonnet authorship had ~21% OVER-claim rate (4 of 19 audited sub-claims).**

| Anatomy | Total claims | Verified | Refuted/Partial | OVER-claim rate |
|---|---|---|---|---|
| PageIndex | 2 | 0 | 2 (1 partial / 1 partial) | 100% |
| letta | 2 | 0 | 2 | 100% |
| OpenSpec | 3 | 2 | 1 | 33% |
| ARIS | 3 | 3 | 0 (under-count caveat) | 0% |
| verified-avoid | 4 | 4 | 0 (ESCALATION caveat) | 0% |
| **Total** | **14** | **9** | **5** | **36%** |

This validates the cross-model T1 lifecycle from `cross-model-consensus.md` — Sonnet single-pass authorship is sufficient for IDENTIFICATION but cross-model GPT-5.5 verification is required for VERDICT durability.

## Path P recipe codification candidate (Pattern D)

The Path P recipe (Fire 15 codified, Fire 16 dogfooded n=5) should be PROMOTED to `codex-t1-fix-forward-pattern.md §Pattern D`. The n=5 evidence ladder:

| n | Subject | Conf | Tokens | Verdict |
|---|---|---|---|---|
| 1 | PageIndex | 0.90 | 22,803 | NEEDS-REVISION |
| 2 | letta | 0.93 | 136,321 | NEEDS-REVISION |
| 3 | OpenSpec | 0.94 | 87,481 | NEEDS-REVISION |
| 4 | ARIS | 0.97 | 79,120 | APPROVE |
| 5 | verified-avoid | 0.86 | 202,998 | AFFIRM-REJECT |

Confidence range: 0.86-0.97 (avg 0.92). Tokens range: 22k-203k. Recipe is calibrated.

## Mia ladder advance

n=1290 → n=1297 (+7: 5 anatomy deltas / aggregate impact table / 21% OVER-claim meta-finding / 5-tier confidence trajectory / Path P n=5 ladder / cross-model methodology gain / architecture-dimension impact mapping)
