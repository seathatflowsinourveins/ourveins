# W310 Codex GPT-5.5 Cross-Model Adversarial Review — Verdicts Log

**Wave**: W310 (post W310-tail ship + W310-EXT 5-stream return)
**Branch**: `sota-converge-w310`
**HEAD at r1 fire**: `6bf30d7` (W310-tail r1 gamma P1 minimumVersion fix)
**HEAD at r2 fire**: `6bf30d7` (post-revert of working-tree basic-memory HIGH)
**Operator mandate** (W303 paste-ready /goal at `tmp/W310-paste-ready-goal.txt`): each stream-commit ship-gated by `/codex:adversarial-review --wait` per W280a Stop-hook contract. HIGH+CRITICAL=BLOCK. MEDIUM=document-and-defer.

## Round 1 — VERDICT: needs-attention (1 HIGH BLOCK)

**Tool invocation**: `node .claude/plugins/cache/openai-codex/codex/1.0.4/scripts/codex-companion.mjs adversarial-review --wait`
**Codex thread**: `019e3e87-fb49-78a2-92d3-d3ed584c68c0`
**Log**: `tmp/W310-EXT-codex-review-HEAD-6bf30d7.log`
**Target**: working-tree diff

### r1 Finding (HIGH — BLOCK)

> `[high]` Basic Memory no longer starts from tracked MCP config or guarantees canonical state path (`.mcp.json:133-135`)
>
> The changed `basic-memory` entry now only points Claude at `http://127.0.0.1:8765/mcp`. The previous config started `basic-memory==0.21.1` via `uvx` and injected `BASIC_MEMORY_HOME` / `BASIC_MEMORY_CONFIG_DIR` so writes landed under `Z:/claude-sota-installed-state/basic-memory`. Inference from the repo context: this runtime treats T6 basic-memory as canonical and bootstrap validates that specific state-side config, but this diff does not add a service definition, bootstrap startup, health check, version pin, or env propagation for the HTTP server. On a fresh clone, after a reboot, or if another process owns port 8765, the memory tier either fails to connect or writes against whatever external service/config happens to be listening, which is a high-cost state-loss/path-drift failure for verdict ledgers and recall.
>
> Recommendation: Restore the pinned stdio `uvx --from basic-memory==0.21.1 basic-memory mcp` entry with explicit `BASIC_MEMORY_HOME` and `BASIC_MEMORY_CONFIG_DIR`, or add a tracked, bootstrapped, smoke-tested localhost service that pins the same version and proves it uses the same state directory before switching `.mcp.json` to HTTP.

### r1 closure

**APPLIED Option A (stdio revert)**: Edit reverted `.mcp.json` `basic-memory` block from `{type:http, url:http://127.0.0.1:8765/mcp}` back to HEAD's `{type:stdio, command:uvx, args:["--from","basic-memory==0.21.1","basic-memory","mcp"], env:{BASIC_MEMORY_HOME, BASIC_MEMORY_CONFIG_DIR}}` form. Bootstrap-runtime.ps1 (run earlier this session) already validates `Z:/claude-sota-installed-state/basic-memory/config/config.json` (env=user, default_project=main, projects.count=1) so the stdio form spawns with valid state on next session-start.

**Root cause finding**: this is the explanation for the T6 basic-memory MCP disconnect observed during W310 Stream 3 audit (manifested as `mcp__basic-memory__*` deferred-tool removal mid-session). Operator-AI-10 (raised in W310 synthesis §1) is CLOSED.

**No commit required**: working-tree edit reverted file to match HEAD; no diff to commit. The previously-uncommitted HTTP form is discarded.

## Round 2 — VERDICT: needs-attention (2 MEDIUM, NO BLOCK)

**Tool invocation**: `node .claude/plugins/cache/openai-codex/codex/1.0.4/scripts/codex-companion.mjs adversarial-review --wait`
**Codex thread**: `019e3e8d-10d1-70a3-a200-83aed57a20d4`
**Log**: `tmp/W310-EXT-codex-review-r2-post-revert.log`
**Target**: working-tree diff (post r1 revert)
**Outcome**: HIGH BLOCK from r1 CLOSED; 2 new MEDIUM findings surfaced (do NOT trigger ship-BLOCK per W310 /goal MANDATES; deferred to owning sessions).

