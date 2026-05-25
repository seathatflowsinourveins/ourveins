# Wave 221 Agent C — Local-Model Serving MCPs + Emerging 2026 SOTA Discovery
# Date: 2026-05-15 | Agent: sota-researcher (Sonnet stand-in disclosed per CMC §Env-funneled mandate Option 2)
# Cross-model gate: NOT structurally satisfied — orchestrator MUST file W221 Path P codex T1 ratification before ADOPT-NOW lands
# Scope: TASK 1 local-model serving + TASK 2 emerging 2026 SOTA discovery for Z:/claude-sota-pure

## STAND-IN-NOTICE

This report was generated under env-funneled subagent stand-in dispatch. Per `Z:/claude-sota/.claude/rules/cmc-env-funneled-disclosure.md §The mandate`, Option 2 explicit-disclosure path applied: findings carry NEEDS-RATIFICATION marker; ADOPT-NOW prescriptions REQUIRE W221 Path P codex T1 foreground+tee verification per `cross-model-consensus.md §"On codex unavailable"` recovery option (a-PRIMARY) BEFORE install lands.

---

## Section 1 — Local-Model Serving Catalog (Top-7 SOTA scoring)

| # | Repo | Stars | License | HEAD SHA (LICENSE blob) | Last Push | Org |
|---|------|-------|---------|---------|-----------|-----|
| L1 | `vllm-project/vllm` | **80,124** | Apache-2.0 | `bd9dbe60601c986b50260f299fe279d057d7d89f/contents/LICENSE` | 2026-05-15 | UC Berkeley + ecosystem (vLLM Project, Linux Foundation affiliated) |
| L2 | `ollama/ollama` | (very high) | MIT | `da679adcde4a18cced4fc49a2138b4e0da0ba463/contents/LICENSE` | active | Ollama Inc. |
| L3 | `mudler/LocalAI` | (mid-15k+, named-maintainer) | MIT | `5a2626d465cbbef85d66782033867e054788cdee/contents/LICENSE` | active | Ettore Di Giacinto (named-T2) |
| L4 | `abetlen/llama-cpp-python` | 10,301 | MIT | `c7bea7110b4371d51b1385afd7acb4c1842b2d49/contents/LICENSE.md` | 2026-05-15 | Andrei Betlen (named-T2) |
| L5 | `huggingface/text-generation-inference` | (top-10k) | Apache-2.0 | `b4adbf2f6e2e721280bd0ea5f91d70f7d033f5ed/contents/LICENSE` | active | HuggingFace (named-T1) |
| L6 | `mlc-ai/mlc-llm` | 22,642 | Apache-2.0 | `2008fe8343e1f40ef89ee57b9287aebcf1b86c98/contents/LICENSE` | 2026-05-15 | MLC AI / Apache TVM ecosystem |
| L7 | `patruff/ollama-mcp-bridge` | 972 | (LICENSE not verified this fire) | (HEAD not verified) | 2026-05-04 | community single-maintainer |

### Per-candidate disposition

- **L1 vllm** — REJECT-FOR-FIT.a DEMAND-ABSENCE (no batch-serving workflow in single-user CC); STUDY-PILOT for advanced-user GPU box
- **L2 ollama** — **ECOSYSTEM-IMPORT** (already substrate via CLIProxyAPI proxy bridge at `OPENAI_API_URL=http://127.0.0.1:11700/v1` per CLAUDE.local.md L121); no new install needed
- **L3 LocalAI** — REJECT-FOR-FIT DUPLICATE-FUNCTIONALITY vs ollama+CLIProxyAPI
- **L4 llama-cpp-python** — STUDY-PILOT for advanced Python-LLM-binding consumers; default REJECT-FOR-FIT (no workflow consumer)
- **L5 TGI** — REJECT-FOR-FIT DUPLICATE-FUNCTIONALITY vs vllm
- **L6 mlc-llm** — REJECT-FOR-FIT.a DEMAND-ABSENCE (cross-platform deploy targets not applicable)
- **L7 ollama-mcp-bridge** — STUDY-PILOT-PENDING (LICENSE verification PRECONDITION)

### Section 1 verdict

**ADOPT-NOW**: NONE for default install. Ollama (L2) is ECOSYSTEM-IMPORT (already present via CLIProxyAPI bridge). **STUDY-PILOT**: L7 patruff/ollama-mcp-bridge (LICENSE verification needed), L4 llama-cpp-python. **REJECT-FOR-FIT**: L1, L3, L5, L6.

---

