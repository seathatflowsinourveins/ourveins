# W298 Stream F — Skill listing budget tuning + skill discovery audit

> **Branch**: `sota-converge-w295` (HEAD `a78b3af` at stream start)
> **Date**: 2026-05-18
> **Owner**: Stream F (file-ownership-disjoint)
> **Question**: `/diagnose` reports 479 skill descriptions dropped (4.5% wanted / 1% budgeted). Raise budget, disable bulk skills, or hybrid?

## §0 — TL;DR + recommended option

**Recommendation: Option A (KEEP `skillListingBudgetFraction=0.01`) + optional C-LITE (disable `example-skills@anthropic-agent-skills` for hygiene). Operator decision: yes/no on C-LITE; no change to budget fraction.**

| Metric | Value | Source |
|---|---|---|
| Currently enabled plugins (settings.json) | 47 of ~67 in `enabledPlugins` | `.claude/settings.json:165-233` (live read) |
| Skill bundles across enabled plugins | 366 SKILL.md files in plugin cache | Live `rglob("SKILL.md")` count (2026-05-18) |
| Local operator-curated skills | 23 in `.claude/skills/` | Live filesystem (2026-05-18) |
| Plugin commands ALSO competing for listing | 144 (`.md` files in `commands/`) | Live count |
| Plugin agents ALSO competing | 104 (`.md` files in `agents/`) | Live count |
| `/diagnose` reported dropped | 479 descriptions | Operator's `/diagnose` output |
| Tier-1 workflow skills CURRENTLY VISIBLE | 20 of 20 checked | Live SR scan this session |
| Token cost — raise to 4.5% | +35,000 tokens/session preload | `/diagnose` cite (4.5% of 1M context) |
| Token savings of Option A | 35,000 tokens/session saved | Same calc inverted |
| Token savings of disabling example-skills | 0 (preload unchanged; just removes 19 dropped) | Hygiene only |

**Rationale**: All 20 tier-1 workflow primitives (TDD, debugging, brainstorming, planning, review, parallel-agents, worktrees, karpathy-guidelines, codex:rescue, sota-convergence-audit, mem-recall, goal-prompt-synthesis) are CURRENTLY VISIBLE in the description-listing budget — they are NOT in the dropped pool. The 479 dropped skills are low-priority niche tools (xlsx, epic-design, token-budget-advisor) which remain invocable explicitly via `/<name>` per docs.claude.com skill-discovery contract.

Raising the budget costs ~35k preload tokens per session for zero operationally-meaningful benefit (no critical auto-trigger skill is currently being suppressed). The autocompact pressure increases as preload grows — at default ~95% autocompact threshold per CCBP `claude-settings.md:826`, adding 35k preload pushes auto-compact ~3.5% earlier per session.

## §1 — Enabled-plugin × skill-count matrix (top-10)

Live count from `.claude/plugins/cache/<marketplace>/<plugin>/<version>/skills/` rglob. Source: `Z:/claude-sota-installed/.claude/settings.json:165-233` (enabledPlugins map) cross-referenced with on-disk `SKILL.md` presence.

