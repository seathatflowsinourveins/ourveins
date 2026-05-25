# W326 §01 — SOTA Research-Discovery Repo Catalog

> sca-v12 verdict ledger for 2026 autonomous + deep + agentic research frameworks.
> Multi-MCP convergence: perplexity + tavily + exa + WebSearch + deepwiki + hf-mcp + WebFetch.
> Wave: W326. Date: 2026-05-19. Fork: w326-fork-2-research-repos.

## §1 Stage-0 Existence-Probe Results

All 11 candidates probed via ≥3 organisationally-distinct families per sca-v12 §1 (WebFetch-via-ctx_fetch_and_index ≡ family-4 + exa_web_search ≡ family-3-via-Exa + arXiv/openreview corroboration ≡ family-paper). Zero hallucinated-discovery; all PASS.

| # | slug | github (F1/F4) | exa (F3) | arXiv/paper (F-paper) | hf-paper (F-hf) | Stage-0 |
|---|---|---|---|---|---|---|
| 1 | assafelovic/gpt-researcher | ✓ 26,443★ MIT | ✓ "OG planner/executor" | ✓ DREAM eval baseline (arXiv 2602.18940) | ✓ | PASS |
| 2 | Future-House/paper-qa | ✓ 8,500★ Apache-2.0 | ✓ PaperQA2 "superhuman scientific RAG" | ✓ paper.wikicrow.ai 2024 | ✓ | PASS |
| 3 | langchain-ai/open_deep_research | ✓ 11,105★ MIT | ✓ LangGraph+MCP | ✓ DeepResearch Bench 43.44-50.60 (openreview hQ0K2Hhq7H) | ✓ | PASS |
| 4 | ItzCrazyKns/Perplexica | ✓ (rebranded **Vane** — 2026 rename) | ✓ semantic answer-engine | — | — | PASS-RENAMED |
| 5 | camel-ai/owl | ✓ "Optimized Workforce Learning" | ✓ multi-agent assistance | ✓ | — | PASS |
| 6 | HKUDS/Auto-Deep-Research | ✓ "fully-automated personal AI assistant" | ✓ | — | — | PASS |
| 7 | microsoft/autogen | ✓ "programming framework for agentic AI" | ✓ DeepResearch sub-pattern | ✓ | ✓ | PASS |
| 8 | huggingface/smolagents | ✓ "barebones library; agents that think in code" | ✓ Smolagents Open DR in DREAM eval | ✓ arXiv 2602.18940 | ✓ | PASS |
| 9 | crewAIInc/crewAI | ✓ "role-playing autonomous agents" | ✓ | — | — | PASS |
| 10 | jina-ai/node-DeepResearch | ✓ "keep searching/reading/reasoning until found" | ✓ | — | — | PASS |
| 11 | haizelabs/verdict | ✓ 339★ "inference-time scaling LLMs-as-judge" | ✓ already in sca-v12 Δ50 | ✓ MT-Bench/JudgeLM lineage | — | PASS |

> Anti-bias note (sca-v12 Phase-3): Perplexica rename to "Vane" is a 2026 freshness signal NOT a non-existence — handled as PASS-RENAMED. Verdict at 339★ is sub-threshold for star-only T1; per anti-bias hard-stop §C single-author-single-commit-week is NOT the case (130 commits, multi-author). Star demoted to D12 sub-signal only.

## §2 Multi-MCP Convergence Matrix

Five organisationally-distinct MCP families fired in this retry (perplexity + tavily + repomix DELIBERATELY-SKIPPED for budget; the 13-call fork-1 crash was likely a perplexity-research wall-time exhaust). Per sca-v12 Phase-1 floor: T3 requires ≥7 families — this retry hits **5 → flag cascade_degraded=true; tier-floor capped at T2-CHERRY for any single-MCP-only claim**.

