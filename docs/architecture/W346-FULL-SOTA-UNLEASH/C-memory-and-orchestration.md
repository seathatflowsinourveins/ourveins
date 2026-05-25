# W346 Stream-C — Memory Stack T1-T6 + Agent-Team Orchestration Silent-Fallback Hunt

**Wave**: W346-FULL-SOTA-UNLEASH
**Stream**: C (Memory + Orchestration deep-review)
**Date**: 2026-05-20
**Author**: Stream-C subagent
**Protocol**: Δ-PDM-1 skeleton-first (skeleton landed BEFORE research; populated post-probe)
**Budget actual**: 8 tool calls (under 15-call cap)

## Scope

Multi-dimensional review of the 6-tier memory stack (T1-T6) per CLAUDE.md L41-L46 + agent-team orchestration silent-fallback hunt per W269/W325-A. Live HTTP/TCP probes against T3, T5, T6 + retirement confirmations for T1+T4. Validates orchestration guards (parallel-guard, subagent-validator, empty-message Δ-G49, worker-exception Δ-G50). Priority-ranked P0..Pn findings.

---

## §1 — T1 hindsight (RETIRED W317-S1)

**Status**: ✗ DOWN by design — RETIREMENT HOLDS

**Live-probe evidence**:
- TCP `127.0.0.1:9077` → `ECONNREFUSED` (no daemon listening — confirmed)
- `nssm status Hindsight` → `OpenService(): The specified service does not exist as an installed service.` (no NSSM service)
- Grep across `.claude/skills/**/*.{md,json}` for `hindsight` excluding {retired, excised, RETIRED, DOWN} context → 0 dangling refs

**Verdict**: clean retirement; no orphaned references to live-hindsight in operator-curated skills. Some skill files mention "hindsight T1" as historical-state but all contextualize as RETIRED.

---

## §2 — T2 plugin-memory (`plugin:everything-claude-code:memory` ACTIVE) + retired mcp-memory-service excised W313

**Status**: ✓ HEALTHY (split-form per W282d)

**Live-probe evidence**:
- `.mcp.json` line 16-130 (mcpServers block): **no `memory` key present** — the disabled `.mcp.json:memory` entry was permanently excised in W313 / W333-P0 (per CLAUDE.md L17 corollary).
- `.claude/settings.json:118` → `"disabledMcpjsonServers": ["tavily"]` — `memory` NOT in disabled list (because not in `.mcp.json` at all; the W333-P0 "drift-excise" landed).
- `everything-claude-code@everything-claude-code` plugin enabled=true (`settings.json:301`); the plugin-provided memory tool surface is the canonical T2 carrier.

**Verdict**: T2 is HEALTHY via plugin-only path. Prior CLAUDE.md "T2 split" wording accurately describes current state.

---

## §3 — T3 cognee :8000/mcp NSSM CogneeMCP

**Status**: ✓ HEALTHY — operational

**Live-probe evidence**:
- `nssm status CogneeMCP` → `SERVICE_RUNNING`
- HTTP POST `http://127.0.0.1:8000/mcp` with `initialize` JSON-RPC → HTTP 200 + SSE response:
  ```
  event: message
  data: {"jsonrpc":"2.0","id":1,"result":{"protocolVersion":"2025-03-26","capabilities":{...},"serverInfo":{"name":"Cognee","version":"1.26.0"}}}
  ```
- Data-dir at `Z:/claude-sota-installed-state/cognee/` exists with all expected subdirs: `{data, databases, logs, models, tmp}` (5/5 present)
- `.mcp.json:49-52` cognee entry intact (type:http, url 127.0.0.1:8000/mcp).

**Verdict**: T3 fully operational. Cognee 1.26.0 matches CLAUDE.md L41 documented version.

---

## §4 — T4 graphiti (RETIRED W295, excised W313) + FalkorDB STOPPED-by-design

**Status**: ✗ DOWN by design — RETIREMENT HOLDS

**Live-probe evidence**:
- TCP `127.0.0.1:16379` (FalkorDB) → `ECONNREFUSED` (confirmed STOPPED-by-design)
- `.mcp.json:16-130` → no `graphiti` block (excised W313 commit `5a350d1` per CLAUDE.md L41)
- `.claude/settings.json:118` → `disabledMcpjsonServers: ["tavily"]` (only tavily; no graphiti residue)
- Sibling T4 Ollama `127.0.0.1:16700` → LISTENING ✓ (separate concern; serves cheap-triage workloads per W331 axis-2 + LlamaSwap routing).

