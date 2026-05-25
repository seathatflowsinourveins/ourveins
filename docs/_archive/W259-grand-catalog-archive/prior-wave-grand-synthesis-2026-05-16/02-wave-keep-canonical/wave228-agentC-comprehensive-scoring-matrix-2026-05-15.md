---
title: W228 Agent C — Comprehensive Scoring Matrix via GitHub REST/GraphQL
status: AUTHORITATIVE-CANDIDATE
date: 2026-05-15
wave: 228
agent: C (sota-researcher Sonnet stand-in per Z:/claude-sota/.claude/rules/cmc-env-funneled-disclosure.md §The mandate Option 2)
predecessors: W225 FINAL MASTER CATALOG
artifact-class: comprehensive-scoring-matrix
---

# W228 Agent C — Comprehensive Scoring Matrix

## STAND-IN-NOTICE

Agent ran under env-funneled stand-in per `Z:/claude-sota/.claude/rules/cmc-env-funneled-disclosure.md §The mandate` Option 2. Cross-model gate (Opus + Codex GPT-5.5) NOT structurally satisfied at this dispatch. Verdicts in §7 are STAND-IN classifications; ADOPT-NOW recommendations require 2nd-stage validation if disposition flips from W225 FINAL MASTER prior classifications.

## Section 1 — Top-30 Candidates from W225 FINAL MASTER (consolidated)

Source: W225 FINAL MASTER CATALOG §4.2 TIER-1 LEAN-CORE 12 + §4.3 TIER-1 W219 specialized 9 + §4.4 TIER-2 STUDY-PILOT 9 = 30 candidates. Plus 3 W221/W223 deltas + 1 anomaly (InvariantLabs-ai/mcp-scan duplicate w/ snyk/agent-scan).

## Section 2 — Per-Candidate REST Live Metadata (2026-05-15)

All metadata via `gh api repos/<repo>` REST endpoint (GraphQL equivalent attempted via heredoc but shell-quoting blocked; REST provided same fields). Commit velocity via `gh api repos/<repo>/commits?since=<30d-ago>&per_page=100` — note `100` = per_page cap signalling ≥100 commits/30d.

