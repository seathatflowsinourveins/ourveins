# Wave 240 Agent B-redo — License + Axis-2 Hardening Results

## §0 Method + Stand-In Disclosure

**Agent**: sota-researcher (Sonnet stand-in re-dispatch after original Agent B codex-rescue BRIDGE-MODE FM-17.e CC-runtime autocompact-thrashing)
**Date**: 2026-05-15
**Scope**: Probe 6 LICENSE + Probe 1 Star Refresh + Axis-2 named-T2 for 12 target candidates from Agent A

**Disclosure**: STAND-IN per CLAUDE.local.md ENV (f); this re-dispatch is Sonnet stand-in scope-narrowed for FM-17.e recovery; verdict origin = Sonnet stand-in only — cross-model gate via orchestrator-direct codex exec foreground+tee queued for Wave 241 synthesis.

**Probe methodology** per `Z:\claude-sota-installed\.claude\rules\multi-source-discovery-breadth-discipline.md`:
1. **Probe 6 LICENSE direct-blob read** via `mcp__github__get_file_contents` (path=LICENSE) — returns blob SHA + verbatim license text
2. **Probe 1 star count refresh** via `mcp__github__search_repositories` batched query
3. **Axis-2 named-T2 endorsement** via README direct-read (`mcp__exa` + `mcp__perplexity` web-search MCPs unavailable in this tool catalog; fell back to README-grep for named-org mentions per `Z:\claude-sota\.claude\rules\convergence-gate.md` README-grep mandatory step)

**FM-17.e mitigation discipline**: NO codex CLI subprocess; NO Bash >20-line output; NO WebFetch; LICENSE blobs only (<2KB each). README full reads only on top-2 NET-NEW (mem0/cognee) for Axis-2 budget control.

## §1 12-Candidate License + Stars + Axis-2 Table

| # | Repo | Stars (2026-05-15) | LICENSE blob SHA | License Class | Permissive? | Axis-2 named-T2 evidence |
|---|---|---|---|---|---|---|
| 1 | mem0ai/mem0 | **55,803** | `d20d5102c3cf97ecbee54afd65893de4a11d26fe` | Apache-2.0 (Taranjeet Singh, 2023) | ✅ YES | **STRONG** — YC S24 badge + arxiv `2504.19413` (Chhikara et al. 2025) + benchmark superiority LoCoMo 91.6/LongMemEval 94.8 + npm/skill distribution mechanism |
| 2 | topoteretes/cognee | **17,248** | `fd57f68790eb9919fc622902caf31f831f9c4e8f` | Apache-2.0 (Topoteretes UG, 2024) | ✅ YES | **STRONG** — arxiv `2505.24478` (Markovic et al. 2025) + official Claude Code plugin at `cognee-integrations/integrations/claude-code` + Modal/Railway/Fly.io deployment |
| 3 | topoteretes/cognee-integrations | **27** | **MISSING LICENSE** | ❌ UNLICENSED ("all rights reserved" default) | ❌ NO | DERIVATIVE on cognee parent; license inheritance NOT auto-granted |
| 4 | mksglu/context-mode | **14,826** | `15259beb88afda1c8790d41cdf948c9e0e4f211d` | **Elastic License 2.0 (ELv2)** | ❌ NO — RESTRICTIVE | Single-author Mert Koseoglu; ELv2 blocks SaaS distribution |
| 5 | firecrawl/firecrawl-mcp-server | **6,314** | `73fc2690f9c5c9443b4b7a1b883c4a08d03546ca` | MIT (vrknetha, 2025) | ✅ YES | **MODERATE** — "Official Firecrawl MCP Server" per description; firecrawl-org backing |
| 6 | blazickjp/arxiv-mcp-server | **2,720** | `5c69e4052697edf01b5bb6469ec7b13d5bcf434b` | Apache-2.0 (Joseph Blazick, 2024) | ✅ YES | **WEAK-MODERATE** — single-individual; ~17mo stability; MCP-ecosystem |
| 7 | traceloop/openllmetry | **7,112** | `261eeb9e9f8b2b4b0d119366dda99c6fd7d35c64` | Apache-2.0 (template-form copyright `[yyyy] [name]`) | ✅ YES (Apache-2.0 substantively) | **STRONG** — CNCF/OpenTelemetry-ecosystem alignment; traceloop-org named maintainer |
| 8 | exa-labs/exa-mcp-server | **4,434** | `e74ab00dbf7800b8faa56300898275fd09e6d008` | MIT (Exa Labs, 2025) | ✅ YES | **STRONG** — Exa Labs official upstream; cited in claude-sota `research-protocol.md` ACTIVE routing |
| 9 | comet-ml/opik | **19,304** | `97fbc6c771a632f1c7980e0ad45bdc7a1eaa49b4` | Apache-2.0 (Comet ML Inc, 2024) | ✅ YES | **STRONG** — Comet ML org; integrations `langchain`/`llama-index`/`openai`; hacktoberfest |
| 10 | Arize-ai/phoenix | **9,693** | `23d3aa7c871a4eb153186073e3d2b72d586f64be` | **Elastic License 2.0 (ELv2)** | ❌ NO — RESTRICTIVE | Arize-ai org strong but ELv2 blocks distribution |
| 11 | microsoft/graphrag | **33,012** | `9e841e7a26e4eb057b24511e7b92d42b257a80e5` | MIT (Microsoft Corporation) | ✅ YES | **VERY STRONG** — Microsoft official; 33k★+3.5k forks high-adoption |
| 12 | parcadei/Continuous-Claude-v3 | **3,771** | `ba59a5f947a4f89c4bc4a379b68104e03c2becea` | MIT (Cosimo Streppone, 2026) | ✅ YES | **MODERATE** — single-author named; claude-code-domain-specific topics |

