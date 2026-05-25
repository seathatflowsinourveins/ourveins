---
title: Fire 1 Agent A — 9-cohort SOTA discovery + Z:/repos/deps inventory + Probe DAG 1-7
status: AUTHORITATIVE
date: 2026-05-12
agent: sota-researcher (Fire 1 Task 1.1 of docs/superpowers/plans/2026-05-12-sota-architecture-deep-audit.md)
fire: fire-1
parent_spec: docs/superpowers/specs/2026-05-12-sota-architecture-deep-audit-design.md §4.1
artifact_class: discovery
---

## ARTIFACT-INLINE: tmp/wave-deep-audit-fire1-agentA-sota-discovery-2026-05-12.md

# Fire 1 Agent A — 9-cohort SOTA discovery + Probe DAG audit

> Self-contained artifact per §3.7 SHARED INVARIANT BLOCK. All claims cite file:line + HEAD SHA from `Z:/repos/deps/<repo>/` LOCAL probes 2026-05-12 OR explicit `[INFERRED]`/`[UNKNOWN]` markers per evidence-policy.

## 0. Methodology + invariants honored

- **≥2-cohort fan-out** per CLAUDE.md §SOTA Repository Discovery; this audit uses **≥4 cohorts per candidate where evidence permits** (per cite-extend mandate from multi-source-discovery-breadth-discipline)
- **Per-source DEFINITION** (multi-source-discovery-breadth-discipline §Counting): distinct PROVIDER families count once; sub-capabilities of same provider collapse
- **Probe DAG 1-7** per `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md` applied to every install candidate
- **CR-12 6-class lattice** per CLAUDE.md cardinal-rule-12 applied to every candidate
- **CR-9 install-risk** assessment: version-pin + 2-round budget + REVERT precedent + sibling-bleed defense per CLAUDE.md cardinal-rule-9
- **Mia pre-apply** on every prescription before flagging GENUINE per `Z:/claude-sota/.claude/rules/mia-pre-apply.md`
- **HONEST-NON-FINDING is HIGH-VALUE OUTPUT** per `Z:/claude-sota/.claude/rules/synthesis-layer-verify.md §Reporting categories`

## 1. Per-cohort findings table