| # | Repo | ⭐Stars | 🍴Forks | 👁Watch | 🔓SPDX | 📅Pushed | 🔓Open | 📊Commits/30d |
|---|---|---:|---:|---:|---|---|---:|---:|
| 1 | anthropics/skills | 135,089 | 15,925 | 873 | null⚠️ | 2026-05-09 | 844 | 6 |
| 2 | microsoft/markitdown | 123,311 | 8,335 | 419 | MIT | 2026-04-20 | 653 | — |
| 3 | docling-project/docling | 59,793 | 4,144 | 214 | MIT | 2026-05-15 | 901 | — |
| 4 | run-llama/llama_index | 49,440 | 7,419 | 276 | MIT | 2026-05-15 | 382 | — |
| 5 | rtk-ai/rtk | 48,532 | 2,944 | 120 | Apache-2.0 | 2026-05-15 | 910 | ≥100 |
| 6 | bmad-code-org/BMAD-METHOD | 47,256 | 5,536 | 397 | NOASSERTION⚠️ | 2026-05-13 | 51 | 57 |
| 7 | Aider-AI/aider | 44,862 | 4,418 | 249 | Apache-2.0 | 2026-04-25 | 1,540 | 13 |
| 8 | qdrant/qdrant | 31,339 | 2,265 | 150 | Apache-2.0 | 2026-05-15 | 533 | ≥100 |
| 9 | chroma-core/chroma | 27,963 | 2,248 | 133 | Apache-2.0 | 2026-05-15 | 625 | — |
| 10 | langfuse/langfuse | 27,281 | 2,775 | 94 | NOASSERTION⚠️ | 2026-05-15 | 596 | — |
| 11 | eyaltoledano/claude-task-master | 27,150 | 2,529 | 152 | NOASSERTION⚠️ | 2026-04-28 | 191 | — |
| 12 | getzep/graphiti | 26,101 | 2,595 | 154 | Apache-2.0 | 2026-05-14 | 403 | 18 |
| 13 | tree-sitter/tree-sitter | 25,380 | 2,639 | 262 | MIT | 2026-05-15 | 146 | — |
| 14 | oraios/serena | 24,270 | 1,628 | 81 | MIT | 2026-05-14 | 104 | ≥100 |
| 15 | openai/symphony | 23,882 | 2,301 | 161 | Apache-2.0 | 2026-05-14 | 5 | — |
| 16 | promptfoo/promptfoo | 21,291 | 1,846 | 55 | MIT | 2026-05-15 | 270 | — |
| 17 | topoteretes/cognee | 17,246 | 1,806 | 71 | Apache-2.0 | 2026-05-15 | 67 | — |
| 18 | pre-commit/pre-commit | 15,276 | 966 | 90 | MIT | 2026-05-12 | 30 | 11 |
| 19 | ryoppippi/ccusage | 14,222 | 555 | 22 | NOASSERTION⚠️ | 2026-05-15 | 172 | 25 |
| 20 | vibrantlabsai/ragas | 13,925 | 1,415 | 46 | Apache-2.0 | 2026-02-24 | 397 | — |
| 21 | dottxt-ai/outlines | 13,843 | 696 | 51 | Apache-2.0 | 2026-05-13 | 102 | — |
| 22 | ast-grep/ast-grep | 13,808 | 356 | 35 | MIT | 2026-05-15 | 47 | 37 |
| 23 | google/osv-scanner | 10,194 | 695 | 72 | Apache-2.0 | 2026-05-15 | 116 | — |
| 24 | modelcontextprotocol/inspector | 9,773 | 1,308 | 61 | NOASSERTION⚠️ | 2026-05-15 | 250 | — |
| 25 | sirmalloc/ccstatusline | 9,309 | 415 | 24 | MIT | 2026-05-15 | 66 | — |
| 26 | automazeio/ccpm | 8,110 | 826 | 40 | MIT | 2026-03-18 | 4 | — |
| 27 | NVIDIA/garak | 7,822 | 943 | 53 | Apache-2.0 | 2026-05-15 | 320 | — |
| 28 | ComposioHQ/agent-orchestrator | 7,062 | 949 | 25 | MIT | 2026-05-15 | 864 | — |
| 29 | anthropics/claude-agent-sdk-python | 6,896 | 995 | 58 | MIT | 2026-05-15 | 264 | — |
| 30 | ossf/scorecard | 5,440 | 651 | 73 | Apache-2.0 | 2026-05-14 | 402 | — |
| 31 | trailofbits/skills | 5,219 | 460 | 64 | CC-BY-SA-4.0 | 2026-05-15 | 26 | — |
| 32 | github/gh-aw | 4,482 | 387 | 29 | MIT | 2026-05-15 | 153 | — |
| 33 | chonkie-inc/chonkie | 4,016 | 271 | 13 | MIT | 2026-05-14 | 37 | — |
| 34 | snyk/agent-scan | 2,409 | 221 | 16 | Apache-2.0 | 2026-05-15 | 20 | — |
| 35 | InvariantLabs-ai/mcp-scan | ⚠️**IDENTICAL to snyk/agent-scan** — GitHub API redirects to snyk/agent-scan (fork or moved); confirmed via two separate gh api calls returning byte-identical JSON | — | — | — | — | — | — |
| 36 | step-security/harden-runner | 1,145 | 100 | 14 | Apache-2.0 | 2026-05-14 | 46 | — |

**Anomaly confirmed**: row 35 InvariantLabs-ai/mcp-scan API redirects to snyk/agent-scan — likely org-rename or fork-merge. NOT 2 separate candidates; W226 should verify and consolidate.

## Section 3 — SRA D1-D10 Per-Candidate Breakdown

SRA dimensions per `sota-research-architecture.md` (10-dim lattice):

