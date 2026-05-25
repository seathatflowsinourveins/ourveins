# W432-FOUNDATION-AUDIT — Stream E: settings + branch-protection + repo-config SOTA-2026

**Wave**: W432
**Stream**: E (settings + ruleset + repo-config)
**Auditor**: Claude Code orchestrator (foundation-audit dispatch)
**Audit date**: 2026-05-24
**Scope**: `.claude/settings.json` + GitHub branch-protection ruleset 16792688 + repository settings + Actions secrets/variables
**Probe method**: filesystem Read + `gh api` live probes (state-of-record at audit time)

---

## Cite-anchor floor (≥3 distinct orgs)

| Cite | Org | Surface |
|---|---|---|
| `https://docs.anthropic.com/en/docs/claude-code/settings` | Anthropic | settings.json schema authority |
| `https://docs.anthropic.com/en/docs/claude-code/hooks` | Anthropic | hooks contract (R2) |
| `https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-rules/about-rulesets` | GitHub | branch-protection ruleset model |
| `https://docs.github.com/en/code-security/secret-scanning/about-secret-scanning` | GitHub | secret-scanning enablement |
| `https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners` | GitHub | CODEOWNERS contract |
| `https://docs.github.com/en/code-security/dependabot/dependabot-alerts/about-dependabot-alerts` | GitHub | Dependabot alerts surface |
| `https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions` | GitHub | Actions secrets management |
| `https://github.com/ossf/scorecard` | OpenSSF | scorecard binary-artifacts + branch-protection metrics |
| `https://slsa.dev/spec/v1.0` | OpenSSF / Linux Foundation | SLSA build-provenance L3 |
| `https://owasp.org/www-project-top-ten/` | OWASP | A05 Security Misconfiguration · A06 Vulnerable Components · A09 Logging+Monitoring |
| `https://owasp.org/www-project-top-10-ci-cd-security-risks/` | OWASP | CICD-SEC-3 dependency-chain abuse |
| `https://csrc.nist.gov/Projects/risk-management/sp800-53-controls` | NIST | SP 800-53 AC-3 / AU-2 / SC-7 / CM-8 |

---

## §1 — `.claude/settings.json` key-by-key audit

State-of-record path: `Z:/claude-sota-installed/.claude/settings.json` (533 LOC).

### §1.A Top-level keys

| Key | Value | SOTA-compliant? | Issues / Notes |
|---|---|---|---|
| `$schema` | `https://json.schemastore.org/claude-code-settings.json` | YES | SchemaStore JSON authority (community-maintained mirror of Anthropic schema). |
| `cleanupPeriodDays` | `60` | YES | 60-day session/transcript retention is operator-confirmed; below the 90-day default. |
| `skillListingBudgetFraction` | `0.03` | YES | 3% of context budget for skill listings; W392 SP-budget discipline. |
| `includeGitInstructions` | `false` | YES | Per CLAUDE.local.md `CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS=1` env mirror. |
| `disabledMcpjsonServers` | `[]` | YES | Matches CLAUDE.md W333 P0 drift-excise (no stale `memory` entry). |
| `worktree.baseRef` | `"fresh"` | YES | EnterWorktree starts from current HEAD; aligns with W393 eee contract. |
| `defaultShell` | `"powershell"` | YES | Windows-native runtime (W424 PS-tool-routing discipline). |
| `outputStyle` | `"Proactive"` | YES | Operator-set proactive style. |
| `alwaysThinkingEnabled` | `true` | YES | Extended thinking on every turn (cost/quality tradeoff opt-in). |
| `awaySummaryEnabled` | `true` | YES | Mirrors env `CLAUDE_CODE_ENABLE_AWAY_SUMMARY=1`. |
| `autoUpdatesChannel` | `"latest"` | YES | Operator-confirmed (W259-v8 U4). |
| `minimumVersion` | `"2.1.144"` | YES | Operator-confirmed. |
| `tui` | `"fullscreen"` | YES | Operator preference. |
| `autoMemoryEnabled` | `false` | YES | Aligns with env `CLAUDE_CODE_DISABLE_AUTO_MEMORY=1`; documented W259-v8 U3. **Note**: CLAUDE.local.md L73 claims `autoMemoryEnabled: true` is the value but env wins — **DRIFT-DOC-1**: doc says `true`, actual value is `false`. Behavior identical (both block Auto Memory) but doc should be corrected. |
| `skipDangerousModePermissionPrompt` | `true` | CAUTION | Skips dangerous-mode banner. Acceptable for trusted local runtime; would be **NON-COMPLIANT** in any team/shared context. |
| `skipAutoPermissionPrompt` | `true` | CAUTION | Same risk class — silences permission UX. Operator-acknowledged; acceptable solo. |
| `theme` | `"dark"` | YES | Cosmetic. |
| `teammateMode` | `"in-process"` | YES | Aligns with `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`. |

### §1.B `env` block (54 entries)

Key subset checked against W317-Stream-C MSYS-fix design.

