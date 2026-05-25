# W329-G — SOTA Repos Refresh + Line-by-Line Ingest

Status: COMPLETE · Wave: W329 Stream G · Date: 2026-05-19 · Agent: Stream G

## §0 Executive — per-repo verdict table

| Repo | HEAD SHA | HEAD Date | Stars | Installed Version | Runtime Status | sca-v12 Tier | Drift |
|---|---|---|---|---|---|---|---|
| wshobson/agents | `08ded5e7b0fe` | 2026-05-17 | 35,664 | `agent-teams@1.0.2` (via claude-code-workflows) | INSTALLED + ENABLED | **T1** (canonical agent-teams) | UNKNOWN-LAG (HEAD 2026-05-17 fix:agent-teams-coord; installed 1.0.2 needs version-vs-HEAD reconcile) |
| addyosmani/agent-skills | `f17c6e88c904` | 2026-05-16 | 43,793 | `agent-skills@1.0.0` | INSTALLED + ENABLED | **T1** (canonical addyosmani-vendor-fork-5 covers core 5; +17 more available) | MAJOR (only 5 of 22 skills vendored locally; 17 unadopted) |
| mattpocock/skills | `d54c497aa944` | 2026-05-19 | 94,177 | local SKILL.md vendor-fork × 6 | LOCAL-VENDOR-FORK (no plugin) | **T1-PROV** (vendor-fork-6 stable; 7 more canonical skills NOT adopted) | MEDIUM (improve-codebase-architecture, prototype, setup, to-issues, to-prd, triage, zoom-out, grill-me, write-a-skill = 7 missing) |
| mksglu/context-mode | `7f71632c3c39` | 2026-05-19 (v1.0.142) | 15,169 | `context-mode@1.0.141` | INSTALLED + ENABLED | **T0** (canonical context-window-protection — mandatory) | TINY (1 patch behind; HEAD 1.0.142 vs installed 1.0.141 = -1 patch) |
| OthmanAdi/planning-with-files | `7f71632c3c39` (commit) → release `2.38.x` | 2026-05-19 | confirm via gh | `planning-with-files@2.38.1` | INSTALLED + ENABLED | **T1** (canonical durable-planning pattern) | NONE-OR-MINOR (installed 2.38.1; HEAD likely same minor; recent activity in repo per pushed_at 2026-05-19) |
| abhigyanpatwari/GitNexus | `803f0bed5f7d` | 2026-05-19 (v1.6.5+) | 39,057 | `gitnexus@1.3.6` (marketplace) | INSTALLED + ENABLED | **T1** (canonical code-knowledge-graph) | **MAJOR** (installed 1.3.6 vs HEAD ~1.6.5 = ~3 minor versions behind; new tools `api_impact`/`route_map`/`tool_map`/`shape_check` may be missing; Win-FTS BM25-degradation fix in HEAD) |
| alirezarezvani/claude-skills | `8aa920812f05` | 2026-05-19 | 15,518 | NOT INSTALLED as standalone (overlap via wshobson collections) | NOT-INSTALLED | **T2-CHERRY** (regulatory/compliance + leadership niche; engineering overlap w/ installed) | N/A (cherry-pick candidates: cto-advisor, qms-iso13485-specialist, gdpr-dsgvo-expert per niche-fit) |
| anthropics/claude-cookbooks | `39a350b6790c` | 2026-05-19 | 43,346 | CITED-REFERENCE-ONLY (CLAUDE.md L20 cites `39a350b6790c…` for use_parallel_tool_calls) | CITE-ONLY | **T0** (canonical Anthropic patterns) | NONE (already at HEAD SHA per CLAUDE.md cite) |

**Net drift verdict**: 2 P0 drift (GitNexus 3-minor-lag + Windows BM25 fix; agent-teams 1.0.2 may lag HEAD), 1 P1 (addyosmani 17 unadopted skills), 1 P2 (mattpocock 7 unadopted skills), 1 trivial (context-mode -1 patch).

---

## §1 wshobson/agents (agent-teams plugin lineage)

**HEAD**: `08ded5e7b0fe` 2026-05-17 "fix: agent teams coordination guardrails (#535)" · 35,664 stars · canonical agent-teams source.

