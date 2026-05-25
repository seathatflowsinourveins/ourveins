# [RETRACTED 2026-05-18] hindsight-api: legacy `batch_retain` rows with `task_payload IS NULL` accumulate as unclaimable orphans

> **RETRACTION (2026-05-18, W288 Stream G-B re-audit) — DO NOT FILE UPSTREAM.**
>
> This draft is RETRACTED. It does **not** describe a bug. The rows it called "orphans" are **intentional parent aggregator rows** for `batch_retain` operations, by deliberate upstream design.
>
> See the full evidence trail at `STREAM-G-B-bug-b-reaudit.md` in this directory. The decisive maintainer-comment block at `hindsight-api-slim/hindsight_api/engine/memory_engine.py:9296-9316` explicitly documents the design: "The parent row is a status aggregator with NO task_payload (workers skip rows where task_payload IS NULL because they're not directly executable). Its lifecycle is driven by child completions: when all children reach a terminal state, the parent gets promoted by the aggregator." Independently confirmed by DeepWiki MCP and by live-DB inspection (every null-payload row has `result_metadata->>'is_parent' = 'true'`).
>
> The proposed CHECK constraint and janitor task in this draft would **break** the upstream architecture by forbidding the parent rows it deliberately creates with NULL `task_payload`. The companion `tools/hindsight-queue-janitor.ps1` script in this runtime has been neutered (replaced with a no-op + deprecation banner) because it was actively damaging the system: it cancelled in-flight parents, leaving their `retain` children orphaned from the parent-status-promotion path.
>
> Draft text preserved below for git history continuity. Operator: please ignore.

---


## Summary

`async_operations` rows can be persisted with `task_payload = NULL` by code paths that pre-date the W288-era atomic-INSERT refactor at `memory_engine.py:9173-9186`. These orphan rows show up in `status='pending'` queries (confusing capacity reasoning and dashboards) but are invisible to the worker claim path because `idx_async_operations_pending_claim` is a partial index over `WHERE status = 'pending' AND task_payload IS NOT NULL`. There is no auto-cleanup, so the rows accumulate indefinitely.

The atomic-INSERT fix at `_submit_async_operation` (current HEAD) prevents new orphans being created by that helper. But (a) other call sites still exist that pre-create a row then UPDATE the payload, with no schema-level guard; and (b) any deployment that ran a pre-fix release retains the historical orphans.

## Affected versions

- HEAD `9784f657` for the lingering-orphan + missing-CHECK aspects.
- Pre-fix releases (the comment at `task_backend.py:223-227` and `memory_engine.py:9162-9165` documents this was a known race "previously" that has been mostly closed; we are reporting the residual surface).

## Source locations (current HEAD `9784f657`)

| File | Line | Relevance |
|---|---|---|
| `hindsight-api-slim/hindsight_api/engine/task_backend.py` | 223-237 | Comment explicitly documents the legacy race: "fills in a NULL payload for any legacy caller that still creates the row first." The `UPDATE ... WHERE operation_id = $2 AND task_payload IS NULL` is the late-fill path. |
| `hindsight-api-slim/hindsight_api/engine/memory_engine.py` | 9162-9186 | The atomic-INSERT fix lives here; comment at :9163-9165 documents the prior race ("a crash between the two left a null-payload row that the worker's claim query (task_payload IS NOT NULL) could never pick up"). |
| `hindsight-api-slim/hindsight_api/alembic/versions/l7g8h9i0j1k2_add_worker_columns.py` | 73-74 | `CREATE INDEX idx_async_operations_pending_claim ON ... (status, created_at) WHERE status = 'pending' AND task_payload IS NOT NULL` — partial index, hides orphans from claim. |
| `hindsight-api-slim/hindsight_api/alembic/versions/i4j5k6l7m8n9_add_cancelled_status_to_async_operations.py` | — | Adds a `cancelled` status enum that the cleanup helper proposed below would use. |

The schema has **no** `CHECK (task_payload IS NOT NULL)` constraint and **no** periodic cleanup task for orphan rows. New code paths that bypass `_submit_async_operation` can therefore still produce orphans without a hard failure.

## Repro (production-state inspection on a long-lived deployment)

```sql
-- Connect to the hindsight-api Postgres (pg0-embedded by default; otherwise your async_operations DB).
SELECT operation_type,
       status,
       (task_payload IS NULL) AS null_payload,
       COUNT(*) AS n,
       MIN(created_at) AS oldest,
       MAX(created_at) AS newest
FROM async_operations
WHERE status = 'pending'
GROUP BY 1, 2, 3
ORDER BY 1, 3;
```

On the affected `claude-code` bank, this returns rows like:

```
 operation_type | status  | null_payload |  n | oldest                  | newest
----------------+---------+--------------+----+-------------------------+--------------------------
 batch_retain   | pending | t            | 24 | 2026-05-18 01:14:22+00  | 2026-05-18 04:38:11+00
 batch_retain   | pending | f            |  3 | 2026-05-18 05:01:09+00  | 2026-05-18 05:30:44+00
```

24 orphans with NULL payload, ages 1-4 hours, that the worker poller never claims (the partial index excludes them) and no auto-cleanup runs.

Confirm the partial-index exclusion:

```sql
EXPLAIN ANALYZE
  SELECT operation_id FROM async_operations
  WHERE status = 'pending' AND task_payload IS NOT NULL
  ORDER BY created_at LIMIT 1;
-- Index Scan on idx_async_operations_pending_claim ... (only 3 rows considered, 24 invisible)
```