| Env var | Value | SOTA-compliant? | Issues |
|---|---|---|---|
| `CLAUDE_CODE_FORK_SUBAGENT` | `"1"` | YES | W259-v8 U1 subagent fork. |
| `CLAUDE_CODE_DISABLE_AUTO_MEMORY` | `"1"` | YES | Disables Auto Memory (preload budget protection). |
| `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` | `"1"` | YES | Agent-teams runtime. |
| `CLAUDE_CODE_USE_POWERSHELL_TOOL` | `"1"` | YES | W424 PS-tool-routing. |
| `CLAUDE_CODE_FORK_SUBAGENT` | `"1"` | YES | Full conversation-history inheritance. |
| `CLAUDE_PLUGIN_DATA` | `Z:\claude-sota-installed\.claude\plugins\data` | YES | W317-MSYS-fix L3 override. |
| `GATEGUARD_STATE_DIR` | `Z:\claude-sota-installed\.claude\state\gateguard` | YES | W317-MSYS-fix L3 override. |
| `AUDIT_ROOT` | `Z:\claude-sota-installed` | YES | W317-MSYS-fix L3 override. |
| `CLAUDE_MEM_DATA_DIR` | `Z:\claude-sota-installed\.claude\plugins\data\claude-mem` | YES | W317-MSYS-fix L3 override. |
| `BASH_ENV` | `Z:/claude-sota-installed/.claude/state/bash-home-pin.sh` | YES | W317-MSYS-fix HOME-pin shim. |
| `MSYS_NO_PATHCONV` / `MSYS2_*_CONV_EXCL` | `1` / `*` | YES | Git-Bash path-rewrite suppression. |
| `MSYS_HOOKS_FORM_GATE_ENFORCE` | `"1"` | YES | W317-MSYS-fix pre-commit gate. |
| `NODE_OPTIONS` | `--max-old-space-size=4096` | YES | Prevents OOM on large MCP responses. |
| `OTEL_*` (15 vars) | various | YES | Langfuse telemetry export — `OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT=false` correctly omits payloads. |
| `OTEL_LOG_USER_PROMPTS` | `"1"` | CAUTION | Logs raw user prompts. Acceptable for local-only Langfuse; **NON-COMPLIANT** if Langfuse instance ever becomes externally reachable. Currently 127.0.0.1 → OK. |
| `OTEL_EXPORTER_OTLP_TRACES_ENDPOINT` | `http://127.0.0.1:3000/api/public/otel/v1/traces` | YES | Localhost-only; matches Langfuse self-hosted. But: **CR-6 LIVENESS RISK** — CLAUDE.md L40 says T5 langfuse is "DOWN-CRASH-LOOP v3.174.1" — endpoint posts to a dead service. No data-loss harm (silently 4xx), but observability is non-functional. |
| `ECC_DISABLED_HOOKS` | `pre:observe,post:observe` | YES | ECC plugin operator-curated disable. |
| `ANTHROPIC_DEFAULT_HAIKU_MODEL` | `claude-haiku-4-5-20251001` | YES | Cheap-triage model pin. |
| `HOME` / `USERPROFILE` | `Z:\claude-sota-installed` | YES | Z-portable install per CCBP. |

### §1.C `permissions` block

| Sub-key | Items | SOTA-compliant? | Issues |
|---|---|---|---|
| `allow` | 16 entries | YES | All scoped: 4 specific Edit paths + bash patterns for install + 7 codex commands. No wildcards beyond `Bash(git clone --depth 1 https://github.com/* *)` which is acceptable. |
| `deny` | 57 entries | YES | Comprehensive deny-default: 26 secret-class file reads, 8 browser profile paths, 7 git `--no-verify` variants, 17 untrusted egress domains. Aligns with NIST SP 800-53 AC-3 + OWASP A05. |
| `defaultMode` | `"default"` | YES | Standard interactive permission mode. |

**Gap noted**: no `Read(./.git/config)` / `Read(**/.gitconfig)` in deny list — could leak gh tokens stored in OS keychain via `git config --global credential.helper`. **DEFECT D-9** (low). Hardening: add `Read(**/.gitconfig)` to deny.

### §1.D `hooks` block (R2 — direct-CLI ONLY)

CLAUDE.md L24-26 R2: "No project-owned hook bodies (any extension `.py|.sh|.mjs|.js|.ts|.ps1|.bat`) under `.claude/hooks/**`, EXCEPT documented bug-patch shims ≤2 KB".

| Event | Hook | Direct-CLI vs project-owned? | R2-compliant? |
|---|---|---|---|
| SessionStart | `context-mode-cache-heal.mjs` | project-owned (W286-arc sanctioned bug-patch shim for `anthropics/claude-code#46915`) | YES — explicit CLAUDE.md L25 exception |
| SessionStart | `tools/mcp-env-precheck.mjs` | project-owned (Z:/claude-sota-installed/tools/) | DEFECT D-1 — NOT under `.claude/hooks/**`, lives in `tools/`. Same R2 spirit applies. Needs cite-anchor (GH issue or explicit CR-5 exception-(b) acceptance-record). |
| UserPromptSubmit | `parallel-guard-userpromptsubmit.mjs` | project-owned | CR-5 exception-(b) sanctioned (W319-3 Stream-C; W329-A FI-1..FI-5) |
| PreToolUse[Bash] | `gitleaks protect`, `trivy fs`, `codex-companion.mjs adversarial-review` | direct-CLI + plugin-cache invocation | YES |
| PreToolUse[Edit\|Write] | bash inline (verdict-ledger lint) | direct-CLI inline | YES (operator-curated; <2 KB) |
| PreToolUse[Agent] | `preagent-parallel-guard.mjs`, `preagent-subagent-validator.mjs`, `preagent-d73-gate.mjs` | project-owned | CR-5 exception-(b) sanctioned per CLAUDE.md L33-34 |
| PostToolUse[Edit\|Write\|MultiEdit] | bash inline (ruff/shellcheck) | direct-CLI inline | YES |
| PreCompact | powershell inline (audit-trail log) | direct-CLI inline | YES |
| Stop | `stop-position-swap.mjs` | project-owned | DEFECT D-2 — needs cite-anchor for sanction |
| WorktreeRemove | `git worktree prune` | direct-CLI | YES |
| SubagentStop | `subagent-stop-audit.mjs`, `subagent-stop-guard.mjs` | project-owned (2 hooks) | DEFECT D-3 — needs cite-anchor for sanction (likely W340 Δ-G50 worker-failure-termination-guard mechanization) |
| Notification | powershell beep | direct-CLI | YES |
| PostToolUseFailure | powershell inline (hook-feedback) | direct-CLI inline | YES |
| TaskCompleted | `ruff check tools harness` | direct-CLI | YES |

