# Wave 220 Agent B - Orchestration + Plugins SOTA Scoring

Date: 2026-05-15 [VERIFIED]
Scope: AGENT ORCHESTRATION + PLUGINS ECOSYSTEM only for planned pure runtime `Z:\claude-sota-pure` [VERIFIED]
Bridge-mode status: three requested Codex consult prompt files were written; all three consult executions failed before model review with app-server `Access is denied` and produced HONEST-NON-FINDING outputs [VERIFIED].

## 1. Executive Summary

Top-5 ADOPT-NOW for `Z:\claude-sota-pure`:

1. `wshobson/agents` as `claude-code-workflows` marketplace [VERIFIED]: required deep dive; local clone at HEAD `ece811f23310a37ceb43496dbac0e244fe6845b6`; README reports 80 focused plugins, 185 agents, 153 skills, 16 workflow orchestrators, and 100 commands; local filesystem count confirms 80 plugin dirs / 185 agent markdown files / 153 `SKILL.md` / 100 command markdown files. Verdict: ADOPT-NOW core orchestration marketplace [INFERRED].
2. `anthropics/claude-plugins-official` [VERIFIED]: first-party plugin marketplace already provides agent-sdk-dev, ralph-loop, frontend-design, code-review, feature-dev, skill-creator, plugin-dev, hookify, cwc-makers, code-modernization, and related official scaffolding. Verdict: ADOPT-NOW first, then third-party marketplaces [INFERRED].
3. `openai/codex-plugin-cc` [VERIFIED]: installed as `codex@openai-codex` v1.0.4; provides `/codex:*` review/rescue/status command surface and Codex rescue agent path in current runtime. Verdict: ADOPT-NOW cross-model review + rescue layer [INFERRED].
4. `addyosmani/agent-skills` [VERIFIED]: local plugin marketplace and cache exist; installed bundle exposes 22 named engineering-phase skills plus 4 agents and multi-runtime command surfaces. Verdict: ADOPT-NOW skill layer, especially planning/review/security/test/source-driven workflows [INFERRED].
5. `gsd-build/get-shit-done` [VERIFIED]: local clone HEAD `3aaed8f5d7c3492678b867e6687d42c88fe227e5`; web source reports ~60.7k stars and active releases. Verdict: ADOPT-NOW as workflow harness, but install after official/wshobson to avoid planning-system collision [INFERRED].

Key non-adoption / defer calls:

- AutoGen is DEFER for new pure runtime [VERIFIED via GitHub README web snippet]: Microsoft repository says AutoGen is in maintenance mode and new users should start with Microsoft Agent Framework. Keep cite-class only unless MAF is separately probed [INFERRED].
- Raw general-purpose frameworks (`deepagents`, `LangGraph`, `CrewAI`, `smolagents`, `openai-agents-python`, `agno`) are provider-complement libraries, not Claude Code-native plugin/skill installs [VERIFIED/INFERRED]. Install only when a pure runtime needs embedded Python/TS agent apps, not as the CC plugin substrate [INFERRED].
- `awesome-*` catalogs are discovery/cite-class unless they ship marketplace JSON or installable skills/plugins with clear license [INFERRED].

## 2. C1 - Claude Code-Native Plugin Marketplaces

| repo | stars | license | age_d | cpd | axis_3_band | axis_1_orgs | native_cc_path | cr12_disposition | probe_pass | probe_fail | verdict | conf |
|---|---:|---|---:|---:|---|---|---|---|---|---|---|---:|
| `anthropics/claude-plugins-official` | [UNKNOWN] | [UNKNOWN] | [UNKNOWN] | [UNKNOWN] | ACTIVE-ITERATION [INFERRED] | Anthropic [VERIFIED] | Marketplace+Plugin+Skill+Agent+Hook+Command [VERIFIED] | GENUINELY-NEW | official org; 20 local marketplace entries; many installed plugins [VERIFIED] | local marketplace parse anomaly: copied financial-services name in one row [VERIFIED] | ADOPT-NOW | 0.92 |
| `openai/codex-plugin-cc` | ~18.4k [VERIFIED via Gitstar web] | [UNKNOWN] | [UNKNOWN] | [UNKNOWN] | ACTIVE-ITERATION [INFERRED] | OpenAI [VERIFIED] | Marketplace+Plugin+Command+Agent+Hook [VERIFIED] | PROVIDER-COMPLEMENT | installed v1.0.4 project+user; T1-T7 manifest row [VERIFIED] | Codex app-server failed this run [VERIFIED] | ADOPT-NOW | 0.90 |
| `affaan-m/everything-claude-code` | [UNKNOWN] | [UNKNOWN] | [UNKNOWN] | cpd30=4.10 local [VERIFIED] | FAST-CHURN [INFERRED] | community [VERIFIED] | Plugin+Skills+Agents+Hooks [VERIFIED] | PARTIAL-OVERLAP | installed v2.0.0-rc.1; cache contains 176 agent md and many skills [VERIFIED] | release candidate; broad duplicate surface [INFERRED] | ADOPT-SUBSET | 0.82 |
| `wshobson/agents` | [UNKNOWN] | MIT [VERIFIED] | [UNKNOWN] | cpd30=1.63 local [VERIFIED] | ACTIVE-ITERATION [INFERRED] | community [VERIFIED] | Marketplace+Plugin+Agent+Skill+Command+Hook [VERIFIED] | GENUINELY-NEW | 80 plugins/185 agents/153 skills/100 commands [VERIFIED] | README vs marketplace count drift 80/185/153 vs 79/184/150 [VERIFIED] | ADOPT-NOW | 0.94 |
| `mksglu/context-mode` | [UNKNOWN] | [UNKNOWN] | [UNKNOWN] | [UNKNOWN] | ACTIVE-ITERATION [INFERRED] | community [VERIFIED] | Marketplace+Plugin [VERIFIED] | PARTIAL-OVERLAP | installed context-mode v1.0.133 [VERIFIED] | overlaps memory/context agent work [INFERRED] | ADOPT-LATER | 0.72 |
| `fcakyon/claude-codex-settings` | [UNKNOWN] | [UNKNOWN] | [UNKNOWN] | [UNKNOWN] | ACTIVE-ITERATION [INFERRED] | community [VERIFIED] | Marketplace+Plugin [VERIFIED] | PARTIAL-OVERLAP | installed intelligent-compact [VERIFIED] | compact override history makes high risk [INFERRED] | DEFER | 0.70 |

