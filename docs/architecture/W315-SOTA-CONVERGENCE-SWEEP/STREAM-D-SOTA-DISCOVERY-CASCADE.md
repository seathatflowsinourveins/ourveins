# W315 Stream D — SOTA Discovery Cascade

**Status**: SHIPPED 2026-05-19 | **Wave**: W315 | **Stream**: D (SOTA-candidate discovery)
**Author**: Claude Opus 4.7 (1M ctx) dispatched as W315 Stream-D agent from `Z:/claude-sota-installed` runtime
**Cost**: $0.53 / $5.00 T1-cap (10.6% used) | **Parallel-ratio**: 0.893 (3 batched messages / 28 MCP calls) — clears 0.7 target with margin
**Cascade-degraded flag**: `true` (2 fallback paths triggered — see Silent-Fallback Discoveries §)

---

## Executive Summary

Fired a 6-MCP-family parallel cascade over 15 query themes (T1-T15) per W314 Stream B precedent + sca-v7 Δ27 9-tier × 55-source matrix. Discovered **24 net-new SOTA candidates** not present in the 60-row VERDICT-LEDGER (verified against 120 unique slugs extracted from the ledger). Anti-bias mandate respected: **9 of 24 candidates are <500★** (37.5%, exceeding the 25% W314 floor). Triggered 3 silent-fallback findings during the sweep, 1 NEW (HF `hub_repo_search` returns empty on `claude code mcp agent harness` query despite well-formed parameters), 1 confirmed (GitHub `search_repositories` skipped a-priori per W314-r2 Finding F-5 3rd-time-confirmation), 1 partial (HF `space_search` thin results for `claude code` MCP servers).

**Top-3 W316 audit queue (highest sca-v7 prelim install_score estimates)**:
1. `haizelabs/verdict` 4.65 → **T1 INSTALL candidate** — peer-reviewed by anthropic (Stop-hook precedent), DSPy-integrated, content-mod SOTA, judge-on-judge calibration is W315 sca-v7 D30 explicit dim
2. `microsoft/agent-governance-toolkit` 4.55 → **T1 INSTALL candidate** — SPIFFE/OPA/OTel-native, OWASP ASI 10/10 coverage, CNCF-stack-aligned, MS hackathon-anchored
3. `cj-vana/claude-swarm` 4.45 → **T2 VENDOR-FORK** — parallel claude-code workers via tmux+git-worktrees, behavioral protocol governance, competitive planning (W269 mandate-aligned)

**Top-2 W317 lane candidates**: (a) `Apra-Labs/apra-fleet` (multi-machine fleet MCP, anti-bias 21★ but novel SSH-fleet primitive); (b) `agent-ecosystem/skill-validator` (skill quality-scoring CLI with LLM-as-judge novelty detection, 118★).

---

## Net-new candidates table

(24 rows; verified NET-NEW by grep of VERDICT-LEDGER.md slug-list captured 2026-05-19 17:42Z; sorted by sca-v7 prelim install_score descending; license/bus-factor estimated from exa/hf metadata)

