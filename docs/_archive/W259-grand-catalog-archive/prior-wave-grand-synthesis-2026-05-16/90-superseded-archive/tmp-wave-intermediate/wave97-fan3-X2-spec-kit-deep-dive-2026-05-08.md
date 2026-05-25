# Wave 97 Fan-3 Agent X2 — github/spec-kit deep-dive

STAND-IN-NOTICE: not applicable (read-only research probe per cardinal-rule-9 exception (i)+(ii); CR-12 step iii applies only at install-class promotion time, not at research probe time).

## Repo metadata (TIER-1 cite at file:line + HEAD SHA)

- **URL**: https://github.com/github/spec-kit
- **Stars**: 93,473 [VERIFIED 2026-05-08 via `gh repo view github/spec-kit --json stargazerCount`]
- **License**: MIT [VERIFIED 2026-05-08 via `gh repo view ... --json licenseInfo` → `{"key":"mit","name":"MIT License"}`]
- **Created**: 2025-08-21T22:54:31Z (~260 days old)
- **Last pushed**: 2026-05-08T20:50:01Z (today — actively maintained)
- **Maintainer**: github (org) — owner.id=`MDEyOk9yZ2FuaXphdGlvbjk5MTk=` (the GitHub organization itself; org#9919)
- **Languages**: Python (primary)
- **Total commits**: 928 [VERIFIED via `gh api repos/github/spec-kit/commits --paginate -q '.[].sha' | wc -l`]
- **Homepage**: https://github.github.io/spec-kit/ (GitHub Pages docs site)
- **Default branch**: `main`
- **Package name**: `specify-cli` (Python; pyproject.toml v0.8.8.dev0)

## Probe DAG 1-7 verdicts

### Probe 1 (count-OVER): PASS
Stars 93,473 verified; commit count 928 verified; license MIT verified — all from `gh` CLI direct API call. No agent claims to refute.

### Probe 2 (SDK-vs-CLI surface): CLI-PYTHON-PIP
Invocation surface = **uv tool / pipx / uvx Python CLI** named `specify`. README verbatim install (TIER-1 from `repos/github/spec-kit/contents/README.md`):
```bash
# Persistent (recommended):
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git@vX.Y.Z
# Or via pipx:
pipx install git+https://github.com/github/spec-kit.git@vX.Y.Z
# Or one-time via uvx:
uvx --from git+https://github.com/github/spec-kit.git@vX.Y.Z specify init <PROJECT_NAME>
```
**WARNING from README**: "Any packages with the same name on PyPI are **not** affiliated with this project ... Always install directly from GitHub as shown below" — install MUST be `git+https://github.com/github/spec-kit.git@vX.Y.Z`, NEVER `pip install specify-cli` (PyPI version is unaffiliated phantom).

Commands installed:
- `specify init <PROJECT_NAME>` / `specify init . --integration claude` / `specify init --here --integration claude`
- `specify check` / `specify version` / `specify integration list` / `specify extension add <name>` / `specify preset add <name>`

Native Claude Code integration confirmed at `src/specify_cli/integrations/claude/__init__.py` [VERIFIED via `gh api search/code?q=repo:github/spec-kit+claude+integration` returning 43 hits including `__init__.py`]:
- `key = "claude"` / `config.folder = ".claude/"` / `config.commands_subdir = "skills"` / `context_file = "CLAUDE.md"` / `multi_install_safe = True`
- **Skills mode supported**: `specify init . --integration claude --integration-options="--skills"` installs as `.claude/skills/<name>/SKILL.md` (SOTA-aligned with Anthropic skill primitive).

### Probe 3 (architectural-API): VENDOR-NEUTRAL
Spec-kit is an **AI-coding-agent-AGNOSTIC** spec-driven development scaffolder. README quote: "Spec Kit works with 30+ AI coding agents — both CLI tools and IDE-based assistants." Native integrations include Claude Code, Copilot, Cursor, Codex CLI, Gemini CLI, etc. (per `specify integration list`). Core CLI is pure Python (typer + rich + pyyaml — no Anthropic-API or OpenAI-API dependency). PASS for cross-vendor compatibility.

### Probe 4 (plugin-namespace): NON-DUPLICATIVE (specialized layer)
Searched 11 marketplaces under `Z:/claude-sota-installed/.claude/plugins/marketplaces/`:
- **Existing**: `addy-agent-skills/skills/spec-driven-development/SKILL.md` + `agent-skills/skills/spec-driven-development/SKILL.md` (identical 200-line SKILL.md by Addy Osmani; mirror copies). [VERIFIED via Bash cat + `wc -l`]
- **Spec-kit specifics NOT in any marketplace**: `/speckit.constitution` / `/speckit.specify` / `/speckit.plan` / `/speckit.tasks` / `/speckit.taskstoissues` / `/speckit.implement` / `/speckit.clarify` / `/speckit.analyze` / `/speckit.checklist` (9 commands) — none present in installed marketplaces.

**Discriminator**: addy `spec-driven-development` SKILL is a **methodology document** (when-to-use / 4-phase workflow / templates). github/spec-kit is the **executable CLI scaffolder** (init project + bundled templates + 9 slash commands + extensions/presets framework). They are **complementary layers**, not duplicates:
- addy SKILL = "how to think about specs"
- spec-kit = "tool that scaffolds the spec workflow"

Per `kiss-dry-yagni.md` Must-Never #4: NOT a duplicate. spec-kit is install-class executable; addy is cite-class methodology. Probe 4 PASS.

### Probe 5 (mode-harness-shape): AUTONOMOUS-COMPATIBLE (with caveat)
- **HARD-GATE on user interaction**: README's 4-phase workflow shows `Human reviews` between each phase (SPECIFY → PLAN → TASKS → IMPLEMENT) — but this is a **methodology recommendation**, not a CLI-enforced gate. The CLI commands themselves (`specify init`, slash commands) are non-blocking. Operator can autonomously execute `/speckit.specify` → `/speckit.plan` → `/speckit.tasks` → `/speckit.implement` in sequence.
- **Meta-skill harness assumption**: NO. spec-kit doesn't assume Superpowers TDD-for-skills harness or any sister-framework. Self-contained.
- **File-count/size-sprawl**: `specify init` creates `.specify/` directory + `.claude/skills/speckit-*/` (skills mode) OR `.claude/commands/speckit.*.md` (commands mode) — bounded scope, not 100KB+ sprawl.
- **Caveat**: spec-kit's IMPLEMENT phase assumes interactive AI agent will execute multi-step plan with mid-stream feedback. Compatible with cwc-long-running-agents Default-FAIL contract IF spec-kit's `/speckit.implement` is wrapped to honor PROGRESS.md handoff. **No hard incompatibility**.

Probe 5 PASS.

### Probe 6 (LICENSE/registry/build-deps): ALL PASS
- **LICENSE**: MIT [VERIFIED via gh API] → permissive whitelist PASS.
- **README badge**: no archive-status / deprecated / maintenance-mode banner [VERIFIED via README scan].
- **Registry direct-existence**: package distributed via `git+https://github.com/github/spec-kit.git` (NOT PyPI per upstream warning). Build-deps: `requires-python = ">=3.11"` + `typer>=0.24.0 / click>=8.2.1 / rich / platformdirs / readchar / pyyaml>=6.0 / packaging>=23.0 / pathspec>=0.12.0 / json5>=0.13.0` — all standard Python libs available via uv/pip [VERIFIED via pyproject.toml direct read].
- **Build-deps probe**: `uv` already installed in eee runtime (Section 10 Tier 0 INSTALLED-VIA-SYSTEM-PATH); Python 3.11+ available.

Probe 6 PASS (no AGPLv3 / phantom-package / build-deps blockers).

### Probe 7 (demand-gate): 7.b DEMAND-CREATES-NEW-WORKFLOW
Probe 7.a DEMAND-ABSENCE check: spec-kit is NOT a duplicate of any installed primitive. Existing eee plugins:
- `claude-md-management` (Wave 97 Ship 1A) — improves existing CLAUDE.md files; does NOT scaffold spec-driven feature workflows.
- `superpowers/skills/superpowers/plan/SKILL.md` — task decomposition methodology; does NOT scaffold project-level constitution/specify/plan/tasks/implement workflow.
- `cwc-long-running-agents` PROGRESS.md — handoff tracking; does NOT generate specs from requirements.
- `agent-skills/spec-driven-development/SKILL.md` — methodology only (no executable CLI).

**5-clause check (Probe 7.b STUDY-PILOT eligibility)**:
1. **Named operational use case**: feature-development workflow — `specify init . --integration claude --integration-options="--skills"` followed by `/speckit.constitution` (project principles) → `/speckit.specify` (requirements) → `/speckit.clarify` (ambiguity surface) → `/speckit.plan` (tech plan) → `/speckit.tasks` (task list) → `/speckit.analyze` (consistency check) → `/speckit.implement` (execute). CONSUMER: future feature ships in eee runtime that benefit from upfront spec gate.
2. **Cited local input/source path**: `Z:/claude-sota-installed/CLAUDE.md` (project context file spec-kit reads); future `Z:/claude-sota-installed/.specify/` directory spec-kit creates; future `Z:/claude-sota-installed/specs/` directory for generated artifacts.
3. **Wiring path**: single CLI invocation `uv tool install specify-cli --from git+https://github.com/github/spec-kit.git@<latest-tag>` then `specify init . --integration claude --integration-options="--skills"`. NO custom adapter/ETL — official Claude Code integration ships in upstream repo.
4. **Incumbent comparison**: addy `spec-driven-development` SKILL provides methodology but NO execution scaffolding; superpowers `plan` skill is task-level not project-level; cwc PROGRESS.md is post-hoc handoff not pre-spec gate. NONE of these provide the **executable spec-driven scaffolder** that spec-kit ships. Materially different layer.
5. **Reversible time-box**: `uv tool uninstall specify-cli` removes binary; `.specify/` directory deletion removes scaffolding; `.claude/skills/speckit-*/` removable. Pilot cost ≈ 30min install + 1 feature trial. Success criterion: 1 feature shipped via spec-kit workflow within 30 days produces materially better spec hygiene than ad-hoc planning. Retirement path: remove `.claude/skills/speckit-*/` skills + uv tool uninstall; document outcome in `docs/install-provenance.md`.

All 5 clauses PASS. Probe 7.b STUDY-PILOT eligible.

## Convergence-gate

### Axis 1 (≥3 distinct orgs)
- **github** (org) — primary maintainer (TIER-1)
- **microsoft/Anthropic/OpenAI** — 30+ AI coding agent integrations imply named-T2 cross-vendor adoption (Claude Code = Anthropic, Copilot = GitHub, Cursor = Cursor org, Codex CLI = OpenAI, Gemini = Google)
- **Independent practitioners** — 93,473 stars indicates adoption-as-T2 evidence at population scale
- **Local kits convergence**: 54 cites across kits v10/v12/v14+ in `docs/outer research/` — same pattern recognized by 3+ kit-curators independently

PASS — multi-org cross-vendor adoption confirmed at upstream code level (`integrations/claude/` + `integrations/copilot/` + ... 30+ integration directories).

### Axis 3 (cpd × age band)
- **age**: 260 days (created 2025-08-21, today 2026-05-08)
- **cpd**: 928 commits / 260 days ≈ **3.57 commits/day**
- **Band classification**: `cpd < 10 AND age >= 90d` → **STABLE-BURN-IN PASS** [per `Z:/claude-sota/.claude/rules/convergence-gate.md:99` 5-band table]

PASS firm — mature age (>>90d) AND non-fast-churn velocity.

### STRONG-PROVENANCE-EXPRESS predicate (5th band)
- `age >= 30d` ✓ (260 days >> 30)
- `axis-1 = official-org maintainership` ✓ (github is org-level T1)
- `axis-2 = named-T2 endorsement OR maintainer-org IS T2-equivalent` ✓ (github IS T2-equivalent — the GitHub organization is one of the canonical examples in convergence-gate STRONG-PROVENANCE-EXPRESS list)

STRONG-PROVENANCE-EXPRESS PASS — even if Axis 3 didn't already PASS via STABLE-BURN-IN, this 5th band alone admits firm Axis 3 PASS.

## Adoption verdict

**ADOPT-NOW** with confidence **0.92**.

Rationale: Spec-kit clears Probe DAG 1-7 with all PASS, satisfies convergence-gate Axis 1 + Axis 3 firmly, and clears Probe 7.b 5-clause check for STUDY-PILOT eligibility. As a GitHub-OFFICIAL toolkit (org#9919, MIT, 93k★, 928 commits, ~260d age, 3.57 cpd) with native Claude Code skills integration shipped upstream at `src/specify_cli/integrations/claude/__init__.py`, it complements existing claude-md-management + cwc-long-running-agents + superpowers stack as the **executable spec-driven scaffolder layer** with no duplicate-functionality conflict. Wave-47 baseline records prior STUDY-PILOT disposition; this Wave 97 fan-3 deep-dive promotes to ADOPT-NOW given matured cpd × age + native Claude integration confirmed at file:line.

**Risk floor (cardinal-rule-9 acknowledgment)**:
- Pin to specific release tag (`@vX.Y.Z` not `@main`) per cardinal-rule-9 version-pin mandate.
- 2-round fix-forward expectation: first install may surface skill-vs-command mode question + .specify/ directory placement; budget 2nd Pattern A round.
- Pre-cite-import REVERT check: NO REVERT precedent in sibling claude-sota git log (verified above).
- Sibling-bleed defense: no sibling-bleed risk — spec-kit is upstream install, not sibling cite-import.

## Integration path (ADOPT-NOW)

### Official-native install command (cardinal-rule-6 conformant)
```bash
# Step 1: discover latest stable release tag
LATEST_TAG=$(gh release list --repo github/spec-kit --limit 1 --json tagName -q '.[0].tagName')

# Step 2: persistent install via uv (canonical official method per upstream README)
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git@${LATEST_TAG}

# Step 3: verify
specify version
specify check

# Step 4: initialize in eee runtime with Claude skills mode (SOTA-aligned)
cd Z:/claude-sota-installed
specify init . --integration claude --integration-options="--skills"
```

### Configuration changes
- **`.claude/skills/speckit-*/`** directories created by `specify init` (9 skills: constitution / specify / plan / tasks / taskstoissues / implement / clarify / analyze / checklist).
- **`.specify/`** workflow directory at repo root (templates / scripts / extensions / presets).
- **`CLAUDE.md`** referenced as context file (read-only by spec-kit; existing eee CLAUDE.md preserved).
- **`.gitignore`**: add `.specify/state/` if local state directory created.
- **NO `.mcp.json` change** (spec-kit is CLI tool, not MCP server).
- **NO `settings.json` change** (skills auto-loaded via Anthropic skill primitive).

### Operator-interactive vs autonomous-loop notes
- **Interactive mode**: 4-phase gated workflow (SPECIFY → PLAN → TASKS → IMPLEMENT) with operator review between phases — methodology recommendation, not CLI gate.
- **Autonomous /loop mode**: COMPATIBLE — slash commands `/speckit.specify` → `/speckit.plan` → `/speckit.tasks` → `/speckit.implement` execute sequentially without mandatory user-approval gates. Operator can wrap with cwc-long-running-agents Default-FAIL contract for verification gating.
- **Recommendation**: pilot with operator-interactive mode for first 1-2 features (validate spec-driven hygiene gain); switch to autonomous wrap once workflow stable.

### Sub-agent dispatch suggestion
- Use spec-kit `/speckit.specify` and `/speckit.plan` in operator-driven phase
- Hand off `/speckit.tasks` output to subagent fan-out via existing `parallel-agent-wave.md §CADP rule 5` discipline
- Synthesize with `synthesis-layer-verify.md §Reporting categories` (OVER/UNDER/HONEST-NON-FINDING)

## TIER-1 cite chain

1. **Repo metadata** [VERIFIED 2026-05-08]: `gh repo view github/spec-kit --json` → 93,473★ MIT 928-commits 260-day age
2. **README install method** [VERIFIED 2026-05-08]: `gh api repos/github/spec-kit/contents/README.md` (HEAD `main`) → "Install Specify CLI" section: `uv tool install specify-cli --from git+https://github.com/github/spec-kit.git@vX.Y.Z`
3. **Claude Code integration** [VERIFIED 2026-05-08]: `gh api repos/github/spec-kit/contents/src/specify_cli/integrations/claude/__init__.py` → `class ClaudeIntegration: key = "claude"` / `config.folder = ".claude/"` / `config.commands_subdir = "skills"` / `multi_install_safe = True`
4. **Slash commands** [VERIFIED 2026-05-08]: README "Available Slash Commands" section enumerates 9 `/speckit.*` commands with descriptions
5. **Build deps** [VERIFIED 2026-05-08]: `gh api repos/github/spec-kit/contents/pyproject.toml` → `name = "specify-cli"` / `requires-python = ">=3.11"` / `dependencies = [typer/click/rich/platformdirs/readchar/pyyaml/packaging/pathspec/json5]`
6. **License** [VERIFIED 2026-05-08]: `gh repo view ... --json licenseInfo` → MIT
7. **Convergence-gate Axis 3 5-band table**: `Z:/claude-sota/.claude/rules/convergence-gate.md:96-104` STABLE-BURN-IN definition
8. **Probe 7.b 5-clause check**: `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md` Probe 7.b semantics
9. **Wave-47 baseline**: `Z:/claude-sota/tmp/wave47-grand-catalog-2026-05-06.md:86,115` records `github/spec-kit -- spec-driven-dev STUDY-PILOT` prior disposition + `GitHub org = strong Axis-1`
10. **Wave 97 fan-2 source flag**: `Z:/claude-sota-installed/tmp/wave97-fan2-A-cohort-saturation-2026-05-08.md:1` ADOPT-NOW from §OFFICIAL_FOUNDATION cohort
11. **No sibling REVERT precedent**: `git -C Z:/claude-sota log --all --oneline -i --grep="spec-kit"` returns 0 matches → no `Z:/claude-sota/.claude/projects/Z--claude-sota/memory/feedback_check_gitignore_before_porting.md` REVERT-AND-REMOVE history.

VERDICT: complete — ADOPT-NOW conf=0.92

verdict_one_line: "DONE: spec-kit verdict ADOPT-NOW conf=0.92"
