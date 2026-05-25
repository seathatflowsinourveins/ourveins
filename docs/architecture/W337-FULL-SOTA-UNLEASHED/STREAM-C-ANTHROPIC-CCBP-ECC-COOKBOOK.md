# Stream C — Anthropic + CCBP + ECC + Cookbook line-by-line ingest

**Wave**: W337 SOTA-UNLEASHED
**Date**: 2026-05-20
**Fork**: claude-sota-installed Stream C
**Scope**: Verify CLAUDE.md cite anchors, detect drift, find gaps in 4 reference sources, propose convergent adoptions.

---

## §1 anthropics/claude-code

**HEAD** (as of probe): `cc898dc3` @ 2026-05-19T21:31:01Z `chore: Update CHANGELOG.md and feed.xml` (GitHub Actions auto-commit). Repo is live and actively committed daily.

**Doc topology** (via deepwiki structure scan):
- §1 Overview · §2 User Guide · §3 Core Systems (Subagents, Tools/Permissions, Context/Compaction, Hooks, MCP, Plugin, Skill, Sandbox, UI/UX) · §4 Official Plugins · §5 GitHub Automation · §6 DevContainer/Network/MDM · §7 Glossary.

**New features shipped Jan-May 2026** (CHANGELOG via deepwiki, source: `anthropics/claude-code:CHANGELOG.md:1-360`):

| Feature | Type | Runtime state |
|---|---|---|
| `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` | env | ✓ set in settings.json env |
| `CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS=1` | env | ⚠ NOT set (default = experimental ON; intentional) |
| `CLAUDE_CODE_FORK_SUBAGENT=1` | env | ✓ set (CLAUDE.local.md L52) |
| `CLAUDE_CODE_SESSIONEND_HOOKS_TIMEOUT_MS` | env | ✓ set |
| `TaskCreated` hook | hook event | ⚠ **MISSING** from settings.json hooks |
| `CwdChanged` hook | hook event | ⚠ **MISSING** |
| `FileChanged` hook | hook event | ⚠ **MISSING** |
| `PostCompact` hook | hook event | ⚠ **MISSING** (runtime has PreCompact only) |
| `ConfigChange` hook | hook event | ⚠ **MISSING** |
| `TeammateIdle` hook | hook event | ⚠ **MISSING** |
| `TaskCompleted` hook | hook event | ✓ wired |
| Hooks support for agent/skill/slash-command frontmatter | mechanism | ⚠ partial (skills have frontmatter, no per-skill hooks wired) |

**Hook event gap = 6 new hooks (TaskCreated/CwdChanged/FileChanged/PostCompact/ConfigChange/TeammateIdle) unwired.** These are the largest single Anthropic-native gap in the runtime.

Runtime has 9 hook event types declared (SessionStart, UserPromptSubmit, PreToolUse, PostToolUse, PreCompact, WorktreeRemove, Notification, PostToolUseFailure, TaskCompleted). Gap is additive — no breakage, but missing observability + automation hooks.

---

## §2 CCBP (shanraisshan/claude-code-best-practice)

**Remote verified**: `https://github.com/shanraisshan/claude-code-best-practice` (CLAUDE.md L1 implies "shan" — confirmed via local clone `git remote -v`).

**HEAD**: `f28c2da352290377ca272b3cc99a8beb31e37864` @ 2026-05-20 00:00:58 +0500. **CLAUDE.md L1 cite is at HEAD — NO drift.**

**Recent activity (3 weeks)**: 30 commits; mostly badge bumps (`chore(readme): bump badge`) + scheduled `agent-collections` refreshes. Two real content additions:
- **2026-05-13** `45b9682` — Added `## 🔀 CROSS-MODEL WORKFLOWS` section (4 repos: musistudio/claude-code-router 34k, router-for-me/CLIProxyAPI 32k, openai/codex-plugin-cc 18k, BeehiveInnovations/pal-mcp-server 12k formerly zen-mcp-server).
- **2026-05-13** `bb4cc61` — Added `alirezarezvani/claude-skills` (15k★, 246 skills) to skill-collections.

