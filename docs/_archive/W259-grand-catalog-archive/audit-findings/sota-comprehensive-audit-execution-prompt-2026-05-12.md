# SOTA Comprehensive Audit + Adoption Execution Prompt — claude-sota-installed

> **Operator usage**: this file is the definitive prompt for a fresh `eee` session to execute the multi-fire SOTA audit + adoption arc requested 2026-05-12. Run the **Operator pre-flight** block first, then paste the **Mission Prompt** block into a fresh CC session in the new worktree.

## Cite anchors (TIER-1-DIRECT — NOT sibling-derived; per cardinal-rule-1)

- **Anthropic CC long-running-agent runtime**: `Z:/repos/deps/cwc-long-running-agents @ HEAD ffd563d668a97a38d4aa092bf0d5b1507c046629` [VERIFIED 2026-05-12] — Default-FAIL contract / Fresh-context evaluator / PROGRESS.md handoff / Kill-switch / Steer mid-run
- **CCBP cross-model workflow**: `Z:/repos/deps/claude-code-best-practice-shan/development-workflows/cross-model-workflow/cross-model-workflow.md:1-48 @ HEAD 48f2cebeb88b389b27231c418ceadb65baf813fd` [VERIFIED 2026-05-12]
- **OpenAI codex worktree runtime**: `Z:/repos/deps/codex/codex-rs/git-utils/src/info.rs:618-654 @ HEAD 993e3f407ea8213f7d32cb9367ae7616b7e15b4a` [VERIFIED 2026-05-04]
- **Anthropic CC sub-agents**: `https://code.claude.com/docs/en/sub-agents`
- **Anthropic CC settings**: `https://code.claude.com/docs/en/settings`
- **Anthropic CC scheduled tasks**: `https://code.claude.com/docs/en/scheduled-tasks`
- **Karpathy 4 principles** (TIER-1-DIRECT): `Z:/repos/deps/andrej-karpathy-skills/CLAUDE.md:7-61 @ HEAD 2c606141936f1eeef17fa3043a72095b4765b9c2`
- **Addy Osmani 4th-org reinforcement** (TIER-1-NAMED-AUTHOR-QUOTE): `Z:/claude-sota-installed/.claude/plugins/marketplaces/addy-agent-skills/skills/source-driven-development/SKILL.md @ 742dca5` — "Every framework-specific code decision must be backed by official documentation."

## Operator pre-flight (run ONCE before pasting Mission Prompt)

```bash
# 1. Verify cron `81bd1a59` paused (FM-02 race defense per parallel-session-worktree-isolation.md)
#    EITHER explicit kill: CronDelete 81bd1a59
#    OR wait for natural idle (15+ min no commits to Z:/claude-sota-installed)
git -C Z:/claude-sota-installed log -3 --oneline

# 2. Create isolated worktree per parallel-session-worktree-isolation.md MUST-rule
cd Z:/claude-sota-installed
eee --worktree sota-audit-2026-05-12

# 3. (Optional) confirm Tier 0 + Tier 1a INSTALLED status before launching
# Open `docs/sota-installed-manifest.md` §Section 0/1/2; verify INSTALLED rows
# If Tier 1a (codex T1-T7 hooks) shows PLANNED/AMBER, Mission Prompt's Fire 0 handles install
```

## Pre-existing runtime drift to address in Fire 0 (per `/context-mode:diagnose` 2026-05-12 findings)

