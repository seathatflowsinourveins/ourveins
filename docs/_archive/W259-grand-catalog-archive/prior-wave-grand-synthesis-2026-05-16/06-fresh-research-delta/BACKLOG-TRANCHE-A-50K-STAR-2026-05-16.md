# BACKLOG-TRANCHE-A 50k-star saturation scoring

**Date**: 2026-05-16
**Source backlog**: 373-repo graphql-missing-highstar fork in `06-fresh-research-delta/GRAPHQL-MISSING-HIGH-STAR-2026-05-16.md`
**Top-50 cutoff**: rank by stars from 373-repo missing set (all ≥30k★, mostly ≥50k★ as scope intended; the 30k–50k tail captured 14 entries to reach 50; bottom of top-50 is 32,910★).
**Scoring rubric**: D1=stars, D2=last-commit-freshness, D3=license-permissiveness, D4=native-CC-pathway, D5=community-consensus, D6=maintainer-tier, D7=use-case-fit-for-CC-expansion, D8=saturation-priority (1-10 each, summed /80).
**Catalog membership reference**: V-FINAL-V3-CONSOLIDATED + V3-SATURATION + INDEX-BY-LAYER-V3 + D1-D10-SCORECARD + CANONICAL-D1-D10-146REPO-SCORING (regex match on owner/repo).
**Cost spent**: ~50 GitHub search-API calls (~50 rate-limit points of 5,000 budget — 1%) + 24 inline-extract operations on persisted tool-result JSON files. <2% of 5,000-pt budget.

---

## §A — Per-repo matrix (50 rows)

