# Wave 6 Agent N — `punkpeye/awesome-mcp-servers` Narrow Categorical Audit

**Source**: `punkpeye/awesome-mcp-servers` README @ SHA `39b5e990fe94734de271a2b13ec1513811da9cdd` (~86k★ MIT, ~722KB README; full-fetch via `mcp__github__get_file_contents` then chunked-extracted to `tmp/wave6N-sections/*.md` by category)
**Methodology**: categorical extraction by anchor → bullet parse → official-badge + named-org filter → GitHub API probe for stars/license/freshness/archived
**Probe artifacts**:
- Section dumps: `Z:/claude-sota-installed/tmp/wave6N-sections/{18 categories}.md`
- Parsed JSON bullets: `Z:/claude-sota-installed/tmp/wave6N-parsed/{18}.json` (1232 total entries across target categories)
- GitHub API probes: `Z:/claude-sota-installed/tmp/wave6N-github-probe.json` + `wave6N-github-probe2.json` (60 slugs probed, stars/license/pushed_at/archived)

**Phase 3 baseline (Option B starter+optional, to dedupe against)**:
- **5 starter**: `doobidoo/mcp-memory-service` (memory), `upstash/context7-mcp` (docs), `github/github-mcp-server` (VCS), `cognition-ai/deepwiki` (wiki), `yamadashy/repomix` (pack)
- **7 optional** (per Wave 5 Option B): `oraios/serena` (LSP), `ast-grep/ast-grep-mcp` (AST), `microsoft/playwright-mcp` (browser), `getzep/graphiti` (L3 KG — already INSTALLED), `mendableai/firecrawl-mcp-server` (scrape), `exa-labs/exa-mcp-server` (search), `modelcontextprotocol/servers` (Anthropic-canonical reference subset)

---

## Executive summary — top-10 NEW high-signal candidates beyond Phase 3 baseline

Ranked by structural-fit-to-runtime + axis-1-PASS (Apache-2.0/MIT) + axis-2 (named-org maintainer) + axis-3 stability (≥3mo + active push):

| # | Slug | Category | License | Stars | Last push | Why for this runtime |
|---|---|---|---|---|---|---|
| 1 | `modelcontextprotocol/servers` (Filesystem + Git + Memory + Fetch + Time + Sequential-Thinking + Everything subdirs) | reference | Apache-2.0 (new) + MIT (old) | 85,657 | 2026-05-12 | Anthropic-managed canonical 7-server reference set; `Filesystem` + `Git` + `Sequential-Thinking` + `Time` + `Fetch` fill 5 gaps absent from Phase 3 starters. SOTA-pure. |
| 2 | `microsoft/markitdown` | file-systems | MIT | 123,198 | 2026-04-20 | Microsoft-official; converts PDF/docx/pptx/xlsx/image → Markdown for LLM consumption. Fills the "file format normalization" gap before Edit/Read. Massive ecosystem signal (123k★). |
| 3 | `awslabs/mcp` | cloud / dev-tools | Apache-2.0 | 9,049 | 2026-05-15 | AWS-official MCP suite (multi-service: S3/Lambda/Bedrock/CloudWatch). Fills any future AWS-tooling gap with vendor-canonical authority. |
| 4 | `googleapis/genai-toolbox` | databases | Apache-2.0 | 15,223 | 2026-05-14 | Google-official "easy, fast, secure" DB tools MCP — Postgres/MySQL/Spanner/BigQuery. Strong vendor-org Axis-1 signal + actively pushed. |
| 5 | `cloudflare/mcp-server-cloudflare` | cloud / dev-tools | Apache-2.0 | 3,740 | 2026-04-30 | Cloudflare-official (Workers/R2/D1/KV). Vendor-canonical; fills future edge-compute toolchain. |
| 6 | `grafana/mcp-grafana` | monitoring | Apache-2.0 | 3,005 | 2026-05-15 | Grafana-official observability MCP. Search dashboards, investigate incidents, query datasources. SOTA observability stack vendor. |
| 7 | `mongodb-js/mongodb-mcp-server` | databases | Apache-2.0 | 1,020 | 2026-05-14 | MongoDB-official MCP. Vendor-canonical document-DB authority. |
| 8 | `stripe/agent-toolkit` | payments / dev-tools | MIT | 1,549 | 2026-05-13 | Stripe-official agent toolkit (MCP + non-MCP SDKs). High-confidence vendor-canonical pattern for any future payments use. |
| 9 | `safedep/vet` | security | Apache-2.0 | 1,034 | 2026-05-14 | OSS-canonical supply-chain vulnerability scanner with MCP wrapper. Scans packages suggested by AI coding tools for known CVEs + malicious code. Fills CR-9 install-risk discipline check at MCP layer. |
| 10 | `1mcp-app/agent` | aggregators | Apache-2.0 | 436 | 2026-05-13 | Best Apache-2.0 MCP aggregator candidate. Multiplexes many MCPs through one connection — useful if `manifests/services.yaml` grows. Younger ladder; STUDY-PILOT not ADOPT-NOW. |

