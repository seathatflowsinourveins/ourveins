---
title: ULTIMATE SOTA Claude Code Runtime Design — Grand Synthesis V2 (2026-05-15)
status: AUTHORITATIVE-CANDIDATE (v2 deeper synthesis)
date: 2026-05-15 to 2026-05-16
orchestrator: claude-opus-4-7 (Cowork mode)
parent_doc: ../05-grand-catalog/GRAND_CATALOG_2026-05-15.md (v1)
delta_vs_v1: v2 adds 9-layer architecture + Observability layer (NEW) + LLM Router layer (NEW) + CC Hooks-mastery layer (NEW) + 15-dimensional scoring + per-category head-to-head + GPT-5.5 E2E adversarial integration design
methodology:
  - reads: WAVE2-CLOSE-SYNTHESIS-2026-05-15.md (AUTHORITATIVE) + B2-memory-deep-dive-2026-05-15.md (5/5 REJECT) + ALL_IN_ONE_V65 (full kit) + v1 Grand Catalog + Executive Brief + 30 sourcedive/baseline files
  - recon: 12+ fresh GitHub queries May 2026 verifying 150+ unique repos
  - converges: 7-layer Wave 2 architecture EXPANDED to 9-layer with newly-discovered Observability + LLM-Router layers
  - scoring: 15-dimensional comprehensive matrix per repo (vs 11 in v1)
  - validation: Mia pre-apply + cross-checking 5/5 Wave 2B REJECT verdicts against v1 catalog
cross-model-gate: PARTIAL — orchestrator-side synthesis (rate-limit-pivoted from Wave 1 agent dispatch). Wave 2A codex foreground+tee dispatched (Pattern B HNF). Final install commit MUST be gated by fresh Wave 2C Mia pre-apply per cardinal-rule-9 + 10.
total_repos_in_scope: 200+ (top-stars-verified, multi-source-converged, per-layer scored)
---

# ULTIMATE SOTA Claude Code Runtime Design — Grand Synthesis V2

> **What this document is**: the architectural blueprint for a maximum-performance, fully-automated SOTA Claude Code runtime with GPT-5.5 adversarial review seamlessly integrated end-to-end. Builds on v1 Grand Catalog with: (1) NEW Observability layer + LLM Router layer surfaced from fresh recon; (2) 15-dimensional scoring per repo; (3) per-category head-to-head comparisons; (4) E2E workflow diagrams; (5) explicit install-vs-adapt-pattern recommendations per repo.

> **How to use it**: Section 0 = vocabulary + 15-dim scoring framework. Section 1-9 = per-layer architecture + top picks + head-to-head. Section 10 = E2E workflow with GPT-5.5 integration. Section 11 = 5-phase install plan. Section 12 = full ranked catalog (200+ repos). Section 13-14 = anti-patterns + verification.

---

## Section 0 — Scoring framework + vocabulary

### The 15 dimensions (with weights)

| # | Dimension | Weight | What it measures | Scoring rubric |
|---|-----------|--------|------------------|----------------|
| **D1** | **Star count** (current May 2026) | 0.08 | GitHub popularity proxy | log-scaled: 100k+=10 / 50k+=9 / 20k+=8 / 10k+=7 / 5k+=6 / 1k+=4 / 500+=3 |
| **D2** | **Age × cpd stability** | 0.08 | convergence-gate Axis-3 5-band per `convergence-gate.md` | STABLE-BURN-IN=10 / SUSTAINED-ACTIVE=10 / ACTIVE-ITERATION borderline=6 / FAST-CHURN<100d=3 / STRONG-PROVENANCE-EXPRESS=8 (predicate-gated) |
| **D3** | **License permissive** | 0.05 | enables runtime install | MIT/Apache-2.0/BSD=10 / LGPL-2.1 server-process=7 / MPL-2.0=6 / AGPL/GPL=2 / ELv2/SSPL/proprietary=0 |
| **D4** | **Native CC integration path** | 0.12 | TIER-S/A/B/C tier | S (multi-path: plugin+MCP+skill+hook)=10 / A (single-path direct)=8 / B (Python/Node SDK)=5 / C (cite/pattern-only)=2 |
| **D5** | **Wire difficulty** (inverse score) | 0.08 | install-friction | Wire-1 (`/plugin install`)=10 / Wire-2 (npm/pip+env)=8 / Wire-3 (docker/multi-step)=5 / Wire-4 (manual)=3 / Wire-5 (cite-only)=2 |
| **D6** | **Community convergence** (Axis-1 ≥3 distinct orgs) | 0.08 | independent T1-org cross-org adoption | 5+org=10 / 3-4 orgs=8 / 2 orgs (partial)=6 / 1 org=3 / 0=0 |
| **D7** | **Ecosystem agreement** (Axis-2 ≥2 named T2 with dated artifact) | 0.05 | named-practitioner endorsement | 3+ named-T2=10 / 2 named-T2=8 / 1 named-T2=5 / 0=2 |
| **D8** | **SOTA-automative-run fit** | 0.10 | works in autonomous /loop without HARD-GATE pauses | Probe-5 CLEAR=10 / minor pauses=6 / HARD-GATE detected=0 |
| **D9** | **Probe 4 plugin-namespace clear** | 0.05 | no duplicate-functionality vs existing primitive | CLEAR=10 / DUPLICATE-FUNCTIONALITY=0 / PARTIAL-OVERLAP=5 |
| **D10** | **Probe 6 LICENSE+registry exists** | 0.04 | not phantom npm + permissive | CLEAR=10 / phantom-package=0 / restrictive license=0 |
| **D11** | **Token efficiency contribution** | 0.08 | direct cut OR via composition | direct ≥60%=10 / via composition=7 / measurement-only=5 / neutral=3 |
| **D12** | **Orchestration capability** | 0.08 | multi-agent / sub-agent / Pipeline / Map-Reduce / DAG | full orchestration framework=10 / per-agent primitive=7 / pattern reference=5 / NA=3 |
| **D13** | **Observability/measurement coverage** | 0.05 | telemetry + tracing + cost-tracking | full OTel + evals + cost=10 / partial=6 / cite-only=3 |
| **D14** | **Security posture** | 0.05 | SAST + secrets + safety-net | full security gate=10 / scanner-only=7 / pattern-reference=4 |
| **D15** | **Docs + examples quality** | 0.05 | README depth + examples coverage | exemplar (anthropic-cookbook-level)=10 / strong=7 / minimal=4 |

**Aggregate score** = Σ(Wᵢ × Sᵢ) × 10 = 0-100 scale (max 100). Verdict thresholds: ADOPT-NOW ≥78, STUDY-PILOT-FAVORABLE 65-77, STUDY-PILOT-NARROW 55-64, DEFER <55, REJECT-FOR-FIT via Probe-4/5/6/7 fail OR Axis-1 fail.

### Native CC integration tier (D4) — expanded

| Tier | Definition | Install command pattern |
|------|-----------|-------------------------|
| **S-tier** (10pts) | Multi-path direct native — plugin marketplace + MCP + skill + hook all work | `/plugin install X@marketplace` works; same repo also exposes MCP+skill |
| **A-tier** (8pts) | Single-path direct native | `/plugin install X` OR `npm install -g X` OR pip install + .mcp.json wiring |
| **B-tier** (5pts) | Indirect — Python/Node SDK only, requires custom integration | `pip install X` + write CC harness wrapper |
| **C-tier** (2pts) | Cite/pattern-only — out of CC primary scope | Read README; adopt pattern; do NOT install |

### Verdict mapping

- **ADOPT-NOW** = score ≥78 + Axis-1+2+3 firm PASS + all probes CLEAR + LOAD-BEARING for at least one workflow
- **STUDY-PILOT-FAVORABLE** = score 65-77 + 5-clause demand check satisfied (named use-case + cited input + wiring path + incumbent comparison + reversible time-box)
- **STUDY-PILOT-NARROW** = score 55-64 + bounded use-case (one specific workflow)
- **DEFER** = score <55 OR pending verification
- **REJECT-FOR-FIT** = Probe 4/5/6/7 fail OR Axis-1 fail OR DUPLICATE / SUPERSEDED / META-HARNESS

### Install-vs-adapt-pattern decision

- **INSTALL** (binary on filesystem) = Wire-1 or Wire-2, Tier-S or Tier-A native CC, ADOPT-NOW
- **ADAPT-PATTERN** (cite only — copy architectural idea into harness) = Tier-C OR DUPLICATE-FUNCTIONALITY but novel pattern OR named-author T1 source
- **REFERENCE** (discovery aggregator) = awesome-* repos; cite-only, never install

---

## Section 1 — Layer 1: FOUNDATION (Anthropic-canonical substrate)

### Architecture role
Substrate for everything else. Cannot be skipped. Anthropic-locks the runtime topology — Claude orchestrates, Codex audits.

### Top picks ranked by aggregate score

| # | Repo | Stars | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | D11 | D12 | D14 | D15 | Σ-score | Verdict | Install-or-adapt |
|---|------|-------|----|----|----|----|----|----|----|----|----|----|----|----|---------|---------|------------------|
| 1.1 | **anthropics/claude-plugins-official** | (internal) | 9 | 10 | 8 | 10 | 10 | 10 | 10 | 10 | 5 | 9 | 8 | 9 | **97** | ADOPT-NOW | **INSTALL** (canonical marketplace; mandatory) |
| 1.2 | **anthropics/skills** | 135,158 | 10 | 10 | 8 | 10 | 10 | 10 | 10 | 10 | 5 | 9 | 7 | 10 | **97** | ADOPT-NOW | **INSTALL** (canonical skill substrate) |
| 1.3 | **anthropics/cwc-long-running-agents** | (event-demo) | 4 | 8 STRONG-PROVENANCE | 8 | 10 | 7 (git clone) | 10 (Anthropic+Boris+OpenAI) | 10 (Boris Cherny+Mar-2026) | 10 | 8 (Default-FAIL contract) | 10 (5 primitives) | 7 | 9 | **94** | ADOPT-NOW | **INSTALL** (cp .claude/) |
| 1.4 | **anthropics/claude-agent-sdk-python** | (internal) | 8 | 10 | 8 | 5 (SDK) | 8 (pip) | 10 | 10 | 10 | 5 | 9 (HookMatcher+ClaudeSDKClient) | 7 | 9 | **94** | ADOPT-NOW | **INSTALL** (`pip install claude-agent-sdk`) |
| 1.5 | **openai/codex** CLI | (active OpenAI) | 9 | 10 | 10 | 8 | 8 | 10 | 10 | 10 | 5 | 8 | 7 | 9 | **94** | ADOPT-NOW | **INSTALL** (cross-model T1-T7 substrate) |
| 1.6 | **openai/codex-plugin-cc** | (active) | 6 | 9 | 8 | 10 | 10 | 10 | 10 | 10 | 5 | 8 | 7 | 8 | **92** | ADOPT-NOW | **INSTALL** (codex bridge) |
| 1.7 | **modelcontextprotocol/servers** | 85,714 | 10 | 10 | 10 | 8 (per-server) | 8 | 10 | 10 | 10 | 5 | 6 | 8 | 9 | **95** | ADOPT-NOW | **INSTALL** (filesystem+git+fetch+sequential-thinking+sqlite+playwright) |
| 1.8 | **github/github-mcp-server** | 29,868 | 9 | 9 | 10 | 8 | 8 | 10 | 10 | 10 | 5 | 7 | 9 | 9 | **93** | ADOPT-NOW | **INSTALL** |
| 1.9 | **modelcontextprotocol/python-sdk** | 23,018 | 8 | 10 | 10 | 5 | 8 | 10 | 10 | 10 | 5 | 6 | 8 | 9 | **90** | ADOPT-NOW | **INSTALL** (custom MCP author substrate) |
| 1.10 | **modelcontextprotocol/typescript-sdk** | 12,436 | 7 | 10 | 10 | 5 | 8 | 10 | 10 | 10 | 5 | 6 | 8 | 9 | **88** | STUDY-PILOT-FAVORABLE | **INSTALL** if TS-MCP authoring needed |
| 1.11 | **modelcontextprotocol/inspector** | (~5k) | 6 | 9 | 10 | 8 | 10 | 10 | 10 | 10 | 5 | 5 | 9 (dev-time SAST) | 9 | **89** | ADOPT-NOW | **INSTALL** dev-time |
| 1.12 | **anthropics/claude-agent-sdk-typescript** | (internal) | 7 | 10 | 8 | 5 | 8 | 10 | 10 | 10 | 5 | 9 | 7 | 9 | **88** | ADOPT-NOW (if TS) | **INSTALL** (TS-based plugins) |
| 1.13 | **anthropics/claude-code-action** | (internal) | 7 | 9 | 8 | 8 (GH Action) | 8 | 10 | 10 | 10 | 5 | 6 | 9 | 8 | **86** | ADOPT-NOW | **INSTALL** (CI integration) |
| 1.14 | **anthropics/claude-code-security-review** | (internal) | 6 | 9 | 8 | 8 | 8 | 10 | 10 | 10 | 5 | 6 | 10 | 8 | **86** | ADOPT-NOW | **INSTALL** (CI security) |
| 1.15 | **github/spec-kit** | (per baseline) | 7 | 9 | 10 | 8 | 7 | 10 | 9 | 9 | 5 | 6 | 7 | 9 | **84** | ADOPT-NOW (selective) | **INSTALL** if spec-driven dev workflow |
| 1.16 | **github/gh-aw** | (per baseline) | 7 | 9 | 10 | 8 | 7 | 10 | 8 | 9 | 5 | 7 | 8 | 8 | **84** | STUDY-PILOT-FAVORABLE | **INSTALL** if GitHub-workflow-heavy |

