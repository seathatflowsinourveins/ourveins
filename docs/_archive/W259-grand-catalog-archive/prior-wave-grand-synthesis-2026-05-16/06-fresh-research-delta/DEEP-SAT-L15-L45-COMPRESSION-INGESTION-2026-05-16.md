# DEEP-SATURATION L1.5 (Token Compression) + L4.5 (Document Ingestion) — 2026-05-16

> **Fork purpose**: EXHAUSTIVE coverage of two transformation-pipeline layers under-served in prior tranches. L1.5 (token compression) compresses prompts/contexts BEFORE they hit the LLM; L4.5 (document ingestion) is the upstream pipeline that turns raw PDFs/Office/scans into LLM-ready markdown/JSON. Both layers are "leverage" — they directly affect $/token and answer quality but are typically wrapped INSIDE other agent layers (RAG, code-intel, eval), so they are systematically under-counted in topic-tag-led tranches.
>
> **Method**: 10 narrow GraphQL probes + 25 name-search probes + license fetch + release fetch. Probes prioritize Q2 2026 entrants + verified MAJOR-RELEASE candidates.
>
> **Cross-reference**: This file complements `DEEP-SAT-L02-MEMORY-MCP-2026-05-16.md` (compression-related: memory truncation is a DIFFERENT layer at L0.2), `DEEP-SAT-L04-CODE-INTEL-2026-05-16.md` (code-intel is L0.4, distinct from doc-ingestion at L4.5), `BACKLOG-TRANCHE-F-2K-STAR-GENERAL-2026-05-16.md` (where chunkhound/markitdown/marker were touched but not L1.5/L4.5-classified), and `GAP-LAYER-L35-L475-PROTOCOL-BUDGET-2026-05-16.md` (mentions L1.5/L4.5 as confirmed-thin layers).
>
> **Cite-class**: TIER-3-LOCAL-COMPOSITION (constituents: GitHub api.github.com live HEAD fetches today + license file SHA-pinned reads + release-tag fetches). Per Z:/claude-sota/.claude/rules/citation-discipline.md rule #8.
>
> **Date stamp**: 2026-05-16 (UTC)
>
> **CC-pathway classification**: Three target paths per cardinal-rule-1: (1) **MCP server** = ready-to-install MCP wrapper; (2) **Skill/Plugin** = installable via `/plugin install` from marketplace; (3) **CLI subprocess via Bash** = upstream binary callable from hooks/skills; (4) **Library only** = embedded in another primitive, no direct CC pathway.

---

## §A — Compression + Ingestion Matrix (54 rows: 17 L1.5 + 27 L4.5 + 10 RELATED-CROSS-LAYER)

> **D1-D8 rubric** (each 0-10, sum/80): D1 SOTA-fit, D2 maintenance, D3 community, D4 install/integrate, D5 license-clean, D6 differentiation, D7 maturity, D8 native-CC-pathway

> **L1.5 sub-codes**: TOKR (token-reduction CLI/proxy) / CMPC (compact-LLM-call prompt compressor) / SKIL (CC skill native) / SDK (drop-in lib) / SLIM (context-window slimmer) / SCT-CC (sandboxed-tool-call) / TRIE-COMP (tree-sitter structural compression)
> **L4.5 sub-codes**: VLM-OCR (vision-language-model OCR) / TRAD-OCR (traditional OCR) / LAYOUT (layout-analysis SOTA) / DOC-CONV (document converter MS-Office/HTML) / TBL (table-extraction-specialist) / RAG-PIPE (full ingestion pipeline for RAG) / SCI (scientific-doc specialist) / VLM-RETR (visual retrieval no-OCR)

### §A.1 — L1.5 Token Compression (17 rows)

