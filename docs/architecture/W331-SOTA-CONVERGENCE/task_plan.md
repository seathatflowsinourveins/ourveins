# W331 SOTA-CONVERGENCE — Task Plan (planning-with-files contract)

> Wave **W331** · 2026-05-19 · branch `goal/W331-sota-convergence` · per OthmanAdi/planning-with-files@d27008f3 `SKILL.md:86-99` (task_plan + findings + progress trio).

## §1 Goal (verbatim from /goal predicate at W330-MEGA-AUDIT/GOAL-W331.md)

W331 SOTA convergence: foundation = W330 mega-audit + codex r1 dual-axis NEEDS-REVISION@0.86 position-swap CONVERGENT. Execute 9 P0 items + MANDATES + REPORT + STOP-gate + INVERSE-TEST.

## §2 P0 inventory + status (FINAL — wave-close)

| ID | Title | Status | Branch artifact |
|---|---|---|---|
| P0.1 | Parallel-detector root-fix (timestamp-window pragma vs UserPromptSubmit ideal) | ✓ LANDED `68d89ca` + `5aed4f3` CR-5 binding-gate ratify | `tools/preagent-parallel-guard.mjs` |
| P0.2 | Project-dir redirect probe | PENDING operator-side `/insights` probe (acceptable per codex r2 PRIMARY+SWAP) | (operator-side) |
| P0.3 | Codex consolidate | ✓ DONE W330 | `docs/.../W330-MEGA-AUDIT/codex-consolidate-before.json` |
| P0.4 | Install-state contract | ✓ PROBED (16-key actual drift; gitnexus binary-vs-shell drift confirmed Stream-7) | `findings.md §1` + `§12 Stream-7` |
| P0.5 | Line-by-line ingest (21 repos) | ✓ ALL 7 STREAMS COMPLETE | 7× `W331-LINE-BY-LINE/*-ingest.md` |
| P0.6 | T1 hindsight bakeoff | ✓ DONE — mem0=T1-PROV winner (smoke-gate caveats documented) | `t1-bakeoff-mem0-letta-zep.md` |
| P0.7 | Frontier-peer policy CLAUDE.md edit | ✓ LANDED `765a16f` | CLAUDE.md L10 |
| P0.8 | Prompt-optimizer track survey | ✓ DONE — dspy.GEPA → GoalSynthesisPipeline recommended | `p0.8-prompt-optimizer-survey.md` |
| P0.9 | Rules + severity calibration | ✓ LANDED `765a16f` + `5aed4f3` CR-2 hook + `ee01d38` L22 factual fix | CLAUDE.md CR-1..5 + `.pre-commit-config.yaml` cr2-2kb-hooks |

## §3 MANDATES checklist (Δ-G49 Orchestrator-Worker contract)

- [x] Orchestrate via parallel fan-out (3 Agent dispatches in 1 message validated guard fix)
- [ ] Cross-model: codex round-2 of executed state (deferred until P0.x land)
- [x] Per-agent budgets: ≤15 calls + ≤140k tokens (encoded in dispatched prompts)
- [x] Skeleton-first Δ-DPA-1 + empty-final-message F5 + NO inline repomix-pack F4 (encoded in dispatched prompts)
- [x] All edits on `goal/W331-sota-convergence` branch (verified via `git branch --show-current`)

## §4 REPORT artifacts (this dir)

- ✓ `task_plan.md` (this file) — `8e5140b` initial + `49fa42c` close + `5d83847` r5-final-patch
- ✓ `findings.md` (running ledger §1-§13) — `8e5140b` initial + `765a16f` + `ee01d38` + `98e157e` §6-refresh
- ✓ `progress.md` (commit-by-commit timeline T1-T12) — `8e5140b` initial + `49fa42c` T6-T12 update
- ✓ `SYNTHESIS.md` cross-stream consolidation — `93d753e` initial compile + `2add8fc` doc-integrity patch + `5d83847` §6 W332.6 closure
- ✓ codex r1+r2+r3+r4+r5+r6 verdicts captured in T6 basic-memory `main/verdicts/w331-sota-convergence-verdict-ledger-row` (this session) + `W330-MEGA-AUDIT/CODEX-VERDICT-LEDGER.md` (post `7e00a57` r2+r3 records, this turn r6-refresh)

## §5 STOP-gate checklist (from /goal predicate)

- [ ] CLAUDE.md ≤50 LOC pointer-only (verified post-edit; P0.7+P0.9 add inline appends only)
- [x] `self_invented_count: 0` preserved (no new `.claude/rules/*.md`, no new `.claude/hooks/*` — only edit to existing `tools/preagent-parallel-guard.mjs`)
- [ ] ≥3-org-distinct cites per W295 I1 + Δ-G51 INDEPENDENCE-PROOF
- [ ] No CR-1..5 violations introduced
- [ ] Codex round-2 verdict APPROVE before merge
- [ ] T6 ledger row operator-opt-in (W295-r13 secret-redaction gate)

## §6 INVERSE-TEST (Δ-G51 falsifiability, copied from /goal)

IF anthropics/claude-code deprecated THEN parallel-dispatch SOTA preserved BECAUSE microsoft/autogen + langchain-ai/langgraph + assafelovic/gpt-researcher (org-distinct ✓; causal-distinct ✓ — none cite CC as precondition; temporal-distinct ✓: autogen 0.4 Oct-2024 pre-dates W269).

## §7 Active subagents (W331 wave)

| AgentID | Stream | Subject | Status |
|---|---|---|---|
| a2dce9f6 | Stream-2 | langgraph + autogen + gpt-researcher line-by-line | running |
| a6b298fe | Stream-3 | mem0 + Letta + Zep T1 bakeoff | running |
| afd17a36 | Stream-4 | DSPy + MIPRO + GEPA + ROMA+ survey | running |

## §8 Pending (next session OR later turns this session)

- Apply P0.7 + P0.9 CLAUDE.md edits (THIS TURN)
- Dispatch remaining 18 line-by-line ingest streams (P0.5 — batched 3-4 per wave)
- Codex round-2 review (after primary P0.x land)
- Verdict-ledger row to T6 basic-memory (operator-opt-in)
- CLAUDE.md L37 status archive update
