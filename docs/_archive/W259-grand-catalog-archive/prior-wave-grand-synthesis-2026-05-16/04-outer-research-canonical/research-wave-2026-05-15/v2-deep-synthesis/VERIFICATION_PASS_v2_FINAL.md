---
title: Verification Pass v2 FINAL — Wave 3A Delta + Pattern A Fix-Forward
date: 2026-05-16
parent_docs:
  - ULTIMATE_SOTA_RUNTIME_DESIGN.md (v2 master)
  - COMPREHENSIVE_SCORING_MATRIX_v2.md (15-dim per-repo)
  - PER_CATEGORY_HEAD_TO_HEAD_v2.md (head-to-head)
  - WAVE3A-SOURCE-DEEP-DIVE-2026-05-16.md (5-repo deep-dive)
status: AUTHORITATIVE FINAL
---

# Verification Pass v2 FINAL — Wave 3A Delta Applied

> **What this doc records**: the Wave 3A agent (single-dispatch, serial — respected rate limits) deep-dove 5 priority repos and surfaced 1 critical license blocker. Pattern A fix-forward applied across v2 files. This doc summarizes the deltas and the final state.

---

## Section 1 — Wave 3A delta summary (5 repos verified via source-code probes)

| Repo | v1 Grand Catalog | v2 Pre-Wave-3A | Wave 3A VERIFIED | Net Delta |
|------|-------------------|------------------|-------------------|-----------|
| **thedotmack/claude-mem** (75,999★) | STUDY-PILOT-FAV (Probe 4-6 queued) | STUDY-PILOT-FAV-HIGH-PRIORITY (Wave 3A queued) | **ADOPT-NOW-CONDITIONAL** (Apache-2.0 VERIFIED + Tier-S `.claude-plugin/marketplace.json` VERIFIED + 5 lifecycle hooks + Probe 5 CLEAR) | ✅ **PROMOTE** to ADOPT (with 30-day A/B vs current Memory Stack) |
| **JuliusBrussee/caveman** (60,743★) | STUDY-PILOT-FAVORABLE (Probe 5 verify) | STUDY-PILOT-FAV (Probe 5 verify) | **ADOPT-NOW** (MIT VERIFIED + reproducible 65% benchmark VERIFIED + Probe 5 CLEAR + arXiv 2604.00025 reinforcement) | ✅ **PROMOTE** to ADOPT |
| **langfuse/langfuse** (27,283★) | ADOPT-NOW (NEW v2 Layer 7) | ADOPT-NOW | **STUDY-PILOT-FAVORABLE** (MIT VERIFIED but heavy self-host: Postgres+ClickHouse+Redis+Blob; Cloud-pilot first; NO direct CC plugin) | ⚠️ **DOWNGRADE** ADOPT → STUDY-PILOT (Cloud-first) |
| **mksglu/context-mode** (14,826★) | ADOPT-NOW (Phase 4 token-eff, score 88) | ADOPT-NOW Phase 4 (score 94) | **❌ REJECT-FOR-FIT** (Elastic License 2.0 NOT permissive; D3=0 Probe 6 LICENSE blocker; license-key gated + anti-SaaS) | ❌ **FLIP** ADOPT → REJECT-FOR-FIT |
| **mnfst/manifest** (6,496★) | STUDY-PILOT-FAVORABLE (NEW v2 Layer 8) | STUDY-PILOT-FAVORABLE | **STUDY-PILOT-NARROW** (MIT VERIFIED + MNFST Inc org-backed but **FAST-CHURN-BAND** age<100d cpd-high; npm DEPRECATED; **70% cost claim UNVERIFIED Row-2** caveat) | ⚠️ **NARROW** STUDY-PILOT-FAVORABLE → STUDY-PILOT-NARROW (re-audit 2026-q4) |

**Wave 3A conviction rate**: 4/5 verdicts STAND or STRENGTHEN; 1/5 FLIPS due to license discovery.

---

## Section 2 — Critical correction (Pattern A fix-forward)

### mksglu/context-mode license flip — the LOAD-BEARING catch

**Before Wave 3A**: v1 Grand Catalog + v2 catalog + v2 head-to-head + v2 matrix all listed context-mode as **ADOPT-NOW** with score 88-94 based on the impressive 98% tool-output sandbox claim + Tier-2-strong-PASS benchmark methodology cite (BENCHMARK.md with 21 fixtures + repro instructions per `convergence-gate.md §Anti-pattern Row-2`).

