# 01 — Verbatim External SOTA Research (May 2026 — user-delivered)

> **Purpose**: capture the user's external SOTA research synthesis VERBATIM for local
> tracking. This is the AUTHORITATIVE source-of-truth for Fire 23 cross-walk.
> **Source class**: TIER-2 external user-curated synthesis (NOT Anthropic-authored;
> not codex-verified; user-curated from multiple independent reviews self.md, Redwerk,
> mejba.me, Firecrawl, Martin Fowler, libhunt).
> **Date delivered**: 2026-05-10 (this fire trigger)

## Headline finding

> "The big shift since late 2025: **Anthropic released the Agent Skills standard in
> December 2025** as an open spec adopted by Codex, Cursor, Gemini CLI, Antigravity,
> and Windsurf. Skills are now the canonical way to package markdown-driven workflows —
> folders containing a `SKILL.md` with YAML frontmatter, loaded *progressively*
> (~100 tokens per skill at session start, full body only when triggered). Plugins
> bundle skills + commands + agents + MCP servers."

## The pyramid

```
                    [ Anthropic foundation ]
              CLAUDE.md  +  anthropics/skills  +  Plan Mode
                            |
              ┌─────────────┼─────────────┐
              ▼             ▼             ▼
         [ Method ]   [ PM system ]   [ Standards ]
         Superpowers     CCPM         Agent OS v3
         Spec-Kit        Task Master
         BMAD v6
              │
              ▼
        [ Aggregators / discovery ]
        claudemarketplaces.com, awesome-claude-skills, SkillsMP
```

**Anti-pattern callout**: *"The mistake everyone makes is installing from the bottom. Build up."*

## Tier 0 — Foundation (run this even if you install nothing else)

| # | Item | URL | Why |
|---|---|---|---|
| 1 | **Anthropic's `CLAUDE.md` pattern** | `claude.com/blog/using-claude-md-files` | Project-level always-on memory. Setup, conventions, "always X / never Y" |
| 2 | **`anthropics/skills`** | `github.com/anthropics/skills` | Reference skills (docx, pdf, pptx, xlsx, brand-guidelines, skill-creator). Read `skill-creator/SKILL.md` before authoring your own |
| 3 | **`anthropics/claude-plugins-official`** | `github.com/anthropics/claude-plugins-official` | Auto-registered marketplace. Source for `commit-commands`, `code-review`, `feature-dev`, `frontend-design`, `pr-review-toolkit` |
| 4 | **Plan Mode + checkpoints** | built into Claude Code | Shift+Tab to plan, Ctrl+G to edit plan in editor, double-Esc to rewind. Per Anthropic's own best-practices doc, this is the recommended planning primitive in 2026 |

> "That stack alone covers 70% of what people install plugins for."

## Tier 1 — Pick ONE methodology framework (mutually exclusive)

### 🥇 Superpowers (`obra/superpowers`) — SOTA pick if you want one thing

- Built by Jesse Vincent at Prime Radiant
- Available in Anthropic's official marketplace
- Core loop: brainstorm → write-plan → execute-plan
- Auto-triggered skills for TDD (RED-GREEN-REFACTOR enforced — Claude literally deletes
  code written before tests), root-cause debugging, subagent-driven code review,
  worktree management
- Multiple libhunt reviewers rank it most-installed framework
- Cross-tool: Claude Code, Codex, OpenCode, Gemini CLI, Cursor

Install:
```
/plugin marketplace add obra/superpowers-marketplace
/plugin install superpowers@superpowers-marketplace
```

### 🥈 GitHub Spec-Kit (`github/spec-kit`) — SOTA pick if you want rigor

- Most rigorous spec-driven workflow
- 2026 default for "specs as the contract"
- Flow: constitution → specify → clarify → plan → tasks → analyze → implement
- Each step writes to `.specify/specs/<feature>/`
- Now ships with SkillsIntegration mode for Claude Code
- 70+ community extensions
- Microsoft Developer Blog publishes about it
- v0.8.1 currently

Install:
```
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git
specify init my-project --integration claude --integration-options="--skills"
```

### 🥉 BMAD-METHOD v6 (`bmad-code-org/BMAD-METHOD`) — SOTA pick for virtual team

- "Build More Architect Dreams"
- 12+ specialized agent personas (Analyst, PM, Architect, Scrum Master, Dev, QA, UX...)
- Two-phase model: agentic planning, then context-engineered story files passed Scrum-Master → Dev
- V6 introduced Skills Architecture + more expansion-pack-friendly (game dev, marketing, ML)
- Heavier than the other two — worth it for larger projects or teams

### When to pick which

| Scenario | Pick |
|---|---|
| Solo / small-team wanting invisible best practices auto-applied | Superpowers |
| Regulated, reviewable work where spec must be the artifact | Spec-Kit |
| Multi-role workflows wanting explicit handoffs | BMAD |

## Tier 2 — Pick ONE project-management layer

### 🥇 CCPM (`automazeio/ccpm`) — SOTA for files-as-source-of-truth

- PRD → epic → tasks, all plain markdown under `.claude/prds/` and `.claude/epics/<feature>/`
- Optional GitHub Issues sync
- Each task gets `acceptance_criteria`, `effort`, `depends_on`, `parallel`, `conflicts_with` metadata
- Agent Skills standard, harness-agnostic
- "This is the cleanest 'markdown is the database' implementation"

### 🥈 Task Master (`eyaltoledano/claude-task-master`) — SOTA for AI-driven task generation

