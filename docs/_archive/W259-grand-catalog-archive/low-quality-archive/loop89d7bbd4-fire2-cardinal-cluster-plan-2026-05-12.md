# /loop 89d7bbd4 Fire 2 Plan — Cardinal-foundation cluster commit (Option E Fire 1)

**Date**: 2026-05-12
**Trigger**: /loop 89d7bbd4 cron tick (10m recurring) + user-trigger ALWAYS reinforcement of advanced-agent-team-standing-directive
**Synthesizes**: Wave 1 architect Option E (recommended) + Agent B saturation HNF + historical Wave 134 Fire 2 cross-arc convergence
**Predecessor**: Fire 1 (this current fire) — Wave 1 dispatched 3 agents, Agent C returned Option E recommendation, Agent B returned saturation HNF, Agent A pending, Path P codex T1 = Pattern B HNF

## Scope (Pattern D discipline — focused single-cluster)

**Target**: 5 cardinal-foundation rules currently UNTRACKED
- `.claude/rules/canonical.md`
- `.claude/rules/citation-discipline.md`
- `.claude/rules/kiss-dry-yagni.md`
- `.claude/rules/evidence-policy.md`
- `.claude/rules/research-protocol.md`

**Why this cluster first**: per Option E rationale, these 5 anchor the cite-trail discipline that ALL OTHER rules depend on. CR-1 cite-trail violation is upstream of CR-7 Phase 2 trigger predicate progression.

## Workflow (Pattern A + FM-15 + FM-02 + CR-3 Phase 1 bootstrap)

### Step 1 — Pre-flight (CR-9 install-risk discipline)

REVERT-check via sibling history per CR-9:
```bash
git -C Z:/claude-sota log --all --oneline -- '.claude/rules/canonical.md' '.claude/rules/citation-discipline.md' '.claude/rules/kiss-dry-yagni.md' '.claude/rules/evidence-policy.md' '.claude/rules/research-protocol.md' 2>&1 | head -20
```

If any REVERT-AND-REMOVE precedent found per `feedback_check_gitignore_before_porting.md`, STOP and re-evaluate.

### Step 2 — Sibling-bleed defense (CR-9)

Probe for `Z:/claude-sota/` path bleed in the 5 rules:
```bash
grep -nE "Z:/claude-sota/|Z:\\\\claude-sota\\\\" .claude/rules/canonical.md .claude/rules/citation-discipline.md .claude/rules/kiss-dry-yagni.md .claude/rules/evidence-policy.md .claude/rules/research-protocol.md 2>&1 | head -30
```

Document each occurrence for forward-only cite-import-AMBER discipline per Section 14.5. If install-class cite-imports found, path-rewrite to claude-sota-installed paths.

### Step 3 — Mia pre-apply (per `mia-pre-apply.md` apply-boundary)

For each rule, verify 3 sub-claims via cheap probes:
1. **Cite-anchor freshness**: sample 2-3 cite anchors (`Z:/repos/deps/<repo>/file:line @ HEAD <SHA>`) — verify HEAD SHA matches current `git -C Z:/repos/deps/<repo> rev-parse HEAD`
2. **Path-rewrite completeness**: 0 `Z:/claude-sota/` paths embedded as install-dependencies (TIER-2 cite-import-AMBER OK with explicit Section 14.5 disclosure)
3. **Cardinal-rule self-reference integrity**: rule body matches CLAUDE.md cardinal-rules-1-12 cite-class lattice expectations

### Step 4 — CR-3 Phase 1 cross-model gate (orchestrator-direct Path P T1 — narrower than Fire 1)

Per Pattern D recipe + Pattern B HNF lesson from Fire 1: NARROWER prompt scope.

Write `.claude/state/codex_consult_w_loop89d7bbd4_fire2_cardinal_cluster_2026_05_12.txt` (target ≤60 LOC):
- TASK: audit 5 cardinal-foundation rules for SOTA-citation freshness + sibling-bleed + duplicate-functionality. SINGLE CLAIM PER RULE (not 5-dimension matrix).
- OUTPUT_BUDGET: JSON verdict at EOF per Pattern D schema
- Per-call codex budget: 90s (default per FM-17.d defense)

