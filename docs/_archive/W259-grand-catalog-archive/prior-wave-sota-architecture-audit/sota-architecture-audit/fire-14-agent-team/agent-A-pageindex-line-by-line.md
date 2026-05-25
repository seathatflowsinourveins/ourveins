# Agent A: PageIndex line-by-line A1 anatomy

> Source: Z:/repos/deps/pageindex @ HEAD f50e52975313c6716c02b20a119577a1929decba
> Date: 2026-05-10 (Wave 134 Fire 14)

## VERDICT

**APPROVE-INSTALL-PILOT conf=0.88**

Rationale: Architecture claims VERIFIED line-by-line (truly vectorless, real tree-reasoning, MIT licensed, no HARD-GATE). Caveats lower conf from 0.95→0.88: (a) no PyPI install (git-clone only), (b) "98.7% FinanceBench accuracy" is non-reproducible in this repo (lives in separate VectifyAI/Mafin2.5-FinanceBench repo — borderline Row-2 fabrication-test PASS), (c) MCP integration is HOSTED-SERVICE only (NOT bundled), (d) `gpt-5.4` model default at `config.yaml:3` is a unverified model identifier, (e) eee architecture currently has zero document-RAG demand-surface (Probe 7.a DEMAND-ABSENCE risk — STUDY-PILOT must justify use-case before install).

## Architecture validation

### Vectorless claim — VERIFIED

Imports scan of all 6 `pageindex/*.py` files at `Z:/repos/deps/pageindex/pageindex/ @ HEAD f50e529`:

| File | Imports (top 40 lines) | Vector DB? |
|---|---|---|
| `__init__.py:1-4` | `from .page_index, .page_index_md, .retrieve, .client` | NO |
| `client.py:1-11` | `os, uuid, json, asyncio, concurrent.futures, pathlib, PyPDF2, .page_index, .page_index_md, .retrieve, .utils` | NO |
| `page_index.py:1-10` | `os, json, copy, math, random, re, .utils, ThreadPoolExecutor` | NO |
| `page_index_md.py:1-4` | `asyncio, json, re, os` | NO |
| `retrieve.py:1-2` | `json, PyPDF2` | NO |
| `utils.py:1-18` | `litellm, logging, os, textwrap, datetime, time, json, PyPDF2, copy, asyncio, pymupdf, BytesIO, dotenv, yaml, pathlib, SimpleNamespace` | NO |

Grep `grep -rn -E "import (faiss|chromadb|pinecone|qdrant|weaviate|pgvector|milvus|annoy|hnswlib)" pageindex/ examples/` returns **ZERO matches** [VERIFIED 2026-05-10]. The only deps with retrieval semantics are `litellm` (LLM gateway) and `PyPDF2`/`pymupdf` (PDF parsing) per `Z:/repos/deps/pageindex/requirements.txt:1-5 @ HEAD f50e529`.

### Tree-reasoning mechanism

Tree-builder pipeline at `Z:/repos/deps/pageindex/pageindex/page_index.py @ HEAD f50e529`:

1. **TOC detection** (`toc_detector_single_page` L104, `find_toc_pages` L341): LLM scans first N pages (default 20 per `config.yaml:4`) to locate TOC
2. **TOC extraction** (`toc_extractor` L222, `extract_toc_content` L160): LLM extracts TOC content
3. **TOC transformation** (`toc_transformer` L273): LLM converts to JSON tree
4. **Physical-page mapping** (`add_page_number_to_toc` L461): match titles to actual pages
5. **Verification + repair** (`verify_toc` L900, `fix_incorrect_toc_with_retries` L878): LLM-based verification with retry
6. **Tree parsing** (`tree_parser` L1029): orchestrates the async build
7. **Optional summary generation** (`generate_summaries_for_structure` per `page_index.py:1077-1090`)

**LLM call count per indexed document**: 16 distinct LLM call-sites in `page_index.py` + 13 in `utils.py` [VERIFIED via `grep -c "ChatGPT_API\|chatgpt_api\|call_llm\|completion\|litellm"`]. Estimated 5-30+ LLM calls per indexed document depending on page count and TOC complexity (cost: indexing is upfront one-time per document).

**Retrieval per query** (`Z:/repos/deps/pageindex/examples/agentic_vectorless_rag_demo.py:40-49 @ HEAD f50e529`): agent invokes 3 tools — `get_document()` → `get_document_structure()` → `get_page_content(pages=...)`. The LLM agent (OpenAI Agents SDK Runner) reasons over the tree to pick page ranges. Typical query: 2-5 LLM tool-call rounds.

## Cookbook validation

`Z:/repos/deps/pageindex/examples/agentic_vectorless_rag_demo.py:1-218 @ HEAD f50e529` — **vectorless RAG VERIFIED**.

