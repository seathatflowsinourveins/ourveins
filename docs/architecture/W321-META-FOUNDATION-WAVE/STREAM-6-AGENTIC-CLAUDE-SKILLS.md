# W321 Stream 6 — alirezarezvani/claude-skills drift + Agentic Framework SOTA Discovery

**Date**: 2026-05-19 · **Wave**: W321-META-FOUNDATION · **Predecessor**: W319 Stream-2 (FAILED, this re-dispatch closes that gap) · **Mode**: read-only audit

## TL;DR (3 sentences)

DSPy is **NOT a real PRIMARY-workflow CHALLENGER** to CC-native subagents — it is an **OPTIMIZER that tunes DSPy programs**; the W319-2 framing was wrong, the correct posture is **COMPLEMENTARY/STACKED** (define ReAct agent → wrap our 12 MCP tools via `dspy.Tool.from_mcp_tool(session, tool)` → tune with MIPROv2/BootstrapFewShot). Top-3 by impact: **(1) DSPy stacked-optimizer pattern INSTALL-AND-WIRE**, **(2) alirezarezvani drift PATTERN-STUDY** (marketplace.json refactor: 11 currently-installed engineering/SRE plugins still valid, but 5 new domain bundles published — `product-skills`/`c-level-skills`/`pm-skills`/`ra-qm-skills`/`content-creator` — out-of-scope for this dev-runtime), **(3) OpenHands PATTERN-STUDY-ONLY**. **CHALLENGER candidate carried through**: **OpenHands** (explicit `mcp_config` support with SSE/Stdio/SHTTP transports; could front CC subagents as a managing layer — but deferred, not adopted).

## §1 alirezarezvani/claude-skills drift

| Dimension | Cached state (.claude/plugins/cache/claude-code-skills/) | Upstream HEAD `8aa92081` 2026-05-19T13:52:11Z | Drift |
|---|---|---|---|
| Marketplace `.claude-plugin/marketplace.json` | 11 installed plugins: engineering-skills@2.2.3, engineering-advanced-skills, kubernetes-operator, chaos-engineering, slo-architect, feature-flags-architect, self-improving-agent, autoresearch-agent, karpathy-coder, agenthub, llm-wiki | **12 plugin entries**: marketing-skills, engineering-skills v1.0.0, product-skills, c-level-skills, pm-skills, ra-qm-skills, content-creator, demand-gen, fullstack-engineer, aws-architect, product-manager, scrum-master | **Major refactor — different namespace** |
| Activity | last fetch 2026-05-17 | HEAD pushed 2026-05-19 + PRs #698–#701 merged today | **2-day stale; 4 commits behind today alone** |
| engineering-skills version | plugin.json `version:"2.2.3"` | marketplace.json shows v1.0.0 | **Ambiguous — `SKILLS_REFACTORING_PLAN.md` suggests org-wide refactor (Oct 2025) recategorising bundles by org-role (PM/C-level/SRE/RA-QM); installed v2.2.3 may be from the legacy `engineering-team/` subtree** |
| Engineering-relevant plugins | ✓ All 11 in our cache map to engineering/SRE/ops domain | engineering-skills + fullstack-engineer + aws-architect | **6 of our 11 plugins (kubernetes-operator, chaos-engineering, slo-architect, feature-flags-architect, self-improving-agent, autoresearch-agent) are NOT visible in upstream marketplace.json** — may have been deprecated/moved to a sub-marketplace or rolled into engineering-skills v2.2.3 |

**Verdict**: HOLD-CURRENT — our 11 cached engineering plugins still resolve to working SKILL.md files; the refactor introduces non-engineering domains (PM, marketing, RA-QM) we don't need; a `/plugin update` could either pull a working v3+ or break the namespace map. Re-litigation deferred to W322 (verify the legacy `engineering-team/` subtree is still tag-pinned + decide whether to re-namespace).

## §2 DSPy expansion plan — COMPLEMENTARY not REPLACEMENT

**Canonical integration** (DeepWiki cite, `stanfordnlp/dspy` 3.2.1):

```python
import dspy
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

# 1. Configure LM (Claude or local)
lm = dspy.LM("anthropic/claude-opus-4-7", api_key=os.environ["ANTHROPIC_API_KEY"])
dspy.configure(lm=lm)

# 2. Bridge each MCP server's tools into DSPy Tool objects
async with stdio_client(StdioServerParameters(...)) as (r, w):
    async with ClientSession(r, w) as session:
        await session.initialize()
        tools_list = await session.list_tools()
        dspy_tools = [dspy.Tool.from_mcp_tool(session, t) for t in tools_list.tools]

# 3. Define typed signature + ReAct agent
class TaskSig(dspy.Signature):
    """Run X using available MCP tools, return Y."""
    request: str = dspy.InputField()
    result: str = dspy.OutputField()

agent = dspy.ReAct(TaskSig, tools=dspy_tools)

# 4. Optimise with GEPA / MIPROv2 / BootstrapFewShot (NOT a replacement for the agent — a tuner)
from dspy.teleprompt import MIPROv2
optimized = MIPROv2(metric=my_metric, auto="light").compile(agent, trainset=trainset)
```

