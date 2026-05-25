# REPOMIX-ORG-SKILLS-CONVERGENCE — 4-Org Verification of `<org>/skills` Pattern

> **Methodology**: `gh api` (repos, trees, contents, license endpoints) — NOT repomix MCP (per fix22, sandbox issues). HEAD probe 2026-05-16. SKILL.md frontmatter sampled from each.
>
> **Bottom line**: TRUE-CONVERGENCE on the **SKILL.md spec** (all 4 orgs use `name + description` YAML frontmatter per agentskills.io). PARTIAL-CONVERGENCE on **installation mechanism** (anthropics+microsoft ship `.claude-plugin/marketplace.json` for Claude Code; openai+google rely solely on `npx skills add` / skills.sh CLI). DIVERGENT on **scope** (anthropics=general examples, microsoft=Azure/Foundry SDKs, google=GCP services, openai=Codex CLI).

---

## anthropics/skills

### Stats
- Stars: **135,736**
- License: NONE at repo root (per README: most skills Apache-2.0; `skills/docx`, `skills/pdf`, `skills/pptx`, `skills/xlsx` source-available "Proprietary, LICENSE.txt has complete terms")
- Created: 2025-09-22
- Last-push: 2026-05-15
- Default-branch: main
- Repo-size: 3,704 KB
- Topics: `agent-skills`
- Total skills: **18** (17 in `skills/`, plus `template/` skill)
- Top-level: `.claude-plugin/marketplace.json`, `skills/`, `spec/agent-skills-spec.md` (1-line pointer to agentskills.io), `template/`, `THIRD_PARTY_NOTICES.md`, `README.md`

### Skill format
- Spec compliance: **ANTHROPICS-CANONICAL** (defines the spec — `agentskills.io/specification` is the cite-anchor)
- Top-level structure: `skills/<name>/SKILL.md` with YAML frontmatter `name + description [+ license]`
- Sample skills (alphabetical): algorithmic-art, brand-guidelines, canvas-design, claude-api, doc-coauthoring, docx, frontend-design, internal-comms, mcp-builder, pdf, pptx, skill-creator, slack-gif-creator, theme-factory, web-artifacts-builder, webapp-testing, xlsx
- Sample frontmatter (`skills/pdf/SKILL.md`): `name: pdf` + `description: Use this skill whenever the user wants to do anything with PDF files...` + `license: Proprietary. LICENSE.txt has complete terms`

### Installation mechanism
- `npx skills add anthropics/skills`: **YES** (skills.sh badge on README — `https://skills.sh/anthropics/skills`)
- `/plugin install`: **YES** — `/plugin marketplace add anthropics/skills` then `/plugin install document-skills@anthropic-agent-skills` or `example-skills@anthropic-agent-skills`
- claude marketplace add: **YES** (same as above)
- clone+symlink: **YES** (any SKILL.md → `~/.claude/skills/<name>/`)

### Verdict
- **INSTALL** (already in Phase 0 — example-skills + document-skills plugins per W254 §3)
- Convergence assessment: **TRUE-CONVERGENCE** (defines the spec)

---

## microsoft/skills

### Stats
- Stars: **2,323**
- License: **MIT** (repo-root LICENSE)
- Created: 2026-01-16 (~4 months old)
- Last-push: 2026-05-15
- Default-branch: main
- Repo-size: 14,306 KB
- Topics: `agent-skills`, `agents`, `azure`, `foundry`, `mcp`, `sdk`, `skills`
- Total skills: **181 SKILL.md files** (README claims 174 — likely deduped after multi-language variants; 636 tree-dirs total reflects the deep `.github/plugins/azure-sdk-{python,dotnet,ts,java,rust}/skills/*` matrix)
- Top-level: `.claude-plugin/marketplace.json` + `.claude/` + `.entire/` + `.github/` + `.opencode/` + `.vscode/` + `Agents.md` + `LICENSE` + `README.md` + `SECURITY.md` + `context7.json` + `docs-site/` + `docs/` + `hooks/` + `tests/`

### Skill format
- Spec compliance: **ANTHROPICS-COMPATIBLE** (same YAML frontmatter — `name + description`)
- Top-level structure: `.github/skills/<name>/SKILL.md` (Copilot-CLI convention) + `.github/plugins/azure-sdk-{lang}/skills/<name>/SKILL.md` (per-language plugins)
- Per-language matrix per README: Core (10) + Foundry-language-agnostic (11) + Python `-py` (39) + .NET `-dotnet` (28) + TypeScript `-ts` (25) + Java `-java` (25) + Rust `-rust` (7) = 145 + curated-other-cores. README states **174 total**.
- Cross-agent symlink pattern documented in README (e.g. `ln -s ../.github/skills .claude/skills && ln -s ../.github/skills .opencode/skills`)
- Sample frontmatter (`.github/skills/mcp-builder/SKILL.md`): `name: mcp-builder` + `description: Guide for creating high-quality MCP (Model Context Protocol) servers...`

