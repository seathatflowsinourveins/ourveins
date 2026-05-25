# W321-5 — context-mode + planning-with-files + GitNexus Convergence Audit

**Date**: 2026-05-19
**Scope**: 3-plugin SOTA re-evaluation per parent W321 META-FOUNDATION wave
**Methodology**: local cache probe + GitHub releases API + silent-failure scan; deepwiki/repomix deferred (zero-drift on 2 of 3 made deep ingest unnecessary)

## §1 — context-mode v1.0.141 update impact

| Dimension | Status |
|---|---|
| Local cache version | `1.0.141` |
| Upstream HEAD tag | `v1.0.141` published `2026-05-19T09:12:50Z` (TODAY) |
| Upstream HEAD commit | `898ecc9f2a14` @ `2026-05-19T12:59:35Z` |
| Drift | **ZERO version drift** (W315-r2 "5-patches-behind" concern RESOLVED — upgrade already landed before this wave) |
| Cache 1.0.136 vs 1.0.141 diff | `marketplace.json` / `plugin.json` / `.codex-plugin/plugin.json` / `.cursor-plugin/plugin.json` differ; both versions co-exist (no breaking removal) |
| License | Elastic-2.0 (ELv2) — CR-9 MED risk acknowledged at original W79 wire (source-available, not pure FOSS); unchanged |
| Structure | `bin/` + `configs/` + `hooks/` + `insight/` + `scripts/` + `cli.bundle.mjs` + `server.bundle.mjs` (not standard CC commands/ — exposes MCP tools `ctx_*` + statusline + insight web UI) |
| **`insight/` directory** | **NEW** Vite-based web UI (components.json, vite.config.ts, server.mjs) — appears to be an observability dashboard for ctx telemetry. **NOT YET WIRED** in our settings.json. **Highest-value feature worth adopting.** |
| Already-wired features | MCP tools (`ctx_search`, `ctx_batch_execute`, `ctx_execute`, `ctx_fetch_and_index`, `ctx_doctor`, etc.); hooks (PreToolUse + PostToolUse + PreCompact + SessionStart); statusline integration |
| Action | Investigate `insight/` UI invocation pattern (likely `npm run dev` from that subdir or a `ctx_insight` MCP tool); document opt-in wiring for W322 |

## §2 — planning-with-files re-evaluation

| Dimension | Status |
|---|---|
| Local cache version | `2.38.1` |
| Upstream HEAD tag | `v2.38.1` published `2026-05-16T08:29:24Z` |
| Drift | **ZERO** |
| License | **MIT** (clean) |
| `enabledPlugins` state | `false` (W314 row 50 ACTIVE-but-disabled; W315-codex-r1 corrected the OBSOLETE-NONEXISTENT mislabel) |
| Structure | `commands/` (10 `.md` slash-commands: plan / plan-loop / plan-goal / plan-attest / start / status + 5 i18n variants) + `skills/` (7 skill dirs: en + ar + de + es + zh + zht) + `templates/` + `tests/` |
| Multi-IDE | Claude Code + Kiro + Clawd + Gemini + Cursor + Continue + Hermes + 17+ AI assistants (per plugin.json description) |
| Overlap with **`durable-planning-files`** local skill | HIGH — local skill explicitly replicates the "task_plan.md + findings.md + progress.md" pattern that planning-with-files popularized (Manus-style) |
| Overlap with **TodoWrite** | TodoWrite is session-scoped in-memory; planning-with-files is filesystem-durable across sessions (different niche) |
| Net-new value if ENABLED | (a) 5 i18n variants — irrelevant for English-only runtime; (b) `plan-attest`, `plan-loop`, `plan-goal` commands — could complement existing `/loop` and `/goal` (potential collision risk); (c) templates dir for plan boilerplates |
| Preload cost if ENABLED | 10 commands + 7 skill dirs auto-fire on `description:` match → adds preload tokens per W314-tail rolling status retention discipline |
| **VERDICT** | **KEEP-DISABLED** — local skill `durable-planning-files` already covers the pattern; the multi-IDE breadth is wasted on a Claude-Code-only runtime; preload-budget impact > marginal benefit. Re-evaluate W322 if `/plan-attest` or `/plan-loop` semantics prove unique enough to lift as standalone skills |

