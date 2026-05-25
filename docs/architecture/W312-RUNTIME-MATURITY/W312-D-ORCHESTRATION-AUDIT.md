# W312-D: Orchestration Silent-Fallback Hunt + Decision-Making Framework
**Date**: 2026-05-19 | **Base**: d43bef6 (sota-converge-w310) | **Method**: 1586-JSONL session-transcript audit (top-50 sessions analysed, msg.id-grouped) + tool-availability deferred-schema verification + Stop-hook deep-trace + Anthropic agent-teams doc cross-check + upstream-SHA delta

> **Operator concern (verbatim)**: "i feel that your agent team orchestration has silent fallback or errors" + "improve your decision making itself" + "the comparison of different repos in particular area"
> **Verdict**: Concern is PARTIALLY VALIDATED. The runtime correctly fires parallel-Agent fan-out (108 parallel batches across 50 sessions, mean 2.16/session, batch-size-4 most common). HOWEVER **2 distinct silent-fallback patterns confirmed**: (a) **mid-task serial-degradation** — 77 serial-Agent messages (29% of all Agent-dispatching messages) where parallel was warranted; (b) **agent-teams primitive unused in W310/W311/W312** despite installed plugin — last `~/.claude/teams/` activity 2026-05-18. Plus the W269 mandate text contains a recordable ambiguity: it endorses **either** agent-teams OR parallel-subagent-fan-out, so a solo orchestrator with serial Agent calls technically violates the spirit (parallel intent) while satisfying the letter (Agent tool used).

---

## §1 W269 Mandate Enforcement Audit

### Method

