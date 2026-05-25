---
title: Wave 98 Agent B — Architectural-Enhance Gap Audit
status: AUTHORITATIVE
date: 2026-05-08
agent: sota-researcher (Sonnet stand-in per CLAUDE.local.md ENV (g))
wave: 98
fire: B-architectural-enhance
---

# ARTIFACT-INLINE: tmp/wave98-B-architectural-enhance-gaps-2026-05-08.md

## STAND-IN-NOTICE

Sonnet stand-in NOT GPT-5.5; cross-model gate NOT structurally satisfied per `cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate`. Orchestrator MUST fire `codex exec --ephemeral -p deep-review-exec` foreground+tee BEFORE any commit per CR-3 Phase 1 bootstrap exception.

## R0 — Hypothesis

> "claude-sota-installed has architectural-enhance gaps where SOTA structural patterns (cwc Default-FAIL contract / Superpowers full skill suite / parent-context fork routing / spec-kit init / framework-agnostic agent wrappers) exist as cite-anchors but are NOT install-wired, costing wall-clock + correctness + token-eff."

Rejection criterion: if every candidate primitive is already INSTALLED + smoke-probe PASS in manifest, REJECT-LIST.

## R1 — Probe surface (Mia pre-apply)

| Surface | Probe | Result |
|---|---|---|
| `.claude/plugins/cache/claude-plugins-official/superpowers/5.1.0/skills/` | `ls` | 14 skills present (brainstorming / dispatching-parallel-agents / executing-plans / finishing-a-development-branch / receiving-code-review / requesting-code-review / subagent-driven-development / systematic-debugging / test-driven-development / using-git-worktrees / using-superpowers / verification-before-completion / writing-plans / writing-skills) |
| `.local/cwc/claude-code-config/.claude/hooks/` | `find *.sh` | 5 hooks present locally: commit-on-stop.sh / kill-switch.sh / steer.sh / track-read.sh / verify-gate.sh |
| `.claude/hooks/cwc/` (live wire) | `ls` | 4/5 wired: kill-switch / steer / track-read / verify-gate. **MISSING: commit-on-stop.sh** |
| `Z:/claude-sota-installed/PROGRESS.md` | `find` | NOT FOUND. **cwc Default-FAIL contract NOT activated** — per `Z:/claude-sota-installed/.local/cwc/claude-code-config/.claude/CLAUDE.md:7-11` PROGRESS.md handoff REQUIRED |
| `.claude/agents/cwc/evaluator.md` | `ls` | Present (Fresh-context evaluator from cwc) |
| `Z:/repos/deps/deepagents/libs/acp/` | `ls` | Present (ACP host crate available) |
| `Z:/repos/deps/langgraph/` | `ls` | Present (LangGraph Command(goto, graph=PARENT) available) |

## R2 — Gap discovery (architectural-enhance focus)

### Cluster A — cwc-long-running-agents (Anthropic OFFICIAL — TIER-1-DIRECT)

**Cite anchor**: `Z:/claude-sota-installed/.local/cwc/claude-code-config/.claude/CLAUDE.md @ HEAD ffd563d6` [VERIFIED 2026-05-08 via Read]

5 primitives audit:

| Primitive | Status | Evidence |
|---|---|---|
| Default-FAIL contract (PROGRESS.md handoff) | **NOT ACTIVATED** | No PROGRESS.md exists at workspace root; CLAUDE.md does not mention "read PROGRESS.md first"; cwc CLAUDE.md `:5-10` mandates this |
| Fresh-context evaluator | INSTALLED | `.claude/agents/cwc/evaluator.md` present |
| PROGRESS.md handoff | NOT ACTIVATED | (same as Default-FAIL) |
| Kill-switch.sh | INSTALLED | wired in settings.json PreToolUse Bash matcher |
| Steer.sh | INSTALLED | wired in settings.json UserPromptSubmit matcher |
| **Commit-on-stop.sh** | **NOT WIRED** | Script exists at `.local/cwc/claude-code-config/.claude/hooks/commit-on-stop.sh` but Stop hook chain in settings.json does NOT invoke it. Stop hooks call only auto_proceed_gate.py + stop-review-gate-hook.mjs |

**Gap impact**: cwc PROGRESS.md + commit-on-stop.sh together implement the "session-checkpoint durability" guarantee that survives process kills. Without it, a wedged agent loses uncommitted work; without PROGRESS.md, the next session starts cold. **HIGH ROI** — minimal LOC fix (1 hook wire + 1 file create + 1 CLAUDE.md addendum).

