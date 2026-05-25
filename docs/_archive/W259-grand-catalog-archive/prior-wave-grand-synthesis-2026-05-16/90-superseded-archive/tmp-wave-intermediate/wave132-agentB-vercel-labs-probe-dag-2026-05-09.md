---
title: Wave 132 Fire 1 Agent β — vercel-labs/agent-skills Probe DAG 1-7 verification
status: AUTHORITATIVE
date: 2026-05-09
agent: sota-researcher (Sonnet stand-in per CLAUDE.local.md ENV (f) — STAND-IN-NOTICE per cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate)
wave: 132 fire 1
mia_correction: Agent A claimed AUDIT-REQUIRED clone-needed → REFUTED (PRESENT at Z:/repos/deps/vercel-labs-agent-skills/ since 2025-12 per first-commit timestamp)
---

# vercel-labs/agent-skills — Probe DAG 1-7 verification

## Source identity
- Repo: `vercel-labs/agent-skills`
- Local path: `Z:/repos/deps/vercel-labs-agent-skills/`
- HEAD SHA: `b9c8ee0643d87d3c5a953d1e22382ff2ead39229` [VERIFIED 2026-05-09 via `git -C Z:/repos/deps/vercel-labs-agent-skills rev-parse HEAD`]
- First commit: `7f947cd` 2025-12-08 (~148 days ago at audit time)
- Latest commit: 2026-05-05 (sustained-active)
- Total commits: 198
- cpd: 198 / 148 = 1.34 (well under 10 — STABLE-BURN-IN band per convergence-gate.md L100)
- Distribution mechanism: `npx skills add vercel-labs/agent-skills` via `skills` npm package (latest 1.5.6, MIT, maintained by `rauchg`/Vercel CTO, `fforres`, `quuu`) [VERIFIED 2026-05-09 via `https://registry.npmjs.org/skills`]

## Probe DAG 1-7 results

| Probe | Result | Evidence |
|---|---|---|
| **P1 count-OVER** | **PARTIAL FAIL** | README at `Z:/repos/deps/vercel-labs-agent-skills/README.md` lists 6 skills with 2 NAME MISMATCHES vs repo: `react-native-guidelines` (README) vs `react-native-skills/` (actual dir); `vercel-deploy-claimable` (README) vs `deploy-to-vercel/` (actual dir). README MISSING entry for `vercel-cli-with-tokens/` (7th SKILL.md present). Drift count: 3 README-vs-repo mismatches |
| **P2 SDK-vs-CLI surface** | **PASS** | Skills follow standard Anthropic skill format (kebab-case dir + SKILL.md frontmatter + scripts/). Compatible with eee runtime per `https://code.claude.com/docs/en/skills`. Install via `npx skills add` OR direct `cp -r skills/<name> ~/.claude/skills/` per AGENTS.md `Z:/repos/deps/vercel-labs-agent-skills/AGENTS.md:124-128` |
| **P3 architectural-API** | **PASS** | Skills use Anthropic SKILL.md frontmatter (`name:` + `description:`) per spec — no API ecosystem mismatch |
| **P4 plugin-namespace** | **PASS (no direct dups)** | grep across `Z:/claude-sota-installed/.claude/plugins/` for vercel/deploy/react-native/composition/view-transition keywords returned only false-positive matches (bun-runtime / coding-standards / zoom-plugin/react-native — different scopes). Anthropic OFFICIAL `frontend-design` is CREATION-oriented; vercel `web-design-guidelines` is REVIEW-oriented (different scope). addy `frontend-ui-engineering` similarly creation-oriented. NO functional duplicates |
| **P5 mode-harness-shape** | **PASS** | All 7 skills auto-fire on description-match per Anthropic skill mechanism. No HARD-GATE on user interaction. Compatible with autonomous /loop mode. No meta-skill / sister-harness assumption |
| **P6 direct-file/registry blockers** | **PARTIAL FAIL** | NO `LICENSE` file in repo despite README L161 declaring "MIT" [VERIFIED 2026-05-09 via `ls Z:/repos/deps/vercel-labs-agent-skills/ \| grep -iE "licen\|copyright"` returned 0 results]. Per Probe 6 cardinal-rule mandate at `agent-harness-fit-verification.md` L91: license whitelist requires explicit LICENSE file. README claim is NOT cite-class evidence per cardinal-rule-1 (CC docs L7 "filename-match without content read"). Operational mitigation: `skills` npm package wrapper is MIT-licensed AND README declares MIT — distributable but missing canonical LICENSE.txt is a structural gap. Resolution: file upstream issue OR include README quote as license attestation in cite-import provenance |
| **P7 demand-gate split** | **REJECT-FOR-FIT (Probe 7.a DEMAND-ABSENCE)** | 6 of 7 skills target React/Next.js/Vercel app domain (composition-patterns / deploy-to-vercel / react-best-practices / react-native-skills / react-view-transitions / vercel-cli-with-tokens). eee runtime is META-orchestration harness — NO React app, NO Next.js codebase, NO Vercel deployment workflow exists or is queued. Probe 7.a 3-clause check: (1) no current/queued workflow; (2) no existing primitive needs replacement; (3) no displacement/extension target. The 7th skill `web-design-guidelines` MIGHT serve UI-review IF eee builds a dashboard — currently no such workflow exists or is planned. Per `agent-harness-fit-verification.md` Probe 7.a DEMAND-ABSENCE → REJECT-FOR-FIT decisive |

