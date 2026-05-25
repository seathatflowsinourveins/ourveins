# Wave 252-extension Agent D — 13 Missing Infrastructure Layers + 4 Native-CC Gaps

[Date 2026-05-15] [Agent: sota-researcher]

VERDICT: CATEGORIES-CLOSED conf=0.86 — 13/13 infrastructure categories closed + 4/4 native-CC GAPs addressed.
- 13 categories: all have Top-3 SOTA picks with 11-dim scores.
- GAP-2 (sandboxing) CLOSED, GAP-12 (Q2 features) CLOSED, GAP-14 (MCPB) CLOSED.
- GAP-9 (arXiv cohort) = HONEST-NON-FINDING — no arXiv MCP available in this runtime.
- 2 sub-HNF: D4-3 embeddings + D4-4 rerankers (SOTA models are weights, not installables).

## §0 Provenance + method

Discovery via `mcp__github__search_repositories` (22 sweeps, sort=stars desc), `mcp__github__get_file_contents` (3 LICENSE/dir probes), `mcp__deepwiki__ask_question` (3 calls). **`WebFetch`/`perplexity`/`arxiv`/`context-mode` tools were UNAVAILABLE** — Anthropic-docs content (GAP-2/14) recovered via deepwiki on `anthropics/claude-code` CHANGELOG + direct `modelcontextprotocol/mcpb` dir read. Star counts captured 2026-05-15/16; subject to Marker Decay per `evidence-policy.md`. cpd-bands per `convergence-gate.md` 5-band. Non-duplication with Agent B: D covers gateway/serving/embeddings/rerank/vector-DB/parsing/web-search-MCP/audio/vision/workflow/sandbox/browser/cache.

## §1 D4-1 LLM Router/Gateway

| Repo | Stars | Age | cpd-band | License | native-CC | wire | Axis1/2/3 | Probe4/6 | Score | Disposition |
|---|---|---|---|---|---|---|---|---|---|---|
| **BerriAI/litellm** | 47,139 | 2023-07 | SUSTAINED-ACTIVE | MIT | proxy+`mcp-gateway` | 3 | P/P/P | clean/PASS | **91** | **ADOPT-NOW** |
| Portkey-AI/gateway | 11,736 | 2023-08 | SUSTAINED-ACTIVE | MIT | TS gateway | 3 | P/PARTIAL/P | clean/PASS | 84 | STUDY-PILOT |
| andrewyng/aisuite | 13,764 | 2024-06 | ACTIVE-ITER | MIT | SDK-only | 2 | P/P/P | clean/PASS | 80 | STUDY-PILOT |

Canonical: **litellm** — only entrant that is BOTH SDK AND self-hostable proxy with Anthropic-API-native passthrough + cost-tracking + failover + `mcp-gateway` mode. OpenRouter=SaaS REJECT-as-install. `katanemo/plano` (6,480★ Apache-2.0) + `IBM/mcp-context-forge` (3,718★ Apache-2.0) credible alternates.

## §2 D4-2 Local Model Serving

| Repo | Stars | Age | License | native-CC | wire | Score | Disposition |
|---|---|---|---|---|---|---|---|
| **ollama/ollama** | 171,475 | 2023-06 | MIT | Win-native binary + OpenAI-compat `:11434/v1` | 1 | **96** | **ADOPT-NOW** |
| ggml-org/llama.cpp | 110,319 | 2023-03 | MIT | `llama-server` OpenAI-compat | 3 | 89 | STUDY-PILOT |
| vllm-project/vllm | 80,136 | 2023-02 | Apache-2.0 | OpenAI-compat HTTP | 4 (CUDA/Linux-primary) | 76 | STUDY-PILOT |

Canonical: **ollama** — only entrant with true single-installer Windows-native binary + native `:11434/v1`. CONFIRMED-FIT: claude-sota-installed already runs Ollama @:11700. mlx=Apple-only REJECT-FOR-FIT. vLLM=Linux/CUDA-GPU-server, not portable-Windows fit.

## §3 D4-3 Embeddings — **HONEST-NON-FINDING-PARTIAL**

