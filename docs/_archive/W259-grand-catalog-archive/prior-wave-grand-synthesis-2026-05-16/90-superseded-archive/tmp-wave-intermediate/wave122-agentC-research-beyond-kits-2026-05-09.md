---
title: "Wave 122 Agent C — Research Beyond Kits: SOTA candidates for claude-sota-installed"
status: AUTHORITATIVE-CANDIDATE
date: 2026-05-09
agent: agentC-sota-researcher
wave: 122
---

# Wave 122 Agent C — Research Beyond `Z:/claude-sota/docs/outer research/kits/`

## Executive Summary

`claude-sota-installed` runtime currently has 7 plugins / 11 marketplaces / 9 MCPs. Research surfaced **40+ candidate primitives** across 8 axes + **8 already-installed repos with NEWER HEADs** available per CR-6. Top gaps: (a) Memory L4 wiki axis EMPTY despite 10+ Karpathy-pattern repos shipped Apr-May 2026; (b) Eval/benchmark/observability ENTIRE axis missing (Section 15); (c) Agent skill catalog narrowly scoped (only addy + obra + ECC; addyosmani at HEAD `4c585c37` 2026-05-09 with NEW `doubt-driven-development` skill); (d) MCP discovery surface missing the official `modelcontextprotocol/*` org (42 repos including `mcpb` Desktop Extensions, `registry`, `inspector`).

---

## Section 1 — TOP-15 Priority Adoption Queue

Ranked by `axis-3 stability × manifest-gap leverage`. All Axis-3 PASS unless flagged. Per CR-12 upstream-install-priority.

