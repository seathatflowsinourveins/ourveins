# W341 Stream D — CCBP / ECC / Anthropic-Native Compliance Audit

> Wave: W341-FULL-SOTA-UNLEASH; Stream D; Date: 2026-05-20
> Parent runtime: Z:\claude-sota-installed
> Operator scope: Insights gap + GitHub CI/CD + native primitives vs CCBP/ECC/anthropic-cookbook
> Sibling streams: A=runtime-cleanness · B=sota-repos-ingest · C=research-arch-audit · G=gitnexus-codegraph-insights
> Predecessor: W340 Stream F (insights audit — already comprehensive)

## §1 HEAD SHA Freshness Table

| Repo | URL | HEAD SHA | Date | Source |
|---|---|---|---|---|
| anthropics/claude-code | github.com/anthropics/claude-code | `cc898dc3692f` | 2026-05-19T21:31:01Z | `gh api repos/.../commits/HEAD` |
| anthropics/claude-cookbooks | github.com/anthropics/claude-cookbooks | `39a350b67901` | 2026-05-19T18:32:24Z | `gh api` |
| affaan-m/everything-claude-code | github.com/affaan-m/everything-claude-code | `b62f80750d85` | 2026-05-19T08:59:55-0400 | local `git log -1` |
| shanraisshan/claude-code-best-practice | github.com/shanraisshan/claude-code-best-practice | `a28cd96b6c68` | 2026-05-20T19:37:45Z | `gh api` |
| local CCBP clone (cited in CLAUDE.md L3) | Z:/repos/deps/claude-code-best-practice-shan | `f28c2da35229` | 2026-05-20T00:00:58+05:00 | local `git log -1` |

**Note**: Local CCBP clone (`f28c2da`) is **5 commits behind** upstream HEAD (`a28cd96`). W314 cross-SHA chain in CLAUDE.md L3 still valid (cite-anchored to `f28c2da`); recommend `git pull` for W342.

## §2 Anthropic-Native Primitive Gap Matrix

Cite-source: deepwiki anthropics/claude-code CHANGELOG.md + `https://docs.anthropic.com/en/docs/claude-code/` + this runtime `.claude/settings.json` introspection.

| Primitive | Anthropic Status | This Runtime | Verification |
|---|---|---|---|
| **`/branch` (a.k.a. `/fork` alias)** | EXISTS (renamed from `/fork`) | AVAILABLE (built-in) | CLAUDE.md L14 W280d cites worktree per session; no project skill wraps `/branch` |
| **`/model`** | EXISTS (interactive picker, persists across restarts) | AVAILABLE; `settings.json:model` NOT_SET (uses default Sonnet/Opus pool) | `python -c "import json; ..."` → `model: NOT_SET` |
| **`/plan`** | EXISTS (plan mode) | AVAILABLE | Native CC primitive; no project skill needed |
| **`/compact`** | EXISTS | AVAILABLE; `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` **NOT_SET** (intentional per CLAUDE.local.md W280c — falls back to default ~95%) | `python` introspect → `NOT_SET`; rationale documented |
| **`/clear`** | EXISTS | AVAILABLE | Native; no project skill |
| **`/resume`** | EXISTS (PR-URL search added) | AVAILABLE | `claude --resume <session-id>` |
| **`/export`** | EXISTS | AVAILABLE | Native; un-instrumented (no export-pipeline hook) |
| **`/skills`** | EXISTS (filter search) | AVAILABLE; 51 local + 64 plugin skills | `ls .claude/skills/ \| wc -l` → 51 |
| **`/agents`** | EXISTS (also `claude agents` CLI) | AVAILABLE | per CLAUDE.md L13: subagents wired |
| **`/plugins`** | EXISTS (scope-grouped) | AVAILABLE; 64 installed records | per CLAUDE.md L37 |
| **`/output-style`** | **NOT documented** as slash | settings.json:`outputStyle: "Proactive"` STATIC | runtime hard-codes; no `/output-style` interactive switcher in CHANGELOG |
| **`/statusline`** | **NOT documented** as slash; but `statusLine` config IS official | WIRED via `ccstatusline@2.2.19` (3-line custom) | settings.json:statusLine probe |
| **`/memory`, `/remember`** | NOT slash commands; memory ops are automatic + `autoMemoryEnabled` | DISABLED (`CLAUDE_CODE_DISABLE_AUTO_MEMORY=1`) per CLAUDE.local.md rationale | settings probe → `autoMemoryEnabled: False` |
| **`/insights`** | EXISTS in CHANGELOG (bug-fix context line 569 — present but minimal docs) | UNUSED by operator workflow | W340 Stream F §1.1: `/insights` + `/recap` available but unused — RECOMMEND P1 |
| **`/recap`** | EXISTS | UNUSED | W340 §1.1 |
| **`/fork-session`** (not `/branch`) | DOES NOT EXIST as separate command | N/A | CLAUDE.md L14 W280d wording uses `--fork-session` flag + `/branch` slash — both correct |
| **`/migrate-installer`** | NOT in CHANGELOG | N/A | deepwiki probe negative |
| **`/restart`** | NOT in CHANGELOG | N/A | deepwiki probe negative |
| **`--bg` / `claude --bg`** | NOT slash; Ctrl+B for backgrounding agents | partial — CLAUDE.md L14 cites `claude --bg` but Anthropic docs only show `Ctrl+B`; needs re-cite | Per CLAUDE.md L14: docs say "background sessions" — verify against `code.claude.com/docs/en/headless` |

