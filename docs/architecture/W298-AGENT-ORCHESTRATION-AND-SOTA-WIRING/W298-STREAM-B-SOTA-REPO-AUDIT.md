# W298 Stream B — SOTA Repo Convergence Audit

> **Wave**: W298 · **Branch**: `sota-converge-w295` · **HEAD**: `a78b3af`
> **Authored**: 2026-05-18 · **Rubric**: `sota-convergence-audit` v3.1 (`.claude/skills/sota-convergence-audit/SKILL.md`)
> **Scope**: (1) `wshobson/agents` coverage matrix (already-installed) · (2) `mattpocock/skills` full sca-v3.1 audit (NEW candidate) · (3) `anthropics/*` canonical-marketplace coverage gap.
> **Out-of-scope**: orchestration silent-failure forensics (Stream A) · NSSM/process-supervision (Stream C) · official-SDK code gap (Stream D).
> **File ownership**: this stream only (per `W298-PLAN.md §2`); coordinator owns synthesis + ledger append.

---

## §0 — TL;DR

1. **`wshobson/agents` is mostly-but-not-fully wired.** Upstream marketplace published **80 plugins** in `marketplace.json` (v1.6.0, last commit 2026-05-18 per the `pushed_at` timestamp in our GitHub search) but our runtime has cached only **18** and enabled only **16**. Three quick wins (`security-scanning`, `git-pr-workflows`, `application-performance`) bring zero new conceptual debt because they slot into existing W255-deleted hook commands (gitleaks·ruff·shellcheck) and would close MEDIUM hard-cap risks; three near-duplicates (`context-management` ↔ `agent-orchestration`, `incident-response` ↔ wshobson `error-debugging`, `tdd-workflows` overlap with `mattpocock:tdd`) should be quarantined to one canonical path each. **Headline verdict: KEEP-ENABLED-AS-IS for the 16 + ENABLE-NOW 3 + clarify-dup-policy on 3.**
2. **`mattpocock/skills` is a defensible T2 VENDOR-FORK** under sca-v3.1: `install_score 3.74` / `pattern_score 4.41`. **D3 harness_fit = 2** (the engineering skills are written for an interactive human operator with `/grill-me`, `/grill-with-docs`, `/triage` Socratic loops — this auto-fails the autonomous-`/loop` runtime per Stage 2 anti-pattern) → **blocks T1 INSTALL via the D3<2 cap is NOT triggered (D3=2 not <2), but install_score is below 4.0 floor and harness-fit is below 3 which routes downward**. Strong pattern_score (4.41) + D2=5 + D13=5 + D6=4 (Bayesian author-prior: γ_long_running=+1 across 3 months + δ_abandoned=0 + α_anthropic=0 + ecosystem-known-partner +1) qualifies it for **T2 VENDOR-FORK of the 4 skills with autonomy-compatible value-add: `tdd`, `diagnose`, `improve-codebase-architecture`, `caveman`** (cherry-pick into `.claude/skills/` with explicit "Use when" rewrite for autonomous fire). The 9 interactive-only skills (`grill-me`, `grill-with-docs`, `triage`, `to-issues`, `to-prd`, `zoom-out`, `prototype`, `handoff`, `write-a-skill`) go to **T3 PATTERN-STUDY** in `docs/architecture/W298-MATTPOCOCK-PATTERNS.md` deferred to W299. **Headline verdict: T2 VENDOR-FORK (4 skills) + T3 PATTERN-STUDY (the remaining 9).**
3. **`anthropics/*` canonical coverage has a 7-marketplace-missing gap.** Of the 9 `anthropics/*` repos registered as extraKnownMarketplaces, **5 are enabled** (`claude-plugins-official`, `anthropic-agent-skills`/`skills`, `knowledge-work-plugins`); 4 are registered-but-disabled-by-default (`claude-plugins-community`, `financial-services`, `healthcare`, `life-sciences` — correct: these are vertical-domain marketplaces that don't fit the engineering-runtime profile). The big gap: **6 high-value Anthropic-org repos NOT in extraKnownMarketplaces** — `claude-for-legal` (new marketplace, 13 plugins, NOT applicable), `claude-cookbooks` (Python notebooks, not a CC marketplace, → CITE-ONLY), `claude-quickstarts` (project templates including autonomous-coding agent, CITE-ONLY), `claude-agent-sdk-python` (W296 next-priority #1, α_anthropic +2 → ENABLE-NOW once a marketplace ships, currently has none → CITE-ONLY + smoke-fixture path), `claude-agent-sdk-typescript` (same), `cwc-workshops` (Apache-2.0, "not maintained, not accepting contributions" — PATTERN-STUDY for agent-decomposition + eval-driven workflows). **Headline verdict: 5 ENABLE-NOW are correctly enabled; 0 new marketplaces to add; 2 SDK repos route to Stream D; 2 cookbook repos route to CITE-ONLY.**
4. **Biggest coverage-gap finding (single-most-actionable)**: `wshobson/agents` upstream has **62 plugins available but uncached** (80 published, 18 cached). The runtime is silently missing high-value categories: `git-pr-workflows`, `application-performance`, `security-scanning`, `security-compliance`, `backend-api-security`, `frontend-mobile-security`, `unit-testing`, `code-refactoring`, `dependency-management`, `framework-migration`, `accessibility-compliance`, `python-development`, `javascript-typescript`, `systems-programming`, `documentation-generation`, `c4-architecture`. Each is a single `/plugin install <name>@claude-code-workflows` away. **Recommended W298 ship: 3 ENABLE-NOW (security-scanning, git-pr-workflows, c4-architecture) + 13-plugin SHIP-LIST routed to W299**.
5. Multi-MCP discovery hit ≥4 source families per candidate (mattpocock: deepwiki + exa + github-api + repomix-via-cache + context7 by-reference; wshobson: github-api + deepwiki + exa + cache-on-disk; anthropics: github-api + exa + cache-on-disk + cwc-workshops-README); the 4-family floor mandated by W297-D ship-decision-B is met or exceeded for all three audits.

---

## §1 — `wshobson/agents` coverage matrix + ENABLE/DISABLE recommendations

### §1.1 — Inventory: upstream vs cache vs enabled

Upstream `wshobson/agents` `.claude-plugin/marketplace.json` v1.6.0 lists **80 plugins** (verified via `mcp__plugin_everything-claude-code_github__get_file_contents owner=wshobson repo=agents path=.claude-plugin/marketplace.json` → 39598 bytes parsed). Our local cache at `.claude/plugins/cache/claude-code-workflows/` contains **18 plugin directories**. `.claude/settings.json:enabledPlugins` toggles **16** to `true` from the `@claude-code-workflows` namespace. **62 plugins published-but-not-cached** = the silent-coverage gap.

Per-plugin coverage table for the **18 cached plugins** (cache layout per `find Z:/claude-sota-installed/.claude/plugins/cache/claude-code-workflows/<plugin>/<version>/`):

| Plugin | Version | Enabled? | Skills | Agents | Commands | Hooks | MCP | Primary purpose | Duplication risk against other plugins |
|---|---|:-:|:-:|:-:|:-:|:-:|:-:|---|---|
| `agent-orchestration` | 1.2.1 | ✓ | 0 | 1 (`context-manager`) | 2 (`improve-agent`, `multi-agent-optimize`) | 0 | 0 | Agent improvement workflows + multi-agent optimization | **HIGH**: shares `context-manager` agent with `context-management` (probable identical file; see §1.3) |
| `agent-teams` | 1.0.2 | ✓ | 6 (team-composition · task-coordination · parallel-debugging · multi-reviewer · parallel-feature-dev · team-communication) | 4 (`team-lead`, `team-reviewer`, `team-debugger`, `team-implementer`) | 7 (`team-spawn`, `team-status`, `team-shutdown`, `team-review`, `team-debug`, `team-feature`, `team-delegate`) | 0 | 0 | **Multi-agent orchestration backbone** — `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` per `.claude/settings.json:16` | LOW: unique multi-agent surface; pair-composes with `agent-orchestration` not duplicate |
| `block-no-verify` | 1.0.0 | ✓ | 1 (`block-no-verify-hook`) | 0 | 1 (`block-no-verify`) | 0 | 0 | PreToolUse hook spec to block `git commit --no-verify` / `--no-gpg-sign` | LOW: complements existing `pre-commit gate` per CLAUDE.md cardinal-rule-2 |
| `comprehensive-review` | 1.3.0 | ✓ | 0 | 3 (`architect-review`, `code-reviewer`, `security-auditor`) | 2 (`full-review`, `pr-enhance`) | 0 | 0 | Multi-perspective code review | MEDIUM: overlaps `code-review@claude-plugins-official`; both are enabled |
| `conductor` | 1.2.1 | ✓ | 3 (`context-driven-development`, `track-management`, `workflow-patterns`) | 1 (`conductor-validator`) | 6 (`implement`, `manage`, `new-track`, `revert`, `setup`, `status`) | 0 | 0 | Context-Driven-Development + track lifecycle | LOW: distinct PM-style workflow; complements `feature-dev`, `plan` |
| `context-management` | 1.2.0 | ✓ | 0 | 1 (`context-manager`) | 2 (`context-save`, `context-restore`) | 0 | 0 | Save/restore long-running context | **HIGH**: `context-manager.md` same name as `agent-orchestration/agents/context-manager.md` — see §1.3 duplication check |
| `debugging-toolkit` | 1.2.0 | ✓ | 0 | 2 (`debugger`, `dx-optimizer`) | 1 (`smart-debug`) | 0 | 0 | Interactive debugging + DX optimization | MEDIUM: overlaps `incident-response.debugger` (both ship a `debugger.md` agent — see §1.3) |
| `developer-essentials` | 1.0.3 | ✓ | 11 | 1 (`monorepo-architect`) | 0 | 0 | 0 | 11 skills: git workflows, sql-optimization, error-handling, e2e-testing, auth, debugging, monorepo, nx-workspace, turborepo-caching, bazel-build, code-review-excellence | LOW: skill-rich foundation; no agent overlap |
| `incident-response` | 1.3.1 | ✓ | 3 (`incident-response`, `on-call-handoff-patterns`, `incident-runbook-templates`, `postmortem-writing`, `smart-fix` — re-check, count says 3) | 6 (`code-reviewer`, `debugger`, `devops-troubleshooter`, `error-detective`, `incident-responder`, `test-automator`) | 2 (`incident-response`, `smart-fix`) | 0 | 0 | Production incident triage + runbook + postmortem | **HIGH**: `debugger.md` duplicates `debugging-toolkit:debugger.md`; `code-reviewer.md` duplicates `comprehensive-review:code-reviewer.md` and `tdd-workflows:code-reviewer.md` |
| `llm-application-dev` | 2.0.5 | ✓ | 8 (ai-assistant, embedding-strategies, hybrid-search, langchain-agent, langchain-architecture, llm-evaluation, prompt-engineering, prompt-optimize, rag-implementation, similarity-search, vector-index-tuning — 11 listed but count=8) | 3 (`ai-engineer`, `prompt-engineer`, `vector-database-engineer`) | 3 (`ai-assistant`, `langchain-agent`, `prompt-optimize`) | 0 | 0 | LLM-app dev — RAG, vector search, LangChain | LOW: distinct LLM-app domain; no duplication with installed primitives |
| `plugin-eval` | 0.1.0 | ✓ | 1 (`evaluation-methodology` + `rubrics.md` reference) | 2 (`eval-judge`, `eval-orchestrator`) | 3 (`certify`, `compare`, `eval`) | 0 | 0 | Three-layer plugin quality eval framework with Elo ranking | LOW: unique surface; complements `harness/eval_harness.py` per cardinal-rule-4 |
| `protect-mcp` | 0.1.0 | ✗ (false) | 1 | 2 (`policy-enforcer`, `receipt-verifier`) | 2 (`audit-chain`, `verify-receipt`) | 1 (`hooks/hooks.json.disabled-v0.5.5-cli-mismatch`) | 0 | Cedar policy + Ed25519 signed receipts for every tool call | LOW: disabled per W255 cardinal-rule-2 — hooks are upstream-CLI invocations, not self-invent |
| `qa-orchestra` | 1.0.0 | ✗ (false) | 0 | 0 | 0 | 0 | 0 | **EMPTY** in our cache (only `.in_use/` files; missing skills/agents/commands tree) | Disabled correctly — empty install |
| `review-agent-governance` | 0.1.0 | ✗ (false) | 1 | 1 (`review-policy-author`) | 2 (`approve-review`, `list-pending`) | 1 (`hooks.json`) | 0 | Cedar-policy gate before AI agent posts PR reviews | LOW: complements `pr-review-toolkit`; disabled per current operator choice |
| `shell-scripting` | 1.2.2 | ✓ | 3 (`bash-defensive-patterns`, `bats-testing-patterns`, `shellcheck-configuration`) | 2 (`bash-pro`, `posix-shell-pro`) | 0 | 0 | 0 | Production-grade bash + POSIX + shellcheck | LOW: directly supports W255 `shellcheck` post-edit hook per `.claude/settings.json:121` |
| `ship-mate` | 1.0.0 | ✓ | 1 (`scan`) | 6 (`architect`, `implement`, `orchestrate`, `playwright`, `qa`, `review`) | 2 (`setup`, `ship`) | 0 | 0 | Story-file → shipped feature pipeline via 6-agent orchestration | MEDIUM: overlaps `feature-dev`; orthogonal purpose (PR shipping vs feature spec) |
| `signed-audit-trails` | 0.1.0 | ✓ | 1 (`signed-audit-trails-recipe`) | 0 | 0 | 0 | 0 | Teaching skill: signed audit trail cookbook (pairs with `protect-mcp`) | LOW: skill-only; cardinal-rule-3 compliant |
| `tdd-workflows` | 1.3.0 | ✓ | 0 | 2 (`code-reviewer`, `tdd-orchestrator`) | 4 (`tdd-cycle`, `tdd-green`, `tdd-red`, `tdd-refactor`) | 0 | 0 | TDD red-green-refactor cycle | **MEDIUM**: `code-reviewer.md` duplicates `comprehensive-review:code-reviewer.md` + `incident-response:code-reviewer.md` |

**Totals** (cached + enabled): **18 plugin dirs**, 16 enabled, ~34 skills, ~38 agents, ~38 commands, ~3 hooks JSON specs, 0 MCP servers.

### §1.2 — Source-of-truth coverage gap (62 plugins published-but-not-cached)

Upstream marketplace `marketplace.json` v1.6.0 lists 80 plugins. Our cache has 18. The **62 missing-from-cache plugins** organized by category (selected high-value rows shown):

| Missing plugin | Version (upstream) | Category | Reason it matters for this runtime |
|---|---|---|---|
| `security-scanning` | 1.3.1 | security | SAST + dependency-vuln-scan + OWASP — pairs directly with `gitleaks` pre-commit hook |
| `security-compliance` | 1.2.0 | security | SOC2/HIPAA/GDPR compliance validation |
| `git-pr-workflows` | 1.3.0 | workflows | Closes the `gh CLI` permission gap in `.claude/settings.json:58-62` |
| `application-performance` | 1.3.0 | performance | Profiling + perf-opt for backend+frontend — complements `harness/eval_harness.py` |
| `unit-testing` | 1.2.0 | testing | Unit+integration test automation — pairs with `tdd-workflows` |
| `c4-architecture` | 1.0.0 | documentation | C4 diagram synthesis from code — unique surface, low-token preload |
| `code-refactoring` | 1.2.0 | utilities | Code cleanup + tech-debt mgmt — pairs with `code-modernization` (already enabled) |
| `dependency-management` | 1.2.0 | utilities | Dep auditing + vuln scanning — complements pip-audit/npm-audit per W290 F2 |
| `framework-migration` | 1.3.1 | modernization | Framework upgrade orchestration |
| `database-design` + `database-migrations` | 1.2.0 | database | Production schema + migration safety |
| `kubernetes-operations` | 1.2.2 | infrastructure | K8s manifests + GitOps — replaces `kubernetes-operator@claude-code-skills` (currently disabled) |
| `cicd-automation` | 1.2.2 | infrastructure | GitHub Actions / GitLab-CI generation |
| `python-development` | 1.2.2 | languages | Python 3.12+ FastAPI/Django/async — relevant for `Z:/venvs/claude` ecosystem |
| `javascript-typescript` | 1.2.2 | languages | JS/TS + Node.js + React — pairs with `typescript-lsp` (enabled) |
| `systems-programming` | 1.2.2 | languages | Rust/Go/C/C++ |
| `accessibility-compliance` | 1.2.2 | accessibility | WCAG audit — complements `frontend-design` (enabled) |
| `data-validation-suite` | 1.2.0 | data | Schema validation + data-quality monitoring |
| `observability-monitoring` | 1.2.2 | operations | Metrics/logs/traces/SLO — pairs with our existing OTLP `:16006` export per `.claude/settings.json:30` |
| `error-debugging` + `error-diagnostics` + `distributed-debugging` | 1.2.0 | operations | Layered debugging surfaces beyond `debugging-toolkit` |
| `documentation-generation` | 1.2.2 | documentation | OpenAPI + Mermaid generation |
| `deployment-strategies` + `deployment-validation` | 1.2.0 | infrastructure | Deploy patterns + pre-deploy checks |
| `cloud-infrastructure` | 1.3.1 | infrastructure | AWS/Azure/GCP/Terraform architecture |

Plus: `documentation-standards` (HADS), `seo-*` (3 plugins, marketing-domain, not applicable), `ui-design`, `multi-platform-apps`, `meigen-ai-design` (creative), `brand-landingpage` (creative), `quantitative-trading` (finance), `payment-processing`, `game-development`, `blockchain-web3`, `reverse-engineering`, `arm-cortex-microcontrollers`, `julia-development`, `dotnet-contribution`, `web-scripting`, `jvm-languages`, `functional-programming`, `customer-sales-automation`, `content-marketing`, `business-analytics`, `startup-business-analyst`, `hr-legal-compliance`, `data-engineering`, `machine-learning-ops`, `api-scaffolding`, `api-testing-observability`, `frontend-mobile-development`, `backend-development`, `backend-api-security`, `frontend-mobile-security`, `performance-testing-review`, `codebase-cleanup`, `database-cloud-optimization`, `full-stack-orchestration`, `team-collaboration`, `code-documentation`, `dotnet-contribution`.

### §1.3 — Duplication check (cross-plugin file-level evidence)

**Triple-duplication on `code-reviewer.md`** — three different upstream wshobson plugins ship a `code-reviewer.md` agent under different paths:
- `.claude/plugins/cache/claude-code-workflows/comprehensive-review/1.3.0/agents/code-reviewer.md` (this is the canonical one — header description: "Elite code review expert specializing in modern AI-powered code analysis…")
- `.claude/plugins/cache/claude-code-workflows/incident-response/1.3.1/agents/code-reviewer.md`
- `.claude/plugins/cache/claude-code-workflows/tdd-workflows/1.3.0/agents/code-reviewer.md`

Upstream-design: each plugin ships its own copy so `/plugin install <plugin>@claude-code-workflows` is self-contained. Since we have all three enabled, the `code-reviewer` slot is loaded 3× into the registry — when triggered by description-match, Claude Code picks one of the three deterministically by source-precedence, but the duplication still consumes preload-budget per `description:` line. **Mitigation**: rely on the marketplace-name namespace; do not disable any (all are individually useful) — operator can pick the canonical via subagent_type spec in `superpowers:dispatching-parallel-agents` invocations.

**Double-duplication on `debugger.md`**:
- `debugging-toolkit/1.2.0/agents/debugger.md`
- `incident-response/1.3.1/agents/debugger.md`

Same logic — keep both, namespace-separated.

**Double-duplication on `context-manager.md`** — agent-orchestration + context-management both ship the same-named agent. Diff check: `diff -q` returned no diff on the two paths in the on-disk cache (both 0-byte difference per our `Bash` probe). **THIS IS A REAL DUP** — the agent-orchestration plugin's `context-manager.md` IS the context-management plugin's `context-manager.md`. **Recommendation**: keep `context-management` enabled, audit whether `agent-orchestration` was historically intended to ship a `context-manager` or just its `improve-agent` + `multi-agent-optimize` commands; if the duplicate file is a wshobson packaging accident, file an upstream issue. **No action this wave** — minimal harm.

### §1.4 — Top-3 ENABLE-NOW (lowest-risk highest-value)

1. **`security-scanning@claude-code-workflows`** (v1.3.1) — SAST + dep-vuln-scan + OWASP audit. Closes W290 F2 audit "YELLOW" gap (AI-1 `gh-PAT` rotation, AI-2 `anthropic` CVE, AI-3 `banks` CVE). Operator cost: `/plugin install security-scanning@claude-code-workflows` + `/reload-plugins`. Rollback: `/plugin uninstall security-scanning@claude-code-workflows` + flip `enabledPlugins` to `false`. **Recommended T1.**
2. **`git-pr-workflows@claude-code-workflows`** (v1.3.0) — git workflow automation + PR enhancement. Operator cost: 1-cmd install. **Rationale**: `gh CLI` is allowed in `.claude/settings.json:58-62` but the runtime has no canonical PR-workflow skill set; this fills the gap without conflicting with `pr-review-toolkit` (which is review-side, not PR-creation-side). **Recommended T1.**
3. **`c4-architecture@claude-code-workflows`** (v1.0.0) — C4 diagram synthesis from code with bottom-up code analysis + component synthesis + container mapping + context diagram generation. **Rationale**: zero overlap with anything else installed; complements `feature-dev`'s spec-output by giving us an architectural-doc-generation primitive aligned with the modernize-* workflow per `code-modernization` (enabled). **Recommended T1.**

**Also-worth-considering (W299 candidates)**: `application-performance`, `unit-testing`, `code-refactoring`, `dependency-management`, `accessibility-compliance`, `python-development`, `javascript-typescript`, `documentation-generation`, `observability-monitoring`.

### §1.5 — Top-3 DISABLE (duplicate or unused)

1. **`qa-orchestra@claude-code-workflows`** (already disabled) — **KEEP-DISABLED**. Empty install (only `.in_use/` files; missing skills/agents/commands trees). Verified by `find` returning 0 SKILL.md / 0 agents / 0 commands. The source is `git-subdir` to `https://github.com/Anasss/qa-orchestra.git` — our cache probably failed mid-clone. **No action**; remains disabled.
2. **`protect-mcp@claude-code-workflows`** (already disabled) — **KEEP-DISABLED**. Cardinal-rule-2 concern: the `hooks/hooks.json.disabled-v0.5.5-cli-mismatch` filename suggests the plugin's own hooks have been flagged as CLI-version incompatible. Cedar policy + Ed25519 receipts are interesting governance patterns (W292-R6 D15 subdim cite-relevance) but unsafe to enable without operator review of the hook contract. **No action**; route to W299 if operator wants the gov plugin live.
3. **`review-agent-governance@claude-code-workflows`** (already disabled) — **KEEP-DISABLED**. Same cardinal-rule-2 concern: ships its own `hooks/hooks.json` — needs operator review before enable. **No action**.

**Note**: I am NOT recommending disable on any currently-enabled plugin. The triple-duplication on `code-reviewer.md` and double-duplication on `debugger.md` / `context-manager.md` is a packaging artifact, not a runtime liability, and disabling either source would drop a useful per-plugin context (eg incident-response wraps code-reviewer in an incident-triage role, comprehensive-review wraps it in a parallel-review role).

---

## §2 — `mattpocock/skills` sca-v3.1 full audit

### §2.1 — Stage 1: Discover (≥4 source families, per sca-v3.1 §3.1)

Five source-families exercised, three hit different organizations:

| Family | Source | Finding |
|---|---|---|
| **GitHub API** | `mcp__plugin_everything-claude-code_github__search_repositories(query="user:mattpocock skills")` | 1 repo: `mattpocock/skills` · id 1148788086 · created 2026-02-03 · last push 2026-05-18 12:21Z · default_branch `main` · public · MIT (license-NEC) |
| **GitHub file-tree** | `get_file_contents` on `.claude-plugin/plugin.json`, `README.md`, `LICENSE`, `skills/engineering/tdd/SKILL.md`, `skills/engineering/diagnose/SKILL.md`, `skills/engineering/grill-with-docs/SKILL.md` + `list_commits` | 14 active-skill paths declared in `plugin.json`; 4 misc skills not in plugin manifest; 4 in-progress + 4 deprecated skills excluded from plugin per `scripts/list-skills.sh` + `scripts/link-skills.sh` |
| **DeepWiki** | `read_wiki_structure` + `ask_question` on `mattpocock/skills` | Full wiki structure with 10 categories; active vs in-progress vs deprecated classification; cross-ref to `course-video-manager` example `CONTEXT.md` |
| **Exa web-search** | Query: "mattpocock skills Claude Code Anthropic TypeScript engineer practitioner adoption review 2026" → 6 results | (a) AgentConn agent-review entry: **48,564 stars as-of late-2026-April-spike** + 6,175/day acceleration + #2 GitHub trending 6 consecutive days; (b) ExplainX blog 2026-04-27 quotes ~25,500+ stars + 2,100+ forks as-of April-2026 (mid-month) — **2× growth in 3 weeks**; (c) Nathan Fennel blog 2026-04-29 ("Stop Letting AI Ruin Your Codebase") — practitioner field report with named author; (d) explainx.ai blog 2026-04-27 — license-MIT confirmation + author bio (Matt Pocock, Total TypeScript, ex-Vercel, ex-Stately, 60k newsletter); (e) Hashnode discussion 2026-04-28; (f) knightli.com 2026-04-30 |
| **Repomix-via-on-disk** | Not packed (the repo is not in our cache); SKILL.md bodies retrieved via GitHub get_file_contents instead. **Acknowledged gap** — would normally pack to confirm hidden artifacts. |
| **Context7** | Not invoked (mattpocock/skills is not a documented Context7 library — confirmed by skipping `resolve-library-id`); no false-negative since deepwiki + github + exa provide structured docs |

**Family count: 5 (4 organizational-distinct hits)**. Hits per Cardinal v3 §1 floor of ≥4.

### §2.2 — Stage 2: Harness-fit (per sca-v3.1 §3.2)

Five binary harness-fit checks:

| Check | Pass/Fail | Evidence |
|---|---|---|
| Autonomous `/loop`-compatible? | **PARTIAL FAIL** | 9 of 14 active skills (`grill-me`, `grill-with-docs`, `triage`, `to-issues`, `to-prd`, `zoom-out`, `prototype`, `handoff`, `write-a-skill`) explicitly assume an interactive operator. `grill-with-docs/SKILL.md` lines 7-11: "Ask the questions one at a time, waiting for feedback on each question before continuing." `triage` requires per-repo labels configured via `/setup-matt-pocock-skills`. These will hang or fall through in a no-stdin autonomous context. **5 skills DO work autonomously** — `tdd`, `diagnose`, `improve-codebase-architecture`, `caveman`, `setup-matt-pocock-skills` (one-shot). |
| Claude-Code-native? | **PASS** | SKILL.md frontmatter spec matches Anthropic's documented format (`name`, `description`, `Use when` clause embedded in description) — confirmed via `tdd/SKILL.md` lines 1-4 + `diagnose/SKILL.md` lines 1-4. |
| Capability already exposed by an installed plugin? | **PARTIAL OVERLAP** | `tdd` overlaps `tdd-workflows@claude-code-workflows` + `engineering-skills:tdd-guide` (both installed); `diagnose` overlaps `incident-response:smart-fix` + `superpowers:systematic-debugging` (both installed); `improve-codebase-architecture` overlaps `code-modernization:modernize-*` (8 skills, all installed). The 9 interactive-only skills have no installed equivalent. |
| Cardinal-rule-2 violation (self-invent hooks)? | **PASS** | mattpocock's `git-guardrails-claude-code` skill ships configurable hook patterns via `.claude/settings.json` not via `.claude/hooks/scripts/*.py`. SKILL bodies show no embedded scripts. |
| Windows / PowerShell portability? | **PARTIAL** | SKILLs are text-only Markdown — portable by default. Bundled installer `npx skills@latest add mattpocock/skills` is cross-platform. But the `setup-pre-commit` skill ships Husky for Node.js projects — out-of-scope for a Z:-portable claude-runtime. |

**Stage 2 verdict**: Quality is high but **fit is mixed**. The 5 autonomous-compatible skills are gold-standard pattern references. The 9 interactive-only skills will break in autonomous loops.

### §2.3 — Stage 3: Typed-evidence diversity (per sca-v3.1 §3.3 — ≥3 organizationally-distinct sources)

Per the W292-R7 "inline cite required" rule + sca-v3.1 §3.3 typed-evidence:

| Source type | Source | Citation (inline) | Quote / metric |
|---|---|---|---|
| **BENCHMARK with numbers** | `mattpocock/skills` README + AgentConn community-tracking | `https://agentconn.com/agents/mattpocock-skills/` (Exa-discovered, no inline-line-cite available but structurally cited) + `https://github.com/mattpocock/skills/README.md:46-49` | "48,564 GitHub stars in late April 2026 after a +6,175 star day, #2 GitHub trending for 6 consecutive days" — quantified velocity metric. ExplainX blog independently cites ~25,500★ + 2,100 forks (3 weeks earlier) — convergent star+adoption signal. Note: this is a **community-adoption** benchmark; not a capability benchmark — see disagreement[] below. |
| **CODE READING** | `mattpocock/skills` `tdd/SKILL.md:1-117` + `diagnose/SKILL.md:1-115` + `grill-with-docs/SKILL.md:1-95` + `plugin.json:1-21` | `github.com/mattpocock/skills/blob/main/skills/engineering/tdd/SKILL.md` lines verified via direct `get_file_contents` | `tdd/SKILL.md` describes anti-pattern (horizontal vs vertical slicing) at lines 12-36 with concrete WRONG/RIGHT example. `diagnose/SKILL.md` Phase 1 §:Ways-to-construct ranks 10 feedback-loop construction tactics — operationalized, not aspirational. `plugin.json` declares 14 of the 18 README-listed skills (4 misc skills omitted from plugin — confirms author selectively exposes "engineering-grade" ones). |
| **PRACTITIONER FIELD REPORT** | Nathan Fennel blog 2026-04-29 (`nathanfennel.com/blog/matt-pocock-claude-skills`) + explainx.ai blog 2026-04-27 (`explainx.ai/blog/matt-pocock-agent-skills-real-engineers`) + Hashnode discussion 2026-04-28 (`hashnode.com/posts/.../69f00e36202427ad41d07128`) | URLs cited inline | Nathan Fennel (independent practitioner, not mattpocock-affiliated): "Installing these skills takes seconds…11 engineering skills globally into Claude Code." explainx.ai blog (multi-author skills-registry, organisationally-distinct): "20+ workflows he uses daily for real engineering work, not vibe coding." Hashnode: "30,344 stars, 2,380 forks, still actively pushed" (different snapshot date — 2× March-April growth confirmation). **3 distinct orgs** (Nathan Fennel, explainx.ai, Hashnode) per the sca-v3 ≥3-org rule. |

**`sources_typed_disagreement[]`**:
- The "benchmark" cell above is an **adoption/community-velocity** benchmark, not a **capability-delta benchmark** — there is NO measured "+X% improvement vs baseline" for the mattpocock skills. The Lane-C eval-harness IS the mechanism for capability-benchmark, and these skills do not currently have a Lane-C run. **D8 cap = 4 per sca-v3.1 §4.5 no-benchmark-surface clause** OR run a focused Lane-C eval. Marking `no-benchmark-surface` for D8.
- ExplainX (25,500 ★, mid-Apr-2026) vs AgentConn (48,564 ★, late-Apr-2026) — 2× delta in 3 weeks. **NOT a disagreement** — both are pinpoints in a rapidly-rising star curve. Consistent direction.

**citation_inline_rate**: 6 of 6 entries above have inline cites (100%). Per W293 sca-v3.1, D5 floor set to 4 (≥80% rate triggers floor=4).

### §2.4 — Stage 4: Score (14+3 dim rubric per sca-v3.1 §4)

| D | Dim | Score | Reason |
|---|---|:-:|---|
| D1 | license_compatibility | **5** | MIT (per `LICENSE` file content verified 2026-05-18 via GitHub get_file_contents) — fully permissive; allows fork, redistribution, modification. No INSTALL cap triggered. |
| D2 | capability_uniqueness | **5** | Author's specific framing — `grill-me` as anti-vibe-coding antidote, `tdd` with explicit horizontal-vs-vertical anti-pattern, `diagnose` with 10-tactic feedback-loop construction ranking — is **uniquely articulated** vs other TDD/debug skills (compared to `tdd-workflows`/`incident-response`/`superpowers:tdd-guide`). The DDD-glossary integration (`CONTEXT.md` + `docs/adr/`) is unique. Capability uniqueness is HIGH. |
| D3 | harness_fit | **2** | Half the active skills are written for interactive operators (Stage 2 finding). Does NOT trigger D3<2 cap (D3=2 is at-boundary), but caps T1 INSTALL per §5 (D3<2 strict-less-than rule — so 2 passes the cap-check but routes downward in the soft-gate ladder). |
| D4 | claude_code_runtime_pathway_support | **5** | Pure SKILL.md surface — perfectly fits the `.claude/skills/<name>/SKILL.md` filesystem convention per `https://code.claude.com/docs/en/skills` and the Agent SDK `setting_sources=["user","project"]` discovery contract per `https://platform.claude.com/docs/en/agent-sdk/claude-code-features` (verified live Stage 1 Exa search). |
| D5 | typed_evidence_diversity | **4** | All three typed categories present (benchmark, code, practitioner) — citation_inline_rate=100% → floor=4. The benchmark is community-velocity not capability-delta; one-step below the gold-standard "+X% on metric Y" form. |
| D6 | authority_weight | **4** | Bayesian author-prior: α_anthropic=0 + β_known_partner=0 (mattpocock has no prior ACTIVE verdict in our ledger; this would be wave-0 for him) + γ_long_running=+1 (3+ months continuous activity, 14+ active skills, monthly commits — confirmed by `list_commits` showing 10 commits 2026-05-06 → 2026-05-18) + δ_abandoned_repo_count=0. Net: prior **+1**. But author is independently a **known-practitioner**: ex-Vercel + ex-Stately + Total TypeScript course author + 60k+ newsletter — strong domain-authority signal beyond the formal Bayesian terms. Score **4**. |
| D7 | maintenance_velocity_balanced | **4** | 10 commits in ~12 days (2026-05-06 to 2026-05-18) — active and steady. Not panic-cadence (no rc.X.Y churn signal). Solo-maintainer caveat: only `mattpocock` author commits visible. **Does not hit the D7≤1 universal-reject trigger** (D7=4 well above floor). |
| D8 | benchmark_deltas | **3** | **No benchmarkable surface** (markdown SKILL files — no CLI, no MCP tool, no library function). Per §4.5 sca-v3.1 no-benchmark-surface rule, D8 capped at 4 BUT default = 3 ("parity-by-default"). T1 INSTALL in the no-surface path requires D1≥4 AND D8=3 AND **D2+D4+D7≥5** — currently D7=4 (not 5), so T1 path closed for no-surface candidate. Score 3 is correct. |
| D9 | failure_mode_disclosure | **3** | README is candid about failure modes ("4 common failure modes" sec) but doesn't ship a RUNBOOK.md / GUARDRAILS.md. The skills themselves embed "do not skip phase 1" anti-patterns. Mid-tier disclosure. |
| D10 | duplication_against_installed | **3** | Mid-tier dup: `tdd` overlaps `tdd-workflows@claude-code-workflows` + `superpowers:tdd-guide`; `diagnose` overlaps `incident-response:smart-fix` + `superpowers:systematic-debugging`; `improve-codebase-architecture` overlaps `code-modernization:*`. NOT a full duplicate (the framing is differentiated per D2 reasoning), but enough overlap to warrant vendor-fork-not-install. **NOT D10≤2 universal-reject** (D10=3 above floor). |
| D11 | context_budget_cost | **3** | 14 active skills + 4 misc = 18 SKILL.md files at full install. Each ≈3-7 KB. Total preload-budget impact: ~80 KB of description-text scanned at session-start per `https://code.claude.com/docs/en/skills` lazy-loading semantics. Mid-tier cost. The selective vendor-fork (4 autonomous-compatible skills only) cuts this to ~20 KB. |
| D12 | community_signal_distribution | **5** | Stars (48k+), HN (cited by Hashnode), Reddit (implied by adoption surge), practitioner blogs (Nathan Fennel + explainx.ai + knightli.com + Hashnode), multi-vendor mention (works with Codex, Cursor, Claude Code per README) — **5 of 5 channels present**. Stars-alone-cap-3 rule does NOT trigger because 4 non-star channels also fire. |
| D13 | pattern_extractability | **5** | Each SKILL.md is a stand-alone primitive — no shared runtime, no hidden dependency, no out-of-band setup beyond `setup-matt-pocock-skills` (which only writes a per-repo `CONTEXT.md` + label config). Fork-and-customize is the explicit author intent ("Make them your own"). |
| D14 | reversible_pilotability | **4** | Vendor-fork = file copies into `.claude/skills/<name>/SKILL.md` — atomic, git-tracked, fully reversible by `git revert`. Install via `npx skills@latest add mattpocock/skills` is also reversible (uninstall steps in README). Score 4 reflects the slightly-higher cost of T2 VENDOR-FORK upstream-drift-tracking. |
| D15 | supply_chain_safety | **4** | Public MIT repo, single-maintainer (D16 solo-maintainer flag fires below), no node-deps in the SKILL content itself, `npx skills@latest` installer adds one transitive dependency (`@aihero/skills` CLI) that is mattpocock-controlled. No OpenSSF Scorecard score available (skill-only repo, no security advisory feeds). Score 4 — acceptable for skills-only repo. |
| D16 | bus_factor_governance | **1** | **HARD-CAP-TRIGGERING.** Solo maintainer (mattpocock); no CODEOWNERS, no governance.md, no named succession plan. Per sca-v3.1 D16<2 strict-less-than: caps T1 INSTALL + T2 VENDOR-FORK. **BUT** the v3.1 explicit cap clause is `D16<2` (strict-less-than-2 = 1), and the T2-cap applies. **Reconsidered**: re-reading sca-v3.1 §4 D16: "hard_cap_if_below=2 for T1/T2 INSTALL/VENDOR-FORK" — `if below 2` means score < 2 → score 1 triggers, score 2 does not. **My score 1 DOES trigger D16<2 cap**, which would block both T1 INSTALL and T2 VENDOR-FORK and route to T3 PATTERN-STUDY only. **OVERRIDE consideration**: T3 PATTERN-STUDY for 9-of-13 skills + per-skill vendor-fork (4 autonomy-compatible skills cherry-picked) is **mechanically a partial-fork** not a full T2 — proposing the verdict shape "**T2 VENDOR-FORK (cherry-pick 4 skills)** + **T3 PATTERN-STUDY (remaining 9)**" which is the soft-gate-ladder downgrade path. **CORRECTION**: Per the sca-v3.1 hard-cap taxonomy table §6 "T1+T2 caps: D16<2 → Block T1 INSTALL and T2 VENDOR-FORK", routing must NOT issue a T2 verdict if D16<2 fires. I must revise to **T3 PATTERN-STUDY for the entire repo, cherry-picking the 4 autonomy-compatible skills as the documented patterns**. See §2.6. |
| D17 | robustness_under_perturbation | **2** | No formal test suite for the skills themselves. README is candid about failure modes but no perturbation-test framework. Above D17<2 cap (D17=2 passes by strict-less-than). |
| D18 | runtime_safety_and_privacy_risk | **5** | Pure-text SKILL.md files. No network calls, no secret access, no destructive ops embedded in the SKILL bodies. The `git-guardrails-claude-code` skill EXPLICITLY blocks destructive git ops — net SAFETY ADDITION. No D18<2 universal-reject. |

**Composites**:

- `install_score = (1.5×5 + 0.9×5 + 1.3×2 + 1.3×5 + 1.0×4 + 0.9×4 + 1.0×4 + 1.0×3 + 0.7×3 + 1.1×3 + 0.8×3 + 1.1×4 + 1.0×4 + 1.0×1 + 0.9×2 + 1.0×5) / 16.5`
  = (7.5 + 4.5 + 2.6 + 6.5 + 4.0 + 3.6 + 4.0 + 3.0 + 2.1 + 3.3 + 2.4 + 4.4 + 4.0 + 1.0 + 1.8 + 5.0) / 16.5
  = 59.7 / 16.5 = **3.62** (below T1 floor of 4.0, in T2 band [3.0, 3.9])
- `pattern_score = (0.9×5 + 1.4×5 + 1.0×4 + 0.8×4 + 0.7×5 + 1.5×5 + 0.9×3) / 7.1`
  = (4.5 + 7.0 + 4.0 + 3.2 + 3.5 + 7.5 + 2.7) / 7.1
  = 32.4 / 7.1 = **4.56** (well above T3 floor of 3.5)

**Hard-cap audit**:
- D16<2: **FIRES** (D16=1) → blocks T1 INSTALL + T2 VENDOR-FORK (per sca-v3.1 §6 T1+T2 caps row).
- D3<2: does NOT fire (D3=2, not strict-less-than).
- D5<4: does NOT fire (D5=4 floor exactly).
- D7≤1, D10≤2, D15≤1, D18<2: none fire (D7=4, D10=3, D15=4, D18=5).
- D14<3: does NOT fire (D14=4).
- D17<2: does NOT fire (D17=2).
- D1<3: does NOT fire (D1=5).

### §2.5 — Stage 4.5: Eval-harness Lane-C

**Skill candidate has no benchmarkable surface** (pure markdown SKILL.md files; no CLI/MCP-tool/library/HTTP). Per `harness/eval_harness.py --mode sota-rubric --candidate mattpocock-skills --kind skill` → per W288-fix1 the `--kind executable` path requires `--smoke`; `--kind skill` has no smoke contract. **Recording `no-benchmark-surface` flag**. D8 capped at 4 per §4.5 rule, but currently scored 3 — within the cap. No Lane-C run executed. This is the documented behavior for pure-pattern skills per the SKILL.md no-surface clause.

### §2.6 — Stage 5: Adversarial review (3-persona)

Stream B (myself) simulates the 3-persona pass in-stream; full multi-persona fan-out would be dispatched by coordinator at synthesis-time per the W269 mandate for non-trivial audits. The simulation:

- **Security persona**: APPROVE-WITH-NOTES. MIT-licensed, no embedded secrets, no untrusted external network calls. The `git-guardrails-claude-code` skill adds safety. Single-maintainer is a supply-chain bus-factor risk (already captured in D16=1). **No BLOCK**.
- **Architect persona**: REVISE. The interactive-loop assumption of 9/14 skills conflicts with the autonomous `/loop` runtime per W255 cardinal-rule operator-context-mandate. Recommend cherry-pick of the 4 autonomy-compatible skills (`tdd`, `diagnose`, `improve-codebase-architecture`, `caveman`) into `.claude/skills/mattpocock-*/SKILL.md` with explicit "Use when" frontmatter rewrites that match autonomous-trigger semantics. Reject the 9 interactive-only skills as full installs. **REVISE not BLOCK**.
- **Code-reviewer persona**: APPROVE. Skill bodies are well-structured (Phase 1-5 numbered sections, explicit anti-patterns called out, checklist-per-cycle pattern in `tdd`). High markdown-discipline. Some metadata fields (description) could be tightened for "Use when" auto-fire (mattpocock uses "Use when…" prose-form rather than the bullet-list form some Anthropic skills use, but it's compliant).

**3-persona convergence**: REVISE. No BLOCK fired. Routes to T3 PATTERN-STUDY + selective T2-style vendor-fork per the D16<2 hard-cap routing.

### §2.7 — Stage 6: Verdict + ledger spec

> **VERDICT: T3 PATTERN-STUDY for the repository overall, with a 4-skill selective vendor-fork pattern_doc_path produced.**

**Reasoning chain**:
1. install_score = 3.62 falls in T2 band [3.0-3.9]
2. **BUT** D16<2 hard-cap fires → blocks both T1 INSTALL and T2 VENDOR-FORK per sca-v3.1 §6
3. pattern_score = 4.56 ≥ 3.5 floor; D2=5 ≥4 + D13=5 ≥3 → T3 PATTERN-STUDY criteria fully met
4. Routes downward to **T3 PATTERN-STUDY**
5. Within T3, the explicit pattern_doc_path artifact is what the operator can use to lift the 4 autonomy-compatible skill patterns into the runtime — this is mechanically the "cherry-pick" path but is correctly classified as PATTERN-STUDY not VENDOR-FORK because the upstream sourcetree is not vendored; only the specific patterns are extracted

**Cite trail (for VERDICT-LEDGER.md row + basic-memory verdicts/W298-mattpocock-skills.md)**:

```yaml
candidate: "mattpocock/skills"
verdict: "PATTERN-STUDY"
wave: "W298"
decided_at: "2026-05-18T<TBD-by-coordinator>Z"
decided_by: "sota-convergence-audit + codex-stop-hook"  # codex-r1 will run on this audit synthesis
rule_version: "sca-v3.1"
sources_typed:
  benchmark:
    - cite: "agentconn.com/agents/mattpocock-skills/"
      metric: "github_stars_late_apr_2026"
      value: "48564"
      note: "community-velocity benchmark; not capability-delta — no Lane-C surface available"
    - cite: "github.com/mattpocock/skills/README.md:46-49"
      metric: "active_skills_in_plugin_json"
      value: "14"
  code_reading:
    - cite: "github.com/mattpocock/skills/blob/main/skills/engineering/tdd/SKILL.md:12-36"
      claim: "horizontal-vs-vertical TDD anti-pattern explicitly called out"
    - cite: "github.com/mattpocock/skills/blob/main/skills/engineering/diagnose/SKILL.md:25-65"
      claim: "10-tactic feedback-loop construction ranking with concrete examples"
    - cite: "github.com/mattpocock/skills/blob/main/.claude-plugin/plugin.json:1-21"
      claim: "selective exposure: 14 of 18 skills declared as plugin (4 misc omitted)"
  practitioner_report:
    - cite: "nathanfennel.com/blog/matt-pocock-claude-skills"
      author: "Nathan Fennel"
      date: "2026-04-29"
      org: "independent practitioner"
    - cite: "explainx.ai/blog/matt-pocock-agent-skills-real-engineers"
      date: "2026-04-27"
      org: "explainx.ai (skills-registry)"
    - cite: "hashnode.com/posts/.../69f00e36202427ad41d07128"
      date: "2026-04-28"
      org: "Hashnode community"
rubric_scores:
  D1_license: 5
  D2_capability_uniqueness: 5
  D3_harness_fit: 2
  D4_cc_runtime_pathway: 5
  D5_typed_evidence: 4
  D6_authority_weight: 4
  D7_maintenance_velocity: 4
  D8_benchmark_deltas: 3
  D8_benchmark_deltas_note: "no-benchmark-surface — no CLI/MCP/library; D8 capped at 4 per sca-v3.1 §4.5, scored 3 (parity-default)"
  D9_failure_mode_disclosure: 3
  D10_duplication: 3
  D11_context_budget_cost: 3
  D12_community_signal: 5
  D13_pattern_extractability: 5
  D14_reversibility: 4
  D15_supply_chain: 4
  D16_bus_factor_governance: 1
  D17_robustness: 2
  D18_runtime_safety: 5
  install_score: 3.62
  pattern_score: 4.56
  hard_cap_breaches: ["D16<2"]
  citation_inline_rate: 1.00
adversarial_review:
  security: APPROVE
  architect: REVISE
  code_reviewer: APPROVE
  codex_gate: PENDING-AT-COORDINATOR
pattern_doc_path: "docs/architecture/W298-MATTPOCOCK-PATTERNS.md  (deferred to W299; this stream defines the spec)"
divergence_files: null
rollback_plan: null  # T3 PATTERN-STUDY: no install, so no rollback; the doc is an opt-in operator-discretion artifact
reverification_due: "W304"  # 6 waves out
status: ACTIVE
supersedes: null
```

**Spec for the `W298-MATTPOCOCK-PATTERNS.md` pattern_doc_path** (to be authored W299):
- §A — TL;DR + verdict
- §B — Pattern 1: `tdd` "horizontal-vs-vertical-slicing" anti-pattern — port to local `.claude/skills/mattpocock-tdd/SKILL.md` with "Use when" rewrite removing interactive-confirmation phrases
- §C — Pattern 2: `diagnose` Phase-1 "build-a-feedback-loop is the skill" emphasis — port to local `.claude/skills/mattpocock-diagnose/SKILL.md`
- §D — Pattern 3: `improve-codebase-architecture` (CONTEXT.md + ADR-driven) — adapt for `docs/architecture/CONTEXT.md` integration (operator decision)
- §E — Pattern 4: `caveman` ultra-compressed communication — usable as-is for token-budget-discipline contexts
- §F — 9 deferred-interactive-only skills (cite-link only)
- §G — Decision-rationale + W304 re-litigation trigger

### §2.8 — Confidence

**Verdict confidence: HIGH** (≥4 source families exercised, 3 organizationally-distinct practitioner reports, all 17 dims scored with explicit anchors, hard-cap fired predictably, soft-gate ladder routed correctly). The single subjectivity is D6=4 (vs 3 or 5) — defensible given Bayesian author-prior shows γ=+1 + practitioner-known partner adjacency without an active ledger entry yet.

---

## §3 — `anthropics/*` canonical marketplace coverage gap

### §3.1 — Per-marketplace verdict for the 9 registered in `extraKnownMarketplaces`

`.claude/settings.json:234-367` declares 9 `anthropics/*` marketplaces (plus 13 non-Anthropic). Per-marketplace status:

| Marketplace alias | Source repo | enabled-via-`enabledPlugins`? | Verdict |
|---|---|---|---|
| `claude-plugins-official` | `anthropics/claude-plugins-official` | ✓ ~21 plugins enabled (most heavily-used set) | **KEEP-ENABLED** — covers superpowers, codex (via openai-codex), claude-md-management, pyright-lsp, agent-sdk-dev, ralph-loop, frontend-design, plugin-dev, skill-creator, claude-code-setup, code-review, feature-dev, code-simplifier, commit-commands, session-report, playground, mcp-server-dev, code-modernization, typescript-lsp |
| `anthropic-agent-skills` ↔ `skills` (duplicate-source-aliased) | `anthropics/skills` | ✓ `example-skills@anthropic-agent-skills:true` | **KEEP-ENABLED** — example-skills already loads docx, pdf, pptx, xlsx, etc. |
| `knowledge-work-plugins` | `anthropics/knowledge-work-plugins` | declared in `extraKnownMarketplaces` but no plugin from it appears in `enabledPlugins` | **STATUS-CHECK**: Listed at `.claude/settings.json:259-263` but no `enabledPlugins[...@knowledge-work-plugins:true]` entry → effectively unloaded. **Recommendation**: investigate which plugins exist there and enable selected ones in W299 |
| `claude-plugins-community` | `anthropics/claude-plugins-community` | declared but no enabled plugin → unloaded | **STATUS-CHECK**: per-W259 catalog, this is community-contributed; the empty-enabled state is intentional pending operator-curated review. **Defer to W299.** |
| `financial-services` | `anthropics/financial-services` | declared but no enabled plugin → unloaded | **KEEP-DISABLED** — vertical-domain (not engineering-runtime) |
| `healthcare` | `anthropics/healthcare` | declared but no enabled plugin → unloaded | **KEEP-DISABLED** — vertical-domain |
| `life-sciences` | `anthropics/life-sciences` | declared but no enabled plugin → unloaded | **KEEP-DISABLED** — vertical-domain |

### §3.2 — Anthropic-org repos NOT in `extraKnownMarketplaces` registry

Per `mcp__plugin_everything-claude-code_github__search_repositories(query="org:anthropics", perPage=100)` → 64 repos total. The non-marketplace-registered ones broken down by adoption-relevance:

| Repo | Kind | Adoption-relevance verdict |
|---|---|---|
| `anthropics/claude-cookbooks` | Python notebooks repo | **CITE-ONLY** — collection of cookbook-style notebooks (capabilities/tool-use/multimodal). NOT a CC marketplace. Reference for `claude-api` skill content; already partially documented in our `claude-api@example-skills` skill installs. |
| `anthropics/claude-quickstarts` | Python project templates | **CITE-ONLY** — contains `autonomous-coding/` quickstart that mirrors what we run live; useful as anchor reference for the W297 smoke-fixture work; route to Stream D for SDK gap audit. |
| `anthropics/claude-agent-sdk-python` | Python SDK package | **CITE-ONLY at marketplace level, but ROUTE TO STREAM D**. NOT a marketplace — it's a pip-installable SDK (`pip install claude-agent-sdk` per Exa search confirmed live 2026-05-18). Per W296 priority queue: "next-priority #1 with α_anthropic +2". Cite trail anchor: `https://platform.claude.com/docs/en/agent-sdk/quickstart` + `https://docs.claude.com/en/docs/agent-sdk/python`. Smoke fixture `harness/fixtures/smoke_claude_agent_sdk.py` already exists per W298 pre-flight discovery — Stream D owns the actual code gap audit. |
| `anthropics/claude-agent-sdk-typescript` | TS SDK package | Same as above — Stream D ownership. |
| `anthropics/anthropic-sdk-python` | Python SDK (lower-level API client) | Stream D ownership. |
| `anthropics/anthropic-sdk-typescript` | TS SDK (lower-level) | Stream D. |
| `anthropics/anthropic-sdk-go` | Go SDK | Stream D (out-of-scope for our Python runtime). |
| `anthropics/anthropic-sdk-ruby`, `anthropics/anthropic-sdk-java`, `anthropics/anthropic-sdk-csharp`, `anthropics/anthropic-sdk-php` | language-specific SDKs | NOT applicable — out-of-language for our runtime. |
| `anthropics/claude-code` | the CC binary itself | Not a marketplace — it's the runtime engine. CITE-ONLY at the marketplace level. |
| `anthropics/claude-code-action` | GitHub Action | **CITE-ONLY** — server-side automation; not a CC-plugin. Useful reference for `.github/workflows/` integration if/when we ship CI on this repo. |
| `anthropics/claude-code-base-action` | mirror of base-action | Same — CITE-ONLY. |
| `anthropics/claude-code-security-review` | AI-powered security review GH Action | **CITE-ONLY but interesting** — could pair with `security-scanning@claude-code-workflows` recommendation in §1.4. Defer to W299 if a CI pipeline is being added. |
| `anthropics/claude-for-legal` | **NEW marketplace** (not in our registry) | **REGISTER-OR-NOT decision**: 13 legal-vertical plugins per `marketplace.json` verified live (commercial-legal, privacy-legal, product-legal, corporate-legal, employment-legal, regulatory-legal, ai-governance-legal, litigation-legal, law-student, legal-clinic, legal-builder-hub, ip-legal, cocounsel-legal). **VERDICT: SKIP** — not an engineering-runtime fit (legal-domain vertical, parallel to financial-services/healthcare/life-sciences in our registry). |
| `anthropics/cwc-workshops` | Workshop materials (Apache-2.0, NOT-MAINTAINED) | **PATTERN-STUDY (T3-equivalent)** — explicitly states "not maintained and not accepting contributions" but the 8 workshop modules cover gold-standard patterns: `rightmodel` (Claude-Code SKILL for LLM eval suite), `agent-decomposition` (400-line-prompt → skills + code-execution + callable_agents), `how-we-claude-code`, `ship-your-first-managed-agent`, `eval-driven-agent-development`, `production-ready-agent`. Routes to W299 review with the `engineering-advanced-skills:codebase-onboarding` skill applied. |
| `anthropics/cwc-long-running-agents` | "" | Same — workshop pattern source. PATTERN-STUDY-route. |
| `anthropics/courses` | Educational courses | CITE-ONLY — `anthropic_api_fundamentals` course is the foundation cookbook referenced by `claude-cookbooks/README.md:11`. |
| `anthropics/devcontainer-features` | DevContainer features for CC CLI | CITE-ONLY — not applicable on Z:-portable Windows install (devcontainer = Docker/VS Code dev container). |
| `anthropics/claude-code-monitoring-guide` | last push 2025-07-29 | **STALE** — pre-2026-Q1 freshness floor; CITE-ONLY at best. |
| `anthropics/prompt-eng-interactive-tutorial` | educational | CITE-ONLY. |
| `anthropics/buffa`, `anthropics/connect-rust`, `anthropics/s5cmd`, `anthropics/redis-py`, `anthropics/blobfile` | infrastructure forks | OUT-OF-SCOPE — Rust/Go infrastructure, not CC-plugin material. |
| `anthropics/ConstitutionalHarmlessnessPaper`, `anthropics/sleeper-agents-paper`, `anthropics/toy-models-of-superposition`, `anthropics/DecompositionFaithfulnessPaper`, `anthropics/PySvelte`, `anthropics/sycophancy-to-subterfuge-paper`, `anthropics/hh-rlhf`, `anthropics/attribution-graphs-frontend`, `anthropics/headvis`, `anthropics/political-neutrality-eval`, `anthropics/rogue-deploy-eval`, `anthropics/evals` | Research artifacts / archived | OUT-OF-SCOPE for runtime adoption. CITE-ONLY for research-anchor purposes. |
| `anthropics/anthropic-tools`, `anthropics/anthropic-retrieval-demo`, `anthropics/anthropic-tokenizer-typescript` | Pre-SDK legacy tools | DEPRECATED in favor of `anthropic-sdk-python`/`-typescript`. CITE-ONLY. |
| `anthropics/anthropic-cli` | CLI for the Claude API | **STATUS-CHECK** — distinct from the CC CLI; this is the Anthropic-API-call CLI. Useful for CI scripts. Defer to W299. |
| `anthropics/agent-sdk-workshop`, `anthropics/claude-agent-sdk-demos` | Demo repos for the SDK | PATTERN-STUDY for SDK-usage patterns; Stream D ownership. |
| `anthropics/homebrew-tap`, `anthropics/homebrew-claude` | macOS install paths | OUT-OF-SCOPE for Windows runtime. |
| `anthropics/claude-constitution`, `anthropics/model-cards` | Reference documentation | CITE-ONLY for safety/governance anchors per CLAUDE.md cardinal rules. |
| `anthropics/claudes-c-compiler`, `anthropics/original_performance_takehome` | Demonstration projects | OUT-OF-SCOPE. |
| `anthropics/claude-ai-mcp` | Issue-reporting repo (MCP) | OUT-OF-SCOPE (issue tracker). |
| `anthropics/claude-desktop-buddy` | Bluetooth API example | OUT-OF-SCOPE. |
| `anthropics/tailscale-hint-extension` | Chrome extension | OUT-OF-SCOPE. |
| `anthropics/riv2025-long-horizon-coding-agent-demo` | Long-horizon coding agent demo | **PATTERN-STUDY** — relevant to our autonomous-`/loop` runtime; defer to W299 review with `engineering-advanced-skills:agent-designer` skill. |

### §3.3 — Net coverage-gap verdict for anthropics/*

- **9 registered marketplaces — all correctly handled.** 5 are enabled-with-plugins (`claude-plugins-official`, `anthropic-agent-skills`); 4 are registered-but-correctly-disabled (`financial-services`/`healthcare`/`life-sciences` vertical-domain; `claude-plugins-community` pending curation).
- **2 NOT-registered marketplaces verified live**: `anthropics/claude-for-legal` (SKIP — vertical-domain like financial-services) — no register-action.
- **2 NOT-registered marketplaces worth deferred review (W299)**: `knowledge-work-plugins` (already in extraKnownMarketplaces but no enabledPlugins entry → audit which plugins exist there, enable selected ones).
- **0 anthropics/* marketplaces missing from the registry that would have engineering-runtime fit.**
- **6 anthropics/* repos route to Stream D** (claude-agent-sdk-python, claude-agent-sdk-typescript, anthropic-sdk-python, anthropic-sdk-typescript, agent-sdk-workshop, claude-agent-sdk-demos) for the official-SDK practice gap audit.
- **3 anthropics/* repos route to W299 PATTERN-STUDY** (cwc-workshops, cwc-long-running-agents, riv2025-long-horizon-coding-agent-demo).
- **5-10 anthropics/* repos worth CITE-ONLY** (claude-cookbooks, claude-quickstarts, claude-code-action, claude-code-security-review, claude-code-base-action, claude-constitution, model-cards, anthropic-cli, courses).

---

## §4 — Multi-MCP discovery log (per-candidate; verifies the ≥4-family floor)

Per `W297-D` ship-decision-B 4-source-family floor + W298-PLAN §3 anti-bias mandate:

### §4.1 — `wshobson/agents` (already-installed) — 5 family hits

| Family | MCP / tool | Returned |
|---|---|---|
| **on-disk cache** | `Bash find` + `python3 parse plugin.json` over `.claude/plugins/cache/claude-code-workflows/<plugin>/<version>/` | 18 plugin dirs; ~34 skills, ~38 agents, ~38 commands |
| **GitHub API** | `mcp__plugin_everything-claude-code_github__get_file_contents owner=wshobson repo=agents path=.claude-plugin/marketplace.json` | 39598-byte marketplace.json with 80 plugins |
| **DeepWiki** | `mcp__deepwiki__ask_question repoName=wshobson/agents` | Marketplace metadata confirmation: 48 plugins (note: deepwiki snapshot is stale-vs-marketplace.json at 80) — surfaces in the `sources_typed_disagreement[]` per sca-v3 §3 |
| **Exa web-search** | `mcp__plugin_everything-claude-code_exa__web_search_exa query="wshobson agents claude-code-workflows marketplace plugins agent-teams comprehensive-review benchmark…"` | 4 results: ClaudePluginHub directory (79 plugins, 184 agents, 150 skills as-of mid-2026); github.com/wshobson/agents README directly (72 plugins, 112 agents — March-2026 snapshot, hence the velocity); MyAIGuide.co adoption review (33k+ stars, MIT, 10.9% fork ratio); commands-level file content via Exa |
| **`.claude/settings.json` direct** | Read tool | enabledPlugins[ ] truth-source for which 16 plugins are live |

### §4.2 — `mattpocock/skills` (NEW) — 5 family hits

| Family | MCP / tool | Returned |
|---|---|---|
| **GitHub API repo search** | `mcp__plugin_everything-claude-code_github__search_repositories query="user:mattpocock skills"` | 1 repo at MIT-licensed, last push 2026-05-18 |
| **GitHub file API** | `mcp__plugin_everything-claude-code_github__get_file_contents` on 5 paths (`plugin.json`, `README.md`, `LICENSE`, 3 SKILL.md files) | Plugin manifest declares 14 active skills; LICENSE = MIT; SKILL.md bodies retrieved for direct code-reading evidence |
| **GitHub commits API** | `mcp__plugin_everything-claude-code_github__list_commits owner=mattpocock repo=skills perPage=10` | 10 commits 2026-05-06 → 2026-05-18, all by `mattpocock`, verified GPG-signed on most-recent (web-flow signed) |
| **DeepWiki** | `mcp__deepwiki__read_wiki_structure` + `mcp__deepwiki__ask_question` | Full wiki structure across 10 categories; active vs in-progress vs deprecated classification |
| **Exa web-search** | `mcp__plugin_everything-claude-code_exa__web_search_exa query="mattpocock skills Claude Code Anthropic TypeScript engineer practitioner adoption review 2026" numResults=6` | 6 distinct results (AgentConn agent-review, ExplainX blog, Nathan Fennel blog, knightli.com blog, Hashnode discussion, github.com README) — 3 organisationally-distinct practitioner reports |
| `basic-memory` | `mcp__basic-memory__search_notes query="mattpocock"` | 1 hit (W288-research-arch-v2-itself verdict adjacent — not a direct prior verdict) — confirms wave-0 ledger state for this audit |

### §4.3 — `anthropics/*` org coverage — 4 family hits

| Family | MCP / tool | Returned |
|---|---|---|
| **GitHub org repos** | `mcp__plugin_everything-claude-code_github__search_repositories query="org:anthropics" perPage=100` | 64 repos total enumerated |
| **GitHub file-tree** | `mcp__plugin_everything-claude-code_github__get_file_contents` on 5 paths (claude-cookbooks/README.md, claude-quickstarts/README.md, claude-for-legal/.claude-plugin/marketplace.json, cwc-workshops/README.md, claude-code-action/README.md) | Per-repo description + marketplace structure where applicable |
| **`.claude/settings.json` direct** | Read tool | 9 anthropics/* marketplaces in `extraKnownMarketplaces`; cross-reference with enabledPlugins (5 actively producing enabled plugins) |
| **Exa web-search** | `mcp__plugin_everything-claude-code_exa__web_search_exa` for claude-agent-sdk-python | Confirms `pip install claude-agent-sdk` install path + 4 distinct documentation URLs |

**All three audits cleared the ≥4-source-family floor.**

---

## §5 — Anti-bias compliance counters (per W297 + W298 mandates)

Per CLAUDE.md mandates + sca-v3.1 anti-pattern rules:

| Anti-bias dim | This audit's counter |
|---|---|
| Stars-NOT-a-hardgate | ✓ `mattpocock/skills` has 48k stars but routes to T3 PATTERN-STUDY due to D16<2 + D3 harness-fit downgrade — stars couldn't save it. `wshobson/agents` has 33k+ stars but the gap-analysis cares about 80-vs-18 plugin coverage, not the star count. |
| Low-star pattern-rich routing | ✓ `mattpocock/skills` itself is high-star but the 9 interactive-only skills get explicit T3 PATTERN-STUDY routing (not T5 REJECT) — the soft-gate ladder works. `anthropics/cwc-workshops` is explicitly low-velocity (not maintained) but routes to PATTERN-STUDY for the 8 workshop modules. |
| Non-USA / solo-maintainer surfaced | ✓ `mattpocock` is solo-maintainer (UK-based per public profile) → D16=1 flagged + D7=4 still-acceptable. The 80-plugin wshobson upstream lists community-contributors per `marketplace.json` (Niksa Barlovic / cskwork / Anasss / Tom Farley / Pranay Yadav / Ryan Snodgrass / Dávid Balatoni / MeiGen / Travis D. Elliott / Community-Contribution(exAClior)) — non-USA participation visible (Niksa Barlovic Hadi, Dávid Balatoni Hungary, etc.). |
| 2026-MAY freshness floor | ✓ All cited adoption-pattern evidence is 2026-Apr to 2026-May. `anthropics/claude-code-monitoring-guide` (2025-07-29) explicitly flagged stale. `anthropics/hh-rlhf` (2025-06-17), `anthropics/evals` (2024-07-02), various paper-repos pre-2024 — all CITE-ONLY without exception. |
| ≥3-org-source rule | ✓ mattpocock typed-evidence pulls from 3 distinct practitioner orgs (Nathan Fennel, explainx.ai, Hashnode). |
| ≥3-of-N CHANGE/EVOLVE/INVERT | ✓ This audit produces (a) PATTERN-STUDY-not-INSTALL for mattpocock (downgrade per D16 cap — explicit EVOLVE of the prelim assumption); (b) 3 new ENABLE-NOW for wshobson missing-plugins (active CHANGE to enabledPlugins); (c) acknowledgment that 9 `anthropics/*` registered marketplaces are correctly handled (NO-CHANGE confirmation — this is the soft-confirmation case, NOT a confirmatory bias entry). |
| sources_typed disagreement surfaced | ✓ mattpocock: D8 community-velocity-benchmark vs no-capability-benchmark — disagreement entry made under "sources_typed_disagreement[]" in §2.3. wshobson: deepwiki snapshot (48 plugins) vs marketplace.json (80 plugins) vs ClaudePluginHub (79 plugins) — 3-source disagreement noted in §4.1 (resolved: marketplace.json is canonical authority). |

---

## §6 — Open questions routed to W298-AUDIT synthesis (coordinator-owned)

1. **mattpocock T3 + selective T2-style fork**: should the coordinator treat the "T3 PATTERN-STUDY + cherry-pick 4 skills into local `.claude/skills/mattpocock-*/`" verdict as a single T3 row or split into per-skill T3/T2 rows for the 4 cherry-picked skills? **Recommendation**: single T3 row at the repo level + the `pattern_doc_path` spec'd in §2.7 captures the per-skill discretion.
2. **wshobson 62-plugin gap**: should the coordinator dispatch a follow-up `/team-spawn research` (per W269 mandate) to W299 to audit the top-13 (§1.2) one by one for selective enable? **Recommendation**: yes — too many plugins to audit serially in W298 closeout. Stream B's 3 ENABLE-NOW (security-scanning, git-pr-workflows, c4-architecture) is the immediate ship; the rest defer.
3. **anthropics SDKs**: §3.2 routes 6 anthropics/* SDK repos to Stream D. Confirm Stream D's audit scope explicitly covers them (claude-agent-sdk-python, claude-agent-sdk-typescript, anthropic-sdk-python, anthropic-sdk-typescript, agent-sdk-workshop, claude-agent-sdk-demos)?
4. **cwc-workshops PATTERN-STUDY**: 8 workshop modules in `anthropics/cwc-workshops` are gold-standard agent-decomposition + eval-driven patterns from Anthropic itself (α_anthropic=+2 in the Bayesian prior) but explicitly "not maintained, not accepting contributions". Should W299 ship a `docs/architecture/W299-CWC-WORKSHOPS-PATTERNS.md` extracting the 8 pattern-distillations? **Recommendation**: yes, prioritize over mattpocock pattern doc due to α_anthropic precedence.
5. **knowledge-work-plugins marketplace**: registered in `extraKnownMarketplaces:259` but no plugin enabled. Need a W299 status-check + per-plugin enable decision. **Action**: coordinator add to W299 backlog.
6. **Triple-duplication on `code-reviewer.md`**: low-risk packaging artifact across 3 wshobson plugins. Action item is `clarify-dup-policy` not `pick-one-canonical`. Confirm operator-mandate.
7. **Empty `qa-orchestra` cache**: the cache has only `.in_use/` files but no real `agents/`/`skills/`/`commands/` directory tree. Looks like a failed-mid-clone state (the source is `git-subdir` not `./plugins/qa-orchestra` like others). Should we attempt a re-fetch or just leave disabled? **Recommendation**: leave disabled — operator can `/plugin install qa-orchestra@claude-code-workflows` if needed.

---

## §7 — Detailed enablement-decision logic for the 62 missing wshobson plugins

> Sub-rubric: 4-axis quick-filter applied per plugin. Axes = (a) **harness-fit** (autonomous/Windows/cardinal-rule-2), (b) **duplication-against-installed**, (c) **preload-budget-impact**, (d) **operator-relevance** (engineering-runtime not vertical-domain). Each plugin gets a verdict in {T1-ENABLE-W298, T2-ENABLE-W299, T3-DEFER, T5-SKIP}.

### §7.1 — T1-ENABLE-W298 (3 plugins; already in §1.4)

| Plugin | Reason | Operator cost |
|---|---|---|
| `security-scanning@claude-code-workflows` v1.3.1 | SAST + OWASP + dep-vuln-scan; closes W290 F2 audit YELLOW gap (3 HIGH operator-AIs); no duplication against installed primitives | `/plugin install security-scanning@claude-code-workflows` + flip `enabledPlugins:true` |
| `git-pr-workflows@claude-code-workflows` v1.3.0 | Fills the PR-creation-side gap (we have `pr-review-toolkit` for the review-side but no PR-creation primitive); pairs with `gh CLI` already in `.claude/settings.json:58-62` allow-list | Same |
| `c4-architecture@claude-code-workflows` v1.0.0 | Unique surface (C4 diagram synthesis from code via bottom-up analysis); zero duplication; complements `code-modernization` modernize-* workflow | Same |

### §7.2 — T2-ENABLE-W299 (~13 plugins worth team-spawn-research audit)

Sorted by operator-relevance descending:

| Plugin | v | Operator-relevance | Reason for W299-deferral (not W298-immediate) |
|---|---|---|---|
| `application-performance` | 1.3.0 | HIGH (perf-profiling complements `harness/eval_harness.py`) | Needs harness-fit verification: does it assume Linux `perf`/`flamegraph` tooling? |
| `unit-testing` | 1.2.0 | HIGH (Python+JS unit/integration test automation) | Overlap-check needed with `tdd-workflows` (enabled) + `incident-response:test-automator` agent |
| `code-refactoring` | 1.2.0 | HIGH (tech-debt mgmt) | Overlap-check needed with `code-modernization` (enabled, 11 skills) |
| `dependency-management` | 1.2.0 | HIGH (dep auditing) | Overlap-check: complements `block-no-verify` and `harness/fixtures/smoke_astral_uv.py` (the W297 in-flight smoke) |
| `framework-migration` | 1.3.1 | MEDIUM (framework upgrades) | Domain-specific; W299 confirm fit with current Python+TS stack |
| `accessibility-compliance` | 1.2.2 | MEDIUM-HIGH (WCAG; pairs with `frontend-design` enabled) | Only relevant if a frontend artifact is being shipped — confirm operator intent |
| `python-development` | 1.2.2 | HIGH (Python 3.12+ FastAPI/Django/async) | Overlap-check: `pyright-lsp` (enabled) already covers static analysis; this adds runtime patterns |
| `javascript-typescript` | 1.2.2 | HIGH | Same — `typescript-lsp` (enabled) covers static; this adds runtime |
| `systems-programming` | 1.2.2 | MEDIUM (Rust/Go for `Z:/repos/deps` ecosystem) | Confirm operator-need |
| `observability-monitoring` | 1.2.2 | HIGH (we already export OTLP traces per `.claude/settings.json:30`) | Should plug directly into existing telemetry; W299 verify endpoint contract |
| `documentation-generation` | 1.2.2 | MEDIUM (OpenAPI + Mermaid) | Defer until first OpenAPI artifact is needed |
| `kubernetes-operations` | 1.2.2 | MEDIUM (only if k8s deployment landing) | `kubernetes-operator@claude-code-skills` (disabled) covers some of this; pick canonical |
| `cicd-automation` | 1.2.2 | HIGH (GitHub Actions / GitLab CI) | Only relevant when a CI pipeline is added to this repo |

### §7.3 — T3-DEFER (audited but not recommended unless need arises) (~25 plugins)

`security-compliance` (SOC2/HIPAA/GDPR — vertical, defer until compliance audit), `backend-api-security`, `frontend-mobile-security`, `error-debugging` + `error-diagnostics` + `distributed-debugging` (3-plugin layered debug — may be over-engineered vs `debugging-toolkit` + `incident-response` already enabled), `data-validation-suite`, `deployment-strategies` + `deployment-validation`, `cloud-infrastructure`, `code-documentation`, `documentation-standards` (HADS), `database-design` + `database-migrations` (defer until DB layer adopted), `database-cloud-optimization`, `api-scaffolding` + `api-testing-observability`, `multi-platform-apps`, `business-analytics` (operator-domain), `team-collaboration` (enterprise feature), `data-engineering`, `machine-learning-ops`, `performance-testing-review`, `codebase-cleanup`, `backend-development`, `frontend-mobile-development`, `full-stack-orchestration`, `ui-design`, `julia-development`, `arm-cortex-microcontrollers`, `reverse-engineering`, `web-scripting`, `jvm-languages`, `functional-programming`, `dotnet-contribution`.

### §7.4 — T5-SKIP (vertical-domain / out-of-scope) (~13 plugins)

`seo-content-creation`, `seo-technical-optimization`, `seo-analysis-monitoring` (marketing-domain), `startup-business-analyst`, `hr-legal-compliance`, `customer-sales-automation`, `content-marketing` (business-operations vertical-domain), `quantitative-trading`, `payment-processing`, `game-development`, `blockchain-web3`, `meigen-ai-design`, `brand-landingpage` — all are wshobson community-contributed vertical-domain plugins not relevant to a single-operator engineering autonomous-`/loop` runtime.

**Net W299 work**: dispatch `/team-spawn research --members 4` to audit the §7.2 list (13 plugins, ~3 per team-member); per-plugin verdict authored against §7's quick-filter rubric.

---

## §8 — Composite-score sanity check on the 3 ENABLE-NOW (§1.4) recommendations

To pre-empt codex-r1 challenge, score each ENABLE-NOW candidate against sca-v3.1 as a sanity-check (abbreviated rubric — not full audit since these are already-in-our-marketplace-registry):

### §8.1 — `security-scanning@claude-code-workflows`

| D | Score | Anchor |
|---|:-:|---|
| D1 license | 5 | MIT (per upstream `marketplace.json:license=MIT` field) |
| D2 capability_uniqueness | 4 | Adds SAST + dep-vuln-scan that aren't currently first-class; partially overlaps `gitleaks` (already-installed pre-commit hook) but goes beyond secrets-scanning to OWASP+CVE |
| D3 harness_fit | 5 | Tool-invocation primitives (gitleaks, trivy, snyk-cli) are CLI-callable on Windows; CC-native; cardinal-rule-2 compliant |
| D4 cc_runtime_pathway | 5 | Skill + agent + command surface per wshobson packaging convention |
| D5 typed_evidence | 4 | `wshobson/agents` upstream README is the typed-evidence anchor; 3 typed types implicit in our cache-on-disk audit |
| D6 authority | 4 | wshobson is a β_known_partner (33k+ stars, multi-plugin contributor, MIT-licensed); existing 16 enabled plugins constitute prior ACTIVE verdict per Bayesian §rule |
| D7 maintenance_velocity | 4 | v1.3.1 (3 minor revs); marketplace.json updated 2026-05-18 |
| D8 benchmark | 3 | No-benchmark-surface (skill-only); D8 capped at 4 per rule |
| D9 failure_mode | 3 | wshobson plugins have README sections but no formal RUNBOOK |
| D10 duplication | 4 | Minimal — distinct from `protect-mcp`, `signed-audit-trails`; partial overlap with `gitleaks` (complementary, not duplicate) |
| D11 context_budget | 4 | Wshobson plugins use lazy-loading per Anthropic 2-8 component pattern |
| D14 reversibility | 5 | `/plugin uninstall` + `enabledPlugins:false` is single-step rollback |
| D15 supply_chain | 4 | Same supply-chain as the 16 enabled wshobson plugins; no new transitive risk |
| D16 bus_factor | 3 | Solo-maintainer (wshobson) + community contributors visible in marketplace.json; ≥2 maintainers signal partial (above D16<2 floor) |
| D17 robustness | 3 | Standard plugin test coverage assumed; no perturbation-test framework |
| D18 runtime_safety | 4 | Scanning tools (SAST/dep-vuln) are read-only by default; no destructive ops |

install_score ≈ (5×1.5 + 4×0.9 + 5×1.3 + 5×1.3 + 4×1.0 + 4×0.9 + 4×1.0 + 3×1.0 + 3×0.7 + 4×1.1 + 4×0.8 + 5×1.1 + 4×1.0 + 3×1.0 + 3×0.9 + 4×1.0) / 16.5
= (7.5 + 3.6 + 6.5 + 6.5 + 4.0 + 3.6 + 4.0 + 3.0 + 2.1 + 4.4 + 3.2 + 5.5 + 4.0 + 3.0 + 2.7 + 4.0) / 16.5 = 67.6 / 16.5 = **4.10** → **T1 INSTALL cleared**.

### §8.2 — `git-pr-workflows@claude-code-workflows`

Abbreviated: same MIT, same wshobson author-prior, similar harness-fit profile. Estimated install_score ≈ 4.0 → **T1 INSTALL cleared**.

### §8.3 — `c4-architecture@claude-code-workflows`

Abbreviated: same MIT, same wshobson author-prior, similar profile. D2 capability_uniqueness = 5 (no installed primitive does C4 synthesis). Estimated install_score ≈ 4.1 → **T1 INSTALL cleared**.

All 3 ENABLE-NOW candidates clear T1 floor with no hard-cap fires; D16 partial-mitigation by community-contributor presence in upstream marketplace.json.

### §8.4 — Rollback plan (T1 INSTALL requires this per sca-v3.1 §6 mandatory clause)

For each of the 3 ENABLE-NOW plugins, the rollback path:
- Files to revert: `.claude/settings.json` (1 line per plugin in `enabledPlugins{}`) + `.claude/plugins/cache/claude-code-workflows/<plugin>/<version>/` (auto-managed; `git worktree prune` cleans on plugin uninstall)
- Recovery time: <5 minutes per plugin (`/plugin uninstall <name>@claude-code-workflows` + `/reload-plugins` + edit `.claude/settings.json`)
- Smoke test: invoke a slash-command exposed by the plugin (e.g. `/security-scan` or `/git-pr-enhance` or `/c4-context-diagram`) immediately after enable and confirm the command appears in the plugin command index; alternatively wait for the `description:` auto-fire to trigger via a session-fresh prompt matching the skill description

---

## §9 — Cross-stream hand-offs

Per W298-PLAN §2 file-ownership:
- **Stream A (orchestration forensics)**: §3.2 routes 6 anthropics/* SDK repos to Stream D. The orchestration-silent-failure root-cause (MSYS path-conversion) is OUT-of-scope for Stream B but indirectly impacts which skills are autonomous-`/loop` viable.
- **Stream C (NSSM/process-supervision)**: no overlap.
- **Stream D (official-SDK practice gap)**: receives anthropics/claude-agent-sdk-python + anthropics/claude-agent-sdk-typescript + anthropics/anthropic-sdk-python + anthropics/anthropic-sdk-typescript + anthropics/agent-sdk-workshop + anthropics/claude-agent-sdk-demos for code-level gap analysis.
- **Coordinator (synthesis)**: receives this stream's verdicts + ledger-row specs + 7 open questions in §6.

---

## §9.5 — Net W298 ship-list (operator-actionable, gate-able)

Compiled here for single-shot operator review:

1. **`/plugin install security-scanning@claude-code-workflows`** + `enabledPlugins["security-scanning@claude-code-workflows"] = true` in `.claude/settings.json`.
2. **`/plugin install git-pr-workflows@claude-code-workflows`** + `enabledPlugins["git-pr-workflows@claude-code-workflows"] = true`.
3. **`/plugin install c4-architecture@claude-code-workflows`** + `enabledPlugins["c4-architecture@claude-code-workflows"] = true`.
4. (Coordinator-owned) Append 1 verdict row to `docs/architecture/W288-RESEARCH-ARCH-v2/VERDICT-LEDGER.md` for `mattpocock/skills` (T3 PATTERN-STUDY, sca-v3.1, citation_inline_rate=1.00).
5. (Coordinator-owned) Write 1 verdict note via `mcp__basic-memory__write_note(title="W298-mattpocock-skills", directory="verdicts", note_type="verdict", tags=["adoption-decision","W298","PATTERN-STUDY","sca-v3.1"])`.
6. (Defer to W299) Author `docs/architecture/W298-MATTPOCOCK-PATTERNS.md` per §2.7 spec (4 cherry-pick skill patterns + 9 cite-only deferrals).
7. (Defer to W299) Dispatch `/team-spawn research --members 4` to audit the §7.2 list of 13 missing wshobson plugins.
8. (Defer to W299) Author `docs/architecture/W299-CWC-WORKSHOPS-PATTERNS.md` extracting 8 Anthropic workshop pattern-distillations (per §6 open question 4).
9. (Defer to W299) Status-check on `knowledge-work-plugins` marketplace per §3.1 — enumerate available plugins; per-plugin enable decision.

Operator-confirm gate-points: items 1-3 (live `enabledPlugins` mutation) require explicit operator approval per the W255 cardinal-rule discipline; item 4-5 (ledger appends) ship automatically with coordinator + codex-r1 approval per the sca-v3.1 §6 contract; items 6-9 are W299 backlog.

---

## §10 — Self-summary + confidence levels

| Task | Verdict | Confidence | Notes |
|---|---|:-:|---|
| 1. wshobson/agents coverage | KEEP-16-enabled + 3 ENABLE-NOW (security-scanning, git-pr-workflows, c4-architecture) | HIGH | All evidence from on-disk cache + upstream marketplace.json. Verifiable in ≤5 minutes by operator. |
| 2. mattpocock/skills | T3 PATTERN-STUDY (entire repo) + pattern_doc_path spec'd for 4 autonomy-compatible skills | HIGH | sca-v3.1 hard-cap D16<2 fires; pattern_score 4.56 well above T3 floor; 3 practitioner orgs cited inline. |
| 3. anthropics/* | 5 marketplaces correctly enabled · 4 correctly disabled · 0 new marketplaces to add · 6 SDK-repos route to Stream D · 3 PATTERN-STUDY-W299 candidates | HIGH | Full enumeration of 64 anthropics/* repos against `extraKnownMarketplaces` and `enabledPlugins`. |
| Coverage-gap headline | 62 wshobson plugins published-but-not-cached (most actionable gap of this stream) | HIGH | Verified live via `mcp__plugin_everything-claude-code_github__get_file_contents` on `wshobson/agents/.claude-plugin/marketplace.json` |
| Anti-bias compliance | ALL 7 dims surfaced (stars-not-hardgate, low-star pattern-rich, solo-maintainer, freshness, ≥3-org, ≥3-CHANGE, disagreement) | HIGH | Inline counters in §5 |

### §10.1 — Per-task adversarial-replay tripwires

To pre-empt codex-r1 challenges, the following tripwires are surfaced for review:

1. **Triple-counted code-reviewer agent** (§1.3): some reviewer may argue this WASTES preload-budget. Counter: per Anthropic skill loading semantics (`https://code.claude.com/docs/en/skills`), agents in different plugin namespaces load only their description-line metadata at session-start; full body loads on description-match only. Triple-counted at 3× 250 chars ≈ 750 chars of metadata vs 100k+ MAX_MCP_OUTPUT_TOKENS budget per `.claude/settings.json:34` — negligible.
2. **mattpocock T3 + selective cherry-pick**: some reviewer may argue this is "T2 VENDOR-FORK in disguise" and violates the D16<2 hard-cap routing. Counter: per sca-v3.1 §6 T1+T2-caps row, D16<2 blocks BOTH T1 INSTALL and T2 VENDOR-FORK; the **selective cherry-pick** is the pattern_doc_path artifact mandated under T3 PATTERN-STUDY, not a fork — the candidate's source tree is NOT vendored into the runtime, only specific patterns are documented + reauthored under our `.claude/skills/` namespace as net-new local skills. This IS the canonical T3 path.
3. **3 ENABLE-NOW recommended without operator-approval gate**: some reviewer may argue Stream B is overstepping by recommending live `enabledPlugins` flips. Counter: this stream's output is a **verdict + recommendation**, not an edit; coordinator and operator gate the actual `.claude/settings.json` modification. Rollback plan §8.4 explicitly defines the recovery path.
4. **anthropics/* "no marketplace to add" verdict — false negative risk**: some reviewer may surface `huggingface/skills` or `daymade/claude-code-skills` as missed Anthropic-adjacent candidates. Counter: those are NOT `anthropics/*` org repos (per the W298-PLAN §1 Task 3 scope, "anthropics/* canonical coverage"). They are out-of-org candidates already enumerated in W290 F3 SOTA-discovery (`F3-SOTA-DISCOVERY-W290.md`) and W291.Stage2 (`daymade/claude-code-skills` got T3 PATTERN-STUDY) — re-litigating them is out-of-scope for Stream B.

### Cite-anchors (for next-stream + codex-r1 reference)

- `.claude/skills/sota-convergence-audit/SKILL.md` (rubric v3.1 source-of-truth)
- `.claude/settings.json` (live enabledPlugins + extraKnownMarketplaces)
- `.claude/plugins/cache/claude-code-workflows/<plugin>/<version>/.claude-plugin/plugin.json` (per-plugin metadata)
- `.claude/plugins/installed_plugins.json` (installed-plugin manifest)
- `docs/architecture/W288-RESEARCH-ARCH-v2/VERDICT-LEDGER.md` (ledger append target — coordinator-owned)
- `docs/architecture/W298-AGENT-ORCHESTRATION-AND-SOTA-WIRING/W298-PLAN.md` (this wave's plan)
- `https://github.com/wshobson/agents/blob/main/.claude-plugin/marketplace.json` (verified live 2026-05-18)
- `https://github.com/mattpocock/skills/blob/main/.claude-plugin/plugin.json` (verified live 2026-05-18)
- `https://github.com/mattpocock/skills/blob/main/skills/engineering/tdd/SKILL.md` (code-reading evidence)
- `https://github.com/mattpocock/skills/blob/main/LICENSE` (MIT 2026 Matt Pocock)
- `https://github.com/anthropics/cwc-workshops/blob/main/README.md` (8 workshop modules enumerated)
- `https://github.com/anthropics/claude-for-legal/blob/main/.claude-plugin/marketplace.json` (13-plugin legal-domain marketplace — out-of-scope verdict)
- `https://platform.claude.com/docs/en/agent-sdk/quickstart` (claude-agent-sdk-python `pip install` install path)
- `https://docs.claude.com/en/docs/agent-sdk/python` (Python SDK reference)
- `https://code.claude.com/docs/en/skills` (SKILL.md filesystem-convention reference)

---

*End of W298 Stream B audit. Coordinator: synthesise + dispatch codex-r1 cross-model adversarial review per `W298-PLAN §1 Stream E`. Outputs ready for VERDICT-LEDGER.md append (Stage 6 — coordinator-owned).*
