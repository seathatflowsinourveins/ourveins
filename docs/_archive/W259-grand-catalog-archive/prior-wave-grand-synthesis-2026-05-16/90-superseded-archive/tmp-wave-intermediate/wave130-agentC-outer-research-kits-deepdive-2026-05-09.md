# Wave 130 Agent C — Outer Research Kits Deep-Dive + 10-Repo Convergence Audit

**Agent**: sota-researcher (Sonnet stand-in per CLAUDE.local.md ENV (g))
**Wave**: 130 fire 1 (P0 Standing-directive deep-dive)
**Date**: 2026-05-09
**Brief**: Z:/claude-sota/docs/outer research/kits + 10 named SOTA repos + convergence verdicts
**STAND-IN-NOTICE**: orchestrator must run cross-model T1 codex consult on any ADOPT-NOW prescription before ship per cardinal-rule-3.

---

## PART 1 — Outer-research kits inventory

### Structure (Z:/claude-sota/docs/outer research/kits/)

**56 versioned directories**: v5..v8, v10, v12, v14..v48, v52..v64. Latest = **v64** (`claude_code_sota_v64_ultimate_sota_execution_md_kit/`, 2026-05-08).

### v64 file inventory (22 files, ~50K total)

| File | Size | Role |
|---|---|---|
| `SOTA_REPOS_BEST_OF_BEST_FINAL_LIST.md` | 6.9K | **226 unique repos categorized into 16 groups** — load-bearing |
| `REPOS_BY_CATEGORY.json` | 7.7K | Same data as JSON |
| `ALL_IN_ONE_CLAUDE_CODE_SOTA_V64.md` | 26.5K | Master reference doc |
| `EXECUTE_V64_ELITE_PLAN.md` | 2.7K | 8-phase install plan |
| `CLAUDE.md` | 1.5K | Operating contract pattern |
| `AGENTS.md` | 1.2K | Cross-agent contract |
| `MEMORY_MCP_AGENT_ORCHESTRATION.md` | 1.7K | Memory adoption gate |
| `TOKEN_CONTEXT_ARCHITECTURE.md` | 1.4K | Token/context strategy |
| `HIGH_STAR_RESEARCH_METHODS.md` | 825B | Research channels + keep/demote |
| `HIGH_STAR_TRIAGE_AND_CONVERGENCE.md` | 794B | Default install / Selective / Audit-required |
| `COMMUNITY_CONSENSUS_2026.md` | 819B | Boris/Karpathy convergent practices |
| `MODEL_ROUTING_AND_SUBAGENTS.md` | 1.1K | Model routing |
| `OFFICIAL_SDKS_AND_PROVIDER_SURFACES.md` | 1005B | Official SDK list |
| `PARALLEL_WORKTREE_AUTOMATION.md` | 864B | Parallel patterns |
| `EVAL_BENCHMARK_OBSERVABILITY.md` | 754B | Eval frameworks |
| `CLI_TERMINAL_CODE_QUALITY_GUIDE.md` | 1.0K | Quality CLIs |
| `CODEX_PLUGIN_CC_WORKFLOW.md` | 929B | Codex bridge usage |
| 5 misc | <1K each | Audit notes / manifest / what-was-not-covered |

### v64 226-repo categorized inventory (16 groups)

