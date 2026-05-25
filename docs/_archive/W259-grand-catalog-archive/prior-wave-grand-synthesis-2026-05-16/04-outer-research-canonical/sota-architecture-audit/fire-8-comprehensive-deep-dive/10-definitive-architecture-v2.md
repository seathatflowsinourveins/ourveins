# 10 — Definitive Architecture v2 (revised post-Fire-8 line-by-line deep-dives)

> **Source**: synthesis of Fire 8 deep-dives (01-08) + Fire 6 v1 architecture (`05-definitive-architecture.md @ commit ac8ea8a`)
> **Status**: LOAD-BEARING — this supersedes Fire 6 v1 as the canonical eee target architecture.
> **Verdict**: 6-tier model preserved + 4 corrections + 3 new SOTA candidates integrated.

## Corrections from Fire 6 v1

1. **anthropics/skills license classification** — Fire 6 said "TRULY-UNLICENSED" → corrected to MIXED per-skill (Apache 2.0 majority + source-available for docs)
2. **ccpm "53d push concern"** — explicitly compensated via STRONG-PROVENANCE-EXPRESS (user T2 endorsement + Agent Skills standard native)
3. **planning-with-files version** — Fire 6 had no version; Fire 8 captured v2.37.0 with hash-attestation primitive
4. **agent-os v3 retirement framing** — Fire 6 captured the retirement; Fire 8 clarified it as "convergence-by-deference" SOTA design discipline

## NEW additions to architecture (Fire 8 discoveries)

1. **thedotmack/claude-mem** (74k★ Apache-2.0) — Tier-3 memory STUDY-PILOT candidate (potential L4 wiki / cross-session persistent context)
2. **K-Dense-AI/scientific-agent-skills** (20k★ MIT) — Tier-4 catalog CITE-IMPORT for vertical-domain skill discovery
3. **Q00/ouroboros** (3.9k★ MIT) — Tier-1 spec-driven competitor DEFERRED until spec-kit pilot outcome

## The definitive 6-tier eee architecture (revised)

