# W314 Canonical Line-by-Line Audit — Findings

**Audit window**: 2026-05-19. Stream-α deliverable.

Six canonical sources audited at HEAD:

| Source | HEAD | Date | Notes |
|---|---|---|---|
| `anthropics/claude-code` | `8bdbb72` | 2026-05-15 | CHANGELOG.md trail |
| `claude-code-best-practice-shan` (CCBP) | `48f2ceb` | 2026-05-08 | content-stable since `1386b0e` |
| `everything-claude-code` (ECC) | `33ed494a` | **2026-05-19 (TODAY)** | 3 commits TODAY — invisible-Unicode safety regression |
| `addyosmani/agent-skills` | `5b4c6da` | 2026-05 | source-driven-development methodology |
| `mattpocock/skills` | `e74f006` | 2026-05 | CONTEXT.md glossary discipline |
| `wshobson/agents` | `ece811f` (local) / `08ded5e` (origin/main) | 2026-05-17 | agent-teams@1.0.2 SHA-pin verified |

---

## Source 1 — `anthropics/claude-code` CHANGELOG.md @ `8bdbb72`

| # | NEW pattern | Cite | Runtime gap | Priority | Proposed action |
|---|---|---|---|---|---|
| 1.1 | `CLAUDE_CODE_STOP_HOOK_BLOCK_CAP` — caps consecutive Stop-hook blocks at 8 (escape valve for review-gate loops) | `CHANGELOG.md:13` | Codex Stop-hook gate has no documented cap; could theoretically loop | 4 | Add env note in CLAUDE.local.md ENV-block + cite in CLAUDE.md cardinal-rule-2 commentary |
| 1.2 | `worktree.bgIsolation: "none"` — disables EnterWorktree forking for background sessions | `CHANGELOG.md:7` | Not configured; we use 3-worktree-cap pattern but never opt out for short-lived bg sessions | 2 | Cite-only |
| 1.3 | Hook `args: string[]` exec-form (spawns command directly, no shell quoting) | `CHANGELOG.md:153` | All our settings.json hooks use shell-form `"command": "..."`; quoting bugs latent | 4 | Migrate gitleaks/ruff/shellcheck hooks to `args` form; eliminates Windows path-quoting class entirely |
| 1.4 | Hook `continueOnBlock` for PostToolUse — feeds rejection reason back to Claude and continues | `CHANGELOG.md:154` | PostToolUseFailure swallows ruff/shellcheck silently after W312-A.3 fix; could surface natively | 3 | Replace W312-A.3 PowerShell try/catch shim with `continueOnBlock:true` for cleaner UX |
| 1.5 | `terminalSequence` hook JSON field — desktop notifications without controlling terminal | `CHANGELOG.md:68` | W280g uses raw PowerShell beep; could upgrade to portable terminalSequence | 2 | Migrate Notification hook to terminalSequence emission |
| 1.6 | `MCP_TOOL_TIMEOUT` env now correctly raises per-request fetch timeout for remote HTTP/SSE servers (regression fix in 2.1.143) | `CHANGELOG.md:46` | `.mcp.json` has 10 active servers with no MCP_TOOL_TIMEOUT set; defaults to 60s | 3 | Set `MCP_TOOL_TIMEOUT=300000` in CLAUDE.local.md ENV-block for cognee/basic-memory (slow indexing) |
| 1.7 | `Skill(name *)` wildcard fixed (now prefix-match like `Bash(ls *)`) | `CHANGELOG.md:169` | No Skill() permission rules in settings.json | 2 | Cite-only |
| 1.8 | `ANTHROPIC_WORKSPACE_ID` — scopes minted token to specific workspace | `CHANGELOG.md:70` | Not applicable single-operator-runtime | 1 | Cite-only |
| 1.9 | `CLAUDE_CODE_PLUGIN_PREFER_HTTPS` — plugin git clones over HTTPS not SSH | `CHANGELOG.md:69` | Plugin marketplaces resolve fine via current default | 1 | Cite-only |
| 1.10 | PowerShell tool now passes `-ExecutionPolicy Bypass` by default on Windows; opt-out via `CLAUDE_CODE_POWERSHELL_RESPECT_EXECUTION_POLICY=1` | `CHANGELOG.md:8` | Z:-portable Windows install benefits implicitly | 3 | Document the new default + opt-out in CLAUDE.local.md ENV-block section |
| 1.11 | Fast mode now uses Opus 4.7 by default (previously Opus 4.6) + `CLAUDE_CODE_OPUS_4_6_FAST_MODE_OVERRIDE=1` | `CHANGELOG.md:42` | We're on Opus 4.7 1M (signed); implicit upgrade | 2 | Verify any hardcoded `claude-opus-4-6` IDs in settings/.mcp.json |
| 1.12 | Plugins with root-level `SKILL.md` (no `skills/` subdir) now auto-surfaced as a skill | `CHANGELOG.md:43` | Multiple of our 23 `.claude/skills/<name>/SKILL.md` already conform | 1 | Cite-only |