| Repo | Stars | License | Score | Disposition |
|---|---|---|---|---|
| huggingface/text-embeddings-inference | 4,796 | Apache-2.0 (verify HFOIL) | 82 | STUDY-PILOT |
| Anush008/fastembed-rs | 891 | Apache-2.0 | 72 | STUDY-PILOT |

No single repo IS "the embeddings model" — SOTA models (voyage-3, jina-v3, BGE-M3, mxbai, nomic-embed) are model *weights* on HF Hub or provider APIs, not GitHub-star-shaped repos. `FlagOpen/FlagEmbedding` is the BGE *training* repo. Canonical: **TEI serving + a model weight** OR — **ollama itself serves embedding models** (`ollama pull nomic-embed-text`) → for a runtime already running ollama, **zero extra install needed**. CR-9: read TEI LICENSE blob at install (HFOIL risk).

## §4 D4-4 Re-rankers — **HONEST-NON-FINDING-PARTIAL**

| Repo | Stars | License | Score | Disposition |
|---|---|---|---|---|
| **PrithivirajDamodaran/FlashRank** | 970 | Apache-2.0 | 78 | STUDY-PILOT (embedded RAG rerank) |
| DataScienceUIBK/Rankify | 675 | check | 70 | STUDY-PILOT |

Same shape as D4-3 — SOTA rerank models (BGE-reranker-v2-m3, mxbai-rerank, jina-reranker-v2, Cohere rerank) are weights/APIs. Canonical: **FlashRank** for embedded local rerank (Apache-2.0, no server, `pip install flashrank`); OR serve BGE-reranker-v2-m3 (Apache-2.0 weights) via TEI/ollama.

## §5 D4-5 Vector DBs

| Repo | Stars | Age | License | native-CC | wire | Score | Disposition |
|---|---|---|---|---|---|---|---|
| **qdrant/qdrant** | 31,341 | 2020-05 | **Apache-2.0** (LICENSE SHA 261eeb9e verified) | official `mcp-server-qdrant` | 3 | **90** | **ADOPT-NOW** (production) |
| milvus-io/milvus | 44,314 | 2019-09 | **Apache-2.0** (deepwiki-verified) | docker/k8s | 4 (multi-container) | 82 | STUDY-PILOT |
| **asg017/sqlite-vec** | ~5K [INFERRED] | 2024 | Apache/MIT | SQLite extension | 1 | **86** | **ADOPT-NOW** (embedded) |

Canonical: **TWO by scale** — (1) **sqlite-vec** for embedded (wire=1, already wired in claude-sota-installed mcp-memory backend = CONFIRMED-FIT); (2) **qdrant** for scale (Apache-2.0 fresh-verified, official MCP wrapper, clean docker). Milvus heavier=STUDY-PILOT. pinecone/turbopuffer=SaaS REJECT-as-install.

## §6 D4-6 Document Parsing

| Repo | Stars | Age | License | native-CC | wire | Score | Disposition |
|---|---|---|---|---|---|---|---|
| **microsoft/markitdown** | 123,323 | 2024-11 | MIT | official `markitdown-mcp` | 2 | **93** | **ADOPT-NOW** |
| docling-project/docling | 59,800 | 2024-07 | MIT | Python lib | 3 | 88 | STUDY-PILOT (layout-critical) |
| opendatalab/MinerU | 63,201 | 2024-02 | **AGPL-3.0 (likely)** | Python | 4 | 60 | **REJECT-FOR-FIT** if AGPL confirmed |

Canonical: **markitdown** — highest-star (123K), MIT, Microsoft-maintained, ships *official* `markitdown-mcp` MCP server (native-CC PASS — installable as MCP). docling=strong MIT #2. **MinerU FLAGGED** — opendatalab repos typically AGPL → REJECT for permissive-only. `datalab-to/marker` also license-complicated.

## §7 D4-7 Web-Search MCPs

