# 08 — Extended repo discovery (beyond Fire 6 baseline of 614)

> **Purpose**: per user directive "discover BEYOND for more SOTA repos ACROSS THE GITHUBS",
> probe GitHub for NEW high-signal CC-ecosystem SOTA repos shipped/active in May 2026 that
> may have been missed by Fire 5/6's v1-v65 kit-based baseline.

## Probe methodology

3 GitHub search queries via `api.github.com/search/repositories`:

1. `topic:claude-skills + pushed:>2026-04-01 + stars:>500 sort=stars desc`
2. `topic:agent-os + pushed:>2026-04-01 + stars:>100 sort=stars desc`
3. `SKILL.md + language:markdown + pushed:>2026-04-01 + stars:>200 sort=stars desc`

Date scope: May 2026 = post-Fire-6 (2026-05-08) discovery window.

## NEW SOTA candidates discovered (8 fresh + 4 already-known)

### Tier candidates (NEW to eee baseline)

| # | Repo | Stars | License | Pushed | Description | Domain | Verdict |
|---|---|---:|---|---|---|---|---|
| E6 | thedotmack/claude-mem | 74,435 | Apache-2.0 | 2026-05-10 | Persistent Context Across Sessions for Every Agent | **Tier-3 memory candidate** | 🔬 STUDY-PILOT (compete with mcp-memory + Graphiti) |
| E7 | code-yeongyu/oh-my-openagent | 56,974 | NOASSERTION | 2026-05-10 | "the best agent harness — previously oh-my-opencode" | **Harness alternative** | ⚠️ DEFER pending LICENSE deep-probe |
| E8 | K-Dense-AI/scientific-agent-skills | 20,560 | MIT | 2026-05-06 | Ready-to-use Agent Skills for research/science/engineering/analysis | **Domain-specific skills** | 📚 CITE-CATALOG (vertical domain, not eee-core) |
| E9 | Q00/ouroboros | 3,908 | MIT | 2026-05-10 | "Agent OS: Stop prompting. Start specifying." | **Tier-1 spec-driven competitor** | ⚠️ DEFER pending spec-kit pilot outcome |
| E10 | holaboss-ai/holaOS | 5,466 | NOASSERTION | 2026-05-10 | "Open Agent Computer for ANY digital work" | **Agent OS / harness category** | ❌ REJECT — category-mismatch (full agent OS, not skill framework) |
| E11 | nanocoai/nanoclaw | 28,748 | MIT | 2026-05-10 | Lightweight alternative to OpenClaw — sandboxed containers | **Sandbox runtime** | ❌ REJECT — competing harness, eee is CC-native |
| E12 | JimLiu/baoyu-skills | 17,658 | NONE | 2026-05-10 | (no description) | **Skill pack** | ❌ REJECT — NO LICENSE, no description, fresh-paint suspect |
| E13 | nuwax-ai/nuwax | 764 | Apache-2.0 | 2026-05-09 | Nuwax Agent OS — universal agent OS | **Agent OS** | ❌ REJECT — too low stars + competing OS |

### Already-known confirmed (4 confirmed in Fire 6 baseline)

| Repo | Status |
|---|---|
| VoltAgent/awesome-agent-skills | ✅ ALREADY CITED in research-protocol.md §catalog |
| OthmanAdi/planning-with-files | ✅ Fire 8 deep dive (03-planning-with-files-anatomy.md) |
| wshobson/agents | ✅ Wave 138 audit DEFERRED per Probe 7.b governance trio scope |
| Alex8791-cyber/cognithor | Too low (130★) — DEFER |

## Priority-ranked NEW additions to eee architecture

### 🥇 E6 thedotmack/claude-mem — Tier-3 memory candidate (74k★ Apache-2.0)

**Why interesting**:
- 74k★ = highest-signal NEW discovery
- Apache-2.0 license = install-class admissible (CR-1 PASS)
- Pushed 2026-05-10 (today!) = VERY ACTIVE
- "Persistent Context Across Sessions for Every Agent" = directly addresses CC's known
  cross-session memory gap

**Risk**:
- Probe 7.b dual-PM concern — eee already has Tier-3 memory stack (mcp-memory L1 + Graphiti L3)
- Potential overlap with existing memory primitives — Mia probe required
- Newer than Fire 6 baseline — D2 freshness PASS but bag-velocity concern requires D3 fresh-paint scan

