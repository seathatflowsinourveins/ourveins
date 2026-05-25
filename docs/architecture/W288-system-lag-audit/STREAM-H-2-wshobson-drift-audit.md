# W288 Stream H-2 — wshobson/agents Plugin Drift Audit (2026-05-18)

## TL;DR

- **0 plugins drifted** (file-level diff: all 18 installed plugins are BIT-IDENTICAL to upstream HEAD `08ded5e` after stripping `.in_use` markers).
- **62 plugins available but not installed** (80 upstream local + 1 git-subdir = 81 total; we have 18).
- **0 plugins deprecated** upstream (DeepWiki confirm: no DEPRECATED.md, no retirement notices in README/CHANGELOG; CHANGELOG.md does not exist — version-bump history is the only freshness signal).
- **1 minor local override** (`protect-mcp@0.1.0/hooks/hooks.json` renamed to `hooks.json.disabled-v0.5.5-cli-mismatch` on our side — operator-applied, NOT upstream drift; rationale captured in the filename).
- **1 silent-SHA-drift class incident detected and self-mitigated**: upstream commit `08ded5e` (#535, 2026-05-16) modified `agent-teams` files without bumping `1.0.2` — our install snapshot at 2026-05-17 18:21 captured the post-commit content anyway, so no W270 silent-SHA drift exposure. Going forward this is a class-of-issue to monitor.

## Upstream HEAD audited

- **Repository**: `https://github.com/wshobson/agents` (alias of marketplace `claude-code-workflows`)
- **Marketplace cache path**: `Z:\claude-sota-installed\.claude\plugins\marketplaces\claude-code-workflows\`
- **HEAD SHA**: `08ded5e7b0fe57e7f40194775885eba539c3d8e7`
- **HEAD commit date**: `2026-05-16 20:46:39 -0400`
- **HEAD commit message**: `fix: agent teams coordination guardrails (#535)`
- **Marketplace version (root marketplace.json)**: `1.6.0`
- **Upstream plugin count**: 81 (80 local + 1 git-subdir `qa-orchestra`)
- **Counts banner (per upstream CLAUDE.md)**: 81 plugins / 185 agents / 153 skills / 100 commands
- **`git ls-remote origin HEAD` (independent network check)**: `08ded5e7b0fe57e7f40194775885eba539c3d8e7	HEAD` — matches local cache ✓
- **Method**: `git log` + recursive file-diff between `cache/claude-code-workflows/<plugin>/<ver>/` (installed snapshot) and `marketplaces/claude-code-workflows/plugins/<plugin>/` (upstream working tree at HEAD).

## Per-plugin drift table

All counts are `skills / agents / commands`. Drift column shows file-level diff result (excluding `.in_use` marker).

| Plugin | Installed ver | Upstream ver | Installed (s/a/c) | Upstream (s/a/c) | File-diff | Notes |
|---|---|---|---|---|---|---|
| agent-orchestration | 1.2.1 | 1.2.1 | 0/1/2 | 0/1/2 | OK | Identical |
| agent-teams | 1.0.2 | 1.0.2 | 6/4/7 | 6/4/7 | OK | Silent-SHA case: `#535` modified files without ver-bump; our snapshot post-dates the commit so we have latest content |
| block-no-verify | 1.0.0 | 1.0.0 | 1/0/1 | 1/0/1 | OK | Identical |
| comprehensive-review | 1.3.0 | 1.3.0 | 0/3/2 | 0/3/2 | OK | Identical |
| conductor | 1.2.1 | 1.2.1 | 3/1/6 | 3/1/6 | OK | Identical |
| context-management | 1.2.0 | 1.2.0 | 0/1/2 | 0/1/2 | OK | Identical |
| debugging-toolkit | 1.2.0 | 1.2.0 | 0/2/1 | 0/2/1 | OK | Identical |
| developer-essentials | 1.0.3 | 1.0.3 | 11/1/0 | 11/1/0 | OK | Identical |
| incident-response | 1.3.1 | 1.3.1 | 3/6/2 | 3/6/2 | OK | Identical |
| llm-application-dev | 2.0.5 | 2.0.5 | 8/3/3 | 8/3/3 | OK | Breaking change at 2.0.0 (LangChain 0.x→1.x); we are post-migration |
| plugin-eval | 0.1.0 | 0.1.0 | 1/2/3 | 1/2/3 | OK | Recent fix #530+#532 captured in our snapshot |
| protect-mcp | 0.1.0 | 0.1.0 | 1/2/2 | 1/2/2 | LOCAL OVERRIDE | `hooks/hooks.json` disabled locally (renamed `.disabled-v0.5.5-cli-mismatch`) — operator-applied for `npx protect-mcp@0.5.5` CLI mismatch; NOT upstream drift |
| qa-orchestra | 1.0.0 | 1.0.0 | 0/0/0 | 0/0/0 | OK | Empty shell (git-subdir external) |
| review-agent-governance | 0.1.0 | 0.1.0 | 1/1/2 | 1/1/2 | OK | Identical |
| shell-scripting | 1.2.2 | 1.2.2 | 3/2/0 | 3/2/0 | OK | Identical |
| ship-mate | 1.0.0 | 1.0.0 | 1/6/2 | 1/6/2 | OK | Identical |
| signed-audit-trails | 0.1.0 | 0.1.0 | 1/0/0 | 1/0/0 | OK | Identical |
| tdd-workflows | 1.3.0 | 1.3.0 | 0/2/4 | 0/2/4 | OK | Identical |

**Verdict**: zero version drift; zero content drift; one operator-applied local override (protect-mcp hook disable — documented in filename).

## New plugins available (not installed)

Of the 62 uninstalled, the SOTA-fit candidates for this runtime are below. Most of the other 47 are language-specific (`python-development`, `javascript-typescript`, `systems-programming`, `jvm-languages`, `julia-development`, `arm-cortex-microcontrollers`, `dotnet-contribution`, `web-scripting`, `functional-programming`, `game-development`) or domain-specific (`blockchain-web3`, `quantitative-trading`, `payment-processing`, `accessibility-compliance`, `seo-*`, `hr-legal-compliance`, `customer-sales-automation`, `content-marketing`, `business-analytics`, `startup-business-analyst`, `meigen-ai-design`, `brand-landingpage`, `ui-design`, `multi-platform-apps`, `frontend-mobile-development`, `frontend-mobile-security`, `c4-architecture`, `data-engineering`, `data-validation-suite`, `database-design`, `database-migrations`, `database-cloud-optimization`, `kubernetes-operations`, `cloud-infrastructure`, `cicd-automation`, `machine-learning-ops`, `reverse-engineering`, `unit-testing`, `documentation-standards`) — all of which fail the harness-fit check (this runtime is meta-infra, not a domain workload).

| Plugin | v | s/a/c | Fit | Recommend | Rationale |
|---|---|---|---|---|---|
| security-scanning | 1.3.1 | 5/2/3 | HIGH | **DEFER-LOW-PRIORITY** | SAST + dep-scan + OWASP + container security. Overlaps with our installed gitleaks pre-commit hook + `engineering-skills:senior-security`. Skill content (5 skills) might augment review-time SAST analysis. |
| code-refactoring | 1.2.0 | 0/2/3 | MED | **DEFER** | Already covered by `simplify` + `code-modernization:*` + `superpowers:executing-plans`. |
| full-stack-orchestration | 1.3.0 | 0/4/1 | LOW | **REJECT** | E2E feature pipeline w/ testing+security+perf+deploy — overlaps heavily with installed `agent-teams` + `superpowers:dispatching-parallel-agents` + `wshobson:incident-response` chain. |
| documentation-generation | 1.2.2 | 3/5/1 | LOW | **REJECT** | OpenAPI/Mermaid/tutorial generation — not a current bottleneck; this runtime's docs are hand-curated architecture markdown. |
| framework-migration | 1.3.1 | 4/2/3 | MED | **DEFER** | Already covered by `code-modernization:modernize-*` (assess/brief/extract-rules/harden/map/reimagine/transform). |
| code-documentation | 1.2.0 | 0/3/2 | LOW | **REJECT** | Doc generation focus — same rationale as `documentation-generation`. |
| observability-monitoring | 1.2.2 | 4/4/2 | LOW | **REJECT** | Production app observability (metrics/logs/traces/SLO) — not for meta-infra runtime; we use `langfuse` + `logfire` for LLM trace observability already. |
| api-scaffolding | 1.2.2 | 1/4/0 | LOW | **REJECT** | Production API scaffolding — out-of-scope for meta-infra runtime. |
| dependency-management | 1.2.0 | 0/1/1 | LOW | **REJECT** | Already covered by pre-commit security gate + `engineering-advanced-skills:dependency-auditor`. |
| git-pr-workflows | 1.3.0 | 0/1/3 | LOW | **REJECT** | Git/PR automation — already covered by `commit-commands:commit-push-pr` + `pr-review-toolkit:review-pr` + `everything-claude-code:git-workflow`. |
| team-collaboration | 1.2.0 | 0/1/2 | LOW | **REJECT** | Team/standup/issue workflows — single-operator runtime, no team. |
| error-debugging | 1.2.0 | 0/2/3 | LOW | **REJECT** | Already covered by installed `debugging-toolkit` + `superpowers:systematic-debugging`. |
| error-diagnostics | 1.2.0 | 0/2/3 | LOW | **REJECT** | Production error tracing — overlaps with `incident-response` already installed. |
| distributed-debugging | 1.2.0 | 0/2/1 | LOW | **REJECT** | Microservices tracing — no microservices in this runtime. |
| deployment-strategies | 1.2.0 | 0/2/0 | LOW | **REJECT** | Production deploy strategy — out-of-scope. |
| deployment-validation | 1.2.0 | 0/2/0 | LOW | **REJECT** | Pre-deploy checks — out-of-scope. |
| performance-testing-review | 1.2.1 | 1/2/0 | LOW | **REJECT** | Perf testing of production code — out-of-scope for meta-infra. |
| codebase-cleanup | 1.2.0 | 0/2/0 | LOW | **REJECT** | Overlaps `code-refactoring` (already DEFER). |
| api-testing-observability | 1.2.0 | 0/2/0 | LOW | **REJECT** | API test/mock/OpenAPI gen — out-of-scope. |
| application-performance | 1.3.0 | 0/4/1 | LOW | **REJECT** | App profiling/perf — out-of-scope. |
| backend-development | 1.3.1 | 0/3/0 | LOW | **REJECT** | Backend API design — out-of-scope. |
| backend-api-security | 1.2.0 | 0/2/0 | LOW | **REJECT** | API auth/authz/rate-limit — out-of-scope. |
| security-compliance | 1.2.0 | 1/2/0 | LOW | **REJECT** | SOC2/HIPAA/GDPR — out-of-scope for this runtime. |

**Plugins recently added upstream (since 2026-04-18, candidates for future evaluation)**:
- `brand-landingpage@1.0.0` (added 2026-05-11, PR #509) — Stitch-backed landing page — out-of-scope.
- `review-agent-governance@0.1.0` (added 2026-05-10, PR #495) — **ALREADY INSTALLED** ✓
- `ship-mate@1.0.0` (added 2026-05-11, PR #505) — **ALREADY INSTALLED** ✓
- `recsys-pipeline-architect` skill (added to `machine-learning-ops@1.2.1`, PR #533, 2026-05-16) — out-of-scope (recsys/feed-ranking is not this runtime's workload) but **noteworthy as a SOTA reference for "top-K-pipeline" pattern derived from xAI's open-sourced X For You algorithm**.
- `gemini-extension.json` + `GEMINI.md` (added 2026-05-13, PR #512) — Gemini CLI extension support exposing 150+ skills via Gemini's extension system. **Not relevant to our Claude-Code-only runtime** but signals upstream is multi-host.

**Net new install recommended: 0.** Every fit-relevant candidate either overlaps an already-installed plugin/skill (per ECC composition map) or is out-of-scope. The 47 language/domain plugins fail harness-fit because this runtime is meta-infra, not a workload.

## Deprecated upstream

**None.** Three-source convergence:
1. DeepWiki (`mcp__deepwiki__ask_question`): "no plugins explicitly marked as deprecated, retired, or superseded in the CHANGELOG, README, or repository docs."
2. Repository filesystem: no `DEPRECATED.md`, no `CHANGELOG.md` (only `README.md`).
3. Marketplace.json scan: no plugin has `deprecated:true` or `replacedBy:*` field; all 81 entries are active.

One semver breaking change historical note (not a deprecation): `llm-application-dev` 2.0.0 (Jan 2026) — LangChain 0.x → LangChain 1.x / LangGraph migration. We are post-migration at `2.0.5` and content matches upstream HEAD exactly.

## Quality-drift signals

Pattern improvements landed upstream since our last bulk install that we could mirror in our own local skills:

1. **`MISSING_TRIGGER` regex broadening (PR #530, plugin-eval@0.1.0)** — upstream's static-analyzer for skill front-matter now accepts more "Use when..." phrasings. Our 18 local operator-curated skills under `.claude/skills/<name>/SKILL.md` should be re-run through `uv run plugin-eval score` to catch any newly-flagged false-negatives (or, conversely, false-positives that are now passing). Tracked in our existing W259-v8 skill audit at `docs/architecture/W280f-SKILL-AUDIT-2026-05-17.md` (816 PASS / 2204 PARTIAL / 203 FAIL — re-run with the new regex would shift these counts).

2. **`plugin-level depth downgrades surfaced loudly` (PR #532, plugin-eval@0.1.0)** — the CLI/reporter now visibly flag when a skill scores below its declared depth tier (Platinum/Gold/Silver/Bronze). Useful for our adoption-audit workflow if we add plugin-eval into the `/codex:adversarial-review` chain at stop-time.

3. **Agent-teams coordination guardrails (PR #535, agent-teams@1.0.2 silent-SHA)** — `team-lead.md`, `team-implementer.md`, `team-debugger.md`, `team-reviewer.md`, `team-spawn.md`, `team-communication-protocols/SKILL.md`, `team-composition-patterns/SKILL.md`, and a new `references/agent-type-selection.md` all received post-bump fixes. Our install captured this content (snapshot date 2026-05-17 > commit date 2026-05-16), so we have it — but we should verify the W269 team-spawn mandate (CLAUDE.md line 9) still references the current preset list against the updated `team-spawn.md`.

4. **`recsys-pipeline-architect` skill front-matter (PR #533)** — exemplary modern wshobson skill front-matter: 1-line `description:` opening with a clear use-case + "Use when…" trigger list. Pattern to mirror in our local skills (most already comply per `sota-convergence-audit:rubric-v3 D7 "Use when" gating`).

5. **`hooks.json` schema migration to "current hooks array schema" (PR `02e77c5`, review-agent-governance@0.1.0)** — upstream is now using the array-of-objects hooks schema rather than legacy. Confirms our `.claude/settings.json` shape is on the current standard.

## Recommended actions

Ordered by impact (high→low) × risk (low→high). Each action carries 3-of-3 evidence per the postmortem hard rule.

### Action 1: Resolve protect-mcp hook disable (HIGH impact, LOW risk)

- **What**: investigate the `hooks/hooks.json.disabled-v0.5.5-cli-mismatch` state for `protect-mcp@0.1.0`. The plugin claims first-of-class Cedar-policy + Ed25519-signed-receipts governance — disabling its hooks defeats its entire value prop.
- **Evidence (3-of-3)**:
  1. **Source**: `Z:\claude-sota-installed\.claude\plugins\cache\claude-code-workflows\protect-mcp\0.1.0\hooks\hooks.json.disabled-v0.5.5-cli-mismatch` exists (the only file-level drift detected in the full audit).
  2. **Independent**: upstream marketplace.json:1028-1041 declares the plugin under category `governance` with claim "Cedar policy enforcement + Ed25519 signed receipts for every Claude Code tool call. First cryptographic governance plugin."
  3. **Maintainer intent**: PR `0ae6bca` upstream specifically pinned `protect-mcp@0.5.5` in hooks.json — this is the version our `.disabled` filename references. Upstream expects this hook live; our runtime has it disabled.
- **Next**: either (a) install/upgrade `protect-mcp` CLI on this machine to the version expected by the plugin, then rename `.disabled-v0.5.5-cli-mismatch` back to `hooks.json`; or (b) document this as a permanent harness-fit-reject decision in `docs/architecture/W288-system-lag-audit/STREAM-H-2-followup.md`. **Recommended path**: (b) — Cedar policy enforcement overlaps with our existing pre-commit gate + the codex stop-time review gate (`reviewGateEnabled:true`), making (a) low-marginal-value for a non-trivial CLI install footprint.

### Action 2: Re-run our local skill audit with PR #530 regex (MEDIUM impact, ZERO risk)

- **What**: re-run `uv run plugin-eval score .claude/skills/<name> --depth standard` for all 18 operator-curated local skills, with the marketplace cache at HEAD `08ded5e` (which has the broadened `MISSING_TRIGGER` regex). Compare to `docs/architecture/W280f-SKILL-AUDIT-2026-05-17.md` baseline.
- **Evidence (3-of-3)**:
  1. **Source**: PR #530 commit `112197c` modified `plugins/plugin-eval/src/plugin_eval/layers/static.py` to broaden the regex.
  2. **Independent**: PR #532 commit `83d70bc` added depth-downgrade reporter visibility — together with #530 these are the only plugin-eval changes since our last audit.
  3. **Maintainer intent**: PR title "broaden MISSING_TRIGGER pattern to match canonical phrasings" — explicitly improves false-negative rate on our class of skills (operator-curated, mixed-pedigree front-matter).
- **Next**: a single `for d in .claude/skills/*/; do uv run plugin-eval score "$d" --depth quick --output json; done` produces a delta to W280f. ZERO-risk because plugin-eval is read-only static analysis.

### Action 3: Cite-only adoption of `recsys-pipeline-architect` SKILL.md as a pattern reference (LOW impact, ZERO risk)

- **What**: in our `sota-convergence-audit` skill v3 rubric or in a CLAUDE.md pointer, cite `plugins/machine-learning-ops/skills/recsys-pipeline-architect/SKILL.md` as a SOTA reference for the "top-K-pipeline" pattern, citing it as derived from xAI's open-sourced X For You algorithm (Apache 2.0).
- **Evidence (3-of-3)**:
  1. **Source**: PR #533 commit `3e17b71` adds `plugins/machine-learning-ops/skills/recsys-pipeline-architect/SKILL.md` with explicit attribution: "popularized by xAI's open-sourced X For You algorithm" + "independent reimplementation of the pattern (MIT)".
  2. **Independent**: xAI's repo (`https://github.com/xai-org/x-algorithm`) is publicly accessible Apache-2.0, providing the upstream pattern.
  3. **Maintainer intent**: wshobson chose to encode this as a reusable "spec-and-scaffold" skill rather than ship as a one-off agent — signals it's intended for cross-domain reuse (RAG rerankers, task prioritizers, notification triage).
- **Next**: no install — cite-only in `docs/architecture/` notes; could be referenced if/when our runtime needs a memory-recall-top-K pipeline (relevant to T1 hindsight + T4 graphiti).

### Action 4: Periodic silent-SHA-drift monitor (MEDIUM impact, LOW risk)

- **What**: add a weekly check (manual or via existing eval-harness) that walks `cache/claude-code-workflows/<plugin>/<ver>/` and compares to `marketplaces/claude-code-workflows/plugins/<plugin>/` using `diff -rq`. The agent-teams case (PR #535 modified files without ver-bump) is a class-of-issue per CLAUDE.md cardinal-rule-1's W270 corollary ("standard `/plugin update` no-ops on silent SHA drift").
- **Evidence (3-of-3)**:
  1. **Source**: this audit detected the agent-teams 1.0.2-silent-SHA case via direct file-diff (passed by coincidence — our install snapshot post-dated the commit).
  2. **Independent**: CLAUDE.md line 21 explicitly calls out this risk: "cache-delete + fresh-install is the SOTA fix" — but our runtime has no automated detection.
  3. **Maintainer intent**: PR #535 fix message ("agent teams coordination guardrails") suggests important behavior change was shipped without a ver-bump, demonstrating the silent-SHA class is real for this marketplace.
- **Next**: add a 10-line PowerShell `tools/check-plugin-drift.ps1` that runs `git diff` between cache and marketplace working-tree, plus optionally `git fetch origin && git log <installed-snapshot-date>..HEAD -- plugins/<each-installed>` to flag any post-install upstream commits. Hook it into either the `verification-loop` Stop hook or a weekly `/loop` task. LOW risk because it's read-only diagnostics.

### Action 5: Defer all 47+ language/domain plugins (PERMANENT reject, ZERO risk)

- **What**: explicitly enumerate the harness-fit rejection of all 47 language/domain plugins (python-development through reverse-engineering — listed in §"New plugins available" above) to prevent repeat-evaluation cycles.
- **Evidence (3-of-3)**: covered inline in the per-plugin rationale column above; canonical example — `python-development` description claims "Modern Python development with Python 3.12+, Django, FastAPI" which is a workload-plugin not a meta-infra-plugin. Reject is the correct posture because (1) we're not shipping production Python apps from this runtime, (2) our `engineering-skills:senior-backend` covers this if needed, (3) installing all 47 would inflate plugin count from 62 to 109 with negligible value.
- **Next**: record in `docs/architecture/W280h-ADOPTION-VERDICT-*` style ledger so a future wave doesn't re-litigate.

---

**Audit conducted**: 2026-05-18 (W288 Stream H-2). **Method**: file-level `diff -rq` between installed snapshots and upstream working-tree at HEAD; `git log --since` for upstream activity; DeepWiki MCP for deprecation/intent cross-check. **3-of-3 evidence rule honored** on every drift/recommendation claim. **No plugin modifications performed** — investigation + recommendation only per the mission brief.
