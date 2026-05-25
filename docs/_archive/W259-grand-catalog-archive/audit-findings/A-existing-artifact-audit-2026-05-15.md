---
title: Wave-pure-runtime Agent A — Existing SOTA Research Artifact Audit
status: AUTHORITATIVE
date: 2026-05-15
agent: sota-researcher (Sonnet stand-in per CLAUDE.local.md ENV (f) — STAND-IN-NOTICE per cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate)
scope: kits v3→v65 + wave52/ + tmp/synthesis/* — extraction-only for parallel Waves B+C bias-free research
---

# Audit purpose (per orchestrator brief)

Read-only audit of pre-existing SOTA research artifacts to produce: (a) v3-v65 kit status table, (b) deduplicated candidate working catalog, (c) Cohort 7 saturation verdict, (d) volcengine/OpenViking cross-cite trail, (e) microsoft/LLMLingua verdict + 2026 replacements, (f) forward-research diversification recommendations for parallel Waves B+C. **DO NOT** re-do Probe DAG; **DO NOT** impose claude-sota-installed architecture biases — this audit feeds a NEW pure runtime at `Z:/claude-sota-pure`.

---

## Section 0 — Kit version status table v3→v65

Authority: `Z:/claude-sota-installed/docs/outer research/README.md:7-37` (TIER-2 user-curated kit version index) + per-kit MANIFEST.md cite verification + `comm -23` set-comparison of REPO_METADATA.json contents [VERIFIED 2026-05-15 via local Bash sort/comm pipeline].

| Alias | Sweep status | Cohort-7 verdict | Repo count | NEW_ADDITIONS present? | Cite anchor |
|---|---|---|---|---|---|
| v3-followup | SWEPT | n=1 baseline | 39 files | (early kit) | `README.md:9` |
| v4-frontier | SWEPT | n=2 | 69 files | (early kit) | `README.md:10` |
| v5-frontier | SWEPT | n=3 | 65 files | YES | `README.md:11` |
| v6-quality | SWEPT | n=4 | 67 files | YES | `README.md:12` |
| v7-elite | SWEPT | n=5 | 49 files | YES (10+ items) | `README.md:13` |
| v8-elite-quality | SWEPT | n=6 | 41 files | NO (first absence) | `README.md:14` |
| v10-quality-conv | SWEPT | n=7 | 41 files | (gap-fill) | `README.md:15` |
| v12-quality-conv | SWEPT (Wave 18 n=5) | 0/10 ADOPT | 39 files | NO | `README.md:16` |
| v14-v19 batch | SWEPT (sequential) | 0/X ADOPT | 43-46 each | NO | `README.md:17-22` |
| v20-elite-conv | SWEPT (Wave 19 fire-12) | 0/X ADOPT (n=9) | 37 files | NO | `README.md:23` |
| v21-v24 | PENDING-SWEEP | (pending) | 27-45 | NO | `README.md:24-27` |
| v25-v26 | SWEPT (Wave 19 fire-20) | 0/X ADOPT (n=10) | 30+/40+ | NO | `README.md:28-29` |
| v27-v34 | SWEPT (Wave 25 cohort) | 0/X ADOPT (n=11) | 8 zips | NO | `README.md:30` |
| v35 | SWEPT (Wave 27 Agent B) | 0 ADOPT / 7 REJECT (n=12) | 27 files | NO | `README.md:31` |
| v36 | SWEPT (Wave 27 Agent B) | 6 NEW REJECT (n=13) | TBD | NO | `README.md:32` |
| v37 | SWEPT (Wave 27 Agent A) | 4-cluster REJECT (n=14) | 27 files | NO | `README.md:33` |
| v38-v41 | SWEPT (Wave 28 Agent A) | 11 NEW REJECT (n=15) | 17-148 | NO | `README.md:52` |
| v42-v46 | SWEPT (Wave outer-research) | 0/X ADOPT (n=20) | 152-160 each | NO | `README.md:34,53` |
| v47-v48 | SWEPT (Wave-convergence) | 0/X ADOPT (n=22) | 22/26 files | NO | `README.md:36,55` |
| v52 | SWEPT (Wave-N1 Phase 3) | 0/X ADOPT (n=23) | 17 files / 170 repos | NO | `README.md:35,54` |
| **v53** | **NOT-IN-README-TABLE** | **Cohort 7 PASS** | 184 repos | NO [VERIFIED via `find` empty] | `kits/v53/REPO_METADATA.json:2-3` + `MANIFEST.md:1` |
| **v54** | **NOT-IN-README-TABLE** | **Cohort 7 PASS** | 185 repos | NO | `kits/v54/REPO_METADATA.json:2-4` (date 2026-05-06) |
| **v55** | **NOT-IN-README-TABLE** | **Cohort 7 PASS** | 179 repos | NO | `kits/v55/REPO_METADATA.json:2-3` + `MANIFEST.md:3` |
| **v56** | **NOT-IN-README-TABLE** | **Cohort 7 PASS** | 183 repos | NO | `kits/v56/REPO_METADATA.json:2-3` ("V56 Definitive Elite Consensus") |
| **v57** | **NOT-IN-README-TABLE** | **Cohort 7 PASS** | 205 repos | NO | `kits/v57/REPO_METADATA.json:2-3` |
| **v58** | **NOT-IN-README-TABLE** | **Cohort 7 PASS** | 203 repos | NO | `kits/v58/REPO_METADATA.json:2-3` |
| **v59** | **NOT-IN-README-TABLE** | **Cohort 7 PASS** | 222 repos | NO | `kits/v59/REPO_METADATA.json:2-3` |
| **v60** | **NOT-IN-README-TABLE** | **Cohort 7 PASS** | 205 repos | NO | `kits/v60/REPO_METADATA.json:2-4` (date 2026-05-06) |
| **v61** | **NOT-IN-README-TABLE** | **Cohort 7 PASS** | 230 repos | NO | `kits/v61/REPO_METADATA.json:2-3` |
| **v62** | **NOT-IN-README-TABLE** | **Cohort 7 PASS** | 226 repos | NO | `kits/v62/REPO_METADATA.json:2-3` |
| **v63** | **NOT-IN-README-TABLE** (nested dir) | **Cohort 7 PASS** | ~217 distinct | NO | `kits/v63/claude_code_sota_v63_ultimate_quality_execution_md_kit/MANIFEST.md` (9.1K) |
| **v64** | **NOT-IN-README-TABLE** (nested) | **Cohort 7 PASS** | ~226 (REPOS_BY_CATEGORY.json) | NO | `kits/v64/claude_code_sota_v64_ultimate_sota_execution_md_kit/` |
| **v65** | **NOT-IN-README-TABLE** (nested) | **Cohort 7 PASS** (title "ultimate comprehensive execution" — escalating-tagline) | ~218 distinct | NO | `kits/v65/claude_code_sota_v65_ultimate_comprehensive_execution_md_kit/README.md:1-19` |

**Summary**: 13 NEW kit versions (v53→v65) have landed since the README L43-57 n=23 saturation close. **ALL 13 satisfy Cohort 7 5-discriminator test** (anonymous LLM-iterated zip-drop / drop cadence visible in v54+v60 explicit `"date": "2026-05-06"` field / NEW_ADDITIONS_SINCE_LAST_KIT.md ABSENT across all 13 verified via `find` / section-isomorphism with v42-v52 baseline / repo-count oscillates 170→222→205→230→226→217-226 with escalating "ultimate elite consensus" → "definitive" → "ultimate quality" → "ultimate sota" → "ultimate comprehensive" taglines while content shape stays stable). Per `README.md:43,57` Cohort 7 codification: **structural REJECT class applies; per-kit Probe DAG cost obviated**.

---

## Section 1 — Distinct-repo working catalog (167 NET-NEW v53-v65 vs v52 baseline)

Methodology: `grep -oE '"[a-zA-Z0-9_.-]+/[a-zA-Z0-9_.-]+"' REPO_METADATA.json | sort -u`; union of v53-v65 minus v52 baseline = **167 NET-NEW candidates** [VERIFIED 2026-05-15 via local pipeline at `/tmp/new_after_v52.txt`]. Total distinct across v52-v65 union = **319 repos**.

**Catalog organized by C1-C9 cohort attribution per `convergence-gate.md` 9-cohort menu cited at CLAUDE.md L99-110**. Prior verdicts cited where surfaced in tmp/ synthesis docs.

### C1 GraphQL stars+topic (foundation/official cohort additions)
| Repo URL | Surfaced in | Prior verdict |
|---|---|---|
| anthropics/claude-plugins-official | v53+ FOUNDATION | INSTALLED in claude-sota-installed (cite-only — pure runtime is fresh) |
| anthropics/knowledge-work-plugins | v60+ | NO PRIOR VERDICT |
| github/gh-aw | v53+ FOUNDATION | NO PRIOR VERDICT |
| openai/openai-agents-js | v59+ | NO PRIOR VERDICT |
| openai/evals | v62+ EVAL | NO PRIOR VERDICT |

### C2 ArXiv citation graph (research-axis cohort)
| Repo URL | Surfaced in | Prior verdict |
|---|---|---|
| princeton-pli/hal-harness | v62+ EVAL | NO PRIOR VERDICT |
| microsoft/LLMLingua (CITE-CLASS-CANONICAL — see §4) | (not in kits; tmp synthesis) | **REJECT-OR-DEFER per Wave 220 R5** at `tmp/wave220-r5-codex-llmlingua-arch-evidence-integration-2026-05-15.md:98-103` |

### C3 HuggingFace
| Repo URL | Surfaced in | Prior verdict |
|---|---|---|
| huggingface/smolagents | v60+ EVAL | sister-framework reference per `team-orch-frameworks.md` |

### C4 PapersWithCode benchmarks (eval/observability cohort additions)
| Repo URL | Surfaced in | Prior verdict |
|---|---|---|
| Arize-ai/phoenix | v62+ EVAL | NO PRIOR VERDICT (LLM observability platform) |
| confident-ai/deepeval | v60+ EVAL | NO PRIOR VERDICT |
| explodinggradients/ragas | v60+ EVAL | NO PRIOR VERDICT (RAG evaluation) |
| braintrustdata/braintrust-sdk | v60+ EVAL | NO PRIOR VERDICT |
| braintrustdata/autoevals | v62+ EVAL | NO PRIOR VERDICT |
| BraintrustData/braintrust-claude-plugin | v62+ | NO PRIOR VERDICT |
| promptfoo/promptfoo | v62+ EVAL | NO PRIOR VERDICT |
| **langfuse/langfuse** | v58+ OBSERVABILITY | NO ADOPTION VERDICT in tmp/; cited in v58/v60/v62 EVAL_BENCHMARK_OBSERVABILITY at `kits/v58/REPO_METADATA.json:201` + `kits/v60/REPO_METADATA.json:200` + `kits/v62/REPO_METADATA.json:201` |
| pydantic/logfire | v62+ | NO PRIOR VERDICT |
| openai/evals | v62+ EVAL | NO PRIOR VERDICT |

### C5 Named-author blog/talk (workflow elite + agent-framework cohort additions)
| Repo URL | Surfaced in | Prior verdict |
|---|---|---|
| huggingface/smolagents | v60+ | sister-framework reference |
| crewAIInc/crewAI | v60+ | NO PRIOR VERDICT (named-org Joao Moura) |
| microsoft/agent-framework | v62+ | NO PRIOR VERDICT |
| microsoft/autogen | v62+ | sister-framework reference |
| microsoft/semantic-kernel | v62+ | NO PRIOR VERDICT |
| google/adk-python | v60+ | NO PRIOR VERDICT |
| google/adk-js | v60+ | NO PRIOR VERDICT |
| google/adk-samples | v60+ | NO PRIOR VERDICT |
| google/adk-web | v60+ | NO PRIOR VERDICT |
| pydantic/pydantic-ai | v60+ | NO PRIOR VERDICT |
| langchain-ai/langchain | v60+ | NO PRIOR VERDICT |
| langchain-ai/langgraph | v60+ | NO PRIOR VERDICT |
| langchain-ai/deepagents | v60+ | **STUDY-PILOT** per `tmp/sota-token-opt-SYNTHESIS-2026-05-15.md:55` (D-TE1+D-TE7+D-TE8 arg truncation/fork routing) |
| run-llama/llama_index | v60+ | NO PRIOR VERDICT |
| mastra-ai/mastra | v60+ | NO PRIOR VERDICT |
| strands-agents/sdk-python | v62+ | NO PRIOR VERDICT |
| strands-agents/sdk-typescript | v62+ | NO PRIOR VERDICT |
| vercel/ai | v62+ | NO PRIOR VERDICT |

### C6 Awesome-list catalogs (15 NEW)
| Repo URL | Surfaced in | Prior verdict |
|---|---|---|
| AutoJunjie/awesome-agent-harness | v60+ DISCOVERY | NO PRIOR VERDICT |
| Vvkmnn/awesome-ai-eval | v60+ | NO PRIOR VERDICT |
| danielrosehill/Awesome-AI-Evaluations-Tools | v60+ | NO PRIOR VERDICT |
| hparreao/Awesome-AI-Evaluation-Guide | v60+ | NO PRIOR VERDICT |
| caramaschiHG/awesome-ai-agents-2026 | v60+ | NO PRIOR VERDICT |
| Zijian-Ni/awesome-ai-agents-2026 | v60+ | NO PRIOR VERDICT |
| ARUNAGIRINATHAN-K/awesome-ai-agents | v60+ | NO PRIOR VERDICT |
| TsinghuaC3I/Awesome-Memory-for-Agents | v60+ | NO PRIOR VERDICT |
| letta-ai/awesome-letta | v60+ | NO PRIOR VERDICT |
| ai-boost/awesome-harness-engineering | v60+ | NO PRIOR VERDICT |
| EthicalML/awesome-agentic-engineering-resources | v60+ | NO PRIOR VERDICT |
| jordimas/awesome-agentic-engineering | v60+ | NO PRIOR VERDICT |
| martimfasantos/ai-agents-frameworks | v60+ | NO PRIOR VERDICT |
| mb-mal/awesome-ai-agents-frameworks | v60+ | NO PRIOR VERDICT |
| walkinglabs/awesome-harness-engineering | v60+ | NO PRIOR VERDICT |

### C7 Conference proceedings (workflow/harness cohort)
| Repo URL | Surfaced in | Prior verdict |
|---|---|---|
| Human-Agent-Society/CORAL | v60+ | NO PRIOR VERDICT |
| HKUDS/OpenHarness | v60+ | NO PRIOR VERDICT |
| princeton-pli/hal-harness | v62+ | NO PRIOR VERDICT |

### Memory-MCP cohort (cross-listed C1+C5; high user-relevance per directive)
| Repo URL | Surfaced in | Prior verdict |
|---|---|---|
| mem0ai/mem0 | v60+ | **DEFER-EVAL** per `tmp/wave168-agentB-sota-researcher-memory-2026-05-13.md:33` — re-eval at scale-trigger ≥100k memories |
| letta-ai/letta | v60+ | DEFER per same source |
| letta-ai/letta-code | v60+ | NO PRIOR VERDICT |
| letta-ai/ai-memory-sdk | v60+ | NO PRIOR VERDICT |
| getzep/graphiti | v60+ | INSTALLED (cite-only for pure runtime) |
| getzep/zep | v60+ | **SUPERSEDED-BY-graphiti** per `tmp/wave207-agentD-memory-mcp-deep-2026-05-15.md:196` |
| **topoteretes/cognee** | (v52 baseline + later) | **REJECT-FOR-FIT** per Wave 207-209 (CR-12 DUPLICATE of graphiti L3 verdict; cite per `tmp/hooks-mcp-memory-plan-2026-05-15.md` + `tmp/sota-pure-w212-J-memory-scoring-matrix-2026-05-15.md`) |
| campfirein/cipher | v53+ | NO PRIOR VERDICT |
| supermemoryai/supermemory-mcp | v60+ | NO PRIOR VERDICT |
| supermemoryai/claude-supermemory | v52 baseline | NO PRIOR VERDICT |
| mkreyman/mcp-memory-keeper | v52 baseline | NO PRIOR VERDICT |
| doobidoo/mcp-memory-service | v52 baseline | INSTALLED v10.51.3 (cite-only) |
| mcpware/mcp-memory-service | v60+ | possible duplicate-namespace of doobidoo — Probe 4 needed |
| coleam00/mcp-mem0 | v60+ | NO PRIOR VERDICT |
| GMaN1911/claude-cognitive | v55+ | NO PRIOR VERDICT |
| lucasrosati/claude-code-memory-setup | v55+ | NO PRIOR VERDICT |
| chenxiaofie/memory-mcp | v60+ | NO PRIOR VERDICT |
| runtimenoteslabs/memory-layer | v60+ | NO PRIOR VERDICT |
| DeusData/codebase-memory-mcp | v60+ | NO PRIOR VERDICT |
| ooples/token-optimizer-mcp | v60+ | NO PRIOR VERDICT |
| thedotmack/claude-mem | v52 baseline | NO PRIOR VERDICT |
| itsjwill/claude-memory | v60+ | NO PRIOR VERDICT |
| yoloshii/ClawMem | v60+ | NO PRIOR VERDICT |
| ressl/mcp-firewall | v62+ | NO PRIOR VERDICT |
| klaviyo/graphiti_mcp | v60+ | NO PRIOR VERDICT (3rd-party Graphiti integration) |
| **volcengine/OpenViking** | (Section 3 — never in any kit; user-mentioned) | **REJECT-FOR-FIT (Probe 6 AGPLv3 STRUCTURAL)** per `tmp/wave168-agentB-sota-researcher-memory-2026-05-13.md:34,72-79` |

### Token-context cohort (NEW additions)
| Repo URL | Surfaced in | Prior verdict |
|---|---|---|
| yvgude/lean-ctx | v62+ | **STUDY-PILOT-PROVIDER-COMPLEMENT** layer 5 per `tmp/wave220-r5-codex-llmlingua-arch-evidence-integration-2026-05-15.md:33,98-100` |
| claudioemmanuel/squeez | v60+ | STUDY-PILOT layer 5 (tool-output pruner) |
| ooples/token-optimizer-mcp | v60+ | NO PRIOR VERDICT |
| flightlesstux/prompt-caching | v62+ | NO PRIOR VERDICT |
| musistudio/claude-code-router | v62+ | NO PRIOR VERDICT (LLM router class) |

### Workflow/agents (sub-cohort additions)
| Repo URL | Surfaced in | Prior verdict |
|---|---|---|
| eyaltoledano/claude-task-master | v52 baseline | NO PRIOR VERDICT |
| automazeio/ccpm | v52 baseline | NO PRIOR VERDICT |
| SuperClaude-Org/SuperClaude_Framework | v60+ | NO PRIOR VERDICT |
| shinpr/claude-code-workflows | v60+ | **REJECTED HARD-GATE iter-84** sister via `Z:/claude-sota/.claude/rules/ahfv-seven-sub-classes.md` Probe 5 mode-harness-shape table |
| dwarvesf/claude-guardrails | v62+ | NO PRIOR VERDICT |
| NeoLabHQ/context-engineering-kit | v60+ | NO PRIOR VERDICT |
| oxygen-fragment/claude-modular | v60+ | NO PRIOR VERDICT |
| mattgierhart/PRD-driven-context-engineering | v60+ | NO PRIOR VERDICT |
| muratcankoylan/agent-skills-for-context-engineering | v60+ | NO PRIOR VERDICT |
| repowise-dev/claude-code-prompts | v60+ | NO PRIOR VERDICT |

### Parallel/operator cohort (additions)
| Repo URL | Surfaced in | Prior verdict |
|---|---|---|
| siteboon/claudecodeui | v60+ | NO PRIOR VERDICT |
| florianbruniaux/ccboard | v60+ | NO PRIOR VERDICT |
| spillwavesolutions/parallel-worktrees | v60+ | NO PRIOR VERDICT |
| 21st-dev/1code | v60+ | NO PRIOR VERDICT |

### CLI/build/quality cohort additions (~20 NEW)
junegunn/fzf, sharkdp/bat, sharkdp/delta, sharkdp/hyperfine, eza-community/eza, sxyazi/yazi, streetsidesoftware/cspell, eslint/eslint, prettier/prettier, pytest-dev/pytest, python/mypy, microsoft/pyright, DavidAnson/markdownlint, DavidAnson/markdownlint-cli2, errata-ai/vale, textlint/textlint, remarkjs/remark-lint, markdownlint/markdownlint, get-alex/alex (all NO PRIOR VERDICT — appeared first in v53+ surfaces).

### Doc/RAG cohort additions
docling-project/docling, microsoft/markitdown, jina-ai/reader, firecrawl/firecrawl, unclecode/crawl4ai, BjornMelin/ai-docs-vector-db-hybrid-scraper (all NO PRIOR VERDICT).

### Security cohort additions
cisco-ai-defense/skill-scanner, cisco-ai-defense/defenseclaw, snyk/agent-scan (v55+), aws-samples/sample-mcp-security-scanner, StacklokLabs/stacklok-claude-hooks (all NO PRIOR VERDICT).

### Diagram/ADR cohort additions
mermaid-js/mermaid, structurizr/dsl, C4-PlantUML/C4-PlantUML, arc42/arc42-template, adr/madr, joelparkerhenderson/architecture-decision-record (all NO PRIOR VERDICT).

### Misc/community guides cohort
Cranot/claude-code-guide, zebbern/claude-code-guide, FlorianBruniaux/claude-code-ultimate-guide, ykdojo/claude-code-tips, dsebastien.net/claude-code-tips-and-best-practices, infiniV/ultra-instinct-claude-code, Yeachan-Heo/oh-my-claudecode (**REJECT META-HARNESS** per `verified-avoid.md` Cohort 1), karpathy.bearblog.dev/sequoia-ascent-2026 (TIER-1-NAMED-AUTHOR per CLAUDE.md L182).

### Codex bridge additions
sendbird/cc-plugin-codex, thepushkarp/cc-codex-plugin (NO PRIOR VERDICT).

### Indirect/scope additions (NOT direct adoption candidates)
HKUDS/OpenHarness, aidenybai/react-grab (OFF-AXIS), yoanbernabeu/grepai, edouard-claude/snip, edimuj/vexscan, IyadhKhalfallah/clauditor, alexei-led/cc-thingz, luckyPipewrench/pipelock, mattpocock/sandcastle (Matt Pocock named-T1 per CLAUDE.md L182).

**Catalog total: 319 distinct repos across v52-v65 union (167 NET-NEW post-v52 + 152 v52 baseline) — sufficient for Wave B+C bias-free re-research** [VERIFIED via `wc -l /tmp/all_distinct_repos.txt` = 319].

---

## Section 2 — HONEST-NON-FINDING saturation summary (Cohort 7 base rate)

Per `README.md:43,57` (TIER-2): "v3→v6 + v12 + v14-v52 historical 0% adoption baseline (n=23 consecutive 0% — Wave-N1 Phase 3 SOTA-convergence-reset close 2026-05-06 extends saturation streak across 37+ days from 2026-05-04 v3 through 2026-05-06 v52)".

**Cohort 7 5-discriminator verdict for v53-v65 batch (THIS audit)**:

| Discriminator | v53-v65 evidence | Verdict |
|---|---|---|
| 1. Anonymous source | All 13 kits arrive as zip-drops without GitHub org attribution; MANIFEST.md shows kit-local files only | **PASS** |
| 2. Drop-cadence | v54+v60 `REPO_METADATA.json:2-4` explicitly carry `"date": "2026-05-06"` — multiple kits same day; v63/v64/v65 nested dirs suggest same-cycle generation | **PASS** |
| 3. NEW_ADDITIONS_SINCE_LAST_KIT.md absence | `find docs/outer research/kits/v5[3-9] v6[0-5] -iname "NEW_ADDITIONS*"` → ZERO HITS [VERIFIED 2026-05-15] | **PASS** |
| 4. Section-isomorphism | All 13 kits ship identical 17-23 file set: AGENTS.md/CLAUDE.md/ALL_IN_ONE_/CLI_QUALITY/CODEX_PLUGIN/COMMUNITY_CONSENSUS/EXECUTE_VXX/HIGH_STAR/MANIFEST/MEMORY_MCP/OFFICIAL_SDKS/PARALLEL_WORKTREE/README/REPO_METADATA/SOTA_REPOS_BEST_OF_BEST/TOKEN_CONTEXT/WHAT_MORE_WAS_NOT_COVERED. v65 adds ADVANCED_SOURCE_DEEP_DIVE_PROTOCOL — marginal expansion only. | **PASS** |
| 5. Repo-list duplicate-rate | v53 184 → v54 185 → v55 179 → v62 226 → v63 217 → v64 226 → v65 218 — repo-count oscillates without monotonic growth; 152 of 167 NEW candidates are NEVER-INSTALLED scoping-broaden (eval/agent-frameworks/cli-baseline) not Claude-Code-native | **PASS** |

**Conclusion**: v53-v65 batch is **Cohort 7 STRUCTURAL REJECT class** at 5/5 discriminator PASS — same convention as v42-v48 + v52 (already n=23 baseline at README close). Per-kit Probe DAG cost is OBVIATED; cohort-level Axis-1 single-source REJECT applies per `Z:/claude-sota/.claude/rules/convergence-gate.md` ≥3-distinct-orgs requirement.

**Saturation streak advance**: n=23 → **n=36** (+13 cohort-7 instances v53/v54/v55/v56/v57/v58/v59/v60/v61/v62/v63/v64/v65). Treat as **HONEST-NON-FINDING per `Z:/claude-sota/.claude/rules/synthesis-layer-verify.md §Reporting categories`** — saturation IS the finding.

**Operational implication for Z:/claude-sota-pure NEW runtime**: do NOT base architectural decisions on these kits. The 319 candidates are DISCOVERY surfaces only; convergence-gate Axis-1 ≥3-distinct-orgs must be re-verified via independent primary-source crawl per `Z:/claude-sota/.claude/rules/research-protocol.md §Tool Routing` (Octocode REMOVED 2026-05-03 D6 firm — substitute mcp__github__search_code + perplexity + exa + firecrawl + deepwiki for multi-source crawl).

---

## Section 3 — volcengine/OpenViking cross-cite trail

**User directive 2026-05-15**: re-evaluate `https://github.com/volcengine/OpenViking/blob/main/examples/claude-code-memory-plugin/README.md` for the new pure runtime.

**Cross-cite trail** [VERIFIED 2026-05-15 via local Bash grep across docs/+tmp/]:

| File | Line | Context |
|---|---|---|
| `docs/outer research/wave52/iter1a-shan-extraction.json` | (referenced — large JSON) | Cited in iter1a shan-extraction (Wave 52 baseline) |
| `tmp/wave168-agentB-sota-researcher-memory-2026-05-13.md` | 16 | "At least one of {mem0, letta, cognee, agentmemory, **openviking**} is GENUINELY-NEW per CR-12 + crosses scale-threshold..." (Wave 168 brief hypothesis) |
| `tmp/wave168-agentB-sota-researcher-memory-2026-05-13.md` | 34 | "**volcengine/OpenViking** \| `527d68d3` \| `27268c8e` \| 23,864 \| 4mo \| **AGPLv3** \| **PROBE-6 BLOCKED — REJECT-FOR-FIT** \| N/A (structural blocker)" |
| `tmp/wave168-agentB-sota-researcher-memory-2026-05-13.md` | 72-79 | **Repo 5 — volcengine/OpenViking (PROBE-6 BLOCKED REJECT-FOR-FIT)**: "LICENSE direct-read 2026-05-13: 'GNU AFFERO GENERAL PUBLIC LICENSE Version 3' [VERIFIED]. AGPLv3 ≠ permissive-license whitelist (MIT/Apache-2.0/BSD per `ahfv-seven-sub-classes.md §Probe 6`). §13 'remote network interaction' disclosure obligations for any LLM tool calls. Description: 'open-source context database for AI Agents (such as openclaw)' — Claude-derivative cohort. Same blocker class as W164 F38c openviking-org AGPLv3 (org rebrand `openviking/* → volcengine/OpenViking` 2026-01). Probe 5: Volcengine (ByteDance subsidiary) adds geopolitical risk class. **Verdict**: PROBE-6-BLOCKED — REJECT-FOR-FIT. No re-audit pathway unless upstream relicenses." |
| `tmp/wave168-agentB-sota-researcher-memory-2026-05-13.md` | 89 | "openviking \| PASS \| UNKNOWN \| PASS (4.3mo, borderline-STRONG-PROVENANCE) \| PROBE-6-BLOCKED-IRRELEVANT" |
| `tmp/wave179-fire2-close-synthesis-2026-05-13.md` | 44 | "REAL GPT-5.5 audit of 6 candidates (mem0/letta/cognee/**openviking-rag**/cipher/openai-memory): NO candidate clears bar to REPLACE mcp-memory v10.51.3 + sqlite_vec L2 + graphiti v0.29.0 L3 at current scale" |
| `tmp/p2a-sota-researcher-report-2026-05-13.md` | 93 | "**openviking (volcengine)** \| **AGPLv3** \| **REJECT-FOR-FIT** \| Probe 6 STRUCTURAL license blocker (n=1 codified per `reference_memory_rag_audit_HNF_agplv3_blocker_2026_05_02.md`)" |
| `tmp/p2a-sota-researcher-report-2026-05-13.md` | 98 | "MemPalace/**openviking**/Zep ruled out structurally" |
| `tmp/wave207-agentD-memory-mcp-deep-2026-05-15.md` | 68-69 | "### **openviking** [REJECT-FOR-FIT.b — AGPLv3 LICENSE BLOCKER] — Probe P6 REJECT — AGPLv3 (cardinal-rule-9 P6 structural)" |
| `tmp/wave207-agentD-memory-mcp-deep-2026-05-15.md` | 196,215 | "Tier 3 — REJECT-FOR-FIT: **openviking** (AGPLv3)..." + "openviking \| AGPLv3 \| REJECT" |