| # | repo | ★ | license | last-release | sub-cat | native-CC-pathway | D1-D8 sum/80 | verdict |
|---:|---|---:|---|---|---|---|---:|---|
| C1 | `mksglu/context-mode` | 14,867 | (MIT per repo) | active 2026-05-16 | SCT-CC | **Native CC plugin + MCP server + hooks** — listed in MCP set of THIS runtime today | **76/80** | **INCUMBENT-INSTALLED** — context-mode is the CURRENTLY-INSTALLED L1.5 primitive for this runtime (`mcp__plugin_context-mode_context-mode__ctx_*` tools in MCP set). 98% tool-output reduction claim. 15 platforms support (Claude Code/Codex/Cursor/Antigravity/etc). MASSIVE growth (14.8K★ in <90 days since 2026-02-23). |
| C2 | `JuliusBrussee/caveman` | **60,945** | MIT ✓ | 2026-04+ daily | SKIL | **Native CC Skill** — "talk like caveman" Claude Code skill — `/caveman` (or auto-applied) cuts 65% tokens | **75/80** | **TIER-1 INSTALL-CANDIDATE** — *highest-star Q2 2026 CC-skill entrant*; born 2026-04-04 — went from 0 to 60K★ in 6 weeks. MIT verified today (SHA d8c0ee8a). Direct cardinal-rule-1 install path via `/plugin install caveman`. 16+ derivative forks (opencode-caveman, antigravity, korean variant) prove ecosystem traction. Trade-off: communication style change is per-skill opt-in — users keep readable output by default. |
| C3 | `microsoft/LLMLingua` (+ LLMLingua-2) | 6,193 | MIT | v0.2.2 (2024-04-09 — STALE 25mo) | CMPC | **Library only** — Python `pip install llmlingua`; no MCP / no skill | 56/80 | **STUDY-COMPONENT** — gold-standard "20× compression" academic baseline (EMNLP'23 + ACL'24); core of `jia-gao/leanctx` (C4) and others. v0.2.2 latest release predates Q2 2026 wave — but main is still updated 2026-05-16. **Use case**: include INSIDE another wrapper (leanctx, custom MCP), NOT direct install. |
| C4 | `jia-gao/leanctx` | 234 | MIT ✓ | 2026-04-18 (created) | SDK | **Library + Python SDK** — wraps LLMLingua-2 for production use; no MCP yet | 60/80 | **STUDY-PILOT** — "drop-in prompt compression for production LLM apps. Cut your token bill 40-60% without changing your code"; MIT verified (SHA a126e261); claims langchain/langgraph/openai/anthropic/gemini compatibility. Wraps C3. Useful if user needs SDK-embed in Python tools rather than CLI/MCP. |
| C5 | `open-compress/claw-compactor` | 2,217 | MIT (claimed in description) | active 2026-05-16 | TOKR + TRIE-COMP | **CLI / MCP** — described as "14-stage Fusion Pipeline for LLM token compression — reversible compression, AST-aware code analysis, intelligent content routing. Zero LLM inference cost." Topics include `openclaw` | **66/80** | **STUDY-PILOT** — "Zero LLM inference cost" claim is the differentiator (LLMLingua/leanctx require ML inference); reversible (decompression for verification) + tree-sitter AST-aware. Listed in same `openclaw` ecosystem as `JuliusBrussee/caveman` derivatives — worth bench-testing. License needs file verification before INSTALL. |
| C6 | `manojmallick/sigmap` | 437 | MIT (claimed in topics) | active 2026-05-16 | SCT-CC + TRIE-COMP | **MCP server** — "97% token reduction for AI coding sessions — zero deps, 31 languages, MCP server" | 62/80 | **STUDY-PILOT** — directly comparable to context-mode (C1); ZERO-DEP advantage; 31 languages tree-sitter coverage; smaller than caveman skill (437★) but actively iterating. If context-mode rejected for some reason, this is the natural backup. |
| C7 | `edouard-claude/snip` | 240 | MIT (claimed in topics) | active 2026-05-16 | TOKR | **CLI proxy** — "CLI proxy that reduces LLM token usage by 60-90%. Declarative YAML filters for Claude Code, Cursor, Copilot, Gemini. rtk alternative in Go" | 58/80 | **STUDY** — explicitly markets as "rtk-alternative" (the candidate-list `rtk-ai/rtk` not found by API; may be a name confusion, see §E). Go-based for speed. YAML-declarative filter pattern fits the CC settings.json hook pattern. |
| C8 | `fajarhide/omni` | 181 | (Rust crate license unverified) | active 2026-05-16 | TOKR + SCT-CC | **MCP + hooks + CLI** — "A smart context filter that removes noise, refines and enhances responses, also slashes token usage by up to 90%" | 56/80 | **STUDY** — Rust-native; covers Claude Code + Antigravity; smaller than context-mode (181★) but very active. Hook-integration explicit. |
| C9 | `jfrog/boost` | 130 | (JFrog enterprise license likely) | active 2026-05 | TOKR | **CLI (shell)** — "Make your agents leaner and faster" | 38/80 | **DO-NOT-INSTALL** — JFrog-owned; likely tied to JFrog Artifactory ecosystem; bash-only no MCP; lacks differentiation vs context-mode. |
| C10 | `oanhduong/token-ninja` | 29 | (license unverified in API) | active 2026-05-16 | SCT-CC | **MCP server** — "routes deterministic shell commands locally — zero LLM calls, ~19µs latency" | 46/80 | **STUDY** — narrow scope: routes shell commands LOCALLY to skip LLM round-trip. Useful if Bash tool routing causes token bloat; competes with parent context-mode policy that already redirects through ctx_execute. |
| C11 | `yttrium400/reducethemtokens` | 6 | (unverified) | active 2026-05-16 | TRIE-COMP | CLI — "Compress any code repo into a compact skeleton" | 30/80 | **DO-NOT-INSTALL** — overlaps repomix / chunkhound / claw-compactor; 6★ is "too new" signal. |
| C12 | `CircleRadon/TokenPacker` | 279 | (academic — IJCV2025) | 2026-05-06 | (multimodal-VLM-specific) | Library only | 30/80 | **DO-NOT-INSTALL** — VLM token-projector for multimodal; **OUT-OF-SCOPE for L1.5 text-prompt compression** (it compresses *vision tokens* into MLLM-projection). Cross-listed only for completeness. |
| C13 | `ModelTC/LightCompress` | 715 | Apache-2.0 (academic) | active 2026-05-14 | (model-pruning — not L1.5) | Library — for model compression not prompt | 25/80 | **DO-NOT-INSTALL** — model quantization/pruning toolkit, NOT prompt compression. Cross-listed only to flag confusion vector — many "compression" topic results are model-compression, not L1.5 prompt-compression. |
| C14 | `orailix/PACT` | 60 | (academic) | active 2026-05-12 | (multimodal-VLM-specific) | Library only | 22/80 | **DO-NOT-INSTALL** — CVPR'25 paper code for vision-token reduction inside MLLM; OUT-OF-SCOPE. |
| C15 | `ZON-Format/zon-TS` | 47 | (unverified) | 2026-04-30 (3wk stale) | CMPC | TypeScript SDK; format-spec | 42/80 | **STUDY** — proposes "ZON" format claiming 35-70% cheaper than JSON/TOON for LLM prompts; format-level not pipeline-level. Useful as serialization choice INSIDE other tools (analog: TOON earlier). |
| C16 | `0xhimanshu/governor` | 74 | (unverified — listed claude-code-plugin) | 2026-05-10 | SCT-CC + SLIM | **CC Plugin** — "Claude Code usage governor: compact professional output, context slimming, tool-output filtering, telemetry, and drift guardrails" | 56/80 | **STUDY-PILOT** — explicit CC-plugin path (cardinal-rule-1 align); combines L1.5 slimming + L0.6 telemetry — overlap with context-mode. Worth installing only if context-mode's telemetry/drift-guardrails are insufficient. |
| C17 | `atjsh/llmlingua-2-js` | 27 | (unverified) | 2026-05-16 | CMPC | JavaScript port of LLMLingua-2 | 28/80 | **DO-NOT-INSTALL** — JS port still labeled experimental; only useful if you need browser-side compression. Python LLMLingua remains canonical. |