Local marketplace discovery snapshot:

| marketplace | plugins | status |
|---|---:|---|
| addy-agent-skills | 1 | registered/cache [VERIFIED] |
| anthropic-agent-skills | 3 | registered/cache [VERIFIED] |
| antigravity-awesome-skills | 37 | registered/cache [VERIFIED] |
| claude-code-skills | 43 | registered/cache [VERIFIED] |
| claude-code-workflows | 82 | registered/cache; maps to `wshobson/agents` [VERIFIED] |
| claude-community | 1920 | registered/cache [VERIFIED] |
| claude-for-financial-services | 20 | registered/cache [VERIFIED] |
| claude-plugins-official | 20 observed by parser in current local copy [VERIFIED] |
| claude-settings | 29 | registered/cache [VERIFIED] |
| context-mode | 1 | registered/cache [VERIFIED] |
| everything-claude-code | 1 | registered/cache [VERIFIED] |
| healthcare | 7 | registered/cache [VERIFIED] |
| knowledge-work-plugins | 47 | registered/cache [VERIFIED] |
| life-sciences | 21 | registered/cache [VERIFIED] |
| openai-codex | 1 | registered/cache [VERIFIED] |
| thedotmack | 1 | registered/cache [VERIFIED] |

## 3. C2 - Skill Catalogs

| repo | stars | license | age_d | cpd | axis_3_band | axis_1_orgs | native_cc_path | cr12_disposition | probe_pass | probe_fail | verdict | conf |
|---|---:|---|---:|---:|---|---|---|---|---|---|---|---:|
| `addyosmani/agent-skills` | ~31k [VERIFIED via web] | MIT [VERIFIED locally by LICENSE file presence] | [UNKNOWN] | cache installed [VERIFIED] | ACTIVE-ITERATION [INFERRED] | Google Chrome DevRel/Addy Osmani [INFERRED] | Marketplace+Skill+Agent+Command+Hook+Multi-runtime [VERIFIED] | GENUINELY-NEW | 22 local skills listed [VERIFIED] | single marketplace plugin, broad skill bundle [INFERRED] | ADOPT-NOW | 0.91 |
| `alirezarezvani/claude-skills` | [UNKNOWN] | [UNKNOWN] | [UNKNOWN] | cpd30=1.03 local [VERIFIED] | ACTIVE-ITERATION [INFERRED] | community [VERIFIED] | Marketplace+Skill bundles [VERIFIED] | ECOSYSTEM-IMPORT | installed engineering + advanced skill bundles [VERIFIED] | quality varies; huge catalog needs selective install [INFERRED] | ADOPT-SUBSET | 0.84 |
| `sickn33/antigravity-awesome-skills` | ~37.4k [VERIFIED via Star History web] | MIT [VERIFIED via web] | [UNKNOWN] | cpd30=0.03 local [VERIFIED] | STABLE-BURN-IN [INFERRED] | community [VERIFIED] | Marketplace+Skill bundle+Multi-runtime [VERIFIED] | ECOSYSTEM-IMPORT | installed essentials bundle v11.2.0 [VERIFIED] | 1400+ catalog is too broad for default pure runtime [INFERRED] | ADOPT-SUBSET | 0.82 |
| `ComposioHQ/awesome-claude-skills` | ~56.9k [INFERRED from user directive; local API unavailable] | [UNKNOWN] | [UNKNOWN] | cpd30=0.60 local [VERIFIED] | STABLE-BURN-IN [INFERRED] | Composio [VERIFIED] | Catalog [VERIFIED] | CITE-CLASS-CANONICAL | local clone exists HEAD `f2b5e29bc315...` [VERIFIED] | catalog not runtime install by itself [INFERRED] | CITE-ONLY | 0.78 |
| `hesreallyhim/awesome-claude-code` | 226 resources [VERIFIED from user directive/local prior art] | CC-BY-NC-ND-4.0 [VERIFIED from user directive; local license not reprobed] | [UNKNOWN] | cpd30=3.20 local [VERIFIED] | ACTIVE-ITERATION [INFERRED] | community [VERIFIED] | Catalog [VERIFIED] | CITE-CLASS-CANONICAL | local clone exists HEAD `614f102accbc...` [VERIFIED] | non-commercial/no-derivatives license constrains import [INFERRED] | CITE-ONLY | 0.86 |

