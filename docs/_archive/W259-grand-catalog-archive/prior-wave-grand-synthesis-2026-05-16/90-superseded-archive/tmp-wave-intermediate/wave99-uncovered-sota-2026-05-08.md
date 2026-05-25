# Wave 99 Un-covered SOTA Repos Audit — eee runtime gap analysis

**Agent**: sota-researcher Sonnet stand-in (agentId ab34403269892681e; 373188ms / 43 tools / 423277 tokens)
**Date**: 2026-05-08
**STAND-IN-NOTICE**: Sonnet stand-in per CLAUDE.local.md ENV (g) — orchestrator-side codex T1 e2e MANDATORY before any ship per CR-3 Phase 1 bootstrap exception.

## Scope discipline

**EXCLUDED** (already covered Wave 97/98): rtk / context-mode / claude-context Milvus / cwc commit-on-stop / Superpowers 6 un-cited skills / fork-vs-fresh / claude-code-security-review (mentioned as recommendation but not yet installed) / silent-failure-hunter / account-rotation primitives / CCBP shanraisshan / obra/superpowers (14/14 audited).

## Probe state

- Anthropic Tier-0 plugins available: 34; ENABLED: 9 → **25 OFFICIAL plugins NOT installed**
- Default-install core CLI tools (rg/fd/jq/yq/gh/just/mise/uv/ruff): 9/9 PATH-AVAILABLE but 0/9 documented as `INSTALLED-VIA-SYSTEM-PATH` (CR-7 Phase 2 gate violation)
- Eval/benchmark/observability: ZERO repos installed (Section 15 fully PLANNED)
- Memory beyond doobidoo+graphiti: ZERO repos audited (Letta/mem0/cognee absent)
- DSPy compile-time prompts: ZERO references in manifest
- LLMLingua compression: ZERO references in manifest
- MCP security scanners: ZERO references

## Top-5 ADOPT-NOW (UN-COVERED axes only)

### A1. anthropics/claude-code-security-review (4,546★ MIT, Anthropic OFFICIAL)
TIER-1-DIRECT Anthropic-org + STRONG-PROVENANCE-EXPRESS + 90d+ stability.
Mia: NOT in `.mcp.json` / NOT enabledPlugins / NOT in manifest.
Install: `gh release download` + GitHub Actions OR `/plugin install` if marketplace.
ROI: ~30min/incident catch × 5-10 incidents/quarter.

### A2. anthropics/skills (130,484★ Anthropic OFFICIAL)
17 canonical skills (canvas-design / docx / pdf / mcp-builder / pptx + others).
Mia: NOT installed; NOT in marketplace.
Install: `git clone --depth 1` + selective cite-anchor adoption per CR-12.
ROI: skill scaffolding ~15-30min/skill saved.

### A3. UKGovernmentBEIS/inspect_ai (2,027★ MIT, UK gov named-T2)
TIER-1-DIRECT UK Government + active push 2026-05-08.
Mia: ZERO references in manifest; Section 15 eval row empty.
Install: `pip install inspect-ai` + skill scaffold for eval gates.
ROI: continuous regression-test prevention; n=1 prevented regression = 1-2h saved.

### A4. modelcontextprotocol/inspector (9,693★ MCP-org)
TIER-1-DIRECT MCP-org + push today.
Mia: NOT installed (no `mcp-inspector` in `.mcp.json` / PATH).
Install: `npm install -g @modelcontextprotocol/inspector@latest`.
ROI: ~10-15min/MCP-disconnect classification × 2-3/arc.

### A5. anthropics/courses (21,126★ Anthropic OFFICIAL)
TIER-1-DIRECT Anthropic-org + 21k★ + age-stable.
Mia: NOT cited anywhere in manifest.
Install: `git clone --depth 1` for cite-only reference (NOT install-class).
ROI: cite-anchor authority for design discussions.

## Top-3 STUDY-PILOT

### S1. stanfordnlp/dspy (34,283★ MIT)
DSPy compile-time prompts. STUDY-PILOT (not ADOPT) per Probe 5 mode-harness-shape PARTIAL — DSPy is Python-SDK-class; eee uses CC-CLI runtime. 30-day eval needed.

