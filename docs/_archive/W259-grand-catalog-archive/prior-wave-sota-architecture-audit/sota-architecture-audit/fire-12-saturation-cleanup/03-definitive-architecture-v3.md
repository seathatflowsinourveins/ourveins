# 03 — Definitive Architecture v3 (post-Fire-12 final synthesis)

> **Purpose**: integrate Fire 11+12 findings into definitive 6-tier eee architecture.
> Supersedes Fire 8 v2 + adds 10 NEW Tier candidates from Fire 12 broader discovery.

## Corrections from Fire 8 v2

1. **anthropics/skills license** = MIXED per-skill (Fire 8 corrected from "TRULY-UNLICENSED")
2. **Wave 102 over-applied REJECTs** — Fire 11 SRA D1 confirmed: AGPL CLI-binary-use = ACCEPTABLE
3. **555/555 GraphQL-verified** — A3 tier ELIMINATED via Fire 11 promotion
4. **nextlevelbuilder/ui-ux-pro-max-skill** = FRESH-PAINT REJECT (Fire 12 file 01)
5. **New Tier-1 spec-driven competitor** = Fission-AI/OpenSpec (Fire 12 file 02)
6. **New memory/RAG alternatives** = VectifyAI/PageIndex + letta-ai/letta + zilliztech/claude-context

## Definitive 6-tier architecture v3 (post-Fire-12 ASCII)