**Aggregate verdict**: **REJECT-FOR-FIT (Probe 6 AGPLv3 STRUCTURAL BLOCKER)** — n=3+ independent Wave audits (W168, W179, W207, P2a) all converged on the same conclusion. License blocker is STRUCTURAL — no operational mitigation pathway exists per `Z:/claude-sota/.claude/rules/ahfv-seven-sub-classes.md` Probe 6 (claude-sota is permissive-license-only — MIT/Apache-2.0/BSD whitelist; AGPLv3/GPLv3/SSPL = REJECT).

**Geopolitical risk addendum** per `tmp/wave168-agentB-sota-researcher-memory-2026-05-13.md:78`: Volcengine is ByteDance subsidiary; supply-chain auditability is concern even before license blocker.

**Re-evaluation pathway** (for Z:/claude-sota-pure): only re-audit if (a) upstream relicenses to permissive OR (b) the pure runtime explicitly adopts AGPLv3-tolerant license posture. **Neither condition holds by default**. The `claude-code-memory-plugin/README.md` user pointed to does not change the structural license blocker — the plugin is part of the same AGPLv3-licensed repo.

**Recommendation**: confirm to user that OpenViking remains **REJECT-FOR-FIT** for the pure runtime under standard permissive-license posture, UNLESS user explicitly opts into AGPLv3 license terms for the new runtime.

