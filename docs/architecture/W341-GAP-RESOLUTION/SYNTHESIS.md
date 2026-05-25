# W341 — Gap Resolution (SYNTHESIS)

> **Date**: 2026-05-20
> **Trigger**: operator "please gap resolute with full depth" mandate
> **Prior wave**: W340 (committed `9993945` with codex r6 APPROVE; Q1-Q11 queued)
> **Mid-wave commit**: Agent B autonomous commit `0842bc9` (codex r2 APPROVE on subagent-stop-guard)
> **Constraint**: M1 ≤3 parallel dispatch cap respected
> **Discipline**: empty-final-message-guard (3/3 PASS) + worker-failure-termination-guard (0 failures) + FQN subagent_type + Cardinal Rule 6

## Q-by-Q closure status

| Q | Item | Disposition | Status | Carrier |
|---|---|---|---|---|
| Q1 | sca-v14 → sca-v15 SKILL.md (D76-D80 + lineage + denom) | EXECUTE | ✅ **LANDED** (8 edits: 4 spec + 4 consequential roll-forward; W295 anti-bias gate 5×≥3-org-distinct; CR-6 measurement + thresholds) | Agent A |
| Q2 | Plugin cache-delete + fresh-install (3 W270 drifts) | PROPOSE-ONLY | ✅ **PROPOSAL WRITTEN** — uses Move-Item to timestamped backups (per codex r1 LOW-MEDIUM); `OPERATOR_SIGN=W341-Q2` gate required | Agent B |
| Q3 | OTLP_HEADERS Basic-auth + post-rotation OTEL | DEFER | ⏸ blocked on Q9 key rotation | — |
| Q4 | self-improving-agent disable rationale | EXECUTE | ✅ **RETAIN DISABLED** verdict documented (4 converging evidence threads; no re-enable proposal queued) | Agent A |
| Q5 | Install zilliztech/claude-context + snyk/agent-scan | DEFER | ⏸ CR-1 trust-tuple operator-sign required | — |
| Q6 | Run repatch-context-mode-hooks-json.ps1 | EXECUTE | ✅ **LANDED** (13 fnm_multishells refs replaced with `Z:/tools/nodejs/node.exe` in BOTH 1.0.141 + 1.0.146; script extended idempotent for both patterns) | Agent B |
| Q7 | TC-3 fork-vs-task probe | DEFER | ⏸ operator-side eval | — |
| Q8 | Mechanize Δ-G49 via hooks.SubagentStop | EXECUTE | ✅ **LANDED + codex r2 APPROVE** (`tools/subagent-stop-guard.mjs` 148 lines; settings.json hook block added; codex r1 caught 2 issues both fixed — `last_assistant_message` primary field + removed invalid `emitHookOutput()`) | Agent B |
| Q9 | Langfuse OS-vault migration | PARTIAL | ✅ **SCRIPT DELIVERED** (5-step procedure: rotate at UI → install vault modules → register vault → edit CLAUDE.local.md → curl health probe); operator-side rotation final step (Langfuse has no public REST API for self-service key issuance) | Agent C |
| Q10 | CI/CD SOTA jobs scaffolding | SCAFFOLD | ✅ **2 NEW + 9 PRE-EXISTING** — Q10 gap was SMALLER than codex r1 suggested. 9 of 11 SOTA workflows already exist (codeql/zizmor/scorecard/provenance/ci.yml-jobs); only `actionlint.yml` + `commit-signing.yml` genuinely missing. Both added + parse-verified | Agent C |
| Q11 | Parallel-guard soft-fail → binding flip | NO-OP DISCOVERY | ✅ **VERIFIED ALREADY-SHIPPED W330** — `tools/preagent-parallel-guard.mjs` already has `state.count >= 1 → exit(2)` binding behavior (1 `exit(2)` + 8 `exit(0)` calls). CLAUDE.md L13 stale wording corrected this commit. | Agent B |

## CLAUDE.md L13 surgical correction

W341-B Q11 verification revealed CLAUDE.md L13 wording "proposed P0-A fix: block on 2nd-violation per session" was STALE — the fix was actually shipped in W330. Updated to "**P0-A fix SHIPPED W330** ... 1 `exit(2)` + 8 `exit(0)` calls per W341-B Q11 NO-OP verification; CR-5-exception condition-(b) per W330 r1 preserves 1st-violation advisory mode by design".