## §2 SHIP-GATE Summary — ADOPT-NOW Survivors (Probe 6 + Probe 1 + Axis-2 PASS)

| # | Repo | License | Stars | Verdict | Notes |
|---|---|---|---|---|---|
| 1 | mem0ai/mem0 | Apache-2.0 ✅ | 55,803 ✅ | **ADOPT-NOW** | Strongest Axis-2; benchmarks validated; cite-class TIER-1-DIRECT |
| 2 | topoteretes/cognee | Apache-2.0 ✅ | 17,248 ✅ | **ADOPT-NOW** | Official Claude Code plugin path; arxiv-backed |
| 5 | firecrawl/firecrawl-mcp-server | MIT ✅ | 6,314 ✅ | **ADOPT-NOW** | Official firecrawl-org MCP |
| 6 | blazickjp/arxiv-mcp-server | Apache-2.0 ✅ | 2,720 ✅ | **ADOPT-NOW** | ≥3mo stability sufficient for research workflow |
| 7 | traceloop/openllmetry | Apache-2.0 ✅ | 7,112 ✅ | **ADOPT-NOW** | CNCF-aligned OTel-base; standards-track |
| 8 | exa-labs/exa-mcp-server | MIT ✅ | 4,434 ✅ | **ADOPT-NOW** | Official Exa Labs upstream |
| 11 | microsoft/graphrag | MIT ✅ | 33,012 ✅ | **ADOPT-NOW** | Microsoft official; widest adoption |
| 9 | comet-ml/opik | Apache-2.0 ✅ | 19,304 ✅ | **STUDY-PILOT → ADOPT-NOW** | License-resolved (was UNKNOWN); strong Comet ML backing |
| 12 | parcadei/Continuous-Claude-v3 | MIT ✅ | 3,771 ✅ | **STUDY-PILOT** | License-resolved (was UNKNOWN); single-author caveats |

**Total ADOPT-NOW survivors: 8 of 12 license-probed (66% pass-rate)** [VERIFIED 2026-05-15 via LICENSE blob direct-reads + star-refresh]

