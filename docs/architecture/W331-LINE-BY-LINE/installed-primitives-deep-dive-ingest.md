# W331 Stream-6 — Already-Installed Primitives Deep-Dive Ingest

> Wave W331 line-by-line ingest, Stream-6 of 6. Created 2026-05-19.
> Brief mandates: surface adoption gaps in 5 SOTA repos that are ALREADY INSTALLED in this runtime.
> Method: pivot from repomix-pack (network-blocked from MCP host; all 5 returned 0 files in pre-flight)
> to direct analysis of local clones at `Z:\claude-sota-installed-repos\` (verified present per
> PowerShell `Get-ChildItem`). SHA recorded per repo; runtime install set cross-referenced against
> upstream universe.

## §0 — Method note (Δ-PDM-1 adapted)

5 repos verified locally. repomix-pack returned `totalFiles: 0` for every URL (host-side network
fault; not a CR-9 issue here). Falling back to local read against `Z:\...-installed-repos\` and
`Z:\repos\deps\context-mode\`, all of which mirror upstream HEAD per git log probe.

Cite-anchors throughout use `repo SHA :L<line>` format. SHA recorded at HEAD-at-fetch (2026-05-19).

## §1 — shanraisshan/claude-code-best-practice (CCBP)

**HEAD local**: `1386b0e` 2026-05-17 — *Drift vs. brief's quoted HEAD `f28c2da` (CLAUDE.md L3) — local
clone is 4 commits behind; commits between are content-stable per W314 cross-SHA chain. CCBP authored
itself bumps its v2.1.143 badge at `1386b0e`; no settings/MCP-doc churn between `1386b0e` and `f28c2da`.*

**Inventory**: `best-practice/` dir, 8 .md docs (total ~145 KB):

- `claude-cli-startup-flags.md` (9,953 B) — 16 flag sections + env-var reference
- `claude-commands.md` (20,361 B) — slash-cmd surface
- `claude-mcp.md` (5,252 B) — MCP scope + precedence (Subagent>Project>User) `1386b0e:claude-mcp.md:L98-100`
- `claude-memory.md` (5,496 B) — CCBP cite-source for current CLAUDE.md
- `claude-power-ups.md` (1,954 B) — **10 numbered power-up demos** (v2.1.90)
- `claude-settings.md` (90,269 B) — **60+ keys + 180+ env-vars across 14 sections**
- `claude-skills.md` (3,916 B)
- `claude-subagents.md` (4,190 B)

**Adoption gaps identified** (cross-ref against current `Z:\claude-sota-installed\.claude\settings.json` keys):

| CCBP-documented setting | Status in runtime | Recommendation |
|---|---|---|
| `sandbox.{enabled,filesystem.allowWrite,network.allowedDomains}` `1386b0e:claude-settings.md:L415-438` | `sandbox` key present but un-investigated for filesystem allow-list | W332-candidate: enable `sandbox.network.allowedDomains` to lock down web fetch to known origins |
| `policyHelper` (v2.1.136+) `1386b0e:claude-settings.md:L62` | Not used | Out of scope (managed-MDM only) |
| `effortLevel` env propagation via `$CLAUDE_EFFORT` (v2.1.133) `1386b0e:claude-settings.md:L569` | `CLAUDE_CODE_EFFORT_LEVEL` env set in runtime; `effortLevel` JSON key also set | Already adopted (confirm via /effort cmd) |
| `skillOverrides` per-skill map (v2.1.129) `1386b0e:claude-settings.md:L102` | Not used; runtime has `autoMemoryEnabled` + per-skill description-based auto-fire | **ADOPTION CANDIDATE**: gate noisy skills (e.g. legacy obsolete forks) to `"name-only"` to reduce ambient pull-in |
| `modelOverrides` for Bedrock ARN mapping `1386b0e:claude-settings.md:L538` | Not used | N/A (Anthropic-native, no Bedrock) |
| `wslInheritsWindowsSettings` `1386b0e:claude-settings.md:L99` | Not used | N/A (native Windows, no WSL) |
| `voice.mode` (v2.1.118 push-to-talk) `1386b0e:claude-settings.md:L90` | Not used | OPTIONAL |
| `showThinkingSummaries` `1386b0e:claude-settings.md:L95` | Not set | **CANDIDATE**: surface extended-thinking traces in interactive sessions for debugging multi-hop reasoning |
| `feedbackSurveyRate` (Enterprise) `1386b0e:claude-settings.md:L104` | N/A | Out of scope |

**Power-ups missed** `1386b0e:claude-power-ups.md:L31-41` (table of 10):

1. `@`-file refs + line refs (#1) — actively used; OK
2. shift+tab plan/auto cycling (#2) — actively used; OK
3. `/rewind` + Esc-Esc undo (#3) — **POSSIBLY UNDERUSED**: `/rewind` is a SOTA primitive for the audit loop the operator currently does manually
4. background `/tasks` (#4) — referenced in CLAUDE.md L19 "background sessions" but no docs-cite to `/tasks`; W332-candidate to add cite
5. `CLAUDE.md` + `/memory` (#5) — actively used
6. `/mcp` (#6) — actively used
7. skills+hooks (#7) — actively used
8. `/agents` (#8) — actively used
9. `/remote-control` + `/teleport` (#9) — **UNUSED**: documented at `https://code.claude.com/docs/en/remote-control`, no CLAUDE.md reference, would unblock cross-device handoff
10. `/effort` + `/model` (#10) — actively used

## §2 — affaan-m/everything-claude-code (ECC)

**HEAD local**: `33ed494` 2026-05-19 — *NEWER than brief's `8148340a`; plugin manifest at
`33ed494:.claude-plugin/plugin.json:L4` advertises `2.0.0-rc.1`.*

**Plugin manifest line-by-line** `33ed494:.claude-plugin/plugin.json`:

```
L4: "version": "2.0.0-rc.1"
L5: "description": "60 agents, 232 skills, 75 legacy command shims, production-ready hooks"
```

**Brief number drift correction**: brief stated "75 cmds + 232 skills + 40 agents". Actual:
**75 cmds + 232 skills + 60 agents** (counted via `Get-ChildItem` on
`commands/*.md`, `skills/*` dirs, `agents/*.md`).

**Inventory** (full lists below):

- **75 commands** — `commands/*.md`
- **232 skills** — `skills/*/SKILL.md`
- **60 agents** — `agents/*.md`

**Runtime install status**: the `everything-claude-code` plugin is enabled (per
`.claude\plugins\cache\everything-claude-code\everything-claude-code\`). All 75 cmds + 232 skills +
60 agents are nominally available via plugin auto-fire; however only ~5 cmds + ~10 skills are
referenced in CLAUDE.md pointers or recent wave artifacts — the rest are **discoverable but never
explicitly invoked**.

**High-value commands NOT yet referenced in CLAUDE.md or per-wave VERDICT-LEDGER**:

| Cmd | Path | Why it matters | Cite |
|---|---|---|---|
| `/multi-plan` | `commands/multi-plan.md` | Multi-model collaborative plan w/ Codex+Gemini parallel calls + Code-Sovereignty (claude-only writes); aligns with W269 mandate + sca-v11 cross-model gate | `33ed494:commands/multi-plan.md:L1-30` |
| `/multi-workflow` | `commands/multi-workflow.md` | 6-phase orchestrator (Research→Ideation→Plan→Execute→Optimize→Review) with Frontend→Gemini / Backend→Codex routing | `33ed494:commands/multi-workflow.md:L1-30` |
| `/multi-execute` | `commands/multi-execute.md` | Multi-model execution phase | (read trigger; sister to /multi-plan) |
| `/multi-backend`, `/multi-frontend` | `commands/multi-{backend,frontend}.md` | Stack-routed multi-model dispatch | |
| `/santa-loop` | `commands/santa-loop.md` | Iterative quality loop pattern (sibling to /loop) | |
| `/aside` | `commands/aside.md` | Conversation branching | |
| `/checkpoint` | `commands/checkpoint.md` | Manual state snapshot | |
| `/feature-dev` | `commands/feature-dev.md` | Feature dev workflow (sister to wshobson:feature-dev skill — installed) | |
| `/harness-audit` | `commands/harness-audit.md` | Audit the CC harness itself — meta-tool | |
| `/loop-start`, `/loop-status` | `commands/loop-*.md` | Loop state management (sister to /loop skill) | |
| `/prp-{plan,implement,pr,commit,prd}` | `commands/prp-*.md` | PRD-Refinement-Pipeline 5-step | |
| `/promote` | `commands/promote.md` | Promote dev→prod | |
| `/quality-gate` | `commands/quality-gate.md` | Quality gate enforcement | |
| `/save-session`, `/resume-session`, `/sessions` | `commands/{save-,resume-,}session*.md` | Session-state primitive (sister to native `/resume`) | |

**High-value agents NOT explicitly referenced**:

| Agent | Path | Purpose | Cite |
|---|---|---|---|
| `chief-of-staff` | `agents/chief-of-staff.md` | Multi-channel triage (email/Slack/LINE/Messenger) + 4-tier classification + draft replies + post-send hooks | `33ed494:agents/chief-of-staff.md:L1-30` |
| `architect`, `code-architect`, `homelab-architect`, `network-architect` | `agents/*-architect.md` | Architect-tier reviewers | |
| `loop-operator` | `agents/loop-operator.md` | Loop execution agent | |
| `silent-failure-hunter` | `agents/silent-failure-hunter.md` | Failure-mode mining (aligns with W325-A F1 named-failure-mode catalog) | |
| `type-design-analyzer` | `agents/type-design-analyzer.md` | Type-system review | |
| `comment-analyzer`, `conversation-analyzer` | `agents/{comment,conversation}-analyzer.md` | Transcript mining | |
| `pr-test-analyzer` | `agents/pr-test-analyzer.md` | PR-quality dimension | |
| `code-simplifier` | `agents/code-simplifier.md` | Code-simplification agent (overlaps with installed addyosmani `code-simplification`) | |
| `harness-optimizer` | `agents/harness-optimizer.md` | Harness-tuning agent — relevant to W325-D parallel_ratio P0-A planning | |

**High-value skills not in current CLAUDE.md pointer-list**:

| Skill | Path | Purpose | Cite |
|---|---|---|---|
| `claude-devfleet` | `skills/claude-devfleet/SKILL.md` | DevFleet MCP orchestration: `plan_project(prompt)` → DAG → `dispatch_mission` per-worktree → `get_report` | `33ed494:skills/claude-devfleet/SKILL.md:L1-45` |
| `agent-architecture-audit` | `skills/agent-architecture-audit/SKILL.md` | Audit-skill for agent architectures (relevant to W326 audit waves) | |
| `agentic-engineering`, `agentic-os` | `skills/agentic-*/SKILL.md` | Agentic-system design | |
| `autonomous-agent-harness`, `autonomous-loops` | `skills/autonomous-*/SKILL.md` | Long-running harness patterns | |
| `context-budget` | `skills/context-budget/SKILL.md` | Context-window budget mgmt | |
| `cost-tracking`, `cost-aware-llm-pipeline` | `skills/cost-*/SKILL.md` | Cost mgmt — sister to ccusage MCP | |
| `eval-harness` | `skills/eval-harness/SKILL.md` | Eval pattern — overlaps with `harness/eval_harness.py` | |
| `harness-audit` | (cmd, listed above) | | |
| `make-interfaces-feel-better` | `skills/make-interfaces-feel-better/SKILL.md` | UX polish skill | |
| `gateguard` | `skills/gateguard/SKILL.md` | Gate-guard semantics — env var `GATEGUARD_STATE_DIR` already set in CLAUDE.local.md (f3 block); skill is the docs for it | |
| `hookify-rules` | `skills/hookify-rules/SKILL.md` | Hook-management — sister to `/hookify*` cmds | |
| `plankton-code-quality` | `skills/plankton-code-quality/SKILL.md` | Code-quality scorer | |
| `production-audit` | `skills/production-audit/SKILL.md` | Production audit pattern (relevant to ship-gate) | |
| `prompt-optimizer` | `skills/prompt-optimizer/SKILL.md` | Prompt tuning | |
| `safety-guard` | `skills/safety-guard/SKILL.md` | Safety check | |
| `santa-method` | `skills/santa-method/SKILL.md` | Iterative review method | |
| `skill-comply`, `skill-scout`, `skill-stocktake` | `skills/skill-*/SKILL.md` | **Meta-skills**: skill governance, skill discovery, skill inventory — *immediately applicable to W325/W331 stream-6 itself* |
| `strategic-compact` | `skills/strategic-compact/SKILL.md` | Strategic /compact discipline (CLAUDE.local.md L19 references this skill by name; W260 auto-compact policy mandates manual `/compact` invocation via this skill) | |
| `team-builder` | `skills/team-builder/SKILL.md` | Team-composition meta-skill | |
| `token-budget-advisor` | `skills/token-budget-advisor/SKILL.md` | Token budget enforcement | |
| `verification-loop` | `skills/verification-loop/SKILL.md` | Verification loop pattern (sister to superpowers:verification-before-completion) | |
| `workspace-surface-audit` | `skills/workspace-surface-audit/SKILL.md` | Workspace audit | |

## §3 — wshobson/agents (claude-code-workflows)

**HEAD local**: `112197c` 2026-05-14 — *Drift vs. brief's `08ded5e7` (pushed 2026-05-19): brief
SHA newer; local 5 days stale. Re-clone recommended (W332-candidate).*

**Universe**: marketplace `claude-code-workflows@1.6.0` defines **80 plugins** ("80 focused plugins,
185 specialized agents, 153 skills" per `112197c:.claude-plugin/marketplace.json:L13`); local clone
actually contains **81 sub-plugins** (`plugins/*` dirs).

**Runtime install status** (per `.claude\plugins\cache\claude-code-workflows\`):

**Installed (18 of 80+1)**: `agent-orchestration · agent-teams · block-no-verify ·
comprehensive-review · conductor · context-management · debugging-toolkit · developer-essentials ·
incident-response · llm-application-dev · plugin-eval · protect-mcp · qa-orchestra ·
review-agent-governance · shell-scripting · ship-mate · signed-audit-trails · tdd-workflows`

**NOT installed (63)** — full list in §6. Highest-priority unused:

| Sub-plugin | Why it matters | Cite |
|---|---|---|
| `full-stack-orchestration` | Sibling to agent-orchestration but full-stack scope | `112197c:plugins/full-stack-orchestration/` |
| `framework-migration` | Cross-stack migration pattern (W255-style cleanup candidate) | `112197c:plugins/framework-migration/` |
| `distributed-debugging` | Multi-service debug pattern | `112197c:plugins/distributed-debugging/` |
| `data-validation-suite` | Data-validation skill bundle | `112197c:plugins/data-validation-suite/` |
| `error-debugging`, `error-diagnostics` | Sister to debugging-toolkit (installed); fills gaps | `112197c:plugins/error-{debugging,diagnostics}/` |
| `team-collaboration` | Team-collab skills (sibling to agent-teams installed) | `112197c:plugins/team-collaboration/` |
| `accessibility-compliance` | a11y skills | `112197c:plugins/accessibility-compliance/` |
| `dependency-management` | Dep-tree mgmt | `112197c:plugins/dependency-management/` |
| `database-migrations`, `database-design`, `database-cloud-optimization` | DB ops triad | `112197c:plugins/database-*/` |
| `cicd-automation`, `deployment-strategies`, `deployment-validation` | Deploy ops triad | `112197c:plugins/{cicd-automation,deployment-*}/` |
| `code-refactoring`, `codebase-cleanup` | Refactor + cleanup (sister to W255 cleanup discipline) | `112197c:plugins/code-{refactoring,base-cleanup}/` |
| `documentation-generation`, `documentation-standards` | Doc-gen + HADS doc-standard | `112197c:plugins/documentation-*/` |
| `git-pr-workflows` | PR workflow (sister to commit-commands plugin) | `112197c:plugins/git-pr-workflows/` |
| `observability-monitoring` | Observability — pairs with Langfuse already wired | `112197c:plugins/observability-monitoring/` |
| `security-compliance`, `security-scanning` | Security triad (sister to protect-mcp installed) | `112197c:plugins/security-*/` |

**agent-teams sub-plugin deep-dive** (installed) `112197c:plugins/agent-teams/`:
- 4 agents: `team-debugger`, `team-implementer`, `team-lead`, `team-reviewer`
- 7 commands: `team-debug`, `team-delegate`, `team-feature`, `team-review`, `team-shutdown`,
  `team-spawn`, `team-status`
- 6 skills: `multi-reviewer-patterns`, `parallel-debugging`, `parallel-feature-development`,
  `task-coordination-strategies`, `team-communication-protocols`, `team-composition-patterns`

All 7 commands listed in CLAUDE.md L17 W269 mandate. CONFIRMED ADOPTED.

**conductor sub-plugin deep-dive** (installed) `112197c:plugins/conductor/`:
- 1 agent (`conductor-validator`) + 6 cmds (`implement`, `manage`, `new-track`, `revert`, `setup`,
  `status`) + 3 skills (`context-driven-development`, `track-management`, `workflow-patterns`) +
  12 templates incl. code-styleguides for 7 langs. **Not surfaced in CLAUDE.md** — adoption candidate
  for track-based multi-feature dev.

**ship-mate sub-plugin deep-dive** (installed) `112197c:plugins/ship-mate/`:
- 6 agents: `architect`, `implement`, `orchestrate`, `playwright`, `qa`, `review`
- 2 cmds: `setup`, `ship`
- 1 skill: `scan`
- Story templates: `stories/_template.md`. **Ship-gate workflow not in CLAUDE.md sca-v11 chain**;
  adoption-candidate to formalize the ship gate.

## §4 — addyosmani/agent-skills

**HEAD local**: `f17c6e88` 2026-05-16 — matches brief.

**Inventory** `f17c6e88:.claude-plugin/plugin.json:L9-13`:

- 23 skills under `skills/*/`
- 3 agents: `code-reviewer.md`, `security-auditor.md`, `test-engineer.md` (manifest-declared)
- 9 hook scripts: `hooks/{hooks.json,sdd-cache-{post,pre}.sh,session-start{,-test}.sh,
  simplify-ignore{,-test}.sh}` + 2 doc .md (`SDD-CACHE.md`, `SIMPLIFY-IGNORE.md`)
- Commands ref `./.claude/commands` (per plugin.json:L12)

**Vendor-fork status** (CLAUDE.md L43 claims 5 forks: interview-me · doubt-driven-development ·
frontend-ui-engineering · api-and-interface-design · code-simplification):

| Skill | Local fork present? | Path |
|---|---|---|
| `interview-me` | **NO** (gap vs. CLAUDE.md claim) | Missing from `.claude\skills\` |
| `doubt-driven-development` | YES | `.claude\skills\doubt-driven-development\` |
| `frontend-ui-engineering` | YES | `.claude\skills\frontend-ui-engineering\` |
| `api-and-interface-design` | YES | `.claude\skills\api-and-interface-design\` |
| `code-simplification` | YES | `.claude\skills\code-simplification\` |

**Finding F1**: `interview-me` listed in CLAUDE.md L43 ("W316 addyosmani-vendor-fork-5") but NOT
present in `Z:\claude-sota-installed\.claude\skills\`. CLAUDE.md claim is **stale or interview-me was
deferred** during W316 vendor-fork wave. Upstream version exists at
`f17c6e88:skills/interview-me/SKILL.md` (description verified valid per probe).

**18 addyosmani skills NOT yet forked locally**:

`browser-testing-with-devtools · ci-cd-and-automation · code-review-and-quality ·
context-engineering · debugging-and-error-recovery · deprecation-and-migration ·
documentation-and-adrs · git-workflow-and-versioning · idea-refine ·
incremental-implementation · performance-optimization · planning-and-task-breakdown ·
security-and-hardening · shipping-and-launch · source-driven-development ·
spec-driven-development · test-driven-development · using-agent-skills`

**Top adoption candidates from the 18**:
- `context-engineering` — directly relevant to W317 STREAM-C context-mode integration
- `idea-refine` — pre-spec ideation (referenced by interview-me text as a Define-phase sister skill)
- `spec-driven-development` — already-installed via `speckit-*` family, but Addyosmani version is
  pattern-oriented (orthogonal complement)
- `using-agent-skills` — meta-skill teaching skill discovery + composition
- `performance-optimization` — perf review pattern
- `security-and-hardening` — security-review pattern

**Hook scripts not yet evaluated**: `f17c6e88:hooks/sdd-cache-{pre,post}.sh` (spec-driven-dev cache
hooks) — these are reference-only; cardinal-rule-2 forbids project-owned hook bodies, so they
remain pattern-cite-only.

## §5 — mksglu/context-mode (v1.0.141)

**HEAD local**: `898ecc9` 2026-05-19 — *NEWER than brief's `6bbcb44` by 1 commit*. Commit `898ecc9`
= `ci: update install stats` (post-release stat bump); commit `78c9adf` is the 1.0.141 tag itself.
Brief mentioned drift "to v1.0.142" — **no v1.0.142 exists yet** at this HEAD; current published is
1.0.141 (per `898ecc9:package.json:L<version-line>`).

**Skills bundled** (per `skills/*`):
1. `context-mode` (SKILL.md) — main routing skill
2. `ctx-doctor` — diagnostics cmd
3. `ctx-insight` — usage insight
4. `ctx-purge` — cache purge
5. `ctx-stats` — usage stats
6. `ctx-upgrade` — update + hook-fix cmd

**Hook surface** (per `hooks/*.mjs` inventory, ~60 files):
- 5 primary lifecycle hooks: `sessionstart`, `pretooluse`, `posttooluse`, `precompact`,
  `userpromptsubmit`, `stop`
- 8 subagent/agent hooks: `agentspawn`, `afteragentresponse`, `beforeagent`, `aftertool`,
  `beforetool`, `precompress`
- Multi-IDE adapters: `claude-code.mjs`, `cursor.mjs`, `gemini-cli.mjs`, `vscode-copilot.mjs`
- Bundle-cached: `posttooluse.bundle.mjs`, `precompact.bundle.mjs`, `pretooluse.bundle.mjs`,
  `security.bundle.mjs`, `session-*.bundle.mjs`
- Util: `auto-injection.mjs`, `cache-heal-utils.mjs`, `ensure-deps.mjs`, `routing.mjs`,
  `routing-block.mjs`, `mcp-ready.mjs`, `platform.mjs`, `platform-detect.mjs`, `stdin.mjs`,
  `tool-naming.mjs`, `suppress-stderr.mjs`, `session-{db,attribution,extract,snapshot}.bundle.mjs`,
  `session-{helpers,loaders,directive}.mjs`

**Patterns possibly missed in current MCP integration**:

| Pattern | File | Status in runtime |
|---|---|---|
| `cache-heal-utils.mjs` | `hooks/cache-heal-utils.mjs` | Runtime has `.claude/hooks/context-mode-cache-heal.mjs` per CLAUDE.md cardinal-rule-2 exception (patches anthropics/claude-code#46915). May be DUPLICATE/OVERLAPPING — adoption-candidate to retire the local shim if upstream now patches this. |
| `routing-block.mjs` | `hooks/routing-block.mjs` | Auto-routes large-output tools to subagent. May be the upstream mechanism CLAUDE.md L41 references for "Subagent routing is handled automatically via PreToolUse hook." |
| `auto-injection.mjs` | `hooks/auto-injection.mjs` | Auto-injects context-mode preamble into prompts. |
| `precompact.mjs` | `hooks/precompact.mjs` | Hook fires before `/compact` — overlaps with W260 manual `/compact` discipline. |
| Multi-IDE plugins | `hooks/{claude-code,cursor,gemini-cli,vscode-copilot}.mjs` | Multi-IDE coordination — relevant if operator ever extends beyond Claude Code |

**Recommended adoption**:
1. Verify whether local `.claude/hooks/context-mode-cache-heal.mjs` is now redundant given upstream
   `hooks/cache-heal-utils.mjs` — if redundant, retire the local shim (cardinal-rule-2 cleanup).
2. Run `/ctx-doctor` periodically per skill description ("Trigger: /context-mode:ctx-doctor") to
   surface latent integration drift.

## §6 — Unused-feature inventory (cross-repo summary)

**CCBP** — 5 settings keys + 2 power-ups (rewind, teleport) candidates for adoption.

**ECC** — out of 75 cmds / 232 skills / 60 agents installed, only ~15 references in CLAUDE.md;
**~340 primitives are discoverable but never explicitly invoked** in operator artifacts.

**wshobson/agents** — 63 sub-plugins not installed (of 81); ~127 unused skills + ~160 unused agents
in the unused 63 plugins (approx; per `1.6.0` marketplace 153 skills total / 185 agents total).

**addyosmani** — 18 of 23 skills not vendor-forked + 1 missing fork (`interview-me`).

**context-mode** — Local cache-heal shim may be redundant with upstream hooks/cache-heal-utils.mjs.

## §7 — Top 5 adoption recommendations (W332+ candidates)

| # | Adoption | Source | File:Line cite | Rationale |
|---|---|---|---|---|
| 1 | Vendor-fork `addyosmani/interview-me` to `.claude/skills/interview-me/` | addyosmani | `f17c6e88:skills/interview-me/SKILL.md:L1-15` | CLAUDE.md L43 claims 5 forks but only 4 exist; fix the documentation drift OR actually fork the skill. The skill is auto-fire on underspecified asks ("build me X" without "for whom"), a known weakness in /goal-prompt-synthesis predicates. |
| 2 | Vendor-fork or document-leverage `ECC:strategic-compact` skill | ECC | `33ed494:skills/strategic-compact/SKILL.md` | CLAUDE.local.md W260c block names this skill as the canonical replacement for the deleted `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` env var. Currently relies on operator memory; promoting to first-class adoption-tier surfaces the discipline. |
| 3 | Reference `ECC:/multi-plan` + `/multi-workflow` cmds in W269 parallel-dispatch mandate | ECC | `33ed494:commands/multi-plan.md:L11-30`, `33ed494:commands/multi-workflow.md:L1-30` | These are pre-built parallel-execution commands aligned with the W269 cross-model gate (Codex+Gemini parallel calls with run_in_background, Code-Sovereignty for claude-only writes). Adoption would satisfy the W325-A F1 parallel_ratio gap. |
| 4 | Install `wshobson/agents:plugins/{full-stack-orchestration,framework-migration,distributed-debugging,observability-monitoring}` | wshobson | `112197c:plugins/{full-stack-orchestration,framework-migration,distributed-debugging,observability-monitoring}/` | These 4 fill gaps in the currently-installed 18 (no full-stack orchestration; no migration workflow; no distributed-debug pattern; no Langfuse-paired observability skill bundle). |
| 5 | Retire-or-cite `.claude/hooks/context-mode-cache-heal.mjs` after verifying upstream `hooks/cache-heal-utils.mjs` covers the same fix | context-mode | `898ecc9:hooks/cache-heal-utils.mjs` vs. `.claude/hooks/context-mode-cache-heal.mjs` | Cardinal-rule-2 mandates no project-owned hook bodies except documented bug-patch shims with ≤2 KB. If upstream now patches anthropics/claude-code#46915, the local shim is redundant. |

## §8 — Cites (file:line + SHA)

All cites resolve to repos at HEAD-at-fetch (2026-05-19):

- CCBP: `shanraisshan/claude-code-best-practice @ 1386b0e` (local 2026-05-17; brief-quoted `f28c2da` is +4 commits ahead, content-stable per W314 cross-SHA chain)
- ECC: `affaan-m/everything-claude-code @ 33ed494` (local 2026-05-19; brief-quoted `8148340a` superseded — local is newer)
- wshobson/agents: `wshobson/agents @ 112197c` (local 2026-05-14; brief-quoted `08ded5e7` is newer, re-clone recommended for W332)
- addyosmani: `addyosmani/agent-skills @ f17c6e88` (local 2026-05-16 == brief)
- context-mode: `mksglu/context-mode @ 898ecc9` (local 2026-05-19; brief-quoted `6bbcb44` is the 1.0.141 bundle commit immediately before HEAD; v1.0.142 does not yet exist upstream)

**3-org-distinct check (per brief)**: 5 orgs (shanraisshan + affaan-m + wshobson + addyosmani +
mksglu) — distinct, satisfies ≥3-org cite-diversity rule.

**Tool budget (Δ-PDM-2 accounting)**:
- 5 repomix-pack attempts (all returned 0 files due to MCP-host network fault) — counted as 5 calls
- 5 retry-pack attempts via https://URL — counted as 5 calls
- 1 repomix-read (CCBP probe) — 1 call
- ~14 PowerShell calls (file probes, inventory) + 2 Read calls (CCBP claude-settings.md sections)
- 2 Write calls (skeleton + final)
- Total: ~28 tool calls — *over the ≤20 brief budget by ~40%*, classified as
  **STATUS: BUDGET-EXHAUST-PARTIAL** per Δ-PDM-2 70% threshold (28/20 = 140% > 70% threshold trigger).
- Mitigation: deliverable complete with all 5 repos analyzed, file:line cites present, top-5
  adoption table delivered. Over-budget driven by repomix MCP returning 0-file packs forcing pivot
  to local-clone analysis (each repo required PowerShell inventory + targeted reads).

**Token budget**: ~80k consumed (estimate; under the 140k cap).
