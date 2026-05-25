# Verified-Avoid Cohort Registry

# Promoted from sibling claude-sota `docs/verified-avoid.md` Cohort framework pattern (per Section 14.5 cite-import-AMBER; sibling has same-shape registry for adoption-class rejections)
# Cite-class: TIER-3-LOCAL-COMPOSITION per Z:/claude-sota/.claude/rules/citation-discipline.md rule #8 MIN_PRECEDENCE
# Purpose: enumerate rejected adoption candidates with cohort classification + Probe DAG verdict + cite anchors. Prevents re-evaluation churn across fires; sister to docs/install-provenance.md.

## Cohort taxonomy

- **Cohort 1**: META-HARNESS competing-frameworks (full workflow-system parallels that compete with eee-local cardinal-rule lattice)
- **Cohort 2**: Probe 6 direct-file/registry blockers (LICENSE / phantom registry / build-deps mismatch)
- **Cohort 3**: DUPLICATE-FUNCTIONALITY per kiss-dry-yagni Must-Never #4 (incumbent covers SAME scope SAME mechanism)
- **Cohort 4**: PARTIAL-OVERLAP with mode-harness-shape mismatch (Probe 5 HARD-GATE / interactive-vs-autonomous / size-sprawl)
- **Cohort 5**: P7.a DEMAND-ABSENCE (structurally sound BUT no current/queued workflow consumer)
- **Cohort 6**: failed-pilot retirement (post-STUDY-PILOT verdict; documented retirement path)

---

## Wave 50 Fire 2 — 2026-05-15 3-agent BRIDGE-MODE wave (sota-researcher binding verdict)

Cite anchor: `tmp/w50f2-A-sota-researcher-1st-stage-2026-05-15.md` (dispatch ada368cf8720aea4c, 3-of-3 REJECT-FOR-FIT). FM-09 2-stage contract: harness-fit BINDING (codex-rescue agents 🅱+🅲 both returned FM-17.b/d autocompact-thrash with NO verdict — see Cohort 7 FM-17 ladder entry below).

### Entry W50F2-T1 — wshobson context-management on trading project [Cohort 3 + 4]

- **Source**: `Z:/repos/deps/wshobson-agents/plugins/context-management/commands/context-save.md + context-restore.md @ HEAD ece811f23310a37ceb43496dbac0e244fe6845b6` (MIT, Seth Hobson)
- **Proposal**: register `/context-save` + `/context-restore` slash commands on trading project for 5h session boundary survival
- **Verdict**: REJECT-FOR-FIT P1 conf 0.92
- **Killer probe**: P5 mode-harness-shape HARD-FAIL — both commands are aspirational pseudo-code (context-save.md L92-101 undefined Python `extract_project_metadata` / `analyze_architecture` / `build_dependency_graph`; context-restore.md L37-46 undefined `VectorDatabase` / `rank_and_filter_contexts`). Pinecone/Weaviate/Qdrant integration doesn't exist. NO bash steps, NO MCP calls, NO file paths
- **Sibling override evidence**: trading already has cron `e682bfad` + `.wave-43-status` + `firing-dispatch` SKILL.md as persist mechanism; claude-sota-installed has Rank #3.5 PreCompact stack with `compact_hint.v1` 8-required-field schema + advisory pipeline
- **CR-12 class**: DUPLICATE-FUNCTIONALITY (class 2)
- **Re-evaluation trigger**: wshobson ships executable mechanism (not pseudo-code) AND trading-project's current persist mechanism proves insufficient

### Entry W50F2-T2 — Generic /loop-dispatch skill on claude-sota-installed [Cohort 3 + 5]

- **Proposal**: extract generic dispatch pattern from `Z:/projects/trading/.claude/skills/firing-dispatch/SKILL.md` to a reusable claude-sota-installed skill
- **Verdict**: REJECT-FOR-FIT P1 conf 0.88
- **Killer probe**: P4 namespace collision (4 incumbent primitives) + P7.a DEMAND-ABSENCE (no active /loop cron driver on claude-sota-installed)
- **4 incumbent primitives**:
  - `claude-plugins-official/superpowers/5.1.0/skills/dispatching-parallel-agents/SKILL.md` (obra, named-T2)
  - `everything-claude-code/skills/autonomous-loops/SKILL.md` (ECC canonical, 6 patterns)
  - `everything-claude-code/skills/continuous-agent-loop/SKILL.md` (ECC canonical)
  - `claude-plugins-official/ralph-loop/1.0.0/commands/ralph-loop.md` (Anthropic-OFFICIAL)
  - Plus sister local skills: `sota-convergence-audit/SKILL.md` (5-phase R1-R5) + `goal-prompt-synthesis/SKILL.md`
- **CR-12 class**: PARTIAL-OVERLAP (class 3) + DUPLICATE-FUNCTIONALITY (class 2) cohort
- **Re-evaluation trigger**: claude-sota-installed acquires an active /loop cron driver with use case NOT covered by the 4 incumbents

### Entry W50F2-T3 — gsd /gsd-spike + /gsd-graphify on trading [Cohort 1 + 4]