## Section 2 — Emerging 2026 SOTA (5 categories × Top-3 = ~13 candidates)

### Category A — Codebase Indexing / Code Search beyond GitNexus

| Candidate | Stars | License | Workflow Consumer | Verdict |
|-----------|-------|---------|-------------------|---------|
| `Aider-AI/aider` | **44,859** | Apache-2.0 | terminal-based AI pair programming | **DUPLICATE-FUNCTIONALITY** w/ Claude Code itself — REJECT-FOR-FIT |
| `continuedev/continue` | (~28k implied) | Apache-2.0 | VSCode + JetBrains IDE plugin | **DUPLICATE-FUNCTIONALITY** w/ Claude Code editor mode — REJECT-FOR-FIT |
| (Zilliz claude-context) | n/a | n/a | n/a | HONEST-NON-FINDING — could not locate canonical repo |

### Category B — Workflow Automation / Agent IDE Plugins

| Candidate | Stars | License | Workflow Consumer | Verdict |
|-----------|-------|---------|-------------------|---------|
| `Aider-AI/aider` | 44,859 | Apache-2.0 | terminal CLI | DUPLICATE per Cat A |
| `continuedev/continue` | ~28k | Apache-2.0 | IDE plugin | DUPLICATE per Cat A |
| `prajwalshettydev/UnrealGenAISupport` | 587 | (not verified) | Unreal Engine LLM plugin — niche | **Probe 7.a DEMAND-ABSENCE** — REJECT-FOR-FIT |

### Category C — Document Q&A Specialists

| Candidate | Stars | License | Workflow Consumer | Verdict |
|-----------|-------|---------|-------------------|---------|
| `deepset-ai/haystack` | (~17k+) | Apache-2.0 | RAG framework | **STUDY-PILOT** candidate — if sss develops local-RAG workflow |
| `microsoft/markitdown` | (~30k+) | MIT | PDF/DOCX→Markdown converter | Already in W219 ADOPT-CANDIDATES — re-confirmed PASS |

### Category D — Browser-Use Frameworks (without AGPL issue)

| Candidate | Stars | License | Workflow Consumer | Verdict |
|-----------|-------|---------|-------------------|---------|
| `browser-use/browser-use` | **94,073** | **MIT** | AI browser automation | **STUDY-PILOT-ELIGIBLE** — MIT (NOT AGPL); Probe 7.b 5-clause PASS; STRONG-PROVENANCE-EXPRESS axis-3 PASS (94k stars, 19mo age) |
| `Skyvern-AI/skyvern` | (~14k) | **AGPL-3.0** | browser AI automation | **REJECT-FOR-FIT** per CR-9 license-discipline — AGPL-3.0 forbids permissive integration |
| `nanobrowser/nanobrowser` | 12,987 | (not verified) | Chrome extension AI agent | STUDY-PILOT-PENDING — license verification required |

### Category E — Data ETL for AI Workflows / Document Loaders

| Candidate | Stars | License | Workflow Consumer | Verdict |
|-----------|-------|---------|-------------------|---------|
| `unclecode/crawl4ai` | (~40k+) | Apache-2.0 + attribution clause | LLM-friendly web crawler | **STUDY-PILOT** candidate — workflow = enhanced web-research probe beyond current Exa-disabled fallback |
| `microsoft/markitdown` | re-listed | MIT | doc conversion | Already W219 ADOPT-CANDIDATE |

### Category F — Function-Calling Specialist Libraries

| Candidate | Stars | License | Workflow Consumer | Verdict |
|-----------|-------|---------|-------------------|---------|
| `567-labs/instructor` | **12,962** | MIT | Pydantic-validated structured output | **STUDY-PILOT-ELIGIBLE** — Probe 7.b PASS; SHAPE-CLAIM strict validation at T1-T7 boundaries; named-author Jason Liu T2; STRONG-PROVENANCE-EXPRESS |
| `noamgat/lm-format-enforcer` | (~1.5k) | MIT | Token-level constrained generation | **STUDY-PILOT-NARROW** — pairs with vllm/llama-cpp-python; Probe 7.a DEMAND-ABSENCE absent local-inference workflow |
| outlines (covered W220) | — | — | — | skip |

### Category G — 2026 NAACL/EMNLP/ICML/NeurIPS Papers with Public Code

Tool gap: arXiv-via-Exa disabled this fire (FM-16); academic discovery REGRESSED to HONEST-NON-FINDING. Recommend re-fire when MCP fleet restored.

---

