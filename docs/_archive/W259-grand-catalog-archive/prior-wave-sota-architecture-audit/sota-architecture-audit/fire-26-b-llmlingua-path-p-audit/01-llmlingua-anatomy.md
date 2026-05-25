# 01 — microsoft/LLMLingua Line-by-Line Anatomy

> **Probe method**: direct `Z:/repos/deps/LLMLingua/` filesystem read at local HEAD `e0e9d99` (codex T1 corrected — orchestrator specified `ba1463a` which exists locally but is NOT current HEAD)
> **Cite class**: TIER-1-DIRECT @ file:line @ HEAD SHA
> **Verification**: cross-confirmed by Path P codex T1 @ `.claude/state/codex_consult_w134_f26b_llmlingua_OUT.txt`

## Repo metadata

| Field | Value | Cite |
|---|---|---|
| Repo | `microsoft/LLMLingua` | local clone `Z:/repos/deps/LLMLingua/` |
| **Current local HEAD** | **`e0e9d99`** (codex T1 Mia catch on orchestrator's stale `ba1463a` reference) | codex T1 trace |
| `ba1463a` | Exists locally but NOT current HEAD ("add securitylingua training recipe" commit) | codex T1 trace |
| License | **MIT (PURE PERMISSIVE)** | `Z:/repos/deps/LLMLingua/LICENSE:1-21` |
| Org | **Microsoft** TIER-1-OFFICIAL | setup.py:1 Copyright + author_email "hjiang@microsoft.com" |
| Stars | 6,067 | Fire 25 Exa probe |
| Python req | >=3.8.0 | setup.py:python_requires |
| Module | `llmlingua` | __init__.py |
| PyPI package | `llmlingua` | setup.py:name |
| Locally pip-installed | **NO** (`pip show llmlingua` returns "not found" in `Z:/venvs/claude`) | Mia pre-apply probe |

## 🚨 Mia OVER catch by codex T1 (3rd in Wave 134 NEW-candidate series)

Codex T1 caught orchestrator HEAD specification error:
- Orchestrator pre-codex: "HEAD `ba1463a` add securitylingua training recipe"
- Codex T1 local probe: current HEAD is `e0e9d99`; `ba1463a` exists in local history but is not HEAD

Per codex T1 verbatim:
> "Caveat: local checkout HEAD is e0e9d99, not the prompt's ba1463a, though ba1463a exists locally."

3rd Mia OVER in Wave 134 NEW-candidate series:
1. Fire 24-D Agent OS hard-coded path (orchestrator probed wrong dimension)
2. Fire 26-A cisco-ai-mcp-scanner already-installed (orchestrator marked "not installed")
3. **Fire 26-B LLMLingua HEAD specification error** (orchestrator used outdated reference)

## Publication provenance (TIER-1-DIRECT peer-reviewed)

| Paper | Venue | Year | URL |
|---|---|---|---|
| LLMLingua | EMNLP'23 | 2023 | https://aclanthology.org/2023.emnlp-main.825/ |
| LongLLMLingua | ACL'24 Long Papers | 2024 | https://aclanthology.org/2024.acl-long.91/ |
| LLMLingua-2 | ACL'24 Findings | 2024 | https://aclanthology.org/2024.findings-acl.57/ |
| **SecurityLingua** (NEW, codex T1 cite) | OpenReview CoLM 2025 | 2025 | https://openreview.net/forum?id=tybbSo6wba |

**4 peer-reviewed papers** at top NLP venues — STRONGEST academic provenance of any Wave 134 candidate.

## Architecture (Python package)

```
LLMLingua/
├── llmlingua/                  (~115K Python code)
│   ├── __init__.py (230B)
│   ├── prompt_compressor.py (107.5K — core compression logic; codex T1 cite at :71-93,118-161 for model loading)
│   ├── utils.py (7.9K)
│   └── version.py
├── examples/
├── experiments/
│   ├── llmlingua2/
│   │   ├── data_collection/
│   │   ├── evaluation/
│   │   └── model_training/
│   └── securitylingua/         (latest addition)
├── tests/
├── DOCUMENT.md (26.6K)
├── README.md (18.9K)
├── Transparency_FAQ.md (10.9K)
├── LICENSE (MIT)
├── SECURITY.md (2.7K)
├── setup.py (codex T1 cite at :25-31 for dependencies)
└── pyproject.toml
```

## Dependencies (HEAVY install footprint)

Per setup.py:25-31:

```python
INSTALL_REQUIRES = [
    "transformers>=4.26.0",   # HuggingFace transformers (~500MB-1GB)
    "accelerate",              # HuggingFace acceleration
    "torch",                   # PyTorch (~2-3 GB)
    "tiktoken",                # OpenAI tokenizer
    "nltk",                    # NLP utilities
    "numpy",
]
```

**Total install footprint estimate**: ~5-10 GB (mostly PyTorch + Transformers + HuggingFace model downloads).

Codex T1 install_footprint_acceptable: **CAVEAT-NOTED** — acceptable for SIDECAR pilot, not default eee runtime.

## 🚨 Security caveat — trust_remote_code=True default

Codex T1 critical finding:

> "Default `trust_remote_code=True` in PromptCompressor"

HuggingFace's `trust_remote_code=True` is a known supply-chain attack vector — allows arbitrary
code execution from model repositories. eee installation would need to override this default.

## 3 algorithm variants

### LLMLingua (EMNLP'23)

- Compact pre-trained LM (GPT2-small / LLaMA-7B) identifies non-essential tokens
- Up to **20x compression** with "minimal performance loss"
- Coarse-to-fine budget control + token-level iterative compression

### LongLLMLingua (ACL'24)

- Addresses "lost in the middle" issue in long contexts
- **+21.4% RAG performance** with 1/4 tokens
- Question-conditioned context ranking/reordering

### LLMLingua-2 (ACL'24 Findings)

- Task-agnostic compression via data distillation from GPT-4
- BERT-level Transformer encoder for token classification
- **3x-6x faster** than original LLMLingua
- Codex T1: "highest-value future pattern because it is faster and less tied to causal-LM perplexity"

### SecurityLingua (latest, CoLM 2025)

- Security-aware intention extraction as guardrail
- Codex T1: "research pattern only, not default eee runtime"

## Ecosystem integrations

- LangChain (RAG token compression)
- LlamaIndex (RAG-pipeline compression)
- Microsoft Prompt flow
- HuggingFace Spaces demos (LLMLingua + LLMLingua-2)

## Usage pattern (Python SDK only)

```python
from llmlingua import PromptCompressor
llm_lingua = PromptCompressor("TheBloke/Llama-2-7b-Chat-GPTQ", model_config={"revision": "main"})
compressed = llm_lingua.compress_prompt(prompt, instruction=instruction, question=question)
```

**Python SDK only** — no CLI binary, no MCP server, no REST API.

This is DIFFERENT from Fire 26-A cisco-ai-defense/mcp-scanner which has CLI + REST + SDK + static-offline modes.

## eee fit analysis (codex T1 explicit refutation of Fire 25 ranking)

🚨 **CRITICAL ARCHITECTURAL INSIGHT FROM CODEX T1**:

Per codex T1 verbatim `addresses_fire23_p0: "NO"`:

> "LLMLingua prompt compression is orthogonal to session-start plugin descriptor budget.
> For Fire 23 P0, prefer selective tool/plugin loading or descriptor-pruning patterns."

This REFUTES my Fire 25 close synthesis ranking which placed LLMLingua as #2 priority
specifically BECAUSE it would "directly address Fire 23 P0 token-budget caveat".

**The correct primitive for Fire 23 P0 is W134-F24-C3 Task Master Selective MCP Tool-Loading**
(TASK_MASTER_TOOLS env tiers — addresses session-start plugin/MCP descriptor budget directly).

LLMLingua compresses prompts at API-CALL LAYER (not session-start). These are different
layers of the token-economy:
- Session-start: plugin/skill/MCP descriptor inflation (Fire 23 P0)
- Per-task: prompt + context compression (LLMLingua scope)

## Integration option D verdict (codex T1 prescribed)

Per codex T1 `recommended_integration_option: "D"`:

**Option D = CITE-PATTERN-ONLY**: don't install. Document LLMLingua API + patterns;
reference for future when actual evidence shows large non-cacheable outputs constrain.

Pilot only if quantitative evidence emerges of recurring large non-cacheable MCP/research
outputs (Option B sidecar — input from `.claude/state/codex_consult_*_OUT.txt` or
context-mode event logs).

## Mia ladder advance

n=1684 → n=1691 (+7: anatomy probe + Mia HEAD-mismatch catch / 4 peer-reviewed papers
documented / trust_remote_code=True security flag / Fire 23 P0 misframing refutation /
W134-F24-C3 re-elevation as correct P0 primitive / 4 algorithm variants + SecurityLingua /
Option D verdict)
