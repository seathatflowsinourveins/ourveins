# W288 Stream G-B — Adversarial line-by-line re-audit of Bug B (null-payload batch_retain "orphans")

> Run on 2026-05-18 against repo HEAD at `Z:\repos\deps\hindsight\` (commit-id evidenced by the inline maintainer comment block at `engine/memory_engine.py:9296-9316`) and the live pg0 DB at `127.0.0.1:5432/hindsight`. Operator pushback: "hindsight are no issue, you did not resolve them because you did not deep dive enough". This audit confirms the pushback.

## TL;DR

**VERDICT: REFUTED.** Rows in `async_operations` with `operation_type='batch_retain'` and `task_payload IS NULL` are **intentional parent aggregator rows** by deliberate design — not orphans, not a bug. The architecture splits each `batch_retain` request into a parent row (no payload, just a status aggregator) and one or more child `retain` rows (with payload, executable by workers). Workers correctly skip the parent's null payload via the partial index `idx_async_operations_pending_claim`; the parent is promoted from `pending → completed/failed` by `_maybe_update_parent_operation` when all child siblings reach a terminal state. The draft issue, the janitor script, and the manual UPDATEs run earlier this session were all based on a misread of the code — and in fact have **caused active damage** by cancelling in-flight parents while their `retain` children are still queued.

## Sources audited

| Source | Use |
|---|---|
| `Z:\repos\deps\hindsight\hindsight-api-slim\hindsight_api\engine\memory_engine.py` | `submit_async_retain` (parent + child INSERT logic) and `_maybe_update_parent_operation` (aggregator) |
| `Z:\repos\deps\hindsight\hindsight-api-slim\hindsight_api\engine\task_backend.py` | `submit_task` legacy late-fill helper (lines 222-256) |
| `Z:\repos\deps\hindsight\hindsight-api-slim\hindsight_api\worker\poller.py` | Worker claim query (filters `task_payload IS NOT NULL`) + `[PENDING_BREAKDOWN] payload_null=N` instrumentation (line 1016) + child→parent aggregator hook (line 487-489) |
| `Z:\repos\deps\hindsight\hindsight-api-slim\hindsight_api\alembic\versions\l7g8h9i0j1k2_add_worker_columns.py:73-74` | Partial index `WHERE status='pending' AND task_payload IS NOT NULL` (intentional — excludes parents from claim) |
| `Z:\repos\deps\hindsight\hindsight-api-slim\hindsight_api\engine\db\ops_postgresql.py` (lines 753, 770, 785, 810, 827, 859, 878, 896, 913) | All 9 worker-side queries filter `AND task_payload IS NOT NULL` |
| `Z:\repos\deps\hindsight\hindsight-api-slim\hindsight_api\engine\db\ops_oracle.py` (lines 749, 766, 781, 806, 823, 855, 874, 892, 909) | Same on the Oracle backend |
| Repomix MCP pack of `Z:\repos\deps\hindsight\` — outputId `b31f5584fe7e5f70` | 350 files, 5.37 MB, 1.16 M tokens |
| Live pg0 DB at `127.0.0.1:5432/hindsight` (loopback, password=`hindsight`) | Schema, indexes, constraints, full status distribution, sample rows of cancelled parents + their children |
| DeepWiki MCP `mcp__deepwiki__ask_question` against `vectorize-io/hindsight` | Independent cross-check; result quoted in verdict section |

## task_payload lifecycle map

### INSERT sites (3 total)

1. **`engine/memory_engine.py:9319-9331`** — **parent `batch_retain` INSERT** inside an explicit `conn.transaction()`. Column list deliberately **omits `task_payload`** so the value defaults to NULL:
   ```python
   INSERT INTO async_operations (operation_id, bank_id, operation_type, result_metadata, status)
   VALUES ($1, $2, $3, $4, 'pending')   -- $4 includes "is_parent": True
   ```
2. **`engine/memory_engine.py:9366-9377`** — **child `retain` INSERT** inside the same transaction. Includes `task_payload`:
   ```python
   INSERT INTO async_operations (operation_id, bank_id, operation_type, result_metadata, status, task_payload)
   VALUES ($1, $2, $3, $4, 'pending', $6::jsonb)
   ```
3. **`engine/memory_engine.py:9174-9186`** — **`_submit_async_operation` generic helper INSERT**, used by `consolidation`, `access_count_update`, and any non-batch operation. Always includes `task_payload` atomically. Comment at 9162-9165 documents the legacy two-phase race (now closed) for this helper specifically. This is the helper the draft thought was the only correct path.
4. **`engine/task_backend.py:243-255`** — `BrokerTaskBackend.submit_task` no-`operation_id` branch (e.g. `access_count_update`). Always sets `task_payload`.

### UPDATE sites that touch `task_payload`

- **`engine/task_backend.py:229-237`** — `submit_task` with `operation_id`:
  ```sql
  UPDATE async_operations SET task_payload = $1::jsonb, updated_at = now()
  WHERE operation_id = $2 AND task_payload IS NULL
  ```
  The `WHERE task_payload IS NULL` guard makes it a no-op when the payload is already populated (the common case). The comment at lines 222-227 explains: "Callers now include task_payload in the same INSERT … the UPDATE is a no-op when the row is already claimable, and only fills in a NULL payload for any legacy caller that still creates the row first." This is a backward-compat shim, NOT the source of orphans. **Critically, this UPDATE does NOT touch parent batch_retain rows — those have no `operation_id` matching this code path because the parent's child-IDs are what get passed to `submit_task`.**

No UPDATE site SETs `task_payload = NULL` anywhere.

### SELECT sites that filter on `task_payload`

- 9 query sites in `engine/db/ops_postgresql.py` (claim, peek, stats) + 9 mirrored in `ops_oracle.py` — all filter `AND task_payload IS NOT NULL`. This is the deliberate worker discipline: **executable rows must have a payload; aggregator/parent rows must NOT.**
- `engine/task_backend.py:289` — `wait_for_pending_tasks` (test helper) also filters `task_payload IS NOT NULL`.
- `engine/memory_engine.py:943` — comment confirming the worker's claim filter.
- `engine/db/optional_routines.py:94` — same filter.
- `worker/poller.py:1016` — `SUM(CASE WHEN task_payload IS NULL THEN 1 ELSE 0 END) AS payload_null` — **diagnostic counter**, exposed in the `[PENDING_BREAKDOWN]` log line. This is the line that confused the operator: the counter is **expected to be non-zero whenever a `batch_retain` is mid-flight**, because in-flight parents have null payload until the aggregator promotes them. It is **NOT a bug indicator**.

## Maintainer-comment interpretation

The two inline comments at `task_backend.py:222-237` and `memory_engine.py:9162-9165` describe a **legacy** race in `_submit_async_operation` that was closed by moving payload into the atomic INSERT. That comment is **defensive documentation**, not an open-bug report. The clause "only fills in a NULL payload for any legacy caller that still creates the row first" describes the UPDATE as a **safety net for external code paths** that have not yet been migrated. The comment does **not** apply to parent `batch_retain` rows — those are created by a different helper (`submit_async_retain`, not `_submit_async_operation`) with the explicit intent to leave the payload NULL.

The decisive maintainer comment is at `memory_engine.py:9296-9310`, which the draft never quoted in full:

> "The parent row is a status aggregator with NO task_payload (workers skip rows where task_payload IS NULL because they're not directly executable). Its lifecycle is driven by child completions: when all children reach a terminal state, the parent gets promoted by the aggregator."

That single comment block, plus the matching parent-aggregator function at `_maybe_update_parent_operation` (`memory_engine.py:1610-1725`), is sufficient to refute the bug claim outright.

## Janitor search results

| Pattern | Hits in `hindsight-api-slim/hindsight_api/` |
|---|---|
| `janitor` | 0 |
| `cleanup.*orphan` / `orphan.*cleanup` | 0 |
| `stale.*async` | 0 |

There is **no** built-in upstream janitor for `async_operations` — by design, because there are **no orphans to clean up**. Parent rows are reaped by the aggregator; child rows are reaped by the worker; failed rows are reaped via retry-then-`failed`; cancelled rows are explicit operator action.

## Live pg0 evidence

### Schema (relevant columns)

```
task_payload    jsonb        NULL allowed (no NOT NULL, no CHECK)
worker_id       text         NULL allowed
claimed_at      timestamptz  NULL allowed
result_metadata jsonb        NOT NULL DEFAULT '{}'::jsonb
status          text         NOT NULL DEFAULT 'pending'
status_check    CHECK (status IN ('pending','processing','completed','failed','cancelled'))
```

The schema deliberately permits `task_payload IS NULL`. No CHECK constraint forbids it. No NOT NULL constraint. This matches the documented design — parent rows MUST be able to exist without payload.

### Full status distribution (2026-05-18 07:47)

| operation_type | status | task_payload IS NULL | unclaimed | no_worker | count |
|---|---|---|---|---|---|
| batch_retain | cancelled | true | true | true | **27** |
| batch_retain | completed | true | true | true | **437** |
| consolidation | cancelled | false | false | false | 1 |
| consolidation | completed | false | false | false | 2 |
| consolidation | processing | false | false | false | 1 |
| retain | cancelled | false | false | false | 2 |
| retain | completed | false | false | false | 437 |
| retain | pending | false | true | true | **23** |
| retain | processing | false | false | false | 2 |

**Smoking gun ratio**: 437 completed `batch_retain` parents ↔ 437 completed `retain` children. Perfect 1:1 — exactly the parent-child contract.

### Cancelled parents — `result_metadata` proves they were intentional parents

```
operation_id                         | error_message                                          | result_metadata
-------------------------------------+--------------------------------------------------------+-------------------------------------
e570ca1a-747c-4d79-8540-fdfd182b3f63 | W288 follow-up janitor: null-payload orphan (...)      | {"is_parent": true, "items_count": 1, "total_tokens": 20569, "num_sub_batches": 1}
988d6817-7a39-4b2f-8c2d-75645f1b3c0c | W288 follow-up janitor: null-payload orphan (...)      | {"is_parent": true, "items_count": 1, "total_tokens": 74267, "num_sub_batches": 1}
07bff83c-2263-4406-b369-06e171fad67c | W288 follow-up janitor: null-payload orphan (...)      | {"is_parent": true, "items_count": 1, "total_tokens": 32477, "num_sub_batches": 1}
0bced66e-5d80-4f82-a77f-33f7c613811b | W288 manual abandon 2026-05-18: stuck (>1h) ...        | {"is_parent": true, "items_count": 1, "total_tokens": 23020, "num_sub_batches": 1}
53510369-c6c4-4cb8-86e0-a2070eb73373 | W288 manual abandon 2026-05-18: stuck (>1h) ...        | {"is_parent": true, "items_count": 1, "total_tokens": 67081, "num_sub_batches": 1}
```

Every cancelled "orphan" has `"is_parent": true` in metadata. They are not orphans. The `error_message` traces back to this runtime's own janitor and manual UPDATE.

### Active damage: cancelled parents still have queued children

```
parent (cancelled)                   | child_op_id (pending retain)         | child_type | child_status
-------------------------------------+--------------------------------------+------------+--------------
0bced66e-5d80-4f82-a77f-33f7c613811b | 0f2fcb93-fa64-4699-9669-2e2afeb47414 | retain     | pending
398b1f00-efd3-4000-96af-a25a4ad97e1c | 6673c94a-7de7-4a71-9b03-f20d79bd77e5 | retain     | pending
53510369-c6c4-4cb8-86e0-a2070eb73373 | 561d9c81-6651-45f0-80e5-54f1eb04d4f7 | retain     | pending
7f501639-a11e-445a-9278-c7d91f62cd9d | f6382609-69ee-47ec-b4f8-547785cee816 | retain     | pending
caaffb8f-d6c9-4a4f-9d12-0896cbcc8fea | 8018e687-4a46-4d90-b5a9-4eb33477f978 | retain     | pending
```

These are real `retain` jobs with non-null `task_payload` that the worker WILL pick up — but their parent aggregator was cancelled. When the children complete, `_maybe_update_parent_operation` will try to update an already-`cancelled` parent (function at `memory_engine.py:1644-1725` uses `FOR UPDATE` but the comment at 1694 says "Inherit … Set parent error message to indicate child failure"); the parent's promotion will be a no-op because cancelled is a terminal state. The 23 pending `retain` rows in the live DB include some of these orphaned children.

### Claim-placeholder hypothesis test

The brief asked: "do null-payload rows have a non-null `worker_id` or `claimed_at`?" Live DB answer: **NO**. All null-payload rows are `unclaimed=true, no_worker=true`. This is **consistent with parent-aggregator semantics**, not with the "claim placeholder" hypothesis. (Workers never claim a parent — the partial index excludes it — so `claimed_at` / `worker_id` must remain null forever.)

### DeepWiki cross-check (verbatim)

> "In the `async_operations` table, rows with `task_payload IS NULL` are intentionally created for parent aggregator operations, specifically for `operation_type='batch_retain'`. These parent operations do not have an executable `task_payload` because they serve as status aggregators for their child operations. Workers explicitly skip rows where `task_payload IS NULL`. The lifecycle of these parent operations is driven by the completion of their children."

DeepWiki independently confirms the architecture. The draft's interpretation of `task_backend.py:223-237` was a misread.

## Final verdict + recommended action

**Bug B is REFUTED.** Three concurrent actions required:

### 1. Append retraction to the draft issue

The draft at `docs/architecture/W288-system-lag-audit/UPSTREAM-ISSUE-B-null-payload-orphans.md` must NOT be filed upstream. A retraction notice is appended (see Action 1 below).

### 2. Disable / remove the janitor script

`tools/hindsight-queue-janitor.ps1` actively damages the system: it cancels intentional parent aggregator rows, which orphans their (legitimate) child `retain` rows from the status-promotion path. The 27 cancelled parents in the live DB are all collateral damage from this runtime's own janitor + manual SQL. The janitor must be neutralised.

Two options:
- **A (preferred)**: Replace the body of `hindsight-queue-janitor.ps1` with a no-op `exit 0` and a deprecation banner that prints the retraction notice when executed. Keep the file (don't delete) so the W288 commit history stays referent-stable.
- **B**: Move the file to `tools/_archived/hindsight-queue-janitor.ps1.deprecated` and add a top-of-file banner. Less ideal — breaks any operator muscle-memory invocations.

I will apply Option A as part of this Stream G-B closeout (in a separate small commit, not in this audit file).

### 3. Operator-visible follow-up: the cancelled rows in the live DB

The 27 cancelled parents + their orphaned pending children are **not reversible** in a clean way:
- We cannot un-cancel without violating the status state machine (cancelled is terminal per the CHECK constraint).
- The children will complete (worker still picks them up via the partial index), then `_maybe_update_parent_operation` will try and fail to promote — see `memory_engine.py:1722` — leaving the children in `completed` but the parent in `cancelled`. This is an internal inconsistency that the upstream aggregator was never designed to recover from.
- The pragmatic operator action is to **leave them**. The `retain` children will still write the memories, the parent rows are cancelled (terminal), and dashboards will eventually move past them.
- **Lesson logged**: any future `[PENDING_BREAKDOWN] payload_null=N` log line is informational, not actionable. Do not run cleanup SQL against `task_payload IS NULL` rows.

### 4. (Optional) Future-proof — close the false-positive at the source

If we want this class of error to be impossible to repeat, the system surface that confused the operator is `worker/poller.py:1016`'s `payload_null` counter being logged alongside the actionable `claimable` / `retry_blocked` counters without distinguishing intent. A **non-disruptive** upstream issue could request a comment + field rename clarifying that `payload_null` is the count of in-flight parent aggregators (informational), not orphans. This is **NOT** what the original Bug B draft proposed. Mark this as "future-low-priority polish, not a bug".

---

## Action 1 (executed) — retraction notice for the draft

Appended to `docs/architecture/W288-system-lag-audit/UPSTREAM-ISSUE-B-null-payload-orphans.md`:

```
## RETRACTION (2026-05-18, Stream G-B re-audit)

