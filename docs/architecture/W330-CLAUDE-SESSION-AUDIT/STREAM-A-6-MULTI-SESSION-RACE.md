# W330 Stream A-6 — Multi-Session Race Count + Prevention Status

> **Wave**: W330 · **Stream**: A-6 (Claude-session audit) · **Date**: 2026-05-19
> **Scope**: cumulative multi-session race count · W330 new races · provenance-lint v2 prevention effectiveness.

## §1 Race-event history (anchored)

| Wave | Race finding | Detail | Source cite |
|---|---|---|---|
| W320 | Race-1 — Stream cross-attribution mismatch | Parallel-session attributed work to W319 streams when actually W320 streams owned them; W319-W320 boundary blurred in commit ancestry | W320-codex-r2 + commit `411c077 ship(W327-codex-r2): propagate claim-narrowing + remove parallel-session contradictions` (historical remediation surface) |
| W326 | Race-2 — Closure-synthesis self-attribution drift | Multi-session race correction landed in `569080a ship(W326-codex-r1): provenance + anti-bias closure (multi-session race correction)` | commit `569080a` + W326-CLOSURE-SYNTHESIS |
| W328 | Race-3 — "5/5 SHIPPED" false claim | W328 synthesis prior version falsely claimed `SKILL-ABSORB-MEGA / INSIGHTS-WIRE-AUTO / K-5+K-8+UPSTREAM-FINAL / SOTA-BYPASS` shipped; codex round-21 BLOCK forced correction; CONSOLIDATED narrative now distinguishes Claude-session vs Parallel-session work-tracks | W328-CLOSURE-SYNTHESIS "[CORRECTED per codex round-21 BLOCK]" header + W328-Multi-Session-Race-Acknowledgment (3rd consecutive) |
| W329 | Race-4 — Pre-commit stash/restore wipes Edit changes | W329-A-4-SMOKE-RESULTS.md + STREAM-A-SYNTHESIS.md doc-corrections DEFERRED to W330 because pre-commit stash/restore race-condition wiped Edit-tool changes | `W329-CODEX-R1-CLOSURE.md` "Multi-Session Race Note" |
| **W330 (this audit)** | **Race-5 candidate — IDENTIFIED + ASSESSED §2 below** | THIS STREAM A-6 §2 | THIS DOC |

**Cumulative W320 + W326 + W328 + W329 = 4 consecutive multi-session race events.** Verified by W329-CODEX-R1-CLOSURE.md L46 "W320 + W326 + W328 + W329 = 4 consecutive multi-session races".

## §2 W330 race candidates assessed

### §2.1 Candidate-A — Claude-session vs parallel-session work-track separation

**Observation**: Claude-session shipped W319-W329 (25 cumulative codex rounds, commits `e1a7ec6` to `e980d06`). Parallel-session shipped W330-MEGA-AUDIT + W330-SOTA-DISCIPLINE-CLOSURE. The two work-tracks have potential attribution-overlap zones:

1. `tools/preagent-parallel-guard.mjs` — Claude-session W326 P0-A1 SHIP; Parallel-session W330 P0-A UPGRADE
2. `.claude/skills/task-close-discipline/SKILL.md` — Parallel-session W330-D NEW SKILL
3. `docs/architecture/W330-MEGA-AUDIT/CLAUDE-MD-EDIT-PROPOSAL.md` — Parallel-session-authored, modifies CLAUDE.md (Claude-session-owned territory per /goal scope)
4. `tools/insights-wireup/*.ps1` — Claude-session W328 SHIP (commit `8932a48 feat(W328): insights-wireup helpers + tools/patches`); Parallel-session W330-A1 uses but does NOT modify

**Assessment**: ✓ **NO RACE** on tools/preagent-parallel-guard.mjs (clear ownership: Claude-session W326 = creation, Parallel-session W330 = upgrade; both attributed correctly). ✓ **NO RACE** on tools/insights-wireup (Parallel-session is consumer, not modifier). ⚠ **POTENTIAL RACE-FRINGE** on CLAUDE.md (parallel-session proposes edits, Claude-session must approve via Edit tool — clear protocol, no conflict THIS audit).

### §2.2 Candidate-B — Settings.json edit ownership

Per W330-A1 §2.b notes: "Coordination: parallel sota-converge-w310 session owns settings.json — operator must merge with their working tree before paste." This is an ACKNOWLEDGED OVERLAP-ZONE — both sessions could touch settings.json.

**Assessment**: ⚠ **EXPLICIT OWNERSHIP ASSIGNMENT PRESENT** — parallel-session explicitly delegates settings.json edits to the other session, AVOIDING race. This is the protocol working as intended (per W280d "one git worktree per session" mechanization).

### §2.3 Candidate-C — VERDICT-LEDGER.md attribution

Per CLAUDE.md L34 "Cumulative verdict ledger: per-wave `docs/architecture/W<N>-*/VERDICT-LEDGER.md` rows + T6 basic-memory canonical (root-level `VERDICT-LEDGER.md` removed W329-D — was stale pointer per Stream D §3)".

Bash probe per Stream A-1 §1 task plan: `tail -40 Z:/claude-sota-installed/VERDICT-LEDGER.md` returned **empty** — file does NOT exist at root (per W329-D removal). Per-wave verdict ledger lives in T6 basic-memory + W330-MEGA-AUDIT/CODEX-VERDICT-LEDGER.md.

**Assessment**: ✓ **NO RACE** — single authoritative ledger (T6 basic-memory); root-level pointer correctly removed W329-D.

