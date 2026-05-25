# Wave 146 Fire 1 Agent B — sota-researcher deep dive
# Outer research/kits convergence + 10 named SOTA repo Probe DAG
# Date: 2026-05-11 | Mode: Sonnet stand-in per CLAUDE.local.md ENV (f) baseline
# Cross-model gate NOT structurally satisfied for THIS dispatch's verdict per cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate
# Orchestrator relies on parallel Path P REAL GPT-5.5 dispatches Agent A + Agent C for cross-model gate
# Orchestrator label: AGENT B (Agent A is Path P codex T1 cleanliness audit; agent's own ARTIFACT-INLINE self-labeled "Agent A" but per orchestrator naming it's Agent B)

## TASK 1 — Outer research/kits convergence (v10-v25 scope; 35 versions detected, v10-v25 = 16 versions sampled)

### TOP 3 patterns appearing in ≥3 versions (load-bearing convergence)

1. **Codex Plugin for CC + Codex as Second-Model Witness** — appears in v10/v15/v20/v25 (all 4 sampled with `CODEX_PLUGIN_CC_WORKFLOW.md`)
   - Cite v25: `ELITE_CONVERGENCE_DESIGN.md > 3. Codex is a witness` — "Use Codex as second-model witness. Use deterministic CLI/security gates."
   - Cite v20: `ALL_IN_ONE V20.md` operating thesis — "Use Codex as second-model witness."
   - Maps DIRECTLY to eee's cardinal-rule-3 cross-model consensus (Claude orchestrates / Codex reviews; T1-T5 lifecycle).

2. **Parallel Worktree Automation as Concurrency Primitive** — appears in v10 (`PARALLEL_GIT_WORKTREE_PLAYBOOK.md`) / v15 / v20 / v25 (`PARALLEL_WORKTREE_AUTOMATION.md`)
   - Cite v25 verbatim: `# Parallel Worktree Automation > Native pattern` → `git fetch --all --prune && claude --worktree cc-123-feature && claude --worktree cc-124-bugfix && claude --worktree cc-125-refactor` + `.gitignore: .claude/worktrees/`
   - Cite v25 elite design: "4. Worktrees are the concurrency primitive"
   - Maps to eee Wave 50 fire 3 parallel-session-worktree-isolation discipline (sibling-cite-import CR-12 cite-class).

3. **Token/Context as Scarce Resource + Semantic Retrieval over Reads** — appears in v10/v15/v20/v25 (`TOKEN_OPTIMIZATION_ARCHITECTURE.md` → renamed `TOKEN_CONTEXT_ARCHITECTURE.md` in v25)
   - Cite v25 elite design: "1. Context is the scarce resource" + v20 operating thesis: "Use semantic retrieval before file reads. Filter tool output before context."
   - Cite v25 default stack: `ccusage / RTK / Serena / Repomix` (4-tool layer)
   - Maps to eee Wave 109 Ship 2P Phoenix observability + cpa-usage-keeper + cwc commit-on-stop.

### TOP 3 unique insights v23-v25 NOT yet in 01-corrected-architecture.md

1. **"Read-path token waste is bigger than shell-output waste"** (v25 `CODEX_PLUGIN_CC_WORKFLOW.md`)
   - Verbatim: "RTK helps shell output. It does not solve built-in Read/Grep/Glob or repeated file exploration. V25 therefore keeps Serena, Claude Context, Repomix, ast-grep, tree-sitter, Wet, Distill, and context-budget tooling as a separate layer."
   - 01-corrected-architecture.md L8 L1 DISCOVERY layer mentions Serena/Repomix but does NOT explicitly distinguish read-path-token-waste vs shell-output-waste. Eligible for L3 Sub-layer codification.

2. **Pattern Libraries Must NOT Be Runtime Dependencies** (v25 `CODEX_PLUGIN_CC_WORKFLOW.md > 3. Pattern libraries should not be runtime dependencies`)
   - Verbatim direction: pattern catalogs (awesome-agentic-patterns, awesome-llm-apps) are DISCOVERY-ONLY, not install-class. Maps to eee CR-12 disposition lattice CITE-PATTERN-ONLY class but is not explicitly enumerated in 01-corrected-architecture.md L1 DISCOVERY policy.

