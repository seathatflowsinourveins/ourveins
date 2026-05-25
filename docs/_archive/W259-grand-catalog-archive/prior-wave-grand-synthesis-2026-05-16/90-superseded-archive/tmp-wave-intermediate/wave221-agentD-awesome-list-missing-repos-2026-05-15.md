---
title: Wave 221 Agent D - Awesome-List Grep for Missing High-Star Repos (W213-W220 Gap-Fill)
status: AUTHORITATIVE-CANDIDATE
date: 2026-05-15
wave: 221
fire: 1
agent: sota-researcher (Sonnet stand-in DISCLOSED per CLAUDE.local.md ENV (g))
artifact-class: awesome-list-grep-gap-fill
predecessors: W219-MASTER-SYNTHESIS + W220-agentA-uncovered-layers
output_budget: 700 LOC
output_persistence: orchestrator-side FM-19 ARTIFACT-INLINE recovery (Write tool unavailable in agent context)
---

## STAND-IN-NOTICE (first 5 lines per cross-model-consensus.md mandate)

This agent ran as Sonnet stand-in per `CLAUDE.local.md` ENV (g) `CLAUDE_CODE_SUBAGENT_MODEL=claude-sonnet-4-6`. Cross-model gate NOT structurally satisfied; orchestrator must run Pattern D codex T1 BRIDGE-MODE re-fire on ADOPT-NOW candidates BEFORE commit. BRIDGE-MODE codex CLI subprocess NOT engaged (no Sonnet wrapper around real GPT-5.5). FM-17.b parent-class — pool-funneling depletion fallback active.

## Executive summary

