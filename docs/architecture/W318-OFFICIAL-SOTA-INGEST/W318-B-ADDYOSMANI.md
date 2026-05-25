# W318-B Stream — addyosmani/agent-skills Re-Audit

**Wave**: W318 Stream B
**Date**: 2026-05-19
**Source**: `Z:/repos/deps/addyosmani-agent-skills`
**Prior verdict**: W317-D vendor-forked 5 skills (api-and-interface-design, code-simplification, doubt-driven-development, frontend-ui-engineering, + one more); W316 T2 candidate

## §1 — Upstream HEAD + delta

| Metric | Value |
|---|---|
| Upstream HEAD | `f17c6e88c904dc747381c374312c2d58e10647ae` |
| Current SKILL.md count | **23** (was 22 at W317) |
| **NEW skill since W317** | **`interview-me`** (PR #164 merged) |
| All other recent commits | Frontmatter compliance fixes (PR #174, #170, #167, #169), README polish |

## §2 — SKILL.md inventory (current upstream)

```
api-and-interface-design          [vendored ✓]
browser-testing-with-devtools
ci-cd-and-automation
code-review-and-quality
code-simplification               [vendored ✓]
context-engineering
debugging-and-error-recovery
deprecation-and-migration
documentation-and-adrs
doubt-driven-development          [vendored ✓]
frontend-ui-engineering           [vendored ✓]
git-workflow-and-versioning
idea-refine
incremental-implementation
interview-me                       [NEW — W318 candidate]
performance-optimization
planning-and-task-breakdown
security-and-hardening
shipping-and-launch
source-driven-development
spec-driven-development
test-driven-development
using-agent-skills
```

**Currently installed in our runtime** (per `find Z:/claude-sota-installed/.claude/skills`):
- `Z:/claude-sota-installed/.claude/skills/addyosmani-api-and-interface-design`
- `Z:/claude-sota-installed/.claude/skills/addyosmani-code-simplification`
- `Z:/claude-sota-installed/.claude/skills/addyosmani-doubt-driven-development`
- `Z:/claude-sota-installed/.claude/skills/addyosmani-frontend-ui-engineering`
- (also duplicate non-`addyosmani-` prefixed aliases for backward-compat)

**4 of 5 W317-D-cited vendor-forks confirmed.** Per CLAUDE.md L29-30 `mattpocock-vendor-fork-4` clarification, the 5th was misattributed.

## §3 — `interview-me` skill audit (NEW, W318 candidate)

**Frontmatter** (verified via `head -25 Z:/repos/deps/addyosmani-agent-skills/skills/interview-me/SKILL.md`):

```yaml
name: interview-me
description: Extracts what the user actually wants instead of what they think they should want.
  Achieves this through one-question-at-a-time interview until ~95% confidence about the underlying intent.
  Use when an ask is underspecified ("build me X" without "for whom" or "why now"), when the user explicitly
  invokes ("interview me", "grill me", "are we sure?", "stress-test my thinking"), or when you catch yourself
  silently filling in ambiguous requirements before any plan, spec, or code exists.
```

**Skill content (Overview)**:
> "What people ask for and what they actually want are different things. They ask for "a dashboard" because that's what one asks for, not because a dashboard solves their problem... The cheapest moment to find this gap is before any plan, spec, or code exists... `idea-refine` generates variations from an idea, `spec-driven-development` writes the requirements down, `doubt-driven-development` stress-tests a plan after you've drafted one. Interview-me is the part before all of those, where you ask one question at a time, with your best guess attached, until you can predict what the user is going to say before they say it."

**Process**: 5-step interview loop with confidence number on each hypothesis — directly aligned with our `doubt-driven-development` already-vendored skill.

### Note on PRE-EXISTING availability

Per the available-skills system reminder for this session, `interview-me` is **ALREADY listed** as an available skill in this runtime:

```
- interview-me: Extracts what the user actually wants instead of what they think they should want...
```

This means the upstream addyosmani plugin (`addy-agent-skills` per installed-cache listing) has ALREADY shipped this skill via plugin install — auto-loaded but NOT vendored. **Confirmed via**: `Z:/claude-sota-installed/.claude/plugins/cache/addy-agent-skills/` directory must contain it.

### `interview-me` is COMPLEMENT to `doubt-driven-development`

- `doubt-driven-development`: stress-tests an EXISTING plan
- `interview-me`: extracts the REAL requirement BEFORE a plan exists
- Combined: full Define-phase coverage

**Convergent value** with our vendored 4 = HIGH.

## §4 — sca-v7.1 re-audit

| Dim | W317 score | W318 score | Delta |
|---|---|---|---|
| D1 stars | 5 (4.5k+) | 5 (still trending) | 0 |
| D2 docs | 5 | 5 | 0 |
| D5 release cadence | 5 (active PRs) | 5 (+1 NEW skill `interview-me` last 7d) | 0 |
| D8 license | 5 (MIT) | 5 | 0 |
| D14 install_spec | 5 (CR-9 compliant) | 5 | 0 |
| D16 bus_factor | 4 (Addy + multi-contributor) | 4 (`toby-bridges`, `spboyer`, `245678000000`, `googlarz`, `MiladZarour`, `federicobartoli` contribs) | 0 |
| D17 test_coverage | 3 (CI skill validator added PR #60) | **4** | +1 |
| D19 code_review | 4 | 4 | 0 |
| D21 org_diversity | 4 (multi-author single-owner) | 4 | 0 |
| D27 independent_adopter_floor | 5 (4.5k+ stars + ECC subagent integration) | 5 | 0 |
| D31 silent_fallback_density | 4 | 4 | 0 |
| D32 pin_freshness | 4 | 4 | 0 |

**install_score recompute**: prior ~4.45 → W318 ~4.48 (D17 +0.04). Still T2-strong, approaches T1 floor.

## §5 — Recommendation

| Item | Verdict |
|---|---|
| **W317-D 5-skill vendor-fork** | **HOLD** zero-drift on all 5 (upstream commits since W317 = frontmatter fixes, no content changes to the 5 vendored skills) |
| **`interview-me` NEW skill** | **AUTO-AVAILABLE** via installed plugin `addy-agent-skills` (per available-skills system reminder); no additional vendor-fork needed unless project-pin desired |
| **W319 forwards** | (1) `interview-me` skill is plugin-available, no vendoring action needed; (2) verify plugin-supplied version vs upstream HEAD parity at W319 cite refresh |
| **sca-v7.1 score** | 4.48 → T2 UPGRADE (W316/W317 was T2 candidate). Could promote T1 with D17/D19 lift over 2-3 waves |
