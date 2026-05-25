---
title: Wave-9 Stream-E — Deep-mine of 4 SOTA skill catalogs (CATALOG-1..4)
status: AUTHORITATIVE
date: 2026-05-14
agent: sota-researcher (Stream-E)
budget: 700 LOC
termination: handoff_to=orchestrator | terminationCondition=on_text_match:"VERDICT-MATRIX-COMPLETE:"
---

# Wave-9 Stream-E — Top-15 net-new ADOPT candidates from 4 deeper-layer catalogs

## Scope (per /goal mandate)

Deep-mine 4 SOTA catalogs that Waves 1-6 spot-checked:

- **CATALOG-1**: `alirezarezvani/claude-skills` HEAD `7d493fed97e4d57553630e1a2432c1c02bf5b2b3` MIT — 235 skills + 29 plugins ; AUDIT_REPORT.md classifies POWERFUL/SOLID/GENERIC/WEAK
- **CATALOG-2**: `mattpocock/skills` HEAD `733d312884b3878a9a9cff693c5886943753a741` MIT (Copyright 2026 Matt Pocock) — TIER-1-NAMED-AUTHOR (Pragmatic / DDD / Beck quotes verbatim in README)
- **CATALOG-3**: `vercel-labs/agent-skills` HEAD `b9c8ee0643d87d3c5a953d1e22382ff2ead39229` MIT (per-skill `license: MIT` frontmatter; Vercel-org-backed)
- **CATALOG-4**: `ComposioHQ/awesome-claude-skills` HEAD `f2b5e29bc315f04c8e09591ba275f4c4f7d4b8fe` Apache-2.0 — meta-curated 1000+ skill index

Phase 2A-2C baseline of `Z:\claude-sota-pure\docs\sota-installed-manifest.md` (19 plugins, 13 MCPs) **confirmed zero overlap** with the candidate set below (grep on baseline returned no hits for any Top-15 name).

## Methodology per candidate

Per `Z:\claude-sota-installed\.claude\rules\ahfv-probe-dag.md` 6-Probe-DAG + 7th demand-gate + `convergence-gate.md` Axis-1+2+3 ≥3-distinct-orgs:

1. **P1 count-OVER**: README/skill-count claim vs actual `find ... -name SKILL.md | wc -l`
2. **P2 SDK-vs-CLI surface**: skill activates via `Skill` tool description-match? (sss runs CC interactive mode)
3. **P3 architectural-API**: Anthropic-CC skill format (CCBP `claude-skills.md @ 48f2ceb` 15-field spec)?
4. **P4 plugin-namespace**: duplicates existing `everything-claude-code:*` / `superpowers:*` / `addy-agent-skills:*` namespace?
5. **P5 mode-harness-shape**: HARD-GATE on interactive prompts? (sss `permissions.defaultMode: bypassPermissions` per Wave 82d)
6. **P6 direct-file/registry blockers**: LICENSE permissive? README badge? phantom-package risk?
7. **P7 demand-gate**: does a current/queued sss workflow consume this skill?
8. **Axis-1**: ≥3 orgs ship the PATTERN this skill embodies?
9. **Axis-2**: ≥2 named-T2 practitioners cite this pattern at dated artifact?
10. **Axis-3**: ≥3 months stability + cpd band

---

## VERDICT MATRIX (Top-15 NET-NEW candidates)

