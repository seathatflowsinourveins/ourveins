---
title: Wave 218 Install Playbook — Z:\claude-sota-pure canonical SOTA stack install order
status: READY-FOR-EXECUTION
date: 2026-05-15
agent: orchestrator (post-W217-F3-7-cohort-consolidation)
wave: W218
verdict_one_line: "READY: 16 ADOPT-NOW install rows + 5 STUDY-PILOT.b queue per W217-F3 unified catalog (BRIDGE-MODE 7-cohort scoring)"
---

# Wave 218 Install Playbook — Z:\claude-sota-pure canonical SOTA stack

## §0 Scope & authority

This playbook converts the **W217-F3 unified catalog §6 ADOPT-NOW tier (16 repos) + STUDY-PILOT.b tier (5 repos)** into actionable install commands for `Z:\claude-sota-pure` (per user directive 2026-05-15: "directly install them and e2e with advanced agent team, make sure every layers unleashed performance with sota harness").

Authority chain (cardinal-rule-1 compliant — TIER-1-DIRECT or TIER-3-LOCAL-COMPOSITION with constituent anchors):
- Scoring source: `tmp/wave217-fire3-UNIFIED-CATALOG-2026-05-15.md §6` (7-cohort BRIDGE-MODE Path P codex T1 fresh-scoring; n=37 strategic repos)
- Cross-model gate: satisfied via REAL GPT-5.5 codex T1 BRIDGE-MODE Path P foreground+tee dispatches per `cross-model-consensus.md §The contract` + Pattern D recovery family
- Install discipline: per `CLAUDE.md` cardinal-rules 5+6+9+10+11+12 (install-priority + official-native-channel + install-risk + research-first + META-process-SOTA + upstream-install-priority)
- Provenance: append-only to `Z:\claude-sota-pure\docs\install-provenance.md` per CR-9 install-risk discipline
- Manifest: per-row update to `Z:\claude-sota-pure\docs\sota-installed-manifest.md`

## §1 Install order rationale (wiring difficulty ascending)

Per CR-9 install-risk discipline + cycle-300 ONE-LOGICAL-UNIT-PER-FIRE: install in wave-batches of 3-4 atomic units; cross-model T1+T2+T3 lifecycle on each install commit; verify SOTA cite anchor + LICENSE re-pin before commit.

### §1.1 Wave 218 Fire 1 — Foundation marketplaces (wire 1, 4 repos)

| # | Repo | Install command | Cite anchor | Smoke probe | Rollback |
|---|---|---|---|---|---|
| W218-F1-1 | `anthropics/claude-plugins-official` | `/plugin marketplace add anthropics/claude-plugins-official` then `/plugin install <plugin-name>@official` for selected plugins | `https://github.com/anthropics/claude-plugins-official @ HEAD b664e152af57 [VERIFIED via codex W217-F3-plugin-marketplace conf=0.86]` | `/context all` shows official-marketplace registered; `claude plugin details <plugin>` returns metadata | `git revert <install-commit-sha>` + `/plugin marketplace remove anthropics/claude-plugins-official` |
| W218-F1-2 | `wshobson/agents+commands` | `/plugin marketplace add wshobson/agents` then `/plugin install agents@wshobson` + similarly `wshobson/commands` | `https://github.com/wshobson/agents @ HEAD 112197c6bfd0a1ab10d374e85a2f5efa4757b77d` + `https://github.com/wshobson/commands @ HEAD 27d3e77b1a844223721f6c983ddf261ac4441b89` | `Skill <wshobson-skill>` returns valid skill content; agent dispatch works | `/plugin marketplace remove wshobson/agents` + revert |
| W218-F1-3 | `addyosmani/agent-skills` | `/plugin marketplace add addyosmani/agent-skills` then `/plugin install agent-skills@addy-agent-skills` | `https://github.com/addyosmani/agent-skills/blob/main/.claude-plugin/marketplace.json#L273-L308 @ HEAD UNKNOWN-RE-PIN-NEEDED` | `Skill <addy-skill>` returns valid skill content; `/plugin details` shows MIT license | revert |
| W218-F1-4 | `doobidoo/mcp-memory-service` | `pip install git+https://github.com/doobidoo/mcp-memory-service.git` then `.mcp.json` entry per existing pattern in `Z:\claude-sota-installed\.mcp.json` | `https://github.com/doobidoo/mcp-memory-service README.md:5-15,37-54,82-93,165-181 + LICENSE:1 @ HEAD 5f6d31753076dab592f3fbfbca62bba869545700` | `mcp__memory__memory_store(content="W218-F1-4 smoke test")` returns success | `pip uninstall mcp-memory-service` + revert |

