---
title: W221-C APPROVED Catalog — Z:/claude-sota-pure Runtime
status: APPROVED
date: 2026-05-15
wave: 221-C
artifact-class: approved-pure-runtime-catalog
sources: W219 synthesis + W220 Agent I + W221-A NEEDS-REVISION prescriptions + W221-B output probe
---

# RATIFY-STATUS: APPROVE-AS-W219

| Gate | Result |
|---|---|
| W221-A 6 edits | APPLIED to W219/W220 |
| W221-B MCP findings | output file exists but is empty; no MCP additions |
| Pure target probe | `.mcp.json` has memory/github/context7/deepwiki/repomix/git/fetch/time/sequentialthinking/filesystem/gitnexus/chrome-devtools/playwright/serena/ccusage |
| Pure refutations | no `langfuse`, `graphiti`, `qdrant`, `phoenix`, `firecrawl`, `spec-kit`; `semgrep.exe` absent in pure `.local/bin` |
| Final disposition | APPROVED catalog after W221-A corrections |

## D1-D10 Reference

| Code | Meaning | Required evidence |
|---|---|---|
| D1 | License/use-class | admissible license for local runtime use |
| D2 | Freshness | active release/tag/HEAD; stale catalog claims marked |
| D3 | Fit | named pure-runtime layer or explicit complement |
| D4 | Maintainer | official/canonical/vendor signal |
| D5 | Install channel | CR-6 official native install path |
| D6 | Runtime shape | MCP/plugin/skill/CLI/library shape clear |
| D7 | Security | service/secrets/network/license risks bounded |
| D8 | Adoption | stars/community signal when material |
| D9 | Reversibility | disable/uninstall/rollback path |
| D10 | Target state | pure runtime checked; no cross-runtime overclaim |

Target-state categories: `pure-confirmed`, `installed-runtime-only`, `global-tool-only`, `module-present-env`, `not-present`.

## Final 29-Row Catalog

| # | Layer | Repo | Action | Target-state | Install/wire | Pin/risk note |
|---:|---|---|---|---|---|---|
| 1 | Observability | langfuse/langfuse | PILOT-SERVICE | installed-runtime-only | compose + MCP | pin compose release/SHA + MCP version |
| 2 | RAG framework | run-llama/llama_index | INSTALL-NOW | not-present | `llama-index-core==<verified>` | resolved PyPI pin |
| 3 | Eval red-team | NVIDIA/garak | INSTALL-NOW | global-tool-only | `pip install garak` | exact version before pure wire |
| 4 | Obs substrate | traceloop/openllmetry | CITE-NOW | not-present | cite only | phoenix target refuted |
| 5 | Vector | qdrant/qdrant | REGISTER-MCP | not-present | Docker + `uvx mcp-server-qdrant==0.8.1` | `qdrant/qdrant:v1.17.0`; record digest |
| 6 | Memory KG | getzep/graphiti | REGISTER-MCP | installed-runtime-only | `graphiti-core[falkordb]==0.29.0` + FalkorDB | `falkordb/falkordb:v1.6.1`; pure wire absent |
| 7 | DocAI | DS4SD/docling | INSTALL-NOW | not-present | `pip install docling` | resolved PyPI pin |
| 8 | Chunking | chonkie-inc/chonkie | INSTALL-NOW | not-present | `pip install chonkie` | resolved PyPI pin |
| 9 | RAG eval | explodinggradients/ragas | INSTALL-NOW | not-present | `pip install ragas` | resolved PyPI pin |
| 10 | Agent skills | obra/superpowers | ADD-SKILL | installed-runtime-only | vendor 3 un-vendored skills | cite-import-AMBER |
| 11 | Memory MCP | doobidoo/mcp-memory-service | REGISTER-MCP | pure-confirmed | already in pure `.mcp.json` | preserve |
| 12 | Topo memory | topoteretes/cognee | PILOT-PLUGIN | not-present | `cognee==1.0.8` or newer verified | pilot after Graphiti baseline |
| 13 | Official hooks | anthropics/cwc-long-running-agents | CITE-NOW | pure-confirmed | `.local/cwc/` hooks | verify anchors |
| 14 | Vector alt | chroma-core/chroma | DEFER | not-present | none | qdrant first |
| 15 | Foundation refs | anthropics/claude-cookbooks | CITE-NOW | module-present-env | cite only | no install |
| 16 | CC plugin | affaan-m/everything-claude-code | ADD-PLUGIN | installed-runtime-only | plugin cache | verify pure before enable |
| 17 | Agent marketplace | wshobson/agents | ADD-PLUGIN | pure-confirmed | marketplace plugin | already enabled |
| 18 | Context plugin | mksglu/context-mode | ADD-PLUGIN | installed-runtime-only | plugin | license re-verify |
| 19 | Pack/MCP | yamadashy/repomix | REGISTER-MCP | pure-confirmed | pure `.mcp.json` | preserve |
| 20 | Prompt evolution | gepa-ai/gepa | DEFER | not-present | none | study-pilot only |
| 21 | Memory plugin | volcengine/OpenViking | PILOT-PLUGIN | not-present | plugin/examples only | pin commit; AGPL backend requires operator override |
| 22 | Secrets | getsops/sops | CITE-NOW | pure-confirmed | `.local/bin/sops.exe` | preserve W214 |
| 23 | Test | vitest | CITE-NOW | global-tool-only | npm-global | preserve W214 |
| 24 | Audit hook | ECC governance-capture | CITE-NOW | pure-confirmed | env flip | preserve W214 |
| 25 | RAG alt | microsoft/graphrag | DEFER | not-present | none | exact PyPI pin if promoted |
| 26 | Structured output | dottxt-ai/outlines | INSTALL-NOW | not-present | `pip install outlines` | resolved PyPI pin |
| 27 | CLI eval | promptfoo/promptfoo | DEFER | global-tool-only | none by default | pure/global state re-probe |
| 28 | File to markdown | microsoft/markitdown | INSTALL-NOW | not-present | `markitdown==<verified>` | resolved PyPI pin |
| 29 | Audit SQL | duckdb/duckdb | INSTALL-NOW | not-present | `pip install duckdb` | resolved PyPI pin |

