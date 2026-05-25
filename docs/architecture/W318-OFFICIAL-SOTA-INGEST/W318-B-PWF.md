# W318-B Stream — OthmanAdi/planning-with-files (PWF) Re-Audit

**Wave**: W318 Stream B
**Date**: 2026-05-19
**Source**: `Z:/repos/deps/planning-with-files`
**Prior verdict**: W312-codex-r1 DEACTIVATE supersedes earlier T1; W308/W309 strict-letter T3 PATTERN-STUDY with Phase-5 4-FAIL + Gate-3 MT-Bench hard-cap ≤T3. Settings.json has `planning-with-files@planning-with-files: false`.

## §1 — Upstream activity since W312

| Metric | Value |
|---|---|
| Current upstream HEAD | `d27008f369a5c58f315ce74194ff1c21b9a0eedc` |
| Latest version | **`2.38.1`** |
| W312 cited version | (deactivated, no version-pin cited) |
| Versions shipped since W312 | **v2.35.0 → v2.35.1 → v2.36.0 → v2.36.1 → v2.36.2 → v2.36.3 → v2.37.0 → v2.38.0 → v2.38.1** (9 minor/patch releases) |
| Installed plugin cache | `Z:/claude-sota-installed/.claude/plugins/cache/planning-with-files/planning-with-files/2.38.1/` |
| Installed but DISABLED in settings.json | `planning-with-files@planning-with-files: false` (W312-codex-r1) |

## §2 — Substantive new features since W312 (CHANGELOG analysis)

### v2.38.0 (2026-05-14) — Claude Code Turn-Loop Integration ⭐
- **`/plan-goal` slash command**: composes with Claude Code's `/goal` primitive (v2.1.139, May 12 2026). Derives goal condition from active plan (`all phases in task_plan.md report Status: complete`) and forwards to `/goal`. Plan-aware termination criterion.
- **`/plan-loop` slash command**: composes with `/loop` primitive (v2.1.72+). Default 10-minute tick re-reads planning files, runs `check-complete`, nudges entry in `progress.md`.
- **`templates/loop.md`**: planning-aware default prompt for `.claude/loop.md` (project) or `~/.claude/loop.md` (user).
- **PreCompact hook**: fires on autoCompact + manual `/compact`. Surfaces reminder to flush in-context progress to `progress.md` before compaction; prints `Plan-SHA256` if attestation is set.
- **OpenCode SQLite session catchup**: reads OpenCode's new SQLite store at `${XDG_DATA_HOME:-~/.local/share}/opencode/opencode.db`.

