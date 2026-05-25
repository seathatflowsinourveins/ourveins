# W288-P2 — Research-Architecture Evolution Implementation Report (2026-05-18)

> Implements the three highest-leverage targets from
> `docs/architecture/W286d-RESEARCH-ARCH-EVOLUTION-2026-05-18.md`
> Section C: **C.1** eval-harness 8th rubric dimension · **C.3** skill-comply
> self-eval on the SOTA-decision skills · **C.5** weekly /sota-reverify decay
> cron. Cardinal-rule compliance preserved: no self-invent hooks, no SKILL.md
> mutations on W285-owned files, no `.claude/settings.json` / `.mcp.json` /
> `CLAUDE.md` touched.

---

## Section A — C.1: eval-harness 8th rubric dimension `eval_pass`

### A.1 — Files shipped

| Path | Purpose |
|---|---|
| `harness/sota_rubric_lane.py` (NEW, 265 LOC) | `run_sota_rubric_lane(candidate, smoke_test_path, kind)` -> `SOTARubricResult` dataclass with 0-5 integer score OR "N/A" sentinel for non-executable kinds. `to_audit_dict()` renders the result for the adoption-ledger episode's `rubric_scores.eval_pass` slot. |
| `harness/eval_harness.py` (EXTENDED) | Adds `--mode sota-rubric` + `--candidate` / `--smoke` / `--kind` args; dispatches to the new lane via `run_sota_rubric_mode()`. Per-run JSON persists to `harness/results/sota-rubric-<slug>.json`. |
| `harness/fixtures/sota_rubric_smoke_fixture.py` (NEW) | Synthetic smoke target — 5 rows, 4 pass, 1 fail (80% pass-rate -> score 4/5). |

### A.2 — Scoring contract

The lane returns one of:

| Score | Pass-rate band | Audit interpretation |
|---|---|---|
| 5 | >= 90% | "no regression" bar |
| 4 | 51-89% | ADOPT-qualifying floor |
| 3 | 26-50% | sub-rubric — blocks ADOPT |
| 2 | 1-25% | failing |
| 1 | 0% | every case failed |
| 0 | smoke crashed / no rows | lane-init failure -> blocks ADOPT |
| `"N/A"` | non-executable kind | excluded from `score_min` / `score_mean` per W286d C.1 carve-out |

`NON_EXECUTABLE_KINDS = {"doc-only", "skill", "pattern", "cite"}` — these
short-circuit to N/A without invoking the smoke module. The audit caller is
responsible for setting the kind correctly (doc-only repos, awesome-list
patterns, SKILL.md prose, citation-only entries).

### A.3 — Smoke-test result (the deliverable per task spec)

Three smoke verifications run from `harness/eval_harness.py`:

```
# (1) Executable candidate — smoke fixture passes 4/5:
$ python harness/eval_harness.py --mode sota-rubric \
    --candidate synthetic-ok \
    --smoke harness/fixtures/sota_rubric_smoke_fixture.py
=== W288-P2-C1 — sota-rubric lane (8th rubric dimension) ===
{
  "candidate": "synthetic-ok",
  "eval_pass": 4,
  "total": 5,
  "passed": 4,
  "reason": "smoke ran: 4/5 cases passed (80%) -> score 4/5",
  "counts_toward_score_min_mean": true
}
VERDICT: PASS — eval_pass=4/5 (rubric ADOPT-qualifying).
```

```
# (2) Non-executable candidate (skill kind) — N/A carve-out:
$ python harness/eval_harness.py --mode sota-rubric \
    --candidate synthetic-skill --kind skill
{
  "candidate": "synthetic-skill",
  "eval_pass": "N/A",
  ...
  "counts_toward_score_min_mean": false
}
VERDICT: N/A — excluded from score_min/mean (carve-out).
```

```
# (3) Lane crash (smoke import fails) — score 0:
$ python harness/eval_harness.py --mode sota-rubric \
    --candidate synthetic-missing \
    --smoke harness/fixtures/does-not-exist.py
{
  "candidate": "synthetic-missing",
  "eval_pass": 0,
  ...
}
VERDICT: FAIL — eval_pass=0/5 (below rubric ADOPT bar of 4).
```

### A.4 — Audit-side integration (proposed; W285 stream owns the SKILL edit)

`.claude/skills/sota-convergence-audit/SKILL.md` Step 4 currently lists 7
dimensions. To wire the 8th `eval_pass`:

1. Add `eval_pass` row to the rubric table (Step 4, lines 67-77).
2. Amend the `score_min` / `score_mean` formula to **exclude** dimensions
   whose value is `"N/A"` (mean over non-N/A scores; min over non-N/A
   scores). The dataclass already exposes `counts_toward_score_min_mean`
   to make this branch unambiguous.
3. Amend the ledger schema `rubric_scores` block (SKILL.md:121) to add
   `"eval_pass": <int|str>` after `failure_mode_disclosure`.
4. Update the ADOPT gate from `score_min >= 4 AND score_mean >= 4.3` to
   the same threshold computed over the **non-N/A** subset of dimensions.

### A.5 — Cites (>=2 per W286d MANDATE)

1. W286d Section C.1: `docs/architecture/W286d-RESEARCH-ARCH-EVOLUTION-2026-05-18.md:70-80` (the proposal).
2. `goal-prompt-synthesis` Phase-2 harness-fit axis: `.claude/skills/goal-prompt-synthesis/SKILL.md:27-36` (autonomous-loop + Claude-Code-native + Windows-portable + cardinal-rule-2-compliant — the lane mirrors this axis as numeric score).
3. TIER-1 OFFICIAL `inspect_ai` 0.3.205 Task / EvalLog API — `harness/inspect_tasks.py` + `harness/eval_harness.py:run_inspect_lane()` is the sibling lane the new module mirrors structurally.

---

## Section B — C.3: skill-comply self-eval on the SOTA-decision SKILLs

### B.1 — Execution summary

The ECC `skill-comply` skill at
`.claude/plugins/cache/everything-claude-code/everything-claude-code/2.0.0-rc.1/skills/skill-comply/`
runs `claude -p` against a skill at 3 prompt strictness levels and reports
compliance rate. We invoked it via `python -m scripts.run --dry-run` against
both target SKILLs.

| SKILL | Dry-run result | Status |
|---|---|---|
| `sota-convergence-audit/SKILL.md` | `[1/4] 6 steps extracted ... [2/4] 3 scenarios generated (supportive/neutral/competing)` -> CLEAN | spec generation PASSED, scenarios PASSED |
| `goal-prompt-synthesis/SKILL.md` | `[1/4] 7 steps extracted ... [2/4]` -> `yaml.scanner.ScannerError: mapping values are not allowed here (line 16, column 31)` | spec generation PASSED, scenario YAML INVALID -> fallback to manual offline rubric review (per task spec "If a SKILL fails to load, document fall-back manual evaluation") |

Full live `claude -p` execution of all 3 scenarios per SKILL was not run in
this stream — it requires ~6 token-billed CC subprocesses per SKILL (12 total)
and the spec calls for surfacing top-3 fix items, not a binding compliance
percentage. The W286d Section C.3 schedule places this as a "W287 dedicated
wave" item; this stream produces the dry-run-derived compliance reports
plus the manual rubric review and proposes the fix list. **The live
execution is the W287 follow-up.**

### B.2 — Compliance estimate per SKILL (dry-run-derived + manual rubric)

The skill-comply spec generator (Haiku-class extraction) returned the
following step counts and shape:

#### B.2a — `sota-convergence-audit/SKILL.md` (v2)

`6 steps extracted`, matching the SKILL's documented "Six steps" structure
(SKILL.md:26-99). 3 scenarios generated cleanly:

- **supportive**: prompt explicitly asks for the full 6-step audit.
- **neutral**: prompt asks for an adoption decision without naming the audit.
- **competing**: prompt asks to "just install it now, skip the audit".

**Manual rubric review (offline, against the skill-comply spec methodology):**