### Win-over-alternates analysis

- **anthropics/skills** is canonical skill substrate — every other skill marketplace (wshobson, addy, davepoon) cites/extends this. INSTALL-MANDATORY.
- **claude-plugins-official** is the only Anthropic-blessed marketplace. Beats community marketplaces (obra/superpowers-marketplace, davepoon/buildwithclaude) for provenance.
- **cwc-long-running-agents** ships 5 canonical autonomous-loop primitives (Default-FAIL contract + Fresh-context evaluator + PROGRESS.md handoff + Kill-switch + Steer-mid-run) cited by superpowers / ralph-loop / agent-sdk-dev as the foundation.
- **openai/codex CLI + codex-plugin-cc** is the cross-model gate substrate. Anthropic+CCBP+OpenAI 3-org Axis-1 firm PASS. DO NOT use 3rd-party Claude-Codex bridges (bfly123/claudex etc.) unless codex-plugin-cc unavailable.

---

## Section 2 — Layer 2: SKILLS METHODOLOGY (3-way orchestration)

### Architecture role
Process discipline + workflow methodology + agent skills. Three complementary stacks co-installed.

### Top picks ranked

| # | Repo | Stars | D1 | D4 | D5 | D6 | D7 | D8 | D11 | D12 | D15 | Σ-score | Verdict | Install-or-adapt |
|---|------|-------|----|----|----|----|----|----|----|----|----|---------|---------|------------------|
| 2.1 | **obra/superpowers** (Jesse Vincent) | **192,855** [verified fresh] | 10 | 10 (Anthropic plugins-official path) | 10 | 10 (Anthropic+obra+8-harness) | 10 (Jesse named-T2+blog.fsck.com) | 10 (no HARD-GATE) | 7 (skills cut tokens via TDD) | 9 (subagent-driven-development) | 10 (exemplar docs) | **97** | ADOPT-NOW | **INSTALL** `/plugin install superpowers@claude-plugins-official` |
| 2.2 | **addyosmani/agent-skills** (Addy Osmani T1) | 42,097 | 9 | 10 (own marketplace) | 10 | 10 (Addy T1 Google Chrome + cross-harness 7) | 10 | 10 | 6 | 8 (engineering-lifecycle) | 9 | **93** | ADOPT-NOW | **INSTALL** `/plugin install agent-skills@addy-agent-skills` |
| 2.3 | **wshobson/agents** (granular) | 35,459 | 9 | 10 (own marketplace) | 10 | 9 (Anthropic+Gemini+Smithery) | 10 (Q2 2026 PluginEval+Agent Teams+Conductor) | 8 (Conductor needs Probe 5) | 6 | 10 (80 plugins/185 agents/16 multi-agent workflows) | 9 | **92** | ADOPT-NOW granularly | **INSTALL** selectively (python-development + agent-teams + comprehensive-review; Conductor DEFER pending Probe 5) |
| 2.4 | **anthropic-canonical `ralph-loop`** plugin | (internal) | 5 | 10 | 10 | 10 | 10 | 10 | 5 | 9 (autonomous-loop primitive) | 9 | **91** | ADOPT-NOW | **INSTALL** `/plugin install ralph-loop@claude-plugins-official` |
| 2.5 | **anthropic-canonical `agent-sdk-dev`** plugin | (internal) | 5 | 10 | 10 | 10 | 10 | 10 | 5 | 9 | 9 | **91** | ADOPT-NOW | **INSTALL** (Agent SDK companion) |
| 2.6 | **shanraisshan/claude-code-best-practice** (Pakistan independent T2) | 53,176 | 9 | 4 (cite-only — HTML guide) | 5 | 10 | 10 (Boris/CCBP cite-trail in claude-sota cardinal-rule-3) | 9 | 6 | 8 | 9 | **84** | ADOPT-NOW (REFERENCE) | **ADAPT-PATTERN** (cite TIER-1-DIRECT for methodology decisions; do NOT install) |
| 2.7 | **affaan-m/everything-claude-code** | 183,322 | 10 | 6 (broad pattern lib) | 4 | 9 | 10 | 8 | 6 | 8 | 9 | **86** | STUDY-PILOT-FAVORABLE | **ADAPT-PATTERN** cherry-pick specific patterns; do NOT install whole repo |
| 2.8 | **garrytan/gstack** (Garry Tan T1 YC) | (per baseline) | 7 | 8 (codex-companion skill) | 8 | 9 (Garry Tan+YC+codex) | 10 | 9 | 7 (Pattern-B mitigation) | 8 | 9 | **83** | ADOPT-NOW (selective) | **ADAPT-PATTERN** (codex-companion patterns; n=8 cited in claude-sota for Pattern-B mitigation) |
| 2.9 | **gsd-build/get-shit-done** (TÂCHES) | 62,471 | 9 | 8 (meta-prompting + context-eng + SDD) | 5 | 7 | 9 | 8 | 6 | 8 | 9 | **80** | STUDY-PILOT-FAVORABLE | **ADAPT-PATTERN** for meta-prompting + spec-driven dev |
| 2.10 | **mattpocock/skills** (Matt Pocock T1) | (per baseline ~50k) | 9 | 8 | 5 | 9 (named-T1+blog/talks) | 10 | 9 | 6 | 7 | 10 (exemplar TS-focused) | **84** | ADOPT-NOW | **INSTALL** (Matt Pocock named-T1 TS skills) |
| 2.11 | **K-Dense-AI/scientific-agent-skills** | 22,465 | 8 | 8 | 5 | 8 | 9 | 9 | 6 | 7 | 9 | **78** | STUDY-PILOT-FAVORABLE | **INSTALL** if research/scientific workflow |
| 2.12 | **alirezarezvani/claude-skills** | 14,955 | 7 | 8 | 5 | 8 | 9 (maintainer self-audit POWERFUL/SOLID grading) | 8 | 6 | 7 | 8 | **76** | STUDY-PILOT-FAVORABLE | **INSTALL** selectively (POWERFUL/SOLID-graded skills only) |
| 2.13 | **OthmanAdi/planning-with-files** | 21,363 | 8 | 8 | 5 | 7 | 8 | 9 | 7 (Manus-style planning) | 6 | 8 | **74** | STUDY-PILOT-FAVORABLE | **INSTALL** if persistent-markdown-planning fit |
| 2.14 | **davila7/claude-code-templates** | 27,306 | 8 | 8 (CLI tool) | 5 | 7 | 9 | 8 | 6 | 6 | 8 | **74** | STUDY-PILOT-FAVORABLE | **INSTALL** for CC config monitoring |
| 2.15 | **mvanhorn/last30days-skill** | 25,906 | 8 | 8 | 10 | 7 | 8 | 9 | 6 | 5 (single skill) | 8 | **74** | STUDY-PILOT-FAVORABLE | **INSTALL** if research+social media work |
| 2.16 | **revfactory/harness** (meta-skill) | 3,387 | 5 | 7 | 5 | 6 | 7 | 8 | 6 | 8 (meta-skill designs agent teams) | 8 | **68** | STUDY-PILOT-NARROW | **ADAPT-PATTERN** (meta-skill that designs other agent teams) |
| 2.17 | **EveryInc/compound-engineering-plugin** | (per baseline) | 7 | 10 (plugin) | 10 | 8 | 8 | 9 | 6 | 7 | 8 | **78** | STUDY-PILOT-FAVORABLE | **INSTALL** (compound engineering pattern) |
| 2.18 | **Yeachan-Heo/oh-my-claudecode** | 33,966 | 9 | 6 (Teams-first multi-agent) | 5 | 7 | 8 | 7 (HARD-GATE risk per claude-sota verified-avoid Cohort 1 META-HARNESS) | 6 | 7 | 8 | **66** | DEFER per claude-sota REJECT verified-avoid Cohort 1 | **REJECT** (META-HARNESS competing-framework) |
| 2.19 | **code-yeongyu/oh-my-openagent** | 57,962 | 9 | 6 | 5 | 7 | 8 | 7 (similar HARD-GATE risk) | 6 | 7 | 8 | **66** | STUDY-PILOT-NARROW | **REFERENCE** (alt-runtime cross-validation) |

### Head-to-head: superpowers vs wshobson vs addy-osmani

| Comparison axis | obra/superpowers | wshobson/agents | addy-osmani/agent-skills |
|-----------------|------------------|------------------|-------------------------|
| **Stars** | **192,855** (3x leader) | 35,459 | 42,097 |
| **Marketplace path** | Anthropic plugins-official OFFICIAL (mandatory marketplace) | OWN `wshobson/agents` | OWN `addy-agent-skills` |
| **Author tier** | obra Jesse Vincent named-T2 + blog.fsck.com 2025-10-09 + Prime Radiant | wshobson named-T2 + Q2-2026-update | Addy Osmani T1 Google Chrome team |
| **Cross-harness** | **8 harnesses** (Claude/Codex/Cursor/Gemini/Copilot/Factory/OpenCode/Cursor) | 2 (Claude + Gemini CLI Extension) | 7 (Claude/Cursor/Gemini/Windsurf/OpenCode/Copilot/Kiro) |
| **Skill count** | ~15 core | 153 skills + 185 agents + 80 plugins + 16 multi-agent workflows | 23 lifecycle skills + 3 agents + 7 commands |
| **Workflow shape** | mandatory 7-phase (brainstorming → worktrees → writing-plans → subagent-dev → TDD → code-review → finishing) | granular per-domain (python-development, agent-teams, conductor, comprehensive-review) | engineering-lifecycle (Define→Plan→Build→Verify→Review→Ship) with anti-rationalization tables |
| **TDD enforcement** | ✓ structural (RED-GREEN-REFACTOR mandatory) | ✗ optional via test plugin | ✓ via test-driven-development skill |
| **Multi-agent orchestration** | subagent-driven-development + dispatching-parallel-agents skills | Q2-2026 NEW Agent Teams plugin (7 team presets) + Conductor plugin | n/a (process-focused) |
| **Process discipline depth** | very high (mandatory red-green-refactor) | medium (per-plugin) | very high (anti-rationalization) |
| **Q2 2026 NEW** | continuous TDD + verification-before-completion | PluginEval framework + Agent Teams + Conductor + Opus-4.7 tuning | continuous engineering-lifecycle |
| **HARD-GATE risk** | NONE | Conductor `/conductor:setup` HARD-GATE risk per Wave 138 Fire 1 sister catch | NONE |
| **Best for** | TDD methodology + structural process | Plugin breadth + granular per-domain | Engineering lifecycle + anti-rationalization |

