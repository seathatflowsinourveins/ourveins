---
name: wave-close-pipeline
description: Autonomous wave-close pipeline encoding pre-flight + self-critique + codex round + auto-commit. Use when closing a W<N> wave, when about to invoke /goal synthesis, when staging a multi-file commit that will hit the W335 Codex-Verdict trailer gate, or when the operator says "wave close", "close out W<N>", "ship the wave", "/wave-close", "wave-N closure synthesis", "final commit + push for W<N>". Closes the dominant friction pattern surfaced in /insights 2026-05-20 report (11-round codex loops, hallucinated SHA cites, /goal char overruns, concurrent-session collisions across 80-session 214h sprint). Sister skill to `task-close-discipline` (pre-ship pending-task sweep), `citations-agent` (cite-anchor enforcement), `goal-prompt-synthesis` (predicate authoring), `ops-rhythm` (P0 dwell escalation), CLAUDE.md Cardinal Rule 6 (verify-before-claim evidence discipline) enforced inline via `citations-agent`. Distinct from `task-close-discipline` (which sweeps the TaskList) and `goal-prompt-synthesis` (which authors the next predicate) — this skill is the ORCHESTRATOR that runs both as stages of one closed-loop pipeline.
---

# wave-close-pipeline (v1 — W349 P-INSIGHTS-1 codify)

> Wave: W349 P-INSIGHTS-1 ship · Date: 2026-05-20 · Lineage: closes friction patterns from /insights report 2026-05-20-220855 + W349 SYNTHESIS §3 Pareto-frontier docket + W349 STREAM-C HYBRID wave-naming verdict + Anthropic claude-cookbooks `patterns/agents/evaluator_optimizer.ipynb` generate-evaluate-loop semantics.

## §1 When to use

Triggers (binding):
- Operator runs `/wave-close` slash command
- Operator says "close out W<N>", "ship the wave", "wave-N closure synthesis", "final commit"
- Assistant is about to write a multi-file commit on a wave-branch (`w<N>-*`, `goal/W<N>-*`)
- Codex-Verdict trailer gate W335 is about to fire and the commit message lacks the trailer
- /goal predicate draft is about to be authored (≥3 streams shipped + closure synthesis pending)
- Wave dwell exceeds 3-wave / 5-wave / 8-wave per ops-rhythm thresholds

Triggers (advisory):
- Three+ codex review rounds already fired on a single wave (dwell-fatigue signal)
- Working tree has untracked W<N> audit artifacts older than 1 hour (preserve work)

## §2 Pipeline contract (5 stages)

```
STAGE-0 Pre-flight (MANDATORY)
   │
   ▼
STAGE-1 Self-critique pass
   │
   ▼
STAGE-2 Codex round-1 (cross-model adversarial)
   │  ├─ APPROVE   → STAGE-4
   │  ├─ REVISE    → absorb + re-stage → STAGE-3
   │  ├─ NEEDS-REVISION → absorb specific findings → STAGE-3
   │  └─ BLOCK     → halt + surface to operator
   ▼
STAGE-3 Codex round-2 (max, post-revision)
   │  ├─ APPROVE  → STAGE-4
   │  └─ ≠ APPROVE → operator-decision-block (bypass via CODEX_TRAILER_GATE_DISABLE=1 with rationale)
   ▼
STAGE-4 Commit with Codex-Verdict: APPROVE trailer
   │
   ▼
STAGE-5 Post-commit ritual (T6 ledger + /insights + /recap optional)
```

Time budget per pipeline: 5-15 min (P0 ship); 30-60 min if STAGE-3 fires.

Cost budget per pipeline: ≤$0.50 codex (2 rounds @ ~$0.25 each); operator may extend to N rounds with explicit rationale.

## §3 STAGE-0 — Pre-flight (MANDATORY)

