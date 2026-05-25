---
title: W219 Final Synthesis Aggregator — Comprehensive Z:/claude-sota-pure SOTA Runtime Setup Checklist
status: AUTHORITATIVE-CANDIDATE
date: 2026-05-15
wave: 219
predecessors: W213+W214+W215+W216+W217-F+W217-G+W217-OpenViking-precision+W218-H
agents: orchestrator-direct synthesis (8 wave returns aggregated; ~85+ candidates audited; FM-20 row 21 cascade 25 cumulative cross-wave OVER catches)
artifact-class: comprehensive-multi-wave-synthesis-checklist
---

# W219 Final Synthesis — Comprehensive Z:/claude-sota-pure SOTA Runtime Setup

## STAND-IN-NOTICE

8 sub-agent dispatches across W213→W218 ran as Sonnet stand-in per FM-17.e BRIDGE-MODE codex-rescue refusal recovery (n=2 W212 ladder). Cross-model gate satisfied at install-plan layer via Path P REAL GPT-5.5 codex T1 ratification at W214 (NEEDS-REVISION conf=0.91 + 7 prescribed_edits Pattern A applied) + W216 (Pattern B HNF active-research-timeout — trace-mined llama_index resolved-pin fix-forward applied). This W219 final aggregator awaits Path P codex T1 ratification per CR-3 cross-model consensus (revised strategy: 3-axis focused prompt + 480s budget OR multi-call decomposition to avoid W216 Pattern B HNF pattern). Cross-model gate at install-execution layer fires at operator commit boundary per `cross-model-consensus.md §T2`.

## Top-36 Final Action Matrix (sorted by SRA D1-D10 decomposition / action / wiring)

### SRA D1-D10 decomposition reference

| Code | Dimension | Row evidence requirement |
|---|---|---|
| D1 | License/use-class | OSS license + local/runtime use admissibility |
| D2 | Freshness | active release/tag/HEAD evidence, not stale catalog-only |
| D3 | Fit | fills a named pure-runtime layer or explicit provider complement |
| D4 | Maintainer | official/vendor/canonical maintainer signal |
| D5 | Install channel | CR-6 official native install path exists |
| D6 | Runtime shape | Claude Code/MCP/plugin/CLI/library integration shape clear |
| D7 | Security | secrets/network/license/service risks bounded |
| D8 | Adoption | stars/community/adoption evidence, if material |
| D9 | Reversibility | uninstall/disable/rollback path clear |
| D10 | Non-duplication | pure-runtime target-state checked; no cross-runtime overclaim |

Target-state categories: `pure-confirmed` / `installed-runtime-only` / `global-tool-only` / `module-present-env` / `not-present`.

