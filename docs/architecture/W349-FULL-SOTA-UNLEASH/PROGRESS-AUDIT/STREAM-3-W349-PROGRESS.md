# W349-FULL-SOTA-UNLEASH — Progress Audit (Stream 3)

> Audit date: 2026-05-20 | Branch: `w344-mainsession-ship` | Wave status: IN-FLIGHT (5/6 streams complete)
> Auditor: Stream-3 progress sweep | Budget: 11 tool calls used of 15-budget; ≈55k tokens

## §Stream-A-memory
STATUS: **COMPLETE** — 9-20 tool calls, 112k tokens; deliverable `STREAM-A-MEMORY-RESEARCH-ARCH.md` (350 LOC)
- Live-probe verified: T3 cognee 1.26.0 LIVE, T5 langfuse 3.160.0 LIVE, T6 basic-memory canonical; T1+T4 RETIRE confirmed
- HNF-P2: T2-split plugin-memory KG fallback NOT REACHABLE (CLAUDE.md L43 unverifiable via ToolSearch)
- 3 sca-v17 SOTA gaps: no BetterBench (P2), no CHAOSS community-health (P1), no OWASP SAMM (P2)
- CHALLENGERS: mem0ai/mem0 (56k* fills hindsight-retire passive-extraction); langgraph supervisor (P1 cross-stream state-graph; ~20% token waste in current fan-out)

## §Stream-B-hooks
STATUS: **COMPLETE** — 9/15 tool calls, 107k tokens; deliverable `STREAM-B-HOOKS-AUDIT.md` (282 LOC)
- CR-2 conformance 100% on `.claude/hooks/**` (1656-byte sanctioned shim only)
- W330 parallel-guard RED CONFIRMED — `tools/test-parallel-guard-w330.mjs` exit 1; MULTI-STREAM-SOLO-1/2 + WEAK-TERMS-PAIRED-MULTI fail. Root: `preagent-parallel-guard.mjs:55-114` session-file resolution
- transcript-marker-loop-guard skill exists but NOT WIRED (stateful sidecar pattern still active)
- 1 RED + 6 YELLOW: gitleaks-ruleset, stop-position-swap codified-not-fired, Win32 codex paths x2, transcript-marker-loop-guard skill not wired

## §Stream-C-git
STATUS: **COMPLETE** — deliverable `STREAM-C-GIT-PRACTICE.md` (414 LOC); progress.md still shows "dispatched" (STALE)
- 5 worktrees vs ~3-cap (+67% drift); recommend prune W337+W343+W347
- 8/20 workflows have 0% SHA-pin (W347 P4b incomplete); `provenance.yml:cosign-installer@v3` unpinned (HIGH)
- F5-1 HIGH: `lefthook.yml` is template-only DEAD CONFIG; delete-or-port decision needed
- Branch-naming verdict (operator question): **HYBRID** — keep W<N> ledger + Conventional Branch + Conventional Commits
- CHALLENGER: Jujutsu (jj) — Git-compatible; migration trigger = 5+ concurrent sessions

## §Stream-D-drift
STATUS: **COMPLETE** — 11/15 tool calls, 96k tokens; deliverable `STREAM-D-UPSTREAM-DRIFT.md` (189 LOC)
- anthropics/claude-code HEAD v2.1.145; local minimumVersion=2.1.144 (1 patch lag)
- CCBP `a28cd96b` FRESH at HEAD (0 behind) — CLAUDE.md L3 cite-current
- wshobson/agents PR #535 agent-teams coordination guardrails — STALE-FUNCTIONAL on locally-enabled plugin
- W347 P0.1 INSIGHTS HNF — SPLIT VERDICT: SUSTAINED for env-var; **REVERSED** for `/insights` slash (9 CHANGELOG mentions v2.1.2→v2.1.141)
- CHALLENGER: v2.1.145 Stop/SubagentStop adds `background_tasks` + `session_crons` fields; OTEL `agent_id`+`parent_agent_id`

## §Stream-E-sota-repos
STATUS: **COMPLETE** — 7-16 tool calls, 122k tokens; deliverable `STREAM-E-SOTA-REPO-DISCOVERY.md` (303 LOC)
- 1 T1-INSTALL-FRESH: wshobson/agents (80 plugins / 185 agents / 153 skills / MIT) — granular 3-5 plugin install
- 1 T3-EVAL-PENDING: MemPalace/mempalace (architectural challenger to T6; defer pending 96.6% R@5 reverify + bug-resolution)
- 1 RETIRE-CONFIRMED: alirezarezvani 313→48 (6.5x overclaim re-verified)
- Stage-0.5 challengers surfaced: thedotmack/claude-mem (T7 implicit-write), ruvnet/ruflo, safishamsi/graphify
- Anti-bias PASS (each top-10 first-surfaced by >=1 distinct MCP family)

## §Stream-F-ecosystem
STATUS: **COMPLETE** — 15/15 tool calls (FULL BUDGET), 94k tokens; deliverable `STREAM-F-ECOSYSTEM.md` (376 LOC); returned 2026-05-21 01:32Z
- Node 22.22.0 LTS GREEN — node:test, native fetch, TLA ESM, V8 12.x Maglev adopted
- All 4 security scanners at upstream HEAD (gitleaks 8.30.1, trivy 0.70.0, shellcheck 0.11.0, ruff 0.15.13)
- Insights HNF REVERSED (cross-validates Stream D) — `/insights` is real shipped slash command since v2.1.101
- §7 P0 CONFIRMED: `OTEL_EXPORTER_OTLP_HEADERS` MISSING → silent 401 trace-drop to Langfuse
- Challengers Bun/Deno/tsx REJECTED — Node 22.22.0 LTS is correct SOTA