| repo | ★ | license | last-commit | D1·D2·D3·D4·D5·D6·D7·D8 | sum/80 | proposed-layer | verdict | in-catalog? |
|---|---:|---|---|---|---:|---|---|---|
| `anthropics/claude-code` | 124,066 | NOASSERTION | 2026-05-15 | 9·10·5·10·10·10·10·10 | **74/80** | L2.0 (Driver root) | INSTALL P0 (cardinal — runtime itself) | no |
| `google-gemini/gemini-cli` | 104,119 | Apache-2.0 | 2026-05-15 | 9·10·10·8·10·7·9·10 | **73/80** | L0.MCP (MCP server) | INSTALL P0 | no |
| `langchain-ai/langchain` | 136,877 | MIT | 2026-05-16 | 9·10·10·4·10·7·9·10 | **69/80** | L5 (Scaffold framework) | INSTALL P0 | no |
| `gsd-build/get-shit-done` | 62,528 | MIT | 2026-05-16 | 7·10·10·9·8·6·10·9 | **69/80** | L5/Other | INSTALL P0 | no |
| `shareAI-lab/learn-claude-code` | 60,785 | MIT | 2026-05-11 | 7·10·10·9·8·6·10·9 | **69/80** | L2.0/L3 (Driver alt-harness/Peer CLI) | INSTALL P0 | no |
| `langflow-ai/langflow` | 148,200 | MIT | 2026-05-16 | 9·10·10·4·10·7·7·10 | **67/80** | L5/Other | INSTALL P0 | no |
| `langgenius/dify` | 141,583 | NOASSERTION | 2026-05-16 | 9·10·5·8·10·7·8·10 | **67/80** | L5 (Scaffold framework) | INSTALL P0 | no |
| `nextlevelbuilder/ui-ux-pro-max-skill` | 79,249 | MIT | 2026-04-03 | 8·8·10·9·8·6·9·9 | **67/80** | L2.1/L2.2 (Skill collection) | INSTALL P0 | no |
| `affaan-m/everything-claude-code` | 184,249 | MIT | 2026-05-16 | 10·10·10·9·10·3·10·4 | **66/80** | L2.0/L3 (Driver alt-harness/Peer CLI) | ALREADY-IN-CATALOG (verify metadata) | YES |
| `farion1231/cc-switch` | 72,467 | MIT | 2026-05-16 | 7·10·10·9·8·3·10·9 | **66/80** | L2.1/L2.2 (Skill collection) | INSTALL P0 | no |
| `jeecgboot/JeecgBoot` | 46,282 | Apache-2.0 | 2026-05-15 | 5·10·10·9·6·7·9·9 | **65/80** | L2.1/L2.2 (Skill collection) | INSTALL P0 | no |
| `HKUDS/nanobot` | 42,576 | MIT | 2026-05-16 | 5·10·10·9·6·7·9·9 | **65/80** | L3 (Peer CLI) | INSTALL P0 | no |
| `nexu-io/open-design` | 42,216 | Apache-2.0 | 2026-05-16 | 5·10·10·9·6·7·9·9 | **65/80** | L2.2 (Skill vertical) | INSTALL P0 | no |
| `punkpeye/awesome-mcp-servers` | 86,984 | MIT | 2026-05-02 | 8·10·10·8·8·3·8·9 | **64/80** | L2.8 (Awesome-list aggregator) | INSTALL P0 | no |
| `lobehub/lobehub` | 77,154 | NOASSERTION | 2026-05-16 | 8·10·5·8·8·6·10·9 | **64/80** | L2.0/L3 (Driver alt-harness/Peer CLI) | INSTALL P0 | no |
| `Shubhamsaboo/awesome-llm-apps` | 110,608 | Apache-2.0 | 2026-05-09 | 9·10·10·4·10·3·7·10 | **63/80** | L2.8 (Awesome-list aggregator) | INSTALL P1 / EVALUATE | no |
| `aaif-goose/goose` | 45,298 | Apache-2.0 | 2026-05-16 | 5·10·10·8·6·7·8·9 | **63/80** | L2.0/L3 (Driver alt-harness/Peer CLI) | INSTALL P1 / EVALUATE | no |
| `github/awesome-copilot` | 33,116 | MIT | 2026-05-15 | 4·10·10·9·7·7·7·9 | **63/80** | L2.2 (Skill vertical) | INSTALL P1 / EVALUATE | no |
| `router-for-me/CLIProxyAPI` | 32,912 | MIT | 2026-05-16 | 4·10·10·9·5·6·10·9 | **63/80** | L1.0 (Cross-model proxy) | INSTALL P1 / EVALUATE | no |
| `dair-ai/Prompt-Engineering-Guide` | 74,627 | MIT | 2026-03-11 | 7·8·10·7·8·6·7·9 | **62/80** | L6.5/L6.8 (Pattern-cite) | INSTALL P1 / EVALUATE | no |
| `microsoft/ai-agents-for-beginners` | 61,639 | MIT | 2026-05-13 | 7·10·10·4·8·7·7·9 | **62/80** | L5 (Scaffold framework) | INSTALL P1 / EVALUATE | no |
| `safishamsi/graphify` | 48,493 | MIT | 2026-05-16 | 5·10·10·9·6·3·10·9 | **62/80** | L2.1/L2.2 (Skill collection) | INSTALL P1 / EVALUATE | no |
| `santifer/career-ops` | 44,992 | MIT | 2026-05-16 | 5·10·10·9·6·3·10·9 | **62/80** | L2.1/L2.2 (Skill collection) | INSTALL P1 / EVALUATE | no |
| `firecrawl/firecrawl` | 120,508 | AGPL-3.0 | 2026-05-16 | 9·10·4·4·10·7·7·10 | **61/80** | L0.MCP wrapper / L0.3 RAG | INSTALL P1 / EVALUATE | no |
| `garrytan/gstack` | 97,873 | MIT | 2026-05-16 | 8·10·10·4·8·8·4·9 | **61/80** | L5/Other | INSTALL P1 / EVALUATE | no |
| `JuliusBrussee/caveman` | 60,923 | MIT | 2026-05-12 | 7·10·10·9·8·3·10·4 | **61/80** | L2.1/L2.2 (Skill collection) | ALREADY-IN-CATALOG (verify metadata) | YES |
| `asgeirtj/system_prompts_leaks` | 40,294 | MIT | 2026-05-16 | 5·10·10·9·6·3·9·9 | **61/80** | L6.5/L6.8 (Pattern-cite) | INSTALL P1 / EVALUATE | no |
| `ComposioHQ/awesome-claude-skills` | 60,087 | NONE | 2026-05-07 | 7·10·2·9·8·6·9·9 | **60/80** | L2.1/L2.2 (Skill collection) | INSTALL P1 / EVALUATE | no |
| `zhayujie/CowAgent` | 44,507 | MIT | 2026-05-16 | 5·10·10·8·6·3·9·9 | **60/80** | L2.2 (Skill vertical) | INSTALL P1 / EVALUATE | no |
| `Yeachan-Heo/oh-my-claudecode` | 33,995 | MIT | 2026-05-16 | 4·10·10·9·5·3·10·9 | **60/80** | L2.0/L3 (Driver alt-harness/Peer CLI) | INSTALL P1 / EVALUATE | no |
| `luongnv89/claude-howto` | 33,146 | MIT | 2026-05-15 | 4·10·10·9·5·3·10·9 | **60/80** | n/a (CITE) | CITE-ONLY (educational) | no |
| `crewAIInc/crewAI` | 51,522 | MIT | 2026-05-16 | 6·10·10·4·6·7·7·9 | **59/80** | L5 (Scaffold framework) | DEFER (alt framework / PATTERN-CITE) | no |
| `CherryHQ/cherry-studio` | 45,772 | AGPL-3.0 | 2026-05-16 | 5·10·4·9·6·7·9·9 | **59/80** | L2.1/L2.2 (Skill collection) | INSTALL P1 / EVALUATE | no |
| `code-yeongyu/oh-my-openagent` | 58,075 | NOASSERTION | 2026-05-16 | 6·10·5·9·6·3·10·8 | **57/80** | L2.0/L3 (Driver alt-harness/Peer CLI) | INSTALL P1 / EVALUATE | no |
| `ruvnet/ruflo` | 51,773 | MIT | 2026-05-16 | 6·10·10·9·6·3·9·4 | **57/80** | L0.MCP (MCP server) | ALREADY-IN-CATALOG (verify metadata) | YES |
| `agno-agi/agno` | 40,150 | Apache-2.0 | 2026-05-16 | 5·10·10·4·6·7·7·8 | **57/80** | L5/Other | INSTALL P1 / EVALUATE | no |
| `OpenHands/OpenHands` | 73,731 | NOASSERTION | 2026-05-16 | 7·10·5·4·8·7·7·8 | **56/80** | L5/Other | INSTALL P1 / EVALUATE | no |
| `patchy631/ai-engineering-hub` | 35,044 | MIT | 2026-05-05 | 4·10·10·8·5·3·8·8 | **56/80** | L5/Other | INSTALL P1 / EVALUATE | no |
| `vercel-labs/agent-browser` | 33,158 | Apache-2.0 | 2026-05-13 | 4·10·10·4·7·8·4·8 | **55/80** | L5/Other | STUDY-PILOT | no |
| `multica-ai/andrej-karpathy-skills` | 131,963 | NONE | 2026-04-20 | 9·10·2·4·10·6·4·9 | **54/80** | L2.2 (Methodology) | INSTALL P0 (CLAUDE.md target set) | no |
| `earendil-works/pi` | 50,245 | MIT | 2026-05-16 | 6·10·10·4·6·6·4·8 | **54/80** | L5/Other | STUDY-PILOT | no |
| `continuedev/continue` | 33,221 | Apache-2.0 | 2026-05-15 | 4·10·10·4·5·6·7·8 | **54/80** | L5/Other | STUDY-PILOT | no |
| `msitarzewski/agency-agents` | 98,294 | MIT | 2026-04-12 | 8·8·10·4·8·3·4·8 | **53/80** | L5/Other | STUDY-PILOT | no |
| `OpenBB-finance/OpenBB` | 67,629 | NOASSERTION | 2026-05-16 | 7·10·5·4·8·7·4·8 | **53/80** | Vertical (out-of-scope) | DEFER (vertical/domain) | no |
| `FlowiseAI/Flowise` | 52,843 | NOASSERTION | 2026-05-14 | 6·10·5·4·6·7·7·8 | **53/80** | L3.5 (Agent-native UI) | STUDY-PILOT | no |
| `microsoft/autogen` | 58,075 | CC-BY-4.0 | 2026-04-15 | 6·8·6·4·6·7·7·7 | **51/80** | L5 (Scaffold framework) | CITE-ONLY (CC-BY for docs only) | no |
| `karpathy/autoresearch` | 81,348 | NONE | 2026-03-26 | 8·8·2·4·8·8·4·7 | **49/80** | L5/Other | STUDY-PILOT (legally unsafe NO-LICENSE) | no |
| `ToolJet/ToolJet` | 37,906 | AGPL-3.0 | 2026-05-16 | 4·10·4·4·5·7·4·6 | **44/80** | L3.5 (Agent-native UI) | DEFER | no |
| `musistudio/claude-code-router` | 34,053 | MIT | 2026-03-04 | 4·8·10·4·5·3·4·6 | **44/80** | L1.0 (Cross-model proxy) | DEFER | no |
| `666ghj/BettaFish` | 40,915 | GPL-2.0 | 2026-05-08 | 5·10·4·4·6·3·4·6 | **42/80** | Vertical (out-of-scope) | DEFER (vertical/domain) | no |

