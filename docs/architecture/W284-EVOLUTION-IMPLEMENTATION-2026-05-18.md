# W284 — Evolution Targets Implementation Plan (2026-05-18)

> Concrete implementation plan for the 3 W283-synthesis evolution targets (Streams 2+5 convergent). Source: `Z:/claude-sota-installed/docs/architecture/W283-AUDIT-SYNTHESIS-2026-05-18.md`.

---

## Target 1 — Adoption-decision ledger (graphiti T7)

### Schema

One graphiti episode per verdict, written via `mcp__graphiti__add_memory` with `group_id="adoption-decisions"`.

```json
{
  "name": "adoption-verdict-W284-three-tier-model-assignment",
  "episode_body": {
    "candidate": "three-tier-model-assignment-per-subagent",
    "verdict": "ADOPT",
    "wave": "W284",
    "decided_at": "2026-05-18T00:00:00Z",
    "decided_by": "sota-convergence-audit + codex-stop-hook",
    "rule_version": "sca-v2",
    "sources_typed": {
      "benchmark": [
        {"source": "wshobson/agents benchmarks", "metric": "cost_reduction_pct", "value": 67, "url": "..."}
      ],
      "code_reading": [
        {"source": "anthropics/claude-code-sdk", "file": "agent-config.ts:L42-88", "finding": "..."}
      ],
      "practitioner_report": [
        {"source": "addyosmani/agent-skills", "claim": "deployed in prod, 3 months stable", "url": "..."}
      ]
    },
    "rubric_scores": {
      "capability_uniqueness": 5,
      "harness_fit": 5,
      "source_diversity": 4,
      "authority_weight": 5,
      "recency": 5,
      "benchmark_deltas": 4,
      "failure_mode_disclosure": 4,
      "score_min": 4,
      "score_mean": 4.57
    },
    "adversarial_review": {
      "security": "APPROVE",
      "architect": "APPROVE",
      "code_reviewer": "APPROVE",
      "codex_gate": "APPROVE"
    },
    "rollback_plan": "Revert per-subagent `model:` field in .claude/agents/*.md, restore default model. Test: re-run /team-spawn review, expect single-model assignments. Recovery time: <5 min.",
    "reverification_due": "2026-08-18",
    "status": "ACTIVE",
    "supersedes": null
  },
  "source": "json",
  "source_description": "W284 adoption verdict",
  "group_id": "adoption-decisions"
}
```

### Implementation steps (concrete)

1. **Document the protocol** in `.claude/skills/sota-convergence-audit/SKILL.md` step 4 (Decide): after a verdict is reached, the skill MUST emit one `mcp__graphiti__add_memory` call with `group_id="adoption-decisions"` and the schema above. NO new file/script — this is a protocol added to the existing skill.
2. **Migrate prior verdicts** (W280h, W281d, W281h, W282 ad-hoc .md files) by reading each verdict doc and emitting one graphiti episode per candidate. One-shot operator-triggered migration (skill update only; not a hook).
3. **Query pattern**: future audits invoke `mcp__graphiti__search_nodes` with `group_id="adoption-decisions"` filter to recall prior verdicts on a candidate (or its supersession chain) before re-litigating.

### Risks / open questions

- Graphiti episode size: schema above is ~1 KB JSON — well within graphiti episode limits.
- `group_id` namespace collision: confirm no existing group uses `adoption-decisions` (current groups in CLAUDE.md are unnamed/default).
- Migration backfill: ~50 historical verdicts; manual one-shot is acceptable, no automation needed.

---

## Target 2 — Typed-evidence + rubric-anchored convergence

### Proposed SKILL.md (full new text)

