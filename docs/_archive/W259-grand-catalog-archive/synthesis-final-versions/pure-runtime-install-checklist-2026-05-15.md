---
title: "Wave 253 — Z:\\claude-sota-pure 14-Tier Install Checklist"
date: 2026-05-15
status: INSTALL-ARCHITECTURE-AUTHORITATIVE
wave: W253
target-runtime: "Z:\\claude-sota-pure"
sources: ["03-scoring-matrix/scoring-matrix-95repos-2026-05-15.md", "01-codex-bridge-verdicts/adversarial-review-codex-gpt5.5-2026-05-15.md §7"]
verdict: "EXECUTION-READY for Tier-A; Tier-B gated on Wave-254 P0 license/namespace probes"
---

# Wave 253 — Z:\claude-sota-pure 14-Tier Install Checklist

The comprehensive install architecture for the pure SOTA Claude Code runtime. Tier order = ascending wired-difficulty (codex adversarial §7). Every install uses CR-6 official-native-channel only. **Tier-A** = default runtime mutation (permissive license, verified native path, low collision). **Tier-B** = broad coverage / pilots / cite-class / blocked-license.

**Wired-difficulty key**: P0=`/plugin install` one-line · P1=npm/pip install + `.mcp.json` wire · P2=clone+build · P3=custom integration.

## Pre-flight gates (run BEFORE Tier 4+)

1. **Namespace-collision gate** — before installing any orchestration plugin, probe for `<plugin>:<skill-or-agent-name>` collisions. 6 known conflict pairs (codex adversarial §5): claude-plugins-official↔everything-claude-code (11 names), wshobson/agents↔oh-my-claudecode (3), wshobson/agents↔claude-plugins-official (security-auditor+), oh-my-claudecode↔claude-plugins-official (2), oh-my-claudecode↔everything-claude-code (3), wshobson/agents internal (4). **Install superpowers + SELECTED wshobson plugins only; do NOT bulk-install marketplaces.**
2. **License-class gate** — every install row carries a verified D4 license. ELv2/SSPL/AGPL → Tier-B or operator-override-with-disclosure, never silent Tier-A.
3. **CR-9 REVERT-grep** — `git -C Z:/claude-sota-pure log --all --oneline --grep='<candidate>'` before each install — detect prior REVERT-AND-REMOVE precedents.

---

## TIER 1 — Bootstrap skeleton  [STATUS: DONE]

`Z:\claude-sota-pure` already scaffolded (CLAUDE.md, AGENTS.md, PROGRESS.md, .gitignore, .claude/, .mcp.json, tools/, bin/). No action.

## TIER 2 — Claude Code core + official marketplace discovery  [Tier-A · P0]

| Repo | Install command | Wired | Smoke probe | Rollback |
|---|---|---|---|---|
| anthropics/claude-code | (runtime base — already present) | — | `claude --version` | n/a |
| anthropics/claude-plugins-official | `/plugin marketplace add anthropics/claude-plugins-official` | P0 | `/plugin marketplace list` shows official | `/plugin marketplace remove` |

## TIER 3 — Safety floor  [Tier-A · P1]

Install BEFORE any methodology plugins — the deny-destructive + secret-scan floor.

| Repo | Install command | Wired | Smoke probe | Rollback |
|---|---|---|---|---|
| gitleaks/gitleaks (27,001★ MIT) | `gh release download --repo gitleaks/gitleaks $(gh release list --repo gitleaks/gitleaks -L1 --json tagName -q '.[0].tagName')` → place binary on PATH | P1 | `gitleaks version` | remove binary |
| pre-commit/pre-commit (15,277★ MIT) | `pip install pre-commit` then `pre-commit install` | P1 | `pre-commit --version` | `pip uninstall pre-commit` |
| (deny-destructive Bash hook) | hand-author per `layered-gates-architecture.md §4.1` safety_guard pattern | P3 | hook fires on `rm -rf /` | revert settings.json |

WIN: `gitleaks` (composite 4.59). `lefthook` = faster duplicate (skip unless pre-commit perf is an issue).

## TIER 4 — Primary methodology  [Tier-A · P0, AFTER namespace gate]

| Repo | Install command | Wired | Smoke probe | Rollback |
|---|---|---|---|---|
| obra/superpowers (192,910★ MIT) | `/plugin marketplace add obra/superpowers` then `/plugin install superpowers` | P0 | `Skill using-superpowers` returns content | `/plugin marketplace remove` |
| wshobson/agents (35,459★ MIT) | `/plugin marketplace add wshobson/agents` then `/plugin install <SELECTED-plugin>@wshobson` (granular — NOT whole marketplace) | P0 | agent dispatch works | `/plugin marketplace remove` |

WIN: `obra/superpowers` (composite 4.80) — methodology spine. `wshobson/agents` — install only the granular plugins that pass the namespace gate.

## TIER 5 — Narrow official Anthropic plugins  [Tier-A · P0, AFTER collision probe]

From `claude-plugins-official`: `skill-creator`, `plugin-dev`, `mcp-server-dev`, `pr-review-toolkit`, `feature-dev` — install each ONLY if no namespace collision.

