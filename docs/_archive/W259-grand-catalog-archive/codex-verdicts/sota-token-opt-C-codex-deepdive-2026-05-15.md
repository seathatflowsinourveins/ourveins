# SOTA Token Optimization Deep-Dive for LLM Agent Harnesses

Date: 2026-05-15
Role: Codex adversarial review / alternative-hypothesis pass
Scope: advanced token optimization for Claude Code-style long-running agent harnesses

## Executive Verdict

[VERIFIED] The current frontier for agent-harness token efficiency is not one primitive. It is a four-layer stack:

1. Prompt-cache engineering: stable prefix layout, explicit/automatic `cache_control`, 5m vs 1h TTL selection, pre-warm, and cache-hit telemetry.
2. Context admission control: do not admit bulky MCP/tool/browser/log output unless the agent needs it; summarize/search/sandbox first.
3. Offline prompt/program optimization: DSPy/TextGrad-style optimization of reusable instructions, examples, and module behavior against task metrics.
4. Routing locality: keep a session, fork, or account on the same cache-bearing path long enough for provider-side TTLs to pay back.

[INFERRED] For this runtime, the highest-leverage next optimization is not always-on neural prompt compression. It is stricter cache-preserving harness discipline: fork subagents when they need parent context, keep fresh named subagents for isolated narrow tasks, preserve stable system/tool prefixes, avoid dynamic data before cache breakpoints, keep sticky account affinity aligned to Anthropic TTLs, and use compression only for recurring large non-cacheable payloads.

## Sources

- Anthropic / Claude prompt caching docs: https://code.claude.com/docs/en/prompt-caching and canonical redirect content at https://platform.claude.com/docs/en/build-with-claude/prompt-caching
- Claude Code subagents / fork docs: https://code.claude.com/docs/en/sub-agents
- Claude Code agent loop docs: https://code.claude.com/docs/en/agent-sdk/agent-loop
- Microsoft LLMLingua repo: https://github.com/microsoft/LLMLingua
- LLMLingua-2 project page: https://llmlingua.com/llmlingua2.html
- DSPy repo: https://github.com/stanfordnlp/dspy
- DSPy optimizer docs: https://dspy.ai/learn/optimization/optimizers/
- TextGrad repo: https://github.com/zou-group/textgrad
- Local runtime evidence: `tools/eee.ps1`, `tools/eee-status.ps1`, `.claude/settings.json`, `docs/eee-launch-design-cliproxyapi.md`

## Axis 1: Anthropic Prompt-Caching SOTA 2026

### Facts

[VERIFIED] Anthropic prompt caching resumes from cached prompt prefixes. The request is checked for an already-cached prefix; on hit, the cached representation reduces processing time and cost; on miss, the prefix is processed and cached once the response begins.

[VERIFIED] The default cache lifetime is 5 minutes. Cache entries are refreshed at no additional cost when used. Anthropic also offers a 1-hour TTL at a higher cache-write price.

[VERIFIED] Pricing multipliers in the current docs:

- 5-minute cache writes: 1.25x base input token price.
- 1-hour cache writes: 2x base input token price.
- Cache reads / refreshes: 0.1x base input token price.

[VERIFIED] Prompt caching covers the full prefix across `tools`, then `system`, then `messages`. This order matters because changes to earlier layers invalidate later layers.

[VERIFIED] Automatic caching can be enabled by adding top-level `cache_control: {"type": "ephemeral"}`. It places the breakpoint on the last eligible cacheable block and moves it forward as the conversation grows.

[VERIFIED] Explicit caching places `cache_control` on individual content blocks. It is the right tool for separating static and dynamic sections, caching different change-rate tiers, and avoiding automatic caching on a dynamic suffix.

[VERIFIED] The docs allow up to 4 cache breakpoints. Automatic caching consumes one of those slots when combined with explicit block-level breakpoints.

[VERIFIED] The provider's automatic prefix checking uses a 20-block lookback window per breakpoint. Cache writes happen only at marked breakpoints; reads look backward for entries written by previous requests. If a growing conversation moves more than 20 blocks past the last written breakpoint, the prior entry may not be found unless another breakpoint was added.

