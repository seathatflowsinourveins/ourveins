# V64 Cache-Aware Multi-Account Routing — operator convention for eee fleet dispatch

**Status**: ACTIVE (operator-discipline; runtime hook enforcement queued separately)
**Origin**: V64-adoption-plan §1 (orchestrator-pivot post Wave 80 Agent B+C FM-17.e failures); ADOPT TOP-4 conf=0.86 verdict
**Cross-model gate**: real GPT-5.5 BRIDGE-MODE via proxy `/v1/chat/completions` (cardinal-rule-3 Phase 1 bootstrap exception)
**Date**: 2026-05-08
**Sister conventions**:
  - `docs/v64-child-artifact-lanes-convention.md` (Wave 81 §3 — post-spawn artifact persistence)
  - `docs/v64-noise-risk-classifier-convention.md` (Wave 82 §4 — pre-spawn classification)
  - **THIS doc** (Wave 83 §1 — pre-spawn route + cache binding; Layer-2 + Layer-5 co-design)

## TIER-1 Cite Anchors (verified by operator pre-write at exact line content)

### Direct cites supporting §1 cache-aware multi-account routing

- `Z:/repos/deps/CLIProxyAPI/config.example.yaml @ ed1458aa6d3430ba59538aeb980b8934f0e80c1f` — verified at lines 112-122 (operator pre-write). Per-line exact content (no slash-combination):
  - L112 verbatim: `# Routing strategy for selecting credentials when multiple match.`
  - L113 verbatim: `routing:`
  - L114 verbatim: `  strategy: "round-robin" # round-robin (default), fill-first`
  - L115 verbatim: `  # Enable universal session-sticky routing for all clients.`
  - L116 verbatim: `  # Session IDs are extracted from: metadata.user_id (Claude Code session format),`
  - L117 verbatim: `  # X-Session-ID, Session_id (Codex), X-Amp-Thread-Id (Amp CLI),`
  - L118 verbatim: `  # X-Client-Request-Id (PI), conversation_id, or first few messages hash.`
  - L119 verbatim: `  # Automatic failover is always enabled when bound auth becomes unavailable.`
  - L120 verbatim: `  session-affinity: false # default: false`
  - L121 verbatim: `  # How long session-to-auth bindings are retained. Default: 1h`
  - L122 verbatim: `  session-affinity-ttl: "1h"`
- `Z:/repos/deps/CLIProxyAPI/README.md @ ed1458aa6d3430ba59538aeb980b8934f0e80c1f` — multi-account claims verified pre-write.
  - L5 verbatim: *"A proxy server that provides OpenAI/Gemini/Claude/Codex compatible API interfaces for CLI."*
  - L9 verbatim: *"So you can use local or multi-account CLI access with OpenAI(include Responses)/Gemini/Claude-compatible clients and SDKs."*
  - L51 verbatim: *"Multiple accounts with round-robin load balancing (Gemini, OpenAI, Claude)"*
  - L56-57 verbatim: *"Claude Code multi-account load balancing / OpenAI Codex multi-account load balancing"*
- `Z:/repos/deps/awesome-agentic-patterns/patterns/prompt-caching-via-exact-prefix-preservation.md @ 9a7b5c2e04b0f69df9aee7d395353b807d8f0e9f` — exact-prefix mechanics verified pre-write.
  - L24 verbatim: *"Maintain prompt cache efficiency through **exact prefix preservation** - always append new messages rather than modifying existing ones, and carefully order messages to maximize cache hits."*
  - L26 verbatim: *"**Core insight**: Prompt caches only work on **exact prefix matches**. If the first N tokens of a request match a previous request, the cached computation can be reused."*
  - L28 verbatim: *"**Mechanism**: Caching operates at the token level, not message level. The cache checks token-by-token for prefix matches, independent of message boundaries."*
  - L59-64 verbatim ("What breaks cache hits"): *"Changing the list of available tools (position-sensitive) / Reordering messages / Modifying existing message content / Changing the model (affects server-side system message)"*
  - L139-143 verbatim (Prompt construction checklist): *"Order messages by stability: Static → Variable / Never modify existing messages: Always append new ones / Keep tool order consistent: Enumerate tools in deterministic order / Insert, don't update: For config changes, add new messages"*
  - L152-157 verbatim (MCP tool refresh): *"MCP servers can emit `notifications/tools/list_changed` to indicate tool list changes. **Avoid honoring this mid-conversation** as it breaks cache hits. Instead: Delay tool refresh until conversation boundary / Or accept the cache miss as necessary trade-off"*

