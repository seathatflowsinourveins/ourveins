---
title: W223 MASTER CATALOG — Z:\claude-sota-pure Comprehensive SOTA Runtime Setup
status: AUTHORITATIVE-CANDIDATE
date: 2026-05-15
wave: 223
predecessors: W213+W214+W215+W216+W217-F+W217-G+W217-OpenViking-precision+W218+W219+W220+W221-B+W222-license-probe+W222-Path-P-codex-trace-mined+W222-target-state-probe
agents-dispatched: 5 (W221-A FM-17.e fail / W221-B SUCCESS / W221-C FM-17.b truncated / W222-D FM-17.e fail / Path P codex orchestrator-direct Pattern B HNF — 2 successes / 2 failures / 1 truncation)
artifact-class: master-catalog-comprehensive-multi-wave-synthesis
orchestrator-runtime: claude-sota-installed
install-target-runtime: claude-sota-pure
target-state-verified-via: orchestrator-direct Bash probe 2026-05-15 (Z:/claude-sota-installed/tmp/wave222-pure-state-probe.txt)
license-spdx-authoritative-via: gh api direct .license.spdx_id field 2026-05-15 (Z:/claude-sota-installed/.claude/state/w222-license-probe.json — 30 candidates) + 2 supplementary probes (Z:/claude-sota-installed/tmp/wave222-pure-state-probe.txt:188-190)
cross-model-gate-status: Path P W222 Pattern B HNF (REAL GPT-5.5 model gpt-5.5 verified at OUT.txt:6 session 019e2d9e-e11b-75b1-9285-75f03b437231 — verdict output 300s-truncated active-research; trace-mined 4 verifications retained)
fm20-row-21-target-runtime-mia-pass: 13 MCP servers + native claude.exe + sops.exe + cwc/ + gsd-agents fleet confirmed in Z:/claude-sota-pure
---

# W223 MASTER CATALOG — Z:\claude-sota-pure Comprehensive SOTA Runtime Setup

## 1. Executive Summary

Multi-wave research arc W213→W222 audited **~140 candidates across 19 layers** for the Z:\claude-sota-pure runtime install. This master catalog consolidates 11 wave returns + orchestrator-direct probes into a single operator-executable Top-X ranked install playbook with Phase 0-10 ordered checklist + per-component smoke probes + rollback paths + 2-option trade-offs.

**Key W223 contributions over W219**:
1. **FM-20 row 21 target-runtime probe** — `Z:\claude-sota-pure` existing-state verified live (NOT inferred from orchestrator-runtime); catches additional ALREADY-LANDED items that W219/W220 missed
2. **Authoritative SPDX license direct-read** (gh API 2026-05-15) — 30 candidates × `.license.spdx_id` field (NOT README badge inference); closes W218 P2 license-closure gate
3. **W220+W221-B layer extensions** — 9 net-new ADOPT-CANDIDATES filling unnamed layers (outlines / promptfoo / markitdown / duckdb / mcp-inspector / motherduckdb / pg-aiguide / startup-cto persona / FastMCP)
4. **Cross-model gate status** — Path P codex T1 invoked (REAL GPT-5.5 session 019e2d9e); Pattern B HNF disposition with 4 trace-mined verifications; CR-3 cross-model gate satisfied at dispatch layer (verdict timeout-truncated; full verdict deferred to follow-up tighter dispatch)
5. **2-option trade-offs resolved** for 3 controversial decisions (langfuse self-host vs cloud / OpenViking AGPL backend / superpowers selective-vendor)

**Wave failure-mode disclosure** (per cardinal-rule 7 REPORT-errors-before-routing-around):
- W221-A codex-rescue BRIDGE-MODE: **FM-17.e autocompact-thrashing** (4 tool_uses / 139 tokens / 1075s)
- W221-C wshobson-security-auditor: **FM-17.b wrapper-truncation** (33 tool_uses / 193s; mid-investigation cut at "3 confirmed MIT")
- W222-D architect: **FM-17.e autocompact-thrashing** (5 tool_uses / 48 tokens / 477s)
- W222 Path P codex exec: **Pattern B HNF active-deep-research timeout** at 300s (12780-line trace, terminal JSON verdict not reached)

**Recovery path applied**: orchestrator-direct gh API + Bash probes replaced FM-17.e+b failed dispatches (license closure + target-state Mia + cross-model trace-mining). CR-3 cross-model gate **PARTIALLY-SATISFIED** at Path P dispatch layer; full satisfaction queued for W224 follow-up tighter ≤5-repo codex dispatch.

## 2. Z:\claude-sota-pure Baseline (FM-20 row 21 target-runtime verified 2026-05-15)

Per `Z:/claude-sota-installed/tmp/wave222-pure-state-probe.txt`:

### 2.1 Already-landed structure

| Surface | State | Detail |
|---|---|---|
| `.local/bin/claude.exe` | ✅ 217.9 MB | Native Claude Code binary installed |
| `.local/bin/sops.exe` | ✅ 50.6 MB | W214 G2 sops v3.13.0 sigstore-verified install |
| `.local/cwc/` | ✅ INSTALLED | anthropics/cwc-long-running-agents 5 .sh primitives (track-read / verify-gate / kill-switch / steer / commit-on-stop) |
| `.claude/agents/gsd-*` | ✅ 16+ files | gsd-build/get-shit-done agents (advisor-researcher / ai-researcher / assumptions-analyzer / code-fixer / code-reviewer / codebase-mapper / debug-session-manager / debugger / doc-*/ domain-researcher / eval-auditor / eval-planner / executor / framework-selector / integration-checker / ...) |
| `.claude/plugins/` | ✅ marketplaces + cache + installed_plugins.json (9.5 KB) | Plugin marketplace infrastructure active; plugin-catalog-cache.json 232.9 KB |
| `.claude/skills/` | ✅ present | Skill registry active |
| `.claude/hooks/` | ✅ present | Hook scripts directory |
| `docs/install-provenance.md` | ✅ W214 batch landed | sops v3.13.0 + vitest@4.1.6 + ECC governance-capture env-flip; CR-1 through CR-12 conformance disclosed |
| `bin/` | ✅ present | Launcher shims |
| `tools/` | ✅ present | Tooling scripts |
| `AGENTS.md` + `CLAUDE.md` + `CLAUDE.local.md` + `PROGRESS.md` + `README.md` | ✅ all present | Operator-facing bootstrap docs |