### §1.2 Wave 218 Fire 2 — ACP + Observability + Token-opt (wire 1-3, 5 repos)

| # | Repo | Install command | Cite anchor | Smoke probe | Rollback |
|---|---|---|---|---|---|
| W218-F2-1 | `agentclientprotocol/claude-agent-acp` | `npm install -g @agentclientprotocol/claude-agent-acp@latest` | `https://github.com/agentclientprotocol/claude-agent-acp lines 266-283,296-324 @ HEAD 925865216927eb45a5c5877b21dd7373f5b0193a` | `claude-agent-acp --version` returns version; ACP socket binds | `npm uninstall -g @agentclientprotocol/claude-agent-acp` |
| W218-F2-2 | `agentclientprotocol/python-sdk` | `pip install agentclientprotocol` (verify package name on PyPI) | `https://github.com/agentclientprotocol/python-sdk lines 281-305,320-329,351-382 @ HEAD 5271d749f4d525899509b2b895e334908873fb93` | `python -c "import agentclientprotocol; print(agentclientprotocol.__version__)"` returns version | `pip uninstall agentclientprotocol` |
| W218-F2-3 | `langfuse/langfuse` | `docker pull langfuse/langfuse:latest` + docker-compose per official docs at https://langfuse.com/self-hosting | `https://github.com/langfuse/langfuse#readme lines 150-155,399-412,426-433 @ HEAD 352cdf323ff8d1a9e21dd8925bf0580bb82eb447` (MIT-core w/ EE exception) | `curl http://localhost:3000/api/public/health` returns `{"status":"OK"}` | `docker compose down && docker rmi langfuse/langfuse:latest` |
| W218-F2-4 | `microsoft/LLMLingua` | `pip install llmlingua` | `https://github.com/microsoft/LLMLingua lines 293-307,400-420,503-515,532-548 @ HEAD e0e9d99beb94098bbd924aa53c2c112eac41c758` | `python -c "from llmlingua import PromptCompressor; pc = PromptCompressor(); print(pc.compress_prompt('test'))"` returns compression result | `pip uninstall llmlingua` |
| W218-F2-5 | `shcherbak-ai/contextgem` | `pip install contextgem` | `https://github.com/shcherbak-ai/contextgem lines 150-155,533-535,583-599 @ HEAD d31558aeeacff5f98bb1cb99a08243aa084c928e` | `python -c "import contextgem; print(contextgem.__version__)"` returns version | `pip uninstall contextgem` |

### §1.3 Wave 218 Fire 3 — Memory L3 + ECC + RAG-e2e light (wire 2-3, 3 repos)

| # | Repo | Install command | Cite anchor | Smoke probe | Rollback |
|---|---|---|---|---|---|
| W218-F3-1 | `getzep/graphiti` (with FalkorDB) | `docker run -d --name falkordb -p 16379:6379 falkordb/falkordb:latest` + `pip install graphiti-core[falkordb]` + clone `graphiti/mcp_server/` + add to `.mcp.json` per existing claude-sota-installed wiring | `https://github.com/getzep/graphiti mcp_server/README.md:10-27,62-75,107-117,229-238 + LICENSE:1 @ HEAD 9a2d6d02bf0d210e1e6f5f8fea1a2cbe00e3c898` (Apache-2.0; SUSTAINED-MAINTENANCE) | `redis-cli -p 16379 PING` returns `PONG`; `mcp__graphiti__add_memory(group_id="eee", name="smoke", episode_body="W218-F3-1")` returns success | `docker stop falkordb && docker rm falkordb && pip uninstall graphiti-core` |
| W218-F3-2 | `affaan-m/everything-claude-code` (ECC) | `/plugin marketplace add affaan-m/everything-claude-code` then `/plugin install everything-claude-code@ECC` (skill subset) | `https://github.com/affaan-m/everything-claude-code/blob/main/.claude-plugin/marketplace.json#L335-L370 @ HEAD UNKNOWN-RE-PIN-NEEDED` | `Skill <dmux-workflows>` OR `Skill <autonomous-agent-harness>` returns valid skill content | `/plugin marketplace remove affaan-m/everything-claude-code` |
| W218-F3-3 | `llmware-ai/llmware` | `pip install llmware` | `https://github.com/llmware-ai/llmware @ HEAD 9b91fc515615f82716a400d8aae63c5773ee16d4` (Apache-2.0; 7-org Axis-1 PASS-FIRM) | `python -c "from llmware.library import Library; lib = Library(); print(lib)"` returns library instance | `pip uninstall llmware` (also remove any small-LLM model bundles) |