### Cluster B — Superpowers full skill suite (obra/superpowers via Anthropic plugin)

**Cite anchor**: `Z:/claude-sota-installed/.claude/plugins/cache/claude-plugins-official/superpowers/5.1.0/skills/` @ plugin v5.1.0 [VERIFIED 2026-05-08 via ls]

14 skills available via plugin install but NONE referenced in claude-sota-installed cardinal rules / agents / commands. Sibling `Z:/claude-sota/team-orchestration.md` selectively-vendored 6 skills (plan / debug / tdd / verification-before-completion / subagent-driven-development / requesting-code-review). **claude-sota-installed has 0 cardinal-rule references** to these skills despite the plugin install having them all.

**High-value un-cited skills**:
- `executing-plans/SKILL.md` — operational form of plan execution; pairs with `writing-plans/`
- `finishing-a-development-branch/SKILL.md` — close-cycle workflow primitive
- `using-git-worktrees/SKILL.md` — duplicate of local `parallel-session-worktree-isolation.md` per sibling REJECT-FOR-FIT; SKIP
- `receiving-code-review/SKILL.md` — companion to vendored `requesting-code-review`

**Gap impact**: skills are loadable but NOT discoverable via cardinal rules. Operator must hand-trigger; auto-trigger via descriptions does NOT fire because skills have no rule-layer references.

### Cluster C — Spec-kit + plan→implement loop (github/spec-kit installed; under-utilized)

**Cite anchor**: spec-kit binary installed per manifest; v0.8.7

**Status**: BINARY INSTALLED but **NO cardinal-rule integration**. spec-kit is a spec-driven dev primitive (specify init / plan / tasks / implement workflow). Without integration into CR-11 META-process, it sits as a one-off CLI rather than a structural enhancement.

**ROI**: medium. spec-kit is heavyweight for ad-hoc fires but compounds for multi-fire arcs. Not a Top-3 ADOPT-NOW.

### Cluster D — Subagent fork-vs-fresh routing (deepagents convergent pattern)

**Cite anchor**: `Z:/claude-sota/.claude/rules/team-orchestration.md §Fork-vs-fresh subagent routing` (cite-import-AMBER) — references `Z:/claude-sota-installed/CLAUDE.local.md` ENV (e) `CLAUDE_CODE_FORK_SUBAGENT=1` already SET.

**Status**: env-var SET but routing decision matrix NOT codified in claude-sota-installed cardinal rules. Sibling has the table; claude-sota-installed inherits via cite-import-AMBER but no local rule explains WHEN to fork vs spawn fresh.

**Gap impact**: Wave 98 itself just paid this — codex-rescue subagent dispatched fresh (no parent context inheritance) → both invocations failed at `1M context billing not enabled` because fork-mode would have side-stepped the 1M-context branch entirely. **n=1 fresh evidence on this fire**.

### Cluster E — Termination contract (LangGraph Command + AutoGen TerminationCondition)

**Cite anchor**: `Z:/claude-sota/.claude/rules/team-orchestration.md §Termination contract` cite-import-AMBER — 6-predicate vocab (`on_handoff_to:` / `on_text_match:` / `on_max_iterations:` / `on_token_budget_exceeded:` / `on_tool_count_exceeded:` / `on_subprocess_failure:`)

