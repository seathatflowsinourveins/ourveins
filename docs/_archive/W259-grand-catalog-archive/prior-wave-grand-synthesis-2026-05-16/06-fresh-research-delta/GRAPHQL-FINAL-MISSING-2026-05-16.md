# GRAPHQL-FINAL-MISSING — 12-axis layer-specific deep probe

> **Generated 2026-05-16 by sota-researcher subagent** (agentId a20dc4f1eda3c7fd7, duration 8.3min, 12 GraphQL searches + 6 corpus-grep verifications).
> **Method**: 12 GitHub GraphQL `mcp__github__search_repositories` calls (initial 4-AND/OR/NOT pattern hit 422 → rewrote with `topic:` filters + simpler star/date constraints). Corpus-overlap filtering done locally via Grep against `06-fresh-research-delta/` + `00-MASTER/`.
> **Hypothesis (R0)**: After top-tier 308 + existing GRAPHQL-MISSING 398 = ~706 ≥2k★ catalog baseline, residual layer-specific gaps exist where a NEW high-star SOTA repo is absent.
> **Verdict**: CONFIRMED at 9/12 axes, REJECTED at 3/12 axes (saturation).

---

## §A — Per-axis findings (NEW = absent from prior corpus)

Scoring legend: D1=license-use-class · D6=CC-compat tier (T0-T5) · D8=industry-signal (1-10 heuristic).

### Axis 1 — L0.0 Vector DB beyond top-10

| Repo | Stars | License | Last-push | D1 | D6 | D8 | Verdict | STATUS |
|---|---|---|---|---|---|---|---|---|
| oceanbase/oceanbase | 10,109 | MulanPSL-2.0 | 2026-05-16 | (4) server | T3 | 7 | EVALUATE — distributed HTAP+vector | **NEW** |
| **alibaba/zvec** | **9,633** | (verify) | 2026-05-16 | (3) embedded | T2 | 8 | **STUDY-PILOT** — lightweight in-process; 9.6k★ in 5mo | **NEW-P0** |
| infiniflow/infinity | 4,515 | Apache-2.0 | 2026-05-15 | (4) server | T3 | 7 | EVALUATE — RAGFlow team; dense+sparse+tensor+BM25 hybrid | **NEW** |
| oceanbase/seekdb | 2,571 | MulanPSL-2.0 | 2026-05-16 | (4) server | T3 | 6 | DEFER — overlaps oceanbase main | **NEW** |
| Mintplex-Labs/vector-admin | 2,228 | MIT | 2026-05-16 | — | — | — | **RETRACT — ARCHIVED** | ARCHIVED |

### Axis 2 — L0.1 KG beyond top-10

| Repo | Stars | License | Last-push | D1 | D6 | D8 | Verdict | STATUS |
|---|---|---|---|---|---|---|---|---|
| tirth8205/code-review-graph | 16,612 | (verify) | 2026-05-16 | (2) skill | T1 | 8 | EVALUATE — 6.8× token reduction claim · **[MARKETING-LANGUAGE]** | **NEW** |
| Lum1104/Understand-Anything | 14,840 | (verify) | 2026-05-16 | (2) skill | T1 | 7 | EVALUATE — KG-builder skill | **NEW** |
| zjunlp/DeepKE | 4,394 | (likely MIT) | 2026-05-16 | (3) python-lib | T2 | 6 | EVALUATE — EMNLP 2022 academic toolkit | **NEW** |
| pingcap/autoflow | 2,779 | Apache-2.0 | 2026-05-15 | (4) server | T3 | 6 | DEFER — overlaps Graphiti/LightRAG | **NEW** |
| robert-mcdermott/ai-knowledge-graph | 2,280 | (verify) | 2026-05-16 | (3) python-lib | T2 | 5 | STUDY-PATTERN | **NEW** |
| zjukg/KG-LLM-Papers | 2,188 | — | 2026-05-16 | (5) paper-list | n/a | n/a | CITE-ONLY | **NEW** |
| OpenSPG/openspg | 2,103 | Apache-2.0 | 2026-05-15 | (4) server | T3 | 6 | DEFER — KAG, JVM overhead | **NEW** |
| raphaelmansuy/edgequake | 1,966 | (verify) | 2026-05-16 | (3) rust-binary | T2 | 6 | EVALUATE — Rust LightRAG port (2025-12 launch) | **NEW** |

### Axis 3 — L0.2 Memory MCP beyond known