### §1.4 Wave 218 Fire 4 — Memory KG NEW + RAG-e2e heavy (wire 3-5, 3 repos)

| # | Repo | Install command | Cite anchor | Smoke probe | Rollback |
|---|---|---|---|---|---|
| W218-F4-1 | `topoteretes/cognee` | `pip install cognee` (verify Apache-2.0 license at install time per Wave 217 license-correction finding) | `https://github.com/topoteretes/cognee README.md:67,108-113,179-204 + LICENSE:1 @ HEAD 4ca1d0c2bbbb46924acb1f5f6cd805214805ca16` (Apache-2.0 verified — supersedes prior AGPL audit) | `python -c "import cognee; print(cognee.__version__)"` returns version; cognee.add(...) returns KG node ID | `pip uninstall cognee` |
| W218-F4-2 | `onyx-dot-app/onyx` | `docker compose -f docker-compose.dev.yml up -d` per official docs at https://docs.onyx.app/quickstart | `https://github.com/onyx-dot-app/onyx @ HEAD ad5c54a1a9772741faa22c10abddadebcf5c4783` (MIT — **VERIFY CE/EE split before commit per W217-F3 RAG-e2e cohort caveat**) | `curl http://localhost:3000/api/health` returns OK | `docker compose down --volumes` |
| W218-F4-3 | `infiniflow/ragflow` | `docker compose -f docker/docker-compose.yml up -d` per official docs at https://ragflow.io | `https://github.com/infiniflow/ragflow @ HEAD 09d45046e5f46fb2300f8860a3819568d71916d3` (Apache-2.0; 80.6K★; heaviest server-mode tax) | `curl http://localhost:9380/v1/version` returns version | `docker compose down --volumes && docker volume prune` |

### §1.5 Wave 218 Fire 5 — Workflow engine (wire 4, 1 repo)

| # | Repo | Install command | Cite anchor | Smoke probe | Rollback |
|---|---|---|---|---|---|
| W218-F5-1 | `temporalio/temporal` | `docker compose -f docker-compose-postgresql.yml up -d` per https://docs.temporal.io/dev-guide + Temporal Python SDK `pip install temporalio` | `https://docs.temporal.io/ @ Temporal Server v1.x (verify latest at install time)` (MIT; SUSTAINED-MAINTENANCE; 5-org Axis-1 PASS-FIRM) | `temporal --version` returns version; `temporal namespace list` succeeds | `docker compose down --volumes && pip uninstall temporalio` |

## §2 STUDY-PILOT.b queue (5 repos — 5-clause demand-gate check BEFORE install)

These require explicit operator approval after demand-gate verification per `Z:/claude-sota/.claude/rules/ahfv-probe-dag.md §Probe 7.b`. DO NOT install directly without 5-clause check.