### Installation mechanism
- `npx skills add microsoft/skills`: **YES** (primary install path per README §Quick Start)
- `/plugin install`: **YES** — `.claude-plugin/marketplace.json` registers `deep-wiki` + `azure-skills` plugins (pluginRoot=`./.github/plugins`)
- claude marketplace add: **YES** (`marketplace.json` schema matches CC native)
- clone+symlink: **YES** (documented multi-agent symlink layout)

### Verdict
- **STUDY-PILOT** — `mcp-builder`, `skill-creator`, `frontend-design-review`, `cloud-solution-architect` (Core skills overlap with anthropics + add depth). Skip the 145 Azure-SDK skills until a real Azure project lands (context-rot risk per their own README: "Use skills selectively. Loading all skills causes context rot.")
- Convergence assessment: **TRUE-CONVERGENCE on spec + plugin marketplace mechanism**; DIVERGENT on scope (Azure-vertical)

---

## google/skills

### Stats
- Stars: **9,410**
- License: **Apache-2.0** (repo-root LICENSE)
- Created: 2026-03-31 (~6 weeks old)
- Last-push: 2026-05-15
- Default-branch: main
- Repo-size: 164 KB (tiny — content-only)
- Topics: `google`, `googlecloud`, `skills`
- Total skills: **13 SKILL.md files** (all under `skills/cloud/`)
- Top-level: `CONTRIBUTING.md`, `LICENSE`, `README.md`, `skills/` only

### Skill format
- Spec compliance: **ANTHROPICS-COMPATIBLE** (same YAML frontmatter)
- Top-level structure: `skills/cloud/<name>/SKILL.md` (single vertical: GCP)
- All skills: alloydb-basics, bigquery-basics, cloud-run-basics, cloud-sql-basics, firebase-basics, gemini-api, gke-basics, google-cloud-networking-observability, google-cloud-recipe-auth, google-cloud-recipe-onboarding, google-cloud-waf-cost-optimization, google-cloud-waf-reliability, google-cloud-waf-security
- Sample frontmatter (`skills/cloud/bigquery-basics/SKILL.md`): `name: bigquery-basics` + `description: Manages datasets, tables, and jobs in BigQuery...`

### Installation mechanism
- `npx skills add google/skills`: **YES** (sole documented install path)
- `/plugin install`: **NO** (no `.claude-plugin/marketplace.json`)
- claude marketplace add: **NO**
- clone+symlink: **YES** (any SKILL.md works manually)

### Verdict
- **DEFER** — install only if/when GCP service work lands. 13 skills cover GCP fundamentals (BQ, GKE, Cloud Run, Firebase) + 3 WAF guides + 3 onboarding recipes. Apache-2.0 makes them safe to vendor.
- Convergence assessment: **PARTIAL** (TRUE-CONVERGENCE on SKILL.md spec; DIVERGENT on install — no `.claude-plugin/marketplace.json`, skills.sh-only)

---

## openai/skills

### Stats
- Stars: **19,234**
- License: NONE at repo root (per README: "license of an individual skill ... LICENSE.txt file" — per-skill)
- Created: 2025-11-25 (~6 months old)
- Last-push: 2026-05-15
- Default-branch: main
- Repo-size: 2,422 KB
- Topics: none
- Total skills: **43 SKILL.md files** (38 curated + 5 system)
- Top-level: `.gitignore`, `README.md`, `contributing.md`, `skills/.curated/` (38 dirs), `skills/.system/` (5 dirs)

### Skill format
- Spec compliance: **ANTHROPICS-COMPATIBLE** (same YAML frontmatter — `name + description`)
- Top-level structure: `skills/.curated/<name>/SKILL.md` + `skills/.system/<name>/SKILL.md`
- `.system/` skills (always auto-installed in latest Codex): imagegen, openai-docs, plugin-creator, skill-creator, skill-installer
- `.curated/` skills (38): aspnet-core, chatgpt-apps, cli-creator, cloudflare-deploy, figma-* (7 variants), gh-address-comments, gh-fix-ci, hatch-pet, jupyter-notebook, linear, migrate-to-codex, netlify-deploy, notion-* (4 variants), openai-docs, pdf, playwright (+ playwright-interactive), render-deploy, screenshot, security-* (3 variants: best-practices, ownership-map, threat-model), sentry, speech, transcribe, vercel-deploy, winui-app, yeet
- `.experimental/` directory referenced in README but not present at HEAD (likely tracked elsewhere)
- Sample frontmatter (`skills/.curated/playwright/SKILL.md`): `name: "playwright"` + `description: "Use when the task requires automating a real browser..."`