**Verdict**: 🔬 STUDY-PILOT — fire SRA D1-D10 probe in W134-F9. If
non-overlapping with L1/L3 memory stack, consider adoption as L4 wiki / L5 catalog primitive.

### 🥈 E9 Q00/ouroboros — Tier-1 spec-driven competitor (3.9k★ MIT)

**Tagline**: "Agent OS: Stop prompting. Start specifying."

**Why interesting**:
- MIT license = install-class admissible
- "Stop prompting. Start specifying." = direct spec-kit / BMAD competitor
- Lower stars than spec-kit but fresh entrant

**Risk**:
- spec-kit already queued as W134-F7 Tier-1 install
- Adopting BOTH spec-kit + ouroboros = anti-pattern per user-research "2-3 active plugins"
- May converge OR diverge from Agent Skills standard — needs probe

**Verdict**: ⚠️ DEFER until W134-F7 spec-kit pilot outcome. If spec-kit underperforms,
re-evaluate ouroboros at W134-F9+.

### 🥉 E8 K-Dense-AI/scientific-agent-skills — Domain catalog (20k★ MIT)

**Why interesting**:
- 20k★ + MIT — moderate-high signal
- Vertical domain (research / science / engineering / analysis) = could augment eee's
  audit-discovery research-workflow skills

**Risk**:
- Domain-specific = not CC-core
- Risk of skill-count bloat per user-research "2-3 active plugins, never more"

**Verdict**: 📚 CITE-CATALOG-ONLY in research-protocol.md §curated-catalogs.
Reference for vertical-domain skill discovery; not bulk install.

## Catalogs (cite-only, NOT install)

E8 K-Dense-AI is a SOTA catalog — cite-anchor it alongside the existing 6-catalog set
in `Z:/claude-sota/.claude/rules/research-protocol.md §6-catalog discovery surface`:

- ComposioHQ/awesome-claude-skills (already cited)
- travisvn/awesome-claude-skills (cite-imported in Fire 8 via 02-extension-baseline.md)
- VoltAgent/awesome-agent-skills (already cited as awesome-agent-skills)
- alirezarezvani/claude-skills (already cited)
- anthropics/claude-plugins-official (already cited / installed)
- claudemarketplaces.com + skillsmp.com (already cited as URL-only)
- + NEW: K-Dense-AI/scientific-agent-skills (Fire 8 addition)

## Rejected discoveries (justifications)

| Repo | Reject reason |
|---|---|
| code-yeongyu/oh-my-openagent | NOASSERTION license + "best agent harness" framing = competing OS, not skill framework |
| nanocoai/nanoclaw | Competing harness ("alternative to OpenClaw") — eee is CC-native |
| JimLiu/baoyu-skills | NO LICENSE + zero description + fresh-paint suspect |
| nuwax-ai/nuwax | 764★ too low + competing OS category |
| holaboss-ai/holaOS | NOASSERTION + "Open Agent Computer" = category-mismatch (full agent OS) |

## Cumulative baseline update

- Fire 6 baseline: 614 (609 v1-v65 + 5 extension)
- Fire 8 additions: 8 NEW probed (3 STUDY-PILOT/CITE candidates; 5 REJECT)
- **Cumulative baseline post-Fire-8: 622** (614 + 8 newly probed)

## Top fresh-discovery confirmed-NEW summary (for definitive-architecture-v2)

The 3 candidates worth integrating into definitive-architecture-v2:

1. **thedotmack/claude-mem** → Tier-3 memory STUDY-PILOT candidate (W134-F9 probe)
2. **K-Dense-AI/scientific-agent-skills** → Tier-4 catalog cite-import (W134-F8/F9)
3. **Q00/ouroboros** → Tier-1 spec-driven competitor DEFERRED until spec-kit pilot

## Probe limitations (HONEST-NON-FINDING)

- `skills-yaml-frontmatter` query returned empty (likely because `SKILL.md` is a filename
  not a code-search keyword — gh search rejects it as exact-match)
- Star-threshold filtering (>500 / >200) may miss low-star high-quality skills published
  by individual practitioners — Fire 9 candidate for relaxed-threshold deep-dive
- 2026-04-01 push-date cutoff may miss STABLE-BURN-IN repos last pushed earlier but still SOTA

## Mia ladder advance

n=949 → n=957 (+8: 8 new repo metadata probes with LICENSE / push-date / stars / description verification)