Launch via Bash run_in_background:
```bash
timeout 300 codex exec --skip-git-repo-check --color never < .claude/state/codex_consult_w_loop89d7bbd4_fire2_cardinal_cluster_2026_05_12.txt 2>&1 | tee .claude/state/codex_consult_w_loop89d7bbd4_fire2_cardinal_cluster_2026_05_12_OUT.txt
```

Await terminal verdict (Pattern A APPROVE → ship; NEEDS-REVISION → fix-forward apply per Pattern A; REJECT → escalate).

### Step 5 — Pattern A apply (if NEEDS-REVISION conf 0.88-0.93)

Per `codex-t1-fix-forward-pattern.md §Pattern A`: single atomic apply of ALL prescribed_edits in single commit. Max 1 fix-forward iter per round.

### Step 6 — Narrow commit (FM-15 git-cli-grammar + FM-02 atomic single-shell defense)

Per `git-cli-grammar-discipline.md` invariants:
- Options BEFORE `--`
- Narrow `--only -- <pathspec>` to defend FM-02 (b)+(c) commit-layer absorption
- Single-shell atomic chain: `git add -- <files> && git commit --only -F tmp/msg.txt -- <files>`

Commit message body (drafted):
```
docs(rules): wave loop89d7bbd4 fire 2 — anchor cardinal-foundation cluster (CR-1 cite-trail)

Closes CR-1 cite-trail violation on 5 cardinal-foundation rules previously
UNTRACKED. Per architect Option E (Wave 134 Fire 1 design, sister artifact at
tmp/wave134-fire2-architect-design-2026-05-12.md): tier-stratified batch ship
with explicit CR-7 Phase 2 predicate progression.

## Files committed (5)
- .claude/rules/canonical.md (cardinal-rule body for canonical.md Must-Always #7 + CLAUDE.md cardinal #1)
- .claude/rules/citation-discipline.md (5-tier cite-class lattice + rule #8 MIN_PRECEDENCE composition)
- .claude/rules/kiss-dry-yagni.md (3 shipping principles + Karpathy P2 operational form)
- .claude/rules/evidence-policy.md ([VERIFIED]/[INFERRED]/[UNKNOWN] markers + Marker Decay)
- .claude/rules/research-protocol.md (RPI 3-phase + RECALL→INVESTIGATE→VERIFY + Tool Routing)

## Convergence-gate satisfaction

- CR-1: ✅ Anchored (every cite in these 5 rules now has committed SHA)
- CR-3: ✅ Path P codex T1 verdict at .claude/state/codex_consult_w_loop89d7bbd4_fire2_*_OUT.txt
- CR-7 Phase 1: ✅ Phase 1 bootstrap exception per CLAUDE.md L196 satisfied
- CR-8: ✅ Status column ADAPTED-FROM-SOTA (5 rules cite TIER-1-DIRECT)
- CR-9: ✅ Pre-cite-import REVERT check + sibling-bleed defense applied
- CR-10: ✅ Research-first via Mia pre-apply discipline
- CR-11: ✅ META-process — Option E Fire 1 per architect design
- FM-02: LOW — narrow --only commits with atomic single-shell chain
- FM-17.f: ZERO — Path P orchestrator-direct (no BRIDGE-MODE subagent)
- FM-19: ZERO — read-only T1 audit
- FM-20: LOW — Mia pre-apply on prescriptions before commit

## Manifest CR-8 status update (forward-ref)

Forward-ref to next fire: update docs/sota-installed-manifest.md §11+§11.5 rows
for these 5 rules to ADAPTED-FROM-SOTA status (per CR-8 conformance verification
column per CLAUDE.md L268).

## Cite trail

- Wave 1 Agent C architect design: tmp/wave134-fire2-architect-design-2026-05-12.md (Option E recommended)
- Wave 1 Agent B sota-researcher: tmp/wave134-fire2-sotaresearcher-14repo-gap-audit-2026-05-12.md (saturation HNF)
- Codex T1 verdict: .claude/state/codex_consult_w_loop89d7bbd4_fire2_cardinal_cluster_*_OUT.txt
- Sister rules (cite-import-AMBER per Section 14.5):
  - Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md §Pattern A
  - Z:/claude-sota/.claude/rules/mia-pre-apply.md
  - Z:/claude-sota/.claude/rules/git-cli-grammar-discipline.md
  - Z:/claude-sota/.claude/rules/parallel-session-worktree-isolation.md §FM-02
```