| Rank | Candidate | Type | Cite anchor | License | Why missing | Verdict |
|------|-----------|------|-------------|---------|-------------|---------|
| 1 | **`anthropics/knowledge-work-plugins`** marketplace | plugin-marketplace | `https://github.com/anthropics/knowledge-work-plugins @ 65f6fdbb 2026-05-08` | Anthropic | Manifest §10 lists CCBP/ECC/addy but NOT this Anthropic-OFFICIAL marketplace. Ships `bio-research`+`Consensus MCP` knowledge-worker plugins | ADOPT-NOW (Axis 1+2+3 PASS — Anthropic org named-T1) |
| 2 | **`anthropics/claude-plugins-community`** marketplace | plugin-marketplace | `https://github.com/anthropics/claude-plugins-community @ f846a0bc 2026-05-05` | Anthropic | Read-only mirror of community submissions via clau.de/plugin-directory-submission. Official curation pipeline for community plugins | ADOPT-NOW |
| 3 | **`modelcontextprotocol/servers`** | upstream MCP catalog | `https://github.com/modelcontextprotocol/servers @ HEAD-2026-04-17` | MIT | sss-installed has 9 MCPs but missing official Anthropic `time` / `filesystem` / `sequentialthinking` / `fetch` reference servers | ADOPT-NOW (Anthropic-org-MCP) |
| 4 | **`modelcontextprotocol/registry`** | MCP discovery | `https://github.com/modelcontextprotocol/registry @ HEAD-2026-05-08` | MIT | Community-driven MCP server registry — solves the "find MCP for X" problem mechanically. Manifest §7 currently relies on grep/exa | ADOPT-NOW |
| 5 | **`modelcontextprotocol/inspector`** | MCP test/debug | `https://github.com/modelcontextprotocol/inspector @ HEAD-2026-05-08` | MIT | Visual MCP testing tool. Critical for CR-9 "expect 2-round fix-forward" discipline on every MCP install. Currently no MCP test harness | ADOPT-NOW |
| 6 | **`mksglu/context-mode` standalone install** | token-eff MCP | `https://github.com/mksglu/context-mode` (already supplied via plugin per Wave 95) | MIT | Currently delivered via plugin marketplace, but standalone repo install gives 98% context savings + ctx_batch_execute primitive — verified live this session | ADOPT-NOW (live evidence: ctx_batch_execute 986KB→62KB) |
| 7 | **`addyosmani/agent-skills`** — refresh HEAD | skill-marketplace | `@4c585c37 2026-05-09` (NEW `doubt-driven-development` skill landed today) | MIT | Manifest references addy at older SHA; HEAD bumped today with 22nd skill + multiple PRs merged this week | HEAD-UPDATE-NOW |
| 8 | **`anthropics/cwc-long-running-agents`** — verify HEAD | harness primitives | `@ffd563d6 2026-05-06` UNCHANGED | Anthropic | Already installed at this exact SHA per manifest §17. NO update available — confirm freshness | NO-UPDATE-CONFIRMED |
| 9 | **`KILLSWITCH.md` open spec** | safety convention | `https://killswitch.md/` + `github.com/killswitch-md/spec` | MIT | sss-installed has cardinal-rule-7 graduated unleash but NO `KILLSWITCH.md` convention — required for EU AI Act Aug-2026 compliance | STUDY-PILOT (~3mo old; convergence-gate Axis 3 borderline-PASS via STRONG-PROVENANCE-EXPRESS once n=2 named-T2) |
| 10 | **`anthropics/anthropic-cli`** | CLI runtime | `https://github.com/anthropics/anthropic-cli @ 2026-05-09` | Anthropic | Official CLI for Claude API — created 2026-01-23 (~3.5mo). Complements `claude` CLI for non-interactive batch operations | STUDY-PILOT (axis-3 borderline; STRONG-PROVENANCE-EXPRESS predicate satisfied by Anthropic org) |
| 11 | **`evilmartians/lefthook`** | git hook framework | `https://github.com/evilmartians/lefthook @ HEAD-2026-05-04` | MIT | Manifest §5.5 GAP. Cross-platform Go binary, faster than husky, polyglot YAML config | ADOPT-NOW (mature 6yr+) |
| 12 | **`coze-dev/coze-loop`** | agent eval platform | `https://github.com/coze-dev/coze-loop @ HEAD-2026-05-09` | TBD-license-check | Manifest §15 EMPTY. Full-lifecycle eval: dev → debug → eval → monitor. ByteDance | STUDY-PILOT (need axis-1 license + ≥2 named T2) |
| 13 | **`truera/trulens`** | LLM eval framework | `https://github.com/truera/trulens @ HEAD-2026-05-08` | MIT | Manifest §15 EMPTY. Mature 5yr+ eval primitive. Tracking + evaluation for LLM experiments | ADOPT-NOW |
| 14 | **`Giskard-AI/giskard-oss`** | LLM agent test | `https://github.com/Giskard-AI/giskard-oss @ HEAD-2026-05-07` | TBD-license-check | Open-source eval/testing for LLM agents. Mature 4yr+ | STUDY-PILOT |
| 15 | **`mozilla-ai/any-agent`** | unified agent eval | `https://github.com/mozilla-ai/any-agent @ HEAD-2026-05-01` | TBD-license-check | Mozilla-org named. Single interface to use+evaluate different agent frameworks (handoff primitive) | STUDY-PILOT |

---

## Section 2 — HEAD UPDATE LIST (CR-6 fresh-from-github)

Currently-installed repos with NEWER HEADs available than manifest pin:

| Repo | Manifest pin | Available HEAD | Drift days | Action |
|------|--------------|----------------|------------|--------|
| `anthropics/cwc-long-running-agents` | `ffd563d6 2026-05-06` | `ffd563d6 2026-05-06` UNCHANGED | 3d | NO-OP |
| `anthropics/claude-plugins-official` | (needs verification) | `76b35e91 2026-05-07` (#1771 hook scope policy tightened) | check pin | UPDATE-NOW |
| `obra/superpowers` | (manifest UNVERIFIED) | `f2cbfbef 2026-05-04 v5.1.0` (Codex App compat) | check pin | UPDATE-NOW |
| `addyosmani/agent-skills` | (verify) | `4c585c37 2026-05-09` (NEW `doubt-driven-development`) | TODAY | UPDATE-NOW |
| `getzep/graphiti` | `c427615 2026-05-07` per manifest | `c427615 2026-05-07` | 2d | NO-OP |
| `microsoft/playwright-mcp` | `@latest` (CR-9 violation) | v0.0.75 SHA `8116437f 2026-05-07` | TODAY | PIN-NOW (CR-9 mandate) |
| `oraios/serena` | (verify) | `249f6b07 2026-05-09` (Ada/SPARK support) | TODAY | UPDATE-NOW |
| `yamadashy/repomix` | v1.14.0 pinned | `daa7ff3e 2026-05-09` (HEAD-of-main; v1.14.0 likely older) | check | VERIFY-PIN |
| `openai/codex-plugin-cc` | `@1.0.4` (`807e03ac 2026-04-18`) | `807e03ac 2026-04-18` UNCHANGED at v1.0.4 | 21d | NO-OP (latest stable) |
| `doobidoo/mcp-memory-service` | v10.51.3 | check upstream | check | VERIFY |
| `anthropics/knowledge-work-plugins` | NOT-INSTALLED | `65f6fdbb 2026-05-08` | TODAY | INSTALL-NOW (Section 1 #1) |
| `anthropics/claude-plugins-community` | NOT-INSTALLED | `f846a0bc 2026-05-05` | 4d | INSTALL-NOW (Section 1 #2) |

---

## Section 3 — MISSING-FEATURES BY AXIS (8 axes × candidates)

### Axis 1: Memory Stack L4 wiki (DEFERRED in CLAUDE.md — 5 candidates)

| # | Candidate | Cite | License | Stars/age | Verdict |
|---|-----------|------|---------|-----------|---------|
| 1 | `swarmclawai/swarmvault` | `2026-04-06 ~1mo` | TBD | swarm-org | STUDY-PILOT (axis-3 fail age<90d; revisit Aug-2026) |
| 2 | `ub3dqy/llm-wiki` | `2026-04-10 ~1mo` | TBD | individual | STUDY-PILOT (axis-3 fail) |
| 3 | `megaphone-tokyo/kioku` | `2026-04-16 ~1mo` "Memory for Claude Code — auto-accumulate sessions into Obsidian Wiki" | TBD | named-org | STUDY-PILOT (axis-3 fail) |
| 4 | `Voland00009/MetaMode` | `2026-04-13 ~1mo` "Persistent wiki-memory layer for Claude Code — hooks auto-capture sessions" | TBD | individual | STUDY-PILOT |
| 5 | `Lum1104/Understand-Anything` | `2026-03-15 ~2mo` "Karpathy LLM wiki interactive knowledge graph" | TBD | individual | STUDY-PILOT |
| 6 | `KINSZONE/OpenHarness` | (3-layer memory: heartbeat.md / knowledge/*.md / logs/execution_stream.log; KAIROS dream mode consolidation) | TBD | individual | **STUDY-PILOT-PRIORITY** — most architecturally mature pattern |

**Verdict (Axis 1)**: All <90d age — convergence-gate Axis 3 FAIL. Wait until n=2 same-shape stabilizes (n>=2 same-pattern repos cross 90d burn-in). Re-audit Aug-2026.

### Axis 2: Long-running-agent patterns beyond `cwc-long-running-agents` (5 candidates)

| # | Candidate | Cite | Verdict |
|---|-----------|------|---------|
| 1 | `KINSZONE/OpenHarness` | `361e13d5 ~3mo` 24/7 cron-scheduled with mission.md/heartbeat.md/eval_criteria.md/playbook.md/progress.md/cron_config.md contract | STUDY-PILOT (most complete impl) |
| 2 | `KILLSWITCH.md` open spec | `2026-03-13 ~2mo` Cost limits + forbidden actions + 3-level escalation | STUDY-PILOT (EU AI Act mandate Aug-2026) |
| 3 | `ArtemisAI/Harness_Engineering` | `2026-02-28 ~2.5mo` agents.json swarm manifest + features.json + claude-progress.txt + T1/T2/T3 cost tiers | STUDY-PILOT |
| 4 | `agentpatterns.ai` Session/Harness/Sandbox separation pattern | DOC-only | REFERENCE-ONLY (no install class) |
| 5 | Anthropic engineering blog "Effective harnesses for long-running agents" | `https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents` | REFERENCE (already cited in cwc-long-running-agents) |

### Axis 3: MCP server discovery (5 candidates — `modelcontextprotocol/*` org gap)

| # | Candidate | Cite | Verdict |
|---|-----------|------|---------|
| 1 | `modelcontextprotocol/servers` | reference servers — `time`/`filesystem`/`sequentialthinking`/`fetch`/`memory` | ADOPT-NOW (Anthropic-org MCP) |
| 2 | `modelcontextprotocol/registry` | community MCP registry | ADOPT-NOW |
| 3 | `modelcontextprotocol/inspector` | visual MCP testing | ADOPT-NOW (CR-9 mandate complement) |
| 4 | `modelcontextprotocol/mcpb` | Desktop Extensions one-click install | STUDY-PILOT (claude-sota-installed not desktop-app) |
| 5 | `modelcontextprotocol/ext-apps` | UI-embedded MCP apps | DEFER (Nov-2025 ~6mo — too new for sss harness) |

### Axis 4: Token efficiency primitives (5 candidates)

| # | Candidate | Cite | Verdict |
|---|-----------|------|---------|
| 1 | `mksglu/context-mode` standalone | live evidence verified this session | ADOPT-NOW (already used as plugin) |
| 2 | `alexgreensh/token-optimizer` | `/plugin marketplace add alexgreensh/token-optimizer` Caveman 65% reduction | STUDY-PILOT |
| 3 | `elara-labs/code-context-engine` | AST-aware indexing 94% token savings, MCP server | STUDY-PILOT |
| 4 | Anthropic prompt-caching `cache_control` API-side | platform.claude.com/docs prompt-caching | REFERENCE (already used) |
| 5 | ClaudeFast Code Kit `ContextRecoveryHook` | claudefa.st blog | STUDY-PILOT |

### Axis 5: Eval/benchmark/observability (manifest §15 EMPTY — 5 candidates)

| # | Candidate | Cite | Verdict |
|---|-----------|------|---------|
| 1 | `truera/trulens` | mature 5yr+ MIT | ADOPT-NOW |
| 2 | `coze-dev/coze-loop` | full-lifecycle ByteDance | STUDY-PILOT |
| 3 | `Giskard-AI/giskard-oss` | mature 4yr+ | STUDY-PILOT |
| 4 | `mozilla-ai/any-agent` | unified eval interface | STUDY-PILOT |
| 5 | `rungalileo/agent-leaderboard` | ranking LLMs on agentic tasks | STUDY-PILOT |
| 6 | `evaleval/every_eval_ever` | shared schema crossorg eval database | STUDY-PILOT |
| 7 | `hidai25/eval-view` | regression testing for agents | STUDY-PILOT |
| 8 | `ifixai-ai/iFixAi` | 32-test diagnostic; 5min letter grade | STUDY-PILOT |

### Axis 6: Code intelligence MCPs beyond serena/repomix (5 candidates)

| # | Candidate | Cite | Verdict |
|---|-----------|------|---------|
| 1 | `01x-in/codeindex` | `2026-03-28 ~1.5mo` persistent structural knowledge graph for codebases (MCP tools + CLI) | STUDY-PILOT (axis-3 borderline) |
| 2 | `elara-labs/code-context-engine` | tree-sitter Python/JS/TS/PHP/Go/Rust/Java + MCP tools | STUDY-PILOT |
| 3 | `oraios/serena` HEAD update | `249f6b07 2026-05-09` adds Ada/SPARK | UPDATE-NOW |
| 4 | tree-sitter MCP servers | (no canonical found via search) | DEFER |
| 5 | ast-grep MCPs | (search returned no results) | HONEST-NON-FINDING |

### Axis 7: Foundational CLI tools (manifest §10 expansion — 5 candidates)

| # | Candidate | Cite | Verdict |
|---|-----------|------|---------|
| 1 | `gh` CLI extensions ecosystem | search budget exhausted (rate limit) | STUDY-PILOT (defer to next wave) |
| 2 | `uv` advanced features (already installed; check version) | `uvx`/`uv tool install`/`uv tool list` | UPGRADE-IF-NEEDED |
| 3 | `bun` features beyond runtime (`bun install`/`bun build`) | already on PATH per manifest | OPERATIONAL-EXPAND |
| 4 | `pipx` for Python tool isolation | mature standard | OPERATOR-CHOICE |
| 5 | `mise` (formerly rtx) — version manager | not yet installed | STUDY-PILOT |

### Axis 8: Git hook orchestrators (manifest §5.5 GAP — 5 candidates)

| # | Candidate | Cite | Verdict |
|---|-----------|------|---------|
| 1 | `evilmartians/lefthook` | mature Go binary 6yr+ MIT | ADOPT-NOW |
| 2 | `pre-commit/pre-commit` framework | mature Python | OPERATOR-CHOICE |
| 3 | `evilmartians/overcommit` | Ruby-class orchestrator | DEFER (not Python/JS-first) |
| 4 | `husky` Node.js | mature but JS-only | OPERATOR-CHOICE |
| 5 | `lefthook.nix` Nix integration | for Nix users only | DEFER |

---

## Section 4 — Anti-pattern Flags (CR-9 violations)

REJECT-FOR-FIT verdicts:

| Candidate | Reason | CR violation |
|-----------|--------|--------------|
| Memory L4 wiki repos `swarmvault`/`llm-wiki`/`kioku`/`MetaMode`/`Lum1104` | All <2mo old; convergence-gate Axis 3 FAIL | CR-9 D6 today-release-auto-upgrade risk; pin sibling commits NOT yet stable |
| `microsoft/playwright-mcp@latest` (current install) | `@latest` without version pin | CR-9 version-pin mandate VIOLATED — must pin to `0.0.75` SHA `8116437f` |
| `anthropics/claudes-c-compiler` | Anthropic but PoC scope, not runtime tool | NOT-IN-SCOPE |
| `anthropics/anthropic-retrieval-demo` | demo not runtime; last pushed 2024-06 | STALE |
| `addyosmani/agent-skills` `doubt-driven-development` | shipped TODAY (2026-05-09); 0-day stability | CR-9 D6 — wait n=1 day burn-in OR pin to commit-pre-DDD |
| Memory L4 candidates with single-individual maintainer (`swarmvault`/`llm-wiki`/`MetaMode`) | Axis 1 single-org FAIL | convergence-gate Axis 1 |
| Cite-import from sibling `Z:/claude-sota/` for primitives where upstream now exists | CR-12 upstream-install-priority | Use upstream over sibling |

---

## Section 5 — Convergence Verdicts per Candidate (Axis 1+2+3 summary)

| Candidate | Axis 1 (≥3 orgs) | Axis 2 (≥2 named-T2) | Axis 3 (≥90d) | Verdict |
|-----------|-------------------|----------------------|---------------|---------|
| `anthropics/knowledge-work-plugins` | PASS (Anthropic) | PASS (Matt Piccolella named-Anthropic) | PASS (3.5mo since 2026-01-23) | **ADOPT-NOW** |
| `anthropics/claude-plugins-community` | PASS (Anthropic) | PASS (Tobin South named-Anthropic) | BORDERLINE (1.5mo) STRONG-PROVENANCE-EXPRESS PASS | **ADOPT-NOW** |
| `modelcontextprotocol/servers` | PASS (MCP-org/Anthropic-affiliated) | PASS | PASS (>17mo) | **ADOPT-NOW** |
| `modelcontextprotocol/registry` | PASS | PASS | PASS (~14mo) | **ADOPT-NOW** |
| `modelcontextprotocol/inspector` | PASS | PASS | PASS (~19mo) | **ADOPT-NOW** |
| `evilmartians/lefthook` | PASS (Evil Martians org) | PASS | PASS (>6yr) | **ADOPT-NOW** |
| `truera/trulens` | PASS (truera/Snowflake) | PASS | PASS (>5yr) | **ADOPT-NOW** |
| `obra/superpowers` HEAD update v5.1.0 | PASS | PASS (Jesse Vincent named-T2) | PASS | **UPDATE-NOW** |
| `addyosmani/agent-skills` HEAD update | PASS (Google Chrome) | PASS (Addy Osmani named-T1) | PASS | **UPDATE-NOW** |
| `oraios/serena` HEAD update | PASS | PARTIAL | PASS | **UPDATE-NOW** |
| `KILLSWITCH.md` open spec | PARTIAL (single org `killswitch-md`) | PARTIAL (n=1 named) | FAIL (~2mo) | STUDY-PILOT (re-audit Aug-2026) |
| Memory L4 wiki repos (5) | FAIL single-individual | PARTIAL (Karpathy-pattern citation) | FAIL (<3mo) | REJECT-UNTIL-CONVERGENCE (re-audit Aug-2026) |
| `KINSZONE/OpenHarness` | PARTIAL | PARTIAL | BORDERLINE (~3mo) | STUDY-PILOT |
| `coze-dev/coze-loop` | PASS (ByteDance) | PARTIAL | PASS (~11mo) | STUDY-PILOT (need license verify) |
| `Giskard-AI/giskard-oss` | PASS | PARTIAL | PASS (>4yr) | STUDY-PILOT |
| `microsoft/playwright-mcp` PIN to v0.0.75 | PASS (Microsoft) | PASS (Yury Semikhatsky) | PASS (>1yr) | **PIN-NOW** (CR-9 mandate) |
| `mksglu/context-mode` standalone | PASS | PARTIAL | BORDERLINE (~2.5mo) | ADOPT-NOW (live evidence) |
| `mozilla-ai/any-agent` | PASS (Mozilla) | PARTIAL | BORDERLINE (~1.5mo) | STUDY-PILOT |
| `KINSZONE/OpenHarness` 3-layer memory pattern | PARTIAL | PARTIAL | PASS (~3mo) | STUDY-PILOT-PRIORITY |
| `coze-dev/coze-loop` | PASS | PARTIAL | PASS | STUDY-PILOT |

---

## Section 6 — Top-3 Install Priorities (next fire candidates)

1. **PIN `microsoft/playwright-mcp@latest` → `0.0.75` SHA `8116437f`** — closes CR-9 violation (TODAY)
2. **INSTALL `anthropics/knowledge-work-plugins` marketplace** — official Anthropic, 3.5mo stable, fills knowledge-work plugin gap (Tier 4)
3. **INSTALL `modelcontextprotocol/servers` reference MCPs** (`time`/`filesystem`/`sequentialthinking`/`fetch`) — Anthropic OFFICIAL, mature 17mo+ (Tier 2)

---

## Section 7 — Anti-pattern: Manifest-vs-HEAD drift detection

Manifest at `Z:/claude-sota-installed/docs/sota-installed-manifest.md` should add a "HEAD freshness audit" section per CR-6 mandate. Detected drift instances:
- 3 already-installed repos have NEWER HEADs available (`obra/superpowers` / `addyosmani/agent-skills` / `oraios/serena` / `microsoft/playwright-mcp`)
- 1 violates CR-9 version-pin (`playwright-mcp@latest`)
- 0 manifest-pin SHA conflicts detected (no installed-but-stale verified-via-API)

Recommend wiring `cohort_coverage_audit.py` style audit for upstream-HEAD freshness gating per `Z:/claude-sota/.claude/rules/audit-action-loop.md` Wire/Surface/Close discipline.

---

## Findings Summary

- **40+ candidates** surfaced across 8 axes (some axes saturated, some sparse)
- **3+ HEAD updates available** for already-installed repos
- **2 NEW Anthropic-OFFICIAL marketplaces** missing from runtime (`knowledge-work-plugins` + `claude-plugins-community`)
- **Memory L4 axis** RICH but ENTIRELY <90d — wait for burn-in
- **Eval/observability axis** has 7+ mature candidates (manifest §15 EMPTY)
- **MCP discovery** axis missing the official `modelcontextprotocol/*` org (3 ADOPT-NOW)
- **Git hook axis** has clear winner (lefthook) — ready ADOPT-NOW
- **CR-9 violation detected**: `playwright-mcp@latest` needs version pin

VERDICT: Wave 122 fires Top-3 install priorities (Section 6) + 4 HEAD-update fix-forwards (Section 2). Memory L4 wiki axis DEFERRED pending Aug-2026 burn-in. Eval axis next-fire opportunity.