**Wave 3A direct LICENSE probe**: verbatim L1 of LICENSE file reads:

> `Elastic License 2.0 (ELv2) Copyright 2026 Mert Koseoglu`

**ELv2 explicit restrictions** (verbatim):
- "You may not provide the software to third parties as a hosted or managed service"
- "You may not move, change, disable, or circumvent the license key functionality"

**Cardinal-rule trigger**: per `convergence-gate.md` D3 rubric: "AGPL/GPL=2 / **ELv2/SSPL/proprietary=0**" + per `agent-harness-fit-verification.md §Probe 6` direct-file LICENSE blocker. License-key gating is also Probe 5 mode-harness-shape HARD-GATE per FM-05.

**Pattern A FIX-FORWARD applied** (per `codex-t1-fix-forward-pattern.md §Pattern A`):

| File | Edit applied |
|------|--------------|
| `ULTIMATE_SOTA_RUNTIME_DESIGN.md` Layer 7 row 7.4 | Score → REJECT; install path → ADAPT-PATTERN only |
| `ULTIMATE_SOTA_RUNTIME_DESIGN.md` Section 11 Phase 4 install commands | Replace `/plugin install context-mode` with `chopratejas/headroom` (MIT alternative at same layer) |
| `ULTIMATE_SOTA_RUNTIME_DESIGN.md` Section 12 Top-50 rank 30 | Flipped to REJECT-FOR-FIT marker |
| `COMPREHENSIVE_SCORING_MATRIX_v2.md` Layer 5 row | Score columns D3=0, D4=0, D9=0, D10=0; aggregate REJECT-FOR-FIT |
| `COMPREHENSIVE_SCORING_MATRIX_v2.md` Layer 4 thedotmack row | Score promoted 89 → 91; Wave 3A verification cited |
| `COMPREHENSIVE_SCORING_MATRIX_v2.md` Layer 5 caveman row | Score promoted 90 → 92; benchmark VERIFIED inline |
| `COMPREHENSIVE_SCORING_MATRIX_v2.md` Layer 7 langfuse row | Score 86 → 82; heavy self-host caveat |
| `COMPREHENSIVE_SCORING_MATRIX_v2.md` Layer 8 manifest row | Score 78 → 74; FAST-CHURN-BAND + npm-deprecated caveats |
| `PER_CATEGORY_HEAD_TO_HEAD_v2.md` §3 Token-opt matrix | context-mode row flipped REJECT; caveman row promoted ADOPT-NOW |
| `PER_CATEGORY_HEAD_TO_HEAD_v2.md` §3 stacked-savings diagram | context-mode replaced with chopratejas/headroom in composition stack |

**Replacement for context-mode in 6-primitive token-eff stack**:
- **chopratejas/headroom** (1,759★ — MIT verified at v2 matrix; 60-95% on tool outputs/logs/RAG chunks) — sister functionality at MCP-server shape
- **yvgude/lean-ctx** (1,669★ — MIT; 60-95% with 99% on cached reads; Rust binary + Shell Hook + MCP) — cross-runtime alternative

---

## Section 3 — Final Top-50 ranking (post-Wave-3A)