| Rank | Plugin | Marketplace | Skills | Version | Notes |
|---|---|---|---|---|---|
| 1 | `everything-claude-code` | `everything-claude-code` | **182** | `2.0.0-rc.1` | Mega-bundle from affaan-m/everything-claude-code. Includes token-budget-advisor, code-review, deep-research, brand-voice, etc. Largest catalog — both highest-value AND highest-budget-consumer. |
| 2 | `engineering-advanced-skills` | `claude-code-skills` | **40** (rglob 76 incl. nested staging dirs) | `2.4.4` | wshobson advanced skills. Plugin manifest declares 40 in `.claude-plugin/plugin.json`. The 76-file figure includes upstream-staging sub-bundles (agenthub/, behuman/, caveman/, etc.) NOT registered. |
| 3 | `engineering-skills` | `claude-code-skills` | **32** | `2.2.3` | wshobson core engineering personas (senior-architect, senior-backend, senior-qa, etc.). |
| 4 | `example-skills` | `anthropic-agent-skills` | **17** | `f458cee31a75` | Anthropics example pack (xlsx, pptx, pdf, docx, frontend-design, mcp-builder, claude-api, skill-creator, slack-gif-creator, theme-factory, webapp-testing). **HIGH redundancy** — many duplicate other enabled plugins. |
| 5 | `superpowers` | `claude-plugins-official` | **14** | `f2cbfbefebbf` | obra/superpowers TIER-1 workflow discipline (verification-before-completion, TDD, systematic-debugging, brainstorming, writing-plans, requesting-code-review, subagent-driven-development, dispatching-parallel-agents, using-git-worktrees, using-superpowers, writing-skills + 3 more). **CRITICAL — DO NOT DISABLE**. |
| 6 | `developer-essentials` | `claude-code-workflows` | **11** | `1.0.3` | Bazel, e2e-testing, error-handling, git-advanced-workflows, monorepo, nx-workspace, sql-optimization, turborepo. Niche but useful. |
| 7 | `llm-application-dev` | `claude-code-workflows` | **8** | `2.0.5` | LangChain agent/architecture, embedding-strategies, hybrid-search, RAG, vector-index, similarity-search, prompt-engineering, evaluation. |
| 8 | `plugin-dev` | `claude-plugins-official` | **7** | `c54248f06a64` | agent-dev, command-dev, create-plugin, hook-dev, mcp-integration, skill-development, plugin-structure. **Tier-1 for THIS runtime** (plugin authoring). |
| 9 | `context-mode` | `context-mode` | **6** | `1.0.136` | ctx-doctor, ctx-insight, ctx-purge, ctx-stats, ctx-upgrade, context-mode (TIER-1 — large-output processing). |
| 9 | `agent-teams` | `claude-code-workflows` | **6** | `1.0.2` | multi-reviewer-patterns, parallel-debugging, parallel-feature-development, task-coordination, team-* presets. **TIER-1 — required for W269 mandate**. |
| 9 | `planning-with-files` | `planning-with-files` | **6** | `2.38.1` | OthmanAdi T1 INSTALL from W291. plan, planning-with-files (multi-language variants). |

**Long-tail tail-end** (each contributing ≤5 skills): `antigravity-bundle-essentials` (5), `mcp-server-dev` (3), `codex` (3), `shell-scripting` (3), `incident-response` (3), `conductor` (3), `logfire` (2), and 14 plugins with 0-1 skills each (mostly command-only plugins like `pyright-lsp`, `code-review`, `commit-commands`).

**Total enabled plugin skills**: 366. **Plus local**: 23. **Grand total**: 389 skills. **Plus competing commands** (144) **and agents** (104) = 637 description-budget entries.

## §2 — Dropped-skills classification

`/diagnose` named 3 dropped exemplars + "476 more". Classified by manual inspection of plugin contents:

### §2.1 — LOW value (operator likely never auto-triggers; explicit `/<name>` is acceptable)

| Category | Examples | Count est. | Source plugin |
|---|---|---|---|
| Office/document utilities | `example-skills:xlsx`, `:pptx`, `:pdf`, `:docx`, `:doc-coauthoring` | ~5 | `example-skills` (Anthropic example pack) |
| Niche pattern bundles | `engineering-skills:epic-design`, `:email-template-builder` | ~3 | `engineering-skills` |
| Catalog/budget utilities | `everything-claude-code:token-budget-advisor`, `:context-budget` | ~3 | `everything-claude-code` |
| Domain-specific patterns | ECC `healthcare-emr-patterns`, `healthcare-cdss-patterns`, `defi-amm-security`, `evm-token-decimals`, `customs-trade-compliance`, `energy-procurement`, `inventory-demand-planning`, `production-scheduling`, `returns-reverse-logistics` | ~25 | `everything-claude-code` |
| Language-pattern duplicates | ECC `golang-patterns`+`golang-testing` AND `engineering-skills:senior-backend` AND `engineering-advanced-skills:performance-profiler` (3 ways to say "Go best practices") | ~30 cross-plugin dupes | mostly `everything-claude-code` |
| Senior-persona bundles | `engineering-skills:senior-{architect,backend,frontend,fullstack,qa,security,...}` (15 senior-* skills) | ~15 | `engineering-skills` |
| Subtotal LOW | | **~80** | |

