# W331 Stream-1 — Anthropic Official SDK + MCP Line-by-Line Ingest

> Per W330 codex axis-1 #13 finding: Stream B's repo set was incomplete for "investigate runtime against official SDKs". This stream covers 4 official Anthropic-org sources.
>
> Wave: W331 · Date: 2026-05-19 · Operator: claude-sota-installed runtime · Stream: Stream-1 (parallel under W331 mega-audit).
>
> **Sourcing**: repomix-pack returned 0 files for all 4 targets (likely remote-clone failure / rate limit at attempt time — empty `<files>` block in every pack ID 9e37864fe6cc9228 / d40f9eff6fcd9f31 / e0f877db4ed974b9 / 0514b331d1aba5af). Fell back to **deepwiki AI-indexed source-of-truth queries** which return cite-anchored verbatim quotes from each repo at HEAD. All four-deepwiki round-trips succeeded.

---

## §1 anthropics/claude-cookbooks @ 39a350b6790c132337dcc3ec35240728fcc1dc0e (HEAD per CLAUDE.md anchor)

**Target files**: `patterns/agents/orchestrator_workers.ipynb` cell-2 · `patterns/agents/prompts/research_lead_agent.md` · `patterns/agents/evaluator_optimizer.ipynb`.

### 1.1 Empty-worker-content handler (orchestrator_workers.ipynb)
Per deepwiki query, the canonical defensive handler in `FlexibleOrchestrator.process()` lives at **lines 202-205**:

```python
if not worker_content or not worker_content.strip():
    # fallback error message
```

This is the **runtime's actual citation target** for "canonical empty-final-message handler" (Δ-PDM-1 F4 anti-inline rule). Pattern: defensive-default before returning to the caller — guards against worker truncation, empty stop_reason, or whitespace-only output.

### 1.2 `<use_parallel_tool_calls>` MUST-block (research_lead_agent.md:135-137)
Already CLAUDE.md-cited as the parallel-dispatch authority. Deepwiki re-confirmed verbatim at L135-137:

> "use_parallel_tool_calls ... MUST-block ... requires parallel tool calls for creating multiple subagents"

This anchors W269 parallel-dispatch-mandate skill + W312-D 2+ Agent calls in 1 assistant message + W325-A 0.7 target ratio.

### 1.3 evaluator_optimizer.ipynb — generate/evaluate loop
Two-function iterative pattern: `generate()` proposes a candidate; `evaluate()` scores against rubric/judge; loop continues until acceptance or max-iters. **Adoption note**: this is the canonical template for our self-eval skill + ship-gate rubric loop. Not currently mapped to a runtime skill in CLAUDE.md.

---

## §2 anthropics/anthropic-sdk-python @ HEAD

### 2.1 Tool-use loop (stop_reason == "tool_use")
Canonical check: `message.stop_reason == "tool_use"` → tool block at `message.content[1]` with `type == "tool_use"` containing `id`, `name`, `input`. Loop pattern: model returns tool_use → caller executes tool → caller appends `tool_result` content block → re-invokes `messages.create()`.

### 2.2 Prompt-caching cache_control insertion points
**Top-level**: `cache_control={"type": "ephemeral", "ttl": "5m"}` auto-applies to last cacheable block.

**System prompt with cache marker** (canonical pattern):
```python
system=[{
  "text": "Today's date is 2024-06-01.",
  "type": "text",
  "cache_control": {"type": "ephemeral", "ttl": "5m"},
}]
```

**Tools with cache marker**: same `cache_control` field on tool definitions. TTLs supported: `"5m"` and `"1h"`.

### 2.3 Batch API (beta.messages.batches)
Sub-resource at `client.beta.messages.batches` — `create(requests=[...])`, `retrieve(id)`, `list()`, `results(id)` (JSONL stream), `cancel(id)`. Each batch request carries `custom_id` for result correlation.

### 2.4 Streaming — MessageStream + InputJsonEvent (partial_json)
`MessageStream.text_stream` (text-only deltas), `.get_final_message()` (blocking accumulator), `.current_message_snapshot` (live snapshot). For tool inputs: `InputJsonEvent.delta` (raw JSON chunk) + `.snapshot` (jiter-parsed partial dict on every delta — enables UI streaming of structured args).