**`best-practice/claude-memory.md:34-40` cite verified line-exact**:
- L34: `#### Ancestor Loading (UP the directory tree)`
- L36: `When you start Claude Code, it walks **upward** from your current working directory toward the filesystem root and loads every CLAUDE.md it finds along the way. These files are loaded **immediately at startup**.`
- L38: `#### Descendant Loading (DOWN the directory tree)`
- L40: `CLAUDE.md files in subdirectories below your current working directory are **NOT loaded at launch**. They are only included when Claude reads files in those subdirectories during your session. This is known as **lazy loading**.`

→ Runtime CLAUDE.md L1 cite-anchor is **semantically correct and line-exact**.

**CCBP topology** (73 markdown files):
- `best-practice/` × 8: `claude-cli-startup-flags.md` · `claude-commands.md` · `claude-mcp.md` · `claude-memory.md` · `claude-power-ups.md` · `claude-settings.md` · `claude-skills.md` · `claude-subagents.md`
- `agent-teams/agent-teams-prompt.md` (referenced by CLAUDE.md L19 — verified present)
- `changelog/` × 4 sub-streams (agent-collections, cross-model-workflows, development-workflows, skill-collections) with consistent priority/type/action/status table format
- `.claude/` example layout: agents/, commands/, hooks/, rules/ (note: `.claude/rules/` present — supports the W308 CLAUDE.md L40 W299-A reversal that rules-dir IS canonical)
- `development-workflows/` × 9 sub-flows

**Drift assessment**: NONE on cite anchors. Two content additions worth incorporating into runtime's W259 grand catalog: cross-model-workflows section + alirezarezvani retire-verdict update (CCBP did add it, our W330 retire-verdict still stands).

---

## §3 ECC plugin (everything-claude-code)

**Local cache topology** (Z:/claude-sota-installed/.claude/plugins/cache/everything-claude-code/):
- Versioned subdir: `2.0.0-rc.1/` (release candidate, not stable)
- `.claude-plugin/plugin.json` (NOT root `.plugin.json` — earlier read failure was wrong path)
- `.codex-plugin/plugin.json` (codex-side mirror manifest)
- `skills/` × 100+ SKILL.md files (full sample below)
- **NO** top-level commands/, agents/, hooks/ directories — all bundled into skills

**Skill catalog sample (~100 of 100+ SKILL.md found)**:
```
accessibility, agent-architecture-audit, agent-eval, agent-harness-construction,
agent-introspection-debugging, agent-payment-x402, agent-sort, agentic-engineering,
agentic-os, ai-first-engineering, ai-regression-testing, android-clean-architecture,
angular-developer, api-connector-builder, api-design, architecture-decision-records,
article-writing, automation-audit-ops, autonomous-agent-harness, autonomous-loops,
backend-patterns, benchmark, blender-motion-state-inspection, blueprint, brand-voice,
browser-qa, bun-runtime, canary-watch, carrier-relationship-management,
cisco-ios-patterns, ck, claude-devfleet, code-tour, codebase-onboarding,
coding-standards, compose-multiplatform-patterns, configure-ecc, connections-optimizer,
content-engine, content-hash-cache-pattern, context-budget, docker-patterns,
documentation-lookup, dotnet-patterns, e2e-testing, ecc-guide, ecc-tools-cost-audit,
email-ops, energy-procurement, enterprise-agent-ops, error-handling,
kotlin-ktor-patterns, kotlin-patterns, kotlin-testing, laravel-patterns,
laravel-plugin-discovery, laravel-security, laravel-tdd, laravel-verification,
lead-intelligence, vite-patterns, windows-desktop-e2e, workspace-surface-audit,
x-api, ...
```

**Skill-only topology = significant gap signal**: runtime CLAUDE.md L23-26 mentions ECC patterns (strategic-compact, Stop hook gate) but `git_status_full` shows no ECC skill is currently *enabled* by name in the runtime's 47 local skills — they live in plugin cache but autofire depends on settings.json plugin enablement state.

**Upstream owner** (via GitHub repo search, 187 matches):
- **Most-likely canonical**: `arabicapp/everything-claude-code` — "Build powerful agents and configurations with the complete collection of Claude Code from an Anthropic hackathon winner, refined over 10+ months" (pushed `2026-05-20T14:27:19Z` — active TODAY). Owner login is `arabicapp` — likely re-named/transferred from earlier "AffaanM" handle (CLAUDE.md W316-affaan-m-ecc verdict cites that owner). 
- **Alternatives** (likely forks/translations): `WorldFlowAI/everything-claude-code` (pushed 2026-01-23, stale), `xu-xiang/everything-claude-code-zh` (Chinese), `ahmed3elshaer/everything-claude-code-mobile` (mobile), `wesammustafa/Claude-Code-Everything-You-Need-to-Know` (different repo).