`everything-claude-code` skill exposure note: installed cache exposes many `SKILL.md` directories including `deep-research`, `research-ops`, `autonomous-agent-harness`, `agentic-engineering`, `agent-harness-construction`, `browser-qa`, `codebase-onboarding`, and `configure-ecc` in the sampled first 80 skill directories [VERIFIED]. Use it as selective skill substrate, not a blanket import [INFERRED].

`addy-agent-skills` exposed skills [VERIFIED]: `api-and-interface-design`, `browser-testing-with-devtools`, `ci-cd-and-automation`, `code-review-and-quality`, `code-simplification`, `context-engineering`, `debugging-and-error-recovery`, `deprecation-and-migration`, `documentation-and-adrs`, `doubt-driven-development`, `frontend-ui-engineering`, `git-workflow-and-versioning`, `idea-refine`, `incremental-implementation`, `performance-optimization`, `planning-and-task-breakdown`, `security-and-hardening`, `shipping-and-launch`, `source-driven-development`, `spec-driven-development`, `test-driven-development`, `using-agent-skills`.

## 4. C3 - Agent Kits + Specialized Agents

| repo | stars | license | age_d | cpd | axis_3_band | axis_1_orgs | native_cc_path | cr12_disposition | probe_pass | probe_fail | verdict | conf |
|---|---:|---|---:|---:|---|---|---|---|---|---|---|---:|
| `wshobson/agents` | [UNKNOWN] | MIT | [UNKNOWN] | cpd30=1.63 | ACTIVE-ITERATION | community | Agent+Plugin+Skill+Command | GENUINELY-NEW | 185 agents across 80 plugins [VERIFIED] | count drift in metadata [VERIFIED] | ADOPT-NOW | 0.94 |
| `wshobson/agents:agent-teams` | repo-level | MIT | [UNKNOWN] | repo-level | ACTIVE-ITERATION | community | Plugin+Agent+Skill+Command | GENUINELY-NEW | installed project+user; 4 agents + 6 skills in plugin [VERIFIED] | overlaps local orchestration rules [INFERRED] | ADOPT-NOW | 0.93 |
| `wshobson/agents:agent-orchestration` | repo-level | MIT | [UNKNOWN] | repo-level | ACTIVE-ITERATION | community | Plugin+Agent+Command | GENUINELY-NEW | installed v1.2.1 [VERIFIED] | zero skills in this plugin [VERIFIED] | ADOPT-NOW | 0.90 |
| `wshobson/agents:comprehensive-review` | repo-level | MIT | [UNKNOWN] | repo-level | ACTIVE-ITERATION | community | Plugin+Agent | PROVIDER-COMPLEMENT | installed v1.3.0; 3 agents reported in README table [VERIFIED] | duplicate with codex review, but complementary role-based review [INFERRED] | ADOPT-NOW | 0.88 |
| `openai/codex-plugin-cc:codex-rescue` | ~18.4k repo | [UNKNOWN] | [UNKNOWN] | [UNKNOWN] | ACTIVE-ITERATION | OpenAI | Agent+Command+Hook | PROVIDER-COMPLEMENT | manifest cites Path A upstream install available [VERIFIED] | current Codex process failed app-server [VERIFIED] | ADOPT-NOW | 0.86 |

Wshobson domain coverage [VERIFIED/INFERRED]:

- Development/languages: backend, frontend/mobile, Python, JS/TS, systems, JVM, web scripting, functional, Julia, .NET, ARM Cortex-M [VERIFIED from plugin names].
- Infrastructure/ops: cloud, Kubernetes, CI/CD, deployment, observability, incident response, distributed debugging, error diagnostics [VERIFIED].
- Security/governance: security scanning/compliance, API security, frontend/mobile security, reverse engineering, protect-mcp, signed-audit-trails, review-agent-governance, block-no-verify [VERIFIED].
- Quality/workflows: comprehensive-review, performance-testing-review, TDD, full-stack-orchestration, agent-teams, agent-orchestration, conductor, plugin-eval [VERIFIED].
- Business/creative/SEO/finance: startup-business-analyst, business analytics, customer sales automation, HR/legal, brand landing page, content marketing, SEO, quant trading, payment processing, game dev [VERIFIED].

Top wshobson plugin component counts [VERIFIED]:

| plugin | agents | skills |
|---|---:|---:|
| backend-development | 8 | 9 |
| cloud-infrastructure | 7 | 8 |
| incident-response | 6 | 3 |
| multi-platform-apps | 6 | 0 |
| cicd-automation | 5 | 4 |
| documentation-generation | 5 | 3 |
| agent-teams | 4 | 6 |
| observability-monitoring | 4 | 4 |
| systems-programming | 4 | 3 |
| api-scaffolding | 4 | 1 |
| python-development | 3 | 16 |
| ui-design | 3 | 9 |
| llm-application-dev | 3 | 8 |