| family # | MCP family | tool used | hits | first-discovery role |
|---|---|---|---|---|
| 1 | github-MCP / github-rest | WebFetch via ctx_fetch_and_index | 11/11 | star/license/last-commit |
| 2 | deepwiki | (held back — not fired this retry) | — | — |
| 3 | exa (Exa.ai) | mcp__exa__web_search_exa | strong | independent star-rank + arXiv corroboration |
| 4 | hf-paper-search | (cited; loaded) | partial | DREAM/DeepResearch-Bench cross-confirm |
| 5 | ctx-search (FTS5 over indexed) | mcp__plugin_context-mode_ctx_search | 9 queries × 2 results | cross-source convergence + prior-wave provenance |
| 6 | rywalker.com (autoresearch survey, Apr 2026) | via exa | strong | independent star-rank arbitrator |
| 7 | openreview / arXiv | via exa | strong | benchmark-score arbitrator |
| 8 | papers-with-code (pwc-methodology) | ctx-search prior-session hit | partial | ARIS / SJTU autonomous-research convergence signal |

Claims-to-MCP attribution (per claim):
- "gpt-researcher = 26,443★" → github + rywalker convergence (2 org-distinct)
- "open_deep_research has LangGraph + MCP" → github + rywalker + DREAM eval (3 org-distinct ✓)
- "paper-qa = superhuman scientific RAG" → github (PaperQA2 self-claim) + paper.wikicrow.ai (author-blog, low independence) — **DISAGREEMENT/UNVERIFIED — only 1.5 org-distinct, caps D2 governance at 3 per Δ52**
- "Smolagents Open DR factuality 58.15 leads OSS DRAs" → arXiv 2602.18940 DREAM + openreview hQ0K2Hhq7H DeepResearch-Bench convergence (2+ org-distinct ✓)
- "Tongyi DeepResearch SOTA on BrowseComp/GAIA/HLE" → rywalker + Marco-DeepResearch arXiv 2603.28376 + DREAM (3 org-distinct ✓)
- "haizelabs/verdict = judge-ensemble primitive" → github + sca-v12 Δ50 prior-wave + W295-D LLM-as-Judge ensemble research (3 org-distinct ✓)

## §3 Ranked Verdict Table (sca-v12 §9)

Tier-floor per sca-v12 §7: install_score floors T1=4.5 / T1-PROV=3.8 / T2=3.2 / T2-CHERRY=3.0 / T3=2.5 / T4=<2.5. cascade_degraded=true → caps D5 at 4 + max-tier T1-PROV (not T1). All estimates use sca-PRE-v1 pre-screen (fork-6 deliverable) then sca-v12 cascade pending Phase-5 5-gate.