- Other heavyweight
- Lives in `.taskmaster/`
- Parses PRDs into structured tasks with research-backed expansion (Perplexity integration)
- MCP-native, slash commands, `task-master start <id>` auto-launches Claude Code with full task context
- Stronger if you want AI to *generate and decompose* tasks
- CCPM is stronger if you want the artifacts cleanly versioned

### 🥉 Planning-with-files (`OthmanAdi/planning-with-files`) — minimalist pick

- Cleanest implementation of Manus "markdown-as-working-memory" pattern
- Just `task_plan.md` + `findings.md` + `progress.md`
- `/plan` and `/start` commands
- Hash-attestation for plans
- If CCPM and Task Master feel like overkill, this is the right starting point

## Tier 3 — Standards & memory layers (orthogonal, install both if relevant)

### Agent OS v3 (`buildermethods/agent-os`) — standards injection

- v3 **retired** its own implementation/orchestration phases and now defers to Claude Code's Plan Mode
- Strongest function: discovering, deploying, and indexing your codebase's standards as Claude Code Skills via `/inject-standards` and `/shape-spec`
- Use as standards layer alongside any Tier 1 framework

### Claude Memory Bank (`russbeye/claude-memory-bank`) — persistent project knowledge

- Structured memory in `.claude/memory_bank/` with categories for `decisions/`, `patterns/`, `architecture/`, `troubleshooting/`
- JIT retrieval via `/context-query` rather than loading everything
- 12 specialized memory agents
- Right answer for long-running projects where you need queryable institutional knowledge across sessions

## Tier 4 — Curated skill libraries (cherry-pick, never install whole)

In approximate order of curation quality:

| # | Library | Notes |
|---|---|---|
| 1 | `ComposioHQ/awesome-claude-skills` | Best-curated awesome-list |
| 2 | `travisvn/awesome-claude-skills` | Best-curated awesome-list (sister) |
| 3 | `alirezarezvani/claude-skills` | 232+ skills, 5,200+ stars, organized by domain (engineering, product, marketing, finance, C-level) |
| 4 | `anthropics/claude-plugins-official` marketplace | Vetted first-party plugins |
| 5 | `claudemarketplaces.com` | Discovery UI |
| 6 | `skillsmp.com` | Discovery UI |

## Tier 5 — Reference (read once, then bake into your own setup)

| # | Item | Why |
|---|---|---|
| 1 | `Piebald-AI/claude-code-system-prompts` | Anthropic's own system prompts, builtin tool descriptions, sub-agent prompts (Plan/Explore/Task), CLAUDE.md generation prompts. **Single best reference for understanding *how* Claude Code actually thinks.** Read this and you'll write better skills |
| 2 | Anthropic's official docs | `code.claude.com/docs/en/skills` (skills authoring), `code.claude.com/docs/en/best-practices` (planning, todos, scoping) |

## The opinionated SOTA stack (May 2026)

> "For most people, this is the answer:"

```
Foundation:  CLAUDE.md  +  anthropics/skills  +  built-in Plan Mode
Method:      Superpowers
Project:     CCPM
Standards:   Agent OS v3
```

**4 installs total.**

> "Every author of a 50-plugin 'stack' eventually writes a follow-up admitting they
> shipped half of them. The consensus across multiple 2026 review articles (self.md,
> Redwerk, mejba.me, Firecrawl) is the same: **2–3 active plugins, never more**, because
> each one consumes context baseline. Anthropic's own engineers preach the same."

**Bare-minimum SOTA**: `CLAUDE.md + Superpowers`. Add CCPM the moment you're juggling
more than one feature stream.

## What's NOT SOTA anymore

| Anti-pattern | Why retired |
|---|---|
| Heavyweight orchestration packs (50+ skills, "full agile team in a plugin") | Context bloat is a real cost; 2026 consensus is they hurt more than they help |
| Custom planning systems that ignore Plan Mode | Plan Mode + checkpoints + `/rewind` ate that lane. Agent OS v3 explicitly retired its implementation phase |
| Cursor-rules-style global instructions packed into CLAUDE.md | New ergonomic: small CLAUDE.md + many skills + one method framework. CLAUDE.md = "always-on context"; skills = "on-demand behavior" |

## Honest caveat from the field (Martin Fowler review)

> "Martin Fowler's site published a careful review (`exploring-gen-ai/sdd-3-tools.html`)
> noting that even with Spec-Kit / Kiro / BMAD, agents frequently *don't* follow all the
> markdown — bigger context windows don't mean better attention. The pattern is real,
> the tools help, but a small precise CLAUDE.md you wrote yourself often outperforms a
> bloated framework you didn't."

## Closing offer (NOT yet acted upon)

User offered to generate starter pack: CLAUDE.md template + 3 custom slash commands +
minimal `.claude/` skeleton wired for SOTA stack, tuned for solo dev / team / client work.

eee runtime status: NOT a starter pack consumer — eee has 21 plugins + 1556 SKILL.md
+ Wave 134's 100% cross-model verified architecture. Starter-pack offer is APPLICABLE
to NEW projects, not eee runtime.

## Cite trail

- Source: user turn input 2026-05-10 (this fire trigger)
- Cross-referenced reviews cited inline: self.md, Redwerk, mejba.me, Firecrawl, libhunt, Martin Fowler `exploring-gen-ai/sdd-3-tools.html`
- Source class: TIER-2 user-curated synthesis from independent reviews
- Verification status: NOT YET cross-model GPT-5.5 verified (Fire 24 candidate per Path P recipe)

## Mia ladder advance

n=1472 → n=1480 (+8: verbatim capture / 5-tier pyramid documented / Tier 0 4 items / Tier 1 3 frameworks with scenario picker / Tier 2 3 PM layers / Tier 3 standards+memory / Tier 4 6 libraries / Tier 5 reference)