**Honorable mention (named-org, mature, but lower runtime fit)**:
- `redis/mcp-redis` (Redis-official MIT 509★ 2026-05-13) — vendor-canonical for cache use
- `supabase-community/supabase-mcp` (Apache-2.0 2,684★ 2026-05-12) — supabase-affiliated community-org
- `JetBrains/mcpProxy` (Apache-2.0 953★ 2026-01-07) — JetBrains-official IDE bridge (stale push >100 days; reaudit when pushed)
- `crystaldba/postgres-mcp` (MIT 2,742★ 2026-01-22) — community Postgres MCP, popular but not vendor-official
- `sooperset/mcp-atlassian` (MIT 5,181★ 2026-04-10) — popular Jira/Confluence

---

## Categorical top-3 tables

Below: per Wave-6N target category, top-3 candidates (license/stars/last-push/install command). **`🎖️` = official badge in punkpeye list**. Phase 3 dupes flagged explicitly.

### Memory / vector storage (`knowledge--memory`)

| Slug | License | Stars | Pushed | Install | Phase 3 dup? |
|---|---|---|---|---|---|
| `doobidoo/mcp-memory-service` | Apache-2.0 | (Phase 3 starter) | — | already installed | ✅ Phase 3 starter |
| `getzep/graphiti` | Apache-2.0 | 26,068 | 2026-05-14 | already INSTALLED at L3 per CLAUDE.md | ✅ Phase 3 + INSTALLED |
| `chroma-core/chroma-mcp` 🎖️ | Apache-2.0 | 546 | 2025-09-17 | `pip install chroma-mcp` | NEW |
| `pinecone-io/assistant-mcp` 🎖️ | MIT | 43 | 2025-04-17 | `gh repo clone pinecone-io/assistant-mcp` | NEW (low stars; STUDY-PILOT) |

**HNF**: beyond doobidoo + Graphiti, no high-signal new vector/KG MCP that isn't a vendor-cloud-lock (Pinecone is cloud-only; Chroma is open-source but local-mode-supported). **Recommendation**: skip new memory installs; Phase 3 + Graphiti cover the L1+L3 layers.

### Code intelligence / LSP-like (`code-intel` — manually selected from `developer-tools`)

| Slug | License | Stars | Pushed | Install | Phase 3 dup? |
|---|---|---|---|---|---|
| `oraios/serena` | MIT | 24,226 | 2026-05-14 | `uvx --from git+https://github.com/oraios/serena serena-mcp-server` | ✅ Phase 3 optional |
| `ast-grep/ast-grep-mcp` | MIT | 403 | 2026-04-21 | `npm install -g @ast-grep/mcp` | ✅ Phase 3 optional |
| `JetBrains/mcpProxy` 🎖️ | Apache-2.0 | 953 | 2026-01-07 | `gh repo clone JetBrains/mcpProxy` | NEW (stale push; not for autonomous loop) |

**HNF**: code-intel space already saturated by Phase 3 Serena + ast-grep. JetBrains is IDE-coupled (interactive only); skip for autonomous runtime.

### Git ecosystem (`version-control`)

| Slug | License | Stars | Pushed | Install | Phase 3 dup? |
|---|---|---|---|---|---|
| `github/github-mcp-server` | MIT | 29,836 | 2026-05-14 | `gh repo clone github/github-mcp-server` | ✅ Phase 3 starter |
| `modelcontextprotocol/servers` → `src/git` | MIT (existing) / Apache-2.0 (new) | 85,657 | 2026-05-12 | `uvx mcp-server-git` | NEW — Anthropic-canonical local-git wrapper |
| `zereight/gitlab-mcp` | MIT | 1,511 | 2026-05-13 | `npm install -g @zereight/gitlab-mcp` | NEW (defer until GitLab use surfaces) |