### 2.5 Beta features (per beta.messages.create signature)
- `cache_control: Optional[BetaCacheControlEphemeralParam]` — prompt caching.
- `context_management: Optional[BetaContextManagementConfigParam]` — auto window mgmt via edits `clear_tool_uses_20250919` / `clear_thinking_20251015`.
- `mcp_servers: Iterable[BetaRequestMCPServerURLDefinitionParam]` — MCP integration.
- `thinking: BetaThinkingConfigParam` — extended thinking.
- `betas: List[str]` header injection (e.g., `prompt-caching-2024-07-31`).

---

## §3 anthropics/anthropic-sdk-typescript @ HEAD (parity with §2)

### 3.1 Tool-use loop — BetaToolRunner
**Higher-level abstraction than Python SDK**: `BetaToolRunner` class implements the full multi-turn loop with `max_iterations`, automatic state accumulation, and `client.beta.messages.create()` re-invocation. Returns `ParsedBetaMessage<ParsedT>` once model emits final text.

```ts
async run(): Promise<ParsedBetaMessage<ParsedT>>
```

**Gap vs Python**: Python SDK lacks an equivalent `ToolRunner` — callers wire the loop manually. **Adoption candidate** for any runtime python orchestrator code.

### 3.2 cache_control (CacheControlEphemeral type)
```ts
cache_control: { type: 'ephemeral', ttl: '5m' }
```
Applied to system blocks, tools, content blocks — same insertion-point semantics as Python.

### 3.3 Batch API — JSONLDecoder streaming
```ts
async results(messageBatchID, params?, options?):
  Promise<JSONLDecoder<BetaMessageBatchIndividualResponse>>
```
Streams JSONL, decoded per-line; `custom_id` correlation.

### 3.4 Streaming — MessageStream events
EventEmitter surface: `connect`, `text`, `message`, `contentBlock`, `finalMessage`, `error`. Async iterator surface for raw stream events. Tool-input streaming via `input_json_delta` events with `partial_json: string` (chunks may be invalid JSON mid-stream; client must accumulate).

```ts
for await (const event of stream) {
  if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') { ... }
}
const finalMessage = await stream.finalMessage();
```

### 3.5 Beta resources
`client.beta.files.*` (upload/list/delete/download/retrieveMetadata) · `client.beta.messages.batches.*` · `BetaToolComputerUse20250124` (`computer_20250124`, `display_height_px`, `display_width_px`) — all `cache_control`-aware. `betas: [...]` array or `anthropic-beta` header.

---

## §4 modelcontextprotocol/modelcontextprotocol @ HEAD (`2025-11-25` draft)

### 4.1 Initialize handshake required fields
Client → server (`InitializeRequestParams`):
```json
{"jsonrpc": "2.0", "id": 1, "method": "initialize",
 "params": {"protocolVersion": "2025-11-25", "capabilities": {...}, "clientInfo": {...}}}
```
Server → client (`InitializeResult`): MUST return `protocolVersion`, `capabilities`, `serverInfo`. All 3 server-side fields **required**.

### 4.2 Capabilities object structure
**Client**: `roots`, `sampling`, `elicitation`, `tasks`, `extensions`, `experimental`.
**Server**: `prompts.listChanged?`, `resources.{subscribe, listChanged}?`, `tools.listChanged?`, `logging`, `completions`, `tasks`, `extensions`, `experimental`.

```json
"capabilities": {
  "logging": {},
  "prompts": {"listChanged": true},
  "resources": {"subscribe": true, "listChanged": true},
  "tools": {"listChanged": true}
}
```

### 4.3 tools/list response contract (Tool object)
Required: `name` (unique str), `description` (str), `inputSchema` (JSON Schema). Returns `ListToolsResult { tools: Tool[] }`. The `annotations` field (and other optional metadata) live in the full `Tool` interface in `schema/draft/schema.{ts,json}` — deepwiki noted full Tool interface not visible in indexed slice.

### 4.4 JSON-RPC error codes
Verbatim from `schema/draft/schema.ts`:
```ts
export const PARSE_ERROR = -32700;       // Invalid JSON
export const INVALID_REQUEST = -32600;   // Not a valid request object
export const METHOD_NOT_FOUND = -32601;  // Method/capability not declared
export const INVALID_PARAMS = -32602;    // Bad params
export const INTERNAL_ERROR = -32603;    // Server-internal error
// Server-error range: -32000 to -32099 (impl-defined, JSON-RPC 2.0 spec)
```

---

## §5 Top 3 Adoption Candidates for claude-sota-installed runtime

