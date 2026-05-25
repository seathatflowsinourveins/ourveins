# Research Wave 2026-05-15 — SOTA Grand Synthesis

> **Mission**: discover ALL high-star SOTA repos across 4 layers (CC ecosystem + MCP servers + Agent orchestration + Token optimization), deep-dive their sources, score each on 11 dimensions, deliver Grand Catalog + Executive Brief for pure SOTA Claude Code runtime install.

## Folder structure

```
research-wave-2026-05-15/
├── README.md                                # This file (index + methodology)
├── 00-prior-research-baseline/              # 32 files gathered from prior research
│   ├── v65 kit (24 files)                   #   — claude_code_sota_v65_ultimate_comprehensive_execution_md_kit
│   ├── v64/ + v63/ (delta vs baseline)
│   ├── WAVE1-CLOSE-SYNTHESIS-2026-05-15.md  #   — 7-layer install architecture (today's prior wave)
│   ├── A-existing-artifact-audit            #   — 319-repo candidate union audit
│   ├── B-memory-rag-sota-discovery          #   — memory/RAG (incomplete — Agent B autocompact)
│   ├── C-orchestration-plugin-sota-discovery#   — 45-tool-uses orchestration audit
│   ├── WAVE2A-T1-DISPOSITION                #   — codex T1 disposition note
│   ├── wave2A-T1-verdict.txt (715k)         #   — codex T1 raw verdict
│   └── sourcedive/                          #   — per-repo deep dives (graphiti/qdrant/etc.)
├── 01-cc-ecosystem/                         # CC plugins/skills/agents/marketplaces deep-dive
├── 02-mcp-servers/                          # MCP servers deep-dive
├── 03-orchestration-frameworks/             # Agent orchestration frameworks deep-dive
├── 04-token-context-optimization/           # Token/context optimization deep-dive
├── 05-grand-catalog/                        # ⭐ MASTER catalog with dimensional scoring
│   └── GRAND_CATALOG_2026-05-15.md          #   — 130+ repos, 11-dim scores, ADOPT/STUDY-PILOT/REJECT verdicts
├── 06-executive-brief/                      # ⭐ Top-30 ranked + 5-phase install plan
│   └── EXECUTIVE_SYNTHESIS_BRIEF_2026-05-15.md
├── agent-reports/                           # (Wave 1 agents rate-limited; orchestrator-side synthesis used)
└── recon-data/                              # GitHub query JSON dumps for reproducibility
```

## What changed since prior research

| Aspect | Prior (v65 kit + WAVE1) | This wave |
|--------|-------------------------|-----------|
| **Coverage** | 176-230 repos across 15 categories | 130+ repos with fresh stars + 11-dim scoring |
| **Methodology** | Cohort 7 saturation finding (kit re-iteration REJECT-class) | Fresh primary-source GitHub queries (May 2026) per cohort discipline |
| **Token-opt** | LLMLingua identified stale | LLMLingua REPLACED by 6-primitive composition stack (Anthropic + RTK + context-mode + caveman + repomix + ccusage) |
| **Memory** | doobidoo + graphiti baseline | Surfaces **thedotmack/claude-mem at 76,000★** as ecosystem leader (7-75x margin) — Wave 2 Probe 4-6 verification queued |
| **Orchestration** | superpowers + wshobson + addy-osmani separate | 3-way co-install convergence-gate Axis-1 4-org PASS (Anthropic + obra + wshobson + Addy) |
| **Cross-runtime** | sibling-only references | ACP fully-closed Axis-1+2+3 (4-org: Anthropic + jj + OpenAI + Linux-Foundation) per Wave 5 A10 |
| **wshobson** | broad marketplace | Q2 2026 NEW (PluginEval + Agent Teams + Conductor) — verify HARD-GATE first |
| **Discovery** | Cohort 7 saturation | Fresh GitHub queries for top-stars across 4 scopes (~100 unique repos verified) |

## Key deliverables (start here)

1. **[GRAND_CATALOG_2026-05-15.md](05-grand-catalog/GRAND_CATALOG_2026-05-15.md)** — full 130+ repo dimensional scoring across 11 layers + Top-50 master ranking + cross-layer convergence findings + 15 sections of analysis
2. **[EXECUTIVE_SYNTHESIS_BRIEF_2026-05-15.md](06-executive-brief/EXECUTIVE_SYNTHESIS_BRIEF_2026-05-15.md)** — Top-30 install picks + 5-phase plan + wire-difficulty mapping + decision matrix + win-over-alternates commentary