**Verification action needed** (W337 P0): pull HEAD from `arabicapp/everything-claude-code`, compare `2.0.0-rc.1` vs new release tag (if any). If stable `2.0.0` shipped, runtime should refresh via `/plugin update` or cache-delete + fresh-install per CLAUDE.md cardinal-rule-1 W270 corollary.

**W335-MSYS findings cross-check**: disabled hookify@claude-plugins-official + intelligent-compact + claude-mem@thedotmack + protect-mcp@claude-code-workflows + self-improving-agent for shell-form pathology + PreToolUse `--` separator bug + UserPromptSubmit permission-denied. ECC skill `ecc-guide` exists — should be enabled to surface ECC's own setup/troubleshooting per its `configure-ecc` skill.

---

## §4 anthropics/claude-cookbooks

**Doc topology** (deepwiki): §7 Agent Patterns and SDK (workflows, SDK tutorial, production examples, context engineering); §4 Skills System (concepts, built-in, custom, financial); §6 Tool Use Framework (basic patterns, memory tool/cross-session, context mgmt/compaction, programmatic tool calling); §9 Prompt Engineering (caching, metaprompt, batch, evals); §10 Advanced API (extended thinking, citations, observability, finetuning).

**`patterns/agents/prompts/research_lead_agent.md` verified at HEAD**:
- File blob SHA: `e02d9af3b8997061035ed28621fc522e1a46cee5` (current main; size 23,102 B)
- Content body confirms the `<use_parallel_tool_calls>` MUST-block: *"For maximum efficiency, whenever you need to perform multiple independent operations, invoke all relevant tools simultaneously rather than sequentially. Call tools in parallel to run subagents at the same time. You MUST use parallel tool calls for creating multiple subagents (typically running 3 subagents at the same time) at the start of the research, unless it is a straightforward query."*
- DeepWiki confirms: *"The parallel tool calls requirement you referenced is indeed present at lines 135-137 of `research_lead_agent.md`."*

→ Runtime CLAUDE.md L19 cite `@ 39a350b6790c132337dcc3ec35240728fcc1dc0e patterns/agents/prompts/research_lead_agent.md:135-137` is **semantically still valid**. The commit SHA `39a350b6` is an older snapshot; current blob `e02d9af3` has identical L135-137 content. **Recommended low-effort refresh**: bump CLAUDE.md L19 commit-SHA from `39a350b6...` to current main HEAD SHA on next CLAUDE.md edit (no urgency — content stable).

**Cookbook `patterns/` subdir listing (live via GitHub API)**: Only `agents/` subdirectory exists at `patterns/` top level. The deepwiki claim that `tools/`, `prompts/`, `orchestration/`, `research/`, `evals/` exist was incorrect — they don't exist as top-level `patterns/*/` subdirs. The `patterns/agents/` subdir contains: `basic_workflows.ipynb` · `orchestrator_workers.ipynb` · `evaluator_optimizer.ipynb` · `prompts/` (contains research_lead_agent.md).

**Cookbook `skills/` (the Skill SDK reference impl)**:
- `skills/CLAUDE.md` (8,202 B) — skill-design guidance for AI authors
- `skills/README.md` (11,698 B) — README
- `skills/CLAUDE.md` + `skills/file_utils.py` (9,767 B) + `skills/skill_utils.py` (12,406 B) — reusable utility libs
- `skills/custom_skills/`, `skills/notebooks/`, `skills/assets/`, `skills/sample_data/`, `requirements.txt`, `.env.example`, `.gitignore`

→ **Runtime does NOT currently import any of these utilities** for its 47 local SKILL.md files. Worth pattern-study, not bulk-install (CLAUDE.md cardinal-rule-3-compliant).

---

## §5 Convergent recommendations (≥2 sources agree, runtime hasn't adopted)

Each row = (pattern · source-evidence · impact 1-5 · install-effort 1-5)

