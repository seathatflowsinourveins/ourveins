# PROGRESS — example template for goal-driven-eee skill

> **Status**: REFERENCE TEMPLATE — copy this into `<repo-root>/PROGRESS.md` at the start of a `/goal`-driven session and adapt to the wave-specific predicate.
>
> Provenance: skeleton structure cite-anchored to `anthropics/cwc-long-running-agents/claude-code-config/.claude/CLAUDE.md` "Always start here" convention + `https://www.anthropic.com/engineering/harness-design-long-running-apps`.
>
> Schema invariants enforced by the `goal-driven-eee` skill `PROGRESS.md schema` section.

---

# PROGRESS — <one-line-session-purpose>

> Goal predicate: <verbatim copy of the `/goal <predicate>` text>
> Wave: W<nnn>-<slug>
> Worktree: Z:/claude-sota-installed-W<nnn>
> Created: 2026-MM-DD
> Last update: 2026-MM-DD HH:MM (auto-stamped by agent on every meaningful edit)
> eee-precheck snapshot: .eee/last-precheck.json (run `eee --mode deep --json` before session)

## Done

- [x] C0: pre-flight — eee-precheck deep mode exits 0 — 2026-MM-DD — evidence: `.eee/last-precheck.json`
- [x] C1: <first acceptance criterion> — 2026-MM-DD — evidence: `screenshots/C1-render.png` + commit `abc1234`
- [x] ...

## In progress

- [ ] C2: <current acceptance criterion name> — <one-line current status>
  - evidence required: `screenshots/C2-*.png` AND `logs/C2-output.txt`
  - acceptance criterion (verbatim from test-results.json): "<criterion text>"
  - blockers: <none | description>

## Next

- [ ] C3: <next acceptance criterion>
- [ ] C4: <next acceptance criterion>
- [ ] ...

## Notes

- eee-precheck last status: OK (T1-T6 green, 0 blocked, 0 advisory) per `.eee/last-precheck.json`
- prior session ended: 2026-MM-DD HH:MM (see `git log --oneline -10`)
- model drift watch: <any model-upgrade events that might affect this session>
- known harness-design risk: re-evaluate per `https://www.anthropic.com/engineering/harness-design-long-running-apps` "Re-simplify on model upgrades" cadence
- cardinal-rule audit notes: <any R1-R6 invariant the agent must take extra care to preserve in this wave>

---

## How the per-turn evaluator reads this file

Per `goal-driven-eee/SKILL.md` §"PROGRESS.md schema":

1. **Four sections present** in this exact order: `## Done` → `## In progress` → `## Next` → `## Notes`.
2. **One active item** under `## In progress` at a time.
3. **Done items cite evidence** — every `- [x]` has an `evidence:` suffix.
4. **Last-update timestamp** monotonically non-decreasing.

Violations → fresh-context evaluator (via `dual-review` + codex-review-gate) emits `NEEDS_WORK: <specific finding>` and the next session starts with those findings as the prompt prefix.
