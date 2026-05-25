---
title: Wave 200 P0.B-A — SOTA Repo Line-by-Line Replacement Audit (Agent A)
date: 2026-05-14
status: AUTHORITATIVE
agent: sota-researcher (ad1915ba2bebadb8a)
wave: W200
phase: P0.B-A
stand_in_notice: N/A (Opus 4.7 [1m]; CLAUDE_CODE_SUBAGENT_MODEL not env-funneled per CLAUDE.local.md ENV (g) DEPRECATED comment-out)
---

# Wave 200 P0.B-A — SOTA Repo Line-by-Line Replacement Audit (Agent A)

**STAND-IN-NOTICE**: Dispatch ran under standard Opus 4.7 with `[1m]` context. No `CLAUDE_CODE_SUBAGENT_MODEL` env funneling active per CLAUDE.local.md ENV (g) DEPRECATED comment-out. Cross-model gate satisfaction at this orchestrator-direct read-only audit = N/A (descriptive research artifact, no Edit/Write fires; CR-3 cross-model T1 contract gates next-fire ship decisions, not this Pattern B HONEST-NON-FINDING research output).

**Audit scope**: 13 of 21 target repos verified locally (8 missing under-named, 6 located under alternate names — see §GAPS-IN-AUDIT). All cites pinned to `Z:/repos/deps/<repo>/<file>:<line> @ HEAD <SHA>` per cardinal-rule-1.

**Target current-architecture primitives** (TIER-3-LOCAL discipline candidates for replacement):
1. **FM-17.e codex-rescue blind-spot** — 2-stage validation contract (`Z:/claude-sota/.claude/rules/ahfv-codex-rescue-blind-spot.md`)
2. **Mia pre-apply n=30** — verify agent prescriptions BEFORE Edit (`Z:/claude-sota/.claude/rules/mia-pre-apply.md`)
3. **CADP cache-aware dispatch pacing** — max-3 concurrent / max-5 cumulative (`Z:/claude-sota/.claude/rules/parallel-agent-wave.md §CADP`)
4. **Path P codex foreground+tee** — DEFAULT-profile recovery for Pattern B HNF (`Z:/claude-sota/.claude/rules/ctff-patterns-cd.md §Pattern D`)
5. **FM-20 path-drift cascade** — defense against stale path cite-anchors

---

## Top-N Prioritized REPLACEMENT-CANDIDATE List (sorted by Axis-1 + CR-12 score)

