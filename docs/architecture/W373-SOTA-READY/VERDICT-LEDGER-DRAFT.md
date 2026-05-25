# W373-SOTA-READY Verdict Ledger

Generated: 2026-05-22T21:00:00Z (DRAFT — will be re-stamped at P5 final-commit)
Wave: W373-SOTA-READY (2026-05-22)
Branch: `goal/W373-sota-ready`

## Phase verdicts

| # | Phase | Item | Verdict | Cite-anchor | Date |
|---|-------|------|---------|-------------|------|
| 1 | P0 | Housekeeping commit (W374-EXT plan + tooling + plugin state) | LANDED | d40f8ba + tag `pre-W373-sota-ready-baseline` | 2026-05-22 |
| 2 | P1 | 6-stream parallel audit (105 raw → 95 dedupe findings) | COMPLETE | c3d9664 + tag `w373-p1-complete` | 2026-05-22 |
| 3 | P2 | LIVE synthesis (CoVe-equivalent + sca-v18 + topo-sort) | COMPLETE | 6b817df + tag `w373-p2-complete` | 2026-05-22 |
| 4 | P3 | LIVE remediation (top-6 LOW + 1 CRITICAL cite-fix landed) | <PARTIAL or COMPLETE — fill at P5> | 85e247f + 2365d27 + 8a9603e + 75cfa4f + d889702 + ade8731 + <pending> | 2026-05-22 |
| 5 | P4 | Ship gate (codex r1+r2 + eval) | <SHIP / APPLY / ESCALATE — fill at P5> | <SHAs pending P4 commit> | 2026-05-22 |
| 6 | P5 | Wave-close + squash-PR-to-main | <DONE / IN-FLIGHT — fill at P5> | <final SHA + PR # pending> | 2026-05-22 |

## P3 LIVE remediations applied (this wave)

| Finding ID | Type | Subject | Commit SHA | Verdict |
|------------|------|---------|------------|---------|
| W373-F001 | cite_refresh (CRITICAL) | Replace fabricated mattpocock-vendor-fork SHA with live HEAD `67bce91c80cd` | 85e247f | LANDED |
| W373-F033 | cite_refresh | CLAUDE.md L35 `marketplace_dirs=23` → `22` | 2365d27 | LANDED |
| W373-F006-F008-F009 | settings_surgery | Sync CLAUDE.md L20 collisions/orphans to live (14/43) | 8a9603e | LANDED |
| W373-F018 | cite_refresh | CLAUDE.md skill count `× 63` → `62 + 1 archived` (live count) | 75cfa4f | LANDED |
| W373-F012 | cite_refresh | CLAUDE.md L11 broken architecture-cite path repaired | d889702 | LANDED |
| W373-F005 | doc_create | W336-FQN-SUBAGENT-TYPE.md stub created to repair CLAUDE.md cite | ade8731 | LANDED |

## Cross-wave ratifications

- **Ratifies**: W370 substrate-carryforward HEAD chain `c1716d1` → `de00be5` → `d40f8ba`
- **Unblocks**: W374-EXT Tasks 7-9 (Quality amplifications — CoVe / test-gate / Jury-on-Demand)
- **Honors**: W342 cite-discipline (per cardinal-rule-6 verify-before-claim — W373-F001 fix closes the cascade)
- **Preserves**: W350 GIT-TREE-SOTA §2 cap=5 (3 worktrees carry SHIPPED-APPROVED orphans — prune deferred per Stream C)

## Findings outcome

Total findings: 95 (post-dedupe from 105 raw across 6 streams)

| Class | Total | Auto-fired in P3 | Deferred to follow-up | Notes |
|-------|-------|------------------|------------------------|-------|
| LOW | 60 | 6 edit + 30 NO-OP confirmations | 24 deferred (operator-side env / LANDSCAPE batch) | NO-OP confirmations available for single-batch annotation |
| HIGH | 35 | 1 fixed (F001 CRITICAL cite) | 34 jury-prep'd (briefs queued) | Briefs at `.claude/state/W373-jury-prep/W373-F*-brief.md` |
| CRITICAL (subset of HIGH; sca-v18 < 2.0) | 4 | F001 fixed | F002 + F003 + F004 deferred | F002 langfuse / F003 parallel_ratio / F004 worktree-cache |

### Risk-class distribution by remediation type

| Remediation type | HIGH | LOW | Total |
|------------------|------|-----|-------|
| plugin_retire | 5 | 0 | 5 |
| mcp_swap | 6 | 3 | 9 |
| settings_surgery | 5 | 4 | 9 |
| worktree_prune | 2 | 0 | 2 |
| hidden_error_fix | 6 | 7 | 13 |
| cite_refresh | 11 | 46 | 57 |
| **Total** | **35** | **60** | **95** |

## Carry-forward to follow-up waves

- **CPA-FLEET-ZERO-ERROR work**: stashed `stash@{0}` → materialize to `feat/cpa-fleet-zero-error` branch
- **W362a/b/c worktree prune**: BLOCKED — each carries SHIPPED-APPROVED commits needing merge first (143/158/173 orphans per Stream C probe)
- **Per-type LOW executors**: P3-remediation.py + per-type modules not built in W373 (sufficient for W373 scope)
- **HIGH jury actual dispatch**: deferred — judge-request briefs prepped at `.claude/state/W373-jury-prep/` (1 brief committed: W373-F001-brief.md; 34 remaining queued for follow-up)
- **Composio MCP wire** (W373-F051): pending operator-sign on COMPOSIO_API_KEY in CLAUDE.local.md
- **agentmemory MCP wire** (W373-F050): pending socket.dev + SLSA audit per TIER-2 INSTALL-WITH-CAVEAT verdict
- **Langfuse :3000 crash loop fix** (W373-F002): HIGH; T5 observability dead; defer to W374 or operator manual `docker compose up -d langfuse-postgres`
- **parallel_ratio root-cause investigation** (W373-F003): 4 hypotheses queued per Stream D (bypass-marker overuse / UserPromptSubmit absence / TURN_WINDOW_MS tight / regex over-trigger)
- **27 stale local branches sweep** (W373-F032): `git branch -D` × N (preserve goal/W362* + goal/W37*) — deferred to operator-confirm batch
- **6 marketplace SHA refreshes** (claude-plugins-official outliers + wshobson cluster + obra/superpowers + everything-claude-code + hindsight excise): bulk `/plugin update` + `/reload-plugins` requires interactive operator session
- **typescript-lsp dual-scope** (W373-F025): operator-decision on project vs user scope retention
- **PERPLEXITY_API_KEY 401 quota** (W373-F060): operator-side env refresh in CLAUDE.local.md

## Acceptance ledger

- **codex r1 (P4)**: <pending — fill at P5>
- **codex r2 (P4)**: <pending — fill at P5>
- **Operator sign**: see `docs/architecture/W373-SOTA-READY/OP-SIGN.md`
- **Wave-close synthesis**: see `docs/architecture/W373-SOTA-READY/README.md`

## Cumulative ledger position

- **Pre-W373 cumulative**: ~96 verdicts post-W320 (per CLAUDE-MD-STATUS-CURRENT-W324.md L96)
- **W373 contributions**: 6 P3 LIVE-remediation rows + this wave-ledger row = 7 net
- **Post-W373 cumulative**: ~103 verdicts (will be re-counted at P5 against T6 basic-memory canonical)

## Ship SHA

`<final-sha>` on `goal/W373-sota-ready` (will fill at P5 post-codex-approve + squash-PR-to-main)