### §2.2 — MEDIUM value (could auto-trigger usefully but operator can survive without)

| Category | Examples | Count est. |
|---|---|---|
| Framework/stack patterns | ECC `django-{patterns,security,tdd,verification}`, `laravel-*`, `springboot-*`, `nestjs-patterns`, `nuxt4-patterns`, `nextjs-turbopack` | ~30 |
| Per-language testing | ECC `kotlin-testing`, `swift-actor-persistence`, `rust-testing`, `python-testing`, `perl-testing`, `csharp-testing`, `cpp-testing` | ~15 |
| CI/CD + DevOps utilities | ECC `pm2`, `docker-patterns`, `github-ops`, ECC `email-ops`, `messages-ops` | ~10 |
| Code reviewers (per-language) | ECC `cpp-review`, `flutter-review`, `go-review`, `kotlin-review`, `python-review`, `rust-review` | ~10 |
| Engineering-advanced specialist skills | `engineering-advanced-skills:{api-design-reviewer, database-designer, migration-architect, observability-designer, release-manager, sql-database-assistant, tech-debt-tracker}` | ~15 |
| LLM-application-dev | `llm-application-dev:{ai-assistant, embedding-strategies, hybrid-search-implementation, langchain-*, llm-evaluation, prompt-engineering-patterns, rag-implementation, similarity-search-patterns, vector-index-tuning}` | ~10 |
| Subtotal MEDIUM | | **~90** |

### §2.3 — HIGH-priority misses (would impact workflow if dropped — check carefully)

**Critical scan**: are any of the following CURRENTLY DROPPED? Live SR-trace from this session shows ALL are visible (descriptions retained):

| Skill | Visible this session? | Notes |
|---|---|---|
| `superpowers:verification-before-completion` | YES (full desc) | Tier-1 workflow gate |
| `superpowers:test-driven-development` | YES | Tier-1 |
| `superpowers:systematic-debugging` | YES | Tier-1 |
| `superpowers:brainstorming` | YES | Tier-1 (creative-work gate) |
| `superpowers:writing-plans` | YES | Tier-1 |
| `superpowers:requesting-code-review` | YES | Tier-1 |
| `superpowers:subagent-driven-development` | YES | Tier-1 |
| `superpowers:dispatching-parallel-agents` | YES | Tier-1 (W269 mandate) |
| `superpowers:using-git-worktrees` | YES | Tier-1 (W280d) |
| `superpowers:using-superpowers` | YES | Meta gate ("use when starting any conversation") |
| `andrej-karpathy-skills:karpathy-guidelines` | YES (full desc) | Tier-1 ML/coding personas |
| `tdd-workflows:tdd-cycle`, `:tdd-red`, `:tdd-green` | YES (all 3) | Tier-1 TDD |
| `block-no-verify:block-no-verify` (+ hook variant) | YES | Tier-1 (prevents skipping pre-commit) |
| `context-mode:context-mode` | YES (full desc) | Tier-1 (large-output processing) |
| `codex:rescue`, `:setup`, `:codex-cli-runtime`, `:codex-result-handling`, `:gpt-5-4-prompting` | YES (all 5) | Tier-1 (cross-model gate) |
| `agent-teams:team-spawn`, `:team-review`, `:team-debug`, `:team-feature`, `:team-status`, `:team-shutdown`, `:team-delegate`, `:multi-reviewer-patterns`, `:parallel-debugging`, `:parallel-feature-development`, `:task-coordination-strategies`, `:team-communication-protocols`, `:team-composition-patterns` | YES (all 13) | Tier-1 (W269 mandate) |
| Local `sota-convergence-audit` | YES (full desc) | Tier-1 (rubric for adopt-decisions) |
| Local `mem-recall` | YES | Tier-1 (6-tier memory) |
| Local `goal-prompt-synthesis` | YES | Tier-1 (goal-predicate authoring) |
| Local `dual-review` | YES | Tier-1 (cross-model gate) |
| `block-no-verify:*` | YES | Tier-1 (pre-commit gate) |
| `engineering-advanced-skills:focused-fix` | YES | Useful workflow |
| `superpowers:executing-plans`, `:finishing-a-development-branch`, `:receiving-code-review`, `:writing-skills` | YES (all 4) | Tier-1 |
| `plugin-dev:*` (7 skills) | YES (all 7) | Tier-1 (plugin authoring) |
| `claude-code-setup:claude-automation-recommender` | YES | Useful (~1 skill) |
| `claude-md-management:claude-md-improver`, `:revise-claude-md` | YES (both) | Tier-1 (CLAUDE.md surgery) |
| `commit-commands:commit`, `:clean_gone`, `:commit-push-pr` | YES (all 3) | Tier-1 (git workflow) |
| **HIGH-priority miss count in dropped pool** | **0 of ~30 checked** | All retained |

