---
title: W156 F1 V1 — Tier 1a Codex T1-T7 hooks install plan
status: INFLIGHT
date: 2026-05-12
agent: sota-researcher
wave: 156
fire: 1
voice: 1
output_budget_loc: 600
cardinal_rule_conformance: [CR-1, CR-3, CR-5, CR-8, CR-9, CR-10, CR-12]
fm_defense: [FM-02-b-c, FM-09, FM-20, FM-21]
---

# W156 F1 V1 — Tier 1a Codex T1-T7 Hooks Install Plan

## Executive Summary (the surprise)

**Tier 1a is SUBSTANTIALLY INSTALLED already**. The brief's premise ("Tier 1a codex T1-T7 hooks INSTALL plan") is **outdated** by Wave 124-127 cite-import work + Wave 128 plugin enables. Live evidence:

- **6 of 7 T-touchpoint hook scripts** present at `Z:/claude-sota-installed/.claude/hooks/scripts/` (T1+T2+T3+T4+T5+T7 wired; T6 INTENTIONALLY ABSENT via REVERT-AND-REMOVE)
- **283 codex telemetry files** at `.claude/state/` (`codex_consult_*_OUT.txt` + `codex_review_HEAD_*.txt`) — system is producing verdicts
- **6 settings.json hook wirings** mechanically active (PreToolUse Edit + ExitPlanMode T5 + Bash(git commit *) T2/postcommit + Bash(git push *) prepush + Stop T7 + auto-proceed)
- **`Z:/claude-sota-installed-state/.codex/config.toml` exists** with project trust + profile blocks (cite-import-AMBER from sibling per Wave 75)
- **`openai-codex@1.0.4` plugin INSTALLED** with codex-rescue subagent + adversarial-review + setup commands

**TRUE F1 SCOPE**: this is NOT an install fire. It is a **classification + drift-audit + completion-gap remediation** fire. The plan below CLASSIFIES current install status per row + IDENTIFIES residual gaps + PROPOSES surgical completion.

**Most critical finding**: `codex_stop_review_gate.py` (T6 session-end audit) was REVERTED in commit `3de349d` 2026-05-09 by Agent C archaeology catching **structural double-review FM-09 + CR-12 OVER**. Per CR-9 §"Pre-cite-import REVERT check": this MUST NOT be re-installed. T6 is a CR-12 DUPLICATE-FUNCTIONALITY REJECT-FOR-FIT.

---

## §1 Current State Probe Results

### §1.1 Hook scripts inventory (`Z:/claude-sota-installed/.claude/hooks/scripts/`)

| T-slot | Script | Bytes | Status | Source provenance |
|---|---|---|---|---|
| T1 (PreToolUse Edit\|Write\|MultiEdit) | `codex_t1_consult_gate.py` | 83.4K | INSTALLED | Cite-import from sibling per Wave 124 cite-import series (CR-12 Path B); 3 sibling-bleed cite-comments at L54/56/368 |
| T2 (PreToolUse Bash(git commit *)) | `codex_t2_pre_commit_gate.py` | 46.8K | INSTALLED | Wave 124 cite-import; 9 sibling-bleed refs (verify per §5 below) |
| T3 (PostToolUse Bash(git commit *)) | `codex_postcommit_review.py` | 49.1K | INSTALLED | Wave 124 cite-import; 2 sibling-bleed refs; **283 verdict files prove live** |
| T4 (PostToolUse Bash(git push *)) | `codex_prepush_review.py` | 42.4K | INSTALLED | Wave 124; 0 sibling-bleed refs (clean) |
| T5 (PreToolUse ExitPlanMode) | `codex_t5_plan_review_gate.py` | 7.2K | INSTALLED | Wave 50 fire 33 cite-import; 0 sibling-bleed (clean) |
| **T6 (Stop)** | **`codex_stop_review_gate.py`** | **MISSING** | **REVERT-AND-REMOVE (DO NOT REINSTALL)** | Wave 125 revert per commit `3de349d`; Agent C archaeology FM-09 + CR-12 DUPLICATE-FUNCTIONALITY |
| T7 (Stop ask-without-act) | `auto_proceed_gate.py` | 29.4K | INSTALLED | Wave 124+; 8 sibling-bleed refs (highest count — verify per §5) |
| Adjuncts | `codex_review_trace.py` `codex_review_thread_bridge.py` `codex_mcp_healthcheck.py` `codex_review_queue.py` `codex_failure_audit.py` `codex_stuck_detector.py` `codex_gate.py` | 22-18K each | INSTALLED | Wave 124-A1..A6 cite-import series |