---

## Section 4 — microsoft/LLMLingua prior verdict + 2026 replacements

**User directive 2026-05-15**: microsoft/LLMLingua is OUTDATED at 2026-05.

**LLMLingua cross-cite trail**:

| File | Line | Context |
|---|---|---|
| `tmp/sota-token-opt-SYNTHESIS-2026-05-15.md` | 54 | "microsoft/LLMLingua \| MIT \| `9e841e7a` \| D-TE7 + D-TE3 (20× compression) \| `pip install llmlingua` \| EMNLP'23/ACL'24 peer-reviewed; 20× compression minimal-loss" (INITIAL recommended INSTALL — superseded by R5 below) |
| `tmp/wave220-r5-codex-llmlingua-arch-evidence-integration-2026-05-15.md` | 33-34 | "5. Tool-output/log compression \| `chopratejas/headroom`; `yvgude/lean-ctx`; `KRLabsOrg/squeez` \| **STUDY-PILOT-PROVIDER-COMPLEMENT** \| 6. Per-Edit prompt rewriting \| `microsoft/LLMLingua-class` (LLMLingua/LLMLingua-2/LongLLMLingua) + `open-compress/claw-compactor` + `jia-gao/leanctx` \| **DEFER or REJECT** — 'per-Edit compression is anti-pattern under Anthropic prompt-cache + /compact'" |
| `tmp/wave220-r5-codex-llmlingua-arch-evidence-integration-2026-05-15.md` | 75 | "microsoft/MInference (NOTE per codex: 'sparse attention/pre-fill latency, NOT Claude Code client context compression' — REMOVE from token-opt cite-class; CITE-CLASS for server-side inference only)" |
| `tmp/wave220-r5-codex-llmlingua-arch-evidence-integration-2026-05-15.md` | 90-91 | "LLMLingua-2 (latest of LLMLingua line) hasn't seen major release update since 2024 line per codex; effectively maintenance-mode. claw-compactor cpd=0.72 = 6-week idle pushed_at lag → maintenance-mode" |
| `tmp/wave220-r5-codex-llmlingua-arch-evidence-integration-2026-05-15.md` | 98-101 | "**VERDICT**: **REJECT-OR-DEFER layer 6** (per-Edit prompt rewriting LLMLingua-class) for `claude-sota-pure`: prompt-cache + /compact cover 90%+ use cases; per-Edit compression is architectural anti-pattern under provider caching. **KEEP layer 5** (tool-output/log compression) as STUDY-PILOT-PROVIDER-COMPLEMENT. **microsoft/LLMLingua + LLMLingua-2 + LongLLMLingua → CITE-CLASS-CANONICAL final** (research baseline; not install)" |
| `tmp/wave220-r9-RESEARCH-PLUGIN-STACK-RECOMMENDATION-2026-05-15.md` | 102-103 | "**LLMLingua REPLACEMENT verdict** (per Wave 220 R5 codex T1 + user explicit directive): all 4 above OBSOLETE LLMLingua-class per-Edit compression for Claude Code workflow. LLMLingua → CITE-CLASS-CANONICAL research baseline only." |

