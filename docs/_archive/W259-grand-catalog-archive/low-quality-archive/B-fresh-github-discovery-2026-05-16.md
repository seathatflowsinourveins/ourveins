## §0 Discovery Methodology

Wave 251 Agent B ran all five requested GitHub CLI discovery cohorts on 2026-05-16:

1. `gh search repos --topic claude-code --sort stars --order desc --limit 30 --json fullName,stargazersCount,pushedAt,description,license,url`
2. `gh search repos --topic mcp-server --sort updated --order desc --limit 30 --json fullName,stargazersCount,pushedAt,description,license,url`
3. `gh search repos --topic anthropic --sort stars --order desc --limit 30 --json fullName,stargazersCount,pushedAt,description,license,url`
4. `gh search repos 'claude code agent 2026' --sort updated --order desc --limit 20 --json fullName,stargazersCount,pushedAt,description,license,url`
5. `gh search repos --topic ai-agents --sort updated --order desc --limit 20 --json fullName,stargazersCount,pushedAt,description,license,url`

Filter applied exactly: `pushedAt >= 2026-03-15`, `stars >= 500`, license MIT or Apache-2.0 only, and W237 known repos removed (`graphiti`, `mcp-memory-service`, `modelcontextprotocol/servers`, known Claude best-practice/everything/codex/gitnexus/langfuse/repomix/context7/deepwiki/exa/firecrawl/perplexity surfaces). Top-15 verification used `gh api repos/<owner>/<repo>`, `gh api repos/<owner>/<repo>/contents/marketplace.json`, root `package.json` package-name extraction, and npm registry probes.

Scoring: stars >=5000 +3, 1000-4999 +2, 500-999 +1; pushed within 14 days +2, 15-60 days +1; MIT +1, Apache-2.0 +0.5; `marketplace.json` or published `@scope/mcp-*`/`mcp-*` npm signal +2; `claude-code` or `mcp-server` topic +1.

## §1 Cohort Raw Results

Passing candidates after filtering and W237 removal:

| repo | stars | pushed | license | score |
|---|---:|---|---|---:|
| NousResearch/hermes-agent | 152073 | 2026-05-16 | MIT | 7.0 |
| farion1231/cc-switch | 71863 | 2026-05-14 | MIT | 7.0 |
| gsd-build/get-shit-done | 62471 | 2026-05-16 | MIT | 7.0 |
| JuliusBrussee/caveman | 60746 | 2026-05-12 | MIT | 7.0 |
| shareAI-lab/learn-claude-code | 60675 | 2026-05-11 | MIT | 7.0 |
| ruvnet/ruflo | 51567 | 2026-05-16 | MIT | 7.0 |
| safishamsi/graphify | 48377 | 2026-05-15 | MIT | 7.0 |
| santifer/career-ops | 44906 | 2026-05-15 | MIT | 7.0 |
| HKUDS/nanobot | 42543 | 2026-05-15 | MIT | 7.0 |
| addyosmani/agent-skills | 42103 | 2026-05-14 | MIT | 7.0 |
| asgeirtj/system_prompts_leaks | 40275 | 2026-05-16 | MIT | 7.0 |
| sickn33/antigravity-awesome-skills | 37635 | 2026-05-15 | MIT | 7.0 |
| wshobson/agents | 35459 | 2026-05-14 | MIT | 7.0 |
| Yeachan-Heo/oh-my-claudecode | 33965 | 2026-05-15 | MIT | 7.0 |
| luongnv89/claude-howto | 33038 | 2026-05-15 | MIT | 7.0 |
| router-for-me/CLIProxyAPI | 32831 | 2026-05-15 | MIT | 7.0 |
| nanocoai/nanoclaw | 28893 | 2026-05-15 | MIT | 7.0 |
| davila7/claude-code-templates | 27306 | 2026-05-16 | MIT | 7.0 |
| mvanhorn/last30days-skill | 25906 | 2026-05-15 | MIT | 7.0 |
| thedotmack/claude-mem | 75997 | 2026-05-15 | Apache-2.0 | 6.5 |
| rtk-ai/rtk | 48557 | 2026-05-15 | Apache-2.0 | 6.5 |
| jeecgboot/JeecgBoot | 46276 | 2026-05-15 | Apache-2.0 | 6.5 |
| iOfficeAI/AionUi | 25257 | 2026-05-15 | Apache-2.0 | 6.5 |
| nextlevelbuilder/ui-ux-pro-max-skill | 79039 | 2026-04-03 | MIT | 6.0 |
| langchain-ai/langchain | 136828 | 2026-05-16 | MIT | 6.0 |
| danny-avila/LibreChat | 37056 | 2026-05-15 | MIT | 6.0 |
| jarrodwatts/claude-hud | 22876 | 2026-05-13 | MIT | 6.0 |
| Donchitos/Claude-Code-Game-Studios | 18817 | 2026-05-13 | MIT | 6.0 |
| zarazhangrui/frontend-slides | 17595 | 2026-05-14 | MIT | 6.0 |
| vxcontrol/pentagi | 16905 | 2026-05-14 | MIT | 6.0 |
| kyegomez/OpenMythos | 12984 | 2026-04-27 | MIT | 5.0 |
| Aider-AI/aider | 44865 | 2026-05-16 | Apache-2.0 | 5.5 |
| simstudioai/sim | 28497 | 2026-05-16 | Apache-2.0 | 5.5 |

