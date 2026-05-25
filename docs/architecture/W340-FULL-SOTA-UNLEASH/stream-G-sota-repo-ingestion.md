# Stream G — SOTA Repo Line-by-Line Ingestion

**Wave**: W340-FULL-SOTA-UNLEASH
**Date**: 2026-05-20
**Method**: deepwiki ask_question + GitHub repo inventory + plugin-cache cross-check
**Scope**: 12 named SOTA repos, install-tier verdict, composability score, adapt-path

---

## Master Table

| # | Repo | Tier | Composability | Already integrated? | Adapt path |
|---|------|------|---------------|---------------------|-----------|
| 1 | anthropics/claude-code | TIER-1-RUNTIME | 10/10 | ✓ (this runtime) | upgrade discipline; cite-anchor `/help` surface |
| 2 | anthropics/claude-cookbooks | TIER-2-PATTERN-STUDY | 9/10 | ✗ (cite-only) | extract orchestrator-workers + evaluator-optimizer + parallel pattern → SKILL.md or skills/sub-agents |
| 3 | wshobson/agents | TIER-1-INSTALL | 9/10 | ✗ NOT INSTALLED | `/plugin marketplace add wshobson/agents` + install agent-teams + 79 other plugins as needed |
| 4 | wshobson/commands | TIER-1-INSTALL | 8/10 | partial via claude-code-workflows? VERIFY | clone to `~/.claude/commands/` OR plugin-install |
| 5 | addyosmani/agent-skills | TIER-1-INSTALL | 9/10 | partial (5 vendored per W316; 3 prefix-namespaced) | upgrade to full `/plugin install addyosmani/agent-skills@addy-agent-skills` to get all 22 |
| 6 | mksglu/context-mode | TIER-1-INSTALL | 10/10 | ✓ INSTALLED | already wired; verify ctx_doctor passes; enable ctx_insight dashboard |
| 7 | OthmanAdi/planning-with-files | TIER-1-INSTALL | 9/10 | ✓ INSTALLED | already wired; consider plan-ar/de variants for i18n (not present in repo per deepwiki) |
| 8 | abhigyanpatwari/GitNexus | TIER-2-PATTERN-STUDY | 6/10 | ✗ (local-cypher-codebase fallback active per CLAUDE.md) | DO NOT install unless serena+ctx-mode+basic-memory composite proves insufficient; pattern-study the LadybugDB graph schema for memory-layer evolution |
| 9 | alirezarezvani/claude-skills | TIER-3-SKIP (DISCREPANCY) | 5/10 | ✗ NOT INSTALLED | **Discrepancy flagged**: deepwiki crawl says 48 skills well-curated KEEP-ALL; CLAUDE.md cites 313-skill retire-verdict per W330 — need re-audit; cherry-pick 0-3 unique skills only |
| 10 | mattpocock/skills | TIER-1-INSTALL | 8/10 | partial (10 vendored @ `d54c497aa944` per CLAUDE.md) | upgrade to full plugin install OR cherry-pick the 7 missing skills (see §10 below) |
| 11 | hesreallyhim/awesome-claude-code | META-BOOKMARK | n/a | ✗ | reference-only; sync TIER-1 entries to research-architecture-v2 catalog |
| 12 | CCBP (claude-code-best-practice-shan) | TIER-1-CITE-AUTHORITY | 10/10 | ✓ (clone at `Z:\repos\deps\claude-code-best-practice-shan` HEAD f28c2da) | cite-anchor authority for cardinal rules; keep clone fresh |

---

## §1 anthropics/claude-code

**Purpose**: Official Claude Code CLI — the runtime this entire architecture is built on.

