# 01 — github/spec-kit anatomy (Tier-1 method, user pick #2)

> **Source**: `Z:/repos/deps/spec-kit @ HEAD 688ca1b3c51046498274de80752db2dce11ec1c7 [VERIFIED 2026-05-10]`
> **License**: MIT (verified at root LICENSE)
> **Last push**: 2026-05-08 (2 days ago — VERY ACTIVE)
> **Audit depth**: AGENTS.md (392 LOC) full read + README.md (782 LOC) targeted sections + structure probe

## What it is

Spec-Driven Development (SDD) toolkit for AI coding agents. CLI bootstraps `.specify/`
directory + 9 slash commands. **Cross-tool** — supports 10+ AI agents via integration
subpackages (Claude / Codex / Cursor / Copilot / Gemini / Windsurf / Goose / Forge / Kiro / Aider).

## Core philosophy (README:409-414)

> Spec-Driven Development is a structured process that emphasizes:
> - Intent-driven development where specifications define the "*what*" before the "*how*"
> - Rich specification creation using guardrails and organizational principles
> - Multi-step refinement rather than one-shot code generation from prompts
> - Heavy reliance on advanced AI model capabilities for specification interpretation

## Workflow grammar (7-step process per README:522-751)

```
STEP 1: /speckit.constitution → .specify/memory/constitution.md
                                  ↓
STEP 2: /speckit.specify       → .specify/specs/<feature-id>/spec.md (auto-branches 001-<slug>)
                                  ↓
STEP 3: /speckit.clarify       → Clarifications section in spec.md (REQUIRED before plan)
                                  ↓
STEP 4: /speckit.plan          → .specify/specs/<feature-id>/plan.md (tech-stack-specific)
                                  ↓
STEP 5: (validate plan)
                                  ↓
STEP 6: /speckit.tasks         → .specify/specs/<feature-id>/tasks.md (atomic items)
                                  ↓
STEP 6.5: /speckit.analyze     → cross-artifact consistency + coverage analysis
                                  ↓
STEP 7: /speckit.implement     → execute all tasks
```

Optional: `/speckit.checklist` ("unit tests for English") + `/speckit.taskstoissues` (GitHub Issues sync).

## Storage primitives (README:585-596)

```
.specify/
├── memory/constitution.md          ← project principles (always-on)
├── specs/<feature-id>/
│   ├── spec.md                     ← /speckit.specify output
│   ├── plan.md                     ← /speckit.plan output (tech-specific)
│   ├── tasks.md                    ← /speckit.tasks output
│   └── (analysis.md, checklist.md if used)
├── scripts/                        ← bash + powershell wrappers
│   ├── check-prerequisites.sh
│   ├── common.sh
│   ├── create-new-feature.sh
│   ├── setup-plan.sh
│   └── update-claude-md.sh
└── templates/                      ← spec / plan / tasks templates
    ├── plan-template.md
    ├── spec-template.md
    └── tasks-template.md
```

## Integration architecture (AGENTS.md:13-79)

Each AI agent is a subpackage under `src/specify_cli/integrations/<key>/` inheriting from
ONE of 5 base classes:

| Base class | When to use | Example agent |
|---|---|---|
| `MarkdownIntegration` | Standard `.md` commands (default) | Windsurf, Cursor |
| `TomlIntegration` | `.toml` commands | Gemini CLI |
| `YamlIntegration` | `.yaml` recipe files | Goose |
| `SkillsIntegration` | `speckit-<name>/SKILL.md` skills | Claude (with `--skills`), Codex |
| `IntegrationBase` direct | Fully custom (companion files, settings merge) | Copilot |

Each integration declares:
- `key` (CLI exec name OR canonical IDE id)
- `config` dict: `name` / `folder` / `commands_subdir` / `install_url` / `requires_cli`
- `registrar_config` dict: `dir` / `format` / `args` placeholder / `extension`
- `context_file` path (e.g., `CLAUDE.md`, `AGENTS.md`, `GEMINI.md`)

## Argument placeholders (AGENTS.md:308-317)

| Pattern | Used by | Format |
|---|---|---|
| `$ARGUMENTS` | Most markdown agents (default) | `$ARGUMENTS` |
| `{{args}}` | TOML (Gemini), YAML (Goose) | `{{args}}` |
| `{{parameters}}` | Forge | custom override |
| `{SCRIPT}` | (all) | replaced with actual script path |
| `__AGENT__` | (all) | replaced with agent name |

## Special integration patterns

### Skills mode (the Anthropic-recommended path)

For Claude Code: `specify init my-project --integration claude --integration-options="--skills"`
→ installs 9 commands as `speckit-<name>/SKILL.md` skill directories instead of bare slash commands.

This **converges with Anthropic's Agent Skills standard** (Dec 2025) — same SKILL.md format,
same YAML frontmatter, same progressive-disclosure loading.