Discard examples: AGPL/other/no-license results such as CherryHQ/cherry-studio, BerriAI/litellm, winfunc/opcode, archestra-ai/archestra, ComposioHQ/awesome-claude-skills, code-yeongyu/oh-my-openagent, hesreallyhim/awesome-claude-code, dyad-sh/dyad, vercel/ai, Canner/WrenAI; sub-500-star updated MCP/free-text/ai-agents results.

## §2 Top-15 Verified Candidates

### 1. NousResearch/hermes-agent

- Score: 7.0 = stars +3, recency +2, MIT +1, `claude-code` topic +1.
- Verification: `gh api` pushed `2026-05-16T01:25:58Z`, stars `152073`, license `MIT`, default branch `main`.
- Plugin/package probe: no root `marketplace.json`; root package `hermes-agent`; npm registry `NOT-PUBLISHED`.
- CR-12 disposition: PARTIAL-OVERLAP. High-signal agent harness, but likely overlaps with existing Claude/Codex/OpenCode runtime orchestration.

### 2. farion1231/cc-switch

- Score: 7.0 = stars +3, recency +2, MIT +1, `claude-code` topic +1.
- Verification: pushed `2026-05-14T18:41:39Z`, stars `71863`, license `MIT`, default branch `main`.
- Plugin/package probe: no `marketplace.json`; root package `cc-switch`; npm `NOT-PUBLISHED`.
- CR-12 disposition: GENUINELY-NEW. Cross-platform desktop/provider switcher for Claude Code/Codex/OpenCode/Gemini/Hermes; not the same as CLIProxyAPI fleet routing.

### 3. gsd-build/get-shit-done

- Score: 7.0 = stars +3, recency +2, MIT +1, `claude-code` topic +1.
- Verification: pushed `2026-05-16T01:39:47Z`, stars `62471`, license `MIT`, default branch `main`.
- Plugin/package probe: no `marketplace.json`; package `get-shit-done-cc`; npm `NOT-PUBLISHED`.
- CR-12 disposition: GENUINELY-NEW. Lightweight meta-prompting/context/spec workflow surface; overlaps conceptually with Spec-Kit but may provide installable prompt primitives.

### 4. JuliusBrussee/caveman

- Score: 7.0 = stars +3, recency +2, MIT +1, `claude-code` topic +1.
- Verification: pushed `2026-05-12T19:44:48Z`, stars `60746`, license `MIT`, default branch `main`.
- Plugin/package probe: no `marketplace.json`; package `caveman-installer`; npm `NOT-PUBLISHED`.
- CR-12 disposition: PARTIAL-OVERLAP. Token-reduction skill overlaps with RTK/token-efficiency layer; useful only if evidence beats installed RTK behavior.

### 5. shareAI-lab/learn-claude-code

- Score: 7.0 = stars +3, recency +2, MIT +1, `claude-code` topic +1.
- Verification: pushed `2026-05-11T14:25:37Z`, stars `60675`, license `MIT`, default branch `main`.
- Plugin/package probe: no `marketplace.json`; no root package.
- CR-12 disposition: PARTIAL-OVERLAP. Educational nano agent harness; strong reference value, weaker direct install value.