1. **Parallel-tool-call MUST** — cookbook research_lead_agent.md L135-137 + Anthropic agent-teams docs + CLAUDE.md cardinal-rule-3 + W331 axis-1#5. Runtime ✓ adopted (parallel-dispatch-mandate skill + preagent-parallel-guard W330 P0-A binding). **No action.**
2. **CLAUDE.md ancestor/descendant memory model** — CCBP claude-memory.md L34-40 + code.claude.com/docs/en/memory. Runtime ✓ adopted (pointer-only ≤50 LOC). **No action.**
3. **New hook events (TaskCreated/PostCompact/FileChanged/CwdChanged/ConfigChange/TeammateIdle)** — anthropics/claude-code CHANGELOG + cookbook §6.3 Context Management. **6 new Anthropic-shipped hooks unwired.** Impact 5, effort 3.
4. **ECC plugin refresh + skill enablement sweep** — ECC cache at 2.0.0-rc.1 (release candidate), upstream `arabicapp/everything-claude-code` active 2026-05-20. 100+ ECC skills sit cached but inactive. Impact 4, effort 2.
5. **Cookbook skills/ SDK pattern study** — `skill_utils.py` + `file_utils.py` + `skills/CLAUDE.md`. Reusable utility lib model worth referencing for any future custom-skill SDK authoring. Impact 3, effort 2.
6. **CCBP changelog scheduled-refresh discipline** — CCBP `changelog/{agent-collections,cross-model-workflows,development-workflows,skill-collections}/changelog.md` with priority/type/action/status tables. Runtime has wave-by-wave verdict ledgers but no automated daily-refresh changelog per category. Impact 3, effort 3.
7. **Cookbook research_lead_agent.md cite-SHA refresh** — bump `39a350b6` → current main HEAD on next CLAUDE.md edit. Impact 2, effort 1. (Cosmetic; content semantically stable.)

---

## Top-5 CCBP/ECC/Anthropic patterns to adopt (prioritized)

| # | Pattern | Source | Impact | Effort | W337 phase |
|---|---|---|---|---|---|
| 1 | **Wire 6 new Anthropic hook events** (TaskCreated/PostCompact/FileChanged/CwdChanged/ConfigChange/TeammateIdle) | anthropics/claude-code:CHANGELOG.md | 5 | 3 | P1 |
| 2 | **ECC plugin refresh from `arabicapp/everything-claude-code`** + enable strategic ECC skills (agent-eval, codebase-onboarding, context-budget, error-handling, e2e-testing, browser-qa) | ECC cache 2.0.0-rc.1 vs upstream | 4 | 2 | P1 |
| 3 | **Cookbook `skills/skill_utils.py` + `file_utils.py` pattern-study** for future custom-skill SDK authoring | anthropics/claude-cookbooks:skills/ | 3 | 2 | P2 (pattern-only) |
| 4 | **CCBP scheduled-refresh changelog discipline** for 4 streams (agent-collections, cross-model-workflows, development-workflows, skill-collections) | CCBP:changelog/*/changelog.md | 3 | 3 | P2 |
| 5 | **Refresh CLAUDE.md L19 cite-SHA** `39a350b6` → current main HEAD (`e02d9af3` file blob) for cookbook research_lead_agent.md | runtime CLAUDE.md L19 | 2 | 1 | P3 (housekeeping) |

**Bonus retire-verdict reaffirm**: CCBP added `alirezarezvani/claude-skills` (15k★ / 246 skills) on 2026-05-13. Runtime W330 retire-verdict (per-skill trigger audit, ≤8 distinct triggers, no >50% overlap) **stands** — CCBP's act of listing doesn't constitute SOTA endorsement; cardinal-rule-4 corollary applies. Re-litigate at W340+ only if CCBP escalates to a "Hot" recommendation row.

---

**Report wordcount**: ~1,950 words. **File**: this document. **Probes returned**: GitHub API + DeepWiki + local fs scan. **Cite anchors verified**: 3/3 (CCBP claude-memory.md:34-40, cookbook research_lead_agent.md:135-137, ECC plugin path correction). **Net new gap items**: 1 large (6 hooks), 1 medium (ECC refresh+enable), 3 small (pattern-study + housekeeping).
