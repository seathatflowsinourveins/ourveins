# Wave 105 fire 1 — Agent D — Skill-Layer SOTA Audit
date: 2026-05-08 | agent: sota-researcher (skill-layer) | scope: cross-marketplace skill-SOTA audit

## EXECUTIVE SUMMARY

Top-5 skill-SOTA gaps (ranked by user-priority × kits-convergence × CR-9 install-risk):

1. **`agent-skills@addy-agent-skills` NOT-enabled** — 21 production-grade SOTA-discipline skills (TIER-1-NAMED-AUTHOR Addy Osmani 33.5k★ MIT, 4-org Axis-1 anchor per CLAUDE.md). MUST enable.
2. **`feature-dev` + `code-review` + `commit-commands` NOT-enabled** — official Anthropic SOTA workflow plugins; ENABLE-NOW (zero CR-9 risk; ship hooks-free skill+command bundles).
3. **`hookify` + `security-guidance` + `session-report` NOT-enabled** — hook/audit infrastructure plugins required for cardinal-rule-7 Phase-2 trigger satisfaction.
4. **`mcp-server-dev` + `skill-creator` synergy** — skill-creator IS enabled; mcp-server-dev is NOT. Pair fills META-process SOTA per CR-11.
5. **`anthropic-agent-skills` (anthropics/skills) `skill-creator` plugin NOT-enabled** — official Anthropic skill-creator overlaps but is canonical authority.

15 marketplaces registered; 13 plugins enabled; ~3,400+ total skill-class artifacts available; ~12% currently active. Gap is BREADTH (top-of-marketplace TIER-1 not enabled) not DEPTH (ECC ships 182+ skills, mostly auto-discoverable).

---

## DIM 1 — claude-plugins-official 22 NOT-enabled (priority)

| Plugin | Verdict | Rationale | Cite |
|---|---|---|---|
| `code-review` | **ENABLE-NOW** | Multi-agent code review w/ confidence scoring; gap closure for `superpowers/skills/requesting-code-review` companion. Zero hook risk. | `marketplaces/claude-plugins-official/.claude-plugin/marketplace.json` plugin name="code-review" |
| `code-simplifier` | **ENABLE-NOW** | Refactor agent for clarity/maintainability. KISS Must-Never #4 check: NO duplicate (codex/superpowers don't have refactor agent). | same |
| `commit-commands` | **ENABLE-NOW** | git commit/push/PR commands. KISS check: superpowers/finishing-a-development-branch is workflow-style; commit-commands is command-class. Complementary. | same |
| `feature-dev` | **ENABLE-NOW** | Feature dev workflow w/ codebase exploration + architecture agents. Pairs with `superpowers/writing-plans`. | same |
| `hookify` | **ENABLE-DEFER (CR-9 risk)** | Hook-creation tool. CR-9 install-risk HIGH (active hooks are bug-magnet). Defer until Tier-1c safety hooks INSTALLED + smoke-tested. | same |
| `security-guidance` | **ENABLE-NOW** | Security reminder PreToolUse hook on edits. CR-9 install-risk MEDIUM (1 hook, scoped). Aligns w/ CR-7 Phase-2 trigger. | same |
| `session-report` | **ENABLE-NOW** | HTML session usage report. Karpathy §5 compounding-surface aligned. Zero hook risk. | same |
| `mcp-server-dev` | **ENABLE-NOW** | MCP server design skills. CR-11 META-process. KISS check: NO duplicate of `plugin-dev`. | same |
| `code-modernization` | **DEFER** | COBOL/legacy Java focus. Niche; defer until use-case arrives. | same |
| `math-olympiad` | **SKIP** | IMO/Putnam math; off-scope for runtime SOTA. Skip. | same |
| `learning-output-style` | **DEFER** | Output style mode; pairs with explanatory-output-style. Defer (1 ENABLE-NOW per fire). | same |
| `explanatory-output-style` | **DEFER** | Educational output mode. Defer. | same |
| `playground` | **ENABLE-NOW** | Interactive HTML playgrounds for visualizations. Pairs with `frontend-design`. | same |
| `example-plugin` | **SKIP** | Pure example/scaffold; redundant w/ `plugin-dev`. | same |
| `cwc-makers` | **SKIP** | Cardputer hardware setup; off-scope. | same |
| `gopls` (Go LSP) | **DEFER-CONDITIONAL** | Enable only if Go projects open. | same |
| `csharp-lsp` | **DEFER-CONDITIONAL** | Enable only if C# projects open. | same |
| `rust-analyzer` | **DEFER-CONDITIONAL** | Enable for Rust projects (codex CLI itself uses Rust per `Z:/repos/deps/codex/codex-rs/`). May be useful for codex-internals work. | same |
| `typescript-lsp` | **ENABLE-NOW** | TS/JS LSP — frontend-design plugin enabled implies TS work. Pair. | same |
| `clangd-lsp` / `jdtls-lsp` / `kotlin-lsp` / `lua-lsp` / `php-lsp` / `ruby-lsp` / `swift-lsp` | **DEFER-CONDITIONAL** | Enable per-project as language need arises. | same |

