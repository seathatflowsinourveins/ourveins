# W282 — 4-Stream Deep-Audit Synthesis (2026-05-18)

Followup to W281 ship-arc. Operator request: "what is next steps? please deep audit current architecture from all dimensions".

## Method

W269 mandate: parallel agent-team fan-out for multi-workstream audit (4 streams).

- **Stream A** — Memory, Agent-teams, Hooks (`W282A-stream-memory-teams-hooks.md`)
- **Stream B** — Skills, Parallel-git (`W282B-stream-skills-parallel-git.md`)
- **Stream C** — Cross-session, Observability, W281 STOP-gate post-merge (`W282C-stream-cross-session-obs.md`)
- **Stream D** — Cardinal-rule invariants, Plugin health, Stale refs, Codex review-gate, Install-state drift (`W282D-stream-cross-cutting.md`)

## Coverage advances (vs W281h baseline 86%)

- D1 Memory: 88% → 94% (Stream A)
- D2 Agent-teams: held (Stream A confirmed cap=4 + presets honored)
- D3 Hooks: 95% → 100% (Stream A; UserPromptSubmit verified via hindsight plugin auto-fire)
- D4 Skills: corrected baseline — **89.8% PASS** (Stream B; W280f CRLF bug inflated FAIL counts)
- D5 Parallel-git: confirmed linear-history at trunk (`main` 8/8 first-parent linear)
- D6 Cross-session: 6/7 STOP-gate items PASS (Stream C; basic-memory leak FIXED W282a)
- D7 Observability: hindsight ✓ Phoenix ✓ cognee ✓ — langfuse :3000 attempted, blocked

## P0 fixes shipped this session

| Wave | Commit | Issue |
|---|---|---|
| W282a | `4fd191d` | basic-memory state leak into repo (W281e/i env redirect order issue) → .gitignore + state-outside-repo config pre-created + leak deleted |
| W282b | `27567b4` | `agent-skills@addy-agent-skills` orphan-enable flipped false + 2 wshobson agent duplicates deleted + R3/R2 exception docs |

## Key revisions to W281 narrative

1. **Skill audit numbers** (Stream B): W280f reported "203 FAIL + 2,204 PARTIAL". Re-audit with CRLF-aware parser shows **0 FAIL · 351 PARTIAL · 3,088 PASS (89.8%)**. W281g Cohort A fix still valid (11 local FAIL→PASS). Upstream-PR backlog is 351 PARTIAL not 2,407.
2. **UserPromptSubmit hook** (Stream A): NOT unwired as W281h reported. Hindsight plugin ships it (auto-recall on every prompt via `cache/hindsight/hindsight-memory/0.6.5/hooks/hooks.json`). Verified in this session (hindsight_memories injected as additionalContext).
3. **`.claude/agents/*.md`** (Stream D): documented R3 exception. Per `https://docs.anthropic.com/en/docs/claude-code/sub-agents` the directory IS the official subagent location. `self_invented_count: 0` invariant refers to W255 cleanup (`.claude/rules/*.md` + `.claude/hooks/scripts/*.py`) NOT subagents.

## Remaining actionable backlog (ranked)

| Priority | Item | Effort | Source |
|---|---|---|---|
| P0 | Re-baseline skill counts in W280f + W281h docs (CRLF correction) | small | Stream B |
| P1 | Upstream PR to affaan-m/everything-claude-code (107 skills H2→description) | medium | Stream B |
| P1 | Upstream PR to alirezarezvani/claude-skills (16 slash-command-skills reclass) | small | Stream B |
| P1 | W272 + W273 stranded SOTA work — merge OR abandon decision needed | operator | Stream B |
| P2 | langfuse :3000 — POSTGRES_PORT override in compose to avoid :5432 pg0 collision | small | Stream A + this session |
| P2 | openinference-instrumentation-anthropic install for OTEL Phoenix bridge | small | Stream C |
| P2 | group_id namespace standardization across 6 memory tiers (currently graphiti=eee only) | medium | Stream A |
| P3 | context-mode-cache-heal.mjs — upstream PR to mksglu/context-mode plugin | medium | Stream D |
| P3 | 8/21 marketplaces unused — candidate cleanup | small | Stream D |

## STOP-gate post-merge state (final)

- `git status --short` clean ✓
- `wc -l CLAUDE.md` 41 ≤ 50 ✓
- `ls tmp/repomix-library/packed/*.xml | wc -l` 52 ≥ 52 ✓
- No new `.claude/hooks/scripts/*` or `.claude/rules/*` ✓
- PreCompact hook in settings.json ✓
- Codex review-gate `stopReviewGate=true`, 0 stuck jobs ✓
- 8 W281+W282 commits on main with `Codex-Review:` trailer or pending status ✓

## Cardinal-rule invariants (post-W282)

- R1 (trusted-source installs): PASS — Stream D found 0 untrusted; orphan-enable cleaned W282b
- R2 (hooks direct-CLI or upstream-plugin): PASS — 7/7 wired hooks compliant; context-mode-cache-heal.mjs documented exception
- R3 (subagents = installed upstream OR documented system): PASS — `.claude/agents/*.md` IS Anthropic's documented system; 2 wshobson duplicates removed W282b
- R4 (behavior in CLAUDE.md + settings only): PASS — `find .claude/rules` empty
- R5 (safety via CC permissions): PASS — 11 allow + 18 deny lists in settings; no custom guards