## Install Order

| Phase | Action |
|---:|---|
| 0 | Preserve already-landed pure rows: memory MCP, repomix, playwright/chrome-devtools, sops, governance-capture, wshobson, cwc |
| 1 | Foundation pins: resolve exact PyPI/npm/docker versions; record digests before mutation |
| 2 | Memory: doobidoo already present; add Graphiti + FalkorDB pinned; run persistence/search smoke |
| 3 | Vector: start Qdrant pinned image; add `mcp-server-qdrant==0.8.1`; smoke collection create/query |
| 4 | RAG/DocAI: llama_index, docling, chonkie, ragas, outlines, markitdown, duckdb |
| 5 | Observability: Langfuse compose pilot; keep Phoenix deferred/refuted unless explicitly selected |
| 6 | Eval: garak install in isolated/pinned path; promptfoo remains DEFER until pure/global conflict re-probe |
| 7 | Agent skills/plugins: superpowers selective vendor; ECC/context-mode only after pure-target duplicate check |
| 8 | Optional pilots: cognee after Graphiti baseline; OpenViking plugin only with AGPL backend override; Temporal/Electric/FastMCP remain study-pilot |
| 9 | Deferred complements: chroma, graphrag, gepa, spec-kit target-unproven |

## MCP Layer Additions From W221-B

| Source | Finding | Catalog effect |
|---|---|---|
| `a55ed2bd027f1df57.output` | file exists but empty | no new MCP rows |
| Pure `.mcp.json` probe | memory/github/context7/deepwiki/repomix/git/fetch/time/sequentialthinking/filesystem/gitnexus/chrome-devtools/playwright/serena/ccusage | confirms existing pure MCP baseline |
| Pure `.mcp.json` probe | no langfuse/graphiti/qdrant/phoenix/firecrawl/spec-kit | refutes installed-runtime/session claims for target |

## CR-9 Service Pins

| Service row | CR-9 closure |
|---|---|
| langfuse | pin compose source by release tag/commit SHA; pin MCP server exact version; record image digests |
| qdrant | use `qdrant/qdrant:v1.17.0` plan pin; record digest; MCP `mcp-server-qdrant==0.8.1` |
| graphiti | use `graphiti-core[falkordb]==0.29.0`; FalkorDB `v1.6.1`; smoke before claiming live |
| cognee | use `cognee==1.0.8` or newer exact verified PyPI pin; pilot after Graphiti |
| OpenViking | pin plugin/examples commit SHA; backend AGPL install requires explicit operator override |
| graphrag | DEFER; if promoted, exact PyPI pin + isolated env |

## W221-A Corrections Applied

| # | Correction | Status |
|---:|---|---|
| 1 | Replace boolean native labels with action labels | APPLIED |
| 2 | Split target-state into 5 categories | APPLIED |
| 3 | Add pure-runtime refutations for spec-kit/firecrawl/semgrep/phoenix; mark W220 state time-decayed | APPLIED |
| 4 | Add D1-D10 decomposition; remove un-decomposed score claims | APPLIED |
| 5 | Close CR-9 pins for service rows | APPLIED |
| 6 | Treat github/spec-kit as target-unproven in pure runtime | APPLIED |

## FM-20 Row 21 Corrections Summary

| Catch | Correction |
|---|---|
| spec-kit | W220 duplicate claim was session/orchestrator drift; pure target has GSD spec artifacts, not verified `github/spec-kit` |
| firecrawl | orchestrator MCP/session claim refuted for pure target; no pure `.mcp.json` entry |
| semgrep | orchestrator/global install claim refuted for pure local bin |
| phoenix | installed-runtime MCP wire refuted for pure target |
| langfuse/graphiti/qdrant | installed-runtime service evidence is not pure-runtime target proof |

RATIFY-VERDICT: APPROVE-AS-W219