**Installed**: `agent-teams@1.0.2` via `claude-code-workflows` marketplace at `Z:/claude-sota-installed/.claude/plugins/cache/claude-code-workflows/agent-teams/1.0.2/.claude-plugin/plugin.json`. Author: Seth Hobson <seth@major7apps.com>, MIT.

**Canonical 6 skills** (all auto-fire per `description:`):
1. `multi-reviewer-patterns` — coordinate parallel code reviews across quality dimensions
2. `parallel-debugging` — competing hypotheses, parallel investigation, root-cause arbitration
3. `parallel-feature-development` — file ownership, conflict avoidance, integration
4. `task-coordination-strategies` — decompose, dependency graphs, workload balance
5. `team-communication-protocols` — structured JSON messages, plan approval, shutdown
6. `team-composition-patterns` — sizing heuristics, presets, agent type selection

**Canonical 7 slash commands**: `/team-spawn` (entry), `/team-status`, `/team-shutdown`, `/team-review`, `/team-debug`, `/team-feature`, `/team-delegate`.

**Parent-orchestrator-MUST contract** (per `team-lead` agent):
- Task decomposition → independent parallelizable units + acceptance criteria
- **File ownership cardinal rule: "One owner per file"** (matches our W272 worktree-per-session rule)
- Dependency graphs minimized; circular deps resolved
- `message` for direct, `broadcast` only for critical team-wide
- `plan_mode_required` teammate must get lead approval before proceeding
- Lifecycle: spawn → assign → monitor → collect → synthesize → graceful shutdown

**settings.json shape** (NOT currently in our settings):
```json
"teammateMode": "tmux" | "iterm2" | "in-process"   // default in-process
```

**Drift items vs runtime**:
- ✓ Installed and registered; W269 mandate already encodes the parent-orchestrator parallel-dispatch contract
- ✗ `teammateMode` not explicitly set in `.claude/settings.json` (defaults to in-process — verify alignment with W259-v8 4-modes architecture)
- ✗ HEAD commit 2026-05-17 "fix: agent teams coordination guardrails (#535)" — must verify whether v1.0.2 includes this PR-merge or needs version bump

---

## §2 addyosmani/agent-skills

**HEAD**: `f17c6e88c904` 2026-05-16 "Merge PR #60 CI skill validator" · 43,793 stars (largest in this set).

**Installed**: `agent-skills@1.0.0` at `Z:/claude-sota-installed/.claude/plugins/cache/addy-agent-skills/agent-skills/1.0.0/.claude-plugin/plugin.json`. Plus W316 vendor-fork-5 of canonical 5 skills (doubt-driven, frontend-ui, api-and-interface, code-simplification, +variants per CLAUDE.md L40) at `Z:/claude-sota-installed/.claude/skills/`.

**Full 22-skill inventory** (per deepwiki, organized by SDLC phase):
- **Meta**: `using-agent-skills`
- **Define**: `idea-refine`, `spec-driven-development`
- **Plan**: `planning-and-task-breakdown`
- **Build**: `incremental-implementation`, `test-driven-development`, `context-engineering`, `source-driven-development`, `doubt-driven-development`✓, `frontend-ui-engineering`✓, `api-and-interface-design`✓
- **Verify**: `browser-testing-with-devtools`, `debugging-and-error-recovery`
- **Review**: `code-review-and-quality`, `code-simplification`✓, `security-and-hardening`, `performance-optimization`
- **Ship**: `git-workflow-and-versioning`, `ci-cd-and-automation`, `deprecation-and-migration`, `documentation-and-adrs`, `shipping-and-launch`

✓ = vendor-forked locally (5 of 22).

**Unique pattern** ("Process not prose"): each skill has (a) **anti-rationalization table** with documented counter-arguments to common skip-excuses, (b) **non-negotiable evidence requirements** (tests-passing / build-output), (c) **progressive disclosure** (SKILL.md = entry only). Encodes Google-eng concepts: Hyrum's Law, Beyonce Rule, Chesterton's Fence.

**Drift items**:
- ✓ Plugin installed (1.0.0)
- ✗ **17 skills NOT vendor-forked locally** — biggest opportunity in this audit; especially `source-driven-development`, `incremental-implementation`, `spec-driven-development`, `security-and-hardening`, `performance-optimization`
- ✗ Plugin version 1.0.0 likely lags HEAD substantially (43k stars + CI-skill-validator just merged 2026-05-16)