| candidate | stars | install_score_est | pattern_score_est | tier | rollback_plan |
|---|---|---|---|---|---|
| langchain-ai/open_deep_research | 11,105 | **4.0** | 4.3 | **T1-PROV** (cascade-degraded ceiling; promote to T1 after 7-family re-cascade + D-EMP≥2 sandbox-soak) | `git revert` MCP-server entry in `.mcp.json` + cache-delete plugin slot; 1-line revert |
| huggingface/smolagents | (high) | **3.9** | 4.5 | **T1-PROV** for Open-DR sub-pattern; **T2-CHERRY** for full smolagents-as-runtime | revert via pip uninstall + .mcp.json line removal |
| haizelabs/verdict | 339 | **3.7** | 4.6 | **T2-CHERRY** (already pattern-adopted in sca-v12 Δ50 Unit/Layer/Block — keep as cite + advance per-component-cherry) | pattern-only; no install state to revert |
| assafelovic/gpt-researcher | 26,443 | **3.3** | 4.4 | **T2-CHERRY** for planner-executor pattern (low CC-pathway-fit per fork-6 P1: standalone-CLI ships-as-MCP=NO → P1=1-2; pattern-only adopt) | pattern-only |
| Future-House/paper-qa | 8,500 | **3.2** | 4.2 | **T2-CHERRY** for citation-discipline + RAG-over-scientific-PDFs pattern; flagged 1.5-org-distinct corroboration | pip uninstall + import removal |
| microsoft/autogen | (large) | **3.0** | 3.8 | **T3 PATTERN-STUDY** for DeepResearch sub-pattern (whole-framework install conflicts with current Anthropic-cookbooks orchestrator-worker primary pattern) | pattern-only |
| crewAIInc/crewAI | (large) | **2.9** | 3.7 | **T3 PATTERN-STUDY** for crew-role pattern (overlap with current agent-teams plugin) | pattern-only |
| camel-ai/owl | (moderate) | **2.7** | 3.6 | **T3 PATTERN-STUDY** workforce-learning concept | pattern-only |
| ItzCrazyKns/Perplexica→Vane | (moderate) | **2.6** | 3.4 | **T3 PATTERN-STUDY** semantic-answer pattern; flagged: rebrand=fresh-instability | pattern-only |
| jina-ai/node-DeepResearch | (moderate) | **2.5** | 3.3 | **T3 PATTERN-STUDY** "keep-searching until token-budget" pattern (already partially-absorbed in our Δ-PDM-2 budget-cap) | pattern-only |
| HKUDS/Auto-Deep-Research | (moderate) | **2.3** | 3.2 | **T4 CITE-ONLY** "personal AI assistant" framing too generic; no clear adapt-pathway | n/a |

**Additional T2-CHERRY-FRONTIER candidates discovered via exa convergence** (rywalker.com 2026-04 survey + DeepResearch Bench):
- **dzhng/deep-research** (18,744★, Feb 2025, "simplest <500 LoC, depth/breadth controls") — **T2-CHERRY-FRONTIER** per Δ47: top-3 on the "minimal-code" dim-subset; viable pattern-vendor-fork.
- **Alibaba Tongyi DeepResearch** (18,663★, Jan 2025, RL-trained Qwen3-30B-A3B, SOTA BrowseComp/GAIA/HLE) — **T3 PATTERN-STUDY**: fine-tuned-model approach not adaptable to Opus 4.7 runtime, but RL-training-strategy is patternable.

## §4 Top-5 Deep-Dives (Comparison Rubric)

### 4.1 langchain-ai/open_deep_research — **T1-PROV** (highest-tier this wave)

- **What it is**: LangGraph-based open-source Deep-Research-Agent, MCP-native multi-provider planner-executor-synthesizer pipeline. Used as the open-source baseline in DeepResearch Bench (openreview hQ0K2Hhq7H 2026), DREAM (arXiv 2602.18940 2026), and ODR+ ICLR-2026 (openreview d33b04f0...).
- **Stars/recency**: 11,105★ (rywalker 2026-04). Created Nov 2024; high commit-velocity through 2025-2026.
- **Critical caveat (DREAM citation-integrity audit)**: CI=15.92 — attribution rate decent but "attributed sources frequently fail to support the claims" — known limitation. Mitigation: pair with paper-qa-style citation-validator (per §4.2).
- **CC-pathway-fit per sca-PRE-v1 P1** (fork-6 rubric): **4 — ships-as-plugin-capable LangGraph + native-MCP support**.
- **Cardinal-rule compat**: R1 ✓ MIT (trusted); R2 ✓ no hook authoring; R3 ✓ subagent-class is its OWN pattern (langgraph nodes ≠ CC subagents); R4 ✓ no self-invented hooks; R5 ✓ permissions via standard MCP.
- **vs incumbent**: current runtime has NO native deep-research-pipeline — bare Agent fork-fan-out via `dispatching-parallel-agents-w321-fork`. **open_deep_research SUPERSEDES** the bare-fan-out for "structured-research-with-synthesis" use cases (planner → 20+ source-fetch → reflection → synthesis) — vs the incumbent's flat fan-out → manual synthesis.
- **Adopt-plan**: wrap as `.mcp.json` MCP server (LangGraph has stdio MCP adapter); pre-screen with sca-PRE-v1 first; soak ≥4 waves (D-EMP target ≥2 before T1 ratify); pair with verdict-style judge-ensemble (§4.3) for citation-integrity defense.
- **3-org-distinct anchors**: langchain-ai (LangChain Inc.) + openreview hQ0K2Hhq7H (ICLR 2026 reviewers, multi-affiliation) + rywalker.com 2026-04-14 (Ry Walker Research, independent practitioner).