| Rank | Score | Repo | Layer | Verdict | Action |
|------|-------|------|-------|---------|--------|
| 1 | 97 | anthropics/claude-plugins-official | 1 | ADOPT-NOW | INSTALL |
| 2 | 97 | anthropics/skills (135,158★) | 1+2 | ADOPT-NOW | INSTALL |
| 3 | 97 | **obra/superpowers (192,855★ verified)** | 2 | ADOPT-NOW | INSTALL |
| 4 | 95 | modelcontextprotocol/servers (85,714★) | 1+5 | ADOPT-NOW | INSTALL |
| 5 | 94 | anthropics/cwc-long-running-agents | 1+3 | ADOPT-NOW | INSTALL |
| 6 | 94 | anthropics/claude-agent-sdk-python | 1 | ADOPT-NOW | INSTALL |
| 7 | 94 | openai/codex CLI | 1+3+8 | ADOPT-NOW | INSTALL |
| 8 | 94 | yamadashy/repomix | 5+6 | ADOPT-NOW | INSTALL |
| 9 | 93 | addyosmani/agent-skills (42,097★) | 2 | ADOPT-NOW | INSTALL |
| 10 | 93 | github/github-mcp-server (29,868★) | 1+5 | ADOPT-NOW | INSTALL |
| 11 | 92 | **JuliusBrussee/caveman (60,743★ Wave 3A VERIFIED)** | 5 | **ADOPT-NOW** | **INSTALL** |
| 12 | 92 | oraios/serena (24,271★) | 5+6 | ADOPT-NOW | INSTALL |
| 13 | 92 | openai/codex-plugin-cc | 1+8 | ADOPT-NOW | INSTALL |
| 14 | 92 | wshobson/agents (granular, 35,459★) | 2+3 | ADOPT-NOW | INSTALL granular |
| 15 | 92 | rtk-ai/rtk (48,553★) | 5 | ADOPT-NOW | INSTALL |
| 16 | 91 | **thedotmack/claude-mem (75,999★ Wave 3A VERIFIED Apache-2.0+Tier-S)** | 4 | **ADOPT-NOW-CONDITIONAL** | **INSTALL** (30-day A/B vs Memory Stack) |
| 17 | 91 | ralph-loop @ claude-plugins-official | 3 | ADOPT-NOW | INSTALL |
| 18 | 91 | agent-sdk-dev @ claude-plugins-official | 3 | ADOPT-NOW | INSTALL |
| 19 | 90 | semgrep/semgrep MCP | 5+9 | ADOPT-NOW | INSTALL |
| 20 | 90 | modelcontextprotocol/python-sdk (23,018★) | 1 | ADOPT-NOW | INSTALL |
| 21 | 89 | ChromeDevTools/chrome-devtools-mcp (39,715★) | 5.B | ADOPT-NOW | INSTALL |
| 22 | 89 | modelcontextprotocol/inspector | 1 | ADOPT-NOW | INSTALL dev-time |
| 23 | 88 | getzep/graphiti v0.29.0 (25,800★) | 4 | ADOPT-NOW | INSTALL |
| 24 | 88 | microsoft/playwright-mcp | 5.B | ADOPT-NOW | INSTALL |
| 25 | 88 | promptfoo/promptfoo (21,290★) | 7 | ADOPT-NOW | INSTALL |
| 26 | 88 | anthropics/claude-agent-sdk-typescript | 1 | ADOPT-NOW (if TS) | INSTALL |
| 27 | 88 | biomejs/biome | 9 CLI | ADOPT-NOW | INSTALL |
| 28 | 88 | BurntSushi/ripgrep | 9 CLI | ADOPT-NOW | INSTALL preinstalled |
| 29 | 88 | jqlang/jq | 9 CLI | ADOPT-NOW | INSTALL |
| 30 | 88 | cli/cli (gh) | 9 CLI | ADOPT-NOW | INSTALL |
| 31 | 88 | astral-sh/uv | 9 CLI | ADOPT-NOW | INSTALL |
| 32 | 88 | astral-sh/ruff | 9 CLI | ADOPT-NOW | INSTALL |
| 33 | 86 | doobidoo/mcp-memory-service (1,843★) | 4 | ADOPT-NOW | INSTALL |
| 34 | 86 | langfuse/langfuse (27,283★) | 7 | **STUDY-PILOT-FAV** (Wave 3A: Cloud-first; heavy self-host) | **CLOUD-PILOT FIRST** |
| 35 | 86 | ast-grep/ast-grep (~40k★) | 6 | ADOPT-NOW | INSTALL CLI (not phantom MCP) |
| 36 | 86 | gitleaks/gitleaks | 9 | ADOPT-NOW | INSTALL |
| 37 | 86 | pre-commit/pre-commit | 9 CLI | ADOPT-NOW | INSTALL |
| 38 | 86 | ryoppippi/ccusage | 5+7 | ADOPT-NOW | INSTALL |
| 39 | 86 | anthropics/claude-code-action | 1 | ADOPT-NOW | INSTALL CI |
| 40 | 86 | anthropics/claude-code-security-review | 1+9 | ADOPT-NOW | INSTALL CI |
| 41 | 86 | dandavison/delta | 9 CLI | ADOPT-NOW | INSTALL |
| 42 | 85 | upstash/context7 (55,388★) | 5.B | ADOPT-NOW | INSTALL |
| 43 | 85 | github/codeql-action | 9 | ADOPT-NOW | INSTALL CI |
| 44 | 85 | safishamsi/graphify (48,374★) | 6 | STUDY-PILOT-FAV | ADAPT-PATTERN/INSTALL |
| 45 | 84 | mlflow/mlflow (25,957★) | 7 | STUDY-PILOT-FAV (NEW v2) | STUDY |
| 46 | 84 | modelcontextprotocol/typescript-sdk | 1 | STUDY-PILOT-FAV | INSTALL if TS |
| 47 | 84 | shanraisshan/claude-code-best-practice (53,176★) | 2 ref | ADOPT-NOW REFERENCE | ADAPT-PATTERN |
| 48 | 84 | tree-sitter/tree-sitter | 6 | ADOPT-NOW substrate | INSTALL (transitive) |
| 49 | 84 | anthropic-cookbook | 3+7 | CITE-CLASS-CANONICAL | ADAPT-PATTERN |
| 50 | 84 | mattpocock/skills | 2 | ADOPT-NOW | INSTALL |

