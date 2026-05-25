# W288 Stream D — Upstream issue drafts for `vectorize-io/hindsight`

> Audit date: 2026-05-18 | Repo HEAD: `9784f657` (release v0.7.7) | Local clone: `Z:\repos\deps\hindsight\` | Tracked-issues URL: https://github.com/vectorize-io/hindsight/issues

Three production-quality issues drafted from the W288 system-lag audit. Each issue file is paste-ready for the GitHub "New issue" form (title in `# H1`, body is everything else).

| # | Title | Severity | Component | File |
|---|---|---|---|---|
| A | `[bug] hindsight-embed: --idle-timeout default is 0 (never idle out), but README documents 300s` | HIGH (production thread-count leak) | `hindsight-embed` | [UPSTREAM-ISSUE-A-idle-timeout.md](./UPSTREAM-ISSUE-A-idle-timeout.md) |
| B | `[bug] hindsight-api: legacy batch_retain rows with task_payload IS NULL accumulate as unclaimable orphans` | MEDIUM (dashboard confusion, no claim impact) | `hindsight-api` schema + worker | [UPSTREAM-ISSUE-B-null-payload-orphans.md](./UPSTREAM-ISSUE-B-null-payload-orphans.md) |
| C | `[bug] hindsight-api retain: HINDSIGHT_API_LLM_MAX_CONCURRENT is read into config but NOT enforced as a semaphore at the streaming gather() call site` | HIGH (concurrency-cap-ignored, LLM-backend overrun) | `hindsight-api` engine/retain | [UPSTREAM-ISSUE-C-max-concurrent-semaphore.md](./UPSTREAM-ISSUE-C-max-concurrent-semaphore.md) |

## Verified file:line citations (HEAD `9784f657`)

| Issue | Citation | Verified |
|---|---|---|
| A | `hindsight-embed/hindsight_embed/daemon_embed_manager.py:38` — `DEFAULT_DAEMON_IDLE_TIMEOUT = 0` | yes |
| A | `hindsight-embed/README.md:160` — table row claims default `300` | yes |
| A | `hindsight-api-slim/hindsight_api/daemon.py:26,58-59` — `DEFAULT_IDLE_TIMEOUT = 0` + `if self.idle_timeout <= 0: return` | yes |
| B | `hindsight-api-slim/hindsight_api/engine/task_backend.py:223-237` — late-fill UPDATE path + legacy-caller comment | yes |
| B | `hindsight-api-slim/hindsight_api/engine/memory_engine.py:9162-9186` — atomic-INSERT fix + race documentation | yes |
| B | `hindsight-api-slim/hindsight_api/alembic/versions/l7g8h9i0j1k2_add_worker_columns.py:73-74` — `idx_async_operations_pending_claim ... WHERE status='pending' AND task_payload IS NOT NULL` | yes |
| C | `hindsight-api-slim/hindsight_api/config.py:134,495,883,1423` — env wiring + default 32 + dataclass field | yes |
| C | `hindsight-api-slim/hindsight_api/engine/retain/orchestrator.py:958-961,992-1001,1007` — stale comment + unbounded gather | yes |
| C | `hindsight-api-slim/hindsight_api/engine/retain/fact_extraction.py` — `grep -n Semaphore` returns 0 matches (confirms no internal cap) | yes |

**Note**: Stream A's brief cited `hindsight_api/engine/retain/orchestrator.py:1001 @ 9784f657` for issue C. The actual `asyncio.gather(*tasks, return_exceptions=True)` lives at `hindsight-api-slim/hindsight_api/engine/retain/orchestrator.py:1007` (Stream A was off by 6 lines and missing the `hindsight-api-slim/` package-root prefix; the file count is 1977 lines). The corrected citation appears in the issue body.

## Paste instructions

For each of A, B, C:

1. Navigate to https://github.com/vectorize-io/hindsight/issues/new
2. Copy the `# H1` title from the issue file (the first line, without the leading `# `) into the GitHub "Title" field.
3. Copy everything **after** the H1 title (starting at `## Summary`) into the GitHub "Write" body field.
4. Add labels (suggested):
   - A: `bug`, `hindsight-embed`, `docs-mismatch`, `priority:high`
   - B: `bug`, `hindsight-api`, `database`, `priority:medium`
   - C: `bug`, `hindsight-api`, `retain`, `concurrency`, `priority:high`
5. (Optional) Submit issues B and C together with a single comment thread cross-linking them, because the W288 incident showed they compound (issue A causes the daemon to never exit, which makes issue C's thread leak permanent).

## Cross-references

- W288 Stream A primary source-deep-dive: [`STREAM-A-hindsight-upstream.md`](./STREAM-A-hindsight-upstream.md)
- W288 final synthesis (incident timeline): [`SYNTHESIS-2026-05-18.md`](./SYNTHESIS-2026-05-18.md)
- W288 H1 (resource audit, root incident): [`H1-resource-audit.md`](./H1-resource-audit.md)
