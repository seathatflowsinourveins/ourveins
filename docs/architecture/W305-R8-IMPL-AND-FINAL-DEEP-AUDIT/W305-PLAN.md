# W305 Wave — R8 EvalLog Implementation + Final Deep-Audit Sweep

> **Wave**: W305 (CRITICAL R8 implementation per W304 codex r1 BLOCK + W303-A remaining gaps + operator persistent "advanced agent team orchestration" + "next priority" mandate).
>
> **Branch**: `sota-converge-w295` (continued; HEAD `2489063` post-W304-codex-r1).
>
> **Streams**: 4 parallel (A=agent-team orch + GPT-5.5 sub-agent · B=code-quality + gitnexus + git practice · C=planning-with-files governance · D=R8 EvalLog implementation attempt) + codex r1 e2e.

## §0 — Pre-flight state + W304→W305 carry-forward

| Component | W304 state | W305 plan |
|---|---|---|
| R8 EvalLog contract drift | OPERATOR-EXECUTION-PENDING (CRITICAL per codex r1) | **W305-D ATTEMPT implementation** (turn-feasibility scoped; fallback to operator-execution if >50 LOC patch) |
| Agent-team orchestration | partial (W298-D verified frontmatter PASS; no deep sca-v5 audit) | **W305-A deep audit** under sca-v5 + GPT-5.5-as-subagent patterns |
| Code-quality + gitnexus + git | W290-F1 partial; W298-Stream-A part; W303-A gap #4 GitHub Actions CI lane | **W305-B re-audit** under sca-v5 |
| planning-with-files governance | W295-r30 deactivated; W296 silent re-enable WITHOUT Phase-5; W299/W300/W302 carry | **W305-C reconciliation** + Phase-5 gate audit |

## §1 — Streams (4 parallel)

| Stream | Type | Scope | File ownership | Done criteria |
|---|---|---|---|---|
| **A** | sca-v5 deep audit | **Agent-team orchestration + GPT-5.5 sub-agent / adversary patterns** — sca-v5 deep audit of `agent-teams` plugin (incumbent); `TeamCreate`+`SendMessage`+`TaskCreate` primitive depth; cross-model `codex:codex-rescue` as adversary; how 4-stream parallel-Agent fan-out vs `team-spawn` preset choice; operator-friction surface. Per operator persistent emphasis | `W305-STREAM-A-AGENT-TEAM-ORCH-AUDIT.md` | sca-v5 lite-score; 4 incumbent primitives evaluated; ≥3 cross-model integration patterns documented |
| **B** | sca-v5 audit | **Code-quality + gitnexus + git-practice deep audit** — W303-A gap #4 GitHub Actions `code-quality.yml` re-audit under sca-v5; gitnexus status (currently `enabledPlugins: false` per W302-A); git practice (worktree cap + rebase-not-merge + force-with-lease + pre-commit gate) | `W305-STREAM-B-CODE-QUALITY-GIT-AUDIT.md` | Per-subsystem sca-v5 verdict; CI lane gap analysis; git practice compliance check |
| **C** | governance audit | **`OthmanAdi/planning-with-files` Phase-5 gate reconciliation** — verdict: T1 INSTALL 4.67 (W291 ledger row #3); deactivated W295-r30; silent re-enable W296 foundation commit `2bf2d27` WITHOUT Phase-5 evidence (W299-D found this in calibration audit). Operator-named in W305 mandate | `W305-STREAM-C-PWF-GOVERNANCE.md` | Phase-5 Gate-3+Gate-5 audit; ratify-or-deactivate decision; cite W291+W295+W296+W299 history |
| **D** | execution (HIGH-RISK CRITICAL R8) | **R8 EvalLog implementation attempt** — read sca-v5 SKILL.md §4.5 R8 + harness/eval_harness.py `_persist()` + inspect_ai EvalLog format spec; implement minimal patch writes `verdicts/W<wave>-<slug>-evallog.json`; smoke-test. If patch >50 LOC or smoke-test fails → ROLLBACK + document operator-execution-handoff | `W305-STREAM-D-R8-IMPLEMENTATION.md` + edits to `harness/eval_harness.py` (if safe) | Either: (a) R8 patch landed + smoke-test PASS; or (b) documented handoff with implementation-spec for operator-execution |

**Coordinator (self)**: synthesis → `W305-AUDIT-2026-05-18.md` → codex r1 e2e per operator persistent gpt5.5 pre-approval → ship-chain commit.

## §2 — File ownership

- `W305-PLAN.md` — coordinator
- 4 `W305-STREAM-*` files — per-stream
- `W305-AUDIT-2026-05-18.md` — coordinator
- `W305-CODEX-R1.md` — coordinator

**Stream D EXCEPTION**: edits `harness/eval_harness.py` IF R8 patch is turn-feasible + smoke-safe. Otherwise documents handoff. No other stream edits state-mutating files.

## §3 — Anti-bias mandates (carried)

- sca-v5 multi-MCP cascade (≥6 families per A+B+C; ≥3 for D since it's execution-class)
- Honest verdicts (Stream C may surface planning-with-files needs re-deactivation; Stream A may surface agent-teams primitive should be DEEPER-WIRED or REPLACED)
- 2026-MAY freshness MANDATE
- Source disagreements MUST surface in `sources_typed.<dim>.disagreement[]`
- **W305-D-specific**: ROLLBACK if smoke-test fails; never ship code that breaks W288-fix1 + fix6 + fix8 invariants

## §4 — Cite-anchors

- W304-AUDIT §3.1 R8 contract drift (Stream D source-of-truth)
- W304-STREAM-A-HARNESS-EVAL-DEEP-AUDIT §1 _persist() current state
- `.claude/skills/sota-convergence-audit/SKILL.md §4.5` R8 contract text
- W299-D §6 planning-with-files mis-call (Stream C source-of-truth)
- W291.Stage2 ledger row #3 (planning-with-files T1 4.67)
- W302-A §2 serena audit pattern (Stream A reference for sca-v5 deep audit)
- W303-A coverage gap matrix (Stream B gap #4 GitHub Actions)

## §5 — Verification-on-completion

Each stream MUST end with:
- File written + LOC
- ≥3 cite-anchors
- Top 3 findings + confidence levels
- Source-disagreement log
- Cardinal-rule self-check
- Items routed to W305-AUDIT synthesis

Stream D MUST report:
- Patch line-count (or "deferred" with reason)
- Smoke-test result (PASS / FAIL / NOT-RUN)
- Rollback status if applicable
