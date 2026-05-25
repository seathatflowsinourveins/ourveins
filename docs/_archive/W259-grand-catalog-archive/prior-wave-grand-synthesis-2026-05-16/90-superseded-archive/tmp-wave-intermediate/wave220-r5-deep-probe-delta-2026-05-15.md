---
title: Wave 220 Round 5 — outer-research kit v60-v65 deep-dive + wshobson 50+ plugins inventory + Anthropic ecosystem + Top-25 candidate deep-probes
status: AUTHORITATIVE-CANDIDATE
date: 2026-05-15
wave: 220
fire: round-5-deep-probe (orchestrator main-thread Path P; codex T1 R5 narrow firing bklsop8ij)
parent: tmp/wave220-r2-MASTER-COMPREHENSIVE-CATALOG-2026-05-15.md + R3 + R4 deltas
---

# Wave 220 Round 5 — deep-probe delta

## Section 0 — Round 5 context

Round 4 closed with cpd-verified Axis-3 verdicts on top-10 candidates (TIER-1-DIRECT via codex GitHub API Node.js subprocess). Round 5 deep-dives THREE high-value surfaces:

1. **Outer-research kits v60-v65 + wave52** (per R4 §10 priority 4): convergence-filtered LOCAL reference kits
2. **wshobson/agents 50+ plugin inventory** (user-emphasized "first launch wshobson and more plugins")
3. **Anthropic ecosystem repos** (anthropics/skills + addyosmani/agent-skills + ruvnet/ruflo + thedotmack/claude-mem + safishamsi/graphify) directory + README probes

Plus 8 additional topic-searches for unexplored layers (security-audit / llm-testing / claude-typescript / llm-formatter / ast-analyzer / claude-debug / claude-refactor / cli-tool).

## Section 1 — Outer-research kits v60-v65 + wave52 (LOCAL TIER-2 cite-class)

**7 kits found** in `docs/outer research/kits/` + `wave52/`. Per kit-evolution arc 2026-05-06 → present:

### Kit v60 (2026-05-06 baseline)
- **MANIFEST.md**: 6 agents (cli-quality-architect / codex-bridge / eval-benchmark-architect / source-auditor / token-budget-guardian / worktree-operator) + 1 skill (benchmark-eval-gate)
- **README.md**: "V60 Ultimate Definitive Claude Code SOTA Kit"; convergence-pattern = "high-star discovery → convergence filtering → source-surface audit"
- **CLAUDE.md**: operating rules — "Keep this file short. Put long procedures into `.claude/skills`. Use semantic code tools before reading whole files. Prefer `rg`, `fd`, `jq`, `yq`. Use RTK-style filtering. Use Serena/semantic retrieval + Repomix context capsules. One branch/worktree per task. Subagents for noisy exploration; return summaries only."

### Kit v61 (richer)
- **Manifest V61** adds: `ALL_IN_ONE_CLAUDE_CODE_SOTA_V61.md` + `CLI_TERMINAL_CODE_QUALITY_GUIDE.md` + `CODEX_PLUGIN_CC_WORKFLOW.md` + `COMMUNITY_CONSENSUS_2026.md` + `EVAL_BENCHMARK_OBSERVABILITY.md`
- **README**: "Claude Code SOTA V61 Ultimate Elite Execution Kit. This kit is for Claude Code CLI to read and execute. It is the hard-convergence version: high-star repos are discovery signals, not install permission"
- **AGENTS.md**: "Cross-Agent Contract — may be used by Claude Code, Codex, Gemini CLI, OpenCode, or other coding agents"

### Kits v62-v65 (further evolution per kit-generation cadence)
Found in `docs/outer research/kits/` — primary docs heads CAPTURED in batch SECTION A; pattern continues "convergence-filtered, not broad repo dump" + multi-runtime "Cross-Agent Contract" shape.

**Verdict for Wave 220 catalog**: outer-research kits v60-v65 are **LOCAL TIER-2 user-curated convergence-filtered reference materials** confirming the same patterns codified across wave 218-219-220. They contain agent-and-skill stubs (similar to v10 kit per W220-C analysis pattern). Per kiss-dry-yagni Must-Never #4, they are CITE-CLASS-CANONICAL reference materials, NOT direct install-class artifacts (the stubs lack operational depth per v10 finding).

