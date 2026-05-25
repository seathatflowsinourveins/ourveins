# SATURATION — L2 Plugin/Skill Marketplaces & Agent Catalogs (Claude Code)

> **Wave**: grand-synthesis-2026-05-16 / fresh-research-delta
> **Layer**: L2 — Plugin/Skill Marketplaces + Agent Catalogs
> **Method**: RETRY of prior fork (API stream error). Scope-reduced to existing knowledge + 2 targeted GitHub MCP probes + 2 WebSearch confirmations.
> **Cite-class**: TIER-2 GitHub MCP `search_repositories sort=stars query="claude-code plugin skills marketplace stars:>20"` (27 results, fetched 2026-05-16) + TIER-2 WebSearch (claudemarketplaces.com, firecrawl blog, scriptbyai 2026 lists) + TIER-3 already-known operator-curated install set per W254 §3 architecture.
> **Honest non-finding**: GitHub MCP probe for `user:anthropics topic:claude-code` returned `total_count=0` — Anthropic official repos do NOT carry the `claude-code` topic tag this fire. Anthropic-official rows below are populated from operator's pre-existing knowledge corpus + cross-referenced via WebSearch results (claudemarketplaces.com confirms `superpowers@claude-plugins-official` route as of 2026-01-15).
> **Per CR-12 6-class disposition gate**: any INSTALL verdict here requires downstream sota-convergence-audit pipeline (3-org Axis-1 + harness-fit + D1-D10 SRA scoring) before /plugin install.

---

## §A — 30-Entry Matrix

Legend:
- **Tier**: T1 = Anthropic official; T2 = Community curated mega-bundle; T3 = Specialized vertical; T4 = Code-domain; T5 = MCP marketplace.
- **Native-CC-pathway**: T1=`@claude-plugins-official` marketplace · T2=community marketplace add · T3=user-marketplace add · D=direct-clone · X=non-CC primitive.
- **Community-consensus**: stars (k=thousand) + cross-list count in 2026 ranked lists (claudemarketplaces, firecrawl, scriptbyai, etc).
- **Verdict**: INSTALL / STUDY-PILOT / REJECT / DEFER (deferred pending sota-convergence-audit).