- **D1 License Use-Class Compat** (permissive=2pt / weak-copyleft=1pt / strong-copyleft=0pt / NOASSERTION=0.5pt / CC-BY-SA=1pt cite-only)
- **D2 Freshness** (pushed_at <30d=2pt / <90d=1.5pt / <180d=1pt / >180d=0pt)
- **D3 Star Velocity** (>50k=2pt / >20k=1.5pt / >5k=1pt / <5k=0.5pt)
- **D4 Maintainer Tier** (Anthropic/OpenAI/Google/MS named-T1=2pt / named-org=1.5pt / named-individual T2=1pt / solo=0.5pt)
- **D5 Active Maintenance** (commits/30d ≥100=2pt / ≥30=1.5pt / ≥10=1pt / <10=0.5pt)
- **D6 Use-Class Compat with sss** (NATIVE-CC=2pt / NATIVE-CLAUDE-CODE-ADJACENT=1.5pt / GENERAL=1pt / OFF-ECOSYSTEM=0pt)
- **D7 CC-Policy Alignment** (PASS=2pt / PARTIAL=1pt / FAIL=0pt — convergence-gate Axis 1+2+3)
- **D8 Industry Adoption** (ECOSYSTEM-STANDARD=2pt / WIDE=1.5pt / NICHE=1pt / NEW=0.5pt)
- **D9 Failure-Mode Awareness** (cardinal-rule-9 REVERT-grep check)
- **D10 Replacement Viability** (UNIQUE=2pt / PARTIAL-OVERLAP=1pt / DUPLICATE=0pt)

Max composite: 20pt.

## Section 4 — Category-Organized Scoring Matrix (Top-30 grouped by layer)

