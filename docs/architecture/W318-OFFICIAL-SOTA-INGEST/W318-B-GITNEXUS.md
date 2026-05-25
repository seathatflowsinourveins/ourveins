# W318-B Stream — abhigyanpatwari/GitNexus Re-Audit

**Wave**: W318 Stream B
**Date**: 2026-05-19
**Source**: `Z:/repos/deps/GitNexus`
**Prior verdict**: W317-D pattern-extracted (2 patterns: PreToolUse Grep-augment + cypher MCP-tool pattern); T3 PATTERN-STUDY HOLDS per W312 row 47 (convergent hard-caps D8=1 PolyForm-Noncommercial + D14=3 CR-9-unpinned + D16=2 solo-bus-factor + D24=2 MCP-attack-surface floor)

## §1 — License re-verification

| Metric | Value |
|---|---|
| LICENSE file content (head) | **`PolyForm Noncommercial License 1.0.0`** at `https://polyformproject.org/licenses/noncommercial/1.0.0` |
| Comparison to W312 | **UNCHANGED** |
| **D8 hard-cap** | **1 (PolyForm-NC; commercial use prohibited)** |

PolyForm-Noncommercial 1.0.0 explicitly forbids commercial use. For our SOTA-research adoption decision, this is a P0 hard-cap.

## §2 — Recent upstream activity (last 20 commits)

```
98addbd6 chore(deps)(deps-dev): bump @types/node in /gitnexus (#1436)
f2914786 chore(deps)(deps): bump fast-uri from 3.1.0 to 3.1.2 in /gitnexus (#1441)
b89ec5b5 chore(deps)(deps): bump hono from 4.12.16 to 4.12.18 in /gitnexus (#1443)
5bfe0c52 chore(deps)(deps): bump onnxruntime-node in /gitnexus (#1435)
5497079a fix(search): surface warning when FTS indexes are missing (#1418)
1d46200c fix(lbug): robust Windows lock acquisition for CI integration tests (#1430)
8ca9cb1a fix(lbug): recover from WAL corruption by quarantining .wal file (#1402) (#1417)
927a1726 perf(mcp): parallelize staleness checks in list_repos (#1416)
c8a1ecf6 fix(ingestion): close ReDoS in cobol-preprocessor + rust-workspace + resource-exhaustion in cross-impact (U8) (#1331)
9d015164 fix: actionable HF_ENDPOINT guidance, retries, timeout and circuit breaker when embedding model download fails (#1419)
296a5712 fix(security): close URL/regex/tag-filter sanitization cluster (U7) (#1330)
0824b96d chore(deps)(deps-dev): bump @types/node in /gitnexus (#1421)
d3a7ce95 feat(core): adopt pino structured logger (#1336)
```

### Security-relevant fixes (NEW since W317)
- ✅ `c8a1ecf6 fix(ingestion): close ReDoS in cobol-preprocessor + rust-workspace + resource-exhaustion in cross-impact (U8)`
- ✅ `296a5712 fix(security): close URL/regex/tag-filter sanitization cluster (U7)`
- ✅ `8ca9cb1a fix(lbug): recover from WAL corruption by quarantining .wal file`
- ✅ `1d46200c fix(lbug): robust Windows lock acquisition for CI integration tests`

These are operationally-good but do NOT alter the license-hard-cap (D8=1).

## §3 — Pattern-extraction confirmation

W317-D extracted 2 patterns from GitNexus into our runtime:
1. **PreToolUse Grep-augment** — used in our hooks to augment grep with code-graph context
2. **Cypher MCP-tool pattern** — referenced in our `local-cypher-codebase` SKILL.md

Both patterns are documented and integrated; pattern-study is the correct verdict (extract patterns, do not install primitive).

## §4 — sca-v7.1 re-audit (delta from W312)

| Dim | W312 score | W318 score | Delta |
|---|---|---|---|
| D5 release cadence | 5 | 5 | 0 |
| D8 license (PolyForm-NC) | **1 (HARD-CAP)** | **1 (HARD-CAP)** | 0 |
| D14 install spec (`npx -y gitnexus@latest mcp`) | **3 (HARD-CAP — unpinned)** | 3 | 0 |
| D16 bus_factor | **2 (HARD-CAP — solo)** | 2 | 0 |
| D24 mcp_attack_surface | **2 (HARD-CAP — MCP server)** | 2 | 0 |
| D29 browse_retrieval_quality | 5 | 5 | 0 |
| D31 silent_fallback_density | 4 | 4 | 0 |
| D32 pin_freshness_lag_norm | 4 | 5 | +1 (deps weekly bumps, security PRs U7/U8) |

**Composite install_score**: STILL CAPPED at **<T3** floor due to 4 simultaneous hard-caps (D8 + D14 + D16 + D24). Per sca-v7 Phase-5 strict-letter, 4 hard-caps simultaneously → T3 PATTERN-STUDY ceiling regardless of any positive lift.

## §5 — VERDICT

| Item | Verdict |
|---|---|
| Upstream activity | **VERY ACTIVE** (deps bumps + security U7/U8 fixes + Windows-lock CI hardening) |
| License | **PolyForm-NC UNCHANGED** — commercial-use hard-cap holds |
| **T3 PATTERN-STUDY** | **HOLDS** — 4 simultaneous hard-caps (D8 + D14 + D16 + D24) cap install_score below T3 floor |
| Pattern extraction | **W317-D 2-pattern fork confirmed** — Grep-augment hook + Cypher MCP-tool conceptual reference |
| **Recommendation** | **DO NOT INSTALL** as primitive; settings.json `enabledPlugins:False` for `gitnexus-marketplace` is CORRECT state |
| **W319 forwards** | **NO action needed** — pattern-study verdict stable, no upstream commercial-friendly license-change |
