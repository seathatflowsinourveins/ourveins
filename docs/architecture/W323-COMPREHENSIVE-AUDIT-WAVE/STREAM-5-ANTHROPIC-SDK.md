# W323 Stream-5 — Anthropic SDK + Agent SDK + Skill-format SOTA deep dive

**Date**: 2026-05-19
**Methodology**: NARROWED per W322 P6 root-cause (no repomix-pack). 4× `mcp__deepwiki__ask_question` + 1× `Read` on `harness/eval_harness.py`. Total ~6K tokens, ~30s wall.
**Sources**: `anthropics/anthropic-sdk-typescript`, `anthropics/anthropic-sdk-python`, `anthropics/claude-agent-sdk-typescript`, `anthropics/skills`. WebFetch skipped (context-mode hook would block; not blocking for this scope — deepwiki sufficient).

## §1 SDK-pattern gaps (anthropic-sdk-{ts,py})

| Pattern | Upstream SOTA | Current harness use | Gap impact |
|---|---|---|---|
| **Batch API** (`client.messages.batches.create`) | Up to 24h async processing; cheaper per-token; `custom_id` per request | Not used in `harness/eval_harness.py` (synchronous per-request) | **HIGH** — nightly eval cadence (inspect_ai + promptfoo) could batch all rows; cuts ~50% cost on async tolerable workloads |
| **1-hour prompt caching** (`cache_control: { type: 'ephemeral', ttl: '1h' }` + beta `extended-cache-ttl-2025-04-11`) | Standard 5-min default; 1h via beta flag (already set in `.claude/settings.json:env.ENABLE_PROMPT_CACHING_1H=1` for CC) | Not explicitly leveraged in harness Python SDK calls (CC binary uses it; harness inspect_ai lane doesn't pass `betas=['extended-cache-ttl-2025-04-11']`) | **HIGH** — repeated nightly eval system prompts re-ingest every run |
| **Structured outputs (beta)** (`output_config: { format: { type: 'json_object', json_schema: {...} } }` + beta `structured-outputs-2025-12-15`) | Schema-enforced JSON output | Harness uses prompt-engineering for JSON eval rows; no JSON schema enforcement | **MEDIUM** — schema-enforced eval rows eliminate post-parse retries |
| **Files API** (`client.beta.files.upload/list/download/delete`) | Persistent server-side file refs; reuse across requests | Not used | **MEDIUM** — large research-context loads (`Z:/repos/deps/` ingestion) could persist as files instead of re-uploading per call |
| **Context management beta** (`context_management` + beta `context-management-2025-06-27`) | Auto-clear function results / thinking blocks across requests | Not used | **LOW-MEDIUM** — manual stewardship today; auto-clear at protocol layer would simplify |
| **Async + streaming** (`AsyncAnthropic` + `async with client.beta.messages.stream`) | Native asyncio | Harness uses `asyncio` already ✓ | None |
| **Extended thinking** (`thinking: { type: 'enabled', budget_tokens: 1024, display: 'summarized' }` or `'adaptive'`) | First-class CoT with budget control | CC binary uses native thinking (`alwaysThinkingEnabled:true`); harness inspect_ai lane doesn't expose thinking budget explicitly | **LOW** — sub-optimal for eval-tasks needing visible reasoning trace |

## §2 Agent SDK feature gaps (claude-agent-sdk-typescript)

Deepwiki had limited Agent SDK detail (changelog-only context). Confirmed surfaces + gaps:

| Feature | Upstream | Current use | Gap impact |
|---|---|---|---|
| `query()` entry + `ClaudeAgentOptions` | ✓ | `harness/eval_harness.py` uses `query`, `tool`, `create_sdk_mcp_server` via Python SDK 0.1.81 ✓ | None |
| Hooks (`PreToolUse`, `PostToolUse`, `PermissionRequest`, `ConfigChange`) | First-class | Settings.json hooks used; SDK-level hooks unused | **MEDIUM** — SDK hooks could replace some bash-c PostToolUse glue with native code |
| `sdkMcpServers` + `reconnectMcpServer` + `toggleMcpServer` | First-class | Not used (we wire MCP via `.mcp.json`) | **LOW** — `.mcp.json` works; SDK MCP server creation useful for inline custom servers per W319-3 OTel local-cost wrapper but operator-side wiring already shipped |
| `SessionStore` interface (session persistence) | ✓ | Not used (we use JSONL files for transcripts) | **LOW-MEDIUM** — SDK persistence could replace ad-hoc state files |
| `startup()` pre-warming | ✓ | Not used | **LOW** — faster initialization for harness invocations |
| Skills system (granular capability control) | ✓ | We use CC plugin-loaded skills + `.claude/skills/` (31 skills) | **No gap** |
| Subagent management + background tasks | ✓ | CC native subagents + Agent tool + `claude --bg` cover this | **No gap** |

**Agent SDK fit verdict**: Use as harness primitive (already done) + custom MCP server creation for inline tools (e.g., W319-3 OTel wrapper). NOT a replacement for CC's agent-teams plugin — that's a different orchestration layer.

## §3 Skill-format conformance check (`.claude/skills/` × 31 vs `anthropics/skills` canon)

**Canonical (anthropics/skills)**:
- Required: `name` (kebab-case, ≤64 chars), `description` (≤1024 chars, "pushy" — what + WHEN to use)
- Optional: `license`, `compatibility`, `allowed-tools` (CC-specific)
- Body: ≤500 lines; 3-tier progressive disclosure (metadata always-in-context ~100 words → SKILL.md body when triggered → bundled `scripts/references/assets/` loaded as needed)
- Anti-patterns: "This skill does..." (use imperative "Use when..."), overfitting to specific queries, descriptions >1024 chars, body >500 lines without ToC

**Local 31 skills** (sample — full conformance audit deferred to dedicated sub-stream):
- W315 vendor-forks (mattpocock × 4, addyosmani × 5) — high conformance per upstream-vendor
- Operator-curated (mem-recall, goal-prompt-synthesis, sota-convergence-audit, parallel-dispatch-mandate, durable-planning-files, dspy-integration) — likely conformance; needs verification
- **Spot-check observation**: `goal-prompt-synthesis/SKILL.md` body is substantially >500 lines per visible content; consider hierarchy + bundled-resources refactor per anthropics anti-pattern guidance

**Conformance gap impact**: **MEDIUM** — body-length overruns weaken progressive-disclosure preload-efficiency mandate (CLAUDE.md cardinal-rule preload-budget); not a correctness issue but anti-SOTA per skill canonical.

## §4 Prompt-caching strategy gaps

`.claude/settings.json:env.ENABLE_PROMPT_CACHING_1H=1` is set for CC binary use. Gaps:

| Layer | Current | Recommended |
|---|---|---|
| CC binary calls | 1h cache ✓ | KEEP |
| `harness/eval_harness.py` inspect_ai lane | No explicit `betas=['extended-cache-ttl-2025-04-11']` | ADD beta flag + `cache_control` on system prompts |
| harness/eval_harness.py promptfoo lane | promptfoo handles caching its own way | Verify with `promptfoo eval --cache` flag |
| codex round-1/2 cross-model gate | N/A — OpenAI side | OpenAI prompt caching is automatic when prefix-stable; ensure codex-companion uses stable prefix |
| MCP server invocations | Implicit (CC-level) | OK |
| Pre-warm pattern (`max_tokens=0`) | Not used | LOW-priority — useful for first-run latency on rarely-used skill descriptions; defer |

## §5 Skill-creator meta + canonical patterns

Anthropics ships `skill-creator/SKILL.md` as meta-skill. Local equivalent: none in `.claude/skills/` (we have `writing-skills` via superpowers plugin). **Gap**: no project-curated skill-creator skill aligned to **OUR** anti-pattern set (e.g., the 4-cardinal-rule discipline, the ≤2KB shim limit). DEFER to W324 vendor-fork-6.

## Report-back (3 sentences)

Top-3 SDK adopt-now (HIGH impact, low-effort): (1) **1-hour prompt caching beta** (`extended-cache-ttl-2025-04-11`) in `harness/eval_harness.py` inspect_ai lane — system prompts repeat nightly; (2) **Batch API** for nightly eval cadence — cuts ~50% cost on async-tolerable workloads; (3) **Structured outputs beta** (`structured-outputs-2025-12-15`) for eval-row schema enforcement. Agent SDK fit verdict: harness already uses it correctly via `claude_agent_sdk==0.1.81` (query, tool, create_sdk_mcp_server) — NOT a wholesale CC agent-teams replacement but the right primitive for harness flows + custom inline MCP servers like the W319-3 OTel local-cost-tracking wrapper. Skill-format conformance: most vendored skills likely SOTA but operator-curated body-lengths (e.g., goal-prompt-synthesis) exceed anthropics' ≤500-line preload-budget canon — refactor via bundled-resources hierarchy queued W324.

## Out-of-scope flag (one sentence)

Did not run WebFetch on `docs.anthropic.com/en/docs/build-with-claude/extended-thinking` — context-mode hook would block; deepwiki coverage on thinking API was sufficient for this stream's depth. Codex GPT-5.5 cross-model gate on these SDK-gap claims should fire in parent's W323 synthesis pass.