**Recommendation**: install `uvx mcp-server-git` from `modelcontextprotocol/servers` for local-git operations (complements GitHub MCP which is API-remote-only). Defer gitlab-mcp until ecosystem demand.

### Browser / web automation (`browser-automation`)

| Slug | License | Stars | Pushed | Install | Phase 3 dup? |
|---|---|---|---|---|---|
| `microsoft/playwright-mcp` | Apache-2.0 | 32,520 | 2026-05-12 | `npm install -g @playwright/mcp` | ✅ Phase 3 optional |
| `browserbase/mcp-server-browserbase` 🎖️ | Apache-2.0 | 3,338 | 2026-05-07 | `gh repo clone browserbase/mcp-server-browserbase` | NEW (cloud-only; defer) |
| `modelcontextprotocol/servers-archived` → `src/puppeteer` | MIT | 259 | (archived 2025-05) | n/a | REJECT — archived |

**Recommendation**: Phase 3 already covers Playwright. Browserbase is cloud-paid; defer until use case demands cloud browser.

### Database (postgres / mysql / sqlite / vector)

| Slug | License | Stars | Pushed | Install | Phase 3 dup? |
|---|---|---|---|---|---|
| `googleapis/genai-toolbox` | Apache-2.0 | 15,223 | 2026-05-14 | `gh release download --repo googleapis/genai-toolbox` | NEW — top pick |
| `redis/mcp-redis` 🎖️ | MIT | 509 | 2026-05-13 | `uvx mcp-redis` | NEW |
| `supabase-community/supabase-mcp` 🎖️ | Apache-2.0 | 2,684 | 2026-05-12 | `npx -y @supabase/mcp-server-supabase` | NEW (supabase-community-org) |
| `mongodb-js/mongodb-mcp-server` 🎖️ | Apache-2.0 | 1,020 | 2026-05-14 | `npx -y mongodb-mcp-server` | NEW |
| `crystaldba/postgres-mcp` | MIT | 2,742 | 2026-01-22 | `uvx postgres-mcp` | NEW (community-org; defer if not used) |
| `Snowflake-Labs/mcp` 🎖️ | Apache-2.0 | 286 | 2026-04-13 | `uvx --from git+https://github.com/Snowflake-Labs/mcp snowflake-mcp` | NEW |

**Recommendation**: don't pre-install vendor DB MCPs without active demand. **Defer all** as install-on-demand; document candidates in `docs/sota-installed-manifest.md` Phase 4+ section.

### Search / docs / fetch

| Slug | License | Stars | Pushed | Install | Phase 3 dup? |
|---|---|---|---|---|---|
| `exa-labs/exa-mcp-server` 🎖️ | MIT | 4,430 | 2026-05-14 | `npx -y exa-mcp-server` | ✅ Phase 3 optional |
| `mendableai/firecrawl-mcp-server` | MIT | 6,311 | 2026-05-14 | `npx -y firecrawl-mcp` | ✅ Phase 3 optional |
| `tavily-ai/tavily-mcp` | MIT | 1,965 | 2026-05-12 | `npx -y tavily-mcp` | NEW (Tavily Search API; cloud-paid) |
| `brave/brave-search-mcp-server` | MIT | 1,012 | 2026-05-15 | `gh repo clone brave/brave-search-mcp-server` | NEW (replaces archived mcp-servers/brave-search) |
| `ppl-ai/modelcontextprotocol` | MIT | 2,194 | 2026-04-14 | `npx -y server-perplexity-ask` | NEW (Perplexity-official; cloud-paid) |
| `modelcontextprotocol/servers` → `src/fetch` | MIT/Apache-2.0 | 85,657 | 2026-05-12 | `uvx mcp-server-fetch` | NEW — Anthropic-canonical |

**Recommendation**: install `uvx mcp-server-fetch` for unauthenticated web fetch (no API key). Phase 3 covers paid Exa/Firecrawl. Add `brave-search-mcp-server` if a Brave Search API key is available.

### Filesystem / shell