**Honorable mentions** (51-100): Helicone/helicone (78) / Arize-ai/phoenix (80) / openai/evals (80) / NVIDIA/garak (80) / D4Vinci/Scrapling (84) / chopratejas/headroom (80; REPLACEMENT for context-mode) / yvgude/lean-ctx (80) / alexgreensh/token-optimizer (78) / matt1398/claude-devtools (82) / kenryu42/claude-code-safety-net (82) / disler/claude-code-infrastructure-showcase (80) / parcadei/Continuous-Claude-v3 (80) / rohitg00/pro-workflow (78) / pro-workflow + many more — see COMPREHENSIVE_SCORING_MATRIX_v2.md for full list.

---

## Section 4 — Final REJECT-FOR-FIT consolidated list

| Repo | Reason | Source |
|------|--------|--------|
| **mksglu/context-mode** | **Elastic License 2.0 — non-permissive + license-key gating** | **Wave 3A LICENSE verbatim probe** |
| microsoft/LLMLingua + LLMLingua-2 + LongLLMLingua | STALE (2025-10-28) + per-Edit anti-pattern for CC runtime | Wave 1 §Layer 5 + W220 R5 |
| volcengine/OpenViking | AGPLv3 STRUCTURAL BLOCKER + Bytedance-subsidiary risk class | n=3+ Wave audits |
| topoteretes/cognee | CR-12 DUPLICATE of graphiti L3 | Wave 207-209 |
| getzep/zep | SUPERSEDED-BY-graphiti | Wave 207 |
| campfirein/cipher → byterover-cli | ELv2 non-permissive + META-HARNESS + HARD-GATE cloud-login | Wave 2B |
| supermemoryai/supermemory-mcp | DEPRECATED-BANNER v1 + hosted-service dependency | Wave 2B |
| mkreyman/mcp-memory-keeper | DUPLICATE-FUNCTIONALITY of doobidoo | Wave 2B |
| ressl/mcp-firewall | AGPL-3.0 + wrong category (security gateway not memory) | Wave 2B |
| gifflet/graphiti-mcp-server | DUPLICATE of canonical getzep/graphiti | Wave 2B |
| shinpr/claude-code-workflows | HARD-GATE iter-84 | sister claude-sota verified-avoid |
| Yeachan-Heo/oh-my-claudecode | META-HARNESS Cohort 1 per claude-sota verified-avoid | v1 Layer 2 |
| stravu/crystal | DEPRECATED Feb-2026 | parent CCC |
| microsoft/agent-framework | DUPLICATE-FUNCTIONALITY for CC native scope (Azure-centric) | v1+v2 |
| agno-agi/agno | DUPLICATE-FUNCTIONALITY for CC native scope (service-deploy) | v1+v2 |
| crewAIInc/crewAI | DUPLICATE-FUNCTIONALITY for CC native scope (Python orchestration) | v1+v2 |
| huggingface/smolagents | CodeAgent paradigm doesn't fit CC tool-use shape | v1 |
| aaif-goose/goose | Standalone Rust desktop — out-of-CC scope | sister-framework reference |
| `@anthropic/mcp-ast-grep` npm package | PHANTOM (returns 404 on npm registry) | FM-09 n=5 ladder |
| 13 anonymous-zip-drop kits v53-v65 | Cohort 7 STRUCTURAL REJECT (saturation n=36) | Agent A §Section 2 |
| open-compress/claw-compactor | Maintenance-mode cpd=0.72 | W220 R5 |
| jia-gao/leanctx | LLMLingua-derivative — inherits anti-pattern | W220 R5 |

