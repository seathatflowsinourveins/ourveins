# W342 Stream X3 — @colbymchenry/codegraph 24h Staging-Pilot Plan (P2.1)

**Wave**: W342-FULL-GAP-RESOLUTE Stream X3
**Date**: 2026-05-20
**Parent ledger**: `docs/architecture/W341-FULL-SOTA-UNLEASH/VERDICT-LEDGER.md` Stream B `colbymchenry/codegraph`
**Status**: **PLAN-ONLY** (24h soak deferred to operator wall-clock decision)
**Sister doc**: `X3-mcp-installs.md` §3

## §1 Pilot scope

CodeGraph is a pre-indexed code knowledge-graph MCP that competes with two existing primitives in this runtime:

1. **serena** (`oraios/serena` SHA-pinned in `.mcp.json:42`) — LSP-based symbol-graph, language-server-aided refactors.
2. **local-cypher-codebase** skill (operator-curated, listed in CLAUDE.md `## Pointers` set, fires serena+Grep chains for graph walks).

Pilot question (G3 from W341 Stream B): does CodeGraph's tree-sitter+SQLite pre-indexed graph deliver enough latency/accuracy improvement over serena+Grep chains to justify a 3rd graph primitive?

**Claimed gains** (from `gh api repos/colbymchenry/codegraph/contents/README.md`): "94% fewer tool calls, 77% faster exploration, 100% local" — tested across 6 codebases comparing Claude Code Explore-agent with vs without CodeGraph. Tests on Opus 4.6/1M with Claude Code v2.1.91 measured 3 calls/39s vs 40 calls/68s (Python+Rust) and 1 call/19s vs 26 calls/82s (Java).

**Pilot's job**: replicate these claims (or refute) on this runtime's actual codebase (`Z:/claude-sota-installed/` + sibling `Z:/claude-sota/`).

## §2 Pre-flight checks (verified 2026-05-20)

| Axis | Value | Probe |
|---|---|---|
| Package | `@colbymchenry/codegraph@0.7.10` | `npm view @colbymchenry/codegraph version` |
| License | **MIT** | `npm view @colbymchenry/codegraph license` |
| Maintainer | `colbymchenry <me@colbymchenry.com>` | `npm view @colbymchenry/codegraph maintainers` |
| Repo | `colbymchenry/codegraph` 9,094★ 565 forks | `gh api repos/colbymchenry/codegraph` |
| Activity | Pushed 2026-05-20T17:15:56Z (active <5h) | same probe |
| Published | 2026-05-19T (1 day fresh) | `npm view @colbymchenry/codegraph` |
| Direct deps | **10**: `@clack/prompts@^1.3.0`, `commander@^14.0.2`, `fast-string-width@^3.0.2`, `fast-wrap-ansi@^0.2.0`, `jsonc-parser@^3.3.1`, `node-sqlite3-wasm@^0.8.30`, `picomatch@^4.0.3`, `sisteransi@^1.0.5`, `tree-sitter-wasms@^0.1.11`, `web-tree-sitter@^0.25.3` | `npm view @colbymchenry/codegraph dependencies` |
| Optional deps | `better-sqlite3` (native, falls back to `node-sqlite3-wasm` WASM if native compile fails) | README §"Indexing is slow" troubleshooting |
| Bin | `codegraph: dist/bin/codegraph.js` | `npm view @colbymchenry/codegraph bin` |
| Unpacked size | 7.7 MB | `npm view @colbymchenry/codegraph` |
| SLSA-L3 attestation | NOT YET checked (queued — `npm view @colbymchenry/codegraph publishConfig` returned no provenance) | TODO before pilot start |
| Sigstore | Same TODO | |

### Pre-flight TODOs before pilot start (operator gate)

1. Verify SLSA attestation: `npm install --provenance @colbymchenry/codegraph@0.7.10 --dry-run` OR `npm view @colbymchenry/codegraph dist.attestations`.
2. Run `npm audit @colbymchenry/codegraph@0.7.10` for known CVEs in the 10 transitive deps.
3. Verify `better-sqlite3` native-compile works on Z:-portable Windows venv (else WASM fallback engaged — 5-10× slower per README).

## §3 What to measure during 24h soak

### 3.1 Latency (MCP tool-call timings)

Capture p50/p95/p99 for each of the 8 codegraph MCP tools (`codegraph_search`, `codegraph_context`, `codegraph_callers`, `codegraph_callees`, `codegraph_impact`, `codegraph_node`, `codegraph_status`, `codegraph_files`).

**Compare** vs equivalent serena tool-chains:
- `codegraph_search` ↔ `serena:find_symbol` + Grep
- `codegraph_context` ↔ `serena:find_referencing_symbols` + Read
- `codegraph_callers` / `codegraph_callees` ↔ `serena:find_referencing_symbols` filtered
- `codegraph_impact` ↔ N-hop traversal via serena symbol graph

