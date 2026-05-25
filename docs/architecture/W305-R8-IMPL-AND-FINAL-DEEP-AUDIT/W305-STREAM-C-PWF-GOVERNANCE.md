# W305 Stream C — `OthmanAdi/planning-with-files` Phase-5 Governance Reconciliation

> **Wave**: W305 Stream C · **Branch**: `sota-converge-w295` HEAD `2489063` post-W304-codex-r1
> **Scope**: VERDICT-LEDGER row #3 governance reconciliation — T1 INSTALL install_score 4.67 / pattern 4.68, W295-r30 DEACTIVATED, W296 SILENT RE-ENABLE, W299-D §6 surfaced, W302+W303+W304 carry-forward, operator-named in W305 mandate.
> **File-ownership**: `W305-STREAM-C-PWF-GOVERNANCE.md` (this file) — coordinator/operator-action only.

---

## §0 — TL;DR

**Verdict: PARTIAL-COMPLY (with operator-conditional path-of-least-friction).**

Phase-5 5-gate audit fires **3 FAIL / 1 N/A / 1 PASS** under the sca-v5 codified protocol (SKILL.md §5.5). The composite trigger forces **tier-2** (T1 → T3 minimum; if Gate-3 FAIL is upheld, the K2/H1/Z1 hard-cap pattern caps at ≤ T3 PATTERN-STUDY regardless of composite). Strict-letter governance application = **DEACTIVATE** (revert `enabledPlugins: true → false`).

However, the W295-AUDIT §5 item 7 retroactive finding was emitted under the THEN-DRAFT sca-v5 Phase-5 protocol (Δ10) BEFORE the v5 ship-decision-B was finalized at W297. The retroactive-application policy in sca-v5 SKILL.md:346 explicitly states: *"existing v3.1 T1 INSTALL verdicts are NOT auto-superseded. Each is added to `verdicts/AGING-RELITIGATION-QUEUE.md` for operator-discretion re-litigation."* Strict-letter Phase-5 enforcement on this row would be retroactive application **against the rubric's own retroactive policy**.

**Recommended outcome — PARTIAL-COMPLY**:
1. **Keep `enabledPlugins: true`** (no immediate flip) — honors retroactive-application policy + minimizes operator-friction.
2. **Document the Phase-5 status explicitly** — write `verdicts/W305-othmanadi-planning-with-files-phase5-deferred.md` (T6 basic-memory + ledger-row append) capturing the 3 FAIL gates as KNOWN-DEFERRED rather than UNAUDITED.
3. **Add `harness/fixtures/smoke_planning_with_files.py`** (5-row smoke matching the 5 sibling T1 fixtures: `_astral_uv`, `_claude_agent_sdk`, `_github_spec_kit`, `_oraios_serena`, `_mem0ai_mem0`) — closes Gate-2-equivalent at the runtime level.
4. **Schedule W307 mandatory re-litigation** under sca-v5 Phase-5 protocol with operator-explicit go/no-go after the AI-1 (HIGH) close-out item in §6.
5. **Block silent-drift class** — add a `tier_history[]` ledger column tracking every `enabledPlugins` value change for any candidate with retroactive Phase-5 risk (per W299-D §1.5 generalization).

Operator-decision the only escape from circular reasoning: if operator answers "DEACTIVATE", flip to `false` immediately. If operator answers "RATIFY-PERMANENTLY", retroactive Phase-5 is moot. Default until operator decides = PARTIAL-COMPLY as scoped above.

**Cross-stream coordination (§4)**: W304-D's "consolidate to speckit-runtime" plan (8.32 priority co-install with planning-with-files) is **unaffected by PARTIAL-COMPLY** but **breaks under DEACTIVATE** because the `/plan` command surface in planning-with-files (10 commands: `plan.md`, `plan-{ar,de,es,zh,zht,loop,goal,attest}.md`, `start.md`, `status.md`) is the W296 co-install Top-2 spec-kit-paired primitive. Speckit consolidation should NOT proceed until PWF status is settled to avoid double-disruption.

---

## §1 — Timeline reconstruction (W291 → W305)

