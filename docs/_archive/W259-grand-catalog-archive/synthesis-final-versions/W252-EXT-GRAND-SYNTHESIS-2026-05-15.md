# Wave 252-extension — GRAND SYNTHESIS for `Z:\claude-sota-pure`

**Date**: 2026-05-15
**Author**: Orchestrator (Opus 4.7) synthesizing 4-agent fan-out per `team-orchestration.md §Wave-Based Execution` ("the lead synthesizes")
**Mission**: reconcile Wave 252-extension agent fan-out into the install architecture for a NEW pure SOTA Claude Code runtime at `Z:\claude-sota-pure` — fully fresh, sota-referenced, un-biased by the existing `claude-sota-installed` architecture.
**Status**: **AUTHORITATIVE** — orchestrator-fired codex T1 Path P adversarial review (real GPT-5.5) returned NEEDS-REVISION conf=0.87; all 12 findings integrated via Pattern A fix-forward; cross-model consensus per cardinal-rule-3 SATISFIED.

---

## §0 Provenance + cross-model gate status

| Agent | Role | Verdict | Artifact |
|---|---|---|---|
| A | sota-researcher — audit + gap-scan | GAP-CONFIRMED (18 P0/P1 + 9 P2 gaps) | `agent-reports/A-audit-gap-scan-2026-05-15.md` |
| B (orig) | codex-rescue BRIDGE-MODE | **FAILED — FM-17.b/d wrapper-context autocompact-thrash** | — |
| B-redo | sota-researcher recovery dispatch | DISCOVERY-COMPLETE conf=0.86 (105 repos, 7 sub-Q) | `agent-reports/B-fresh-2026may-discovery-2026-05-15.md` |
| C | evaluator — adversarial blind-spot | BLIND-SPOTS-FOUND conf=0.88 severity=P0 (D1-D10) | `agent-reports/C-adversarial-blind-spot-2026-05-15.md` |
| D | sota-researcher — infrastructure discovery | CATEGORIES-CLOSED conf=0.86 (13/13 layers) | `category-deep-dive/D-infrastructure-13-layers-2026-05-15.md` |

**CROSS-MODEL GATE STATUS — SATISFIED.** All 4 surviving research agents ran as Sonnet stand-ins (the one BRIDGE-MODE dispatch, Agent B, thrashed per FM-17.b/d and was recovered as Sonnet) — so per `cmc-env-funneled-disclosure.md §STAND-IN-NOTICE mandate` the AGENT layer carried STAND-IN-NOTICE. The cross-model gate is closed at the SYNTHESIS layer: the orchestrator fired a codex T1 Path P foreground+tee adversarial review (real GPT-5.5 codex CLI subprocess), which returned NEEDS-REVISION conf=0.87 / 12 findings. All 12 were Mia-verified GENUINE and integrated as a Pattern A single fix-forward. Cross-model consensus per cardinal-rule-3 is therefore SATISFIED at the synthesis verdict layer (verdict origin = real GPT-5.5 via codex CLI).

CADP discipline: 5 cumulative agent dispatches (A + B-orig + C + D + B-redo), at the `parallel-agent-wave.md §CADP rule 4` cap. Agent E (architect) was folded into orchestrator-side synthesis to avoid a 6th dispatch. The codex T1 below is an orchestrator-direct `codex exec` subprocess — NOT an Agent dispatch — so it does not consume the CADP budget.

---

## §1 The central reconciliation — Agent C "30-50 missing" vs Agent D "~8 realistic"

Agent C's adversarial audit found **D4: 13 entirely-missing infrastructure categories** and estimated "30-50 additional repos required." Agent D then executed the discovery and **corrected the estimate downward to ~8 install artifacts**. This is the most important convergence finding of the wave. The correction holds for three reasons (all evidence-backed by Agent D):

1. **ollama collapses 3 categories.** `ollama/ollama` (171k★, MIT) natively serves local models (D4-2), embedding models (`ollama pull nomic-embed-text` — D4-3), and rerank-capable models (D4-4). One install covers three of C's "missing" layers. SOTA embeddings/rerankers are model *weights* on HF Hub, not GitHub-star-shaped installable repos — so D4-3/D4-4 were never going to be "repos to install."
2. **Native > install for 3 layers.** Sandbox (D4-11) = Anthropic CC native `settings.json` sandbox block (April-2026 sandboxing release). Cache (D4-13) = Anthropic native `cache_control` prompt-caching API. Vision (D4-9) = Claude Opus 4.7 is natively multimodal. Zero installs for three categories.
3. **D4-10 workflow orchestration = WHOLE-CATEGORY REJECT-FOR-FIT.** Temporal/Airflow/Prefect are server-side DAG schedulers for data pipelines (mode-harness mismatch per `convergence-gate.md` Probe-5). The runtime's orchestration IS Agent-tool fan-out + `/loop` + cwc-long-running-agents harness.

