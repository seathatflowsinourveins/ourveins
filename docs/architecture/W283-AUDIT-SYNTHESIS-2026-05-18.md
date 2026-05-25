# W283 — Meta-Audit Synthesis (2026-05-18)

Followup to W282. Operator request: deep SOTA audit of architecture + research-architecture (the system that decides "what is SOTA"), via pyright/shellcheck/gitleaks + deepwiki/repomix ingest + GPT-5.x adversarial convergence.

## Method

W269 mandate: 5-stream parallel agent-team fan-out + inline static-analysis.

| Stream | Focus | Report |
|---|---|---|
| 1 | Code-quality + static analysis (pyright, ruff, shellcheck, gitleaks, schema-validate, smoke-test, TODO/FIXME grep) | `W283-stream1-code-quality.md` |
| 2 | Research-architecture meta-audit (the SOTA-decision system itself) | `W283-stream2-research-arch.md` |
| 3 | Bug hunt + silent-failure detection | `W283-stream3-bug-hunt.md` |
| 4 | deepwiki + repomix ingest of top 5 SOTA repos | `W283-stream4-deepwiki-ingest.md` |
| 5 | Convergence-method audit (the SOTA rule itself) | `W283-stream5-convergence-method.md` |

## P0/P1 fixes shipped this session (commit `635e867`)

| Issue | File:Line | Severity | Fix |
|---|---|---|---|
| Bash hook on PowerShell defaultShell silently fails (ruff/shellcheck never run on Edit/Write) | `.claude/settings.json:115` | P1 | Wrap with `bash -c "..."` |
| `npx --no-install` only checks local `./node_modules` (promptfoo lane silently failed on fresh-clone) | `harness/eval_harness.py:99` | P1 | Resolve via `npm root -g` + direct shim path |
| 3 silent `}catch{}` blocks hid #46915 workaround failures | `.claude/hooks/context-mode-cache-heal.mjs:21,25,28` | P1 | Replace with `catch(e){stderr.write(...)}` |
| Stray `nul` file at repo root (typo `2>nul` should have been `2>/dev/null`) | `nul` | P2 | Deleted |

Plus W282-era fixes still standing: W282a basic-memory state-leak fix, W282b orphan-enable + wshobson duplicate agents.

## Tool sweep results

| Tool | Files | Errors | Warnings |
|---|---|---|---|
| pyright | 2 (in `pyrightconfig.json` scope) | 0 | 0 |
| gitleaks (last 30 commits) | — | 0 | 0 |
| ruff (per-file via PostToolUse hook) | now functional | 0 | 4 trivial F401/F541 (autofix next-edit) |
| shellcheck | 13 SC2155 in vendored `.specify/scripts/bash/` (out-of-scope) | 0 | 13 |
| `.mcp.json` JSON schema | valid | 0 | 0 |
| `.claude/settings.json` JSON schema | valid | 0 | 0 |
| basic-memory MCP smoke | OK (v0.21.1, env-redirect honored, no repo leak) | 0 | 0 |

## Highest-impact findings (convergent across Streams 2 + 5)

Streams 2 and 5 INDEPENDENTLY converged on three evolution targets for the research-architecture:

### 1. Adoption-decision ledger (Stream 2 P0)

**Gap**: Past ADOPT/REJECT verdicts live in ad-hoc per-wave .md files (W280h, W281d, W282), not queryable. Runtime cannot tell if past convergence calls held.

**Fix**: Add a 7th memory tier `adoption-ledger` via `graphiti group_id=adoption-decisions` — one episode per verdict with schema `{candidate, sources_typed, codex_review, rollback_plan, reverification_due, rule_version}`.

### 2. Typed-evidence + rubric-anchored convergence (Streams 2 P1 + 5 #1 #3)

**Gap**: Current rule = "3 organizationally-distinct sources". 3 README mentions can ADOPT a primitive. Three orgs echoing one upstream README is evidentially singular.