### v2.37.0 (2026-05-12) — Hash Attestation
- **Hash attestation for plan injection** (Issue #150): opt-in second layer for `task_plan.md` auto-injection. `/plan-attest` script computes SHA-256 of `task_plan.md`, stores at `.planning/<active-plan>/.attestation`. On every hook fire, recomputes hash; mismatch blocks injection with `[planning-with-files] [PLAN TAMPERED — injection blocked]`.
- Parity-locked version bumper

### v2.36.0 (2026-05-08) — Parallel Plan Isolation
- **Parallel plan isolation** with `set-active-plan` + `resolve-plan-dir` scripts
- **Codex session isolation**
- **Hermes adapter** for cross-tool support

### v2.38.1 (2026-05-16) — Hotfix
- Fixed description-field garbled in Claude Code skill picker (delimiter swap `---` → `===`)

## §3 — Convergent design with our runtime

PWF v2.38 is **DEEPLY CONVERGENT** with our runtime:
- Our loop skill uses Claude Code `/loop` — PWF v2.38 adds `/plan-loop` composing it
- Our codex Stop-hook gate uses `/goal` cross-model — PWF v2.38 adds `/plan-goal` composing it
- Our `durable-planning-files` SKILL.md already advocates "task_plan.md + findings.md + progress.md in working directory" — **PWF makes this concrete** with hooks + attestation
- Our PreCompact mention in `everything-claude-code:strategic-compact` is informal — **PWF's v2.38 PreCompact hook formalizes** progress-flush before compaction

## §4 — Why W312-codex-r1 supersession HOLDS in spirit (despite v2.38 progress)

W312-codex-r1 reverted the re-enable based on Phase-5 strict-letter 4-FAIL with Gate-3 MT-Bench hard-cap forcing ≤T3. The hard caps were:
- D8 license? **MIT — PASS**
- D16 bus_factor? Single-author Othman + recent contributors (`Emin017`, `voidborne-d`, `bmyury`, `oaabahussain`) — IMPROVED (BUS_FACTOR ≥3 now)
- D24 mcp_attack_surface? **N/A** (no MCP server)
- D14 install_spec? **CR-9-compliant via `/plugin install planning-with-files`**
- Phase-5 MT-Bench? UNKNOWN — would require running sca-v7 Phase-5 Tier-B gates

### Critical re-litigation case

The v2.38 turn-loop integration is **PRECISELY the W318-FULL-UNLEASH backlog item** — convergent with our long-running session pattern. The W312-codex-r1 DEACTIVATE verdict was based on W309 strict-letter Phase-5 at v2.35.0. At v2.38.0:
- Bus factor IMPROVED (≥3 active contributors)
- Cross-tool harness (Codex, Hermes, OpenCode adapters)
- Hash attestation = formal tamper-evidence (D33 cross_source_consensus_quorum +1)
- `/plan-loop` + `/plan-goal` cross-product with native CC primitives = strict architectural-fit

### Phase-5 strict-letter re-test would be required for re-enable

Phase-5 Tier-B gates (per sca-v7 §3.5):
- Gate-1 license — MIT PASS
- Gate-2 install_spec CR-9 — PASS
- Gate-3 MT-Bench independence — REQUIRES running MT-Bench on v2.38 (NOT done this wave; deferred W319)
- Gate-4 silent-fallback density — IMPROVED via attestation (v2.37) and delimiter fix (v2.38.1)
- Gate-5 org-diversity — PARTIAL (single owner Othman, multi-contributor PRs)

## §5 — sca-v7.1 re-audit (provisional, pending Phase-5 Gate-3)

| Dim | W309/W312 score | W318 score | Delta | Cite |
|---|---|---|---|---|
| D5 release cadence | 4 | **5** | +1 | 9 versions in ~2 months |
| D8 license | 5 (MIT) | 5 | 0 | — |
| D14 install spec | 5 | 5 | 0 | — |
| D16 bus factor | 2 (solo Othman) | **4** | +2 | 4 ext contribs (Emin017, voidborne-d, bmyury, oaabahussain) |
| D17 test_coverage | 4 | **5** | +1 | `tests/test_v238_command_files.py` 7 tests + `tests/test_session_catchup_opencode.py` 4 tests added 2026-05-14 |
| D19 code_review | 4 | 4 | 0 | PRs reviewed |
| D21 org_diversity | 1 (single-org `OthmanAdi`) | 2 | +1 | external contributors but single-org |
| D27 indep_adopter_floor | 3 | **5** | +2 | `buzhangsan/skill-manager` registry + ClawHub adoption (per README v2.38.1) |
| D29 browse_quality | 4 | 5 | +1 | comprehensive CHANGELOG + sync to 5 IDE adapters |
| D31 silent_fallback | 3 | **5** | +2 | v2.37 hash attestation + v2.38.1 delimiter fix |
| D32 pin_freshness | 4 | 5 | +1 | very active versioning |
| D33 cross_source_quorum | 3 | 4 | +1 | adopted into 5 IDEs (Claude, Codex, Cursor, OpenCode, Hermes) |

**install_score recompute (28.0 denom)**:
- Prior W309/W312 ~3.4 (T3 PATTERN-STUDY)
- W318 provisional: ~4.45 (T2 VENDOR-FORK-equivalent, T1-eligible if Phase-5 Gate-3 MT-Bench passes)

## §6 — VERDICT

| Item | Verdict |
|---|---|
| Upstream activity | **EXTRAORDINARY ACTIVITY** — 9 versions in 2 months; v2.38 turn-loop integration is architecturally pivotal |
| W312-codex-r1 supersession | **STILL HOLDS LETTER** — DEACTIVATE flag at settings.json:`planning-with-files@planning-with-files: false` is CORRECT until W319 explicit re-litigation |
| **Re-litigation justified?** | **YES** — bus factor +2 (2→4), test coverage +1 (4→5), silent-fallback +2 (3→5), indep adopter +2 (3→5), cross-source-quorum +1 (3→4). install_score lifted ~3.4 → ~4.45 |
| **W319 action plan** | **RE-LITIGATE** under sca-v7.1 with full Phase-5 Tier-B 5-gate test on v2.38.1; if PASS, re-enable in settings.json (cite-anchor: this W318-B-PWF.md doc + W319 codex round-1 review) |
| Architectural-fit | **HIGH** — PWF v2.38's `/plan-loop` + `/plan-goal` directly compose with our `loop` skill + `codex` Stop-hook gate. Plan-aware long-running session = sibling of W318-FULL-UNLEASH backlog. |
| Ledger row | **NEW: #79 — RE-LITIGATE candidate (T2/T1-eligible pending Phase-5 Gate-3)** |
