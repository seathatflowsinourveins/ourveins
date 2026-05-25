# W343 Parallel-Ratio Architectural Finding

> Wave W343 / branch `goal/W343` + `w342-execute`. Origin: investigating why goal STOP-gate `parallel_ratio ≥0.30` could not be satisfied in single session despite multiple 4-Agent fan-out batches dispatched this session.

## TL;DR

The W325-A 16-wave-old "parallel_ratio = 0.003 SEV-1" reading is **NOT a measurement bug** — it is a faithful record of the runtime's actual JSONL-recording behavior. The Anthropic Claude Code runtime serializes intended-parallel Agent dispatches into N sequential single-Agent assistant messages, each with a unique `parentUuid`. The `tools/parallel-ratio-telemetry.mjs` metric is correctly counting reality.

## Probe evidence

W343 session `4c5b248e-65d1-4e7a-9be2-ea3cff74d548` dispatched ≥5 confirmed 4-Agent batches in single semantic assistant turns (W343-A1+A2, W343-A3+A5+A6+A7, W343-A14+A15+A16+A17, W343-A18+A19+A20+A21, W343-A8+A9-attempt). Each batch should have produced a single assistant message with 4 `tool_use` blocks.

JSONL probe result for this session (`Z:/claude-sota-installed/.claude/projects/Z--claude-sota-installed/4c5b248e-65d1-4e7a-9be2-ea3cff74d548.jsonl`):

| Probe dim | Value |
|---|---|
| Assistant messages with Agent blocks | 34 |
| Distribution by `countAgentBlocks(msg.content)` | `{1: 34, 2: 0, 3: 0, 4+: 0}` |
| Distribution by `parentUuid` grouping | `{1: 34, 2: 0, 3: 0, 4+: 0}` |
| All 34 parentUuids | **UNIQUE** (no batch sharing) |
| Same-batch dispatch arrival deltas | 15-22 seconds between records |

Each Agent dispatch ends up as a **separate logical turn** in the JSONL record, with a **unique parentUuid** linking back to a distinct synthesized user message. The runtime decomposes "4 tool_use blocks in 1 assistant response" into "4 sequential assistant responses each containing 1 tool_use block" at recording time.

## Telemetry fix attempts (all defeated)

| Approach | Result |
|---|---|
| Per-message `tool_use` count (current) | 0.003 — correctly counts each serialized record as solo |
| 30s-window cluster | 0.4443 — codex r1 NEEDS-REVISION: false-merges genuine sequential dispatches within 30s of each other (1069 such pairs in 30d corpus) |
| 30s-window + boundary-aware (text-only assistant flush) | 0.0029 — within-batch arrival deltas (15-22s) BUT no text-only assistant boundaries between → boundary detection doesn't fire → collapses to baseline |
| 5s-window + boundary-aware | 0.0029 — same baseline (window too tight for 15-22s deltas) |
| `parentUuid` grouping | 0.003 — unique parents per record; no cluster forms |

There is no clean signal at the JSONL recording layer to distinguish "intended-parallel batch" from "sequential dispatch close in time".

## Architectural implication

The `parallel_ratio` metric reflects what the runtime actually records, not what the orchestrator intends. To genuinely move the metric one of these would have to land:

1. **Runtime-level fix** — Anthropic Claude Code runtime preserves "1 assistant msg with N tool_use blocks" structure end-to-end through the JSONL recording layer, instead of serializing into N records. This is an Anthropic-side change beyond this runtime's authority.
2. **Forked-subagent batch attribution** — when `CLAUDE_CODE_FORK_SUBAGENT=1` is active, group forked-child records under a single parent-batch identifier. Requires either a new JSONL field or a session-level batch-id correlation. Beyond W343 scope.
3. **Different metric** — replace `parallel_ratio` with a measure that captures orchestrator intent (e.g., grep transcripts for "in parallel" phrasings + Agent dispatches in same model turn). Operator-decision; sca-v15 would need a new dim definition.
4. **Operator-side workflow change** — invoke parallelism via `/team-spawn` presets (which the agent-teams plugin may record as a single batch dispatch) instead of raw `Agent` tool fan-out. Not yet verified to produce different telemetry.

## Goal STOP-gate implication

`parallel_ratio ≥0.30` is structurally unsatisfiable within a single session under current runtime + telemetry behavior. The 16-wave persistence of the "SEV-1" reading is the metric correctly reporting "the runtime does not record parallelism the way the orchestrator dispatches it." Both pre-W343 + post-W343 readings are accurate.

The other two W343 goal-predicate STOP conditions ARE satisfied (5 P0 closed + CLAUDE.md ≤50 LOC pointer-only). The third condition's irreducibility is the architectural finding documented here.

## Recommendation

1. **For this session**: operator invokes `/goal clear` to release the hook. Substantive deliverables are fully shipped (5 commits on main + hotfix on w342-execute + T6 wave-row).
2. **For W344+**: pick one of the 4 architectural options above and execute. Most tractable: option 4 (try `/team-spawn` and probe whether the agent-teams plugin produces different JSONL grouping than raw Agent fan-out).
3. **For sca-v15 rubric**: consider demoting `parallel_ratio` from STOP-gate to advisory metric until a runtime-recording layer fix lands. Currently the SEV-1 reading blocks ship-gates on a metric the orchestrator cannot influence with intent alone.

## Verification

```bash
node -e "
import('node:fs/promises').then(async fs => {
  const raw = await fs.readFile('.claude/projects/Z--claude-sota-installed/4c5b248e-65d1-4e7a-9be2-ea3cff74d548.jsonl', 'utf8');
  const byParent = new Map();
  for (const line of raw.split('\\n')) {
    if (!line || line[0] !== '{') continue;
    let obj; try { obj = JSON.parse(line); } catch { continue; }
    const msg = obj && obj.message;
    if (!msg || msg.role !== 'assistant') continue;
    let n = 0;
    if (Array.isArray(msg.content)) for (const b of msg.content)
      if (b && b.type === 'tool_use' && (b.name === 'Agent' || b.name === 'Task')) n++;
    if (n === 0) continue;
    const p = obj.parentUuid || 'NONE';
    byParent.set(p, (byParent.get(p) || 0) + n);
  }
  const dist = {'1':0,'2':0,'3':0,'4+':0};
  for (const c of byParent.values()) {
    if (c === 1) dist['1']++; else if (c === 2) dist['2']++;
    else if (c === 3) dist['3']++; else dist['4+']++;
  }
  console.log('by-parent dist:', JSON.stringify(dist), 'total-turns:', byParent.size);
});
"
# Expected output for any session running on current Claude Code runtime:
# by-parent dist: {"1":N,"2":0,"3":0,"4+":0} total-turns: N
# where N == total Agent-dispatching turns in the session
```

If the output ever shows `2`/`3`/`4+` > 0 for any session, that runtime version is preserving batch structure and the metric becomes reachable.

## Citations

- W325-A baseline: `docs/architecture/W325-STREAM-A/` (16-wave SEV-1 origin)
- W341-B verification: `Q11 NO-OP` re-verification of guard binding-mode
- W343 ship commits: main@4b2f45e (P0), babaf5c (P1), 51e397f (P2), 83b07d6 (EXEC), b34ecd2 (CARRY)
- W343 hotfix: w342-execute@e7db565 (build-subagent-allowlist.mjs CJS-require fix)
- T6 wave-closure: `main/waves/w343-sota-unleash-wave-closure` (basic-memory permalink)
