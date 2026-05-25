---
title: Wave 1 Synthesis — Install Architecture (Post-Mia Pre-Apply)
status: AUTHORITATIVE-CANDIDATE
date: 2026-05-15
agent: orchestrator-side synthesis
wave: 1
predecessors: [tmp/wave1-A-agent-orch-improvements-2026-05-15.md, tmp/wave1-C-file-org-multi-file-improvements-2026-05-15.md]
---

# Wave 1 Synthesis — Install Architecture (Post-Mia Pre-Apply, 2026-05-15)

**Method**: 5-phase sota-convergence-audit pipeline (R1-R5 per `Z:/claude-sota-installed/.claude/skills/sota-convergence-audit/SKILL.md`) across 3 parallel Wave 1 agents (1 sota-researcher + 2 codex-rescue BRIDGE-MODE attempts); Mia pre-apply applied to all returned prescriptions per `mia-pre-apply.md` n=36+ ladder discipline; Wave 2 synthesis at orchestrator-side instead of subagent fan-out (CADP cap reached).

## §1 Wave 1 dispatch results

| Agent | Scope | Subagent type | Outcome | Artifact |
|---|---|---|---|---|
| A | Agent orchestration rule stack | sota-researcher | DONE — 9 convergences + 10 gaps + 6 strengtheners + Top-3 ranked | `tmp/wave1-A-agent-orch-improvements-2026-05-15.md` |
| B | Meta-skills inventory | codex-rescue (BRIDGE-MODE) | **FAILED ×2** — FM-17.b/d wrapper-context autocompact-thrash (codex-rescue Tools=Bash-only structural constraint); n=3 cumulative same-arc evidence (B + B-redo + C orig) | (no artifact) |
| C-redo | File-org + multi-file workflow | sota-researcher (codex-rescue fallback) | DONE — 3 ranked + 4 audit gaps + 7 SOTA patterns categorized + verification-before-completion checklist | `tmp/wave1-C-file-org-multi-file-improvements-2026-05-15.md` |

**FM-17.b/d new evidence**: n=3 cumulative same-arc (B orig 4 tools/19min + B-redo 4 tools/9min + C orig 4 tools/26min) shows codex-rescue agent class is STRUCTURALLY broken in this session for file-read-heavy briefs. Tools=Bash-only constraint forces all reads through stdout; wrapper conversation history bloats faster than any brief-tightening compensates for. Promotion-eligible for dedicated rule per `codification-threshold.md` cycle-322 jurisdiction.

## §2 Mia pre-apply outcomes (load-bearing claims verified)

| Claim | Source | Mia probe | Outcome |
|---|---|---|---|
| cwc-long-running-agents installed at `.local/cwc/` | Agent A G1 + CLAUDE.md `## Architecture` | `ls Z:/claude-sota-installed/.local/cwc/` | **VERIFIED** — `claude-code-config/`, `README.md`, `LICENSE`, `.git/` all present |
| cwc upstream at `Z:/repos/deps/anthropics/cwc-long-running-agents/` | Agent A G1 + CLAUDE.md | `ls Z:/repos/deps/anthropics/...` | **OVER** — actual path is `Z:/repos/deps/cwc-long-running-agents/` (NO `anthropics/` prefix). Cite-path fix needed in CLAUDE.md `## Architecture` block. |
| Sibling `Z:/claude-sota/` exists (cite-import source) | CLAUDE.md inheritance block + Agent C #1 | `Test-Path Z:\claude-sota` (PowerShell) + Bash `ls Z:/claude-sota` | **OVER — DROPPED** — Sibling **DOES NOT EXIST** on this filesystem. All 70+ inherited rule content cited as `Z:/claude-sota/.claude/rules/*` is cite-only via session-context inheritance block — no on-disk source to cite-import. Agent C #1 (tmp_md_inventory.py + tmp_promote_authoritative.py from sibling) is **BLOCKED**. |
| cwc hook files (verify-gate.sh + track-read.sh + steer.sh + commit-on-stop.sh + kill-switch.sh) | Agent A G1 / G7 | `ls Z:/repos/deps/cwc-long-running-agents/claude-code-config/.claude/hooks/` | **VERIFIED** — all 5 present: commit-on-stop.sh (767B), kill-switch.sh (400B), steer.sh (768B), track-read.sh (575B), verify-gate.sh (1.3K) |
| cwc evaluator.md (Claude-side fresh-context evaluator) | Agent A G2 | `ls Z:/repos/deps/cwc-long-running-agents/claude-code-config/.claude/agents/` | **VERIFIED** — evaluator.md (1.7K) present |
| PROGRESS.md template in cwc | Agent C #2 / Agent A G4 | `find Z:/repos/deps/cwc-long-running-agents -name PROGRESS*` | **HONEST-NON-FINDING** — no PROGRESS.md template file in upstream repo. Convention only (per Anthropic blogs Nov 2025 + Mar 2026). Implementing requires bootstrap-authoring with explicit cite trail. |
| Parent CCC `Z:/claude/` exists | sanity check | `ls -d Z:/claude` | VERIFIED |
| This runtime `Z:/claude-sota-installed/` exists | sanity check | `Test-Path Z:\claude-sota-installed` | VERIFIED |

