---
name: prompt-caching-discipline
description: Use when assembling LLM prompts >=1024 tokens; when designing agent system prompts; when implementing prompt-cache headers; or when reviewing token-cost on a multi-turn LLM workflow.
---

# prompt-caching-discipline

Operator-curated R4(b) skill: enforces the `cache_control` + `anthropic-beta: prompt-caching-2024-07-31` pattern on Claude API calls so multi-turn agent loops, large-system-prompt evaluators, and long-context-document workflows do not pay full input-token rates on every turn.

Cite-anchors:
- Anthropic claude-cookbooks @ `39a350b6790c132337dcc3ec35240728fcc1dc0e` `misc/prompt_caching.ipynb` (MIT) — canonical 5-block end-to-end demo of single + multi-block caching.
- Anthropic docs: `https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching` — TIER-1 official semantics (min-tokens, TTL, breakpoint cardinality, beta header).
- Vercel AI SDK `https://ai-sdk.dev/docs/ai-sdk-core/prompt-caching` — third-party convergence on the same `cache_control` shape.

## When to invoke

Fires on description-match for these signals:

- The prompt being assembled exceeds **1024 tokens** (Sonnet/Opus minimum cacheable size; Haiku is 2048).
- A multi-turn agent loop will re-send the same system-prompt + tool-definitions on every turn (eval harness, codex-review subprocess, agent-teams teammates).
- A long document (>4 KB) is being read into context and the same document will be queried multiple times.
- Operator asks to **reduce token cost**, **add cache headers**, **enable prompt caching**, or reviews `total_cost_usd` per-invocation overhead.
- Code review touches `client.messages.create(...)` with no `cache_control` block on a >=1024-token system or user-block.

## When NOT to invoke

- One-shot single-turn calls under 1024 tokens (no break-even).
- Streaming user-input that varies every turn (caching the variable part defeats the purpose; see anti-patterns).
- Provider-neutral / OpenAI-SDK code paths (this skill targets `anthropic` SDK only; OpenAI has separate caching primitives).
- Code generation / refactor tasks without LLM API surface.

## The pattern

```python
import anthropic

client = anthropic.Anthropic(
    default_headers={"anthropic-beta": "prompt-caching-2024-07-31"},
)

resp = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    system=[
        {
            "type": "text",
            "text": LARGE_STATIC_INSTRUCTION_BLOCK,           # >=1024 tokens
            "cache_control": {"type": "ephemeral"},           # 5-min TTL
        },
        {
            "type": "text",
            "text": LARGE_STATIC_TOOL_CATALOG,                # >=1024 tokens
            "cache_control": {"type": "ephemeral"},
        },
    ],
    messages=[
        {"role": "user", "content": user_turn_text},          # NEVER cache user-input
    ],
)
# Inspect cache hit-rate in the response:
# resp.usage.cache_creation_input_tokens   -> tokens written to cache on this call
# resp.usage.cache_read_input_tokens       -> tokens served from cache (10% of full rate)
```

Key contract points:

1. **`cache_control` markers** sit on the message-block, not on the request. Up to **4 breakpoints per request** (Anthropic limit).
2. **Beta header `anthropic-beta: prompt-caching-2024-07-31`** is required while the feature is in beta. The anthropic SDK accepts it via `default_headers=`.
3. **Cache writes cost 1.25x** input-token rate; **cache reads cost 0.10x**. Break-even is ~2 reads.
4. **TTL is 5 minutes** of inactivity (`ephemeral`). Persistent multi-hour caching requires the 1h-TTL variant when GA.
5. **Cache key = full prefix exact-byte match.** Any byte-drift upstream of the marker invalidates the suffix cache.

## In-harness canonical example

The runtime's `harness/eval_harness.py` `run_inspect_lane()` and `harness/sota_rubric_lane.py` smoke-test path are the on-disk reference for this pattern in this workspace. The new `harness/batch_lane.py` companion (W343-A10 vendor-adapt) consumes the Message Batches API for offline cost-reduction; combining batch-API (~50% off) with prompt-caching (10x read discount on the system block) is the recommended SOTA stack for nightly evaluator cadence.

## Anti-patterns

1. **Caching user-input.** User turns vary; marking them `cache_control` writes a fresh cache entry every call and pays the 1.25x write premium with zero read benefit.
2. **Caching low-volatility static text WITHOUT a cache_control marker.** A 4 KB system block sent on every turn with no `cache_control` pays 1.0x input on every turn — adding the marker yields 10x cost reduction for ~zero risk.
3. **Exceeding 4 breakpoints per request.** Anthropic rejects with 400; consolidate small blocks into one cached prefix.
4. **Cache-byte drift from invisible trailing whitespace / line-ending differences.** Normalize the cached prefix (LF endings, no trailing spaces) before sending; one differing byte invalidates the suffix.
5. **Caching tool-definitions that change every wave.** If the tool catalog mutates per request (e.g. dynamic MCP-server fan-in), do not cache it; cache only the stable subset.

## Cardinal-rule conformance

- **R1 (trusted primitives)**: skill body derived from Anthropic-owned `claude-cookbooks` repo @ pinned SHA `39a350b6790c132337dcc3ec35240728fcc1dc0e` (MIT). Trust-tuple: maintainer-identity = Anthropic; license = MIT; freshness = pinned-SHA; blast-radius = doc-only.
- **R2 (no project-owned hook bodies)**: declarative SKILL.md prose — no `.claude/hooks/**` body shipped.
- **R3 (installed-plugin subagents)**: skill is inline-only; spawns no subagents.
- **R4 (operator-curated path-gated)**: SKILL.md under `.claude/skills/` per `https://code.claude.com/docs/en/skills`; description has 4 distinct triggers (<=8 axis-1-#6 ceiling) with no >50% sibling-trigger overlap.
- **R5 (safety via permissions)**: skill reads no files and spawns no processes; no permission surface.
- **R6 (verify-before-claim)**: cache hit-rate verification command on every change — `resp.usage.cache_read_input_tokens > 0` is the on-API proof; CI evidence path = `harness/batch_lane.py --mode demo` exit 0.

## Verification

```bash
# Functional verification (writes to cache on first call, reads on second):
python -c "
import anthropic, os
c = anthropic.Anthropic(default_headers={'anthropic-beta':'prompt-caching-2024-07-31'})
sys_block = 'You are an evaluator. ' + ('Long static instructions. ' * 200)
for i in range(2):
    r = c.messages.create(model='claude-sonnet-4-6', max_tokens=32,
        system=[{'type':'text','text':sys_block,'cache_control':{'type':'ephemeral'}}],
        messages=[{'role':'user','content':f'turn {i}'}])
    print(f'turn{i} cache_write={r.usage.cache_creation_input_tokens} cache_read={r.usage.cache_read_input_tokens}')
"
# Expect: turn0 cache_write>0 cache_read=0 ; turn1 cache_write=0 cache_read>0
```