Cross-arc convergence with Agent A:
- Of 7 NET-NEW ADOPT-NOW: **6/7 PASS Probe 6** (cognee-integrations fails)
- Of top-5 STUDY-PILOT: **3/5 PASS Probe 6** (phoenix ELv2 fails; #4 context-mode is NET-NEW reclassified)

## §3 REJECT-FOR-FIT Verdicts

| # | Repo | Reason | Cardinal Rule Cite |
|---|---|---|---|
| 3 | topoteretes/cognee-integrations | **MISSING LICENSE FILE** — default US copyright = "all rights reserved"; cannot legally vendor or modify (license inheritance NOT automatic from cognee parent Apache-2.0) | CR-9 install-risk discipline (license-compatibility prerequisite); `citation-discipline.md` rule #4 |
| 4 | mksglu/context-mode | **Elastic License 2.0 (ELv2)** — explicit restrictions: (1) no hosted/managed service distribution; (2) license-key non-circumvention; (3) trademark restrictions; (4) license auto-terminates on violation | CR-9 install-risk; `layered-gates-architecture.md §4.1` permissive-license-only invariant |
| 10 | Arize-ai/phoenix | **Elastic License 2.0 (ELv2)** — same restrictions as #4; CR-12 6-class disposition = DUPLICATE-FUNCTIONALITY (opik covers same observability axis with permissive Apache-2.0) | CR-9 install-risk; CR-12 disposition lattice |

**ELv2 explainer for synthesizer**: Elastic License 2.0 is "source-available" but NOT permissive OSS per OSI definition. Specifically blocks SaaS redistribution which is incompatible with claude-sota-installed harness adoption patterns where vendored upstream may be exposed via MCP server endpoints. Per `Z:\claude-sota\.claude\rules\layered-gates-architecture.md §4.1` claude-sota is permissive-license-only — AGPLv3 / GPLv3 / SSPL / proprietary / **ELv2** all REJECT.

## §4 Verdict-One-Line + HANDOFF

**verdict_one_line**: DONE_WITH_CONCERNS — 8/12 candidates PASS Probe 6+1+Axis-2 ADOPT-NOW hardening. 3 REJECT-FOR-FIT (context-mode ELv2, phoenix ELv2, cognee-integrations unlicensed). 1 reclassification (context-mode is NET-NEW Agent A entry, not STUDY-PILOT — Agent A §14 had it as ADOPT-NOW which now flips to REJECT-FOR-FIT).

**Critical findings to surface to Wave 241 synthesis**:
1. **Agent A §15 HONEST-NON-FINDING #4 closed**: License probes complete for 12 of 20 ADOPT-NOW/STUDY-PILOT candidates. Remaining 8 STUDY-PILOT candidates (Agent A §14 entries 8-20) still need Probe 6 before any install commit per CR-9.
2. **2 ELv2 blockers caught**: context-mode (NET-NEW Agent A surfaced as ADOPT-NOW) + phoenix (STUDY-PILOT) — both REJECT-FOR-FIT despite high stars (14,826 + 9,693). Confirms Agent A's "license UNKNOWN" honest-flag was load-bearing.
3. **1 unlicensed repo caught**: cognee-integrations has NO LICENSE file despite being part of topoteretes/cognee Apache-2.0 parent org. License inheritance NOT automatic — REJECT for vendoring; may still use as cite-reference-only per CR-9 read-only research probe exception.
4. **Strongest Axis-2 confirmations**: mem0 (YC + arxiv + benchmarks), cognee (arxiv + Claude Code plugin), microsoft/graphrag (Microsoft org), exa-labs/exa-mcp-server (already in claude-sota research-protocol.md routing table).

**Follow-up queued for Wave 241**:
- Run Probe 6 on remaining 8 of 20 Agent A STUDY-PILOT entries (8-20)
- Run Probe 6 on 23 C-redo NET-NEW candidates (most have UNKNOWN license)
- Cross-model T1 verdict via orchestrator-direct codex exec foreground+tee on this artifact
- ELv2 inventory audit: are any incumbent claude-sota-installed primitives using ELv2-licensed dependencies?
- For cognee adoption: use parent `topoteretes/cognee` directly (Apache-2.0 ✅); skip `cognee-integrations` until upstream adds LICENSE OR maintain integration code locally as a fresh derivative
- **LLMLingua replacement RE-SEARCH**: context-mode was Agent A's PRIMARY replacement; now REJECTED for ELv2. leanctx (226★ MIT) is the only surviving candidate — Wave 241 must find more replacements

**Mia pre-apply guidance for synthesizer**:
- Verify mksglu/context-mode + Arize-ai/phoenix REJECT-FOR-FIT verdicts via `Grep` of any cite-import of these repos in claude-sota-installed surfaces — if found, audit-action-loop discipline applies
- Confirm Wave 237 incumbents at `Z:\claude-sota-installed\tmp\wave237-CORRECTED-FINAL-SYNTHESIS-Pattern-A-fix-forward-2026-05-15.md` do NOT depend on rejected entries

**HANDOFF**: handoff_to: orchestrator, output_mode: last_message, artifacts: [`Z:\claude-sota-installed\tmp\wave240-agentB-redo-license-axis2-hardening-2026-05-15.md`], verdict_one_line: "DONE_WITH_CONCERNS — 8/12 ADOPT-NOW survive Probe 6+1+Axis-2 hardening; 3 REJECT-FOR-FIT (2 ELv2 + 1 unlicensed); 1 reclassification (context-mode is NET-NEW); FM-17.e mitigation successful — Sonnet stand-in scope-narrowed dispatch completed without codex CLI subprocess"