| Install command | Wired | Smoke probe |
|---|---|---|
| `/plugin install <plugin>@official` per plugin | P0 | `/plugin list` shows plugin; no duplicate skill names |

## TIER 6 — MCP foundation  [Tier-A · P1]

| Repo | Install command (`.mcp.json` stdio) | Wired | Smoke probe |
|---|---|---|---|
| github/github-mcp-server (29,868★ MIT) | official GitHub MCP — remote MCP config; enable `secret_protection` + `run_secret_scanning` toolsets | P1 | `mcp__github__*` tools listed |
| modelcontextprotocol/servers (85,719★) | package-pinned: `@modelcontextprotocol/server-filesystem`, `-git`, `-fetch`, `-time`, `-sequential-thinking` — read-only defaults | P1 | each server responds; **pin per-package license** (Python pkgs MIT, TS pkgs inherit transition text) |

## TIER 7 — Browser / debug MCP  [Tier-A · P1]

| Repo | Install command | Wired | Smoke probe |
|---|---|---|---|
| microsoft/playwright-mcp (32,564★ Apache) | `npm install -g @playwright/mcp@<pinned>` → `.mcp.json` stdio `node .../cli.js` | P1 | `mcp__playwright__*` tools |
| ChromeDevTools/chrome-devtools-mcp (39,719★ Apache) | `npm install -g chrome-devtools-mcp@<pinned>` → `.mcp.json` `--no-usage-statistics` | P1 | `mcp__chrome-devtools__*` tools |

Both install (debug/perf complement, not duplicate). Browserbase/Stagehand → Tier-B (SaaS).

## TIER 8 — Code intelligence  [Tier-A · P1]

| Repo | Install command | Wired | Smoke probe |
|---|---|---|---|
| upstash/context7 (55,392★ MIT) | official Context7 MCP config | P1 | `mcp__context7__*` tools |
| oraios/serena (24,273★ MIT) | `.mcp.json` stdio `uvx --from git+https://github.com/oraios/serena@<SHA>` | P1 | `mcp__serena__*` tools |
| yamadashy/repomix (24,893★ MIT) | `npm install -g repomix@<pinned>` → `.mcp.json` `repomix --mcp` | P1 | `mcp__repomix__*` tools |

## TIER 9 — Memory L1/L2  [Tier-A · P0/P1]

| Repo | Install command | Wired | Smoke probe |
|---|---|---|---|
| thedotmack/claude-mem (76,009★ Apache) | `/plugin marketplace add thedotmack/...` then `/plugin install claude-mem` | P0 | memory persist/recall works |
| doobidoo/mcp-memory-service (1,844★ Apache) | `pip install git+https://github.com/doobidoo/mcp-memory-service.git` → `.mcp.json` stdio + sqlite_vec backend | P1 | `mcp__memory__*` tools |

**Wave-254 head-to-head**: codex scored claude-mem (76k★) as WIN over mcp-memory-service (1.8k★); W251 had mcp-memory-service as incumbent. Pilot BOTH, benchmark compaction-survival + recall-precision, pick ONE default.

## TIER 10 — Memory L3 / RAG  [Tier-B · P1 — backend decision REQUIRED]

| Repo | Install command | Wired | Gate |
|---|---|---|---|
| getzep/graphiti (26,107★ Apache-core) | `pip install graphiti-core[<backend>]` → graphiti MCP server | P1 | **BACKEND DECISION FIRST**: FalkorDB=SSPL, Neo4j=GPL-3.0, Kuzu=MIT-but-ARCHIVED. No silent FalkorDB. |

mem0 / cognee-core / LightRAG / llama_index = STUDY-PILOT comparators — adapt patterns, do not install as default.

## TIER 11 — Token optimization stack  [Tier-A · P0/P1]

The LLMLingua replacement — convergent stack (ranked, codex):

| Rank | Repo / primitive | Install | Tier |
|---|---|---|---|
| native | Anthropic prompt caching (`cache_control`) | already-on (90% cached input cost) | A |
| native | `/compact` `/rewind` `/branch` CC primitives | already-on | A |
| 1 | rtk-ai/rtk (48,568★ Apache) | `npm install -g rtk` OR `cargo install rtk` | A · P1 |
| 2 | yamadashy/repomix (24,893★ MIT) | (installed Tier 8 — ~70% tree-sitter compression) | A |
| 3 | JuliusBrussee/caveman (60,762★ MIT) | `/plugin install caveman` — **style pilot first** (terse output can harm operator docs) | A · P0 |
| 4 | mksglu/context-mode (14,828★ ELv2) | `/plugin install context-mode@context-mode` — **Tier-B (ELv2)**, 98% tool-output reduction | B · P0 |
| — | REMOVE `token-efficient-tools-2025-02-19` beta header — Claude 4+ has built-in token-efficient tools | config edit | A |

Realistic cumulative savings: **50-85% MEASURED** (not "95% universal") — verify with ccusage/rtk, not asserted.

