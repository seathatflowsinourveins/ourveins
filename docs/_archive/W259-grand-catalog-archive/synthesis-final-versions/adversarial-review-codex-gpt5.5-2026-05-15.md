---
title: "Wave 253 — Codex BRIDGE-MODE Adversarial Review (real GPT-5.5)"
date: 2026-05-15
status: CODEX-VERDICT-AUTHORITATIVE
wave: W253
bridge-mode: "Path P orchestrator-direct codex exec --ephemeral -p deep-review-exec --color never; cross-model gate SATISFIED (real GPT-5.5, codex CLI v0.130.0, network-enabled)"
codex-tokens: 205938
raw-verdict: ".claude/state/codex_consult_w253_adversarial_OUT.txt (3970 lines)"
verdict: "ADVERSARIAL-REVIEW-COMPLETE"
---

# Wave 253 — Codex Adversarial Review of W251 Grand Synthesis

Real GPT-5.5 via codex CLI Path P, network-enabled, live GitHub API probes. Replaces the failed nested codex-rescue BRIDGE-MODE subagent (FM-17.d autocompact-thrash n=2). Cross-model consensus gate SATISFIED per `cross-model-consensus.md §The contract` Phase 1 bootstrap exception.

## §1 — Stale verdict verification (Q1)

| Repo / claim | Verdict | Live evidence |
|---|---|---|
| `mksglu/context-mode` MIT vs ELv2 | **CONFIRMED ELv2** | Root LICENSE = "Elastic License 2.0 (ELv2)". Plugin/package manifests say `Elastic-2.0`. API license `NOASSERTION`. |
| `topoteretes/cognee` Apache + CC lifecycle | **AMBER** | Core Apache-2.0, active, 17,248★, push 2026-05-15. Claude Code plugin evidence exists but in SEPARATE `topoteretes/cognee-integrations` repo with NO root LICENSE (hooks: SessionStart/UserPromptSubmit/PostToolUse/PreCompact/SessionEnd). Core install OK; plugin install license AMBER. |
| `mem0ai/mem0` Apache active | **CONFIRMED** | Apache-2.0, 55,805★, push 2026-05-16, not archived. |
| `volcengine/OpenViking` repo-wide AGPL | **OVERTURNED / AMBER** | Root AGPL-3.0, BUT `examples/LICENSE` is Apache-2.0 AND `examples/claude-code-memory-plugin/.claude-plugin/plugin.json` declares `Apache-2.0`. The "AGPL repo-wide" assumption is contradicted by the examples-level license. Whole-repo install still blocked; selective example-plugin import needs legal-boundary review. |
| `modelcontextprotocol/servers` MIT vs Apache | **CONFIRMED AMBER** | Root says MIT→Apache-2.0 transition, docs CC-BY-4.0, GitHub `NOASSERTION`. Python pkgs `fetch`/`git`/`time` still MIT; TS pkgs say "SEE LICENSE IN LICENSE". Pin per-package. |
| `BerriAI/litellm` MIT-core vs enterprise | **CONFIRMED** | Root NOASSERTION; non-`enterprise/` content is MIT; `enterprise/LICENSE.md` is restricted. OK only with enforced path boundary. |
| `FalkorDB/FalkorDB` SSPL | **CONFIRMED, NOT HARD LOCAL BLOCK** | Root SSPL, active. Local-only Docker use is usually NOT the SSPL "offer-as-a-service" trigger; permissive-only-default policy still blocks it from Tier-A. |
| `trailofbits/skills-curated` CC-BY-SA-4.0 | **CONFIRMED** | CC-BY-SA-4.0, only 402★. Cite/reference, NOT code-install default. |
| `getzep/graphiti` Apache-core + backend | **CONFIRMED WITH BACKEND TRAP** | `graphiti-core` Apache-2.0. Backends: FalkorDB SSPL / Neo4j repo GPL-3.0 / Kuzu MIT-but-ARCHIVED. Backend policy must be explicit. |
| `github/github-mcp-server` MIT + secret-scan GA | **CONFIRMED** | MIT, 29,868★. GitHub secret scanning via MCP GA on 2026-05-05; needs remote MCP + `secret_protection` + `run_secret_scanning` toolset flags. |
| `Arize-ai/phoenix` ELv2-server / Apache-evals | **OVERTURNED PARTLY** | Root/server ELv2. Python `packages/phoenix-evals` is ALSO ELv2. Apache packages: `phoenix-client`, `phoenix-otel`, JS `@arizeai/phoenix-evals`, JS `@arizeai/phoenix-mcp`. Prior "phoenix-evals is Apache" claim was wrong without language qualifier. |
| `protect-mcp` UNKNOWN | **OVERTURNED** | npm `protect-mcp@0.6.0` → `ScopeBlind/scopeblind-gateway`, MIT. Risk is tiny-repo, not license-unknown. |

## §2 — Missing categories (Q2) — 9 new categories with live-verified candidates

