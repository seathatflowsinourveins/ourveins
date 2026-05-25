---
title: Wave 253 Phase C Grand Synthesis — Pure-SOTA Claude Code Runtime
date: 2026-05-15
status: AUTHORITATIVE
agent: wave253-C-grand-synthesis
---

## A. STAND-IN-NOTICE

STAND-IN-NOTICE: The required background Phase C agent output at `tmp/claude/Z--claude-sota-installed/2835d24a-ae01-45f3-9933-d1dc1725729e/tasks/a38eb7f46d8705739.output` was present but empty. Agent A's requested artifact path `tmp/wave253-A-prior-research-audit-and-rubric-2026-05-15.md` was absent. Agent B's artifact was present and reviewed. The completed local adversarial review was found at `tmp/wave253-C-adversarial-review-2026-05-15.md`.

Cross-model status: nested `codex exec --ephemeral --skip-git-repo-check -p deep-review-exec --color never` did not return an independent GPT-5.5 verdict because the subprocess failed with `Access is denied. (os error 5)`, as recorded by Agent B at `tmp/wave253-B-fresh-discovery-bridge-2026-05-15.md:3-4`. This synthesis is therefore AUTHORITATIVE as the Wave 253 orchestrator product, but its consensus gate remains STAND-IN/HNF rather than a clean nested-Codex pass.

Hard gates enforced here:

- Only MIT and Apache-2.0 are treated as install-cleared licenses.
- AGPL, GPL, and SSPL family repos are DEFER/REJECT regardless of score.
- `volcengine/OpenViking` remains DEFER because Agent B verified AGPL-3.0 despite a native Claude Code memory plugin path.
- Unknown or `NOASSERTION` license rows are not ADOPT-NOW; they are STUDY-PILOT/POLICY-REVIEW or discovery-only.
- `gh api` is the GitHub API path; `curl.exe` is not used or recommended.
- Prior W251/W237 verdicts are not auto-promoted.

## B. ADVERSARIAL FINDINGS SUMMARY

1. `firecrawl/firecrawl` must be demoted from ADOPT-NOW to DEFER. Agent B ranked it #4 and ADOPT-NOW with `NOASSERTION` license at `tmp/wave253-B-fresh-discovery-bridge-2026-05-15.md:128`; the adversarial review found live GitHub license AGPL-3.0.
2. Agent B's license pipeline is not reliable enough for install decisions. Rows with `NOASSERTION` were promoted across the top table at `tmp/wave253-B-fresh-discovery-bridge-2026-05-15.md:126-137`; final adoption requires MIT/Apache verification.
3. Agent B over-scored inferred native Claude Code paths. `openai/openai-agents-python`, `langchain-ai/deepagents`, and `docling-project/docling` were given D5=10 at `tmp/wave253-B-fresh-discovery-bridge-2026-05-15.md:126-128,134`, but these need install-path proof before runtime mutation.
4. Awesome lists were treated as installable primitives. `hesreallyhim/awesome-claude-code` was ADOPT-NOW at `tmp/wave253-B-fresh-discovery-bridge-2026-05-15.md:137`; this synthesis classifies it as DISCOVERY-ONLY.
5. Already-installed or already-represented primitives were not separated from net-new installs. `yamadashy/repomix`, `openai/codex`, `anthropics/claude-plugins-official`, and `oraios/serena` were all ADOPT-NOW at `tmp/wave253-B-fresh-discovery-bridge-2026-05-15.md:130-136`, but the correct disposition is REFRESH-AUDIT unless pure runtime lacks them.
6. Browser MCP adoption needs a permission-boundary review. `ChromeDevTools/chrome-devtools-mcp` was ADOPT-NOW at `tmp/wave253-B-fresh-discovery-bridge-2026-05-15.md:135`; final disposition is STUDY-PILOT-HIGH until overlap with Playwright/browser tooling is resolved.
7. Security and container repos are CLI-heavy, not automatically MCP-safe. Agent B warned about hook-first adoption at `tmp/wave253-B-fresh-discovery-bridge-2026-05-15.md:96`; this synthesis keeps security/container tools in pilot unless native MCP boundaries are proven.
8. `volcengine/OpenViking` was handled correctly by Agent B. The verified AGPL-3.0 and DEFER decision appear at `tmp/wave253-B-fresh-discovery-bridge-2026-05-15.md:23` and the scored table at `tmp/wave253-B-fresh-discovery-bridge-2026-05-15.md:146`.
9. Agent B missed stronger native Claude Code surfaces: `anthropics/skills`, `obra/superpowers`, `addyosmani/agent-skills`, `openai/codex-plugin-cc`, `anthropics/cwc-long-running-agents`, and `modelcontextprotocol/registry`.
10. D2 and D6/D10 are too coarse. Agent B's method caps commit velocity at 100/month and uses convergence proxies at `tmp/wave253-B-fresh-discovery-bridge-2026-05-15.md:7`; final ranking keeps these as directional scores, not installation proof.