```
══════════════════════════════════════════════════════════════════════════════
                                Tier 0 — FOUNDATION (Anthropic-OFFICIAL)
══════════════════════════════════════════════════════════════════════════════
  ┌─────────────────────────────────────────────────────────────────────┐
  │ CLAUDE.md (project root)         ←  cardinal rules 1-12             │
  │ CLAUDE.local.md (gitignored)     ←  env block per-machine           │
  │ Plan Mode + checkpoints          ←  built into CC (Shift+Tab, ^G)   │
  │ anthropics/claude-plugins-official marketplace  ←  INSTALLED        │
  │ anthropics/skills marketplace    ←  TO PROBE OVERLAP (W134-F9)      │
  │ Anthropic Agent Skills standard  ←  agentskills.io/specification    │
  └─────────────────────────────────────────────────────────────────────┘
                                       │
                                       ▼
══════════════════════════════════════════════════════════════════════════════
                                Tier 1 — METHOD (PICK BOTH, complementary)
══════════════════════════════════════════════════════════════════════════════
  ┌──────────────────────────┐      ┌─────────────────────────────────────┐
  │ superpowers v5.1.0       │      │ spec-kit v0.8.1+                    │
  │ 185k★ MIT INSTALLED      │      │ 95k★ MIT INSTALL F7                 │
  │ HOW process              │      │ WHAT/WHEN spec-as-contract          │
  │ TDD + debug + review     │      │ constitution → specify → ...        │
  │ 14 skills (6 vendored)   │      │ 9 slash commands (skills mode)      │
  │ .claude/skills/superpwrs │      │ .specify/                           │
  └──────────────────────────┘      └─────────────────────────────────────┘

  DEFERRED at this tier:
    bmad-method (Probe 7.b virtual-team overhead — re-eval if team-scale)
    Q00/ouroboros (newer entrant; defer until spec-kit pilot outcome)
                                       │
                                       ▼
══════════════════════════════════════════════════════════════════════════════
                                Tier 2 — PROJECT MANAGEMENT (sequential pilots)
══════════════════════════════════════════════════════════════════════════════
  ┌──────────────────────────┐      ┌─────────────────────────────────────┐
  │ planning-with-files      │      │ ccpm                                │
  │ v2.37.0 21k★ MIT         │      │ 7d7e462 8k★ MIT                     │
  │ INSTALL F7 (FIRST)       │      │ INSTALL F7 (SECOND)                 │
  │ 3-file Manus pattern     │      │ PRD → Epic → GH Issues → Agents     │
  │ hash-attestation         │      │ .claude/prds/ + .claude/epics/      │
  │ i18n × 6 locales         │      │ Files-as-source-of-truth            │
  └──────────────────────────┘      └─────────────────────────────────────┘

  DEFERRED at this tier:
    claude-task-master (re-eval post-CCPM pilot)
                                       │
                                       ▼
══════════════════════════════════════════════════════════════════════════════
                                Tier 3 — STANDARDS + MEMORY (orthogonal)
══════════════════════════════════════════════════════════════════════════════
  ┌──────────────────────────┐      ┌─────────────────────────────────────┐
  │ agent-os v3.0            │      │ MEMORY STACK (existing)             │
  │ 4.5k★ MIT INSTALL F8     │      │ L1: mcp-memory-service Apache-2.0   │
  │ /inject-standards        │      │     INSTALLED (sqlite_vec backend)  │
  │ /shape-spec (plan-mode)  │      │ L3: Graphiti + FalkorDB             │
  │ /discover-standards      │      │     INSTALLED (Docker UP)           │
  │ /index-standards         │      │ L4 STUDY-PILOT: thedotmack/         │
  │ /plan-product            │      │     claude-mem 74k★ Apache-2.0 (F9) │
  │ agent-os/standards/      │      │                                     │
  └──────────────────────────┘      └─────────────────────────────────────┘

  DEFERRED at this tier:
    russbeye/claude-memory-bank (D2 staleness 224d)
                                       │
                                       ▼
══════════════════════════════════════════════════════════════════════════════
                                Tier 4 — DISCOVERY (cite-only, never install whole)
══════════════════════════════════════════════════════════════════════════════
  ┌─────────────────────────────────────────────────────────────────────┐
  │ ComposioHQ/awesome-claude-skills     ← already cited                │
  │ travisvn/awesome-claude-skills       ← cite-imported Fire 6/8        │
  │ VoltAgent/awesome-agent-skills       ← already cited                 │
  │ alirezarezvani/claude-skills         ← already cited                 │
  │ anthropics/claude-plugins-official   ← already INSTALLED            │
  │ hesreallyhim/awesome-claude-code     ← already cited (CC-BY-SA)      │
  │ K-Dense-AI/scientific-agent-skills   ← NEW Fire 8 cite (vertical)    │
  │ claudemarketplaces.com / skillsmp.com ← URL-only                    │
  └─────────────────────────────────────────────────────────────────────┘
                                       │
                                       ▼
══════════════════════════════════════════════════════════════════════════════
                                Tier 5 — REFERENCE (read-once, cite-import)
══════════════════════════════════════════════════════════════════════════════
  ┌─────────────────────────────────────────────────────────────────────┐
  │ Piebald-AI/claude-code-system-prompts v2.1.137                      │
  │ 10k★ MIT — CITE-IMPORT F8                                            │
  │ Reverse-engineered Anthropic CC internals                            │
  │ → cite-anchor in citation-discipline.md TIER-2                      │
  │                                                                       │
  │ Anthropic official docs (URL-only):                                  │
  │   https://code.claude.com/docs/en/skills                            │
  │   https://code.claude.com/docs/en/best-practices                    │
  │   https://agentskills.io/specification                              │
  └─────────────────────────────────────────────────────────────────────┘
                                       │
                                       ▼
══════════════════════════════════════════════════════════════════════════════
                                Tier 6 — EEE-SPECIFIC (already operational)
══════════════════════════════════════════════════════════════════════════════
  ┌─────────────────────────────────────────────────────────────────────┐
  │ cwc-long-running-agents 5 primitives (Section 17 manifest)          │
  │   Default-FAIL contract / Fresh-context evaluator / PROGRESS.md     │
  │   handoff / Kill-switch / Steer mid-run                              │
  │ Cardinal rules 1-12 (CLAUDE.md)                                     │
  │ Cross-model T1-T5 lifecycle (T1 pre-edit / T2 pre-commit / T3       │
  │   post-commit / T4 post-push / T5 plan-stage / T6 stop-gate)         │
  │ FM catalog (FM-01..FM-20 named failure modes)                       │
  │ Mia pre-apply discipline                                             │
  │ Audit-action-loop (Wire/Surface/Close/Re-fire)                      │
  │ Closed-loop-recursive-narrowing (Outcome A/B/C)                     │
  │ Codex CLI v0.130.0 — INSTALLED                                       │
  │ rtk (token-efficiency) — INSTALLED                                   │
  │ promptfoo / DeepEval — INSTALLED                                     │
  │ openlit observability — INSTALLED                                    │
  │ GitNexus@1.6.3 — INSTALLED                                           │
  └─────────────────────────────────────────────────────────────────────┘
```