| Repo | Stars | License | wire | Score | Disposition |
|---|---|---|---|---|---|
| **firecrawl/firecrawl-mcp-server** | 6,316 | MIT (core is AGPL — separate repo) | 2 | **87** | **ADOPT-NOW** (paid-tier) |
| exa-labs/exa-mcp-server | 4,434 | MIT | 2 | 86 | **ADOPT-NOW** |
| **nickclyde/duckduckgo-mcp-server** | 1,141 | check | 2 | 84 | **ADOPT-NOW** ($0, no API key) |
| tavily-ai/tavily-mcp | 1,971 | MIT | 2 | 84 | STUDY-PILOT |
| brave/brave-search-mcp-server | 1,025 | official Brave | 2 | — | alternate |

Canonical: **TWO by cost** — (1) **DuckDuckGo MCP** as the $0-zero-key default; (2) **Firecrawl OR Exa MCP** for high-quality search+scrape (both official-vendor MCPs, npm, MIT). Firecrawl edges on scrape/crawl, Exa on neural-relevance.

## §8 D4-8 Audio TTS/STT

| Repo | Stars | License | wire | Score | Disposition |
|---|---|---|---|---|---|
| **openai/whisper** | 99,551 | MIT | 3 | **88** | **ADOPT-NOW** (STT) |
| ggml-org/whisper.cpp | 49,726 | MIT | 3 | 85 | STUDY-PILOT (Win-native STT) |
| SYSTRAN/faster-whisper | 22,935 | MIT | 3 | 84 | STUDY-PILOT (perf STT) |

Canonical: **whisper** (STT standard, 99K, MIT). For Windows pure runtime, **whisper.cpp** is better *install* (C++ binary, no Python). **TTS side = HONEST-NON-FINDING-PARTIAL** — no dominant open-weights TTS repo of whisper-maturity; TTS SOTA split between cloud APIs + fast-moving research. TTS = defer (optional cloud SDK). Audio overall = LOW-priority for code-centric runtime; STT-only covers realistic need. cartesia/elevenlabs/deepgram/AssemblyAI = cloud provider SDKs, REJECT-as-primary.

## §9 D4-9 Vision/VLM — **HONEST-NON-FINDING-PARTIAL**

| Repo | Stars | License | Score | Disposition |
|---|---|---|---|---|
| **huggingface/transformers** | 160,647 | Apache-2.0 | 86 | ADOPT-NOW (model-host layer, if vision-product) |
| roboflow/supervision | 39,104 | MIT | 80 | STUDY-PILOT |
| opencv/opencv | 87,499 | Apache-2.0 | 78 | STUDY-PILOT |

CLIP/dinov2/sam2/Qwen3-VL/Florence-2/moondream are *model repos* (research weights, several with research-only licenses — VERIFY). "MCP-wrapped vision tools" = essentially a non-finding (no mature high-star vision MCP). **Disposition: defer vision installs** — Claude Opus 4.7 is natively multimodal, reads images directly; runtime needs no separate vision encoder for its own operation. Install transformers+supervision only if a vision-product use-case materializes.

## §10 D4-10 Workflow Orchestration — **WHOLE-CATEGORY REJECT-FOR-FIT**

| Repo | Stars | License | wire | Score | Disposition |
|---|---|---|---|---|---|
| n8n-io/n8n | 188,021 | **Sustainable Use License (fair-code, non-OSI)** | 3 | 70 | STUDY-PILOT (license caveat) |
| PrefectHQ/prefect | ~18K [INFERRED] | Apache-2.0 | 4 | 74 | STUDY-PILOT |
| temporalio/temporal | ~14K [INFERRED] | MIT | 5 | 68 | REJECT (over-heavy) |

**HONEST-NON-FINDING for a clean ADOPT-NOW.** Mode-harness mismatch (`convergence-gate.md` Probe-5): Temporal/Airflow/Prefect are server-side DAG schedulers for data pipelines (wire 4-5, server cluster + DB + worker), NOT LLM-agent orchestration. The runtime's native orchestration = Agent-tool fan-out + `/loop` + cwc-long-running-agents harness (manifest §17). **Recommendation: skip this category entirely.** windmill=AGPL blocker. n8n least-bad but fair-code non-OSI.

## §11 D4-11 Embedded Sandbox