[VERIFIED] Model/platform minimum cacheable prompt lengths apply and short prefixes can silently skip caching. Current docs list 4,096 tokens for Claude Opus 4.7/4.6/4.5 and Claude Haiku 4.5, and 1,024 tokens for Sonnet 4.6/4.5 and some older Opus/Sonnet models. The right verification is usage fields: `cache_creation_input_tokens` and `cache_read_input_tokens`.

[VERIFIED] Cache performance fields:

- `cache_creation_input_tokens`: tokens written to cache.
- `cache_read_input_tokens`: tokens read from cache.
- `input_tokens`: uncached tokens after the last cache breakpoint.
- Total input tokens = cache read + cache creation + input.

[VERIFIED] Pre-warming is supported with `max_tokens: 0`. The docs explicitly advise placing the breakpoint on the last block shared with the follow-up request, not on the placeholder user message. The pre-warm request writes the cache and bills zero output tokens.

[VERIFIED] Prompt cache entries are isolated between organizations and, on the Claude API / Claude Platform on AWS / Microsoft Foundry beta, between workspaces. Cached KV representations and hashes are held in memory and not stored at rest.

### Cache Hit Maximization Pattern

[VERIFIED] Put stable content first:

1. Tool definitions.
2. System instructions.
3. Static repo/project context.
4. Few-shot examples or reusable documents.
5. Conversation history that grows append-only.
6. Dynamic request-specific suffix: timestamps, current prompt, volatile tool output.

[VERIFIED] Put explicit `cache_control` on the last stable block, not on the first dynamic block. The docs call this out as the common mistake: if a timestamp or user message is before the breakpoint, the cumulative prefix hash changes every request and the prior cache entry is useless.

[INFERRED] For agent harnesses, cache-prefix hygiene is more important than prompt length alone. Large contexts are acceptable when the prefix is stable and reused; short but volatile prefixes can be more expensive than longer cached prefixes.

[INFERRED] Multi-tier cache layout for long-running coding agents:

- Breakpoint A: tool definitions and MCP tool schemas that rarely change, TTL 1h if sessions have gaps.
- Breakpoint B: project/system instructions and AGENTS/CLAUDE context, TTL 1h if reused across long arcs.
- Breakpoint C: static task corpus or repo summary, TTL 5m if actively iterating; 1h if warmed at cadence.
- Breakpoint D: append-only conversation window, usually automatic 5m unless turns are sparse.

[INFERRED] Cache-aware loop rule: if the harness emits many small tool-result blocks per turn, checkpoint every <=20 blocks or coalesce low-value tool outputs. Otherwise, a growing conversation can outrun the 20-block lookback despite an otherwise stable prefix.

### Adversarial Notes

[VERIFIED] Automatic caching is convenient but not universally optimal. It can place the breakpoint on a dynamic last block, causing repeated writes and no reads.

[VERIFIED] Concurrent first requests do not see the cache until the first response begins. If parallel workers need the same prefix, seed one request first, then fan out.

[INFERRED] For coding harnesses, caching should be treated as a correctness-sensitive serialization contract. Reordering tools, changing tool descriptions, toggling web/citations/speed, injecting timestamps into system, or adding dynamic MCP server instructions before static context can destroy cache locality.

## Axis 2: LLMLingua-2 and Prompt Compression

### Facts

[VERIFIED] Microsoft LLMLingua is an MIT-licensed prompt compression series. The repo positions LLMLingua as using compact language models to remove non-essential prompt tokens, with up to 20x compression and minimal performance loss.

[VERIFIED] The repo includes `PromptCompressor`, installable via `pip install llmlingua`, with a basic API:

```python
from llmlingua import PromptCompressor
llm_lingua = PromptCompressor()
compressed = llm_lingua.compress_prompt(prompt, instruction="", question="", target_token=200)
```

[VERIFIED] LongLLMLingua targets long-context use cases and the "lost in the middle" problem. The repo states RAG performance improved up to 21.4% using one quarter of the tokens.