```
══════════════════════════════════════════════════════════════════════════════
              Tier 0 — FOUNDATION (Anthropic-OFFICIAL, ALWAYS-ON)
══════════════════════════════════════════════════════════════════════════════
  • CLAUDE.md + CLAUDE.local.md (project root)
  • Plan Mode + checkpoints (Shift+Tab / Ctrl+G / double-Esc)
  • anthropics/claude-plugins-official marketplace (INSTALLED)
  • anthropics/skills marketplace (W134-F9 overlap probe pending; MIXED per-skill license)
  • Agent Skills standard (agentskills.io/specification — Dec 2025 open spec)
                                       │
══════════════════════════════════════════════════════════════════════════════
              Tier 1 — METHOD (PICK BOTH primary; defer alternatives)
══════════════════════════════════════════════════════════════════════════════
  PRIMARY (INSTALL / INSTALLED):
  • superpowers v5.1.0 (185k★ MIT) — ALREADY INSTALLED via claude-plugins-official
  • spec-kit v0.8.1+ (95k★ MIT) — INSTALL F7 (gated on T1 recovery)

  STUDY-PILOT (Fire 12 NEW):
  • Fission-AI/OpenSpec (46k★ MIT) — spec-kit competitor; head-to-head W134-F13
  • ruvnet/ruflo (48k★ MIT) — orchestration platform; W134-F12 probe

  DEFER:
  • bmad-method v6 (47k★ MIT) — virtual-team overhead per Probe 7.b
  • Q00/ouroboros (3.9k★ MIT) — STRONG-CONVERGENCE but DEFER until spec-kit pilot
                                       │
══════════════════════════════════════════════════════════════════════════════
              Tier 2 — PROJECT MANAGEMENT (sequential pilots)
══════════════════════════════════════════════════════════════════════════════
  INSTALL CANDIDATES (W134-F7):
  • planning-with-files v2.37.0 (21k★ MIT) — smallest-reversible FIRST
  • automazeio/ccpm (8k★ MIT) — multi-feature PRD/epic SECOND

  DEFER:
  • claude-task-master (27k★ MIT) — defer post-CCPM
                                       │
══════════════════════════════════════════════════════════════════════════════
              Tier 3 — STANDARDS + MEMORY (orthogonal)
══════════════════════════════════════════════════════════════════════════════
  STANDARDS:
  • agent-os v3.0 (4.5k★ MIT) — INSTALL F8 (gated on F7)
  • DEFER: russbeye/claude-memory-bank (D2 staleness 224d)

  MEMORY STACK (existing):
  • L1: doobidoo/mcp-memory-service v10.51.3 (Apache-2.0) — INSTALLED
  • L2: sqlite_vec embedded in L1 (INSTALLED)
  • L3: getzep/graphiti v0.29.0 + FalkorDB v1.6.1 (Apache-2.0) — INSTALLED
  • L4: Karpathy 3-layer wiki via docs + MEMORY.md (OPERATIONAL)

  MEMORY STACK STUDY-PILOT (Fire 9 + Fire 12):
  • thedotmack/claude-mem (74k★ Apache-2.0) — Fire 9 STUDY-PILOT-CONDITIONAL ($CMEM crypto-probe pending)
  • VectifyAI/PageIndex (30k★ MIT) — Fire 12 NEW vectorless-RAG alternative
  • letta-ai/letta (22k★ Apache-2.0) — Fire 12 NEW stateful-agents platform
  • zilliztech/claude-context (11k★ MIT) — Fire 12 NEW code-search MCP
                                       │
══════════════════════════════════════════════════════════════════════════════
              Tier 4 — DISCOVERY (cite-only catalogs)
══════════════════════════════════════════════════════════════════════════════
  Already cited (7):
  • ComposioHQ/awesome-claude-skills
  • travisvn/awesome-claude-skills (Fire 6 NEW cite)
  • VoltAgent/awesome-agent-skills
  • alirezarezvani/claude-skills
  • anthropics/claude-plugins-official (INSTALLED)
  • hesreallyhim/awesome-claude-code (CC-BY-SA)
  • claudemarketplaces.com / skillsmp.com (URL-only)

  Fire 8 NEW:
  • K-Dense-AI/scientific-agent-skills (20.5k★ MIT vertical) — CITE-IMPORT F8

  Fire 9 + 12 NEW:
  • Jeffallan/claude-skills (8.9k★ MIT full-stack vertical)
                                       │
══════════════════════════════════════════════════════════════════════════════
              Tier 5 — REFERENCE (read-once, cite-anchor)
══════════════════════════════════════════════════════════════════════════════
  CITE-IMPORT candidates:
  • Piebald-AI/claude-code-system-prompts v2.1.137 (10k★ MIT) — CITE-IMPORT F8
  • NousResearch/hermes-agent (142k★ MIT) — Fire 12 LEGITIMATE; 5th-org cite for team-orchestration
  • microsoft/autogen (58k★ CC-BY-4.0) — cite-only acceptable
  • HKUDS/DeepCode (15k★ MIT) — academic agentic-coding reference
  • The-Pocket/PocketFlow (11k★ MIT) — 100-line minimalist meta-framework
  • farion1231/cc-switch (66k★ MIT) — Fire 12 LEGITIMATE; cross-tool desktop assistant ref

  ALWAYS CITE:
  • code.claude.com/docs/en/skills
  • code.claude.com/docs/en/best-practices
  • agentskills.io/specification
                                       │
══════════════════════════════════════════════════════════════════════════════
              Tier 6 — EEE-SPECIFIC (operational)
══════════════════════════════════════════════════════════════════════════════
  • cwc-long-running-agents 5 primitives (Section 17 manifest)
  • Cardinal rules 1-12 (CLAUDE.md)
  • Cross-model T1-T7 lifecycle
  • FM catalog (FM-01..FM-20)
  • Mia pre-apply discipline
  • Audit-action-loop (Wire/Surface/Close/Re-fire)
  • Closed-loop-recursive-narrowing (Outcome A/B/C)
  • Codex CLI v0.130.0 INSTALLED
  • rtk (token-efficiency) INSTALLED
  • promptfoo + DeepEval + openlit observability INSTALLED
  • GitNexus@1.6.3 INSTALLED
  • mcp-memory-service v10.51.3 INSTALLED
  • Graphiti + FalkorDB INSTALLED
  • GraphQL methodology (Fire 10+11 — reusable batched repo-resolver)
```

## ⚠️ REMOVED from architecture (Fire 12 fresh-paint REJECT)

- **nextlevelbuilder/ui-ux-pro-max-skill** (76k★) — REJECT per Fire 12 file 01:
  density 0.0517 KB/★ is 10× thinner than convergence-gate threshold; vendor-spam topics;
  vanity domain. Do NOT cite as authority. Add to verified-avoid.md cohort if exists.

## Fire 12 NEW additions integrated (10 high-signal)