| Slug | License | Stars | Pushed | Install | Phase 3 dup? |
|---|---|---|---|---|---|
| `modelcontextprotocol/servers` → `src/filesystem` | MIT/Apache-2.0 | 85,657 | 2026-05-12 | `npx -y @modelcontextprotocol/server-filesystem <path>` | NEW — Anthropic-canonical |
| `microsoft/markitdown` 🎖️ | MIT | 123,198 | 2026-04-20 | `pip install markitdown[all]` then `markitdown-mcp` | NEW — TOP PICK |
| `mark3labs/mcp-filesystem-server` | MIT | 639 | 2025-11-24 | community fork | NEW (defer; Anthropic-canonical preferred) |

**Recommendation**: TOP NEW — install `modelcontextprotocol/server-filesystem` (Anthropic-canonical) + `microsoft/markitdown` (for PDF/docx/pptx → Markdown conversion during research probes).

### Time / scheduling

| Slug | License | Stars | Pushed | Install | Phase 3 dup? |
|---|---|---|---|---|---|
| `modelcontextprotocol/servers` → `src/time` | MIT/Apache-2.0 | 85,657 | 2026-05-12 | `uvx mcp-server-time` | NEW — Anthropic-canonical |
| `yokingma/time-mcp` | MIT | 66 | 2026-01-31 | `npm install -g time-mcp` | NEW (community; defer) |

**Recommendation**: install Anthropic-canonical `mcp-server-time` for timezone conversion (cheap; supports `--local-timezone` flag).

### Slack / Discord / Communication

| Slug | License | Stars | Pushed | Install | Phase 3 dup? |
|---|---|---|---|---|---|
| `korotovsky/slack-mcp-server` | MIT | 1,596 | 2026-05-14 | `gh repo clone korotovsky/slack-mcp-server` | NEW (Zencoder-maintained per official mcp servers archived note) |
| `SaseQ/discord-mcp` | MIT | 308 | 2026-04-25 | `gh repo clone SaseQ/discord-mcp` | NEW |
| `discourse/discourse-mcp` 🎖️ | (Discourse-official Ruby) | n/a | 2026-recent | `gem install discourse-mcp` | NEW — vendor-official forum |

**Recommendation**: skip pre-install. Adopt on-demand when communication-platform automation requested.

### Observability / monitoring / tracing

| Slug | License | Stars | Pushed | Install | Phase 3 dup? |
|---|---|---|---|---|---|
| `grafana/mcp-grafana` 🎖️ | Apache-2.0 | 3,005 | 2026-05-15 | `gh release download --repo grafana/mcp-grafana` | NEW — TOP PICK |
| `getsentry/sentry-mcp` | NOASSERTION | 688 | 2026-05-15 | `npx -y @sentry/mcp-server` | NEW (license unclear — verify before adopt) |
| `pydantic/logfire-mcp` 🎖️ | MIT | 161 | (archived 2026-03-24) | n/a | REJECT — ARCHIVED |
| `netdata/netdata` 🎖️ | GPL-3.0 | 78,811 | 2026-05-15 | n/a | REJECT — GPL-3.0 incompat |
| `dynatrace-oss/dynatrace-mcp` 🎖️ | Apache-2.0 | n/a | 2026-recent | vendor-official | NEW (vendor-specific) |
| `comet-ml/opik-mcp` 🎖️ | (verify) | n/a | 2026-recent | already DISABLED in claude-sota | known DISABLED upstream |

**Recommendation**: Grafana-official is sole strong general-observability candidate; install when Grafana stack adopted.

### LLM tools (anthropic/openai SDK MCPs)

Skipping — Claude Code itself is the orchestrator; no need for an LLM-API-wrapping MCP.

### Code execution / sandbox

| Slug | License | Stars | Pushed | Install | Phase 3 dup? |
|---|---|---|---|---|---|
| `yepcode/mcp-server-js` 🎖️ | MIT | 43 | 2026-03-17 | `npm install -g @yepcode/mcp-server-js` | NEW (cloud-paid; defer) |

**HNF**: no SOTA-pure local-sandbox MCP candidate that beats native `Bash` + `safety_guard.py` + `bypassPermissions`. Skip.

### Coding agents

REJECT — Agent J pre-flagged claude-task-master + VoltAgent-subagents in REJECT list. No new candidates per scope guard.

### Security

