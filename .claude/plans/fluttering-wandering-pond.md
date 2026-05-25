# SOTA architecture audit + cleanup + install-convergence mega-wave

## Context

User directive 2026-05-12 (verbatim, after closing the codification fire that shipped commits `2f971597` + `7cb64a06`):

> "optimize all with sota references, deep dive into sota references repos, all must be full sota official and clean ... clean up all the staled references, hooks, rules, all dimensions, layers improve with full sota references ... give me detailed plan for claude code cli, i will tell him to run, with sota skills and agents ... deep dive into every code in your architecture and give me percentage of been audited, how many percentage are definitive sota reviewed ... start the convergence research and audit, ship with consensus with gpt 5.5 and keep tracking progress ... with sota premission to invoke all docker command"

**Why now**: 
- 6 rule files exceed /doctor 40K-char performance ceiling (top: `team-orchestration.md` 84.3K, `cross-model-consensus.md` 63.7K, CLAUDE.md 60.9K)
- 178 stale-marker mentions across 23/26 rule files (88% drift saturation)
- `docs/sota-installed-manifest.md` W146-F1 Agent A baseline = **61% SOTA-cleanliness** (band 55-65%) — user wants this advanced
- 2 OPEN HIGH-severity T3 findings (auth-enforcement flag + plugin manifest provenance) compounded ~50+ min across 7-fire-streak per MEMORY.md tail (parallel /loop arc `81bd1a59` Fires 7-13)
- 15 SOTA repos listed by user (14/15 present at `Z:/repos/deps/`; deepwiki-open absent — install candidate)
- Total upstream-available primitives across listed repos: ~417 agents / ~727 skills / ~714 commands vs this runtime's current 11 agents / 13 skills / 4 commands

**Intended outcome**: Multi-fire wave plan that Claude CLI can execute against this runtime, advancing SOTA-cleanliness from 61% baseline toward 80%+ via systematic audit + cleanup + install-convergence fires. Each fire bounded per ONE-LOGICAL-UNIT-PER-FIRE (cardinal-rule-5).

## STAND-IN-NOTICE (per cross-model-consensus.md §Env-funneled disclosure mandate)

Plan-phase Explore agent dispatch FAILED twice with FM-17.502 systemic provider 502 unknown-provider on claude-haiku-4-5 (Agents `a94cb3f9d5d1058a7` + `a2ae242038457a2d4`, both 0 tokens/0 tool_uses, 175-181s duration). Per `Z:/claude-sota/.claude/rules/fm17-subagent-fleet-depletion.md §FM-17` recovery: pivoted to **orchestrator-direct Path P analog** for plan-phase research (bounded read-only probes via Bash/Read/Glob/Grep). Cross-model gate satisfaction status: **PARTIAL** — Phase 1 SOTA research conducted orchestrator-direct; execution-phase fires (1-12 below) MUST satisfy CR-3 cross-model gate per their own fire-level T1+T2+T3 lifecycle.

## Recommended approach: 12-fire wave (each fire ONE-LOGICAL-UNIT)

### Fire 1 — SOTA-cleanliness baseline audit refresh

**Goal**: Re-compute current W146-F3 SOTA-cleanliness % across all 18 sections of `docs/sota-installed-manifest.md` + identify drift since W146-F1 Agent A 61% baseline.

**Operations** (READ-ONLY):
1. `grep -cE "INSTALLED|INSTALLED-AMBER|INSTALLED-VIA-SYSTEM-PATH|STAGED|PLANNED|CITE-IMPORT-AMBER|CITE-ONLY|REJECTED-POST-PROBE" docs/sota-installed-manifest.md` per section
2. Apply W146-F3 fractional weights: `INSTALLED=1.0`, `INSTALLED-AMBER/DORMANT/PARTIAL=0.5`, `STAGED/PLANNED/CITE-IMPORT-AMBER=0`, `CITE-ONLY=1.0 (separate denominator)`, `REJECTED-POST-PROBE/HISTORICAL-MACHINE-EXCLUDED=excluded`
3. Disclose: (a) total rows counted, (b) rows excluded, (c) per-class counts, (d) computed weighted %, (e) cite-class chain
4. Compare to W146-F1 baseline 61% + W155 F1-F20 incremental tracking

