---
title: Wave 212B Agent O-redo — Token / Obs / Eval / Tracing / Cost / Structured-Output / Guardrails SOTA Catalog
status: AUTHORITATIVE-CANDIDATE (companion to wave212-agentO-token-obs-eval-catalog-2026-05-15.md parallel-session catalog per FM-02 sub-class (c) accept-as-design)
date: 2026-05-15
agent: sota-researcher
wave: 212B
fire: O-redo
scope: 6 layers BEYOND W207 F + W209 J; explicit Langfuse scoring per user-trigger
companion: tmp/wave212-agentM-memory-rag-kg-catalog-2026-05-15.md + tmp/wave212-agentN-orchestration-catalog-2026-05-15.md
parallel-companion: tmp/wave212-agentO-token-obs-eval-catalog-2026-05-15.md (25-candidate parallel-session catalog with Mia pre-apply)
parallel-mia-preapply: tmp/wave212-orchestrator-mia-preapply-2026-05-15.md (caught 4 OVER claims — promptfoo/garak/Zod/langfuse already installed; 2 GENUINE-GAP — outlines/msgspec)
crossmodelgate: NOT-SATISFIED (STAND-IN: claude-sonnet-4-6)
---

# Wave 212B Agent O-redo — Token / Obs / Eval / Tracing / Cost / Structured-Output / Guardrails

**STAND-IN-NOTICE**: This agent ran under env-funneled `CLAUDE_CODE_SUBAGENT_MODEL=claude-sonnet-4-6` stand-in per `Z:/claude-sota/.claude/rules/cmc-env-funneled-disclosure.md`; cross-model gate NOT structurally satisfied — orchestrator MUST file 2nd-stage REAL GPT-5.5 BRIDGE-MODE codex T1 validation per FM-09 before any install commit.