### Candidate #1: superpowers `subagent-driven-development` — 3-role review stack
- **Source**: `Z:/repos/deps/superpowers/skills/subagent-driven-development/SKILL.md:42-128 @ HEAD f2cbfbefebbfef77321e4c9abc9e949826bea9d7` (named-T2 author obra, MIT)
- **Targets**: Mia pre-apply (#2) + FM-17.e 2-stage validation (#1)
- **Pattern**: implementer → spec-reviewer → code-quality-reviewer with 4-state status vocab `{DONE, DONE_WITH_CONCERNS, NEEDS_CONTEXT, BLOCKED}` at `:104-118`
- **Probe DAG**:
  | Probe | Result |
  |-------|--------|
  | 1 count-OVER | PASS |
  | 2 SDK-vs-CLI | PASS |
  | 3 architectural-API | PASS |
  | 4 plugin-namespace | **PARTIAL — DUPLICATES already-vendored skill** at `.claude/plugins/cache/claude-plugins-official/superpowers/5.1.0/skills/subagent-driven-development/` |
  | 5 mode-harness-shape | PASS |
  | 6 direct-file-blockers | PASS (MIT) |
  | 7 demand-gate | `.b` DEMAND-CREATES-NEW-WORKFLOW |
- **Convergence**: Axis-1+2+3 PASS
- **CR-12 disposition**: **DUPLICATE-FUNCTIONALITY** — superpowers skill already plugin-loaded; Mia/FM-17.e replacement is OVER (claude-sota already cite-imports via `team-orch-state-spawning.md §Implementer status vocabulary`)
- **Mia classification**: **OVER**

### Candidate #2: superpowers `dispatching-parallel-agents`
- **Source**: `Z:/repos/deps/superpowers/skills/dispatching-parallel-agents/SKILL.md:60-110 @ HEAD f2cbfbe`
- **Targets**: CADP (#3)
- **Probe DAG**: Probe 4 PARTIAL DUPLICATE w/ `parallel-agent-wave.md §Fan-out decision gate`; Probe 7 `.a` DEMAND-ABSENCE — superpowers lacks cap-policy (refuted by 2026-04-29 depletion incident memory)
- **CR-12 disposition**: **PARTIAL-OVERLAP** — superpowers covers HOW to dispatch, NOT cache-aware caps
- **Mia classification**: **GENUINE-GAP for prompt-structure** + **OVER for replacing CADP caps**

### Candidate #3: autogen `TerminationCondition` system
- **Source**: `Z:/repos/deps/autogen/python/packages/autogen-agentchat/src/autogen_agentchat/conditions/_terminations.py:24-565 @ HEAD 027ecf0a` (Microsoft, MIT)
- **Targets**: `team-orch-patterns.md §Termination contract`
- **Probe DAG**: Probe 2+3 FAIL — Python SDK runtime not CC CLI transposable; only post-completion subset
- **CR-12 disposition**: **CITE-CLASS-CANONICAL** — already cite-trail integrated
- **Mia classification**: **OVER**

### Candidate #4: deepagents `_EXCLUDED_STATE_KEYS` + `TruncateArgsSettings`
- **Source**: `Z:/repos/deps/deepagents/libs/deepagents/deepagents/middleware/subagents.py:176,384,409 @ HEAD 95f845d2` (LangChain, MIT)
- **Probe DAG**: Probe 2+3 FAIL — Python SDK middleware vs CC prompt-string handoff; structural-similarity only
- **CR-12 disposition**: **CITE-CLASS-CANONICAL** — already cite-imported at `team-orch-state-spawning.md §Parent→Child State-Leak Avoidance`
- **Mia classification**: **OVER**

### Candidate #5: agent-orchestrator `atomic-write.ts` + `file-lock.ts`
- **Source**: `Z:/repos/deps/agent-orchestrator/packages/core/src/atomic-write.ts:1-35 @ HEAD 13c5a50` (ComposioHQ, MIT) + `file-lock.ts:9-57`
- **Targets**: FM-20 + `parallel-session-worktree-isolation.md §Mandatory mechanical collision-guard`
- **Probe DAG**: Probe 2 PARTIAL (TypeScript SDK; sss `_atomic_jsonl_append.py` is Python equivalent)
- **CR-12 disposition**: **PROVIDER-COMPLEMENT** — parallel implementation; cite reinforcement only
- **Mia classification**: **OVER** for replacement, **GENUINE-GAP** for 4th-org Axis-1 cite-import expansion

### Candidate #6: addyosmani `doubt-driven-development` — **GENUINE-GAP found**
- **Source**: `Z:/repos/deps/addyosmani-agent-skills/skills/doubt-driven-development/SKILL.md:1-40 @ HEAD 4c585c3` (Addy Osmani / Google Chrome, MIT)
- **Targets**: Mia pre-apply (#2) — fresh-context adversarial verification BEFORE Edit
- **Pattern**: "A confident answer is not a correct one... materializing a fresh-context reviewer — biased to **disprove**, not approve — before any non-trivial output stands"
- **Probe DAG**: ALL PASS; Probe 4 PARTIAL (plugin already INSTALLED); Probe 7 `.b` STUDY-PILOT eligible
- **Convergence**: Axis-1 PASS (Addy + obra superpowers + ECC verification-loop = 3-org); Axis-2 PASS; Axis-3 PASS
- **CR-12 disposition**: **PARTIAL-OVERLAP** — Mia covers "verify-before-Edit" via cheap-probe ROI; doubt-driven covers "non-trivial decision predicate enumeration"
- **Mia classification**: **GENUINE-GAP** for explicit non-trivial-decision predicate enumeration (5 named conditions at `doubt-driven-development/SKILL.md:14-22`) — sibling `mia-pre-apply.md §When this rule applies` enumerates trigger SHAPES but NOT decision-CLASS predicates

### Candidate #7: addy `source-driven-development`
- **CR-12 disposition**: **CITE-CLASS-CANONICAL** — already TIER-1-NAMED-AUTHOR-QUOTE at CLAUDE.md L80 (Wave 82l)
- **Mia classification**: **OVER**

### Candidate #8: wshobson `conductor` plugin — track-management
- **Source**: `Z:/repos/deps/wshobson-agents/plugins/conductor/skills/track-management/SKILL.md:1-40 @ HEAD ece811f`
- **Probe DAG**: Probe 5 FAIL — HARD-GATE interactive Q&A setup at `commands/setup.md:8` (iter-93 cohort recurrence per `ahfv-seven-sub-classes.md` n=4)
- **CR-12 disposition**: **DUPLICATE-FUNCTIONALITY** (FM-09 4th-class) — REJECT-FOR-FIT
- **Mia classification**: **OVER**

### Candidate #9: ECC `verification-loop`
- **CR-12 disposition**: **DUPLICATE-FUNCTIONALITY** — superpowers verification-before-completion + ECC verification-loop convergent; both plugin-installed
- **Mia classification**: **OVER**

### Candidate #10: vercel-labs `composition-patterns` — DEFERRED to Agent C

---

## ROLLUP — Replacement Verdicts (5 target primitives × candidate set)

| Target Primitive | Best Candidate | Verdict |
|---|---|---|
| **FM-17.e codex-rescue blind-spot** | superpowers subagent-driven-development | **NO-REPLACEMENT** — already cite-imported; FM-09 n=5 base rate 100% override is sibling-novel codification with no upstream parity (CR-12 TERTIARY HNF) |
| **Mia pre-apply n=30** | addy doubt-driven-development | **PARTIAL-AUGMENT-ONLY** — adopt non-trivial-decision predicate enumeration as eee-local extension; do NOT replace cheap-probe ROI math (n=30 sibling-novel) |
| **CADP cache-aware dispatch** | superpowers dispatching-parallel-agents | **NO-REPLACEMENT** — superpowers lacks cap-policy; CADP is sibling-novel response to 2026-04-29 depletion incident |
| **Path P codex foreground+tee** | (none found in 13 repos) | **NO-REPLACEMENT** — Path P n=13 recovery-family is sibling-novel codex CLI dispatch shape; no SOTA parity |
| **FM-20 path-drift cascade** | agent-orchestrator atomic-write | **CITE-CLASS-REINFORCEMENT-ONLY** — `_atomic_jsonl_append.py` already implements; ComposioHQ as 4th-org Axis-1 reinforcement |

**Net finding**: **0 of 5 target primitives have a clean replacement candidate** in the audited 13 repos. All 5 sibling-novel TIER-3-LOCAL codifications are HONEST-NON-FINDINGs per CR-12 TERTIARY path — they address empirical failures (FM-09 blind-spot, depletion incident, codex pool starvation, path drift) that lack upstream SOTA equivalents. Audited repos converge on adjacent disciplines (verification-before-completion, subagent-driven-development, doubt-driven-development, atomic-write) that REINFORCE the sibling-novel patterns via Axis-1 cite-trail expansion — but do NOT REPLACE them.

**Recommended action**: Per CR-12 6-class disposition — most replacement claims classify as DUPLICATE-FUNCTIONALITY (Candidates #1, #4, #7, #8, #9) or CITE-CLASS-CANONICAL (#3, #4, #7). The GENUINE-GAP finding (#6 partial doubt-driven predicate enumeration) is small augment, not replacement. Sibling-novel TIER-3-LOCAL discipline is **operationally validated and SOTA-current**; no Pattern-A ship-shaped replacement warranted.

---

## GAPS-IN-AUDIT (for Agent C follow-up)

**Repos NOT located locally**:
1. mattpocock GitHub source (only mattpocock-skills @ 733d312 found locally)
2. alirezarezvani-claude-skills — 5,200★ MIT; check `AUDIT_REPORT.md` for self-audit methodology
3. ComposioHQ/awesome-claude-skills — meta-list; REMOTE-ONLY by design
4. hesreallyhim/awesome-claude-code — located as `awesome-claude-code @ 614f102` BUT under-probed
5. quemsah/awesome-claude-plugins — located as `awesome-claude-plugins @ 765d795` BUT under-probed
6. abhigyanpatwari/GitNexus — located as `gitnexus @ 98addbd6` BUT under-probed
7. Shubhamsaboo/awesome-llm-apps — NOT LOCALLY CLONED
8. shareAI-lab/learn-claude-code — located as `learn-claude-code @ 4b95969` BUT under-probed

**Under-probed sections of LOCATED repos**:
- vercel-labs `composition-patterns` (Candidate #10)
- mattpocock `engineering/diagnose` + `grill-with-docs` + `zoom-out`
- ECC `verification-loop` Phase 4-N
- ECC `continuous-agent-loop` + `continuous-learning-v2`
- karpathy-skills internals beyond CLAUDE.md cite
- claude-agent-sdk-python `HookMatcher` + `ClaudeSDKClient` runtime control
- composio repo
- wshobson conductor full tree
- get-shit-done full README + `/gsd-graphify` + `/gsd-spike` mechanics
- deepagents `graph.py` + profiles + backends

**Critical follow-up targets for Agent C**:
- Probe `mattpocock-skills/skills/engineering/diagnose/SKILL.md` for systematic-debugging cohort (4th-class recurrence n=4 → n=5 advancement)
- Probe `alirezarezvani-claude-skills` AUDIT_REPORT.md for skill quality methodology
- Probe `awesome-claude-code @ 614f102` resource-table for SKILL/CLAUDE.md/plugin cohort additions

---

## HANDOFF

handoff_to: orchestrator
output_mode: last_message
artifacts: [tmp/wave200-agentA-sota-repo-audit-2026-05-14.md]
verdict_one_line: "DONE: 13/21 repos audited, 0/5 target primitives replaced, 1 partial-augment (addy doubt-driven) found, 8 GAPS-IN-AUDIT items for Agent C"

---

## Cite-class

TIER-3-LOCAL-OPERATOR-DERIVED audit artifact. Constituents per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8: TIER-1-DIRECT @ 13 verified file:line + HEAD SHA cites; TIER-2 cite-import-AMBER @ `ahfv-probe-dag.md` Probe DAG 1-7 + `convergence-gate.md` Axis 1+2+3 + `cardinal-rule-12-upstream-install-priority.md` 6-class disposition + `mia-pre-apply.md` GENUINE-GAP/OVER + `synthesis-layer-verify.md §Reporting categories` HNF. `effective_tier=TIER-3-LOCAL-COMPOSITION` per MIN_PRECEDENCE.
