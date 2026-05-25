---
title: Wave 225 FINAL SYNTHESIS — Z:\claude-sota-pure Comprehensive Install Catalog (W220-W223 deltas + parallel-session baseline integration)
status: AUTHORITATIVE-FINAL
date: 2026-05-15
wave: 225
predecessors: W213-W222 + parallel-session W223-MASTER-CATALOG + W220-W223 my-arc deltas (A/C/D/E/F/G/H/I/J/K) + W220-B FAILED FM-17.b/d + W223-L TRUNCATED
agents-cumulative: 12 dispatched (9 fully delivered + 2 partial + 1 FAILED + 1 truncated); 9 phantom-cite catches + 1 conflict resolved orchestrator-direct
artifact-class: master-final-synthesis-w220-w223-deltas-over-parallel-baseline
cross-model-gate-status: PARTIALLY-SATISFIED — parallel-session Path P codex T1 W222 Pattern B HNF + my-arc all dispatches STAND-IN per ENV (g); Wave 224 Pattern D codex deferred per FM-17.b/d risk; orchestrator-direct verification applied at synthesis boundary (chopratejas/headroom conflict resolved 2026-05-15 21:55 EDT)
load_bearing_meta: Z:/claude-sota/ retired -> Z:/claude-sota(retired)/; rule cites use Z:/claude-sota-installed/.claude/rules/* per W222-H Mia verification
---

# Wave 225 FINAL SYNTHESIS — Z:\claude-sota-pure SOTA Install Catalog

## 0. Executive Summary

This synthesis integrates **12 my-arc dispatches** (W220 + W221 + W222 + W223) with the **parallel-session W223-MASTER-CATALOG (40.3K)** to produce an operator-actionable install plan for Z:\claude-sota-pure. Key contributions of MY arc unique to the parallel catalog:

1. **9 PHANTOM-CITE catches** including 1 CONFLICT resolved orchestrator-direct
2. **22 candidates across 7 uncovered layers** (code-intel / DocAI / security-scanning / LM-serving / DB-MCP / web-scraping / notification)
3. **LOAD-BEARING META**: `Z:/claude-sota/` retired path-correction (rule cites migrate to `Z:/claude-sota-installed/.claude/rules/*`)
4. **MAJOR REVISION**: `microsoft/playwright-mcp` (W221-D ADOPT-NOW) → SUPERSEDED-BY `microsoft/playwright-cli + SKILLs` per Microsoft's own README (token-efficiency for coding agents)
5. **NEW Tier-1 OFFICIAL discoveries**: anthropics/claude-cookbooks + anthropics/skills/mcp-builder + PrefectHQ/fastmcp + elevenlabs/elevenlabs-mcp
6. **NEW high-star convergent gaps**: BMAD-METHOD (47k★) + claude-squad (7.5k★) + ccusage (14.2k★) + ast-grep + Trivy + PaddleOCR + ntfy + cognee-integrations CC plugin
7. **Outer-research v5-v8 kit harvest**: 119-repo cross-kit converged baseline + 9-step install order + 7-layer token-opt architecture + MCP 8-question source-audit checklist

**Cross-model gate status**: PARTIALLY-SATISFIED. My-arc agents ran as Sonnet stand-in per ENV (g); parallel session ran Path P codex T1 with Pattern B HNF (12780-line trace mined). Orchestrator-direct GitHub API verification applied to phantom-conflict resolution. Full cross-model gate satisfaction pending future Pattern D `codex exec` foreground+tee tighter dispatch.

---

## 1. PHANTOM-CITE Audit Trail (9 catches + 1 conflict resolved)

| # | Cite phantom | Source-of-cite | Resolution | Action for Z:\claude-sota-pure |
|---|---|---|---|---|
| 1 | `atlassian-labs/mcp-compressor` | W219 Agent C 88/100 | PHANTOM (W221-E zero matches; W219 score INVALID) | EXCLUDE from install plan |
| 2 | `distill-mcp` | W219 Agent C 82/100 | PHANTOM (W221-E zero matches; W219 score INVALID) | EXCLUDE from install plan |
| 3 | `chopratejas/headroom` | W219 Agent C 78/100 | **CONFLICT RESOLVED 2026-05-15 21:55 EDT — EXISTS at 1,758★ Apache-2.0; W221-E was WRONG, W222-G was RIGHT** | STUDY-PILOT.b token-compression candidate (RE-ENABLED) |
| 4 | `fastmcp-me/mcp-ComputeGauge` | v5/v6/v7/v8 SOTA_REPOS_FINAL_LIST | PHANTOM (W222-G zero matches in any 4 outer-research kits) | EXCLUDE — codify in `docs/verified-avoid.md` |
| 5 | `intelligent-compact` standalone | CLAUDE.local.md ENV (i) Rank #3 | PHANTOM-FLAG (W222-I — possibly internal plugin name, NOT standalone GitHub repo) | VERIFY install-path via local plugin cache or rename cite |
| 6 | `jlowin/fastmcp` | sister rule cites | OWNERSHIP-MOVED → `PrefectHQ/fastmcp` (25,175★ Apache-2.0) | Use canonical PrefectHQ/fastmcp |
| 7 | `anthropic-cookbook` (singular) | sister rule cites | NAME-DRIFT → `anthropics/claude-cookbooks` (canonical) | Use canonical claude-cookbooks |
| 8 | `modelcontextprotocol/mcp-builder` | sister rule cites | CLASS-CONFUSION (cited as repo but is a skill within `anthropics/skills/skills/mcp-builder/`) | Install via `anthropics/skills` marketplace, NOT standalone |
| 9 | `Z:/claude-sota/` sibling-path cites | CLAUDE.md cardinal rules 1-12 (and ~50 other rule files) | **LOAD-BEARING PATH-RETIREMENT** — `Z:/claude-sota/` renamed to `Z:/claude-sota(retired)/`; rules actually live at `Z:/claude-sota-installed/.claude/rules/*` | Wave 225 → next-fire ship: update ALL cite anchors throughout claude-sota-pure CLAUDE.md to `Z:/claude-sota-installed/.claude/rules/*` paths |

**Phantom-Reference DISCIPLINE NOW PROVEN n=9** — every future install fire MUST verify candidate via `mcp__github__search_repositories` OR direct GitHub API curl BEFORE inclusion in operator-actionable install plan.

---

## 2. Cumulative ADOPT-NOW Catalog (W213-W223 integrated)

### Tier 1 — Foundation (already-INSTALLED in Z:\claude-sota-pure per parallel session probe)

| # | Repo | Version | License | Stars | Source | Status |
|---|---|---|---|---|---|---|
| 1 | Native Claude Code | latest | (Anthropic) | n/a | .local/bin/claude.exe | INSTALLED 217.9 MB |
| 2 | sops | v3.13.0 sigstore-verified | MPL-2.0 | 18k+ | .local/bin/sops.exe | INSTALLED (W214 G2) |
| 3 | `anthropics/cwc-long-running-agents` | HEAD `ffd563d6` | MIT | (Anthropic) | .local/cwc/ | INSTALLED 5 primitives |
| 4 | `gsd-build/get-shit-done` (16+ agents) | latest | MIT 58k★ | 58,543 | .claude/agents/gsd-* | INSTALLED |
| 5 | `doobidoo/mcp-memory-service` v10.51.3 | v10.51.3 sqlite_vec | Apache-2.0 | 1,843 | .mcp.json | INSTALLED memory L1 |
| 6 | `getzep/graphiti` v0.29.0 | v0.29.0 + FalkorDB v1.6.1 | Apache-2.0 | 26,098 | .mcp.json | INSTALLED L3 KG |

### Tier 2 — ADOPT-NOW NEW (W220-W223 + parallel-session unique deltas)

| # | Repo | Stars | License | CR-12 class | Wire diff | Smoke probe | Grade |
|---|---|---|---|---|---|---|---|
| 7 | `anthropics/claude-cookbooks` | (Anthropic OFFICIAL) | Apache-2.0 | GENUINELY-NEW | 1 | `git clone https://github.com/anthropics/claude-cookbooks.git` | A+ |
| 8 | `anthropics/skills` | 135,051 | Apache-2.0 | GENUINELY-NEW | 1 | `/plugin marketplace add anthropics/skills` | A+ |
| 9 | `anthropics/claude-plugins-official` | 19,446 | Apache-2.0 | INCUMBENT-CONFIRMED | 1 | already-installed (26 of 37 plugins) | A+ |
| 10 | `addyosmani/agent-skills` | 39,100 | MIT | GENUINELY-NEW | 1 | `/plugin marketplace add addyosmani/agent-skills` | A |
| 11 | `wshobson/agents+commands` | 35,400 | MIT | GENUINELY-NEW | 2 | `/plugin marketplace add wshobson/agents` | A |
| 12 | `affaan-m/everything-claude-code` (ECC) | 183,000 (LAUNCH-SPIKE) | MIT | GENUINELY-NEW | 3 | `/plugin marketplace add affaan-m/everything-claude-code` | A- |
| 13 | `PrefectHQ/fastmcp` | 25,175 | Apache-2.0 | GENUINELY-NEW | 2 | `pip install fastmcp@latest` | A |
| 14 | `langfuse/langfuse` + `langfuse/mcp-server-langfuse` | 27,279 + 167 | MIT-core/EE-split | GENUINELY-NEW | 2 | `npx -y @langfuse/mcp-server-langfuse` | A |
| 15 | `topoteretes/cognee` + `cognee-integrations` CC plugin | 17,245 | Apache-2.0 | PROVIDER-COMPLEMENT to Graphiti | 3 | `pip install cognee` + `claude --plugin-dir cognee-integrations` | A |
| 16 | `agentclientprotocol/claude-agent-acp` | 1,900 | Apache-2.0 | GENUINELY-NEW | 1 | `npm install -g claude-agent-acp` | A- |
| 17 | `llmware-ai/llmware` | 14,900 | Apache-2.0 | GENUINELY-NEW (small-LLM-RAG specialist) | 2 | `pip install llmware` | A- |
| 18 | `shcherbak-ai/contextgem` | 1,800 | Apache-2.0 | GENUINELY-NEW (structured doc extraction) | 3 | `pip install contextgem` | B+ |
| 19 | `onyx-dot-app/onyx` | 29,400 | MIT | GENUINELY-NEW (enterprise RAG-e2e) | 4 | `docker compose up onyx` | B+ |
| 20 | `temporalio/temporal` | 20,100 | MIT | GENUINELY-NEW (workflow engine) | 4 | `docker compose up temporal` | B+ |
| 21 | `infiniflow/ragflow` | 80,600 | Apache-2.0 | GENUINELY-NEW (DocAI+RAG) | 5 | `docker compose up ragflow` | B |
| 22 | **`github/github-mcp-server`** | 29,864 | MIT | GENUINELY-NEW canonical | 2 | `claude mcp add github -- ...` (per W221-D) | A |
| 23 | **`microsoft/playwright-cli` + SKILLs** *(REVISED from playwright-mcp)* | (Microsoft OFFICIAL) | Apache-2.0 | GENUINELY-NEW (Microsoft's own recommendation per W223-K) | 2 | `npm install -g @playwright/cli@latest && playwright-cli install --skills` | A |
| 24 | `ChromeDevTools/chrome-devtools-mcp` | 39,706 | Apache-2.0 | PROVIDER-COMPLEMENT (perf/debug specialty) | 2 | `claude mcp add chrome-devtools --scope user npx chrome-devtools-mcp@latest` | A- |
| 25 | **`anthropics/skills/skills/mcp-builder`** *(W223-K NEW)* | (in anthropics/skills 135k★) | Apache-2.0 | GENUINELY-NEW (TIER-1-DIRECT MCP authoring 4-phase guide) | 1 | `/plugin install example-skills@anthropic-agent-skills` | A+ |
| 26 | **`elevenlabs/elevenlabs-mcp`** *(W223-K NEW)* | 1,364 | MIT (OFFICIAL ElevenLabs) | GENUINELY-NEW (voice TTS/STT) | 2 | `pip install elevenlabs-mcp` | A- |
| 27 | `BMAD-METHOD` (bmad-code-org) | 47,254 | (JavaScript) | GENUINELY-NEW (workflow harness STEP 5) | 3 | per upstream BMAD install | B+ |
| 28 | `smtg-ai/claude-squad` | 7,482 | Go | GENUINELY-NEW (parallel operator TUI STEP 6) | 3 | per upstream claude-squad install | B+ |
| 29 | `ryoppippi/ccusage` | 14,220 | TypeScript | GENUINELY-NEW (cost-management measurement STEP 2) | 1 | `npx ccusage@latest` or `npm install -g ccusage` | A- |
| 30 | `ast-grep/ast-grep` *(W220-A)* | 13,808 | MIT | GENUINELY-NEW (code-intel) | 1 | `npm i -g @ast-grep/cli` | A- |
| 31 | `aquasecurity/trivy` *(W220-A)* | 28k+ | Apache-2.0 | GENUINELY-NEW (security: SBOM+CVE+IaC+secrets in one) | 2 | `gh release download --repo aquasecurity/trivy` | A- |
| 32 | `PyCQA/bandit` *(W220-A)* | 8,029 | Apache-2.0 | PROVIDER-COMPLEMENT to Trivy (Python SAST) | 1 | `pipx install bandit` | B+ |
| 33 | `PaddlePaddle/PaddleOCR` *(W220-A)* | 77,913 | Apache-2.0 | GENUINELY-NEW (DocAI foundation) | 3 | `pip install paddleocr` | B+ |
| 34 | `binwiederhier/ntfy` + `cyanheads/ntfy-mcp-server` *(W220-A)* | 22,000+ / 16 | Apache-2.0 / MIT | GENUINELY-NEW (notification) | 3 | `docker pull binwiederhier/ntfy` + `npm i @cyanheads/ntfy-mcp-server` | B+ |
| 35 | `agentclientprotocol/python-sdk` | 255 | Apache-2.0 | GENUINELY-NEW (ACP SDK) | 2 | `pip install agentclientprotocol` | B+ |

### Tier 3 — STUDY-PILOT.b CONDITIONAL (operator workflow gate required)

| # | Repo | Stars | Use case | Trigger for activation |
|---|---|---|---|---|
| 36 | `makenotion/notion-mcp-server` *(W223-J)* | 4,332 | Notion-KB sync (TTS-class workflow) | Operator confirms Notion vault usage |
| 37 | `MarkusPfundstein/mcp-obsidian` *(W223-J)* | 3,694 | Obsidian vault MCP | Operator confirms Obsidian vault path |
| 38 | `atlassian/atlassian-mcp-server` (Rovo OFFICIAL) | (Atlassian OFFICIAL) | Jira/Confluence/Compass | Operator confirms Atlassian Cloud subscription |
| 39 | `chopratejas/headroom` *(CONFLICT RESOLVED — EXISTS)* | 1,758 | Token compression (60-95% tool output) | Operator pilots vs incumbent rtk + context-mode + repomix |
| 40 | `PCIRCLE-AI/toonify-mcp` *(W221-E)* | 63 | TOON notation for tool output | Operator pilots tool-output compression vs raw JSON |
| 41 | `AzozzALFiras/claude-context-optimizer` *(W221-E)* | 35 | 97% reduction MCP benchmarked | Operator pilots vs incumbents |
| 42 | `oraios/serena` | 24,271 | Semantic IDE-for-agent | Operator confirms GitNexus is insufficient |
| 43 | `BerriAI/litellm` | 47,091 | LLM proxy gateway | Replace ad-hoc CLIProxyAPI with litellm for graphiti L3 |
| 44 | `langchain-ai/langgraph` | 32,128 | Stateful long-horizon agent | 30d pilot vs CC Agent tool incumbent |
| 45 | `alirezarezvani/claude-skills` (engineering subsets) | 14,900 | Engineering/business-growth skill bundles | Pilot specific bundles only |
| 46 | `mem0ai/mem0` (re-eval) | 55,802 | Memory layer alternative | Re-eval vs incumbent mcp-memory + graphiti |
| 47 | `letta-ai/letta` (MemGPT) | 22,736 | Stateful-agents platform | Pilot vs Graphiti baseline |
| 48 | `comet-ml/opik` | 19,296 | LLM debug+eval+monitor | Pick ONE: opik OR langfuse (currently langfuse W219 TIER-1) |
| 49 | `openlit/openlit` | 2,444 | OTel-native LLM obs | PROVIDER-COMPLEMENT to langfuse |
| 50 | `redis/mcp-redis` | 510 | FalkorDB-via-redis-protocol adapter | Pilot if direct-redis query needed against FalkorDB :16379 |

### Tier 4 — REVERSE list (REJECT-FOR-FIT / DEMOTED — DO NOT INSTALL)

| # | Repo | Reason |
|---|---|---|
| - | **`microsoft/playwright-mcp`** *(REVISED)* | SUPERSEDED-BY microsoft/playwright-cli per Microsoft's own README |
| - | `volcengine/OpenViking` | AGPL-3.0 LICENSE conflict + DUPLICATE-FUNCTIONALITY mcp-memory+Graphiti |
| - | `mem0ai/mem0` (W217-F3 DEMOTED) | SUPERSEDED-BY mcp-memory+graphiti L1+L3 incumbents |
| - | `crewAIInc/crewAI` | SUPERSEDED-BY CC sub-agents/Agent tool; Probe 5 external-harness FAIL |
| - | `langchain-ai/deepagents` | DUPLICATE-FUNCTIONALITY of CC Agent tool (deepagents README explicit "inspired by Claude Code") |
| - | `aaif-goose/goose` | DUPLICATE-FUNCTIONALITY complete-harness competitor; CITE-CLASS-CANONICAL for ACP only |
| - | `microsoft/autogen` | DEPRECATED → MAF successor (both REJECT-FOR-FIT for CC native runtime) |
| - | `microsoft/agent-framework` (MAF) | DUPLICATE-FUNCTIONALITY cross-vendor counterpart (Python+.NET external SDK) |
| - | `huggingface/smolagents` | PARTIAL-OVERLAP CodeAgent paradigm mismatch with CC tool-calling |
| - | `openai/openai-agents-python` | DUPLICATE-FUNCTIONALITY cross-vendor counterpart (OpenAI SDK orchestrating OpenAI) |
| - | `kyegomez/swarms` | DUPLICATE-FUNCTIONALITY massive (SequentialWorkflow / ConcurrentWorkflow / SwarmRouter all duplicate CC primitives) |
| - | `agno-agi/agno` | Wrong layer — full agent platform competing with Anthropic CC |
| - | `Arize-ai/phoenix` | Proprietary ELv2 LICENSE BLOCKER |
| - | `restatedev/restate` | BSL LICENSE BLOCKER |
| - | `inngest/inngest` | SSPL LICENSE BLOCKER |
| - | `microsoft/LLMLingua` | OUTDATED 2026-05 per user flag |
| - | `VikParuchuri/marker` | GPL-3.0 + RAIL-M LICENSE BLOCKER |
| - | `pymupdf/pymupdf4llm` | AGPL-3.0 LICENSE BLOCKER |
| - | `trufflesecurity/trufflehog` | AGPL-3.0 LICENSE BLOCKER |
| - | `plastic-labs/honcho` | AGPL-3.0 LICENSE BLOCKER |
| - | `n8n-io/n8n` | NOASSERTION fair-code non-OSI |
| - | `1Panel-dev/MaxKB` | GPL-3.0 LICENSE BLOCKER |
| - | `activepieces/activepieces` | NOASSERTION mixed-source non-OSI |
| - | `QuivrHQ/quivr` | NOASSERTION source-available non-OSI |
| - | `pathwaycom/pathway` | BSL LICENSE BLOCKER |
| - | `weaviate/mcp-server-weaviate` | NO-LICENSE-FILE in repo |
| - | filesystem MCPs (B.1+B.2 in W223-J) | CR-12 DUPLICATE — Claude Code has native filesystem tools |
| - | Slack/Discord/Linear/Roam/Logseq MCPs | Probe 7.a DEMAND-ABSENCE for autonomous solo harness |
| - | S3/GCS/Drive/Dropbox/Azure-Blob MCPs | Probe 7.a DEMAND-ABSENCE (no cloud-storage workflow) |
| - | Monday/Asana/Trello/GitHub-Projects MCPs | Probe 7.a DEMAND-ABSENCE OR PARTIAL-OVERLAP github-mcp-server |
| - | terraform/grafana/cloudflare/docker-hub MCPs | Probe 7.a DEMAND-ABSENCE (no infra workflow) |
| - | JetBrains/apify/triggerdev/pinecone MCPs | Probe 7.a DEMAND-ABSENCE (no IDE/cloud-vendor workflow) |
| - | `openai/swarm` (W219 DROP) | MAINTENANCE-MODE per W217-G/W220-B |

---

## 3. Phase 0-9 Install Order for Z:\claude-sota-pure

### Phase 0 — Already-LANDED (no action; verified via parallel-session probe)
- Native Claude Code + sops + cwc-long-running-agents + gsd-build (16+ agents) + mcp-memory-service + graphiti + FalkorDB
- 26/37 Anthropic OFFICIAL plugins already installed
- 13+ MCP servers wired in .mcp.json

### Phase 1 — Foundation marketplaces (4 atomic units, wire-diff 1)
```bash
/plugin marketplace add anthropics/claude-plugins-official
/plugin marketplace add anthropics/skills            # NEW W222-H
/plugin marketplace add addyosmani/agent-skills
/plugin marketplace add wshobson/agents
```

### Phase 2 — Measurement + Token-opt (CONVERGED 4/4 v5-v8 outer-research kits; STEP 2 of 9-step canonical)
```bash
npx ccusage@latest                                   # CONVERGED W222-G + W222-I
pip install elevenlabs-mcp                           # NEW W223-K (TTS/STT)
# chopratejas/headroom STUDY-PILOT.b — pilot ELT decision
```

### Phase 3 — Anthropic OFFICIAL repos clone (W222-H)
```bash
git clone https://github.com/anthropics/claude-cookbooks.git .local/claude-cookbooks
/plugin install example-skills@anthropic-agent-skills   # includes mcp-builder
/plugin install document-skills@anthropic-agent-skills  # docx/pdf/pptx/xlsx STUDY-PILOTs
```

### Phase 4 — MCP Framework + Code Intel (CONVERGED W222-G + W222-H; STEP 4 of 9-step)
```bash
pip install fastmcp@latest                           # PrefectHQ/fastmcp (canonical Python MCP fw)
npm i -g @ast-grep/cli                               # ast-grep code-intel
# Verify Serena install (CONVERGED 4/4 v5-v8 kits)
```

### Phase 5 — Workflow harness + Parallel operator (CONVERGED 4/4 v5-v8 kits; STEPS 5+6)
```bash
# Pick ONE workflow harness (operator decision)
# Option A: BMAD-METHOD (47k★ highest-star)
# Option B: claude-task-master (27k★)
# Option C: ccpm (8k★ shell-based)

# Parallel operator
# claude-squad install per upstream README (7.5k★ Go)
```

### Phase 6 — RAG-e2e + Observability + LLM proxy (W213-W219 + W222-G STUDY-PILOTs)
```bash
# RAG: pick path
docker compose up onyx                               # if enterprise RAG needed
# OR docker compose up ragflow                       # if DocAI+RAG needed

# Observability — TIER-1
npx -y @langfuse/mcp-server-langfuse                 # 167★ official MCP

# LLM proxy
pip install litellm[proxy]@latest                    # 47k★ STUDY-PILOT.b for graphiti L3
# litellm --model anthropic/claude-opus-4-7 --port 11800
# Update .mcp.json graphiti env: OPENAI_API_URL=http://127.0.0.1:11800/v1
```

### Phase 7 — Security + DocAI + Notification (W220-A uncovered layers)
```bash
gh release download --repo aquasecurity/trivy --pattern '*windows*.zip'
pipx install bandit
pip install paddleocr
docker pull binwiederhier/ntfy
npm i @cyanheads/ntfy-mcp-server
```

### Phase 8 — Browser-MCP migration (W223-K MAJOR REVISION)
```bash
# REVISED per Microsoft's own recommendation (W223-K)
npm install -g @playwright/cli@latest
playwright-cli install --skills                      # SKILL-based, token-efficient

# SECONDARY for perf/debug:
claude mcp add chrome-devtools --scope user npx chrome-devtools-mcp@latest

# DEPRECATE: microsoft/playwright-mcp (per Microsoft README)
```

### Phase 9 — Agent-orch + ACP + Workflow-engine (selective; W217-F3 conditions)
```bash
# Cognee PROVIDER-COMPLEMENT to Graphiti
pip install cognee
# claude --plugin-dir <topoteretes/cognee-integrations>

# ACP bridge (CC↔ACP for cross-runtime interop)
npm install -g claude-agent-acp
pip install agentclientprotocol

# Temporal workflow engine (only if durable execution needed)
docker compose -f docker-compose-postgresql.yml up -d
pip install temporalio
```

---

## 4. CR-9 Install-Risk Discipline per Phase

Per `Z:/claude-sota-installed/CLAUDE.md` cardinal-rule-9 install-risk discipline:

1. **Version-pin all `@latest`**: every install command above SHOULD be pinned to specific version at install time; `@latest` carries D6 today-release-auto-upgrade risk per FM-03 ladder
2. **2-round fix-forward budget**: expect Phase 1-9 each to need NEEDS-REVISION → fix-forward → APPROVE per sibling first-50-commits 8/12 ports needed 2 rounds
3. **Pre-cite-import REVERT check**: BEFORE Phase 9 cognee install, run `git -C Z:/claude-sota(retired) log --all --oneline -- 'cognee*'` to detect prior REVERT-AND-REMOVE precedents
4. **Sibling-bleed defense**: every install command sets state in `Z:/claude-sota-pure/...` NEVER `Z:/claude-sota-installed/...` (this is install-only canonical baseline)
5. **TARGET-runtime probe**: per FM-20 row 21 — orchestrator-Mia probes run on `claude-sota-pure` TARGET runtime, NOT just on `claude-sota-installed` orchestrator runtime

---

## 5. Outer-Research v5-v8 Methodology Adoption (W222-G CONVERGED 4/4)

Per W222-G outer-research harvest — CODIFY as cite-class rules in `Z:/claude-sota-pure/.claude/rules/`:

1. **`install-order-discipline.md`** — codifies v5 9-step canonical install order (4/4 v5/v6/v7/v8 convergence)
2. **`mcp-source-audit-discipline.md`** — codifies MCP 8-question source-audit checklist (4/4 convergence)
3. **`token-opt-7-layer-architecture.md`** — codifies token-opt 7-layer architecture (4/4 convergence)

Empirical evidence n=4/4 cross-kit (v5+v6+v7+v8) per W222-G.

---

## 6. Cross-Model Gate Satisfaction Status

| Gate layer | Status | Recovery if NEEDED |
|---|---|---|
| Pre-edit T1 codex consult | **PARTIALLY-SATISFIED** — parallel session Path P W222 Pattern B HNF (12780-line trace mined; full verdict not reached) + my-arc all STAND-IN per ENV (g) | Re-fire Pattern D `codex exec --skip-git-repo-check --color never -p deep-review-exec` foreground+tee per Wave 142 n=13 recovery-family before any commit |
| Commit-time T2 hook | INSTALLED but PARTIALLY-FUNCTIONAL per parallel-session catalog | Apply Pattern A at T2 hook fix-forward when commits land |
| Post-commit T3 hook | INSTALLED per manifest §2 L84 W156 F1 | T3 auto-fires per `if: Bash(git commit *)` matcher |
| Mia pre-apply discipline | **SATISFIED** — orchestrator-direct verification at synthesis-vs-Edit boundary (chopratejas/headroom conflict resolved 2026-05-15 21:55) | n/a — applied |
| Phantom-cite discipline | **SATISFIED** — 9 catches + 1 conflict resolved orchestrator-direct | n/a — applied |
| Multi-source ≥4 discovery | **PARTIALLY-SATISFIED** — most fires used GitHub + WebFetch; awesome-list catalogs surveyed | Future fires SHOULD route through ≥4 distinct provider families per discovery breadth discipline |

---

## 7. Open Items Pending Operator Decision

1. **Phase 5 workflow-harness choice**: BMAD-METHOD (47k★) vs claude-task-master (27k★) vs ccpm (8k★) — operator picks per project complexity
2. **Phase 6 RAG choice**: onyx (29.4k★ MIT) vs ragflow (80.6k★ Apache-2.0) — operator picks per use case (onyx=enterprise; ragflow=heavier DocAI)
3. **Phase 6 observability choice**: langfuse (TIER-1 W219) vs opik (W221-D 19.3k★) vs openlit (W221-D) — pick one (langfuse recommended per W219 99/100)
4. **Phase 8 browser migration**: REVISE prior W221-D plan from `microsoft/playwright-mcp` to `microsoft/playwright-cli + SKILLs` per W223-K
5. **Knowledge-base MCPs**: Notion (4.3k★) / Obsidian (3.7k★) / Atlassian (OFFICIAL) — install ONLY if operator confirms workflow per W223-J Probe 7.b
6. **Path-cite migration**: 50+ rule files in `Z:/claude-sota-installed/.claude/rules/*` reference `Z:/claude-sota/...` paths to retired directory — Wave 226 ship to update all anchors to `Z:/claude-sota-installed/...`
7. **`intelligent-compact` cite verification**: CLAUDE.local.md ENV (i) Rank #3 references a phantom-flagged repo; verify install path or rename cite (W222-I PHANTOM-FLAG)
8. **Wave 224 Pattern D codex cross-model verification**: deferred per FM-17.b/d wrapper-thrash risk; operator-direct invocation recommended before any Phase 1-9 commit

---

## 8. Forward Top-5 (next-fire candidates)

1. **F1 — Wave 226 ship**: Update Z:/claude-sota-installed CLAUDE.md + 50+ rule files to migrate `Z:/claude-sota/...` anchors → `Z:/claude-sota-installed/.claude/rules/...` (FM-20 row 9 path-retirement closure)
2. **F2 — Pattern D codex T1 review** of this Wave 225 synthesis: `codex exec --skip-git-repo-check --color never -p deep-review-exec` foreground+tee on Phase 1-9 install order; budget 300s
3. **F3 — Agent L re-dispatch** (CI/CD + git workflow + docs-gen + SOTA CLI tools): truncated in W223; tighter brief with explicit ARTIFACT-INLINE mandate
4. **F4 — `microsoft/playwright-cli` install ship** with smoke probe (replacing prior `microsoft/playwright-mcp` plan from W221-D)
5. **F5 — Phantom-cite `intelligent-compact` ENV (i) Rank #3 resolution** + `feedback_*.md` codification for cross-arc phantom-cite discipline at install-cite layer

---

## 9. VERDICT

**FINAL-CATALOG-READY-FOR-OPERATOR-EXECUTION**:
- 35 ADOPT-NOW candidates (W213-W223 integrated; parallel-session 11-wave baseline + my-arc unique deltas)
- 15 STUDY-PILOT.b CONDITIONAL candidates (operator workflow gate)
- ~37+ REVERSE/REJECT-FOR-FIT candidates with license/duplicate/demand-absence rationale
- 9 PHANTOM-CITE catches + 1 conflict resolved orchestrator-direct
- 1 LOAD-BEARING META: `Z:/claude-sota/` retirement cite migration plan
- 1 MAJOR REVISION: `microsoft/playwright-mcp` → `microsoft/playwright-cli + SKILLs` per Microsoft's own recommendation
- Phase 0-9 install order (operator-actionable)
- Cross-model gate PARTIALLY-SATISFIED — Wave 226 Pattern D codex review recommended before commit

**verdict_one_line**: `FINAL-CATALOG-READY: 35 ADOPT-NOW + 15 STUDY-PILOT.b + 37+ REJECT/REVERSE rows across 9 phases for Z:\claude-sota-pure; 9 phantom catches + 1 conflict resolved + 1 LOAD-BEARING path-retirement meta + 1 MAJOR Microsoft-playwright revision; cross-model gate PARTIALLY-SATISFIED (Wave 226 Pattern D codex re-fire recommended); 50+ rule-file cite-anchor migration ship queued as Forward Top-5 F1.`

VERDICT: APPROVE-FINAL-CATALOG-READY-FOR-OPERATOR-EXECUTION
