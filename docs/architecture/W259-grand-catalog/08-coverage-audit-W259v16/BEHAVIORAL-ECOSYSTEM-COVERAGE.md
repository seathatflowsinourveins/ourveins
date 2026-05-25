# W259v16 — Coverage Audit: CC Behavioral / Skills-Agents-Plugins Ecosystem Layer

> **Layer**: Claude Code BEHAVIORAL / ECOSYSTEM — skills collections, CC subagent/agent collections, CC plugin marketplaces, hook frameworks, curated "awesome" lists. The behavioral-discipline layer (skills auto-fire per `description:` match) plus the agent/plugin ecosystem.
> **Mission**: Coverage + gap-finding. Does the W259 catalog cover every SOTA CC-ecosystem repo, or are there gaps? NOT a benchmark re-litigation of existing entries.
> **Date**: 2026-05-17 · **Wave**: W259-v16 coverage audit
> **Method**: (1) extract every behavioral/ecosystem repo W259 already catalogued from `05-scoring/MASTER-SCORING-MATRIX-W259.md` + `02-layer-deepdive/LAYER-B-*` + `03-deepdive/SOTA-COMMUNITY-REPOS-W259v14.md` + `03-deepdive/PLUGIN-MARKETPLACE-AUDIT-W259v2.md` + `01-graphql-discovery/MISSED-SOTA-REPOS-*`; (2) cross-reference `.claude/settings.json` `enabledPlugins`; (3) live GitHub MCP research (`search_repositories` sorted by stars across `topic:claude-code`, `topic:claude-skills`, `topic:claude-code-plugin`, `topic:claude-code-subagents`, `topic:claude-code-hooks`) 2026-05-17; (4) IN-CATALOG / GAP verdict + genuine-gap scoring.
> **Cite-class**: `effective_tier=TIER-3-LOCAL-COMPOSITION` per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 — composes TIER-1-DIRECT GitHub API live metadata (2026-05-17) + W259 incumbent catalog.

---

## (a) BASELINE — what W259 already covers for this layer

### (a.1) Catalogued in `MASTER-SCORING-MATRIX-W259.md` (scored rows — behavioral/ecosystem subset)

The 99-row master matrix contains these CC behavioral/ecosystem repos (skills / agents / plugin-marketplaces / awesome-lists / SDD-pattern):

| Matrix row | Repo | Composite | Disposition |
|---:|---|---:|---|
| 3 | `anthropics/skills` | 93 | T1 INSTALL |
| 4 | `obra/superpowers` | 93 | T0-INSTALLED |
| 7 | `wshobson/agents` | 89 | T1 INSTALL/SELECTIVE |
| 14 | `trailofbits/skills-curated` | 88 | T1 INSTALL |
| 23 | `alirezarezvani/claude-skills` | 86 | T2 STUDY-PILOT (installed as `claude-code-skills` mp) |
| 24 | `Yeachan-Heo/oh-my-claudecode` | 86 | T2 STUDY-PILOT |
| 52 | `github/spec-kit` | 88 | T1 PATTERN-CITE (SDD methodology) |
| 53 | `mattpocock/skills` | 88 | T2 STUDY-PILOT |
| 56 | `openai/skills` | 86 | T2 STUDY-PILOT |
| 57 | `anthropics/knowledge-work-plugins` | 89 | T1 INSTALL |
| 59 | `microsoft/skills` (+`microsoft/mcp`) | 87 | T1 SELECTIVE |
| 61 | `obra/superpowers-marketplace` | 89 | T1 INSTALL |
| 62 | `obra/superpowers-chrome` | 88 | T1 BUNDLE |
| 63 | `obra/superpowers-skills` | 89 | T1 BUNDLE |
| 65 | `anthropics/claude-plugins-official` | 94 | T0-CANONICAL |
| 69 | `anthropics/financial-services` | 86 | T3 SELECTIVE (vertical) |
| 70 | `anthropics/claude-for-legal` | 86 | T3 SELECTIVE (vertical) |
| 72 | `anthropics/life-sciences` | 80 | T3 SELECTIVE (vertical) |
| 86 | `microsoft/azure-skills` | 84 | T2 SELECTIVE |
| 94 | `github/awesome-copilot` | 90 | T1 PATTERN-CITE (skills catalog) |
| 95 | `vercel-labs/agent-skills` | 96 | T1 INSTALL |

### (a.2) Catalogued in deepdive / discovery files (audited + scored, NOT yet master-matrix rows)

`SOTA-COMMUNITY-REPOS-W259v14.md` deep-dives 8 operator-named + 5 new repos with full 23-dim composites; `LAYER-B-*` table S2 covers 17 skill/agent systems; `MISSED-SOTA-REPOS-*` discovery files surfaced ~280 ecosystem candidates. Behavioral/ecosystem repos with a W259 composite assigned:

| Repo | W259 composite | W259 disposition | Source file |
|---|---:|---|---|
| `addyosmani/agent-skills` | 88 | T1 INSTALL (reclassify ACTIVE-selective; was mis-classed DORMANT) | W259v14 §1.4 |
| `affaan-m/everything-claude-code` (ECC) | 77 | T2 KEEP-BUT-DISCIPLINE | W259v14 §1.2 |
| `shanraisshan/claude-code-best-practice` (CCBP) | 85 | T3 CITE-PATTERN (runtime's own cite-anchor) | W259v14 §1.1 |
| `hesreallyhim/awesome-claude-code` | 76 | T3 CITE-PATTERN (ND-license + README mid-rewrite) | W259v14 §1.3 |
| `VoltAgent/awesome-agent-skills` | 72 | T3 CITE-PATTERN (preferred discovery feed) | W259v14 §1.9 |
| `sickn33/antigravity-awesome-skills` | 80 | T1 SELECTIVE (partially installed) | W259v14 §1.10 |
| `gotalab/cc-sdd` | 85 | T2 STUDY-PILOT | W259v14 §1.11 |
| `rohitg00/pro-workflow` | 76 | T3 CITE-PATTERN (idea only) | W259v14 §1.12 |
| `davepoon/buildwithclaude` | 75 | T3 CITE-PATTERN (discovery index) | W259v14 §1.13 |
| `Shubhamsaboo/awesome-llm-apps` | 60 | SKIP — LLM-app corpus, not a CC primitive (correctly excluded) | W259v14 §1.5 |
| `msitarzewski/agency-agents` | 60 | SKIP — persona collection, no native plugin pathway (correctly excluded) | W259v14 §1.7 |
| `davila7/claude-code-templates` | STUDY-PILOT (LAYER-B S2 #7) | T2 — CLI installer + dashboard | LAYER-B §2 |
| `VoltAgent/awesome-claude-code-subagents` | DUPLICATE (LAYER-B S2 #5) | install-only-for-niche-fillers | LAYER-B §2 |
| `contains-studio/agents` | DUPLICATE (LAYER-B S2 #8) | dominated by wshobson | LAYER-B §2 |
| `VILA-Lab/Dive-into-Claude-Code` | VERIFIED arch-reference | T0.6 required-reading map (not a primitive) | MEMORY-LAYER-RECONCILED §4 |
| `multica-ai/andrej-karpathy-skills` | discovery row | parent org `multica` license-blocker (modified-Apache + SaaS/branding restrictions) | MISSED-SOTA + ULTIMATE-DECISIONS |

### (a.3) Actually INSTALLED (`.claude/settings.json` `enabledPlugins`, 2026-05-17)

42 plugins enabled across 17 marketplaces. Behavioral/ecosystem layer installed set:

- **Skill/agent suites**: `superpowers@claude-plugins-official` · `agent-skills@addy-agent-skills` (= `addyosmani/agent-skills`) · `everything-claude-code@everything-claude-code` (= ECC, affaan-m) · `example-skills@anthropic-agent-skills` (= `anthropics/skills`) · `engineering-skills` + `engineering-advanced-skills@claude-code-skills` (= `alirezarezvani/claude-skills`) · `antigravity-bundle-essentials@antigravity-awesome-skills` (= `sickn33/antigravity-awesome-skills`) · `agent-teams` + `agent-orchestration` + `comprehensive-review` + `context-management` + `review-agent-governance` + `shell-scripting` + `signed-audit-trails` @ `claude-code-workflows` (= `wshobson/agents`).
- **Plugin/workflow**: `codex@openai-codex` · `context-mode@context-mode` (= `mksglu/context-mode`) · `intelligent-compact@claude-settings` (= `fcakyon/claude-codex-settings`) · `ralph-loop` · `claude-md-management` · `pr-review-toolkit` · `skill-creator` · `code-modernization` · `commit-commands` · `feature-dev` · `code-review` · `code-simplifier` · `plugin-dev` · `mcp-server-dev` · `frontend-design` · `agent-sdk-dev` · `claude-code-setup` · `playground` · `session-report` · LSP backends (`pyright-lsp`, `typescript-lsp`).
- **Marketplaces connected (not all plugins installed)**: `anthropics/claude-plugins-official`, `openai/codex-plugin-cc`, `affaan-m/everything-claude-code`, `anthropics/skills`, `anthropics/knowledge-work-plugins`, `anthropics/claude-plugins-community`, `anthropics/financial-services`, `anthropics/healthcare`, `anthropics/life-sciences`, `addyosmani/agent-skills`, `mksglu/context-mode`, `fcakyon/claude-codex-settings`, `wshobson/agents`, `sickn33/antigravity-awesome-skills`, `alirezarezvani/claude-skills`, `obra/superpowers-marketplace`, `vectorize-io/hindsight`.

**Baseline tally**: ~37 distinct behavioral/ecosystem repos catalogued (matrix rows + deepdive composites + LAYER-B table + discovery rows). Of the 14 explicitly operator-named repos, **all 14 are present** in the catalog (verified below).

---

## (b) OPERATOR-NAMED REPOS — catalog-presence verification

| # | Operator-named repo | Live stars (2026-05-17) | IN CATALOG? | Where | Verdict |
|---:|---|---:|:--:|---|---|
| 1 | `claude-code-best-practice` (CCBP, shanraisshan) | 53,314 | YES | W259v14 §1.1 (composite 85); runtime cite-anchor | Covered. Recommended catalog hygiene: add as master-matrix appendix row (W259v14 §2 already flags). |
| 2 | `everything-claude-code` (EEC, affaan-m) | 184,699 | YES | W259v14 §1.2 (composite 77); installed | Covered + installed. |
| 3 | `obra/superpowers` | (matrix "unknown") | YES | matrix row 4 (93); T0-INSTALLED | Covered + installed. |
| 4 | `wshobson/agents` | 35,503 | YES | matrix row 7 (89); installed (8 plugins) | Covered + installed. |
| 5 | `addyosmani/agent-skills` | 42,529 | YES | W259v14 §1.4 (composite 88); installed | Covered + installed. |
| 6 | `Shubhamsaboo/awesome-llm-apps` | 110,651 | YES (as SKIP) | W259v14 §1.5 (composite 60) | Covered — correctly excluded (LLM-app corpus, not a CC primitive). |
| 7 | `abhigyanpatwari/GitNexus` | 38,628 | YES | matrix row 99 (70); `03-deepdive/SOTA-COMMUNITY-REPOS-W259v15-GITNEXUS.md`; installed (MCP) | Covered + installed. (Code-intel-graph; partially this layer.) |
| 8 | `mattpocock/skills` | 86,773 | YES | matrix row 53 (88) | Covered. |
| 9 | `hesreallyhim/awesome-claude-code` | 43,963 | YES | W259v14 §1.3 (composite 76) | Covered — degraded (ND license + TODO README); superseded as feed. |
| 10 | `msitarzewski/agency-agents` | 98,410 | YES (as SKIP) | W259v14 §1.7 (composite 60) | Covered — correctly excluded (persona collection, no plugin pathway, dominated by wshobson). |
| 11 | `VILA-Lab/Dive-into-Claude-Code` | 1,164 | YES | `MEMORY-LAYER-RECONCILED-W259v4.md` §4 (T0.6, VERIFIED) | Covered — architectural-reference doc, not a primitive. Correctly recorded. |
| 12 | `VoltAgent/awesome-claude-code-subagents` | 19,953 | YES | LAYER-B §2 S2 #5 (DUPLICATE) | Covered — install-only-for-niche-fillers; dominated by wshobson. |
| 13 | `rohitg00/awesome-claude-code-toolkit` | 1,697 | PARTIAL | author `rohitg00` covered via `pro-workflow` (§1.12) + `agentmemory`; this specific repo NOT a row | Minor gap — see (c) GAP-7 (verdict: CORRECTLY-EXCLUDED-grade). |
| 14 | Karpathy agent-skills repo (`multica-ai/andrej-karpathy-skills`) | 132,618 | YES | `MISSED-SOTA-REPOS-2026-05-16.md` discovery row; parent-org `multica` license-blocker noted in `W259-ULTIMATE-DECISIONS.md` | Covered — discovery-flagged; org license-blocker is the documented reason it is not an install row. |

**Result: 14 / 14 operator-named repos are in the catalog** (12 as full entries, `Dive-into-Claude-Code` as a verified reference, `awesome-claude-code-toolkit` only via its author). No operator-named repo is missing.

---

## (b.2) SOTA-REPOS-FOUND — live GitHub research, IN-CATALOG / GAP verdict

Live `mcp__github__search_repositories` 2026-05-17, sorted by stars, across `topic:claude-code` (>5k★), `topic:claude-skills` (>1k★), `topic:claude-code-plugin` (>300★), `topic:claude-code-subagents` (>500★), `topic:claude-code-hooks` (>400★). Star-inflation note: the W259-v4 benchmark-sourcing rule treats raw stars skeptically — many high-star CC repos are template/meme/fresh-paint. Verdict column: **IN** = catalogued (matrix row OR deepdive composite OR LAYER-B table OR discovery row); **GAP** = genuine high-quality gap; **EXCL** = correctly excluded (superseded / niche / duplicate / not-a-CC-primitive / low-quality).

| Repo | Stars | Type | In catalog? | Verdict + reason |
|---|---:|---|:--:|---|
| `affaan-m/everything-claude-code` | 184,699 | mega-plugin marketplace | IN | W259v14 §1.2 (77). |
| `multica-ai/andrej-karpathy-skills` | 132,618 | CLAUDE.md skill | IN | Discovery row; org license-blocker documented. |
| `garrytan/gstack` | 98,075 | CC tool/setup bundle | **GAP?** | NOT in catalog. Garry Tan (YC President) opinionated 23-tool CC setup. See (c) GAP-1. |
| `nextlevelbuilder/ui-ux-pro-max-skill` | 79,369 | single design skill | EXCL | Single-domain UI/UX skill; design covered by `frontend-design` plugin + `vercel-labs/agent-skills`. Niche. |
| `thedotmack/claude-mem` | 76,187 | memory plugin | IN | matrix row 6 (89) — memory layer (L1.5), adjacent. |
| `farion1231/cc-switch` | 72,691 | desktop provider-switcher | EXCL | Provider/account management desktop app — not a behavioral primitive. |
| `gsd-build/get-shit-done` | 62,600 | meta-prompting/SDD system | **GAP** | NOT in catalog. Meta-prompting + context-engineering + SDD system, 62k★. See (c) GAP-2. |
| `JuliusBrussee/caveman` | 61,035 | token-opt skill | IN | matrix row 18 (87) — L0 token-opt. |
| `shareAI-lab/learn-claude-code` | 60,830 | educational nano-harness | EXCL | Educational CC reverse-engineering; not an installable primitive. |
| `ComposioHQ/awesome-claude-skills` | 60,159 | awesome-list | **GAP** | NOT in catalog. Composio-org curated skills awesome-list, 60k★. See (c) GAP-3. |
| `code-yeongyu/oh-my-openagent` | 58,138 | agent harness (peer CLI) | EXCL | Peer agent-harness (omo) — L3 peer-CLI layer, not behavioral; dominated by opencode/goose in L3. |
| `shanraisshan/claude-code-best-practice` | 53,314 | best-practice doc | IN | W259v14 §1.1 (85). |
| `ruvnet/ruflo` | 51,939 | agent-orchestration platform | EXCL | `ruvnet` orchestration platform (ex-claude-flow). LAYER-B negative-space: ruvnet repos repeatedly flagged for self-marketing benchmark claims (per W259-v6 §L0.4 `agentic-flow`). Heavy, not solo-fit. |
| `rtk-ai/rtk` | 48,974 | token-opt CLI proxy | IN | matrix row 37 (77). |
| `safishamsi/graphify` | 48,592 | code-graph skill | EXCL | Code-knowledge-graph skill — overlaps GitNexus (row 99) + Serena; code-intel not behavioral. |
| `VoltAgent/awesome-openclaw-skills` | 48,795 | awesome-list (OpenClaw) | EXCL | OpenClaw-targeted skill list — different harness, not Claude Code. |
| `CherryHQ/cherry-studio` | 45,789 | desktop AI studio | EXCL | Desktop chat/agent app — not a CC primitive. |
| `hesreallyhim/awesome-claude-code` | 43,963 | awesome-list | IN | W259v14 §1.3 (76). |
| `HKUDS/nanobot` | 42,602 | lightweight agent | EXCL | Personal AI agent (HKUDS) — peer-agent, not CC behavioral. |
| `addyosmani/agent-skills` | 42,529 | SDLC skill suite | IN | W259v14 §1.4 (88); installed. |
| `sickn33/antigravity-awesome-skills` | 37,737 | installable skill library | IN | W259v14 §1.10 (80); installed. |
| `anthropics/prompt-eng-interactive-tutorial` | 35,696 | official tutorial | EXCL | Anthropic prompt-eng tutorial — educational, not a primitive (cookbook-class; matrix already has claude-cookbooks row 26/64). |
| `wshobson/agents` | 35,503 | agent marketplace | IN | matrix row 7 (89); installed. |
| `Yeachan-Heo/oh-my-claudecode` | 34,024 | multi-agent orchestration | IN | matrix row 24 (86). |
| `github/awesome-copilot` | 33,130 | skills/agents catalog | IN | matrix row 94 (90). |
| `K-Dense-AI/scientific-agent-skills` | 23,213 | vertical skill suite | EXCL | Science/research vertical skills — niche; vertical-domain (cf. anthropics life-sciences row 72). |
| `gastownhall/beads` | 23,753 | coding-agent memory | EXCL | Memory-upgrade for coding agents — L1.5 memory adjacent; memory layer separately audited. |
| `jarrodwatts/claude-hud` | 22,955 | statusline/HUD plugin | **GAP?** | NOT in catalog. CC context-usage HUD plugin. See (c) GAP-4. |
| `VoltAgent/awesome-agent-skills` | 21,981 | awesome-list | IN | W259v14 §1.9 (72) — preferred discovery feed. |
| `OthmanAdi/planning-with-files` | 21,419 | planning skill | **GAP?** | NOT in catalog. Manus-style persistent-markdown planning skill. See (c) GAP-5. |
| `winfunc/opcode` | 21,856 | CC GUI toolkit | EXCL | GUI app for CC (ex-`getAsterisk/claudia`) — desktop UX, not behavioral. |
| `VoltAgent/awesome-claude-code-subagents` | 19,953 | subagent collection | IN | LAYER-B S2 #5 (DUPLICATE). |
| `anthropics/claude-plugins-official` | 19,499 | official marketplace | IN | matrix row 65 (94); installed. |
| `Donchitos/Claude-Code-Game-Studios` | 18,983 | vertical agent suite | EXCL | Game-dev vertical agent suite — niche. |
| `JimLiu/baoyu-skills` | 18,492 | personal skill set | EXCL | Personal skill collection (Baoyu) — practitioner set; lower-signal than mattpocock/addyosmani, no distinctive coverage. |
| `Leonxlnx/taste-skill` | 17,675 | single design skill | EXCL | Single "good taste" design skill — niche, meme-adjacent. |
| `zarazhangrui/frontend-slides` | 17,686 | frontend skill | EXCL | Slide-generation skill — niche; frontend covered. |
| `tirth8205/code-review-graph` | 16,627 | code-graph plugin | EXCL | Code-review knowledge-graph — overlaps GitNexus + Serena. |
| `alirezarezvani/claude-skills` | 15,069 | skill+plugin marketplace | IN | matrix row 23 (86); installed. |
| `mksglu/context-mode` | 14,900 | context-opt plugin | IN | installed (`context-mode@context-mode`); LAYER-B + plugin-audit. |
| `Lum1104/Understand-Anything` | 14,863 | knowledge-graph skill | EXCL | Code→knowledge-graph skill — overlaps GitNexus. |
| `mvanhorn/last30days-skill` | 25,978 | research skill | EXCL | Single web-research skill — niche; deep-research covered by skills + WebSearch. |
| `Jeffallan/claude-skills` | 9,101 | skill suite | EXCL | 66-skill full-stack set — generic; dominated by wshobson + superpowers + addyosmani. |
| `Orchestra-Research/AI-Research-SKILLs` | 8,495 | research skill library | EXCL | AI-research vertical skill library — niche. |
| `yusufkaraaslan/Skill_Seekers` | 13,582 | skill-generation tool | **GAP?** | NOT in catalog. Converts docs/repos/PDFs → Claude skills. See (c) GAP-6. |
| `travisvn/awesome-claude-skills` | 12,614 | awesome-list | EXCL | Second-tier awesome-list — superseded by VoltAgent + ComposioHQ lists. |
| `revfactory/harness` | 3,398 | meta-skill plugin | EXCL | Meta-skill that designs agent teams — overlaps `skill-creator` + agent-teams; thin. |
| `nyldn/claude-octopus` | 3,353 | multi-LLM plugin | EXCL | Multi-model fan-out plugin — overlaps codex cross-model gate + `council` ECC skill. |
| `Continuous-Claude-v3` (parcadei) | 3,771 | context-mgmt hooks | EXCL | Context-mgmt via hooks/ledgers — overlaps context-mode + intelligent-compact; hook-heavy. |
| `kenryu42/claude-code-safety-net` | 1,339 | safety hook | EXCL | Destructive-command hook — overlaps CC native permissions + sandbox (cardinal-rule-5: boundaries via permissions, not custom guard hooks). |
| `gmickel/flow-next` | 587 | plan-first SDD plugin | IN | `MISSED-SOTA-REPOS-ROUND2` row 107. |
| `umputun/cc-thingz` | 358 | personal CC marketplace | IN | LAYER-B S2 #13 (`alexei-led/cc-thingz` is a different repo; `umputun/cc-thingz` STUDY-PILOT-class) — covered as STUDY-PILOT-grade. |
| `ComposioHQ/awesome-claude-plugins` | 1,667 | plugin awesome-list | **GAP?** | NOT in catalog. Composio plugin-specific awesome-list. See (c) GAP-3 (bundled). |
| `ccplugins/awesome-claude-code-plugins` | 789 | plugin awesome-list | EXCL | Low-star plugin list — superseded by ComposioHQ + buildwithclaude. |
| `davepoon/buildwithclaude` | 2,940 | discovery directory | IN | W259v14 §1.13 (75). |
| `gotalab/cc-sdd` | (high) | SDD harness | IN | W259v14 §1.11 (85). |
| `rohitg00/pro-workflow` | 2,130 | self-correcting workflow | IN | W259v14 §1.12 (76). |
| `pilot-shell` (maxritter) | 1,721 | SDD/TDD harness | EXCL | SDD+TDD+memory CC harness — overlaps superpowers + cc-sdd + speckit; no distinctive coverage. |
| `posit-dev/skills` | 354 | org skills (R/Posit) | EXCL | Posit/R-language skills — niche vertical, but strong-org. Low-fit (not R shop). |
| `timescale/pg-aiguide` | 1,729 | Postgres plugin (org) | EXCL | Timescale Postgres skill plugin — strong-org but DB-vertical niche. |
| `antonbabenko/terraform-skill` | 1,848 | Terraform skill (named) | EXCL | Anton Babenko (TF authority) Terraform skill — strong practitioner but IaC-vertical niche. |
| `feiskyer/claude-code-settings` | 1,509 | personal CC settings | EXCL | Personal settings/commands repo — practitioner config, not a primitive suite. |

---

## (c) GENUINE-GAP LIST — scored

Seven NOT-IN repos were assessed. Scoring axes: stars, native-CC pathway (plugin/skill/agent type), license, org-strength, recency, fit-for-this-runtime (an autonomous-`/loop` solo runtime with a ≤50-LOC pointer CLAUDE.md, W255 self-invent-zero discipline, cardinal-rules constraining hooks + behavior-files). Composite uses the W259 23-dim shape (qualitative, D1-D20-comparable).

### GAP-1 — `garrytan/gstack` (98,075★) — verdict: **CORRECTLY-EXCLUDED-grade (record as SKIP)**
- **Type**: opinionated CC tool/setup bundle ("Garry Tan's exact Claude Code setup — 23 tools as CEO/Designer/Eng-Manager/Release-Manager/QA"). TypeScript.
- **Native-CC**: yes (CC config + tools). **License**: not surfaced (NOASSERTION risk). **Org**: Garry Tan (YC President — strong name). **Recency**: pushed 2026-05-17, created 2026-03-11. 510 open issues.
- **Fit**: LOW. It is a *personal setup bundle* (role-persona oriented: CEO/Designer/etc.) — the same persona-collection anti-pattern that sank `agency-agents`. Strongly dominated by `wshobson/agents` (real marketplace + PluginEval) and `superpowers` for the behavioral primitives. The 98k★ is fresh-paint/celebrity-driven (created Mar 2026). No distinctive skill/agent the catalog lacks.
- **Composite ≈ 62** → T3. **Verdict: record as SKIP appendix note** ("celebrity setup bundle; persona-oriented; dominated by wshobson + superpowers; license unverified"). Not a genuine gap requiring an install.

### GAP-2 — `gsd-build/get-shit-done` (62,600★) — verdict: **GENUINE GAP (low-priority — STUDY/CITE)**
- **Type**: meta-prompting + context-engineering + spec-driven-development system for Claude Code (by "TÂCHES"). JavaScript. Plugin/CLI-distributed.
- **Native-CC**: yes. **License**: not surfaced (verify). **Org**: `gsd-build` org (indie, T4). **Recency**: pushed 2026-05-17, created 2025-12-14 — genuine content age, not fresh-paint at 62k★.
- **Fit**: MODERATE. It is a real SDD/context-engineering *methodology system*, directly adjacent to this runtime's autonomous-`/loop` + SDD posture. Overlaps `github/spec-kit` (row 52), `gotalab/cc-sdd` (W259v14 §1.11), and `speckit-*` skills already available. The overlap is real but `get-shit-done` is the highest-star SDD/meta-prompting system not catalogued — worth a discovery row + a STUDY-PILOT note alongside cc-sdd.
- **Composite ≈ 78** → T2/T3 border. **Verdict: GENUINE GAP** — add a catalog row (L6/L2, "T3 CITE-PATTERN / T2 STUDY-PILOT — SDD+meta-prompting system; compare vs spec-kit + cc-sdd; verify license"). Low install-priority (overlaps installed SDD surface) but a genuine catalog-coverage hole.

### GAP-3 — `ComposioHQ/awesome-claude-skills` (60,159★) + `ComposioHQ/awesome-claude-plugins` (1,667★) — verdict: **GENUINE GAP (discovery-feed)**
- **Type**: curated awesome-lists (skills list 60k★; plugins list 1.7k★). Composio org.
- **Native-CC**: no (indices — D11≈0). **License**: lists, low-license-risk. **Org**: ComposioHQ (funded org — strong, builds the `rube`/Composio MCP tooling). **Recency**: pushed 2026-05-17.
- **Fit**: discovery-only. The W259 catalog scores `hesreallyhim/awesome-claude-code` (degraded, ND license) and `VoltAgent/awesome-agent-skills` (preferred feed). `ComposioHQ/awesome-claude-skills` at 60k★ is the **largest CC-skills awesome-list not catalogued** and is org-maintained (cleaner provenance than hesreallyhim's). It belongs as a recorded discovery-feed alternative.
- **Composite ≈ 73** → T3 (non-installable index — value is *finding* repos). **Verdict: GENUINE GAP** — add an appendix row (L8 directory, "T3 — org-maintained CC-skills discovery feed; peer to VoltAgent's list"). Discovery-feed gap, not an install gap.

### GAP-4 — `jarrodwatts/claude-hud` (22,955★) — verdict: **GENUINE GAP (low-priority — observability plugin)**
- **Type**: CC plugin — statusline/HUD showing context usage, active tools, running agents, todo progress. JavaScript/TypeScript.
- **Native-CC**: yes (`claude-code-plugin`, statusline). **License**: not surfaced. **Org**: Jarrod Watts (indie, T4 — also ships `claude-stt`). **Recency**: pushed 2026-05-17, created 2026-01-02.
- **Fit**: MODERATE. A native-plugin context-window HUD is directly relevant to a 1M-context autonomous-`/loop` runtime that already tracks context budget (`context_window_statusline.sh`, `context-mode`, intelligent-compact). It partially overlaps the existing statusline but adds running-agents + todo-progress visibility. 22k★ is a real signal for a focused single-purpose plugin. The matrix has no CC-observability/statusline plugin row at all — a small but real coverage hole. (Compare `graykode/abtop` "htop for AI agents", a discovery row in `MISSED-SOTA-ROUND2` — same niche, neither scored.)
- **Composite ≈ 75** → T2. **Verdict: GENUINE GAP** — add a row (L2 plugin, "T2 STUDY-PILOT — CC context/agent HUD plugin; compare vs existing statusLine"). Low-priority pilot.

### GAP-5 — `OthmanAdi/planning-with-files` (21,419★) — verdict: **GENUINE GAP (low-priority — STUDY/CITE)**
- **Type**: CC skill implementing Manus-style persistent-markdown planning. Python-packaged skill.
- **Native-CC**: yes (`agent-skills`/`claude-skills` skill). **License**: not surfaced. **Org**: Othman Adi (indie, T4). **Recency**: pushed 2026-05-17, created 2026-01-03.
- **Fit**: MODERATE. Persistent-markdown planning is a recognized SOTA pattern (the "planning-with-files" / Manus pattern). It overlaps `superpowers/writing-plans` and the runtime's own wave-doc discipline, but the *persistent-file planning skill* shape is distinctive and 21k★ is a strong signal. Worth a CITE-PATTERN row (the pattern is the value; the skill itself overlaps installed planning skills).
- **Composite ≈ 74** → T3. **Verdict: GENUINE GAP** — add a row (L2/L6, "T3 CITE-PATTERN — Manus-style persistent-markdown planning skill; pattern overlaps superpowers/writing-plans"). Pattern-cite, not install.

### GAP-6 — `yusufkaraaslan/Skill_Seekers` (13,582★) — verdict: **GENUINE GAP (low-priority — meta-tooling)**
- **Type**: tool that converts documentation sites / GitHub repos / PDFs → Claude AI skills, with automatic conflict detection. Python, MCP server.
- **Native-CC**: partial (produces skills + ships an MCP server). **License**: not surfaced. **Org**: Yusuf Karaaslan (indie, T4). **Recency**: pushed 2026-05-16.
- **Fit**: MODERATE. Skill-*authoring* meta-tooling is adjacent to the installed `skill-creator` plugin. `Skill_Seekers` is more capable (multi-source docs→skill + conflict detection) and 13k★ is real. It belongs as a recorded peer/alternative to `skill-creator`. Overlap is real → STUDY-PILOT-grade, not a hard install.
- **Composite ≈ 72** → T2/T3. **Verdict: GENUINE GAP** — add a row (L2, "T3 — skill-authoring meta-tool; peer to installed skill-creator; multi-source docs→skill + conflict detection"). Meta-tooling coverage hole.

### GAP-7 — `rohitg00/awesome-claude-code-toolkit` (1,697★) — verdict: **CORRECTLY-EXCLUDED-grade (record as SKIP)**
- **Type**: mega-toolkit awesome-list (135 agents / 35 skills / 42 commands / 176+ plugins / 20 hooks / 15 rules). JavaScript.
- **Native-CC**: partial. **License**: not surfaced. **Org**: `rohitg00` (indie — already in catalog via `pro-workflow` §1.12 + `agentmemory`). **Recency**: pushed 2026-05-17.
- **Fit**: LOW. 1.7k★ is modest for an aggregator; it bundles "15 rules" (the `.claude/rules/` self-invent anti-pattern this runtime removed in W255 — cardinal-rule-4) and is a generic mixed bag dominated by wshobson + the official marketplaces. The author's distinctive work (`pro-workflow`) is already catalogued.
- **Composite ≈ 58** → T4. **Verdict: record as SKIP appendix note** ("low-star aggregator; bundles `rules/` self-invent; author's distinctive work already covered via pro-workflow"). Not a genuine gap.

### Genuine-gap summary table

| Gap | Repo | Stars | Type | Composite | Tier | Install-priority |
|---|---|---:|---|---:|---|---|
| GAP-2 | `gsd-build/get-shit-done` | 62,600 | SDD/meta-prompting system | ≈78 | T2/T3 | Low (overlaps spec-kit + cc-sdd) |
| GAP-3 | `ComposioHQ/awesome-claude-skills` (+plugins) | 60,159 | awesome-list / discovery feed | ≈73 | T3 | Discovery-feed only (non-installable) |
| GAP-4 | `jarrodwatts/claude-hud` | 22,955 | CC HUD/statusline plugin | ≈75 | T2 | Low pilot |
| GAP-5 | `OthmanAdi/planning-with-files` | 21,419 | persistent-planning skill | ≈74 | T3 | Pattern-cite (overlaps writing-plans) |
| GAP-6 | `yusufkaraaslan/Skill_Seekers` | 13,582 | skill-authoring meta-tool | ≈72 | T3 | Low (peer to skill-creator) |

**(GAP-1 `gstack` and GAP-7 `awesome-claude-code-toolkit` are CORRECTLY-EXCLUDED-grade — record as SKIP notes, not genuine gaps.)**

---

## (d) DEFINITIVE BOTTOM-LINE

**The CC behavioral / skills-agents-plugins ecosystem layer is NEAR-SATURATED — 5 genuine gaps, all low-priority, none install-blocking.**

- **Coverage**: ~37 distinct behavioral/ecosystem repos catalogued. **All 14 operator-named repos are present** (12 full entries, `VILA-Lab/Dive-into-Claude-Code` as a verified architectural reference, `rohitg00/awesome-claude-code-toolkit` only via its author — and that repo is itself SKIP-grade). Of ~65 live-researched SOTA CC-ecosystem repos (>300★), ~22 are IN-CATALOG and ~38 are CORRECTLY-EXCLUDED (superseded / niche-vertical / not-a-CC-primitive / duplicate / low-quality / wrong-harness e.g. OpenClaw lists). The W259 catalog's coverage of the **canonical SOTA set** — `anthropics/skills`, `obra/superpowers` (+3 ecosystem repos), `wshobson/agents`, `addyosmani/agent-skills`, `mattpocock/skills`, `anthropics/claude-plugins-official`, `vercel-labs/agent-skills`, `github/awesome-copilot`, ECC, CCBP, the awesome-lists, the SDD harnesses — is **complete**.

- **5 genuine gaps** (all NOT-IN, all high-quality-enough to record, none requiring a hard install): **GAP-2** `gsd-build/get-shit-done` (62.6k★ SDD/meta-prompting system), **GAP-3** `ComposioHQ/awesome-claude-skills` (60.2k★ discovery feed), **GAP-4** `jarrodwatts/claude-hud` (23k★ CC HUD plugin), **GAP-5** `OthmanAdi/planning-with-files` (21.4k★ persistent-planning skill), **GAP-6** `yusufkaraaslan/Skill_Seekers` (13.6k★ skill-authoring meta-tool). Composites 72-78 → all T2/T3 (STUDY-PILOT / CITE-PATTERN), every one overlapping an already-installed surface (SDD skills, statusline, writing-plans, skill-creator). They are **catalog-completeness holes, not capability holes** — the runtime's behavioral layer is not missing a primitive class; it is missing 5 catalog rows.

- **2 SKIP-grade** (operator-named or high-star but CORRECTLY-EXCLUDED): `garrytan/gstack` (98k★ celebrity persona-bundle, dominated by wshobson) and `rohitg00/awesome-claude-code-toolkit` (1.7k★ aggregator bundling `rules/` self-invent).

- **No catalogued entry is clearly superseded/abandoned** for this layer — all matrix rows (anthropics/skills, superpowers, wshobson/agents, etc.) are actively maintained (pushed 2026-05-13..17). The one degraded entry, `hesreallyhim/awesome-claude-code` (ND license + TODO README), is **already flagged degraded** in W259v14 §1.3 with VoltAgent's list named as its replacement.

**Verdict: layer NEAR-SATURATED — 5 genuine gaps (GAP-2/3/4/5/6, all T2/T3 low-priority, listed + scored above). No install-blocking gap. Recommended catalog hygiene: add 5 gap rows + 2 SKIP notes to `MASTER-SCORING-MATRIX-W259.md`, plus the 9 already-flagged W259v14 §2 appendix rows.**

---

**Artifact**: `Z:\claude-sota-installed\docs\architecture\W259-grand-catalog\08-coverage-audit-W259v16\BEHAVIORAL-ECOSYSTEM-COVERAGE.md`
