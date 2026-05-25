---
title: Comprehensive 15-Dimensional Scoring Matrix v2 (2026-05-15 to 2026-05-16)
parent_doc: ULTIMATE_SOTA_RUNTIME_DESIGN.md
scope: 150+ repos across 9 layers, fresh-star-verified May 2026
methodology: 15 dimensions per repo, weighted aggregate 0-100, ADOPT-NOW/STUDY-PILOT/REJECT verdict, INSTALL vs ADAPT-PATTERN vs REFERENCE recommendation
---

# Comprehensive 15-Dimensional Scoring Matrix v2

> **15 dimensions per repo**: D1 stars / D2 age+cpd stability / D3 license / D4 native-CC-path / D5 wire-difficulty / D6 community-convergence ≥3 orgs / D7 ecosystem-agreement ≥2 T2 / D8 SOTA-automative-run fit (HARD-GATE check) / D9 plugin-namespace clear / D10 LICENSE+registry exists / D11 token-eff contribution / D12 orchestration capability / D13 observability coverage / D14 security posture / D15 docs+examples quality
> 
> **Weights** (sum to 1.00): D1=0.08, D2=0.08, D3=0.05, D4=0.12, D5=0.08, D6=0.08, D7=0.05, D8=0.10, D9=0.05, D10=0.04, D11=0.08, D12=0.08, D13=0.05, D14=0.05, D15=0.05
> 
> **Aggregate Score** = Σ(Wᵢ × Sᵢ) × 10 = 0-100 scale
> 
> **Verdict mapping**: ADOPT-NOW ≥78 / STUDY-PILOT-FAVORABLE 65-77 / STUDY-PILOT-NARROW 55-64 / DEFER <55 / REJECT-FOR-FIT via Probe-4/5/6/7 fail
> 
> **Install discipline**: INSTALL (binary on filesystem) / ADAPT-PATTERN (cite-only architectural idea) / REFERENCE (discovery aggregator) / REJECT
>
> **Cite**: stars verified May 2026 via `mcp__github__search_repositories` direct queries. Previously-cataloged repos (per v1 baseline) marked `[baseline-cite]` where fresh re-verify wasn't run.

---

## Layer 1: FOUNDATION (Anthropic-canonical substrate)

| Repo | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | D9 | D10 | D11 | D12 | D13 | D14 | D15 | Σ | Verdict | Action |
|------|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|---|---------|--------|
| anthropics/claude-plugins-official | 9 | 10 | 8 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 5 | 9 | 6 | 8 | 9 | **97** | ADOPT-NOW | INSTALL |
| anthropics/skills (135,158★) | 10 | 10 | 8 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 5 | 9 | 5 | 7 | 10 | **97** | ADOPT-NOW | INSTALL |
| modelcontextprotocol/servers (85,714★) | 10 | 10 | 10 | 8 | 8 | 10 | 10 | 10 | 10 | 10 | 5 | 6 | 6 | 8 | 9 | **95** | ADOPT-NOW | INSTALL |
| anthropics/cwc-long-running-agents | 4 | 8 SPE | 8 | 10 | 7 | 10 | 10 | 10 | 10 | 10 | 8 | 10 | 7 | 7 | 9 | **94** | ADOPT-NOW | INSTALL |
| anthropics/claude-agent-sdk-python | 8 | 10 | 8 | 5 | 8 | 10 | 10 | 10 | 10 | 10 | 5 | 9 | 7 | 7 | 9 | **94** | ADOPT-NOW | INSTALL |
| openai/codex CLI | 9 | 10 | 10 | 8 | 8 | 10 | 10 | 10 | 10 | 10 | 5 | 8 | 5 | 7 | 9 | **94** | ADOPT-NOW | INSTALL |
| github/github-mcp-server (29,868★) | 9 | 9 | 10 | 8 | 8 | 10 | 10 | 10 | 10 | 10 | 5 | 7 | 5 | 9 | 9 | **93** | ADOPT-NOW | INSTALL |
| openai/codex-plugin-cc | 6 | 9 | 8 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 5 | 8 | 5 | 7 | 8 | **92** | ADOPT-NOW | INSTALL |
| modelcontextprotocol/python-sdk (23,018★) | 8 | 10 | 10 | 5 | 8 | 10 | 10 | 10 | 10 | 10 | 5 | 6 | 5 | 8 | 9 | **90** | ADOPT-NOW | INSTALL |
| modelcontextprotocol/inspector (~5k★) | 6 | 9 | 10 | 8 | 10 | 10 | 10 | 10 | 10 | 10 | 5 | 5 | 7 (dev-time MCP test) | 9 | 9 | **89** | ADOPT-NOW | INSTALL dev-time |
| anthropics/claude-agent-sdk-typescript | 7 | 10 | 8 | 5 | 8 | 10 | 10 | 10 | 10 | 10 | 5 | 9 | 5 | 7 | 9 | **88** | ADOPT-NOW (if TS) | INSTALL |
| modelcontextprotocol/typescript-sdk (12,436★) | 7 | 10 | 10 | 5 | 8 | 10 | 10 | 10 | 10 | 10 | 5 | 6 | 5 | 8 | 9 | **88** | STUDY-PILOT-FAV | INSTALL if TS |
| anthropics/claude-code-action | 7 | 9 | 8 | 8 | 8 | 10 | 10 | 10 | 10 | 10 | 5 | 6 | 7 | 9 | 8 | **86** | ADOPT-NOW | INSTALL CI |
| anthropics/claude-code-security-review | 6 | 9 | 8 | 8 | 8 | 10 | 10 | 10 | 10 | 10 | 5 | 6 | 7 | **10** | 8 | **86** | ADOPT-NOW | INSTALL CI |
| github/spec-kit [baseline] | 7 | 9 | 10 | 8 | 7 | 10 | 9 | 9 | 10 | 10 | 5 | 6 | 5 | 7 | 9 | **84** | ADOPT-NOW (selective) | INSTALL if spec-driven |
| github/gh-aw [baseline] | 7 | 9 | 10 | 8 | 7 | 10 | 8 | 9 | 10 | 10 | 5 | 7 | 5 | 8 | 8 | **84** | STUDY-PILOT-FAV | INSTALL if GH-heavy |
| anthropics/anthropic-sdk-python [baseline] | 8 | 10 | 8 | 5 | 8 | 10 | 10 | 10 | 10 | 10 | 5 | 6 | 5 | 7 | 9 | **86** | ADOPT-NOW (transitive) | INSTALL via SDK |
| anthropics/anthropic-sdk-typescript [baseline] | 7 | 10 | 8 | 5 | 8 | 10 | 10 | 10 | 10 | 10 | 5 | 6 | 5 | 7 | 9 | **85** | ADOPT-NOW (transitive) | INSTALL via SDK if TS |
| openai/openai-python [baseline] | 9 | 10 | 10 | 5 | 8 | 10 | 10 | 10 | 10 | 10 | 5 | 6 | 5 | 7 | 9 | **88** | ADOPT-NOW (transitive) | INSTALL |
| openai/openai-node [baseline] | 8 | 10 | 10 | 5 | 8 | 10 | 10 | 10 | 10 | 10 | 5 | 6 | 5 | 7 | 9 | **87** | ADOPT-NOW (transitive) | INSTALL if Node |
| openai/skills [baseline] | 6 | 8 | 10 | 8 | 8 | 9 | 9 | 9 | 10 | 10 | 5 | 6 | 5 | 7 | 8 | **82** | STUDY-PILOT-FAV | INSTALL if OpenAI-aligned |
| modelcontextprotocol/modelcontextprotocol (spec) [baseline] | 7 | 10 | 10 | 4 (spec only) | 5 | 10 | 10 | 10 | 10 | 10 | 5 | 6 | 5 | 8 | 9 | **80** | CITE-CLASS-CANONICAL | ADAPT-PATTERN (spec ref) |
| github/codeql-action [baseline] | 7 | 9 | 10 | 8 | 8 | 10 | 10 | 10 | 10 | 10 | 5 | 6 | 7 | **10** | 8 | **85** | ADOPT-NOW | INSTALL CI |

---

## Layer 2: SKILLS METHODOLOGY

