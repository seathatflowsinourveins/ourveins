# W301 — Convergence Sweep, Silent-Failure Hunt, Research-Arch v6 Design, Multi-MCP SOTA Discovery

> **Wave**: W301
> **Branch**: `sota-converge-w295` (HEAD post-W300; rebase onto `main` per W292 codex prescription before push)
> **Started**: 2026-05-18
> **Rubric**: sca-v5 (active; W297 ship-decision-B; v6 design produced in Stream D)
> **Cardinal-rule invariants**: all 5 must hold post-wave (no `.claude/rules/`, no `.claude/hooks/scripts/`, ≤50 LOC CLAUDE.md, ≤15 KB settings.json, ≤3 worktrees, basic-memory T6 + VERDICT-LEDGER.md ledger contract, codex review-gate)
> **Operator mandate (verbatim, 2026-05-18)**:
> > "are there any silent fallback, errors? stale references, terminal errors, everything that can be optimized for your runtime, the entire ecosystem... gap resolute all, with gpt5.5 e2e, questions your rules, and repos selection. install all sota practice and investigate your runtime against official sdks etc, i feel that your agent team orchestration has silent fallback or errors, https://github.com/wshobson/agents https://github.com/mattpocock/skills and more sota repos fully wire sota practice https://github.com/anthropics... research and enhance your research architecture itself, find sota repos, and improve the repos quality gate... not a hardgate because some time repos with low stars can be high quality in certain area... improve your decision making itself, also the depth and comprehensiveness of the repos discovery... ship with convergence sota insights and e2e with gpt 5.5"

## §0 TL;DR

W300 closed the 6-tier memory layer re-audit. W301 is a 5-stream convergence sweep that closes 5 distinct operator asks in parallel:

1. **Silent-failure / stale-reference / terminal-error hunt** — concrete bug finding across runtime (settings.json hooks, .mcp.json servers, .claude/agents, .claude/skills, plugin cache, tools/, recent session telemetry).
2. **Agent-team orchestration live audit** — vs official Anthropic SDK + wshobson/agents documented capabilities; surface silent fallback paths and validate `Agent`/`TeamCreate`/`SendMessage`/`Monitor` against docs.
3. **SOTA repo verdicts + multi-MCP cascade discovery** — sca-v5 audits of `mattpocock/skills`, `anthropics/skills`, `anthropics/anthropic-quickstarts`, `anthropics/claude-code` (CLI itself), plus ≥15 NEW candidates discovered via Tier-2/3 cascade (exa + deepwiki + repomix + WebSearch + context7).
4. **Research-arch sca-v5→v6 design** — Phase-6 multi-judge ensemble full per Zheng+ 2023 (length + self-preference closure), G11 memory-class eval lane, contamination check at Stage-1 (not Phase-5), composite confidence intervals, anti-bias org-distinct enforcement upgrade.
5. **Cardinal-rule + decision-making adversarial** — 5 cardinal rules re-litigated under sca-v5 against 2026-05 SOTA practice (Anthropic Skills marketplace alt-install-paths, plugin-via-marketplace vs vendor-fork, hook-discipline vs claude-flow patterns); decision-making thresholds (tier cuts, weights, hard-caps) reviewed for systemic bias.

Synthesis fuses streams; codex GPT-5.5 adversarial review --wait gates ship.

## §1 Stream definitions + file ownership boundaries

> **File ownership rule** (W288 pattern, dispatching-parallel-agents): each stream owns exactly one output file. NO stream edits another stream's file, settings.json, .mcp.json, CLAUDE.md, or any tracked file outside its own. Parent (this orchestrator) owns synthesis + ledger writes + commit. If a stream finds a fix that touches shared files, it RECOMMENDS in its output — does not apply.

### Stream A — Silent-failure / stale-reference / terminal-error sweep

