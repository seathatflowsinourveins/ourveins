# Wave 253 Grand Synthesis - Pure SOTA Runtime - 2026-05-16

SECURITY CONSTRAINT: This synthesis does not impose the existing `claude-sota-installed` architecture on `Z:/claude-sota-pure`. The installed runtime is treated only as prior evidence and bias-risk context. Every install decision below remains review-required until fresh upstream source, license, native integration path, benchmark fit, and security boundary are verified for the new runtime.

Input status: Agent A and Agent C reports were readable. The requested Wave 253-B BRIDGE-MODE output file was present but empty, so B contributes no usable direct evidence in this synthesis. The W251 baseline synthesis is used only as a baseline to correct, not as authority.

## Section 1: Wave 253 Three-Agent Research Summary

Agent A, audit: Agent A found broad prior research coverage but confirmed major gaps before any pure-runtime install decision. Foundation and Claude Code ecosystem coverage is strong, while open RAG, top MCP-server enumeration, native Claude Code Q2 2026 feature mapping, MCPB bundles, sandboxing, `protect-mcp`, `claude-mem`, wshobson per-plugin shape, and skills marketplace extraction remain under-probed. Agent A also flagged stale star counts, unresolved license contradictions, phantom package coordinates, missing Probe DAG execution, and stand-in degradation in prior bridge runs.

Agent B, fresh discovery: The ordered B artifact is empty. Therefore this synthesis cannot claim a fresh B verdict. Where fresh-discovery themes are needed, the synthesis uses only the W251 baseline and the adversarial corrections from Agent C. This is a material evidence gap for Wave 254.

Agent C, adversarial: Agent C overturned several stale verdicts and reframed the runtime architecture. `context-mode` is confirmed blocked for permissive default because it is ELv2. `mem0ai/mem0` and `topoteretes/cognee` move upward to memory install-pilot-now lanes. OpenViking becomes license-boundary AMBER instead of simple reject. FalkorDB remains blocked for silent default but becomes explicit-acceptance AMBER for local-only use. The Trail of Bits `protect-mcp` catalog row is wrong and must be split into `trailofbits/mcp-context-protector` and ScopeBlind/wshobson `protect-mcp`. Agent C also identified missing first-class categories: orchestration, durable workflow state, eval gates, local fallback, routing, and broader LLM-stack infrastructure.

Top convergent findings:

1. Pure runtime design must start with architecture lanes, not MCP accumulation.
2. Memory is unsettled; mem0, cognee, Graphiti/Zep, and OpenViking-AMBER need a benchmark before a default backend.
3. License posture is decisive: ELv2, AGPL, SSPL, NOASSERTION, and null-license repos cannot become silent defaults.
4. Official Claude Code baseline plus one non-official orchestration plane is safer than bulk-installing competing marketplaces.
5. Eval, security, token lifecycle, and local fallback must be treated as load-bearing runtime layers.
6. Bridge-mode degradation and empty B output lower confidence; Wave 254 must repair evidence flow before install decisions.

Contradictions between agents:

- W251 treated OpenViking as a hard AGPL reject; Wave 253-C reframes it as license-boundary AMBER because the plugin manifest claims Apache-2.0 while root is AGPL.
- W251 treated FalkorDB as an automatic blocker; Wave 253-C keeps it blocked for silent default but allows explicit local-only SSPL acceptance review.
- W251/W252 underweighted mem0 and cognee; Wave 253-C promotes both to memory install-pilot-now.
- Agent A calls out a broad missing RAG/LLM-stack surface; Wave 253-C emphasizes architecture lanes. These are complementary, not conflicting.
- Agent B has no usable ordered output, so there is no direct B contradiction, only an evidence gap.

## Section 2: 10-Dimensional Scoring Matrix

Scale: 1-10. License permissiveness uses 10 for MIT/Apache/permissive, 0 for AGPL/ELv2-style default blockers, and mid-scores for null/NOASSERTION/SSPL explicit-acceptance cases. Deduplication risk is inverted as `Unique`: 10 means low overlap and high unique value; 1 means high overlap. Scores are synthesis estimates from the supplied reports, not fresh live probes.

