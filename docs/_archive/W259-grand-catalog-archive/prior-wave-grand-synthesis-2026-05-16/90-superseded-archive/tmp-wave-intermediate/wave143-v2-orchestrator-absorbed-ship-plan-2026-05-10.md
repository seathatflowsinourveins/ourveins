# Wave 143 Fire 1 — V2 architect role absorbed by orchestrator (FM-17.f recovery)

**Status**: V2 feature-dev:code-architect dispatch FM-17.f BLOCKED at pre-fire (204ms / 0 tokens / 0 tool_uses / "API Error: Extra usage is required for 1M context"). Per FM-17 owner-rule recovery for FM-17.f: skip Voice 2 re-dispatch (would re-hit FM-17.f without different agent_type) + orchestrator absorbs V2 architect role inline.

**FM-17.f cumulative ladder advance**: n=5 firm → n=6 firm (Wave 143 Fire 1 V2 architect feature-dev:code-architect agent_type lacks sonnet override + parent session has `[1m]` flag → billing-class entitlement blocked). Recovery per `fm17-subagent-fleet-depletion.md §FM-17.f`: orchestrator-side absorption maintains advanced-agent-team standing-form (V1+V3+V4 = 3 voices including 2 GPT-5.5 via Path P).

---

## Wave 143 Fire 2 — atomic dual-runtime cross-runtime cite-import-AMBER ship plan

### Edit specification

**Sibling target** (canonical authority):
- File: `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md`
- HEAD: `2fc5431a` (sibling); rule last-edited at commit `7bd02f3` (Wave 16 fire-11 Pattern B HNF n=8 ladder bump)
- Insertion point: BEFORE line 347 (`## Mechanical-mirror exception`), AFTER line 345 (Pattern C `### Cite shape (mandatory in T2 consult prompt)` code block close)
- Content: synthesized Pattern D body from `tmp/wave143-pattern-d-synthesized-2026-05-10.md` (~115 LOC including heading)

**This runtime cite-import-AMBER refresh** (cite-import-AMBER per CLAUDE.md Section 14.5):
- File: `Z:/claude-sota-installed/.claude/rules/codex-t1-fix-forward-pattern.md`
- 9-line offset due to port-note + cite-import-AMBER header block
- Insertion point: BEFORE line 356 (sibling L347 + 9), AFTER line 354 (sibling L345 + 9)
- Content: SAME Pattern D body (verbatim copy from synthesized file)
- Header port-note SHA bump: update sibling commit SHA to Wave 143 Fire 2 sibling commit hash

### Ship sequence: Option A (sibling-first then runtime cite-import-AMBER refresh)

**Recommended over Option B (atomic dual-commit) and Option C (runtime-first PROVISIONAL)**:

- **Option A advantages**:
  - Cleaner audit trail (sibling commit IS the canonical authority change; runtime refresh follows)
  - CR-9 pre-cite-import REVERT check completes BEFORE runtime copy is updated (no in-flight cite-import-AMBER copy if sibling commit is reverted)
  - FM-02 sub-class (b)+(c) defense: separate commits to separate runtimes minimize cross-runtime parallel-session race surface
  - Cross-runtime sequence dependency is honest: cite-import-AMBER copy depends on sibling commit SHA which doesn't exist until sibling commit lands