## §1 The Cross-Layer Invariant (V64-plan §1 step 1 verbatim)

**Layer 2 (routing) + Layer 5 (cache) are not independent.** In a multi-account proxy fleet, cache hits are lost if semantically identical forked work scatters across account credentials, providers, models, or changed stable prefixes. Cache locality must be promoted from a Layer-5-only concern into a **Layer-2 routing invariant**.

The proof shape (CLIProxyAPI source + AAP exact-prefix mechanics):
- CLIProxyAPI's `routing.strategy: round-robin` distributes requests across accounts (default behavior; verified config.example.yaml:114).
- Anthropic prompt-cache requires **exact-prefix match** (AAP L26).
- Round-robin without affinity (CLIProxyAPI default `session-affinity: false` at config.example.yaml:120) can multiply cache-creation events across accounts and reduce effective cache_read rate, especially for short-lived or bursty fork waves; the exact delta depends on workload length, TTL, provider cache scope, and account distribution.
- CLIProxyAPI's `session-affinity-ttl: "1h"` (config.example.yaml:122) is the existing primitive that must be **enabled** AND **scoped by cache_affinity_key** (not just session_id) to preserve cache locality under fan-out.

## §2 cache_affinity_key Derivation (V64-plan §1 step 1 derived)

The canonical key is computed over 6 slots; non-applicable fields use null/sentinel values rather than being omitted (preserves cross-provider key shape):

```
cache_affinity_key = sha256_hex(
  provider             // "anthropic" | "openai" | "google" — REQUIRED
  || model_id          // "claude-opus-4-7" | "gpt-5.5" | "gemini-3-pro-high" — REQUIRED
  || normalized_prefix // system + tool-list + initial user msg, deterministic ordering — REQUIRED
  || tool_manifest     // sorted tool definitions (per AAP L142 deterministic order); null if no tools
  || schema_id         // SHA of structured-output schema; null if free-form output
  || cache_control     // "ephemeral" | "persistent" | "none" (Anthropic API); null for non-Anthropic
)
```

`schema_id` and `cache_control` are **conditional discriminators** — included in the canonical 6-slot key with null sentinels when not applicable. They are load-bearing **only when present** because they can alter request semantics or cache scope (server-side formatting / tool-behavior / cache-lifetime), not because every provider exposes identical cache behavior. Rationale: keeping the slot positions stable across providers prevents accidental key collisions when the same prefix is sent first to OpenAI then to Anthropic with cache_control specified.

The `normalized_prefix` MUST be byte-identical across all forks of the same lane. Per AAP L139-143:
1. Static content first (system + tools)
2. Never modify existing messages
3. Tool order deterministic
4. Insert, never update

When applicable, `schema_id` is the SHA of the JSON schema definition for structured-output responses (function-calling args / output schemas). Different schemas → different cache lanes (per AAP L62 "Changing the model affects server-side system message" sister concern; same logic for schema).

## §3 Layer-2 Route Binding (V64-plan §1 step 2 verbatim)

Each route decision binds:
```
route_key = {
  session_id,           // CLIProxyAPI extracts from metadata.user_id / X-Session-ID / etc (config.example.yaml:118)
  provider,             // anthropic | openai | google
  model,                // canonical model_id
  account_id,           // OAuth file basename (e.g., "claude-mr.euphoria@gmail.com")
  cache_affinity_key,   // §2 derivation
  affinity_expiry       // session_affinity_ttl absolute timestamp
}
```

When CLIProxyAPI receives a request:
1. Extract `session_id` per current logic (config.example.yaml:118 — operates today on `metadata.user_id` for Claude Code)
2. Compute `cache_affinity_key` from request body (provider/model/normalized_prefix/tool_manifest/schema_id/cache_control)
3. Lookup `(session_id, cache_affinity_key)` in affinity table; if MATCH AND not-expired → route to bound `account_id`
4. If MISS OR expired → choose new `account_id` per `routing.strategy` (round-robin default), bind, persist with `affinity_expiry = now() + session_affinity_ttl`
5. Failover (config.example.yaml:120 verbatim): "*Automatic failover is always enabled when bound auth becomes unavailable.*" — re-bind to next-priority account if bound account 429/cooling.

