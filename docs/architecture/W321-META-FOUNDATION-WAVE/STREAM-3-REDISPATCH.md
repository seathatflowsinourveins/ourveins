# W321 Stream-3 RE-DISPATCH — mattpocock/skills + addyosmani/agent-skills convergence

**Date**: 2026-05-19
**Methodology**: NARROWED per W322 P6 — `mcp__deepwiki__ask_question` only (NO `mcp__repomix__pack_remote_repository`). Prior fork burned 548K + 637K tokens with NO artifact across 2 dispatches; root cause = repomix pack on these multi-skill repos floods fork context. Inline execution by parent orchestrator succeeded.

## §1 mattpocock/skills — upstream vs local vendored

**Upstream skill count**: 20 (16 stable + 2 in-progress + 2 setup)

**Locally vendored** (`.claude/skills/`): 4 (`grill-with-docs`, `tdd`, `caveman`, `diagnose`) — W315-r2 owner `67bce91c`

**NET-NEW vendor-candidates** (12 stable not yet vendored):
| Skill | Description (deepwiki) | Vendor priority |
|---|---|---|
| `improve-codebase-architecture` | Find deepening opportunities; consolidate tightly-coupled modules | HIGH (refactor workflow gap) |
| `prototype` | Throwaway prototype branch: terminal app for state/business-logic OR UI variations | MEDIUM (W319 covered partly via frontend-design plugin) |
| `to-issues` | Break plan/spec/PRD into tracer-bullet vertical-slice issues | MEDIUM (GitHub-issue-workflow gap) |
| `to-prd` | Conversation → PRD published to project issue tracker | MEDIUM |
| `triage` | Issue triage state-machine | LOW |
| `zoom-out` | Higher-level perspective on code | MEDIUM (architecture-explanation gap) |
| `handoff` | Compact conversation → handoff document for another agent | **HIGH** (W314-r2 AI-r2-4 carry-over confirmed live) |
| `grill-me` | Relentless interview about plan/design | MEDIUM (overlaps interview-me; pick one) |
| `write-a-skill` | Create new skills with progressive disclosure | HIGH (meta-skill for skill authoring) |
| `git-guardrails-claude-code` | Claude Code hooks blocking dangerous git commands | LOW (our settings.json git-guard already covers) |
| `setup-pre-commit` | Husky + lint-staged + Prettier + type-check + tests | MEDIUM (W320 P4 husky installed but not wired) |
| `review` (in-progress) | Parallel-subagent review along Standards + Spec axes | **HIGH** (W314-r2 AI-r2-4 carry-over confirmed live; pairs with handoff) |

**Top-3 by impact**: `handoff` (HIGH; W314-r2 AI), `review` (HIGH; pairs with handoff), `write-a-skill` (HIGH; meta-skill authoring)

## §2 addyosmani/agent-skills — upstream vs local vendored

**Upstream skill count**: 22 (21 lifecycle + 1 meta `using-agent-skills`)

**Locally vendored** (`.claude/skills/`): 5 (`interview-me`, `doubt-driven-development`, `frontend-ui-engineering`, `api-and-interface-design`, `code-simplification`) + 3 prefix-namespaced variants. **Note**: `interview-me` is NOT in current upstream — may be deprecated upstream or repository-renamed (addyosmani has `idea-refine` and `grill-me` mattpocock-equivalent; verify).

**NET-NEW vendor-candidates** (17 not yet vendored):
| Phase | Skills | Vendor priority |
|---|---|---|
| Define | `idea-refine`, `spec-driven-development` | MEDIUM (spec-driven-development overlaps speckit-* plugin) |
| Plan | `planning-and-task-breakdown` | MEDIUM (TodoWrite + durable-planning-files cover partially) |
| Build | `incremental-implementation`, `test-driven-development`, `context-engineering`, `source-driven-development` | HIGH (`context-engineering` per addyosmani-addy-agent-skills marketplace) |
| Verify | `browser-testing-with-devtools`, `debugging-and-error-recovery` | MEDIUM (chrome-devtools-mcp covers browser) |
| Review | `code-review-and-quality`, `security-and-hardening`, `performance-optimization` | HIGH (security-and-hardening pairs with W322 P2 Ed25519) |
| Ship | `git-workflow-and-versioning`, `ci-cd-and-automation`, `deprecation-and-migration`, `documentation-and-adrs`, `shipping-and-launch` | LOW-MEDIUM (one-offs) |
| Meta | `using-agent-skills` | LOW (meta-orchestrator; we have using-superpowers) |

**Top-3 by impact**: `context-engineering` (HIGH; pairs with W320 P1 OTel + W314-CONTEXT-MD authoring patterns), `source-driven-development` (HIGH; addy-agent-skills marketplace registered already), `security-and-hardening` (HIGH; aligns W322 P2)

## §3 Net-new vendor-fork-6 recommendation (operator-decision)

Top-5 cross-author vendor candidates ranked:
1. **mattpocock/handoff** + **mattpocock/review** (paired) — W314-r2 AI-r2-4 confirmed live; pair = parallel-review-then-handoff flow
2. **addyosmani/context-engineering** — pairs with W320 P1 OTel local-cost-tracking
3. **mattpocock/write-a-skill** — meta-skill authoring; supersedes hand-rolled skill creation
4. **addyosmani/source-driven-development** — aligns with cardinal-rule-4 (no self-invent)
5. **addyosmani/security-and-hardening** — pairs with W322 P2 Ed25519 wire

## §4 Deprecated / superseded — REMOVE candidates

- Local `.claude/skills/interview-me` — verify against upstream addyosmani (may have been renamed/removed; if absent in HEAD, mark deprecated)
- 3 `addyosmani-{doubt-driven-development,frontend-ui-engineering,api-and-interface-design}` prefix-namespaced duplicates (W315-r2 says these mirror non-prefixed copies)

## Report-back (3 sentences)

mattpocock has 16 NET-NEW vendor-candidates (we have 4 vendored of 20 upstream); addyosmani has 17 NET-NEW (we have 5+3 prefix-duplicates of 22 upstream). Top-2 highest-impact vendor adds: **mattpocock/handoff + review paired** (W314-r2 AI confirmed live) and **addyosmani/context-engineering** (pairs with W320 P1 OTel local-cost-tracking). One DEPRECATED candidate flagged: local `interview-me` may have been renamed upstream — verify before re-vendor.

## Methodology validation

Inline (parent-orchestrator) execution: 1 deepwiki call per repo + WebFetch attempts (blocked by context-mode hook — re-route via gh CLI for commit SHAs next iteration). Total ~30s wall clock, ~6K tokens. Compare to failed fork dispatch: 548K + 637K = **1.18M tokens consumed, 0 deliverable bytes**. Confirms W322 P6 root-cause hypothesis: forks have a low-context-budget failure mode when calling repomix-pack on multi-skill repos.

**W322 P6 PARTIAL CLOSURE**: Stream-3 ✓ via inline. Stream-7 + Stream-8 next.
