# W341 Stream G — GitNexus / codegraph / Insights Audit

**Wave**: W341-FULL-SOTA-UNLEASH · **Date**: 2026-05-20 · **Owner**: Stream G
**Scope**: Code-knowledge-graph capability audit + Insights feature canonical-surface recommendation.
**Budget**: ≤15 calls / ≤140k tokens — actual ~9 calls.

---

## §1 — Current code-knowledge-graph capability

### Inventory

| Capability | Source | Status | Notes |
|---|---|---|---|
| `local-cypher-codebase` skill | `.claude/skills/local-cypher-codebase/SKILL.md` (143 LOC) | LIVE | Pattern-extracted from GitNexus per W288 ledger row 33; serena + Grep chains; no install. |
| `serena.find_symbol` | `mcp__serena__find_symbol` MCP | LIVE | LSP-backed symbol lookup. |
| `serena.find_referencing_symbols` | `mcp__serena__find_referencing_symbols` | LIVE | Callers/refs via LSP. |
| `serena.find_implementations` | `mcp__serena__find_implementations` | LIVE | Method overrides / MRO chain. |
| `serena.get_symbols_overview` | `mcp__serena__get_symbols_overview` | LIVE | File-level symbol tree. |

### Functional gap vs Cypher (per GitNexus deepwiki §4 + §5)

| Cypher feature | local stack support | gap-severity |
|---|---|---|
| `MATCH (a)-[:CALLS]->(b)` callers/callees | YES — `find_referencing_symbols` | none |
| `HAS_METHOD` class→methods | YES — `get_symbols_overview` | none |
| `METHOD_OVERRIDES` MRO | YES — `find_implementations` (LSP-defined) | none |
| `ACCESSES {reason:'write'}` field-writer detection | PARTIAL — 2-pass serena + `Grep '\.field\s*='` | minor (regex fragile) |
| **Diamond inheritance / community-detection (Leiden)** | NO — needs explicit graph index | **moderate** |
| **Hybrid BM25 + vector embedding search** | NO — serena is text/LSP only | **moderate** |
| **Process / execution-flow tracing** | NO — call-graph approximation only | **moderate** |
| **Pre-computed graph index** (instant query) | NO — every walk is re-computed | latency-only |
| **`api_impact` / `route_map` / `shape_check`** | NO | **moderate** (web-app specific) |
| **Cross-repo group-sync / Contract Registry** | NO | **moderate** (only relevant if multi-repo) |
| **Blast-radius `impact` at depth-N** | PARTIAL — manual transitive walk | minor |

**Verdict**: For ≤100k-LOC single-repo work — local stack is **functionally sufficient** for the top-5 patterns operators ask. For diamond-detection, large monorepos, web-route-shape checks, or pre-indexed sub-second queries — there is a real gap.

---

## §2 — GitNexus deep-audit + verdict

### Facts (cite-anchored)

- **Repo**: `abhigyanpatwari/GitNexus` (deepwiki structure §1-§12; gh-api 2026-05-20)
- **Stars**: 39,307 · **Default branch**: `main` · **Last push**: 2026-05-20T19:39:39Z (≤1 hour ago at audit time)
- **Releases**: 26+ `v1.6.6-rc.N` candidates in last 4 days (2026-05-16 to 2026-05-20) — VERY active, but RC-cadence implies pre-1.6.6 churn
- **License**: `NOASSERTION` per gh-api → confirmed PolyForm-Noncommercial 1.0.0 per deepwiki ask_question response + local skill cite (line 11) + W288-VERDICT-LEDGER row 33
- **Storage**: LadybugDB (was KuzuDB) — pre-built graph index
- **MCP tools** (13 exposed): `list_repos`, `query`, `context`, `impact`, `detect_changes`, `rename`, `cypher`, `api_impact`, `route_map`, `tool_map`, `shape_check`, `group_list`, `group_sync`
- **Differentiators vs local stack**: Leiden community detection · BM25 + vector hybrid search · pre-computed graph (sub-second `cypher`) · API route/shape checking · multi-repo Contract Registry

### sca-v15 scoring