The `cache_affinity_key` field is **the eee-specific extension** to CLIProxyAPI's existing session-affinity primitive. Today, session-affinity uses session_id alone. This convention proposes scoping affinity by `(session_id, cache_affinity_key)` tuple to handle cases where the same session forks multiple cache lanes (e.g., session A invokes child_explore in claude-haiku-4-5 + child_adversarial in gpt-5.5 — different `cache_affinity_key`s under same `session_id`).

## §4 warm_fork vs cold_diversity Dispatch Modes (V64-plan §1 step 3 verbatim)

When launching a 3-6 child wave (per advanced-agent-team-standing-directive cite-import-AMBER + parallel-agent-wave §CADP rule 2 max 3 concurrent), choose ONE mode:

| Mode | When | Behavior |
|---|---|---|
| `warm_fork` | Children share stable prefix (same agent_type, same brief shape, same model) | All children bind to SAME `account_id` for `cache_affinity_key`. Cache_read rate maximized. |
| `cold_diversity` | Adversarial independence matters MORE than cache reuse (e.g., 3-agent advanced-team where Agent A=sota-researcher / B=codex-rescue BRIDGE-MODE / C=codex-rescue BRIDGE-MODE adversarial review) | DELIBERATE cross-account scatter. Different `account_id` per child. Lower cache hit rate; higher cross-model independence. Mandatory for `child_adversarial` class per Wave 82 §2. |

Default: `warm_fork` for `child_explore` + `child_audit` (Wave 82 classes); `cold_diversity` REQUIRED for `child_adversarial`.

**`cold_diversity` is a routing/account locality rule and does not replace** the advanced-agent-team-standing-directive invariant requiring ≥2 BRIDGE-MODE GPT-5.5 review voices (different model/provider for adversarial independence). When both apply, satisfy BOTH model/reviewer diversity (BRIDGE-MODE) AND account/cache-lane separation (cold_diversity). Account scatter alone is supportive but not sufficient if both reviewers share the same provider/model/context shape.

The CLASS slot (Wave 82) determines mode. The LANE slot (Wave 81) carries the resulting account_id binding for post-spawn observability.

## §5 Layer-5 Cache Accounting (V64-plan §1 step 4 verbatim)

Cache metrics MUST be reported by `(account_id, cache_affinity_key)` tuple, NOT just by prompt hash. Per Wave 79 baseline ($273.84/day at 95.6% cache_read), aggregate-only metrics hide per-account drift.

Required Mgmt API exposure (today via `/v0/management/auth-files` per Wave 79 ccusage statusline):
- Per-account `cache_read_tokens` (rolling 1h window)
- Per-account `cache_creation_tokens` (rolling 1h window)
- Per-account `request_count` (rolling 1h window — already exposed as `recent_requests`)
- Per-`cache_affinity_key` `account_set` (which accounts have served this lane; alarm if N>1 for warm_fork lanes)

The `cpa-usage-keeper v1.5.2` install (Wave 81-1B `5fedaad`) is the observability primitive for these metrics. Tuning needed: ensure `cache_affinity_key` extraction lands in the keeper's request-tagging path before metrics are emitted.

## §6 Layer-7 Verification Predicates (V64-plan-derived; operator-expanded)

The five predicates below are V64-plan §1 step 5 derived (4-clause source list) plus operator-expanded with explicit response actions. Source-of-truth: `tmp/wave-subagent-context-v64-adoption-plan-2026-05-08.md` §1 step 5 (TIER-3-LOCAL artifact). Layer-7 verification (run plan / pre-commit gate / orchestrator self-audit) MUST reject when a cacheable fork wave has:

| Predicate | Trigger | Response |
|---|---|---|
| Multi-account scatter on warm_fork | `account_id` set > 1 for same `cache_affinity_key` within affinity_expiry window | REJECT — re-dispatch with explicit account binding |
| Model drift within cacheable lane | `model_id` changed between fork-N and fork-N+1 sharing same prefix | REJECT — split into separate lanes |
| Tool-list change after prefix-freeze | AAP L152-157 mid-conversation `tools/list_changed` honored | REJECT — defer tool refresh to conversation boundary |
| Missing affinity TTL metadata | route_key lacks `affinity_expiry` | REJECT — bind missing field before dispatch |
| Schema drift within structured-output lane | `schema_id` changed between requests sharing prefix | REJECT — new schema = new lane |

These predicates are operator-discipline today; promotion to mechanical hook (`tools/v64_cache_locality_verify.py` or `PreToolUse:Agent` gate scoped to fan-out detection) is FORWARD-REF for Wave 84+ if convention sees ≥3 same-arc adoptions.

## §7 Concrete eee Fleet Application

Current fleet (10 OAuth accounts via CLIProxyAPI v6.10.9 commit 785b00c3):
- 7 Claude Max (flat priority=50; round-robin per Wave 79 design)
- 1 Codex Pro (gpt-5.5)
- 1 Gemini (gemini-3-pro-high)
- 1 Antigravity

Convention impact on existing config (NOT APPLIED IN WAVE 83 — illustrative Wave 84+ candidate):

> **Do not mutate config.yaml in this ship.** The YAML block below is a forward-reference for a separate Wave 84+ ship per cycle-300 ONE-LOGICAL-UNIT-PER-FIRE. It is shown here only to illustrate the convention's eventual integration target.

```yaml
# Z:/claude-sota-installed/.cli-proxy-api/config.yaml — DEFERRED Wave 84+ candidate (illustrative only)
routing:
  strategy: "round-robin"   # unchanged from Wave 79
  session-affinity: true    # FLIP from default false → true (DEFERRED to Wave 84+)
  session-affinity-ttl: "1h"  # unchanged (CLIProxyAPI default)
  # Note: cache_affinity_key extension is operator-side discipline only;
  # CLIProxyAPI today affinity-binds by session_id alone. Mechanical
  # extension is FORWARD-REF (would require CLIProxyAPI fork or middleware).
```

The `session-affinity: true` flip is a SEPARATE ship per cycle-300 ONE-LOGICAL-UNIT-PER-FIRE — explicitly NOT included in this Wave 83 convention doc. Wave 84+ candidate with its own GPT-5.5 e2e + Mia pre-apply gate.

## §8 Anti-patterns

- **Round-robin without affinity for cacheable lanes** — current Wave 79 baseline behavior; loses cache hits on parallel fan-out
- **Skipping `cache_affinity_key` derivation at brief composition** — falls back to session_id-only affinity (CLIProxyAPI default); misses model/schema/tool-manifest drift
- **Routing `child_adversarial` through warm_fork** — defeats cross-model independence per Wave 82 §2; MUST cold_diversity
- **Honoring MCP `tools/list_changed` mid-conversation** — refuted by AAP L152-157; breaks cache hits silently. Defer to conversation boundary or accept cache miss explicitly.
- **Modifying existing message content for config updates** — refuted by AAP L139-143; insert new role=developer / role=user messages instead.
- **Cache accounting by prompt hash alone** — hides per-account drift; Layer-7 predicates require `(account_id, cache_affinity_key)` granularity per V64-plan §1 step 4.
- **Treating session-affinity as sufficient for cache locality** — necessary but not sufficient when same session spans multiple cache lanes (different model/schema/tool-manifest)

## §9 Sister-Convention Integration

- `docs/v64-noise-risk-classifier-convention.md` (Wave 82 §4) — CLASS slot determines warm_fork (child_explore/child_audit) vs cold_diversity (child_adversarial). This convention CONSUMES Wave 82's classification.
- `docs/v64-child-artifact-lanes-convention.md` (Wave 81 §3) — manifest.json `agent_id` field becomes route_key.account_id witness for Layer-7 predicates. The two conventions are complementary: §1 binds pre-spawn, §3 persists post-spawn.
- `Z:/claude-sota/.claude/rules/advanced-agent-team-standing-directive.md` (cite-import-AMBER per CLAUDE.md Section 14.5) — invariant #1 ≥2 BRIDGE-MODE GPT-5.5 IS the cold_diversity case at fleet level (different cross-model voice = different `cache_affinity_key` ⇒ different account binding allowed)
- `Z:/claude-sota/.claude/rules/parallel-agent-wave.md §Cache-Aware Dispatch Pacing` (cite-import-AMBER) — CADP rule 5 ≥3 accounts <50% session pre-dispatch fleet probe BECOMES this convention's affinity-table state probe (account_id capacity check happens at Layer-2 routing not just Layer-3 dispatch)
- `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md §Mechanical-mirror exception` (cite-import-AMBER) — cite-class for forward-only enforcement promotions

