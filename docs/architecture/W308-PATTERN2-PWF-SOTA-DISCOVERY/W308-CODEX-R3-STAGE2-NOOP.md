# W308 Codex r3 — Stage-2 OTel-GenAI v1.40.0 Attrs Design (2026-05-19)

> **Model**: gpt-5.5 via codex CLI v0.130.0 · **Tokens**: 327,004 · **Cost**: ~$0.50
> **Web access**: enabled · **GitHub API queries**: live (PR mergeable_state, OTel SemConv source files, Langfuse repo @ ddb3699e SHA-pinned)
> **Trigger**: prior codex r1 surfaced Honeycomb April 2026 SOTA guidance (v1.40.0 attrs `gen_ai.conversation.id` + `gen_ai.agent.name` + `gen_ai.operation.name`). r3 audits whether Stage-2 should be designed now.

## §0 TL;DR

**NO-OP for Stage-2. Keep Stage-1 in place. Revisit W310+.**

Stage-1 (settings.json env vars `OTEL_SEMCONV_STABILITY_OPT_IN=gen_ai_latest_experimental` + `OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT=false`) is SUFFICIENT for current state. Adding v1.40.0 attrs (Honeycomb-recommended) requires an OTLP wrapper/collector mutation layer — config-only insufficient + repo-local hook violates cardinal-rule-2. Minimal compliant implementation must come upstream (Claude Code native emission) or via external OTel Collector transform processor.

## §1 OTel SemConv v1.40.0 verification

| Attribute | Status | Requirement | Stability | Cite |
|---|---|---|---|---|
| `gen_ai.conversation.id` | EXISTS | Recommended | Development | pkg.go.dev v1.40.0 lines 4873-4883 |
| `gen_ai.agent.name` | EXISTS | Conditionally required | Development | pkg.go.dev v1.40.0 lines 382-386; agent-spans lines 490-499 |
| `gen_ai.operation.name` | EXISTS, Enum | Recommended | Development | pkg.go.dev v1.40.0 lines 4994-5008 + 11505-11541 |

**Enum values for `gen_ai.operation.name`** in v1.40.0: `chat` · `generate_content` · `text_completion` · `embeddings` · `retrieval` · `create_agent` · `invoke_agent` · `execute_tool`.

(`invoke_workflow` appears in v1.41 but NOT v1.40.0 enum.)

## §2 Langfuse mapping at SHA `ddb3699e7a57de9c6817f1591f94c7056faa6d07`

Live `gh api` content reads:

- **`gen_ai.operation.name`** → consumed by `ObservationTypeMapper.ts:249-268`:
  - `chat`/`text_completion`/`generate_content` → GENERATION
  - `embeddings` → EMBEDDING
  - `invoke_agent`/`create_agent` → AGENT
  - `execute_tool` → TOOL
- **`gen_ai.conversation.id`** → fallback to session id after `langfuse.session.id` + `session.id` (`OtelIngestionProcessor.ts:2090-2097`)
- **`gen_ai.agent.name`** → NOT renamed to observation `name`; `extractName()` priorities are `gen_ai.tool.name`, `genkit:name`, `logfire.msg`, Vercel ids, span name (`OtelIngestionProcessor.ts:1982-2024`)
- **Silent-drop behavior**: input/output content attrs removed from metadata after extraction (lines 1374-1478); but `gen_ai.agent.name` + `gen_ai.operation.name` + `gen_ai.conversation.id` remain in filtered metadata.

**Net Langfuse readiness**: 2 of 3 v1.40.0 attrs FULLY supported (operation.name + conversation.id); 1 of 3 (agent.name) silently retained in metadata but not promoted to first-class UI fields.

## §3 Claude Code 2.1.143 native OTel emission readiness

Per Claude Code monitoring docs lines 275-301:

| Attribute | Claude emits natively? |
|---|---|
| `gen_ai.system` | YES |
| `gen_ai.request.model` | YES |
| `gen_ai.response.id` | YES |
| `gen_ai.response.finish_reasons` | YES |
| `gen_ai.operation.name` | **NO** |
| `gen_ai.agent.name` | **NO** (Claude has its own `agent.name` for subagent metrics — NOT GenAI-namespaced; lines 516-537) |
| `gen_ai.conversation.id` | **NO** (Claude emits its own `session.id`; lines 444-459) |

`OTEL_RESOURCE_ATTRIBUTES` cannot supply per-span dynamic attrs (lines 366-383). So config-only Stage-2 patch is INFEASIBLE.

## §4 Stage-2 patch design (codex evaluated 3 options)