```markdown
---
name: sota-convergence-audit
description: Use when deciding whether to adopt an upstream repo, plugin, MCP server, or pattern into this runtime — when the operator asks "is X SOTA", "should we adopt X", "is X worth installing", "audit X for SOTA", "compare X vs the incumbent", "is X still SOTA", or otherwise asks to validate an adoption candidate before it lands. Do NOT use for creating or improving a skill (that is skill-creator territory), or for routine /loop cron re-entries where an adoption decision is already made.
---

# sota-convergence-audit (v2 — W284 typed-evidence + rubric)

Audit one adoption candidate — a repo, plugin, MCP server, or pattern — and return a
defensible **ADOPT / STUDY / REJECT** verdict before anything is installed or merged.

Sister skill to `goal-prompt-synthesis`: that skill authors a `/goal`; this skill
vets the candidates a `/goal` (or the operator) surfaces. The deliverable is a
**verdict with cited evidence and a rollback plan**, not the installation itself.

## When to use

- The operator names a repo/plugin/MCP and asks whether to adopt or install it.
- A `/goal` or an agent returns an "adopt this" recommendation that needs ratifying.
- An incumbent primitive is being compared against a proposed replacement.

Do NOT use for: authoring or editing a skill (use `skill-creator`); routine `/loop`
re-entries with no live adoption question; a single-file edit (just make the edit).

## Process (v2)

Six steps. Steps 1-3 are research and can run concurrently (parallel `Agent` forks);
steps 4-6 are serial: rubric-score, adversarial fan-out, decide+ledger.

### 1. Discover — breadth before depth

Probe **≥4 independent source families** for the candidate: official docs
(Context7, `code.claude.com/docs`), GitHub (search + file reads), DeepWiki, web
search, awesome-list catalogs, Repomix whole-repo packs. Single-source discovery
inherits GitHub popularity bias and misses alternatives. Each family returns either
a concrete finding or an explicit "nothing found" — never a silent gap.

### 2. Verify harness-fit — fit, not just quality

A candidate can be excellent and still not fit this runtime. For each, ask:
- Does it assume an interactive operator, when this runtime is an autonomous `/loop`?
- Is it Claude-Code-native / Anthropic-API, or another vendor's SDK?
- Is the capability already exposed by an installed plugin? Don't re-adopt what is installed.
- Does it require a self-invented hook or script? That conflicts with the runtime's
  cardinal rules — find the official equivalent or reject.
- Windows / PowerShell portability.

Down-rank or reject candidates that fail harness-fit even if they are SOTA elsewhere.

### 3. Converge — typed-evidence diversity (NEW — supersedes "≥3 orgs")

Before a candidate can be ADOPT, the evidence set MUST include all three TYPED categories
(not just three text claims from three orgs):

- **≥1 BENCHMARK with numbers** — a measured performance / capability delta with explicit
  metric + value (e.g., "67% cost reduction", "+18% MRR@10 vs baseline"). README claims
  without numbers do NOT count.
- **≥1 CODE READING** — a direct citation of the candidate's source code (file:line)
  demonstrating the claimed capability is actually implemented, not just promised in docs.
- **≥1 PRACTITIONER FIELD REPORT** — a named org/practitioner reporting outcome from
  running the candidate in production (issue threads, postmortems, "we shipped this and
  saw X" blog posts). Marketing claims by the candidate's own author do NOT count.

The three typed sources MUST be organizationally-distinct (≥3 different authors/orgs).
Stability requirement (unchanged): ≥3 months OR official-org maintainer + recent releases.

### 4. Score — 7-dimension 5-point rubric (NEW)

Score each dimension 1-5 (1=weakest, 5=strongest):

1. **capability_uniqueness** — Does this provide a capability nothing installed already offers?
2. **harness_fit** — Autonomous-loop · Claude-Code-native · Windows-portable · cardinal-rule-2-compliant.
3. **source_diversity** — Are typed-evidence sources (benchmark/code/field-report) organizationally-distinct AND of high authority?
4. **authority_weight** — Anthropic-canonical > documented-Anthropic-partner > known-practitioner > anonymous.
5. **recency** — Active maintenance within the last 90 days; releases ≤6 months old.
6. **benchmark_deltas** — How material is the measured win vs the incumbent (or vs no-op)?
7. **failure_mode_disclosure** — Does the candidate document its own failure modes / limitations? Hidden failure modes = score 1.

**ADOPT requires `score_min ≥ 4 AND score_mean ≥ 4.3`** (any single dimension below 4 blocks ADOPT regardless of mean).

### 5. Adversarial review — 3-persona fan-out + codex (NEW)

Before the verdict ships, dispatch a 3-persona adversarial fan-out via `superpowers:dispatching-parallel-agents`
or `/team-spawn review`:

- **security persona** — what attack surface or supply-chain risk does adoption introduce?
- **architect persona** — does it duplicate/conflict with installed primitives or violate cardinal rules?
- **code-reviewer persona** — code-quality / API-stability / abandonment-risk of the candidate.

After the three personas converge to APPROVE / REVISE / BLOCK, THEN run the codex Stop-hook
cross-model pass (W280a) as the final gate. ANY persona BLOCK or codex BLOCK = REJECT (or
STUDY if revisable).

### 6. Decide — adopt, study, reject — and ledger the verdict (NEW)

Classify, then emit one ledger episode (Target 1):

- **New capability, typed-evidence-converged, score_min ≥ 4 AND score_mean ≥ 4.3, all reviewers APPROVE, rollback plan written** -> ADOPT.
- **Duplicates an installed primitive** -> REJECT.
- **Partial overlap, or strong pattern but weak fit / rubric below threshold** -> STUDY.
- **Fails typed-evidence, fails harness-fit, unmaintained, or any reviewer BLOCK** -> REJECT.

**Mandatory rollback plan** (NEW): every ADOPT verdict MUST include a written rollback
plan — exact files to revert, expected recovery time, smoke test to confirm rollback. No
rollback plan = no ADOPT.

**Ledger write** (NEW): emit one `mcp__graphiti__add_memory` call with `group_id="adoption-decisions"`
and the W284 schema (candidate, sources_typed, codex_review, rubric_scores, rollback_plan,
reverification_due, rule_version, status=ACTIVE).

Install candidates come from the official source (the project's own plugin
marketplace, npm/PyPI, or release channel) — never from a sibling runtime's copy. Pin versions.

## Anti-patterns

- **Single-source discovery** — false negatives + popularity bias. Always ≥4 families.
- **Quality without harness-fit** — a pattern that assumes an interactive operator breaks an autonomous runtime.
- **Manufactured convergence** — evidence must precede the verdict, not be collected to justify one already chosen. One claim echoed across forks of one repo is not three sources.
- **Re-adopting an installed capability** — check installed plugins first; duplication is a reject.
- **Sibling-copy install** — adopt from the candidate's official source, not from another runtime's vendored copy.
- **Skipping the cross-model pass** — an adopt verdict ships only after the 3-persona adversarial fan-out AND an independent codex review.
- **Three-text-claim convergence** (NEW) — three README mentions = evidentially singular. Typed-evidence diversity required.
- **Stale verdict reuse** (NEW) — never cite an AGING or STALE prior ADOPT as new corroboration; re-litigate first.
- **Verdict without rollback plan** (NEW) — every ADOPT MUST have written rollback steps + smoke test + recovery time.

## References

- Official Claude Code docs — `/plugins`, `/skills`, `/sub-agents`, `/mcp` at `code.claude.com/docs`
- Skill spec — `agentskills.io/specification` (frontmatter contract)
- `superpowers` — `brainstorming` (scope the candidate), `requesting-code-review` (review gate), `dispatching-parallel-agents` (run steps 1-3 and step 5 concurrently), `verification-before-completion` (no verdict without evidence)
- `codex` plugin — cross-model (GPT-5.x) review for the final convergence / adversary pass
- `agent-teams:team-spawn` — `review` preset for the 3-persona adversarial fan-out
- `comprehensive-review` plugin — multi-dimension review as an alternative cross-check
- `goal-prompt-synthesis` skill — sister skill; it authors the `/goal`, this skill vets what the `/goal` proposes
- `graphiti` MCP — adoption-decision ledger tier (T7), `group_id="adoption-decisions"`
- W283 audit synthesis — `docs/architecture/W283-AUDIT-SYNTHESIS-2026-05-18.md` (Streams 2+5 source of these v2 amendments)
```

