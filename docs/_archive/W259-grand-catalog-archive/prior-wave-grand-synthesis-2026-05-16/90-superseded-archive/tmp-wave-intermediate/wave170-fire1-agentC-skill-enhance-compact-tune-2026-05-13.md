---
title: Wave 170 Fire 1 Agent C — P3 Skill-enhance + P4 Auto-compact HYBRID-EXISTING-TUNE design
status: AUTHORITATIVE-CANDIDATE
date: 2026-05-13
agent: architect (W170-F1)
output_budget: 800 LOC
termination: on_handoff_to: orchestrator | terminationCondition: on_text_match: "## ARTIFACT-INLINE"
cite_class: |
  constituents=[
    TIER-1-DIRECT @ https://code.claude.com/docs/en/hooks (PostToolUse matcher semantic + asyncRewake + decision:block),
    TIER-1-DIRECT @ https://code.claude.com/docs/en/skills (15-field SKILL.md spec),
    TIER-2 @ Z:/claude-sota-installed/.claude/rules/auto-compact-discipline.md Rank #1-#7,
    TIER-2 @ Z:/claude-sota/.claude/rules/karpathy-adapted.md §5 Wiki Compounding Surface,
    TIER-2 @ Z:/claude-sota-installed/.claude/rules/advanced-agent-team-standing-directive.md invariants 1-8,
    TIER-2 @ Z:/claude-sota-installed/.claude/rules/sessionstart-preload-discipline.md §The contract step 4,
    TIER-3-LOCAL-COMPOSITION @ W170-F1 design composition
  ]; effective_tier=TIER-3-LOCAL-COMPOSITION per Z:/claude-sota/.claude/rules/citation-discipline.md rule #8 MIN_PRECEDENCE
---

# Wave 170 Fire 1 Agent C — Architecture Design

User feedback W170: ELIMINATE operator-discipline Stop-hook nag → MECHANICAL enforcement. Per CR-12 PARTIAL-OVERLAP + kiss-dry-yagni Must-Never #4: HYBRID-EXISTING-TUNE (1-line settings.json matcher extension) beats reinstall.

# PART 1 — P3 SKILL ENHANCE (goal-prompt-synthesis R5+R6)

## §1 R5 — Agent-team-spawn mandate (NEW phase, post-R4)

For every /goal predicate containing ≥2 priority sections OR explicit fan-out keywords:
1. EMBED standing-directive cite anchor: `per Z:/claude-sota-installed/.claude/rules/advanced-agent-team-standing-directive.md invariants 1-8` in MANDATES
2. MANDATE invariant #1 BRIDGE-MODE for ≥2 agents
3. MANDATE invariant #2 brief cites SOTA repos at file:line + HEAD SHA
4. MANDATE invariant #5 ARTIFACT-INLINE per FM-19
5. MANDATE invariant #6 Mia pre-apply on returned prescriptions
6. DEFER concurrency cap to parallel-agent-wave.md §CADP rule 2-5 (max-3 concurrent unless cache≥50% verified)

Output addition to /goal: MANDATES MUST embed verbatim line:
"AGENT TEAM SPAWN per advanced-agent-team-standing-directive.md invariants 1-8; CADP max-3 concurrent unless verified; BRIDGE-MODE ≥2 agents; ARTIFACT-INLINE FM-19; Mia pre-apply on returns."

## §2 R6 — Cross-session-resume 5-backend hash verify (NEW phase, post-R5)

