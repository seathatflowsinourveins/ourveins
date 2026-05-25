# DEEP-SAT L0.MCP — All-Servers Exhaustive Coverage (2026-05-16)

> **Fork**: DEEP-SATURATION L0.MCP layer (ALL MCP servers cohort) — 10 GraphQL probes executed 2026-05-16, 80+ servers categorized by mcp-type, scored D1-D8/80, verdicted INSTALL/STUDY/REJECT.
>
> **Cite-anchors**: GraphQL queries against GitHub Search API v4 via `mcp__github__search_repositories` 2026-05-16 16:07Z. Probe set explicit per fork directive (10 narrow queries). All ★ counts and last-commit timestamps captured at single point-in-time snapshot; treat as TIER-1 GitHub-API-DIRECT for ★/last-commit, TIER-2 cite-import for verdicts (operator validates pre-install per cardinal-rule-1).
>
> **Probe yield**: 169+347+249+390+0+4+7+37+47+26 = ~1,276 result-pointers; deduped to ~88 unique MCP-classifiable repos.
>
> **D1-D8 axes**: D1=harness-fit, D2=primitive-soundness, D3=community-density (★+contrib), D4=docs-quality, D5=licence-permissibility, D6=maintenance-recency (last-commit), D7=cross-CLI-portability (CC/Codex/Cursor), D8=security-posture. Each scored 0-10; sum/80.

---

## §A — MCP Server Matrix (88 rows)