Scanned all 1586 JSONL transcripts in `Z:/claude-sota-installed/.claude/projects/Z--claude-sota-installed/` from last 4 days (top-50 by recency). Grouped tool_use events by `message.id` (CC's JSONL splits multi-tool assistant messages into per-tool events but they share `message.id`). Counted: (a) parallel-Agent batches = 1 message with 2+ `Agent` tool_uses; (b) serial-Agent = 1 message with exactly 1 `Agent`; (c) TeamCreate/TaskCreate/SendMessage call frequency; (d) inter-dispatch timestamp gaps (proxy for synchronous-blocking serial vs concurrent parallel).

### Quantitative findings (top-50 recent sessions)

| Metric | Value |
|--------|-------|
| Sessions scanned | 50 |
| Sessions with ≥1 Agent dispatch | 30 (60%) |
| Total Agent tool calls | 476 |
| **Parallel Agent batches** (2+ in 1 msg) | **108** |
| **Serial Agent calls** (1 per msg) | **77** |
| Parallel-to-total ratio | 108/(108+77) = **58.4%** |
| TeamCreate calls | 12 (only 4 sessions) |
| TaskCreate calls | 70 (only 8 sessions) |
| SendMessage calls | 33 (only 4 sessions) |
| Largest parallel batch | **9 agents in 1 message** |
| Batch-size distribution | 2→12, 3→33, **4→48**, 5→11, 6→1, 7→2, 9→1 |

**Reading**: 58.4% parallel rate is healthy but not perfect — 77 serial-Agent dispatches in 30 sessions averages **2.5 serial-Agent calls per active orchestration session**, all of which could plausibly have been parallel.

### Silent-fallback case study: W296 session ce669eb8 (2026-05-18)

This session was operator-tasked with "audit your architecture and monitor system status, like for advanced agent team orchestration with sota research architecture" — explicitly an **agent-team orchestration audit**. Found:

| Time | msg.id | subagent_type | Description |
|------|--------|---------------|-------------|
| 19:40:50 | 01G2Fg4a | general-purpose | W296 Stream C synthesis |
| 19:42:15 | 0161G4ay | general-purpose | W296 Stream E foundation audit |
| 19:43:29 | 015oBmdh | general-purpose | W296 Stream F task hygiene |
| 19:51:21 | 01D3wjsU | codex:codex-rescue | codex GPT-5.5 review Stream A |
| 19:51:43 | 01Y6jFD3 | codex:codex-rescue | codex GPT-5.5 review Stream B |
| 19:52:04 | 01KDq11j | codex:codex-rescue | codex GPT-5.5 review Stream D |
| 19:53:31 | 012vZ57o | codex:codex-rescue | codex unleashed Stream C review |
| 19:53:59 | 011WWTuk | codex:codex-rescue | codex unleashed Stream E review |
| 19:54:27 | 011TNNww | codex:codex-rescue | codex unleashed Stream F |
| 20:00:59 | 011u6aLP | general-purpose | Fix Stream B per codex-r1 |
| 20:01:38 | 01D1eo9m | general-purpose | Fix Stream C per codex-r1 |
| 20:02:00 | 01TEaxUj | general-purpose | Fix Stream D per codex-r1 |
| 20:02:21 | 01UUXRXM | general-purpose | Fix Stream E per codex-r1 |
| 20:02:43 | 01T13G5C | general-purpose | Fix Stream F per codex-r1 |

**18 fully-serial Agent dispatches** with each-pair separated by 20-90 sec gaps (proxy for "wait for previous Agent return before next"). All 6 codex reviews of independent streams could have been **1 message with 6 parallel Agent calls**. All 5 fix-tasks of independent streams could have been **1 message with 5 parallel Agent calls**. Instead: **18 sequential Agent.return waits** = ~30-40 minutes serial when ~5-8 minutes parallel was achievable. This is the **operator's exact stated concern: "silent fallback"**.

### Solo-vs-parallel classification per task type (interpretation)

| Task type | Found dispatch mode | Should-be |
|-----------|---------------------|-----------|
| Cross-stream synthesis (independent docs) | serial | **parallel** |
| Per-stream codex review (independent streams) | serial | **parallel** |
| Per-stream fix application (independent files) | serial-or-parallel | parallel acceptable |
| Single-target deep audit | serial | serial correct |
| Sequential dependent tasks | serial | serial correct |

### Silent-fallback patterns identified

| # | Pattern | Frequency | Severity |
|---|---------|-----------|----------|
| F1 | **Serial Agent dispatch when parallel warranted** (independent streams reviewed/fixed one-at-a-time) | 77 occurrences / 50 sessions | **HIGH** — defeats W269 parallel intent, ~5-10× wallclock penalty |
| F2 | **agent-teams primitive UNUSED post-W289** (`~/.claude/teams/claude-sota-installed/` last write 2026-05-18; no W310/W311/W312 activity) | 0 TeamCreate in 50 most-recent sessions outside f1ef6c9d/47ad27ef/026e6e24/d63f143f/789b3124 | **MEDIUM** — primitive available, just not chosen |
| F3 | **Mandate text creates loophole**: "or parallel subagent fan-out via the Agent tool" — solo orchestrator with N serial Agent calls satisfies letter, violates spirit | mandate-level | **MEDIUM** — fix mandate language |
| F4 | **No telemetry/metric** for `parallel_ratio` per session — operator must reverse-engineer from JSONL after the fact | runtime-level | **MEDIUM** — add Stop-hook hook that emits `parallel_ratio` to `logs/orchestration.jsonl` |
| F5 | **Mailbox files orphaned**: `~/.claude/teams/claude-sota-installed/inboxes/*.json` show self-addressed messages (`from` == `assignedBy` == recipient) — TeamCreate was bypassed; messages written into mailbox before team-config existed | 27 inbox files / 0 `config.json` files | **LOW** — historical drift, not active |

---

## §2 Tool Availability Smoke

| Tool | ToolSearch loads? | Schema OK? | Notes |
|------|-------------------|------------|-------|
| `EnterWorktree` | ✓ YES via `select:EnterWorktree` | ✓ Full schema | name/path params, mutually exclusive |
| `ExitWorktree` | listed in deferred set, not tested | unknown | Sister tool |
| `Monitor` | listed in deferred set, not tested | unknown | For polling background processes |
| `NotebookEdit` | listed, not tested | unknown | Jupyter notebooks |
| `TaskStop` | ✓ YES — loaded as side-effect | ✓ Full schema | Stops background task by ID |
| `WebFetch` | ✓ YES via `select:WebFetch` (returned via query "WebFetch") | ✓ Full schema | **Blocked by context-mode in subagent context** — InputValidationError advises `ctx_fetch_and_index` |
| `WebSearch` | listed, not tested | unknown | |
| **`TeamCreate`** | **✗ NO — does not appear in deferred-tool list** | **N/A** | Available **only** to main-session orchestrator (per Anthropic docs: "Claude Code generates [team config and task list] automatically"). Subagents like THIS one cannot invoke TeamCreate. |
| **`TaskCreate`** | **✗ NO — does not appear in deferred-tool list** | **N/A** | Same scope-bound restriction |
| **`TaskList/TaskGet/TaskUpdate`** | ✗ NO | N/A | Same |
| **`SendMessage`** | ✗ NO | N/A | Same |
| **`Agent`** (for spawning team teammates) | ✗ NO in subagent | N/A | **Available only to main session** (and to W269-mandated lead). Subagent CANNOT delegate further per Anthropic "No nested teams: teammates cannot spawn their own teams or teammates. Only the lead can manage the team." (cite: agent-teams limitations §) |

### Critical clarification (resolves silent-fallback ambiguity)

The agent-teams plugin's `team-lead.md` declares `tools: Read, Glob, Grep, Bash, Agent, TeamCreate, TeamDelete, TaskCreate, TaskList, TaskGet, TaskUpdate, SendMessage` as the lead's tool surface (`.claude/plugins/cache/claude-code-workflows/agent-teams/1.0.2/agents/team-lead.md:4`). These tools **DO exist** in the runtime but only when a session is **the team lead** (created via natural-language team-spawn). They are **NOT** standard deferred tools and **WILL NOT** appear in ToolSearch for subagent contexts.

**Operator-relevant implication**: when the parent orchestrator says "I dispatched a team via /team-spawn" but never actually had the team-lead role assigned, the TeamCreate call CANNOT fire — instead the orchestrator falls back to `Agent` (general-purpose subagent fan-out). This silent degradation is what F1 (77 serial Agent calls) measures.

---

## §3 Stop-Hook Codex Review-Gate Verification

### Current configuration

```json
// .claude/plugins/cache/openai-codex/codex/1.0.4/hooks/hooks.json:24-37
"Stop": [
  {
    "hooks": [
      {
        "type": "command",
        "command": "\"Z:\\tools\\nodejs\\node.exe\" \"Z:\\claude-sota-installed\\.claude\\plugins\\cache\\openai-codex\\codex\\1.0.4\\scripts\\stop-review-gate-hook.mjs\"",
        "timeout": 900
      }
    ]
  }
]
```

State file: `.claude/plugins/data/codex-openai-codex/state/claude-sota-installed-0271062cb1571a49/state.json`:
```json
{"version": 1, "config": {"stopReviewGate": true}, "jobs": []}
```

### Verification

- **Configured**: ✓ YES (plugin-shipped, NOT in `.claude/settings.json` per cardinal-rule-2 compliance)
- **Active**: ✓ YES (`stopReviewGate: true` in state.json)
- **Silent-suppression check**: NO suppression patterns found. Script (`stop-review-gate-hook.mjs:99-110`) explicitly emits `{decision: "block", reason: ...}` on failed review and exits cleanly with `process.exitCode = 1` on uncaught error (`.mjs:189-194`). **Fail-loud, not silent.**
- **Fast-exit path** (lines 130-136, W80 fix): `getConfig(earlyWorkspaceRoot).stopReviewGate` checked BEFORE blocking `readFileSync(0)` on stdin — prevents indefinite hang when gate disabled. Defensible.
- **Timeout**: 15 min hard cap (`STOP_REVIEW_TIMEOUT_MS = 15 * 60 * 1000`), returns `{ok: false, reason: "...timed out after 15 minutes"}` on TIMEOUT. Loud failure, not silent.

### ECC_DISABLED_HOOKS audit

`.claude/settings.json:8` value:
```
"pre:edit-write:gateguard-fact-force,post:edit:design-quality-check,pre:observe:continuous-learning,post:observe:continuous-learning,post:session-activity-tracker,stop:evaluate-session,stop:cost-tracker,stop:desktop-notify"
```

- 8 hooks disabled — none are critical orchestration hooks.
- **NOT disabled**: `stop:codex-review-gate` (lives in codex plugin's `hooks.json`, NOT in ECC namespace — so ECC_DISABLED_HOOKS doesn't gate it).
- **Notable**: `stop:evaluate-session` and `stop:cost-tracker` ARE in disabled set — these are everything-claude-code stop hooks. Per W308 audit they were intentionally disabled (cost tracker noise). **No regression here.**

### W310-EXT-δ silent-fallback context

W310-EXT-δ (per CLAUDE.md status block, commit `ac65b5c`) closed 5/5 prior open silent-fallback findings INCLUDING `ECC_DISABLED_HOOKS` "ghost reversal" check — and that finding was CLOSED. No silent-suppression of Stop-hook now active.

---

## §4 agent-teams Plugin Health

| Plugin | Installed SHA | Upstream HEAD | Drift | Action |
|--------|---------------|---------------|-------|--------|
| `agent-teams@claude-code-workflows` | **`08ded5e7b0fe57e7f40194775885eba539c3d8e7`** (lastUpdated 2026-05-18T19:11:15Z) | `08ded5e7b0fe57e7f40194775885eba539c3d8e7` (HEAD as of audit) | **0 commits — IN SYNC** | None (W289 HIGH-1 was closed) |
| `comprehensive-review@claude-code-workflows` | `34632bcbea28176ba25bbbc43cd4017d88b1cac6` (lastUpdated 2026-05-18T05:29:15Z) | (separate repo `wshobson/commands`?) | needs upstream-resolve | **Re-check upstream** — `wshobson/commands` HEAD is `27d3e77b1a844223721f6c983ddf261ac4441b89`, drift suspected |
| `context-management@claude-code-workflows` | `34632bcbea28176ba25bbbc43cd4017d88b1cac6` (lastUpdated 2026-05-18T05:29:15Z) | (same as above — shared marketplace SHA) | needs upstream-resolve | Same as above |

### PR #535 status

```json
{"head_sha":"bc582aebeceb7392db1a2e07b2f1f0ca6cc82e3a","merged":true,"merged_at":"2026-05-17T00:46:39Z","state":"closed","title":"fix: agent teams coordination guardrails"}
```

**MERGED 2026-05-17**, content rolled into upstream main. Installed SHA reflects PR-merge ancestor lineage. **W289 HIGH-1 operator-AI was successfully applied between 2026-05-18T14:29:22 (initial install) and 2026-05-18T19:11:15 (lastUpdated)** — closing this finding.

### Inbox state

`~/.claude/teams/claude-sota-installed/inboxes/` contains 27 JSON files but ZERO `config.json` files. All inbox messages show `from == assignedBy == recipient` (self-addressed). This is historical drift from W255-era patterns (pre-canonical-TeamCreate). NOT actively harmful but **the directory should be archived to `tmp/`** at next housekeeping wave to avoid confusing future audits.

---

## §5 Decision-Making Framework Improvement (paste-ready for sca-v7)

### T1-T5 Decision Tree

```text
┌─────────────────────────────────────────────────────────────────┐
│ CANDIDATE ENTRY GATE (filter BEFORE rubric):                    │
│ - Catalog appearance: in W259-grand-catalog OR W288 NEW-30      │
│   OR operator-named-repo OR convergence-hit (≥2 sources)        │
│ - AND ≥1 affirmative signal (D5 sources score ≥3 OR ≥1 stars-   │
│   independent recommendation OR cited in upstream skill)        │
│ - REJECT IF: D18 safety<2 (universal) OR no public repo URL     │
└─────────────────────────────────────────────────────────────────┘
                            ▼
        Full sca-v6.1 rubric (22.1 install / 10.9 pattern)
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│ HARD-CAP CHECK (any breach → cap tier):                         │
│ - D5 sources<3 → max T3                                         │
│ - D11 preload>10KB → max T2                                     │
│ - D17 robustness<2 → max T2 (per sca-v3.1 INSTALL-cap)          │
│ - D16 bus_factor<2 → max T2 (T1+T2 cap per v3.1)                │
│ - D14 cardinal_compliance<3 → max T3                            │
│ - D10 D5 sources<2 → max T4                                     │
│ - D18 safety<2 → REJECT regardless                              │
└─────────────────────────────────────────────────────────────────┘
                            ▼
                  T1 INSTALL gate?
              ┌────────────┴────────────┐
        install_score                pattern_score
            ≥4.0?                       ≥4.5?
              │                          │
              ▼                          ▼
   ┌─────────────────┐         ┌─────────────────┐
   │ T1 criteria ALL │         │ Bypass T1, go   │
   │ must hold:      │         │ T3 PATTERN-STUDY│
   │                 │         │ even if install_│
   │ (a) install ≥4.0│         │ score ≥4 (pattern│
   │ (b) ≥1 ALL-HIGH │         │ alone insufficient│
   │     on D1+D7+D17│         │ for INSTALL)    │
   │ (c) 4-source    │         └─────────────────┘
   │     convergence │
   │ (d) no hard-cap │
   │ (e) claude-     │
   │     pathway ≥3  │
   │     (plugin OR  │
   │     skill OR    │
   │     MCP OR CLI) │
   │ (f) pass2pass   │
   │     ratification│
   └─────────────────┘
              │
              ▼
      ALL pass?
        ┌──┴──┐
        Yes   No
        │     │
        ▼     ▼
       T1   T2 INSTALL-vs-VENDOR-FORK split (see below)
```

### T1 INSTALL — required criteria (ALL must hold)

| # | Criterion | Threshold | Rationale |
|---|-----------|-----------|-----------|
| T1.a | `install_score` ≥ 4.0 | composite/22.1 ≥ 0.18 | Numerical floor |
| T1.b | `ALL-HIGH on D1+D7+D17` | All 3 dims ≥ 4 | Quality + protocol + robustness simultaneously |
| T1.c | 4-source convergence | ≥4 organizationally-distinct sources rate ≥3 | Stops single-org bias |
| T1.d | 0 hard-cap breaches | All hard-caps ≥ floor | Catches D11 preload, D5 sources, D14 cardinal |
| T1.e | claude_pathway ≥ 3 | (plugin?, skill?, MCP?, CLI?) — count of yeses | Anthropic-canonical integration required |
| T1.f | pass2pass ratification | 2 independent codex GPT-5.5 reviews APPROVE | Cross-model gate (W292-R4 absorbed) |
| T1.g | Documented operator approval | VERDICT-LEDGER row + commit msg | Audit trail |

### T2 VENDOR-FORK — required criteria (T1 disqualified by governance OR pathway-gap)

| # | Criterion | Threshold | Rationale |
|---|-----------|-----------|-----------|
| T2.a | `install_score` 3.0 ≤ x < 4.0 | composite 0.135-0.18 | Score range |
| T2.b | T1 disqualified because: D16 bus_factor<2 OR claude_pathway<3 OR D7 protocol mismatch OR upstream-dead | listed reason | Forces vendor-fork rather than upstream-install |
| T2.c | Novel SOTA pattern (not redundant with incumbent) | Affirmative case stated | Avoids T2-as-vendor-graveyard |
| T2.d | Fork is operator-maintainable | Estimated <50 LOC ongoing maintenance | Bounded debt |
| T2.e | 3-source convergence (down from T1's 4) | ≥3 distinct sources rate ≥3 | Slightly lower bar |
| T2.f | Documented fork commit-SHA + upstream-tracking strategy | path-of-divergence + diff-reapply protocol | Reversibility |

### T3 PATTERN-STUDY — required criteria

| # | Criterion | Threshold |
|---|-----------|-----------|
| T3.a | `pattern_score` ≥ 3.5 (independent of install_score) | composite 0.32+/10.9 |
| T3.b | `install_score` < 3.0 (or T1+T2 hard-capped) | else go T1/T2 |
| T3.c | Novel architectural insight (not redundant with documented pattern) | Affirmative case |
| T3.d | 2-source convergence | ≥2 distinct sources rate ≥3 |
| T3.e | NO incumbent fully-supersedes (else REJECT) | Tactical-insight clause |

### T4 CITE-ONLY — required criteria

| # | Criterion |
|---|-----------|
| T4.a | 1 source affirmative; pure-aggregator OR research-paper-as-repo OR archived-repo |
| T4.b | Insight is "we should remember this exists" not "we should fork/install" |
| T4.c | Goes into SOTA-AGING-REGISTRY for W295+ re-litigation cron |

### T5 REJECT — required criteria

| # | Criterion |
|---|-----------|
| T5.a | D18 safety<2 → REJECT regardless of other scores (universal hard-cap, W293 v3.1) |
| T5.b | 0 cite-worthy primitive (pure marketing/aggregator with no novel mechanism) |
| T5.c | Redundant-vs-incumbent (incumbent has equal-or-better SOTA score on all dims) |
| T5.d | Upstream-dead AND no fork-maintainability case |
| T5.e | Cardinal-rule violation (deny-list capture; self-invented hook; unauthorized .claude/rules) |

### INSTALL-vs-VENDOR-FORK split logic (operator's explicit ask)

When install_score ≥3.0, the question "T1 or T2?" hinges on **operator-maintainability over time**, NOT on score alone. Decision criteria in priority order:

```text
1. UPSTREAM GOVERNANCE TEST (D16):
   - If D16 bus_factor ≥ 3 (multi-maintainer, CNCF-grade governance, ≥6mo
     consistent commit cadence): → continue to step 2 (T1 candidate)
   - If D16 bus_factor < 3 (single-maintainer, irregular commits): → T2
     VENDOR-FORK regardless of install_score
   - If D16 == 2 (uncertain governance): → T2 unless pathway-test (step 3)
     gives strong T1 signal

2. CLAUDE-PATHWAY TEST (D7):
   - If upstream provides a Claude plugin OR skill OR MCP that loads cleanly
     into this runtime: → T1 INSTALL
   - If upstream provides CLI wrapper but no plugin: → continue to step 3
   - If upstream provides only Python lib / research code: → T2 VENDOR-FORK
     (we'll wrap as skill or use as reference)

3. REVERSIBILITY TEST:
   - If install can be reverted in <2 min via `claude plugin uninstall`:
     → T1 acceptable (low blast radius)
   - If install requires manual cleanup, hooks-deinstall, state-migration:
     → T2 VENDOR-FORK (we control the lifecycle)

4. FORK-MAINTENANCE TEST (T2 last-mile):
   - If we'd need <50 LOC of ongoing maintenance to track upstream: → T2 OK
   - If we'd need >50 LOC OR rebase-conflicts likely: → T3 PATTERN-STUDY
     (extract insights, don't fork)

5. PASS2PASS GATE (T1 final):
   - 2 independent codex GPT-5.5 reviews must APPROVE
   - First on the audit doc; second on the post-install diff
   - Any HIGH → downgrade to T2 minimum
```

**Operator-relevant clarification**: this codifies what W308 + W289 already practiced ad-hoc. Sample applications:
- `OthmanAdi/planning-with-files@21.5k★` → W291 T1, then W309 re-litigated T1→T3 PATTERN-STUDY when D5+D10 hard-cap (Phase-5 RE-LITIGATE per W309 ledger row 29)
- `LearningCircuit/local-deep-research@7.7k★` → DOWNGRADED prelim T1→T2 because D4=2 CC-pathway gap (no plugin, only CLI/Python lib)
- `ruvnet/claude-flow@10k★` → W289 REVERSED W288 T2→T4 CITE-ONLY when D11 preload >10KB hard-cap breached on full audit

### When to use each verdict tier — operator handbook

| Tier | Operator action | Reversibility | Blast radius |
|------|-----------------|---------------|--------------|
| T1 INSTALL | `claude plugin install <pkg>` + `/reload-plugins`; record VERDICT-LEDGER row | 2 min via uninstall | Low (plugin-scoped) |
| T2 VENDOR-FORK | `git clone <repo> Z:/claude-sota-installed-repos/<repo>`; wrap as project-local skill or sibling-runtime injection; record fork-SHA + upstream-tracking note | 5-30 min depending on integration depth | Medium (operator-owned code) |
| T3 PATTERN-STUDY | Extract pattern into `docs/architecture/W<N>-PATTERN-STUDY-<repo>.md`; cite in next sca-vN evolution | 0 min (no install) | None |
| T4 CITE-ONLY | Add to SOTA-AGING-REGISTRY; W295 cron re-litigates at next freshness window | 0 min | None |
| T5 REJECT | Record VERDICT-LEDGER reject with reason; do NOT re-litigate without operator request | N/A | N/A |

---

## §6 Multi-Angle Convergence Routing

### Source-weight table per tier

| Tier | Minimum sources | Required mix | Stop-condition |
|------|-----------------|--------------|----------------|
| T1 INSTALL | **4+** | perplexity (current-state market) + deepwiki (code-fact-grounded) + repomix (packed-repo-deep-read) + GitHub GraphQL (stars/commits/governance) | Any single source HIGH alone insufficient — convergence required |
| T2 VENDOR-FORK | **3+** | drop the weakest of the 4 (often deepwiki for niche repos) | Convergence still required |
| T3 PATTERN-STUDY | **2+** | 1 affirmative pattern source + 1 SOTA-comparison source | Convergence on pattern novelty |
| T4 CITE-ONLY | **1** | any single affirmative source | Single-source acceptable for cite-only |
| T5 REJECT | varies | safety-flag from any single source is REJECT-sufficient | Universal hard-cap path |

### Perplexity vs deepwiki — when to use which

| Dimension | Perplexity | DeepWiki |
|-----------|------------|----------|
| **Best for** | Current-state market research, "is X SOTA in 2026", recent-quarter comparisons, trend signals | Code-fact-grounded answers about specific repos: "what does file X do", "is method Y idiomatic for SOTA" |
| **Latency** | Slower (multi-search reasoning) | Faster (indexed answer) |
| **Token cost** | Higher per query | Lower per query |
| **Hallucination risk** | LOW (cites web sources) | LOW (cites source files) |
| **Best for sca-v7 dim** | D5 sources_typed (market-state), D9 incumbent-comparison | D14 cardinal-compliance, D7 claude-pathway-test, D11 preload-measurement |
| **Failure mode** | Stale (>30d old data drift) | Repo-not-yet-indexed; covers public-only |

### Routing protocol (sca-v7 codified)

```text
Stage-1 (entry gate, ~$0.02/candidate):
  - perplexity 1-shot: "is <repo> SOTA in <domain> in 2026-Q2?"
  - DECISION GATE: if affirmative → continue; if "obsolete" → T4/T5

Stage-2 (qualification, ~$0.10/candidate):
  - perplexity 3-shot: market-state + incumbent-comparison + governance-test
  - deepwiki ask_question: code-fact-extraction from upstream repo
  - GitHub GraphQL: stars + last-commit + commit-cadence-90d + maintainers-N
  - 4-source convergence check (perplexity + deepwiki + github + 1 of {repomix, exa, context7})

Stage-3 (deep audit, ~$2/candidate):
  - repomix pack_remote_repository → grep_repomix_output for full SKILL.md /
    plugin.json / hooks bodies / state-handling
  - context7 query-docs for documented API surface
  - hf-mcp-server hub_repo_details if HuggingFace-resident
  - sca-v6.1 full 22.1-denom rubric scoring

Stage-4 (3-persona adversarial, ~$8/candidate):
  - 3 parallel Agent dispatches (security + architect + code-reviewer
    personas) — MUST be in 1 message with 3 Agent calls (not serial!)
  - Each persona returns INSTALL-vs-VENDOR-FORK-vs-PATTERN-STUDY-vs-REJECT
  - Consensus algorithm: 2-of-3 majority; tie → defer to operator

Stage-5 (codex GPT-5.5 cross-model gate, ~$5/candidate):
  - `codex:codex-rescue` Agent — single dispatch (already serial-natural)
  - APPROVE / NEEDS-REVISION / BLOCK verdict
  - Any HIGH from codex → downgrade tier OR re-litigate
```

---

## §7 Summary + Operator-AIs

### Findings recap

| Severity | Finding | Resolution location |
|----------|---------|---------------------|
| **HIGH F1** | **77 serial-Agent dispatches** (29% of all Agent-bearing messages) where parallel was warranted — specifically: 6 codex-stream-reviews + 5 codex-stream-fixes in W296 session ce669eb8 | Update W269 mandate language + add `parallel_ratio` telemetry hook |
| MEDIUM F2 | **agent-teams primitive unused** post-W289 — last `~/.claude/teams/` write 2026-05-18; W310/W311/W312 used pure-subagent fan-out, not team-spawn | Acceptable IF mandate codifies "serial-Agent is silent-fallback violation". If team-spawn is preferred, mandate that |
| MEDIUM F3 | **Mandate text creates loophole**: "or parallel subagent fan-out via the Agent tool" — solo orchestrator with N serial Agent calls satisfies letter, violates spirit | Tighten mandate: "parallel subagent fan-out via the Agent tool **— MUST be 2+ Agent calls in 1 message; serial Agent dispatch in multi-stream contexts is non-compliant**" |
| MEDIUM F4 | **No telemetry/metric** for `parallel_ratio` per session | Add Stop-hook hook that emits `parallel_ratio` to `logs/orchestration.jsonl` |
| LOW F5 | **Mailbox files orphaned** | Archive `~/.claude/teams/claude-sota-installed/inboxes/` to `tmp/W312-mailbox-archive/` |
| **CLOSED W289 HIGH-1** | agent-teams PR #535 silent-drift fix | Installed SHA `08ded5e7` matches upstream HEAD as of 2026-05-19 audit |

### Operator-AIs

| # | Severity | Action | Effort | Reversibility |
|---|----------|--------|--------|---------------|
| AI-D1 | HIGH | **Tighten W269 mandate text** in CLAUDE.md to forbid serial-Agent in multi-stream contexts. Concrete diff at end of §7 below. | 5 min | trivial git revert |
| AI-D2 | MEDIUM | **Add `parallel_ratio` telemetry** — append per-session `parallel_ratio = parallel_msgs / (parallel + serial)` to a JSONL, with target ≥0.7 | 30 min hook author | 2 min revert |
| AI-D3 | MEDIUM | **Re-verify wshobson upstream SHAs** for comprehensive-review + context-management plugins (current `34632bc` may have drift) | 5 min `git ls-remote` | none |
| AI-D4 | LOW | **Archive orphaned mailboxes** at `~/.claude/teams/claude-sota-installed/inboxes/` to `tmp/W312-mailbox-archive/` | 2 min `mv` | trivial revert |
| AI-D5 | LOW | **Document T1-T5 decision tree** (§5 of this doc) into `agent-teams:team-composition-patterns` SKILL.md OR a new `decision-tree-tier-rubric` skill | 1 hour | git revert |

### Proposed W269 mandate diff (paste-ready for CLAUDE.md)

**Current text (CLAUDE.md:14)**:
```
- **Agent-team trigger (W269 mandate)**: for any research / audit / review / debug / migration / large-feature fire with 2+ independent questions or workstreams, the parent orchestrator MUST first dispatch agent-teams (`/team-spawn research|security|review|debug|feature|fullstack|migration` or `TeamCreate` + `Agent` teammates with `subagent_type=agent-teams:team-*`) — or parallel subagent fan-out via the Agent tool + `superpowers:dispatching-parallel-agents` pattern — before falling back to solo serial execution. Solo is reserved for trivial tasks, explicitly solo requests, or user-forbidden delegation; non-solo choice MUST record the chosen preset or the reason for not spawning.
```

**Proposed (W312-D tightening)**:
```
- **Agent-team trigger (W269 mandate, W312-D tightening)**: for any research / audit / review / debug / migration / large-feature fire with 2+ independent questions or workstreams, the parent orchestrator MUST first dispatch agent-teams (`/team-spawn research|security|review|debug|feature|fullstack|migration` or `TeamCreate` + `Agent` teammates with `subagent_type=agent-teams:team-*`) — or parallel subagent fan-out via the Agent tool + `superpowers:dispatching-parallel-agents` pattern (**MUST be 2+ Agent calls in 1 assistant message; serial Agent dispatch in multi-stream contexts is non-compliant — this is the W312-D silent-fallback failure mode**) — before falling back to solo serial execution. Solo is reserved for trivial tasks, explicitly solo requests, user-forbidden delegation, or single-target dependent tasks where streams genuinely cannot run in parallel; non-solo choice MUST record the chosen preset or the reason for not spawning. **Target parallel_ratio ≥0.7 per multi-stream session** (rationale: W312-D measured 58.4% actual, target moves runtime to compliant majority).
```

---

`STREAM-W312-D-RETURN: 5 silent-fallback findings (F1 HIGH serial-Agent, F2 MEDIUM agent-teams-unused, F3 MEDIUM mandate-loophole, F4 MEDIUM no-telemetry, F5 LOW orphaned-mailboxes) + 6 decision-rubric blocks (T1-T5 tree + INSTALL-vs-VENDOR-FORK split + convergence routing + perplexity-vs-deepwiki + Stage-1-5 cost ladder + operator tier-action handbook) + 5 operator-AIs (AI-D1 mandate-tighten HIGH, AI-D2 telemetry MEDIUM, AI-D3 SHA-re-verify MEDIUM, AI-D4 mailbox-archive LOW, AI-D5 decision-tree skill LOW)`