## C. MISSED HIGH-SIGNAL REPOS

| Repo | Why It Belongs In Top-30 | Disposition |
|---|---|---|
| `obra/superpowers` | MIT; cross-agent plugin/skill surface with `.claude-plugin`, `.codex-plugin`, and skills; stronger native runtime fit than many broad framework rows. | REFRESH-AUDIT |
| `anthropics/skills` | Official Anthropic skill marketplace/corpus with native skill layout; license needs policy review before install. | STUDY-PILOT/POLICY-REVIEW |
| `addyosmani/agent-skills` | MIT; direct `.claude-plugin` and command/skill workflow surface. | STUDY-PILOT-HIGH |
| `openai/codex-plugin-cc` | Apache-2.0; direct Claude Code plugin for Codex, more native than generic `openai/codex`. | ADOPT-NOW/REFRESH-AUDIT |
| `anthropics/cwc-long-running-agents` | Apache-2.0; official low-star exception with direct `.claude` agents/hooks/settings patterns. | STUDY-PILOT-HIGH |
| `modelcontextprotocol/registry` | MCP registry/provenance surface for future install governance. | STUDY-PILOT |
| `idosal/git-mcp` | Apache-2.0; git-to-MCP knowledge surface that may complement GitNexus/DeepWiki after duplicate review. | STUDY-PILOT |

## D. GRAND SCORING MATRIX

Scores are D1-D10 on 0-10 scale; Total/100 is the direct sum. Unknown licenses are scored D4=0 because this runtime's install gate accepts only MIT/Apache permissive repos.