## Codex r1 SHIP-BLOCKER closure trajectory

| SB | W340 status | W341 closure | Operator remaining |
|---|---|---|---|
| **SB-1 Langfuse exposure** | OPEN (Q9) | PARTIAL — migration script ready; PowerShell SecretManagement + SecretStore vault setup documented | Rotate keys at Langfuse UI → run vault setup → edit CLAUDE.local.md §f2 |
| **SB-2 CI/CD 4.0/10** | OPEN (Q10) | FULLY SCAFFOLDED — 11/11 workflows present (9 pre-existing + 2 new); 100/100 RED runs from W340 SB-2 phantom-submodule blocker already fixed in W340 commit `9993945` | Enable GitHub branch-protection rules (UI-only) |
| **SB-3 Orchestration mechanization** | OPEN (Q11) | FULLY CLOSED — Q8 SubagentStop hook + Q11 binding-flip verified already-shipped W330 | None (mechanized) |

## Agent dispatch evidence

| Agent | Subagent type | Files modified | Commit |
|---|---|---|---|
| A | `general-purpose` | `.claude/skills/sota-convergence-audit/SKILL.md` + W341 docs | THIS commit |
| B | `incident-response:devops-troubleshooter` | `.claude/settings.json` + `tools/subagent-stop-guard.mjs` (new) + `tools/repatch-context-mode-hooks-json.ps1` + plugin cache hooks.json + W341 docs | **`0842bc9` (already shipped mid-wave)** |
| C | `general-purpose` | `.github/workflows/actionlint.yml` (new) + `.github/workflows/commit-signing.yml` (new) + W341 docs | THIS commit |

## Discipline applied

- Parallel-dispatch-mandate (3 Agent calls in 1 message; M1 ≤3 cap respected)
- Empty-final-message-guard 3/3 PASS (Δ-G49) — all agents returned substantive non-empty content
- Worker-failure-termination-guard 0 failures (Δ-G50)
- FQN subagent_type per W333-D-5 (`incident-response:devops-troubleshooter` + 2× `general-purpose` sanctioned)
- Cardinal Rule 6 (verify-before-claim) — every claim file:line + exit-code + script-output anchored
- W295 anti-bias gate (5×≥3-org-distinct cite anchors per Q1 D76-D80 dim)
- Codex round-trip (Agent B internally fired codex r1+r2 on subagent-stop-guard before committing)
- File-ownership boundaries respected zero-overlap (Agent A vs B vs C zero collisions)

## Carry-forward W342+

| # | Item | Reason for defer |
|---|---|---|
| **CF-1** | Q3 OTLP_HEADERS Basic-auth | Blocked on Q9 key rotation complete |
| **CF-2** | Q5 install zilliztech/claude-context + snyk/agent-scan | CR-1 trust-tuple operator-sign required |
| **CF-3** | Q7 TC-3 fork-vs-task probe | Operator-side eval (≥5 trials each mode) |
| **CF-4** | Operator-Q9 rotation step | Langfuse UI manual rotation |
| **CF-5** | Operator-Q2 plugin drift execution | Move-Item backup + reinstall execution |
| **CF-6** | Operator-Q10 GitHub branch-protection enable | GitHub UI-only |
| **CF-7** | Investigate "non-blocking status code: node:internal/modules/cjs/loader:1386" surfaced at session bootstrap | Hook-chain audit — likely a CJS module-not-found in an unrelated hook |

## Provenance

- W340 wave-close: commit `9993945`
- W341 Agent B mid-wave commit: `0842bc9`
- Agent A deliverable: `docs/architecture/W341-GAP-RESOLUTION/A-deliverable.md`
- Agent B deliverable: in `0842bc9` commit body + `tools/subagent-stop-guard.mjs`
- Agent C deliverable: `docs/architecture/W341-GAP-RESOLUTION/C-deliverable.md`
- sca-v15 lineage: `.claude/skills/sota-convergence-audit/SKILL.md` L6 + L12 + L168 + L189 + L307