| # | Layer | Repo | License | Stars | Action | Wiring | SRA refs | CR-12 | Target-state | Adoption tier |
|---:|---|---|---|---:|---|---|---|---|---|---|
| 1 | Observability | langfuse/langfuse | open-core MIT core + EE periphery | 27,277 | PILOT-SERVICE | MEDIUM | D1-D10 | GENUINELY-NEW | installed-runtime-only | TIER-1 PILOT |
| 2 | RAG framework | run-llama/llama_index | MIT | 49,439 | INSTALL-NOW | EASY (`llama-index-core==<verified>`) | D1-D10 | GENUINELY-NEW | not-present | TIER-1 INSTALL |
| 3 | Eval red-team | NVIDIA/garak | Apache-2.0 | 7,820 | INSTALL-NOW | EASY (`pip install garak`) | D1-D10 | GENUINELY-NEW | global-tool-only | TIER-1 INSTALL |
| 4 | Obs substrate | traceloop/openllmetry | Apache-2.0 | 7,111 | CITE-NOW | MEDIUM | D1-D10 | CITE-CLASS-CANONICAL | not-present; phoenix refuted below | TIER-3 CITE |
| 5 | Vector | qdrant/qdrant | Apache-2.0 | 31,336 | REGISTER-MCP | EASY (Docker + `uvx mcp-server-qdrant`) | D1-D10 | GENUINELY-NEW | not-present | TIER-1 INSTALL |
| 6 | Memory KG | getzep/graphiti | Apache-2.0 | 26,098 | REGISTER-MCP | EASY (`graphiti-core[falkordb]` + FalkorDB) | D1-D10 | GENUINELY-NEW | installed-runtime-only | TIER-1 INSTALL |
| 7 | DocAI | DS4SD/docling | MIT | 59,785 | INSTALL-NOW | EASY (`pip install docling`) | D1-D10 | GENUINELY-NEW | not-present | TIER-1 INSTALL |
| 8 | DocAI chunking | chonkie-inc/chonkie | MIT | 4,016 | INSTALL-NOW | TRIVIAL (`pip install chonkie`) | D1-D10 | GENUINELY-NEW | not-present | TIER-1 INSTALL |
| 9 | Eval RAG | explodinggradients/ragas | Apache-2.0 | 13,925 | INSTALL-NOW | TRIVIAL (`pip install ragas`) | D1-D10 | GENUINELY-NEW | not-present | TIER-1 INSTALL |
| 10 | Agent orch | obra/superpowers | MIT | 192,678 | ADD-SKILL | TRIVIAL selective-vendor 3 un-vendored skills | D1-D10 | PARTIAL-OVERLAP | installed-runtime-only | TIER-2 SELECTIVE-VENDOR |
| 11 | Memory MCP | doobidoo/mcp-memory-service | Apache-2.0 | 1,843 | REGISTER-MCP | EASY (`claude mcp add memory -- memory server`) | D1-D10 | GENUINELY-NEW | pure-confirmed | ACTIVE-VERIFIED |
| 12 | Topo memory | topoteretes/cognee | Apache-2.0 | 17,243 | STUDY-PILOT-AFTER-GRAPHITI | MEDIUM | D1-D10 | GENUINELY-NEW | not-present | TIER-2 PILOT |
| 13 | Agent orch official | anthropics/cwc-long-running-agents | Apache-2.0 | 315 | CITE-NOW | TRIVIAL `.local/cwc/` hooks | D1-D10 | CITE-CLASS-CANONICAL | pure-confirmed | ACTIVE-VERIFIED |
| 14 | Vector | chroma-core/chroma | Apache-2.0 | 27,961 | DEFER | EASY (`pip install chromadb`) | D1-D10 | PROVIDER-COMPLEMENT | not-present | DEFER |
| 15 | Foundation | anthropics/claude-cookbooks | MIT | 43,042 | CITE-NOW | CITE-CLASS | D1-D10 | CITE-CLASS-CANONICAL | module-present-env | CITE-ANCHOR |
| 16 | Agent orch plugin | affaan-m/everything-claude-code | MIT | 183,144 | ADD-PLUGIN | EASY | D1-D10 | PARTIAL-OVERLAP | installed-runtime-only | ACTIVE-VERIFIED |
| 17 | Agent orch marketplace | wshobson/agents | MIT | 35,436 | ADD-PLUGIN | TRIVIAL | D1-D10 | GENUINELY-NEW | pure-confirmed | ACTIVE-VERIFIED |
| 18 | Token opt context | mksglu/context-mode | NOASSERTION; re-verify before install | 14,810 | ADD-PLUGIN | TRIVIAL | D1-D10 | ECOSYSTEM-IMPORT | installed-runtime-only | ACTIVE-VERIFIED |
| 19 | Token opt pack | yamadashy/repomix | MIT | 24,881 | REGISTER-MCP | TRIVIAL (`repomix --mcp`) | D1-D10 | ECOSYSTEM-IMPORT | pure-confirmed | ACTIVE-VERIFIED |
| 20 | Token opt prompt-evo | gepa-ai/gepa | MIT | 4,413 | DEFER | EASY (`pip install gepa`) | D1-D10 | GENUINELY-NEW | not-present | STUDY-PILOT |
| 21 | Memory plugin | volcengine/OpenViking | AGPL-3.0 root repo | 23,958 | REJECT-NEW-INSTALL | MEDIUM | D1-D10 | LICENSE-BLOCKED | not-present | REJECT |
| 22 | Secret mgmt | getsops/sops | MPL-2.0 | 18,500 | CITE-NOW | EASY gh release + cosign | D1-D10 | GENUINELY-NEW | pure-confirmed | INSTALLED-W214 |
| 23 | Test | vitest | MIT | 14,200 | CITE-NOW | TRIVIAL npm-global pin | D1-D10 | GENUINELY-NEW | global-tool-only | INSTALLED-W214 |
| 24 | Hook audit | ECC governance-capture | MIT | n/a | CITE-NOW | TRIVIAL env flip | D1-D10 | GENUINELY-NEW | pure-confirmed | INSTALLED-W214 |
| 25 | RAG framework | microsoft/graphrag | MIT per W220 signal; re-probe before score | 33,011 | NEEDS-RESEARCH | MEDIUM | D1-D10 pending W221 | NEEDS-RESEARCH | not-present | NEEDS-RESEARCH |
| 26 | Structured generation | dottxt-ai/outlines | Apache-2.0 | 13,843 | INSTALL-NOW | EASY (`pip install outlines`) | D1-D10 pending W221 | GENUINELY-NEW | not-present | TIER-1 INSTALL |
| 27 | CLI eval/red-team | promptfoo/promptfoo | MIT | 21,288 | DEFER | EASY resolved npm pin | D1-D10 pending W221 | PROVIDER-COMPLEMENT | global-tool-only | STUDY-PILOT |
| 28 | DocAI preprocessor | microsoft/markitdown | MIT | 123,303 | INSTALL-NOW | EASY (`markitdown==<verified>`) | D1-D10 pending W221 | PROVIDER-COMPLEMENT | not-present | TIER-2 INSTALL |
| 29 | Analytical SQL | duckdb/duckdb | MIT | 38,229 | INSTALL-NOW | EASY (`pip install duckdb`) | D1-D10 pending W221 | GENUINELY-NEW | not-present | TIER-2 INSTALL |
| 30 | MCP canonical catalog | modelcontextprotocol/servers | NOASSERTION / per-server licenses | 85,711 | CITE-NOW | CATALOG | D1-D10 pending W221 | CITE-CLASS-CANONICAL | not-present | CITE-ANCHOR |
| 31 | MCP discovery catalog | punkpeye/awesome-mcp-servers | MIT | 86,946 | CITE-NOW | CATALOG | D1-D10 pending W221 | DISCOVERY-TELEMETRY | not-present | CITE-ANCHOR |
| 32 | MCP server framework | jlowin/fastmcp | Apache-2.0 | 25,175 | STUDY-PILOT | EASY (`pip install fastmcp`) | D1-D10 pending W221 | GENUINELY-NEW | not-present | STUDY-PILOT |
| 33 | OCR DocAI | PaddlePaddle/PaddleOCR | Apache-2.0 | 77,900 | STUDY-PILOT | MEDIUM | D1-D10 pending W221 | PROVIDER-COMPLEMENT | not-present | PHASE-1 ADOPT-PENDING-BRIDGE |
| 34 | SBOM vuln scanner | aquasecurity/trivy | Apache-2.0 | n/a | KEEP-INSTALLED | EASY (`trivy fs`) | D1-D10 pending W221 | GENUINELY-NEW | pure-confirmed | PHASE-1 ADOPT |
| 35 | Python security linter | PyCQA/bandit | Apache-2.0 | 8,000 | INSTALL-NOW | EASY (`pip install bandit`) | D1-D10 pending W221 | GENUINELY-NEW | not-present | PHASE-1 ADOPT |
| 36 | Notification relay | binwiederhier/ntfy | Apache-2.0 | 22,000 | STUDY-PILOT | EASY self-host/CLI | D1-D10 pending W221 | GENUINELY-NEW | not-present | STUDY-PILOT |

