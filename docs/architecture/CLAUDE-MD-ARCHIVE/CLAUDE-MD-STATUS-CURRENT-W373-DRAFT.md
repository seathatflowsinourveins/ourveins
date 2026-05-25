# CLAUDE.md Status Snapshot — Current as of W373

Latest wave: W373-SOTA-READY (2026-05-22)

DRAFT — will be promoted to `CLAUDE-MD-STATUS-CURRENT-W373.md` and CLAUDE.md L46 archive-pointer refreshed at P5.

## Cumulative recent waves

| Wave | Subject | Status |
|------|---------|--------|
| **W373-SOTA-READY** (this) | Catalog-grade audit + remediation; unblocks W374-EXT Tasks 7-9 | <SHIP / IN-FLIGHT — fill at P5> |
| W372 | P0-2 codex r1+r2 dual-position pattern | LANDED |
| W371 | Multi-agent pattern study | LANDED |
| W370 | Substrate-carryforward + parallel-ratio CI gate (P2.2) | LANDED |
| W369 | Pattern-study cluster + memory reranker + MCP dedup | LANDED |
| W368 P0.1 | Skill count re-probe → 63 live (W373 F018 corrects to 62 + 1 archived) | LANDED |

## Snapshot of W373 key fixes (P3 LIVE)

| Finding | Commit | What landed |
|---------|--------|-------------|
| F001 | 85e247f | mattpocock fabricated SHA fix: CLAUDE.md L31 + `improve-codebase-architecture/SKILL.md` → live HEAD `67bce91c80cd` (CR-6 cascade closed) |
| F012 | d889702 | CLAUDE.md L11 broken architecture-cite path reorganized |
| F033 | 2365d27 | CLAUDE.md L35 marketplace_dirs `23` → `22` (off-by-one corrected) |
| F018 | 75cfa4f | CLAUDE.md skill count `× 63` → `62 + 1 archived` (live count via `ls .claude/skills/`) |
| F006/F008/F009 | 8a9603e | CLAUDE.md L20 sync: collisions/orphans `13/38` → `14/43` (matches L35 W370 footnote) |
| F005 | ade8731 | W336-FQN-SUBAGENT-TYPE.md stub created to repair CLAUDE.md L20 phantom cite |

## Audit-trail bookkeeping

- **6 P0/P1/P2 wave commits** landed in goal/W373-sota-ready:
  - `d40f8ba` P0 housekeeping (W374-EXT plan + tooling + plugin state)
  - `c3d9664` P1 6-stream parallel audit complete (105 raw findings)
  - `6b817df` P2 synthesis complete (95 findings, 60 LOW + 35 HIGH + 4 CRITICAL)
  - plus 6 P3 LIVE-remediation commits above

- **Cumulative ledger**: ~96 verdicts post-W320 + 7 W373 net = ~103 verdicts (final count re-stamped against T6 basic-memory at P5)

## Known runtime gaps surfaced this wave (deferred to follow-up waves)

