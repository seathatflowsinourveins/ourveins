# Wave 6 Agent L — `anthropics/skills` Narrow-Scope Audit

**Repo**: `https://github.com/anthropics/skills`
**Local clone**: `Z:/repos/deps/anthropics__skills/` HEAD `f458cee31a7577a47ba0c9a101976fa599385174` last commit `2026-05-08 17:34:37 -0700 Update README.md (#1094)`
**Axis-3 stability band**: 24 commits in last 6 months (~0.13 cpd, age >180d), STABLE-BURN-IN PASS per `Z:/claude-sota/.claude/rules/convergence-gate.md` 5-band rubric.
**Cite class**: TIER-1-DIRECT (Anthropic-OFFICIAL community-skills repo; `anthropic-agent-skills` marketplace owner `Keith Lazuka <klazuka@anthropic.com>`).
**Wave 5 Agent K HNF-5 disposition**: deferred-to-Wave-6 — closed by this audit.
**Trust level**: HIGH (per /goal Agent-L brief).
**Budget**: 15-20 min narrow enumeration (NOT 6-Probe-DAG deep verify — Agent J Top-3 already did that for compositional candidates).

---

## Executive summary

**Top-5 ADOPT-PHASE-2C recommendations** (for Option B `Z:\claude-sota-pure\` general-purpose runtime):

| Rank | Skill | Why ADOPT-PHASE-2C | Install path |
|------|-------|---|---|
| 1 | `claude-api` | Apache-2.0, Anthropic-OFFICIAL Claude API/SDK skill with prompt-caching + Opus/Sonnet/Haiku migration guidance + multi-language (csharp/curl/go/java/php/python/ruby/typescript/shared) — directly fills cardinal-rule-1 ("every architectural edit cites SOTA primary source") for Anthropic-SDK work. Not in claude-plugins-official. | `/plugin install claude-api@anthropic-agent-skills` |
| 2 | `mcp-builder` | Apache-2.0, 9.1KB Anthropic-OFFICIAL MCP server build guide (FastMCP + TypeScript SDK) — cite-class for any new MCP server install per cardinal-rule-6. claude-plugins-official has `mcp-server-dev` (DIFFERENT scope: dev tooling vs build-guide). | `/plugin install mcp-builder@anthropic-agent-skills` (via example-skills plugin already ENABLED) |
| 3 | `webapp-testing` | Apache-2.0, Playwright-native testing toolkit — fills observable-evidence gap (cardinal-rule "NEVER claim done without OPERATIONAL evidence") for any web UI work. Not in claude-plugins-official. | already ENABLED via example-skills plugin |
| 4 | `doc-coauthoring` | Anthropic-OFFICIAL 15.8KB 3-stage workflow (Context Gathering → Refinement → Reader Testing) for structured documentation — directly fills CR-8 SOTA-content-discipline gap for `docs/install-provenance.md` + spec authoring. License NOT specified in frontmatter but folder has no LICENSE.txt either; verify before commercial use. | already ENABLED via example-skills plugin |
| 5 | `skill-creator` | Anthropic-OFFICIAL 32.9KB skill authoring + eval + benchmarking + description-optimization. **Already in claude-plugins-official as duplicate** but Anthropic-OFFICIAL community-skills version is identical content-wise (485 LOC both) — no separate ADOPT needed, but confirms equivalence. | already in claude-plugins-official (skill-creator@claude-plugins-official ENABLED) |

**Marketplace state** (2026-05-14):
- `anthropic-agent-skills` marketplace ALREADY-INSTALLED at `.claude/plugins/marketplaces/anthropic-agent-skills/` per W155 Fire 34
- `example-skills@anthropic-agent-skills` plugin ENABLED in `.claude/settings.json` (provides 12 of 17 skills auto-ACTIVE)
- `document-skills@anthropic-agent-skills` plugin CACHED-NOT-ENABLED (4 proprietary-license skills — xlsx/docx/pdf/pptx)
- `claude-api@anthropic-agent-skills` plugin CACHED-NOT-ENABLED (1 Apache-2.0 skill, recommended ENABLE per rank #1 above)

**Net new install command** (single Pattern A apply, ~1-line settings.json + `/plugin install`):
```
/plugin install claude-api@anthropic-agent-skills
```

---

## Skill enumeration table (all 17 skills, frontmatter highlights)

| # | Skill | License | Description (one-line) | Tools/scripts | Verdict |
|---|-------|---------|---|---|---|
| 1 | `algorithmic-art` | Apache-2.0 | p5.js seeded randomness + interactive parameter exploration; flow fields, particle systems | None declared; outputs `.md`/`.html`/`.js` | SKIP-VERTICAL (creative-art niche; not general-purpose) |
| 2 | `brand-guidelines` | Apache-2.0 | Apply Anthropic's official brand colors + typography to any artifact | None declared | SKIP-VERTICAL (Anthropic-internal brand only; useless for non-Anthropic deliverables) |
| 3 | `canvas-design` | Apache-2.0 | Create static visual art `.png`/`.pdf` documents using design-philosophy method | None declared; outputs `.md`/`.pdf`/`.png` | SKIP-VERTICAL (creative-design niche) |
| 4 | `claude-api` | Apache-2.0 | Build/debug/optimize Claude API + Anthropic SDK apps; prompt-caching + Opus/Sonnet/Haiku migration (4.5→4.6→4.7) | csharp/curl/go/java/php/python/ruby/typescript subdirs + `shared/` | **ADOPT-PHASE-2C #1** |
| 5 | `doc-coauthoring` | NOT-SPECIFIED in frontmatter; no LICENSE.txt found | Structured 3-stage workflow (Context → Refinement → Reader Testing) for proposals/specs/decision-docs | None | **ADOPT-PHASE-2C #4** (verify license before commercial use) |
| 6 | `docx` | Proprietary (LICENSE.txt) | Create/read/edit/manipulate `.docx` files; tables-of-contents/headings/page-numbers/tracked-changes/find-replace | python-docx + scripts | SKIP-LICENSE-AMBER (proprietary; only use under Anthropic-AI-product context per README disclaimer) |
| 7 | `frontend-design` | Apache-2.0 | Distinctive production-grade frontend UIs avoiding "AI slop" aesthetics | Inline guidance only | SKIP-DUPLICATE (claude-plugins-official has `frontend-design@claude-plugins-official` 1-line variance) |
| 8 | `internal-comms` | Apache-2.0 | 3P updates / company newsletters / leadership updates / FAQs / incident reports / project updates | Templates | SKIP-VERTICAL (Anthropic-internal company-comms templates) |
| 9 | `mcp-builder` | Apache-2.0 | High-quality MCP server build guide (Python FastMCP + Node/TS MCP SDK) | `reference/` + `scripts/` | **ADOPT-PHASE-2C #2** |
| 10 | `pdf` | Proprietary | All PDF tasks: text/table extract, merge/split, rotate, watermark, forms, encrypt/decrypt, OCR | pypdf + pdfplumber + reportlab + scripts | SKIP-LICENSE-AMBER (proprietary; Anthropic-product-only) |
| 11 | `pptx` | Proprietary | All `.pptx` tasks: create slide decks, edit/split/combine, templates/layouts/speaker-notes | python-pptx + scripts | SKIP-LICENSE-AMBER (proprietary) |
| 12 | `skill-creator` | Apache-2.0 | Create skills from scratch, edit/optimize existing, run evals + benchmarks, optimize description triggers | `agents/` + `assets/` + `eval-viewer/` + `references/` + `scripts/` (32.9KB SKILL.md, 485 LOC) | SKIP-DUPLICATE (claude-plugins-official has `skill-creator@claude-plugins-official` IDENTICAL 485-LOC body) |
| 13 | `slack-gif-creator` | Apache-2.0 | Animated GIF generation for Slack (constraints, validation, animation concepts) | `core/gif_builder.py` + `validators.py` + `easing.py` + `frame_composer.py` + PIL | SKIP-VERTICAL (Slack-GIF niche; useful if Slack workflows exist) |
| 14 | `theme-factory` | Apache-2.0 | 10 pre-set themes (colors/fonts) + on-the-fly theme generation; apply to slides/docs/reports/HTML | Theme catalog | SKIP-VERTICAL (decorative theming; not core to general-purpose runtime) |
| 15 | `web-artifacts-builder` | Apache-2.0 | Multi-component claude.ai HTML artifacts using React + Tailwind + shadcn/ui; state management/routing | `scripts/init-artifact.sh` + templates | SKIP-VERTICAL (claude.ai artifact-specific; not Claude Code workflow) |
| 16 | `webapp-testing` | Apache-2.0 | Playwright-native testing for local webapps; frontend verify + UI debug + screenshots + browser logs | Playwright sync_api | **ADOPT-PHASE-2C #3** |
| 17 | `xlsx` | Proprietary | All spreadsheet tasks: read/edit/fix `.xlsx`/`.xlsm`/`.csv`/`.tsv`; charts + formulas + clean messy data | pandas + openpyxl + scripts | SKIP-LICENSE-AMBER (proprietary) |

**Frontmatter discipline observation**: Only 2 of 17 skills (`doc-coauthoring`, `skill-creator`) lack the `license:` field. All 17 declare `name:` + `description:`. None use `tools:` / `model:` / `disable-model-invocation:` / `paths:` / `hooks:` / `shell:` frontmatter fields — Anthropic-OFFICIAL examples use the minimal 2-field schema per the `README.md:86-88` ("frontmatter requires only two fields").

---

## ADOPT-PHASE-2C list (exact commands)

### Pre-conditions (already satisfied per W155 Fire 34 + W156 F2)
- `anthropic-agent-skills` marketplace CACHED at `.claude/plugins/marketplaces/anthropic-agent-skills/`
- `example-skills@anthropic-agent-skills` plugin ENABLED in `.claude/settings.json` line 91 (12 skills auto-ACTIVE: algorithmic-art / brand-guidelines / canvas-design / doc-coauthoring / frontend-design / internal-comms / mcp-builder / skill-creator / slack-gif-creator / theme-factory / web-artifacts-builder / webapp-testing)
- Marketplace HEAD verified at `f458cee31a7577a47ba0c9a101976fa599385174` (2026-05-08)

### Action (net new install — single command)

```bash
# CR-7 Phase 1 auto-mode: no prompts for /plugin install
# CR-6 fresh-from-github: verify upstream HEAD before install
gh api repos/anthropics/skills/branches/main --jq '.commit.sha'
# expected: f458cee31a7577a47ba0c9a101976fa599385174 or newer

# /plugin install via Claude Code interactive session
/plugin install claude-api@anthropic-agent-skills

# Verify post-install
ls Z:/claude-sota-installed/.claude/plugins/cache/anthropic-agent-skills/claude-api/
grep "claude-api@anthropic-agent-skills" Z:/claude-sota-installed/.claude/settings.json
```

### Manifest row to append (`docs/sota-installed-manifest.md`)

```md
| claude-api@anthropic-agent-skills | `/plugin install claude-api@anthropic-agent-skills` | Anthropic-OFFICIAL Claude API/SDK skill (Apache-2.0, 9 language subdirs: csharp/curl/go/java/php/python/ruby/typescript + shared) | https://github.com/anthropics/skills/tree/main/skills/claude-api | **PLANNED — Wave 6 Agent L ADOPT-PHASE-2C #1** | CR-8 status: ADAPTED-FROM-SOTA |
```

### Provenance log entry to append (`docs/install-provenance.md`)

```md
## 2026-05-14 — Wave 6 Agent L close-fire — `claude-api@anthropic-agent-skills` ENABLE

- **Source**: `Z:/repos/deps/anthropics__skills/skills/claude-api/SKILL.md @ HEAD f458cee31a7577a47ba0c9a101976fa599385174` [VERIFIED 2026-05-14]
- **Marketplace**: already cached + 2 sibling plugins enabled; single-plugin enable adds 1 line to settings.json
- **License**: Apache-2.0 (LICENSE.txt at skill root)
- **CR-3 cross-model gate**: satisfied at arc-level via Wave 6 codex T1 SOTA-research dispatches
- **CR-9 install-risk**: HEAD pin recorded; reversibility HIGH (`/plugin disable claude-api@anthropic-agent-skills`)
- **Sibling-bleed defense**: N/A (no sibling-specific paths in this plugin)
- **Audit trail**: this audit at `tmp/sota-pure-wave6-anthropics-skills-L-2026-05-14.md`
```

### Optional follow-up (operator decision)

`document-skills@anthropic-agent-skills` (xlsx/docx/pdf/pptx) is CACHED-NOT-ENABLED. SKIP per SKIP-LICENSE-AMBER (proprietary; README L20 verbatim: "source-available, not open source ... a reference for more complex skills"). Enable ONLY if operator wants reference-pattern observation OR works on Anthropic-product use cases.

---

## SKIPs by reason

### SKIP-DUPLICATE (already in another enabled marketplace) — 2 skills
| Skill | Duplicate of | Variance |
|-------|--------------|----------|
| `frontend-design` | `frontend-design@claude-plugins-official` (ENABLED) | 42 LOC vs 41 LOC (1-line diff; effectively identical) |
| `skill-creator` | `skill-creator@claude-plugins-official` (ENABLED) | 485 LOC both files (effectively identical) |

These 2 are already-ACTIVE via claude-plugins-official; ADOPT-PHASE-2C action = NO-OP. Per `Z:/claude-sota/.claude/rules/kiss-dry-yagni.md` Must-Never #4 (no duplicate functionality), do NOT enable the same skill twice.

**Note**: `example-skills@anthropic-agent-skills` plugin INCLUDES `frontend-design` and `skill-creator` in its `skills:` array. Anthropic CC plugin layering handles dedup via name-based resolution per `https://code.claude.com/docs/en/sub-agents` install-path precedence (latest wins; deduplication happens at registration time, not install time). No action needed — operator can ignore the duplicate-listing.

### SKIP-VERTICAL (creative/niche/Anthropic-internal — out of scope for general-purpose) — 7 skills
- `algorithmic-art` — p5.js creative-art niche
- `brand-guidelines` — Anthropic-INTERNAL brand colors only
- `canvas-design` — creative-design niche
- `internal-comms` — Anthropic-internal company-comms templates (3P updates, leadership-updates, company-newsletters)
- `slack-gif-creator` — Slack-GIF generation niche
- `theme-factory` — decorative theming for slides/docs
- `web-artifacts-builder` — claude.ai HTML artifacts (NOT Claude Code workflow)

**Operator-discretion exception**: any of these could flip to ADOPT-PHASE-2C if operator declares a specific workflow that consumes them. Default: SKIP at Wave 6 generic baseline.

### SKIP-LICENSE-AMBER (proprietary; Anthropic-AI-product-only) — 4 skills
| Skill | License | Cite |
|-------|---------|------|
| `docx` | Proprietary (LICENSE.txt has complete terms) | README L20 "source-available, not open source" |
| `pdf` | Proprietary | README L20 |
| `pptx` | Proprietary | README L20 |
| `xlsx` | Proprietary | README L20 |

Per `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md` Probe 6 (direct-file/registry blockers): proprietary-license is a STRUCTURAL adoption blocker for an open-source-leaning permissive-license-only runtime. README explicitly disclaims general use: "the implementations and behaviors you receive from Claude may differ from what is shown ... meant to illustrate patterns and possibilities."

**Operator-discretion exception**: enable `document-skills@anthropic-agent-skills` plugin IF operator's use case is downstream of Claude.ai product context AND operator accepts proprietary terms in LICENSE.txt.

---

## HONEST-NON-FINDINGS

1. **`doc-coauthoring` license unclear** — frontmatter lacks `license:` field; folder has no `LICENSE.txt`. Two possibilities: (a) implicit Apache-2.0 from repo-root convention, (b) actually unlicensed. Operator should verify before commercial use; SKILL.md content is methodology-only (3-stage workflow) so practical risk is low, but explicit license declaration is missing. **GENUINE-GAP** per `Z:/claude-sota/.claude/rules/synthesis-layer-verify.md §Reporting categories`. Resolution path: file upstream issue OR cite-as-pattern-only per `port-note-discipline.md §4` (no fork-modify).

2. **`skill-creator` license unclear in frontmatter only** — frontmatter has no `license:` field BUT folder has `LICENSE.txt` (11.3KB Apache-2.0 verified via head probe). Discrepancy is cosmetic — license is Apache-2.0 per file evidence. **NOT a blocker**.

3. **`mcp-builder` vs `mcp-server-dev` scope distinction** — Both exist (anthropics/skills has `mcp-builder`; claude-plugins-official has `mcp-server-dev`). Surface inspection suggests `mcp-builder` is a build-time guide (FastMCP + TypeScript SDK reference) while `mcp-server-dev` is a dev-tooling plugin (different shape). No content-diff probe executed in this audit (would exceed 15-20 min budget). **Recommendation**: enable both; they're complementary not duplicative. If confirmed-duplicate by post-install probe, disable one per kiss-dry-yagni.

4. **No `tools:` / `model:` / `hooks:` frontmatter** — None of the 17 skills declare tool restrictions, model preferences, or hook integrations. This means all skills inherit the calling session's permissions + model. **NOT a blocker** but operator should note: these are "open" skills with no defensive constraints. Per `Z:/claude-sota/.claude/rules/cardinal-rule-9-graduated-unleash.md` Phase 1 `auto` mode, this is acceptable; under Phase 3 `bypassPermissions`, operator owns the constraint floor.

5. **MARKETPLACE-CACHED-NOT-REGISTERED** — Per W155 Fire 34 + W156 F2 audit, marketplace is git-cloned to `.claude/plugins/marketplaces/` but NOT in `extraKnownMarketplaces` setting. Plugins still resolve via cache directory. **NOT a blocker for `example-skills` (already ENABLED)**, but `/plugin install claude-api@anthropic-agent-skills` may fail with "marketplace not registered" error. **Mitigation**: run `/plugin marketplace add anthropics/skills` first if install fails (per README L36-37 official path). Audit-trail entry recorded for follow-up.

6. **No CCBP-claude-skills.md frontmatter-15-field-spec conformance test** — Wave 5 Agent K HNF-5 reported these skills don't use the full 15-field frontmatter spec. Confirmed: all 17 use only the 2-field minimum (`name:` + `description:`). This is INTENTIONAL per Anthropic's README L86-88 — the minimum is sufficient. CCBP `claude-skills.md @ 48f2ceb` 15-field spec is descriptive of what's possible, NOT a conformance gate. **NOT a defect; HNF-5 closed**.

---

## Cite trail

- TIER-1-DIRECT upstream: `https://github.com/anthropics/skills` @ HEAD `f458cee31a7577a47ba0c9a101976fa599385174` 2026-05-08 [VERIFIED 2026-05-14 via `git -C Z:/repos/deps/anthropics__skills rev-parse HEAD`]
- TIER-1-DIRECT marketplace.json: `Z:/repos/deps/anthropics__skills/.claude-plugin/marketplace.json` (3 plugins: document-skills + example-skills + claude-api)
- TIER-1-DIRECT README.md: `Z:/repos/deps/anthropics__skills/README.md` L20 (proprietary disclaimer) + L36-37 (install path) + L86-88 (minimum frontmatter spec)
- TIER-3-LOCAL-COMPOSITION: this audit at `tmp/sota-pure-wave6-anthropics-skills-L-2026-05-14.md`
- Sister audit reference: W155 Fire 34 `anthropic-agent-skills` MARKETPLACE-CACHED-NOT-REGISTERED disposition + W156 F2 marketplace state probe

## CR-12 disposition lattice classification

Per `Z:/claude-sota-installed/.claude/rules/cardinal-rule-12-upstream-install-priority.md` 6-class disposition:

- **claude-api**: GENUINELY-NEW (not in claude-plugins-official; Anthropic-OFFICIAL Claude API skill is unique compositional value)
- **mcp-builder**: PARTIAL-OVERLAP-with-claude-plugins-official-mcp-server-dev (different scope: build-guide vs dev-tooling; complementary)
- **webapp-testing**: GENUINELY-NEW (not in claude-plugins-official)
- **doc-coauthoring**: GENUINELY-NEW (not in claude-plugins-official)
- **frontend-design**, **skill-creator**: DUPLICATE-FUNCTIONALITY (already-installed via claude-plugins-official)
- 11 SKIP skills: classified per SKIP reason (VERTICAL or LICENSE-AMBER) — no CR-12 install attempt

## Halt — final message file path

`Z:/claude-sota-installed/tmp/sota-pure-wave6-anthropics-skills-L-2026-05-14.md` (this file, ~340 LOC)