```bash
# 1. Branch isolation check
git worktree list  # confirm no concurrent CC sessions on same branch
git branch --show-current  # confirm working branch matches wave label
git status --short | wc -l  # confirm working tree state is intentional

# 2. Staged state freshness check
git diff --cached --name-only | wc -l  # confirm staged set matches scope
git diff --cached --check  # confirm zero whitespace violations + EOF normalization

# 3. Citation grep-verify (closes /insights friction #2)
# For EACH specific claim in commit msg or /goal predicate:
#   - SHA pins: `git ls-remote <upstream> | grep <SHA>` OR `gh api /repos/<o>/<r>/commits/<SHA>`
#   - Line numbers: `grep -n "<text>" <file>` to confirm line still matches
#   - Percentages: re-run the measurement OR mark [UNVERIFIED]
#   - Repo names: `gh api /repos/<o>/<r> --jq .name` to confirm existence
# Any unverifiable specific MUST be marked [UNVERIFIED] in output.

# 4. Predicate length check (closes /insights friction #3)
# If authoring /goal predicate:
wc -c draft-predicate.md  # MUST be <3800 chars (200-char buffer below 4000 cap)

# 5. Concurrent-session collision check (closes /insights friction #1)
# If 2+ CC sessions concurrent on overlapping branches detected:
git worktree add Z:/claude-sota-installed-W<N>-<descriptor> w<N>-<descriptor>
cd Z:/claude-sota-installed-W<N>-<descriptor>  # ISOLATE before any edits
```

HARD GATES: any of 1-5 failing → halt pipeline + surface specific failure to operator before STAGE-1.

## §4 STAGE-1 — Self-critique pass

Per /insights "Budget for codex review rounds" suggestion: catch the common codex-flagged patterns BEFORE invoking codex. Reduces 5-round loops to 2 rounds.

Self-critique checklist (apply to draft commit message + draft predicate + draft synthesis):

```
□ Stale file references — does every cited path still exist? grep + ls verify
□ Hallucinated SHAs — does every cited SHA exist in upstream? gh api verify
□ Overstated evidence — replace "verified" / "proven" / "independently reproduced"
  with measured-language unless evidence link in same paragraph
□ Contradictions between sections — do verdict-summary + verdict-detail agree?
□ Same-org-different-surfaces — are "3 distinct anchors" actually 3 distinct ORGS
  (not 3 Anthropic surfaces stacked)?
□ TBD / TODO / placeholder remnants — drop from commit OR mark explicitly
□ Trailing whitespace + EOF normalization — `git diff --cached --check` clean
□ /goal predicate <3800 chars (W349 P-INSIGHTS-3)
□ Codex-Verdict: trailer slot reserved (will be filled in STAGE-4)
```

Sister-skill invocations:
- `citations-agent` — fires when ≥3-org-distinct floor must be re-verified
- `task-close-discipline` — fires when wave-close sweep needs to confirm 0 in_progress/pending TaskList entries
- CLAUDE.md Cardinal Rule 6 (`verify-before-claim`) — applied inline; cite-grep every "DONE" / "passes review" / "tests green" claim with file:line OR command-output evidence (no standalone skill; enforced via `citations-agent` + self-critique §4)

## §5 STAGE-2 — Codex round-1 (cross-model adversarial)

```bash
node ".claude/plugins/cache/openai-codex/codex/1.0.4/scripts/codex-companion.mjs" \
  task --effort medium \
  "<scoped prompt — see §5.1>"
```

### §5.1 Prompt template (per /insights "Verify before you cite")

```
Adversarially review this single git commit / /goal predicate / wave-close synthesis for shippability.

Context: <1-2 sentences on scope — file count, scope-tag (doc-only|skill-edit|runtime-code), wave label>

Three artifact groups: <enumerate 3 max with cite-file paths>

Constraint: this is the W<N> wave-close commit. Self-critique already ran per .claude/skills/wave-close-pipeline/SKILL.md §4 (cite-grep, SHA-verify, evidence-language, contradictions, same-org-surfaces, TBD-drops, whitespace, predicate-length).

Question: APPROVE | REVISE | NEEDS-REVISION | BLOCK?

Reply: first non-empty line = VERDICT_WORD + 1-line rationale. Findings as bullet list with severity + file:line + 1-line fix.
```

