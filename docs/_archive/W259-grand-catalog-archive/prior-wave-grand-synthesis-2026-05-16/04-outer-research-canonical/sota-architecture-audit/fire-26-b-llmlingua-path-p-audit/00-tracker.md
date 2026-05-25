# Fire 26-B — microsoft/LLMLingua Path P Codex T1 Audit

> **Position**: SECOND of revised Top-3 priority post-Fire-25 gap-correction
> **Subject**: `microsoft/LLMLingua` — Microsoft TIER-1-OFFICIAL + EMNLP'23+ACL'24 peer-reviewed
> **Method**: Path P recipe (codex exec foreground+tee — n=15/15 reproducible after Fire 26-A)
> **Pre-codex hypothesis**: CITE-PATTERN-ONLY or STUDY-PILOT-NARROW (integration complexity higher than Fire 26-A Cisco mcp-scanner)

## Subject identification (TIER-1-DIRECT cite anchors — LOCAL CLONE present)

| Field | Value | Cite |
|---|---|---|
| Repo | `microsoft/LLMLingua` | local clone `Z:/repos/deps/LLMLingua/` |
| HEAD SHA | `ba1463a` "add securitylingua training recipe" | `git log -1` |
| Stars | 6,067 (per Exa probe Fire 25) | Fire 25 trace |
| License | **MIT (PURE PERMISSIVE)** | `Z:/repos/deps/LLMLingua/LICENSE:1` |
| Author | The LLMLingua team / hjiang@microsoft.com | setup.py:author + setup.py:author_email |
| Org | **Microsoft** (TIER-1-OFFICIAL named-org) | Copyright header in setup.py |
| Python req | >=3.8.0 | setup.py:python_requires |
| Module name | `llmlingua` | `__init__.py` |
| PyPI package | `llmlingua` | setup.py:name |
| Locally pip-installed? | NO (`pip show llmlingua` returns "not found" in Z:/venvs/claude) | Mia pre-apply probe |

## Mia pre-apply (avoiding Fire 26-A OVER repeat)

Mia confirmed:
- ✅ LLMLingua repo cloned at `Z:/repos/deps/LLMLingua/` (TIER-1-DIRECT cite anchors available)
- ✅ NOT installed in `Z:/venvs/claude` venv (clean baseline, distinct from Fire 26-A)

This is a CLEAN audit baseline: not yet integrated into eee at any level.

## Publication provenance (TIER-1-DIRECT peer-reviewed)

3 published papers under LLMLingua umbrella:

| Paper | Venue | Year | URL |
|---|---|---|---|
| **LLMLingua** | EMNLP'23 (Empirical Methods in NLP) | 2023 | https://aclanthology.org/2023.emnlp-main.825/ |
| **LongLLMLingua** | ACL'24 Long Papers | 2024 | https://aclanthology.org/2024.acl-long.91/ |
| **LLMLingua-2** | ACL'24 Findings | 2024 | https://aclanthology.org/2024.findings-acl.57/ |

**Peer-reviewed at top NLP venues** — strongest academic provenance of any Wave 134 candidate.

## Architecture (Python package; transformers-based)

```
LLMLingua/
├── llmlingua/                  (Python pkg — 4 files, ~115K total)
│   ├── __init__.py (230B)
│   ├── prompt_compressor.py (107.5K — core compression logic)
│   ├── utils.py (7.9K)
│   └── version.py (500B)
├── examples/
├── experiments/                (3 sub-experiments)
│   ├── llmlingua2/             (training data + evaluation + model_training)
│   └── securitylingua/         (latest addition per HEAD)
├── tests/
├── DOCUMENT.md (26.6K)
├── README.md (18.9K)
├── Transparency_FAQ.md (10.9K)
├── LICENSE (MIT)
├── setup.py
└── pyproject.toml
```

**Single core module** `prompt_compressor.py` (107.5K LOC). Heavy `transformers` + `torch` + `accelerate` dependencies.

## Dependencies (HEAVY install footprint)

Per `setup.py:INSTALL_REQUIRES`:
- `transformers>=4.26.0` — HuggingFace transformers (~500MB-1GB on disk)
- `accelerate` — HuggingFace acceleration
- `torch` — PyTorch (~2-3GB on disk)
- `tiktoken` — OpenAI tokenizer
- `nltk` — NLP utilities
- `numpy`

**Total install footprint estimate: ~5-10 GB** (mostly PyTorch + Transformers + HuggingFace model downloads).

This is **significantly heavier** than:
- Fire 26-A Cisco mcp-scanner (lightweight — just MCP scanning library)
- eee's existing token-eff stack (RTK + ccusage + repomix + CLIProxyAPI)