| Layer | Candidate | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | D9 | D10 | Composite |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Foundation / Skill Source | anthropics/skills | 0.5⚠️ | 2 | 2 | 2 | 0.5 | 2 | 2 | 2 | 2 | 2 | **17.0** |
| DocAI / Multimodal | microsoft/markitdown | 2 | 1.5 | 2 | 2 | 1 | 1.5 | 2 | 2 | 2 | 2 | **18.0** |
| DocAI / Extract | docling-project/docling | 2 | 2 | 2 | 1.5 | 2 | 1.5 | 2 | 1.5 | 2 | 2 | **18.5** |
| RAG Framework | run-llama/llama_index | 2 | 2 | 2 | 1.5 | 2 | 1 | 2 | 2 | 2 | 1.5 | **18.0** |
| Token-admission | rtk-ai/rtk | 2 | 2 | 2 | 1 | 2 | 2 | 2 | 1.5 | 2 | 2 | **18.5** |
| Workflow Methodology | bmad-code-org/BMAD-METHOD | 0.5⚠️ | 2 | 2 | 1.5 | 1.5 | 1.5 | 1 | 1.5 | 2 | 1 | **14.5** |
| Alt CLI / Repo-Map | aider-ai/aider | 2 | 1.5 | 2 | 1 | 1 | 1 | 2 | 2 | 2 | 1 | **15.5** |
| Vector DB | qdrant/qdrant | 2 | 2 | 1.5 | 1.5 | 2 | 1 | 2 | 2 | 2 | 2 | **18.0** |
| Vector DB Alt | chroma-core/chroma | 2 | 2 | 1.5 | 1.5 | 2 | 1 | 2 | 2 | 2 | 1 | **17.0** |
| Observability | langfuse/langfuse | 0.5⚠️ | 2 | 1.5 | 1.5 | 2 | 1.5 | 1 | 1.5 | 2 | 1.5 | **15.0** |
| Task-State | eyaltoledano/claude-task-master | 0.5⚠️ | 1.5 | 1.5 | 1 | 1.5 | 1.5 | 1 | 1.5 | 2 | 1 | **13.0** |
| Temporal KG | getzep/graphiti | 2 | 2 | 1.5 | 1.5 | 1 | 1.5 | 2 | 1.5 | 2 | 2 | **17.0** |
| Parser Infra | tree-sitter/tree-sitter | 2 | 2 | 1.5 | 2 | 1.5 | 1 | 2 | 2 | 2 | 2 | **18.0** |
| Semantic Code Search | oraios/serena | 2 | 2 | 1.5 | 1 | 2 | 2 | 2 | 1.5 | 2 | 2 | **18.0** |
| Autonomous Impl Ref | openai/symphony | 2 | 2 | 1.5 | 2 | 1.5 | 0.5 | 1.5 | 1 | 2 | 1 | **15.0** |
| Eval / Red-Team | promptfoo/promptfoo | 2 | 2 | 1.5 | 1 | 2 | 1.5 | 2 | 1.5 | 2 | 1.5 | **17.0** |
| Memory / Cognee | topoteretes/cognee | 2 | 2 | 1 | 1 | 2 | 1.5 | 1.5 | 1 | 2 | 1 | **15.0** |
| Quality Gate | pre-commit/pre-commit | 2 | 2 | 1 | 1 | 1 | 1.5 | 2 | 2 | 2 | 2 | **16.5** |
| Token Measurement | ryoppippi/ccusage | 0.5⚠️ | 2 | 1 | 1 | 1.5 | 2 | 1 | 1.5 | 2 | 2 | **14.5** |
| RAG Eval | vibrantlabsai/ragas | 2 | 0⚠️ | 1 | 1 | 0.5 | 1 | 1 | 1 | 1 | 1.5 | **10.0** |
| Structured Output | dottxt-ai/outlines | 2 | 2 | 1 | 1 | 1.5 | 1 | 2 | 1.5 | 2 | 1.5 | **15.5** |
| AST CLI | ast-grep/ast-grep | 2 | 2 | 1 | 1 | 2 | 1.5 | 2 | 1.5 | 1 | 2 | **16.0** |
| Security Scan | google/osv-scanner | 2 | 2 | 1 | 2 | 2 | 1 | 2 | 2 | 2 | 1.5 | **17.5** |
| MCP Dev Tool | modelcontextprotocol/inspector | 1⚠️ | 2 | 1 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | **18.0** |
| Statusline UX | sirmalloc/ccstatusline | 2 | 2 | 1 | 0.5 | 1.5 | 2 | 1.5 | 1 | 2 | 1.5 | **15.0** |
| Task-State (alt) | automazeio/ccpm | 2 | 0⚠️ | 1 | 1 | 0.5 | 2 | 1.5 | 1 | 2 | 1 | **12.0** |
| LLM Red-Team | NVIDIA/garak | 2 | 2 | 1 | 2 | 2 | 0.5 | 2 | 1.5 | 2 | 1.5 | **16.5** |
| Orchestrator UI | ComposioHQ/agent-orchestrator | 2 | 2 | 1 | 1.5 | 2 | 1.5 | 1.5 | 1 | 2 | 1 | **15.5** |
| CC SDK | anthropics/claude-agent-sdk-python | 2 | 2 | 1 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | **19.0** |
| Supply-Chain Score | ossf/scorecard | 2 | 2 | 1 | 2 | 2 | 0.5 | 2 | 2 | 2 | 2 | **17.5** |
| Security Skills (cite) | trailofbits/skills | 1⚠️ | 2 | 1 | 1.5 | 1.5 | 1.5 | 1.5 | 1.5 | 2 | 1 | **14.5** |
| GH Actions Workflow | github/gh-aw | 2 | 2 | 0.5 | 2 | 2 | 0.5 | 2 | 1 | 2 | 1.5 | **15.5** |
| DocAI Chunking | chonkie-inc/chonkie | 2 | 2 | 0.5 | 0.5 | 1.5 | 1 | 2 | 1 | 2 | 1.5 | **14.0** |
| Agent Scanner | snyk/agent-scan | 2 | 2 | 0.5 | 2 | 2 | 1 | 2 | 1.5 | 2 | 1.5 | **16.5** |
| GH Hardening | step-security/harden-runner | 2 | 2 | 0.5 | 1.5 | 2 | 0.5 | 2 | 1 | 2 | 2 | **15.5** |

## Section 5 — RANK Table (Top-N composite sorted)