**Aggregate verdict**: **DEFER or REJECT for install; CITE-CLASS-CANONICAL only** (per Wave 220 R5 codex T1 + user directive 2026-05-15). LLMLingua is in maintenance-mode (no major release post-2024 per codex T1 observation) AND the architectural pattern (per-Edit prompt rewriting) is anti-pattern under Anthropic prompt-cache + /compact native primitives.

**2026 Q2 replacements already surfaced in tmp/synthesis docs** (per `tmp/wave220-r5-codex-llmlingua-arch-evidence-integration-2026-05-15.md` 6-layer disaggregation):

| Layer | Replacement candidate | License | Status |
|---|---|---|---|
| **Layer 5 — Tool-output/log compression** | `chopratejas/headroom` (MCP server pre-LLM) | NO PRIOR VERDICT | **STUDY-PILOT-PROVIDER-COMPLEMENT** |
| Layer 5 | `yvgude/lean-ctx` (Rust binary + 51 tools + 10 read modes) | NO PRIOR VERDICT | **STUDY-PILOT-PROVIDER-COMPLEMENT** |
| Layer 5 | `KRLabsOrg/squeez` (tool output pruner) — note: `claudioemmanuel/squeez` in v60+ kits is a DIFFERENT repo OR alias; needs Probe 4 namespace check | NO PRIOR VERDICT | STUDY-PILOT pending namespace verification |
| Layer 6 (rejected) | `open-compress/claw-compactor` (AST-aware 14-stage) | NO PRIOR VERDICT | **REJECT** (maintenance-mode cpd=0.72) |
| Layer 6 (rejected) | `jia-gao/leanctx` (LLMLingua-2-based drop-in) | NO PRIOR VERDICT | **REJECT** (LLMLingua-derivative — inherits anti-pattern) |
| **Architectural alternative** | Native Anthropic prompt-cache (cache_control field on messages) + native `/compact` slash command | OFFICIAL Anthropic | **PRIMARY** (per Wave 220 R5 — covers 90%+ use cases) |
| Cite-class research baseline | `langchain-ai/deepagents` TruncateArgsSettings primitive | MIT | **STUDY-PILOT** per `tmp/sota-token-opt-SYNTHESIS-2026-05-15.md:55` (D-TE1+D-TE7+D-TE8 arg truncation/fork routing) |
| Cite-class research baseline | `microsoft/SCBench` | (research) | **CITE-CLASS-CANONICAL** (research-class only) |
| Cite-class research baseline | `openai/tiktoken` | MIT | **STUDY-PILOT** per token-opt synthesis L53 — D-TE9 measurement foundation |
| Token-cost telemetry | `ryoppippi/ccusage` | MIT | Already in v52 baseline DEFAULT_INSTALL_CORE |

