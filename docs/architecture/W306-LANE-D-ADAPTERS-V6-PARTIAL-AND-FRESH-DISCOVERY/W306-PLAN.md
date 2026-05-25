# W306 — Lane-D Adapter Stubs + sca-v6 Partial-Ship + Fresh 2026-May Discovery (new axes)

> **Wave**: W306
> **Branch**: `sota-converge-w295` (HEAD `0e5bfbd` post-W305-codex-r1-closure; codex-r2 APPROVED W305 ship)
> **Predecessors**: W301 (sca-v6 designed) · W304 (Mem0 AT-RISK + 18 NEW candidates) · W305 (Lane-D skeleton SHIPPED + codex r2 APPROVE)
> **Started**: 2026-05-18
> **Rubric**: sca-v5 active; sca-v6 partial ships THIS wave (D-v6-4 CI + D-v6-6 override audit trail per W305 Stream B drafts)
> **Codex gate**: round-1 after synthesis commit

## §0 TL;DR

W306 advances 3 fronts in parallel under the operator's "GPT-5.5 unleashed + 2026-May fresh" continuing mandate:
1. **Adapter STUBS** for Mem0 + ALMA + agentmemory so operator only needs to run installs to unblock W306 actual Lane-D benchmarks (NOT installing packages this wave — cardinal-rule-1 install decisions remain operator-confirmed)
2. **sca-v6 PARTIAL ships** D-v6-4 (composite confidence intervals as ADVISORY) + D-v6-6 (operator-override audit trail) per W305 Stream B SAFE-to-ship classifications (tier-cuts unchanged; no v5 invariant break)
3. **2026-May SOTA fresh discovery** in 3 NEW axes not covered by W304/W305: agent-orchestration deep-dive · observability/tracing · LLM-gateway-router; ≥10 NEW candidates, freshness ≥2026-04-01

## §1 Stream definitions

### Stream A — Lane-D adapter STUBS (Mem0 + ALMA + agentmemory)

- **Owner**: `agent-A-lane-d-stubs`
- **Owned files**:
  - `harness/adapters/memory_recall/mem0.py`
  - `harness/adapters/memory_recall/alma_memory.py`
  - `harness/adapters/memory_recall/agentmemory.py`
  - `docs/architecture/W306-LANE-D-ADAPTERS-V6-PARTIAL-AND-FRESH-DISCOVERY/W306-STREAM-A-ADAPTER-STUBS.md` (transcript + design notes)
  - Edit `harness/adapters/memory_recall/__init__.py:_ADAPTER_MODULES` to uncomment the 3 entries
- **Mandate**: Implement 3 adapter classes per the contract in `harness/adapters/memory_recall/README.md`. Each adapter:
  - Wraps the candidate package import in try/except; if ImportError, raises with clear operator-action message ("operator must run `pip install mem0ai==2.0.2`" etc)
  - Implements `run_benchmark(corpus, sample_size, dry_run)` per the Protocol contract
  - Returns the inspect_ai-EvalLog-compatible dict per W305 Stream A §0.bis Calibration-2 + 4 (HIGH-2 closure)
  - Supports `--memory-corpus _mock` for wire smoke-test without LLM calls
  - Cardinal-rule conformance: CR-1 (trusted source per W305 Stream A install paths) + CR-9 (version-pin assert)
- **Smoke-test**: each adapter's `_mock` path returns deterministic recall_precision_at_5 in [0.50, 0.60] band (PARTIAL verdict) so the operator can verify wire BEFORE the real install.
- **Out-of-scope**: actual package installs (operator-action). Actual LongMemEval runs (require installs). Real cost estimates (deferred to W307 after operator runs intermediate).
- **Deliverable**: 3 adapter Python files (≤200 LOC each) + 1 design doc (≤200 LOC) + 1 __init__.py edit. Smoke evidence inline.

### Stream B — sca-v6 PARTIAL ships to SKILL.md (D-v6-4 CI advisory + D-v6-6 override audit trail)

- **Owner**: `agent-B-sca-v6-partial-apply`
- **Owned files**:
  - `.claude/skills/sota-convergence-audit/SKILL.md` (the actual SKILL.md edit per W305 Stream B drafts)
  - `docs/architecture/W306-LANE-D-ADAPTERS-V6-PARTIAL-AND-FRESH-DISCOVERY/W306-STREAM-B-SKILL-MD-PARTIAL-APPLY.md` (changelog + risk analysis)
- **Mandate**: Apply 2 PARTIAL ships from W305 Stream B (`docs/architecture/W305-D-V6-2-LANE-D-MEM0-HEADHEAD/W305-STREAM-B-SCA-V6-PARTIAL-SHIP-SURVEY.md`):
  - **D-v6-4** composite CI as ADVISORY annotation in SKILL.md verdict-template + add anti-pattern row
  - **D-v6-6** operator-override audit trail recommendation paragraph + anti-pattern row