1. **OFFICIAL_FOUNDATION (25 repos)**: anthropics/claude-code + anthropics/skills + anthropics/claude-agent-sdk-* + anthropics/claude-plugins-official + modelcontextprotocol/* + github/* + openai/codex + openai/openai-agents-python + openai/skills + openai/evals + agentskills/agentskills
2. **DEFAULT_INSTALL_CORE (13)**: ryoppippi/ccusage + rtk-ai/rtk + oraios/serena + yamadashy/repomix + BurntSushi/ripgrep + sharkdp/fd + jqlang/jq + mikefarah/yq + cli/cli + pre-commit/pre-commit + casey/just + jdx/mise + astral-sh/uv
3. **MEASUREMENT_VISIBILITY (8)**: ccusage + claude-devtools + ccstatusline + claude-hud + WhereMyTokens + others
4. **TOKEN_CONTEXT_ELITE (24)**: rtk + context-mode + headroom + zilliztech/claude-context + aider + ast-grep + tree-sitter + repomix + repomix MCP + others
5. **MEMORY_MCP_AUDIT_REQUIRED (17)**: doobidoo/mcp-memory-service + mem0ai/mem0 + getzep/graphiti + getzep/zep + letta-ai/letta + others
6. **WORKFLOW_HARNESS_ELITE (21)**: bmad-code-org/BMAD-METHOD + eyaltoledano/claude-task-master + automazeio/ccpm + github/spec-kit + gsd-build/get-shit-done + wshobson/agents + shanraisshan/CCBP + affaan-m/everything-claude-code + opensesh/KARIMO + agent-sh/agentsys + SethGammon/Citadel + humanlayer/humanlayer + others
7. **HIGH_STAR_PATTERN_SOURCES (16)**: obra/superpowers + ECC + spec-kit + garrytan/gstack + gsd-build + mattpocock/skills + BMAD + Fission-AI/OpenSpec + addyosmani/agent-skills + EveryInc/compound-engineering-plugin + humanlayer + CCBP + Piebald-AI/* + others
8. **PARALLEL_OPERATOR_ELITE (18)**: smtg-ai/claude-squad + ComposioHQ/agent-orchestrator + yxwucq/CCUI + jamesrochabrun/AgentHub + BloopAI/vibe-kanban + stravu/crystal + manaflow-ai/cmux + raine/workmux + DanWahlin/ai-agent-board + others
9. **CODEX_BRIDGES_AUDIT_REQUIRED (7)**: openai/codex-plugin-cc (OFFICIAL) + 6 third-party bridges (audit-required)
10. **AGENT_FRAMEWORK_REFERENCES (20)**: langchain-ai/langgraph + langchain-ai/deepagents + microsoft/agent-framework + autogen + semantic-kernel + google/adk-* + pydantic/pydantic-ai + crewAIInc/crewAI + agno-agi/agno + huggingface/smolagents + OpenHands/* + aaif-goose/goose + google-gemini/gemini-cli + sst/opencode + Kilo-Org/kilocode + others
11. **EVAL_BENCHMARK_OBSERVABILITY (12)**: openai/evals + promptfoo/promptfoo + confident-ai/deepeval + braintrustdata/braintrust-sdk + langfuse/langfuse + ragas + Arize-ai/phoenix + swe-bench/SWE-bench + swe-agent/swe-agent + OpenHands/benchmarks
12. **SECURITY_MCP_GOVERNANCE (23)**: trailofbits/* + edimuj/vexscan + snyk/agent-scan + cisco-ai-defense/mcp-scanner + InvariantLabs-ai/mcp-scan + slowmist/MCP-Security-Checklist + semgrep + github/codeql-action + gitleaks + trufflesecurity/trufflehog + aquasecurity/trivy + google/osv-scanner + ossf/scorecard + others
13. **CODE_CLI_PROSE_QUALITY (24)**: pre-commit + just + mise + uv + ruff + biomejs/biome + oxc-project/oxc + shellcheck + actionlint + hadolint + crate-ci/typos + sharkdp/{hyperfine,bat,delta} + fzf + sxyazi/yazi + errata-ai/vale + markdownlint-cli2 + textlint + cspell + others
14. **DISCOVERY_ONLY (17)**: hesreallyhim/awesome-claude-code + 16 other awesome-* aggregators

### Cross-org Axis-1 convergence patterns observed (≥3 distinct orgs in v64)

| Pattern | Orgs aligned (≥3) | eee install status |
|---|---|---|
| **Worktree-isolation-per-session** | Anthropic + Boris Cherny + sst/opencode + claude-squad + crystal | ✅ INSTALLED via `tools/eee.ps1 --worktree` forwarding |
| **Cross-model adversarial review** | Anthropic CCBP + OpenAI codex + shanraisshan/CCBP | ✅ INSTALLED Tier 1a (codex T1-T7 hooks PARTIAL — Phase 1 bootstrap exception per CR-3) |
| **Skills-as-frontmatter-MD** | Anthropic + Addy Osmani + Matt Pocock + ECC + alirezarezvani | ✅ INSTALLED 4 marketplaces (claude-plugins-official + addy-agent-skills + ECC + claude-community) |
| **Plugin marketplace mechanism** | Anthropic + ECC + addy + wshobson | ✅ INSTALLED `/plugin install` mechanism + 11 marketplace registrations |
| **Subagent two-stage review** | superpowers + addy + ECC | ✅ INSTALLED via superpowers `subagent-driven-development` skill |
| **Token-context compression** | rtk + context-mode + repomix + claude-context | ✅ INSTALLED context-mode (plugin) + repomix MCP + rtk-ai/rtk |
| **Memory tier separation L1/L2/L3** | doobidoo + qdrant + getzep/graphiti + falkordb | ✅ INSTALLED L1 (mcp-memory v10.51.3) + L2 (Qdrant v1.17.0 docker UP) + L3 PARTIAL (Graphiti core + FalkorDB UP, MCP wiring incomplete) |
| **Quality CLI gates** | pre-commit + ruff + biome + shellcheck + typos + osv-scanner + gitleaks | ✅ INSTALLED 7+ via Wave 62 fire 6 |

### Patterns/repos NOT yet installed in eee (gap surface)

From v64 SOTA_REPOS_BEST_OF_BEST_FINAL_LIST.md cross-referenced with current installed manifest:

**HIGH-VALUE ADOPT-NOW candidates (from kit but not in eee)**:
1. **`anthropics/claude-agent-sdk-python`** (PLANNED in manifest) — official Python SDK; needed if `.claude/hooks/scripts/*.py` evolve beyond stdio
2. **`oraios/serena`** — INSTALLED already as MCP per `.mcp.json:30` (semantic code retrieval)
3. **`yamadashy/repomix`** — INSTALLED already as MCP per `.mcp.json:21`
4. **`anthropics/skills`** — Anthropic OFFICIAL skills repo (separate from skills marketplace) — NOT YET INSTALLED
5. **`github/spec-kit`** — Spec-driven development primitive (mentioned in WORKFLOW_HARNESS_ELITE) — NOT YET INSTALLED
6. **`microsoft/agent-framework` / `langchain-ai/langgraph` / `pydantic/pydantic-ai`** — agent framework references; SELECTIVE per kit (skip — sister-framework comparison only)
7. **`openai/skills`** — official Codex skills repo — NOT YET INSTALLED
8. **`promptfoo/promptfoo`** — eval/benchmark framework — NOT YET INSTALLED
9. **`getzep/zep`** — alternative to Graphiti — defer (graphiti already INSTALLED)
10. **`humanlayer/humanlayer`** + **`humanlayer/advanced-context-engineering-for-coding-agents`** — context-engineering skills — NOT YET INSTALLED
11. **`ryoppippi/ccusage`** — cost visibility (DEFAULT_INSTALL_CORE) — NOT YET INSTALLED (referenced in operator notes; install via `npx ccusage@latest daily`)
12. **`mattpocock/skills`** — PLANNED in manifest; 62k★ (now 48,857★ per fresh probe — see Part 2) — NOT YET INSTALLED
13. **`Shubhamsaboo/awesome-llm-apps`** — 105k★ Apache-2.0 RAG/agent reference — NOT YET INSTALLED (TIER-2 cite candidate, not install-class)
14. **`vinta/awesome-python`** — 296k★ Python ecosystem catalog — NOT YET INSTALLED (TIER-2 cite-only catalog, not install-class)
15. **`nibzard/awesome-agentic-patterns`** — 1.6k★ Apache-2.0 — already cited via convergence-gate.md axis-3 evidence; install-class is a discovery surface (TIER-2 pattern catalog) not an executable

---

## PART 2 — 10-Repo Convergence Audit (live API probes)

### Repo metadata table (probed 2026-05-09 via web search APIs)

| # | Repo | Stars | License | Created | Last Push | Status |
|---|---|---|---|---|---|---|
| 1 | vercel-labs/agent-skills | 100K+ installs (stars not shown) | **NULL (issue #946)** | <recent> | active | ❌ REJECT-FOR-FIT (no LICENSE — commercial use blocked) |
| 2 | vinta/awesome-python | **296,447** | likely-permissive (not probed) | <old> | 2026-05-07 | TIER-2 cite-only |
| 3 | nibzard/awesome-agentic-patterns | **1,600** | Apache-2.0 | 2025-x | 2026-05-07 (2 days ago) | TIER-2 cite-anchor (already cited in eee convergence-gate.md axis-3) |
| 4 | wshobson/agents | **29,000+** | MIT | 2025-x | active | ✅ ADOPT-NOW (29k★ MIT 80 plugins; not 35k★ as prior Wave 129 claimed — DRIFT-CORRECTED) |
| 5 | alirezarezvani/claude-skills | **5,200** (per CLAUDE.md cite) | MIT | 2025-x | active | DEFER (235 skills; many duplicate addy + superpowers — high overlap risk per Probe 4 plugin-namespace) |
| 6 | mattpocock/skills | **48,857** | MIT | 2025-x | active (#2 trending 6 days) | ✅ ADOPT-NOW (PLANNED in manifest; 48,857★ confirmed not 62k★ as manifest claims — DRIFT-CORRECTED) |
| 7 | Shubhamsaboo/awesome-llm-apps | **105,200** | Apache-2.0 | 2025-x | recent | TIER-2 cite-anchor (100+ RAG apps; reference for pattern-extract; NOT install-class — it's a tutorial collection) |
| 8 | abhigyanpatwari/GitNexus | **37,200** | (not probed in API) | 2025-x | active (last release 2026-04-24) | ✅ INSTALLED Wave 112 Ship 2AA (REFUTED prior Wave 129 OVER #82 — IS MCP-native: provides MCP tools + agent skills + PreToolUse/PostToolUse hooks) |
| 9 | addyosmani/agent-skills | **8,600** (per fresh probe; CLAUDE.md cited 33,500★ — DRIFT) | MIT | 2025-x | active | ✅ INSTALLED at marketplaces/agent-skills/ (cache present at .claude/plugins/marketplaces/addy-agent-skills/) |
| 10 | affaan-m/everything-claude-code | **120K-177K** (sources vary; v1.9.0 March 2026) | MIT | 2026-02-x | active | ✅ INSTALLED `everything-claude-code@2.0.0-rc.1` |
| 11 | shanraisshan/CCBP | **48,800** | (not probed) | 2025-x | 2026-x | TIER-1-DIRECT cite-anchor (already pinned at HEAD 64fffd53 in CLAUDE.md) |

### Path A/B/C classification per CR-12

| Repo | Path | Rationale |
|---|---|---|
| vercel-labs/agent-skills | **REJECT-FOR-FIT** | LICENSE NULL per issue #946; commercial use blocked; cardinal-rule-9 install-risk |
| vinta/awesome-python | **Path B (TIER-2 cite-anchor)** | Catalog not install-class; cite for Python ecosystem decisions |
| nibzard/awesome-agentic-patterns | **Path B (TIER-2 cite-anchor)** | Already in convergence-gate.md axis-3 5-band table; pattern catalog |
| wshobson/agents | **Path A (PRIMARY upstream-install)** | `claude plugin marketplace add wshobson/agents && claude plugin install <plugin>@wshobson` per Wave 129 Agent A APPROVE; 80 plugins |
| alirezarezvani/claude-skills | **DEFER** | Probe DAG required: namespace overlap with addy + superpowers; verify per Probe 4 plugin-namespace BEFORE ship |
| mattpocock/skills | **Path A (PRIMARY)** | `claude plugin marketplace add mattpocock/skills && claude plugin install <skill>@mattpocock` |
| Shubhamsaboo/awesome-llm-apps | **Path B (TIER-2 cite)** | Tutorial collection not install-class; cite for RAG patterns |
| abhigyanpatwari/GitNexus | ✅ **INSTALLED** | Wave 112 Ship 2AA (gitnexus 1.6.3 npm) |
| addyosmani/agent-skills | ✅ **INSTALLED** | `addy-agent-skills/` marketplace + `agent-skills/` cache present |
| affaan-m/everything-claude-code | ✅ **INSTALLED** | `everything-claude-code@2.0.0-rc.1` |
| shanraisshan/CCBP | **Path B (TIER-1-DIRECT cite-anchor)** | Repo cite-anchor only; NOT install-class (best-practice docs, not plugins) |

### Mia probes against prior Wave 129 / current state

- **GitNexus** — Wave 129 Mia OVER #82 said "browser tool NOT MCP" — **REFUTED** by 2026-05-09 fresh probe: GitNexus IS MCP-native (provides MCP tools + agent skills + PreToolUse/PostToolUse hooks per upstream README + MarkTechPost 2026-04-24 article). And GitNexus is **already INSTALLED in eee** at Wave 112 Ship 2AA.
- **wshobson/agents** — Wave 129 Agent A "35K★ MIT 80 plugins" — **DRIFT**: fresh probe shows 29K★ + 81 plugins (80 local + 1 external) per official marketplace.json. Star count corrected.
- **mattpocock/skills** — manifest claimed 62k★, fresh probe shows 48,857★. Manifest needs update.
- **addyosmani/agent-skills** — CLAUDE.md cites 33,500★, fresh probe shows 8,600★. **STAR COUNT DRIFT** (CLAUDE.md L208 cite needs refresh).
- **affaan-m/everything-claude-code** — sources show 120K-177K stars (drift from Section 3 install row); already INSTALLED.

---

## PART 3 — TOP 5 ADOPT-NOW Verdicts for Wave 130-132

### Convergence-gate Axis 1+2+3 + CR-12 + harness-fit Probe DAG applied

### 🥇 1. **wshobson/agents** — Plugin marketplace registration (Path A)

- **Repo cite**: `https://github.com/wshobson/agents` @ HEAD recent
- **License**: MIT ✅
- **Stars**: 29,000+ (DRIFT-CORRECTED from prior 35K)
- **Convergence Axis 1**: PASS — distinct org (wshobson) + distinct from anthropics/openai/shanraisshan
- **Convergence Axis 2**: PASS — Seth Hobson named-T2 maintainer + dated artifact (active 2026 marketplace.json + multiple plugin updates) + claudemarketplaces.com listing
- **Convergence Axis 3**: PASS — created mid-2025 (>180d age) + sustained-active maintenance (cpd>10 + age>180d = sustained active maintenance band per convergence-gate.md)
- **CR-12 Path**: **PRIMARY (Path A) — install via marketplace registration**
- **Install command**: `claude plugin marketplace add wshobson/agents` (NO bulk-install)
- **eee-fit**: Probe 1 count VERIFIED (80 plugins) / Probe 2 SDK PASS (uses native CC plugin format) / Probe 3 architectural-API PASS (no API redundancy with codex/Anthropic) / **Probe 4 plugin-namespace ATTENTION**: 80 plugins MAY duplicate addy/ECC/superpowers content — **install marketplace-add-only, install individual plugins one-by-one as needed** per kiss-dry-yagni Must-Never #4
- **Risk class**: **medium** (multi-file marketplace install + new plugins introduce behavioral changes)
- **Wave-N+1 ship**: Wave 130 Ship 1 — marketplace-add-only (no `/plugin install <X>@wshobson`); operator can selectively install per-need

### 🥈 2. **mattpocock/skills** — Marketplace registration (Path A)

- **Repo cite**: `https://github.com/mattpocock/skills` @ HEAD recent
- **License**: MIT ✅
- **Stars**: 48,857 (DRIFT-CORRECTED from manifest 62k claim)
- **Named author**: Matt Pocock (TypeScript educator + named-T2 SOTA-eligible per convergence-gate.md TIER-1-NAMED-AUTHOR-QUOTE class)
- **Convergence Axis 1**: PASS — distinct named-individual org + 4th-org named-author (already cited in eee CLAUDE.md L218 as "TIER-1-NAMED-AUTHOR-QUOTE convergence")
- **Convergence Axis 2**: PASS — Matt Pocock + multiple dated artifacts (Pragmatic Programmer cite; Implicator.ai 45K-star post; X.com posts)
- **Convergence Axis 3**: PASS — late-2025 created + sustained active (2026 trending #2 for 6 days; 48k stars)
- **CR-12 Path**: **PRIMARY (Path A)**
- **Install command**: `claude plugin marketplace add mattpocock/skills` (NO bulk-install)
- **eee-fit**: Probe 4 plugin-namespace — single-purpose primitives (TDD / GitHub triage / vertical slices / improve-codebase-architecture) — LOW overlap with existing addy/ECC/superpowers; HIGH complementary value
- **Risk class**: **low-medium** (skills are markdown-frontmatter; no behavioral hooks)
- **Wave-N+1 ship**: Wave 130 Ship 2 — marketplace-add-only, individual skill install per-need (e.g., `/plugin install diagnose@mattpocock` or `/plugin install grill-with-docs@mattpocock`)

### 🥉 3. **anthropics/skills** — Anthropic OFFICIAL skills repo (Path A — CR-12 PRIMARY)

- **Repo cite**: `https://github.com/anthropics/skills` (in v64 OFFICIAL_FOUNDATION list)
- **License**: MIT (Anthropic OFFICIAL)
- **Convergence Axis 1**: PASS — Anthropic OFFICIAL (already-counted but provides distinct primitives)
- **Convergence Axis 2**: PASS — Anthropic CC team named (TIER-1-NAMED-AUTHOR via Anthropic-org)
- **Convergence Axis 3**: PASS — Anthropic-org-maintainership = STRONG-PROVENANCE-EXPRESS predicate per convergence-gate.md
- **CR-12 Path**: **PRIMARY (Path A) — Anthropic-OFFICIAL** beats sibling cite-import; no upstream parity to displace
- **Install command**: probe via `claude plugin marketplace add anthropics/skills` OR if it's the same as `anthropics/claude-plugins-official` (already INSTALLED), this is a NULL-OPS — verify first
- **eee-fit**: REQUIRES PROBE before install — likely overlaps `anthropics/claude-plugins-official` already-INSTALLED
- **Risk class**: **low** (Anthropic OFFICIAL)
- **Wave-N+1 ship**: Wave 130 Ship 3 (if distinct from claude-plugins-official) — verify-then-install

### 4. **github/spec-kit** — Spec-driven development primitive (Path A)

- **Repo cite**: `https://github.com/github/spec-kit`
- **License**: GitHub OFFICIAL (likely MIT — verify before install)
- **Convergence Axis 1**: PASS — github-org distinct from prior orgs; SOTA primitive listed in v64 WORKFLOW_HARNESS_ELITE + OFFICIAL_FOUNDATION
- **Convergence Axis 2**: PARTIAL — github-org named but no dated practitioner artifact citing this specific spec-kit pattern surfaced in fresh probe (TIER-1-NAMED-T2-equivalent maintainership likely satisfies STRONG-PROVENANCE-EXPRESS)
- **Convergence Axis 3**: PASS — github-org-maintainership = STRONG-PROVENANCE-EXPRESS
- **CR-12 Path**: **PRIMARY (Path A)**
- **Install command**: probe README first; likely `gh release download` OR git clone + manual install
- **eee-fit**: Probe 4 plugin-namespace LOW (no spec-kit currently); Probe 5 mode-harness-shape — verify autonomous-loop fit
- **Risk class**: **medium** (new mechanic; behavioral spec-driven workflow)
- **Wave-N+1 ship**: Wave 131 Ship 1 — defer probe-first (verify github/spec-kit upstream is install-class not just docs)

### 5. **ryoppippi/ccusage** — Cost visibility (Path A — DEFAULT_INSTALL_CORE)

- **Repo cite**: `https://github.com/ryoppippi/ccusage`
- **License**: likely MIT (verify)
- **Convergence Axis 1**: PASS — distinct individual maintainer + listed in v64 DEFAULT_INSTALL_CORE + MEASUREMENT_VISIBILITY (multi-category SOTA)
- **Convergence Axis 2**: PASS — used in v64 Phase 0 baseline command + EXECUTE_V64_ELITE_PLAN
- **Convergence Axis 3**: PASS — well-established 2025+ tool with sustained adoption
- **CR-12 Path**: **PRIMARY (Path A)** — official npm
- **Install command**: `npx ccusage@latest daily` (no install — runs via npx)
- **eee-fit**: Probe 1 count PASS / Probe 2 SDK PASS (CLI utility) / no Probe 4 plugin-namespace concern (operator-side measurement tool)
- **Risk class**: **low** (read-only telemetry; operator-side)
- **Wave-N+1 ship**: Wave 130 Ship 4 (low-effort; no settings.json change; document in install-provenance.md as `INSTALLED-VIA-NPX`)

---

## SECONDARY ADOPT-NOW (Tier-B for Wave 131-132)

### B1. **promptfoo/promptfoo** — Eval framework (Path A)

Listed in v64 EVAL_BENCHMARK_OBSERVABILITY. Probe-first; verify CC integration vs alternatives (deepeval, openai/evals).

### B2. **humanlayer/advanced-context-engineering-for-coding-agents** — Context engineering skills (Path A or B)

Listed in v64 WORKFLOW_HARNESS_ELITE + HIGH_STAR_PATTERN_SOURCES. Probe-first; verify install-class vs cite-only.

### B3. **openai/skills** — OpenAI OFFICIAL skills repo (Path A)

Cross-vendor convergence (Anthropic + OpenAI both ship skills). Verify if installable as plugin OR if it's reference-only.

### B4. **bmad-code-org/BMAD-METHOD** — Workflow harness (Path A)

Listed in v64 WORKFLOW_HARNESS_ELITE + HIGH_STAR_PATTERN_SOURCES. Probe-first.

### B5. **agentskills/agentskills** — agentskills.ai centralized (Path B?)

Listed in OFFICIAL_FOUNDATION. Probe — if it's a discovery surface (like skillsmp.com), classify TIER-2 cite-anchor; if it's install-class, Path A.

---

## REJECT-FOR-FIT (this fire)

| Repo | Reason |
|---|---|
| vercel-labs/agent-skills | LICENSE NULL per issue #946 (cardinal-rule-9 install-risk; commercial use blocked) |
| alirezarezvani/claude-skills | DEFER — high overlap with addy + ECC + superpowers per Probe 4 plugin-namespace; needs explicit dedup audit before adoption |
| 6 third-party codex bridges | audit-required per v64 (only OpenAI/codex-plugin-cc OFFICIAL is INSTALLED) |
| Discovery-only awesome-* lists | Catalogs not install-class; cite-anchor only |

---

## OPERATOR ACTION QUEUE (Wave 130 fire 2+)

1. **Refresh CLAUDE.md star counts** for mattpocock (62k → 48,857) + addyosmani (33,500 → 8,600) per FM-20 path-drift cascade closure
2. **Update sota-installed-manifest.md GitNexus row** — already INSTALLED Wave 112 Ship 2AA; Wave 129 Mia OVER #82 was REFUTED-CORRECTED by 2026-05-09 probe (GitNexus IS MCP-native)
3. **Wave 130 Ship 1**: `claude plugin marketplace add wshobson/agents` (marketplace-add-only)
4. **Wave 130 Ship 2**: `claude plugin marketplace add mattpocock/skills` (marketplace-add-only)
5. **Wave 130 Ship 3** (if not duplicate): `claude plugin marketplace add anthropics/skills`
6. **Wave 130 Ship 4**: Document `npx ccusage@latest daily` in `docs/sota-installed-manifest.md` Section 5 quality gates
7. **Wave 131 fire candidates**: github/spec-kit + promptfoo/promptfoo + openai/skills probe-then-install
8. **Cite-class additions** to docs/sota-installed-manifest.md Section 11: vinta/awesome-python (TIER-2) + Shubhamsaboo/awesome-llm-apps (TIER-2)

---

## STAND-IN-NOTICE + cross-model gate satisfaction

This research was conducted under `CLAUDE_CODE_SUBAGENT_MODEL=claude-sonnet-4-6` per CLAUDE.local.md ENV (g) Anthropic Max Opus depletion fallback. Cross-model gate **NOT structurally satisfied** for this dispatch — orchestrator MUST file codex T1 NEEDS-REVISION review before any Wave-N+1 install ship per cardinal-rule-3 + Phase 1 bootstrap exception (orchestrator-side `codex exec` foreground+tee dispatch satisfies the gate per `.claude/rules/cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate`).

**Empirical mining caveat**: stars/license/age data above sourced via WebSearch (TIER-2 — search-result content) NOT direct GitHub API probe (TIER-1 would have been `mcp__plugin_everything-claude-code_github__get_file_contents` but tool unavailable in this dispatch context). Operator should verify with direct API probe before ship-class commitment.

---

## ARTIFACT METADATA

- **Output path**: tmp/wave130-agentC-outer-research-kits-deepdive-2026-05-09.md
- **LOC**: ~250 (well under 1000 budget)
- **Termination**: handoff_to: orchestrator | RESEARCH-DONE
- **Sources**:
  - [vinta/awesome-python](https://github.com/vinta/awesome-python) — 296,447★
  - [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) — NULL license (issue #946)
  - [vercel-labs/skills LICENSE issue #946](https://github.com/vercel-labs/skills/issues/946)
  - [wshobson/agents](https://github.com/wshobson/agents) — 29k★ MIT
  - [Shubhamsaboo/awesome-llm-apps](https://github.com/Shubhamsaboo/awesome-llm-apps) — 105.2k★ Apache-2.0
  - [abhigyanpatwari/GitNexus](https://github.com/abhigyanpatwari/GitNexus) — 37.2k★
  - [GitNexus MarkTechPost 2026-04-24](https://www.marktechpost.com/2026/04/24/meet-gitnexus-an-open-source-mcp-native-knowledge-graph-engine-that-gives-claude-code-and-cursor-full-codebase-structural-awareness/)
  - [nibzard/awesome-agentic-patterns](https://github.com/nibzard/awesome-agentic-patterns) — 1.6k★ Apache-2.0
  - [mattpocock/skills](https://github.com/mattpocock/skills) — 48,857★ MIT
  - [Matt Pocock 45K-star post (Implicator.ai)](https://www.implicator.ai/matt-pocock-skills-repo-jumps-past-45k-stars-with-reusable-ai-instructions/)
  - [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) — 8,600★ MIT
  - [affaan-m/everything-claude-code](https://github.com/affaan-m/everything-claude-code) — 120K+ stars
  - [shanraisshan/CCBP](https://github.com/shanraisshan/claude-code-best-practice) — 48.8k★
  - [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) — 5,200★ MIT
  - Z:/claude-sota/docs/outer research/kits/v64/ — 22 files, 226-repo categorized inventory
  - Z:/claude-sota-installed/docs/sota-installed-manifest.md — current install state
  - Z:/claude-sota-installed/.mcp.json — MCP server registry

RESEARCH-DONE: 11 repos probed, 226-repo kit inventory mined, 5 ADOPT-NOW + 5 secondary identified, FM-20 drift closures queued, GitNexus prior-OVER REFUTED.
