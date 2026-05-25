# Architecture Remediation Design — Wave 134 Fire 2

# Reference: TIER-1-DIRECT `https://code.claude.com/docs/en/settings` (Anthropic CC permission modes — load-bearing for CR-7 phase predicates)
# Reference: TIER-1-DIRECT CCBP `Z:/repos/deps/claude-code-best-practice-shan/development-workflows/cross-model-workflow/cross-model-workflow.md:1-48 @ HEAD 48f2cebeb88b389b27231c418ceadb65baf813fd` (T1-T3 cross-model lifecycle)
# Reference: TIER-2 cite-import-AMBER `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md §Pattern A + §Pattern B` (single-fix-forward + HNF disposition)
# Reference: TIER-2 cite-import-AMBER `Z:/claude-sota/.claude/rules/parallel-agent-wave.md §CADP rule 5` (max-3 concurrent, max-5 cumulative until cache verified ≥50%)
# Reference: TIER-2 cite-import-AMBER `Z:/claude-sota/.claude/rules/synthesis-layer-verify.md §Reporting categories` + `mia-pre-apply.md §How to apply`
# Reference: TIER-2 cite-import-AMBER `Z:/claude-sota/.claude/rules/closed-loop-recursive-narrowing.md §Outcome A/B/C disposition`
# Reference: CLAUDE.md cardinal-rules 1-12 (Z:/claude-sota-installed/CLAUDE.md)
# Reference: docs/sota-installed-manifest.md HEAD `f7059fe` 2026-05-12 (single source of truth for installs)
# Mia pre-apply on own claims: verified untracked-counts via Glob (39 rules; 10 agents incl. cwc subdir; 28 hook scripts; 5 cwc sh hooks duplicated under hooks/ + hooks/scripts/; 10 SKILL.md speckit + mem-recall)

## Problem statement

claude-sota-installed at HEAD `f7059fe` carries massive untracked artifact surface:

- **39 untracked `.claude/rules/*.md`** files (verified via Glob; full enumeration available)
- **10 untracked `.claude/agents/*.md`** incl. `cwc/` subdir (8 + 2 cwc)
- **28 untracked `.claude/hooks/scripts/*.py`** + **5 cwc/*.sh** duplicated under both `hooks/` and `hooks/scripts/`
- **10 untracked `.claude/skills/<name>/SKILL.md`** (mem-recall + 9 speckit-*)
- 707-line `docs/sota-installed-manifest.md` manifest tracked

**Cardinal-rule violations**:

| Violation | Mechanism |
|---|---|
| **CR-1** | Rules cite TIER-1 SOTA at file:line@SHA but rules themselves have NO committed SHA. Cite-chain unverifiable across fires per `port-note-discipline.md §P3 inherited cite errors`. |
| **CR-8** | Untracked content surface = no CR-8 status column probe possible (ADAPTED-FROM-SOTA / NOVEL-DOCUMENTED-EXCEPTION / PENDING-AUDIT). |
| **CR-9** | Untracked content circumvents `pre-cite-import REVERT check` + `sibling-bleed defense` — copies from sibling claude-sota with `Z:/claude-sota/` paths embedded throughout. |
| **CR-11** | META-process audit-action-loop Surface→Close requires git-tracked rules to commit-anchor the audit trail. |

**Compounding risks**:
- `FM-02 (b)+(c)` parallel-session race amplified by 100+ untracked file surface (cluster commits race against any staging attempt)
- `FM-17.f` 1M-context entitlement blocker (parent session `[1m]` flag) — BRIDGE-MODE subagent dispatch impossible; Path P foreground+tee codex exec only viable cross-model path
- `FM-20` path-drift cascade — Rules cite each other with `Z:/claude-sota/.claude/rules/*` references that must be path-rewritten before commit per CR-9 sibling-bleed defense
- 11 cluster-2 wave-quiet observation (MEMORY.md iter ~133) indicates parallel session has shipped 6+ session-checkpoints with NO F-fire — F64 fire 4 stalled 15+ min suggests operator-decision-pending

## Options A / B / C / D / E

### Option A — Single-commit Stage-and-anchor (fast; CR-1 fix only)

**Strategy**: stage all 39 rules + 10 agents + 28 hooks + 10 skills + 5 cwc-sh in ONE commit at HEAD `f7059fe`. Anchor CR-1 cite-trail immediately; defer per-rule SOTA validation to follow-up fires.

**Fire-by-fire breakdown**:
- Fire 1: `git add` narrow (per-class atomic) + `git commit --only` chain × 5 (rules / agents / hooks / skills / cwc) — 5 micro-commits inside one /loop fire (~9m budget)
- Fires 2-20: per-rule batch SOTA audit (T1) — but rules now have SHA anchor

**Risk class**: HIGH (per `cross-model-consensus.md §Risk-stratified verification gating`)
- High-LOC cardinal-rule surface; massive multi-file ship
- Skips T1 pre-commit per CR-3 — violates Phase 1 bootstrap exception path

**Wall-clock**: ~9m for staging + 5 commit chains
**CR-1**: ✅ ANCHORS cite-trail (every cite now has committed SHA)
**CR-3**: ❌ Skips T1 audit (no per-rule cross-model verdict)
**CR-7**: ⚠️ Phase 1 doesn't gate this (bootstrap admits stage operations) but Phase 2 trigger predicates remain un-met
**CR-9**: ❌ Skips pre-cite-import REVERT check; sibling-bleed not path-rewritten
**CR-10**: ❌ Skips research-first for unknowns (rules adopted as-is)
**FM-02**: HIGH — 5-commit chain races against parallel cluster
**FM-17.f**: N/A (no subagent dispatch)
**FM-19**: N/A
**FM-20**: HIGH — un-rewritten sibling paths propagate cite drift forward
**Reversibility**: `git revert` × 5 commits (medium cost)
**CONVERGENCE-GATE**: ❌ no per-rule sota convergence shown; OPERATOR-MANDATE violation

### Option B — Per-rule T1 audit + selective commit (slow; full CR-3 satisfaction)

**Strategy**: T1 codex audit per rule via Path P foreground+tee dispatch (one rule per fire, with bundling for trivial ones). Commit only after NEEDS-REVISION fix-forward Pattern A apply OR APPROVE verdict.

**Fire-by-fire breakdown**:
- 39 rules × ~10m = ~6.5h
- 10 agents × ~10m = ~1.7h
- 28 hooks × ~10m = ~4.7h (auto-recover-from-T1-stall via FM-17.d watchdog)
- 10 skills × ~5m = ~50min
- TOTAL: ~14 hours across ~80+ fires

**Risk class**: LOW (per `cross-model-consensus.md §Risk-stratified verification gating` — each fire is small + reversible)
**Wall-clock**: 10m per fire (each ships 1 rule)
**CR-1**: ✅ Full anchor with cite-trail validated per rule
**CR-3**: ✅ FULL T1 satisfaction at Path P (foreground+tee, Phase 1 bootstrap valid)
**CR-7**: ✅ Each commit is bounded, low-risk per RSV
**CR-9**: ✅ Per-rule path-rewrite + REVERT check feasible
**CR-10**: ✅ Each unknown surfaced via Mia pre-apply per `mia-pre-apply.md §How to apply`
**FM-02**: LOW — narrow `--only` commits per fire
**FM-17.f**: ZERO — Path P bypasses subagent
**FM-19**: LOW — ARTIFACT-INLINE for read-only review where needed
**FM-20**: LOW — per-fire propagation probe gates cascade
**Reversibility**: HIGH — per-commit revert trivial
**CONVERGENCE-GATE**: ✅ Per-rule sota convergence demonstrated via T1 verdict at commit

### Option C — Rule-batch audit + Pattern A apply (balanced; sweet-spot)

**Strategy**: batch 4-6 related rules per fire (by topical cluster). Single T1 audit per batch via Path P foreground+tee. Pattern A apply if NEEDS-REVISION. Cluster-class commit per batch.

**Fire-by-fire breakdown** (concrete first-7 fires):
- Fire 1: **Cardinal-rule cluster** (5 files): canonical / citation-discipline / kiss-dry-yagni / evidence-policy / research-protocol — bootstrap cite-trail
- Fire 2: **Cross-model lifecycle cluster** (5): cross-model-consensus / codex-t1-fix-forward-pattern / codex-t1-system-meta-review-fallback / codex-t1-auto-wedge-recovery / codex-t1-pattern-b-forward-discipline
- Fire 3: **FM family cluster** (6): fm17-subagent-fleet-depletion / fm19-readonly-guard-sidestep / fm20-path-drift-cascade / fm21-queue-time-prompt-freeze / named-failure-modes / mcp-disconnect-recovery
- Fire 4: **Parallel-agent cluster** (5): parallel-agent-wave / parallel-session-worktree-isolation / parallel-sessions / team-orchestration / coordination
- Fire 5: **Discipline cluster** (6): mia-pre-apply / synthesis-layer-verify / port-note-discipline / closed-loop-recursive-narrowing / audit-action-loop / codification-threshold
- Fire 6: **Architecture cluster** (5): karpathy-adapted / layered-gates-architecture / sota-research-architecture / agent-harness-fit-verification / multi-perspective-subagents
- Fire 7: **Specialty cluster** (7): convergence-gate / advanced-agent-team-standing-directive / sota-pin-discipline / git-cli-grammar-discipline / launch-discipline / deprecation-discipline / multi-source-discovery-breadth-discipline
- Fires 8-10: **Agents + hooks + skills** (3 clusters; cwc-sh hooks de-duplicate first)
- Fires 11-20: **Pattern A fix-forward apply** if any cluster lands NEEDS-REVISION

**Risk class**: MEDIUM (per `cross-model-consensus.md §Risk-stratified verification gating` — moderate batch ships with T1 audit)
**Wall-clock**: ~10m per fire = ~3-3.5h for 10-fire core path
**CR-1**: ✅ Anchors cite-trail per batch (5-7 rules at commit)
**CR-3**: ✅ T1 satisfaction at Path P per batch (Phase 1 bootstrap valid)
**CR-7**: ✅ Each batch is medium-risk; respects Phase 1 (no Phase 2 trigger predicate violation)
**CR-9**: ✅ Per-batch REVERT check + path-rewrite achievable in 10m window
**CR-10**: ✅ Unknowns surfaced via batch Mia pre-apply
**FM-02**: LOW-MEDIUM — narrow `--only -- <pathspec>` per batch; FM-02 (b)+(c) defense holds
**FM-17.f**: ZERO — Path P foreground+tee codex exec only (no subagent BRIDGE-MODE)
**FM-19**: LOW — read-only T1 audits; ARTIFACT-INLINE return when needed
**FM-20**: LOW-MEDIUM — batch boundary mitigates cross-fire propagation
**Reversibility**: MEDIUM — per-cluster revert (5-7 files per revert)
**CONVERGENCE-GATE**: ✅ Per-batch T1 verdict + commit body cite per `cross-model-consensus.md §Evidence marker discipline` `[VERIFIED via .claude/state/codex_consult_*_OUT.txt]`

### Option D — Lazy-anchor + forward-only (operator-discipline-only; deferred fix)

**Strategy**: leave rules untracked; commit only when a rule is edited under T1 verdict per `port-note-discipline.md §6` forward-only convention. Defer mass-commit indefinitely.

**Fire-by-fire breakdown**: zero proactive fires; opportunistic commits as edits happen
**Risk class**: HIGH (LONG-TERM) — every fire that cites an uncommitted rule carries CR-1 violation
**Wall-clock**: 0
**CR-1**: ❌ Persistent violation across all rules
**CR-3**: N/A (no commit happens)
**CR-7**: ❌ Phase 2 trigger predicates can NEVER be satisfied (rules un-anchored)
**CR-9**: N/A
**CR-10**: N/A
**FM-02**: ZERO (no race)
**FM-17.f**: ZERO
**FM-19**: ZERO
**FM-20**: HIGH (drift compounds across fires)
**Reversibility**: PERFECT (nothing to revert)
**CONVERGENCE-GATE**: ❌ Operator-mandate "only commit with sota convergence" never satisfied via this path

### Option E (architect proposal) — **Tier-stratified batch with explicit CR-7 gate predicates**

**Strategy**: Option C's batch shape + per-cluster CR-7 phase-predicate progression. Cluster ordering: cardinal-foundation → cross-model → FM → parallel → discipline → architecture → specialty. After each fire, manifest gets CR-7 phase-predicate row update (which Tier rows now satisfied). Per-cluster T1 carries Mia pre-apply on cited TIER-1 SOTA repos AND on sibling cite-import-AMBER tier (CR-12).

**Fire-by-fire breakdown** (concrete first-3 fires):

**Fire 1 — Cardinal-foundation cluster** (5 rules: canonical, citation-discipline, kiss-dry-yagni, evidence-policy, research-protocol):
1. Pre-flight: `git -C Z:/claude-sota log --grep="canonical|citation-discipline|kiss-dry|evidence-policy|research-protocol" --oneline -- '.claude/rules/<name>.md'` REVERT check per CR-9
2. T1 dispatch: Path P `codex exec --skip-git-repo-check -p deep-review-exec < tmp/wave134-fire1-t1-cardinal-cluster-prompt.txt 2>&1 | tee .claude/state/codex_consult_w134_f1_cardinal_OUT.txt`
3. Mia pre-apply on T1 prescriptions per `mia-pre-apply.md §How to apply` (probe each gap-claim)
4. Pattern A: single atomic apply per `codex-t1-fix-forward-pattern.md §Pattern A`
5. `git add --` narrow + `git commit --only -F tmp/msg.txt -- <pathspec>` per `git-cli-grammar-discipline.md`
6. Manifest update: CR-8 status column rows for the 5 rules → ADAPTED-FROM-SOTA
7. Provenance log to `docs/install-provenance.md`

**Fire 2 — Cross-model cluster** (5 rules per Option C list):
Same Path P shape; T1 audits cite-chain to Anthropic CC + CCBP authority.

**Fire 3 — FM family cluster** (6 rules per Option C list):
Same shape; T1 audits FM cite-class lattice for path-rewrite drift.

**Fires 4-10**: per Option C cluster list with explicit CR-7 progression
**Fires 11-12**: agents + hooks + skills tracked
**Fires 13-15**: manifest CR-8 status column population
**Fire 16+**: Phase 2 trigger predicate review per CR-7 (a)-(f) gates

**Risk class**: MEDIUM (per `cross-model-consensus.md §Risk-stratified verification gating`)
**Wall-clock**: ~10m per fire = ~3h for first 10 fires
**CR-1**: ✅ Anchors cite-trail per cluster + path-rewrite-verified
**CR-3**: ✅ Path P foreground+tee T1 (Phase 1 bootstrap valid)
**CR-7**: ✅ Each cluster advances Phase 2 trigger predicate explicitly
**CR-9**: ✅ Pre-cite-import REVERT check per cluster (1 grep call per cluster)
**CR-10**: ✅ Research-first surfaced via cluster Mia pre-apply + cite-chain probe
**FM-02**: LOW — narrow `--only` per cluster
**FM-17.f**: ZERO — Path P (no BRIDGE-MODE)
**FM-19**: LOW — read-only T1 + ARTIFACT-INLINE protocol
**FM-20**: LOW — per-cluster propagation boundary
**Reversibility**: MEDIUM — per-cluster revert (5-7 files)
**CONVERGENCE-GATE**: ✅ Per-cluster T1 verdict + Mia pre-apply + path-rewrite proof in commit body

## Comparison matrix

| Option | Speed | CR-1 fix | CR-3 sat. | CR-7 progress | CR-9 conf. | FM-17.f risk | FM-20 risk | Wall-clock | Convergence-gate |
|---|---|---|---|---|---|---|---|---|---|
| A | FAST | ✅ | ❌ | ❌ | ❌ | N/A | HIGH | 9m | ❌ |
| B | SLOWEST | ✅ | ✅ | ✅ | ✅ | ZERO | LOW | ~14h | ✅ |
| C | BALANCED | ✅ | ✅ | ✅ | ✅ | ZERO | LOW-MED | ~3-3.5h | ✅ |
| D | NONE | ❌ | N/A | ❌ | N/A | ZERO | HIGH | 0 | ❌ |
| **E** | **BALANCED+CR-7-EXPLICIT** | **✅** | **✅** | **✅✅** | **✅** | **ZERO** | **LOW** | **~3h** | **✅** |

## Recommendation

**Option E** — Tier-stratified batch with explicit CR-7 gate predicates.

**Rationale**: Option C balance + CR-7 phase-predicate progression makes Phase 2 trigger predicates testable each fire (manifest CR-7 column update per cluster). Path P foreground+tee codex exec satisfies CR-3 + bypasses FM-17.f 1M-context blocker. Narrow `--only` commits + per-cluster REVERT check defends FM-02 (b)+(c). Mia pre-apply gates CR-9 + CR-10. Convergence-gate honored per cluster.

**First-3 fires concrete**:
1. **Fire 1**: 5 cardinal-foundation rules (canonical/citation-discipline/kiss-dry-yagni/evidence-policy/research-protocol) → Path P T1 → Pattern A → narrow commit + manifest CR-8 update
2. **Fire 2**: 5 cross-model lifecycle rules → same shape
3. **Fire 3**: 6 FM family rules → same shape

DESIGN: Option E recommended — tier-stratified batch (4-7 rules per cluster, 7 clusters for rules + 3 for agents/hooks/skills) with explicit CR-7 phase-predicate progression per cluster. Path P foreground+tee codex exec satisfies CR-3 under Phase 1 bootstrap exception, bypasses FM-17.f 1M-context blocker, defends FM-02 via narrow `--only` commits, gates CR-9 + CR-10 via Mia pre-apply. ~3h wall-clock for first 10 fires; convergence-gate honored per cluster commit; operator-mandate satisfied.

---

## Mia pre-apply note (architect self-correction)

The orchestrator's pre-dispatch brief stated "39 + 8 + 5" (rules + agents + cwc hooks). Direct Glob enumeration during architect probe surfaced:
- 39 rules (matches)
- 10 agents (NOT 8; includes 2 cwc/ subdir agents)
- 28 Python hook scripts (NOT 5; cwc/*.sh is a different category)
- 5 cwc/*.sh hooks duplicated across hooks/ AND hooks/scripts/ (10 distinct files if both locations counted)
- 10 SKILL.md (mem-recall + 9 speckit-*)

Total untracked surface: ~92-97 files vs the prior "52" claim. FM-20 path-drift OVER caught at apply boundary per `mia-pre-apply.md`.

## Files referenced (absolute paths)

- `Z:\claude-sota-installed\CLAUDE.md` (cardinal rules 1-12)
- `Z:\claude-sota-installed\docs\sota-installed-manifest.md` (CR-8 status column target)
- `Z:\claude-sota-installed\.claude\rules\` (39 untracked rule files)
- `Z:\claude-sota-installed\.claude\agents\` (10 untracked agent files incl. `cwc/` subdir)
- `Z:\claude-sota-installed\.claude\hooks\scripts\` (28 untracked Python hook scripts)
- `Z:\claude-sota-installed\.claude\skills\` (10 untracked SKILL.md across mem-recall + 9 speckit-*)
- `Z:\claude-sota-installed\.local\cwc\claude-code-config\.claude\hooks\` (5 sh hooks duplicated under both `.claude/hooks/cwc/` and `.claude/hooks/scripts/cwc/`)
- `Z:\claude-sota\.claude\rules\codex-t1-fix-forward-pattern.md` (Pattern A + Pattern B cite-import-AMBER)
- `Z:\claude-sota\.claude\rules\synthesis-layer-verify.md` (Reporting categories OVER/UNDER/HONEST-NON-FINDING)
- `Z:\claude-sota\.claude\rules\parallel-agent-wave.md` (CADP rule 5 cumulative dispatch cap)
- `Z:\claude-sota\.claude\rules\closed-loop-recursive-narrowing.md` (Outcome A/B/C disposition)

VERDICT_ONE_LINE: Option E (tier-stratified batch with explicit CR-7 phase-predicate progression) recommended — Path P foreground+tee codex exec, ~3h wall-clock for first 10 fires, all 4 cardinal-rule conformance gates satisfied, FM-02/17.f/19/20 risks LOW or ZERO