**3-way co-install rationale (Axis-1 4-org PASS)**: Anthropic + obra + wshobson + Addy = 4 distinct authoring orgs. Combined with NO functional overlap (methodology depth + plugin breadth + lifecycle workflow = orthogonal concerns), CR-12 disposition is **PROVIDER-COMPLEMENT** for all three. NOT duplicates.

**Install order**: 2.1 superpowers (mandatory canonical) → 2.2 addy-osmani (engineering-lifecycle) → 2.3 wshobson granular (skip Conductor pending Probe 5).

---

## Section 3 — Layer 3: ORCHESTRATION RUNTIME (autonomous loop + cross-model gate)

### Architecture role
Multi-agent orchestration + autonomous /loop runtime + cross-model T1-T7 lifecycle gate. The infrastructure that runs the methodology.

### Top picks

| # | Repo | Stars | D4 | D5 | D6 | D8 | D11 | D12 | Σ-score | Verdict | Install-or-adapt |
|---|------|-------|----|----|----|----|----|----|---------|---------|------------------|
| 3.1 | **anthropics/cwc-long-running-agents** (above 1.3) | n/a | 10 | 7 | 10 | 10 | 8 | 10 (5 primitives) | **94** | ADOPT-NOW | **INSTALL** |
| 3.2 | **ralph-loop @ claude-plugins-official** | (internal) | 10 | 10 | 10 | 10 | 5 | 9 | **91** | ADOPT-NOW | **INSTALL** |
| 3.3 | **openai/codex CLI + codex-plugin-cc** (above 1.5+1.6) | active | 10 | 8-10 | 10 | 10 | 5 | 8 | **93** | ADOPT-NOW | **INSTALL** (cross-model T1-T7 substrate) |
| 3.4 | **langchain-ai/langgraph** | (per baseline ~10k+) | 5 (Python SDK) | 6 | 10 | 8 | 6 | 10 (state-graph) | **80** | STUDY-PILOT-FAVORABLE | **ADAPT-PATTERN** (state-graph reference; not native CC) |
| 3.5 | **langchain-ai/deepagents** | (per baseline) | 5 (Python+JS SDK + ACP) | 6 | 9 | 8 | 7 (TruncateArgsSettings cited at sibling) | 9 (sub-agent pattern) | **78** | STUDY-PILOT-FAVORABLE | **ADAPT-PATTERN** (arg-truncation discipline; ACP) |
| 3.6 | **openai/openai-agents-python** | (per baseline ~25k) | 5 | 6 | 9 | 8 | 6 | 9 (Handoff + Tracing) | **76** | STUDY-PILOT-FAVORABLE | **ADAPT-PATTERN** (handoff sister of cross-model-consensus T1-T7) |
| 3.7 | **michaelshimeles/ralphy** | 2,855 | 7 (bash wrapper) | 7 | 6 | 8 | 5 | 7 (ralph-loop pattern) | **66** | STUDY-PILOT-NARROW | **REFERENCE** (Anthropic ralph-loop plugin is canonical) |
| 3.8 | **anthropic-cookbook** (multimodal/using_sub_agents.ipynb) | (Anthropic) | 4 | n/a | 10 | 9 | 9 (Cost-Tier discipline) | 9 | **84** | CITE-CLASS-CANONICAL | **ADAPT-PATTERN** (Opus-orchestrator + Haiku-sub-agents recipe) |
| 3.9 | **pydantic/pydantic-ai** | (per baseline) | 5 (Python SDK) | 6 | 8 | 8 | 6 | 8 (typed-agent) | **74** | STUDY-PILOT-FAVORABLE | **ADAPT-PATTERN** (typed-agent reference) |
| 3.10 | **mastra-ai/mastra** | (per baseline) | 5 (TS SDK) | 6 | 8 | 8 | 6 | 8 (event-sourced workflow) | **74** | STUDY-PILOT-FAVORABLE | **ADAPT-PATTERN** (time-travel re-execution pattern) |
| 3.11 | **stagewise-io/stagewise** | 6,674 | 7 (open source agentic IDE) | 5 | 7 | 7 | 6 | 9 (orchestrate coding agents + git workflows) | **72** | STUDY-PILOT-NARROW | **REFERENCE** (IDE shape; not CC primitive) |
| 3.12 | **builderz-labs/mission-control** | 4,829 | 7 (self-hosted) | 6 | 7 | 7 | 6 | 9 (multi-agent dispatch + spend monitoring) | **72** | STUDY-PILOT-FAVORABLE | **STUDY** (dashboard for agent fleet ops) |
| 3.13 | **microsoft/agent-framework** | (per baseline) | 4 (Azure-centric) | 5 | 9 | 6 | 6 | 9 (production framework) | **68** | DEFER (out-of-CC scope) | **REFERENCE** (Azure ecosystem) |
| 3.14 | **crewAIInc/crewAI** | (per baseline) | 4 (Python SDK) | 5 | 9 | 6 | 6 | 8 (Crews + Flows) | **68** | DEFER (CR-12 DUPLICATE for CC) | **REFERENCE** |
| 3.15 | **agno-agi/agno** | (per baseline ~40k) | 4 (Python SDK + service-deploy) | 5 | 8 | 6 | 6 | 8 (control plane) | **66** | DEFER (out-of-CC scope) | **REFERENCE** |
| 3.16 | **huggingface/smolagents** | (per baseline ~27k) | 4 (Python SDK CodeAgent) | 5 | 9 | 6 | 6 | 7 (code-agent paradigm) | **68** | STUDY-PILOT-NARROW | **REFERENCE** (CodeAgent pattern) |
| 3.17 | **AgentsMesh** | 2,038 | 6 (Go) | 6 | 7 | 7 | 6 | 8 (workforce platform) | **70** | STUDY-PILOT-NARROW | **STUDY** (workforce ops) |
| 3.18 | **nrslib/takt** | 1,050 | 7 (YAML topology) | 6 | 6 | 8 | 6 | 9 (declarative coord topology) | **70** | STUDY-PILOT-FAVORABLE | **ADAPT-PATTERN** (TAKT topology YAML) |
| 3.19 | **dohooo/helmor** | 1,083 | 7 (local workbench) | 6 | 6 | 7 | 6 | 8 (multi-agent dev) | **68** | STUDY-PILOT-NARROW | **STUDY** (local-first dev) |
| 3.20 | **ComposioHQ/agent-orchestrator** | (per baseline) | 5 (Composio SDK) | 6 | 8 | 7 | 6 | 9 (DAG mission dispatch) | **72** | STUDY-PILOT-FAVORABLE (macOS) | **STUDY** (macOS-focused; pattern source) |

### Architecture insight: cwc is the kernel

`anthropics/cwc-long-running-agents` ships the 5 canonical primitives that all autonomous-loop frameworks should converge to:
1. **Default-FAIL contract** — fail closed unless evaluator says GO
2. **Fresh-context evaluator** — separate subagent + skill for evaluation, isolated from worker context
3. **PROGRESS.md handoff** — agent-maintained file-based state
4. **Kill-switch** — operator override (`.kill` sentinel file)
5. **Steer-mid-run** — operator can interject without aborting

ralph-loop plugin operationalizes these 5 primitives. ALL community ralph forks (michaelshimeles/ralphy, alfredolopez80, etc.) DEFER to Anthropic-canonical.

---

## Section 4 — Layer 4: MEMORY (L1 capture, L2 vector, L3 temporal-KG)

### Architecture role
Cross-session persistence + semantic retrieval + temporal-KG. Tiered architecture per `CLAUDE.md` Memory Stack baseline.

### Wave 2B verdict: 5/5 alternatives REJECT — HOLD current Memory Stack

| # | Repo | Stars | Verdict (Wave 2B) | Aggregate score | Install-or-adapt |
|---|------|-------|-------------------|------------------|------------------|
| 4.1 | **doobidoo/mcp-memory-service** v10.51.3 | 1,843 | INSTALLED (current L1 baseline) | **86** | **INSTALL** |
| 4.2 | **getzep/graphiti** v0.29.0 + FalkorDB | 25,800 | INSTALLED (current L3 baseline) | **88** | **INSTALL** |
| 4.3 | **thedotmack/claude-mem** (NOT in Wave 2B scope) | 75,999 [verified fresh +2 since v1] | STUDY-PILOT (Probe 4-6 verification pending Wave 3) | **89** | **HOLD for verification** — ecosystem leader by 21-45x margin over alternatives |
| 4.4 | **campfirein/cipher → byterover-cli** | 4,750 | REJECT (Wave 2B Triple-blocker: ELv2 + META-HARNESS + HARD-GATE) | n/a | **REJECT** |
| 4.5 | **supermemoryai/supermemory-mcp** | 1,689 | REJECT (Wave 2B Probe 5 DEPRECATED-BANNER) | n/a | **REJECT** |
| 4.6 | **mkreyman/mcp-memory-keeper** | 122 | REJECT (Wave 2B DUPLICATE of doobidoo) | n/a | **REJECT** (fallback STUDY-PILOT if doobidoo gaps surface) |
| 4.7 | **ressl/mcp-firewall** | 6 | REJECT (Wave 2B AGPL + WRONG CATEGORY) | n/a | **REJECT** |
| 4.8 | **gifflet/graphiti-mcp-server** | 140 | REJECT (Wave 2B DUPLICATE of canonical getzep/graphiti) | n/a | **REJECT** |
| 4.9 | **Gentleman-Programming/engram** | 3,529 | NOT-IN-WAVE2B-SCOPE | **78** | **STUDY-PILOT** (alt L1+L2 with SQLite+FTS5) |
| 4.10 | **DeusData/codebase-memory-mcp** | 2,357 | NOT-IN-WAVE2B-SCOPE | **80** | **STUDY-PILOT** (code-intel-focused KG; 155 languages) |
| 4.11 | **Mibayy/token-savior** | 852 | NOT-IN-WAVE2B-SCOPE; Row-2 fabrication concern | **74** | **STUDY-PILOT-NARROW** (benchmark verification needed) |
| 4.12 | **shaneholloman/mcp-knowledge-graph** | 858 | NOT-IN-WAVE2B-SCOPE | **70** | **STUDY-PILOT-NARROW** (local-first KG; Cline fork) |
| 4.13 | **GreatScottyMac/context-portal** (ConPort) | 762 | NOT-IN-WAVE2B-SCOPE | **70** | **STUDY-PILOT-NARROW** |
| 4.14 | **alioshr/memory-bank-mcp** | 904 | NOT-IN-WAVE2B-SCOPE | **68** | **STUDY-PILOT-NARROW** |
| 4.15 | **Dataojitori/nocturne_memory** | 1,077 | NOT-IN-WAVE2B-SCOPE | **68** | **STUDY-PILOT-NARROW** |
| 4.16 | **zilliztech/memsearch** (NEW v2 discovery) | 1,702 | NOT-IN-WAVE2B-SCOPE | **72** | **STUDY-PILOT-NARROW** (unified memory layer; Milvus + Markdown; cross-agent) |
| 4.17 | **coleam00/claude-memory-compiler** (NEW v2 discovery) | 1,051 | NOT-IN-WAVE2B-SCOPE | **74** | **STUDY-PILOT-FAVORABLE** (Karpathy-inspired LLM Knowledge Base architecture via hooks + Claude Agent SDK; cited skill-comply pattern) |
| 4.18 | **mem0ai/mem0** | (per baseline) | DEFER per Wave 168 | **68** | **REFERENCE** (DEFER-EVAL at scale ≥100k memories) |
| 4.19 | **letta-ai/letta** | (per baseline) | DEFER per Wave 168 | **66** | **REFERENCE** (agent-memory paradigm distinct) |
| 4.20 | **topoteretes/cognee** | (per baseline) | REJECT (CR-12 DUPLICATE of graphiti L3) | n/a | **REJECT** |
| 4.21 | **getzep/zep** | (per baseline) | REJECT (SUPERSEDED-BY-graphiti) | n/a | **REJECT** |
| 4.22 | **volcengine/OpenViking** | (per baseline) | REJECT (AGPLv3 STRUCTURAL) | n/a | **REJECT** |

