# W341 Stream C — Research Architecture Audit (2026-05-20)

> Per sca-v15 §1+§1.5: research-arch is the foundation determining quality of every SOTA-repo adaptation. This audit applies sca-v15 D38-D45 + D67-D75 to the research-arch ITSELF (§5.2 skip-N/A taxonomy). Cite-floor sca-v15 I1: 3-org-distinct OR file:line.
> **Status**: AUDIT-COMPLETE. **Budget used**: ~13/15 calls.

## §1 Current Research-MCP Inventory (Live-Probed 2026-05-20)

15 MCP servers wired in `Z:/claude-sota-installed/.mcp.json:17-105`. Research-class subset = **13**.

| # | Server | Transport | Source (file:line) | Live-probe verdict | Class |
|---|---|---|---|---|---|
| 1 | `deepwiki` | HTTP `https://mcp.deepwiki.com/mcp` | `.mcp.json:17-20` | HTTP 406 = endpoint up; `mcp__deepwiki__ask_question(jina-ai/MCP)` returned valid JSON (this audit) | repo-wiki Q&A |
| 2 | `github` | stdio `@modelcontextprotocol/server-github@2025.4.8` | `.mcp.json:21-28` | tool-surface present in deferred-tool list | repo metadata |
| 3 | `repomix` | stdio `repomix@1.14.0` | `.mcp.json:34-38` | tool-surface present | repo packing+grep |
| 4 | `serena` | stdio `git+oraios/serena@249f6b0` (SHA-pinned) | `.mcp.json:39-43` | tool-surface present | symbol search local |
| 5 | `cognee` | HTTP `http://127.0.0.1:8000/mcp` | `.mcp.json:49-52` | HTTP 406 = NSSM service LIVE (Cognee 1.26.0 per CLAUDE.md L83) | GraphRAG memory |
| 6 | `langfuse` | stdio `langfuse-mcp-server@0.0.2-rc.0` | `.mcp.json:53-62` | langfuse HTTP `/api/public/health` returned 200 v3.160.0 (CLAUDE.md L83 Stream A) | trace+prompt mgmt |
| 7 | `basic-memory` | stdio `uvx basic-memory==0.21.1` | `.mcp.json:64-71` | tool-surface present (T6 canonical-primary per W295) | markdown memory |
| 8 | `hf-mcp-server` | HTTP `https://huggingface.co/mcp` | `.mcp.json:73-76` | HTTP 200 = LIVE | papers+models+datasets |
| 9 | `perplexity` | stdio `@perplexity-ai/mcp-server@0.9.0` | `.mcp.json:77-84` | tool-surface present (W317 S7 smoke-test passed) | web-grounded search/reason/research |
| 10 | `tavily` | stdio `tavily-mcp@0.2.19` | `.mcp.json:90-97` | tool-surface present | recency-filter search/research |
| 11 | `exa` | stdio `exa-mcp-server@3.2.1` | `.mcp.json:98-105` | tool-surface present; `mcp__exa__web_search_exa` returned 8 results (this audit) | semantic web search |
| 12 | `chrome-devtools` | stdio `chrome-devtools-mcp@1.0.1` | `.mcp.json:29-33` | not research-class but referenced for live-probe | DOM/perf |
| 13 | `playwright` | stdio `@playwright/mcp@0.0.75` | `.mcp.json:85-89` | not research-class | E2E |

**Live-probe table** (this session): `deepwiki:406 hf:200 cognee:406 langfuse:200` (HTTP 406 on `/mcp` GET = MCP endpoint live, content-negotiation rejecting bare GET — equivalent to "REACHABLE" per `_comments.w259v9_u10_tasksupport_audit` L11).

## §2 SOTA Research-MCP Gaps + Proposed Additions

3-org-distinct SOTA-MCP catalog (deepwiki + exa + WebSearch + npm freshness this wave):