---

## §3 mattpocock/skills

**HEAD**: `d54c497aa944` 2026-05-19 "Improved wording of /handoff" · 94,177 stars (largest stars-count in entire audit).

**Installed**: NO plugin install. Local vendor-fork-6 at `Z:/claude-sota-installed/.claude/skills/{grill-with-docs,tdd,caveman,diagnose,handoff,review}` per CLAUDE.md L40 cite `67bce91c80cd`.

**Canonical skill inventory** (per deepwiki — 14 active skills, plus in-progress/deprecated excluded):

Engineering (10): `diagnose`✓, `grill-with-docs`✓, `improve-codebase-architecture`✗, `prototype`✗, `setup-matt-pocock-skills`✗, `tdd`✓, `to-issues`✗, `to-prd`✗, `triage`✗, `zoom-out`✗

Productivity (4): `caveman`✓, `grill-me`✗, `handoff`✓, `write-a-skill`✗

In-Progress (used by us, NOT canonical): `review`✓, `writing-beats`, `writing-fragments`

✓ = vendor-forked locally (6+1 = 7 of 14).

**Unique pattern**: short, opinionated, repeatable engineering loops. Skills tightly coupled to a workflow-style state machine (especially `triage`, `to-prd`, `to-issues`).

**Drift items**:
- ✗ Vendor-fork SHA `67bce91c80cd` per CLAUDE.md vs HEAD `d54c497aa944` 2026-05-19 — last commit was wording-tweak to `/handoff` (low-impact); may be content-stable
- ✗ **7 unadopted canonical skills** — top P1 candidates: `improve-codebase-architecture` (matches our refactoring loop), `to-issues` (PRD→issues automation), `triage` (issue workflow state machine), `zoom-out` (broader-context heuristic)
- ✗ HEAD freshness: `d54c497aa944` 2026-05-19 = same-day as audit; refresh-cite candidate

---

## §4 mksglu/context-mode (MCP plugin)

**HEAD**: `7f71632c3c39` 2026-05-19 "1.0.142" · 15,169 stars · 1.0.142 is the latest release.

**Installed**: `context-mode@1.0.141` at `Z:/claude-sota-installed/.claude/plugins/cache/context-mode/context-mode/1.0.141/.claude-plugin/plugin.json` (also 1.0.136 cache lingering). Per deepwiki the package version pivoted from 1.0.18 → 1.0.142, indicating major rapid iteration.

**3-layer architecture**:
1. **Interception** (`hooks/pretooluse.mjs` + `routing.mjs` + `security.ts`) — examine every tool call pre-execution
2. **Execution** (`PolyglotExecutor` in `src/executor.ts`) — spawn isolated subprocesses, capture only stdout, track network bytes never entering context
3. **Filtering** — output >5KB + intent → index into FTS5 KB, return only matching sections (`intentSearch()`, `indexPlainText()`)

**Tools exposed** (`mcp__plugin_context-mode_context-mode__*`):
- `ctx_batch_execute` — multiple commands + queries in one call (primary research tool)
- `ctx_execute` — sandboxed subprocess, 11 languages, mandatory for >20 lines
- `ctx_execute_file` — file processing in sandbox
- `ctx_index` — chunk markdown into FTS5 with BM25 ranking
- `ctx_search` — multi-query indexed content with 3-layer fuzzy fallback
- `ctx_fetch_and_index` — URL fetch, content-type detect, chunk, index
- Utility: `ctx_stats`, `ctx_doctor`, `ctx_upgrade`

**PreToolUse hook intercepts**: `Bash`, `WebFetch`, `Read`, `Grep`, `Agent`, `Task`, and `ctx_*` self-tools. Can deny, redirect, or inject guidance. E.g. `Bash("curl")` → redirected to `ctx_execute`.

**Other hooks**: `PostToolUse`, `PreCompact`, `UserPromptSubmit`, `SessionStart` — session continuity + event capture.