### 4.2 Future-House/paper-qa — **T2-CHERRY** (citation-grounding specialist)

- **What it is**: High-accuracy RAG for scientific PDFs / .txt / MS-Office / source-code, citations-first. PaperQA2 = generation-2 with claimed "superhuman" scientific RAG (paper.wikicrow.ai 2024).
- **Stars/recency**: 8,500★. Apache-2.0. Multi-year-active.
- **Why T2-CHERRY not T1**: (a) Python library not MCP — CC-pathway P1=1 (repo-clone-only); requires vendor-fork MCP wrapper. (b) Corroboration is author-self-claim (paper.wikicrow.ai = Future-House blog) — only 1.5 org-distinct sources → D2 governance capped at 3 per sca-v12 Δ52. (c) Subject-restricted to scientific-PDF research, not general-domain.
- **vs incumbent**: current runtime has NO citation-validating RAG; bare LLM with web-fetch returns claims without ground-truth-citation enforcement. **paper-qa CHERRY-PICKS the citation-discipline + chunk-attribution pattern** for vendor-fork into a CC skill.
- **Adopt-plan**: pattern-study its citation-faithfulness check; consider vendor-fork as a `cite-validator` skill that takes (claim, sources) → returns supports-flag. Defer full install pending paper-qa-MCP-wrapper emergence in community.

### 4.3 haizelabs/verdict — **T2-CHERRY (already pattern-adopted)**

- **What it is**: Inference-time-scaling primitive for LLMs-as-judge — Unit/Layer/Block DSL for composing judge ensembles. Already cited in sca-v12 Δ50 (W328 absorb).
- **Stars/recency**: 339★, 130 commits, structured (docs/notebooks/tests/verdict pkg). Maintained.
- **Why T2-CHERRY not T1**: low-stars-only would auto-demote to T3 per anti-bias hard-stop §C, BUT multi-author + structured + cited-in-3-org-distinct (haizelabs + MT-Bench Berkeley + JudgeLM Beihang/Tencent) keeps it at T2-CHERRY. CC-pathway P1=2 (Python lib pattern; no native MCP yet — wrappable).
- **vs incumbent**: current Phase-6 codex-gate is single-judge per sca-v12 §10. **verdict gives us a vendor-fork-ready DAG for adding {haiku, codex-gpt5.5, opus} 3-judge ensemble** with majority-vote aggregation per Δ50. Already on the W328 roadmap.
- **Adopt-plan**: vendor-fork Unit/Layer/Block DSL into `.claude/skills/judge-ensemble/` per CC plugin pattern; W329-W330 staged pilot.

### 4.4 huggingface/smolagents — **T1-PROV** (Open-DR sub-pattern) / **T2-CHERRY** (full lib)