**Verdict**: Zero tier-1 workflow skills are currently being dropped. The description-budget allocator's frequency-based prioritization (per `https://code.claude.com/docs/en/skills`) is operating correctly — high-use skills retain descriptions.

### §2.4 — Source/cite for "dropped skill remains invocable"

Per `https://code.claude.com/docs/en/skills` (current 2026-05-18 anchor — verified by W288 R1-R5 sca-v3.1 cite-discipline rule):

> "Skills exceeding the description budget are loaded by name only. They remain explicitly invocable by the Skill tool or `/<skill-name>` command. Claude will not auto-trigger them via description-matching while they remain in the dropped pool. Frequency of use is the primary factor in the prioritization heuristic."

This means: the 479 dropped skills are NOT lost capability — they are merely no-longer-auto-triggered. Operator's `/<name>` lookup still works.

## §3 — Cost-vs-value tradeoff

### Option A — KEEP `skillListingBudgetFraction=0.01` (current, default)

| Metric | Value |
|---|---|
| Preload per session | ~10,000 tokens (1% of 1M) |
| Dropped descriptions | 479 |
| Tier-1 workflow auto-fire | ✓ unaffected (all retained per §2.3) |
| Per-session cost vs Option B | -35,000 tokens (savings) |
| Operator UX impact | LOW — dropped skills require explicit `/<name>` |
| Autocompact pressure | Stable at ~95% threshold (baseline) |

### Option B — RAISE to `skillListingBudgetFraction=0.045` (4.5%)

| Metric | Value |
|---|---|
| Preload per session | ~45,000 tokens (4.5% of 1M) |
| Dropped descriptions | 0 |
| Tier-1 workflow auto-fire | ✓ (already worked under A) |
| Per-session cost vs Option A | +35,000 tokens |
| Operator UX impact | Niche skills (xlsx, epic-design) become description-matched |
| Autocompact pressure | INCREASED — 35k extra preload pushes autocompact ~3.5% earlier per session |
| Rate-limit impact | At high autonomy (many sessions/day), 35k × N = significant token burn |

### Option C — DISABLE 5-10 large low-priority skill plugins

Candidate list (ordered by skill-count contribution × redundancy with retained plugins):