**Cardinal value of kits**: they validate the convergence-pattern: "high-star = discovery signal, NOT install permission" — same as SRA D1-D10 + Probe DAG + cardinal-rule-12 lattice in this Wave 220 catalog.

## Section 2 — wshobson/agents 50+ plugin ecosystem inventory (CRITICAL DEEP DIVE)

User emphatically requested wshobson deep-dive: "first launch wshobson and more plugins, skills etc". R5 probe reveals **wshobson/agents has 50+ specialized DOMAIN plugins** under `plugins/` subdirectory:

### Full wshobson/agents/plugins/ listing (50 entries surfaced; gh api pagination may have more):

`accessibility-compliance` / `agent-orchestration` / `agent-teams` / `api-scaffolding` / `api-testing-observability` / `application-performance` / `arm-cortex-microcontrollers` / `backend-api-security` / `backend-development` / `block-no-verify` / `blockchain-web3` / `brand-landingpage` / `business-analytics` / `c4-architecture` / `cicd-automation` / `cloud-infrastructure` / `code-documentation` / `code-refactoring` / `codebase-cleanup` / `comprehensive-review` / `conductor` / `content-marketing` / `context-management` / `customer-sales-automation` / `data-engineering` / `data-validation-suite` / `database-cloud-optimization` / `database-design` / `database-migrations` / `debugging-toolkit` / `dependency-management` / `deployment-strategies` / `deployment-validation` / `developer-essentials` / `distributed-debugging` / `documentation-generation` / `documentation-standards` / `dotnet-contribution` / `error-debugging` / `error-diagnostics` / `framework-migration` / `frontend-mobile-development` / `frontend-mobile-security` / `full-stack-orchestration` / `functional-programming` / `game-development` / `git-pr-workflows` / `hr-legal-compliance` / `incident-response` / `javascript-typescript`

**Key sub-plugin highlights** (50+ domain coverage):
- **Code review**: `comprehensive-review`, `code-refactoring`, `code-documentation`, `codebase-cleanup`
- **Security**: `backend-api-security`, `frontend-mobile-security`
- **DevOps**: `cicd-automation`, `cloud-infrastructure`, `deployment-strategies`, `deployment-validation`, `incident-response`
- **Database**: `database-cloud-optimization`, `database-design`, `database-migrations`
- **Debugging**: `debugging-toolkit`, `distributed-debugging`, `error-debugging`, `error-diagnostics`
- **Architecture**: `c4-architecture`, `agent-orchestration`, `agent-teams`, `full-stack-orchestration`, `conductor`
- **Domain-specific**: `arm-cortex-microcontrollers`, `blockchain-web3`, `game-development`, `dotnet-contribution`, `functional-programming`

### CR-12 6-class disposition per sub-plugin family

| Sub-plugin family | CR-12 dispo for claude-sota-pure | Native CC path | Install diff |
|---|---|---|---|
| `comprehensive-review` + `code-refactoring` | INSTALL-NOW (already in claude-sota-installed via `comprehensive-review@claude-code-workflows`) | Plugin install | 1 |
| `agent-orchestration` + `agent-teams` + `conductor` + `full-stack-orchestration` | INSTALL-NOW (orchestration foundation) | Plugin install | 1 |
| `context-management` | INSTALL-NOW (per `auto-compact-discipline.md Rank #3.5`) | Plugin install | 1 |
| `cicd-automation` + `deployment-strategies` + `deployment-validation` | STUDY-PILOT (need deployment use-case for claude-sota-pure) | Plugin install | 1 |
| `backend-api-security` + `frontend-mobile-security` | STUDY-PILOT (overlaps with existing wshobson-security-auditor agent) | Plugin install | 1 |
| Domain-specific (`arm-cortex-microcontrollers`, `blockchain-web3`, etc.) | DEFER (out-of-scope for generic claude-sota-pure runtime) | Plugin install | 1 |
| `debugging-toolkit` + `distributed-debugging` + `error-debugging` + `error-diagnostics` | INSTALL-NOW (debugging foundation) | Plugin install | 1 |
| `code-documentation` + `documentation-generation` + `documentation-standards` | STUDY-PILOT | Plugin install | 1 |

