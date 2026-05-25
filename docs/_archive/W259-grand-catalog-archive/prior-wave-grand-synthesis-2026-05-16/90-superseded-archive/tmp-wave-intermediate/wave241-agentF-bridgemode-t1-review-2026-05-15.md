# ARTIFACT-INLINE: Wave 241 Agent F BRIDGE-MODE T1 Review

## S0

Scope: answer Wave 240 catalog-review Q1-Q3 for `Z:\claude-sota-pure` from local Wave 240 artifacts. Background Codex task `task-mp7nt20f-89uagr` status check was attempted via `codex cloud status task-mp7nt20f-89uagr`, but Codex CLI returned `http error: get_task_details failed`; no completed-task last-50-line output was retrievable. Local evidence used: `tmp/wave240-agentA-fresh-may2026-sota-multi-source-2026-05-15.md`, `tmp/wave240-agentB-redo-license-axis2-hardening-2026-05-15.md`, `tmp/wave240-agentC-redo-outer-research-enumerate-2026-05-15.md`, and `tmp/wave240-CLOSE-SYNTHESIS-2026-05-15.md`.

## S1

Q1 architecture verdict: **APPROVE WITH CONSTRAINTS** replacing `doobidoo/mcp-memory-service` plus `getzep/graphiti`/FalkorDB with `mem0ai/mem0` plus `topoteretes/cognee`. The Wave 240 evidence is coherent: mem0 is positioned as L1/L2 episodic + hybrid retrieval memory, while cognee is positioned as L3 memory graph / code-knowledge layer. This is not a one-for-one package swap; it is a layer split. The safe install architecture is `mem0` for user/session memory and `cognee` for graph/semantic project memory, with standalone `microsoft/graphrag` held conditional for document-RAG needs beyond the memory stack.

Key constraint: do **not** vendor `topoteretes/cognee-integrations` as-is because Wave 240 Agent B-redo found it unlicensed. Use parent `topoteretes/cognee` Apache-2.0 directly, or write a fresh local Claude Code integration against cognee. Also treat Graphiti retirement as a migration event, not deletion: export/backup existing graph state, run parallel validation, then cut over if recall quality and latency are acceptable.

## S2

Q2 Mia REJECT verification: **VERIFIED FROM LOCAL WAVE 240 LICENSE PROBES**.

| Repo | Wave 240 finding | T1 review verdict |
|---|---|---|
| `mksglu/context-mode` | Elastic License 2.0 blob `15259beb88afda1c8790d41cdf948c9e0e4f211d` | REJECT-FOR-FIT for install/vendor use; do not use as LLMLingua replacement in a permissive-only runtime |
| `Arize-ai/phoenix` | Elastic License 2.0 blob `23d3aa7c871a4eb153186073e3d2b72d586f64be` | REJECT-FOR-FIT; `comet-ml/opik` covers observability/eval with Apache-2.0 |
| `topoteretes/cognee-integrations` | missing LICENSE | REJECT for vendoring/modification; license is not inherited automatically from parent cognee |

These three catches are load-bearing. They revise Agent A’s original recommendations: context-mode cannot be the primary LLMLingua replacement; Phoenix should not be added where Opik satisfies the same layer permissively; cognee integration must be implemented locally or wait for upstream licensing.

## S3

Q3 missing SOTA layer check against the 8 NET-NEW ADOPT-NOW packages: **mostly complete, with two caution flags**.

| Package | Layer filled | Verdict |
|---|---|---|
| `mem0ai/mem0` | Memory L1/L2 | ADOPT-NOW, primary memory replacement candidate |
| `topoteretes/cognee` | Memory L3 / graph memory | ADOPT-NOW, but integration must avoid unlicensed `cognee-integrations` |
| `traceloop/openllmetry` | OpenTelemetry observability | ADOPT-NOW as vendor-neutral telemetry layer |
| `comet-ml/opik` | eval/tracing observability | ADOPT-NOW; permissive Phoenix replacement |
| `firecrawl/firecrawl-mcp-server` | web scrape/search MCP | ADOPT-NOW |
| `blazickjp/arxiv-mcp-server` | research MCP | ADOPT-NOW |
| `exa-labs/exa-mcp-server` | search MCP | ADOPT-NOW / revive disabled Exa capability |
| `microsoft/graphrag` | standalone document-RAG | CONDITIONAL ADOPT-NOW: keep available, but do not stack by default over mem0+cognee |

The missing layer after the Mia REJECTs is **token/context optimization**. Context-mode was removed; Wave 240 leaves `jia-gao/leanctx` as a secondary candidate and queues a fresh search across `wet`, `pith`, `headroom`, `governor`, `openwolf`, `squeez`, and `lean-ctx`.

## S4

Install-order implications: Tier 1 foundation can include Claude Code, Codex, `mem0`, and `cognee`; Tier 4 should use Langfuse + Promptfoo + Opik + OpenLLMetry; Tier 5 should add Firecrawl, Exa, and arXiv MCPs. `microsoft/graphrag` should be Tier 7 conditional, activated for explicit document-RAG workflows rather than installed as a default memory substrate.

Residual risks: Codex Cloud T1 task status could not be confirmed due HTTP failure; mem0 actual commits/day remains marked unknown in Wave 240; D/E Wave 241 Claude output files are currently zero bytes, so no additional Wave 241 findings were available from those agents at synthesis time.

## S5
DONE_WITH_CONCERNS: approve mem0+cognee as the memory architecture replacement, uphold all 3 Mia REJECTs, adopt 7 of 8 net-new packages as default layers with GraphRAG conditional, and immediately re-run token-optimization discovery because context-mode is ELv2-blocked.