[VERIFIED] LLMLingua-2 reframes prompt compression as task-agnostic token classification. It uses data distillation from GPT-4 and a BERT-level encoder to improve faithfulness, out-of-domain handling, and speed. The repo claims 3x-6x faster performance than the original LLMLingua.

[VERIFIED] The LLMLingua repo's latest public news includes post-LLMLingua-2 adjacent work:

- MInference for long-context inference, reported as up to 10x faster prefill on A100 while maintaining accuracy in 1M-token prompts.
- RetrievalAttention for long-context inference via vector retrieval.
- SCBench, a KV-cache-centric analysis benchmark for long-context methods.
- SecurityLingua, a 2025 safety-aware prompt compression guardrail.

[VERIFIED] The LLMLingua-2 project page says its evaluations span in-domain and out-of-domain datasets, including in-context learning, summarization, conversation, multi-document QA, single-document QA, code, and synthetic tasks.

### Production Classification

[INFERRED] LLMLingua is production-plausible but not default-harness-safe. It is strongest when:

- The same large non-cacheable text must be passed repeatedly.
- Retrieval returns too much context and cannot be reduced structurally.
- The compressed artifact can be evaluated against task-specific quality metrics.
- Compression latency is amortized across many downstream calls.
- The input is natural-language/document-like rather than tool schemas, code diffs, or precise execution traces.

[INFERRED] LLMLingua is risky as always-on middleware for an agent harness because it can:

- Damage exact code, line numbers, stack traces, JSON, tool outputs, and security-relevant details.
- Break prompt-cache identity by rewriting the prefix differently per turn.
- Add local model load latency and GPU/CPU memory pressure.
- Introduce tokenizer/model supply-chain and `trust_remote_code` review concerns depending on model configuration.
- Increase downstream output tokens when the model compensates for lossy context.

[INFERRED] The right eee-style integration is an isolated sidecar, not default proxy middleware:

1. Collect large recurring non-cacheable payload classes.
2. Run A/B/C against raw, repomix/context-mode summary, and LLMLingua variants.
3. Measure total cost, wall-clock latency, output quality, and failure class.
4. Only promote if quality loss is bounded and cache-hit rate does not regress.

### Benchmarking Method

[INFERRED] Token-savings benchmarks must measure total system cost, not just input token compression:

- Compression ratio: original input tokens / compressed input tokens.
- End-to-end latency: compression latency + provider prefill + generation.
- Output inflation: compressed prompts can increase answer verbosity or repair behavior.
- Quality: exact-match, pass@k, semantic F1, groundedness, tool-call validity, code-test pass rate.
- Cache interaction: cache read/write tokens before and after compression.
- Failure audit: lost literals, changed numbers, dropped constraints, malformed structured data.

[INFERRED] In coding agents, use an allowlist:

- Good candidates: long prose docs, issue threads, meeting notes, repetitive research corpora, retrieved explanatory passages.
- Bad candidates: source patches, stack traces, shell output needed exactly, JSON/YAML/TOML configs, security policies, tool schemas, lockfiles, quoted user requirements.

### Adversarial Notes

[VERIFIED] LLMLingua-2 is real SOTA lineage, not vapor. It has peer-reviewed ACL 2024 backing and maintained repo/project references.

[INFERRED] It is not a replacement for Anthropic prompt caching. Compression reduces admitted tokens; caching reduces repeated-prefix processing cost. If compression rewrites a stable cached prefix, it can make the economics worse.

[INFERRED] For this runtime, LLMLingua belongs behind a "large non-cacheable payload" gate, not before every model call.

## Axis 3: DSPy and TextGrad Prompt Optimization Landscape

### DSPy

[VERIFIED] DSPy describes itself as a framework for programming, rather than prompting, foundation models. It supports modular AI systems and algorithms for optimizing prompts and weights.

[VERIFIED] DSPy optimizers tune program parameters, including prompts and/or LM weights, to maximize a user-specified metric. A typical optimizer takes a DSPy program, a metric, and a small training set.

[VERIFIED] DSPy optimizer categories include:

- Automatic few-shot learning: `LabeledFewShot`, `BootstrapFewShot`, `BootstrapFewShotWithRandomSearch`, `KNNFewShot`.
- Automatic instruction optimization: `COPRO`, `MIPROv2`, `SIMBA`, `GEPA`.
- Automatic finetuning: `BootstrapFinetune`.
- Program transformations: `Ensemble`.
- Meta-optimization: `BetterTogether`.

[VERIFIED] DSPy docs describe MIPROv2 as collecting traces of program behavior, filtering high-scoring traces, generating data-aware and demonstration-aware instructions, and using search/surrogate modeling over instruction/demo candidates.

[VERIFIED] DSPy docs describe GEPA as using LM reflection over program trajectories to identify what worked and what failed, then propose prompts addressing gaps. GEPA can also use domain-specific textual feedback.

[VERIFIED] DSPy docs state practical optimizer guidance: very few examples can start with `BootstrapFewShot`; 50+ examples can use random search; 40+ trials and ~200 examples are advised for more robust MIPROv2 to reduce overfitting risk.

[VERIFIED] DSPy docs include agent and RAG examples where optimizer runs improve measured scores, including an informal ReAct example from 24% to 51% and a RAG example from 53% to 61%.

### TextGrad

[VERIFIED] TextGrad implements "automatic differentiation via text": LLMs backpropagate textual gradients through variables. The repo says it is published in Nature.

[VERIFIED] TextGrad supports prompt optimization in a PyTorch-like style: define a trainable system prompt variable, evaluate a model output against a loss/eval function, call backward, then update with `TGD`.

[VERIFIED] The repo example uses GPT-4o as the backward/feedback engine to optimize a system prompt for a weaker forward model on a BBH object-counting task.

### Claude Applicability

[INFERRED] DSPy is more immediately production-applicable than TextGrad for agent harness prompt optimization because it natively models programs/modules/traces and supports optimizer persistence. It can optimize reusable subagent prompts, routing classifiers, RAG module prompts, and tool-use instructions against harness metrics.

[INFERRED] TextGrad is a strong research/prototyping layer when the prompt itself is a trainable parameter and textual feedback is valuable, but it is less obviously a turnkey agent-harness optimizer unless wrapped with eval datasets, safety constraints, and regression gates.

[INFERRED] Claude applicability is high at the API level but requires adapter discipline:

- Forward model can be Claude for task execution.
- Critic/backward model can be Claude, OpenAI, or another model, but cross-provider prompts must normalize output schemas.
- The optimization loop should run offline or pre-deploy, not inside every interactive agent turn.
- Optimized prompts must be inspected, pinned, versioned, and regression-tested before becoming system prompts.

### PROMST-Style Landscape

[INFERRED] The 2026 prompt-optimization landscape has converged around "pre-inference optimization budget" rather than manual prompt phrasing. DSPy MIPROv2/GEPA, TextGrad, ProTeGi-style textual gradients, and PROMST-like search all share the same operational shape:

1. Define a task metric.
2. Collect traces or examples.
3. Generate candidate instructions/demos.
4. Evaluate candidates.
5. Select, ensemble, or distill.
6. Freeze the winning prompt/program artifact.

[INFERRED] This is token optimization because better prompts can reduce retries, lower tool-call count, shorten required context, and make smaller/cheaper models viable. It is not primarily about shaving adjectives from prompts.

### Adversarial Notes

[INFERRED] Prompt optimizers can overfit and can generate verbose prompts that hurt cache footprint. The harness should score optimized prompts on:

- Accuracy or task success.
- Prompt length.
- Cache stability.
- Tool-call count.
- Retry rate.
- Failure severity.
- Human inspectability.

[INFERRED] Optimized prompts should be treated like code: diffed, reviewed, tested, and pinned. Letting an optimizer mutate live harness policy without review is unsafe.

## Axis 4: Fork-vs-Fresh Subagents and Sticky Account Affinity

### Official Fork Facts

[VERIFIED] Claude Code docs describe forked subagents as experimental and enabled with `CLAUDE_CODE_FORK_SUBAGENT=1`.