For every /goal predicate spanning ≥2 fires OR long-arc (≥4h OR cron-driven):
1. EMBED sessionstart-preload-discipline cite anchor: `per sessionstart-preload-discipline.md §The contract step 4`
2. MANDATE 5-backend hash verify at session-resume:
   - mcp-memory: recall content-hash for last-fire persist
   - graphiti: get_episodes group_id=eee last_n=3
   - provenance: tail docs/install-provenance.md
   - tmp/: Glob tmp/wave<N-1>-*.md
   - JSONL: tail .claude/state/*.jsonl
3. STOP-gate: ≥4/5 PASS = STOP-eligible; ≤3 = STALE-PRELOAD-NOTICE

Output addition to /goal: STOP MUST embed verbatim line:
"5-backend hash verify per sessionstart-preload-discipline.md §The contract step 4 at session-resume; ≥4/5 PASS = STOP-eligible."

## §3 Per-cite-import verification table (6 sources Mia-probed)

| Source | HEAD-SHA | License | Stars | Use case |
|---|---|---|---|---|
| gsd-build/get-shit-done | `eeaf9c556fa9b89f3d0681b1744852ad5e4b179e` | MIT | ~58543 | R1 discover exemplars |
| mattpocock/skills | `733d312884b3878a9a9cff693c5886943753a741` | MIT | ~48857 | R4 compose single-pattern-per-section |
| vercel-labs/agent-skills | `b9c8ee0643d87d3c5a953d1e22382ff2ead39229` | TBD | n/a | R2 6-Probe-DAG composition |
| addy-agent-skills | `742dca5` | MIT | ~33500 | R3 Axis-1 named-author convergence |
| ComposioHQ/awesome-claude-skills | REMOTE-ONLY | Apache-2.0 claimed | ~56900 | R1 ecosystem aggregator (TERTIARY) |
| obra/superpowers | `e7a2d16476bf042e9add4699c9d018a90f86e4a6` | MIT | ~171890 | R4 TDD-for-skills RED-GREEN-REFACTOR |

Operator MUST re-probe HEAD SHAs at apply-boundary per FM-20 n=8 ladder defense.

# PART 2 — P4 AUTO-COMPACT HYBRID-EXISTING-TUNE

## §4 ≥2-option trade-off

**Existing (Mia-verified):**
- `context_window_guard.py` (3.2K) PostToolUse `Edit|Write|MultiEdit` matcher (settings.json:336-352); WARN at 25%, CRITICAL at 30%, asyncRewake stderr
- `precompact_guard.py` (2.3K) PreCompact `matcher:"*"` (settings.json:494-505); blocks hintless via decision:block
- `precompact_priorities.sh` intelligent-compact PreCompact 6-section A-F

### Option A: PostToolUse matcher extension (RECOMMENDED)

Extend matcher `Edit|Write|MultiEdit` → `Edit|Write|MultiEdit|Bash|Read|Glob|Grep|Task|Agent`. Hook's 25/30% logic fires on broader surface. Zero code change in hook except TARGET_TOOLS set; 1 settings.json structural change.

**Pros**: 1-line settings.json + 1-line TARGET_TOOLS extension; zero behavior regression; mechanical-enforce per W170 directive; CR-12 PARTIAL-OVERLAP (no new install, kiss-dry-yagni #4 satisfied)

**Cons**: 10-50× more hook invocations (negligible ~5ms async); TARGET_TOOLS set adds Task|Agent

### Option B: PostToolUse + PreCompact matcher

Option A + extend precompact_guard.py to fire on `trigger="manual"` (currently auto-only at L56).

**Pros**: closes operator-typed `/compact` (no args) gap
**Cons**: precompact_guard.py L56 short-circuit; ≥3 LOC change; auto-compact-discipline.md Rank #3 already mandates operator-side `/compact <hint>`

### Option C: Chain-trigger logic

Option A + PostToolUse → SessionStart re-fire at 70% (proactive).
**Cons**: NEW hook required; CR-12 GENUINELY-NEW; Probe DAG + Axis-1 required; recursive risk; premature

## §5 Recommendation: Option A

Rationale:
1. CR-12 PARTIAL-OVERLAP: existing 3-hook stack covers failure surface
2. kiss-dry-yagni Must-Never #4: NO duplicate functionality
3. karpathy-adapted §3 Surgical Changes: extend, don't refactor sound logic
4. Mechanical enforcement satisfied per W170 directive
5. Reversibility per launch-discipline.md D1: 1-line revert
6. CR-9 2-round budget: narrow scope = minimal round-2 risk

## §6 Exact settings.json Edit (Pattern A apply payload)

**Target**: `.claude/settings.json:336-352` PostToolUse block

**Edit 1 (split into 2 matcher blocks):**

OLD:
```json
{"matcher": "Edit|Write|MultiEdit",
  "hooks": [
    {"type":"command","command":"...codex_mcp_healthcheck.py","timeout":12,"async":true},
    {"type":"command","command":"...context_window_guard.py","timeout":5,"async":true,"asyncRewake":true}
  ]}
```

NEW (split into 2):
```json
{"matcher": "Edit|Write|MultiEdit",
  "hooks": [
    {"type":"command","command":"...codex_mcp_healthcheck.py","timeout":12,"async":true}
  ]},
{"matcher": "Edit|Write|MultiEdit|Bash|Read|Glob|Grep|Task|Agent",
  "hooks": [
    {"type":"command","command":"...context_window_guard.py","timeout":5,"async":true,"asyncRewake":true}
  ]}
```

Rationale: codex_mcp_healthcheck.py scoped to file-mutation; context_window_guard.py scoped to all-tool context-rot.

**Edit 2 (context_window_guard.py TARGET_TOOLS):**

```python
# OLD: TARGET_TOOLS = {"Edit", "Write", "MultiEdit"}
# NEW: TARGET_TOOLS = {"Edit", "Write", "MultiEdit", "Bash", "Read", "Glob", "Grep", "Task", "Agent"}
```

## §7 Smoke-PASS recipe

- Test 1: simulate context-rot at 30% threshold via env override; verify exit-2 stderr fire
- Test 2: verify Glob/Grep/Read coverage past L83 early-exit
- Test 3: long-arc /loop fire reaching ~250k → mechanical fire without operator /compact
- Test 4: revert recipe: `git checkout HEAD -- .claude/settings.json .claude/hooks/scripts/context_window_guard.py` (1s revert)

# PART 3 — INTEGRATION

## §8 Mia pre-design probe (7/8 PASS; probe 8 deferred to apply-time)

| # | Target | Method | Result |
|---|---|---|---|
| 1 | context_window_guard.py exists | Read | PASS 102 LOC |
| 2 | precompact_guard.py wired | Read+grep | PASS settings.json:494-505 matcher:"*" |
| 3 | precompact_priorities.sh exists | Glob | PASS intelligent-compact plugin |
| 4 | current matcher | Read | PASS line 337 `Edit\|Write\|MultiEdit` |
| 5 | advanced-agent-team-standing-directive.md invariants 1-8 | Read | PASS 8 invariants in frontmatter |
| 6 | sessionstart-preload-discipline.md §The contract step 4 | Read | PASS 5 backends enumerated |
| 7 | goal-prompt-synthesis SKILL.md R1-R4 structure | Read | PASS R1@L29 R2@L44 R3@L57 R4@L66 |
| 8 | 6 cite-import HEAD SHAs | DEFERRED | apply-boundary refresh required per FM-20 n=8 |

## §9 CR-8 conformance verdict

| Sub-ship | CR-8 | Rationale |
|---|---|---|
| P3 SKILL R5+R6 | **ADAPTED-FROM-SOTA** | R5 cite-imports advanced-agent-team-standing-directive.md; R6 cite-imports sessionstart-preload-discipline.md; 6 fresh upstream cites per CR-1 lattice |
| P4 Option A TUNE | **ADAPTED-FROM-SOTA** | Existing hooks SOTA-cited (auto-compact-discipline.md Rank #1-#7 + karpathy §5); matcher extension scope-extend per CR-12 PARTIAL-OVERLAP |

## §10 Forward apply discipline (Pattern A)

1. Mia probe-8 refresh — fetch fresh HEAD SHAs for 6 cite-imports via mcp__github__search_repositories
2. Path P codex T1 dispatch per codex-t1-pattern-b-forward-discipline.md Forward Discipline #2 (TIGHT prompt, 60-120s)
3. Pattern A atomic Pattern A apply per codex-t1-fix-forward-pattern.md §Pattern A
4. Smoke probe Tests 1-4
5. Commit body cite: T1 verdict + Mia probes + CR-8 ADAPTED-FROM-SOTA + cross-model-gate-satisfaction-status per CR-3 Phase 1
6. T3 post-commit hook fires auto (codex_postcommit_review.py)
7. FM-20 defense: ALL cite anchors Mia-probe-verified at apply-time

## §11 Boundary disclosure (CR-3 Phase 1 bootstrap exception)

Sonnet stand-in agent return; cross-model gate PARTIAL at design-boundary; Path P required BEFORE Pattern A apply per Phase 1 bootstrap exception. STAND-IN-NOTICE per cross-model-consensus.md §Env-funneled Option 2 satisfied via this §11.

## §12 Promotion-threshold (cycle-322 + cycle-321)

- P3 SKILL: n=1 user-feedback explicit (W170 directive); skill-enhancement is content-extension within existing SKILL.md; cycle-322 jurisdiction § user-trigger n=1 automatic
- P4 TUNE: n=1 user-feedback explicit (W170 mechanical directive); settings.json matcher extension within existing infrastructure; cycle-322 satisfied
- LOC budget: P3 ~450 chars; P4 ~50+5 chars; both well under 200-LOC ceiling
- Expected savings: P3 ~5-10min per /goal cycle; P4 ~2-3min per long-arc fire

## ARTIFACT-INLINE: tmp/wave170-fire1-agentC-skill-enhance-compact-tune-2026-05-13.md