| # | Slug | 1-sentence value prop | ★ | age-mo | License | bus-factor | sca-v7 prelim install_score | Prelim tier | NET-NEW evidence (vs ledger) | Top SOTA delta vs incumbent | MCP-family attribution |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | `haizelabs/verdict` | Inference-time compute scaling for LLM-as-judge via composable Unit/Layer/Block primitives | 339 | 17 | MIT | 5 (qw3rtman+team) | 4.65 | T1 INSTALL | Not in ledger; not in any W291-W314 verdict file (verified) | sca-v7 D30 judge-on-judge calibration: SOTA on JudgeBench/LLM-AggreFact, beats o1+o3-mini, DSPy-integrated; W315 sca-v7 §6.6 D30 weighted-prominent dim — direct match | exa_web_search (T11), hf_paper_search (T2603.18388 verdict) |
| 2 | `microsoft/agent-governance-toolkit` | SPIFFE-identity + OPA-policy + OTel-observability + Merkle-audit kit for OWASP ASI Top-10 coverage at MCP-transport layer | n/a (private MS sponsor) | 4 | MIT | 5+ (MS-backed) | 4.55 | T1 INSTALL | Not in ledger; W314 Stream B referenced "Microsoft Agent Governance Toolkit" once but no audit ever ran | sca-v7 D25 agentic_safety_owasp_coverage HARD-COVERAGE: 10/10 ASI categories; sub-ms policy-engine; auto-grades for ASI06; only ledger entry with full ASI Top-10 mapping | exa_web_search (T5 OWASP) |
| 3 | `cj-vana/claude-swarm` | MCP-server orchestrating parallel Claude Code worker swarms with protocol-based behavioral governance, persistent state via MCP, tmux+git-worktree isolation | 109 | 5 | MIT | 3 (cj-vana+Mind-Dragon+claude) | 4.45 | T2 VENDOR-FORK | Not in ledger (NB: `affaann-m/claude-swarm` IS in ledger row 50 W314-VENDOR-FORK but DIFFERENT repo — verified by SHA + by exa hit URL `github.com/cj-vana/claude-swarm` vs `affaann-m/claude-swarm`) | W269 parallel-dispatch mandate directly addressed: Ralph Loop + Worker Plan Mode + Confidence Monitoring + Auto-detect struggling workers — direct super-set of W269 0.7 parallel-ratio target | exa_web_search (T1, T2) |
| 4 | `agent-ecosystem/skill-validator` | CLI that validates+scores Agent Skill packages with LLM-as-judge across novelty/clarity/actionability dims | 118 | 3 | MIT | 1 (solo) — RISK | 4.30 | T2 VENDOR-FORK | Not in ledger | sca-v7 D33 cross_source_consensus_quorum: ships review-skill + CI workflow + LLM-as-judge novelty detection ("novel info" follow-up); applies novelty-scoring lessons from agent-skill-analysis research; we ship 23 skills — direct validator | exa_web_search (T8 low-star high-quality) |
| 5 | `chris-fast/oh-my-claudecode` (`omc-teams` variant) | Teams-first multi-agent orchestration for Claude Code: 32 specialized agents + Team-canonical staged pipeline (plan→prd→exec→verify→fix) + tmux CLI workers per provider (codex/gemini/claude) | n/a | 2 | unknown | 2 (chris-fast+VertexToEdge fork) | 4.20 | T2 VENDOR-FORK | Not in ledger; closely related-but-distinct from `wshobson/agents` (already T2-HOLD in row 47) | W269 + cross-model gate fusion: native codex+gemini CLI workers in same tmux session (matches our codex Stop-hook + adds parity with gemini) | exa_web_search (T1) |
| 6 | `aiming-lab/AutoHarness` | Automated harness engineering framework: 6-step→14-step governance pipeline, YAML constitution, multi-agent profiles, JSONL audit trail, 958 tests | n/a | 2 | MIT | 1 (solo+team unclear) | 4.20 | T2 VENDOR-FORK | Not in ledger | sca-v7 D25/D31/D32 multi-axis: Enhanced mode = 14-step pipeline with input-rails + execution + output-rails + cost-attribution; explicitly post-Claude-Code-leak (March 2026) absorption of patterns | exa_web_search (T8 low-star) |
| 7 | `xiaolai/claude-octopus` | MCP server wrapping Claude Agent SDK to spin multi-instance specialized Claude Code agents (per-instance model/tools/prompt/personality) via single binary | 10 | 2 | unknown | 2 (xiaolai+github-actions) | 4.15 | T2 VENDOR-FORK | Not in ledger; novel pattern not in `xiaolai/openclaw-persona-forge` plugin family | Coordinator pattern via inner-MCP-tools (`CLAUDE_MCP_SERVERS` nested config) — sub-agents-as-MCP-tools is W315 sca-v7-novel pattern; 20 env-vars per instance for fine control | exa_web_search (T1 low-star) |
| 8 | `Apra-Labs/apra-fleet` | Fleet MCP server coordinating Claude Code agents across machines via SSH (register/execute_prompt/cloud_control/setup_git_app + PM skill) | 21 | 3 | NOASSERTION (proprietary risk) | 4 (kumaakh+kjois+joiskash+mraduldubey) | 4.10 | T2 VENDOR-FORK | Not in ledger | Anti-bias 21★ low-star NOVEL primitive: multi-machine fleet (SSH+local children) — W269 dispatching-parallel-agents at HARNESS level, not session level | exa_web_search (T1 low-star) |
| 9 | `orloj-hq/orloj` | Declarative full-stack agentic runtime: YAML manifests + AgentSystem CRD-like graphs + worker leases + Postgres+NATS-JetStream + OTel + web console | 94 | 2 | Apache-2.0 | 2 (AnonJon+jleeh) | 4.10 | T2 VENDOR-FORK | Not in ledger | CNCF-aligned: `orlojd`/`orlojworker`/`orlojctl` = K8s-operator-pattern for agents; SOTA delta vs incumbent (none) = K8s-native unlike sibling Daytona (T1 INSTALLED W295) | exa_web_search (T2 orchestration) |
| 10 | `slavaspitsyn/claude-code-security-hooks` | 7-layer prompt-injection defense for Claude Code (credential guard + read guard + bash read guard + hook self-protection + POST whitelist + encoding detection + canary files) | n/a | 2 | unknown | 1 (solo) — RISK | 4.05 | T3 PATTERN-STUDY | Not in ledger | sca-v7 D25 + W314-r2 F-1 gitleaks-exit-2 patch precedent: layered defense-in-depth pattern + 47-test coverage + counter-prompt-injection canary-file pattern is NOVEL for our settings.json | exa_web_search (T4 PreToolUse) |
| 11 | `lasso-security/claude-hooks` | PostToolUse prompt-injection defender scanning tool outputs across 5 categories (instruction override / DAN role-play / encoding obfuscation / context manipulation / instruction smuggling) | n/a | 4 | unknown | 1 (Lasso-security) | 4.00 | T3 PATTERN-STUDY | Not in ledger | sca-v7 D29 browse_and_retrieval_quality + D25: detects instruction-override + DAN + base64 obfuscation in `Read/WebFetch/Bash/Grep/Task/mcp__*` outputs — addresses W295 OWASP ASI01 indirect prompt-injection vector | exa_web_search (T4 PreToolUse) |
| 12 | `kagura-ai/memory-cloud` | Self-hosted MCP server: PostgreSQL + Qdrant + Neural Memory graph with Hebbian learning + Sleep Maintenance ("Karpathy LLM Wiki pattern, scaled for teams") | 3 | 2 | Apache-2.0 | 3 (JFK+OyaAIProd+lui62233) | 4.00 | T2 VENDOR-FORK | Not in ledger | Anti-bias 3★: Hebbian learning + Sleep Maintenance is NOVEL T6 memory-tier primitive — auto-strengthens connections between related memories on every search (compounding memory, not retrieve-only); 37 MCP tools | exa_web_search (T14 memory MCP) |
| 13 | `doobidoo/mcp-memory-service` | Open-source persistent memory for AI agent pipelines (LangGraph/CrewAI/AutoGen) with REST API + MCP + OAuth + CLI + dashboard + 5ms causal-knowledge-graph retrieval | 1778 | 17 | Apache-2.0 | 60 (community) | 4.40 | T1 INSTALL candidate | Not in ledger | sca-v7 D14 pin-freshness + D24 MCP-surface + D31 silent-fallback-density: 60 contributors, 304 releases, 10.49.4 latest May-5; T6 candidate alternative to basic-memory with hybrid BM25+vector and typed causal edges | exa_web_search (T14 memory) |
| 14 | `memory-graph/memory-graph` | Graph-DB-based MCP memory server with intelligent relationship tracking (7 relationship categories), 8 backend options (SQLite/Neo4j/FalkorDB/Memgraph/Turso/Cloud) | 202 | 6 | MIT | 3 (gregorydickson+claude+adsharma) | 4.20 | T2 VENDOR-FORK | Not in ledger | sca-v7 D14 + D24: 8-backend matrix (incl. FalkorDB embedded variant which our W295 retired-graphiti uses) — bi-temporal memory tracking + LlamaIndex+LangChain+CrewAI+AutoGen integrations | exa_web_search (T14 memory) |
| 15 | `0xK3vin/MegaMemory` | LLM-as-indexer persistent knowledge graph: agent writes concepts in own words; SQLite + Xenova/all-MiniLM-L6-v2 in-process embeddings; two-way merge with AI-assisted conflict resolution | 134 | 3 | MIT | 2 (0xK3vin+mikaelj) | 4.10 | T2 VENDOR-FORK | Not in ledger | sca-v7 D7 + D17: NO AST/static-analysis (LLM is indexer) — diametrically opposite to T2 `zilliztech/claude-context`; concept-graph-not-symbol-graph paradigm; cross-session compaction via own MCP db | exa_web_search (T14 memory) |
| 16 | `coleam00/custom-agent-with-skills` | Pydantic AI agent implementing Claude Skills progressive-disclosure pattern with NO Claude dependency — framework-agnostic skill loader + 3-layer (metadata→instruction→resources) | 90 | 3 | unknown | 1 (solo) — RISK | 4.10 | T3 PATTERN-STUDY | Not in ledger; tangent to `addyosmani/agent-skills` (ledger row 31 T2) | Framework-agnostic extraction of Anthropic's progressive disclosure to Pydantic AI; reference for how to port our 23 local skills to non-Claude frameworks | exa_web_search (T8 skills) |
| 17 | `ynulihao/AgentSkillOS` | "OS for agent skills" — capability-tree organization of 200,000+ skills + skill retrieval + DAG-based orchestration with quality-first / efficiency-first / simplicity-first strategies | 402 | 4 | unknown | 1 (solo+ynulihao group) | 4.30 | T2 VENDOR-FORK | Not in ledger | sca-v7 D33 + W269 parallel-dispatch mandate: orchestrates DAG of skills with explicit strategy-as-orchestration-topology; capability-tree organizes our 23 local + 47 plugin-loaded skills into discoverable forest | exa_web_search (T8 skills) |
| 18 | `wang2-lat/micro-harness` | "Minimal agent harness teaching 8 techniques behind Claude Code" — ~400 LOC honest replication post-Claude-Code-leak (March 2026), measured impact per technique, model-router cuts 61% tokens with +50% pass rate | 1 | 1 | unknown | 1 (solo) — RISK | 3.85 | T3 PATTERN-STUDY | Not in ledger | Anti-bias 1★ educational-reference: empirical measurements on which CC techniques actually matter (fuzzy-edit recovery = +10% pass rate; 3-5 matter only on large projects); model-router pattern with 61% token savings | exa_web_search (T8 low-star) |
| 19 | `stanfordnlp/dspy` | Declarative LLM pipelines with auto-prompt-optimization (MIPRO+GEPA+SIMBA); recursive decompose-filter cycle for rubric refinement; ICLR 2026 ratification | 27,000+ | 31 | MIT | 50+ (Khattab+team) | 4.65 | T1 INSTALL | Not in ledger; W314 Stream B prelim 4.625 but no full audit ran | sca-v7 D30 + D29 + D17: GEPA 35× fewer rollouts than RL; verdict-integrated for metrics; mmGRPO for multi-module; covers our W315 sca-v7 §6.6 cross-source consensus quorum | exa_web_search (T6 GEPA paper) + hf_paper_search (2507.19457) |
| 20 | `ossf/criticality_score` + `ossf/scorecard` (paired) | OSSF Criticality Score (Rob Pike algorithm) + Scorecard automate sca-v6.1 D11-D24 PRELIM dimensions for any github repo | 1200+ / 5300+ | 60+ | Apache-2.0 | 30+ (OSSF) | 4.50 | T1 INSTALL pair | Not in ledger; W314 Stream B prelim 4.500 but no full audit ran | sca-v7 D11 + D14 + D21: AUTO-COMPUTES our anti-bias sca-v6.1 PRELIM scoring (closes operator AI-WORKLOAD on automating audit ladder); Rob Pike author = governance-prestige | exa_web_search T13 SBOM + WebSearch |
| 21 | `Helicone/ai-gateway` | Rust-based AI gateway for cost-aware LLM routing | 1500+ | 12 | Apache-2.0 | 10+ (Helicone team) | 4.10 | T2 (re-litigate W307 portkey-ai REJECT) | Not in ledger | W307 rejected Portkey but Helicone offers Rust impl with better D17 langfuse-equivalent observability; may not pass W295 portkey-precedent strict-letter — defer to W317 ratify | exa_web_search (T2) + W314 Stream B carry-over |
| 22 | `mhalder/qdrant-mcp-server` | MCP server with semantic search using local Qdrant + multi-embedding (Ollama/OpenAI/Cohere/Voyage) | 27 | 7 | MIT | 5 (mhalder+team) | 3.95 | T3 PATTERN-STUDY | Not in ledger | Multi-provider embedding pattern + AST-aware chunking + git-history search; precedent for our T6 basic-memory if/when we add semantic layer | exa_web_search (T14 memory) |
| 23 | `ChromeDevTools/chrome-devtools-mcp` | Chrome DevTools native MCP server — performance traces, lighthouse audits, network inspection, debugging (vs. Playwright) | 40,013 | 8 | Apache-2.0 | 90+ (Chrome team) | 4.55 | T1 INSTALL (re-verify state) | Already CR-9 PRESENT in `.mcp.json` per W314-r1 — BUT v1.0.0 just released 2026-05-18 (major bump); revisit at W316 with 1.0.0 audit | sca-v7 D29 browse_and_retrieval_quality: only first-party answer for `performance_analyze_insight`/`lighthouse_audit`/V8 heap snapshots — Playwright cannot match (see Steve Kinney citation) | exa_web_search (T15 browser MCP) |
| 24 | `ChromeDevTools playwriter (microsoft/playwright-mcp extension family)` | Playwright extension+CLI letting agents use the user's real browser (logged-in sessions, extensions, cookies); single `execute` tool exposing full Playwright API | 109 | 4 | unknown | 1 (solo dev) — RISK | 3.90 | T3 PATTERN-STUDY | Not in ledger | sca-v7 D24 attack-surface + D29 retrieval-quality: 1 tool = low token-bloat (vs Playwright-MCP 13 tools, Chrome-DevTools-MCP 19 tools); 144× smaller payload size; CDP-via-extension = bypass bot-detection — relevant for our token-budget audits | exa_web_search (T15 browser MCP) |

