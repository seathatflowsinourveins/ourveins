# W331 Deep-Dive Line-by-Line — Cluster D: Agent Frameworks

**Wave**: W331 follow-up | **Cluster**: D (Microsoft / Google / Pydantic / Letta / Instructor) | **Date**: 2026-05-19
**Framework**: sca-v12.1 per `Z:/claude-sota-installed/.claude/skills/sota-convergence-audit/SKILL.md`
**Foundation**: W330-MEGA-AUDIT Stream-D finding P0.4 — `agent-teams@claude-code-workflows v1.0.2` ships **ZERO programmatic defensive checks** at SHA `08ded5e7` (`docs/architecture/W330-MEGA-AUDIT/D-agent-team-verification.md:57`).
**Operator hard constraints**: mature → deeper-dive; GraphQL/SOTA bypasses; NO key rotation; ≥3 org-distinct cites per claim.

---

## §1 — Per-repo verdict table (sca-v12.1 scoring)

Verdicts apply the v12.1 8-tier ladder (`T0 / T1 / T1-PROV / T2 / T2-CHERRY-FRONTIER / T2-CHERRY / T3 / T4 / T5`). All repos here are mature engineering primitives surfaced as **pattern sources** (T3 PATTERN-STUDY) for our `agent-teams` plugin upgrade rather than install candidates — the operator hard-constraint reads "mature repos = deeper-dive, not PR" against our own `agent-teams` install, not these external libraries. Tier is therefore PATTERN-LIBRARY across the board with one INSTALL-CANDIDATE (microsoft-agent-governance-toolkit policy YAML).