Tool: use existing `langfuse` MCP traces (already wired per `.mcp.json:53-62`) — instrument both codegraph and serena tool calls; query langfuse for p50/p95/p99 per tool over 24h window.

### 3.2 Accuracy vs serena symbol-graph (overlap %, F1)

For a fixed set of 5 representative queries (e.g. "find all callers of `Bash` tool", "what depends on `parallel-dispatch-mandate` skill"), run BOTH codegraph + serena, compute:

- **Recall**: |codegraph ∩ serena| / |serena|
- **Precision**: |codegraph ∩ serena| / |codegraph|
- **F1**: 2PR/(P+R)

Threshold for PASS: F1 ≥ 0.80 (each tool returns substantively the same symbol set).

### 3.3 MCP tool-call rate (calls/hour)

If CodeGraph's claim holds, parent-agent tool-call volume on equivalent tasks should drop ~94%. Measure via langfuse trace count per task in pilot session vs baseline (recent W341 wave traces).

### 3.4 Memory/CPU under load

- CodeGraph spawns a background MCP daemon (`codegraph serve --mcp`) holding the SQLite-WASM/native index in memory. Measure RSS at idle, after `codegraph init` on `Z:/claude-sota-installed/`, and during peak query load.
- Auto-sync (debounced 2s on file events per README §4) — measure CPU% during high-churn git operations (rebase, multi-file edit).

### 3.5 Crash/restart count

Count MCP daemon restarts via Claude Code `.claude/debug/` logs. Threshold for PASS: ≤2 restarts in 24h.

### 3.6 Tool-call rate compatibility (CR-9 friction probe)

If Option-A npx-pinned form (per `X3-mcp-installs.md` §3) is used, measure cold-start overhead vs Option-B global-install. Compare to existing 4 npx-pinned MCPs (playwright, chrome-devtools, repomix, phoenix per W286-cross precedent).

## §4 Rollback plan

If any metric fails (F1 < 0.80, restarts > 2, RSS > 1GB, latency p95 > serena baseline × 2):

1. **Disable**: remove `codegraph` stanza from `.mcp.json` (single atomic JSON edit).
2. **Uninstall** (Option B only): `npm uninstall -g @colbymchenry/codegraph`.
3. **Restart CC**: `/reload-plugins` + restart session.
4. **Verify**: `serena` MCP tools still functional via `mcp__serena__get_current_config`.

Rollback time budget: ≤5 min.

## §5 Pilot invocation form

### Option A (CR-9 compliant — RECOMMENDED for pilot)

```json
"codegraph": {
  "type": "stdio",
  "command": "npx",
  "args": ["-y", "@colbymchenry/codegraph@0.7.10", "serve", "--mcp"]
}
```

Pre-pilot: `cd Z:/claude-sota-installed && npx -y @colbymchenry/codegraph@0.7.10 init` (one-time index build).

### Option B (departs CR-9 — fallback if Option A cold-start > 3s)

Pre-install: `npm install -g @colbymchenry/codegraph@0.7.10`

```json
"codegraph": {
  "type": "stdio",
  "command": "codegraph",
  "args": ["serve", "--mcp"]
}
```

CR-9 trade-off note: same trade-off shape as W286-cross's 4 pinned MCPs (npx-pinned vs direct-node) — operator decision based on measured cold-start.

## §6 Cite-anchors

- W341 Stream B `colbymchenry/codegraph` decision row (T1-CONDITIONAL pending 24h soak).
- README `gh api repos/colbymchenry/codegraph/contents/README.md` decoded — claims 94%/77% from §"Benchmarks" + MCP invocation pattern from §"MCP Server" + 8-tool inventory from §"MCP Tools".
- npm probes 2026-05-20T20:37Z (this session).
- CR-9 contract: CLAUDE.md cardinal-rule-2 + `.mcp.json` `_comments.w286_cross_npx_pinned_v2`.
- W286-cross trade-off precedent: same `_comments` block (operator-accepted ~0.5-1s cold-start for Z:-portability).
- Existing serena baseline: `.mcp.json:39-43` (SHA-pinned `249f6b07...`).

## §7 Operator gate

This plan is **PLAN-ONLY**. The 24h soak start requires operator wall-clock decision:

- Choose Option A or Option B per §5.
- Execute pre-flight TODOs in §2.
- Initialize index (`codegraph init` on `Z:/claude-sota-installed/`).
- Start soak timer; collect metrics §3 over 24h.
- Apply rollback §4 OR ratify per `X3-mcp-installs.md` §3 GO recommendation.

Suggested W342 follow-up wave: **W343-CODEGRAPH-SOAK** post-24h verdict.