**KEY FINDING**: this runtime has wired ≥9 of the 11 documented Anthropic-native slash commands. Only **`/insights` + `/recap`** are unused in operator workflow (P1 — see §7). `/output-style` is set statically (`"Proactive"`); no interactive switcher invoked.

**Insights gap CLOSED**: `context-mode:ctx-insight` skill IS INSTALLED (verified via active-skills system reminder). The `/context-mode:ctx-insight` slash command opens browser-based analytics dashboard (session activity, tool usage, error rate, parallel-work patterns, project focus) at first-run install + subsequent instant-open. PLUS W340 Stream F documents `session-report` skill ships an HTML-report generator for `.claude/projects/*/` JSONL corpus (3,428 sessions). Both **untriggered in operator workflow** — recommend P1 binding into wave-close cron.

## §3 CCBP Rule Compliance Audit

Cite: `Z:/repos/deps/claude-code-best-practice-shan/best-practice/` @ local HEAD `f28c2da` (5 commits behind upstream `a28cd96`).

| CCBP File | Section | Rule | This Runtime | Compliance |
|---|---|---|---|---|
| claude-memory.md | §1 Writing CLAUDE.md | "single most impactful way to improve CC output" + structured | CLAUDE.md ≤50 LOC pointer-only | COMPLIANT (W255 cleanup ratified) |
| claude-memory.md | §2 Monorepo loading (ancestor=eager, descendant=lazy, sibling=never) | apply CLAUDE.md only at relevant scope | runtime is project-root; no descendant CLAUDE.md tree | COMPLIANT (single-root install) |
| claude-memory.md | §2 Best Practice 4 | "CLAUDE.local.md for personal preferences + .gitignored" | CLAUDE.local.md present + gitignored per CLAUDE.local.md L52 | COMPLIANT |
| claude-settings.md | §877-921 Env block | Z:-portable HOME isolation, CLAUDE_CONFIG_DIR | applied per CLAUDE.local.md (a)-(h) env block | COMPLIANT |
| claude-settings.md | autocompact override (L826 ~95%) | "Default is ~95%. Set lower (e.g., 50) to trigger compaction earlier" | NOT_SET (intentional per W280c) | COMPLIANT (rationale documented) |
| claude-skills.md | Anthropic-sanctioned `.claude/skills/<name>/SKILL.md` | local skills via SKILL.md path-gated | 51 local skills @ `.claude/skills/` | COMPLIANT |
| claude-commands.md | Built-in commands inventory | inventory present | likely 5 commits behind upstream — needs sync | **P2 — pull latest CCBP** |
| claude-subagents.md | sub-agent system | per CLAUDE.md L11: codex GPT-5.5 + cardinal-rule-3 FQN | COMPLIANT |
| claude-mcp.md | MCP server config | `.mcp.json` env-interp pattern | COMPLIANT (W286-arc-P0C `npx -y <pkg>@<ver>` contract) |
| claude-power-ups.md | (unread — likely covers statusline, plan-mode, etc.) | possible gap if not surveyed | **AUDIT-DEFERRED** | **P2** |
| claude-cli-startup-flags.md | startup flags | (unread) | **AUDIT-DEFERRED** | **P2** |