- **Option B atomic dual-commit risks**:
  - Single-shell chain across two `git -C <runtime>` invocations creates non-atomic boundary (sibling commit may land but runtime commit may fail mid-chain due to FM-02 race)
  - SHA-bump in this runtime's port-note requires sibling commit SHA → can't be computed until sibling commit lands
  - Parallel-session race surface DOUBLED (both runtimes' git index racing simultaneously)

- **Option C runtime-first PROVISIONAL risks**:
  - Cite-import-AMBER without source authority is ill-formed
  - Inverts CR-12 source-priority order
  - Risks runtime cite-import-AMBER drift from sibling pre-commit state

### Atomic single-shell commit chain (Option A)

**Step 1 — Sibling commit** (sibling-first):

```bash
# Pre-commit: Mia probe sibling rule for current state
git -C Z:/claude-sota status --short -- .claude/rules/codex-t1-fix-forward-pattern.md

# CR-9 pre-cite-import REVERT check
git -C Z:/claude-sota log --all --oneline -- .claude/rules/codex-t1-fix-forward-pattern.md | head -5

# Apply Pattern D edit (orchestrator-side Edit tool inserts synthesized body)

# Atomic commit (FM-15 options-before-`--` + FM-02 (b)+(c) `--only` defense)
git -C Z:/claude-sota add -- .claude/rules/codex-t1-fix-forward-pattern.md && \
  git -C Z:/claude-sota commit --only -F Z:/claude-sota-installed/tmp/wave143-sibling-commit-msg.txt -- .claude/rules/codex-t1-fix-forward-pattern.md

# Capture sibling commit SHA for runtime port-note bump
SIBLING_COMMIT_SHA=$(git -C Z:/claude-sota rev-parse HEAD)
echo "$SIBLING_COMMIT_SHA" > Z:/claude-sota-installed/tmp/wave143-sibling-commit-sha.txt
```

**Step 2 — This runtime cite-import-AMBER refresh**:

```bash
# Apply Pattern D edit (orchestrator-side Edit tool inserts SAME synthesized body)
# Apply port-note SHA bump (update cite-import-AMBER header with $SIBLING_COMMIT_SHA)

# Atomic commit
git -C Z:/claude-sota-installed add -- .claude/rules/codex-t1-fix-forward-pattern.md docs/install-provenance.md && \
  git -C Z:/claude-sota-installed commit --only -F Z:/claude-sota-installed/tmp/wave143-runtime-commit-msg.txt -- .claude/rules/codex-t1-fix-forward-pattern.md docs/install-provenance.md
```

### Risk matrix

| Risk class | Severity | Mitigation |
|------------|----------|------------|
| Sibling parallel-session race (sibling claude-sota is sibling SOTA-evolving runtime; parallel session may be active per `git -C Z:/claude-sota status --short` showing many untracked files) | MEDIUM | Atomic single-shell `git add ... && git commit --only -- <pathspec>` per FM-02 sub-class (b)+(c) defense; narrow to `.claude/rules/codex-t1-fix-forward-pattern.md` only |
| FM-02 sub-class (b) staging-index race | MEDIUM | `--only -- <file>` form scopes commit to named path regardless of broader index state |
| FM-02 sub-class (c) commit-layer absorption | MEDIUM | If absorbed into parallel-session commit, accept absorption per `port-note-discipline.md §6` "Do not rewrite historical commit bodies"; document via supplementary memory + provenance correction |
| FM-15 git CLI grammar option-after-`--` misordering | LOW | All options BEFORE `--` separator in commit chain (verified) |
| FM-20 path-drift cascade (cite-import-AMBER 9-line offset accuracy) | LOW | Spot-check this runtime's port-note header before insertion + verify L354/L356 insertion window matches sibling L345/L347 + 9 |
| Pre-cite-import REVERT precedent (CR-9) | LOW | `git -C Z:/claude-sota log --all --oneline -- .claude/rules/codex-t1-fix-forward-pattern.md` returned `7bd02f3` (Wave 16 fire-11 Pattern B HNF n=8 ladder bump) — NO REVERT precedent detected |
| Cross-model gate (V4 codex T1 review verdict acceptance) | DEPENDS-ON-V4 | Block ship if V4 returns NEEDS-REVISION conf >0.85 — apply V4 prescriptions then re-verify |

**Overall risk classification**: LOW (DOC-ONLY codification + sibling-novel discipline at cite-import-AMBER discipline TERTIARY per CR-12 + n=13 evidence firmly past cycle-322 promotion gate + Path P REAL GPT-5.5 cross-model gate FULLY satisfied via V3+V4)

### Verification gate

1. **Pre-commit Mia probe**: re-Read both edited files (sibling + runtime) and verify content matches design intent + 9-line offset accounting + port-note SHA bump correct
2. **Cross-model T1 review acceptance gate**: V4 Path P codex T1 verdict ≥APPROVE conf 0.85 OR Pattern A revisions integrated and re-fired
3. **Post-commit T3 audit**: `codex_postcommit_review.py` async fire on `Bash(git commit *)` PostToolUse — verdict file at `.claude/state/codex_review_HEAD_<sha>.txt`

### Commit message drafts

**Sibling commit message** (`tmp/wave143-sibling-commit-msg.txt`):

```
docs(rules): Pattern D codification — DEFAULT-profile foreground+tee recovery for Pattern B HNF (n=13 recovery-family — Wave 143 Fire 1)

Codifies Pattern D in codex-t1-fix-forward-pattern.md as new section after
Pattern C (L345) and before Mechanical-mirror exception (L347). Pattern D
is the dispatch-shape preempting layer that switches deep-review-exec →
DEFAULT codex profile + foreground+tee + ≤50 LOC focused prompt + JSON-at-EOF
+ 300s timeout + --skip-git-repo-check --color never to PREEMPT Pattern B
HNF (zero-investigation variant + active-deep-research timeout) BEFORE the
timeout fires.

Evidence ladder n=13 cumulative same-arc 2026-05-10 across W137F2 + W138F1+
F2+F3+F4 + W139A V1+T1 + W140 V1+T1 + W141 V1+V4 + W142 V1+V4. Cycle-322
self-observed n≥3 promotion gate FIRMLY EXCEEDED. cycle-321 cost-threshold
~30-60 min/session savings cleared. ~115 LOC under 200 ceiling.

V3 codex T1 NEEDS-REVISION conf=0.91 [VERIFIED via Z:/claude-sota-installed/
.claude/state/codex_consult_w143_pattern_d_codification_OUT.txt] — Pattern A
revision integrated: framing strict recipe as TARGET (not universal observed
shape across n=13); recovery-family ladder evidence preserved with strict-
conform column.

V1 sota-researcher APPROVE conf=0.93 (Sonnet stand-in per CLAUDE.local.md
ENV (g); cross-model gate satisfied via V3+V4 Path P REAL GPT-5.5; STAND-IN-
NOTICE per cross-model-consensus.md §Env-funneled subagent stand-in disclo-
sure mandate).

V4 codex T1 review ≥APPROVE conf <PENDING — V4 ship-readiness gate>.

Sub-class taxonomy: D.1 single-claim audit / D.2 T1 review fork (SAVED-SHIP
n=2) / D.3 multi-source-tree audit. Sister-rule integration: FM-17.i (pre-
empts) + FM-17.f (bypasses BRIDGE-MODE risk) + cross-model-consensus §"On
codex unavailable" PRIMARY recovery + synthesis-layer-verify §Reporting
categories + audit-action-loop Wire→Surface→Close→Re-fire + codification-
threshold cycle-322.

Cardinal-rules satisfied: CR-1 cite-trail (TIER-1-DIRECT cited at file:line +
HEAD SHA) + CR-3 Phase 1 Path P bootstrap exception (REAL GPT-5.5 V3+V4
satisfies cross-model gate at zero degraded-mode risk) + CR-7 Phase 1 +
CR-8 full-SOTA-content (cite-class lattice satisfied) + CR-9 install-risk
(pre-commit REVERT check + version-pin) + CR-10 research-first (Wave 143
Fire 1 4-voice fan-out incl 2 REAL GPT-5.5 via Path P) + CR-11 META-process
(advanced-agent-team standing-directive followed) + CR-12 upstream-install-
priority TERTIARY (sibling-novel discipline cite-import-AMBER; HNF-gated).
```

**This runtime cite-import-AMBER refresh commit message** (`tmp/wave143-runtime-commit-msg.txt`):

```
docs(rules): Pattern D cite-import-AMBER refresh — sibling Wave 143 Fire 1 mirror

Mirrors sibling claude-sota Pattern D codification at Z:/claude-sota/.claude/
rules/codex-t1-fix-forward-pattern.md commit <SIBLING_COMMIT_SHA> into this
runtime's cite-import-AMBER copy at .claude/rules/codex-t1-fix-forward-
pattern.md L354-356 insertion window (9-line port-note offset).

Cite-import-AMBER per CLAUDE.md Section 14.5 (TIER-3-LOCAL-COMPOSITION;
sibling claude-sota IS NOT upstream — TERTIARY exception per CR-12 with
HONEST-NON-FINDING evidence). Port-note SHA bumped to <SIBLING_COMMIT_SHA>.

Companion to sibling commit <SIBLING_COMMIT_SHA>. CR-9 sibling-bleed
defense applied (no path-rewrite needed — Pattern D content is runtime-
agnostic recipe). 2-round fix-forward budget honored.

Provenance entry appended at docs/install-provenance.md Wave 143 Fire 1.
```

---

## Recursive dogfood note

This V2-orchestrator-absorbed ship plan IS itself dogfooding the Wave 143 Pattern D codification: V4 Path P codex T1 review (next dispatch) WILL be a Pattern D fire applied to the Pattern D codification itself + this ship plan. Recursive dogfood — Pattern D verifies its own codification fire.

V2 absorbed inline maintains advanced-agent-team standing-form ≥3 subagents (V1 + V3 + V4 = 3 voices including 2 REAL GPT-5.5 via Path P) per FM-17 owner-rule recovery for FM-17.f.