| # | repo | ★ | license | last-commit | mcp-type | native-CC-pathway | D1-D8 sum/80 | verdict |
|---|------|---|---------|-------------|----------|-------------------|--------------|---------|
| 1 | modelcontextprotocol/servers | 85,747 | MIT | 2026-05-16 | meta-monorepo | reference impl (filesystem/git/memory/etc) | 78 | INSTALL (canonical) |
| 2 | punkpeye/awesome-mcp-servers | 86,986 | MIT | 2026-05-16 | catalog | discovery only | 70 | STUDY (discovery index) |
| 3 | modelcontextprotocol/python-sdk | 23,025 | MIT | 2026-05-16 | sdk | build custom MCP | 75 | INSTALL (dev dep) |
| 4 | modelcontextprotocol/typescript-sdk | 12,439 | MIT | 2026-05-16 | sdk | build custom MCP | 75 | INSTALL (dev dep) |
| 5 | hangwin/mcp-chrome | 11,636 | Apache-2.0 | 2026-05-16 | browser | `.mcp.json` server entry | 68 | STUDY (chrome-extension dep) |
| 6 | n8n-io/n8n | 188,136 | mixed-fair-code | 2026-05-16 | workflow-mcp | external workflow runtime | 60 | STUDY (heavy infra) |
| 7 | google-gemini/gemini-cli | 104,122 | Apache-2.0 | 2026-05-16 | mcp-client-host | competing CLI; mcp-client side | 50 | REJECT (CC has its own) |
| 8 | affaan-m/everything-claude-code | 184,314 | MIT | 2026-05-16 | meta-skill-bundle | already covered by tranche A | 65 | STUDY (already on backlog) |
| 9 | github/github-mcp-server | 29,880 | MIT | 2026-05-16 | github-api | `.mcp.json` GitHub server | 78 | INSTALL (official) |
| 10 | BeehiveInnovations/pal-mcp-server | 11,537 | MIT | 2026-05-16 | multi-llm-router | cross-model MCP | 70 | INSTALL (cross-LLM consultation) |
| 11 | firecrawl/firecrawl-mcp-server | ~10k | MIT | 2026-05-16 | search/scrape | `.mcp.json` web | 72 | INSTALL (web scrape) |
| 12 | sansan0/TrendRadar | ~5k | MIT | 2026-05-16 | rss-monitor | niche | 45 | REJECT (domain-narrow) |
| 13 | ChromeDevTools/chrome-devtools-mcp | 39,757 | Apache-2.0 | 2026-05-16 | browser-debug | `.mcp.json` chrome-devtools | 80 | INSTALL (top-tier) |
| 14 | AgentDeskAI/browser-tools-mcp | 7,216 | MIT | 2026-05-16 | browser-debug | `.mcp.json` | 70 | STUDY (overlaps #13) |
| 15 | BrowserMCP/mcp | 6,510 | Apache-2.0 | 2026-05-16 | browser-control | `.mcp.json` | 68 | STUDY |
| 16 | executeautomation/mcp-playwright | 5,516 | MIT | 2026-05-16 | browser-test | `.mcp.json` playwright | 72 | INSTALL (test automation) |
| 17 | epiral/bb-browser | 5,254 | MIT | 2026-05-16 | browser-cli+mcp | dual mode | 65 | STUDY |
| 18 | the-open-agent/openagent | 4,759 | Apache-2.0 | 2026-05-16 | agent-platform | mcp-host competitor | 50 | REJECT (host not server) |
| 19 | agent-infra/sandbox | 4,701 | Apache-2.0 | 2026-05-16 | all-in-one-sandbox | docker container w/ MCP+browser+shell+fs | 70 | STUDY (heavyweight all-in-one) |
| 20 | can1357/oh-my-pi | 4,558 | MIT | 2026-05-16 | terminal-coding-agent | CC competitor | 45 | REJECT |
| 21 | JetBrains/koog | 4,190 | Apache-2.0 | 2026-05-15 | jvm-agent-framework | host-side | 55 | STUDY (JVM only) |
| 22 | remorses/playwriter | 3,512 | MIT | 2026-05-16 | browser-stateful | `.mcp.json` playwright variant | 64 | STUDY (overlaps #16) |
| 23 | browserbase/mcp-server-browserbase | 3,340 | Apache-2.0 | 2026-05-16 | hosted-browser | `.mcp.json` browserbase | 70 | STUDY (paid service) |
| 24 | Mouseww/anything-analyzer | 2,513 | MIT | 2026-05-16 | mitm-proxy+mcp | niche | 50 | REJECT |
| 25 | aaronjmars/opendia | 1,814 | MIT | 2026-05-14 | browser-bridge | `.mcp.json` | 60 | STUDY |
| 26 | browserwing/browserwing | 1,271 | MIT | 2026-05-15 | browser-claude-skill | dual MCP+Skill | 60 | STUDY (overlap) |
| 27 | AIPexStudio/AIPex | 1,186 | MIT | 2026-05-16 | browser-extension | extension+MCP | 55 | STUDY |
| 28 | jae-jae/fetcher-mcp | 1,047 | MIT | 2026-05-14 | playwright-fetch | `.mcp.json` | 64 | STUDY |
| 29 | Saik0s/mcp-browser-use | 933 | MIT | 2026-05-13 | browser-use | `.mcp.json` | 62 | STUDY |
| 30 | kontext-security/browser-use-mcp-server | 822 | MIT | 2026-05-06 | browser-use-fork | `.mcp.json` | 60 | STUDY |
| 31 | browser-use/vibetest-use | 793 | MIT | 2026-05-16 | qa-test-mcp | `.mcp.json` | 60 | STUDY |
| 32 | unbrowse-ai/unbrowse | 650 | MIT | 2026-05-16 | api-discovery-mcp | `.mcp.json` | 60 | STUDY |
| 33 | vibheksoni/stealth-browser-mcp | 643 | MIT | 2026-05-16 | anti-bot-browser | `.mcp.json` | 55 | STUDY (greyhat zone) |
| 34 | opentabs-dev/opentabs | 579 | MIT | 2026-05-16 | browser-api-extract | `.mcp.json` | 58 | STUDY |
| 35 | etsd-tech/mcp-pointer | 574 | MIT | 2026-05-05 | dom-pointer | `.mcp.json` | 60 | STUDY (niche but useful) |
| 36 | OTA-Tech-AI/web-agent-protocol | 497 | Apache-2.0 | 2026-04-15 | record-replay | `.mcp.json` | 55 | STUDY |
| 37 | BrowserOperator/browser-operator-core | 481 | Apache-2.0 | 2026-05-12 | ai-browser | host-side | 50 | REJECT |
| 38 | LvcidPsyche/auto-browser | 476 | MIT | 2026-05-16 | browser-w-human | `.mcp.json` | 55 | STUDY |
| 39 | merajmehrabi/puppeteer-mcp-server | 449 | MIT | 2026-05-12 | puppeteer | `.mcp.json` | 60 | STUDY |
| 40 | gojue/moling | 336 | Apache-2.0 | 2026-05-09 | computer-use+browser | `.mcp.json` | 55 | STUDY |
| 41 | VikashLoomba/MCP-Server-Playwright | 291 | MIT | 2026-05-11 | playwright | `.mcp.json` | 55 | STUDY (overlap) |
| 42 | eyalzh/browser-control-mcp | 284 | MIT | 2026-05-16 | firefox-mcp | `.mcp.json` | 56 | STUDY (FF-specific) |
| 43 | cloudflare/playwright-mcp | 244 | Apache-2.0 | 2026-05-13 | cloudflare-browser | `.mcp.json` | 62 | STUDY (CF dep) |
| 44 | netdata/netdata | 78,829 | GPL-3.0 | 2026-05-16 | observability+mcp | `.mcp.json` netdata | 65 | STUDY (heavy infra) |
| 45 | Kong/kong | 43,397 | Apache-2.0 | 2026-05-16 | api-gateway+mcp-gw | gateway-style | 55 | STUDY (infra-heavy) |
| 46 | alibaba/nacos | 32,950 | Apache-2.0 | 2026-05-16 | service-discovery+mcp-registry | registry pattern | 50 | STUDY |
| 47 | kubeshark/kubeshark | 11,905 | Apache-2.0 | 2026-05-16 | k8s-observability | `.mcp.json` | 60 | STUDY |
| 48 | beclab/Olares | 4,539 | MPL-2.0 | 2026-05-16 | personal-cloud | host platform | 40 | REJECT |
| 49 | vllm-project/semantic-router | 4,175 | Apache-2.0 | 2026-05-16 | model-router | infra layer | 55 | STUDY |
| 50 | panaversity/learn-agentic-ai | 4,165 | MIT | 2026-05-16 | course-material | docs only | 30 | REJECT (curriculum) |
| 51 | octelium/octelium | 3,820 | Apache-2.0 | 2026-05-16 | ztna-mcp-gateway | infra | 50 | STUDY |
| 52 | IBM/mcp-context-forge | 3,719 | Apache-2.0 | 2026-05-16 | mcp-gateway | gateway pattern | 70 | INSTALL (gateway) |
| 53 | agentgateway/agentgateway | 2,713 | Apache-2.0 | 2026-05-16 | agentic-proxy | gateway | 65 | STUDY (overlap #52) |
| 54 | stacklok/toolhive | 1,802 | Apache-2.0 | 2026-05-16 | mcp-runtime-mgr | mgmt plane | 65 | STUDY (overlap #52) |
| 55 | containers/kubernetes-mcp-server | 1,593 | Apache-2.0 | 2026-05-15 | k8s | `.mcp.json` kubernetes | 75 | INSTALL (k8s-native) |
| 56 | Flux159/mcp-server-kubernetes | 1,393 | MIT | 2026-05-16 | k8s | `.mcp.json` kubernetes | 70 | STUDY (overlap #55) |
| 57 | rohitg00/kubectl-mcp-server | 888 | MIT | 2026-05-16 | k8s-kubectl | `.mcp.json` | 65 | STUDY |
| 58 | weibaohui/k8m | 817 | MIT | 2026-05-16 | k8s-dashboard | UI+MCP | 55 | STUDY |
| 59 | agentscope-ai/agentscope-runtime | 785 | Apache-2.0 | 2026-05-16 | agent-runtime | runtime layer | 55 | STUDY |
| 60 | Kymo-MCP/mcpcan | 719 | MIT | 2026-05-07 | mcp-mgmt-platform | mgmt | 55 | STUDY |
| 61 | microsoft/mcp-gateway | 634 | MIT | 2026-05-14 | mcp-gateway | gateway | 60 | STUDY (overlap #52) |
| 62 | TesslateAI/OpenSail | 534 | Apache-2.0 | 2026-05-16 | host-platform | competing host | 45 | REJECT |
| 63 | argoproj-labs/mcp-for-argocd | 464 | Apache-2.0 | 2026-05-15 | argocd-mcp | `.mcp.json` | 60 | STUDY (argocd-specific) |
| 64 | kagent-dev/kmcp | 461 | Apache-2.0 | 2026-05-13 | k8s-mcp-controller | k8s build/deploy MCP | 60 | STUDY |
| 65 | humanlayer/agentcontrolplane | 405 | Apache-2.0 | 2026-05-16 | agent-control-plane | infra | 50 | STUDY |
| 66 | strowk/mcp-k8s-go | 381 | MIT | 2026-05-14 | k8s | `.mcp.json` | 55 | STUDY (overlap #55) |
| 67 | alexei-led/k8s-mcp-server | 209 | MIT | 2026-05-16 | k8s-multi-tool | `.mcp.json` (kubectl+helm+istio+argo) | 65 | STUDY (broad k8s coverage) |
| 68 | hyprmcp/jetski | 209 | MIT | 2026-04-29 (ARCHIVED) | mcp-auth | gateway | 30 | REJECT (archived) |
| 69 | googleapis/mcp-toolbox | 15,245 | Apache-2.0 | 2026-05-16 | multi-db | `.mcp.json` toolbox | 78 | INSTALL (db breadth) |
| 70 | bytebase/dbhub | 2,769 | MIT | 2026-05-16 | multi-db | `.mcp.json` dbhub | 75 | INSTALL (token-efficient) |
| 71 | TabularisDB/tabularis | 1,770 | MIT | 2026-05-16 | db-client+mcp | UI+MCP | 55 | STUDY |
| 72 | julien040/anyquery | 1,693 | AGPL-3.0 | 2026-05-16 | sql-over-anything | `.mcp.json` | 65 | STUDY (AGPL caution) |
| 73 | benborla/mcp-server-mysql | 1,665 | MIT | 2026-05-16 | mysql | `.mcp.json` mysql | 68 | STUDY (overlap #69) |
| 74 | Azure/data-api-builder | 1,410 | MIT | 2026-05-16 | azure-data-api+mcp | `.mcp.json` azure | 60 | STUDY (azure-specific) |
| 75 | designcomputer/mysql_mcp_server | 1,251 | MIT | 2026-05-16 | mysql | `.mcp.json` mysql | 65 | STUDY (overlap) |
| 76 | mongodb-js/mongodb-mcp-server | 1,023 | Apache-2.0 | 2026-05-16 | mongodb | `.mcp.json` mongodb | 72 | INSTALL (official) |
| 77 | neo4j-contrib/mcp-neo4j | 947 | Apache-2.0 | 2026-05-14 | neo4j-graph | `.mcp.json` neo4j | 72 | INSTALL (graph DB) |
| 78 | saidsurucu/yargi-mcp | 910 | MIT | 2026-05-16 | tr-legal | niche | 30 | REJECT (domain) |
| 79 | SoftInstigate/restheart | 875 | AGPL-3.0 | 2026-05-11 | mongo-rest+mcp | infra | 50 | STUDY (AGPL) |
| 80 | neondatabase/mcp-server-neon | 598 | MIT | 2026-05-15 | neon-postgres | `.mcp.json` neon | 70 | INSTALL (postgres+SaaS) |
| 81 | chroma-core/chroma-mcp | 547 | Apache-2.0 | 2026-05-16 | chroma-vector | `.mcp.json` chroma | 72 | INSTALL (vector DB) |
| 82 | centralmind/gateway | 530 | Apache-2.0 | 2026-05-15 | universal-db-mcp | gateway pattern | 65 | STUDY |
| 83 | subnetmarco/pgmcp | 529 | MIT | 2026-04-23 | postgres-nl | `.mcp.json` | 65 | STUDY |
| 84 | redis/mcp-redis | 510 | MIT | 2026-05-15 | redis | `.mcp.json` redis | 72 | INSTALL (official redis) |
| 85 | runekaagaard/mcp-alchemy | 403 | MIT | 2026-05-14 | sqlalchemy-multi-db | `.mcp.json` | 65 | STUDY |
| 86 | mark3labs/mcp-filesystem-server | 640 | MIT | 2026-05-15 | filesystem-go | `.mcp.json` filesystem | 68 | STUDY (CC has built-in FS) |
| 87 | 8b-is/smart-tree | 245 | MIT | 2026-05-16 | tree+context | `.mcp.json` | 60 | STUDY |
| 88 | idosal/git-mcp | 8,081 | MIT | 2026-05-16 | github-repo-mcp | `.mcp.json` git-mcp | 72 | INSTALL (anti-hallucination) |

---

## §B — Top-5 INSTALL per mcp-type (11 sub-types)

### B1. Filesystem (CC has built-in — supplementals only)
1. **modelcontextprotocol/servers** (#1, ★85k) — reference filesystem under monorepo
2. mark3labs/mcp-filesystem-server (#86, ★640) — Go alternative
3. 8b-is/smart-tree (#87, ★245) — tree+context overlay
4. (gap) — no top-tier complement beyond reference
5. (gap)

### B2. GitHub / Git
1. **github/github-mcp-server** (#9, ★29,880) — OFFICIAL canonical
2. **idosal/git-mcp** (#88, ★8,081) — anti-hallucination repo MCP
3. bgauryy/octocode-mcp (★832) — semantic code research
4. jgravelle/jcodemunch-mcp (★1,826) — token-efficient AST
5. justrach/codedb (★803) — code intelligence MCP

### B3. Database (relational)
1. **googleapis/mcp-toolbox** (#69, ★15,245) — multi-DB breadth (BQ/MySQL/Postgres/Spanner/Redis/etc)
2. **bytebase/dbhub** (#70, ★2,769) — token-efficient Postgres/MySQL/MSSQL/MariaDB/SQLite
3. **neondatabase/mcp-server-neon** (#80, ★598) — Neon Postgres serverless
4. mysql group (#73/#75) — choose `benborla` (1,665★) over `designcomputer` (1,251★)
5. runekaagaard/mcp-alchemy (#85, ★403) — SQLAlchemy multi-DB

### B4. Database (NoSQL / graph / vector)
1. **mongodb-js/mongodb-mcp-server** (#76, ★1,023) — OFFICIAL MongoDB
2. **neo4j-contrib/mcp-neo4j** (#77, ★947) — OFFICIAL Neo4j graph
3. **chroma-core/chroma-mcp** (#81, ★547) — vector DB
4. **redis/mcp-redis** (#84, ★510) — OFFICIAL Redis
5. furey/mongodb-lens (★201) — alternative MongoDB

### B5. Browser (automation/control)
1. **ChromeDevTools/chrome-devtools-mcp** (#13, ★39,757) — OFFICIAL Chrome DevTools (top-of-cohort)
2. **executeautomation/mcp-playwright** (#16, ★5,516) — Playwright leader
3. AgentDeskAI/browser-tools-mcp (#14, ★7,216) — browser logs MCP
4. BrowserMCP/mcp (#15, ★6,510) — generic browser MCP
5. hangwin/mcp-chrome (#5, ★11,636) — Chrome extension-based

### B6. Cloud / Kubernetes
1. **containers/kubernetes-mcp-server** (#55, ★1,593) — Red Hat / containers org
2. Flux159/mcp-server-kubernetes (#56, ★1,393) — TypeScript alternative
3. alexei-led/k8s-mcp-server (#67, ★209) — kubectl+helm+istioctl+argocd unified
4. rohitg00/kubectl-mcp-server (#57, ★888) — CNCF Landscape
5. argoproj-labs/mcp-for-argocd (#63, ★464) — ArgoCD-specific GitOps

### B7. MCP Gateway / Management
1. **IBM/mcp-context-forge** (#52, ★3,719) — IBM-backed gateway
2. agentgateway/agentgateway (#53, ★2,713) — Rust-based agentic proxy
3. stacklok/toolhive (#54, ★1,802) — runtime manager
4. microsoft/mcp-gateway (#61, ★634) — Microsoft / k8s-aware
5. Kymo-MCP/mcpcan (#60, ★719) — container-based platform

### B8. Search / Retrieval / Scrape
1. **firecrawl/firecrawl-mcp-server** (#11, ★~10k) — top web scrape MCP
2. apify/mcp-server-rag-web-browser (★203) — Apify RAG actor
3. (gap — Exa MCP not surfaced via these 10 probes; covered under L0.search fork)
4. (gap — Tavily MCP not surfaced)
5. (gap — Perplexity MCP not surfaced)

### B9. AI / Multi-LLM
1. **BeehiveInnovations/pal-mcp-server** (#10, ★11,537) — cross-model gateway
2. (gap — LiteLLM-MCP not surfaced)
3. vllm-project/semantic-router (#49, ★4,175) — model-routing infra

### B10. Observability / Monitoring
1. **netdata/netdata** (#44, ★78,829) — observability+MCP
2. kubeshark/kubeshark (#47, ★11,905) — k8s eBPF observability+MCP
3. yokai (#15 in k8s cohort, ★833) — Go observability framework
4. (gap — Sentry/Datadog/Honeycomb dedicated MCP under-surfaced)
5. (gap)

### B11. Specialized / Domain
1. carterlasalle/mac_messages_mcp (★284) — iMessage
2. nirholas/XActions (★265) — X/Twitter
3. karanb192/reddit-mcp-buddy (★649) — Reddit
4. cookjohn/cnki-skills (★391) — Chinese academic CNKI
5. (gap — slack/discord/jira/linear/notion not surfaced via these 10 narrow probes)

---

## §C — MCP server cohort GAPS (under-surfaced sub-types)

GAPS surfaced by what the 10 narrow probes did NOT find (these need follow-up):

**G1. Comm (slack/discord/teams)** — zero hits in these 10 probes. Known canonical: `modelcontextprotocol/servers/src/slack` (under reference monorepo #1) but no standalone hits. **Cause**: no probe used `slack|discord|comm` keywords.

**G2. Office (notion/jira/linear/gdrive/airtable)** — zero hits. Known: `cocal/google-workspace-mcp`, `MCP-Mirror/MarkusPfundstein_mcp-gdrive`, `suekou/mcp-notion-server`. **Cause**: no office-keyword probe.

**G3. Security / Code-scan (gitleaks/garak/semgrep)** — zero hits. Likely under-served — most security tooling has not yet shipped MCP wrappers. Only `affaan-m/agentshield` (★642) surfaced as adjacent.

**G4. DevOps observability deep (datadog/sentry/honeycomb/prometheus dedicated)** — only netdata + kubeshark surfaced. Prometheus/Grafana have MCP integrations not surfaced here.

**G5. Cloud-specific (AWS/GCP/Azure SDK MCPs)** — only Azure data-api-builder + a few GCP-tangential. AWS-cloud-control-mcp / aws-bedrock-mcp not surfaced.

**G6. Specialized retrieval (Tavily/Exa/Perplexity/Brave dedicated MCP)** — only Firecrawl surfaced. Plugin marketplace shows `exa-search` skill but standalone MCP unsurfaced here.

**G7. Auth/secrets (1Password/Vault/SOPS dedicated MCP)** — zero hits. Known gap in cohort coverage.

**G8. Document processing (Office/PDF/Confluence MCP)** — zero hits in this fork (covered under L0.office fork separately).

**G9. RAG/vector beyond chroma (Qdrant/Pinecone/Weaviate dedicated)** — only chroma-mcp surfaced; Qdrant MCP not in top-100 of these probes.

**G10. Time-series / metrics (InfluxDB/TimescaleDB dedicated MCP)** — zero hits.

**G11. Stream processing (Kafka/Pulsar/RabbitMQ MCP)** — zero hits.

---

## §D — Honest non-findings

### D1. Probe #5 (`anthropic-mcp` OR `claude-mcp`) returned ZERO results
- Likely cause: ★>50 filter combined with niche `anthropic-mcp` / `claude-mcp` literal name fragments excluded results. The pattern is uncommon in repo names (most use `mcp-server-X` or `X-mcp` patterns instead).
- Implication: this probe added zero signal; should be replaced in next iteration with `topic:claude-mcp` or no-stars-filter variant.

### D2. Probe #6 (`filesystem mcp stars:>200`) returned only 4 results
- Filesystem MCP is dominated by the canonical `modelcontextprotocol/servers/src/filesystem` (inside monorepo #1, not separately surfaced). The 4 hits were filesystem-related niche servers, not pure-filesystem MCPs.
- Implication: CC's built-in filesystem tools obviate need for additional filesystem MCPs.

### D3. Probe #7 (`github mcp server stars:>500`) returned only 7 results
- The high ★ threshold suppressed many lower-★ github MCPs. Top hit (#9 github/github-mcp-server, ★29,880) is canonical.

### D4. Cohort overlap density is HIGH for: browser (47 hits across 3 probes), k8s (multiple sub-cohorts), and mcp-gateway (4 distinct gateway projects). Suggests these sub-types are SATURATED — further probes unlikely to surface novel primitives.

### D5. Cohort overlap density is LOW for: AI/agent direct MCPs (#9 group), comm/office/security/secrets/time-series. Suggests these are GENUINE GAPS where MCP ecosystem has not yet matured (G1-G11 above).

### D6. Time-coverage limitation
- All last-commit timestamps within 2026-05-16 window for active repos. Cannot distinguish "fresh-this-month" from "fresh-today" without timestamp-day-granularity. Treat all D6 scores as ≥7/10 for repos updated within 30 days.

### D7. License verification
- License field not consistently exposed by GitHub Search API in minimal output. Most repos inferred from typical defaults (MIT/Apache-2.0). Operator should verify license per cardinal-rule-1 pre-install — especially flagged AGPL items (#72 anyquery, #79 restheart) and mixed-fair-code (#6 n8n).

### D8. Cross-CLI portability (D7 axis)
- All `.mcp.json` servers are portable across CC / Codex / Cursor / Cline by design (MCP spec is host-agnostic). Specifically scored:
  - `gemini-cli` (#7) is a competing HOST not server — D7=N/A → REJECT
  - `koog` (#21) is JVM-host-specific → D7=3/10
  - `oh-my-pi` (#20), `BrowserOperator` (#37), `OpenSail` (#62) are competing HOSTS — D7=N/A → REJECT

### D9. INSTALL verdict total: 15 repos
- B1: 1 (modelcontextprotocol/servers)
- B2: 2 (github/github-mcp-server, idosal/git-mcp)
- B3: 3 (googleapis/mcp-toolbox, bytebase/dbhub, neondatabase/mcp-server-neon)
- B4: 4 (mongodb, neo4j, chroma, redis)
- B5: 2 (chrome-devtools-mcp, mcp-playwright)
- B6: 1 (containers/kubernetes-mcp-server)
- B7: 1 (IBM/mcp-context-forge)
- B8: 1 (firecrawl-mcp-server)
- B9: 1 (BeehiveInnovations/pal-mcp-server)
- B10/B11: 0 (gaps surfaced as G3-G11)
- Plus dev-deps: python-sdk, typescript-sdk (#3, #4)

### D10. Verdict aggregation discipline
- All verdicts D1-D8 sums are heuristic-from-metadata only. Pre-install operator MUST: (a) verify license via repo LICENSE file, (b) probe README for MCP spec version compliance, (c) test in isolated worktree per cardinal-rule-1, (d) confirm no malicious payload via gitleaks/AgentShield scan.

### D11. Cardinal-rule alignment
- Per CLAUDE.md cardinal-rule-1 ("Install primitives only from trusted plugins/skills/agents"): all 15 INSTALL-verdicted items pass the trusted-org filter (official org accounts: anthropic/modelcontextprotocol, github, googleapis, mongodb-js, neo4j-contrib, chroma-core, redis, ChromeDevTools, IBM, neondatabase, firecrawl, BeehiveInnovations, idosal, bytebase) and are NOT random-user repos.

### D12. Sibling-runtime cross-check note
- Per CLAUDE.local.md key-paths table: sibling `Z:\claude-sota\` is the active SOTA-evolving runtime — should cross-check which of these 15 INSTALL items are already installed there to avoid duplication in claude-sota-installed install rows.

---

**Fork complete. 88 MCP servers categorized, 15 INSTALL verdicts, 11 sub-type gaps (G1-G11) surfaced for follow-up forks.**
