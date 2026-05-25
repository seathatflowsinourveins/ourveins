# Evidence-Governed Harness 10-Gate Framework (Fire 41 IMP-P codification — FRAMEWORK OVERVIEW; post-codex-T1 NEEDS-REVISION conf=0.89 → 8→10 gates via Pattern A fix-forward adding Gate 9 Output-Validation + Gate 10 Side-Effect-Permission-Audit)

> **Purpose**: codify the 10-gate evidence-governed-harness framework that operationalizes Fire 29c REAL GPT-5.5 meta-insight prescription: "Promote eee from a plugin-rich runtime to an **evidence-governed harness**". Each gate is the FRAMEWORK overview only; detailed per-gate codification = future fires per cycle-300 ONE-LOGICAL-UNIT-PER-FIRE.
> **Cite class**: `constituents=[TIER-1-USER-DIRECTIVE @ user-doc 9-layer reference architecture L8 Feedback layer + Fire 29c REAL GPT-5.5 SOTA Convergence Insights Methodology meta-insight, TIER-2 sister-rule cite-import-AMBER @ Z:/claude-sota/.claude/rules/audit-action-loop.md §Hook telemetry contract + Z:/claude-sota/.claude/rules/evidence-policy.md Marker Decay + Z:/claude-sota/.claude/rules/fm20-path-drift-cascade.md + Z:/claude-sota/.claude/rules/synthesis-layer-verify.md §Reporting categories + Z:/claude-sota/.claude/rules/parallel-agent-wave.md §Cache-Aware Dispatch Pacing + Z:/claude-sota/.claude/rules/cross-model-consensus.md §The contract + Z:/claude-sota/.claude/rules/named-failure-modes.md + Z:/claude-sota-installed/docs/rubric.md (Fire 40) + Z:/claude-sota-installed/.claude/rules/multi-source-discovery-breadth-discipline.md (Fire 29a) + Z:/claude-sota-installed/.claude/rules/codex-t1-pattern-b-forward-discipline.md (Fire 37 promoted), TIER-3-LOCAL-OPERATOR-DERIVED @ Fire 28 IMP-P codification + Fire 29c GPT-5.5 confirmation + cumulative Wave 134 series ladder]; effective_tier=TIER-3-LOCAL-COMPOSITION` per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 MIN_PRECEDENCE.

## Meta-insight (REAL GPT-5.5 Fire 29c verbatim)

> "Claude Code research architecture is moving from 'many tools around a strong model' toward a **protocol-governed agent operating system**: registries for discovery, curated code intelligence for context, temporal memory for continuity, and OTel trace/eval loops as the control plane. eee should prepare for H2 2026 by becoming a **provenance-preserving broker** that can **install fewer things, observe more deeply, and promote knowledge only when evidence survives replay**."

## The 10 gates

Each gate is an EVIDENCE-CHECK applied around the existing T1-T7 lifecycle (per `Z:/claude-sota/.claude/rules/cross-model-consensus.md §The contract`). Gates fire at specific lifecycle moments and BLOCK propagation when evidence insufficient. Gates COMPOSE: a single fire may invoke ≥1 gate; high-stakes decisions invoke multiple.

### Gate 1 — Registry Trust

| Aspect | Specification |
|---|---|
| **Subject** | MCP server / plugin / skill source-of-origin signing + provenance trail |
| **Trigger** | INSTALL fire for MCP server / plugin / skill candidate (per `Z:/claude-sota-installed/CLAUDE.md` cardinal-rule-9 install-risk + cardinal-rule-6 official-native-channel) |
| **Verification mechanism** | Source-of-origin check via 5-step probe: (a) Sigstore signature on releases (per SRA D4 Tier-1-OFFICIAL upgrade clause); (b) GitHub Actions provenance attestation; (c) crates.io / npm / PyPI verified-publisher status; (d) maintainer org-affiliation; (e) historical FM-N catalog cross-ref (per `Z:/claude-sota/.claude/rules/named-failure-modes.md`) |
| **Verdict shape** | TRUST-LADDER: Tier-A (signed-official) / Tier-B (signed-named-T2) / Tier-C (unsigned-named-org) / Tier-D (unsigned-individual) / Tier-E (unknown-provenance) |
| **Sister-rule integration target** | future `Z:/claude-sota-installed/.claude/rules/registry-trust-discipline.md` (Fire 41-G1 future detailed codification) + `Z:/claude-sota/.claude/rules/named-failure-modes.md` FM-N cross-ref |
| **CR-12 integration** | Sigstore-verified release → SRA D4 upgrade clause; unsigned → TIER-3-LOCAL-COMPOSITION cite class with disclosure |