**Output**: `docs/audit-refresh-W160-F1-2026-05-12.md` + `MEMORY.md` index entry. Compute & cite SOTA-cleanliness % delta.

### Fire 2 — Close 2 OPEN HIGH-severity T3 findings

**Goal**: Address the 2 open T3 findings compounding across 7-fire-streak per MEMORY.md tail.

**Operations**:
1. **Auth-enforcement flag** in `.claude/.claude.json` (T3 finding from `0346ebf4`) — investigate, root-cause, remediate per `Z:/claude-sota/.claude/rules/closed-loop-recursive-narrowing.md §Outcome A/B/C` disposition
2. **Plugin manifest provenance** (T3 finding from `e3dcc443`) — verify each plugin entry has provenance + cite-trail per CR-1
3. T1 codex consult on fix design BEFORE Edit per CR-3 Phase 1 bootstrap exception (foreground+tee)
4. Pattern A fix-forward apply + T2/T3 hooks fire auto

**Output**: 2 commits closing the findings; updates to `.claude/.claude.json` + `docs/sota-installed-manifest.md` §Section 3 plugin provenance.

### Fire 3 — Decompose top-5 oversized rule files

**Goal**: Reduce performance impact from /memory 40K-char warning. Each rule split per ONE-LOGICAL-UNIT-PER-FIRE (5 sub-fires sequenced).

**Targets** (TIER-1-DIRECT verified via `find .claude/rules -exec stat -c "%s %n"`):
| Rank | File | Size | Action |
|---|---|---|---|
| 1 | `team-orchestration.md` | 84.3K | Decompose into focused sub-rules + index pointer |
| 2 | `cross-model-consensus.md` | 63.7K | Extract Phase 1 bootstrap exception + STAND-IN to sister rule |
| 3 | `codex-t1-fix-forward-pattern.md` | 46.5K | Extract Pattern A vs Pattern B vs Pattern D to separate rules |
| 4 | `layered-gates-architecture.md` | 41.8K | Extract Wave 11A historical context + Layer 0-4 to focused sub-rules |
| 5 | `agent-harness-fit-verification.md` | 41.6K | Extract Probe DAG 1-7 sub-classes to per-Probe rules |

**Per sub-fire**: T1 codex consult + Pattern A apply + Mia pre-apply on each split + retain TIER-1 cite-trail verbatim per CR-1 + CR-8 + port-note-discipline §6 forward-only.

**Output**: 5 commits + 5 new focused rule files + 5 modified parent rules (now pointer-only).

### Fire 4 — Trim CLAUDE.md 60.9K → <40K

**Goal**: Extract operator-reference sections from CLAUDE.md per `docs/sota-feature-activation.md` + `docs/operator-path-setup.md` precedent (already extracted; the codification fire that just closed).

**Sections to consider extracting** (read CLAUDE.md current state first; do NOT touch §Cardinal Rules block 1-12):
1. `## Memory Stack` block → `docs/memory-stack-status.md`
2. `## Skill Orchestration Discipline` → `docs/skill-orchestration-discipline.md`
3. `## Intentional divergences` (d) detail → `docs/wave82d-bypasspermissions-override.md`
4. `## Bootstrap-only files` table → `docs/bootstrap-allowlist.md`

**Per extraction**: 1-line pointer remains in CLAUDE.md; full content moves to `docs/<file>.md`; T1 codex consult before each edit per CR-3.

**Output**: 4 commits + 4 new `docs/*.md` files + CLAUDE.md reduced toward <40K target.

### Fire 5 — Stale-marker cleanup pass

**Goal**: Reduce 178 stale-marker mentions across 23/26 rule files. Many are PARENT-ATTRIBUTION from sibling port (legitimate per port-note-discipline §3), some are FORWARD-REF-RETIRED post-resolution (cleanup candidates).

**Operations**:
1. `grep -cE "FORWARD-REF|STATUS-DISABLED|FORWARD-REF-RETIRED|PARENT-ATTRIBUTION" .claude/rules/*.md` per file
2. For each FORWARD-REF marker: probe if target now exists/landed — if YES, retire marker per `Z:/claude-sota/.claude/rules/port-note-discipline.md §3 FORWARD-REF retirement audit`
3. For STATUS-DISABLED-IN-SSS or STATUS-DISABLED-IN-EEE markers: verify status — if PROMOTED/ACTIVATED post-marker, retire
4. PARENT-ATTRIBUTION markers: PRESERVE (legitimate provenance per port-note-discipline §3)