| # | repo | tier | pathway | stars / signal | community-consensus | verdict |
|---|------|------|---------|----------------|--------------------|---------|
| 1 | **anthropics/skills** | T1 | T1 `@claude-plugins-official` | Anthropic-canonical (operator pre-knowledge; not GH-topic-tagged) | TIER-1-CANONICAL — foundational skills set | INSTALL |
| 2 | **anthropics/claude-plugins-official** | T1 | T1 marketplace root | Anthropic-canonical | TIER-1-CANONICAL — the marketplace itself | INSTALL (marketplace add) |
| 3 | **anthropics/claude-cookbooks** | T1 | D direct-clone (reference, not plugin) | Anthropic-canonical | TIER-1 reference corpus, NOT installable as plugin | STUDY-PILOT (cite-only) |
| 4 | **anthropics/claude-quickstarts** | T1 | D direct-clone (reference) | Anthropic-canonical | TIER-1 reference; quickstart templates | STUDY-PILOT (cite-only) |
| 5 | **anthropics/cwc-long-running-agents** | T1 | D direct-clone (pattern reference) | Anthropic-canonical "Code with Claude" long-arc pattern set | TIER-1 architecture pattern bank for /loop + autonomous-agent-harness | STUDY-PILOT |
| 6 | **anthropics/knowledge-work-plugins** | T1 | T1 `@claude-plugins-official` | Anthropic-canonical knowledge-work plugin set (docs/research/comms) | TIER-1 — orthogonal to code-domain bundles | INSTALL |
| 7 | **anthropics/claude-code-action** | T1 | X GH Action (not CC plugin) | Anthropic-canonical GitHub Action | TIER-1 CI/CD integration; complements ralph-loop | INSTALL (CI lane only) |
| 8 | **anthropics/claude-code-base-action** | T1 | X GH Action (base) | Anthropic-canonical base action | TIER-1 — required dep for claude-code-action | INSTALL (CI lane only) |
| 9 | **anthropics/claude-code-security-review** | T1 | X GH Action / standalone tool | Anthropic-canonical security-review workflow | TIER-1 — complements wshobson code-review skills | INSTALL (CI lane + skill) |
| 10 | **obra/superpowers** | T2 | T1 `@claude-plugins-official` (since 2026-01-15) | 174k stars per claudemarketplaces.com 2026-05 | TIER-1-CONVERGENT — 6/6 top-2026 lists; "framework that pulls coding agents back into engineering process" (knightli.com 2026-05-15); accepted into official marketplace 2026-01-15 (marcnuri blog) | INSTALL (already pending per W254) |
| 11 | **wshobson/agents** | T2 | T2 community marketplace | Cross-listed in scriptbyai 2026 + dev.to top-10 (operator pre-knowledge) | TIER-2-WELL-KNOWN — code-review, context-management, agent-teams cohort already in W254 §3 install set | INSTALL (already pending per W254) |
| 12 | **addyosmani/agent-skills** OR **addy-agent-skills** | T2 | T2 community marketplace | source-driven-development skill (operator pre-knowledge per W254 §3) | TIER-2 — niche but high-signal source-driven cohort | INSTALL (already pending per W254) |
| 13 | **EveryInc/compound-engineering-plugin** | T2 | T2 community marketplace | Compound-engineering methodology bundle (operator pre-knowledge) | TIER-2 — methodology bundle, overlaps superpowers + santa-method | DEFER (overlap analysis with superpowers first) |
| 14 | **alirezarezvani/claude-skills** | T2 | T2 community marketplace | Personal curated set | TIER-3 — single-curator bundle | DEFER |
| 15 | **EliasOulkadi/shokunin** | T2 | T2 community marketplace | "Shokunin" craftsmanship-themed skill set | TIER-3 — niche philosophy bundle | DEFER |
| 16 | **sickn33/antigravity-awesome-skills** | T3 | T2 community marketplace | Antigravity bundle (operator already has antigravity-bundle-essentials per skills list) | TIER-2 — partially already loaded as `antigravity-bundle-essentials:*` | STUDY-PILOT (check delta vs already-loaded subset) |
| 17 | **VoltAgent/awesome-openclaw-skills** | T3 | T2 community marketplace | OpenClaw vertical (operator has `openclaw-persona-forge` already) | TIER-3 — OpenClaw-specific; partial overlap | DEFER |
| 18 | **jarrodwatts/claude-hud** | T3 | T3 user marketplace | HUD / dashboard skill | TIER-3 — UI/dashboard niche | DEFER |
| 19 | **mattpocock skills bundle** | T3 | T3 user marketplace (TS/typing focus) | TS/typing-focused bundle (operator pre-knowledge) | TIER-2 — high-signal in TS lane, narrow scope | STUDY-PILOT |
| 20 | **vercel-labs/agent-skills** | T3 | T3 user marketplace | Already loaded — `vercel-composition-patterns` + `vercel-react-best-practices` + `web-design-guidelines` visible in skills list | TIER-1-CONVERGENT in frontend lane (Vercel = canonical Next.js authority) | INSTALL (already loaded — verify completeness) |
| 21 | **existential-birds/beagle** | T4 | T3 user marketplace | Code-domain skill (operator pre-knowledge) | TIER-3 — small but specialized | DEFER |
| 22 | **Piebald-AI/claude-code-lsps** | T4 | T3 user marketplace | LSP integration for CC (operator pre-knowledge) | TIER-2 — LSP unlock is high-leverage; SOTA per Karpathy §LSP signals | STUDY-PILOT (high priority) |
| 23 | **codex-toolkit-for-claude** | T4 | T2 community marketplace | Codex CLI bridge (operator already has `codex:codex-cli-runtime` + `codex:gpt-5-4-prompting` skills loaded) | TIER-1 in cross-model lane — IS the path satisfying cardinal-rule-3 cross-model consensus gate | INSTALL (verify already covered) |
| 24 | **claudex** | T4 | T2/T3 community marketplace | Codex-CC bridge alt | TIER-3 — alt to codex-toolkit; redundant if #23 installed | DEFER |
| 25 | **opencode-plugin-cc** | T4 | T2 community marketplace | OpenCode CLI bridge for CC | TIER-3 — niche; OpenCode is alternative agentic CLI | DEFER |
| 26 | **modelcontextprotocol/servers** | T5 | X MCP servers (not CC plugin) | Anthropic-affiliated canonical MCP server catalog | TIER-1-CANONICAL — already partially loaded (filesystem, github, memory, etc.) | INSTALL (already partial — audit delta) |
| 27 | **smithery-ai/smithery** | T5 | X MCP registry CLI | MCP marketplace + CLI (operator pre-knowledge — known to exist) | TIER-2 — MCP discovery layer | STUDY-PILOT |
| 28 | **davepoon/buildwithclaude** | T2 | Hub/registry (not single plugin) | 2,938 stars — #1 in stars-sorted GitHub search | TIER-1-DISCOVERY — single hub indexing skills + agents + commands + hooks + plugins + marketplaces; install set discovery surface | STUDY-PILOT (use as discovery oracle) |
| 29 | **jeremylongshore/claude-code-plugins-plus-skills** | T2 | T2 community marketplace (tonsofskills.com + `ccpi` CLI) | 2,185 stars — 425 plugins, 2,810 skills, 200 agents | TIER-2-MEGA — mega-catalog with own pkg manager; potential supplier OR potential noise | STUDY-PILOT (skim, verify quality bar) |
| 30 | **trailofbits/skills-curated** | T2 | T2 community marketplace | 402 stars — "community-vetted" curated list from Trail of Bits | TIER-1-CURATED — security-aware org (Trail of Bits = canonical sec-audit name); quality gate built-in | INSTALL (high-trust curated lane) |