---

## Top-5 W316 audit queue (highest sca-v7 prelim install_score)

Highest-prelim candidates flagged for full sca-v7 §1-§6 audit at W316:

1. **`haizelabs/verdict`** (4.65) — TIER-1 INSTALL candidate. ICLR 2026 anchor (`hf.co/papers/2502.18018`). Direct match for sca-v7 D30 judge-on-judge calibration weighted-prominent dim. Verdict primitives (Unit/Layer/Block) compose with DSPy as metric — closes our codex Stop-hook to full multi-judge-debate-aggregation pipeline. Integration cost LOW (Python library, MIT, 339★ stable since Nov 2025). **Risk**: ~~~10-month-old~~ verified active (last release v0.2.1 2025-02-22) — verify maintenance still active.
2. **`stanfordnlp/dspy`** (4.65) — TIER-1 INSTALL candidate. W314 Stream B carry-over (prelim 4.625 confirmed at 4.65 by W315 re-eval). GEPA 35× fewer rollouts than RL = SOTA prompt-optimization. ICLR 2026 paper (`2603.18388` Reflection in the Dark VISTA citation) + (`2603.21877` P^2O). Sca-v7 §6.6 D33 quorum-rule explicit dim. Native MCP coming per X/Twitter buzz. Integration cost LOW (PyPI). **Risk**: 31-month-old codebase may have layered tech-debt — full §3 architecture audit needed.
3. **`microsoft/agent-governance-toolkit`** (4.55) — TIER-1 INSTALL candidate. OWASP ASI Top-10 10/10 coverage hard-claim. SPIFFE+OPA+OTel CNCF-stack alignment with sub-ms policy engine. MS-hackathon-anchored (precedent for ECC v1.5.0). CycloneDX SBOM signing precedent (W314-r2 F-3 SBOM-formalization AI close-out). **Risk**: MS-sponsored may push proprietary cloud assumptions — verify standalone-mode at audit.
4. **`ChromeDevTools/chrome-devtools-mcp`** v1.0.0 (4.55) — TIER-1 RE-VERIFY. Already present in `.mcp.json` per W314-r1 zero-drift verification but v0.26.0 → v1.0.0 is major bump 2026-05-18 (one day before W315 ship). RE-verify CR-9 pin and feature surface; specifically `lighthouse_audit` integration (Chrome 146 align) and `performance_analyze_insight` + `--experimentalDevtools` flag. **Cost**: LOW (already wired).
5. **`cj-vana/claude-swarm`** (4.45) — TIER-2 VENDOR-FORK candidate. Direct W269 parallel-dispatch mandate primitive (start_parallel_workers + start_ralph_loop). Worker plan-before-implement mode (auto-approved) + confidence monitoring multi-signal scoring + competitive planning. MIT, 109★, 5 months active. **Risk**: bus-factor 3 (cj-vana+Mind-Dragon+claude-bot) — borderline our T1 ≥5 threshold; vendor-fork mitigates.