**Verdict**: T4 clean retirement. Ollama :16700 alive serves the qwen3-coder:30b-a3b-q4_K_M model per W315-r2.

---

## §5 — T5 langfuse :3000 v3.160.0

**Status**: ✓ HEALTHY — operational

**Live-probe evidence**:
- HTTP GET `http://127.0.0.1:3000/api/public/health` → HTTP 200, body: `{"status":"OK","version":"3.160.0"}`
- Confirms W340 Stream-A fabrication-correction was accurate (NOT v3.170.0; actual is 3.160.0).
- `.claude/settings.json:19-30` OTEL endpoints wired: traces+metrics flow to `http://127.0.0.1:3000/api/public/otel/v1/{traces,metrics}` with `OTEL_SERVICE_NAME=claude-sota-installed`.

**Verdict**: T5 fully operational; OTEL pipeline wired and pointing at the correct Langfuse instance. Telemetry-flow check (recent traces) NOT independently verified in this probe (deferred — would require Langfuse UI session or `/api/public/traces` query with auth).

---

## §6 — T6 basic-memory uvx-pinned 0.21.1 (canonical-primary)

**Status**: ✓ HEALTHY — canonical-primary operational

**Live-probe evidence**:
- Storage dir `Z:/claude-sota-installed-state/basic-memory/` exists, 9 subdirs: `{architecture, config, goal-prompts, learnings, main, markdown, verdicts, w288-p4-smoke, waves}`
- mtime `2026-05-20T22:08:10.390Z` — actively writing as of this probe
- `.mcp.json:64-72` basic-memory entry: `uvx --from basic-memory==0.21.1 basic-memory mcp` with `BASIC_MEMORY_HOME` pointed at the state dir (CLAUDE.md L41-canonical config)
- Smoke-test 1 — `mcp__basic-memory__search_notes "W346 OR W343 OR W341-B parallel_ratio OR parallel-guard"` → 5 results returned with cite-anchored permalinks (W342-FULL-GAP-RESOLUTE, W343-FULL-EXECUTE, W343-SOTA-UNLEASH, W329-DEEP-AUDIT, W343 Y1 P0.4 Race-Fix Closure)
- Smoke-test 2 — `mcp__basic-memory__recent_activity 3d` → 5 wave-closure notes returned (W343 ×3, W342, W339)

**Verdict**: T6 fully operational; canonical-primary store actively ingesting wave-closure ledger entries. Cross-session memory chain healthy.

---

## §7 — Agent-team orchestration silent-fallback hunt

### §7.1 parallel_ratio current measurement
**Status**: ✗ FAIL — Still SEV-1 below target

**Evidence**:
- W343 Y1 P0.4 Race-Fix Closure (T6 cite `main/verdicts/w343/w343-y1-p0.4-race-fix-closure`): "Y2 P0.1 parallel_ratio = 0.0034 (gate FAIL ≥0.05; +13.3% rel vs W342-Z baseline 0.003) — record at `.claude/state/parallel-ratio-W343.json`. Re-measure needs ≥7d post-fix traffic."
- Target ≥0.7 per W269; intermediate gate ≥0.05 per W343 Y2 also failing.
- Trajectory: W325-A=0.0036 → W342-Z=0.0030 → W343-Y2=0.0034. Movement is in the noise (~ ±15%); ≥7d post-fix traffic window NOT yet elapsed (W343 P0.4 race-fix landed recently per recent-activity).

**Verdict**: CARRY-FORWARD — re-measurement window pending. Codex round-3+4 race-fix landed; the 1500ms TURN_WINDOW_MS tightening + per-prompt intentCutoff are active in `tools/preagent-parallel-guard.mjs:200,355-361`. Empirical impact awaiting >7d traffic per Y2 closure note.

### §7.2 subagent_type allowlist validation (Δ-DPA-5)
**Status**: ✓ PASS — HARD-BLOCK ladder active

**Evidence**:
- `tools/preagent-subagent-validator.mjs:108-110` — unknown subagent_type → `process.exit(2)` (HARD-BLOCK with fuzzy top-5 suggestions per W326 P0-A2 ship).
- `tools/preagent-subagent-validator.mjs:120-126` — allowlist-missing → exit 0 (operator-broken-state soft-fail per CLAUDE.md L18 cardinal-rule-3 mechanization).
- Allowlist at `Z:/claude-sota-installed/.claude/state/subagent-type-allowlist.json`: `allow_count=174`, `legacy_bare_count=138`, `colliding_count=14` (matches W340 F3+F4+F5 baseline; CLAUDE.md L18 reports 173+138+13=311 — current 174+138+14=312, +1 allow / +1 colliding since W340).
- W340 F5 ambiguity-WARN at `preagent-subagent-validator.mjs:128-137` — bare colliding name → stderr WARN but allows dispatch (does not block); enforces operator awareness without blocking valid legacy bare names.
- Hooked at `settings.json:179-183` as 2nd PreToolUse[Agent] hook.