| Rank | Repo | Category | Stars | License | D1-Score | D2-Score | D3-Score | D4-Score | D5-Score | D6-Score | D7-Score | D8-Score | D9-Score | D10-Score | Total/100 | Disposition |
|---:|---|---|---:|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|
| 1 | `jarrodwatts/claude-hud` | Claude plugin/UI | 22878 | MIT | 8.6 | 10 | 10 | 10 | 10 | 10 | 9 | 5 | 10 | 9.7 | 92.3 | STUDY-PILOT-HIGH |
| 2 | `obra/superpowers` | Cross-agent skills/plugins | 192887 | MIT | 10 | 8 | 10 | 10 | 10 | 10 | 9 | 7 | 9.5 | 9.7 | 93.2 | REFRESH-AUDIT |
| 3 | `openai/codex-plugin-cc` | Claude Code plugin | 18773 | Apache-2.0 | 8.4 | 4 | 7 | 10 | 10 | 10 | 10 | 6 | 9 | 9.7 | 84.1 | ADOPT-NOW/REFRESH-AUDIT |
| 4 | `addyosmani/agent-skills` | Claude skills/commands | 42108 | MIT | 9.1 | 5 | 10 | 10 | 10 | 9 | 9 | 6 | 9 | 9.3 | 86.4 | STUDY-PILOT-HIGH |
| 5 | `wshobson/agents` | Claude agents | 35459 | MIT | 8.9 | 6 | 10 | 10 | 10 | 10 | 9 | 9 | 9 | 9.7 | 91.6 | STUDY-PILOT |
| 6 | `alirezarezvani/claude-skills` | Claude skills/plugins | 14955 | MIT | 8.2 | 10 | 10 | 10 | 10 | 9 | 9 | 5 | 9 | 9.3 | 89.5 | STUDY-PILOT |
| 7 | `yamadashy/repomix` | Context/code-intel CLI | 24892 | MIT | 8.6 | 10 | 10 | 10 | 10 | 10 | 9 | 5 | 9 | 9.7 | 91.3 | REFRESH-AUDIT |
| 8 | `oraios/serena` | Code-intel MCP | 24271 | MIT | 8.6 | 10 | 10 | 10 | 8 | 10 | 9 | 5 | 9 | 9 | 88.6 | REFRESH-AUDIT |
| 9 | `openai/codex` | Agent CLI/SDK | 82920 | Apache-2.0 | 9.7 | 10 | 10 | 10 | 8 | 10 | 9 | 5 | 9 | 9 | 89.7 | REFRESH-AUDIT |
| 10 | `docling-project/docling` | Document ingestion | 59800 | MIT | 9.4 | 7 | 10 | 10 | 7 | 10 | 8 | 5 | 9 | 8 | 83.4 | STUDY-PILOT |
| 11 | `ChromeDevTools/chrome-devtools-mcp` | Browser MCP | 39717 | Apache-2.0 | 9 | 10 | 10 | 10 | 8 | 10 | 9 | 5 | 9 | 9 | 89.0 | STUDY-PILOT-HIGH |
| 12 | `openai/openai-agents-python` | Agent framework | 26337 | MIT | 8.7 | 10 | 10 | 10 | 6 | 10 | 8 | 9 | 9 | 7.7 | 88.4 | STUDY-PILOT |
| 13 | `langchain-ai/deepagents` | Agent framework | 22829 | MIT | 8.6 | 10 | 10 | 10 | 6 | 10 | 8 | 9 | 9 | 7.7 | 88.3 | STUDY-PILOT |
| 14 | `topoteretes/cognee` | Memory/RAG | 17248 | Apache-2.0 | 8.3 | 10 | 10 | 10 | 5 | 9 | 6 | 5 | 9.7 | 6.7 | 79.7 | STUDY-PILOT |
| 15 | `anthropics/cwc-long-running-agents` | Long-running agents | 317 | Apache-2.0 | 4.5 | 7 | 10 | 10 | 10 | 8 | 9 | 9 | 8 | 9.3 | 84.8 | STUDY-PILOT-HIGH |
| 16 | `anthropics/skills` | Official skills | 135192 | NOASSERTION | 10 | 8 | 10 | 0 | 10 | 10 | 10 | 6 | 7 | 9.7 | 80.7 | STUDY-PILOT/POLICY-REVIEW |
| 17 | `modelcontextprotocol/registry` | MCP registry | 6816 | NOASSERTION | 7.4 | 7 | 10 | 0 | 8 | 9 | 10 | 5 | 7 | 8.7 | 72.1 | STUDY-PILOT |
| 18 | `idosal/git-mcp` | Git/MCP knowledge | 8081 | Apache-2.0 | 7.6 | 3 | 8 | 10 | 8 | 8 | 8 | 5 | 8 | 8 | 73.6 | STUDY-PILOT |
| 19 | `crewAIInc/crewAI` | Agent framework | 51485 | NOASSERTION | 9.3 | 10 | 10 | 0 | 5 | 10 | 6 | 9 | 7 | 7 | 73.3 | STUDY-PILOT/POLICY-REVIEW |
| 20 | `agno-agi/agno` | Agent framework | 40146 | NOASSERTION | 9 | 10 | 10 | 0 | 5 | 10 | 6 | 9 | 7 | 7 | 73.0 | STUDY-PILOT/POLICY-REVIEW |
| 21 | `langchain-ai/langgraph` | Agent framework | 32131 | NOASSERTION | 8.8 | 10 | 10 | 0 | 5 | 10 | 6 | 9 | 7 | 7 | 72.8 | STUDY-PILOT/POLICY-REVIEW |
| 22 | `mastra-ai/mastra` | Agent framework/observability | 23922 | NOASSERTION | 8.6 | 10 | 10 | 0 | 5 | 10 | 6 | 9 | 7 | 7 | 72.6 | STUDY-PILOT/POLICY-REVIEW |
| 23 | `PaddlePaddle/PaddleOCR` | OCR ingestion | 77917 | NOASSERTION | 9.6 | 2 | 10 | 0 | 7 | 10 | 8 | 5 | 7 | 8 | 66.6 | STUDY-PILOT/POLICY-REVIEW |
| 24 | `github/github-mcp-server` | GitHub MCP/security | 29868 | NOASSERTION | 8.8 | 5 | 10 | 0 | 8 | 10 | 9 | 5 | 7 | 9 | 71.8 | STUDY-PILOT/POLICY-REVIEW |
| 25 | `mem0ai/mem0` | Memory | 55805 | NOASSERTION | 9.3 | 7 | 10 | 0 | 5 | 10 | 6 | 9 | 7 | 7 | 70.3 | STUDY-PILOT/POLICY-REVIEW |
| 26 | `upstash/context7` | Docs/code-intel MCP | 55391 | NOASSERTION | 9.3 | 3 | 10 | 0 | 8 | 10 | 9 | 5 | 7 | 9 | 70.3 | STUDY-PILOT/POLICY-REVIEW |
| 27 | `openai/openai-python` | SDK | 30768 | NOASSERTION | 8.8 | 7 | 10 | 0 | 7 | 10 | 9 | 5 | 7 | 8 | 71.8 | STUDY-PILOT/POLICY-REVIEW |
| 28 | `openai/openai-node` | SDK | 10902 | NOASSERTION | 7.9 | 6 | 10 | 0 | 7 | 9 | 9 | 5 | 7 | 8 | 68.9 | STUDY-PILOT/POLICY-REVIEW |
| 29 | `browser-use/browser-use` | Browser agent | 94090 | NOASSERTION | 9.8 | 6 | 10 | 0 | 5 | 10 | 6 | 9 | 7 | 7 | 69.8 | STUDY-PILOT/POLICY-REVIEW |
| 30 | `langfuse/langfuse` | Observability | 27283 | NOASSERTION | 8.7 | 10 | 10 | 0 | 5 | 10 | 6 | 6 | 7 | 7 | 69.7 | STUDY-PILOT/POLICY-REVIEW |
| 31 | `promptfoo/promptfoo` | Evals | 21290 | NOASSERTION | 8.5 | 10 | 10 | 0 | 5 | 10 | 6 | 6 | 7 | 7 | 69.5 | STUDY-PILOT/POLICY-REVIEW |
| 32 | `HKUDS/LightRAG` | RAG | 35248 | NOASSERTION | 8.9 | 10 | 10 | 0 | 5 | 10 | 6 | 5 | 7 | 7 | 68.9 | STUDY-PILOT/POLICY-REVIEW |
| 33 | `volcengine/OpenViking` | Memory/plugin | 23965 | AGPL-3.0 | 8.6 | 10 | 10 | 0 | 10 | 10 | 6 | 9 | 6.7 | 8.7 | 79.0 | DEFER-LICENSE |
| 34 | `firecrawl/firecrawl` | Web extraction | 120336 | AGPL-3.0 | 10 | 10 | 10 | 0 | 7 | 10 | 8 | 5 | 6 | 7 | 73.0 | DEFER-LICENSE |

