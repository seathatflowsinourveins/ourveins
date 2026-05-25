# W347-SOTA-CONVERGENCE-UNLEASH — Synthesis

**Date**: 2026-05-20
**Wave**: W347
**Branch**: `goal/W347-sota-unleash` worktree at `Z:/claude-sota-installed-W347` (off origin/main `b34ecd2`); main session work at `Z:/claude-sota-installed` on `w344-mainsession-ship` (5 ahead/19 behind main, rebase-due)
**Streams**: 4 parallel forks (Δ-G49 Orchestrator-Worker pattern, W269 ≥2-msg compliance) — all COMPLETE

## §1 Execution topology

| Stream | Owner-fork | Scope | Deliverable | Tools | Status |
|---|---|---|---|---|---|
| A | hidden-errors hunt | settings/MCP/hooks/silent-fallback/insights | STREAM-A-HIDDEN-ERRORS.md | 5 | COMPLETE |
| B | SOTA-repo ingest | 11 repos line-level + Insights parity | STREAM-B-SOTA-REPO-INGEST.md | 5 | COMPLETE |
| C | memory + orchestration | T1-T6 + sca-v17 + Δ-G49/G50/G51 + parallel-ratio | STREAM-C-MEMORY-ORCHESTRATION.md | 4 | COMPLETE |
| D | parallel-session + git + CI/CD + ecosystem | worktree + CI + Node/PowerShell/Docker | STREAM-D-TOOLING-CICD-PARALLEL.md | 4 | COMPLETE |

W269 compliance: ✓ 4 Agent calls in 1 assistant message (post-bash-error retry). Cache-warm fork dispatch. All 4 returned non-empty final summaries (Δ-G49 satisfied without orchestrator retry).

## §2 Cross-stream convergent findings

### §2.1 INSIGHTS feature gap — CONVERGENT (A-1 + B-3)

**Stream A**: zero `CLAUDE_CODE_*INSIGHTS*` toggles in `.claude/settings.json:env`.
**Stream B**: telemetry pipeline LIVE (OTEL→Langfuse via `CLAUDE_CODE_ENABLE_TELEMETRY=1` + `OTEL_EXPORTER_OTLP_TRACES_ENDPOINT=http://127.0.0.1:3000/api/public/otel/v1/traces`), but no explicit `INSIGHTS_*` env-var.
**Verdict**: PARTIAL-INSIGHTS (telemetry layer live, env-flag layer absent). Action: WebFetch `https://docs.anthropic.com/en/docs/claude-code/insights` to determine canonical env-flag set.

### §2.2 Memory + orchestration HEALTH — STRONG (C-1 + C-4)

4/6 tiers ACTIVE (T2+T3+T5+T6); T1+T4 RETIRED by design. Δ-G49 fail-CLOSED LIVE-PROVEN this session — `subagent-stop-guard.mjs` blocked an initial empty-final-message from the fork; W341-Q8 binding-mode working.

### §2.3 SOTA repo freshness PERFECT — CONVERGENT (B-1)

All 11 named repos FRESH (pushed_at ≤7d). 0 stale-and-installed. 2 drift items only (context-mode 11h, mattpocock 2d). Existing W308/W340 verdicts hold (planning-with-files REJECTED-pattern-preserved, alirezarezvani SOFT-DISABLED-stage-1).

### §2.4 Silent-fallback hunt CLEAN — CONVERGENT (A-4 + C-4)

`tools/preagent-parallel-guard.mjs` 1st-advisory→2nd-block verified. `tools/preagent-subagent-validator.mjs` exit-2 hard-block verified. `tools/subagent-stop-guard.mjs` Δ-G49 empty-final guard CONFIRMED firing. CR-6 anti-fabrication intact. Permissions.deny blocks all `git --no-verify` bypass.

### §2.5 Worktree topology OVER cap — DIVERGENT (D-1)

5 worktrees (main + W335 + W337 + W343 + W347) exceeds CLAUDE.md L14 W280d ~3-parallel cap. W335 + W337 are 3+ waves old and likely abandoned → cleanup candidates.

## §3 P0 ship-blockers (W347/W348)