3. **High-Star Triage Discipline ("high-star does NOT equal high quality")** (v25 `WHAT_WAS_NOT_COVERED_AND_CLOSED.md > 1.`)
   - Verbatim: "Earlier passes included many high-star repos, but the correct criterion is architecture leverage. V25 keeps high-star repos only when they improve: context control / semantic retrieval / worktree isolation / workflow state / review independence / quality/security gates / benchmark feedback / source auditability."
   - 01-corrected-architecture.md Correction #1 mentions star/popularity demotion but does NOT have the 8-axis architecture-leverage criterion. Eligible for L1 DISCOVERY codification.

## TASK 2 — 10 named SOTA repo Probe DAG 1-4 [VERIFIED 2026-05-11 via mcp__github__get_file_contents + gh CLI direct GitHub API]

| # | Repo | License | Stars | Last commit | Plugin-namespace (vs eee installed plugins) | SRA D6 mode-harness compat |
|---|---|---|---|---|---|---|
| R1 | vercel-labs/agent-skills | **NULL — no LICENSE file** [VERIFIED via `gh api .../contents/LICENSE` empty] | 26,389 | 2026-05-07 | DUPLICATE-ish to addy-agent-skills (both "Agent Skills" format per agentskills.io); UNKNOWN-LICENSE | **FAIL** — CR-9 license-class FAIL per W137F2 Mia OVER #158 precedent |
| R2 | vinta/awesome-python | **CC BY 4.0** (NOASSERTION → confirmed via LICENSE direct read) | 297,000 | 2026-05-10 | NOVEL (no Python-only catalog plugin in eee) | **FAIL-for-install** (awesome-list = discovery-only) / **PASS-for-cite-only** |
| R3 | nibzard/awesome-agentic-patterns | Apache-2.0 | 4,507 | 2026-05-07 | NOVEL (pattern catalog; companion to eee `Z:/repos/deps/awesome-agentic-patterns @ffb42768`) | **PASS-cite-only** (already extensively cited in `parallel-sessions.md` + `team-orchestration.md`) |
| R4 | wshobson/agents | MIT | 35,153 | 2026-05-09 | **PARTIAL — 185 agents / 16 orchestrators / 153 skills / 100 cmds / 80 plugins**; intersects with everything-claude-code + claude-plugins-official skills | **PASS** for selective cite-extract (REJECT-FOR-FIT-MAJORITY per Wave 138 Fire 1 audit — 76/80 plugins rejected; survivors: protect-mcp + signed-audit-trails + shell-scripting) |
| R5 | alirezarezvani/claude-skills | MIT | 14,366 | 2026-05-10 | **PARTIAL** — 235 skills / 28 agents / 27 commands across 9 domains; intersects with addy-agent-skills + eee plugins | **PASS** for selective cite-extract (Maintainer self-audit POWERFUL/SOLID/GENERIC/WEAK methodology IS useful per `team-orchestration.md` cite) |
| R6 | mattpocock/skills | MIT | 69,685 | 2026-05-10 | NOVEL — installer via `skills.sh` (npm/skills@latest); not in eee marketplace cache | **FAIL** — Wave 137 Fire 1 REJECT-FOR-FIT documented at `agent-harness-fit-verification.md:115` (iter-92 HARD-GATE setup-matt-pocock-skills `disable-model-invocation: true` + 3 sequential interactive prompts — incompatible with autonomous /loop mode) |
| R7 | Shubhamsaboo/awesome-llm-apps | Apache-2.0 | 109,667 | 2026-05-09 | NOVEL (LLM apps catalog; companion to nibzard) | **PASS-cite-only** (DISCOVERY_ONLY class per v25 SOTA_REPOS_BEST_OF_BEST_FINAL_LIST.md categorization) |
| R8 | abhigyanpatwari/GitNexus | **PolyForm Noncommercial 1.0.0** [VERIFIED direct LICENSE read] | 37,546 | 2026-05-11 | NOVEL (no Knowledge-graph MCP in eee; eee uses Graphiti FalkorDB) | **FAIL** — Probe 6 STRUCTURAL BLOCKER (Noncommercial license incompatible with permissive-only eee policy per CR-9 + sibling Wave 137/138 license discipline). Sibling has `gitnexus --repo` references at HEAD `b512f256` Path B HNF — already cite-import-AMBER |
| R9 | addyosmani/agent-skills | MIT | 38,793 | 2026-05-10 | **ALREADY INSTALLED** at `.claude/plugins/marketplaces/addy-agent-skills/` (Wave 82l cite-anchor) | **PASS** — INSTALLED; cite-class TIER-1-NAMED-AUTHOR-QUOTE per cardinal-rule-1 Addy Osmani 4th-org reinforcement |
| R10 | affaan-m/everything-claude-code | MIT | 178,601 | 2026-05-11 | **ALREADY INSTALLED** at `.claude/plugins/cache/everything-claude-code/everything-claude-code/2.0.0-rc.1/` per Wave 50 fire 14 | **PASS** — INSTALLED; canonical authority for `agentic-engineering`, `autonomous-loops`, `safety-guard` skills per CLAUDE.md L450 |

