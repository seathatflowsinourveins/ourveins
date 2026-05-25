# W330 MEGA-AUDIT — Task Plan (planning-with-files contract)

> Wave **W330** · 2026-05-19 · Orchestrator: Claude Code (Opus 4.7 1M) · Reviewer: codex GPT-5.5 (Phase-6 pending)
>
> Adopting `planning-with-files` SOTA pattern per Stream A G6 + W330 Stream B verdict on `OthmanAdi/planning-with-files@d27008f3` v2.38.1. Cite: `Z:/claude-sota-installed/.claude/plugins/marketplaces/planning-with-files/skills/planning-with-files/SKILL.md:86-99` (task_plan / findings / progress trio).

## §1 Goal

Audit the entire `Z:/claude-sota-installed` runtime ecosystem and remediate all identified gaps to bring it to a verifiable SOTA-compliant state. Operator-explicit concerns:
1. Cross-session race conditions (file modify in one session, lost/corrupted in another)
2. Agent-team silent fallback or errors
3. /insights "missing" feature
4. Parallel-workflow enforcement (W269 mandate; 0.0036 baseline = SEV-1)
5. Tool-ecosystem drift (Node22, shell, docker, CLI)
6. Research architecture SOTA status
7. GPT-5.5 e2e adversarial gate on rules + repo selection

## §2 Streams (8 parallel dispatch — wave-1 research)

| Stream | Topic | Deliverable | Status | Tool calls / budget |
|---|---|---|---|---|
| A | Cross-session race & SOTA git practice | `A-cross-session-race-audit.md` | ✓ complete | 19/15 over-budget |
| B | SOTA 10-repo drift audit | `B-sota-repos-ingestion.md` | ✓ complete | 16/15 |
| C | Silent-fallback hunt across runtime | `C-silent-fallback-hunt.md` | ✓ complete | 21/15 over-budget |
| D | Agent-team orchestration verification | `D-agent-team-verification.md` | ✓ complete | 27/15 over-budget |
| E | Tool ecosystem audit | `E-tool-ecosystem-audit.md` | ✓ complete | 11/15 |
| F | Research architecture SOTA check | `F-research-architecture-audit.md` | ✓ complete | 13/15 |
| G | Compare vs official + CCBP + ECC | `G-compare-vs-official.md` | ✓ complete | 25/15 over-budget |
| H | Coding-language SOTA survey | `H-coding-language-sota.md` | ✓ complete | 21/15 over-budget |

**Note**: 6 of 8 agents exceeded the 15-tool-call cap — none reported BUDGET-EXHAUST-PARTIAL. Δ-PDM-2 budget-cap discipline needs harness-side enforcement (per Stream C+D findings; the budget is prose-only in the prompt, not host-enforced).

## §3 Current status

- Wave-1 (research): ✓ complete
- Wave-2 (synthesis + remediation plan): in flight (this turn)
- Wave-3 (codex GPT-5.5 adversarial review): pending dispatch
- Wave-4 (P0 remediation execution): pending operator-confirmation gates
- Wave-5 (codex re-review of executed state): pending
- Wave-6 (CLAUDE.md L37 status archive + T6 basic-memory ledger): pending

## §4 Next actions (priority order)

1. ✓ Write `SYNTHESIS.md` consolidating 8 streams with cross-stream root-cause correlations
2. ✓ Write `REMEDIATION-PLAN.md` with P0/P1/P2 + operator-confirmation gates
3. Run idempotent safe ops: `git worktree prune` (✓ in flight), verify on-disk worktree state
4. Dispatch codex GPT-5.5 round-1 adversarial review (Phase-6 sca-v12.1 + ΔDPA-4 position-swap)
5. Operator confirms P0 actions (5 decisions enumerated in SYNTHESIS §5 / REMEDIATION-PLAN §4)
6. Execute P0 remediation in confirmed order
7. Wave-5 codex re-review of executed state
8. Land into CLAUDE.md L37 status (rolling-3 archive) per `CLAUDE-MD-STATUS-CURRENT-W324.md`
9. T6 basic-memory ledger row for sca-v12.1 verdict + remediation outcomes

## §5 Acceptance criteria

- [x] All 8 stream deliverables present + cite-anchored ≥3-org-distinct per W295 I1
- [x] SYNTHESIS resolves cross-stream contradictions empirically (Stream A vs Stream G on /insights, A vs git on worktree zombies)
- [ ] REMEDIATION-PLAN has explicit operator-confirmation gates for non-reversible actions (D1-D5)
- [ ] Codex GPT-5.5 round-1 returns APPROVE or REVISE (not BLOCK)
- [ ] W330 verdict-ledger row written to T6 basic-memory

## §6 Provenance

- Skill template: `OthmanAdi/planning-with-files` v2.38.1 SKILL.md L86-99 (T1 verdict per Stream B sca-v12.1)
- Wave precedent: W329 Stream E cite-refresh; W328 sca-v12 absorb; W325 parallel-ratio telemetry F1 SEV-1
- Operator mandate: "no budget limit, MAX code quality" + "GPT-5.5 e2e questions your rules and repos selection"
- Stage-0 existence-probe: all 10 SOTA candidates passed §1 of sca-v12.1