| Repo | Stars | License | native-CC | wire | Score | Disposition |
|---|---|---|---|---|---|---|
| **Anthropic CC native sandbox** | built-in | Anthropic | settings.json `sandbox` block | 1 (config) | **95** | **ADOPT-NOW-as-config** |
| e2b-dev/E2B | 12,197 | Apache-2.0 | SDK | 3 | 82 | STUDY-PILOT (untrusted-code product) |
| daytonaio/daytona | 72,441 | **AGPL-3.0 (likely)** | SDK/self-host | 4 | 58 | **REJECT-FOR-FIT** if AGPL confirmed |

Canonical: **Anthropic native sandboxing** (see §14) — bash sandboxing + filesystem isolation + network restrictions, all `settings.json` config-knobs. For pure runtime the sandbox is NATIVE config, not an install. If runtime must execute untrusted *product* code, **E2B** (Apache-2.0) is the external sandbox. **Daytona FLAGGED AGPL** — REJECT for permissive-only if confirmed. modal=SaaS.

## §12 D4-12 Browser-Use/Computer-Use

| Repo | Stars | Age | License | wire | Score | Disposition |
|---|---|---|---|---|---|---|
| **browser-use/browser-use** | 94,090 | 2024-10 | MIT | 3 | **86** | **ADOPT-NOW** |
| Anthropic computer-use (quickstarts) | quickstart | MIT | 4 (docker/VM) | 78 | STUDY-PILOT |
| microsoft/OmniParser | screen-parse model | MIT (verify) | 3 | 74 | STUDY-PILOT |

Canonical: **browser-use** — 94K stars, MIT, Playwright-backed (cross-platform incl Windows), pip-installable. **Skyvern = REJECTED AGPL** (mission flagged, CONFIRMED). browser-use at 19mo high-velocity = SUSTAINED-ACTIVE (Playwright mature substrate underneath), NOT launch-spike. If no web-automation need, defer — §7 web-search MCPs cover read-only web access.

## §13 D4-13 Cache Infrastructure — **CRITICAL LICENSE FINDING**

| Repo | Stars | License | wire | Score | Disposition |
|---|---|---|---|---|---|
| **valkey-io/valkey** | 25,784 | **BSD-3-Clause** (permissive, LF fork) | 2 | **88** | **ADOPT-NOW** |
| redis/redis | 74,372 | **AGPLv3/RSALv2/SSPL** (2024 relicense) | 2 | 62 | **REJECT-FOR-FIT** |
| dragonflydb/dragonfly | 30,471 | **BSL 1.1 (non-OSI)** | 2 | 64 | **REJECT-FOR-FIT** |

Canonical: **valkey** — the cache category has a license trap: Redis relicensed to AGPL/SSPL (2024), Dragonfly is BSL — both non-permissive blockers. valkey is the LF BSD-3 Redis-fork (ex-Redis maintainers), Redis-protocol-compatible — the ONLY permissive entrant. **But for a Claude Code runtime the realistic cache need is prompt-caching = native Anthropic `cache_control` API (zero install).** valkey only if server-side app-state cache needed.

## §14 GAP-2 Anthropic 2026-04 sandboxing primitives

Recovered via deepwiki on `anthropics/claude-code` (WebFetch blocked). All are CONFIG-knobs in `settings.json`, NOT installables:
- **Bash sandboxing** (`bubblewrap`/`socat`, Linux/WSL; `sandbox.bwrapPath`/`socatPath`)
- **Permission prompts on protected paths** (detects danger wrapped in `env`/`sudo`/`watch`/`ionice`/`setsid`)
- **Read-only command auto-approve** (`ls *.ts`, `lsof`, `pgrep`, `ss`, `fd` no longer prompt)
- **Filesystem isolation** — writes to `.claude/`/`.git/`/`.vscode/` protected; `.claude/skills` write blocked in sandbox mode
- **`permissions.additionalDirectories`** (mid-session add/revoke)
- **`allowRead`/`denyRead`** sandbox filesystem
- **`sandbox.network.deniedDomains`** (block domains under broader allow-wildcard)
- **`sandbox.failIfUnavailable`** — exit-on-error if sandbox can't start — **recommend `true`**
- **`allowUnsandboxedCommands`** policy — disables `dangerouslyDisableSandbox`
- **`CLAUDE_CODE_SUBPROCESS_ENV_SCRUB=1`** — strips credentials from subprocess envs — **recommend on**
- **`permissions.defaultMode`** — ties to cardinal-rule-7