**Integration points in this runtime**:

- `dspy.Tool.from_mcp_tool(session, tool)` wraps every entry in `.mcp.json` (12 servers post-W320: deepwiki, chrome-devtools, repomix, serena, gitnexus, ccusage, cognee, langfuse, basic-memory, hf-mcp-server, perplexity, playwright)
- `dspy.ReAct(signature, tools=[...])` is the agentic loop primitive (lighter than CC subagent dispatch for narrow typed tasks)
- `dspy.MIPROv2` / `dspy.BootstrapFewShot` / `dspy.GEPA` (3.x default) — Pareto-frontier rollout optimiser; 35× fewer rollouts vs baseline per published metrics
- Anti-pattern: replacing CC subagents with DSPy ReAct loses CC's hook/permission/sandbox layer

**Verdict**: INSTALL-AND-WIRE for SPECIFIC NARROW WORKFLOWS (typed-input/typed-output tasks with metric-graded rollouts — eval lanes, prompt-tuning, structured judge agents). NOT primary-workflow replacement.

## §3 Framework comparison (LangGraph / OpenHands)

| Framework | CC Integration vector | Verdict |
|---|---|---|
| **LangGraph** (`langchain-ai/langgraph`) | `ServerRuntime.execution_runtime` lazily connects to MCP servers per-run; `RemoteGraph` composes remote LangGraph deployments. **No official CC plugin or skill.** Integration would require treating LangGraph as an external orchestrator that CALLS CC via headless `--print --output-format json`. | **PATTERN-STUDY only** — too heavy for runtime adoption (Python-only orchestrator with its own state DB + checkpointer); reference value for state-machine multi-actor workflows |
| **OpenHands** (`All-Hands-AI/OpenHands`) | Explicit `agent_settings.mcp_config` field; supports SSE/Stdio/SHTTP MCP transports; can be configured to point at CC subagents IF CC exposes them via an MCP server (which currently it does NOT — CC subagents are an in-process surface, not an MCP-served capability). | **PATTERN-STUDY-ONLY + CHALLENGER carried through** — if CC ever exposes subagents as MCP server, OpenHands could front them as a managing layer with broader tool-policy controls. Until then, deferred. |
| AutoGen / CrewAI / MetaGPT / Magentic-One / smolagents | NOT PROBED THIS WAVE — scope-bounded | DEFER to W322 if operator wants broader survey |

## §4 Top-3 verdicts

| Rank | Item | Classification | Rationale |
|---|---|---|---|
| **1** | **DSPy stacked-optimizer pattern** | **INSTALL-AND-WIRE** | Already pip-installable; SKILL.md exists; `dspy.Tool.from_mcp_tool` wraps our 12 MCPs zero-adapter; canonical use is OPTIMIZER for narrow typed tasks (eval/judge/prompt-tune), NOT primary-workflow replacement. Owner-AI: write a 1-shot harness module that wires `harness/eval_harness.py` lanes through DSPy-tuned signatures. |
| **2** | **alirezarezvani drift** | **HOLD-CURRENT + DEFER /plugin update** | Engineering domain still well-covered by cached v2.2.3; upstream refactor adds non-engineering domains we don't need; risk of namespace break on update is real. Owner-AI: validate `legacy/engineering-team/` is tag-pinned; only then `/plugin update`. |
| **3** | **OpenHands PATTERN-STUDY** | **PATTERN-STUDY-ONLY (CHALLENGER candidate)** | Carries the W319-2 "challenger" obligation under W295 anti-bias gate. Adoption requires CC to expose subagents as MCP — anthropics has not done this. Track for re-litigation when/if CC ships subagent-as-MCP. |

## Out-of-scope notes (per fork rules — one sentence each)

- AutoGen/CrewAI/MetaGPT/Magentic-One/smolagents not probed this wave; defer to W322 if broader agentic-framework survey is desired.
- **`alirezarezvani/claude-skills` namespace ambiguity** (v2.2.3 in plugin.json vs v1.0.0 in marketplace.json + missing 6 plugins from upstream marketplace) is itself a SILENT-DRIFT class — recommend operator opens GitHub issue on alirezarezvani repo to clarify whether the `claude-code-skills` marketplace ID is being deprecated.
- DSPy MCP-tool RFC landed in 3.2.0 (https://github.com/stanfordnlp/dspy/issues/8423) — our 3.2.1 ratification is current.

## Report-back to parent (3 sentences, also at TL;DR above)

DSPy is COMPLEMENTARY-OPTIMIZER not PRIMARY-WORKFLOW-CHALLENGER — wire `dspy.Tool.from_mcp_tool` + `dspy.ReAct` + MIPROv2 as a stacked layer on narrow typed tasks (eval lanes, judges). Top-3 frameworks: DSPy (INSTALL-AND-WIRE), alirezarezvani-drift (HOLD-CURRENT + defer /plugin update pending namespace clarification), OpenHands (PATTERN-STUDY). CHALLENGER candidate carried through: **OpenHands** (gates on CC exposing subagents as MCP server — not currently planned by anthropics).