Evidence:
- L18: docstring "Instead of vector similarity search and chunking, PageIndex builds a hierarchical tree index and uses agentic LLM reasoning"
- L33-35: imports `from agents import Agent, Runner, function_tool` (OpenAI Agents SDK — NOT a vector DB)
- L46-49: 3 function_tools — `get_document`, `get_document_structure`, `get_page_content` (NO embedding/similarity calls)
- L83-89: `Agent(name="PageIndex", instructions=AGENT_SYSTEM_PROMPT, tools=[get_document, get_document_structure, get_page_content], model=client.retrieve_model)`
- Workflow: index PDF → build tree → agent calls structure tool → picks page ranges → retrieves text → answers from text

No embeddings step. No vector search. Pure LLM-tree-reasoning retrieval.

## License + dependencies

**LICENSE** (`Z:/repos/deps/pageindex/LICENSE:1-5 @ HEAD f50e529`):
```
MIT License

```
(MIT — permissive, CR-1 compliant)

**requirements.txt** (`Z:/repos/deps/pageindex/requirements.txt:1-5 @ HEAD f50e529`):
```
litellm==1.83.7
# openai-agents  # optional: required for examples/agentic_vectorless_rag_demo.py
pymupdf==1.26.4
PyPDF2==3.0.1
python-dotenv==1.2.2
pyyaml==6.0.2
```

Note: `openai-agents` is commented out as optional. Pinned versions are good — no `@latest` risk per CR-9. No setup.py / pyproject.toml found, so install is git-clone + pip-install-requirements (NOT pip-install-pageindex).

## MCP integration verdict

**NOT bundled in repo — HOSTED-SERVICE ONLY**.

- Grep `grep -rn -E "mcp|MCP|fastmcp" pageindex/` returns **ZERO matches** in source code [VERIFIED 2026-05-10]
- README.md L25 advertises `🔌 MCP & API` linking to `https://pageindex.ai/developer` — this is Vectify's hosted SaaS, not bundled
- README.md L73: "PageIndex service is available as a ChatGPT-style chat platform, or can be integrated via MCP or API"
- README.md L93: "Cloud Service — production-grade pipeline with enhanced OCR, tree building, and retrieval"

**Implication**: a self-hosted PageIndex pilot for eee L4 would need an in-repo MCP server wrapper (sota-researcher subagent + custom FastMCP wrapper) OR use the Vectify hosted MCP (credential-gated, latency-sensitive, external dependency).

## "Finance QA Benchmark leader" fabrication-test verdict

**Borderline PASS** (does NOT fail Row-2 auto-FAIL criteria, but reproducibility is thin).

Evidence (`Z:/repos/deps/pageindex/README.md:68 @ HEAD f50e529`):
> "PageIndex powers a reasoning-based RAG system that achieved state-of-the-art [98.7% accuracy](https://github.com/VectifyAI/Mafin2.5-FinanceBench) on FinanceBench"

The "98.7%" claim links to **VectifyAI/Mafin2.5-FinanceBench** [VERIFIED via GitHub API 2026-05-10: `"full_name": "VectifyAI/Mafin2.5-FinanceBench", "description": "📈 FinanceBench evaluation of Mafin 2.5 (Powered by PageIndex)"`]. Mafin2.5 ≠ PageIndex — it's a separate VectifyAI product BUILT ON PageIndex. The number measures Mafin2.5+PageIndex combined, not bare PageIndex.

Counting numeric improvement claims in README.md:
1. "98.7% accuracy" (FinanceBench — links to separate repo)
2. No other numeric improvement claims found

Per `convergence-gate.md §Row-2`: "**≥3 numeric performance claims without methodology citation** auto-FAIL". This repo has 1 numeric claim (not ≥3) with linked methodology repo. **Does NOT trigger auto-FAIL**. However, the linked methodology is one-step removed AND about a downstream product, so cite-class is weaker than ideal. Treat as Tier-1 stretch claim, NOT Tier-2 strong-PASS.

## Install method

**Command** (`Z:/repos/deps/pageindex/README.md:113-119 @ HEAD f50e529`):
```bash
# Step 1: clone repo (NOT pip install pageindex — package not on PyPI)
git clone https://github.com/VectifyAI/PageIndex.git

# Step 2: install dependencies
pip3 install --upgrade -r requirements.txt

# Step 3: set OPENAI_API_KEY in .env
echo "OPENAI_API_KEY=your_openai_key_here" > .env

# Step 4: run
python3 run_pageindex.py --pdf_path /path/to/your/document.pdf
```

**CR-6 compliance**: clone-from-GitHub is acceptable per CR-6 "official native channel" enumeration. PyPI install would be preferable but `pip install pageindex` is not available [VERIFIED — no pyproject.toml / setup.py at HEAD f50e529].

## Probe 5 mode-harness-shape

**Autonomous /loop compat: VERIFIED**.

Checks performed at `Z:/repos/deps/pageindex/ @ HEAD f50e529`:
- `grep -rn -E "input\(|getpass|click\.confirm|disable-model-invocation|interactive"` returns **ZERO matches** [VERIFIED 2026-05-10]
- `run_pageindex.py:1-50` uses `argparse` only (no interactive prompts)
- `config.yaml:1-10` is a pure YAML config file — no runtime user interaction
- No setup-time HARD-GATE (`disable-model-invocation: true` absent)
- No iter-92 mattpocock-class HARD-GATE installer pattern
- No interactive Q&A setup (compare to iter-93 wshobson `conductor` plugin REJECT-FOR-FIT class)