| Dim | Score | Rationale |
|---|---|---|
| D1 freshness | **5/5** | Pushed ≤1h ago; 26+ RC tags in 4 days |
| D2 stars/community | **5/5** | 39.3k stars |
| D3 fit (code-graph + MCP) | **5/5** | Direct CR-3 subagent integration |
| D4 cardinal-rule trust | **0/5** | Trust-tuple item (c) FAIL — no SLSA/Sigstore/npm-provenance found |
| D5 PolyForm-NC license | **0/5** | **BLOCKER** — D8=1 PolyForm-Noncommercial 1.0.0 incompatible with cardinal-rule-1 R5 trust-tuple item (b) "MIT/Apache/BSD/ISC/MPL OK; AGPL/SSPL/proprietary case-by-case". Non-commercial restriction blocks any future commercial use of this runtime. |
| D6 install complexity | 3/5 | Tree-sitter native + LadybugDB + worker pool — non-trivial |
| D7 unique-capability | **5/5** | Cypher MCP + Leiden + route_map = nothing else has this |

**sca-v15 composite**: **3.29/5 → T3 PATTERN-STUDY** (license-blocker overrides high capability score; identical verdict to W288 ledger row 33).

### Verdict

**T3 PATTERN-STUDY** (RE-AFFIRM W288 row 33). The local-cypher-codebase skill ALREADY mines GitNexus's query patterns (5 of 13 tools have native serena equivalents). No install change recommended; instead enumerate the 8 missing patterns and decide case-by-case.

---

## §3 — codegraph deep-audit + verdict

### Facts (cite-anchored)