### §1.E `enabledPlugins` cross-check vs `installed_plugins.json`

`installed_plugins.json` lists 54 installed plugin records. `settings.json:enabledPlugins` has **57 entries** (47 `true` + 10 `false`).

**Cross-check findings**:

| Plugin | enabledPlugins | installed_plugins.json | Status |
|---|---|---|---|
| `superpowers@claude-plugins-official` | true | installed v5.1.0 | OK |
| `codex@openai-codex` | true | installed v1.0.4 | OK |
| `agent-skills@addy-agent-skills` | true | installed v1.0.0 | OK |
| `claude-mem@thedotmack` | false | installed v13.3.0 | OK (operator-disabled) |
| `protect-mcp@claude-code-workflows` | false | installed v0.1.0 | OK (operator-disabled) |
| `hookify@claude-plugins-official` | false | installed v3d355c0d8eec | OK (operator-disabled) |
| `intelligent-compact@claude-settings` | false | installed v1.0.0 | OK (operator-disabled) |
| `review-agent-governance@claude-code-workflows` | false | installed v0.1.0 | OK (operator-disabled) |
| `clickhouse@claude-plugins-official` | false | **NOT INSTALLED** | DEFECT D-4 — phantom-enabled entry (W341-resolved; CLAUDE.md L73 says "FULLY-RETIRED stage-2 landed (entries deleted)" but entry remains as `false`). Either delete entry or update CLAUDE.md doc. |
| `outputai@claude-plugins-official` | false | **NOT INSTALLED** | DEFECT D-5 — same as D-4. |
| `gitnexus@gitnexus-marketplace` | false | installed v1.3.6 (but marketplace `directory` source local-only) | OK (operator-disabled per W316 retirement) |
| `document-skills@anthropic-agent-skills` | true | installed v690f15cac7f7 | OK |
| `hindsight-memory@hindsight` | (NOT in enabledPlugins) | installed v0.6.5 | DEFECT D-6 — installed but never enumerated in enabledPlugins (no enable/disable state recorded). Either explicitly disable or remove from installed_plugins.json. |