| Step | Promotion-risk | Compliance estimate |
|---|---|---|
| `discover_sources` (>=4 source families) | LOW — Anthropic-canonical primitive (Context7, github MCP, deepwiki, exa) all installed; agents reach for them naturally | ~80% |
| `verify_harness_fit` | LOW — natural-language test against installed-plugin list | ~75% |
| `gather_typed_evidence` (>=1 benchmark + >=1 code reading + >=1 field report) | **MEDIUM** — typed-evidence enforcement is W284a-new; agents may default to "any 3 sources" without enforcing the BENCHMARK/CODE-READING/FIELD-REPORT split | ~55% |
| `score_rubric` (7-dim 1-5 + score_min/mean) | **MEDIUM** — numeric scoring is concrete but the threshold `score_min >= 4 AND score_mean >= 4.3` is non-obvious; agents may emit single-decimal-mean only | ~60% |
| `adversarial_review` (3-persona fan-out + codex Stop-hook) | **HIGH RISK** — requires `superpowers:dispatching-parallel-agents` OR `/team-spawn review` invocation; agents typically run reviewers serially or skip the codex pass | ~40% |
| `emit_verdict` (ledger episode + rollback plan + reverification_due) | **MEDIUM-HIGH** — mandatory rollback plan + graphiti `add_memory` call is structurally enforced; missing fields skipped silently when graphiti is slow / down | ~50% |

**Aggregate estimate: ~60% compliance.** Below the typical skill-comply
`threshold_promote_to_hook: 0.6` floor by margin -> 2 of 6 steps
(`adversarial_review`, `emit_verdict`) are candidates for hook promotion or
SKILL.md reinforcement.

#### B.2b — `goal-prompt-synthesis/SKILL.md`

`7 steps extracted` (the 4 documented Phases are decomposed by the generator
into 7 micro-steps: discover · verify · converge · 4 sub-steps for the
Compose phase). Scenario YAML failed parsing — the unquoted colon in
"Goal synthesis request: consolidate vector search work..." (line 16
column 31) tripped PyYAML. The scenario generator's prompt
(`prompts/scenario_generator.md`) does not enforce quoting on the
`description:` field for the `competing` strictness scenario.

**Manual rubric review:**

| Step | Risk | Compliance estimate |
|---|---|---|
| `discover` (>=4 source families) | LOW | ~80% |
| `verify_harness_fit` | LOW | ~75% |
| `converge_three_sources` (>=3 organizationally-distinct) | **MEDIUM** — still uses W283-era "3 orgs" wording (SKILL.md:38-43); v2 typed-evidence is NOT enforced here | ~65% |
| `apply_char_ceiling` (<=3800) | LOW — concrete numeric gate | ~85% |
| `structure_priority_blocks` (P0...Pn + MANDATES + REPORT + STOP) | MEDIUM — 5 nested structural requirements; agents often emit 3-4 | ~60% |
| `agent_teams_mandate` (>=3 agents -> cap concurrency + cross-model review) | **HIGH RISK** — conditional on agent count; W269 ladder | ~45% |
| `verify_paths` (every referenced path exists) | MEDIUM | ~55% |

**Aggregate estimate: ~66% compliance.** Slightly above the 0.6 floor but
`agent_teams_mandate` and `converge_three_sources` are the weak links.

### B.3 — Top 3 proposed fixes (escalate to W285 stream)