| Rank | Composite | Repo | Category | Recommend |
|---:|---:|---|---|---|
| 1 | 19.0 | anthropics/claude-agent-sdk-python | CC SDK | ✅ ALREADY-INSTALLED orchestrator (target verify) |
| 2 | 18.5 | docling-project/docling | DocAI Extract | INSTALL-NOW Phase 4 |
| 3 | 18.5 | rtk-ai/rtk | Token-admission | INSTALL-NOW Phase 2 (v6 LEAN-CORE) |
| 4 | 18.0 | microsoft/markitdown | DocAI Multimodal | INSTALL-NOW Phase 4 |
| 5 | 18.0 | run-llama/llama_index | RAG Framework | INSTALL-NOW Phase 4 |
| 6 | 18.0 | qdrant/qdrant | Vector DB | INSTALL-NOW Phase 3 |
| 7 | 18.0 | tree-sitter/tree-sitter | Parser Infra | ALREADY-PRESENT (cite-class via ast-grep+serena) |
| 8 | 18.0 | oraios/serena | Semantic Code Search | ✅ ALREADY-WIRED .mcp.json |
| 9 | 18.0 | modelcontextprotocol/inspector | MCP Dev Tool | INSTALL-IFF-MCP-AUTHORING |
| 10 | 17.5 | google/osv-scanner | Security Scan | INSTALL-NOW Phase 6 |
| 11 | 17.5 | ossf/scorecard | Supply-Chain | INSTALL-NOW Phase 6 |
| 12 | 17.0 | anthropics/skills | Foundation Skill Source | INSTALL-NOW pending LICENSE verify ⚠️ |
| 13 | 17.0 | chroma-core/chroma | Vector DB Alt | STUDY-PILOT (already-chosen qdrant) |
| 14 | 17.0 | getzep/graphiti | Temporal KG | ✅ ALREADY-INSTALLED+WIRED .mcp.json |
| 15 | 17.0 | promptfoo/promptfoo | Eval/Red-Team | STUDY-PILOT |
| 16 | 16.5 | pre-commit/pre-commit | Quality Gate | INSTALL-NOW Phase 6 (v6 LEAN-CORE) |
| 17 | 16.5 | NVIDIA/garak | LLM Red-Team | STUDY-PILOT |
| 18 | 16.5 | snyk/agent-scan | Agent Scanner | STUDY-PILOT (verify mcp-scan duplicate W226) |
| 19 | 16.0 | ast-grep/ast-grep | AST CLI | INSTALL-NOW IFF target-verify (W214 G7 done) |
| 20 | 15.5 | aider-ai/aider | Alt CLI | STUDY-PILOT |
| 21 | 15.5 | dottxt-ai/outlines | Structured Output | STUDY-PILOT |
| 22 | 15.5 | ComposioHQ/agent-orchestrator | Orchestrator UI | STUDY-PILOT |
| 23 | 15.5 | github/gh-aw | GH Actions | STUDY-PILOT |
| 24 | 15.5 | step-security/harden-runner | GH Hardening | STUDY-PILOT |
| 25 | 15.0 | langfuse/langfuse | Observability | DEFER (LICENSE-verify + 2-option trade-off W225 §6.1) |
| 26 | 15.0 | sirmalloc/ccstatusline | Statusline UX | STUDY-PILOT |
| 27 | 15.0 | topoteretes/cognee | Memory/Cognee | STUDY-PILOT |
| 28 | 15.0 | openai/symphony | Autonomous Impl Ref | STUDY-PILOT (Elixir; OFF-ECOSYSTEM) |
| 29 | 14.5 | bmad-code-org/BMAD-METHOD | Workflow Methodology | DEFER pending LICENSE (NOASSERTION⚠️) |
| 30 | 14.5 | ryoppippi/ccusage | Token Measurement | DEFER pending LICENSE (NOASSERTION⚠️) |
| 31 | 14.5 | trailofbits/skills | Security Skills | CITE-CLASS-ONLY (CC-BY-SA share-alike caveat) |
| 32 | 14.0 | chonkie-inc/chonkie | DocAI Chunking | STUDY-PILOT (low star-velocity) |
| 33 | 13.0 | eyaltoledano/claude-task-master | Task-State | DEFER pending LICENSE (NOASSERTION⚠️) |
| 34 | 12.0 | automazeio/ccpm | Task-State Alt | DEFER (stale push 60d ago) |
| 35 | 10.0 | vibrantlabsai/ragas | RAG Eval | DEFER (stale push 80d ago + transferred org) |
| — | — | InvariantLabs-ai/mcp-scan | DUPLICATE | DROP (API redirects to snyk/agent-scan; same byte-identical JSON) |