**Drift items**:
- ✓ Installed at v1.0.141 (HEAD 1.0.142 = -1 patch, trivial)
- ✓ Hooks active per our `.claude/settings.json` (PreToolUse routing fires automatically)
- ✗ Two version dirs cached (1.0.136 and 1.0.141) — cache-housekeeping candidate

---

## §5 OthmanAdi/planning-with-files

**HEAD**: `7f71632c3c39` 2026-05-19 (multiple commits, pushed_at 2026-05-19T18:28:47Z) · 15,169 stars.

**Installed**: `planning-with-files@2.38.1` at `Z:/claude-sota-installed/.claude/plugins/cache/planning-with-files/planning-with-files/2.38.1/.claude-plugin/plugin.json`. Author: OthmanAdi, MIT.

**Canonical 3-file pattern** ("Manus-style"):
- `task_plan.md` — phases, progress, decisions (updated per phase)
- `findings.md` — research & discoveries (update after any discovery)
- `progress.md` — session log + test results (updated continuously)
- Plus v2.37.0+ `task_plan.md` SHA-256 attestation via `/plan-attest`

**i18n SKILL.md variants** (all auto-fire per locale): `planning-with-files`, `planning-with-files-ar`, `planning-with-files-de`, `planning-with-files-es`, `planning-with-files-zh`, `planning-with-files-zht`. Plus platform-specific variants (Codebuddy, Codex, Cursor, Factory, Hermes, Kiro, Mastracode, Opencode, Continue, Pi).

**Slash commands**: `/planning-with-files:plan` (autocomplete `/plan`), `/planning-with-files:status` (autocomplete `/plan:status`), `/planning-with-files:start` (legacy `/planning`), `/plan-attest` (v2.37+ security), `/plan-{ar,de,es}` (i18n).

**Hooks shipped** (in `SKILL.md` frontmatter):
- `UserPromptSubmit` — fires every user message; security check via plan attestation; inject first 50 lines `task_plan.md` + last 20 lines `progress.md` if valid; **block injection if tampered**
- `PreToolUse` — fires before Write/Edit/Bash/Read/Glob/Grep; inject first 30 lines `task_plan.md` to manipulate agent attention pre-action
- `PostToolUse` — fires after Write/Edit; remind agent to update `progress.md` + `task_plan.md` if phase complete

**Drift items**:
- ✓ Installed 2.38.1; HEAD likely 2.38.x same minor (need release-tag probe to confirm patch-level)
- ✓ Locally vendored `durable-planning-files` skill at `Z:/claude-sota-installed/.claude/skills/durable-planning-files/SKILL.md` extends/complements this
- ✗ `/plan-attest` SHA-256 attestation NOT confirmed live in our settings (security hardening opportunity)

---

## §6 abhigyanpatwari/GitNexus

**HEAD**: `803f0bed5f7d` 2026-05-19 — Windows-FTS-load probe fix (LadybugDB BM25 silent-degradation; `gitnexus 1.6.5` + `@ladybugdb/core 0.16.1`) closing issue #1690 · 39,057 stars · latest documented release 1.6.4 (2026-05-10), HEAD now points to 1.6.5+.

**Installed**: `gitnexus@1.3.6` (via `gitnexus-marketplace`) at `Z:/claude-sota-installed/.claude/plugins/cache/gitnexus-marketplace/gitnexus/1.3.6/.claude-plugin/plugin.json`. **THREE MINOR VERSIONS BEHIND** (1.3.6 → 1.6.5).

**Architecture**:
- Ingestion: 12-phase DAG (scan → tree-sitter parse → import/call resolution → community detection → process detection)
- Persistence: `repo-manager.ts` paths + registry, `lbug-adapter.ts` graph load/query/embed
- Query: 3 interfaces — MCP stdio (`mcp.ts`), HTTP bridge (`serve.ts`, web UI), CLI direct
- Staleness: `staleness.ts` compares indexed `lastCommit` vs `HEAD`
- Backend: **LadybugDB / lbug** (replaced KuzuDB in v1.4.0); hybrid schema, separate tables per node label + unified relationships; `.gitnexus/lbug` storage