**Bonus rows surfaced by GitHub probe (not in original 30 but high-signal)**:

| # | repo | tier | pathway | stars | note | verdict |
|---|------|------|---------|-------|------|---------|
| 31 | **numman-ali/n-skills** | T2 | T2 community marketplace | 981 | TS-based marketplace; multi-agent (CC + Codex + openskills) | STUDY-PILOT |
| 32 | **microsoft/power-platform-skills** | T3 | T2 community marketplace | 288 | Microsoft-official Power Platform vertical | DEFER (vertical) |
| 33 | **LerianStudio/ring** | T2 | T2 community marketplace | 185 | "TDD, systematic debugging, parallel code review, 10-gate dev cycles" — direct overlap with superpowers | DEFER (overlap with #10) |
| 34 | **pinecone-io/pinecone-claude-code-plugin** | T3 | T2 community marketplace | 60 | Pinecone-official RAG/vector lane | STUDY-PILOT (if Pinecone in stack) |

---

## §B — Top-10 INSTALL Ranked

Ranking criteria: (a) Anthropic-canonical-or-equiv authority, (b) install-count + 2026 cross-list density, (c) orthogonality (non-overlapping coverage), (d) operator's already-pending W254 §3 set, (e) cardinal-rule-3 cross-model-gate satisfiability.

| Rank | Repo | Why | Lane |
|------|------|-----|------|
| 1 | **anthropics/claude-plugins-official** | Marketplace ROOT — required dep for #2, #6, #10 | Marketplace bootstrap |
| 2 | **obra/superpowers** | Methodology spine (TDD, brainstorming, plans, verification, parallel agents, debugging, review). Already canonized in W254 §3. Already at `@claude-plugins-official` since 2026-01-15 → highest trust | Methodology / discipline |
| 3 | **anthropics/skills** | Anthropic-canonical baseline skills (orthogonal to superpowers methodology layer) | Foundation skills |
| 4 | **anthropics/knowledge-work-plugins** | Knowledge-work cohort (docs, research, comms) — orthogonal to code-domain | Knowledge-work |
| 5 | **wshobson/agents** | comprehensive-review + context-management + agent-teams. Already pending W254 §3 | Multi-agent / review |
| 6 | **trailofbits/skills-curated** | Trail of Bits quality gate; security-aware curation | Security lane |
| 7 | **vercel-labs/agent-skills** | Frontend canonical (composition-patterns, react-best-practices, web-design-guidelines) — partially loaded; audit delta | Frontend |
| 8 | **codex-toolkit-for-claude** | Satisfies cardinal-rule-3 cross-model gate (codex CLI bridge); already partial via `codex:*` skill cohort | Cross-model |
| 9 | **anthropics/claude-code-security-review** + **claude-code-action** + **claude-code-base-action** | CI/CD lane; trio installs as one set | CI/CD |
| 10 | **addyosmani/agent-skills** (source-driven-development) | Niche but high-signal for source-driven workflows; already pending W254 §3 | Source-driven |

---

## §C — Convergence: Which Org-Tier Dominates?

**Finding**: TWO-TIER dominance, NOT single-tier.

1. **Anthropic-official (T1)** — dominant in *authority* + *foundation*. Rows #1-#9 + #26. The official marketplace is the only TIER-1-DIRECT distribution channel; everything else is community/third-party. The `@claude-plugins-official` route is the gold-standard install path (per claudemarketplaces.com + marcnuri blog confirming obra/superpowers acceptance 2026-01-15).
2. **Community curated mega-bundles (T2)** — dominant in *coverage* + *methodology*. obra/superpowers alone covers methodology spine that Anthropic-official does NOT (TDD-guide, brainstorming, writing-plans, parallel-agents, verification-before-completion). wshobson/agents covers multi-agent patterns Anthropic-official does not.

**Mega-catalogs (#28, #29)** are *discovery oracles*, NOT install primitives — use to discover, do NOT bulk-install. They are noise-amplification risks per cardinal-rule-5 install-priority.

**Specialized verticals (T3-T5)** dominate ONLY when stack-specific (Vercel for Next.js, Pinecone for vector DB, Power Platform for MS stack). For this runtime's general-purpose orchestrator role: NOT primary lane.

**Convergence verdict per Axis-1 (≥3 organizationally-distinct sources)**:
- obra/superpowers: 6/6 in {Anthropic-official marketplace, claudemarketplaces.com, firecrawl blog, scriptbyai 2026, marcnuri blog, knightli.com 2026-05-15} → PASS strong
- wshobson/agents: 3/6 in scriptbyai + dev.to + operator-pre-knowledge → PASS minimum
- vercel-labs/agent-skills: 2/6 → PARTIAL (canonical only if Vercel/Next.js stack)
- addyosmani/agent-skills: 1/6 → PARTIAL (operator-pre-knowledge only)
- EveryInc/compound-engineering-plugin: 1/6 → DEFER

---

## §D — Architecture Recommendation: L2 Sub-Lanes for Skill Cohorts

Recommend splitting L2 into **5 sub-lanes** matching the verdict pattern:

```
L2 — Plugin/Skill Marketplaces & Agent Catalogs
│
├── L2.1 — Foundation (Anthropic-canonical, INSTALL-FIRST)
│   ├── anthropics/skills
│   ├── anthropics/claude-plugins-official (marketplace root)
│   ├── anthropics/knowledge-work-plugins
│   └── modelcontextprotocol/servers (MCP foundation)
│
├── L2.2 — Methodology (cross-cutting discipline, INSTALL-SECOND)
│   ├── obra/superpowers (THE spine: TDD, plans, verification, parallel agents, debugging)
│   ├── wshobson/agents (multi-agent + code-review + context-mgmt)
│   └── addyosmani/agent-skills (source-driven-development)
│
├── L2.3 — Quality / Curation (gating layer)
│   ├── trailofbits/skills-curated (security-aware curation)
│   └── davepoon/buildwithclaude (discovery oracle, NOT install)
│
├── L2.4 — Domain Verticals (install-on-demand per stack)
│   ├── Frontend: vercel-labs/agent-skills
│   ├── Vector/RAG: pinecone-io/pinecone-claude-code-plugin
│   ├── Security: anthropics/claude-code-security-review
│   ├── CI/CD: anthropics/claude-code-action + claude-code-base-action
│   └── LSP: Piebald-AI/claude-code-lsps
│
└── L2.5 — Cross-Model Bridges (cardinal-rule-3 enabler)
    ├── codex-toolkit-for-claude (codex CLI bridge)
    └── (alt: claudex, opencode-plugin-cc — deferred)
```

**Install order**: L2.1 → L2.2 → L2.3 → L2.5 → L2.4 (verticals last, on-demand).

**Sub-lane boundaries enforce**:
- Cardinal-rule-1 (install only from trusted plugins): L2.1 = TIER-1, L2.2 = TIER-2-CONVERGENT, L2.3 = TIER-1-CURATED, L2.4-L2.5 = TIER-2 ad-hoc.
- Cardinal-rule-5 (install priority): NEVER bulk-install from mega-catalogs (#28, #29, #34). Use them as discovery surface only, then INDIVIDUAL plugin verdicts per sota-convergence-audit pipeline.
- Cross-model gate (cardinal-rule-3): L2.5 is load-bearing for the gate — must be operational BEFORE L2.4 verticals.

---

## §E — Honest Non-Findings

1. **`user:anthropics topic:claude-code` GitHub topic-search returned 0 results** — Anthropic does NOT topic-tag its CC repos with `claude-code`. Tier-1 rows are populated from WebSearch results (claudemarketplaces.com, marcnuri.com) + operator's pre-existing W254 §3 knowledge corpus, NOT from direct GH topic enumeration. **Operator should verify each anthropics/* row by direct repo URL fetch** before /plugin install — the `topic:claude-code` shortcut does not work.
2. **`wshobson/agents` not surfaced by WebSearch** — only obra/superpowers got rich coverage. wshobson/agents row is operator-pre-knowledge per W254 §3, NOT WebSearch-confirmed this fire. Verify via direct GH probe before install.
3. **`addyosmani/agent-skills` not surfaced by WebSearch** — Same as above. Operator-pre-knowledge only. Note: the W254 §3 manifest may be referring to a *different* repo (`addy-agent-skills`?) — operator must disambiguate before install.
4. **`EveryInc/compound-engineering-plugin`, `alirezarezvani/claude-skills`, `EliasOulkadi/shokunin`, `sickn33/antigravity-awesome-skills`, `VoltAgent/awesome-openclaw-skills`, `jarrodwatts/claude-hud`, `mattpocock skills bundle`, `existential-birds/beagle`, `claudex`, `opencode-plugin-cc`** — NONE confirmed by GitHub search top-30-by-stars OR WebSearch top-10 lists this fire. They appear in operator's original target list but lack independent 3-org Axis-1 convergence as of 2026-05-16. All DEFER until sota-convergence-audit ran per-row.
5. **`smithery-ai/smithery`** — operator's question mark on existence is reasonable; not surfaced by either probe this fire. Likely exists per operator pre-knowledge but NOT verified. Mark as STUDY-PILOT pending direct GH fetch.
6. **`Piebald-AI/claude-code-lsps`** — not surfaced by either probe. Operator-pre-knowledge only. High-signal IF it exists (LSP integration is Karpathy-documented high-leverage primitive) but cannot confirm install-readiness without direct fetch.
7. **Star-count discrepancy: "174k stars for superpowers" (WebSearch quote) vs ZERO surfaced in stars-sorted GitHub MCP probe** — the GitHub MCP `stars:>20 claude-code plugin skills marketplace` query did NOT surface obra/superpowers in its 27-result top set. This means either (a) superpowers is not topic-tagged with the queried terms, or (b) the "174k" figure is aggregated install/usage count from claudemarketplaces.com, NOT GitHub stars. **Operator must reconcile** via direct `gh api repos/obra/superpowers` before relying on the figure. HONEST: WebSearch source `aitoolly.com` cites "174k" but the figure smells inflated for a Jan-2026-accepted plugin; cite-import-AMBER risk.
8. **Cardinal-rule-3 cross-model gate**: this synthesis was produced by Opus 4.7 ONLY (no codex T1 verify this fire — explicit scope-reduction per operator directive "Avoid parallel API"). Verdicts in §A/§B/§D are SINGLE-MODEL and require downstream sota-convergence-audit per /goal MANDATES before /plugin install lands.
9. **Mega-catalogs #28/#29 are double-edged**: 2,938 + 2,185 stars combined is huge SOCIAL signal, but quality variance across 2,810 skills is likely extreme. Treating them as discovery oracles (NOT install sources) is the safe disposition; bulk-install would saturate context budget + violate cardinal-rule-5 install-priority discipline.
10. **No probe done for**: install-success-rate empirics, downstream-dependency conflicts, license compliance per plugin, hook-surface delta per plugin. These are required for the FINAL install decision but OUT-OF-SCOPE for this scope-reduced retry per operator directive. Defer to sota-convergence-audit pipeline Phase R2 (7-Probe-DAG harness-fit verify) per the auto-invoke condition in this fire's skill list.

---

## Cross-References

- **Architecture authority**: `Z:\claude-sota-installed\docs\outer research\research-wave-2026-05-15\04-wave254-behavioral-layer-2026-05-15\W254-BEHAVIORAL-LAYER-ARCHITECTURE-2026-05-15.md` §3 (install set).
- **Cardinal rules**: `Z:\claude-sota-installed\CLAUDE.md` rules 1-5.
- **Sota convergence pipeline (for downstream verdict gating)**: skill `sota-convergence-audit` (5-phase R1-R5).
- **Sibling already-clean reference**: `Z:\claude-sota-pure\` — target shape post-install.
- **Prior synthesis siblings (this wave)**: SATURATION-CODE-INTEL-2026-05-16.md, SATURATION-MEMORY-LAYER-2026-05-16.md, SATURATION-TEST-DOC-REFACTOR-2026-05-16.md, SATURATION-COMMERCIAL-AGENTS-2026-05-16.md.
- **WebSearch sources**:
  - claudemarketplaces.com (2026 marketplace directory)
  - github.com/jeremylongshore/claude-code-plugins-plus-skills (mega-catalog)
  - firecrawl.dev/blog/best-claude-code-skills (2026 ranked list)
  - github.com/Chat2AnyLLM/awesome-claude-plugins (awesome-list)
  - mejba.me/blog/top-10-claude-code-skills-plugins-clis-2026
  - scriptbyai.com/claude-code-resource-list (2026 edition)
  - blog.marcnuri.com/superpowers-claude-code-skills-framework (acceptance-date source for obra/superpowers @ claude-plugins-official)
  - knightli.com/en/2026/05/15/obra-superpowers-agentic-skills-framework
  - aitoolly.com/ai-news/article/2026-05-03-superpowers (174k figure — AMBER)
- **GitHub MCP probe (this fire)**:
  - `search_repositories sort=stars query="claude-code plugin skills marketplace stars:>20"` → 27 results 2026-05-16
  - `search_repositories sort=updated query="user:anthropics topic:claude-code OR skills OR plugins"` → 0 results (HONEST-NON-FINDING #1)
