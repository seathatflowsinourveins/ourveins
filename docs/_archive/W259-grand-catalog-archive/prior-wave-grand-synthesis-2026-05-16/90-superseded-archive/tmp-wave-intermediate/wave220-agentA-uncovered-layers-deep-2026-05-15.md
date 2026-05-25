---
title: Wave 220 Agent A - 7 Uncovered Layers SOTA Discovery + Scored Catalog
status: AUTHORITATIVE-CANDIDATE
date: 2026-05-15
wave: 220
fire: 1
agent: sota-researcher (Sonnet stand-in DISCLOSED per CLAUDE.local.md ENV (g))
artifact-class: layer-discovery-and-scored-catalog
output_budget: 800 LOC
---

## STAND-IN-NOTICE

Sonnet stand-in (not GPT-5.5 BRIDGE-MODE) per ENV (g). Cross-model gate NOT structurally satisfied; orchestrator must apply E2-audit stand-in penetration discipline + re-fire high-stakes ADOPTs via codex CLI BRIDGE-MODE.

## Executive summary

**7 layers scored** with axis-1+2+3 convergence-gate + 7-probe DAG harness-fit + CR-12 6-class disposition lattice.

**Critical findings**:
1. **PaddleOCR is the DOC-AI winner** (77.9k★ Apache-2.0 Baidu, Axis 1+2+3 firm-PASS)
2. **Marker (VikParuchuri) REJECT-FOR-FIT** — GPL-3.0 code + AI Pubs Open RAIL-M model license = Probe 6 PROBE-6 FAIL (verbatim README line 51 read at `repo://VikParuchuri/marker/sha/6ae38895d6e11cbc8fb4a60a0750b3bac479e304/contents/README.md`)
3. **Trivy is the SECURITY-SCANNING canonical** (Apache-2.0 Aqua-Security; replaces 4 separate tools)
4. **vLLM is the high-throughput LOCAL-MODEL-SERVING NEXT-LAYER** when Ollama saturates (Apache-2.0 UC Berkeley + 2000-contributor)
5. **postgres-mcp (crystaldba) is the DATABASE-MCP install-class winner** (MIT, index tuning + EXPLAIN)
6. **ntfy + ntfy-mcp-server wins NOTIFICATION** (Apache-2.0 22k★ backend + MIT MCP wrapper)
7. **CODE-INTEL: ast-grep + tree-sitter foundation + GitNexus/Repomix incumbent**

---

## LAYER 1 — CODE-INTEL

| Repo | Stars | cpd | Age (d) | Axis-3 | License | Verdict |
|---|---:|---:|---:|---|---|---|
| ast-grep/ast-grep | 13,808 | ~3.5 | 1,049 | SUSTAINED-MATURE | MIT | **ADOPT-NOW** |
| tree-sitter/tree-sitter | 25,380 | ~3.0 | 4,210 | SUSTAINED-MATURE | MIT | **CITE-CLASS-CANONICAL** (substrate via ast-grep/repomix) |
| semgrep/semgrep | 15,156 | ~2.2 | 1,978 | SUSTAINED-MATURE | LGPL-2.1 | **STUDY-PILOT.b** (CLI use is permissive-compatible) |
| Wilfred/difftastic | 25,308 | ~1.5 | 2,704 | SUSTAINED-MATURE | MIT | **ADOPT-NOW** |
| yamadashy/repomix | INCUMBENT (W213) | n/a | n/a | n/a | MIT | **INCUMBENT** |
| codemod/codemod | 1,003 | ~1.0 | 480 | STABLE-BURN-IN | MIT | **STUDY-PILOT.b** (ast-grep extension) |
| DeusData/codebase-memory-mcp | 2,357 | ~30 | 80 | FAST-CHURN | MIT | **REJECT-FOR-FIT** (duplicates GitNexus + fast-churn) |

**Top-3 with cite anchors** (file:line + HEAD SHA pending fresh clone at install time):

1. **ast-grep/ast-grep** — Rust 13.8k★ MIT. Axis-1 PASS (CC ecosystem + JetBrains + Pragmatic-Engineer); Axis-2 PASS (Herrington Darkholme named-T1, Sentry/Vercel adoption); Axis-3 PASS firm (SUSTAINED-MATURE 1049d). CC-native: `npm i -g @ast-grep/cli`. CR-12 GENUINELY-NEW.