- **Owner**: `agent-A-silent-failure`
- **Owned file**: `docs/architecture/W301-CONVERGENCE-SWEEP-AND-RESEARCH-ARCH-V6/W301-STREAM-A-SILENT-FAILURE-HUNT.md`
- **Scope**:
  - Grep `.claude/agents/`, `.claude/skills/`, `tools/`, `harness/` for retired-MCP references (`graphiti`, `memory@modelcontextprotocol` direct, `ANTHROPIC_*` deprecated env, `MAX_THINKING_TOKENS`, `MCP_CONNECTION_NONBLOCKING`).
  - Read `.claude/settings.json` hook commands; verify each `command` path exists and is invocable (no broken `Z:/tools/nodejs/node.exe` paths, no missing `.mjs` files). Check `disabledMcpjsonServers` consistency with `.mcp.json` keys.
  - Scan `.mcp.json` for `command` validity, `args` version-pin compliance (CR-9 `@<pinned-version>`), `env` placeholder resolution (`${LANGFUSE_*}` etc).
  - Scan `tools/` for try-except-pass patterns + silent fallback returns + bare `except:` clauses.
  - Tail latest 3 session JSONLs at `Z:/claude-sota-installed-state/.claude/projects/` for terminal errors, MCP connection failures, hook command failures, codex review-gate skip events.
  - Check whether AGING-RELITIGATION-QUEUE.md has STALE entries that should have been re-litigated by now.
- **Deliverable**: ≥1 ENUMERATED finding per category (4 categories minimum: stale-ref, broken-hook-path, silent-fallback-code, telemetry-error); each finding with file:line cite + severity (CRITICAL/HIGH/MEDIUM/LOW) + recommended fix.
- **Out-of-scope**: applying any fix. RECOMMEND ONLY.

### Stream B — Agent-team orchestration live audit + wshobson/agents deep-dive

- **Owner**: `agent-B-orchestration`
- **Owned file**: `docs/architecture/W301-CONVERGENCE-SWEEP-AND-RESEARCH-ARCH-V6/W301-STREAM-B-ORCHESTRATION-AUDIT.md`
- **Scope**:
  - Read official Anthropic docs (`https://code.claude.com/docs/en/sub-agents`, `https://code.claude.com/docs/en/headless`, `https://docs.anthropic.com/en/docs/claude-code/sub-agents`) via WebFetch / context7. Document the documented contract for `Agent` tool fork semantics (`CLAUDE_CODE_FORK_SUBAGENT`), `TeamCreate` (`CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS`), `SendMessage`, idle-state, message delivery.
  - Probe live `wshobson/agents` plugin install state via `ls .claude/plugins/cache/ | grep -i wshobson` and `cat <wshobson plugin manifest>`. Verify the documented agents (`agent-orchestration:context-manager`, `agent-teams:*`, `comprehensive-review:*`) actually load and are addressable via `Agent({subagent_type: ...})`.
  - Test agent-teams subsystem: spawn a 1-task throwaway team via `TeamCreate` + 1 teammate via `Agent({team_name, subagent_type: "general-purpose"})`. Check if message delivery works (`SendMessage` + idle notification arrives). Document any silent fallback (e.g., teammate not joining team correctly, idle notifications dropped).
  - Compare `agent-teams` plugin's published presets (`research|security|review|debug|feature|fullstack|migration`) against W289's silent-drift PR #535 status.
  - Compare `wshobson/agents` agent catalog (full list of subagent_types under `.claude/plugins/cache/wshobson/`) against the W289-shipped wrapper agents in `.claude/agents/`.
- **Deliverable**: documented-contract-vs-live-behavior matrix; ≥3 silent-fallback findings if any exist; agent-teams smoke-test transcript (or BLOCK with cause); wshobson/agents catalog drift report (which agents exist upstream but are NOT wired in this runtime; which ARE wired but may be stale).
- **Out-of-scope**: applying fixes. RECOMMEND only. Do NOT delete or modify the throwaway test team's task list until parent confirms; pass team_name back in the report.