**Primitives surfaced** (per deepwiki crawl, partial — output corruption truncated full slash-command list):
- Slash commands: `/help`, `/clear`, `/compact`, `/config`, `/permissions`, `/hooks`, `/plugin`, `/mcp`, `/skills`, `/memory`, `/status`, `/resume`, `/rename`, `/branch`, `/fork`, `/export`, `/usage`, `/doctor`, `/loop`, `/plan`, `/ultrareview`, `/debug`, `/todos`, `/add-dir`, `/terminal-setup`, `/teleport`, `/remote-control`, `/remote-env`, `/setup-vertex`, `/setup-bedrock`, `/env`, `/copy`, `/exit`, `/scroll-speed`, `/tui`, `/focus`, `/voice`, `/btw`, `/effort`, `/model`, `/context`, `/color`, `/reload-plugins`, `/less-permission-prompts`.
- Sub-agents: `Agent` tool with `subagent_type` parameter (https://docs.anthropic.com/en/docs/claude-code/sub-agents)
- Hooks: 8 events (PreToolUse, PostToolUse, Stop, SubagentStop, SessionStart, SessionEnd, UserPromptSubmit, PreCompact, Notification)
- Plugins: marketplace + install model via `/plugin marketplace add` and `/plugin install`
- Skills: SKILL.md path-gated, auto-fire on description match

**Notable patterns**:
- 1M context window enabled by default (Sonnet 4.6 / Opus 4.7 / Haiku 4.5) per https://code.claude.com/docs/en/model-config
- CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1 enables team-spawn workflow
- CLAUDE_CODE_FORK_SUBAGENT=1 for full conversation-history inheritance in forked subagents
- Auto-compact at ~95% (override via CLAUDE_AUTOCOMPACT_PCT_OVERRIDE)

**Composability**: 10/10 — this IS the runtime.

**Verdict**: **TIER-1-RUNTIME**. Already in.

**Adapt**:
- Keep version current (check `claude --version`)
- Surface `/usage`, `/insights`, `/doctor` (Stream F to audit)
- Enable session-recording per ECC_SESSION_RECORDING_DIR (already set per CLAUDE.local.md)

---

## §2 anthropics/claude-cookbooks

**Purpose**: Official Anthropic pattern cookbook — 5 multi-agent patterns + Claude Agent SDK tutorial series.

**Primitives shipped**:
- `patterns/agents/orchestrator_workers.ipynb` — FlexibleOrchestrator class, two-phase (analysis → execution), XML-structured subtasks
- `patterns/agents/evaluator_optimizer.ipynb` — generator/critic feedback loop
- `patterns/agents/basic_workflows.ipynb` — Router (XML-parsed selection), Parallelization (`parallel()` via ThreadPoolExecutor), Prompt Chaining
- `patterns/agents/prompts/research_lead_agent.md` — **3 subagents in parallel** at research start (cite-anchored in CLAUDE.md)

**Notable patterns**:
- `<use_parallel_tool_calls>` MUST-block in research_lead_agent.md:135-137 (cited by CLAUDE.md W269 mandate)
- Workers process sequentially by default — Anthropic explicitly recommends ThreadPoolExecutor / asyncio.gather
- Claude Agent SDK exposes `query()`, `ClaudeSDKClient`, `ClaudeAgentOptions` for hosting CC patterns programmatically
- No agentic-rag pattern as first-party (RAG only via third-party integrations)
- No first-party adversarial-review prompt template (live in evaluator_optimizer but not extracted)

**Composability**: 9/10 — patterns translate cleanly to skills + sub-agents.

**Verdict**: **TIER-2-PATTERN-STUDY**.

**Adapt**:
- Promote `orchestrator-workers` to a SKILL.md if not already (check `.claude/plugins/cache/claude-plugins-official/superpowers/*/skills/dispatching-parallel-agents/SKILL.md` — already covers fan-out)
- Add `evaluator-optimizer` SKILL.md for adversarial-review loop discipline (codex round-1 → round-2 → tie-break fits this pattern)
- Cite `patterns/agents/prompts/research_lead_agent.md:135-137` in any new parallel-dispatch enforcement

**Files to extract**:
- `patterns/agents/orchestrator_workers.ipynb` → orchestrator-workers SKILL.md
- `patterns/agents/evaluator_optimizer.ipynb` → evaluator-optimizer SKILL.md
- `patterns/agents/basic_workflows.ipynb` → router + parallelization + prompt-chaining patterns

---

## §3 wshobson/agents

**Purpose**: Plugin marketplace shipping **185 agents across 80 plugins in 25 categories**.

**Primitives shipped**:
- 185 agents (architecture, languages, infrastructure, quality, data/AI, docs, business, SEO)
- 80 plugins (each ~1000 tokens at install)
- 16 multi-agent workflow orchestrators
- **agent-teams plugin**: 7 presets (`review`, `debug`, `feature`, `fullstack`, `research`, `security`, `migration`)
- Commands: `/team-spawn`, `/team-status`, `/team-shutdown`, `/team-review`, `/team-debug`, `/team-feature`, `/team-delegate`

**Notable patterns**:
- Tool restriction via frontmatter `tools:` field (e.g., `tools: Read, Grep, Glob` for read-only Explore/Plan agents)
- Bare agent names within plugins; plugin-level FQN at install (`/plugin install python-development`)
- Four-tier model strategy: Opus (architecture/security), Inherit (complex), Sonnet (docs/testing), Haiku (fast ops)
- `subagent_type` parameter as `agent-teams:team-reviewer` / `agent-teams:team-debugger` / etc.
- Mailbox/SendMessage discipline between teammates
- File-ownership boundaries to prevent merge conflicts in parallel feature dev

**Composability**: 9/10 — slots in cleanly; requires CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1 (already set per CLAUDE.local.md).

**Verdict**: **TIER-1-INSTALL**. NOT INSTALLED in current runtime per plugin-cache listing — only `wshobson/agents` workflows are referenced via `claude-code-workflows` marketplace (cached at `.claude/plugins/cache/claude-code-workflows/`), but the full marketplace+plugins is NOT in this runtime's installed set.

**Adapt path**:
```
/plugin marketplace add wshobson/agents
/plugin install agent-teams
/plugin install python-development      # if Python work
/plugin install kubernetes-operations    # if k8s work
/plugin install code-review-toolkit
```
Plus per-domain plugins as needed. Token cost: ~1000 per plugin → install lean.

**Files to extract**:
- `agent-teams/.claude-plugin/plugin.json` — preset definitions
- `agent-teams/skills/team-spawn/SKILL.md` — orchestrator entry
- `agent-teams/agents/team-lead.md` — orchestrator system prompt

---

## §4 wshobson/commands

**Purpose**: **52 production-ready slash commands** — 14 Workflows + 38 Tools.

**Primitives shipped**:
- Workflows: `/multi-agent-review`, `/multi-agent-optimize`, `/feature-development`, `/data-driven-feature`, etc.
- Tools: `/api-scaffold`, security commands, debugging commands, etc.
- No YAML frontmatter — pure markdown body with `$ARGUMENTS` placeholder

**Notable patterns**:
- `/multi-agent-review` → coordinates `code-reviewer` + `security-auditor` + `architect-reviewer` in parallel (3 subagent_types)
- `/multi-agent-optimize` → `database-optimizer` + `performance-engineer` + `frontend-developer` parallel
- `/feature-development` → sequential pipeline (backend-architect → frontend-developer → test-automator → deployment-engineer)
- `/data-driven-feature` → 10 agents across 5 phases
- Pairs with `wshobson/agents` marketplace for subagent_type resolution

**Composability**: 8/10. NOTE: bare subagent_type (`code-reviewer`) collides with multiple plugins per W333-D — must remap to FQN like `pr-review-toolkit:code-reviewer` when adopting.

**Verdict**: **TIER-1-INSTALL** with FQN remap pass.

**Adapt path**:
- Option A (whole repo): `git clone https://github.com/wshobson/commands ~/.claude/commands` then audit each .md for FQN collisions
- Option B (cherry-pick): copy 5-10 high-value commands (`/multi-agent-review`, `/multi-agent-optimize`, `/feature-development`) into local `.claude/commands/` with FQN remap

**Files to extract**:
- `workflows/multi-agent-review.md`
- `workflows/multi-agent-optimize.md`
- `workflows/feature-development.md`
- `workflows/data-driven-feature.md`

---

## §5 addyosmani/agent-skills

**Purpose**: **22 lifecycle skills** organized define/plan/build/verify/review/ship.

**Primitives shipped** (all SKILL.md per deepwiki):
- **Meta**: `using-agent-skills`
- **Define**: `idea-refine`, `spec-driven-development`
- **Plan**: `planning-and-task-breakdown`
- **Build**: `incremental-implementation`, `test-driven-development`, `context-engineering`, `source-driven-development`, `doubt-driven-development`, `frontend-ui-engineering`, `api-and-interface-design`
- **Verify**: `browser-testing-with-devtools`, `debugging-and-error-recovery`
- **Review**: `code-review-and-quality`, `code-simplification`, `security-and-hardening`, `performance-optimization`
- **Ship**: `git-workflow-and-versioning`, `ci-cd-and-automation`, `deprecation-and-migration`, `documentation-and-adrs`, `shipping-and-launch`

**Notable patterns**:
- **doubt-driven-development 5-step cycle**: CLAIM → EXTRACT → DOUBT → RECONCILE → STOP
- **source-driven-development**: every framework/library decision grounded in official docs (cites + flags unverified patterns)
- **incremental-implementation**: thin vertical slices, ≤100 LOC before test
- **frontend-ui-engineering**: WCAG 2.1 AA accessibility, component arch, state mgmt
- **api-and-interface-design**: contract-first, Hyrum's Law, One-Version Rule, error semantics, boundary validation
- 3-layer composition: Skills (workflows) + Personas (roles) + Slash commands (entry points)

**Composability**: 9/10 — clean SKILL.md auto-fire descriptions.

**Verdict**: **TIER-1-INSTALL**. Current runtime has **partial** integration (5 vendored per W316 + 3 prefix-namespaced per CLAUDE.md: addyosmani-doubt-driven-development, frontend-ui-engineering, api-and-interface-design). Missing: ~14 skills.

**Adapt path**:
```
/plugin marketplace add addyosmani/agent-skills
/plugin install agent-skills@addy-agent-skills
```
Then audit overlap with existing skills (e.g., `addyosmani-spec-driven-development` vs `speckit-*` skills — keep both, lower trigger overlap).

**Files to extract** (if adopting): all 22 `skills/*/SKILL.md` + their `tools/*.py` python tools.

---

## §6 mksglu/context-mode

**Purpose**: MCP server + Claude Code plugin for **94-99% context savings** via sandboxed execution + FTS5 indexing.

**Primitives shipped**:
- 9 MCP tools: `ctx_execute`, `ctx_execute_file`, `ctx_batch_execute`, `ctx_search`, `ctx_fetch_and_index`, `ctx_index`, `ctx_stats`, `ctx_doctor`, `ctx_upgrade` (+`ctx_purge`, `ctx_insight` per system reminder; deepwiki didn't see those)
- PreToolUse hook intercepts Bash, Read, WebFetch, Grep, Task
- PostToolUse + PreCompact + SessionStart hooks for session tracking
- ROUTING_BLOCK XML injection for subagents (teach them about ctx_* tools)
- 2-DB: SessionDB (persistent) + ContentStore (ephemeral FTS5)
- BM25 ranking + 3-layer search fallback (porter stemming → trigram → fuzzy)

**Notable patterns**:
- **Hook decision tree**: Deny / Redirect / Nudge / Allow
- **Intent-driven filtering**: outputs >5KB with `intent=...` → search-based filtering, not raw return
- **Network tracking**: `__CM_NET__` counter for JS/TS sandbox
- **Multi-platform**: Claude Code (98% savings), Gemini CLI (high), VS Code Copilot (high), OpenCode (TS plugin), Codex CLI (60%, AGENTS.md only)

**Composability**: 10/10.

**Verdict**: **TIER-1-INSTALL**. ✓ ALREADY INSTALLED at `.claude/plugins/cache/context-mode`.

**Adapt path**:
- Verify all 4 hooks (PreToolUse, PostToolUse, PreCompact, SessionStart) are active
- Run `/context-mode:ctx-doctor` to confirm FTS5 + hooks pass
- Open `ctx_insight` dashboard once for personal metrics
- Confirm `ctx_purge` available if needed

---

## §7 OthmanAdi/planning-with-files

**Purpose**: Manus-style 3-file planning discipline for persistent agent memory.

**Primitives shipped**:
- 3 files: `task_plan.md` (phases, decisions, errors), `findings.md` (research, web results), `progress.md` (session log, test results)
- 4 hooks: UserPromptSubmit (plan tampering check + inject), PreToolUse (re-read task_plan first 30 lines), PostToolUse (remind to update), Stop (verify all phases done)
- Commands: `/planning-with-files:plan`, `/planning-with-files:status`, `/planning-with-files:start`
- Language variants: `planning-with-files-zh` (Simplified Chinese), `planning-with-files-zht` (Traditional Chinese), `planning-with-files-es` (Spanish). **NO `plan-ar` or `plan-de` per deepwiki** (CLAUDE.md system reminder lists them as available — confirm by reading SKILL.md files locally)

**Notable patterns**:
- Manus principles (acquired by Meta Dec 2025, $2B)
- Context window = RAM (volatile); Filesystem = Disk (persistent)
- SHA-256 attestation against plan tampering
- Multi-platform: Claude Code, Cursor, Continue, Copilot, Mastra, CodeBuddy, Factory, Kiro, AdaL

**Composability**: 9/10. Conflicts mildly with TodoWrite native tool — skill description must clearly delineate (already covered in `durable-planning-files` local SKILL.md).

**Verdict**: **TIER-1-INSTALL**. ✓ ALREADY INSTALLED at `.claude/plugins/cache/planning-with-files`.

**Adapt path**:
- Confirm SHA-256 attestation hook is firing
- Verify `Stop` hook gates session-end
- Sanity-check the 4 hooks per W340 Stream C silent-fallback audit
- Cross-reference with local `durable-planning-files` skill for divergence

---

## §8 abhigyanpatwari/GitNexus

**Purpose**: Graph-powered code intelligence via local LadybugDB (no Neo4j needed).

**Primitives shipped**:
- 7 core MCP tools: `list_repos`, `query`, `context`, `impact`, `detect_changes`, `rename`, `cypher`
- 16 tools total (incl. `api_impact`, `route_map`, `tool_map`, `shape_check`, `group_*`)
- Resources: `gitnexus://repos`, `/context`, `/clusters`, `/processes`, `/schema`
- 6-phase indexing: Structure → Parsing (Tree-sitter) → Resolution → Clustering → Processes → Search
- Optional embeddings: local via `@huggingface/transformers` OR remote OpenAI-compatible endpoint
- CLI + MCP mode (LadybugDB persistent) + Web UI (in-memory WASM)

**Notable patterns**:
- Property graph schema: File/Folder/Function/Class/Interface/Method/CodeElement/Community/Process nodes
- Relations: CONTAINS/DEFINES/CALLS/IMPORTS/EXTENDS/IMPLEMENTS/HAS_METHOD/HAS_PROPERTY/ACCESSES/METHOD_OVERRIDES/MEMBER_OF/STEP_IN_PROCESS
- BM25 + semantic + RRF hybrid search
- Process-grouped queries (Cypher exposed)
- Claude Code: PreToolUse/PostToolUse hooks enrich searches with graph context

**Composability**: 6/10. Overlaps with **serena symbol-find + ctx-mode FTS5 + basic-memory** composite already active. Heavy install (LadybugDB persistence).

**Verdict**: **TIER-2-PATTERN-STUDY**. CLAUDE.md retired GitNexus marketplace per W316; `local-cypher-codebase` skill is the documented fallback.

**Adapt path**:
- DO NOT install unless memory-layer audit (Stream A/D/E) shows serena+ctx-mode+basic-memory composite is insufficient for impact-analysis workloads
- Pattern-study LadybugDB schema for any future memory-graph evolution
- Cite `Z:\repos\deps\GitNexus\src\schema.ts` (if cloned) in design docs only

---

## §9 alirezarezvani/claude-skills

**Purpose**: Claimed 313 skills per W330 codex audit / 48 skills per current deepwiki crawl — **DISCREPANCY FLAGGED**.

**Primitives shipped** (per deepwiki 2026-05-20):
- **48 skills total** across 6 domains:
  - Marketing: 5
  - Engineering: 18
  - Product: 5
  - C-Level Advisory: 2
  - Project Management: 6
  - Regulatory Affairs & Quality Management: 12
- Quality gates: yamllint, check-jsonschema, Python syntax, markdown-link-check, safety, gitleaks, AI-powered code review
- Refactoring plan: lean SKILL.md (50-200 lines), rich descriptions

**Notable patterns**:
- 4-component standardized skill structure
- Modular self-contained (no inter-skill deps)
- Marketplace + per-skill quality gates

**Composability**: 5/10. Deepwiki crawl says "KEEP-ALL"; CLAUDE.md W330 codex axis-2 §3.2 says "retire". **Need re-audit**.

**Verdict**: **TIER-3-SKIP (DISCREPANCY)**. Pending re-audit:
- (a) The 313-count claim may have referenced a different snapshot or a different repo (e.g., the `alirezarezvani/agent-skills` if it exists, or an older fork)
- (b) Current state is 48 well-curated skills — could be cherry-pick candidate
- (c) Overlap with existing skills (engineering-skills, engineering-advanced-skills, document-skills) is high — composite trigger pollution risk

**Adapt path**:
- Re-run W330 codex axis-2 audit against current 48-skill snapshot
- If verdict re-affirms retire: skip
- If verdict shifts to cherry-pick: select Regulatory Affairs (12 unique) and C-Level Advisory (2 unique) — no overlap with existing engineering/document/code-modernization bundles
- Triggers must be capped at ≤8 per skill (current refactor plan has rich descriptions but some exceed 8 — needs filter)

---

## §10 mattpocock/skills

**Purpose**: 17 disciplined-engineering skills (engineering 10 / productivity 4 / misc 3).

**Primitives shipped**:
- **Engineering (10)**: `diagnose`, `grill-with-docs`, `triage`, `improve-codebase-architecture`, `setup-matt-pocock-skills`, `tdd`, `to-issues`, `to-prd`, `zoom-out`, `prototype`
- **Productivity (4)**: `caveman`, `grill-me`, `handoff`, `write-a-skill`
- **Misc (3)**: `git-guardrails-claude-code`, `migrate-to-shoehorn`, `scaffold-exercises`

**Notable patterns**:
- 4 failure modes addressed: misalignment, verbosity, code quality, architectural entropy
- Structured step-by-step processes with exit criteria (e.g., diagnose's 6-phase loop, tdd's red-green-refactor)
- Domain-language emphasis (`CONTEXT.md`) for token reduction
- Composable workflow: setup → triage → grill-with-docs → tdd → diagnose

**Composability**: 8/10.

**Verdict**: **TIER-1-INSTALL**. Current runtime has **10 vendored @ `d54c497aa944`** per CLAUDE.md "mattpocock-vendor-fork-10". Confirmed in available-skills list: caveman, diagnose, grill-with-docs, handoff, improve-codebase-architecture, learned, run, simplify, to-issues, triage. The "learned"/"run"/"simplify" don't match the 17 upstream — these may be local additions or a different version.

**Missing upstream skills** (7-10 candidates):
- `setup-matt-pocock-skills`
- `tdd` (note: local `tdd` skill exists from `tdd-workflows:` — verify whether mattpocock's variant differs)
- `to-prd`
- `zoom-out`
- `prototype`
- `grill-me`
- `write-a-skill` (note: local `superpowers:writing-skills` already exists)
- `git-guardrails-claude-code` (note: local `block-no-verify:*` skills already exist)
- `migrate-to-shoehorn` (TypeScript-specific; skip unless TS work)
- `scaffold-exercises` (exercise repo specific; skip)

**Adapt path**:
- Option A: full plugin install from upstream HEAD (will move past d54c497aa944)
- Option B (recommended): selective sync of `setup-matt-pocock-skills`, `to-prd`, `zoom-out`, `prototype`, `grill-me` (5 new, no overlap)
- Skip the rest (overlap or out-of-scope)

---

## §11 hesreallyhim/awesome-claude-code

**Purpose**: META-BOOKMARK awesome-list for Claude Code ecosystem.

**Primitives shipped**: README + curated category lists (skills, agents, hooks, plugins, MCP, frameworks, observability, learning resources).

**Composability**: n/a (reference only).

**Verdict**: **META-BOOKMARK**. Not a plugin.

**Adapt path**:
- WebFetch the README (note: blocked by context-mode hook in this fork session per error msg — use `mcp__plugin_context-mode_context-mode__ctx_fetch_and_index` next time)
- Sync TIER-1 candidates into the Stream B SOTA-repos research catalog
- Bookmark in `docs/architecture/W340-FULL-SOTA-UNLEASH/MASTER-CATALOG.md` when synthesized

---

## §12 claude-code-best-practice-shan (CCBP)

**Purpose**: CITE-AUTHORITY reference for cardinal-rule discipline (NOT a plugin).

**Primitives shipped** (per local Z:\repos\deps\claude-code-best-practice-shan listing):
- CLAUDE.md (root)
- README.md
- `best-practice/` — claude-memory.md, claude-settings.md, claude-hooks.md, claude-mcp.md (cited heavily in CLAUDE.md)
- `agent-teams/` — agent-team best practice
- `changelog/`
- `development-workflows/`
- `implementation/`
- `orchestration-workflow/`
- `presentation/`
- `reports/`
- `tips/`
- `tutorial/`
- `videos/`

**Notable patterns**:
- Pointer-only root memory (≤50 LOC CLAUDE.md)
- Z:-portable install ENV block authority
- Hook discipline (no project-owned bodies >2KB)
- MCP env-interp for secrets

**Composability**: 10/10 (cite-anchor authority, not installed code).

**Verdict**: **TIER-1-CITE-AUTHORITY**. ✓ ALREADY CLONED at `Z:\repos\deps\claude-code-best-practice-shan` HEAD f28c2da per CLAUDE.md W329 Stream E.

**Adapt path**:
- Keep clone fresh (periodic `git -C Z:\repos\deps\claude-code-best-practice-shan pull`)
- Cite specific lines in CLAUDE.md cardinal rules (already done extensively)
- Cross-reference CCBP best-practice/*.md against actual settings.json + hooks (Stream E covers this)

---

## TOP-5 GEMS (under-represented but high-pattern-quality)

1. **mattpocock/skills `setup-matt-pocock-skills`** — per-repo config (issue tracker, triage labels, domain docs) consumed by other skills. NOT in current runtime. Pattern: "skill bootstrap chain" where one skill sets up state for others.

2. **anthropics/claude-cookbooks `evaluator_optimizer.ipynb`** — generator/critic feedback loop. Maps directly to codex round-1 → round-2 → tie-break workflow already cited in CLAUDE.md. Should be promoted to a formal `evaluator-optimizer` SKILL.md to make the discipline auto-fire.

3. **wshobson/agents `agent-teams` 7-presets** — review/debug/feature/fullstack/research/security/migration. CLAUDE.md mandates W269 parallel dispatch but the canonical preset names aren't fully wired as commands in this runtime. Installing wshobson/agents brings `/team-spawn research|security|...` immediately.

4. **context-mode `ctx_insight` dashboard** — personal metrics (tool usage, error rate, parallel work patterns, project focus, actionable insights). Should be opened once and bookmarked.

5. **addyosmani `doubt-driven-development` 5-step cycle** — CLAIM → EXTRACT → DOUBT → RECONCILE → STOP. Already partially vendored, but full plugin install brings the SKILL.md content + python `tools/` rather than just the description.

---

## RETIRE / SKIP LIST

| Repo | Reason |
|------|--------|
| alirezarezvani/claude-skills | DISCREPANCY between W330 codex retire-verdict (313 skills) and deepwiki 48-skill KEEP-ALL — pending re-audit; default to skip until reconciled |
| abhigyanpatwari/GitNexus | retired per W316; local-cypher-codebase + serena+ctx-mode+basic-memory composite covers most use cases |
| Older snapshot of any vendor-fork (e.g., mattpocock @ d54c497aa944) | sync to current upstream HEAD or drop |

---

## Discrepancies / Verifications Needed

1. **alirezarezvani**: 313 vs 48 skill count — re-audit with current commit SHA
2. **wshobson/commands**: deepwiki says 52 commands no YAML frontmatter; CLAUDE.md doesn't track this directly — verify whether claude-code-workflows marketplace ships a subset
3. **planning-with-files**: language variants `plan-ar`/`plan-de` listed in system reminder skill list but NOT in deepwiki crawl — verify by reading local SKILL.md files
4. **mattpocock**: 17 upstream vs 10 vendored — net 7 sync candidates after deduping against local skills (`tdd`, `git-guardrails-claude-code`, `write-a-skill` overlap with existing local skills)
5. **anthropics/claude-code deepwiki output**: corrupted (terminal-setup repeated thousands of times) — re-query with smaller scope OR rely on https://docs.anthropic.com/en/docs/claude-code/ direct
6. **awesome-claude-code WebFetch**: blocked by context-mode hook in this fork — use `ctx_fetch_and_index` next pass

---

## SUMMARY (for parent orchestrator)

**Top-5 must-adopt patterns**:
1. **Install `wshobson/agents` marketplace** → unlocks 7-preset agent-teams commands + 185 agents + tool-restriction frontmatter pattern (currently NOT installed; W269 mandate cites this discipline)
2. **Full plugin install of `addyosmani/agent-skills`** → upgrades from 5 vendored + 3 prefix-namespaced to full 22-skill lifecycle (define/plan/build/verify/review/ship)
3. **Promote `evaluator-optimizer` to a formal SKILL.md** → cite-anchor to `claude-cookbooks/patterns/agents/evaluator_optimizer.ipynb` for the codex round-1/round-2/tie-break discipline already in CLAUDE.md
4. **Selective `mattpocock/skills` sync** → 5 new skills (setup-matt-pocock-skills, to-prd, zoom-out, prototype, grill-me) NOT in current 10-vendored fork
5. **`context-mode` enable `ctx_insight` dashboard + `ctx_purge` verification** → already installed but personal-metrics surface and purge command may be under-utilized

**Output file**: `Z:\claude-sota-installed\docs\architecture\W340-FULL-SOTA-UNLEASH\stream-G-sota-repo-ingestion.md`