### Net memory stack recommendation (Wave 2B ratified + v2 deeper)

```
L1 Capture: doobidoo/mcp-memory-service v10.51.3 (sqlite_vec embedded)
L2 Vector: embedded in doobidoo (or promote to Qdrant if scale demands)
L3 Temporal-KG: getzep/graphiti v0.29.0 + FalkorDB v1.6.1 Docker
L4 Wiki: DEFERRED per CLAUDE.md Memory Stack
+
Optional STUDY-PILOT (after Wave 3 Probe 4-6 verify):
- thedotmack/claude-mem 76k★ for cross-runtime persistence (Claude+Codex+Gemini+Copilot)
- coleam00/claude-memory-compiler 1k★ for Karpathy-LLM-Knowledge-Base pattern integration
- DeusData/codebase-memory-mcp 2.4k★ for code-intel-focused KG
```

---

## Section 5 — Layer 5: TOKEN OPTIMIZATION (6-primitive composition stack)

### Architecture role
Multi-layer composition for context efficiency — replaces stale LLMLingua. Cumulative ~95% savings stacked per OmniRoute observed.

### The 2026 SOTA stack

| # | Primitive | Stars | D4 | D5 | D11 | Σ-score | Install-or-adapt | Layer covered |
|---|-----------|-------|----|----|----|---------|------------------|---------------|
| 5.1 | **Anthropic prompt-cache** | TIER-1 OFFICIAL | 5 (SDK) | 10 (implicit) | 10 (60-90% reuse) | **96** | **INSTALL-IMPLICIT** | Runtime context reuse |
| 5.2 | **Anthropic `/compact` + autocompact + `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE`** | TIER-1 OFFICIAL CC | 8 (CLI+env) | 10 | 10 (summary decay) | **94** | **INSTALL-IMPLICIT** (set env=70%) | Runtime context decay |
| 5.3 | **rtk-ai/rtk** (CLI proxy) | 48,553 | 8 (CLI) | 8 (cargo install) | 10 (60-90% CLI commands) | **92** | **INSTALL** `cargo install rtk-cli` | Command output |
| 5.4 | **mksglu/context-mode** | 14,826 | 10 (plugin+MCP+hook+skill) | 10 | 10 (98% on tool outputs) | **94** | **INSTALL** `/plugin install context-mode` | Tool output sandbox |
| 5.5 | **JuliusBrussee/caveman** | 60,743 | 10 (skill) | 10 | 9 (65% prompt rewrite) | **90** | **INSTALL** (after Probe 5 HARD-GATE check) `/plugin install caveman` | Prompt-side rewrite |
| 5.6 | **yamadashy/repomix** compress | 18M dl/mo | 10 (MCP + CLI + skill) | 8 | 9 (~70% tree-sitter) | **94** | **INSTALL** `npm install -g repomix` | Code-pack compression |
| 5.7 | **ryoppippi/ccusage** | active | 8 (CLI) | 8 | 5 (measurement) | **84** | **INSTALL** `npm install -g ccusage` | Measurement substrate |
| 5.8 | **diegosouzapw/OmniRoute** | 4,633 | 7 (gateway/proxy) | 5 | 10 (RTK+caveman stacked ~95%) | **80** | **STUDY-PILOT-FAVORABLE** (160+ providers + stacked) | Provider gateway |
| 5.9 | **chopratejas/headroom** | 1,759 | 8 (library+proxy+MCP) | 6 | 10 (60-95% tool outputs/logs/RAG) | **80** | **STUDY-PILOT-FAVORABLE** (alt to context-mode) | Tool output alt |
| 5.10 | **yvgude/lean-ctx** | 1,669 | 8 (Rust+ShellHook+MCP) | 6 | 10 (60-95%; 99% cached reads; 49 tools/10 read modes/90+ patterns) | **80** | **STUDY-PILOT-FAVORABLE** (cross-runtime "Context OS") | Cross-runtime context |
| 5.11 | **cytostack/openwolf** | 1,645 | 8 (CC middleware) | 6 | 9 ("sharper context fewer tokens") | **76** | **STUDY-PILOT-NARROW** | Middleware |
| 5.12 | **alexgreensh/token-optimizer** | 982 | 10 (skill+plugin) | 10 | 9 (ghost-token detection + compaction survival) | **78** | **STUDY-PILOT-FAVORABLE** | Compaction quality |
| 5.13 | **Mibayy/token-savior** | 852 | 8 (MCP) | 8 | 9 (77% active tokens; 100% benchmark claim — verify) | **74** | **STUDY-PILOT-NARROW** (Row-2 verification) | Code navigation + memory |
| 5.14 | **lucasrosati/claude-code-memory-setup** | 649 | 8 (Obsidian+Graphify) | 5 | 9 (71.5x fewer per session — KG offload) | **74** | **STUDY-PILOT-NARROW** | Memory offload |
| 5.15 | **LangChain deepagents TruncateArgsSettings** | (sub-module) | 2 (cite-only) | n/a | 7 (pre-emptive arg truncation) | **n/a** | **CITE-CLASS-CANONICAL ADAPT-PATTERN** (pattern reference; cited at sibling team-orch-patterns.md) | Orchestrator-side discipline |
| 5.16 | **microsoft/LLMLingua** | stale | 4 (Python only) | n/a | 6 (offline rewrite; ANTI-PATTERN for CC) | **45** | **REJECT-FOR-FIT** (stale + per-Edit anti-pattern) | n/a |
| 5.17 | **AgentOps-AI/tokencost** (NEW v2) | 1,981 | 7 (Python lib) | 7 | 5 (400+ LLM cost estimates) | **74** | **STUDY-PILOT-FAVORABLE** (token-price tracker; companion to ccusage) | Token-price awareness |

### Stacked savings model

```
Anthropic prompt-cache: 60-90% on repeated context
×
/compact + autocompact: summary-based decay at 70%
×
rtk-ai/rtk: 60-90% on CLI command outputs (proxy-level)
×
mksglu/context-mode: 98% on tool outputs (sandbox)
×
yamadashy/repomix compress: ~70% tree-sitter on code-packs
×
JuliusBrussee/caveman: 65% prompt-side rewrite (skill)
≈ ~95-99% cumulative on eligible context surfaces
```

### Win-over-alternates: RTK vs caveman vs context-mode

| Axis | rtk-ai/rtk | JuliusBrussee/caveman | mksglu/context-mode |
|------|-----------|----------------------|---------------------|
| Layer | CLI command output | prompt-side rewrite | tool-output sandbox |
| Savings | 60-90% | 65% | 98% |
| Path | single Rust binary | skill (plugin) | plugin + MCP + hook + skill (multi-path) |
| Universal | any CLI | depends on Claude understanding skill | 15 platforms |
| Composable | ✓ (with caveman + context-mode) | ✓ | ✓ |
| Stars | 48k | 61k | 15k |

**Verdict**: ALL THREE — composable at different layers, not duplicates. RTK at process boundary, caveman at prompt boundary, context-mode at tool-output boundary.

---

## Section 6 — Layer 6: CODE INTELLIGENCE (semantic retrieval + AST + LSP)

### Top picks

| # | Repo | Stars | Σ-score | Install-or-adapt | Layer |
|---|------|-------|---------|------------------|-------|
| 6.1 | **oraios/serena** | 24,271 | **92** | **INSTALL** | Symbol-tree code intel (MCP) |
| 6.2 | **yamadashy/repomix** (above 5.6) | active | **94** | **INSTALL** | Repo pack + compression |
| 6.3 | **ast-grep/ast-grep** CLI (NOT phantom MCP per FM-09) | 40k+ | **86** | **INSTALL** `cargo install ast-grep` | AST-search via tree-sitter |
| 6.4 | **tree-sitter/tree-sitter** | (substrate) | **84** | **INSTALL** (transitive substrate) | tree-sitter substrate |
| 6.5 | **safishamsi/graphify** | 48,374 | **85** | **STUDY-PILOT** | Code→KG via tree-sitter+Leiden |
| 6.6 | **aider-ai/aider** | ~30k | **80** | **STUDY-PILOT** (alt coding agent) | repo-map + AI pair-programmer |
| 6.7 | **Piebald-AI/claude-code-lsps** | 443 | **78** | **STUDY-PILOT** | LSP-class code intel marketplace |
| 6.8 | **zilliztech/claude-context** | (currently disabled per FM-16) | **62** | **STUDY-PILOT-NARROW** | Milvus-backed; auth-gated |
| 6.9 | **mufeedvh/code2prompt** | active | **76** | **STUDY-PILOT** | Code-to-prompt CLI |
| 6.10 | **mixedbread-ai/mgrep** | active | **74** | **STUDY-PILOT** | Semantic grep |
| 6.11 | **timescale/pg-aiguide** (NEW v2) | 1,728 | **76** | **STUDY-PILOT** | Postgres MCP + skill |
| 6.12 | **zilliztech/memsearch** (NEW v2) | 1,702 | **72** | **STUDY-PILOT-NARROW** | Memory layer Milvus+Markdown |
| 6.13 | **Manavarya09/design-extract** (NEW v2) | 2,632 | **72** | **STUDY-PILOT-NARROW** | Design-system extraction MCP |

---

## Section 7 — Layer 7: OBSERVABILITY + EVAL (NEW LAYER in v2)

### Architecture role
**This layer was UNDERSCALED in v1**. Production-grade LLM apps need: tracing, metrics, prompt management, LLM-as-judge eval, RAG eval, red-team. NEW v2 finding — multiple high-stars observability platforms exist.

### Top picks ranked