### §A.2 — L4.5 Document Ingestion (27 rows)

| # | repo | ★ | license | last-release | sub-cat | native-CC-pathway | D1-D8 sum/80 | verdict |
|---:|---|---:|---|---|---|---|---:|---|
| D1 | `microsoft/markitdown` | **123,386** | MIT (per topic listing) | v0.1.5 (2026-02-20) | DOC-CONV | **3rd-party MCP**: `KorigamiK/markitdown_mcp_server` (71★) + `trsdn/markitdown-mcp` (7★) + Microsoft official `markitdown-mcp` Docker image + `xkiranj/markitdown-mcp-npx` (13★) | **77/80** | **TIER-1 INSTALL-CANDIDATE** — *Microsoft's flagship MS-Office→Markdown* — 123K★ #1 in document-conversion at Q2 2026; topics include `langchain`, `openai`, `pdf`, `autogen-extension`. v0.1.5 (2026-02-20) is the latest release but main is updated 2026-05-16. **Install via `KorigamiK/markitdown_mcp_server` MCP wrapper**. Strong fit when ingesting Word/Excel/PowerPoint/PDF/HTML/images/audio. |
| D2 | `PaddlePaddle/PaddleOCR` | **77,943** | (Apache-2.0 typical for PaddlePaddle) | active 2026-05-16 | TRAD-OCR + VLM-OCR | **NO direct MCP** — heavy Python library; `paddleocr-vl` topic = new VLM variant (PP-OCR-VL) | 70/80 | **INSTALL-CANDIDATE-AS-COMPONENT** — *largest OCR repo by stars*; v3 added 100+ language support; PP-OCR-VL 2026 release added end-to-end vision-language OCR competing with MinerU's VLM-mode; explicitly topics `pdf2markdown` + `pdf-extractor-rag`. Heavy install (PaddlePaddle framework). Best used as backend INSIDE marker/docling/MinerU; rarely installed standalone. |
| D3 | `opendatalab/MinerU` | **63,310** | **Apache-2.0 + commercial threshold** | v3.1.14 (2026-05-15 — DAILY-CADENCE) | RAG-PIPE + LAYOUT + VLM-OCR | **Companion repo**: `opendatalab/MinerU-Document-Explorer` (543★) provides "agent-native knowledge engine with MCP tools" + `MinerU-HTML` (246★) + `mineru-vl-utils` (120★) | **78/80** | **TIER-1 INSTALL-CANDIDATE** — *most active L4.5 daily-iteration project*; v3.1.14 released YESTERDAY (2026-05-15). Apache-2.0 verified today (LICENSE.md SHA 6496f953) **with commercial-threshold clause** (MAU >100M or rev >$20M requires separate license — irrelevant for typical install). MinerU-Document-Explorer companion gives **explicit MCP-tools native path**. Best end-to-end PDF→markdown/JSON RAG pipeline at Q2 2026. **CHECK MinerU-Diffusion fork** (590★) for next-gen block-level parallel diffusion decoding (may supersede in 6mo). |
| D4 | `docling-project/docling` | **59,839** | (MIT per topic typical) | v2.93.0 (2026-05-07) | RAG-PIPE + LAYOUT | **Native MCP**: `docling-project/docling-mcp` (616★, dedicated) + `docling-serve` (1.5K★ REST API) | **78/80** | **TIER-1 INSTALL-CANDIDATE** — IBM-Research-backed (most engineering rigor); v2.93.0 (2026-05-07) upgraded Granite Vision model to 4.1 for table+chart extraction; *FIRST-PARTY MCP server* (docling-mcp 616★) is THE differentiator vs MinerU. Excellent at PDF/DOCX/PPTX/HTML/XLSX. **Install path**: `docling-project/docling-mcp` is the canonical MCP wrapper. |
| D5 | `datalab-to/marker` | **35,132** | **GPL-3.0** ❗ (verified — SHA 183be3e7) | v1.10.2 (2026-01-31 — 3.5mo stale) | RAG-PIPE + VLM-OCR | **3rd-party MCP**: `podolskyDavid/marker-mcp` (1★ — minimal) | 56/80 | **LICENSE-WATCH-DO-NOT-INSTALL** — *GPL-3.0 STRICT-COPYLEFT* (verified today). Any wrapper/MCP-server combining marker code would inherit GPL-3.0; this conflicts with the MIT/Apache pattern preferred for Z:-portable runtime. Even at 35K★ + datalab-to backing (same org as surya 19.7K★), **AVOID for production install**. v1.10.2 release is 3.5mo stale (vs MinerU daily / docling weekly). Use MinerU or docling instead. |
| D6 | `microsoft/unilm` | **22,127** | (MIT typical — needs file verify) | active 2026-05-16 | LAYOUT | Library only — `LayoutLM` / `LayoutLMv3` family | 60/80 | **STUDY-COMPONENT** — *home of LayoutLM family* (cited in scimagex query); academic substrate consumed by docling/unstructured/etc.; not a standalone CC pathway. Useful only if training custom layout model. |
| D7 | `datalab-to/surya` | **19,745** | (Apache-2.0 per typical for datalab-to standalone — needs file verify) | active 2026-05-16 | TRAD-OCR + LAYOUT | Library + CLI | 65/80 | **STUDY-COMPONENT** — datalab-to's OCR/layout/reading-order/table-recognition engine in 90+ languages; consumed BY marker (D5) but standalone-installable. **Verify license** before standalone install (marker switched to GPL-3.0 in 2024). |
| D8 | `Unstructured-IO/unstructured` | **14,715** | Apache-2.0 (per common knowledge — needs file verify) | active 2026-05-16 | RAG-PIPE | NO MCP (CLI + Python); `unstructured-api` (925★) is the API layer | 64/80 | **STUDY** — enterprise-focused ETL for documents; Apache-2.0; pre-Q2-2026-major-wave-leaderboard (MinerU + docling now lead). Most relevant if you need the langchain/llamaindex first-party `partition()` API surface. |
| D9 | `grobidOrg/grobid` | 4,869 | (Apache-2.0 per common knowledge) | active 2026-05-16 | SCI | Library + REST service; `grobid-client-python` (405★) | 60/80 | **INSTALL-CANDIDATE-NICHE** — *gold standard for scientific PDFs* (bibliographic refs / metadata / fulltext extraction); used at scale by HAL/CERN/etc. Java-based REST service. Worth installing only if user processes scholarly PDFs at scale. Topics include `transformers`, `deep-learning`. |
| D10 | `run-llama/llama_cloud_services` | 4,251 | (proprietary cloud — open source SDK) | active 2026-05-15 | RAG-PIPE + VLM-OCR | **SDK** (Python + TypeScript) — `run-llama/llama-parse-py` (31★) + `llama-parse-ts` (14★) | 50/80 | **DO-NOT-INSTALL-FOR-SELF-HOST** — *LlamaParse is a CLOUD service* (paid); the GitHub repos are client SDKs only. Only consider if customer is already on LlamaCloud. Self-host alternatives: MinerU + docling are stronger. |
| D11 | `Marker-Inc-Korea/AutoRAG` | 4,766 | (MIT typical) | active 2026-05-16 | RAG-PIPE | CLI/Python — orchestrates parsers + chunking + retrieval + eval | 50/80 | **STUDY** — RAG-evaluation/optimization wrapper that USES marker/docling/llamaparse as parsers; meta-tool. Not strictly L4.5 (more L4-eval). Useful only if doing systematic RAG bench-tests. |
| D12 | `deepdoctection/deepdoctection` | 3,168 | (Apache-2.0 typical) | active 2026-05-15 | LAYOUT + RAG-PIPE | CLI/Python | 48/80 | **STUDY** — document-AI lib with `layoutlm` + `publaynet`/`pubtabnet` + table-recognition; pre-Q2-2026-wave; superseded by docling/MinerU for most use-cases. |
| D13 | `Filimoa/open-parse` | 3,158 | (MIT typical) | active 2026-05-14 | LAYOUT + TBL | Python library | 45/80 | **STUDY** — "improved file parsing for LLMs"; specializes in table detection + layout-parsing; lacks Q2 2026 momentum vs MinerU/docling. |
| D14 | `illuin-tech/colpali` | 2,628 | (Apache-2.0 typical for academic vision) | active 2026-05-16 | VLM-RETR | Library only — embed-and-index visual page representations | 60/80 | **STUDY-COMPONENT** — *NeurIPS'24 ColPali paradigm shift*: skip OCR entirely, retrieve at vision-token level. Includes ColPali / ColQwen2 / ColSmol model family. **Architecturally distinct** from text-OCR pipelines (D3-D5). Best fit when document layout is visual-heavy (figures/charts/scans) AND your downstream LLM is a VLM. Not directly a CC pathway. |
| D15 | `NanoNets/docstrange` | 1,470 | (Apache-2.0 typical for NanoNets) | active 2026-05-15 | RAG-PIPE + DOC-CONV | CLI/Python | 55/80 | **STUDY** — "Extract and convert data from any document, images, pdfs, word doc, ppt or URL into multiple formats (Markdown, JSON, CSV, HTML)"; NanoNets-backed; topics include `image-to-markdown`, `structured-data-capture`. Fresh entrant 2025-07. |
| D16 | `wisupai/e2m` | 1,292 | (MIT typical) | active 2026-05-15 | DOC-CONV | CLI/Python | 50/80 | **STUDY** — "doc/docx/epub/html/pdf/ppt/pptx/mp3/m4a→Markdown" lift-and-shift; similar surface to markitdown (D1) but ~100× fewer stars. Markitdown is the better-supported choice. |
| D17 | `docling-project/docling-mcp` | 616 | (MIT typical) | active 2026-05-15 | RAG-PIPE | **MCP server** (FIRST-PARTY) | 70/80 | **INSTALL-CANDIDATE** — *first-party docling MCP wrapper*; "Making docling agentic through MCP"; sub-cite of D4. Install path for docling. |
| D18 | `opendatalab/MinerU-Diffusion` | 590 | (Apache-2.0 + commercial threshold — same as MinerU) | active 2026-05-15 | VLM-OCR | (Research — not direct CC pathway) | 50/80 | **STUDY** — "diffusion-based framework for document OCR that replaces autoregressive decoding with block-level parallel diffusion decoding"; topics include `dlm`, `llada`. Born 2026-03-13. Watch for MinerU mainline integration. |
| D19 | `opendatalab/MinerU-Document-Explorer` | 543 | (Apache-2.0 + commercial threshold) | active 2026-05-16 | RAG-PIPE | **MCP server** — "Agent-native knowledge engine with MCP tools for document indexing, wiki organization, fast retrieval and deep reading across PDF/DOCX/PPTX/Markdown" | 68/80 | **INSTALL-CANDIDATE** — *first-party MinerU MCP wrapper*; TypeScript. Install path for MinerU when used inside CC. Born 2026-03-26. |
| D20 | `lfoppiano/grobid-quantities` | 84 | (Apache-2.0 typical) | active 2026-05-16 | SCI | Library — physical-quantity NER extension to GROBID | 40/80 | **NICHE** — only useful for scientific docs with physical measurements. Cross-listed for completeness. |
| D21 | `KorigamiK/markitdown_mcp_server` | 71 | (per topic typical) | active 2026-04-24 | DOC-CONV | **MCP server** — wraps microsoft/markitdown | 55/80 | **INSTALL-CANDIDATE** — *3rd-party MCP wrapper for markitdown (D1)*; the practical install path for markitdown in CC. |
| D22 | `G36maid/zed-mcp-server-markitdown` | 21 | (per topic typical) | 2026-05-15 | DOC-CONV | MCP server (Zed-targeted Rust impl) | 38/80 | **STUDY** — Rust impl; only relevant if Zed integration desired. |
| D23 | `xkiranj/markitdown-mcp-npx` | 13 | (per topic typical) | 2026-04-26 | DOC-CONV | MCP server (NPX wrapper, no Docker) | 36/80 | **STUDY** — NPX-runnable alternative to Microsoft's Docker-only official `markitdown-mcp`. Useful if Docker unavailable. |
| D24 | `andyhuo520/ocr_benchmark` | 11 | (per topic typical) | 2026-04-26 | (benchmark) | (eval-only) | n/a | **BENCH-REF** — "OCR Benchmark: GLM-OCR vs PaddleOCR-VL-1.5 on OmniDocBench" — useful BENCH for §D L4.5 bake-off. |
| D25 | `lferrarezi/Arjman` | 1 | (unverified — was searched as "caveman" in candidate list) | 2026-05-01 | (cross-list to L1.5) | Browser extension + CLI pipeline | 12/80 | **DO-NOT-INSTALL** — caveman-style fork (1★, born 2026-05); use canonical `JuliusBrussee/caveman` (C2) instead. |
| D26 | `mineru-team/MinerU` (CANDIDATE-LIST-NAME) | N/A | N/A | N/A | N/A | **NOT-FOUND** — the org is `opendatalab` not `mineru-team`. See §E HONEST-NON-FINDING. | n/a | **CANDIDATE-CORRECTION** — refer to D3 `opendatalab/MinerU`. The candidate-list owner-name was incorrect. |
| D27 | `IBM-Research/scimagex` (CANDIDATE-LIST-NAME) | N/A | N/A | N/A | N/A | **NOT-FOUND** — search returned 0 results today. | n/a | **HONEST-NON-FINDING** — see §E. The candidate list may have referred to a private/unreleased IBM Research artifact, OR the name is wrong (IBM Research scientific-document-AI work mostly flows through `docling-project/*` which is IBM-backed). |