### S2. mem0ai/mem0 (55,146★ Apache-2.0)
Emerging memory SOTA. Probe 7.b 5-clause check needed — does mem0 provide marginal value over doobidoo+graphiti stack?

### S3. github/spec-kit (93,559★ MIT)
Wait — spec-kit binary v0.8.7 ALREADY INSTALLED via Wave 97 Ship 1N at `.local/bin/specify.exe`. STUDY-PILOT for `/specify` command integration vs hand-written manifest rows.

## REJECT-FOR-FIT

- microsoft/autogen (57k★) — Probe 5 mode-harness-shape CATEGORY-MISMATCH
- microsoft/agent-framework (10k★) — same as autogen
- microsoft/LLMLingua (6,159★ MIT) — Probe 7.a demand-absence (covered by context-mode)
- letta-ai/letta (22,539★) — Probe 7.a + duplicate-functionality with graphiti L3
- topoteretes/cognee (17,124★) — gated off in `.mcp.json` per parent CCC cycle-316
- mattpocock/skills (62k★) — already PLANNED in manifest Section 3
- promptfoo/promptfoo (21k★) — duplicate-functionality with inspect_ai (A3); pick A3
- trailofbits/claude-code-config (1,939★) — no operational driver in eee

## HONEST-NON-FINDING (axes probed without finding)

1. **TOOL-USE EFFICIENCY / FUNCTION-CALLING optimization** — ZERO SOTA repos surfaced. **GENUINE-GAP** — possibly sibling-novel codification opportunity.
2. **STREAMING / RESPONSE COMPRESSION** — covered by Anthropic CC native env knobs (`CLAUDE_CODE_DISABLE_NONSTREAMING_FALLBACK` / `ENABLE_FINE_GRAINED_TOOL_STREAMING`); no separate repo.
3. **anthropic-cookbook recipes** — `anthropic-ai/anthropic-cookbook` 404; `anthropics/claude-cookbook` 301-redirect. **HNF: cookbook-class consolidated into anthropics/skills + courses**.
4. **Anthropic Tier-0 OFFICIAL plugin gap** — 25/34 OFFICIAL plugins NOT enabled. NOT a HNF — this IS the gap. Top-3 priority: claude-code-setup / mcp-server-dev / skill-creator / code-review / pr-review-toolkit / commit-commands / feature-dev.
5. **Default-CLI tools manifest gap** — 9 PATH-AVAILABLE but 0 in manifest as `INSTALLED-VIA-SYSTEM-PATH` (CR-7 Phase 2 violation).

## CR-9 sibling-bleed defense

All A1-A5 are upstream-direct (anthropics/* + UKGovernmentBEIS + modelcontextprotocol). ZERO sibling cite-imports needed. ZERO `Z:/claude-sota/` paths to rewrite.

## CR-12 upstream-install-priority cascade verification

A1+A2+A3+A4+A5 all PRIMARY (default) — install from upstream SOTA via official-native-channel. ZERO TERTIARY (cite-import-AMBER) needed. Cardinal-rule-12 cascade satisfied.

## VERDICT

STAND-IN-NOTICE: Sonnet stand-in per CLAUDE.local.md ENV (g); orchestrator-side codex T1 e2e MANDATORY before commit
VERDICT: APPROVE-LIST
confidence: 0.83
top-5 ADOPT-NOW: A1 claude-code-security-review + A2 anthropics/skills + A3 inspect_ai + A4 mcp-inspector + A5 anthropics/courses
top-3 STUDY-PILOT: dspy + mem0 + spec-kit (note: spec-kit already INSTALLED Wave 97)
REJECT-FOR-FIT: autogen + agent-framework + LLMLingua + letta + cognee + mattpocock-already-planned + promptfoo-dup + trailofbits-config
HONEST-NON-FINDING: tool-use efficiency optimization (genuine-gap) + streaming-as-separate-repo (covered by CC env) + anthropic-cookbook (consolidated into skills+courses) + 25/34 Anthropic Tier-0 plugin gap (manifest debt) + 9/9 default-CLI manifest debt (CR-7 Phase 2 violation)
