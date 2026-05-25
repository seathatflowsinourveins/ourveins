# W286d — Research-Architecture Evolution Proposal (META-level SOTA-definition refinement)

> Meta-audit of the **research-architecture** itself — the system that decides what becomes
> harness DNA. Builds on W283 Streams 2+5 + W284a sota-convergence-audit v2 (commit `0822db5`)
> + W285 parallel implementation (worktree `Z:/claude-sota-installed-W285`). Read-only
> research; no skill/agent file modifications in this stream.

---

## Section A — Current research-architecture (end-to-end)

### A.1 — Components inventory

| Component | Role |
|---|---|
| `goal-prompt-synthesis` skill (`.claude/skills/`) | Authors paste-ready `/goal` (4-phase: discover · verify · converge · compose) |
| `sota-convergence-audit` v2 skill (`.claude/skills/`) | Vets one candidate → ADOPT/STUDY/REJECT (W284a: 6 steps, typed-evidence + 7-dim rubric + 3-persona fan-out + adoption-ledger + decay) |
| `sota-researcher` agent (`.claude/agents/`) | 5-phase R0-R5 primary-source verification + 7-tier evidence ladder |
| `mem-recall` LOCAL skill | Looks back via memory-MCP on explicit recall markers (opt-in) |
| `superpowers:dispatching-parallel-agents` | Pattern for parallel research fan-out |
| `everything-claude-code:deep-research` | Multi-source web research via firecrawl + exa MCPs |
| `everything-claude-code:research-ops` | Evidence-boundary reporting + freshness dates |
| `claude-plugins-official:superpowers:{writing-plans,brainstorming}` | Plan structure + candidate scoping |
| `codex` Stop hook (W280a) | Cross-model GPT-5.x adversarial review (final gate); state in `${CLAUDE_PLUGIN_DATA}/state.json` |
| `agent-teams:team-spawn review` | 3-persona fan-out preset |
| `graphiti` MCP (`:16379`) | T7 adoption-ledger (`group_id="adoption-decisions"`) |
| `harness/eval_harness.py` | inspect_ai + promptfoo lanes (wired, **not yet connected** to adoption decisions) |
| W259 grand-catalog + repomix corpus (`tmp/repomix-library/packed/*.xml`) | 99 repos × 23 dims; 52 packs · 210 MB |

### A.2 — End-to-end flow ("should we adopt X?" → decision shipped)

1. Operator request → `goal-prompt-synthesis` auto-fires → 4-phase (discover ≥4 families · verify harness-fit · converge ≥3 sources · compose ≤3800-char `/goal`).
2. Operator pastes `/goal` in fresh session → `/team-spawn <preset>` or `superpowers:dispatching-parallel-agents` per W269 mandate.
3. `sota-convergence-audit` v2 runs 6 steps: (1) Discover ≥4 families · (2) Verify harness-fit · (3) Typed-evidence converge (≥1 BENCHMARK + ≥1 CODE READING + ≥1 FIELD REPORT) · (4) Score 7-dim rubric (ADOPT iff `score_min ≥ 4 AND score_mean ≥ 4.3`) · (5) 3-persona adversarial fan-out (security + architect + code-reviewer) · (6) Decide + ledger to graphiti `group_id="adoption-decisions"` with mandatory rollback plan + `reverification_due`.
4. codex Stop hook (W280a) — ANY persona BLOCK or codex BLOCK = REJECT.
5. Install pinned from official source. Decision-decay state machine: ACTIVE (0-5 waves) → AGING (6-11) → STALE (12+).

---

## Section B — Weakness analysis (3-axis)

### B.1 — Missing primitives (verification gaps)

1. **No eval-harness-gated convergence**: `harness/eval_harness.py` is wired with real inspect_ai + promptfoo lanes (per CLAUDE.md status) but **never invoked** from `sota-convergence-audit`. A candidate can score 4.3+ on the rubric without ever surviving a regression-test against the harness's own task set. W283 Stream 2 P1 named this; W284a does NOT close it (sources `Z:/claude-sota-installed/docs/architecture/W283-stream2-research-arch.md:70`, `W283-AUDIT-SYNTHESIS-2026-05-18.md:38` ECC eval-harness in the install set per `engineering-skills/2.2.3/CLAUDE.md`).