CR-9 install-risk concern: this is the heaviest install of any Wave 134 candidate.

## 3 algorithm variants

Per README + papers:

### LLMLingua (EMNLP'23)
- Uses compact pre-trained LM (GPT2-small / LLaMA-7B) to identify and remove non-essential prompt tokens
- Up to **20x compression** with minimal performance loss

### LongLLMLingua (ACL'24)
- Addresses "lost in the middle" issue in long contexts
- **+21.4% RAG performance improvement** with only 1/4 tokens
- Reorders + compresses information

### LLMLingua-2 (ACL'24 Findings)
- Task-agnostic compression via data distillation from GPT-4
- BERT-level encoder for token classification
- **3x-6x faster** than original LLMLingua

## Ecosystem integrations

Per README:
- ✅ LangChain (RAG token compression)
- ✅ LlamaIndex (RAG-pipeline compression)
- ✅ Prompt flow (Microsoft Prompt flow)
- HuggingFace Spaces demos (LLMLingua + LLMLingua-2)

**Active research ecosystem** — distinct from one-off academic projects.

## Usage pattern (Python SDK only — no CLI binary)

```python
from llmlingua import PromptCompressor

llm_lingua = PromptCompressor("TheBloke/Llama-2-7b-Chat-GPTQ", model_config={"revision": "main"})
compressed = llm_lingua.compress_prompt(prompt, instruction=instruction, question=question)
```

**Python SDK-only** — no CLI binary, no MCP server. Integration requires Python code embedding (DIFFERENT from Fire 26-A Cisco mcp-scanner which has CLI + REST + SDK + static-offline modes).

## eee integration complexity analysis (pre-codex)

eee runtime is Claude Code (closed-loop interactive runtime); eee does NOT directly call Anthropic API. Claude Code does. So LLMLingua integration paths are:

### Option A: Pre-process tool arguments

Integrate as a HOOK that compresses LARGE tool args before they leave eee. But hooks run in the request-response chain; would need to be at PreToolUse with synchronous compression.

**Friction**: PreToolUse hooks are sync 5-12s; LLMLingua compression of large args takes time + GPU/CPU.

### Option B: Compress incoming MCP/research content

Compress large outputs from `mcp__exa__web_search_exa`, `mcp__perplexity__perplexity_search`, etc. BEFORE they reach Claude context.

**Friction**: PostToolUse compression of MCP results — feasible but adds latency.

### Option C: Compress at API gateway layer

Integrate into CLIProxyAPI as a compression middleware BEFORE outgoing API calls.

**Friction**: eee uses CLIProxyAPI cache_control already; adding LLMLingua compression would chain — complexity grows.

### Option D: CITE-PATTERN extract

Don't install. Document the LLMLingua API and patterns; reference for future integration when token-budget P0 actually constrains.

## Pre-codex Probe DAG assessment

| Probe | Pre-codex verdict | Reasoning |
|---|---|---|
| P1 count-OVER | NEEDS-ROW-2-VERIFY | "20x compression with minimal performance loss" — vendor claim; need verification |
| P2 SDK-vs-CLI | PASS (SDK only) | Python SDK; no CLI/REST |
| P3 arch-API | PASS | Uses HuggingFace transformers — open SDK |
| P4 plugin-namespace | PASS | `llmlingua` module — no collision |
| P5 mode-harness | PARTIAL | Integration paths exist (A/B/C) but introduce hook-chain complexity |
| P6 blockers | PASS-with-caveat | MIT ✅ + Microsoft TIER-1 + active + HEAVY install footprint (~5-10 GB) |
| P7a demand-absence | UNCERTAIN | eee has token-eff stack; LLMLingua adds PROACTIVE compression — overlaps partially |
| P7b demand-creates | UNCERTAIN | 5-clause check pending codex T1 |

**Pre-codex aggregate**: 4 PASS + 1 PARTIAL + 2 UNCERTAIN + 1 row-2-needed = HIGHLY DEPENDENT on codex T1 verdict.

## Fire 26-B deliverables (planned)

1. `00-tracker.md` (this file)
2. `01-llmlingua-anatomy.md` — line-by-line anatomy + 3-variant deep-dive + dependency analysis
3. `02-probe-dag-application.md` — Probe DAG 1-7 applied + integration complexity
4. `03-codex-t1-verdict.md` — Path P codex T1 verdict
5. `99-close-synthesis.md` — adoption verdict + Fire 27+ roadmap

## Mia ladder advance

n=1678 → n=1684 (+6: Fire 26-B framing / 3 peer-reviewed papers / HEAVY install footprint flag / 4 integration options analyzed / Mia pre-apply confirmed not-yet-installed / pre-codex Probe DAG mixed signals)