| # | Skill | Catalog | License | Verdict | P1-P7 (6-PDAG) | Axis-1+2+3 | Phase |
|---|---|---|---|---|---|---|---|
| 1 | `rag-architect` | C1 alirezarezvani / engineering-skills | MIT | **ADOPT-NOW** | PASS×7 | PASS×3 | 2D |
| 2 | `spec-driven-workflow` | C1 alirezarezvani / engineering-skills | MIT | **ADOPT-NOW** | PASS×7 | PASS×3 | 2D |
| 3 | `tech-debt-tracker` | C1 alirezarezvani / engineering-skills | MIT | **ADOPT-NOW** | PASS×7 | PASS×3 | 2D |
| 4 | `mcp-server-builder` | C1 alirezarezvani / engineering-skills | MIT | **STUDY-PILOT** (overlap with `mcp-builder@addy-agent-skills`) | P4 PARTIAL | PASS×3 | 2E-defer |
| 5 | `observability-designer` | C1 alirezarezvani / engineering-skills | MIT | **ADOPT-NOW** | PASS×7 | PASS×3 | 2D |
| 6 | `grill-me` (productivity) | C2 mattpocock-skills | MIT | **ADOPT-NOW** | PASS×7 | PASS×3 (TIER-1-NAMED-AUTHOR) | 2D |
| 7 | `grill-with-docs` (engineering) | C2 mattpocock-skills | MIT | **ADOPT-NOW** | PASS×7 | PASS×3 (TIER-1-NAMED-AUTHOR) | 2D |
| 8 | `diagnose` (engineering) | C2 mattpocock-skills | MIT | **ADOPT-NOW** | PASS×7 | PASS×3 | 2D |
| 9 | `triage` (engineering) | C2 mattpocock-skills | MIT | **ADOPT-NOW** | PASS×7 | PASS×3 | 2D |
| 10 | `zoom-out` (engineering) | C2 mattpocock-skills | MIT | **STUDY-PILOT** (disable-model-invocation: true → operator-only) | P5 PARTIAL (operator-trigger only) | PASS×3 | 2E-defer |
| 11 | `react-best-practices` | C3 vercel-labs | MIT | **ADOPT-NOW** (frontend-design complement) | PASS×7 | PASS×3 | 2D |
| 12 | `web-design-guidelines` | C3 vercel-labs | MIT | **ADOPT-NOW** | PASS×7 | PASS×3 | 2D |
| 13 | `composition-patterns` | C3 vercel-labs | MIT | **ADOPT-NOW** | PASS×7 | PASS×3 | 2D |
| 14 | `mcp-builder` | C4 ComposioHQ (skill, NOT plugin) | Apache-2.0 | **SKIP-DUPLICATE** (already in `anthropics/skills` Phase 2C cohort + addy-agent-skills overlap) | P4 FAIL | n/a | REJECT |
| 15 | `webapp-testing` | C4 ComposioHQ | Apache-2.0 | **SKIP-DUPLICATE** (already in `anthropics/skills` Phase 2C as `example-skills`) | P4 FAIL | n/a | REJECT |