## §10 Migration of Existing eee Fleet Behavior

Forward-only per `Z:/claude-sota/.claude/rules/port-note-discipline.md` §6 anti-pattern "Do NOT rewrite historical commit bodies/snapshots":
- Wave 79/80/81/82 historical fleet routing STAYS as-is (round-robin without explicit affinity)
- Wave 83+ MUST compute cache_affinity_key at brief composition; record in LANE manifest.json
- The convention's empirical evidence base grows from Wave 83 onward
- Current 95.6% cache_read baseline (Wave 79) was measured WITHOUT explicit cache_affinity_key AND with CLIProxyAPI default `session-affinity: false` (per config.example.yaml:120 verbatim cite); the rate likely benefits from repeated stable prefixes and/or provider-side cache behavior despite no explicit affinity binding. Wave 84+ session-affinity testing will determine whether explicit affinity preserves or improves the baseline; Layer-5 per-account metrics will validate empirically.

## §11 Cite Chain (TIER-1 → TIER-3 lattice)

- TIER-1 direct: `Z:/repos/deps/CLIProxyAPI/config.example.yaml @ ed1458aa6d3430ba59538aeb980b8934f0e80c1f:112-122` (5 verbatim quotes); `Z:/repos/deps/CLIProxyAPI/README.md @ ed1458aa6d3430ba59538aeb980b8934f0e80c1f:5,9,51,56,57` (multi-account); `Z:/repos/deps/awesome-agentic-patterns/patterns/prompt-caching-via-exact-prefix-preservation.md @ 9a7b5c2e04b0f69df9aee7d395353b807d8f0e9f:24,26,28,59-64,139-143,152-157` (6 verbatim quotes)
- TIER-2 (cite-import-AMBER per CLAUDE.md Section 14.5): `Z:/claude-sota/.claude/rules/{advanced-agent-team-standing-directive,parallel-agent-wave,codex-t1-fix-forward-pattern,cross-model-consensus,audit-action-loop,port-note-discipline,codification-threshold,fm17-subagent-fleet-depletion}.md`
- TIER-3-LOCAL: `tmp/wave-subagent-context-v64-adoption-plan-2026-05-08.md` (V64-adoption-plan ADOPT TOP-4 conf=0.86); `docs/v64-child-artifact-lanes-convention.md` (Wave 81 sister); `docs/v64-noise-risk-classifier-convention.md` (Wave 82 sister); `docs/install-provenance.md` Wave 80+ entries (audit trail anchor); `Z:/claude-sota-installed/.cli-proxy-api/config.yaml` (current eee fleet config — proposed mutation queued Wave 84+)

## §12 Update Triggers

Re-evaluate this convention when:
- Wave 84+ ships `session-affinity: true` flip in eee config.yaml — measure cache_read rate Δ vs Wave 79 baseline; adjust affinity_ttl tuning if drift
- A 3rd warm_fork-vs-cold_diversity ambiguous case arises — tighten classification rule
- CLIProxyAPI ships native `cache_affinity_key` extraction (would obviate operator-side derivation)
- A 4th distinct cache primitive surfaces in TIER-1 SOTA (≥4-org Axis-1 firm convergence beyond CLIProxyAPI + AAP) — extend §2 derivation inputs
- Anthropic publishes formal cache-locality guidance for multi-account deployments (would supersede AAP exact-prefix as primary cite)
- Layer-5 per-account metrics show >5% drift in cache_read between accounts within same lane — Layer-7 predicate threshold tuning
- `cpa-usage-keeper` ships `cache_affinity_key` tagging extension — promote operator-side derivation to mechanical
- FM-17.e n=3 promotion → consolidate cache-locality verification into the FM-17.e mitigation path (parent-child cache reuse on parallel fan-out)