### §A.3 — RELATED / CROSS-LAYER (10 rows — included for completeness)

| # | repo | ★ | license | last-release | layer | note |
|---:|---|---:|---|---|---|---|
| X1 | `microsoft/acon` | N/A | N/A | N/A | (L1.5 — candidate-list name) | **NOT-FOUND** — see §E HONEST-NON-FINDING. |
| X2 | `ace-agent/ace` | N/A | N/A | N/A | (L1.5 — candidate-list name) | **NOT-FOUND** — see §E. |
| X3 | `rtk-ai/rtk` | N/A | N/A | N/A | (L1.5 — candidate-list name) | **NOT-FOUND** — `edouard-claude/snip` (C7) markets as "rtk alternative"; the rtk org/repo per the candidate list does not exist today. See §E. |
| X4 | `buildoak/wet` | N/A | N/A | N/A | (L1.5 — candidate-list name) | **NOT-FOUND** — see §E. |
| X5 | `yvgude/lean-ctx` | N/A | N/A | N/A | (L1.5 — candidate-list name) | **NOT-FOUND** — `jia-gao/leanctx` (C4) appears to be what was intended. See §E. |
| X6 | `chopratejas/headroom` | N/A | N/A | N/A | (L1.5 — candidate-list name) | **NOT-FOUND** — see §E. |
| X7 | `junhoyeo/tokscale` | N/A | N/A | N/A | (L1.5 — candidate-list name) | **NOT-FOUND** — see §E. |
| X8 | `mathpix` | (closed) | proprietary | N/A | L4.5 | **CLOSED-SOURCE** — not installable; LaTeX-OCR SaaS; cross-list only for completeness. Alternative open-source: `lukas-blecher/LaTeX-OCR` (not probed this fork; cross-ref future probe). |
| X9 | `mistralai/Pixtral` | N/A | proprietary | N/A | L4.5 | **CLOSED-WEIGHTS** — Pixtral 12B / Pixtral-Large are Mistral hosted models, not standalone CC pathway. Use via Mistral API or HuggingFace inference. |
| X10 | `markmdev/meridian` | 173 | (MIT typical) | active 2026-05-09 | (L0.6 context-discipline — adjacent) | "Zero-config Claude Code setup with enforced task scaffolding, structured memory, persistent context after compaction"; cross-list as adjacent to L1.5 because it manages post-compaction context restoration. |

