# Stream K — Codex GPT-5.5 Adversarial Review (Round-1)

**Wave**: W340-FULL-SOTA-UNLEASH
**Date**: 2026-05-20
**Reviewer**: codex GPT-5.5 via codex CLI (per CLAUDE.md cardinal-rule-1 cross-model consensus)
**Note**: Codex returned full verdict inline but Bash write to this path was blocked by read-only session policy. This file contains the operator-visible summary captured from the codex subagent's return message. Full inline transcript lives in the agent task output (not read into orchestrator context per dispatch-skill discipline).

---

## VERDICT: NEEDS-WORK (composite 6.6/10)

## 3 SHIP-BLOCKERS

1. **Secret exposure** — Langfuse keys (`pk-lf-<REDACTED>`, `sk-lf-<REDACTED>`) are present as literals in `CLAUDE.local.md` (full prefix NOT inlined here per codex r1 self-finding; CLAUDE.local.md is gitignored so the literal value stays out of git history — but is in model-readable memory). Must be rotated AND removed from model-readable memory. Mitigation: move keys to OS-vault / `git-credential-manager` and load via `Get-Secret` rather than literal assignment in memory file.

2. **CI/CD is not SOTA** — Local pre-commit hooks do NOT substitute for:
   - GitHub Actions branch protection
   - Signed commits enforcement
   - SLSA L3 provenance
   - CI-enforced security scanning (CodeQL, Dependabot security, Trivy)
   Score: **4.0/10** — lowest dimension.

3. **Agent orchestration mechanization gap** — Historical `parallel_ratio=0.0036` is catastrophic. Current state:
   - `tools/preagent-parallel-guard.mjs` still soft-fails (exit 0) on first violation
   - `tools/preagent-subagent-validator.mjs` soft-fails on missing-allowlist
   - These were sanctioned as CR-5-exception condition-(b) per W330 r1, but the soft-fail-first behavior means the binding-gate is bypassable on cold start
   Score: **6.5/10**

## Dimension Scores (0-10)

| # | Dimension | Score | Notes |
|---|---|---|---|
| 1 | Cardinal-rule compliance | tbd | (specific score not captured in summary) |
| 2 | Agent orchestration quality | 6.5 | advisory-only guards, heuristic allowlist |
| 3 | Hook discipline | 6.0 | project-owned scripts and large inline shell bodies remain |
| 4 | MCP server hygiene | tbd | |
| 5 | Skill bundle quality | tbd | |
| 6 | Insights / observability features | tbd | |
| 7 | CI/CD enforcement | 4.0 | no GitHub Actions, SLSA, signed provenance |
| 8 | Research architecture quality | tbd | |
| 9 | Memory layer | 6.5 | stale tier claims, basic-memory path drift still pending |
| 10 | Verify-before-claim discipline | tbd | |

**Composite**: 6.6/10

## SOTA peers comparison (per codex)

- **Closest to canonical SOTA**: `wshobson/agents` (agent-teams / orchestration / eval fit)
- **Second**: `addyosmani/agent-skills` (lifecycle discipline)

## Action — re-fire for full transcript

If full per-dimension scoring and TOP-10 next-actions are needed for synthesis, options:
1. SendMessage to agent `aa364b606cbb352e8` requesting echo of full verdict text
2. Re-fire `codex:codex-rescue` as round-2 once synthesis lands (this would be more useful — codex r2 reviews the proposed v2 architecture, not just current state)

## Round-2 schedule

Per CLAUDE.md W331 P0.7 FRONTIER-PEER POLICY, codex round-2 + Sonnet 4.6 tie-break occur AFTER synthesis. Round-2 prompt to be assembled from ARCHITECTURE-V2.md once all streams return.

---

*Provenance: stream-K agent `aa364b606cbb352e8`, completed 2026-05-20 ~14:11. Bash-write blocked → summary persisted by orchestrator.*
