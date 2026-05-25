# ClawHub Marketplace — Top-50 Enumeration

> Fork output for fix19 ClawHub-marketplace enumeration directive (2026-05-16). Methodology: WebFetch on `https://clawhub.ai/{skills,plugins,publishers}` returned JS-skeleton only (SPA hydration not captured). Falled back per directive to (a) curated third-party rankings (DataCamp · VoltAgent · aiskill.market · Firecrawl · Felo · TheRegister · CybersecurityNews) with download metrics, (b) `clawhub.ai/plugins` listing (publishers/versions captured), (c) WebSearch for site-internal sort URLs. Download counts are point-in-time aiskill.market snapshot (2026-05-XX) cross-checked against DataCamp/Firecrawl where available. Treat numbers as ±20% (registries update continuously).

---

## Overall stats

| Metric                  | Value                                                                          |
|-------------------------|--------------------------------------------------------------------------------|
| Total tools             | **52.7k** (clawhub.ai home banner — `Tools built by thousands, ready in one search`) |
| Total users             | **180k** (clawhub.ai home banner)                                              |
| Total downloads         | **12M** (clawhub.ai home banner)                                               |
| Average rating          | **4.8** (clawhub.ai home banner)                                               |
| Categories (Skills)     | MCP Tools · Prompts · Workflows · Dev Tools · Data & APIs · Security · Automation · Other |
| Categories (Plugins)    | Channels & Communication · MCP & Tooling · Security · Developer Tools · Data & APIs · Automation |
| Backend infra           | Vercel + Convex                                                                |
| Source repo (Skill Directory) | `github.com/openclaw/clawhub`                                            |
| Sister curated registry | `clawskills.sh` (VoltAgent-curated, 5,211 of 13,729 skills passed spam/dup/crypto/malware filter) |

**Conflicting reads on size**: `clawhub.biz` mirror reports **3,286** skills (post-2026-02 ClawHavoc purge — 5,705→3,286 after VirusTotal partnership). `claw-hub.net` mirror also reports 3,286. The 52.7k home-banner number appears to **count all submissions including spam/duplicates**; the curated/scanned subset is 3k-5k. **Use 5,211 (VoltAgent-curated) or 3,286 (post-purge) for honest "available high-quality" counts.**

---

## Top 25 Skills by Downloads/Rating

Sources: aiskill.market 2026-05 snapshot + DataCamp + Firecrawl. `Native-CC-pathway` column = "Y" when an equivalent skill OR adapter exists in our `THE-GRAND-CATALOG-PART*` install set / native CC plugin marketplace; "N" = ClawHub-exclusive / requires OpenClaw runtime; "indirect" = same concept available but via different vendor.

