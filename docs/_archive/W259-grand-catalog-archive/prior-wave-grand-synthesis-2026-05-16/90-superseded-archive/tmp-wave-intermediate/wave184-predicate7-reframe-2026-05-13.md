---
title: W184 STOP-gate predicate #7 reframe — Pattern A apply on W182 Agent C P1 blocker
status: AUTHORITATIVE
date: 2026-05-13
wave: 184
fire: predicate-7-reframe
inherits: tmp/wave182-agentC-adversarial-review-2026-05-13.md (P1 BLOCKER finding)
verdict: REFRAME-TO-OBSERVABLE (Option C below; Option A retained as alternative)
---

# W184 STOP-gate predicate #7 reframe

## Original predicate (W182, UNDEFINED P1 blocker)

> [7] Session-resume coherence: 5-backend hash-chain verify across {graphiti / mcp-memory / context-mode / MEMORY.md / install-provenance.md}

**W182 Agent C objection** (verbatim per `tmp/wave182-agentC-adversarial-review-2026-05-13.md`): "UNDEFINED — what's the hash function, what's the chain shape, what's the failure mode? Cannot ratify a STOP-gate against an undefined predicate." Conf=0.83 NEEDS-REVISION; P1 blocker.

## Reframe options (3 Pattern A candidates)

### Option A — DROP predicate #7 entirely (simplest)

**Action**: remove [7] from STOP-gate; reduce N from 8 to 7. Ship gate becomes "≥6/7".

**Cost**: zero implementation. Loses session-resume coherence verification — sessions can silently drift.

**When to pick**: if session-resume drift is empirically rare AND `sessionstart-preload-discipline.md` already covers the gap.

### Option B — DEFINE the 5 backends explicitly

**Action**: codify the 5-backend list + hash function + chain shape inline in `sessionstart-preload-discipline.md`.

5 backends (concrete enumeration):
1. `graphiti` (FalkorDB temporal-KG) — query last episode UUID + timestamp
2. `mcp-memory` (sqlite_vec) — query last `created_at` timestamp from memory_entries
3. `context-mode` FTS5 — query latest `session-events` source row timestamp
4. `MEMORY.md` head — SHA256 of first 200 bytes (catches index drift)
5. `docs/install-provenance.md` tail — SHA256 of last 500 bytes (catches install drift)

Chain: concat 5 SHA-prefixes → SHA256 → write to `.claude/state/sessionstart_hashchain.jsonl` per session

Predicate becomes: "5-backend hashchain matches prior session's last record" (detect drift via byte-for-byte equality of derived hash).

**Cost**: medium implementation (~120-180 LOC SessionStart hook + JSONL audit). Concrete + verifiable. Likely separate rule-ship per CR-9 install-risk.

**When to pick**: if session-resume drift has occurred ≥2× in arc (n=2 promotion gate per `codification-threshold.md`).

### Option C — REFRAME to single-observable (recommended, lowest cost)

**Action**: replace 5-backend hashchain with **single-observable invariant**:

> **[7'] Session-resume MEMORY.md head pointer matches last close-synthesis tail.**

Mechanism:
- `MEMORY.md` head (first ~200 chars) cites latest close-synthesis filename (e.g., `tmp/wave183-close-synthesis-2026-05-13.md`)
- Last close-synthesis file last-mtime timestamp
- Predicate satisfied IFF: `MEMORY.md` first-non-blank-line bullet name == latest close-synthesis filename (set-equality on filename slug)

**Verification command** (paste-ready):
```bash
LATEST_CLOSE=$(ls -t Z:/claude-sota-installed/tmp/wave*-close-synthesis-*.md | head -1 | xargs basename)
MEMORY_HEAD_REF=$(grep -oE 'wave[0-9]+.*close-synthesis-[0-9-]+\.md' Z:/claude-sota-installed/.claude/projects/Z--claude-sota-installed/memory/MEMORY.md | head -1 || echo "NONE")
if [ "$LATEST_CLOSE" = "$MEMORY_HEAD_REF" ]; then echo "PASS"; else echo "FAIL: head=$MEMORY_HEAD_REF latest=$LATEST_CLOSE"; fi
```

**Cost**: zero implementation (uses existing files). Verifiable in 1 shell command. Single point of failure (not 5).

**Coverage trade-off**: catches MEMORY.md/close-synthesis drift but NOT graphiti/mcp-memory/context-mode drift. Those drift via independent mechanisms — pretending to verify them in one predicate is the original sin.

**When to pick**: if the operational concern is "did the last fire close cleanly" not "did 5 independent backends synchronize". This is the empirically relevant question for /goal STOP-N gates.

## Recommended Pattern A apply: Option C

**Rationale**:
1. W182 Agent C objection was "undefined" — Option C defines a single observable
2. Cost-asymmetry per `codification-threshold.md` cycle-321: Option C is zero-LOC ship vs Option B's 120-180 LOC; B does not clear breakeven without n≥2 drift evidence
3. Option B's 5-backend chain conflates 3 orthogonal drift classes (semantic-KG / index / doc) — false-positive prone
4. The operational use of the predicate (verify that last arc closed) is fully captured by Option C

## Pattern A FIX-FORWARD spec

**File**: this reframe lands in the W184 paste-ready /goal v3 (replace `[7] STOP-gate predicate #7 DEFINED OR alternative reframing` → `[7] MEMORY.md head points at latest close-synthesis filename (1-cmd verify)`).

**Audit trail**: cite W182 Agent C P1 blocker + this reframe as Pattern A NEEDS-REVISION conf≥0.88 fix-forward (Option C wins on cost-asymmetry).

**Cross-references**:
- `sessionstart-preload-discipline.md` (loaded but not Read this fire; reframe doesn't depend on its content; if Option B is later chosen, that rule is the codification target)
- `karpathy-adapted.md §5 Wiki Compounding Surface` Layer 2 (MEMORY.md head = Layer-2 pointer; this predicate verifies Layer-2→Layer-3 chain)
- `audit-action-loop.md §Stage 4 Re-fire` (the single-cmd verify command IS the close-stage check)

## Forward queue

If session-resume drift occurs in ≥2 future arcs (n=2 threshold per codification-threshold.md), promote Option B → dedicated rule ship. Until then Option C suffices.

## STOP-gate impact (W184)

With Option C applied, predicate #7 becomes **observable + verifiable** → ratifies as ship-class predicate. STOP-N gate fully defined; W184 can ship at ≥6/8.