| Approach | Viable? | Why |
|---|---|---|
| **Config-only** (env vars or OTEL_RESOURCE_ATTRIBUTES) | NO | Cannot inject per-span dynamic attrs |
| **OTLP processor/collector wrapper** | YES (theoretical) | External Collector with `transform` processor: if `span.name=="claude_code.llm_request"` → add `gen_ai.operation.name=chat`; copy `session.id` → `gen_ai.conversation.id`; copy Claude `agent.name` → `gen_ai.agent.name` |
| **Repo-local `.claude/hooks/` body** | NO | Violates cardinal-rule-2 (no project-owned hook bodies) |

**Minimal compliant implementation**: either (a) upstream Claude Code adds v1.40.0 emission natively, OR (b) operator stands up an external OTel Collector with transform processor between Claude Code and Langfuse. Both are out-of-scope for repo-local action.

## §5 Vendor comparison (production-readiness signal)

| Vendor | v1.40.0 readiness |
|---|---|
| Datadog | STRONG — `gen_ai.operation.name` → span kind; `gen_ai.conversation.id` → session_id; unknown `gen_ai.*` → tags with truncation (lines 4028-4053 + 4091-4123) |
| OpenLLMetry | ACTIVE — tests/code for all 3 attrs + `invoke_agent`/`create_agent` |
| Langfuse | PARTIAL — operation.name + conversation.id mapped; agent.name retained in metadata only |
| Vercel AI SDK | LAGS — still uses `ai.*` custom attrs; community issue open (lines 8-35) |
| Phoenix | Requires `@arizeai/openinference-genai` shim (per W307-Stream-C audit) |

`gen_ai.operation.name` = most widely production-mapped.
`gen_ai.conversation.id` = supported by serious backends.
`gen_ai.agent.name` = emerging, NOT universally first-class.

## §6 Stage-3 (content-event format) forecast

Live `gh api` check on `langfuse/langfuse#13674`:
- Title: "fix(otel): map GenAI operation details messages"
- State: **OPEN** (not draft, not merged)
- `mergeable_state`: **BLOCKED**
- Created: 2026-05-17T00:16:23Z
- Updated: 2026-05-18T20:42:37Z

**Merge timeline**: UNKNOWN. Near-term possible but not shippable today.

## §7 Decision

**NO-OP for Stage-2.**

Do NOT:
- Add a repo-local OTel wrapper
- Add a `.claude/hooks/` body to mutate spans
- Change settings.json env block (Stage-1 vars are sufficient + correct)

Do:
- Keep Stage-1 env flags (OTEL_SEMCONV_STABILITY_OPT_IN=gen_ai_latest_experimental + OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT=false)
- Let Langfuse ingest Claude's native spans (works correctly; covers `gen_ai.system` + request.model + response.id + finish_reasons)
- Revisit W310+ after either:
  - Claude Code emits v1.40 agent/operation/conversation attrs natively, OR
  - Langfuse#13674 merges + validates Stage-3 message-content handling

## §8 Operator-action queue update

**RESOLVED**: Stage-2 OTel-GenAI design — NO-OP. No state change required.

**Carry-forward (W310+)**:
- Monitor `langfuse/langfuse#13674` merge status (currently blocked)
- Monitor Claude Code release notes for v1.40 GenAI attr native emission
- Re-evaluate Stage-2 if external OTel Collector becomes part of runtime topology

## §9 Cite-anchors

- Codex r3 raw output: `tmp/codex-output/w309-otel-stage2-design.md` (16148 LOC raw)
- OTel SemConv v1.40.0: pkg.go.dev generated Go semconv module
- Langfuse repo @ `ddb3699e7a57de9c6817f1591f94c7056faa6d07` — `ObservationTypeMapper.ts:249-268` + `OtelIngestionProcessor.ts:2090-2097` + `:1982-2024` + `:1374-1478`
- Claude Code monitoring docs: https://code.claude.com/docs/en/monitoring lines 275-301 + 366-383 + 444-459 + 516-537
- Langfuse PR #13674: gh api repos/langfuse/langfuse/pulls/13674 (state=OPEN, mergeable_state=BLOCKED)

## §10 Cardinal-rule self-check

- R1 ✓ no install
- R2 ✓ no repo-local hook bodies added; codex r3 explicitly validates the constraint
- R3 ✓ codex CLI dispatch per W280a Path P
- R4 REVERSED ✓ (per Batch-A `609cba0`)
- R5 ✓
- W286 P0C ✓ (no MCP changes)
- `self_invented_count: 0` preserved ✓