### §2.4 Candidate-D — Task plan duplicate work

Both sessions appear to have `task_plan.md`:
- Parallel-session: `docs/architecture/W330-MEGA-AUDIT/task_plan.md` (per `ls W330-MEGA-AUDIT/`)
- Claude-session: per operator request, this audit is in `docs/architecture/W330-CLAUDE-SESSION-AUDIT/` directory which Claude-session OWNS exclusively

**Assessment**: ✓ **NO RACE** — strict file ownership boundary per operator instructions ("STRICT FILE OWNERSHIP: docs/architecture/W330-CLAUDE-SESSION-AUDIT/STREAM-A-*.md only").

## §3 Verdict for W330

**Race count**: 4 historical + **0 new W330 races detected** = **4 cumulative**.

**Confidence**: HIGH (this audit explicitly checks 4 overlap zones; all show either clear ownership or explicit delegation; none show mutually-conflicting edits in the same commit window).

**Important caveat**: ABSENCE of detected race ≠ proof of no race. The detection method (file-ownership grep + commit-message attribution-keyword check) catches the failure modes seen W320/W326/W328/W329 but cannot catch novel race patterns (e.g. memory-state divergence, hook-firing-order races). W331 should sweep at codex-r26 closure for any new patterns.

## §4 Provenance-lint v2 prevention effectiveness

Per `docs/architecture/W328-PROVENANCE-LINT-V2/` + `.pre-commit-config.yaml`:

- **Implementation**: 5 claim-form ERE regex + path-normalization + prose-mode-exclusion
- **Smoke tests**: 7/7 PASS at ship per W328-CLOSURE-SYNTHESIS
- **Specific races BLOCKED**: W320 + W326 cross-attribution patterns (W328-C explicitly states "W320+W326 races NOW genuinely BLOCKED")

**Effectiveness probe THIS audit**: did provenance-lint v2 catch ANY race-pattern attempts since W328 ship?
- `git log --oneline` between W328 and W330 shows commits `9aacaf7 ship(W328): SOTA-research-arch full-depth gap-resolution + 2 USER-ERROR-CONFIRMED course corrections` + W329-A through W329-K + `e980d06`
- No commit message indicates a provenance-lint BLOCK was overridden (no `--no-verify` flags) — but this is implicit (would only show in commit if blocked-then-bypassed)
- W329 race-4 (pre-commit stash/restore wipes Edit changes) is a NEW failure mode the provenance-lint v2 does NOT address — provenance-lint targets attribution-claims, not file-content-loss

**Verdict**: ✓ **EFFECTIVE for attribution-races** (W320/W326-class patterns BLOCKED) · ⚠ **INEFFECTIVE for content-loss races** (W329 pre-commit-stash-wipe class needs separate fix).

## §5 W329 pre-commit stash/restore race remediation status

Per W329-CODEX-R1-CLOSURE.md "Multi-Session Race Note": "Recommend W330 codify --safe-edit flow that bypasses stash cycle for doc-only edits."

**W330 status**: NO `--safe-edit flow` skill or hook shipped this wave. Per W330-MEGA-AUDIT/REMEDIATION-PLAN-V2 §4 "Revised P1 (Wave W331)", no item explicitly addresses safe-edit flow either.

**Recommendation**: Claude-session W331 forward-queue P0 should add **"W331.X — Codify --safe-edit doc-only edit flow"** to bypass pre-commit stash for doc-only changes (e.g. checking modified-files pattern: if all in `docs/**/*.md` or `tmp/**` → skip stash cycle).

## §6 INDEPENDENCE-PROOF (Δ-G51)

- **FOUNDATION-ANCHOR**: `docs/architecture/W329-CLOSURE-SYNTHESIS/W329-CODEX-R1-CLOSURE.md` (4-consecutive-race anchor) + `docs/architecture/W328-PROVENANCE-LINT-V2/` (v2 implementation + smoke tests).
- **COUNTERFACTUAL**: IF the runtime's specific race-detection methodology were proven invalid, multi-session-race-avoidance still holds BECAUSE **mutex/lock-based concurrency control** is a 60+ year computer science discipline (Edsger Dijkstra "Cooperating Sequential Processes" 1965; Tony Hoare CSP 1978; Leslie Lamport "Time, Clocks, and the Ordering of Events" 1978). Git itself implements this at the worktree-level (each worktree maintains its own HEAD + index; concurrent worktrees CANNOT corrupt each other).
- **Three independence pillars**:
  1. **Dijkstra ≠ Hoare ≠ Lamport ≠ git-scm** — four entirely distinct researchers/projects.
  2. **Causal**: concurrent-edit-safety is foundational CS, not Anthropic-derived.
  3. **Temporal**: Dijkstra 1965 predates Claude Code 2025 by 60 years.

## §7 Forward queue

- **W331 P0**: codify --safe-edit doc-only flow per §5 (closes W329 race-4 prevention gap)
- **W331 P0**: re-validate provenance-lint v2 effectiveness at codex r26 verdict (verify no new race patterns)
- **W331 P1**: provenance-lint v3 enhancement: add memory-state divergence detection (e.g. T6 basic-memory write conflicts; new failure mode class not covered by v2)
- **W331 P2**: explicit per-worktree branch-lock file (`.claude/.session-lock`) per W280d mechanization (W330-MEGA-AUDIT Stream A G3 found `eee.ps1` does NOT mechanize this)