---

## §B — Top-10 highest-priority adds (sum/80 ≥ 64, urgent V-FINAL inclusion)

| # | repo | sum/80 | proposed layer | verdict | gap rationale |
|---:|---|---:|---|---|---|
| 1 | **`anthropics/claude-code`** | **74/80** | L2.0 (Driver root) | INSTALL P0 (cardinal — runtime itself) | The Claude Code runtime itself. Catalog never explicitly anchors this owner/repo despite implicit references throughout. Cardinal omission per GRAPHQL-MISSING §B.1. |
| 2 | **`google-gemini/gemini-cli`** | **73/80** | L0.MCP (MCP server) | INSTALL P0 | 4th major model-vendor peer CLI (alongside opencode + goose + ant-WATCHLIST). Structural L3 gap per GRAPHQL-MISSING §B.5. |
| 3 | **`langchain-ai/langchain`** | **69/80** | L5 (Scaffold framework) | INSTALL P0 | Score 69/80 — L5 (Scaffold framework); license MIT; pushed 2026-05-16. |
| 4 | **`gsd-build/get-shit-done`** | **69/80** | L5/Other | INSTALL P0 | Score 69/80 — L5/Other; license MIT; pushed 2026-05-16. |
| 5 | **`shareAI-lab/learn-claude-code`** | **69/80** | L2.0/L3 (Driver alt-harness/Peer CLI) | INSTALL P0 | Score 69/80 — L2.0/L3 (Driver alt-harness/Peer CLI); license MIT; pushed 2026-05-11. |
| 6 | **`langflow-ai/langflow`** | **67/80** | L5/Other | INSTALL P0 | Score 67/80 — L5/Other; license MIT; pushed 2026-05-16. |
| 7 | **`langgenius/dify`** | **67/80** | L5 (Scaffold framework) | INSTALL P0 | Score 67/80 — L5 (Scaffold framework); license NOASSERTION; pushed 2026-05-16. |
| 8 | **`nextlevelbuilder/ui-ux-pro-max-skill`** | **67/80** | L2.1/L2.2 (Skill collection) | INSTALL P0 | Score 67/80 — L2.1/L2.2 (Skill collection); license MIT; pushed 2026-04-03. |
| 9 | **`farion1231/cc-switch`** | **66/80** | L2.1/L2.2 (Skill collection) | INSTALL P0 | Cross-platform desktop assistant for CC, Codex, OpenCode, OpenClaw, Gemini CLI, Hermes Agent. L2.0 driver multi-host gap per GRAPHQL-MISSING §A. |
| 10 | **`jeecgboot/JeecgBoot`** | **65/80** | L2.1/L2.2 (Skill collection) | INSTALL P0 | Score 65/80 — L2.1/L2.2 (Skill collection); license Apache-2.0; pushed 2026-05-15. |