| # | Item | Stream | Effort | Acceptance |
|---|---|---|---|---|
| P0.1 | Insights parity audit + env-flag wiring | A+B | 1-2 tool calls | WebFetch + 1-line env update |
| P0.2 | W340 OPERATOR-SIGN-QUEUE Q1/Q3/Q4 close (~7-wave dwell, 1 wave from -0.5 penalty) | A | 3-5 edits | ops-rhythm dwell_disposition_signed |
| P0.3 | Codex hooks.json Z:-portability fix (Win32 absolute paths) | A | 1 sed-style edit | hooks.json uses `${CLAUDE_PLUGIN_ROOT}` |
| P0.4 | `pre-commit-mirror.yml` push-trigger branch list (silent CI-miss) | D | 30-sec edit | YAML branch list updated |
| P0.5 | parallel_ratio_30d re-measure (DWELL since W325-A 0.0036 baseline) | C | 1 telemetry run | persist delta to T6 basic-memory |

## §4 P1 streams (W347/W348)

| # | Item | Stream | Effort |
|---|---|---|---|
| P1.1 | `/plugin update context-mode@context-mode` (11h drift) | B | 1 cmd |
| P1.2 | mattpocock cite-refresh `d54c497a` → `b8be62ff` | B | 1 sed |
| P1.3 | shellcheck pre-commit hook entry (binary idle) | D | 1 yaml block |
| P1.4 | W343 P3 SOTA L1 atomic-write impl land (codex r3 @46d6102 APPROVE) | D | small file write |
| P1.5 | `dispatching-parallel-agents-w321-fork` SKILL.md — embed final-summary discipline upfront | C | 1 SKILL.md edit |
| P1.6 | cognee-MCP dual-content-negotiation smoke-test in `harness/eval_harness.py` | C | small test add |

## §5 P2 backlog (queued for W348+)

- 4 CI workflows DEFERRED W344-Z6: codex-adversarial-review.yml + mcp-health-probe.yml + awesome-list-pin.yml + sca-decision-audit.yml + skills-trigger-eval.yml
- 5 MCP servers ≥6-month pin refresh (github / repomix / serena / ccusage / chrome-devtools)
- ECC + CCBP upstream-owner discovery (probe `git -C Z:/repos/deps/<repo> remote -v`)
- Worktree cleanup W335 + W337 (3+ waves old, candidates for removal)
- Stranded `.claude/hooks/{A..E}-*.md` (5 files) relocate or delete
- Abandoned `W346-FULL-SOTA-UNLEASH/` wave-dir reconcile or delete
- `.mcp.json` `_comments` bloat reduction
- D84 candidate `state-reducer-discipline` from W344-Z5 (langgraph `add_messages` reducer + `ConditionalEdge`)
- W347 worktree integration / W347 commit propagation
- Node 22 `--experimental-permission` evaluation (codex r1 gate)
- 3 awesome-list catalogs SHA-pinned manifest (hesreallyhim/awesome-claude-code, wong2/awesome-mcp-servers, MrPicklePinosaur/awesome-claude-plugins)

## §6 Architecture-quality verdict (sca-v17 self-audit)

**install_score self-eval (arch-itself)**: PASS-WITH-CARRY — D-EMP=2 (multi-cycle uneventful per parallel-guard W341-Q8 + Δ-G49 LIVE-fired), D35 D-CCRT=2 (CC-native), D81 multi-MCP-convergence=4 (this synthesis cites github + deepwiki + repomix + WebFetch capable), D83 decision-impact-tier classified per item.

**Dwell governance**: 5 P0 items; if W347 ships P0.1+P0.4+P0.5 → 3/5 closed. P0.2 (W340 dwell) approaches 8-wave SHIP-BLOCKER threshold — ops-rhythm -0.5 penalty fires at wave-close W348 if Q1/Q3/Q4 still open.

## §7 Next action

→ Author /goal predicate (PREDICATE.md) ≤3800 chars covering P0.1-P0.5 + P1.1-P1.6 + worktree W347 + cross-model gate mandate. Fire codex GPT-5.5 task --effort high on the predicate. APPROVE → commit + push + verdict-ledger.