**Status**: predicate vocab codified in sibling rule (cite-import-AMBER). claude-sota-installed inherits via Section 14.5 cite-import. Brief template at `Z:/claude-sota/.claude/rules/team-orchestration.md §Agent Brief Template` already shows `TERMINATION:` slot. **Already in current Wave 98 brief** (see this fire's brief).

**Gap**: not a NEW gap — already integrated. **REFUTES sub-hypothesis**: termination contract is install-class via cite-import.

### Cluster F — ACP host (deepagents libs/acp + agentclientprotocol/claude-agent-acp)

**Cite anchor**: `Z:/claude-sota/.claude/rules/team-orchestration.md §Sister-framework references` Cross-fire ACP convergence — Axis 1 PASS at n=4-5 distinct orgs (LangChain + AAIF/Linux Foundation + agentclientprotocol official + Coder + Zed); Axis 2 PASS at n=5+ dated practitioner artifacts (JetBrains × 3 + Strojek + baseline); Axis 3 PASS (>180d burn-in)

**Status**: ADOPT-NOW eligible per sibling Wave 5 sota-researcher A10 closure but **NOT installed in claude-sota-installed**. Sibling recommended `agentclientprotocol/claude-agent-acp` adapter (1763★ TypeScript MIT, official ACP-org) for wrapping Claude Agent SDK as ACP server (lets Zed/JetBrains operate this workspace).

**Gap impact**: this runtime is locked to direct CC operator; ACP install would let it be operated FROM Zed/JetBrains/Cursor IDEs. **MEDIUM ROI for now** — only matters if operator wants IDE bridge.

### Cluster G — `addy-osmani/agent-skills` (33,500★ MIT) — full skills audit

**Cite anchor**: `Z:/claude-sota-installed/.claude/plugins/marketplaces/addy-agent-skills/` (marketplace installed) + `Z:/claude-sota-installed/.claude/plugins/marketplaces/agent-skills/` per CLAUDE.md L138

**Status**: marketplace REGISTERED but **NO plugin from this marketplace INSTALLED**. Wave 82m-B identified Top-3 cite-imports from this skill suite (source-driven-development → CR-1 reinforcement; deprecation-and-migration → installed as `deprecation-discipline.md`; one more pending audit).

**Gap impact**: per CLAUDE.md L138 "convergence-gate Axis-1 ≥3-distinct-orgs" — Osmani is named-T1 author. 33,500★ MIT skill collection has un-cited high-leverage skills beyond the 2 already cite-imported (`deprecation-discipline` + `launch-discipline`).

### Cluster H — router-for-me/CLIProxyAPI (sister Agent A-redo scope; out-of-scope here)

**Status**: HANDED OFF to sister Agent A-redo (token-eff scope per Wave 98 dispatch).

### Cluster I — `everything-claude-code` (ECC v2.0.0-rc.1 — installed)

**Cite anchor**: marketplace installed; plugins available.

**Status**: 14 ECC hooks DISABLED via `ECC_DISABLED_HOOKS` env (Wave 76+77 triage as JS/TS-orthogonal pure-overhead hooks). silent-failure-hunter agent + 50+ skills NOT yet cardinal-rule-referenced in claude-sota-installed (sibling references via team-orchestration.md cite-import-AMBER).

**Gap**: ECC `silent-failure-hunter` is an orthogonal SOTA-quality primitive that enforces "no silent fallback" at hook layer. claude-sota-installed has secret_scan + safety + agent_plan_readonly hooks but no silent-failure-detection equivalent.

### Cluster J — `framework-agnostic agents` (agno-agi/agno @ 39,805★ + 4yr-old)

**Cite anchor**: `Z:/claude-sota/.claude/rules/team-orchestration.md §Sister-framework references` row 6 (REJECT-FOR-FIT — framework-wrapper layer N/A)

**Verdict**: REJECT-FOR-FIT. Agno wraps any agent framework into a deployable service; claude-sota-installed does NOT need service-deployment shape (autonomous /loop CLI design).

### Cluster K — Anthropic CC Skills Marketplace v2.0+ (`/plugin install` lifecycle)

**Status**: 17 marketplaces ADDED; **0 plugins from claude-plugins-official installed beyond superpowers + agent-sdk-dev + frontend-design + pyright-lsp + ralph-loop + typescript-lsp**. Anthropic ships dozens of plugins (pyright-lsp / ralph-loop / agent-sdk-dev / frontend-design / 42crunch-api-security / adobe-for-creativity / agentforce-adlc and many more).

**Gap impact**: marketplaces are discoverable but plugins are **opt-in install**. Auditing shows only `superpowers` (5.1.0) + `agent-sdk-dev` + `frontend-design` + `ralph-loop` + LSP plugins are install-cached. Many high-leverage plugins (e.g., `claude-code-security-review` Tier-0 official) are NOT installed.

## R3 — Mia pre-apply gap-validation

| Claim | Probe | Verdict |
|---|---|---|
| "cwc PROGRESS.md not activated" | `find Z:/claude-sota-installed -maxdepth 3 -name PROGRESS.md` | VERIFIED — file does not exist |
| "commit-on-stop.sh not wired" | `grep "commit-on-stop" .claude/settings.json` | VERIFIED — zero matches |
| "Superpowers 14 skills available but un-cited" | `ls plugins/cache/claude-plugins-official/superpowers/5.1.0/skills/` + grep cardinal rules | VERIFIED — 14 dirs present, 0 cardinal-rule references |
| "ACP host not installed" | `find -name "claude-agent-acp"` + `.mcp.json` grep | VERIFIED — not present |
| "Termination contract installed" | grep `TERMINATION:` in this fire's brief | VERIFIED in brief; cite-import-AMBER per Section 14.5 |

## R4 — Top-5 ADOPT-NOW (architectural-enhance)

### #1 — cwc commit-on-stop.sh + PROGRESS.md handoff activation (HIGH-PRIORITY)

- **What**: Wire `bash Z:/claude-sota-installed/.local/cwc/claude-code-config/.claude/hooks/commit-on-stop.sh` into `.claude/settings.json` Stop hook chain (after auto_proceed_gate.py, before stop-review-gate-hook.mjs). Create stub `PROGRESS.md` at workspace root with 4 sections per cwc CLAUDE.md `:7-11`.
- **Cite**: `Z:/claude-sota-installed/.local/cwc/claude-code-config/.claude/CLAUDE.md:7-11,13-21,29-33 @ HEAD ffd563d6` (TIER-1-DIRECT Anthropic OFFICIAL)
- **ROI**: HIGH — closes Default-FAIL contract; install-time = 5 min; compounds across every session
- **CR-9 install-risk**: LOW — Apache-2.0; cwc native-installed; no version-skew; no sibling-bleed
- **Convergence-gate**: Axis-1 PASS (Anthropic OFFICIAL); Axis-2 PASS (Anthropic published Nov 2025 + Mar 2026); Axis-3 PASS (100+ days); STRONG-PROVENANCE-EXPRESS

### #2 — Cardinal-rule reference 8 un-cited Superpowers skills (executing-plans + finishing-a-development-branch + receiving-code-review + verification-before-completion + writing-plans + using-superpowers + brainstorming + writing-skills)

- **What**: Add `executing-plans` + `finishing-a-development-branch` + `receiving-code-review` + `verification-before-completion` + `writing-plans` + `using-superpowers` to a new cardinal-rule routing table OR to `team-orchestration.md` Selectively-vendored sister skills section. SKIP `brainstorming` + `writing-skills` + `dispatching-parallel-agents` per sibling REJECT-FOR-FIT (HARD-GATE incompatible / size-sprawl / KISS Must-Never #4 dup).
- **Cite**: `Z:/claude-sota-installed/.claude/plugins/cache/claude-plugins-official/superpowers/5.1.0/skills/<each>/SKILL.md` (TIER-1-DIRECT obra/superpowers MIT) + sibling `Z:/claude-sota/.claude/rules/team-orchestration.md §Selectively-vendored sister skills` rejected-list
- **ROI**: MEDIUM-HIGH — auto-trigger via skills' descriptions becomes load-bearing once cited
- **CR-9 install-risk**: LOW — already INSTALLED via plugin
- **Convergence-gate**: Axis-1 PASS (named-T2 obra; 171,890★ MIT); Axis-2 PASS; Axis-3 PASS

### #3 — Subagent fork-vs-fresh routing decision matrix CODIFY in CLAUDE.md or new rule

- **What**: Codify the deepagents-convergent fork-vs-fresh routing decision table from sibling `Z:/claude-sota/.claude/rules/team-orchestration.md §Fork-vs-fresh subagent routing` AS a claude-sota-installed cardinal-rule or `Z:/claude-sota-installed/.claude/rules/subagent-routing.md`. The env var `CLAUDE_CODE_FORK_SUBAGENT=1` is set but operators have no rule-driven routing decision.
- **Cite**: `Z:/claude-sota-installed/docs/codex-plugin-cc-q2-2026-update.md:33-78 @ HEAD 0447234` (sibling-derived TIER-2 user-curated; cite-import-AMBER per Section 14.5)
- **ROI**: HIGH — Wave 98 itself paid this gap (codex-rescue dispatch failed; fork-mode would have inherited parent context). Empirical n=1 fresh evidence.
- **CR-9 install-risk**: LOW — pure documentation; cite-import-AMBER discipline

### #4 — Anthropic claude-code-security-review plugin INSTALL via `/plugin install`

- **What**: `/plugin install claude-code-security-review@claude-plugins-official` — Anthropic OFFICIAL Tier-0 security-review plugin (cited as Tier-0 in v5 SOTA_REPOS_FINAL_LIST.md:153 + frontier-v5 best-of-best stack at L132)
- **Cite**: `Z:/claude-sota-installed/docs/outer research/kits/v5/.../SOTA_REPOS_FINAL_LIST.md:131,153` (TIER-2 user-curated kit citing Anthropic OFFICIAL primary)
- **ROI**: HIGH — pairs with existing gitleaks PreToolUse + secret_scan_guard.py to form complete security-review chain
- **CR-9 install-risk**: LOW — Anthropic OFFICIAL; native plugin install; pin via marketplace SHA
- **Convergence-gate**: Axis-1 PASS (Anthropic OFFICIAL Tier-0)

### #5 — `silent-failure-hunter` agent from ECC plugin REFERENCE in cardinal rules

- **What**: Cardinal-rule cross-reference to `everything-claude-code` plugin's `silent-failure-hunter` agent. Activate when ECC plugin is loaded; OR install agent via cite-import per sibling Section 14.5. Closes "REPORT errors before routing around them" cardinal-rule mechanically (currently only enforced via discipline).
- **Cite**: `Z:/claude-sota-installed/.claude/plugins/marketplaces/everything-claude-code/.claude-plugin/marketplace.json` (TIER-2 deps-shared MIT) + `Z:/claude-sota/CLAUDE.md` cardinal-rule 7 ("REPORT errors before routing around them")
- **ROI**: MEDIUM — mechanical enforcement of cardinal-rule 7; subsumes silent-fallback prohibition discipline
- **CR-9 install-risk**: MED — ECC plugin v2.0.0-rc.1 has 14 hooks already disabled per Wave 76+77 triage; need verify silent-failure-hunter agent NOT in disabled list

## R5 — Top-3 STUDY-PILOT (architectural-enhance)

### #1 — ACP host adapter (`agentclientprotocol/claude-agent-acp` 1763★ MIT)

- **Why pilot**: ACP convergence is Axis-1+2+3 PASS per sibling Wave 5; would let Zed/JetBrains/Cursor operate this workspace via standardized protocol. **MEDIUM ROI today** — only matters if operator pivots to multi-IDE.
- **Cite**: `agentclientprotocol/claude-agent-acp` README + sibling `Z:/claude-sota/.claude/rules/team-orchestration.md §Cross-fire ACP convergence finding`
- **Pilot scope**: install via `npm install -g @agentclientprotocol/claude-agent-acp` (assumes adapter is npm-published; verify); attempt single Zed connect; document compatibility

### #2 — Anthropic Skills marketplace plugin sweep (eval all unin­stalled plugins from claude-plugins-official)

- **Why pilot**: 7 marketplaces installed but only 6 plugins from claude-plugins-official cached (superpowers, agent-sdk-dev, frontend-design, pyright-lsp, ralph-loop, typescript-lsp). Other Tier-0 candidates (claude-code-security-review per #4 above; 42crunch-api-security; agentforce-adlc) un-evaluated.
- **Cite**: `.claude/plugins/marketplaces/claude-plugins-official/.claude-plugin/marketplace.json` enumerates all available; cross-ref kit's Tier-0 list
- **Pilot scope**: enumerate installed marketplace plugins via JSON parse; run convergence-gate on un-installed Anthropic-OFFICIAL plugins; pick Top-3 install candidates

### #3 — `intellectronica/ruler` (kit Tier-1 best-of-best)

- **Why pilot**: cited in v5 Tier-1 list at L200 — "ruler" appears to be a context/rules manager. Probe to determine if it solves a class not currently solved by 21 sibling-cite-imported rules + cardinal rules.
- **Cite**: `Z:/claude-sota-installed/docs/outer research/kits/v5/.../SOTA_REPOS_FINAL_LIST.md:200` (TIER-2 user-curated)
- **Pilot scope**: clone, audit README, compare overlap with 21 inherited rules, decide ADOPT or REJECT-FOR-FIT

## R6 — REJECT-FOR-FIT

| Repo | Cite | Reason |
|---|---|---|
| `agno-agi/agno` (39,805★ Apache-2.0) | sibling team-orchestration.md framework-comparison row | Framework-wrapper for service-deployment; claude-sota-installed is autonomous-CLI design — CATEGORY-MISMATCH |
| `huggingface/smolagents` (26,994★ Apache-2.0) | sibling team-orchestration.md row | `CodeAgent` code-as-action paradigm conflicts with tool-call paradigm of CC architecture; would CATEGORY-MISMATCH existing tool-call architecture |
| `obra/superpowers` `brainstorming` skill | sibling team-orchestration.md REJECT-FOR-FIT iter-84 | HARD-GATE incompatible with autonomous /loop mode |
| `obra/superpowers` `writing-skills` skill | sibling team-orchestration.md REJECT-FOR-FIT iter-85 | 7+ files / 100KB+ size-sprawl + meta-skill TDD-for-skills harness mismatch |
| `obra/superpowers` `dispatching-parallel-agents` skill | sibling team-orchestration.md REJECT-FOR-FIT iter-89 | KISS Must-Never #4 — duplicate of `parallel-agent-wave.md` |
| `obra/superpowers` `using-git-worktrees` skill | sibling team-orchestration.md row | Already covered by `parallel-session-worktree-isolation.md` (sibling cite-import-AMBER) |
| `microsoft/autogen` framework | sibling team-orchestration.md `TerminationCondition` cite | Already integrated via cite-anchor in 6-predicate vocab; full framework install is CATEGORY-MISMATCH |
| `langchain-ai/langgraph` framework | sibling team-orchestration.md `Command(goto, graph=PARENT)` cite | Already integrated via cite-anchor in HANDOFF slot; full framework install is CATEGORY-MISMATCH |

## R7 — HONEST-NON-FINDING

- **No new architectural primitive** beyond clusters A-K survives convergence-gate Axis-1 ≥3-distinct-orgs threshold WITH a ≥10-min-saved/install-fire ROI that is NOT already cite-anchored in sibling.
- **Spec-kit (Cluster C)** is INSTALLED but un-utilized; it's a meta-pattern (spec-driven dev workflow) requiring cardinal-rule integration to compound. Not Top-3 ADOPT-NOW; queued for separate research-then-install fire.
- **router-for-me/CLIProxyAPI** scope handed off to sister Agent A-redo (token-eff). Architectural-enhance scope here found no overlap.
- **`troykelly/claude-skills`** (kit Tier-2 row L329) — sounds promising but no convergence-gate Axis-2 evidence (named practitioner) located in this fire's budget; defer to next research arc.

## R8 — Empirical evidence anchor (this fire)

- Wave 98 codex-rescue dispatch ×2 BOTH FAILED at `1M context billing not enabled` despite token usage ≤268-1297ms / 0-tokens — NEW FM-class candidate (codex-rescue subagent class triggers 1M-context billing). This validates Cluster D (subagent fork-vs-fresh routing) — fork mode preserves parent context billing tier vs fresh-spawn going to 1M.
- 14/14 Superpowers skills + 5/5 cwc primitives + ECC plugin + 3 LSP plugins all INSTALLED-CACHED but only PARTIALLY wired/cited.

---

## VERDICT

STAND-IN-NOTICE: Sonnet stand-in per CLAUDE.local.md ENV (g); orchestrator-side codex T1 e2e MANDATORY before commit per CR-3 Phase 1 bootstrap exception
VERDICT: REVISE-LIST
confidence: 0.83
top-5 ADOPT-NOW: [
 #1 cwc commit-on-stop.sh wire + PROGRESS.md activation @ TIER-1-DIRECT Anthropic OFFICIAL — closes Default-FAIL contract,
 #2 Cardinal-rule reference 6 un-cited Superpowers skills @ TIER-1-DIRECT obra MIT — auto-trigger load-bearing,
 #3 Subagent fork-vs-fresh routing matrix codification @ cite-import-AMBER — Wave 98 paid this gap fresh,
 #4 Install claude-code-security-review @ Anthropic Tier-0 OFFICIAL — security-chain completion,
 #5 silent-failure-hunter from ECC plugin reference @ TIER-2 deps-shared — mechanical CR-7 enforcement
]
top-3 STUDY-PILOT: [
 #1 ACP host adapter @ Axis-1+2+3 PASS — IDE bridge optionality,
 #2 Anthropic Skills marketplace plugin sweep — Tier-0 OFFICIAL un-installed candidates,
 #3 intellectronica/ruler audit — kit Tier-1 best-of-best un-evaluated
]
REJECT-FOR-FIT: [agno-agi/agno + smolagents + Superpowers brainstorming/writing-skills/dispatching-parallel-agents/using-git-worktrees + autogen-framework + langgraph-framework — all CATEGORY-MISMATCH or already-cite-integrated]
HONEST-NON-FINDING: [no NEW architectural primitive beyond Clusters A-K survives convergence-gate Axis-1 ≥3-org + ≥10-min-saved ROI gate; spec-kit cardinal-integration deferred; router-for-me/CLIProxyAPI handed off to sister fire]