### §5.2 Verdict routing

| Verdict | Action |
|---|---|
| APPROVE | → STAGE-4 commit |
| REVISE | absorb findings inline → re-stage → STAGE-3 round-2 |
| NEEDS-REVISION | drop blocking files OR apply specific fixes → re-stage → STAGE-3 round-2 |
| BLOCK | halt + surface to operator with full codex output; do NOT auto-bypass |

### §5.3 Index-state hygiene (W349 P-INSIGHTS-1 lesson)

The codex companion writes side-effect artifacts to disk during review (`codex-r<N>-verdict.txt`, research subagent outputs). These artifacts MAY get auto-staged by other hooks. Before re-invoking codex round-2, run:

```bash
git reset HEAD                   # clear pollution
git add <explicit-file-list>     # re-stage ONLY intended files
git diff --cached --name-only    # verify staged set matches intent
```

Any codex round-N+1 invocation MUST cite the verified-staged-set count in the prompt so codex's `git diff --cached --name-status` probe agrees with the assistant's mental model.

## §6 STAGE-3 — Codex round-2 (post-revision, max)

Same prompt template as §5.1 but with:
- Explicit reference to round-1 findings: "Round-1 returned <verdict> with N findings. Fixes applied: <enumerate>"
- Re-stated staged file count after re-staging
- Same verdict routing per §5.2

If round-2 returns ≠ APPROVE:
- Option A: apply round-2 findings + round-3 (operator-extended; budget breach)
- Option B: operator-decision-block — surface findings + propose `CODEX_TRAILER_GATE_DISABLE=1` bypass with rationale + operator sign-off line
- Option C: scope-reduce commit — drop contested files + re-stage + round-1 again

Default: Option B + ask operator. Do NOT auto-bypass.

## §7 STAGE-4 — Commit with Codex-Verdict trailer

Per W349 STREAM-C HYBRID wave-naming verdict (Conventional Commits + W-wave prefix):

```
<type>(W<N> <P-ITEM>): <imperative summary ≤72 chars>

<body — explain WHY + cite refs + evidence>

Codex review: <round-1 verdict> -> <round-2 verdict if fired> -> APPROVE.
Round-1 findings: <N> absorbed.
Round-2 findings: <N> absorbed.
Final staged set: <count> files verified, <scope-tag>.

Refs: <file:line cites for in-runtime evidence>
Refs: <upstream-URL cites for external anchors>

Codex-Verdict: APPROVE
```

Type vocabulary: `feat | fix | docs | chore | refactor | perf | test | build | ci | revert | ship | wip` (per commitlint W317-D config + W349 STREAM-C disciplined-descriptor set).

## §8 STAGE-5 — Post-commit ritual

Per W349 SYNTHESIS §3 P1.x + W343 §6 future-session compliance checklist:

```
□ git push --force-with-lease (NOT --force) if pushing to remote
□ T6 basic-memory write: mcp__basic-memory__write_note with verdict-ledger row
□ VERDICT-LEDGER.md row append (per-wave docs/architecture/W<N>-*/VERDICT-LEDGER.md)
□ /insights invocation (optional — pulse-check the session if wave was long)
□ /recap invocation (optional — capture wave learnings)
□ /ctx-insight invocation (optional — context-mode savings telemetry)
□ ccusage block-cost report (optional — burn-rate check)
□ Worktree cleanup if dedicated wave-worktree used:
   cd Z:/claude-sota-installed   # back to main
   git worktree remove Z:/claude-sota-installed-W<N>-<descriptor>
   (WorktreeRemove hook auto-prunes via git worktree prune)
□ Carry-forward record: any unresolved P0/P1 → /goal predicate for W<N+1>
```