2. **No compliance loop on the skill itself**: ECC ships `skill-comply` (`plugins/cache/everything-claude-code/.../skills/skill-comply/SKILL.md`) — runs `claude -p` against a skill at 3 prompt strictness levels and reports compliance rate. Neither `sota-convergence-audit` nor `goal-prompt-synthesis` has ever been run through `skill-comply`. We do not know how often agents actually follow the 6-step process when the prompt is competing.

3. **No false-negative recovery**: the gate that decides what enters the runtime has no test of "would the v2 rule have caught a known-bad candidate?" — i.e. no adversarial corpus of historically-rejected-and-rightly-so candidates that the rule must continue to reject as it evolves. W283 Stream 2 P3 names this convergent with langfuse eval-pipeline practice (lines `:65801-76200` re: Cohen's Kappa + inter-rater agreement).

### B.2 — Stale assumptions

1. **Star-count as a popularity proxy is broken in 2026**: `sota-researcher.md:34-38` evidence ladder lists `[POPULAR]` as a tier but the runtime's discovery still implicitly favors star-rich repos via `quemsah_awesome-claude-plugins.xml` enrichment. With LLM-generated awesome-lists multiplying, star-count correlates with bot-amplification more than with field-tested quality. W283 Stream 5 W4 (Bayesian author-prior) names this.

2. **"≥3 organizationally-distinct sources" can be satisfied by 3 README echoes**: W284a typed-evidence partially fixes this (`≥1 benchmark + ≥1 code reading + ≥1 field report`) — BUT `goal-prompt-synthesis/SKILL.md:38-43` still uses old "≥3 orgs" rule. Asymmetric: the `/goal` author surfaces candidates under old rule; the audit rejects under new rule; operator wastes cycles. Cross-confirmed by W283 Stream 5 R3 (backward-compat risk).

3. **Single cross-model reviewer (codex GPT-5.x) is theatrically diverse**: per W283 Stream 2 P2(b), CCBP `claude-code-best-practice.xml:13847,13968` mentions "Codex + Gemini" (two cross-models). A second cross-model is cheap insurance for HIGH-risk ADOPT decisions.

### B.3 — Brittle integrations (decision-trail gaps)

1. **`goal-prompt-synthesis` writes nothing to the adoption-ledger**: a `/goal` that surfaces 10 candidates and authors a comprehensive predicate consumes ~30-50% of agent compute per W283 Stream 2 P4 — and that evidence is thrown away. The receiving session's `sota-convergence-audit` re-discovers from scratch. No "evidence-ledger" tier caches "X has these 4 sources, last verified 2026-MM-DD".

2. **Decision-decay is lazy-only (W284a state machine)**: STALE-marking happens at read-time, with no scheduled re-litigation pass. The 42 installed plugins are never proactively re-audited. A `/loop` cron that re-runs `sota-convergence-audit` on the oldest-installed plugin per week is the missing primitive.

3. **codex Stop-hook state lives in gitignored `${CLAUDE_PLUGIN_DATA}/state.json`**: per W283 Stream 2 P2(a), a fresh clone loses the gate until `bootstrap-runtime.ps1` runs. A session that loses `state.json` mid-arc silently degrades to no-gate — no telemetry confirms the gate fired N times this session.

---

## Section C — Evolution targets (ranked by leverage)

### C.1 — Eval-harness integration as 8th rubric dimension (HIGHEST LEVERAGE)

**Current state**: `harness/eval_harness.py` wired but disconnected from `sota-convergence-audit`. Rubric is 7-dim (capability/harness-fit/source-diversity/authority/recency/benchmark-deltas/failure-mode).

**Proposed state**: add 8th dim `eval_pass` — if the candidate exposes an executable (skill/agent/MCP), run it through `harness/eval_harness.py` against the runtime's existing task set; PASS if no regression vs baseline. Failure to run = score 1 unless candidate is non-executable (e.g. doc-only pattern, scored N/A and excluded from `score_min`/`score_mean`).

**Cost-benefit**: ~1 day to wire (skill protocol amendment + 1 helper for non-exec carve-out). Closes Stream 2 P1, Stream 5 W5. Highest leverage because it converts "people say X is SOTA" → "X has measurable SOTA numbers in OUR harness" — the difference between belief and evidence.

**Risk**: backward-incompat for non-executable candidates (handled by N/A carve-out). LOW.

**Cites** (≥2 independent): (1) `engineering-skills/2.2.3/CLAUDE.md` engineering-skills bundle installs the eval-harness primitive; (2) ECC `eval-harness/SKILL.md` ships eval-loop as a reusable pattern; (3) W283 Stream 2 P1 + Stream 5 W5 convergent finding.

### C.2 — Pre-decision evidence-ledger handoff (`goal-prompt-synthesis` → `sota-convergence-audit`)

**Current state**: `goal-prompt-synthesis` Phase 1-3 collects ≥4-family discovery + ≥3-source convergence, then THROWS the evidence away when it emits the `/goal` text. Receiving session's `sota-convergence-audit` Step 1-3 re-collects.

**Proposed state**: `goal-prompt-synthesis` Phase 4 (Compose) emits — in addition to the `/goal` text — a sibling graphiti episode `group_id="evidence-ledger"` keyed by candidate slug, with `sources_typed`, `discovery_families`, `last_verified_at`. The `/goal` includes a `# evidence-ledger-ref: <candidate-slug>` header. Receiving `sota-convergence-audit` Step 1-3 checks the ledger first and skips families that returned within the last 7 days.

**Cost-benefit**: ~half-day protocol amendment in both skills (cross-stream coordination with W285). Saves ~30-50% agent compute on every audit chain (W283 Stream 2 P4 measured estimate). Compounding savings across waves.

**Risk**: stale ledger entries (mitigated by 7-day freshness). LOW.

**Cites**: (1) `addy-agent-skills` `context-engineering` skill ("Files that change together should live together — pass context across the seam, do not re-collect"); (2) `superpowers:writing-plans` ("plan ledgers context for the engineer that comes after"); (3) W283 Stream 2 P4.

### C.3 — `skill-comply` self-eval pass on the SOTA-decision skills

**Current state**: `sota-convergence-audit` v2 ships W284a; `goal-prompt-synthesis` ships earlier — neither has been measured for compliance. We don't know whether agents actually run the 6 steps when the prompt is competing or strict-supportive.

**Proposed state**: W287 dedicated wave runs ECC `skill-comply` against both skills (`uv run python -m scripts.run .claude/skills/sota-convergence-audit/SKILL.md`). Compliance rate <70% on any step triggers a SKILL.md amendment + re-test loop. Save reports to `docs/architecture/skill-comply-reports/`.

**Cost-benefit**: ~1 day per skill. Reveals which rubric steps are reliably executed vs paid lip-service. Without this, the v2 amendments are untested choreography.

**Risk**: discovery that Step 5 (adversarial fan-out) has poor compliance because /team-spawn dispatch isn't auto-triggered. Then the rubric is theatrical. Better to know.

**Cites**: (1) ECC `skill-comply/SKILL.md` (the primitive); (2) `superpowers/5.1.0/CLAUDE.md` mandates "Skills are not prose — they are code that shapes agent behavior ... Show before/after eval results"; (3) `engineering-advanced-skills/2.4.4/skills/self-eval/SKILL.md` (engineering-advanced ships a self-eval primitive).

### C.4 — Second-cross-model gate for HIGH-risk ADOPT decisions

**Current state**: codex GPT-5.x Stop-hook is the sole cross-model reviewer (W280a). Both Claude (orchestrator) and codex (reviewer) are transformer-LM auto-regressive — correlated more than they look.

**Proposed state**: ADOPT verdicts tagged `risk: HIGH` (criteria: touches `.claude/settings.json`, hooks, MCP config, or cardinal-rule boundaries) require a SECOND cross-model pass via `claude-plugins-official:comprehensive-review` or a Gemini-CLI subprocess. LOW/MEDIUM risk decisions remain on single codex pass. Cheap insurance for the decisions that can break the runtime.

**Cost-benefit**: ~half-day to define HIGH-risk taxonomy + protocol amendment. ~5-10% of ADOPTs are HIGH-risk in practice, so marginal cost is small. Closes Stream 2 P2(b) false-negative risk.

**Risk**: latency on HIGH-risk decisions (acceptable: HIGH-risk = warrants extra scrutiny by definition).

**Cites**: (1) CCBP `claude-code-best-practice.xml:13847,13968` "Codex + Gemini" pattern; (2) `comprehensive-review` plugin (multi-dimension review installed and unused); (3) `engineering-skills/2.2.3` `adversarial-reviewer/SKILL.md` (3-persona forced-finding pattern reinforces the principle that one reviewer = blind-spot risk).

### C.5 — Proactive decision-decay re-litigation cron (`/loop` schedule)

**Current state**: W284a state machine is lazy-only (status computed at read-time). 42 installed plugins are never proactively re-audited.

**Proposed state**: `loop:` skill schedules a weekly `/loop 7d /sota-reverify oldest` cron that pulls the oldest `ACTIVE` or `AGING` adoption-ledger episode (graphiti query by `decided_at` ascending), re-runs the v2 audit, and writes a new episode with `supersedes=<prior_uuid>`. Operator gets a weekly summary "5 verdicts re-litigated, 1 RETIRED (uninstall pending)".

**Cost-benefit**: ~1 day to define the cron skill + 1 helper to query oldest-ledger-episode. Compounding payoff because it prevents the W283 Stream 5 W6 CRITICAL self-reinforcing-false-positive failure mode operationally, not just lazily.

**Risk**: re-audit churn — operator might be flooded with re-litigation tickets. Mitigated by 1-per-week cadence.

**Cites**: (1) `loop:` skill description ("Run a prompt or slash command on a recurring interval"); (2) ECC `continuous-learning/SKILL.md` v1/v2 establish the pattern of automatic periodic re-extraction; (3) langfuse-docs `:830` (evaluation/troubleshooting + periodic regression).

### C.6 — `sota-researcher` agent × `sota-convergence-audit` skill role-split

**Current state**: `sota-researcher.md` agent (5-phase R0-R5 + 7-tier evidence ladder) and `sota-convergence-audit/SKILL.md` skill (6-step v2 + 7-dim rubric) substantially overlap — both define discover · verify · converge phases.

**Proposed state**: documented role split — agent = primary-source verification specialist invoked when typed-evidence needs verbatim file:line corroboration; skill = the audit protocol the orchestrator runs, which DISPATCHES the agent for Step 1-3 evidence gathering when needed. Cross-reference each from the other; remove duplicate process language.

**Cost-benefit**: ~half-day docs work. Eliminates "skill or agent?" ambiguity.

**Risk**: LOW — both are post-W282.

**Cites**: (1) `superpowers/5.1.0/skills/dispatching-parallel-agents/SKILL.md`; (2) Anthropic sub-agents doc (`code.claude.com/docs/en/sub-agents`); (3) `superpowers:writing-skills`.

### C.7 — Discovery-bias guard via fresh GitHub + web search

**Current state**: `sota-convergence-audit` Step 1 says "≥4 source families" but `tmp/repomix-library/packed/*.xml` is the de-facto source-of-truth. Candidates outside the packed corpus are invisible per W283 Stream 2 P3.

**Proposed state**: Step 1 MUST include at least 1 fresh `mcp__github__search_repositories` query + 1 `mcp__plugin_everything-claude-code_exa__web_search_exa` query for the candidate name and any synonyms, with explicit "0 results" reporting if both return empty. Output flag `LOW-CORPUS-COVERAGE` if both fresh queries returned <3 results.

**Cost-benefit**: ~1 hour skill-amendment. Closes Stream 2 P3 popularity-bias.

**Risk**: marginal extra API cost (LOW — 2 queries per audit).

**Cites**: (1) W283 Stream 2 P3; (2) ECC `deep-research/SKILL.md:46-66` mandates multi-source web search; (3) `sota-researcher.md:34-38` already mandates "Internet first, local second" — the skill must inherit the agent's discipline.

### C.8 — Codex Stop-hook `state.json` integrity check on SessionStart

**Current state**: per W283 Stream 2 P2(a), session that loses `state.json` mid-arc silently degrades to no-gate.

**Proposed state**: documented bootstrap-runtime.ps1 step + SessionStart check (codex plugin's hook system or `.claude/settings.json` direct-CLI — cardinal-rule-2-compliant) that verifies `${CLAUDE_PLUGIN_DATA}/state.json` exists/readable; on missing/corrupt, emit "GATE-DEGRADED" warning and abort until repaired. No silent degradation.

**Cost-benefit**: ~half-day. Eliminates a silent-failure mode that bypasses the gate for an entire session.

**Risk**: false-positive abort (mitigated by `--allow-gate-degraded` flag).

**Cites**: (1) W283 Stream 2 P2(a); (2) `superpowers:verification-before-completion`; (3) `affaan-m_everything-claude-code.xml:2926,8665,16638` (idempotency-and-retry-safety hook rule).

---

## Section D — Implementation sequencing

### W287 (next wave, 1 session)
- **D.1**: C.7 discovery-bias guard (1 hr — smallest, unlocks rest)
- **D.2**: C.6 sota-researcher × sota-convergence-audit role-split docs (half-day)
- **D.3**: C.2 evidence-ledger handoff (cross-stream w/ W285 — coordinate via `evidence-ledger` graphiti namespace)

### W288 (2-3 sessions)
- **D.4**: C.1 eval-harness 8th dim (highest leverage — needs careful protocol drafting + N/A carve-out)
- **D.5**: C.3 skill-comply self-eval (parallel — runs ECC tooling, no skill edits beyond report-driven amendments)
- **D.6**: C.8 codex-state-json integrity check (half-day)

### W289
- **D.7**: C.4 second-cross-model gate for HIGH-risk (after HIGH-risk taxonomy stabilizes)
- **D.8**: C.5 proactive decision-decay cron (after 6-12 verdicts exist in adoption-ledger to test against)

### Cardinal-rule compliance (for new hooks)
- C.8 SessionStart hook MUST use the codex plugin's own hook system (cardinal-rule-2: no self-invent `.claude/hooks/scripts/*`). If the codex plugin lacks the integrity-check, the fix is upstream PR to the plugin or direct-CLI invocation in `.claude/settings.json` `hooks.SessionStart` — NOT a `.claude/hooks/scripts/check-state.py`.
- C.5 `/loop` cron uses the installed `loop:` skill — no new daemon.
- All other targets (C.1-C.4, C.6-C.7) are SKILL.md protocol amendments, no hooks involved.

---

## Section E — Cross-reference to W285 implementation work

W285 (worktree `Z:/claude-sota-installed-W285`, branch `goal/W285-sota-audit`) shipped W284a v2
(commit `0822db5`) implementing the 3 W283-convergent targets:
- typed-evidence + 7-dim rubric + adoption-ledger schema (Stream 2 + Stream 5 #1 #3)
- decision-decay state machine (Stream 5 #2)
- mandatory rollback plan

This W286d proposal **supplements W285**, does not duplicate:
- W285 amended `sota-convergence-audit/SKILL.md` to v2 (typed-evidence + rubric + decay).
- W286d proposes the NEXT layer: connect the rubric to executable eval (C.1), share evidence across the goal→audit seam (C.2), self-test the skills (C.3), add a second cross-model for HIGH-risk (C.4), proactive re-litigation (C.5), role-split with `sota-researcher` (C.6), discovery-bias guard (C.7), state-integrity check (C.8).
- W286d explicitly does NOT modify `sota-convergence-audit/SKILL.md` — that file is owned by W285. C.7 (discovery-bias guard) and C.2 (evidence-ledger handoff) require coordinated edits to that file in W287, AFTER W285 lands its commits.

---

## Bottom-line

**Highest-leverage single fix**: C.1 (eval-harness 8th rubric dimension) — converts SOTA-as-belief into SOTA-as-evidence-in-our-harness. The eval harness exists; using it would close the loop the rubric leaves open.

**Top weakness in the current arc**: the rubric grades **claims about the candidate** (sources, recency, authority) rather than **the candidate's behavior in our runtime**. A score_min ≥ 4 / score_mean ≥ 4.3 candidate can still regress the harness on real tasks. Until eval-harness is gated, the rubric is sophisticated taste, not measurement.

**Biggest disagreement with W284a's typed-evidence/7-dim rubric**: none with the design — only with what it OMITS. The 7 dimensions are well-chosen and decision-decay is the right shape; the gap is that an executable adoption candidate (skill/agent/MCP) is not actually executed before adoption. Adding C.1 as an 8th dimension preserves W284a's structure rather than replacing it.