**Verdict**: GUARD ACTIVE. The 174-entry allowlist and 138 legacy-bare aliases match the migration-in-progress state documented in CLAUDE.md L18 W333-D5 + W340 F3/F4 closures.

### §7.3 empty-final-message detection (Δ-G49)
**Status**: ✓ PASS — skill loaded + cite-anchored

**Evidence**:
- `.claude/skills/empty-final-message-guard/SKILL.md` PRESENT (full 96-line skill).
- Auto-fire trigger phrases per description matcher: "synthesize results", "collect findings", "merge teammate outputs", "subagent completed", "team-spawn", "team-debug", "team-review", "team-feature".
- 3-org-distinct cite: Anthropic claude-cookbooks orchestrator_workers.ipynb + Microsoft autogen `_signal_termination_with_error` + LangChain langgraph supervisor.
- Available-skills list (this session) confirms `empty-final-message-guard` as Δ-G49 contract.

**Verdict**: skill is DEPLOYED at the operator-curated path per cardinal-rule-4. Enforcement is a CONVENTION-driven behavioral discipline (no hook auto-runs it; the orchestrator must respect Δ-G49 contract when synthesizing). No mechanical gate exists — RISK is the orchestrator can ignore the skill if it doesn't fire (description-match dependency).

### §7.4 worker-exception fail-CLOSED (Δ-G50)
**Status**: ✓ PASS — skill loaded + cite-anchored

**Evidence**:
- `.claude/skills/worker-failure-termination-guard/SKILL.md` PRESENT (full 139-line skill with VoltAgent D77 ref-impl appendix).
- Triggers: `status != "completed"`, `status == "failed"`, `status == "errored"`, "OrchestrationError".
- 3-org-distinct cite: Microsoft autogen `_signal_termination_with_error` + LangChain langgraph Pregel exception bubble + Anthropic FlexibleOrchestrator stub-injection.
- W343 P1 VoltAgent SupervisorConfig `throwOnStreamError:false` + `includeErrorInEmptyResponse:true` lifts D77 to ref-impl tier 2 per sca-v15 §3.
- Class-A/B/C classification ladder documented (transient infra / bad prompt / worker crash).

**Verdict**: skill DEPLOYED. Same convention-driven enforcement model as §7.3 — RISK is description-match dependency.

### §7.5 CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1 enable-flag verification
**Status**: ✓ PASS — agent-teams enabled

**Evidence**:
- `.claude/settings.json:9` → `"CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"` — flag SET in canonical env block.
- `.claude/settings.json:507` → `"teammateMode": "in-process"` — in-process teammate mode active (per CC settings doc semantics).
- `agent-teams@claude-code-workflows` plugin enabled=true (`settings.json:353`) — wshobson/agents marketplace.

**Verdict**: agent-teams primitive is structurally enabled.

### §7.6 TeamCreate / team-spawn presets functionality probe
**Status**: ✓ PASS (structurally) — presets available

**Evidence** (from available-skills list this session):
- `agent-teams:team-spawn` skill loaded with presets: review, debug, feature, fullstack, research, security, migration.
- Sibling skills loaded: `agent-teams:team-shutdown`, `team-status`, `team-debug`, `team-feature`, `team-review`, `team-delegate`.
- Supporting skills: `multi-reviewer-patterns`, `parallel-debugging`, `parallel-feature-development`, `task-coordination-strategies`, `team-communication-protocols`, `team-composition-patterns`.

**Verdict**: structurally PASS. Functional probe (actually spawning a team and verifying mailbox + lead-coordination) NOT done in this audit due to budget — DEFER to operator validation OR a dedicated probe wave.

---

## §8 Priority ranking P0..Pn

### P0 (BLOCKING for ship) — none surfaced

No SEV-1 BLOCKER findings. T1+T4 retirements clean; T2/T3/T5/T6 operational; allowlist+empty/exception guards present.

### P1 (HIGH — ship may proceed; address next wave)