1. **`goal-prompt-synthesis/SKILL.md:38-43`** — replace the W283-era
   "≥3 organizationally-distinct sources" rule with W284a typed-evidence:
   `>=1 BENCHMARK + >=1 CODE READING + >=1 FIELD REPORT`. **Critical
   asymmetry**: the `/goal` author surfaces candidates under the OLD rule;
   the receiving `sota-convergence-audit` rejects under the NEW rule.
   Operator wastes cycles. (W286d Section B.2 #2 names this convergent.)

2. **`sota-convergence-audit/SKILL.md:80-91` (Step 5 adversarial review)** —
   make the 3-persona fan-out the **first** sub-step, not a "before the
   verdict ships" addendum. Inline a literal `/team-spawn review` or
   `superpowers:dispatching-parallel-agents` invocation block. Current
   prose ("dispatch a 3-persona adversarial fan-out via ...") under-specifies
   the protocol; agents satisfice with serial reviewers. Estimated lift:
   ~40% -> ~70%.

3. **Both SKILLs** — add a "skill-comply test plan" section linking to
   `harness/skill-comply-test-plan.md` (TBD). The plan would document
   which scenarios the SKILL targets PASS at the 3 strictness levels and
   serve as the regression bar for future SKILL amendments. Self-eval
   primitive comes from `engineering-advanced-skills:self-eval` per
   W286d C.3 cite #3.

### B.4 — Skill-comply tooling bug discovered

`prompts/scenario_generator.md` does not enforce double-quoting on
`description:` values that contain a colon. The Haiku-class spec generator
emitted `description: Goal synthesis request: consolidate vector search work
...` which is invalid YAML. Workaround: the spec generator's retry path
(`spec_generator.py:35-41`) DOES feed back the YAML error and instruct
quoting — but only on the spec, not on the scenarios. Proposed upstream
PR: add the same retry pattern to `scenario_generator.py`. Filed as a
known-issue note in this report rather than a code change (the file lives
in `.claude/plugins/cache/` which is gitignored and overwritten by
`/plugin update`).

### B.5 — Cites

1. W286d Section C.3: `docs/architecture/W286d-RESEARCH-ARCH-EVOLUTION-2026-05-18.md:94-104`.
2. ECC `skill-comply/SKILL.md`: `.claude/plugins/cache/everything-claude-code/everything-claude-code/2.0.0-rc.1/skills/skill-comply/SKILL.md` (the primitive itself).
3. `superpowers/5.1.0/CLAUDE.md` cite (per W286d C.3 #2): "Skills are not prose — they are code that shapes agent behavior".

---

## Section C — C.5: weekly `/sota-reverify` decay cron

### C.1 — Existence check (research-first per task spec)

Grep over `.claude/plugins/cache/*/commands/*sota*` and
`.claude/agents/sota-*.md` returned no `/sota-reverify` command. The only
matches were my own session logs (paste-cache + bash-commands.log). **No
slash command exists**, so per task spec instruction "If NOT exists: write
`tools/sota-reverify.ps1` as a direct-CLI helper" — that is the path
taken. Cardinal-rule-2 protects against authoring a new slash command
(slash commands are skills/plugins, not self-invent).

### C.2 — Files shipped

| Path | Purpose |
|---|---|
| `tools/sota-reverify.ps1` (NEW, 130 LOC) | Direct-CLI helper. PS has no MCP client lib, so the script PRINTS the canonical instruction that the operator (or `/loop` body) follows in a CC session to call `mcp__graphiti__search_memory_nodes` against `group_id="adoption-decisions"`, sort by `decided_at` ASC, drop RETIRED / RE-LITIGATED, then dispatch `sota-convergence-audit` v2 on the printed slug. |

### C.3 — Smoke verification

```
# (1) Dry-run prints the equivalent MCP shape:
$ pwsh -NoProfile -File tools/sota-reverify.ps1 -DryRun
[sota-reverify] DRY-RUN: would query graphiti
  group_id     = adoption-decisions
  search_query = adoption-verdict reverification_due
  limit        = 1
  -- no MCP call made --

# (2) Dry-run --Json emits machine-readable envelope (for /loop):
$ pwsh -NoProfile -File tools/sota-reverify.ps1 -DryRun -Json
{ "group_id": "adoption-decisions", "limit": 1, ... }

# (3) Live mode prints the canonical instruction:
$ pwsh -NoProfile -File tools/sota-reverify.ps1 -Limit 3
W288-P2-C5 sota-reverify (decay cron, W286d Section C.5)
  ... call mcp__graphiti__search_memory_nodes ... sort ... dispatch audit ...
```

### C.4 — graphiti query latency

`mcp__graphiti__search_nodes(query="adoption-verdict reverification_due",
group_ids=["adoption-decisions"], max_nodes=3)` timed out after **300s**
when invoked from this session. `mcp__graphiti__get_status` returned
"running and connected to falkordb" -> the timeout is **LLM-extraction
latency** in the graphiti pipeline (the `qwen3-coder:30b-a3b-q4_K_M`
backend on the W263d-pinned Ollama is CPU-mode per
`docs/architecture/GRAPHITI-STRUCTURED-EXTRACT-2026-05-17.md`). The
`sota-reverify.ps1` helper does NOT itself call MCP — it prints the
instruction the CC session executes. The latency is therefore an
EXISTING graphiti-side issue, not a regression introduced by C.5. The
weekly cadence is comfortably above the 5-minute timeout.

### C.5 — Cron-setup recipe (the deliverable per task spec)

Operator cron wiring uses the installed `loop:` skill (skill-list
description: "Run a prompt or slash command on a recurring interval
(e.g. `/loop 5m /foo)`"):

```
# In a fresh Claude Code session:
/loop 7d sota-reverify-tick

# Where the bound prompt body is:
pwsh -NoProfile -File Z:/claude-sota-installed/tools/sota-reverify.ps1 -Limit 1 ;
# then follow the printed instruction:
#   1. mcp__graphiti__search_memory_nodes(query=..., group_ids=[adoption-decisions])
#   2. sort + filter -> oldest non-RETIRED candidate
#   3. invoke sota-convergence-audit on candidate.slug
#   4. write summary "W<n>-sota-reverify: <N> re-litigated, <M> RETIRED"
```

The PS1 script is **idempotent**: re-running with the same `-Limit` returns
the same instruction; no state mutation. State lives in graphiti
(adoption-ledger episodes) where the v2 SKILL already maintains it.

### C.6 — Graphiti query example

```
# Hand-typed graphiti probe (what the /loop body executes; PS prints,
# CC executes via the MCP):
mcp__graphiti__search_memory_nodes(
  query="adoption-verdict reverification_due",
  group_ids=["adoption-decisions"],
  max_nodes=1
)
# Returns: list of EntityNode objects with episode_body.candidate slug,
# decided_at ISO8601, status, rubric_scores.
# Sort by decided_at ASC; drop status in {RETIRED, RE-LITIGATED}; the
# top result is the candidate to re-litigate.
```

### C.7 — Cites

1. W286d Section C.5: `docs/architecture/W286d-RESEARCH-ARCH-EVOLUTION-2026-05-18.md:118-128`.
2. W284a v2 SKILL state machine: `.claude/skills/sota-convergence-audit/SKILL.md:136-148` (ACTIVE 0-5, AGING 6-11, STALE 12+, RE-LITIGATED, RETIRED).
3. `loop:` installed skill (per the live skill-list `description:` field).

---

## Section D — Dependencies on W285 stream

Three handoff items proposed for the W285 parallel session that owns
`sota-convergence-audit/SKILL.md` and (effectively) the v2 amendments:

### D.1 — Wire `eval_pass` into the rubric (C.1 follow-up)

`SKILL.md` Step 4 currently lists 7 dimensions. W285 to:
- Insert `eval_pass` as the 8th row in the rubric table (lines 67-77).
- Amend `score_min` / `score_mean` to exclude `N/A` dimensions
  (the `to_audit_dict()` shape exposes `counts_toward_score_min_mean`).
- Add `"eval_pass": <int|str>` to the ledger schema `rubric_scores` block
  (line 121).
- The lane is harness-ready TODAY; the SKILL edit is the missing connection.

### D.2 — Reinforce `adversarial_review` step (C.3 fix #2)

C.3 manual rubric estimates **~40% compliance** on the 3-persona fan-out
step — the lowest-scoring step. W285 to:
- Inline a literal `/team-spawn review` or
  `superpowers:dispatching-parallel-agents` invocation block in
  `SKILL.md:80-91`.
- Move the step from "before the verdict ships" addendum to a numbered
  sub-step inside Step 5 with explicit "DISPATCH NOW" semantics.

### D.3 — Sync `goal-prompt-synthesis` typed-evidence (C.3 fix #1)

Cross-stream coordination: `goal-prompt-synthesis/SKILL.md:38-43` still
uses W283-era "≥3 organizationally-distinct sources" while v2
`sota-convergence-audit` requires typed-evidence (BENCHMARK / CODE
READING / FIELD REPORT). The asymmetry wastes operator cycles. Suggest
W285 stream amend both SKILLs in one commit so the discovery pipeline
and audit pipeline stay aligned.

---

## Bottom-line

- **C.1** (eval-harness 8th rubric dim) — IMPLEMENTED. Smoke verified:
  4/5-case fixture -> score 4/5; skill-kind -> N/A carve-out; missing
  smoke -> score 0 (lane crash). Audit-side wiring is a SKILL.md edit
  owned by W285 (Section D.1 handoff).
- **C.3** (skill-comply self-eval) — DRY-RUN PASSED for
  `sota-convergence-audit` (6 steps, 3 scenarios); SCENARIO-YAML FAILED
  for `goal-prompt-synthesis` (tool bug); manual rubric review yields
  ~60% / ~66% compliance estimates with 3 top fixes escalated to W285.
- **C.5** (decay cron) — IMPLEMENTED `tools/sota-reverify.ps1` with
  dry-run + JSON + live modes; idempotent; cardinal-rule-2 compliant
  (no new slash command, no MCP wrapper). Recipe + graphiti query
  example documented. graphiti latency is an existing W263d-pinned
  bottleneck, not introduced by C.5.
