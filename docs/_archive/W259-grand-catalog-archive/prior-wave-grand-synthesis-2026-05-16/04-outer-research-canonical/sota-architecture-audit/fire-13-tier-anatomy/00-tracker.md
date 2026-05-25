# Wave 134 Fire 13 — Tier Anatomy + Verified-Avoid + Coverage Final

> **Folder**: `Z:/claude-sota-installed/docs/sota-architecture-audit/fire-13-tier-anatomy/`
> **Created**: 2026-05-10 post-Fire-12 (commit `38d3976`)
> **Driver**: continuation of user directive — extend with line-by-line A1 anatomies
> on top Fire 12 NEW candidates + codify fresh-paint REJECT discipline

## Arc state at Fire 13 open

**Fire 12 close** (commit `38d3976`):
- 654 raw / 616 TRUE-repo baseline
- 99.84% TRUE-baseline strict A1+A2 (615/616)
- 10 NEW Fire 12 Tier candidates flagged for STUDY-PILOT
- 1 fresh-paint REJECT (nextlevelbuilder/ui-ux-pro-max-skill) confirmed
- Mia ladder n=1180

## Fire 13 mission

**Three tasks**:
1. **A1 strict line-by-line anatomies** on 3 highest-impact Fire 12 NEW candidates
2. **ARIS pattern deep-dive** for cross-model adversarial research pattern extraction
3. **Verified-avoid codification** for the fresh-paint REJECT

## Fire 13 targets (4 deep-dives)

| # | Repo | HEAD | Stars | License | Fire 13 verdict |
|---|---|---|---|---|---|
| 1 | Fission-AI/OpenSpec | 053d8a59 | 46,692 | MIT | DEFER vs spec-kit (less mature, REIMPLEMENTATION in progress, empty AGENTS.md) |
| 2 | VectifyAI/PageIndex | f50e5297 | 30,416 | MIT | 🔬 STUDY-PILOT Tier-3 L4 document-RAG (vectorless novel architecture) |
| 3 | letta-ai/letta | bb52a890 | 22,607 | Apache-2.0 | 🔬 STUDY-PILOT with caveat (memberships of MemGPT lineage; PostgreSQL backend complexity) |
| 4 | wanshuiyin/Auto-claude-code-research-in-sleep (ARIS) | 5725459e | 8,704 | MIT | 📚 CITE-PATTERN (extract effort-knob + difficulty-knob patterns) |

## Fire 13 deliverables

| # | File | Purpose | Status |
|---|---|---|---|
| 00 | `00-tracker.md` | This file | ✓ |
| 01 | `01-openspec-anatomy.md` | OpenSpec line-by-line (DEFER) | ✓ |
| 02 | `02-pageindex-anatomy.md` | PageIndex line-by-line (STUDY-PILOT) | ✓ |
| 03 | `03-letta-anatomy.md` | letta line-by-line (STUDY-PILOT-caveat) | ✓ |
| 04 | `04-aris-anatomy.md` | ARIS line-by-line (CITE-PATTERN) | ✓ |
| 05 | `05-verified-avoid-update.md` | Cohort 3 fresh-paint REJECT codification | ✓ |
| 06 | `06-final-coverage-tracker-v7.md` | Post-Fire-13 coverage | PENDING |

## Fire 13 key findings

### Top architectural finding: PageIndex fills a GAP

PageIndex is a **VECTORLESS** RAG primitive — AlphaGo-inspired tree-reasoning over
hierarchical document index. eee's existing L1 sqlite_vec + L3 Graphiti stack handles
conversation-memory + temporal-KG but has NO long-document reasoning primitive.
PageIndex **complements** (not replaces) the existing stack.

### Letta MemGPT lineage = highest provenance signal

Letta = formerly MemGPT (Berkeley academic project). Apache-2.0. Pioneered "agent
memory beyond context window" paradigm cited in Anthropic + OpenAI literature.
22k★ + sustained release cadence. DEFER for now (3rd memory backend adds complexity)
but re-evaluate when explicit demand surfaces.

### OpenSpec is NOT spec-kit replacement

OpenSpec has 46k★ vs spec-kit's 95k★. spec-kit's documentation (782-LOC README +
392-LOC AGENTS.md) materially deeper than OpenSpec's (206-LOC README + EMPTY AGENTS.md).
OpenSpec currently in WORKSPACE_REIMPLEMENTATION — unstable architecture. DEFER until
mature.

### ARIS = STRONG-CONVERGENCE for ML research vertical

ARIS has 7-of-10 direct architectural parallels with eee (Auto Research Loop = /loop;
Research Wiki = Karpathy 3-layer; Meta-Optimize = CR-11; cross-model adversarial = T1-T7;
human-checkpoint + AUTO_PROCEED = eee auto-proceed-gate). CITE-PATTERN extraction:
introduce `effort: lite/balanced/max/beast` tunable-effort parameter to eee dispatch
discipline.

### Fresh-paint REJECT codification

`nextlevelbuilder/ui-ux-pro-max-skill` (76k★) REJECT codified as Cohort 3 entry in
`docs/verified-avoid.md` (proposed introduction). Density 0.0517 KB/★ (10× below
threshold) + vendor-spam topics + vanity domain = confirmed fresh-paint anti-pattern.

## Mia ladder

n=1180 (Fire 12) → n=1200 (target Fire 13 close) = +20 verifications.