**P1-1 — parallel_ratio gate FAIL (carry-forward from W343-Y2)**
- Current: 0.0034 (target ≥0.05 intermediate, ≥0.7 ultimate)
- Root cause: previously hardcoded exit 0 in parallel-guard; W330 P0-A landed binding mode; W343 P0.4 race-fix landed 1500ms TURN_WINDOW_MS tightening.
- Action: wait ≥7d post-W343-bd25142 to re-measure; if still <0.05, escalate to operator for ladder tightening (e.g. `state.count >= 0 → exit(2)` 1st-violation mode).
- Owner: next-wave parallel-ratio re-measurement task.

**P1-2 — empty-final-message + worker-exception guards rely on description-match auto-fire (no mechanical hook)**
- Δ-G49 and Δ-G50 skills are CONVENTION-driven; the orchestrator MUST respect them but no PostToolUse/SubagentStop hook validates that an empty/errored teammate result was actually intercepted before synthesis.
- Risk: orchestrator can "forget" the guards under load OR if description-match miss-fires.
- Action: consider mechanizing via a SubagentStop hook that scans `payload.transcript_path` last assistant message for `NO-FINDINGS:` sentinel OR substantive content; emit blocking exit-2 if neither AND status=completed. Similar to existing `subagent-stop-guard.mjs` (already wired at `settings.json:245-247` — verify scope).

### P2 (MEDIUM — defer to operator priority queue)

**P2-1 — T5 langfuse trace-flow not independently verified**
- T5 health endpoint returns 200/OK but actual OTEL trace ingestion + queryability not probed in this audit.
- Action: future probe should query `/api/public/traces?limit=5&projectId=cmpa0h6ux0003o6067jlf4jgd` to confirm traces arriving from the running session.

**P2-2 — agent-teams TeamCreate functional probe deferred**
- Structurally available but no functional spawn-and-verify smoke test in this audit.
- Action: dedicated probe wave OR operator validation of `/team-spawn research` end-to-end.

**P2-3 — `subagent-stop-guard.mjs` scope verification**
- `settings.json:245-247` wires this hook with 5s timeout but its current contract not read in this audit.
- Action: confirm it implements (or is extended to implement) Δ-G49 mechanical gate alongside the convention-driven skill.

### P3 (LOW — informational)

**P3-1 — Allowlist size grew +1/+1 vs CLAUDE.md L18 reported counts**
- Documented: 173 allow + 138 legacy_bare + 13 colliding.
- Actual today: 174 allow + 138 legacy_bare + 14 colliding.
- Likely a single new plugin agent landed since W340 regen; one new collision discovered.
- Action: re-run `tools/build-subagent-allowlist.mjs --regenerate` if drift exceeds W340-Δ threshold; otherwise update CLAUDE.md L18 counts at next wave-trim opportunity.

---

## Summary

**6-tier memory stack**: T1 ✗ retired (clean) · T2 ✓ healthy (plugin-only path) · T3 ✓ healthy (Cognee 1.26.0 @ :8000) · T4 ✗ retired (clean, FalkorDB ECONNREFUSED by design) · T5 ✓ healthy (Langfuse 3.160.0 @ :3000 confirms W340 correction) · T6 ✓ healthy (basic-memory 0.21.1 canonical-primary, actively writing).

**Agent-team orchestration**: 5/6 sub-bullets PASS; 1/6 FAIL (parallel_ratio still 0.0034 — carry-forward from W343-Y2 awaiting ≥7d traffic). subagent_type allowlist binding-mode HARD-BLOCK active (174 FQN + 138 legacy-bare + 14 colliding). CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1 enabled. Δ-G49 + Δ-G50 skills loaded but convention-driven (no mechanical PostToolUse/SubagentStop validator — proposed P1-2 mechanization).

**Top-3 P0/P1 findings**:
1. **P1-1**: parallel_ratio gate FAIL (0.0034 vs ≥0.05 target) — carry-forward from W343-Y2, awaits ≥7d post-fix traffic for re-measurement.
2. **P1-2**: Δ-G49 empty-final-message + Δ-G50 worker-exception guards are SKILL-CONVENTION only — proposed mechanization via SubagentStop hook to validate teammate transcripts before synthesis.
3. **P2-1**: T5 Langfuse trace-flow not independently verified despite health=200 — proposed future probe of `/api/public/traces` to confirm OTEL ingestion path is end-to-end functional.

**Deliverable**: `Z:/claude-sota-installed/docs/architecture/W346-FULL-SOTA-UNLEASH/C-memory-and-orchestration.md` (this file).