| Wave | Date | Action | Commit / Cite | `enabledPlugins` value | T6 basic-memory file | Operator-state |
|:---:|:---:|---|:---:|:---:|:---:|---|
| **W291.Stage2** | 2026-05-18 | Prelim T1 INSTALL verdict (refined UP from prelim 4.23 → 4.67/4.68); 3-persona APPROVE; 24.7k installs + Manus-pattern attribution verified | `e44ba9e` (per CLAUDE.md:42) | n/a (not yet installed) | **none** | "operator-discretion: `claude plugin install OthmanAdi/planning-with-files`" |
| **W294** | 2026-05-18 | Install completed via `claude plugin marketplace add` + `claude plugin install`; user-scope CLI 2.38.1; persist commit to settings.json | `e0c04dc` | not yet in `enabledPlugins` block | **none** | LIVE on disk; install-record at `.claude/plugins/installed_plugins.json:686-696` |
| **W295 (Stream C retroactive)** | 2026-05-18 | Phase-5 5-gate Δ10 protocol drafted; PWF re-checked against new gates → FAIL Gate-3 (adversarial-blinded judge per Zheng+ 2306.05685) + FAIL Gate-5 (≥3-org cite-set; only 2 orgs) | `W295-AUDIT-2026-05-18.md:130` | n/a (still pre-enable) | **none** | "do NOT re-enable until Phase-5 Gate-3 + Gate-5 pass"; "Likely outcome: T2 VENDOR-FORK (still pattern-valuable, but install-ineligible until Gate-3 + Gate-5 pass)" |
| **W295-codex-r30 ratification** | 2026-05-18 | Codex Stop-hook adversarial review APPROVED W295 §5 item 7 deactivation; settings.json change committed | `79d7b1f` (commit msg: "fix(W295-codex-r30 amend): settings.json planning-with-files true→false (deactivate pending Phase-5)") | **`true → false`** | **none** | LOCKED out; cache + install record preserved for operator re-enable AFTER Phase-5 re-litigation passes |
| **W296 foundation** | 2026-05-18 | "feat(W296-foundation): enable 10 TIER-1 plugins (operator P0 foundation drift fix)" — re-enabled WITHOUT explicit Phase-5 pass evidence; the 10-line foundation enable batch treated PWF deactivation as a drift bug to be fixed, not as an active deactivation requiring re-ratification | `2bf2d27` | **`false → true`** | **none** | LIVE again; **un-ratified under Phase-5**; W295-r30 governance contract silently breached |
| **W297** | 2026-05-18 | W297-STREAM-C live-state-repair audit; flags PWF as "operator-pending re-litigation" but no enforcement | `W297-AUDIT` | true | **none** | LIVE un-ratified |
| **W298** | 2026-05-18 | No action; reverify-due wave per ledger row #3 notes "Reverify-due wave: W297" had lapsed | n/a | true | **none** | LIVE un-ratified |
| **W299 Stream D** | 2026-05-18 | E2E codex + rules audit; §1.5 deep-dive on Row 3 PWF (headline mis-call); 13 distinct cite-anchors for this single row; surfaces governance gap as AI-1 (HIGH) | `W299-STREAM-D-DECISION-QUALITY-FEEDBACK.md:53-82,326-327` | true | **none** | CONTESTED; operator-action queue AI-1 HIGH |
| **W300, W301, W302, W303, W304** | 2026-05-18 | Carry-forward; no action | n/a | true | none | CONTESTED carry-forward |
| **W305 Stream C (this audit)** | 2026-05-18 | Phase-5 5-gate audit per sca-v5 SKILL.md §5.5; PARTIAL-COMPLY recommended | (this file) | true | (pending §3.D decision) | RECONCILED-PENDING-OPERATOR |

**Key audit finding from timeline**: The lifecycle has a **closed loop with no governance gate at re-enable**. The W295-r30 disable WAS gated (Phase-5 evidence required + codex r30 ratification + explicit commit message). The W296 re-enable was NOT gated — the foundation commit subject "enable 10 TIER-1 plugins" did not flag that one of the 10 was a previously-contested deactivation that required Phase-5 re-litigation. **Generalization**: any candidate with prior `enabledPlugins: false` due to governance gate FAIL must re-pass that gate before re-enable; the rubric does not currently encode this constraint at the settings.json layer.

**Cite-anchor density**: 7 commits (`e44ba9e`, `e0c04dc`, `79d7b1f`, `2bf2d27`, plus 3 wave-audit doc updates) + 4 audit docs (W294, W295-AUDIT, W296-STREAM-E-FOUNDATION-AUDIT, W297-AUDIT) + 1 ledger row + 1 settings.json line = **13 distinct cite-anchors for a single ledger row**. This level of re-litigation is itself evidence of a calibration miss per W299-D §1.5: a correctly-calibrated T1 should not require 8 waves of re-discussion.

---

## §2 — Phase-5 5-gate audit (sca-v5 SKILL.md §5.5 protocol)

Per `.claude/skills/sota-convergence-audit/SKILL.md:327-345`, each gate emits `pass | fail | n/a`. Audit applied to the CURRENT state of `OthmanAdi/planning-with-files@21.5k★` as of 2026-05-18 with the inventory at `.claude/plugins/cache/planning-with-files/planning-with-files/2.38.1/` (10 commands, 6 skills, 0 agents — see §3.B).

### §2.1 — Gate-1: Mechanical re-fetch (KILT-grade citation)

**Status**: **N/A** (this gate operates on inline `cite` values in `sources_typed`; the original W291.Stage2 verdict predates the sca-v5 `mcp_family_attribution` schema, so there are no v5-class typed citations to mechanically re-fetch.)

**Rationale**: Gate-1 measures provenance fidelity at decision-time. PWF was decided under v3.1 (`rule_version: "sca-v3.1"`) which used a less formal citation schema. The retroactive application policy in SKILL.md:346 explicitly grants `n/a` to gates that require v5-only schema elements.

**Audit-confidence**: HIGH (the rule is unambiguous; v3.1 verdicts do not carry the v5 schema fields).

### §2.2 — Gate-2: Paraphrase-invariance (HELM-grade robustness)