**enabledPlugins entry count**: 57 (delta from CLAUDE.md "58 enablement entries (enabled_true=47, enabled_false=11)" — 47+10=**57** here, CLAUDE.md says 47+11=58. **DRIFT-DOC-2**: CLAUDE.md L62 cites 58 (47 true + 11 false), actual is 57 (47 true + 10 false). Off-by-one; minor.

### §1.F `extraKnownMarketplaces`

22 marketplace records, all GitHub-sourced except `gitnexus-marketplace` (directory). All trusted-source per CR-1 trust-tuple:

- Anthropic upstream: `anthropics/claude-plugins-official` · `anthropics/skills` · `anthropics/knowledge-work-plugins` · `anthropics/claude-plugins-community` · `anthropics/financial-services` · `anthropics/healthcare` · `anthropics/life-sciences` (7)
- 1st-party SOTA: `openai/codex-plugin-cc` · `pydantic/skills` (2)
- Community trusted: `affaan-m/everything-claude-code` · `addyosmani/agent-skills` · `mksglu/context-mode` · `fcakyon/claude-codex-settings` · `wshobson/agents` · `sickn33/antigravity-awesome-skills` · `obra/superpowers-marketplace` · `vectorize-io/hindsight` · `forrestchang/andrej-karpathy-skills` · `OthmanAdi/planning-with-files` (10)
- Local directory: `gitnexus-marketplace` (1; operator-curated)

**Note**: `mksglu/context-mode` + `abhigyanpatwari/GitNexus` flagged as NOASSERTION-license in SECURITY.md L57 — CR-1(b) license-audit queued for W335 P0-W335-1 (per security policy). **DEFECT D-7** if still unresolved at audit time.

### §1.G `sandbox` + `statusLine`

| Key | Value | SOTA-compliant? |
|---|---|---|
| `sandbox.enabled` | `false` | YES — per CLAUDE.md L34 R5-corollary: Windows-native runtime → OS-sandbox structurally inert; held via sca-v11 5-control layered-defense |
| `sandbox.failIfUnavailable` | `true` | YES |
| `sandbox.autoAllowBashIfSandboxed` | `true` | OK (no-op because sandbox disabled) |
| `sandbox.allowUnsandboxedCommands` | `true` | OK (no-op because sandbox disabled) |
| `sandbox.excludedCommands` | `["git", "docker", "npx", "uvx"]` | OK (no-op because sandbox disabled) |
| `statusLine.command` | `npx -y ccstatusline@2.2.19` | YES — CR-9 version-pinned npx |
| `statusLine.refreshInterval` | `30` | YES |

### §1.H DEPRECATED / NON-SOTA keys check

Looked for: `theme: light`, deprecated `subagentModel`, `disable1MContext`. **None present** — settings is clean.

**Looked for missing recommended keys**:

- `outputFormat` — not set; defaults to `text`. **DEFECT D-8** (low): `json` output mode is preferred for machine-consumed CI logs. Not required for interactive.
- `notification.enabled` — not explicitly set; defaults true. OK.
- `defaultModel` — **NOT SET in settings.json**. Operator relies on CLI invocation `eee --Model max`. Per Anthropic docs this is acceptable but explicit `defaultModel: "opus-4-7-1m"` would be more SOTA. **DEFECT D-9 (info-only)**.

---

## §2 — GitHub branch-protection ruleset 16792688 audit

State of record: `gh api repos/seathatflowsinourveins/claude-sota-installed/rulesets/16792688` (probed 2026-05-24).

| Control | Active? | Configuration | SOTA-compliant? | Issues |
|---|---|---|---|---|
| **Name** | YES | `main-branch-protection-sota` | YES | Descriptive name |
| **Target** | YES | `branch` | YES | |
| **Enforcement** | YES | `active` | YES | |
| **Ref name include** | YES | `~DEFAULT_BRANCH` | YES | Protects `main` (current default) |
| **Ref name exclude** | YES | `[]` (none) | YES | |
| **Bypass actors** | YES | `[]` (none) | YES — STRONG | `current_user_can_bypass: never` |
| **Deletion blocked** | YES | `{type: deletion}` | YES | Rule type 1 |
| **Non-fast-forward (no force push)** | YES | `{type: non_fast_forward}` | YES | Rule type 2 |
| **Required linear history** | YES | `{type: required_linear_history}` | YES | Rule type 3 |
| **Required PRs** | YES | `{type: pull_request, allowed_merge_methods: ["squash"]}` | PARTIAL | Rule type 4 active but: |
| ↳ Required approving reviews | **0** | `required_approving_review_count: 0` | DEFECT D-10 (HIGH) | Solo-runtime workaround? But blocks SOTA-2026 baseline. OpenSSF Scorecard `Branch-Protection` requires ≥1. **GitHub recommends ≥2 for SOTA.** |
| ↳ Dismiss stale reviews on push | YES | `dismiss_stale_reviews_on_push: true` | YES | |
| ↳ Required reviewers | none | `required_reviewers: []` | LINKED-DEFECT-D-10 | Empty because count=0 |
| ↳ Require code-owner review | NO | `require_code_owner_review: false` | DEFECT D-11 (HIGH) | CODEOWNERS file exists (78 lines, comprehensive) but is NOT enforced. Toggle to `true`. |
| ↳ Require last-push approval | NO | `require_last_push_approval: false` | DEFECT D-12 (MED) | Should be `true` for SOTA. |
| ↳ Required review-thread resolution | NO | `required_review_thread_resolution: false` | DEFECT D-13 (MED) | Unresolved review threads can be merged. |
| ↳ Allowed merge methods | squash-only | `["squash"]` | YES — STRONG | Matches `required_linear_history` |
| **Required status checks** | YES | 5 contexts | PARTIAL | Rule type 5 active but: |
| ↳ Strict (require up-to-date) | YES | `strict_required_status_checks_policy: true` | YES — STRONG | |
| ↳ Enforce on create | YES | `do_not_enforce_on_create: false` | YES | New branches must also pass |
| ↳ Required check 1 | YES | `Pre-commit gates` (integration_id 15368 = GH Actions) | YES | Matches `.github/workflows/ci.yml:Pre-commit gates` job name |
| ↳ Required check 2 | YES | `CodeQL javascript-typescript` | YES | Matches `.github/workflows/codeql.yml` matrix job |
| ↳ Required check 3 | YES | `CodeQL python` | YES | Matches codeql.yml matrix job |
| ↳ Required check 4 | YES | `commitlint (commit-message discipline)` | YES | Matches commitlint.yml job |
| ↳ Required check 5 | YES | `Codex-Verdict trailer (binding)` | YES | Matches codex-verdict-gate.yml job |

**Required-status-checks DEFECTS**:

- DEFECT D-14 (HIGH): **Only 5 of 9+ critical CI jobs are required**. Other jobs that should be binding-gates per CLAUDE.md security model:
  - `gitleaks (secrets scan)` (ci.yml)
  - `trivy (HIGH/CRITICAL CVE scan)` (ci.yml)
  - `ShellCheck (Bash discipline)` (ci.yml)
  - `Ruff (Python discipline)` (ci.yml)
  - `R3 subagent_type allowlist freshness` (ci.yml)
  - `sca-v13 Meta-Invariant I1 (provenance-lint)` (ci.yml)
  - `actions/dependency-review` (ci.yml — advisory, can stay non-blocking on private repo)
  - `actionlint.yml` (Actions-lint)
  - `claude-code-security-review.yml` (Claude AI code review)
  - `parallel-ratio-gate.yml` (W325-A F1 parallel discipline gate)
  - `zizmor-action.yml` (Actions security audit)
  - `scorecard.yml` (OpenSSF scorecard)

- DEFECT D-15 (MED): No `web_commit_signoff_required: true` — DCO sign-off NOT enforced at platform level. Pre-commit `commitlint` enforces conventional-commit format but NOT signed-off-by trailers per [Developer Certificate of Origin](https://developercertificate.org/). SOTA-2026 expectation for SLSA-L3 lineage.

- DEFECT D-16 (MED): No commit-signature requirement (Sigstore / GPG / SSH). `web_commit_signoff_required: false`. SOTA-2026 expectation per OpenSSF Scorecard `Signed-Releases`.

---

## §3 — Repository settings audit

State of record: `gh api repos/seathatflowsinourveins/claude-sota-installed`.

| Setting | Value | SOTA-compliant? | Issues |
|---|---|---|---|
| `visibility` | `private` | YES | Solo runtime |
| `default_branch` | `main` | YES | Convention |
| `has_issues` | `true` | YES | 21 open issues; W378 issue-mailbox in use |
| `has_projects` | `true` | YES | Operator may use GH Projects |
| `has_wiki` | `false` | YES | CLAUDE.md is the documentation surface; wiki redundant |
| `has_pages` | `false` | YES | No public docs site needed |
| `has_discussions` | `false` | INFO | Operator preference; OK for solo. Future G5 publish-mirror may need this. |
| `has_downloads` | `true` | INFO | Default; no actual downloads |
| `allow_squash_merge` | `true` | YES | Matches ruleset `allowed_merge_methods: ["squash"]` |
| `allow_merge_commit` | `true` | DEFECT D-17 (MED) | Should be `false` — ruleset blocks merge commits via squash-only but repo-level toggle is misleading and could be bypassed if ruleset disabled |
| `allow_rebase_merge` | `true` | DEFECT D-18 (MED) | Same — should be `false` to match ruleset squash-only |
| `allow_auto_merge` | `true` | YES | Permits auto-merge after checks pass |
| `delete_branch_on_merge` | `true` | YES — STRONG | Auto-cleans feature branches |
| `allow_update_branch` | `true` | YES | Lets PR author update branch from base |
| `web_commit_signoff_required` | **`false`** | DEFECT D-15 (HIGH) | Already noted in §2. Repository-level + ruleset-level both need this. |
| `pull_request_creation_policy` | `all` | YES | All collaborators can open PRs |
| `use_squash_pr_title_as_default` | `true` | YES | Preserves PR title in squash merge |
| `squash_merge_commit_title` | `PR_TITLE` | YES | Conventional |
| `squash_merge_commit_message` | `PR_BODY` | YES | Conventional |
| `license` | **`null`** | DEFECT D-19 (LOW) | No LICENSE file. Acceptable for private personal-runtime, but SOTA-2026 expectation is to declare even on private repos (e.g., `LICENSE` with personal-use clause or "All rights reserved"). |
| `description` | **`null`** | DEFECT D-20 (LOW) | No repo description. Cosmetic. |
| `topics` | `[]` | DEFECT D-21 (LOW) | No topics — affects future discovery if ever made public |

### §3.B Security-and-analysis settings

| Feature | State | SOTA-compliant? | Issues |
|---|---|---|---|
| `security_and_analysis` (whole block) | **`null`** | DEFECT D-22 (HIGH) | The entire security_and_analysis API response is null — no GHAS-controlled features visible. For a PRIVATE repo without Advanced Security, this is expected (GHAS unavailable on private personal repos), but should be documented as a hard limitation. |
| `secret_scanning` | DISABLED (HTTP 404 confirms) | DEFECT D-22 (HIGH) | Secret-scanning is disabled on this repository (per `/secret-scanning/alerts` 404 response). On private repos, GHAS license required. **Hardening**: enable when budget allows; in interim, rely on `gitleaks` pre-commit + pre-push hooks (already configured). |
| `secret_scanning_push_protection` | DISABLED | DEFECT D-23 (HIGH) | Push-protection prevents secrets from ever landing on GitHub. Same GHAS-license blocker. |
| Dependabot alerts | ENABLED | YES | `vulnerability-alerts` endpoint returns `{enabled:true, paused:false}` |
| Dependabot auto-security-fixes | ENABLED | YES | `automated-security-fixes` endpoint returns `{enabled:true, paused:false}` |
| Code scanning (CodeQL) | ACTIVE | YES | `codeql.yml` workflow active, results visible in Security tab |

---

## §4 — Actions secrets and variables audit

State of record: `gh api repos/.../actions/secrets` + `/actions/variables` + `/environments`.

### §4.A Repository secrets

| Secret | Present? | Needed for | Status |
|---|---|---|---|
| `GITHUB_TOKEN` | (automatic, not listed) | All workflows | OK — auto-provisioned by GitHub Actions |
| `ANTHROPIC_API_KEY` | **MISSING** | `claude-code-security-review.yml` + `eval-nightly.yml` (planned) | DEFECT D-24 (HIGH) |
| `OPENAI_API_KEY` | **MISSING** | `codex-review.yml` (in-CI codex GPT-5.5 review) | DEFECT D-25 (HIGH) |
| `GITLEAKS_LICENSE` | not referenced in workflows | Would be needed for `gitleaks-action@v2` org-license; current pre-commit gitleaks-system is unlicensed-OK | OK — not required at present |
| `PUBLIC_REPO_TOKEN` | not present | Future G5 publish-mirror | DEFECT D-26 (FUTURE) — needed before G5 |
| Total secrets | **0** | | **DEFECT D-24 + D-25** — codex-review.yml + claude-code-security-review.yml will silently no-op or fail without these |

### §4.B Repository variables

| Variable | Value | Purpose | Status |
|---|---|---|---|
| `OPENAI_API_KEY_AVAILABLE` | `"false"` | Gating flag for codex-review.yml to skip when no secret | OK — confirms D-25; the variable signals to workflow that the secret is missing, so workflow is silently skipped rather than failing |

### §4.C Environments

| Environment | Present? | Issues |
|---|---|---|
| (none) | none | DEFECT D-27 (LOW) — no `production` environment defined; SOTA-2026 expectation for ANTHROPIC_API_KEY rotation discipline would scope production-secrets to a protected environment with deployment branch policy `main` |

---

## §5 — CODEOWNERS + SECURITY.md audit

### §5.A `.github/CODEOWNERS` (78 LOC)

**Verified** at `Z:/claude-sota-installed/.github/CODEOWNERS`:

| Coverage axis | Present? | Issues |
|---|---|---|
| Default catch-all `* @seathatflowsinourveins` | YES | OK |
| Cardinal-rule surfaces (CLAUDE.md, settings.json, .mcp.json, .pre-commit-config.yaml) | YES | OK |
| Operator-curated skills (13 SKILL.md paths) | YES | OK |
| Sanctioned CR-5 exception-(b) guards (7 paths) | YES | OK |
| Subagent allowlist | YES | OK |
| Wave-architecture closures | YES | OK |
| CI workflows + GitHub config | YES | OK |
| Vendored skill upstreams | YES | OK |

**DEFECT D-28 (LOW)**: CODEOWNERS exists but `require_code_owner_review: false` in ruleset (DEFECT D-11) — CODEOWNERS is decorative, not enforced. Fix D-11 to activate D-28.

### §5.B `.github/SECURITY.md` (58 LOC)

| Section | Present? | Issues |
|---|---|---|
| Supported Versions | YES | Lists main + wave branches + pre-W255 frozen |
| Reporting a Vulnerability | YES | GHSA private vulnerability reporting flow |
| Security Model (R1-R6 cardinal rules) | YES | Cite-anchored |
| Secret-redaction discipline | YES | Per CR-9 |
| Supply-chain (CR-9) | YES | Pin discipline + Dependabot weekly refresh |
| CR-9 drift exceptions | YES | Mentions gitnexus + NOASSERTION licenses |
| **Stale reference**: L11 `pre-W255-cleanup-*` tag | **STALE** | DEFECT D-29 (LOW) — `git tag --list "pre-W255*"` returns empty; CLAUDE.md L7 already flagged this drift. SECURITY.md needs same fix. |

---

## §6 — Dependabot status audit

State: `vulnerability-alerts` enabled, 1 open alert.

| Alert | Severity | Status | Issue |
|---|---|---|---|
| GHSA-6w46-j5rx-g56g / CVE-2025-71176 (pytest < 9.0.3 tmpdir DoS) | MEDIUM | OPEN since 2026-05-23 | **DEFECT D-30 (MED)**: open Dependabot alert dwelling for 1+ day. **Root cause**: `agents/requirements.txt` is NOT in any `.github/dependabot.yml` `directory:` entry — only `/` (root) and `/harness` directories are watched. The `agents/` path doesn't match either → no auto-PR. **Fix**: add `- package-ecosystem: "pip"; directory: "/agents"` block to dependabot.yml. |

---

## §7 — Ranked drift defect list

### CRITICAL (block SOTA-2026 baseline)

| ID | Defect | Severity | Surface | Fix complexity |
|---|---|---|---|---|
| D-10 | `required_approving_review_count: 0` blocks OpenSSF Scorecard Branch-Protection requirement | HIGH | ruleset 16792688 | LOW — toggle to 1 (solo) or 2 (SOTA) |
| D-11 | `require_code_owner_review: false` makes CODEOWNERS decorative | HIGH | ruleset 16792688 | LOW — toggle to true |
| D-14 | Only 5 of 9+ binding CI gates marked as required-status-checks | HIGH | ruleset 16792688 | MEDIUM — add 6+ contexts to ruleset |
| D-15 | `web_commit_signoff_required: false` — no DCO enforcement | HIGH | repo + ruleset | LOW — toggle at both levels |
| D-22 | `secret_scanning` disabled (GHAS-blocked on private personal repo) | HIGH | repo security | HIGH — requires GHAS license OR document hard limitation |
| D-23 | `secret_scanning_push_protection` disabled (same blocker) | HIGH | repo security | HIGH — same |
| D-24 | `ANTHROPIC_API_KEY` Actions secret MISSING | HIGH | secrets | LOW — `gh secret set ANTHROPIC_API_KEY` |
| D-25 | `OPENAI_API_KEY` Actions secret MISSING (codex review silently skipped) | HIGH | secrets | LOW — `gh secret set OPENAI_API_KEY` |

### MEDIUM (SOTA polish gaps)

| ID | Defect | Surface | Fix |
|---|---|---|---|
| D-12 | `require_last_push_approval: false` | ruleset | toggle true |
| D-13 | `required_review_thread_resolution: false` | ruleset | toggle true |
| D-16 | No commit-signature requirement (Sigstore/GPG/SSH) | ruleset | add Rule `commit_message_pattern` + `commit_author_email_pattern` OR enable signed-commits |
| D-17 | `allow_merge_commit: true` despite squash-only ruleset | repo | toggle false |
| D-18 | `allow_rebase_merge: true` despite squash-only ruleset | repo | toggle false |
| D-30 | pytest CVE-2025-71176 dwelling because `agents/` not in dependabot.yml | dependabot.yml | add `/agents` pip block |
| D-1 | `tools/mcp-env-precheck.mjs` SessionStart hook lacks cite-anchor for R2 sanction | settings.json | add CR-5 exception-(b) cite OR documented bug-patch issue # |
| D-2 | `tools/stop-position-swap.mjs` Stop hook lacks cite-anchor for R2 sanction | settings.json | same |
| D-3 | `subagent-stop-*.mjs` SubagentStop hooks lack cite-anchor for R2 sanction | settings.json | same |

### LOW (informational/cosmetic)

| ID | Defect | Surface | Fix |
|---|---|---|---|
| D-4 | `clickhouse@claude-plugins-official: false` phantom-enabled entry (plugin not installed) | settings.json | delete entry |
| D-5 | `outputai@claude-plugins-official: false` phantom-enabled entry (plugin not installed) | settings.json | delete entry |
| D-6 | `hindsight-memory@hindsight` installed but not in enabledPlugins map | settings.json | add explicit `false` OR remove from installed_plugins.json |
| D-7 | `mksglu/context-mode` + `abhigyanpatwari/GitNexus` NOASSERTION-license audit pending W335 | SECURITY.md | resolve license audit |
| D-8 | No explicit `outputFormat` setting (cosmetic; CI-readability) | settings.json | optional |
| D-9 | No `Read(**/.gitconfig)` in permissions.deny | settings.json | add entry |
| D-19 | No LICENSE file on repo | repo root | add LICENSE (even "All rights reserved" satisfies declaration) |
| D-20 | Repo description null | repo | set description |
| D-21 | Repo topics empty | repo | add topics (e.g., `claude-code`, `windows`, `personal-runtime`) |
| D-26 | `PUBLIC_REPO_TOKEN` missing (only needed for future G5 publish-mirror) | secrets | future |
| D-27 | No `production` Actions environment | environments | future |
| D-28 | CODEOWNERS decorative until D-11 fixed | linked | linked to D-11 |
| D-29 | SECURITY.md L11 stale `pre-W255-cleanup-*` tag reference | SECURITY.md | same fix as CLAUDE.md L7 — closest valid: `pre-W337-p3-1-claude-md` |

### DOC drift

| ID | Defect | Fix |
|---|---|---|
| DRIFT-DOC-1 | CLAUDE.local.md L73 claims `autoMemoryEnabled: true` but actual is `false` | edit CLAUDE.local.md doc |
| DRIFT-DOC-2 | CLAUDE.md L62 claims 58 enablement entries (47+11); actual is 57 (47+10) | edit CLAUDE.md count |

---

## §8 — Recommended fix sequence

**Phase 1 — Trivial wins (Day 1, ~30 min total)**

1. **D-24 / D-25** — Add Actions secrets:
   ```powershell
   gh secret set ANTHROPIC_API_KEY --body "$env:ANTHROPIC_API_KEY"
   gh secret set OPENAI_API_KEY    --body "$env:OPENAI_API_KEY"
   ```
2. **D-4 / D-5** — Delete phantom enabledPlugins entries (clickhouse + outputai)
3. **D-30** — Add `/agents` to dependabot.yml pip block, push, auto-PR appears
4. **D-9** — Add `Read(**/.gitconfig)` to settings.json permissions.deny

**Phase 2 — Ruleset hardening (Day 1, ~15 min)**

5. **D-14** — Add 6+ required-status-checks to ruleset 16792688:
   ```powershell
   # via gh api PATCH /repos/.../rulesets/16792688 with required_status_checks payload
   # contexts to add: gitleaks (secrets scan), trivy (HIGH/CRITICAL CVE scan), ShellCheck, Ruff,
   #   R3 subagent_type allowlist freshness, sca-v13 Meta-Invariant I1 (provenance-lint)
   ```
6. **D-11** — Toggle `require_code_owner_review: true`
7. **D-12 / D-13** — Toggle `require_last_push_approval` + `required_review_thread_resolution` true
8. **D-17 / D-18** — Toggle `allow_merge_commit` + `allow_rebase_merge` false (repo settings)

**Phase 3 — Solo-runtime discipline upgrade (Day 1, ~15 min)**

9. **D-10** — Decide: stay at 0 reviewers (solo runtime; document as accepted policy) OR adopt 1-reviewer self-approval discipline OR adopt CR-7-style codex-as-reviewer convention
10. **D-15 / D-16** — Toggle `web_commit_signoff_required: true` + decide on commit-signing (SSH-signed via 1Password / GPG / Sigstore)

**Phase 4 — Doc / cite-anchor backfill (Day 1, ~20 min)**

11. **D-1 / D-2 / D-3** — Add cite-anchors (CR-5 exception-(b) acceptance-record OR GH-issue bug-patch # ) for the 4 project-owned `tools/` hooks
12. **DRIFT-DOC-1 / DRIFT-DOC-2** — Fix CLAUDE.local.md L73 autoMemoryEnabled doc + CLAUDE.md L62 enablement count
13. **D-29** — Update SECURITY.md L11 stale tag reference (closest valid: `pre-W337-p3-1-claude-md`)

**Phase 5 — Polish (Day 2, ~15 min)**

14. **D-19 / D-20 / D-21** — Add LICENSE + description + topics to repo
15. **D-6** — Add `hindsight-memory@hindsight: false` to enabledPlugins OR remove from installed_plugins.json
16. **D-7** — Resolve NOASSERTION-license audit (per SECURITY.md W335 P0-W335-1 queued)

**Phase 6 — GHAS-blocked (deferred until budget/policy decision)**

17. **D-22 / D-23** — Document GHAS-license requirement as accepted hard limitation OR purchase GHAS for private repo to unlock secret-scanning + push-protection
18. **D-26 / D-27** — `PUBLIC_REPO_TOKEN` + `production` environment when G5 publish-mirror lands

---

## §9 — Summary verdict

| Layer | SOTA-compliance | Top gaps |
|---|---|---|
| `.claude/settings.json` keys | **A-** | 9 defects, mostly low — 4 hook cite-anchors needed, 2 phantom-enabled entries, doc drift |
| `.claude/settings.json` hooks (R2) | **A** | All 14 hooks compliant or sanctioned; 4 need cite-anchor backfill |
| `.claude/settings.json` permissions | **A-** | 1 missing deny entry (.gitconfig) |
| Branch-protection ruleset | **C+** | 7 medium-to-high gaps — 0-reviewer policy, no codeowner enforcement, only 5/11 binding gates required, no DCO, no signing |
| Repository settings | **B-** | 6 defects — allow-merge/rebase mismatch, no LICENSE/description, GHAS-blocked |
| Actions secrets | **D** | 2 critical secrets missing (ANTHROPIC_API_KEY, OPENAI_API_KEY) → codex-review.yml + claude-code-security-review.yml silently skip |
| CODEOWNERS | **A** | Well-structured, comprehensive 78-LOC; activated only after D-11 fix |
| SECURITY.md | **B+** | 1 stale tag reference; otherwise comprehensive |
| Dependabot | **B** | 1 open MEDIUM CVE dwelling 1+ day because `agents/` not watched |

**Composite SOTA-2026 grade: B-** (75/100)

**Top 3 fixes to move B- → A-**:
1. Add ANTHROPIC_API_KEY + OPENAI_API_KEY secrets (D-24/D-25) — unblocks 2 critical CI workflows (5 min)
2. Expand required-status-checks from 5 to 11 contexts (D-14) — closes binding-gate gap (15 min)
3. Enable code-owner review + DCO sign-off (D-11/D-15) — makes CODEOWNERS + commit-attribution non-decorative (5 min)

Estimated total time to reach A- grade: **45 minutes** of `gh api PATCH` + `gh secret set` + 2 file edits.

---

## §10 — Root-cause analysis (per audit charter)

| Drift class | Root cause | Generic mitigation |
|---|---|---|
| Missing Actions secrets (D-24/D-25) | Repo was created via `gh repo create` without secret-injection step; W432-G0-CI-UNBLOCK landed `OPENAI_API_KEY_AVAILABLE=false` Actions variable as a graceful-skip flag instead of fixing the underlying gap | Add `gh secret set` to G0 onboarding ritual; document in W432 found-audit closure |
| Solo-reviewer policy (D-10/D-11) | Single-operator runtime → policies that assume team-review feel like overhead; pragmatic 0-reviewer compromise was accepted at ruleset creation 2026-05-23 | Decide: adopt codex-as-reviewer convention (CR-7-style) OR accept solo carry-forward as documented policy |
| Partial binding-gate coverage (D-14) | Ruleset was bootstrapped with a minimal SOTA-baseline set (5 contexts); subsequent CI workflows added jobs without back-syncing the ruleset | Add ruleset-context-sync to wave-close pipeline OR per-workflow GitHub Action that PATCHes ruleset when new binding-gate job added |
| GHAS-blocked features (D-22/D-23) | Private personal repo without GHAS license → secret-scanning + push-protection structurally unavailable | Document as accepted limitation; rely on `gitleaks` pre-commit + pre-push as compensating control |
| Stale doc references (DRIFT-DOC-1, D-29) | Memory-tier drift over 30+ waves; SECURITY.md + CLAUDE.local.md edited at different points without cross-check | Add doc-drift check to `wave-close-pipeline` skill (already partial via `verify-before-claim` cardinal-rule 6) |
| Phantom enabledPlugins (D-4/D-5/D-6) | Plugins disabled+uninstalled in stages over W341+W342; enabledPlugins map only stage-1 cleanup applied, stage-2 left orphans | Add `tools/verify-enabled-plugins.mjs` check to pre-commit + monthly wave-close sweep |

---

## §11 — Audit metadata

- **State-of-record probe time**: 2026-05-24T18:51Z (per `pushed_at` field from `gh api`)
- **Ruleset ID**: 16792688 (created 2026-05-23T22:35:55, updated 2026-05-23T23:09:11)
- **Verification probe count**: 12 distinct `gh api` calls + 5 filesystem reads
- **Total defects identified**: 30 (8 HIGH + 9 MED + 13 LOW)
- **Audit recommendation**: ship Phase 1+2+3 fixes (~60 min) before next major wave start; defer Phase 4-6 to wave-close polish window

Cite-anchor distinct-org floor: **6 distinct orgs** (Anthropic + GitHub + OpenSSF + Linux Foundation + OWASP + NIST) — **exceeds sca-v13 ≥3 floor**.