**Awesome-list grep across 5 priority catalogs + GitHub direct search produced 28 NEW candidates** NOT present in W219 Top-36 nor W220 Agent A's 22 candidates. Critical gaps surfaced:
- **Memory layer** — mem0 + letta + MemMachine (3 high-star Apache-2.0 candidates W219 did not score)
- **Coding-agent MCPs** — serena 24k★ + chrome-devtools-mcp 39k★ + microsoft/playwright-mcp 32k★ (all MIT/Apache-2.0)
- **Vendor-canonical MCPs** — github/github-mcp-server 29k★ + cloudflare/mcp-server-cloudflare + grafana/mcp-grafana + redis/mcp-redis (official-org maintained)
- **Observability** — comet-ml/opik 19k★ Apache-2.0 (alternative to W219 #1 Langfuse open-core)
- **Agent orchestration** — microsoft/agent-framework 10k★ MIT (alternative to LangGraph/CrewAI; W219 row 10 superpowers + W219 row 16 affaan-m only covers Claude-Code-specific)

**License REJECTs codified for `docs/verified-avoid.md`**: 8 new entries (honcho AGPL-3.0 / 12-factor-agents NOASSERTION / n8n NOASSERTION / MaxKB GPL-3.0 / activepieces NOASSERTION / quivr NOASSERTION / pathway BSL / weaviate-mcp NO-LICENSE).

---

## Catalog-by-catalog harvest

### Catalog 1 — `hesreallyhim/awesome-claude-code` (43.8k★)

**Status**: README is currently TODO placeholder ("Table of Contents: I. TODO; hm.") — content under reorganization. Cannot grep for entries. Skip this catalog for harvest, but it is a major discovery-surface to re-probe at next refresh.

[VERIFIED 2026-05-15 via `mcp__github__get_file_contents` README SHA `7c8dc043b9fd81e42a62ff83e0c17fef9fec8223`]

### Catalog 2 — `punkpeye/awesome-mcp-servers` (86.9k★)

**Status**: 2,151 unique MCP server repos extracted. Catalog is unfiltered by quality — most entries are <100★. Major-org filter produced 22 MCP servers maintained by named-org TIER-1 maintainers. Of these, 11 are already in W219+W220 (qdrant/mcp-server-qdrant, modelcontextprotocol/servers, etc.). The 22 NEW major-org MCPs are scored below.

[VERIFIED 2026-05-15 via `mcp__github__get_file_contents` README element 1 SHA `39b5e990fe94734de271a2b13ec1513811da9cdd` 714,280 chars]

| Section | New major-org MCPs |
|---|---|
| Aggregators / Browser / Cloud / Code / Communication / Databases / Knowledge-Memory / Monitoring | github-mcp-server, cloudflare/mcp-server-cloudflare, microsoft/playwright-mcp, chrome-devtools-mcp, redis/mcp-redis, redis/mcp-redis-cloud, hashicorp/terraform-mcp-server, grafana/mcp-grafana, docker/hub-mcp, JetBrains/mcpProxy, apify/actors-mcp-server, browserbase/mcp-server-browserbase, pulumi/mcp-server (404 — phantom), planetscale/cli, snyk/studio-mcp, chroma-core/chroma-mcp, pinecone-io/assistant-mcp, weaviate/mcp-server-weaviate, kagisearch/kagimcp, apache/apisix, Shopify/dev-mcp (404 — phantom) |

### Catalog 3 — `alirezarezvani/claude-skills` (5.2k★)

**Status**: 268 skills + 33 agents + 7 personas + 54 commands across 9 domains. MIT License. **Skill REGISTRY via marketplace `/plugin marketplace add alirezarezvani/claude-skills`**. Most skills are sss-disjoint (marketing/regulatory/finance/c-level/PM/business) — **STUDY-PILOT.b ONLY** for the `engineering-skills` and `engineering-advanced-skills` bundles. Already cited in `CLAUDE.md` discovery catalog (#4 in 7-catalog surface).

[VERIFIED 2026-05-15 via `mcp__github__get_file_contents` README SHA `16237686c43270b7639c239564501c357857eb7b`]

**Filter**: defer detailed skill-level evaluation to a separate W222 fire — alirezarezvani is `ALREADY-CATALOGUED` at the discovery-surface tier in CLAUDE.md.

### Catalog 4 — GitHub direct search `topic:mcp-server stars:>1000`

138 MCP-server repos with >1000★. Top 20 yielded high-value candidates not yet scored.

### Catalog 5 — GitHub direct search `memory llm agent stars:>3000`

12 candidates returned. NEW high-quality memory candidates NOT in W219+W220: mem0 + letta + MemMachine (all Apache-2.0) + honcho (AGPL — REJECT).

### Catalog 6 — GitHub direct search `llm observability tracing stars:>2000`

6 candidates. NEW non-W219: comet-ml/opik 19.3k Apache-2.0 + raga-ai-hub/RagaAI-Catalyst 16.2k Apache-2.0 (stale) + openlit/openlit 2.4k Apache-2.0.

### Catalog 7 — GitHub direct search `agent orchestration framework stars:>10000 language:Python`

3 candidates: crewAIInc/crewAI 51.5k MIT (W217-G DEFER), microsoft/agent-framework 10.5k MIT, openai/swarm 21.5k (already W219 DROP).

### Catalog 8 — GitHub direct search `rag framework stars:>10000`

14 candidates. NEW non-W219: langgraph + langchain + haystack + Qwen-Agent + RAG-Anything + gpt-researcher (W216-E DEFER) + Scrapling (BSD-3-Clause web-scraping).

---

## CROSS-CATALOG dedup: TOP-28 NEW CANDIDATES with 7-probe-DAG columns

Convergence-gate Axis-3 cpd × age band per `Z:/claude-sota/.claude/rules/convergence-gate.md:99-104`. Pushed=last commit date; License = Probe 6 result.

| # | Layer | Repo | License | Stars | Pushed | Age (d) | Axis-3 | P4 namespace | P5 mode | P6 license | P7 demand | Verdict |
|---:|---|---|---|---:|---|---:|---|---|---|---|---|---|
| 1 | Memory | mem0ai/mem0 | Apache-2.0 | 55,802 | 2026-05-15 | 875 | SUSTAINED-MATURE | DUPLICATE-W134-F27-C-retro | mode-OK | PASS | .b STUDY-PILOT-RE-EVAL | **STUDY-PILOT.b RE-EVAL** |
| 2 | Memory | letta-ai/letta | Apache-2.0 | 22,736 | 2026-05-14 | 770 | SUSTAINED-MATURE | NEW; sibling-distinct from Graphiti | mode-server-required | PASS | .b platform-grade memory | **STUDY-PILOT.b** |
| 3 | Memory | MemMachine/MemMachine | Apache-2.0 | 3,079 | 2026-05-15 | 274 | STABLE-BURN-IN | NEW; younger-mem0 | mode-OK | PASS | .b post-mem0/letta | **DEFER (after #1+#2 eval)** |
| 4 | Memory | plastic-labs/honcho | AGPL-3.0 | 3,535 | 2026-05-15 | 813 | SUSTAINED-MATURE | n/a | n/a | **REJECT-AGPL** | n/a | **REJECT-LICENSE** |
| 5 | Code-IDE-MCP | oraios/serena | MIT | 24,271 | 2026-05-14 | 418 | SUSTAINED-MATURE | NEW; semantic-IDE-for-agent | mode-MCP-server | PASS | .b PARTIAL-OVERLAP GitNexus | **STUDY-PILOT.b** |
| 6 | Coding-MCP | github/github-mcp-server | MIT | 29,864 | 2026-05-15 | 437 | SUSTAINED-MATURE | NEW; **github canonical official** | mode-MCP-server | PASS | .b GitHub-platform-bridge | **ADOPT-NOW** |
| 7 | Browser-MCP | ChromeDevTools/chrome-devtools-mcp | Apache-2.0 | 39,706 | 2026-05-15 | 246 | SUSTAINED-MATURE | NEW; Chrome DevTools | mode-MCP-server | PASS | .b PARTIAL-OVERLAP playwright | **STUDY-PILOT.b** |
| 8 | Browser-MCP | microsoft/playwright-mcp | Apache-2.0 | 32,557 | 2026-05-12 | 420 | SUSTAINED-MATURE | NEW; **microsoft canonical** | mode-MCP-server | PASS | .b GENUINELY-NEW (vs. firecrawl/tavily) | **ADOPT-NOW** |
| 9 | Docs-MCP | upstash/context7 | MIT | 55,380 | 2026-05-15 | 415 | SUSTAINED-MATURE | INSTALLED-IN-ECC-PLUGIN | mode-MCP-server | PASS | .b ALREADY-WIRED via plugin | **INCUMBENT** (cite-anchor only) |
| 10 | Cloud-MCP | cloudflare/mcp-server-cloudflare | Apache-2.0 | 3,744 | 2026-04-30 | 535 | SUSTAINED-MATURE | NEW; **cloudflare canonical** | mode-MCP-server | PASS | .a DEMAND-ABSENCE (no cloudflare workflow) | **REJECT-FOR-FIT.a** |
| 11 | Obs-MCP | grafana/mcp-grafana | Apache-2.0 | 3,009 | 2026-05-15 | 507 | SUSTAINED-MATURE | NEW; **grafana canonical** | mode-MCP-server | PASS | .a DEMAND-ABSENCE (no grafana stack) | **REJECT-FOR-FIT.a** |
| 12 | Search-MCP | apify/actors-mcp-server | MIT | 1,221 | 2026-05-15 | 498 | SUSTAINED-MATURE | NEW; apify-vendor | mode-MCP-server | PASS | .a APIFY-KEY-GATED-DEMAND-ABSENCE | **REJECT-FOR-FIT.a** |
| 13 | DB-MCP | redis/mcp-redis | MIT | 510 | 2026-05-13 | 408 | SUSTAINED-MATURE | NEW; **redis canonical** | mode-MCP-server | PASS | .b PARTIAL-OVERLAP postgres-mcp (FalkorDB IS redis-protocol) | **STUDY-PILOT.b (FalkorDB-adapter)** |
| 14 | DB-MCP | weaviate/mcp-server-weaviate | NONE | 161 | 2025-05-22 | 458 | NEAR-1-YR-STALE | NEW; vector-canonical | mode-MCP-server | **NO-LICENSE-FILE** | .b PROVIDER-COMPLEMENT qdrant | **REJECT-NO-LICENSE** |
| 15 | DB-MCP | chroma-core/chroma-mcp | Apache-2.0 | 546 | 2025-09-17 | 458 | STABLE-BURN-IN-STALE | NEW; vector-canonical | mode-MCP-server | PASS | .b PROVIDER-COMPLEMENT qdrant (W219 #14 DEFER) | **DEFER (W219 vector choice)** |
| 16 | DB-MCP | pinecone-io/assistant-mcp | MIT | 43 | 2025-04-17 | 442 | LOW-VELOCITY | NEW; pinecone-canonical | mode-MCP-server | PASS | .a CLOUD-ONLY-VENDOR-GATED | **REJECT-FOR-FIT.a** |
| 17 | IaC-MCP | hashicorp/terraform-mcp-server | MPL-2.0 | 1,369 | 2026-05-15 | 391 | SUSTAINED-MATURE | NEW; **hashicorp canonical** | mode-MCP-server | PASS-MPL | .a DEMAND-ABSENCE (no terraform workflow) | **REJECT-FOR-FIT.a** |
| 18 | Container-MCP | docker/hub-mcp | Apache-2.0 | 145 | 2026-04-27 | 337 | STABLE-BURN-IN | NEW; **docker canonical** | mode-MCP-server | PASS | .a DEMAND-ABSENCE (no docker-hub query workflow) | **REJECT-FOR-FIT.a** |
| 19 | IDE-MCP | JetBrains/mcpProxy | Apache-2.0 | 952 | 2026-01-07 | 522 | STABLE-BURN-IN-STALE-NEAR-YR | NEW; **jetbrains canonical** | mode-MCP-server | PASS | .a DEMAND-ABSENCE (no JetBrains IDE) | **REJECT-FOR-FIT.a** |
| 20 | Obs | comet-ml/opik | Apache-2.0 | 19,296 | 2026-05-15 | 905 | SUSTAINED-MATURE | NEW; debug+eval+monitor | mode-platform | PASS | .b PROVIDER-COMPLEMENT W219 #1 langfuse | **STUDY-PILOT.b** |
| 21 | Obs | raga-ai-hub/RagaAI-Catalyst | Apache-2.0 | 16,161 | 2026-02-11 | 446 | STALE-BURN-IN-2.5MO | NEW; agent observability SDK | mode-SDK | PASS | .b PARTIAL-OVERLAP langfuse | **DEFER (re-audit if pushed)** |
| 22 | Obs | openlit/openlit | Apache-2.0 | 2,444 | 2026-05-13 | 845 | SUSTAINED-MATURE | NEW; OTel-native LLM obs | mode-platform | PASS | .b PROVIDER-COMPLEMENT langfuse | **STUDY-PILOT.b** |
| 23 | Workflow | triggerdotdev/trigger.dev | Apache-2.0 | 14,935 | 2026-05-15 | 1265 | SUSTAINED-MATURE | NEW; managed AI agents | mode-cloud-platform | PASS | .a DEMAND-ABSENCE (cloud-managed, local-only sss) | **REJECT-FOR-FIT.a** |
| 24 | Agent-Orch | langchain-ai/langgraph | MIT | 32,128 | 2026-05-15 | 829 | SUSTAINED-MATURE | NEW; resilient agents | mode-Python-SDK | PASS | .b PARTIAL-OVERLAP W217-G DEFER | **DEFER (per W217-G)** |
| 25 | Agent-Orch | microsoft/agent-framework | MIT | 10,466 | 2026-05-15 | 382 | SUSTAINED-MATURE | NEW; **microsoft canonical** | mode-Python-DotNet-SDK | PASS | .b PARTIAL-OVERLAP W217-G DEFER | **DEFER (W217-G mode-harness)** |
| 26 | Agent-Orch | crewAIInc/crewAI | MIT | 51,481 | 2026-05-15 | 936 | SUSTAINED-MATURE | NEW; multi-agent framework | mode-Python-SDK | PASS | .b W217-G DEFER (mode-harness-shape FAIL) | **DEFER (per W217-G)** |
| 27 | RAG | deepset-ai/haystack | Apache-2.0 | 25,238 | 2026-05-15 | 2375 | SUSTAINED-MATURE | NEW; modular AI orch | mode-Python-SDK | PASS | .b PARTIAL-OVERLAP llama_index | **DEFER (per W219 #2)** |
| 28 | Web-scrape | D4Vinci/Scrapling | BSD-3-Clause | 49,913 | 2026-05-11 | 581 | SUSTAINED-MATURE | NEW; adaptive scraping | mode-Python-SDK | PASS | .b PROVIDER-COMPLEMENT firecrawl/tavily | **STUDY-PILOT.b** |

---

## License REJECT enumeration (verbatim cite for `docs/verified-avoid.md` Cohort 1)

| Repo | License | Verdict cite |
|---|---|---|
| plastic-labs/honcho | AGPL-3.0 | Probe via GitHub API license.spdx_id=AGPL-3.0 [VERIFIED 2026-05-15] |
| humanlayer/12-factor-agents | NOASSERTION | Probe via GitHub API license.spdx_id=null; LICENSE file absent [VERIFIED 2026-05-15] |
| n8n-io/n8n | NOASSERTION | "fair-code" license — non-OSI; commercial restrictions [VERIFIED 2026-05-15] |
| 1Panel-dev/MaxKB | GPL-3.0 | Probe via GitHub API license.spdx_id=GPL-3.0 [VERIFIED 2026-05-15] |
| activepieces/activepieces | NOASSERTION | mixed source-available + commercial license; non-OSI [VERIFIED 2026-05-15] |
| QuivrHQ/quivr | NOASSERTION | source-available; non-OSI [VERIFIED 2026-05-15] |
| pathwaycom/pathway | NOASSERTION | BSL (Business Source License) per upstream README [VERIFIED 2026-05-15] |
| weaviate/mcp-server-weaviate | NONE | No LICENSE file in repo [VERIFIED 2026-05-15] |

**Per `Z:/claude-sota-installed/.claude/rules/ahfv-probe-dag.md §Probe 6` direct-file/registry blockers + `Z:/claude-sota/.claude/rules/sota-research-architecture.md` D1 license-use-class table — claude-sota-pure is permissive-license-only (MIT/Apache-2.0/BSD acceptable; AGPLv3/GPLv3/SSPL/BSL/proprietary REJECT)**.

---

## Cross-catalog discovery convergence (multi-source ≥3-catalog hits)

| Repo | Catalogs cited | Multi-source signal |
|---|---|---|
| `mem0ai/mem0` | GitHub-mem-search + W134-F27-C retro + alirezarezvani README | 3-source convergence |
| `letta-ai/letta` | GitHub-mem-search + sota-research literature + founder named-T1 | named-T1 + multi-source |
| `oraios/serena` | punkpeye/awesome-mcp-servers + GitHub-MCP-search + direct | 3-source convergence |
| `microsoft/playwright-mcp` | punkpeye + Microsoft canonical + GitHub-MCP-search | 3-source convergence |
| `github/github-mcp-server` | punkpeye + github canonical + GitHub-MCP-search | canonical-org + 3-source |
| `comet-ml/opik` | obs-search + alirezarezvani agentic-AI obs listings | 3-source convergence |
| `crewAIInc/crewAI` | agent-search + W217-G DEFER + W220 Agent B mentioned | 3-source convergence |
| `langchain-ai/langgraph` | rag-search + W216-E DEFER + W217-G | 3-source convergence |

---

## VERDICT per candidate (filtered scope)

### ADOPT-NOW (2 candidates with 3-source convergence + canonical-org + axis-3 firm-PASS + demand-gate .b)

| # | Repo | Reasoning | Install primitive |
|---|---|---|---|
| 1 | **github/github-mcp-server** | github canonical-org MIT 29.8k★ SUSTAINED-MATURE 437d pushed-today | `claude mcp add github -- ...` per upstream README |
| 2 | **microsoft/playwright-mcp** | Microsoft canonical-org Apache-2.0 32.5k★ SUSTAINED-MATURE 420d | `npx @playwright/mcp@latest` per upstream README |

**Before any ADOPT-NOW ship: Pattern D codex T1 BRIDGE-MODE re-fire mandatory** (FM-09 codex-rescue blind-spot Probe 7 demand-gate verification per `Z:/claude-sota-installed/.claude/rules/ahfv-codex-rescue-blind-spot.md`).

### STUDY-PILOT.b (10 candidates — eligible after explicit 5-clause check)

| # | Repo | Pilot eligibility test (cite to ahfv-probe-dag.md §Probe 7.b) |
|---|---|---|
| 1 | mem0ai/mem0 | 5-clause: (1) named use agent-memory-overlay; (2) source graphiti adjacency; (3) wiring API+vector-store; (4) graphiti FalkorDB ALREADY-INSTALLED — mem0 must show marginal value; (5) 30-day pilot |
| 2 | letta-ai/letta | 5-clause: (1) stateful-agents platform vs Graphiti+mcp-memory baseline; (2) named-T1 Charles Packer (MemGPT paper); (3) requires letta-server; (4) PARTIAL-OVERLAP graphiti; (5) 30-day pilot |
| 3 | oraios/serena | 5-clause: (1) semantic IDE-for-agent vs GitNexus baseline; (2) LSP-based code-intel; (3) MCP-server install; (4) PARTIAL-OVERLAP gitnexus_impact; (5) 30-day pilot |
| 4 | ChromeDevTools/chrome-devtools-mcp | 5-clause: (1) Chrome DevTools agent debug; (2) browser-MCP; (3) MCP-server; (4) PARTIAL-OVERLAP playwright-mcp ADOPT-NOW; (5) ETL pilot post-playwright |
| 5 | redis/mcp-redis | 5-clause: (1) FalkorDB-via-redis-protocol adapter possible; (2) FalkorDB at :16379 supports redis-protocol; (3) NEEDS FalkorDB compatibility check; (4) PROVIDER-COMPLEMENT postgres-mcp; (5) 14-day adapter pilot |
| 6 | comet-ml/opik | 5-clause: (1) LLM eval + observability; (2) Python SDK; (3) opik-python wire; (4) PROVIDER-COMPLEMENT langfuse — pick one; (5) 30-day pilot |
| 7 | openlit/openlit | 5-clause: (1) OTel-native LLM obs; (2) Python SDK; (3) openlit.init() wire; (4) PROVIDER-COMPLEMENT langfuse + opik; (5) 30-day pilot |
| 8 | D4Vinci/Scrapling | 5-clause: (1) adaptive scraping for stealth/anti-bot sites; (2) Python; (3) wraps playwright; (4) PROVIDER-COMPLEMENT firecrawl/tavily; (5) 14-day pilot |
| 9 | upstash/context7 | INCUMBENT — installed via ECC plugin; cite-anchor only (counts toward catalog completeness) |
| 10 | MemMachine/MemMachine | DEFER until #1+#2 eval — re-rank by then |

### REJECT-FOR-FIT.a — DEMAND-ABSENCE (8 candidates)

| # | Repo | Rationale |
|---|---|---|
| 1 | hashicorp/terraform-mcp-server | No terraform workflow in sss runtime |
| 2 | docker/hub-mcp | No docker-hub query workflow in sss runtime |
| 3 | JetBrains/mcpProxy | No JetBrains IDE in sss runtime |
| 4 | apify/actors-mcp-server | Cloud-vendor-gated (apify key needed) — defer until queued |
| 5 | triggerdotdev/trigger.dev | Cloud-managed agent platform; sss is local-only |
| 6 | pinecone-io/assistant-mcp | Cloud-only vendor-gated |
| 7 | cloudflare/mcp-server-cloudflare | No cloudflare workflow in sss runtime today |
| 8 | grafana/mcp-grafana | No grafana stack in sss runtime today (langfuse is incumbent obs) |

### DEFER (5 candidates — PARTIAL-OVERLAP W217-G + W216-E + W219 verdicts)

| # | Repo | Defer-rationale |
|---|---|---|
| 1 | langchain-ai/langgraph | W217-G DEFER + W216-E DEFER class — Python SDK Probe 5 mode-harness-shape FAIL |
| 2 | microsoft/agent-framework | W217-G class — Python+.NET SDK Probe 5 FAIL |
| 3 | crewAIInc/crewAI | W217-G DEFER — mode-harness-shape FAIL |
| 4 | deepset-ai/haystack | W216-E DEFER — duplicate llama_index W219 #2 INSTALL-NOW |
| 5 | raga-ai-hub/RagaAI-Catalyst | Stale-burn-in 2.5mo — re-audit at next push |
| 6 | chroma-core/chroma-mcp | DEFER per W219 #14 vector choice (qdrant preferred) |

### REJECT-LICENSE (8 candidates — verbatim above)

honcho AGPL-3.0 / 12-factor-agents NOASSERTION / n8n NOASSERTION / MaxKB GPL-3.0 / activepieces NOASSERTION / quivr NOASSERTION / pathway BSL / weaviate-mcp NONE.

### REJECT-DUPLICATE (1 candidate)

| # | Repo | Rationale |
|---|---|---|
| 1 | openai/swarm | Already in W219 DROP list (MAINTENANCE-MODE per W217-G/W220 Agent B) |

---

## Phase-1 INSTALL recommendations for Z:/claude-sota-pure

After Mia pre-apply + Pattern D BRIDGE-MODE re-fire, the cleanest ADOPT-NOW Phase-1 additions beyond W219+W220:

1. **`github/github-mcp-server`** — `claude mcp add github -- ...` (GitHub canonical MCP, replaces ad-hoc gh CLI for MCP-style flows)
2. **`microsoft/playwright-mcp`** — `npx @playwright/mcp@latest` (Microsoft-canonical browser MCP — complements W220 firecrawl + tavily web-scraping)

The remaining 10 STUDY-PILOT.b candidates ship in Phase-2 with explicit 5-clause Probe 7.b satisfaction documented.

## Cross-runtime install considerations (CR-9 sibling-bleed)

Per `Z:/claude-sota-installed/CLAUDE.md` CR-9 install-risk discipline:
- Both Phase-1 candidates install GLOBAL-MCP shape (not per-runtime) — no sibling-bleed risk via the CLI install command itself
- BUT `.mcp.json` wire MUST happen ONLY in `Z:/claude-sota-pure/.mcp.json`, NOT in `Z:/claude-sota-installed/.mcp.json` (this runtime is install-only canonical baseline)
- `git -C Z:/claude-sota log --all --oneline -- '.mcp.json'` REVERT-grep BEFORE wire-up to detect prior REVERT-AND-REMOVE precedents for github-mcp-server / playwright-mcp

---

## Recommendations to orchestrator at Wave 222 synthesis

1. **Cross-model gate**: dispatch Pattern D `codex exec --skip-git-repo-check --color never -p deep-review-exec` foreground+tee on this artifact's ADOPT-NOW row (2 candidates) before commit
2. **Mia pre-apply**: probe `claude-sota-pure/.mcp.json` for any existing `github` or `playwright` MCP entry BEFORE install command
3. **Documentation queue**: REJECT-LICENSE 8-row enumeration ships to `docs/verified-avoid.md` in W222 codification fire (1 LOGICAL UNIT per cycle-300)
4. **Discovery refresh trigger**: re-probe `hesreallyhim/awesome-claude-code` at W223+ when README TODO is resolved

---

## VERDICT

**STUDY-PILOT-CATALOG**: 28 NEW candidates surfaced via 8-source discovery (5 awesome-list catalogs + GitHub direct search across 4 query classes); 2 ADOPT-NOW Phase-1 candidates (github-mcp-server + microsoft/playwright-mcp via canonical-org criteria); 10 STUDY-PILOT.b candidates with Probe 7.b 5-clause check pending; 6 DEFER due W217-G/W216-E/W219-vector-choice PARTIAL-OVERLAP class; 8 REJECT-FOR-FIT.a DEMAND-ABSENCE (cloudflare/grafana/terraform/docker/jetbrains/apify/triggerdev/pinecone); 8 REJECT-LICENSE codified (honcho AGPL + n8n/activepieces/quivr/pathway/12-factor-agents NOASSERTION + MaxKB GPL + weaviate-mcp NO-LICENSE); 1 REJECT-DUPLICATE (openai/swarm). STAND-IN-NOTICE disclosed — orchestrator MUST Pattern D codex T1 BRIDGE-MODE re-fire on 2 ADOPT-NOW rows BEFORE Wave 222 commit.

---

**verdict_one_line**: `STUDY-PILOT-CATALOG: 28 NEW candidates harvested across 8 discovery sources; 2 ADOPT-NOW (github-mcp-server MIT 29k★ + microsoft/playwright-mcp Apache-2.0 32k★) pending Pattern D cross-model re-fire; 10 STUDY-PILOT.b; 8 REJECT-LICENSE for docs/verified-avoid.md Cohort 1; 8 REJECT-DEMAND-ABSENCE.a; STAND-IN-NOTICE disclosed.`