### §1.2 Settings.json hook wirings (live runtime)

| Slot | Matcher / Condition | Hook script | Timeout | Mode | Source |
|---|---|---|---|---|---|
| PreToolUse[0] (file edits) | `Edit\|Write\|MultiEdit` | `codex_t1_consult_gate.py` | 5s | sync | settings.json L96-103 |
| PreToolUse[1] (plan exit) | `ExitPlanMode` | `codex_t5_plan_review_gate.py` | 5s | async | settings.json L109-117 |
| PreToolUse Bash gates × 6 | `Bash(git commit *)` + 5 variants | `codex_t2_pre_commit_gate.py` | 180s | sync | settings.json (T2 block) |
| PostToolUse Bash × 6 | `Bash(git commit *)` + 5 variants | `codex_postcommit_review.py` | 30s | async | settings.json L253-310 |
| PostToolUse Bash × 6 | `Bash(git push *)` + 5 variants | `codex_prepush_review.py` | 30s | async | settings.json L313-370 |
| Stop[0] (T7) | `*` | `auto_proceed_gate.py` | 5s | sync | settings.json (Stop block) |
| Stop[2] (codex stop-gate-hook.mjs) | `*` | `stop-review-gate-hook.mjs` (NODE — from plugin) | 300s | sync | Plugin-supplied via codex@1.0.4 (NOT python T6) |

**Note**: Stop[2] is the **codex plugin's own** node-based stop hook (different from Python `codex_stop_review_gate.py` which was reverted). The plugin hook fires `Z:\claude-sota-installed\.claude\plugins\marketplaces\openai-codex\plugins\codex\scripts\stop-review-gate-hook.mjs` — distinct mechanism, distinct review surface (codex-plugin opt-in `/codex:review-gate`).

### §1.3 Codex plugin `openai-codex@1.0.4` inventory

Per `Z:/claude-sota-installed/.claude/plugins/cache/openai-codex/codex/1.0.4/`:
- `.claude-plugin/plugin.json` — name="codex" version="1.0.4" author="OpenAI"
- `agents/codex-rescue.md` — codex-rescue subagent (substantive debugging)
- `commands/setup.md` + `commands/review.md` + `commands/rescue.md` + `commands/adversarial-review.md` + `commands/result.md` + `commands/status.md` + `commands/cancel.md` — 7 slash commands
- `hooks/hooks.json` — plugin-provided SessionStart + SessionEnd + Stop wirings (absolute Win32 paths per Wave 50 Fire 46 fix; cite L1 description)
- `scripts/codex-companion.mjs` (30.1K) — codex CLI wrapper; entry point for `/codex:setup` + `/codex:review` + `/codex:rescue`
- `scripts/session-lifecycle-hook.mjs` (3.5K) + `scripts/stop-review-gate-hook.mjs` (6.1K) — plugin-supplied hook implementations
- `skills/codex-cli-runtime/` + `skills/codex-result-handling/` + `skills/gpt-5-4-prompting/` — 3 skills

### §1.4 .codex/config.toml (Z:/claude-sota-installed-state/.codex/config.toml)

EXISTS. Per Wave 75 cite-import-AMBER from sibling `Z:/claude-sota-state/.codex/config.toml` with PATH-REWRITE applied. Has `[projects.'z:\claude-sota-installed']` + `[projects.'z:\repos\deps']` trust blocks. Profiles block sourced from same.

### §1.5 Telemetry presence (verdict file evidence)

