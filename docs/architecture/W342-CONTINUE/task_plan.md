# W342 — Continued SOTA optimization (W341 carry-forward closure)

> **Date**: 2026-05-20
> **Trigger**: operator "resolve all with most SOTA practice, optimize this entire system" (repeated mandate)
> **Prior commits**: 9993945 (W340) → 0842bc9 (W341-B) → e0ad555 (W340-FIXUP) → 6754937 (W341-GAP-RESOLUTION)
> **Constraint**: M1 ≤3 parallel dispatch cap
> **Discipline**: empty-final-message-guard + worker-failure-termination-guard + FQN subagent_type + Cardinal Rule 6 + codex trailer-gate

## Outstanding gaps surfaced

| # | Item | Source | Autonomous? |
|---|---|---|---|
| CF-7 | "node:internal/modules/cjs/loader:1386" non-blocking hook error | W341 SYNTHESIS | ✅ INVESTIGATE |
| CF-8 | W341-FULL-SOTA-UNLEASH parallel wave (6+1 stream files + dir) | W341 SYNTHESIS | ✅ TRIAGE |
| Q8 verify | SubagentStop hook landed `0842bc9` — needs synthetic-event test | W341 commit | ✅ TEST |
| sca-v15 pilot | New D76-D80 dimensions need end-to-end demonstration | W341 Q1 | ✅ SCORE 1-2 CANDIDATES |
| Validator modified | `tools/preagent-subagent-validator.mjs` modified-unstaged (not from W341 scope) | `git status` | ✅ AUDIT |
| Plugin drift | `.claude/plugins/{installed_plugins,known_marketplaces}.json` modified | Q2 | ⏸ OPERATOR-SIGN |

## Agent dispatch (3 within M1 cap)

| Agent | Subagent type | Scope |
|---|---|---|
| **A** | `incident-response:devops-troubleshooter` | CF-7 CJS loader hook-chain audit + validator-modified audit |
| **B** | `general-purpose` | CF-8 W341-FULL-SOTA-UNLEASH parallel-wave triage + integration decision |
| **C** | `general-purpose` | Q8 SubagentStop synthetic-test + sca-v15 dimension pilot (1-2 candidates) |

## File ownership (zero overlap)

- **Agent A** owns: hook scan + `tools/preagent-subagent-validator.mjs` diff inspection + new doc `docs/architecture/W342-CONTINUE/A-cjs-loader-audit.md`
- **Agent B** owns: `docs/architecture/W341-FULL-SOTA-UNLEASH/*` (read only — decide integration) + new doc `docs/architecture/W342-CONTINUE/B-parallel-wave-triage.md`
- **Agent C** owns: synthetic-test execution + new doc `docs/architecture/W342-CONTINUE/C-q8-validation-and-sca-v15-pilot.md`

## Anti-pattern guards

- Empty-final-message: each agent MUST return non-empty OR `NO-FINDINGS:<rationale>`
- Worker-failure-terminate: exception → explicit error
- FQN subagent_type per W333-D-5
- Cardinal Rule 6 evidence-citation throughout