| # | Repo | 5-clause check needed | Trigger condition | Pilot scope |
|---|---|---|---|---|
| W218-SP-1 | `langchain-ai/langgraph` | named-use-case (stateful long-horizon agent) + cited-input-path (TBD) + wiring-path (LangChain SDK shim) + incumbent-comparison (vs CC Agent tool) + reversible-time-box (30d) | If/when stateful workflow demand surfaces beyond CC Agent tool | 30-day pilot; one specific workflow consumer |
| W218-SP-2 | `alirezarezvani/claude-skills` | named-use-case (engineering/biz-growth/c-level skill domains) + input-path (marketplace.json) + wiring (/plugin install) + incumbent (wshobson+addy+ECC) + reversible (30d) | If/when domain-specific skill subset is needed beyond wshobson+addy coverage | Specific skill subsets only (NOT full marketplace) |
| W218-SP-3 | `OpenSPG/KAG` | named-use-case (logical-reasoning RAG) + input (TBD) + wiring (Apache-2.0 stack) + incumbent (vs Graphiti+Cognee) + reversible (30d) | If/when logical-reasoning RAG workflow demand surfaces | Distinct from Graphiti+Cognee KG namespace |
| W218-SP-4 | `openlit/openlit` | OTel-native instrumentation + input (OTel collector) + wiring (Apache-2.0 SDK) + incumbent (vs Langfuse) + reversible (30d) | If/when OTel-native workflow demand surfaces beyond Langfuse | Lightweight SDK path only (NOT full UI stack) |
| W218-SP-5 | `obra/superpowers` (pinned subset) | 6-skill vendor subset per `team-orch-frameworks.md` — already partially applied at sibling claude-sota; cite-import to claude-sota-pure | Selective vendor of plan/debug/tdd/verification/subagent-driven/code-review | NOT full marketplace add — vendored cite-import only |

## §3 Smoke probe templates per cohort

### §3.1 CC marketplace install verification
```bash
# After /plugin marketplace add + /plugin install:
claude plugin list | grep <plugin-name>
claude plugin details <plugin-name>  # verify metadata + license
/context all  # verify plugin appears in active context
```

### §3.2 MCP server install verification
```bash
# After .mcp.json entry + restart:
cat Z:/claude-sota-pure/.mcp.json | jq '.mcpServers."<server-name>"'
# Then in claude session:
# Use mcp__<server>__<tool> primitive — verify response
```

### §3.3 Python package install verification
```bash
Z:/venvs/claude/Scripts/pip show <package>  # verify install
Z:/venvs/claude/Scripts/python -c "import <package>; print(<package>.__version__)"
```

### §3.4 Docker service install verification
```bash
docker ps --format '{{.Names}}\t{{.Status}}' | grep <service>
curl -fsSL http://localhost:<port>/health  # or service-specific health endpoint
```

## §4 Rollback predicates per CR-9 install-risk discipline

For every install commit, define explicit rollback predicate:

```yaml
install_commit_sha: <sha>
predicate_smoke_fails: |
  # If smoke probe returns non-success within 60s after install, rollback:
  git revert <install-commit-sha>
  <uninstall-command-from-table>
  rm <any-state-files-created>
predicate_license_drift: |
  # If LICENSE re-probe at HEAD returns non-permissive (AGPL/GPL/proprietary), rollback:
  git revert <install-commit-sha>
  <uninstall-command>
predicate_namespace_collision: |
  # If post-install /plugin list shows duplicate skill/agent vs incumbent, rollback:
  /plugin uninstall <duplicate>
  git revert <install-commit-sha>
```

## §5 Manifest population

For each install commit, append a row to `Z:\claude-sota-pure\docs\sota-installed-manifest.md` Section N:

```markdown
| section | repo | version | install_command | cite_anchor | smoke_status | install_date | rollback_predicate | CR-8 status |
|---|---|---|---|---|---|---|---|---|
| W218-F1 | wshobson/agents | v1.x | /plugin marketplace add ... | https://github.com/wshobson/agents @ 112197c6 | PASS | 2026-05-15 | revert+remove-marketplace | ADAPTED-FROM-SOTA |
```

## §6 Provenance log

Append to `Z:\claude-sota-pure\docs\install-provenance.md`:

```markdown
## Wave 218 — W217-F3 unified-catalog install batch

### Authority
- Source: tmp/wave217-fire3-UNIFIED-CATALOG-2026-05-15.md §6 (7-cohort BRIDGE-MODE Path P codex T1 scoring)
- Cross-model gate: REAL GPT-5.5 codex T1 BRIDGE-MODE Path P foreground+tee per cmc-t1-t7-lifecycle.md §The contract Phase 1 bootstrap exception
- Multi-source discovery breadth: codex T1 used GitHub API + WebFetch (LICENSE/README direct) + repo file:line cites — Wave 218 should expand to ≥4 distinct source families per multi-source-discovery-breadth-discipline.md §The rule

### Fire 1 (4 install rows)
| Commit | Repo | Verdict | Smoke | Rollback |
| ... | ... | ... | ... | ... |
```

## §7 E2E plan with advanced agent team (Wave 219)