- **Repo**: `colbymchenry/codegraph` (deepwiki structure §1-§9; gh-api 2026-05-20)
- **Stars**: 8,973 · **Default branch**: `main` · **Last push**: 2026-05-20T17:15:56Z (~2h ago)
- **Releases**: v0.7.10 (2026-05-19), v0.7.9, v0.7.7, v0.7.6 (2026-05-13) — 4 versions in 7 days, active
- **License**: **MIT** per gh-api `license.spdx_id: "MIT"` (clean — passes R5 trust-tuple item (b))
- **npm provenance**: `@colbymchenry/codegraph@0.7.10` tarball has `signatures[0].sig` (Ed25519 npm-keyid `SHA256:DhQ8wR5APBvFHLF/+Tc+AYvPOdTpcIDqOhxsBHRwC7U`) — npm-signature present, BUT this is npm's standard package-registry sig, NOT SLSA-L3 provenance attestation. Need to verify `npm view @colbymchenry/codegraph attestations` separately.
- **Storage**: SQLite (`better-sqlite3` native + WASM fallback) at `.codegraph/codegraph.db` with FTS5
- **Query language**: NO Cypher; programmatic TypeScript API (`searchNodes`, `getCallers`, `buildContext`, `getImpactRadius`) + CLI (`codegraph query`, `codegraph context`)
- **Languages**: 19+ (TS, JS, Python, Go, Rust, Java, C#, PHP, Ruby, C, C++, Swift, Kotlin, Dart, Svelte, Liquid, Pascal, Scala, Vue)
- **MCP tools (8)**: `codegraph_search`, `codegraph_context` (primary), `codegraph_callers`, `codegraph_callees`, `codegraph_impact`, `codegraph_node`, `codegraph_files`, `codegraph_status`
- **Install**: `npx @colbymchenry/codegraph` or `npm install -g @colbymchenry/codegraph` — auto-configures Claude Code; stdio MCP via `codegraph serve --mcp`; native OS file-watcher for incremental sync
- **Differentiators vs GitNexus**: MIT license · 100% local · stdio MCP (no HTTP server) · npm-distributed · framework-aware route detection (13+ web frameworks) · zero-config Claude Code integration

### sca-v15 scoring

| Dim | Score | Rationale |
|---|---|---|
| D1 freshness | **5/5** | Push ≤2h; 4 releases in 7d |
| D2 stars/community | 4/5 | 8.97k — solid mid-tier, 4.4× smaller than GitNexus |
| D3 fit (code-graph + MCP) | **5/5** | Native Claude Code MCP integration |
| D4 cardinal-rule trust | **3/5** | npm-signature present (partial), but no SLSA-L3 attestation confirmed; transitive deps light (8 prod + 1 optional native) |
| D5 license | **5/5** | MIT (clean) |
| D6 install complexity | **5/5** | One-line `npx` install; auto-configures Claude Code |
| D7 unique-capability | 4/5 | 19+ languages incl. niche (Pascal/Delphi, Liquid, Svelte); FTS5 search; native file-watcher |

**sca-v15 composite**: **4.43/5 → T1 INSTALL candidate**.

### Verdict

**T1-CONDITIONAL** pending:
1. Verify SLSA-L3 attestation via `npm view @colbymchenry/codegraph attestations` (signature present but provenance unconfirmed)
2. Transitive `npm ls @colbymchenry/codegraph` clean of Socket.dev/Snyk-flagged pkgs
3. 24-hour staging-pilot vs local-cypher-codebase on a representative repo (measure: query latency, tool-call reduction, accuracy on top-5 patterns)

If staging-pilot wins on cost-of-tool-calls (codegraph's tagline = "fewer tokens, fewer tool calls, 100% local"), then PROMOTE T1 INSTALL — replaces local-cypher-codebase as primary code-graph surface (skill becomes fallback for offline-only or air-gapped runs).

---

## §4 — Insights feature comparison matrix

### Surfaces

| Surface | Type | Source | Status in THIS runtime |
|---|---|---|---|
| **Anthropic Console dashboard** | Web (`claude.ai/analytics/claude-code`, `platform.claude.com/claude-code`) | Anthropic native | LIVE for Teams/Enterprise — requires UsageView role per `https://code.claude.com/docs/en/analytics` |
| **Anthropic OpenTelemetry export** | OTel metrics + logs | `https://code.claude.com/docs/en/monitoring-usage` | Available but NOT wired here (would feed Langfuse T5 if wired) |
| **context-mode `/ctx-insight`** | Local browser dashboard (`localhost:4747`) | plugin `.claude/plugins/cache/context-mode/context-mode/1.0.146/skills/ctx-insight/SKILL.md` | INSTALLED, functional (verified file present; first-run installs deps ~30s) |
| **context-mode `/ctx-stats`** | CLI verbatim | plugin skill | INSTALLED, read-only token-savings stats |
| **ccusage MCP** | `mcp__ccusage__{blocks,daily,monthly,session,codex-daily,codex-monthly}` | mcp__ccusage plugin | LIVE — verified via probe; returns 60+ active 5-hour blocks from 2026-05-08 → now with per-block tokens / cost / models |
| **Langfuse T5** (self-hosted :3000) | trace/observability UI | CLAUDE.md Runtime state | LIVE v3.160.0 (W340 Stream F probe) — currently NOT instrumented with CC sessions |
| **session-report skill** | one-shot HTML report from `~/.claude/projects/*.jsonl` | thedotmack/session-report plugin | INSTALLED (per skill registry) |

### Capability matrix

| Metric class | Anthropic-native | context-mode `/ctx-insight` | ccusage MCP | session-report |
|---|---|---|---|---|
| Token cost ($) | YES (admin-only) | NO | **YES** (per 5h block, per model) | YES |
| Per-model breakdown | YES via OTel | YES (tool-level) | **YES** (opus/sonnet/haiku) | YES |
| Cache-hit ratio | YES via OTel | partial | **YES** (creation vs read) | partial |
| Tool-usage frequency | NO | **YES** (top tools) | NO | YES |
| Error-rate / failures | NO | **YES** | NO | partial |
| Parallel-work patterns | NO | **YES** (per W325-A parallel_ratio metric) | NO | NO |
| Project-focus (per-repo) | NO | **YES** | NO | YES |
| Skill-firing telemetry | NO | partial | NO | **YES** |
| Live (current session) | NO (lagged) | **YES** (browser refresh) | NO (block boundaries) | NO (one-shot) |
| Programmatic (MCP) | OTel only | NO | **YES** (full tool surface) | NO |
| Anthropic SLA / Terms-of-Service backed | **YES** | NO | NO | NO |

### Functional verdict

- **Anthropic-native dashboard** is **NOT installed** in this runtime's surface (it's a server-side Console feature for Teams/Enterprise admins; this runtime is a single-operator Z:-portable install with no team-org config); the **OTel export** path is available but not wired (could feed Langfuse).
- **context-mode `/ctx-insight`** is the canonical operator-facing dashboard already present — covers tool-usage, parallel-work patterns (the W325-A parallel_ratio measurement target lives here), project focus, error rate.
- **ccusage MCP** is the canonical programmatic cost-surface — best for queries like "what did this wave cost?" or "burn rate projection" (already used here: live block returns `costPerHour: 199.84`, `projection.totalCost: 998.87`).
- **session-report** is the one-shot HTML deliverable for retrospective audits.

---

## §5 — Architecture-synthesis recommendation

### Question A — "do we need gitnexus for synthesis the architecture with sota synthesis?"

**NO**. local-cypher-codebase + serena cover the top-5 Cypher patterns natively. License-blocker (PolyForm-Noncommercial 1.0.0) makes install non-compliant with cardinal-rule-1 R5 trust-tuple item (b). Pattern-study tier holds (W288 row 33 RE-AFFIRMED).

### Question B — codegraph as GitNexus competitor

`colbymchenry/codegraph` is the better install candidate (MIT, npm-distributed, stdio MCP, zero-config). Recommend T1-CONDITIONAL pending SLSA-L3 attestation verification + 24h staging-pilot vs local-cypher-codebase.

### Question C — "do we have insights features enabled?"

YES — multiple, but **fragmented**:
1. `/ctx-insight` (browser dashboard) — operator-facing
2. `ccusage MCP` (programmatic) — agent-facing
3. `session-report` (one-shot HTML) — retrospective audit
4. Anthropic-native dashboard — NOT wired (server-side; needs Teams/Enterprise org config)

**Canonical-surface recommendation per use-case**:

| Use case | Canonical surface |
|---|---|
| "What is this wave costing me?" | `mcp__ccusage__blocks(active:true)` |
| "Show me my parallel_ratio trend / tool usage / focus areas" | `/ctx-insight` browser dashboard |
| "Generate end-of-wave HTML retro" | `/session-report` |
| "Send CC traces to Langfuse for cross-session debugging" | OTel export → Langfuse (NOT yet wired; W340-AI candidate) |
| Team-level adoption metrics (DORA, leaderboard) | Anthropic Console (only if a Teams/Enterprise org is configured — currently N/A) |

**Native Anthropic Insights gap**: the analytics dashboard at `https://claude.ai/analytics/claude-code` is server-side and Team/Enterprise-only — it does NOT auto-enable in a single-operator runtime like this. ccusage + ctx-insight cover the same metric classes locally with no server dependency.

---

## §6 — Install-or-pattern-only verdict

| Candidate | Verdict | Tier | Action |
|---|---|---|---|
| `abhigyanpatwari/GitNexus` | PATTERN-STUDY | **T3** | RE-AFFIRM W288 row 33; license-blocker (PolyForm-NC). NO install. The 13-tool MCP surface is mined into `local-cypher-codebase` for the patterns where serena maps natively (5/13); the remaining 8 are gap-tracked here. |
| `colbymchenry/codegraph` | INSTALL-CONDITIONAL | **T1-CONDITIONAL** | Pending: (1) SLSA-L3 attestation verify; (2) transitive npm-deps clean; (3) 24h staging-pilot. If passes, REPLACES `local-cypher-codebase` as primary code-graph surface — that skill becomes air-gap fallback. |
| Native Anthropic Insights | NOT-APPLICABLE | n/a | Server-side Teams/Enterprise feature; single-operator runtime here. OTel export to Langfuse T5 is the path-forward equivalent. |
| context-mode `/ctx-insight` | KEEP | already-LIVE | Canonical local browser dashboard. |
| ccusage MCP | KEEP | already-LIVE | Canonical programmatic cost-surface. |
| OTel→Langfuse wiring | DEFER | W342+ | OTel-export env-vars exist (cite `monitoring-usage`); wire to existing T5 Langfuse :3000 — W340-AI follow-up candidate. |

### Install steps for codegraph (IF staging-pilot passes)

Per cardinal-rule-1 + W331 axis-1 #3 trust-tuple extension:

1. **License gate** — DONE: MIT confirmed via `gh api repos/colbymchenry/codegraph/license`.
2. **SLSA attestation verify** — `npm view @colbymchenry/codegraph attestations` — verify `provenanceType` includes `https://slsa.dev/provenance/v1` from a trusted CI (GitHub Actions OIDC).
3. **Transitive audit** — `npm view @colbymchenry/codegraph dependencies` shows 8 prod deps (`@clack/prompts`, `commander`, `fast-string-width`, `fast-wrap-ansi`, `node-sqlite3-wasm`, `picomatch`, `sisteransi`, `tree-sitter-wasms`, `web-tree-sitter`) + 1 optional (`better-sqlite3`); Socket.dev/Snyk-flag-check.
4. **Maintainer-identity** — check `colbymchenry` GitHub Actions OIDC = npm publisher; >30d signing key continuity.
5. **Install command** — `npx @colbymchenry/codegraph` interactive installer (per deepwiki §2.1); auto-writes `.codegraph/` dir + Claude Code MCP entry.
6. **MCP wiring** — verify `.mcp.json` entry uses `npx -y @colbymchenry/codegraph@<pinned-version>` per W286-arc-P0C ratification.
7. **Verify via probe** — call `mcp__codegraph__codegraph_status` (or equivalent) to confirm DB initialized; index a known directory; query a known function → assert non-empty result.
8. **Rollback plan** — `npm uninstall -g @colbymchenry/codegraph` + remove `.mcp.json` entry + delete `.codegraph/` dir.
9. **Skill-deprecation gate** — only AFTER successful 24h staging-pilot: edit `.claude/skills/local-cypher-codebase/SKILL.md` description to add "FALLBACK when codegraph MCP unavailable" annotation.

---

## §7 — Cite anchors (3-org-distinct floor per W295 I1)

### GitNexus
1. deepwiki structure 2026-05-20: `abhigyanpatwari/GitNexus` §7.1 Tool Suite Implementation
2. gh-api 2026-05-20: `gh api repos/abhigyanpatwari/GitNexus` → license:NOASSERTION, stars:39307, pushed_at:2026-05-20T19:39:39Z
3. Local-cypher-codebase SKILL.md L11+L142-143: PolyForm-NC license + GitNexus `tools.ts:140-197` reference

### codegraph
1. deepwiki structure 2026-05-20: `colbymchenry/codegraph` §5 Claude Code Integration + §5.1 MCP Tools Reference
2. gh-api 2026-05-20: `gh api repos/colbymchenry/codegraph/license` → spdx_id:"MIT"
3. npm-registry 2026-05-20: `npm view @colbymchenry/codegraph dist` → 361 files, Ed25519 sig keyid `SHA256:DhQ8wR5APBvFHLF/+Tc+AYvPOdTpcIDqOhxsBHRwC7U`

### Anthropic Insights
1. ctx_fetch_and_index 2026-05-20: `https://code.claude.com/docs/en/analytics` — Team/Enterprise dashboard at `claude.ai/analytics/claude-code`; API customer dashboard at `platform.claude.com/claude-code`; OTel export per `monitoring-usage`
2. Local plugin cache: `.claude/plugins/cache/context-mode/context-mode/1.0.146/skills/ctx-insight/SKILL.md` (port 4747, browser auto-launch)
3. ccusage MCP probe 2026-05-20: `mcp__ccusage__blocks(active:true)` returns active block id `2026-05-20T19:00:00.000Z` with burnRate.costPerHour 199.84

### Cardinal-rule mapping
- CR-1 trust-tuple per CLAUDE.md L25 (W331 axis-1 #3): GitNexus FAILS (b) license; codegraph PASSES (a)(b), pending verification (c)(d)
- CR-3 subagent-allowlist per CLAUDE.md L27: codegraph MCP would inject `mcp__codegraph__*` tools; allowlist regen post-install
- R5 trust-tuple item (b) license-risk: PolyForm-NC blocks GitNexus install (per W288 row 33)

### Cross-org-distinct verification
- Org-1: **abhigyanpatwari** (GitNexus upstream)
- Org-2: **colbymchenry** (codegraph upstream)
- Org-3: **Anthropic** (`code.claude.com/docs/en/analytics`, `monitoring-usage`)
- Org-4: **context-mode plugin maintainer** (plugin cache @ v1.0.146)
- Org-5: **ccusage maintainer** (MCP block schema)
Cite-distinct count: **≥5 orgs > 3-floor → I1 PASS**.

---

## STATUS

- §1-§7 complete · all verdicts cite-anchored to ≥3 distinct orgs · sca-v15 scoring applied
- GitNexus: **T3 PATTERN-STUDY RE-AFFIRMED** (license-blocker, no install)
- codegraph: **T1-CONDITIONAL** (3-gate: SLSA verify + npm-deps audit + 24h staging-pilot)
- Insights features: ENABLED via ccusage MCP + `/ctx-insight` + `session-report`; Anthropic-native is server-side Team-only (N/A here)
- Architecture-synthesis: local-cypher-codebase + serena + ccusage + context-mode is sufficient TODAY; codegraph promotion path enumerated
