# ARTIFACT-INLINE: V64 Adoption Plan for Top-4 Subagent Context Patterns

**date**: 2026-05-08  
**source artifact reviewed**: `Z:/claude-sota-installed/tmp/wave-subagent-context-deepdive-agentC-2026-05-08.md`  
**constraint**: TIER-1 cites only from `Z:/repos/deps/`; no sibling-repo cites.

**TIER-1 HEAD SHAs**
- `CLIProxyAPI`: `ed1458aa6d3430ba59538aeb980b8934f0e80c1f`
- `awesome-agentic-patterns`: `9a7b5c2e04b0f69df9aee7d395353b807d8f0e9f`
- `deepagents`: `95f845d29745ece957144d045849f02c667ac711`
- `Continuous-Claude-v3`: `d07ff4b06b62f43771bc0c927d0211b734d6149e`
- `claude-code-best-practice-shan`: `64fffd53a7c6f8e2e0b1575fdd200b65cda04737`

## §1 Cache-aware multi-account routing (Layer 2+5 co-design)

### Pattern

V64 should promote prompt-cache locality from a Layer 5 cache concern into a Layer 2 routing invariant. In a multi-account proxy fleet, cache hits are lost if semantically identical forked work scatters across account credentials, providers, models, or changed stable prefixes.

### TIER-1 evidence

- CLIProxyAPI explicitly supports local or multi-account CLI access across OpenAI/Gemini/Claude-compatible clients: `Z:/repos/deps/CLIProxyAPI/README.md:5`, `Z:/repos/deps/CLIProxyAPI/README.md:9`.
- Its overview includes multiple account round-robin load balancing and Claude Code/OpenAI Codex multi-account load balancing: `Z:/repos/deps/CLIProxyAPI/README.md:51`, `Z:/repos/deps/CLIProxyAPI/README.md:56`, `Z:/repos/deps/CLIProxyAPI/README.md:57`.
- CLIProxyAPI exposes routing strategy and session-sticky routing inputs: `Z:/repos/deps/CLIProxyAPI/config.example.yaml:112`, `Z:/repos/deps/CLIProxyAPI/config.example.yaml:114`, `Z:/repos/deps/CLIProxyAPI/config.example.yaml:115`, `Z:/repos/deps/CLIProxyAPI/config.example.yaml:116`, `Z:/repos/deps/CLIProxyAPI/config.example.yaml:117`, `Z:/repos/deps/CLIProxyAPI/config.example.yaml:118`.
- Session affinity exists, with default retention of one hour: `Z:/repos/deps/CLIProxyAPI/config.example.yaml:120`, `Z:/repos/deps/CLIProxyAPI/config.example.yaml:121`, `Z:/repos/deps/CLIProxyAPI/config.example.yaml:122`.
- Prompt caches only work on exact prefix matches: `Z:/repos/deps/awesome-agentic-patterns/patterns/prompt-caching-via-exact-prefix-preservation.md:24`, `Z:/repos/deps/awesome-agentic-patterns/patterns/prompt-caching-via-exact-prefix-preservation.md:26`.
- Cache hits can break when the model changes, tool list changes, messages reorder, or existing message content changes: `Z:/repos/deps/awesome-agentic-patterns/patterns/prompt-caching-via-exact-prefix-preservation.md:59`, `Z:/repos/deps/awesome-agentic-patterns/patterns/prompt-caching-via-exact-prefix-preservation.md:61`, `Z:/repos/deps/awesome-agentic-patterns/patterns/prompt-caching-via-exact-prefix-preservation.md:62`, `Z:/repos/deps/awesome-agentic-patterns/patterns/prompt-caching-via-exact-prefix-preservation.md:63`, `Z:/repos/deps/awesome-agentic-patterns/patterns/prompt-caching-via-exact-prefix-preservation.md:64`.

### Adoption plan

1. Add a `cache_affinity_key` produced before Layer 2 dispatch:
   `cache_affinity_key = hash(provider, model, normalized_system_prefix, deterministic_tool_manifest, output_schema_id, cache_control_policy)`.

2. Bind Layer 2 route selection to:
   `{session_id, provider, model, account_id, cache_affinity_key, affinity_expiry}`.

3. When launching a 3-6 child wave, choose one of two modes:
   - `warm_fork`: same provider/model/account binding for all children sharing a stable prefix.
   - `cold_diversity`: deliberate cross-account scatter only when adversarial independence matters more than prompt-cache reuse.

4. Layer 5 cache accounting must report hits and misses by `account_id` and `cache_affinity_key`, not just by prompt hash. A prompt hash without account/provider locality is insufficient in a CLIProxyAPI-style fleet.

5. Layer 7 verification must reject a run plan when a cacheable fork wave has:
   - multiple account IDs for the same `cache_affinity_key`;
   - model drift within the same cacheable lane;
   - tool-list changes after the prefix-freeze point;
   - missing session affinity TTL metadata.