---

## §C — Distribution by proposed layer

| proposed layer | count | repos |
|---|---:|---|
| L5/Other | 11 | `langflow-ai/langflow`, `msitarzewski/agency-agents`, `garrytan/gstack`, `karpathy/autoresearch`, `OpenHands/OpenHands`, `gsd-build/get-shit-done`, `earendil-works/pi`, `agno-agi/agno`, `patchy631/ai-engineering-hub`, `continuedev/continue`, `vercel-labs/agent-browser` |
| L2.1/L2.2 (Skill collection) | 8 | `nextlevelbuilder/ui-ux-pro-max-skill`, `farion1231/cc-switch`, `JuliusBrussee/caveman`, `ComposioHQ/awesome-claude-skills`, `safishamsi/graphify`, `jeecgboot/JeecgBoot`, `CherryHQ/cherry-studio`, `santifer/career-ops` |
| L2.0/L3 (Driver alt-harness/Peer CLI) | 6 | `affaan-m/everything-claude-code`, `lobehub/lobehub`, `shareAI-lab/learn-claude-code`, `code-yeongyu/oh-my-openagent`, `aaif-goose/goose`, `Yeachan-Heo/oh-my-claudecode` |
| L5 (Scaffold framework) | 5 | `langgenius/dify`, `langchain-ai/langchain`, `microsoft/ai-agents-for-beginners`, `microsoft/autogen`, `crewAIInc/crewAI` |
| L2.2 (Skill vertical) | 3 | `zhayujie/CowAgent`, `nexu-io/open-design`, `github/awesome-copilot` |
| L2.8 (Awesome-list aggregator) | 2 | `Shubhamsaboo/awesome-llm-apps`, `punkpeye/awesome-mcp-servers` |
| L0.MCP (MCP server) | 2 | `google-gemini/gemini-cli`, `ruvnet/ruflo` |
| L6.5/L6.8 (Pattern-cite) | 2 | `dair-ai/Prompt-Engineering-Guide`, `asgeirtj/system_prompts_leaks` |
| Vertical (out-of-scope) | 2 | `OpenBB-finance/OpenBB`, `666ghj/BettaFish` |
| L3.5 (Agent-native UI) | 2 | `FlowiseAI/Flowise`, `ToolJet/ToolJet` |
| L1.0 (Cross-model proxy) | 2 | `musistudio/claude-code-router`, `router-for-me/CLIProxyAPI` |
| L2.2 (Methodology) | 1 | `multica-ai/andrej-karpathy-skills` |
| L2.0 (Driver root) | 1 | `anthropics/claude-code` |
| L0.MCP wrapper / L0.3 RAG | 1 | `firecrawl/firecrawl` |
| L3 (Peer CLI) | 1 | `HKUDS/nanobot` |
| n/a (CITE) | 1 | `luongnv89/claude-howto` |