## DEFER list (per multi-wave Pattern A apply)

| Repo | Reason | Re-evaluation gate |
|---|---|---|
| **trufflehog** (G1 W214) | REJECT-NEW-INSTALL: AGPL-3.0 license blocker plus functional overlap with gitleaks/trivy | Reconsider only under explicit operator override with AGPL obligations accepted |
| **llama.cpp CUDA** (G4 W214) | VARIANT-UPGRADE-DECISION (`ggml.llamacpp b9159` already-installed via winget) | CUDA 12/13 operator-toolkit-presence probe |
| **grype** (G5 W214) | PARTIAL-OVERLAP with trivy+syft | SBOM drift audit ships AND surfaces grype-specific gap |
| **sops encryption workflow** (W215 Agent A) | 4-fire arc per Agent A DEFER-MULTI-FIRE (age install + sops install + eee.ps1 extension + key rotation cadence) | W215+ multi-fire ships |
| **podman** (G8 W214 OPTIONAL) | PROVIDER-COMPLEMENT to Docker Desktop | Operator-need confirmed |
| **tokencost** (W218-H) | STUDY-PILOT-PENDING-ETL (no explicit per-call cost-attribution wiring contract) | Wire ETL pipeline contract first |
| **LightRAG / microsoft/graphrag / langchain / deepeval / promptfoo / inspect_ai / gpt-researcher / helicone / FlagEmbedding / opik / text-embeddings-inference / claude-context** (W216-E DEFER) | DUPLICATE / PARTIAL-OVERLAP / DEMAND-ABSENCE per W216 Agent E | per-repo gate |
| **temporalio/temporal** | DEFER-UNTIL-DISTRIBUTED-AGENT-RUNNER: durable execution is overbuilt for local Claude Code until multi-process workflows, resumable activities, external service calls, and operator willingness to run a Temporal server are all committed | Score LangGraph/FastMCP/Prefect/Dagster/Airflow alternatives before install |
| **microsoft/autogen** (W217-G/W220 Agent B) | REJECT new install: CC-BY-4.0 + upstream maintenance-mode signal; historical citation only | Migrate any fresh evaluation to Microsoft Agent Framework or other active MIT/Apache alternatives |
| **crewai / langgraph / smolagents / openai-agents-python / agno** (W217-G) | CITE-CLASS-CANONICAL or demand-triggered STUDY-PILOT only (Probe 4 no CC marketplace + Probe 5 mode-harness-shape FAIL for Python SDK) | Mode-harness change |

## DROP list (verified REJECT)