---

## Section 5 — Catalogued layer summary (final state)

| Layer | Top picks | Stars-leader | Score-leader | Status |
|-------|-----------|--------------|--------------|--------|
| 1 Foundation | claude-plugins-official + skills + cwc + claude-agent-sdk + codex CLI + codex-plugin-cc + modelcontextprotocol-servers + github-mcp-server | anthropics/skills 135k | claude-plugins-official 97 | LOCKED |
| 2 Skills Methodology | obra/superpowers + addy-osmani/agent-skills + wshobson granular + ralph-loop + agent-sdk-dev | obra/superpowers 192,855 ✅verified | obra/superpowers 97 | LOCKED |
| 3 Orchestration | cwc + ralph-loop + codex-plugin-cc + langgraph(adapt) + deepagents(adapt) | google-gemini/gemini-cli 104k (alt-runtime) | cwc 94 | LOCKED |
| 4 Memory | doobidoo L1 + graphiti L3 + claude-mem (ADOPT-NOW-CONDITIONAL) | thedotmack/claude-mem 75,999 ✅verified | claude-mem 91 | UPDATED-WAVE3A |
| 5 Token-Opt | Anthropic prompt-cache + /compact + RTK + caveman + repomix-compress + headroom (REPLACES context-mode) + ccusage | JuliusBrussee/caveman 60,743 ✅verified | Anthropic prompt-cache 96 | **UPDATED-WAVE3A** (context-mode REJECTED → headroom replacement) |
| 6 Code Intel | serena + repomix + ast-grep CLI + tree-sitter + graphify | safishamsi/graphify 48k | yamadashy/repomix 94 | LOCKED |
| 7 Observability (NEW v2) | langfuse (Cloud-pilot first) + promptfoo + matt1398/claude-devtools + disler hooks-obs + phoenix | langfuse 27k | promptfoo 88 / langfuse 82 (Cloud) | UPDATED-WAVE3A |
| 8 LLM Routers (NEW v2) | manifest (narrow pilot) + plano + LiteLLM + CLIProxyAPI | router-for-me/CLIProxyAPI 32,826 | CLIProxyAPI 82 / manifest 74 | **UPDATED-WAVE3A** (manifest narrowed to STUDY-PILOT-NARROW) |
| 9 Hooks + Safety (NEW v2 depth) | claude-code-safety-net + infrastructure-showcase + hooks-mastery + Continuous-Claude-v3 + pro-workflow | diet103/claude-code-infrastructure-showcase 9,639 | kenryu42/safety-net 82 | LOCKED |

---

## Section 6 — Convergence-gate Axis-1+2+3 cross-layer final summary