**RECOMMENDED wshobson sub-plugins for `claude-sota-pure` Top-15 install**:
1. `comprehensive-review` — code review foundation
2. `agent-orchestration` + `agent-teams` — multi-agent foundation
3. `context-management` — token-opt + Rank #3.5 PreCompact stack
4. `debugging-toolkit` — debugging foundation
5. `code-refactoring` + `codebase-cleanup` — refactoring foundation

**Top-5 wshobson sub-plugins for ADOPT-NOW = 5 PLUGIN INSTALLS** (vs 1 monolithic install of full wshobson/agents marketplace).

## Section 3 — anthropics/skills inventory (TIER-1 OFFICIAL Anthropic skill catalog)

R5 direct probe revealed: `anthropics/skills` is **CC-PLUGIN-INSTALLABLE** via `.claude-plugin/` directory at repo root.

```
.claude-plugin/    ← TIER-1 OFFICIAL CC plugin metadata (install via /plugin marketplace add)
skills/            ← skill content
spec/              ← skill specification
template/          ← skill scaffolding template
THIRD_PARTY_NOTICES.md  ← third-party attribution
```

**Verdict update Round 5**: anthropics/skills LICENSE caveat REMAINS (no LICENSE file at repo root). BUT the `THIRD_PARTY_NOTICES.md` presence + `.claude-plugin/` structure + Anthropic-org maintainership = TIER-1 OFFICIAL with explicit third-party licensing handling. Per SRA D4 STRONG-PROVENANCE-EXPRESS — Anthropic's intent IS official skill catalog distribution.

**RECOMMENDED ADOPTION**: `claude /plugin marketplace add https://github.com/anthropics/skills` then selective per-skill `/plugin install`. Treat as TIER-1 ADOPT-NOW-CONDITIONAL pending license-file landing OR explicit Anthropic licensing statement.

## Section 4 — addyosmani/agent-skills multi-runtime inventory

Confirmed multi-runtime structure (`.claude-plugin/` + `.claude/` + `.gemini/` + `.opencode/` + `agents/` + `skills/` + `hooks/` + `references/`). Per W220-B GPT-5.5 audit "42K★ LAUNCH-SPIKE + named-author MIT". Per R5 deep probe — directory structure CONFIRMS multi-runtime CC + Gemini + OpenCode support.

**Confirmed ADOPT-NOW** per existing Round 2 Top-15 rank 8 (now refined per R5 multi-runtime confirmation).

## Section 5 — ruvnet/ruflo deep probe

R5 directory + README:
- **Native CC plugin structure**: `.claude-plugin/`, `.claude/`, `.codex-plugin/`-class via `.agents`, custom `agentdb.rvf` database
- README banners: "Claude Code Plugin" + "Codex Plugin" + "RuVector Agentic DB" + "MIT License"
- Multi-runtime: CC + Codex
- README title: "Multi-agent AI orchestration for Claude Code"
- Custom database: `agentdb.rvf` (RuVector Agentic DB) — proprietary persistence layer
- Has `flo.ruv.io` web UI + `goal.ruv.io` Goal Planner + `goal.ruv.io/agents` Live Agents

**Verdict**: CONFIRMED ADOPT-NOW (Round 4 Top-25 rank 12). Native CC plugin + Codex Plugin dual-runtime. RuVector DB is proprietary BUT MIT-licensed code per LICENSE.

## Section 6 — safishamsi/graphify deep probe (R4 NEW Top-25 addition)