### Gate 2 — Tool-Surface Budget

| Aspect | Specification |
|---|---|
| **Subject** | Cap on active MCP tool surface per session (token-cost + context-rot mitigation) |
| **Trigger** | Every session-start hook + every MCP add/wire operation (per `Z:/claude-sota/.claude/rules/parallel-agent-wave.md §Cache-Aware Dispatch Pacing` + user-doc Conflicts-to-Avoid "More than 5 active MCPs without MCP Tool Search enabled") |
| **Verification mechanism** | Probe `mcp__plugin_*__*` tool count per session; compute token-overhead (per `Z:/claude-sota-installed/scripts/mcp_overhead_audit.py` per `Z:/claude-sota/.claude/rules/audit-action-loop.md` ACTIVE auto-fire); flag DRIFT if > 5K tokens active MCP surface OR > 15 active MCPs |
| **Verdict shape** | UNDER-BUDGET / AT-CAP / OVER-BUDGET → DOWNGRADE-WITH-DISCLOSURE if over-cap without MCP Tool Search compensation |
| **Sister-rule integration target** | future `Z:/claude-sota-installed/.claude/rules/tool-surface-budget-discipline.md` (Fire 41-G2 future detailed codification) + `audit-action-loop.md §MCP overhead audit` table row |
| **CR-12 integration** | Per-MCP CR-12 disposition with explicit token-overhead cost; PROVIDER-COMPLEMENT must justify token cost; DUPLICATE-FUNCTIONALITY auto-REJECTs on Gate 2 |

### Gate 3 — Context Freshness

| Aspect | Specification |
|---|---|
| **Subject** | Cite-anchor freshness verification at recall-time (per `Z:/claude-sota/.claude/rules/evidence-policy.md` Marker Decay corollary) |
| **Trigger** | Every cite-citation propagation across fires (per `Z:/claude-sota/.claude/rules/fm20-path-drift-cascade.md` — claim-propagation defense) |
| **Verification mechanism** | Mia probe at synthesis-time (per `Z:/claude-sota-installed/.claude/rules/mia-pre-apply.md` sister discipline if cite-imported): re-verify cite-anchor at HEAD SHA before propagating to next fire's brief |
| **Verdict shape** | FRESH (within ≤24h cite-anchor SHA verified) / STALE (>24h needs re-verify) / DRIFTED (SHA mismatch → REJECT + cascade-fix-forward per FM-20) |
| **Sister-rule integration target** | future `Z:/claude-sota-installed/.claude/rules/context-freshness-discipline.md` (Fire 41-G3) + sibling `fm20-path-drift-cascade.md` + `mia-pre-apply.md` |
| **CR-12 integration** | Cite-class with `[VERIFIED YYYY-MM-DD-HH]` markers per `evidence-policy.md` Marker Decay; STALE cite triggers Mia probe before adoption |

### Gate 4 — Trace Replay

| Aspect | Specification |
|---|---|
| **Subject** | Pre-promotion verification via trace replay (per Fire 29c IMP-R Pass^3 prescription + agentevals-style CI gate) |
| **Trigger** | Knowledge-promotion fires (rule promotion / memory consolidation / pattern codification) OR high-stakes architecture changes |
| **Verification mechanism** | Pass^3 = 3 independent reruns of the proposed change against `evals/codex_miss_cases.jsonl` + `evals/component_comparison_tasks.jsonl` (future Fire 32b harness target); standard-deviation > 0.3 across runs → re-evaluate; agreement <2/3 → REJECT |
| **Verdict shape** | REPLAY-PASS (3/3 agreement within ±0.3 SD) / REPLAY-PARTIAL (2/3 — investigate divergence) / REPLAY-FAIL (<2/3 — REJECT promotion) |
| **Sister-rule integration target** | future `Z:/claude-sota-installed/.claude/rules/trace-replay-discipline.md` (Fire 41-G4) + Fire 32c skill-creator A/B harness + Fire 29c IMP-L eval-corpus-versioning |
| **CR-12 integration** | High-stakes adoption (CR-12 PARTIAL-OVERLAP / PROVIDER-COMPLEMENT / ECOSYSTEM-IMPORT) → Trace Replay MANDATORY before INSTALL |