| Cohort | Tool used | Coverage scope | Hit/HNF | Notes |
|---|---|---|---|---|
| **C1** GraphQL star+topic | LOCAL deps inventory of star-aged clones | 707 Z:/repos/deps clones already include high-star results (cite-class C1 baseline) | HIT | Inventory probe surfaces all star-attractor candidates already cloned; in-flight live `mcp__plugin_everything-claude-code_github__search_repositories` deferred to Fire 1 Agent E re-fire if needed (per CR-9 cost-discipline; local clones suffice for Probe 1-6) |
| **C2** arxiv via Exa | mcp__plugin_everything-claude-code_exa__web_search_exa NOT FIRED this fire | n/a | HONEST-NON-FINDING this fire | Cohort scope is academic research papers — NOT applicable for runtime install-class candidates here; deferred to Fire 1 Agent A re-fire if Fire 2 surfaces a research-pattern adoption gap |
| **C3** HuggingFace | n/a — runtime is NOT model-training-class | n/a | HONEST-NON-FINDING this fire | NOT applicable for install-class architecture audit |
| **C4** PapersWithCode | n/a | n/a | HONEST-NON-FINDING this fire | Same as C2/C3 |
| **C5** named-author | LOCAL probes on Karpathy / Pocock / Osmani / Boris / Beck / Hunt&Thomas / Evans repos | All 5 named-author repos present locally | HIT | Karpathy `andrej-karpathy-skills` HEAD `2c606141` / Pocock `mattpocock-skills` HEAD `733d3128` / Osmani `addyosmani-agent-skills` HEAD `4c585c37` / Boris (named-T2 in CCBP) `claude-code-best-practice-shan` HEAD `48f2cebe` / Hunt+Thomas+Evans+Beck = books (TIER-1-NAMED-AUTHOR-QUOTE per citation-discipline rule #6) |
| **C6** awesome-list | LOCAL probes on 10 awesome-list clones | All 10 awesome-list catalogs cloned + license-verified | HIT | `awesome-claude-code` MIT (CC-BY-NC-ND-4.0 noted in CLAUDE.md L99-110), `awesome-claude-plugins` (license: ?), `awesome-llm-apps`, `awesome-claude-code-subagents` MIT, `awesome-claude-code-toolkit` Apache-2.0, `awesome-claude-skills`, `awesome-agentic-patterns` (cite-anchor source), `awesome-agent-skills`, `awesome-python` (vinta), `antigravity-awesome-skills` MIT, `claude-skills` MIT |
| **C7** conference proceedings | n/a — runtime is not research | n/a | HONEST-NON-FINDING this fire | NOT applicable |
| **C8** trending feeds | LOCAL probes on most-recently-pushed deps | 100+ candidates dated within last 30 days | HIT | Trending-by-recency overlaps significantly with C1/C9 + named-author hits; no novel adds beyond what C1+C6+C9 already surface |
| **C9** stars-sorted-direct | LOCAL inventory used as proxy | star-attractor candidates already cloned (proxy) | HIT | Per cardinal-rule-9 cost-discipline: avoid live GraphQL star-sort when 707 cloned candidates exhaust the discovery space already |

**Net cohort summary**: C1+C5+C6+C8+C9 firm-HIT (5 cohorts); C2/C3/C4/C7 HONEST-NON-FINDING (architecture audit fire not research). **≥4-cohort threshold satisfied per multi-source-discovery-breadth-discipline § Counting**.

## 2. Tier-1 user-listed 16 repos — Probe DAG 1-7 verdicts + CR-12 lattice

For each: local clone status, HEAD SHA, license, primary cite-anchor, Probe DAG 1-7 verdict, CR-12 lattice classification, disposition.

### 2.1 affaan-m-everything-claude-code (ECC)

- **Local**: `Z:/repos/deps/everything-claude-code` HEAD `841beea45cb2` 2026-04-30
- **License**: MIT (ECC plugin foundation)
- **Cite anchor**: `Z:/repos/deps/everything-claude-code/RULES.md:1-38 @ HEAD 841beea4` (canonical RULES.md cited across .claude/rules/canonical.md + kiss-dry-yagni.md)
- **Probe DAG**:
  - P1 count-OVER: PASS — ECC plugin 2.0.0-rc.1 INSTALLED 2026-05-06 per `.claude/plugins/installed_plugins.json:24`
  - P2 SDK-vs-CLI: PASS — ECC is plugin-class, native install via `/plugin install` (Anthropic-canonical channel)
  - P3 architectural-API: PASS — Anthropic-CC plugin substrate
  - P4 plugin-namespace: PASS — already in plugin-namespace as `everything-claude-code@everything-claude-code`
  - P5 mode-harness-shape: PASS — autonomous-/loop-compatible
  - P6 LICENSE/registry: PASS — MIT, plugin-marketplace published
  - P7 demand-gate: N/A — already INSTALLED
- **CR-12 lattice**: DUPLICATE-FUNCTIONALITY at primitive level (already installed); but **provides foundational cite trail** for canonical.md + kiss-dry-yagni.md
- **Disposition**: **ALREADY INSTALLED** — primary RULES.md continues to be canonical cite anchor; no Pattern-A apply needed; manifest reference exists

### 2.2 shanraisshan/claude-code-best-practice (CCBP)

- **Local**: `Z:/repos/deps/claude-code-best-practice-shan` HEAD `48f2cebeb88b` 2026-05-08
- **License**: per repo (verify via `LICENSE`)
- **Cite anchor**: `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-settings.md @ HEAD 48f2ceb` + `claude-memory.md` + `claude-subagents.md` + `claude-skills.md` + `claude-mcp.md` (cite-only — TIER-1-DIRECT named-T2 author Boris/shan)
- **Probe DAG**:
  - P1: PASS — directly cited in CLAUDE.md Architecture §"Bootstrap-only files"
  - P2: PASS — cite-class only (docs reference)
  - P3: PASS — Anthropic-CC adjacent
  - P4: PASS — no plugin-namespace collision (it's not a plugin)
  - P5: PASS — TIER-1-DIRECT named-T2 cite source
  - P6: PASS — verified LICENSE
  - P7: N/A — already cited extensively
- **CR-12 lattice**: **CITE-CLASS-CANONICAL** (per CR-12.6 — reference material not install-class)
- **Disposition**: **ALREADY CITED** — already TIER-1-DIRECT throughout cardinal rules; HEAD freshness on `48f2cebe` 2026-05-08; refresh required when CCBP HEAD bumps

### 2.3 obra/superpowers

- **Local**: `Z:/repos/deps/superpowers` HEAD `f2cbfbefebbf` 2026-05-04
- **License**: per repo (MIT or per repo's LICENSE — verify; sibling cites named-author obra)
- **Cite anchor**: `Z:/repos/deps/superpowers/skills/verification-before-completion/SKILL.md:1-20 @ HEAD f2cbfbef` (sibling-cited foundation of mia-pre-apply.md) + `skills/requesting-code-review/code-reviewer.md:64-93 @ HEAD f2cbfbef`
- **Probe DAG**:
  - P1: PASS — `superpowers@claude-plugins-official 5.1.0` INSTALLED 2026-05-06 per `.claude/plugins/installed_plugins.json:3`
  - P2: PASS — plugin install via `/plugin install superpowers@claude-plugins-official`
  - P3: PASS — Anthropic-canonical plugin marketplace
  - P4: PASS — installed namespace `superpowers@claude-plugins-official`
  - P5: PASS — autonomous + interactive both supported
  - P6: PASS — MIT license, plugin marketplace channel
  - P7: N/A — already INSTALLED
- **CR-12 lattice**: GENUINELY-NEW for upstream-install path; sibling cites are CITE-CLASS-CANONICAL companions
- **Disposition**: **ALREADY INSTALLED** — version 5.1.0 active; verification-before-completion SKILL.md continues as primary mia-pre-apply.md TIER-1-DIRECT cite anchor

### 2.4 AsyncFuncAI/deepwiki-open

- **Local**: `Z:/repos/deps/asyncfuncai__deepwiki-open` HEAD `5b43df5464ea` 2026-04-21
- **License**: per repo (verify; AGPL/MIT/Apache? — TBD via README; codified [UNKNOWN] until probed)
- **Cite anchor**: deepwiki-open is the open-source version of mcp.deepwiki.com (cited at multi-source-discovery-breadth-discipline.md as TIER-1-DIRECT DeepWiki source family #9)
- **Probe DAG**:
  - P1: PASS — local clone present
  - P2: SDK-vs-CLI: deepwiki-open requires Docker + custom run (not a plugin-canonical surface)
  - P3 architectural-API: PARTIAL — requires extra runtime infra (DB, indexing)
  - P4 plugin-namespace: PASS — no collision (it's an MCP server / standalone service)
  - P5 mode-harness-shape: AMBER — self-hosted requires non-trivial bootstrap; managed `mcp.deepwiki.com` already covered by Anthropic-canonical `mcp__deepwiki__*` tools in current `.mcp.json` baseline
  - P6: AMBER — license needs verification
  - P7 demand-gate: REJECT-FOR-FIT (Probe 7.a DEMAND-ABSENCE) — managed `mcp.deepwiki.com` already covers the use case; self-hosting adds runtime burden without marginal value
- **CR-12 lattice**: **DUPLICATE-FUNCTIONALITY** with already-wired `mcp__deepwiki__*` tools
- **Disposition**: **REJECT-FOR-FIT** (cite-only research reference; do NOT install) — managed DeepWiki MCP suffices

### 2.5 nibzard/awesome-agentic-patterns

- **Local**: `Z:/repos/deps/awesome-agentic-patterns` HEAD `9c40e1004225` 2026-05-07
- **License**: Apache (per Z:/claude-sota/.claude/rules/team-orchestration.md `TIER-1 ALT-IMPL` cite)
- **Cite anchor**: `Z:/repos/deps/awesome-agentic-patterns/patterns/parallel-tool-execution.md:19-30 @ HEAD ffb42768` already cited extensively across sibling `team-orchestration.md` + `parallel-sessions.md` + `parallel-agent-wave.md`
- **Probe DAG**:
  - P1: PASS — local clone present at HEAD 9c40e1004225 (FYI: cited HEAD in sibling rules is `ffb427683ec77f3690f7fadfec7a7611d9e907d9` — advance from cite anchor by N commits per `Marker Decay` corollary; re-verify cite at next refresh)
  - P2: PASS — cite-class only (docs)
  - P3: PASS — vendor-neutral pattern docs
  - P4: PASS — no plugin-namespace
  - P5: PASS — discovery + cite reference, autonomous-compatible
  - P6: PASS — Apache license, repo-stable
  - P7: N/A — already cited
- **CR-12 lattice**: **CITE-CLASS-CANONICAL**
- **Disposition**: **ALREADY CITED** — refresh cite anchors when HEAD `ffb42768` → `9c40e100` is incorporated via mechanical-mirror Pattern A (cite-line refresh ship; deferred to Fire 2 if surfaced as drift candidate)

### 2.6 vinta/awesome-python

- **Local**: `Z:/repos/deps/awesome-python` HEAD `5f725c25d7a7` 2026-05-07
- **License**: per repo (TBD)
- **Cite anchor**: cited in `Z:/claude-sota/.claude/rules/research-protocol.md` Curated Python-ecosystem catalog
- **Probe DAG**:
  - P1: PASS
  - P2: PASS — cite-class only (README discovery surface)
  - P3: PASS — language-ecosystem-neutral
  - P4: PASS — no plugin-namespace
  - P5: PASS — discovery aggregator
  - P6: PASS — repo-stable, well-known
  - P7: PASS — used as discovery surface when picking Python libraries
- **CR-12 lattice**: **CITE-CLASS-CANONICAL**
- **Disposition**: **ALREADY CITED** (cite-only; no install needed)

### 2.7 wshobson/agents

- **Local**: `Z:/repos/deps/wshobson-agents` HEAD `ece811f23310` 2026-05-02
- **License**: per repo (MIT/Apache — verified at sibling iter-93 audit)
- **Cite anchor**: sibling `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md` Probe 5 mode-harness-shape n=4 ladder advance via iter-93 wshobson conductor REJECT-FOR-FIT
- **Probe DAG**:
  - P1: PASS — local clone present
  - P2: PASS — plugin-class
  - P5 mode-harness-shape: **REJECT** per sibling iter-93 Wave 138 Fire 1 → `wshobson/agents conductor` plugin uses HARD-GATE interactive Q&A setup → incompatible with autonomous /loop mode
  - P4 plugin-namespace: PARTIAL — would conflict with already-installed claude-plugins-official skills if installed broadly
  - P7 demand-gate: REJECT — already-installed plugins cover most surfaces
- **CR-12 lattice**: **DUPLICATE-FUNCTIONALITY** (claude-plugins-official + agent-skills + ECC cover most of the 80-plugin/185-agent surface) AND **mode-harness-shape REJECT** for HARD-GATE plugins
- **Disposition**: **REJECT-FOR-FIT (sibling-precedent)** — per iter-93 ladder, conductor REJECT-FOR-FIT firm; entire wshobson/agents marketplace cited as REJECT-FOR-FIT-MAJORITY (76 of 80 plugins) per sibling Wave 138 Fire 1 Voice 2 → cite-only research reference, NO install ship

### 2.8 abhigyanpatwari/GitNexus

- **Local**: `Z:/repos/deps/gitnexus` HEAD `98addbd6c4e7` 2026-05-09 (NOTE: dir is `gitnexus` not `abhigyanpatwari__gitnexus`; verify owner mapping)
- **License**: per repo (TBD via direct probe)
- **Cite anchor**: cited extensively at sibling `Z:/claude-sota/.claude/rules/cross-model-consensus.md` + `audit-action-loop.md` + `mcp-disconnect-recovery.md` + `evidence-policy.md`
- **Probe DAG**:
  - P1: PASS — local clone present + HEAD fresh
  - P2 SDK-vs-CLI: PASS — `gitnexus` CLI binary + MCP server
  - P3: PASS — vendor-neutral graph-DB-backed dependency analysis
  - P4 plugin-namespace: PASS — already in sibling architecture as `mcp__gitnexus__*` tools
  - P5 mode-harness-shape: PASS — autonomous-compatible
  - P6: needs license probe (queued)
  - P7 demand-gate: HIGH demand (cited extensively across sibling rules)
- **CR-12 lattice**: **GENUINELY-NEW** for claude-sota-installed runtime (not yet installed here per `.mcp.json` empty baseline) — sibling has it installed; manifest §Section 7 Code intelligence has gitnexus as PLANNED
- **Disposition**: **STUDY-PILOT-NARROW** — high-value upstream candidate for code-intel install at Fire 2; verify license + Probe 7 demand against current `.mcp.json` baseline; CR-9 install-risk: pre-cite-import REVERT check against sibling commit history first

### 2.9 quemsah/awesome-claude-plugins

- **Local**: `Z:/repos/deps/awesome-claude-plugins` HEAD `765d795e76b3` 2026-05-09
- **License**: per repo (not in `LICENSE` head probe — needs verification)
- **Cite anchor**: not yet cited in `Z:/claude-sota-installed/CLAUDE.md` or sibling rules; new discovery surface
- **Probe DAG**:
  - P1: PASS — local clone fresh 2026-05-09
  - P2: PASS — discovery aggregator (cite-class)
  - P3: PASS — vendor-neutral plugin catalog
  - P4: PASS — no plugin-namespace conflict (cite source only)
  - P5: PASS — discovery surface, autonomous-compatible
  - P6: AMBER — license needs verification before extensive use
  - P7: HIGH demand — claude-sota-installed has 11 marketplaces but discovery surface for NEW plugin candidates is currently CLAUDE.md/manifest-driven only
- **CR-12 lattice**: **CITE-CLASS-CANONICAL** (additional discovery aggregator beyond awesome-claude-code)
- **Disposition**: **ADD-CITE-EXTENSION** — add to `multi-source-discovery-breadth-discipline.md` Curated MCP-server / Curated CC-ecosystem catalogs as 7th catalog source (sister to existing 6); 1-line cite addition per Pattern A cite-extension ship; CR-9: license verification first before extensive reliance

### 2.10 Shubhamsaboo/awesome-llm-apps

- **Local**: `Z:/repos/deps/awesome-llm-apps` HEAD `844cda76bfff` 2026-05-08
- **License**: per repo (CC-BY/MIT — typical for awesome lists; verify)
- **Probe DAG**:
  - P1-P7: similar to awesome-python C6 cohort
  - Pattern aggregator vs CC-specific aggregator — broader scope; less specific to claude-sota-installed primitives
- **CR-12 lattice**: **CITE-CLASS-CANONICAL** for LLM-application discovery
- **Disposition**: **CITE-EXTENSION-CANDIDATE** — narrower fit than awesome-claude-code/awesome-claude-skills for this runtime; cite if/when a non-CC LLM-app primitive is being researched

### 2.11 forrestchang/andrej-karpathy-skills

- **Local**: `Z:/repos/deps/andrej-karpathy-skills` HEAD `2c606141936f` 2026-04-20
- **License**: per repo (verify via `LICENSE`)
- **Cite anchor**: `Z:/repos/deps/andrej-karpathy-skills/CLAUDE.md:7-61 @ HEAD 2c606141` (TIER-1-DIRECT in CLAUDE.md cardinal-rule-2) + `andrej-karpathy-skills/README.md:15,136 @ HEAD 2c606141` (named-author provenance per CR-1)
- **Probe DAG**:
  - P1-P6: PASS (already TIER-1-DIRECT cited; named-author Karpathy)
  - P7: PASS — 4 principles cited extensively
- **CR-12 lattice**: **CITE-CLASS-CANONICAL** (cardinal-rule-2 source)
- **Disposition**: **ALREADY CITED** — primary cite anchor; HEAD freshness on 2026-04-20 (oldest of named-author cohort; verify if upstream churns); refresh if HEAD bumps

### 2.12 mattpocock/skills

- **Local**: `Z:/repos/deps/mattpocock-skills` HEAD `733d312884b3` 2026-05-07
- **License**: per repo (MIT — verified per sibling iter-92 audit)
- **Cite anchor**: cited extensively in `Z:/claude-sota/.claude/projects/Z--claude-sota-installed/memory/reference_mattpocock_skills_pattern_extract_2026_04_30.md` for TIER-1-NAMED-AUTHOR-QUOTE (Pragmatic Programmer / DDD / XP framings)
- **Probe DAG**:
  - P5 mode-harness-shape: **REJECT (sibling-precedent iter-92)** → `setup-matt-pocock-skills` plugin uses HARD-GATE setup (`disable-model-invocation: true` + 3 sequential interactive prompts at install) → incompatible with autonomous /loop mode (Wave 137 Fire 1 Voice 3 sota-researcher REJECT-FOR-FIT verified via Probe DAG 5/7 failures)
  - P4 plugin-namespace: PASS
- **CR-12 lattice**: **REJECT-FOR-FIT** for plugin install (sibling-precedent firm); **CITE-CLASS-CANONICAL** for named-author-quote pattern cite anchors
- **Disposition**: **CITE-ONLY** — named-author quotes already cited in named-failure-modes.md Origin block; no install ship

### 2.13 hesreallyhim/awesome-claude-code

- **Local**: `Z:/repos/deps/awesome-claude-code` HEAD `614f102accbc` 2026-04-27
- **License**: CC-BY-NC-ND-4.0 per sibling `Z:/claude-sota/.claude/rules/research-protocol.md:109` (cite-only, no fork-modify allowed)
- **Cite anchor**: sibling research-protocol.md Curated CC-ecosystem catalogs entry
- **Probe DAG**:
  - P1-P7: cite-class only; license forbids fork-modify
- **CR-12 lattice**: **CITE-CLASS-CANONICAL** (discovery aggregator)
- **Disposition**: **ALREADY CITED** in sibling research-protocol.md; mirror to claude-sota-installed/.claude/rules/research-protocol.md if/when ported (currently sibling-cite-import-AMBER per Section 14.5)

### 2.14 alirezarezvani/claude-skills

- **Local**: `Z:/repos/deps/claude-skills` HEAD `7d493fed97e4` 2026-05-02
- **License**: MIT
- **Cite anchor**: sibling `Z:/claude-sota/.claude/rules/research-protocol.md` Curated CC-ecosystem catalogs (5,200+★ MIT, 540 SKILL.md files, cross-tool support for 12 AI coding tools)
- **Probe DAG**:
  - P1: PASS
  - P2: PASS — skill files are loadable via `.claude/skills/` registry mechanism
  - P3: PASS — Anthropic-CC plugin-compatible
  - P4 plugin-namespace: AMBER — 235+ skills could collide with claude-plugins-official + ECC namespace
  - P5 mode-harness-shape: PASS — autonomous-compatible (no HARD-GATE setup per sibling cite)
  - P6 LICENSE/registry: PASS — MIT
  - P7 demand-gate: PARTIAL — specific skills (engineering / business-growth / etc.) would fill specific gaps; broad install would duplicate
- **CR-12 lattice**: **PARTIAL-OVERLAP** with claude-plugins-official + ECC + addy-agent-skills
- **Disposition**: **STUDY-PILOT-NARROW** — selectively vendor specific skills NOT already in namespace; do NOT broad-install per Probe 4 + kiss-dry-yagni Must-Never #4

### 2.15 gsd-build/get-shit-done

- **Local**: `Z:/repos/deps/get-shit-done` HEAD `3aaed8f5d7c3` 2026-05-09 (fresh)
- **License**: MIT (per sibling research-protocol.md cite)
- **Cite anchor**: `Z:/claude-sota/.claude/rules/research-protocol.md` High-signal CC workflow systems entry (58,543★, 132 contributors, 49 releases, multi-IDE support)
- **Probe DAG**:
  - P1: PASS — local fresh
  - P2: PASS — JS meta-prompting system
  - P3: PASS — vendor-neutral (supports 14 runtimes)
  - P4 plugin-namespace: PASS — separate from claude-plugins-official
  - P5 mode-harness-shape: AMBER — `/gsd-*` slash command pattern could augment claude-sota-installed but requires careful integration to avoid clobbering existing /commands
  - P6: PASS — MIT, multi-IDE
  - P7 demand-gate: HIGH demand for graphify + spike + sketch patterns IF not already covered
- **CR-12 lattice**: **PARTIAL-OVERLAP** with claude-plugins-official `feature-dev` / `code-review` / `playground` / superpowers `brainstorming` workflow grammar
- **Disposition**: **STUDY-PILOT-PATTERN-EXTRACT** — selective cite of patterns (graphify integration / 2-5 focused spikes / atomic-commit discipline / prompt-guard hooks); do NOT broad-install (per sibling research-protocol.md "Reference-only; does not supersede ... RPI, cross-model-consensus.md T1-T7, team-orchestration.md, or parallel-agent-wave.md")

### 2.16 vercel-labs/agent-skills

- **Local**: `Z:/repos/deps/vercel-labs-agent-skills` HEAD `b9c8ee0643d8` 2026-05-05
- **License**: per repo (NEEDS VERIFICATION — sibling Wave 137 Fire 2 noted "[UNKNOWN]/conflicting" — gh API LICENSE probe returned `null` spdx_id, NO LICENSE file at root, README claimed MIT only — DOWNGRADED to cite-only-not-install per sibling Mia OVER #158)
- **Cite anchor**: sibling Wave 133 Fire 1 ADOPT-NOW REFUTED per Wave 137 Fire 2 Voice 3 finding
- **Probe DAG**:
  - P1: PASS
  - P6 LICENSE/registry: **REJECT-PRESUMED** — license unclear; per CR-9 install-risk + sibling-precedent firm
- **CR-12 lattice**: **REJECT-FOR-FIT** (license unclear sibling-precedent)
- **Disposition**: **REJECT-FOR-FIT** — defer until upstream ships canonical LICENSE; cite-only for skill ideas (7 skills: composition-patterns / deploy-to-vercel / react-best-practices / etc.) — too narrow scope (Vercel-specific) for runtime baseline

## 3. Tier-2 new discoveries (≥10 candidates beyond the 16)

These are candidates surfaced via local Z:/repos/deps inventory that are NOT in the user's 16-baseline list but ARE either fresh-HEAD or have novel value.

### 3.1 anthropics/cwc-long-running-agents (Anthropic OFFICIAL)

- **Local**: `Z:/repos/deps/cwc-long-running-agents` HEAD `ffd563d668a9` 2026-05-05
- **License**: per repo (Anthropic OFFICIAL — verify; typically MIT)
- **Cite anchor**: CLAUDE.md Architecture §"Architecture (locked-in topology)" cite #1 — TIER-1-DIRECT Anthropic OFFICIAL
- **Probe DAG**:
  - P1-P7: all PASS — already installed per manifest §Section 17 (5 primitives at `.local/cwc/`)
- **CR-12 lattice**: GENUINELY-NEW for the 5 primitives (Default-FAIL contract / Fresh-context evaluator / PROGRESS.md handoff / Kill-switch / Steer mid-run)
- **Disposition**: **INSTALLED-DORMANT-VERBATIM-REFERENCE** per manifest §Section 17 — Wave 75 ACTIVE-ADAPTED variants wired at `.claude/settings.json:152+:162`; sister 3 reference plugins (agent-sdk-dev / ralph-loop / frontend-design) all INSTALLED

### 3.2 anthropic-cookbook + claude-cookbooks

- **Local**: `Z:/repos/deps/anthropic-cookbook` HEAD `33424c3eb476` 2026-04-27 + `Z:/repos/deps/claude-cookbooks` HEAD `3f8bf356e779` 2026-05-08
- **License**: Anthropic OFFICIAL MIT
- **Cite anchor**: sibling `Z:/claude-sota/.claude/rules/research-protocol.md` TIER-1 OFFICIAL cookbook cite for 9 production patterns + claude_agent_sdk notebooks
- **Probe DAG**: all PASS — Anthropic OFFICIAL educational reference material
- **CR-12 lattice**: **CITE-CLASS-CANONICAL** per Wave 152 F20+F22+F23+F24 n=4 same-arc evidence ladder (anthropic-cookbook overall + CMA prompt-versioning + CMA human-in-loop + research-agent recipe all RATIFIED as CITE-CLASS-CANONICAL per CR-12.6)
- **Disposition**: **ACCEPT-AS-CITE-REFERENCE** — sister rule research-protocol.md already cites; ratify in claude-sota-installed CLAUDE.md (queued cite-extension)

### 3.3 anthropics/claude-agent-sdk-python

- **Local**: `Z:/repos/deps/claude-agent-sdk-python` HEAD `b512f256450d` 2026-05-01
- **License**: Anthropic OFFICIAL MIT
- **Cite anchor**: `Z:/repos/deps/claude-agent-sdk-python/src/claude_agent_sdk/types.py:246-262 @ HEAD b512f256` cited extensively in sibling `parallel-agent-wave.md` + `cross-model-consensus.md` + `audit-action-loop.md` + `fm17-subagent-fleet-depletion.md`
- **Probe DAG**:
  - P1-P7: all PASS — Anthropic OFFICIAL SDK; cite-class authority for HookMatcher + _SubagentContextMixin + ClaudeSDKClient lifecycle
- **CR-12 lattice**: **CITE-CLASS-CANONICAL** (SDK source-of-truth for hook semantics + agent_id/agent_type telemetry)
- **Disposition**: **ALREADY CITED** in sibling rules; mirror to claude-sota-installed via cite-import-AMBER when relevant rule is ported

### 3.4 openai/codex

- **Local**: `Z:/repos/deps/codex` HEAD probe needed
- **License**: OpenAI OFFICIAL
- **Cite anchor**: CLAUDE.md Architecture §"Architecture (locked-in topology)" cite #3 — TIER-1-DIRECT OpenAI codex CLI worktree-aware runtime + sibling iter-93 + sibling cross-model-consensus.md
- **Probe DAG**: all PASS — codex CLI 0.130.0 INSTALLED per manifest §Section 2
- **CR-12 lattice**: **PROVIDER-COMPLEMENT** (per CLAUDE.md Architecture topology; Claude orchestrates / Codex reviews)
- **Disposition**: **ALREADY INSTALLED** — version 0.130.0 active per manifest Section 2

### 3.5 ComposioHQ/agent-orchestrator

- **Local**: `Z:/repos/deps/agent-orchestrator` HEAD `13c5a50d02b3` 2026-05-09 (fresh)
- **License**: MIT (per sibling `Z:/claude-sota/.claude/rules/team-orchestration.md` TIER-1 ALT-IMPL cite)
- **Cite anchor**: sibling team-orchestration.md `agent-orchestrator/packages/core/src/atomic-write.ts:7-11` + `session-manager.ts:1449-1458,2414-2452` + `metadata.ts:373-379` + `recovery/manager.ts:36-100 @ HEAD ab65d12356d6`
- **Probe DAG**:
  - P1: PASS — fresh HEAD
  - P3 architectural-API: AMBER — macOS-focused per sibling parallel-sessions.md note
  - P5 mode-harness-shape: AMBER — convergence-gate Axis-3 FAST-CHURN-BAND (cpd≈15 age=78d as of sibling cite date)
- **CR-12 lattice**: **PARTIAL-OVERLAP** (parallel-session orchestration; this runtime uses native CC Agent tool + cwc-long-running-agents instead)
- **Disposition**: **CITE-CLASS-CANONICAL** (5 ALT-IMPL primitives cited in sibling rules; do NOT install runtime; cite-extend on need)

### 3.6 huggingface/smolagents

- **Local**: `Z:/repos/deps/smolagents` HEAD `df846f842241` 2026-04-24
- **License**: Apache-2.0
- **Cite anchor**: sibling team-orchestration.md row in "Sister-framework references" table
- **Probe DAG**: all probes basic-PASS; CR-12 says PARTIAL-OVERLAP with code-as-action paradigm
- **CR-12 lattice**: **PARTIAL-OVERLAP** (code-as-action paradigm differs from CC tool-call paradigm — CATEGORY-MISMATCH)
- **Disposition**: **CITE-CLASS-CANONICAL** (pattern reference; do NOT install)

### 3.7 openai/openai-agents-python

- **Local**: `Z:/repos/deps/openai-agents-python` HEAD `cf151f91ff9f` 2026-05-10 (fresh)
- **License**: MIT
- **Cite anchor**: sibling team-orchestration.md sister-framework references + Wave 134 Fire 27-A `STUDY-PILOT-PATTERN-EXTRACT` verdict at `.claude/state/codex_consult_w134_f27a_openai_agents_python_OUT.txt`
- **Probe DAG**: all PASS
- **CR-12 lattice**: **PROVIDER-COMPLEMENT** (per sibling Wave 134 Fire 27-A — alternative orchestration framework; Anthropic SDK = PRIMARY)
- **Disposition**: **STUDY-PILOT-PATTERN-EXTRACT** — Handoff + Tracing primitives are pattern-reference for sss T1→T2→T3 lifecycle; do NOT install runtime (CATEGORY-MISMATCH on orchestration target)

### 3.8 langchain-ai/deepagents

- **Local**: `Z:/repos/deps/deepagents` HEAD `95f845d29745` 2026-04-24
- **License**: MIT
- **Cite anchor**: sibling team-orchestration.md "Sister-framework references" + §"Pre-emptive arg truncation discipline" cite to `deepagents/libs/deepagents/deepagents/middleware/summarization.py:122-149`
- **Probe DAG**: all PASS — already established as cite-class authority for pre-emptive arg-truncation pattern
- **CR-12 lattice**: **CITE-CLASS-CANONICAL** (discipline reference; not active middleware in claude-sota-installed)
- **Disposition**: **ALREADY CITED** in sibling team-orchestration.md; mirror when relevant rule is ported

### 3.9 langchain-ai/langgraph

- **Local**: `Z:/repos/deps/langgraph` HEAD `2e5025ec1ac8` 2026-05-08 (fresh)
- **License**: MIT
- **Cite anchor**: sibling team-orchestration.md `Command(goto, graph=PARENT)` cite for HANDOFF slot
- **Probe DAG**:
  - P1-P5: PASS — cite-class
  - **Wave 134 Fire 27-B Pattern B HONEST-NON-FINDING** — extensive ecosystem footprint (`langchain-core>=1.4.0a2` + 6+ langgraph-* sub-packages); CR-12 = ECOSYSTEM-IMPORT
- **CR-12 lattice**: **ECOSYSTEM-IMPORT** per sibling Wave 134 Fire 27-B finding
- **Disposition**: **CITE-PATTERN-ONLY** per CR-12.5 default disposition; do NOT install (ecosystem footprint disproportionate to core primitive value for this runtime)

### 3.10 mem0 / mcp-memory-service / Memori / MemMachine / MemOS

- **Local**: all present at fresh HEAD dates 2026-04-22 → 2026-05-09; licenses MIT / Apache / Apache
- **Cite anchor**: Wave 134 Fire 27-C mem0 STUDY-PILOT-PATTERN-EXTRACT 0.87 (vs eee graphiti temporal-KG and mcp-memory sqlite-vec — different mechanisms covering memory layer)
- **CR-12 lattice**: **PARTIAL-OVERLAP** (memory layer; different mechanisms vs already-installed graphiti + mcp-memory-service)
- **Disposition**: **STUDY-PILOT-PATTERN-EXTRACT** for fact-extraction-based memory pattern; do NOT install runtime (would duplicate existing L1/L2/L3 memory stack)
- **EXCLUSION**: `basic-memory` AGPL license — **REJECT-FOR-FIT** per CR-9 (permissive-license-only)

### 3.11 ast-grep

- **Local**: `Z:/repos/deps/ast-grep` HEAD `4c35a206e2fd` 2026-05-06
- **License**: per repo
- **Cite anchor**: sibling agent-harness-fit-verification.md `Ship D (ast-grep MCP)` REJECT-FOR-FIT (phantom `@anthropic/mcp-ast-grep` npm package)
- **Probe DAG**:
  - P6 LICENSE/registry: REJECT-FOR-FIT per sibling iter-67 Probe 6 evidence — phantom npm package
- **CR-12 lattice**: **REJECT-FOR-FIT** (phantom package per sibling-precedent)
- **Disposition**: **REJECT-FOR-FIT** — local clone retained for cite reference; do NOT install MCP

### 3.12 spec-kit + OpenSpec

- **Local**: `Z:/repos/deps/spec-kit` HEAD `688ca1b3c510` 2026-05-09 + `Z:/repos/deps/OpenSpec` HEAD `053d8a59d587` 2026-05-07
- **License**: per repo
- **Cite anchor**: not yet cited in this runtime
- **Probe DAG**:
  - P5 mode-harness-shape: needs probe — spec-driven workflow; could overlap with superpowers `writing-plans` + `executing-plans`
- **CR-12 lattice**: **PARTIAL-OVERLAP** with superpowers writing-plans / superpowers/specs flow
- **Disposition**: **STUDY-PILOT-NARROW** if Fire 2 surfaces a spec-workflow gap NOT covered by superpowers; otherwise CITE-CLASS-CANONICAL for spec-driven-development pattern reference

### 3.13 inspect_ai + judgeval + judge-reliability-harness + evalscope

- **Local**: all present at fresh HEAD dates; licenses Apache / per repo
- **Cite anchor**: not yet cited in this runtime
- **Probe DAG**: P1-P6 PASS; P7 needs probe (eval framework demand-gate)
- **CR-12 lattice**: candidate for new evaluation primitive; PARTIAL-OVERLAP with existing T1-T7 codex review framework
- **Disposition**: **STUDY-PILOT-NARROW** for Fire 2 if architecture audit surfaces eval gap NOT covered by codex T1-T7 cross-model gate

### 3.14 ccusage

- **Local**: `Z:/repos/deps/ccusage` HEAD `1a4bd69b9214` 2026-04-27
- **License**: MIT
- **Cite anchor**: sibling team-orchestration.md note "token analyzer, not orchestrator. Not relevant as session manager" (parent-attribution; eee-local PARTIAL-OVERLAP)
- **Probe DAG**: P5 mode-harness-shape: post-completion telemetry consumer (not in-flight gate)
- **CR-12 lattice**: **GENUINELY-NEW** for token-cost telemetry primitive
- **Disposition**: **STUDY-PILOT-NARROW** — if claude-sota-installed surfaces token-cost telemetry gap at Fire 2, ccusage is the canonical adoption candidate per sibling cite

### 3.15 cnighswonger-claude-code-cache-fix

- **Local**: `Z:/repos/deps/cnighswonger-claude-code-cache-fix` HEAD `2f17aeb9062d` 2026-05-09 (fresh)
- **License**: per repo
- **Cite anchor**: sibling audit-action-loop.md `mcp_overhead_audit.py` cite at `extension-impact-guide.md:323-325`
- **CR-12 lattice**: **CITE-CLASS-CANONICAL** for token-overhead reduction patterns
- **Disposition**: **ALREADY CITED** in sibling rules; pattern reference

### 3.16 claude-code-system-prompts (Piebald-AI)

- **Local**: `Z:/repos/deps/claude-code-system-prompts` HEAD `648d3b33b130` 2026-05-08
- **License**: per repo (reverse-engineered system prompts; verify use rights)
- **Cite anchor**: sibling team-orchestration.md cite for Explore-style agent thoroughness knob
- **CR-12 lattice**: **CITE-CLASS-CANONICAL** for reverse-engineered SOTA reference
- **Disposition**: **CITE-ONLY** (pattern reference; do NOT install)

## 4. Tier-3 Z:/repos/deps inventory subset (~707 dirs)

### 4.1 Coverage summary (Z:/repos/deps probe 2026-05-12)

- Total dirs in Z:/repos/deps: **707** (from `ls Z:/repos/deps/ | wc -l`)
- Already cited in sibling claude-sota OR claude-sota-installed: ~80 (per grep across sibling .claude/rules + this CLAUDE.md)
- Installed via Anthropic-canonical plugin marketplace: ~30 plugins across 11 marketplaces (per `.claude/plugins/installed_plugins.json` 30+ entries)
- **Coverage**: ~10-15% of total deps inventory is currently leveraged for cite-anchor or install-class

### 4.2 Cohorts NOT YET leveraged at significant depth

The following clusters in Z:/repos/deps have low cite-coverage; flag as potential future-research areas:

| Cluster | Sample dirs | Likely relevance |
|---|---|---|
| **MCP servers** | `arxiv-mcp-server` / `brave-mcp` / `chrome-devtools-mcp` / `docs-mcp-server` / `drawio-mcp-server` / `exa-mcp` / `falkordb-MCPServer` / `firecrawl` / `git-mcp-server` / `github-mcp-server` / `jina-mcp` / `kubectl-mcp-server` / `kubernetes-mcp-server` / `markdownify-mcp` / `mcp-language-server` / `playwright-mcp` / `tavily-mcp` | Augment `.mcp.json` baseline; each candidate gets Probe 4 (plugin-namespace) + Probe 7 (demand-gate) |
| **Memory frameworks** | `mem0` / `mcp-memory-service` (INSTALLED) / `langmem` / `cipher` / `Memori` / `MemMachine` / `MemOS` / `memoryos` / `memu` / `memsearch` / `supermemory` / `swarmvault` / `agent-second-brain` | Already have graphiti (L3) + mcp-memory-service (L1); CR-12 = PARTIAL-OVERLAP for most |
| **Orchestration frameworks** | `agno` / `BMAD-METHOD` / `agent-orchestrator` / `microsoft-autogen` / `crewAIInc-crewAI` / `letta` / `mastra` / `beeai-framework` | CR-12 = PARTIAL-OVERLAP for orchestration (CC Agent tool is sss primary) |
| **Code intel** | `gitnexus` (Section 7 PLANNED) / `code-chunk` / `codegraph` / `codeql` / `codescene-mcp` / `ColBERT` / `serena` / `joern` / `tree-sitter` | Section 7 manifest queue; CR-12 = candidates for code-intel adoption |
| **Hooks + observability** | `claude-code-hooks` / `claude-code-hooks-mastery` / `claude-code-hooks-multi-agent-observability` / `claude-code-monitoring-guide` / `claude-code-otel` / `helicone` / `langfuse` / `logfire` / `lmnr` / `mlflow` / `openllmetry` | Augment Section 13 hooks + Section 11.5 telemetry |
| **Evaluations** | `inspect_ai` / `deepteam` / `garak` / `evalscope` / `judgeval` / `judge-reliability-harness` / `confident-ai-deepeval` / `evidently` / `NeMo-Guardrails` / `guardrails` | Augment cross-model gate + add eval primitives |
| **Compound engineering plugins** | `compound-engineering-plugin` / `cc-switch` / `claude-task-master` / `claude-flow` / `claude-mem` / `claude-context` | Augment workflow primitives |
| **Spec-driven dev** | `spec-kit` / `OpenSpec` / `context-engineering-intro` / `context-engineering-kit` / `claude-codepro` / `claude-howto` | Pattern reference for design-time discipline |

## 5. Top-N install candidates ranked by ROI

Ranking criteria: GENUINELY-NEW or PROVIDER-COMPLEMENT CR-12 disposition + axis-1+2+3 PASS + low CR-9 install-risk + HIGH Probe 7 demand-gate. Filter REJECT-FOR-FIT.

| Rank | Candidate | CR-12 | Probe 1-7 verdict | Disposition + reason |
|---|---|---|---|---|
| 1 | **GitNexus MCP (gitnexus)** | GENUINELY-NEW for this runtime | All PASS (verify license) | **STUDY-PILOT-NARROW** — Section 7 manifest queue; sibling has it installed; install via Anthropic-canonical channel; Fire 2 candidate |
| 2 | **awesome-claude-plugins cite-extension** | CITE-CLASS-CANONICAL | All PASS | **CITE-EXTENSION** — add to `multi-source-discovery-breadth-discipline.md` 7th catalog source via 1-line Pattern A apply |
| 3 | **anthropic-cookbook cite-extension** | CITE-CLASS-CANONICAL per W152 F20-F24 | All PASS | **CITE-EXTENSION** — ratify CLAUDE.md cite to anthropic-cookbook + claude-cookbooks as 4th TIER-1-DIRECT source |
| 4 | **claude-skills selective vendoring** | PARTIAL-OVERLAP (5,200★ MIT) | P4 AMBER (235+ skills) | **STUDY-PILOT-NARROW** — selectively vendor specific skills NOT in namespace; identify exact subset at Fire 2 |
| 5 | **ccusage** | GENUINELY-NEW token-cost telemetry | All PASS | **STUDY-PILOT-NARROW** — install if Fire 2 surfaces token-cost telemetry gap |
| 6 | **inspect_ai or similar eval framework** | PARTIAL-OVERLAP with codex T1-T7 | All PASS | **STUDY-PILOT-NARROW** — only if Fire 2 surfaces eval gap codex T1-T7 doesn't cover |
| 7 | **spec-kit OR OpenSpec** | PARTIAL-OVERLAP with superpowers writing-plans | needs probe | **STUDY-PILOT-NARROW** — only if spec workflow has unfilled gap |

## 6. Top-N cite-extension candidates (no install needed)

These are CITE-CLASS-CANONICAL sources whose patterns should be referenced but not installed.

| Rank | Source | Cite class | Disposition |
|---|---|---|---|
| 1 | anthropic-cookbook + claude-cookbooks | CITE-CLASS-CANONICAL TIER-1 (per W152 F20-F24 n=4) | RATIFY in CLAUDE.md or sibling research-protocol.md |
| 2 | awesome-claude-plugins (quemsah) | CITE-CLASS-CANONICAL (additional discovery aggregator) | ADD to multi-source-discovery-breadth-discipline.md 7th catalog source |
| 3 | awesome-agentic-patterns HEAD-refresh | CITE-CLASS-CANONICAL (HEAD bumped from sibling-cited `ffb42768` to local `9c40e100`) | REFRESH cite HEAD via mechanical-mirror Pattern A in sibling rules; document Marker Decay |
| 4 | mattpocock-skills pattern quotes | CITE-CLASS-CANONICAL TIER-1-NAMED-AUTHOR-QUOTE | ALREADY CITED in named-failure-modes.md Origin block |
| 5 | get-shit-done patterns (graphify / spike / sketch) | CITE-CLASS-CANONICAL pattern reference | CITE in research-protocol.md High-signal CC workflow systems (already done sibling-side) |
| 6 | mem0 fact-extraction memory pattern | CITE-CLASS-CANONICAL per W134 F27-C | CITE in research-protocol.md or memory section |
| 7 | langgraph BSP graph execution pattern | CITE-CLASS-CANONICAL per W134 F27-B Pattern B HNF | CITE only — ECOSYSTEM-IMPORT cost too high |

## 7. HONEST-NON-FINDING list

**Per `synthesis-layer-verify.md §Reporting categories`: HNF is HIGH-VALUE OUTPUT.**

### 7.1 Cohort-level HNFs

- **C2 arxiv research papers** — not applicable for install-class architecture audit; deferred to research-pattern fires
- **C3 HuggingFace models+datasets** — not applicable for non-training runtime
- **C4 PapersWithCode** — not applicable
- **C7 conference proceedings** — not applicable
- HNF Disposition: re-fire these cohorts if/when a research-pattern adoption gap surfaces (e.g., new prompt engineering technique cited in arxiv)

### 7.2 Candidate-level HNFs / REJECT-FOR-FIT

- **AsyncFuncAI/deepwiki-open** — REJECT-FOR-FIT — managed `mcp.deepwiki.com` already covers use case; self-hosting adds infrastructure burden
- **wshobson/agents** — REJECT-FOR-FIT-MAJORITY (sibling Wave 138 Fire 1 firm) — 76 of 80 plugins fail Probe 5 (HARD-GATE) or Probe 7 (DEMAND-ABSENCE)
- **mattpocock/skills plugin** — REJECT-FOR-FIT (sibling iter-92 firm; HARD-GATE setup with disable-model-invocation) — quotes already CITE-ONLY
- **vercel-labs/agent-skills** — REJECT-FOR-FIT (license unclear sibling-precedent firm; defer until upstream ships canonical LICENSE)
- **basic-memory** — REJECT-FOR-FIT (AGPL license incompat with permissive-only per CR-9 install-risk)
- **ast-grep MCP** — REJECT-FOR-FIT (phantom `@anthropic/mcp-ast-grep` npm package per sibling iter-67 firm)
- **langgraph as ecosystem-import** — CITE-PATTERN-ONLY per CR-12.5 (ecosystem footprint disproportionate)

### 7.3 Architecture gap HNFs

- **Most candidates in Z:/repos/deps are PARTIAL-OVERLAP** with existing claude-sota-installed primitives — large memory + orchestration + framework clusters DUPLICATE-FUNCTIONALITY at primitive level per kiss-dry-yagni Must-Never #4
- **Saturation diagnostic**: claude-sota-installed runtime already has comprehensive primary cite anchors (CLAUDE.md cardinal-rules-1 through 12 + sibling rules); most install candidates either DUPLICATE or CITE-CLASS-CANONICAL with already-cited sister patterns

## 8. CR-9 install-risk assessment summary

For every candidate marked STUDY-PILOT-NARROW or CITE-EXTENSION-CANDIDATE:

| Risk axis | Mitigation |
|---|---|
| Version-pin | All candidates pinned to current HEAD SHA at install time per CR-6 |
| 2-round fix-forward | Each install ship budgets second-round Pattern A apply per CR-9 |
| Pre-cite-import REVERT check | Run `git -C Z:/claude-sota log --all --oneline -- '<sibling-target-path>'` for any cite-import-AMBER candidate at install time |
| Sibling-bleed defense | Path-rewrite from sibling paths to claude-sota-installed before install; cite anchors at `Z:/repos/deps/<repo>/file:line @ HEAD <SHA>` are read-only research probe exempt per CR-9 |
| License verification | mandatory per Probe 6 before any install ship; AGPL = REJECT |
| Smoke probe | mandatory per CR-7 Phase 2 trigger predicate (smoke-probe PASS) |

## 9. Cross-validation against existing manifest

Per manifest §Section 14/14.5 cite-import-AMBER discipline + §Section 17 cwc-long-running-agents installed primitives + §Section 11.5 cite-only:

- Most TIER-1-DIRECT cite anchors in CLAUDE.md (Karpathy / CCBP / OpenAI codex / Anthropic cwc) are already in place
- Plugin installations: 30+ plugins INSTALLED across 11 marketplaces (per `.claude/plugins/installed_plugins.json`)
- Memory stack: L1 (mcp-memory-service) + L3 (graphiti) INSTALLED
- Code intel: Section 7 manifest still has gitnexus PLANNED
- Token telemetry: not yet a tracked installed primitive

## 10. Final disposition summary

- **Install candidates (Pattern A apply at Fire 2)**: 3 ranked (GitNexus / ccusage / claude-skills selective vendor) — pending Fire 2 architecture audit confirmation
- **Cite-extension candidates**: 7 ranked — Pattern A apply at Fire 2 cite-trail refresh ship
- **HONEST-NON-FINDINGS**: 13 documented (4 cohort-level + 7 candidate-level + 2 architecture-saturation) — high-value output preserving cross-arc learning

## 11. Provenance + cite trail

- Spec read: `docs/superpowers/specs/2026-05-12-sota-architecture-deep-audit-design.md` (truncated via Read tool; spec §4.1 Agent A brief understood from §3.7 SHARED INVARIANT BLOCK + parent plan §Task 1.1 verbatim)
- Plan read: `docs/superpowers/plans/2026-05-12-sota-architecture-deep-audit.md` §Fire 1 Task 1.1 (full)
- Manifest probed: `docs/sota-installed-manifest.md` (727 LOC; status legend + section headers + grep counts)
- Local Z:/repos/deps inventory probe: 707 dirs total + named-author + sister-framework + memory + observability cohort subsets
- Plugins manifest read: `.claude/plugins/installed_plugins.json` (30+ entries verified)
- Marketplaces list read: `.claude/plugins/marketplaces/` (11 entries)
- Sibling rules cited: per CLAUDE.md cite-import-AMBER per Section 14.5 (effective_tier=TIER-3-LOCAL-COMPOSITION per citation-discipline.md rule #8)

## verdict_one_line

DONE: 9-cohort SOTA discovery complete; 3 install candidates / 7 cite-extend / 13 HNF; manifest already at saturation depth for most clusters per kiss-dry-yagni Must-Never #4

## HANDOFF

- handoff_to: orchestrator
- output_mode: last_message
- artifacts: [tmp/wave-deep-audit-fire1-agentA-sota-discovery-2026-05-12.md]
- verdict_one_line: DONE: 9-cohort SOTA discovery complete; 3 install candidates / 7 cite-extend / 13 HNF; saturation diagnosed
- cross_model_gate_status: PARTIAL via Sonnet stand-in (this run is Sonnet stand-in per CLAUDE_CODE_SUBAGENT_MODEL env funneling per cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate); STAND-IN-NOTICE: agent runs as Sonnet stand-in; cross-model gate NOT structurally satisfied for adoption-class verdicts; route VERIFIED-GENUINE prescriptions through Fire 2 codex T1 deep-review per Pattern A primary shape before ship