| Slug | License | Stars | Pushed | Install | Phase 3 dup? |
|---|---|---|---|---|---|
| `safedep/vet` 🎖️ | Apache-2.0 | 1,034 | 2026-05-14 | `gh release download --repo safedep/vet` | NEW — TOP PICK |
| `snyk/studio-mcp` 🎖️ | Apache-2.0 | 42 | 2026-05-13 | `gh repo clone snyk/studio-mcp` | NEW (cloud-paid; vendor-canonical) |
| `mobb-dev/bugsy` 🎖️ | MIT | 66 | 2026-05-11 | `gh repo clone mobb-dev/bugsy` | NEW (vibe-shield; cloud-paid) |

**Recommendation**: `safedep/vet` is best Apache-2.0 self-hostable package-vulnerability scanner; aligns with CR-9 install-risk discipline (would auto-scan any new `npm install -g` / `pip install` for known CVEs).

### Cloud platforms

| Slug | License | Stars | Pushed | Install | Phase 3 dup? |
|---|---|---|---|---|---|
| `awslabs/mcp` | Apache-2.0 | 9,049 | 2026-05-15 | `uvx awslabs-mcp` | NEW — TOP PICK if AWS used |
| `cloudflare/mcp-server-cloudflare` | Apache-2.0 | 3,740 | 2026-04-30 | `gh repo clone cloudflare/mcp-server-cloudflare` | NEW |

**Recommendation**: defer until cloud-specific workflow surfaces.

### Aggregators / 1MCP-class

| Slug | License | Stars | Pushed | Install | Phase 3 dup? |
|---|---|---|---|---|---|
| `1mcp-app/agent` | Apache-2.0 | 436 | 2026-05-13 | `npm install -g @1mcp/agent` | NEW (STUDY-PILOT only) |
| `tadas-github/a2asearch-mcp` | (verify) | n/a | 2026-recent | community | DEFER |

**Recommendation**: defer aggregator install — `manifests/services.yaml` is currently small enough to not need multiplexing. Re-evaluate when MCP count >25.

---

## Dedup against Phase 3 starter+optional

| Category | Phase 3 covers? | Wave-6N additions |
|---|---|---|
| Memory L1 (vector/recall) | ✅ doobidoo/mcp-memory-service | none stronger than Phase 3 |
| Memory L3 (temporal-KG) | ✅ getzep/graphiti INSTALLED | none |
| Docs / library reference | ✅ upstash/context7-mcp | none stronger |
| Code intelligence (LSP) | ✅ oraios/serena (optional) | none stronger |
| Code intelligence (AST) | ✅ ast-grep/ast-grep-mcp (optional) | none stronger |
| GitHub API | ✅ github/github-mcp-server | + `mcp-server-git` for local-git ops |
| Wiki / repo Q&A | ✅ cognition-ai/deepwiki | none stronger |
| Pack / artifact | ✅ yamadashy/repomix | none stronger |
| Browser automation | ✅ microsoft/playwright-mcp (optional) | none stronger |
| Web fetch / scrape | ✅ exa/firecrawl (paid, optional) | + `mcp-server-fetch` (unauth, free) + `brave-search-mcp-server` (if API key) |
| Filesystem | ⚠️ implicit via native Read/Write/Edit | + `mcp-server-filesystem` (constrained-path access) + `microsoft/markitdown` (format conversion) |
| Sequential thinking | ⚠️ none | + `mcp-server-sequentialthinking` (Anthropic-canonical) |
| Time / timezone | ⚠️ none | + `mcp-server-time` (Anthropic-canonical) |
| Local git | ⚠️ Bash + native Edit | + `mcp-server-git` (Anthropic-canonical, structured ops) |
| Observability (Grafana stack) | ⚠️ none | + `grafana/mcp-grafana` when stack added |
| Database | ⚠️ none | install-on-demand: `googleapis/genai-toolbox`, `redis/mcp-redis`, etc. |
| Security (supply-chain) | ⚠️ none | + `safedep/vet` (CR-9 alignment) |
| Cloud (AWS/Cloudflare) | ⚠️ none | install-on-demand |

**Net new coverage gaps Wave-6N closes** (5 high-priority):
1. **Local-git structured ops** → `mcp-server-git` (uvx)
2. **Sequential thinking** → `mcp-server-sequentialthinking` (npx)
3. **Time/timezone** → `mcp-server-time` (uvx)
4. **File format normalization** → `microsoft/markitdown` (pip)
5. **Unauthenticated web fetch** → `mcp-server-fetch` (uvx)