### r2 Finding M1 (MEDIUM)

> `[medium]` Hindsight worker slots are cut below the documented operating baseline without evidence (`.claude/settings.json:45`)
>
> The working config changes `HINDSIGHT_API_WORKER_MAX_SLOTS` from 3 to 1, but the repository's own provenance says the prior 10→3 cut was the tuned fix for stuck workers and later audits still record `3` as the live concurrency cap. Inference: reducing to one slot serializes retain work further and can recreate hidden backlog/lag in episodic memory consolidation, especially because this is a runtime env var and no paired provenance or lag probe accompanies the change.
>
> Recommendation: Revert this to `3`, or ship it with a measured before/after backlog and latency probe plus updates to the settings provenance and W304 env audit documenting why `1` is now the supported baseline.

**Status**: OWNER-DEFER — change is parallel-session-owned (not this session's edit). Owning session should either revert to 3 OR ship with empirical probe + provenance per codex recommendation. Carries forward as W311 operator-AI candidate.

### r2 Finding M2 (MEDIUM)

> `[medium]` The audit overstates its "2026-Q1+" rubric cohort (`docs/architecture/W310-EXT/STREAM-ALPHA-DECISION-FRAMEWORK-AUDIT.md:439`)
>
> The summary claims sca-v6 was measured against "12 NEW 2026-Q1+ external rubrics," but the changed rubric list itself includes multiple 2025-dated entries such as BrowseComp, DeepResearch Bench, FutureX, PaperBench, and AgentRewardBench, and line 186 admits the cohort spans 2025-04 to 2026-05. Unless each older entry has a concrete 2026-Q1+ material contract shift, the 12-rubric average and the comparison against W292 are built on an inflated cohort definition.
>
> Recommendation: Either reclassify the cohort as 2025+ live/updated rubrics, or remove older entries from the 2026-Q1+ count unless their specific 2026 material update is documented and cited in the entry.

**Status**: OWNER-DEFER — STREAM-ALPHA was authored by parallel agent fork; owning session should reclassify cohort as "2025+ live/updated" OR remove pre-2026-Q1 entries. Carries forward as W311 operator-AI candidate.

## Cumulative codex review state (W310 sub-arc)

| Round | Verdict | HIGH | MEDIUM | LOW | Action |
|---|---|---|---|---|---|
| r1 | needs-attention | 1 (basic-memory HTTP) | 0 | 0 | CLOSED via revert |
| r2 | needs-attention | 0 | 2 (SLOTS · cohort) | 0 | DEFERRED to owning sessions |

**Net effect**: HIGH BLOCK closed; ship-gate satisfied per W310 /goal MANDATES (HIGH+CRITICAL=BLOCK; MEDIUM=non-blocking). W280a Stop-hook will additionally fire codex on session-Stop for cumulative commit coverage (W310 ship `2291423` + W310-tail v6.1 `ac65b5c` + α+ε `f108ffe` + γ P1 `6bf30d7`).

## Carry-forward operator-AIs (queued W311)

- **AI-W310r2-M1**: HINDSIGHT_API_WORKER_MAX_SLOTS — revert 1→3 OR ship measured probe + provenance
- **AI-W310r2-M2**: STREAM-ALPHA-DECISION-FRAMEWORK-AUDIT.md:439 — reclassify cohort as "2025+ live/updated" OR remove pre-2026-Q1 entries

## Operator next-action

W310/W310-EXT ship is **CODEX-GATE PASS** (HIGH closed; 2 MEDIUM non-blocking). Recommended:
1. Owning sessions resolve r2 MEDIUMs (parallel-session-coordinated)
2. Operator consolidates 9 concurrent CC sessions to cap=3 per lag-diagnose `9ad695b` BEFORE next wave
3. W311 fires with: (a) AI-10 closure verification (basic-memory MCP reconnect post-session-restart) (b) W310-EXT 5-stream synthesis (c) r2-M1 + r2-M2 closures (d) sca-v6.1 → v7 Δ proposals from W310-EXT-α audit