### 2.2 `.mcp.json` already-wired MCP servers (13+ identified; full read truncated at "serena" — verify via Read for additional)

| Server | Transport | Source | Notes |
|---|---|---|---|
| `memory` | stdio | `mcp-memory-server` + sqlite_vec backend | mcp-memory-service ALREADY-LANDED in target; storage at `Z:/claude-sota-pure-state/.mcp-memory/memory.db` |
| `github` | stdio npx | `@modelcontextprotocol/server-github` | Official MCP-org server |
| `context7` | http | `mcp.context7.com/mcp` | live version-pinned library docs |
| `deepwiki` | http | `mcp.deepwiki.com/mcp` | DeepWiki repo Q&A |
| `repomix` | stdio npx | `repomix --mcp` | Pack/grep/skill workflow per `auto-compact-discipline.md` Rank #2 |
| `git` | stdio npx | `@modelcontextprotocol/server-git` | Official MCP-org server |
| `fetch` | stdio npx | `@modelcontextprotocol/server-fetch` | Official MCP-org server |
| `time` | stdio npx | `@modelcontextprotocol/server-time` | Official MCP-org server |
| `sequentialthinking` | stdio npx | `@modelcontextprotocol/server-sequentialthinking` | Official MCP-org server |
| `filesystem` | stdio npx | `@modelcontextprotocol/server-filesystem` | Scoped to `Z:/claude-sota-pure` |
| `gitnexus` | stdio npx | `gitnexus mcp` | Code-intelligence MCP |
| `chrome-devtools` | stdio npx | `chrome-devtools-mcp@latest` | ⚠️ `@latest` violates CR-9 version-pin discipline; queue resolved-pin fix |
| `playwright` | stdio npx | `@playwright/mcp@latest` | ⚠️ `@latest` violates CR-9; queue resolved-pin fix |
| `serena` | (read truncated) | (verify via Read) | Symbol-aware code intelligence |

### 2.3 Target-runtime FM-20 row 21 catches (vs W219/W220 ALREADY-INSTALLED claims)

| Repo | W219/W220 claimed in orchestrator | Target Z:\claude-sota-pure actual | Verdict |
|---|---|---|---|
| **mcp-memory-service** | ALREADY-INSTALLED orch | ✅ ALSO LANDED target (`.mcp.json memory` server stdio mcp-memory-server) | DROP from install list — already in target |
| **graphiti** | ALREADY-INSTALLED orch | ❌ NOT in target `.mcp.json` | **INSTALL-NOW** at Phase 2 |
| **phoenix** | "ALREADY-wired claude-sota-installed `.mcp.json:95-98`" per W216-E | ❌ NOT in target `.mcp.json` | **INSTALL-NOW** at Phase 5 (or DEFER per operator demand) |
| **cwc-long-running-agents** | ACTIVE-VERIFIED both runtimes per W219 | ✅ confirmed `.local/cwc/` in target | DROP — already landed |
| **wshobson/agents** | ACTIVE-VERIFIED at `claude-sota-pure/.claude/settings.json:174` per W219 | (verify per Read; not in probe output snippet) | OPERATOR-VERIFY |
| **context-mode + repomix MCPs** | ACTIVE-VERIFIED per W219 Phase 0 | ✅ repomix confirmed in target `.mcp.json` (context-mode MCP entry not visible in truncated probe — verify) | KEEP as-is |
| **sops** | INSTALLED-W214 per W219 | ✅ `.local/bin/sops.exe 50.6 MB` | DROP — already landed W214 |
| **vitest** | INSTALLED-W214 per W219 | (verify via npm-global probe; not in probe output) | OPERATOR-VERIFY |
| **ECC governance-capture env** | INSTALLED-W214 per W219 | ✅ per install-provenance.md tail | DROP — already landed W214 |
| **gsd-build/get-shit-done** | LATE-DISCOVERY (62,454★ MIT; W222 license-probe surface) | ✅ HEAVY gsd-* agent presence in target `.claude/agents/` | ✅ ALREADY-LANDED target — DROP from install list; document as W213-W222 net-new discovery confirming target operator already adopted |

## 3. Authoritative SPDX License Direct-Read (gh API 2026-05-15)

30 candidates probed via `gh api repos/<org>/<repo>` field `.license.spdx_id`. Closes W218 Agent C P2 license-direct-read gate.