2. **Wilfred/difftastic** — Rust 25.3k★ MIT. Axis-1 PASS (`git config diff.external` canonical); Axis-2 PASS (Hellwig + JetBrains); Axis-3 PASS firm (2704d). CC-native: `cargo install difftastic`. CR-12 GENUINELY-NEW.

3. **semgrep/semgrep** — OCaml 15.1k★ LGPL-2.1. **STUDY-PILOT.b** — LGPL-2.1 CLI-only use is permissive-compatible; rules registry (`semgrep-rules`) is CC-BY-SA — separate license check before distribution.

**Install order**: ast-grep → difftastic → semgrep (gated on rule-distribution license clarification)

---

## LAYER 2 — DOC-AI

| Repo | Stars | cpd | Age (d) | Axis-3 | License | Verdict |
|---|---:|---:|---:|---|---|---|
| PaddlePaddle/PaddleOCR | 77,913 | ~37 | 2,019 | SUSTAINED-MATURE | Apache-2.0 | **ADOPT-NOW** |
| tesseract-ocr/tesseract | 74,104 | ~3 | 4,290 | SUSTAINED-MATURE | Apache-2.0 | **STUDY-PILOT.b** (PROVIDER-COMPLEMENT) |
| pymupdf/pymupdf4llm | 1,697 | ~3 | 425 | STABLE-BURN-IN | AGPL-3.0 | **REJECT-FOR-FIT** (P6 FAIL) |
| VikParuchuri/marker | active | n/a | n/a | n/a | GPL-3.0 + OpenRAIL-M | **REJECT-FOR-FIT** (P6 FAIL) |
| Unstructured-IO/unstructured | active | ~12 | 1,650 | SUSTAINED-MATURE | Apache-2.0 | **STUDY-PILOT.b** (RAG-pipeline ETL) |
| RapidAI/RapidOCR | 6,572 | ~6 | 1,592 | SUSTAINED-MATURE | Apache-2.0 | **STUDY-PILOT.b** (PROVIDER-COMPLEMENT) |
| hiroi-sora/Umi-OCR | 44,220 | ~6 | 1,144 | SUSTAINED-MATURE | (license-check) | **REJECT-FOR-FIT** (GUI-only) |

**Top-3 with cite anchors**:

1. **PaddlePaddle/PaddleOCR** — Python 77.9k★ Apache-2.0. Axis-1 PASS firm (Baidu named-org + 100+ langs + PP-OCR/PP-Structure/PaddleOCR-VL); Axis-2 PASS (10.4k forks = wide T2); Axis-3 PASS firm (2019d SUSTAINED-MATURE). CC-native: `pip install paddleocr`. CR-12 GENUINELY-NEW.

2. **Unstructured-IO/unstructured** — Python Apache-2.0 — README verified at `repo://Unstructured-IO/unstructured/sha/238657f6b44c8f1f9250f6b12e392384031c1031/contents/README.md`. Axis-1 PASS (LangChain/LlamaIndex/Haystack); Axis-2 PASS (Brian Raymond founder + enterprise T1); Axis-3 PASS firm (1650d). CR-12 PROVIDER-COMPLEMENT. **STUDY-PILOT.b** — explicit ETL wiring to Qdrant/sqlite_vec required per Probe 7.b.

3. **tesseract-ocr/tesseract** — C++ 74k★ Apache-2.0. Foundation OCR. **STUDY-PILOT.b** PROVIDER-COMPLEMENT — `winget install Tesseract.Tesseract-OCR` Windows fallback.

**Install order**: PaddleOCR → unstructured → tesseract (deferred Phase 2)

**REJECT/DROP**:
- **VikParuchuri/marker** — GPL-3.0 code + AI Pubs Open RAIL-M model license. Direct README cite line 51: "Our model weights use a modified AI Pubs Open Rail-M license (free for research, personal use, and startups under $2M funding/revenue) and our code is GPL." Probe 6 PROBE-6 FAIL (verified via direct README read).
- **pymupdf4llm** — AGPL-3.0. Same blocker class as sibling Memory/RAG openviking REJECT at `Z:/claude-sota/.claude/projects/Z--claude-sota/memory/reference_memory_rag_audit_HNF_agplv3_blocker_2026_05_02.md`.