| Layer | Axis-1 ≥3 distinct orgs | Axis-2 ≥2 named-T2 + dated | Axis-3 ≥90d stability + cpd-band | Net |
|-------|-------------------------|------------------------------|----------------------------------|-----|
| 1 Foundation | Anthropic + OpenAI + GitHub + modelcontextprotocol = 4-org | Anthropic eng + Boris Cherny + OpenAI eng + GitHub Mar-2026 = 4 dated | All STABLE-BURN-IN / STRONG-PROVENANCE-EXPRESS | **PASS firm** |
| 2 Methodology | Anthropic + obra + Addy + wshobson + Matt Pocock + Garry Tan = 6+ org | Jesse Vincent blog.fsck.com 2025-10-09 + Addy 2026 + wshobson Q2-2026 + Boris cited at CCBP | All STABLE-BURN-IN / SUSTAINED-ACTIVE | **PASS firm** |
| 3 Orchestration | Anthropic + LangChain + OpenAI + Google + Microsoft + crewAI + Composio = 7+ org | Multiple dated; ACP convergence 4-org Wave 5 A10 | All >180d | **PASS firm** |
| 4 Memory (Wave 3A updated) | Anthropic + Zep + doobidoo (Heinrich Krupp) + thedotmack (Apache-2.0 verified) = 4+ org | Multiple dated; thedotmack v13.2.0 2026-05-13 | All STABLE-BURN-IN | **PASS firm** |
| 5 Token-opt (Wave 3A updated) | Anthropic + RTK + JuliusBrussee + yamadashy + chopratejas + LangChain = 6+ org | Anthropic blog + Warp + caveman arXiv reinforcement + Karpathy | All STABLE-BURN-IN or SUSTAINED-ACTIVE | **PASS firm** |
| 6 Code Intel | tree-sitter + ast-grep + Semgrep + serena + repomix + safishamsi = 6+ org | Multiple dated | All >180d | **PASS firm** |
| 7 Observability (NEW v2) | langfuse + mlflow + Comet ML + Arize + Helicone + Pydantic + traceloop + NVIDIA + 6 more = 14+ org | YC W23 langfuse + Arize + NVIDIA garak + Pydantic-org | All >180d | **PASS firm** |
| 8 LLM Routers (NEW v2) | MNFST + katanemo + tensorzero + router-for-me + LiteLLM + BlockRunAI = 6 org | MNFST Inc + katanemo + tensorzero blog | manifest FAST-CHURN; others STABLE | **PASS partial** (manifest re-audit at 2026-q4) |
| 9 Hooks + Safety | kenryu42 + diet103 + disler + parcadei + rohitg00 + CloudAI-X + 5 more = 11+ org | Disler hooks-mastery + safety-net | All >180d | **PASS firm** |

**Net cross-layer convergence**: 9/9 layers Axis-1+2+3 firm PASS for recommended-install picks (Layer 8 manifest carries FAST-CHURN-BAND caveat).

---

## Section 7 — Final Phase 1-5 install sequence (post-Wave 3A)

### Phase 1 — Foundation (Wire 1-2; risk LOW)
```bash
# Anthropic-canonical chain (claude-plugins-official marketplace implicit via fresh CC)
pip install claude-agent-sdk
git clone https://github.com/anthropics/cwc-long-running-agents.git .local/cwc
cp -r .local/cwc/.claude/* .claude/

# Cross-model substrate
npm install -g @openai/codex@latest
# (CC plugin path: /plugin marketplace add openai/codex && /plugin install codex@openai-codex)

# Reference MCPs
npm install -g @modelcontextprotocol/server-{filesystem,git,fetch,sequential-thinking}
npm install -g @modelcontextprotocol/inspector  # dev-time

# GitHub MCP per upstream README
```

### Phase 2 — Orchestration methodology (Wire 1)
```bash
/plugin install superpowers@claude-plugins-official      # TDD + 7-phase
/plugin marketplace add addyosmani/agent-skills
/plugin install agent-skills@addy-agent-skills            # engineering-lifecycle
/plugin marketplace add wshobson/agents
/plugin install python-development comprehensive-review agent-teams
# DEFER /plugin install conductor                          # PENDING Probe 5
/plugin install ralph-loop@claude-plugins-official
/plugin install agent-sdk-dev@claude-plugins-official
```

### Phase 3 — MCP servers + Memory Stack (Wire 2-3)
```bash
# L1+L2 memory
pip install git+https://github.com/doobidoo/mcp-memory-service.git

# L3 temporal-KG
pip install graphiti-core[falkordb]
docker run -d --name falkordb -p 16379:6379 falkordb/falkordb:latest

# 🎯 Wave 3A ADOPT-NOW-CONDITIONAL: claude-mem (Apache-2.0 verified)
/plugin marketplace add thedotmack/claude-mem
/plugin install claude-mem
# Run 30-day A/B vs existing Memory Stack; deprecate whichever underperforms

# Code intelligence
# serena: per upstream README
npm install -g repomix@latest
cargo install ast-grep   # standalone CLI, NOT phantom @anthropic/mcp-ast-grep

# Browser
npm install -g @microsoft/playwright-mcp
# ChromeDevTools/chrome-devtools-mcp per upstream README

# SAST
/plugin marketplace add semgrep/mcp-marketplace
/plugin install semgrep
```