### Stream C — SOTA repo verdicts (mattpocock/anthropics) + multi-MCP cascade discovery

- **Owner**: `agent-C-discovery`
- **Owned file**: `docs/architecture/W301-CONVERGENCE-SWEEP-AND-RESEARCH-ARCH-V6/W301-STREAM-C-SOTA-DISCOVERY-AND-VERDICTS.md`
- **Scope**:
  - Run sca-v5 lite audits (D1-D5 + D7 + D10 + D12-D15 + D19-D21 — 13-dim subset; full 20-dim only for T1 candidates) on:
    - `mattpocock/skills` — purpose? CC-pathway? license? typed-evidence?
    - `anthropics/skills` — official skills marketplace? overlap with installed skills? deduplication recommendation.
    - `anthropics/anthropic-quickstarts` — quickstart patterns vs installed plugins?
    - `anthropics/claude-code` (the CLI repo itself) — read-only audit for documented features the runtime is NOT using.
  - Multi-MCP cascade Tier-2 SOTA discovery (target: ≥15 NEW candidates outside the W288/W291/W293/W296/W298/W299/W300 ledger) across 5 axes:
    - Agent-orchestration frameworks (claude-flow, swarm, langgraph-orchestrator alternatives)
    - Research/discovery systems (perplexity-style, web-research agents)
    - Memory architectures (post-graphiti-retirement alternatives, vector + KG fusion)
    - Eval harnesses (inspect_ai alternatives, promptfoo, agentbench, lm-eval-harness)
    - Skills/agent marketplaces beyond the installed 62-plugin set
  - For each NEW candidate: 3-row mini-card (slug + stars-and-source-family + claimed-capability) + preliminary tier-routing decision (T1/T2/T3/T4/T5) based on initial sca-v5 score estimate.
  - MCP family ≥1-per-top-10 anti-bias mandate: among the top-10-ranked NEW candidates, ≥1 MUST be first-discovered by EACH MCP family that fired (github + exa + deepwiki + WebSearch + repomix + context7 minimum).
- **Deliverable**: 4 sca-v5 lite verdicts (mattpocock + 3 anthropics repos); ≥15 NEW candidate cards; top-10 ranked list with MCP-family attribution; ≥3 candidates with <500★ (low-star high-quality lane per operator mandate); ≥3 candidates from outside USA orgs (anti-bias).
- **Out-of-scope**: full sca-v5 audit for any candidate (defer to W302 if T1/T2 candidates emerge); applying any install or vendor-fork.

### Stream D — Research-arch sca-v5→v6 design

- **Owner**: `agent-D-arch-v6`
- **Owned file**: `docs/architecture/W301-CONVERGENCE-SWEEP-AND-RESEARCH-ARCH-V6/W301-STREAM-D-SCA-V6-DESIGN.md`
- **Scope**:
  - Per W295 Stream D Phase-6 deferred items + W296 Stream D 12-delta blueprint § "v6 future deltas" + W297 Stream D §8 compatibility table, design sca-v6 with:
    - **Phase-6 multi-judge ensemble FULL** — close length-bias + self-preference-bias classes per Zheng+ 2023 (v5 only closes position-bias via swap). Design: 3 codex GPT-5.5 invocations with rotated personas (security + architect + code-reviewer) AND rotated evidence presentations; majority verdict + confidence intervals; if ensemble disagrees → tier-demote 2 levels.
    - **G11 memory-class eval lane** — fourth eval-harness lane for memory-MCP candidates (recall_precision + durability + scaling + retrieval-latency per Letta Leaderboard + Cognee benchmark). Lane name: `--mode memory-recall-lane`.
    - **Contamination check moved Stage-5 → Stage-1** — per SWE-bench Verified discipline + per the principle "filter contaminated candidates BEFORE expensive Tier-2/3 cascade fires". Add a Tier-0 contamination check that compares candidate-claimed benchmarks against public-leaderboard contamination corpus.
    - **Composite confidence intervals** — replace point-estimate `install_score` + `pattern_score` with CIs (e.g., `install_score=4.2 [3.9, 4.5]`) using bootstrap or codex-ensemble variance. Tier-routing thresholds become probabilistic (T1 INSTALL requires `P(install_score ≥ 4.0) ≥ 0.8`).
    - **Anti-bias org-distinct ENFORCEMENT** — v5's "MCP family ≥1-per-top-10" is advisory; v6 makes it ENFORCED (verdict invalid if not met); add org-country diversity (≥3 distinct countries among typed-evidence sources for T1 INSTALL).
    - **Operator-override audit trail** — every operator-override of a cost-cap or tier-routing decision MUST emit a `verdicts/W<wave>-<slug>-override.md` row with operator justification + alternative considered.
  - Identify v5 invariants that v6 MUST PRESERVE (the 10 v3 "don't break" invariants per W292 + the 5 v5 ship-evidence invariants per W297).
  - Self-eval: rate the v6 design itself under sca-v5 (architecture-itself score) to validate the design is not regressing the rubric's own quality.