### Migration: how to grade past verdicts retrospectively

1. **Inventory** — enumerate prior verdicts in `docs/architecture/W280h-*.md`, `W281d-*.md`, `W281h-*.md`, W282 synthesis docs. ~50 historical verdicts expected.
2. **Retro-score** — for each verdict, fill the 7-dim rubric using existing evidence in the doc; if evidence is missing for any required dimension, tag `score_basis="retroactive_partial"`.
3. **Tag rule_version** — historical verdicts emit with `rule_version="sca-v1"` (legacy 3-source rule); new verdicts emit with `rule_version="sca-v2"` (typed-evidence + rubric).
4. **Status assignment** — verdicts in past 6 waves → `status="ACTIVE"`; older → `status="AGING"` or `STALE` per Target 3 decay rules.
5. **Reverification queue** — verdicts with `status="AGING"` get a `reverification_due` date set to wave+6.

Migration is one-shot operator-triggered, runs once after the SKILL.md amendment ships.

---

## Target 3 — Decision-decay

### State machine

```
                  +-----------------+
   wave_n ADOPT → |     ACTIVE      |  (wave 0-5 since decision)
                  +--------+--------+
                           |
              wave+6 OR rule_version_upgrade
                           |
                           v
                  +-----------------+
                  |     AGING       |  (wave 6-11 since decision)
                  |  - corroborates |
                  |    at 0.5 weight|
                  +--------+--------+
                           |
              wave+12 without reverification
                           |
                           v
                  +-----------------+
                  |     STALE       |  (wave 12+ since decision)
                  |  - DOES NOT     |
                  |    corroborate  |
                  |    new ADOPTs   |
                  +--------+--------+
                           |
                  reverification audit
                           |
                           v
                  +-----------------+
                  | RE-LITIGATED    | → back to ACTIVE (new wave_decided)
                  |    or RETIRED   | → terminal (verdict reversed)
                  +-----------------+
```