### V64 layer changes

- **Layer 2 Routing** becomes cache-aware and owns session/account affinity.
- **Layer 5 Prompt Cache** becomes the metrics and policy layer, but no longer owns route choice alone.
- **Layer 7 Verification** checks that cache locality survived routing and retries.

## §2 Stable-prefix fork-subagent contract

### Pattern

Before spawning fork-subagents, V64 should freeze the prefix shared by the parent and children: system/developer instructions, tool manifest, schema block, cache-control placement, and any deterministic project context. Children may append variable task deltas but must not rewrite earlier prefix messages.

### TIER-1 evidence

- Exact-prefix preservation requires appending new messages rather than modifying old messages: `Z:/repos/deps/awesome-agentic-patterns/patterns/prompt-caching-via-exact-prefix-preservation.md:24`.
- The same source states that caching operates token-by-token against prefix matches: `Z:/repos/deps/awesome-agentic-patterns/patterns/prompt-caching-via-exact-prefix-preservation.md:26`, `Z:/repos/deps/awesome-agentic-patterns/patterns/prompt-caching-via-exact-prefix-preservation.md:28`.
- The prompt construction checklist says to order static before variable content, never modify existing messages, and keep tool order deterministic: `Z:/repos/deps/awesome-agentic-patterns/patterns/prompt-caching-via-exact-prefix-preservation.md:139`, `Z:/repos/deps/awesome-agentic-patterns/patterns/prompt-caching-via-exact-prefix-preservation.md:141`, `Z:/repos/deps/awesome-agentic-patterns/patterns/prompt-caching-via-exact-prefix-preservation.md:142`, `Z:/repos/deps/awesome-agentic-patterns/patterns/prompt-caching-via-exact-prefix-preservation.md:143`.
- Tool-list changes should be avoided mid-conversation because they break cache hits: `Z:/repos/deps/awesome-agentic-patterns/patterns/prompt-caching-via-exact-prefix-preservation.md:152`, `Z:/repos/deps/awesome-agentic-patterns/patterns/prompt-caching-via-exact-prefix-preservation.md:154`, `Z:/repos/deps/awesome-agentic-patterns/patterns/prompt-caching-via-exact-prefix-preservation.md:156`, `Z:/repos/deps/awesome-agentic-patterns/patterns/prompt-caching-via-exact-prefix-preservation.md:157`.

### Adoption plan

1. Insert a Layer 1 `prefix_freeze_gate` before Layer 2 routing and Layer 3 capacity fan-out.

2. The gate emits:
   - `stable_prefix_hash`;
   - `tool_manifest_hash`;
   - `schema_hash`;
   - `cache_control_policy_id`;
   - `prefix_frozen_at_message_index`;
   - `allowed_append_only_delta_fields`.

3. Child launch prompts must use this template:

   ```text
   [stable frozen prefix]
   [append-only child assignment delta]
   [artifact lane path]
   [structured exit contract]
   ```

4. Any mid-wave tool refresh, MCP `tools/list_changed`, schema migration, or system-prompt rewrite must force a new lane with a new `stable_prefix_hash`; it must not silently mutate the current lane.

5. Layer 7 should diff the parent prefix and each child prefix before accepting final reports. A child that mutated stable prefix content is marked `cache_contract_breach` even if the answer is correct.

### V64 layer changes

- **Layer 0/1 Admission** computes and freezes the reusable prefix.
- **Layer 2 Routing** uses `stable_prefix_hash` in account/session affinity.
- **Layer 3 Fan-out** appends only child-specific deltas.
- **Layer 7 Verification** enforces prefix invariance and deterministic tool ordering.

## §3 Child artifact lanes

### Pattern

V64 should prevent bulky child work from returning inline to the parent. Each child gets a deterministic artifact lane directory and returns only a bounded structured summary plus paths to full artifacts.

### TIER-1 evidence