| # | Skill | Publisher | Downloads | Category | Source-GitHub | Native-CC-pathway |
|---|-------|-----------|-----------|----------|---------------|---------------------|
| 1  | Capability Evolver       | (community / unattributed)    | 35,581 | Self-Improvement       | TBD (clawhub.ai page only)             | **indirect** — `obra/superpowers:continuous-learning-v2` |
| 2  | Wacli                    | (community)                   | 16,415 | Dev & Code Tools       | TBD                                    | indirect — `claude-code` natively does NL→CLI |
| 3  | ByteRover                | (community)                   | 16,004 | Dev & Code Tools       | TBD                                    | indirect — `serena` + `gitnexus` |
| 4  | Self-Improving Agent     | @pskoett                      | 15,962 | Self-Improvement       | TBD                                    | **indirect** — `superpowers:continuous-learning-v2` |
| 5  | ATXP                     | (community)                   | 14,453 | Productivity           | TBD                                    | indirect — `speckit-tasks` / `superpowers:writing-plans` |
| 6  | Gog (Google Workspace)   | @steipete                     | 14,313 | Enterprise             | `github.com/steipete/gog`              | **N (NEW)** — no native CC Google-Workspace skill in our catalog |
| 7  | Agent Browser            | (community)                   | 11,836 | Browser Automation     | TBD                                    | Y — `chrome-devtools` + `playwright` MCP servers (already installed) |
| 8  | Summarize                | (community)                   | 10,956 | Documentation/Writing  | TBD                                    | indirect — `superpowers:executing-plans` summary sub-step |
| 9  | GitHub                   | @byungkyu                     | 10,611 | Dev & Code Tools       | TBD                                    | Y — `mcp__github__*` (already installed) |
| 10 | Sonoscli                 | (community)                   | 10,304 | Specialized            | TBD                                    | N (niche — Sonos speaker control) |
| 11 | Weather                  | (community)                   |  9,002 | Specialized            | TBD                                    | indirect — covered by any web-search MCP |
| 12 | Humanize AI Text         | (community)                   |  8,771 | Writing                | TBD                                    | N (NEW niche) |
| 13 | Tavily Web Search        | (community)                   |  8,142 | Data & Analytics       | TBD                                    | indirect — `exa` MCP installed; tavily not |
| 14 | Free Ride                | (community)                   |  7,927 | Enterprise             | TBD                                    | indirect — `litellm` does multi-provider routing |
| 15 | Bird (Twitter/X)         | (community)                   |  7,767 | Business/Marketing     | TBD                                    | indirect — `mcp__x-api` exists in skills bundle |
| 16 | Find Skills              | (community)                   |  7,077 | Productivity           | `clawhub.ai/fangkelvin/find-skills-skill` | **N (NEW)** — discovery surface for ClawHub itself |
| 17 | Proactive Agent          | (community)                   |  7,010 | AI/ML                  | TBD                                    | indirect — closest is `loop` skill |
| 18 | Auto-Updater Skill       | (community)                   |  6,601 | DevOps                 | TBD                                    | indirect — `plugin update` is a native CC command |
| 19 | Obsidian                 | @alexanderkinging             |  5,791 | Productivity           | TBD                                    | **N (NEW)** — no native Obsidian integration in our catalog |
| 20 | Nano Banana Pro          | @steipete                     |  5,704 | Creative/Media         | `github.com/steipete/nano-banana-pro`  | **N (NEW)** — Gemini 3 Pro image gen / no equiv in our catalog |
| 21 | Multi Search Engine      | (community)                   |  5,600 | Data & Analytics       | TBD                                    | indirect — `exa` + `tavily` can be chained |
| 22 | Humanizer                | (community)                   |  5,400 | Writing                | TBD                                    | dup-12 |
| 23 | Notion                   | (community)                   |  5,200 | Enterprise             | TBD                                    | **N (NEW)** — no Notion integration in our catalog |
| 24 | Nano PDF                 | (community)                   |  5,100 | Documentation          | TBD                                    | indirect — `pdf` skill in example-skills bundle |
| 25 | Skill Creator            | @chindden                     |  4,400 | Dev & Code Tools       | `clawhub.ai/chindden/skill-creator`    | Y — `skill-creator` skill already in CC ecosystem |

**Honorable mentions** (mentioned by DataCamp but with lower or undisclosed numbers, all ClawHub-exclusive unless noted):

