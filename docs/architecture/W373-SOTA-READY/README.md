# W373-SOTA-READY — Wave navigation

This wave landed a catalog-grade SOTA-readiness audit + remediation pass to unblock W374-EXT Tasks 7-9 (CoVe / test-gate / Jury-on-Demand quality amplifications).

**Wave window**: 2026-05-22
**Branch**: `goal/W373-sota-ready`
**Baseline ratify**: W370 HEAD chain `c1716d1` → `de00be5` → `d40f8ba`
**Approach**: A++ (6-stream parallel audit + CoVe-equivalent synthesis + topo-sorted remediation)

## Artifacts (in order of audit flow)

| File | Purpose |
|------|---------|
| `CATALOG-CROSS-CHECK-LEDGER.md` | 50-row Tier 1+2 cross-check against `docs/architecture/SOTA-RUNTIME-2026-05-22/LANDSCAPE.md` |
| `W373-FINDINGS.md` | 95 synthesized findings (post-dedupe + post-sca-v18 + topo-sorted) |
| `REMEDIATION-MANIFEST.md` | Actionable remediation plan: LOW auto-fire + HIGH jury-gate per finding |
| `SHIP-GATE-RESULTS.md` | codex r1+r2 verdicts (P4 output — created at P5 stage) |
| `VERDICT-LEDGER-DRAFT.md` | DRAFT per-phase verdict ledger + carry-forward (becomes `VERDICT-LEDGER.md` at P5 final-stamp) |
| `OP-SIGN.md` | Operator-acceptance record (manual signoff per finding) |
| `README.md` (this file) | Wave navigation index |

## Stream raw outputs (audit-trail provenance)

| Stream | Owned file | Findings | Highlights |
|--------|------------|----------|------------|
| A — Runtime inventory | `.claude/state/W373-stream-A-runtime-inventory.md` | 32 | 16 MCPs · 47 plugins · 63 skills surface |
| B — SOTA catalog gap-find | `.claude/state/W373-stream-B-sota-catalog-gapfind.md` | 13 | 3 named-repo verdicts + multi-MCP convergence |
| C — Git automation | `.claude/state/W373-stream-C-git-automation.md` | 20 | 5 worktrees · 24 CI workflows · 13 pre-commit gates · branch-protection |
| D — Hidden errors | `.claude/state/W373-stream-D-hidden-errors.md` | 15 | parallel_ratio empirical re-probe (FAIL 0.028 vs 0.7 target) |
| E — MCP/memory live | `.claude/state/W373-stream-E-mcp-memory-live.md` | 6 (table emitted 8) | 15/16 MCPs alive; T5 Langfuse :3000 DOWN crash loop |
| F — Cite refresh | `.claude/state/W373-stream-F-cite-refresh.md` | 19 | CRITICAL: mattpocock fabricated SHA (CR-6 violation) |

**Raw stream-total**: 107 findings → **synthesized after 12 cross-stream merges**: 95 findings.

## Jury prep (HIGH carry-forward)

35 HIGH-batch findings comprise **30 HIGH-table rows** (canonical W373-FINDINGS.md table `Risk: HIGH` count) + **5 jury-flagged LOWs** (F024/F036/F047/F048/F058 — synthesizer-flagged for jury despite LOW risk-class due to evidence ambiguity).

- **30 brief files** committed at `.claude/state/W373-jury-prep/W373-F*-brief.md` (matches HIGH-table row count exactly; W373-F001 brief is the operator-approved CR-6 CRITICAL-class exception that landed in P3)
- **5 jury-flagged-LOW briefs**: deferred as carry-forward to a follow-up wave (logged in VERDICT-LEDGER.md and REMEDIATION-MANIFEST.md)
- **W373-F006 + W373-F013** (the 2 P3-landed HIGH-gate-bypasses per codex r2 UPHOLD-PRESCRIPTIVE on Theme 3): operator-retro-accept pending OR follow-up-wave-jury-and-revert-if-not-approved
- See "HIGH-Count Reconciliation" + "P3 Fix-ID Cross-Reference" sections in `W373-FINDINGS.md` for full context

## P3 remediations LANDED this wave

**NOTE**: 3 of the 6 P3 commits used INCORRECT W373-Fnnn IDs in their commit messages (Stream-level F-Fnnn IDs that numerically collided with unrelated canonical IDs). The table below shows BOTH the commit-msg-claimed ID and the CORRECT canonical ID per W373-FINDINGS.md. See "P3 Fix-ID Cross-Reference (Theme 2 reconciliation)" section in W373-FINDINGS.md for the full audit trail.

| Commit-msg-claimed ID | CORRECT canonical ID | Type | Subject | Commit |
|----------------------|---------------------|------|---------|--------|
| W373-F001 | W373-F001 ✓ | cite_refresh (CRITICAL, HIGH sca 1.2) | mattpocock fabricated SHA → live HEAD `67bce91c80cd` | 85e247f |
| W373-F033 | W373-F033 ✓ | cite_refresh (LOW sca 5.0) | CLAUDE.md L35 `marketplace_dirs` 23 → 22 | 2365d27 |
| W373-F006-F008-F009 | **W373-F013** | settings_surgery (HIGH sca 2.5) | CLAUDE.md L20 sync to live (14/43) | 8a9603e |
| W373-F018 | W373-F018 ✓ | cite_refresh (HIGH sca 3.0 boundary) | CLAUDE.md skill count `× 63` → `62 + 1 archived` | 75cfa4f |
| W373-F012 | **W373-F007** (and W373-F023 cross-stream dup) | cite_refresh (HIGH sca 3.0 boundary) | CLAUDE.md L11 architecture-cite repaired (W254 path) | d889702 |
| W373-F005 | **W373-F006** | doc_create / cite_refresh (HIGH sca 2.0) | W336-FQN-SUBAGENT-TYPE.md stub created | ade8731 |

## Spec + plan

- **Spec**: `docs/superpowers/specs/2026-05-22-W373-SOTA-READY-design.md` @ c1716d1
- **Plan**: `docs/superpowers/plans/2026-05-22-W373-SOTA-READY-execution-plan.md` @ de00be5
- **Phase status**: `.claude/state/W373-phase-status.json`

## Cross-references

- **Prior wave** (W370): substrate-carryforward + parallel-ratio CI gate
- **Sibling wave** (W374-EXT): unblocked by this wave (Tasks 7-9)
- **Reference catalog**: `docs/architecture/SOTA-RUNTIME-2026-05-22/LANDSCAPE.md`
- **sca-v18 rubric**: `.claude/schemas/sca-v18-repo-verdict.schema.json` @ bd4fadd

## How to extend (follow-up waves)

1. Read `VERDICT-LEDGER.md` (post-P5 stamp) for canonical truth
2. Read `OP-SIGN.md` for operator-acceptance state per finding
3. Walk `REMEDIATION-MANIFEST.md` for any HIGH finding with `**JURY before X**` annotation needing actual dispatch
4. For LOW deferred rows, see `REMEDIATION-MANIFEST.md` "Edit-required" + "Operator-defer" + "Coalesced" sections