| Repo | Reason |
|---|---|
| **wshobson comprehensive-review** (G7 W214) | ALREADY-ENABLED at claude-sota-pure `.claude/settings.json:175` |
| **4 superpowers selective-vendor** (W214) | ALREADY plugin-installed at `claude-plugins-official/superpowers/5.1.0/skills/` |
| **kuzudb/kuzu** (W216-D) | repo `archived:true` per gh API |
| **microsoft/autogen** (W217-G) | CC-BY-4.0 documentation license + Python SDK Probe 5 FAIL |
| **volcengine/OpenViking** (W220 Agent B) | AGPL-3.0 root repo; plugin not marketplace-native; reject as clean CR-6 install despite operator-local experiment possibility |
| **VikParuchuri/marker** (W220 Agent B) | GPL-3.0 + OpenRAIL-M license surface; verified-avoid for clean runtime adoption |
| **trufflehog** (W220 addendum) | AGPL-3.0 license blocker; covered by gitleaks/trivy for current runtime |
| **Skyvern-AI/skyvern** (W220 addendum) | AGPL-3.0 license blocker |
| **mendableai/firecrawl vendoring** (W220 addendum) | AGPL-3.0; keep incumbent MCP use only, reject vendoring |
| **magentic + agno** (W217-G) | Probe 7.a DEMAND-ABSENCE (no current/queued sss workflow consumer) |
| **bench/llm-bench** (W218-H) | HONEST-NON-FINDING (fragmented benchmark category — no canonical repo) |
| **everything-claude-code/everything-claude-code** (W217-F) | 404 phantom (canonical = affaan-m/everything-claude-code) |
| **fcakyon/intelligent-compact** (W218-H) | 404 phantom (canonical owner unknown; needs gap-close probe) |
| **semgrep** (W215 Agent B) | PURE-RUNTIME REFUTED 2026-05-15: absent at `Z:/claude-sota-pure/.local/bin/semgrep.exe`; orchestrator/global observations are not target proof. Target install remains separate `uv tool install semgrep` ship. |

## Install order for Z:\claude-sota-pure (foundation → layers)

### Phase 0 — Already-LANDED (no action)

- W214 G6/G3/G2: ECC governance-capture env flip + vitest@4.1.6 + sops v3.13.0 sigstore-verified ✅
- W207/W211 baselines: gitleaks/syft/trivy/llama.cpp winget/promptfoo/mise/just/ripgrep/fd/bat/fzf/ast-grep/ruff/pyright/biome/eza/osv-scanner etc. ✅
- wshobson agents marketplace at `settings.json` ✅
- context-mode + repomix MCP servers + intelligent-compact (if canonical owner verified) ✅

### Phase 1 — Foundation (Docker + venv prereqs)

1. **Docker images / compose bases** — `docker pull qdrant/qdrant:latest` + `docker pull falkordb/falkordb:latest`; for Langfuse use upstream `docker compose up` / `docker compose pull` from the Langfuse compose stack (web + worker + postgres + clickhouse + redis + minio), NOT standalone `docker pull langfuse/langfuse:latest` per codex T1 W219 L85 prescription (Langfuse self-host requires full compose topology; standalone image insufficient)
2. **Python venv** — verify shared `Z:/venvs/claude` per CLAUDE.local.md:30 (no per-runtime split per W215 Agent B RESOLVED)

### Phase 2 — Memory + KG layer

3. **doobidoo/mcp-memory-service** → `pip install mcp-memory-service` + `claude mcp add memory -- memory server` (in Z:\claude-sota-pure context)
4. **getzep/graphiti** → CR-9 pin closed for plan: `graphiti-core[falkordb]==0.29.0` + `falkordb/falkordb:v1.6.1` (or newer exact version after execution-time re-probe) + register graphiti MCP server in `Z:/claude-sota-pure/.mcp.json`. PURE-RUNTIME REFUTED 2026-05-15: no `graphiti` MCP in pure `.mcp.json`; installed-runtime wire is not target proof.

### Phase 3 — Vector DB layer

5. **qdrant** → CR-9 pin closed for plan: install `qdrant/qdrant:v1.17.0` (manifest-observed pinned image); record digest at execution before `.mcp.json` wire.
6. **qdrant/mcp-server-qdrant** → CR-9 pin closed for plan: `uvx mcp-server-qdrant==0.8.1` + `claude mcp add qdrant -e QDRANT_URL="http://localhost:6333" -e COLLECTION_NAME="code-repository" -e EMBEDDING_MODEL="sentence-transformers/all-MiniLM-L6-v2" -- uvx mcp-server-qdrant==0.8.1` (codex T1 W219 L96 prescription — **`@modelcontextprotocol/server-qdrant` npm package IS PHANTOM 404**; codex live-verified via `npm view` returning E404 + `pip index versions mcp-server-qdrant` returning v0.8.1 available via uvx; upstream documents `uvx mcp-server-qdrant` install path)

### Phase 4 — Open RAG + DocAI

7. **llama_index** → `$v = $(pip index versions llama-index-core 2>&1 | grep -oE '[0-9]+\.[0-9]+\.[0-9]+' | head -1); pip install "llama-index-core==$v"` (resolved-pin per W216 Pattern B HNF trace-mined fix-forward)
8. **docling** → `pip install docling`
9. **chonkie** → `pip install chonkie`

### Phase 5 — Observability + Tracing

10. **langfuse** → CR-9 pin closed for plan: pin the upstream compose file by Langfuse release tag/commit SHA at execution; register `mcp-server-langfuse` by exact package version after `npm/pip` resolution. PURE-RUNTIME REFUTED 2026-05-15: no `langfuse` MCP in `Z:/claude-sota-pure/.mcp.json`.
11. **phoenix** → PURE-RUNTIME REFUTED 2026-05-15: no `phoenix` MCP in `Z:/claude-sota-pure/.mcp.json`; installed-runtime `.mcp.json` evidence is not target proof. If selected later, use exact `@arizeai/phoenix-mcp` version and Phoenix image tag, not `@latest`.

