# Outer Research Wave Folder Deep Extract — 2026-05-16

> Sourced from general-purpose fork (agentId a57be751c17a61394, 2026-05-16T13:15Z+)
> Mapped 26 subfolders in `docs/outer research/research-wave-2026-05-15/` — the unsung canonical scoring layer.

## §A — Per-subfolder synopsis (high-signal only)

| Subfolder | Contents | Status |
|---|---|---|
| `00-prior-research-baseline/` | 28 MDs + `sourcedive/` (10 per-repo) + v63/v64 | KEEP |
| `01-fresh-research-wave-2026-05-16/` | 9 MDs (A-audit, B-discovery, C-adversarial, GRAND-SYNTHESIS, W251/W252 action-plans, w253-adversarial) + `recon/` (16 JSONL + aggregate.py) | KEEP |
| `02-grand-synthesis-wave-2026-05-15/` | **THE CANONICAL D1-D10 LAYER** — `A-fresh-multi-cohort-discovery`, `C-scoring-matrix-146repo` (146 repos × D1-D10 SRA), `E-codex-cross-model-verdict`, `F-wave255-fm17-systemic-failure`, `G-codex-recovery-verdict`, `GRAND-SYNTHESIS-pure-runtime` | KEEP-CANONICAL |
| `02-wave252-fresh-2026-05-16/` | 3 synthesis + `agent-reports/` (7 MDs) + `category-deep-dive/D-infrastructure-13-layers` + `scoring/{A-multi-dim, B-license-resolution}` | KEEP |
| `04-wave254-behavioral-layer-2026-05-15/` | `W254-BEHAVIORAL-LAYER-ARCHITECTURE` + `W255-CLEANUP-RUNBOOK` | KEEP-CANONICAL |
| `05-grand-catalog/` | `GRAND_CATALOG_2026-05-15.md` (610 LOC; 130+ repos, 11-dim scoring) | KEEP-CANONICAL |
| `06-executive-brief/` | `EXECUTIVE_SYNTHESIS_BRIEF_2026-05-15.md` (328 LOC; Top-30 + 5-phase plan) | KEEP-CANONICAL |
| `v2-deep-synthesis/` | 11 MDs incl. `FINAL_v4_GRAND_CATALOG` (617 LOC), `MASTER_GRAND_CATALOG_v3_FINAL`, `ULTIMATE_SOTA_RUNTIME_DESIGN` (911 LOC), `COMPREHENSIVE_SCORING_MATRIX_v2` (15-dim, 452 LOC), `PER_LAYER_DEEP_DIVE_v4`, WAVE3A-6 series | KEEP-CANONICAL |
| `01-cc-ecosystem/`, `02-mcp-servers/`, `03-orchestration-frameworks/`, `04-token-context-optimization/`, `agent-reports/`, `recon-data/` | Stub README only / EMPTY | DELETE-EMPTY |

## §B — Net-new candidates NOT in W258-ULTIMATE 50-repo scorecard

W258 focuses on enterprise cost-optimization (LiteLLM/DeepSeek/Phoenix). This corpus surfaces:

- **thedotmack/claude-mem** (76k★) — cross-runtime memory leader, 7-75x margin (W3A + 02-wave252/scoring/A)
- **JuliusBrussee/caveman** (61k★) — 65% prompt compression skill (W3A VERIFIED)
- **docling-project/docling** (59k★) — W253 #10 doc-ingestion
- **HKUDS/LightRAG** (35k★) — graph-RAG INSTALL pick
- **microsoft/graphrag** (33k★) — W252 NEW offline corpora
- **infiniflow/ragflow** (64-80k★) — STUDY-PILOT-FAV
- **buildoak/wet** (~2k★) — LLMLingua replacement (W241+W252)
- **comet-ml/opik** (19k★) — Apache-2.0 obs replaces Phoenix
- **traceloop/openllmetry** (7k★) — OTel-native LLM telemetry
- **zilliztech/claude-context** (11k★) + **memsearch** (1.7k★)
- **chopratejas/headroom** (1.7k★) — Apache-2.0 60-95% tool-output compression
- **InvariantLabs-ai/mcp-scan, Kiln-AI/Kilntainers, Aurite-ai/agent-verifier, ComposioHQ/agent-orchestrator, HKUDS/OpenHarness** (W241/W252)
- **jarrodwatts/claude-hud** (22.9k★) — W253 #1
- **sickn33/antigravity-awesome-skills** (37.6k★)
- **VoltAgent/awesome-openclaw-skills** (48.7k★)
- **safishamsi/graphify, Piebald-AI/claude-code-lsps, farion1231/cc-switch, gotalab/cc-sdd, OthmanAdi/planning-with-files, davila7/claude-code-templates, mvanhorn/last30days-skill, EveryInc/compound-engineering-plugin, NVIDIA/garak, junhoyeo/tokscale, woodruffw/zizmor**
- **mozilla/sops** (18k★) + **FiloSottile/age** (19k★) — Phase 0 foundation (FINAL_v4 ranks #1-2)

## §C — Canonical D1-D10 SRA scoring files (already exist!)

**Eight existing dimensional-scoring artifacts:**

1. `02-grand-synthesis-wave-2026-05-15/C-scoring-matrix-146repo-2026-05-15.md` — **THE canonical D1-D10 SRA matrix** (463 LOC, 146 repos × L1-L11, full D1-D10 rubric §0 + master scoring table §2)
2. `02-wave252-fresh-2026-05-16/scoring/A-multi-dimensional-scoring-2026-05-16.md` — D1-D10 weighted rubric + INSTALL-TIER-A/B verdicts
3. `v2-deep-synthesis/COMPREHENSIVE_SCORING_MATRIX_v2.md` — **15-dimensional** extended scoring (150+ repos × 9 layers)
4. `05-grand-catalog/GRAND_CATALOG_2026-05-15.md` — 11-dim axes (Stars/Axis-1/2/3/Probe-4/5/6/wire-difficulty/functional-fit)
5. `02-grand-synthesis-wave-2026-05-15/A-fresh-multi-cohort-discovery-2026-05-15.md` — SRA D-total + Axis-1+2+3 firmness
6. `GRAND-SYNTHESIS-W253-2026-05-16.md` — Wave 253 D1-D10 with legend
7. `v2-deep-synthesis/MASTER_GRAND_CATALOG_v3_FINAL.md` + `FINAL_v4_GRAND_CATALOG.md` — Top-100 aggregate
8. `00-prior-research-baseline/B-memory-rag-sota-discovery-2026-05-15.md` — SRA A/B/C/D class assignments

## §D — Top 10 convergence (ADOPT-NOW in 4+ subfolder syntheses)

1. **anthropics/skills** (135k★) — every catalog L1 #1-2
2. **anthropics/claude-plugins-official** — every catalog #1 ADOPT-NOW
3. **modelcontextprotocol/servers** (86k★) — Foundation L1 across all
4. **openai/codex + openai/codex-plugin-cc** — cross-model gate substrate everywhere
5. **obra/superpowers** (192,855★ fresh-verified, up from stale 171k) — methodology in every L2
6. **wshobson/agents** (35k★) — granular install in every L2
7. **addyosmani/agent-skills** (42k★) — engineering-lifecycle in every L2
8. **yamadashy/repomix** (24k★) — code-pack + tree-sitter compression in L3+L5
9. **oraios/serena** (24k★) — semantic code-intel in L3+L6
10. **getzep/graphiti** (26k★) + **doobidoo/mcp-memory-service** (consistent pair) — L1+L3 memory stack

**Strong second tier:** rtk-ai/rtk, upstash/context7, chrome-devtools-mcp, microsoft/playwright-mcp, github-mcp-server, anthropics/cwc-long-running-agents, promptfoo/promptfoo, ast-grep/ast-grep, semgrep/semgrep MCP, ryoppippi/ccusage.

**Cross-cutting convergence findings:** LLMLingua REJECTED (5+ files); `mksglu/context-mode` ELv2 license REMOVE; `volcengine/OpenViking` AGPL BLOCKED; `firecrawl` AGPL → cloud-API-only; Phoenix → opik replacement; mem0 reclassified DEFER→ADOPT-NOW.

## §E — Recommended action for this folder

**KEEP SEPARATE as the canonical convergence layer** with W258 referencing it, rather than merging. Distinct scope:
- **Upstream repo-selection layer** (which SOTA components to install, 146-repo dimensional scoring)
- W258 is **operator-economics layer** ($830K/yr telemetry, LiteLLM cascade, Enterprise tier)

These are different questions and should not blur. W258's 50-repo scorecard is a *subset selection* — the right move is for W258 to **cite** `C-scoring-matrix-146repo-2026-05-15.md` as repo-selection authority rather than re-derive.

**Concrete restructure:**
- Promote `05-grand-catalog/GRAND_CATALOG`, `06-executive-brief/EXECUTIVE_BRIEF`, `v2-deep-synthesis/FINAL_v4`, `C-scoring-matrix-146repo` to canonical-authority
- Delete empty placeholders (`01-cc-ecosystem/`, `02-mcp-servers/`, `03-orchestration-frameworks/`, `04-token-context-optimization/`, `agent-reports/`, `recon-data/`, and empty subdirs under `03-wave253-deepdive/`)
- Add INDEX.md at folder root
- Cross-reference into W258 multi-axis convergence README
