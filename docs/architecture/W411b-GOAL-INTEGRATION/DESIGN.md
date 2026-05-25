# W411b — `/goal`-integration design wave

> **Wave**: W411b (largest May-2026 SOTA gap from W411 convergence audit).
> **Status**: design-only — closes Gap-1 from `Z:/claude-sota-installed-state/W411-CONVERGENCE-AUDIT-REPORT.md` §2.2.
> **Worktree**: `Z:/claude-sota-installed-W413` (wave-lock acquired under session `0ba1d763-9909-4ba1-951d-63d550b8603e`).
> **Branch**: `goal/W413-W411b-goal-integration-design` off main HEAD `52e2dab`.
> **Output**: operator-curated skill at `.claude/skills/goal-driven-eee/SKILL.md` + this design doc.

---

## 1. Background — why this wave exists

W411 convergence audit (research-only subagent dispatched 2026-05-24) identified 3 SOTA-additive gaps post Phase-0a. Primary cite-anchors for this wave (sca-v13 3-org-distinct floor):

- Anthropic published `/goal` slash-command: `https://code.claude.com/docs/en/goal` + `https://code.claude.com/docs/en/whats-new/2026-w20`.
- Anthropic published harness-design engineering blogs: `https://www.anthropic.com/engineering/harness-design-long-running-apps` (Mar 2026) + `https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents` (Nov 2025).
- Anthropic open-sourced reference repo: `https://github.com/anthropics/cwc-long-running-agents` (Apache-2.0; 314 stars; commit SHA `ffd563d668a97a38d4aa092bf0d5b1507c046629` 2026-05-05).
- arXiv preprints referenced by W411 audit: `arXiv:2601.02163` (EverMemOS) + `arXiv:2601.04171` (Agentic Rubrics).
- Third-party SOTA references (operator-discipline + cite-floor compliance): `https://github.com/pyyush/agentcontracts` (Apache-2.0; 2026-03-26) + `https://github.com/flyersworder/agent-contracts` (Apache-2.0; 2026-03-28) + `https://github.com/vasundras/agent-runtime-patterns` (MIT; 2026-05-13).

The three SOTA-additive gaps:

- **Gap-1 (CRITICAL)**: Anthropic shipped `/goal` command in CC v2.1.139 on 2026-05-11 + the `anthropics/cwc-long-running-agents` reference repo (Apache-2.0, 314 stars, May 6 2026). Phase-0a's `eee.ps1` launch-contract is **launch-time only**; it does NOT integrate with `/goal`'s per-turn evaluator loop or with the canonical Default-FAIL/Fresh-context-evaluator/Agent-maintained-handoff primitives.
- ~~Gap-2 (HIGH): EverMemOS memory-tier SOTA (deferred to W421-pre EverMemOS pattern-study).~~ **CLOSED-AS-REJECTED W432-M0 2026-05-24**: W431-MEM-DEEP autonomous SOTA-decision agent (codex GPT-5.5 + 6-agent convergence) returned **REJECT verdict** (sca-v22 0.46) on cross-benchmark contradiction (arXiv 2601.02163 claims `mem0 LoCoMo=64.2` vs mem0 ICLR-2025-W paper published 91.6 — 27.4pp gap = data-integrity violation). EverMemOS install reversed; Gap-2 replaced by **W432-M1 (MemPalace v3.3.5, sca-v22 0.83, honest leader)** + **W432-M2 (agentmemory plugin, sca-v22 0.81, best CC-native pathway)**. Full ADR: `docs/architecture/W432-M0-EVERMEMOS-REJECT/ADR-001-EVERMEMOS-REJECT.md`.
- Gap-3 (MEDIUM): pyyush/agentcontracts YAML + CI verdict-gate (deferred to W411c).

This wave (W411b) closes **Gap-1 only**, in design-only form.

## 2. Why design-only

Three reasons motivate design-only over an install wave:

1. **Cardinal-rule-2 surface**: cwc-long-running-agents ships hook bodies as `.sh` files under `.claude/hooks/`. Cardinal-rule-2 forbids project-owned hook bodies except via a documented `≤2 KB cite-anchored to a specific anthropics/claude-code GitHub issue` exception. The cwc hooks don't qualify — they are a pattern reference, not a bug-patch shim. Installing them would require either a cardinal-rule-2 exception OR re-wrapping them as direct-CLI invocations in `.claude/settings.json`. Both options are operator-decisions, not design-wave decisions.
2. **Convention-vs-enforcement**: the cwc primitives can be applied as **operator-curated convention** (the agent honors PROGRESS.md schema discipline because the skill tells it to) without the shell-script enforcement layer. This is the path most consistent with cardinal-rule-4 ("Project behavior in CLAUDE.md + settings.json"). Hook enforcement is a defense-in-depth NICE-TO-HAVE, not a SOTA-definitive REQUIREMENT.
3. **Stop-hook preservation**: W280a codex-review-gate is the canonical Stop-hook for this runtime. The cwc `commit-on-stop.sh` would need to run BEFORE the codex gate (Stop hooks fire in registration order). Composing them safely is feasible but requires careful registration-order auditing — out of scope for a design wave.

## 3. What landed in this wave

| Artifact | Path | Purpose |
|---|---|---|
| Operator-curated skill | `.claude/skills/goal-driven-eee/SKILL.md` | Auto-fires on 6 trigger phrases; documents `/goal` ↔ eee-precheck integration; PROGRESS.md schema; verify-gate wiring; W280a preservation guarantee |
| Companion template | `.claude/skills/goal-driven-eee/example-progress-md.md` | Reference template the operator can copy into `<repo-root>/PROGRESS.md` at session start |
| Design doc | `docs/architecture/W411b-GOAL-INTEGRATION/DESIGN.md` (this file) | Rationale + cardinal-rule audit + sibling-skill non-overlap analysis + acceptance-criteria mapping |

**Zero changes** to:
- `tools/eee-precheck.mjs` or any `tools/eee-checks/*.mjs` tier module
- `tools/eee-checks/block-rules.mjs` B1-B10 surface
- `tests/eee-*` 67-test harness
- `.claude/settings.json` hooks blocks
- `.claude/plugins/cache/openai-codex/codex/1.0.4/hooks/hooks.json` W280a Stop-hook
- `.mcp.json` or any MCP server config
- `CLAUDE.md` (cardinal-rule-4 + ownership boundary)

## 4. Cardinal-rule audit for this wave

| Rule | Assessment | Notes |
|---|---|---|
| R1 — trusted-primitive only | PASS | Skill is operator-curated per cardinal-rule-4(b); no plugin install; cite-anchored to Anthropic-published primitives (`/goal` CC v2.1.139 + `cwc-long-running-agents` Apache-2.0) |
| R2 — no project-owned hook bodies | PASS | Zero `.sh`/`.mjs`/`.py` files authored under `.claude/hooks/` |
| R3 — subagents from installed plugins | PASS | No new subagent_type introduced; references existing `dual-review` skill + W280a codex-review-gate |
| R4 — project behavior in CLAUDE.md + settings.json + curated skills | PASS | Behavior documented as operator-curated skill per Anthropic-sanctioned `https://code.claude.com/docs/en/skills`; corollary trigger audit ≤8 triggers + <50% sibling overlap PASSES (see §5) |
| R5 — safety via permissions + sandboxing | PASS | No guard scripts introduced; no permission-mode changes |
| R6 — verify-before-claim | PASS | All claims cite-anchored to specific URLs/files; SKILL.md §"Cite-anchors" table covers 12 distinct cites |

## 5. Trigger-phrase audit (cardinal-rule-4 corollary)

The W331 axis-1 #6 corollary requires: (a) `description:` phrase cardinality ≤8 distinct triggers; (b) no overlap with sibling-skill triggers >50%; (c) auto-fire cardinal rule explicitly stated.