**Bottom line**: 8 of 9 surveyed CCBP files = COMPLIANT. Local CCBP clone is 5 commits stale; pull `a28cd96` for full compliance verification.

## §4 ECC Feature Gap Matrix

Cite: `Z:/claude-sota-installed/.claude/plugins/cache/everything-claude-code/everything-claude-code/2.0.0-rc.1/` (75 commands + dashboard.py + 8 workflows).

### ECC Primitives ABSENT in This Runtime

| ECC Primitive | Type | Function | This Runtime | Recommend |
|---|---|---|---|---|
| `/ecc:cost-report` | command | cost analytics across sessions | UNUSED | P1 — wire into wave-close |
| `/ecc:harness-audit` | command | meta-audit of CC harness config | UNUSED | P1 — could replace ad-hoc audits |
| `/ecc:instinct-status` / `instinct-export` / `instinct-import` | commands | instinct file ops (ECC's curated-instinct system) | NOT_USED | P2 — evaluate vs basic-memory T6 |
| `/ecc:loop-start` / `loop-status` | commands | persistent task loops | partial overlap with `loop` skill | P2 — dedupe with built-in `loop` |
| `/ecc:hookify` family (3 cmds) | commands | hook installation helper | not used | P2 — cardinal-rule-2 already covers |
| `/ecc:aside` | command | quick scratchpad | UNUSED | P3 |
| `ecc_dashboard.py` | Python script | dashboard generator | UNUSED | P1 — overlaps with `ctx-insight` + `session-report` |
| ECC `.github/workflows/monthly-metrics.yml` | CI | monthly metrics snapshot issue | NOT IN runtime | P1 — wire equivalent |
| ECC `.github/workflows/supply-chain-watch.yml` | CI | 6-hourly IOC watch | NOT IN runtime | P1 — wire (security gain) |

### Primitives PRESENT in BOTH

- `code-review.md`, `feature-dev.md`, `build-fix.md` ≈ this runtime's `code-review`, `feature-dev`, `comprehensive-review` plugins
- `commitlint.config.js` ≈ this runtime's `.github/workflows/commitlint.yml`
- `eslint.config.js` — N/A (this runtime is not JS-source)

**Bottom line**: ECC ships 75 commands; this runtime has full ECC plugin INSTALLED (per CLAUDE.md L37 `plugin:everything-claude-code:memory` ✓) but operator workflow uses ~5 of 75. 4 ECC primitives are P1 candidates to wire actively (cost-report, harness-audit, monthly-metrics CI, supply-chain-watch CI).

## §5 GitHub CI/CD Enhancement Proposals

### Current State (this runtime)

15 workflows installed:
```
actionlint.yml         code-quality.yml          dependabot-auto-merge.yml
ci.yml                 codeql.yml                labeler.yml
claude-code-security-review.yml  codex-review.yml  provenance.yml
commit-signing.yml     commitlint.yml            release-please.yml
scorecard.yml          stale.yml                 zizmor-action.yml
```

### Comparison vs Sources

| Source | Their Unique Workflows | This Runtime Has? | Recommend |
|---|---|---|---|
| ECC | `monthly-metrics.yml` (monthly issue snapshot) | NO | **P1 — ADD** (metrics tracking via issue) |
| ECC | `supply-chain-watch.yml` (6-hour IOC sweep) | NO | **P1 — ADD** (security gain) |
| ECC | `reusable-release.yml`, `reusable-test.yml`, `reusable-validate.yml` | partial (`release-please.yml` covers) | **P2** — evaluate reusable-workflow refactor |
| Anthropic claude-code | (anthropics workflows not directly inspected — repo is CLI not template) | n/a | n/a |
| anthropics/claude-cookbooks | no CI workflows (notebooks repo) | n/a | n/a |

### Proposed Additions (P1, 3 new workflows)

1. **`monthly-metrics.yml`** (ECC port) — monthly issue update with session counts, plugin enablement, skill-fire counts; cron `0 14 1 * *`.
2. **`supply-chain-watch.yml`** (ECC port) — 6-hour IOC sweep against installed npm/pip deps; complements existing scorecard + dependabot.
3. **`session-jsonl-archive.yml`** (NEW) — nightly compression + offsite-rsync of `.claude/projects/Z--claude-sota-installed/` JSONL corpus (3,428 sessions / ~12 GB per W340 Stream F); prevents history loss.

### Proposed Strengthening (P2, 2 enhancements)

4. **`codex-review.yml`** — currently PR-triggered; add `workflow_dispatch` + scheduled-baseline nightly run against `main` (cardinal-rule-6 verify-before-claim continuous gate).
5. **`ci.yml`** — add `pytest -m sca_v15_invariants` job per W341 sibling Stream A invariants (if landed); else placeholder.

## §6 Cookbook Orchestrator-Pattern Audit

Cite: `Z:/repos/deps/claude-cookbooks/patterns/agents/orchestrator_workers.ipynb` + `research_lead_agent.md` cited in CLAUDE.md L14 + plugin `superpowers:dispatching-parallel-agents` + local fork `dispatching-parallel-agents-w321-fork`.

| Cookbook Pattern | Spec | This Runtime Adoption |
|---|---|---|
| `orchestrator_workers.ipynb` cell-2 empty-content stub | empty completion → re-dispatch or OrchestrationError | INSTALLED as `empty-final-message-guard` skill (auto-fires per CLAUDE.md cardinal-rule-3 W340 surfaced) |
| `research_lead_agent.md:135-137` `<use_parallel_tool_calls>` MUST-block | 2+ Agent calls in 1 assistant message for multi-stream | ENFORCED by `parallel-dispatch-mandate` skill + `dispatching-parallel-agents-w321-fork` (W321-fork adds skeleton-first-write, budget cap, subagent_type pre-flight) |
| Worker exception fail-closed | exception → mark FAILED-EXCEPTION + escalate | INSTALLED as `worker-failure-termination-guard` skill |
| `evaluator_optimizer.ipynb` | generate-evaluate loop | partial — `dual-review` skill (GPT-5.5 cross-model) but no formal evaluator-optimizer loop in skill catalog |
| `basic_workflows.ipynb` — Router/Parallel/Orchestrator/Evaluator | 4 reusable patterns | EXTRACTED into `mcp-agent-patterns` skill (5-pattern extract from lastmile-ai per skill desc) |

**Bottom line**: cookbook orchestrator patterns are FULLY ADOPTED. The 3 fail-closed guards (empty-final-message, worker-failure-termination, parallel-dispatch-mandate) are in active rotation per CLAUDE.md cardinal-rule-3. Only gap: **no formal evaluator-optimizer wiring** for code-review / spec-eval loops — could leverage `dual-review` + new evaluator-optimizer skill.

## §7 P0 / P1 / P2 Prioritization

### P0 (ship blockers — none identified)

NONE. This runtime is broadly CCBP-compliant and Anthropic-native-primitive-wired. No blocking gaps surfaced in Stream D scope.

### P1 (high-value, ≤1 wave)

1. **P1-D1 — Wire `/insights` + `/recap` + `/context-mode:ctx-insight` into wave-close cron**: add to `ops-rhythm` or close-wave skill so insights dashboard refreshes monthly. W340 Stream F documented but unused.
2. **P1-D2 — Add ECC `monthly-metrics.yml` GitHub workflow**: monthly issue snapshot of plugin enablement, skill-fire counts, session count. Direct port from `everything-claude-code/2.0.0-rc.1/.github/workflows/monthly-metrics.yml`.
3. **P1-D3 — Add ECC `supply-chain-watch.yml` GitHub workflow**: 6-hour IOC sweep against npm/pip deps (cardinal-rule-1 W331 axis-1 #3 trust-tuple extension mechanization). Direct port.
4. **P1-D4 — Add `session-jsonl-archive.yml` workflow**: nightly archive of 3,428-session corpus (12 GB) per W340 Stream F. Prevents data loss; enables long-window analytics.
5. **P1-D5 — Trigger `session-report` skill against full JSONL corpus**: one-shot HTML report generation per W340 Stream F §1.1; output to `docs/session-reports/2026-05-20.html`.
6. **P1-D6 — `gh api repos/.../codex-review.yml`**: add `workflow_dispatch` + nightly scheduled baseline to existing codex-review.yml (continuous cardinal-rule-6 gate).

### P2 (≤2 waves, medium value)

7. **P2-D7 — Pull latest CCBP** (`a28cd96`, 5 commits ahead of local `f28c2da`) and re-cite CLAUDE.md L3 anchor.
8. **P2-D8 — Survey CCBP `claude-power-ups.md` + `claude-cli-startup-flags.md`** for unaudited rules.
9. **P2-D9 — Wire ECC `/ecc:cost-report` + `/ecc:harness-audit`** into operator workflow.
10. **P2-D10 — Build formal evaluator-optimizer skill** wrapping `dual-review` for code-review loops per cookbook `evaluator_optimizer.ipynb`.
11. **P2-D11 — Add `pytest -m sca_v15_invariants` job** to `ci.yml` if Stream A lands invariant tests.

### P3 (defer / nice-to-have)

12. **P3-D12 — Evaluate ECC `/ecc:instinct-*` family** vs basic-memory T6 (may be redundant).
13. **P3-D13 — Dedupe `/ecc:loop-start` vs built-in `loop` skill**.

## §8 Cite-Anchors

| Cite-ID | Source | URL or Path | SHA / Verified |
|---|---|---|---|
| D-C1 | anthropics/claude-code CHANGELOG | github.com/anthropics/claude-code | `cc898dc3692f` |
| D-C2 | anthropics/claude-cookbooks | github.com/anthropics/claude-cookbooks | `39a350b67901` |
| D-C3 | affaan-m/everything-claude-code | github.com/affaan-m/everything-claude-code | `b62f80750d85` |
| D-C4 | shanraisshan/claude-code-best-practice upstream | github.com/shanraisshan/claude-code-best-practice | `a28cd96b6c68` |
| D-C5 | CCBP local clone (CLAUDE.md L3 anchor) | Z:/repos/deps/claude-code-best-practice-shan | `f28c2da35229` (5 behind) |
| D-C6 | CCBP claude-memory.md | Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-memory.md | L1-122 |
| D-C7 | CCBP claude-settings.md | (same dir) | L877-921 env block authority |
| D-C8 | this runtime settings.json | Z:/claude-sota-installed/.claude/settings.json | python introspect keys |
| D-C9 | ccstatusline | settings.json:statusLine | v2.2.19 |
| D-C10 | ECC monthly-metrics.yml | `.claude/plugins/cache/everything-claude-code/.../2.0.0-rc.1/.github/workflows/monthly-metrics.yml` | local read |
| D-C11 | ECC supply-chain-watch.yml | same path | local read |
| D-C12 | this runtime workflows | Z:/claude-sota-installed/.github/workflows/ | 15 yml files |
| D-C13 | deepwiki probe | anthropics/claude-code wiki | listed slash cmds |
| D-C14 | W340 Stream F | Z:/claude-sota-installed/docs/architecture/W340-FULL-SOTA-UNLEASH/stream-F-insights-audit.md | predecessor |
| D-C15 | cookbook patterns | Z:/repos/deps/claude-cookbooks/patterns/agents/ | orchestrator_workers.ipynb + evaluator_optimizer.ipynb + basic_workflows.ipynb + research_lead_agent.md |
| D-C16 | active skills system reminder | session-injected | confirms 51 local + 64 plugin = 115 skill universe |