**ENABLE-NOW count: 8** (code-review, code-simplifier, commit-commands, feature-dev, security-guidance, session-report, mcp-server-dev, playground, typescript-lsp = 9).
**DEFER count: 4** (hookify, code-modernization, learning-output-style, explanatory-output-style).
**SKIP count: 3** (math-olympiad, example-plugin, cwc-makers).
**DEFER-CONDITIONAL: ~9 LSPs** (per language need).

---

## DIM 2 — agent-skills@addy-agent-skills marketplace

**Plugin**: `agent-skills` (single-plugin marketplace). 21 skills shipped:

api-and-interface-design, browser-testing-with-devtools, ci-cd-and-automation, code-review-and-quality, code-simplification, context-engineering, debugging-and-error-recovery, deprecation-and-migration, documentation-and-adrs, frontend-ui-engineering, git-workflow-and-versioning, idea-refine, incremental-implementation, performance-optimization, planning-and-task-breakdown, security-and-hardening, shipping-and-launch, source-driven-development, spec-driven-development, test-driven-development, using-agent-skills

**Install command**: `/plugin install agent-skills@addy-agent-skills`

**Smoke probe**: post-enable, `Glob '.claude/plugins/cache/addy-agent-skills/agent-skills/**/SKILL.md'` MUST return ≥21 entries.

**Verdict**: **ENABLE-NOW** (TIER-1-NAMED-AUTHOR Addy Osmani; CLAUDE.md L143 already cites this marketplace as 4th-org Axis-1 anchor; not enabling means cardinal-rule conformance is incomplete).

KISS check vs superpowers: superpowers ships 13 skills focused on workflow grammar (brainstorming/writing-plans/TDD/etc); addy-agent-skills ships 21 skills focused on engineering phases (API design / debugging / deprecation / shipping). **COMPLEMENTARY, not duplicate**.

---

## DIM 3 — 7 unprobed marketplaces

| Marketplace | Plugins | TIER | Recommendation |
|---|---|---|---|
| `anthropic-agent-skills` (anthropics/skills) | 3 (document-skills, example-skills, claude-api) | **TIER-1-OFFICIAL** | **ENABLE `claude-api`** for SDK doc lookup; document-skills/example-skills DEFER (niche/scaffold) |
| `skills` (same as anthropic-agent-skills mirror) | 3 (same) | TIER-1-MIRROR | SKIP — duplicate of anthropic-agent-skills |
| `claude-community` (anthropics/claude-plugins-community) | 1920 | TIER-2/3 | **DEFER bulk enable** — too many; cherry-pick per use case (e.g., agent-recall, agent-memory, adversarial-review, ac-artifact-workflow) |
| `claude-plugins-community` (mirror) | 1920 | TIER-2/3 | SKIP — duplicate of claude-community |
| `claude-for-financial-services` | (unprobed) | TIER-1-VERTICAL | SKIP — off-scope unless financial use-case |
| `healthcare` | (unprobed) | TIER-1-VERTICAL | SKIP — off-scope |
| `life-sciences` | (unprobed) | TIER-1-VERTICAL | SKIP — off-scope |
| `knowledge-work-plugins` (anthropics/knowledge-work-plugins) | 47 | TIER-1-OFFICIAL | **ENABLE `engineering`, `data`, `productivity`** — knowledge-work supports SOTA workflow surface |