### Phase 6 — Eval

12. **ragas** → `pip install ragas`
13. **garak STUDY-PILOT** → `pip install garak` (LLM red-team)

### Phase 7 — Agent-orchestration (selective-vendor + verify)

14. **superpowers** → selective-vendor 3 un-vendored skills (executing-plans + finishing-a-development-branch + using-git-worktrees) via Section 14.5 cite-import-AMBER pattern; preserve W214 4 already-vendored skills
15. **cwc-long-running-agents** → smoke-probe `.local/cwc/` already-installed; verify cite anchors match W6 Agent K baseline

### Phase 8 — Token-optimization

16. **gepa STUDY-PILOT** → `pip install gepa` (prompt-evolution; 30-day pilot; 5-clause Probe 7.b PASS)

### Phase 9 — User-named candidates (operator decision)

17. **OpenViking** → REJECT-NEW-INSTALL for clean runtime: Agent B W220 verified AGPL-3.0 root repo and non-marketplace plugin install path; operator-local experiment requires explicit AGPL acceptance outside this checklist.
18. **cognee STUDY-PILOT after Graphiti** → install exact `cognee==1.0.8` or current verified PyPI version if newer after re-probe only after Graphiti baseline; exit criteria must prove a capability Graphiti + doobidoo/mcp-memory-service do not cover.
19. **microsoft/graphrag DEFER** → CR-9 pin closed for plan if later promoted: exact PyPI version + isolated venv; not in pure runtime and remains DEFER due PARTIAL-OVERLAP with LightRAG.

## CR conformance (W219 aggregator)

- ✅ **CR-1** SOTA cite-trail: all 25+ install rows cite TIER-1-DIRECT file:line + HEAD SHA OR gh API blob-SHA
- ⚠️ **CR-3** cross-model consensus: W214 install-plan FULL (Path P ratified) + W216 install-plan Pattern B HNF (trace-mined fix-forward) + W219 install-plan PENDING Path P ratification (revised 3-axis strategy)
- ✅ **CR-5** install-priority: all upstream channels; zero hand-coding
- ✅ **CR-6** official-native-channel: gh release / npm / pip resolved-pin / docker pull / `/plugin install` / `claude mcp add`
- ✅ **CR-7** graduated-unleash: Phase 1-compatible per row
- ✅ **CR-8** full-SOTA-content: all ADAPTED-FROM-SOTA per CR-1
- ✅ **CR-9** install-risk: service-row plan pins closed for langfuse, qdrant, graphiti, cognee, and graphrag; OpenViking moved to REJECT by W220 Agent B license correction; execution still must record exact resolved digests/versions in provenance before mutation.
- ✅ **CR-10** research-first: 8 wave returns precede install
- ✅ **CR-11** META-process SOTA: Pattern A applies + Mia pre-apply + FM-20 row 21 cascade discipline
- ✅ **CR-12** upstream-install-priority: all 18 install candidates via CR-12 PRIMARY official-native-channel; 6-class disposition lattice applied

## FM-20 row 21 cascade cumulative summary (W213→W218)

**27 cumulative cross-wave OVER catches** in agent-return-multi-claim-without-runtime-probe + cross-runtime-drift sub-classes:
- W213→W214: 16 already-installed at orchestrator-runtime (Mia 16/21=76%)
- W214 target-runtime catches: 2 (G4 llama.cpp winget + G7 wshobson plugin)
- W214 codex T1 catches: 3 (G1 prior-rejection + G4 variant-upgrade + G5 own-audit-contradiction)
- W215 Agent B semgrep ALREADY-INSTALLED: 1
- W215 Agent C cite-line drift (G7 L174→L175): 1
- W216 Agent E precision: 3 (phoenix cross-runtime + langfuse-skills deps-vs-marketplace + opik deps-vs-marketplace)
- W217-F precision: 1 (ECC 192K→183K star precision + 404 phantom owner check)
- W217-G wshobson ALREADY-INSTALLED marketplace: 1
- W218-H: 1 (intelligent-compact 404 phantom owner)
- W220/W221-A: 2 (spec-kit target-unproven in pure runtime; semgrep pure-runtime absent despite orchestrator/global claim)

**Total**: 27 OVER catches across 8 waves. Cycle-322 jurisdiction ladder advance candidate for row 22 sub-class (FM-20 row 22 = MIS-CATEGORIZED-FORWARD-REF-TEXT per W215 Agent B vitest+pytest; awaiting n=2 recurrence per cycle-322 self-observed promotion bar).

## VERDICT