## 5. C4 - Sub-Agent Orchestration Patterns

| pattern | source | native_cc_path | probe_pass | probe_fail | verdict |
|---|---|---|---|---|---|
| Worktree parallelism / isolated agents | Boris Cherny-style pattern requested; exact local sister rule path not found [VERIFIED] | Pattern/Cite | current task asked for `Z:/claude-sota/.claude/rules/team-orchestration.md` and `parallel-agent-wave.md`; neither exact path exists [VERIFIED] | source path miss; needs rediscovery [VERIFIED] | HONEST-NON-FINDING |
| Hub-and-spoke orchestrator | wshobson `agent-teams`, `full-stack-orchestration`, `conductor` [VERIFIED] | Plugin+Agent+Command | agent-teams installed [VERIFIED] | must avoid overloading context with all plugins [INFERRED] | ADOPT-NOW |
| Swarm / peer mesh | CrewAI, AutoGen, LangGraph [VERIFIED] | Framework | strong library support [VERIFIED] | not CC-native; AutoGen maintenance-mode [VERIFIED] | CITE/PROVIDER-COMPLEMENT |
| Review adversarial split | OpenAI Codex plugin + wshobson comprehensive-review + official code-review [VERIFIED] | Plugin+Command+Agent | installed locally [VERIFIED] | duplicate review loops can create latency [INFERRED] | ADOPT with routing |
| Long-running harness | CWC + GSD + context-management + ralph-loop [VERIFIED] | Plugin+Repo+Harness | all local clones/plugins present except full GSD active install [VERIFIED] | planning-stack collision risk [INFERRED] | ADOPT-STAGED |

## 6. C5 - Cross-Runtime Adapters

| candidate | orgs | native path | convergence |
|---|---|---|---|
| SKILL.md format | Anthropic, Addy Osmani, sickn33, alirezarezvani, LangChain/deepagents examples [VERIFIED/INFERRED] | Skill | PASS strict >=3 orgs [INFERRED] |
| Plugin marketplace JSON | Anthropic official, OpenAI Codex plugin, wshobson, addy, alirezarezvani, sickn33 [VERIFIED] | Marketplace | PASS strict >=3 orgs [VERIFIED] |
| AGENTS.md / cross-runtime context files | OpenAI Codex, local runtime, addy-agent-skills, smolagents has AGENTS.md [VERIFIED] | Context file | PASS strict >=3 orgs [INFERRED] |
| ACP/A2A/MCP adapter convergence | Microsoft MAF mentions A2A + MCP; Claude ecosystem uses MCP; OpenAI Agents has MCP support via package docs [VERIFIED/INFERRED] | Adapter protocols | PARTIAL PASS; exact ACP n>=5 not proven in this pass [UNKNOWN] |
| Multi-CLI tool support | addy supports Claude/Gemini/opencode/Cursor/Copilot docs; sickn33 advertises Claude/Cursor/Codex/Gemini/Antigravity; GSD has multi-CLI discussion [VERIFIED/INFERRED] | Multi | PASS strict >=3 orgs [INFERRED] |

## 7. C6 - Workflow Harnesses

| repo | stars | license | age_d | cpd | axis_3_band | axis_1_orgs | native_cc_path | cr12_disposition | probe_pass | probe_fail | verdict | conf |
|---|---:|---|---:|---:|---|---|---|---|---|---|---|---:|
| `gsd-build/get-shit-done` | ~60.7k [VERIFIED via GitHub org web] | [UNKNOWN] | [UNKNOWN] | cpd30=21.10 local [VERIFIED] | FAST-CHURN | GSD/TACHES [VERIFIED] | Workflow harness+commands [VERIFIED] | GENUINELY-NEW | very active local clone; prior manifest installed narrow verifier [VERIFIED] | planning collision if full install before official/wshobson [INFERRED] | ADOPT-STAGED | 0.89 |
| `anthropics/cwc-long-running-agents` | low stars in prior manifest [VERIFIED] | [UNKNOWN] | [UNKNOWN] | cpd30=0.03 local [VERIFIED] | STRONG-PROVENANCE-EXPRESS | Anthropic [VERIFIED] | Long-running harness artifacts [VERIFIED] | CITE-CLASS-CANONICAL | local clone HEAD `ffd563d668a9...` [VERIFIED] | not broad marketplace [INFERRED] | ADOPT-NOW CITE+LOCAL | 0.88 |
| `ralph-loop@claude-plugins-official` | official marketplace | [UNKNOWN] | [UNKNOWN] | [UNKNOWN] | STRONG-PROVENANCE-EXPRESS | Anthropic [VERIFIED] | Plugin | GENUINELY-NEW | installed v1.0.0 [VERIFIED] | [UNKNOWN] | ADOPT-NOW | 0.86 |
| `everything-claude-code:autonomous-agent-harness` | repo-level | [UNKNOWN] | [UNKNOWN] | cpd30=4.10 | FAST-CHURN | community | Skill | PARTIAL-OVERLAP | skill exists in installed cache sample [VERIFIED] | release-candidate broad bundle [INFERRED] | ADOPT-SUBSET | 0.80 |