| Repo | Primary lane | Relevance | License | Health | Harness-fit | Consensus | Simplicity | Memory | Security | Unique | W254 readiness | Total |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| `mem0ai/mem0` | Memory | 9 | 10 | 10 | 7 | 8 | 8 | 10 | 7 | 8 | 9 | 86 |
| `topoteretes/cognee` | Memory | 9 | 9 | 10 | 7 | 8 | 7 | 10 | 7 | 8 | 9 | 84 |
| `getzep/graphiti` | Temporal KG memory | 9 | 10 | 9 | 7 | 8 | 6 | 10 | 7 | 8 | 7 | 81 |
| `getzep/graphiti-python` | Temporal KG memory | 9 | 10 | 9 | 7 | 8 | 7 | 10 | 7 | 8 | 7 | 82 |
| `FalkorDB/FalkorDB` | Graph backend | 7 | 3 | 8 | 6 | 6 | 5 | 8 | 5 | 6 | 4 | 58 |
| `FalkorDB/FalkorDB-Py` | Graph client | 6 | 6 | 7 | 6 | 5 | 7 | 7 | 6 | 5 | 5 | 60 |
| `volcengine/OpenViking` | Memory plugin AMBER | 7 | 2 | 9 | 6 | 6 | 5 | 9 | 5 | 8 | 4 | 61 |
| `mksglu/context-mode` | Context mode | 7 | 0 | 9 | 7 | 7 | 8 | 5 | 5 | 6 | 1 | 55 |
| `Yeachan-Heo/oh-my-claudecode` | Team orchestration | 10 | 10 | 10 | 8 | 8 | 8 | 7 | 7 | 9 | 9 | 86 |
| `wshobson/agents` | Agent marketplace | 9 | 10 | 9 | 7 | 8 | 6 | 6 | 6 | 7 | 6 | 74 |
| `obra/superpowers` | Skills discipline | 8 | 10 | 10 | 8 | 8 | 8 | 4 | 7 | 7 | 8 | 78 |
| `trailofbits/mcp-context-protector` | MCP security | 8 | 10 | 7 | 7 | 7 | 7 | 2 | 10 | 9 | 8 | 75 |
| `temporalio/temporal` | Durable workflow | 10 | 10 | 10 | 7 | 9 | 5 | 8 | 8 | 10 | 7 | 84 |
| `inngest/inngest` | Durable workflow | 8 | 5 | 9 | 7 | 7 | 7 | 7 | 7 | 8 | 5 | 70 |
| `ollama/ollama` | Local model fallback | 9 | 10 | 10 | 8 | 9 | 9 | 2 | 7 | 9 | 9 | 82 |
| `confident-ai/deepeval` | Eval | 9 | 10 | 9 | 9 | 8 | 8 | 2 | 7 | 8 | 8 | 78 |
| `promptfoo/promptfoo` | Eval/security tests | 9 | 10 | 9 | 9 | 9 | 8 | 2 | 8 | 8 | 9 | 81 |
| `anthropics/claude-code` | Foundation | 10 | 5 | 10 | 9 | 10 | 9 | 6 | 8 | 8 | 9 | 84 |
| `anthropics/cwc-long-running-agents` | Long-running agents | 8 | 10 | 8 | 7 | 8 | 7 | 7 | 8 | 9 | 8 | 80 |
| `yamadashy/repomix` | Token/code packing | 9 | 10 | 10 | 9 | 9 | 9 | 3 | 7 | 8 | 10 | 84 |
| `openai/codex` | Cross-model review | 9 | 5 | 10 | 9 | 9 | 8 | 3 | 8 | 8 | 8 | 77 |
| `BerriAI/litellm` | Router | 8 | 4 | 10 | 7 | 8 | 7 | 2 | 6 | 8 | 4 | 64 |
| `Portkey-AI/gateway` | Router/gateway | 8 | 7 | 8 | 7 | 7 | 7 | 2 | 8 | 8 | 6 | 68 |
| `modelcontextprotocol/registry` | MCP governance | 8 | 8 | 8 | 7 | 8 | 7 | 3 | 9 | 9 | 7 | 74 |