### 6. ruvnet/ruflo

- Score: 7.0 = stars +3, recency +2, MIT +1, `claude-code`/`mcp-server` topics +1.
- Verification: pushed `2026-05-16T01:44:51Z`, stars `51567`, license `MIT`, default branch `main`.
- Plugin/package probe: no `marketplace.json`; package `claude-flow`; npm `NOT-PUBLISHED`.
- CR-12 disposition: PARTIAL-OVERLAP. Multi-agent/swarm orchestration collides with existing subagent/orchestration surfaces, but MCP/RAG claims deserve follow-up.

### 7. safishamsi/graphify

- Score: 7.0 = stars +3, recency +2, MIT +1, `claude-code` topic +1.
- Verification: pushed `2026-05-15T23:07:19Z`, stars `48377`, license `MIT`, default branch `v8`.
- Plugin/package probe: no `marketplace.json`; no root package.
- CR-12 disposition: GENUINELY-NEW. Code/schema/infrastructure graph skill, potentially complementary to GitNexus/Graphiti if it adds local multimodal graph ingestion.

### 8. santifer/career-ops

- Score: 7.0 = stars +3, recency +2, MIT +1, `claude-code` topic +1.
- Verification: pushed `2026-05-15T16:50:33Z`, stars `44906`, license `MIT`, default branch `main`.
- Plugin/package probe: no `marketplace.json`; package `career-ops`; npm `NOT-PUBLISHED`.
- CR-12 disposition: DUPLICATE-FUNCTIONALITY for general runtime. Domain-specific career/job-search workflow; not a core SOTA runtime primitive.

### 9. HKUDS/nanobot

- Score: 7.0 = stars +3, recency +2, MIT +1, `claude-code` topic +1.
- Verification: pushed `2026-05-15T17:55:55Z`, stars `42543`, license `MIT`, default branch `main`.
- Plugin/package probe: no `marketplace.json`; no root package.
- CR-12 disposition: PARTIAL-OVERLAP. Lightweight personal agent overlaps with existing agent harness concepts; inspect only if it has a uniquely small runtime.

### 10. addyosmani/agent-skills

- Score: 7.0 = stars +3, recency +2, MIT +1, `claude-code` topic +1.
- Verification: pushed `2026-05-14T04:52:08Z`, stars `42103`, license `MIT`, default branch `main`.
- Plugin/package probe: no `marketplace.json`; no root package.
- CR-12 disposition: DUPLICATE-FUNCTIONALITY. Runtime already references addy-agent-skills as an installed/plugin surface; treat as update/provenance check, not new adoption.

### 11. asgeirtj/system_prompts_leaks

- Score: 7.0 = stars +3, recency +2, MIT +1, `claude-code` topic +1.
- Verification: pushed `2026-05-16T00:19:24Z`, stars `40275`, license `MIT`, default branch `main`.
- Plugin/package probe: no `marketplace.json`; no root package.
- CR-12 disposition: DUPLICATE-FUNCTIONALITY / DO-NOT-ADOPT. Prompt-leak corpus is not an install primitive and creates provenance/compliance risk.

### 12. sickn33/antigravity-awesome-skills

- Score: 7.0 = stars +3, recency +2, MIT +1, `claude-code` topic +1.
- Verification: pushed `2026-05-15T07:09:09Z`, stars `37635`, license `MIT`, default branch `main`.
- Plugin/package probe: no `marketplace.json`; package `antigravity-awesome-skills`; npm `NOT-PUBLISHED`.
- CR-12 disposition: GENUINELY-NEW. Large installable cross-agent skill library; adopt only curated subsets after license/provenance sampling.

### 13. wshobson/agents

- Score: 7.0 = stars +3, recency +2, MIT +1, `claude-code` topic +1.
- Verification: pushed `2026-05-14T13:04:35Z`, stars `35459`, license `MIT`, default branch `main`.
- Plugin/package probe: no `marketplace.json`; no root package.
- CR-12 disposition: GENUINELY-NEW. Claude Code subagents/commands/skills orchestration pack; strongest direct candidate for agent-surface enrichment.