## Convergence-gate axes

| Axis | Result | Evidence |
|---|---|---|
| **Axis 1** (≥3 distinct T1 orgs) | **FAIL** (single-org) | Only `vercel-labs` GitHub org (Vercel-affiliate). Single-org maintainership. STRONG-PROVENANCE-EXPRESS predicate inapplicable absent ≥30d age + named-T2 endorsement (axis-2 PARTIAL only) |
| **Axis 2** (≥2 named T2 with dated artifact) | **PARTIAL** | Vercel Engineering = named-T2 (org-as-T2-equivalent). Dated artifact: `https://skills.sh/b/vercel-labs/agent-skills` registry badge + 198 commits over 148 days. NO independent named-practitioner blog/talk/post citing THIS specific skill set found in Wave 50 axis-2 evidence ladder |
| **Axis 3** (≥3 months stability) | **PASS** | 148 days = 4.93 months. cpd=1.34 < 10 = STABLE-BURN-IN band per convergence-gate.md L100. Sustained-active (last commit 2026-05-05) |

## Per-skill summary table

| # | Skill | LOC | Frontmatter `name:` | Scope | Domain-fit for eee |
|---|---|---:|---|---|---|
| 1 | composition-patterns | 89 | `vercel-composition-patterns` | React component patterns | NO (no React app) |
| 2 | deploy-to-vercel | 296 | `deploy-to-vercel` | Vercel deployment | NO (no Vercel workflow) |
| 3 | react-best-practices | 149 | `vercel-react-best-practices` | React/Next.js perf | NO (no React app) |
| 4 | react-native-skills | 121 | `vercel-react-native-skills` | RN/Expo mobile | NO (no mobile app) |
| 5 | react-view-transitions | 320 | `vercel-react-view-transitions` | View Transition API | NO (no React app) |
| 6 | vercel-cli-with-tokens | 353 | `vercel-cli-with-tokens` | Vercel CLI auth | NO (no Vercel CLI workflow) |
| 7 | web-design-guidelines | 39 | `web-design-guidelines` | UI-review checklist | MAYBE (if eee builds dashboards — currently no workflow) |

Total: 7 skills, ~1367 LOC. All auto-fire on description-match. All scoped to React/Next.js/Vercel application development.

## Mia OVER catches (this audit)