- **Deliverable**: ≥6 v6 deltas with anchor (which external rubric / framework / paper each delta comes from); v5→v6 invariant-preservation matrix; v6 architecture-itself self-eval score; SHIP / DEFER decision per delta.
- **Out-of-scope**: editing `.claude/skills/sota-convergence-audit/SKILL.md` to apply v6 — DESIGN ONLY this wave. v6 ship is a future wave (W302+) after operator approval.

### Stream E — Cardinal-rule + decision-making adversarial re-litigation

- **Owner**: `agent-E-rules-adversarial`
- **Owned file**: `docs/architecture/W301-CONVERGENCE-SWEEP-AND-RESEARCH-ARCH-V6/W301-STREAM-E-CARDINAL-RULE-AND-DECISION-MAKING.md`
- **Scope**:
  - For each of the 5 cardinal rules in `CLAUDE.md` lines ~28-32, run an adversarial steelman-then-stress-test:
    - **R1** "Install primitives only from trusted plugins/skills/agents" — vs Anthropic Skills marketplace (`https://github.com/anthropics/skills`) which is now an alt-install-path; vs vendor-fork pattern (T2 in sca-v5). Does R1 over-restrict?
    - **R2** "Hooks only upstream-plugin OR direct upstream-CLI" — vs claude-flow patterns (rejected W280h but worth re-examining); vs the `.mjs` hook in settings.json:93-94 (`context-mode-cache-heal.mjs`) which IS self-invented in the sense of being a project-owned `.mjs` not a plugin-shipped hook. Is the file at `Z:/claude-sota-installed/.claude/hooks/context-mode-cache-heal.mjs` cardinal-rule-2 violating?
    - **R3** "Subagents = installed upstream agents OR documented subagent system" — vs `.claude/agents/` wrappers (W289-shipped). Are those wrappers themselves the documented-subagent-system or do they violate R3?
    - **R4** "Project behavior in CLAUDE.md + settings.json only — NOT `.claude/rules/*.md`" — vs `.claude/skills/` operator-curated skills (mem-recall, sota-convergence-audit, etc.). Are operator-curated skills the cardinal-rule-3-compliant path or a rule-bending workaround?
    - **R5** "Safety boundaries via permissions + sandboxing, NOT custom guard scripts" — vs the GateGuard hook that fired on first Bash call this turn. Is GateGuard cardinal-rule-5-compliant or a self-invented guard masquerading as a permission?
  - Decision-making review: review sca-v5 tier-cut thresholds (`install_score ≥ 4.0` for T1; `3.0-3.9` for T2; etc.), hard-cap taxonomy, weight assignments. Are the weights operator-defensible or did they accrete arbitrarily across W284→W299?
  - "Stars not a hardgate" mandate stress-test: review the W288/W291/W293/W296/W299/W300 verdicts for any case where a high-star candidate routed to T1 despite weak typed-evidence, OR where a low-star (<500★) candidate routed to T4/T5 despite strong typed-evidence. Is the mandate honored in practice?
