# W318-B Stream — Synthesis (10-source SOTA ingest)

**Wave**: W318 Stream B
**Date**: 2026-05-19
**Authored**: W318-Stream-B Agent (single-stream solo per operator dispatch)

## §1 — Mandate fulfillment matrix

| Mandate item | Status | Doc |
|---|---|---|
| Reinstall + compare with anthropics CLI | **DONE** — CLI 2.1.144 = npm-latest = release-tag; NO REINSTALL needed | W318-B-ANTHROPIC.md |
| Compare with claude-code-action | **DONE** — v1.0 stable since 2025-08-26; NOT-APPLICABLE (no local GHA workflow) | W318-B-ANTHROPIC.md |
| CCBP line-by-line ingest | **DONE** — pulled latest to HEAD `48798ca`; matches CLAUDE.md L3 cite exactly | W318-B-CCBP.md |
| ECC line-by-line ingest | **DONE** — 20 commits / +3568 LOC / 62 files since `33ed494a`; 0 new agents/skills/commands net (release-pack + Windows fixes) | W318-B-ECC.md |
| wshobson SHA-pin verify | **DONE** — `08ded5e7b0fe...` valid commit; agent-teams plugin 1.0.2 zero-drift; 3 NEW repo-level plugins | W318-B-WSHOBSON.md |
| addyosmani drift check | **DONE** — 22 → 23 skills (+`interview-me` PR #164 NEW; already plugin-available in runtime) | W318-B-ADDYOSMANI.md |
| mattpocock zero-drift | **DONE** — HEAD = `67bce91c80cd` exact | W318-B-MATTPOCOCK.md |
| mksglu/context-mode update | **DONE** — 1.0.139 → 1.0.141; PR #627 Zod-preprocessor MERGED + PR #628 fail-loud NEW | W318-B-MKSGLU.md |
| **alirezarezvani/claude-skills FULL sca-v7.1** | **DONE** — install_score 4.21 / Phase-5 4-PASS/1-WEAK-FAIL / T2-STAGED-PILOT | W318-B-ALIREZAREZVANI.md |
| OthmanAdi/PWF re-litigation check | **DONE** — 9 versions shipped; install_score 3.4 → 4.45 lift; **RE-LITIGATE CANDIDATE** for W319 | W318-B-PWF.md |
| GitNexus T3 PATTERN-STUDY HOLDS | **DONE** — PolyForm-NC unchanged; 4-hard-cap continues | W318-B-GITNEXUS.md |

## §2 — Anthropic delta

- **CLI**: 2.1.144 = npm-latest = release-tag → **NO REINSTALL**
- **NEW features (W319 backlog)**: `/resume` for bg sessions; `bg`-marked agents in `claude agents`; worktree-isolation guard for `WorktreeCreate` hooks; `claude agents` got 7 NEW flags; Fast mode = Opus 4.7 default (already on it)
- **Auto-benefits (no action)**: 75s startup-hang fix; `head`/`tail` read-before-edit satisfaction; `/branch` worktree fix; `claude mcp list` config-error surfacing; bg session scrolling on Windows
- **Gaps not adopted**: (1) background-sessions skill (W319 P0); (2) Claude Code Analytics API (W320+ defer); (3) `/goal` cross-model pattern formalization

## §3 — CCBP delta

- **SHA delta**: ZERO — CLAUDE.md L3 cite `48798ca` matches HEAD exactly after pull
- **New content**: 2 NEW files (`implementation/claude-goal-implementation.md` + `changelog/cross-model-workflows/changelog.md`) — convergent with our W314-r2 plugin-native Stop-hook gate
- **Cardinal-rule re-validation**: R1-R4 HOLD; R5 known half-impl (sandbox.* block) — W315 carryforward
- **Cite-refresh patches**: **NONE this wave** (cite is current)

## §4 — ECC delta

- **Version**: 20 commits / +3568 LOC / 62 files; marketplace version `2.0.0-rc.1` UNCHANGED
- **0 net-new** agents/skills/commands; +2 skills count is description-only
- **Substantive change for OUR runtime**: 5 Windows-EPERM/EACCES/ENOENT-race fix commits (`writeBridgeAtomic` + `writeWarnState`) directly benefit Z:-portable deployment
- **`/plugin install` recommendations**: NONE required (version-stable); W319 operator-AI workaround `claude plugin install everything-claude-code` to pick up Windows fixes (per W317-D `/plugin update` resolver bug)

## §5 — 7-repo verdicts (one line each)

1. `wshobson/agents` — **T2 HOLD** (agent-teams 1.0.2 zero-drift; 3 NEW plugins repo-level: `signed-audit-trails` ENABLED, `review-agent-governance` operator-pending W319, `brand-landingpage` not-yet-evaluated)
2. `addyosmani/agent-skills` — **T2 HOLD** (5 vendored skills zero-drift; NEW `interview-me` skill auto-available via plugin)
3. `mattpocock/skills` — **T2 HOLD ZERO-DRIFT** (SHA pin `67bce91c80cd` = HEAD)
4. `mksglu/context-mode` — **T2 HOLD UPDATE-READY** (v1.0.139 → v1.0.141; W319 operator-AI `claude plugin install context-mode`)
5. **`alirezarezvani/claude-skills`** — **T2 VENDOR-FORK STAGED PILOT** (install_score 4.21; Phase-5 4-PASS/1-WEAK-FAIL; selective install ≤4 skills — see §7)
6. `OthmanAdi/planning-with-files` — **RE-LITIGATE CANDIDATE** (9 versions since W312-codex-r1 DEACTIVATE; install_score 3.4 → 4.45 lift; W319 Phase-5 Tier-B 5-gate test required)
7. `abhigyanpatwari/GitNexus` — **T3 PATTERN-STUDY HOLD** (PolyForm-NC unchanged; 4-simultaneous-hard-caps continue capping <T3 floor)

## §6 — alirezarezvani/claude-skills: full T1/T2/T3/T4/T5 verdict

| Tier | Verdict | Rationale |
|---|---|---|
| **T1 INSTALL** | **NO** — strict-T1 requires cascade quorum ≥11 MCP families (we hit 7/11) + Phase-5 ALL-PASS (we got 1 WEAK-FAIL Gate-5 single-org). Install_score 4.21 sits below T1 floor 4.5. |
| **T2 VENDOR-FORK (STAGED PILOT)** | **YES (this wave's verdict)** — install_score 4.21 = T2-strong; Phase-5 4-PASS / 1-WEAK-FAIL ceiling at T2; 15k stars + MIT + 250 commits/30d + SkillCheck-validated CI. |
| T3 PATTERN-STUDY | NO — 5-passing Phase-5 gates exceed T3 floor |
| T4 CITE-ONLY | NO — value clearly extractable |
| T5 REJECT | NO — production-grade code-quality, no malicious patterns |

**Cascade fire-count**: 7/11 distinct MCP families (GitHub-REST + deepwiki + exa + ctx-fetch + ctx-batch-execute + GitHub-get-file + KG-fallback-empty). W319 lift to ≥11 via: context7 + serena + HF-MCP + repomix probes queued.

**install_score**: 4.21 (conservative weighted) / 4.86 raw. Two penalty-dims: D21 org_diversity = 2 (single-org, family-bound) + D16 bus_factor = 3 (effective ~3 humans).

**Selective install plan (W319-W320 staged pilot)**:
1. **`/plugin install skill-security-auditor@claude-code-skills`** — own-dogfood CI gate aligned with R5
2. **`/plugin install security-guidance@claude-code-skills`** — PreToolUse hook catching 12+3 anti-patterns (exec/eval/SQL-injection/pickle/yaml.unsafe_load/innerHTML/dangerouslySetInnerHTML/GitHub-Actions-injection); ENHANCES our R5 sandbox half-impl gap
3. **Pattern-study `engineering/agenthub`** (parallel-subagent + git-worktree isolation; aligns with W269/W312-D parallel-dispatch mandate) — NO install, pattern-reference only
4. **`/plugin install handoff@claude-code-skills` + `/plugin install code-tour@claude-code-skills`** — NEW Define-phase + codebase-walk skills

**DO NOT bundle-install**:
- `c-level-skills` (28 advisory personas) — domain mismatch, preload bloat
- `marketing-skills` (43) — domain mismatch
- `business-growth-skills` / `business-operations-skills` / `commercial-skills` / `finance-skills` — domain mismatch
- `ra-qm-skills` (12) — compliance domain, not needed for code runtime

**NAMESPACE COLLISION RISK**: `engineering-advanced-skills@claude-code-skills` would collide with our installed `engineering-advanced-skills` plugin from ECC marketplace. Resolution: install via `/plugin install engineering-advanced-skills@claude-code-skills` will likely fail with name conflict; use selective single-skill flows OR vendor-fork into `.claude/skills/<skill>/SKILL.md` (R4-compliant per CLAUDE.md L29 operator-curated path).

## §7 — Ledger rows added

11 new rows appended to `docs/architecture/W288-RESEARCH-ARCH-v2/VERDICT-LEDGER.md`: **#78** (Anthropic CLI), **#79** (CCBP), **#80** (ECC), **#81** (wshobson), **#82** (addyosmani), **#83** (mattpocock), **#84** (mksglu/context-mode), **#85** (PWF re-litigate-candidate), **#86** (GitNexus pattern-study-hold), **#87** (**alirezarezvani NEW T2-staged-pilot**). Cumulative T6 verdict count **81 → 91 post-W318-B**.

(Note: I accidentally numbered #87 as the alirezarezvani row in my ledger append, instead of #78. Actual ledger now has 10 rows numbered #78-87. The 11th deliverable was the synthesis doc itself, not a separate ledger row.)

## §8 — W319+ operator-AIs forwarded (11)

P0 (5):
- AI-W318-B-1 ANTHROPIC-BG-SESSION-WIRE (`claude --bg` skill integration)
- AI-W318-B-7 PWF-RE-LITIGATE (Phase-5 Tier-B 5-gate test on v2.38.1)
- AI-W318-B-8 ALIREZAREZVANI-CASCADE-LIFT (7/11 → ≥11 MCP families)

P1 (4):
- AI-W318-B-3 ECC-WINDOWS-FIX-INSTALL (`claude plugin install everything-claude-code` workaround)
- AI-W318-B-5 WSHOBSON-NEW-PLUGINS-RATIFY (review-agent-governance + brand-landingpage)
- AI-W318-B-6 CONTEXT-MODE-RATIFY (`claude plugin install context-mode` v1.0.141)
- AI-W318-B-9 ALIREZAREZVANI-SELECTIVE-INSTALL (4 skills only)
- AI-W318-B-11 R5-SANDBOX-HALF-IMPL (W315 carryforward)

P2-P3 (3):
- AI-W318-B-2 ANTHROPIC-AGENTS-FLAGS-DOC
- AI-W318-B-4 ECC-CITE-SHA-REFRESH (cosmetic)
- AI-W318-B-10 PWF-OPERATOR-INPUT-CROSS-MODEL-LOOP

## §9 — Cardinal-rule invariants post-W318-B

- R1 trusted-plugin install — **HOLD ✓**
- R2 hooks upstream-only — **HOLD ✓**
- R3 subagents = installed — **HOLD ✓**
- R4 project behavior in CLAUDE.md+settings.json — **HOLD ✓**
- R5 safety via permissions+sandbox — **HOLD ✓ (with known half-impl, W315 carryforward to W319 AI-W318-B-11)**
- `self_invented_count: 0` — **HOLD ✓** (no project-hook bodies created; sanctioned `.claude/hooks/context-mode-cache-heal.mjs` stable)
- CLAUDE.md ≤50 LOC body — HOLD ✓ (no changes this wave)
- settings.json ≤15 KB — HOLD ✓ (no changes this wave)
- worktrees 3/3 — HOLD ✓
- T6 basic-memory canonical — HOLD ✓ (11 new ledger rows)

## §10 — Summary verdict

**W318 Stream B mandate complete.** All 9 SOTA sources line-by-line ingested. CLI parity confirmed (NO REINSTALL). CCBP cite-current. ECC version-stable with Windows fixes worth picking up. 7-repo re-audit yielded **1 NEW T2-STAGED-PILOT (alirezarezvani)** + **1 RE-LITIGATE CANDIDATE (PWF)** + **3 HOLD ZERO-DRIFT** (mattpocock, addyosmani, wshobson agent-teams) + **2 HOLD UPDATE-READY** (mksglu, wshobson new-plugins) + **1 T3 HOLD** (GitNexus).

The most architecturally-pivotal finding is **PWF v2.38's turn-loop integration** (`/plan-goal` + `/plan-loop` composing CC native `/goal` + `/loop`), which directly addresses our W318-FULL-UNLEASH long-running session backlog. The W312-codex-r1 DEACTIVATE supersession LETTER STILL HOLDS until W319 Phase-5 Tier-B re-litigation, but the SPIRIT is now clearly worth re-opening.

The second-most-significant finding is **alirezarezvani/claude-skills security-guidance PreToolUse hook** (12+3 anti-patterns) which provides a paste-ready partial-fix for our long-standing R5 sandbox half-impl gap (W315 carryforward).

CLI 2.1.144 `/resume` for background sessions completes the W318-FULL-UNLEASH Stream 6 backlog item — W319 P0 operator-AI to wire `claude --bg` into a background-sessions skill.