## TASK 3 — CR-12 5-class disposition

| # | Repo | CR-12 class | Rationale |
|---|---|---|---|
| R1 | vercel-labs/agent-skills | **REJECT-FOR-FIT** | Probe 6 license-class FAIL (null LICENSE) + Probe 4 DUPLICATE-ish with R9 addy-agent-skills (both agentskills.io format) — kiss-dry-yagni Must-Never #4 + CR-9 license whitelist |
| R2 | vinta/awesome-python | **PARTIAL-OVERLAP** (CITE-PATTERN-ONLY) | CC BY 4.0 catalog license; discovery-only; eee already has `awesome-python` cite-anchor at `research-protocol.md` |
| R3 | nibzard/awesome-agentic-patterns | **PARTIAL-OVERLAP** (CITE-PATTERN-ONLY) | Already extensively cite-anchored in `parallel-sessions.md` Recipe rules + `team-orchestration.md` P1/P9/P10/P12 — NOT install-class |
| R4 | wshobson/agents | **PARTIAL-OVERLAP** (STUDY-PILOT-PATTERN-EXTRACT — narrow) | Wave 138 Fire 1 verdict REJECT-FOR-FIT-MAJORITY 76/80; selective survivors protect-mcp / signed-audit-trails / shell-scripting per `agent-harness-fit-verification.md:115` |
| R5 | alirezarezvani/claude-skills | **PARTIAL-OVERLAP** (STUDY-PILOT-PATTERN-EXTRACT — narrow) | 235 skills overlaps with eee 21 active plugins; Maintainer self-audit POWERFUL/SOLID/GENERIC/WEAK methodology cite-only-extract candidate per `team-orchestration.md` `Z:/repos/deps/claude-skills` cite |
| R6 | mattpocock/skills | **REJECT-FOR-FIT** | SRA D6 mode-harness FAIL (HARD-GATE install per iter-92 documented at `agent-harness-fit-verification.md:115`); incompatible with autonomous /loop |
| R7 | Shubhamsaboo/awesome-llm-apps | **PARTIAL-OVERLAP** (CITE-PATTERN-ONLY) | DISCOVERY_ONLY class; awesome-list aggregator; no install-class artifact |
| R8 | abhigyanpatwari/GitNexus | **REJECT-FOR-FIT** | Probe 6 STRUCTURAL BLOCKER (PolyForm Noncommercial → cannot satisfy permissive license whitelist per CR-9); sibling already has cite-import-AMBER reference |
| R9 | addyosmani/agent-skills | **GENUINELY-NEW** (already installed) | INSTALLED at `marketplaces/addy-agent-skills/`; canonical for engineering-phase skills (21 skills per CLAUDE.md L440) — Skill Orchestration Discipline already integrates |
| R10 | affaan-m/everything-claude-code | **GENUINELY-NEW** (already installed) | INSTALLED at `cache/everything-claude-code/2.0.0-rc.1/`; canonical for 200+ skills + 1500+ SKILL.md files per CLAUDE.md L440-460 |

## TASK 4 — TOP 3 install candidates ranked for Wave 146 Fire 2

