# W346-EXECUTE — task plan

## Goal
Execute the W346 /goal predicate set by operator: P0 /insights, P1-P4 + P6.a/b/d execution, M1-M4 cleanups. Branch w346 (or current main since concurrent d5df5b8 already shipped W346 6-stream audit; this is the EXECUTION phase that absorbs M2 CR-2 LOOPHOLE + actual implementations).

## Streams (6 parallel per W269)
1. [IN-PROGRESS] Stream A — P0 /insights probe + adoption design — task #566
2. [IN-PROGRESS] Stream B — P1+P2 cite-refresh verification — task #567
3. [IN-PROGRESS] Stream C — P3 cookbook 9-notebook → 2-3 NEW skills — task #568
4. [IN-PROGRESS] Stream D — P4 inspect_ai SWE harness + MAT-contract design — task #569
5. [IN-PROGRESS] Stream E — P6.a/b/d cluster (--bg + OTel METRICS + /output-style) — task #570
6. [IN-PROGRESS] Stream F — M2 hidden-error sweep + CR-2 LOOPHOLE fix design — task #571

## Decision points
- D1 (2026-05-20): wave dir = docs/architecture/W346-EXECUTE-2026-05-20/ (separate from existing W346/ stub + W346-FULL-SOTA-UNLEASH/ shipped by concurrent d5df5b8 — avoid collision)
- D2 (2026-05-20): all 6 streams general-purpose subagent_type (FQN-sanctioned bare)
- D3 (2026-05-20): branch stays w344-sota-unleash (current) per W280d — no new worktree since concurrent collision risk + d5df5b8 already shipped on this branch