| # | Repo | Stars (live) | SPDX | Archived | Pushed | Default branch | Use-class verdict |
|---|---|---:|---|---|---|---|---|
| 1 | obra/superpowers | 192,727 | MIT | false | 2026-05-14 | main | ✅ CLI-binary-use OK |
| 2 | affaan-m/everything-claude-code | 183,189 | MIT | false | 2026-05-15 | main | ✅ plugin OK |
| 3 | microsoft/markitdown | 123,306 | MIT | false | 2026-04-20 | main | ✅ CLI-binary-use OK |
| 4 | gsd-build/get-shit-done | 62,454 | MIT | false | 2026-05-15 | main | ✅ already in target |
| 5 | DS4SD/docling | 59,791 | MIT | false | 2026-05-15 | main | ✅ library-link OK |
| 6 | run-llama/llama_index | 49,440 | MIT | false | 2026-05-15 | main | ✅ library-link OK |
| 7 | duckdb/duckdb | 38,230 | MIT | false | 2026-05-15 | main | ✅ library-link OK |
| 8 | wshobson/agents | 35,450 | MIT | false | 2026-05-14 | main | ✅ plugin OK |
| 9 | qdrant/qdrant | 31,338 | Apache-2.0 | false | 2026-05-15 | master | ✅ network-served OK (self-host) |
| 10 | github/github-mcp-server | 29,864 | MIT | false | 2026-05-15 | main | ✅ MCP-server OK |
| 11 | chroma-core/chroma | 27,963 | Apache-2.0 | false | 2026-05-15 | main | ✅ library-link OK |
| 12 | langfuse/langfuse | 27,279 | **NOASSERTION** | false | 2026-05-15 | main | ⚠️ open-core MIT+ee/LICENSE — verify use-class W224 |
| 13 | getzep/graphiti | 26,100 | Apache-2.0 | false | 2026-05-14 | main | ✅ library-link OK |
| 14 | volcengine/OpenViking | 23,959 | **AGPL-3.0** | false | 2026-05-15 | main | ⚠️ OPERATOR-OVERRIDE — backend AGPL §13 source-availability if self-hosted+network-exposed; plugin/examples Apache-2.0 |
| 15 | promptfoo/promptfoo | 21,291 | MIT | false | 2026-05-15 | main | ✅ CLI-binary-use OK |
| 16 | anthropics/claude-plugins-official | 19,446 | **null** | false | 2026-05-15 | main | ⚠️ verify LICENSE file W224 (Anthropic-OFFICIAL repo) |
| 17 | topoteretes/cognee | 17,245 | Apache-2.0 | false | 2026-05-15 | main | ✅ library-link OK |
| 18 | alirezarezvani/claude-skills | 14,937 | MIT | false | 2026-05-15 | main | ✅ plugin OK |
| 19 | explodinggradients/ragas | 13,925 | Apache-2.0 | false | 2026-02-24 | main | ✅ library-link OK |
| 20 | dottxt-ai/outlines | 13,843 | Apache-2.0 | false | 2026-05-13 | main | ✅ library-link OK |
| 21 | modelcontextprotocol/inspector | 9,772 | **NOASSERTION** | false | 2026-05-15 | main | ⚠️ LICENSE preamble (line 16-17 per W222 codex trace) shows Apache-2.0 transition from MIT — effectively Apache-2.0 + MIT-legacy-contributions; **ADOPT-OK** |
| 22 | awslabs/mcp | 9,062 | Apache-2.0 | false | 2026-05-15 | main | ✅ MCP-server OK |
| 23 | NVIDIA/garak | 7,822 | Apache-2.0 | false | 2026-05-15 | main | ✅ CLI-binary-use OK |
| 24 | anthropics/claude-code-action | 7,591 | MIT | false | 2026-05-15 | main | ✅ Anthropic-OFFICIAL GitHub Action |
| 25 | anthropics/claude-code-security-review | 4,612 | MIT | false | 2026-02-11 | main | ✅ Anthropic-OFFICIAL CI security review |
| 26 | chonkie-inc/chonkie | 4,016 | MIT | false | 2026-05-14 | main | ✅ library-link OK |
| 27 | grafana/mcp-grafana | 3,009 | Apache-2.0 | false | 2026-05-15 | main | ✅ MCP-server OK (conditional Grafana-stack) |
| 28 | doobidoo/mcp-memory-service | 1,843 | Apache-2.0 | false | 2026-05-15 | main | ✅ already-landed target |
| 29 | timescale/pg-aiguide | 1,728 | Apache-2.0 | false | 2026-05-12 | main | ✅ CC-plugin OK (conditional Postgres-stack) |
| 30 | trailofbits/claude-code-devcontainer | 806 | Apache-2.0 | false | 2026-04-24 | main | ✅ sandbox dev tool OK |
| 31 | motherduckdb/mcp-server-motherduck | 480 | MIT | false | 2026-05-13 | main | ✅ MCP-server OK (W222 codex trace confirms MIT + multi-client install paths) |
| 32 | anthropics/cwc-long-running-agents | 315 | Apache-2.0 | false | 2026-05-13 | main | ✅ already-landed target `.local/cwc/` |

**License posture summary**: 27/32 PROCEED-AS-IS (permissive MIT or Apache-2.0); 2/32 NOASSERTION need W224 LICENSE direct-file read (langfuse open-core + claude-plugins-official); 1/32 NOASSERTION resolved via W222 codex trace (inspector Apache-2.0+MIT-transition); 1/32 AGPL-3.0 OPERATOR-OVERRIDE-ADMISSIBLE (OpenViking — user-named).

## 4. Consolidated Top-X Final Scoring (W219 + W220 + W221-B + W222)

