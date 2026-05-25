# Kits v55-v65 Evolution Extract — 2026-05-16

> Sourced from general-purpose fork (agentId a0f7ca8c15e3d8889, 2026-05-16T13:17Z+)
> Read 11 kit versions (v55-v65) — **all Cohort 7 STRUCTURAL REJECT class** (anonymous LLM zip-drops).

## §A — Kit evolution timeline

All v55-v65 per `outer research/README.md` are anonymous LLM-iterated zip drops (Cohort 7 structural REJECT — 0/23 ADOPT-NOW streak through v52). Primary deliverables: `EXECUTE_V<N>_ELITE_PLAN.md` + `SOTA_REPOS_BEST_OF_BEST_FINAL_LIST.md`.

| v | Files | Repos | Notable change |
|---|---|---|---|
| v55 | 19 | ~190 | Baseline 13-section taxonomy. `REPOS_BY_CATEGORY.md`. CLAUDE.md ~200 LOC operating rules |
| v56 | 20 | ~200 | + `EXECUTE_V56_ELITE_PLAN.md` + `SOURCE_APPENDIX.md` + `HIGH_STAR_TRIAGE_AND_CONVERGENCE.md` |
| v57 | 20 | ~205 | + `MODEL_ROUTING_AND_SUBAGENTS.md`, `PARALLEL_WORKTREE_AUTOMATION.md`. Drops HIGH_STAR_TRIAGE |
| v58 | 21 | ~210 | + `EVAL_BENCHMARK_OBSERVABILITY.md` + `WHAT_MORE_WAS_NOT_COVERED_ENOUGH.md` |
| v59 | 22 | ~215 | + `ELITE_CONVERGENCE_DESIGN.md`. Drops SOURCE_APPENDIX |
| v60 | 23 | 205 | Same as v59. Adds `BraintrustData/braintrust-claude-plugin` (later dropped) |
| v61 | 22 | ~220 | Drops ELITE_CONVERGENCE_DESIGN + REPOS_BY_CATEGORY |
| v62 | 24 | **226** | Re-adds ELITE_CONVERGENCE. Adds `mattpocock/sandcastle`, `BraintrustData/autoevals`, `mb-mal/awesome-ai-agents-frameworks`. **COMMUNITY_TUTORIAL_REFERENCES** (Karpathy 2026, Boris Cherny, howborisusesclaudecode.com). Self-reports "226 unique" |
| v63 | 22 | 217 | Drops ELITE_CONVERGENCE again. Adds `sourcegraph/cody`, `campfirein/cipher`, `ykdojo/claude-code-tips`, `mattgierhart/PRD-driven-context-engineering`, `repowise-dev/claude-code-prompts`, `affaan-m/agentshield`. Reorganizes MEMORY_MCP_AUDIT_REQUIRED. CLAUDE.md tightened to ~10 lines |
| v64 | 21 | **226** | `REPO_METADATA.json` → `REPOS_BY_CATEGORY.json`. Adds `anthropics/claude-plugins-official`, `anthropics/knowledge-work-plugins`, `edimuj/vexscan`, `phuryn/claude-usage`, `sharkdp/hyperfine`, `sharkdp/bat`, `sharkdp/delta`, `eza-community/eza`, `junegunn/fzf`, `sxyazi/yazi`. New skill: `memory-mcp-audit`. CLAUDE.md adds "Default tool policy" + "Done means" |
| **v65** | 24 | **226** | + `ADVANCED_SOURCE_DEEP_DIVE_PROTOCOL.md` (new), `SOURCE_APPENDIX.md` re-appears. Adds: `github/gh-aw`, `aws-samples/sample-mcp-security-scanner`, `EveryInc/compound-engineering-plugin` retained, `aaif-goose/goose`, `OpenHands/software-agent-sdk`, `Gitlawb/openclaude`. Drops Braintrust pair. **7 NEW SKILLS**: `benchmark-eval-gate, codex-second-opinion, context-capsule-builder, execute-v65-plan, parallel-worktree-harness, source-repo-audit, token-optimized-implementation`. CLAUDE.md as terse "operating contract" |

**Pattern**: METADATA-INFLATION class — section reordering + 5-15 repo deltas per version with no NEW_ADDITIONS_SINCE_LAST_KIT.md.

## §B — Repos recommended by latest kit (v65)