---

## Source 2 — `claude-code-best-practice-shan` (CCBP) @ `48f2ceb`

| # | NEW pattern | Cite | Runtime gap | Priority | Proposed action |
|---|---|---|---|---|---|
| 2.1 | **CCBP `claude-memory.md:34-40` line drift**: CLAUDE.md L8 cites `claude-memory.md:34-40 @ 1386b0e`. At HEAD `48f2ceb` same content (ancestor-loading + descendant-lazy) is at lines 36, 38, 40, 92, 93 with different markdown structure. Content unchanged but SHA `1386b0e` predates HEAD by 17 days | `claude-memory.md:36-40, 92-93` | CITE SHA STALE | 4 | Refresh cite from `@ HEAD 1386b0e` to `@ HEAD 48f2ceb`. **NOTE: linter pass refreshed to `@ HEAD 48798ca` during this session** |
| 2.2 | `claude-settings.md:826` (CLAUDE_AUTOCOMPACT_PCT_OVERRIDE) — CONFIRMED at exact line as cited in CLAUDE.local.md "W280c" block | `claude-settings.md:826` | Match | 1 | No action — passes |
| 2.3 | `AI_AGENT` env var — set automatically by CC in subprocess envs to identify "any AI agent" generically (separate from CLAUDECODE) | `claude-settings.md:806` | Not documented in env-block; subprocess scripts can branch on this generic flag | 3 | Document AI_AGENT in CLAUDE.local.md so hook scripts can use it for unified AI-agent detection |
| 2.4 | `OTEL_LOG_TOOL_DETAILS` / `OTEL_LOG_RAW_API_BODIES` / `OTEL_LOG_USER_PROMPTS` — privacy-opt-in OTel toggles (2.1.85/2.1.111/2.1.121) | `claude-settings.md:952-954` | Langfuse OTel pipeline doesn't currently capture user_prompts; opt-in available | 3 | Consider OTEL_LOG_USER_PROMPTS=1 + scoped OTel collector for evaluation lanes only |
| 2.5 | `CLAUDE_CODE_SUBPROCESS_ENV_SCRUB` + `CLAUDE_CODE_SCRIPT_CAPS` — strip Anthropic/cloud credentials from subprocess envs (2.1.83) with per-script call caps | `claude-settings.md:924-925` | Subprocess hooks inherit full env; not defense-in-depth | 4 | Enable CLAUDE_CODE_SUBPROCESS_ENV_SCRUB=1 in CLAUDE.local.md ENV; security hardening at zero cost |
| 2.6 | `CLAUDE_CODE_PERFORCE_MODE` (2.1.98) — Perforce-aware write protection | `claude-settings.md:926` | Not applicable (git-only) | 1 | Cite-only |
| 2.7 | `CLAUDE_CODE_AUTO_COMPACT_WINDOW` — decouples compaction-threshold capacity from model context window | `claude-settings.md:967` | Opus 4.7 1M default may be too aggressive | 3 | Set CLAUDE_CODE_AUTO_COMPACT_WINDOW=500000 to compact at 50% of 1M for cleaner phase boundaries |
| 2.8 | `claude-power-ups.md` — entire file documenting `/powerup` (10 interactive lessons, introduced 2.1.90) | full file 67L | Not surfaced to operator; "Multiply yourself" (subagents/agents) power-up #8 directly maps to W269 mandate | 2 | Cite in CLAUDE.md pointers; one-time `/powerup` walkthrough |