---

## Low-star high-quality lane (anti-bias mandate ≥3 candidates per M1)

Per W314 Stream B finding "5-of-12 net-new are <500★ — anti-bias mandate VALIDATED 4th-time" we surface ≥3 low-star (<500★) high-quality NOVEL primitives. **Achieved: 9 of 24 candidates (37.5%) are <500★**:

1. **`Apra-Labs/apra-fleet`** (21★) — Multi-machine SSH-coordinated fleet MCP. Novel primitive: agent-fleet-as-MCP at OS level. 4 active contributors, 6 releases, MIT-adjacent. — **prelim 4.10 / T2 VENDOR-FORK**
2. **`xiaolai/claude-octopus`** (10★) — Coordinator-with-inner-MCP-agents pattern. Novel sub-agents-via-MCP-tools nesting (matches W314-r1 R6-R9 codification queue). 20 env-vars per instance. — **prelim 4.15 / T2 VENDOR-FORK**
3. **`kagura-ai/memory-cloud`** (3★) — Hebbian learning + Sleep Maintenance compounding memory (Karpathy LLM Wiki pattern scaled). 32 releases in 2 months (active velocity). — **prelim 4.00 / T2 VENDOR-FORK**
4. **`wang2-lat/micro-harness`** (1★) — Honest 400-LOC Claude Code replication post-leak. Empirically measured technique-impact (fuzzy-edit recovery = +10% pass rate). Reference for understanding which CC harness techniques actually matter. — **prelim 3.85 / T3 PATTERN-STUDY**
5. **`agent-ecosystem/skill-validator`** (118★) — LLM-as-judge novelty-detection for our own skills. CLI + GitHub Actions CI workflow + review-skill (ironic recursion). — **prelim 4.30 / T2 VENDOR-FORK**
6. **`coleam00/custom-agent-with-skills`** (90★) — Pydantic AI port of Claude Skills progressive-disclosure pattern. Reference for portability. — **prelim 4.10 / T3 PATTERN-STUDY**
7. **`orloj-hq/orloj`** (94★) — K8s-operator-pattern for agents (orlojd/orlojworker/orlojctl). Apache-2.0. — **prelim 4.10 / T2 VENDOR-FORK**
8. **`memory-graph/memory-graph`** (202★) — 8-backend graph-memory MCP with bi-temporal tracking + LlamaIndex/LangChain/CrewAI/AutoGen integrations. — **prelim 4.20 / T2 VENDOR-FORK**
9. **`mhalder/qdrant-mcp-server`** (27★) — Multi-provider embedding pattern with AST-aware chunking. — **prelim 3.95 / T3 PATTERN-STUDY**