### Step 7 — T3 postcommit verification (CR-3 Phase 1 satisfied via post-commit codex review)

Per CLAUDE.md L196 Phase 1 bootstrap exception: T1 codex satisfied via Path P + T3 post-commit hook fires (if installed) OR orchestrator-direct codex review of HEAD diff.

Verify HEAD SHA + provenance log append to `docs/install-provenance.md`.

### Step 8 — Provenance log

Append to `docs/install-provenance.md`:
```markdown
## Wave loop89d7bbd4 Fire 2 — Cardinal-foundation cluster anchored 2026-05-12

5 cardinal-foundation rules committed (CR-1 cite-trail anchor):
canonical.md / citation-discipline.md / kiss-dry-yagni.md / evidence-policy.md / research-protocol.md

Trigger: Option E Fire 1 per architect Wave 134 Fire 1 design.
Cross-model gate: Path P codex T1 verdict at .claude/state/codex_consult_w_loop89d7bbd4_fire2_*_OUT.txt
CR conformance: 1/3/7-Phase1/8/9/10/11 all ✅; FM-02/17.f/19/20 LOW or ZERO.

Forward-ref next fires:
- Fire 3: cross-model lifecycle cluster (5 rules) per Option E Fire 2
- Fire 4: FM family cluster (6 rules) per Option E Fire 3
- Fire 5+: continue Option E cluster progression
```

## Fail-safes

- **FM-17.f kicks in**: Path P bypasses subagent BRIDGE-MODE entirely (parent [1m] flag immaterial); orchestrator-direct codex exec runs as orchestrator process
- **Pattern B HNF on narrow Path P**: per Fire 1 lesson, narrower scope ≤50 LOC + single-claim should reach terminal verdict; if still HNF, ship as-designed per Pattern B HNF disposition + T3 post-commit verification
- **FM-02 staging race**: narrow `--only --` defends; if race detected via T2 contamination check, defer to next fire
- **CR-9 REVERT-AND-REMOVE precedent found**: STOP, escalate to user, do NOT install

## Operator-decision-pending

The /loop 89d7bbd4 cron tick will re-fire every 10 min with the same broad user prompt. Each cron tick I will execute the next-leverage action per the Option E pipeline (Fires 2-15+).

User may:
- Let cron continue (default)
- CronDelete 89d7bbd4 to cancel
- Explicit redirect to different priority

## Cite trail

- TIER-2 cite-import-AMBER per CLAUDE.md Section 14.5:
  - `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md §Pattern A + §Pattern B + §Pattern D` (recipe for Path P)
  - `Z:/claude-sota/.claude/rules/mia-pre-apply.md §How to apply` (Step 3 sub-claim verification)
  - `Z:/claude-sota/.claude/rules/git-cli-grammar-discipline.md` (Step 6 invariants)
  - `Z:/claude-sota/.claude/rules/parallel-session-worktree-isolation.md §FM-02 sub-classes (b)+(c)` (Step 6 atomic single-shell)
- TIER-1-DIRECT:
  - `https://code.claude.com/docs/en/settings` (CR-7 Phase 1 permission mode `auto` operational form per CLAUDE.md §"Intentional divergences" (d))
- Wave 1 architect design: tmp/wave134-fire2-architect-design-2026-05-12.md
- CLAUDE.md cardinal-rules 1-12 (CLAUDE.md L46-272)
- docs/sota-installed-manifest.md (CR-8 status column target)