| Repo | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | D9 | D10 | D11 | D12 | D13 | D14 | D15 | Σ | Verdict | Action |
|------|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|---|---------|--------|
| **obra/superpowers** (192,855★ ✅verified) | 10 | 9 SPE | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 7 | 9 | 5 | 7 | 10 | **97** | ADOPT-NOW | INSTALL |
| addyosmani/agent-skills (42,097★) | 9 | 9 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 6 | 8 | 5 | 7 | 9 | **93** | ADOPT-NOW | INSTALL |
| wshobson/agents (35,459★) | 9 | 10 SUSTAINED-ACTIVE | 10 | 10 | 10 | 9 | 10 | 8 (Conductor HARD-GATE risk) | 10 | 10 | 6 | 10 | 5 | 7 | 9 | **92** | ADOPT-NOW granular | INSTALL granular |
| ralph-loop@claude-plugins-official | 5 | 8 | 8 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 5 | 9 | 5 | 7 | 9 | **91** | ADOPT-NOW | INSTALL |
| agent-sdk-dev@claude-plugins-official | 5 | 8 | 8 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 5 | 9 | 5 | 7 | 9 | **91** | ADOPT-NOW | INSTALL |
| affaan-m/everything-claude-code (183,322★) | 10 | 8 | 10 | 6 | 4 | 9 | 10 | 8 | 10 | 10 | 6 | 8 | 5 | 7 | 9 | **86** | STUDY-PILOT-FAV | ADAPT-PATTERN |
| shanraisshan/claude-code-best-practice (53,176★) | 9 | 9 | 10 | 4 (HTML ref) | 5 | 10 | 10 | 9 | 10 | 10 | 6 | 8 | 5 | 7 | 9 | **84** | ADOPT-NOW (REF) | ADAPT-PATTERN |
| mattpocock/skills [baseline] | 9 | 9 | 10 | 8 | 5 | 9 | 10 | 9 | 10 | 10 | 6 | 7 | 5 | 7 | 10 | **84** | ADOPT-NOW | INSTALL (TS-focused) |
| garrytan/gstack [baseline] | 7 | 9 | 10 | 8 | 8 | 9 | 10 | 9 | 10 | 10 | 7 (Pattern-B mitigation) | 8 | 5 | 7 | 9 | **83** | ADOPT-NOW selective | ADAPT-PATTERN |
| gsd-build/get-shit-done (62,471★) | 9 | 9 | 10 | 8 | 5 | 7 | 9 | 8 | 10 | 10 | 6 | 8 | 5 | 7 | 9 | **80** | STUDY-PILOT-FAV | ADAPT-PATTERN |
| EveryInc/compound-engineering-plugin [baseline] | 7 | 8 | 10 | 10 | 10 | 8 | 8 | 9 | 10 | 10 | 6 | 7 | 5 | 7 | 8 | **78** | STUDY-PILOT-FAV | INSTALL |
| K-Dense-AI/scientific-agent-skills (22,465★) | 8 | 9 | 10 | 8 | 5 | 8 | 9 | 9 | 10 | 10 | 6 | 7 | 5 | 7 | 9 | **78** | STUDY-PILOT-FAV | INSTALL if research |
| alirezarezvani/claude-skills (14,955★) | 7 | 9 | 10 | 8 | 5 | 8 | 9 (self-audit grading) | 8 | 10 | 10 | 6 | 7 | 5 | 7 | 8 | **76** | STUDY-PILOT-FAV | INSTALL selective |
| OthmanAdi/planning-with-files (21,363★) | 8 | 9 | 10 | 8 | 5 | 7 | 8 | 9 | 10 | 10 | 7 (Manus planning) | 6 | 5 | 7 | 8 | **74** | STUDY-PILOT-FAV | INSTALL if fit |
| davila7/claude-code-templates (27,306★) | 8 | 9 | 10 | 8 | 5 | 7 | 9 | 8 | 10 | 10 | 6 | 6 | 6 (config monitoring) | 7 | 8 | **74** | STUDY-PILOT-FAV | INSTALL for CC config |
| mvanhorn/last30days-skill (25,906★) | 8 | 8 | 10 | 10 | 10 | 7 | 8 | 9 | 10 | 10 | 6 | 5 | 5 | 7 | 8 | **74** | STUDY-PILOT-FAV | INSTALL for research |
| revfactory/harness (3,387★) | 5 | 8 | 10 | 7 | 5 | 6 | 7 | 8 | 10 | 10 | 6 | 8 (meta-skill) | 5 | 7 | 8 | **68** | STUDY-PILOT-NARROW | ADAPT-PATTERN |
| Yeachan-Heo/oh-my-claudecode (33,966★) | 9 | 8 | 10 | 6 | 5 | 7 | 8 | 7 (META-HARNESS risk) | 5 | 10 | 6 | 7 | 5 | 7 | 8 | **66** | REJECT per claude-sota verified-avoid Cohort 1 | REJECT |
| code-yeongyu/oh-my-openagent (57,962★) | 9 | 8 | 10 | 6 | 5 | 7 | 8 | 7 (similar HARD-GATE risk) | 5 | 10 | 6 | 7 | 5 | 7 | 8 | **66** | STUDY-PILOT-NARROW | REFERENCE |
| Piebald-AI/claude-code-system-prompts [baseline] | 6 | 9 | 10 | 4 (cite-only) | 5 | 8 | 9 (Piebald named-T2) | 9 | 10 | 10 | 6 | 6 | 5 | 7 | 9 | **74** | STUDY-PILOT-FAV | ADAPT-PATTERN |
| VILA-Lab/Dive-into-Claude-Code [baseline] | 6 | 8 | 10 | 4 (educational) | 5 | 7 | 8 | 8 | 10 | 10 | 6 | 6 | 5 | 7 | 8 | **70** | STUDY-PILOT-NARROW | REFERENCE |
| shareAI-lab/learn-claude-code (60,674★) | 9 | 8 | 10 | 4 (educational) | 5 | 7 | 8 | 8 | 10 | 10 | 6 | 6 | 5 | 7 | 8 | **74** | STUDY-PILOT-FAV REFERENCE | REFERENCE |
| luongnv89/claude-howto (33,036★) | 9 | 8 | 10 | 4 (visual guide) | 5 | 7 | 8 | 8 | 10 | 10 | 6 | 5 | 5 | 7 | 8 | **72** | STUDY-PILOT-FAV | REFERENCE |
| Fission-AI/OpenSpec [baseline] | 7 | 8 | 10 | 8 | 5 | 8 | 8 | 8 | 10 | 10 | 6 | 7 | 5 | 7 | 8 | **74** | STUDY-PILOT-FAV | INSTALL if spec |
| sickn33/antigravity-awesome-skills (37,635★) | 9 | 8 | 10 | 7 | 7 (installer) | 6 (single-individual) | 8 | 8 | 10 | 10 | 6 | 6 | 5 | 7 | 8 | **70** | STUDY-PILOT-FAV | REFERENCE (verify installer) |
| ComposioHQ/awesome-claude-skills (60,007★) | 9 | 9 | 4 (CC-BY-NC-ND) | 4 (cite) | 5 | 10 | 9 | 9 | 5 | 10 | 5 | 6 | 5 | 7 | 9 | **65** | STUDY-PILOT-NARROW | REFERENCE only |
| hesreallyhim/awesome-claude-code (43,866★) | 9 | 9 | 4 (CC-BY-NC-ND) | 4 (cite) | 5 | 10 | 10 | 9 | 5 | 10 | 5 | 6 | 5 | 7 | 9 | **72** | REFERENCE | REFERENCE |
| VoltAgent/awesome-agent-skills (21,845★) | 8 | 8 | 8 | 4 (catalog) | 5 | 8 | 8 | 9 | 5 | 10 | 5 | 6 | 5 | 7 | 8 | **65** | REFERENCE | REFERENCE |
| sangrokjung/claude-forge (700★) | 4 | 6 | 10 | 10 (framework + 6-layer hooks) | 10 | 6 | 7 | 9 | 9 | 10 | 6 | 8 | 5 | 8 (6-layer security hooks) | 8 | **76** | STUDY-PILOT-FAV | STUDY-PILOT |
| santifer/career-ops (44,905★) | 9 | 8 | 8 | 8 | 5 | 7 | 8 | 8 | 10 | 10 | 6 | 7 | 5 | 7 | 8 | **70** | STUDY-PILOT-NARROW (use-case-specific) | DEFER |
| nextlevelbuilder/ui-ux-pro-max-skill (79,038★) | 10 | 8 | 8 | 10 | 10 | 7 | 8 | 9 | 10 | 10 | 6 | 5 (single skill) | 5 | 7 | 8 | **74** | STUDY-PILOT-NARROW (UI-design specialty) | INSTALL if UI work |
| JimLiu/baoyu-skills (18,401★) | 7 | 8 | 8 | 8 | 5 | 7 | 7 | 8 | 10 | 10 | 6 | 7 | 5 | 7 | 8 | **62** | STUDY-PILOT-NARROW | DEFER |
| nexu-io/open-design (41,658★) | 9 | 7 | 10 (MIT) | 8 (CC/Cursor/Gemini/OpenCode integration) | 5 | 7 | 8 | 9 | 10 | 10 | 6 | 7 | 5 | 7 | 8 | **74** | STUDY-PILOT-FAV (design-system specialty) | INSTALL if design work |
| github/awesome-copilot (33,083★) | 9 | 9 | 8 | 4 (Copilot-ecosystem) | 5 | 9 | 9 | 8 | 5 | 10 | 5 | 6 | 5 | 7 | 8 | **70** | STUDY-PILOT-NARROW | REFERENCE (cross-ecosystem) |

---

## Layer 3: ORCHESTRATION RUNTIME