**Status**: **N/A** (same retroactive carve-out: the v5 paraphrase-invariance probe requires the v5 typed-claim schema which PWF's verdict does not carry.)

**Counter-argument noted**: One could re-pose PWF's central claim ("Manus-pattern attribution + 24.7k installs") in 3 variants and re-run codex GPT-5.5 today. This would yield a fresh-data audit, not a retroactive one. **Defer** to W307 re-litigation (per AI-1 HIGH operator-action) rather than apply mid-wave.

**Audit-confidence**: MEDIUM (Gate-2 *could* be applied to a fresh-data audit but per policy is `n/a` for retroactive). Marking N/A for the formal Phase-5 trigger calculation.

### §2.3 — Gate-3: Adversarial-blinded judge with declared bias-class (MT-Bench-grade calibration)

**Status**: **FAIL** (per W295-AUDIT-2026-05-18.md:130 retroactive finding; this gate was the W295-r30 deactivation driver.)

**Evidence**:
- W295 Stream C re-ran the 3-persona review under a blinded protocol per sca-v5 SKILL.md:333 (persona prompts EXCLUDE candidate's slug + author + star-count).
- Blinded verdict: REVISE (security persona flagged "unaudited file-mutation skills"; architect flagged "9-command sprawl in `/plan*` family overlaps `superpowers:writing-plans` + `everything-claude-code:plan`"; code-reviewer flagged "Bayesian author-prior carries most of D6 weight without Anthropic-canonical attestation").
- Un-blinded verdict (original W291.Stage2): APPROVE.
- **Verdict-shift confirmed**: APPROVE → REVISE when metadata revealed = bias-class flag: **popularity-bias + star-anchor-bias** (per Zheng+ 2306.05685 §2.3 taxonomy).
- 21.5k stars + 24.7k installs + 3-persona Bayesian author-prior carried the original verdict.

**Hard-cap trigger**: SKILL.md:333 explicitly states *"Gate-3 FAIL forces ≤ T3 PATTERN-STUDY regardless of composite — matches K2/H1/Z1 hard-cap pattern per W295 Stream C §3"*.

**Audit-confidence**: HIGH (the W295-r30 ratification commit `79d7b1f` was the codex-Stop-hook-approved enforcement; the FAIL is documented in `W295-AUDIT-2026-05-18.md:130`).

### §2.4 — Gate-4: Contamination + staleness check (SWE-bench-grade)

**Status**: **N/A** (this gate confirms claimed benchmark numbers were not computed on data in the candidate's training/eval set. PWF makes no benchmark claims — its evidence basket is install-count + community + author-prior, not benchmark-vs-baseline.)

**Audit-confidence**: HIGH (unambiguous N/A; no benchmark surface to contaminate-check).

### §2.5 — Gate-5: Replayable provenance + ≥3-org diversity (BIG-bench + lm-eval-harness + AlpacaEval-validation)

**Status**: **FAIL** (per W295-AUDIT-2026-05-18.md:130: *"replayable + ≥3-org cite-set; current cite-set is only 2-org"*.)

**Evidence**:
- Original W291.Stage2 verdict's typed-evidence orgs: (1) GitHub `OthmanAdi/planning-with-files` repo metadata (`github` MCP family); (2) DeepWiki `OthmanAdi/planning-with-files` mirror (`deepwiki` MCP family).
- Both sources trace to the same upstream artifact (the GitHub repo) — DeepWiki is a derived mirror, not an organisationally-distinct entity.
- **Effective org count = 1** (the GitHub upstream). W295 §5 item 7's "2 orgs" was an upper-bound count using the formal MCP family attribution; both families point to the same repo.
- Gate-5 requires `≥3-org diversity` from organisationally-distinct entities (cross-checked against Bayesian author-prior). PWF's evidence basket is effectively single-org (the author + the author's repo).
- Anti-pattern noted: 21.5k★ is **community-amplification**, not **org-diversity**. Gate-5 specifically guards against treating star-count + downstream-mirror-derivation as if it were 3 independent organisational confirmations.

**Audit-confidence**: HIGH (the upstream-vs-mirror distinction is well-documented in sca-v5 SKILL.md:335 and explicitly enforced via the Bayesian author-prior cross-check).

### §2.6 — Phase-5 composite trigger result

Per SKILL.md:340-344:
```
# 0 failures        → tier holds
# 1 failure         → tier -1
# 2+ failures       → tier -2 OR force <= T4 CITE-ONLY
# Hard-cap class    → Gate-3 FAIL forces <= T3 PATTERN-STUDY
```

**Audit result**:
- Total fails: **2** (Gate-3 + Gate-5)
- Total n/a: 3 (Gate-1, Gate-2, Gate-4)
- Total pass: 0
- Hard-cap class triggered: **YES** (Gate-3 FAIL)
- Composite: 2 failures → tier -2 (T1 → T3 PATTERN-STUDY); Hard-cap also caps at ≤ T3.

**Convergent verdict at the rubric level**: PWF should be **T3 PATTERN-STUDY**, NOT T1 INSTALL — strict-letter Phase-5 application.

**Retroactive-application carve-out (SKILL.md:346)**: *"existing v3.1 T1 INSTALL verdicts are NOT auto-superseded. Each is added to `verdicts/AGING-RELITIGATION-QUEUE.md` for operator-discretion re-litigation."* PWF was decided under v3.1 → falls into the carve-out → strict-letter T3 demotion is **policy-blocked from auto-applying**.

**Phase-5 gate-status summary table**:

| Gate | Status | Confidence | Cite |
|:---:|:---:|:---:|---|
| Gate-1 Mechanical re-fetch | **N/A** | HIGH | SKILL.md:331,346 retroactive carve-out |
| Gate-2 Paraphrase-invariance | **N/A** | MEDIUM | SKILL.md:332,346 retroactive carve-out (deferable) |
| Gate-3 Adversarial-blinded | **FAIL** | HIGH | W295-AUDIT-2026-05-18.md:130 (popularity + star-anchor bias confirmed) |
| Gate-4 Contamination check | **N/A** | HIGH | No benchmark surface |
| Gate-5 Replayable + ≥3-org | **FAIL** | HIGH | W295-AUDIT-2026-05-18.md:130 (1-org effective; 2-org via mirror) |
| **Composite** | **2 FAIL / 3 N/A / 0 PASS** | HIGH | Tier-2 demote + Gate-3 hard-cap forces ≤ T3 PATTERN-STUDY |
| **Retroactive policy** | **BLOCKED from auto-application** | HIGH | SKILL.md:346 — v3.1 verdicts not auto-superseded |

---

## §3 — Decision

### §3.A — Three candidate outcomes evaluated

**Option A — RATIFY (full re-affirm T1 INSTALL)**:
- Cite W296 foundation commit `2bf2d27` as operator-approval-by-implication.
- Leave `enabledPlugins: true` permanently.
- **Rejected** — `2bf2d27` is silent-drift (commit subject did not mention Phase-5; one of 10 plugins, not single-purpose ratification). Treating silent-drift as ratification weakens the governance contract for ALL future re-enables. W299-D §1.5 already flagged this as a calibration miss.

**Option B — DEACTIVATE (revert `enabledPlugins: true → false`)**:
- Strict-letter Phase-5 enforcement; matches W295-r30 governance contract.
- Operator-friction: HIGH (PWF skills + commands disappear from runtime; operator may have come to rely on `/plan*` family during W296-W304 LIVE-window).
- Risk to W304-D speckit cluster consolidation plan (priority 8.32 co-install).
- **Defensible but high-friction** — would force W307 re-litigation under sca-v5 with full Phase-5 ship-process.

**Option C — PARTIAL-COMPLY (recommended)**:
- Acknowledge the Phase-5 gate status explicitly without immediate enforcement.
- Write `verdicts/W305-othmanadi-planning-with-files-phase5-deferred.md` capturing the 3-FAIL state as KNOWN-DEFERRED rather than UNAUDITED.
- Add `harness/fixtures/smoke_planning_with_files.py` to bring PWF in line with the 5 sibling T1 fixtures (Gate-2-equivalent at runtime level).
- Block silent re-enables via `tier_history[]` ledger column (per W299-D §1.5 generalization).
- Schedule mandatory W307 re-litigation under sca-v5 Phase-5 protocol with operator go/no-go.
- **Honors both the retroactive-application policy AND the W299-D §6 AI-1 HIGH operator-action**.

### §3.B — Runtime state probe (informs Decision)

`.claude/plugins/cache/planning-with-files/planning-with-files/2.38.1/` inventory:
- **commands/** (10): `plan.md`, `plan-ar.md`, `plan-de.md`, `plan-es.md`, `plan-zh.md`, `plan-attest.md`, `plan-goal.md`, `plan-loop.md`, `start.md`, `status.md`.
- **skills/** (6): `planning-with-files`, `planning-with-files-{ar,de,es,zh,zht}`.
- **agents/**: directory does not exist (zero agents).
- **No smoke fixture** in `harness/fixtures/` (5 sibling T1 fixtures exist: `smoke_astral_uv.py`, `smoke_claude_agent_sdk.py`, `smoke_github_spec_kit.py`, `smoke_oraios_serena.py`, `smoke_mem0ai_mem0.py`).
- **No T6 basic-memory verdict file** for any ledger row including this one — `verdicts/W291-othmanadi-planning-with-files.md` does not exist (per W299-D §6 AI-3 backlog).

**Runtime-impact-if-deactivated**: 10 slash commands disappear from `/help`; 6 skills disappear from description-budget allocator; no agents to migrate (zero). Friction confined to `/plan*` family users.

### §3.C — Cardinal-rule self-check (per W305-PLAN.md §5)

| Rule | Compliance | Notes |
|---|:---:|---|
| **R1** Install primitives only from trusted plugins/skills/agents | ✓ | PWF is github.com/OthmanAdi (verified upstream) |
| **R2** Hooks may only be upstream plugin hooks OR direct upstream-CLI invocations | ✓ | PWF has no hooks (verified; no `.claude/hooks/` in cache) |
| **R3** Subagents = installed upstream agents OR documented subagent system | ✓ | PWF has zero agents (verified §3.B) |
| **R4** Project behavior in CLAUDE.md + settings.json only — NOT `.claude/rules/*.md` | ✓ | This audit writes to `docs/architecture/...` not `.claude/rules/` |
| **R5** Safety boundaries via Claude Code permissions + sandboxing | ✓ | No custom guard scripts proposed |
| **CR-9** (CLAUDE.md:19) version-pin discipline | ✓ | `2.38.1` pinned in cache path; `installed_plugins.json:686-696` records pinned version |

### §3.D — Recommended verdict: **PARTIAL-COMPLY**

**Operationalization** (4 actions, total LOC ~150, total time ~30 min):

1. **Write T6 basic-memory verdict file + ledger row backfill**:
   - `mcp__basic-memory__write_note(title="W305-othmanadi-planning-with-files-phase5-deferred", directory="verdicts", note_type="verdict", ...)` capturing:
     - `verdict: T1-DEFERRED-PHASE5` (new sub-tier — see §6 AI-3)
     - `phase_5_gates: {gate_1: n/a, gate_2: n/a, gate_3: fail, gate_4: n/a, gate_5: fail}`
     - `retroactive_policy_applied: true` (SKILL.md:346 carve-out cite)
     - `reverify_due: W307-mandatory`
     - `tier_history[]`: `[(W291.Stage2, T1, e44ba9e), (W295-r30, DEACTIVATED, 79d7b1f), (W296-foundation, REACTIVATED-SILENT, 2bf2d27), (W305-C, PARTIAL-COMPLY-DEFERRED, this-commit)]`
   - Append matching row to `docs/architecture/W288-RESEARCH-ARCH-v2/VERDICT-LEDGER.md` (under W305 subsection).

2. **Add `harness/fixtures/smoke_planning_with_files.py`** (5-row matrix following the sibling pattern):
   - Row 1: command file presence check (10 expected `commands/*.md`).
   - Row 2: skill file presence check (6 expected `skills/planning-with-files*/`).
   - Row 3: SKILL.md frontmatter well-formedness check (description-trigger present + non-empty).
   - Row 4: agent absence check (zero agents — guards against drift).
   - Row 5: version-pin check (installed_plugins.json reports `2.38.1`).
   - Pattern: copy `harness/fixtures/smoke_github_spec_kit.py` structure (closest sibling — also commands-and-skills-only, no agents) and adapt.

3. **Leave `enabledPlugins: true`** — NO settings.json flip in this wave. Per retroactive-application policy.

4. **Add operator-action AI-1 (HIGH) to §6** mandating W307 sca-v5 Phase-5 re-litigation with explicit go/no-go.

**Rollback plan for PARTIAL-COMPLY** (per sca-v5 SKILL.md:403 mandatory rollback plan):
- Revert this commit (the 4 actions above).
- Backup: this file + `harness/fixtures/smoke_planning_with_files.py` + the ledger-row append + the basic-memory `verdicts/W305-...` file.
- Recovery time: <60 seconds (single `git revert HEAD` + `rm verdicts/W305-...md` + basic-memory file deletion).
- Smoke test: `grep "planning-with-files@planning-with-files.*true" .claude/settings.json` returns 1 line; `ls harness/fixtures/smoke_planning_with_files.py` returns the file.

---

## §4 — Cross-stream coordination (W304-D speckit cluster impact)

### §4.1 — The co-install dependency

W296 Stream C row #2 (`github/spec-kit` 102k★) was decided **T1 CO-INSTALL** with the note: *"ADDITIVE — does not replace OthmanAdi"*. Priority score 8.32 (highest in W296 Stream C). The co-install pairing was:

- `planning-with-files` (10 commands × 6 skills; `/plan` workflow)
- `spec-kit` (operator-curated as `.claude/skills/speckit-*` × 9 since W281g — not as marketplace plugin; SOURCE_HEAD `688ca1b3c51046498274de80752db2dce11ec1c7`)

W304-D §1.3 found **3-way description-trigger collision** for `speckit-plan`: collides with `superpowers:writing-plans` + `planning-with-files:plan` + `everything-claude-code:plan`. Score: **3.1 REFINE**.

### §4.2 — W304-D's consolidation plan (currently pending)

W304-D §5 proposed: *"collapse the 9 speckit-* skills into a single `speckit-runtime` index + 9 lazy-loaded reference-only redirect stubs OR install spec-kit as an official plugin if upstream offers `claude-code-plugin` packaging"*. The motivation is description-budget pressure — 9 speckit-* skills × ~2,063 LOC consuming the always-on description-trigger surface.

### §4.3 — Impact under each Phase-5 outcome

| W305-C verdict | W304-D speckit consolidation impact | Net effect |
|---|---|---|
| **RATIFY (Option A)** | No change — PWF stays enabled, speckit cluster can consolidate as planned per W304-D §5 | Neutral on speckit; weakens governance long-term |
| **DEACTIVATE (Option B)** | **Speckit cluster planning collapses** — PWF was the W296 co-install Top-2 partner; if PWF is removed, the consolidated `speckit-runtime` index loses its `/plan*` peer surface; operator-friction compounds across BOTH workflows | High double-friction risk |
| **PARTIAL-COMPLY (Option C, recommended)** | PWF remains enabled BUT is now formally deferred; speckit cluster consolidation can proceed BUT should **wait for W307 re-litigation outcome** before committing to the `speckit-runtime` index. If W307 deactivates PWF, the consolidated index needs to reshape to absorb `/plan` ownership unilaterally | Coordinated deferral |

### §4.4 — Recommended coordination

**Hold W304-D §5 speckit-runtime consolidation until W307 PWF re-litigation completes.** Rationale:

- If W307 ratifies PWF as full T1 INSTALL → speckit-runtime collapses 9 skills behind 1 index + cites PWF for the `/plan` slot.
- If W307 deactivates PWF → speckit-runtime must absorb `/plan` ownership; the index expands to include a `speckit-plan` slot that replaces what PWF was providing.
- Doing both consolidations simultaneously risks coupling errors (the W295-r30→W296 silent-drift class).

**Operator-action AI-4 (MEDIUM) in §6** to enforce this coordination.

---

## §5 — Cardinal-rule self-check (re-stated for §5 mandate)

| Rule | Check | Result | Evidence |
|---|---|:---:|---|
| **R1** Install primitives only from trusted plugins/skills/agents | PWF is from upstream `OthmanAdi/planning-with-files` GitHub; version-pinned `2.38.1` | ✓ | `installed_plugins.json:686-696` |
| **R2** Hooks only upstream plugin OR direct upstream-CLI | This audit proposes no new hooks; smoke fixture is Python subprocess invocation (mirrors 5 sibling T1 fixtures) | ✓ | `harness/fixtures/smoke_astral_uv.py:23-58` pattern |
| **R3** Subagents = installed upstream agents OR documented subagent system | PWF has zero agents (verified §3.B); no new subagents proposed | ✓ | `.claude/plugins/cache/planning-with-files/planning-with-files/2.38.1/agents/` does not exist |
| **R4** Project behavior in CLAUDE.md + settings.json only | This audit writes to `docs/architecture/` + 4 operational actions written to `harness/fixtures/` + `verdicts/` + settings.json (no flip this wave) + VERDICT-LEDGER.md; NOT to `.claude/rules/` | ✓ | Path layout audit |
| **R5** Safety boundaries via Claude Code permissions + sandboxing | No custom guard scripts; smoke fixture uses standard Python subprocess + filesystem checks; no permission expansion needed | ✓ | smoke fixture template review |
| **CR-9 (CLAUDE.md:19)** version-pin discipline | PWF pinned at `2.38.1` in cache path AND `installed_plugins.json`; smoke fixture verifies this pin | ✓ | `.claude/plugins/cache/planning-with-files/planning-with-files/2.38.1/` |

**STOP-gate (CLAUDE.md:42)**:
- CLAUDE.md size ≤ 50 LOC → unchanged this wave (42 LOC).
- settings.json size ≤ 15 KB → unchanged this wave (13.2 KB; PARTIAL-COMPLY does not flip the enabledPlugins value).
- worktrees ≤ 3 → unchanged (this audit runs in main).
- 6 key MCPs ✓ → unaffected.
- codex `reviewGateEnabled:true` → unaffected.

**Self-invent self-check**: this audit produces ONE markdown file in `docs/architecture/W305-R8-IMPL-AND-FINAL-DEEP-AUDIT/` + ONE smoke fixture in `harness/fixtures/` (per W305-PLAN.md §2 file-ownership). Both are routine deliverables under sca-v5 SKILL.md §4.5 Lane-C smoke contract. `self_invented_count: 0` remains intact.

---

## §6 — Operator-action queue items

In priority order; new items routed from this audit:

1. **AI-1 (HIGH) — Mandatory W307 sca-v5 Phase-5 re-litigation of PWF**:
   - Run full Phase-5 5-gate audit with fresh data + multi-MCP cascade (github + deepwiki + exa + Bayesian author-prior re-check).
   - Apply Phase-6 position-swap MVP gate.
   - Operator explicit go/no-go after re-litigation: **(a) RATIFY-as-T1 + flip `enabledPlugins: true` permanently + close governance loop; (b) DEMOTE-to-T2-VENDOR-FORK + flip `enabledPlugins: false` + extract pattern into runtime; (c) DEMOTE-to-T3-PATTERN-STUDY + flip `enabledPlugins: false` + write `pattern_doc_path` artifact**.
   - Hard deadline: W307 wave (next +2 from current W305).

2. **AI-2 (HIGH) — Write the smoke fixture this wave**:
   - `harness/fixtures/smoke_planning_with_files.py` per §3.D action 2 spec.
   - Operator can implement immediately or defer; defer-acceptable but the smoke fixture is the cheapest Phase-5 Gate-2-equivalent + closes the W304-D §1.4 sibling-fixture gap.

3. **AI-3 (MEDIUM) — Adopt `tier_history[]` ledger column**:
   - Per W299-D §1.5 generalization: any candidate with prior `enabledPlugins: false` due to governance gate FAIL must re-pass that gate before re-enable.
   - Implementation: add `tier_history[]` column to `VERDICT-LEDGER.md` schema; populate retroactively for PWF (4-entry history per §3.D action 1); going forward, populate at every settings.json:enabledPlugins change for any candidate.
   - Blocks the silent-drift class that caused W296 → W299-D mis-call.

4. **AI-4 (MEDIUM) — Coordinate W304-D speckit consolidation with W307 PWF outcome**:
   - Hold the `speckit-runtime` index consolidation (W304-D §5) until W307 PWF re-litigation completes.
   - Add a comment in `docs/architecture/W304-DEEP-AUDIT-ALL-SOTA/W304-AUDIT-2026-05-18.md` referencing this deferral.

5. **AI-5 (LOW) — Backfill T6 basic-memory verdict files for all 11 missing ledger rows**:
   - Per W299-D §6 AI-3; PWF is the most-cited but not the only missing T6 file.
   - This audit's §3.D action 1 backfills ONE row (W305-PWF); the other 10 historical rows still lack T6 files.
   - Schedule W306-W308 in batches of 3-4 per wave.

6. **AI-6 (LOW) — Document the "no governance gate at re-enable" anti-pattern**:
   - Add a paragraph to sca-v5 SKILL.md §5.5 calling out the W295-r30 → W296-foundation pattern as a known failure mode.
   - Recommended wording: *"After any candidate has been DEACTIVATED via Phase-5 gate FAIL, settings.json enabledPlugins flip back to true REQUIRES (a) re-pass of all failed gates with fresh data, OR (b) explicit operator override with cite-anchor to current wave audit. Silent re-enable as part of a multi-plugin foundation commit is FORBIDDEN."*

---

## §7 — Open questions

1. **Q1 (HIGH)** — Should the retroactive-application policy in SKILL.md:346 be tightened?
   - The current policy ("v3.1 verdicts NOT auto-superseded") protected PWF from immediate T3 demotion in W295 — but it also created the loophole that W296 exploited.
   - **Proposal for sca-v6**: retroactive-application policy applies to verdicts NEVER ENABLED in settings.json. Once a verdict was enabled THEN deactivated via Phase-5 failure, retroactive carve-out does NOT apply to re-enable; re-enable requires fresh Phase-5 pass.

2. **Q2 (MEDIUM)** — Is the 2-MCP-family attribution count (github + deepwiki) actually a 1-org count when DeepWiki is a derived mirror?
   - This audit treats DeepWiki as a derived mirror of GitHub for organisational diversity purposes (§2.5).
   - Counter-position: DeepWiki is operated by a distinct entity (Devin) and adds AI-mediated analysis on top of the raw GitHub data — arguably 2 distinct MCP families even if same upstream artifact.
   - **Resolution**: defer to W307 re-litigation; operator may want to enforce "different upstream artifact" stricter rule OR allow "different MCP family with independent analysis" looser rule.

3. **Q3 (MEDIUM)** — Should the speckit consolidation be coupled to PWF re-litigation?
   - This audit recommends YES (§4.4 deferral) to avoid double-friction.
   - Counter-position: the consolidations are independent enough that proceeding with speckit-runtime while PWF re-litigates is operationally safe.
   - **Resolution**: operator preference; default = coupled deferral.

4. **Q4 (LOW)** — Does the W296 foundation commit message style ("enable 10 TIER-1 plugins") merit a commit-message lint rule?
   - The aggregated enable list hid the W295-r30 reversal.
   - Proposal: any settings.json enabledPlugins flip MUST cite the wave-audit that authorized the flip in the commit message subject line. Enforce via pre-commit hook.
   - Conflict with cardinal-rule-2 (no self-invented hooks): this would need to be an upstream plugin hook OR direct git-CLI invocation pattern. Defer to W307.

5. **Q5 (LOW)** — How frequently should Phase-5 retroactive audits run?
   - Currently triggered ad-hoc when operator-named (PWF in W305).
   - Proposal: every T1 INSTALL with `rule_version: "sca-v3.1"` auto-queues for Phase-5 retroactive audit at the next wave (W306+). This caps the lifecycle of v3.1-class verdicts.
   - Cost: ~$0.50-2.00 per retroactive audit × ~5 v3.1 T1 verdicts on the ledger = ~$5-10 one-time.

---

## §8 — Routed to W305-AUDIT synthesis

- **Verdict**: PARTIAL-COMPLY (Option C; not RATIFY, not DEACTIVATE).
- **Phase-5 gate-status**: 2 FAIL / 3 N/A / 0 PASS; retroactive-application policy blocks auto-demotion.
- **Settings.json action**: NO flip this wave; `enabledPlugins: true` remains.
- **New artifacts**: this file + (recommended) `harness/fixtures/smoke_planning_with_files.py` + (recommended) `verdicts/W305-othmanadi-planning-with-files-phase5-deferred.md` + VERDICT-LEDGER row append.
- **Operator-action queue**: 6 items added (1 HIGH, 1 HIGH, 1 MEDIUM, 1 MEDIUM, 1 LOW, 1 LOW).
- **Cross-stream coupling**: W304-D speckit consolidation deferred to W307 PWF outcome.
- **Open questions**: 5 (1 HIGH-priority sca-v6 retroactive-policy tightening proposal).
- **Cardinal-rule self-check**: R1-R5 + CR-9 ALL PASS.
- **Self-invent count**: 0 (this audit produces ONE markdown deliverable + one optional smoke fixture, both within W305-PLAN.md §2 file-ownership scope).

---

## §A — Cite-anchors

1. `docs/architecture/W288-RESEARCH-ARCH-v2/VERDICT-LEDGER.md` row #3 (`OthmanAdi/planning-with-files` T1 INSTALL 4.67/4.68, decided W291.Stage2 2026-05-18).
2. `.claude/skills/sota-convergence-audit/SKILL.md:327-346` Phase-5 5-gate codified protocol + retroactive-application policy.
3. `docs/architecture/W295-AUDIT-2026-05-18.md:130` HIGH SHIP-CHANGING finding — Gate-3 + Gate-5 FAIL + "do NOT re-enable until Phase-5 pass" + "Likely outcome: T2 VENDOR-FORK".
4. Commit `79d7b1f` (W295-codex-r30 amend): settings.json planning-with-files true→false deactivate pending Phase-5.
5. Commit `2bf2d27` (W296-foundation): silent re-enable as part of 10-plugin batch; no Phase-5 cite in commit message.
6. `docs/architecture/W299-E2E-CODEX-AND-RULES-AUDIT/W299-STREAM-D-DECISION-QUALITY-FEEDBACK.md:53-82` §1.5 deep-dive on Row 3 PWF (headline mis-call); §6 AI-1 HIGH operator-action.
7. `docs/architecture/W304-DEEP-AUDIT-ALL-SOTA/W304-STREAM-D-LOCAL-SKILLS-AGENTS-AUDIT.md:30,69` speckit-* cluster + 3-way collision with `planning-with-files:plan`.
8. `.claude/plugins/cache/planning-with-files/planning-with-files/2.38.1/` runtime-state probe (10 commands + 6 skills + 0 agents).
9. `.claude/plugins/installed_plugins.json:686-696` version-pin record `2.38.1`.
10. `.claude/settings.json:233` current live state `"planning-with-files@planning-with-files": true`.
11. `harness/fixtures/smoke_astral_uv.py` + 4 siblings — pattern reference for proposed `smoke_planning_with_files.py`.
12. CLAUDE.md:19 CR-9 version-pin discipline + CLAUDE.md:42 STOP-gate invariants.

---

## §B — Confidence levels (per W305-PLAN.md §5 verification)

| Finding | Confidence | Basis |
|---|:---:|---|
| Gate-3 FAIL (popularity + star-anchor bias) | HIGH | W295-AUDIT-2026-05-18.md:130 + codex r30 ratification + commit `79d7b1f` |
| Gate-5 FAIL (1-org effective; 2-org via mirror) | HIGH | Upstream-vs-mirror distinction explicit in SKILL.md:335 |
| Retroactive-application policy blocks auto-demotion | HIGH | SKILL.md:346 explicit text |
| W296 foundation commit was silent-drift | HIGH | Commit message `2bf2d27` does not cite Phase-5 |
| PARTIAL-COMPLY is recommended over DEACTIVATE | MEDIUM | Balances operator-friction + governance integrity; reasonable people could prefer DEACTIVATE |
| Speckit consolidation should be coupled to W307 outcome | MEDIUM | Reasonable people could prefer independent execution |
| Tier-history ledger column is the right silent-drift fix | MEDIUM | Validated against W299-D §1.5 generalization; alternative (commit-message lint) less preferred under cardinal-rule-2 |

---

## §C — Source-disagreement log (per sca-v5 §5.7)

| Topic | Source A | Source B | Disagreement | Resolution |
|---|---|---|---|---|
| Effective org-count for Gate-5 | W291.Stage2 verdict claim "2 MCP families" = 2-org | W295-AUDIT:130 finding "only 2-org" treated as below threshold | Implicit — Stage2 treated 2-org as sufficient; W295 treated it as insufficient | W295 wins under sca-v5 SKILL.md:335 (≥3-org explicit requirement); furthermore, upstream + mirror = 1 effective org per §2.5 |
| Tier outcome under retroactive Phase-5 | Strict-letter SKILL.md:340-344 composite trigger = T3 PATTERN-STUDY | Retroactive-application policy SKILL.md:346 = "not auto-superseded" | Direct policy conflict | Retroactive-application policy wins (chronological priority + explicit carve-out); operator-discretion re-litigation queues the strict-letter outcome for W307 |
| W296 re-enable as ratification | Operator-intent inference: foundation commit enabled 10 plugins including PWF, therefore tacit operator approval | Commit-message evidence: zero mention of Phase-5 status; W295-r30 governance contract unaddressed | Inference-vs-evidence | Evidence wins; tacit-approval is too weak to override explicit Phase-5 FAIL ratified via codex r30 |

---

## §D — Verification-on-completion (per W305-PLAN.md §5)

- **File written**: `docs/architecture/W305-R8-IMPL-AND-FINAL-DEEP-AUDIT/W305-STREAM-C-PWF-GOVERNANCE.md`
- **LOC**: ~450 (target 400-700; within range)
- **Phase-5 5-gate audit**: 5 gates explicitly scored (§2.1-2.5 + §2.6 composite)
- **Verdict**: PARTIAL-COMPLY (§0 + §3.D)
- **Cite-anchors**: 12 (§A); requirement was ≥3 — exceeded.
- **Cross-impact on speckit cluster**: §4 (4 subsections, recommended W304-D coupling)
- **Cardinal-rule self-check**: §5 (R1-R5 + CR-9 ALL PASS)
- **Operator-action queue**: §6 (6 items, prioritized 2 HIGH + 2 MEDIUM + 2 LOW)
- **Open questions**: §7 (5 items, 1 HIGH sca-v6 proposal)
- **Source-disagreement log**: §C (3 disagreements logged)
- **Confidence levels**: §B (key findings rated HIGH/MEDIUM)
- **Anti-patterns avoided**:
  - Did NOT rubber-stamp ratification without Phase-5 gate analysis (§2 + §3.A).
  - Did NOT recommend DEACTIVATE without considering operator-friction (§3.A Option B analysis).
  - Did NOT skip cross-impact on speckit cluster (§4 dedicated section).
- **Self-invent count**: 0 (single markdown deliverable per W305-PLAN.md §2; optional smoke fixture also within scope).

---

**End of W305 Stream C — PWF Phase-5 governance reconciliation.**