| Missing category | Concrete repos (live-verified) |
|---|---|
| Multi-agent debate / consensus | crewAI 51,485★ MIT · camel-ai/camel 16,965★ Apache · agno 40,145★ Apache · langgraph 32,131★ MIT |
| Cross-cycle durable state | temporalio/temporal 20,287★ MIT · inngest/inngest 5,362★ NOASSERTION · triggerdotdev/trigger.dev 14,937★ Apache · hatchet-dev/hatchet 7,154★ MIT · dagster 15,517★ Apache · kestra 26,863★ Apache |
| ADR / context snapshots | architecture-decision-record 15,845★ NOASSERTION · adr/madr 2,198★ NOASSERTION · bmad-code-org/BMAD-METHOD 47,260★ NOASSERTION (good category, bad license hygiene) |
| Skill-quality eval harnesses | promptfoo 21,290★ MIT · deepeval 15,458★ Apache · openai/simple-evals 4,487★ MIT · OpenPipe/ART 9,459★ Apache (W251's SWE-Skills-Bench has only 41★) |
| LLM routers beyond LiteLLM | Helicone 5,673★ Apache · litellm 47,140★ mixed · Portkey-AI/gateway · musistudio/claude-code-router (last two not <30d push) |
| Local model serving (T1 fallback) | ollama 171,476★ MIT · vllm 80,138★ Apache · llama.cpp 110,321★ MIT · LocalAI 46,285★ MIT · lmstudio-ai/lms 4,808★ MIT |
| Synthetic data / fine-tune | dspy 34,449★ MIT · distilabel 3,218★ Apache · trl 18,391★ Apache · axolotl 11,915★ Apache · LlamaFactory 71,297★ Apache · unsloth 64,328★ Apache |
| Prompt-engineering frameworks | promptflow 11,127★ MIT · guidance 21,462★ MIT · semantic-kernel 27,910★ MIT · haystack 25,239★ Apache |
| Hook / automation frameworks | pre-commit 15,277★ MIT · lefthook 8,221★ MIT · go-task/task 15,525★ MIT · n8n 188,022★ NOASSERTION · windmill 16,485★ NOASSERTION |

## §3 — License AMBER unresolved (Q3)

- `topoteretes/cognee-integrations` — CC plugin hooks but no root LICENSE
- `volcengine/OpenViking` — AGPL root vs Apache examples subtree (selective-import boundary)
- `modelcontextprotocol/servers` — TS packages inherit root transition text
- `BerriAI/litellm` — enterprise directory boundary must be enforced
- `getzep/graphiti` — backend choice: FalkorDB SSPL / Neo4j GPL-3.0 / Kuzu MIT-archived
- `Arize-ai/phoenix` — root server + Python phoenix-evals both ELv2
- `anthropics/claude-plugins-official` — no root LICENSE; verify per-plugin
- ADR catalogs (architecture-decision-record, MADR, BMAD-METHOD) + Inngest + n8n + Windmill — all NOASSERTION

## §4 — Claude orchestrator blind spots (Q4)

1. Over-promotes from installed-runtime inertia (Graphiti+FalkorDB keeps reappearing despite SSPL).
2. Treats native marketplace path as license clearance.
3. Treats awesome-lists / curated catalogs as install-class primitives.
4. Overweights star spikes; underweights age/stability for young May-2026 repos.
5. Collapses root-repo license into package license; misses subdir exceptions.
6. Treats ELv2/SSPL as hard-REJECT even when local-only use is legal-but-non-permissive.
7. Under-separates Tier-A default mutation from Tier-B broad coverage.
8. Assumes "official provider" = "low-risk default" (GitHub secret-scan still needs flags).
9. Uses weak "3-org convergence" when orgs are derivative blogs/forks/aggregators.
10. Confuses 1M context capacity with token savings.

## §5 — Agent orchestration primary pick (Q5)

**Primary two: `obra/superpowers` + selected `wshobson/agents` granular plugins.**

- `superpowers` = methodology spine: MIT, 192,910★, active, cross-agent manifests, small skill namespace, low collision.
- `wshobson/agents` = granular agent/team coverage — install SELECTED plugins only, NOT whole marketplace.
- `anthropics/claude-plugins-official` = foundation substrate, narrow plugins after namespace probe.
- `Yeachan-Heo/oh-my-claudecode` + `affaan-m/everything-claude-code` = Tier-B pattern libraries (collide heavily).

### Namespace conflicts (live-probed)

| Pair | Conflicting names |
|---|---|
| claude-plugins-official ↔ everything-claude-code | code-review, feature-dev, hookify, review-pr, code-architect, code-explorer, code-simplifier, comment-analyzer, conversation-analyzer, silent-failure-hunter, type-design-analyzer |
| wshobson/agents ↔ oh-my-claudecode | code-reviewer, debugger, architect |
| wshobson/agents ↔ claude-plugins-official | security-auditor + overlapping review/security roles |
| oh-my-claudecode ↔ claude-plugins-official | code-simplifier, test-engineer |
| oh-my-claudecode ↔ everything-claude-code | planner, security-reviewer, verify |
| wshobson/agents internal | code-reviewer, debugger, security-auditor, refactor-clean repeat across plugins — granular install MANDATORY |

## §6 — Token optimization post-LLMLingua (Q6)

| Primitive | Verdict |
|---|---|
| Anthropic prompt caching | **ADOPT** — cache reads 0.1x base input, 5m default / 1h available |
| `/compact` `/rewind` `/branch` | **ADOPT** — official; saves wasted context, not deterministic % |
| Repomix Tree-sitter compression | **ADOPT** — MIT, ~70% token reduction |
| `mksglu/context-mode` | **TIER-B ONLY** — 98% tool-output reduction but ELv2 |
| `JuliusBrussee/caveman` | **PILOT → Tier-A if style accepted** — MIT, native plugin, 65-75% output-token reduction; risk: terse style harms operator-facing docs |
| Opus 4.7 1M context | **ADOPT as capacity, NOT savings** — needs `/context` discipline |
| `token-efficient-tools-2025-02-19` beta header | **REMOVE** — Claude 4+ has built-in token-efficient tool use; legacy header no-effect |

Realistic cumulative: NOT "95% universal". Repeated-prefix workloads ~97% effective input-cost reduction (Repomix compression × cache hits = 0.30 × 0.10 = 0.03). Output savings from Caveman ~35-75%. Overall runtime target 50-85%, MEASURED with ccusage/RTK, not asserted.

## §7 — 14-tier install architecture (Q7)

1. Bootstrap pure repo skeleton + settings baseline (no secrets)
2. Claude Code core + official Anthropic marketplace discovery
3. Safety floor: deny-destructive hooks, gitleaks, pre-commit/lefthook
4. Primary methodology: `obra/superpowers` + selected `wshobson/agents` (after namespace probe)
5. Narrow official Anthropic plugins (skill-creator, plugin-dev, mcp-server-dev, pr-review-toolkit, feature-dev) after collision probe
6. MCP foundation: GitHub official MCP + filesystem/git/fetch/time/sequential-thinking package-pinned, read-only defaults
7. Browser/debug MCP: Playwright MCP + ChromeDevTools MCP; Browserbase/Stagehand as SaaS pilot
8. Code intelligence: Serena + Repomix + ast-grep/tree-sitter
9. Memory L1/L2: mcp-memory-service; pilot claude-mem / mem0 / cognee-core
10. Memory L3/RAG: Graphiti core ONLY after backend decision (no silent FalkorDB)
11. Token stack: prompt caching + /compact policy + /branch/rewind + Repomix + Caveman pilot + ccusage/RTK measurement
12. Eval/observability: promptfoo + deepeval/simple-evals/ART; Phoenix only package-specific Apache components unless ELv2 accepted
13. Router/fallback compute: local Ollama/vLLM/llama.cpp profile; LiteLLM only with enterprise boundary; Helicone/Portkey pilots
14. Broad research/cite layer: ACE, MemPalace, OpenViking, Trail of Bits skills, ADR catalogs, synthetic-data/fine-tune, durable-state engines

### Tier-A default (permissive license, verified native path, low collision)
obra/superpowers · selected wshobson/agents plugins · github/github-mcp-server · microsoft/playwright-mcp · ChromeDevTools/chrome-devtools-mcp · doobidoo/mcp-memory-service · yamadashy/repomix · ast-grep CLI · JuliusBrussee/caveman (after style pilot) · prompt caching + CC context lifecycle controls · pre-commit/lefthook/gitleaks

### Tier-B broad (pilots / cite-class / blocked-license / SaaS / legal AMBER)
context-mode (ELv2) · OpenViking selective example plugin (AGPL-root AMBER) · cognee CC plugin · graphiti (backend decision) · litellm · phoenix server+Python-evals (ELv2) · trailofbits/skills-curated · Browserbase/Stagehand · Temporal/Inngest/Trigger.dev/Hatchet · Ollama/vLLM/llama.cpp · DSPy/Distilabel/TRL/Axolotl/LlamaFactory/Unsloth · ADR catalogs (NOASSERTION)

## §8 — Wave 254 P0 must-fix

1. Resolve OpenViking plugin license boundary (not blanket AGPL rejection)
2. Decide Graphiti backend policy BEFORE any L3 memory default
3. Run namespace-collision gate before official/wshobson/oh-my/everything plugin installs
4. Separate Tier-A default roster from Tier-B broad catalog
5. Replace context-mode Tier-A claims with ELv2-aware Tier-B disposition
6. Verify cognee-integrations license before plugin install
7. Remove token-efficient-tools beta header from Claude 4+ configs
8. Add local-model-fallback + durable-state categories to W253 catalog
