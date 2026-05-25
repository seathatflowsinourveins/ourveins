# 05 — obra/superpowers anatomy (Tier-1 method, ALREADY INSTALLED in eee)

> **Source**: `Z:/repos/deps/superpowers @ HEAD f2cbfbefebbfef77321e4c9abc9e949826bea9d7 [VERIFIED 2026-05-10]`
> **License**: MIT (verified at root LICENSE)
> **Version**: v5.1.0 (released 2026-05-04)
> **Last push**: 2026-05-04 (6 days ago — VERY ACTIVE)
> **Stars**: 185k (per Fire 6 audit; updated count pending)
> **Audit depth**: 14-skill inventory + CLAUDE.md Contributor Guidelines + RELEASE-NOTES

## What it is

**Superpowers** by Jesse Vincent (obra) at Prime Radiant. The strongest signal in
the CC ecosystem. Cross-tool (CC + Codex + OpenCode + Gemini CLI + Cursor) skill
framework with **14 production-tested skills** + CLAUDE.md governance + hooks +
package.json + AGENTS.md + GEMINI.md (multi-harness manifests).

**Installation status in eee**: ✅ ALREADY INSTALLED via `claude-plugins-official` marketplace.

## The 14 skills (load-bearing inventory)

```
brainstorming                      ← STEP 1: idea → spec
dispatching-parallel-agents        ← parallel fan-out discipline
executing-plans                    ← STEP 7: plan → execution
finishing-a-development-branch     ← merge + cleanup
receiving-code-review              ← reviewee side
requesting-code-review             ← reviewer side
subagent-driven-development        ← subagent-based dev pattern
systematic-debugging               ← root-cause debugging discipline
test-driven-development            ← TDD with RED-GREEN-REFACTOR ENFORCED
using-git-worktrees                ← worktree-per-branch isolation
using-superpowers                  ← META-skill: how to use this framework
verification-before-completion     ← claim-time gate (NO COMPLETION WITHOUT EVIDENCE)
writing-plans                      ← STEP 2: spec → plan
writing-skills                     ← skill-authoring discipline
```

## Workflow grammar (7-step process per CLAUDE.md + skill cross-refs)

```
brainstorming → using-git-worktrees → writing-plans →
subagent-driven-development OR executing-plans → test-driven-development →
requesting-code-review → finishing-a-development-branch
```

## Contributor Guidelines (CLAUDE.md key findings — load-bearing for what NOT to PR)

Per CLAUDE.md "Superpowers — Contributor Guidelines > What We Will Not Accept":

### "Compliance" changes to skills

> Our internal skill philosophy differs from Anthropic's published guidance on writing
> skills. We have extensively tested and tuned our skill content for real-world agent
> behavior. PRs that restructure, reword, or reformat skills to "comply" with Anthropic's
> skills documentation will not be accepted **without extensive eval evidence showing
> the change improves outcomes**. The bar for modifying behavior-shaping content is very high.

**Critical finding**: Superpowers DIVERGES from Anthropic's skill-writing guidance —
their version is **eval-tested**. This is a STRONG-PROVENANCE-EXPRESS signal: the team
runs quant evals on skill content before accepting changes. The bar is set by measured outcomes.

### Other rejections

- **Project-specific or personal configuration** — "Skills, hooks, or configuration that
  only benefit a specific project, team, domain, or workflow do not belong in core.
  Publish these as a separate plugin."
- **Bulk or spray-and-pray PRs**
- **Speculative or theoretical fixes**
- **Third-party dependencies** (kept minimal)

This eval-discipline + lean-deps + no-personal-config posture is what makes Superpowers
the SOTA pick — the same posture eee's cardinal-rule-9 enforces (version-pin / 2-round
fix-forward / pre-cite-import REVERT check / sibling-bleed defense).

## Cross-tool manifests

