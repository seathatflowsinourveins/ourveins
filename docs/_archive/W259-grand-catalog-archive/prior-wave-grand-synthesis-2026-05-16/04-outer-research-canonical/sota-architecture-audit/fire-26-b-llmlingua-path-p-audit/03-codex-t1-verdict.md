# 03 — Codex T1 Path P Verdict (Cross-Model GPT-5.5 REAL — Fire 26-B)

> **Method**: Path P recipe (codex exec foreground+tee, n=15 → n=16 reproducible)
> **Tokens**: 82,142 codex-side (smallest of Fire 26 series — clean verdict needed less investigation)
> **Verdict origin**: REAL GPT-5.5 codex CLI
> **Verbatim trace**: `.claude/state/codex_consult_w134_f26b_llmlingua_OUT.txt`

## Verbatim verdict at EOF

```json
{
  "verdict": "CITE-PATTERN-ONLY",
  "confidence": 0.86,
  "summary": "LLMLingua is legitimate and algorithmically distinct: MIT/Microsoft repo, Python SDK, peer-reviewed EMNLP/ACL backing for semantic lossy prompt compression, and local API evidence in Z:/repos/deps/LLMLingua. But it should not enter eee's default runtime now. The useful capability overlaps the token-efficiency goal but not the current mechanisms, while the operational fit is weak: SDK-only, PyTorch/Transformers/HuggingFace footprint, model-load latency, default trust_remote_code=True in PromptCompressor, no CLI/MCP primitive, and A/B/C always-on integrations risk latency, prompt-quality, and cache-control regressions. It also does not directly address Fire 23's 21-plugin session-start budget caveat. Caveat: local checkout HEAD is e0e9d99, not the prompt's ba1463a, though ba1463a exists locally.",
  "probe_dag_verdicts": {
    "P1_count_over": "PASS",
    "P2_sdk_vs_cli": "PASS",
    "P3_arch_api": "PASS",
    "P4_plugin_namespace": "PASS",
    "P5_mode_harness": "FAIL",
    "P6_blockers": "NEUTRAL",
    "P7a_demand_absence": "FAIL",
    "P7b_demand_creates": "NOT-ELIGIBLE"
  },
  "row2_fabrication_test": "PASS",
  "novel_capability_for_eee": "PARTIAL-OVERLAP",
  "install_footprint_acceptable": "CAVEAT-NOTED",
  "addresses_fire23_p0": "NO",
  "recommended_integration_option": "D",
  "cite_pattern_extract_candidates": [
    "LLMLingua coarse-to-fine budget control and token-level iterative compression; cite ACL Anthology EMNLP 2023: https://aclanthology.org/2023.emnlp-main.825/",
    "LongLLMLingua question-conditioned context ranking/reordering for long-context RAG and lost-in-the-middle mitigation; cite ACL 2024: https://aclanthology.org/2024.acl-long.91/",
    "LLMLingua-2 task-agnostic token-classification compression with Transformer encoder/data distillation; highest-value future pattern because it is faster and less tied to causal-LM perplexity; cite ACL Findings 2024: https://aclanthology.org/2024.findings-acl.57/",
    "SecurityLingua security-aware intention extraction as a guardrail research pattern only, not default eee runtime; cite OpenReview CoLM 2025: https://openreview.net/forum?id=tybbSo6wba",
    "Local API/footprint anchors: Z:/repos/deps/LLMLingua/setup.py:25-31 for dependencies, prompt_compressor.py:71-93 and 118-161 for model loading, README.md:153-235 for SDK usage."
  ],
  "prescribed_edits": [],
  "next_steps": [
    "Do not pip install llmlingua into Z:/venvs/claude for the default eee runtime.",
    "If future quantitative evidence shows recurring large non-cacheable MCP/research outputs, run a 30-day isolated Option-B sidecar pilot only: input source .claude/state/codex_consult_*_OUT.txt or context-mode event logs, wiring via dedicated venv plus exact git SHA/model allowlist, comparison against repomix/context-mode/manual summarization/cache_control, and removal by deleting the venv/cache.",
    "Before any pilot, reconcile the HEAD mismatch: requested ba1463a versus current local e0e9d99, then pin the exact reviewed commit.",
    "For Fire 23 P0, prefer selective tool/plugin loading or descriptor-pruning patterns; LLMLingua prompt compression is orthogonal to session-start plugin descriptor budget."
  ]
}
```

## Verdict shape disposition

Per `codex-t1-fix-forward-pattern.md`:
- **CITE-PATTERN-ONLY @ conf=0.86** — 3rd CITE-PATTERN-ONLY in Wave 134 NEW-candidate series (after CCPM + Task Master)
- **Empty `prescribed_edits`** — no Pattern A apply for INSTALL decision
- **5 cite-pattern extract candidates** with explicit file:line + paper URL cites
- **Conditional STUDY-PILOT-NARROW path** if FUTURE quantitative evidence emerges (Option B sidecar)

## Cross-model gate satisfaction

| Aspect | Status |
|---|---|
| Verdict origin | ✅ REAL GPT-5.5 via codex CLI |
| CR-3 cross-model consensus | ✅ FULLY SATISFIED |
| CR-3 Phase 1 bootstrap exception | ✅ orchestrator-side codex exec foreground+tee |
| Path P recipe ladder | n=15 → **n=16** reproducible |