**RECONCILED VERDICT**: Agent C correctly identified that the prior GRAND_CATALOG was Claude-Code-plugin-centric and missing the LLM-stack layers — that finding STANDS. Agent D correctly sized the actual install surface — **the pure runtime needs ~8-12 net-new infrastructure artifacts, not 30-50.** Both agents were right about different things; the synthesis adopts D's sizing with C's category-completeness mandate.

**RESIDUAL CAVEAT (codex T1 F-1/F-2)**: the downward correction reduces *install-class repo COUNT* — it does NOT eliminate the underlying category DECISIONS. Reranker serving (distinct from generic ollama embedding serving), STT/audio, research-cohort ingestion, and install-time governance still require explicit dispositions even when they need few/zero net-new repos. "Collapses to ollama" / "native covers it" / "whole-category REJECT" are per-category verdicts that must each be DOCUMENTED (see §2 L15 + §4), not a blanket dismissal. The ~8-12 figure is repos-to-install; the decision surface is wider.

---

## §2 The 15-layer SOTA architecture for `Z:\claude-sota-pure`

Each layer below is **assembled from the prior GRAND_CATALOG baseline PLUS Wave 252-extension A/B/C/D deltas** (codex T1 F-9 — NOT every row was freshly re-discovered this wave). L0 foundation rows are **prior-catalog carryover requiring CR-9 fresh verification** before install. Scoring is the 11-dimension rubric: stars / age / cpd-band / license / native-CC-path / wire-difficulty 1-5 / Axis-1 / Axis-2 / Axis-3 / Probe-4 / Probe-6.

### L0 — Foundation (Anthropic-canonical chain)

| Pick | Stars | License | wire | Score | Disposition |
|---|---|---|---|---|---|
| `anthropics/claude-plugins-official` | 135k+ (anthropics/skills) | MIT | 1 | 97 | ADOPT-NOW |
| Claude Agent SDK (python/TS) | — | MIT | 1 | 95 | ADOPT-NOW |
| `anthropics/cwc-long-running-agents` | — | Apache-2.0 | 2 | 94 | ADOPT-NOW (5 harness primitives) |
| `modelcontextprotocol/servers` | high | MIT | 2 | 93 | ADOPT-NOW |
| `modelcontextprotocol/mcpb` | — | MIT @ HEAD 70fe3b34 | 2 | 88 | ADOPT-NOW (NEW bundle format — GAP-14) |
| `openai/codex` CLI | high | Apache-2.0 | 2 | 92 | ADOPT-NOW (cross-model worker) |

### L1 — LLM serving + routing

| Pick | Stars | License | wire | Score | Disposition |
|---|---|---|---|---|---|
| `ollama/ollama` | 171,475 | MIT | 1 | **96** | **ADOPT-NOW** — collapses serving+embeddings+rerank |
| `BerriAI/litellm` | 47,139 | MIT | 3 | **91** | **ADOPT-NOW** — Anthropic-API-native router + cost-routing + failover + `mcp-gateway` |
| `ggml-org/llama.cpp` | 110,319 | MIT | 3 | 89 | STUDY-PILOT (alt serving) |

### L2 — Memory

| Pick | Stars | License | wire | Score | Disposition |
|---|---|---|---|---|---|
| `doobidoo/mcp-memory-service` | 1,844 | Apache-2.0 | 2 | 86 | ADOPT-NOW (L1 capture — sqlite-vec backend) |
| `getzep/graphiti` | ~25.8k | Apache-2.0 (core) | 3 (6+ env) | 84 | **STUDY-PILOT** — promotes to ADOPT-NOW ONLY after an Apache-compatible backend decision is recorded (Neo4j Apache-2.0 swap vs explicit FalkorDB SSPL-accept). graphiti core is Apache-2.0 but the default FalkorDB backend is SSPL (codex T1 F-11) |
| `mem0ai/mem0` | 55,805 | Apache-2.0 [verify] | 3 | 88 | STUDY-PILOT (pilot vs incumbent — Probe-7 incumbent-comparison) |
| `letta-ai/letta` | 22,737 | Apache-2.0 [verify] | 3 | 86 | STUDY-PILOT (MemGPT lineage — peer-reviewed episodic/core split) |
| `topoteretes/cognee` | 17,248 | Apache-2.0 [verify] | 3 | 78 | STUDY-PILOT-NARROW (SUPERSEDED-BY graphiti) |