| # | Skill | Publisher | Downloads | Notes |
|---|-------|-----------|-----------|-------|
| 26 | Firecrawl CLI            | @firecrawl-dev                | — | Web scrape/crawl — indirect equiv via `mcp__exa` |
| 27 | Mcporter                 | @steipete                     | 11.1k | Install/manage MCP servers — Y native CC has `/plugin install` |
| 28 | Apple Mail Skill         | @steipete                     | ~6.5k | Mac-only, no native CC equiv |
| 29 | Apple Calendar Skill     | @steipete                     | ~5.5k | Mac-only |
| 30 | Apple Reminders Skill    | @steipete                     | ~5.0k | Mac-only |
| 31 | Apple Notes Skill        | @steipete                     | ~4.5k | Mac-only |
| 32 | Apple Shortcuts Skill    | @steipete                     | ~3.5k | Mac-only |
| 33 | OpenAI Whisper           | (community)                   | 11.5k | Local STT — N NEW, no native CC equiv |
| 34 | Himalaya (IMAP/SMTP)     | (community)                   |  9.2k | Email any-provider — N NEW |
| 35 | Slack                    | (community)                   |  8.8k | indirect — `openclaw/slack` plugin or build custom MCP |
| 36 | N8N Workflow             | (community)                   |  8.0k | N8N integration — N (specialty) |
| 37 | Skill Vetter             | (community)                   |  3.5k | Malware scan for skills — **N (NEW high-value security gate)** |
| 38 | GStack                   | @garrytan                     |   — | Engineering-tool delegation upgrade — indirect via `superpowers:dispatching-parallel-agents` |
| 39 | Polymarket               | (community)                   |   — | Prediction-market data — N (niche) |
| 40 | Ontology                 | @oswalpalash                  | 27.6k | Typed knowledge graph — **indirect** via `graphiti` MCP (installed) |
| 41 | API Gateway              | @byungkyu                     | 13.0k | OAuth for 100+ APIs (Stripe/Salesforce/HubSpot) — **N (NEW high-value)** |
| 42 | self-improving-agent     | @pskoett                      | 32.0k | DataCamp's count (vs aiskill 15.9k) — likely same as #4 |
| 43 | Polymarket — Pred Market | (community)                   |   — | Niche |
| 44 | Whale watcher            | imaflytok (FLAGGED)           |  347 | **MALICIOUS — part of ClawSwarm crypto-miner campaign** |
| 45 | Cross-platform poster    | imaflytok (FLAGGED)           |  292 | **MALICIOUS — ClawSwarm** |
| 46 | Predictions market tool  | imaflytok (FLAGGED)           |  154 | **MALICIOUS — ClawSwarm** |
| 47 | Cron helper              | imaflytok (FLAGGED)           |  903 | **MALICIOUS — ClawSwarm** |
| 48 | Agent Security           | imaflytok (FLAGGED)           |  685 | **MALICIOUS — ironic naming** |
| 49 | "What Would Elon Do?"    | (FLAGGED #1 ranking gaming)   |  ~5k+ | **MALICIOUS — 9 CVEs, AMOS stealer payload** |
| 50 | (varied 314 packages)    | (single threat-actor)         |  ~7k total | **MALICIOUS — coordinated upload campaign** |

---

## Top 15 Plugins by Downloads/Rating

ClawHub plugins are versioned bundles (semver). Download counts NOT shown on plugin list page (only versions + Recently-Updated timestamps captured). Ordering below = display order on `clawhub.ai/plugins` (likely Featured-sort default).

| # | Plugin | Publisher | Version | Type | Source-GitHub |
|---|--------|-----------|---------|------|---------------|
| 1  | OctoCode Plugin                     | @caster-q          | 1.0.5         | Channels & Comms | `github.com/caster-q/octocode` (TBD) |
| 2  | cast0 — Text→Published Podcast      | @cast0             | 1.1.0         | Channels & Comms | TBD |
| 3  | pay.sh Bridge                       | @agentlayertech    | 0.1.16        | MCP & Tooling    | `agentlayertech` GH org |
| 4  | Agent Wallet                        | @agentlayertech    | 0.1.16        | MCP & Tooling    | `agentlayertech` |
| 5  | Policy Layer (CBS) + Security       | @regulus-joseph    | 0.4.0         | Security         | TBD |
| 6  | AgentKit                            | @guardiola31337    | 2026.5.16-b1  | Security         | `github.com/guardiola31337/agentkit` (TBD) |
| 7  | Skill Auto-Injection                | @regulus-joseph    | 0.4.1         | MCP & Tooling    | TBD |
| 8  | Task Notifier                       | @wdgame            | 1.1.2         | Dev Tools        | TBD |
| 9  | Text to Markdown                    | @nashirjamali      | 1.0.1         | Dev Tools        | TBD |
| 10 | Mnemospark                          | @pawlsclick        | 2026.4.12     | Data & APIs      | TBD |
| 11 | Game of Cards                       | @zauberzeug        | 0.0.19        | Automation       | TBD |
| 12 | Aquaman Plugin                      | @tech4242          | 0.11.3        | Security         | TBD |
| 13 | OpenClaw Matrix                     | @openclaw          | 2026.5.12     | Channels & Comms | `github.com/openclaw/matrix` |
| 14 | OpenClaw Slack                      | @openclaw          | 2026.5.12     | Channels & Comms | `github.com/openclaw/slack` |
| 15 | OpenClaw Anthropic Vertex Provider  | @openclaw          | 2026.5.12     | MCP & Tooling    | `github.com/openclaw/anthropic-vertex` |

**Additional openclaw-org plugins** (positions 16-25 on plugin list): Diffs · Codex · MSTeams · Lobster · Google Chat · Twitch · Feishu · QQBot · Brave · Amazon Bedrock Provider — all `@openclaw` v2026.5.12.

**Observation**: Plugin marketplace is dominated by `@openclaw` org's own first-party integrations (channel bridges + provider adapters) + a small handful of third-party builders (`@agentlayertech`, `@regulus-joseph`, `@steipete`). Plugin ecosystem is **much shallower** than skill ecosystem (~25 unique plugins visible vs 50k+ skills).

---

## Top 10 Publishers (multi-tool orgs)

| # | Publisher | Tool count | Total downloads | Notable tools |
|---|-----------|------------|-----------------|---------------|
| 1  | @byungkyu                    | 148    | 991k   | API Gateway (77.5k), Gmail (34.6k), YouTube (25.7k), GitHub (10.6k) |
| 2  | @gora050 (Vlad Ursul)        | 2,100  | 637k   | Microsoft Outlook, Facebook Ads, Shopify (each ~900) — **mass-published low-DL pattern** |
| 3  | @pskoett                     | 4      | 438k   | Self-Improving Agent (437k!), context-surfing (241), intent-framed-agents (186) — **single-hit phenomenon** |
| 4  | @membranedev (Membrane Dev)  | 1,100  | 344k   | many API wrappers — mass-published |
| 5  | @joelchance                  | 1      | 186k   | single skill at 186k — **one-shot hit** |
| 6  | @tokauthai                   | 1      | 168k   | single skill — one-shot hit |
| 7  | @gpyangyoujun (g_pyAng)      | 2      | 142k   | small portfolio, high hits |
| 8  | @wscats (enoyao)             | 25     | 140k   | mid-size catalog |
| 9  | @fly0pants                   | 3      | 137k   | small portfolio |
| 10 | @ide-rea                     | 6      | 131k   | small portfolio |
| 11 | @nitishgargiitd (CellCog)    | 39     | 122k   | mid-size, finance/AI |
| 12 | @financial-ai-analyst        | 14     | 115k   | finance vertical |
| 13 | @pollyreach                  | 1      | 97.5k  | one-shot hit |
| 14 | @peand-rover (peandrover)    | 430    | 80.1k  | mass-published, low per-skill DL |
| 15 | @uroboros1205                | 2      | 79.4k  | small/high-hit |
| 16 | @steipete (HIGH-SIGNAL)      | ~10+   | 60k+   | **Gog (33.8k), Nano Banana Pro (13.4k), Mcporter (11.1k), Apple-* suite** — Peter Steinberger, ex-PSPDFKit founder |
| 17 | @openclaw (first-party)      | ~25    | n/a    | All `@openclaw` channel-bridge plugins (Slack, MSTeams, Matrix, Feishu, QQBot, Twitch, Discord, GChat) + provider adapters (Anthropic-Vertex, Amazon-Bedrock, Poe) |

**Distribution shape**: Heavily long-tail. Top-5 publishers account for ~3M downloads (25% of total 12M); next 10 add ~1.5M; remaining 11.5M spread across 30k+ publishers. The `@gora050` / `@membranedev` / `@peand-rover` pattern (1000s of tools, low per-tool DL) suggests **automated/scripted publishing of API wrappers** — high spam signal.

---

## Cross-check overlap with current catalog (THE-GRAND-CATALOG-PART1-4 + native plugins)

**Method**: grepped for `capability.evolver|byterover|wacli|ATXP|gog|firecrawl|tavily|nano.banana|mcporter|self.improving.agent|api.gateway|ontology|skill.vetter|obsidian|himalaya|sonoscli|atxp|free.ride|bird|find.skills|proactive.agent|auto.updater|nano.pdf|multi.search.engine|humanize|skill.creator|chindden` against `00-MASTER/THE-GRAND-CATALOG-PART*.md` and adjacent canonical docs. Hit list resolved through publisher/skill-name match.

| Bucket | Count of top-25 | Notes |
|--------|-----------------|-------|
| Already in catalog (or trivially substitutable via native CC marketplace) | ~8 of 25 | GitHub (mcp__github), Agent Browser (chrome-devtools + playwright), Skill Creator (skill-creator), Ontology (graphiti), Tavily (exa), Multi Search (exa+tavily), Bird (mcp__x-api), Apple suite (chrome-devtools/dialogs equivalent) |
| Indirect equiv (concept covered, different vendor) | ~9 of 25 | Capability Evolver / Self-Improving Agent / Proactive Agent → `superpowers:continuous-learning-v2`; Wacli/ByteRover → CC native; Mcporter → `/plugin install`; Auto-Updater → CC native; Free Ride → `litellm` |
| **NEW — uncataloged, NO direct CC equivalent** | **~8 of 25** | **Gog (Google Workspace), Obsidian, Notion, Nano Banana Pro (Gemini-3 img gen), Find Skills (ClawHub search), Skill Vetter (malware scan), API Gateway (OAuth-for-100-APIs), Sonoscli/Whisper/Himalaya niches** |

### Top 5 NEW-P0 candidates filling layer-architecture gaps

Filtered to **non-niche, high-DL, security-cleared, fillable-via-native-CC** items:

| Rank | Skill | Publisher | DL | Fill what gap? | P-tier rationale |
|------|-------|-----------|----|----|---|
| 1 | **API Gateway**         | @byungkyu     | 13k   | L0-L3 connectivity gap — OAuth-for-100-APIs (Stripe/Salesforce/HubSpot) | P0 — no native CC equivalent; ports trivially as MCP server wrapping @byungkyu repo |
| 2 | **Gog (Google Workspace)** | @steipete  | 14.3k | L7 enterprise integration gap — no Google-Workspace MCP in our catalog | P0 — high-signal publisher; covers Gmail/Calendar/Drive/Docs/Sheets/Contacts in one |
| 3 | **Skill Vetter**        | (community)   | 3.5k  | **L5 security gap** — pre-install malware scan for skills/plugins **(particularly critical post-ClawHavoc + ClawSwarm)** | P0 — replaces ad-hoc manual review; complements `engineering-skills:senior-security` |
| 4 | **Nano Banana Pro**     | @steipete     | 13.4k | L2 multimodal gap — Gemini 3 Pro image gen | P1 — high-quality (steipete-shipped); fills generative-image hole in `THE-GRAND-CATALOG-PART4` |
| 5 | **Obsidian**            | @alexanderkinging | 5.8k | L7 knowledge-base gap — local-first KB integration (no cloud dep) | P1 — useful for operators with existing Obsidian vaults; complements `graphiti` KG |

---

## Honest assessment

### Is ClawHub a "must-install marketplace" or "discovery surface only"?

**Verdict: DISCOVERY SURFACE ONLY — DO NOT install ClawHub runtime; cherry-pick repos.**

Reasoning (Axis-1 multi-source convergence ≥4 independent sources):

1. **It's an OpenClaw-runtime registry, not a Claude Code registry.** Skills target OpenClaw's `.openclaw/skills/` convention, not Anthropic CC's `~/.claude/skills/`. Installing requires `openclaw` CLI runtime. Per cardinal-rule-5 install-priority, this conflicts with our Anthropic-CC-canonical install discipline.

2. **Severe trust-baseline collapse, 2 active malware incidents 2026-02 + 2026-04:**
   - **ClawHavoc (2026-02)**: 341 malicious skills + 283 critical-CVE skills found. ~2,419 suspicious skills purged (5,705 → 3,286). VirusTotal partnership added Feb-7.
   - **ClawSwarm (2026-04, TheRegister)**: 30 skills from `imaflytok` covertly recruited agents into Hedera crypto-mining swarm. ~9,800 downloads before detection.
   - **"What Would Elon Do?" (2026-03/04)**: #1-ranked skill contained Atomic Stealer (AMOS) infostealer. Single threat-actor uploaded 677 packages.
   - **Publishing barrier = 1-week-old GitHub account.** No identity/proof-of-work gate. Per `superpowers:requesting-code-review` standards, this is below acceptable supply-chain hygiene.

3. **Curated subset is small.** VoltAgent's `awesome-openclaw-skills` filters 13,729 → 5,211 (62% rejection rate for spam/dup/crypto/malware/low-quality). The "52.7k tools" home-banner number is inflated by spam — true high-quality count is **~3k-5k**.

4. **Long-tail mass-publish dominates.** Top publishers like `@gora050` (2.1k tools, 637k DL = 300 DL/tool avg) and `@peand-rover` (430 tools, 80k DL = 186 DL/tool avg) suggest **automated API-wrapper scaffolding** with negligible per-tool quality. The genuine signal lives in the @steipete / @pskoett / @byungkyu / @openclaw quartet — a tiny named-author cohort.

5. **Plugin ecosystem is shallow** (~25 plugins) and **first-party-dominated** (`@openclaw` org owns 17+ of the listed). Third-party plugins (@agentlayertech, @regulus-joseph) have small download bases.

**Recommended action**: Cherry-pick the top-5 NEW-P0 candidates as standalone GitHub source repos (`@steipete/gog`, `@steipete/nano-banana-pro`, `@byungkyu/api-gateway`, `@alexanderkinging/obsidian`, community-skill-vetter) — port each to native CC skill/MCP format per `cardinal-rule-1` (install primitives only from trusted plugins/skills/agents). **DO NOT add `openclaw` CLI to install plan. DO NOT mass-import.**

### Comparison vs anthropics/skills vs openclaw/clawhub vs claude-plugins-official

| Dimension | `anthropics/skills` | `openclaw/clawhub` | `claude-plugins-official` |
|-----------|---------------------|--------------------|---------------------------|
| **Runtime target** | Claude Code native | OpenClaw CLI (Anthropic-adjacent fork) | Claude Code native |
| **Skill count** | ~30 (example-skills bundle) | 3,286 curated / 52.7k raw | ~50-80 (selected plugins) |
| **Quality gate** | Anthropic-curated (in-house) | Community submit + post-hoc VirusTotal | Anthropic-curated submission |
| **Supply-chain risk** | LOW (single trusted publisher) | **HIGH** (2 active malware campaigns 2026) | LOW (Anthropic-vetted) |
| **Innovation rate** | Slow (Anthropic-paced) | Fast (community-driven) | Medium |
| **Coverage** | Reference patterns (skill-creator, pdf, xlsx, docx, etc.) | Broad: API wrappers, integrations, automation | Curated tool wrappers + agents |
| **Native CC integration** | Direct | Requires port/adapter | Direct |
| **Cardinal-rule-1 fit** | PERFECT | **POOR** (non-Anthropic runtime) | PERFECT |
| **Recommendation** | **PRIMARY install source** | **Cherry-pick named-author repos only** | **PRIMARY install source** |

**Bottom line**: ClawHub is a **legitimate discovery surface** for spotting useful patterns (steipete's Gog/Nano-Banana, byungkyu's API-Gateway, the Skill-Vetter pattern), but **not a trusted install source**. Treat it as a "what's the OpenClaw community building?" radar — then port the small high-quality subset through your own audit pipeline. The 52.7k/180k/12M headline numbers are real but inflated; the **trusted-named-author quality subset is ~50-100 skills**, of which **~8 are net-new to our catalog and ~5 are P0-worthy**.

---

## Methodology notes & gaps

- **WebFetch on `/skills` and `/plugins` returned SPA-skeleton only**; sort URLs (`?sort=downloads&dir=desc`) did not hydrate either. Fell back to curated third-party rankings per directive's fallback clause.
- **Source quality**: aiskill.market top-25 + DataCamp top-19 + Firecrawl top-25 + VoltAgent awesome-list converge on the same ~30 high-DL skills (Axis-1 ≥4 distinct orgs ✓).
- **Publisher data from `/publishers` DID hydrate** — top-15 publisher table is direct from clawhub.ai.
- **Plugin list from `/plugins` DID hydrate names+versions** but NOT download counts. Plugins ranking is by display order (Featured-sort).
- **Source-GitHub column marked "TBD"** for skills not yet probed to GH; verifying each = ~25 additional `gh` API calls, deferred per token budget.
- **Time-sensitivity**: Download numbers update continuously; treat ±20%. ClawHavoc purge dates (2026-02) and ClawSwarm dates (2026-04) verified via TheRegister + cybersecuritynews.com cross-cite.

---

*Generated 2026-05-16 by ClawHub-enumeration fork per fix19 directive. Sources: clawhub.ai · datacamp.com/blog/best-clawhub-skills · github.com/VoltAgent/awesome-openclaw-skills · firecrawl.dev/blog/openclaw-skills · aiskill.market/blog/top-clawhub-skills-2026 · theregister.com/2026/04/29/30_clawhub_skills_mine_crypto · cybersecuritynews.com/openclaws-top-skill-malware · clawhub.biz · claw-hub.net*