## 8. C7 - Anthropic-Official Plugins

| plugin | source | installed | verdict |
|---|---|---|---|
| `skill-creator` | `claude-plugins-official` | yes, version `20cc75e94a38` [VERIFIED] | ADOPT-NOW [INFERRED] |
| `plugin-dev` | `claude-plugins-official` | yes, version `20cc75e94a38` [VERIFIED] | ADOPT-NOW [INFERRED] |
| `hookify` / hooks-builder class | `claude-plugins-official` | yes, version `20cc75e94a38` [VERIFIED] | ADOPT-NOW with safety review [INFERRED] |
| `agent-sdk-dev` | `claude-plugins-official` | yes, version `20cc75e94a38` [VERIFIED] | ADOPT-NOW [INFERRED] |
| `frontend-design` | `claude-plugins-official` | yes, version `20cc75e94a38` [VERIFIED] | ADOPT-NOW for frontend layer [INFERRED] |
| `cwc-makers` | `claude-plugins-official` | yes, v1.0.0 [VERIFIED] | ADOPT-NOW for CWC harness [INFERRED] |
| `code-review` / `feature-dev` | `claude-plugins-official` | yes [VERIFIED] | ADOPT-NOW, route against Codex review [INFERRED] |

## 9. C8 - Long-Running Agent Frameworks

| repo | stars | license | age_d | cpd | axis_3_band | axis_1_orgs | native_cc_path | cr12_disposition | probe_pass | probe_fail | verdict | conf |
|---|---:|---|---:|---:|---|---|---|---|---|---|---|---:|
| `anthropics/cwc-long-running-agents` | [UNKNOWN] | [UNKNOWN] | [UNKNOWN] | cpd30=0.03 local [VERIFIED] | STRONG-PROVENANCE-EXPRESS | Anthropic | Repo artifacts | CITE-CLASS-CANONICAL | local installed under deps; official org [VERIFIED] | not a marketplace by itself [INFERRED] | ADOPT-NOW | 0.88 |
| `openai/openai-agents-python` | ~26.3k [VERIFIED via Gitstar web] | MIT [VERIFIED via PyPI web] | ~430 [INFERRED] | cpd30=1.67 local [VERIFIED] | ACTIVE-ITERATION | OpenAI | Python framework | PROVIDER-COMPLEMENT | local clone HEAD `cf151f91ff9f`; PyPI 0.17.2 uploaded May 12, 2026 [VERIFIED] | not CC plugin [VERIFIED] | PROVIDER-COMPLEMENT | 0.84 |
| `langchain-ai/deepagents` | ~22.7k [VERIFIED via Star History web] | MIT [VERIFIED web] | [UNKNOWN] | cpd30=0.03 local [VERIFIED shallow] | ACTIVE-ITERATION | LangChain | Python/TS framework | PROVIDER-COMPLEMENT | planning, filesystem, subagent harness [VERIFIED web] | not CC-native; local clone looks shallow/stale [INFERRED] | ADOPT-LIB-LATER | 0.78 |
| `langchain-ai/langgraph` | ~31.4k [VERIFIED web] | MIT [VERIFIED web] | [UNKNOWN] | cpd30=0.03 local [VERIFIED shallow] | ACTIVE-ITERATION | LangChain | Python/TS framework | PROVIDER-COMPLEMENT | graph agent standard; May 2026 release cadence [VERIFIED] | security advisories require version diligence [VERIFIED web] | ADOPT-LIB-LATER | 0.80 |
| `crewAIInc/crewAI` | ~44-48k [VERIFIED web range] | MIT [VERIFIED web] | [UNKNOWN] | cpd30=0.03 local [VERIFIED shallow] | STABLE-BURN-IN | CrewAI | Python framework | PROVIDER-COMPLEMENT | independent of LangChain per README [VERIFIED web] | not CC-native [VERIFIED] | CITE/DEFER | 0.72 |
| `huggingface/smolagents` | ~14k+ [VERIFIED web] | Apache-2.0 [VERIFIED web] | [UNKNOWN] | cpd30=0.03 local [VERIFIED shallow] | ACTIVE-ITERATION | HuggingFace | Python CLI/framework | PROVIDER-COMPLEMENT | model-agnostic; MCP/tool support [VERIFIED web] | SSRF advisory exists [VERIFIED web] | CITE/DEFER | 0.70 |
| `agno-agi/agno` | ~39.2k [VERIFIED web] | Apache-2.0 [VERIFIED web] | [UNKNOWN] | cpd30=0.03 local [VERIFIED shallow] | ACTIVE-ITERATION | Agno | Python framework | PROVIDER-COMPLEMENT | strong framework traction [VERIFIED web] | not CC-native [VERIFIED] | CITE/DEFER | 0.70 |
| `microsoft/autogen` | ~57.8k [VERIFIED web] | MIT + CC-BY-4.0 [VERIFIED web] | [UNKNOWN] | [UNKNOWN] | STABLE-BURN-IN/MAINTENANCE | Microsoft | Python framework | DUPLICATE-FUNCTIONALITY | strong historic adoption [VERIFIED] | maintenance mode; new users told to use MAF [VERIFIED] | DEFER | 0.91 |