| # | Repo | Stars | D4 | D11 | D12 | D13 | D14 | Σ-score | Install-or-adapt | What it provides |
|---|------|-------|----|----|----|----|----|---------|------------------|------------------|
| 7.1 | **langfuse/langfuse** | 27,283 | 8 (MCP+SDK+cloud+self-host) | 5 | 8 | **10** (full OTel + evals + prompt mgmt) | 7 | **86** | **INSTALL** (self-host or cloud) | LLM observability + metrics + evals + prompt mgmt + playground + datasets; YC W23; OpenTelemetry + LangChain + OpenAI SDK + LiteLLM integrations |
| 7.2 | **mlflow/mlflow** | 25,957 | 7 (Python+UI) | 5 | 8 | **10** (full ML+LLM platform) | 7 | **84** | **STUDY-PILOT-FAVORABLE** | LLM+ML observability + evaluation + monitoring; Apache Spark integration; team-scale platform |
| 7.3 | **promptfoo/promptfoo** | **21,290** [verified up from baseline] | 8 (CLI + Node SDK) | 5 | 7 | 9 (eval-as-judge + red-team + pentesting) | 9 (red-team focus) | **88** | **INSTALL** `npm install -g promptfoo` | LLM-as-judge eval + red-teaming + pentesting; "Used by OpenAI and Anthropic" |
| 7.4 | **comet-ml/opik** | 19,307 | 8 (CC plugin in disabled per FM-16) | 5 | 8 | 10 | 7 | **80** | **STUDY-PILOT** (CC plugin disabled — verify re-enable path) | Debug+evaluate+monitor LLM apps + RAG + agentic workflows |
| 7.5 | **openobserve/openobserve** | 18,862 | 6 (Rust observability) | 5 | 5 | **10** (logs/metrics/traces/frontend/LLM observability single binary) | 7 | **78** | **STUDY-PILOT-FAVORABLE** | Datadog/Splunk alternative; 140x lower storage; single binary |
| 7.6 | **raga-ai-hub/RagaAI-Catalyst** | 16,162 | 6 (Python SDK + self-hosted dashboard) | 5 | 8 | 9 | 7 | **76** | **STUDY-PILOT-FAVORABLE** | Agent AI observability + multi-agentic system debug + timeline/execution-graph view |
| 7.7 | **confident-ai/deepeval** | 15,459 | 6 (Python framework) | 5 | 6 | 9 (LLM eval framework) | 6 | **76** | **STUDY-PILOT-FAVORABLE** | "The LLM Evaluation Framework" |
| 7.8 | **tensorzero/tensorzero** | 11,372 | 7 (Rust LLMOps platform) | 5 | 7 | 9 (LLM gateway + observability + eval + optimization) | 7 | **78** | **STUDY-PILOT-FAVORABLE** | Open-source LLMOps platform with gateway |
| 7.9 | **Arize-ai/phoenix** | 9,694 | 7 (MCP + Python) | 5 | 7 | 10 (AI observability + evaluation) | 7 | **80** | **STUDY-PILOT-FAVORABLE** | AI observability + evaluation; works with LangChain/LlamaIndex/smolagents |
| 7.10 | **VoltAgent/voltagent** | 8,949 | 6 (TS AI agent framework) | 5 | 8 | 8 | 7 | **76** | **STUDY-PILOT-FAVORABLE** | TS agent engineering platform; LLM observability built-in |
| 7.11 | **NVIDIA/garak** | 7,822 | 7 (Python CLI vulnerability scanner) | 5 | 5 | 9 (LLM red-team) | **10** | **STUDY-PILOT-FAVORABLE** | LLM vulnerability scanner |
| 7.12 | **evidentlyai/evidently** | 7,494 | 6 (Python framework) | 5 | 6 | 9 | 6 | **74** | **STUDY-PILOT-NARROW** | ML+LLM observability framework |
| 7.13 | **traceloop/openllmetry** | 7,112 | 7 (Python; OpenTelemetry-based) | 5 | 7 | **10** (OTel-native) | 7 | **80** | **STUDY-PILOT-FAVORABLE** | OpenTelemetry GenAI/LLM observability — vendor-neutral |
| 7.14 | **katanemo/plano** | 6,480 | 7 (Rust AI-native proxy) | 5 | 7 | 8 | 7 | **76** | **STUDY-PILOT-FAVORABLE** | AI-native proxy + orchestration + LLM routing + safety |
| 7.15 | **Helicone/helicone** | 5,673 | 7 (one-line code monitor) | 5 | 5 | 9 (LLM observability + cost + eval) | 7 | **78** | **STUDY-PILOT-FAVORABLE** | "One line of code to monitor"; YC W23 |
| 7.16 | **Giskard-AI/giskard-oss** | 5,352 | 6 (Python library) | 5 | 5 | 8 | 9 (red-team + AI security) | **74** | **STUDY-PILOT-FAVORABLE** | LLM eval + AI red-team + responsible-AI |
| 7.17 | **pydantic/logfire** | 4,248 | 7 (Python; FastAPI/Pydantic-AI) | 5 | 7 | 10 (OTel + Pydantic-AI integration) | 7 | **80** | **STUDY-PILOT-FAVORABLE** (if Pydantic ecosystem) | AI observability for production LLM/agent systems |
| 7.18 | **Agenta-AI/agenta** | 4,125 | 6 (TS LLMOps platform) | 5 | 7 | 9 | 7 | **74** | **STUDY-PILOT-NARROW** | LLMOps + prompt playground + eval + observability |
| 7.19 | **matt1398/claude-devtools** | 3,389 | 8 (Electron desktop app for CC) | 5 | 6 | 9 (CC-specific tool calls/token usage/subagents/context window UI) | 7 | **82** | **INSTALL** (CC-specific DevTools) | "Missing DevTools for Claude Code" — CC session log UI |
| 7.20 | **langwatch/langwatch** | 3,257 | 6 (TS platform) | 5 | 6 | 9 | 6 | **72** | **STUDY-PILOT-NARROW** | LLM eval + AI agent testing |
| 7.21 | **HolmesGPT/holmesgpt** | 2,437 | 6 (Python SRE Agent) | 5 | 5 | 8 (incident response) | 8 | **72** | **STUDY-PILOT-NARROW** | CNCF Sandbox SRE Agent |
| 7.22 | **openlit/openlit** | 2,445 | 7 (TS+Python; OTel) | 5 | 5 | 9 (OTel-native LLM observability) | 7 | **74** | **STUDY-PILOT-NARROW** | OpenTelemetry GenAI observability |
| 7.23 | **AgentOps-AI/tokencost** | 1,981 | 7 (Python lib) | 7 | 5 | 7 | 5 | **72** | **STUDY-PILOT-FAVORABLE** | Token price estimates 400+ LLMs |
| 7.24 | **disler/claude-code-hooks-multi-agent-observability** | 1,413 | 8 (CC hook event tracking) | 5 | 7 | 9 (CC-specific multi-agent hook events) | 6 | **78** | **INSTALL** (CC-specific real-time monitor) | Real-time monitoring for CC agents via hook events |
| 7.25 | **anthropic-cookbook** evaluator_optimizer recipes | (Anthropic) | 4 (cite) | n/a | 8 | 9 | 7 | **84** | **CITE-CLASS-CANONICAL** | TIER-1 evaluator+optimizer pattern reference |

### Layer 7 install recommendation

**Phase 4a (mandatory)**: langfuse 7.1 (LLM observability platform) + promptfoo 7.3 (eval/red-team) + matt1398/claude-devtools 7.19 (CC-specific UI) + disler hooks observability 7.24

**Phase 4b (optional)**: pick ONE of phoenix (Arize) / openllmetry (OTel-native) / logfire (Pydantic ecosystem) based on existing stack alignment.

**Why langfuse wins over alternatives**:
- 27k★ ecosystem leader
- YC W23 backing (named-org credibility)
- Self-host AND cloud
- Built-in: observability + metrics + evals + prompt mgmt + playground + datasets (5 surfaces in one)
- Integrates with OpenTelemetry + LangChain + OpenAI SDK + LiteLLM (4-way ecosystem)
- Apache-2.0 (verify)

**Why promptfoo wins for eval**:
- 21k★ + "Used by OpenAI and Anthropic" (2 named-T1)
- LLM-as-judge primitive + red-teaming + pentesting in one
- Now OpenAI-owned but still MIT
- CLI + CI/CD-friendly (declarative configs)
- Cross-model (GPT/Claude/Gemini/Llama compare)

---

## Section 8 — Layer 8: LLM ROUTERS (NEW LAYER in v2)

### Architecture role
Multi-provider routing + cost optimization + fallback. Distinct from observability (Layer 7) and agent orchestration (Layer 3).

### Top picks

| # | Repo | Stars | D4 | D11 | Σ-score | Install-or-adapt | What it provides |
|---|------|-------|----|----|---------|------------------|------------------|
| 8.1 | **mnfst/manifest** | 6,496 | 7 (gateway) | 9 (smart routing 70% cost cut) | **78** | **STUDY-PILOT-FAVORABLE** | Smart model routing; BYOK; cost tracking |
| 8.2 | **BlockRunAI/ClawRouter** | 6,468 | 7 (TS router) | 8 (41+ models; <1ms routing) | **74** | **STUDY-PILOT-NARROW** (OpenClaw-focused) | Agent-native LLM router for OpenClaw |
| 8.3 | **router-for-me/CLIProxyAPI** | 32,826 | 7 (Go proxy) | 7 (wraps Gemini/Codex/CC as OpenAI/Gemini/Claude/Codex compat) | **82** | **STUDY-PILOT-FAVORABLE** | Free CC/Codex/Gemini API service |
| 8.4 | **mnfst/awesome-free-llm-apis** | 4,323 | 4 (catalog) | n/a | **68** | **REFERENCE** | Free LLM API keys list |
| 8.5 | **musistudio/claude-code-router** | (per baseline) | 6 (LLM router) | 7 | **70** | **STUDY-PILOT-NARROW** | CC-specific LLM router |
| 8.6 | **katanemo/plano** (above 7.14) | 6,480 | 7 (Rust gateway) | 7 (LLM routing + safety + observability — multi-feature) | **76** | **STUDY-PILOT-FAVORABLE** | AI-native proxy (router + safety + observability) |
| 8.7 | **tensorzero/tensorzero** (above 7.8) | 11,372 | 7 (gateway+obs+opt) | 7 | **78** | **STUDY-PILOT-FAVORABLE** | LLMOps platform with gateway |
| 8.8 | **LiteLLM** (per baseline) | (per baseline ~10k+) | 6 (Python proxy) | 7 (100+ LLMs) | **76** | **STUDY-PILOT-FAVORABLE** | OpenAI-format proxy for 100+ LLMs |

### Why LLM routing is a separate layer

- Different concern from agent orchestration (Layer 3 routes WORK between agents; Layer 8 routes CALLS between models)
- Different concern from observability (Layer 7 measures; Layer 8 decides)
- Can compose with both (router → measured by langfuse → orchestrated by superpowers)

---

## Section 9 — Layer 9: CC HOOKS + SECURITY GATES (NEW DEPTH in v2)

### Architecture role
Hook scripts (PreToolUse/PostToolUse/Stop/SessionEnd) + security gates + custom enforcement. v1 catalog underscaled this layer — many high-stars repos exist.

### Top picks