- DeepAgents documents offloading oversized tool results into the filesystem instead of returning them inline: `Z:/repos/deps/deepagents/libs/deepagents/deepagents/middleware/filesystem.py:317`, `Z:/repos/deps/deepagents/libs/deepagents/deepagents/middleware/filesystem.py:319`.
- Its large-result message instructs the model to read saved results from a filesystem path and paginate with offset/limit: `Z:/repos/deps/deepagents/libs/deepagents/deepagents/middleware/filesystem.py:384`, `Z:/repos/deps/deepagents/libs/deepagents/deepagents/middleware/filesystem.py:386`, `Z:/repos/deps/deepagents/libs/deepagents/deepagents/middleware/filesystem.py:388`.
- It also offloads large human messages to a filesystem path with pagination: `Z:/repos/deps/deepagents/libs/deepagents/deepagents/middleware/filesystem.py:395`, `Z:/repos/deps/deepagents/libs/deepagents/deepagents/middleware/filesystem.py:397`.
- DeepAgents states the middleware automatically evicts large tool results to the filesystem to prevent context-window saturation: `Z:/repos/deps/deepagents/libs/deepagents/deepagents/middleware/filesystem.py:533`, `Z:/repos/deps/deepagents/libs/deepagents/deepagents/middleware/filesystem.py:534`.
- Continuous-Claude defines a deterministic agent output path: `Z:/repos/deps/Continuous-Claude-v3/docs/ARCHITECTURE.md:251`, `Z:/repos/deps/Continuous-Claude-v3/docs/ARCHITECTURE.md:253`, `Z:/repos/deps/Continuous-Claude-v3/docs/ARCHITECTURE.md:255`.
- Continuous-Claude states the Task tool spawns an agent, context can be injected before Task execution, and the final agent output lands at `.claude/cache/agents/debug-agent/latest-output.md`: `Z:/repos/deps/Continuous-Claude-v3/docs/ARCHITECTURE.md:404`, `Z:/repos/deps/Continuous-Claude-v3/docs/ARCHITECTURE.md:409`, `Z:/repos/deps/Continuous-Claude-v3/docs/ARCHITECTURE.md:414`, `Z:/repos/deps/Continuous-Claude-v3/docs/ARCHITECTURE.md:424`.
- Its invariants say agents write to files, not stdout: `Z:/repos/deps/Continuous-Claude-v3/docs/ARCHITECTURE.md:534`, `Z:/repos/deps/Continuous-Claude-v3/docs/ARCHITECTURE.md:536`.

### Adoption plan

1. Add a Layer 5/6 `artifact_lane` object to every child launch:

   ```json
   {
     "wave_id": "...",
     "agent_id": "...",
     "lane_root": "tmp/v64/waves/<wave_id>/<agent_id>/",
     "latest_report": "tmp/v64/waves/<wave_id>/<agent_id>/latest-output.md",
     "large_results": "tmp/v64/waves/<wave_id>/<agent_id>/large_tool_results/",
     "manifest": "tmp/v64/waves/<wave_id>/<agent_id>/manifest.json"
   }
   ```

2. Child agents must write:
   - `latest-output.md`: human-readable final report;
   - `manifest.json`: structured fields `{summary, claims, evidence_paths, confidence, next_action, token_notes}`;
   - `large_tool_results/<tool_call_id>`: any raw high-volume output needed for audit.

3. Parent context ingestion is capped:
   - read `manifest.json` first;
   - read `latest-output.md` only when needed;
   - never merge raw `large_tool_results` unless Layer 7 requests evidence audit.

4. Layer 6 compression should summarize artifact manifests across agents, not summarize raw transcripts. This preserves auditability while minimizing parent-context token load.

5. Layer 7 checks that every accepted child claim has either an inline cite or an artifact path in the manifest.

### V64 layer changes

- **Layer 3 Fan-out** assigns lane paths.
- **Layer 5 Cache** stores stable artifact references, not raw child logs.
- **Layer 6 Compression** compresses manifests and reports, not tool-result dumps.
- **Layer 7 Verification** can reopen exact artifacts for audit.

## §4 Exploration-noise GC

### Pattern

V64 should make subagents the default lane for noisy exploration: broad greps, repeated file reads, failed branches, dead-end hypotheses, and adversarial search. The parent should receive synthesized deltas only.

### TIER-1 evidence

- Claude Code best-practice guidance describes subagents as context management for work that creates intermediate output not needed again: `Z:/repos/deps/claude-code-best-practice-shan/tips/claude-thariq-tips-16-apr-26.md:133`, `Z:/repos/deps/claude-code-best-practice-shan/tips/claude-thariq-tips-16-apr-26.md:135`.
- It states a subagent gets its own fresh context window and returns only a synthesized final report to the parent: `Z:/repos/deps/claude-code-best-practice-shan/tips/claude-thariq-tips-16-apr-26.md:137`.
- It frames the routing test as whether the parent needs the tool output again or only the conclusion: `Z:/repos/deps/claude-code-best-practice-shan/tips/claude-thariq-tips-16-apr-26.md:139`.
- It explicitly says exploration noise is garbage-collected when the subagent exits and only the final report returns: `Z:/repos/deps/claude-code-best-practice-shan/tips/claude-thariq-tips-16-apr-26.md:141`.
- Its decision table recommends subagents when the next step will generate lots of output and only the conclusion is needed: `Z:/repos/deps/claude-code-best-practice-shan/tips/claude-thariq-tips-16-apr-26.md:167`.

### Adoption plan