| ID | Severity | Subject | Defer reason |
|----|----------|---------|--------------|
| F002 | CRITICAL (sca 1.5) | Langfuse :3000 crash loop (T5 observability dead — `langfuse-postgres` container missing) | Docker compose recovery + Prisma migrations; W374 or operator manual |
| F003 | CRITICAL (sca 1.5) | parallel_ratio empirical 0.028 vs target 0.7 (gate code OK, metric stuck despite W330 binding gate) | 4-hypothesis multi-step diagnosis required (bypass-marker overuse / UserPromptSubmit absence / TURN_WINDOW_MS tight / regex over-trigger) |
| F004 | CRITICAL (sca 1.5) | `.claude/plugins/cache/` ABSENT on W373 worktree (only `installed_plugins.json` + `known_marketplaces.json`) | Verify by-design (worktrees may share parent's plugin cache) — JURY required |
| F008 + F016 | HIGH | 7 worktrees vs cap=5 (W362a/b/c carry 143/158/173 SHIPPED-APPROVED orphans) | Cherry-pick or merge cascade before prune; operator-decision |
| 35 HIGH findings | mixed | Prep'd at `.claude/state/W373-jury-prep/` (1 brief committed; 34 queued for codex-jury dispatch in follow-up wave) | Jury-gate per Approach A++ + plan §P3 |
| 27 stale local branches | LOW | `git branch -D` × N (preserve goal/W362* + goal/W37*) | Single batch operator-confirm preferred |

## Carry-forward register

- **CPA-FLEET-ZERO-ERROR**: stash@{0} preserved; materialize to `feat/cpa-fleet-zero-error` branch when prioritized
- **Composio MCP wire (W373-F051)**: pending COMPOSIO_API_KEY operator-add to CLAUDE.local.md
- **agentmemory MCP wire (W373-F050)**: pending socket.dev + SLSA-L3 audit per TIER-2 caveat
- **mastra-ai/mastra re-tier (W373-F061)**: operator-sign pending for MONITOR → §2 INSTALL-WITH-CAVEAT (per codex r4 I4)

## Cardinal-rule status (post-W373)

- **R1** (trusted plugins/skills/agents) — ✓ HOLD; W373 F050 + F051 + F058 surface NEW candidates with explicit trust-tuple gates per W331 axis-1 #3
- **R2** (hooks = upstream-plugin OR direct-CLI) — ✓ HOLD; W373 F074 verifies `.claude/hooks/` = exactly 1 sanctioned exception (`context-mode-cache-heal.mjs`)
- **R3** (subagents = installed upstream OR documented) — ✓ HOLD; W373 F005 closes phantom W336-FQN cite with stub doc
- **R4** (project behavior in CLAUDE.md + settings.json) — ✓ HOLD; W373 P3 commits land cite-refresh batch through R4-canonical path
- **R5** (safety boundaries via CC permissions, not custom guards) — ⚠ PARTIAL-HOLD (carry from W317-S1 + W319-D + W320-A); W373 F077 verifies permissions allow/deny matches CR-5 + W308 deny-bypass-flags
- **R6** (verify-before-claim) — ✓ HOLD (re-affirmed); W373 F001 closure is itself a CR-6 cascade-closure (fabricated SHA was the active CR-6 violation)
- **self_invented_count: 0** — ✓ HOLDS (W373 P3 commits are all cite-refreshes + 1 stub doc; no new ad-hoc rules/hooks/scripts)

## Status archive pointers

- **Pre-W373 status**: see `docs/architecture/CLAUDE-MD-ARCHIVE/CLAUDE-MD-STATUS-CURRENT-W324.md` (active rolling-3 snapshot)
- **Pre-W319 status**: `CLAUDE-MD-STATUS-PRE-W319.md`
- **Pre-W318 status**: `CLAUDE-MD-STATUS-PRE-W318.md`
- **Pre-W317 status**: `CLAUDE-MD-STATUS-PRE-W317.md`
- **Pre-W316 status**: `CLAUDE-MD-STATUS-PRE-W316.md`
- **Pre-W315 status**: `CLAUDE-MD-STATUS-PRE-W315.md`
- **Pre-W314 status**: `CLAUDE-MD-STATUS-PRE-W314.md`
- **Pre-W255 historical**: `git log --before=2026-05-15`

## Open W374+ forward-AI top-ranked

1. **F002 Langfuse :3000 recovery** (CRITICAL; T5 observability dead)
2. **F003 parallel_ratio root-cause diagnosis** (CRITICAL; multi-hypothesis)
3. **F004 worktree plugin-cache by-design verification** (CRITICAL; structural)
4. **34 HIGH jury actual dispatch** (briefs pre-prepped at `.claude/state/W373-jury-prep/`)
5. **W374-EXT Tasks 7-9 unlock** (CoVe / test-gate / Jury-on-Demand — unblocked by W373 P2 synthesis output)