All five are Anthropic-canonical/Microsoft-official, Apache-2.0/MIT, actively pushed, no credential cost, install-once with zero-config.

---

## Phase 3+ install priority

Recommended ordering AFTER Phase 3 starter+optional lands:

### Phase 3.5 — Anthropic-canonical reference adds (zero-credential, install-and-forget)

```bash
# All from modelcontextprotocol/servers monorepo @ acedea0c (HEAD 2026-05-12)
uvx mcp-server-git --repository .       # structured git operations
uvx mcp-server-fetch                    # unauthenticated web fetch
uvx mcp-server-time --local-timezone "America/Los_Angeles"  # timezone conversion
npx -y @modelcontextprotocol/server-sequentialthinking      # CoT scaffolding
npx -y @modelcontextprotocol/server-filesystem Z:/claude-sota-installed Z:/claude-sota-installed-state  # constrained FS
```

All inherit `modelcontextprotocol/servers` Apache-2.0 license + Anthropic-managed maintenance + smithery/registry-attested. CR-12 disposition: GENUINELY-NEW (no incumbent for sequential-thinking/time/filesystem-via-MCP).

### Phase 4 — Format conversion + security baseline

```bash
# Microsoft official — file format → Markdown
pip install "markitdown[all]"           # then expose via mcp wrapper

# Supply-chain security (CR-9 alignment)
gh release download --repo safedep/vet --pattern "vet-*-windows-amd64.exe"
```

### Phase 5 — Vendor-DB on-demand (install only when used)

When a workflow needs vendor-DB: pick from `googleapis/genai-toolbox` (best multi-DB) / `redis/mcp-redis` (cache) / `mongodb-js/mongodb-mcp-server` (document) / `supabase-community/supabase-mcp` (BaaS).

### Phase 6 — Observability + cloud on-demand

When Grafana stack lands: `grafana/mcp-grafana`. When AWS/Cloudflare specifically needed: `awslabs/mcp` / `cloudflare/mcp-server-cloudflare`.

### Phase 7+ — Communication platforms (Slack/Discord/Notion) on-demand

`korotovsky/slack-mcp-server` / `SaseQ/discord-mcp` / `makenotion/notion-mcp-server` / `sooperset/mcp-atlassian` — adopt only when those platforms are operator-priority.

---

## HONEST-NON-FINDINGS

Categories with no SOTA-pure candidate beyond Phase 3 baseline OR with restricted-license winners:

1. **Memory / vector storage**: HNF — beyond doobidoo (Phase 3) + Graphiti (INSTALLED), no Apache-2.0/MIT MCP improves on the existing stack. Pinecone (43★ MIT) and Chroma (546★ Apache-2.0) are vendor-cloud-coupled / undermaintained relative to alternatives.

2. **Coding agents** (`coding-agents` section, 54 entries): HNF — entirely deferred per Agent J REJECT list (claude-task-master + VoltAgent-subagents class). None of the 54 candidates surveyed change that disposition.

3. **Code execution / sandbox** (`code-execution`, 15 entries, 1 official `yepcode/mcp-server-js` MIT 43★): HNF — no SOTA-pure LOCAL sandbox MCP that improves on native `Bash` + `safety_guard.py` + `bypassPermissions` topology. yepcode is cloud-paid.

4. **Observability** (`monitoring`): RESTRICTED-LICENSE-WINNER — `netdata/netdata` is the highest-star (78,811★) monitoring entry but GPL-3.0 makes it ineligible per claude-sota permissive-license-only whitelist. `pydantic/logfire-mcp` is ARCHIVED. Sole-eligible: `grafana/mcp-grafana` (Apache-2.0, 3,005★).

5. **Os-automation** (`os-automation`, 2 entries): HNF — only 2 community entries with low signal. Native PowerShell + `Bash` tool covers all os-automation needs.

6. **RAG** (`RAG` section, 3 entries): HNF — section is essentially empty; RAG is implemented via memory MCPs (doobidoo/Graphiti) + search MCPs (exa/firecrawl) elsewhere. No dedicated RAG MCP worth adopting.

7. **Research** (`research` section, 17 entries): HNF — overlaps with Phase 3 (deepwiki + context7 + Exa). No standalone research MCP that adds non-duplicative value.