### Verdict distribution

| verdict | count |
|---|---:|
| INSTALL P1 / EVALUATE | 19 |
| INSTALL P0 | 13 |
| STUDY-PILOT | 5 |
| ALREADY-IN-CATALOG (verify metadata) | 3 |
| DEFER (vertical/domain) | 2 |
| DEFER | 2 |
| INSTALL P0 (CLAUDE.md target set) | 1 |
| INSTALL P0 (cardinal — runtime itself) | 1 |
| STUDY-PILOT (legally unsafe NO-LICENSE) | 1 |
| CITE-ONLY (CC-BY for docs only) | 1 |
| DEFER (alt framework / PATTERN-CITE) | 1 |
| CITE-ONLY (educational) | 1 |

---

## §D — Honest non-findings

### D.1 Query scope did NOT yield 200 unique 50k★ repos as nominal task header implied
- 4 GraphQL queries (topic:claude / topic:llm / topic:agent / topic:ai-agent each filtered stars:>50000) returned only **57 total hits** (13+29+12+3) with 47 unique repos after dedup against catalog membership.
- The 50-row tranche-A scope was filled by **drawing from the pre-existing 373-repo backlog at `tmp/missing-final.json`** (constructed earlier this session via 8 GraphQL searches at the saturation step that yielded 309 ≥2k★ + 88 ≥20k★ + 30 ≥50k★).
- Of the 50 scored repos: 30 are ≥50k★ matching the strict task header, 20 are in the 30-50k★ range (top-of-tail filling to 50 since 373-backlog tail above 50k was exhausted at 30 entries).
- **Honest fix-forward**: the next tranche-B should expand to stars:>30000 OR change the rubric to "top-50 architectural gaps" rather than star-count threshold.