## 10. Source-Code Grade Rationale - Top 5 Overall

1. `wshobson/agents` grade A- [INFERRED]: best Claude Code-native breadth with granular plugins, concrete marketplace JSON, real local plugin dirs, per-plugin isolation, and a countable agent/skill/command surface [VERIFIED]. Downgrade for metadata drift between README and marketplace description [VERIFIED].
2. `claude-plugins-official` grade A- [INFERRED]: official provenance and key development plugins are already installed [VERIFIED]. Downgrade because local parser observed one marketplace anomaly and individual plugin licensing/version details need per-plugin audit [VERIFIED/UNKNOWN].
3. `openai/codex-plugin-cc` grade B+ [INFERRED]: critical provider complement for adversarial review/rescue, already installed [VERIFIED]. Downgrade because this run's Codex consult failed at local app-server startup [VERIFIED].
4. `addyosmani/agent-skills` grade B+ [INFERRED]: high-signal curated engineering skills, multi-runtime docs and commands, modest controlled skill count [VERIFIED]. Downgrade because it is a broad bundle with only one marketplace plugin entry [VERIFIED/INFERRED].
5. `gsd-build/get-shit-done` grade B+ [INFERRED]: exceptional activity and workflow-harness fit [VERIFIED]. Downgrade because it is a large planning/context system that can conflict with Spec-Kit/wshobson/conductor unless staged [INFERRED].

## 11. Implant Order for `Z:\claude-sota-pure`

Dependency-aware install sequence [INFERRED]:

1. Baseline official plugin substrate [VERIFIED/INFERRED]:
   - `/plugin marketplace add anthropics/claude-plugins-official`
   - `/plugin install skill-creator@claude-plugins-official`
   - `/plugin install plugin-dev@claude-plugins-official`
   - `/plugin install agent-sdk-dev@claude-plugins-official`
   - `/plugin install ralph-loop@claude-plugins-official`
   - `/plugin install frontend-design@claude-plugins-official`
   - `/plugin install code-review@claude-plugins-official`
   - `/plugin install feature-dev@claude-plugins-official`
2. Cross-model review/rescue [VERIFIED/INFERRED]:
   - `/plugin marketplace add openai/codex-plugin-cc`
   - `/plugin install codex@openai-codex`
3. Required wshobson orchestration marketplace [VERIFIED/INFERRED]:
   - `/plugin marketplace add wshobson/agents`
   - `/plugin install agent-teams@claude-code-workflows`
   - `/plugin install agent-orchestration@claude-code-workflows`
   - `/plugin install context-management@claude-code-workflows`
   - `/plugin install comprehensive-review@claude-code-workflows`
   - `/plugin install protect-mcp@claude-code-workflows`
   - `/plugin install signed-audit-trails@claude-code-workflows`
   - `/plugin install review-agent-governance@claude-code-workflows`
4. Engineering skills [VERIFIED/INFERRED]:
   - `/plugin marketplace add addyosmani/agent-skills`
   - `/plugin install agent-skills@addy-agent-skills`
   - `/plugin marketplace add alirezarezvani/claude-skills`
   - `/plugin install engineering-skills@claude-code-skills`
   - `/plugin install engineering-advanced-skills@claude-code-skills`
5. Selective broad catalogs [INFERRED]:
   - `/plugin marketplace add sickn33/antigravity-awesome-skills`
   - `/plugin install antigravity-bundle-essentials@antigravity-awesome-skills`
   - Keep `awesome-claude-code`, `awesome-claude-skills`, `awesome-claude-plugins` as cite/discovery clones, not runtime-loaded defaults [INFERRED].
6. Workflow harnesses after core routing is stable [INFERRED]:
   - Clone/pin `gsd-build/get-shit-done` and install only verifier/context-monitor pieces first.
   - Clone/pin `anthropics/cwc-long-running-agents`; wire CWC gates/kill-switch/evaluator only after pure runtime safety hooks exist.
7. Library frameworks last [INFERRED]:
   - Add `openai-agents-python`, `deepagents`, `LangGraph`, `CrewAI`, `smolagents`, `agno` only as project dependencies when building agent apps; do not preload into Claude Code runtime.

## 12. Convergence Summary

Strict >=3 distinct orgs PASS:

- Plugin marketplace model: Anthropic, OpenAI, wshobson, Addy Osmani, alirezarezvani, sickn33 all expose compatible marketplace/plugin artifacts locally [VERIFIED].
- SKILL.md model: Anthropic, Addy Osmani, wshobson, alirezarezvani, sickn33, everything-claude-code all expose skills locally [VERIFIED].
- Agent markdown model: wshobson, everything-claude-code, claude-plugins-official, addy-agent-skills, openai-codex expose agent definitions locally [VERIFIED].
- Cross-runtime context/skill trend: AGENTS.md and SKILL.md appear across OpenAI/local runtime/Addy/smolagents/sickn33 patterns [VERIFIED/INFERRED].