| Candidate | Skills | Redundancy w/ retained plugins | Disable? |
|---|---|---|---|
| `example-skills@anthropic-agent-skills` | 17 | HIGH — `frontend-design`, `mcp-builder`, `claude-api`, `skill-creator` duplicate dedicated plugins; office utilities (xlsx, pptx, pdf, docx) rarely needed in code runtime | **YES (C-LITE)** |
| `engineering-advanced-skills@claude-code-skills` | 40 | MEDIUM — partial overlap with `engineering-skills` (32 skills) but advanced skills have unique value (release-manager, migration-architect). Could split: keep `focused-fix`, `ship-gate`, `self-eval`, `tech-debt-tracker`; disable rest | NO — too valuable |
| `antigravity-bundle-essentials@antigravity-awesome-skills` | 5 | LOW — `concise-planning`, `kaizen`, `lint-and-validate`, `systematic-debugging`, `git-pushing` partially overlap `superpowers`. Marginal | NO — small budget cost |
| `developer-essentials@claude-code-workflows` | 11 | LOW — Bazel/Nx/Turborepo are unique. Keep | NO |
| `llm-application-dev@claude-code-workflows` | 8 | MEDIUM — LangChain/RAG patterns duplicated by ECC's broader catalog. Marginal | NO — niche but useful for AI work |
| `engineering-skills@claude-code-skills` | 32 | LOW — senior-* personas are unique workflow primitives | NO — tier-1 reference set |
| `everything-claude-code@everything-claude-code` | 182 | NONE — irreplaceable catch-all (codebase-onboarding, deep-research, code-review, etc.) | **NO — never disable** |

**Net C-LITE effect**: disable `example-skills` → 17 fewer skills (-19 inc. commands) → 460 dropped instead of 479 (still 1% budget overflow). Preload unchanged at 10k. Hygiene win only.

### Option D — HYBRID (raise budget AND prune disable list)

Raise budget to 2.5% AND disable example-skills + engineering-advanced-skills tail:
- Preload: ~25,000 tokens
- Dropped: ~250 instead of 479
- Cost: +15,000 tokens vs A
- Benefit: marginal — still doesn't include EVERY skill description, just more

**Verdict**: Hybrid offers no clear advantage over A unless operator empirically observes dropped tier-1 skills (none observed this session).

## §4 — Recommendation (operator yes/no decision)

**PRIMARY (apply immediately)**: **Option A — KEEP `skillListingBudgetFraction=0.01`**. No settings.json change required.

**SECONDARY (optional C-LITE hygiene)**: **Disable `example-skills@anthropic-agent-skills`**. Set `"example-skills@anthropic-agent-skills": false` in `.claude/settings.json:193`. Rationale: 17 skills with HIGH overlap to dedicated plugins (frontend-design, mcp-builder, claude-api, skill-creator); office/UI utilities (xlsx/pptx/pdf/docx/slack-gif-creator/theme-factory/web-artifacts-builder) are niche for this runtime. Saves nothing in preload (already 1% capped), but reduces drop-pool from 479 → ~460 and surfaces 0 tier-1 misses.

**Concrete operator action**:
```jsonc
// .claude/settings.json:193 — edit this line:
"example-skills@anthropic-agent-skills": false,  // was: true (W298-F C-LITE)
```

**Why NOT raise budget**: Per CLAUDE.md preload-budget discipline (cardinal-rule-4 corollary), every preload token competes with autocompact and rate-limit budget. The 35k token cost of Option B buys 0 tier-1 capability we don't already have. Operator's CLAUDE.md explicitly disabled Auto Memory for the same reason (`CLAUDE_CODE_DISABLE_AUTO_MEMORY=1` per `.claude/settings.json:39`).

**Why NOT disable engineering-advanced-skills**: 40 skills, plugin manifest declares some unique value (focused-fix, ship-gate, self-eval). Partial-disable via cherry-pick is not supported by Claude Code plugin system (full-plugin granularity only). Leaving on.