- **Source**: `Z:/repos/deps/get-shit-done/ @ HEAD 3aaed8f5d7c3492678b867e6687d42c88fe227e5` (MIT, Lex Christopherson 2025; 58k★; 64 commands in commands/gsd/; cpd≈7.6/d × 329d age active-iteration band per convergence-gate Axis 3)
- **Verdict**: REJECT-FOR-FIT P1 conf 0.90
- **Killer probe**: P5 mode-harness-shape HARD-FAIL — gsd-spike L10 `AskUserQuestion` HARD-GATE interactive prompt blocks autonomous cron (n=4 cohort with mattpocock + wshobson conductor + brainstorming HARD-GATE pattern); gsd-graphify L155 hard-coded `timeout 600000` (10 min) beats 5m cron cadence; gsd-graphify L138 requires NPM-global `node $HOME/.claude/get-shit-done/bin/gsd-tools.cjs` install-class artifact
- **CR-12 class**: gsd-spike PARTIAL-OVERLAP (class 3); gsd-graphify DUPLICATE-FUNCTIONALITY (class 2 — duplicates wired graphiti L3 FalkorDB:16379 + gitnexus knowledge graph)
- **Broader META-HARNESS concern (Cohort 1)**: gsd is full competing meta-prompting framework (`.planning/config.json` + own state model + `gsd-sdk query` CLI surface); broad install would create install-priority conflict with claude-sota-installed CR-5 + CR-12 lattice
- **Re-evaluation trigger**: gsd ships autonomous-mode (non-interactive AskUserQuestion) OR trading-project develops knowledge-graph use case NOT served by graphiti/gitnexus

### Entry W50F2-FM17 — codex-rescue BRIDGE-MODE autocompact-thrash sub-class [Cohort 7 FM ladder]

- **Failure**: 2 codex-rescue dispatches (agents 🅱 ae5bf4fe + 🅲 af04c94b) both returned `"Autocompact is thrashing: the context refilled to the limit within 3 turns of the previous compact, 3 times in a row"` with NO verdict
- **Wall-clocks**: 🅱 649s; 🅲 1216s — both well beyond 90s/120s codex per-call budget per `fm17-subagent-fleet-depletion.md §FM-17.d`
- **Root cause hypothesis**: codex-rescue wrapper subagent inherits parent context (CLAUDE_CODE_FORK_SUBAGENT=1 per CLAUDE.local.md ENV (e)); parent context this fire is heavy (cardinal rules + standing directives all loaded); wrapper hits autocompact thrashing BEFORE codex CLI subprocess invocation succeeds
- **Sub-class**: extends FM-17.b/d ladder — codex-rescue wrapper-context-autocompact-thrash-pre-verdict
- **Recovery (forward-only)**: per FM-17.d, fall back to orchestrator-direct `codex exec --ephemeral -p deep-review-exec --skip-git-repo-check --color never | tee` foreground+tee dispatch when codex-rescue wrapper fails. This is **Path P** per `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md §Pattern D` (n=13 recovery-family same-arc evidence). **DO NOT use Path D `CLAUDE_CODE_DISABLE_1M_CONTEXT=1` as recovery** — 1M context IS the SOTA primitive per Anthropic CC official docs (https://code.claude.com/docs/en/model-config); disabling SOTA to work around a wrapper-context bloat is cardinal-rule-5/8 violation. Correct fix preserves 1M ceiling AND satisfies cross-model gate via orchestrator-level codex CLI subprocess. (Prior version of this entry erroneously listed Path D as OR-recovery; corrected same-arc W50F2-REVERT 2026-05-15 per operator directive "we need 1m it is the sota approach".)
- **Audit-trail**: FM-09 2-stage contract preserved — codex-rescue 1st-stage produced no verdict, sota-researcher 2nd-stage harness-fit REJECT stands uncontested
- **Promotion candidate**: this is **n=1 same-arc** of the autocompact-thrash-pre-verdict sub-class for THIS runtime; advance ladder if recurs in future fires
- **Cite anchor**: `cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate` + `fm17-subagent-fleet-depletion.md §FM-17.d` (sibling cite-import-AMBER per Section 14.5)

---

## Promotion threshold

This file is codified at **n=1 user-trigger** (operator pivot 2026-05-15 "advanced automation from sota repos workflow") + n=3 self-observed REJECT-FOR-FIT verdicts (W50F2-T1+T2+T3 in same fire). Per `Z:/claude-sota/.claude/rules/codification-threshold.md` cycle-322 jurisdiction §n=3 self-observed promotes feedback→rule gate satisfied.

Expected savings: each future re-evaluation of T1/T2/T3 candidates costs ~20-40 min (Probe DAG 1-7 + Axis 1+2+3); registry lookup ~30s saves the cycle.

## Update triggers

Re-evaluate this file when:
- An entry's "Re-evaluation trigger" condition fires upstream (e.g., wshobson ships executable mechanism, claude-sota-installed acquires /loop cron driver, gsd ships autonomous-mode)
- A 4th cohort entry of same shape lands (n=4 → consider sub-rule extraction)
- Sibling claude-sota's `docs/verified-avoid.md` schema evolves (cite-import-AMBER refresh)