## TIER 12 — Eval / observability  [Tier-A core + Tier-B trace]

| Repo | Install | Tier |
|---|---|---|
| ryoppippi/ccusage (14,224★) | `npm install -g ccusage` — runtime telemetry default | A · P1 |
| promptfoo/promptfoo (21,290★ MIT) | `npm install -g promptfoo` — skill/prompt regression eval | A · P1 |
| langfuse/langfuse (NOASSERTION) | Docker self-host OR SaaS — trace observability | B · P2 |
| Arize-ai/phoenix | install ONLY Apache packages (`phoenix-client`, `phoenix-otel`, `@arizeai/phoenix-mcp`) — server + Python `phoenix-evals` are ELv2 | B · P1 |

## TIER 13 — Router / local-model fallback  [Tier-B · P2]

| Repo | Install | Use |
|---|---|---|
| ollama/ollama (171,476★ MIT) | `winget install Ollama.Ollama` OR official installer | local model serving — cross-model T1 fallback when codex CLI down |
| Helicone/helicone (5,673★ Apache) | Docker self-host | LLM gateway routing (only if needed) |

LiteLLM EXCLUDED — mixed enterprise-carveout license.

## TIER 14 — Broad research / cite layer  [Tier-B — cite-class, NOT install]

ACE · MemPalace · OpenViking (selective `examples/claude-code-memory-plugin/` — Apache-subtree, Wave-254 AMBER probe) · DSPy/Distilabel/TRL/Axolotl/LlamaFactory/Unsloth · Temporal/Inngest/Trigger.dev/Dagster/Kestra · ADR catalogs (BMAD-METHOD pattern-only) · awesome-lists (discovery-only, NEVER install-class).

---

## Tier-A default roster (27 INSTALL-NOW — the pure runtime spine)

claude-code · codex · claude-agent-sdk-python · claude-cookbooks · claude-quickstarts · claude-plugins-official · mcp/servers · mcp/python-sdk · **superpowers** · wshobson/agents (selected) · everything-claude-code* · oh-my-claudecode* · agent-skills* · gitleaks · pre-commit · github-mcp-server · playwright-mcp · chrome-devtools-mcp · context7 · serena · repomix · claude-mem · mcp-memory-service · supermemory · rtk · caveman · ccusage · claude-skills

`*` = INSTALL-NOW but namespace-gated — install after collision probe resolves which granular plugins are safe.

## Tier-B roster (58 STUDY-PILOT + 10 DEFER)

All agent frameworks (langgraph/deepagents/autogen/crewAI/mastra/agno/smolagents/openai-agents-python/pydantic-ai/semantic-kernel/adk/agent-framework/camel/opencode) · memory comparators (graphiti/mem0/cognee/letta/LightRAG/llama_index/haystack) · context-mode (ELv2) · observability (langfuse/phoenix/openllmetry/opik) · eval (promptfoo→Tier-A core/deepeval/ragas/simple-evals) · browser cloud (browser-use/stagehand/browserbase-mcp) · container (k8s-mcp/e2b) · security (trivy/scorecard) · DocAI (docling/markitdown/crawl4ai/unstructured) · local-model (ollama/vllm/llama.cpp) · fine-tune (unsloth/LlamaFactory/ART) · prompt-eng (dspy/guidance) · automation (trigger.dev/dagster/kestra/lefthook) · routers (helicone) · temporal · DEFERs (OpenViking/HippoRAG/wshobson-commands/AgusRdz-ctx/semgrep/firecrawl/2 awesome-lists/BMAD/owl).

## Cross-model gate seamless wiring (user requirement: "GPT-5.5 adversary review seamlessly e2e")

The pure runtime wires GPT-5.5 adversarial review natively via the **codex T1-T7 lifecycle** (already proven this wave — Path P `codex exec --ephemeral -p deep-review-exec` works, exit 0):
- T1 pre-edit consult · T2 working-tree review · T3 postcommit auto · T4 post-push · T5 plan-stage · T6 stop-gate · T7 ask-without-act
- Install: `openai/codex` CLI (Apache-2.0, composite 4.85 — #1 ranked) + the codex-plugin-cc T-touchpoint hooks
- **Path P is the canonical recovery** when nested codex-rescue subagents autocompact-thrash (proven n=2 this wave) — orchestrator-direct `codex exec` foreground+tee.

## Wave-254 P0 must-fix (before Tier-B execution)

1. OpenViking `examples/claude-code-memory-plugin/` Apache-subtree selective-import legal boundary
2. Graphiti backend policy decision (FalkorDB SSPL vs Neo4j GPL vs Kuzu archived)
3. Namespace-collision gate run for everything-claude-code / oh-my-claudecode / agent-skills granular plugins
4. claude-mem vs mcp-memory-service head-to-head benchmark
5. context-mode ELv2 Tier-B disposition confirmed (no Tier-A claim)
6. cognee-integrations license verification before plugin install
7. Remove token-efficient-tools beta header from any Claude-4+ config
8. Pin every npm/pip install version (CR-9 — no bare `@latest`)