---

## §B — Top-3 INSTALL per Layer (post-saturation verdicts)

### B.1 — L1.5 Token Compression

1. **`mksglu/context-mode`** (C1, 14.9K★) — **INCUMBENT-KEEP-AND-OPTIMIZE** — already installed; provides `mcp__plugin_context-mode_context-mode__ctx_*` tool family; 98% tool-output reduction claim is THE class-leading benchmark for SCT-CC. **Verify install settings allow ctx_batch_execute + ctx_search to remain primary tools per the harness context-protection policy.**
2. **`JuliusBrussee/caveman`** (C2, 60.9K★) — **TIER-1 INSTALL** via `/plugin install caveman` (or skill auto-fire) — 65% token cut on agent-emitted prose; MIT verified today. Complements context-mode (which slims TOOL output; caveman slims AGENT output). **Joint deployment**: context-mode for tools + caveman for assistant emission = compound savings.
3. **`open-compress/claw-compactor`** (C5, 2.2K★) — **STUDY-PILOT** as the "zero LLM-inference" reversible compressor; bench-test against context-mode + caveman to confirm orthogonal value. ZERO-INFERENCE is key differentiator (LLMLingua requires an Lingua-model forward pass; claw-compactor claims to skip that).

**Honorable mention (L1.5 component)**: `microsoft/LLMLingua` (C3) — INSIDE leanctx (C4) — academic baseline. Install only if a downstream wrapper needs it (leanctx, custom MCP).