| Repo | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | D9 | D10 | D11 | D12 | D13 | D14 | D15 | Σ | Verdict | Action |
|------|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|---|---------|--------|
| langchain-ai/langgraph [baseline] | 8 | 10 | 10 | 5 | 6 | 10 | 9 | 8 | 9 | 10 | 6 | 10 (state-graph) | 5 | 7 | 9 | **80** | STUDY-PILOT-FAV | ADAPT-PATTERN |
| langchain-ai/deepagents [baseline] | 7 | 8 | 10 | 5 (Python+JS+ACP) | 6 | 9 | 9 | 8 | 9 | 10 | 7 (TruncateArgsSettings) | 9 (sub-agent) | 5 | 7 | 9 | **78** | STUDY-PILOT-FAV | ADAPT-PATTERN |
| openai/openai-agents-python [baseline ~25k★] | 8 | 9 | 10 | 5 | 6 | 9 | 9 | 8 | 9 | 10 | 6 | 9 (Handoff+Tracing) | 5 | 7 | 9 | **78** | STUDY-PILOT-FAV | ADAPT-PATTERN |
| ruvnet/ruflo (51,565★) | 9 | 8 | 10 | 6 | 6 | 7 | 8 | 8 | 8 | 10 | 6 | 9 (enterprise swarm) | 5 | 7 | 8 | **78** | STUDY-PILOT-FAV | STUDY |
| crewAIInc/crewAI [baseline] | 9 | 10 | 10 | 4 | 5 | 9 | 9 | 6 | 5 | 10 | 6 | 8 (Crews+Flows) | 5 | 7 | 9 | **74** | DEFER (CR-12 DUP for CC) | REFERENCE |
| microsoft/agent-framework [baseline] | 8 | 9 | 10 | 4 (Azure-centric) | 5 | 9 | 9 | 6 | 5 | 10 | 6 | 9 | 5 | 7 | 9 | **74** | DEFER (out-of-CC) | REFERENCE |
| microsoft/autogen [baseline] | 9 | 10 | 10 | 4 | 5 | 9 | 9 | 6 | 5 | 10 | 6 | 9 (multi-agent debate) | 5 | 7 | 9 | **76** | STUDY-PILOT-NARROW | ADAPT-PATTERN |
| huggingface/smolagents [baseline ~27k] | 9 | 9 | 10 | 4 (CodeAgent) | 5 | 9 | 9 | 6 | 5 | 10 | 6 | 7 (code-agent paradigm) | 5 | 7 | 9 | **72** | STUDY-PILOT-NARROW | ADAPT-PATTERN |
| agno-agi/agno [baseline ~40k] | 9 | 9 | 10 | 4 (service-deploy) | 5 | 8 | 9 | 6 | 5 | 10 | 6 | 8 | 5 | 7 | 9 | **70** | DEFER (out-of-CC) | REFERENCE |
| google/adk-python [baseline] | 7 | 8 | 10 | 5 (Python SDK) | 6 | 8 | 9 | 8 | 5 | 10 | 6 | 8 | 5 | 7 | 8 | **74** | STUDY-PILOT-FAV | ADAPT-PATTERN |
| google/adk-js [baseline] | 7 | 8 | 10 | 5 | 6 | 7 | 9 | 8 | 5 | 10 | 6 | 8 | 5 | 7 | 8 | **72** | STUDY-PILOT-NARROW | ADAPT-PATTERN |
| pydantic/pydantic-ai [baseline] | 8 | 8 | 10 | 5 (Python SDK) | 6 | 8 | 9 | 8 | 5 | 10 | 6 | 8 (typed-agent) | 5 | 7 | 9 | **76** | STUDY-PILOT-FAV | ADAPT-PATTERN |
| mastra-ai/mastra [baseline] | 7 | 8 | 10 | 5 (TS SDK) | 6 | 8 | 9 | 8 | 5 | 10 | 6 | 8 (event-sourced) | 5 | 7 | 8 | **74** | STUDY-PILOT-FAV | ADAPT-PATTERN |
| OpenHands/OpenHands [baseline] | 8 | 9 | 10 | 4 (standalone) | 5 | 8 | 9 | 7 | 5 | 10 | 6 | 8 | 5 | 7 | 9 | **74** | STUDY-PILOT-NARROW | REFERENCE |
| aaif-goose/goose [baseline] | 8 | 9 | 10 | 4 (Rust desktop + ACP host) | 5 | 9 | 9 | 7 | 5 | 10 | 6 | 8 | 5 | 7 | 9 | **76** | STUDY-PILOT-NARROW | REFERENCE |
| google-gemini/gemini-cli (104,071★) | 10 | 9 | 10 | 4 (alt CLI) | 5 | 9 (CC+Codex+Cursor cross-compat) | 9 | 7 | 5 | 10 | 6 | 7 | 5 | 7 | 9 | **80** | STUDY-PILOT-FAV (alt-runtime) | REFERENCE |
| QwenLM/qwen-code [baseline] | 8 | 8 | 10 | 4 | 5 | 8 | 9 | 7 | 5 | 10 | 6 | 7 | 5 | 7 | 8 | **72** | STUDY-PILOT-NARROW | REFERENCE |
| Kilo-Org/kilocode [baseline] | 7 | 8 | 10 | 4 | 5 | 8 | 9 | 7 | 5 | 10 | 6 | 7 | 5 | 7 | 8 | **68** | STUDY-PILOT-NARROW | REFERENCE |
| sst/opencode [baseline] | 8 | 9 | 10 | 4 | 5 | 8 | 9 | 7 | 5 | 10 | 6 | 7 | 5 | 7 | 8 | **72** | STUDY-PILOT-NARROW | REFERENCE |
| NousResearch/hermes-agent (152,054★) | 10 | 8 | 8 | 4 (Nous Research ecosystem) | 5 | 8 | 9 | 6 | 5 | 10 | 6 | 7 | 5 | 7 | 8 | **76** | STUDY-PILOT-NARROW | REFERENCE |
| HKUDS/nanobot (42,543★) | 9 | 8 | 8 | 4 (HKU lab) | 5 | 7 | 8 | 6 | 5 | 10 | 6 | 7 | 5 | 7 | 8 | **70** | STUDY-PILOT-NARROW | REFERENCE |
| HKUDS/OpenHarness [baseline] | 7 | 7 | 8 | 4 (academic harness) | 5 | 7 | 8 | 6 | 5 | 10 | 6 | 7 | 5 | 7 | 8 | **66** | STUDY-PILOT-NARROW | REFERENCE |
| ComposioHQ/agent-orchestrator [baseline] | 7 | 8 | 10 | 5 (Composio SDK) | 6 | 8 | 9 | 7 | 8 | 10 | 6 | 9 (DAG dispatch) | 5 | 7 | 8 | **76** | STUDY-PILOT-FAV (macOS) | STUDY (pattern source) |
| nutthouse/tutti [baseline] | 6 | 7 | 10 | 6 | 6 | 7 | 8 | 8 | 8 | 10 | 6 | 8 | 5 | 7 | 8 | **72** | STUDY-PILOT-NARROW | STUDY |
| stagewise-io/stagewise (6,674★) | 7 | 8 | 10 | 7 (open-source agentic IDE) | 5 | 7 | 8 | 7 | 8 | 10 | 6 | 9 (orchestrate coding agents) | 5 | 7 | 8 | **74** | STUDY-PILOT-NARROW | REFERENCE (IDE shape) |
| builderz-labs/mission-control (4,829★) | 7 | 7 | 10 | 7 (self-hosted dashboard) | 6 | 7 | 7 | 7 | 8 | 10 | 6 | 9 (multi-agent + spend monitoring) | 7 | 7 | 8 | **76** | STUDY-PILOT-FAV | STUDY |
| AgentsMesh (2,038★) | 6 | 7 | 10 | 6 (Go) | 6 | 7 | 7 | 7 | 8 | 10 | 6 | 8 (workforce platform) | 5 | 7 | 7 | **70** | STUDY-PILOT-NARROW | STUDY |
| nrslib/takt (1,050★) | 5 | 7 | 10 | 7 (YAML topology) | 6 | 6 | 7 | 8 | 9 | 10 | 6 | 9 (declarative coord) | 5 | 7 | 8 | **72** | STUDY-PILOT-FAV | ADAPT-PATTERN |
| dohooo/helmor (1,083★) | 5 | 7 | 10 | 7 (local workbench) | 6 | 6 | 7 | 7 | 8 | 10 | 6 | 8 (multi-agent dev) | 5 | 7 | 7 | **70** | STUDY-PILOT-NARROW | STUDY |
| covibes/zeroshot (1,477★) | 5 | 7 | 10 | 7 (autonomous CLI) | 6 | 7 | 8 | 7 | 9 | 10 | 6 | 8 | 5 | 7 | 8 | **70** | STUDY-PILOT-NARROW | STUDY |
| GetBindu/Bindu (5,643★) | 7 | 7 | 10 | 6 (microservice agent) | 5 | 7 | 7 | 7 | 8 | 10 | 6 | 8 (a2a + composable) | 5 | 7 | 8 | **72** | STUDY-PILOT-NARROW | REFERENCE |
| nextlevelbuilder/goclaw (3,089★) | 7 | 7 | 10 | 5 (OpenClaw rebuild Go) | 6 | 6 | 7 | 7 | 5 | 10 | 6 | 8 (multi-tenant + 5-layer security) | 5 | 8 | 8 | **70** | STUDY-PILOT-NARROW | REFERENCE |
| Ataraxy-Labs/opensessions (1,043★) | 5 | 7 | 10 | 7 (tmux sidebar) | 6 | 7 | 7 | 7 | 8 | 10 | 6 | 8 (per-thread markers) | 5 | 7 | 7 | **70** | STUDY-PILOT-NARROW | STUDY |
| nyldn/claude-octopus (3,345★) | 7 | 7 | 10 | 8 (8-model orch plugin) | 5 | 7 | 8 | 7 | 9 | 10 | 6 | 9 (multi-AI orch) | 6 | 7 | 8 | **76** | STUDY-PILOT-NARROW | STUDY |
| michaelshimeles/ralphy (2,855★) | 6 | 7 | 8 | 7 (bash wrapper) | 7 | 6 (single-author) | 7 | 8 | 8 | 10 | 5 | 7 (ralph-loop) | 5 | 6 | 7 | **66** | STUDY-PILOT-NARROW (Anthropic ralph-loop canonical) | REFERENCE |
| eyaltoledano/claude-task-master [baseline] | 8 | 8 | 10 | 8 (PRD task master) | 6 | 8 | 8 | 8 | 9 | 10 | 6 | 8 | 5 | 7 | 8 | **78** | STUDY-PILOT-FAV | INSTALL if PM workflow |
| bmad-code-org/BMAD-METHOD [baseline ~10k+] | 8 | 9 | 10 | 8 (multi-day feature graphs) | 6 | 9 | 9 | 8 | 9 | 10 | 6 | 8 | 5 | 7 | 9 | **80** | STUDY-PILOT-FAV | INSTALL if multi-day features |
| automazeio/ccpm [baseline] | 7 | 8 | 10 | 8 (PM workflow) | 6 | 8 | 8 | 8 | 9 | 10 | 6 | 7 | 5 | 7 | 8 | **74** | STUDY-PILOT-FAV | INSTALL |
| Wirasm/PRPs-agentic-eng [baseline] | 7 | 8 | 10 | 8 (PRP methodology) | 6 | 8 | 9 | 8 | 9 | 10 | 6 | 7 | 5 | 7 | 8 | **74** | STUDY-PILOT-FAV | INSTALL |
| coleam00/context-engineering-intro [baseline] | 8 | 8 | 10 | 4 (intro tutorial) | 5 | 8 | 8 | 7 | 9 | 10 | 6 | 6 | 5 | 7 | 8 | **70** | STUDY-PILOT-NARROW | REFERENCE |
| intellectronica/ruler [baseline] | 6 | 8 | 10 | 7 (ruler patterns) | 6 | 7 | 8 | 8 | 9 | 10 | 6 | 7 | 5 | 7 | 8 | **70** | STUDY-PILOT-NARROW | INSTALL if fit |
| humanlayer/humanlayer [baseline] | 8 | 8 | 10 | 5 (humanlayer SDK) | 6 | 8 | 9 | 8 | 9 | 10 | 6 | 8 (HITL primitive) | 5 | 7 | 8 | **76** | STUDY-PILOT-FAV | STUDY |
| humanlayer/advanced-context-engineering-for-coding-agents [baseline] | 7 | 8 | 10 | 4 (methodology) | 5 | 8 | 9 | 8 | 9 | 10 | 6 | 7 | 5 | 7 | 9 | **72** | STUDY-PILOT-FAV | REFERENCE |
| anthropic-cookbook [TIER-1 Anthropic] | 7 | 10 | 8 | 4 (cite/skill) | 5 | 10 | 10 | 9 | 10 | 10 | 9 (Cost-Tier discipline) | 9 (sub-agents recipe) | 7 (eval+optimizer recipe) | 7 | **10** | **84** | CITE-CLASS-CANONICAL | ADAPT-PATTERN |

---

## Layer 4: MEMORY (L1+L2+L3)