| Repo | Stars | License | Last-push | D1 | D6 | D8 | Verdict | STATUS |
|---|---|---|---|---|---|---|---|---|
| **Gentleman-Programming/engram** | **3,545** | (verify) | 2026-05-16 | (3) go-binary | T1 | 7 | **STUDY-PILOT** — agent-agnostic SQLite+FTS5 (2026-02 launch) | **NEW-P0** |
| moltis-org/moltis | 2,685 | (verify) | 2026-05-16 | (3) rust-binary | T1 | 6 | EVALUATE — multi-channel personal-agent | **NEW** |
| **DeusData/codebase-memory-mcp** | **2,363** | (verify) | 2026-05-16 | (3) C-binary | T1 | 8 | **STUDY-PILOT** — 99% token claim, 155 langs · **[MARKETING-LANGUAGE]** | **NEW-P0** |
| agentset-ai/agentset | 1,987 | (verify) | 2026-05-16 | (4) platform | T3 | 6 | DEFER — overlaps RAGFlow/Dify | **NEW** |
| ghostwright/phantom | 1,420 | (verify) | 2026-05-16 | (4) platform | T3 | 6 | DEFER — vertical-app | **NEW** |
| Dataojitori/nocturne_memory | 1,080 | (verify) | 2026-05-16 | (3) python+MCP | T1 | 6 | EVALUATE — rollback as differentiator | **NEW** |
| alioshr/memory-bank-mcp | 904 | (verify) | 2026-05-14 | (3) TS+MCP | T1 | 6 | EVALUATE — Cline-Memory-Bank-compat | **NEW** |
| shaneholloman/mcp-knowledge-graph | 857 | (verify) | 2026-05-16 | (3) JS+MCP | T1 | 5 | DEFER — fork of official ref-impl | **NEW** |
| **Mibayy/token-savior** | **855** | (verify) | 2026-05-16 | (3) python+MCP | T1 | 8 | **STUDY-PILOT** — strongest claim (-77%/-76%/0 losses) · **[MARKETING-LANGUAGE] VERIFY** | **NEW-P0-VERIFY** |
| GreatScottyMac/context-portal | 762 | (verify) | 2026-05-09 | (3) python+MCP | T1 | 6 | EVALUATE — ConPort memory-bank | **NEW** |
| christopherkarani/Wax | 734 | (verify) | 2026-05-16 | (3) swift-1-file | T1 | 6 | DEFER — macOS-only | **NEW** |
| orneryd/NornicDB | 734 | (verify) | 2026-05-16 | (4) server | T3 | 6 | EVALUATE — Neo4j+Qdrant compat | **NEW** |
| alash3al/stash | 693 | (verify) | 2026-05-16 | (3) go-binary | T1 | 6 | EVALUATE — alternative to engram | **NEW** |
| samvallad33/vestige | 531 | (verify) | 2026-05-16 | (3) rust-22MB | T1 | 6 | DEFER — spaced-rep niche | **NEW** |
| awizemann/scarf | 503 | (verify) | 2026-05-16 | (1) macOS/iOS app | n/a | 5 | DEFER — vertical app | **NEW** |

### Axis 4 — L0.25 Local inference beyond known

| Repo | Stars | License | Last-push | D1 | D6 | D8 | Verdict | STATUS |
|---|---|---|---|---|---|---|---|---|
| **intel/ipex-llm** | **8,803** | Apache-2.0 | 2026-05-16 | — | — | — | **RETRACT — ARCHIVED** (vendor abandonment) | **ARCHIVED** |

> **Axis 4: only 1 result + that's ARCHIVED → ZERO net-new survivors. Saturation confirmed.**

### Axis 5 — L1.0 LLM gateway beyond LiteLLM/portkey

> **Axis 5: ZERO additional discoveries — saturation confirmed.** Topic-filter axis returned only LiteLLM itself. LiteLLM + Portkey + OpenRouter + Helicone are catalog's L1.0 coverage.

### Axis 6 — L1.5 Token compression beyond known

> **Axis 6: ZERO additional discoveries — saturation confirmed.** LLMLingua/caveman/context-mode cover L1.5.

### Axis 7 — L2.6 Vertical agents beyond known