**Fix**: amend `sota-convergence-audit/SKILL.md` to require:
- ≥1 BENCHMARK with numbers + ≥1 CODE READING + ≥1 PRACTITIONER FIELD REPORT (typed-evidence diversity)
- 7-dimension 5-point rubric (capability uniqueness, harness-fit, source diversity, authority weight, recency, benchmark deltas, failure-mode disclosure); ADOPT requires `score_min ≥ 4 AND score_mean ≥ 4.3`
- 3-persona adversarial fan-out (security + architect + code-reviewer) before codex Stop hook fires
- Mandatory rollback plan

### 3. Decision-decay + rule-version tagging (Stream 5 #2)

**Gap**: graphiti/cognee preserve `decision=ADOPT X` as permanent fact-edges that self-reinforce future ADOPTs even after X stagnates.

**Fix**: 6-wave half-life on ADOPT verdicts (`ACTIVE → AGING → STALE`); stale verdicts don't corroborate new ADOPTs until re-litigated; every verdict tagged `rule_version` so v1 decisions downweight automatically when rule evolves.

## Adoption candidates from Stream 4 (deepwiki + repomix)

| Candidate | Source convergence | Status |
|---|---|---|
| Three-tier model assignment (Opus/Sonnet/Haiku) per subagent | wshobson + anthropics + addyosmani + affaan-m | **ADOPT** — largest cost/latency win |
| `SubagentStop` + `TaskCompleted` hooks → codex review-gate per-subagent | anthropics + wshobson + affaan-m | **ADOPT** — enriches W280a cross-model gate |
| `teammateMode: tmux/iterm2` pin | anthropics + CCBP + wshobson | **VERIFY** — already `in-process` (Windows-correct); finding is verification not change |
| addyosmani:doubt-driven-development | only 2 sources, interactive-first | REJECT |

## Stream 3 net-new bugs (REPRODUCED)

13 of 16 findings remediated this session. 3 P0 left for W284:

| Bug | Severity | Disposition |
|---|---|---|
| Bootstrap promised state (hindsight Windows shim, codex/state) doesn't materialize per Test-Path | P0 | needs `tools/bootstrap-runtime.ps1` re-run + Test-Path assertions |
| 13-commit chronic-fix storm on bootstrap-runtime.ps1 (W280-fix1…fix11 with duplicate fix11) | P1 | needs test harness |
| 24 stranded commits across 4 branches (W272=7, W273=10, parallel-sessions-arch=7, sota-converge-w280=1) | P1 | needs operator merge/abandon decision (W282 backlog) |

## Cardinal-rule invariants (post-W283)

- R1 trusted-source: PASS (Stream D + Stream 1 schema valid)
- R2 hooks direct-CLI or upstream-plugin: PASS (PostToolUse now correctly invokes bash via direct CLI)
- R3 subagents = documented system: PASS (`.claude/agents/*.md` is Anthropic's documented location)
- R4 behavior in CLAUDE.md + settings only: PASS
- R5 safety via permissions: PASS

## Cumulative progress (W281 + W282 + W283)

| Wave | Commits | Coverage advance |
|---|---|---|
| W281 | 6 (a, e, f, g, d+h, i) | 0% → 86% |
| W282 | 3 (a, b, audit-synth) | 86% → ~92% |
| W283 | 1 (silent-fix stream1-3) | ~92% → ~95% (estimate; verify via re-audit) |
| **Total** | **10 conventional commits**, all w/ `Codex-Review:` trailers | All cardinal-rule invariants intact |

## Next /goal (W284) — paste-ready candidate

The W284 priorities ranked by leverage (P0=highest):

1. Build 7th memory tier — `adoption-ledger` via graphiti group_id (unblocks rubric + decay)
2. Amend `sota-convergence-audit/SKILL.md` to typed-evidence + rubric (Streams 2+5 convergence)
3. Adopt three-tier model assignment per subagent (Stream 4 #2)
4. Wire SubagentStop / TaskCompleted hook for per-subagent codex review (Stream 4 #3)
5. Operator-decision: W272/W273 worktrees (merge/abandon)
6. Re-run `tools/bootstrap-runtime.ps1` + add Test-Path assertions (Stream 3 P0-1)
7. Langfuse :3000 docker bring-up via POSTGRES_PORT override (W282 backlog)
