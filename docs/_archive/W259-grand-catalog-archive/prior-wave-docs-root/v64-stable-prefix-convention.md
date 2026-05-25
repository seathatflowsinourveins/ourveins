# V64 Stable-Prefix Fork-Subagent Contract — operator convention for cache-preserving fan-out

**Status**: ACTIVE (operator-discipline; runtime hook enforcement queued separately)
**Origin**: V64-adoption-plan §2 (orchestrator-pivot post Wave 80 Agent B+C FM-17.e failures); ADOPT TOP-4 conf=0.86 verdict
**Cross-model gate**: real GPT-5.5 BRIDGE-MODE via proxy `/v1/chat/completions` (cardinal-rule-3 Phase 1 bootstrap exception)
**Date**: 2026-05-08
**V64 TOP-4 progress**: closes 4-of-4 (sister to §1 Wave 83 / §3 Wave 81 / §4 Wave 82)
**Sister conventions**:
  - `docs/v64-cache-aware-routing-convention.md` (Wave 83 §1 — pre-spawn route + cache binding; consumer of this doc's `stable_prefix_hash`)
  - `docs/v64-noise-risk-classifier-convention.md` (Wave 82 §4 — pre-spawn classification; CLASS slot determines whether prefix-freeze applies)
  - `docs/v64-child-artifact-lanes-convention.md` (Wave 81 §3 — post-spawn artifact persistence; manifest.json references stable_prefix_hash for Layer-7 audit)

## TIER-1 Cite Anchors (verified by operator pre-write at exact line content)

### Direct cites supporting §2 stable-prefix contract

- `Z:/repos/deps/awesome-agentic-patterns/patterns/prompt-caching-via-exact-prefix-preservation.md @ 9a7b5c2e04b0f69df9aee7d395353b807d8f0e9f` — exact-prefix preservation patterns verified pre-write at exact line content.
  - L24 verbatim: *"Maintain prompt cache efficiency through **exact prefix preservation** - always append new messages rather than modifying existing ones, and carefully order messages to maximize cache hits."*
  - L26 verbatim: *"**Core insight**: Prompt caches only work on **exact prefix matches**. If the first N tokens of a request match a previous request, the cached computation can be reused."*
  - L28 verbatim: *"**Mechanism**: Caching operates at the token level, not message level. The cache checks token-by-token for prefix matches, independent of message boundaries."*
  - L139-143 verbatim (Prompt construction checklist):
    - L139: *"1. **Order messages by stability**: Static → Variable"*
    - L141: *"2. **Never modify existing messages**: Always append new ones"*
    - L142: *"3. **Keep tool order consistent**: Enumerate tools in deterministic order"*
    - L143: *"4. **Insert, don't update**: For config changes, add new messages"*
  - L152-157 verbatim (MCP `tools/list_changed` guidance):
    - L152: *"**MCP server considerations:**"*
    - L154: *"MCP servers can emit `notifications/tools/list_changed` to indicate tool list changes."*
    - L156: *"**Avoid honoring this mid-conversation** as it breaks cache hits. Instead:"*
    - L157: *"- Delay tool refresh until conversation boundary"*
  - L204 verbatim (Trade-offs Pros — production-validated savings): *"- **Production-validated savings**: 43% cost reduction demonstrated at scale (HyperAgent, 9.4B tokens/month)"* — empirical evidence for cache-locality preservation business case
  - L209 verbatim (Trade-offs Cons — cache fragility): *"- **Cache fragility**: Mid-conversation changes (tools, model) break prefix matching"*
  - L210 verbatim (Trade-offs Cons — disciplined ordering required): *"- **Disciplined ordering required**: All static content must come before variable content"*

### Cross-reference cites (sister §1+§3+§4 anchors)

- `Z:/repos/deps/CLIProxyAPI/config.example.yaml @ ed1458aa6d3430ba59538aeb980b8934f0e80c1f:112-122` (Wave 83 §1 cite chain — session-affinity primitive that this convention's prefix_freeze_gate emits routing keys for)
- `Z:/repos/deps/deepagents/libs/deepagents/deepagents/middleware/filesystem.py @ 95f845d29745ece957144d045849f02c667ac711` (Wave 81 §3 cite chain — manifest.json schema includes stable_prefix_hash for Layer-7 audit)

## §1 The Cross-Layer Prefix-Stability Invariant (V64-plan §2 step 1 derived)

Before spawning fork-subagents, the parent MUST freeze the prefix shared by parent + children:
- system / developer instructions
- tool manifest (deterministic order per AAP L142)
- schema block (structured-output JSON schema)
- cache-control placement (per Anthropic API)
- any deterministic project context

Children MAY append variable task deltas but MUST NOT rewrite earlier prefix messages (per AAP L141 "Never modify existing messages: Always append new ones").

The proof shape (AAP exact-prefix mechanics + V64-plan §2 derivation):
- Anthropic prompt-cache requires exact-prefix match (AAP L26)
- Caching operates at token-level, not message-level (AAP L28)
- Mid-conversation tool/model/schema changes break cache hits (AAP "Cons" Trade-offs section)
- Production-validated savings: 43% cost reduction demonstrated at scale (HyperAgent, 9.4B tokens/month — AAP Trade-offs)
- Fan-out children that mutate stable prefix BEFORE parent's first cache-creation event scatter cache writes across N children → N× cache_creation_input_tokens cost; same prefix preserved → 1× creation + N-1× read

## §2 prefix_freeze_gate Emission (V64-plan §2 step 2 verbatim)

The Layer-1 prefix_freeze_gate (operator-side discipline; mechanical hook FORWARD-REF) MUST emit at brief composition time, BEFORE Layer-2 cache-aware routing (Wave 83 §1) AND BEFORE Layer-3 capacity fan-out:

```
prefix_freeze_gate_output = {
  stable_prefix_hash: sha256_hex(<canonical serialization of all immutable prefix
    messages through prefix_frozen_at_message_index, including deterministic project
    context that lives INSIDE the message stream, but EXCLUDING provider-native tool
    and schema blobs — those are separately represented by tool_manifest_hash and
    schema_hash respectively, and MUST NOT also be embedded as message text within
    the prefix. cache_control placement is also represented separately by
    cache_control_policy_id and is NOT included in stable_prefix_hash.>),
  tool_manifest_hash: sha256_hex(<sorted tool definitions in deterministic order>),
  schema_hash: sha256_hex(<JSON schema definition if structured-output>) | null,
  cache_control_policy_id: "ephemeral" | "none" | null,  // eee-local policy identifier
  prefix_frozen_at_message_index: <int — index of last message in stable prefix>,
  allowed_append_only_delta_fields: ["task_delta", "lane_path", "exit_contract"]
}
```

**Hash-domain canonicalization** (per Wave 84 codex T1 F-2 P2 fix-forward): `stable_prefix_hash` covers ONLY the in-message-stream prefix content (system + developer + initial_user messages + any in-stream project_context up to `prefix_frozen_at_message_index`). Provider-native tool/schema/cache-control blobs are SEPARATELY represented by their sibling hashes/policy-IDs to prevent double-counting. If a runtime injects tool/schema text directly into a message body (rare but possible), that text contributes to `stable_prefix_hash` AND those tool/schema definitions ALSO contribute to their sibling hashes — operator must avoid this double-injection per AAP L141 "never modify existing messages" discipline.

**`cache_control_policy_id` provider-translation note** (per Wave 84 codex T1 F-4 P3 fix-forward): `cache_control_policy_id` is an eee-local policy identifier, NOT necessarily a provider-literal API enum. Anthropic API today exposes `cache_control: {type: "ephemeral"}`; "persistent" was removed from the enum above because no provider currently honors a persistent cache scope. Provider request translation (mapping policy-ID → API parameter) remains owned by the routing/runtime layer (Wave 83 §1 + future tools/v64_cache_locality_verify.py).

The 6 emitted fields are upstream inputs to Wave 83 §1's `cache_affinity_key` derivation (which consumes `provider || model_id || normalized_prefix || tool_manifest || schema_id || cache_control`). This convention provides 4 of those 6 inputs (normalized_prefix → stable_prefix_hash; tool_manifest → tool_manifest_hash; schema_id → schema_hash; cache_control → cache_control_policy_id). The remaining 2 (provider + model_id) are bound at Wave 83 §3 route_key time.

## §3 Child Launch Prompt Template (V64-plan §2 step 3 verbatim)

Child prompts MUST use this template (append-only after frozen prefix). The bracketed components below are CONCEPTUAL lifecycle elements of the API request (not all are message-stream text — provider-native tool_manifest + schema travel as separate request fields per §2 hash-domain rule):

```
[stable frozen prefix — IN-MESSAGE-STREAM portion only:
  system + developer + initial_user + in-stream project_context messages
  through prefix_frozen_at_message_index;
  contributes to stable_prefix_hash]
[provider-native tool_manifest — separate API field;
  contributes to tool_manifest_hash, NOT stable_prefix_hash]
[provider-native schema — separate API field;
  contributes to schema_hash, NOT stable_prefix_hash]
[cache_control placement — separate API parameter;
  represented by cache_control_policy_id, NOT stable_prefix_hash]
[append-only child assignment delta — TASK + CONTEXT + FILES + CONSTRAINTS + CLASS + LANE + HANDOFF + TERMINATION;
  appears AFTER prefix_frozen_at_message_index]
[artifact lane path — tmp/v64/waves/<wave_id>/<agent_id>/ per Wave 81 §3]
[structured exit contract — verdict_one_line + manifest fields per Wave 81 §3]
```

Per AAP L139-143 (verbatim):
1. Order messages by stability (static → variable): static = stable frozen prefix; variable = append-only delta
2. Never modify existing messages: append-only ≠ modify
3. Keep tool order consistent: tool_manifest_hash invariant under deterministic ordering
4. Insert, don't update: config changes → new role=developer messages, NOT prefix mutation

## §4 Mid-Wave Mutation Discipline (V64-plan §2 step 4 verbatim)

Any mid-wave operation that would mutate the stable prefix MUST force a new lane with a NEW `stable_prefix_hash`; it must NOT silently mutate the current lane.

Mutation triggers requiring new-lane allocation:
- **Tool refresh** (MCP `tools/list_changed` notification per AAP L154-157): defer to conversation boundary OR allocate new lane
- **Schema migration** (structured-output schema change): new lane required
- **System-prompt rewrite** (rare; system prompt change mid-wave): new lane required
- **Model change** (cross-model routing within wave): new lane required (also breaks Wave 83 §1 cache_affinity_key)
- **Tool ordering change**: new lane required (per AAP L142 deterministic ordering)

Per AAP L156-157 verbatim: *"**Avoid honoring this mid-conversation** as it breaks cache hits. Instead: Delay tool refresh until conversation boundary"* — when defer is impossible, the new-lane allocation IS the formalized "conversation boundary" for fan-out scenarios.

## §5 Layer-7 Verification Predicates (V64-plan §2 step 5 verbatim)

Layer-7 verification MUST diff parent prefix and each child prefix BEFORE accepting final reports:

| Predicate | Trigger | Response |
|---|---|---|
| Child prefix diverges from parent's `stable_prefix_hash` | child mutated stable prefix content | Mark `cache_contract_breach` even if answer is correct; reject child report |
| Tool manifest hash differs between parent + child | tool list reordered or extended mid-wave | Reject; new lane required |
| Schema hash differs | structured-output schema mutated | Reject; new lane required |
| `prefix_frozen_at_message_index` violated | child appended at index ≤ frozen-index | Reject; rerun child with corrected template |
| `allowed_append_only_delta_fields` violated | child wrote outside whitelist | Reject; rerun child with corrected delta |

These predicates are operator-discipline today; promotion to mechanical hook (`tools/v64_prefix_freeze_verify.py` or `PreToolUse:Agent` gate) is FORWARD-REF for Wave 86+ if convention sees ≥3 same-arc adoptions.

## §6 Concrete eee Fleet Application

Current fleet (10 OAuth accounts via CLIProxyAPI v6.10.9; Wave 79 baseline 95.6% cache_read at $237/hr burn):

When orchestrator dispatches a 3-agent advanced-team wave (per advanced-agent-team-standing-directive cite-import-AMBER):

1. **Pre-fan-out** (this convention — Wave 84):
   - Compute `stable_prefix_hash` over the IN-MESSAGE-STREAM canonical prefix ONLY (system + developer + initial_user messages + any in-stream project_context up to `prefix_frozen_at_message_index`); EXCLUDES provider-native tool/schema blobs per §2 hash-domain rule
   - Compute `tool_manifest_hash` SEPARATELY over deterministic-sorted tool list (provider-native definitions; not included in stable_prefix_hash)
   - Compute `schema_hash` SEPARATELY (provider-native JSON schema; null if free-form output; not included in stable_prefix_hash)
   - Set `cache_control_policy_id` SEPARATELY based on Anthropic API call shape (eee-local policy ID per §2; not included in stable_prefix_hash)
   - Record `prefix_frozen_at_message_index` (typically: orchestrator's last message before child dispatch)

2. **Layer-1 admission** (Wave 82 §4): classify wave into parent_direct / child_explore / child_adversarial / child_audit

3. **Layer-2 cache-aware routing** (Wave 83 §1): derive `cache_affinity_key` consuming the prefix_freeze_gate output; bind route_key {session_id, provider, model, account_id, cache_affinity_key, affinity_expiry}

4. **Layer-3 capacity fan-out** (per advanced-agent-team-standing-directive + parallel-agent-wave §CADP rule 2 max 3 concurrent): launch children with append-only deltas

5. **Layer-7 verification** (this convention §5 + sister §1 §3 §4 predicates): reject children that breached prefix-stability invariant

The 4 V64 conventions now form a complete child-fan-out lifecycle contract:
- §4 (Wave 82): pre-spawn classification — what kind of work?
- §2 (THIS Wave 84): pre-spawn prefix freeze — what's the cacheable boundary?
- §1 (Wave 83): pre-spawn routing — which account preserves cache locality?
- §3 (Wave 81): post-spawn persistence — where does artifact land?

## §7 Anti-patterns

- **Skipping prefix_freeze_gate before fan-out** — children inherit potentially-mutating parent context; cache writes scatter; first-fork burns cache_creation tokens that subsequent forks can't share
- **Child mutates earlier message in stable prefix** — refuted by AAP L141; cache hit destroyed silently; sister concern: Wave 83 §1 model_drift Layer-7 predicate
- **Honoring MCP `tools/list_changed` mid-wave** — refuted by AAP L156-157; defer to conversation boundary OR allocate new lane
- **Reordering tools across forks** — refuted by AAP L142; tool order is position-sensitive in cache-prefix matching
- **Modifying schema mid-fan-out** — schema_hash drift forces new lane; silent mutation breaks Layer-7 prefix-diff verification
- **Treating session-affinity (Wave 83 §1) as sufficient without prefix-freeze** — necessary but not sufficient; same session can fork multiple cache lanes if prefix_freeze_gate not bound
- **Cite-import-AMBER without HEAD-SHA pin** — refuted by cardinal-rule-9 install-risk discipline; sibling-bleed defense requires version-pin

## §8 V64 TOP-4 Closure — child-fan-out lifecycle contract complete

```
Layer 0: Inputs (user request / orchestrator state)
  ↓
Layer 1: Admission + Prefix Freeze + Noise Classifier
  - §4 noise_risk_classifier (Wave 82) — what class of work?
  - §2 prefix_freeze_gate (THIS Wave 84) — emit stable_prefix_hash + tool_manifest_hash + schema_hash + cache_control_policy_id
  ↓
Layer 2: Cache-Aware Routing
  - §1 route_key {session_id, provider, model, account_id, cache_affinity_key, affinity_expiry} (Wave 83)
  - warm_fork vs cold_diversity per CLASS slot
  ↓
Layer 3: Capacity / Fan-out
  - launch children per the applicable fan-out directive concurrency limit
    (per advanced-agent-team-standing-directive + parallel-agent-wave §CADP rule 2
    max 3 concurrent unless cache rate ≥50% verified per §CADP rule 5)
  - append-only deltas only (this convention §3)
  - assign artifact_lane per child (§3 Wave 81)
  ↓
Layer 4: Execution
  - parent: parent_direct work
  - children: child_explore / child_adversarial / child_audit in isolated contexts
  ↓
Layer 5: Prompt Cache + Artifact References
  - track cache metrics by (account_id, cache_affinity_key)
  - store paths + manifests, not raw transcripts
  ↓
Layer 6: Compression + Exploration GC
  - compress manifests; discard dead-end search noise
  ↓
Layer 7: Verification / Contract Enforcement (4-pillar)
  - §1: cache locality contract (account/session/affinity invariants)
  - §2: stable prefix contract (prefix_freeze_gate predicates §5)
  - §3: artifact lane contract (manifest evidence + child summary-only return)
  - §4: exploration GC contract (no raw transcript merge into parent)
```

## §9 Migration of Existing Spawn Briefs

Forward-only per `Z:/claude-sota/.claude/rules/port-note-discipline.md` §6 anti-pattern:
- Wave 79/80/81/82/83 historical spawn briefs STAY at current shape (no `prefix_freeze_gate` emission)
- Wave 84+ MUST emit `prefix_freeze_gate_output` at brief composition; record fields in LANE manifest.json (Wave 81 §3 schema extension queued)
- The convention's empirical evidence base grows from Wave 84 onward

## §10 Sister-Convention Integration

- `docs/v64-cache-aware-routing-convention.md` (Wave 83 §1) — CONSUMER of this doc's prefix_freeze_gate output. Wave 83 §1 §2 cache_affinity_key inputs (normalized_prefix / tool_manifest / schema_id / cache_control) ARE this doc's emitted hashes (renamed for symmetry with sha256_hex inputs). The two conventions co-bind at brief composition.
- `docs/v64-noise-risk-classifier-convention.md` (Wave 82 §4) — UPSTREAM of this doc. CLASS slot determines whether prefix-freeze is mandatory:
  - `parent_direct`: skip — no fan-out
  - `child_explore` / `child_audit`: prefix-freeze REQUIRED (warm_fork mode benefits from cache reuse)
  - `child_adversarial`: prefix-freeze still computed BUT cold_diversity routing intentionally scatters across accounts (cache locality sacrificed for cross-model independence)
- `docs/v64-child-artifact-lanes-convention.md` (Wave 81 §3) — POST-SPAWN sister. manifest.json schema gets `stable_prefix_hash` field for Layer-7 prefix-diff audit at child-return time.
- `Z:/claude-sota/.claude/rules/advanced-agent-team-standing-directive.md` (cite-import-AMBER per CLAUDE.md Section 14.5) — this convention adds a brief-composition step BEFORE the directive's spawn template fires
- `Z:/claude-sota/.claude/rules/parallel-agent-wave.md §Cache-Aware Dispatch Pacing` (cite-import-AMBER) — CADP rule 5 pre-dispatch fleet probe combines with this convention's prefix_freeze_gate to produce route_key BEFORE actual dispatch

## §11 Cite Chain (TIER-1 → TIER-3 lattice)

- TIER-1 direct: `Z:/repos/deps/awesome-agentic-patterns/patterns/prompt-caching-via-exact-prefix-preservation.md @ 9a7b5c2e04b0f69df9aee7d395353b807d8f0e9f:24,26,28,139-143,152-157,204,209,210` (13 verbatim quotes at exact line anchors; verified by operator pre-write — exact-prefix mechanics L24/26/28 + checklist L139-143 + MCP tools/list_changed guidance L152-157 + Trade-offs Pros HyperAgent 43% L204 + Trade-offs Cons cache-fragility L209 + disciplined-ordering L210)
- TIER-1 cross-reference (sister conventions): CLIProxyAPI/config.example.yaml @ ed1458aa:112-122 (Wave 83 §1); deepagents/middleware/filesystem.py @ 95f845d (Wave 81 §3); CCBP-tips/claude-thariq-tips-16-apr-26.md @ 64fffd53:133-148,165-170 (Wave 82 §4)
- TIER-2 (cite-import-AMBER per CLAUDE.md Section 14.5): `Z:/claude-sota/.claude/rules/{advanced-agent-team-standing-directive,parallel-agent-wave,codex-t1-fix-forward-pattern,cross-model-consensus,audit-action-loop,port-note-discipline,codification-threshold,fm17-subagent-fleet-depletion,mia-pre-apply,fm20-path-drift-cascade}.md`
- TIER-3-LOCAL: `tmp/wave-subagent-context-v64-adoption-plan-2026-05-08.md` (V64-adoption-plan ADOPT TOP-4 conf=0.86); 3 sister convention docs (Wave 81/82/83); `docs/install-provenance.md` Wave 80+ entries (audit trail anchor)

## §12 Update Triggers

Re-evaluate this convention when:
- Wave 84+ produces ≥3 distinct fan-out instances using prefix_freeze_gate emission — promote to enforced contract via `tools/v64_prefix_freeze_verify.py` mechanical hook
- A new prefix-stability-breaking primitive surfaces in Anthropic API (e.g., dynamic-tool-injection bypassing tools/list_changed semantics) — extend §4 mutation triggers
- A 4th distinct prefix-freeze pattern surfaces in TIER-1 SOTA (≥4-org Axis-1 firm convergence) — extend §2 emission fields
- AAP source updates the prompt-construction checklist — re-pin HEAD SHA + verify cite content
- HyperAgent 43% cost-reduction benchmark updates with newer scale data — refresh AAP Trade-offs cite + update business case
- Anthropic publishes formal multi-account prompt-caching guidance — supersede AAP exact-prefix as primary cite OR extend with Anthropic-direct citation
- FM-17.e candidate sub-class reaches n=3 — promote to OWNED-rule per cycle-322; integrate prefix-freeze into FM-17.e mitigation slot (children that breach prefix while exploring trigger autocompact-thrashing as sister failure mode)
- Layer-5 per-account metrics show cache_creation token cost > 5% above expected after explicit prefix-freeze adoption — Layer-7 predicate threshold tuning