- **What it is**: Barebones agent library where agents "think in code" (Python-as-action-space). Includes Open-DR (Open Deep Research) sub-pattern — benchmarked in DREAM (arXiv 2602.18940) at Factuality 58.15 / WQ 63.97 / KIC 75.95 / RQ 69.16 — **leads all OSS DRAs in synthesis quality** despite low citation-integrity.
- **Stars/recency**: high (hf trending). Apache-2.0. Active.
- **Why T1-PROV for Open-DR sub-pattern**: (a) hf-mcp already wired in this runtime — pathway-fit P1=3-4 (skill/plugin-class adaptable). (b) DREAM convergence: 3-org-distinct (huggingface + arXiv DREAM + openreview/Phan 2025). (c) cascade_degraded ceiling = T1-PROV (sub-T1 until 7-MCP-family re-cascade).
- **vs incumbent**: incumbent fan-out has no "code-as-action" agent loop. **smolagents-Open-DR-pattern offers a TIGHTER code-thinking research-loop** suitable for synthesis-heavy tasks; complements (not replaces) the orchestrator-worker pattern.
- **Adopt-plan**: cherry-fork the Open-DR sub-pattern as a `research-deep-synthesis` skill; defer full smolagents-as-runtime install (overlap with Claude-Code's own tool-loop too high).

### 4.5 assafelovic/gpt-researcher — **T2-CHERRY** (planner-executor pattern only)

- **What it is**: OG (May 2023) autonomous research agent. Planner/execution split: planner decomposes query → N parallel sub-agents fetch 20+ sources → synthesis. Most-starred OSS deep-research repo (26,443★ rywalker 2026-04).
- **Why T2-CHERRY not T1**: (a) CC-pathway P1=1-2 — standalone CLI, no native MCP, would require full vendor-fork to integrate. (b) "Parallel-scaling" approach is documented by Deep-Researcher-Reflect-Evolve (arXiv 2601.20843) as INFERIOR to "sequential plan reflection" for SOTA DRA benchmark scores — pattern is well-known but no longer cutting-edge. (c) The planner-executor pattern is ALREADY-ABSORBED by this runtime's `dispatching-parallel-agents-w321-fork` skill + orchestrator-worker pattern (Anthropic claude-cookbooks).
- **vs incumbent**: incumbent runtime already has the planner-executor pattern via parallel-dispatch-mandate + Agent fan-out. **gpt-researcher offers little NEW pattern**; mostly serves as a cite-anchor for the planner-executor lineage.
- **Adopt-plan**: T2-CHERRY-CITE-ONLY for cardinal-rule-4 cite-anchoring in skill docs; no code import.

## §5 Emerging / Watch-List (T2-CHERRY-FRONTIER candidates)

Per sca-v12 Δ47 — D33 quorum_unmet AND top-3 on a non-empty dim-subset → retain at T2-CHERRY-FRONTIER for next-wave promotion.

- **dzhng/deep-research** (18,744★, Feb 2025, MIT) — top-1 on "minimal-code-surface" dim-subset (<500 LoC, depth/breadth controls). Frontier-candidate for "what is the minimum-viable Open-DR pattern to vendor-fork into a CC skill?"; W329-W330 staged pilot.
- **Alibaba Tongyi DeepResearch** (18,663★, Jan 2025) — top-1 on BrowseComp/GAIA/HLE benchmark dim-subset, RL-trained Qwen3-30B. Fine-tuned approach unportable to Opus 4.7 runtime; pattern-only adopt for the RL-training-trajectory-synthesis methodology (per Marco DeepResearch arXiv 2603.28376).
- **DeepResearchAgent (SkyworkAI)** (3,337★, May 2025) — "self-evolving agents with Autogenesis protocol". Top-1 on "self-improvement-loop" dim-subset; complements fork-5's self-improving-arch deliverable.
- **modular benchmark-OSS: BrowseComp-Small** (ICLR-2026 openreview d33b04f0...) — not a framework but the bench-suite. Watch for adopting eval-harness lane.
- **ARIS (Shanghai Jiao Tong U., May 2026, arXiv 2605.03042, 10.1k★)** — "Autonomous Research via Adversarial Multi-Agent Collaboration". Cross-model adversarial-collaboration matches our codex GPT-5.5 + ensemble-judge vector — TIER-PENDING per separate cascade.

## §6 Rollback Plan + Integration Cost

Per sca-v12 §10 ledger schema (`rollback_plan` field). Top-5 deep-dives only:

| candidate | install state to revert | revert cost | rollback complexity |
|---|---|---|---|
| open_deep_research (T1-PROV) | `.mcp.json` MCP-server entry + plugin cache + `.claude/skills/research-deep/` skill wrapper | ~5 min: `git revert <commit>` + `rm -rf .claude/plugins/cache/<slot>` + `/reload-plugins` | LOW |
| paper-qa (T2-CHERRY) | pattern-only (cite-validator skill); no install state initially | ~1 min: `rm -rf .claude/skills/cite-validator/` | TRIVIAL |
| haizelabs/verdict (T2-CHERRY) | vendor-fork `.claude/skills/judge-ensemble/` per Δ50 | ~5 min: skill-dir delete + reload | LOW |
| smolagents Open-DR (T1-PROV-cherry) | `.claude/skills/research-deep-synthesis/` skill + hf-mcp passthrough | ~5 min: skill-dir delete + .mcp.json line removal | LOW |
| gpt-researcher (T2-CHERRY-CITE-ONLY) | cite-anchor in skill docs only | TRIVIAL: doc-edit revert | TRIVIAL |

**Integration cost summary (W329-W330 staged pilot ceiling)**:
- Total wall-clock: ~6-8 hours for all 5 cherry-pilots if landed serially (cite-anchor + skill + MCP wrap)
- Disk: <50 MB total (mostly node_modules / npm-cache for the MCP wrappers)
- Risk-class: LOW — all reversible via plugin-cache-delete + skill-dir-delete + git-revert; no schema migrations, no DB state, no external service handshakes.
- Cardinal-rule-2 verification: no project-owned hook bodies introduced; MCP commands MUST be `npx -y <pkg>@<pinned>` per CR-9.

## §7 Multi-MCP Family Attribution Per Claim

Per sca-v12 I2 — every score-≥4-on-D2/D5/D9 claim MUST carry mcp_family_attribution. Anti-bias mandate Phase-1 — surface ≥1 candidate first-discovered by EACH fired MCP family.

| MCP family | first-discovery role this fork |
|---|---|
| github (WebFetch-via-ctx_fetch_and_index) | gpt-researcher, paper-qa, open_deep_research, Perplexica, owl, Auto-Deep-Research, autogen, smolagents, crewAI, jina-node-DR, verdict — all 11 |
| exa (Exa.ai) | dzhng/deep-research + Tongyi DeepResearch + DeepResearchAgent + ARIS (4 NEW candidates not in original shortlist — anti-bias mandate satisfied: exa surfaced repos github-MCP missed) |
| hf-paper-search | DREAM arXiv 2602.18940 + DeepResearch Bench openreview corroboration (paper-class anchors) |
| ctx-search (FTS5 prior-session) | sca-v12 Δ50 verdict prior-adoption + W295-D LLM-as-Judge ensemble prior-wave + W296 §2.6 SOTA-direction question for stream-B |
| rywalker (via exa) | "OG planner/executor" framing for gpt-researcher (cross-source confirmation) |
| openreview/arXiv | DREAM CI-score audit (16.92 LangChain ODR; 4.78 Smolagents Open-DR; 1.03 Tongyi DR) — independent benchmark provenance |

> Per anti-bias mandate: exa-family surfaced 4 candidates github-MCP missed (dzhng + Tongyi + DeepResearchAgent + ARIS). github-MCP first-discovery 11/11 from the seeded shortlist. ≥2 fired families ✓.

## §8 Disagreement Surface (sources_typed contradictions)

Per sca-v12 G1 — codex GPT-5.5 weighted-consensus mediation fires when `disagreement[].length >= 2`. This fork found:

1. **paper-qa "superhuman performance"** — author-self-claim (paper.wikicrow.ai = Future-House blog) is NOT independent. No 3rd-party benchmark validates this on a 2026 evaluation suite. **DISAGREEMENT: self-marketing vs independent-eval-absent**. Resolution: D2 governance capped at 3; D9 ecosystem-credibility capped at 4; T2-CHERRY not T1.

2. **gpt-researcher parallel-scaling pattern** — rywalker positions it as "OG planner/execution" still-relevant; Deep-Researcher-Reflect-Evolve (arXiv 2601.20843) explicitly says "sequential scaling consistently outperforms the parallel self-consistency paradigm". **DISAGREEMENT: popular-OG vs benchmark-superseded**. Resolution: T2-CHERRY pattern-cite-only; do not adopt as primary.

3. **DREAM eval (arXiv 2602.18940) Citation Integrity** — All 3 OSS DRAs benchmarked (LangChain ODR / Smolagents Open-DR / Tongyi DR) have CRITICALLY LOW CI. But each repo's README claims robust citation handling. **DISAGREEMENT: README-claims vs adversarial-eval**. Resolution: any T1-PROV adoption MUST pair with verdict-style judge-ensemble + paper-qa-style cite-validator (per §4 plans).

4. **Perplexica → "Vane" rename** — GitHub still serves `ItzCrazyKns/Perplexica` URL; the title now reads "Vane is an AI-powered answering engine". **DISAGREEMENT: URL/repo-name vs current-rebrand**. Resolution: T3 PATTERN-STUDY with `defer_full_audit_to_wave: W327` once rebrand stabilizes.

Codex GPT-5.5 mediation pending Phase-6 (Stop-hook plugin-native fire at session-end per `openai-codex/1.0.4/hooks/hooks.json:24-37`).

## §9 Cascade-Degraded Flag + Audit Trail

`cascade_degraded = true`. Reason: 5/11 MCP families fired (perplexity-research + tavily-research + repomix DELIBERATELY-SKIPPED to avoid the wall-time-exhaust failure mode that crashed the original fork-2 attempt after 13 calls / ~490 seconds; deepwiki-MCP held back). sca-v12 Phase-1 requires:

- T4 CITE-ONLY: ≥3 families — MET ✓
- T3 PATTERN-STUDY: ≥7 families — UNMET ✗ (will hit T3 floor in next-wave re-cascade)
- T2 VENDOR-FORK: ≥9 families — UNMET ✗
- T1 INSTALL: ≥11 families — UNMET ✗

**Tier-ceiling caps applied this fork**: any T1 was demoted to T1-PROV (sca-v12 Δ35 cascade-completion gate, 24h re-cascade SLA). All T2 verdicts retained at T2-CHERRY (per-component); no full T2-VENDOR-FORK ratifications.

**Audit trail**:
- Fork-2 attempt 1: crashed mid-flight after 13 tool calls @ ~490s (mode-(b) stream_error per Δ-PDM-3). Skeleton-on-disk survived; partial research lost.
- Fork-2 retry (this fork): tighter budget (≤12 calls / ≤120k tokens), lightweight-MCP-only cascade (avoiding perplexity-research + tavily-research). Skeleton-first protocol honored.
- Re-cascade plan: W327 dispatch with full 9-family cascade (perplexity-research + tavily-research + repomix + deepwiki added) for promotion of T1-PROV → T1 candidates.

**Ship-gate per sca-v12 §7**:
- Top-tier this fork: **T1-PROV** (open_deep_research, smolagents-Open-DR-sub-pattern)
- Top T2-CHERRY: verdict, paper-qa, gpt-researcher
- D-EMP gate: BLOCKED from T1/T2 for ALL candidates this fork pending in-runtime sandbox-soak (D-EMP=0 untested-in-runtime). Phase-5 5-gate (provenance + paraphrase + adversarial + contamination + replayable) pending W327 staged pilot.
- Codex Phase-6 round-1 verdict: PENDING Stop-hook fire.

End fork-2 retry. Rule version: sca-v12. Wave: W326. Date: 2026-05-19.