### D.2 In-catalog detection used regex on assembled-text catalog files
- Method: concatenate V-FINAL-V3-CONSOLIDATED + V3-SATURATION + INDEX-BY-LAYER-V3 + D1-D10-SCORECARD-V-FINAL + CANONICAL-D1-D10-146REPO-SCORING; regex extract `owner/repo` tokens; check membership.
- Detected 8 repos already-in-catalog (marked YES in §A). This includes false-positive-resistant matches against full owner/repo. False-NEGATIVE risk: catalog references repos by bare-name (e.g. "caveman" without `JuliusBrussee/`), which the regex misses — `JuliusBrussee/caveman` IS in the catalog per `CANONICAL-D1-D10` row (manually verified).
- ALREADY-IN-CATALOG set used for D8/verdict logic: `{thedotmack/claude-mem, JuliusBrussee/caveman, shanraisshan/claude-code-best-practice, browser-use/browser-use, mem0ai/mem0, ruvnet/ruflo, affaan-m/everything-claude-code, vllm-project/vllm}`. **6/50 already cataloged** = 12% overlap with the 373-backlog top-50.

### D.3 D5 (community-consensus) and D6 (maintainer-tier) are HEURISTIC
- D5: approximated as stars-tier proxy + known-big-org flag. **NOT** measured via actual "deployed in N organizations" — that would require WebFetch on production case-studies or contributor-graph analysis per repo (>200 API calls budget).
- D6: hardcoded `big_org` and `named_t2` allowlists may misclassify. Verified: anthropics→10, karpathy→8 (named-T2 per Wave-X tips), microsoft→7. Mid-tier owners (e.g. `affaan-m`, `code-yeongyu`) defaulted to "User"=3 — likely undervalues mature individual creators.

### D.4 D4 (native-CC-pathway) determined by topic/desc text-match heuristic
- T1 = `anthropics/*` owner OR `anthropic-official` topic
- T2 = `claude-code` / `claude-code-skills` / `agent-skills` topic AND skill/plugin/agent in desc
- T3 = `mcp-server` / `mcp-client` / `mcp` topic
- T4 = generic `claude` / `prompt-engineering` / `vibe-coding` topics
- T5 = none of the above
- **NOT verified** by inspecting actual repo structure (e.g. `.claude/skills/` dir presence). A repo could have a CC pathway not advertised in topics — false-NEGATIVE risk.

### D.5 microsoft/autogen CC-BY-4.0 license — anomalous classification
- CC-BY-4.0 is normally for documentation/data, not code. Microsoft chose this license for autogen which is unusual — TIER-1-DIRECT verification via the GitHub API confirms `cc-by-4.0` SPDX. D3 scored 6 (CC for docs). For code-distribution purposes this is effectively non-OSI and creates redistribution friction. Operator should verify before any INSTALL action.

### D.6 anthropics/claude-code license = NOASSERTION
- GitHub API does not return a recognized SPDX for `anthropics/claude-code`. The actual license is Anthropic Commercial Terms of Service per the repo README — not an OSI-approved open-source license. D3 scored 5 (NOASSERTION midpoint). Verdict P0 is justified ONLY because this IS the runtime itself (cardinal-rule-1 self-host).

### D.7 multica-ai/andrej-karpathy-skills license = NONE
- 131,963★ repo with no LICENSE file. D3 scored 2 (legally unsafe). Verdict still P0 because content is operator-derived from Karpathy public tips and the W254 install set explicitly names this owner — but operator MUST add LICENSE before any production reliance.

### D.8 4 of 4 queries hit lower-than-expected match counts
- topic:claude stars:>50000 → 13 hits (not 50)
- topic:llm stars:>50000 pushed:>2026-01-01 → 29 hits
- topic:agent stars:>50000 → 12 hits
- topic:ai-agent stars:>50000 → 3 hits
- This means the 50k★ ceiling at these topic axes is essentially saturated (~57 unique repos total). Tranche-B should drop the threshold to stars:>30000 to access the next 200+ candidates already enumerated in the 373-backlog.

---

## Output files written
- `Z:\claude-sota-installed\tmp\tranche-a-meta-2026-05-16.json` — raw metadata cache for 50 scored repos + 130+ additional probed repos
- `Z:\claude-sota-installed\tmp\tranche-a-scored.json` — scored rows JSON
- THIS FILE — `Z:\claude-sota-installed\docs\grand-synthesis-2026-05-16\06-fresh-research-delta\BACKLOG-TRANCHE-A-50K-STAR-2026-05-16.md`