---

## Source 3 — `everything-claude-code` (ECC) @ `33ed494a` (TODAY 2026-05-19)

| # | NEW pattern | Cite | Runtime gap | Priority | Proposed action |
|---|---|---|---|---|---|
| 3.1 | **`check-unicode-safety.js` extended with Tag block U+E0000-U+E007F (ASCII smuggling), U+180E, U+115F/U+1160, U+2061-U+2064, U+3164** — 3 ship commits TODAY explicitly closing "silent error" Unicode smuggling vector | `scripts/ci/check-unicode-safety.js:118-141`; commits `e3483fda` + `b068069b` + `33ed494a` | **RUNTIME HAS ZERO INVISIBLE-UNICODE COVERAGE** — operator's "silent error" directive directly hits this | **5** | **MUST-ADOPT-THIS-WAVE.** Add PreToolUse:Write/Edit hook running ECC validator against proposed content, OR vendor as bug-patch-shim under documented exception. Add `--write` sanitize mode to pre-commit gate alongside gitleaks |
| 3.2 | `silent-failure-hunter.md` agent — explicit "zero tolerance for silent failures" review pattern with 5 hunt-target taxonomy | `agents/silent-failure-hunter.md:19-49` | Plugin installed (ECC), but agent not auto-routed | 4 | Wire `silent-failure-hunter` as canonical agent for PostToolUseFailure debug surfacing |
| 3.3 | `SOUL.md` (17L) — 5 core principles file: Agent-First, Test-Driven, Security-First, Immutability, Plan-Before-Execute | `SOUL.md:6-11` | No SOUL.md / philosophy doc at runtime root | 2 | Cite-only; cardinal rules already cover security + plan |
| 3.4 | `RULES.md` (38L) — Must Always / Must Never / Agent-Format / Skill-Format / Hook-Format / Commit-Style headings | `RULES.md:3-16` | "Must never include absolute/system file paths in output" is hard rule we partially absorb | 3 | Adopt "no absolute paths in output" into cardinal-rule-5 |
| 3.5 | `scripts/ci/validate-no-personal-paths.js` — POSIX `/Users/<name>/` and Windows `C:\Users\<name>\` path scanner with placeholder allowlist | `scripts/ci/validate-no-personal-paths.js:30-43` | No scanner; operator-AI could write `C:\Users\42\...` to tracked doc silently | 4 | Vendor as bug-patch-shim OR add gitleaks custom-regex rule |
| 3.6 | `package.json:test` script chains 8 CI validators | `package.json:test` | No manifest-validation CI; relies on plugin marketplace trust | 3 | Consider 1-shot ECC `npm test` invocation as W315 pre-commit augment |
| 3.7 | `.github/workflows/supply-chain-watch.yml` — explicit supply-chain CI workflow | `.github/workflows/supply-chain-watch.yml` | W290 F2 security audit ran once; no continuous workflow | 3 | Mirror as GitHub Action when this repo goes public |
| 3.8 | **ECC version drift**: runtime cache has `2.0.0-rc.1` installed 2026-05-17; upstream HEAD has 3 invisible-Unicode + 12 doc-evidence commits TODAY | `.claude/plugins/cache/everything-claude-code/everything-claude-code/2.0.0-rc.1/.claude-plugin/plugin.json:3` vs upstream HEAD | 2-day update lag on plugin shipping critical safety fix TODAY | **5** | Run `/plugin update everything-claude-code@everything-claude-code` then `/reload-plugins` per W270 |

---

## Source 4 — `addyosmani-agent-skills` @ `5b4c6da`

| # | NEW pattern | Cite | Runtime gap | Priority | Proposed action |
|---|---|---|---|---|---|
| 4.1 | `source-driven-development` SKILL.md — DETECT→FETCH→IMPLEMENT→CITE methodology with source-hierarchy table (Tier 1-4) and red-flags + verification checklist | `skills/source-driven-development/SKILL.md:29-194` | Plugin INSTALLED at `.claude/plugins/cache/addy-agent-skills/agent-skills/1.0.0/` — pattern accessible | 2 | Already adopted via plugin; verify auto-fire `description:` matches |
| 4.2 | `hooks/SDD-CACHE.md` — HTTP If-None-Match/If-Modified-Since cache for WebFetch (304 = fresh verification, not stale memory) | `hooks/SDD-CACHE.md:5-7` + `hooks/sdd-cache-pre.sh:5-15` | Not wired into settings.json — would dramatically reduce WebFetch token cost for SDD skill usage | 4 | Wire PreToolUse:WebFetch + PostToolUse:WebFetch hooks per SDD-CACHE.md:14-37 (10s timeout, async post-hook); add `.claude/sdd-cache/` to .gitignore |
| 4.3 | `spec-driven-development` SKILL.md exists separately from SDD | `skills/spec-driven-development/SKILL.md` | We have speckit-* skills doing similar work | 2 | Compare addy/spec-driven-development vs speckit-* family; absorb deltas |
| 4.4 | `doubt-driven-development` SKILL.md | `skills/doubt-driven-development/SKILL.md` | Novel epistemics-first methodology; not in skill set | 3 | Audit content for absorption into goal-prompt-synthesis or mem-recall |
| 4.5 | `references/security-checklist.md` exists in addy repo | `references/security-checklist.md` | Reusable security-checklist template | 2 | Cite-only |
| 4.6 | `interview-me` skill (2026-05 merge) | `skills/interview-me/SKILL.md` | New community skill not yet evaluated | 2 | W315 sca-v6.1 audit candidate |

---

## Source 5 — `mattpocock-skills` @ `e74f006`

| # | NEW pattern | Cite | Runtime gap | Priority | Proposed action |
|---|---|---|---|---|---|
| 5.1 | **`CONTEXT.md` at repo root** (27L) — explicit "glossary, not implementation details" discipline as of HEAD `e74f006` | `CONTEXT.md:1-27` | We have NO `CONTEXT.md` at runtime root — yet CLAUDE.md is dense with novel terms (W269/W288/W295/sca-v6.1/T1-T6 memory) | 4 | Author `Z:/claude-sota-installed/CONTEXT.md` with glossary terms |
| 5.2 | NEW skills since W312-C audit (W312-C noted 4 vendored): **handoff**, **review** (two-axis parallel review), **writing-fragments**, **writing-shape**, **writing-beats**, **prototype**, **scaffold-exercises**, **grill-me**, **migrate-to-shoehorn**, **setup-pre-commit**, **git-guardrails-claude-code**, **to-issues**, **to-prd** | `skills/productivity/handoff/SKILL.md`, `skills/in-progress/review/SKILL.md`, `skills/engineering/triage/SKILL.md` | Our `.claude/skills/` has caveman+diagnose+tdd+grill-with-docs vendored; the other ~14 are NOT vendored | 3 | Evaluate `handoff` (compact-conversation-to-disk for cross-session continuity) and `review` (parallel-subagent two-axis review — DIRECTLY maps to W312-D parallel-Agent mandate) for W315 absorption |
| 5.3 | `handoff` SKILL.md specifically — `mktemp -t handoff-XXXXXX.md` pattern with explicit "do not duplicate content already in PRDs/plans/ADRs/issues/commits/diffs — reference by path" | `skills/productivity/handoff/SKILL.md:5-9` | Memory T1-T6 architecture has no canonical session-handoff serialization format | 4 | Adopt as canonical W314+ session-handoff format; complements 6-tier memory |
| 5.4 | `review` two-axis parallel-subagent pattern — Standards (coding-standards) + Spec (PRD/issue) run in parallel sub-agents, aggregated by parent skill | `skills/in-progress/review/SKILL.md:12-16` | `/codex:adversarial-review` is single-axis (model-agreement); two-axis Standards+Spec absent | 3 | Vendor `review` skill into `.claude/skills/review/` alongside codex gate; complementary not redundant |
| 5.5 | `CONTEXT.md` "Flagged ambiguities" section pattern — explicit log of resolved-vs-unresolved terminology drift | `CONTEXT.md:23-26` | W295/W308 supersession audit pattern is similar but undocumented as discipline | 3 | Capture as cardinal-rule-amendment or in new CONTEXT.md |

---

## Source 6 — `wshobson-agents` @ `ece811f` (origin/main at `08ded5e`)

| # | NEW pattern | Cite | Runtime gap | Priority | Proposed action |
|---|---|---|---|---|---|
| 6.1 | **agent-teams@1.0.2 SHA-pin verification**: CLAUDE.md W312 claim "PR #535 merged 2026-05-17, SHA-pin `08ded5e7b0fe` matches upstream HEAD exactly" — **CONFIRMED CORRECT**. Origin advanced FROM `ece811f` TO `08ded5e` (PR#535 merge) | wshobson-agents `.git/FETCH_HEAD` | Runtime correctly pinned | 1 | No-op; cite-mirror clone should be `git pull` updated |
| 6.2 | **NEW: `review-agent-governance` plugin@0.1.0** (PR #495 merged) — Cedar-policy-based PreToolUse + PostToolUse hooks with `npx protect-mcp@0.5.5 evaluate` + `sign` for cryptographic tool-receipt | `plugins/review-agent-governance/hooks/hooks.json:5-26` and `policies/review-agent-governance.cedar` | INSTALLED but cedar policy + hooks may not be wired into settings.json | 3 | Verify if hooks fire; consider Cedar-policy gate as W315 supplement |
| 6.3 | `brand-landingpage` plugin (PR #509) | `plugins/brand-landingpage/` | Not relevant to infra-runtime | 1 | Cite-only |
| 6.4 | `team-spawn.md` adds `research` + `security` presets — both already cited in W269 paragraph; confirm `fullstack` preset | `commands/team-spawn.md:43-46` | CLAUDE.md line 19 already lists `fullstack` — confirmed | 1 | No-op |
| 6.5 | `team-spawn.md:75-76` Phase 2 — explicit `TeamCreate` tool + Agent with `subagent_type:"general-purpose"` invocation pattern (W312-D F2 note: nested teams forbidden) | `commands/team-spawn.md:73-79` | W312-D F2 mailbox observation consistent with this | 2 | Cite as line-anchor for W312-D F2 evidence |
| 6.6 | `team-spawn.md:12-14` — `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` is a hard pre-flight check | `commands/team-spawn.md:12-14` | Set in `.claude/settings.json:env` per W259/W269 | 2 | Verify still present in next settings.json audit |
| 6.7 | wshobson marketplace.json @ HEAD: **"80 plugins, 185 agents, 153 skills"** vs runtime-cached marketplace.json: **"79 plugins, 184 agents, 150 skills"** | `Z:/repos/deps/wshobson-agents/.claude-plugin/marketplace.json:10` | 1-plugin / 1-agent / 3-skill drift | 3 | `/plugin update` to refresh marketplace cache + counts |

---

## Executive Summary — Top-12 NEW-pattern findings (ranked by priority)

| Rank | Pri | Source | Finding | One-line action |
|---|---|---|---|---|
| 1 | **5** | ECC | Invisible-Unicode-safety regression coverage shipped TODAY (Tag block + Korean filler + math ops + U+180E + U+3164); operator's "silent error" directive directly hits this | Adopt ECC's `check-unicode-safety.js` as bug-patch-shim PreToolUse:Write/Edit hook |
| 2 | **5** | ECC | Runtime ECC plugin at `2.0.0-rc.1` is 2 days behind upstream HEAD `33ed494a` shipping critical safety fix | Run `/plugin update everything-claude-code` then `/reload-plugins` per W270 |
| 3 | **4** | CCBP | CLAUDE.md L8 cites `claude-memory.md:34-40 @ 1386b0e`; HEAD advanced. **Linter pass during this session refreshed cite to `@ HEAD 48798ca`** | Refresh — already actioned by linter |
| 4 | **4** | CC | Hook `args: string[]` exec-form eliminates Windows path-quoting bug class | Migrate gitleaks/ruff/shellcheck/git hooks from shell-form to `args` form |
| 5 | **4** | CC | `continueOnBlock:true` natively surfaces hook rejection reason — supersedes W312-A.3 PowerShell try/catch shim | Replace W312-A.3 shim with `continueOnBlock` |
| 6 | **4** | CCBP | `CLAUDE_CODE_SUBPROCESS_ENV_SCRUB=1` strips Anthropic/cloud creds from subprocess envs | Add to CLAUDE.local.md ENV block |
| 7 | **4** | addy | SDD HTTP-cache hooks (`sdd-cache-pre.sh` + `sdd-cache-post.sh`) — 304 = fresh verification not stale memory | Wire PreToolUse/PostToolUse:WebFetch hooks; .gitignore `.claude/sdd-cache/` |
| 8 | **4** | mattpocock | `CONTEXT.md` glossary discipline at repo root | Author `Z:/claude-sota-installed/CONTEXT.md` with project glossary |
| 9 | **4** | mattpocock | `handoff` skill — session-handoff serialization (complements 6-tier memory) | Vendor `handoff` SKILL.md into `.claude/skills/` |
| 10 | **4** | ECC | `silent-failure-hunter` agent — direct binding to operator's "silent error" directive | Wire as canonical PostToolUseFailure debug agent |
| 11 | **4** | ECC | `validate-no-personal-paths.js` — POSIX/Windows `~/Users/<name>` scanner | Vendor as bug-patch-shim OR add gitleaks custom-regex rule |
| 12 | **3** | CCBP | `CLAUDE_CODE_AUTO_COMPACT_WINDOW` decouples compaction-cap from context window | Set to 500000 for cleaner phase-boundary compaction |

**Cross-cutting observation**: 3 of the top-4 priority-5/4 findings (#1, #2, #10, #11) converge on **silent-failure / hidden-error elimination** — exactly the operator-stated W313 directive ("no silent fallback"). ECC's 2026-05-19 invisible-Unicode commits + silent-failure-hunter agent + path-scanner + addyosmani's SDD cache form a coherent "no silent fallback" doctrine that maps 1:1 to operator priorities.

**Confidence**: HIGH on items #1-#3, #7-#10 (line-anchored cites verified). MEDIUM on #4-#5 (CHANGELOG only; haven't read CC source for full schema). MEDIUM on #6.7 marketplace-count drift (caches not diff'd byte-for-byte).

**Gaps requiring SME / forward to W315**:
- ECC invisible-Unicode adoption-window decision (PreToolUse hook ~10ms overhead per Edit/Write vs CI-only)
- CLAUDE_CODE_SUBPROCESS_ENV_SCRUB impact on codex-cli foreground+tee pattern (LANGFUSE_* propagation to codex subprocess required?)
- CONTEXT.md glossary first-draft authoring
- mattpocock `handoff` + `review` skill vendor-fork
- ECC version bump `2.0.0-rc.1` → `33ed494a` requires `/plugin update`

**Files touched**: none by α; this FINDINGS.md written by parent-agent at synthesis time. All references absolute paths to either `Z:/repos/deps/<source>/...` (canonical clones) or `Z:/claude-sota-installed/...` (current runtime).