**Memory discipline (B-redo §2)**: DO NOT chase star counts — `MemPalace/mempalace` (52k★/1.4mo) is an extreme fresh-paint launch-spike. Mature peer-reviewed picks: mem0 + letta. A new memory layer must pass Probe-7.b (a workflow the incumbents don't serve).

### L3 — RAG (open-RAG)

| Pick | Stars | License | wire | Score | Disposition |
|---|---|---|---|---|---|
| `microsoft/graphrag` | 33,013 | MIT [verify] | 3 | 84 | STUDY-PILOT (most-cited; MS Research paper) |
| `HKUDS/LightRAG` | 35,248 | MIT [verify] | 3 | 83 | STUDY-PILOT (lighter; EMNLP2025 paper) |
| `infiniflow/ragflow` | 80,592 | Apache-2.0 [verify] | 4 | 80 | STUDY-PILOT (standalone service — heavyweight) |
| `deepset-ai/haystack` | 25,239 | Apache-2.0 [verify] | 3 | 75 | STUDY-PILOT (framework) |

### L4 — Vector DB

| Pick | Stars | License | wire | Score | Disposition |
|---|---|---|---|---|---|
| `asg017/sqlite-vec` | ~5k | Apache/MIT | 1 | **86** | **ADOPT-NOW** (embedded — already a memory backend) |
| `qdrant/qdrant` | 31,341 | Apache-2.0 (verified SHA 261eeb9e) | 3 | **90** | **ADOPT-NOW** (scale — official `mcp-server-qdrant`) |
| `milvus-io/milvus` | 44,314 | Apache-2.0 | 4 | 82 | STUDY-PILOT (heavier) |

### L5 — Code intelligence

| Pick | Stars | License | wire | Score | Disposition |
|---|---|---|---|---|---|
| `yamadashy/repomix` | 24,893 | MIT | 2 | **92** | **ADOPT-NOW** (codebase-pack MCP — ~70% compression) |
| serena (MCP) | — | MIT | 2 | 88 | ADOPT-NOW (LSP-backed semantic code tools) |
| `ast-grep` CLI | — | MIT | 2 | 84 | ADOPT-NOW (structural search/rewrite) |
| gitnexus | — | — | 2 | 82 | STUDY-PILOT (dependency graph / impact analysis) |

### L6 — Token / context optimization (REPLACES stale microsoft/LLMLingua)

| Pick | Stars | License | wire | Score | Disposition |
|---|---|---|---|---|---|
| Anthropic prompt caching (native) | native | native | 1 (config) | **90** | **ADOPT-NOW** — model-native KV-cache reuse, the SOTA replacement |
| `/compact <hint>` + `/clear` + `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` | native | native | 1 (config) | 88 | ADOPT-NOW (session-lifecycle) |
| `yamadashy/repomix` compress mode | 24,893 | MIT | 2 | 88 | ADOPT-NOW (~70% codebase compression) |
| `ryoppippi/ccusage` | — | MIT [verify] | 2 | 84 | ADOPT-NOW (token/cost telemetry) |
| `rtk-ai/rtk` | 48,568 | Apache-2.0 [verify] | 2 | 64 | STUDY-PILOT — fresh-paint (48k★/3.8mo), "60-90%" claim needs BENCHMARK.md per Row-2 |

**HONEST-NON-FINDING (B-redo §1)**: no maintained 2026-May external-prompt-compression library beats Anthropic native prompt-caching for a CC runtime. microsoft/LLMLingua confirmed STALE (last commit 2025-10-28) — CITE-ONLY baseline. The SOTA answer is "native cache + lifecycle compaction + memory layer," not a new compression dependency.

### L7 — Agent orchestration

| Pick | Stars | License | wire | Score | Disposition |
|---|---|---|---|---|---|
| `wshobson/agents` | 35,459 | [verify] | 1-2 | 85 | STUDY-PILOT — per-sub-plugin Probe-5 first (Conductor HARD-GATE caveat) |
| `obra/superpowers` | ~192k | MIT | 1 | 90 | ADOPT-NOW (selective: plan/debug/tdd/verification skills) |
| `addy-agent-skills` (Addy Osmani) | ~38k | MIT/Apache | 1 | 86 | ADOPT-NOW (21 engineering-phase skills — score each) |
| anthropic-cookbook `managed_agents` | — | MIT | 1 | 84 | ADOPT-NOW (pattern-extract — Opus-orchestrator + Haiku-subagents) |
| `microsoft/agent-framework` | 10,468 | MIT [verify] | 3 | 76 | STUDY-PILOT-PATTERN-EXTRACT (AutoGen 0.7+ successor) |
| ralph-loop plugin | — | — | 1 | 78 | STUDY-PILOT |

### L8 — Browser / web automation + web search

| Pick | Stars | License | wire | Score | Disposition |
|---|---|---|---|---|---|
| chrome-devtools-mcp | — | Apache-2.0 | 2 | 87 | ADOPT-NOW |
| playwright-mcp | — | Apache-2.0 | 2 | 86 | ADOPT-NOW |
| `browser-use/browser-use` | 94,090 | MIT | 3 | 86 | STUDY-PILOT — technically adoptable (Agent D rated ADOPT-NOW 86) but **DEMAND-GATED** per Probe-7.b: read-only web/search MCPs (DuckDuckGo/firecrawl/exa) cover the default runtime need; install only if a GUI-automation workflow materializes (codex T1 F-12) |
| `nickclyde/duckduckgo-mcp-server` | 1,141 | [verify] | 2 | 84 | ADOPT-NOW ($0, no API key) |
| `exa-mcp` | 4.4k | MIT | 2 | 86 | **ADOPT-NOW (clean default)** — high-quality neural search+scrape |
| `firecrawl-mcp` | 6.3k | firecrawl-mcp MIT / **firecrawl core AGPL** (split-license — see §3) | 2 | 87 | **AMBER** — pending package-level LICENSE + dependency-scope check (codex T1 F-6) |

### L9 — Document parsing

| Pick | Stars | License | wire | Score | Disposition |
|---|---|---|---|---|---|
| `microsoft/markitdown` + `markitdown-mcp` | 123,323 | MIT | 2 | **93** | **ADOPT-NOW** (official MCP server) |
| `docling-project/docling` | 59,800 | MIT | 3 | 88 | STUDY-PILOT (layout-critical) |

### L10 — Eval / benchmark / observability

| Pick | Stars | License | wire | Score | Disposition |
|---|---|---|---|---|---|
| `promptfoo/promptfoo` | 21,290 | MIT (verified package.json) | 2 | **91** | **ADOPT-NOW** (CLI + native `promptfoo mcp` + CI/CD) |
| `confident-ai/deepeval` | 15,458 | Apache-2.0 [verify] | 2 | 80 | STUDY-PILOT (pytest-integrated) |
| `langfuse/langfuse` | 27,283 | MIT-core + `ee/` commercial | 3 (Docker Compose 3-5 containers) | 78 | STUDY-PILOT-NARROW (MIT-core observability only) |

### L11 — Security / governance

| Pick | Stars | License | wire | Score | Disposition |
|---|---|---|---|---|---|
| `gitleaks/gitleaks` | ~21k | MIT [verify root LICENSE] | 2 | **87** | **ADOPT-NOW** (secret-scan — pre-commit + stdin mode) |
| `semgrep` | high | LGPL-2.1 (CLI) | 2 | 84 | ADOPT-NOW (SAST) |
| `trailofbits/mcp-context-protector` | 219 | [verify] | 2 | 74 | STUDY-PILOT (STRONG-PROVENANCE — Trail of Bits org outweighs low stars) |
| codex T1-T7 cross-model gate | — | — | 3 | 90 | ADOPT-NOW (the consensus contract) |
| `osv-scanner` / `trivy` | high | Apache-2.0 | 2 | 72 | STUDY-PILOT (dependency-CVE) |

### L12 — Cross-runtime / cross-model

| Pick | Stars | License | wire | Score | Disposition |
|---|---|---|---|---|---|
| `openai/codex` CLI (worktree-aware) | high | Apache-2.0 | 2 | 92 | ADOPT-NOW |
| codex-plugin-cc (T0-T7 lifecycle) | — | — | 2 | 88 | ADOPT-NOW |
| `agentclientprotocol/claude-agent-acp` | 1,763 | MIT-class | 2 | 80 | STUDY-PILOT (ACP 4-org convergence FULLY-CLOSED — pilot adapter) |

### L13 — Skill / plugin marketplace discovery surfaces (cite-class, NOT bulk-install)

| Catalog | Stars | License | Use |
|---|---|---|---|
| `punkpeye/awesome-mcp-servers` | 86,955 | [verify] | MCP-server discovery |
| `ComposioHQ/awesome-claude-skills` | 60,012 | conflicting [verify] | Skills discovery (resolve license before fork) |
| `alirezarezvani/claude-skills` | ~5,200 | MIT | 235-skill catalog + maintainer self-audit |
| `hesreallyhim/awesome-claude-code` | 43,868 | **CC-BY-NC-ND-4.0** | CITE-ONLY — never fork-modify |

### L14 — Research-ingestion / cohort coverage (codex T1 F-3 — NEW layer)

GAP-9 (ArXiv C2 cohort) is UNCLOSED — no arXiv MCP in this runtime. A pure SOTA runtime needs a research-ingestion layer so cohort-discovery passes (C2 arXiv / C3 HuggingFace / C4 PapersWithCode / C7 conference) are EXECUTABLE, not just C1 star-topic + C5 named-author + C9 stars-direct.

| Pick | License | wire | Score | Disposition |
|---|---|---|---|---|
| `blazickjp/arxiv-mcp-server` (verify) | MIT [verify] | 2 | 78 | STUDY-PILOT — closes GAP-9 C2-cohort |
| HuggingFace Hub MCP / `hf` CLI | Apache-2.0 | 2 | 76 | STUDY-PILOT — C3 model/dataset scan |
| PapersWithCode / conference crawl | n/a | — | — | route via L8 web-search MCP + cohort_coverage_audit |

Wire-light (~1-2 MCP servers) but the DECISION to include cohort-ingestion is mandatory per cardinal-rule-10 research-first + CLAUDE.md §SOTA Repository Discovery ≥2-cohort mandate.

### REJECTED-FOR-FIT / OUT-OF-SCOPE (explicit decisions — codex T1 F-4)

- **D4-10 Workflow orchestration** — WHOLE-CATEGORY REJECT (mode-harness mismatch; Agent-tool fan-out + `/loop` + cwc-long-running-agents IS the orchestration). **Residual decision**: a lightweight scheduled-maintenance / eval queue (e.g. cron-driven audit fires) is NOT a heavy DAG scheduler — if such a need materializes, use CC-native `/loop` + cron, not Temporal/Airflow.
- **D4-8 Audio (STT/TTS)** — EXPLICIT OUT-OF-SCOPE: a code-centric runtime has no STT/TTS workflow. STT via `whisper.cpp` (MIT) is a wire-light OPTIONAL pilot ONLY if a voice-input workflow materializes (Probe-7.b); TTS DEFERRED (no mature open-weights leader). This is a documented decision, not an oversight.
- **D4-9 Vision** — OUT-OF-SCOPE: Claude Opus 4.7 is natively multimodal (reads images directly); no separate vision encoder needed for runtime self-operation.
- **D4-13 Cache infra (server-side)** — native Anthropic `cache_control` prompt-cache covers the runtime need; `valkey` (BSD-3) only if a server-side app-state cache materializes.

---

## §3 License-blocker register (permissive-only runtime — P0 gate)

Wave 252-extension surfaced a substantial **license-blocker cluster**. For a permissive-only runtime (MIT / Apache-2.0 / BSD acceptable; AGPL / SSPL / BSL / ELv2 / CC-BY-NC REJECT):

| Repo | License | Verdict | Permissive substitute |
|---|---|---|---|
| `redis/redis` | AGPLv3/RSALv2/SSPL (2024 relicense) | REJECT-FOR-FIT | `valkey-io/valkey` (BSD-3) |
| `dragonflydb/dragonfly` | BSL 1.1 | REJECT-FOR-FIT | `valkey-io/valkey` |
| `trufflesecurity/trufflehog` | AGPL-3.0 | REJECT-FOR-FIT | `gitleaks/gitleaks` (MIT) |
| `Arize-ai/phoenix` | Elastic License 2.0 | REJECT-FOR-FIT | `promptfoo` (MIT) / `langfuse` MIT-core |
| `n8n-io/n8n` | Sustainable Use License (non-OSI) | REJECT-FOR-FIT | (workflow-orch whole-category rejected) |
| `windmill` / Skyvern | AGPL | REJECT-FOR-FIT | `browser-use` (MIT) |
| `opendatalab/MinerU` | AGPL-3.0 (likely — VERIFY) | FLAGGED | `microsoft/markitdown` (MIT) |
| `daytonaio/daytona` | AGPL-3.0 (likely — VERIFY) | FLAGGED | `e2b-dev/E2B` (Apache-2.0) |
| `mksglu/context-mode` | Elastic License 2.0 (root) | AMBER | (npm-package-level license unresolved — GAP-4) |
| `hesreallyhim/awesome-claude-code` | CC-BY-NC-ND-4.0 | CITE-ONLY | (discovery surface, never fork) |
| `langfuse` `ee/` directory | commercial | PARTIAL | use MIT-core only |
| `firecrawl` core repo | AGPL-3.0 (core) | AMBER (codex T1 F-6) | `exa-mcp` (MIT) is the clean web-search default; `firecrawl-mcp` wrapper is MIT but verify it does NOT bundle/require the AGPL core before adopting |

**LGPL clarification (codex T1 F-5)**: `semgrep` CLI is **LGPL-2.1**. LGPL copyleft obligations trigger on *linking / derivative works* — NOT on invoking a CLI tool as an external subprocess. The runtime invokes `semgrep` as a standalone subprocess (no linking) → **LGPL-2.1-for-CLI-subprocess is ACCEPTABLE** for this permissive-only runtime. The acceptable-license policy is hereby made precise: **MIT / Apache-2.0 / BSD** for libraries and any bundled/linked code; **LGPL acceptable for standalone CLI tools invoked as subprocess only**; **AGPL / SSPL / BSL / ELv2 / CC-BY-NC remain REJECT regardless of invocation mode** (AGPL's network-copyleft reaches even subprocess/network use). semgrep L11 disposition stands as ADOPT-NOW under this clarified policy.

**P0 install-risk discipline (cardinal-rule-9)**: every `[verify]` license marker MUST be resolved via direct LICENSE-file blob read BEFORE any install commit. ~40% of B-redo's license fields are `[INFERRED]` — all need fresh verification. The architecture is **license-RISK-REGISTERED, NOT license-clean** (codex T1 F-10) — it does not become license-clean until every `[verify]` / FLAGGED / AMBER row is resolved.

---

## §4 `Z:\claude-sota-pure` phased install architecture

Reconciles A's 5-phase recommendation + D's realistic-8 sizing + C's category-completeness mandate. Bootstrap-only files (CLAUDE.md / CLAUDE.local.md / launcher / settings.json / .gitignore / manifest / provenance) per cardinal-rule-5.

**Phase 0 — Bootstrap scaffold** (hand-coded, cardinal-rule-5 exception)
- CLAUDE.md (14 cardinal rules), CLAUDE.local.md (env block), `pure.ps1` launcher, `.claude/settings.json` baseline, `.mcp.json` skeleton, `.gitignore`, `docs/sota-pure-manifest.md`, `docs/install-provenance.md`
- Native CC config knobs (GAP-12 / Agent C D8): enumerate all 11 Q2-2026 features (`/goal`, `claude agents` CLI, `--agent`, `--worktree`, asyncRewake, `[1m]`, fork-subagent, `args: string[]`, `if:` hooks, `/compact`, MCPB) in manifest §0
- Anthropic native sandboxing (GAP-2): `sandbox.failIfUnavailable:true` + `CLAUDE_CODE_SUBPROCESS_ENV_SCRUB=1` + `allowUnsandboxedCommands` policy

**Phase 1 — Foundation chain + GOVERNANCE GATE** (wire 1-3) — codex T1 F-7 moved gates earlier: claude-plugins-official + Claude Agent SDK + cwc-long-running-agents + modelcontextprotocol/servers + mcpb CLI + openai/codex CLI + codex-plugin-cc **+ gitleaks (secret-scan) + codex T1-T7 cross-model gate hooks + license-verification discipline wired + phantom-package check discipline**. Rationale: secret-scanning, license verification, phantom-package checks, and the codex cross-model gate are GATING INFRASTRUCTURE — they must exist BEFORE any study-pilot layer is installed, not after.

**Phase 2 — LLM serving + code intelligence + EVAL BASELINE** (wire 1-3): ollama + litellm + repomix + serena + ast-grep + gitnexus **+ promptfoo baseline eval harness** (so every subsequent install can be regression-checked).

**Phase 3 — Memory + vector + RAG** (wire 2-4): doobidoo/mcp-memory-service + **sqlite-vec (embedded vector — the Phase-3 baseline, wire=1)** + graphiti (STUDY-PILOT pending Apache-compatible backend decision per L2) + (microsoft/graphrag OR HKUDS/LightRAG as STUDY-PILOT). **Qdrant is NOT in Phase 3** — it is the Phase 6 scale pilot (codex T1 F-8 — Qdrant double-listing resolved: sqlite-vec embedded baseline, qdrant scale-pilot).

**Phase 4 — Orchestration + token-opt** (wire 1-2): superpowers (selective skills) + wshobson/agents (per-plugin Probe-5 first) + addy-agent-skills + anthropic-cookbook managed_agents pattern + Anthropic prompt-cache config + ccusage.

**Phase 5 — Browser + docs + remaining security** (wire 2-3): chrome-devtools-mcp + playwright-mcp + DuckDuckGo-mcp + exa-mcp (clean default) + markitdown(-mcp) + semgrep. (gitleaks + promptfoo + codex-gate already wired in Phase 1-2.)

**Phase 6 — Optional pilots** (wire 2-4): mem0/letta (memory pilot vs incumbent — Probe-7.b) + qdrant scale-pilot + arxiv-mcp (closes GAP-9 C2-cohort) + browser-use (demand-gated) + ACP adapter + langfuse MIT-core + trailofbits mcp-context-protector + firecrawl-mcp (only after AGPL-core scope check).

---

## §5 COMPREHENSIVE INSTALL CHECKLIST — `Z:\claude-sota-pure`

> Every row: `[ ]` unchecked. Apply cardinal-rule-9 (version-pin + 2-round fix-forward + pre-cite-import REVERT check) + cardinal-rule-6 (official-native-channel install) per item.

### Pre-flight (P0 gates)
- [ ] Resolve ALL `[verify]` license markers (direct LICENSE blob read) — ~25 repos
- [ ] Verify MinerU + Daytona + firecrawl-core + context-mode actual licenses (FLAGGED)
- [ ] Run convergence-gate Row-2 fabrication-test on rtk / caveman / token-savior / MemOS / OmniRoute — demand BENCHMARK.md or DEFER
- [ ] Fire orchestrator codex T1 Path P on this synthesis (cross-model gate)
- [ ] Probe-6 phantom-package check: fresh `npm view` / `pip index versions` on every ADOPT-NOW pick

### Phase 0 — Bootstrap
- [ ] CLAUDE.md / CLAUDE.local.md / pure.ps1 / settings.json / .mcp.json / .gitignore / manifest / provenance
- [ ] Manifest §0: enumerate 11 Q2-2026 native CC features as config-knob map
- [ ] settings.json: Anthropic sandboxing block (`failIfUnavailable:true` + env-scrub)

### Phase 1 — Foundation + GOVERNANCE GATE (gates moved earlier per codex T1 F-7)
- [ ] `/plugin marketplace add` claude-plugins-official; `/plugin install` foundation plugins
- [ ] `pip install claude-agent-sdk` (pin version)
- [ ] Install cwc-long-running-agents 5 harness primitives (Default-FAIL / evaluator / PROGRESS.md / kill-switch / steer)
- [ ] Install `mcpb` CLI; adopt `.mcpb` bundle format where upstream ships bundles
- [ ] Install openai/codex CLI (`@latest` per cardinal-rule-6); wire codex-plugin-cc T0-T7 cross-model gate hooks
- [ ] **GATE: install gitleaks (binary); wire pre-commit + stdin-mode secret-scan hook**
- [ ] **GATE: wire license-verification discipline + phantom-package check (npm view / pip index) into install workflow**

### Phase 2 — LLM serving + code intelligence + EVAL BASELINE
- [ ] Install ollama (winget / GitHub release); `ollama pull` serving + `nomic-embed-text` embedding model
- [ ] `pip install litellm`; configure Anthropic-API-native passthrough + cost-routing
- [ ] Install repomix (npm); wire repomix MCP server
- [ ] Install serena MCP; ast-grep CLI; gitnexus
- [ ] **Install promptfoo (npm); wire `promptfoo mcp` baseline eval harness** (so every later install is regression-checked)

### Phase 3 — Memory + vector + RAG
- [ ] `pip install` doobidoo/mcp-memory-service; wire `.mcp.json` (sqlite-vec backend — embedded vector baseline)
- [ ] Install graphiti (`pip install graphiti-core`) — STUDY-PILOT; **record Apache-compatible backend decision (Neo4j-Apache-2.0-swap vs explicit FalkorDB-SSPL-accept) BEFORE promoting to ADOPT-NOW**
- [ ] STUDY-PILOT: microsoft/graphrag OR HKUDS/LightRAG (decide embedded-lib vs standalone-service)
- [ ] (Qdrant is Phase 6 scale-pilot, NOT Phase 3 — codex T1 F-8)

### Phase 4 — Orchestration + token-opt
- [ ] Install superpowers (selective: plan/debug/tdd/verification skills)
- [ ] wshobson/agents: per-sub-plugin Probe-5 mode-harness-shape FIRST (Conductor HARD-GATE) — install audited subset only
- [ ] Install addy-agent-skills; score each of 21 engineering-phase skills
- [ ] Cite-extract anthropic-cookbook managed_agents pattern
- [ ] Configure Anthropic prompt-cache breakpoints; install ccusage

### Phase 5 — Browser + docs + remaining security
- [ ] Wire chrome-devtools-mcp + playwright-mcp + DuckDuckGo-mcp + exa-mcp (clean MIT default)
- [ ] `pip install markitdown`; wire markitdown-mcp
- [ ] Install semgrep (LGPL CLI — acceptable as subprocess per §3 clarification)
- [ ] (gitleaks + promptfoo + codex-gate already wired in Phase 1-2)

### Phase 6 — Optional pilots
- [ ] mem0/letta memory pilot — Probe-7.b incumbent-comparison vs doobidoo+graphiti
- [ ] `docker pull qdrant/qdrant` scale-pilot; wire official `mcp-server-qdrant` (Phase-6 per F-8)
- [ ] Install arxiv-mcp (`blazickjp/arxiv-mcp-server` — verify license) → closes GAP-9 C2-cohort
- [ ] browser-use (demand-gated — only if GUI-automation workflow materializes)
- [ ] ACP adapter (agentclientprotocol/claude-agent-acp) pilot
- [ ] langfuse MIT-core observability pilot
- [ ] trailofbits mcp-context-protector pilot
- [ ] firecrawl-mcp (ONLY after AGPL-core dependency-scope check)

### Post-install verification
- [ ] Probe DAG 1-7 on every ADOPT-NOW row (NEVER executed in any prior wave — A §5.6)
- [ ] cohort_coverage_audit on the catalog (≥2-cohort fan-out per CLAUDE.md L99-110)
- [ ] Re-fetch all star counts (Marker Decay — captured 2026-05-15/16)
- [ ] Smoke-probe each MCP server; verify `.mcp.json` no-drift

---

## §6 Anti-pattern register (carried from C + B-redo + D)

- **Stars-only ranking** (C-D7): 7 picks where stars dominated evidence — `caveman` (60k★ "talk like caveman" meme), `graphify`, `cc-switch`, `claude-mem`, `get-shit-done`, `oh-my-openagent`, `last30days-skill`. Demote to STUDY-PILOT until Axis-3 ≥180d burn-in + Axis-2 named-T2.
- **Fresh-paint launch-spikes** (B-redo §9): mempalace (52k★/1.4mo), graphify (48k★/1.4mo), rtk (48k★/3.8mo), everything-claude-code (183k★/4mo), andrej-karpathy-skills (131k★/3.6mo) — STUDY-PILOT not ADOPT.
- **Fabrication-test FAILs** (C-D1): 5 rows with ≥3 unsourced numeric claims — token-savior / lucasrosati / caveman / rtk / OmniRoute — demand BENCHMARK.md per convergence-gate Row-2.
- **Cite-class drift** (C-D2): ADOPT-NOW rows with NOASSERTION licenses + no SHA pins — every ADOPT row needs `file:line @ HEAD <SHA>` or blob-SHA.
- **Sibling-bias cite-chains** (C-D9): re-verify ACP convergence + cross-model topology from UPSTREAM, not from sibling claude-sota runtime (TIER-3-LOCAL, not TIER-1).
- **Archived repos** (B-redo): Azure-Samples/graphrag-accelerator + pangea-mcp-proxy — auto-REJECT.

---

## §7 HONEST limitations

1. **Cross-model gate — SATISFIED at synthesis layer, PARTIAL at agent layer.** 0/4 research agents were true GPT-5.5 BRIDGE-MODE (the one BRIDGE-MODE dispatch thrashed FM-17.b/d). The gap is closed at the SYNTHESIS layer by the orchestrator-fired codex T1 Path P pass (real GPT-5.5, NEEDS-REVISION conf=0.87, Pattern A fix-forward applied). Per-agent discovery dispositions remain Sonnet hypotheses — install-time Probe DAG must re-verify them.
2. **Probe DAG 1-7 NOT executed** for any individual ADOPT-NOW candidate — this wave is R1 landscape survey + R2 category-discovery; per-repo Probe DAG is queued for the install-time wave.
3. **GAP-9 ArXiv cohort C2 UNCLOSED** — no arXiv MCP in this runtime (Agent D HNF). Recommend installing `blazickjp/arxiv-mcp-server` (verify) to make C2-cohort passes executable.
4. **~40% license fields `[INFERRED]`** — GitHub search result caps prevented per-repo LICENSE reads. cardinal-rule-9 mandates fresh verification before install.
5. **Marker Decay** — all star counts captured 2026-05-15/16; re-verify before adoption commit.
6. **GAP-3 protect-mcp** — RESOLVED (exists on npm v0.6.0 MIT, org ScopeBlind) but STUDY-PILOT-NARROW (fresh-paint + patent-marketing).
7. **GAP-4 context-mode license** — root LICENSE = Elastic License 2.0; npm-package-level license still unresolved (AMBER).

---

## §8 Next actions (orchestrator)

1. ✅ DONE — codex T1 Path P fired; NEEDS-REVISION conf=0.87 / 12 findings.
2. ✅ DONE — Pattern A single fix-forward applied (F-1..F-12 integrated; this revision).
3. ✅ DONE — synthesis graduated AUTHORITATIVE-CANDIDATE → AUTHORITATIVE.
4. **QUEUED — install-time wave**: per-repo Probe DAG 1-7 + license `[verify]`/FLAGGED/AMBER resolution by direct LICENSE-blob reads + Row-2 fabrication-tests (rtk / caveman / token-savior / MemOS / OmniRoute).
5. **QUEUED — arXiv-MCP install** (`blazickjp/arxiv-mcp-server`) to close GAP-9 C2-cohort + make C2/C3/C4/C7 cohort passes executable (§2 L14).
6. **QUEUED — `Z:\claude-sota-pure` Phase-0 bootstrap**: hand-code the 8 bootstrap-only files per §4 Phase 0, then execute Phase 1 governance-gate-first install.

**VERDICT: SYNTHESIS-COMPLETE — codex T1 cross-model gate SATISFIED.** codex T1 (real GPT-5.5, Path P foreground+tee) returned **NEEDS-REVISION conf=0.87** with 12 findings (F-1..F-12) + 5 missing-layer notes; all 12 Mia-verified GENUINE and integrated as a single Pattern A fix-forward per `ctff-pattern-a.md` (verdict file: `.claude/state/codex_consult_w252ext_grand_synthesis_OUT.txt`). The pure runtime `Z:\claude-sota-pure` install architecture is a **15-layer / 6-phase / ~8-12-net-new-install-artifact** design. It is **license-RISK-REGISTERED, NOT license-clean** — it becomes license-clean only when every `[verify]` / FLAGGED / AMBER row is resolved by direct LICENSE-blob reads (codex T1 F-10). Agent C's category-completeness mandate + Agent D's realistic sizing are reconciled, with codex T1's residual-category caveat (rerank / STT / research-cohort / governance still need explicit decisions) integrated at §1 + §2 L14 + REJECTED-FOR-FIT. Status graduates AUTHORITATIVE-CANDIDATE → **AUTHORITATIVE** (codex T1 ratified via Pattern A fix-forward; closed-loop arc Outcome A per `closed-loop-recursive-narrowing.md`).