Partial / non-pass:

- ACP exact convergence n>=5 orgs was not proven in this pass [UNKNOWN].
- Microsoft AutoGen no longer passes ADOPT-NOW despite stars because upstream now points new users to Microsoft Agent Framework [VERIFIED].

## 13. HONEST-NON-FINDING Entries

1. Codex consults: all three requested BRIDGE-MODE calls failed before model review with `failed to initialize in-process app-server client: Access is denied` [VERIFIED]. Output files exist:
   - `.claude/state/codex_consult_w220_agentB_wshobson_OUT.txt`
   - `.claude/state/codex_consult_w220_agentB_marketplaces_OUT.txt`
   - `.claude/state/codex_consult_w220_agentB_frameworks_OUT.txt`
2. Exact sister-rule files `Z:/claude-sota/.claude/rules/team-orchestration.md` and `Z:/claude-sota/.claude/rules/parallel-agent-wave.md` were not found at requested paths [VERIFIED]. The broader rule directory path itself was absent in this workspace view [VERIFIED].
3. GitHub REST API metadata pull failed locally for all queried repos with TLS `SSL connection could not be established` [VERIFIED]. Star/license facts therefore use local clones, local files, user-provided candidates, and web-search snippets with explicit confidence markers.
4. ACP convergence strict n>=5 was not established [UNKNOWN]. MCP/A2A/Multi-runtime convergence is visible, but ACP-specific organizational adoption needs a separate targeted protocol pass [INFERRED].

## 14. Cite Trail

Local file citations:

- `Z:/repos/deps/wshobson-agents/README.md:9 @ HEAD ece811f23310a37ceb43496dbac0e244fe6845b6` - 185 agents / 16 orchestrators / 153 skills / 100 commands / 80 plugins [VERIFIED].
- `Z:/repos/deps/wshobson-agents/README.md:15-18 @ HEAD ece811f23310a37ceb43496dbac0e244fe6845b6` - overview count bullets and domain breadth [VERIFIED].
- `Z:/repos/deps/wshobson-agents/README.md:49 @ HEAD ece811f23310a37ceb43496dbac0e244fe6845b6` - `/plugin marketplace add wshobson/agents` [VERIFIED].
- `Z:/repos/deps/wshobson-agents/README.md:168 @ HEAD ece811f23310a37ceb43496dbac0e244fe6845b6` - `/plugin install agent-teams@claude-code-workflows` [VERIFIED].
- `Z:/repos/deps/wshobson-agents/README.md:431 @ HEAD ece811f23310a37ceb43496dbac0e244fe6845b6` - MIT license statement [VERIFIED].
- `Z:/repos/deps/wshobson-agents/LICENSE:1 @ HEAD ece811f23310a37ceb43496dbac0e244fe6845b6` - MIT License [VERIFIED].
- `Z:/repos/deps/wshobson-agents/.claude-plugin/marketplace.json:2 @ HEAD ece811f23310a37ceb43496dbac0e244fe6845b6` - marketplace name `claude-code-workflows` [VERIFIED].
- `Z:/repos/deps/wshobson-agents/.claude-plugin/marketplace.json:9-10 @ HEAD ece811f23310a37ceb43496dbac0e244fe6845b6` - marketplace metadata v1.6.0 and 79/184/150 count drift [VERIFIED].
- `Z:/repos/deps/wshobson-agents/.claude-plugin/marketplace.json:196-204 @ HEAD ece811f23310a37ceb43496dbac0e244fe6845b6` - `agent-orchestration` plugin entry [VERIFIED].
- `Z:/repos/deps/wshobson-agents/.claude-plugin/marketplace.json:391-399 @ HEAD ece811f23310a37ceb43496dbac0e244fe6845b6` - `comprehensive-review` plugin entry [VERIFIED].
- `Z:/repos/deps/wshobson-agents/.claude-plugin/marketplace.json:937-946 @ HEAD ece811f23310a37ceb43496dbac0e244fe6845b6` - `agent-teams` plugin entry [VERIFIED].
- `Z:/repos/deps/wshobson-agents/.claude-plugin/marketplace.json:1028-1060 @ HEAD ece811f23310a37ceb43496dbac0e244fe6845b6` - `protect-mcp`, `signed-audit-trails`, `review-agent-governance` [VERIFIED].
- `Z:/claude-sota-installed/.claude/plugins/known_marketplaces.json:98-103 @ runtime HEAD` - `claude-code-workflows` registered to `wshobson/agents` and install location [VERIFIED].
- `Z:/claude-sota-installed/.claude/plugins/installed_plugins.json:336-403 @ runtime HEAD` - shell-scripting/protect-mcp/signed-audit/agent-teams/comprehensive-review installed from wshobson marketplace [VERIFIED].
- `Z:/claude-sota-installed/.claude/plugins/installed_plugins.json:453-479 @ runtime HEAD` - context-management/agent-orchestration/review-agent-governance installed [VERIFIED].
- `Z:/claude-sota-installed/docs/sota-installed-manifest.md:733 @ runtime HEAD` - prior DEP-ONLY operationalization of `wshobson/agents` at HEAD `ece811...` [VERIFIED].
- `Z:/claude-sota-installed/docs/sota-installed-manifest.md:96 @ runtime HEAD` - OpenAI Codex plugin T1-T7 operational manifest row [VERIFIED].