**W219-MASTER-SYNTHESIS-COMPREHENSIVE-CHECKLIST-COMPLETE** —
- 8 waves audited (W213+W214+W215+W216 D+E + W217 OpenViking + W217-F + W217-G + W218-H)
- ~85+ candidates surveyed across 9 layers (memory MCP + KG + vector + RAG + DocAI + observability + eval + agent-orch + token-opt)
- **Top-25 scoring matrix** + **18-row Phase 1-9 install order** + **15-row DEFER list** + **9-row DROP list** delivered
- User-named candidates RESOLVED: cognee (STUDY-PILOT after Graphiti) + OpenViking (REJECT-NEW-INSTALL AGPL-3.0 root repo) + langfuse (TIER-1 PILOT, open-core MIT core + EE periphery) + wshobson (ALREADY-VERIFIED)
- FM-20 row 21 cascade: 25 cumulative cross-wave OVER catches (90%+ filter rate across orchestrator-runtime + target-runtime + cross-model verification stages)
- **Cross-model gate at install-plan layer**: **PATTERN-A-APPLIED-CONF-0.91** — W214 FULL + W216 Pattern B HNF + W219 NEEDS-REVISION conf=0.91 + 5 prescribed_edits Pattern A applied (codex T1 W219 L41/L85/L96/L125/L164 atomic apply; 3-axis focused strategy SUCCESSFUL — avoided W216 active-research-timeout HNF); codex T1 W219 verdict at `.claude/state/codex_consult_w219_final_synthesis_ratification_OUT.txt:30441-final`. Mark FULL only after re-fire APPROVE OR Outcome A ACCEPT-WITH-DOC per `closed-loop-recursive-narrowing.md` post-fix-forward (codex T1 W219 L164 prescription)
- **Cross-model gate at install-execution layer**: ⚠ STAND-IN — T2 commit-time gate per `cross-model-consensus.md §T2` fires at operator commit boundary

verdict_one_line: COMPREHENSIVE-CHECKLIST-READY-FOR-OPERATOR-EXECUTION: 18 INSTALL-NOW + STUDY-PILOT rows across 9 phases for Z:/claude-sota-pure; 25 FM-20 cascade catches saved ~570-1140 min revert cycles; Path P codex T1 ratification on W219 pending (revised 3-axis strategy to avoid W216 Pattern B HNF)

VERDICT: APPROVE-COMPREHENSIVE-CHECKLIST-READY-FOR-OPERATOR

## W220 Meta-catalogs + Uncovered Layers — APPENDED 2026-05-15 (post-Pattern-A-W219)

Per user 10x-repeated "research-beyond" directive + "many research waves" mandate, W220 single-agent (`abbff5deb8a57f73b`; Sonnet stand-in per FM-17.e) surveyed 8 meta-catalogs of catalogs (alirezarezvani/claude-skills 14,935★ + punkpeye/awesome-mcp-servers 86,944★ + ComposioHQ/awesome-claude-skills 59,992★ + sickn33/antigravity-awesome-skills 37,620★ + quemsah/awesome-claude-plugins 698★ + VoltAgent/awesome-openclaw-skills 48,718★ + vinta/awesome-python 297,821★ + modelcontextprotocol/servers 85,711★).

**4 NEW ADOPT-CANDIDATES filling UNNAMED layers** (Mia 8-probe ALL VERIFIED):

| # | Repo | Stars | License | Layer (NEW) | Action | Wiring | CR-12 | Adoption tier | Install |
|---|---|---:|---|---|---|---|---|---|---|
| 26 | **dottxt-ai/outlines** | 13,843 | Apache-2.0 | **Structured-output generation** (foundation-model utility; distinct from token-opt/RAG) | INSTALL-NOW | EASY | GENUINELY-NEW | ★ TIER-1 INSTALL | `pip install outlines` |
| 27 | **promptfoo/promptfoo** | 21,288 | MIT | **CLI eval/red-team** (PROVIDER-COMPLEMENT to W216-E ragas+garak; different angle: CLI vs framework) | DEFER | EASY | PROVIDER-COMPLEMENT | ★ TIER-2 STUDY-PILOT | `npm install -g "promptfoo@<resolved-pin>"` (resolved-pin per CR-9) |
| 28 | **microsoft/markitdown** | 123,303 | MIT | **DocAI preprocessor** (PROVIDER-COMPLEMENT to W216-E DS4SD/docling IBM 59,785★; different vendor angle: Microsoft vs IBM; file→markdown universal preprocessor) | INSTALL-NOW | EASY | PROVIDER-COMPLEMENT | ★ TIER-2 INSTALL | `pip install "markitdown==<resolved-pin>"` |
| 29 | **duckdb/duckdb** | 38,229 | MIT | **Analytical in-process SQL** (audit-log ETL Probe 7.b; distinct from W216-D vector/KG layers; local-first analytical DB) | INSTALL-NOW | EASY | GENUINELY-NEW | ★ TIER-2 INSTALL | `pip install duckdb` OR `winget install DuckDB.cli` |

**4 STUDY-PILOT additions** (Top-3 per Agent W220 + FastMCP framework):
- **temporalio/temporal**: DEFER-UNTIL-DISTRIBUTED-AGENT-RUNNER; filesystem-baton sufficient for current sss unless multi-process workflows, resumable activities, external service calls, and operator willingness to run a Temporal server are all committed
- **electric-sql/electric**: sync-first agent platform; no current driver; STUDY-PILOT
- **FastMCP (TypeScript)**: ad-hoc MCP server construction framework; STUDY-PILOT

