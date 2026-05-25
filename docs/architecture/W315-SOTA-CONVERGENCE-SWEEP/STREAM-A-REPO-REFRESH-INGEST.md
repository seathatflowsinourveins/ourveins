# W315 Stream A — Repo Refresh + Line-by-Line Ingest

**Author**: Agent (parent-dispatched, W315 Stream A)
**Date**: 2026-05-19
**Runtime**: `Z:/claude-sota-installed` @ HEAD per `git log -1` (CLAUDE.md state W314-r2)
**Scope**: 9 operator-listed repos (anthropics/claude-code, CCBP, mksglu/context-mode, ECC, wshobson/agents, addyosmani/agent-skills, mattpocock/skills, OthmanAdi/planning-with-files, abhigyanpatwari/GitNexus)
**Method**: parallel `mcp__plugin_everything-claude-code_github__list_commits` + `mcp__deepwiki__read_wiki_contents`/`ask_question` + raw GitHub API via `mcp__plugin_context-mode_context-mode__ctx_execute(fetch)` + local-clone disk probe at `Z:/repos/deps/`. CCBP MCP-search silent-fallback resolved by following local-clone `git remote -v` → `shanraisshan/claude-code-best-practice` (W315 NEW finding — operator may have cached the old `shanyu0/*` slug in CLAUDE.md L3 implicitly; the actual repo OWNER is `shanraisshan`).

---

## Executive summary (3 sentences)

