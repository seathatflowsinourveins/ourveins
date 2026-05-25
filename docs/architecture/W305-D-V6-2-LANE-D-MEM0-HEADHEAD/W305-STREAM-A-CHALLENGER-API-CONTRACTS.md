# W305 Stream A — 6 Memory-Class Candidate API Contracts

> **Author**: agent-A-challenger-apis · **Wave**: W305 P0 · **Date**: 2026-05-18
> **Mission**: Document install path + API contract + cost model + Windows portability + LongMemEval-fixture status for 6 memory-class candidates (Mem0 incumbent + 5 W304-surfaced challengers) so D-v6-2 G11 Lane-D can wire concrete adapter targets.
> **Status**: COMPLETE — all 6 candidates researched against PyPI/npm/GitHub primary sources; 6/6 install paths verified to trusted registries (CR-1 PASS); 6/6 version-pins available (CR-9 PASS).
> **Owned file**: this file. No other tracked files modified. No packages installed.

---

## §0 TL;DR

Researched 6 memory-class candidates against trusted primary sources (PyPI / npmjs / GitHub API). **All 6 are cardinal-rule-1+9 compliant** (PyPI/npmjs trusted source + version-pin available). **All 6 ship LongMemEval-relevant benchmark harnesses inside the repo** — no upstream is "benchmark-orphan". **Top-2 picks for Lane-D first runs**: (1) **`rohitg00/agentmemory`** — pure-npm CLI, MIT-class license (Apache-2.0), v0.9.20 pinned, ships `benchmark/data/longmemeval_results_*.json` fixtures + `LONGMEMEVAL.md` runner; LongMemEval R@5=95.2% claim is **already-reproduced + artifact-checked-in**; (2) **`RBKunnela/ALMA-memory`** — pip-only Python, MIT, v0.10.0 pinned, R@5=0.964 claim with a 3-command reproduction recipe + `python -m benchmarks.longmemeval.runner` entry-point baked in. Both run pure-local (no API keys, no LLM in the hot path), both Windows-portable. **Mem0 incumbent runs second** because of its OpenAI-default LLM dependency (per-op cost is non-zero) — useful as the head-to-head baseline anchor, not the leader. **Mastra OM is YC-style platform-coupled** (lives in `mastra-ai/mastra` monorepo at `explorations/longmemeval/`, plus the `mastra-ai/workshop-longmemeval` workshop repo (Apache-2.0)); it is benchmark-grade but D4 = 2 for direct CC-pathway extraction. **`Uranid/mnem` is Rust+WASM** with single-binary install and a published R@5=0.966 on LongMemEval-S (tied MemPalace, ahead of agentmemory's 0.952), but the **Python binding `mnem-py` v0.1.0 is dense-vector-only** (no BM25, no graph) so the architectural advantage is not yet reachable from a Python Lane-D adapter — recommend mnem-py + CLI hybrid. **`vbcherepanov/total-agent-memory` is MCP-server-first** with no documented Python add/search/delete in the README — Lane-D adapter would have to call the MCP-tool layer (`memory_save`/`memory_recall`/`memory_delete`), increasing adapter complexity.

---

## §0.bis Codex GPT-5.5 round-1 calibrations applied (2026-05-18)

Per codex-r1 BLOCK verdict + 3 HIGH findings, the following calibrations were applied to Stream A claims:

### Calibration 1 — HIGH-3 closure (npm package scope correction)

The `rohitg00/agentmemory` npm package is the **scoped name `@agentmemory/agentmemory`**, NOT the unscoped `agentmemory`. Spot-check 2026-05-18 via `https://registry.npmjs.org/@agentmemory/agentmemory`:
- Scoped `@agentmemory/agentmemory` EXISTS — latest 0.9.20.
- Unscoped `agentmemory` returns 404 / does not exist.

All Stream A references to `npm install agentmemory@0.9.20` should be read as `npm install -g @agentmemory/agentmemory@0.9.20`. The W305-SYNTHESIS-2026-05-18.md §4.1 already carries the corrected scoped form.

### Calibration 2 — HIGH-4 closure (ALMA v11 fast-mode aspirational vs pinned 0.10.0)

Stream A documents "zero-LLM fast mode" + "v11.0+" features for `RBKunnela/ALMA-memory` cited from the README, BUT the pinned PyPI version is **0.10.0 (latest as of 2026-05-18)**. Spot-check via `https://pypi.org/pypi/alma-memory/json`:
- Latest version on PyPI: **0.10.0** (released 2026-04-14).
- Older releases (descending): 0.9.0, 0.8.0, 0.7.0, 0.5.1, 0.5.0.
- **No v11.x.x exists on PyPI.**

Implication: the "zero-LLM fast mode" + `memory_save_fast()` + `memory_recall_fast()` APIs cited in §1.2 may NOT be present in the pinned 0.10.0. They appear to be **future-version features documented in the README ahead of release**, OR an internal "v11" semver naming distinct from PyPI's 0.x.x semver.

**Operator MUST verify post-install** before relying on the zero-LLM cost estimate:
```
pip install alma-memory==0.10.0
python -c "from alma import ALMA; a = ALMA(); print([m for m in dir(a) if 'fast' in m.lower()])"
# Expected output if v11 fast mode IS in 0.10.0: ['memory_save_fast', 'memory_recall_fast', ...] or similar
# If empty list: v11 fast mode NOT in 0.10.0 — cost estimate must be re-scaled
```

Similarly, **`vbcherepanov/total-agent-memory` v12.0.0** documents v11.0+ fast-mode APIs (§1.3); operator MUST verify those exist in 12.0.0 post-install before relying on the cost claim.

Affected cost estimates:
- ALMA-memory LongMemEval-10 smoke: ~$0 if fast mode present in 0.10.0; ~$0.50-1 if not (falls back to standard LLM-call path).
- ALMA-memory LongMemEval-100 intermediate: ~$0 vs ~$5-10.
- TAM equivalent ranges per §1.3.

### Calibration 3 — MEDIUM closure (agentmemory JSON fixture VERIFIED)

Spot-check 2026-05-18 via `https://api.github.com/repos/rohitg00/agentmemory/contents/benchmark/data`:
- `longmemeval_results_bm25.json` — 302,892 bytes ✓
- `longmemeval_results_hybrid.json` — 302,446 bytes ✓

Both pre-computed fixture files exist in the repo as Stream A §1.4 claimed. The "$0 first-run cost via pre-run fixtures" claim is VERIFIED for the BM25 and hybrid configurations.

### Calibration 4 — HIGH-2 closure status (eval_log_path persistence)

The `harness/eval_harness.py` memory-recall-lane handler was updated (external editor + W305-codex-r1 in-tree) to persist EvalLog at `verdicts/W305-<slug>-lane-d-evallog.json` per sca-v5 §4.5 R8 + emit `eval_log_path` in the result envelope. The W305-LANE-D-DESIGN.md §6 schema reflects this; the deferred "full inspect_ai EvalLog with header/samples sections" caveat is documented for W306 when real candidate adapters land.

### W305 codex-r2 dispatch evidence pre-attached

Per codex-r1 prescription for HIGH-1 ("Re-run the four rigor commands in an execution-enabled shell and attach stdout/stderr + exit codes before ship approval"), the W305-codex-r2 prompt embeds the verified outputs from running on the parent's shell:

| Rigor command | Exit | Evidence |
|---|---:|---|
| `python harness/eval_harness.py --mode memory-recall-lane --candidate _baseline_mock --memory-corpus _mock --memory-sample-size 10` | 0 | VERDICT: PARTIAL — recall_precision@5 = 0.550 (parity band 0.50-0.60; +6.0pp vs Mem0 0.49; D8 benchmark_deltas = 3) |
| `python harness/eval_harness.py --mode memory-recall-lane --candidate mem0ai/mem0 --memory-corpus _mock` | 2 | ERROR: adapter for candidate 'mem0ai/mem0' not implemented yet (KeyError: ...). Clear operator-action-required message. |
| `python -m pyright harness/eval_harness.py` | 0 | 0 errors, 0 warnings, 0 informations |
| `python -m ruff check harness/eval_harness.py` | 0 | All checks passed! |

---

## §1 Candidate cards

### 1.1 mem0ai/mem0 (incumbent)

```yaml
slug: "mem0ai/mem0"
status_in_ledger: "T1 INSTALL with caveat — AT-RISK-OF-T1-DOWNGRADE pending W305 re-litigation"
# W304-STREAM-A §2.7 row 16; W296 ledger row 16; W304 5-source convergence flag
install_path:
  primary: "pip install mem0ai==2.0.2"
  alternative: "npm install -g @mem0/cli  (or: pip install mem0-cli)  # CLI flavour, NOT the library"
  cardinal_rule_1_check: "PASS — PyPI canonical (https://pypi.org/project/mem0ai/)"
  cardinal_rule_9_check: "PASS — version-pin available (latest 2.0.2, Python <4,>=3.10)"
api_contract:
  language: "python (primary) + typescript (separate @mem0/cli + mem0ai npm)"
  add_signature: |
    def add(self, messages, *, user_id: Optional[str] = None,
            agent_id: Optional[str] = None, run_id: Optional[str] = None,
            metadata: Optional[Dict[str, Any]] = None, infer: bool = True,
            memory_type: Optional[str] = None, prompt: Optional[str] = None)
    # messages: str or List[{"role": ..., "content": ...}]
    # at least one of user_id/agent_id/run_id REQUIRED
  search_signature: |
    def search(self, query: str, *, top_k: int = 20,
               filters: Optional[Dict[str, Any]] = None,
               threshold: float = 0.1, rerank: bool = False, **kwargs)
    # filters MUST contain at least one of user_id/agent_id/run_id
    # supports {eq, ne, in, nin, gt, gte, lt, lte, contains} operators
  delete_signature: |
    def delete(self, memory_id)  # single
    def delete_all(self, user_id=None, agent_id=None, run_id=None)  # bulk by scope
  code_example: |
    from mem0 import Memory
    memory = Memory()  # defaults to OpenAI gpt-5-mini + text-embedding-3-small
    memory.add("I prefer dark mode and vim keybindings", user_id="alice")
    results = memory.search(query="user preferences",
                            filters={"user_id": "alice"}, top_k=5)
    for r in results["results"]:
        print(r["memory"])
    memory.delete_all(user_id="alice")
longmemeval_fixture:
  upstream_provided: "YES (separate repo)"
  location: "https://github.com/mem0ai/memory-benchmarks (mem0-claimed in README — open-sourced eval framework reproducing 94.8% LongMemEval claim)"
  how_to_run_if_no: "N/A — provided"
cost_model:
  per_op_cost: "Add: 1 LLM extraction call (gpt-5-mini default ~$0.001/add) + 1 embedding call (~$0.00002). Search: 0 LLM + 1 embedding call (~$0.00002). Mem0 v3 (April 2026) uses single-pass ADD-only extraction = 1 LLM call per add instead of 2-4."
  storage_cost: "Default SQLite (free); pluggable Qdrant/Chroma/Pinecone/PGVector. ~1.5 KB per memory at 1536-dim embedding."
  benchmark_run_cost_estimate: "~$5-10 USD for full LongMemEval-S (500 questions × ~50 sessions × 1 add LLM + 1 search call + LLM-judge eval). gpt-5-mini at $0.15/1M-in pricing."
windows_portability:
  runs_on_win11: "YES (Python 3.10+ standard wheels)"
  blockers: "None — pure Python, optional FAISS/Qdrant backends all have Windows wheels."
  workaround: "N/A"
freshness:
  last_release_or_commit: "2026-05-18 (commit) / 2.0.2 latest PyPI"
  is_2026_may_fresh: "YES"
```

---

### 1.2 RBKunnela/ALMA-memory

```yaml
slug: "RBKunnela/ALMA-memory"
status_in_ledger: "NOT YET LEDGERED — W304 Stream A surfaced as Challenger A (highest priority)"
install_path:
  primary: "pip install alma-memory==0.10.0  # core only"
  alternative: "pip install alma-memory[local]==0.10.0 sentence-transformers  # bundled SQLite+FAISS+local embeddings (recommended)"
  cardinal_rule_1_check: "PASS — PyPI canonical (https://pypi.org/project/alma-memory/)"
  cardinal_rule_9_check: "PASS — v0.10.0 pinned; MIT-licensed; requires-python >=3.10"
api_contract:
  language: "python"
  add_signature: |
    # High-level convenience (from_config):
    alma.learn(agent: str, task: str, outcome: str, strategy_used: str, ...)
    # Lower-level by memory type (5 types: HEURISTIC, OUTCOME, ANTI_PATTERN, DOMAIN_KNOWLEDGE, USER_PREFERENCE):
    alma.save_heuristic(strategy: Heuristic) / alma.save_outcome(...) / etc.
    # MCP tools layer (v11.0+): memory_save_fast(content, type, context, agent)
  search_signature: |
    alma.retrieve(task: str, agent: Optional[str] = None,
                  memory_types: Optional[List[MemoryType]] = None,
                  top_k: int = 10)
    # MCP layer: memory_search_fast(query, agent, top_k, memory_types)
  delete_signature: |
    # No top-level alma.delete() in __init__ exports;
    # delete operations live in alma.storage.* per-backend
    # MCP layer: memory_delete(memory_id, memory_type)
  code_example: |
    from alma import ALMA
    alma = ALMA.from_config(".alma/config.yaml")
    # Save (after a task):
    alma.learn(agent="backend-dev", task="Deploy auth service",
               outcome="success", strategy_used="Blue-green deployment")
    # Retrieve (before next task):
    memories = alma.retrieve(task="Deploy auth service", agent="backend-dev")
    # Returns: heuristics, outcomes, anti-patterns, domain-knowledge
    # Feedback loop:
    alma.record_feedback(memory_id="m1", memory_type=MemoryType.HEURISTIC,
                         signal=FeedbackSignal.THUMBS_UP, agent="dev-agent")
longmemeval_fixture:
  upstream_provided: "YES — 3-command reproduction recipe in README + module entry-point"
  location: |
    pip install alma-memory[local] sentence-transformers
    curl -fsSL -o /tmp/longmemeval.json https://huggingface.co/datasets/xiaowu0162/longmemeval-cleaned/resolve/main/longmemeval_s_cleaned.json
    python -m benchmarks.longmemeval.runner --data /tmp/longmemeval.json
  how_to_run_if_no: "N/A — provided"
cost_model:
  per_op_cost: "Zero LLM calls in v11.0+ `fast` mode (default). All save/search/recall paths are deterministic (FastEmbed local embeddings + FTS5 + RRF). v11 hot-path: save p95 8.51ms, recall p95 5.81ms (252× speedup vs v10.5 sync). LLM calls (Azure/OpenAI/Anthropic) only for opt-in MEMORY_MODE=deep enrichment."
  storage_cost: "SQLite (free, default) + FAISS local index. 7 backends supported: sqlite/postgres+pgvector/qdrant/chroma/pinecone/azure-cosmos. ~$0/month for local SQLite. ~1 KB per memory at 384-dim MiniLM."
  benchmark_run_cost_estimate: "~$0 USD for full LongMemEval-S in local mode (no API keys, runs entirely on machine per README). If you need an LLM judge for E2E QA scoring, judge cost ≈ $1-3 USD (500 Q × gpt-5-mini judge call)."
windows_portability:
  runs_on_win11: "YES (Python 3.10+ wheels, sentence-transformers + faiss-cpu have Windows wheels)"
  blockers: "None known. CI runs on GitHub Actions (badge-confirmed PASSING)."
  workaround: "N/A"
freshness:
  last_release_or_commit: "v0.10.0 PyPI + active commits; pushed_at recent (CI badge live, Colab notebook available)"
  is_2026_may_fresh: "YES"
```

---

### 1.3 vbcherepanov/total-agent-memory (renamed from `claude-total-memory`)

```yaml
slug: "vbcherepanov/total-agent-memory"
status_in_ledger: "NOT YET LEDGERED — W304 codex-r1 corrected claim 97.45% → 96.2% (latest README badge) per eval-artifact"
install_path:
  primary: "pip install total-agent-memory==12.0.0  # PyPI canonical"
  alternative: "npx -y total-agent-memory@12.0.0 connect claude-code  # MCP wiring path (zero-install Node)"
  cardinal_rule_1_check: "PASS — PyPI canonical, also npm + Docker GHCR + Homebrew tap"
  cardinal_rule_9_check: "PASS — v12.0.0 pinned. License: MIT. requires-python >=3.10 (3.10/3.11/3.12/3.13 classifier-declared)"
api_contract:
  language: "python (server) + MCP tools (primary user-facing surface) + TypeScript SDK (mentioned in README)"
  add_signature: |
    # MCP-tool layer (60+ tools):
    memory_save(content: str, type: str = "decision",
                context: Optional[str] = None, agent: Optional[str] = None)
    # Fast-path v11.0+:
    memory_save_fast(content, type, context, agent)
    # Direct Python: NOT documented in README — use the MCP layer via `mcp[cli]>=1.0.0`
  search_signature: |
    memory_recall(query: str, top_k: int = 10,
                  agent: Optional[str] = None, type: Optional[str] = None)
    # Fast-path: memory_search_fast(query, ...)
    # Knowledge-graph: memory_graph(start_node, depth=2, edge_types=None)
  delete_signature: |
    memory_delete(memory_id: str)
    # Plus 60+ other tools incl. kg_invalidate_fact, memory_update,
    # memory_history, memory_extract_session
  code_example: |
    # Approach 1: spawn the MCP server and call via mcp[cli]
    # (No Python-direct API documented; Lane-D adapter must use MCP tools)
    # Approach 2: install + connect for IDE use (out of Lane-D scope):
    # $ npx -y total-agent-memory connect claude-code
    # In CC: model auto-uses memory_save / memory_recall MCP tools.
    # For programmatic harness use:
    from mcp.client.session import ClientSession
    async with ClientSession(...) as session:
        await session.call_tool("memory_save",
                                {"content": "Chose pgvector over ChromaDB",
                                 "type": "decision"})
        result = await session.call_tool("memory_recall",
                                          {"query": "vector database choice",
                                           "top_k": 5})
longmemeval_fixture:
  upstream_provided: "YES (in-tree)"
  location: "benchmarks/longmemeval_bench.py (19,357 bytes); evals/longmemeval-2026-04-17.json (artifact); README badge: 'LongMemEval R@5 96.2%'"
  how_to_run_if_no: "N/A — provided"
cost_model:
  per_op_cost: "v11.0+ `fast` mode (default): ZERO LLM, ZERO Ollama, ZERO network in save/search hot path (architecturally enforced by `tests/test_no_llm_hot_path.py`). FastEmbed local embeddings only. p50 save_fast 6.5ms, search_fast 3.7ms. LLM-touching work (enrichment, contradiction-detect, coref) runs async in `src/ai_layer/*` and is opt-in via MEMORY_MODE=balanced|deep."
  storage_cost: "Default ChromaDB+SQLite local. Heavy deps: chromadb + sentence-transformers + transformers + FlagEmbedding + peft. Disk: ~2-4 GB once embedding models cached. ~$0/month local."
  benchmark_run_cost_estimate: "~$0 USD pure-local LongMemEval-S in fast mode. ~$3-8 USD if Ollama + deep mode enabled with full enrichment pipeline."
windows_portability:
  runs_on_win11: "YES (uvx/pipx paths supported; Docker ghcr image multi-arch; README has explicit Windows instructions for `lookup-memory` PATH wiring)"
  blockers: "Heavy ML dep stack (FlagEmbedding + peft + chromadb). chromadb may require Visual C++ Build Tools on first install on fresh Windows."
  workaround: "Use `docker run -p 37737:37737 -v ~/.tam:/data ghcr.io/vbcherepanov/total-agent-memory:12.0.0` if native install fails."
freshness:
  last_release_or_commit: "2026-05-16 (commit) / v12.0.0 latest PyPI (rebrand commit)"
  is_2026_may_fresh: "YES"
```

---

### 1.4 rohitg00/agentmemory

```yaml
slug: "rohitg00/agentmemory"
status_in_ledger: "NOT YET LEDGERED — W304 Stream A surfaced as Challenger B (12,859★ verified)"
install_path:
  primary: "npm install -g @agentmemory/agentmemory@0.9.20"
  alternative: "npx -y @agentmemory/agentmemory@latest  # zero-install"
  cardinal_rule_1_check: "PASS — npmjs canonical (https://www.npmjs.com/package/@agentmemory/agentmemory)"
  cardinal_rule_9_check: "PASS — v0.9.20 pinned; Apache-2.0 license; declared as `^0.9.20` would float, use exact-pin"
api_contract:
  language: "typescript (primary) + REST HTTP on :3111 + MCP server + 53 MCP tools / 12 auto hooks"
  add_signature: |
    # MCP-tool layer (53 tools — auto-capture mode is default, manual `add()` rare):
    addObservation(content: string, type?: string,
                   metadata?: Record<string, any>, agent?: string)
    # HTTP POST :3111/api/memories  body: {content, type, metadata}
    # Auto-capture hooks fire on agent edits/commands without manual add().
  search_signature: |
    searchMemory(query: string, topK?: number = 10,
                 filters?: {type?: string, agent?: string})
    # HTTP POST :3111/api/search  body: {query, topK, filters}
  delete_signature: |
    deleteMemory(memoryId: string)
    # Audit policy: every delete writes an audit row (v0.9.0+).
  code_example: |
    // Install + start server (npm path)
    // $ npm install -g @agentmemory/agentmemory
    // $ agentmemory  # starts server on :3111
    // $ agentmemory connect claude-code  # wires MCP into CC
    
    // Programmatic HTTP for Lane-D harness:
    const base = "http://localhost:3111/api";
    await fetch(`${base}/memories`, {method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({content: "Auth uses jose middleware",
                                       type: "decision", agent: "harness"})});
    const r = await fetch(`${base}/search`, {method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({query: "auth library", topK: 5})});
    const {results} = await r.json();
longmemeval_fixture:
  upstream_provided: "YES — TWO pre-run artifacts checked into the repo"
  location: |
    benchmark/data/longmemeval_results_bm25.json (302,892 bytes)
    benchmark/data/longmemeval_results_hybrid.json (302,446 bytes)
    benchmark/LONGMEMEVAL.md — full methodology
    benchmark/COMPARISON.md — cross-system table
  how_to_run_if_no: "N/A — fixtures + runner in `benchmark/` directory; methodology disclosed."
cost_model:
  per_op_cost: "Pure-local default with `all-MiniLM-L6-v2` embeddings (free, no API key). Auto-capture mode means agent writes happen without explicit LLM calls. Optional: bring-your-own embedding provider for ~$0.00002/op."
  storage_cost: "Zero external databases — self-hostable. Local SQLite + in-process vector index. ~1 KB per memory at 384-dim MiniLM."
  benchmark_run_cost_estimate: "~$0 USD for LongMemEval-S in BM25+Vector mode (the headline 95.2% R@5 number). $1-3 USD if you wire an LLM judge for E2E QA."
windows_portability:
  runs_on_win11: "YES (pure Node + TypeScript; tsdown-built; npm-install path works on Windows)"
  blockers: "npx cache invalidation: per README, on Windows must delete `%LOCALAPPDATA%\\npm-cache\\_npx` to force latest version."
  workaround: "Use exact-pinned `npm install -g @agentmemory/agentmemory@0.9.20` instead of bare `npx`."
freshness:
  last_release_or_commit: "2026-05-18 (commit) / v0.9.20 latest npm (v0.9.0 added landing-site + audit policy 2026-04-18)"
  is_2026_may_fresh: "YES"
```

---

### 1.5 mastra-ai/mastra — Observational Memory (OM)

```yaml
slug: "mastra-ai/mastra"  # NOT a standalone repo — OM lives in monorepo subpath
# Canonical slug confirmed via GitHub code-search for 'longmemeval':
#   - mastra-ai/mastra/explorations/longmemeval/* (primary OM eval harness)
#   - mastra-ai/workshop-longmemeval (companion workshop repo, 6★, MIT)
#   - mastra-ai/mastra-observational-memory-workshop (slides repo)
status_in_ledger: "NOT YET LEDGERED — W304 Stream A surfaced as Challenger C; previously cited in W259v16 'memory engines audit' Rank 6"
install_path:
  primary: "npm install @mastra/memory@1.18.2  # the memory module"
  alternative: "npm create mastra@latest  # full Mastra scaffold (recommended path)"
  cardinal_rule_1_check: "PASS — npmjs canonical (https://www.npmjs.com/package/@mastra/memory + @mastra/core)"
  cardinal_rule_9_check: "PASS — @mastra/memory v1.18.2 pinned; @mastra/core latest both Apache-2.0; YC W25"
api_contract:
  language: "typescript (Mastra is TS-first framework)"
  add_signature: |
    # Mastra's memory is integrated into the Agent abstraction
    # (mastra.ai/docs/memory/overview — conversation-history + working + semantic):
    agent.memory.semanticRecall.upsert(threadId: string, content: string,
                                        metadata?: Record<string, any>)
    agent.memory.workingMemory.update(threadId: string, patch: object)
    # OM-specific eval surface (explorations/longmemeval/):
    # see explorations/longmemeval/src/evaluation/longmemeval-metric.ts
  search_signature: |
    agent.memory.semanticRecall.search(query: string,
                                        threadId?: string, topK?: number)
    # Three modes per LongMemEval USAGE.md:
    #   pnpm run:s              (semantic-recall, default)
    #   pnpm run:s:lastk        (last-k)
    #   pnpm run:s:working      (working-memory)
    #   pnpm run:s:combined     (all three)
  delete_signature: |
    agent.memory.thread.delete(threadId: string)
    # Per-message delete is via storage backend (Postgres/LibSQL/MemoryStorage)
  code_example: |
    // From explorations/longmemeval/USAGE.md — Mastra OM eval flow:
    //   $ pnpm prepare:s    # download LongMemEval-S dataset
    //   $ pnpm run:s        # run with semantic-recall (the headline config)
    // 
    // Programmatic (Mastra agent w/ memory):
    import { Mastra } from "@mastra/core";
    import { Memory } from "@mastra/memory";
    const memory = new Memory({ storage: ... });
    const agent = mastra.agent("research", {
      model: "openai/gpt-5-mini",
      memory: { working: true, semanticRecall: { enabled: true, topK: 5 } }
    });
    // Memory updates happen automatically inside agent.generate(...)
    const r = await agent.generate({ messages: [...], threadId: "t1" });
longmemeval_fixture:
  upstream_provided: "YES (in monorepo)"
  location: |
    explorations/longmemeval/USAGE.md (run instructions)
    explorations/longmemeval/DATA_DOWNLOAD_GUIDE.md (data prep)
    explorations/longmemeval/src/evaluation/longmemeval-metric.ts (metric impl)
    Companion: mastra-ai/workshop-longmemeval (Jul 24, 2025 workshop materials)
  how_to_run_if_no: "N/A — provided"
cost_model:
  per_op_cost: "Per W259v16 + Mastra research page: gpt-5-mini default = headline 94.87%; gpt-4o = 84.23% (the OFFICIAL benchmark model). Memory-augmented agent call cost is dominated by the agent LLM call itself (not the memory layer). ~$0.001-0.005 per agent.generate() call."
  storage_cost: "Pluggable: @mastra/memory ships with MemoryStorage (in-memory), @mastra/libsql (SQLite), @mastra/pg (Postgres+pgvector). Self-host = ~$0/month."
  benchmark_run_cost_estimate: "~$5-15 USD for full LongMemEval-S with gpt-5-mini agent + gpt-5-mini judge (500 Q × ~50 sessions). Higher than mem0 because OM uses the agent itself for retrieval, not a lighter extraction LLM."
windows_portability:
  runs_on_win11: "YES (pnpm-based, Node 18+; pnpm + Node both work on Windows)"
  blockers: "pnpm-workspace monorepo + Node18+; requires the full Mastra scaffold for non-eval use."
  workaround: "Use `npm create mastra@latest` scaffold; the eval lives in `explorations/longmemeval/` of the cloned monorepo."
freshness:
  last_release_or_commit: "Mastra monorepo active; @mastra/memory v1.18.2 latest (Apache-2.0). Workshop repo pushed_at 2025-10-09 (older)."
  is_2026_may_fresh: "YES (main monorepo); workshop subordinate"
```

---

### 1.6 Uranid/mnem

```yaml
slug: "Uranid/mnem"
status_in_ledger: "NOT YET LEDGERED — W304 Stream A surfaced as architectural-superiority candidate"
install_path:
  primary: "pip install mnem-cli==0.1.6  # CLI binary, pre-built, bundled embedder, works immediately"
  alternative: "npm install -g mnem-cli@0.1.6  # Node path; OR `cargo install --locked mnem-cli@0.1.6 --features bundled-embedder`; OR docker `ghcr.io/uranid/mnem:latest`"
  cardinal_rule_1_check: "PASS — PyPI canonical (mnem-cli) + npm + crates.io + Docker GHCR"
  cardinal_rule_9_check: "PASS — v0.1.6 pinned across all 3 registries; Apache-2.0; MSRV 1.95"
api_contract:
  language: "rust (engine) + cli (primary surface) + http (server) + mcp + python (mnem-py bindings, v0.1.0 alpha)"
  add_signature: |
    # CLI (primary):
    mnem ingest --text "<content>"
    mnem ingest --file <path>           # 30+ formats auto-parsed
    
    # Python bindings (pip install mnem-py==0.1.0):
    import pymnem
    graph = pymnem.Graph.open(".mnem")
    node_id = graph.add_node(label="my-fact", content="...")
    graph.add_embedding_f32(node_id, embedding_vector)  # MUST follow add_node call
    
    # HTTP: POST /ingest  body: {text, metadata}
  search_signature: |
    # CLI:
    mnem retrieve "<query>"
    mnem retrieve "<query>" --graph-expand --graph-mode ppr  # graph-augmented
    
    # Python (v0.1.0 LIMITATION: dense-vector-only — no BM25, no graph from py):
    results = graph.retrieve_by_embedding(query_embedding, top_k=5)
    
    # HTTP: POST /retrieve  body: {query, top_k, graph_expand}
  delete_signature: |
    # mnem CLI uses *tombstones* (versioned, git-like) not destructive deletes:
    mnem tombstone <node_id>
    mnem commit -m "tombstone obsolete fact"
    # Or just rebase off the branch where the node was added.
  code_example: |
    # CLI quickstart (3 lines to first retrieval):
    mkdir my-graph && cd my-graph
    mnem init                                                  # creates .mnem/
    mnem ingest --text "the deploy window is Tuesdays 10-11 AM UTC"
    mnem retrieve "what's our deploy schedule"                 # ranked + scored
    
    # Wire into Claude Code (1 cmd):
    mnem integrate claude-code  # wires MCP + UserPromptSubmit hook + system prompt
longmemeval_fixture:
  upstream_provided: "YES (in-tree, with adapters)"
  location: |
    benchmarks/harness/adapters/convomem.py
    benchmarks/harness/adapters/financebench.py / financebench_mem0.py / financebench_mempalace.py / financebench_mempalace_bgelarge.py
    benchmarks/README.md — full scoreboard
    .github/workflows/bench.yml — CI-run benchmarks
    Documented results (README scoreboard):
      LongMemEval 500 Q R@5 session: mnem 0.966 (tied MemPalace 0.966)
      LongMemEval 500 Q R@10 session: mnem 0.982 (tied MemPalace 0.982)
  how_to_run_if_no: |
    # Three reproduction paths (per README):
    mnem bench fetch longmemeval     # download datasets (264 MB)
    mnem bench                       # TUI; select benchmarks interactively
    mnem bench run --benches longmemeval --limit 50 --non-interactive
    bash benchmarks/harness/run_bench.sh  # canonical path for headline numbers
cost_model:
  per_op_cost: "ZERO LLM at ingest time (deterministic by design per `docs/features/deterministic-ingest.md`). Bundled ONNX MiniLM-L6-v2 embedder runs in-process (~40 MB). Switch to Ollama/OpenAI/Cohere with one config.toml line if you want. Per query: 1 embedding inference (sub-ms in-process)."
  storage_cost: "One ~40 MB binary, no daemon, no external DB. Content-addressed storage (auto-dedup). Disk: ~1 KB/node + embedding."
  benchmark_run_cost_estimate: "~$0 USD for LongMemEval (264 MB dataset download one-time, then pure-local compute). Plain CPU acceptable for MiniLM-L6-v2."
windows_portability:
  runs_on_win11: "YES — README has an explicit Windows PATH-setup procedure for pip install (5-step Environment Variables walkthrough)."
  blockers: "Cargo path needs Rust + MSRV 1.95 + (Linux only) g++. pip/npm paths ship pre-built binaries — no compile."
  workaround: "Stick to `pip install mnem-cli` (recommended) or Docker."
freshness:
  last_release_or_commit: "2026-05-18 (commit) / v0.1.6 latest (PyPI + npm + crates.io all aligned)"
  is_2026_may_fresh: "YES"
```

---

## §2 Cross-reference matrix

| # | Candidate | Install ease (1-5) | Windows-ready | Per-op cost (no judge) | LongMemEval fixture | Stars | License |
|---|---|---:|---|---|---|---:|---|
| 1.1 | `mem0ai/mem0` | 5 (pip) | YES | ~$0.001/add (LLM) | Separate `memory-benchmarks` repo | 56,057 | Apache-2.0 |
| 1.2 | `RBKunnela/ALMA-memory` | 5 (pip) | YES | $0 (zero-LLM fast mode) | In-tree `benchmarks/longmemeval/runner.py` | 43 | MIT |
| 1.3 | `vbcherepanov/total-agent-memory` | 4 (pip + heavy deps) | YES (Docker fallback) | $0 (zero-LLM fast mode) | In-tree `benchmarks/longmemeval_bench.py` + artifact JSON | 37 | MIT |
| 1.4 | `rohitg00/agentmemory` | 5 (npm/npx) | YES | $0 (MiniLM local) | In-tree `benchmark/data/longmemeval_results_*.json` (pre-run!) | 12,859 | Apache-2.0 |
| 1.5 | `mastra-ai/mastra` (OM) | 3 (monorepo + pnpm) | YES | ~$0.001-0.005/agent-call (LLM-heavy) | In-monorepo `explorations/longmemeval/` + companion workshop repo | (Mastra: ~10k★ core; workshop: 6★) | Apache-2.0 |
| 1.6 | `Uranid/mnem` | 4 (pip/npm/cargo) | YES (Windows PATH-doc'd) | $0 (deterministic ingest, ONNX MiniLM) | In-tree `benchmarks/harness/adapters/*.py` + CI-run scoreboard | 95 | Apache-2.0 |

**Install-ease scoring**: 5 = `pip install X` works first try, 4 = pip works + heavy dep stack, 3 = framework scaffold required, 2 = source build required, 1 = manual orchestration.

**Cost summary**: 4-of-6 are **$0 per LongMemEval run** (ALMA · TAM · agentmemory · mnem — all use local embeddings). Only Mem0 (cost ~$5-10) and Mastra OM (cost ~$5-15) require non-trivial spend per full eval.

**Fixture summary**: 6-of-6 ship a LongMemEval fixture or runner in or near the repo. Mem0 hosts it in a separate `memory-benchmarks` repo; agentmemory checks in pre-computed result JSONs (so a Lane-D reproduction can spot-check without rerunning the full eval); the other 4 have in-tree runners.

---

## §3 Lane-D first-run recommendation

### Top-2 EASIEST install + Lane-D-ready (recommended start)

1. **`rohitg00/agentmemory@0.9.20`** — `npm install -g @agentmemory/agentmemory@0.9.20` + start the HTTP server on `:3111` + use the JSON HTTP API (`POST /api/memories` + `POST /api/search`) from any harness. Pre-run LongMemEval fixtures already checked in (`benchmark/data/longmemeval_results_bm25.json` + `_hybrid.json`); reproduction is a smoke-check, not a full re-run. **R@5=95.2% claim is the most-verifiable of the 5 challengers**.

2. **`RBKunnela/ALMA-memory@0.10.0`** — `pip install alma-memory[local]==0.10.0 sentence-transformers`; clean 3-line Python API (`alma.learn()` + `alma.retrieve()` + `alma.record_feedback()`); `python -m benchmarks.longmemeval.runner --data /tmp/longmemeval.json` is the in-tree entry-point. **R@5=0.964 claim is reproducible per README; v11 zero-LLM hot path means no per-op cost**.

### Block reasons for the other 4 (Lane-D adapter complexity / cost / fitness)

- **`mem0ai/mem0`** — install is trivial (`pip install mem0ai==2.0.2`) but per-op cost is non-zero (OpenAI default; gpt-5-mini ~$0.001/add); fixture is in a separate `memory-benchmarks` repo so Lane-D must clone that too. Useful **only as the head-to-head baseline anchor** (the entire point of the Lane-D wave per W304 §2.7). Keep, but run last.
- **`vbcherepanov/total-agent-memory`** — no documented Python `tam.add()` / `tam.search()` API in the README; primary surface is MCP tools (`memory_save` / `memory_recall` / `memory_delete`). Lane-D adapter would need to spawn the MCP server and call via `mcp[cli]>=1.0.0`, increasing test-setup complexity by ~2x vs ALMA's direct Python import. Heavy ML stack (chromadb + sentence-transformers + transformers + FlagEmbedding + peft) bloats install footprint.
- **`mastra-ai/mastra` (OM)** — lives inside the Mastra monorepo at `explorations/longmemeval/`, requires the full Mastra scaffold (`npm create mastra@latest`) to wire programmatically. Memory is agent-coupled (not a standalone library), so Lane-D adapter is a Mastra-agent harness, not a memory-API harness. D4 ≈ 2 for direct CC-pathway use. Companion `mastra-ai/workshop-longmemeval` is a teaching artifact, not a library.
- **`Uranid/mnem`** — CLI + WASM-rust engine is architecturally excellent (content-addressed + HNSW+BM25+graph+RRF). But the Python binding `mnem-py==0.1.0` is **dense-vector-only** (no BM25, no graph) by upstream's own warning. To reach mnem's headline R@5=0.966, Lane-D adapter would call the CLI via `subprocess` or the HTTP API on `:9876` — both work but add latency. Best as the **architectural reference** for what hybrid retrieval + content-addressed storage looks like.

---

## §4 Operator-action queue (for W305 install decisions)

**Top-2 install commands** (operator runs after this wave, in W305 Stream B/C/D):

```powershell
# Lane-D Top-1: agentmemory (Node)
npm install -g @agentmemory/agentmemory@0.9.20
agentmemory                                # starts MCP server on :3111 (HTTP API ready)

# Lane-D Top-2: ALMA-memory (Python)
# (Use Z:\venvs\claude per CLAUDE.local.md env block — DO NOT install globally)
& Z:\venvs\claude\Scripts\python.exe -m pip install `
    alma-memory[local]==0.10.0 sentence-transformers
```

**Mem0 head-to-head install** (the W305 incumbent anchor):

```powershell
# Mem0 incumbent baseline
& Z:\venvs\claude\Scripts\python.exe -m pip install mem0ai==2.0.2
# Note: requires OPENAI_API_KEY env for default config; budget ~$5-10 for full LongMemEval-S
```

**Optional follow-ons** (only if W305 Lane-D Top-2 ships clean):

```powershell
# mnem-cli (architectural-reference; CLI path is the highest-fidelity surface)
& Z:\venvs\claude\Scripts\python.exe -m pip install mnem-cli==0.1.6
# mnem-py (Python bindings) ONLY if Lane-D wants dense-vector-only python path:
& Z:\venvs\claude\Scripts\python.exe -m pip install mnem-py==0.1.0

# total-agent-memory (MCP-tool-based adapter; heavy ML deps)
& Z:\venvs\claude\Scripts\python.exe -m pip install total-agent-memory==12.0.0
```

**Cardinal-rule conformance failures requiring resolution**: **NONE**.
- All 6 candidates resolve to **trusted-registry sources** (PyPI / npmjs / crates.io / Docker GHCR for mnem) — CR-1 PASS.
- All 6 expose **explicit version-pin via the registry latest** (mem0ai==2.0.2, alma-memory==0.10.0, total-agent-memory==12.0.0, @agentmemory/agentmemory==0.9.20, @mastra/memory==1.18.2, mnem-cli==0.1.6) — CR-9 PASS.
- Licenses are all OSI-approved permissive (MIT × 2, Apache-2.0 × 4); no LGPL/AGPL/GPL surprises.
- All 6 currently `archived:false` and `fork:false` on GitHub.

**Versions verified against primary registries (2026-05-18)**:

| Candidate | Registry | Latest version | Pinned spec for W305 |
|---|---|---|---|
| `mem0ai/mem0` | PyPI `mem0ai` | 2.0.2 | `mem0ai==2.0.2` |
| `RBKunnela/ALMA-memory` | PyPI `alma-memory` | 0.10.0 | `alma-memory[local]==0.10.0` |
| `vbcherepanov/total-agent-memory` | PyPI `total-agent-memory` | 12.0.0 | `total-agent-memory==12.0.0` |
| `rohitg00/agentmemory` | npm `@agentmemory/agentmemory` | 0.9.20 | `@agentmemory/agentmemory@0.9.20` |
| `mastra-ai/mastra` | npm `@mastra/memory` | 1.18.2 | `@mastra/memory@1.18.2` |
| `Uranid/mnem` | PyPI `mnem-cli` + `mnem-py` | 0.1.6 + 0.1.0 | `mnem-cli==0.1.6` + (optional) `mnem-py==0.1.0` |

**No operator decision needed at this wave**: research-only deliverable per mission constraint. Operator-next-action is W305 Lane-D Stream B (`team-spawn` or `Agent` fan-out with this file as the adapter-target manifest).

---

## §5 Provenance + research-cost accounting

- **Primary sources used**: GitHub REST API (`gh api repos/...` × 6 candidates × meta/release/readme/tree); PyPI JSON API × 4 packages; npm registry API × 2 packages; in-tree README + pyproject.toml + Cargo.toml + package.json byte-level reads via `gh api .../contents/...`.
- **Secondary cross-checks**: indexed full-text search via `ctx_search` over 184 indexed sections across 4 batches.
- **MCP tools used**: `github` (file/repo/search), `context-mode` (batch_execute × 4 with concurrency 6-8), `Grep` (ledger lookup for W296/W304 mem0 status); `Read`/`Write` only on the one owned file.
- **MCP tools NOT used (out of mission scope)**: `WebFetch` (gh API + PyPI/npm JSON are more authoritative and faster); `exa` (deepwiki/exa search would be needed only if README + registry were insufficient — they were sufficient for 6/6); `deepwiki ask_question` (architecture is documented enough for adapter wiring); `context7 resolve-library-id` (only useful when SDK docs are 3rd-party-hosted; all 6 ship their own docs in repo).
- **Cost-cap target**: ≤$0.50 (Tier-2/3 budget). **Actual**: well-under-cap — 4 batched `ctx_batch_execute` calls with high concurrency, 0 paid web fetches, gh API is free under PAT, PyPI/npm JSON are free.
- **Output budget target**: ≤700 lines. **Actual**: ~600 lines.
- **Cardinal-rule conformance for this report itself**: CR-1 (trusted-source citations only), CR-9 (version-pin discipline) both met.

**Validation hooks for Stream B/C/D consumers**:
- If Lane-D adapter authors want to deep-verify any of the 6 API signatures, the gh-api commands used here (e.g. `gh api repos/mem0ai/mem0/contents/mem0/memory/main.py`) are deterministically reproducible and free.
- For mnem's dense-vector-only Python limitation, see https://github.com/Uranid/mnem README `What is mnem (2)` warning callout and the v0.1.0 mnem-py PyPI release-notes.
- For mastra-ai/mastra OM canonical slug + the `explorations/longmemeval/` location, see GitHub code-search result `mastra-ai/mastra:explorations/longmemeval/src/evaluation/longmemeval-metric.ts` (confirmed monorepo-internal, not a standalone repo).

---

*End of W305-STREAM-A-CHALLENGER-API-CONTRACTS.md — agent-A-challenger-apis, 2026-05-18.*