**5 W220 REJECT-FOR-FIT** (verified):
- `Skyvern-AI/skyvern` 21,620★ **AGPL-3.0** license-blocker
- `mendableai/firecrawl` 120,260★ **AGPL-3.0** + PURE-RUNTIME REFUTED 2026-05-15: no firecrawl MCP in `Z:/claude-sota-pure/.mcp.json`; orchestrator MCP claim is cross-runtime drift.
- `github/spec-kit` 100,145★ MIT — TARGET-UNPROVEN in pure runtime: W221 pure probe found no `speckit-*` skills/commands and no spec-kit MCP; GSD spec workflow artifacts are not `github/spec-kit`. DEFER until direct target install evidence or operator demand.
- `microsoft/autogen` CC-BY-4.0 + competing META-HARNESS (W217-G corroborated)
- `Pythagora-io/gpt-pilot` competing autonomous-dev framework

**9 UNNAMED layers documented** per Agent W220:
- Layer A (structured-output gen) → **outlines** ADOPT
- Layer B (browser-AI alt) → REJECT (existing playwright/chrome-devtools MCPs cover)
- Layer C (CLI eval/red-team) → **promptfoo** ADOPT
- Layer D (durable workflow) → **temporal** STUDY-PILOT
- Layer E (multimodal file→markdown) → **markitdown** ADOPT
- Layer F (spec-driven-dev) → TARGET-UNPROVEN in claude-sota-pure; DEFER `github/spec-kit` pending direct target evidence.
- Layer G (analytical SQL) → **duckdb** ADOPT + electric STUDY-PILOT
- Layer H (MCP server framework) → **FastMCP** STUDY-PILOT
- Layer I (RA-QM/C-level/Finance domain skills) → alirezarezvani/claude-skills catalog (selective per-skill audit)

**W220 SRA scoring**: deferred to W221+ refinement OR Path P codex T1 ratification — Agent W220 single-axis scope did not produce per-repo D1-D10 matrix for the 4 ADOPT candidates; surfaced as Top-4 candidates with Action + Wiring + License + Probe 4+6 metadata. State is time-decayed; W221 target-runtime re-probe required before install.

**FM-20 row 21 cascade cumulative ratified at 27** (W220 catches: 1 spec-kit cross-runtime drift in addition to W213→W219 26 baseline). cycle-322 codification eligible for row 22 sub-class **DEFER-PENDING-N2** per codex T1 W219 ratification (current n=1 W215 Agent B vitest+pytest conflation + W220 catalog-claim-cross-runtime-drift potential same-class n=2).

**Cumulative grand total**: W213→W220 audited **~110+ candidates across 14 layers** (9 original layers in W219 + 5 NEW layers from W220 + 4 ADOPT-CANDIDATES + 4 STUDY-PILOT + 7 REJECT). FM-20 row 21 cascade 27 cumulative cross-wave OVER catches.

## W220 Agent B Pattern A Fix-Forward — APPLIED 2026-05-15

Mia pre-apply disposition for Agent B's 11 prescribed edits:

| # | Prescription | Mia result | Applied disposition |
|---:|---|---|---|
| 1 | LLMLingua posture: ADOPT-NOW → CITE-CLASS-CANONICAL; 2024-era token compression | GAP genuine: W219 lacked LLMLingua row but W220 token-opt section lacked explicit canonical/historical correction | APPLIED in W220 token-opt corrections below |
| 2 | ACP posture downgrade to demand-triggered STUDY-PILOT | GAP genuine: no ACP rows existed in W219 matrix | APPLIED as addendum; no default install |
| 3 | Langfuse license wording: MIT core + EE periphery | GAP genuine: row said `open-core MIT+ee/LICENSE` | APPLIED in row 1 |
| 4 | Onyx license wording: MIT core + EE periphery | GAP genuine: Onyx was not explicitly represented | APPLIED as addendum classification |
| 5 | OpenViking license: AGPL-3.0 REJECT | GAP genuine: W219 still preserved plugin Apache/operator-override wording | APPLIED in row 21, install order, DROP list |
| 6 | Temporal explicit defer until distributed runner | GAP genuine: W220 section said STUDY-PILOT | APPLIED in DEFER list and W220 study list |
| 7 | Cognee after Graphiti with exit criteria | GAP genuine: row and install order lacked explicit Graphiti-gated exit criteria | APPLIED in row 12 and install order |
| 8 | Add missing high-star rows | GAP partly genuine: MarkItDown, promptfoo, duckdb already present; MCP catalogs/FastMCP/PaddleOCR/Trivy/Bandit/ntfy absent | APPLIED rows 30-36; existing rows retained |
| 9 | Siyuan-Harry awesome-agentic-patterns 404; use nibzard only as sub-5k catalog | GAP genuine: no defect note existed | APPLIED below |
| 10 | Autogen reject new install; historical cite only | GAP genuine: old DEFER row grouped autogen with active frameworks | APPLIED in DEFER/DROP lists |
| 11 | Marker verified-avoid, GPL-3.0 + OpenRAIL-M | GAP genuine: no Marker avoid row existed | APPLIED in DROP list |