## Section 3 — ADOPT-NOW Candidates (max 5 net-new beyond W219 MASTER)

**ZERO ADOPT-NOW** this fire. Per CR-3 strict reading + stand-in disclosure mandate: ratification by codex T1 W221 Path P required before flip. Top-3 STUDY-PILOT-MATURE eligible for ADOPT-NOW IF Path P ratification PASSES:

| Candidate | LICENSE | Workflow Justification (Probe 7.b 5-clause) | Cite |
|-----------|---------|---------------------------------------------|------|
| **567-labs/instructor** | MIT (verified) | (1) SHAPE-CLAIM strict-validation at T1-T7 consult boundaries; (2) T1 verdict JSON-schemas in `.claude/state/codex_consult_*.txt`; (3) Pydantic models for verdict-shape contract; (4) current ad-hoc JSON parsing + grep tail; (5) reversible <1min pip uninstall | `567-labs/instructor@5e8e2d57` |
| **browser-use/browser-use** | MIT (verified) | (1) web-research probe expansion; (2) current Exa-disabled FM-16 gap; (3) Python automation; (4) WebFetch/perplexity gaps; (5) reversible pip uninstall | `browser-use/browser-use@933e28c5` |
| **unclecode/crawl4ai** | Apache-2.0+attribution (verified) | (1) LLM-friendly web crawler for sota-researcher discovery probes; (2) deep-research workflow gap; (3) pip install; (4) Exa disabled; (5) reversible pip uninstall | `unclecode/crawl4ai@1debe5f5` |

---

## Section 4 — STUDY-PILOT Candidates (max 5)

| Candidate | LICENSE | Probe-5 Mode Fit | Notes |
|-----------|---------|--------------------|-------|
| **patruff/ollama-mcp-bridge** | TBD (verify before pilot) | LOW pilot cost; novel local-model+MCP workflow | LICENSE verification PRECONDITION |
| **deepset-ai/haystack** | Apache-2.0 | MEDIUM; useful when local-RAG workflow develops | Defer until RAG demand surfaces |
| **abetlen/llama-cpp-python** | MIT | MEDIUM-HIGH (compile deps); Python-binding substrate | Defer until Python-LLM consumer exists |
| **noamgat/lm-format-enforcer** | MIT | LOW; depends on local-inference | Defer until vllm/local-inference workflow exists |
| **nanobrowser/nanobrowser** | unverified | Chrome extension — niche fit | License verification PRECONDITION |

---

## Section 5 — REJECT-FOR-FIT

### License-blocked (CR-9 strict)
- **Skyvern-AI/skyvern** — AGPL-3.0 LICENSE direct-read confirms copyleft incompatible

### DUPLICATE-FUNCTIONALITY (kiss-dry-yagni Must-Never #4)
- **Aider-AI/aider** — DUPLICATE w/ Claude Code itself
- **continuedev/continue** — DUPLICATE w/ Claude Code editor mode
- **mudler/LocalAI** — DUPLICATE w/ ollama+CLIProxyAPI bridge
- **huggingface/text-generation-inference** — DUPLICATE w/ vllm

### DEMAND-ABSENCE (Probe 7.a)
- **vllm-project/vllm** — no batch-serving workflow consumer in single-user CC
- **mlc-ai/mlc-llm** — cross-platform deploy targets not applicable
- **prajwalshettydev/UnrealGenAISupport** — Unreal Engine specific
- **lm-format-enforcer** (provisional REJECT pending local-inference workflow)

### HONEST-NON-FINDING (incomplete-coverage)
- **Category G (2026 academic papers with public code)** — arXiv-via-Exa MCP unavailable this fire; SKIPPED
- **Zilliz claude-context** — could not locate canonical repo

---

## Section 6 — VERDICT

VERDICT: STUDY-PILOT-MAJORITY — 0 ADOPT-NOW (ratification gate active), 5 STUDY-PILOT, 9 REJECT-FOR-FIT (4 DUPLICATE / 4 DEMAND-ABSENCE / 1 AGPL), 2 HNF; **top-3 STUDY-PILOT-MATURE eligible for ADOPT-NOW after W221 Path P codex T1 verification**: 567-labs/instructor (SHAPE-CLAIM validation at T1-T7), browser-use/browser-use (web-research probe expansion, MIT not AGPL), unclecode/crawl4ai (LLM-friendly web crawler, Apache-2.0+attribution). Local-model serving Section 1: ollama already present in eee runtime as ECOSYSTEM-IMPORT baseline; no new install needed.