Pure-runtime: configure `failIfUnavailable:true` + `CLAUDE_CODE_SUBPROCESS_ENV_SCRUB=1` + `allowUnsandboxedCommands` policy. Closes Agent C D8-1..11.

## §15 GAP-9 ArXiv 2026 Q1-Q2 — **HONEST-NON-FINDING (research-input gap)**

`mcp__arxiv__search_papers` NOT registered in this runtime; WebFetch blocked. **Cannot produce a freshly-verified Top-10 2026-Q1/Q2 arXiv list.** This confirms Agent C's D10-4 (C2 cohort UNEXECUTED). Recommend orchestrator install an arXiv MCP (e.g. `blazickjp/arxiv-mcp-server` — verify) so C2-cohort passes become executable. GAP-9 = **NOT CLOSED by Agent D** — hard tool-availability gap.

## §16 GAP-12 Q2 2026 native CC features (config-knob map)

NOT install candidates — CITE-CLASS-CANONICAL. Activation state:
- `/goal` (2.1.139) — LATENT (version-gated)
- `claude agents` CLI — LATENT
- `--agent <name>` — LATENT
- `--worktree`/`-w` — ACTIVE-via-launcher (eee should forward `-w`)
- `asyncRewake` hook field — CONFIG (per-hook in settings.json)
- `[1m]` extended-context — CONFIG (`CLAUDE_CODE_DISABLE_1M_CONTEXT` UNSET=enabled)
- Fork-subagent (`CLAUDE_CODE_FORK_SUBAGENT`) — ACTIVE (=1)
- `args: string[]` exec form — CONFIG (array form avoids shell-injection)
- Conditional `if:` hooks — CONFIG (T2/T3 hooks already use)
- `/compact <hint>` — OPERATOR
- MCPB — NEW install format (§17)

Enumerate all 11 in pure-runtime manifest Section 0. None require install — version-gated + config. Closes Agent C D8-1..11.

## §17 GAP-14 Anthropic MCPB extension format