## 🚨 Critical codex T1 contributions

### 1. Fire 23 P0 misframing refutation (HIGHEST-VALUE finding)

Codex T1 explicit `addresses_fire23_p0: "NO"`:

> "LLMLingua prompt compression is orthogonal to session-start plugin descriptor budget.
> For Fire 23 P0, prefer selective tool/plugin loading or descriptor-pruning patterns."

This REFUTES Fire 25 close synthesis ranking which placed LLMLingua at #2 specifically
BECAUSE it would "directly address Fire 23 P0 token-budget caveat".

**Architectural insight**: token economy operates at multiple layers:
- **Session-start**: plugin/skill/MCP descriptor inflation (Fire 23 P0 surface)
- **Per-task**: prompt + context compression (LLMLingua scope)

Different layers, different primitives. **W134-F24-C3 Task Master Selective MCP Tool-Loading
remains the correct Fire 23 P0 primitive** (re-elevated as Tier 1.5 #1 ship).

### 2. Mia OVER catch on HEAD specification (3rd in series)

Orchestrator pre-codex: "HEAD `ba1463a`"
Codex T1 local probe: "Caveat: local checkout HEAD is e0e9d99, not the prompt's ba1463a,
though ba1463a exists locally."

3rd Mia OVER in Wave 134 NEW-candidate series:
1. Fire 24-D Agent OS hard-coded path
2. Fire 26-A cisco-mcp-scanner already-installed
3. **Fire 26-B LLMLingua HEAD specification (orchestrator used outdated reference)**

### 3. trust_remote_code=True security caveat

Codex T1 flagged:
> "default trust_remote_code=True in PromptCompressor"

HuggingFace's trust_remote_code=True is a known supply-chain attack vector. Any pilot
installation would need explicit override.

### 4. 5 cite-pattern candidates with FILE:LINE + paper URL precision

Most precise cite-pattern extracts of any Wave 134 audit:
1. LLMLingua coarse-to-fine + EMNLP'23 URL
2. LongLLMLingua question-conditioned + ACL'24 URL
3. LLMLingua-2 task-agnostic Transformer + ACL'24 Findings URL (codex T1: "highest-value future pattern")
4. SecurityLingua security-aware guardrail + CoLM'25 OpenReview URL
5. Local API anchors with exact file:line:
   - `setup.py:25-31` (dependencies)
   - `prompt_compressor.py:71-93,118-161` (model loading)
   - `README.md:153-235` (SDK usage)

### 5. 30-day sidecar pilot conditional path (Option B)

Per codex T1 next_steps verbatim:

> "If future quantitative evidence shows recurring large non-cacheable MCP/research outputs,
> run a 30-day isolated Option-B sidecar pilot only: input source .claude/state/codex_consult_*_OUT.txt
> or context-mode event logs, wiring via dedicated venv plus exact git SHA/model allowlist,
> comparison against repomix/context-mode/manual summarization/cache_control, and removal
> by deleting the venv/cache."

**Conditional pilot scope** (NOT current, future-gated on quantitative evidence).

## Path P recipe ladder advance

| Fire | Subject | Verdict | Tokens |
|---|---|---|---|
| 24-A | BMAD | REJECT-FOR-FIT | 94,987 |
| 24-B | CCPM | CITE-PATTERN-ONLY | 115,741 |
| 24-C | Task Master | CITE-PATTERN-ONLY | 175,555 |
| 24-D | Agent OS v3 | STUDY-PILOT-NARROW | 143,587 |
| 24-E | Claude Memory Bank | REJECT-FOR-FIT | 79,094 |
| 25 | Discovery wave | Pattern B HNF | 175k+ |
| 26-A | cisco-mcp-scanner | STUDY-PILOT-NARROW | 128,628 |
| **26-B** | **microsoft/LLMLingua** | **CITE-PATTERN-ONLY** | **82,142** |

Total codex tokens across Fire 24+25+26: ~990K tokens (~$10-20 cost estimate).

## Verdict shape distribution (Wave 134 NEW-candidate series update)

| Verdict | Count | Subjects |
|---|---|---|
| REJECT-FOR-FIT | 2 | BMAD + Claude Memory Bank |
| **CITE-PATTERN-ONLY** | **3** | CCPM + Task Master + **LLMLingua** |
| STUDY-PILOT-NARROW | 2 | Agent OS v3 + Cisco mcp-scanner |
| Pattern B HNF | 1 | Discovery wave |
| APPROVE | 0 | — |

LLMLingua is the 3rd CITE-PATTERN-ONLY — solidifying that pattern as the dominant outcome
for SDK-only / specialized-research tools (CCPM PM-loop, Task Master AI-decomposition,
LLMLingua prompt-compression).

## Mia ladder advance

n=1698 → n=1705 (+7: codex verdict captured / Fire 23 P0 orthogonality refutation /
Mia OVER catch on HEAD spec / trust_remote_code security / 5 cite-patterns documented /
Path P n=16/16 / verdict shape distribution update)