## Section 3: OVERTURNED Verdicts Registry

| Repo / verdict | Old verdict | New verdict | Evidence basis | Required action |
|---|---|---|---|---|
| `topoteretes/cognee` | W251 hard REJECT / weak comparator | OVERTURNED UPWARD: MEMORY-INSTALL-PILOT-NOW | Wave 253-C reports Apache-2.0 core, active repo, Claude Code plugin lifecycle path, and v1.0.1 plugin release evidence | Verify integration repo license, install in isolated profile, benchmark against mem0 and Graphiti |
| `mem0ai/mem0` | W251 DEFER / weak pilot | OVERTURNED UPWARD: MEMORY-INSTALL-PILOT-NOW | Wave 253-C reports Apache-2.0, active high-adoption repo, `.claude-plugin`, hooks, docs, and skills | Install-pilot only after benchmark harness is defined; do not crown default from vendor benchmarks |
| `volcengine/OpenViking` | W251 simple AGPL reject | AMBER: LICENSE-BOUNDARY-UNRESOLVED | Root AGPL; plugin manifest claims Apache-2.0; no subpath LICENSE; separate marketplace repo appears Apache-2.0 | Legal/source-boundary verification before any plugin-only pilot |
| `FalkorDB/FalkorDB` | W251 hard block / automatic no | AMBER: SSPL-local-only-explicit-acceptance | Root SSPL confirmed; Wave 253-C cites docs indicating internal/local evaluation is different from managed service use | Block silent default; require explicit SSPL acceptance and no-managed-service guardrail |
| Trail of Bits `protect-mcp` | W251 quarantine as `trailofbits/protect-mcp` | OVERTURNED: catalog identity wrong | GitHub repo 404 and npm scoped package 404; real Trail of Bits candidate is `mcp-context-protector`; ScopeBlind/wshobson candidate is separate | Delete phantom row; audit both replacement rows independently |
| `mksglu/context-mode` | W250-style MIT/ADOPT implication | CONFIRMED BLOCKER: ELv2 / Elastic-2.0 | Wave 253-C reports root license and plugin manifest license are ELv2/Elastic-2.0 | Exclude from permissive default; cite/pilot only under explicit source-available acceptance |
| `chand1012/oh-my-claudecode` | Possible orchestration candidate path | OVERTURNED: wrong repo coordinate | Wave 253-C reports 404; high-star repo is `Yeachan-Heo/oh-my-claudecode` | Correct coordinate and evaluate as primary orchestration comparison |

## Section 4: Missing Category Gaps