### 14. Yeachan-Heo/oh-my-claudecode

- Score: 7.0 = stars +3, recency +2, MIT +1, `claude-code` topic +1.
- Verification: pushed `2026-05-15T22:39:04Z`, stars `33965`, license `MIT`, default branch `main`.
- Plugin/package probe: no `marketplace.json`; package `oh-my-claude-sisyphus`; npm `NOT-PUBLISHED`.
- CR-12 disposition: PARTIAL-OVERLAP. Teams-first multi-agent orchestration overlaps with current subagent routing; inspect for parallel execution patterns only.

### 15. luongnv89/claude-howto

- Score: 7.0 = stars +3, recency +2, MIT +1, `claude-code` topic +1.
- Verification: pushed `2026-05-15T06:55:32Z`, stars `33038`, license `MIT`, default branch `main`.
- Plugin/package probe: no `marketplace.json`; no root package.
- CR-12 disposition: PARTIAL-OVERLAP. Guide/template corpus; useful as reference catalog, not an install-first primitive.

## §3 Hidden Gems

Score >=7 and not on the supplied W237 known catalog:

| repo | why it matters | disposition |
|---|---|---|
| gsd-build/get-shit-done | Claude Code meta-prompting + context/spec workflow, small enough to audit quickly | GENUINELY-NEW |
| safishamsi/graphify | Queryable local graph over code, schemas, infra, docs, papers, media | GENUINELY-NEW |
| wshobson/agents | Dense subagent/command/skill pack for Claude Code orchestration | GENUINELY-NEW |
| sickn33/antigravity-awesome-skills | 1,400+ installable cross-agent skills; likely high recall for missing skills | GENUINELY-NEW |
| farion1231/cc-switch | Desktop multi-provider/session switcher distinct from API proxying | GENUINELY-NEW |
| ruvnet/ruflo | Agent orchestration + MCP/RAG claims; high stars and current pushes | PARTIAL-OVERLAP |
| nanocoai/nanoclaw | Containerized OpenClaw-style messaging agent surface from raw cohort table | PARTIAL-OVERLAP |
| davila7/claude-code-templates | Claude Code config/monitoring template CLI; likely actionable snippets | PARTIAL-OVERLAP |
| mvanhorn/last30days-skill | Research synthesis skill across social/web sources; useful for research waves | GENUINELY-NEW |

## §4 Adoption Shortlist

Top 5 ADOPT-NOW recommendations for `Z:/claude-sota-pure`:

1. **wshobson/agents** — Best direct runtime fit. It targets Claude Code subagents, commands, plugins, skills, and workflows; adopt by sampling agent definitions and commands into a quarantined provenance review before install.
2. **gsd-build/get-shit-done** — Promising context-engineering/spec workflow layer. Compare against installed Spec-Kit and keep only primitives that reduce ceremony or improve handoff quality.
3. **safishamsi/graphify** — Strong complement candidate to GitNexus/Graphiti if it can ingest heterogeneous repo assets into a queryable graph. Needs local install probe and overlap check.
4. **sickn33/antigravity-awesome-skills** — High-recall skill catalog. Do not bulk install; use as a curated mining source for missing skills with license/provenance gates.
5. **mvanhorn/last30days-skill** — Practical research-wave accelerator, even though it missed top-15 verification by stars ordering. It directly matches recurring fresh-discovery work and is MIT, fresh, and Claude Code targeted.

Near-misses: `farion1231/cc-switch` is compelling for operator UX but less core to an install-only runtime; `ruvnet/ruflo` has strong signal but heavier orchestration overlap; `JuliusBrussee/caveman` should be benchmarked only if RTK gaps remain; `asgeirtj/system_prompts_leaks` should not be adopted.

## §5 VERDICT: ADOPT 5 CURATED, NOT BULK

VERDICT: Fresh GitHub discovery found multiple high-signal, post-2026-03-15 MIT/Apache candidates; adopt `wshobson/agents`, `get-shit-done`, `graphify`, curated `antigravity-awesome-skills`, and `last30days-skill` via CR-12 provenance gates, while rejecting prompt-leak and domain-specific noise.