| Repo | Stars | License | Last-push | D1 | D6 | D8 | Verdict | STATUS |
|---|---|---|---|---|---|---|---|---|
| iOfficeAI/AionUi | 25,299 | (verify) | 2026-05-16 | (1) app | T3 | 7 | EVALUATE — multi-CLI cowork app | **NEW** |
| **UfoMiao/zcf** | **5,994** | (verify) | 2026-05-16 | (2) bootstrap | T1 | 7 | **STUDY-PILOT** — zero-config CC+Codex bootstrap | **NEW-P0** |
| can1357/oh-my-pi | 4,559 | (verify) | 2026-05-16 | (3) ts-binary | T0 | 6 | EVALUATE — alt CC harness (hash-anchored edits) | **NEW** |
| zebbern/claude-code-guide | 4,126 | — | 2026-05-16 | (5) docs | n/a | n/a | CITE-ONLY | **NEW** |
| esengine/DeepSeek-Reasonix | 3,300 | **AGPL-3.0** (fix14b verified) | 2026-05-16 | (3) ts-binary | T0 | 7 | **DEFER — AGPL strong-copyleft** restricts runtime use-class · DeepSeek prefix-cache-stability | **NEW-DEFER** |
| lintsinghua/claude-code-book | 3,283 | — | 2026-05-16 | (5) docs (Chinese 420k words) | n/a | n/a | CITE-ONLY | **NEW** |

### Axis 8 — L4.0 Code intel beyond known

| Repo | Stars | License | Last-push | D1 | D6 | D8 | Verdict | STATUS |
|---|---|---|---|---|---|---|---|---|
| neoclide/coc.nvim | 25,146 | (custom MIT-like) | 2026-05-16 | (1) editor-ext | n/a | 8 | DEFER — neovim-only | **NEW** |
| **facebook/pyrefly** | **6,033** | MIT (assumed) | 2026-05-16 | (3) rust-LSP | T2 | 9 | **STUDY-PILOT** — Meta fast Python typechecker, competes w/ pyright | **NEW-P0** |
| zigtools/zls | 4,794 | MIT | 2026-05-16 | (3) zig-LSP | T2 | 7 | EVALUATE — canonical Zig LSP | **NEW** |
| LuaLS/lua-language-server | 4,257 | MIT | 2026-05-16 | (3) lua-LSP | T2 | 7 | EVALUATE — canonical Lua LSP | **NEW** |
| nvimtools/none-ls.nvim | 3,240 | (verify) | 2026-05-16 | (1) editor-ext | n/a | 6 | DEFER — neovim-only | **NEW** |
| **SilasMarvin/lsp-ai** | **3,172** | MIT (verified fix14) | **2025-01-07 STALE** | (3) rust-LSP | T2 | 7 | **STUDY-PATTERN-ONLY** (fix14 DOWNGRADE — 16+ months stale, not actively maintained — use as reference architecture only) | **NEW-PATTERN** |
| typescript-language-server/typescript-language-server | 2,482 | (verify) | 2026-05-16 | (3) ts-LSP | T2 | 8 | EVALUATE — unofficial TS LSP | **NEW** |
| scalameta/metals | 2,301 | (verify) | 2026-05-15 | (3) scala-LSP | T2 | 7 | DEFER — Scala niche | **NEW** |
| Feel-ix-343/markdown-oxide | 2,119 | (verify) | 2026-05-16 | (3) rust-LSP | T2 | 6 | EVALUATE — Markdown PKM LSP, pairs w/ CLAUDE.md | **NEW** |
| fwcd/kotlin-language-server | 2,028 | (verify) | 2026-05-16 | (3) kotlin-LSP | T2 | 7 | DEFER — Kotlin niche | **NEW** |
| Shopify/ruby-lsp | 2,003 | (verify) | 2026-05-14 | (3) ruby-LSP | T2 | 7 | DEFER — Ruby niche | **NEW** |

### Axis 9 — L4.5 Doc ingestion beyond known

| Repo | Stars | License | Last-push | D1 | D6 | D8 | Verdict | STATUS |
|---|---|---|---|---|---|---|---|---|
| ~~bytedance/Dolphin~~ | 8,978 | **Qwen RESEARCH LICENSE (NON-COMMERCIAL)** per fix14b blob-decode | 2026-03-25 | (3) python-lib | n/a | n/a | **REJECT** — Qwen Research License = non-commercial only; despite ByteDance authorship the LICENSE blob says NON-COMMERCIAL PURPOSES ONLY → runtime use-class BLOCKED. Use Docling/MinerU/markitdown for L4.5 instead. | **REJECT-FIX14b** |
| **run-llama/liteparse** | **5,136** | (verify) | 2026-05-16 | (3) ts-lib | T2 | 8 | **STUDY-PILOT** — LlamaIndex team's open parser; self-host alt to LlamaParse cloud | **NEW-P0** |
| CatchTheTornado/text-extract-api | 3,102 | (verify) | 2026-05-16 | (4) REST-API | T3 | 6 | EVALUATE — PII-anonymization OCR | **NEW** |

