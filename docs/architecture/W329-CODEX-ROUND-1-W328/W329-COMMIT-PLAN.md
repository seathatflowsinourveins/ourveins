# W329 — Commit Plan (W327+W328 grouped topical commits)

> **Status**: PRE-DRAFT — pending W329-A/B/C completion. Fires AFTER codex round-1 verdict (W329-C).
> **Tree state**: 22 modified + 25 untracked dirs (per `git status --short` at start of W329).
> **Strategy**: smallest blast radius first; W328 doc wave is the primary fire; lint reflow + W329 in-flight isolated.

## Batch order (top-to-bottom = commit order)

### B1 — chore(format): ruff/black line-length reflow (pre-existing uncommitted format run)
**Files** (12, pure-format diffs verified):
- `accounts/scripts/{cache_rate,poll_all,token_efficiency}.py`
- `docs/architecture/_archive/W259-grand-catalog-archive/.../recon/{aggregate,probe_top15,_resweep_script}.py` (3 files in 2 paths)
- `evals/deepeval/test_smoke.py` + `evals/evolve_pass_rate_gate.py`
- `tests/test_{agent_plan_readonly_bash_guard,agent_spawn_gate,auto_proceed_gate_schema,auto_proceed_gate_security,block_no_verify_guard,safety_guard,w130_fire5_matcher_boundaries}*.py` (7 files)

**Rationale**: black/ruff line-length reflow, no functional change. Bundling separately prevents review noise on W328 commits.

**Message**: `chore(format): black/ruff line-length reflow — 12 files, 477+/193- pure-format`

### B2 — feat(W320-W321): research-architecture enhancement + open-source cutover + meta-foundation
**Files**:
- `docs/architecture/W320-RESEARCH-ARCHITECTURE-ENHANCEMENT/`
- `docs/architecture/W321-META-FOUNDATION-WAVE/`
- `docs/architecture/W321-OPEN-SOURCE-CUTOVER/` (R5-APPLIED.md + claude-md-status-block-proposed.md + mcp-json-additions-proposed.md + 4 PROPOSED.md skill drafts + 2 WITHDRAWN-USER-ERROR-* + codex-rounds/ + W321-SYNTHESIS.md)
- `tools/research-stack/` (W321 Stream-α self-host bootstrap PS1)

**Rationale**: W320 + W321 land together as the open-source cutover precursor wave.

**Message**: `ship(W320-W321): research-arch enhancement + open-source cutover + meta-foundation`

### B3 — feat(W322-W323): deeper research arch + comprehensive audit
**Files**:
- `docs/architecture/W322-DEEPER-RESEARCH-ARCH/`
- `docs/architecture/W322-WAVE/`
- `docs/architecture/W323-COMPREHENSIVE-AUDIT-WAVE/`

**Message**: `ship(W322-W323): deeper-research-arch + comprehensive-audit closure`

### B4 — feat(W326): research arch overhaul
**Files**: `docs/architecture/W326-RESEARCH-ARCHITECTURE-OVERHAUL/`

**Note**: W326 already shipped via commits `670423d` + `569080a`. This untracked dir may contain stragglers — verify it isn't already partially committed before adding.

**Message**: `docs(W326): research-arch-overhaul straggler docs`

### B5 — feat(W327): cookbook wave straggler docs
**Files**: `docs/architecture/W327-COOKBOOK-WAVE/` + `docs/architecture/W327-CLOSURE-SYNTHESIS/`

**Note**: W327 codex rounds 1-3 already shipped via `2c48b1e` + `6b4b0b4` + `411c077` + `6ee7ea4`. Verify which subdirs are new vs already-tracked.

**Message**: `docs(W327): cookbook-wave + closure-synthesis straggler docs`

### B6 — feat(skills): W321+W328 skill enhancements (4 skills)
**Files**:
- `.claude/skills/goal-prompt-synthesis/SKILL.md` (modified — W321 Δ-G47-Δ-G51)
- `.claude/skills/parallel-dispatch-mandate/SKILL.md` (modified — W321 Δ-PDM-1-3)
- `.claude/skills/sota-convergence-audit/SKILL.md` (modified — W328 sca-v10/v11/v12 absorb, 731→413 LOC)
- `.claude/skills/sota-convergence-audit/references/` (new — D-catalog 204 LOC)
- `.claude/skills/dispatching-parallel-agents-w321-fork/` (new — vendor-fork per CR-4(b))

**Rationale**: Skill behavioral discipline upgrades land together; vendor-fork is cardinal-rule-3 compliant per CR-4(b).

**Message**: `feat(skills): W321+W328 absorb — sca-v12 + Δ-G/Δ-PDM/Δ-DPA + dispatching-parallel-agents vendor-fork`

### B7 — feat(W328-tools): insights-wireup + patches
**Files**:
- `tools/insights-wireup/` (5 idempotent PS1 helpers per W328-B INSIGHTS-WIRE-AUTO)
- `tools/patches/`