## Expected vs Actual

**Expected:** either the schema rejects `task_payload IS NULL` outright at INSERT time, or a background sweep cancels orphans after N minutes so they don't accumulate.

**Actual:** orphans persist forever, inflate `count(pending)` dashboards, and confuse capacity-planning queries that don't include the `task_payload IS NOT NULL` predicate.

## W288 empirical evidence (2026-05-18)

- 24 `batch_retain` rows in `pending`+`task_payload IS NULL` state were observed in the `claude-code` bank.
- Manual `DELETE FROM async_operations WHERE status='pending' AND task_payload IS NULL` is the only current cleanup option.
- The runaway thread-count incident in W288 issue A is **independent** of this bug — but operator dashboards confused these orphans for "real" backlog and delayed the actual root-cause investigation.

## Proposed fix (option A — schema-level guard, recommended)

Add a NOT NULL check constraint so any future code path that bypasses `_submit_async_operation` fails loudly instead of silently producing orphans.

```diff
--- /dev/null
+++ b/hindsight-api-slim/hindsight_api/alembic/versions/<new>_async_operations_payload_not_null.py
@@ -0,0 +1,30 @@
+"""async_operations: require non-NULL task_payload for pending/processing rows
+
+Revision ID: <new>
+Revises: i4j5k6l7m8n9
+Create Date: 2026-05-18
+"""
+from alembic import op
+
+revision = "<new>"
+down_revision = "i4j5k6l7m8n9"
+
+def upgrade() -> None:
+    # 1. Cancel any pre-existing NULL-payload pending rows (they were never claimable).
+    op.execute(
+        "UPDATE async_operations "
+        "SET status = 'cancelled', "
+        "    result_metadata = COALESCE(result_metadata, '{}'::jsonb) "
+        "                      || '{\"reason\": \"orphan_null_payload\"}'::jsonb, "
+        "    updated_at = now() "
+        "WHERE status IN ('pending', 'processing') AND task_payload IS NULL"
+    )
+    # 2. Add CHECK so future inserts fail loudly.
+    op.execute(
+        "ALTER TABLE async_operations "
+        "ADD CONSTRAINT async_operations_pending_payload_not_null "
+        "CHECK (status NOT IN ('pending', 'processing') OR task_payload IS NOT NULL) "
+        "NOT VALID"
+    )
+    op.execute("ALTER TABLE async_operations VALIDATE CONSTRAINT async_operations_pending_payload_not_null")
+
+def downgrade() -> None:
+    op.execute("ALTER TABLE async_operations DROP CONSTRAINT IF EXISTS async_operations_pending_payload_not_null")
```

## Proposed fix (option B — janitor task, additive)

If a CHECK constraint is too aggressive for backward compat, add a periodic sweep in the worker poller that cancels orphans older than N minutes.

```diff
--- a/hindsight-api-slim/hindsight_api/worker/poller.py
+++ b/hindsight-api-slim/hindsight_api/worker/poller.py
@@ class WorkerPoller:
     async def _claim_one(self) -> Optional[dict]:
         ...
+
+    async def _cleanup_orphans(self, max_age_minutes: int = 30) -> int:
+        """Cancel pending rows with NULL payload older than max_age_minutes.
+
+        Such rows can never be claimed (idx_async_operations_pending_claim
+        excludes them via partial-index WHERE clause). They are produced
+        only by legacy code paths that pre-create the row before the
+        payload UPDATE — see task_backend.py:223-237 for the late-fill
+        path. The atomic-INSERT path at memory_engine.py:9173 avoids
+        creating them, but external callers may still do so.
+        """
+        async with acquire_with_retry(self._pool) as conn:
+            return await conn.fetchval(
+                f"""
+                WITH cancelled AS (
+                  UPDATE {fq_table('async_operations', self._schema)}
+                  SET status='cancelled',
+                      result_metadata = COALESCE(result_metadata,'{{}}'::jsonb)
+                                       || '{{"reason":"orphan_null_payload"}}'::jsonb,
+                      updated_at = now()
+                  WHERE status='pending'
+                    AND task_payload IS NULL
+                    AND created_at < now() - make_interval(mins => $1)
+                  RETURNING 1
+                )
+                SELECT count(*) FROM cancelled
+                """,
+                max_age_minutes,
+            )
```

…and call `_cleanup_orphans()` once every `CLEANUP_INTERVAL_MINUTES` from the poller loop (e.g. every 5 minutes alongside the claim loop).

## Workaround (until fixed)

```sql
BEGIN;
UPDATE async_operations
SET status='cancelled',
    result_metadata = COALESCE(result_metadata,'{}'::jsonb) || '{"reason":"manual_orphan_cleanup"}'::jsonb,
    updated_at = now()
WHERE status='pending' AND task_payload IS NULL;
COMMIT;
```

## Notes for maintainers

- Option A is the SOTA fix (schema-level invariants > application discipline).
- The `cancelled` status added by `i4j5k6l7m8n9_add_cancelled_status_to_async_operations.py` is the natural terminal state for these rows; no new status enum is needed.
- Cite-anchors above use repo HEAD `9784f657`; line numbers may drift but the comments at `task_backend.py:223-227` and `memory_engine.py:9162-9165` are the load-bearing documentation that this issue describes a known race surface.