## E. ADOPT-NOW CATALOG

These are install or refresh actions only for MIT/Apache-cleared repos with strong native runtime fit. Already-present primitives should be treated as refresh-audit, not duplicate imports.

| Repo | Install command | Key CC primitive | Why this runtime needs it now |
|---|---|---|---|
| `openai/codex-plugin-cc` | `gh repo clone openai/codex-plugin-cc Z:/repos/deps/codex-plugin-cc` | Native Claude Code plugin bridge for Codex | Replace broad `openai/codex` adoption framing with the actual CC plugin surface. |
| `obra/superpowers` | `gh repo clone obra/superpowers Z:/repos/deps/superpowers` | Cross-agent plugin/skill pack | Refresh-audit the installed superpowers surface against current upstream. |
| `yamadashy/repomix` | `npm view repomix version; npm install -g repomix` | Codebase compression/context packer | Core context/code-intel layer; refresh and benchmark only if pure runtime lacks current version. |
| `oraios/serena` | `gh repo clone oraios/serena Z:/repos/deps/serena` | Semantic code-intel MCP | Keep as a first-class code-intel primitive; audit installed config and version drift. |
| `openai/codex` | `npm view @openai/codex version; npm install -g @openai/codex` | Cross-model CLI/review executor | Required for cross-model consensus, rescue, and independent review flows. |
| `wshobson/agents` | `gh repo clone wshobson/agents Z:/repos/deps/wshobson-agents` | Claude agent catalog | High-value agent templates, but import only after namespace collision review. |
| `alirezarezvani/claude-skills` | `gh repo clone alirezarezvani/claude-skills Z:/repos/deps/claude-skills` | Claude/Codex skill plugin pack | Candidate supplement to skill coverage; needs duplicate and quality gate before enabling. |
| `jarrodwatts/claude-hud` | `gh repo clone jarrodwatts/claude-hud Z:/repos/deps/claude-hud` | Claude UI/HUD plugin | Strong native plugin signal; install after hooks/permissions blast-radius review. |

## F. STUDY-PILOT CATALOG

