# Wave 7 Stream-A — SOTA-pure extension probe (6-Probe-DAG + convergence-gate)

**Date**: 2026-05-14
**Role**: Wave-7 Stream-A sota-researcher
**Target runtime**: `Z:/claude-sota-pure/` (Phase 0 complete; Wave 7 closes 5 open gaps from Wave 1-6)
**Method**: 6-Probe-DAG per `Z:/claude-sota-installed/.claude/rules/ahfv-probe-dag.md` + convergence-gate Axis 1+2+3 per `Z:/claude-sota-installed/.claude/rules/convergence-gate.md`
**Trust posture**: Adversarial — sibling installed runtime is migration context only; upstream repo manifests + plugin.json + LICENSE are primary authority

---

## VERDICT-MATRIX:

| # | Candidate | P1 count | P2 SDK/CLI | P3 arch-API | P4 plugin-ns | P5 mode-harness | P6 license/blockers | P7 demand-gate | Axis 1 (≥3 orgs) | Axis 2 (named T2) | Axis 3 (≥90d stability) | Verdict | Cite anchor |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | knowledge-work-plugins | PASS (16 plugins per marketplace.json) | PASS (CC plugin) | PASS (CC plugin schema) | **FAIL — Anthropic-OFFICIAL marketplace, no install in pure** | PASS | PASS (Anthropic-OFFICIAL; no LICENSE file at root but officially distributed) | **PASS** if knowledge-worker workflow declared; else FAIL (vertical-niche) | PASS (Anthropic + sibling install + Wave-2 Agent E catalog citation) | PASS (Anthropic owner) | PASS (already cached in sibling) | **STUDY-PILOT** (operator-discretion: GENUINELY-NEW only IF declared workflow consumes it) | `marketplaces/knowledge-work-plugins/.claude-plugin/marketplace.json` @ HEAD `9789ea78ad66e395a9c709146cacecdc14ce2abf` |
| 2 | security-review | n/a — repo IS a GitHub Action, NOT a CC plugin | **FAIL — wrong invocation surface (CI/PR not Claude Code session)** | FAIL (action.yml not plugin.json) | n/a | **FAIL — runs as GitHub Actions workflow, not Claude Code primitive** | PASS (MIT, Anthropic owner) | FAIL (no Claude Code session demand; pure CI/PR demand) | PASS (Anthropic + Anthropic blog post + trailofbits security adjacency) | PASS (Anthropic-OFFICIAL author) | PASS (>90d) | **REJECT-FOR-FIT** (CI-only, not Claude Code primitive). Alternative: `security-guidance@claude-plugins-official` IS a CC plugin (security reminder hook) | `Z:/repos/deps/claude-code-security-review/action.yml:1-3 @ HEAD 0c6a49f1fa56a1d472575da86a94dbc1edb78eda`; alternative cite: `marketplaces/claude-plugins-official/plugins/security-guidance/.claude-plugin/plugin.json` @ HEAD `a2329d2273a6b438e97ee3713ca629ba9c91a428` |
| 3 | claude-hud | PASS (22776★ MIT, v0.1.0) | PASS (CC plugin, statusline) | PASS (CC statusline + commands surface) | PASS (no incumbent statusline plugin) | PASS (statusline is read-only observability surface) | PASS (MIT, Jarrod Watts) | PASS (statusline gap exists in pure runtime) | PASS (Jarrod Watts + Wave-2 Agent E + awesome-claude-code) | PARTIAL (Wave-2 Agent E catalog endorsement but unnamed T2 dated artifact) | PASS (134d age, pushed <1d, breakout-high) | **ADOPT-NOW** (install-class; disabled-by-default Option B flag) | `Z:/repos/deps/claude-hud/.claude-plugin/plugin.json @ HEAD 70ecdbf30752edbd4ed391926080b9224db4662c`; license MIT verified at `Z:/repos/deps/claude-hud/LICENSE:1-3` |
| 4 | tdd-guard | PASS (2110★ MIT) | PASS (CC plugin) | PASS (plugin schema valid; source: ./plugin) | PASS (no TDD-enforcement plugin in claude-plugins-official) | PASS (narrow hook primitive, opt-in) | PASS (MIT, Nizar Selander) | **PARTIAL** — demand exists IF runtime adopts TDD discipline; superpowers/tdd already vendored in installed runtime, so partial overlap | PASS (Nizar Selander + Wave-2 Agent E + awesome-claude-code Hooks) | PARTIAL (unnamed T2 dated artifact) | PASS (312d age, pushed 5d) | **STUDY-PILOT** (overlap-risk with installed `superpowers/tdd` vendored skill; install only if pure runtime declares TDD-enforcement workflow as load-bearing) | `Z:/repos/deps/tdd-guard/.claude-plugin/plugin.json @ HEAD d0868c39b1ff390cbd4f91899af38c082ec5ef88`; LICENSE MIT verified |
| 5 | compound-engineering | PASS (16748★ MIT, EveryInc/Kieran Klaassen) | PASS (CC plugin marketplace with 2 plugins: compound-engineering + coding-tutor) | PASS | PASS (no incumbent in claude-plugins-official) | PASS (skill/command import; selective enable) | PASS (MIT) | **PASS** — mistake-to-skill feedback-loop fills GENUINELY-NEW workflow gap | PASS (EveryInc + Wave-2 Agent E + awesome-claude-code Agent Skills) | PARTIAL (named-author Kieran Klaassen; no dated T2 endorsement artifact verified in this audit) | PASS (218d age, pushed <1d, high sustained) | **ADOPT-NOW** (install selected skills/commands; cite full repo) | `Z:/repos/deps/compound-engineering-plugin/.claude-plugin/marketplace.json @ HEAD 834ca4e58a82c4e06040ff448bc4bd97551f4be9`; LICENSE MIT |
| 6 | G1 anthropics/skills 2-field frontmatter vs CCBP 15-field | PASS (17 skills enumerated by Wave 6 Agent L) | PASS (Anthropic-OFFICIAL plugin marketplace) | PASS | n/a (already audited Wave 6) | PASS (frontmatter spec is upstream-OFFICIAL design choice, NOT defect) | PASS (Apache-2.0 for 13 skills; proprietary for 4 office-doc skills) | n/a | PASS (Anthropic OFFICIAL + CCBP 15-field spec + Wave 6 Agent L convergence) | PASS (Anthropic owner; Keith Lazuka maintainer) | PASS (>180d, 24 commits/6mo STABLE-BURN-IN) | **RESOLVED**: 2-field minimum is INTENTIONAL per upstream README L86-88 verbatim "frontmatter requires only two fields"; CCBP 15-field is DESCRIPTIVE (what's possible), NOT a conformance gate. Wave 5 Agent K HNF-5 closed. **NO DEFECT** | `Z:/repos/deps/anthropics__skills/README.md:86-88 @ HEAD f458cee31a7577a47ba0c9a101976fa599385174` + Wave 6 Agent L finding #6 |
| 7 | G3 superpowers marketplace name verify | PASS (1 plugin: superpowers v5.1.0) | PASS (CC plugin via `.claude-plugin/marketplace.json`) | PASS | **CRITICAL FINDING — marketplace name is `superpowers-dev`, NOT `superpowers`** | PASS | PASS (MIT, Jesse Vincent) | PASS (already partially vendored in installed runtime) | PASS (obra/superpowers + Wave-2 Agent E + Wave 1 Agent D Edit 5) | PASS (Jesse Vincent + Pragmatic Programmer/DDD/XP named-author cite chain in eee-local rules) | PASS (>180d) | **ADOPT-NOW with COORDINATE-CORRECTION**: install coordinate is `superpowers@superpowers-dev` (NOT `superpowers@superpowers`). Wave 1 Agent D Edit 5 prescribed coordinate verification — this audit confirms the alias. | `Z:/repos/deps/obra/superpowers/.claude-plugin/marketplace.json:2 @ HEAD f2cbfbefebbfef77321e4c9abc9e949826bea9d7` verbatim: `"name": "superpowers-dev"` |
| 8 | G4 mksglu/context-mode Elastic-2.0 trust | PASS (1169 commits, 75d local-mirror age) | PASS (CC plugin + MCP server) | PASS | PASS (no incumbent context-continuity plugin in claude-plugins-official; complementary to memory-service) | PASS (CC plugin + MCP server) | **AMBER — Elastic-2.0 NOT permissive**. Forbids: (a) hosted/managed service redistribution providing "substantial features" of software, (b) circumventing license key, (c) removing license/copyright notices. **Self-hosted operator use is PERMITTED**. License is source-available, NOT FOSS. | PASS (context-continuity workflow demand confirmed) | PASS (sibling install + Wave 1 Agent D Q7) | **UNKNOWN — no named T2 dated artifact verified** (per Wave 1 Agent D Q7); installed runtime use is operator-led | PARTIAL — 75d local-mirror age + ~15.6 cpd → **young/high-churn AMBER** per Wave 1 Agent D Q7 + convergence-gate Axis-3 5-band table (cpd>10 AND age<100d → fast-churn anti-pattern; treat age-PASS as borderline) | **STUDY-PILOT with TRUST-AMBER GUARDRAILS** (install-class only with: (1) HEAD pin recorded, (2) Elastic-2.0 acceptance documented in manifest, (3) smoke-probe persistence/restore, (4) NO claim of "quality-aware auto-compaction" per Wave 1 Agent D Q9, (5) rollback command documented) | `Z:/repos/deps/context-mode/LICENSE:1-5 @ HEAD e73a6cd56a4eb0a01794b9187902e3f805515286` verbatim "Elastic License 2.0 (ELv2) Copyright 2026 Mert Koseoglu"; LICENSE:17-19 "may not provide the software to third parties as a hosted or managed service" |

---

## Per-candidate detail

### Candidate 1 — knowledge-work-plugins

**Canonical source**: `marketplaces/knowledge-work-plugins/.claude-plugin/marketplace.json` @ HEAD `9789ea78ad66e395a9c709146cacecdc14ce2abf`. Anthropic-OWNER marketplace already cached in sibling installed runtime. 16 plugins: `productivity`, `enterprise-search`, `cowork-plugin-management`, `sales`, `finance`, `data`, `legal`, `marketing`, `customer-support`, `product-management`, `bio-research`, `engineering`, `human-resources`, `design`, `pdf-viewer`, partner-built (`slack-by-salesforce`, `apollo`, `common-room`).

**Convergence**:
- Axis 1 PASS: Anthropic (owner) + sibling install + Wave-2 Agent E catalog
- Axis 2 PASS: Anthropic-owner attribution
- Axis 3 PASS: Anthropic-OFFICIAL marketplace, already cached

**Disposition**: STUDY-PILOT. Per CR-12 6-class disposition lattice: GENUINELY-NEW IF pure runtime declares knowledge-worker workflow (finance/legal/marketing/data); otherwise vertical-niche per Probe 7 demand-gate.a. Default disposition is DEFER unless operator declares which sub-plugin is needed (e.g., `engineering@knowledge-work-plugins` may overlap with `pr-review-toolkit@claude-plugins-official` already in pure runtime baseline).

### Candidate 2 — security-review

**Canonical source ambiguity resolved**: `Z:/repos/deps/claude-code-security-review/` IS a **GitHub Action**, not a Claude Code plugin. Probe 2 SDK-vs-CLI: FAIL — runs as GitHub Actions workflow (`action.yml`), not invoked from a Claude Code session.

**Alternative — `security-guidance@claude-plugins-official` IS a CC plugin**: `marketplaces/claude-plugins-official/plugins/security-guidance/.claude-plugin/plugin.json` — Anthropic-authored security reminder hook (warns about command injection, XSS, unsafe patterns at Edit/Write time).

**Disposition**: REJECT-FOR-FIT for `claude-code-security-review` (wrong invocation mode). **Recommend ADOPT alternative `security-guidance@claude-plugins-official`** if pure runtime wants in-session security guidance.

### Candidate 3 — claude-hud

**Cite trail**: `Z:/repos/deps/claude-hud/.claude-plugin/plugin.json @ HEAD 70ecdbf30752edbd4ed391926080b9224db4662c` declares `"name": "claude-hud" "version": "0.1.0" "license": "MIT"`. Marketplace name = `claude-hud` (same as plugin).

**Probe DAG**: ALL PASS. Statusline is observability-only (read-only); no edit-mode authority. Wave-2 Agent E candidate #1.

**Disposition**: ADOPT-NOW (install-class). Install via `/plugin marketplace add jarrodwatts/claude-hud` + `/plugin install claude-hud@claude-hud`. Smoke probe: verify statusline renders + context/tools/agents/todos visible.

### Candidate 4 — tdd-guard

**Cite trail**: `Z:/repos/deps/tdd-guard/.claude-plugin/plugin.json @ HEAD d0868c39b1ff390cbd4f91899af38c082ec5ef88` declares marketplace name `tdd-guard` with single plugin at `./plugin` source path.

**Demand-gate caveat (Probe 7)**: Installed runtime already vendors `superpowers/tdd@HEAD 6efe32c9` selectively via the obra/superpowers vendoring path. tdd-guard is a HOOK primitive (different shape from a vendored skill) but workflow overlap exists. Per CR-12 6-class disposition lattice: PARTIAL-OVERLAP.

**Disposition**: STUDY-PILOT. Adopt ONLY if pure runtime declares automated TDD enforcement as load-bearing distinct from vendored superpowers/tdd skill guidance.

### Candidate 5 — compound-engineering

**Cite trail**: `Z:/repos/deps/compound-engineering-plugin/.claude-plugin/marketplace.json @ HEAD 834ca4e58a82c4e06040ff448bc4bd97551f4be9`. Marketplace owner = Kieran Klaassen (EveryInc). Two plugins: `compound-engineering` (AI-powered dev tools) + `coding-tutor` (personalized tutorials with spaced-repetition quizzes).

**Probe DAG**: ALL PASS. Wave-2 Agent E candidate #2 with strong fit declared. Mistake-to-skill feedback loop is GENUINELY-NEW workflow.

**Disposition**: ADOPT-NOW (install-class). Selective enable: `compound-engineering@compound-engineering-plugin` only; defer `coding-tutor` (vertical-niche tutorial generator).

### Candidate 6 — G1 anthropics/skills 2-field frontmatter

**Per Wave 6 Agent L finding #6** verbatim: "all 17 use only the 2-field minimum (`name:` + `description:`). This is INTENTIONAL per Anthropic's README L86-88 — the minimum is sufficient. CCBP `claude-skills.md @ 48f2ceb` 15-field spec is descriptive of what's possible, NOT a conformance gate. **NOT a defect; HNF-5 closed**."

**Re-verification**: `head -10 Z:/repos/deps/anthropics__skills/skills/claude-api/SKILL.md` shows 2-field frontmatter `name:` + `description:` + `license:` (license is optional 3rd field per per-skill convention). `Z:/repos/deps/anthropics__skills/README.md:86-88 @ HEAD f458cee31a7577a47ba0c9a101976fa599385174` verbatim: "The frontmatter requires only two fields: `name` - A unique identifier ... `description` - A complete description".

**Disposition**: RESOLVED (NO DEFECT). The 2-field minimum is upstream-DESIGN, not a conformance gap. CCBP 15-field spec is the MAX, not the MIN. Wave 5 Agent K HNF-5 confirmed closed.

### Candidate 7 — G3 superpowers marketplace name verify

**Critical finding (validates Wave 1 Agent D Edit 5)**: `Z:/repos/deps/obra/superpowers/.claude-plugin/marketplace.json:2 @ HEAD f2cbfbefebbfef77321e4c9abc9e949826bea9d7` declares `"name": "superpowers-dev"` (NOT `"superpowers"`).

**Coordinate implication**: install coordinate is `superpowers@superpowers-dev`, NOT `superpowers@superpowers`. Wave 1 Agent D Edit 5 PRESCRIBED coordinate verification; this audit CONFIRMS the alias requirement.

**Plugin name**: `"name": "superpowers"` (plugin name matches what users invoke). Marketplace name `"superpowers-dev"` is the registration coordinate. Plugin v5.1.0 maintained by Jesse Vincent (jesse@fsck.com).

**Disposition**: ADOPT-NOW with COORDINATE-CORRECTION. Manifest must declare `superpowers@superpowers-dev` install coordinate. Alternative: Anthropic-OFFICIAL marketplace may register an alias `superpowers` for this plugin (no evidence found in this audit).

### Candidate 8 — G4 mksglu/context-mode Elastic-2.0 trust

**License re-verification (per Wave 1 Agent D Q7)**: `Z:/repos/deps/context-mode/LICENSE:1-3 @ HEAD e73a6cd56a4eb0a01794b9187902e3f805515286` verbatim: "Elastic License 2.0 (ELv2) Copyright 2026 Mert Koseoglu".

**Limitations clause** (LICENSE:17-19): "You may not provide the software to third parties as a hosted or managed service, where the service provides users with access to any substantial set of the features or functionality of the software."

**Trust implications for pure runtime**:
- **Self-hosted operator use**: PERMITTED (no SaaS redistribution → no violation)
- **Modify**: PERMITTED with notice preservation
- **Distribute modified**: PERMITTED with notice preservation
- **SaaS redistribution**: FORBIDDEN (license key + substantial features clause)
- **Operator runtime context**: Pure runtime is single-operator; Elastic-2.0 use is COMPLIANT
- **Permissive-license whitelist match (per `ahfv-probe-dag.md` Probe 6)**: FAIL — Elastic-2.0 is NOT in MIT/Apache-2.0/BSD whitelist; AMBER trust posture

**Axis 3 stability**: per Wave 1 Agent D Q7 measurement — 1169 commits over 75d local-mirror span = ~15.6 cpd. Per `convergence-gate.md` 5-band table: `cpd > 10` AND `age < 100d` → **fast-churn anti-pattern**. Treat age-PASS as borderline; expect rewrites; re-audit after +90d burn-in.

**Disposition**: STUDY-PILOT with TRUST-AMBER GUARDRAILS. Required guardrails (per Wave 1 Agent D Edit 12):
1. HEAD pin recorded: `e73a6cd56a4eb0a01794b9187902e3f805515286`
2. Elastic-2.0 acceptance documented in `docs/install-provenance.md`
3. Smoke probe: context-mode status + persistence across compaction
4. NO claim of "quality-aware auto-compaction" (per Wave 1 Agent D Q9 REFUTED)
5. Rollback command: `/plugin disable context-mode@context-mode`
6. Re-audit at +90d burn-in (calculated: re-eval ~2026-08-12)

---

## Manifest-row recommendations for `Z:/claude-sota-pure/docs/sota-installed-manifest.md`

Append to Section 3 (plugin install rows) or new Section 17.1 (Wave-7 extension installs):

```md
| # | Coordinate | Install command | Description | Cite | Status | CR-8 status |
|---|---|---|---|---|---|---|
| 7.1 | `claude-hud@claude-hud` | `/plugin marketplace add jarrodwatts/claude-hud && /plugin install claude-hud@claude-hud` | Real-time statusline HUD: context health + tool activity + agent tracking + todo progress | `https://github.com/jarrodwatts/claude-hud @ HEAD 70ecdbf30752edbd4ed391926080b9224db4662c` (MIT) | **PLANNED — Wave 7 Stream-A ADOPT-NOW** | ADAPTED-FROM-SOTA |
| 7.2 | `compound-engineering@compound-engineering-plugin` | `/plugin marketplace add EveryInc/compound-engineering-plugin && /plugin install compound-engineering@compound-engineering-plugin` | AI-powered dev tools that compound knowledge from each engineering unit; mistake-to-skill feedback loop | `https://github.com/EveryInc/compound-engineering-plugin @ HEAD 834ca4e58a82c4e06040ff448bc4bd97551f4be9` (MIT) | **PLANNED — Wave 7 Stream-A ADOPT-NOW** | ADAPTED-FROM-SOTA |
| 7.3 | `superpowers@superpowers-dev` | `/plugin marketplace add obra/superpowers && /plugin install superpowers@superpowers-dev` | Core skills library: TDD, debugging, collaboration patterns | `https://github.com/obra/superpowers @ HEAD f2cbfbefebbfef77321e4c9abc9e949826bea9d7` (MIT). **NOTE: marketplace name is `superpowers-dev`, NOT `superpowers`** | **PLANNED — Wave 7 Stream-A ADOPT-NOW (with coordinate-correction)** | ADAPTED-FROM-SOTA |
| 7.4 | `security-guidance@claude-plugins-official` | `/plugin install security-guidance@claude-plugins-official` (marketplace already in baseline) | Security reminder hook: warns about command injection, XSS, unsafe patterns at Edit/Write time | `marketplaces/claude-plugins-official/plugins/security-guidance/.claude-plugin/plugin.json @ HEAD a2329d2273a6b438e97ee3713ca629ba9c91a428` (Anthropic-OFFICIAL) | **PLANNED — Wave 7 Stream-A ADOPT-NOW (alternative to candidate 2)** | ADAPTED-FROM-SOTA |
| 7.5 | `context-mode@context-mode` | `/plugin marketplace add mksglu/context-mode && /plugin install context-mode@context-mode` — **REQUIRES Elastic-2.0 ACCEPTANCE + STUDY-PILOT GUARDRAILS** | Context continuity plugin + MCP server; persist/restore state across compactions | `https://github.com/mksglu/context-mode @ HEAD e73a6cd56a4eb0a01794b9187902e3f805515286` (Elastic-2.0; AMBER trust; 75d age + 15.6 cpd fast-churn) | **STUDY-PILOT — Wave 7 Stream-A with 6 guardrails; re-audit +90d (2026-08-12)** | ADAPTED-FROM-SOTA (with trust-AMBER caveat) |
| 7.6 | `tdd-guard@tdd-guard` | DEFER until pure runtime declares TDD-enforcement load-bearing | TDD enforcement via hook primitive | `https://github.com/nizos/tdd-guard @ HEAD d0868c39b1ff390cbd4f91899af38c082ec5ef88` (MIT) | **DEFER — Wave 7 Stream-A STUDY-PILOT (overlap-risk with vendored superpowers/tdd)** | n/a |
| 7.7 | `knowledge-work-plugins/*` | DEFER until operator declares knowledge-worker workflow (e.g., finance/legal/marketing) | Anthropic-OFFICIAL knowledge-worker plugins (16 sub-plugins) | `marketplaces/knowledge-work-plugins/.claude-plugin/marketplace.json @ HEAD 9789ea78ad66e395a9c709146cacecdc14ce2abf` (Anthropic-OWNER) | **DEFER — Wave 7 Stream-A STUDY-PILOT (vertical-niche per Probe 7.a)** | n/a |
```

**Audit-trail entry for `docs/install-provenance.md`**:

```md
## 2026-05-14 — Wave 7 Stream-A close-fire — 8-candidate extension probe

- **Source**: this audit at `tmp/sota-pure-wave7-A-extension-probe-2026-05-14.md`
- **Method**: 6-Probe-DAG per `ahfv-probe-dag.md` + convergence-gate Axis 1+2+3 per `convergence-gate.md`
- **Outcomes**: 5 ADOPT-NOW (claude-hud + compound-engineering + superpowers + security-guidance + G1 resolved), 2 STUDY-PILOT-DEFER (tdd-guard + knowledge-work), 1 STUDY-PILOT-WITH-AMBER (context-mode + 6 guardrails), 1 REJECT-FOR-FIT (claude-code-security-review GH Action), 1 RESOLVED-NO-DEFECT (G1 anthropics/skills 2-field intentional), 1 COORDINATE-CORRECTION-REQUIRED (G3 superpowers marketplace = `superpowers-dev` NOT `superpowers`).
- **CR-9 install-risk**: HEAD pins recorded for all 8 candidates; reversibility HIGH via `/plugin disable`
- **Sibling-bleed defense**: N/A (no `Z:/claude-sota/` paths in any install coordinate)
```

---

## HONEST-NON-FINDINGS

1. **claude-code-security-review canonical surface**: The repo at `Z:/repos/deps/claude-code-security-review/` is an **Anthropic-OFFICIAL GitHub Action** (1058★ MIT), NOT a Claude Code plugin. Probe 2 SDK-vs-CLI: FAIL for the in-session use-case Wave-2 Agent E implied. **GENUINE-GAP**: pure runtime's CC-session security guidance is filled by alternative `security-guidance@claude-plugins-official` (Anthropic). The CI-only `claude-code-security-review` GH Action remains valuable but lives at the GitHub Actions layer, NOT the Claude Code plugin layer.

2. **trailofbits/skills NOT in Wave-7 scope** (Wave-2 Agent E flagged as CC-BY-SA-4.0 install candidate): scope clarification — Stream-A's 5 candidates are the 5 INSTALL-class Agent-E top-pick subset (claude-hud, compound-engineering, tdd-guard, plus 2 implicit: knowledge-work + security-review). trailofbits has 38 sub-plugins under CC-BY-SA-4.0 (content license, attribution + share-alike) requiring per-skill license review. **DEFERRED-TO-WAVE-8** for selective skill adoption.

3. **knowledge-work-plugins vertical-niche caveat**: per Wave 6 Agent L SKIP-VERTICAL pattern (anthropic-agent-skills VERTICAL skills like internal-comms/brand-guidelines), the 16 sub-plugins under knowledge-work-plugins are vertical-niche. Default disposition is DEFER unless operator declares (e.g., `engineering@knowledge-work-plugins` could be ADOPT-NOW; `bio-research@knowledge-work-plugins` is vertical-niche SKIP for general-purpose runtime).

4. **Named T2 dated artifacts for Wave-7 candidates**: convergence-gate Axis 2 requires named-T2 practitioner with dated artifact citing THIS specific pattern. For claude-hud (22776★) + compound-engineering (16748★), GitHub star velocity is GitHub popularity metadata, NOT named-T2 endorsement. Wave-2 Agent E catalog citation is TIER-2 evidence (catalog-curated by VoltAgent/hesreallyhim), not TIER-1 named-T2 artifact. **AXIS-2 PARTIAL** for both claude-hud + compound-engineering — disposition ADOPT-NOW retained because Axis 1 + Axis 3 firmly PASS and disposition is install-class with reversible `/plugin disable` rollback path per CR-9.

5. **context-mode `axis-2 named-T2` UNKNOWN**: Wave 1 Agent D Q7 reported `[UNKNOWN]` for named-T2 endorsement; this audit did NOT find a named external practitioner endorsement either. STUDY-PILOT disposition retained with 6 guardrails (per Wave 1 Agent D Edit 12). **GENUINE-GAP** for Axis 2 — guardrails compensate.

6. **Bash glob fallback for marketplace.json plugin count**: `grep -c '"source":'` returned 0 for trailofbits manifest (JSON is single-line stripped maybe). Plugin directory enumeration via `ls plugins/` returned 38 sub-plugins. The actual plugin count is reliable via filesystem enumeration; the grep-count was an audit-tool false-negative. Recorded for `port-note-discipline.md §5 Discipline 4` n-counter audit.

---

## ARTIFACT-INLINE summary

**Verdicts**: 5 ADOPT-NOW (claude-hud + compound-engineering + superpowers/superpowers-dev coordinate + security-guidance alternative + G1 resolved), 2 STUDY-PILOT-DEFER (tdd-guard + knowledge-work-plugins), 1 STUDY-PILOT-WITH-AMBER (context-mode with 6 guardrails + re-audit +90d), 1 REJECT-FOR-FIT (claude-code-security-review is GH Action not CC plugin), 1 RESOLVED-NO-DEFECT (G1 anthropics/skills 2-field is intentional per upstream README L86-88).

**Critical coordinate correction**: G3 superpowers marketplace name is `superpowers-dev` (verified at `Z:/repos/deps/obra/superpowers/.claude-plugin/marketplace.json:2 @ HEAD f2cbfbefebbfef77321e4c9abc9e949826bea9d7`). Install coordinate MUST be `superpowers@superpowers-dev`.

**Source-class ambiguity resolved**: candidate 2 `security-review` → resolved as GitHub Action (`claude-code-security-review`), wrong surface for in-session CC use; alternative `security-guidance@claude-plugins-official` IS the canonical CC plugin (Anthropic-authored).

**3-org Axis-1 convergence**: Anthropic + obra/Jesse Vincent + Jarrod Watts + EveryInc/Kieran Klaassen + Nizar Selander + Mert Koseoglu = 6 distinct upstream orgs across the 8 candidates. Convergence-gate Axis-1 ≥3-orgs SATISFIED at firm-PASS.

**Cite anchor**: `tmp/sota-pure-wave7-A-extension-probe-2026-05-14.md`
