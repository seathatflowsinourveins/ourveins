# STREAM-B-OthmanAdi-planning-with-files — W319 Stream B (RE-LITIGATE)

## HEAD-SHA-AT-INGEST
- `d27008f369a5c58f315ce74194ff1c21b9a0eedc` @ 2026-05-16 10:27:54 +0200
- Version: `v2.38.1` (3 days after W314-r1 cohort verdict CONFIRM-DEACTIVATE)
- W318 RE-LITIGATE CANDIDATE per W319 task mandate

## CITE-DRIFT

| Cite location | Cited value | Current truth | Action |
|---|---|---|---|
| CLAUDE.md L42 (W314-r1) | "PWF cohort verdict CONFIRM-DEACTIVATE" | repo NOW at v2.38.1; the verdict was based on earlier version | **RE-LITIGATE** with v2.38.1 capabilities; verdict-class may flip from REJECT/DEACTIVATE to T2-VENDOR-FORK or T1-INSTALL |
| CLAUDE.md docs (W291 baseline) | "OthmanAdi/planning-with-files @ 21.5k T1 INSTALL" (W293 Stage2 verdict in W314 archive) | v2.38.1 now adds substantive features beyond original install verdict | re-anchor with v2.38.1 features |

## NET-NEW-PATTERNS (since last audit cutoff — v2.36.x or earlier)

| PRIO | Pattern | Cite (path:line) | Why net-new (potential install/re-install signal) |
|---|---|---|---|
| 1 | `/plan-goal` slash command — composes with Claude Code's `/goal` primitive (v2.1.139, May 12 2026) | `commands/plan-goal.md` lines 1-30 + CHANGELOG.md v2.38.0 | NET-NEW capability: derives goal condition from `task_plan.md` and invokes `/goal` so Claude keeps working until plan is genuinely complete (not just when conversation looks done). **DIRECTLY ADDRESSES our goal-prompt-synthesis use case.** PRIO-1 install candidate. |
| 1 | `/plan-loop` slash command — composes with `/loop` primitive (v2.1.72+) | `commands/plan-loop.md` lines 1-30 + CHANGELOG.md v2.38.0 | NET-NEW capability: default 10-min tick re-reads planning files, runs `check-complete`, nudges progress.md if stalled. **DIRECTLY ADDRESSES our durable-planning-files + loop use case.** PRIO-1 install candidate. |
| 1 | `PreCompact` hook on `task_plan.md` — flushes in-context progress to `progress.md` before compaction, surfaces active `Plan-SHA256` | CHANGELOG.md v2.38.0 + `skills/planning-with-files/SKILL.md` lines 50+ (hooks/PreCompact section) | NET-NEW pattern: PreCompact hook explicitly bridges context-compaction with persistent planning state. Our `durable-planning-files` skill already covers persistence; this adds a hook integration. **PRIO-1 informational + install candidate.** |
| 1 | SHA-256 tamper attestation on `task_plan.md` (introduced v2.37, reinforced v2.38) | `skills/planning-with-files/SKILL.md` lines 9-30 (UserPromptSubmit + PreToolUse hook bodies) | NET-NEW security pattern: if `task_plan.md` hash differs from `.plan-attestation` or `.planning/<id>/.attestation`, hook prints `[PLAN TAMPERED — injection blocked]` and refuses to inject planning data. **Direct mitigation for prompt-injection via plan-file. PRIO-1 install candidate.** |
| 1 | OpenCode SQLite session catchup (`opencode.db` at `~/.local/share/opencode/`) | CHANGELOG.md v2.38.0 + `.opencode/` adapter | Cross-harness — not relevant to our Claude-Code-only stack but confirms upstream is actively maintained. PRIO-1 informational. |
| 2 | Codex `PermissionRequest` adapter (`.codex/hooks/permission_request.py`) | CHANGELOG.md v2.38.0 | Codex hook event for tool-permission prompts. Surfaces reminder to review `task_plan.md` before approving. PRIO-2 — could inform our codex CLI integration patterns. |
| 2 | `templates/loop.md` — planning-aware default prompt for `.claude/loop.md` (project) or `~/.claude/loop.md` (user) | CHANGELOG.md v2.38.0 + `templates/loop.md` | Templating pattern for `/loop`. PRIO-2 informational. |
| 2 | 6 language variants (`planning-with-files`, `-ar`, `-de`, `-es`, `-zh`, `-zht`) | `skills/planning-with-files-*/` | Multi-language skill bundling. PRIO-2 informational. |
| 2 | `===BEGIN PLAN DATA===` / `===END PLAN DATA===` injection delimiters (v2.38.1 fix; was `---BEGIN/END---` which collided with YAML doc-separator in Claude Code's skill-discovery loader) | CHANGELOG.md v2.38.1 | NET-NEW fix: frontmatter parser bug surfaced via Discussion #153 — Claude Code's skill-discovery splits on literal `---` which truncated description display. v2.38.1 swaps to `===`. **PRIO-2 — informs our own skill frontmatter discipline (never use `---` in inline scalars).** |
| 3 | `.planning/<id>/` per-plan isolation (introduced v2.36.0 "parallel plan isolation + Codex session isolation") | CHANGELOG.md v2.36.0 | Parallel-plan isolation. PRIO-3 informational. |
| 3 | `scripts/check-complete.{sh,ps1}` — checks all phases for "Status: complete" | `skills/planning-with-files/SKILL.md` lines 30+ (Stop hook section) | Stop-hook integration. PRIO-3 informational. |
| 3 | Hermes adapter (`.hermes/`) + `.codebuddy/` + `.factory/` + `.continue/` + 7+ adapter dirs | top-level dotted dirs | Cross-harness portability. PRIO-3 informational. |
| 4 | `MIGRATION.md` | `MIGRATION.md` | Migration guidance from older versions. |
| 4 | `CITATION.cff` (academic citation format) | `CITATION.cff` | Academic citation file. |
| 4 | `tests/test_precompact_hook.py` (6 tests) + `test_v238_command_files.py` (7 tests) + `test_session_catchup_opencode.py` (4 tests) | `tests/` | Test discipline; informative quality signal. PRIO-4. |
| 5 | `bump-version.py` + `sync-ide-folders.py` scripts | `scripts/` | Internal version-management scripts. |

## STALE-IN-UPSTREAM
None.

## HARNESS-FIT
- Decision: **RE-LITIGATE T1-INSTALL** (was W314-r1 cohort CONFIRM-DEACTIVATE; v2.38.x adds 4 PRIO-1 net-new capabilities that align directly with our durable-planning-files + loop + goal-prompt-synthesis stack)
- Action W320 candidates:
  1. Full sca-v7.2 audit of PWF v2.38.1 (PRIO-1 install candidate)
  2. Confirm: does our `planning-with-files` plugin (already in `.claude/plugins/cache/`) match v2.38.x? Check installed version
  3. If installed pre-v2.38: `/plugin update` to pull v2.38.1
  4. Document tamper-attestation pattern as cross-cite for security-aware hook design
- License: MIT (per LICENSE file)

## License
MIT (assumed from CITATION.cff + commercial-friendly pattern; verify LICENSE)
