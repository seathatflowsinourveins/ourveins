---
name: karpathy-extended
description: Project-specific elaborations on Karpathy's 4 LLM-coding-discipline principles (Think-Before-Coding, Simplicity-First, Surgical Changes, Goal-Driven Execution) bound to local cardinal-rules CR-1..CR-6 + Δ-G49/G50/G51. Use when extending or applying karpathy-guidelines in the claude-sota-installed runtime.
license: MIT
source: forrestchang/andrej-karpathy-skills@1.0.0 (MIT) — T2-VENDOR-FORK per sca-v15 W342 Stream D #4
---

# Karpathy-Extended (W344 P5 vendor-fork)

> Companion to plugin `andrej-karpathy-skills@karpathy-skills` (already enabled per `.claude/settings.json:340`). This local-skill EXTENDS the upstream 4 principles with project-specific bindings to the cardinal-rules + Δ-G discipline of this runtime. Upstream content remains canonical and unmodified per CR-4.

## Why an extension exists

The upstream `karpathy-guidelines` ships 4 universal principles (Think-Before-Coding, Simplicity-First, Surgical Changes, Goal-Driven). This runtime has codified those into **executable** discipline via CR-1..CR-6 and Δ-G49/G50/G51. This extension is the cross-reference table so the orchestrator can resolve a karpathy-style nudge to the *specific* gate that enforces it.

## 1. Think-Before-Coding → CR-6 verify-before-claim + Δ-G49

Karpathy: "State your assumptions explicitly. If uncertain, ask."

Runtime binding:
- Every "DONE" / "fix landed" / "tests green" claim MUST cite an independently-reproducible probe (CR-6).
- Empty-final-message from a subagent without `NO-FINDINGS:<rationale>` sentinel is a Δ-G49 violation — `tools/subagent-stop-guard.mjs` exits 2 to block.
- Multi-interpretation ambiguity → AskUserQuestion BEFORE acting (when interactive); when autonomous and in `/goal` execution, pick the lowest-risk interpretation, then record the picked interpretation in the next assistant turn so the operator can correct.

Probe: `grep -E '\b(DONE|LANDED|GREEN)\b' <commit-msg>` ∧ accompanying citation file:line.

## 2. Simplicity-First → CR-2 ≤2KB shim + CR-4 self_invented_count:0

Karpathy: "Minimum code that solves the problem. Nothing speculative."

Runtime binding:
- Operator-curated hooks under `.claude/hooks/**` capped at ≤2KB EACH; only **one** sanctioned shim (`context-mode-cache-heal.mjs` patching anthropics/claude-code#46915) — every additional shim requires explicit GitHub-issue anchor.
- Self-invented files: `self_invented_count` invariant = 0; new files MUST be (a) tooling shim under `tools/` with cite-anchor, OR (b) doc under `docs/architecture/W<N>-*/`, OR (c) operator-curated local skill under `.claude/skills/<name>/SKILL.md`. No ad-hoc `.py/.sh/.mjs` outside those paths.
- "If 200 lines could be 50, rewrite it" → enforced at PR-review time via codex r1 + pre-commit `cr2-2kb-hooks` gate.

Probe: `wc -c .claude/hooks/*.mjs` (each <2048) ∧ `find . -newer <wave-start-tag> -type f -path '*/tmp/*' -prune -o -type f \\( -name '*.mjs' -o -name '*.py' -o -name '*.sh' \\) -print` audit.

## 3. Surgical Changes → W269 parallel-dispatch + worker-file-ownership

Karpathy: "Touch only what you must. Clean up only your own mess."

Runtime binding:
- W269 parallel-dispatch mandate: when ≥2 independent streams, dispatch ≥2 Agents in 1 message; each worker owns a disjoint file-set passed in the prompt; cross-stream edits require integration commit by orchestrator.
- "Don't refactor things that aren't broken" → CR-4 sub-rule: new local skill content is additive (a new SKILL.md file), NOT rewrite-in-place of plugin-shipped files. Vendor-fork at the *adjacent path*, not the *upstream path*.
- When fixing one finding from a multi-finding audit, the commit MUST be pathspec-narrowed (`git add <specific-files>` not `git add -A`).

Probe: `git diff --stat <commit>` ∧ every changed line traces to the cited finding number.

## 4. Goal-Driven Execution → goal-prompt-synthesis + /goal Stop-hook

Karpathy: "Define success criteria. Loop until verified."

Runtime binding:
- `/goal` skill (`goal-prompt-synthesis`) authors predicates ≤3800 chars with FRONTIER/MANDATES/STOP-gate/Δ-G51 INDEPENDENCE-PROOF blocks.
- Session-scoped Stop-hook blocks shutdown until the goal's STOP-gate criteria hold — orchestrator loops autonomously until criteria are verifiable-true via probes.
- "Make it work" weak-criteria phrasing is rejected at goal-synthesis time; every priority MUST cite (a) the file to land OR (b) the probe that verifies done.

Probe: `<goal-block> matches: FRONTIER:.+P[0-9].+(file|cmd|probe):` regex on the /goal text.

## Cross-stream wiring (this runtime's δ over upstream)

| Karpathy principle | Local enforcement | Skill/tool that fires |
|---|---|---|
| Think-Before-Coding | CR-6 verify-before-claim | codex r1 review (cross-model evidence-checking gate); `tools/codex-trailer-gate.mjs` enforces only the `Codex-Verdict` trailer presence, NOT evidence-on-DONE-claims |
| Simplicity-First | CR-2 ≤2KB shim | `.pre-commit-config.yaml:cr2-2kb-hooks` |
| Surgical Changes | W269 parallel + file-ownership | `tools/preagent-parallel-guard.mjs` |
| Goal-Driven | /goal Stop-hook | `.claude/sessions/<sid>/goal.json` |
| (extension) Anti-empty-final-message | Δ-G49 | `tools/subagent-stop-guard.mjs` |
| (extension) Worker-failure-fail-closed | Δ-G50 | `worker-failure-termination-guard` skill |
| (extension) Independence-proof in /goal | Δ-G51 | `goal-prompt-synthesis` §counterfactual |

## When this skill fires

The upstream `karpathy-guidelines` auto-fires when its description matches. This extension fires when the orchestrator is about to:
- (a) author or extend a SKILL.md or hook with vendor-fork pattern
- (b) commit changes touching `.claude/skills/**` or `tools/**` and needs the local CR-binding context
- (c) resolve a karpathy-style review nudge to a specific gate name

## Sources

- Upstream: `forrestchang/andrej-karpathy-skills@1.0.0` MIT @ `.claude/plugins/cache/karpathy-skills/andrej-karpathy-skills/1.0.0/`
- Project cardinal-rules: `CLAUDE.md` (50-LOC pointer)
- Δ-G discipline: W339 P1b research-arch + Δ-G49/G50/G51 in `goal-prompt-synthesis` skill
- W342 Stream D #4 verdict: `docs/architecture/W342-CONTINUE/F-tier2-pattern-study.md` (T2-VENDOR-FORK 4.5)