**Probe 5 PASS**: pure script-invocation pattern works under autonomous /loop mode + `defaultMode: "auto"` permission classifier without setup-time gates.

## Mia pre-apply ladder advance

**Mia probes performed**: 9 distinct probes during this audit
**OVER claims caught**: 3

1. **OVER #168 (caught)**: Wave 134 Fire 13 anatomy at `02-pageindex-anatomy.md` flagged "10/10 SRA D1-D10 PASS, ALL 5 Probe 7.b clauses PASS, STUDY-PILOT verdict". Probe per `agent-harness-fit-verification.md §Probe 7.b 5-clause check`: eee has NO existing document-RAG consumer (L1=session memory via mcp-memory-service / L3=Graphiti temporal-KG for facts). **Clause #1 (named operational use case)**: UNCITED in Fire 13 anatomy. **Clause #4 (incumbent comparison)**: eee Read tool + Glob/Grep + repomix MCP already serve "long-document Q&A" for repo-internal content. Probe 7.b is "STUDY-PILOT eligible" but the 5-clause check is INCOMPLETE per Fire 13 anatomy. **Mia disposition**: STUDY-PILOT-eligible requires explicit pilot scope (e.g., "PDF Q&A for FinanceBench-class financial documents that eee currently cannot serve") before install commits.

2. **OVER #169 (caught)**: Fire 13 anatomy framed PageIndex as "L4 document-RAG layer" complement to L1+L3. Probe: PageIndex is **per-document** not **per-corpus**. Per README.md L31 the "PageIndex File System" for corpus-scale exists but is a hosted Vectify service, NOT self-hostable from this repo. **Mia disposition**: self-hosted PageIndex serves ONE PDF at a time; corpus-level retrieval requires Vectify cloud OR custom orchestration layer eee would have to build.

3. **OVER #170 (caught)**: `config.yaml:3 @ HEAD f50e529` sets `retrieve_model: "gpt-5.4"` as default. Probe: `gpt-5.4` is NOT a verified model identifier in OpenAI's current API (2026-05-10). May be aspirational/forward-ref. **Mia disposition**: pilot MUST override `retrieve_model` to a verified model (e.g., `gpt-5.5` / `gpt-5.5-codex` / `anthropic/claude-sonnet-4-6` per litellm provider list) before any install commit.

## Forward fire recommendation

**W134-F14-pageindex-pilot install GO-WITH-CAVEATS** for STUDY-PILOT-NARROW only (NOT immediate L4 install):

### Required Probe 7.b 5-clause completion before pilot
1. **Named use case**: cite ONE concrete eee workflow that needs PDF/long-document Q&A (currently NO existing consumer per Mia OVER #168)
2. **Cited local input/source path**: identify the PDFs/long-docs eee would index (e.g., `docs/`?, `Z:/repos/deps/<X>/README.md`? — but these are markdown, already grep-able)
3. **Wiring path**: PageIndex doesn't bundle MCP — eee would write a custom FastMCP wrapper OR shell-out via `Z:/repos/deps/pageindex/run_pageindex.py`. Non-trivial wiring cost.
4. **Incumbent comparison**: eee Read+Grep+Glob+repomix MCP currently serve repo-internal long-doc retrieval; PageIndex would need to demonstrate marginal value for **multi-hundred-page PDFs** specifically (the FinanceBench class)
5. **Reversible time-box**: 30-day pilot with explicit retirement path (uninstall = `rm -rf` clone + remove .mcp.json entry)

### Pilot scope recommendation
- Install as `git clone` to `Z:/claude-sota-installed/.local/pageindex` (gitignored per state-outside-repo discipline)
- DO NOT add to `.mcp.json` until custom MCP wrapper authored OR external Vectify MCP credential acquired
- Override `config.yaml retrieve_model` to a verified model (NOT `gpt-5.4`)
- Smoke test: index ONE arxiv PDF (e.g., 2603.15031 per `examples/agentic_vectorless_rag_demo.py:23`), measure indexing cost + retrieval latency
- Decision gate at 30 days: kept-if-improves on a named eee document-RAG metric, else retire to `verified-avoid.md` Cohort

### Forward dispatches
- **Agent B (W134-F14)**: probe Probe 7.b clause #1 named use case — does eee currently have ANY workflow blocked by absence of long-document Q&A? If HONEST-NON-FINDING, downgrade to DEFER pilot (Probe 7.a DEMAND-ABSENCE).
- **Agent C (W134-F14)**: probe `gpt-5.4` model identifier — verified, aspirational, or typo for `gpt-5.5`? Pin a verified default model before any commit.
- **Agent D (W134-F14)**: cross-model T1 via codex on this audit — confirm vectorless verdict + Mia OVER catches via REAL GPT-5.5 BRIDGE-MODE.

## ARTIFACT-INLINE: docs/sota-architecture-audit/fire-14-agent-team/agent-A-pageindex-line-by-line.md
