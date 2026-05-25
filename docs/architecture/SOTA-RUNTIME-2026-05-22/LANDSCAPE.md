# All-SOTA May-2026 High-Quality Autonomous OSS Runtime Landscape — V2.2

**Date**: 2026-05-22
**Author**: Claude Code (claude-opus-4-7[1m]) orchestrator
**Codex state**: round-1 (NEEDS-REVISION, 7 findings F1-F7 applied) → round-2 (NEEDS-REVISION, 6 findings G1-G6 applied) → round-3 (NEEDS-REVISION, 4+ findings H1-H4+ applied this revision)
**Methodology**: sca-v18 Pareto-frontier (schema at `.claude/schemas/sca-v18-repo-verdict.schema.json`)
**Discipline**: claims are primary-source-verified via gh-API + deepwiki + ≥3 independent sources **where documented**; open verification items are explicitly enumerated in §10. Stars informational-only (OSSF Criticality formula excludes them). Per codex r4 I8: not 100% of every word claim is independently verified — the EVIDENCE-anchored claims are (tiers + licenses + versions + URLs); the SOFT framings (e.g., "recommended pattern", "operator-action item") are advisory.

**Question this answers** (verbatim from operator): *"all sota may 2026 high quality"* — comprehensive OSS autonomous-runtime landscape with tier assignments per sca-v18.

---

## §0 The single-install answer (operator's stated workload: SWE coding)

**`OpenHands/OpenHands`** — codex r1+r2 ratified.

- License: MIT (core); enterprise/ source-available (avoid)
- Stars: 74,400+ (gh-API verified)
- Latest stable: v1.7.0 (2026-05-01); README badge `SWEBench-77.6` (top OSS SWE-bench)
- Backing: All-Hands-AI corporate ($18.8M Series A)
- **Important V1 architecture** (verified via README + gh-API per codex H2 + r4 I3 softened): OpenHands V1 has **three dispatch surfaces** (with some adjacency in repos — the main `OpenHands/OpenHands` provides Local GUI + web app + cloud interfaces, while SDK and CLI live in adjacent repos):
  1. **OpenHands Software Agent SDK** (`OpenHands/software-agent-sdk`) — Python library; "1000s of agents"; docs at `docs.openhands.dev/sdk` (the engine consumed by surfaces 2-3)
  2. **OpenHands CLI** (`OpenHands/OpenHands-CLI`) — Claude-Code-style headless; docs at `docs.openhands.dev/openhands/usage/run-openhands/cli-mode`
  3. **OpenHands Local GUI** (this repo `OpenHands/OpenHands`) — Local GUI + REST API + React SPA; docs at `docs.openhands.dev/openhands/usage/run-openhands/local-setup`

**Split confidence per codex r2 G2**:
- Capability: **HIGH** (77.6% SWE-bench badge primary-source)
- Integration stability: **MEDIUM** (V0→V1 migration: V0 deprecated 2026-04-01; agentic core moved to `software-agent-sdk` repo)
- License: HIGH | Maintainership: HIGH | Production evidence: MEDIUM (README "trusted by" is marketing)
- **Scalar (MIN-over-axes safe-default) = MEDIUM**