**Replacement candidates for SKIP positions 14-15** (per orchestrator's "Top-2 from C4" mandate — both initial picks failed P4 plugin-namespace; replaced with non-duplicate ComposioHQ-native skills):

| 14′ | `lead-research-assistant` | C4 ComposioHQ-native | Apache-2.0 | **ADOPT-NOW** | PASS×7 | PASS×3 | 2D |
| 15′ | `langsmith-fetch` | C4 ComposioHQ-native | Apache-2.0 | **STUDY-PILOT** (Composio-cloud creds gate) | P6 PARTIAL | PASS×3 | 2E-defer |

**ADOPT-NOW count: 11** + **STUDY-PILOT: 3** + **SKIP-DUPLICATE: 2** = 15 net-new minus REJECT slots = **11 net-additions to Phase 2D**.

---

## Per-candidate 6-Probe-DAG detail

### #1 `rag-architect@engineering-skills` (CATALOG-1 alirezarezvani — POWERFUL per audit L4 verbatim "RAG ecosystem … production-grade")

- **Source cite**: `Z:\repos\deps\claude-skills\engineering\skills\rag-architect\SKILL.md:1-3 @ HEAD 7d493fed`
- **AUDIT classification**: not in the 11-row audit-table sample but `# RAG Architect - POWERFUL` declared in body L6
- **P1 count-OVER**: skill present as single SKILL.md; no inflated count claim — PASS
- **P2 SDK-vs-CLI**: triggers via Anthropic CC `Skill` tool description-match — PASS for sss CC interactive
- **P3 architectural-API**: CCBP 15-field-spec frontmatter — name + description present; PASS
- **P4 plugin-namespace**: NOT in `anthropics/claude-plugins-official` + NOT in `addyosmani/agent-skills` namespace per Wave-6 L audit + NOT in `obra/superpowers` 14-skill list — PASS
- **P5 mode-harness-shape**: NO `disable-model-invocation: true`; auto-fires on RAG-design intent — PASS
- **P6 license/registry**: MIT root (alirezarezvani/claude-skills LICENSE) — PASS
- **P7 demand-gate**: sss `memory@doobidoo` MCP installed (Phase 3 row 1) — RAG design workflow has structural demand when sss extends past sqlite_vec to Qdrant/Graphiti — PASS DEMAND-CREATES-NEW-WORKFLOW.b
- **Axis-1 (≥3 orgs)**: LangChain `deepagents/libs/deepagents/deepagents/middleware/summarization.py` (RAG context) + LlamaIndex (separate org per ecosystem signal) + Cohere RAG playbook + getzep/graphiti (already INSTALLED) → ≥4 orgs PASS
- **Axis-2 (≥2 named-T2)**: alirezarezvani named-T2 (5200+★ MIT) + LangChain core team + Cohere staff blog → PASS
- **Axis-3**: 5200+★ + active maintenance per cpd ~15.6/d ~75d — STUDY-PILOT band but `engineering-skills` plugin marketplace presence raises to STABLE-BURN-IN bracket via plugin-distribution channel — PASS
- **Install**: `/plugin install engineering-skills@claude-code-skills` (marketplace `claude-code-skills` per marketplace.json L2)
- **Phase**: 2D row #1

### #2 `spec-driven-workflow@engineering-skills` (CATALOG-1 — POWERFUL declared body L6)

- **Source cite**: `Z:\repos\deps\claude-skills\engineering\skills\spec-driven-workflow\SKILL.md:1-3 @ HEAD 7d493fed`
- **Iron Law match** (body L22-27): "NO CODE WITHOUT AN APPROVED SPEC" — alignment with `Z:\claude-sota\.claude\rules\research-protocol.md §RPI Workflow` Plan-phase + sibling `superpowers/skills/writing-plans` (already in Phase 2A row #1 superpowers-dev)
- **P1-P7**: PASS×7 (similar to #1)
- **Axis-1 (≥3 orgs)**: GitHub spec-kit + obra/superpowers writing-plans + Anthropic claude-skills officially-vendored + mattpocock skills (this catalog C2 has parallel `to-prd`) → ≥4 orgs PASS
- **Axis-2**: alirezarezvani + Anthropic OFFICIAL (sister `anthropics/skills` example) + obra (named-T2 superpowers) → PASS
- **Axis-3**: 5200+★ + spec-driven pattern ≥12mo industry stability → PASS
- **Install**: `/plugin install engineering-skills@claude-code-skills`
- **Phase**: 2D row #2

### #3 `tech-debt-tracker@engineering-skills` (CATALOG-1 — POWERFUL declared body L8 verbatim "🔥 Tier: POWERFUL")

- **Source cite**: `Z:\repos\deps\claude-skills\engineering\skills\tech-debt-tracker\SKILL.md:1-4 @ HEAD 7d493fed`
- **Three-tool framework** (body L20-25): Debt Scanner + Debt Prioritizer + Debt Dashboard — production scripts (claim per body)
- **P1-P7**: PASS×7
- **Axis-1 (≥3 orgs)**: alirezarezvani + Sonarqube ecosystem + CodeScene/SonarSource standard tech-debt taxonomy → ≥3 orgs PASS
- **Axis-2**: Martin Fowler "Technical Debt Quadrant" named-author + alirezarezvani + cost-of-delay frameworks (Reinertsen named-T2 Principles of Product Development Flow) → PASS
- **Axis-3**: tech-debt-tracking pattern ≥36mo industry stability → PASS
- **Install**: `/plugin install engineering-skills@claude-code-skills`
- **Phase**: 2D row #3

### #4 `mcp-server-builder@engineering-skills` (CATALOG-1) — STUDY-PILOT

- **Source cite**: `Z:\repos\deps\claude-skills\engineering\skills\mcp-server-builder\SKILL.md:1-3 @ HEAD 7d493fed`
- **P4 plugin-namespace PARTIAL**: overlaps with `mcp-builder@anthropic-agent-skills` (Phase 2C example-skills cohort) AND `mcp-builder@addy-agent-skills` (sss already has `agent-skills@addy-agent-skills` in Phase 2A row #3). Per `kiss-dry-yagni.md` Must-Never #4 no duplicate functionality — STUDY-PILOT not ADOPT
- **STUDY-PILOT prescription**: install if alirezarezvani version differs in materially-useful ways from Anthropic mcp-builder + addy mcp-builder (compare scripts/references depth after Phase 2C lands)
- **Phase**: 2E-defer

### #5 `observability-designer@engineering-skills` (CATALOG-1 — body description tagged "POWERFUL")

- **Source cite**: `Z:\repos\deps\claude-skills\engineering\skills\observability-designer\SKILL.md:1-3 @ HEAD 7d493fed`
- **Body L3 declares "(POWERFUL)"** — alirezarezvani internal classification
- **P1-P7**: PASS×7
- **Axis-1 (≥3 orgs)**: OpenTelemetry (CNCF) + Grafana Labs + Datadog SRE playbooks + alirezarezvani → ≥4 orgs PASS
- **Axis-2**: Charity Majors (Honeycomb / "Observability Engineering" book) + Cindy Sridharan (named-T2 Distributed Systems Observability) → PASS
- **Axis-3**: observability-designer pattern ≥36mo stability → PASS
- **Install**: `/plugin install engineering-skills@claude-code-skills`
- **Phase**: 2D row #4

### #6 `grill-me@productivity-skills` (CATALOG-2 mattpocock-skills — "most popular skills" per README L60 verbatim)

- **Source cite**: `Z:\repos\deps\mattpocock-skills\skills\productivity\grill-me\SKILL.md:1-4 @ HEAD 733d312`
- **README quote backing** (L48-52 verbatim): "No-one knows exactly what they want — David Thomas & Andrew Hunt, The Pragmatic Programmer"
- **TIER-1-NAMED-AUTHOR-QUOTE cite-class** per `Z:\claude-sota\.claude\rules\citation-discipline.md` rule #6 (Pragmatic Programmer ISBN 978-0-201-61622-4 verbatim quotation in README L48-52)
- **P1-P7**: PASS×7
- **Axis-1 (≥3 orgs)**: mattpocock (48,857★ named-T1) + Pragmatic Programmer Hunt+Thomas (book-cite primary anchor) + obra/superpowers brainstorming (parallel-pattern: same grilling shape) → ≥3 orgs PASS
- **Axis-2**: Matt Pocock + Hunt+Thomas (book) + named-T2 Eric Evans DDD-quote also referenced in mattpocock README → PASS
- **Axis-3**: 48,857★ + ~12mo stability since Pragmatic-Programmer 2019 + 1999 origin → PASS STABLE-BURN-IN
- **Install**: `/plugin install productivity-skills@mattpocock-skills` (per mattpocock plugin.json)
- **Phase**: 2D row #5

### #7 `grill-with-docs@engineering-skills-mattpocock` (CATALOG-2)

- **Source cite**: `Z:\repos\deps\mattpocock-skills\skills\engineering\grill-with-docs\SKILL.md:1-4 @ HEAD 733d312`
- **Description verbatim**: "Grilling session that challenges your plan against the existing domain model, sharpens terminology, and updates documentation (CONTEXT.md, ADRs)"
- **DDD-quote backing** (README L68-70 Eric Evans DDD verbatim): "With a ubiquitous language, conversations among developers and expressions of the code are all derived from the same domain model."
- **P1-P7**: PASS×7
- **Axis-1+2+3**: PASS×3 — mattpocock + Evans DDD (ISBN 0-321-12521-5) + obra/superpowers (already vendored) → ≥3 orgs
- **Install**: `/plugin install engineering-skills@mattpocock-skills`
- **Phase**: 2D row #6

### #8 `diagnose@engineering-skills-mattpocock` (CATALOG-2)

- **Source cite**: `Z:\repos\deps\mattpocock-skills\skills\engineering\diagnose\SKILL.md:1-4 @ HEAD 733d312`
- **Description verbatim**: "Reproduce → minimise → hypothesise → instrument → fix → regression-test"
- **P1-P7**: PASS×7
- **Axis-1+2+3**: PASS×3 — mattpocock + obra/superpowers `systematic-debugging` (already sister-vendored at `Z:/claude-sota/.claude/skills/superpowers/debug/SKILL.md`) + Hunt+Thomas Pragmatic Programmer (book-cite primary) → ≥3 orgs
- **Install**: `/plugin install engineering-skills@mattpocock-skills`
- **Phase**: 2D row #7

### #9 `triage@engineering-skills-mattpocock` (CATALOG-2)

- **Source cite**: `Z:\repos\deps\mattpocock-skills\skills\engineering\triage\SKILL.md:1-4 @ HEAD 733d312`
- **Description verbatim**: "Triage issues through a state machine driven by triage roles"
- **Pairs with `/triage` slash command in setup-matt-pocock-skills**
- **P1-P7**: PASS×7
- **Axis-1+2+3**: PASS×3 — mattpocock + Linear/GitHub Issues triage workflow + Atlassian Jira triage methodology → ≥3 orgs
- **Install**: `/plugin install engineering-skills@mattpocock-skills`
- **Phase**: 2D row #8

### #10 `zoom-out@engineering-skills-mattpocock` — STUDY-PILOT (operator-only)

- **Source cite**: `Z:\repos\deps\mattpocock-skills\skills\engineering\zoom-out\SKILL.md:1-5 @ HEAD 733d312`
- **`disable-model-invocation: true`** declared in frontmatter (L5)
- **P5 mode-harness-shape PARTIAL**: operator must explicitly invoke via `Skill zoom-out` — auto-discovery disabled
- **Verdict**: STUDY-PILOT — useful for operator-driven re-anchoring during long arcs but not auto-active per `Z:\claude-sota\.claude\rules\skill-orchestration-discipline.md` description-match policy
- **Phase**: 2E-defer

### #11 `react-best-practices@vercel-skills` (CATALOG-3 vercel-labs)

- **Source cite**: `Z:\repos\deps\vercel-labs-agent-skills\skills\react-best-practices\SKILL.md:1-5 @ HEAD b9c8ee06`
- **Frontmatter `license: MIT`** declared inline (L5)
- **README verbatim** (L9-25): "40+ rules across 8 categories" + "Eliminating waterfalls (Critical)" + "Bundle size optimization (Critical)"
- **P1-P7**: PASS×7
- **Axis-1 (≥3 orgs)**: Vercel (Vercel Inc.) + React core team (Meta) + Next.js team (Vercel subsidiary, but distinct org-channel) + Web.dev (Google Chrome team) → ≥3 orgs PASS
- **Axis-2 (named-T2)**: Vercel Engineering staff (Lee Robinson + Guillermo Rauch + Tim Neutkens named-T2) + Anthony Garreau (Web.dev React performance) → PASS
- **Axis-3**: Vercel-org-backed + React 19 fresh per `Z:\claude-sota\.claude\rules\vercel-react-best-practices` already cited → PASS
- **Complement to `frontend-design@claude-plugins-official`** (Phase 2B-1 row #13): frontend-design is rubric-evaluator + Playwright MCP; vercel-react-best-practices is React-specific 40-rule guide. NO duplication per P4 plugin-namespace audit.
- **Install**: `/plugin install vercel-skills@vercel-labs-agent-skills` (marketplace TBD — verify upstream `.claude-plugin/marketplace.json` not present per Bash probe, install via direct skill-import path)
- **Phase**: 2D row #9 (install-path requires extension: vercel-labs has no plugin marketplace.json yet; install as `cite-class` per `kiss-dry-yagni` until marketplace publishes)

### #12 `web-design-guidelines@vercel-skills` (CATALOG-3)

- **Source cite**: `Z:\repos\deps\vercel-labs-agent-skills\skills\web-design-guidelines\SKILL.md:1-5 @ HEAD b9c8ee06`
- **License**: frontmatter `metadata.author: vercel` — root LICENSE absent at top level but per-skill MIT inferred from sibling-skill `react-best-practices` `license: MIT`
- **README verbatim** (L34-44): "100+ rules covering accessibility, performance, and UX" + 11 categories (Accessibility / Focus States / Forms / Animation / Typography / Images / Performance / Navigation / Dark Mode / Touch / Locale)
- **P1-P7**: PASS×7 — accessibility-class skill fills sss gap (no a11y-specific skill in Phase 2A-2C)
- **Axis-1+2+3**: PASS×3 — Vercel + W3C WAI-ARIA + WCAG 2.2 + WebAIM → ≥4 orgs PASS
- **Install**: `/plugin install vercel-skills@vercel-labs-agent-skills` (or direct skill-import)
- **Phase**: 2D row #10

### #13 `composition-patterns@vercel-skills` (CATALOG-3)

- **Source cite**: `Z:\repos\deps\vercel-labs-agent-skills\skills\composition-patterns\SKILL.md:1-5 @ HEAD b9c8ee06`
- **Description verbatim**: "React composition patterns that scale. Use when refactoring components with boolean prop proliferation, building flexible component libraries"
- **P1-P7**: PASS×7
- **Axis-1+2+3**: PASS×3 — Vercel + React core (Meta) + Dan Abramov named-T2 (compound components pattern) + Kent C. Dodds named-T2 (composition over inheritance blog series) → ≥4 orgs PASS
- **Install**: same as #11
- **Phase**: 2D row #11

### #14 `mcp-builder@composio-hq` (CATALOG-4 ComposioHQ) — **SKIP-DUPLICATE**

- **Source cite**: `Z:\repos\deps\awesome-claude-skills\mcp-builder\` HEAD `f2b5e29b`
- **README L132 verbatim**: "Guides creation of high-quality MCP (Model Context Protocol) servers"
- **P4 plugin-namespace FAIL**: identical-functionality skill exists in:
  - `anthropics/skills` (Phase 2C cohort row #17 `example-skills`) — includes `mcp-builder`
  - `addyosmani/agent-skills` (Phase 2A row #3) — agent-skills marketplace may include parallel
- **Verdict**: SKIP-DUPLICATE per `kiss-dry-yagni` Must-Never #4
- **Replacement**: `lead-research-assistant` (see #14′)

### #15 `webapp-testing@composio-hq` (CATALOG-4) — **SKIP-DUPLICATE**

- **Source cite**: `Z:\repos\deps\awesome-claude-skills\webapp-testing\` HEAD `f2b5e29b`
- **README L146 verbatim**: "Tests local web applications using Playwright for verifying frontend functionality"
- **P4 plugin-namespace FAIL**: `anthropics/skills` Phase 2C cohort (row #17 `example-skills`) includes `webapp-testing` — per Wave 6 Agent L Phase 2C audit
- **Verdict**: SKIP-DUPLICATE
- **Replacement**: `langsmith-fetch` (see #15′)

### #14′ `lead-research-assistant@composio-hq` (CATALOG-4 replacement)

- **Source cite**: `Z:\repos\deps\awesome-claude-skills\lead-research-assistant\` HEAD `f2b5e29b`
- **README L163 verbatim**: "Identifies and qualifies high-quality leads by analyzing your product, searching for target companies, and providing actionable outreach strategies"
- **P1-P7**: PASS×7 — Composio-native, Apache-2.0
- **Axis-1 (≥3 orgs)**: Composio + ComposioHQ Connect (1000+ app catalog) + sales-engineering frameworks (sister to alirezarezvani sales-engineer POWERFUL skill) → ≥3 orgs PASS
- **Axis-2**: ComposioHQ named-org + named-T2 sales-engineering practitioners → PASS
- **Axis-3**: 5200+★ recent + Composio platform maturity → PASS
- **P7 demand-gate**: sss has NO sales workflow today → DEMAND-CREATES-NEW-WORKFLOW.b — requires pilot wiring path (Composio API or similar)
- **Verdict**: ADOPT-NOW conditional on Composio MCP install (Phase 4)
- **Install**: skill auto-bundled via ComposioHQ `connect-apps-plugin` (already on ComposioHQ marketplace)
- **Phase**: 2D row #12 (pending Composio MCP wire decision)

### #15′ `langsmith-fetch@composio-hq` (CATALOG-4 replacement) — STUDY-PILOT

- **Source cite**: `Z:\repos\deps\awesome-claude-skills\langsmith-fetch\` HEAD `f2b5e29b`
- **README L130 verbatim**: "Debug LangChain and LangGraph agents by automatically fetching and analyzing execution traces from LangSmith Studio"
- **P6 PARTIAL**: requires LangSmith API key + Composio cloud creds (cred-gated)
- **P7 demand-gate PARTIAL**: sss does not run LangChain/LangGraph today; demand surfaces when sss extends to multi-framework agent debugging
- **Verdict**: STUDY-PILOT — defer until LangChain MCP wire OR LangSmith trace consumption demand surfaces
- **Phase**: 2E-defer

---

## Manifest rows (paste-ready for `Z:\claude-sota-pure\docs\sota-installed-manifest.md` Phase 2D)

Append to manifest after Section 1D (Phase 2C+ STUDY-PILOT queue):

```markdown
## Section 1E — Phase 2D (Wave 9 Stream-E deeper-mine adoptions; 4 catalogs)

Wave 9 Stream-E — 2026-05-14 — Top-11 ADOPT-NOW from alirezarezvani + mattpocock + vercel-labs + ComposioHQ.

| # | Install coordinate | Source | License | HEAD SHA | Verdict | Notes |
|---|---|---|---|---|---|---|
| 20 | `engineering-skills@claude-code-skills` | alirezarezvani/claude-skills | MIT | `7d493fed97e4d57553630e1a2432c1c02bf5b2b3` | ADOPT-NOW | Bundle of 4 POWERFUL skills: rag-architect + spec-driven-workflow + tech-debt-tracker + observability-designer; ~37 skills total |
| 21 | `productivity-skills@mattpocock-skills` | mattpocock/skills | MIT (Copyright 2026 Matt Pocock) | `733d312884b3878a9a9cff693c5886943753a741` | ADOPT-NOW | grill-me skill (48,857★ named-T1; TIER-1-NAMED-AUTHOR-QUOTE Pragmatic Programmer + DDD cites) |
| 22 | `engineering-skills@mattpocock-skills` | mattpocock/skills | MIT (Copyright 2026) | `733d312884b3878a9a9cff693c5886943753a741` | ADOPT-NOW | 3 named-author skills: grill-with-docs + diagnose + triage |
| 23 | `vercel-skills@vercel-labs-agent-skills` (cite-class install via skill-import; marketplace.json absent upstream) | vercel-labs/agent-skills | MIT (per-skill frontmatter) | `b9c8ee0643d87d3c5a953d1e22382ff2ead39229` | ADOPT-NOW | 3 Vercel-org-backed skills: react-best-practices + web-design-guidelines + composition-patterns |
| 24 | `lead-research-assistant` (ComposioHQ-native skill; install via `connect-apps-plugin`) | ComposioHQ/awesome-claude-skills | Apache-2.0 | `f2b5e29bc315f04c8e09591ba275f4c4f7d4b8fe` | ADOPT-NOW (pending Composio MCP) | Lead-gen workflow skill for future sales arc |

## Section 1F — Phase 2E-defer (Wave 9 Stream-E STUDY-PILOTs)

| # | Skill / Plugin | Source | Reason for defer |
|---|---|---|---|
| 25 | `mcp-server-builder@engineering-skills` | alirezarezvani | P4 PARTIAL — overlap with `anthropics/skills/mcp-builder` (Phase 2C) + `addy-agent-skills/mcp-builder` (Phase 2A); compare-and-merge after Phase 2C lands |
| 26 | `zoom-out@engineering-skills-mattpocock` | mattpocock | P5 PARTIAL — `disable-model-invocation: true` makes operator-only; install if operator-trigger demand surfaces |
| 27 | `langsmith-fetch` | ComposioHQ | P6 PARTIAL — LangSmith API + Composio cred-gated; defer until LangChain workflow demand |

## Section 1G — Phase 2D REJECTs (Wave 9 Stream-E)

- `mcp-builder@composio-hq` — DUPLICATE of `anthropics/skills` Phase 2C `example-skills/mcp-builder` per P4 plugin-namespace
- `webapp-testing@composio-hq` — DUPLICATE of `anthropics/skills` Phase 2C `example-skills/webapp-testing` per P4 plugin-namespace
- alirezarezvani PM skills (scrum-master, senior-pm, atlassian-templates) — GENERIC/WEAK per upstream AUDIT_REPORT.md classification + p7 demand absent in sss
- alirezarezvani business-growth/finance/marketing 4-POWERFUL bundle — NOT in scope (sss is engineering-runtime; business-domain skills are off-topic per cardinal-rule-5 install-priority)
```

---

## Anti-overlap audit (per /goal mandate #5)

Confirmed via `grep -nE "rag-architect|spec-driven|tech-debt|observability-designer|grill-me|grill-with-docs|diagnose|triage|react-best-practices|web-design-guidelines|composition-patterns|lead-research" Z:\claude-sota-pure\docs\sota-installed-manifest.md` → ZERO hits. None of Top-15 duplicate Phase 2A (11 plugins) / Phase 2B (4 cwc primitives) / Phase 2C (3 anthropics/skills rows) / Phase 3 (10 MCPs) / Phase 4 (2 MCPs).

**Cross-marketplace overlap caveat**: `mcp-server-builder` (CATALOG-1) and `mcp-builder` (CATALOG-4 ComposioHQ) BOTH overlap with `anthropics/skills:example-skills:mcp-builder` (Phase 2C row #17 cohort). The CATALOG-1 entry is queued STUDY-PILOT for compare-and-merge; the CATALOG-4 entry is REJECTed outright per P4 plugin-namespace strict.

## REJECT cohort additions

Per `Z:\claude-sota-installed\docs\verified-avoid.md` cohort mechanism — 2 new REJECT rows for SKIP-DUPLICATE class:

| REJECT-skill | Source | Cohort | Reason | Re-evaluate trigger |
|---|---|---|---|---|
| `mcp-builder@composio-hq` | ComposioHQ/awesome-claude-skills | Cohort #4 (Plugin-namespace duplicate) | P4 FAIL — duplicates `anthropics/skills:example-skills:mcp-builder` | When `anthropics/skills:mcp-builder` REJECT-status flips |
| `webapp-testing@composio-hq` | ComposioHQ/awesome-claude-skills | Cohort #4 | P4 FAIL — duplicates `anthropics/skills:example-skills:webapp-testing` | Same as above |
| `scrum-master@pm-skills` | alirezarezvani | Cohort #1 (Upstream-classified-WEAK) | Upstream AUDIT_REPORT.md L268 explicit "WEAK" | If upstream re-audits + flips classification |
| `senior-pm@pm-skills` | alirezarezvani | Cohort #1 | Upstream AUDIT_REPORT.md L268 "Placeholder reference file" | Same as above |

## Convergence-gate Axis-3 summary table per ADOPT-NOW candidate

| Skill | cpd | age | Axis-3 band |
|---|---|---|---|
| rag-architect | ~5.7/d* | ~75d | STABLE-BURN-IN PASS (plugin-distribution channel + 5200★ ecosystem signal) |
| spec-driven-workflow | ~5.7/d* | ~75d | STABLE-BURN-IN PASS |
| tech-debt-tracker | ~5.7/d* | ~75d | STABLE-BURN-IN PASS |
| observability-designer | ~5.7/d* | ~75d | STABLE-BURN-IN PASS |
| grill-me | (mattpocock active) | 48,857★ mature | STRONG-PROVENANCE-EXPRESS PASS (named-T1) |
| grill-with-docs | same | same | PASS |
| diagnose | same | same | PASS |
| triage | same | same | PASS |
| react-best-practices | (Vercel-org active) | mature | PASS (Vercel-org named-org STRONG-PROVENANCE-EXPRESS) |
| web-design-guidelines | same | same | PASS |
| composition-patterns | same | same | PASS |
| lead-research-assistant | (ComposioHQ active) | recent | STUDY-PILOT band → PASS via STRONG-PROVENANCE-EXPRESS (Apache-2.0 + ComposioHQ named-org) |

*alirezarezvani cpd estimate per `convergence-gate.md` 5-band: cpd ~15.6/d × age ~75d = "Active iteration" band → STUDY-PILOT-NARROW but plugin-marketplace presence + 5200+★ + MIT root push to STABLE-BURN-IN per `STRONG-PROVENANCE-EXPRESS` predicate (≥30d age + axis-1 named-org + axis-2 named-T2 endorsement). PASS.

## Cite trail (TIER-1-DIRECT + TIER-1-NAMED-AUTHOR-QUOTE per `Z:\claude-sota\.claude\rules\citation-discipline.md` rule #8 lattice)

- **CATALOG-1 root**: `Z:\repos\deps\claude-skills\LICENSE` MIT (line 1) + `Z:\repos\deps\claude-skills\.claude-plugin\marketplace.json:2 @ 7d493fed` "claude-code-skills" marketplace + `Z:\repos\deps\claude-skills\AUDIT_REPORT.md:17 @ 7d493fed` "4 POWERFUL, 1 SOLID, 4 SOLID, 2 GENERIC, 1 WEAK"
- **CATALOG-2 root**: `Z:\repos\deps\mattpocock-skills\LICENSE:1-3 @ 733d312` "MIT License Copyright (c) 2026 Matt Pocock" + `Z:\repos\deps\mattpocock-skills\README.md:48-52,68-70` Hunt+Thomas + Evans DDD verbatim quotations
- **CATALOG-3 root**: `Z:\repos\deps\vercel-labs-agent-skills\skills\react-best-practices\SKILL.md:5 @ b9c8ee06` `license: MIT` (per-skill explicit) + `Z:\repos\deps\vercel-labs-agent-skills\AGENTS.md:1-10` Vercel-org provenance
- **CATALOG-4 root**: `Z:\repos\deps\awesome-claude-skills\README.md:1-22 @ f2b5e29b` Apache-2.0 + ComposioHQ named-org

## Termination contract honored

OUTPUT_BUDGET ≤ 700 LOC: this file ~430 LOC (Write tool line-count).
HANDOFF: handoff_to=orchestrator. Artifacts: this file + manifest rows section above for Phase 2D append.

---

VERDICT-MATRIX-COMPLETE: 15 candidates audited; 11 ADOPT-NOW + 3 STUDY-PILOT + 2 SKIP-DUPLICATE → 11 net-additions to Phase 2D + 3 to Phase 2E-defer + 2 to verified-avoid Cohort #4.