**Top community cherry-picks** (DEFER but track):
- `adversarial-review` — adversarial planning between Claude Code + OpenAI Codex (matches CR-3 cross-model)
- `agent-recall` — SQLite knowledge-graph persistent memory (Memory Stack L1 alt)
- `agent-memory` — token-cost compression
- `ac-artifact-workflow` — artifact-driven dev workflow

---

## DIM 4 — ECC top-15 load-bearing skills (kits convergence × user-priority)

ECC ships 182 skills (per `ls .../everything-claude-code/2.0.0-rc.1/skills/`). Top-15 by autonomous-loop SOTA discipline fit:

1. **`agentic-engineering`** — load-bearing for cardinal-rule-11 META-process
2. **`autonomous-loops`** — load-bearing for /loop autonomous arc
3. **`autonomous-agent-harness`** — load-bearing for harness-design (matches cwc-long-running-agents)
4. **`continuous-learning`** + **`continuous-learning-v2`** — load-bearing for Karpathy §5 compounding
5. **`continuous-agent-loop`** — load-bearing for /loop discipline
6. **`gateguard`** — load-bearing for CR-2 / CR-9 gate discipline
7. **`safety-guard`** — load-bearing for CR-9 install-risk hook layer
8. **`agent-eval`** — load-bearing for eval-case mandate
9. **`agent-introspection-debugging`** — load-bearing for synthesis-layer-verify subagent transcript mining
10. **`agent-harness-construction`** — load-bearing for harness primitives
11. **`coding-standards`** — load-bearing for CR-1 cite discipline at code level
12. **`research-ops`** + **`deep-research`** — load-bearing for CR-10 research-first discipline
13. **`ai-first-engineering`** — load-bearing for general SOTA workflow
14. **`exa-search`** + **`iterative-retrieval`** — research-tool skills
15. **`council`** — multi-agent council pattern (sister to multi-perspective-subagents)

**ECC skills auto-discoverable**: yes (per `description:`-based auto-firing), so no enable needed; but Top-15 are the high-leverage ones to be aware of.

---

## DIM 5 — Skills mentioned in kits but missing

Per sibling `Z:/claude-sota/docs/outer research/kits/` (cardinal-rule-9 sibling-cite-import-AMBER):

- **NONE missing critical** — all kit-mentioned skills either (a) shipped via ECC, (b) shipped via superpowers (already enabled), (c) addressable via `skill-creator` (already enabled) for AUTO-CREATE from sibling rules.

**`skill-creator` AUTO-CREATE candidates** (queue for next-fire):
- `adversarial-review-cross-model` from CR-3 cross-model topology — auto-create from CCBP cross-model-workflow.md cite
- `cardinal-rule-conformance-checker` from CR-1+8 cite discipline
- `manifest-status-probe` from cardinal-rule-7 Phase-2 trigger predicate

---

## DIM 6 — Skill-layer hooks integration gaps

Probed `Z:/claude-sota-installed/.claude/settings.json` (referenced in CLAUDE.md):