- **Deliverable**: 5 cardinal-rule verdicts (keep / modify / extend); ≥3 decision-making findings (threshold-arbitrary OR weight-arbitrary OR hard-cap-arbitrary); 1 mandate-stress-test report (anti-bias mandate honored / partially / violated count).
- **Out-of-scope**: editing CLAUDE.md cardinal-rule text — RECOMMEND ONLY. Editing the GateGuard hook — recommend only.

## §2 Synthesis + codex gate (orchestrator-owned)

After all 5 streams report:

1. **Parent reads** each stream's deliverable.
2. **Parent synthesises** `W301-SYNTHESIS-2026-05-18.md` with:
   - Cross-stream concrete findings (silent-failure count, stale-ref count, broken-hook-path count, orchestration silent-fallback count, NEW candidate count, v6 design deltas count, cardinal-rule modify/extend count, decision-making findings count).
   - Top-3 priority fixes for this-wave application (small, safe, reversible).
   - Top-3 design changes for future-wave (v6 ship, cardinal-rule edits, decision-making threshold revisions).
   - Verdicts to write to T6 basic-memory + VERDICT-LEDGER.md row per sca-v5 3-target contract.
   - Operator-action queue for items requiring explicit operator confirm (e.g., `--force-with-lease` push, AI-3 basic-memory config-path fix, AI-5-finish historical-graphiti migration).
3. **Parent applies** the top-3 priority fixes (each with concrete file:line edit + smoke-test).
4. **Parent dispatches** `/codex:adversarial-review --wait` over the W301 diff. Codex round-1 verdict: APPROVE / REVISE / BLOCK.
5. **If REVISE**: parent addresses HIGH findings, re-fires codex --wait. MEDIUM findings do NOT trigger ship-BLOCK per W288/W289 precedent.
6. **If APPROVE**: parent commits + asks operator before push (push is shared-state-affecting per system prompt).

## §3 Cardinal-rule invariants — must hold post-wave

- CLAUDE.md ≤ 50 LOC (currently 42L)
- settings.json ≤ 15 KB (currently 13.2 KB)
- ≤ 3 worktrees
- `self_invented_count: 0` — NO `.claude/rules/*.md`, NO `.claude/hooks/scripts/*.py|.sh`
- T6 basic-memory + VERDICT-LEDGER.md ledger contract (T4 graphiti retired W295)
- codex `reviewGateEnabled: true`
- 6-tier memory: T1 hindsight + T2-split (`.mcp.json:memory` disabled, plugin-memory active) + T3 cognee + T4 graphiti RETIRED + T5 langfuse + T6 basic-memory

## §4 Wave-success criteria

- 5/5 streams produce non-empty deliverables (no silent stream failure)
- ≥1 concrete fix applied (small, reversible, smoke-tested)
- ≥1 verdict written to T6 basic-memory + VERDICT-LEDGER.md (per sca-v5 contract)
- codex GPT-5.5 final round: APPROVE OR MEDIUM-only REVISE (no HIGH unaddressed)
- Branch ready to commit (operator confirms before push)

## §5 Wave-exit cleanup

- AGING-RELITIGATION-QUEUE.md updated if Stream E surfaces new STALE candidates
- Stream C NEW-candidate cards committed to wave directory
- Stream D v6 design committed (DO NOT edit `.claude/skills/sota-convergence-audit/SKILL.md` until W302)
- Stream B's throwaway test team deleted via `TeamDelete` after stream completes
- VERDICT-LEDGER.md row added for any T1/T2 verdicts from Stream C
