# 02 — VectifyAI/PageIndex anatomy (Tier-3 vectorless RAG)

> **Source**: `Z:/repos/deps/pageindex @ HEAD f50e52975313c6716c02b20a119577a1929decba [VERIFIED 2026-05-10]`
> **License**: MIT (verified at root LICENSE)
> **Stars**: 30,416 (Fire 12 discovery)
> **Push**: 2026-05-08 (2 days ago — ACTIVE)
> **Audit depth**: README full structure + introduction + structure probe

## What it is (verbatim from README:46-58)

> **PageIndex: Vectorless, Reasoning-based RAG**
> Reasoning-based RAG ◦ No Vector DB or Chunking ◦ Context-Aware ◦ Human-like Retrieval
>
> Are you frustrated with vector database retrieval accuracy for long professional
> documents? Traditional vector-based RAG relies on semantic *similarity* rather than
> true *relevance*. But **similarity ≠ relevance** — what we truly need in retrieval
> is **relevance**, and that requires **reasoning**. When working with professional
> documents that demand domain expertise and multi-step reasoning, similarity search
> often falls short.
>
> Inspired by AlphaGo, we propose **PageIndex** — a **vectorless**, **reasoning-based
> RAG** system that builds a **hierarchical tree index** from long documents and uses
> LLMs to **reason** *over that index* for **agentic, context-aware retrieval**.

## Architecture primitive (NOVEL — vectorless)

```
LONG-DOC INPUT
    ↓
PageIndex Tree Builder (hierarchical tree index)
    ↓
PageIndex Tree (in-context tree)
    ↓
LLM reasons OVER the tree (no vector similarity)
    ↓
Context-aware retrieval (relevance via reasoning)
```

Differentiator: **no vector embeddings, no chunking, no vector DB**. Uses LLM to walk a
tree structure → matches AlphaGo-style tree-search-with-reasoning paradigm.

## Key README sections (load-bearing)

- L46 Introduction
- L62 Core Features
- L73 Explore PageIndex
- L79 Deployment Options
- L84 Quick Hands-on
- L106 PageIndex Tree Structure
- L144 Package Usage
- L150 Install dependencies
- L156 Set LLM API key
- L164 Generate PageIndex structure for PDF
- L198 Agentic Vectorless RAG: An Example
- L211 Improved Tree Generation with PageIndex OCR
- L227 Case Study: PageIndex Leads Finance QA Benchmark

## Notable ecosystem features

- **PageIndex Chat platform** (https://chat.pageindex.ai) — human-like doc analysis
- **MCP server** (https://pageindex.ai/developer) — Claude Code native integration!
- **API** for cloud-hosted use
- **PageIndex File System** — corpus-level tree (millions of documents scale)
- **Vectorless RAG demo** uses OpenAI Agents SDK
- **PageIndex OCR** — Improved tree generation
- **Finance QA Benchmark leader** (case study claim — needs verification per
  `convergence-gate.md §Row-2 fabrication-test` discipline)

## SRA D1-D10 verdict

| Dim | Score | Notes |
|---|---|---|
| D1 license-use-class | PASS | MIT — fully permissive |
| D2 freshness | PASS | 2-day push, ACTIVE |
| D3 fresh-paint clear | PASS | 30k★ + deep README + Python codebase + cookbook + benchmark |
| D4 maintainer-provenance | PASS | VectifyAI = named org with named product platform (pageindex.ai) |
| D5 active-maintenance | PASS | active commits + MCP server + multiple deployment options |
| D6 use-class compat | PASS | MCP-native = CC compatible; local Python lib + cloud option |
| D7 Anthropic-aligned | PASS | MCP standard (Anthropic-defined) supported |
| D8 industry adoption | PASS | 30k★ + Finance QA Benchmark claim + active Discord |
| D9 FM-class clear | PASS | no FM-class concern surfaced |
| D10 replacement viability | NOVEL | NOT replacing — VECTORLESS is architecturally distinct from existing L1 sqlite_vec + L3 Graphiti stack |

**SRA score: 10/10 PASS** — strong candidate for Tier-3 memory layer EXPANSION (not replacement).

## eee architecture impact

PageIndex is **architecturally COMPLEMENTARY** to existing memory stack:

| Layer | Existing eee | PageIndex addition |
|---|---|---|
| L1 capture | mcp-memory-service (sqlite_vec) | (unchanged) |
| L2 vector | sqlite_vec embedded | (unchanged) |
| L3 temporal-KG | Graphiti + FalkorDB | (unchanged) |
| **L4 document-RAG** | (gap) | **PageIndex vectorless tree-index** for long-doc reasoning |
| L4 wiki | Karpathy 3-layer | (unchanged) |

PageIndex fills a GAP in eee's memory stack: long-professional-document RAG. Existing L1/L3
target conversation-memory + temporal-KG; PageIndex targets domain-document reasoning.

## Architecture verdict: STUDY-PILOT 🔬

**🔬 STUDY-PILOT — Tier-3 L4 document-RAG addition**

**5-clause Probe 7.b check**:
1. ✅ Named operational use case: long-document analysis (financial filings, research papers, contracts) — eee currently has zero capability here
2. ✅ Cited local input/source: any PDF / long-doc the user wants reasoned over
3. ✅ Wiring path: PageIndex MCP at https://pageindex.ai/developer → `.mcp.json` registration
4. ✅ Incumbent comparison: no existing eee primitive covers vectorless doc-RAG; sqlite_vec + Graphiti are conversation/concept memory
5. ✅ Reversible time-box: 30-day MCP install pilot; remove via `.mcp.json` disable if no traction

**W134-F14 candidate**: install PageIndex MCP for doc-RAG pilot (after Fire 7 install gate
recovery).

## Why-SOTA

1. **Vectorless architecture** = NOVEL differentiator (no vector DB, no chunking)
2. **AlphaGo-inspired** tree-reasoning = principled retrieval-as-reasoning paradigm
3. **MCP-native** = canonical Anthropic install path
4. **30k★ MIT** = strong adoption + permissive
5. **PageIndex File System** = corpus-level scale (millions of documents)
6. **Finance QA Benchmark leader** = measurable claim (needs Row-2 verification)
7. **Multiple deployment options** (local Python / MCP / API / Chat platform)
8. **OCR support** for PDF-as-image documents

## Risk classification

- **Install class**: PRIMARY (MCP via `.mcp.json` registration — canonical CC install)
- **Reversibility**: HIGH — disable MCP entry
- **Blast radius**: LOW (additional MCP server, no replacement)
- **License**: MIT clean
- **Verification gate**: per `convergence-gate.md §Row-2 fabrication-test`, verify the
  "Finance QA Benchmark leader" claim before adopting as proof-of-SOTA

## Mia ladder advance

n=1184 → n=1188 (+4: MIT verified / vectorless architecture principle / 10/10 SRA / 5-clause Probe 7.b)