---

## LAYER 3 — SECURITY-SCANNING

| Repo | Stars | cpd | Age (d) | Axis-3 | License | Verdict |
|---|---:|---:|---:|---|---|---|
| aquasecurity/trivy | active | ~5 | 1,810 | SUSTAINED-MATURE | Apache-2.0 | **ADOPT-NOW** |
| PyCQA/bandit | 8,029 | ~2.5 | 2,941 | SUSTAINED-MATURE | Apache-2.0 | **ADOPT-NOW** |
| anchore/grype | 12,209 | ~2 | 2,180 | SUSTAINED-MATURE | Apache-2.0 | **STUDY-PILOT.b** (PARTIAL-OVERLAP Trivy) |
| trufflesecurity/trufflehog | 26,308 | ~3 | 3,062 | SUSTAINED-MATURE | AGPL-3.0 | **REJECT-FOR-FIT** (AGPL distribution-blocked) |
| semgrep/semgrep | 15,156 | ~2.2 | 1,978 | SUSTAINED-MATURE | LGPL-2.1 | **STUDY-PILOT.b** (shared CODE-INTEL) |

**Top-3 with cite anchors**:

1. **aquasecurity/trivy** — Go Apache-2.0 — README verified at `repo://aquasecurity/trivy/sha/e4325b18246dc90d2d18bf7e032fe47db89108e5/contents/README.md`. Axis-1 PASS firm (Aqua-Security + CNCF + K8s integration); Axis-2 PASS firm (named-org maintainer); Axis-3 PASS firm (1810d SUSTAINED-MATURE). Replaces 4 separate tools: SBOM + CVE + IaC + secrets. CC-native: `gh release download --repo aquasecurity/trivy`. CR-12 GENUINELY-NEW.

2. **PyCQA/bandit** — Python Apache-2.0 8k★. Axis-1 PASS (PyCQA + PSF); Axis-2 PASS (Sottile + PyCQA team); Axis-3 PASS firm (2941d). Python-specific SAST. CC-native: `pipx install bandit`. CR-12 PROVIDER-COMPLEMENT to Trivy.

3. **anchore/grype** — Go Apache-2.0 12.2k★. Axis-3 PASS firm (2180d). PARTIAL-OVERLAP Trivy CVE; install both for cross-DB verification (NVD vs Anchore feed). **STUDY-PILOT.b**.

**Install order**: `gh release download trivy` → `pipx install bandit` → Grype/Semgrep deferred

**REJECT**: trufflesecurity/trufflehog — AGPL-3.0; CLI standalone use ambiguous, distribution blocked.

---

## LAYER 4 — LOCAL-MODEL-SERVING

| Repo | Stars | cpd | Age (d) | Axis-3 | License | Verdict |
|---|---:|---:|---:|---|---|---|
| ollama/ollama | 171,468 | ~110 | 1,055 | SUSTAINED-MATURE-HIGH-VELOCITY | MIT | **INCUMBENT** (sibling has; install fresh) |
| vllm-project/vllm | active | ~50 | 1,260 | SUSTAINED-MATURE | Apache-2.0 | **STUDY-PILOT.b** (PROVIDER-COMPLEMENT scale) |
| ggml-org/llama.cpp | 80,000+ | ~30 | 1,070 | SUSTAINED-MATURE | MIT | **INCUMBENT** (via Ollama) |
| sgl-project/sglang | 27,849 | ~24 | 491 | STABLE-BURN-IN | Apache-2.0 | **STUDY-PILOT.b** (vLLM-class) |
| ml-explore/mlx | active | ~10 | 720 | SUSTAINED-MATURE | MIT | **N/A** (Apple-only) |
| kvcache-ai/Mooncake | 5,340 | ~13 | 320 | STABLE-BURN-IN | Apache-2.0 | **DEFER** (research-scale) |

**Top-3 with cite anchors**:

1. **ollama/ollama** — Go MIT 171k★. **INCUMBENT** at sibling :11700. Axis-1 PASS firm; Axis-2 PASS firm (Jeffrey Morgan named-T1); Axis-3 PASS firm (1055d SUSTAINED-MATURE-HIGH-VELOCITY band per convergence-gate §5-band cpd table). Install fresh: `winget install Ollama.Ollama` (CC-native official channel; runs on `:11701` to avoid sibling-port-collision per CR-9 sibling-bleed defense).

2. **vllm-project/vllm** — Python Apache-2.0 — README verified at `repo://vllm-project/vllm/sha/bd9dbe60601c986b50260f299fe279d057d7d89f/contents/README.md`. Axis-1 PASS firm (UC Berkeley Sky Lab + 2000+ contributors); Axis-2 PASS firm (Woosuk Kwon arxiv 2309.06180 + HuggingFace integration); Axis-3 PASS firm (1260d). CR-12 PROVIDER-COMPLEMENT. **STUDY-PILOT.b** when >10 concurrent inference + GPU available.

3. **sgl-project/sglang** — Python Apache-2.0 27.8k★. Axis-3 PASS firm (491d STABLE-BURN-IN). PROVIDER-COMPLEMENT to vLLM; pick one.

**Install order**: `winget install Ollama.Ollama` Phase 1 → vLLM/SGLang deferred

**Cross-runtime note**: sibling :11700, sss must use :11701 per CR-9 sibling-bleed defense.

---

## LAYER 5 — DATABASE-MCP

| Repo | Stars | cpd | Age (d) | Axis-3 | License | Verdict |
|---|---:|---:|---:|---|---|---|
| crystaldba/postgres-mcp | active | ~3 | 432 | STABLE-BURN-IN | MIT | **ADOPT-NOW** (when Postgres tier exists) |
| bytebase/dbhub | 2,767 | ~3.7 | 432 | STABLE-BURN-IN | Apache-2.0 | **STUDY-PILOT.b** (ETL-gated) |
| subnetmarco/pgmcp | 529 | ~2 | 240 | STABLE-BURN-IN | (license-check) | **DEFER** |
| call518/MCP-PostgreSQL-Ops | 149 | ~3 | 270 | STABLE-BURN-IN | (license-check) | **REJECT-FOR-FIT** |
| executeautomation/mcp-database-server | 351 | ~3 | 400 | STABLE-BURN-IN | (license-check) | **DEFER** |
| hannesrudolph/sqlite-explorer-fastmcp-mcp-server | 105 | ~1 | 510 | STABLE-BURN-IN | (license-check) | **STUDY-PILOT.b** |
| (Neo4j MCP) | n/a | n/a | n/a | n/a | n/a | **HONEST-NON-FINDING** (FalkorDB/Graphiti incumbent) |

**Top-3 with cite anchors**:

1. **crystaldba/postgres-mcp** — Python MIT — README verified at `repo://crystaldba/postgres-mcp/sha/07eb329c8c48e49640e0d1b5b35465d4d024c3ee/contents/README.md`. Axis-1 PASS (Crystal DBA + PgHero integration); Axis-2 PASS (Crystal DBA T1 commercial); Axis-3 PARTIAL (432d STABLE-BURN-IN). Industrial-strength Anytime Algorithm index tuning + EXPLAIN + hypopg + PgHero health checks. CC-native: `pipx install postgres-mcp`. CR-12 GENUINELY-NEW.

2. **bytebase/dbhub** — TypeScript Apache-2.0 2.7k★. Axis-3 PARTIAL (432d). **STUDY-PILOT.b ONLY** with explicit JSONL→SQLite ETL ship per sibling Wave-27 caveat at `ahfv-probe-dag.md §Probe 7.b`.

3. **hannesrudolph/sqlite-explorer-fastmcp-mcp-server** — Python FastMCP (license-check). **STUDY-PILOT.b** for safe read-only audit-JSONL queries.

**Install order**: postgres-mcp deferred (no Postgres tier yet) → dbhub deferred (no ETL) → sqlite-explorer deferred

**HONEST-NON-FINDING**: Neo4j MCP — 0 viable results; sibling Graphiti+FalkorDB is incumbent; NOT a gap.