Per user directive "e2e with advanced agent team, make sure every layers unleashed performance with sota harness":

### §7.1 Wave 219 Fire 1 — End-to-end fan-out demonstration
Dispatch 3-agent BRIDGE-MODE team per `advanced-agent-team-standing-directive.md`:
- **Agent A (sota-researcher)**: Verify installed primitives across all 16 ADOPT-NOW rows via Probe DAG 1-7
- **Agent B (codex-rescue BRIDGE-MODE)**: Cross-model T2 verification of install commits via codex CLI subprocess
- **Agent C (architect)**: Design e2e demonstration scenario exercising memory + RAG + orch + token-opt + obs layers in single fire

### §7.2 Wave 219 Fire 2 — Performance baseline
- Memory layer: store + retrieve via mcp-memory + graphiti + cognee in parallel; measure write/read latency
- RAG-e2e layer: query via llmware + onyx + ragflow in parallel; measure recall + precision
- Orchestration layer: parallel-agent-wave with 3 BRIDGE-MODE agents; measure throughput
- Token-opt layer: LLMLingua + contextgem compression on synthetic prompt; measure compression ratio + quality
- Observability layer: langfuse trace ingestion; measure trace completeness

### §7.3 Wave 219 Fire 3 — Closure synthesis
- Update `Z:\claude-sota-pure\docs\install-provenance.md` Wave 219 row with E2E test results
- Update `Z:\claude-sota-pure\docs\sota-installed-manifest.md` smoke_status column to PASS for all 16 rows
- Codify Wave 217-219 arc in close-synthesis document

## §8 Pre-install staleness queue (BLOCK before W218-F1 commit per Agent α §5)

Resolve THESE FIRST (P0+P1 license-verify + HEAD-SHA pin refresh):

| Severity | Repo | Action needed |
|---|---|---|
| **P0** | `anthropics/claude-agent-sdk-typescript` | License-verify Commercial-ToS UNVERIFIED — read LICENSE at HEAD + classify per cmc-verdict-shapes.md §Severity taxonomy |
| **P1** | `modelcontextprotocol/servers` | No HEAD SHA pin in prior catalogs — fresh-pin via `mcp__github__get_file_contents` |
| **P1** | `addyosmani/agent-skills` HEAD SHA | Pin via `mcp__github__get_file_contents path=.claude-plugin/marketplace.json` |
| **P1** | `affaan-m/everything-claude-code` HEAD SHA | Pin via same |
| **P1** | `alirezarezvani/claude-skills` HEAD SHA | Pin via same |
| **P1** | `obra/superpowers` HEAD SHA | Pin via same (for pinned-subset cite) |
| **P1 migration** | `harbor-framework/terminal-bench` 113d stale | Migrate to `laude-institute/harbor` v2 OR drop from prior catalog references |
| **P1 license-dispute** | `mksglu/context-mode` ELv2 cross-check | Re-probe LICENSE at HEAD; W223-V disagrees with W218-P/W222-U |

## §9 Wave 217+218 arc summary

| Metric | Value |
|---|---|
| **Strategic repos fresh-scored (BRIDGE-MODE)** | 37 across 7 Path P codex T1 cohorts |
| **ADOPT-NOW final** | 16 |
| **STUDY-PILOT.b queue** | 5 |
| **DEMOTED tier (don't install standalone)** | 6 |
| **REJECT-FOR-FIT (license traps caught)** | 11 (8 license-blocker: AGPL OpenViking/WrenAI + BSL Restate + SSPL Inngest + ELv2 Phoenix) |
| **Cross-model gate satisfaction** | REAL GPT-5.5 via codex CLI 0.130.0 Path P foreground+tee × 7 calls |
| **License-trap catches saved** | ~8 wrong-install-and-revert cycles (~30-60 min each = ~4-8 hours saved) |
| **Agent α gap-analysis catches** | 15 category gaps + 8 scoring-method drift + 12 staleness candidates |
| **FM-17.b recovery** | Path D BRIDGE-MODE-subagent autocompact-thrash → Path P orchestrator-direct (n=2 same-arc reverted, switched to working recipe at n=13 family evidence) |
| **Forward action** | Wave 218 install playbook (16 rows + 5 STUDY queue) → Wave 219 E2E with advanced agent team |