| # | Drift class | Cite | Severity |
|---|---|---|---|
| H1 | MEMORY.md = 2.1 MB / 604 lines / 279 entries × avg 7,462 chars (50× over per-entry budget) | this session's diagnose Phase 4 | **CRITICAL** — violates auto-memory mandate "Keep index entries to one line under ~150 characters" |
| H2 | install-provenance.md = 2.1 MB / 23,522 lines / max single entry 113,207 chars | this session's diagnose Phase 4 | **CRITICAL** — violates CLAUDE.md L342-344 "append-only install log" intent |
| H3 | 27 untracked `.claude/rules/*.md` differ from sibling claude-sota; cite-class unverified per CR-12 | git status + diff probe | HIGH — CR-12 HONEST-NON-FINDING gate not satisfied |
| H5 | ≥3 HIGH-severity codex T3 verdicts unresolved 45-120+ min (`e3dcc443` plugin manifest / `0346ebf4` auth-flag / `4a7696b9` architect.md sibling-install) | `.claude/state/codex_review_HEAD_*.txt` | **HARD-DENY blocker** per `closed-loop-recursive-narrowing.md §Severity gate` |
| H6 | Pattern A recursive chain (arc #7 at round 3 of 5; each fix-forward generates new T3 finding) | memory iter ~171/~172/~174 | **Round-5 cap imminent** — REVERT-AND-REMOVE eligible per §Outcome B |
| H7 | 6 rule/CLAUDE.md files exceed CC runtime 40k char per-file load budget: `team-orchestration.md` 80.0k (2.0×) / `cross-model-consensus.md` 62.7k (1.57×) / `CLAUDE.md` 62.1k (1.55×) / `codex-t1-fix-forward-pattern.md` 43.9k / `agent-harness-fit-verification.md` 40.8k / `layered-gates-architecture.md` 40.6k | CC runtime `/memory` warning emitted 2026-05-12 | **HIGH** — every session-start load incurs perf penalty across these 6 surfaces |

## ═══════════════ MISSION PROMPT (paste into fresh session) ═══════════════

> ⚠️ **PASTE EVERYTHING FROM HERE TO `═══ END MISSION PROMPT ═══` INTO A FRESH `eee` SESSION IN THE NEW WORKTREE.**

You are the **orchestrator** for a 5-fire SOTA audit + adoption arc on claude-sota-installed. **Apply cardinal rules 1-12 from `CLAUDE.md` strictly.** Use `superpowers:using-superpowers` 1% rule and `addy-agent-skills:using-agent-skills` for skill discovery.

### Standing directives (apply every fire)

1. **Mia pre-apply per `Z:/claude-sota/.claude/rules/mia-pre-apply.md`** on every agent prescription before Edit.
2. **FM-19 ARTIFACT-INLINE per `Z:/claude-sota/.claude/rules/fm19-readonly-guard-sidestep.md`** in every Bash-only / no-Write agent brief.
3. **FM-17.d defense per `Z:/claude-sota/.claude/rules/fm17-subagent-fleet-depletion.md §FM-17.d`** — every BRIDGE-MODE codex agent brief MUST budget per-call codex time (default 90s, cap 120s, 180s only with explicit reason).
4. **FM-02 + git-cli-grammar discipline** — atomic single-shell `git add -- <pathspec> && git commit --only -F <msg> -- <pathspec>` per `Z:/claude-sota/.claude/rules/git-cli-grammar-discipline.md`.
5. **CADP cache-aware dispatch per `Z:/claude-sota/.claude/rules/parallel-agent-wave.md §CADP`** — max 3 concurrent until `python Z:/claude/ccc/tools/status.py` confirms ≥50% cache rate.
6. **TIER-1-DIRECT cite mandate per cardinal-rule-1** — every adoption verdict cites `Z:/repos/deps/<repo>/file:line @ HEAD <SHA>` OR official docs URL with anchor.
7. **Severity gate per `closed-loop-recursive-narrowing.md`** — STOP arc at round 5; HIGH unresolved = hard-deny on ACCEPT-WITH-DOC.
8. **Probe DAG 1-7 per `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md`** on every adoption candidate (P1 LICENSE / P2 registry-existence / P3 plugin-namespace / P4 GraphQL stars / P5 README / P6 deep audit / P7 demand-gate).
9. **Per cardinal-rule-3 Phase 1 bootstrap exception** — until Tier 1a INSTALLED, T1/T2/T3 cross-model gate satisfied by orchestrator-side `codex exec` foreground+tee (Path P per `codex-t1-fix-forward-pattern.md §Pattern D`) OR REAL GPT-5.5 BRIDGE-MODE subagent dispatch.

### Fire 0 — Pre-arc remediation (BLOCKING; must clear before Fire 1)

**Goal**: clear the 5 drift classes (H1-H6) from Pre-existing-runtime-drift block above so audit work doesn't recurse on contaminated trail.

1. **H5 — Resolve 3 HIGH T3 OPEN findings.** For each of `e3dcc443` / `0346ebf4` / `4a7696b9`:
   - Read verdict body from `.claude/state/codex_review_HEAD_<sha>.txt`
   - Decide per `closed-loop-recursive-narrowing.md §Outcome B/C`: REVERT-AND-REMOVE OR MANUAL-OVERRIDE with explicit `[OVERRIDE]` marker in commit body
   - Atomic commit per finding
2. **H6 — STOP arc #7 at round 3 (don't continue Pattern A chain).** Document arc state in `tmp/sota-audit-fire0-arc7-stop-2026-05-12.md` with current trajectory (rounds 1-3 verdicts) + chosen disposition.
3. **H1 — Trim MEMORY.md to ≤200 lines / ≤150 chars per entry.** Procedure:
   - `cp .claude/projects/Z--claude-sota-installed/memory/MEMORY.md .claude/projects/Z--claude-sota-installed/memory/_archive/MEMORY-snapshot-2026-05-12.md` (preserve full log)
   - Extract each event-log entry to a topic file (`feedback_*.md` / `reference_*.md`) per the auto-memory naming convention
   - Rewrite MEMORY.md as one-line index: `- [Title](file.md) — one-line hook` per system prompt mandate
   - Regression test: `[ $(wc -l < MEMORY.md) -lt 200 ] && [ $(awk '{print length}' MEMORY.md | sort -n | tail -1) -lt 200 ]`
4. **H2 — Trim install-provenance.md.** Procedure:
   - `mv docs/install-provenance.md docs/_archives/install-provenance-2026-05-12-full-snapshot.md`
   - Create new `docs/install-provenance.md` with canonical entry shape: `## YYYY-MM-DDTHH:MMZ — <event> (Wave N fire M)` + ≤20 LOC body (section / command / cite / smoke probe outcome / linked tmp/wave*.md for detail)
   - Backfill only the **most recent 30 install events** in canonical shape; reference the snapshot for full history
5. **H3 — Audit 27 untracked rules.** For each `.claude/rules/<name>.md`:
   - `diff` against `Z:/claude-sota/.claude/rules/<name>.md`
   - Classify: (a) byte-identical → cite-import-AMBER per Section 14.5 with HNF evidence; (b) path-rewritten (sibling `Z:/claude-sota/` → eee-local) → cite-import-AMBER with documented adaptation; (c) divergent semantic → either intentional adaptation (commit with cite trail) OR delete-and-revert-to-sibling
   - Atomic commit batch (one per cite-class group), narrow `--only -- <pathspec>` form

6. **H7 — Trim 6 oversized rule/CLAUDE.md files to ≤40k chars each.** Per-file procedure:
   - `cp <file> .claude/rules/_archives/<basename>-snapshot-2026-05-12.md` (preserve full text)
   - For each file, identify trim targets per §Trim strategy (below); apply Edit per cardinal-rule-1 cite-trail discipline (codex T1 Path P foreground+tee before each edit per CR-3 Phase 1 bootstrap exception)
   - Regression test per file: `[ $(wc -c < <file>) -lt 40960 ]` (40k char ceiling)
   - **§Trim strategy** (≤200 LOC budget per fire per `codification-threshold.md`):
     - (a) **Historical evidence ladders** (n=N occurrence tables spanning multiple waves) → archive to `_archives/<rule>-evidence-ladder-2026-05-12.md` + leave ≤3 most-recent rows + cite pointer to archive
     - (b) **Stale provenance blocks** (cycle-N port narratives, TIER-3 evidence trails not load-bearing for current rule body) → archive + pointer
     - (c) **Duplicate cite headers** (>3 TIER-1 anchors for the same claim) → keep top-3 highest-tier; demote rest to inline cite
     - (d) **Sub-class taxonomy explosions** (FM-XX.a/.b/.c/.d/.e/.f when most sub-classes are now MERGED or DEPRECATED) → collapse to active set + cite to archive
     - (e) **Recursive promotion-fire dogfood notes** spanning multiple waves → keep first-promotion note + cite ladder, archive rest
     - (f) **Anti-pattern lists** beyond top-10 → archive low-frequency anti-patterns
   - **DO NOT remove load-bearing content** (cardinal-rule cites, active mechanism descriptions, current discipline statements, sister-rule integration pointers) — these are the rule's reason for existing
   - **Priority order** (largest-first per CC perf impact):
     1. `team-orchestration.md` 80k → ≤40k (50% reduction; archive Sister-framework + Selectively-vendored historical sections per `kiss-dry-yagni.md` Must-Never #4)
     2. `cross-model-consensus.md` 62.7k → ≤40k (36% reduction; archive Wave 17 fire-31/32 codification provenance + §Section Authority Map historical commits)
     3. `CLAUDE.md` 62.1k → ≤40k (36% reduction; **special handling — bootstrap file per cardinal-rule-5**; archive verbose cite-trail blocks per cardinal rule, keep imperative discipline statements)
     4. `codex-t1-fix-forward-pattern.md` 43.9k → ≤40k (9% reduction; trim Pattern A+B+C+D historical evidence ladders to top-3 rows each)
     5. `agent-harness-fit-verification.md` 40.8k → ≤40k (2% reduction; trim Probe 7.b case-study expansion + Codex-rescue blind-spot specialization evidence ladder)
     6. `layered-gates-architecture.md` 40.6k → ≤40k (2% reduction; trim §Section Authority Map historical commits)

**Fire 0 deliverables**: 10-15 commits (4-6 for H1-H6 + 6 for H7 per-file trim) + `tmp/sota-audit-fire0-drift-cleared-2026-05-12.md` close-synthesis citing each H1-H7 disposition + regression-test PASS for H1 + H2 + H7 (all 6 files < 40k chars).

### Fire 1 — Discovery + percentage audit (advanced agent team)

**Goal**: deliver definitive percentage of architecture audited against SOTA + ranked adoption queue.

**Agent team (5-agent fan-out per `advanced-agent-team-standing-directive.md`)**:

```
Agent A — sota-researcher (Sonnet stand-in if env-funneled; STAND-IN-NOTICE per cross-model-consensus.md)
  task: 9-cohort SOTA discovery across the 16 listed repos; Probe DAG 1-7 per candidate
  scope: deep-read README + skill/agent/hook inventory + license + axis-1+2+3 verdict + cohort-coverage
  output: tmp/sota-audit-fire1-agentA-2026-05-12.md (ARTIFACT-INLINE per FM-19)
  OUTPUT_BUDGET: max 800 LOC
  TERMINATION: on_handoff_to: orchestrator | max_turns: 25 | terminationCondition: on_text_match: "VERDICT:"

Agent B — everything-claude-code:architect (per-folder per-file architecture audit)
  task: enumerate every code/cite/install-class artifact in claude-sota-installed; classify per CR-8 lattice
  scope: .claude/{agents,skills,hooks,rules,commands} + scripts/ + tools/ + bin/ + docs/ + .mcp.json + settings.json
  output: tmp/sota-audit-fire1-agentB-2026-05-12.md (ARTIFACT-INLINE per FM-19)
  OUTPUT_BUDGET: max 600 LOC
  TERMINATION: on_handoff_to: orchestrator | max_turns: 30

Agent C — codex-rescue BRIDGE-MODE → real GPT-5.5 (deep-dive archaeology)
  task: cross-arc hotspot / bus-factor / bug-magnet analysis on top-10 most-edited surfaces
  brief: explicit per-call codex 120s budget (FM-17.d defense); ARTIFACT-INLINE mandate
  output: real GPT-5.5 codex CLI verdict
  OUTPUT_BUDGET: max 600 LOC
  TERMINATION: on_handoff_to: orchestrator | max_turns: 20 | on_text_match: "ARCHAEOLOGY:" | on_subprocess_failure: 3

Agent D — gpt5-reviewer BRIDGE-MODE → real GPT-5.5 (adversarial)
  task: adversarial review of Agent A discovery + Agent B audit
  brief: explicit per-call codex 120s budget (FM-17.d defense); ARTIFACT-INLINE mandate
  output: real GPT-5.5 cross-check verdict
  OUTPUT_BUDGET: max 400 LOC
  TERMINATION: on_handoff_to: orchestrator | max_turns: 15 | on_text_match: "VERDICT:"

Agent E — probe-dag-verifier (Mia pre-apply enforcer)
  task: Probe DAG 1-7 on every top-10 adoption candidate Agent A surfaces
  output: tmp/sota-audit-fire1-agentE-2026-05-12.md (ARTIFACT-INLINE per FM-19)
  OUTPUT_BUDGET: max 500 LOC
  TERMINATION: on_handoff_to: orchestrator | max_turns: 25
```

**Orchestrator-side Path P codex T1** (REAL GPT-5.5 via foreground+tee per `codex-t1-fix-forward-pattern.md §Pattern D`):

```bash
timeout 300 codex exec --skip-git-repo-check --color never \
  < .claude/state/codex_consult_sota_audit_fire1_synthesis.txt \
  2>&1 | tee .claude/state/codex_consult_sota_audit_fire1_synthesis_OUT.txt
```

**Fire 1 deliverables**:
- Discovery report at `tmp/sota-audit-fire1-discovery-close-2026-05-12.md`
- **Coverage percentages emitted**: token-instance level + per-folder classification level + CR-8 conformant level (3 axes)
- Ranked adoption queue (top-15 install candidates + top-10 cite-extensions + REJECT-FOR-FIT list)
- 4 Mia pre-apply catches minimum (Agent E against Agent A) — recorded with verbatim quotes
- 1 atomic commit (per cycle-300 ONE-LOGICAL-UNIT-PER-FIRE)

### Fire 2 — Adversarial review (GPT-5.5 dual-voice)

**Goal**: GPT-5.5 audits every dimension surfaced in Fire 1.

```
Voice 1 — orchestrator codex Path P (DEFAULT profile foreground+tee):
  prompt: AXIS-1 cite-trail correctness / AXIS-2 install-priority ordering / AXIS-3 cleanup target severity
  output: real GPT-5.5 deep-review verdict at .claude/state/codex_consult_sota_audit_fire2_voice1_OUT.txt

Voice 2 — orchestrator codex Path P (deep-review-exec profile foreground+tee):
  prompt: same 3 axes; second adversarial pass on Voice 1 verdict
  output: real GPT-5.5 deep-review verdict at .claude/state/codex_consult_sota_audit_fire2_voice2_OUT.txt
```

**Triple-voice convergence per `codex-t1-fix-forward-pattern.md §Pattern A`**: if both voices APPROVE conf≥0.85 → ship as-is; if NEEDS-REVISION → apply prescribed_edits in single atomic Pattern A fix-forward commit.

**Fire 2 deliverables**: 1 atomic commit (Pattern A fix-forward) + `tmp/sota-audit-fire2-adversarial-close-2026-05-12.md` close-synthesis citing both voice verdicts.

### Fire 3 — Cleanup (stale references + dead hooks)

**Goal**: clean up stale references / dead hooks / phantom cites across the runtime.

**Methodology** (per `.claude/rules/deprecation-discipline.md` — TIER-1-DIRECT @ addy-agent-skills `deprecation-and-migration/SKILL.md:10-12 @742dca5`): apply the **5-question gate** (unique value / consumer count / replacement / migration cost / cost-of-not-deprecating) to every cleanup target; **default to advisory** deprecation (parallel-deploy + telemetry + cutover + removal); compulsory only when security/contract/blocking. Hyrum's Law: every observable behavior is depended on — `mcp__github__search_code` + `grep -rl <symbol>` BEFORE removal. Churn Rule: surface owner = migration owner.

**Targets** (derived from Fire 1 Agent B audit):

1. **Phantom-cite-to-disabled-MCP** per FM-16 META-router — grep `mcp__<server>__*` cites in rules/skills/agents/commands; cross-check against `.mcp.json:disabledMcpjsonServers`.
2. **Stale FORWARD-REF labels** per `port-note-discipline.md §3 Discipline 2` — grep `FORWARD-REF.*pending P[0-9]` across all rules; for each, check if the target has shipped; rewrite or retire.
3. **Deprecated section blocks** in `docs/sota-installed-manifest.md` — identify HISTORICAL / DEPRECATED / superseded sections; archive to `docs/_archives/`.
4. **Backup files** — `.claude/settings.json.pre-fire45-fix`, `.claude/settings.json.pre-pythonw-fix`, `tools/eee.ps1.pre-fire46-fix`, `bin/eee-backup.cmd`, `tools/eee-backup.ps1` — verify safe to delete (no consumer); delete or archive.
5. **Stale next-session-plan docs** — `docs/wave119-next-session-plan.md`, `docs/wave120-next-session-plan.md`, `docs/wave121-next-session-plan.md` — review for current relevance; archive or delete.
6. **`__pycache__` clutter** — confirm `.gitignore` excludes; commit any missing rule.

Per cleanup batch: atomic narrow `--only` commit per FM-02 race defense.

**Fire 3 deliverables**: 5-8 cleanup commits + `tmp/sota-audit-fire3-cleanup-close-2026-05-12.md` close-synthesis with cleanup diff statistics.

### Fire 4 — Install adoption (top-N from Fire 1 queue)

**Goal**: install / cite-import top SOTA candidates per cardinal-rule-12 lattice (PRIMARY upstream-install > SECONDARY cite-anchor > TERTIARY cite-import-AMBER).

**Per-candidate install procedure**:

1. **Probe DAG 1-7 PASS** per `agent-harness-fit-verification.md` (re-verify from Fire 1)
2. **Apply cardinal-rule-9 install-risk discipline**:
   - Version-pin all `@latest` OR mark `@latest-acknowledged-D6-risk`
   - Pre-cite-import REVERT check (`git -C Z:/claude-sota log --all --oneline -- '<sibling-target-path>'`)
   - Sibling-bleed defense (path-rewrite `Z:/claude-sota/` → `Z:/claude-sota-installed/` in all install-class content)
3. **Apply cardinal-rule-6 official-native-channel**:
   - `npm install -g <pkg>@<version>` / `/plugin install <pkg>@<marketplace>` / `gh release download` / `git clone https://github.com/<owner>/<repo>.git`
   - Verify smoke-probe per the row's expected outcome in `docs/sota-installed-manifest.md` §Section 17
4. **Update manifest** — add INSTALLED row to `docs/sota-installed-manifest.md` with CR-8 conformance marker
5. **Append install-provenance entry** in canonical ≤20 LOC shape (per Fire 0 H2 cleanup)
6. **Atomic commit per install** per cycle-300 ONE-LOGICAL-UNIT-PER-FIRE

**Suggested install order** (re-validate from Fire 1 verdict; this is seed-list only):

| Priority | Candidate | Source | Cite class | Why |
|---|---|---|---|---|
| 1 | superpowers (if not already at HEAD) | `/plugin install superpowers@claude-plugins-official` | TIER-1-DIRECT Anthropic official marketplace | brings 13 workflow-grammar skills (brainstorming / TDD / verification / requesting-code-review / etc.) |
| 2 | mattpocock/skills review | `Z:/repos/deps/mattpocock-skills @ HEAD <SHA>` cite-anchor | TIER-1-NAMED-AUTHOR-QUOTE | named-failure-modes pattern + book-cited disciplines |
| 3 | wshobson/agents review | upstream marketplace OR cite-anchor | TIER-1-DIRECT | 80-plugin / 185-agent / 153-skill catalog (per Wave 138 Fire 1 verdict) |
| 4 | gsd-build/get-shit-done study | cite-anchor only (REFERENCE-class) | TIER-2 reference | meta-prompting + context-engineering patterns |
| 5 | hesreallyhim/awesome-claude-code review | cite-anchor (CC-BY-NC-ND license = cite-only) | TIER-2 catalog | 226 resource cross-references for ecosystem discovery |
| 6 | quemsah/awesome-claude-plugins review | cite-anchor | TIER-2 catalog | plugin discovery surface (Wave 134+ already partial-adopt) |
| 7 | AsyncFuncAI/deepwiki-open | npm/clone if applicable | OPERATIONAL-CLAIM verify | local DeepWiki for cited-deps Q&A |
| 8 | abhigyanpatwari/GitNexus | check `docs/gitnexus-deep-probe-W160-F10-2026-05-12.md` for current verdict | OPERATIONAL-CLAIM | architecture intelligence MCP |
| 9 | Shubhamsaboo/awesome-llm-apps | cite-anchor catalog | TIER-2 | LLM app pattern reference |
| 10 | alirezarezvani/claude-skills | review for selective vendoring | TIER-2 | 235 skills + 28 agents (Wave 144 candidate verify) |

**Fire 4 deliverables**: 3-7 atomic install commits + `tmp/sota-audit-fire4-installs-close-2026-05-12.md` close-synthesis with INSTALLED rows added to manifest + provenance entries appended.

### Closing — final arc deliverables

After Fires 0-4 complete:

1. **Coverage percentage report** at `docs/sota-coverage-2026-05-12.md`:
   - Token-instance level % of TIER-1-DIRECT cites in rules / agents / skills / commands
   - Per-folder classification % conformant per CR-8 lattice
   - Per-cardinal-rule conformance %
   - 4-axis convergence-gate PASS rate
2. **Health-check JSONL** at `.claude/state/sota_audit_health_2026-05-12.jsonl`:
   - Per-installed-row: smoke-probe outcome + cite-anchor verified + axis-3 stability band
   - Drift signals (cardinal-rule-9 install-risk indicators)
3. **MEMORY.md update** (post-trim per Fire 0 H1):
   - Add one-line entry: `- [SOTA audit + adoption arc 2026-05-12](feedback_sota_audit_2026_05_12.md) — 5-fire arc; X% coverage; N installs; M cleanups`
4. **Final commit** (cardinal-rule-3 Phase 1 bootstrap exception): orchestrator-direct foreground+tee codex T1 verdict on the entire arc state before declaring complete.

### Anti-patterns to avoid (per `Z:/claude-sota/.claude/rules/synthesis-layer-verify.md §Reporting categories`)

- **Trust agent prescription verbatim** without Mia pre-apply probe — refuted at n=29+ ladder
- **Commit during cron-active state** without `--only -- <pathspec>` narrow form — FM-02 race guaranteed
- **Skip Probe DAG for a "well-known" candidate** — Wave 112 Ship A1+2CC archaeology caught 5 shadow-install OVERs from PATH-only probe at n=36 ladder
- **Promote sibling claude-sota as TIER-1** — refuted at cardinal-rule-1; sibling is TIER-3-LOCAL-OPERATOR-DERIVED per `citation-discipline.md` rule #8
- **Recursive Pattern A chain past round 5** — refuted at `closed-loop-recursive-narrowing.md §Stop criteria` round-5 ceiling
- **Bundle multi-axis design surface in one T1** — refuted at `cross-model-consensus.md §Profile selection rule` Pattern B HNF
- **Async-gate satisfaction before evidence** — recurring T3 catch at `c0c0d8b7` / `3f777a69` / `918ec860` (3-of-3 same-pattern, cycle-322 PROMOTED at iter ~171)
- **Sibling-provenance as rules live-path** — `79d73fcb` T3 catch; per CR-9 sibling-bleed defense

### Docker permissions (per user directive 2026-05-12 "sota premission to invoke all docker command")

Operator confirms unrestricted `docker` invocation needed for Fire 4 (Memory Stack L2 Qdrant / Graphiti L3 FalkorDB container management). Recommend: do NOT add to safety_guard.py deny-list; do NOT add to bash_command_allowlist (removed Wave 11A per layered-gates-architecture.md §4.1). `defaultMode: "bypassPermissions"` per current Wave 82d override is the right mode for Fire 4 — explicit + transparent. If operator later reverts to `auto`, re-evaluate per CR-7 Phase 2 trigger predicate.

### Cite-class for this prompt itself

`constituents=[TIER-1-DIRECT @ Anthropic CC cwc-long-running-agents + sub-agents docs + settings docs + scheduled-tasks docs + Z:/repos/deps/codex/codex-rs/git-utils/src/info.rs:618-654 @ 993e3f40 + Z:/repos/deps/claude-code-best-practice-shan/development-workflows/cross-model-workflow/cross-model-workflow.md:1-48 @ 48f2ceb + Z:/repos/deps/andrej-karpathy-skills/CLAUDE.md:7-61 @ 2c606141, TIER-1-NAMED-AUTHOR-QUOTE @ addy-agent-skills/source-driven-development/SKILL.md, TIER-2 @ multiple sibling claude-sota rule cite-imports (mia-pre-apply / fm17-subagent-fleet-depletion §FM-17.d / fm19-readonly-guard-sidestep / advanced-agent-team-standing-directive / git-cli-grammar-discipline / parallel-agent-wave §CADP / agent-harness-fit-verification / closed-loop-recursive-narrowing / codex-t1-fix-forward-pattern §Pattern A+D / synthesis-layer-verify §Reporting categories / port-note-discipline §3 / fm20-path-drift-cascade), TIER-3-LOCAL-OPERATOR-DERIVED @ 2026-05-12 diagnose Phase 4 H1-H6 findings]; effective_tier=TIER-3-LOCAL-COMPOSITION` per `citation-discipline.md` rule #8 MIN_PRECEDENCE.

═══ END MISSION PROMPT ═══

## Operator follow-up checklist (after Mission Prompt completes)

- [ ] Fire 0 H1 regression test PASS: `wc -l MEMORY.md` < 200
- [ ] Fire 0 H2 regression test PASS: `wc -l install-provenance.md` < 2000
- [ ] Fire 0 H5: all 3 HIGH T3 verdicts have explicit closed-loop disposition recorded
- [ ] Fire 0 H3: every untracked rule has a commit OR documented adaptation rationale
- [ ] Fire 0 H7 regression test PASS: all 6 oversized rule/CLAUDE.md files < 40960 chars (`for f in .claude/rules/team-orchestration.md .claude/rules/cross-model-consensus.md CLAUDE.md .claude/rules/codex-t1-fix-forward-pattern.md .claude/rules/agent-harness-fit-verification.md .claude/rules/layered-gates-architecture.md; do echo "$f $(wc -c < $f)"; done`)
- [ ] Fire 1: coverage percentage published at `docs/sota-coverage-2026-05-12.md`
- [ ] Fire 2: dual-voice GPT-5.5 verdicts converge (or single Pattern A apply lands)
- [ ] Fire 3: backup files deleted or archived; stale plans archived
- [ ] Fire 4: ≥3 SOTA installs land with smoke-probe PASS + manifest update
- [ ] MEMORY.md final entry < 200 chars indexed to feedback file
- [ ] Final orchestrator-direct codex T1 verdict on arc-state passes
- [ ] Cron `81bd1a59` resumed (if previously paused) with refreshed prompt per FM-21 queue-time-prompt-freeze defense

## Re-evaluation triggers

Re-evaluate this prompt when:
- A 17th SOTA repo emerges as load-bearing for the architecture
- Cardinal-rule-7 advances to Phase 2 (Tier 1a INSTALLED) — Fire 0 H5 simplifies
- A 8th drift class emerges in next /context-mode:diagnose run (H7 was added 2026-05-12 mid-prompt-authoring per CC runtime perf warning)
- Anthropic CC ships `/plugin install` for an entire 16-repo bundle that obviates Fire 4 per-candidate workflow
- A 2nd FM-20 cascade catches sibling-bleed in this prompt's cite trail — apply Pattern A fix-forward to rewrite the offending cite as immutable upstream-anchor

---

**Prompt authoring discipline note**: this file is a single-source-of-truth artifact. Do NOT version-bump in place — create a new dated file (`docs/sota-comprehensive-audit-execution-prompt-2026-05-NN.md`) for any subsequent arc per `port-note-discipline.md §6` no-historical-rewrite mandate.