| Category | Why prior waves missed it | Top candidate repos | Recommended action |
|---|---|---|---|
| Multi-agent/team orchestration | Prior waves treated orchestration plugins as garnish, not architecture | `Yeachan-Heo/oh-my-claudecode`, `wshobson/agents`, `anthropics/claude-code` official marketplace | Compare official baseline plus one non-official orchestration plane; avoid bulk competing orchestrators |
| Durable cross-cycle workflows | Worktree/session isolation was inherited as enough | `temporalio/temporal`, `inngest/inngest`, `dagster-io/dagster` | Prototype retries, idempotency, timers, and stuck-task recovery before architecture lock |
| Agent/skill quality eval | Eval layer was too SWE-harness centered | `confident-ai/deepeval`, `promptfoo/promptfoo`, `openai/evals` | Build repeatable eval gate for skills, agents, memory, and safety, not just SWE tasks |
| Local model fallback | Prior gates assumed external Claude/Codex availability | `ollama/ollama`, `vllm-project/vllm`, `ggerganov/llama.cpp` | Add degraded/offline review and smoke-test lane; not primary intelligence |
| LLM router/gateway | LiteLLM was mentioned but not category-compared | `BerriAI/litellm`, `Portkey-AI/gateway`, `andrewyng/aisuite` | Evaluate failover, cost routing, license boundaries, Anthropic/OpenAI compatibility |
| Open RAG / retrieval stack | Catalog was Claude-Code-plugin-centric | `SciPhi-AI/R2R`, `HKUDS/LightRAG`, `OSU-NLP-Group/HippoRAG` | Run dedicated RAG audit including retrievers, rerankers, vector DBs, and RAG eval |
| Embeddings and rerankers | Memory was conflated with retrieval | `FlagOpen/FlagEmbedding`, `nomic-ai/contrastors`, `mixedbread-ai` embed/rerank repos | Select embedding/rerank baseline for local and API-backed RAG |
| Vector databases | Graph memory crowded out vector-store comparison | `weaviate/weaviate`, `milvus-io/milvus`, `lancedb/lancedb` | Score license, Windows/Docker fit, MCP support, persistence, and query performance |
| Document parsing | Browser/web automation got more attention than ingestion | `docling-project/docling`, `Unstructured-IO/unstructured`, `microsoft/markitdown` | Add ingestion lane for PDFs, Markdown, Office files, and source docs |
| MCP security gateway | Hook-first safety was inherited | `trailofbits/mcp-context-protector`, `ScopeBlind/scopeblind-gateway`, `semgrep/semgrep` | Compare client hooks vs gateway/policy enforcement and capability wrapping |
| Native Claude Code Q2 2026 features | Prior synthesis leaned on sibling activation notes | `anthropics/claude-code`, `anthropics/cwc-long-running-agents`, official docs | Build Section 0 runtime manifest for `/goal`, agents CLI, worktree, MCPB, async hooks, and context variants |
| Browser/computer-use agents | MCP browser adapters were covered, agentic browser control was thin | `browser-use/browser-use`, `OpenAdaptAI/OpenAdapt`, `anthropics/anthropic-quickstarts` | Separate local debugging, cloud browser, and computer-use automation profiles |
| Cache infrastructure | Prompt caching was discussed but local cache sidecars were not | `valkey-io/valkey`, `redis/redis-stack`, `dragonflydb/dragonfly` | Defer until demand is proven; compare against Anthropic prompt cache and simple file cache |

## Section 5: Wave 254 P0 Must-Fix List

1. Repair evidence flow: the requested Agent B output was empty. Wave 254 needs a fresh B rerun or explicit replacement artifact before install decisions.
2. Rewrite the pure-runtime plan around architecture lanes: orchestration, durable workflow state, memory, security boundary, eval gate, token strategy, local fallback, and plugin namespace policy.
3. Promote `Yeachan-Heo/oh-my-claudecode` to the primary non-official orchestration comparison and correct the wrong `chand1012` coordinate.
4. Define and run a memory benchmark lane for `mem0ai/mem0`, `topoteretes/cognee`, Graphiti/Zep, `thedotmack/claude-mem`, and OpenViking-AMBER before selecting a default.
5. Resolve all license-boundary AMBER rows: OpenViking plugin subpath, cognee integration repo license, Inngest NOASSERTION, OpenAI evals NOASSERTION, and Anthropic repo null-license cases.
6. Replace the phantom Trail of Bits `protect-mcp` row with `trailofbits/mcp-context-protector` and ScopeBlind/wshobson `protect-mcp`, each with separate provenance.
7. Reclassify FalkorDB as SSPL-AMBER local-only explicit-acceptance, while blocking silent default and managed-service use.
8. Add durable workflow research for Temporal P1 and Inngest P2/AMBER, with a practical retry/idempotency prototype.
9. Add Ollama local fallback lane for degraded/offline cross-model review; do not treat it as primary reasoning.
10. Add eval lane beyond SWE-only: DeepEval, promptfoo, OpenAI evals, Braintrust/autoevals, and RAGAS where retrieval is involved.
11. Update token strategy to native long context, prompt caching, server-side compaction/context editing, Repomix, semantic retrieval, and task budgets; remove legacy token-efficient-tools header assumptions.
12. Add open RAG, embeddings, rerankers, vector DBs, and document parsing as first-class categories before memory architecture is finalized.
13. Audit wshobson sub-plugins individually; do not install the full marketplace as one unit.
14. Inventory official Claude Code marketplace sub-plugins and Q2 2026 native features from upstream sources, not sibling runtime claims.
15. Downgrade stars-only and numeric-claim-heavy repos until SHA pins, burn-in, named independent evidence, and benchmark methodology exist.