**Default install core (only 13):**
ryoppippi/ccusage, rtk-ai/rtk, oraios/serena, yamadashy/repomix, BurntSushi/ripgrep, sharkdp/fd, jqlang/jq, mikefarah/yq, cli/cli, pre-commit/pre-commit, casey/just, jdx/mise, astral-sh/uv

**Foundation/official**: anthropics/claude-code, openai/codex, openai/codex-plugin-cc, anthropics/skills, agentskills/agentskills, modelcontextprotocol/{modelcontextprotocol,servers,inspector}, github/{github-mcp-server,gh-aw,spec-kit,codeql-action}, anthropics/{claude-code-action,claude-code-base-action,claude-code-security-review,claude-agent-sdk-*,anthropic-sdk-*}, openai/{openai-agents-python,openai-python,openai-node,skills}

**Codex bridges (audit-required)**: openai/codex-plugin-cc, bfly123/claude_codex_bridge, xiaolai/codex-toolkit-for-claude, promptadvisers/claudex, sakibsadmanshajib/gemini-plugin-cc, nikuscs/codex-cc-plugin, tasict/opencode-plugin-cc

**Eval/benchmark**: openai/evals, promptfoo, deepeval, braintrustdata/braintrust-sdk, langfuse, ragas, Arize-ai/phoenix, SWE-bench, swe-agent, OpenHands/benchmarks, CORAL, evo-hq/evo

**Memory (audit-required)**: mem0, getzep/{graphiti,zep}, letta-ai/letta + 13 smaller `claude-mem`-style (unaudited)

**Security tier**: trailofbits/{claude-code-config,claude-code-devcontainer}, snyk/agent-scan, cisco-ai-defense/{mcp-scanner,skill-scanner}, InvariantLabs-ai/mcp-scan, MCP-Defender/MCP-Defender, semgrep, gitleaks, trufflehog, trivy, osv-scanner, scorecard, harden-runner, full linter stack (ruff, biome, oxc, shellcheck, actionlint, hadolint, zizmor)

## §C — Repos that survived v55 → v65 (convergence)

Stable across all 11 versions:
- **Foundation**: anthropics/claude-code+skills+3 SDKs+3 actions, openai/codex+plugin-cc+3 SDKs, MCP triad, github-mcp-server, spec-kit, codeql-action, microsoft/playwright-mcp, upstash/context7, agentskills/agentskills
- **Default install**: All 13 (ccusage, rtk, serena, repomix, ripgrep, fd, jq, yq, gh, pre-commit, just, mise, uv) — zero churn
- **Token/context**: rtk, context-mode, headroom, wet, skinny-jeans, distill, whetstone, token-optimizer, entroly, claude-context, aider, mgrep, ast-grep, tree-sitter, code-review-graph, graphify, code2prompt
- **Memory**: claude-mem, mcp-memory-keeper, mcp-memory-service, claude-supermemory, claude-cognitive, headroom, mem0, graphiti, zep, letta
- **Workflow elite**: BMAD-METHOD, claude-task-master, ccpm, context-engineering-intro, PRPs-agentic-eng, get-shit-done, pilot-shell, wshobson/agents, KARIMO, agentsys, Citadel, bernstein, tutti, humanlayer
- **Parallel operator**: claude-squad, agent-orchestrator, CCUI, AgentHub, vibe-kanban, crystal, cmux, agtx, workmux, superset, cc-manager, cc-switch, ai-agent-board, ccswarm, agor, itervox, claude-terminal, gastown

## §D — Anti-convergence (dropped between versions)

- BraintrustData/braintrust-claude-plugin (v62 only)
- BraintrustData/autoevals (v62 only)
- mattpocock/sandcastle (v62 only)
- spillwavesolutions/parallel-worktrees (v62 only)
- sourcegraph/cody (v62-v63 only)
- campfirein/cipher (v63 only)
- ykdojo/claude-code-tips, mattgierhart/PRD-driven, repowise-dev/claude-code-prompts, affaan-m/agentshield (all v63-only)
- mattpocock/skills (v55-v63, dropped v64+)
- NousResearch/hermes-agent (v55-v63, dropped v64+)
- run-llama/llama_index, vercel/ai, mastra-ai/mastra (v62 only)
- gsd-build/get-shit-done (demoted, was elite, now reference)
- COMMUNITY_TUTORIAL_REFERENCES section (v62 only, dropped v63+)