**Output**: N commits (1 per rule-file cleanup, ONE-LOGICAL-UNIT-PER-FIRE) reducing stale-marker count. Estimated reduction: 178 → ~80-100 with PARENT-ATTRIBUTION preserved.

### Fire 6 — Install gap: deepwiki-open (the ONLY absent repo)

**Goal**: Resolve the absent SOTA repo per CR-6 fresh-from-github + CR-12 PRIMARY upstream-install.

**Target**: `https://github.com/AsyncFuncAI/deepwiki-open` — 16,278★ MIT not-archived `main` branch (probed via `gh api`).

**Operations**:
1. Probe DAG P1-P6 per `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md`:
   - P1: LICENSE — MIT (PASS permissive)
   - P2: registry — direct GitHub (PASS)
   - P3: plugin-namespace — verify no `deepwiki-open` already in marketplaces
   - P4: GraphQL stars/bands — 16,278★ axis-3 bands per `Z:/claude-sota/.claude/rules/convergence-gate.md`
   - P5: README/frontmatter audit
   - P6: deep audit (sample 3-5 key files at HEAD)
2. CR-7 disposition per Probe DAG: INSTALL-NOW (clone + cite-pin) OR CITE-IMPORT-ONLY OR RESEARCH-ONLY
3. `git clone --depth 1 https://github.com/AsyncFuncAI/deepwiki-open.git Z:/repos/deps/deepwiki-open/` + pin HEAD SHA in `PINS.json` per cardinal-rule-9 install-risk discipline
4. T1 codex consult on Probe DAG outcome + manifest row addition

**Output**: 1 commit + `Z:/repos/deps/deepwiki-open/` cloned + manifest §Section X row + `PINS.json` entry.

### Fire 7 — Plugin-namespace audit (Probe 4 dimension across all 15 repos)

**Goal**: Identify primitives in this runtime's `.claude/agents/`, `.claude/skills/`, `.claude/commands/` that DUPLICATE marketplace-delivered primitives per `Z:/claude-sota/.claude/rules/kiss-dry-yagni.md` Must-Never #4 + `agent-harness-fit-verification.md` Probe 4.