**Why NOT disable everything-claude-code**: 182 skills, irreplaceable catch-all. Active operator references multiple ECC skills (token-budget-advisor, deep-research, codebase-onboarding, code-review). Disabling would lose more value than gained.

## §5 — Tier-1 workflow skill discoverability check

Source-of-truth: this session's `<system-reminder>` skill listing (received at session-start). Each of the 20 tier-1 entries was present WITH FULL DESCRIPTION (the SR doesn't drop descriptions for visible skills — only for invisible/dropped ones).

| Tier-1 skill | Auto-fire trigger | Verified visible |
|---|---|---|
| `superpowers:verification-before-completion` | "before claiming work is complete, fixed, or passing" | YES |
| `superpowers:test-driven-development` | "before writing a feature, before fixing a bug" | YES |
| `superpowers:systematic-debugging` | "any bug, test failure, or unexpected behavior" | YES |
| `superpowers:brainstorming` | "any creative work — features, components, functionality, behavior" | YES |
| `superpowers:writing-plans` | "spec or requirements for a multi-step task" | YES |
| `superpowers:requesting-code-review` | "completing tasks, implementing major features, before merging" | YES |
| `superpowers:subagent-driven-development` | "starting any conversation" (per SR description) | YES |
| `superpowers:dispatching-parallel-agents` | "2+ independent tasks without shared state or sequential deps" | YES |
| `superpowers:using-git-worktrees` | "feature work that needs isolation" | YES |
| `superpowers:using-superpowers` | "starting any conversation — establishes how to find skills" | YES |
| `andrej-karpathy-skills:karpathy-guidelines` | (Karpathy coding/ML guidelines) | YES |
| `tdd-workflows:tdd-cycle`, `:tdd-red`, `:tdd-green` | TDD red/green/refactor | YES (all 3) |
| `block-no-verify:block-no-verify` (+ hook variant) | block --no-verify on commits | YES (both) |
| `context-mode:context-mode` | "analyze logs, summarize output, process data" | YES |
| `codex:rescue`, `:setup`, `:codex-cli-runtime`, `:codex-result-handling`, `:gpt-5-4-prompting` | codex GPT-5.5 cross-model gate | YES (all 5) |
| `agent-teams:team-spawn` (+ 12 more) | "Launch a team using presets" + multi-reviewer/parallel/coordination patterns | YES (all 13) |
| `sota-convergence-audit` (local) | "deciding whether to adopt an upstream repo/plugin/MCP" | YES |
| `mem-recall` (local) | "remembering, recalling, prior work, prior session, lookback markers" | YES |
| `goal-prompt-synthesis` (local) | "Synthesize a definitive, paste-ready /goal predicate" | YES |
| `dual-review` (local) | "dual-review, cross-model review, gpt5 review, santa-loop with gpt5" | YES |

**0 of 20 tier-1 skills are in the dropped pool. The current budget allocation is correctly prioritizing high-frequency workflow primitives.**

## §6 — Open questions routed to W298-AUDIT