1. Add a Layer 1 `noise_risk_classifier` with these labels:
   - `parent_direct`: low-noise, low-branch, final edits or direct question answering.
   - `child_explore`: broad search/read/probe tasks where parent needs conclusion only.
   - `child_adversarial`: independent critique or red-team work.
   - `child_audit`: evidence verification against existing artifact lanes.

2. Route `child_explore`, `child_adversarial`, and `child_audit` through artifact lanes by default.

3. Forbid raw child transcript merge into parent context. Allowed parent return payload:

   ```json
   {
     "agent_id": "...",
     "summary": "...",
     "decision_relevant_findings": [],
     "evidence_paths": [],
     "dead_ends_omitted": true,
     "confidence": 0.0
   }
   ```

4. Layer 6 garbage collection should explicitly discard:
   - repeated `rg`/grep output once summarized;
   - failed search branches;
   - exploratory file reads not used in final evidence;
   - intermediate reasoning that does not affect the decision.

5. Layer 7 verification should sample child artifact evidence when the summary has high impact or low confidence, but should not import the full transcript into parent memory.

### V64 layer changes

- **Layer 1 Admission** classifies noise risk before deciding parent vs child execution.
- **Layer 3 Capacity** reserves child slots for high-noise exploration.
- **Layer 6 Compression/GC** drops exploration traces after summary and artifact persistence.
- **Layer 7 Verification** audits samples without contaminating parent context.

## §5 V64 revised architecture diagram

```text
Layer 0: Inputs / user request / repo state
  |
  v
Layer 1: Admission + Prefix Freeze + Noise Classifier
  - compute stable_prefix_hash
  - compute tool_manifest_hash and schema_hash
  - classify parent_direct vs child_explore vs child_adversarial vs child_audit
  |
  v
Layer 2: Cache-Aware Routing
  - bind {session_id, provider, model, account_id, stable_prefix_hash}
  - preserve session affinity TTL for cacheable lanes
  - choose warm_fork or cold_diversity
  |
  v
Layer 3: Capacity / Fan-out
  - launch 3-6 children only with append-only deltas
  - assign artifact_lane per child
  |
  v
Layer 4: Execution
  - parent executes low-noise work
  - children execute noisy/adversarial/audit work in isolated contexts
  |
  v
Layer 5: Prompt Cache + Artifact References
  - track cache metrics by account_id + stable_prefix_hash
  - store child paths and manifests, not raw transcript merges
  |
  v
Layer 6: Compression + Exploration GC
  - compress manifests/reports
  - discard dead-end search noise from parent context
  - retain audit paths for later verification
  |
  v
Layer 7: Verification / Contract Enforcement
  - verify account/session/cache-affinity invariants
  - verify stable prefix invariants
  - verify artifact manifest evidence
  - sample child lanes without importing full transcripts
```

### Revised control-plane contracts

1. **Cache locality contract**: a cacheable lane must preserve `{provider, model, account_id, stable_prefix_hash}` across retries and child forks unless explicitly marked `cold_diversity`.

2. **Stable prefix contract**: child prompts append task deltas after a frozen prefix; tool list and schema changes create a new lane.

3. **Artifact lane contract**: child outputs land in deterministic files; parent receives summaries and paths.

4. **Exploration GC contract**: noisy intermediate work dies in child context; only decision-relevant conclusions and evidence handles return.

## §6 VERDICT

VERDICT: ADOPT TOP-4 WITH V64 REVISION

The adversarial artifact identifies four patterns that should be promoted into V64 as architectural contracts, not optional optimizations:

1. **Cache-aware multi-account routing** is the highest-priority change because prompt-cache effectiveness depends on Layer 2 route locality as much as Layer 5 cache policy. CLIProxyAPI's multi-account/session-affinity controls and exact-prefix caching requirements make this a cross-layer invariant.

2. **Stable-prefix fork-subagent contract** should become the precondition for cacheable fan-out. Without deterministic system/tool/schema prefixes, parallel subagents can destroy cache reuse before execution begins.

3. **Child artifact lanes** should be mandatory for bulky child outputs. DeepAgents and Continuous-Claude both support the stronger pattern: large or final agent outputs belong in files, while parent context receives paths and bounded summaries.

4. **Exploration-noise GC** should govern when to spawn children. Subagents are not only capacity expansion; they are context hygiene boundaries for high-noise exploration.

Implementation order:
1. Add `stable_prefix_hash` and `cache_affinity_key` to Layer 1/2.
2. Add artifact lane allocation to Layer 3.
3. Enforce child summary/path-only return payloads in Layer 5/6.
4. Add Layer 7 contract checks for route locality, prefix stability, artifact evidence, and no raw child transcript merge.

Confidence: `0.86`. Residual risk: no single TIER-1 repo demonstrates the full combined V64 target of multi-account proxy routing plus exact-prefix cache preservation plus child artifact lanes; the plan is a synthesis from directly cited primitives.