**Operations**:
1. Enumerate `.claude/plugins/marketplaces/` per-plugin: `claude-plugins-official` (superpowers / skill-creator / agent-sdk-dev / etc.) + `everything-claude-code` (455 skills + 176 agents per ECC counts) + `addy-agent-skills` (21 engineering-phase skills) + 8 other marketplaces
2. Cross-reference each local primitive in `.claude/{agents,skills,commands}/` with marketplace-delivered equivalents
3. Identify DUPLICATE-FUNCTIONALITY candidates (per Must-Never #4)
4. For each duplicate: classify as RETIRE-LOCAL (delegate to marketplace) / KEEP-LOCAL-WITH-CITE-IMPORT-RATIONALE / RECONCILE
5. T1 codex consult on retire decisions per CR-3

**Output**: Audit report + N commits (one per primitive retirement) + manifest updates.

### Fire 8 — Advanced agent team: line-by-line ECC + CCBP comparison

**Goal**: Per user explicit directive "deep dive line by line and compare your architecture with it". Per `Z:/claude-sota/.claude/rules/advanced-agent-team-standing-directive.md` Wave 24-D mandate: every non-trivial fire spawns 3-5 agent team via GPT-5.5 BRIDGE-MODE.

**Agent team dispatch** (per `parallel-agent-wave.md §CADP` rule 2 — max 3 concurrent unless cache ≥50%):
- **Agent A** (sota-researcher Sonnet stand-in): ECC line-by-line audit — every primitive at `Z:/repos/deps/everything-claude-code/`, identify what's already wired in `.claude/plugins/marketplaces/everything-claude-code/`, recommend additional cite-imports
- **Agent B** (codex-rescue BRIDGE-MODE → real GPT-5.5): CCBP line-by-line audit — every cite-anchor at `Z:/repos/deps/claude-code-best-practice-shan/`, verify all CCBP cites in this runtime's rules are still valid at HEAD `48f2ceb`
- **Agent C** (gpt5-reviewer BRIDGE-MODE → real GPT-5.5): adversarial review of Agent A + B findings, OVER detection per `synthesis-layer-verify.md §Reporting categories`

**Brief discipline** (per advanced-agent-team-standing-directive invariants 1-8):
- TIER-1-DIRECT cites at file:line + HEAD SHA in every brief
- Per-call codex time-budget 90s default / 120s cap / 180s only with explicit reason (FM-17.d defense per Wave 44)
- ARTIFACT-INLINE mandate per FM-19
- OUTPUT_BUDGET 600 LOC + TERMINATION on_handoff_to: orchestrator

**Fallback**: if FM-17.502 hits Sonnet stand-in pool depletion AGAIN, fall back to orchestrator-direct codex `exec` foreground+tee for ECC + CCBP audit per Path P (cardinal-rule-3 Phase 1 bootstrap exception).

**Output**: Audit reports `tmp/wave-mega-fire-8-{agentA,agentB,agentC}-2026-05-12.md` + Pattern A fix-forward commits on each ratified finding.

### Fire 9 — Awesome-list cite extraction (top-K SOTA candidates)

**Goal**: Per user directive "give me detailed plan for claude code cli ... A2E,A/B TEST and more FORM all sotarepos". Surface top-K SOTA candidates from:
- `awesome-python` (78K README) — Python ecosystem cite extraction
- `awesome-claude-plugins` (20K README) — CC plugin cite extraction
- `awesome-llm-apps` (20K README) — LLM app pattern cite extraction
- `awesome-claude-code` (1 cmd; 614f102) — already-curated CC reference list

**Operations**:
1. Read each awesome-list README + extract top-K candidates per category
2. Cross-reference with current marketplace install state
3. Surface install-class candidates per CR-12 PRIMARY upstream-install
4. Surface cite-class candidates for §Section 11/11.5 cite-only authority guides

**Output**: `docs/awesome-list-extraction-2026-05-12.md` + N install/cite-import fires queued.

### Fire 10 — GitNexus deep-probe + MCP integration verify

**Goal**: GitNexus (98addbd6; 36K README) is already wired via `.mcp.json` as `gitnexus`. Per user explicit reference, deep-probe current integration + identify enhancement candidates.

**Operations**:
1. Probe `mcp__gitnexus__*` tool surface — what's available
2. Verify `mcp__gitnexus__detect_changes` + `mcp__gitnexus__impact` + `mcp__gitnexus__context` still operational per `Z:/claude-sota/.claude/rules/parallel-session-worktree-isolation.md` rule 3 mandate
3. Sample current integration depth across `.claude/hooks/scripts/*.py` (29 hooks)
4. Cross-reference with `Z:/repos/deps/GitNexus/README.md` for new SOTA features since current install

**Output**: GitNexus integration audit report + N enhancement fires queued.

### Fire 11 — Convergence ship with GPT-5.5 consensus

**Goal**: Synthesize Fires 1-10 findings + ship the cumulative audit-progress with full cross-model consensus per CR-3.

**Operations**:
1. T1 codex foreground+tee consult on cumulative audit synthesis (Phase 1 bootstrap exception)
2. Pattern A apply if NEEDS-REVISION conf 0.85-0.93
3. T2 PreToolUse hook fires auto on `git commit` per `codex_t2_pre_commit_gate.py:424`
4. T3 PostToolUse hook fires auto post-commit per `codex_postcommit_review.py:599`
5. Closed-loop arc: if T3 NEEDS-ATTENTION → Pattern A iter-2 per `codex-t1-fix-forward-pattern.md`
6. Document Outcome A monotone-decline (NEEDS-REVISION → APPROVE) OR Outcome B REVERT-AND-REMOVE per `Z:/claude-sota/.claude/rules/closed-loop-recursive-narrowing.md`

**Output**: Convergence commit + T3 APPROVE verdict + audit-trail entry in `docs/install-provenance.md` Wave 160 fire 11 row.

### Fire 12 — Audit % progress tracking + manifest closure

**Goal**: Compute post-mega-wave W146-F3 SOTA-cleanliness % delta. User explicitly asked: "give me percentage of been audited, how many percentage are definitive sota reviewed".

**Operations**:
1. Re-run Fire 1 audit method post-Fires 2-11 ship
2. Compute delta: W146-F1 baseline 61% → post-W160 target ≥75% (or actual measured)
3. Append `docs/install-provenance.md` Wave 160 close-synthesis row per `Z:/claude-sota/.claude/rules/audit-action-loop.md` Wire/Surface/Close/Re-fire
4. Update `MEMORY.md` index entry with new SOTA-cleanliness % + cite trail
5. Identify remaining gaps for Wave 161+ queue per cycle-322 codification-threshold

**Output**: Closing audit-trail + Wave 161 forward-queue + operator-facing % delta report.

## Critical files modified (across 12 fires)

| File | Action | Fire | Est. delta |
|---|---|---|---|
| `docs/audit-refresh-W160-F1-2026-05-12.md` | NEW | 1 | +150-200 LOC |
| `.claude/.claude.json` + manifest §Section 3 | Edit (auth-flag + plugin provenance) | 2 | +20-40 LOC |
| `.claude/rules/team-orchestration.md` + 4 new focused sub-rules | Decompose | 3 (sub-fires 3.1-3.5) | -40K +25K across 5 files |
| `CLAUDE.md` + 4 new `docs/*.md` extracts | Trim | 4 (sub-fires 4.1-4.4) | CLAUDE.md → <40K |
| `.claude/rules/*.md` stale-marker cleanup | Edit per file | 5 (sub-fires 5.1-5.N) | -50-80 stale markers |
| `Z:/repos/deps/deepwiki-open/` clone + `PINS.json` row | NEW | 6 | ~ |
| Plugin-namespace audit + retire commits | Edit | 7 (sub-fires) | varies |
| `tmp/wave-mega-fire-8-{A,B,C}-2026-05-12.md` + ratified-finding commits | NEW | 8 | varies |
| `docs/awesome-list-extraction-2026-05-12.md` | NEW | 9 | +200-300 LOC |
| GitNexus enhancement audit | NEW | 10 | +100-150 LOC |
| Convergence ship commit | Edit | 11 | varies |
| `docs/install-provenance.md` Wave 160 row + MEMORY.md index | Edit | 12 | +100-200 LOC |

**Cardinal-rule conformance check** (per CLAUDE.md cardinal-rules 1-12):
- CR-1: Every fire cites TIER-1-DIRECT (Anthropic CC docs / file:line + HEAD SHA / official repos) — PASS
- CR-3: Phase 1 bootstrap exception via codex `exec` foreground+tee OR REAL GPT-5.5 BRIDGE-MODE — PASS per fire
- CR-5: Install-priority — Fire 6 (deepwiki-open) + Fire 7 (marketplace delegation) follow CR-12 PRIMARY — PASS
- CR-6: Fresh-from-GitHub — Fire 6 + Fire 8 + Fire 9 use canonical official channels — PASS
- CR-7: Phase 1 ACTIVE (bypassPermissions per Wave 82d override) — Fires can run under current permission mode — PASS
- CR-8: Full-SOTA-content invariant — every edit cites SOTA pattern at file:line + HEAD SHA — PASS
- CR-9: Install-risk discipline — version-pin all `@latest`; 2-round fix-forward budget per hook install; pre-cite-import REVERT check — PASS
- CR-10: Research-first-then-install — Fire 1 audit + Fire 8 agent team dispatch BEFORE install fires — PASS
- CR-11: META-process SOTA discipline — entire 12-fire wave follows advanced-agent-team-standing-directive + audit-action-loop + Pattern A — PASS
- CR-12: Upstream-install-priority — Fires 6+7+9 default to CR-12 PRIMARY; Fire 8 cite-import-AMBER only with HNF evidence — PASS

## Existing utilities reused (NOT duplicated)

| Source | What's reused | Where |
|---|---|---|
| `docs/sota-installed-manifest.md` (389.8K Sections 0-18+) | Audit baseline + install row state | Fires 1, 7, 11, 12 |
| `docs/install-provenance.md` | Audit-trail append-only log | Fire 12 close-synthesis |
| `Z:/claude-sota/.claude/rules/audit-action-loop.md` | Wire/Surface/Close/Re-fire pattern | Fires 1, 12 |
| `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md` Pattern A | Verdict integration discipline | Every fire's T1 verdict |
| `Z:/claude-sota/.claude/rules/synthesis-layer-verify.md §Reporting categories` | OVER/UNDER/HNF | Fire 8 Agent C adversarial review |
| `Z:/claude-sota/.claude/rules/advanced-agent-team-standing-directive.md` | 3-5 agent team mandate + invariants 1-8 | Fire 8 |
| `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md` Probe 1-7 | Adoption-decision lattice | Fires 6, 7, 9, 10 |
| `Z:/claude-sota/.claude/rules/mia-pre-apply.md` | Pre-Edit verify-before-trust | Every fire's prescription apply |
| `Z:/claude-sota/.claude/rules/fm17-subagent-fleet-depletion.md` | FM-17.502 + .b/.c/.d/.e/.f recovery | Fire 8 fallback |
| `Z:/claude-sota/.claude/rules/parallel-session-worktree-isolation.md` | FM-02 (b)+(c) defense | Every git commit |
| `Z:/claude-sota/.claude/rules/codification-threshold.md` cycle-322 jurisdiction | n=3 self-observed promotion gate | Cleanup decisions |

## Verification (per CR-11 META-process SOTA discipline)

After each fire ships:
1. T2 PreToolUse hook `codex_t2_pre_commit_gate.py:424` auto-fires on `git commit *`
2. T3 PostToolUse hook `codex_postcommit_review.py:599` auto-fires post-commit
3. Verdict file lands at `.claude/state/codex_review_HEAD_<sha8>.txt`
4. If T3 verdict ≠ APPROVE: Pattern A fix-forward per `codex-t1-fix-forward-pattern.md`
5. Append `docs/install-provenance.md` row per `audit-action-loop.md` Wire/Surface/Close/Re-fire
6. Update `MEMORY.md` index entry (one-line)
7. Forward direction: any unresolved finding queues next-fire candidate

At wave close (post-Fire 12):
8. Audit % delta computed (W146-F1 61% baseline → post-W160 target)
9. Operator-facing report at `docs/wave-mega-fire-close-synthesis-2026-05-12.md`
10. Wave 161 forward queue documented per cycle-322 codification-threshold

## Out of scope (NOT in this 12-fire wave)

- Sibling `Z:/claude-sota/` mirror — this runtime is install-only canonical; sibling has separate /loop cron
- Mechanical retrofit of all 21 hooks to `asyncRewake: true` — runbook §3 already codifies recipe; per-hook retrofit fires deferred per ONE-LOGICAL-UNIT-PER-FIRE
- `CLAUDE_CODE_DISABLE_1M_CONTEXT=1` activation — operator decision per `CLAUDE.local.md` ENV (h); recipe documented in `docs/sota-feature-activation.md §7`
- `permissions.allow[]` CR-7 Phase 2 population — BLOCKED until Tier 1a/1b/1c/2 INSTALLED+smoke-PASS per CR-7 §Phase 2 trigger
- Docker container deployment (Qdrant / LiteLLM / FalkorDB) — per CLAUDE.local.md "planned for install — Tier-A install wave"; separate fire if/when memory stack L2 scale demands promotion from sqlite_vec
- Complete cleanup of all 178 stale markers in one fire — split per ONE-LOGICAL-UNIT-PER-FIRE (Fire 5 sub-fires 5.1-5.N)
- Audit % advance to >90% — Wave 160 target is 75% (matches CCBP cardinal "Don't go past 80% saturation in one fire"); >90% is Wave 170+ territory

## Cross-references

- `Z:/claude-sota/.claude/rules/advanced-agent-team-standing-directive.md` — Wave 24-D agent team mandate (Fire 8)
- `Z:/claude-sota/.claude/rules/audit-action-loop.md` Wire/Surface/Close/Re-fire (Fires 1, 12)
- `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md` Pattern A + B + C + D (every fire's verdict integration)
- `Z:/claude-sota/.claude/rules/synthesis-layer-verify.md §Reporting categories` (Fire 8 Agent C)
- `Z:/claude-sota/.claude/rules/karpathy-adapted.md §5 Build Up Over Sessions` — Wiki compounding-surface discipline (Fire 12 close-synthesis IS the Layer-3 compiled-wiki surface)
- `Z:/claude-sota/.claude/rules/mia-pre-apply.md` — every prescription claim must be verified before propagation
- `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 — cite-class lattice for every fire's verdict
- `Z:/claude-sota/.claude/rules/fm17-subagent-fleet-depletion.md §FM-17.b/c/d/e/f` — agent dispatch recovery (Fire 8)
- `Z:/claude-sota/.claude/rules/parallel-session-worktree-isolation.md` — FM-02 (b)+(c) defense (every commit)
- `docs/sota-feature-activation.md` (shipped commits `2f971597` + `7cb64a06`) — SOTA features runbook referenced by §1+§7 of this plan
- `docs/operator-path-setup.md` (predecessor extraction pattern) — Fire 4 structural model
- `docs/sota-installed-manifest.md` Sections 0-18+ — single source of truth for Fires 1, 7, 11, 12

## Recursive dogfood note

This 12-fire wave IS itself executed under cardinal-rule-11 META-process awareness:
- Plan agents skipped per FM-17.502 systemic block (Explore agents `a94cb3f9d5d1058a7` + `a2ae242038457a2d4` both failed at 0 tokens / 0 tool_uses); pivoted to orchestrator-direct Path P analog per cross-model-consensus.md
- Plan file is at `.claude/plans/fluttering-wandering-pond.md` per Plan workflow Phase 4
- TIER-1 cites at file:line + HEAD SHA pattern preserved per CR-1
- STAND-IN-NOTICE inline per cross-model-consensus.md §Env-funneled disclosure mandate (FM-17.502 stand-in dispatch fallback)
- Mega-wave executes per advanced-agent-team-standing-directive (Fire 8 spawns agent team) + Pattern A fix-forward (every fire) + audit-action-loop (Fire 12 close-synthesis)

## Per-fire confidence + risk profile

| Fire | Confidence | Risk class | Reversibility | Operator-decision-pending? |
|---|---|---|---|---|
| 1 | HIGH (read-only audit) | LOW | n/a | NO |
| 2 | MEDIUM (touches `.claude/.claude.json` — parallel-session-owned file) | MEDIUM (FM-02 (b) risk) | HIGH (git revert) | YES — auth-flag remediation strategy |
| 3 | MEDIUM (rule decomposition; preserves cite-trail) | MEDIUM (LONG fires; CR-8 risk) | HIGH (git revert) | NO |
| 4 | MEDIUM (CLAUDE.md trim) | MEDIUM (cardinal-rule preservation) | HIGH | NO |
| 5 | HIGH (small surgical edits per rule) | LOW | HIGH | NO |
| 6 | HIGH (clone + manifest row) | LOW | HIGH | NO |
| 7 | MEDIUM (duplicate detection requires careful classification) | MEDIUM (risk of false-positive retire) | HIGH | YES per retire candidate |
| 8 | HIGH (read-only audit by agent team) | HIGH if FM-17.502 recurs | n/a (read-only) | NO if agents return; YES if Path P fallback |
| 9 | HIGH (read-only awesome-list extraction) | LOW | n/a | NO |
| 10 | HIGH (read-only GitNexus probe) | LOW | n/a | NO |
| 11 | HIGH (synthesis + ship) | MEDIUM | HIGH | NO |
| 12 | HIGH (audit % + close-synthesis) | LOW | HIGH | NO |

## Operator approval gates (per Wave 82d operator-override discipline)

- **Pre-Fire-2 gate**: Operator confirms strategy for auth-enforcement flag remediation (3 options per T3 finding context)
- **Pre-Fire-7 gate**: Operator confirms retire candidates per Probe 4 plugin-namespace audit (false-positive risk)
- **Pre-Fire-8 gate**: Operator confirms agent team dispatch (3-5 agents per advanced-agent-team-standing-directive) OR Path P fallback
- **Post-Fire-12 gate**: Operator reviews audit % delta + Wave 161 forward queue