## §9 Anti-patterns (reject these explicitly)

| Anti-pattern | Why rejected | Cite |
|---|---|---|
| Skip STAGE-0 pre-flight + dive into commit | /insights friction #1 — concurrent-session collisions cause destructive resets | /insights report 2026-05-20 friction.categories[0] |
| Cite specific SHA without grep-verify | /insights friction #2 — hallucinated `52378ac at L78` incident required re-synthesis | /insights fun_ending |
| Auto-bypass codex BLOCK via `CODEX_TRAILER_GATE_DISABLE=1` without operator sign-off | CR-5 + Cardinal Rule 5 + sca-v17 §6 layered-defense | CLAUDE.md L22 + sca-v17 §6 |
| Codex round-5+ without scope-reduction | 11-round loops = waste; better to scope-reduce or operator-decide-block | /insights friction.categories[1] |
| /goal predicate ≥4000 chars | W349 P-INSIGHTS-3 hard limit | /insights claude_md_additions[2] |
| Multi-wave merge in one commit (W347 + W348 + W349 all together) | Atomic-rollback discipline; one wave per commit | /insights what_works[1] |

## §10 3-org-distinct anchors

- **Anthropic** — `claude-cookbooks @ 39a350b6` `patterns/agents/evaluator_optimizer.ipynb` (generate-evaluate-loop with PASS/FAIL termination + feedback context-injection — STAGE-1 + STAGE-2 + STAGE-3 lineage)
- **Microsoft** — `autogen @ 027ecf0a` `_base_group_chat_manager.py:165-170` `_signal_termination_with_error` (STAGE-2 BLOCK semantics) + `GroupChatManager.max_turns` (STAGE-3 round-2 cap)
- **LangChain AI** — `langgraph @ 5d341ac3` supervisor.last_message empty-route + ConditionalEdge router (STAGE-2 verdict routing per §5.2)
- **Anthropic claude-code W335** — codex-trailer-gate authoritative contract (STAGE-4 trailer requirement)
- **W349 STREAM-C** — HYBRID wave-naming verdict (STAGE-4 commit message format)
- **/insights report 2026-05-20-220855.html** — empirical friction baseline (this skill closes the dominant patterns)

## §11 Cross-references

- `.claude/skills/task-close-discipline/SKILL.md` — pre-ship pending-task sweep (run as part of STAGE-0)
- `.claude/skills/citations-agent/SKILL.md` — cite-anchor enforcement (run as part of STAGE-1)
- `.claude/skills/goal-prompt-synthesis/SKILL.md` — /goal predicate authoring (parallel pipeline that feeds STAGE-1)
- `.claude/skills/ops-rhythm/SKILL.md` — P0 dwell escalation (informs STAGE-3 escalation when round-2 ≠ APPROVE)
- CLAUDE.md L23-24 Cardinal Rule 6 (`verify-before-claim`) — enforced inline by STAGE-1 self-critique §4 (no standalone skill file; cite-anchored to OWASP A06:2021 + ISO/IEC 25010:2011 §4.2.6-4.2.7 + NIST SP 800-218 PW.7+RV.1)
- `.claude/skills/durable-planning-files/SKILL.md` — task_plan.md + findings.md + progress.md when wave spans sessions
- `docs/architecture/W349-FULL-SOTA-UNLEASH/SYNTHESIS.md` — empirical motivating evidence + Pareto-frontier docket
- `docs/architecture/W343-EXECUTE/SOTA-PARALLEL-GIT-HOOK-ARCHITECTURE.md` — 5-layer parallel-session architecture (STAGE-0 L2 worktree topology)
- `.claude/plugins/cache/openai-codex/codex/1.0.4/scripts/codex-companion.mjs` — codex GPT-5.5 invocation (STAGE-2 + STAGE-3)