| Tier | NEW addition | Status |
|---|---|---|
| Tier-1 | Fission-AI/OpenSpec (46k★) | 🔬 STUDY-PILOT vs spec-kit (W134-F13) |
| Tier-3 memory | VectifyAI/PageIndex (30k★) | 🔬 STUDY-PILOT vectorless-RAG (W134-F13) |
| Tier-3 memory | letta-ai/letta (22k★) | 🔬 STUDY-PILOT stateful-agents (W134-F13) |
| Tier-3 memory | zilliztech/claude-context (11k★) | 🔬 STUDY-PILOT vs repomix (W134-F13) |
| Tier-3 research | Auto-claude-code-research-in-sleep (8.7k★) | 🔬 STUDY-PILOT ARIS pattern |
| Tier-3 research | uditgoenka/autoresearch (4.4k★) | 🔬 STUDY-PILOT research-protocol augment |
| Tier-1 framework | agentscope-ai/agentscope (25k★) | 🔬 STUDY-PILOT observable agents |
| Tier-5 reference | NousResearch/hermes-agent (142k★) | 📚 CITE 5th-org for team-orchestration |
| Tier-5 reference | microsoft/autogen (58k★ CC-BY-4.0) | 📚 CITE-CATALOG (cite-only license) |
| Tier-5 reference | farion1231/cc-switch (66k★ Rust) | 📚 CITE cross-tool desktop ref |

## Gap-closure roadmap (sequenced post-Fire-12)

### Wave 134 install pipeline (gated on Fire 7 T1 recovery)
- W134-F7-retry → T1 verdict APPROVE
- W134-F7-alt-path: planning-with-files (smallest-reversible)
- W134-F7-install: spec-kit + ccpm (Tier-1+2 batch)
- W134-F8: agent-os + cite Piebald + cite K-Dense-AI

### Wave 134 audit pipeline (independent)
- W134-F13-OpenSpec-vs-spec-kit (head-to-head)
- W134-F13-PageIndex-vectorless-RAG
- W134-F13-letta-vs-Graphiti
- W134-F13-zilliztech-vs-repomix
- W134-F13-ARIS-research-protocol-augment
- W134-F13-cite-imports (5 URL fragments → research-protocol.md)
- W134-F13-adrs-intro (introduce docs/adrs/)
- W134-F13-cli-tools (yq + just)
- W134-F13-mcp-prune (ECC /agent-sort)

### Long-term (post-Wave 134)
- W135+ semantic-router pilot (per task #61)
- W138+ governance trio install (per task #136)
- W139+ Pattern D codification (per task #137)

## Architecture decision matrix (Fire 12 final)

| Decision | Verdict | Forward fire |
|---|---|---|
| spec-kit vs OpenSpec | RUN BOTH (head-to-head pilot) | W134-F13 |
| superpowers (INSTALLED) | KEEP | — |
| Memory L4 wiki choice | Karpathy 3-layer OPERATIONAL; claude-mem DEFER | F10 crypto-probe |
| Memory L1 vs zilliztech/claude-context | KEEP L1; STUDY-PILOT alternative | W134-F13 |
| Memory L3 vs letta-ai | KEEP Graphiti; STUDY-PILOT alternative | W134-F13 |
| ouroboros vs spec-kit at Tier-1 | DEFER ouroboros pending spec-kit pilot | — |
| ui-ux-pro-max-skill | ❌ REJECT (fresh-paint) | W134-F13 verified-avoid update |

## "100% and beyond" final final verdict

**Coverage** (post-Fire-12):
- TRUE-repo baseline: ~610 (603 + 7 new from Fire 12 pass-3)
- Strict A1+A2: ~605/610 = **99.18%** (1 REJECT from top-25 removed)
- Architecturally-decided in v3: 6 tiers × 10-15 candidates per tier = ~60-90 architectural decisions

**Beyond-100% architecture-shape**:
- 6 tiers covering all SOTA dimensions (foundation / method / PM / standards / memory / discovery / reference / eee-specific)
- ~10 NEW Tier integrations from Fire 12 alone (Fission-AI / VectifyAI / letta / zilliztech / NousResearch / Microsoft / HKUDS / PocketFlow / ARIS / autoresearch)
- 1 fresh-paint REJECT prevents future operator misadoption
- Methodology codified across Fire 10/11/12 for future-fire reusability

## Mia ladder advance

n=1158 → n=1170 (+12: architecture v3 6-tier diagram verified / 10 Fire 12 NEW integrations
classified / 1 REJECT updated / matrix synthesized / gap-closure sequenced)