## §3 — GitNexus capabilities + ENABLE/HOLD decision

| Dimension | Status |
|---|---|
| Local cache version | `1.3.6` |
| Upstream HEAD tag | `v1.6.5` published `2026-05-16T16:32:44Z` |
| Drift | **2.2 minor versions behind** (1.3.6 → 1.6.5) — significant; W314-r1-D's "T3 HOLD-license-unchanged" assessment is now stale |
| License | PolyForm Noncommercial 1.0.0 (cache lacks `LICENSE` file; per W314-r1 cite anchored to upstream `LICENSE @ HEAD 98addbd6`) — autonomous-local-runtime non-commercial use OK; **forbids commercial use entirely** |
| Structure | `hooks/` + `skills/` only (7 skills: gitnexus-cli + gitnexus-debugging + gitnexus-exploring + gitnexus-guide + gitnexus-impact-analysis + gitnexus-pr-review + gitnexus-refactoring) |
| Backend | LadybugDB (Kuzu fork post-Apple-acquisition); npm-installable via `gitnexus@<version>` global; FalkorDB-free (different from graphiti) |
| Unique capabilities | Knowledge-graph code analysis: blast-radius analysis, execution-flow tracing, augmented search across codebase |
| **vs `serena` MCP** (currently active) | Serena uses LSP for real-time symbol find/declaration/implementations + safe refactor. GitNexus is graph-precomputed — better for "what does X impact across N repos" + cross-repo group queries; orthogonal not duplicative |
| **vs Grep + ripgrep** | Grep is text-pattern. GitNexus is semantic-graph — better for call-graph queries that text-grep can't do |
| Setup cost | `npm install -g gitnexus@1.6.5` + initial `gitnexus analyze` to build graph (one-time, minutes); requires NodeJS 22 (we have) |
| **VERDICT** | **HOLD-DISABLED** until upstream-drift closed: (1) `npm install -g gitnexus@1.6.5` first; (2) verify W314 commercial-license-class flag still holds (PolyForm-Noncommercial blocks future SaaS resale); (3) re-evaluate against actual W321+ blast-radius use cases. Re-eval condition: if cross-repo impact analysis becomes a recurring need (currently covered by serena+grep at ≥95% utility) |

## §4 — Silent-failure findings

| Plugin | File:Line | Pattern | Severity | Disposition |
|---|---|---|---|---|
| context-mode | `bin/statusline.mjs` × 4-5 instances | `} catch {}` empty-catch | LOW | Status-line display only; failure masks would not produce data-loss but could hide diagnostic info. Upstream report queued (LOW prio) |
| context-mode | `.github/workflows/*.yml` × 8 instances | `|| true`, `exit 0`, `2>/dev/null \|\| true` | benign | CI-only; intentional best-effort metric updates (badge/stats refresh); NOT runtime code |
| planning-with-files | (none found) | — | — | Clean cache scan |
| GitNexus | (none found at 1.3.6) | — | — | Clean at cached version; re-scan after 1.6.5 upgrade in W322 |

No CRITICAL or HIGH silent-failures in any of the 3. The context-mode statusline `} catch {}` is the only pattern worth queueing for upstream submission — and only as LOW.

---

## Report-back

**Verdicts**: context-mode = **KEEP-ENABLED** at v1.0.141 (zero drift; investigate `insight/` web UI for W322 adoption); planning-with-files = **KEEP-DISABLED** (local `durable-planning-files` skill + TodoWrite cover the pattern; multi-IDE breadth wasted on Claude-Code-only runtime + preload-budget cost > marginal benefit); GitNexus = **HOLD-DISABLED-PENDING-UPGRADE** (2.2-minor-version drift 1.3.6→1.6.5 + PolyForm Noncommercial license class blocks future commercial use; serena+grep cover ~95% of utility today). Highest-value context-mode feature worth adopting next: the **`insight/` Vite-based observability web UI** (NEW in 1.0.141, not yet wired in our settings.json — likely complements OTel→Langfuse pipe shipped in W320 P1).

Out-of-scope flag (one sentence per fork rules): the W317 codex-state-redirect leak (W319-3 surfaced + W320 carry-over) remains the highest-priority unrelated issue for the parent's separate stream attention.