| File | Purpose |
|---|---|
| `CLAUDE.md` | Claude Code context |
| `AGENTS.md` | Cross-tool / codex / opencode context |
| `GEMINI.md` | Gemini CLI context |
| `gemini-extension.json` | Gemini CLI extension registration |
| `package.json` | npm registration (cross-tool install) |

This **N-lateral cross-tool support** (not bilateral) is a SOTA differentiator. spec-kit
also supports N agents, but Superpowers ships per-harness manifest FILES (not just
integration adapters).

## SRA D1-D10 verdict

| Dim | Score | Notes |
|---|---|---|
| D1 license-use-class | PASS | MIT — fully permissive |
| D2 freshness | PASS | 6-day push, ACTIVE; v5.1.0 just shipped |
| D3 fresh-paint clear | PASS | 185k★ + multi-year history + 14 deeply-tested skills |
| D4 maintainer-provenance | PASS | Jesse Vincent / Prime Radiant TIER-2-NAMED-PRACTITIONER |
| D5 active-maintenance | PASS | v5.1.0 = sustained release cadence |
| D6 use-class compat | PASS | autonomous /loop compatible; eee uses 6 of 14 skills already vendored |
| D7 Anthropic-aligned | PARTIAL (with caveat) | DIVERGES from Anthropic guidance (per Contributor Guidelines); divergence is EVAL-BACKED |
| D8 industry adoption | PASS | most-installed framework per multiple libhunt reviewers; ships in claude-plugins-official |
| D9 FM-class clear | PASS | no known FM-class triggered |
| D10 replacement viability | N/A | ALREADY INSTALLED |

**SRA score: 9/10 PASS + 1 PARTIAL (D7)** — D7 PARTIAL is INTENTIONAL design choice
backed by evals; NOT a quality concern. **CONFIRMED SOTA**.

## Why-SOTA — the strongest signal

1. **185k+ stars** = highest in the CC ecosystem
2. **Anthropic OFFICIAL marketplace** (`claude-plugins-official`) ships it
3. **Eval-first PR bar** = behavior changes require quant evidence
4. **N-lateral cross-tool** = native CLAUDE.md + AGENTS.md + GEMINI.md + extension JSON
5. **14 production-tested skills** covering full SDLC (brainstorm → plan → TDD → debug → review → merge)
6. **TDD with RED-GREEN-REFACTOR enforced** = literally deletes pre-test code (verifiable
   behavior, not just guidance)
7. **Named-author Jesse Vincent** = TIER-2 NAMED-PRACTITIONER with public track record
8. **Working installation in eee** = real-world dogfood at 6 of 14 skills already vendored:
   - plan (from writing-plans)
   - debug (from systematic-debugging)
   - tdd (from test-driven-development)
   - verification-before-completion (vendored iter-83)
   - subagent-driven-development (vendored iter-84)
   - requesting-code-review (vendored iter-86)

## eee install state (verbatim from `team-orchestration.md §Selectively-vendored sister skills`)

Per existing eee architecture (sibling `Z:/claude-sota/.claude/rules/team-orchestration.md`):
- 6 of 14 upstream skills already SELECTIVELY VENDORED
- 3 actively REJECTED-FOR-FIT: brainstorming (HARD-GATE iter-84), writing-skills (size-sprawl iter-85),
  dispatching-parallel-agents (KISS Must-Never #4 duplicate of `parallel-agent-wave.md`)
- Remaining 5 candidates: systematic-debugging (partial-vendored as debug), executing-plans,
  finishing-a-development-branch, receiving-code-review, using-superpowers (using-git-worktrees
  already covered by `parallel-session-worktree-isolation.md`)

## Forward fire status

- ALREADY INSTALLED — no install fire required
- Fire 9 hygiene candidate: re-audit 5 remaining upstream skills for selective-vendoring (e.g.,
  systematic-debugging full upstream-name parity vs current debug shorthand)

## Mia ladder advance

n=940 → n=945 (+5: MIT verified / v5.1.0 verified / 14-skill inventory verified / Contributor
Guidelines eval-bar verified / N-lateral cross-tool manifest set verified)