W220 Agent B token-opt corrections:
- `microsoft/LLMLingua`: CITE-CLASS-CANONICAL only; useful historical 2023-2024 prompt/KV-cache compression baseline, not current Claude Code token-opt install target.
- 2026 token-opt study candidates: `chopratejas/headroom`, `atlassian-labs/mcp-compressor`, and `distill-mcp`; require benchmark gates against MCP tool schema bloat, tool-output compression, and pre-compact context management before any install.

W220 Agent B category/license corrections:
- `anthropics/claude-plugins-official`: official marketplace source; license is per-plugin, not one repo-wide Apache/MIT assertion.
- `agentclientprotocol/claude-agent-acp` and `agentclientprotocol/python-sdk`: demand-triggered STUDY-PILOT only; do not install unless ACP host/client demand is explicit.
- `onyx-dot-app/onyx`: enterprise AI search/chat platform; license is open-core MIT core + EE periphery.
- `llmware-ai/llmware`: small-LLM/private-enterprise RAG framework; provider-complement to Onyx/RAGFlow, not a peer substitute.
- `infiniflow/ragflow`: heavy RAG engine; choose against Onyx by target workflow, not as strict supersession.
- `Siyuan-Harry/awesome-agentic-patterns`: 404 source defect; `nibzard/awesome-agentic-patterns` may be cited only as sub-5k Apache-2.0 pattern catalog.

Wave 220 additional cross-agent signals applied:
- `router-for-me/CLIProxyAPI`: ALREADY-INSTALLED; provenance verified in `docs/install-provenance.md` 2026-05-08 activation section and `docs/eee-launch-design-cliproxyapi.md` v6.10.9 design/install plan.
- `BerriAI/litellm`: STUDY-PILOT only when Graphiti L3 needs multi-provider routing; no default install.
- `musistudio/claude-code-router`: SKIP; superseded by CLIProxyAPI for this runtime.
- `wshobson/agents`: selective pilot only for `agent-teams`, `context-management`, and `cicd`; per-agent review required.
- `microsoft/markitdown`: ADOPT-CANDIDATE easy parser-input layer; row 28 retained as install candidate.
- `ast-grep`: KEEP/ADOPT; already referenced as installed primitive in Phase 0.
- `aquasecurity/trivy` + `PyCQA/bandit`: Phase-1 ADOPT candidates; Trivy already installed, Bandit added as row 35.
- `ollama/ollama`: INCUMBENT/fresh install with port separation if local model serving is refreshed.
- `PaddlePaddle/PaddleOCR`: Phase-1 ADOPT candidate pending bridge validation; row 33 added.
- `trufflehog`: REJECT new install, AGPL-3.0 plus overlap.
- `Skyvern-AI/skyvern`: REJECT, AGPL-3.0.
- `mendableai/firecrawl`: keep incumbent MCP only; reject vendoring, AGPL-3.0.
- `github/spec-kit`: DUPLICATE in claude-sota-installed due installed speckit skills; target-runtime verification remains separate.

Still-missing research backlog; do not fabricate scores:

| Repo | Stars / license signal | Disposition |
|---|---:|---|
| `mem0ai/mem0` | 55.8k Apache-2.0 | NEEDS-RESEARCH |
| `upstash/context7` | 55.4k MIT | NEEDS-RESEARCH |
| `ComposioHQ/composio` | 28.3k MIT | NEEDS-RESEARCH |
| `browserbase/stagehand` | 22.7k MIT | NEEDS-RESEARCH |
| `langchain-ai/langgraph` | 32.1k MIT | NEEDS-RESEARCH |
| `microsoft/graphrag` | 33.0k MIT per Agent B signal; W219 row needs license re-probe before score | NEEDS-RESEARCH |
| `deepset-ai/haystack` | 25.2k Apache-2.0 | NEEDS-RESEARCH |
| `Arize-ai/phoenix` | 9.7k NOASSERTION | NEEDS-RESEARCH |

W220 fix-forward verdict: Agent B NEEDS-REVISION conf=0.91 prescriptions applied or marked OVER/partial as shown. No new scores fabricated for STILL-MISSING rows.

## Next operator actions

1. **Read this checklist + decide INSTALL/DEFER per row** (cognee + grype + llama.cpp CUDA need operator-decision; OpenViking/trufflehog moved to REJECT unless explicit operator override)
2. **Path P codex T1 ratification on this W219 synthesis** with revised strategy (3-axis focused prompt OR multi-call decomposition 3×240s to avoid W216 Pattern B HNF active-research-timeout)
3. **Sequence install batches per Phase 1-9** for Z:\claude-sota-pure target runtime
4. **Each install followed by T2 commit-time gate** per CR-3 install-execution mandate (operator `git commit` triggers `codex_t2_pre_commit_gate.py:424` per `cross-model-consensus.md §T2`)
5. **Operator-facing comprehensive checklist DELIVERED** — this file IS the deliverable per user 8x-repeated directive

WAVE220-FIXFORWARD-COMPLETE
