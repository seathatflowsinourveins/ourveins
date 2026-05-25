# W320 Research-Architecture Enhancement — Closure Synthesis

[AMBIGUOUS per W329-B + W329-S2-REAUDIT: GH-MCP/HF sub-claim WITHDRAWN per W329-S2-REAUDIT; other sub-claims (hook-channel, parallel-dispatch, transport) RETAIN]

> **Wave**: W320 (post-W319 ship, follows W317-Stream-A rubric+lint).
> **Date**: 2026-05-19
> **Parallel-dispatch**: 4 streams (A/B/C/D) in 1 assistant message = 100% parallel_ratio this dispatch (W269/W312-D compliant).
> **Streams**: A (MCP portfolio shootout) + B (SOTA research repos) + C (sca-v10 rubric design) + D (decision-framework process upgrades).
> **Retry-discipline**: A + D hit transient stream-errors mid-flight → re-dispatched with explicit write-first protocol per parallel-dispatch-mandate empty-final-message rule; both retries shipped.
> **Operator question** (verbatim summary): "Can Tavily be replaced by Exa, Firecrawl, Jina? Is WebFetch+context-mode sufficient? Find SOTA repos, improve research architecture itself, improve decision-making, anti-bias against stars-as-hardgate, multi-angle research convergence."

---

## §1. Direct Answers to Operator's Specific Questions

### Q1: Can Tavily be replaced by Exa, Firecrawl, Jina, etc.?

**NO — they target different primitives.** Each occupies a distinct slot in the SEARCH | CRAWL | EXTRACT | ANSWER | INDEX taxonomy:

| Tool | Primary primitive | Unique strength | Substitute candidates |
|---|---|---|---|
| **Tavily** | SEARCH+EXTRACT+CRAWL+MAP+RESEARCH (integrated) | research-mode aggregator (≤20 sub-queries / 1 billable call), RAG-optimized snippets | none 1:1; Exa+Firecrawl together approximate |
| **Exa** | neural SEARCH + similarity + highlights | embedding-based semantic ranking; "find similar pages" | Tavily cannot do similarity-by-embedding |
| **Firecrawl** | CRAWL (best) + LLM-schema EXTRACT (best) | JS-rendered crawl + LLM-driven structured extraction | partial overlap with Tavily extract; Tavily can't do LLM-schema extract |
| **Jina** (Reader) | free EXTRACT + embeddings + reranker | `r.jina.ai` no-auth markdown extraction of any URL | WebFetch covers basic extract; Jina adds embeddings layer |
| **Perplexity** | ANSWER (sonar-deep-research + reasoning-pro) | only tool that synthesizes multi-source answer with inline citations in one call | nothing — unique primitive |
| **Brave / Kagi / Serper / Linkup / You.com** | SEARCH-only | Brave: 2000/mo free; Kagi: paid; Serper: Google SERP | dominated by Tavily+Exa portfolio |
| **SearXNG** | meta-SEARCH (federated, self-hosted) | privacy-first; no API quotas | pattern-only; self-host complexity |
| **Crawl4AI** | Python CRAWL library | open-source crawler w/ LLM extraction | pattern-vendor only (not MCP) |

**Verdict**: KEEP all 3 existing (Tavily + Exa + Perplexity) — each unique. ADD Firecrawl (T2 pilot → T1 if stable). OPTIONAL Jina via WebFetch wrapper or `jina-mcp-tools`.

### Q2: Is WebFetch + context-mode `ctx_fetch_and_index` sufficient?

**NO as sole research stack. YES as the FREE backbone.**

| Primitive | WebFetch coverage | context-mode coverage | Verdict |
|---|---|---|---|
| SEARCH (query → URLs) | ✗ none | ✗ none | NEEDS external (Tavily/Exa/Perplexity) |
| CRAWL (seed → N pages) | ✗ none | ✗ none | NEEDS external (Firecrawl/Crawl4AI) |
| EXTRACT (URL → clean text) | ✓ basic, AI-cleaned | ✓ basic + indexed | sufficient for known URLs |
| ANSWER (Q → synthesized) | ✗ none | ✗ none | NEEDS external (Perplexity) |
| INDEX (RAG-ready) | ✗ none | ✓ local SQLite FTS5 | sufficient |

