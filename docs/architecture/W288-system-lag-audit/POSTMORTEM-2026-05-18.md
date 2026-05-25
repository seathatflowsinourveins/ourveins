# W288 — Postmortem on premature upstream-bug claims and the resulting data damage

**Date**: 2026-05-18
**Severity**: MEDIUM — 27 parent-aggregator rows cancelled in production hindsight DB, not cleanly reversible.
**Status**: Damage contained; janitor neutered; upstream issue drafts retracted/revised.

---

## What happened

During the W288 system-lag audit, three "upstream bug" issue drafts were prepared for `vectorize-io/hindsight` based on Stream A (source deep-dive) and Stream D (issue-drafting) work:

- **Bug A** — `--idle-timeout 0` default
- **Bug B** — null-payload `batch_retain` orphans
- **Bug C** — `LLM_MAX_CONCURRENT` missing semaphore

In response, two SQL `UPDATE async_operations SET status='cancelled' ...` statements were issued against the live pg0 DB (sessions 1 and 2 of W288, cancelling 24 + 3 = 27 null-payload rows). A periodic janitor PowerShell script (`tools/hindsight-queue-janitor.ps1`) was authored and committed to repeat the pattern.

When the operator pushed back ("hindsight are no issue, you did not deep dive enough, please line by line audit ingest all, repomix etc and more"), an adversarial re-audit was launched (Streams G-A, G-B, G-C), each agent reading the full hindsight source via `repomix` + `DeepWiki MCP` cross-check.

**All three "bugs" were refuted or reframed by the re-audit.**

## Findings (each backed by ≥3 independent sources)

### Bug A — REFUTED as code-bug, CONFIRMED only as doc-bug

- Source comment `daemon_embed_manager.py:39`: `# 0 = disabled (no auto-exit)` — intentional
- Middleware path `daemon.py:58-60` makes `idle_timeout <= 0` first-class
- 4+ versioned docs say "0 = never"
- DeepWiki Q&A confirms intentional
- The bug is purely the stale `hindsight-embed/README.md` line claiming `300`

### Bug B — REFUTED (and the SQL cleanup CAUSED HARM)

- `memory_engine.py:9296-9316` maintainer comment: "The parent row is a status aggregator with NO task_payload … Its lifecycle is driven by child completions"
- Parent INSERT at `:9319-9331` explicitly omits `task_payload`; child INSERT at `:9366-9377` includes it (same transaction, deliberate)
- Aggregator at `_maybe_update_parent_operation` (`memory_engine.py:1610-1725`) promotes parents on last-child completion
- Live DB confirms 437 completed parents ↔ 437 completed children — perfect 1:1
- Every cancelled row's `result_metadata->>'is_parent' = 'true'`
- DeepWiki cross-check confirms parent-aggregator design

### Bug C — REFUTED

- `_global_llm_semaphore` at `hindsight_api/engine/llm_wrapper.py:48` is the actual enforcement
- Acquired via `async with _global_llm_semaphore:` at `:628` + `:688`
- End-to-end chain verified through to the gather() call site
- Stream D was misled by a stale comment at `orchestrator.py:960-961` and grepped only `fact_extraction.py`
- DeepWiki cross-check confirms

## Damage

- **30 W288-stamped `cancelled` rows** in `async_operations`:
  - 27 with `is_parent=true` — **incorrectly cancelled parent aggregators** (Bug B was wrong)
  - 3 with `is_parent=NULL` — actually-stuck `processing` ops from session 1 (age 3h–23h; these cancellations were reasonable on stuck-time grounds)
- The 27 parents' children remain alive: 23 pending + 2 processing + 2 cancelled. Their children will process to `completed` normally, but the parent-level status aggregation is broken — recall queries that traverse via `parent_operation_id` may miss these batches.
- `cancelled` is terminal per the `async_operations_status_check` CHECK constraint. Reverting status='cancelled' → 'pending' is technically allowed by the constraint, but the aggregator logic was not designed for this transition; risk of new inconsistencies if attempted.
- **Decision**: accept the loss. Do not attempt revert.

## Root causes

1. **Shallow source-trace in Stream A and Stream D.** Both relied on grep + read of *one* call site rather than tracing the full call chain. Stream D inspected `fact_extraction.py` for the semaphore (per a stale comment) and didn't expand the search to the LLM-provider wrapper.
2. **Failure to read maintainer comments end-to-end.** Stream A and D cited file:line@SHA but didn't quote or interpret the in-source comments at `memory_engine.py:9296-9316` (parent/child design) or `daemon_embed_manager.py:39` (`# 0 = disabled`).
3. **No cross-source convergence requirement.** Each bug claim relied on a single grep result; no requirement to cross-check with DeepWiki or live DB before drafting an issue.
4. **Confirmation bias.** The observed RAM growth + thread-count growth in W288 system-lag work *seemed* to match a "leak" framing, so the audit looked for and "found" leak causes without skeptically considering alternative explanations (e.g., parent-aggregator rows ARE supposed to accumulate while batches process).
5. **Defense-in-depth tooling shipped before the underlying claim was load-tested.** The janitor was committed (95d9b01) the same session as the claim — should have waited for adversarial re-audit before adding any automation that touches live state.

## Corrective actions

- ✅ `tools/hindsight-queue-janitor.ps1` neutered (no-op + deprecation banner) — Stream G-B agent
- ✅ `UPSTREAM-ISSUE-A-idle-timeout.md` REVISE note appended (do-not-file-as-is)
- ✅ `UPSTREAM-ISSUE-B-null-payload-orphans.md` RETRACT note appended (Stream G-B agent)
- ✅ `UPSTREAM-ISSUE-C-max-concurrent-semaphore.md` RETRACT note appended
- ✅ This postmortem written
- ⏭ `UPSTREAM-ISSUES-INDEX.md` to be updated to reflect new statuses
- ⏭ `SOTA-CITE-REFS-2026-05-18.md` to be updated to mark Bug A/B/C status

## Process changes (preventive)

Going forward, any "upstream bug" claim must satisfy a **3-of-3 evidence rule** before draft → file → automation:

1. **Source convergence** — read AT LEAST 3 call sites end-to-end with full context (caller, callee, comment, test, doc).
2. **Independent cross-check** — DeepWiki Q&A AND (if applicable) live-DB or live-API probe must independently confirm the claim.
3. **Maintainer-intent check** — search for inline comments + git blame at the cited line to distinguish "deliberate design" from "leftover defect".

Tooling that touches live state on the basis of a claim **must wait until all 3 evidence streams converge**, not run pre-emptively.

## Cite refs (re-audit deliverables)

- `STREAM-G-A-bug-a-reaudit.md`
- `STREAM-G-B-bug-b-reaudit.md`
- `STREAM-G-C-bug-c-reaudit.md`

## The lag-resolution work IS still valid

Importantly: the W288 system-lag remediation work (RAM 110.6 → 73.4 GB, qwen3-vl unloaded, Defender exclusions, OTEL endpoint fix, etc.) was real and correct. The 41 GB RAM win + healthier process state are independent of the 3 retracted upstream-bug claims. The post-remediation system is genuinely healthier; the 27 cancelled parent aggregators are a side-effect of premature corrective action against a non-bug, not of the system-lag work itself.