**HONEST-NON-FINDING — NO new install candidates emerge from this 10-repo sweep.** All 10 repos either ALREADY INSTALLED (R9, R10) OR REJECT-FOR-FIT (R1, R6, R8) OR CITE-PATTERN-ONLY (R2, R3, R7) OR STUDY-PILOT-narrow (R4, R5).

**Recommended Wave 146 Fire 2 action** (in priority order):

1. **W146-F2-CITE-EXTRACT — wshobson/agents `protect-mcp` + `signed-audit-trails` + `shell-scripting`** (Wave 138 Fire 1 STUDY-PILOT-NARROW survivors)
   - **Day-1 priority**: NO — these are cite-extract candidates AFTER Phase 7 benchmark gate per `agent-harness-fit-verification.md` Phase 7. Week-1 codification timing.

2. **W146-F2-CITE-EXTRACT — alirezarezvani/claude-skills POWERFUL/SOLID/GENERIC/WEAK self-audit methodology**
   - **Day-1 priority**: NO — Month-1 methodology codification (NOT install). Cite-only.

3. **W146-F2-DOC-CODIFY — v25 high-star triage 8-axis architecture-leverage criterion**
   - **Day-1 priority**: NO — doc-only codification of v23-v25 unique insight #3 into `01-corrected-architecture.md` L1 DISCOVERY (auto-proceed default per CR-7 Phase 1 LOW-risk doc-only).

## HONEST-NON-FINDING flags

- **R1 vercel-labs/agent-skills**: NULL LICENSE refuted via direct `gh api repos/vercel-labs/agent-skills/contents/LICENSE` returning empty content (NOT just NOASSERTION) — same class as Wave 137 Fire 2 Mia OVER #158 ADOPT-NOW REFUTED finding.
- **R8 GitNexus PolyForm**: confirmed Noncommercial license — STRUCTURAL BLOCKER for any install-class adoption. Sibling cite-import-AMBER usage (read-only research probe per CR-9 exception) is the only legitimate path.
- **0 NEW INSTALL CANDIDATES surface from this 10-repo sweep** — all repos are already-classified (installed / rejected / cite-only / pending-narrow-study). The fire's contribution is **Wave 145 prescription validation + 3 unique v23-v25 insights** for future doc codification.

## Convergence-gate Axis verification

- **Axis 1 (≥3 distinct orgs)**: PASS — 10 orgs probed (vercel + vinta + nibzard + wshobson + alirezarezvani + mattpocock + Shubhamsaboo + abhigyanpatwari + addyosmani + affaan-m).
- **Axis 2 (≥2 named T2 practitioners)**: PASS — R6 mattpocock (named-T2 Total TypeScript), R9 addyosmani (named-T2 Google Chrome team), R10 affaan-m (named-T2 affaan-m maintainer of widely-cited ECC).
- **Axis 3 (≥3 months stability via cpd × age)**: PASS for 9/10 (R3 nibzard age <12mo borderline but Apache-2.0 + STABLE-BURN-IN passes).

## Sister-rule integration cites

- `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md §The 7 sub-classes` Probe 5 mode-harness-shape (R6) + Probe 6 direct-file/registry blockers (R8 + R1)
- `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md` Pattern A — orchestrator-side Pattern A apply post 3-voice fan-out synthesis
- `Z:/claude-sota/.claude/rules/cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate` — THIS AGENT B IS A SONNET STAND-IN; cross-model gate NOT structurally satisfied for THIS dispatch's verdict
- `Z:/claude-sota/.claude/rules/synthesis-layer-verify.md §Reporting categories` — HONEST-NON-FINDING IS the deliverable for TASK 4

---

VERDICT: HONEST-NON-FINDING + 3-unique-v23-v25-insights + 4-REJECT-FOR-FIT-VALIDATIONS — 10-repo Probe DAG 1-4 returned 0 new install candidates (all classify as ALREADY-INSTALLED / REJECT-FOR-FIT / CITE-PATTERN-ONLY); 3 unique v23-v25 architecture-leverage insights eligible for future doc codification; CR-12 5-class lattice fully exercised across 10 repos; STAND-IN-NOTICE: this agent ran as Sonnet stand-in per CLAUDE.local.md ENV (f) — cross-model gate NOT structurally satisfied; orchestrator relies on parallel Path P REAL GPT-5.5 dispatches Agent A + Agent C.