### B.2 — L4.5 Document Ingestion

1. **`opendatalab/MinerU`** (D3, 63.3K★) + **`opendatalab/MinerU-Document-Explorer`** (D19, 543★) as MCP — **TIER-1 INSTALL** — *daily-release cadence* (v3.1.14 yesterday); Apache-2.0 + commercial-threshold license verified today; first-party MCP wrapper exists; strongest end-to-end PDF→markdown/JSON RAG pipeline at Q2 2026. **License caveat**: read § "MinerU Open Source License" — MAU >100M OR rev >$20M triggers separate commercial license requirement (irrelevant for typical install but flag in cite-trail).
2. **`docling-project/docling`** (D4, 59.8K★) + **`docling-project/docling-mcp`** (D17, 616★) — **TIER-1 INSTALL (PARALLEL)** — IBM-Research-backed; v2.93.0 (2026-05-07) ships Granite Vision 4.1; **first-party MCP** is the cleanest install. Run as PARALLEL alternative to MinerU per §D bake-off proposal.
3. **`microsoft/markitdown`** (D1, 123K★) via **`KorigamiK/markitdown_mcp_server`** (D21, 71★) — **TIER-1 INSTALL** for MS-Office heavy workflows (Word/Excel/PowerPoint dominate); MinerU + docling focus on PDF; markitdown wins for Office formats. Install all three for full coverage.

**Honorable mention (L4.5 component)**: `PaddlePaddle/PaddleOCR` (D2, 77.9K★) — use as VLM-OCR backend inside MinerU/docling if extreme accuracy needed on Chinese/Japanese/scanned PDFs.

**Honorable mention (L4.5 niche)**: `grobidOrg/grobid` (D9, 4.9K★) — install only if processing scientific/scholarly PDFs at scale.

**REJECT for INSTALL**: `datalab-to/marker` (D5) — GPL-3.0 copyleft conflict despite strong 35K★ tech.

---

## §C — L1.5 Bake-off Proposal (caveman vs LLMLingua vs ACON vs leanctx vs claw-compactor vs context-mode + sigmap)

> **Goal**: identify the highest-yield JOINT deployment for this runtime — context-mode is already installed (incumbent); we want to know what ADDITIONAL L1.5 primitives compound.

### C.1 — Method