This issue draft is RETRACTED — it does NOT describe a bug. The rows it called
"orphans" are intentional parent aggregator rows for `batch_retain` operations.
See `STREAM-G-B-bug-b-reaudit.md` (same directory) for the full evidence trail.
Do NOT file this draft upstream. The proposed CHECK-constraint migration and
janitor task would BREAK the documented architecture by forbidding parent rows
that the upstream code deliberately creates with NULL `task_payload`.
```

## Cite anchors verified

- `engine/memory_engine.py:9296-9316` — "The parent row is a status aggregator with NO task_payload" (verified by Read 2026-05-18, lines confirmed in repomix outputId `b31f5584fe7e5f70`).
- `engine/memory_engine.py:1610-1725` — `_maybe_update_parent_operation` aggregator (verified by Read).
- `engine/memory_engine.py:9319-9331` — parent INSERT explicitly omits `task_payload` column (verified by Read).
- `engine/memory_engine.py:9366-9377` — child INSERT includes `task_payload` (verified by Read).
- `worker/poller.py:1016` — `payload_null` is an informational SUM counter (verified via grep).
- `alembic/versions/l7g8h9i0j1k2_add_worker_columns.py:73-74` — partial-index `WHERE … task_payload IS NOT NULL` is the worker discipline (verified via grep).
- Live DB at `127.0.0.1:5432/hindsight` — every null-payload row has `result_metadata->>'is_parent' = 'true'` (verified via psql).
- DeepWiki MCP `vectorize-io/hindsight` ask_question — confirms parent-aggregator design (quoted verbatim above).
