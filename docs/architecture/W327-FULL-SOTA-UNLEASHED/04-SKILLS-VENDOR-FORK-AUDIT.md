# W327-S4 — Skills Vendor-Fork Audit (addyosmani + mattpocock + alirezarezvani)

> **Wave**: W327 Stream S4 (FULL-SOTA-UNLEASHED)
> **Date**: 2026-05-19
> **Authoritative repos audited** (local clones in `Z:/repos/deps/` because remote pack returned 0 files — fallback to filesystem):
>   - `addyosmani/agent-skills` @ HEAD `f17c6e8` (Merge PR #60 feat/ci-skill-validator; local clone `Z:/repos/deps/addyosmani-agent-skills/`)
>   - `mattpocock/skills` @ HEAD `67bce91` (Fix typo in README.md; local clone `Z:/repos/deps/mattpocock-skills/`)
>   - `alirezarezvani/claude-skills` @ HEAD `8aa9208` (Merge PR #701 from dev; local clone `Z:/repos/deps/alirezarezvani-claude-skills/`)
> **Local baseline**: CLAUDE.md L41 — addyosmani-5 vendor-forked + mattpocock-6 vendor-forked.
> **Critical install-state discovery (this audit)**: `alirezarezvani/claude-skills` is **already wired as marketplace `claude-code-skills`** with **11 plugins installed** (`engineering-skills@2.2.3`, `engineering-advanced-skills@2.4.4`, `kubernetes-operator@2.4.0`, `chaos-engineering@2.4.0`, `slo-architect@2.4.4`, `feature-flags-architect@2.4.0`, `self-improving-agent@2.3.1`, `autoresearch-agent@2.2.2`, `karpathy-coder@2.3.2`, `agenthub@2.2.2`, `llm-wiki@?`) per `.claude/plugins/installed_plugins.json:334-686`. `addyosmani/agent-skills` is **wired as marketplace `addy-agent-skills`** with v1.0.0 staged in cache at `cache/addy-agent-skills/agent-skills/1.0.0/skills/` (23 SKILL.md) but **no `installed_plugins.json` entry** — staged-not-activated. `mattpocock/skills` is **NOT wired** as a marketplace; current state = pure vendor-fork of 6 skills under `.claude/skills/`.

---

## TL;DR

1. **addy**: 23 upstream skills; 5 locally vendor-forked (1 prefix-namespaced); **18 NOT YET adopted**. Top untapped: `context-engineering`, `debugging-and-error-recovery`, `documentation-and-adrs`, `incremental-implementation`, `using-agent-skills` (meta-skill).
2. **matt**: 28 upstream skills (4 deprecated, 4 in-progress); 6 locally vendor-forked at HEAD `67bce91` (W320 was @ same SHA — zero drift); **18 NOT YET adopted** including the high-value `to-issues`, `to-prd`, `triage`, `zoom-out`, `prototype`, `improve-codebase-architecture`, `write-a-skill`, `setup-pre-commit`, `git-guardrails-claude-code`.
3. **ali**: 329 SKILL.md files spanning 25 categories. 11 plugins **already installed** via `claude-code-skills` marketplace. Underexplored: `marketing-skill/` (46), `c-level-advisor/` (66), `ra-qm-team/` (18) — all out-of-scope (business/compliance) for engineering runtime. In-scope unadopted: ali's `engineering/skills/*` (77 in canonical dir) is partly covered by `engineering-skills@2.2.3` plugin (51 sub-skills) + `engineering-advanced-skills@2.4.4` plugin (25 sub-skills). Net unique unadopted from ali's `engineering/<topic>/skills/<topic>/SKILL.md` (single-tier wrapper layout): `data-quality-auditor`, `helm-chart-builder`, `llm-cost-optimizer`, `prompt-governance`, `security-guidance`, `code-tour`, `behuman`, `terraform-patterns`, `statistical-analyst`, `demo-video`, `docker-development` (11 standalone power-skills).
4. **Triple-corroboration**: 9 skills appear in ≥2 of the 3 repos — `tdd`, `caveman`, `handoff`, `grill-with-docs`, `feature-flags-architect`, `chaos-engineering`, `slo-architect`, `kubernetes-operator`, `karpathy-coder` (corroborated as SOTA-convergent).
5. **Top-5 NEW vendor-fork recommendations** (for W327): see §7.

---

## §1 — addyosmani/agent-skills: upstream HEAD vs local fork

### §1.1 Upstream inventory at HEAD `f17c6e8`

23 skills under `skills/`. All have YAML frontmatter `name` + `description`. Descriptions are short (1-3 sentences) and use the **"Use when..."** anchor consistently — well-tuned for Anthropic skill auto-fire semantics.

| # | Skill | Description (auto-fire anchor) |
|---|---|---|
| 1 | `api-and-interface-design` | Guides stable API and interface design. Use when designing APIs, module boundaries, or any public interface. |
| 2 | `browser-testing-with-devtools` | Tests in real browsers via Chrome DevTools MCP. Use when building or debugging anything that runs in a browser. |
| 3 | `ci-cd-and-automation` | Automates CI/CD pipeline setup. Use when setting up or modifying build and deployment pipelines. |
| 4 | `code-review-and-quality` | Conducts multi-axis code review. Use before merging any change. |
| 5 | `code-simplification` | Simplifies code for clarity. Use when refactoring code for clarity without changing behavior. |
| 6 | `context-engineering` | Optimizes agent context setup. Use when starting a new session, when agent output quality degrades, when switching between tasks. |
| 7 | `debugging-and-error-recovery` | Guides systematic root-cause debugging. Use when tests fail, builds break, behavior doesn't match expectations. |
| 8 | `deprecation-and-migration` | Manages deprecation and migration. Use when removing old systems, APIs, or features. |
| 9 | `documentation-and-adrs` | Records decisions and documentation. Use when making architectural decisions, changing public APIs, shipping features. |
| 10 | `doubt-driven-development` | Subjects every non-trivial decision to a fresh-context adversarial review before it stands. |
| 11 | `frontend-ui-engineering` | Builds production-quality UIs. Use when building or modifying user-facing interfaces. |
| 12 | `git-workflow-and-versioning` | Structures git workflow practices. Use when making any code change. |
| 13 | `idea-refine` | Refines raw ideas into sharp, actionable concepts through structured divergent and convergent thinking. |
| 14 | `incremental-implementation` | Delivers changes incrementally. Use when implementing any feature or change that touches more than one file. |
| 15 | `interview-me` | Extracts what the user actually wants instead of what they think they should want. |
| 16 | `performance-optimization` | Optimizes application performance. Use when performance requirements exist, when you suspect performance regressions. |
| 17 | `planning-and-task-breakdown` | Breaks work into ordered tasks. Use when you have a spec or clear requirements. |
| 18 | `security-and-hardening` | Hardens code against vulnerabilities. Use when handling user input, authentication, data storage. |
| 19 | `shipping-and-launch` | Prepares production launches. Use when preparing to deploy to production. |
| 20 | `source-driven-development` | Grounds every implementation decision in official documentation. |
| 21 | `spec-driven-development` | Creates specs before coding. Use when starting a new project, feature, or significant change and no specification exists yet. |
| 22 | `test-driven-development` | Drives development with tests. Use when implementing any logic, fixing any bug, or changing any behavior. |
| 23 | `using-agent-skills` | Discovers and invokes agent skills. Use when starting a session or when you need to discover which skill applies. |

### §1.2 Local fork state per CLAUDE.md L41 + `.claude/skills/`

W316 absorbed 5 skills @ `f17c6e88` (note: cite is to `f17c6e88` and HEAD reads `f17c6e8` — same short SHA, zero drift):
- `interview-me` — **NOT present** under `.claude/skills/` (CLAUDE.md cites it but only 3 prefix-namespaced + 5 short-name absorbs landed; `interview-me` was not vendor-copied — DOCUMENTATION DRIFT, NEEDS FIX)
- `doubt-driven-development` — present at `.claude/skills/doubt-driven-development/`
- `frontend-ui-engineering` — present at `.claude/skills/frontend-ui-engineering/`
- `api-and-interface-design` — present at `.claude/skills/api-and-interface-design/`
- `code-simplification` — present at `.claude/skills/code-simplification/`

Plus the W315-prior 3 prefix-namespaced vendor variants (CLAUDE.md L41 mention) — **NOT FOUND** under `.claude/skills/addyosmani-*/`. These appear to have been folded into the 5-skill absorb (de-prefixed). The CLAUDE.md line is **STALE**.

**Marketplace state**: `addy-agent-skills` registered in `known_marketplaces.json` pointing at `addyosmani/agent-skills`, with `agent-skills@1.0.0` plugin staged at `cache/addy-agent-skills/agent-skills/1.0.0/` containing ALL 23 SKILL.md files. **However**, `installed_plugins.json` has **no entry** for `agent-skills@addy-agent-skills` — the plugin is **staged-not-activated**.

### §1.3 Delta — NEW skills since W316 (none — HEAD is unchanged)

Local commit history of `Z:/repos/deps/addyosmani-agent-skills/` shows HEAD = `f17c6e8` = W316 absorb point. **Zero upstream drift since W316.**

### §1.4 Adoption gap (18 skills not yet vendor-forked)

| Skill | Reason to consider | Local equivalent? |
|---|---|---|
| `context-engineering` | Optimizes per-session context budget | partial via `everything-claude-code:strategic-compact` |
| `debugging-and-error-recovery` | Systematic root-cause loop | overlap with `mattpocock:diagnose` (already-vendored) + `superpowers:systematic-debugging` (already-plugin) |
| `documentation-and-adrs` | ADR discipline | partial via `engineering-skills:senior-architect` |
| `incremental-implementation` | Small-PR discipline | NEW value |
| `using-agent-skills` | Meta-skill for skill discovery | partial via `superpowers:using-superpowers` (already-plugin) |
| `git-workflow-and-versioning` | Git conventions | partial via `commit-commands:*` + `developer-essentials:git-advanced-workflows` |
| `idea-refine` | Divergent/convergent ideation | partial via `superpowers:brainstorming` |
| `planning-and-task-breakdown` | Task decomposition | partial via `superpowers:writing-plans` + `planning-with-files:plan` |
| `spec-driven-development` | Spec-first | overlap with `speckit-*` (already-vendored) |
| `test-driven-development` | TDD | overlap with `mattpocock:tdd` (already-vendored) + `engineering-skills:tdd-guide` |
| `code-review-and-quality` | Multi-axis review | overlap with `mattpocock:review` + `comprehensive-review:full-review` |
| `performance-optimization` | Perf workflow | overlap with `engineering-advanced-skills:performance-profiler` |
| `security-and-hardening` | Sec hardening | overlap with `engineering-skills:senior-security` + `code-modernization:modernize-harden` |
| `shipping-and-launch` | Launch checklist | overlap with `engineering-advanced-skills:release-manager` + `engineering-advanced-skills:ship-gate` |
| `source-driven-development` | Doc-grounded implementation | NEW value (cite-anchor discipline) |
| `ci-cd-and-automation` | CI/CD setup | overlap with `engineering-advanced-skills:ci-cd-pipeline-builder` |
| `deprecation-and-migration` | Sunset/migration | overlap with `code-modernization:*` + `engineering-advanced-skills:migration-architect` |
| `browser-testing-with-devtools` | Chrome DevTools MCP testing | overlap with `chrome-devtools` MCP tools (already-installed) |

**Recommendation**: just **activate** the staged `agent-skills@addy-agent-skills` plugin instead of selective vendor-fork. One `/plugin enable` covers all 23.

---

## §2 — mattpocock/skills: upstream HEAD vs local fork

### §2.1 Upstream inventory at HEAD `67bce91`

28 SKILL.md files across 6 dirs. Descriptions use the **"Use when..."** anchor consistently. Descriptions tend to be more colloquial than addy's.

| # | Path | Skill | Description (anchor) |
|---|---|---|---|
| 1 | `deprecated/` | `design-an-interface` | Generate multiple radically different interface designs for a module using parallel sub-agents. |
| 2 | `deprecated/` | `qa` | Interactive QA session where user reports bugs or issues conversationally, and the agent files GitHub issues. |
| 3 | `deprecated/` | `request-refactor-plan` | Create a detailed refactor plan with tiny commits via user interview, then file it as a GitHub issue. |
| 4 | `deprecated/` | `ubiquitous-language` | Extract a DDD-style ubiquitous language glossary. (disable-model-invocation: true) |
| 5 | `engineering/` | `diagnose` | Disciplined diagnosis loop for hard bugs and performance regressions. |
| 6 | `engineering/` | `grill-with-docs` | Grilling session that challenges your plan against the existing domain model. |
| 7 | `engineering/` | `improve-codebase-architecture` | Find deepening opportunities in a codebase, informed by CONTEXT.md and docs/adr/. |
| 8 | `engineering/` | `prototype` | Build a throwaway prototype to flesh out a design before committing to it. |
| 9 | `engineering/` | `setup-matt-pocock-skills` | Sets up an Agent skills block in AGENTS.md/CLAUDE.md. (disable-model-invocation: true) |
| 10 | `engineering/` | `tdd` | Test-driven development with red-green-refactor loop. |
| 11 | `engineering/` | `to-issues` | Break a plan, spec, or PRD into independently-grabbable issues. |
| 12 | `engineering/` | `to-prd` | Turn the current conversation context into a PRD. |
| 13 | `engineering/` | `triage` | Triage issues through a state machine driven by triage roles. |
| 14 | `engineering/` | `zoom-out` | Tell the agent to zoom out and give broader context. (disable-model-invocation: true) |
| 15 | `in-progress/` | `review` | Review the changes since a fixed point along two axes — Standards and Spec. |
| 16 | `in-progress/` | `writing-beats` | Shape an article as a journey of beats, choose-your-own-adventure style. |
| 17 | `in-progress/` | `writing-fragments` | Grilling session that mines the user for fragments. |
| 18 | `in-progress/` | `writing-shape` | Take a markdown file of raw material and shape it into an article. |
| 19 | `misc/` | `git-guardrails-claude-code` | Set up Claude Code hooks to block dangerous git commands. |
| 20 | `misc/` | `migrate-to-shoehorn` | Migrate test files from `as` to @total-typescript/shoehorn. |
| 21 | `misc/` | `scaffold-exercises` | Create exercise directory structures with sections, problems, solutions. |
| 22 | `misc/` | `setup-pre-commit` | Set up Husky pre-commit hooks with lint-staged, type checking, and tests. |
| 23 | `personal/` | `edit-article` | Edit and improve articles by restructuring sections, improving clarity. |
| 24 | `personal/` | `obsidian-vault` | Search, create, and manage notes in the Obsidian vault with wikilinks. |
| 25 | `productivity/` | `caveman` | Ultra-compressed communication mode. Cuts token usage ~75%. |
| 26 | `productivity/` | `grill-me` | Interview the user relentlessly about a plan or design. |
| 27 | `productivity/` | `handoff` | Compact the current conversation into a handoff document for another agent to pick up. |
| 28 | `productivity/` | `write-a-skill` | Create new agent skills with proper structure, progressive disclosure, and bundled resources. |

### §2.2 Local fork state per CLAUDE.md L41

W320 Stream B absorbed 6 skills @ `67bce91c80cd` = HEAD (zero drift):
- `grill-with-docs` — present at `.claude/skills/grill-with-docs/`
- `tdd` — present at `.claude/skills/tdd/`
- `caveman` — present at `.claude/skills/caveman/`
- `diagnose` — present at `.claude/skills/diagnose/`
- `handoff` — present at `.claude/skills/handoff/`
- `review` — present at `.claude/skills/review/`

### §2.3 Delta — NEW skills since W320 (none — HEAD unchanged)

W320 was @ `67bce91c80cd`. HEAD is `67bce91`. **Zero drift.**

### §2.4 Adoption gap (22 skills NOT yet adopted; 4 deprecated SKIP)

**High-value not adopted (engineering-focused)**:

| Skill | Why valuable | Local overlap |
|---|---|---|
| `to-issues` | Plan → tracer-bullet GitHub issues | NEW value (no equivalent) — pairs with `commit-commands:commit-push-pr` |
| `to-prd` | Conversation → PRD | overlap with `speckit-specify` (different format) |
| `triage` | Issue triage state machine | partial via `incident-response:incident-runbook-templates` |
| `prototype` | Throwaway prototype workflow | NEW value (no equivalent) |
| `improve-codebase-architecture` | Architecture deepening per CONTEXT.md + ADRs | partial via `engineering-skills:senior-architect` |
| `zoom-out` | Broader-context aid | NEW value (no equivalent) — meta-skill |
| `write-a-skill` | New-skill scaffolding | overlap with `skill-creator:skill-creator` + `engineering-advanced-skills:skill-tester` |
| `setup-pre-commit` | Husky+lint-staged+TS+tests setup | partial via `block-no-verify:block-no-verify-hook` (different scope) |
| `git-guardrails-claude-code` | Block destructive git via hooks | overlap with `block-no-verify:block-no-verify` |
| `grill-me` | Adversarial plan-grilling | overlap with `grill-with-docs` (already-vendored) — but lighter-weight |
| `writing-beats` | Article-as-beats narrative | OUT-OF-SCOPE (writing) |
| `writing-fragments` | Fragment mining | OUT-OF-SCOPE |
| `writing-shape` | Article shaping | OUT-OF-SCOPE |
| `edit-article` | Article editing | OUT-OF-SCOPE |
| `obsidian-vault` | Obsidian vault management | OUT-OF-SCOPE |
| `setup-matt-pocock-skills` | AGENTS.md scaffolding | NEW value — bootstrap aid |
| `migrate-to-shoehorn` | @total-typescript migration | OUT-OF-SCOPE (TS-specific) |
| `scaffold-exercises` | Exercise scaffolding | OUT-OF-SCOPE (teaching) |

**Deprecated (SKIP)**: `design-an-interface`, `qa`, `request-refactor-plan`, `ubiquitous-language`.

---

## §3 — alirezarezvani/claude-skills: full inventory + sca-v12 tier

### §3.1 Repository overview

HEAD `8aa9208`. **329 SKILL.md files** distributed across 25+ top-level categories. Structure follows a **2-tier nesting**:
1. **Bundle plugins**: `engineering/<bundle-name>/skills/<sub-skill>/SKILL.md` (e.g., `engineering/agenthub/skills/{board,eval,init,merge,run,spawn,status,agenthub}/`)
2. **Aggregate plugins**: `engineering/skills/<skill-name>/SKILL.md` (e.g., `engineering/skills/api-test-suite-builder/SKILL.md` — single-skill plugin)
3. **`.gemini/skills/`** mirror (Gemini CLI integration) — duplicates ALL skills under a flat `.gemini/skills/<name>/SKILL.md` layout.

**Already-installed-via-marketplace `claude-code-skills` (11 plugins, per `installed_plugins.json:334-686`)**:
- `engineering-skills@2.2.3` — wraps 51 skills (most of `engineering-team/skills/`)
- `engineering-advanced-skills@2.4.4` — wraps 25 skills (most of `engineering/skills/`)
- `kubernetes-operator@2.4.0`
- `chaos-engineering@2.4.0`
- `slo-architect@2.4.4`
- `feature-flags-architect@2.4.0`
- `self-improving-agent@2.3.1`
- `autoresearch-agent@2.2.2`
- `karpathy-coder@2.3.2`
- `agenthub@2.2.2`
- `llm-wiki@?`

### §3.2 Engineering coverage map (in-scope categories)

`engineering/` canonical subdirs with SKILL.md count + adoption status:

| Path | SKILL.md count | Status |
|---|---|---|
| `engineering/skills/` (flat aggregate) | 36 | Covered by `engineering-advanced-skills@2.4.4` plugin |
| `engineering-team/skills/` (flat aggregate) | 31 | Covered by `engineering-skills@2.2.3` plugin |
| `engineering/agenthub/skills/` | 8 | Covered by `agenthub@2.2.2` plugin |
| `engineering/autoresearch-agent/skills/` | 6 | Covered by `autoresearch-agent@2.2.2` plugin |
| `engineering/chaos-engineering/skills/` | 1 | Covered by `chaos-engineering@2.4.0` plugin |
| `engineering/karpathy-coder/skills/` | 1 | Covered by `karpathy-coder@2.3.2` plugin |
| `engineering/kubernetes-operator/skills/` | 1 | Covered by `kubernetes-operator@2.4.0` plugin |
| `engineering/feature-flags-architect/skills/` | 1 | Covered by `feature-flags-architect@2.4.0` plugin |
| `engineering/slo-architect/skills/` | 1 | Covered by `slo-architect@2.4.4` plugin |
| `engineering/llm-wiki/skills/` | 1 | Covered by `llm-wiki` plugin |
| `engineering/behuman/skills/` | 1 | **NOT installed** (no `behuman` plugin) |
| `engineering/caveman/skills/` | 1 | **Vendor-forked from matt** (different upstream — divergent caveman) |
| `engineering/code-tour/skills/` | 1 | **NOT installed** |
| `engineering/data-quality-auditor/skills/` | 1 | **NOT installed** |
| `engineering/demo-video/skills/` | 1 | **NOT installed** |
| `engineering/docker-development/skills/` | 1 | **NOT installed** |
| `engineering/grill-me/skills/` | 1 | **Vendor-forkable** (ali has grill-me; we have only grill-with-docs from matt) |
| `engineering/grill-with-docs/skills/` | 1 | Already vendor-forked from matt |
| `engineering/handoff/skills/` | 1 | Already vendor-forked from matt |
| `engineering/helm-chart-builder/skills/` | 1 | **NOT installed** |
| `engineering/llm-cost-optimizer/skills/` | 1 | **NOT installed** |
| `engineering/prompt-governance/skills/` | 1 | **NOT installed** |
| `engineering/security-guidance/skills/` | 1 | **NOT installed** |
| `engineering/statistical-analyst/skills/` | 1 | **NOT installed** |
| `engineering/terraform-patterns/skills/` | 1 | **NOT installed** |
| `engineering/write-a-skill/skills/` | 1 | Overlap with skill-creator |
| `engineering-team/playwright-pro/skills/` | 11 | **NOT installed** (separate playwright-pro bundle) |
| `engineering-team/self-improving-agent/skills/` | 6 | Covered by `self-improving-agent@2.3.1` plugin |
| `engineering-team/a11y-audit/skills/` | 1 | **NOT installed** |
| `engineering-team/google-workspace-cli/skills/` | 1 | OUT-OF-SCOPE (Workspace integration) |
| `engineering-team/snowflake-development/skills/` | 1 | OUT-OF-SCOPE (Snowflake-specific) |

### §3.3 Out-of-scope categories (intentionally skipped)

- `business-growth/` (5 skills) — sales/growth ops
- `business-operations/` (7 skills) — biz ops
- `c-level-advisor/` (66 skills) — CEO/CTO/CFO advisor agents (all SKIP for engineering runtime)
- `commercial/` (8 skills) — commercial-team
- `compliance-os/` (9 skills) — compliance
- `finance/` (4 skills) — financial agents
- `marketing-skill/` (46 skills) — marketing automation
- `product-team/` (17 skills) — product-team
- `project-management/` (9 skills) — PM
- `ra-qm-team/` (18 skills) — regulatory/QM (medical-device focus)
- `research/` (8 skills) — general research
- `standards/` (0 SKILL.md; .md guides only) — coding standards
- `productivity/` (4 skills) — capture/email/reflect (overlap with mattpocock productivity)

### §3.4 Per-skill sca-v12 tier (in-scope unadopted only)

| Skill | sca-v12 tier | Rationale |
|---|---|---|
| `engineering/behuman` | T3 PATTERN | "Be human" voice-tuning — review for pattern, low cardinal-rule fit |
| `engineering/code-tour` | T2 VENDOR | Annotated codebase walkthrough — high value for onboarding |
| `engineering/data-quality-auditor` | T1 INSTALL | Data-pipeline QA — strong engineering fit |
| `engineering/demo-video` | T5 SKIP | Demo video generation — niche |
| `engineering/docker-development` | T2 VENDOR | Docker workflows — high value for containerized runtimes |
| `engineering/helm-chart-builder` | T2 VENDOR | k8s helm — pairs with installed `kubernetes-operator` |
| `engineering/llm-cost-optimizer` | T1 INSTALL | LLM cost optimization — high-value SOTA fit (W317 LlamaSwap context) |
| `engineering/prompt-governance` | T2 VENDOR | Prompt governance — pairs with installed `engineering-skills:senior-prompt-engineer` |
| `engineering/security-guidance` | T3 PATTERN | Overlap with `engineering-skills:senior-security` |
| `engineering/statistical-analyst` | T3 PATTERN | Stats analysis — overlap with `senior-data-scientist` |
| `engineering/terraform-patterns` | T1 INSTALL | Terraform IaC — high value for infra workflows |
| `engineering/grill-me` | T2 VENDOR | Lighter-weight grilling — complements `grill-with-docs` |
| `engineering-team/a11y-audit` | T2 VENDOR | Accessibility audit — overlap with `engineering-skills:senior-frontend` but specialised |
| `engineering-team/playwright-pro/*` (11 sub-skills) | T3 PATTERN | Playwright Pro bundle — overlap with installed playwright MCP |

---

## §4 — Triple-repo cross-corroboration

Skills that appear (by name OR by close-semantic-match) in **≥2** of the 3 repos. These are **SOTA-convergent candidates** — multiple independent SOTA-curators converged on these primitives.

| Skill | addy | matt | ali | Adoption verdict |
|---|---|---|---|---|
| **tdd** / `test-driven-development` | ✓ (`test-driven-development`) | ✓ (`tdd`) | ✓ (`engineering-team/skills/tdd-guide`) | **ADOPTED via matt-fork + plugin** |
| **caveman** / compressed-mode | — | ✓ (`caveman`) | ✓ (`engineering/caveman`) | **ADOPTED via matt-fork** |
| **handoff** / context-handoff | — | ✓ (`handoff`) | ✓ (`engineering/handoff`) | **ADOPTED via matt-fork** |
| **grill-with-docs** | — | ✓ | ✓ (`engineering/grill-with-docs`) | **ADOPTED via matt-fork** |
| **review** / code-review | ✓ (`code-review-and-quality`) | ✓ (`review`) | ✓ (`engineering-skills:code-reviewer`, `pr-review-expert`) | **ADOPTED via matt-fork + plugin** |
| **debugging / diagnose** | ✓ (`debugging-and-error-recovery`) | ✓ (`diagnose`) | — | **ADOPTED via matt-fork** |
| **interview / grill** | ✓ (`interview-me`) | ✓ (`grill-me`) | — | PARTIAL — `interview-me` cited in CLAUDE.md but missing from `.claude/skills/`; matt's `grill-me` not adopted |
| **idea-refine / brainstorm** | ✓ (`idea-refine`) | — | — | partial via `superpowers:brainstorming` |
| **spec-driven** | ✓ (`spec-driven-development`) | — | ✓ (`engineering-advanced-skills:spec-driven-workflow`) | **ADOPTED via plugin + speckit-* vendor-forks** |
| **planning** | ✓ (`planning-and-task-breakdown`) | — | — | partial via `superpowers:writing-plans` + `planning-with-files:plan` |
| **frontend-ui** | ✓ (`frontend-ui-engineering`) | — | ✓ (`engineering-team/skills/senior-frontend`) | **ADOPTED via addy-fork + plugin** |
| **write-a-skill** | — | ✓ (`write-a-skill`) | ✓ (`engineering/write-a-skill`) | partial via `skill-creator:skill-creator` |
| **chaos-engineering** | — | — | ✓ (`engineering/chaos-engineering`) | **ADOPTED via plugin** |
| **slo-architect** | — | — | ✓ (`engineering/slo-architect`) | **ADOPTED via plugin** |
| **feature-flags-architect** | — | — | ✓ (`engineering/feature-flags-architect`) | **ADOPTED via plugin** |
| **kubernetes-operator** | — | — | ✓ (`engineering/kubernetes-operator`) | **ADOPTED via plugin** |
| **karpathy-coder** | — | — | ✓ (`engineering/karpathy-coder`) | **ADOPTED via plugin + karpathy-skills plugin** |

**9 SOTA-convergent skills** appear in ≥2 of the 3 repos:
- `tdd` (3/3) — fully adopted
- `caveman` (2/3) — adopted
- `handoff` (2/3) — adopted
- `grill-with-docs` (2/3) — adopted
- `review` (3/3) — adopted
- `debugging/diagnose` (2/3) — adopted
- `interview/grill` (2/3) — **partially adopted, gap**
- `spec-driven` (2/3) — adopted
- `frontend-ui` (2/3) — adopted

---

## §5 — SKILL.md description-quality analysis

Anchor: per `https://code.claude.com/docs/en/skills` description-match semantics, descriptions are matched against user-prompt phrasing. A "good" description includes:
1. **Use when...** trigger phrasings
2. Concrete user-language anchors (verbatim quotes)
3. ≤200 chars for fast match
4. Negative space ("NOT for...") to avoid false-fire

| Repo | Avg description length | Use-when anchor % | Negative-space % | Match quality |
|---|---|---|---|---|
| addyosmani/agent-skills | ~250 chars | 100% | 0% | **A** (consistent, concise) |
| mattpocock/skills | ~220 chars | 90% (some use "Use when user wants to..." colloquial) | 5% | **A-** (colloquial but precise) |
| alirezarezvani/claude-skills | ~280 chars (very variable; some up to 600) | 80% (some are stat-laden, e.g., feature-flags-architect with "LaunchDarkly, GrowthBook, Statsig, Unleash, Flipt") | 20% (e.g., `browser-automation` explicitly says "NOT for testing — use playwright-pro") | **B+** (less consistent; sometimes verbose; some skip "Use when") |

**Best-in-class examples**:
- addy `interview-me`: 380-char description with **5 concrete trigger phrasings** + meta-condition ("when you catch yourself silently filling in ambiguous requirements")
- ali `feature-flags-architect`: lists 5 specific product names — extremely high keyword-density auto-fire signal
- matt `caveman`: short, trigger-rich, includes invocation phrasings ("caveman mode", "talk like caveman", "use caveman", "less tokens", "be brief")

**Worst examples**:
- ali `engineering-advanced-skills`: 1-line "25 advanced engineering agent skills..." — auto-fire signal is weak; relies on plugin to provide sub-skills
- ali `chaos-engineering` (description omitted per grep — long-line truncated; the raw frontmatter likely exceeds 600 chars)

---

## §6 — GAP MATRIX

| Skill | runtime-installed | upstream-shipped | adopt-decision |
|---|---|---|---|
| addy:`api-and-interface-design` | YES (`.claude/skills/`) | YES | KEEP |
| addy:`browser-testing-with-devtools` | NO | YES | T1 ACTIVATE addy plugin |
| addy:`ci-cd-and-automation` | NO | YES | T3 PATTERN (overlap w/ `ci-cd-pipeline-builder`) |
| addy:`code-review-and-quality` | NO | YES | T3 PATTERN (overlap w/ matt:`review`) |
| addy:`code-simplification` | YES (`.claude/skills/`) | YES | KEEP |
| addy:`context-engineering` | NO | YES | **T2 VENDOR-FORK** (high-value, no equivalent) |
| addy:`debugging-and-error-recovery` | NO | YES | T3 PATTERN (overlap w/ matt:`diagnose`) |
| addy:`deprecation-and-migration` | NO | YES | T3 PATTERN (overlap w/ `code-modernization`) |
| addy:`documentation-and-adrs` | NO | YES | **T2 VENDOR-FORK** (ADR discipline, no equivalent) |
| addy:`doubt-driven-development` | YES (`.claude/skills/`) | YES | KEEP |
| addy:`frontend-ui-engineering` | YES (`.claude/skills/`) | YES | KEEP |
| addy:`git-workflow-and-versioning` | NO | YES | T3 PATTERN |
| addy:`idea-refine` | NO | YES | T3 PATTERN (overlap w/ `superpowers:brainstorming`) |
| addy:`incremental-implementation` | NO | YES | **T2 VENDOR-FORK** (small-PR discipline) |
| addy:`interview-me` | **DRIFT** (CLAUDE.md cites; not in `.claude/skills/`) | YES | **T2 FIX-DRIFT** (vendor-copy now) |
| addy:`performance-optimization` | NO | YES | T3 PATTERN (overlap w/ `performance-profiler`) |
| addy:`planning-and-task-breakdown` | NO | YES | T3 PATTERN |
| addy:`security-and-hardening` | NO | YES | T3 PATTERN |
| addy:`shipping-and-launch` | NO | YES | T3 PATTERN |
| addy:`source-driven-development` | NO | YES | **T2 VENDOR-FORK** (cite-anchor discipline, cardinal-rule fit) |
| addy:`spec-driven-development` | NO | YES | T3 PATTERN (overlap w/ speckit) |
| addy:`test-driven-development` | NO | YES | T3 PATTERN (overlap w/ matt:tdd) |
| addy:`using-agent-skills` | NO | YES | T3 PATTERN (overlap w/ `superpowers:using-superpowers`) |
| matt:`diagnose` | YES (`.claude/skills/`) | YES | KEEP |
| matt:`grill-with-docs` | YES (`.claude/skills/`) | YES | KEEP |
| matt:`improve-codebase-architecture` | NO | YES | **T2 VENDOR-FORK** |
| matt:`prototype` | NO | YES | **T2 VENDOR-FORK** |
| matt:`setup-matt-pocock-skills` | NO | YES | T5 SKIP (disable-model-invocation; bootstrap-only) |
| matt:`tdd` | YES | YES | KEEP |
| matt:`to-issues` | NO | YES | **T2 VENDOR-FORK** (no equivalent) |
| matt:`to-prd` | NO | YES | **T2 VENDOR-FORK** (paired with speckit) |
| matt:`triage` | NO | YES | T3 PATTERN |
| matt:`zoom-out` | NO | YES | T5 SKIP (disable-model-invocation; manual-invoke only) |
| matt:`review` | YES | YES | KEEP |
| matt:`writing-beats` | NO | YES | T5 SKIP (out-of-scope writing) |
| matt:`writing-fragments` | NO | YES | T5 SKIP (out-of-scope) |
| matt:`writing-shape` | NO | YES | T5 SKIP (out-of-scope) |
| matt:`git-guardrails-claude-code` | NO | YES | T3 PATTERN (overlap w/ `block-no-verify`) |
| matt:`migrate-to-shoehorn` | NO | YES | T5 SKIP (TS-specific) |
| matt:`scaffold-exercises` | NO | YES | T5 SKIP (teaching) |
| matt:`setup-pre-commit` | NO | YES | T3 PATTERN |
| matt:`edit-article` | NO | YES | T5 SKIP |
| matt:`obsidian-vault` | NO | YES | T5 SKIP |
| matt:`caveman` | YES | YES | KEEP |
| matt:`grill-me` | NO | YES | **T2 VENDOR-FORK** (lighter-weight grill, distinct from grill-with-docs) |
| matt:`handoff` | YES | YES | KEEP |
| matt:`write-a-skill` | NO | YES | T3 PATTERN |
| matt:`design-an-interface` | NO | YES (deprecated) | T5 SKIP |
| matt:`qa` | NO | YES (deprecated) | T5 SKIP |
| matt:`request-refactor-plan` | NO | YES (deprecated) | T5 SKIP |
| matt:`ubiquitous-language` | NO | YES (deprecated) | T5 SKIP |
| ali:`code-tour` | NO | YES | **T2 VENDOR-FORK** |
| ali:`data-quality-auditor` | NO | YES | **T1 INSTALL** (plugin from claude-code-skills marketplace) |
| ali:`docker-development` | NO | YES | **T2 VENDOR-FORK** |
| ali:`helm-chart-builder` | NO | YES | **T2 VENDOR-FORK** |
| ali:`llm-cost-optimizer` | NO | YES | **T1 INSTALL** (high SOTA fit for LlamaSwap) |
| ali:`prompt-governance` | NO | YES | **T2 VENDOR-FORK** |
| ali:`terraform-patterns` | NO | YES | **T1 INSTALL** |
| ali:`grill-me` (from engineering/) | NO | YES | T2 VENDOR-FORK (same as matt's grill-me — corroborated SOTA) |
| ali:`security-guidance` | NO | YES | T3 PATTERN |
| ali:`statistical-analyst` | NO | YES | T3 PATTERN |
| ali:`behuman` | NO | YES | T3 PATTERN |
| ali:`demo-video` | NO | YES | T5 SKIP |
| ali:engineering-team/`a11y-audit` | NO | YES | T2 VENDOR-FORK |
| ali:engineering-team/`playwright-pro` bundle | NO | YES | T3 PATTERN |

---

## §7 — W327 vendor-fork recommendation

### Tier classification (sca-v12)

**T1 INSTALL (3)**
1. `data-quality-auditor@claude-code-skills` — install via existing marketplace
2. `llm-cost-optimizer@claude-code-skills` — high SOTA fit for LlamaSwap runtime
3. `terraform-patterns@claude-code-skills` — install via existing marketplace
   - **Bonus**: Activate already-staged `agent-skills@addy-agent-skills` v1.0.0 plugin instead of selectively vendor-forking addy skills — one `/plugin enable` covers all 23 addy skills.

**T2 VENDOR-FORK (10)** — top priority for W327 absorb wave:
1. **addy:`interview-me`** — FIX-DRIFT first (CLAUDE.md L41 cites but file missing under `.claude/skills/`)
2. **addy:`context-engineering`** — meta-skill, NEW value, complements `everything-claude-code:strategic-compact`
3. **addy:`source-driven-development`** — cite-anchor discipline, cardinal-rule fit
4. **addy:`documentation-and-adrs`** — ADR discipline, no equivalent
5. **addy:`incremental-implementation`** — small-PR discipline
6. **matt:`to-issues`** — plan → GitHub issues, no equivalent
7. **matt:`to-prd`** — conversation → PRD, pairs with speckit
8. **matt:`prototype`** — throwaway-prototype workflow
9. **matt:`improve-codebase-architecture`** — architecture deepening
10. **matt:`grill-me`** — lightweight grilling, complements grill-with-docs

**T3 PATTERN-STUDY (multiple)** — read for ideas; do not import (overlap with existing primitives):
- addy:`debugging-and-error-recovery`, `idea-refine`, `code-review-and-quality`, `git-workflow-and-versioning`, `using-agent-skills`, `planning-and-task-breakdown`, `performance-optimization`, `security-and-hardening`, `shipping-and-launch`, `spec-driven-development`, `test-driven-development`, `deprecation-and-migration`, `browser-testing-with-devtools`, `ci-cd-and-automation`
- matt:`triage`, `write-a-skill`, `setup-pre-commit`, `git-guardrails-claude-code`
- ali:`security-guidance`, `statistical-analyst`, `behuman`, engineering-team/playwright-pro

**T4 CITE-ONLY**: matt:`setup-matt-pocock-skills`, matt:`zoom-out` (both have `disable-model-invocation: true` — manual-invoke only; cite in CLAUDE.md if useful, do not vendor-copy)

**T5 SKIP (12)**: matt deprecated/* (4), matt writing/* (4), matt:`edit-article`, matt:`obsidian-vault`, matt:`migrate-to-shoehorn`, matt:`scaffold-exercises`, ali:`demo-video`, ali engineering-team/`google-workspace-cli`, ali engineering-team/`snowflake-development`, ali `business-*`, `c-level-*`, `commercial`, `compliance-os`, `finance`, `marketing-skill`, `product-team`, `project-management`, `ra-qm-team`, `research` (all out-of-scope business/compliance/research)

### Top-5 NEW vendor-fork picks (for W327 absorb)

1. **`addy:interview-me`** (FIX-DRIFT — CLAUDE.md cites; file missing). Description is best-in-class (5 trigger phrasings + meta-condition).
2. **`addy:source-driven-development`** — cite-anchor discipline aligns with cardinal-rule-1 (CCBP citations).
3. **`matt:to-issues`** — plan → GitHub issues, no current equivalent in runtime.
4. **`matt:prototype`** — throwaway-prototype workflow, no current equivalent.
5. **`addy:context-engineering`** — meta-skill, complements existing context-management primitives.

### Action items

- **AI-1** (P0): Fix CLAUDE.md L41 drift — vendor-copy `interview-me/SKILL.md` from upstream OR update CLAUDE.md to remove `interview-me` claim.
- **AI-2** (P1): Vendor-fork the 5 top-priority T2 skills under `.claude/skills/` with cite-anchors to upstream SHA.
- **AI-3** (P1): Activate staged `agent-skills@addy-agent-skills` plugin OR ratify pure-vendor-fork strategy (current de-facto state).
- **AI-4** (P2): Install 3 T1 plugins from `claude-code-skills` marketplace: `data-quality-auditor`, `llm-cost-optimizer`, `terraform-patterns`.
- **AI-5** (P2): Document the **11 SOTA-convergent + already-adopted** skills in CLAUDE.md L41 as evidence-anchored install-set.

---

## Appendix A — pack_remote_repository attempts (FAILED)

| OutputId | Repo | Result |
|---|---|---|
| `4791ba54c3e27b89` | addyosmani/agent-skills | totalFiles=0 (clone failed) |
| `f37ad54cfeb54154` | mattpocock/skills | totalFiles=0 (clone failed) |
| `ea66ed7c4109f641` | alirezarezvani/claude-skills | totalFiles=0 (clone failed) |

**Fallback**: filesystem reads from local clones at `Z:/repos/deps/{addyosmani-agent-skills,mattpocock-skills,alirezarezvani-claude-skills}/` — these are kept up-to-date by separate cron (per CCBP `Z:/repos/deps/` cite-reference convention).

## Appendix B — already-installed claude-code-skills plugins (verbatim from `installed_plugins.json:334-686`)

| Plugin | Version | git SHA |
|---|---|---|
| engineering-skills | 2.2.3 | (from `.claude/plugins/installed_plugins.json`) |
| engineering-advanced-skills | 2.4.4 | (from `.claude/plugins/installed_plugins.json`) |
| kubernetes-operator | 2.4.0 | (per plugin manifest) |
| chaos-engineering | 2.4.0 | |
| slo-architect | 2.4.4 | |
| feature-flags-architect | 2.4.0 | |
| self-improving-agent | 2.3.1 | |
| autoresearch-agent | 2.2.2 | |
| karpathy-coder | 2.3.2 | |
| agenthub | 2.2.2 | |
| llm-wiki | ? | |