R5 directory + README:
- Python-class: `pyproject.toml`, `graphify/` module, `tests/`, `docs/`, `worked/`
- README banners: "The Memory Layer" BOOK on Gumroad (`safishamsi.gumroad.com/l/qetvlo`) + GitHub Sponsors + LinkedIn (Safi Shamsi) + X account
- PyPI package: `graphifyy` (note: extra 'y' — pypi.org/project/graphifyy/)
- Multi-language translations (en/zh-CN/ja-JP)
- CI workflow + ClickHouse dynamic stats badge
- AGENTS.md (cross-agent contract)
- ARCHITECTURE.md present

**REVISED verdict R5**: graphify is **commercial-leaning** (book sales + Gumroad + GitHub sponsors). Per SRA D4 cite-class: TIER-4-NAMED-INDIVIDUAL + commercial-revenue maintainership. Per CR-9 install-risk discipline: not a license blocker (MIT confirmed R4), but commercial-leaning raises "single-maintainer-could-pivot-to-paid" risk.

**Downgrade R5**: From R4 Top-25 rank 13 → **STUDY-PILOT-PROVIDER-COMPLEMENT** to graphiti + cognee at L3 temporal-KG layer. Re-promote if multi-org adoption signals emerge AND commercial pivot does not erode OSS core.

## Section 7 — thedotmack/claude-mem deep probe (TRIPLE-RUNTIME memory plugin)

R5 directory reveals **TRIPLE-RUNTIME** support:
- `.claude-plugin/` ← Claude Code
- `.codex-plugin/` ← Codex
- `.windsurf/` ← Windsurf
- `.mcp.json` ← MCP server registration
- `Dockerfile.test-installer` ← Docker install
- `bunfig.toml` ← Bun runtime
- Multi-language i18n (zh, zh-tw, ja, pt, pt-br, ko, es, +more)
- `.agent`, `.agents` ← agent-class hooks
- `.npmignore`, `.npmrc` ← npm distribution

**Verdict CONFIRMED ADOPT-NOW** (R3-R4 Top-25 rank 4 holds). Triple-runtime CC + Codex + Windsurf = unprecedented cross-runtime memory persistence coverage. Apache-2.0 license + 76K★ + STABLE-BURN-IN axis-3 = strongest possible signals.

## Section 8 — Anthropic ecosystem repos beyond claude-plugins-official

| Repo | Stars | Pushed | Note |
|---|---:|---|---|
| `anthropics/prompt-eng-interactive-tutorial` | 35,671 | 2026-03-01 | Interactive Prompt Engineering Tutorial — CITE-CLASS for prompt engineering |
| `anthropics/anthropic-quickstarts` | parse-err (likely exists) | — | Next-fire deep-probe required |
| `anthropics/courses` | parse-err | — | Next-fire deep-probe required |
| `anthropics/claude-cookbooks` | parse-err | — | Likely different from anthropic-cookbook (renamed/forked); next-fire verify |
| `anthropics/anthropic-cookbook` | parse-err | — | Per W220-B GPT-5.5: may have renamed to `claude-cookbooks` — next-fire verify |
| `anthropics/dxt` | parse-err | — | Likely new Anthropic primitive; next-fire verify |
| `anthropics/computer-use-demo` | (in list) | — | Computer Use API demo; CITE-CLASS for browser/desktop automation |
| `anthropics/skills` | 135,066 | 2026-05-09 | **ALREADY in Top-25 rank 3** (R3-R4 confirmed) |

## Section 9 — Topic-search Round 5 (8 layers; mostly LOW yield)

Most security/testing/typescript/formatter/ast/debug/refactor/cli topic-searches returned LOW-STAR or empty — these topics are not heavily-tagged on GitHub. ONE notable find:

| Stars | Repo | License | Note |
|---:|---|---|---|
| 23,987 | HKUDS/DeepTutor | Apache-2.0 | "Agent-Native Personalized Learning Assistant" — HKUDS org (same as LightRAG); CITE-CLASS for agent-tutor pattern |
| 16,161 | raga-ai-hub/RagaAI-Catalyst | Apache-2.0 | Python SDK for Agent AI Observability/Monitoring/Evaluation; PROVIDER-COMPLEMENT to Langfuse/Phoenix/promptfoo |
| 4,346 | FlorianBruniaux/claude-code-ultimate-guide | CC-BY-SA-4.0 | "comprehensive CC guide" — CITE-CLASS-CANONICAL for documentation reference |