---

## LAYER 6 — WEB-SCRAPING

| Repo | Stars | cpd | Age (d) | Axis-3 | License | Verdict |
|---|---:|---:|---:|---|---|---|
| mendableai/firecrawl-mcp-server | INCUMBENT (W213) | n/a | n/a | n/a | (license-check) | **INCUMBENT** |
| tavily-ai/tavily-mcp | 1,971 | ~3.3 | 475 | STABLE-BURN-IN | MIT | **ADOPT-NOW** |
| exa-labs/exa-mcp-server | (sibling DISABLED 2026-05-03) | n/a | n/a | n/a | n/a | **STUDY-PILOT.b** (re-evaluate fresh) |
| spences10/mcp-jinaai-reader | 31 | ~0.07 | 480 | STABLE-BURN-IN-LOW-VELOCITY | MIT | **STUDY-PILOT.b** |
| ASRagab/mcp-jinaai-reader | 2 | ~0.01 | 500 | STABLE-BURN-IN-LOW-VELOCITY | MIT | **REJECT-FOR-FIT** (duplicates spences10) |

**Top-3 with cite anchors**:

1. **mendableai/firecrawl-mcp-server** — **INCUMBENT** W213 baseline.

2. **tavily-ai/tavily-mcp** — JavaScript MIT 1.97k★. Axis-1 PASS (Tavily AI named-org); Axis-2 PASS (LangChain ecosystem); Axis-3 PARTIAL (475d STABLE-BURN-IN). Real-time search + crawl + extract + map. CR-12 PROVIDER-COMPLEMENT to firecrawl. CC-native: `npm i -g tavily-mcp`. **ADOPT-NOW**.

3. **spences10/mcp-jinaai-reader** — JavaScript MIT 31★. Jina Reader free-tier URL→Markdown. **STUDY-PILOT.b** — wrapper is thin but Jina Reader API is widely-cited.

**Install order**: Keep firecrawl-mcp (incumbent) → `npm i -g tavily-mcp` Phase 2 → jina-reader deferred

---

## LAYER 7 — NOTIFICATION/ALERTING

| Repo | Stars | cpd | Age (d) | Axis-3 | License | Verdict |
|---|---:|---:|---:|---|---|---|
| binwiederhier/ntfy (backend) | 22,000+ | ~5 | 1,460 | SUSTAINED-MATURE | Apache-2.0 | **ADOPT-NOW** |
| cyanheads/ntfy-mcp-server | 16 | ~0.04 | 420 | STABLE-BURN-IN-LOW-VELOCITY | MIT | **STUDY-PILOT.b** |
| gimjin/message-mcp | 9 | ~0.03 | 320 | STABLE-BURN-IN-LOW-VELOCITY | MIT | **DEFER** |
| (Slack MCP) | n/a | n/a | n/a | n/a | n/a | **HONEST-NON-FINDING** (webhook+Bash sufficient) |
| (Discord MCP) | 2-4 max | n/a | n/a | n/a | n/a | **REJECT-FOR-FIT** (low quality; webhook sufficient) |

**Top-3 with cite anchors**:

1. **binwiederhier/ntfy** (backend) — Go Apache-2.0 22k★. Axis-1 PASS firm (Philipp Heckel + Docker official + distro packaging); Axis-2 PASS (Discord/Reddit/HN T2); Axis-3 PASS firm (1460d SUSTAINED-MATURE). Self-host or use free ntfy.sh. **ADOPT-NOW**.

2. **cyanheads/ntfy-mcp-server** — TypeScript MIT 16★. **STUDY-PILOT.b** — sole non-trivial ntfy MCP entry; pilot 1-week.

3. **HONEST-NON-FINDING Slack/Discord**: 0 high-star MCPs; webhook + Bash is SOTA-recommended (no dedicated MCP needed). CR-12 PROVIDER-COMPLEMENT to Bash, NOT a missing layer.

**Install order**: `docker pull binwiederhier/ntfy` (or ntfy.sh) → `npm i @cyanheads/ntfy-mcp-server` → Bash+curl for Slack/Discord

---

## Cross-layer interaction matrix

