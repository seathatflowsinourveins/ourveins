# W349-FULL-SOTA-UNLEASH — task plan (durable-planning-files anchor)

> **Wave**: W349-FULL-SOTA-UNLEASH · **Date**: 2026-05-20 · **Parent ledger row**: pending
> **Branch (proposed)**: `feat/w349-full-sota-unleash` off `main` (post-W347 P0.3 + W348 rebase)
> **Mode**: META-WAVE — full SOTA convergence audit; the receiving session executes findings.
> **Predecessor**: W347 (operator-sign-pending P0.2+P0.3), W348-CARRY-CLEANUP (mid-flight: P1.1 shipped, P0.4 parallel-guard W330 baseline RED).
> **Skills invoked at synthesis time**: `parallel-dispatch-mandate`, `sota-convergence-audit` (sca-v17), `goal-prompt-synthesis`, `mem-recall`, `citations-agent` (queued), `ops-rhythm` (queued), `task-close-discipline` (queued).

## Operator-stated scope (extracted from L0 prompt 2026-05-20)

1. SOTA git-tree practice + parallel-session workflow + branch-naming question (waves vs feature naming)
2. Memory layer + every-dimension-layer deep review via SOTA quality gate + multi-angle convergence
3. Folder cleanup of stale low-quality code + misleading references
4. GPT-5.5 proactive cross-model review throughout
5. Agent orchestration + skill auto-fire seamlessness audit
6. Hooks deep audit (errors? silent fallbacks?)
7. Full /goal predicate output
8. Insights feature audit (native to CC?)
9. Folder organization
10. No self-invents — all from SOTA repos full install + wire
11. MAX code quality, no budget limit (Opus 4.7 + GPT-5.5 unlimited)
12. Node.js v22.22.0 language practice from SOTA repos
13. Runtime ecosystem (CLI, Docker, shell, terminal) SOTA
14. Pull latest repos + ingest line-by-line
15. Compare with anthropics/CCBP/ECC HEAD
16. Experimental agent teams
17. Reference repos: wshobson/agents, addyosmani/agent-skills, mksglu/context-mode, alirezarezvani/claude-skills, OthmanAdi/planning-with-files, abhigyanpatwari/GitNexus, mattpocock/skills
18. Research-architecture itself audit
19. Repo discovery comprehensiveness + multi-dim ranking score
20. SOTA research MCP/endpoints (not just GraphQL)

## Stream decomposition (6 parallel forks — W269 ≥2 mandate; W325 F1 SEV-1 parallel_ratio uplift)

| Stream | Scope | Subagent_type | Deliverable |
|---|---|---|---|
| **A** | Memory T1-T6 + research-arch multi-angle audit | `general-purpose` | `STREAM-A-MEMORY-RESEARCH-ARCH.md` |
| **B** | Hooks + settings.json + cardinal-rule-2 silent-fallback audit | `general-purpose` | `STREAM-B-HOOKS-AUDIT.md` |
| **C** | SOTA git-tree + parallel-session + CI/CD + naming convergence | `general-purpose` | `STREAM-C-GIT-PRACTICE.md` |
| **D** | CCBP + ECC + anthropics offline runtime drift | `general-purpose` | `STREAM-D-UPSTREAM-DRIFT.md` |
| **E** | SOTA repos 8-MCP discovery sweep (sca-v17 D81 PASS-gate) | `general-purpose` | `STREAM-E-SOTA-REPO-DISCOVERY.md` |
| **F** | Runtime ecosystem (Node 22 + Docker + shell + Insights re-probe) | `general-purpose` | `STREAM-F-ECOSYSTEM.md` |

Each stream uses **skeleton-first-write** (Δ-PDM-1), **K=15 / M=140k budget** (Δ-PDM-2), and **3-org-distinct anchors per claim** (W295 I1).

## Post-stream synthesis pipeline

1. Read all 6 stream deliverables → consolidate into `SYNTHESIS.md`
2. Fire codex GPT-5.5 adversarial review per goal-prompt-synthesis §6.2 (round-1)
3. Absorb codex findings; produce `W349-PREDICATE.md` (paste-ready /goal ≤3800 chars)
4. Persist verdict-ledger row to T6 basic-memory (opt-in per operator)
5. Report to operator with concrete next-steps + branch-naming verdict

## Branch-naming verdict (preview)

Per Linux Kernel + Conventional Commits + GitFlow convergence: **HYBRID** — keep wave-N as ledger backbone (cross-session continuity + ops-rhythm dwell-counting + verdict-ledger row IDs), use semantic-prefix branch names (`feat/`, `fix/`, `chore/`, `docs/`) with wave-suffix (`feat/w349-full-sota-unleash`). This is what we already do for `w344-sota-unleash`, `goal/W347-sota-unleash`. Naming is NOT a blocker.

## Anti-bias gate (W295 inverse-test)

- ≥6 external source families consulted per stream ✓ (mandate in dispatch prompt)
- ≥1 challenger candidate per stream (NOT confirming existing arch)
- All cites external (NOT same-runtime self-referential)
- Inverse-test: ranking holds under DIFFERENT current arch

## Budget envelope

- Streams A-F: 6 × 140k tokens = 840k tokens max
- Synthesis turn: 50k
- Codex round-1: ~20k input + 4k output
- Codex round-2 if NEEDS-REVISION: same
- Total worst-case: ~1M tokens (within Opus 4.7 1M context cap)