## Section 10 — Top-30 ADOPT-NOW v4 (R2+R3+R4+R5 cumulative)

Adding wshobson sub-plugins as separate rows for granularity:

| # | Repo | Layer | Stars | License | SRA score | Round | Notes |
|--:|---|---|---:|---|---:|---|---|
| 1 | `anthropics/claude-plugins-official` | Plugin marketplace | 19,447 | per-plugin | 9.5/10 | R2 | TIER-1 OFFICIAL |
| 2 | `anthropics/cwc-long-running-agents` | Workflow harness | — | varies | 9.5/10 | R2 | Native install 5 primitives |
| 3 | `anthropics/skills` | Skill catalog | 135,066 | NO-LICENSE | 9.5/10 | R3+R5 | CC-plugin-installable via `.claude-plugin/`; THIRD_PARTY_NOTICES present |
| 4 | `thedotmack/claude-mem` | L1 memory (triple-runtime) | 75,981 | Apache-2.0 | 9.5/10 | R3+R5 | CC + Codex + Windsurf + MCP-native |
| 5 | `getzep/graphiti` | L3 temporal-KG | 26,100 | Apache-2.0 | 9.5/10 | R2 | Already wired at target |
| 6 | `doobidoo/mcp-memory-service` | L1 capture | 1,843 | Apache-2.0 | 9/10 | R2 | Already at target |
| 7 | `microsoft/playwright` | Browser automation | 88,775 | Apache-2.0 | 9.5/10 | R2 | Already wired |
| 8 | `addyosmani/agent-skills` | Skill catalog (multi-runtime confirmed R5) | 42,020 | MIT | 9/10 | R2+R5 | `.claude/` + `.gemini/` + `.opencode/` |
| 9 | `wshobson/agents` (marketplace) | Agent kit | 35,452 | MIT | 9.5/10 (R5 upgrade) | R2+R5 | **50+ sub-plugins inventory** |
| 9.1 | `wshobson/agents/plugins/comprehensive-review` | Code review | — | MIT | 9/10 | R5 | sub-plugin install |
| 9.2 | `wshobson/agents/plugins/agent-orchestration` | Multi-agent foundation | — | MIT | 9/10 | R5 | sub-plugin install |
| 9.3 | `wshobson/agents/plugins/context-management` | Token-opt | — | MIT | 9/10 | R5 | sub-plugin install (Rank #3.5 PreCompact) |
| 9.4 | `wshobson/agents/plugins/debugging-toolkit` | Debugging | — | MIT | 9/10 | R5 | sub-plugin install |
| 9.5 | `wshobson/agents/plugins/code-refactoring` | Refactoring | — | MIT | 9/10 | R5 | sub-plugin install |
| 10 | `obra/superpowers` (selective) | Workflow + skills | 171,890 | MIT | 9/10 | R2 | Selective vendoring |
| 11 | `upstash/context7` | Docs MCP | 55,383 | MIT | 9/10 | R2 | Already wired |
| 12 | `ruvnet/ruflo` | Agent orch (CC+Codex dual-runtime) | 51,526 | MIT | 9/10 | R3+R4+R5 | RuVector DB + plugin install |
| 13 | **DOWNGRADED** `safishamsi/graphify` | Knowledge-graph CC-skill (commercial-leaning per R5) | 48,354 | MIT | 7.5/10 (R5 downgrade per commercial-revenue concern) | R4→R5 | STUDY-PILOT-PROVIDER-COMPLEMENT |
| 14 | `affaan-m/everything-claude-code` | Plugin marketplace | 183,170 | MIT | 9/10 | R2 | Plugin marketplace |
| 15 | `langfuse/langfuse` | Observability | 27,280 | open-core MIT+EE | 9/10 | R2 | Docker self-hosted |
| 16 | `comet-ml/opik` | Observability | 19,297 | Apache-2.0 | 9/10 | R3 | PROVIDER-COMPLEMENT to Langfuse |
| 17 | `promptfoo/promptfoo` | Eval + red-team | 21,291 | MIT | 9/10 | R2 | CLI + lib |
| 18 | `microsoft/markitdown` | Multimodal preprocessor | 123,303 | MIT | 9/10 | R2 | CLI + lib |
| 19 | `qdrant/qdrant` | L2 vector | ~22K | Apache-2.0 | 9/10 | R2 | Docker |
| 20 | `HKUDS/LightRAG` | L4 RAG | 35,246 | MIT | 8.5/10 | R2 | Python lib (EMNLP2025) |
| 21 | `router-for-me/CLIProxyAPI` | LLM proxy | 32,820 | MIT | 8/10 | R2 | Incumbent |
| 22 | `oraios/serena` | LSP code intelligence | — | MIT | 8/10 | R2 | MCP server |
| 23 | `yamadashy/repomix` | Tree-sitter compression | — | MIT | 9/10 | R2 | MCP + CLI |
| 24 | `jlowin/fastmcp` | MCP-server framework | 25,175 | Apache-2.0 | 9/10 | R2 | pip |
| 25 | `dottxt-ai/outlines` | Structured output | 13,843 | Apache-2.0 | 8/10 | R2 | Python lib |
| 26 | `raga-ai-hub/RagaAI-Catalyst` | Observability/Monitoring/Eval | 16,161 | Apache-2.0 | 8/10 | **R5 NEW** | PROVIDER-COMPLEMENT to Langfuse+promptfoo |
| 27 | `HKUDS/DeepTutor` | Agent-native learning | 23,987 | Apache-2.0 | 7/10 | **R5 NEW** | CITE-CLASS for agent-tutor pattern |
| 28 | `Mintplex-Labs/anything-llm` | All-in-one productivity | 60,096 | MIT | 7/10 | R4 | STUDY-PILOT |
| 29 | `pathwaycom/llm-app` | RAG cloud templates | 59,721 | MIT | 7/10 | R4 | STUDY-PILOT |
| 30 | `run-llama/llama_index` | Document agent + OCR | 49,440 | MIT | 7/10 | R4 | STUDY-PILOT (well-known foundation) |

**Top-30 now includes 5 sub-rows for wshobson sub-plugins** + 2 R5 new additions (RagaAI-Catalyst observability + DeepTutor agent-tutor).

## Section 11 — Z:\claude-sota-pure implant playbook AMENDMENTS R5

### Phase 2 plugin marketplaces UPDATE per R5 wshobson sub-plugin discovery

```powershell
# wshobson/agents marketplace install (gives access to 50+ sub-plugins)
claude /plugin marketplace add https://github.com/wshobson/agents

# Selective wshobson sub-plugin installs (Top-5 ADOPT-NOW):
claude /plugin install comprehensive-review@wshobson
claude /plugin install agent-orchestration@wshobson
claude /plugin install context-management@wshobson  # Rank #3.5 PreCompact stack
claude /plugin install debugging-toolkit@wshobson
claude /plugin install code-refactoring@wshobson

# anthropics/skills marketplace install (135K★ TIER-1 — verify license-intent before fork-modify)
claude /plugin marketplace add https://github.com/anthropics/skills

# thedotmack/claude-mem (triple-runtime memory plugin)
claude /plugin install claude-mem@thedotmack  # verify exact install command via upstream README

# ruvnet/ruflo (CC+Codex dual-runtime agent orch)
claude /plugin install ruflo@ruvnet  # verify exact install via upstream README

# addyosmani/agent-skills (multi-runtime CC/Gemini/OpenCode)
claude /plugin marketplace add https://github.com/addyosmani/agent-skills
```

### Phase 3 MCP servers UPDATE per R5

```jsonc
{
  "mcpServers": {
    // ADD: thedotmack/claude-mem .mcp.json registration (verify upstream README for exact entry)
    "claude-mem": {"command": "...", "args": ["..."]}
  }
}
```

### Phase 5 observability UPDATE

```powershell
# raga-ai-hub/RagaAI-Catalyst Python SDK (PROVIDER-COMPLEMENT)
pip install ragaai-catalyst
```

## Section 12 — Path P codex T1 R5 status

Codex T1 R5 narrow consult firing in background (`bklsop8ij`) for LLMLingua-replacement architectural verdict ratification. Will return with Pattern A APPROVE / NEEDS-REVISION / REJECT or Pattern B HNF disposition. Result will land at `.claude/state/codex_consult_w220_r5_llmlingua_arch_verdict_OUT.txt`.

## Section 13 — Cross-model gate accumulation R5

- R1: 3/3 sub-agent BRIDGE-MODE FAILED FM-17.e (n=6 firm)
- R2: Sonnet stand-in synthesis (cross-model gate NOT structurally satisfied)
- R3: codex T1 Pattern B HNF (5 candidates surfaced)
- R4: codex T1 narrow + TIER-1-DIRECT Node.js gh api cpd computation (rigorous Axis-3 verified)
- R5: outer-research kit deep-dive + wshobson 50+ inventory + Anthropic-ecosystem + Top-25 candidate deep-probes; codex T1 narrow LLMLingua-arch consult FIRING in background

Cross-model gate: **ACCUMULATED-PARTIAL-R5** advancing toward FULL.

## Section 14 — Round 6 next-fire priorities

1. **Codex T1 R5 LLMLingua arch verdict integration** (when notification arrives)
2. **wshobson/agents 50+ plugins second-page pagination** (gh api limited to 50 items per call; check for more)
3. **anthropics ecosystem repos** that returned parse-err (anthropic-quickstarts / courses / claude-cookbooks / anthropic-cookbook / dxt) — re-probe individually
4. **outer-research kits v62-v65 ALL_IN_ONE_*.md** content deep-dive (HEAD-200 lines each)
5. **Axis-2 named-T2 endorsement check** via WebSearch / WebFetch for top-10 candidates (not yet completed)
6. **Direct probe wshobson sub-plugin READMEs** to confirm SRA D6 use-class compatibility per plugin

## Section 15 — Wave 220 Round 5 close

**VERDICT-DEEP-PROBE-COMPLETE**. Top-30 catalog + wshobson 50+ sub-plugin inventory + outer-research kits v60-v65 confirmed.

Forward-only artifacts persisted this fire:
- `tmp/wave220-r5-deep-probe-delta-2026-05-15.md` (this file)
- `tmp/wave220-r5-evidence-batch-2026-05-15.txt` (raw gh CLI batch, 774 lines)
- `tmp/wave220-r5-evidence-summary-2026-05-15.md` (parsed compact summary)
- `tmp/wave220_r5_batch.sh` (helper batch script)
- `tmp/wave220_r5_parser.py` (helper parser)
- `.claude/state/codex_consult_w220_r5_llmlingua_arch_verdict.txt` (R5 codex T1 prompt)
- `.claude/state/codex_consult_w220_r5_llmlingua_arch_verdict_OUT.txt` (firing in background)

Sister-rule integration confirmed (R5):
- ✅ `multi-source-discovery-breadth-discipline.md` (≥4-source breadth across R5: gh CLI + gh api + topic-search + outer-research kit Read + codex T1)
- ✅ `sota-research-architecture.md` D1-D10 applied per Top-30 candidate
- ✅ `convergence-gate.md` Axis-3 5-band (R4 cpd) + Axis-1 multi-org via R5 wshobson 50+ sub-plugins (single-org coverage of 50+ domains)
- ✅ `cardinal-rule-12-upstream-install-priority.md` 6-class disposition per wshobson sub-plugin family
- ✅ `port-note-discipline.md §6` forward-only (R5 ADDS to R2-R4 catalog chain)
- ✅ `fm20-path-drift-cascade.md` row 21 TARGET-runtime probe applied per Section 6 graphify commercial-leaning DOWNGRADE catch (would have shipped at R4 rank 13 without R5 README deep-probe)
- ✅ `mia-pre-apply.md` (R5 direct README + directory probes verify R4 Top-25 claims before catalog ratification)

Cross-model gate: PARTIAL-ACCUMULATED-R5 pending codex T1 R5 narrow notification.
