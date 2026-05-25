# W343-SOTA-UNLEASH — Operator-Sign Queue

> Wave W343 / branch `goal/W343`. Items requiring operator-decision-block before W343 ship — autonomous wave does NOT execute these.

## Carried forward from W341 (per W342-E8 mem-recall)

| # | Item | Class | Rationale |
|---|---|---|---|
| OS-1 | P0.3 phantom plugin enables (clickhouse + outputai) reconcile | destructive `/plugin uninstall` | Operator must confirm uninstall vs documented retention |
| OS-2 | P0.4 PreToolUse hook D73 SHIP-BLOCK gate (behavior change) | behavior-change | Mechanizes Phase-6 sca-v15 D73 first-discovery-diversity at PreToolUse layer |
| OS-3 | P0.5 Stop-hook position-swap on T1 verdicts | MECHANIZED (W343-A21); operator-wiring DEFERRED to W344 explicit-sign | Hook script + smoke-test authored: `tools/stop-hook-position-swap.mjs` (211 LOC; cite-anchored sca-v15 §10 Phase-6 + Δ-DPA-4 + NIST AI 600-1 MEASURE-2.3 + MT-Bench arXiv:2306.05685 + JudgeLM arXiv:2310.17631 = 3-org-distinct per cardinal-rule). `tools/test-stop-hook-position-swap.mjs` (65 LOC; 3/3 PASS). NOT auto-wired into `.claude/settings.json:hooks.Stop[]` — operator decision deferred to W344 (would auto-fire codex on every Stop event with T1 INSTALL detected; cost + budget operator-sign required). Wiring contract documented in hook header. |
| OS-4 | P0.A2 CLAUDE.md `load_failures=1` ECC reconciliation | drift-resolution | W337-AI-11 investigation needs operator-input or close the claim |
| OS-5 | P1.1 firecrawl-mcp@1.12.0 + brave-search-mcp@2.0.82 install | new MCP install | CR-1 trust-tuple confirmation per W331 axis-1 #3 |
| OS-6 | P1.2 `/insights` + `/recap` + `/ctx-insight` wave-close ritual codify | ritual-introduction | Embeds invocation into ops-rhythm STOP-gate (P3 once habit forms) |

## Wave-W343-specific

| # | Item | Class | Rationale |
|---|---|---|---|
| OS-7 | bypass-marker DELETE confirmation | RUNTIME-state change | W329-R5 cond-(b) accepted explicit bypass; goal directive offers "DELETE OR migrate" — migration path executed in P0.a but operator must confirm marker deletion is intended (not just rationale-write) |
| OS-8 | VoltAgent 5 .md cherry-pick (FQN-prefixed) — DONE | DONE (W343-A15 2026-05-20) | 5 files written to W343 worktree `.claude/agents/voltagent-*.md`; frontmatter renamed; source-attribution appended; 0 collision vs wshobson. Commit pending orchestrator-side. |
| OS-8b | ECC 75-cmd surface ADOPT-or-RETIRE decision | cardinal-rule-1 trust scope | Adopting 5–10 (santa-loop, skill-health, cost-report, quality-gate, evolve) OR formally retire entire plugin (carried forward from prior OS-8 row, renumbered to disambiguate from VoltAgent close) |
| OS-9 | Tavily account renew OR replace | external service / billing | E3 cascade probe found account disabled; replacement path = firecrawl + brave |
| OS-10 | Context7 MCP rewire | MCP install | E1 P1 gap; cite-anchor confirm before adding to `.mcp.json` |
| OS-11 | colbymchenry/codegraph@0.7.10 T1 INSTALL — DONE | DONE (W343-A14 2026-05-20) | MCP wired in `.mcp.json` (`serve --mcp` stdio; NOT `mcp-server` as codex r1 proposed — actual CLI verified via --help); `.codegraph/` created locally via `init` (no global writes — HOME-probe `ls ~/.codegraph` returns ENOENT); `.gitignore` updated with `.codegraph/`; npm audit --omit=dev: 0 vulnerabilities across 51 transitive deps; license distribution: 39 MIT / 6 ISC / 2 Apache-2.0 / 1 BSD-3 / 1 Unlicense / 2 dual-permissive — no AGPL/SSPL contamination; MCP `initialize` handshake returned `serverInfo:{name:"codegraph",version:"0.1.0"}` + "File watcher active" log; CR-4 satisfied (no `~/.claude/CLAUDE.md` mutation; no interactive installer used). Commit pending orchestrator-side. Note: codex r1's `--no-claude-md-mutation` flag does NOT exist in 0.7.10 — `init` is intrinsically scoped to local `.codegraph/` only (verified via `init --help` + post-init filesystem probe). |

## P0 fix-set acceptance-record (W343-P0)

Per W329-R5 cond-(b) precedent — explicit acceptance record for the 5 P0 fix-set:

```yaml
W343-P0 acceptance-record:
  scope: 5 sub-actions (P0.a..P0.e) per W343 SOTA-UNLEASH goal predicate
  affected_files:
    - .claude/state/parallel-guard-bypass.marker (deleted)
    - .claude/state/.bypass-W342-rationale.md (NEW — rationale doc preserves W329-R5 cite-anchor)
    - tools/parallel-guard-userpromptsubmit.mjs (counter-path realignment + import shared regex)
    - tools/parallel-guard-regex.mjs (NEW — shared regex module)
    - tools/preagent-parallel-guard.mjs (import shared regex; flip silent-fallback exit codes)
    - tools/build-subagent-allowlist.mjs (CJS-require-in-ESM fix at L75)
    - tools/preagent-subagent-validator.mjs (flip silent-fallback exit codes)
    - tools/subagent-stop-guard.mjs (flip silent-fallback exit code)
  bypass-marker disposition: MIGRATE-TO-RATIONALE-DOC + DELETE
  fail-closed default flip: 5 paths exit(0)→exit(2); preserves bypass-marker escape-hatch + adds CLAUDE_HOOK_DEBUG=1 opt-in
  rollback path: git revert <P0-commit-SHA> on goal/W343 branch; bypass-marker can be recreated via `New-Item -ItemType File .claude/state/parallel-guard-bypass.marker`
  operator-sign: TBD
```