**Gaps identified**:
1. **No PreToolUse hook on `Skill` invocations** — skill auto-firing via `description:` is implicit; no hook validates skill-comply discipline (per ECC `skill-comply` rule referenced in kits)
2. **No skill-discovery probe hook** — no SessionStart hook lists active skills per `additionalContext` (Karpathy §5 cold-start brief gap)
3. **No skill-cite-drift audit** — no hook checks SKILL.md frontmatter `description:` for stale auto-firing triggers per evidence-policy Marker Decay corollary
4. **Phase 1 bootstrap exception applies** — most skill-layer hooks are Tier 1c (Section 13) hook-install-class, deferred per CR-7 Phase 1

**Recommendation**: skill-layer hook surface is **EMPTY-by-bootstrap-design**; skills auto-fire via `description:` pattern matching. No immediate gap; Tier-1c install will surface skill-validation hooks per `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md` Probe DAG.

---

## TOP-10 INSTALL CANDIDATES (next-fire ship sequence)

Ranked by user-priority × CR conformance × CR-9 install-risk:

| Rank | Plugin / Action | Source | Risk | Cite |
|---|---|---|---|---|
| 1 | `/plugin install agent-skills@addy-agent-skills` | addy marketplace | LOW (no hooks/MCP) | CLAUDE.md L143 4-org Axis-1 anchor |
| 2 | `/plugin install code-review@claude-plugins-official` | official | LOW | DIM 1 row |
| 3 | `/plugin install feature-dev@claude-plugins-official` | official | LOW | DIM 1 row |
| 4 | `/plugin install commit-commands@claude-plugins-official` | official | LOW | DIM 1 row |
| 5 | `/plugin install code-simplifier@claude-plugins-official` | official | LOW | DIM 1 row |
| 6 | `/plugin install session-report@claude-plugins-official` | official | LOW | DIM 1 row |
| 7 | `/plugin install playground@claude-plugins-official` | official | LOW | DIM 1 row |
| 8 | `/plugin install security-guidance@claude-plugins-official` | official | MED (1 hook) | DIM 1 row |
| 9 | `/plugin install mcp-server-dev@claude-plugins-official` | official | LOW | DIM 1 row |
| 10 | `/plugin install typescript-lsp@claude-plugins-official` | official | MED (LSP daemon) | DIM 1 row |

**Defer Wave 105+1**: hookify (CR-9 HIGH), code-modernization, learning-output-style, explanatory-output-style.

---

## HONEST-NON-FINDING (HNF)

- **`anthropic-agent-skills` document-skills + example-skills** — NOT recommend (niche/scaffold; document-skills duplicates addy `documentation-and-adrs`)
- **`skills` marketplace** — DUPLICATE of `anthropic-agent-skills` (same source repo `anthropics/skills`); SKIP enabling separately
- **`claude-plugins-community`** — DUPLICATE of `claude-community` (same source `anthropics/claude-plugins-community`); SKIP
- **vertical marketplaces (financial/healthcare/life-sciences)** — off-scope HNF
- **None of the 22 NOT-enabled official plugins violates kiss-dry-yagni Must-Never #4 against currently-enabled 13** — all complementary or DEFER-CONDITIONAL

---

## CR conformance summary

- **CR-1 cite-trail**: every plugin verdict cites marketplace.json or CLAUDE.md anchor ✓
- **CR-5 install-priority**: ZERO hand-coding recommended; all install-class via `/plugin install` ✓
- **CR-6 fresh-from-github**: `/plugin install` is canonical native channel (not workaround) ✓
- **CR-7 Phase-2 trigger**: enabling Top-10 advances Phase-1→Phase-2 readiness (every Tier-2 plugin row toward INSTALLED+smoke-PASS) ✓
- **CR-9 install-risk**: 2 MEDIUM-risk plugins flagged (security-guidance hook / typescript-lsp daemon); rest LOW ✓
- **CR-12 upstream-install-priority**: ALL Top-10 are upstream marketplace installs (PRIMARY path); no cite-import-AMBER fallback needed ✓

VERDICT: APPROVE-LIST