**Triggers**:
- ACTIVE → AGING: wave_n + 6 elapsed since `decided_at`, OR `rule_version` is now older than current rule version.
- AGING → STALE: wave_n + 12 elapsed without reverification audit.
- STALE → RE-LITIGATED (back to ACTIVE): manual reverification produces a fresh verdict with v2-or-current rubric.
- ANY → RETIRED: explicit reversal verdict (the candidate is found wrong / stagnant / superseded).

### Metadata fields (per graphiti episode)

| Field | Type | Purpose |
|---|---|---|
| `candidate` | string | Unique candidate identifier (repo URL or plugin name) |
| `verdict` | enum(ADOPT, STUDY, REJECT) | Original verdict |
| `wave` | string (e.g. "W284") | Decision wave |
| `decided_at` | ISO8601 | Decision timestamp |
| `rule_version` | enum(sca-v1, sca-v2, ...) | Convergence rule version applied |
| `status` | enum(ACTIVE, AGING, STALE, RE-LITIGATED, RETIRED) | Current decay state |
| `reverification_due` | ISO8601 or wave-id | When AGING transitions to STALE absent re-audit |
| `corroboration_weight` | float (1.0 / 0.5 / 0.0) | ACTIVE=1.0, AGING=0.5, STALE=0.0 — how much this verdict counts toward future convergence |
| `supersedes` | string (UUID of prior episode) or null | If this is a re-litigation, the prior episode |
| `superseded_by` | string (UUID of newer episode) or null | If a later verdict supersedes this one |
| `sources_typed` | object | Target 2 typed-evidence object |
| `rubric_scores` | object | 7-dim rubric scores + min + mean |
| `adversarial_review` | object | 3-persona + codex review outcomes |
| `rollback_plan` | string | Mandatory rollback steps for ADOPT verdicts |

### Half-life rationale

- **6-wave half-life** — A wave in this runtime is ~24-72h (W280→W281→W282→W283→W284 over ~5 days). 6 waves ≈ 1-3 weeks. SOTA velocity (model releases, plugin churn, marketplace ratings shifting) makes a 1-3-week half-life evidentially reasonable: a verdict 3 weeks old based on a now-outdated `code.claude.com/docs` revision is plausibly stale.
- **12-wave (STALE)** — ≈ 1 month. After a month, the candidate's upstream may have shipped a major change, a successor may have landed, or the harness may have evolved past the original justification. Permanent reuse without re-litigation = self-reinforcing false positive (W283 Stream 5 W6 finding, severity CRITICAL).
- **rule_version-upgrade-triggered demotion** — When the convergence rule itself evolves (sca-v1 → sca-v2 introduces typed-evidence + rubric), prior `sca-v1` verdicts automatically transition ACTIVE → AGING even if they're <6 waves old, because the standard they were graded against is no longer current.
- **0.5 corroboration weight for AGING** — partial credit prevents both extremes (binary throw-away and binary full-weight); empirically matches Bayesian-update intuition where age compounds with uncertainty.

### Implementation

- **No new infrastructure**: decay logic lives in `sota-convergence-audit/SKILL.md` as a *protocol* the skill follows when reading prior verdicts from graphiti (query, then apply weighting/filtering based on `status` and elapsed waves at read-time).
- **No background daemon needed**: status transitions can be lazy — computed at read-time from `decided_at` + current wave — OR eagerly written by a once-per-wave operator-triggered audit pass that updates `status` fields on episodes whose elapsed-wave count crosses a threshold. Lazy is simpler and avoided self-invent hook; recommended path.
- **Re-litigation re-runs the v2 process** (steps 1-6) and writes a new ledger episode with `supersedes=<prior_uuid>`; the prior episode gets `superseded_by` set on its next update.

---

## Cumulative architecture impact

After W284 lands:
- 6-tier memory → 7-tier (graphiti gains `adoption-decisions` namespace as T7).
- Convergence rule v1 → v2 (typed-evidence + rubric + adversarial fan-out + rollback + decay).
- Every ADOPT verdict produces a queryable, time-bounded, decay-aware ledger episode.
- Stale-verdict self-reinforcement (W283 Stream 5 W6 CRITICAL) becomes structurally impossible.
- Cardinal-rule invariants UNCHANGED: no new `.claude/rules/*.md`, no new `.claude/hooks/scripts/*`, no new daemons. All logic is documented protocol inside the existing `sota-convergence-audit` skill, executed by the orchestrator at audit-time.