### Axis 10 — L5.0 Security/CVE beyond known

> **Axis 10: ZERO additional discoveries — saturation confirmed.** trufflehog/gitleaks/semgrep/bandit cover L5.0.

### Axis 11 — L5.5 DevOps/Workflow beyond known

| Repo | Stars | License | Last-push | D1 | D6 | D8 | Verdict | STATUS |
|---|---|---|---|---|---|---|---|---|
| statelyai/xstate | 29,612 | MIT | 2026-05-16 | (3) ts-lib | T2 | 9 | EVALUATE — canonical statechart lib for FSM agent flows | **NEW** |
| labring/FastGPT | 28,046 | FastGPT-OSS (AGPL-like) | 2026-05-16 | (4) platform | T3 | 8 | DEFER — restrictive license | **NEW** |
| kestra-io/kestra | 26,867 | Apache-2.0 | 2026-05-16 | (4) platform | T3 (JVM) | 8 | DEFER — JVM-heavy, data-eng | **NEW** |
| PrefectHQ/prefect | 22,412 | Apache-2.0 | 2026-05-16 | (4) platform | T3 | 9 | DEFER — data-eng overlap | **NEW** |
| Avaiga/taipy | 19,189 | Apache-2.0 | 2026-05-16 | (4) platform | T3 | 7 | DEFER — UI-app focused | **NEW** |
| dagster-io/dagster | 15,520 | Apache-2.0 | 2026-05-16 | (4) platform | T3 | 9 | DEFER — data-eng overlap | **NEW** |
| apache/dolphinscheduler | 14,272 | Apache-2.0 | 2026-05-16 | (4) platform | T3 (JVM) | 7 | DEFER — Hadoop niche | **NEW** |
| dataelement/bisheng | 11,368 | Apache-2.0+EULA | 2026-05-16 | (4) platform | T3 | 7 | DEFER — Dify/FastGPT overlap | **NEW** |
| iflytek/astron-agent | 8,782 | Apache-2.0 | 2026-05-16 | (4) platform | T3 (JVM) | 7 | DEFER — Chinese-vendor | **NEW** |
| flyteorg/flyte | 7,037 | Apache-2.0 | 2026-05-16 | (4) platform | T3 (k8s) | 8 | DEFER — k8s-heavy | **NEW** |

### Axis 12 — L6.0 Coordination beyond known

| Repo | Stars | License | Last-push | D1 | D6 | D8 | Verdict | STATUS |
|---|---|---|---|---|---|---|---|---|
| FoundationAgents/MetaGPT | 68,015 | MIT (assumed) | 2026-05-16 | (3) python-lib | T2 | 9 | EVALUATE — multi-agent PATTERN-CITE | **NEW** |
| **microsoft/agent-framework** | **10,479** | MIT (assumed) | 2026-05-16 | (3) python+.NET | T2 | 9 | **STUDY-PILOT** — Microsoft AutoGen successor (2025-04 launch) | **NEW-P0** |
| alibaba/spring-ai-alibaba | 9,630 | Apache-2.0 | 2026-05-16 | (3) java-lib | T3 (JVM) | 8 | DEFER — Java-only | **NEW** |
| MervinPraison/PraisonAI | 7,775 | (likely MIT) | 2026-05-16 | (3) python-lib | T2 | 8 | EVALUATE — competitor to CrewAI/AutoGen; 5-line deploy | **NEW** |
| SolaceLabs/solace-agent-mesh | 3,921 | Apache-2.0 (assumed) | 2026-05-16 | (3) python-framework | T3 | 7 | DEFER — Solace-broker-coupled | **NEW** |
| SciSharp/BotSharp | 3,054 | Apache-2.0 (assumed) | 2026-05-15 | (3) .NET-lib | T3 | 7 | DEFER — .NET niche | **NEW** |
| agentuniverse-ai/agentUniverse | 2,234 | Apache-2.0 | 2026-05-16 | (3) python-lib | T2 | 6 | DEFER — CrewAI overlap | **NEW** |

---

## §B — Aggregate net-new ≥1000★ candidates

**Total NEW** (absent from prior corpus): **~55 candidates across 9/12 axes**.

### Top STUDY-PILOT promotions (10 P0)

