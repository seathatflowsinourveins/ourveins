# AGENTS.md — claude-sota-installed (eee runtime)

> Cross-agent contract for the eee SOTA Claude Code runtime. Per the
> [agents.md/](https://agents.md) standard (60k+ open-source projects). This file
> is the canonical surface for **Codex CLI / Cursor / Gemini CLI / Antigravity /
> Aider / Kilo Code / Cline / GitHub Copilot CLI** consuming this repo. Claude Code
> reads `CLAUDE.md` (cardinal rules) which is authoritative for Claude-Code-only
> discipline; this file is the cross-tool intersection.
>
> **Closest-AGENTS.md-wins precedence** per agents.md/ spec — sub-trees may override.

## Project overview

`claude-sota-installed` is a Z:-portable, install-only canonical SOTA Claude Code
runtime. **Bootstrap-only files are hand-coded** (CLAUDE.md / CLAUDE.local.md /
tools/eee.ps1 / bin/eee.cmd / .claude/settings.json minimum baseline / .gitignore +
the docs/ install-discipline files); **all other primitives MUST come from upstream
SOTA installs** per cardinal-rule-5 (plugins, MCPs, hooks, skills, agents).

- **Launcher**: `eee` (PowerShell entrypoint at `tools/eee.ps1`, cmd shim at
  `bin/eee.cmd`)
- **Workspace root**: `Z:\claude-sota-installed\`
- **Sibling SOTA-evolving runtime**: `Z:\claude-sota\` (cite-import-AMBER for sister
  rules; NOT install source)
- **Dependency cite-anchors**: `Z:\repos\deps\<repo>\file:line @ HEAD <SHA>`
  (immutable cite-class only — NOT install source per cardinal-rule-6)
- **State outside repo**: `Z:\claude-sota-installed-state\` (CODEX_HOME + session
  JSONL + secrets)

## Roles (per cross-agent contract)

| Role | Responsibilities |
|---|---|
| **Claude Code** (Opus 4.7 1M-context) | Primary orchestrator + editor + tester + worktree operator. T1-T7 lifecycle gatekeeper |
| **Codex CLI** (GPT-5.5 deep-review-exec) | Independent reviewer + adversarial challenger + CI rescue + alternative-hypothesis generator. NEVER permission-boundary replacement |
| **Opus-class subagents** | Architecture / security review / deep debugging / harness design / long-horizon research |
| **Sonnet-class workers** | Implementation / test writing / routine refactors / read-only Explore probes |
| **Haiku-class** | Summarization / classification / inline-judge passes |

## Build and run

```powershell
# Launch eee (Claude Code with Z:-portable env block)
eee
# OR explicit: tools/eee.ps1

# CPA fleet status (10-account CLIProxyAPI at port 8317)
curl -H "Authorization: Bearer $(cat Z:/claude-sota-installed-state/cliproxy-mgmt-secret.txt)" `
  http://127.0.0.1:8317/v0/management/auth-files

# Token efficiency layer (RTK 0.39.0 + cnighswonger session-affinity-prefix-cache)
rtk gain          # token savings dashboard
rtk cc-economics  # spending vs savings analysis
ccusage daily     # API spending
```

## Testing instructions

- **Cross-model gate (cardinal-rule-3)**: every architectural commit on a design
  surface MUST pass codex T1 pre-edit consult OR T2 commit-time hook gate.
  Foreground+tee path: `codex exec --ephemeral -p deep-review-exec --color never <
  .claude/state/codex_consult_<topic>.txt > .claude/state/codex_consult_<topic>_OUT.txt 2>&1`
- **Pattern A fix-forward** (per `Z:\claude-sota\.claude\rules\codex-t1-fix-forward-pattern.md`):
  on NEEDS-REVISION conf 0.88-0.93 with ≤10 prescriptions, apply ALL in single
  atomic commit (no iter-N→N.1 loops)
- **Pattern B HONEST-NON-FINDING**: T1 timeout-without-JSON-verdict → trace-mine for
  embedded evidence + ship as-designed + T2/T3 verify on commit/post-commit
- **Mia pre-apply** (per `mia-pre-apply.md`): every prescription with `prescribed_edits`
  / specific file:line claims gets cheap-probe verification BEFORE Edit (n=48
  cumulative OVER catches Wave 97-118)
- **No new tests required for descriptive doc edits** — runtime probe (`Read +
  Grep`) is verification

## Code style guidelines

- **No comments unless WHY is non-obvious** (CLAUDE.md hard rule)
- **No speculative helpers / abstractions** (kiss-dry-yagni)
- **Three similar lines is better than premature abstraction** — defer DRY until
  ≥3 actual call sites
- **Cite SOTA primary at file:line + HEAD SHA** for every architectural claim
  (cardinal-rule-1)
- **Evidence markers** required on volatile claims: `[VERIFIED]` / `[INFERRED]` /
  `[UNKNOWN]` / `[MEASURED]` / `[REFUTED]` per `evidence-policy.md`

## Security considerations (cardinal hard-rules)

- **NEVER commit secrets** — `.cli-proxy-api/` / `*.env` / `*.pem` / `*.key` /
  `secrets/**` are gitignored and `.claude/settings.json:permissions.deny[]` blocks
  reads
- **`safety_guard.py`** PreToolUse:Bash hook blocks 12 destructive patterns
  (`rm -rf` / `git push --force` / `git reset --hard` / SQL DROP / `chmod 777` /
  `mkfs` / `dd` / fork bomb / etc.)
- **`agent_plan_readonly_bash_guard.py`** restricts subagent Bash to readonly when
  `permissionMode: plan` — operator path retains full Bash via main session
- **`gitleaks_pre_commit_gate.py`** blocks `git commit`/`git push` if secrets
  detected
- **`codex_t2_pre_commit_gate.py`** cross-model gate on every commit
- **NEVER use `--no-verify`** to bypass hooks (canonical Must-Never #3); fix the
  hook OR the underlying issue

## PR / commit instructions

- **Conventional commits**: `feat(scope)` / `fix(scope)` / `docs(scope)` / `chore` /
  `refactor` / `test` / `perf`
- **Wave-N attribution**: include `Wave <N> Ship <ID>` in subject; commit body
  includes CR-1..CR-12 conformance + Mia OVER catches + cross-model T1 verdict
  pointer
- **Atomic single-shell commits** per `audit-action-loop.md` step 4 + `git-cli-grammar-discipline.md`:
  `git add -- <file> && git commit -o -F msg.txt -- <file>`
- **One logical unit per commit** per cycle-300 ONE-LOGICAL-UNIT-PER-FIRE
- **No PR title format constraint** — solo eee runtime

## Done criteria (cross-agent handoff contract)

A change ships clean when ALL hold:

- ✅ Diff is minimal and scoped to the user's request
- ✅ Quality gates pass OR failures are documented in commit body
- ✅ Codex review findings are triaged (APPROVE / NEEDS-REVISION applied / Pattern B
  HNF documented)
- ✅ No new secrets, unsafe permissions, unbounded MCPs, or hidden memory writes
- ✅ Handoff includes: goal, files touched, commands run, test results, unresolved
  risks, next actions
- ✅ Mia pre-apply probe passed on every prescription before Edit
- ✅ TIER-1-DIRECT cite trail per cardinal-rule-1

## Architecture pointers (where to look)

- **Cardinal rules**: `CLAUDE.md` — 12 cardinal rules (CR-1 cite SOTA primary
  through CR-12 upstream-install-priority)
- **Personal env**: `CLAUDE.local.md` — Z:-portable env block (per-machine,
  gitignored)
- **Sister rule layer**: `Z:\claude-sota\.claude\rules\` — 37 sister rules
  cite-imported AMBER per CLAUDE.md Section 14.5 (sibling-novel discipline that has
  no upstream parity)
- **Install discipline**: `docs/install-from-github-discipline.md` — the
  "pull-from-newest-via-official-native-channel" rule that gates every install
- **Install manifest**: `docs/sota-installed-manifest.md` — single source of truth
  for what's installed + why
- **Install provenance**: `docs/install-provenance.md` — append-only install log
  with timestamps + commands + HEAD SHAs + outcomes
- **Latest architecture audit**: `docs/wave118-architecture-audit-2026-05-09.md` —
  comprehensive eee status (~85% SOTA per v65 standards; gap matrix; Wave 119+
  ranked ship sequence)

## Key primitives reference

- **CLI proxy fleet**: CLIProxyAPI v6.10.9 at port 8317, 10-account fleet (3 active
  claude P30 round-robin equalized + 4 disabled cycle-rotation + 1 codex Pro + 1
  antigravity + 1 gemini)
- **MCPs**: 10 active — context7 / deepwiki / github / gitnexus / graphiti / memory
  (mcp-memory-service v10.51.3 sqlite_vec) / phoenix / playwright / repomix / serena
- **Plugins**: 21 enabled across 11 marketplaces — superpowers / openai-codex /
  everything-claude-code / context-mode / addy-agent-skills / claude-plugins-official
  (multi) / + others. 22 repo-local `.claude/skills/**/SKILL.md` files observed
  2026-05-14; marketplace/global skill catalogs are separate inventory surfaces.
- **Agents**: 11 top-level files in `.claude/agents/` / 13 recursive agent markdown
  files observed 2026-05-14.
- **Slash commands**: `/codex:review`, `/codex:adversarial-review`, `/codex:rescue`,
  `/codex:status`, `/codex:result`, `/codex:cancel` from `codex@openai-codex@1.0.4`,
  plus `/recall` (Wave 113) / `/harvest` (Wave 115) / `/mistake-search` (Wave 116) /
  `/mistake-add` (Wave 117). 4 recursive `.claude/commands` files observed
  2026-05-14. Use `/codex:rescue --background <task>` for long build-error investigation
  and `/codex:rescue --wait <task>` for bounded foreground fixes.
- **Spec-Kit** (W152-F18 install at `3f5ef38`, AXIS-C complex system building) — spec-driven
  research→plan→implement→review→ship workflow chain. **Claude-Code-only slash commands**
  (installed via `specify init --integration claude`): `/speckit-constitution` (project
  principles) → `/speckit-specify` (baseline spec) → `/speckit-plan` (impl plan) →
  `/speckit-tasks` (actionable tasks) → `/speckit-implement` (execute); enhancement skills
  `/speckit-clarify` / `/speckit-analyze` / `/speckit-checklist` / `/speckit-taskstoissues`.
  **Tool-agnostic fallback for non-Claude consumers** (Codex CLI / Cursor / Gemini CLI /
  Antigravity / Aider / Kilo / Cline / Copilot CLI): operate directly on `.specify/`
  filesystem artifacts — read `.specify/memory/constitution.md` (principles), edit
  `.specify/templates/{constitution,spec,plan,tasks,checklist}-template.md` (templates),
  consult `.specify/workflows/workflow-registry.json` (workflow definitions). Re-run
  `specify init --here --integration <agent>` to install agent-native commands; documented
  `--integration` targets per spec-kit v0.8.7 examples: `claude` / `codex` / `copilot` /
  `cursor-agent` / `codebuddy` / `gemini` / `vibe` / `generic` (full list: `specify init --help`).
  Note `--integration` (new system) and `--ai` are mutually exclusive — prefer `--integration`.
  Source: github/spec-kit v0.8.7.
- **Hooks**: 36 top-level `.claude/hooks/scripts` files and 58 wired hook handlers
  in `.claude/settings.json` observed 2026-05-14, including PreToolUse safety,
  gitleaks, codex T2, and **rtk hook claude** (Wave 118 — 80% token-efficiency
  rewrite layer).
- **Token-efficiency layer**: ccusage 18.0.11 + RTK 0.39.0 + Serena 1.2.0 +
  Repomix 1.14.0 (v65 default install core 12/12 verified)
- **Structural code search/rewrite**: `ast-grep` 0.42.0 (npm-global @ast-grep/cli
  @ HEAD `4c35a206`; verified `ast-grep --version`). Use for AST-pattern matching
  and structural rewrite across 13+ languages (TS/JS/Python/Rust/Go/Java/C++/Ruby/
  PHP/Swift/Kotlin/etc). Subcommands: `run` (one-time search/rewrite) / `scan`
  (config-driven rule scan) / `test` (rule tests) / `new` (project scaffolding) /
  `lsp` (language server). Pattern syntax: `$VAR` wildcards (e.g. `def $NAME($$$)`
  matches any Python function). **Probe 4 verdict: COMPLEMENTARY** to serena
  (LSP-semantic-graph) + repomix (codebase compression) — different concern
  (structural-pattern-rewrite layer). NO upstream MCP server (CLI-only); invoke via
  Bash. Recommended use: structural code patterns where regex is brittle (e.g.,
  "find all `console.log(...)` calls but not in test files", "rewrite async/await
  patterns"). Cite: `https://ast-grep.github.io/` + `Z:/repos/deps/ast-grep @ HEAD
  4c35a206 [VERIFIED 2026-05-09]`
- **Phase**: Operationally Phase 3 (`defaultMode: bypassPermissions`) per cardinal-
  rule-7 graduated-unleash; safety floor mechanically enforced via PreToolUse hooks

## Cite trail

- agents.md standard: https://agents.md/ (60k+ projects; root/nested precedence + recommended sections)
- openai/codex AGENTS.md: `Z:/repos/deps/codex/AGENTS.md:1-56,103-123 @ HEAD 993e3f407ea8213f7d32cb9367ae7616b7e15b4a` (TIER-1 OFFICIAL openai example)
- CCBP claude-subagents: `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-subagents.md:17-36,40-48 @ HEAD 48f2cebeb88b389b27231c418ceadb65baf813fd`
- Anthropic CC docs: https://code.claude.com/docs/en/settings, https://code.claude.com/docs/en/sub-agents, https://code.claude.com/docs/en/hooks, https://code.claude.com/docs/en/permission-modes
- Local adaptation source: `Z:/temp_v65/claude_code_sota_v65_ultimate_comprehensive_execution_md_kit/AGENTS.md` (local composition input, not TIER-1 authority)

<!-- gitnexus:start -->
# GitNexus — Code Intelligence

This project is indexed by GitNexus as **claude-sota-installed** (6008 symbols, 6396 relationships, 27 execution flows). Use the GitNexus MCP tools to understand code, assess impact, and navigate safely.

> If any GitNexus tool warns the index is stale, run `npx gitnexus analyze` in terminal first.

## Always Do

- **MUST run impact analysis before editing any symbol.** Before modifying a function, class, or method, run `gitnexus_impact({target: "symbolName", direction: "upstream"})` and report the blast radius (direct callers, affected processes, risk level) to the user.
- **MUST run `gitnexus_detect_changes()` before committing** to verify your changes only affect expected symbols and execution flows.
- **MUST warn the user** if impact analysis returns HIGH or CRITICAL risk before proceeding with edits.
- When exploring unfamiliar code, use `gitnexus_query({query: "concept"})` to find execution flows instead of grepping. It returns process-grouped results ranked by relevance.
- When you need full context on a specific symbol — callers, callees, which execution flows it participates in — use `gitnexus_context({name: "symbolName"})`.

## Never Do

- NEVER edit a function, class, or method without first running `gitnexus_impact` on it.
- NEVER ignore HIGH or CRITICAL risk warnings from impact analysis.
- NEVER rename symbols with find-and-replace — use `gitnexus_rename` which understands the call graph.
- NEVER commit changes without running `gitnexus_detect_changes()` to check affected scope.

## Resources

| Resource | Use for |
|----------|---------|
| `gitnexus://repo/claude-sota-installed/context` | Codebase overview, check index freshness |
| `gitnexus://repo/claude-sota-installed/clusters` | All functional areas |
| `gitnexus://repo/claude-sota-installed/processes` | All execution flows |
| `gitnexus://repo/claude-sota-installed/process/{name}` | Step-by-step execution trace |

## CLI

| Task | Read this skill file |
|------|---------------------|
| Understand architecture / "How does X work?" | `.claude/skills/gitnexus/gitnexus-exploring/SKILL.md` |
| Blast radius / "What breaks if I change X?" | `.claude/skills/gitnexus/gitnexus-impact-analysis/SKILL.md` |
| Trace bugs / "Why is X failing?" | `.claude/skills/gitnexus/gitnexus-debugging/SKILL.md` |
| Rename / extract / split / refactor | `.claude/skills/gitnexus/gitnexus-refactoring/SKILL.md` |
| Tools, resources, schema reference | `.claude/skills/gitnexus/gitnexus-guide/SKILL.md` |
| Index, status, clean, wiki CLI commands | `.claude/skills/gitnexus/gitnexus-cli/SKILL.md` |

<!-- gitnexus:end -->