- **Constraints** (per W305 Stream B):
  - NO tier-cut threshold changes (T1≥4.0 stays; etc)
  - NO hard-cap taxonomy changes
  - NO weight assignment changes
  - NO retroactive verdict invalidation
  - ADD-only: annotations, anti-patterns, optional documentation; nothing deleted
  - Net SKILL.md delta target: ~+46 LOC (663 → ~709)
- **Smoke-test**: after edit, grep for tier-cuts L228-L232 + hard-caps L390-L399 + weights L177-L216 — verify UNCHANGED.
- **Deliverable**: SKILL.md updated + changelog doc + diff stat in `W306-STREAM-B-SKILL-MD-PARTIAL-APPLY.md`.

### Stream C — 2026-May fresh SOTA in 3 NEW axes (agent-orchestration deep · observability · LLM-gateway-router)

- **Owner**: `agent-C-fresh-new-axes`
- **Owned file**: `docs/architecture/W306-LANE-D-ADAPTERS-V6-PARTIAL-AND-FRESH-DISCOVERY/W306-STREAM-C-2026-MAY-NEW-AXES.md`
- **Mandate**: Discover ≥10 NEW candidates outside ALL prior wave ledgers (W288/W291/W293/W295/W296/W298/W299/W300/W301/W304/W305), filtered by date-of-last-activity ≥2026-04-01.
- **3 NEW axes** (each ≥3 candidates) not covered in W304/W305:
  1. **Agent-orchestration deep-dive 2026-May** — beyond claude-flow (rejected) + agent-teams (incumbent): novel multi-agent coordination patterns, stigmergy, swarm intelligence, hierarchical decomposition. Search "multi-agent coordination 2026 May" + "LLM swarm 2026" + "agent stigmergy".
  2. **Observability / tracing for LLM apps 2026-May** — beyond Phoenix (broken backend) + Langfuse (T5 incumbent): OpenTelemetry-for-LLMs, distributed-tracing-for-multi-agent, structured-event-logs. Search "LLM observability 2026 May" + "agent tracing OpenTelemetry 2026".
  3. **LLM-gateway/router 2026-May** — beyond litellm (W259 incumbent), claude-code-router (W280h REJECTED): cost-aware routing, fallback chains, hybrid local+cloud. Search "LLM gateway 2026 May" + "model router cost-aware 2026" + "fallback chain LLM".
- **Anti-bias guards**: stars NOT a hardgate; ≥3 candidates <500★; ≥3 outside-USA orgs; ≥1-per-axis from EACH MCP family.
- **Cascade plan**: github search (`pushed:>2026-04-01 sort:stars-desc <capability>`) + exa semantic search (2026-May queries) + deepwiki verification on top-3. Cost-cap $0.50.
- **Deliverable**: ≤500 lines. ≥10 candidate cards per the W304 Stream B yaml schema + Top-5 ranked + anti-bias compliance table.

## §2 Parent-owned work (this wave)

1. **W306-SYNTHESIS-2026-05-18.md** — cross-stream synthesis answering "next priority for W307" + operator-action queue update
2. **Codex GPT-5.5 e2e gate** — codex:codex-rescue async on commit; address HIGH inline; MEDIUM defer per W288/W289 precedent
3. **VERDICT-LEDGER update** — append W306 verdict row for sca-v5→v6 partial-ship if any T1-class change emerges

## §3 Out-of-scope (operator-confirm-required)

- Actual `pip install mem0ai==2.0.2 / pip install alma-memory==0.10.0 / npm install -g @agentmemory/agentmemory@0.9.20` (W305 Stream A install paths; each a CR-1 install decision)
- Actual Lane-D benchmark RUNS with real LLM costs (require installs)
- SKILL.md edits for sca-v6 deltas D-v6-1/D-v6-3/D-v6-5 (gated by operator §7 answers per W305 Stream B classifications)
- SEV-1 Langfuse key rotation (operator-only — secret handling)
- HIGH operator-action items from W301+W304+W305 carry-forward queue (Phoenix MCP, OthmanAdi Phase-5, R4 STRENGTHEN-REVERSAL, cognee embedder repoint)

## §4 Cardinal-rule invariants — must hold post-wave

- CLAUDE.md ≤ 50 LOC (currently 43); settings.json ≤ 15 KB (currently 13.4KB); ≤ 3 worktrees
- `self_invented_count: 0`
- T6 basic-memory + VERDICT-LEDGER.md ledger contract
- codex `reviewGateEnabled: true`
- 6-tier memory contract unchanged

## §5 Wave-success criteria

- 3/3 streams produce non-empty deliverables
- Lane-D adapter stubs land + `_mock` path smoke-test PASS for all 3 candidates
- SKILL.md partial-ship lands + tier-cuts/hard-caps/weights GREP-verified unchanged
- ≥10 NEW candidates discovered with freshness ≥2026-04-01
- Codex round-1 verdict APPROVE or REVISE-MEDIUM-only (per W288/W289 precedent)