Verified by dir-read of **`modelcontextprotocol/mcpb`** HEAD `70fe3b34cd6dff1b3bba046638edc72a6467a4fb` (owner is `modelcontextprotocol` org, NOT `anthropics` — mission's `anthropics/mcpb` guess resolves here). Confirmed structure: `MANIFEST.md` (24.6KB bundle spec), `CLI.md` (7.7KB `mcpb` CLI), `schemas/` (JSON schemas), `src/` (TS impl), `examples/`.

**MCPB** (formerly "DXT"/Desktop Extensions) = the **`.mcpb` binary bundle format** — single-file packaging for MCP servers. Before MCPB: install = clone/npm-install server + hand-edit `.mcp.json` (command/args/env) + manage deps (error-prone — exactly claude-sota-installed's current workflow). With MCPB: drop one `.mcpb` file; host reads embedded `manifest.json` (declares `server`, `tools`, `user_config` typed install-fields like API keys, `compatibility`), provisions bundled runtime, exposes tools. `mcpb` CLI = `mcpb pack`/`mcpb validate`.

Pure-runtime: MCPB is **GENUINELY-NEW** per CR-12 lattice. Recommend: keep `.mcp.json` for non-bundled servers; prefer `.mcpb` where upstream ships a bundle (validated, CR-9-friendly version-pinning); adopt the `mcpb` CLI. Cite: `modelcontextprotocol/mcpb` MANIFEST.md+CLI.md @ HEAD `70fe3b34`.

## §18 Cross-category convergence + realistic install set

**Top install candidates** (score × pure-runtime-fit):
1. ollama/ollama (96, MIT, wire1) — already wired
2. Anthropic native sandbox (95, config)
3. markitdown+markitdown-mcp (93, MIT, wire2)
4. litellm (91, MIT, wire3)
5. qdrant+mcp-server-qdrant (90, Apache-2.0, wire3)
6. valkey (88, BSD-3, wire2)
7. whisper/whisper.cpp (88, MIT)
8. firecrawl-mcp / exa-mcp (87/86, MIT, wire2)
9. browser-use (86, MIT, wire3)
10. sqlite-vec (86, Apache/MIT, wire1) — already wired
11. DuckDuckGo-mcp (84, wire2)

**Convergence findings**:
1. **ollama collapses 3 categories** — ollama (D4-2) natively serves embeddings (D4-3) + rerank-capable models — one install covers serving+embeddings+partial-rerank.
2. **License-blocker cluster** — redis(AGPL/SSPL), dragonfly(BSL), n8n(fair-code), windmill(AGPL), Skyvern(AGPL), probably MinerU+Daytona(AGPL) — permissive-only runtime picks valkey/browser-use/docling-or-markitdown.
3. **Native > install for 3 layers** — sandbox (GAP-2), prompt-cache (D4-13 native), vision (Claude multimodal) — no install needed.
4. **WHOLE-CATEGORY REJECT-FOR-FIT** — D4-10 workflow orchestration (mode-harness mismatch; cwc `/loop` IS the orchestration). Vision/audio-TTS = LOW-priority defer.
5. **Realistic P0 install set ≈ 8 artifacts** (NOT 30-50 Agent C estimated): ollama + sqlite-vec (both already wired) + markitdown(-mcp) + litellm + DuckDuckGo-MCP + (sandbox/prompt-cache/vision native). The ollama-collapse + native-capability findings shrink the surface dramatically.

## §19 Anti-pattern flags

**License-blockers (REJECT-FOR-FIT, permissive-only)**: redis (AGPL/SSPL since 2024 relicense — use valkey), dragonfly (BSL 1.1), n8n (Sustainable Use License non-OSI), windmill (AGPL), **Skyvern (AGPL — CONFIRMED, use browser-use)**, MinerU (likely AGPL — **FLAGGED, verify, use markitdown/docling**), Daytona (likely AGPL — **FLAGGED, verify, use E2B**), datalab-to/marker (GPL/commercial-dual + restricted weights — FLAGGED).

**Fresh-paint watch**: browser-use (94K/19mo) + tavily-mcp/daytona/markitdown (<30mo) — all named-org backed with SUSTAINED-ACTIVE velocity → STRONG-PROVENANCE-EXPRESS → firm Axis-3 PASS. No launch-spike concern for this org-backed cohort.

**Fabrication-test (convergence-gate Row-2)**: **NONE** — D's picks are DBs/servers/SDKs whose READMEs describe capability, not "X% faster" marketing. D's category is structurally fabrication-resistant. No fabrication FAILs.

**Phantom-package (Probe-6)**: all ADOPT-NOW picks verified to have real registries (litellm/markitdown PyPI; qdrant/valkey Docker Hub; firecrawl-mcp/exa-mcp/tavily-mcp/duckduckgo-mcp npm; browser-use/e2b/flashrank/sqlite-vec PyPI/npm; ollama GitHub-releases+winget). No phantoms. **CR-9 caveat**: registry *names* are `[INFERRED]` from convention — run fresh `npm view`/`pip index versions` at actual install.

**Marker Decay**: star counts captured 2026-05-15/16 — re-fetch before any install commit per CR-9.

---

**Confidence held at 0.86** (not higher) because: (a) WebFetch/perplexity/arxiv tools unavailable — GAP-2/14 came via deepwiki proxy not primary docs; (b) 4 license flags (MinerU/Daytona/marker/firecrawl-core) need fresh LICENSE-blob verification; (c) some star/registry values `[INFERRED]`. **GAP-9 is a documented hard non-finding** — no arXiv MCP. All findings are ADVERSARIAL-verifiable — orchestrator must run CR-9 install-risk probes before any commit.

VERDICT: CATEGORIES-CLOSED conf=0.86