**Rationale**: Operator-pasteable tooling, zero tracked-config edits. Honors security constraint (no key-rotation mentions).

**Message**: `feat(W328): insights-wireup helpers + tools/patches`

### B8 — feat(W328): wave docs (12 subdirs + closure synthesis)
**Files**:
- `docs/architecture/W328-CLOSURE-SYNTHESIS/`
- `docs/architecture/W328-CODEX-ROUND-14-RESULT/`
- `docs/architecture/W328-COMPOSITE-RECALC-VALIDATE/`
- `docs/architecture/W328-COMPOSITE-REVAL-AND-SOTA/`
- `docs/architecture/W328-GH-SOTA-METHODS/` (18 KB, 14 methods)
- `docs/architecture/W328-GHMCP-USAGE-CORRECTION/` (USER-ERROR-CONFIRMED verdict)
- `docs/architecture/W328-HF-SOTA-METHODS/` (8.6 KB, 6 methods)
- `docs/architecture/W328-HF-USAGE-CORRECTION/` (USER-ERROR-CONFIRMED verdict)
- `docs/architecture/W328-INSIGHTS-OPERATOR-ENABLED/`
- `docs/architecture/W328-INSIGHTS-WIRE-APPLY/`
- `docs/architecture/W328-K5-MINIMAL-COORD/`
- `docs/architecture/W328-K8-PROVENANCE-VERIFY/`
- `docs/architecture/W328-PROVENANCE-LINT-V2/`
- `docs/architecture/W328-R5-VERIFY/`
- `docs/architecture/W328-SKILL-ABSORB-WAVE/`

**Message**: `ship(W328): SOTA-research-arch full-depth gap-resolution + 2 USER-ERROR-CONFIRMED course corrections`

### B9 — config(W328): settings + plugins state
**Files**:
- `.claude/settings.json` (W321 R5 deny-default per R5-APPLIED.md context)
- `.claude/plugins/installed_plugins.json`
- `.claude/plugins/known_marketplaces.json`

**Rationale**: Settings + plugin-state changes land separately from doc wave for surgical review. The settings.json defaultMode flip from `bypassPermissions` → `default` is the codex-r1 APPROVE-PATH-C ratified change.

**Message**: `config(W321-R5): defaultMode bypassPermissions → default (codex APPROVE-PATH-C deny-default)`

### B10 — feat(W329): Δ33 reframe + Stage-0.5 ENUMERATION-BYPASS cascade
**Files** (W329-A landed):
- `.claude/skills/sota-convergence-audit/SKILL.md` (413 → 449 LOC, +36) — Δ33 reframed: silent-fallback narrative WITHDRAWN per S1+S2 USER-ERROR-CONFIRMED; new §1.5 ENUMERATION-BYPASS gate
- `.claude/skills/sota-convergence-audit/references/stage-0-bypass-cascade.md` (NEW, 188 LOC) — §A correct-usage + §B HF M5 DuckDB SQL + GH GraphQL EnumerateMCPServers + 2 BigQuery SQL templates + §C 7-bucket rate-limit→bypass mapping + §D cite anchors
- `docs/architecture/W329-DELTA33-REFRAME/W329-A-SYNTHESIS.md` (NEW, 140 LOC)

**Note**: SKILL.md is in B6 already-modified list; ADD references/ subdir + W329-DELTA33-REFRAME/ for the W329-A increment. Bundle SKILL.md final state here under W329 rather than W328 since the Δ33 reframe is W329-A's work.

**Message**: `ship(W329-A): Δ33 reframe + Stage-0.5 ENUMERATION-BYPASS cascade (silent-fallback narrative withdrawn)`

### B11 — feat(W329-B+C+H): narrative-debt audit + codex r1 + R6 corollary rewrite
**Files** (LANDED):
- `docs/architecture/W329-NARRATIVE-DEBT-AUDIT/` (LEDGER.md 66 rows + W329-B-SYNTHESIS.md)
- `docs/architecture/W329-CODEX-ROUND-1-W328/` (PROMPT.md + RAW-OUTPUT.txt + LAST-MESSAGE.txt + VERDICT.md + W329-C-SYNTHESIS.md + R2-DISPATCH-DRAFT.md + W329-J-BANNERS-BRIEF.md + W329-COMMIT-PLAN.md)
- `docs/architecture/W329-H-R6-REWRITE/` (BEFORE-AFTER.md)
- `docs/architecture/W328-CLOSURE-SYNTHESIS/W328-SYNTHESIS.md` (R6 section edited per W329-H)

**Message**: `ship(W329-B+C+H): narrative-debt audit (66 rows) + codex r1 NEEDS-REVISION + R6 corollary rewrite`

