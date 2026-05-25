# CODEX DEEP RESEARCH — W296 SOTA Discovery Augmentation

## §0 — TL;DR (what Stream B missed)

Three highest-impact missed candidates: **modelcontextprotocol/registry** · **stacklok/toolhive** · **confident-ai/deepeval**

Stream B covered many obvious agent frameworks, memory systems, eval suites, and code-quality tools. The main misses are not "one more agent framework"; they are infrastructure-layer convergence patterns:

- **MCP substrate is moving from ad hoc server lists to registry + gateway + sandboxed runtime management.** Stream B had individual MCP/runtime components but missed the official registry and secure MCP deployment/gateway layer.
- **Codex is becoming an orchestratable worker through MCP + Agents SDK, not only a CLI reviewer.** This is a 2026 pattern-level miss more than a missing repository.
- **Eval SOTA is shifting toward CI-enforced, multi-judge, trace-attached harnesses.** Stream B listed Inspect/promptfoo/RAGAS but missed DeepEval, Opik, and OpenAI Evals as actionable audit queue candidates.
- **Claude Code ecosystem patterns now include plugin bundles with hooks, MCP servers, LSP servers, background monitors, and settings.** Skill-only inventory misses the operational bundle pattern.
- **Runtime invariants are becoming source-controlled agent rules/checks.** Kilo Code and Continue are not better than this runtime, but they are useful external exemplars for rules, modes, workflows, and CI-verifiable AI checks.

## §1 — Method (web searches performed; sources consulted)

Discovery date: **2026-05-18**. GitHub metadata below is `[VERIFIED]` via GitHub API on 2026-05-18 unless noted. Freshness pass means `pushed_at >= 2026-01-01` or org-canonical.

Local Stream B exclusion pass:

- Read Stream B report: `docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-STREAM-B-SOTA-DISCOVERY.md`.
- Confirmed Stream B already included: Anthropic skills/Claude Code plugins, OpenAI Agents SDK, OpenAI Codex, Microsoft Agent Framework, Google ADK, AgentScope, LangGraph, CrewAI, Pydantic-AI, Magentic-UI, Spec-Kit, Cline, Aider, Task Master, Inspect AI, promptfoo, RAGAS, SWE-agent, mem0, Letta, Zep/Graphiti, Cognee, Basic Memory, LangMem, Serena, ast-grep, jj, GitButler, git-town, uv/pixi/mise/devcontainers.
- Excluded anything already present in Stream B as a full candidate. Some already-covered items appear only as background patterns.

Web searches performed:

- `Claude Code plugin marketplace skills SDK 2026 May Anthropic Agent Skills`
- `Anthropic Claude Code skills plugin marketplace May 2026 skill SDK`
- `OpenAI Codex CLI 2026 multi-agent codex orchestrator codex as judge`
- `OpenAI Codex MCP server Agents SDK multi-agent May 2026 official`
- `MCP servers 2026 model context protocol registry official GitHub May 2026`
- `stacklok toolhive MCP server security registry 2026`
- `IBM mcp-context-forge MCP Gateway 2026`
- `mcp-use MCP agents framework 2026 GitHub`
- `DeepEval G-Eval agent eval framework 2026 GitHub confident-ai deepeval`
- `Opik LLM evaluation agents 2026 GitHub Comet Opik`
- `OpenAI Evals repository 2026 model graded evals judge`
- `RAGAS agent evaluation 2026 GitHub ragas`
- `anthropics claude-code-security-review GitHub action 2026`
- `verification before completion Claude Code TDD best practices 2026 hooks stop hook`
- `Cline AGENTS.md rules memory bank 2026 runtime invariants rubric`
- `Roo Code rules workflows MCP marketplace 2026 GitHub`
- `Cursor rules AGENTS.md 2026 MCP memories hooks`
- `Kilo Code rules workflows MCP marketplace 2026 GitHub`
- `Continue source-controlled AI checks CI 2026 GitHub`
- `sourcebot code search agents understand codebase 2026 GitHub`
- `skill auto-fire description trigger accuracy 2026`
- `terrylica cc-skills Claude Code Skills Marketplace May 2026`
- `secondsky claude-skills claude-agent-sdk skill development toolkit 2026`