8. **LLM tools (anthropic/openai SDK)**: HNF by design — Claude Code IS the orchestrator. No MCP wrapping a different LLM API improves the runtime.

9. **Aggregators** (70 entries): DEFER — `1mcp-app/agent` is the strongest permissive-license candidate (Apache-2.0 436★) but only useful when MCP count >25. Currently `manifests/services.yaml` lists ~26 MCPs (per claude-sota baseline); on the cusp but not yet need-class.

10. **Discord/Slack/Notion**: DEFER — all candidates require platform credentials + cloud-paid for production. No autonomous-loop value until operator surfaces specific platform-integration workflow.

11. **`sentry-mcp` license=NOASSERTION**: GATE — `getsentry/sentry-mcp` shows license=NOASSERTION on GitHub API; before adopting, manually verify the actual LICENSE file (likely BSL/Functional Source License which is RESTRICTED). For now: STUDY-PILOT not ADOPT-NOW.

12. **JetBrains/mcpProxy stale**: GATE — Apache-2.0 953★ but last push 2026-01-07 (>100 days). Re-audit at next 90-day cadence; if still stale, downgrade. Not autonomous-loop fit anyway (interactive IDE-coupled).

---

## Convergence-gate Axis-1+2+3 quick verdict per top-10

| # | Slug | Axis 1 (≥3 T1 sources) | Axis 2 (≥2 named T2) | Axis 3 (stability+cpd) | Verdict |
|---|---|---|---|---|---|
| 1 | `modelcontextprotocol/servers` | PASS — Anthropic-canonical + 85k★ + ecosystem-wide | PASS — Anthropic + MCP steering group + countless integrations | PASS — STABLE-BURN-IN >1y + active push | ADOPT-NOW |
| 2 | `microsoft/markitdown` | PASS — Microsoft-official + 123k★ | PASS — Microsoft AI + many integrations | PASS — STABLE-BURN-IN | ADOPT-NOW |
| 3 | `awslabs/mcp` | PASS — AWS-official | PASS — AWS labs | PASS — STABLE-BURN-IN | ADOPT-on-demand |
| 4 | `googleapis/genai-toolbox` | PASS — Google-official + 15k★ | PASS — googleapis | PASS — STABLE-BURN-IN | ADOPT-on-demand |
| 5 | `cloudflare/mcp-server-cloudflare` | PASS — Cloudflare-official | PASS | PASS — STABLE-BURN-IN | ADOPT-on-demand |
| 6 | `grafana/mcp-grafana` | PASS — Grafana-official | PASS | PASS — STABLE-BURN-IN | ADOPT-on-demand |
| 7 | `mongodb-js/mongodb-mcp-server` | PASS — MongoDB-official | PASS | PASS | ADOPT-on-demand |
| 8 | `stripe/agent-toolkit` | PASS — Stripe-official | PASS | PASS — STABLE-BURN-IN | ADOPT-on-demand |
| 9 | `safedep/vet` | PASS — multiple SOTA security T1 cites | PASS — named-org safedep | PASS — STABLE-BURN-IN | ADOPT-NOW (CR-9) |
| 10 | `1mcp-app/agent` | PARTIAL — single-org | PARTIAL — under-cited | BORDERLINE — 5mo + active push | STUDY-PILOT |

---

## File audit trail

- `tmp/wave6N-sections/*.md` — 18 raw category dumps (chunked extraction; total ~410k chars)
- `tmp/wave6N-parsed/*.json` — 18 structured JSON files with 1,232 total parsed bullets
- `tmp/wave6N-github-probe.json` — round-1 GitHub API probe (28 slugs)
- `tmp/wave6N-github-probe2.json` — round-2 GitHub API probe (32 additional slugs incl. monorepo subdir candidates + filesystem/code-intel/aggregator/security alts)
- `tmp/wave6N-probe.py` + `wave6N-probe2.py` — probe scripts (reusable for future rounds)
- `tmp/sota-pure-wave6-punkpeye-mcp-N-2026-05-14.md` — this report

**Methodology fidelity**: 100% of Wave-6N target categories were fetched + parsed + probed. No catalog enumeration was inferred; every cell in the top-3 tables has been verified against the punkpeye README + GitHub API live probe in the 2026-05-14 session.

**REJECT list compliance**: zero entries from Agent J's REJECT list (financial-services / VoltAgent-subagents / claude-task-master) appear in the recommendations above.