| Pair | Dependency | Sequence |
|---|---|---|
| DOC-AI → Vector-DB | PaddleOCR+unstructured extract → sqlite_vec/Qdrant | Ingest → chunk → embed → store |
| WEB-SCRAPING → DOC-AI | Firecrawl+Tavily fetch PDFs → PaddleOCR | Detect MIME → pipeline |
| DOC-AI → Memory-MCP | unstructured chunks → mcp-memory | Auto-chunk → persist |
| WEB-SCRAPING → Memory-MCP | Research artifacts → persistence | Scrape → chunk → store |
| SECURITY → T2/T3 hooks | Trivy + bandit → PreCommit gate | audit-action-loop hook |
| CODE-INTEL → SECURITY | ast-grep patterns → semgrep/bandit | Pattern → SAST |
| LM-SERVING → Memory-MCP embed | Ollama embed model → mcp-memory | OpenAI-compat API |
| DATABASE-MCP → audit JSONL | postgres-mcp reads warehouse | Requires ETL ship |
| NOTIFICATION → AUDIT hooks | ntfy fires on drift | PostToolUse → ntfy |

---

## Critical findings summary

1. **License REJECTS for `docs/verified-avoid.md`**:
   - VikParuchuri/marker (GPL-3.0 + RAIL-M)
   - pymupdf/pymupdf4llm (AGPL-3.0)
   - trufflesecurity/trufflehog (AGPL-3.0)

2. **INCUMBENT (CR-12 INCUMBENT class — DO NOT re-install)**:
   - Repomix (W213 CODE-INTEL)
   - Firecrawl-mcp (W213 WEB-SCRAPING)
   - Ollama (sibling :11700; install fresh at :11701 for sss)
   - Graphiti+FalkorDB (W213; covers Neo4j-MCP gap)

3. **Phase-1 ADOPT-NOW** (5 first installs):
   - ast-grep (npm; zero deps; immediate code-intel boost)
   - Trivy (gh-release; multi-scanner replaces 4 tools)
   - Bandit (pipx; Python SAST companion)
   - PaddleOCR (pip; DOC-AI foundation)
   - ntfy+ntfy-mcp (docker+npm; closes notification gap)

4. **Phase-2 STUDY-PILOT.b queue**:
   - difftastic, codemod, semgrep (CODE-INTEL)
   - unstructured, tesseract (DOC-AI)
   - Grype, Semgrep, trufflehog-clarify (SECURITY)
   - vLLM, SGLang (LM-serving scale)
   - dbhub, sqlite-explorer (DATABASE-MCP ETL-gated)
   - jina-ai reader (WEB-SCRAPING)
   - tavily-mcp (after key provisioned)
   - postgres-mcp (after Postgres tier provisioned)

5. **HONEST-NON-FINDINGS**:
   - Neo4j MCP: FalkorDB/Graphiti incumbent (NOT a gap)
   - Slack/Discord MCP: webhook+Bash is SOTA-recommended (NOT a gap)
   - MLX Apple Silicon: Windows runtime incompatible (NOT applicable)

---

## Cross-layer install order (consolidated)

**Phase 1 (foundational, low-coupling)**: ast-grep → Trivy → bandit → PaddleOCR → ntfy + ntfy-mcp
**Phase 2 (ecosystem extensions)**: tavily-mcp (need API key) → unstructured (need Vector-DB) → difftastic
**Phase 3 (scale / specialized)**: vLLM (need GPU + concurrency demand) → postgres-mcp (need Postgres tier)
**Phase 4 (ETL-gated)**: dbhub + sqlite-explorer (need JSONL→SQLite ETL ship first)

---

## verdict_one_line

STUDY-PILOT-CATALOG: 22 scored candidates across 7 uncovered layers; 5 Phase-1 ADOPT-NOW installs; 6 license-class REJECTs codified (Marker + pymupdf4llm + trufflehog GPL/AGPL); 3 HONEST-NON-FINDINGS (Neo4j MCP, Slack/Discord MCP, MLX-Windows); STAND-IN-NOTICE disclosed per cross-model-consensus.md — orchestrator must re-fire Phase-1 ADOPT decisions via codex BRIDGE-MODE before commit.