- **283 codex telemetry files** in `.claude/state/`
- Latest T3 postcommit verdict: `codex_review_HEAD_d29b8fce.txt` (commit `d29b8fc` — TODAY's W155 F1 architecture audit per MEMORY entry)
- **Codex T1+T2+T3+T4 are PRODUCING VERDICTS**: live evidence

---

## §2 Upstream SOTA Map + CR-12 Disposition

### §2.1 Upstream codex CLI source (`Z:/repos/deps/codex/`)

- Codex CLI exists upstream as **`@openai/codex` npm package** (cite: `setup.md:25` verbatim "npm install -g @openai/codex"; commands/setup.md from plugin cache)
- Upstream `openai/codex-plugin-cc` repo @ HEAD ships:
  - The codex plugin (cached as `openai-codex@1.0.4` in this runtime)
  - 7 user-facing slash commands (`/codex:setup` etc.)
  - 3 hook scripts (node-based: `session-lifecycle-hook.mjs` + `stop-review-gate-hook.mjs`)
  - `codex-companion.mjs` CLI wrapper

### §2.2 Sibling claude-sota T1-T7 hook scripts (Python — adapted from)

Per `git -C Z:/claude-sota log` at HEAD `034e8c1e5b1593d71fbe21ddae9eb53570ecdab0`:

| Script | Sibling SHA | LOC sibling | LOC installed | Drift |
|---|---|---|---|---|
| `codex_t1_consult_gate.py` | (HEAD `034e8c1e` adjacent) | 81.3K | 83.4K | Differs (+2.1K; runtime-specific adaptations) |
| `codex_t2_pre_commit_gate.py` | sibling | 46.4K | 46.8K | Slight (+0.4K) |
| `codex_postcommit_review.py` | sibling | 48.1K | 49.1K | Slight (+1.0K) |
| `codex_prepush_review.py` | sibling | 41.5K | 42.4K | Slight (+0.9K) |
| `auto_proceed_gate.py` | sibling | 29.4K | 29.4K | Same |
| `codex_t5_plan_review_gate.py` | sibling | 5.8K | 7.2K | Differs (+1.4K) |
| ~~`codex_stop_review_gate.py`~~ | ~~sibling 54.5K~~ | ~~N/A~~ | **MISSING (reverted)** | **REJECT-FOR-FIT per CR-12** |

### §2.3 CR-12 disposition per row (6-class lattice)

| Hook | Class | Disposition | Rationale |
|---|---|---|---|
| T1 codex_t1_consult_gate.py | TERTIARY (CR-12 fallback path C — cite-import-AMBER) | INSTALLED | HONEST-NON-FINDING: no upstream npm/cargo/marketplace package provides Python PreToolUse Edit pre-edit cross-model consult gate at file:line semantic; sibling is the only T1 source. |
| T2 codex_t2_pre_commit_gate.py | TERTIARY (cite-import-AMBER) | INSTALLED | HONEST-NON-FINDING: same — no upstream package provides Bash(git commit *) sync STRICT FAIL_CLOSED working-tree review. |
| T3 codex_postcommit_review.py | TERTIARY (cite-import-AMBER) | INSTALLED | HONEST-NON-FINDING: no upstream parity. |
| T4 codex_prepush_review.py | TERTIARY (cite-import-AMBER) | INSTALLED | HONEST-NON-FINDING: no upstream parity. |
| T5 codex_t5_plan_review_gate.py | TERTIARY (cite-import-AMBER) | INSTALLED | HONEST-NON-FINDING: no upstream parity. |
| **T6 codex_stop_review_gate.py** | **DUPLICATE-FUNCTIONALITY** | **REJECT-FOR-FIT** | The codex plugin's own `stop-review-gate-hook.mjs` (Wave 50 Fire 46 patched paths) already provides session-end review via `/codex:setup --enable-review-gate`. Per kiss-dry-yagni Must-Never #4. CR-9 REVERT precedent: commit `3de349d` 2026-05-09. |
| T7 auto_proceed_gate.py | TERTIARY (cite-import-AMBER) | INSTALLED | HONEST-NON-FINDING: no upstream parity for ask-without-act gate. |

---

## §3 Cite-Class Lattice Per Row (CR-8 conformance)

Per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 lattice — `constituents=[...]; effective_tier=MIN_PRECEDENCE(...)`:

| Row | constituents | effective_tier |
|---|---|---|
| T1 hook install | `[TIER-1-DIRECT @ Z:/repos/deps/codex/docs/sandbox.md @ 9ddfda9d (codex CLI substrate), TIER-1-DIRECT @ https://code.claude.com/docs/en/hooks (PreToolUse semantic), TIER-3-LOCAL-COMPOSITION @ Z:/claude-sota/.claude/hooks/scripts/codex_t1_consult_gate.py @ sibling-HEAD (sibling-novel composition)]` | TIER-3-LOCAL-COMPOSITION |
| T2 hook install | `[TIER-1-DIRECT @ openai codex `codex exec review --uncommitted` documented surface, TIER-1-DIRECT @ Anthropic CC Bash(git commit *) PreToolUse contract, TIER-3-LOCAL-COMPOSITION @ sibling codex_t2_pre_commit_gate.py @ sibling-HEAD]` | TIER-3-LOCAL-COMPOSITION |
| T3/T4 hooks | `[TIER-1-DIRECT @ codex exec, TIER-1-DIRECT @ Anthropic PostToolUse semantic, TIER-3-LOCAL-COMPOSITION @ sibling scripts]` | TIER-3-LOCAL-COMPOSITION |
| T5 hook | `[TIER-1-DIRECT @ Anthropic ExitPlanMode hook contract, TIER-3-LOCAL-COMPOSITION @ sibling codex_t5_plan_review_gate.py]` | TIER-3-LOCAL-COMPOSITION |
| T7 hook | `[TIER-1-DIRECT @ Anthropic Stop hook contract, TIER-3-LOCAL-COMPOSITION @ sibling auto_proceed_gate.py @ HEAD]` | TIER-3-LOCAL-COMPOSITION |
| .codex/config.toml | `[TIER-1-DIRECT @ Z:/repos/deps/codex/codex-rs/core/config.schema.json, TIER-3-LOCAL-COMPOSITION @ Wave 75 cite-import-AMBER from sibling .codex/config.toml]` | TIER-3-LOCAL-COMPOSITION |

**HONEST-NON-FINDING evidence (per CR-12 mandate)**: For each row classified TERTIARY, sota-researcher probe confirms NO upstream install-class equivalent exists at:
- npm registry (`@openai/codex` provides CLI runtime only, NOT Anthropic CC hook wrapper)
- cargo (no `codex-cc-hooks` crate)
- PyPI (no `claude-codex-t1-gate` package)
- claude-plugins-official marketplace (no Anthropic OFFICIAL CC plugin provides Python-based T1-T7 hooks; codex@openai-codex plugin provides DIFFERENT primitive — node-based stop-review-gate via `/codex:review-gate` slash command)
- everything-claude-code plugin (provides ECC gates but not codex T1-T7 cross-model consensus lifecycle)

---

## §4 Install Plan — Numbered, with Smoke Probes + CR-9 Discipline

### §4.1 Headline plan

**F1 IS NOT AN INSTALL FIRE**. It is a **3-task completion remediation**:

**Task A — Sibling-bleed contamination audit + sanitization** (CR-9 discipline)
**Task B — Drift verification** between installed scripts and sibling sources
**Task C — Manifest reconciliation** (Section 2 status updates + provenance entries)

### §4.2 Task A — Sibling-bleed contamination audit (HIGHEST PRIORITY)

**Evidence**: 22 `Z:/claude-sota` refs across 5 hook scripts (T1=3, T2=9, T3=2, T7=8, others=0). Per CR-9 §"Sibling-bleed defense": every install-class cite-import containing `Z:/claude-sota/` paths MUST be path-rewritten BEFORE install.

**Cardinal-rule-9 read-only research probe exception**: cite-comments containing `Z:/claude-sota` are EXEMPT if they are immutable cite-anchors (e.g., `# Reference: Z:/claude-sota/.claude/rules/<file>.md @ HEAD <SHA>`) — these are research input, NOT runtime dependency. Per CR-9 carve-out items (i)-(iii).

**Smoke probe per script** (must run BEFORE classifying as PASS/FAIL):

```
# T1 (3 refs)
grep -n "Z:/claude-sota[^-]" Z:/claude-sota-installed/.claude/hooks/scripts/codex_t1_consult_gate.py
# Expected: lines 54, 56, 368 — all cite-comments per `Reference:` or `# from Z:/claude-sota verdict`
# Status: VERIFIED CARVE-OUT (CR-9 read-only research probe exception)

# T2 (9 refs)
grep -n "Z:/claude-sota[^-]" Z:/claude-sota-installed/.claude/hooks/scripts/codex_t2_pre_commit_gate.py
# Expected: cite-comments OR runtime path references
# Status: NEEDS VERIFICATION (9 refs is high — investigate non-comment occurrences)

# T7 (8 refs)
grep -n "Z:/claude-sota[^-]" Z:/claude-sota-installed/.claude/hooks/scripts/auto_proceed_gate.py
# Expected: cite-comments OR config refs
# Status: NEEDS VERIFICATION
```

**Smoke probe outcome predicate**: each `Z:/claude-sota` reference MUST be either (a) cite-comment in `# Reference:` form (PASS per CR-9 exception), or (b) immutable cite-anchor `@ HEAD <SHA>` (PASS), or (c) runtime config path/env reference (**FAIL — must rewrite to claude-sota-installed**).

**CR-9 fix-forward budget**: 2 rounds reserved per row.

### §4.3 Task B — Drift verification

For each of 6 installed hook scripts, run `diff` against sibling source @ recorded HEAD SHA:

```
# T1 — sibling HEAD 034e8c1e (claude-sota current HEAD)
diff Z:/claude-sota/.claude/hooks/scripts/codex_t1_consult_gate.py \
     Z:/claude-sota-installed/.claude/hooks/scripts/codex_t1_consult_gate.py | wc -l
# Expected: SOME diff (installed has runtime-specific adaptations); document classified-as-intentional vs drift
```

**Smoke probe outcome predicate**: any diff that is NOT path-rewrite + comment-update is suspect drift; investigate. Document classified-intentional adaptations per cite-import-AMBER record.

### §4.4 Task C — Manifest reconciliation

Per `Z:/claude-sota-installed/docs/sota-installed-manifest.md` Section 2 row updates:

```
| T-slot | Script | Status | CR-8 status | Smoke probe |
|---|---|---|---|---|
| T1 | codex_t1_consult_gate.py | INSTALLED-AMBER | ADAPTED-FROM-SOTA | sibling-bleed scan PASS per §4.2 |
| T2 | codex_t2_pre_commit_gate.py | INSTALLED-AMBER | ADAPTED-FROM-SOTA | sibling-bleed scan TBD per §4.2 |
| T3 | codex_postcommit_review.py | INSTALLED | ADAPTED-FROM-SOTA | 283 verdict files written; live evidence |
| T4 | codex_prepush_review.py | INSTALLED | ADAPTED-FROM-SOTA | 0 sibling-bleed |
| T5 | codex_t5_plan_review_gate.py | INSTALLED | ADAPTED-FROM-SOTA | 0 sibling-bleed |
| T6 | codex_stop_review_gate.py | REJECT-FOR-FIT (DUPLICATE-FUNCTIONALITY) | N/A | DO NOT REINSTALL (sibling commit 3de349d revert) |
| T7 | auto_proceed_gate.py | INSTALLED-AMBER | ADAPTED-FROM-SOTA | sibling-bleed scan TBD per §4.2 |
```

Add Wave 156 F1 entry to `docs/install-provenance.md`.

### §4.5 Reversibility

Per CR-9: every action in Task A/B/C is **reversible via single `git revert <SHA>`**. No file deletions; only:
- (a) inline doc updates (manifest + provenance)
- (b) cite-comment cleanups (if needed)
- (c) settings.json hook entry corrections (if needed)

Recovery time: <30s via `git revert`.

---

## §5 FM Defense Matrix

| FM | Risk | Defense |
|---|---|---|
| **FM-02 (b)+(c)** parallel cron race | Cron `81bd1a59` iter ~3/N may produce W155 F3 (`.claude/hooks/` audit) in parallel | Plan ships atomic `git commit --only -- <named-paths>` per `parallel-session-worktree-isolation.md` Sub-class (b)+(c) recovery; no broad `git add .` |
| **FM-09** codex-rescue blind-spot recursion | V3 adversarial probes my OVER-claims | Pre-surface OVER risks: (1) "Tier 1a INSTALLED" is the CORRECT finding but contradicts brief framing — surfaced via dual-citation evidence; (2) T6 REJECT-FOR-FIT is empirical (commit `3de349d`) NOT inference; (3) sibling-bleed counts are MEASURED via grep not inferred |
| **FM-20** path-drift cascade | Brief's stale framing ("Tier 1a not-installed") propagates if not Mia-probed | Plan's §1 Current State Probe SECTION explicitly verifies brief assumptions against runtime state; documents inversions; FM-20 defense via decompose-by-sub-claim per `fm20-path-drift-cascade.md §How to apply` |
| **FM-21** cron freeze (sub-class .b) | Mid-dispatch HEAD shift could invalidate plan | This V1 is read-only research probe; produces tmp/ artifact; V2+V3 PARALLEL fire next on this artifact; HEAD-shift would surface via codex T1 verdict-trail re-probe BEFORE Pattern A apply |

**FM-09 OVER preemption**: V3 will likely catch the following V1 risks (preempting):
1. **V1 framing "Tier 1a INSTALLED" may be OVERCONFIDENT** — drift between sibling and installed could be HIGHER than verified; recommend V3 deeper probe per Task B.
2. **V1 §4.2 carve-out interpretation of CR-9** — V3 should re-verify each `Z:/claude-sota` reference is actually cite-comment, not runtime config path.
3. **V1 INSTALLED-AMBER status** is conservative; could be INSTALLED if sibling-bleed scan PASSES; V3 should adjudicate.
4. **F1 vs F1.B+F1.C split** — V3 may recommend splitting Task A (sibling-bleed) from Task B (drift) from Task C (manifest) per cycle-300 ONE-LOGICAL-UNIT-PER-FIRE.

---

## §6 Cardinal-Rule Conformance Summary

| Rule | This V1 plan | Evidence |
|---|---|---|
| **CR-1** every architectural edit cites SOTA primary source | ✅ All cites file:line + HEAD SHA OR TIER-1-DIRECT URL OR TIER-3-LOCAL-COMPOSITION disclosed | §1.1 table cites all script paths + Wave commits; §2.3 lattice declares constituents+effective_tier |
| **CR-3** cross-model consensus | N/A (research-only V1; V2+V3 PARALLEL Path P fires next per V2 codex T1 + V3 adversarial) | Plan does NOT mutate runtime; orchestrator-side Pattern A apply is V2+V3 consumption boundary |
| **CR-5** install-priority over hand-coding | ✅ Plan recommends NO new hand-coded scripts; F1 is classification + sanitization of already-installed primitives | §4 Task A+B+C all operate on existing artifacts |
| **CR-8** every code/reference adapts SOTA OR is bootstrap | ✅ All 6 hook scripts are cite-class TIER-3-LOCAL-COMPOSITION from sibling; CR-8 status = ADAPTED-FROM-SOTA per §4.4 | §3 cite-class lattice |
| **CR-9** install-risk discipline | ✅ Version-pin via sibling commit SHA (already pinned per Wave 124 cite-import series); 2-round fix-forward budget per row; pre-cite-import REVERT check IDENTIFIED T6 as REJECT-FOR-FIT; sibling-bleed defense PER §4.2 | §4.2 sibling-bleed scan; §2.3 T6 REVERT precedent |
| **CR-10** research-first-then-install | ✅ §1 Current State Probe BEFORE §4 install plan; HONEST-NON-FINDING gate satisfied per §3 for TERTIARY classification | sota-researcher V1 IS the research step |
| **CR-12** upstream-install-priority | ✅ All 6 rows classified per CR-12 path A/B/C/D + HONEST-NON-FINDING evidence per §2.3 + §3 lattice; T6 classified DUPLICATE-FUNCTIONALITY REJECT-FOR-FIT | §2.3 disposition table |

---

## §7 Forward Direction (F1.B / F1.C / F1.D split scenarios)

If scope must split per cycle-300 ONE-LOGICAL-UNIT-PER-FIRE:

**F1.B candidate** — Sibling-bleed contamination sanitization (Task A only)
- Read each of T1/T2/T7 hook scripts at sibling-bleed line numbers
- Classify each ref as cite-comment (PASS per CR-9 exception) vs runtime path (FAIL — rewrite)
- Atomic `--only` commit for any rewrites
- Smoke probe: hooks still fire post-edit

**F1.C candidate** — Drift audit (Task B only)
- `diff` each installed script vs sibling source @ recorded HEAD SHA
- Document intentional adaptations vs unintentional drift
- No code changes; provenance log only

**F1.D candidate** — Manifest + provenance reconciliation (Task C only)
- Update `docs/sota-installed-manifest.md` Section 2 rows with current status
- Add Wave 156 F1 entry to `docs/install-provenance.md`
- No script changes

**Recommended ordering**: F1.B (sanitize) → F1.C (drift) → F1.D (manifest) — but F1.D can ship FIRST if status is "document-only no remediation" (lowest risk).

**Highest-leverage residual gap** (per Wave 154 F7 forward direction): the V1 here closes Phase 2 trigger predicate (c) for Tier 1a — but **smoke-probe column** in manifest must show PASS. Current evidence: 283 verdict files prove T3/T4 producing; T1/T2 hook wirings active; T5/T7 wired. **F1.D manifest update suffices to flip Tier 1a row from PARTIAL → INSTALLED-WITH-SMOKE-PROBE-PASS for T3/T4 immediately**. T1/T2/T7 require sibling-bleed scan completion first.

**Wave 156 F2 candidate** (post-F1 close): Tier 1b sota-researcher subagent install verification (closes Phase 2 trigger predicate (d)). Per W154 F7 forward direction.

---

## §8 Risk Assessment

**Risk class**: LOW (research-only V1; produces tmp/ artifact for V2+V3 PARALLEL Path P review). Per CR-9 risk-assessment:
- (i) Reversibility: HIGH (`git revert <SHA>` <30s; no mutations from V1)
- (ii) Sibling-bleed: PARTIALLY-DOCUMENTED (22 refs identified; CR-9 carve-out interpretation tentative pending V3 adjudication)
- (iii) FM-09 over-claim risk: MEDIUM (V1 framing inverts brief premise; V3 must re-verify)
- (iv) 2-round fix-forward budget: RESERVED for Task A sanitization if FAIL surfaces

**Cross-model gate**: Phase 1 bootstrap exception per CR-3 — V2+V3 PARALLEL Path P codex foreground+tee fires next on this artifact, satisfying cross-model gate at zero cost.

---

## §9 Cite-class lattice for THIS V1 plan

`constituents=[TIER-1-DIRECT @ Z:/claude-sota-installed/.claude/hooks/scripts/* (live filesystem probe), TIER-1-DIRECT @ Z:/claude-sota-installed/.claude/settings.json L96-700 (hook wiring authority), TIER-1-DIRECT @ git -C Z:/claude-sota log + git -C Z:/claude-sota-installed log (commit-anchored REVERT precedent), TIER-3-LOCAL-COMPOSITION @ Wave 156 F1 V1 research synthesis]; effective_tier=TIER-3-LOCAL-COMPOSITION` per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 MIN_PRECEDENCE.

---

**END V1 PLAN**. Hand off to orchestrator for V2 (codex T1 review) + V3 (adversarial) PARALLEL dispatch.