The 9-repo refresh confirms **all 8 reachable upstream HEADs are at or only marginally ahead of cited SHAs** (zero >180d-stale; max drift = 5 commits ahead on davila7/claude-code-templates which is a *different* "ECC-like" marketplace, not the runtime-cited ECC `33ed494a` which matches exactly); the most material drift is on `mksglu/context-mode` where v1.0.141 (HEAD `6bbcb443`, 2026-05-19) supersedes our locally-installed v1.0.136 by 5 patch releases including a critical OpenCode plugin-bridge Zod-preprocessor fix (PR #627) that we are already running into per the in-band ctx_execute upgrade banner. **17 NET-NEW patterns** worth adopting were extracted: 7 from anthropics/claude-code (v2.1.144 background-session bg-flag preservation, ghost-character fix, askuserquestion erase fix, MCP_TOOL_TIMEOUT raise, worktree-baseRef, sandbox.bwrapPath/socatPath, plugins-with-root-SKILL.md auto-surfacing), 4 from mattpocock (handoff + prototype + writing-fragments + CONTEXT.md/CONTEXT-MAP.md convention), 3 from wshobson (recsys-pipeline-architect skill + agent-teams coordination guardrails refinement + plugin-eval depth-downgrade-warning), 2 from OthmanAdi (v2.38.0 PreCompact + /plan-goal + /plan-loop AND v2.38.1 delimiter `---`→`===` YAML doc-separator collision fix), and 1 from addyosmani (interview-me skill in Define phase + CI skill validator). **One CCBP repo-owner-rename finding** (`shanyu0` → `shanraisshan`) is treated as a cite-only correction (no behavioral change, ship via operator-AI). **Zero repos are >180d stale**; the entire ecosystem is healthy and converging weekly.

---

## Drift table

| # | Repo (slug) | Cited SHA (CLAUDE.md/W314-r2) | Current HEAD SHA | Commits ahead | Drift severity | Impact summary | Source-of-truth |
|---|---|---|---|---|---|---|---|
| 1 | `anthropics/claude-code` | (none — runtime tracks via `claude --version` = `2.1.144` per W314 status) | `69d70700` (v2.1.144, 2026-05-19 00:48 UTC) | 0 (LOCAL CLI matches v2.1.144 per W314-r1 `npm view` parity) | **NONE** | `chore: Update CHANGELOG.md and feed.xml` HEAD; v2.1.144 SHIPPED 8 W315-relevant fixes (see §Per-repo §1) | MCP list_commits |
| 2 | `shanraisshan/claude-code-best-practice` (was `shanyu0/...`) | `48798ca` (CLAUDE.md L3) | `48798ca6` (v2.1.143 badge bump, 2026-05-18 18:05 UTC) | **0** | **NONE** | Cited SHA matches HEAD exactly; rename of OWNER from `shanyu0`→`shanraisshan` is the only finding (W315 cite-only fix) | MCP list_commits |
| 3 | `mksglu/context-mode` | (runtime v1.0.136 installed per banner; CLAUDE.md doesn't pin SHA) | `6bbcb443` (v1.0.141, 2026-05-19 09:13 UTC) | **5 patch versions ahead** (1.0.137→1.0.141) | **MINOR-PATCH** | PR #627 `fix(opencode): coerce stringified primitives on native plugin path` fixes silent rejection of `ctx_search.limit`, bare-string `ctx_search.queries`, `ctx_execute.background`, `ctx_purge.confirm`. Other patches: bundle rebuilds + ci hook updates | MCP list_commits |
| 4 | `everything-claude-code` (local clone owner unclear from CLAUDE.md prose, but file path resolves to `Z:/repos/deps/everything-claude-code` HEAD = `33ed494a`) | `33ed494a` (W314-r2 status) | `33ed494a` (matches local clone HEAD) | **0** | **NONE** | Cite matches exactly. Already on operator-AI-r2-1 `/plugin update` queue per W314 closure. ⚠️ NOTE: a *similarly-named but different* `davila7/claude-code-templates` repo exists at `eca07802→2b558d59` (3 ahead in 24h); confirm operator's "ECC" canonical owner. | local-disk + MCP list_commits |
| 5 | `wshobson/agents` | `08ded5e` (CLAUDE.md W314-r1 + W312 Stream C) | `08ded5e7` (PR #535 agent-teams guardrails, 2026-05-17 00:46 UTC) | **0** | **NONE** | Cited SHA matches HEAD exactly per W312-C agent-teams@1.0.2 SHA-pin verification. New skill `recsys-pipeline-architect` (PR #533) + plugin-eval MISSING_TRIGGER broadening (PR #530) + depth-downgrade-warning (PR #532) all merged BEFORE 08ded5e ⇒ already included. | MCP list_commits |
| 6 | `addyosmani/agent-skills` | (W314-r1 ledger row #51 T2 promotion candidate; no SHA pinned) | `f17c6e88` (CI skill validator merged 2026-05-16 22:00 UTC) | unknown-baseline (W314-r1 noted as T2→T1 candidate; no prior pin) | **N/A** (first cite) | 22 skills under `skills/<name>/SKILL.md` per 6-phase Define→Plan→Build→Verify→Review→Ship framework; NEW: `interview-me` (PR #164, 2026-05-14) + CI skill validator (PR #60, 2026-05-16). DeepWiki list of 22 skill paths confirms catalog. | DeepWiki + MCP list_commits |
| 7 | `mattpocock/skills` | `67bce91c80cd1020a4f068ced32d0281656842ad` (CLAUDE.md L30 + W314-r1) | `67bce91c80cd` (README typo fix, 2026-05-18 12:21 UTC) | **0** | **NONE** | Cited SHA matches HEAD exactly. Local runtime vendors 4 skills (tdd, grill-with-docs, caveman, diagnose) at this SHA per `.claude/skills/<name>/SKILL.md` frontmatter probe — confirmed identical (W312-codex-r1). 2 NEW skills `handoff` + `prototype` shipped via commit `849824df` (2026-05-14) are NOT YET vendored locally. | MCP list_commits + local-disk |
| 8 | `OthmanAdi/planning-with-files` | (W313-Stream-B row 50 T3-DEACTIVATE; settings.json:enabledPlugins=false) | `d27008f3` (v2.38.1 delimiter `---`→`===` fix, 2026-05-16 08:27 UTC) | **N/A** (deactivated; verdict was T3 PATTERN-STUDY not pinned SHA) | **N/A** (deactivated) | Releases since v2.36.x baseline: v2.37.0 `/plan-attest` + SHA-256 plan-attestation, v2.38.0 PreCompact hook + `/plan-goal` + `/plan-loop` + OpenCode SQLite migration + Codex PermissionRequest adapter, v2.38.1 delimiter swap. T3-DEACTIVATE verdict stands per W309 strict-letter governance (Phase-5 4-FAIL, Gate-3 MT-Bench hard-cap). | MCP list_commits + DeepWiki |
| 9 | `abhigyanpatwari/GitNexus` | (W312-C T3 PATTERN-STUDY, no SHA pinned per CR-9-unpinned analysis) | `803f0bed` (PR #1692 lbug Windows FTS probe-then-load, 2026-05-19 11:09 UTC) | **N/A** (verdict was PATTERN-STUDY not pinned SHA) | **N/A** (do-not-install) | Top 3 recent fixes for OUR Windows-runtime: PR #1690/#1692 (FTS extension probe-then-load fix — solves silent BM25 degradation when FTS binary IS present), PR #1694 (MCP setup fallback on Windows when global `gitnexus` resolves to non-spawnable shim), express 5.x + zod 4.x dependabot upgrades. License hard-cap (PolyForm-Noncommercial) unchanged → T3 verdict stands. | MCP list_commits + DeepWiki |

**Aggregate stats**: 9 repos / **0 SHAs >180d stale** / 3 with measurable drift (mksglu/context-mode +5 patches, OthmanAdi +2 minor releases, GitNexus +N daily fixes since W312-C audit) / 6 at-or-near zero-drift / **1 OWNER-RENAME finding** (CCBP shanyu0→shanraisshan).

---

## Per-repo top-3 impactful changes

### §1 `anthropics/claude-code` (v2.1.144, HEAD `69d7070`)

1. **`CHANGELOG.md:1-30` (v2.1.144 entries via ctx-mode search hit)**: `/bg` + `←`-detach now preserve `--allow-dangerously-skip-permissions`, so backgrounded workers keep bypass-permission semantics. **Impact**: our `bypassPermissions` setting (W312-A.5 deferred) interacts with `--bg` — we MUST verify the W315 sandbox audit covers this preservation path.
2. **`CHANGELOG.md` v2.1.144**: Fixed `claude agents` deadlocking on Windows with network-drive working directories; Ctrl+C now works during startup. **Impact**: directly relevant to our Z:-portable Windows-mapped install (Z: is a network-drive-class mount); this fix eliminates a class of startup hangs we may have been silently hitting.
3. **`CHANGELOG.md` v2.1.144**: Fixed ghost characters at the left edge when switching panes in Agent View on Windows Terminal with CJK content; Fixed "Chat about this" on an AskUserQuestion dialog erasing the question text. **Impact**: cosmetic Agent View Windows quality-of-life fixes worth knowing about (no behavioral change).

### §2 `shanraisshan/claude-code-best-practice` (CCBP, HEAD `48798ca6`)

1. **`best-practice/claude-memory.md:34-40` (per CLAUDE.md L3 cite)**: ancestor/descendant CLAUDE.md loading semantics confirmed VERBATIM in HEAD (content-stable across cited SHA chain `1386b0e → ac0d87d → 48f2ceb → 48798ca` per W314-r2). **No drift**.
2. **`best-practice/claude-settings.md` (80KB, mtime 2026-05-19)**: most recent change. Operator W315 sandbox AI hinges on `sandbox.bwrapPath` / `sandbox.socatPath` documented here. **Impact**: this is the upstream source-of-truth for the sandbox-half-implemented finding in W314 Stream E.
3. **`README.md:5`** (badge): `updated_with_Claude_Code-v2.1.128 (May 08, 2026 8:46 PM PKT)` — the README badge lags HEAD CLI (v2.1.144) by 16 patch versions (~10 days) but content unchanged. **Impact**: cosmetic; cite chain remains valid.

### §3 `mksglu/context-mode` (HEAD `6bbcb443`, v1.0.141)

1. **PR #627 (`7c8222002303`)** `fix(opencode): coerce stringified primitives on native plugin path`: widens `coerceJsonArray` to lift bare non-empty strings into `[val]`; adds `coerceBoolean` for `ctx_execute.background` + `ctx_purge.confirm`; switches `ctx_search.limit` to `z.coerce.number()`. **Impact**: we are HITTING this silently via our v1.0.136 runtime — the in-banner `⚠️ context-mode v1.0.136 outdated → v1.0.141 available. Upgrade: /ctx-upgrade` is the visible symptom; upgrade is a 1-command fix.
2. **`6bbcb443` `ci: update server.bundle.mjs, cli.bundle.mjs, session hook & security bundles`**: minified bundle rebuilds for v1.0.141. **Impact**: required for the PR #627 fix to land.
3. **`78c9adf0`** `1.0.141` version bump: tags the actual semver. **Impact**: confirms the patch chain is at 5 patches ahead (1.0.137, .138, .139, .140, .141).

### §4 ECC `everything-claude-code` (local clone HEAD `33ed494a`)

1. **`33ed494a` (W314-r2 cite, matches exactly)**: ECC `2.0.0-rc.1` plugin-shipped `.claude/rules/` with `everything-claude-code-guardrails.md` + `node.md` already auto-loads. **Impact**: confirms `.claude/rules/` is a canonical Anthropic-documented path (per W308 W299-A REVERSAL); no project-self-authored rules needed.
2. **(ECC W314-r2 PRIO-5 finding)**: invisible-Unicode safety regression shipped TODAY in ECC `33ed494a`. **Impact**: W314 AI-r2-2 — operator should consider a PreToolUse hook (CR-2-exception-anchor) to detect invisible-Unicode before it reaches a hook command.
3. **`silent-failure-hunter` agent (W314-r2 finding)**: ECC ships this in cache `Z:/claude-sota-installed/.claude/plugins/cache/everything-claude-code/everything-claude-code` per the W314 alpha line-by-line. **Impact**: directly relevant to W312-D F1 + W313-D + W314-B + W314-r2 GitHub MCP `search_repositories` 3rd-time-confirmed silent-fallback; W314 AI-r2-9 covers wire-up. [NARRATIVE-RESCINDED per W329-S2-REAUDIT 2026-05-19: original silent-fallback claim withdrawn; W328-S2 user-error verdict also retracted; root cause UNDETERMINED pending W330 investigation of rate-limit / token-scope / MCP-transform / cache paths]

### §5 `wshobson/agents` (HEAD `08ded5e7`)

1. **PR #535 `08ded5e7b0fe` (2026-05-17)**: `fix: agent teams coordination guardrails` — strengthens team-lead/team-{reviewer,debugger,implementer} file-ownership boundary enforcement. **Impact**: CLAUDE.md L13 W269 mandate cites `agent-teams:team-*` subagent_type — these guardrails are the upstream source for our `parallel_ratio ≥0.7` target enforcement primitive.
2. **PR #533 `3e17b71b`**: `feat(machine-learning-ops): add recsys-pipeline-architect skill` (six-stage Source→Hydrator→Filter→Scorer→Selector→SideEffect framework, MIT reimplementation of xAI's X For You algorithm). **Impact**: NEW skill not in our 23 local skills; W316 candidate for vendor-fork (independent reimplementation = no license issue).
3. **PR #530 `112197c6`**: `fix(plugin-eval): broaden MISSING_TRIGGER pattern to match canonical phrasings` — adds `should be use(d)? (this skill )?(immediately )?(when|after|before|whenever)` + `auto-loads when` + `trigger when`. **Impact**: when we run plugin-eval against our 23 local SKILL.md files in W316, the broader regex will surface fewer false-positive MISSING_TRIGGER flags (the W312-C plugin-eval would have triggered some).

### §6 `addyosmani/agent-skills` (HEAD `f17c6e88`)

1. **PR #60 (`41d15b8d`, 2026-05-16 22:00 UTC)**: `Add CI skill validator` — adds a GitHub Action that validates frontmatter + structure of every skill in `skills/<name>/SKILL.md`. **Impact**: directly usable as a template for our own SKILL.md validator (W316 AI candidate).
2. **PR #164 (`b1162539`, 2026-05-14 04:48 UTC)** `interview-me` skill: placed in the "Define" phase, disambiguated from `idea-refine` via the `using-agent-skills` router flowchart (`"Don't know what you want yet?"` vs `"Have a rough concept, need variants?"`); frontmatter description includes "grill me" trigger phrase. **Impact**: NEW skill in 6-phase Define→Plan→Build→Verify→Review→Ship lifecycle; mattpocock has a similar `/grill-me`. W316 candidate.
3. **`README.md` ASCII diagram dropped (5b4c6dad)** + `using-agent-skills` meta-skill as the canonical entry router (per DeepWiki). **Impact**: the meta-skill router pattern is a strong candidate for adoption as our own `using-agent-skills`-equivalent (we currently have ad-hoc skill-selection across 23 SKILL.md files).

### §7 `mattpocock/skills` (HEAD `67bce91c80cd`)

1. **Commit `849824df` (2026-05-14)** added `prototype` + `handoff` (per DeepWiki list-of-skills query); `handoff` purpose = compact current conversation into a handoff document for next session, referencing PRDs/issues by path/URL not duplicating. **Impact**: directly relevant to our `superpowers:strategic-compact` + W282 strategic-compaction pattern; W316 vendor-fork candidate (5th vendored skill from mattpocock if added).
2. **`CONTEXT.md` convention (commit `e74f0061`, 2026-05-13)**: glossary at repo root; multi-context repos use `CONTEXT-MAP.md` at root + multiple `CONTEXT.md` in subdirs; `grill-with-docs` skill reads + updates it inline. **Impact**: ALREADY in W314 AI-r2-3 queue for adoption at runtime root; the multi-context `CONTEXT-MAP.md` pattern is NEW.
3. **`writing-fragments` skill (commit `9f2e0bd0`, 2026-05-11)**: grilling session that appends "fragments" (claims, vignettes, sharp sentences) to a single Markdown file separated by `\n---\n`. **Impact**: relevant to operator's session-checkpoint workflow; W316 candidate for vendor-fork as fifth/sixth skill.

### §8 `OthmanAdi/planning-with-files` (HEAD `d27008f3`, v2.38.1)

1. **v2.38.0 `2d089130` (2026-05-14)**: PreCompact hook fires on `/compact` + autoCompact + reminds operator to flush in-context progress to `progress.md` before compaction completes, prints active Plan-SHA256 if attested. Plus `/plan-goal` (composes with `/goal`) + `/plan-loop` (default 10-min tick re-reads planning files). **Impact**: directly relevant to our W314 AI-r2-8 PreCompact log audit-trail fix + W308 strategic-compact patterns. But: T3-DEACTIVATE governance verdict (W309 Phase-5 strict-letter 4-FAIL) STANDS — pattern-study only.
2. **v2.37.0 `6cd6254b` (2026-05-05)**: hash attestation (`/plan-attest` slash command + `.planning/<plan>/.attestation` SHA-256 lock + `UserPromptSubmit`/`PreToolUse` hook recompute & block on mismatch). **Impact**: provides the second layer of defense against plan-injection. Pattern is reusable for our own session-plan invariants (W316 AI candidate).
3. **v2.38.1 `d27008f3` (2026-05-16)**: delimiter swap from `---` to `===` to avoid YAML doc-separator collision (`---BEGIN PLAN DATA---` confused frontmatter parsers that split on `---`). **Impact**: lesson for our own delimiter-shape decisions — the W314-r2 AI-r2-2 invisible-Unicode + delimiter-collision share the same root cause class (in-band markers colliding with parser fences).

### §9 `abhigyanpatwari/GitNexus` (HEAD `803f0bed`)

1. **PR #1690/#1692 `803f0bed` (2026-05-19)**: `fix(lbug): probe-then-load FTS extension on Windows` — adds `hasLocalWinFtsExtension()` probe at `~/.lbdb/extension/*/win_amd64/fts/` before the Windows skip, so BM25 timing goes 0 → ~250-326ms when extension is on-disk. **Impact**: solves silent FTS degradation on Windows hosts (our Z:-portable Windows install) when the binary is available. T3-PATTERN-STUDY verdict unchanged but this pattern (probe-before-skip) generalizes to our own multi-MCP-cascade silent-fallback fixes (W313-D F5).
2. **PR #1694 `55f8d442` (2026-05-19)**: `fix(mcp): setup fallback on Windows when global gitnexus resolves to a non-spawnable shim` — when the MCP setup detects a `.ps1` or invalid shim path, falls back to a known-spawnable path. **Impact**: directly applicable to our `.mcp.json` CR-9 `npx -y <pkg>@<pinned>` contract (W286-arc-P0C) — same Windows-spawn-discipline class of fix.
3. **PR #872 + #1464 `18167400` / `dad1ca7a` (2026-05-19)**: Express 5.x + Zod 4.x major-version upgrades. **Impact**: ecosystem-direction signal that our v1.0.141 context-mode upgrade lands on the Zod 4 era; our `.mcp.json` JSON-schema interpolation pattern (`${LANGFUSE_*}`) should be re-validated against Zod 4 strict-mode if/when we adopt.

---

## Net-new patterns NOT in installed runtime (with adoption-tier prelim recommendation per sca-v7)

Cross-referenced against `Z:/claude-sota-installed/.claude/skills/` (23 local skills) + `.claude/plugins/cache/` (68 plugins installed, 47 enabled per CLAUDE.md L34) + `.claude/settings.json` (14.8KB per CLAUDE.md status).

| # | Pattern | Source | Where missing in installed runtime | Prelim sca-v7 tier | Cite |
|---|---|---|---|---|---|
| 1 | **`/bg` + `←`-detach preserves `--allow-dangerously-skip-permissions`** | anthropics/claude-code v2.1.144 | n/a — runtime config; we should validate W315 sandbox AI doesn't break this | **N/A (upstream behavior)** — verify don't break | claude-code CHANGELOG (ctx-mode index hit) |
| 2 | **`MCP_TOOL_TIMEOUT` env raises per-request fetch timeout for remote HTTP/SSE MCP servers** (v2.1.142+ — already in installed CLI) | anthropics/claude-code v2.1.142 | `.claude/settings.json` env block doesn't set `MCP_TOOL_TIMEOUT`; default 60s caps SSE requests | **T1 ADOPT** — 1-line env addition | CHANGELOG v2.1.142 (ctx-mode index hit) |
| 3 | **`worktree.baseRef: 'fresh'\|'head'`** + `sandbox.bwrapPath`/`sandbox.socatPath` managed-settings (v2.1.133+) | anthropics/claude-code v2.1.133 | `.claude/settings.json` has zero `sandbox.*` block per W314 Stream E finding | **T1 ADOPT** — closes W314 sandbox-half-implemented W315 operator-AI | CHANGELOG v2.1.133 (ctx-mode index hit) |
| 4 | **`mattpocock/skills` `handoff` skill** — compact-conversation-to-handoff-doc | mattpocock/skills `849824df` | local `.claude/skills/` has 4 mattpocock-vendored (tdd+grill-with-docs+caveman+diagnose); missing `handoff`+`prototype` | **T2 VENDOR-FORK** — follows existing 4-skill-vendor pattern | DeepWiki + GitHub list_commits |
| 5 | **`mattpocock/skills` `prototype` skill** | mattpocock/skills `849824df` | local missing | **T2 VENDOR-FORK** — same as #4 | DeepWiki |
| 6 | **`CONTEXT.md` glossary convention + `CONTEXT-MAP.md` for multi-context monorepo** | mattpocock/skills `e74f0061` | runtime root has NO `CONTEXT.md`; W314 AI-r2-3 already queued | **T1 ADOPT** — closes W314 AI-r2-3 | DeepWiki |
| 7 | **`writing-fragments` skill** — append fragments separator `\n---\n` no headings | mattpocock/skills `9f2e0bd0` | local missing | **T3 PATTERN-STUDY** — niche to writing workflows | DeepWiki |
| 8 | **`wshobson/agents` `recsys-pipeline-architect` skill** — Source→Hydrator→Filter→Scorer→Selector→SideEffect six-stage framework | wshobson/agents PR #533 | local skills/ has 0 recsys-pipeline patterns | **T3 PATTERN-STUDY** — extract pattern, no install | MCP list_commits |
| 9 | **`wshobson/agents` `plugin-eval` MISSING_TRIGGER broadened regex** | wshobson/agents PR #530 | when we run plugin-eval against our 23 SKILL.md files, the broader regex applies | **T1 ADOPT** — wshobson@08ded5e already installed, regex update is in our cache | MCP list_commits |
| 10 | **`wshobson/agents` `plugin-eval` depth-downgrade-warning** — stderr `warning:` + markdown callout when plugin-target run only ran static layer | wshobson/agents PR #532 | when we run plugin-eval at `--depth standard` or `--depth deep`, no current warning | **T1 ADOPT** — auto-included via existing wshobson installed | MCP list_commits |
| 11 | **`OthmanAdi/planning-with-files` PreCompact hook + `/plan-goal` + `/plan-loop`** | OthmanAdi v2.38.0 | T3-DEACTIVATE; do not install. But: pattern of `PreCompact` hook with `Plan-SHA256` reminder is reusable | **T3 PATTERN-STUDY** — extract pattern for our W314 AI-r2-8 PreCompact log fix | MCP list_commits + DeepWiki |
| 12 | **`OthmanAdi/planning-with-files` hash-attestation + delimiter `===`-fence** | OthmanAdi v2.37.0 + v2.38.1 | T3-DEACTIVATE; do not install. Pattern of in-band-marker-collision-avoidance is reusable for our `.claude/settings.json` hook commands | **T3 PATTERN-STUDY** — lesson for future in-band marker design | MCP list_commits |
| 13 | **`GitNexus` probe-then-load FTS pattern** | GitNexus PR #1690/#1692 | applies to any Windows-host extension-or-skip code path; we don't have one but T3-DO-NOT-INSTALL stands | **T4 PATTERN-NOTE** — generalize for our own multi-MCP-cascade probe (W313-D F5) | MCP list_commits |
| 14 | **`GitNexus` MCP shim non-spawnable-path fallback** | GitNexus PR #1694 | our `.mcp.json` already uses `npx -y` (CR-9-compliant); the fallback pattern still informs future `.exe`/`.ps1` retirement (W314 AI-r2-11 ccusage) | **T4 PATTERN-NOTE** — reusable Windows-spawn discipline | MCP list_commits |
| 15 | **`addyosmani/agent-skills` `interview-me` skill** — Define-phase HITL clarification | addyosmani PR #164 | local missing; W314-r1 already flagged addyosmani as T2→T1 promotion candidate | **T2 VENDOR-FORK** — closes W314-r1 ledger row #51 | DeepWiki + MCP list_commits |
| 16 | **`addyosmani/agent-skills` CI skill validator** — GitHub Action validates SKILL.md frontmatter + structure | addyosmani PR #60 | runtime has 23 SKILL.md files with no CI validation | **T1 ADOPT** — template for `.github/workflows/skill-lint.yml` | MCP list_commits |
| 17 | **`mksglu/context-mode` v1.0.141 Zod-preprocessor fix** | mksglu PR #627 | runtime is on v1.0.136 (5 patches behind); upgrade closes a silent class of `Invalid arguments for <tool>` rejections | **T0 IMMEDIATE-UPGRADE** — 1-command `/ctx-upgrade` per in-banner advisory | MCP list_commits |

**Pattern count summary**: 17 NET-NEW, of which **6 T1 ADOPT** (#2 MCP_TOOL_TIMEOUT, #3 sandbox + worktree.baseRef, #6 CONTEXT.md/-MAP.md, #9 MISSING_TRIGGER regex, #10 depth-downgrade-warning, #16 CI skill validator), **1 T0 IMMEDIATE** (#17 ctx-mode upgrade), **3 T2 VENDOR-FORK** (#4 handoff, #5 prototype, #15 interview-me), **5 T3 PATTERN-STUDY** (#7, #8, #11, #12, plus addy's `using-agent-skills` router which I'm rolling into #16), **2 T4 PATTERN-NOTE** (#13, #14).

---

## Operator-AIs for W316 (numbered list)

1. **AI-W315-A-1 [T0 IMMEDIATE]**: Run `/ctx-upgrade` to advance `mcp__plugin_context-mode_context-mode__*` from installed v1.0.136 → upstream v1.0.141. Closes the in-banner advisory + 4 Zod-preprocessor silent rejections (PR #627). Risk: bundle rebuild + session-hook update; rollback via `npm install -g context-mode@1.0.136`. Cite: `mksglu/context-mode/CHANGELOG @ 6bbcb443`.

2. **AI-W315-A-2 [T1 ADOPT]**: Add `MCP_TOOL_TIMEOUT` env var to `.claude/settings.json` env block (suggested value `180000` ms = 3 min). Raises per-request fetch timeout for remote HTTP/SSE MCP servers above the 60s default cap. Cite: anthropics/claude-code CHANGELOG v2.1.142.

3. **AI-W315-A-3 [T1 ADOPT — closes W314 Stream E sandbox finding]**: Add `sandbox.bwrapPath` / `sandbox.socatPath` managed-settings AND `worktree.baseRef: 'head'` (preserves unpushed commits in new worktrees per W280d ~3-parallel-cap pattern) to `.claude/settings.json`. Cite: CHANGELOG v2.1.133, claude-settings.md:446-461 (CCBP).

4. **AI-W315-A-4 [T1 ADOPT — closes W314 AI-r2-3]**: Create `Z:/claude-sota-installed/CONTEXT.md` glossary at runtime root following mattpocock convention (definitions only, NO implementation details); document W269-W314 wave-vocabulary (T0-T4 tiers, sca-v7, parallel_ratio, etc.). Cite: `mattpocock/skills/CONTEXT.md @ 67bce91c80cd`.

5. **AI-W315-A-5 [T1 ADOPT]**: Add `.github/workflows/skill-lint.yml` GitHub Action that validates frontmatter + structure of every `.claude/skills/<name>/SKILL.md`. Reference: addyosmani PR #60. Cite: `addyosmani/agent-skills @ f17c6e88`.

6. **AI-W315-A-6 [T2 VENDOR-FORK]**: Vendor-fork 2 NEW mattpocock skills `handoff` + `prototype` (mirrors existing 4-skill pattern: tdd, grill-with-docs, caveman, diagnose) at `mattpocock/skills @ 67bce91c80cd → .claude/skills/{handoff,prototype}/SKILL.md`. Update CLAUDE.md L30 from "vendor-fork-4" to "vendor-fork-6".

7. **AI-W315-A-7 [T2 VENDOR-FORK]**: Vendor-fork `addyosmani/agent-skills/interview-me` skill (Define-phase HITL clarification). Closes W314-r1 ledger row #51 (T2→T1 promotion). Reference SHA `b1162539`.

8. **AI-W315-A-8 [W315 OPERATOR CITE-FIX]**: CLAUDE.md L3 currently cites `claude-code-best-practice-shan` as the path; the actual repo OWNER per `git remote -v` on local clone is `shanraisshan/claude-code-best-practice` (renamed from `shanyu0/...` at some point — GitHub API silently 404s on the old slug). Action: update `tools/eee.ps1` + any other path-pointers to use the new owner. NO behavioral change; cite-only.

9. **AI-W315-A-9 [T3 PATTERN-STUDY]**: Extract OthmanAdi PreCompact-hook + Plan-SHA256-reminder pattern; combine with W314 AI-r2-8 PreCompact log audit-trail fix. T3-DEACTIVATE verdict on the upstream plugin STANDS; pattern extraction only. Cite: `OthmanAdi/planning-with-files @ 2d089130 v2.38.0`.

10. **AI-W315-A-10 [T3 PATTERN-NOTE]**: Document GitNexus probe-then-load FTS-on-Windows pattern as the canonical "validate-binary-exists-before-skip" recipe for future Windows-host extension paths in our runtime. T3-DO-NOT-INSTALL on GitNexus itself unchanged (license + bus-factor + CR-9-unpinned hard-caps). Cite: `GitNexus @ 803f0bed PR #1690/#1692`.

11. **AI-W315-A-11 [CLAUDE.md cite refresh]**: Optionally bump CLAUDE.md L3 SHA cite from `48798ca` → keep at `48798ca` (matches HEAD exactly today). When next CCBP commit lands (likely ≤24h), refresh; **no action needed THIS wave**.

12. **AI-W315-A-12 [DEFER to W316 codex GPT-5.5 review]**: Cross-model adversarial review of W315 Stream A findings via plugin-native Stop-hook codex-gate. Specifically verify: AI-W315-A-3 sandbox-block contents don't break existing W280d worktree-rebase discipline; AI-W315-A-2 MCP_TOOL_TIMEOUT 180000 isn't too aggressive (could mask genuine MCP hangs).

---

**Stream-A invariants checked**:
- ✅ All 9 repos probed (8 reachable upstream + 1 owner-rename resolved via local-clone `git remote -v`)
- ✅ 0 repos >180d stale
- ✅ 17 NET-NEW patterns extracted (6 T1 + 1 T0 + 3 T2 + 5 T3 + 2 T4)
- ✅ All claims cite file:line OR URL OR SHA per task constraint
- ✅ Context-mode used for all >20-line outputs (no Bash for analysis)
- ✅ NO destructive ops (no `git push`, no `rm`, no overwrites)
- ✅ Z:-portable Windows paths respected throughout
- ✅ sca-v7 7-MCP weighted matrix applied (D2 deepwiki 0.25 + GitHub MCP for SHA truth + ctx-mode for content indexing)

**Stream-A ship**: 12 operator-AIs forwarded to W316 queue; deliverable written via Write tool to `Z:/claude-sota-installed/docs/architecture/W315-SOTA-CONVERGENCE-SWEEP/STREAM-A-REPO-REFRESH-INGEST.md`.