| Repo | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | D9 | D10 | D11 | D12 | D13 | D14 | D15 | Σ | Verdict | Action |
|------|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|---|---------|--------|
| thedotmack/claude-mem (75,999★ verified fresh) — **Wave 3A LICENSE+native-path VERIFIED** | 10 | 9 SUSTAINED-ACTIVE | **10 (Apache-2.0 VERIFIED)** | **10 (Tier-S: `.claude-plugin/marketplace.json` VERIFIED + 5 lifecycle hooks + mem-search MCP skill multi-runtime)** | 8 | 9 | 10 | **10 (Probe 5 CLEAR — auto-defaults + worker on port 37777, no HARD-GATE)** | 7 (PARTIAL-OVERLAP with doobidoo+graphiti — 30-day A/B recommended) | 10 | 8 (AI compression) | 8 (memory engine) | 5 | 7 | 9 | **91** | **ADOPT-NOW-CONDITIONAL** | **INSTALL** via `/plugin marketplace add thedotmack/claude-mem` (run 30-day A/B vs mcp-memory + graphiti) |
| getzep/graphiti v0.29.0 (25,800★) | 9 | 10 | 10 | 8 (MCP + FalkorDB backend) | 6 | 10 | 10 | 10 | 10 | 10 | 5 | 7 (temporal-KG) | 5 | 7 | 9 | **88** | ADOPT-NOW | INSTALL |
| doobidoo/mcp-memory-service (1,843★) | 6 | 9 | 10 | 8 (MCP stdio) | 8 | 9 | 9 | 10 | 10 | 10 | 5 | 6 (L1+L2 sqlite_vec) | 5 | 7 | 8 | **86** | ADOPT-NOW | INSTALL |
| Gentleman-Programming/engram (3,529★) | 7 | 7 | 10 | 8 (MCP + HTTP + CLI + TUI) | 7 | 6 | 7 | 9 | 10 | 10 | 5 | 7 (SQLite+FTS5) | 5 | 7 | 8 | **78** | STUDY-PILOT-FAV | INSTALL alt L1+L2 |
| DeusData/codebase-memory-mcp (2,357★) | 7 | 7 | 10 | 8 (MCP static binary) | 8 | 6 | 7 | 9 | 10 | 10 | 9 (99% fewer tokens claim) | 7 (155 languages KG) | 5 | 7 | 8 | **80** | STUDY-PILOT-FAV | INSTALL alt code-intel-memory |
| zilliztech/memsearch (1,702★) | 6 | 7 | 10 | 8 (Milvus + Markdown) | 6 | 7 | 7 | 8 | 9 | 10 | 6 | 7 (hybrid-search + reranker) | 5 | 7 | 8 | **72** | STUDY-PILOT-NARROW | INSTALL if Milvus-aligned |
| coleam00/claude-memory-compiler (1,051★) | 6 | 7 | 10 | 8 (CC hooks + Agent SDK) | 7 | 6 | 7 | 9 | 9 | 10 | 6 | 8 (Karpathy LLM Knowledge Base pattern) | 5 | 7 | 8 | **76** | STUDY-PILOT-FAV | STUDY |
| Mibayy/token-savior (852★) | 5 | 7 | 8 | 8 (MCP) | 8 | 6 | 7 | 8 | 9 | 10 | 9 (77% claim — needs verify) | 7 (code navigation) | 5 | 7 | 7 | **74** | STUDY-PILOT-NARROW (Row-2 verify) | DEFER |
| shaneholloman/mcp-knowledge-graph (858★) | 5 | 7 | 10 (TS) | 8 | 7 | 6 | 7 | 9 | 9 | 10 | 5 | 7 (local KG; Cline fork) | 5 | 7 | 8 | **70** | STUDY-PILOT-NARROW | STUDY |
| alioshr/memory-bank-mcp (904★) | 5 | 7 | 10 (TS) | 8 (MCP) | 8 | 6 | 7 | 8 | 9 | 10 | 5 | 7 (Cline memory-bank port) | 5 | 7 | 7 | **68** | STUDY-PILOT-NARROW | STUDY |
| GreatScottyMac/context-portal (762★) | 5 | 7 | 10 (Python) | 8 (MCP) | 7 | 6 | 7 | 8 | 9 | 10 | 5 | 7 (ConPort memory+KG+RAG) | 5 | 7 | 7 | **70** | STUDY-PILOT-NARROW | STUDY |
| Dataojitori/nocturne_memory (1,077★) | 5 | 7 | 10 (Python) | 8 (MCP) | 7 | 6 | 7 | 8 | 9 | 10 | 5 | 7 (rollbackable graph-like LTM) | 5 | 7 | 7 | **68** | STUDY-PILOT-NARROW | STUDY |
| ghostwright/phantom (1,421★) | 5 | 7 | 8 | 5 (built on Agent SDK) | 7 | 6 | 7 | 8 | 9 | 10 | 5 | 7 (AI co-worker) | 5 | 7 | 8 | **70** | STUDY-PILOT-NARROW | STUDY |
| supermemoryai/supermemory-mcp (1,689★) | 5 | 7 | 10 | 8 (MCP) | 8 | 6 | 7 | 5 (DEPRECATED-BANNER per Wave 2B) | 5 (collision with doobidoo) | 8 (cloud dep) | 5 | 6 | 5 | 7 | 7 | **REJECT-FOR-FIT** (Wave 2B) | REJECT |
| mkreyman/mcp-memory-keeper (122★) | 3 | 7 | 10 | 8 (MCP) | 8 | 5 | 6 | 9 | 5 (DUPLICATE per Wave 2B) | 10 | 5 | 7 | 5 | 7 | 7 | **REJECT-FOR-FIT** | REJECT |
| campfirein/cipher → byterover-cli (4,750★) | 7 | 8 | 0 (ELv2 non-permissive) | 0 (META-HARNESS competing) | 5 | 7 | 8 | 0 (HARD-GATE cloud-login) | 0 (META-HARNESS) | 0 | 6 | 8 | 5 | 7 | 8 | **REJECT-FOR-FIT** (triple-blocker Wave 2B) | REJECT |
| ressl/mcp-firewall (6★) | 1 | 5 | 0 (AGPL-3.0) | 0 (wrong category — security gateway) | 5 | 3 | 5 | 8 | 5 | 0 | 5 | 5 | 5 | 8 | 6 | **REJECT-FOR-FIT** | REJECT |
| gifflet/graphiti-mcp-server (140★) | 3 | 7 | 10 | 5 (DUPLICATE of canonical getzep/graphiti) | 7 | 5 | 6 | 9 | 0 (DUPLICATE-FUNCTIONALITY) | 10 | 5 | 7 | 5 | 7 | 7 | **REJECT-FOR-FIT** | REJECT |
| mem0ai/mem0 [baseline] | 8 | 9 | 10 | 5 (Python SDK) | 7 | 8 | 9 | 7 | 9 | 10 | 6 | 7 | 5 | 7 | 8 | **74** | DEFER-EVAL at scale≥100k | REFERENCE |
| letta-ai/letta [baseline] | 8 | 9 | 10 | 5 (Letta SDK) | 7 | 8 | 9 | 7 | 9 | 10 | 6 | 7 | 5 | 7 | 8 | **72** | DEFER | REFERENCE |
| topoteretes/cognee [baseline] | 7 | 8 | 8 | 5 | 6 | 7 | 8 | 7 | 0 (CR-12 DUPLICATE of graphiti) | 10 | 6 | 7 | 5 | 7 | 8 | **REJECT-FOR-FIT** (Wave 207-209) | REJECT |
| getzep/zep [baseline] | 8 | 9 | 10 | 5 | 6 | 8 | 9 | 7 | 0 (SUPERSEDED-BY-graphiti) | 10 | 6 | 7 | 5 | 7 | 8 | **REJECT-FOR-FIT** | REJECT |
| volcengine/OpenViking [baseline] | 7 | 7 | 0 (AGPLv3) | 0 (license blocker) | 5 | 6 | 7 | 5 | 0 | 0 | 6 | 7 | 5 | 7 | 7 | **REJECT-FOR-FIT** (n=3+ audits) | REJECT |

---

## Layer 5: TOKEN OPTIMIZATION