Local clone HEADs:

- `wshobson/agents @ ece811f23310a37ceb43496dbac0e244fe6845b6` [VERIFIED].
- `affaan-m/everything-claude-code @ 841beea45cb25ba51f29fa45b7e272938d19b80a` [VERIFIED].
- `alirezarezvani/claude-skills @ 7d493fed97e4d57553630e1a2432c1c02bf5b2b3` [VERIFIED].
- `hesreallyhim/awesome-claude-code @ 614f102accbcd48206d63a21df64adc984026b40` [VERIFIED].
- `ComposioHQ/awesome-claude-skills @ f2b5e29bc315f04c8e09591ba275f4c4f7d4b8fe` [VERIFIED].
- `sickn33/antigravity-awesome-skills @ d237aa53065ef4012378554d826fabb428e3cee8` [VERIFIED].
- `quemsah/awesome-claude-plugins @ 765d795e76b3912c07e7b98c5f07824b75cfcf75` [VERIFIED].
- `gsd-build/get-shit-done @ 3aaed8f5d7c3492678b867e6687d42c88fe227e5` [VERIFIED].
- `anthropics/cwc-long-running-agents @ ffd563d668a97a38d4aa092bf0d5b1507c046629` [VERIFIED].
- `langchain-ai/deepagents @ 95f845d29745ece957144d045849f02c667ac711` [VERIFIED].
- `langchain-ai/langgraph @ 2e5025ec1ac8...` local shallow clone [VERIFIED].
- `crewAIInc/crewAI @ e4a91cdc0c01...` local shallow clone [VERIFIED].
- `huggingface/smolagents @ df846f842241aab5a7a17f8136574928e347feb6` [VERIFIED].
- `openai/openai-agents-python @ cf151f91ff9f...` local clone [VERIFIED].
- `agno-agi/agno @ b36051c291a8...` local shallow clone [VERIFIED].

Web primary / secondary citations:

- GitHub search result for `wshobson/agents`: https://github.com/wshobson/agents - README count and marketplace install snippet [VERIFIED].
- GitHub org result for GSD: https://github.com/gsd-build - `get-shit-done` ~60.7k stars / 5.2k forks [VERIFIED].
- GitHub result for `addyosmani/agent-skills`: https://github.com/addyosmani/agent-skills - marketplace install and repo structure [VERIFIED].
- Star History `sickn33/antigravity-awesome-skills`: https://www.star-history.com/sickn33/antigravity-awesome-skills - ~37.4k stars, 1,400+ skills, MIT [VERIFIED].
- GitHub result for Microsoft AutoGen: https://github.com/microsoft/autogen - maintenance mode, MIT/CC-BY-4.0, ~57.8k stars [VERIFIED].
- GitHub/Star History for DeepAgents: https://github.com/langchain-ai/deepagents and https://www.star-history.com/langchain-ai/deepagents - MIT, subagent/planning/filesystem, ~22.7k stars [VERIFIED].
- GitHub result for LangGraph: https://github.com/langchain-ai/langgraph - MIT, ~31.4k stars, release cadence [VERIFIED].
- GitHub/PyPI result for OpenAI Agents Python: https://pypi.org/project/openai-agents/ and https://github.com/openai/openai-agents-python - MIT, 0.17.2 uploaded 2026-05-12, OpenAI owner [VERIFIED].
- GitHub result for HuggingFace smolagents: https://github.com/huggingface/smolagents - Apache-2.0, model-agnostic, MCP/tool support [VERIFIED].
- GitLab advisory for smolagents CVE-2026-2654: https://advisories.gitlab.com/pypi/smolagents/CVE-2026-2654/ [VERIFIED].

## 15. BRIDGE-MODE Disclosure Block

- Consult prompts written [VERIFIED]:
  - `.claude/state/codex_consult_w220_agentB_wshobson.txt`
  - `.claude/state/codex_consult_w220_agentB_marketplaces.txt`
  - `.claude/state/codex_consult_w220_agentB_frameworks.txt`
- Consult outputs written [VERIFIED]:
  - `.claude/state/codex_consult_w220_agentB_wshobson_OUT.txt`
  - `.claude/state/codex_consult_w220_agentB_marketplaces_OUT.txt`
  - `.claude/state/codex_consult_w220_agentB_frameworks_OUT.txt`
- Execution outcome [VERIFIED]: all three failed before model response with `failed to initialize in-process app-server client: Access is denied`.
- Fallback method [VERIFIED]: local clones, local marketplace/installed plugin JSON, local line probes, filesystem counts, git HEAD/commit-rate probes, and web primary/secondary search snippets.
- Confidence floor [INFERRED]: wshobson deep dive high confidence (0.94) because it is locally cloned, registered, installed, and countable; framework scoring medium confidence (0.70-0.84) because dynamic GitHub API metadata failed and several local framework clones are shallow/stale.