## §E — Primitives NOT in W258-ULTIMATE

**Token/context micro-tools cluster** (ALL net-new):
skinny-jeans, distill, whetstone, token-optimizer, entroly, buildoak/wet, yvgude/lean-ctx, edouard-claude/snip, claudioemmanuel/squeez, chopratejas/headroom

**Measurement/visibility net-new**:
mcpware/cross-code-organizer, jarrodwatts/claude-hud, jeongwookie/WhereMyTokens, spences10/claude-code-analytics, phuryn/claude-usage, matt1398/claude-devtools, sirmalloc/ccstatusline, florianbruniaux/ccboard

**Codex bridges (entire cluster net-new)**:
bfly123/claude_codex_bridge, xiaolai/codex-toolkit-for-claude, promptadvisers/claudex, sakibsadmanshajib/gemini-plugin-cc, nikuscs/codex-cc-plugin, tasict/opencode-plugin-cc

**Parallel/operator cluster (mostly net-new)**:
CCUI, AgentHub, vibe-kanban, crystal, cmux, agtx, workmux, cc-manager, cc-switch, ai-agent-board, ccswarm, agor, itervox, claude-terminal, gastown

**Workflow harness**:
context-engineering-intro, PRPs-agentic-eng, pilot-shell, opensesh/KARIMO (W258 has as PATTERN-CITE), agentsys, Citadel, bernstein, tutti, pro-workflow, learn-claude-code, oh-my-claudecode, everything-claude-code

**Memory cluster (W258 has graphiti/zep/letta/mem0; net-new):**
thedotmack/claude-mem, mcp-memory-keeper, doobidoo/mcp-memory-service, supermemoryai/{claude-supermemory,supermemory-mcp}, claude-memory, claude-cognitive, claude-code-memory-setup, memory-layer, ClawMem, memory-mcp, codebase-memory-mcp

**Security ecosystem net-new**:
edimuj/{vexscan-claude-code,vexscan}, cisco-ai-defense/{mcp-scanner,skill-scanner}, InvariantLabs-ai/mcp-scan, MCP-Defender/MCP-Defender, mintmcp/agent-security, slowmist/MCP-Security-Checklist, aws-samples/sample-mcp-security-scanner, woodruffw/zizmor, trailofbits/{claude-code-config,claude-code-devcontainer} — entire MCP-defender cluster missing

**Eval/benchmark not in W258**:
OpenHands/benchmarks, evo-hq/evo, Human-Agent-Society/CORAL, SWE-agent/mini-swe-agent

**v65-specific new**: github/gh-aw, CORAL, aaif-goose/goose, Gitlawb/openclaude, EveryInc/compound-engineering-plugin

**CAVEAT**: All v55-v65 are **Cohort 7 structural REJECT class** (anonymous LLM-iterated zip-drops; cannot satisfy ≥3-distinct-orgs Axis-1). 0/23 baseline ADOPT-NOW. Net-new repos above are **catalog-novel but not adoption candidates** without independent multi-org verification.

## §F — File disposition

**Canonical kit versions:**
- **v65** — adopt as the ONE canonical (most polished CLAUDE.md, 7 shipped skills, ADVANCED_SOURCE_DEEP_DIVE_PROTOCOL.md is only NEW content artifact across v55-v65)
- **v62** — retain as SECOND canonical (only kit with explicit "226 unique entries" + COMMUNITY_TUTORIAL_REFERENCES pointing at Karpathy/Cherny)

**Archive recommendation:**
- Archive v25-v54 (zips already at `_archives/`; unzipped trees → `_archives/unzipped-stale/`)
- Archive v55-v61, v63, v64 — keep zips at `_archives/`; delete unzipped trees (content fully subsumed by v62 + v65)
- Retain unzipped: ONLY v62 + v65
- Retain README.md as canonical kit-cohort audit trail
- Retain wave52/ audit artifacts — verification record
- Retain research-wave-2026-05-15/ — active research streams

**Net savings**: ~50+ unzipped kit trees × 15-25 files each = ~1000+ duplicate MDs eliminated; zips preserved.

**Honest caveat**: Per README L43-L57 audit trail, kits produced **zero adopted primitives** across 11 cohort sweeps. Value is purely as **discovery surface** for net-new repo names worth independent Probe-DAG verification — not architectural decisions.