### Gate 5 — Memory Promotion

| Aspect | Specification |
|---|---|
| **Subject** | 4-class memory taxonomy + promotion gate (per Fire 29c GPT-5.5 Axis-4 + IMP-N Forward Top-5 #3) |
| **Trigger** | Memory write events (mcp__memory__* + graphiti add_memory + MEMORY.md updates + planning-with-files findings.md writes) |
| **Verification mechanism** | Classify memory into 4 classes: SEMANTIC-FACT (auto-promote — mcp-memory sqlite-vec) / EPISODIC-TRACE (auto-promote — graphiti FalkorDB) / PROCEDURAL-SKILL-OR-RULE (REQUIRES Trace Replay PASS before promote) / OPERATIONAL-RUNBOOK (auto-promote — MEMORY.md / planning-with-files findings.md) |
| **Verdict shape** | AUTO-PROMOTE (SEMANTIC + EPISODIC + OPERATIONAL) / TEST-GATED-PROMOTE (PROCEDURAL needs Gate 4 PASS first) / REJECT (failed classification) |
| **Sister-rule integration target** | future `Z:/claude-sota-installed/.claude/rules/memory-promotion-discipline.md` (Fire 41-G5 = also IMP-N Fire candidate from Forward Top-5 #3) + sibling existing memory MCPs |
| **CR-12 integration** | New memory classes are PROVIDER-COMPLEMENT (4-class taxonomy adds discipline atop existing mcp-memory + graphiti + MEMORY.md infrastructure) |

### Gate 6 — Consistency

| Aspect | Specification |
|---|---|
| **Subject** | Cross-session + cross-fire consistency verification (per `Z:/claude-sota/.claude/rules/fm20-path-drift-cascade.md` + `Z:/claude-sota-installed/.claude/rules/parallel-session-worktree-isolation.md` cite-import-AMBER) |
| **Trigger** | Every fire that propagates claims/cites from prior fire OR every parallel-session merge event |
| **Verification mechanism** | (a) Cite-trail invariant check: prior-fire cite-anchor still exists at HEAD SHA + claim text matches (per `port-note-discipline.md §5 Discipline 4` n-counter audit) (b) Parallel-session merge gate: planning-with-files plan-attestation SHA-256 verification (when planning-with-files installed); (c) FM-02 sub-class (b)+(c) defense atomic single-shell git add + commit --only -- pathspec |
| **Verdict shape** | CONSISTENT / DRIFT-DETECTED (Mia investigation triggered) / ABSORBED (FM-02 sub-class (c) commit-layer absorption documented) |
| **Sister-rule integration target** | future `Z:/claude-sota-installed/.claude/rules/consistency-discipline.md` (Fire 41-G6) + sibling fm20-path-drift-cascade.md + parallel-session-worktree-isolation.md |
| **CR-12 integration** | Cross-fire claim-propagation requires CONSISTENT verdict; DRIFT-DETECTED triggers Mia + FM-20 cascade defense |

### Gate 7 — Identity

| Aspect | Specification |
|---|---|
| **Subject** | Agent-id / agent-type propagation across multi-agent + multi-session events (per `Z:/claude-sota/.claude/rules/audit-action-loop.md §Hook telemetry contract`) |
| **Trigger** | Every subagent dispatch + every Hook event (PreToolUse / PostToolUse / SubagentStop / etc.) |
| **Verification mechanism** | Per `_SubagentContextMixin` TypedDict mandate (Z:/repos/deps/claude-agent-sdk-python/src/claude_agent_sdk/types.py:246-262 @ HEAD b512f256): every JSONL-emitting hook in `.claude/hooks/scripts/*.py` MUST persist `agent_id: str` + `agent_type: str` when present; main-session writes persist `null` for absent attribution |
| **Verdict shape** | ATTRIBUTED (agent_id + agent_type present) / MAIN-SESSION (agent_id=null + main-context confirmed) / MALFORMED (missing fields → audit hook FAIL-CLOSED + queue compliance fix) |
| **Sister-rule integration target** | future `Z:/claude-sota-installed/.claude/rules/identity-discipline.md` (Fire 41-G7) + sibling audit-action-loop.md §Hook telemetry contract |
| **CR-12 integration** | Hook scripts emit JSONL with `agent_id`/`agent_type` per SDK contract; UNATTRIBUTED events trigger Identity Gate FAIL |

### Gate 8 — Cost-Shape

| Aspect | Specification |
|---|---|
| **Subject** | Per-task cost envelope tracking (per user-doc L8 Feedback layer + ccusage + Splitrail) |
| **Trigger** | Every fire commit + every session-end + every multi-fire arc close |
| **Verification mechanism** | (a) `ccusage` per-session token+cost report; (b) Splitrail cross-CLI cost monitor (per user-doc Feedback layer); (c) Langfuse OTel trace export (per Fire 29c IMP-O eee OTel schema); (d) Compute cost-shape ratios (per-fire avg / max / p95) |
| **Verdict shape** | UNDER-ENVELOPE / AT-CAP / OVER-ENVELOPE → escalate to user via PushNotification; UNKNOWN-COST → backfill via ccusage probe |
| **Sister-rule integration target** | future `Z:/claude-sota-installed/.claude/rules/cost-shape-discipline.md` (Fire 41-G8) + ccusage integration + Fire 29c IMP-O eee OTel schema (when codified) |
| **CR-12 integration** | High-cost fires require explicit `cost-envelope:` declaration in commit body; OVER-ENVELOPE without justification → REJECT next-fire dispatch |

### Gate 9 — Output Validation / Schema Conformance (added Pattern A fix-forward 2026-05-11)

| Aspect | Specification |
|---|---|
| **Subject** | Schema validation for ALL structured outputs: codex T1-T7 verdicts (JSON-strict), hook JSONL events (per `audit-action-loop.md §Hook telemetry contract`), telemetry schemas (Langfuse OTel + mcp_overhead_audit.jsonl), memory-write payloads (graphiti / mcp-memory / MEMORY.md frontmatter), promotion artifacts (rule promotions / skill SKILL.md frontmatter / docs/rubric.md scoring outputs) |
| **Trigger** | T1 / T2 / T3 / T5 / T7 + every hook event JSONL emission + every memory write + every cross-model consult output |
| **Verification mechanism** | (a) JSON-strict parse on codex verdicts (reject if parse-fails OR if required fields missing per consult prompt's JSON shape); (b) JSONSchema validation on hook JSONL events (per `_SubagentContextMixin` TypedDict + per-event schemas at `Z:/repos/deps/claude-agent-sdk-python/src/claude_agent_sdk/types.py:265-306`); (c) frontmatter Pydantic validation on SKILL.md + agent.md per CCBP `claude-skills.md` 15-field spec; (d) silent-telemetry-failure detection: every JSONL writer MUST emit observable success/fail signal; missing-emission within expected window → Gate 9 FAIL |
| **Verdict shape** | SCHEMA-VALID / SCHEMA-DRIFTED (missing field / wrong type → cascade-fix-forward per FM-20) / PARSE-FAIL (REJECT propagation) / SILENT-TELEMETRY-FAILURE (audit hook backfill required) |
| **Sister-rule integration target** | future `Z:/claude-sota-installed/.claude/rules/output-validation-discipline.md` (Fire 41-G9) + sibling audit-action-loop.md §Hook telemetry contract + cross-model-consensus.md §The contract |
| **CR-12 integration** | Schema-validation MANDATORY for every CR-12 PRIMARY install — INSTALL row in manifest §Section 17 MUST cite expected schema for any structured output the primitive produces |

### Gate 10 — Side-Effect / Permission Boundary Audit (added Pattern A fix-forward 2026-05-11)

| Aspect | Specification |
|---|---|
| **Subject** | Audit of side-effects + permission-boundary crossings: install-time effects (filesystem writes outside `Z:/claude-sota-installed/`), hook side-effects (network calls / file mutations / process spawns), memory writes (external DB persistence), subagent dispatch (parallel filesystem writes), commit-time automation (T2/T3/T4 codex hooks firing destructive operations) |
| **Trigger** | INSTALL fire + every hook execution + every memory write + every subagent dispatch + every commit-time automation |
| **Verification mechanism** | (a) Filesystem-write enumeration: probe write-paths against allowlist (`Z:/claude-sota-installed/` + `Z:/claude-sota-installed-state/` + venv paths); flag DRIFT if writes escape; (b) Network-call enumeration: probe outbound connections against MCP+codex+claude allowlist; (c) Permission-boundary check: subagent dispatched in `bypassPermissions` mode? Memory write to external DB without explicit `allow[]` entry? Hook spawns subprocess outside `safety_guard.py` patterns?; (d) CR-9 sibling-bleed defense: install-class operations MUST path-rewrite `Z:/claude-sota/` paths before applying |
| **Verdict shape** | WITHIN-BOUNDARY / BOUNDARY-CROSSING-DOCUMENTED (CR-9 sibling-bleed defense applied) / BOUNDARY-VIOLATION (REJECT + escalate to user via PushNotification) |
| **Sister-rule integration target** | future `Z:/claude-sota-installed/.claude/rules/side-effect-boundary-discipline.md` (Fire 41-G10) + sibling layered-gates-architecture.md §4.1 Wave 11A ACCEPTED SAFETY REGRESSION precedent + CR-9 cardinal-rule sibling-bleed defense |
| **CR-12 integration** | INSTALL-class CR-12 PRIMARY paths MUST declare side-effect surface in commit body; PROVIDER-COMPLEMENT classifications require explicit boundary disclosure |

## Composition rules

Gates compose at specific lifecycle moments per T1-T7 framework:

| T-touchpoint | Gates invoked |
|---|---|
| T0 candidate-list challenge | Gate 1 (registry trust) + Gate 2 (tool-surface budget projection) |
| T1 pre-edit consult | Gate 3 (context freshness for cite-imports) + Gate 9 (consult-output schema validation) |
| T2 working-tree review | Gate 6 (consistency: parallel-session merge state) + Gate 8 (cost-shape pre-commit) + Gate 9 (working-tree changes schema-validation) + Gate 10 (side-effect audit on staged changes) |
| T3 postcommit audit | Gate 7 (identity: hook telemetry persisted) + Gate 8 (cost-shape post-commit) + Gate 9 (hook JSONL schema validation) |
| T4 post-push cumulative | Gate 4 (trace replay for high-stakes branch changes) + Gate 6 (cross-session consistency) |
| T5 plan-stage | Gate 4 (trace replay for plan validation) + Gate 5 (memory promotion if plan promotes rule) + Gate 9 (plan artifact schema validation) |
| T6 stop-gate | Gate 6 (final consistency check) + Gate 8 (session-end cost-shape) |
| T7 ask-without-act | Gate 5 (memory promotion if ask triggered memory write) + Gate 9 (memory artifact schema validation) |
| (memory writes) | Gate 5 (memory promotion 4-class) + Gate 7 (identity) + Gate 9 (memory payload schema) + Gate 10 (memory write boundary audit) |
| (subagent dispatch) | Gate 7 (identity attribution) + Gate 2 (tool-surface budget for subagent's MCP set) + Gate 10 (subagent boundary audit per CR-9) |
| (INSTALL operations) | Gate 1 (registry trust) + Gate 10 (side-effect+sibling-bleed boundary audit) + Gate 9 (install-artifact schema validation) |
| (cycle-322 rule promotion) | Gate 4 MANDATORY (trace replay for promoted rule) + Gate 5 (PROCEDURAL-SKILL-OR-RULE class) + Gate 9 (rule frontmatter schema validation) |

## Status (current eee implementation)

| Gate | Status | Notes |
|---|---|---|
| Gate 1 Registry Trust | ✅ MOSTLY-WIRED (Fire 46 upgrade) | CR-9 install-risk has version-pin + sibling-bleed defense; **Sigstore verification operational** post Fire 44 install + Fire 45 6-step discipline + Fire 46 1st real verify-blob SUCCESS (Tier-A signed-official verdict on sigstore/cosign v3.0.6 cosign-windows-amd64.exe; Rekor logIndex 1244819972); mechanical-enforcement hook still NOT-YET-WIRED (Fire 41-G1-MECHANICAL future); operator-side discipline ACTIVE |
| Gate 2 Tool-Surface Budget | ⚠️ PARTIAL | `mcp_overhead_audit.py` ACTIVE (audit-action-loop.md table); ≤5-MCP cap convention exists but not formally codified; Fire 41-G2 future |
| Gate 3 Context Freshness | ⚠️ PARTIAL | `evidence-policy.md` Marker Decay codified; FM-20 cascade defense codified; auto-stale-detection at recall-time NOT YET wired; Fire 41-G3 future |
| Gate 4 Trace Replay | ❌ NOT-YET-WIRED | Pass^3 prescription per Fire 29c IMP-R; depends on Fire 32 skill-creator A/B harness install + Fire 29c IMP-L eval-corpus-versioning |
| Gate 5 Memory Promotion | ⚠️ PARTIAL | 3 memory MCPs (mcp-memory + graphiti + ECC memory) installed; 4-class taxonomy NOT YET codified; depends on Fire 41-G5 = IMP-N Forward Top-5 #3 |
| Gate 6 Consistency | ✅ MOSTLY-WIRED | FM-20 cascade defense + parallel-session-worktree-isolation.md + FM-02 sub-class (b)+(c) recovery all codified; explicit gate-form not yet codified |
| Gate 7 Identity | ⚠️ PARTIAL | Hook telemetry contract per audit-action-loop.md §Hook telemetry contract codified; per-hook compliance count NOT INDEPENDENTLY VERIFIED at this framework-codification time (audit-action-loop.md §Hook telemetry contract spot-check exists but precise N varies as new hooks land); compliance audit deferred to Fire 41-G7 detailed codification |
| Gate 8 Cost-Shape | ⚠️ PARTIAL | ccusage installed (npm-global); Splitrail NOT installed (per Fire 28 gap matrix); Langfuse OTel installed but schema NOT YET standardized (depends on Fire 29c IMP-O); Fire 41-G8 future |
| Gate 9 Output Validation | ⚠️ PARTIAL | JSON-strict parse on codex T1 verdicts informal practice; `_SubagentContextMixin` hook JSONL schema codified at sister audit-action-loop.md; mechanical JSONSchema validator NOT YET wired; Fire 41-G9 future detailed codification |
| Gate 10 Side-Effect / Permission Boundary Audit | ⚠️ PARTIAL | CR-9 sibling-bleed defense codified at CLAUDE.md cardinal-rule-9; layered-gates-architecture.md §4.1 Wave 11A allowlist-removal precedent codified; safety_guard.py narrow deny-list active; mechanical side-effect enumeration NOT YET wired; Fire 41-G10 future |

**Cumulative**: 0 fully-wired gates / 6 PARTIAL / 2 MOSTLY-WIRED / 2 NOT-YET-WIRED out of 10 → **~40% gate-coverage** post-Fire-46 Gate 1 upgrade (was ~33% at framework codification; Fire 46 first concrete gate-status advancement via dogfood-from-installs).

## How to apply

Per T-touchpoint composition table:
1. **At fire-construction time**: identify which T-touchpoints fire invokes → determine which gates auto-apply
2. **Per-gate verdict**: each invoked gate produces verdict (PASS / DRIFT / FAIL) → composed verdict = strict AND (any FAIL → REJECT propagation)
3. **Cite gate-verdicts in commit body**: e.g., `gates: G3-FRESH + G6-CONSISTENT + G8-UNDER-ENVELOPE` after T2/T3 lifecycle
4. **Update gate status table**: as future detailed-codification fires (Fire 41-G1 through G8) complete, flip ⚠️/❌ → ✅

## Promotion threshold (framework-level promotion eligible; per-gate detailed codification deferred)

This framework is the OVERVIEW codification post-cycle-322 promotion ladder advance to n=7 (this Fire 41 = 7th recursive Forward Discipline #2 dogfood instance). Per cycle-322 jurisdiction:
- Framework itself = **eligible/complete** at framework-level (n=7 ladder advance + REAL GPT-5.5 cross-model gate satisfied via codex T1 NEEDS-REVISION conf=0.89 + Pattern A 6-edit applied)
- Each individual gate's detailed codification (Fire 41-G1 through G10) = future fires per cycle-300 ONE-LOGICAL-UNIT-PER-FIRE
- cycle-322 promotion of individual gates as formal rules = n≥3 dogfood evidence per gate (deferred-pending-evidence)

**Framework promotion eligible**; per-gate codification deferred until each gate has ≥3 dogfood instances. Fire 41 ships the FRAMEWORK; promotion-to-rule-tier per gate happens as gates mature.

## Anti-patterns

- **Skip gate composition for "small" fires** — refuted by Fire 29c GPT-5.5 meta-insight; promote knowledge only when evidence SURVIVES REPLAY. Even small fires accumulate cost-shape + consistency debt.
- **Wire gates without sister-rule integration** — refuted by Fire 28 IMP-E cross-reference discipline + kiss-dry-yagni Must-Never #4. Each gate's mechanism MUST cite existing sister-rule + identify where it operates within T1-T7 lifecycle.
- **Implement all 10 gates in single fire** — refuted by cycle-300 ONE-LOGICAL-UNIT-PER-FIRE. Fire 41 is FRAMEWORK ONLY; detailed gate codifications = 10 separate future fires.
- **Trace Replay (Gate 4) MANDATORY without Fire 32 skill-creator + Fire 29c IMP-L corpus versioning** — refuted by dependency chain. Gate 4 cannot mechanically enforce until prerequisite IMPs land.
- **Cost-Shape (Gate 8) enforcement without ccusage + Splitrail integration** — refuted by dependency chain. Gate 8 starts as ADVISORY until cost-monitoring infrastructure is wired.
- **Memory Promotion (Gate 5) auto-classify without 4-class taxonomy** — refuted by dependency on Fire 41-G5 = IMP-N codification. Until then, Gate 5 PARTIAL via ad-hoc classification.
- **Registry Trust (Gate 1) without Sigstore CLI** — refuted by Fire 28 IMP-G dependency. Sigstore CLI install + cosign verify-attestation discipline must precede mechanical Gate 1 enforcement.
- **Schema drift unchecked** (Gate 9 anti-pattern) — refuted by codex T1 NEEDS-REVISION conf=0.89 Pattern A fix-forward (added Gate 9). Hook JSONL field-additions / SKILL.md frontmatter drift / codex verdict shape changes go silent unless Gate 9 fires; cascade-fix-forward per FM-20.
- **Silent telemetry failure** (Gate 9 anti-pattern) — refuted by Fire 29c IMP-O OTel-discipline cite. Hook scripts that swallow exceptions during JSONL write OR codex hooks that silently no-op on parse fail OR memory writes that fail without observable signal all fall under Gate 9 SILENT-TELEMETRY-FAILURE verdict.
- **Evidence laundering through stale cites** (Gate 3 + Gate 9 anti-pattern) — refuted by FM-20 cascade defense + Marker Decay corollary. Citing prior-fire verdict file at stale SHA propagates stale evidence into next fire; Gate 3 STALE verdict + Gate 9 SCHEMA-DRIFTED if cite-anchor schema changed.
- **Side-effectful verification probes** (Gate 10 anti-pattern) — refuted by Gate 10 boundary audit. A verification probe that ALSO writes to filesystem / sends network call / mutates state is itself a side-effect that needs Gate 10 audit. Mia probes must be PURE-READ; if probe needs to mutate, declare boundary in commit body.
- **Over-broad gate strictness causing false REJECT propagation** — refuted by Pattern A fix-forward discipline. A gate that REJECTs on every minor schema variation cascades to block valid fires; gate verdict thresholds (e.g., Gate 9 SCHEMA-DRIFTED vs PARSE-FAIL) must distinguish recoverable-fix-forward from REJECT-and-revert.
- **Cost observability without enforcement** (Gate 8 anti-pattern extension) — refuted by Fire 29c IMP-O OTel-schema codification. Installing ccusage + Splitrail + Langfuse without `cost-envelope:` commit-body discipline produces UNKNOWN-COST verdict on every fire; observability tools require ENVELOPE policy to convert observation into enforcement.

## Sister-rule integration (11 cites)

**Sister rules (10)**:
1. `Z:/claude-sota/.claude/rules/cross-model-consensus.md §The contract` — T1-T7 lifecycle framework that gates compose around
2. `Z:/claude-sota/.claude/rules/audit-action-loop.md §Hook telemetry contract` — Gate 7 Identity verification mechanism
3. `Z:/claude-sota/.claude/rules/evidence-policy.md` Marker Decay — Gate 3 Context Freshness foundation
4. `Z:/claude-sota/.claude/rules/fm20-path-drift-cascade.md` — Gate 3 + Gate 6 cite-propagation defense
5. `Z:/claude-sota-installed/.claude/rules/parallel-session-worktree-isolation.md` (cite-import-AMBER) — Gate 6 Consistency parallel-session merge defense
6. `Z:/claude-sota/.claude/rules/parallel-agent-wave.md §Cache-Aware Dispatch Pacing` — Gate 2 Tool-Surface Budget reference
7. `Z:/claude-sota/.claude/rules/named-failure-modes.md` — Gate 1 Registry Trust FM-N catalog cross-ref
8. `Z:/claude-sota/.claude/rules/synthesis-layer-verify.md §Reporting categories` — Gate 4 Trace Replay verdict-shape source
9. `Z:/claude-sota-installed/.claude/rules/multi-source-discovery-breadth-discipline.md` (Fire 29a) — Gate 1 source-of-origin probe complement
10. `Z:/claude-sota-installed/.claude/rules/codex-t1-pattern-b-forward-discipline.md` (Fire 37) — Gate 4 Trace Replay budget discipline

**Forward-ref (1)**:
11. `Z:/claude-sota-installed/docs/rubric.md` (Fire 40) — gate-verdicts feed rubric scoring (Gate 4 → C25 Capability; Gate 8 → P5 Performance)

## Update triggers

Re-evaluate this framework when:
- Each Fire 41-G1 through G10 detailed codification lands — update §Status table (⚠️/❌ → ✅)
- An 11th gate emerges (e.g., from future Anthropic CC SDK primitives) — extend §The 10 gates table
- Composition rule evolves (e.g., new T-touchpoint T8 ships) — update §Composition rules table
- An auto-enforcement primitive ships that mechanizes a gate (e.g., Anthropic CC ships native registry-trust hook) — flip gate from PARTIAL/NOT-YET-WIRED to ✅ MECHANICALLY-ENFORCED
- Cycle-322 n=3 dogfood evidence accumulates per gate — promote gate to formal local rule (per Fire 37 cycle-322 promotion precedent)
- A gate produces FALSE-POSITIVE OR FALSE-NEGATIVE (Mia surfaces drift) — debug + refine gate verification mechanism

## Cite class for this framework

`constituents=[TIER-1-USER-DIRECTIVE @ user-doc L8 + Fire 29c GPT-5.5 meta-insight + 6-axis recommendations, TIER-2 sister-rule cite-import-AMBER @ 10 sister rules + 1 forward-ref doc (11 total cites), TIER-3-LOCAL-OPERATOR-DERIVED @ Fire 28 IMP-P codification + Wave 134 series cumulative ladder]; effective_tier=TIER-3-LOCAL-COMPOSITION` per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 MIN_PRECEDENCE.

## Recursive promotion-fire dogfood note

This Fire 41 framework codification is the 7th Forward Discipline #2 recursive dogfood instance (post-cycle-322 promotion ladder advance n=6→n=7). The framework itself is META-process Tier-2 codification (defines HOW future evidence-governed-harness gates compose); Forward Discipline #2 applies to its codex T1 review.