| Repo | Pilot scope | Success criterion | 30-day exit condition |
|---|---|---|---|
| `anthropics/skills` | License/policy review plus sample skill import into isolated pure runtime. | Official skill can be installed without license ambiguity or namespace collisions. | Adopt selected skills if license clears; otherwise keep cite-only. |
| `addyosmani/agent-skills` | Test 3-5 workflow skills against real eee tasks. | Skills improve task completion or review quality without duplicating installed commands. | Promote specific skills or reject whole bundle. |
| `anthropics/cwc-long-running-agents` | Isolated long-running agent harness review. | Hooks/agents/settings patterns transfer safely to pure runtime. | Adopt patterns only, or defer if too workflow-specific. |
| `ChromeDevTools/chrome-devtools-mcp` | Compare against Playwright MCP in browser-debug tasks. | Adds DevTools capabilities not covered by current browser stack. | Enable one browser MCP path; avoid duplicate always-on servers. |
| `docling-project/docling` | Document ingestion benchmark on PDFs, HTML, images. | Beats current ingestion path on accuracy/speed with manageable dependencies. | Adopt CLI wrapper or reject as too heavy. |
| `openai/openai-agents-python` | Use as reference implementation for agent handoff/tool patterns. | Produces reusable patterns without requiring framework lock-in. | Keep as cite/reference or add optional examples only. |
| `langchain-ai/deepagents` | Evaluate planning/subagent patterns against local orchestration. | Clear reusable primitive emerges beyond examples/config. | Promote pattern docs or reject as overlap. |
| `topoteretes/cognee` | Memory/RAG pilot against Graphiti/memory service. | Demonstrates better recall or graph/RAG synthesis on repo tasks. | Adopt if benchmark wins; otherwise cite-only. |
| `modelcontextprotocol/registry` | MCP provenance and install governance pilot. | Registry metadata improves install validation and provenance logs. | Wire into install checklist or defer. |
| `idosal/git-mcp` | Git knowledge MCP compared to GitNexus/DeepWiki. | Adds useful repo navigation with low duplication. | Adopt only if it fills a proven gap. |

## G. DEFER/REJECT CATALOG

| Repo | Reason |
|---|---|
| `volcengine/OpenViking` | AGPL-3.0 hard block despite verified Claude Code memory plugin path. |
| `firecrawl/firecrawl` | AGPL-3.0 hard block; Agent B's ADOPT-NOW disposition is overturned. |
| `netdata/netdata` | GPL-3.0 hard block. |
| `giancarloerra/SocratiCode` | AGPL-3.0 hard block. |
| `getzep/zep` | Weak native fit plus unresolved license/install clearance in this corpus. |
| `contains-studio/agents` | Weak native fit or unresolved license/install clearance. |
| `ComposioHQ/awesome-claude-plugins` | Discovery-only list; not an install primitive. |
| `qdhenry/Claude-Command-Suite` | Low convergence and unresolved install-quality gate. |
| `Flux159/mcp-server-kubernetes` | Defer until container/cloud MCP permission boundary is reviewed. |
| `0x4m4/hexstrike-ai` | Security automation risk; no default runtime install without explicit sandbox threat model. |

## H. INSTALL SEQUENCE RECOMMENDATION

Tier 1 - Consensus and provenance core:

1. Repair nested Codex/BRIDGE-MODE OS error 5 before any architectural commit gate.
2. Refresh `openai/codex` and add/audit `openai/codex-plugin-cc`.
3. Add MCP registry/provenance checks to the install discipline as study-pilot support.

Tier 2 - Already-installed refresh audit:

1. Audit `obra/superpowers`, `yamadashy/repomix`, and `oraios/serena` against upstream versions.
2. Confirm `anthropics/claude-plugins-official` coverage before importing overlapping third-party skill packs.

Tier 3 - Native Claude Code skill/agent pilots:

1. Pilot `jarrodwatts/claude-hud`, `wshobson/agents`, `alirezarezvani/claude-skills`, `addyosmani/agent-skills`, and `anthropics/cwc-long-running-agents`.
2. Promote only individual commands/skills/agents with license-cleared source and no namespace collision.

Tier 4 - Browser, ingestion, and memory pilots:

1. Compare `ChromeDevTools/chrome-devtools-mcp` with the existing browser stack.
2. Benchmark `docling-project/docling` for ingestion.
3. Benchmark `topoteretes/cognee` against current memory/RAG primitives.

Tier 5 - Broad framework/reference queue:

1. Keep `openai/openai-agents-python`, `langchain-ai/deepagents`, and similar frameworks as study/reference until a concrete primitive beats local patterns.
2. Keep unknown-license rows blocked from default install until MIT/Apache is verified with `gh api`.

## I. VERDICT

{
  "verdict": "GRAND-SYNTHESIS-COMPLETE",
  "conf": 0.86,
  "adopt_now_count": 8,
  "study_pilot_count": 10,
  "defer_count": 10,
  "top_3_must_install": [
    "openai/codex-plugin-cc",
    "obra/superpowers",
    "yamadashy/repomix"
  ],
  "critical_gaps_filled": [
    "license-hard-gate-correction",
    "native-claude-code-path-vs-inferred-path-separation",
    "already-installed-refresh-audit-vs-net-new-adoption"
  ],
  "wave": 253
}