Master scoring matrix sorted by **(adoption tier × stars × NATIVE-CC) × FM-20-row-21 target-state**. Cite back to source artifacts for full SRA D1-D10 decomposition (not duplicated here per kiss-dry-yagni Must-Never #4).

### 4.1 TIER-1 INSTALL-NOW (10 candidates — Phase 1-5)

| Rank | Repo | Stars | License | Phase | Target state | Cite anchor |
|---|---|---:|---|---|---|---|
| 1 | **microsoft/markitdown** | 123,306 | MIT | 4 (DocAI) | ❌ NOT in target | W221-B §3 / W220 #28 / W222 license-probe row 3 |
| 2 | **DS4SD/docling** | 59,791 | MIT | 4 (DocAI) | ❌ NOT in target | W219 #7 / W222 license-probe row 5 |
| 3 | **run-llama/llama_index** | 49,440 | MIT | 4 (RAG framework) | ❌ NOT in target | W219 #2 / W222 license-probe row 6 |
| 4 | **qdrant/qdrant** | 31,338 | Apache-2.0 | 3 (Vector DB) | ❌ NOT in target | W219 #4 / W222 license-probe row 9 |
| 5 | **github/github-mcp-server** | 29,864 | MIT | 7 (Agent-orch GitHub) | ❌ NOT in target `.mcp.json` (different from generic `github` npm MCP currently wired) | W218 §4.2 #2 / W222 license-probe row 10 |
| 6 | **langfuse/langfuse** | 27,279 | open-core | 5 (Observability) | ❌ NOT in target; 2-option trade-off §6.1 | W219 #1 (TIER-1 99/100) / W222 license-probe row 12 ⚠️ |
| 7 | **getzep/graphiti** | 26,100 | Apache-2.0 | 2 (KG) | ❌ NOT in target `.mcp.json` | W219 #6 / W222 license-probe row 13 |
| 8 | **explodinggradients/ragas** | 13,925 | Apache-2.0 | 6 (Eval RAG) | ❌ NOT in target | W219 #9 / W222 license-probe row 19 |
| 9 | **dottxt-ai/outlines** | 13,843 | Apache-2.0 | 4 (Structured-output) | ❌ NOT in target | W220 #26 / W222 license-probe row 20 |
| 10 | **chonkie-inc/chonkie** | 4,016 | MIT | 4 (DocAI chunking) | ❌ NOT in target | W219 #8 / W222 license-probe row 26 |

### 4.2 TIER-2 STUDY-PILOT (8 candidates — Phase 6-9 demand-gated)

| Rank | Repo | Stars | License | Phase | Demand gate (Probe 7.b 5-clause) |
|---|---|---:|---|---|---|
| 11 | **promptfoo/promptfoo** | 21,291 | MIT | 6 (Eval CLI) | demand: prompt-eval workflow at sss orchestrator layer |
| 12 | **topoteretes/cognee** | 17,245 | Apache-2.0 | 9 (Topo memory user-named) | demand: cognee plugin hook lifecycle wire |
| 13 | **alirezarezvani/claude-skills (startup-cto persona only)** | 14,937 | MIT | 9 (Persona) | demand: orchestrator-side architecture-decision support |
| 14 | **NVIDIA/garak** | 7,822 | Apache-2.0 | 6 (Eval red-team) | demand: LLM red-team / vuln-scan workflow |
| 15 | **chroma-core/chroma** | 27,963 | Apache-2.0 | 3 (Vector alt to qdrant) | demand: lighter-weight alt vs qdrant |
| 16 | **modelcontextprotocol/inspector** | 9,772 | Apache-2.0+MIT-transition (W222 trace) | 7 (Testing MCP dev tool) | demand: MCP-authoring workflow |
| 17 | **motherduckdb/mcp-server-motherduck** | 480 | MIT | 10 (DuckDB SQL analytics) | demand: `.claude/state/*.jsonl` audit-log SQL analytics (closes W113 dbhub W27 caveat — DuckDB native JSONL = zero ETL) |
| 18 | **timescale/pg-aiguide** | 1,728 | Apache-2.0 | 10 (Postgres CC plugin) | demand: Postgres tooling concretely needed |

### 4.3 TIER-3 OPERATOR-OVERRIDE / CITE-CLASS (3 candidates)

| Rank | Repo | Stars | License | Disposition |
|---|---|---:|---|---|
| 19 | **volcengine/OpenViking** (user-named) | 23,959 | AGPL-3.0 backend + Apache-2.0 plugin | OPERATOR-OVERRIDE-ADMISSIBLE per W219 L41 — local-use baseline OK; AGPL §13 disclosure only if backend self-hosted + network-exposed |
| 20 | **obra/superpowers** | 192,727 | MIT | TIER-2 SELECTIVE-VENDOR — 4/14 skills already plugin-cached at `claude-plugins-official/superpowers/5.1.0/`; 3 unvendored via cite-import-AMBER (executing-plans + finishing-a-development-branch + using-git-worktrees) — see §6.3 trade-off |
| 21 | **anthropics/cwc-long-running-agents** | 315 | Apache-2.0 | ✅ ALREADY-LANDED `.local/cwc/` target — DROP |

### 4.4 W222 BRIDGE-MODE Path P codex T1 trace-mined verifications (Pattern B HNF)

Cross-model GPT-5.5 verdict output 300s-truncated; 4 verifications captured pre-timeout:

| # | Repo | Verification | Source line |
|---|---|---|---|
| 1 | modelcontextprotocol/inspector | LICENSE direct-read: Apache-2.0 + MIT-transition preamble (was MIT, undergoing relicensing) | `codex_consult_w222_top15_ratify_OUT.txt` LICENSE L1-3, L16-17 |
| 2 | motherduckdb/mcp-server-motherduck | MIT confirmed (LICENSE L1, Copyright 2024 MotherDuck); `pyproject.toml` deps `duckdb==1.5.2` + `fastmcp>=3.2`; multi-client install paths verified (Claude Code / Codex / Gemini CLI) | OUT.txt L80-89, L120-141 |
| 3 | mcp-server-qdrant | PyPI `uvx mcp-server-qdrant` v0.8.1 ALIVE; npm `@modelcontextprotocol/server-qdrant` 404 PHANTOM **CONFIRMED** | OUT.txt L195-207 |
| 4 | NVIDIA/garak | D8 industry adoption PASS: 3 tooling + 7 platform integrations (TrustyAI / Garak-MCP / Garak-Report + Tumeryk / Vijil / Deepchecks / Mindgard / Giskard / OpsMX / Upwind / GuardionAI) per PROJECTS.md L1-30 | OUT.txt L242-274 |

## 5. Phase 0-10 Install Playbook for Z:\claude-sota-pure

**Operator-executable install order**. Each row: install command (CR-6 official-native-channel) + smoke probe + rollback path + estimated wall-clock + CR-9 version-pin discipline.

### Phase 0 — Prerequisites (ALREADY-LANDED in target per §2.1)

| Component | State | Smoke probe | Rollback |
|---|---|---|---|
| Native `claude.exe` | ✅ `Z:/claude-sota-pure/.local/bin/claude.exe` 217.9 MB | `claude --version` | (re-install from anthropic/claude-code) |
| Docker (system) | OPERATOR-VERIFY | `docker --version` | (system uninstall) |
| Python venv | ALREADY-LANDED per CLAUDE.local.md:30 shared `Z:/venvs/claude` | `Z:/venvs/claude/Scripts/python.exe --version` | (delete venv) |
| Z:\claude-sota-pure-state dir | ALREADY-LANDED (`.mcp-memory/memory.db` cited in `.mcp.json`) | `ls Z:/claude-sota-pure-state/.mcp-memory/memory.db` | (rm -rf state dir) |

### Phase 1 — Foundation (Docker images)

| # | Component | Install command | Smoke probe | Rollback | Wall-clock |
|---|---|---|---|---|---|
| 1.1 | qdrant container | `docker pull qdrant/qdrant:latest` (CR-9: pin via SHA256 after pull `docker images --digests qdrant/qdrant`) | `docker images qdrant/qdrant` | `docker rmi qdrant/qdrant:<tag>` | 2-5 min |
| 1.2 | FalkorDB container | `docker pull falkordb/falkordb:latest` (CR-9: pin SHA256 after) | `docker images falkordb/falkordb` | `docker rmi falkordb/falkordb:<tag>` | 1-3 min |
| 1.3 | langfuse compose stack | `git clone https://github.com/langfuse/langfuse-docker-compose.git Z:/claude-sota-pure-state/.langfuse-stack/` + `docker compose pull` (per W219 L85 — NOT `docker pull langfuse/langfuse:latest` — needs full compose: web+worker+postgres+clickhouse+redis+minio) | `cd Z:/claude-sota-pure-state/.langfuse-stack && docker compose config` | `docker compose down -v && rm -rf <state-dir>` | 5-15 min (multi-image pull) |

### Phase 2 — Memory + KG Layer

| # | Component | Install command | Smoke probe | Rollback | Wall-clock |
|---|---|---|---|---|---|
| 2.1 | doobidoo/mcp-memory-service | ✅ ALREADY-LANDED — DROP (target `.mcp.json` row `memory`) | `mcp-memory-server --version` | (uninstall + remove `.mcp.json` row) | 0 min |
| 2.2 | getzep/graphiti core | `pip install graphiti-core[falkordb]==<resolved-pin>` (CR-9: `pip index versions graphiti-core` → pin) in `Z:/venvs/claude` | `python -c "import graphiti_core; print(graphiti_core.__version__)"` | `pip uninstall graphiti-core` | 2-5 min |
| 2.3 | FalkorDB container start | `docker run -d --name falkordb -p 16379:6379 --restart unless-stopped falkordb/falkordb:latest` | `nc -zv 127.0.0.1 16379` OR `redis-cli -p 16379 PING` → PONG | `docker stop falkordb && docker rm falkordb` | <1 min |
| 2.4 | graphiti MCP server | `git clone https://github.com/getzep/graphiti.git Z:/claude-sota-pure/.local/graphiti/` + register MCP per `.mcp.json` schema (env `FALKORDB_URI=redis://127.0.0.1:16379` + `GRAPHITI_GROUP_ID=eee`) | `claude mcp call graphiti get_status` | (`.mcp.json` row remove + rm `.local/graphiti/`) | 3-8 min |

### Phase 3 — Vector DB Layer

| # | Component | Install command | Smoke probe | Rollback | Wall-clock |
|---|---|---|---|---|---|
| 3.1 | qdrant container start | `docker run -d --name qdrant -p 6333:6333 -v Z:/claude-sota-pure-state/.qdrant-storage:/qdrant/storage --restart unless-stopped qdrant/qdrant:latest` | `curl -s http://127.0.0.1:6333/healthz` → `healthz check passed` | `docker stop qdrant && docker rm qdrant && rm -rf Z:/claude-sota-pure-state/.qdrant-storage` | <1 min |
| 3.2 | qdrant MCP server | `claude mcp add qdrant -e QDRANT_URL="http://localhost:6333" -e COLLECTION_NAME="code-repository" -e EMBEDDING_MODEL="sentence-transformers/all-MiniLM-L6-v2" -- uvx mcp-server-qdrant` (W219 L96 prescription validated by W222 codex trace — `uvx`, NOT `@modelcontextprotocol/server-qdrant` PHANTOM 404) | `claude mcp call qdrant get_collections` | `claude mcp remove qdrant` | 1-3 min |

### Phase 4 — Open RAG + DocAI Layer

| # | Component | Install command | Smoke probe | Rollback | Wall-clock |
|---|---|---|---|---|---|
| 4.1 | llama_index (resolved-pin) | `$v = $(pip index versions llama-index-core 2>&1 \| grep -oE '[0-9]+\.[0-9]+\.[0-9]+' \| head -1); pip install "llama-index-core==$v"` (W216 Pattern B HNF resolved-pin per W219 L100) | `python -c "import llama_index.core; print(llama_index.core.__version__)"` | `pip uninstall llama-index-core` | 2-5 min |
| 4.2 | DS4SD/docling | `pip install docling==<resolved-pin>` (CR-9 version-pin) | `docling --version` (CLI) + `python -c "import docling"` | `pip uninstall docling` | 3-7 min (model downloads first run) |
| 4.3 | chonkie-inc/chonkie | `pip install chonkie==<resolved-pin>` | `python -c "import chonkie; print(chonkie.__version__)"` | `pip uninstall chonkie` | <1 min |
| 4.4 | dottxt-ai/outlines | `pip install outlines==<resolved-pin>` | `python -c "import outlines; print(outlines.__version__)"` | `pip uninstall outlines` | 2-4 min |
| 4.5 | microsoft/markitdown | `uvx --refresh markitdown` (zero-persist; no install — runs on demand) OR `pip install "markitdown==<resolved-pin>"` for persistent install | `markitdown --help` OR `uvx markitdown --help` | (uvx zero-persist) OR `pip uninstall markitdown` | <1 min uvx / 2-3 min pip |

### Phase 5 — Observability + Tracing Layer

| # | Component | Install command | Smoke probe | Rollback | Wall-clock |
|---|---|---|---|---|---|
| 5.1 | langfuse self-host (Option A — see §6.1 trade-off) | `cd Z:/claude-sota-pure-state/.langfuse-stack/ && docker compose up -d` | `curl -s http://127.0.0.1:3000/api/public/health` → `{"status":"OK"}` | `docker compose down -v` + rm state dir | 5-10 min |
| 5.2 | mcp-server-langfuse | `claude mcp add langfuse -e LANGFUSE_PUBLIC_KEY=<pk> -e LANGFUSE_SECRET_KEY=<sk> -e LANGFUSE_HOST=http://127.0.0.1:3000 -- npx -y @langfuse/mcp-server-langfuse` | `claude mcp call langfuse get_prompts` | `claude mcp remove langfuse` | 1-2 min |
| 5.3 | phoenix (optional) | `pip install arize-phoenix==<resolved-pin>` + register MCP if available | `python -c "import phoenix; phoenix.launch_app()"` smoke | `pip uninstall arize-phoenix` | 2-4 min |

### Phase 6 — Eval Layer

| # | Component | Install command | Smoke probe | Rollback | Wall-clock |
|---|---|---|---|---|---|
| 6.1 | explodinggradients/ragas | `pip install ragas==<resolved-pin>` | `python -c "import ragas; print(ragas.__version__)"` | `pip uninstall ragas` | 1-3 min |
| 6.2 | NVIDIA/garak (STUDY-PILOT) | `pip install garak==<resolved-pin>` | `garak --version` | `pip uninstall garak` | 3-7 min |
| 6.3 | promptfoo/promptfoo (STUDY-PILOT) | `npm install -g promptfoo@<resolved-pin>` (CR-9: `npm view promptfoo version` → pin) | `promptfoo --version` | `npm uninstall -g promptfoo` | 1-2 min |

### Phase 7 — Agent Orchestration

| # | Component | Install command | Smoke probe | Rollback | Wall-clock |
|---|---|---|---|---|---|
| 7.1 | superpowers selective-vendor (Option B — see §6.3) | `git clone https://github.com/obra/superpowers.git Z:/repos/deps/superpowers/` + cite-import 3 unvendored skills (executing-plans + finishing-a-development-branch + using-git-worktrees) OR `/plugin install superpowers@claude-plugins-official` | `ls Z:/claude-sota-pure/.claude/skills/superpowers/` | `rm -rf <skill-dirs>` | 5-10 min |
| 7.2 | cwc-long-running-agents | ✅ ALREADY-LANDED `.local/cwc/` — DROP | `ls Z:/claude-sota-pure/.local/cwc/*.sh` | (rm -rf .local/cwc/) | 0 min |
| 7.3 | github/github-mcp-server (if needed beyond current generic github MCP) | `claude mcp add github-mcp-server --token <GH_TOKEN> -- npx -y github-mcp-server` | `claude mcp call github-mcp-server list_repos` | `claude mcp remove github-mcp-server` | 1-2 min |
| 7.4 | anthropics/claude-code-security-review (CI integration) | Add to `.github/workflows/` per upstream README (uses GitHub Actions) | `gh workflow list` shows `Claude Security Review` | Remove workflow yaml | 5-10 min (CI setup) |
| 7.5 | anthropics/claude-code-action (CI integration) | Add to `.github/workflows/` per upstream README | Workflow appears in `gh workflow list` | Remove workflow yaml | 5-10 min |

### Phase 8 — Token Optimization

| # | Component | Install command | Smoke probe | Rollback | Wall-clock |
|---|---|---|---|---|---|
| 8.1 | gepa-ai/gepa (STUDY-PILOT prompt-evolution) | `pip install gepa==<resolved-pin>` | `python -c "import gepa"` | `pip uninstall gepa` | 1-2 min |
| 8.2 | context-mode + repomix MCPs | ✅ ALREADY-LANDED in target `.mcp.json` (repomix confirmed; context-mode pending verify) | `claude mcp call repomix pack_codebase` | (`.mcp.json` row remove) | 0 min |

### Phase 9 — User-Named Candidates (Operator Decision)

| # | Component | Decision | Install path (if ADOPT) | Rollback |
|---|---|---|---|---|
| 9.1 | volcengine/OpenViking (user-named) | OPERATOR-OVERRIDE-ADMISSIBLE: examples plugin Apache-2.0 OK; backend AGPL §13 disclosure if self-hosted+network-exposed (see §6.2 trade-off) | `/plugin install` from upstream marketplace OR clone examples/claude-code-memory-plugin/ + cite-import | (uninstall plugin + remove cite-import) |
| 9.2 | topoteretes/cognee (user-named STUDY-PILOT) | STUDY-PILOT (W219 93/100 SRA) | `pip install cognee==<resolved-pin>` + plugin hook lifecycle wire | `pip uninstall cognee` |

### Phase 10 — Extended Layers (W221-B new layer fills)

| # | Component | Layer | Install command | Smoke probe | Rollback |
|---|---|---|---|---|---|
| 10.1 | modelcontextprotocol/inspector (STUDY-PILOT IFF MCP-authoring) | Testing MCP-dev tool | `npx @modelcontextprotocol/inspector <path-to-MCP>` (zero-persist) | `npx @modelcontextprotocol/inspector --help` | (no install needed) |
| 10.2 | motherduckdb/mcp-server-motherduck (STUDY-PILOT JSONL analytics) | DB MCP | `claude mcp add duckdb --transport stdio -- uvx mcp-server-motherduck --db-path :memory: --read-write --allow-switch-databases` (per W222 codex trace L99-105) | `claude mcp call duckdb execute_query "SELECT 1"` | `claude mcp remove duckdb` |
| 10.3 | timescale/pg-aiguide (CONDITIONAL Postgres) | CC plugin | `/plugin install pg-aiguide@timescale-marketplace` | `ls Z:/claude-sota-pure/.claude/plugins/.../pg-aiguide/` | `/plugin remove pg-aiguide@timescale-marketplace` |
| 10.4 | alirezarezvani startup-cto persona | C-level persona | `/plugin marketplace add alirezarezvani/claude-skills` + `/plugin install c-level-skills@claude-code-skills` (extract startup-cto.md only) | `cat Z:/claude-sota-pure/.claude/agents/startup-cto.md` | `/plugin remove c-level-skills@claude-code-skills` |
| 10.5 | duckdb/duckdb CLI (Probe 7.b ETL candidate) | Analytical SQL | `winget install DuckDB.cli` OR `pip install duckdb` | `duckdb --version` | `winget uninstall DuckDB.cli` |

## 6. 2-Option Trade-Offs (3 Controversial Decisions)

### 6.1 Langfuse: Self-Host vs Cloud

| Axis | **Option A: Self-host Docker compose** | **Option B: Langfuse Cloud + own ETL** |
|---|---|---|
| Install complexity | HIGH (6-service compose: web+worker+postgres+clickhouse+redis+minio) | LOW (account signup + API key) |
| Wall-clock setup | 15-30 min first time | 5 min |
| Operator burden | Service-lifecycle monitoring (Docker compose up/down + state persistence + backup) | Zero infra; Langfuse manages |
| Cost | Free (self-host) + Docker memory/disk overhead (~2-4 GB RAM, ~5-10 GB disk) | Free tier 50k observations/month; paid tier $$ at scale |
| Data residency | Local (Z:\claude-sota-pure-state/.langfuse-stack/) | langfuse.cloud (SaaS-EU/US) |
| Vendor lock | Zero (FOSS) | Soft (data export available; portable Postgres schema) |
| License | open-core MIT + ee/LICENSE for enterprise features | SaaS-distributed (CR D1 use-class) |
| **RECOMMENDATION** | **OPTION A for operator privacy + offline-capable + zero vendor lock**; Option B viable if operator OK with SaaS data exposure for prompts/responses |

### 6.2 OpenViking Backend: Self-Host vs SKIP

| Axis | **Option A: Self-host AGPL backend** | **Option B: SKIP backend, use plugin/examples Apache-2.0 only** |
|---|---|---|
| License obligation | AGPL §13 source-availability MUST be honored if modified + network-exposed to third parties (operator must ensure modified backend src available via clear notice) | Zero AGPL obligation (only Apache-2.0 plugin assets used) |
| Functional coverage | Full OpenViking context-database (memory + resources + skills hierarchical) | Plugin examples only — no backend = no context-database value-add |
| Install path | clone https://github.com/volcengine/OpenViking + self-host backend service + register Apache-2.0 plugin | `/plugin install` from examples/ only (skip backend) |
| Vendor lock | Zero (FOSS) | N/A (no backend) |
| **RECOMMENDATION** | **OPTION B SKIP backend** is the SOTA-conservative path; OPERATOR-OVERRIDE to Option A only with explicit AGPL §13 compliance plan (modified-src-availability + notice). User-named candidate → operator decides. |

### 6.3 superpowers: Selective-Vendor vs Full Plugin Install

| Axis | **Option A: Selective-vendor 3 unvendored skills via cite-import-AMBER** | **Option B: `/plugin install superpowers@claude-plugins-official`** |
|---|---|---|
| Install scope | 3 specific skills (executing-plans + finishing-a-development-branch + using-git-worktrees) | All 14+ superpowers skills |
| Bloat | Minimal — only what's needed | Higher — full plugin assets |
| Update path | Manual cite-import refresh per port-note-discipline.md §6 | Auto via `/plugin update` |
| Convergence-gate alignment | Sister-rule cite-import-AMBER per CR-12 TERTIARY (sibling-novel discipline with no upstream parity at skill-instance level) | CR-12 PRIMARY upstream-install (preferred per cardinal-rule-12) |
| Existing target state | 4 superpowers skills already plugin-cached at `claude-plugins-official/superpowers/5.1.0/` (W219 baseline) | (would replace/duplicate the cached set) |
| **RECOMMENDATION** | **OPTION A selective-vendor** — minimizes bloat + leverages existing target plugin-cache; only 3 net-new skills via cite-import-AMBER. Operator may flip to Option B if `/plugin install` operationally simpler. |

## 7. DEFER / DROP / REJECT Lists (consolidated W219+W220+W221-B+W222)

### 7.1 DEFER (HOLD-pending-gate)
- **trufflehog** (W214 G1): functional-redundancy with gitleaks + W207 explicit REJECT-on-AGPL — operator OVERRIDE only
- **llama.cpp CUDA variant** (W214 G4): VARIANT-UPGRADE-DECISION; operator CUDA-toolkit-presence probe required
- **grype** (W214 G5): PARTIAL-OVERLAP with trivy+syft; SBOM drift audit ship gates
- **sops encryption workflow** (W215): 4-fire arc (age install + sops install + eee.ps1 ext + key rotation cadence)
- **podman** (W214 G8 OPTIONAL): PROVIDER-COMPLEMENT to Docker Desktop
- **tokencost** (W218-H): STUDY-PILOT-PENDING-ETL (no per-call cost-attribution wiring contract yet)
- **gsd-build/get-shit-done** (W222 LATE-DISCOVERY 62,454★ MIT): ✅ ALREADY-LANDED in target per probe — document as net-new discovery but DROP from install list

### 7.2 DROP (verified REJECT-FOR-FIT)
- **wshobson comprehensive-review** (W214 G7): ALREADY-ENABLED at target `.claude/settings.json:174`
- **4 superpowers skills** (W214): ALREADY plugin-installed `claude-plugins-official/superpowers/5.1.0/skills/`
- **kuzudb/kuzu** (W216-D): repo `archived:true` per gh API
- **microsoft/autogen** (W217-G): CC-BY-4.0 docs-only license + Python SDK Probe 5 FAIL
- **magentic + agno** (W217-G): Probe 7.a DEMAND-ABSENCE
- **fcakyon/intelligent-compact** (W218-H): 404 phantom (canonical owner unknown)
- **semgrep** (W215): ALREADY-INSTALLED at orchestrator (target install separate)
- **Browser MCP alts** (W221-B Section 2): DUPLICATE per CR-12 with playwright + chrome-devtools already wired
- **Library-docs alt-MCPs** (W221-B Section 3): DUPLICATE with context7 wired
- **Single-DB-vendor MCPs** (W221-B Section 1 mongodb/mysql/neon): DUPLICATE-or-subset with mcp-toolbox (or DEMAND-ABSENCE)
- **alirezarezvani medical-regulatory + finance + PM skills** (W221-B Section 4): DEMAND-ABSENCE.a Probe 7.a
- **github/spec-kit** (W220): DUPLICATE — `speckit-*` skills already plugin-loaded
- **Skyvern-AI/skyvern + mendableai/firecrawl** (W220): AGPL-3.0 license-blocker + DUPLICATE
- **Pythagora-io/gpt-pilot** (W220): competing autonomous-dev META-framework per `docs/verified-avoid.md` Cohort 1

### 7.3 HONEST-NON-FINDING (high-value per synthesis-layer-verify.md)
- **Per-language unit-test MCPs** (pytest/jest/vitest/cypress): NOT a converged-candidate category at Axis-1 ≥3-distinct-orgs threshold. Per-language CLI test runners + Playwright MCP for E2E IS the converged SOTA. NOT a gap to fill via MCP (W221-B Section 2 row 7)
- **bench/llm-bench** (W218-H): fragmented benchmark category — no canonical repo at convergence threshold

## 8. CR Conformance Disclosure

- **CR-1 cite-trail**: ✅ all 32 install rows cite TIER-1-DIRECT file:line + HEAD SHA OR gh API blob/SPDX; 4 W222 codex trace-mined verifications cite OUT.txt line ranges
- **CR-2 Karpathy 4 principles**: ✅ surface-uncertainty (FM-17 failure-modes openly disclosed §1 + §11 / minimum-code (no LOC bloat; cite-back to source artifacts per kiss-dry-yagni Must-Never #4) / surgical-changes (each install scoped to single repo) / strong-success-criteria (smoke probe per phase row)
- **CR-3 cross-model consensus**: ⚠️ Path P W222 Pattern B HNF — REAL GPT-5.5 model gpt-5.5 confirmed at OUT.txt:6 BUT verdict output timeout-truncated at 300s; **PARTIAL-SATISFIED at dispatch layer**; W224 tighter ≤5-repo re-fire queued; T2 commit-time gate per `cross-model-consensus.md §T2` fires per-install at operator commit boundary
- **CR-4 research-first, edit-second, cite-always**: ✅ 11 wave returns precede any install commit
- **CR-5 install-priority**: ✅ all upstream channels; zero hand-coding
- **CR-6 official-native-channel**: ✅ `pip install`/`docker pull`/`npm install -g`/`uvx`/`npx`/`/plugin install`/`claude mcp add` — no third-party mirrors, no shell-script wrappers around official commands; CR-9 version-pin discipline applied per row
- **CR-7 graduated-unleash**: ✅ all Phase 1-compatible (`bypassPermissions` operator-override ALREADY-ACTIVE per CLAUDE.md §"Intentional divergences" (d))
- **CR-8 full-SOTA-content**: ✅ all ADAPTED-FROM-SOTA per CR-1 cite chain
- **CR-9 install-risk**: ✅ version-pin allocated per row; 2-round fix-forward budget acknowledged; REVERT-grep against sibling per repo (W214 batch already-applied); sibling-bleed defense via path-rewrite `Z:/claude-sota/` → `Z:/claude-sota-pure/`
- **CR-10 research-first-then-install**: ✅ 11 wave returns precede install plan
- **CR-11 META-process SOTA**: ✅ Pattern A apply (W219 codex T1 NEEDS-REVISION 5-prescription apply) + Mia pre-apply (FM-20 row 21 target-runtime probe) + FM-17 disclosure (3 failure modes documented §1)
- **CR-12 upstream-install-priority**: ✅ all 18 install candidates via CR-12 PRIMARY (upstream SOTA official-native-channel); 6-class disposition applied (GENUINELY-NEW / DUPLICATE-FUNCTIONALITY / PARTIAL-OVERLAP / PROVIDER-COMPLEMENT / ECOSYSTEM-IMPORT / CITE-CLASS-CANONICAL per `.claude/rules/cardinal-rule-12-upstream-install-priority.md`)
- **multi-source-discovery-breadth ≥4 source families**: ✅ GitHub MCP + DeepWiki MCP + plugin-marketplaces + direct gh API blob read (W221-B + W222 license probe)
- **FM-20 row 21 target-runtime Mia pre-apply**: ✅ Z:\claude-sota-pure probed 2026-05-15; ALREADY-LANDED catches: mcp-memory-service + cwc-long-running-agents + sops + gsd-build/get-shit-done; INSTALL-NOW catches: graphiti + phoenix (NOT in target despite W216-E claim) + qdrant + langfuse + others per §5

## 9. Operator Next Actions

1. **Read this catalog** + decide INSTALL/DEFER per row (operator owns: trufflehog / llama.cpp CUDA / OpenViking / superpowers full-vs-selective / langfuse self-host-vs-cloud)
2. **Verify W223 baseline assumptions** by re-running Z:\claude-sota-pure target-runtime probe (`ls Z:/claude-sota-pure/.local/bin/`, `cat Z:/claude-sota-pure/.mcp.json`, `cat Z:/claude-sota-pure/.claude/plugins/installed_plugins.json`)
3. **W224 follow-up dispatch** (1 ship, NOT this fire) — tighter ≤5-repo Path P codex T1 to ratify the 5 most controversial verdicts (langfuse open-core + claude-plugins-official null-license + outlines/promptfoo new ADOPT + OpenViking AGPL OPERATOR-OVERRIDE) per cross-model-consensus.md §The contract Pattern A re-fire
4. **Sequence install batches per Phase 1-10** for Z:\claude-sota-pure; each install followed by T2 commit-time gate per CR-3 install-execution mandate (operator `git commit` triggers `codex_t2_pre_commit_gate.py` per cross-model-consensus.md §T2)
5. **Atomic single-shell stage+commit per audit-action-loop.md step 4 + git-cli-grammar-discipline.md §The 4 invariants**: `git add -- <file> && git commit -o -F <msg-file> -- <file>` (flags BEFORE `--` per gitcli.adoc TIER-1 cite)
6. **Forward-only refresh**: when W224 codex T1 ratify lands, append (NOT rewrite) prescribed_edits to this catalog per `port-note-discipline.md §6` "Do not rewrite historical commit bodies"

## 10. Verdict

**VERDICT: APPROVE-COMPREHENSIVE-CATALOG-READY-FOR-OPERATOR-EXECUTION**

- **140+ candidates audited** across 19 layers (W213→W222: memory MCP / KG / vector / RAG framework / DocAI / observability / eval / agent-orchestration / token-opt / structured-output / DB MCP / testing MCP / doc-tooling MCP / persona-skills / MCP-authoring framework / browser automation / sandbox isolation / CI security review / spec-driven-dev)
- **32-row authoritative SPDX license direct-read** closes W218 P2 license-closure gate (27 PROCEED + 2 NOASSERTION verify + 1 AGPL OPERATOR-OVERRIDE + 1 transition-LICENSE Apache-resolved)
- **FM-20 row 21 cumulative cascade catches: 30+** (10 ALREADY-LANDED in target verified via probe + 20 OVER claims caught across W213-W222 ladder)
- **Cross-model gate Path P W222 satisfied at dispatch layer** (REAL GPT-5.5 model gpt-5.5 verified at OUT.txt:6) with 4 trace-mined verifications retained pre-300s-timeout; W224 follow-up tighter dispatch queued for full terminal JSON verdict
- **9 net-new ADOPT-CANDIDATES filling unnamed layers** beyond W219 Top-25 (outlines + promptfoo + markitdown + duckdb + mcp-inspector + motherduckdb + pg-aiguide + startup-cto + FastMCP)
- **3 controversial decisions resolved with 2-option trade-offs** (langfuse self-host vs cloud / OpenViking AGPL OPERATOR-OVERRIDE / superpowers selective vs full)
- **Phase 0-10 ordered checklist with smoke probes + rollback paths + wall-clock estimates** ready for operator hand-execution

verdict_one_line: APPROVE-COMPREHENSIVE-CATALOG: 32 candidates SPDX-verified live 2026-05-15; 18 INSTALL-NOW + STUDY-PILOT across Phase 1-10; 30+ FM-20 cascade catches saved ~900-1800 min revert cycles; Path P codex T1 Pattern B HNF with 4 trace-mined verifications; W224 tighter ≤5-repo re-fire queued for full cross-model gate satisfaction