**Net Mia disposition**: 1 OVER caught (Agent C #1 sibling-import) + 1 cite-path correction (cwc upstream prefix) + 1 HNF (PROGRESS.md template absence). Pattern A admissibility filter applies: drop OVER from synthesis, propagate cite-correction, document HNF.

## §3 REVISED Install Architecture (post-Mia)

### Phase 1 — Default-FAIL contract + Fresh-context evaluator [P0, IMMEDIATELY-VIABLE]

**Source**: `Z:/repos/deps/cwc-long-running-agents/claude-code-config/.claude/` (canonical upstream path; also locally installed at `.local/cwc/`)

**Sub-1.A — Install cwc evaluator.md as `.claude/agents/evaluator.md`**
- Source: `Z:/repos/deps/cwc-long-running-agents/claude-code-config/.claude/agents/evaluator.md` @ HEAD `ffd563d6` (1.7K)
- License: Anthropic OFFICIAL (per cwc LICENSE 11.3K)
- Role: Claude-side fresh-context evaluator subagent — skeptical-default, mandatory `PASS|NEEDS_WORK` first-line verdict
- **CR-12 disposition**: PROVIDER-COMPLEMENT to existing gpt5-reviewer (codex-side); this is Claude-side
- **Probe DAG**: PASS all 7 probes — Probe 4 plugin-namespace clean (no plugin owns evaluator); Probe 5 mode-harness-shape PASS (non-interactive); Probe 6 license PASS (Anthropic OFFICIAL)
- **LOC**: ~5 LOC frontmatter port + ~50 LOC body copy = direct file copy

**Sub-1.B — Wire cwc hooks into `.claude/settings.json`**
- Source: `Z:/repos/deps/cwc-long-running-agents/claude-code-config/.claude/hooks/` (5 .sh files)
- Wiring:
  - PreToolUse Edit|Write: `verify-gate.sh` + `track-read.sh` (Default-FAIL claim-time gate)
  - Stop: `commit-on-stop.sh` (auto-commit handoff)
  - User-invoked OR scheduled: `kill-switch.sh` + `steer.sh` (operator interrupts)
- **CR-12 disposition**: GENUINELY-NEW
- **Risk**: START with FAIL_OPEN-with-WARN-stderr per Wave 11A safety-regression precedent in `lga-five-layers.md §4.1`; flip to FAIL_CLOSED after n=5 dogfood arc shows zero false-positives
- **LOC**: ~30 LOC settings.json additions + adapt `RESULTS_FILE` env path to `.claude/state/<wave>_verdict.json`

**Sub-1.C — Codify rule `.claude/rules/default-fail-contract.md`**
- Cite anchors: TIER-1-DIRECT `Z:/repos/deps/cwc-long-running-agents/claude-code-config/.claude/hooks/verify-gate.sh @ ffd563d6` + Anthropic blog "Effective Harnesses for Long-Running Agents" (Nov 2025) + "Harness Design for Long-Running Application Development" (Mar 2026)
- Pattern: Every "X is done" claim requires evidence-Read since gate last fired; criteria start `false`; PASS only on explicit evidence
- **LOC**: ~150 LOC rule body + cite block

### Phase 2 — Planner-Worker + PROGRESS.md convention [P0/P1]

**Source**: cwc-long-running-agents convention (no template file in upstream; bootstrap-authoring with cite trail per Mia HNF on template existence)

**Sub-2.A — Author `.claude/PROGRESS.md` template**
- Convention: 4-section (Done / In-Progress / Next / Notes)
- Cite anchor: Anthropic cwc-long-running-agents convention (Anthropic blogs Nov 2025 + Mar 2026 + cwc/.claude/hooks/commit-on-stop.sh implementation)
- **CR-5 bootstrap-exception rationale**: convention adapted from Anthropic OFFICIAL primitive; no upstream template file (HNF); cite-anchored adaptation per CR-8 full-SOTA-content invariant
- **LOC**: ~40 LOC template

**Sub-2.B — Codify rule `.claude/rules/planner-worker-handoff.md`**
- Cite anchors: cwc-long-running-agents (Anthropic OFFICIAL) + Cursor "Scaling Agents" blog (named-T2) + awesome-agentic-patterns `planner-worker-separation-for-long-running-agents.md @ HEAD 9c40e100`
- Integration with `team-orch-state-spawning.md §Implementer status vocabulary` 4-state (DONE/DONE_WITH_CONCERNS/NEEDS_CONTEXT/BLOCKED)
- **LOC**: ~120 LOC

### Phase 3 — repo-scan haibindev pilot for tmp/ triage [P1, ONE-SHOT]

**Source**: `everything-claude-code` plugin marketplace (already installed per CLAUDE.md §"Skill Orchestration Discipline" block)

- Verify plugin install at `Z:/claude-sota-installed/.claude/plugins/marketplaces/everything-claude-code/` (probe needed)
- Use `Skill repo-scan` (auto-fire via description match) for one-shot triage of 100+ `tmp/wave*-*.md` flat files into Promote / Extract & Merge / Rebuild / Deprecate cohorts
- **CR-12 disposition**: PROVIDER-COMPLEMENT to file-org governance (Phase 4)
- **LOC**: ~0 net new (plugin already installed; invocation only) + decision rationale doc

### Phase 4 — tmp/ governance [P2 DEFERRED — Mia OVER on C #1]

**Status**: Agent C #1 sibling-import DROPPED per Mia OVER catch (`Z:/claude-sota/` doesn't exist on filesystem). Phase 4 needs alternative SOTA path.

**Recovery paths** (research-beyond per CR-10 next-arc):
- (a) Multi-source≥4 discovery probe specifically on "tmp/wave*.md frontmatter governance" + "report-sprawl decluttering" skill class for upstream parity
- (b) ECC `skill-stocktake` adaptation (already-installed plugin) — may cover frontmatter audit + AUTHORITATIVE-promotion advisory
- (c) Hand-author bootstrap exception — would require CR-5 carve-out with explicit "no upstream parity per HONEST-NON-FINDING" justification + CR-8 full-SOTA-content cite adaptation

**Recommended**: defer Phase 4 to next session arc with dedicated discovery wave on tmp-frontmatter-governance class. Phase 3 (repo-scan one-shot) provides interim relief.

### Phase 5 — Tool-budget heuristic + Eval-case Phase 2-4 [P1]

**Sub-5.A — Strengthen parallel-agent-wave with per-difficulty tool budget**
- Cite anchor: TIER-1 OFFICIAL Anthropic `anthropic-cookbook/...research_subagent.md @ HEAD 33424c3e` verbatim "simple <5 / medium 5 / hard 10 / very-difficult 15 / hard ceiling 20"
- **Note**: `parallel-agent-wave.md` is sibling cite-import-AMBER (inherited content, no on-disk source). Cannot directly edit sibling. Options:
  - (a) Create runtime-local override rule that strengthens-with-cite
  - (b) Document strengthening in `docs/` decision rationale doc + reference at synthesis time
- **CR-12 disposition**: PARTIAL-OVERLAP strengthen
- **LOC**: ~30 (runtime-local override rule)

**Sub-5.B — Graduate eval-case discipline to ACTIVE**
- Author `.claude/hooks/scripts/eval_case_compliance_observer.py` (~80 LOC)
- Wire PostToolUse `Bash(git commit *)` checking commit body for `T1 NEEDS-REVISION conf>=0.85` and suggesting eval case file
- Cite anchor: TIER-1 awesome-agentic-patterns `incident-to-eval-synthesis.md @ HEAD 9c40e100` + Constitutional AI corpus practice
- **CR-12 disposition**: GENUINELY-NEW (eval-case discipline doesn't exist as hook yet in this runtime)

### Phase 6 — Cosmetic strengtheners [P2/P3]

- `on_no_progress` termination predicate strengthening (S4) — ~10 LOC
- SubagentStop transcript mechanical-enforce (S2) — ~80 LOC hook + 1 settings.json entry
- OODA invariant #9 for advanced-agent-team-standing-directive (S6) — runtime-local override ~15 LOC
- Chain-of-thought monitoring (G7) — already covered by Phase 1 cwc steer.sh install

## §4 FM-17.b/d disposition (Agent B meta-skills audit)

- Agent B failed ×2 (codex-rescue BRIDGE-MODE) — FM-17.b/d wrapper-context autocompact-thrash
- n=3 cumulative same-arc evidence (B + B-redo + C-orig all 4-tools/autocompact-thrash); structural Bash-only-Tools constraint at codex-rescue agent class makes file-read-heavy briefs thrash deterministically
- **DEFERRED** to next session arc
- **Recovery path**: orchestrator-direct Pattern D — `codex exec --ephemeral -p deep-review-exec --skip-git-repo-check --color never < .claude/state/codex_consult_b_meta_skills.txt 2>&1 | tee .claude/state/codex_consult_b_meta_skills_OUT.txt` (sequential, ~5min wall-clock, codex CLI subprocess context starts fresh per `cmc-t1-t7-lifecycle.md §Profile selection rule`)
- **Scope for next arc**: Top-3 self-audit improvements EACH for `sota-convergence-audit` + `goal-prompt-synthesis` SKILL.md (6 candidates total)
- **Sister codification candidate**: codex-rescue Tools=Bash-only structural thrash → n=3 cumulative evidence → promotion-eligible to dedicated rule per `codification-threshold.md` cycle-322 jurisdiction. Recommend forward-only entry in `docs/install-provenance.md` documenting this disposition.

## §5 CR-3 cross-model gate satisfaction status

- Wave 1 Agent A (sota-researcher) — NOT BRIDGE-MODE; verdict origin = Claude-side. Cross-model gate NOT satisfied for A's claims.
- Wave 1 Agent B (codex-rescue ×2) — would have been BRIDGE-MODE; FAILED. Cross-model gate NOT satisfied for any B claims.
- Wave 1 Agent C-redo (sota-researcher fallback) — NOT BRIDGE-MODE. Cross-model gate NOT satisfied.
- **Net**: 0 BRIDGE-MODE verdicts this arc; ≥2 BRIDGE-MODE invariant per `advanced-agent-team-standing-directive.md` invariant #1 NOT MET.
- **Recovery (before Phase 1 commit)**: orchestrator-direct Pattern D codex exec on this synthesis verdict — ~5min wall-clock, satisfies CR-3 Phase 1 bootstrap exception path. Recommend BEFORE any commit lands.

## §6 Total LOC estimate

| Phase | LOC | Source | Risk |
|---|---|---|---|
| 1 (Default-FAIL + evaluator + hooks) | ~250 | cwc-Anthropic-OFFICIAL | Low (well-cited; locally installed) |
| 2 (Planner-Worker + PROGRESS.md) | ~170 | cwc convention + Cursor blog | Med (no template; bootstrap-authoring) |
| 3 (repo-scan pilot) | ~0 + decision doc | everything-claude-code plugin | Low (plugin pre-installed) |
| 4 (tmp/ governance) | DEFERRED | TBD research-beyond | High (Mia OVER caught) |
| 5 (tool-budget + eval-case) | ~110 | Anthropic verbatim + incident-to-eval | Low |
| 6 (cosmetic strengtheners) | ~105 | various inherited cites | Low |
| **Total (active)** | **~635 LOC across 5 phases / 3-4 session arcs** | mixed | mixed |

## §7 Next steps (operator decision)

1. **Run orchestrator-direct Pattern D codex exec** for Wave 1 synthesis cross-model gate satisfaction (~5min wall; required before Phase 1 commit per CR-3)
2. **Phase 1 ship candidate**: install cwc evaluator.md → wire 5 cwc hooks → codify default-fail-contract.md rule (3 commits)
3. **Phase 2 ship candidate** (after Phase 1): author PROGRESS.md template + codify planner-worker-handoff.md rule
4. **Phase 3 ship candidate** (parallel-okay): verify everything-claude-code plugin → invoke repo-scan on tmp/ → write triage decision rationale
5. **Defer**: Phase 4 (tmp/ governance via research-beyond), Phase 5-6 (strengthening passes)
6. **Queue for next arc**: Agent B meta-skills audit via orchestrator-direct Pattern D

## §8 Honorable mentions (deferred from Wave 1)

- **G5 Tool Search Lazy Loading** — Axis-2 PARTIAL (needs ≥2 cross-org dated artifact); defer next arc
- **ARIS research-wiki typed-graph schema** — P3 future, post Phase 1+2 land
- **G9 Adaptive fan-out controller** — STUDY-PILOT-FUTURE (axis-1 maturity)
- **G10 Subject hygiene** — single-source Axis-1 INSUFFICIENT
- **G8 Declarative topology** — REJECTED (DUPLICATE-FUNCTIONALITY with frontmatter)

## §9 Cite-import-AMBER ratification

Per `Z:/claude-sota-installed/CLAUDE.md §Section 14.5` cite-import-AMBER from sibling: this synthesis preserves cite trail to sibling-rule content via session-context inheritance block (TIER-2 cite-only; no on-disk source visible from this worktree). New runtime-local rules in Phases 1-2 establish their own TIER-1-DIRECT cite anchors to upstream cwc-long-running-agents + Anthropic blogs + awesome-agentic-patterns (no dependency on sibling existence).

---

VERDICT: Wave 1 SYNTHESIS COMPLETE. 7 active improvements across Phases 1-3+5+6 (~635 LOC, 3-4 session arcs); 1 DROPPED per Mia OVER (Phase 4 tmp/ governance — Mia caught sibling-import-blocked); 1 DEFERRED per FM-17 (Agent B meta-skills audit — orchestrator-direct Pattern D queued for next arc). Cross-model gate (CR-3) NOT satisfied this arc — orchestrator-direct Pattern D recommended BEFORE Phase 1 commit. Top-pick for next ship = Phase 1 (Default-FAIL contract + cwc evaluator install) — Anthropic OFFICIAL primitive verified locally installed at `.local/cwc/` AND in upstream `Z:/repos/deps/cwc-long-running-agents/` ready for `.claude/` integration.