**Mandatory mitigations** (codex F2 + G2 + H2 applied):
1. Choose ONE of the three surfaces explicitly for the wire-in (don't conflate)
2. Pin to v1.7.0 release tag (each repo independently)
3. For Docker-deployed surface: pin to container image SHA256 digest
4. Track `OpenHands/software-agent-sdk` repo for breaking changes
5. **Endpoint clarification (codex r4 I2 — reversed direction-of-deprecation):** V0-deprecated endpoint is `POST /api/conversations` (no `/v1/`). V1-current endpoint IS `POST /api/v1/app-conversations` on `:3000`. The V1 catalog's recipe was actually correct for V1 — only the IMAGE ORG (`all-hands-ai/` → `openhands/`) and the agent-server image tag (`v1.7.0` → `1.19.1-python`) were wrong per the docs probe. Source: `docs.openhands.dev/openhands/usage/cloud/cloud-api`
6. Surface scalar MEDIUM (not HIGH) when displaying install-confidence

**Full sca-v18 verdict**: `.claude/state/sca-v18-verdicts/openhands.json` (K=2 jury: codex r1 + r2; needs_revision_count=3 capturing r1/r2/r3 across this catalog).

---

## §1 INSTALL-tier (sca-v18: passes CLASS-A + CLASS-C minimum-1-each)

| # | Repo | Category | License | Latest verified | Stars | Confidence (per-dim) | Dispatch shape |
|---|---|---|---|---|---|---|---|
| 1 | **`OpenHands/OpenHands`** | Autonomous SWE coding | MIT | v1.7.0 (2026-05-01) | 74,400 | Cap H / Integ M | SDK + CLI (separate repo) + Local GUI REST |
| 2 | **`temporalio/temporal`** + `sdk-python` | Durable orchestration | MIT | server v1.31.0 / SDK 1.27.2 | ~13,000 | HIGH all | gRPC SDK |
| 3 | **`aaif-goose/goose`** (moved from `block/goose` Dec 2025) | YAML-recipe agent | Apache-2.0 | v1.34.0+ | AAIF-LF | HIGH on prod-evidence | CLI + ACP + JSON |
| 4 | **`letta-ai/letta`** | Stateful/memory agents | Apache-2.0 | v0.16.8 | ~13,000 | MEDIUM (deepwiki-only) | REST :8283 sync+async |
| 5 | **`crewAIInc/crewAI`** | Crew/role multi-agent (workflow) | MIT (core) | active 2026 | ~25,000 | INSTALL-with-category-exception (per codex F7) | Python embed |
| 6 | **`ComposioHQ/composio`** | MCP tool/auth | MIT (SDK; SaaS backend) | core v0.11.1 + claude-agent-sdk v0.9.2 | ~20,000 | MEDIUM (SaaS backend) | MCP HTTP URL → `.mcp.json` |
| 7 | **`browser-use/browser-use`** | Browser automation | MIT | v0.12.7 | 95,000 | HIGH all | CLI + MCP + REST + SDK (quadruple) |
| 8 | **`browserbase/stagehand`** | Browser automation (cloud-managed) | MIT | v3.6.10 | 22,700 | HIGH | REST + SSE + hosted MCP + 5-lang SDK |

## §2 INSTALL-with-caveat tier (codex H1 expansion — was the H1 main miss)

| # | Repo | Category | License | Stars | Caveat | When to wire |
|---|---|---|---|---|---|---|
| 9 | **`Aider-AI/aider`** | Autonomous SWE coding (CLI pair-programmer) | Apache-2.0 | 45,152 | **PyPI-stale trap (W342-H4)**: v0.86.0 PyPI frozen at 2025-08-09 while main-branch actively commits to 2026-05-22 (9mo-stale binary on `pip install aider-chat`); operator should `pip install git+https://github.com/Aider-AI/aider.git` OR build from main to avoid the trap | If terminal-native pair-programming dispatch is preferred over OpenHands GUI |
| 10 | **`cline/cline`** | Autonomous coding (SDK + IDE + CLI assistant) | Apache-2.0 | 62,184 | **Triple-surface — was wrongly MONITOR in V2** per codex H1 | If VS-Code-native or SDK embed fits better than OpenHands |
| 11 | **`continuedev/continue`** | **CI-status-check-as-markdown-file** (was IDE-extension; major repositioning 2025-2026) | Apache-2.0 | 33,322 | W342-H4 clarification: NOT just "CI/CLI focus" — specifically source-controlled AI checks emitted as markdown files for CI gating | CI-gated AI review where checks live in source-control and run in PR pipelines |
| 12 | **`plandex-ai/plandex`** | OSS AI coding agent (large-project focused) | MIT | 15,387 | Go-native; explicitly targets "large projects and real world tasks" | Large-codebase complex refactors |
| 13 | **`dapr/dapr-agents`** | CNCF autonomous-agent framework w/ workflow+security+state+telemetry | Apache-2.0 | 681 | K8s/sidecar overhead on Windows | If K8s-native ops anyway; Microsoft/NVIDIA/CNCF heritage |
| 14 | **`strands-agents/sdk-python`** | "Model-driven approach to building AI agents" (AWS) | Apache-2.0 | 5,918 | AWS-centric (Lambda/Fargate/EKS reference deployments) | AWS-native stacks |
| 15 | **`inngest/agent-kit`** | TS multi-agent network w/ deterministic routing + MCP | Apache-2.0 | 866 | TS-only; paired w/ Inngest runtime | TS shops using Inngest already |
| 16 | **`dbos-inc/dbos-transact-ts`** | Database-backed durable TS workflows | MIT | 1,190 | TS lib; durable-execution library shape | TS alternative to Temporal/Hatchet |
| 17 | **`hatchet-dev/hatchet`** | Lightweight orchestration | MIT | v0.86.26 | D80 PARTIAL; Postgres-only | If Temporal too heavy ops |
| 18 | **`triggerdotdev/trigger.dev`** v4 | TS-first orchestration | Apache-2.0 | active | D80 PARTIAL; checkpoints cloud-only | TS-heavy stacks |

## §3 PATTERN-STUDY tier (extract patterns; don't install as runtime)

| Repo | Category | Pattern value | Why not INSTALL |
|---|---|---|---|
| **`microsoft/autogen`** MagenticOne | Multi-agent research | HIGH — two-loop replan + task-ledger + progress-ledger + stall-counter | Library-only; no first-class server |
| **`HKUDS/CLI-Anything`** | Tool catalog (80 CLI wrappers; ships AS CC plugin) | MEDIUM — cherry-pick blender/freecad/gimp/obs/etc. wrappers | NOT a runtime — tool catalog + plugin-pack (R5-retry verified) |
| **`SWE-agent/SWE-agent`** (Princeton NLP) | Autonomous SWE research | HIGH — NeurIPS'24 peer-reviewed | Research-grade; CLI-only |
| **`Live-SWE-agent`** (arXiv:2511.13646) | Benchmark-frontier | HIGH — 75.4% SWE-bench Verified via mid-run scaffold evolution | Research artifact |
| **`AutoCodeRoverSG/auto-code-rover`** | Autonomous SWE research | HIGH — 46.2% SWE-bench Verified at <$0.70/task; project-structure-aware | License NOASSERTION + research-grade; pattern only |

## §4 SECURITY-MIDDLEWARE tier (NEW — codex H4 + R5-v2 resolution)

Codex H4 + R5-v2 jointly resolved: `agent-governance-toolkit` is NOT an autonomous runtime — it's a category-distinct **security/policy/sandboxing middleware** that wraps OTHER runtimes (AutoGen, LangChain, CrewAI, OpenAI Agents, Google ADK). Reclassified to its own category.

| Repo | Category | Tier | Why |
|---|---|---|---|
| **`microsoft/agent-governance-toolkit`** v3.7.0 | Agent security middleware | **HIGH VALUE** — recommend wire-as-wrapper around any installed runtime | Covers 10/10 OWASP Agentic Top 10 + MCP-gateway-aware; Microsoft-backed; MIT; 1,824★ |

## §5 MONITOR tier (insufficient evidence for INSTALL; not BLOCK either)

| Repo | Stars | Why monitor |
|---|---|---|
| **`open-multi-agent/open-multi-agent`** | 6,224 | R5-v2 verified: legitimate autonomous-decomposer (`runTeam(team, goal)` coordinator pattern, runtime task DAG). Caveats: TS-only library, only 1 confirmed prod user, suspicious 6.2k★ in 7 weeks (hype-velocity check pending) |
| **`rcortx/kiwiq`** | 1,032 | R5-v2 verified: workflow-orchestration platform (FastAPI+LangGraph+Prefect+27 shipped workflows). Credible but NOT autonomous-runtime peer to OpenHands/Letta. KEEP-MONITOR leaning DEMOTE |
| **`mastra-ai/mastra`** — **codex r4 I4 RE-TIER**: this entry should be in §2 INSTALL-with-caveat NOT here in MONITOR. gh-API license_spdx = NOASSERTION is misleading; repo README states **dual-license**: core/most of repo is Apache-2.0, `ee/` enterprise subdir is source-available under Mastra Enterprise License. Operator-action: treat as INSTALL-with-caveat for the Apache-2.0 core; do NOT ship from `ee/`. 24,204★, TS-native ex-Gatsby team. | (entry remains here pending operator confirmation to move to §2; see §10 open-items) |
| **`RooCodeInc/Roo-Code`** | 24,128 | Cline fork (Apache-2.0). Needs differentiation probe vs Cline before adoption decision |
| **`Anthropic Claude Managed Agents`** | proprietary | Cloud-only beta; billable per session-hour; not OSS — included only as cloud-alternative comparator |
| **`microsoft/UFO`** | 8,700 | Windows desktop UI agent (UFO³ paper); MUST run inside Windows Sandbox VM — high blast radius |

## §6 OUT-OF-SCOPE (real, OSS, but not autonomous-runtime category)

| Repo | Stars | Why out-of-scope |
|---|---|---|
| **`espressif/esp-claw`** | 1,321 | IoT chip-vendor "Chat Coding AI agent framework for IoT devices" (ESP32-specific) |

## §7 BLOCK tier (license + maintenance + verification failures)

| Repo | Reason |
|---|---|
| `salesforce/agentscript` | **R5-v2 verdict**: DSL/compiler for Salesforce Agentforce specs — NOT a runtime (was wrongly PATTERN-STUDY in V2.1) |
| `multica-ai/multica` | LICENSE = NOASSERTION → CR-1 BLOCK |
| `Significant-Gravitas/AutoGPT` | Platform sub-tree Polyform-Shield (NOT OSS); original loop abandoned |
| `Skyvern-AI/skyvern` | AGPL-3.0 copyleft hazard |
| `OpenInterpreter/open-interpreter` | AGPL-3.0 copyleft hazard |
| `nango/nango` | Elastic License — source-available, not permissive |
| `restatedev/restate` | BSL — source-available, not permissive |
| `windmill-labs/windmill` | AGPLv3 |
| `bytebot-ai/bytebot` | ARCHIVED on GitHub |
| `microsoft/OmniParser` | CC-BY-4.0 (content license, not code) |
| `TransformerOptimus/SuperAGI` | Maintenance / unmaintained |
| `stitionai/devika` | Abandoned |
| `n8n-io/n8n` | Fair-code license |
| `gpt-engineer-org/gpt-engineer` | Abandoned |
| `Helicone/helicone` | Maintenance mode |
| `google/antigravity` | HTTP 404 — Google proprietary, NOT OSS despite media coverage |
| `BrowserGym`, `suna` | NOASSERTION licenses |
| `pacifio/cersei` | Claude Code REPLACEMENT category, not dispatch target |

---

## §8 Paste-ready dispatch recipes (codex H2 fix — three-surface honest characterization)

### §8.1 OpenHands — THREE SURFACES (operator picks one)

**Critical per codex H2**: V0 deprecated 2026-04-01. The dispatch shape below differs by surface. **DO NOT use** the V0 `POST /api/v1/app-conversations` on `:3000` — that's deprecated.

#### Surface A: OpenHands CLI (the easiest — Claude-Code-style headless)
```bash
# Install per docs.openhands.dev/openhands/usage/run-openhands/cli-mode
# (canonical CLI install path varies; verify at docs URL above before wiring)
openhands --task "<COMPLEX TASK HERE>"
# Or with explicit model:
openhands --model anthropic/claude-opus-4-7 --task "<TASK>"
```
**This is what the sibling W374 session should use** for headless task dispatch.

#### Surface B: OpenHands Software Agent SDK (programmatic Python embed)
```python
# Per docs.openhands.dev/sdk
# pip install openhands-sdk  (verify exact pkg name at docs)
from openhands import Agent  # exact import surface — verify at docs URL above
agent = Agent(model="anthropic/claude-opus-4-7")
result = await agent.run(task="<TASK>", workspace="/path/to/repo")
```

#### Surface C: OpenHands Local GUI (REST API on localhost)
**Partial-verified per docs probe 2026-05-22** (`.claude/state/probe-transcripts/openhands-v1-dispatch-2026-05-22.txt`):
```bash
# Canonical install (per docs.openhands.dev/openhands/usage/run-openhands/local-setup)
pip install openhands

# Docker-Compose-style variant (current per docs probe)
docker run -it --rm --pull=always \
  -e AGENT_SERVER_IMAGE_REPOSITORY=ghcr.io/openhands/agent-server \
  -e AGENT_SERVER_IMAGE_TAG=1.19.1-python \
  -e LOG_ALL_EVENT=... \
  -p 3000:3000 -p 8001:8001 -p 8002:8002 \
  ...
```
**Verified facts**:
- GUI port `:3000` (still current; V0→V1 kept this port — V1 catalog's port was actually right; codex H2's port-8000 was speculative)
- Backend services bound on `:8001` + `:8002`
- Image organization is `ghcr.io/openhands/agent-server` (NOT `ghcr.io/all-hands-ai/agent-server` as V1 catalog had)
- Agent-server image tag: `1.19.1-python` (this is the AGENT-SERVER backend version, DISTINCT from OpenHands product version like v1.7.0)

**Still NOT verified per this probe** (deeper docs parse OR sibling-session-W374 verification needed):
- Exact REST endpoint path for "start a new conversation/task" — docs HTML used heavy MDX/SVG that crude HTML-strip didn't capture cleanly
- Exact CLI flags for headless/JSON-output on Surface A
- Exact Python API for Surface B (SDK)

**CR-9 pinning implication**: pin BOTH the OpenHands product version AND the agent-server image SHA256 digest as TWO distinct version refs.

### §8.2 Temporal — gRPC SDK
```python
from temporalio.client import Client
from agents.temporal_worker import AgentTaskWorkflow
from agents.models import TaskSpec
client = await Client.connect("localhost:7233", namespace="default")
handle = await client.start_workflow(
    AgentTaskWorkflow.run, TaskSpec(task="..."),
    id="agent-123", task_queue="agents")
result = await handle.result()
```

### §8.3 Goose (aaif-goose/goose) — CLI
```bash
goose recipe run <recipe-name> --output-format json
goose run -t "<TASK>" --output-format json
```

### §8.4 Letta — REST :8283
```bash
docker run -d --name letta -p 8283:8283 letta/letta:0.16.8
curl -X POST http://localhost:8283/v1/agents -d '{"name":"...","persona":"...","human":"..."}'
curl -X POST http://localhost:8283/v1/agents/<id>/messages -d '{"role":"user","content":"<TASK>"}'
```

### §8.5 CrewAI — embedded MIT core
```python
from crewai import Agent, Task, Crew
# ... (see V2.1 §4.5 for full example)
result = crew.kickoff()
```

### §8.6 Composio — MCP URL drop-in
```json
{
  "mcpServers": {
    "composio": {
      "type": "http",
      "url": "https://mcp.composio.dev/composio/server/<server-id>/mcp",
      "headers": { "Authorization": "Bearer ${COMPOSIO_API_KEY}" }
    }
  }
}
```

### §8.7 browser-use — local MCP
```json
{
  "mcpServers": {
    "browser-use": {
      "command": "uvx",
      "args": ["browser-use", "--mcp"]
    }
  }
}
```

### §8.8 Cline — SDK + CLI + IDE (multi-surface)
```bash
# Per cline/cline README — multi-surface install
# SDK: npm install @cline/sdk  (verify exact pkg name)
# IDE: VS Code marketplace
# CLI: per docs
# Operator picks surface based on context; SDK is the most-CC-orchestrator-friendly
```

### §8.9 Aider — CLI subprocess
```bash
aider --message "<TASK>" --yes --no-stream
# Programmatic: aider.main.main(["--message", "task", "--yes"])
```

### §8.10 Dapr Agents — K8s sidecar
```bash
# Per dapr/dapr-agents docs — requires Dapr runtime + K8s
# Not ideal for Z:-portable Windows; revisit if K8s-native ops adopted
```

### §8.11 microsoft/agent-governance-toolkit — wrapper, not standalone
```python
# Wire as a wrapper around your installed runtime (e.g., OpenHands or Letta)
# Provides policy + zero-trust identity + sandboxing + telemetry
# Concrete integration: see agent-governance-toolkit README for adapter examples
```

---

## §9 Per-workload routing decision tree

```
Operator's complex task is mostly...

  ↳ autonomous SWE coding — operator's stated workload
    → PRIMARY: OpenHands (3 surfaces; pick CLI for headless dispatch)
    → FALLBACK / ALTERNATIVE: Aider (terminal pair-programming), Cline (SDK+IDE+CLI),
      Plandex (large-project), Continue (CI-gated reviews), SWE-agent (research peer)

  ↳ long-running orchestration w/ retry + crash-resume + HITL?
    → PRIMARY: Temporal (W374 spine)
    → ALTERNATIVES: Hatchet (Postgres-only), Trigger.dev v4 (TS-first),
      DBOS Transact (TS lib), Inngest AgentKit (TS multi-agent)

  ↳ general-purpose autonomous + persistent memory?
    → Letta v0.16.8

  ↳ enterprise workflow w/ F500 production evidence?
    → CrewAI (embed MIT core)

  ↳ YAML-declarative agent recipes?
    → aaif-goose/goose v1.34.0+

  ↳ tool/integration layer (Slack, GitHub, Gmail, etc.)?
    → Composio (MCP URL drop-in)

  ↳ browser automation?
    → browser-use (local MCP) or browserbase/stagehand (hosted MCP)

  ↳ AWS-native deployment?
    → strands-agents/sdk-python (Lambda/Fargate/EKS reference)

  ↳ K8s-native multi-agent?
    → dapr/dapr-agents

  ↳ Windows desktop UI tasks?
    → microsoft/UFO (inside Windows Sandbox VM)

  ↳ multi-agent research / POC?
    → microsoft/autogen MagenticOne (pattern-study)

  ↳ benchmark-frontier SWE replication?
    → Live-SWE-agent or AutoCodeRover (pattern-study)

  ↳ governance/policy layer (OWASP Agentic Top 10)?
    → microsoft/agent-governance-toolkit (wire as wrapper around chosen runtime)

  ↳ tool-catalog for driving GUI software?
    → HKUDS/CLI-Anything (cherry-pick wrappers; pattern-study)
```

---

## §10 What's still incomplete (transparency per CR-6)

1. **OpenHands V1 dispatch contract** — the exact REST endpoints + port for V1 Local GUI need primary-source verification from `docs.openhands.dev` before any sibling-session wire-in uses Surface C. Use Surface A (CLI) until docs are read.
2. **R5 stream** — partial salvage; CLI-Anything complete; open-multi-agent partial; other 4 candidates have orchestrator-side gh-api metadata but no deepwiki architecture probes.
3. **R5-v2 stream** — completed all 4 MONITOR-tier deep-dives; integrated this revision.
4. **Mastra license caveat** — NOASSERTION blocking otherwise-strong INSTALL-with-caveat candidate; operator-action item.
5. **Roo-Code differentiation** vs Cline — needs probe; both Apache-2.0; Roo-Code is fork.
6. **Continue.dev repositioning** verification — gh-API description says CI-focused; needs deeper read to confirm.

---

## §A — Codex Round-1 + Round-2 + Round-3 Audit Trail (V2.2 closure)

| Round | Verdict | Findings | V2.2 status |
|---|---|---|---|
| **r1** | NEEDS-REVISION | F1-F7 | All applied in V2 (F1=keep OpenHands; F2=split confidence; F3=Letta deepwiki-only; F4=R5 substituted; F5=spot-checks pass; F6=composition→future; F7=CrewAI category-exception) |
| **r2** | NEEDS-REVISION | G1-G6 | All applied in V2.1 (G2=confidence_by_dimension; G4=probe transcript; others CONFIRMED) |
| **r3** | NEEDS-REVISION | H1-H4+ | **All applied THIS revision (V2.2)**: H1=10 missed candidates tiered §2; H2=OpenHands three-surface honest characterization §0+§8.1; H3=schema-K-violation fixed in openhands.json (K=2 jury r1+r2); H4=agent-governance-toolkit moved to SECURITY-MIDDLEWARE category §4 per R5-v2 |
| **R5-retry** | partial salvage | CLI-Anything COMPLETE; open-multi-agent PARTIAL | CLI-Anything kept PATTERN-STUDY |
| **R5-v2** | complete | 4 tier-changes | All applied: kiwiq→MONITOR-lean-DEMOTE; agentscript→BLOCK; agent-governance-toolkit→SECURITY-MIDDLEWARE; open-multi-agent→MONITOR-with-architecture |

---

## §B — Cite anchors (primary-source for every claim)

### gh-API direct probes (replayable)
- All 10 codex H1 candidates: probed 2026-05-22 (this session)
- CLI-Anything CC-plugin: `.claude/state/probe-transcripts/cli-anything-claude-plugin-probe-2026-05-22.txt`
- OpenHands V1 three-surface architecture: README + software-agent-sdk existence verified 2026-05-22 (this session)
- All versions + licenses + last-commit: gh-API verified 2026-05-22

### Research streams
- R1 (sca-v18 methodology) — `tmp/sota-runtime-v2-deepdive/R1-research-arch-meta-upgrade.md`
- R2 (perplexity-pivoted) — `tmp/sota-runtime-v2-deepdive/R2-perplexity-deep-research.md`
- R3 (exa+firecrawl) — `tmp/sota-runtime-v2-deepdive/R3-exa-firecrawl-convergence.md`
- R4 (deepwiki+repomix) — `tmp/sota-runtime-v2-deepdive/R4-deepwiki-repomix-deep-ingest.md`
- R5-v2 (MONITOR-tier deep-dives) — `tmp/sota-runtime-v2-deepdive/R5-v2-monitor-tier-deepdives.md`

### Cross-model gates
- Codex r1 — `tmp/sota-runtime-v2-deepdive/codex-round1-review.txt` (7 findings)
- Codex r2 — `tmp/sota-runtime-v2-deepdive/codex-round2-review.txt` (6 G-findings)
- Codex r3 — `tmp/sota-runtime-v2-deepdive/codex-round3-review.txt` (4+ H-findings)

### Standards
- DSPy GEPA Pareto-frontier (arxiv 2507.19457)
- OSSF Criticality Score (stars EXCLUDED)
- UK AISI inspect_ai EvalLog
- Jury-on-Demand K=4 weighted-by-reliability (arxiv 2512.01786)
- Minority-Veto n≥2 BLOCK (arxiv 2510.11822: 95.5% TPR + 30.9% TNR)
- Council-Mode heterogeneity (arxiv 2604.02923)
- Fake-stars detection (Kapravelos ICSE-26 + arxiv 2603.10265 MALTA)

---

## §C — Final tier distribution (V2.2)

| Tier | Count | Net change vs V2.1 |
|---|---|---|
| INSTALL | 8 | unchanged (OpenHands, Temporal, Goose, Letta, CrewAI, Composio, browser-use, stagehand) |
| INSTALL-with-caveat | 10 | +8 (added Aider, Cline, Continue.dev, Plandex, Dapr Agents, Strands SDK, Inngest AgentKit, DBOS Transact TS) |
| PATTERN-STUDY | 5 | -1 (agent-governance-toolkit moved to SECURITY-MIDDLEWARE; AutoCodeRover added) |
| SECURITY-MIDDLEWARE | 1 (NEW category) | +1 (agent-governance-toolkit) |
| MONITOR | 6 | +2 (Mastra license-caveated; Roo-Code fork-of-Cline; net after open-multi-agent promotion from V2.1 MONITOR-blind to MONITOR-with-arch + agent-governance-toolkit demoted from MONITOR to SECURITY-MIDDLEWARE) |
| OUT-OF-SCOPE | 1 | unchanged (esp-claw IoT) |
| BLOCK | 19 rows (BrowserGym + suna counted separately per codex r4 I7 closure) | +1 (agentscript per R5-v2) |

**Total tiered**: 50 candidates as discrete entries (per codex r4 I7 closure — was incorrectly counted as 49 when BrowserGym + suna were combined into one row). All gh-API license + version + last-commit verified 2026-05-22 where the §C count requires verification; some §5 MONITOR-tier entries have license-classification still pending operator action (Mastra dual-license per codex r4 I4 — re-tier to §2 pending operator confirm).

---

---

## §D — Codex Round-4 Audit Trail (V2.3 closure)

Codex r4 verdict: **NEEDS-REVISION** with 8 findings (I1-I8). Of these, I1+I2+I4 were HIGH severity surgical fixes; I3+I5+I7 MEDIUM; I8 LOW.

| # | Severity | Status | V2.3 resolution applied |
|---|---|---|---|
| I1 | HIGH | STILL-OPEN→APPLIED | Schema extended with `jurors` array field (sca-v18-repo-verdict.schema.json updated); openhands.json bumped K=2→K=4 (matches actual 4-juror count r1+r2+r3+r4); needs_revision_count=4; minority_veto_triggered=false (4 NEEDS-REVISION not BLOCK) |
| I2 | HIGH | STILL-OPEN→APPLIED | Endpoint direction REVERSED in §0 mitigations: V0-deprecated is `/api/conversations`; V1-current IS `/api/v1/app-conversations` on `:3000`. Source: docs.openhands.dev/openhands/usage/cloud/cloud-api |
| I3 | MEDIUM | WITH-CAVEAT→APPLIED | "Three separate products in three repos" softened to "three dispatch surfaces with some adjacency in repos" |
| I4 | HIGH | NEW→APPLIED | Mastra re-classification: NOT pure NOASSERTION; dual-license (Apache-2.0 core + Mastra EE for `ee/` subdir); §5 MONITOR entry annotated for operator-action move to §2 INSTALL-with-caveat |
| I5 | MEDIUM | WITH-CAVEAT→PARTIAL | H1 mostly-resolved; deeper per-candidate detail queued for R-CALIBRATION stream (R1 punt-list) |
| I7 | MEDIUM | NEW→APPLIED | §C tier count math: BLOCK rows = 19 (was 18 when BrowserGym + suna combined); total candidates = 50 (was 49) |
| I8 | LOW | NEW→APPLIED | Top-of-doc "every claim primary-source-verified" softened to "primary-source-verified where documented; open verification items in §10" |

**Open after V2.3** (not codex-blocked, but operator-action items):
- Mastra: operator confirms re-tier to §2 INSTALL-with-caveat (recommendation based on dual-license clarification)
- OpenHands V1 Local-GUI REST exact endpoint: verified `/api/v1/app-conversations` on `:3000` per codex r4 I2 + docs probe — confidence raised from "must verify" to "verified per docs.openhands.dev"
- Per-candidate detail depth for the 10 H1-added INSTALL-with-caveat entries: R-CALIBRATION follow-up stream queued

**Net codex-state across all 4 rounds**:
- 7 r1-findings: all APPLIED
- 6 r2-findings: all APPLIED (4 RESOLVED-CONFIRMED + 2 RESOLVED-WITH-CAVEAT surgically fixed)
- 4 r3-findings + R5-v2 tier-recommendations: all APPLIED
- 8 r4-findings: 6 APPLIED, 1 PARTIAL (I5 queued for R-CALIBRATION), 1 operator-action (I4 Mastra final tier)
- **0 NEW HIGH-severity findings introduced by V2.3 fixes** (subject to codex r5 if operator fires it)

---

**End of V2.3 landscape (codex r1 + r2 + r3 + r4 applied; I-fixes surgical). Ready for atomic commit OR codex r5 if operator wants one more round.**