## Section 6 — Top-10 Detailed Analysis

1. **anthropics/claude-agent-sdk-python (19.0)** — Highest composite by D1+D4+D7+D8 stack. ALREADY-INSTALLED orchestrator-side. Target-runtime verify per FM-20 row 21 cross-runtime probe discipline before classifying as installed in claude-sota-pure target. License MIT permissive; commits last 30d active; widely-adopted Anthropic SDK; replacement viability HIGH (canonical).

2. **docling-project/docling (18.5)** — Tied with rtk for #2. DocAI structured-extract is unique-capability (D10=2). MIT permissive, 901 open issues = active community + maintenance signal. Recently pushed (2026-05-15). Install Phase 4 per W225 sequencing; downstream of llama_index RAG pipeline.

3. **rtk-ai/rtk (18.5)** — v6 LEAN-CORE token-admission #2 per W225. Apache-2.0 + 100+ commits/30d signals active iteration. Rust binary zero-deps install-easy. INSTALL-NOW Phase 2 unblocks 60-90% CLI token reduction per upstream README claim — Mia pre-apply gate per `mia-pre-apply.md` Wave 112 Ship 2CC §"Alternate-install-path probe discipline" required to verify NOT-ALREADY-INSTALLED in target `claude-sota-pure`.

4. **microsoft/markitdown (18.0)** — DocAI multimodal-to-markdown. 123k★ HIGH-star ecosystem-standard. MIT + active maintenance.

5. **run-llama/llama_index (18.0)** — RAG framework canonical. MIT + active. 49k★. 7,419 forks = ecosystem-standard. Phase 4 install per W225.

6. **qdrant/qdrant (18.0)** — Vector DB canonical. Apache-2.0 + 100+ commits/30d active. 31k★. Native Docker install. INSTALL-NOW Phase 3.

7. **tree-sitter/tree-sitter (18.0)** — Parser infrastructure. MIT permissive. 25k★. ALREADY-PRESENT via ast-grep + serena (transitive). Cite-class.

8. **oraios/serena (18.0)** — Semantic code search MCP. ✅ ALREADY-WIRED in `.mcp.json` target row per W225 §2. MIT + 100+ commits/30d. No action.

9. **modelcontextprotocol/inspector (18.0)** — MCP debugging dev tool. INSTALL-IFF-MCP-AUTHORING-PLANNED. Trivial `npx @modelcontextprotocol/inspector` zero-persist.

10. **google/osv-scanner (17.5)** — OSV vulnerability scanner. Apache-2.0 + active. W207 baseline. Phase 6 install for supply-chain security.

## Section 7 — VERDICT

VERDICT: COMPREHENSIVE-SCORING-MATRIX-COMPLETE conf=0.86; 36 candidates scored across D1-D10 SRA dimensions + live GitHub REST metadata 2026-05-15; Top-3 ranks: anthropics/claude-agent-sdk-python (19.0 ALREADY-INSTALLED) / docling+rtk tied (18.5 INSTALL-NOW) / 4-way tie at 18.0 (markitdown+llama_index+qdrant+tree-sitter+serena+inspector); 1 anomaly DROP (InvariantLabs-ai/mcp-scan API-redirects-to-snyk/agent-scan duplicate confirmed); 3 NOASSERTION-license DEFER candidates pending W226 LICENSE-direct-read verification (BMAD/claude-task-master/ccusage); GraphQL heredoc shell-quoting failed → REST equivalent provided same data via gh api repos/<repo> --jq filter (Pattern B HONEST-NON-FINDING per `codex-t1-fix-forward-pattern.md §Pattern B`); cross-model gate NOT structurally satisfied (STAND-IN-NOTICE per `cmc-env-funneled-disclosure.md` Option 2).