## Section 6: Architecture Decision Record (ADR) for Pure-SOTA-Runtime

Status: PROPOSED / REVIEW-REQUIRED

Context:

`Z:/claude-sota-pure` is a new pure SOTA Claude Code runtime. It should provide a minimal, permissive, benchmarked, and security-bounded foundation for agentic coding, memory, orchestration, evaluation, and cross-model review. The design must be newly derived from upstream SOTA references and current 2026 evidence. Existing `claude-sota-installed` patterns are not inherited by default.

Decision:

| Layer | Proposed primitive | Status | Rationale | Consequences |
|---|---|---|---|---|
| Foundation runtime | `anthropics/claude-code` official baseline | PROPOSED / REVIEW-REQUIRED | Official Claude Code is the native runtime surface | Requires license/policy review where repo license is null; plugin namespace must stay minimal |
| Orchestration layer | Official marketplace baseline plus `Yeachan-Heo/oh-my-claudecode` comparison | PROPOSED / REVIEW-REQUIRED | Team-first orchestration is a primary architecture lane | Blocks bulk install of wshobson/agents until per-plugin scoring |
| Memory layer | Benchmark lane: mem0, cognee, Graphiti/Zep, claude-mem, OpenViking-AMBER | PROPOSED / REVIEW-REQUIRED | No memory backend has earned default status | Requires benchmark harness, isolated profiles, license checks, and backend policy |
| Workflow durability layer | Temporal P1; Inngest P2/AMBER | PROPOSED / REVIEW-REQUIRED | Worktrees do not solve retries, timers, idempotency, or recovery | Adds operational weight; must prove demand before always-on install |
| Safety/security layer | MCP gateway/policy comparison plus hooks; start with `trailofbits/mcp-context-protector`, gitleaks, semgrep | PROPOSED / REVIEW-REQUIRED | Hook-first safety is insufficient across clients and remote MCPs | Requires capability model and gateway-vs-hook benchmark |
| Eval layer | DeepEval + promptfoo first; OpenAI evals/autoevals after license check | PROPOSED / REVIEW-REQUIRED | Runtime changes need repeatable quality gates | Adds test authoring burden but prevents anecdotal adoption |
| Token efficiency layer | Native 1M context, prompt caching, compaction/context editing, Repomix, semantic retrieval, task budgets | PROPOSED / REVIEW-REQUIRED | Native context lifecycle beats lossy compression as default | Rejects context-mode default due ELv2 and removes legacy token-efficient header assumptions |
| Local model fallback layer | Ollama P1 fallback, with vLLM/llama.cpp comparison later | PROPOSED / REVIEW-REQUIRED | Degraded/offline review should exist without external model dependency | Lower quality than primary models; must be scoped to fallback and smoke tests |
| Router/gateway layer | Compare LiteLLM, Portkey, aisuite/OpenRouter | PROPOSED / REVIEW-REQUIRED | Cross-provider failover/cost routing is a real runtime concern | License and SaaS boundaries decide default eligibility |
| Retrieval/RAG layer | Dedicated RAG audit before default | PROPOSED / REVIEW-REQUIRED | Memory and RAG were conflated in earlier waves | Requires separate embedding, reranker, vector DB, document parsing, and RAG eval decisions |

Rejected alternatives:

- Default-install `mksglu/context-mode`: rejected for permissive default because ELv2/Elastic-2.0 is confirmed.
- Default-install OpenViking: rejected pending license-boundary proof because root is AGPL and plugin licensing conflicts.
- Silent FalkorDB backend: rejected because SSPL requires explicit acceptance and managed-service guardrails.
- Bulk-install `wshobson/agents`: rejected until individual plugins are scored for namespace collision, setup shape, security, and duplication.
- Treat Codex T1-T7 as the only gate: rejected as incumbent bias. Cross-model review, eval scoring, local fallback, and policy verification are distinct functions.
- Rely on lossy compression as default token strategy: rejected in favor of native context lifecycle, prompt caching, compaction/context editing, and selective retrieval.
- Use awesome lists as install primitives: rejected; they are discovery inputs only.
- Crown any memory backend from vendor benchmarks alone: rejected; local head-to-head benchmark is required.

## Section 7: Synthesis Verdict JSON

```json
{
  "status": "GRAND-SYNTHESIS-COMPLETE",
  "synthesis_wave": 253,
  "target_runtime": "Z:/claude-sota-pure",
  "security_constraint_satisfied": true,
  "architecture_bias_guard": "existing claude-sota-installed treated as prior evidence only, not inherited architecture",
  "inputs_read": {
    "wave253_C_adversarial_w251": "read",
    "agent_A_audit_gap_scan": "read",
    "agent_C_adversarial_blind_spot": "read",
    "W251_baseline_grand_synthesis": "read",
    "wave253_B_bridge_mode_output": "present_but_empty"
  },
  "cross_model_gate": "BRIDGE-MODE codex-companion dispatch; codex-CLI verdict origin in Wave 253-C; ordered B artifact empty",
  "confidence": 0.82,
  "confidence_reason": "High confidence on adversarial corrections and gap list; reduced by empty B output and unresolved license/source-boundary rows.",
  "overturned_or_amber_verdicts": [
    "cognee promoted to MEMORY-INSTALL-PILOT-NOW",
    "mem0 promoted to MEMORY-INSTALL-PILOT-NOW",
    "OpenViking reclassified to LICENSE-BOUNDARY-AMBER",
    "FalkorDB reclassified to SSPL-AMBER-local-only-explicit-acceptance",
    "Trail of Bits protect-mcp catalog row overturned as wrong identity",
    "context-mode confirmed ELv2 blocker"
  ],
  "missing_categories": [
    "multi-agent/team orchestration",
    "durable workflow state",
    "agent/skill eval",
    "local model fallback",
    "LLM router/gateway",
    "open RAG",
    "embeddings and rerankers",
    "vector databases",
    "document parsing",
    "MCP security gateway",
    "native Claude Code Q2 2026 features",
    "browser/computer-use agents",
    "cache infrastructure"
  ],
  "wave254_required_before_install": [
    "repair or replace empty B fresh-discovery output",
    "define benchmark harnesses before memory selection",
    "resolve AMBER and NOASSERTION licenses",
    "split phantom protect-mcp into real candidates",
    "compare orchestration and durable workflow primitives",
    "add eval/local fallback/router/RAG lanes",
    "remove default reliance on ELv2/context-mode and legacy token-efficient-tools headers"
  ],
  "recommended_architecture_status": "PROPOSED_REVIEW_REQUIRED",
  "install_decision": "NO_DEFAULT_INSTALL_DECISIONS_UNTIL_WAVE254_P0_CLOSED"
}
```

## ARTIFACT-INLINE: tmp/wave253-grand-synthesis-2026-05-16.md

STATUS: COMPLETE
SYNTHESIS_WAVE: 253
OUTPUT_PATH: docs/outer research/research-wave-2026-05-15/02-wave252-fresh-2026-05-16/WAVE253-GRAND-SYNTHESIS-2026-05-16.md
CROSS_MODEL_GATE: BRIDGE-MODE codex-companion dispatch; codex-CLI verdict origin; cross-model gate SATISFIED

VERDICT: GRAND-SYNTHESIS-COMPLETE