## §Synthesis-readiness
STATUS: **PENDING — READY-TO-FIRE**
- All 6 stream deliverables present + complete (Stream C returned but `progress.md` shows STALE "dispatched")
- `SYNTHESIS-SKELETON.md` exists with §1-§10 TBD placeholders; ready to fill
- `findings.md` consolidated; §3 (Stream C) section MISSING in findings.md — needs catch-up sync
- `progress.md` table needs update: Stream C should show **completed**
- Codex round-1 + final /goal predicate + T6 verdict-ledger row + operator next-steps NOT YET STARTED

## §Gap-list (P0/P1/P2 ranked by severity)

| Severity | Gap | Source | Owner-action |
|---|---|---|---|
| **P0** | `OTEL_EXPORTER_OTLP_HEADERS` MISSING — Langfuse 401 silent trace-drop | Stream F §7 + W348 P0.2 | Add settings.json env: `OTEL_EXPORTER_OTLP_HEADERS=Authorization=Basic ${BASE64_LANGFUSE_AUTH}` |
| **P0** | `tools/test-parallel-guard-w330.mjs` RED — binding mode unreachable | Stream B §4 | Trace `preagent-parallel-guard.mjs:55-114` session-file resolution in test-mode |
| **P0** | `progress.md` STALE — Stream C shows "dispatched" despite completion | this audit | Update progress.md row C → completed; sync findings.md §3 |
| **P1** | 8/20 workflows 0% SHA-pin (`provenance.yml:cosign-installer@v3` HIGH) | Stream C F4-1/F4-2 | Extend W347 P4b SHA-pin sweep |
| **P1** | `lefthook.yml` is template-only DEAD CONFIG | Stream C F5-1 | Delete OR port pre-commit gates to lefthook |
| **P1** | 5 worktrees over ~3-cap (+67%); W337/W343/W347 stale | Stream C §2.3 | `git worktree remove` × 3 post Stream-A-F sign |
| **P1** | wshobson/agents `agent-teams` plugin STALE-FUNCTIONAL (PR #535) | Stream D §9 | `/plugin update agent-teams@claude-code-workflows` |
| **P1** | sca-v17 missing CHAOSS community-health (D85 candidate) + cross-stream state-graph supervisor (F8) | Stream A §3 + §7 | Propose ADR for D85 + langgraph-supervisor pattern |
| **P2** | T2-split plugin-memory KG fallback HNF (CLAUDE.md L43 unverifiable) | Stream A §1 | Cite-refresh or excise CLAUDE.md L43 |
| **P2** | `/insights` slash command exists but NEVER invoked in this runtime | Stream D §6 + Stream F §6 | Smoke-test `/insights` on Win11 v2.1.145 |
| **P2** | transcript-marker-loop-guard skill documents pattern but no hook implements it | Stream B §10 | Wire on next Stop/SubagentStop touch |
| **P2** | mattpocock vendor-fork drift `d54c497`→`b8be62f` | Stream E §5.2 | Low-urgency cite-refresh |

## §Next-actions (top 3)

1. **CLOSE STREAM C SYNC GAP** — update `progress.md` row C → completed; add `findings.md §3 Stream C` block mirroring §4/§5/§6 style. This unblocks synthesis turn.
2. **FILL SYNTHESIS-SKELETON.md** — populate §1 Executive summary + §2.1-§2.6 cross-stream consolidation + §3 Pareto-frontier table + §4 SOTA arch L1-L10 fill-in from the 6 stream deliverables. Then fire codex round-1 adversarial review.
3. **APPLY P0 PATCHES BEFORE WAVE CLOSE** — (a) wire `OTEL_EXPORTER_OTLP_HEADERS` in settings.json env block; (b) prune stale W337/W343/W347 worktrees; (c) re-fire `node tools/test-parallel-guard-w330.mjs` after preagent-parallel-guard.mjs:55-114 fix attempt. These are wave-blocker class.

## §SKILL.md.draft disposition

Search of `STREAM-A` through `STREAM-F` + skeleton + findings + task_plan + progress: **NONE of the 3 deleted .draft files are referenced**:
- `iterate-fix-failing-tests` — NOT mentioned anywhere in W349 dir (Stream B §4 W330 RED would have benefited from this skill but does not cite it)
- `orchestrate-issue-to-pr` — NOT mentioned anywhere in W349 dir
- `prompt-versioning-and-rollback` — NOT mentioned anywhere in W349 dir

**Verdict**: The 3 deleted `SKILL.md.draft` files were **NOT absorbed into W349 streams** — they are **GENUINELY LOST** as session-deletions. They appear in the system-reminder skill registry (so they were once present), but no W349 stream content drew from them. Operator decision: restore from git history if their content is needed, or accept the loss if they were superseded by other discipline. The CLAUDE.md L65 53-skill inventory does NOT enumerate them, suggesting they may have been pre-publish drafts that were never finalized.