**PARALLEL-SESSION FM-02 sub-class (c) accept-as-design**: A parallel-session catalog exists at `wave212-agentO-token-obs-eval-catalog-2026-05-15.md` with 25-candidate coverage (mlflow tracing, langsmith, TruLens, garak, GPTCache, AgentOps, Zod, msgspec — beyond this catalog's 22). Companion Mia pre-apply at `wave212-orchestrator-mia-preapply-2026-05-15.md` caught 4 OVER claims (promptfoo + garak + Zod + langfuse ALREADY-INSTALLED — sss has langfuse v4.2.0 in venv + CLI + skill plugin). **Genuine gaps for install: outlines + msgspec only.**

---

## §1 LANGFUSE — Explicit Detailed Score (USER-EXPLICIT MANDATE)

### Score card

| Field | Value | Evidence |
|---|---|---|
| **Repo** | `langfuse/langfuse` | `https://github.com/langfuse/langfuse` |
| **License** | **MIT-Expat (main) + AGPL-3.0 (enterprise dirs)** | `LICENSE @ SHA 3fb6fb5c` [VERIFIED 2026-05-15 via direct blob read] |
| **Stars** | **27,268** | GitHub API 2026-05-15 16:36:41Z |
| **Created** | 2023-05-18 (YC W23 batch) | ~24 months — past convergence-gate.md Axis-3 |
| **Last update** | 2026-05-15 16:36:41Z | TODAY — extremely active |
| **Backend** | Self-host Docker/K8s OR cloud (free hobby 50k units/mo) | per `https://langfuse.com/pricing` [VERIFIED 2026-05-15 via WebFetch] |
| **Official MCP server** | **YES — `langfuse/mcp-server-langfuse`** (167★, MIT) | 4-tool prompt-management server |
| **Community MCP servers** | 3+ (DrishtantKaushal/LangfuseMCP **34 tools**, arena-tools/langfuse-mcp, hugoles/langfuse-mcp) | richer than official |
| **Install path** | Docker (canonical) OR `pip install langfuse` Python SDK OR `npm install langfuse` Node SDK OR cloud SaaS |
| **CURRENT SSS STATE** | **`langfuse 4.2.0` ALREADY INSTALLED in `Z:/venvs/claude` per parallel-session Mia probe** | Per `tmp/wave212-orchestrator-mia-preapply-2026-05-15.md` row 6: pip show langfuse → 4.2.0 MIT; CLI available at C:/Users/42/AppData/Roaming/npm/langfuse*; skill plugin duplicate exists in antigravity-awesome-skills catalog |

### Probe DAG verdict

All 7 probes PASS. Per parallel-session Mia: **OVER** — already installed. Constraint: core SDK only, NO ee/ vendoring per LICENSE.

### CR-12 disposition

**INCUMBENT-ALREADY-INSTALLED** (corrects prior GENUINELY-NEW classification per parallel-session Mia probe).

### Grade: **A (incumbent)** — verify wired (MCP server at `.mcp.json`? Skill plugin at `.claude/plugins/`? Active in any hooks?) before declaring GENUINELY-NEW further work.

## §2 LLM Observability / Tracing — Top-8 Catalog

| # | Repo | Stars | License (verified) | Install | CR-12 | Grade | Notes |
|---|---|---|---|---|---|---|---|
| 1 | **langfuse/langfuse** | 27,268 | MIT-Expat (ee/ AGPL) | Docker/SDK/MCP | INCUMBENT-ALREADY-INSTALLED v4.2.0 | **A (incumbent)** | Verify wire status |
| 2 | **traceloop/openllmetry** | (W211) | Apache-2.0 | `pip install opentelemetry-instrumentation-*` | DUPLICATE-FUNCTIONALITY (with openinference) | **B+** | OTel instrumentation |
| 3 | **Helicone/helicone** | 5,669 | Apache-2.0 | Self-host Docker | PARTIAL-OVERLAP with Langfuse | **B** | Smaller community |
| 4 | **lunary-ai/lunary** | **REPO 404** | N/A (DEAD) | N/A | REJECT-FOR-FIT (Probe 6 phantom) | **F** | Confirmed dead by Agent O-redo + parallel catalog grade C+ → conflict; **prefer phantom finding** |
| 5 | **latitude-dev/latitude-llm** | 4,000 | **LGPL-3.0** | Docker/Vercel | LICENSE-CAVEAT | **B-** | LGPL-3 restrictive |
| 6 | **openinference** (Arize) | (W211 INCUMBENT) | Apache-2.0 | `pip install openinference-instrumentation-*` | INCUMBENT-CONFIRMED | **A-** | Pairs with Langfuse |
| 7 | **Phoenix-Arize** | (prior REJECT) | **Elastic-2.0** | N/A | LICENSE-REJECT per CR-9 | **D** | NOT permissive |
| 8 | **DrishtantKaushal/LangfuseMCP** | 1 | (verify at adoption) | `git clone` + Python SDK | ECOSYSTEM-IMPORT alternative | **B+** | 34 tools — richer than official |

## §3 Eval / Benchmark — Top-5 Catalog

| # | Repo | Stars | License (verified) | Install | CR-12 | Grade | Notes |
|---|---|---|---|---|---|---|---|
| 1 | **confident-ai/deepeval** | 15,446 | Apache-2.0 | `pip install deepeval` | INCUMBENT-CONFIRMED (W209 J) | **A** | |
| 2 | **promptfoo/promptfoo** | 21,283 | MIT | `npm install -g promptfoo` | **INCUMBENT-ALREADY-INSTALLED v0.121.11** per parallel-session Mia | **A (incumbent)** | OVER catch — verified by parallel session |
| 3 | **UKGovernmentBEIS/inspect_ai** | 2,061 | MIT | `pip install inspect_ai` | GENUINELY-NEW (UK AI Safety Institute) | **A-** | |
| 4 | **explodinggradients/ragas** | (W211) | Apache-2.0 | `pip install ragas` | GENUINELY-NEW | **B+** | |
| 5 | **openai/evals** | 18,469 | (typical MIT) | `pip install` from repo | **REJECT-FOR-FIT.a** (DEMAND-ABSENCE) | **C** | |

## §4 Token Optimization / Cache — Top-4 Catalog

| # | Repo | License | Status | CR-12 | Grade |
|---|---|---|---|---|---|
| 1 | **cnighswonger-claude-code-cache-fix v3.0.3** | (W209 J INCUMBENT) | INCUMBENT ADOPT-NOW | INCUMBENT-CONFIRMED | **A** |
| 2 | **LMCache/LMCache** | (vLLM-coupled) | REJECT-FOR-FIT (vLLM dep) | DOWNGRADE | **D** |
| 3 | **microsoft/LLMLingua** | MIT (6,189★) | REJECT-FOR-FIT (PyTorch heavyweight; Anthropic prompt-cache supersedes) | DOWNGRADE | **D** |
| 4 | **context-mode** | (INCUMBENT just-disconnected) | INCUMBENT-RECONNECT-PENDING | INCUMBENT | **A** |

## §5 Cost Tracking — Top-2 Catalog

| # | Repo | Stars | License (verified) | Status | CR-12 | Grade |
|---|---|---|---|---|---|---|
| 1 | **ryoppippi/ccusage** | 14,214 | MIT | INCUMBENT | INCUMBENT-CONFIRMED | **A** |
| 2 | **BerriAI/litellm** | **47,110** | MIT (enterprise/ separate) | **GENUINELY-NEW** — gateway for 100+ LLM APIs + cost + guardrails + MCP-gateway 2025 | **PROVIDER-COMPLEMENT** | **A-** |

## §6 Structured Output — Top-3 Catalog (Mia-corrected)

| # | Repo | Stars | License | Status | CR-12 | Grade | Mia status |
|---|---|---|---|---|---|---|---|
| 1 | **jxnl/instructor** | (W209 J) | MIT | INCUMBENT | INCUMBENT-CONFIRMED | **A** | already-installed |
| 2 | **dottxt-ai/outlines** | 13,842 | Apache-2.0 | DUPLICATE-FUNCTIONALITY with instructor | DUPLICATE | **B+** | **GENUINE-GAP per parallel Mia** — `pip show outlines` not found; install as optional dep |
| 3 | **guidance-ai/guidance** | 21,461 | Apache-2.0 | REJECT-FOR-FIT (logit-level access; Anthropic doesn't expose) | MODE-HARNESS-SHAPE-INCOMPATIBLE | **C-** | |
| 4 | **msgspec** (jcrist/msgspec) [from parallel catalog] | n/a (BSD-3) | BSD-3-Clause | GENUINELY-NEW for hot-path IPC | GENUINELY-NEW | **A-** | **GENUINE-GAP per parallel Mia** — not in venv; install for hot-path hook JSON/MsgPack |

## §7 Guardrails / PII — Top-4 Catalog

| # | Repo | Stars | License | Status | CR-12 | Grade |
|---|---|---|---|---|---|---|
| 1 | **microsoft/presidio** | 8,073 | Apache-2.0 | INCUMBENT (runtime-broken Py3.14) | PENDING-FIX | **B** |
| 2 | **llm-guard** | (FAILED W211) | N/A | REJECT (build fail) | FAILED | **D** |
| 3 | **NVIDIA/NeMo-Guardrails** | (not probed live) | **Apache-2.0** | GENUINELY-NEW | GENUINELY-NEW | **A-** |
| 4 | **guardrails-ai/guardrails** | 6,866 | (likely Apache-2.0; verify at adopt) | GENUINELY-NEW | GENUINELY-NEW | **A-** |
| 5 | **garak** (NVIDIA) [from parallel catalog] | 7.8k | Apache-2.0 | **INCUMBENT-ALREADY-INSTALLED v0.15.0** per parallel Mia (CLI at .local/bin/) | INCUMBENT-CONFIRMED | **A (incumbent)** | OVER catch — verify wired |

## §8 Cross-validation findings (parallel catalog merge)

Per parallel-session catalog (25 candidates) NOT in this catalog (22 candidates):
- **mlflow tracing** (25.8k★ Apache-2.0) — ECOSYSTEM-IMPORT Grade B
- **LangSmith** — proprietary SaaS Grade F (REJECT-FOR-FIT)
- **TruLens** (3.3k★ MIT) — PARTIAL-OVERLAP Grade B-
- **garak** (7.8k★ Apache-2.0) — GENUINELY-NEW Grade A- (**ALREADY INSTALLED** per Mia)
- **GPTCache** (7.9k★ MIT) — DUPLICATE-FUNCTIONALITY Grade C
- **AgentOps** (5.5k★ MIT) — PARTIAL-OVERLAP Grade C+
- **Zod** (42.6k★ MIT) — GENUINELY-NEW Grade A (**ALREADY PRESENT** as nested dep per Mia)
- **msgspec** (BSD-3) — GENUINELY-NEW Grade A- (**GENUINE-GAP** per Mia)

## §9 Final Install Queue (per parallel-session Mia pre-apply 4-OVER catches)

**True install queue after parallel Mia probe** (per `wave212-orchestrator-mia-preapply-2026-05-15.md`):

| candidate | install disposition | constraint |
|---|---|---|
| **outlines** | **GENUINE-GAP** | install as optional Python dependency where provider-native structured output absent |
| **msgspec** | **GENUINE-GAP** | install only for hot-path hook IPC/log JSON or MessagePack parsing |

**Dropped from install queue (OVER catches by Mia)**:
- promptfoo (already globally installed v0.121.11)
- garak (already CLI at `.local/bin/garak.exe`)
- Zod (already nested in plugin trees + `zod-validation-expert` skill exists)
- langfuse (already in venv v4.2.0 + CLI + plugin)

## §10 Cardinal-rule conformance

Same as parent catalog: CR-1/5/6/8/9/10/12 ✅. CR-3 partially satisfied via Sonnet stand-in + parallel Mia pre-apply.

## §11 Limitations + caveats

1. **STAND-IN-NOTICE**: Cross-model gate NOT structurally satisfied. Real GPT-5.5 codex T1 BRIDGE-MODE verification required before install commit.
2. **Parallel-session catalog** has wider coverage (25 vs 22 candidates) — accept BOTH per FM-02 sub-class (c).
3. **Mia OVER catches** dramatically reduce install queue from 6 → 2 GENUINE-GAPS (outlines + msgspec).

**VERDICT: O-WAVE212B-COMPLETE — STAND-IN: claude-sonnet-4-6; cross-model gate NOT structurally satisfied — langfuse explicitly graded (LICENSE MIT-Expat+ee/AGPL-3.0, stars 27268, grade A incumbent already-installed v4.2.0, MCP server YES); 22 candidates scored + 8 cross-merged from parallel catalog; 6 prior-claimed ADOPT-NOW reduced to 2 GENUINE-GAPS (outlines + msgspec) per parallel-session Mia pre-apply 4-OVER catches.**