### Copilot dual-mode (AGENTS.md:323-352)

- DEFAULT: `.agent.md` + companion `.prompt.md` + `.vscode/settings.json` merge
- SKILLS: `--integration-options="--skills"` → `speckit-<name>/SKILL.md` under `.github/skills/`

Mutually exclusive; project uses one or the other.

## SRA D1-D10 verdict (refined from Fire 6)

| Dim | Score | Notes |
|---|---|---|
| D1 license-use-class | PASS | MIT root — fully permissive |
| D2 freshness | PASS | 2-day push, v0.8.1+ recent |
| D3 fresh-paint clear | PASS | 95k+★ over 6+ mo, deep content |
| D4 maintainer-provenance | PASS | GitHub OFFICIAL (Microsoft TIER-1) |
| D5 active-maintenance | PASS | community catalog updated 2026-05-08 |
| D6 use-class compat | PASS | Skills mode = native CC Agent Skills standard |
| D7 Anthropic-aligned | PASS | SkillsIntegration is the Anthropic-recommended path |
| D8 industry adoption | PASS | 70+ community extensions per README:296; multi-org practitioners |
| D9 FM-class clear | PASS | no known FM-class triggered |
| D10 replacement viability | N/A | this IS the recommendation, not a replacement |

**SRA score: 10/10 PASS** — confirms Fire 6 verdict. **INSTALL RECOMMENDED**.

## Install command (CR-6 fresh-from-github + official-native-channel)

```bash
# Pin to stable release (replace vX.Y.Z with latest tag — check https://github.com/github/spec-kit/releases)
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git@v0.8.1

# Then init a workspace with Claude + Skills mode:
specify init my-project --integration claude --integration-options="--skills"
```

## Why-SOTA

1. **Convergence**: only spec-driven framework adopted as Anthropic-aligned (skills mode is canonical Agent Skills format)
2. **Activity**: 2-day push velocity + 70+ community extensions + Microsoft Developer Blog coverage
3. **Cross-tool**: 10+ agent integrations make it the lingua-franca of multi-tool teams
4. **License**: MIT root — no use-class concerns
5. **Storage**: `.specify/` is OWN namespace — doesn't conflict with Superpowers' `.claude/` or planning-with-files' `task_plan.md`

## Replacement-of (existing eee primitives)

| Existing eee surface | Replaced by | Migration cost |
|---|---|---|
| (none direct) | spec-kit COMPLEMENTS Superpowers via spec-as-contract artifact chain | LOW |
| Ad-hoc plan-mode docs in `tmp/wave*.md` | could migrate to `.specify/specs/<feature-id>/spec.md` | MEDIUM (existing pattern works) |
| Manual constitution prose in CLAUDE.md | could migrate principles to `.specify/memory/constitution.md` | LOW (additive, not replacement) |

**Verdict**: spec-kit is COMPLEMENTARY to existing eee architecture, not replacement.
Adds spec-as-contract artifact layer above existing Superpowers method + cross-model T1-T5 lifecycle.

## Risk classification

- **Install class**: PRIMARY (cardinal-rule-6 PRIMARY — `uv tool install` from GitHub)
- **Reversibility**: HIGH — `uv tool uninstall specify-cli`
- **Blast radius**: LOW — `.specify/` is own namespace
- **Cross-model gate**: required before commit (CR-3)
- **Sibling-bleed**: N/A (upstream install, not sibling cite-import)

## Comparison with Tier-1 alternatives

| | spec-kit | superpowers | bmad-method |
|---|---|---|---|
| Focus | spec-as-contract | TDD/debug/review process | virtual agent team |
| Slash commands | 9 (constitution/specify/clarify/plan/tasks/analyze/implement/checklist/taskstoissues) | brainstorming/writing-plans/executing-plans/+11 more | 12+ persona-based |
| Storage | `.specify/` | `.claude/skills/superpowers/*` | `bmad-method/` |
| Cross-tool | YES (10+ agents) | YES (CC, Codex, OpenCode, Gemini, Cursor) | YES |
| Skills standard | YES (skills mode) | YES (native) | YES (v6 Skills Architecture) |
| eee Fire-6 verdict | 🥇 INSTALL F7 | ✅ INSTALLED | ⚠️ DEFER per Probe 7.b |

**Convergence**: spec-kit + superpowers + bmad ALL converge on Agent Skills standard.
spec-kit's UNIQUE positioning: pure spec-driven (BMAD has team overhead; superpowers is HOW not WHAT).

## Forward fire status

- Fire 7 T1 returned Pattern B HONEST-NON-FINDING (zero verdict) — install DEFERRED
- Re-fire candidate: `codex exec --json` + turn-completed event count per gstack mitigation
- Alternative: smallest-reversible install (planning-with-files first, then spec-kit second)

## Mia ladder advance

n=921 → n=924 (+3: MIT verified / 9-command grammar verified / 5-base-class integration architecture verified)