Primary source families consulted:

- Anthropic docs: [Agent Skills](https://docs.claude.com/en/docs/agents-and-tools/agent-skills), Claude Code plugin docs/search results, GitHub Actions docs.
- OpenAI docs: [Codex + Agents SDK guide](https://developers.openai.com/codex/guides/agents-sdk), OpenAI API docs search/changelog results, OpenAI Evals docs.
- GitHub API metadata for repository stars, license, URL, and `pushed_at`.
- Project documentation / product docs for candidate repos where available.
- arXiv: [Agent Skills: Teaching AI Agents Skills through Stored Behaviors](https://arxiv.org/abs/2602.08004).

## §2 — Missed candidates by axis (per the 9 priority axes)

### Axis 1 — SOTA-cleanliness / runtime substrate

#### 1. modelcontextprotocol/registry

- URL: [https://github.com/modelcontextprotocol/registry](https://github.com/modelcontextprotocol/registry)
- Stars: **6,829**
- Last commit / pushed_at: **2026-05-14T12:09:05Z**
- License: **NOASSERTION**
- Stream B axis mapping: **Axis 1 SOTA-cleanliness**, **Axis 3 subagent-tools/MCP**, secondary **Axis 8 code intelligence discovery substrate**
- Why Stream B likely missed it: too infrastructure-shaped; easy to overlook when searching for individual MCP servers, agent frameworks, or "awesome MCP" lists.
- Proposed sca-v3.1 verdict: **T1 CITE-AUTHORITY / T2 STUDY**, not immediate install. It is the official MCP registry substrate and should become the canonical discovery input for MCP server audits.
- 2026-MAY freshness check: **PASS** (`pushed_at` 2026-05-14, org-canonical).
- Source families: GitHub API + [MCP Registry](https://registry.modelcontextprotocol.io/) / [MCP Registry docs](https://registry.modelcontextprotocol.io/docs).
- Notes: This changes the audit question from "which MCP servers are popular?" to "which MCP servers are registry-listed, actively maintained, and safe to run under a gateway/sandbox?"

#### 2. stacklok/toolhive

- URL: [https://github.com/stacklok/toolhive](https://github.com/stacklok/toolhive)
- Stars: **1,806**
- Last commit / pushed_at: **2026-05-18T17:48:46Z**
- License: **Apache-2.0**
- Stream B axis mapping: **Axis 1 SOTA-cleanliness**, **Axis 3 subagent-tools/MCP**, secondary **Axis 7 verification/security**
- Why Stream B likely missed it: not an MCP server; it is MCP runtime management, so keyword searches for "best MCP servers" miss it.
- Proposed sca-v3.1 verdict: **T2 STUDY-PILOT**. It is directly relevant to secure MCP deployment, permissions, registry-mediated install, and least-privilege runtime containment.
- 2026-MAY freshness check: **PASS** (`pushed_at` 2026-05-18).
- Source families: GitHub API + [ToolHive docs](https://docs.stacklok.com/toolhive/) / [Stacklok ToolHive catalog](https://github.com/stacklok/toolhive-catalog).
- Notes: High potential as an MCP safety/control-plane pattern, especially for a runtime with many MCPs and strong permission-boundary discipline.

#### 3. IBM/mcp-context-forge

- URL: [https://github.com/IBM/mcp-context-forge](https://github.com/IBM/mcp-context-forge)
- Stars: **3,721**
- Last commit / pushed_at: **2026-05-18T18:48:03Z**
- License: **Apache-2.0**
- Stream B axis mapping: **Axis 1 SOTA-cleanliness**, **Axis 3 subagent-tools/MCP**, secondary **Axis 7 observability/security**
- Why Stream B likely missed it: enterprise gateway naming; not branded as a Claude Code or agent framework primitive.
- Proposed sca-v3.1 verdict: **T2 STUDY-PILOT**. It is a gateway/registry/protocol-conversion layer for MCP with security and observability claims, useful for MCP fleet rationalization.
- 2026-MAY freshness check: **PASS** (`pushed_at` 2026-05-18).
- Source families: GitHub API + [MCP Context Forge docs](https://ibm.github.io/mcp-context-forge/).
- Notes: This overlaps with ToolHive but at a different layer: gateway and protocol composition versus local secure runtime deployment. W297 should compare them rather than install both.

#### 4. pathintegral-institute/mcpm.sh

- URL: [https://github.com/pathintegral-institute/mcpm.sh](https://github.com/pathintegral-institute/mcpm.sh)
- Stars: **950**
- Last commit / pushed_at: **2026-04-24T16:46:04Z**
- License: **MIT**
- Stream B axis mapping: **Axis 1 SOTA-cleanliness**, **Axis 3 subagent-tools/MCP**
- Why Stream B likely missed it: below the popularity threshold of larger frameworks and named like a CLI/package manager rather than a server.
- Proposed sca-v3.1 verdict: **T3 WATCH**. Useful as a signal that MCP package-management UX is emerging; less compelling than official registry + ToolHive.
- 2026-MAY freshness check: **PASS** (`pushed_at` 2026-04-24).
- Source families: GitHub API + [mcpm.sh homepage](https://mcpm.sh/) / project README.
- Notes: Do not prioritize over official registry or secure gateway work. Keep as evidence of ecosystem direction.

### Axis 2 — Agent orchestration

#### 5. mcp-use/mcp-use

- URL: [https://github.com/mcp-use/mcp-use](https://github.com/mcp-use/mcp-use)
- Stars: **9,967**
- Last commit / pushed_at: **2026-05-18T17:51:51Z**
- License: **MIT**
- Stream B axis mapping: **Axis 2 agent-orch**, **Axis 3 subagent-tools/MCP**
- Why Stream B likely missed it: it is positioned around MCP application integration rather than "agent framework" branding.
- Proposed sca-v3.1 verdict: **T2 STUDY-PILOT**. It may be useful as a lightweight MCP agent integration layer, especially for experiments that should not pull in a heavyweight orchestration framework.
- 2026-MAY freshness check: **PASS** (`pushed_at` 2026-05-18).
- Source families: GitHub API + [mcp-use docs](https://docs.mcp-use.com/).
- Notes: The question for W297 is whether it adds anything beyond the current Claude Code MCP integration and existing Python/JS agent frameworks. It is a candidate because it sits exactly at the MCP-agent boundary.

#### 6. Kilo-Org/kilocode

- URL: [https://github.com/Kilo-Org/kilocode](https://github.com/Kilo-Org/kilocode)
- Stars: **19,388**
- Last commit / pushed_at: **2026-05-18T18:05:05Z**
- License: **MIT**
- Stream B axis mapping: **Axis 2 agent-orch**, **Axis 4 planning-with-files**, **Axis 7 verification/TDD-guide**, secondary **Axis 6 cardinal-rule extensibility**
- Why Stream B likely missed it: Stream B looked at Cline/Aider/Cursor-class primitives but appears not to have treated Kilo Code as a first-class runtime-invariants exemplar.
- Proposed sca-v3.1 verdict: **T3 PATTERN-STUDY**. Do not install into eee by default; study its rules, modes, workflows, MCP marketplace, and check mechanisms as external runtime-pattern evidence.
- 2026-MAY freshness check: **PASS** (`pushed_at` 2026-05-18).
- Source families: GitHub API + [Kilo Code landing/docs surface](https://kilo.ai/landing/roo-code).
- Notes: Relevant to cardinal-rule extensibility because it encodes project behavior through rules/workflows/modes, not because it should replace Claude Code.

### Axis 3 — Subagent tools / GPT-5.5 / Codex-as-worker

#### 7. openai/evals

- URL: [https://github.com/openai/evals](https://github.com/openai/evals)
- Stars: **18,487**
- Last commit / pushed_at: **2026-04-14T15:29:57Z**
- License: **NOASSERTION**
- Stream B axis mapping: **Axis 3 subagent-tools/GPT-5.5**, **Axis 6 research-arch**, **Axis 7 verification**
- Why Stream B likely missed it: Stream B emphasized Inspect AI, promptfoo, SWE-bench, and RAGAS, but did not list OpenAI Evals as an org-canonical model-graded harness candidate.
- Proposed sca-v3.1 verdict: **T2 PATTERN-ADOPT / T3 PILOT**. It should feed codex-as-judge and cross-model adversarial consensus design, especially for schema-driven eval definitions.
- 2026-MAY freshness check: **PASS** (`pushed_at` 2026-04-14, org-canonical).
- Source families: GitHub API + [OpenAI Evals guide](https://platform.openai.com/docs/guides/evals).
- Notes: Best viewed as a pattern and harness source, not a direct replacement for Inspect/promptfoo.

### Axis 4 — Planning-with-files

No stronger standalone planning-with-files repository was found that Stream B clearly missed and that beats Spec-Kit, Task Master, Claude Code Workflow, Cline, or Aider. The useful misses are pattern imports from **Kilo Code** and **Continue**:

- Kilo Code: project rules, modes, and workflows as external evidence for runtime-invariant encoding.
- Continue: source-controlled AI checks as a verification-before-completion mechanism.

Verdict: **no additional T1/T2 full planning candidate** beyond the two cross-axis pattern candidates above.

### Axis 5 — Memory

No new memory-stack replacement candidate beat Stream B's coverage of mem0, Letta, Zep/Graphiti, Cognee, LangMem, Langroid, Basic Memory, and the incumbent six-tier stack.

The main missed memory-adjacent pattern is **skill-trigger reliability as retrieval routing**:

- Anthropic Agent Skills docs state that skills are discovered and selected through metadata/frontmatter descriptions.
- The 2026 paper [Agent Skills: Teaching AI Agents Skills through Stored Behaviors](https://arxiv.org/abs/2602.08004) treats stored behaviors as a learnable and measurable agent capability surface.

Verdict: **memory stack does not need a new candidate**; W297 should audit skill descriptions and memory-routing descriptions for trigger ambiguity, overlap, and measurable auto-fire precision.

### Axis 6 — Research architecture / eval harness

#### 8. confident-ai/deepeval

- URL: [https://github.com/confident-ai/deepeval](https://github.com/confident-ai/deepeval)
- Stars: **15,527**
- Last commit / pushed_at: **2026-05-18T19:24:36Z**
- License: **Apache-2.0**
- Stream B axis mapping: **Axis 6 research-arch**, **Axis 7 verification/TDD-guide**, secondary **Axis 8 cross-model adversarial consensus**
- Why Stream B likely missed it: likely obscured by Inspect AI and promptfoo in the first eval pass.
- Proposed sca-v3.1 verdict: **T2 STUDY-PILOT**. DeepEval is directly relevant for G-Eval-style LLM-as-judge, regression evals, CI integration, and agent evaluation.
- 2026-MAY freshness check: **PASS** (`pushed_at` 2026-05-18).
- Source families: GitHub API + [DeepEval docs](https://docs.confident-ai.com/).
- Notes: This is the strongest missed eval candidate. W297 should benchmark it against Inspect/promptfoo for judge rubrics, position-swap support, deterministic output schemas, and CI cost control.

#### 9. comet-ml/opik

- URL: [https://github.com/comet-ml/opik](https://github.com/comet-ml/opik)
- Stars: **19,335**
- Last commit / pushed_at: **2026-05-18T19:47:09Z**
- License: **Apache-2.0**
- Stream B axis mapping: **Axis 6 research-arch**, **Axis 7 verification**, secondary **Axis 5 memory/trace observability**
- Why Stream B likely missed it: Stream B already covered Langfuse/Phoenix-class observability and likely stopped before Opik.
- Proposed sca-v3.1 verdict: **T2 STUDY**. It should be compared to Langfuse/Phoenix for eval datasets, scoring, trace review, and experiment management.
- 2026-MAY freshness check: **PASS** (`pushed_at` 2026-05-18).
- Source families: GitHub API + [Comet Opik docs](https://www.comet.com/docs/opik/).
- Notes: Not an obvious install because the runtime already has Langfuse/Phoenix. Its value is as a challenger benchmark for trace-attached eval UX.

### Axis 7 — Code quality / verification-before-completion

#### 10. anthropics/claude-code-security-review

- URL: [https://github.com/anthropics/claude-code-security-review](https://github.com/anthropics/claude-code-security-review)
- Stars: **4,642**
- Last commit / pushed_at: **2026-02-11T18:01:23Z**
- License: **MIT**
- Stream B axis mapping: **Axis 7 code-quality**, **Axis 8 adversarial review**, secondary **Axis 1 SOTA-cleanliness**
- Why Stream B likely missed it: Stream B included `anthropics/claude-code-action` but not the narrower security-review action.
- Proposed sca-v3.1 verdict: **T1 CITE / T2 PATTERN-ADOPT**. Official Anthropic security-review automation belongs in the verification-before-completion pattern library even if eee does not run GitHub Actions locally.
- 2026-MAY freshness check: **PASS** (`pushed_at` 2026-02-11, org-canonical).
- Source families: GitHub API + [Claude Code GitHub Actions docs](https://docs.claude.com/en/docs/claude-code/github-actions).
- Notes: Useful as a specialized security gate pattern alongside gitleaks and existing stop-hook review gates.

#### 11. continuedev/continue

- URL: [https://github.com/continuedev/continue](https://github.com/continuedev/continue)
- Stars: **33,256**
- Last commit / pushed_at: **2026-05-18T18:06:15Z**
- License: **Apache-2.0**
- Stream B axis mapping: **Axis 7 verification/TDD-guide**, **Axis 4 planning-with-files**, secondary **Axis 6 runtime invariants**
- Why Stream B likely missed it: Continue is often categorized as an IDE assistant, but current positioning includes source-controlled AI checks enforceable in CI.
- Proposed sca-v3.1 verdict: **T2 PATTERN-STUDY / T3 PILOT**. Study for source-controlled AI checks, policy-as-code around AI behavior, and CI verification gates.
- 2026-MAY freshness check: **PASS** (`pushed_at` 2026-05-18).
- Source families: GitHub API + [Continue docs](https://docs.continue.dev/).
- Notes: The relevant primitive is not autocomplete. It is source-controlled checks and governance that map to cardinal-rule enforcement.

### Axis 8 — GitNexus / code intelligence

#### 12. sourcebot-dev/sourcebot

- URL: [https://github.com/sourcebot-dev/sourcebot](https://github.com/sourcebot-dev/sourcebot)
- Stars: **3,397**
- Last commit / pushed_at: **2026-05-16T04:57:20Z**
- License: **NOASSERTION**
- Stream B axis mapping: **Axis 8 gitnexus**, secondary **Axis 2 agent-orch**
- Why Stream B likely missed it: Stream B focused on semantic/codegraph tools like Serena, ast-grep, zoekt, and repo-map approaches; Sourcebot is a self-hosted code understanding/search product for humans and agents.
- Proposed sca-v3.1 verdict: **T3 WATCH**. It is not a GitNexus replacement because it does not appear to provide the same symbol-impact contract, but it is a useful challenger for self-hosted agent code search UX.
- 2026-MAY freshness check: **PASS** (`pushed_at` 2026-05-16).
- Source families: GitHub API + [Sourcebot docs](https://docs.sourcebot.dev/).
- Notes: W297 should compare it only if GitNexus misses repository-scale search or agent-facing codebase navigation needs.

### Axis 9 — Git practice

No compelling missed 2026-Q2 git-practice repository was found beyond Stream B's coverage of `jj`, GitButler, git-town, conventional commits, and GitHub Actions patterns.

Missed adjacent patterns:

- Continue's source-controlled AI checks can become a commit/CI verification primitive.
- Claude Code security review action can become a PR gate.
- OpenAI/DeepEval eval definitions can be treated as versioned test artifacts.

Verdict: **no new standalone git-practice candidate**. The work belongs in verification gates, not another VCS abstraction.

## §3 — Pattern-level findings (not full candidates; new 2026-MAY SOTA patterns we should know about)

### 1. Claude Code plugins are operational bundles, not just skill packs

Anthropic's plugin surface now matters as a deployment primitive. Plugin bundles can include skills, agents, slash commands, MCP servers, hooks, settings, LSP servers, and background monitors. Stream B's inventory of skills and marketplaces is useful, but it underweights the architectural implication: a marketplace item can now alter runtime behavior, background execution, and tool availability.

Recommended audit pattern:

- Treat every plugin as a bundle with security and lifecycle fields, not a folder of prompts.
- Require plugin-level manifest review: hooks, MCP servers, LSP servers, settings, background monitors, permissions, update channel.
- Separate **skill content quality** from **plugin operational risk**.

### 2. Skill auto-fire reliability is now a measurable routing problem

Anthropic Agent Skills are selected through metadata/frontmatter descriptions, so poor descriptions are effectively bad retrieval indexes. The 2026 Agent Skills paper reinforces the idea that stored behaviors are a capability surface, not just documentation.

Recommended W297 rubric:

- One unambiguous "when to use" sentence per skill.
- Negative scope where confusion is likely.
- No overlapping trigger descriptions across sibling skills unless an orchestration skill owns the router role.
- Examples should use concrete user requests, not generic capability claims.
- Measure auto-fire with adversarial trigger sets: positive, near-miss, and collision prompts.

### 3. Codex is becoming an MCP worker inside orchestrated agent systems

OpenAI's official Codex + Agents SDK guide documents launching Codex CLI as a long-running MCP server with `codex mcp-server`. The exposed tools include `codex` for starting a task and `codex-reply` for continuing an existing task. The guide also shows multi-agent orchestration through the Agents SDK with handoffs, guardrails, and traces.

Implication for eee:

- Current Codex stop-hook review is only one mode.
- New pattern is **Codex as worker/tool** called by a parent orchestrator, with traceable tasks and bounded prompts.
- W297 should test whether eee's Codex integration should add a separate "Codex MCP worker" lane distinct from stop-hook review.

### 4. MCP SOTA is converging into registry + gateway + sandbox

The missed MCP candidates form a coherent stack:

- `modelcontextprotocol/registry`: canonical server discovery and metadata.
- `stacklok/toolhive`: secure MCP server deployment/runtime management.
- `IBM/mcp-context-forge`: gateway, registry, protocol conversion, security, observability.
- `mcp-use/mcp-use`: application/agent integration layer.

The runtime should avoid installing more MCP servers before it has a stronger registry/gateway/sandbox answer.

### 5. Eval harness SOTA is multi-layer, not one framework

A robust 2026-Q2 eval stack usually separates:

- **Task definitions**: OpenAI Evals / Inspect AI / promptfoo.
- **LLM-as-judge metrics**: DeepEval / G-Eval-style rubrics.
- **RAG-specific scoring**: RAGAS, already found by Stream B.
- **Trace and experiment observability**: Langfuse / Phoenix / Opik.
- **Cross-model review**: Codex + Claude + Gemini judge diversity with schema contracts.

Practical rule: never accept a single judge position as dispositive for architecture changes. Use position-swap, blind candidate labels, evidence-first citations, and disagreement summaries.

### 6. Verification-before-completion is becoming policy-as-code

The missed pattern is not "run tests"; it is **versioned verification policy**:

- Claude Code security review action for PR/security review gates.
- Continue source-controlled AI checks for CI-enforced behavior.
- DeepEval/OpenAI Evals for versioned model-behavior regression tests.
- Stop hooks for local pre-completion checks.

This maps directly to eee cardinal rules: keep rules in files, run cheap probes before edits, and block completion when verification fails.

### 7. Runtime invariants outside Anthropic are converging on rules/modes/workflows

Cline/Roo/Kilo/Cursor/Continue-style systems all converge on:

- repo-local rule files,
- project memories,
- mode/persona-specific tool policies,
- workflow definitions,
- MCP/tool registries,
- CI/source-controlled checks.

The useful external pattern is not their UI; it is the invariant representation. eee already has stronger cardinal rules, but W297 should compare rule discoverability, conflict resolution, and automatic enforcement.

## §4 — 2026-Q2 release roundup (Anthropic, OpenAI, Microsoft, Google org-canonical SDKs)

### Anthropic

- Anthropic Agent Skills remain the canonical skill surface. Important 2026 audit point: skills are trigger-routed by description/frontmatter, so description quality is runtime behavior.
- Claude Code plugins are broader than skills and can bundle skills, agents, commands, hooks, MCP servers, settings, LSP servers, and background monitors.
- `anthropics/claude-code-action` was already found by Stream B.
- Missed official adjacent repo: `anthropics/claude-code-security-review` for security-focused verification gates.

### OpenAI

- Stream B found OpenAI Agents SDK and Codex generally, but missed the newer composition pattern: **Codex CLI as an MCP server orchestrated by Agents SDK**.
- Official guide: [Codex + Agents SDK](https://developers.openai.com/codex/guides/agents-sdk).
- Key pattern: launch Codex through `codex mcp-server`; call Codex as a tool from a parent orchestrator; use handoffs, guardrails, and traces for multi-agent software workflows.
- Missed repo candidate: `openai/evals` for org-canonical eval definitions and model-graded evaluation patterns.

### Microsoft

- Stream B already covered Microsoft Agent Framework / AutoGen successor patterns. No stronger Microsoft org-canonical miss was found for this specific W296 delta.
- W297 should still compare Microsoft Agent Framework's workflow/state/telemetry primitives against OpenAI Agents SDK and Anthropic Claude Code plugin bundles, but that is Stream B continuation rather than a missed candidate.

### Google

- Stream B already covered Google ADK. No stronger Google org-canonical miss was found that is both fresh and directly relevant to eee runtime architecture.
- Cross-model adversarial consensus should still reserve a Gemini evaluator lane, but the implementation question is judge diversity and rubric design, not a new Google repository.

## §5 — Recommendation (top-3 new candidates to add to Stream B + W297 audit queue)

### 1. Add `modelcontextprotocol/registry` + `stacklok/toolhive` as one W297 MCP-control-plane workstream

Reason: The current runtime has many MCPs; the missed SOTA is governance and runtime safety, not more servers. Audit question:

- Should eee use the official MCP registry as the first discovery source?
- Should ToolHive or MCP Context Forge become the secure install/run/gateway pattern?
- What metadata is required before adding any new MCP server?

Verdict: **highest architectural impact** because it affects every future MCP install.

### 2. Add `confident-ai/deepeval` to the eval harness challenger queue

Reason: DeepEval is the clearest miss in the eval axis. It directly targets G-Eval/LLM-as-judge patterns, CI regression checks, and agent/RAG evals. Audit against Inspect AI + promptfoo:

- schema reliability,
- judge prompt versioning,
- position-swap support,
- cross-model support,
- CI ergonomics,
- cost and caching behavior.

Verdict: **highest verification impact**.

### 3. Add OpenAI Codex MCP-worker pattern + `openai/evals` to the Codex gate roadmap

Reason: eee currently treats Codex mainly as adversarial review/CI rescue. OpenAI's 2026 pattern is Codex as an MCP worker under an orchestrator with traceable handoffs. Pairing that with OpenAI Evals gives a path to codex-as-judge and codex-as-worker without conflating the two.

Audit tasks:

- Prototype a no-write Codex MCP worker lane.
- Compare stop-hook Codex review versus orchestrated Codex MCP tasks.
- Define a schema for judge output and a disagreement protocol across Codex/Claude/Gemini.
- Use OpenAI Evals/DeepEval-style fixtures for regression tests of review quality.

Verdict: **highest cross-model orchestration impact**.

### Secondary queue

- `IBM/mcp-context-forge`: compare against ToolHive for gateway/protocol conversion and observability.
- `comet-ml/opik`: compare against Langfuse/Phoenix as an eval-observability challenger.
- `anthropics/claude-code-security-review`: import as official security-gate pattern.
- `continuedev/continue`: study source-controlled AI checks as policy-as-code.
- `Kilo-Org/kilocode`: study rules/modes/workflows as runtime-invariants representation.
- `sourcebot-dev/sourcebot`: watch as agent-facing code-search UX challenger to GitNexus-adjacent workflows.