### A. **BetaToolRunner-equivalent for Python (§3.1)** — HIGH priority
The TS SDK ships a fully-managed multi-turn tool loop; the Python SDK does not. Any python-side orchestrator (e.g. `harness/eval_harness.py`, future eval lanes, codex-bridge subprocess wrappers) currently has to hand-roll `while stop_reason == "tool_use": ...` loops. **Action**: encapsulate runtime's tool loops behind a thin `RunnerProto` matching the TS shape — `run() -> ParsedMessage`, `max_iterations`, accumulated state. Reduces drift between runtime tools and SDK semantics.

### B. **Adopt `cache_control` with explicit TTL across stable insertion points (§2.2 / §3.2)** — HIGH priority
Current runtime doesn't appear to explicitly tag system prompts / tool defs with `cache_control: {type: ephemeral, ttl: "5m"|"1h"}` (CLAUDE.md is pointer-only; behavioural skills load lazy). For long-context eval lanes + repeated agent-team dispatches, this is **direct token-cost reduction** on Anthropic side. **Action**: audit any runtime code that constructs `messages.create()` payloads; add `cache_control` to (i) the always-loaded pointer-CLAUDE.md system message and (ii) cardinal-rule preamble blocks if such blocks exist. Cite anchor: `cookbooks @ 39a350b6790c132337dcc3ec35240728fcc1dc0e patterns/agents/prompts/research_lead_agent.md:135-137` style.

### C. **Evaluator-optimizer generate/evaluate loop as ship-gate primitive (§1.3)** — MEDIUM priority
W330 ship-gate composite-arch-quality penalty system + W325-A 0.7 parallel-ratio target already implies a rubric-driven evaluator. The cookbook's `evaluator_optimizer.ipynb` is the canonical 2-function shape (generate → evaluate → loop). **Action**: align `engineering-advanced-skills:ship-gate` skill (CLAUDE.md L-skill-list) with the `generate()`/`evaluate()` naming + signature so future ship-gate iterations are pattern-compatible with the cookbook reference.

---

## §6 MCP-runtime-correctness check (against §4 spec)

**Quick sanity**: runtime's `.mcp.json` uses standard `command/args` with `protocolVersion` negotiated at handshake by client (Claude Code) — direct user-side action not required. **Potential follow-up** (out-of-scope for this stream): verify each installed MCP server (basic-memory, cognee, context-mode, repomix, deepwiki, langfuse, perplexity, tavily, exa, …) declares `tools.listChanged` correctly; if a server emits `tools/list_changed` notifications without declaring the capability, that's a §4.2 spec violation that would silently degrade tool-discovery refresh. Flagged for W332+ runtime-MCP-audit stream.

---

## §7 Citations summary

| Source | SHA / version | Cite anchors |
|---|---|---|
| anthropics/claude-cookbooks | `39a350b6790c132337dcc3ec35240728fcc1dc0e` (HEAD per CLAUDE.md) | `patterns/agents/orchestrator_workers.ipynb:202-205` · `patterns/agents/prompts/research_lead_agent.md:135-137` · `patterns/agents/evaluator_optimizer.ipynb` (whole-notebook generate/evaluate pattern) |
| anthropics/anthropic-sdk-python | HEAD (deepwiki-indexed 2026-05-19) | `src/anthropic/resources/beta/messages/messages.py` (beta create signature) · `src/anthropic/lib/streaming/_messages.py` (MessageStream) · `src/anthropic/types/beta/...` (BetaCacheControlEphemeralParam, BetaContextManagementConfigParam, BetaThinkingConfigParam) |
| anthropics/anthropic-sdk-typescript | HEAD (deepwiki-indexed 2026-05-19) | `src/lib/BetaToolRunner.ts` · `src/lib/MessageStream.ts` · `src/resources/beta/messages/batches.ts` · `src/resources/beta/files.ts` · `BetaToolComputerUse20250124` type |
| modelcontextprotocol/modelcontextprotocol | HEAD draft `2025-11-25` | `docs/specification/draft/basic/lifecycle.mdx` · `schema/draft/schema.ts` (PARSE_ERROR..INTERNAL_ERROR constants) · `schema/draft/schema.json` (InitializeRequestParams, InitializeResult, ServerCapabilities) |

All cites are Anthropic-org or Anthropic-spec-authored (modelcontextprotocol is co-stewarded by Anthropic). Per stream brief: ≥3-org-distinct not required for this stream.