[VERIFIED] A fork inherits the conversation so far, including system prompt, tools, model, and message history. Its tool calls stay out of the parent conversation, and only the final result returns.

[VERIFIED] Claude Code docs distinguish fork vs named subagent:

- Fork: full conversation history, same system prompt/tools/model, prompt cache shared with main session.
- Named subagent: fresh context with its own definition, separate prompt cache.

[VERIFIED] The docs explicitly say a fork's first request reuses the parent's prompt cache because system prompt and tool definitions are identical.

[VERIFIED] Claude Code agent-loop docs state ordinary subagents start with a fresh conversation and load their own system prompt plus project-level context such as CLAUDE.md. The same docs note stable content like system prompt, tool definitions, and CLAUDE.md is automatically prompt cached.

### Local Runtime Facts

[VERIFIED] `.claude/settings.json` sets `CLAUDE_CODE_FORK_SUBAGENT=1`.

[VERIFIED] `.claude/settings.json` sets `ENABLE_PROMPT_CACHING_1H=1`.

[VERIFIED] `tools/eee.ps1` also sets `ENABLE_PROMPT_CACHING_1H=1` and documents the 1-hour prompt-cache TTL as a roughly 12x reuse window versus 5 minutes.

[VERIFIED] `tools/eee.ps1` documents chained routing:

`claude.exe -> cnighswonger:19801 -> CLIProxyAPI:18317 -> Anthropic`

[VERIFIED] The same local section documents seven cache-fix extensions, fill-first routing, 4h cache-affinity TTL, cache-control normalization, and cache telemetry.

[VERIFIED] `tools/eee-status.ps1` queries and prints routing strategy, `session_affinity`, and `session_affinity_ttl` from the CLIProxyAPI management endpoint.

[VERIFIED] `docs/eee-launch-design-cliproxyapi.md` documents `session-affinity: true` and `session-affinity-ttl: "1h"` as matching Anthropic 1h cache TTL, and states each subagent's session-affinity preserves its own prompt cache.

[VERIFIED] The context-mode plugin is enabled in `.claude/settings.json`, with installed plugin metadata pointing to `context-mode@context-mode`.

### Fork vs Fresh Decision Rule

[INFERRED] Use fork subagents when:

- The subtask needs the current parent context, design state, or long conversation history.
- The task is parallel exploration from the same starting point.
- Re-explaining context would exceed the cost of forking.
- Prompt-cache reuse matters more than input isolation.

[INFERRED] Use fresh named subagents when:

- The task is narrow and can be described in a compact prompt.
- The subagent needs a specialized tool set or MCP server that should not bloat the parent.
- Isolation matters more than cache sharing.
- The task has a stable reusable role prompt that can build its own cache over repeated calls.

[INFERRED] Use context-mode / large-output sandboxing when:

- The subtask needs to inspect huge logs, browser snapshots, JSON, CSV, or MCP outputs.
- Only a searched/summarized slice should enter the model context.
- Raw output would degrade cache locality or crowd the context window.

### Sticky Account Affinity

[INFERRED] Provider prompt caches are effectively locality-sensitive: cache entries are scoped by organization/workspace and by backend cache availability. Multi-account proxy routing adds another practical scope: if request N+1 lands on a different account, it cannot reuse the same account's provider cache.

[VERIFIED] This runtime has local routing surfaces for session affinity and TTL, and local docs explicitly align affinity TTL with Anthropic 1h cache TTL.

[INFERRED] Optimal harness routing:

1. Keep a conversation/session on the same account for at least the provider cache TTL.
2. Pin forked subagents to the parent account/session-affinity bucket when they rely on parent prefix cache.
3. Give fresh named subagents their own sticky bucket so their own system/tool prefix can warm.
4. Avoid round-robin at turn granularity for cache-sensitive traffic.
5. Fan out only after a warm barrier seeds the shared prefix.

[INFERRED] Per-account TTL persistence should track:

- Session id or conversation id.
- Account/auth file chosen.
- Cache tier requested: 5m or 1h.
- Last cache-read/write timestamp.
- Cacheable prefix fingerprint, if available without storing raw prompt.
- Expiry deadline and fallback route.