### Installation mechanism
- `npx skills add openai/skills`: **UNCLEAR** — README does NOT mention skills.sh; uses Codex-native `$skill-installer` instead
- `/plugin install`: **NO** (no `.claude-plugin/marketplace.json`)
- claude marketplace add: **NO**
- clone+symlink: **YES** (any SKILL.md → `~/.claude/skills/<name>/`)
- Codex-native: `$skill-installer <skill-name>` (defaults to `.curated`); URL-based for `.experimental`

### Verdict
- **STUDY-PILOT** — significant overlap with deferred-orchestrator targets (security-threat-model, gh-address-comments, gh-fix-ci, playwright, sentry, jupyter-notebook, screenshot, figma-* family). Apache-2.0/MIT not guaranteed (per-skill LICENSE.txt — must check each). Codex-vertical (`migrate-to-codex`, `chatgpt-apps`) of marginal value.
- Convergence assessment: **PARTIAL** (TRUE-CONVERGENCE on SKILL.md spec; DIVERGENT on install — Codex-native `$skill-installer`, no skills.sh badge, no `.claude-plugin/marketplace.json`)

---

## Convergence Verdict

### 4-org spec convergence: TRUE
All 4 orgs use the **identical SKILL.md YAML frontmatter spec** — `name` + `description` at minimum, optional `license`. All 4 orgs reference **agentskills.io** as the canonical standard (anthropics' `spec/agent-skills-spec.md` redirects there; google links it; openai links it).

### Install-mechanism convergence: PARTIAL (2/4)
| Org | `.claude-plugin/marketplace.json` | `npx skills add` (skills.sh) | Native CLI |
|---|---|---|---|
| anthropics | YES | YES | n/a |
| microsoft | YES | YES | n/a |
| google | NO | YES | n/a |
| openai | NO | NO documented | `$skill-installer` (Codex-only) |

Only anthropics + microsoft are **Claude Code plugin-marketplace-installable** out-of-the-box. google + openai require skills.sh (an external CLI by an unknown author — needs separate vetting) or manual clone+symlink.

### Cross-compatibility: HIGH on SKILL.md format, MEDIUM on install
- **Format-level**: any SKILL.md from any of the 4 orgs drops into `~/.claude/skills/<name>/SKILL.md` and Claude Code picks it up (cardinal-rule §"skills lazy-load per description: match"). Format-portable across CC, Codex, Copilot CLI, opencode.
- **Install-level**: only anthropics + microsoft expose the CC-native `/plugin marketplace add` path. Vendoring google/openai skills via manual copy is mechanically simple but loses upstream pull-updates discipline.
- **License risk per org**: anthropics MIXED (Apache-2.0 + proprietary for docx/pdf/pptx/xlsx — already accepted in Phase 0), microsoft MIT (clean), google Apache-2.0 (clean), openai per-skill LICENSE.txt (must audit each before vendoring).

### Recommended Phase 0/1 additions

**Phase 0 (already done)**: anthropics/skills via `/plugin marketplace add anthropics/skills` → `example-skills + document-skills` plugins.

**Phase 1 (recommended adds, ordered by ROI)**:
1. **microsoft/skills** — `/plugin marketplace add microsoft/skills` → install ONLY the `deep-wiki` plugin (universal value, MIT-licensed, no Azure-vertical bias). Defer `azure-skills` plugin until first Azure-project lands. Estimated context cost: ~5 KB lazy-load per skill description.
2. **openai/skills** — manual clone + symlink ONLY `security-threat-model`, `gh-address-comments`, `gh-fix-ci`, `playwright` into `~/.claude/skills/`. Check per-skill LICENSE.txt first. STUDY-PILOT in a worktree before committing.
3. **google/skills** — DEFER until first GCP-project lands. Then `npx skills add google/skills` and select onboarding-recipe + the specific service skill (BigQuery, Cloud Run, etc.).

### Cross-compat assessment
The `<org>/skills` pattern is **emergent standard** as of Q2 2026 — 3 of the 4 largest LLM-vendor orgs (Anthropic, Microsoft, Google) all chose the same repo-naming convention + SKILL.md spec + skills.sh distribution channel within 7 months of Anthropic's Sept-2025 publication. OpenAI is the outlier on distribution (Codex-native `$skill-installer`) but converged on the format. This convergence implies **agentskills.io is the de facto cross-vendor agent-skill specification** and the runtime should treat any SKILL.md from any well-known org as a trusted primitive class (per cardinal-rule §1 install-from-trusted-plugins).