### B12 — feat(W329-D+G+S2+I+J): bypass-cascade apply + cite recalibrate + S2 re-audit + correction-patch + banner application (DEFERRED until W329-I + W329-J close)
**Files** (LANDED — ready to commit):
- `docs/architecture/W329-D-BYPASS-APPLY/` (CANDIDATES.md + METHODS-USED.md + COMPARISON-TO-W320.md) — LANDED 2026-05-19; 37 candidates, 36/37 NEW-VIA-BYPASS
- `docs/architecture/W329-G-CITE-RECALIBRATE/SUMMARY.md` + W328-{HF,GH}-SOTA-METHODS/SOTA-BYPASS.md edits — LANDED 2026-05-19; HF tier table + GH primary cite recalibrated
- `docs/architecture/W329-S2-REAUDIT/` (VERDICT.md + EVIDENCE.md + CORRECTION-PATCH.md) — LANDED 2026-05-19; verdict delta: both W328-S2 + codex hypothesis wrong

**Files** (LANDED 2026-05-19):
- `docs/architecture/W329-I-APPLIED/SUMMARY.md` — 9-patch CORRECTION-PATCH applied to W328-GHMCP-USAGE-CORRECTION/CORRECT-USAGE.md + R6 second-touch in W328-CLOSURE-SYNTHESIS/W328-SYNTHESIS.md + 8 stale W328-S2 ref edits across SKILL.md + references/stage-0-bypass-cascade.md (parent-side reconstruction; subagent file-write was harness-blocked)
- `docs/architecture/W329-J-BANNERS-APPLIED/SUMMARY.md` + `STATS.md` — 27/27 banners applied (13 NARRATIVE-RESCINDED W-UE + 5 FLAGGED-FOR-REVIEW W-RE + 9 AMBIGUOUS A); mid-stream subagent crash recovered parent-side via Edit + grep verification
- `docs/architecture/W328-GHMCP-USAGE-CORRECTION/CORRECT-USAGE.md` (9-patch CORRECTION-PATCH applied per W329-I)
- 30 wave doc files across W314-W326 corpus received W329-J banners

**Status**: READY-TO-COMMIT. Codex round-2 fired at this turn (background task btwtwf5gy); upon APPROVE verdict, fire B1-B13 in order.

### B13 — feat(W329-K+L): codex rounds 2-4 ratify + final wave close (APPROVED)
**Files**:
- `docs/architecture/W329-CODEX-ROUND-2-W328/` (RAW-OUTPUT.txt + LAST-MESSAGE.txt + VERDICT.md) — NEEDS-MORE-REVISION (3 axes flipped PASS; 3 residual flags F1+F2+F3)
- `docs/architecture/W329-CODEX-ROUND-3-W328/` (RAW-OUTPUT.txt + VERDICT.md + R3-PROMPT.md + R4-PROMPT.md) — NEEDS-MORE-REVISION (2 more axes PASS; Axis 6 deeper F2b-residual cascade)
- `docs/architecture/W329-CODEX-ROUND-4-W328/` (RAW-OUTPUT.txt + VERDICT.md) — **APPROVE** (Axis 6 PASS; 6/6 final)
- `docs/architecture/W328-GHMCP-USAGE-CORRECTION/CORRECT-USAGE.md` (F1 fix L209)
- `docs/architecture/W329-NARRATIVE-DEBT-AUDIT/LEDGER.md` (F2a fix L6-10)
- `docs/architecture/W329-NARRATIVE-DEBT-AUDIT/W329-B-SYNTHESIS.md` (F2b + F2b-deep cascade-sweep L4 + L27-L33 + L55 + L79 + L93)
- `docs/architecture/W329-D-BYPASS-APPLY/METHODS-USED.md` (F3 fix M4 row)

**Status**: **APPROVED 2026-05-19 — codex r4 cumulative #20 explicit "APPROVE for B1-B13 commit batches"**

**Message**: `ship(W329-K): codex rounds 2-4 ratify (6/6 axes PASS) + W328+W329 wave close`

## Pre-fire checks (each batch)
1. `git diff --stat HEAD -- <files>` to verify scope
2. `git add <files>` (no `-A`)
3. `git diff --cached --stat` to verify staging
4. `git commit -m "<message>"` (hooks run: gitleaks + ruff + shellcheck per `.claude/settings.json`)
5. If hook fails → investigate root cause; do NOT use `--no-verify`

## Codex round-1 verdict-conditional behavior

If W329-C returns:
- **APPROVE**: fire B1-B9 in order; B10 after W329 fully closes
- **NEEDS-REVISION**: apply revisions to W328 deliverables FIRST (probably touches B8); re-fire codex round-2; only then commit
- **BLOCK**: HOLD all commits; raise to operator with codex-stated blockers

## Worktree note
This session is in `Z:\claude-sota-installed` (NOT a worktree). Per CLAUDE.md L17-19 parallel-session safety, this is the canonical interactive session. No `--force-with-lease` needed since no rebase planned.