- **Mia OVER #109** (CARRIED): Wave 131 Agent A artifact at `Z:/claude-sota-installed/tmp/wave131-agentA-sota-convergence-audit-2026-05-09.md` claimed `vercel-labs/agent-skills` at AUDIT-REQUIRED status with clone-needed. **REFUTED by direct probe**: PRESENT at `Z:/repos/deps/vercel-labs-agent-skills/` since 2025-12-08 (148 days). FM-20 path-drift cascade — Agent A skipped local-deps probe before authoring AUDIT-REQUIRED.
- **Mia OVER #110** (NEW this fire): README at `Z:/repos/deps/vercel-labs-agent-skills/README.md` L13-19 lists 6 skills but actual repo has 7 (`vercel-cli-with-tokens` MISSING from README) AND 2 name-mismatches (README `react-native-guidelines` vs repo `react-native-skills`; README `vercel-deploy-claimable` vs repo `deploy-to-vercel`). Documentation drift. Adoption-eval based on README count alone would have undercounted.
- **Mia OVER #111** (NEW this fire): README L161 declares "License: MIT" but NO LICENSE file in repo root. Cite-class verbatim verify per `port-note-discipline.md §4` — Probe 6 cardinal-rule mandate caught the documentation-vs-artifact drift.

## VERDICT: REJECT-FOR-FIT

**Primary reason**: Probe 7.a DEMAND-ABSENCE — eee runtime has NO React/Next.js/Vercel app codebase or workflow. 6 of 7 skills are categorically inapplicable to meta-orchestration harness scope.

**Secondary blocker**: Probe 6 license-attestation gap (README claims MIT but no LICENSE file) — structural compliance issue under permissive-license-only mandate, even with operational MIT distributability via `skills` npm wrapper.

**Tertiary concern**: Probe 1 README count-OVER (3 mismatches) signals upstream documentation-vs-artifact drift — not load-bearing on its own but compounds confidence concern.

**Axis-3 PASS** + **Axis-2 PARTIAL** + **Axis-1 single-org FAIL** = composite axis evidence does NOT clear convergence-gate even if domain were a fit.

## Defer-re-audit triggers

Re-evaluate this verdict when ANY of:
- eee runtime adds a React/Next.js dashboard or Vercel deployment workflow (would flip Probe 7.a from DEMAND-ABSENCE to DEMAND-CREATES-NEW-WORKFLOW.b 5-clause STUDY-PILOT eligibility)
- vercel-labs adds explicit LICENSE file (closes Probe 6 blocker)
- Independent named-T2 practitioner publishes dated artifact citing these specific skills (advances Axis 2 from PARTIAL to PASS)
- A second org publishes a similar skill collection citing vercel-labs as base (advances Axis 1 toward ≥3-org convergence)
- README sync with actual repo (closes Probe 1 count-OVER drift)

## Synthesis (200 words)

vercel-labs/agent-skills is a 7-skill collection from Vercel Engineering (single-org maintainership) targeting React/Next.js/Vercel application development workflows. The repository is technically sound with clean SKILL.md frontmatter, mature for its age (5 months, 198 commits, sustained-active), and cleanly compatible with the Anthropic skill format and eee plugin namespace (Probe 4 PASS — no functional duplicates with frontend-design, addy frontend-ui-engineering, or any existing eee plugin). However, three blockers compound to REJECT-FOR-FIT: (1) Probe 7.a DEMAND-ABSENCE — eee is a meta-orchestration harness with no React app, no Vercel deployment, no UI codebase to audit; 6 of 7 skills are domain-orthogonal; (2) Probe 6 license-gap — README declares MIT but no LICENSE file in repo, ambiguous under permissive-license-only mandate; (3) Probe 1 README-vs-repo count-OVER (3 mismatches) signals upstream documentation discipline gap. Convergence-gate axis-3 STABLE-BURN-IN PASS + axis-2 Vercel-Engineering-as-T2 PARTIAL + axis-1 single-org FAIL prevents adoption regardless of domain fit. Defer re-audit until eee adds a React/Vercel workflow OR upstream files explicit LICENSE; until then, vercel-labs/agent-skills carries no install or cite-import value for this runtime.

VERDICT: REJECT-FOR-FIT