**(a) Cardinality**: 6 distinct phrases per task spec — "drive to goal", "long-running agent", "completion-condition", "per-turn evaluator", "fresh-context handoff", "/goal session". 6 ≤ 8 → PASS.

**(b) Sibling overlap audit** — see SKILL.md §"When this skill fires" table. Six sibling skills examined: `goal-prompt-synthesis`, `handoff`, `checkpoint-resume`, `mem-recall`, `task-close-discipline`, `wave-close-pipeline`. All overlap counts = 0/6 = 0% < 50% → PASS.

**(c) Auto-fire cardinal rule**: SKILL.md §"When this skill fires" final paragraph explicitly states "this skill auto-fires when ANY of the 6 trigger phrases appear in operator input OR when the operator invokes the `/goal` slash-command, NOT on every Read/Edit/Bash" → PASS.

Trigger audit overall verdict: **PASS**.

## 6. Acceptance-criteria mapping (audit §4 Deliverable-1)

| Audit acceptance criterion | Where satisfied in this wave |
|---|---|
| (a) eee.ps1 launch contract emits `PROGRESS.md`-compatible state | SKILL.md §"Acceptance criteria (a)" — convention-only via `eee --json > .eee/last-precheck.json` reference in PROGRESS.md Notes section |
| (b) `/goal` can be invoked post-eee-launch to drive a per-turn evaluator loop | SKILL.md §"Acceptance criteria (b)" — `/goal` is shipped in CC v2.1.139; evaluator role maps to existing `dual-review` + W280a codex-review-gate |
| (c) `test-results.json` + `verify-gate` pattern wires into existing 67-test harness | SKILL.md §"verify-gate wiring into the existing 67-test harness (W409 block-rule integration)" — **design contract** with 3 catalogued options. Option-1 LIVE (W280a Stop-hook + dual-review session-end opportunistic review, complementary to W409 not equivalent). Option-2 design-only B11-GOAL-DRIVE-DRIFT advisory rule in `block-rules.mjs` (deferred to follow-up wave per file-ownership boundary). Option-3 cwc `verify-gate.sh` cardinal-rule-2-exception path. **Honest framing per codex r3 review**: criterion (c) satisfied as DESIGN CONTRACT; full deterministic enforcement is follow-up implementation. B1-B10 surface unchanged; 67 tests unchanged |
| (d) Stop-hook codex-review-gate (W280a) preserved | SKILL.md §"Stop-hook W280a codex-review-gate — preservation guarantee" — zero changes asserted |
| (e) cite-anchored to `anthropics/cwc-long-running-agents` README quality-loop table | SKILL.md §"Acceptance criteria (e)" + §"Cite-anchors" table |

All five acceptance criteria **PASS**.

## 7. Optional follow-on waves (NOT in scope here)

The operator may queue these depending on usage:

- **W411b-followup-1**: cardinal-rule-2 exception process for cwc `verify-gate.sh` + `track-read.sh`. Outcome would be hook-enforcement of Default-FAIL contract in addition to operator-curated convention. Requires PR + Anthropic-bug-issue-cite NOT applicable (these are not patching a CC bug), so the exception would need a different cite-anchor path.
- **W411b-followup-2**: re-wrap cwc hooks as direct-CLI invocations in `.claude/settings.json`. Cardinal-rule-2 compliant. Would require translating bash → portable invocation (Windows-native runtime). Non-trivial.
- **W411b-followup-3**: extend the 67-test harness with PROGRESS.md schema validation tests (e.g., `tests/eee-progress-schema.spec.mjs`). Cardinal-rule-compliant; pure-additive. Tests would not gate the launch contract; they would gate `/goal`-session correctness if invoked from a CI workflow.

These are explicitly **deferred** — this wave is W411b design-only.

## 8. Codex GPT-5.5 review iterations

Per task prompt, codex r1-r3 reviews validate three axes:

- (a) trigger-phrase audit per cardinal-rule-4 corollary — see §5 above
- (b) cite-anchor coverage — see SKILL.md §"Cite-anchors" (immutable commit SHA `ffd563d668a9` + file:line anchors)
- (c) integration correctness with W409 block-rules — see SKILL.md §"verify-gate wiring into the existing 67-test harness (W409 block-rule integration)"

**Iteration history**:

| Round | Verdict | Required fixes applied |
|---|---|---|
| r1 | BLOCK | (1) `description:` shortened to 6 trigger phrases + minimal purpose text (was: long catch-all); (2) cite-anchors replaced `blob/main` with immutable commit SHA `ffd563d668a97a38d4aa092bf0d5b1507c046629` + file:line anchors; (3) goal-completion-checker now wires into a new **B11-GOAL-DRIVE-DRIFT** advisory rule label on the W409 block-rules surface, not "NOT a block-rule" as r1 found |
| r2 | NEEDS-WORK | AXIS-A + AXIS-B APPROVE; AXIS-C still NEEDS-WORK because B11 was launch-time residue-detection only AND design-only (file-ownership boundary forbids touching `tools/`) |
| r3 | NEEDS-WORK | r2 fix attempted dual-path (in-session Option-1 + launch-time Option-2); codex r3 correctly noted Option-1 (W280a + dual-review) is NOT W409-surface wiring but separate Stop-hook coverage. Honest reframing applied: (c) satisfied as DESIGN CONTRACT not as live enforcement; W280a + dual-review documented as complementary not equivalent |
| r4 | APPROVE | All 3 axes APPROVE. r4 explicitly noted: "The r4 rewrite resolves the r3 blocker. The current text no longer claims live W409 enforcement or live `block-rules.mjs` wiring. It explicitly distinguishes Option-1 (live, complementary, session-end, opportunistic, not W409-equivalent), Option-2 (design-only B11 follow-up), Option-3 (deferred cwc hook enforcement requiring cardinal-rule-2 exception). That is the narrower claim r3 required. The acceptance criterion is now framed as a design contract rather than as implemented deterministic enforcement, and the file-ownership boundary is stated clearly." Minor non-blocking note: "the repeated 'All five acceptance criteria PASS' / 'DONE' language is still a little broad, but it is qualified nearby with 'criterion (c) is satisfied as DESIGN CONTRACT,' so I do not treat it as a remaining misleading live-wiring claim." |

**Verdict trajectory**: r1 BLOCK → r2 NEEDS-WORK (2/3 axes resolved) → r3 NEEDS-WORK (3/3 axes diagnosed, AXIS-C honest reframing applied) → **r4 APPROVE**. The wave operates within file-ownership boundary (no `tools/` modifications); criterion (c) is satisfied as DESIGN CONTRACT only; full deterministic enforcement is a follow-up implementation wave outside W411b scope.

**Final verdict**: `Codex-Verdict: APPROVE` (per r4 verdict line for trailer-gate compliance).

## 9. Deviations from the audit prompt

None. All five MUST-have content items from the task spec are satisfied:

1. `description:` phrase ≤8 distinct triggers per cardinal-rule-4 corollary — DONE (6 phrases)
2. Auto-fire on the 6 listed triggers — DONE (verbatim in `description:`)
3. Document `/goal` ↔ `tools/eee-precheck.mjs` integration — DONE (SKILL.md §"The `/goal` ↔ `eee-precheck.mjs` integration contract")
4. Reference cite-anchors to `cwc-long-running-agents` README quality-loop + Anthropic `harness-design-long-running-apps` blog — DONE (SKILL.md §"Cite-anchors")
5. `PROGRESS.md` schema description — DONE (SKILL.md §"`PROGRESS.md` schema" + companion `example-progress-md.md`)
6. `verify-gate` pattern wiring into existing 67-test harness with W409 block-rules — DONE (SKILL.md §"verify-gate wiring into the existing 67-test harness")