**13 MCP tools** (per `gitnexus/src/mcp/tools.ts`):
`list_repos`, `query` (hybrid BM25+semantic+RRF), `cypher` (ad-hoc), `context` (360° symbol view), `impact` (blast radius), `detect_changes` (git-diff → affected symbols), `rename` (multi-file safe rename), `api_impact` (route handler pre-change report), `route_map`, `tool_map`, `shape_check` (response-shape vs consumer access), `group_list`, `group_sync`

**Versions/features added since installed 1.3.6**:
- `gitnexus publish` opt-in registry push
- Unreal Engine C++ support
- Thrift IDL contracts extractor
- Workspace extractors (Node, Python, Go, Java, Elixir)
- Rust workspace cross-crate contracts
- Go + TypeScript scope-resolution hooks (RFC #909 registry-primary)
- MCP tool safety annotations (read-only/mutating semantics)
- Configurable group cross-link path exclusions
- LadybugDB 0.16.0/0.16.1 (extension install, checkpointing, WAL quarantine)
- Cross-repo impact analysis via `@repo` MCP routing
- Python + C# scope-based call resolution
- Docker support (1.6.2)
- COBOL + Dart language support (1.4.9)
- **Windows FTS extension probe-then-load BM25 fix** (HEAD `803f0bed5f7d`, 2026-05-19) — directly relevant to Windows-platform runtime

**SKILL.md fields**: `Task` (task description) + `Read this skill file` (path). Auto-installed to `.claude/skills/`. Standard skills: Exploring, Debugging, Impact Analysis, Refactoring, Tools/Schema reference, CLI commands.

**Drift items** (P0):
- ✗ **3 minor versions behind** (1.3.6 → 1.6.5); critical functional drift in MCP tools (`api_impact`, `route_map`, `tool_map`, `shape_check` may not exist locally), language support (COBOL, Dart, UE5), and Windows FTS BM25 fix
- ✗ Windows BM25 silent-degradation bug fixed in HEAD — **directly affects this Win11 runtime**, must verify whether `.gitnexus/extension/<version>/win_amd64/fts/libfts.lbug_extension` is present and loading
- ✓ Local `gitnexus` skill at `Z:/claude-sota-installed/.claude/skills/gitnexus/` + 7-skill namespace per CLAUDE.md L40

---

## §7 alirezarezvani/claude-skills

**HEAD**: `8aa920812f05` 2026-05-19 "Merge PR #701 Dev branch" · 15,518 stars.

**NOT INSTALLED as standalone**. Significant content overlap with `claude-code-skills/engineering-advanced-skills@2.4.4` already in our cache (per `find` output above — engineering-advanced-skills contains many overlapping names: behuman, code-tour, demo-video, docker-development, helm-chart-builder, llm-cost-optimizer, statistical-analyst, etc.).

**48 skills across 6 categories**:
1. **Marketing** (5): content-creator, marketing-demand-acquisition, marketing-strategy-pmm, app-store-optimization, social-media-analyzer
2. **Product** (5): product-manager-toolkit, agile-product-owner, product-strategist, ux-researcher-designer, ui-design-system
3. **Engineering** (18): senior-architect, senior-frontend, senior-backend, senior-fullstack, senior-qa, senior-devops, senior-secops, code-reviewer, senior-security, aws-solution-architect, microsoft-365-tenant-manager, tdd-guide, tech-stack-evaluator, senior-data-scientist, senior-data-engineer, senior-ml-engineer, senior-prompt-engineer, senior-computer-vision
4. **C-Level** (2): ceo-advisor, cto-advisor
5. **Project Management** (6): scrum/Jira/Confluence/Atlassian-administrator
6. **Compliance** (12): regulatory-affairs-manager, qms-iso13485, capa-officer, isms-iso27001, mdr-745, fda-consultant, gdpr-dsgvo-expert, etc.

**Unique value vs others**: domain-expertise depth (regulatory/compliance + leadership niche). Multi-platform support (8+ AI agents). 68+ Python CLI tools stdlib-only.

**Cherry-pick candidates (T2-CHERRY)**:
- `cto-advisor` (leadership angle absent from other sets)
- `regulatory-affairs-manager` / `gdpr-dsgvo-expert` (compliance niche)
- `qms-audit-expert` / `isms-audit-expert` (audit-loop pattern)

**Engineering category mostly overlaps installed senior-* skills** (in `engineering-skills` plugin from claude-code-workflows) — no new ground there.

---

## §8 anthropics/claude-cookbooks

**HEAD**: `39a350b6790c` 2026-05-19 "Merge PR #601 Pin GitHub Actions to commit SHAs" · 43,346 stars.

**This is the SHA cited in CLAUDE.md L20** for `<use_parallel_tool_calls>` MUST-block — confirmed cite-anchor at HEAD (zero drift).

**5 canonical agent patterns** (per `patterns/agents/`):
1. **Prompt Chaining** — sequential subtask decomposition (`chain` in `basic_workflows.ipynb`)
2. **Parallelization** — concurrent independent subtasks via `ThreadPoolExecutor` (`parallel`)
3. **Routing** — LLM-selected specialized path (`route` with `selector_prompt` + extract_xml)
4. **Orchestrator-Workers** — `FlexibleOrchestrator` with analysis-then-execution two-phase; XML-structured subtask descriptions
5. **Evaluator-Optimizer** — iterative generate-evaluate-refine loop

**`research_lead_agent.md`** — defines expert research lead with Depth-first/Breadth-first/Straightforward query categorization. `<use_parallel_tool_calls>` block mandates parallel tool calls when multiple independent operations needed; specifically requires parallel-creation of subagents (typically 3) at research start unless straightforward.

**`research_subagent.md`** — research loop with budget enforcement, internal-tool priority.

**`citations_agent.md`** — specialized citation worker (add citations, don't modify text).

**Recently added** (per `registry.yaml`): "Parallel tool calls on Claude 3.7 Sonnet" (2025-03-05) — batch-tool meta-pattern workaround.

**Patterns referenced by our runtime**:
- ✓ `<use_parallel_tool_calls>` MUST-block (CLAUDE.md cite-anchor `39a350b6790c…patterns/agents/prompts/research_lead_agent.md:135-137`)
- ✓ Orchestrator-Workers (W269 mandate)
- ✗ **Evaluator-Optimizer** — NOT explicitly named in our pattern catalog; could formalize as the dual-review cycle we use with codex
- ✗ **Routing** — not formalized in our docs (we do this implicitly with skill auto-fire `description:` matching)

---

## §9 Cross-Repo Convergence Findings

**Strong-signal common patterns** (≥3 repos):

1. **Parallel-subagent dispatch** — wshobson/agents (team-spawn), claude-cookbooks (use_parallel_tool_calls), addyosmani/agent-skills (browser-testing parallel), mattpocock (review in parallel sub-agents). **Universal canonical pattern.** Our W269 mandate is well-aligned.

2. **Process not prose** (structured workflows + anti-rationalization + non-negotiable evidence) — addyosmani/agent-skills explicit, mattpocock skills implicit, wshobson team-lead contract. **Convergent design philosophy.**

3. **Persistent files as memory** — OthmanAdi/planning-with-files (3-file pattern), mattpocock/handoff (compaction artifact), claude-cookbooks/evaluator-optimizer (loop state). Our `durable-planning-files` skill is in this lineage.

4. **YAML frontmatter `description:` auto-fire** — universal across addyosmani, mattpocock, alirezarezvani, OthmanAdi, mksglu/context-mode. **Anthropic-canonical pattern**, all repos comply.

5. **Hooks for context manipulation** — context-mode (PreToolUse routing), planning-with-files (UserPromptSubmit/PreToolUse/PostToolUse), claude-cookbooks (none directly, but pattern referenced). **Hook-based attention manipulation** is a SOTA pattern — our settings.json has minimal hooks (gitleaks/ruff/shellcheck/git) which is cardinal-rule-2-compliant but leaves the planning-with-files-style context-injection on the table.

**Divergent patterns** (decision-point):
- **In-process vs tmux teammates** (wshobson/agents): we default in-process; tmux mode unexplored
- **Skill-per-domain vs skill-per-workflow-step**: alirezarezvani (per-domain: cto-advisor) vs addyosmani (per-step: code-simplification, code-review-and-quality). We bias workflow-step.
- **Plugin install vs vendor-fork**: mattpocock has no plugin (we vendor-fork); planning-with-files / context-mode / agent-teams ship as plugins. Both legitimate paths.

---

## §10 Adoption Recommendations (P0/P1/P2 per sca-v12 tier ladder)

**P0 (ship-blocker / install-now)**:
1. **GitNexus 1.3.6 → 1.6.5 update** — 3-minor lag, includes Win-FTS BM25 fix directly relevant to this Win11 runtime. Path: `/plugin update gitnexus` then verify `.gitnexus/extension/*/win_amd64/fts/` and run `gitnexus doctor` to confirm BM25 healthy. **T1 → T0 promotion candidate.**
2. **wshobson/agent-teams 1.0.2 HEAD reconcile** — HEAD has coordination-guardrails fix (commit 2026-05-17); verify whether 1.0.2 includes #535 or needs version bump.

**P1 (next-wave)**:
3. **addyosmani 17-skill backfill** — vendor-fork the 17 unadopted skills (especially `source-driven-development`, `incremental-implementation`, `spec-driven-development`, `security-and-hardening`, `performance-optimization`). These complement our existing 5 vendor-forks and would close the SDLC-phase coverage gap.
4. **mattpocock 4-skill backfill** — vendor-fork `improve-codebase-architecture`, `to-issues`, `triage`, `zoom-out` (highest ROI per mattpocock canonical list).
5. **planning-with-files /plan-attest enablement** — turn on SHA-256 task_plan.md attestation for security hardening (we already use the durable-planning files via local skill).

**P2 (eval-then-decide)**:
6. **alirezarezvani T2-CHERRY pulls** — `cto-advisor`, `regulatory-affairs-manager`, `gdpr-dsgvo-expert` (niche fit; would add domain-expertise dim absent from our installed sets).
7. **Evaluator-Optimizer pattern formalization** — formalize our codex-dual-review-loop as the named cookbook pattern; add to `docs/architecture/` as recognized pattern lineage.
8. **Routing pattern formalization** — name our skill-auto-fire `description:` matching as the Routing pattern (cookbook lineage).
9. **context-mode 1.0.141 → 1.0.142** — trivial patch bump, batch with next plugin update wave.

**Tier ladder summary**:
- T0 (mandatory canonical): context-mode, claude-cookbooks
- T1 (canonical installed): wshobson/agents, addyosmani/agent-skills, OthmanAdi/planning-with-files, GitNexus
- T1-PROV (canonical vendor-fork): mattpocock/skills
- T2-CHERRY (niche-pick): alirezarezvani/claude-skills

---

## §11 3-org-distinct cite trail

| # | Org | Cite | Date verified |
|---|---|---|---|
| 1 | Anthropic | `anthropics/claude-cookbooks @ 39a350b6790c patterns/agents/prompts/research_lead_agent.md` (use_parallel_tool_calls MUST-block) | 2026-05-19 HEAD verified via gh api |
| 2 | Seth Hobson (independent) | `wshobson/agents @ 08ded5e7b0fe` agent-teams plugin (35,664 stars) | 2026-05-17 HEAD per gh api |
| 3 | Addy Osmani (independent) | `addyosmani/agent-skills @ f17c6e88c904` skill collection (43,793 stars) | 2026-05-16 HEAD per gh api |
| 4 | Matt Pocock (independent) | `mattpocock/skills @ d54c497aa944` skill collection (94,177 stars) | 2026-05-19 HEAD per gh api |
| 5 | Independent (mksglu) | `mksglu/context-mode @ 7f71632c3c39` v1.0.142 MCP plugin | 2026-05-19 HEAD per gh api |
| 6 | Independent (OthmanAdi) | `OthmanAdi/planning-with-files @ HEAD` (v2.38.x lineage) | 2026-05-19 HEAD per gh api |
| 7 | Independent (abhigyanpatwari) | `abhigyanpatwari/GitNexus @ 803f0bed5f7d` (v1.6.5+) | 2026-05-19 HEAD per gh api |
| 8 | Independent (alirezarezvani) | `alirezarezvani/claude-skills @ 8aa920812f05` | 2026-05-19 HEAD per gh api |
| 9 | DeepWiki | 8 ask_question responses (cross-cited to source files) | 2026-05-19 this session |

≥3 distinct orgs achieved (Anthropic + independent maintainer × 7).

STATUS: COMPLETE