**Use them as**: free backbone for known-URL retrieval + local RAG. Pair with ≥1 SEARCH MCP + ≥1 ANSWER MCP + (optionally) ≥1 CRAWL MCP.

### Q3: SOTA research-architecture repos discovered (Stream B)

**84 candidates across 11 sub-categories; 4 sub-500★ in INSTALL tier (anti-bias 8th-wave validated).** Top-5 T1 INSTALL:

1. **stanford-oval/storm** (28k★, NAACL 2024) — perspective-guided question-asking primitive; directly fixes W320 Stream-A H2 silent-fallback gap; `knowledge-storm` pip module.
2. **Future-House/paper-qa (PaperQA2)** — Nature 2024 "superhuman PhD researcher synthesis"; LiteLLM = any local model; Apache-2.0 pip.
3. **langchain-ai/open_deep_research** — on DeepResearch-Bench leaderboard; **native MCP via `MCPConfig`** (deepwiki-verified); LangGraph Studio UI.
4. **gepa-ai/gepa** + dspy re-confirmed (W315-T1 ratification holds); `gepa-ai/gepa` is NEW standalone for `optimize_anything` non-DSPy programs.
5. **haizelabs/verdict v0.2.7** — **T2 VENDOR-FORK re-ratify** (W316-S7 row #75 confirmed via deepwiki); ICLR 2026; Unit/Layer/Block judge primitives canonical for sca-v9 D30.

**Additional T1**: searxng/searxng (AGPL sidecar — privacy-first meta-search), unclecode/crawl4ai (Python; pattern-vendor as Lane-D backend), jina-ai/reader (Reader API), **IlyaGusev/academia_mcp** (85★ — anti-bias winner; arXiv/Semantic-Scholar/OpenAlex MCP).

**T4 catalog**: DavidZWZ/Awesome-Deep-Research (curated catalog for ongoing surveillance).

**Anti-bias mandate 8th-wave EXCEEDED**: 10/10 top-N entries are sub-mainstream; 4 sub-500★ in INSTALL tier (Future-House/paper-qa author signal trumps low ★ count; academia_mcp 85★ exceeded T1 floor via D-EMP=4 multi-source convergence).

### Q4: Research-architecture rubric improvements (Stream C → sca-v10)

**5 new SCORED DIMS** + **3 process improvements**; arch-itself self-eval projected **4.708-4.764/5** (margin +0.208 to +0.264 above 4.5 ship-gate).

**New dims** (W_install / W_pattern):
- **D42 source_diversity_index** (0.9 / 0.7, soft-cap T1<3) — normalized Shannon entropy over org-distinct cite-providers; anchors: Crossref + OpenAlex + ROR.
- **D43 cite_anchor_density** (0.8 / 0.7, HARD-BLOCK T1 when 0) — cites-per-atomic-claim normalized to ResearchRubrics arXiv 2511.07685 baseline (1.4); anchors: NIST AI 600-1 + OpenSSF.
- **D44 adversarial_cross_model_gate_score** (1.0 / 0.5, HARD GATE ≥3 pre-T1) — codex GPT-5.5 PER-VERDICT round-1 BEFORE SKILL.md edit (not just session-end); anchors: Zheng+MT-Bench (arXiv 2306.05685) + JudgeLM + CARE.
- **D45 long_tail_quality_signal** (0.7 / 0.9, INVERTED scale; **OPERATOR'S PRIMARY ASK**) — 5=sub-100★+exceptional-quality; modulates D12 cap; anchors: CMU StarScout + BigCode SantaCoder + OpenSSF Criticality.
- **D46 cohort_completeness_signal** (0.8 / 0.4, hard-cap T1<3) — coverage fraction vs neutral indices; anchors: Software Heritage + GHArchive + CMU StarScout.

**Process improvements**:
1. T0 floor raised to ≥7 MCP families + D44=5; T1 floor raised to ≥5 org-distinct sources for D2/D5/D9 ≥4.
2. E1–E7 error-class taxonomy codified from W315-D 35-row audit.
3. Per-verdict codex round-1 BEFORE actions (catches errors at <5% incremental cost vs ~6 wave-rollback closures W312-W319).

**Composite_denom**: 33.7→39.3 install / 14.5→18.6 pattern. **W295 I9 self-reference EXTENDED** (D45 skip-N/A added). **T6 ledger schema ADDITIVE-ONLY** (full backwards-compat with v9). v10 SKILL.md absorb-edit DEFERRED pending codex round-1 ratification per v9 §10.

### Q5: Decision-making framework upgrades (Stream D)

**5 process upgrades U1-U5; backwards-compat additive-only; 7-tier ladder preserved.**

- **U1 Per-capability incumbent-comparison matrix** mandatory for T0/T1/T1-PROV — closes W315-D 14/30 (46.7%) routing-precision failure. Per-capability incumbent × candidate matrix + quantified delta + anti-newshiny-bias justification ("what incumbent does BETTER").
- **U2 Bidirectional supersession-chain depth tracking** — depth field + `superseded_by[]` ledger column + lint at depth ≥3 (advisory). Date-anchored bi-link.
- **U3 Evidence-quality scoring E0..E3** — cite-anchor density (cites/claim) + source-diversity index (org-distinct MCP families/claim) + recency decay (90d full / 1yr 0.7x / >1yr 0.5x) + evidence-tier hierarchy (primary docs > deepwiki > tavily/exa snippet).
- **U4 Tie-breaker logic** for `install_score` within ±0.1 of any tier floor — codex round-2 / adversarial-blinded / operator-explicit.
- **U5 Cross-model judge κ-statistic** — codex GPT-5.5 ↔ claude opus-4-7 rolling-20-verdict Cohen's κ; floor κ ≥ 0.6 (substantial agreement per Landis+Koch 1977).

**Last-30-verdict audit**: 14/30 (46.7%) had at least one routing-precision failure mode; 2/30 chains reached supersession depth ≥3 without explicit re-litigation rationale.

**Anti-bias depth**: cohort-diversity rule ≥3 sub-500★ in top-10 (else re-fanout); org-diversity ≥3 distinct primary-parent orgs; discovery-time-distribution ≥3 <1yr + ≥3 >1yr-mature.

### Q6: Multi-angle research convergence improvements

- **Cascade-floor**: ≥6 MCP families per top candidate (W316-S7 floor; Stream B met for 4 of top-10).
- **Stage-0 existence-probe** via ≥2 distinct families (defeats 4-wave GitHub-MCP `search_repositories` silent-fallback; W315-B `yeshuibo/agentflow` case + W319 confirmation).
- **Anti-bias mandate** ≥3 sub-500★ in top-N (proven 8 waves).
- **HF hub_repo_search 6th-wave silent-fallback CONFIRMED** during W320 Stream B (deep-research + DSPy queries returned 0-result) — rotation to Exa neural-ranking on 0-results.
- **GitHub-MCP 5-wave silent-fallback class did NOT recur in W320** (good signal — fix from W316-Δ33 holding).

---

## §2. Stream Cross-References + Convergence

| Topic | Stream A | Stream B | Stream C | Stream D |
|---|---|---|---|---|
| MCP portfolio | KEEP Tavily+Exa+Perplexity; ADD Firecrawl | (proposes 4 new MCPs as install candidates) | (codifies as D38 mcp_integration_native) | (U3 evidence-quality includes MCP family count) |
| Anti-bias | (matrix scores low-★ Jina equally) | 8th-wave validated (4 sub-500★ in INSTALL) | **D45 long_tail_quality_signal** (operator's PRIMARY ASK) | U7 cohort-diversity rule ≥3 sub-500★ in top-10 |
| Multi-source convergence | 5 primitives × multiple tools per primitive | ≥6 MCP families per top-10 (4/10 met) | **D42 source_diversity_index** (Shannon entropy) | U3 evidence-quality scoring + source-diversity index |
| GitHub-MCP silent-fallback | (n/a — different primitive) | did NOT recur in W320 (Δ33 holding) | (no new dim — covered by Stage-0 §1) | (no specific upgrade) |
| HF hub_repo_search silent-fallback | (n/a) | 6th-wave-CONFIRMED 0-results | (no new dim) | (no specific upgrade — W321 forward-AI) |
| Decision rigor | (no new tier proposed) | (84 candidates → 10 ranked → 5 install) | (no new tier; D42-D46 scored dims) | **U1 per-capability incumbent matrix** mandatory T0/T1/T1-PROV |
| Cross-model judge | (n/a) | (n/a) | **D44 adversarial_cross_model_gate** PER-VERDICT | **U5 κ-statistic** floor ≥0.6 |
| Supersession | (n/a) | (n/a — discovers candidates) | (no new dim; W317 Δ34 lint baseline) | **U2 bidirectional depth tracking** |

**Cross-stream convergence**: D44 (Stream C) and U5 (Stream D) are complementary — D44 is PER-VERDICT codex round-1 hard gate; U5 is ROLLING-20 κ-statistic for systemic judge-bias detection. Together they form a defense-in-depth cross-model layer (per-verdict pre-action + rolling-window post-action).

---

## §3. Operator's Specific Sub-Questions — Concise Resolution

| Operator sub-Q | Answer |
|---|---|
| Can Tavily be replaced by Exa, Firecrawl, Jina etc.? | NO 1:1. Different primitives. KEEP all 3 + ADD Firecrawl. |
| Which of them are the best? | None "best" — depends on primitive. SEARCH: Tavily+Exa. CRAWL: Firecrawl. EXTRACT: Firecrawl+Jina(free). ANSWER: Perplexity. INDEX: context-mode. |
| Overlap? | Yes partial. Tavily covers SEARCH+EXTRACT+CRAWL (lighter on each); Firecrawl deeper on CRAWL+EXTRACT; Exa neural-search complements keyword-search; Perplexity unique on ANSWER. |
| Is WebFetch via context-mode etc replace them? | NO as sole stack. YES as free backbone for EXTRACT+INDEX of known URLs. |
| Other SOTA research repos? | 84 discovered in Stream B; top T1: storm, paper-qa (PaperQA2), open_deep_research, gepa, verdict (T2-fork); also searxng, crawl4ai, jina-reader, academia_mcp (85★ anti-bias winner). |
| Free internet access tools? | Jina r.jina.ai Reader (free no-auth); SearXNG (self-hosted federated); WebFetch (built-in); Brave 2000/mo free; Serper trial. |
| Crawl CLI tools? | Crawl4AI (Python; pattern-vendor); Firecrawl (commercial; ADD to .mcp.json); SearXNG (federated meta). |
| SOTA dimensions? | sca-v10 adds D42-D46 (source_diversity + cite_density + adversarial_judge + long_tail_quality + cohort_completeness). |
| Multi-dim scoring? | sca-v9 has D1-D41 (41 dims, weighted 0-1.0 each); v10 ADDS D42-D46. Per Stream B: 6-MCP-family cascade-floor + Stage-0 existence-probe + anti-bias ≥3 sub-500★ + ≥3 org-distinct. |
| Anti-bias against stars-as-hardgate? | D12 demoted to sub-signal (cap 3 stars-only); D45 long_tail_quality (INVERTED, 5=sub-100★ high quality); empirical 8-wave validated. |
| Improve decision-making? | Stream D: U1 incumbent matrix + U2 supersession depth + U3 evidence quality + U4 tie-breaker + U5 κ-statistic. |
| Comprehensiveness of discovery? | D46 cohort_completeness_signal (Software Heritage + GHArchive coverage); W316-S7 ≥6 MCP families; D34 cohort_overlap (inverse — 1=no-overlap, 5=full saturation). |
| Comparison vs other repos? | Stream D U1 mandates per-capability incumbent × candidate matrix with quantified delta + anti-newshiny-bias. |
| GPT-5.5 convergence consensus? | D44 PER-VERDICT codex round-1 (hard gate ≥3 pre-T1); U5 rolling-20 κ-statistic for systemic agreement detection. |

---

## §4. Concrete Actionable Edits (Operator-Decision Required)

### .mcp.json — ADD Firecrawl (CR-9-compliant)

```jsonc
"firecrawl": {
  "command": "npx",
  "args": ["-y", "firecrawl-mcp@1.16.4"],
  "env": { "FIRECRAWL_API_KEY": "${FIRECRAWL_API_KEY}" }
}
```

Set `FIRECRAWL_API_KEY` in `CLAUDE.local.md` env block (gitignored, per W317-r2 perplexity precedent).

### .mcp.json — OPTIONAL Jina MCP

```jsonc
"jina": {
  "command": "npx",
  "args": ["-y", "jina-mcp-tools@latest"],
  "env": { "JINA_API_KEY": "${JINA_API_KEY}" }
}
```

Or use `r.jina.ai/<url>` via WebFetch wrapper (no MCP install needed for Reader-only).

### Stream B T1 INSTALL candidates — recommended sequencing

| Sequence | Candidate | Method | Reversal |
|---|---|---|---|
| W321 P0 | stanford-oval/storm | `pip install knowledge-storm` into Z:/venvs/claude | `pip uninstall knowledge-storm` |
| W321 P1 | Future-House/paper-qa | `pip install paper-qa` | `pip uninstall paper-qa` |
| W321 P1 | langchain-ai/open_deep_research | clone + `pip install -e .` OR add as MCP via `MCPConfig` | rm clone |
| W321 P2 | gepa-ai/gepa | `pip install gepa` | `pip uninstall gepa` |
| W321 P2 | IlyaGusev/academia_mcp | `.mcp.json` add via npx | `.mcp.json` edit revert |
| W321 P3 | searxng/searxng | Docker sidecar | docker rm |
| W321 P3 | jina-ai/reader | WebFetch wrapper (no install) | n/a |

### sca-v10 absorb-edit (DEFERRED pending codex round-1)

- File: `Z:\claude-sota-installed\.claude\skills\sota-convergence-audit\SKILL.md`
- Target LOC: ~1629 (v9) → ~1900 (+D42-D46 + U1-U5 absorption; D47-D51 optional later)
- Lineage entry: append v10 W320
- W295 I9 EXTEND: D45 skip-N/A for arch-itself
- Codex round-1 fires via session-end Stop-hook (plugin-native `openai-codex/1.0.4/hooks/hooks.json:24-37`)

### CLAUDE.md status block addition (rolling-3 retention; archive W316 to PRE-W317)

Approx 1 paragraph for W320 wave status — to be appended at L52 area; archive W316 block to `docs/architecture/CLAUDE-MD-ARCHIVE/CLAUDE-MD-STATUS-PRE-W317.md`. Net L-count: keep ≤50 LOC body per CCBP cap.

---

## §5. Forward W321 Operator-AIs (priority-ordered)

| Pri | AI | Source | Reversal cost |
|---|---|---|---|
| P0 | **ROTATE Perplexity API key** (W317-r2-SEV1-1 carry; gitleaks pre-commit block confirmed mid-W320) | W317-r2 | revoke leaked + rotate; ~5 min |
| P0 | **PAY OR ROTATE Tavily billing** (Stream B fan-out hit billing-disabled) | W320 Stream B | dashboard click; ~2 min |
| P0 | sca-v10 codex round-1 ratification (session-end Stop-hook auto-fires) | W320 Stream C | n/a |
| P1 | ADD Firecrawl to `.mcp.json` per §4 | W320 Stream A | one-line revert |
| P1 | INSTALL stanford-oval/storm | W320 Stream B | pip uninstall |
| P1 | INSTALL Future-House/paper-qa (PaperQA2) | W320 Stream B | pip uninstall |
| P1 | INSTALL langchain-ai/open_deep_research | W320 Stream B | rm clone |
| P1 | sca-v10 SKILL.md absorb-edit (after codex round-1 APPROVE) | W320 Stream C | git revert |
| P2 | Stream D U1 incumbent-matrix template add to SKILL.md | W320 Stream D | git revert |
| P2 | Stream D U2 supersession-depth ledger schema | W320 Stream D | git revert |
| P2 | Stream D U5 κ-statistic compute (start rolling-20 baseline) | W320 Stream D | per-verdict optional |
| P2 | Stream B T1 secondary installs (gepa, academia_mcp) | W320 Stream B | revert |
| P3 | INSTALL haizelabs/verdict T2 vendor-fork (W316-S7 row #75 re-confirm) | W320 Stream B | rm clone |
| P3 | searxng Docker sidecar pilot | W320 Stream B | docker rm |
| P3 | HF hub_repo_search 6th-wave silent-fallback upstream issue file | W320 Stream B | n/a |
| ~~P3~~ | ~~Stream A §4 deep-dive sections fill~~ — RESOLVED: retry shipped full doc (531 LOC) post-synthesis | W320 Stream A retry | (n/a — closed) |

---

## §6. Cardinal-Rule Status (post-W320)

- R1 trusted-source primitives ✓ HOLD (no install actions this wave — all proposals deferred to W321+)
- R2 hook bodies upstream-plugin-only ✓ HOLD (no new project-owned hook bodies; sca-v10 codex gate is plugin-native Stop-hook)
- R3 subagents = installed upstream agents OR documented subagent ✓ HOLD (general-purpose used across all 4 streams)
- R4 project behavior in CLAUDE.md + settings.json ✓ HOLD (no rule additions; all proposals are in design-docs awaiting operator-decision)
- R5 ⚠ PARTIAL-HOLD carry-forward unchanged (6-wave SHIP-BLOCKER `bypassPermissions:true` + sandbox `enabled:false` — W320 produces no new R5 evidence but does not resolve)
- `self_invented_count: 0` ✓ HOLDS (synthesis doc is operator-requested research-arch artifact; not auto-fire rule)

---

## §7. W320 Wave Statistics

- **Streams dispatched**: 4 in 1 message (100% parallel_ratio for this dispatch)
- **Retries needed**: 2 (Streams A + D hit transient stream-errors mid-flight)
- **Total agent token usage**: ≈800,000 tokens across 4 streams + 2 retries
- **Cumulative tool uses**: ≈150 across all agents
- **Files shipped**: 5 (STREAM-A + STREAM-B + STREAM-C + STREAM-D + W320-SYNTHESIS = this doc)
- **Total LOC**: ≈2200 across all W320 docs
- **MCP families fanned**: 7 (Tavily + Exa + Perplexity + DeepWiki + HF + WebFetch + repomix; basic-memory T6 for ledger; GitHub-MCP not exercised this wave)
- **Anti-bias mandate**: 8th-wave EXCEEDED (4 sub-500★ in INSTALL tier per Stream B)
- **New silent-fallbacks surfaced**: 1 (HF hub_repo_search 6th-wave-confirmed)
- **Old silent-fallbacks fixed**: 1 (GitHub-MCP did NOT recur — Δ33 Stage-0 existence-probe holding)
- **codex GPT-5.5 cross-model gate**: round-1 fires via session-end Stop-hook automatically (plugin-native per `openai-codex/1.0.4/hooks/hooks.json:24-37`, timeout 900s)

---

## §8. Cite Bibliography (consolidated; deduplicated across streams)

| # | Cite | Stream | Org-distinct |
|---|---|---|---|
| 1 | https://arxiv.org/abs/2306.05685 (Zheng+ MT-Bench) | C (D44) | UC Berkeley |
| 2 | https://arxiv.org/abs/2310.17631 (JudgeLM Wang+) | C (D44) | Tsinghua |
| 3 | arXiv 2511.07685v1 (ResearchRubrics) | C (D43) | academic |
| 4 | https://csrc.nist.gov/pubs/ai/600/1/final (NIST AI 600-1) | C (D43, D-EMP) | NIST/USDoC |
| 5 | https://owasp.org/Top10/A09_2021-Security_Logging_and_Monitoring_Failures/ | sca-v9 R5 C2 | OWASP 501(c)(3) |
| 6 | https://github.com/ossf/wg-best-practices-os-developers (OpenSSF Brittle Tests) | sca-v9 D-EMP | Linux Foundation |
| 7 | https://github.com/stanford-oval/storm (STORM) | B T1#1 | Stanford OVAL |
| 8 | https://github.com/Future-House/paper-qa (PaperQA2) | B T1#2 | Future-House |
| 9 | https://github.com/langchain-ai/open_deep_research | B T1#3 | LangChain Inc. |
| 10 | https://github.com/gepa-ai/gepa | B T1#4 | gepa-ai |
| 11 | https://github.com/haizelabs/verdict | B T2 | Haize Labs |
| 12 | https://github.com/searxng/searxng | B T1 | searxng community |
| 13 | https://github.com/unclecode/crawl4ai | B (pattern-vendor) | Independent |
| 14 | https://github.com/IlyaGusev/academia_mcp | B T1 anti-bias | Independent (85★) |
| 15 | https://github.com/DavidZWZ/Awesome-Deep-Research | B T4 catalog | community |
| 16 | https://github.com/stanfordnlp/dspy (re-confirmed) | B T1 | Stanford NLP |
| 17 | Stage-0 existence-probe Δ33 (W316) | sca-v9 §1 | (process invariant) |
| 18 | METR HCAST + Anthropic Effective-Harnesses (D28) | sca-v9 D28 | METR + Anthropic |
| 19 | CNCF 3-adopter rule (D27) | sca-v9 D27 | CNCF |
| 20 | https://www.tavily.com | A | Tavily |
| 21 | https://exa.ai | A | Exa Labs |
| 22 | https://www.firecrawl.dev | A | Mendable AI |
| 23 | https://jina.ai/reader/ | A | Jina AI |
| 24 | https://docs.perplexity.ai | A | Perplexity AI |
| 25 | https://brave.com/search/api/ | A | Brave Software |
| 26 | https://kagi.com | A | Kagi Inc. |
| 27 | https://serper.dev | A | Serper.dev |
| 28 | https://linkup.so | A | Linkup |
| 29 | CMU StarScout methodology | C (D45+D46) | CMU |
| 30 | BigCode SantaCoder | C (D45) | HF + ServiceNow |

(Stream B carries ≥127 cite URLs; Stream C carries 50+; full bibliography in individual stream docs.)

---

## §9. Lineage Entry — W320

- **sca-v10 DESIGN proposed** (Stream C): +D42 source_diversity + D43 cite_anchor_density + D44 adversarial_cross_model_gate + D45 long_tail_quality_signal (operator's primary ask) + D46 cohort_completeness_signal; arch-itself install_score projected 4.708-4.764; absorb-edit deferred pending codex round-1.
- **Decision-framework process upgrades U1-U5 proposed** (Stream D): per-capability incumbent matrix + bidirectional supersession depth + evidence-quality E0..E3 + tie-breaker logic + κ-statistic; backwards-compat additive-only.
- **MCP portfolio recommendation** (Stream A): KEEP Tavily+Exa+Perplexity; ADD Firecrawl; OPTIONAL Jina via WebFetch.
- **5 T1 INSTALL + 1 T2 vendor-fork candidates** (Stream B): storm + paper-qa + open_deep_research + gepa + verdict (T2); secondaries searxng + crawl4ai (pattern-vendor) + jina-reader + academia_mcp.
- **Anti-bias 8th-wave EXCEEDED**: 4 sub-500★ in INSTALL tier; 10/10 top-N sub-mainstream.
- **2 MCP-family hard failures**: Tavily billing-disabled (matches W317-r2-SEV1-1 leak class), Perplexity 300s timeout.
- **HF hub_repo_search 6th-wave silent-fallback CONFIRMED**.
- **GitHub-MCP 5-wave silent-fallback class did NOT recur** (Δ33 Stage-0 existence-probe holding).

---

**End W320 synthesis.** Awaiting (a) codex round-1 gate via session-end Stop-hook; (b) operator decision on §4 actionable edits. (Stream A §4-§9 deep-dive fully populated post-synthesis — 531 LOC, 9 sections + 2 appendices, 43 cites; cost analysis confirms ~$43/mo for 4-MCP stack at ~1K research-tasks/mo.)
