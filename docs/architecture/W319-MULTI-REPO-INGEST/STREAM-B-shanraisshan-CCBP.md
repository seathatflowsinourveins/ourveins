# STREAM-B-shanraisshan-CCBP — W319 Stream B

## HEAD-SHA-AT-INGEST
- `48798ca687773d7d33e4952e9174bdc481173707` @ 2026-05-18 23:05:46 +0500
- Repo: `shanraisshan/claude-code-best-practice` (was `shanyu0` per W315-r2 owner-rename cite-fix)
- Latest commit: `chore(readme): bump badge timestamp to May 18, 2026 11:05 PM PKT`
- Body-content-stable per W314 §C cross-SHA check (last meaningful change `00e6db4` `update`)

## CITE-DRIFT

| Cite location | Cited value | Current truth | Action |
|---|---|---|---|
| CLAUDE.md L3 | `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-memory.md:34-40 @ HEAD 48f2ceb` | local repo HEAD now `48798ca` (10 commits since 48f2ceb, all `chore(agent-collections): scheduled refresh` + 4 readme badge bumps + 1 `updated codex hooks`) | UPDATE cite SHA `48f2ceb → 48798ca`; per CLAUDE.md L3's own protocol (W314 §C cross-SHA check) content stability across `1386b0e → ac0d87d → 48f2ceb → 48798ca` is invariant for `claude-memory.md` body |
| CLAUDE.local.md L9 (`claude-memory.md:113 @ ac0d87d`) | ac0d87d | content unchanged through 48798ca | optional refresh cite to 48798ca |
| CLAUDE.local.md L18 (`claude-settings.md:877-921 @ ac0d87d`) | ac0d87d | content unchanged | optional refresh |
| CLAUDE.local.md L62 (`claude-settings.md:826 @ HEAD ac0d87d`) | ac0d87d | verified content at line 826 still env-var table (`ANTHROPIC_DEFAULT_HAIKU_MODEL_NAME`); CLAUDE_AUTOCOMPACT_PCT_OVERRIDE has moved to elsewhere | re-anchor: claude-settings.md is 1170 lines; auto-compact section needs fresh line search |

Net cite-drift: 1 cite SHA refresh (CLAUDE.md L3 W315 chain `48f2ceb → 48798ca`). No content drift.

## NET-NEW-PATTERNS

| PRIO | Pattern | Cite (path:line) | Why net-new |
|---|---|---|---|
| 2 | `agent-teams-prompt.md` separated section | `agent-teams/agent-teams-prompt.md` | New top-level prompt artifact for agent-teams since last cite-anchor; CLAUDE.md W269/W312-D agent-teams mandate currently anchors only `https://code.claude.com/docs/en/headless` — could anchor to this canonical CCBP prompt too for cross-cite reinforcement. |
| 2 | `implementation/claude-scheduled-tasks-implementation.md` documents `/loop` cron interval (1m), 3-day auto-expire, session-scoped lifecycle | `implementation/claude-scheduled-tasks-implementation.md` lines 1-50 | CLAUDE.md L18 mode-(4) background sessions + `loop` skill could cite this for parameter defaults. |
| 2 | `best-practice/claude-power-ups.md` documents `/powerup` (introduced v2.1.90) with 10 interactive lessons | `best-practice/claude-power-ups.md` | Net-new affordance not yet in our skill catalog or CLAUDE.md; teaching-mode tool. PRIO-2 (operator-AI-W320 to consider) |
| 3 | `reports/claude-advanced-tool-use.md` — advanced tool-use patterns | `reports/claude-advanced-tool-use.md` | Reference doc for advanced tool-use patterns not yet anchored. |
| 3 | `implementation/claude-goal-implementation.md` + `assets/impl-goal-codex.png` — codex `/goal` interaction docs | `implementation/claude-goal-implementation.md` | Documents `/goal` skill primitive — anchorable from `goal-prompt-synthesis` skill. |
| 4 | `claude-skills.md` `frontmatter fields = 15` (incl. `paths`, `effort`, `model`, `agent`, `context: fork`, `hooks`) | `best-practice/claude-skills.md` lines 18-37 | This is the canonical CCBP skill frontmatter table. CLAUDE.md should cite for skill authoring (cardinal-rule-3 sub-cite). |
| 4 | `claude-skills.md` lists 6 official bundled skills incl. `loop`, `simplify`, `batch`, `debug`, `claude-api`, `fewer-permission-prompts` | `best-practice/claude-skills.md` lines 40-50 | Confirms `fewer-permission-prompts` skill is canonical-bundled; our `claude-code-skills` marketplace already provides; doc anchor. |
| 5 | `videos/` folder for tutorial videos | `videos/` | Demo content; no engineering value. |
| 5 | `tips/` folder | `tips/` | Tips reference; no engineering value. |

## STALE-IN-UPSTREAM
None. All CCBP files we cite still exist with stable line anchors. Owner rename `shanyu0 → shanraisshan` already applied in W315-r2.

## HARNESS-FIT
- Decision: N/A (cite-reference only; cardinal-rule-1 prohibits installing CCBP as primitive — it's a doc repository, not a plugin)
- Action: refresh CLAUDE.md L3 SHA from `48f2ceb` to `48798ca` next CLAUDE.md edit; content-invariance preserves all cite anchors
- License: not detected at root (CCBP appears to be unlicensed reference content with the operator's research notes)

## License
Not detected at root — content appears to be documentation curation. Cite-reference use only is consistent with content-license norms.