### Phase 4 — Token-eff + Observability (Wire 1-2; Wave 3A UPDATED)
```bash
# Token-eff
npm install -g ccusage
cargo install rtk-cli

# 🎯 Wave 3A ADOPT-NOW: caveman (MIT verified + 65% benchmark reproducible)
curl -fsSL https://raw.githubusercontent.com/JuliusBrussee/caveman/main/install.sh | bash
# (Review install.sh first per canonical Must-Never #3)
# Install caveman + caveman-compress + caveman-stats

# ❌ Wave 3A REJECT: context-mode (Elastic License 2.0)
# REPLACEMENT: chopratejas/headroom (MIT) — 60-95% on tool outputs
# pip install headroom  # via upstream README install path
# OR /plugin install headroom-mcp@<marketplace>

# repomix compress active by default

# Anthropic env
export CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=70

# 🎯 Wave 3A STUDY-PILOT (Cloud-first): langfuse
# Sign up at langfuse.com (free tier) — DON'T self-host until proven critical
export LANGFUSE_PUBLIC_KEY=<key>
export LANGFUSE_SECRET_KEY=<key>
# Then in CC agents: pip install langfuse + wire OTel SDK

npm install -g promptfoo

# CC-specific UI
# matt1398/claude-devtools: download Electron app from github releases
# disler/claude-code-hooks-multi-agent-observability: clone + run dev server

# Safety net
# kenryu42/claude-code-safety-net: install hook
```

### Phase 5 — Optional + STUDY-PILOT (Wire 2-3)
```bash
# Pattern reference cites (cite-only, NOT install):
# - shanraisshan/claude-code-best-practice (methodology reference)
# - garrytan/gstack (codex-companion Pattern-B mitigation pattern)
# - affaan-m/everything-claude-code (cherry-pick patterns)
# - gsd-build/get-shit-done (meta-prompting pattern)

# Optional code-intel
# /plugin marketplace add Piebald-AI/claude-code-lsps  # LSP-class

# Optional eval
# pip install inspect-ai      # UK AISI — verify license first

# 🎯 Wave 3A STUDY-PILOT-NARROW: manifest (LLM router; narrow Claude-only pilot)
# Docker self-host on port 2099 (NOT npm — npm `manifest` is DEPRECATED)
# bash <(curl -sSL https://manifest.build/install.sh)
# 30-day pilot with Anthropic Claude Max routing only; re-audit 2026-q4 for Axis-3 stability

# Discovery aggregators (REFERENCE only — never install as runtime deps)
```

---

## Section 8 — HONEST limitations remaining

1. **Cross-model gate**: PARTIAL satisfaction throughout. Wave 1 agent dispatch rate-limited (orchestrator-side pivot). Wave 2A codex T1 ran Path P but returned Pattern B HNF. Wave 3A agent ran as Sonnet stand-in per `CLAUDE.local.md ENV (f)` per `cmc-env-funneled-disclosure.md §The mandate` STAND-IN-NOTICE. **Wave 2C Mia pre-apply on EACH install command MANDATORY** before commits land.

2. **Probe DAG 1-7 NOT YET RUN for full set** — Wave 3A verified 5 specific repos. Other v2 ADOPT-NOW picks (langfuse Cloud-pilot path, manifest narrow pilot, mlflow, phoenix, helicone, Anthropic claude-code-action) need fresh probe before commit.

3. **Marker Decay on star counts** — all captured May 2026; per `evidence-policy.md` Marker Decay corollary, re-verify before adoption commit (especially for FAST-CHURN repos like manifest).

4. **Single-agent Wave 3A** — only 5 repos audited this round. Wave 4 candidates queued: phoenix (Arize observability) / openllmetry (OTel-native) / logfire (Pydantic) / chopratejas/headroom (token-eff replacement for context-mode) — full Probe DAG before install.

5. **Net-new discovery surfaces**: this synthesis is comprehensive for what was probed but acknowledges the long-tail of community plugins/skills/MCPs not surveyed (4000+ skills across registries). Discovery aggregators serve this gap — operators should grep awesome-* registries when narrow gaps surface.

6. **Wave 2A codex T1 Pattern B HNF** — adversarial cross-model review on the v1 catalog returned no structured JSON verdict (timeout-trace-mine disposition). Re-fire with TIGHTER scope (single-axis review, JSON-strict mandate, ~180s budget) is OPTIONAL before install commits.

---