**Recommendation for Z:/claude-sota-pure**: skip LLMLingua entirely; adopt the **prompt-cache + /compact + tiktoken telemetry + headroom/lean-ctx (Layer 5)** stack as the SOTA 2026-Q2 replacement.

---

## Section 5 — Forward-research diversification recommendations per README L57

Per `README.md:57` (TIER-2): "Forward-research diversification mandate (Wave 27 Agent E §Issue 3 + close-synthesis L189-193 + Wave outer-research v42-v46 master synthesis §J): future cohort fan-out should diversify away from anonymous kits toward (a) named-author research per cohort C5, (b) stars-sorted-direct C9, (c) paper-bearing cohorts C2/C4/C7 with 2026-NEWEST floor — anonymous-zip-drop kit cohort is structurally non-adoptable per convergence-gate Axis-1 single-source constraint".

**Recommended cohort priorities for parallel Waves B+C** (bias-free fresh primary-source crawl for `Z:/claude-sota-pure`):

### Priority 1 — Cohort C2 (ArXiv citation graph, 2026-NEWEST floor)
Rationale: peer-reviewed primary sources defeat the anonymous-LLM-zip-drop Axis-1 single-source REJECT class. The 167 NET-NEW candidates are DISCOVERY hooks; verify via arxiv/papers-with-code primary sources before adoption.