### Adversarial Notes

[INFERRED] Forking is not free. It inherits full context, so it can increase model attention burden and risk cross-task contamination. It is only cheaper when the inherited context is genuinely needed and cache reuse is available.

[INFERRED] Fresh subagents are not wasteful by default. They are better when the input can be made short and tool schemas can be scoped. A fresh agent with one narrow MCP server may beat a fork carrying the entire parent context.

[INFERRED] Sticky routing can conflict with quota balancing. The correct policy is not "always sticky"; it is "sticky until cache value is lower than quota/availability risk." When an account nears exhaustion, fail over deliberately and accept the cache miss rather than creating retry storms.

## Integrated Architecture Recommendation

### Tier 0: Measurement

[INFERRED] Add or preserve these metrics per model call:

- `input_tokens`, `cache_creation_input_tokens`, `cache_read_input_tokens`, `output_tokens`.
- cache hit rate = cache_read / (cache_read + cache_creation + uncached input).
- prefix tier hit/miss if visible.
- account/auth route.
- session-affinity key and TTL remaining.
- subagent mode: fork, fresh named, direct.
- MCP/tool schema count and token footprint.
- admitted large-output bytes/tokens.
- retries and tool-call count.

### Tier 1: Cache Layout Discipline

[INFERRED] Freeze all stable prefix layers:

- Tool schema order stable.
- System prompt stable.
- AGENTS/CLAUDE context stable.
- No timestamps or volatile environment state before the stable breakpoint.
- Dynamic reminders appended after cached prefix.
- Multi-breakpoint layout for >20-block conversations.

### Tier 2: Context Admission Control

[INFERRED] Before neural compression, reduce context at source:

- Prefer structured queries over raw file dumps.
- Use repo summaries and AST/search tools.
- Use context-mode for large output search/summarization.
- Keep exact artifacts on disk and cite file paths/line numbers instead of pasting full content.

### Tier 3: Compression Gate

[INFERRED] LLMLingua/LongLLMLingua/LLMLingua-2 should be gated by payload type:

- Enable for prose-heavy retrieved context after evaluation.
- Disable for exact code/config/tool/security artifacts.
- Compare against context-mode/repomix/manual summary baseline.
- Pin compressor model/version and record compression metadata.

### Tier 4: Offline Prompt Optimization

[INFERRED] Use DSPy/TextGrad offline to improve reusable prompts and reduce retries:

- Optimize subagent prompts, routing prompts, classifier prompts, RAG answer prompts.
- Score prompt quality and prompt length together.
- Reject optimized prompts that degrade cache stability or increase tool calls.
- Store optimized prompt artifacts in versioned plain text.

### Tier 5: Routing Locality

[INFERRED] Align subagent routing with cache economics:

- Fork for shared parent context and cache.
- Fresh for narrow specialized work.
- Sticky account affinity for cache-bearing sessions.
- Warm barrier before parallel fan-out.
- TTL-aware failover when quota pressure exceeds cache value.

## Final Verdict

[VERIFIED] Anthropic prompt caching is the most mature and immediately exploitable token optimization surface for Claude agent harnesses in May 2026.

[VERIFIED] LLMLingua-2 is credible SOTA prompt compression, but its safe production use is selective and benchmark-gated.

[VERIFIED] DSPy and TextGrad make prompt optimization systematic, but they belong in offline optimization/eval loops, not uncontrolled live prompt mutation.

[VERIFIED] Claude Code forked subagents now have an official cache-reuse rationale: they share the parent's prompt cache, while named subagents start fresh with separate cache.

[INFERRED] The winning design for this runtime is cache-first, compression-second, optimization-offline, routing-sticky. Do not compress stable prefixes that can be cached at 0.1x read cost. Do not fork narrow tasks that can be handled by fresh scoped agents. Do not round-robin cache-sensitive sessions. Do not admit large tool output just to compress it later.

VERDICT: CACHE-FIRST_STICKY-FORK_WHEN_SHARED_CONTEXT_SELECTIVE-LLMLINGUA_OFFLINE-DSPY-TEXTGRAD_APPROVE