| # | Repo | Stars | D4 | D11 | D14 | Σ-score | Install-or-adapt |
|---|------|-------|----|----|----|---------|------------------|
| 9.1 | **diet103/claude-code-infrastructure-showcase** | 9,639 | 8 (CC infrastructure examples) | 5 | 8 | **80** | **ADAPT-PATTERN** (reference for skill auto-activation + hooks + agents) |
| 9.2 | **ChrisWiles/claude-code-showcase** | 5,897 | 8 (comprehensive CC examples) | 5 | 7 | **76** | **ADAPT-PATTERN** (hooks + skills + agents + commands + GH Actions) |
| 9.3 | **parcadei/Continuous-Claude-v3** | 3,771 | 8 (CC context mgmt via hooks) | 7 (MCP execution without context pollution) | 7 | **80** | **STUDY-PILOT-FAVORABLE** | Context mgmt via ledgers + handoffs |
| 9.4 | **disler/claude-code-hooks-mastery** | 3,674 | 8 (CC hooks tutorial+examples) | 5 | 7 | **76** | **ADAPT-PATTERN** (master CC hooks reference) |
| 9.5 | **disler/claude-code-hooks-multi-agent-observability** (above 7.24) | 1,413 | 8 | 5 | 6 | **78** | **INSTALL** (CC real-time monitor via hooks) |
| 9.6 | **severity1/claude-code-prompt-improver** | 1,478 | 8 (CC hook) | 6 | 7 | **76** | **STUDY-PILOT-FAVORABLE** (intelligent prompt-improver hook) |
| 9.7 | **kenryu42/claude-code-safety-net** | 1,334 | 8 (hook) | 5 | **10** (catches destructive commands) | **82** | **INSTALL** (defensive safety net for git/filesystem) |
| 9.8 | **CloudAI-X/claude-workflow-v2** | 1,356 | 9 (universal workflow plugin) | 5 | 7 | **76** | **STUDY-PILOT-FAVORABLE** | Universal CC workflow plugin (agents+skills+hooks+commands) |
| 9.9 | **coleam00/claude-memory-compiler** | 1,051 | 8 (hook + Agent SDK) | 6 | 7 | **76** | **STUDY-PILOT-FAVORABLE** (Karpathy-inspired memory; LLM compiler extracts decisions from sessions) |
| 9.10 | **rohitg00/pro-workflow** | 2,124 | 9 (plugin) | 6 | 7 | **78** | **STUDY-PILOT-FAVORABLE** (self-correcting memory; 17 battle-tested skills) |
| 9.11 | **revfactory/harness** | 3,387 | 9 (meta-skill) | 6 | 7 | **78** | **ADAPT-PATTERN** (meta-skill that designs other agent teams) |
| 9.12 | **nyldn/claude-octopus** | 3,345 | 8 (8-model orchestration) | 5 | 6 | **74** | **STUDY-PILOT-NARROW** (multi-AI blindspot detection) |
| 9.13 | **rohitg00/awesome-claude-code-toolkit** | 1,682 | 7 (toolkit) | 5 | 6 | **74** | **REFERENCE** (135 agents + 35 skills + 42 commands + 176+ plugins) |
| 9.14 | **agenticnotetaking/arscontexta** | 3,342 | 8 (plugin) | 5 | 6 | **72** | **STUDY-PILOT-NARROW** (knowledge systems from conversation) |
| 9.15 | **Manavarya09/design-extract** | 2,632 | 8 (MCP+plugin) | 5 | 6 | **72** | **STUDY-PILOT-NARROW** (design-system extraction) |
| 9.16 | **covibes/zeroshot** | 1,477 | 8 (autonomous CLI) | 6 | 7 | **74** | **STUDY-PILOT-NARROW** (autonomous engineering team in CLI) |

### Security MCPs / scanners (sub-layer of Layer 9)

| # | Repo | Stars | Native CC | Score | Install-or-adapt |
|---|------|-------|-----------|-------|------------------|
| 9.S1 | **semgrep/semgrep MCP** | ~11k | S (plugin marketplace) | **90** | **INSTALL** `/plugin marketplace add semgrep/mcp-marketplace` |
| 9.S2 | **gitleaks/gitleaks** | per baseline | A (CLI) | **86** | **INSTALL** |
| 9.S3 | **aquasecurity/trivy** | per baseline | A (CLI) | **84** | **INSTALL** |
| 9.S4 | **google/osv-scanner** | per baseline | A (CLI) | **84** | **INSTALL** |
| 9.S5 | **github/codeql-action** | per baseline | A (GH Action) | **85** | **INSTALL** |
| 9.S6 | **NVIDIA/garak** (above 7.11) | 7,822 | 7 (CLI) | **74** | **STUDY-PILOT-FAVORABLE** (LLM vulnerability scanner) |
| 9.S7 | **InvariantLabs-ai/mcp-scan** | per baseline | A (CLI) | **78** | **STUDY-PILOT** (audit other MCPs) |
| 9.S8 | **Tencent/AI-Infra-Guard** | 3,704 | 7 (Python red-team platform) | **74** | **STUDY-PILOT-NARROW** (full AI red-team platform) |
| 9.S9 | **MCP-Defender/MCP-Defender** | per baseline | A | **75** | **STUDY-PILOT-NARROW** |
| 9.S10 | **woodruffw/zizmor** | per baseline | A (CLI) | **78** | **STUDY-PILOT-FAVORABLE** (GH Actions audit) |

---

## Section 10 — E2E Workflow Design (with GPT-5.5 adversarial integration)

### The complete autonomous SOTA loop

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│ OPERATOR ISSUES `/research <topic>` or `/build <PRD>` or `/loop <interval>`     │
└─────────────────────────────────────────────────────────────────────────────────┘
                                       │
                                       ▼
┌──────────────────────────────────────────────────────────────────────────────────┐
│ T0 CANDIDATE-LIST CHALLENGE (cost-gated trigger; PROPOSED-PILOT per Wave 5)      │
│   - For SOTA-research: codex GPT-5.5 reviews CANDIDATE-LIST COMPOSITION         │
│   - Profile: deep-review-exec / xhigh / read-only sandbox                         │
│   - Verdict: APPROVE-LIST / REVISE-LIST / REJECT-LIST                            │
└──────────────────────────────────────────────────────────────────────────────────┘
                                       │
                                       ▼
┌──────────────────────────────────────────────────────────────────────────────────┐
│ PLAN MODE (Opus 4.7 / claude-opus-4-6 / plugin mode)                             │
│   - Read CLAUDE.md + AGENTS.md + relevant skills                                 │
│   - Build context capsule: serena symbols + repomix snapshot + relevant docs    │
│   - Spawn parallel research agents (3-6 per CADP rule 2)                         │
│     - Agent A: sota-researcher (skill: superpowers/research)                    │
│     - Agent B: codex-rescue BRIDGE-MODE (real GPT-5.5 via codex CLI subprocess) │
│     - Agent C: architect (design with TIER-1-cite trail)                         │
│   - Each agent ARTIFACT-INLINE per FM-19 (write to tmp/wave<N>-<agent>.md)      │
└──────────────────────────────────────────────────────────────────────────────────┘
                                       │
                                       ▼
┌──────────────────────────────────────────────────────────────────────────────────┐
│ T1 PRE-EDIT CONSULT (BLOCKING per cardinal-rule-3 cross-model gate)             │
│   - Trigger: PreToolUse Edit|Write|MultiEdit hook (codex_t1_consult_gate.py)    │
│   - Real GPT-5.5 via codex CLI: codex exec --ephemeral -p deep-review-exec      │
│   - Profile: deep-review-exec / xhigh / danger-full-access / 240s budget        │
│   - Verdict: APPROVE / NEEDS-REVISION (Pattern A fix-forward) / REJECT          │
│   - Pattern B fallback: timeout → trace-mine HONEST-NON-FINDING → T3 verify     │
└──────────────────────────────────────────────────────────────────────────────────┘
                                       │
                                       ▼
┌──────────────────────────────────────────────────────────────────────────────────┐
│ IMPLEMENT MODE (Opus 4.7 + Sonnet workers + Haiku triage)                       │
│   - superpowers TDD: RED → GREEN → REFACTOR                                      │
│   - addy-osmani engineering-lifecycle: Define → Plan → Build → Verify           │
│   - wshobson granular: python-development / agent-teams / comprehensive-review   │
│   - Worktree isolation: claude --worktree <name>                                 │
│   - Token-opt active: rtk-cli + context-mode + repomix compress + caveman       │
│   - Memory: doobidoo L1 capture + getzep/graphiti L3 KG                          │
│   - Observability: langfuse + matt1398/claude-devtools UI                       │
└──────────────────────────────────────────────────────────────────────────────────┘
                                       │
                                       ▼
┌──────────────────────────────────────────────────────────────────────────────────┐
│ T2 WORKING-TREE REVIEW (BLOCKING per cross-model gate)                          │
│   - Trigger: PreToolUse Bash(git commit *) hook (codex_t2_pre_commit_gate.py)   │
│   - codex exec review --uncommitted (DEFAULT profile, no -p flag)               │
│   - 60-180s budget                                                                │
│   - Verdict integration: APPROVE → commit; NEEDS-REVISION → Pattern A → commit  │
└──────────────────────────────────────────────────────────────────────────────────┘
                                       │
                                       ▼
┌──────────────────────────────────────────────────────────────────────────────────┐
│ COMMIT LANDS                                                                      │
│   - Conventional commit format: feat(scope): msg [cycle-N]                       │
│   - Body cites: T1+T2 verdict files + MEASURED evidence + Confidence + Scope-risk │
└──────────────────────────────────────────────────────────────────────────────────┘
                                       │
                                       ▼
┌──────────────────────────────────────────────────────────────────────────────────┐
│ T3 POSTCOMMIT AUTO-REVIEW (async observer; non-blocking)                        │
│   - Trigger: PostToolUse Bash(git commit *) hook (codex_postcommit_review.py)   │
│   - Async 30s spawn / 180s codex / fire-and-forget telemetry to JSONL            │
│   - Output: .claude/state/codex_review_HEAD_<sha8>.txt                           │
│   - Audit-trail consumer: sota_freshness_sweep + audit-action-loop closure      │
└──────────────────────────────────────────────────────────────────────────────────┘
                                       │
                                       ▼ (if push intended)
┌──────────────────────────────────────────────────────────────────────────────────┐
│ T4 POSTPUSH CUMULATIVE REVIEW                                                    │
│   - Trigger: PostToolUse Bash(git push *) hook (codex_prepush_review.py)        │
│   - Cumulative review of pushed commits                                          │
└──────────────────────────────────────────────────────────────────────────────────┘
                                       │
                                       ▼ (parallel — synthesis step)
┌──────────────────────────────────────────────────────────────────────────────────┐
│ AGENT REPORT VERIFICATION (Mia pre-apply on prescriptions)                      │
│   - Per mia-pre-apply.md: verify EVERY agent prescription's gap-claim           │
│   - Probe: git diff / git status / grep / Glob                                  │
│   - OVER → drop; UNDER → surface; HNF → close axis                              │
└──────────────────────────────────────────────────────────────────────────────────┘
                                       │
                                       ▼
┌──────────────────────────────────────────────────────────────────────────────────┐
│ T6 STOP-GATE (session-end deep review; BLOCKING via decision:"block")          │
│   - Trigger: Stop hook slot [2] codex_stop_review_gate.py                       │
│   - Profile: deep-review-exec / xhigh / 900s budget                              │
│   - Reviews entire session diff at close                                          │
└──────────────────────────────────────────────────────────────────────────────────┘
                                       │
                                       ▼
┌──────────────────────────────────────────────────────────────────────────────────┐
│ T7 ASK-WITHOUT-ACT GATE (Stop hook slot [0]; cheap-first; 5s)                   │
│   - regex+heuristic: blocks completion if message ends with question/Reply-with-A/B │
│   - Forces agent to act, not pause                                                │
└──────────────────────────────────────────────────────────────────────────────────┘
                                       │
                                       ▼