### Priority 2 — Cohort C9 (stars-sorted-direct, WITHOUT topic-tag intersection)
Rationale: Ship #233 codification 2026-05-02 added C9 explicitly to break topic-tag-only discovery bias. Many high-star repos do NOT carry the `claude-code` topic tag despite being relevant.

### Priority 3 — Cohort C5 (named-author blog/talk) — addresses Axis-2 ≥2-distinct-orgs gap
Rationale: convergence-gate Axis-2 ≥2 named-T2 practitioners with dated artifact requires named-author cites; anonymous zip-drops STRUCTURALLY cannot satisfy this.

### Priority 4 — Cohort C4 (PapersWithCode benchmarks)
Rationale: benchmarks ground adoption claims in MEASURED evidence per `Z:/claude-sota/.claude/rules/convergence-gate.md` Row 2 fabrication-test rule.

### Priority 5 — Cohort C7 (Conference proceedings, 2026)
Rationale: ACL / NeurIPS / EMNLP 2026 (winter cycle) proceedings would surface methodology references for the 167 NET-NEW candidates.

### What to AVOID for parallel Waves B+C
1. **NO more anonymous-zip-drop kit Probe DAG cycles**: Cohort 7 STRUCTURAL REJECT at n=36 saturation streak.
2. **NO claude-sota-installed architecture inheritance**: User mandate explicit — pure runtime is FRESH.
3. **NO Microsoft/LLMLingua install assumption**: Wave 220 R5 verdict CITE-CLASS-CANONICAL only.
4. **NO volcengine/OpenViking re-audit without license relicensing**: AGPLv3 structural blocker is hard.
5. **NO topic-tag-only GitHub search**: C9 stars-sorted-direct is mandatory per Ship #233.