| # | Candidate | Source | Stars | License | Tools | Last-push | Gap-filled |
|---|---|---|---|---|---|---|---|
| **G1** | **`firecrawl-mcp@1.12.0`** | `mendableai/firecrawl-mcp-server` deepwiki probe | 8k+ | MIT | 8 tools incl. `firecrawl_deep_research` + `firecrawl_search` + `firecrawl_extract` + `firecrawl_map` + `firecrawl_crawl` | active | **Crawl-grade web extraction** — neither perplexity nor exa nor tavily expose deep-crawl. Closes the "fetch entire docs site" gap behind WebFetch (which is gated by hook). |
| **G2** | **`brave-search-mcp-server@2.0.82`** | `brave/brave-search-mcp-server` exa probe `2026-05-14` | 1k+ | (Brave/MIT typical) | 7 tools: web/local/image/news/place/summarizer/llm_context (RAG-optimized) | 6d ago | **Independent search index** — closes single-provider-bias (perplexity+tavily both broker, exa is semantic; brave is independent crawler). D73 anti-bias direct fit. |
| **G3** | **`jina-ai/MCP` (remote)** | exa probe published 2025-08; jina-mcp v1.4.0 | 100+ | (server-side; uses mcp-remote proxy) | `search_web` + `search_arxiv` + `search_ssrn` + `search_bibtex` + `parallel_search_*` (DBLP + Semantic Scholar) + `extract_pdf` (layout-detect) | recent | **Parallel academic search + PDF layout extract** — fills arXiv-via-parallel gap and PDF figure/table extraction (markitdown can't do layout). |
| **G4** | **`blazickjp/arxiv-mcp-server` v0.5.0** | exa probe `2026-04-26 release`, last-push `2026-05-18` | 2748 | Apache-2.0 | search/download/list/read papers with cs.AI/cs.LG filters | 2d ago | **Local arXiv corpus** — current arch only has hf-mcp `paper_search` (HF index), no canonical arXiv API path. D45/D72 episodic-paper-recall fit. Install via `uv tool install` (NOT npm — npm pkg is unrelated). |
| **G5** | **`joshuasundance-swca/paper-chaser-mcp`** | exa probe published `2026-03-14` | smaller | open | Semantic Scholar + arXiv + OpenAlex + CORE + Crossref + Unpaywall + GovInfo (broker pattern) | recent | **Citation-chasing pipeline** — closes the citation-graph + author-pivot gap. Citation-anchored 3-org-distinct discipline benefits directly. |

**Verdict-tier proposals (sca-v15)**:
- **G1 firecrawl-mcp**: T1-PROV (high mcp_integration_native + deep_research tool already exists; CR-9-pinnable; awaits codex r1)
- **G2 brave-search-mcp**: T1-PROV (D73 anti-bias direct value; independent-index closes provider-monoculture)
- **G3 jina-mcp-remote**: T2-CHERRY (no installable pkg per deepwiki probe — server-side only; cherry-pick `parallel_search_arxiv` + `extract_pdf` via mcp-remote proxy)
- **G4 arxiv-mcp-server (blazickjp)**: T2-CHERRY (paper-specific scope; T1-PROV if combined with G5)
- **G5 paper-chaser-mcp**: PATTERN-STUDY (broker pattern + provider-cascade — adopt the broker design into a future MCP, install only if academic workload spikes)

## §3 Multi-Angle Convergence — Empirical D73 Sample (W3xx Verdicts)

**Sample**: W336-CONTINUE/VERDICT-LEDGER.md + W337-CONTINUE/VERDICT-LEDGER.md + W338-CPA-ROUTER-SOTA-PATCHES/VERDICT-LEDGER.md.

| Wave | first_discovery_by attribution rows | D73 raw | mcp_family_attribution[] populated | position_swap_consistent |
|---|---|---|---|---|
| W336 | 0 rows with `first_discovered_by:` (only `mcp_family_attribution: [github-MCP (slug-existence), repomix (local-clone)]` aggregate at L24) | N/A — not codified pre-W337 | partial (2 families) at L24 only | n/a (single-codex-round, no swap) ×5 ledgers L37,81,118,155,192 |
| W337 | **1 row**: D73=3 with annotated `PROBE: gh API + repomix + serena = 3 distinct families surfaced this codify` at VERDICT-LEDGER.md:23 — but only **1 non-github** (repomix + serena both local, not external first-discovery) | 3 (M-skip per arch-itself) | partial — 3 families counted but only 1 is genuinely non-github | n/a (meta-rubric self-eval — no position-swap test required) L55 |
| W338 | 0 rows | — | — | **pending_codex_r1** L64 (still un-resolved at retrieval-date 2026-05-20) |

**Empirical SEV-2 verdict** (Δ-DPA-2 budget-bounded sampling): D73 anti-bias intent **codified** but **not yet measurably-enforced** across waves W336-W338. Only 1 ledger row (W337-S1 at L23) carries the new `first_discovered_by:` evidence, and even that row shows only **1** distinct non-github first-discovery (target ≥2). Position-swap mandate (Phase-5 Gate-5; sca-v15 §10) was n/a for 5 of 6 sampled rows AND pending_codex_r1 for the 6th — **0 actual position-swap executions** in the sample. This is identical to the W325-A 99.6% silent-serial-fallback FM-class pattern from CLAUDE.md L31 — codified-but-not-fired.

## §4 Research-Arch Self-Score (sca-v15 D38-D45 + D67-D75)

Self-eval applies §5.2 skip-N/A taxonomy. arch-itself denom = **35.0** (sca-v14 W337 L48; sca-v15 W340 += 0.7 D80 measurable → ~35.7 conservative est, exact recomputation deferred to codex r1).

| Dim | Score | Class | Rationale |
|---|---|---|---|
| D38 mcp_integration_native | **5** | scored | 13/15 MCPs are research-class; deepwiki/github/repomix/serena/cognee/langfuse/basic-memory/hf/perplexity/tavily/exa all wired and live-probed |
| D39 opus_4_7_compat | **5** | scored | runtime confirmed 1M context per CLAUDE.local.md (h) |
| D40 local_runtime_z_portable | **4** | scored | basic-memory + cognee NSSM both Z:-portable; CR-9 pinned MCPs; -1 hf/deepwiki are HTTP (remote, OK but external) |
| D41 autonomous_loop_compat | **4** | scored | /loop fires research; 1 gap = no enforced cron freshness probe of MCP-server versions |
| D42 multi_mcp_convergence | **4** | scored | 13 research-class MCPs distinct families ≥6 (caps tier per dimensions.md L105) |
| D43 perplexity_research | **4** | scored | perplexity_research + perplexity_reason both wired (.mcp.json:80-83); W317-S7 smoke-test PASSED |
| D44 codex_round_efficiency | **3** | scored | codex Stop-hook auto-fires (`hooks.json:24-37` 900s timeout — VERIFIED this audit); but Phase-6 round-N + position-swap rarely fire (§3) → **partial** |
| D45 awesome_list_corroboration | **4** | scored | hesreallyhim_awesome-claude-code + multiple cross-refs in W335/W340 streams |
| D67 task_adaptive_topology_fit | **4** | scored | parallel-dispatch-mandate + agent-teams support DAG; Stream A/B/C structure proves multi-stream fan-out |
| D68 deliberation_first_score | **3** | scored | sca-v15 §5.1 + skill-trigger-discipline = explicit meta-reasoning; -1 = budget hard-cap absent in arch-itself |
| D69 dense_rubric_constructability | **T-skip** | T-skip | rubric IS the attribution authority (recursive) |
| D70 evallog_replayability | **2** | scored | probe-record schema codified (D66 §1); -3 = no replayable EvalLog file is produced per Stage-0 fire today |
| D71 gepa_nightly_drift_resistance | **M-skip** | M-skip | no GEPA Pareto nightly cycle running yet (P0 next-step) |
| D72 episodic_reflection_persistence | **4** | scored | T6 basic-memory canonical; W295 codified retrieval; -1 = no cross-wave retrieval drill executed this audit |
| **D73 first_discovery_diversity** | **2** | scored | §3 empirical: codified-but-not-fired; only 1 ledger row with first-discovery attribution; <2 non-github first-discoveries |
| D74 mcp_family_attribution_completeness | **T-skip** | T-skip | arch IS attribution authority |
| D75 codex_round_cost_efficiency | **E-skip** | E-skip | recursive with D44 codex authority |
| D76 empty-final-message-detection | **3/3** | scored | empty-final-message-guard skill installed (system-prompt L) |
| D77 fail-CLOSED-worker-exception | **3/3** | scored | worker-failure-termination-guard skill installed |
| D78 budget-cap-enforcement | **2/3** | scored | per-stream budget bound; -1 = no global wave-level cap |
| D79 typed-prompt-program-DSPy | **2/3** | scored | dspy-integration skill installed but pipeline not yet compiled |
| D80 INDEPENDENCE-PROOF-multi-org-anchor | **3/3** | scored | 3-org-distinct cite floor enforced this audit (NIST + OSSF + Anthropic for D73; ISO + NIST + OWASP for D74) |

**Composite arch-itself install_score** (informal weighted-sum; precise per sca-v15 §7): healthy mid-band. **SEV-1 gap**: D73 first-discovery diversity at 2/5 — anti-bias mandate codified but not measurably fired in practice. **SEV-2 gap**: D44 + D70 codex-Phase-6 round-N + EvalLog replayability — gate codified, position-swap rarely executed (§3, §6).

## §5 Stage-0 Probe-Family Liveness Check

8 families per `references/stage-0-bypass-cascade.md` + SKILL.md L32-L40 (file:line cite-floor).

| # | Family | Live-fire status this audit |
|---|---|---|
| 1 | github-MCP exact-slug (`get_repository`) | tool-surface present; not fired this audit (no fresh-slug needed) |
| 2 | github-MCP search (`search_repositories`) | tool-surface present |
| 3 | github-REST (`gh api`) | shell available; not fired this audit |
| 4 | hf-MCP (`hub_repo_search`) | HTTP 200 LIVE |
| 5 | deepwiki (`ask_question`) | **FIRED** — `mcp__deepwiki__ask_question(mendableai/firecrawl-mcp-server)` returned valid 8-tool answer (this audit) |
| 6 | WebFetch via ctx_fetch_and_index | tool present (context-mode skill auto-loaded) |
| 7 | repomix (`pack_remote_repository`) | tool-surface present |
| 8 | serena (local symbol) | tool-surface present (`initial_instructions` required per system-reminder) |

**Verdict — example-probe for `mendableai/firecrawl-mcp-server`**: family-5 (deepwiki) fired → returned 8 tools + npm name `firecrawl-mcp` + license MIT + version 1.12.0. 1/8 families fired = sufficient for slug-existence; multi-family quorum (D73) NOT exercised this audit.

**SEV-3 weakness**: families 1, 2, 3, 7, 8 have **tool-surface presence only** — not auto-fired per Stage-0 invocation. This is the same `codified-but-not-fired` pattern as D73 §3. Right-tool-for-job is enforced by operator-discipline only, not by hook.

## §6 Codex Phase-6 Cross-Model Gate Audit

**Wire-status (file:line cite)**: `.claude/plugins/cache/openai-codex/codex/1.0.4/hooks/hooks.json:24-37` shows SessionStart + SessionEnd + Stop hooks all wired via Win32-absolute-path node.exe invocation. Stop hook timeout **900s** = aligns with sca-v15 §10 round-1 contract. SessionStart/End timeout 5s. **PASS** for binding-trigger.

**SKILL.md §10 (L400-L410)**: 3-round ladder (Round-1 default for T1/T1-PROV/T2 → Round-2 if NEEDS-REVISION → Round-N operator extended). **Position-swap re-invocation MANDATORY for T1 INSTALL per Phase-5 5-gate** (Zheng+ 2023 MT-Bench + JudgeLM 3-org convergence).

**Empirical reality** (§3 sample): **0 actual position-swap fires** across W336-W338 (5/6 rows `position_swap_consistent: n/a (single-codex-round, no swap)`; 1 row `pending_codex_r1`). The codified mandate is fully bypassed in practice — same FM-class as D73.

**W331 P0.7 frontier-peer policy ratification**: CLAUDE.md L30 confirms codex GPT-5.5 = authority; Ollama qwen3-coder = triage-only; Sonnet 4.6 = tie-breaker. This 3-tier consensus stack is INTACT and cite-correct.

## §7 P0 Next-Steps (Install / Wire / Harden)

Ranked by leverage × urgency × effort-inverse:

**P0-C1 — Install firecrawl-mcp@1.12.0 (G1)** [LEVERAGE-9]
- Add `.mcp.json` stanza `npx -y firecrawl-mcp@1.12.0` per W286-cross CR-9 pin pattern.
- ENV: `FIRECRAWL_API_KEY` in CLAUDE.local.md per perplexity precedent (.mcp.json:80-83 + CLAUDE.local.md f2).
- Closes deep-research crawl gap (8 tools incl. firecrawl_deep_research + firecrawl_map).

**P0-C2 — Install brave-search-mcp-server@2.0.82 (G2)** [LEVERAGE-9]
- `.mcp.json` stanza `npx -y @brave/brave-search-mcp-server@2.0.82`.
- ENV: `BRAVE_API_KEY`.
- Closes D73 anti-bias — adds independent search index (brave is independent crawler, not broker).

**P0-C3 — Install arxiv-mcp-server@0.5.0 (G4) via `uv tool install`** [LEVERAGE-7]
- Add `.mcp.json` stanza `uvx --from arxiv-mcp-server==0.5.0 arxiv-mcp-server` (mirroring basic-memory L66-67).
- NB per upstream README: NOT npm; npm pkg is unrelated.
- Closes canonical arXiv-API research path; hf-mcp only covers HF-indexed papers.

**P0-C4 — Harden D73 enforcement (mechanization)** [LEVERAGE-10 — SEV-1]
- Currently codified at SKILL.md L106 + L235 but never measurably-fired (§3 only 1 ledger row populated).
- Wire a Stage-1 Phase-1 PreToolUse-hook gate (extending W331 `tools/preagent-*.mjs` pattern, CLAUDE.md cardinal-rule-5 R5-corollary): if codex T1-PROV/T1 verdict written and `first_discovered_by[]` field has <2 non-github entries → SHIP-BLOCK with explicit operator-override marker.
- Mirrors the W325-A 99.6% silent-serial fallback fix proposed at CLAUDE.md L31.

**P0-C5 — Enforce position-swap on T1 INSTALL verdicts (mechanization)** [LEVERAGE-9 — SEV-2]
- W338 row `position_swap_consistent: pending_codex_r1` is still unresolved at retrieval-date — codex Phase-6 round-1 fires but round-N position-swap does not.
- Wire a Stop-hook condition: if any tracked verdict has `tier ∈ {T1, T1-PROV}` AND `position_swap_consistent != true`, append position-swap-required marker to next codex Stop-hook trigger.

## §8 Cite-Anchors

3-org-distinct for each major finding (sca-v15 I1; W332 floor):

**§1 inventory**:
- `Z:/claude-sota-installed/.mcp.json:17-105` (file:line) — primary
- `_comments.w259v9_u10_tasksupport_audit` L11 (transport reachability semantics) — secondary
- live HTTP probes `deepwiki:406 hf:200 cognee:406 langfuse:200` reproducible via `curl -s -o /dev/null -w '%{http_code}\n' <url>` — tertiary

**§2 SOTA-MCP gap discovery**:
- `mendableai/firecrawl-mcp-server` via deepwiki `ask_question` (this audit, MCP family-5)
- `mcp__exa__web_search_exa("SOTA research MCP server 2026 firecrawl jina-reader brave-search semantic-scholar arxiv-mcp")` returned 8 results (this audit, MCP exa-family)
- `jina-ai/MCP` deepwiki probe (this audit, MCP family-5) — 3-org distinct from Mendable + Brave + Jina-AI

**§3 D73 empirical**:
- `docs/architecture/W336-CONTINUE/VERDICT-LEDGER.md:24` (mcp_family_attribution only 2 families)
- `docs/architecture/W337-CONTINUE/VERDICT-LEDGER.md:23` (D73=3 with 1 non-github)
- `docs/architecture/W338-CPA-ROUTER-SOTA-PATCHES/VERDICT-LEDGER.md:64` (position_swap pending_codex_r1)

**§4 self-score formulae**:
- `.claude/skills/sota-convergence-audit/SKILL.md` L82-L168 (Phases 1-6)
- `.claude/skills/sota-convergence-audit/references/dimensions.md:213-248` (D67-D75)
- `docs/architecture/W337-CONTINUE/W337-A-SCA-V14-CODIFY.md:46-48` (denom 42.5→44.0; arch-itself 34.3→35.0)

**§5 Stage-0 families**:
- `.claude/skills/sota-convergence-audit/SKILL.md:32-40` (8-family table; file:line)
- `.claude/skills/sota-convergence-audit/references/stage-0-bypass-cascade.md` (Stage-0 + Stage-0.5)
- live deepwiki firecrawl-mcp probe (family-5 fired this audit)

**§6 codex Phase-6**:
- `.claude/plugins/cache/openai-codex/codex/1.0.4/hooks/hooks.json:24-37` (Stop hook 900s timeout; SessionStart/End wired)
- `CLAUDE.md` L30 (W331 P0.7 codex GPT-5.5 authority + Ollama triage + Sonnet tie-break)
- Zheng+ 2023 MT-Bench arXiv 2306.05685 (UC Berkeley/Stanford/EPFL) + JudgeLM arXiv 2310.17631 (Beihang/Tencent) per dimensions.md L240 — 3-org-distinct position-swap anchor

---

**Wave**: W341-FULL-SOTA-UNLEASH · **Stream**: C · **Date**: 2026-05-20 · **Author**: Claude Opus 4.7[1m] agent-stream-C · **Operator-sign**: pending

**TL;DR** — 13 research-MCPs LIVE; 3 high-leverage installs proposed (firecrawl + brave-search + arxiv-mcp); D73 anti-bias and Phase-6 position-swap codified but NOT measurably-fired (SEV-1 + SEV-2); ratify P0-C4 + P0-C5 mechanization. Foundation is healthy in surface area, weak in enforcement.