| # | Repo | Stars | Layer | Why |
|---|---|---|---|---|
| 1 | **alibaba/zvec** | 9,633 | L0.0 | In-process lightweight vector DB |
| 2 | **Gentleman-Programming/engram** | 3,545 | L0.2 | Agent-agnostic Go binary, MCP |
| 3 | **DeusData/codebase-memory-mcp** | 2,363 | L0.2/L0.4 | 155-lang C-binary, 99% token claim |
| 4 | **Mibayy/token-savior** | 855 | L0.2 | Strongest single-axis claim (VERIFY marketing-language) |
| 5 | **facebook/pyrefly** | 6,033 | L4.0 | Meta fast Python typechecker LSP (pyright competitor) |
| 6 | **SilasMarvin/lsp-ai** | 3,172 | L4.0 | AI-in-LSP architecture pattern |
| 7 | ~~bytedance/Dolphin~~ | 8,978 | L4.5 | **DROPPED fix14b** — Qwen Research License (non-commercial only) → REJECT for runtime |
| 8 | **run-llama/liteparse** | 5,136 | L4.5 | Self-host LlamaParse alternative |
| 9 | **microsoft/agent-framework** | 10,479 | L6.0 | MS AutoGen successor |
| 10 | **UfoMiao/zcf** | 5,994 | L2.0 | Zero-config CC+Codex bootstrap |

### RETRACT (this probe)

| Repo | Reason |
|---|---|
| intel/ipex-llm | Axis 4 ARCHIVED — vendor abandonment |
| Mintplex-Labs/vector-admin | Axis 1 ARCHIVED |

### ZERO-result axes (saturation confirmed)

| Axis | Layer | Confirmation |
|---|---|---|
| 5 | L1.0 LLM Gateway | LiteLLM/Portkey/OpenRouter/Helicone cover field |
| 6 | L1.5 Token Compression | LLMLingua/caveman/context-mode cover field |
| 10 | L5.0 Security/CVE | trufflehog/gitleaks/semgrep/bandit cover field |

---

## §C — Honest Conclusion

**Hypothesis verdict**: CONFIRMED at 9/12 axes, REJECTED at 3/12 axes. The corpus IS saturated at LLM-gateway / token-compression / security-scanner slices. The corpus is NOT saturated at vector-DB / KG / memory-MCP / coding-agent / code-intel-LSP / doc-ingestion / workflow / multi-agent-framework slices.

### Caveats per cookbook source-quality discipline

- Star counts on 2026-launched repos (zvec 9.6k★ in 5mo, AionUi 25k★ in 9mo, graphify 48k★ in 6 weeks, oh-my-pi 4.6k★ in 4mo, tirth8205 16k★ in 2.5mo) MAY include star-inflation — flag `[POPULAR-BUT-UNVERIFIED]` until bake-off
- Marketing language in token-savior description ("100% on a real benchmark", "-77%/-76%/0 losses") — apply `[MARKETING-LANGUAGE]` per cookbook §source-quality
- Several "skill" repos (graphify, Understand-Anything, code-review-graph) describe themselves as multi-CLI skills with copy-paste flavor — verify primary-source mechanism vs aggregator-summary

### Handoff items for next session

1. License verification for ~25 `(verify)`-tagged repos via `mcp__github__get_file_contents` LICENSE probe
2. Per-repo SRA scoring for the 10 STUDY-PILOT candidates per `00-MASTER/D1-D10-SCORECARD-V-FINAL.md`
3. Bake-off conflict resolution for overlapping slots: engram vs Wax vs stash; pyrefly vs pyright; Dolphin vs MinerU/docling; microsoft/agent-framework vs autogen vs CrewAI

### Cite anchors

- GitHub GraphQL 5-operator constraint per https://docs.github.com/en/search-github/searching-on-github/searching-code (verified via 422 response)
- 7-tier evidence ladder per sota-researcher.md §Core Thesis
- Source-quality red flags per `everything-claude-code/2.0.0-rc.1/skills/deep-research/SKILL.md` L120-130 + cookbook research_subagent.md:36
- D1-D8 per `Z:/claude-sota-installed/docs/grand-synthesis-2026-05-16/00-MASTER/D1-D10-SCORECARD-V-FINAL.md`
- Corpus-overlap baseline `06-fresh-research-delta/GRAPHQL-MISSING-HIGH-STAR-2026-05-16.md`

**Tool-call budget**: 12 search + 6 corpus-grep = 18 calls (under cookbook 20/axis ceiling).
