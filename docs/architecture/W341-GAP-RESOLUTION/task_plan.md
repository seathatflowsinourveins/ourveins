# W341 — Gap Resolution (W340 OPERATOR-SIGN-QUEUE closure)

> **Date**: 2026-05-20
> **Trigger**: operator "please gap resolute with full depth" mandate
> **Prior wave**: W340 (committed `9993945` with codex r6 APPROVE; Q1-Q11 queued)
> **Constraint**: M1 ≤3 parallel dispatch cap (W338-CPA-ROUTER 529-storm mitigation)
> **Discipline**: empty-final-message-guard + worker-failure-termination-guard + FQN subagent_type + Cardinal Rule 6

## W340 Q1-Q11 → W341 disposition

| Q | Item | W341 disposition | Agent |
|---|---|---|---|
| Q1 | sca-v15 SKILL.md (D76-D80 + lineage + denom) | **EXECUTE** — apply 4 proposed-edit blocks per S3 §A.1 | A |
| Q2 | Plugin cache-delete + fresh-install (3 drifts) | **PROPOSE-ONLY** — write apply script + safety report; operator-execute (MEDIUM risk) | B |
| Q3 | OTLP_HEADERS Basic-auth + post-rotation OTEL | **DEFER** — blocked by Q9 key rotation | — |
| Q4 | self-improving-agent disable rationale doc | **EXECUTE** — write decision doc | A |
| Q5 | Install zilliztech/claude-context + snyk/agent-scan | **DEFER** — CR-1 trust-tuple operator-sign required | — |
| Q6 | Run repatch-context-mode-hooks-json.ps1 | **EXECUTE** — idempotent script | B |
| Q7 | TC-3 fork-vs-task probe | **DEFER** — operator-side eval script | — |
| Q8 | Mechanize Δ-G49 via hooks.SubagentStop | **EXECUTE** — settings.json edit (additive) | B |
| Q9 | Langfuse secret OS-vault migration | **PARTIAL** — write migration script + WindowsCredentialStore stub; operator must rotate keys at Langfuse UI | C-side |
| Q10 | CI/CD SOTA jobs (CodeQL/Dependabot/Trivy/SLSA-L3/Sigstore/commit-signing) | **SCAFFOLD** — create .github/workflows/ YAML; operator enables branch-protection | C |
| Q11 | Parallel-guard soft-fail → binding 2nd-violation flip | **EXECUTE** — code change to tools/preagent-parallel-guard.mjs | B |

## Agent dispatch (3 within M1 cap)

| Agent | Subagent type | Streams |
|---|---|---|
| **A** | general-purpose | Q1 sca-v15 SKILL.md edits + Q4 disable rationale doc |
| **B** | incident-response:devops-troubleshooter | Q8 SubagentStop hook + Q11 parallel-guard binding flip + Q6 repatch script + Q2 propose-only |
| **C** | general-purpose | Q10 .github/workflows/ SOTA scaffolding + Q9 partial migration script |

## File ownership (zero overlap)

- **Agent A** owns: `.claude/skills/sota-convergence-audit/SKILL.md` + `docs/architecture/W341-GAP-RESOLUTION/Q4-DISABLE-RATIONALE.md` + agent deliverable `A-deliverable.md`
- **Agent B** owns: `.claude/settings.json` (hooks block ONLY) + `tools/preagent-parallel-guard.mjs` + plugin cache (repatch via existing script) + `Q2-PLUGIN-DRIFT-PROPOSAL.md` + agent deliverable `B-deliverable.md`
- **Agent C** owns: `.github/workflows/*.yml` (NEW files) + `docs/architecture/W341-GAP-RESOLUTION/Q9-MIGRATION-SCRIPT.md` + agent deliverable `C-deliverable.md`

## Anti-pattern guards

- Empty-final-message: each agent MUST return non-empty OR `NO-FINDINGS:<rationale>`
- Worker-failure-terminate: exception → explicit error, no silent partial-synthesis
- FQN subagent_type: incident-response:devops-troubleshooter (full namespace), general-purpose (sanctioned bare)
- Cardinal Rule 6: every claim cites file:line OR command exit code

## Codex r1 SHIP-BLOCKER closure (post-W341)

- **SB-1 Q9** Langfuse exposure: PARTIAL (script + stub; rotation operator-side)
- **SB-2 Q10** CI/CD: SCAFFOLDED (workflows present; branch-protection operator-side)
- **SB-3 Q11** Orchestration mechanization: FULLY CLOSED via parallel-guard binding flip

## Verification gates pending

- VG-A: Q1 sca-v15 commit must be operator-signed (per W339-P1b REPORT-ONLY)
- VG-B: Q8 hook test fire on synthetic empty subagent return
- VG-C: Q11 binding flip must NOT block legitimate single-agent dispatches — preserve 1st-violation advisory, ONLY 2nd-violation binding
- VG-D: Q10 workflows must not fire on this commit (avoid CI noise during scaffolding)