## Section 9 — File inventory (research-wave-2026-05-15 + v2-deep-synthesis)

```
research-wave-2026-05-15/
├── README.md
├── VERIFICATION_PASS_2026-05-15.md (v1)
├── 00-prior-research-baseline/
│   ├── 32 baseline files (v65 kit + WAVE1 + WAVE2 + sourcedive)
│   └── B2-memory-deep-dive-2026-05-15.md (Wave 2B 5/5 REJECT)
├── 01-cc-ecosystem/ + 02-mcp-servers/ + 03-orchestration-frameworks/ + 04-token-context-optimization/
│   └── per-category README v1
├── 05-grand-catalog/
│   └── GRAND_CATALOG_2026-05-15.md (v1; 67KB; 130+ repos × 11 dims)
├── 06-executive-brief/
│   └── EXECUTIVE_SYNTHESIS_BRIEF_2026-05-15.md (v1; 23KB; Top-30 plan)
├── agent-reports/ + recon-data/
└── v2-deep-synthesis/             ⭐ NEW DEEPER PASS
    ├── ULTIMATE_SOTA_RUNTIME_DESIGN.md (master architecture v2; 9 layers)
    ├── COMPREHENSIVE_SCORING_MATRIX_v2.md (15-dim × 150+ repos)
    ├── PER_CATEGORY_HEAD_TO_HEAD_v2.md (head-to-head per category)
    ├── WAVE3A-SOURCE-DEEP-DIVE-2026-05-16.md (5-repo verified)
    └── VERIFICATION_PASS_v2_FINAL.md (THIS FILE — Wave 3A delta + final state)
```

---

## VERDICT (v2 FINAL — post-Wave 3A)

**ULTIMATE SOTA CLAUDE CODE RUNTIME GRAND SYNTHESIS v2 — COMPLETE.**

**Deliverables**:
1. **9-layer architecture** with explicit ADOPT-NOW + STUDY-PILOT + REJECT picks per layer
2. **150+ repos cataloged** across 9 layers; 15-dim scoring per repo
3. **Per-category head-to-head matrices** showing win-over-alternates analysis
4. **5-phase install plan** with concrete commands
5. **E2E workflow** with GPT-5.5 adversarial review at 8 lifecycle touchpoints (T0-T7)
6. **Wave 3A source-code-deep-dive on 5 priority repos** with 1 critical LICENSE catch (context-mode REJECT)
7. **Pattern A fix-forward applied** across all v2 files
8. **CR-12 disposition** per repo (CITE-CANONICAL / GENUINELY-NEW / DUPLICATE / PARTIAL-OVERLAP / PROVIDER-COMPLEMENT / META-HARNESS)
9. **15 anti-patterns enumerated** to prevent silent install errors

**Critical fix-forwards applied this round**:
- ❌ mksglu/context-mode (Elastic License 2.0) → REJECT-FOR-FIT (was ADOPT-NOW); replaced by chopratejas/headroom (MIT) in token-eff stack
- ✅ thedotmack/claude-mem (Apache-2.0 verified) → ADOPT-NOW-CONDITIONAL with 30-day A/B
- ✅ JuliusBrussee/caveman (MIT verified + reproducible benchmark) → ADOPT-NOW
- ⚠️ langfuse (heavy self-host) → STUDY-PILOT-FAVORABLE Cloud-first
- ⚠️ manifest (FAST-CHURN-BAND) → STUDY-PILOT-NARROW

**Cross-model gate status**: PARTIAL (operator-side codex T1 + Wave 2A codex Path P invoked; Pattern B HNF disposition). Operator must apply Mia pre-apply per `mia-pre-apply.md` BEFORE any commit lands at the runtime.

**Status**: AUTHORITATIVE — ready for operator execution decision.

**Recommended next actions** (in priority order):
1. Wave 2C Mia pre-apply on each Phase 1-5 install command per cardinal-rule-9
2. Phase 1 Foundation install + smoke verify
3. Phase 2 Orchestration co-install (3-way superpowers + addy + wshobson granular)
4. Phase 3 MCP servers + Memory Stack (INCLUDE thedotmack/claude-mem 30-day A/B)
5. Phase 4 Token-eff + Observability (USE caveman + headroom NOT context-mode)
6. Phase 5 Optional + STUDY-PILOT selective