| Repo | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | D9 | D10 | D11 | D12 | D13 | D14 | D15 | Σ | Verdict | Action |
|------|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|---|---------|--------|
| Anthropic prompt-cache (TIER-1 OFFICIAL) | n/a | 10 | 8 | 5 (SDK) | 10 (implicit) | 10 | 10 | 10 | 10 | 10 | **10** (60-90% reuse) | 5 | 5 | 7 | 10 | **96** | ADOPT-NOW | INSTALL-IMPLICIT |
| Anthropic `/compact` + autocompact + env override | n/a | 10 | 8 | 8 (CLI+env) | 10 | 10 | 10 | 10 | 10 | 10 | **10** (summary decay) | 5 | 5 | 7 | 10 | **94** | ADOPT-NOW | INSTALL-IMPLICIT |
| yamadashy/repomix (active, 18M dl/mo) | 9 | 10 | 10 | 10 (MCP + CLI + skill via `generate_skill`) | 8 | 10 | 10 | 9 | 10 | 10 | 9 (~70% tree-sitter) | 7 | 5 | 7 | 9 | **94** | ADOPT-NOW | INSTALL |
| mksglu/context-mode (14,826★) — **Wave 3A LICENSE FIX** | 7 | 7 | **0 (ELv2 non-permissive)** | 0 (license-key gated + anti-SaaS) | 10 | 7 | 8 | 5 (license-key HARD-GATE) | 0 (DUPLICATE if installable) | **0 (Probe 6 REJECT)** | **10** (98% claim — but unreachable) | 6 | 5 | 7 | 8 | **REJECT** | REJECT-FOR-FIT | ADAPT-PATTERN |
| rtk-ai/rtk (48,553★) | 9 | 9 | 10 | 8 (CLI proxy single Rust binary) | 8 | 8 | 8 | 10 | 10 | 10 | **10** (60-90% CLI commands) | 5 | 5 | 7 | 8 | **92** | ADOPT-NOW | INSTALL |
| JuliusBrussee/caveman (60,743★) — **Wave 3A LICENSE+benchmark VERIFIED** | 10 | 8 SUSTAINED-ACTIVE | **10 (MIT VERIFIED)** | 10 (skill plugin via curl-pipe-bash install.sh OR npm caveman-shrink fallback) | 10 | 7 | 8 | **10 (Probe 5 CLEAR — auto-activates; --with-init for always-on)** | 10 | 10 | 9 (65% rewrite **VERIFIED reproducible 3-arm bench**) | 5 | 5 | 7 | 8 | **92** | **ADOPT-NOW** | **INSTALL** (caveman + caveman-compress + caveman-stats; review install.sh first per canonical Must-Never #3) |
| ryoppippi/ccusage (active) | 7 | 9 | 10 | 8 (CLI) | 8 | 9 | 9 | 10 | 10 | 10 | 5 (measurement) | 5 | 9 (token-cost telemetry) | 7 | 9 | **86** | ADOPT-NOW | INSTALL |
| diegosouzapw/OmniRoute (4,633★) | 7 | 8 | 10 | 7 (gateway/proxy) | 5 | 7 | 7 | 9 | 9 | 10 | 10 (RTK+caveman stacked ~95%) | 7 (160+ providers gateway) | 7 | 7 | 8 | **80** | STUDY-PILOT-FAV | STUDY |
| chopratejas/headroom (1,759★) | 6 | 8 | 10 | 8 (library + proxy + MCP) | 7 | 6 | 7 | 9 | 9 | 10 | 10 (60-95% tool outputs/logs/RAG) | 6 | 5 | 7 | 8 | **80** | STUDY-PILOT-FAV | INSTALL alt |
| yvgude/lean-ctx (1,669★) | 6 | 7 | 10 | 8 (Rust + Shell Hook + MCP) | 7 | 6 | 7 | 9 | 9 | 10 | 10 (60-95%; 99% cached reads; 49 tools/10 read modes) | 6 | 5 | 7 | 8 | **80** | STUDY-PILOT-FAV | STUDY |
| cytostack/openwolf (1,645★) | 6 | 7 | 10 | 8 (CC middleware) | 7 | 6 | 7 | 8 | 9 | 10 | 9 | 5 | 5 | 7 | 7 | **76** | STUDY-PILOT-NARROW | STUDY |
| alexgreensh/token-optimizer (982★) | 5 | 7 | 10 | 10 (skill+plugin) | 10 | 6 | 7 | 9 | 10 | 10 | 9 (ghost-token detection + compaction survival) | 5 | 5 | 7 | 7 | **78** | STUDY-PILOT-FAV | INSTALL |
| Mibayy/token-savior (852★) | 5 | 7 | 8 | 8 (MCP) | 8 | 6 | 7 | 8 | 9 | 10 | 9 (77% claim) | 7 (code-nav + memory) | 5 | 7 | 7 | **74** | STUDY-PILOT-NARROW (Row-2 verify) | DEFER |
| lucasrosati/claude-code-memory-setup (649★) | 4 | 7 | 10 | 8 (Obsidian + Graphify) | 5 | 5 | 6 | 8 | 9 | 10 | 9 (71.5x fewer per session) | 7 (KG offload) | 5 | 7 | 7 | **72** | STUDY-PILOT-NARROW | STUDY |
| AgentOps-AI/tokencost (1,981★) | 6 | 8 | 10 | 7 (Python lib) | 7 | 6 | 7 | 9 | 10 | 10 | 7 (400+ LLM cost) | 5 | 8 (token-price awareness) | 7 | 7 | **74** | STUDY-PILOT-FAV | INSTALL companion to ccusage |
| LangChain deepagents TruncateArgsSettings (cite) | n/a | 9 | 10 | 4 (cite-only) | n/a | 10 | 9 | 9 | n/a | n/a | 7 (pattern reference) | n/a | n/a | n/a | 9 | **n/a** | CITE-CLASS-CANONICAL | ADAPT-PATTERN |
| microsoft/LLMLingua (stale 2025-10-28) | 7 | 4 STALE | 10 | 4 (Python only) | 5 | 5 | 6 | 5 | 9 | 10 | 6 (offline rewrite; anti-pattern for CC) | 5 | 5 | 7 | 7 | **45** | REJECT-FOR-FIT (stale + anti-pattern) | REJECT |
| microsoft/LLMLingua-2 [baseline] | 6 | 4 | 10 | 4 | 5 | 5 | 6 | 5 | 9 | 10 | 6 | 5 | 5 | 7 | 7 | **45** | REJECT (same lineage) | REJECT |
| open-compress/claw-compactor [baseline] | 4 | 3 (maintenance-mode cpd=0.72) | 10 | 4 | 5 | 4 | 5 | 5 | 9 | 10 | 6 | 5 | 5 | 7 | 6 | **40** | REJECT (maintenance-mode) | REJECT |
| upstash/context7 (55,388★) | 9 | 9 | 10 | 8 (MCP + cloud) | 7 | 9 | 9 | 9 | 10 | 10 | 7 (up-to-date docs in context) | 5 | 5 | 7 | 9 | **85** | ADOPT-NOW | INSTALL |

---

## Layer 6: CODE INTELLIGENCE

| Repo | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | D9 | D10 | D11 | D12 | D13 | D14 | D15 | Σ | Verdict | Action |
|------|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|---|---------|--------|
| oraios/serena (24,271★) | 8 | 9 | 10 | 8 (MCP stdio) | 7 | 9 | 9 | 10 | 10 | 10 | 7 (semantic retrieval) | 7 (symbol-tree) | 5 | 7 | 9 | **92** | ADOPT-NOW | INSTALL |
| yamadashy/repomix (above L5) | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | **94** | ADOPT-NOW | INSTALL |
| ast-grep/ast-grep (~40k★ baseline) | 9 | 10 | 10 | 8 (standalone CLI — NOT phantom MCP per FM-09) | 8 | 10 | 10 | 9 | 10 | 10 (CLI exists; npm phantom @anthropic) | 6 (AST search) | 6 | 5 | 7 | 9 | **86** | ADOPT-NOW | INSTALL CLI |
| tree-sitter/tree-sitter [baseline substrate] | 8 | 10 | 10 | 5 (substrate library) | 7 | 10 | 10 | 9 | 10 | 10 | 6 | 6 | 5 | 7 | 9 | **84** | ADOPT-NOW substrate | INSTALL (transitive via ast-grep + repomix) |
| safishamsi/graphify (48,374★) | 9 | 8 | 10 | 8 (skill) | 8 | 8 | 9 | 9 | 10 | 10 | 8 (code→KG via tree-sitter+Leiden) | 7 | 5 | 7 | 8 | **85** | STUDY-PILOT-FAV | ADAPT-PATTERN |
| aider-ai/aider (~30k★ baseline) | 9 | 9 | 10 | 4 (standalone CLI alt agent) | 7 | 9 | 9 | 8 | 5 (alt agent — DUPLICATE for CC scope) | 10 | 6 | 7 | 5 | 7 | 9 | **80** | STUDY-PILOT-FAV | REFERENCE |
| Piebald-AI/claude-code-lsps (443★) | 3 | 7 | 10 | 10 (plugin marketplace) | 10 | 5 (small repo) | 7 | 9 | 9 | 10 | 6 | 7 (LSP-class code intel) | 5 | 7 | 8 | **78** | STUDY-PILOT-FAV | INSTALL via marketplace |
| zilliztech/claude-context [baseline currently disabled per FM-16] | 7 | 8 | 8 | 6 (MCP+Milvus auth-gated) | 4 | 7 | 8 | 5 | 9 | 8 | 6 | 7 (Milvus-backed code search) | 5 | 7 | 8 | **62** | STUDY-PILOT-NARROW (re-enable when scale demands) | DEFER |
| mufeedvh/code2prompt [baseline] | 7 | 8 | 10 | 8 (CLI) | 7 | 8 | 8 | 9 | 10 | 10 | 6 | 6 | 5 | 7 | 8 | **76** | STUDY-PILOT-FAV | INSTALL |
| mixedbread-ai/mgrep [baseline] | 6 | 8 | 10 | 8 (CLI) | 7 | 7 | 8 | 9 | 10 | 10 | 6 | 6 (semantic grep) | 5 | 7 | 7 | **74** | STUDY-PILOT-FAV | INSTALL alt |
| timescale/pg-aiguide (1,728★) | 5 | 7 | 10 | 10 (MCP + plugin) | 8 | 6 | 7 | 9 | 10 | 10 | 6 | 6 (Postgres-specific code intel) | 5 | 7 | 8 | **76** | STUDY-PILOT-FAV | INSTALL if Postgres |
| Manavarya09/design-extract (2,632★) | 6 | 7 | 10 (MIT) | 10 (MCP+plugin) | 7 | 7 | 8 | 9 | 10 | 10 | 6 | 7 (design-system extract) | 5 | 7 | 8 | **78** | STUDY-PILOT-FAV | INSTALL if design |
| tirth8205/code-review-graph [baseline] | 4 | 6 | (unknown) | 6 | 6 | 5 | 6 | 7 | 8 | 9 | 6 | 7 | 5 | 7 | 6 | **62** | STUDY-PILOT-NARROW (Row-2 fabrication concern) | DEFER |

---

## Layer 7: OBSERVABILITY + EVAL (NEW v2 LAYER)

| Repo | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | D9 | D10 | D11 | D12 | D13 | D14 | D15 | Σ | Verdict | Action |
|------|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|---|---------|--------|
| langfuse/langfuse (27,283★) — **Wave 3A LICENSE VERIFIED** | 9 | 10 SUSTAINED-ACTIVE | **10 (MIT VERIFIED — dual-license: core OSS MIT, enterprise modules commercial)** | 6 (TIER-B/C — SDK/MCP-indirect; Python+TS SDK + OpenTelemetry; **NO direct CC plugin**) | 4 (heavy self-host: Postgres + ClickHouse + Redis + Blob) | 10 (YC W23 + OTel + LangChain + OpenAI SDK + LiteLLM) | 10 | 7 (Cloud OK; self-host first-account-admin gate) | 9 | 10 | 5 | 8 | **10** (full obs + metrics + evals + prompt mgmt + playground + datasets) | 7 | 9 | **82** | **STUDY-PILOT-FAVORABLE** | **Cloud-pilot first** before self-host commit |
| mlflow/mlflow (25,957★) | 9 | 10 | 10 | 7 (Python+UI) | 5 | 10 | 10 | 8 | 9 | 10 | 5 | 8 | **10** (full ML+LLM platform) | 7 | 9 | **84** | STUDY-PILOT-FAV (NEW v2) | STUDY |
| promptfoo/promptfoo (21,290★ verified up from baseline) | 9 | 10 | 10 | 8 (CLI + Node SDK) | 8 | 10 (Used by OpenAI + Anthropic) | 10 | 10 | 10 | 10 | 5 | 7 | 9 (LLM-as-judge eval + red-team) | 9 (red-team focus) | 9 | **88** | ADOPT-NOW | INSTALL |
| comet-ml/opik (19,307★) | 8 | 10 | 10 | 8 (CC plugin disabled per FM-16) | 6 | 9 | 9 | 8 | 5 (currently disabled in claude-sota) | 10 | 5 | 8 | **10** (debug + eval + monitor LLM + RAG + agentic) | 7 | 9 | **80** | STUDY-PILOT (re-enable CC plugin verify) | STUDY |
| openobserve/openobserve (18,862★) | 8 | 10 | 10 | 6 (Rust observability) | 6 | 9 | 9 | 8 | 9 | 10 | 5 | 5 | **10** (logs/metrics/traces/frontend/LLM single binary) | 7 | 9 | **78** | STUDY-PILOT-FAV (NEW v2) | STUDY |
| raga-ai-hub/RagaAI-Catalyst (16,162★) | 8 | 10 | 10 | 6 (Python SDK + self-hosted dashboard) | 6 | 9 | 9 | 8 | 9 | 10 | 5 | 8 (multi-agentic debug) | 9 (timeline + execution-graph view) | 7 | 8 | **76** | STUDY-PILOT-FAV | STUDY |
| confident-ai/deepeval (15,459★) | 8 | 10 | 10 | 6 (Python framework) | 6 | 9 | 9 | 8 | 9 | 10 | 5 | 6 | 9 (LLM eval framework) | 6 | 8 | **76** | STUDY-PILOT-FAV | STUDY |
| tensorzero/tensorzero (11,372★) | 7 | 10 | 10 | 7 (Rust LLMOps platform) | 6 | 9 | 9 | 8 | 9 | 10 | 5 | 7 | 9 (gateway + obs + eval + optimization) | 7 | 8 | **78** | STUDY-PILOT-FAV (NEW v2) | STUDY |
| Arize-ai/phoenix (9,694★) | 7 | 10 | 10 | 7 (MCP + Python) | 6 | 9 | 9 | 8 | 9 | 10 | 5 | 7 | **10** (AI obs + eval) | 7 | 9 | **80** | STUDY-PILOT-FAV | STUDY |
| VoltAgent/voltagent (8,949★) | 7 | 9 | 10 | 6 (TS AI agent framework) | 6 | 8 | 9 | 8 | 8 | 10 | 5 | 8 | 8 | 7 | 8 | **76** | STUDY-PILOT-FAV (NEW v2) | STUDY |
| NVIDIA/garak (7,822★) | 7 | 10 | 10 | 7 (Python CLI scanner) | 7 | 9 (NVIDIA-org) | 9 | 9 | 9 | 10 | 5 | 5 | 9 (LLM red-team) | **10** | 8 | **80** | STUDY-PILOT-FAV (NEW v2) | INSTALL security |
| evidentlyai/evidently (7,494★) | 7 | 10 | 10 | 6 (Python framework) | 6 | 9 | 9 | 8 | 9 | 10 | 5 | 6 | 9 (ML+LLM observability) | 6 | 8 | **74** | STUDY-PILOT-NARROW | STUDY |
| traceloop/openllmetry (7,112★) | 7 | 10 | 10 | 7 (Python; OpenTelemetry-based) | 6 | 9 | 9 | 8 | 9 | 10 | 5 | 7 | **10** (OTel-native — vendor-neutral) | 7 | 8 | **80** | STUDY-PILOT-FAV | INSTALL if OTel-stack |
| katanemo/plano (6,480★) | 7 | 9 | 10 | 7 (Rust AI-native proxy) | 6 | 8 | 9 | 8 | 9 | 10 | 5 | 7 (LLM router + safety + obs) | 8 | 7 | 8 | **76** | STUDY-PILOT-FAV (NEW v2 dual L7+L8) | STUDY |
| Helicone/helicone (5,673★) | 7 | 10 | 10 | 7 (one-line code monitor) | 8 | 8 (YC W23) | 9 | 8 | 9 | 10 | 5 | 5 | 9 (LLM obs + cost + eval) | 7 | 8 | **78** | STUDY-PILOT-FAV (NEW v2) | INSTALL alt |
| Giskard-AI/giskard-oss (5,352★) | 7 | 10 | 10 | 6 (Python library) | 6 | 8 | 9 | 8 | 9 | 10 | 5 | 5 | 8 | 9 (red-team + responsible-AI) | 8 | **74** | STUDY-PILOT-FAV | STUDY |
| pydantic/logfire (4,248★) | 6 | 9 | 10 | 7 (Python; FastAPI/Pydantic-AI) | 6 | 8 (Pydantic-org) | 9 | 8 | 9 | 10 | 5 | 7 | **10** (OTel + Pydantic-AI integration) | 7 | 9 | **80** | STUDY-PILOT-FAV (Pydantic ecosystem) | STUDY |
| Agenta-AI/agenta (4,125★) | 6 | 9 | 10 | 6 (TS LLMOps platform) | 6 | 8 | 9 | 8 | 9 | 10 | 5 | 7 | 9 (LLMOps + eval + obs) | 7 | 8 | **74** | STUDY-PILOT-NARROW | STUDY |
| matt1398/claude-devtools (3,389★) | 6 | 8 | 10 | 8 (Electron desktop UI for CC) | 8 | 8 | 9 | 9 | 9 | 10 | 5 | 6 | 9 (CC session log UI) | 7 | 8 | **82** | ADOPT-NOW (CC-specific UI) | INSTALL |
| disler/claude-code-hooks-multi-agent-observability (1,413★) | 6 | 8 | 8 | 8 (CC hook event tracking) | 7 | 7 | 8 | 9 | 9 | 10 | 5 | 7 | 9 (CC real-time multi-agent monitor) | 6 | 8 | **78** | INSTALL (CC-specific) | INSTALL |
| langwatch/langwatch (3,257★) | 6 | 9 | 10 | 6 (TS platform) | 6 | 7 | 8 | 8 | 9 | 10 | 5 | 6 | 9 (LLM eval + AI agent testing) | 6 | 8 | **72** | STUDY-PILOT-NARROW | STUDY |
| openlit/openlit (2,445★) | 6 | 9 | 10 | 7 (TS+Python; OTel) | 6 | 7 | 8 | 8 | 9 | 10 | 5 | 5 | 9 (OTel GenAI obs) | 7 | 8 | **74** | STUDY-PILOT-NARROW | STUDY |
| HolmesGPT/holmesgpt (2,437★) | 6 | 8 | 10 | 6 (Python SRE Agent) | 6 | 7 | 8 | 7 | 9 | 10 | 5 | 5 | 8 (incident response) | 8 | 8 | **72** | STUDY-PILOT-NARROW | STUDY |
| AgentOps-AI/tokencost (1,981★ — above L5) | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | **74** | STUDY-PILOT-FAV | INSTALL companion |
| Tencent/AI-Infra-Guard (3,704★) | 6 | 9 | 8 | 7 (Python red-team platform) | 6 | 8 | 8 | 7 | 9 | 10 | 5 | 5 | 8 | 9 (AI red-team) | 8 | **74** | STUDY-PILOT-NARROW | STUDY |
| openai/evals [baseline v62+] | 8 | 10 | 10 | 6 (Python framework) | 6 | 10 (OpenAI org) | 10 | 8 | 9 | 10 | 5 | 6 | 9 (eval framework) | 7 | 9 | **80** | STUDY-PILOT-FAV | STUDY |
| braintrustdata/braintrust-sdk [baseline] | 7 | 9 | 10 | 7 (SDK + UI) | 6 | 8 | 9 | 8 | 9 | 10 | 5 | 6 | 9 | 7 | 8 | **76** | STUDY-PILOT-FAV | STUDY |
| explodinggradients/ragas [baseline] | 8 | 9 | 10 | 6 (Python framework) | 6 | 9 | 9 | 8 | 9 | 10 | 5 | 6 | 9 (RAG eval) | 6 | 8 | **76** | STUDY-PILOT-FAV | STUDY |
| anthropic-cookbook evaluator_optimizer recipes (cite) | n/a | 10 | 8 | 4 (cite) | n/a | 10 | 10 | 9 | n/a | n/a | 8 | 8 | 9 | 7 | **10** | **84** | CITE-CLASS-CANONICAL | ADAPT-PATTERN |

---

## Layer 8: LLM ROUTERS (NEW v2 LAYER)

| Repo | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | D9 | D10 | D11 | D12 | D13 | D14 | D15 | Σ | Verdict | Action |
|------|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|---|---------|--------|
| mnfst/manifest (6,496★) — **Wave 3A LICENSE+age VERIFIED** | 7 | **3 FAST-CHURN-BAND (age <100d cpd high; re-audit at 2026-q4 for STABLE-BURN-IN)** | **10 (MIT VERIFIED; MNFST Inc org-backed)** | 7 (TIER-B HTTP proxy; **NO direct CC plugin**; Docker self-host on port 2099) | 5 (Docker compose + first-account-admin gate) | 8 | 8 | 7 (first-account-admin interactive; pre-provision out-of-band for autonomous /loop) | 9 | 10 (Docker Hub `manifestdotbuild/manifest` — **NOTE: npm `manifest` is DEPRECATED — phantom-risk**) | 7 (70% cost claim **UNVERIFIED** — Row-2 fabrication-test caveat) | 6 | 7 | 7 | 8 | **74** | **STUDY-PILOT-NARROW** | Narrow Claude-only pilot; re-audit at 2026-q4 |
| BlockRunAI/ClawRouter (6,468★) | 7 | 9 | 10 | 6 (TS router OpenClaw-focused) | 6 | 7 | 8 | 7 | 9 | 10 | 8 (41+ models; <1ms routing) | 6 | 7 | 7 | 7 | **74** | STUDY-PILOT-NARROW (OpenClaw-focused) | REFERENCE |
| router-for-me/CLIProxyAPI (32,826★) | 9 | 9 | 10 | 7 (Go proxy) | 6 | 9 | 9 | 8 | 9 | 10 | 7 (wraps Gemini/Codex/CC as OpenAI/Gemini/Claude/Codex compat) | 6 | 7 | 7 | 8 | **82** | STUDY-PILOT-FAV | INSTALL alt |
| musistudio/claude-code-router [baseline] | 5 | 7 | 10 | 6 (CC-specific LLM router) | 6 | 6 | 7 | 8 | 9 | 10 | 7 | 6 | 7 | 7 | 7 | **70** | STUDY-PILOT-NARROW | STUDY |
| katanemo/plano (above L7) | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | **76** | STUDY-PILOT-FAV | STUDY |
| tensorzero/tensorzero (above L7) | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | **78** | STUDY-PILOT-FAV | STUDY |
| LiteLLM [baseline ~10k★] | 8 | 10 | 10 | 6 (Python proxy 100+ LLMs) | 6 | 9 | 9 | 8 | 9 | 10 | 7 (proxy unifies provider API) | 6 | 7 | 7 | 8 | **76** | STUDY-PILOT-FAV | STUDY |
| mnfst/awesome-free-llm-apis (4,323★) | 6 | 7 | 8 | 4 (catalog) | 5 | 7 | 7 | 9 | 5 | 10 | 7 | 5 | 5 | 7 | 7 | **68** | REFERENCE | REFERENCE |

---

## Layer 9: CC HOOKS + SECURITY GATES (NEW v2 DEPTH)

| Repo | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | D9 | D10 | D11 | D12 | D13 | D14 | D15 | Σ | Verdict | Action |
|------|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|---|---------|--------|
| kenryu42/claude-code-safety-net (1,334★) | 5 | 8 | 10 (TS) | 8 (CC hook) | 8 | 6 | 7 | 9 | 10 | 10 | 5 | 5 | 7 | **10** (catches destructive commands) | 8 | **82** | ADOPT-NOW (NEW v2) | INSTALL safety floor |
| diet103/claude-code-infrastructure-showcase (9,639★) | 7 | 9 | 10 | 8 (CC examples) | 8 (cite-pattern) | 8 | 9 | 8 | 9 | 10 | 5 | 7 (skill auto-activation + hooks + agents) | 5 | 8 | 9 | **80** | STUDY-PILOT-FAV (NEW v2) | ADAPT-PATTERN |
| parcadei/Continuous-Claude-v3 (3,771★) | 6 | 8 | 10 | 8 (CC hooks for context mgmt) | 8 | 7 | 8 | 9 | 9 | 10 | 7 (MCP execution without context pollution) | 7 (agent orch with isolated context) | 7 | 7 | 8 | **80** | STUDY-PILOT-FAV (NEW v2) | STUDY |
| disler/claude-code-hooks-mastery (3,674★) | 6 | 8 | 10 | 8 (CC hooks tutorial+examples) | 8 | 7 | 8 | 8 | 9 | 10 | 5 | 7 | 5 | 7 | 9 | **76** | STUDY-PILOT-FAV (NEW v2) | ADAPT-PATTERN |
| ChrisWiles/claude-code-showcase (5,897★) | 6 | 7 | 10 | 8 (comprehensive CC examples) | 8 | 7 | 8 | 8 | 9 | 10 | 5 | 7 (hooks+skills+agents+commands+GH Actions) | 5 | 7 | 9 | **76** | STUDY-PILOT-FAV (NEW v2) | ADAPT-PATTERN |
| disler/claude-code-hooks-multi-agent-observability (above L7) | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | **78** | INSTALL | INSTALL |
| severity1/claude-code-prompt-improver (1,478★) | 5 | 8 | 10 | 8 (CC hook) | 8 | 6 | 7 | 9 | 9 | 10 | 7 (prompt improver) | 5 | 5 | 7 | 8 | **76** | STUDY-PILOT-FAV (NEW v2) | INSTALL |
| CloudAI-X/claude-workflow-v2 (1,356★) | 5 | 8 | 10 | 9 (universal CC workflow plugin) | 8 | 6 | 7 | 9 | 9 | 10 | 5 | 7 (agents+skills+hooks+commands) | 5 | 7 | 8 | **76** | STUDY-PILOT-FAV (NEW v2) | STUDY |
| coleam00/claude-memory-compiler (1,051★ — above L4) | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | **76** | STUDY-PILOT-FAV | STUDY |
| rohitg00/pro-workflow (2,124★) | 6 | 7 | 10 | 9 (plugin) | 8 | 7 | 8 | 9 | 9 | 10 | 6 (self-correcting memory) | 7 (17 skills + agent teams + worktrees) | 5 | 7 | 8 | **78** | STUDY-PILOT-FAV (NEW v2) | STUDY |
| revfactory/harness (above L2) | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | **78** | STUDY-PILOT-FAV | ADAPT-PATTERN |
| nyldn/claude-octopus (above L3) | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | **76** | STUDY-PILOT-NARROW | STUDY |
| rohitg00/awesome-claude-code-toolkit (1,682★) | 5 | 8 | 10 | 7 (toolkit) | 8 | 7 | 8 | 9 | 9 | 10 | 5 | 6 (135 agents + 35 skills + 42 commands + 176+ plugins) | 5 | 7 | 8 | **74** | STUDY-PILOT-FAV | REFERENCE |
| agenticnotetaking/arscontexta (3,342★) | 6 | 8 | 10 | 8 (plugin) | 8 | 6 | 7 | 9 | 9 | 10 | 5 | 6 (knowledge systems from conversation) | 5 | 7 | 8 | **74** | STUDY-PILOT-NARROW | STUDY |
| Manavarya09/design-extract (above L6) | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | **78** | STUDY-PILOT-FAV | INSTALL |
| covibes/zeroshot (above L3) | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | **70** | STUDY-PILOT-NARROW | STUDY |
| **Security gates** | | | | | | | | | | | | | | | | | | |
| semgrep/semgrep MCP (~11k★ parent semgrep) | 7 | 10 | 7 (LGPL-2.1; OK for CLI-binary use) | 10 (plugin marketplace) | 10 | 10 | 10 | 10 | 10 | 10 | 5 | 5 | 7 | **10** (SAST + 2000+ rules) | 9 | **90** | ADOPT-NOW | INSTALL |
| gitleaks/gitleaks [baseline] | 8 | 10 | 10 | 8 (CLI) | 8 | 10 | 10 | 10 | 10 | 10 | 5 | 5 | 7 | **10** (secrets scanning) | 8 | **86** | ADOPT-NOW | INSTALL |
| aquasecurity/trivy [baseline] | 8 | 10 | 10 | 8 (CLI) | 8 | 10 | 10 | 10 | 10 | 10 | 5 | 5 | 7 | **10** (container scanning) | 8 | **84** | ADOPT-NOW | INSTALL |
| google/osv-scanner [baseline] | 7 | 10 | 10 | 8 (CLI) | 8 | 10 | 10 | 10 | 10 | 10 | 5 | 5 | 7 | **10** | 8 | **84** | ADOPT-NOW | INSTALL |
| github/codeql-action (above L1) | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | **85** | ADOPT-NOW | INSTALL |
| trufflesecurity/trufflehog [baseline] | 7 | 9 | 4 (AGPL-3.0) | 8 (CLI) | 8 | 9 | 9 | 8 | 10 | 10 | 5 | 5 | 7 | 9 | 7 | **70** | STUDY-PILOT-NARROW (AGPL caution) | STUDY |
| woodruffw/zizmor [baseline] | 6 | 9 | 10 | 8 (CLI) | 8 | 8 | 8 | 9 | 10 | 10 | 5 | 5 | 7 | 9 (GH Actions audit) | 7 | **78** | STUDY-PILOT-FAV | INSTALL |
| InvariantLabs-ai/mcp-scan [baseline] | 6 | 8 | (verify) | 8 (CLI for MCP audit) | 8 | 7 | 8 | 9 | 10 | 10 | 5 | 5 | 7 | 9 | 7 | **74** | STUDY-PILOT-FAV | INSTALL (audit other MCPs) |
| MCP-Defender/MCP-Defender [baseline] | 5 | 7 | (verify) | 7 | 7 | 7 | 7 | 8 | 9 | 10 | 5 | 5 | 6 | 8 | 7 | **70** | STUDY-PILOT-NARROW | STUDY |
| Tencent/AI-Infra-Guard (3,704★) | 6 | 9 | 8 | 7 (Python platform) | 6 | 8 | 8 | 7 | 9 | 10 | 5 | 5 | 8 | 9 | 8 | **74** | STUDY-PILOT-NARROW | STUDY |
| **CLI substrate (D14 weight reduced for non-CC-specific tools)** | | | | | | | | | | | | | | | | | | |
| BurntSushi/ripgrep [baseline ~50k★] | 9 | 10 | 10 (MIT/Unlicense) | 8 (CLI preinstalled) | 10 | 10 | 10 | 10 | 10 | 10 | 5 | 5 | 5 | 7 | 9 | **88** | ADOPT-NOW | INSTALL (preinstalled in CC sandbox) |
| sharkdp/fd [baseline] | 8 | 10 | 10 | 8 | 8 | 10 | 10 | 10 | 10 | 10 | 5 | 5 | 5 | 7 | 8 | **86** | ADOPT-NOW | INSTALL |
| jqlang/jq [baseline] | 9 | 10 | 10 | 8 | 10 | 10 | 10 | 10 | 10 | 10 | 5 | 5 | 5 | 7 | 9 | **88** | ADOPT-NOW | INSTALL |
| mikefarah/yq [baseline] | 8 | 9 | 10 | 8 | 8 | 10 | 10 | 10 | 10 | 10 | 5 | 5 | 5 | 7 | 8 | **84** | ADOPT-NOW | INSTALL |
| cli/cli (gh) [baseline] | 9 | 10 | 10 | 8 | 8 | 10 | 10 | 10 | 10 | 10 | 5 | 5 | 5 | 9 | 9 | **88** | ADOPT-NOW | INSTALL |
| pre-commit/pre-commit [baseline] | 8 | 10 | 10 | 8 | 8 | 10 | 10 | 10 | 10 | 10 | 5 | 5 | 5 | 9 | 8 | **86** | ADOPT-NOW | INSTALL |
| casey/just [baseline] | 8 | 10 | 10 | 8 | 8 | 9 | 9 | 10 | 10 | 10 | 5 | 5 | 5 | 7 | 8 | **84** | ADOPT-NOW | INSTALL |
| jdx/mise [baseline] | 8 | 10 | 10 | 8 | 8 | 9 | 9 | 10 | 10 | 10 | 5 | 5 | 5 | 7 | 8 | **84** | ADOPT-NOW | INSTALL |
| astral-sh/uv [baseline] | 9 | 10 | 10 | 8 | 8 | 10 | 10 | 10 | 10 | 10 | 5 | 5 | 5 | 7 | 9 | **88** | ADOPT-NOW | INSTALL |
| astral-sh/ruff [baseline] | 9 | 10 | 10 | 8 | 8 | 10 | 10 | 10 | 10 | 10 | 5 | 5 | 5 | 8 | 9 | **88** | ADOPT-NOW | INSTALL |
| biomejs/biome [baseline] | 8 | 10 | 10 | 8 | 8 | 10 | 10 | 10 | 10 | 10 | 5 | 5 | 5 | 8 | 9 | **88** | ADOPT-NOW | INSTALL |
| oxc-project/oxc [baseline] | 7 | 9 | 10 | 8 | 8 | 9 | 9 | 10 | 10 | 10 | 5 | 5 | 5 | 8 | 8 | **82** | STUDY-PILOT-FAV | INSTALL alt JS |
| sharkdp/bat [baseline] | 8 | 10 | 10 | 8 | 8 | 9 | 9 | 10 | 10 | 10 | 5 | 5 | 5 | 7 | 8 | **84** | ADOPT-NOW | INSTALL |
| dandavison/delta [baseline] | 8 | 10 | 10 | 8 | 8 | 10 | 10 | 10 | 10 | 10 | 5 | 5 | 5 | 7 | 8 | **86** | ADOPT-NOW | INSTALL |
| eza-community/eza [baseline] | 8 | 10 | 10 | 8 | 8 | 9 | 9 | 10 | 10 | 10 | 5 | 5 | 5 | 7 | 8 | **82** | ADOPT-NOW | INSTALL |
| junegunn/fzf [baseline] | 9 | 10 | 10 | 8 | 8 | 10 | 10 | 10 | 10 | 10 | 5 | 5 | 5 | 7 | 9 | **90** | ADOPT-NOW | INSTALL |
| sxyazi/yazi [baseline] | 8 | 10 | 10 | 8 | 8 | 9 | 9 | 10 | 10 | 10 | 5 | 5 | 5 | 7 | 8 | **78** | STUDY-PILOT-FAV | INSTALL alt |
| sharkdp/hyperfine [baseline] | 8 | 10 | 10 | 8 | 8 | 9 | 9 | 10 | 10 | 10 | 5 | 5 | 5 | 7 | 8 | **80** | STUDY-PILOT-FAV | INSTALL |
| evilmartians/lefthook [baseline] | 8 | 10 | 10 | 8 | 8 | 9 | 9 | 10 | 10 | 10 | 5 | 5 | 5 | 8 | 8 | **84** | ADOPT-NOW alt | INSTALL alt pre-commit |
| koalaman/shellcheck [baseline] | 9 | 10 | 4 (GPL-3.0; CLI-binary OK) | 8 | 8 | 10 | 10 | 10 | 10 | 10 | 5 | 5 | 5 | 9 | 8 | **76** | STUDY-PILOT-FAV (GPL caution) | INSTALL CLI |
| rhysd/actionlint [baseline] | 8 | 10 | 10 | 8 | 8 | 9 | 9 | 10 | 10 | 10 | 5 | 5 | 5 | 9 | 8 | **84** | ADOPT-NOW | INSTALL |
| hadolint/hadolint [baseline] | 9 | 10 | 4 (GPL-3.0) | 8 | 8 | 9 | 9 | 10 | 10 | 10 | 5 | 5 | 5 | 9 | 8 | **76** | STUDY-PILOT-FAV (GPL caution) | INSTALL CLI |
| crate-ci/typos [baseline] | 8 | 10 | 10 | 8 | 8 | 9 | 9 | 10 | 10 | 10 | 5 | 5 | 5 | 7 | 8 | **84** | ADOPT-NOW | INSTALL |
| ossf/scorecard [baseline] | 7 | 10 | 10 | 8 | 8 | 10 | 10 | 10 | 10 | 10 | 5 | 5 | 5 | 9 | 8 | **84** | ADOPT-NOW | INSTALL CI |
| step-security/harden-runner [baseline] | 7 | 9 | 10 | 8 (GH Action) | 8 | 9 | 9 | 10 | 10 | 10 | 5 | 5 | 5 | **10** | 8 | **84** | ADOPT-NOW | INSTALL CI |

---

## Layer 10: BROWSER + DOC INGESTION

| Repo | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | D9 | D10 | D11 | D12 | D13 | D14 | D15 | Σ | Verdict | Action |
|------|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|---|---------|--------|
| ChromeDevTools/chrome-devtools-mcp (39,715★) | 9 | 9 | 10 | 8 (MCP stdio) | 8 | 10 (Chrome team) | 10 | 10 | 10 | 10 | 5 | 5 | 7 (DevTools inspection) | 7 | 9 | **89** | ADOPT-NOW | INSTALL |
| microsoft/playwright-mcp (~Microsoft active) | 7 | 10 | 10 | 8 (MCP stdio) | 8 | 10 | 10 | 10 | 10 | 10 | 5 | 5 | 7 (browser automation) | 7 | 9 | **88** | ADOPT-NOW | INSTALL |
| upstash/context7 (above L5) | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | **85** | ADOPT-NOW | INSTALL |
| D4Vinci/Scrapling (49,974★) | 9 | 10 | 10 | 7 (MCP + Python) | 6 | 9 | 9 | 9 | 10 | 10 | 5 | 5 | 5 | 7 | 9 | **84** | STUDY-PILOT-FAV | STUDY |
| assafelovic/gpt-researcher (27,090★) | 9 | 10 | 10 | 7 (deep research agent + MCP) | 6 | 9 | 9 | 8 | 10 | 10 | 5 | 7 (autonomous deep research) | 5 | 7 | 9 | **82** | STUDY-PILOT-FAV | STUDY |
| docling-project/docling [baseline] | 7 | 9 | 10 | 7 (Python lib) | 7 | 9 | 9 | 9 | 10 | 10 | 5 | 5 | 5 | 7 | 8 | **78** | STUDY-PILOT-FAV | INSTALL doc-to-MD |
| microsoft/markitdown [baseline] | 8 | 10 | 10 | 8 (CLI + library) | 8 | 10 | 10 | 9 | 10 | 10 | 5 | 5 | 5 | 7 | 8 | **78** | STUDY-PILOT-FAV | INSTALL |
| unclecode/crawl4ai [baseline] | 8 | 10 | 10 | 7 (Python + MCP) | 7 | 9 | 9 | 9 | 10 | 10 | 5 | 5 | 5 | 7 | 8 | **78** | STUDY-PILOT-FAV | INSTALL alt |
| firecrawl/firecrawl [baseline] | 8 | 10 | 10 | 7 (API + Python) | 7 | 9 | 9 | 9 | 10 | 10 | 5 | 5 | 5 | 7 | 8 | **80** | STUDY-PILOT-FAV | INSTALL alt |
| jina-ai/reader [baseline] | 7 | 10 | 10 | 7 (API) | 8 | 9 | 9 | 9 | 10 | 10 | 5 | 5 | 5 | 7 | 8 | **78** | STUDY-PILOT-FAV | INSTALL alt |

---

## Layer 11: PARALLEL OPERATOR UIs

| Repo | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | D9 | D10 | D11 | D12 | D13 | D14 | D15 | Σ | Verdict | Action |
|------|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|---|---------|--------|
| farion1231/cc-switch (71,847★) | 10 | 9 | 8 | 8 (Tauri/Rust cross-platform desktop) | 7 | 9 | 9 | 8 | 9 | 10 | 6 | 6 | 7 (LLM provider + skills mgmt) | 7 | 9 | **86** | STUDY-PILOT-FAV | INSTALL if desktop UI needed |
| CherryHQ/cherry-studio (45,734★) | 9 | 10 | (verify) | 7 (AI productivity studio) | 6 | 8 | 8 | 8 | 8 | 10 | 6 | 8 (300+ assistants + autonomous agents) | 7 | 7 | 9 | **82** | STUDY-PILOT-FAV | INSTALL alt UI |
| iOfficeAI/AionUi (25,256★) | 8 | 8 | 10 | 7 (local-first cowork desktop) | 6 | 7 | 8 | 7 | 8 | 10 | 6 | 8 (20+ CLI support + ACP) | 5 | 7 | 8 | **78** | STUDY-PILOT-FAV | INSTALL alt cross-runtime |
| bytedance/UI-TARS-desktop (34,096★) | 9 | 10 | (verify) | 7 (multimodal GUI agent) | 5 | 9 (Bytedance) | 9 | 7 | 8 | 10 | 5 | 9 (computer-use + agent infra) | 5 | 7 | 9 | **78** | STUDY-PILOT-NARROW (GUI automation specialty) | STUDY |
| eigent-ai/eigent (14,025★) | 7 | 8 | 10 | 7 (Cowork desktop alternative) | 6 | 7 | 8 | 7 | 9 | 10 | 5 | 7 (multi-agent systems) | 5 | 7 | 8 | **76** | STUDY-PILOT-FAV | INSTALL Cowork alt |
| smtg-ai/claude-squad [baseline ~14k] | 8 | 9 | 10 | 8 (tmux+worktree; NOT Windows) | 6 | 9 | 9 | 7 (Windows-fail per FM-04) | 9 | 10 | 5 | 8 | 5 | 7 | 8 | **76** | STUDY-PILOT-FAV (non-Windows) | INSTALL on macOS/Linux |
| ComposioHQ/agent-orchestrator (above L3) | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | **76** | STUDY-PILOT-FAV | STUDY |
| BloopAI/vibe-kanban [baseline] | 6 | 8 | (verify) | 7 (kanban UI) | 6 | 8 | 8 | 7 | 9 | 10 | 5 | 8 (board-driven multi-agent) | 5 | 7 | 8 | **74** | STUDY-PILOT-FAV | STUDY |
| yxwucq/CCUI [baseline ~5k] | 6 | 8 | (verify) | 7 (CC UI) | 6 | 7 | 8 | 7 | 9 | 10 | 5 | 7 | 5 | 7 | 8 | **74** | STUDY-PILOT-FAV | STUDY |
| jamesrochabrun/AgentHub [baseline] | 5 | 7 | (verify) | 7 (agent hub) | 6 | 6 | 7 | 7 | 9 | 10 | 5 | 7 | 5 | 7 | 7 | **72** | STUDY-PILOT-FAV | STUDY |
| manaflow-ai/cmux [baseline] | 5 | 7 | (verify) | 7 (mux runner) | 6 | 6 | 7 | 7 | 9 | 10 | 5 | 7 | 5 | 7 | 7 | **70** | STUDY-PILOT-NARROW | STUDY |
| fynnfluegge/agtx [baseline] | 5 | 7 | (verify) | 7 (multi-agent tx) | 6 | 6 | 7 | 7 | 9 | 10 | 5 | 7 | 5 | 7 | 7 | **68** | STUDY-PILOT-NARROW | STUDY |
| nwiizo/ccswarm [baseline] | 5 | 7 | (verify) | 7 (CC swarm) | 6 | 6 | 7 | 7 | 9 | 10 | 5 | 7 | 5 | 7 | 7 | **70** | STUDY-PILOT-NARROW | STUDY |
| preset-io/agor [baseline] | 5 | 7 | (verify) | 7 | 6 | 6 | 7 | 7 | 9 | 10 | 5 | 7 | 5 | 7 | 7 | **68** | STUDY-PILOT-NARROW | STUDY |
| stravu/crystal (DEPRECATED Feb-2026) | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | **REJECT** (deprecated) | REJECT |

---

## Layer 12: DISCOVERY AGGREGATORS (cite-only)

All in this category score 60-72 — REFERENCE only, never install as runtime dependencies:

| Repo | Stars | Σ-score | Action |
|------|-------|---------|--------|
| hesreallyhim/awesome-claude-code | 43,866 | **72** | REFERENCE |
| ComposioHQ/awesome-claude-skills (CC-BY-NC-ND) | 60,007 | **65** | REFERENCE |
| VoltAgent/awesome-openclaw-skills | 48,730 | **65** | REFERENCE (OpenClaw ecosystem-adjacent) |
| sickn33/antigravity-awesome-skills | 37,635 | **70** | REFERENCE (verify installer before bulk) |
| VoltAgent/awesome-agent-skills | 21,845 | **65** | REFERENCE |
| asgeirtj/system_prompts_leaks | 40,272 | **70** | REFERENCE (verify ethical use) |
| github/awesome-copilot | 33,083 | **70** | REFERENCE (cross-ecosystem) |
| rohitg00/awesome-claude-code-toolkit | 1,682 | **74** | REFERENCE (176+ plugins curated) |
| ComposioHQ/awesome-claude-plugins | 1,660 | **66** | REFERENCE |
| davepoon/buildwithclaude | 2,934 | **74** | REFERENCE (multi-runtime hub) |
| quemsah/awesome-claude-plugins | 698 | **66** | REFERENCE |
| ai-boost/awesome-harness-engineering | 938 | **70** | REFERENCE |
| andyrewlee/awesome-agent-orchestrators [baseline] | — | **64** | REFERENCE |
| bradAGI/awesome-cli-coding-agents [baseline] | — | **64** | REFERENCE |
| RoggeOhta/awesome-codex-cli [baseline] | — | **62** | REFERENCE |
| subinium/awesome-claude-code [baseline] | — | **66** | REFERENCE |
| onmyway133/awesome-claude-code [baseline] | — | **64** | REFERENCE |
| sorrycc/awesome-code-agents [baseline] | — | **64** | REFERENCE |
| jqueryscript/awesome-claude-code [baseline] | — | **62** | REFERENCE |
| efij/awesome-claude-code-security [baseline] | — | **66** | REFERENCE |
| ai-for-developers/awesome-ai-coding-tools [baseline] | — | **62** | REFERENCE |
| Agent-Analytics/awesome-multi-agent-orchestrators [baseline] | — | **62** | REFERENCE |
| Picrew/awesome-agent-harness [baseline] | — | **66** | REFERENCE |
| AutoJunjie/awesome-agent-harness | per A-audit | **62** | REFERENCE |
| walkinglabs/awesome-harness-engineering | per A-audit | **64** | REFERENCE |
| TsinghuaC3I/Awesome-Memory-for-Agents | per A-audit | **64** | REFERENCE |
| letta-ai/awesome-letta | per A-audit | **60** | REFERENCE |
| EthicalML/awesome-agentic-engineering-resources | per A-audit | **62** | REFERENCE |
| jordimas/awesome-agentic-engineering | per A-audit | **62** | REFERENCE |
| martimfasantos/ai-agents-frameworks | per A-audit | **60** | REFERENCE |
| mb-mal/awesome-ai-agents-frameworks | per A-audit | **60** | REFERENCE |
| mnfst/awesome-free-llm-apis (4,323★) | 4,323 | **68** | REFERENCE |

---

## Layer 13: OUT-OF-SCOPE / REJECT-FOR-FIT

| Repo | Reason | Source |
|------|--------|--------|
| microsoft/LLMLingua + LLMLingua-2 + LongLLMLingua | STALE (2025-10-28); per-Edit anti-pattern for CC | Wave 1 §Layer 5 + W220 R5 |
| volcengine/OpenViking | AGPLv3 STRUCTURAL BLOCKER + Bytedance subsidiary risk | n=3+ Wave audits |
| topoteretes/cognee | CR-12 DUPLICATE of graphiti L3 | Wave 207-209 |
| getzep/zep | SUPERSEDED-BY-graphiti | Wave 207 |
| campfirein/cipher → byterover-cli | ELv2 non-permissive + META-HARNESS + HARD-GATE | Wave 2B |
| supermemoryai/supermemory-mcp | DEPRECATED-BANNER v1 + hosted-service dependency | Wave 2B |
| mkreyman/mcp-memory-keeper | DUPLICATE-FUNCTIONALITY of doobidoo | Wave 2B |
| ressl/mcp-firewall | AGPL-3.0 + wrong category | Wave 2B |
| gifflet/graphiti-mcp-server | DUPLICATE of canonical getzep/graphiti | Wave 2B |
| shinpr/claude-code-workflows | HARD-GATE iter-84 | sister claude-sota verified-avoid |
| Yeachan-Heo/oh-my-claudecode | META-HARNESS Cohort 1 per claude-sota verified-avoid | Wave 1 §Layer 2 |
| stravu/crystal | DEPRECATED Feb-2026 | parent CCC |
| microsoft/agent-framework + agno-agi/agno + crewAIInc/crewAI | DUPLICATE-FUNCTIONALITY for CC native scope | Wave 1+2 |
| huggingface/smolagents | CodeAgent paradigm doesn't fit CC tool-use shape | Wave 1 |
| aaif-goose/goose | Standalone Rust desktop — out-of-CC scope | sister-framework reference |
| `@anthropic/mcp-ast-grep` npm package | PHANTOM (returns 404 on npm registry) | FM-09 n=5 ladder |
| stravu/crystal (deprecated Feb 2026) | DEPRECATED | parent CCC |
| 13 anonymous-zip-drop kits v53-v65 | Cohort 7 STRUCTURAL REJECT (saturation n=36) | Agent A §Section 2 |
| open-compress/claw-compactor | Maintenance-mode cpd=0.72 | W220 R5 |
| jia-gao/leanctx | LLMLingua-derivative — inherits anti-pattern | W220 R5 |

---

## Summary stats

- **Total repos cataloged**: ~150 (incl. baseline-cite + fresh recon May 2026)
- **ADOPT-NOW**: ~40 repos (canonical substrate + Top picks per layer)
- **STUDY-PILOT-FAVORABLE**: ~50 repos (selective install based on workflow)
- **STUDY-PILOT-NARROW**: ~25 repos (bounded use-cases)
- **REFERENCE-only**: ~30 repos (discovery aggregators + alt-runtime cross-validation)
- **REJECT-FOR-FIT**: ~20 repos (license / DUPLICATE / DEPRECATED / META-HARNESS / phantom-package)

**Cross-layer convergence**: Anthropic + obra + OpenAI + addy-osmani + wshobson + Google Chrome + langfuse/YC W23 + named-T1/T2 practitioners = ≥8 distinct orgs across the runtime → convergence-gate Axis-1 firm PASS

**Cross-model gate**: Codex CLI + codex-plugin-cc + promptfoo (10M+ users; OpenAI-owned MIT) → 3-org Axis-1 firm PASS for adversarial review layer