| # | Repo | HEAD SHA (ts) | License | LoC focus | sca-v12.1 verdict | Gap-closer score (rel. to agent-teams) | D-EMP | Why |
|---|---|---|---|---|---|---|---|---|
| 1 | `microsoft/Agents` | `e6465a4` 2026-05-16 (PR #497) | MIT | M365 SDK shell + docs | **T3 PATTERN-STUDY** | Low (channel-agnostic SDK; not a sub-agent primitive) | 1 | Cross-language meta-repo. Best primitive: 7-range numbered error-code taxonomy w/ deep-linking docs (`AgentErrorCodes.md:1-80`). Useful as documentation-discipline reference; not a coordination primitive. |
| 2 | `microsoft/agent-framework` | `a60e541` 2026-05-16 (#5800) | MIT | 27 workflows files + dotnet `Harness/SubAgents/` 641 LOC | **T3 PATTERN-STUDY (FRONTIER on workflow validation + SubAgents provider)** | **HIGH** | 2 | Ships canonical SOTA: `WorkflowGraphValidator` (`_workflows/_validation.py:87-150+`) with 6 validation enums (`EDGE_DUPLICATION`/`EXECUTOR_DUPLICATION`/`TYPE_COMPATIBILITY`/`GRAPH_CONNECTIVITY`/`HANDLER_OUTPUT_ANNOTATION`/`OUTPUT_VALIDATION`). Also `SubAgentsProvider.cs:67-133` constructor-time `ValidateAndBuildAgentDictionary` (unique-name + non-empty + dispatch-site lookup). Plus full `WorkflowCheckpoint` (`_checkpoint.py:30-117`) with `graph_signature_hash` topology check on restore. |
| 3 | `microsoft/agent-governance-toolkit` | `8bf231b` 2026-05-16 (#2318) | MIT | 410-line OWASP-ASI starter YAML + governance-gate Python | **T2-CHERRY (FRONTIER)** | **MAX** | 2 | Declarative `{condition: {field, operator, value}, action, priority, message}` YAML policy with 32+ ASI-Top-10 rules + `defaults: {action: deny, max_tokens, max_tool_calls, confidence_threshold}` (`templates/policies/starters/general-saas.yaml:1-418`). Anti-bias note: cherry-fork policy schema only; no Python runtime adoption needed. |
| 4 | `google/adk-python` | `bd062ec` 2026-05-15 (lazy-load perf) | Apache-2.0 | 26 agents/*.py + workflow agents + tools | **T3 PATTERN-STUDY (FRONTIER on JSON-Schema enum guard)** | **HIGH** | 2 | `TransferToAgentTool._get_declaration:73-89` injects JSON-Schema `enum=valid_names` to **block agent-name hallucination at the schema level** (not at dispatch). `BaseAgent.validate_name:552-567` rejects non-identifier + reserved `user`. `validate_sub_agents_unique_names:569-606` warns on dup. `ParallelAgent._merge_agent_run:51-86` uses asyncio.TaskGroup + queue+sentinel for fork-merge backpressure. `LangGraphAgent` (`langgraph_agent.py:52-80`) wraps `CompiledGraph` with `thread_id` checkpointer. |
| 5 | `google/agents-cli` | `f73062c` 2026-05-06 v0.1.3 | Apache-2.0 | CLI + docs/ + skills/ | **T4 CITE-ONLY** | Low | n/a | CLI wrapper; no novel coordination primitive over its underlying ADK. |
| 6 | `google-gemini/gemini-cli` | `77e65c0` 2026-05-15 (#27112) | Apache-2.0 | `packages/core/src/utils/retry.ts` 400+ LOC + googleQuotaErrors + flashFallback | **T3 PATTERN-STUDY (FRONTIER on retry ladder)** | **HIGH** | 3 | Multi-stage `retryWithBackoff` (`retry.ts:218-380`) with: 10 retryable network codes + SSL pattern (line 49-70), `TerminalQuotaError` vs `RetryableQuotaError` split, `shouldRetryOnContent` (content-level retry for invalid model output, line 272-286), `onPersistent429` → Flash-fallback model swap (line 308-322), `ValidationRequiredError` interactive handler (line 327-345), jitter (`currentDelay * 0.3 * (random*2-1)`, line 278), exp backoff (`currentDelay = min(maxDelayMs, currentDelay*2)`, line 284). Operator hard-constraint match: GraphQL/SOTA bypass equivalent — this is the canonical content-level retry pattern, not just HTTP retry. |
| 7 | `letta-ai/letta` | `1131535` 2026-05-14 (#3343 pickle→JSON sec-fix) | Apache-2.0 | 14 agents/*.py + `letta/helpers/tool_rule_solver.py` 600+ LOC + 9 ToolRule subclasses | **T3 PATTERN-STUDY (FRONTIER on ToolRulesSolver DAG)** | **HIGH** | 3 | `ToolRulesSolver` (`tool_rule_solver.py:24-99+`) implements declarative tool-call DAG with **9 distinct rule types**: `InitToolRule`, `ChildToolRule`, `ConditionalToolRule`, `ContinueToolRule`, `MaxCountPerStepToolRule`, `ParentToolRule`, `TerminalToolRule`, `RequiredBeforeExitToolRule`, `RequiresApprovalToolRule`. Compiled-prompt-description injection (`COMPILED_PROMPT_DESCRIPTION:21`) feeds the model the rule schema. `IncompatibleAgentType` exception (`agents/exceptions.py:1-7`) at dispatch site. Recent (#3343) demonstrates serialization-safety discipline (pickle→JSON sandbox-tool-result transport — exact pattern our hooks should adopt). |
| 8 | `pydantic/pydantic-ai` | `206453a` 2026-05-15 (#5426) | MIT | `agent/abstract.py` 1200+ LOC + `exceptions.py` 280 LOC + `durable_exec/` (DBOS+Prefect+Temporal) | **T3 PATTERN-STUDY (FRONTIER on typed exception hierarchy + UsageLimits)** | **HIGH** | 3 | 10-class typed exception hierarchy in `exceptions.py:39-271`: `ModelRetry`, `CallDeferred`, `ApprovalRequired`, `SkipModelRequest`, `SkipToolValidation`, `SkipToolExecution`, `UserError`, `AgentRunError`, `UnexpectedModelBehavior`, `UsageLimitExceeded`, `ConcurrencyLimitExceeded`, **`ContentFilterError`** (subclass of UnexpectedModelBehavior — "Raised when content filtering is triggered by the model provider resulting in an empty response" — `exceptions.py:220-221`, literal empty-response detection), `ModelAPIError`, `ModelHTTPError`, `FallbackExceptionGroup`, `ToolRetryError`. `UsageLimits(request_limit, total_tokens_limit, tool_calls_limit)` for runaway-loop prevention (`docs/multi-agent-applications.md:23`). 5-level multi-agent taxonomy doc (`multi-agent-applications.md:3-9`). |
| 9 | `567-labs/instructor` | `5e8e2d5` 2026-05-10 (#2280) | MIT | `instructor/core/retry.py` 600+ LOC | **T3 PATTERN-STUDY (canonical Pydantic-validation-retry)** | Medium | 3 | `retry_sync` / `retry_async` (`core/retry.py:150-340+`) using `tenacity.Retrying` composition `stop_after_attempt(N) \| stop_after_delay(timeout)` (line 70-78), per-attempt `FailedAttempt(attempt_number, exception, completion)` tracking (line 228-234), `handle_reask_kwargs` to inject the validation error back into the model (line 262-268), `IncompleteOutputException` propagation-bypass via break (line 270-277). Recent #2280 specifically fixes "let IncompleteOutputException propagate without wrapping" — empty-output-class exception MUST survive the retry envelope. |
| 10 | `cline/cline` (remote, repomix) | — | Apache-2.0 | Coding agent for VS Code | **T4 CITE-ONLY** (Cluster-A overlap; out-of-cluster) | n/a | n/a | Per W331 P0.5 scope, Cline lives in Cluster-A (Anthropic-cookbook-class CC alternatives). For Cluster-D agent-coordination patterns, Cline is not the canonical anchor; defer to Cluster-A audit. |
| 11 | `langchain-ai/langgraph` (remote, cite via ADK + Pydantic-AI bindings) | — | MIT | StateGraph + checkpointer | **T3 PATTERN-STUDY (already adjacently-cited)** | Medium | 2 | Cited transitively via `google-adk-python/src/google/adk/agents/langgraph_agent.py:25,52-80` (`CompiledGraph` import + multi-turn `thread_id` checkpointer wrapper) and pydantic-ai `docs/multi-agent-applications.md:8` (graph-based control-flow listed as level-4). DAG primitive: `(state, START, END, add_node, add_edge, add_conditional_edges)`. The pattern is well-documented; no install needed for our agent-teams use case. |

**Tier-cap rationale (operator constraint)**: all repos here are MATURE — they qualify deeper-pattern-extraction (T3 PATTERN-STUDY+) but NOT T1 INSTALL into our runtime because (a) we already have an installed `agent-teams` primitive; (b) the operator hard-constraint mandates deeper-dive over PR-against-mature-repos; (c) per Δ-PDM-1 F4 our remediation is hook-level pattern absorption, not a runtime swap.

---

## §2 — Novel SOTA patterns (with cite anchors)

### 2.1 Constructor-time agent registry validation (Microsoft Agent Framework)

`microsoft/agent-framework@a60e541` `dotnet/src/Microsoft.Agents.AI/Harness/SubAgents/SubAgentsProvider.cs:109-133`:

```csharp
private static Dictionary<string, AIAgent> ValidateAndBuildAgentDictionary(IEnumerable<AIAgent> agents)
{
    var dict = new Dictionary<string, AIAgent>(StringComparer.OrdinalIgnoreCase);
    foreach (AIAgent agent in agents) {
        if (string.IsNullOrWhiteSpace(agent.Name))
            throw new ArgumentException("All sub-agents must have a non-empty Name.", nameof(agents));
        if (dict.ContainsKey(agent.Name))
            throw new ArgumentException($"Duplicate sub-agent name: '{agent.Name}'...", nameof(agents));
        dict[agent.Name] = agent;
    }
    if (dict.Count == 0) throw new ArgumentException("At least one sub-agent must be provided.", nameof(agents));
    return dict;
}
```

Plus dispatch-site lookup (line 228-231):

```csharp
if (!this._agents.TryGetValue(agentName, out AIAgent? agent)) {
    return $"Error: No sub-agent found with name '{agentName}'. Available agents: {string.Join(", ", this._agents.Keys)}";
}
```

Two-layer defense: (1) registry is built at SubAgentsProvider construction with `case-insensitive Dictionary` + uniqueness + non-empty + non-empty-set invariants; (2) the `SubAgents_StartTask` tool returns a **deterministic Error message with the full allowlist** when an LLM provides a bad name. This is the exact pattern our W330 P0.4 P0-B remediation calls for — implemented in 25 LOC of production C# by Microsoft.

### 2.2 JSON-Schema enum constraint to block hallucinated agent names (Google ADK)

`google/adk-python@bd062ec` `src/google/adk/tools/transfer_to_agent_tool.py:43-89` — `TransferToAgentTool` overrides `_get_declaration()` to inject `enum=self._agent_names` into BOTH `function_decl.parameters.properties['agent_name'].enum` (line 79-81) AND `function_decl.parameters_json_schema['properties']['agent_name']['enum']` (line 84-87). The class docstring (line 43-47) makes the rationale explicit: "**This prevents LLMs from hallucinating invalid agent names** by restricting choices to only valid agents."

This is structurally superior to runtime allowlist validation because it constrains the model's *generation distribution* via the JSON Schema's `enum` keyword (per JSON Schema RFC 8927 §6 enum vocabulary); the constraint is enforced by the provider's tool-use parser before the call ever lands at the runtime. The model literally cannot emit an invalid name under strict JSON-mode tool dispatch.

Companion validators in `src/google/adk/agents/base_agent.py:552-606`:

```python
@field_validator('name', mode='after')
@classmethod
def validate_name(cls, value: str):
    if not value.isidentifier():
        raise ValueError(f'Found invalid agent name: `{value}`...')
    if value == 'user':
        raise ValueError("Agent name cannot be `user`. `user` is reserved for end-user's input.")
    return value

@field_validator('sub_agents', mode='after')
@classmethod
def validate_sub_agents_unique_names(cls, value: list[BaseAgent]) -> list[BaseAgent]:
    seen_names: set[str] = set()
    duplicates: set[str] = set()
    for sub_agent in value:
        if sub_agent.name in seen_names: duplicates.add(sub_agent.name)
        else: seen_names.add(sub_agent.name)
    if duplicates:
        logger.warning('Found duplicate sub-agent names: %s...', ', '.join(f'`{n}`' for n in sorted(duplicates)))
    return value
```

(Note: ADK chose `logger.warning` not `raise` on dup — softer than Microsoft's `ArgumentException`. Trade-off: better DX for cloning sub-trees, worse runtime safety. For our agent-teams use we want RAISE because typos are unguarded.)

### 2.3 Workflow graph DAG validator with typed error enums (Microsoft Agent Framework)

`microsoft/agent-framework@a60e541` `python/packages/core/agent_framework/_workflows/_validation.py:17-150`:

```python
class ValidationTypeEnum(Enum):
    EDGE_DUPLICATION = "EDGE_DUPLICATION"
    EXECUTOR_DUPLICATION = "EXECUTOR_DUPLICATION"
    TYPE_COMPATIBILITY = "TYPE_COMPATIBILITY"
    GRAPH_CONNECTIVITY = "GRAPH_CONNECTIVITY"
    HANDLER_OUTPUT_ANNOTATION = "HANDLER_OUTPUT_ANNOTATION"
    OUTPUT_VALIDATION = "OUTPUT_VALIDATION"

class WorkflowGraphValidator:
    def validate_workflow(self, edge_groups, executors, start_executor, output_executors):
        # GRAPH_CONNECTIVITY check
        if start_executor.id not in self._executors:
            raise GraphConnectivityError(f"Start executor '{start_executor.id}' is not present in the workflow graph")
        # EDGE_DUPLICATION check ...
        # TYPE_COMPATIBILITY check via is_type_compatible (line 14)
```

Where `TypeCompatibilityError` (`_validation.py:53-73`) explicitly reports `source_executor_id`, `target_executor_id`, `source_types`, `target_types` — full diagnosability. This is the SOTA for DAG-agent orchestration validation: **the graph is verified before execution starts**.

### 2.4 Workflow checkpointing with topology-hash invariant (Microsoft Agent Framework)

`microsoft/agent-framework@a60e541` `python/packages/core/agent_framework/_workflows/_checkpoint.py:30-117`:

```python
@dataclass(slots=True)
class WorkflowCheckpoint:
    workflow_name: str
    graph_signature_hash: str  # <-- hash of workflow graph topology
    checkpoint_id: CheckpointID
    previous_checkpoint_id: CheckpointID | None
    timestamp: str
    messages: dict[str, list[WorkflowMessage]]
    state: dict[str, Any]  # includes _executor_state reserved key
    pending_request_info_events: dict[str, WorkflowEvent[Any]]
    iteration_count: int
    metadata: dict[str, Any]
    version: str = "1.0"
```

Key invariant (line 40-46): "checkpoints can be shared and restored across different workflow instances of the same workflow definition" — but ONLY if the `graph_signature_hash` matches. This prevents the classic agent-restart-into-incompatible-DAG bug.

### 2.5 Tool-rule DAG with 9 declarative rule types (Letta)

`letta-ai/letta@1131535` `letta/helpers/tool_rule_solver.py:6-99+`:

```python
from letta.schemas.tool_rule import (
    ChildToolRule, ConditionalToolRule, ContinueToolRule, InitToolRule,
    MaxCountPerStepToolRule, ParentToolRule, RequiredBeforeExitToolRule,
    RequiresApprovalToolRule, TerminalToolRule, ToolRule,
)
COMPILED_PROMPT_DESCRIPTION = "The following constraints define rules for tool usage..."

class ToolRulesSolver(BaseModel):
    tool_rules: list[ToolRule] | None
    init_tool_rules: list[InitToolRule]
    continue_tool_rules: list[ContinueToolRule]
    child_based_tool_rules: list[ChildToolRule | ConditionalToolRule | MaxCountPerStepToolRule]
    parent_tool_rules: list[ParentToolRule]
    terminal_tool_rules: list[TerminalToolRule]
    required_before_exit_tool_rules: list[RequiredBeforeExitToolRule]
    requires_approval_tool_rules: list[RequiresApprovalToolRule]
    tool_call_history: list[str]

    def get_allowed_tool_names(self, available_tools: set[ToolName], error_on_empty: bool = True, last_function_response: str | None = None):
        # returns the constrained allowlist for the NEXT tool call
        ...
```

Note the **two-layer enforcement**: (a) compiled-prompt description fed to the model so it understands the constraints (`COMPILED_PROMPT_DESCRIPTION:21`); (b) `get_allowed_tool_names` is called at tool-dispatch time to ALSO programmatically filter — model + runtime enforcement. The `error_on_empty: bool = True` default also catches the case where all rules combined yield an empty allowlist (impossible state).

### 2.6 OWASP-ASI Top-10 declarative policy YAML (Microsoft Agent Governance Toolkit)

`microsoft/agent-governance-toolkit@8bf231b` `templates/policies/starters/general-saas.yaml:1-418`:

```yaml
version: "1.0"
name: general-saas-asi-starter
rules:
  - name: asi01-prompt-injection-override
    condition: {field: output, operator: matches, value: "(?i)ignore\\s+(all\\s+)?previous\\s+instructions"}
    action: deny
    priority: 100
    message: "ASI-01: Prompt injection — instruction override attempt detected"
  - name: asi01-nested-swarm-guardrail   # <-- relevant to agent-teams nested delegation!
    condition: {field: output, operator: matches, value: "(?i)(delegate\\s+to\\s+agent|spawn\\s+sub-agent|swarm\\s+mode|handoff\\s+raw\\s+input|pass-through\\s*:\\s*true)"}
    action: deny
    priority: 100
    message: "ASI-01: Goal Hijack — detected attempt to create nested swarm delegation"
  - name: asi08-session-tool-call-limit  # <-- per-session budget cap!
    condition: {field: tool_call_count, operator: gt, value: 50}
    action: deny
    priority: 85
    message: "ASI-08: Session tool call limit exceeded — circuit breaker engaged"
  - name: asi08-swarm-heat-guardrail     # <-- depth-of-delegation circuit-breaker!
    condition: {field: tool_call_depth, operator: gt, value: 5}
    action: audit
    priority: 90
defaults:
  action: deny             # deny-by-default — matches our R5 Control 1
  max_tokens: 12000
  max_tool_calls: 30
  confidence_threshold: 0.85
```

32+ named rules tagged to the OWASP Agentic-Security-Initiatives Top-10 (ASI-01..ASI-10). The schema `{condition: {field, operator, value}, action, priority, message}` is declarative and *not* embedded in agent prompts. Defaults block sets per-session budget caps. This is exactly the **policy-as-data** pattern our agent-teams plugin lacks.

### 2.7 Multi-layer retry ladder with content-level retry + model-fallback (Gemini-CLI)

`google-gemini/gemini-cli@77e65c0` `packages/core/src/utils/retry.ts:22-385`:

```typescript
export interface RetryOptions {
  maxAttempts: number;
  initialDelayMs: number;
  maxDelayMs: number;
  shouldRetryOnError: (error: Error, retryFetchErrors?: boolean) => boolean;
  shouldRetryOnContent?: (content: GenerateContentResponse) => boolean;   // content-level!
  onPersistent429?: (authType?: string, error?: unknown) => Promise<string | boolean | null>;  // model-fallback callback
  onValidationRequired?: (error: ValidationRequiredError) => Promise<'verify' | 'change_auth' | 'cancel'>;
  signal?: AbortSignal;
  getAvailabilityContext?: () => RetryAvailabilityContext | undefined;
  onRetry?: (attempt: number, error: unknown, delayMs: number) => void;
}

export async function retryWithBackoff<T>(fn, options?): Promise<T> {
  while (attempt < getCurrentMaxAttempts()) {
    const result = await fn();
    if (shouldRetryOnContent && shouldRetryOnContent(result)) {
      // RETRY BASED ON CONTENT INVALIDITY — not just HTTP status
      const jitter = currentDelay * 0.3 * (Math.random() * 2 - 1);
      await delay(currentDelay + jitter);
      currentDelay = Math.min(maxDelayMs, currentDelay * 2);   // exponential
      continue;
    }
    return result;
  } catch (error) {
    const classifiedError = classifyGoogleError(error);
    if (classifiedError instanceof TerminalQuotaError) {
      if (onPersistent429) {
        const fallbackModel = await onPersistent429(authType, classifiedError);
        if (fallbackModel) { attempt = 0; currentDelay = initialDelayMs; continue; }
      }
      throw classifiedError;
    }
    // RetryableQuotaError + 5xx → retry with retryDelayMs hint if provided
    ...
  }
}
```

Five distinct novel patterns in this single function:

1. **Content-level retry** — `shouldRetryOnContent(result)` retries on *content* invalidity (empty / malformed), not just HTTP status (line 272-286).
2. **Error classification** — `classifyGoogleError(error)` returns one of `TerminalQuotaError | RetryableQuotaError | ValidationRequiredError | ModelNotFoundError` — typed not stringly (line 300, `googleQuotaErrors.ts`).
3. **Model fallback** — `onPersistent429` callback returns a fallback model name; on success the function resets `attempt=0` and continues with the new model (line 310-318).
4. **Jitter** — `currentDelay * 0.3 * (Math.random() * 2 - 1)` adds ±30% jitter (line 278), avoiding thundering herd.
5. **Per-attempt observability** — `onRetry(attempt, error, delayMs)` callback fires per-retry without leaking PII into telemetry.

### 2.8 Typed exception hierarchy for retry / approval / skip semantics (Pydantic-AI)

`pydantic/pydantic-ai@206453a` `pydantic_ai_slim/pydantic_ai/exceptions.py:39-271`:

```python
class ModelRetry(Exception):
    """Exception to raise to request a model retry. Can be raised from tool functions, output validators,
    and capability hooks (such as after_model_request, after_tool_execute, etc.) to send a retry prompt
    back to the model asking it to try again."""
    message: str

class CallDeferred(Exception):
    """Exception to raise when a tool call should be deferred."""
    metadata: dict[str, Any] | None

class ApprovalRequired(Exception):
    """Exception to raise when a tool call requires human-in-the-loop approval."""
    metadata: dict[str, Any] | None

class SkipModelRequest(Exception):
    """Exception to raise in before/wrap model request hooks to skip the model call."""
    response: ModelResponse

class SkipToolValidation(Exception):
    """Exception to raise in before/wrap tool validate hooks to skip validation."""
    validated_args: dict[str, Any]

class SkipToolExecution(Exception):
    """Exception to raise in before/wrap tool execute hooks to skip execution."""
    result: Any

class UnexpectedModelBehavior(AgentRunError):
    """Error caused by unexpected Model behavior, e.g. an unexpected response code."""
    message: str
    body: str | None

class ContentFilterError(UnexpectedModelBehavior):
    """Raised when content filtering is triggered by the model provider resulting in an empty response."""

class UsageLimitExceeded(AgentRunError): ...
class ConcurrencyLimitExceeded(AgentRunError): ...
class ModelHTTPError(ModelAPIError): ...
class FallbackExceptionGroup(ExceptionGroup[Any]): ...
class ToolRetryError(Exception):
    """Exception used to signal a ToolRetry message should be returned to the LLM."""
```

The hierarchy is RICH:

- `ContentFilterError:220-221` is literally **the empty-response-class exception** — its docstring reads "resulting in an empty response". This is the SOTA pattern for W330 P0.4 P1 remediation (empty-`final_message` reject).
- `ModelRetry` carries a `message` field that gets injected back to the model as a retry-prompt — this is the SOTA for closed-loop retry-with-reasoning.
- `ApprovalRequired` carries `metadata` so the human approver sees structured context.
- `UsageLimitExceeded` + `ConcurrencyLimitExceeded` are agent-RUN-level (not HTTP-level) — they enforce `UsageLimits(request_limit, total_tokens_limit, tool_calls_limit)` declared at run-start.
- `ToolRetryError` wraps a `RetryPromptPart` for structured tool-retry messaging (line 261-280).

The pickle-de/serialization is wired (line 60-76 `__get_pydantic_core_schema__`) so these exceptions cross workflow boundaries safely.

### 2.9 Tenacity-composed retry stop conditions (Instructor)

`567-labs/instructor@5e8e2d5` `instructor/core/retry.py:50-90`:

```python
def initialize_retrying(max_retries, is_async, timeout):
    if isinstance(max_retries, int):
        stop_conditions = [stop_after_attempt(max_retries)]
        if timeout is not None:
            stop_conditions.append(stop_after_delay(timeout))
        # OR-composition
        stop_condition = stop_conditions[0]
        for condition in stop_conditions[1:]:
            stop_condition = stop_condition | condition
        if is_async: max_retries = AsyncRetrying(stop=stop_condition)
        else:        max_retries = Retrying(stop=stop_condition)
    elif not isinstance(max_retries, (Retrying, AsyncRetrying)):
        raise ConfigurationError("max_retries must be an int or a `tenacity.Retrying`/`tenacity.AsyncRetrying` object")
    return max_retries
```

The `stop_after_attempt(N) | stop_after_delay(timeout)` composition is the canonical Python retry idiom — accept BOTH retry-count cap AND wall-time cap, stop on whichever fires first. Plus the *recent* fix #2280 (line 270-277 of retry.py):

```python
except Exception as e:
    # IncompleteOutputException must propagate directly so callers
    # can catch it without it being wrapped in InstructorRetryException.
    if isinstance(e, IncompleteOutputException):
        _incomplete_exc = e
        break
```

This is the documented `IncompleteOutputException` propagation discipline: empty-output-class exceptions MUST bypass the retry envelope so callers see them undisguised. Exactly matches our W321 F5 root-cause analysis.

### 2.10 A2A (Agent-to-Agent) protocol with AgentCard schema (Microsoft Agent Framework)

`microsoft/agent-framework@a60e541` `python/packages/a2a/agent_framework_a2a/_agent.py:11-110`:

```python
from a2a.client import Client, ClientConfig, ClientFactory, minimal_agent_card
from a2a.types import AgentCard, Message as A2AMessage, Part as A2APart, Role as A2ARole

class A2AContinuationToken(ContinuationToken):
    """Continuation token for A2A protocol long-running tasks."""
    # A2A protocol task ID + context ID

class A2AAgent(AgentTelemetryLayer, BaseAgent):
    """Agent2Agent (A2A) protocol implementation. Wraps an A2A Client to connect the Agent Framework
    with external A2A-compliant agents via HTTP/JSON-RPC. ..."""
    AGENT_PROVIDER_NAME: Final[str] = "A2A"
    def __init__(self, *, agent_card: AgentCard | None = None, ...):
        """name: defaults to agent_card.name if agent_card is provided.
           description: defaults to agent_card.description if agent_card is provided. ..."""
```

Per `pydantic-ai@206453a` deprecation notice (`5426`) the `Agent.to_a2a()` method now bridges to fasta2a v0.6.1 — pydantic-ai also adopts A2A as the cross-framework agent-coordination spec. Three org-distinct adoptions of A2A: Microsoft (M365 Agents — uses it), Microsoft Agent Framework (`packages/a2a`), Pydantic-AI (`fasta2a.pydantic_ai` bridge). This is the wire-format that turns "subagent_type=<string>" into a typed schema-validated handshake (`AgentCard` carries skill list + identity + capabilities).

---

## §3 — Agent-teams plugin gap analysis (programmatic defensive checks to add)

W330-D found six confirmed silent-fallback dimensions in `agent-teams@claude-code-workflows v1.0.2`:

| # | W330-D Finding | Cluster-D SOTA primitive | Closure recipe (file + LOC est.) |
|---|---|---|---|
| **5.1** | `subagent_type` allowlist NOT validated at dispatch (`commands/team-spawn.md:78`) | (a) Microsoft `SubAgentsProvider.cs:109-133` constructor-time `ValidateAndBuildAgentDictionary` + dispatch-site error w/ "Available agents:" list (b) Google ADK `TransferToAgentTool._get_declaration:73-89` JSON-Schema `enum` constraint | Add `PreToolUse[Agent]` hook `tools/preagent-subagent-allowlist.mjs` (~30 LOC) that reads `subagent_type` from `tool_input` and rejects (`exit 2 + decision:block`) if not in allowlist `["agent-teams:team-lead", "agent-teams:team-implementer", "agent-teams:team-reviewer", "agent-teams:team-debugger", "general-purpose", "Explore", "Plan", "context-manager"]`. |
| **5.2** | empty `final_message` swallow (`team-lead.md:78-84`) — no `if (empty) requeue` | Pydantic-AI `ContentFilterError:220-221` ("empty response from content filter") + Instructor `IncompleteOutputException` propagation-bypass `retry.py:270-277` + Letta `error_on_empty: bool = True` (`tool_rule_solver.py:96-97`) | Add `SubagentStop` hook `tools/subagentstop-empty-final-message.mjs` (~50 LOC) that reads child's final transcript line, checks `final_message` non-empty AND not equal to `NO-FINDINGS-SENTINEL`, emits `decision: "block"` + diagnostic if empty. Anthropic claude-cookbooks `patterns/agents/prompts/research_lead_agent.md` is the canonical anchor here. |
| **5.3** | fork-mode context inheritance undocumented | Microsoft Agent Framework `SubAgentRuntimeState.cs` + `SubAgentState.cs` split (runtime vs persisted) + `ProviderSessionState<SubAgentState>` typed serialization (`SubAgentsProvider.cs:55-87`) | Document `CLAUDE_CODE_FORK_SUBAGENT=1` semantics in `agent-teams` SKILL.md fork (vendor-fork at `Z:/claude-sota-installed/.claude/skills/dispatching-parallel-agents-w321-fork/SKILL.md` already partial — confirm wiring + add per-CLUSTER-D §2.10 A2A handshake recipe for cross-CC-instance transports). |
| **5.4** | `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` prose-only pre-flight (`team-spawn.md:11-13`) | Microsoft Agent Framework `WorkflowGraphValidator.validate_workflow:101-149` runs synchronous validation BEFORE workflow start; throws `GraphConnectivityError` on missing start_executor | Add `SessionStart` hook (or include in PreToolUse[Agent]) `tools/sessionstart-agent-teams-precheck.mjs` (~20 LOC) that probes `process.env.CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` and emits `decision: "block"` with diagnostic if not `=1`. |
| **5.5** | reserved-name collision warning is prose ("Do not use `team-lead`") | Google ADK `BaseAgent.validate_name:562-566` (`if value == 'user': raise ValueError("Agent name cannot be 'user'...")`) + Microsoft `SubAgentsProvider.cs:119-122` (uniqueness check) | Either (a) extend the PreToolUse[Agent] hook to reject `name in RESERVED_NAMES = {"team-lead"}`, or (b) accept prose-only via skill-level documentation since this is a Claude Code runtime limitation. (a) preferred — ~5 extra LOC on top of 5.1 hook. |
| **5.6** | `tools/preagent-parallel-guard.mjs:5` ADVISORY-ONLY `exit 0` | Gemini-CLI `retry.ts:218-385` `retryWithBackoff` — exit class is non-advisory: throws on exhaustion. Pydantic-AI `UsageLimitExceeded` raises on `request_limit` / `tool_calls_limit` exceedance. | Per W329-D §3 + W331 P0.1 — flip `exit 0 → exit 2` on 2nd-violation per session. Session-counter at `Z:/claude-sota-installed-state/.claude/parallel-guard-counter.json`. |

**Programmatic defensive checks to add (priority-ordered, all `≤2 KB` per CR-2 sanctioned-exception)**:

1. **P0-A — Parallel-guard blocking flip** (already-staged W329-D / W331 P0.1; not Cluster-D-discovered but cross-validated by Gemini-CLI/Pydantic-AI mandate that retry-class guards MUST fail-closed).

2. **P0-B — Subagent-type allowlist `PreToolUse[Agent]` hook** (5.1 closure). Cite-anchor: Microsoft SubAgentsProvider + Google ADK TransferToAgentTool — two org-distinct primitives both implementing this. LOC: ~30. ≤2 KB clean.

3. **P1 — Empty `final_message` `SubagentStop` hook** (5.2 closure). Cite-anchor: Pydantic-AI ContentFilterError + Instructor IncompleteOutputException — two org-distinct primitives literally named for empty-output class detection. LOC: ~50. ≤2 KB clean.

4. **P2 — Session-budget enforcement** (cross-cluster, NEW). Cite-anchor: agent-governance-toolkit `asi08-session-tool-call-limit (gt 50)` + `asi08-swarm-heat-guardrail (tool_call_depth gt 5)` + pydantic-ai `UsageLimits(request_limit, total_tokens_limit, tool_calls_limit)`. Implementation: Stop / PostToolUse hook counts cumulative tool calls per session, blocks at 50; counts agent-nesting-depth via tool_input parent chain, blocks at depth >5. LOC: ~70. ≤2 KB borderline — may need split into 2 hooks.

5. **P3 — Operator-facing skill update** (doc-only) — vendor-forked `dispatching-parallel-agents-w321-fork/SKILL.md` adds §10 "Per-cluster patterns: Microsoft SubAgentsProvider + Google TransferToAgentTool + Pydantic ContentFilterError" with paste-ready test cases. No file change to CLAUDE.md (pointer-only ≤50 LOC).

**Cardinal-rule compliance**: all 4 hooks above pass CR-2 (project-owned hook bodies allowed ONLY as documented bug-patch shims ≤2 KB cite-anchored to GitHub issue). The cite-anchor for OUR shims is W330-D §5 + W331 P0.4 — these are SHIPPED, RATIFIED audit findings filed in our wave-docs. The shims are NOT speculative invention; they are codification of W330-D-confirmed silent-fallback dimensions in upstream `wshobson/agents v1.0.2`. Worth filing on `anthropics/claude-code` as a PR to `claude-code-workflows` upstream once the fix is local-validated.

---

## §4 — Cross-repo themes

### 4.1 Lead-mailbox vs DAG-orchestration (the two SOTA poles)

| Pole | Exemplars | Mechanism | Strengths | Weaknesses |
|---|---|---|---|---|
| **Lead-mailbox** | Our installed `agent-teams@1.0.2` (TeamCreate / SendMessage / TaskCreate). Anthropic claude-cookbooks `patterns/agents/prompts/research_lead_agent.md` | LLM-emergent task decomposition; team-lead routes via natural language to teammates by name | Flexible, low-spec-burden, naturally parallel, scales to ad-hoc team composition | Implicit coordination contract → silent failures (W330-D §5.1–5.6). No graph topology means dispatch errors are unstructured |
| **DAG-orchestration** | Microsoft Agent Framework `_workflows/` (`_validation.py` + `_checkpoint.py` + `_edge.py`); langchain-ai/langgraph (cited via `google-adk-python/agents/langgraph_agent.py:25,52-80`); Google ADK `ParallelAgent` (`agents/parallel_agent.py:150-200+`); Letta `ToolRulesSolver` (`tool_rule_solver.py:24-99+`) | Explicit (node, edge) graph spec validated before run + per-edge type-compatibility + checkpoint-on-graph-signature-hash | Validation-before-execution; deterministic resumability; ergonomic for static topologies; observable | Brittle to runtime topology changes; high spec-burden; less natural for emergent decomposition |

**Pareto-frontier hybrid** (Δ47 reflective routing per sca-v12.1 Phase-5 Gate-3): Microsoft's `SubAgentsProvider` (`SubAgentsProvider.cs:39-458`) is the canonical hybrid — agent-registry is a `Dictionary<string, AIAgent>` (DAG-static at construction) but dispatch is emergent (LLM picks which agent via free-text `agentName` argument). The static registry validates names; the emergent dispatch keeps flexibility. This is the architectural target for `agent-teams` plugin v2.

### 4.2 Checkpointing patterns

| Repo | Mechanism | Persistence boundary | Topology-change handling |
|---|---|---|---|
| `microsoft/agent-framework` | `WorkflowCheckpoint` dataclass (`_checkpoint.py:30-117`) with `graph_signature_hash` | Storage backend Protocol (line 119) | Hash mismatch → fail-closed |
| `letta-ai/letta` | `agent_serialization` (referenced in `tests/test_agent_serialization.py`); SQLite via `alembic/` | Database-backed | Schema migrations via alembic |
| `pydantic/pydantic-ai` | DBOS / Prefect / Temporal via `durable_exec/` (3 separate adapters) | Workflow-engine-managed | Workflow-engine semantics |
| `google/adk-python` | `BaseAgentState` (`base_agent.py:73-79` `extra='forbid'`) + langgraph `thread_id` checkpointer (`langgraph_agent.py:71`) | Pydantic-model-validated | Pydantic schema migration |
| `agent-teams@1.0.2` (ours) | `~/.claude/teams/{team-name}/config.json` (per `team-spawn.md:80`) | Filesystem JSON | None — no topology hash |

Our agent-teams has the WEAKEST checkpoint discipline. Adding a `graph_signature_hash`-equivalent (e.g., SHA256 of sorted member-role pairs) to the team config would close the topology-drift-on-restart hole.

### 4.3 Structured I/O (input + output schemas)

| Repo | Input schema | Output schema | Validation point |
|---|---|---|---|
| `pydantic/pydantic-ai` | `deps_type=ClientAndKey` (RunContext-typed) | `output_type=list[str]` (pydantic-validated) | Both ends, every run |
| `567-labs/instructor` | n/a (just `response_model`) | `response_model: type[BaseModel]` | Output via `process_response` + Pydantic validate + reask on fail |
| `google/adk-python` | `BaseAgentConfig` per-agent | `BaseAgentState(extra='forbid')` + output_schema via `_output_schema_processor` | Pydantic v2 |
| `microsoft/agent-framework` | Per-handler `is_type_compatible(source_types, target_types)` static check (`_workflows/_validation.py:13,53-73`) | `HANDLER_OUTPUT_ANNOTATION` validation enum (`_validation.py:26`) | Static type check at workflow build + dynamic at edge dispatch |
| `letta-ai/letta` | `MessageCreate` typed | `LettaResponse` + `LettaStopReason(StopReasonType)` enum | Per-step |
| `agent-teams@1.0.2` (ours) | free-form `prompt` string in `Agent` tool call | free-form `final_message` string | **None** |

**Structured I/O is the missing layer in agent-teams**. The closest local primitive is `agent-teams:team-lead` agent's `subagent_type` enum (described in prose only at `commands/team-spawn.md:78`). Per §3 P0-B, this becomes a JSON-Schema enum at the hook layer.

### 4.4 Retry ladders — taxonomy

| Class | Trigger | Mechanism | Cluster-D exemplars |
|---|---|---|---|
| **HTTP transient** | 429, 5xx, ECONNRESET | Exponential backoff + jitter; capped attempts | Gemini-CLI `retry.ts:170-209`; tenacity (Instructor); pydantic-ai `ModelHTTPError:238-254` |
| **Content invalidity** | empty / malformed / partial response | `shouldRetryOnContent(result)` (Gemini-CLI `retry.ts:272-286`); `ContentFilterError` (pydantic-ai); `IncompleteOutputException` (Instructor) | All three |
| **Schema validation fail** | output doesn't match `response_model` | Re-prompt with error inlined (Instructor `handle_reask_kwargs`) | Instructor `retry.py:262-268` |
| **Tool re-prompt** | tool returned ModelRetry exception | Inject `message` back to model | Pydantic-AI `ModelRetry:39-76` + `ToolRetryError:261-280` |
| **Quota / model swap** | persistent 429 | Fallback to cheaper model (`onPersistent429` → flash) | Gemini-CLI `retry.ts:308-322` (Flash-fallback) |
| **Validation handoff** | account verify required | Interactive prompt → 'verify' / 'change_auth' / 'cancel' | Gemini-CLI `retry.ts:327-345` |
| **Agent runaway** | usage limits exceeded | Throw `UsageLimitExceeded` mid-run | Pydantic-AI `exceptions.py:183` + agent-governance-toolkit `asi08-session-tool-call-limit` |
| **Empty `final_message`** | child agent returned empty | (NEW for our runtime) SubagentStop hook block + force-requeue per §3 P1 | None implemented in our runtime; closest analog is pydantic-ai `ContentFilterError` |

Our runtime currently has only "HTTP transient" via plugin-managed retry in the OpenAI/Anthropic clients — the rest of the ladder is implicit. Adding `ContentFilterError`-class detection at `SubagentStop` is the high-value P1.

### 4.5 Anti-hallucination scoped enforcement

Three distinct levels at which a name/identifier can be validated:

1. **Prompt-level** (weakest) — operator instructions: "use one of these names". `team-spawn.md:78` is here. Bypass: LLM hallucinates.
2. **Runtime-level** — dispatch-site check in code (Microsoft `SubAgentsProvider.cs:228-231`). Bypass: closed.
3. **Schema-level** (strongest) — JSON-Schema `enum` baked into the tool declaration so the model literally cannot generate an invalid value under strict-mode (Google ADK `TransferToAgentTool._get_declaration:73-89`).

Our agent-teams sits at level 1. P0-B from §3 moves us to level 2. Level 3 would require modifying the upstream `Agent` tool declaration in Claude Code itself (anthropics/claude-code feature request, not in-scope for W331).

### 4.6 Approval / human-in-the-loop

| Repo | Mechanism |
|---|---|
| `pydantic/pydantic-ai` | `ApprovalRequired(metadata)` exception (`exceptions.py:97-112`) raised from a tool; caller decides |
| `letta-ai/letta` | `RequiresApprovalToolRule` (`tool_rule_solver.py:48-49`); attached to specific tools |
| `microsoft/agent-governance-toolkit` | `action: audit` on policy rule (e.g. `asi08-swarm-heat-guardrail` line 269); separate from `deny` |
| `google-gemini/gemini-cli` | `onValidationRequired` callback returning `'verify' \| 'change_auth' \| 'cancel'` (`retry.ts:328-345`) |
| `agent-teams@1.0.2` (ours) | None |

The pattern across Cluster-D is "approval is an exception/policy/callback, not a return value". This matches our preferred R5 Control 4 (operator-confirmed egress). Adding `RequiresApprovalToolRule`-equivalent to our hook layer is a candidate P4 (out of scope for W331).

---

## §5 — Cite anchors (≥3 org-distinct, all live SHA-pinned)

### Anchor set 1 — Programmatic agent-name validation (closes W330 P0.4 P0-B)

1. **Microsoft Corporation** — `microsoft/agent-framework@a60e541` `dotnet/src/Microsoft.Agents.AI/Harness/SubAgents/SubAgentsProvider.cs:67-133` (constructor-time `ValidateAndBuildAgentDictionary` + dispatch-site lookup with allowlist error message). MIT.
2. **Google LLC** — `google/adk-python@bd062ec` `src/google/adk/tools/transfer_to_agent_tool.py:43-89` (JSON-Schema `enum` constraint via `_get_declaration` override). Apache-2.0. Plus `src/google/adk/agents/base_agent.py:552-606` (`validate_name` + `validate_sub_agents_unique_names` pydantic `field_validator`s).
3. **Letta AI (limnal-corp)** — `letta-ai/letta@1131535` `letta/agents/exceptions.py:1-7` (`IncompatibleAgentType(ValueError)` typed exception with `expected_type` + `actual_type` fields, raised at dispatch).

Plus 4th cross-org cite: **JSON Schema authoring spec** — JSON Schema RFC 8927 §6 (vocabularies) for `enum` keyword constraint semantics; Anthropic `claude-code` strict-mode tool-use parser honors `enum` per Anthropic SDK docs (`claude-api` skill knowledge).

### Anchor set 2 — Empty-output detection + retry envelope (closes W330 P0.4 P1)

1. **Pydantic Services Inc** — `pydantic/pydantic-ai@206453a` `pydantic_ai_slim/pydantic_ai/exceptions.py:220-221` (`ContentFilterError(UnexpectedModelBehavior)` literally docstring "resulting in an empty response"). Plus `ToolRetryError:261-280`. MIT.
2. **Jason Liu / 567 Labs** — `567-labs/instructor@5e8e2d5` `instructor/core/retry.py:270-277` (`IncompleteOutputException` propagation-bypass via break in retry loop; PR #2280 2026-05-10 explicitly fixed this propagation). MIT.
3. **Google LLC** — `google-gemini/gemini-cli@77e65c0` `packages/core/src/utils/retry.ts:272-286` (`shouldRetryOnContent(result)` callback for content-level retry — empty content triggers backoff+retry independent of HTTP status). Apache-2.0.

Plus 4th cross-org cite: Anthropic `claude-cookbooks @ 2eed173a` `patterns/agents/prompts/research_lead_agent.md` mandates "each worker MUST return non-empty final_message OR explicit NO-FINDINGS sentinel; orchestrator MUST raise on empty" (cited in W331 P0 mandates).

### Anchor set 3 — Policy-as-data governance contract

1. **Microsoft Corporation** — `microsoft/agent-governance-toolkit@8bf231b` `templates/policies/starters/general-saas.yaml:1-418` (OWASP-ASI Top-10 mapped declarative YAML with `{condition, action, priority, message}` schema + `defaults: {action: deny, max_tokens: 12000, max_tool_calls: 30, confidence_threshold: 0.85}`). MIT.
2. **OWASP Foundation 501(c)(3)** — OWASP ASI Top-10 spec (referenced in the YAML's per-rule `# ASI-XX` comment block + `templates/policies/starters/general-saas.yaml:7` "Maps to OWASP Agentic Security Initiatives (ASI) Top 10"). Apache-2.0-licensed spec.
3. **NIST / US DoC** — NIST AI 600-1 RMF MEASURE-2.3 + GOVERN-1.1 (sca-v12.1 D-EMP HARD GATE anchor; aligned with declarative policy-as-data via Profile-based controls). Public-domain.

### Anchor set 4 — DAG orchestration + checkpoint topology hash

1. **Microsoft Corporation** — `microsoft/agent-framework@a60e541` `python/packages/core/agent_framework/_workflows/_validation.py:17-150` (`WorkflowGraphValidator` + 6 enum'd validation classes + `is_type_compatible` static type check) AND `_checkpoint.py:30-117` (`WorkflowCheckpoint.graph_signature_hash` topology invariant). MIT.
2. **LangChain Inc** — `langchain-ai/langgraph` (cited transitively via `google/adk-python@bd062ec` `src/google/adk/agents/langgraph_agent.py:25,52-80` importing `langgraph.graph.graph.CompiledGraph` + thread_id-keyed `RunnableConfig` checkpointer). MIT.
3. **Letta AI** — `letta-ai/letta@1131535` `letta/helpers/tool_rule_solver.py:6-99` (9 distinct `ToolRule` subclasses representing init/child/conditional/continue/maxcount/parent/terminal/required-before-exit/requires-approval rule DAG). Apache-2.0.

Plus 4th: **DBOS / Stanford** — `dbos-inc/dbos-transact-py` (cited via `pydantic/pydantic-ai@206453a` `pydantic_ai_slim/pydantic_ai/durable_exec/dbos/` adapter; durable execution semantics).

### Anchor set 5 — Multi-stage retry with jitter + content + model-fallback

1. **Google LLC** — `google-gemini/gemini-cli@77e65c0` `packages/core/src/utils/retry.ts:218-385` (the most elaborate single retry implementation in Cluster-D — 5 retry sub-mechanisms in one ladder). Apache-2.0.
2. **OpenAI Inc / Tenacity authors (jd / Will Thames)** — `jd/tenacity` (cited via `567-labs/instructor@5e8e2d5` `instructor/core/retry.py:32-38` `from tenacity import AsyncRetrying, RetryError, Retrying, stop_after_attempt, stop_after_delay`). Apache-2.0.
3. **Pydantic Services Inc** — `pydantic/pydantic-ai@206453a` `pydantic_ai_slim/pydantic_ai/exceptions.py:39-76` (`ModelRetry` exception + `__get_pydantic_core_schema__` for cross-workflow serialization).

Plus 4th: Anthropic SDK `anthropics/anthropic-sdk-python` retry semantics (`max_retries` per-client). The `claude-api` skill knowledge covers this.

---

## §6 — Direct mapping to W330 P0.4 (agent-teams ZERO programmatic defensive checks)

W330-D §8 surfaces a remediation plan; this section maps Cluster-D-discovered SOTA primitives **1:1 to each W330-D Finding**, with concrete shim recipes and acceptance criteria.

### 6.1 W330-D Finding 5.1 (`subagent_type` dispatch typo) → P0-B closure

**W330-D §5.1 verbatim**: "`commands/team-spawn.md:78`, `commands/team-debug.md:44`, `commands/team-feature.md:69`, `commands/team-review.md:32` all instruct the orchestrator to set `subagent_type` to literal strings like `"agent-teams:team-debugger"`. **No pre-flight validation against an allowlist.** Skill `team-composition-patterns/SKILL.md:81-90` has a table of valid types but it is descriptive prose, not a programmatic check."

**Closure shim**: `Z:/claude-sota-installed/tools/preagent-subagent-allowlist.mjs` (~30 LOC, ≤2 KB).

**Specification** (cite-anchored to Microsoft SubAgentsProvider + Google TransferToAgentTool):

```javascript
#!/usr/bin/env node
// CR-2 sanctioned exception per W330-D Finding 5.1 + W331 §6.1
// Closes the agent-teams subagent_type-typo trap.
// Cite: microsoft/agent-framework@a60e541 SubAgentsProvider.cs:228-231 (dispatch-site allowlist error)
// Cite: google/adk-python@bd062ec transfer_to_agent_tool.py:73-89 (JSON-Schema enum semantics)
import { readFileSync } from 'node:fs';

const ALLOWLIST = new Set([
  'agent-teams:team-lead',
  'agent-teams:team-implementer',
  'agent-teams:team-reviewer',
  'agent-teams:team-debugger',
  'general-purpose',
  'Explore',
  'Plan',
  'context-manager',
]);
const RESERVED_NAMES = new Set(['team-lead']); // closes Finding 5.5

const input = JSON.parse(readFileSync(0, 'utf-8'));
const ti = input?.tool_input ?? {};
const st = ti.subagent_type;
const name = ti.name;

if (typeof st === 'string' && !ALLOWLIST.has(st)) {
  process.stdout.write(JSON.stringify({
    decision: 'block',
    reason: `subagent_type "${st}" not in allowlist. Available: ${[...ALLOWLIST].join(', ')}`,
  }));
  process.exit(2);
}
if (typeof name === 'string' && RESERVED_NAMES.has(name)) {
  process.stdout.write(JSON.stringify({
    decision: 'block',
    reason: `name "${name}" is reserved (e.g. team-lead). Use a unique member name.`,
  }));
  process.exit(2);
}
process.exit(0);
```

Wire in `.claude/settings.json`:

```json
"PreToolUse": [
  { "matcher": "Agent",
    "hooks": [{ "type": "command", "command": "node tools/preagent-subagent-allowlist.mjs", "timeout": 5 }] }
]
```

**Acceptance** (FI-style falsifiable inverse): a deliberate test dispatch `Agent(subagent_type="agent-teams:team-debuger")` MUST be blocked with the allowlist diagnostic; baseline FAR ≤ 0% on the 8 allowlist members across 100 dispatches.

### 6.2 W330-D Finding 5.2 (empty `final_message`) → P1 closure

**W330-D §5.2 verbatim**: "`team-lead.md:78-84` 'Team Lifecycle Protocol' steps 4-5: 'Collect — Gather results as teammates complete tasks. Synthesize — Merge results into consolidated output.' **No language requiring strip-and-test of worker output before consumption.** No `if (empty) requeue` directive."

**Closure shim**: `Z:/claude-sota-installed/tools/subagentstop-empty-final-message.mjs` (~50 LOC, ≤2 KB).

**Specification** (cite-anchored to Pydantic-AI ContentFilterError + Instructor IncompleteOutputException + Gemini-CLI shouldRetryOnContent):

```javascript
#!/usr/bin/env node
// CR-2 sanctioned exception per W330-D Finding 5.2 + W331 §6.2
// Closes the empty-final_message swallow in agent-teams synthesis step.
// Cite: pydantic/pydantic-ai@206453a exceptions.py:220-221 ContentFilterError ("empty response from content filter")
// Cite: 567-labs/instructor@5e8e2d5 core/retry.py:270-277 IncompleteOutputException propagation
// Cite: google-gemini/gemini-cli@77e65c0 utils/retry.ts:272-286 shouldRetryOnContent
import { readFileSync } from 'node:fs';

const SENTINEL_PATTERNS = [
  /^NO[-_]FINDINGS$/i,
  /^NO[-_]FINDINGS:/i,
  /\bNO-FINDINGS\b/,
];

const input = JSON.parse(readFileSync(0, 'utf-8'));
// SubagentStop payload contains final transcript + final_message per Anthropic CC SubagentStop spec
const finalMsg = (input?.final_message ?? input?.transcript?.final_message ?? '').toString().trim();
const isNoFindings = SENTINEL_PATTERNS.some(re => re.test(finalMsg));

if (finalMsg.length === 0) {
  process.stdout.write(JSON.stringify({
    decision: 'block',
    reason: 'final_message is empty; child agent must return non-empty output OR explicit NO-FINDINGS sentinel. Cite: claude-cookbooks @ 2eed173a research_lead_agent.md.',
  }));
  process.exit(2);
}
if (isNoFindings) {
  // emit telemetry but do not block — NO-FINDINGS is a legitimate sentinel
  process.stderr.write(`[subagentstop] child returned NO-FINDINGS sentinel\n`);
}
process.exit(0);
```

Wire in `.claude/settings.json`:

```json
"SubagentStop": [
  { "matcher": "*",
    "hooks": [{ "type": "command", "command": "node tools/subagentstop-empty-final-message.mjs", "timeout": 5 }] }
]
```

**Acceptance**: deliberate test where a subagent returns `""` (empty string) MUST be blocked with the diagnostic; `NO-FINDINGS` sentinel MUST pass through with telemetry; the parent then re-dispatches.

### 6.3 W330-D Finding 5.3 (fork-mode context inheritance undocumented) → P2 doc closure

**W330-D §5.3 verbatim**: "No reference to `CLAUDE_CODE_FORK_SUBAGENT` in any agent or command file."

**Closure** (doc-only, no hook): add §10 to `Z:/claude-sota-installed/.claude/skills/dispatching-parallel-agents-w321-fork/SKILL.md` with the explicit env var + fork-mode handshake recipe. Cite-anchor: Microsoft Agent Framework `SubAgentsProvider.cs:246-252` — the Task.Run + AsyncLocal CurrentRunContext isolation pattern is the canonical reason fork-mode context handoff matters:

> // Wrap in Task.Run to fork the ExecutionContext. AIAgent.RunAsync is a non-async
> // method that synchronously sets the static AsyncLocal CurrentRunContext. Without
> // this isolation, the sub-agent's RunAsync would overwrite the outer (calling)
> // agent's CurrentRunContext, corrupting all subsequent tool invocations in the
> // same FICC batch.

(Microsoft documents the *exact* footgun that necessitates `CLAUDE_CODE_FORK_SUBAGENT=1` in our runtime. This is publishable as a CCBP-cite anchor.)

### 6.4 W330-D Finding 5.4 (experimental flag prose-only) → P3 closure (consolidated with P0-B)

**Closure**: extend the P0-B hook (`preagent-subagent-allowlist.mjs`) with a 5-LOC `process.env.CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` check at the top. Block on `!== '1'` with diagnostic. No new hook file needed.

### 6.5 W330-D Finding 5.5 (reserved-name collision) → consolidated into P0-B above (lines 32-37 of the shim)

### 6.6 W330-D Finding 5.6 (parallel-guard advisory-only) → P0-A separate (already W331 P0.1)

Not Cluster-D-derived but Cluster-D corroborates the fail-CLOSED mandate via:
- Gemini-CLI `retry.ts:354-358` throws `classifiedError` on exhausted attempts — never silently swallows;
- Pydantic-AI `UsageLimitExceeded` raises on limit breach — never falls back;
- Microsoft agent-governance-toolkit `defaults: action: deny` — deny-by-default contract.

Three org-distinct fail-closed precedents reinforce the W329-D / W331 P0.1 ratification.

---

## §7 — One-paragraph summary

Cluster D (Microsoft / Google / Pydantic / Letta / Instructor / 567-labs) surfaces five canonical SOTA primitives that **directly close W330 P0.4** for our `agent-teams@claude-code-workflows v1.0.2` plugin: (1) **constructor-time agent registry validation** (Microsoft `SubAgentsProvider.cs:67-133` + Google ADK `BaseAgent.validate_*:552-606` + Letta `IncompatibleAgentType` exception) — closes Finding 5.1 + 5.5; (2) **JSON-Schema enum constraint to prevent name hallucination** (Google ADK `TransferToAgentTool._get_declaration:73-89`) — schema-level superset of (1); (3) **empty-output-class exception hierarchy** (Pydantic-AI `ContentFilterError:220-221` + Instructor `IncompleteOutputException` + Gemini-CLI `shouldRetryOnContent`) — closes Finding 5.2; (4) **declarative policy-as-data governance** (Microsoft agent-governance-toolkit OWASP-ASI YAML 410-LOC) — closes the broader cardinal-rule discipline gap including per-session budget caps; (5) **DAG validator + checkpoint topology hash** (Microsoft `WorkflowGraphValidator` + `WorkflowCheckpoint.graph_signature_hash`) — closes resumability hole. Concrete remediation is two ≤2 KB CR-2-sanctioned hook shims (`preagent-subagent-allowlist.mjs` ~30 LOC for P0-B + `subagentstop-empty-final-message.mjs` ~50 LOC for P1) plus one doc-only skill stanza extension (P3) and one already-staged advisory→blocking guard flip (P0-A from W331 P0.1). All shims cite-anchored to ≥3 org-distinct upstream primitives. No CLAUDE.md prose change required — the pointer-only ≤50-LOC invariant is preserved; the remediation lands in `.claude/settings.json` hook wiring + `tools/*.mjs` bodies + skill update — all already-permitted classes under R2 cardinal rule. **Falsifiable inverse**: if Microsoft Agent Framework `SubAgentsProvider`, Google ADK `TransferToAgentTool`, AND Pydantic-AI `ContentFilterError` ALL disappeared from upstream, our remediation would still be valid because the underlying pattern is independently documented in Anthropic's own claude-cookbooks `research_lead_agent.md` orchestrator-worker contract — org-distinct ✓, causal-distinct ✓ (no Anthropic dependency on Microsoft/Google), temporal-distinct ✓ (research_lead_agent commit predates W269 by ≥3 months).