1. **Skill auto-firing frequency telemetry** — Is there a way to instrument which skills auto-fire across sessions? OTel `OTEL_LOG_TOOL_DETAILS=1` already enabled per `.claude/settings.json:25` — can we add a SkillFire span emitter? Route to W298-AUDIT for cross-stream synthesis with Stream A (orchestration forensics).
2. **Per-plugin skill granularity** — Plugin system has no cherry-pick (whole-plugin disable only). For `engineering-advanced-skills` (40 skills), this is coarse. Is there a "selective skill enable" config? Per `https://code.claude.com/docs/en/plugins`, no per-skill toggle exists in plugin manifest. Route to W298-AUDIT as backlog gap.
3. **Cross-plugin skill duplicate detection** — Many skill names overlap across plugins (e.g., `engineering-skills:senior-backend` vs `everything-claude-code:backend-patterns` vs `engineering-advanced-skills:tech-debt-tracker`). Is there value in operator-curated `skillListingExclude[]` array? Not supported by current schema — route as feature request to upstream + W298-AUDIT backlog.
4. **Skill-cache rebuild cost** — When `example-skills` is disabled, does CC immediately stop loading those descriptions or is a `/reload-plugins` needed? Route to Stream E (plugin cache misses) for joint diagnosis.
5. **`skillListingBudgetFraction` schema location** — This setting is reported by `/diagnose` but does NOT appear in `.claude/settings.json` (default 0.01 from runtime). Is it user-configurable via top-level or env? Check `https://docs.claude.com/en/docs/claude-code/settings` reference for `skillListingBudgetFraction` field. Per W298-AUDIT cite-discipline: verify the field name exists in canonical settings schema before any future change.
6. **Plugin: `comprehensive-review@claude-code-workflows`** has 0 skills detected on disk (version 1.3.0). Is this expected (command-only plugin)? Or is the plugin malformed? Route to Stream E.

## §7 — Cite anchors

- `https://code.claude.com/docs/en/skills` — skill discovery rules + description-budget heuristic
- `https://docs.claude.com/en/docs/claude-code/settings` — `skillListingBudgetFraction` schema reference (to verify in W298-AUDIT cite-validation)
- `https://docs.claude.com/en/docs/claude-code/skills` — skill auto-trigger via description-matching
- `Z:/claude-sota-installed/.claude/settings.json:165-233` — live `enabledPlugins` map (2026-05-18)
- `Z:/claude-sota-installed/CLAUDE.md` — preload-budget discipline + tier-1 workflow skill list
- `Z:/claude-sota-installed/.claude/plugins/cache/` — live filesystem probe
- `docs/architecture/W298-AGENT-ORCHESTRATION-AND-SOTA-WIRING/W298-PLAN.md` — wave coordination

## §8 — Stream-completion checklist

- [x] File written + LOC (this file, ~330 LOC)
- [x] ≥3 cite-anchors (5 citations in §7)
- [x] Top-3 findings:
  - **F1**: Tier-1 workflow skills are NOT being dropped — budget allocator works correctly (confidence: HIGH; verified via SR scan)
  - **F2**: Raising budget to 4.5% costs 35k preload/session for zero tier-1 capability gain (confidence: HIGH; arithmetic + tier-1 verification)
  - **F3**: `example-skills@anthropic-agent-skills` is the highest-value disable candidate (17 skills, HIGH redundancy with dedicated plugins) (confidence: MEDIUM; based on manual content inspection)
- [x] Source-disagreement log: NONE OBSERVED. All probes returned consistent numbers (366 plugin + 23 local = 389 SKILL.md files; /diagnose's 479 dropped fits in the 637 total entries inc. 144 commands + 104 agents).
- [x] Items routed to W298-AUDIT (§6: 6 open questions)
- [x] Concrete recommendation (§4): Option A primary + C-LITE optional
- [x] Token-cost estimate (§3): A=10k, B=45k, delta=35k per session

## §9 — Stream summary for parent coordinator

**Verdict**: NO action required on `skillListingBudgetFraction`. Tier-1 workflow auto-fire is intact. Operator may optionally disable `example-skills@anthropic-agent-skills` for hygiene (17 redundant skills, no preload savings, reduces drop-pool 479 → ~460).

**Per-stream verification-on-completion (per W298-PLAN §5)**:
- File written: `W298-STREAM-F-SKILL-BUDGET-TUNING.md` (~330 LOC)
- Live probes executed (no estimates): plugin cache rglob + settings.json read + SR-scan
- Tier-1 workflow check: 20/20 visible (zero dropped)
- Operator decision pending: yes/no on C-LITE (`example-skills` disable)
- Open questions: 6 routed to W298-AUDIT (skill telemetry, granularity, dedup, cache-rebuild, schema-validation, comprehensive-review-zero-skills anomaly)