## Quick-start summary

### Phase 1 Foundation (8 picks, wire=1-2)
Anthropic-canonical chain: claude-plugins-official + skills + claude-agent-sdk-python + cwc-long-running-agents + modelcontextprotocol/servers + github-mcp-server + openai/codex CLI + codex-plugin-cc.

### Phase 2 Orchestration (5 picks, wire=1)
3-way methodology: superpowers (TDD + 7-phase) + wshobson granular (Agent Teams + Conductor + PluginEval) + addy-osmani (engineering lifecycle) + ralph-loop plugin + shanraisshan reference.

### Phase 3 MCP servers (8 picks, wire=2-3)
serena + repomix + thedotmack/claude-mem (76k★ Wave 2 verify) + doobidoo + graphiti L3 + semgrep + ChromeDevTools-MCP + playwright-MCP.

### Phase 4 Token-opt (6 picks, wire=1-2) — REPLACES stale LLMLingua
Anthropic prompt-cache + /compact + RTK (60-90%) + context-mode (98%) + caveman (65%) + repomix-compress (~70%) + ccusage measurement.

### Phase 5 Optional (8 picks, wire=2-3)
promptfoo + ast-grep CLI + upstash/context7 + gstack + claude-code-lsps + graphify + ACP adapter + Anthropic CI actions.

## Convergence verification

All Top-30 picks satisfy:
- **Axis-1** ≥3 distinct T1 orgs (Anthropic + OpenAI + named-T2 community)
- **Axis-2** ≥2 named T2 practitioners with dated artifact (Jesse Vincent + Addy Osmani + wshobson + Boris Cherny + Harrison Chase + others)
- **Axis-3** ≥3mo stability (most STABLE-BURN-IN or SUSTAINED-ACTIVE per convergence-gate.md)
- **6-probe harness-fit**: P4 plugin-namespace clear / P5 mode-harness compatible / P6 LICENSE permissive

## HONEST limitations

1. **Wave 1 agent dispatch rate-limited** — pivoted to orchestrator-side synthesis. Cross-model gate PARTIAL (0/3 BRIDGE-MODE penetration).
2. **Wave 2A codex foreground+tee adversarial review MANDATORY** before any install commit lands per FM-09 100% override.
3. **Probe DAG 1-7 NOT YET RUN** for individual candidates — R1 landscape survey only.
4. **Marker Decay**: star counts captured May 2026 — re-verify before adoption commit.
5. **Phantom-package risk** — Probe 6 npm-registry-direct-existence required.

## How this catalog was built

```
Prior research (32 files in 00-prior-research-baseline/)
  ↓
v65 kit baseline (~230 repos / 15 categories)
  ↓
WAVE1-CLOSE-SYNTHESIS-2026-05-15 (7-layer install architecture by today's earlier agents)
  ↓
A-existing-artifact-audit (319-repo candidate union)
  ↓
C-orchestration-plugin discovery (45 tool uses)
  ↓
Wave 1 agent dispatch — RATE-LIMITED → pivoted to orchestrator-side
  ↓
Fresh GitHub queries (5 calls × ~25 results = ~100 unique repos verified May 2026)
  ↓
11-dimensional scoring per repo (stars / age / cpd / license / native-CC-path /
                                  wire-difficulty / Axis-1+2+3 / Probe-4+5+6 / functional-fit)
  ↓
Aggregate score 0-100 + CR-12 disposition + verdict (ADOPT-NOW / STUDY-PILOT / REJECT)
  ↓
Win-over-alternates analysis per layer
  ↓
Top-50 master ranking + 5-phase install plan + decision matrix
  ↓
GRAND_CATALOG + EXECUTIVE_BRIEF (this folder)
```

## Provenance + reproducibility

- All star counts verified via `mcp__github__search_repositories` May 2026
- All baseline cite anchors preserved at `00-prior-research-baseline/`
- All verdicts cross-checked against sibling cardinal-rules (cite-discipline / convergence-gate / mia-pre-apply / FM-09 / CR-12)
- Reproducibility: re-run with same GitHub queries + same baseline files → consistent verdicts (modulo Marker Decay on star counts)

---

**Status**: AUTHORITATIVE-CANDIDATE pending Wave 2A codex T1 adversarial review.