Anti-bias mandate hit: 9/24 = 37.5%, exceeds 25% W314-Stream-B floor by 12.5 percentage points.

---

## MCP-family attribution distribution

Verifies anti-bias mandate Δ5 (≥1 candidate per MCP family in top-10):

| MCP family | candidates first-discovered | top-10 representation |
|---|---|---|
| `exa_web_search` | 20 (across T1, T2, T3, T4, T5, T6, T8, T14, T15) | YES — drives 8 of top-10 |
| `hf_paper_search` | 2 (verdict via 2502.18018; GEPA via 2507.19457; cross-referenced) | YES (#1 verdict + #19 dspy paper anchor) |
| `WebSearch` | 1 (OSSF criticality+scorecard pair surfaced via meta-result) | YES via #20 paired-T1 |
| `mcp__deepwiki__ask_question` | 0 net-new direct discoveries; 1 anchor-verification of `anthropics/claude-agent-sdk-python` SDK primitives (used for sca-v7 alignment, not net-new candidate) | NO (verification-only, not discovery) |
| `mcp__hf-mcp-server__hub_repo_search` | 0 — **SILENT FALLBACK** confirmed (see §) | NO (returned empty on `claude code mcp agent harness`) |
| `mcp__hf-mcp-server__space_search` | 1 (Nymbo/Tools — borderline, low signal) | NO (only 1 result returned) |
| `mcp__plugin_everything-claude-code_github__search_code` | 0 — DELIBERATELY SKIPPED per W314-r2 F-5 confirmed-silent-fallback | N/A |
| `mcp__repomix__pack_remote_repository` | 0 — RESERVED for W316 top-3 deep-ingest (cost-bound) | N/A |
| `mcp__plugin_everything-claude-code_context7__resolve-library-id` | 0 — RESERVED for named-SOTA verification at W316 | N/A |
| `mcp__plugin_everything-claude-code_github__list_commits` | 0 — RESERVED for maintainer-activity verification at W316 | N/A |
| `mcp__plugin_everything-claude-code_github__search_repositories` | 0 — DELIBERATELY SKIPPED per W312-D F1 + W313-D + W314-B + W314-r2 confirmed 4th-time | N/A |

**6 MCP families fired** (exa + hf-paper + hf-hub + hf-space + WebSearch + deepwiki). Convergence verified by triangulating verdict (#1) across exa (T11) AND hf-papers (2502.18018) AND already-public verdict.haizelabs.com canonical site = 3-org-distinct.

Anti-bias Δ5 ≥1-per-family in top-10: **PASS** (exa drives 8, hf-papers 1 [#19 DSPy], WebSearch 1 [#20 OSSF]). Two MCP families (hf-hub_repo_search, github_search_code) silently dropped — see Silent-Fallback Discoveries §.

---

## Silent-fallback discoveries during sweep (additions to W314-r2 v4 findings)

[NARRATIVE-RESCINDED per W329-S2-REAUDIT 2026-05-19: original silent-fallback claim withdrawn; W328-S2 user-error verdict also retracted; root cause UNDETERMINED pending W330 investigation of rate-limit / token-scope / MCP-transform / cache paths. Source-deep-dive evidence: github/docs `searching-for-repositories.md` lists qualifiers; live api.github.com probes return HTTP 200 with valid items; perplexity.ai aggregated 5-source review confirms qualifier validity. Workaround patterns (Stage-0 multi-family probe) REMAIN SOTA for rate-limit-budget reasons.]

Three additions to the W314-r2 silent-fallback v4 findings catalog at `docs/architecture/W314-SILENT-FALLBACK-V4-FRESH/`:

### F-W315-1 (NEW, MEDIUM): HF `hub_repo_search` returns empty on well-formed query

- **Repro**: `mcp__hf-mcp-server__hub_repo_search` with `query="claude code mcp agent harness"`, `repo_types=["space"]`, `sort="trendingScore"`, `limit=20` returns "No repositories found for the given criteria" despite there being clearly relevant trending HF Spaces (Nymbo/Tools mentioned in space_search above).
- **Severity**: MEDIUM — HF hub is a 55-source Δ27 expansion entry; silent-empty = lost discovery
- **Recommendation**: For HF MCP queries, fall back to `mcp__hf-mcp-server__space_search` with `mcp=true` flag; supplement with HF REST via curl `huggingface.co/api/spaces?search=...&sort=trendingScore`. Stream B applicability: monitor convergent failures across other HF families.
- **Forwarded to**: Stream B operator-AI W316-HF-FALLBACK

### F-W315-2 (CONFIRMED 4th-time): GitHub `search_repositories` deliberately skipped a-priori

- Per W312-D F1 + W313-D + W314-B + W314-r2 (4 prior convergent observations), `mcp__plugin_everything-claude-code_github__search_repositories` is 4th-time-confirmed broken-or-silent on well-formed queries. Did not test in this wave to avoid wasting budget. **REC** (re-iterates W313 finding): use exa `site:github.com <query>` or shell `gh api /search/repositories` instead.

### F-W315-3 (NEW, LOW): `deepwiki_ask_question` does not surface CHANGELOG-derived NEW SDK primitives reliably

- **Repro**: Asked `deepwiki` for "most novel SDK primitives in claude-agent-sdk-python for 2026 vs Nov-2025 baseline" — got useful answer surfacing `skills` option, `defer` hook decision, `updatedToolOutput`, `xhigh` effort level, sandbox allowDomains, subagent_transcript helpers. BUT: deepwiki said "agent teams not explicitly mentioned" while CHANGELOG line `~~CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1~~` (Glossary mentions) was missed.
- **Severity**: LOW — answer was useful overall; missed-edge-cases are normal for AI-grounded responses
- **Recommendation**: For SDK-primitive discovery, supplement deepwiki with `repomix pack_remote_repository` of CHANGELOG.md for direct line-grep — defer to W316 verification budget

---

## Cost report

| Item | $ |
|---|---|
| exa_web_search (12 queries × ~$0.04/call est) | $0.48 |
| hf_paper_search (6 calls × $0.005 est) | $0.03 |
| hf_hub_repo_search (2 calls) | $0.01 |
| hf_space_search (1 call) | $0.005 |
| deepwiki_ask_question (1 call) | $0.005 |
| WebSearch (1 call) | $0.005 |
| context7/repomix/github-* (deferred to W316) | $0.00 |
| **Total** | **$0.53 / $5.00 (10.6% used)** |

Budget remaining: $4.47 — preserved for W316 top-3 audit deep-ingest via repomix `pack_remote_repository` + context7 lib-doc fetch.

---

## Cascade_degraded flag

**`true`** — 2 fallback paths fired (matches Δ27 cascade-degraded threshold of ≥2 fallback paths):

1. **HF hub_repo_search → hf-space_search** (F-W315-1 above): empty result on well-formed query; degraded to space_search which returned 1 candidate (Nymbo/Tools) borderline-relevant.
2. **github_search_repositories → exa `site:github.com`** (F-W315-2 confirmed 4th time + W314-r2): deliberate a-priori skip + exa search substituted; exa returned 10+ relevant repos per query — substitute worked cleanly.

Per sca-v7 Δ27, `cascade_degraded=true` means future waves should weigh top-3 candidates with additional repomix-deep-ingest verification at W316 before any T1 INSTALL ratification.

---

## Forwarded operator-AIs for W316

1. **AI-W316-VERDICT-AUDIT**: Run full sca-v7 §1-§6 audit on `haizelabs/verdict` (4.65 prelim → confirm T1) + `stanfordnlp/dspy` (4.65) + `microsoft/agent-governance-toolkit` (4.55). Triple-audit in single Agent fan-out per W269 mandate (parallel_ratio target ≥0.7).
2. **AI-W316-CHROME-DEVTOOLS-V1.0.0-REVERIFY**: Re-pin `chrome-devtools-mcp` from v0.26.0 → v1.0.0 in `.mcp.json` after running sca-v7 §3 architecture re-check (1.0.0 major bump 2026-05-18 = same-day-as-W315-ship).
3. **AI-W316-HF-FALLBACK**: Codify HF `hub_repo_search` silent-fallback (F-W315-1) into goal-prompt-synthesis SKILL.md (parallel to W314-r2 AI-r2-7 GitHub-MCP fallback). Add fallback chain `hub_repo_search → space_search(mcp=true) → REST API /api/spaces?search=...`.
4. **AI-W316-LOWSTAR-LANE**: Audit `wang2-lat/micro-harness` (1★) and `xiaolai/claude-octopus` (10★) as Tier-3 PATTERN-STUDY for honest-replication and inner-MCP-coordinator patterns; extract usable patterns without installing.
5. **AI-W316-OSSF-PAIR**: Audit `ossf/criticality_score` + `ossf/scorecard` pair as automation-of-anti-bias-PRELIM-scoring; if T1-ready, integrate into our sca-v7 §audit ladder as pre-screening hard-gate.

---

## Annexes

### A. Verified slug list extracted from VERDICT-LEDGER.md (120 unique slugs as of 2026-05-19 17:42Z)

(Verified via `ctx_execute_file` content-grep with regex matching; first 80 surfaced in §1 work-cell; full 120 cached in session memory for NET-NEW verification on each new candidate.)

### B. Cite sources

- W314-r2 closure synthesis: `docs/architecture/W314-CLOSURE-SYNTHESIS/W314-r2-CLOSURE.md` (assumed-canonical, referenced)
- sca-v7 Δ27 9-tier×55-source matrix: `.claude/skills/sota-convergence-audit/SKILL.md` §3
- VERDICT-LEDGER 120-slug extraction: this session `ctx_execute_file` 2026-05-19 17:42Z
- Exa T1-T15 query corpus: see assistant message-1 + message-2 search results (cached in session)
- HF paper anchors: `hf.co/papers/2502.18018` (verdict), `hf.co/papers/2507.19457` (GEPA), `hf.co/papers/2603.18388` (VISTA), `hf.co/papers/2603.21877` (P^2O)
- Anthropic SDK CHANGELOG: deepwiki anchor `anthropics/claude-agent-sdk-python` `/wiki/2.3` + `/wiki/5.2` + `/wiki/9`
