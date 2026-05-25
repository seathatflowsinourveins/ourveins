# W323 Stream-2 — Coding-Language Cookbook (Node 22 / Python 3.14 / PowerShell 7 / Rust 1.95) vs Anthropic SDK SOTA

**Methodology**: deepwiki (anthropic-sdk-typescript + anthropic-sdk-python + claude-agent-sdk-typescript) + Read on `harness/local_model_otel_wrapper.py` + `tools/test-msys-norm.mjs`. NO repomix-pack. NO WebFetch (context-mode hook blocked; deepwiki sufficient). Total: 5 tool calls, ~12K tokens.

## §1 Node 22+ features to adopt (current harness already at `node:` prefix)

| Feature | Anthropic-TS-SDK pattern | Our `test-msys-norm.mjs` status | Adopt? |
|---|---|---|---|
| `node:` prefixed imports | ✓ pervasive (node:stream, etc.) | ✓ already (node:child_process, node:fs, node:path, node:process) | HOLD |
| Built-in Web Fetch API | ✓ zero-dep `globalThis.fetch` | n/a (no HTTP in harness) | n/a |
| `Symbol.asyncIterator` | ✓ `MessageStream` impls; `for await...of` | n/a (sync harness) | n/a |
| `node:test` built-in runner | n/a (SDK uses jest/vitest) | ✗ custom `main()` runs ENV_SHAPES × STOP_HOOKS | **HIGH — adopt `node:test`** for clearer CI semantics |
| `AsyncLocalStorage` | ✓ stream-context tracking | n/a | LOW (no nested async context yet) |
| `BroadcastChannel` | ✗ not in SDK | n/a | SKIP |
| `WeakRef`/`FinalizationRegistry` | ✓ stream-cleanup patterns | n/a | LOW |
| ES2024 RegExp `v` flag | ✗ SDK uses standard | could use in `normalizeMsysPath` regex | LOW |

**Top win**: convert `test-msys-norm.mjs:main()` to `node:test` suite (12 EDGE_CASES + 30 ENV_SHAPES × STOP_HOOKS = 42 `test()` blocks). Gains: machine-readable TAP output, `--test-reporter` plugin chain, parallel execution via `--test-concurrency`, watch mode via `--watch`.

## §2 Python-SDK patterns for `harness/local_model_otel_wrapper.py` + `harness/eval_harness.py`

| Pattern | anthropic-sdk-python idiom | Our wrapper status | Adopt? |
|---|---|---|---|
| `with client.messages.stream(...) as stream:` context-managed streaming | ✓ canonical pattern | ✓ wrapper uses `@contextmanager` for `track_local_completion` | HOLD (aligned) |
| `async with` for async streaming | ✓ `AsyncAnthropic` | ✗ wrapper is sync-only | **HIGH** — add `async_track_local_completion` + `async_wrap_openai_client` for harness eval lanes that use `AsyncOpenAI` |
| `beta.messages.tool_runner()` automatic multi-turn tool execution | ✓ `BetaAsyncToolRunner` | n/a (wrapper is single-call) | LOW (separate concern) |
| PEP 604 `X \| Y` union syntax | ✓ pervasive | ✗ wrapper uses `Optional[X]` | **MED** — refactor `Optional[str]` → `str \| None` (Python 3.10+ in venv; W319-1 confirmed 3.14) |
| `cache_control` ephemeral | ✓ `CacheControlEphemeralParam` | n/a (local models don't expose) | n/a |
| `from __future__ import annotations` | ✓ standard | ✓ already | HOLD |
| `jiter` streaming JSON parsing | SDK dep | n/a | SKIP |

**Top win**: add async variants `async_track_local_completion` + `async_wrap_async_openai_client` so eval-harness async lanes (per `harness/eval_harness.py` Agent-SDK pattern) emit OTel spans without sync-blocking the event loop.

## §3 PowerShell 7 modernization for `tools/eee.ps1` + `tools/w317-cleanup-z-phantom.ps1`

W318-S2 + W320 P5 already audited (16 HIGH × 12 .ps1; `Set-StrictMode` + `-LiteralPath` + try/catch + `Join-Path $env:ProgramFiles`). No new Anthropic SDK guidance applies (no PowerShell SDK). Defer to W320 P5 bash-pro dispatch. ALREADY-QUEUED.

## §4 Agent-SDK MCP-server opportunity — **YES, wire harness-as-MCP-server**

deepwiki on `anthropics/claude-agent-sdk-typescript`:
- `query()` is unified entrypoint (replaces deprecated V2)
- `createSdkMcpServer` / `sdkMcpServers` Options field for in-process MCP
- `permission_policy` per-tool allow/deny
- Auto-reconnect for proxied MCP servers

**Proposal**: wire `harness/eval_harness.py` aggregation primitives (`aggregate_eval_results`, `advisor_pilot_stub`) as an in-process MCP server via the Agent-SDK pattern. Currently the harness only runs as a CLI subprocess. As MCP, eval results would be queryable mid-session by the orchestrator without round-tripping through stdout-JSON.

Integration boundary:
- `harness/eval_harness_mcp.py` (NEW, ~150 LOC): wraps `aggregate_eval_results` + judge primitives as MCP tools
- `.mcp.json` adds `eval-harness` entry: `{ command: "uvx", args: ["--from", "Z:/claude-sota-installed/harness", "eval-harness-mcp"] }`
- Skill `dspy-integration` can call eval-harness MCP tools to score DSPy MIPROv2 candidates

## §Top-3 modernization wins (ranked)

1. **`async_track_local_completion` + async wrapper** — unblocks Anthropic Python SDK async-streaming pattern adoption (P5 of W322 goal cited DSPy stacked-optimizer; async path needed for parallel judge fan-out)
2. **`node:test` migration for `test-msys-norm.mjs`** — TAP output + watch mode + parallel test execution; idempotent (current 42/42 PASS contract preserved)
3. **`harness/eval_harness_mcp.py`** — exposes eval primitives as MCP tools per Agent-SDK `createSdkMcpServer` pattern; closes the orchestrator ↔ harness async gap

## Verdict on harness-as-MCP-server: **YES — wire as Phase-2 of P5 (DSPy stacked-optimizer)**

Single Agent-SDK `createSdkMcpServer` call exposes 3 tools (`run_inspect_lane`, `run_promptfoo_lane`, `aggregate_eval_results`) as in-process MCP. Plus `harness/local_model_otel_wrapper.py` becomes the OTel-tracing layer that wraps every tool call. This is the SOTA composition pattern from claude-agent-sdk-typescript per deepwiki: tools + MCP + Skills layered.

## Report-back (3 sentences)

Top-3 modernization wins: (1) add `async_track_local_completion` + async client wrapper to `harness/local_model_otel_wrapper.py` for Anthropic-SDK-aligned async streaming; (2) migrate `tools/test-msys-norm.mjs:main()` to `node:test` built-in runner for TAP/watch/parallel-concurrency; (3) wire `harness/eval_harness.py` aggregate + judge primitives as in-process MCP server via Agent-SDK `createSdkMcpServer` pattern. **YES — wire harness-as-MCP-server** as Phase-2 of W322 P5 (DSPy stacked-optimizer); single `createSdkMcpServer` call exposes eval-lane tools to the orchestrator without stdout-JSON round-trip, and pairs cleanly with the OTel wrapper as tracing layer. PowerShell modernization deferred to W320 P5 bash-pro queue (already-staged).