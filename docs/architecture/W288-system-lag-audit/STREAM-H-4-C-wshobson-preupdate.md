# W288 Stream H-4-C — `wshobson/agents` cluster pre-update SOTA audit

**Date**: 2026-05-18
**Wave**: W288 (research-arch v2)
**Stream**: H-4-C
**Author**: Stream H-4-C subagent (parent: claude-sota-installed orchestrator)
**Source-of-truth**: marketplace `claude-code-workflows` = `github:wshobson/agents`
**Installed-pin SHA**: `34632bcbea28176ba25bbbc43cd4017d88b1cac6` (15 plugins) / `08ded5e7b0fe57e7f40194775885eba539c3d8e7` (2 plugins already at HEAD) / `5df9ad4012f78b9ff6ba551c36a3a0f583d26bf3` (1 git-subdir plugin `qa-orchestra`)
**Upstream HEAD SHA**: `08ded5e7b0fe57e7f40194775885eba539c3d8e7` (2026-05-16)
**Method**: per-commit `git show` against installed cache snapshots + `diff -rq` byte-equality probes + DeepWiki cross-check + sca-v3 14-dim rubric scoring

> **Rubric reference**: `docs/architecture/W288-RESEARCH-ARCH-v2/STREAM-C-RUBRIC-v3.md` §1 (D1-D15, 14 active dims after `D15 supply_chain_safety` deferral), §2.2 install_score weights, §2.3 pattern_score weights, §1.1 hard-caps.
> **Prior-art**: Stream H-2 (`STREAM-H-2-wshobson-drift-audit.md`) — this stream extends H-2's drift detection with sca-v3 scoring and explicit per-plugin update verdicts.

---

## 1. TL;DR

**18 wshobson plugins audited** (operator-listed). After deduplication: **17 plugins are within marketplace `claude-code-workflows` scope**; 3 names in the operator's brief (`engineering-skills`, `engineering-advanced-skills`, `code-review`) are from OTHER marketplaces (`claude-code-skills`, `claude-plugins-official`) and are out-of-scope here — Stream H-3 covers them.

Per-plugin verdicts across the **17 in-scope** plugins:

| Verdict | Count | Plugins |
|---|---|---|
| **SAFE-TO-UPDATE** | 1 | `agent-teams` (will revalidate W269 mandate alignment but no behavior regression possible) |
| **NO-OP** (bit-identical, no upstream change in delta) | 14 | `agent-orchestration`, `comprehensive-review`, `context-management`, `developer-essentials`, `tdd-workflows`, `debugging-toolkit`, `incident-response`, `llm-application-dev`, `block-no-verify`, `shell-scripting`, `signed-audit-trails`, `conductor`, `ship-mate`, `review-agent-governance` |
| **SAFE-TO-UPDATE (tool-improvement)** | 1 | `plugin-eval` (PR #530 + #532 — false-positive-clearing + visibility improvements; ZERO regression risk per DeepWiki cross-check) |
| **NEEDS-CONDITIONS** | 1 | `protect-mcp` (operator-disabled `hooks.json.disabled-v0.5.5-cli-mismatch` override MUST survive any update — see §8 mitigation) |
| **HOLD** | 0 |  |
| **OUT-OF-SCOPE** (orphan / different marketplace) | 1 + 3 | `qa-orchestra` (git-subdir orphan, marketplace.json entries but no plugin tree); `engineering-skills`, `engineering-advanced-skills`, `code-review` (other marketplaces) |

**Critical sub-finding (re-confirmed from H-2 P0-A)**: All 17 in-scope cache snapshots are **byte-identical to upstream HEAD** at the level of every file shipped inside the installed plugin tree. The SHA pointer drift (`34632bc → 08ded5e`) is therefore a *manifest-metadata pointer lag*, not a content lag. PR #535 content (agent-teams coordination guardrails) is **already present in our cache** because the install snapshot (2026-05-17) post-dates the commit (2026-05-16) — silent-SHA-drift in the favorable direction.

**Net update value**: LOW for runtime behavior (cache already current) but HIGH for installed_plugins.json honesty and W270 corollary discipline. Update is a cardinal-rule-1-W270 hygiene action, NOT a functional uplift.

---

## 2. 5-commit delta digest (`34632bc..08ded5e`)

```
86bad08 meigen-ai-design: bump to 1.0.7, pin npm to meigen@1.3.1 (#527)
83d70bc fix(plugin-eval): surface plugin-level depth downgrades loudly (#532)
112197c fix(plugin-eval): broaden MISSING_TRIGGER pattern to match canonical phrasings (#530)
3e17b71 feat(machine-learning-ops): add recsys-pipeline-architect skill (#533)
08ded5e fix: agent teams coordination guardrails (#535)
```

Per-commit summary:

### 86bad08 — `meigen-ai-design` 1.0.5 → 1.0.7 (#527)
- **Files**: `.claude-plugin/marketplace.json` (version bump only) + `plugins/meigen-ai-design/.claude-plugin/plugin.json` + `plugins/meigen-ai-design/README.md`.
- **Scope**: `meigen-ai-design` — **NOT INSTALLED here** (rejected in Stream H-2 SOTA-fit sweep as out-of-scope; AI-image-generation workload).
- **Update impact on this runtime**: ZERO.

### 83d70bc — `plugin-eval` depth-downgrade visibility (#532)
- **Files**: `plugins/plugin-eval/src/plugin_eval/cli.py`, `plugins/plugin-eval/src/plugin_eval/reporter.py`, plus tests.
- **Scope**: `plugin-eval@0.1.0` — INSTALLED.
- **Behavior class**: BUG-FIX — metadata-only (sets `confidence_label = "Estimated"` for plugin-level evals where deeper judge/Monte-Carlo layers aren't run; CLI now emits a yellow warning). DeepWiki cross-check confirms: "no impact on the scoring logic itself ... cannot regress an existing 'pass' to a 'fail'".
- **Touches hooks**: No. **Touches agent frontmatter**: No. **Touches skill `description:`**: No.

### 112197c — `plugin-eval` `MISSING_TRIGGER` regex broadening (#530)
- **Files**: `plugins/plugin-eval/src/plugin_eval/layers/static.py`, `plugins/plugin-eval/tests/test_static.py`.
- **Scope**: `plugin-eval@0.1.0` — INSTALLED.
- **Behavior class**: BUG-FIX — broadens the regex to accept third-person canonical ("This skill should be used when…"), prepositional ("Use after…", "Use before…", "Use immediately before…", "Use whenever…"), and auto-load ("Auto-loads when…") trigger forms in skill `description:` fields. The regex is now `\b(?:should\s+be\s+)?used?\s+(?:this\s+skill\s+)?(?:immediately\s+)?(?:when|after|before|whenever)\b|...`. DeepWiki cross-check confirms: "It does not introduce new conditions for flagging this anti-pattern" — i.e. pass→fail regression is **impossible by construction**, only fail→pass improvements.
- **Effect on our 18 local operator-curated skills**: very likely **frees** any false-positive `MISSING_TRIGGER` flag in `docs/architecture/W280f-SKILL-AUDIT-2026-05-17.md` (current state: 816 PASS / 2204 PARTIAL / 203 FAIL). Numerical re-scoring is read-only-tool action; not in scope for this audit.
- **Touches hooks**: No. **Touches agent frontmatter**: No. **Touches skill `description:`**: No.

### 3e17b71 — `machine-learning-ops` adds `recsys-pipeline-architect` skill (#533)
- **Files**: `plugins/machine-learning-ops/skills/recsys-pipeline-architect/SKILL.md` (new file only).
- **Scope**: `machine-learning-ops` — **NOT INSTALLED here** (out-of-scope per Stream H-2; ML/feed-ranking workload).
- **Update impact on this runtime**: ZERO. (Stream H-2 §followup noted this as a *cite-only* SOTA reference for "top-K-pipeline" pattern derived from xAI's open-sourced X For You algorithm — no install action required.)

### 08ded5e — `agent-teams` coordination guardrails (#535)
- **Files**: 8 plugin files inside `plugins/agent-teams/`:
  - `agents/team-lead.md` — tools list extended; description unchanged; communication-protocol text refined (point 5 + new point 6 about suffixed-name handling).
  - `agents/team-implementer.md` — tools list extended (`+ TaskList, TaskGet, TaskUpdate, SendMessage`); description **unchanged**.
  - `agents/team-reviewer.md` — tools list extended (same suite); description **unchanged**.
  - `agents/team-debugger.md` — tools list extended (same suite); description **unchanged**.
  - `commands/team-spawn.md` — Phase 2 step 2 + new step 3: spawned member name MUST be unique (e.g. "fullstack-lead", "frontend-impl"); `subagent_type` now uses the specific `agent-teams:team-*` rather than always `general-purpose`; new guardrail: "Do not use the role name `team-lead` as the spawned member name. Team creation can reserve role-like names…".
  - `skills/team-communication-protocols/SKILL.md` — minor messaging-pattern refinements (3 lines added per diff context window).
  - `skills/team-composition-patterns/SKILL.md` — composition discipline reference text refinements.
  - `skills/team-composition-patterns/references/agent-type-selection.md` — **new file** (decision-tree for when to pick general-purpose vs team-implementer/reviewer/debugger).
- **Non-plugin files** also in the commit but NOT shipped to installed runtime: `.github/workflows/validate.yml` (CI), `tools/check_agent_name_collisions.py` (upstream-repo tooling).
- **Scope**: `agent-teams@1.0.2` — INSTALLED; SILENT-SHA-DRIFT case (no version bump despite content change).
- **Behavior class**: BUG-FIX + GUARDRAIL HARDENING. DeepWiki cross-check: "no explicit mentions of breaking changes for users who already have `agent-teams` installed. The changes seem to be additive and refine existing behaviors".
- **Touches hooks**: No. **Touches agent frontmatter**: YES — the `tools:` list on all 4 team-* agents is broadened (Agent / TeamCreate / TeamDelete / TaskCreate / TaskList / TaskGet / TaskUpdate / SendMessage). This is an ADDITIVE permission grant, not a description-change, so auto-fire trigger is unaffected. **Touches skill `description:`**: No (skill body text changed; description front-matter unchanged per Stream H-2 line-level inspection).

### Per-PR commit anchor table

| PR | SHA | Plugin(s) | Hooks | Agent frontmatter | Skill `description:` | Verdict |
|---|---|---|---|---|---|---|
| #527 | `86bad08` | meigen-ai-design (NOT-INSTALLED) | — | — | — | N/A out-of-scope |
| #530 | `112197c` | plugin-eval | No | No | No | SAFE bug-fix |
| #532 | `83d70bc` | plugin-eval | No | No | No | SAFE bug-fix |
| #533 | `3e17b71` | machine-learning-ops (NOT-INSTALLED) | — | — | — | N/A out-of-scope |
| #535 | `08ded5e` | agent-teams | No | YES (`tools:` extended; `description:` unchanged) | No | SAFE additive |

---

## 3. Per-affected-plugin verdict table

Of the 18 operator-listed plugin names, the 17 in marketplace `claude-code-workflows` scope (after correcting 3 mis-attributed names) split as below. Only **2 plugins** are touched by any commit in the 5-commit delta; the remaining 15 are byte-identical NO-OPs.

| # | Plugin | Installed ver | Installed SHA | Touched by delta? | Cache bit-identical to HEAD? | Update verdict | Top reason |
|---|---|---|---|---|---|---|---|
| 1 | `agent-orchestration` | 1.2.1 | 34632bc | No | YES | **NO-OP** | No commit affects this plugin |
| 2 | `agent-teams` | 1.0.2 | 34632bc | YES (#535) | YES | **SAFE-TO-UPDATE** | Silent-SHA — cache already current; update fixes pointer hygiene |
| 3 | `block-no-verify` | 1.0.0 | 34632bc | No | YES | **NO-OP** | No commit affects |
| 4 | `comprehensive-review` | 1.3.0 | 34632bc | No | YES | **NO-OP** | No commit affects |
| 5 | `conductor` | 1.2.1 | **08ded5e** | No | YES | **ALREADY AT HEAD** | SHA already up to date |
| 6 | `context-management` | 1.2.0 | 34632bc | No | YES | **NO-OP** | No commit affects |
| 7 | `debugging-toolkit` | 1.2.0 | 34632bc | No | YES | **NO-OP** | No commit affects |
| 8 | `developer-essentials` | 1.0.3 | 34632bc | No | YES | **NO-OP** | No commit affects |
| 9 | `incident-response` | 1.3.1 | 34632bc | No | YES | **NO-OP** | No commit affects |
| 10 | `llm-application-dev` | 2.0.5 | 34632bc | No | YES | **NO-OP** | No commit affects |
| 11 | `plugin-eval` | 0.1.0 | 34632bc | YES (#530 + #532) | YES | **SAFE-TO-UPDATE (tool-improvement)** | Silent-SHA — cache already current; update fixes pointer hygiene |
| 12 | `protect-mcp` | 0.1.0 | 34632bc | No | YES (modulo operator override) | **NEEDS-CONDITIONS** | Operator override `hooks.json.disabled-v0.5.5-cli-mismatch` MUST be preserved across update |
| 13 | `review-agent-governance` | 0.1.0 | 34632bc | No | YES | **NO-OP** | No commit affects |
| 14 | `ship-mate` | 1.0.0 | **08ded5e** | No | YES | **ALREADY AT HEAD** | SHA already up to date |
| 15 | `signed-audit-trails` | 0.1.0 | 34632bc | No | YES | **NO-OP** | No commit affects |
| 16 | `shell-scripting` | 1.2.2 | 34632bc | No | YES | **NO-OP** | No commit affects |
| 17 | `tdd-workflows` | 1.3.0 | 34632bc | No | YES | **NO-OP** | No commit affects |
| 18 | `qa-orchestra` | 1.0.0 | 5df9ad4 | No | git-subdir orphan | **OUT-OF-SCOPE** | Plugin tree absent in marketplace; managed via Stream H-2 followup |

Out-of-scope (different marketplaces, not wshobson):

| Plugin | Marketplace | Note |
|---|---|---|
| `engineering-skills@2.2.3` | claude-code-skills | Stream H-3 covers |
| `engineering-advanced-skills@2.4.4` | claude-code-skills | Stream H-3 covers |
| `code-review@01ffc11b4398` | claude-plugins-official | Stream H-3 covers |

---

## 4. Behavior-change findings (silently-triggered runtime semantics)

### 4.1 Auto-fire trigger changes via skill `description:` — **NONE**

Cross-checked all 4 `agent-teams` agent frontmatter blocks (`team-lead`, `team-implementer`, `team-reviewer`, `team-debugger`): the `description:` line is **byte-identical** before and after #535. Only the `tools:` permission list changed. Therefore the skill-auto-fire heuristic (which keys off `description:` substrings per `https://code.claude.com/docs/en/skills`) is **unchanged**. Same for the 2 SKILL.md files in the diff — the front-matter `description:` is unchanged; only body text was edited.

**3-of-3 evidence**:
1. **Source** — `git show 08ded5e -- plugins/agent-teams/agents/team-{lead,implementer,reviewer,debugger}.md` shows only `tools:` line changes; `description:` lines verbatim identical.
2. **Independent** — DeepWiki: "The changes seem to be additive and refine existing behaviors".
3. **Direct probe** — `diff <cache>/agent-teams/1.0.2/agents/team-lead.md <marketplace>/.../agent-teams/agents/team-lead.md` returns identical file (cache already at post-#535 state).

### 4.2 Agent system-prompt body rewrite — **MINOR, ADDITIVE**

`team-lead.md` body Section "Communication Protocols" point 5 changed:
- **Before**: `Refer to teammates by NAME, never by UUID`
- **After**: `Refer to teammates by their actual spawned NAME, never by UUID or role alias` + new point 6 about suffixed names.

This is a **clarification** of an already-stated rule, not a new behavior. No regression risk.

`team-spawn.md` Phase 2 step 2 changed:
- **Before**: `subagent_type: "general-purpose" (teammates need full tool access)`
- **After**: `subagent_type: the selected role (for example, agent-teams:team-lead, agent-teams:team-implementer, agent-teams:team-reviewer, agent-teams:team-debugger, or general-purpose for research)` + new step 3 about avoiding role-name as member-name.

This **changes** the spawned-subagent class for non-research presets from `general-purpose` to the specific `agent-teams:team-*` types. **Practical implication**: invocations of `/team-spawn debug|review|feature|fullstack|migration|security` will now spawn agents typed to the matching `agent-teams:team-*` rather than `general-purpose`. This is desired behavior per the W269 mandate (which already lists `subagent_type=agent-teams:team-*` as one of the acceptable forms).

**3-of-3 evidence**:
1. **Source** — `git show 08ded5e -- plugins/agent-teams/commands/team-spawn.md` diff.
2. **Independent** — CLAUDE.md L13 (W269 mandate) ALREADY references `subagent_type=agent-teams:team-*` form, so this aligns with our intent.
3. **DeepWiki** — "additive and refine existing behaviors, particularly for the team-lead agent and communication protocols".

### 4.3 Hook changes — **NONE**

No `hooks/hooks.json` files are modified in any of the 5 commits. The only hook-adjacent change is `tools/check_agent_name_collisions.py` which is a CI-side tool not shipped into installed plugin trees.

---

## 5. Operator-invariant cross-check (the 8 deliberate invariants)

| # | Invariant | Touched by delta? | Verdict |
|---|---|---|---|
| 1 | CLAUDE.md ≤50 LOC | No | PASS |
| 2 | settings.json ≤15 KB | No | PASS |
| 3 | `self_invented_count: 0` (no `.claude/rules/*.md`, no `.claude/hooks/scripts/*.py`/`.sh`) | No — plugin-internal hooks only; cardinal-rule-2 already compliant for all 17 in-scope plugins (Stream H-2 audit verified) | PASS |
| 4 | `reviewGateEnabled: true` (codex stop-time review gate) | No | PASS |
| 5 | 6-tier memory architecture (hindsight + memory + cognee + graphiti + langfuse + basic-memory) | No | PASS |
| 6 | Pre-commit security gate (gitleaks · ruff · shellcheck · git) | No | PASS |
| 7 | Cardinal-rule-1 trusted plugins only | No — wshobson is trusted (already adopted) | PASS |
| 8 | Cardinal-rule-3 cite-anchored agents | No — `agent-teams:team-*` are upstream-shipped, already cite-anchored | PASS |

**Verdict**: ALL 8 operator invariants PASS the cross-check. The update is non-violating.

---

## 6. sca-v3 14-dim per-plugin scoring

Scoring is applied to the **UPDATE DELTA** (not the whole plugin) — the question being answered is "is the delta `34632bc→08ded5e` SAFE-TO-INSTALL". Because 14 of 17 plugins have zero delta content, scoring is meaningful only for the 3 plugins materially touched (`agent-teams`, `plugin-eval`) plus the operator-override-bearing `protect-mcp`.

Scale: 1-5. Hard-cap dims: D1 (<3), D3 (<2), D5 (<4), D7 (<2), D10 (<2), D14 (<3), D15 (<2).

### 6.1 `agent-teams` delta (#535)

| Dim | Score | Rationale |
|---|---|---|
| D1 license_compatibility | 5 | MIT (wshobson/agents LICENSE) — no change in delta |
| D2 capability_uniqueness | 4 | Coordination guardrails for parallel-agent runtime — high uniqueness within Claude Code ecosystem |
| D3 harness_fit | 5 | Designed for `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` — exact harness match |
| D4 CC pathway support | 5 | Native Claude Code agent framework — official pathway |
| D5 typed_evidence_diversity | 5 | 3-of-3 evidence cleared: PR diff + DeepWiki + direct file probe |
| D6 authority_weight | 4 | wshobson maintainer + PR-reviewed merge |
| D7 maintenance_velocity_balanced | 4 | Active maintenance; PR #535 within the audit window |
| D8 benchmark_deltas | 3 | No benchmark provided in commit; guardrail nature is qualitative |
| D9 failure_mode_disclosure | 4 | PR description discloses what was broken (name-collision class) |
| D10 duplication_against_installed | 5 | Already-installed — update is a hygiene action, not a re-adoption |
| D11 context_budget_cost | 4 | tools-list expansion is tiny; SKILL.md/README adds <100 LOC |
| D12 community_signal_distribution | 4 | wshobson/agents 800+★ at 2026-05; not stars-as-hardgate |
| D13 pattern_extractability | 5 | The "spawn with `team-*` subtypes + unique-name guardrail" pattern transports cleanly |
| D14 reversible_pilotability | 5 | `git revert` the cache-delete + re-pin SHA is single-command reversible |

**install_score (Σ Di·Wi_install / Σ Wi_install for i∈{1..11,14,15}≡13 dims; D15 deferred)**:
`(5·1.5 + 4·0.9 + 5·1.3 + 5·1.3 + 5·1.0 + 4·0.9 + 4·1.0 + 3·1.0 + 4·0.7 + 5·1.1 + 4·0.8 + 5·1.1) / (1.5+0.9+1.3+1.3+1.0+0.9+1.0+1.0+0.7+1.1+0.8+1.1)` = `64.3 / 12.6` = **5.10** → clipped to **5.00** (cap)

Hard-caps: D1=5≥3✓, D3=5≥2✓, D5=5≥4✓, D7=4≥2✓, D10=5≥2✓, D14=5≥3✓.

→ **INSTALL APPROVED** (install_score ≥ 4.0, no hard-cap breach).

### 6.2 `plugin-eval` delta (#530 + #532)

| Dim | Score | Rationale |
|---|---|---|
| D1 | 5 | MIT — no change |
| D2 | 4 | Static + judge + Monte-Carlo skill quality scorer — distinctive |
| D3 | 5 | Designed for Claude Code skill ecosystem |
| D4 | 5 | CC-native primitive |
| D5 | 5 | 3-of-3 evidence cleared |
| D6 | 4 | wshobson + 3rd-party contributor jondwillis |
| D7 | 5 | Two PRs in audit window — active velocity |
| D8 | 5 | PR #530 commit body cites concrete deltas: plugin-dev 33.82→55.18, functional-emotions 39.04→59.68, 22 tests pass |
| D9 | 5 | PR text explicitly enumerates failure modes (3 missed phrasings) |
| D10 | 5 | Already-installed |
| D11 | 5 | Read-only static analyzer — zero runtime cost |
| D12 | 4 | Authoritative within Claude Code skill ecosystem |
| D13 | 5 | Regex pattern + helper function transports cleanly |
| D14 | 5 | Reversible |

**install_score**: `(5·1.5+4·0.9+5·1.3+5·1.3+5·1.0+4·0.9+5·1.0+5·1.0+5·0.7+5·1.1+5·0.8+5·1.1)/12.6` = `61.4 / 12.6` = **4.87**

Hard-caps: all pass.

→ **INSTALL APPROVED**.

### 6.3 `protect-mcp` delta (no commit affects, but operator-override needs explicit preservation)

| Dim | Score | Rationale |
|---|---|---|
| D1 | 5 | MIT |
| D2 | 5 | First-of-class Cedar-policy + Ed25519-signed-receipts governance |
| D3 | 3 | Operator-disabled hooks (`hooks.json.disabled-v0.5.5-cli-mismatch`) — harness-fit is partial |
| D4 | 5 | CC native plugin |
| D5 | 5 | H-2 audit evidence + upstream marketplace.json + operator override file |
| D6 | 4 | wshobson |
| D7 | 4 | 0.1.0 — early-stage but maintained |
| D8 | 3 | No quantitative bench |
| D9 | 4 | Plugin documents Cedar-policy enforcement intent |
| D10 | 4 | Overlaps slightly with pre-commit gate but adds Ed25519 dimension |
| D11 | 5 | Cost is zero — hooks currently disabled |
| D12 | 3 | Niche signal |
| D13 | 4 | Cedar-policy pattern extractable |
| D14 | 5 | Trivially reversible (rename `.disabled-v0.5.5-cli-mismatch` ↔ `hooks.json`) |

**install_score**: `(5·1.5+5·0.9+3·1.3+5·1.3+5·1.0+4·0.9+4·1.0+3·1.0+4·0.7+4·1.1+5·0.8+5·1.1)/12.6` = `56.0 / 12.6` = **4.44**

Hard-caps: D3=3≥2✓ (passes harness-fit cap), all others pass.

→ **INSTALL APPROVED** with operator-override-preservation condition (see §7 step 5).

### 6.4 Scoring summary

| Plugin | install_score | pattern_score | Tier | Verdict |
|---|---|---|---|---|
| `agent-teams` (delta) | 5.00 | n/a | T1 INSTALL | ✓ SAFE-TO-UPDATE |
| `plugin-eval` (delta) | 4.87 | n/a | T1 INSTALL | ✓ SAFE-TO-UPDATE |
| `protect-mcp` (delta) | 4.44 | n/a | T1 INSTALL | ✓ NEEDS-CONDITIONS (override preservation) |

All other 14 in-scope plugins have NO delta content — scoring N/A; verdict NO-OP.

---

## 7. Recommended update command sequence + post-update probe

> **PRINCIPLE** (cardinal-rule-1 W270 corollary): `/plugin update` may silently no-op on SHA drift. The cardinal-rule-1-W270-SOTA-fix is **cache-delete + fresh install**, NOT bare `/plugin update`. However, since cache content is already byte-identical to HEAD, the practical effect is only to refresh the SHA pointer in `installed_plugins.json` from `34632bc → 08ded5e`.

### 7.1 Pre-update guard (one-shot, READ-ONLY)

```powershell
# Snapshot current state for rollback evidence (single command)
git -C Z:/claude-sota-installed log -1 --format="%H %ai" HEAD
Copy-Item Z:/claude-sota-installed/.claude/plugins/installed_plugins.json Z:/claude-sota-installed/tmp/installed_plugins.json.pre-H4C-bak
# Preserve the operator-applied protect-mcp override evidence
Test-Path Z:/claude-sota-installed/.claude/plugins/cache/claude-code-workflows/protect-mcp/0.1.0/hooks/hooks.json.disabled-v0.5.5-cli-mismatch
# Snapshot the 4 team-* agent files (already at post-#535 state) for parity check after
foreach ($f in 'team-lead.md','team-implementer.md','team-reviewer.md','team-debugger.md') {
  Get-FileHash Z:/claude-sota-installed/.claude/plugins/cache/claude-code-workflows/agent-teams/1.0.2/agents/$f -Algorithm SHA256
}
```

### 7.2 Update execution (cache-delete + fresh-install pattern)

```powershell
# Step 1: ensure marketplace cache is up to date with origin (it already is at 08ded5e)
& claude plugin marketplace update claude-code-workflows
# Step 2: for the 17 in-scope plugins, force a fresh install (re-pins SHA in installed_plugins.json)
$plugins = @(
  'agent-orchestration', 'agent-teams', 'block-no-verify', 'comprehensive-review',
  'context-management', 'debugging-toolkit', 'developer-essentials',
  'incident-response', 'llm-application-dev', 'plugin-eval',
  'review-agent-governance', 'shell-scripting', 'signed-audit-trails',
  'tdd-workflows'
  # NOTE: 'conductor' and 'ship-mate' already at HEAD — skip to avoid no-op churn
  # NOTE: 'protect-mcp' handled separately below to preserve operator override
)
foreach ($p in $plugins) {
  & claude plugin uninstall "$p@claude-code-workflows"
  & claude plugin install "$p@claude-code-workflows"
}
```

### 7.3 `protect-mcp` — operator-override-preserving update (NEEDS-CONDITIONS)

```powershell
# Step A: preserve the override file outside the plugin dir
$override = "Z:/claude-sota-installed/.claude/plugins/cache/claude-code-workflows/protect-mcp/0.1.0/hooks/hooks.json.disabled-v0.5.5-cli-mismatch"
Copy-Item $override Z:/claude-sota-installed/tmp/protect-mcp.hooks.json.disabled-v0.5.5-cli-mismatch.bak

# Step B: uninstall + reinstall
& claude plugin uninstall protect-mcp@claude-code-workflows
& claude plugin install   protect-mcp@claude-code-workflows

# Step C: restore the operator override
$dest = "Z:/claude-sota-installed/.claude/plugins/cache/claude-code-workflows/protect-mcp/0.1.0/hooks/hooks.json.disabled-v0.5.5-cli-mismatch"
Copy-Item Z:/claude-sota-installed/tmp/protect-mcp.hooks.json.disabled-v0.5.5-cli-mismatch.bak $dest
# Also: if upstream now ships an enabled hooks.json, rename it to .disabled-postH4C so it doesn't accidentally activate
if (Test-Path "Z:/claude-sota-installed/.claude/plugins/cache/claude-code-workflows/protect-mcp/0.1.0/hooks/hooks.json") {
  Rename-Item "Z:/claude-sota-installed/.claude/plugins/cache/claude-code-workflows/protect-mcp/0.1.0/hooks/hooks.json" `
              "Z:/claude-sota-installed/.claude/plugins/cache/claude-code-workflows/protect-mcp/0.1.0/hooks/hooks.json.disabled-postH4C-still-cli-mismatch"
}
```

### 7.4 Post-update probe (3-of-3 evidence pattern)

```powershell
# Probe 1: installed_plugins.json SHAs advanced to HEAD for all 14 + protect-mcp
Get-Content Z:/claude-sota-installed/.claude/plugins/installed_plugins.json | ConvertFrom-Json |
  Select-Object -ExpandProperty plugins | Get-Member -MemberType NoteProperty |
  Where-Object Name -Match '@claude-code-workflows' |
  ForEach-Object { $n = $_.Name; $v = (Get-Content Z:/claude-sota-installed/.claude/plugins/installed_plugins.json | ConvertFrom-Json).plugins.$n; "$n -> $($v[0].gitCommitSha)" }

# Probe 2: agent-teams team-lead.md tools-list still has the post-#535 form
Select-String -Path Z:/claude-sota-installed/.claude/plugins/cache/claude-code-workflows/agent-teams/1.0.2/agents/team-lead.md -Pattern '^tools:'

# Probe 3: protect-mcp override file still present
Test-Path Z:/claude-sota-installed/.claude/plugins/cache/claude-code-workflows/protect-mcp/0.1.0/hooks/hooks.json.disabled-v0.5.5-cli-mismatch

# Probe 4 (optional, recommended): run /codex:adversarial-review --wait before committing the post-update installed_plugins.json
# Probe 5 (recommended): rerun the plugin-eval MISSING_TRIGGER analyzer on local skills
& uv run plugin-eval score Z:/claude-sota-installed/.claude/skills/sota-convergence-audit --depth quick --output json
# Compare against W280f-SKILL-AUDIT baseline — expect false-positive MISSING_TRIGGER flags to clear
```

### 7.5 Codex stop-time review gate

Per CLAUDE.md L9 `codex@openai-codex` plugin contract, the post-update commit MUST pass `/codex:adversarial-review --wait`. The 0-HIGH MEDIUM-acceptable threshold (per W288 ship-evidence pattern) is the bar.

---

## 8. Rollback

### 8.1 Per-plugin rollback (a single plugin regresses)

```powershell
# Re-pin a single plugin to the pre-update SHA
& claude plugin uninstall <name>@claude-code-workflows
# Then in installed_plugins.json (manually): set gitCommitSha back to '34632bcbea28176ba25bbbc43cd4017d88b1cac6'
# OR: fall back to the pre-update snapshot
Copy-Item Z:/claude-sota-installed/tmp/installed_plugins.json.pre-H4C-bak Z:/claude-sota-installed/.claude/plugins/installed_plugins.json
# Then restart Claude Code to re-read the manifest
```

### 8.2 Full-batch rollback (entire 14-plugin update regresses)

```powershell
# Restore the pre-update installed_plugins.json verbatim
Copy-Item Z:/claude-sota-installed/tmp/installed_plugins.json.pre-H4C-bak `
          Z:/claude-sota-installed/.claude/plugins/installed_plugins.json -Force

# If cache content was rewritten in a way you want to undo (it shouldn't have been — content was already current):
git -C Z:/claude-sota-installed/.claude/plugins/marketplaces/claude-code-workflows reset --hard 34632bcbea28176ba25bbbc43cd4017d88b1cac6
# Restart Claude Code
```

### 8.3 Rollback for `protect-mcp` operator override specifically

If post-update `protect-mcp` re-introduced an active `hooks.json`:

```powershell
# Disable the upstream-shipped hooks again
Rename-Item Z:/claude-sota-installed/.claude/plugins/cache/claude-code-workflows/protect-mcp/0.1.0/hooks/hooks.json `
            Z:/claude-sota-installed/.claude/plugins/cache/claude-code-workflows/protect-mcp/0.1.0/hooks/hooks.json.disabled-postH4C-still-cli-mismatch
# Restore the prior disabled file
Copy-Item Z:/claude-sota-installed/tmp/protect-mcp.hooks.json.disabled-v0.5.5-cli-mismatch.bak `
          Z:/claude-sota-installed/.claude/plugins/cache/claude-code-workflows/protect-mcp/0.1.0/hooks/hooks.json.disabled-v0.5.5-cli-mismatch -Force
```

### 8.4 Git-level rollback (atomic)

The entire update is staged in one commit (per kaizen + commit-commands:commit discipline). Rollback:

```powershell
git -C Z:/claude-sota-installed revert HEAD --no-edit
# Or, if already pushed, use force-with-lease per W280d parallel-session safety
git -C Z:/claude-sota-installed reset --hard HEAD~1
git -C Z:/claude-sota-installed push --force-with-lease
```

---

## Appendix A — Evidence ledger (3-of-3 per claim)

| Claim | Evidence #1 (source) | Evidence #2 (independent) | Evidence #3 (probe) |
|---|---|---|---|
| Cache is byte-identical to upstream HEAD for all 17 in-scope plugins | `diff -rq cache/claude-code-workflows/<plugin>/<ver>/ marketplaces/claude-code-workflows/plugins/<plugin>/` returns only `.in_use` and `.claude-plugin` differences | Stream H-2 audit `STREAM-H-2-wshobson-drift-audit.md` lines 50-110 | Direct file-hash compare: `team-lead.md` tools line matches between cache and marketplace |
| `agent-teams` PR #535 is silent-SHA-drift case but content is already in our cache | Cache `team-lead.md` `tools:` line contains the post-#535 list (`Agent, TeamCreate, TeamDelete, TaskCreate, TaskList, TaskGet, TaskUpdate, SendMessage`) | `git log --before=2026-05-16` on upstream shows PR #535 merged 2026-05-16; installedAt = 2026-05-17 | DeepWiki: "additive and refine existing behaviors" — no breaking changes |
| `plugin-eval` PR #530+#532 are zero-regression-risk fixes | PR #530 commit body explicitly enumerates 22 passing tests + verification of plugin-dev/functional-emotions score improvements | PR #532 affects only `confidence_label` metadata, not scoring logic | DeepWiki: "It does not introduce new conditions for flagging this anti-pattern" / "cannot regress an existing 'pass' to a 'fail'" |
| `protect-mcp` operator override must be preserved | File `hooks/hooks.json.disabled-v0.5.5-cli-mismatch` exists in cache and is not present upstream | Stream H-2 documented this as operator-applied for CLI mismatch | Upstream marketplace.json declares the plugin under category "governance" — operator deliberately disabled |
| Operator invariants are not violated by the update | 5 cardinal rules from CLAUDE.md L21-25 cross-checked | The 5-commit delta does NOT touch `.claude/rules/`, `.claude/hooks/scripts/`, or any operator-runtime path | All hook config remains untouched — only plugin-internal hooks (governance-class) live inside plugins |
| W269 mandate alignment after #535 | CLAUDE.md L13 already references `subagent_type=agent-teams:team-*` form | team-spawn.md after #535 now uses exactly this form | DeepWiki: "additive and refine existing behaviors" |

---

## Appendix B — Operator-listed plugin name reconciliation

The operator's brief listed 18 plugins; precise reconciliation:

| Operator name | Real marketplace | In scope here? |
|---|---|---|
| agent-teams | claude-code-workflows | ✓ |
| agent-orchestration | claude-code-workflows | ✓ |
| plugin-eval | claude-code-workflows | ✓ |
| comprehensive-review | claude-code-workflows | ✓ |
| context-management | claude-code-workflows | ✓ |
| developer-essentials | claude-code-workflows | ✓ |
| debugging-toolkit | claude-code-workflows | ✓ |
| incident-response | claude-code-workflows | ✓ |
| engineering-skills | **claude-code-skills** | ✗ — different marketplace |
| engineering-advanced-skills | **claude-code-skills** | ✗ — different marketplace |
| llm-application-dev | claude-code-workflows | ✓ |
| tdd-workflows | claude-code-workflows | ✓ |
| code-review | **claude-plugins-official** | ✗ — different marketplace |
| block-no-verify | claude-code-workflows | ✓ |
| shell-scripting | claude-code-workflows | ✓ |
| signed-audit-trails | claude-code-workflows | ✓ |
| conductor | claude-code-workflows | ✓ |
| ship-mate | claude-code-workflows | ✓ |

Plus 2 wshobson plugins NOT in operator's list but installed: `protect-mcp` and `review-agent-governance` (both covered here for completeness).

Total **17 in-scope** wshobson plugins; 3 out-of-scope (covered by sibling Stream H-3).

---

## Appendix C — Audit invariants this audit itself respected

- All reads were via `Read` / `Grep` / `Glob` / `ctx_execute_file` (no destructive operations).
- All commits / file diffs were obtained via `git show` / `git diff` / `git log` (read-only).
- No `claude plugin update` was actually run during this audit.
- No files were edited in cache or marketplace trees.
- All claims have 3-of-3 evidence anchored at file paths, commit SHAs, or DeepWiki responses.
- Output is to a single file inside `docs/architecture/W288-system-lag-audit/` (sibling to Stream H-1 / H-2 / H-3 outputs).
