# W373-SOTA-READY Operator Acceptance Record

> Operator: fill in sign-off per row before final ship to main. Mark `APPROVE` / `REVISE` / `BLOCK` in the Verdict column; add free-form notes/dates as needed.
>
> Verdict column states:
> - `APPROVE` — accept as-shipped
> - `REVISE` — minor revision before main-merge
> - `BLOCK` — material blocker; defer or escalate
> - `DEFER` — accept verdict but defer execution to follow-up wave

| # | Item | Verdict | Sign / Notes | Date |
|---|------|---------|--------------|------|
| OP-1 | Approach (Approach A++ with 6 parallel streams) | ⬜ APPROVE | | |
| OP-2 | Stream A findings (32 — runtime inventory) | ⬜ APPROVE | | |
| OP-3 | Stream B 3-named-repo verdicts: CCBP cite-only · Composio MCP wire · agentmemory TIER-2 INSTALL-WITH-CAVEAT | ⬜ APPROVE | | |
| OP-4 | Stream C worktree-prune DEFERRED (all 3 W362a/b/c carry SHIPPED-APPROVED commits per Stream C probe) | ⬜ APPROVE | | |
| OP-5 | Stream D parallel_ratio 0.028 FAIL acknowledged; 4 root-cause hypotheses queued | ⬜ APPROVE | | |
| OP-6 | Stream E Langfuse :3000 crash loop HIGH; defer to follow-up | ⬜ APPROVE | | |
| OP-7 | Stream F mattpocock fabricated SHA CR-6 violation — fix landed at W373-F001 (commit 85e247f) | ⬜ APPROVE | | |
| OP-8 | P3 LOW auto-fixes (6 commits: 85e247f / 2365d27 / 8a9603e / 75cfa4f / d889702 / ade8731) | ⬜ APPROVE | | |
| OP-9 | P4 codex r1+r2 ship verdict (to be filled at P5) | ⬜ APPROVE | | |
| OP-10 | CLAUDE.md L20 + L35 internal consistency restored (14 colliding / 43 orphan) | ⬜ APPROVE | | |
| OP-11 | W336-FQN-SUBAGENT-TYPE.md stub created (commit ade8731; commit-msg claimed W373-F005 but canonical ID is W373-F006 — Theme 2 reconciliation) | ⬜ APPROVE | | |
| OP-12 | 35 HIGH-batch jury-briefs: 30 HIGH-table briefs prepped at `.claude/state/W373-jury-prep/` (1 committed: F001-brief; 29 HIGH-table queued; 5 jury-flagged-LOW briefs F024/F036/F047/F048/F058 deferred as carry-forward) | ⬜ APPROVE | | |
| OP-12a | HIGH-gate retroactive accept: W373-F006 (W336-FQN doc-create, sca 2.0) + W373-F013 (L20 14/43 settings_surgery, sca 2.5) landed in P3 without jury per codex r2 UPHOLD-PRESCRIPTIVE on Theme 3 — operator-retro-accept OR revert+jury required | ⬜ RETRO-ACCEPT | | |
| OP-12b | P3 commit-msg ID misalignment (Theme 2): 3 of 6 P3 commits cite Stream-level F-Fnnn IDs that numerically collide with unrelated canonical W373-Fnnn. Live content fixes are correct; only commit-msg ID-string is wrong. Cross-reference table in W373-FINDINGS.md is canonical. | ⬜ ACCEPT-WITH-ERRATA | | |
| OP-13 | Composio MCP wire stanza drafted (pending sign before .mcp.json edit + COMPOSIO_API_KEY) | ⬜ APPROVE | | |
| OP-14 | agentmemory MCP wire stanza drafted (pending socket.dev + SLSA audit per TIER-2 caveat) | ⬜ APPROVE | | |
| OP-15 | CPA-FLEET stash → `feat/cpa-fleet-zero-error` materialization deferred (stash@{0} preserved) | ⬜ APPROVE | | |
| OP-16 | 27 stale local branches sweep deferred (preserve goal/W362* + goal/W37*) | ⬜ APPROVE | | |
| OP-17 | Final ship via squash-PR per W350 P0.1 | ⬜ APPROVE | | |
| OP-18 | F002 Langfuse :3000 crash-loop fix DEFERRED to W374 (or operator manual `docker compose up -d langfuse-postgres`) | ⬜ DEFER | | |
| OP-19 | F003 parallel_ratio root-cause investigation DEFERRED (multi-hypothesis diagnosis required) | ⬜ DEFER | | |
| OP-20 | F004 `.claude/plugins/cache/` absent on W373 worktree — verify by-design (shares parent runtime cache) | ⬜ APPROVE | | |
| OP-21 | F060 PERPLEXITY_API_KEY 401 quota — operator-side env refresh in CLAUDE.local.md | ⬜ DEFER | | |
| OP-22 | F025 typescript-lsp dual-scope decision (project vs user scope) DEFERRED to operator-decision | ⬜ DEFER | | |
| OP-23 | F008 worktree merge/cherry-pick decision for W362a (1272237) + W362b-alpha (a9a6501) + W362c (bf18696) + W362b-beta (4ceaae9) | ⬜ DEFER | | |
| OP-24 | F005 ECC plugin cache-delete + fresh-install (interactive operator session needed) | ⬜ DEFER | | |
| OP-25 | F014 + F015 + F026 bulk plugin SHA refresh (claude-plugins-official outliers + wshobson + obra/superpowers) | ⬜ DEFER | | |

## Final operator signoff

**Wave-close approval**:

Signed: ____________  Date: __________  Branch: `goal/W373-sota-ready` @ <final-sha>

**Notes** (free-form):

```
<operator notes here at signoff time>
```
