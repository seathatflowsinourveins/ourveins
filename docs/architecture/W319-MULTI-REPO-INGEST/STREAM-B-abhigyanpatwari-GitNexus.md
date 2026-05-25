# STREAM-B-abhigyanpatwari-GitNexus — W319 Stream B

## HEAD-SHA-AT-INGEST
- `98addbd6c4e7aff77b5c33242d08155afe94ed35` @ 2026-05-09 07:30:05 +0100
- Latest CHANGELOG release: `[1.5.3] - 2026-04-01`; unreleased section migrates KuzuDB → LadybugDB v0.15
- W314-r1 status: HOLD-T3 (license PolyForm Noncommercial unchanged)

## CITE-DRIFT

| Cite location | Cited value | Current truth | Action |
|---|---|---|---|
| CLAUDE.md L42 (W314-r1) | "GitNexus HOLD-T3 license unchanged" | License STILL `PolyForm Noncommercial 1.0.0` (LICENSE file line 1) | none — verdict invariant |
| W314 GitNexus cohort | non-commercial license bars commercial install | License unchanged | none |
| `.claude/skills/gitnexus/SKILL.md` (installed local skill) + `.claude/skills/local-cypher-codebase/SKILL.md` | "Built-in graph walks via serena symbol-find + Grep chains; no external service required" | Strategy unchanged; gitnexus skill remains as pattern-only documentation | none |

ZERO drift; license-class blocker holds.

## NET-NEW-PATTERNS (since W314-r1)

| PRIO | Pattern | Cite (path:line) | Why net-new |
|---|---|---|---|
| 1 | LadybugDB v0.15 migration (replaces KuzuDB) | CHANGELOG.md `[Unreleased]` section + `lbug-adapter.ts` | NET-NEW backend swap. Affects: storage path renamed `.gitnexus/kuzu → .gitnexus/lbug`; auto-cleanup of stale KuzuDB index files; VECTOR extension explicitly loaded for semantic search. **NOT relevant to harness-fit** (license blocks install). PRIO-1 informational. |
| 1 | `(search): surface warning when FTS indexes are missing` (PR #1418, `5497079a`) | commit `5497079a` | Silent-fallback hardening — aligned with our W314-r2 F-1 to F-9 fixes. PRIO-1 pattern alignment confirmation. |
| 2 | `(lbug): robust Windows lock acquisition for CI integration tests` (PR #1430, `1d46200c`) | commit `1d46200c` | Windows-specific lock handling. PRIO-2 informational. |
| 2 | `(lbug): recover from WAL corruption by quarantining .wal file` (PR #1402, `8ca9cb1a`) | commit `8ca9cb1a` | Resilience pattern: quarantine corrupted WAL file vs crash. PRIO-2 pattern. |
| 2 | `(mcp): parallelize staleness checks in list_repos` (PR #1416, `927a1726`) | commit `927a1726` | Parallelization in staleness checks — aligned with our parallel-dispatch-mandate philosophy. PRIO-2 informational. |
| 2 | `(ingestion): close ReDoS in cobol-preprocessor + rust-workspace + resource-exhaustion in cross-impact (U8)` (PR #1331, `c8a1ecf6`) | commit `c8a1ecf6` | Multiple ReDoS + resource-exhaustion fixes. PRIO-2 supply-chain pattern. |
| 3 | `actionable HF_ENDPOINT guidance, retries, timeout and circuit breaker when embedding model download fails` (PR #1419, `9d015164`) | commit `9d015164` | Circuit-breaker pattern for embedding-model download failures. PRIO-3. |
| 3 | TypeScript MethodExtractor config (#588) | CHANGELOG.md `[1.5.3]` Added | Language-aware symbol resolution improvement. PRIO-3 informational. |
| 3 | Azure OpenAI compat: `max_completion_tokens` vs deprecated `max_tokens` (#618) | CHANGELOG.md `[1.5.3]` Fixed | Provider-compat pattern. PRIO-3. |
| 3 | `Wiki HTML viewer script injection — escape </script> in embedded JSON` (#618) | CHANGELOG.md `[1.5.3]` Fixed | XSS prevention in LLM-generated markdown. PRIO-3. |
| 4 | `gitnexus-claude-plugin/` + `gitnexus-cursor-integration/` cross-harness skill dirs | top-level dirs | Cross-harness portability. PRIO-4. |
| 4 | `ARCHITECTURE.md` — monorepo CLI/MCP + browser UI documented at line-level | `ARCHITECTURE.md` lines 1-30 | Internal docs. PRIO-4 informational. |
| 4 | OpenSSF Scorecard badge | `README.md` line ~30 | Quality signal — `securityscorecards.dev/viewer/?uri=github.com/abhigyanpatwari/GitNexus` is anchored upstream. PRIO-4 informational. |
| 5 | Cryptocurrency disclaimer at README top | `README.md` line 1 | Pump.fun anti-scam disclaimer. Curious; informational. |

## STALE-IN-UPSTREAM
- W295/I9 reference to `gitnexus` was archived to historical local-cypher-codebase skill (verified at `.claude/skills/local-cypher-codebase/SKILL.md`); current strategy uses serena + grep instead. No stale upstream cites pointing at active install.

## HARNESS-FIT
- Decision: HOLD-T3 (PolyForm Noncommercial license bars commercial use; this runtime is operator-personal but caching/redistribution constraints apply)
- Action: no install; preserve as pattern-reference only
- License: **PolyForm Noncommercial 1.0.0** — `<https://polyformproject.org/licenses/noncommercial/1.0.0>`
- W320 micro-action: confirm `.claude/skills/gitnexus/SKILL.md` says "pattern-only no external service required" (verified yes); no cite-refresh needed

## License
PolyForm Noncommercial 1.0.0