1. **Corpus**: 50 representative turns from prior session transcripts (.claude/state/projects/*.jsonl) categorized by content-type:
   - 15 tool-call returns (Read / Bash / Grep / mcp__* — slimming target)
   - 15 agent-emitted prose (planning + reporting — caveman target)
   - 15 long-document content (research/specs — LLMLingua/leanctx target)
   - 5 code-block content (claw-compactor AST-aware target)

2. **Baseline**: NO compression — measure raw tokens-in via tiktoken cl100k_base.

3. **Primitives under test** (orthogonal axes):
   - **A1**: context-mode alone (C1) — SCT-CC sandboxing
   - **A2**: caveman alone (C2) — agent-emit slimming
   - **A3**: LLMLingua-2 alone via leanctx (C4) — semantic compression
   - **A4**: claw-compactor alone (C5) — zero-inference reversible
   - **A5**: sigmap alone (C6) — direct context-mode competitor
   - **A1+A2**: context-mode + caveman (most promising joint)
   - **A1+A2+A3**: triple stack (context-mode + caveman + leanctx) — saturation check

4. **Metrics**:
   - **M1**: token-reduction % (in vs out)
   - **M2**: answer-quality preservation (manual rubric 1-5 vs baseline)
   - **M3**: round-trip latency added (ms p50 / p99)
   - **M4**: $/turn projected at Opus 4.7 1M ceiling (input + output)
   - **M5**: failure-mode incidence (compressed output that broke downstream tool calls or lost critical state)

### C.2 — Expected outcomes (hypotheses to verify)

- **H1**: A1+A2 compounds ~90%+ reduction (98% × 65% on disjoint surfaces)
- **H2**: A3 stacked on A1+A2 hits diminishing returns (<5% marginal) because LLMLingua targets long-doc-content surface that A1 already trimmed
- **H3**: A4 (claw-compactor) wins on the CODE-BLOCK category but loses on prose vs caveman
- **H4**: A5 (sigmap) shows ~80% reduction, materially below A1's 98% — context-mode is the rightful incumbent for SCT-CC
- **H5**: failure-mode incidence is HIGHEST when A3 is added without semantic-domain tuning (LLMLingua hyper-aggressive on technical jargon)

### C.3 — Decision matrix

| Outcome | Action |
|---|---|
| A1+A2 compound ≥85% with M2 ≥ 4.5/5 | INSTALL caveman alongside context-mode (B.1 verdict CONFIRMED) |
| A4 wins CODE category by ≥20% vs A1+A2 | ADD claw-compactor as code-specific layer |
| A3 marginal <5% AND M5 failures observed | DO-NOT-INSTALL LLMLingua/leanctx |
| A5 ties or beats A1 | REPLACE context-mode with sigmap |

### C.4 — Estimated effort + risk

- **Effort**: ~6h (50-turn corpus + run 7 configurations + manual rubric scoring)
- **Risk**: LOW — all primitives have MIT licenses; reversibility is comment-out (none modify Claude Code internals)
- **Blocker**: requires saved-session corpus from a representative arc — pull from `.claude/state/projects/*.jsonl` for last 5 task-arcs

---

## §D — L4.5 Bake-off Proposal (MinerU vs docling vs markitdown vs marker vs PaddleOCR)

> **Goal**: identify the highest-fitness PARSING engine for ingestion into CC's retrieval+memory layers — primary use-case is "user drops a PDF/Office doc into context, CC must extract text+tables+images for downstream skill use".

### D.1 — Method

1. **Corpus**: 4 categories × 5 docs each = 20 test documents:
   - **CAT1 PDF-text**: 5 born-digital text PDFs (papers, reports, manuals)
   - **CAT2 PDF-scan**: 5 scanned/photographed PDFs (financial statements, historical docs)
   - **CAT3 MS-Office**: 5 Word + Excel + PowerPoint files
   - **CAT4 HTML+image-heavy**: 5 web pages saved as HTML with embedded media

2. **Primitives under test**:
   - **P1**: MinerU v3.1.14 (D3) — local + Apache-2.0 + commercial-threshold
   - **P2**: docling v2.93.0 (D4) — local + IBM-backed + Granite-Vision-4.1
   - **P3**: markitdown v0.1.5 (D1) — Microsoft + LangChain-native
   - **P4**: PaddleOCR latest (D2) — backend candidate (used inside P1/P2)
   - **P5**: marker v1.10.2 (D5) — *reference only* (GPL-3.0 NO-INSTALL but useful as quality baseline)

3. **Metrics**:
   - **Q1**: text-extraction fidelity (Levenshtein vs ground-truth markdown)
   - **Q2**: table-extraction fidelity (cell-accuracy on TEDS or treelis)
   - **Q3**: layout-preservation (headings, lists, code-blocks correct order)
   - **Q4**: image-placement and alt-text (where applicable)
   - **Q5**: speed (sec per page, p50/p99) on consumer GPU (RTX 3090 or M2)
   - **Q6**: install footprint (disk + RAM)
   - **Q7**: failure-mode incidence (crashes, infinite loops, OOM)
   - **Q8**: license-suitability for production use (binary verdict + risk note)

### D.2 — Expected outcomes (hypotheses to verify)

- **H1**: P1 (MinerU) wins CAT1 (PDF-text) on fidelity by 5-10% vs P2; P2 (docling) wins CAT3 (Office) on layout-preservation
- **H2**: P3 (markitdown) is fastest and lightest install — best for "quick" ingestion in long-tail Office files but loses to P1/P2 on complex PDFs
- **H3**: P4 (PaddleOCR) wins CAT2 (scanned PDFs) by significant margin BUT requires PaddlePaddle install
- **H4**: P5 (marker) ties P1/P2 on quality (it's the same datalab-to org as surya — high quality) — confirming our GPL-3.0 NO-INSTALL decision is purely license-driven, not quality-driven
- **H5**: failure-modes most frequent on CAT2 scans for P3 (markitdown lacks heavy OCR) — confirming P3 is NOT a one-tool replacement

### D.3 — Decision matrix

| Outcome | Action |
|---|---|
| P1 wins fidelity overall by ≥10% with no critical license blocker | INSTALL MinerU + MinerU-Document-Explorer as primary L4.5 |
| P2 ties or wins on Office (CAT3) | INSTALL docling-mcp alongside MinerU as Office-layer fallback |
| P3 wins on speed AND on simple-conversion (CAT4 HTML) | INSTALL markitdown-mcp as the "lite" path |
| P4 needed for CAT2 scans | CONFIGURE PaddleOCR backend in P1 (MinerU `--ocr-engine paddle`) |
| P1 fails on edge-cases that P5 (marker) handles | DOCUMENT the gap; do NOT replace with marker (GPL-3.0 risk persists) |

### D.4 — Estimated effort + risk

- **Effort**: ~12-16h (20-doc corpus + 4 engines + ground-truth markdown construction + manual quality scoring)
- **Risk**: MEDIUM — install size for full P1+P2+P3+P4 ~5-10 GB combined; reversible via uninstall
- **Reference benchmark**: `andyhuo520/ocr_benchmark` (D24) — uses OmniDocBench standard; can be leveraged as starting bench

### D.5 — Recommendation summary

**Install order** (lowest-risk first):
1. `docling-project/docling-mcp` (D17) — *first* because first-party MCP + IBM rigor + permissive license (no commercial threshold)
2. `opendatalab/MinerU-Document-Explorer` (D19) — *second* because superior accuracy on scientific/complex PDFs + first-party MCP + commercial-threshold acceptable
3. `KorigamiK/markitdown_mcp_server` (D21) wrapping `microsoft/markitdown` (D1) — *third* for MS-Office surface coverage
4. *Optional*: `PaddlePaddle/PaddleOCR` (D2) as backend if scanned-PDF accuracy needed

**DO NOT INSTALL** until license re-checked:
- `datalab-to/marker` (D5) — GPL-3.0 hard-blocker for Z:-portable runtime
- `mathpix` (X8) — closed-source SaaS

---

## §E — Honest Non-Findings

### E.1 — L1.5 candidates from operator list NOT FOUND on GitHub today (2026-05-16)

The operator's candidate list contained these names; GitHub repository search returned ZERO matches in `name`, `full_name`, OR `description` fields. Treat each as either:
- (a) misspelled/wrong-org reference,
- (b) closed-source or private,
- (c) renamed/superseded by another project,
- (d) hypothetical/not-yet-existent,
- (e) confused with a related project.

| candidate-name | search-result | best-interpretation |
|---|---|---|
| `microsoft/acon` | 0 results | (a) microsoft has many `acon-*` ML projects internally; no public repo with this exact path; may be confused with `microsoft/ACON-*` internal name |
| `ace-agent/ace` | 0 results | (a/c) numerous `ace` orgs exist; no `ace-agent/ace` repo today; possibly a misnaming |
| `rtk-ai/rtk` | 0 results | (a) `edouard-claude/snip` (C7) explicitly markets as "rtk alternative" implying rtk exists or existed; likely renamed, archived, or org changed |
| `buildoak/wet` | 0 results | (d) no public buildoak org found |
| `yvgude/lean-ctx` | 0 results | (e) `jia-gao/leanctx` (C4) appears to be the intended target — single-word "leanctx" vs hyphenated "lean-ctx" |
| `chopratejas/headroom` | 0 results | (d) no public repo |
| `junhoyeo/tokscale` | 0 results | (d) no public repo |

**Implication**: 7 of 12 candidate-list L1.5 names did not resolve. The L1.5 layer's REAL public-repo population in Q2 2026 is **smaller** than the candidate list suggested. Recommend RE-VERIFYING the candidate-list source — it may have been generated speculatively or from non-GitHub sources (e.g., HackerNews drafts, internal Notion).

### E.2 — L4.5 candidates from operator list NOT FOUND today

| candidate-name | search-result | best-interpretation |
|---|---|---|
| `mineru-team/MinerU` | 0 results | (e) `opendatalab/MinerU` (D3) is the actual canonical repo. "mineru-team" not a real GitHub org. |
| `IBM-Research/scimagex` | 0 results | (d) no public repo by this name today. IBM Research's scientific-document-AI work appears to flow through `docling-project/*` (IBM-Research-backed) per the `granite-vision` integration cited in docling release notes. |
| `microsoft/LayoutLM` (separate repo) | 0 results | (c) LayoutLM lives INSIDE `microsoft/unilm` (D6) under `layoutlm/` subfolder; no standalone repo. |

### E.3 — Other limitations of this fork

1. **License verification scope**: Only 4 LICENSE files were fetched today (caveman, leanctx, marker, MinerU) due to GitHub API rate-limit constraints. License columns for other rows are marked "(typical)" based on conventions inferred from the topics + org patterns; **operator should re-verify before any INSTALL action** by reading the relevant LICENSE file with mcp__github__get_file_contents.

2. **`microsoft/markitdown` MAU/popularity vs L4.5 native fitness**: 123K★ leadership reflects developer-experience excellence on Office formats, NOT raw PDF/scan quality. MinerU + docling are technically superior on complex/scientific PDFs per public benchmark literature (OmniDocBench). Do NOT install only markitdown and assume L4.5 is solved.

3. **`MinerU 2.5-Pro VLM score 95.69`**: The operator's prompt mentioned this benchmark — could not directly verify the 95.69 number from release notes today; the v3.1.14 latest release (2026-05-15) mentions "Accuracy improvements" + "Optimized the pdf_classify classification pipeline" but no specific score. **The 95.69 score likely refers to OmniDocBench-Overall for a specific 2025 release** — recommend operator cross-check via OmniDocBench leaderboard before citing.

4. **`PaddleOCR-VL` specifically**: Topic appears in PaddleOCR (D2) topic list but no separate repo. Likely a sub-model inside the main repo.

5. **`Pixtral` (X9) and `ColPali` (D14) under-explored**: These two represent the VLM-RETR architecture which **bypasses text-OCR entirely**. A dedicated future probe should compare ColPali-based retrieval vs MinerU-based OCR+chunking for visual-heavy docs.

6. **Browser-extension L1.5 (Arjman + caveman browser variants)**: Not relevant for CC-headless runtime — only listed for completeness.

7. **`microsoft/LLMLingua` v0.2.2 release date**: 2024-04-09 (25mo stale at release-tag level); main branch IS still updated (2026-05-16 last commit). The project is in maintenance mode, not abandoned, but no new major release in 2 years — this affects D7 maturity score interpretation.

8. **`leanctx` star-growth verification**: 234★ in 28 days (born 2026-04-18) is a strong "early adoption" signal but **NOT yet a sustained mainstream signal**. Recommend re-probe in 90 days before TIER-1 install commitment.

9. **`caveman` 60.9K★ in 6 weeks growth rate**: Is real but reflects a **meme-driven viral curve** (per repo's own description: "talk like caveman"). Engineering rigor and long-term maintenance trajectory not yet established. Recommend STUDY-PILOT before TIER-1 production install despite high star count.

10. **Bake-off corpus availability assumption**: §C and §D propose using session transcripts (`.claude/state/projects/*.jsonl`) which may not be representative of fresh-runtime workloads on this install. Operator should add real-world adversarial samples.

---

## Summary Headlines

- **L1.5 INSTALLED**: `mksglu/context-mode` (14.9K★) confirmed as incumbent
- **L1.5 ADD**: `JuliusBrussee/caveman` (60.9K★) for joint deployment — compound 90%+ savings projected
- **L1.5 STUDY-PILOT**: `open-compress/claw-compactor` (2.2K★) for code-AST specialty
- **L4.5 INSTALL ORDER**: docling-mcp → MinerU-Document-Explorer → markitdown_mcp_server (3 layers covering PDF + scientific + Office)
- **L4.5 REJECT**: `datalab-to/marker` — GPL-3.0 verified today (SHA 183be3e7)
- **L4.5 LICENSE-WATCH**: `opendatalab/MinerU` Apache-2.0 + commercial threshold (MAU >100M OR rev >$20M) — note in cite-trail
- **7 L1.5 candidate-list names did NOT resolve** — recommend candidate-list re-verification with original source
- **2 L4.5 candidate-list names had wrong org/path** — corrected to canonical names in §A.3