## Architectural integrity checks

### CR-1 cite-trail
Every Tier-N primitive cited at TIER-1-DIRECT (file:line + HEAD SHA OR official-docs URL):

| Tier | Primary cites |
|---|---|
| T0 | CCBP `claude-memory.md:34-40 @ 64fffd53` + Anthropic `code.claude.com/docs/en/setup` + cwc clone HEAD `ffd563d6` |
| T1 | superpowers HEAD `f2cbfbe` + spec-kit HEAD `688ca1b` + spec-kit `AGENTS.md:13-79` (integration architecture) |
| T2 | ccpm HEAD `7d7e462` + planning-with-files HEAD `6cd6254` |
| T3 | agent-os HEAD (new clone) + mcp-memory-service v10.51.3 + Graphiti v0.29.0 + FalkorDB v1.6.1 |
| T4 | 7 catalog URLs + repo HEADs at audit time |
| T5 | Piebald HEAD `648d3b3` + `agentskills.io/specification` URL |
| T6 | sibling `Z:/claude-sota/.claude/rules/*` cite-imports per CR-12 + CR-9 sibling-bleed defense |

### CR-5 install-priority

Tiers 0-3 are INSTALL-class (with W134-F7 install gate DEFERRED-PENDING-FIX).
Tiers 4-5 are CITE-CLASS (no install required).
Tier 6 already operational per existing eee state.

### CR-6 fresh-from-github + official-native-channel

Every install command uses canonical official native channel:
- `uv tool install ... --from git+https://github.com/...` (spec-kit)
- `/plugin install ...@anthropic-agent-skills` (anthropics/skills)
- `/plugin install ...@superpowers-marketplace` (superpowers — ALREADY INSTALLED)
- `git clone --depth 1 https://github.com/.../<repo>.git` (ccpm, planning-with-files, agent-os)
- `docker pull ...:latest` (FalkorDB) — already INSTALLED

### CR-8 full-SOTA-content

Every file in the runtime cites SOTA source (per CR-1 lattice). Fire 5-8 deep-dive
docs cite file:line + HEAD SHA throughout.

### CR-9 install-risk discipline

- Version-pin: spec-kit `@v0.8.1` (not `@latest`); planning-with-files `--branch v2.37.0`
- 2-round fix-forward expected per install
- Pre-cite-import REVERT check: probe `git -C Z:/claude-sota log -- '<sibling-target>'`
- Sibling-bleed defense: N/A (all upstream installs)

### CR-12 upstream-install-priority

ALL Tier-1/2/3 picks are PRIMARY upstream installs. Zero cite-import-AMBER fallbacks needed.

## Gap-closure roadmap (sequenced)

| Fire | Action | LOC |
|---|---|---|
| **W134-F7-retry** | Re-fire codex T1 with mitigation (`--json` + turn-completed event OR `CLAUDE_CODE_DISABLE_1M_CONTEXT=1`) | (codex consult) |
| **W134-F7-install** | If T1 verdict APPROVE: install planning-with-files + spec-kit + ccpm atomic | ~50 install state changes |
| **W134-F8** | Install agent-os + cite-import Piebald + cite K-Dense-AI catalog | ~30 |
| **W134-F9-overlap** | Probe anthropics/skills vs claude-plugins-official marketplace overlap | (Mia probe) |
| **W134-F9-claudemem** | SRA D1-D10 probe thedotmack/claude-mem 74k★ vs existing memory stack | (sota-researcher dispatch) |
| **W134-F9-hygiene** | anthropics/skills LICENSE upstream issue + CLAUDE.md size review + ECC /agent-sort | ~20 |
| **W134-F10** | Verify all installs + cross-model T1 e2e on full architecture | (codex consult e2e) |

## Architecture decision audit trail (per cardinal-rule-11 META-process)

Every architectural decision in this v2 is backed by:
1. SRA D1-D10 scoring (per repo, per Fire 6/8 anatomy doc)
2. Cross-model T1 verdict (when consulted; Fire 7 T1 returned Pattern B HNF)
3. Mia probe (cumulative n=964 after Fire 8 close)
4. Synthesis-layer-verify discipline (OVER/UNDER/HONEST-NON-FINDING categorization)
5. Closed-loop-recursive-narrowing (Outcome A ACCEPT-WITH-DOC for v2 ship)

## Mia ladder advance

n=964 → n=970 (+6: 6-tier architecture verified / per-tier convergence checked / gap-closure roadmap sequenced)