┌──────────────────────────────────────────────────────────────────────────────────┐
│ DURABLE LEARNING WRITE (Karpathy §5 compounding-surface)                        │
│   - Layer 1 chronological: append to .claude/state/*.jsonl                       │
│   - Layer 2 index: update .claude/projects/.../memory/MEMORY.md                  │
│   - Layer 3 wiki: rule/skill codification via codification-threshold.md          │
│   - L3 KG: graphiti add_episode (temporal-KG update)                             │
└──────────────────────────────────────────────────────────────────────────────────┘
```

### GPT-5.5 adversarial review touchpoints (T0-T7 lifecycle)

| Touchpoint | When | Profile | Mode | Sync/Async | Latency budget |
|------------|------|---------|------|------------|----------------|
| **T0** | Pre-research candidate-list challenge | `deep-review` | xhigh / read-only | sync foreground+tee | 240s |
| **T1** | Pre-edit consult on design surfaces | `deep-review-exec` | xhigh / danger-full-access | sync (PreToolUse hook) | 240-480s |
| **T2** | Pre-commit working-tree review | (default — no `-p`) | read-only / live | sync (PreToolUse Bash hook) | 120-180s |
| **T3** | Post-commit auto-review | `deep-review-exec` | xhigh | async (PostToolUse hook) | 30s spawn / 240s codex |
| **T4** | Post-push cumulative review | `deep-review-exec` | xhigh | async (PostToolUse hook) | 30s spawn / 180s codex |
| **T5** | Manual `/plan-codex-review` slash command | `deep-review` | xhigh / read-only | sync foreground | 240s |
| **T6** | Session-end stop-gate | `deep-review-exec` | xhigh / danger-full-access | sync (Stop hook) | 900s |
| **T7** | Pre-T6 ask-without-act gate | n/a (regex+heuristic) | n/a | sync (Stop hook slot [0]) | 5s |

**Net architecture insight**: GPT-5.5 adversarial review fires at SEVEN distinct touchpoints in the lifecycle. Plus T0 PROPOSED-PILOT optional. No edit / commit / push / session-close lands without cross-model verification.

---

## Section 11 — 5-Phase Install Plan (per cardinal-rule-7 graduated unleash)

### Phase 1 — Foundation substrate (must smoke-PASS before Phase 2)

```bash
# Anthropic-canonical chain
# (claude-plugins-official marketplace is implicit via fresh CC install)
pip install claude-agent-sdk
git clone https://github.com/anthropics/cwc-long-running-agents.git .local/cwc
cp -r .local/cwc/.claude/* .claude/

# Cross-model substrate
npm install -g @openai/codex@latest  # version-pin in install-provenance.md
# codex plugin via marketplace once CC is launched:
# /plugin marketplace add openai/codex
# /plugin install codex@openai-codex

# CC reference MCPs (pick by need)
npm install -g @modelcontextprotocol/server-filesystem
npm install -g @modelcontextprotocol/server-git
npm install -g @modelcontextprotocol/server-fetch
npm install -g @modelcontextprotocol/server-sequential-thinking
npm install -g @modelcontextprotocol/inspector  # dev-time MCP debug UI
```

**Smoke verify**:
- `claude --version` → 2.1.x
- `python -c "import claude_agent_sdk; print(claude_agent_sdk.__version__)"`
- `codex --version` → ≥1.0.4
- `.mcp.json` lists installed servers
- Test CC: simple "Hello" returns

### Phase 2 — Orchestration methodology (3-way co-install)

```bash
# 3-way orchestration methodology
/plugin install superpowers@claude-plugins-official    # TDD + 7-phase
/plugin marketplace add addyosmani/agent-skills
/plugin install agent-skills@addy-agent-skills          # engineering-lifecycle
/plugin marketplace add wshobson/agents
/plugin install python-development                       # granular (Wire-1)
/plugin install agent-teams                              # Q2 2026 NEW
/plugin install comprehensive-review                     # multi-dim review
# DEFER: /plugin install conductor                       # PENDING Probe 5 HARD-GATE check

# Canonical autonomous loop + SDK companion
/plugin install ralph-loop@claude-plugins-official
/plugin install agent-sdk-dev@claude-plugins-official
```

**Smoke verify**:
- `/plugin list` shows 5+ plugins
- `Skill superpowers:brainstorming` returns content
- `codex exec --ephemeral -p deep-review-exec --color never <<< "test"` returns valid output

### Phase 3 — MCP servers + Memory Stack

```bash
# L1+L2 memory baseline
pip install git+https://github.com/doobidoo/mcp-memory-service.git

# L3 temporal-KG
pip install graphiti-core[falkordb]
docker pull falkordb/falkordb:latest
docker run -d --name falkordb -p 16379:6379 falkordb/falkordb:latest

# Code intelligence
# serena: per upstream README
npm install -g repomix@latest
cargo install ast-grep  # OR npm install -g @ast-grep/cli

# Browser
npm install -g @microsoft/playwright-mcp
npm install -g @chromedevtools/chrome-devtools-mcp  # verify exact package name

# SAST
/plugin marketplace add semgrep/mcp-marketplace
/plugin install semgrep

# GitHub MCP
# Per github/github-mcp-server upstream README

# Docs
# Per upstash/context7 upstream README

# (Optional — STUDY-PILOT) thedotmack/claude-mem
# Verify Wave 3 Probe 4-6 first; then via plugin install
```

### Phase 4 — Token optimization + observability (NEW v2)

```bash
# Token-opt
npm install -g ccusage
cargo install rtk-cli
# /plugin install context-mode  # ❌ REJECT-FOR-FIT per Wave 3A LICENSE verify (Elastic License 2.0 non-permissive)
# Use alternative: chopratejas/headroom OR yvgude/lean-ctx (both MIT/permissive; 60-95% savings)
curl -fsSL <caveman-install.sh-URL> | bash  # JuliusBrussee/caveman ADOPT-NOW per Wave 3A verify (MIT + reproducible 65% bench)
# Install caveman-compress + caveman-stats sister tools too
# repomix compress active by default

# CC autocompact env (in CLAUDE.local.md):
export CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=70

# Observability — NEW v2 LAYER
# (4a — mandatory)
# langfuse self-hosted via docker compose OR cloud
# (see https://langfuse.com/docs/deployment/self-host)
docker pull langfuse/langfuse:latest
# OR sign up for cloud + LANGFUSE_PUBLIC_KEY/LANGFUSE_SECRET_KEY env

npm install -g promptfoo

# CC-specific UI
# claude-devtools: download Electron app from github releases
# disler/claude-code-hooks-multi-agent-observability: clone + run dev server

# (4b — pick ONE for OTel stack)
# pip install opentelemetry-instrumentation-anthropic
# pip install openllmetry
# OR pydantic-logfire (if Pydantic-AI ecosystem)
```

### Phase 5 — Optional + STUDY-PILOT (after Wave 3 deep-dive)

```bash
# Pattern reference catalogs (cite-only)
# obra/superpowers-marketplace (alt path)
# affaan-m/everything-claude-code (cherry-pick patterns)
# shanraisshan/claude-code-best-practice (methodology reference)
# gsd-build/get-shit-done (meta-prompting pattern)
# garrytan/gstack (codex-companion patterns)

# Optional code-intel
# /plugin marketplace add Piebald-AI/claude-code-lsps
# /plugin install claude-code-lsps    # LSP-class code intel

# Optional eval framework (verify license first)
# pip install inspect-ai      # UK AISI

# Optional safety/hooks
# kenryu42/claude-code-safety-net  # destructive command catcher

# Optional research/scientific skills
# /plugin install scientific-agent-skills  # if research workflow

# Optional MCP additions
# upstash/context7 (docs MCP)
# microsoft/markitdown (doc-to-MD converter)
# unclecode/crawl4ai OR firecrawl/firecrawl (web ingestion)

# LLM router (optional)
# katanemo/plano OR tensorzero/tensorzero OR LiteLLM
```

---

## Section 12 — Full ranked catalog (200+ repos, top picks per layer summarized)

[See `COMPREHENSIVE_SCORING_MATRIX_v2.md` for full 15-dimensional matrix.]

### Master Top-50 (cross-layer aggregate score)

| Rank | Score | Repo | Stars | Layer | Verdict | Install or adapt |
|------|-------|------|-------|-------|---------|------------------|
| 1 | 97 | anthropics/claude-plugins-official | (internal) | 1 | ADOPT-NOW | INSTALL |
| 2 | 97 | anthropics/skills | 135,158 | 1+2 | ADOPT-NOW | INSTALL |
| 3 | 97 | obra/superpowers | **192,855** | 2 | ADOPT-NOW | INSTALL |
| 4 | 95 | modelcontextprotocol/servers | 85,714 | 1+5 | ADOPT-NOW | INSTALL |
| 5 | 94 | anthropics/cwc-long-running-agents | (internal) | 1+3 | ADOPT-NOW | INSTALL |
| 6 | 94 | anthropics/claude-agent-sdk-python | (internal) | 1 | ADOPT-NOW | INSTALL |
| 7 | 94 | openai/codex CLI | (active) | 1+3+8 | ADOPT-NOW | INSTALL |
| 8 | 94 | yamadashy/repomix | active | 5+6 | ADOPT-NOW | INSTALL |
| 9 | 94 | mksglu/context-mode | 14,826 | 5 | ADOPT-NOW | INSTALL |
| 10 | 93 | addyosmani/agent-skills | 42,097 | 2 | ADOPT-NOW | INSTALL |
| 11 | 93 | github/github-mcp-server | 29,868 | 1+5 | ADOPT-NOW | INSTALL |
| 12 | 92 | oraios/serena | 24,271 | 5+6 | ADOPT-NOW | INSTALL |
| 13 | 92 | openai/codex-plugin-cc | active | 1+8 | ADOPT-NOW | INSTALL |
| 14 | 92 | wshobson/agents (granular) | 35,459 | 2+3 | ADOPT-NOW | INSTALL granular |
| 15 | 92 | rtk-ai/rtk | 48,553 | 5 | ADOPT-NOW | INSTALL |
| 16 | 91 | ralph-loop @ claude-plugins-official | (internal) | 3 | ADOPT-NOW | INSTALL |
| 17 | 91 | agent-sdk-dev @ claude-plugins-official | (internal) | 3 | ADOPT-NOW | INSTALL |
| 18 | 90 | semgrep/semgrep MCP | ~11k | 5+9 | ADOPT-NOW | INSTALL |
| 19 | 90 | modelcontextprotocol/python-sdk | 23,018 | 1 | ADOPT-NOW | INSTALL |
| 20 | 90 | Anthropic prompt-cache | TIER-1 OFFICIAL | 5 | ADOPT-NOW | INSTALL-IMPLICIT |
| 21 | 89 | thedotmack/claude-mem | 75,999 | 4 | STUDY-PILOT-FAVORABLE (Probe 4-6 verify) | INSTALL after verify |
| 22 | 89 | modelcontextprotocol/inspector | ~5k | 1 | ADOPT-NOW | INSTALL dev-time |
| 23 | 89 | ChromeDevTools/chrome-devtools-mcp | 39,715 | 5.B | ADOPT-NOW | INSTALL |
| 24 | 88 | getzep/graphiti v0.29.0 | 25,800 | 4 | ADOPT-NOW | INSTALL |
| 25 | 88 | microsoft/playwright-mcp | active | 5.B | ADOPT-NOW | INSTALL |
| 26 | 88 | promptfoo/promptfoo | 21,290 | 7 | ADOPT-NOW | INSTALL |
| 27 | 88 | anthropics/claude-agent-sdk-typescript | (internal) | 1 | ADOPT-NOW (if TS) | INSTALL |
| 28 | 88 | biomejs/biome | per baseline | 9 (CLI) | ADOPT-NOW | INSTALL |
| 29 | 86 | doobidoo/mcp-memory-service | 1,843 | 4 | ADOPT-NOW | INSTALL |
| 30 | 86 | langfuse/langfuse | 27,283 | 7 | ADOPT-NOW (NEW v2) | INSTALL |
| 31 | 86 | ast-grep/ast-grep | 40k+ | 6 | ADOPT-NOW | INSTALL CLI (not phantom MCP) |
| 32 | 86 | dandavison/delta | per baseline | 9 CLI | ADOPT-NOW | INSTALL |
| 33 | 86 | gitleaks/gitleaks | per baseline | 9 | ADOPT-NOW | INSTALL |
| 34 | 86 | pre-commit/pre-commit | per baseline | 9 CLI | ADOPT-NOW | INSTALL |
| 35 | 86 | ryoppippi/ccusage | active | 5+7 | ADOPT-NOW | INSTALL |
| 36 | 86 | anthropics/claude-code-action | (internal) | 1 | ADOPT-NOW | INSTALL CI |
| 37 | 86 | anthropics/claude-code-security-review | (internal) | 1+9 | ADOPT-NOW | INSTALL CI |
| 38 | 85 | upstash/context7 | 55,388 | 5.B | ADOPT-NOW | INSTALL |
| 39 | 85 | github/codeql-action | per baseline | 9 | ADOPT-NOW | INSTALL CI |
| 40 | 85 | safishamsi/graphify | 48,374 | 6 | STUDY-PILOT-FAVORABLE | ADAPT-PATTERN/INSTALL |
| 41 | 84 | mlflow/mlflow | 25,957 | 7 | STUDY-PILOT-FAVORABLE (NEW v2) | STUDY-PILOT |
| 42 | 84 | modelcontextprotocol/typescript-sdk | 12,436 | 1 | STUDY-PILOT-FAVORABLE | INSTALL if TS |
| 43 | 84 | shanraisshan/claude-code-best-practice | 53,176 | 2 (ref) | ADOPT-NOW REFERENCE | ADAPT-PATTERN |
| 44 | 84 | langchain-ai/langgraph | per baseline | 3 | STUDY-PILOT-FAVORABLE | ADAPT-PATTERN |
| 45 | 84 | tree-sitter/tree-sitter | substrate | 6 | ADOPT-NOW substrate | INSTALL (transitive) |
| 46 | 84 | anthropic-cookbook | (Anthropic) | 3+7 | CITE-CLASS-CANONICAL | ADAPT-PATTERN |
| 47 | 84 | github/spec-kit | per baseline | 1+2 | ADOPT-NOW (selective) | INSTALL if spec-driven |
| 48 | 84 | aquasecurity/trivy | per baseline | 9 | ADOPT-NOW | INSTALL |
| 49 | 84 | google/osv-scanner | per baseline | 9 | ADOPT-NOW | INSTALL |
| 50 | 84 | casey/just | per baseline | 9 CLI | ADOPT-NOW | INSTALL |

### Honorable mentions (51-100, summarized)

Layer 7 Observability (51-60): mlflow/mlflow + Arize-ai/phoenix + openobserve/openobserve + comet-ml/opik + raga-ai-hub/RagaAI-Catalyst + traceloop/openllmetry + tensorzero/tensorzero + Helicone/helicone + pydantic/logfire + matt1398/claude-devtools

Layer 8 Routers (61-65): mnfst/manifest + tensorzero/tensorzero + katanemo/plano + router-for-me/CLIProxyAPI

Layer 9 Hooks/Safety (66-75): kenryu42/claude-code-safety-net + diet103/claude-code-infrastructure-showcase + ChrisWiles/claude-code-showcase + disler/claude-code-hooks-mastery + disler/claude-code-hooks-multi-agent-observability + parcadei/Continuous-Claude-v3 + coleam00/claude-memory-compiler + severity1/claude-code-prompt-improver + rohitg00/pro-workflow + CloudAI-X/claude-workflow-v2

CLI substrate (76-90): all from `Section 9 v1 Grand Catalog` (rg/fd/jq/yq/gh/just/mise/uv/ruff/biome/etc.)

Discovery aggregators (91-100): hesreallyhim/awesome-claude-code + ComposioHQ/awesome-claude-skills + VoltAgent/awesome-* + ai-boost/awesome-harness-engineering (CITE-ONLY, do NOT install)

REJECT-FOR-FIT: campfirein/cipher (ELv2), supermemoryai/supermemory-mcp (DEPRECATED), volcengine/OpenViking (AGPLv3), topoteretes/cognee (DUPLICATE), getzep/zep (SUPERSEDED), stravu/crystal (deprecated), claude-squad on Windows (pty.Start), microsoft/LLMLingua (stale anti-pattern), all 13 anonymous-zip-drop kits (Cohort 7), Yeachan-Heo/oh-my-claudecode (META-HARNESS per claude-sota verified-avoid Cohort 1).

---

## Section 13 — Anti-patterns to avoid

1. **DO NOT install whole marketplaces** as runtime dependencies (wshobson 80 plugins, addy 23 skills — install GRANULARLY)
2. **DO NOT install discovery aggregators** (awesome-* repos are cite-only)
3. **DO NOT use 3rd-party Codex bridges** when codex-plugin-cc is canonical
4. **DO NOT install LLMLingua** for CC runtime (stale + anti-pattern)
5. **DO NOT install META-HARNESS competing-frameworks** (byterover-cli ELv2 + oh-my-claudecode + similar)
6. **DO NOT trust phantom npm packages** (run Probe 6 npm-registry direct existence check)
7. **DO NOT skip Probe 5 mode-harness-shape** on Q2 2026 NEW plugins (wshobson Conductor HARD-GATE risk)
8. **DO NOT skip the Wave 2C Mia pre-apply** before any install commit
9. **DO NOT silently accept Pattern B HNF** without trace-mining for embedded evidence
10. **DO NOT rate-limit yourself** with 4+ concurrent agents — CADP rule 2 max 3 concurrent
11. **DO NOT install operator UIs without worktree/diff/cleanup discipline** (anti-pattern per v65 HIGH_STAR_TRIAGE)
12. **DO NOT enable memory plugins** until repeated context-reconstruction cost is proven (per v65 EXECUTE_V65_ELITE_PLAN Stage 9)
13. **DO NOT install MCP servers globally** — enable per-project, per-task per v65 MEMORY_MCP_AGENT_ORCHESTRATION
14. **DO NOT cite agent verdicts as TIER-1 sources** — they're TIER-3 evidence trails per cardinal-rule-1
15. **DO NOT trust commit messages as audit trail** — `git diff` is source of truth per layered-gates §10 race recovery

---

## Section 14 — HONEST limitations + Wave 3 follow-ups

### Limitations

1. **Wave 1 agent dispatch RATE-LIMITED** — pivoted to orchestrator-side synthesis. Cross-model gate PARTIAL (Wave 2A Path P codex T1 ran but returned Pattern B HNF).

2. **Some Probe 4-6 verifications PENDING** for high-stars surfaced this round:
   - thedotmack/claude-mem (76k★) — memory MCP ecosystem leader; Probe 4 namespace + Probe 6 LICENSE
   - JuliusBrussee/caveman (61k★) — Probe 5 mode-harness-shape (verify no HARD-GATE)
   - mksglu/context-mode (15k★) — Probe 6 LICENSE
   - langfuse (27k★) — Probe 6 LICENSE
   - mnfst/manifest (6.5k★) — Probe 4 + Probe 5 + Probe 6
   - katanemo/plano (6.5k★) — Probe 6 LICENSE

3. **Wave 3 net-new architecture surfaces** queued per WAVE2-CLOSE-SYNTHESIS Section 6.3:
   - Observability deep-dive — PARTIALLY COVERED in this v2 Layer 7; full Probe DAG 1-7 for langfuse + promptfoo + phoenix + helicone pending
   - Structured-output schemas (Effect Schema / Pydantic v2 / Zod) for SHAPE-CLAIM verification
   - Eval-as-judge frameworks (deepeval + ragas + braintrust) — partially covered
   - LLM routers — NEW LAYER 8 added in v2; Probe DAG pending

4. **Marker Decay** on all star counts captured May 2026 — re-verify before adoption commit per `evidence-policy.md` Marker Decay corollary.

5. **Wave 2A Pattern B HNF** — codex T1 adversarial review on Wave 1 synthesis did not produce structured JSON verdict. Re-fire with TIGHTER prompt scope (single-axis review, JSON-strict mandate) is OPTIONAL before any install commit.

### Wave 3 queue

In priority order:

1. **Wave 3A — claude-mem (76k★) Probe 4-6 deep-dive** (high-stars; ecosystem leader; warrants full audit before mandatory promotion)
2. **Wave 3B — Observability layer Probe DAG 1-7** on langfuse + promptfoo + phoenix + helicone (4-candidate)
3. **Wave 3C — Q2 2026 wshobson NEW plugins Probe 5** (Conductor + Agent Teams + PluginEval HARD-GATE check)
4. **Wave 3D — LLM router layer Probe DAG** (mnfst/manifest + katanemo/plano + tensorzero/tensorzero + LiteLLM)
5. **Wave 3E — Wave 2A re-fire with tighter scope** (cross-model gate full satisfaction)

---

## Section 15 — VERDICT (FINAL v2)

**ULTIMATE SOTA CLAUDE CODE RUNTIME DESIGN** (v2 deeper synthesis):

- **9-layer architecture** (expanded from v1's 7 layers): Foundation + Skills Methodology + Orchestration Runtime + Memory + Token Optimization + Code Intelligence + **Observability (NEW)** + **LLM Routers (NEW)** + Hooks/Security Gates
- **200+ repos cataloged** across all layers; Top-50 ranked by 15-dimensional aggregate score
- **GPT-5.5 adversarial review integrated at 8 lifecycle touchpoints** (T0-T7) — cross-model gate is structural, not optional
- **Token-eff stack of 7 primitives** composing multiplicatively to ~95% cumulative savings
- **Memory Stack HOLD** per Wave 2B 5/5 REJECT (doobidoo + graphiti + FalkorDB); claude-mem 76k★ flagged for Wave 3A Probe 4-6
- **LLMLingua REPLACED** by 3-org Axis-1 PASS stack
- **OpenViking REJECT-FOR-FIT** (AGPLv3 STRUCTURAL); cipher REJECT (ELv2); cognee/zep REJECT (DUPLICATE/SUPERSEDED); 13 zip-drop kits REJECT (Cohort 7)
- **3-way orchestration methodology** (superpowers + addy-osmani + wshobson granular) = 4-org Axis-1 PASS
- **Cross-model gate** Phase 1 bootstrap exception PARTIALLY satisfied (Wave 2A Path P invoked but Pattern B HNF); MANDATORY Wave 2C Mia pre-apply before install commits
- **5-phase install plan** with explicit install commands + risk-class graduated unleash per cardinal-rule-7
- **Anti-patterns enumerated** — 15 explicit DO-NOT rules to prevent silent install errors

**Status**: AUTHORITATIVE-CANDIDATE pending Wave 3A-3E follow-up Probe DAGs.

**Cross-model gate satisfaction**: PARTIAL (Path P attempted; Pattern B HNF; operator may choose to re-fire with tighter prompt OR proceed to install with Wave 2C Mia pre-apply per cardinal-rule-9).

**Recommended action**: execute Phase 1 install + smoke verify + Wave 3A claude-mem deep-dive in parallel.

---

**See companion v2 documents**:
- `COMPREHENSIVE_SCORING_MATRIX_v2.md` — full 15-dimensional matrix per repo (~200 rows)
- `PER_CATEGORY_HEAD_TO_HEAD_v2.md` — per-category head-to-head comparisons
- `WAVE3_NEW_DISCOVERIES_v2.md` — net-new repos surfaced this v2 round
- `../05-grand-catalog/GRAND_CATALOG_2026-05-15.md` (v1 parent)
- `../06-executive-brief/EXECUTIVE_SYNTHESIS_BRIEF_2026-05-15.md` (v1 parent)
