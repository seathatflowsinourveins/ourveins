# W329-J — Banner Application STATS

**Wave**: W329 Stream-J · **Date**: 2026-05-19

## Counts

| Metric | Count | Notes |
|---|---|---|
| LEDGER total rows | 66 | per W329-B Stream-B audit |
| RETAINED (skip) | 36 | independent of GH-MCP/HF narratives |
| Already-marked (no W329-J action) | 3 | rows 27, 28, 64 (filename + in-wave) |
| **Banner targets requiring W329-J action** | **27** | 13 W-UE + 5 W-RE + 9 A |
| W-UE banners applied (NARRATIVE-RESCINDED) | 13 | ✓ |
| W-RE banners applied (FLAGGED-FOR-REVIEW) | 5 | ✓ |
| A banners applied (AMBIGUOUS) | 9 | ✓ (row 53 parent-side post-crash) |
| **Total W329-J banners applied** | **27** | 27/27 = 100% |

## Wave-doc distribution

| Wave | W-UE | W-RE | A | Total |
|---|---|---|---|---|
| W314 | 1 | 0 | 1 | 2 |
| W315 | 4 | 0 | 0 | 4 |
| W318 | 0 | 0 | 1 | 1 |
| W319 | 1 | 0 | 0 | 1 |
| W320 | 4 | 2 | 3 | 9 |
| W321 | 0 | 1 | 1 | 2 |
| W322 | 0 | 1 | 0 | 1 |
| W325 | 2 | 0 | 2 | 4 |
| W326 | 1 | 1 | 2 | 4 |
| **Total** | **13** | **5** | **9** | **27** |

## Crash incident

| Field | Value |
|---|---|
| Subagent | W329-J banner-applier |
| Error | API Error: stream error stream ID 1; INTERNAL_ERROR |
| Crash duration | ~420s |
| Tool_uses at crash | 60 |
| File at crash | W318-A-SILENT-FALLBACK-V6.md (LEDGER row 8) |
| Banner state at crash | L3 top-of-doc AMBIGUOUS banner WAS applied |
| Recovery | parent-side via Edit + grep verification |
| Remaining work | row 53 manually applied; all other rows grep-verified |

## Verification methods used (parent-side)

1. **Grep pattern**: `(W329-B|W329-NARRATIVE-DEBT|W328-S2|W329-S2-REAUDIT|RESCINDED|NEEDS-RE-EXAM)` — confirms banner text present
2. **Per-wave directory scan**: 6 wave directories (W314, W318, W320, W321, W325, W326)
3. **Per-row line-anchor read**: sampled F-5 (W314), §1 (W325), §3.4 (W326), L3 (most A/W-RE) for banner-text-quality

## Time budget

- W329-B LEDGER authoring: prior session (W329 Stream B subagent)
- W329-J initial dispatch: prior session, crashed mid-stream
- W329-J parent-side recovery: this session
- Total recovery time: ~10 min (this turn)