---

## Honest Conclusion

**Audit verdict**: 13 NEW kit versions (v53-v65) NOT YET in README L7-37 table — ALL classify as **Cohort 7 STRUCTURAL REJECT** at 5/5 discriminator PASS (NO NEW_ADDITIONS_SINCE_LAST_KIT.md across all 13 [VERIFIED via `find` returning empty]). Saturation streak advances n=23 → **n=36**.

**Candidate catalog**: 167 NET-NEW post-v52 candidates extracted + 152 v52-baseline = **319 distinct repos** for Wave B+C bias-free re-research.

**volcengine/OpenViking**: **REJECT-FOR-FIT (Probe 6 AGPLv3 STRUCTURAL BLOCKER)** — n=3+ independent Wave audits converged on same conclusion; no re-audit pathway without upstream relicensing.

**microsoft/LLMLingua**: **DEFER/REJECT for install; CITE-CLASS-CANONICAL only** — replace with native Anthropic prompt-cache + /compact + tiktoken + headroom/lean-ctx stack per Wave 220 R5 codex T1 verdict.

**Forward-research diversification**: prioritize C2 (arxiv 2026-NEWEST) + C9 (stars-sorted-direct) + C5 (named-author) + C4 (benchmarks) + C7 (conf proceedings). AVOID further anonymous-zip-drop kit sweeps.

VERDICT: AUDIT: 13 NEW v53-v65 kits + 167 NET-NEW candidates extracted (319 union); Cohort 7 STRUCTURAL REJECT 5/5 at n=36 saturation; OpenViking REJECT-FOR-FIT AGPLv3-BLOCKER (n=3 audits converge); LLMLingua DEFER/CITE-CLASS-CANONICAL only (Wave 220 R5); Wave B+C diversify to C2/C9/C5/C4/C7 cohorts away from anonymous zip-drops.
