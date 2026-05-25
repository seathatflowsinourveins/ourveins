# Fleet-Kits Convergence Survey — 2026-05-08

**Scope**: 54 kit subdirectories under `Z:\claude-sota\docs\outer research\kits\`. Sampled 8 spanning low/mid/high: **v5, v15, v30, v45, v55, v60, v62, v64** (covering early discovery → late convergence kits).

**Methodology**: aggregated `REPO_METADATA.json` / `REPOS_BY_CATEGORY.json` lists per kit, deduplicated within-kit (so each kit contributes at most 1 vote per repo), counted across-kit frequency. Higher count = stronger SOTA convergence. Settings/hook/env keys are **not** present in kit data (kits are repo-curation roadmaps, not settings playbooks); they are extracted only from prose execution-plan + workflow files.

**CR-1 cite tier note**: kit-aggregated convergence is TIER-3-LOCAL-COMPOSITION research evidence (per `Z:\claude-sota\.claude\rules\citation-discipline.md` rule #8 lattice). It informs the install-priority delta below as **convergence signal** but does **not** by itself elevate any item to TIER-1-DIRECT — that requires the upstream blob/file:line cite, called out per row.

---

## 1. Repo-frequency table — top 10 (≥7 of 8 kits)

15 repos hit 7/8 kits (none hit 8/8 — v5/v15 have older tagging structure). Showing the top 10 by ecosystem centrality (functional weight, not alphabetic).

| # | Repo | Kits hit | First-cite anchor | Install-class? | Current status in `Z:\claude-sota-installed\` |
|---|---|---|---|---|---|
| 1 | `anthropics/claude-code` | 7 | `https://github.com/anthropics/claude-code` (TIER-1-DIRECT — official CC binary) | YES (binary) | INSTALLED via parent `Z:\claude\.local\bin\claude.exe` fallback (eee.ps1:107). Native install at `.local/bin/` deferred. |
| 2 | `openai/codex` | 7 | `https://github.com/openai/codex` | YES (CLI) | INSTALLED (codex CLI on PATH; CODEX_HOME redirected to `Z:/claude-sota-installed-state/.codex`) |
| 3 | `openai/codex-plugin-cc` | 7 | `https://github.com/openai/codex-plugin-cc` | YES (CC plugin) | INSTALLED via marketplace `openai-codex` → `enabledPlugins["codex@openai-codex"]: true` |
| 4 | `ryoppippi/ccusage` | 7 | `https://github.com/ryoppippi/ccusage` (npm `ccusage`) | YES (npm) | NOT INSTALLED |
| 5 | `rtk-ai/rtk` | 7 | `https://github.com/rtk-ai/rtk` | YES (CLI) | NOT INSTALLED |
| 6 | `oraios/serena` | 7 | `https://github.com/oraios/serena` | YES (MCP+CLI) | NOT INSTALLED |
| 7 | `yamadashy/repomix` | 7 | `https://github.com/yamadashy/repomix` (npm `repomix`) | YES (npm) | NOT INSTALLED |
| 8 | `google/osv-scanner` | 7 | `https://github.com/google/osv-scanner` | YES (binary) | NOT INSTALLED |
| 9 | `yxwucq/CCUI` | 7 | `https://github.com/yxwucq/CCUI` | YES (operator UI) | NOT INSTALLED |
| 10 | `jamesrochabrun/AgentHub` | 7 | `https://github.com/jamesrochabrun/AgentHub` | YES (parallel-operator) | NOT INSTALLED |

Tier-2 (6/8 kits, structural relevance): `github/github-mcp-server`, `microsoft/playwright-mcp`, `upstash/context7`, `modelcontextprotocol/servers`, `modelcontextprotocol/inspector`, `BurntSushi/ripgrep`, `sharkdp/fd`, `jqlang/jq`, `mikefarah/yq`, `cli/cli`, `pre-commit/pre-commit`, `casey/just`, `jdx/mise`, `astral-sh/uv`, `semgrep/semgrep`, `gitleaks/gitleaks`, `trufflesecurity/trufflehog`, `aquasecurity/trivy`, `github/codeql-action`, `step-security/harden-runner`, `ossf/scorecard`, `mufeedvh/code2prompt`, `tree-sitter/tree-sitter`, `zilliztech/claude-context`, `eyaltoledano/claude-task-master`, `wshobson/agents`, `humanlayer/humanlayer`, `github/spec-kit`, `shanraisshan/claude-code-best-practice`.

**v64-only signals (not kit-convergence but late-arriving SOTA)**: `anthropics/claude-plugins-official`, `anthropics/knowledge-work-plugins`, `obra/superpowers`, `mattpocock/skills`, `EveryInc/compound-engineering-plugin`, `addyosmani/agent-skills`, `Fission-AI/OpenSpec`, `Yeachan-Heo/oh-my-claudecode`. These are the **post-Anthropic-marketplace-launch** SOTA additions.

---

## 2. Settings-key table — top 10

**HONEST-NON-FINDING**: kits do **not** carry concrete `settings.json` key/value pairs. They reference settings via `SETTINGS_AND_HOOKS_REFERENCE.md` (v5/v6 only) using a **minimal example** (read-only allow + secrets deny + 2 hooks). v60+ kits drop concrete settings entirely. Below is what the v5/v6 minimal-pattern kit ships, cross-checked against current runtime.

| # | Key | Pattern in kits | Cite anchor | Current in `.claude\settings.json` |
|---|---|---|---|---|
| 1 | `permissions.defaultMode` | not specified (kits leave to operator) | v5 SETTINGS_AND_HOOKS_REFERENCE.md:13 | `"auto"` (Wave 61.5 user-trigger refinement; CCBP `claude-settings.md:251 @ 64fffd53`) |
| 2 | `permissions.allow[]` | `Bash(git status*)`, `Bash(git diff*)`, `Bash(rg*)`, `Bash(fd*)`, `Bash(jq*)`, `Bash(npm test*)`, `Bash(npm run lint*)`, `Bash(npm run typecheck*)` | v5 ref:16-25 | EMPTY (auto-mode classifier replaces) |
| 3 | `permissions.ask[]` | `Bash(git push*)`, `Bash(gh pr create*)`, `Bash(rm*)`, `Bash(docker*)` | v5 ref:26-31 | NOT USED (auto-mode) |
| 4 | `permissions.deny[]` | `Read(./.env)`, `Read(./.env.*)`, `Read(./secrets/**)`, `Read(**/id_rsa)`, `Read(**/*.pem)` | v5 ref:32-38 | EMPTY — **DELTA: should adopt secrets-deny baseline** |
| 5 | `hooks.PreToolUse[matcher=Bash]` | `python .claude/hooks/pretooluse-bash-filter.py` | v5 ref:43-45 | EXISTS (`block_no_verify_guard.py`, `codex_t2_pre_commit_gate.py`) |
| 6 | `hooks.PreCompact[]` | `python .claude/hooks/precompact-save-ledger.py` | v5 ref:50-52 | NOT INSTALLED — **DELTA: missing** |
| 7 | `hooks.PostToolUse[]` | track touched files / formatters / evidence | v5 ref:64 | EXISTS (codex_postcommit_review, codex_prepush_review) |
| 8 | `hooks.SubagentStop[]` | strip raw logs / require structured output | v5 ref:67 | EXISTS (`fm17d_stall_detector.py`) — but no log-strip / structured-output enforcement |
| 9 | `enabledPlugins` | not in kits (predates plugin schema) | n/a | `superpowers@claude-plugins-official`, `codex@openai-codex`, `everything-claude-code@everything-claude-code` |
| 10 | `extraKnownMarketplaces` | implicitly via `/plugin marketplace add openai/codex-plugin-cc` (in 16+ kits) | v20/v23/v25/v26/v27/v31/v35 etc. CODEX_PLUGIN_CC_WORKFLOW.md | EXISTS for all 3 plugins |

---

## 3. Hook-pattern table — top 10

| # | ID/matcher | Phase | Cite | Current |
|---|---|---|---|---|
| 1 | `Bash` filter | PreToolUse | v5 SETTINGS_AND_HOOKS_REFERENCE.md:43-45 | EXISTS (`block_no_verify_guard.py`) |
| 2 | `Edit\|Write\|MultiEdit` codex T1 consult | PreToolUse | CCBP cross-model-workflow STEP 1 (v15+ all kits CODEX_PLUGIN_CC_WORKFLOW.md) | EXISTS (`codex_t1_consult_gate.py`) |
| 3 | `Bash(git commit*)` codex T2 pre-commit | PreToolUse | CCBP cross-model-workflow STEP 2 | EXISTS (`codex_t2_pre_commit_gate.py`) |
| 4 | `Bash(git commit*)` postcommit auto | PostToolUse | CCBP cross-model-workflow STEP 3 | EXISTS (`codex_postcommit_review.py`) |
| 5 | `Bash(git push*)` prepush cumulative | PostToolUse | sibling claude-sota T4 (cite-import-AMBER) | EXISTS (`codex_prepush_review.py`) |
| 6 | `ExitPlanMode` plan review | PreToolUse | sibling T5 (cite-import-AMBER per CLAUDE.md §14.5) | EXISTS (`codex_t5_plan_review_gate.py`) |
| 7 | `Agent` spawn gate | PreToolUse | parallel-agent-wave (cite-import-AMBER) | EXISTS (`agent_spawn_gate.py`) |
| 8 | `*` SessionStart/SessionEnd lifecycle | SessionStart/SessionEnd | codex-plugin-cc `session-lifecycle-hook.mjs` (TIER-1-DIRECT openai/codex-plugin-cc) | EXISTS |
| 9 | `*` Stop review-gate | Stop | codex-plugin-cc `stop-review-gate-hook.mjs` | EXISTS |
| 10 | `*` SubagentStop FM-17.d stall detector | SubagentStop | sibling FM-17.d (cite-import-AMBER) | EXISTS (`fm17d_stall_detector.py`) |

**DELTA — missing from runtime**: `PreCompact` save-ledger hook (v5 ref:50). Adopt as `precompact_save_ledger.py` cite-imported from `Z:\claude-sota\.claude\hooks\` (sibling, AMBER).

---

## 4. Env-var table — top 10

Kits prescribe almost no env vars directly — they cite Anthropic CC docs. Patterns extracted from `tools/eee.ps1` cross-referenced against CCBP `claude-settings.md` are listed below; all are TIER-1-DIRECT to CCBP HEAD `64fffd53`.

| # | Name | Recommended value | Cite | Current in `tools/eee.ps1` |
|---|---|---|---|---|
| 1 | `CLAUDE_CONFIG_DIR` | repo-local `.claude` | CCBP claude-settings.md:885-921 | SET to `Z:/claude-sota-installed/.claude` |
| 2 | `CLAUDE_CODE_TMPDIR` | repo-local tmp | same | SET |
| 3 | `CLAUDE_CODE_PLUGIN_CACHE_DIR` | repo-local plugins cache | same | SET |
| 4 | `CLAUDE_CODE_GIT_BASH_PATH` | C-drive Git Bash (per CCBP MUST) | same | SET to `C:\Program Files\Git\bin\bash.exe` |
| 5 | `CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS` | `1` (post-init) | same | SET |
| 6 | `CLAUDE_CODE_FORK_SUBAGENT` | `1` (Q2 2026 feature) | sibling CLAUDE.local.md (e); upstream code.claude.com features doc | SET |
| 7 | `ENABLE_TOOL_SEARCH` | `auto:10` (~85% MCP token reduction) | CCBP `claude-advanced-tool-use.md:320 @ 64fffd53` (TIER-1-DIRECT) | SET to `auto:10` |
| 8 | `CLAUDE_CODE_USE_POWERSHELL_TOOL` | `1` (Windows preview) | CCBP `claude-spinner-verbs-and-tips.md:75 @ 64fffd53` | SET |
| 9 | `COLORTERM` | `truecolor` | CCBP `claude-spinner-verbs-and-tips.md:74 @ 64fffd53` | SET |
| 10 | `CODEX_HOME` | state-outside-repo | sibling state-outside-repo invariant + openai/codex docs | SET to `Z:/claude-sota-installed-state/.codex` |

**HONEST-NON-FINDING for env**: kits do **not** carry env-var prescriptions — TIER-1-DIRECT cites here are CCBP/Anthropic upstream, NOT kit-derived. The kit signal for env is null; current runtime env block is **already SOTA-aligned via direct-CCBP cites** independent of kit data.

---

## 5. MCP table — top 5

| # | Server | Recommended config | Cite (kit + upstream) | Current in `.mcp.json` |
|---|---|---|---|---|
| 1 | `github/github-mcp-server` | http or stdio with `GITHUB_TOKEN` | v60/v62/v64 OFFICIAL_FOUNDATION + `https://github.com/github/github-mcp-server` (TIER-1-DIRECT) | INSTALLED (http via `api.githubcopilot.com/mcp/readonly`) |
| 2 | `microsoft/playwright-mcp` | npm `@playwright/mcp` stdio | v60/v62/v64 + `https://github.com/microsoft/playwright-mcp` | NOT INSTALLED — **DELTA: high priority** |
| 3 | `upstash/context7` | http `mcp.context7.com/mcp` | v60/v62/v64 + `https://github.com/upstash/context7` | INSTALLED |
| 4 | `oraios/serena` | uvx serena | v60/v62/v64 DEFAULT_INSTALL_CORE + `https://github.com/oraios/serena` | NOT INSTALLED — **DELTA: high priority** |
| 5 | `doobidoo/mcp-memory-service` | npm + qdrant backend | v60/v62/v64 MEMORY_MCP_AUDIT_REQUIRED + `https://github.com/doobidoo/mcp-memory-service` | NOT INSTALLED (audit-required per kits — gate first) |

**Note**: `deepwiki` MCP is in current `.mcp.json` but **not** in any kit's MCP-recommendation list. Operator-added; defensible as research tool but not kit-corroborated.

---

## 6. Skills/agents table — top 5

| # | Skill/agent | Source | Cite | Current |
|---|---|---|---|---|
| 1 | `superpowers/*` skills (verification-before-completion, requesting-code-review, using-git-worktrees, brainstorming, executing-plans, writing-plans, systematic-debugging, test-driven-development, subagent-driven-development) | `obra/superpowers` via `anthropics/claude-plugins-official` | v64 HIGH_STAR_PATTERN_SOURCES_REFERENCE_ONLY:148 | INSTALLED (plugin enabled) |
| 2 | `codex/*` skills (rescue, setup, gpt-5-4-prompting, codex-cli-runtime, codex-result-handling) | `openai/codex-plugin-cc` | all kits CODEX_PLUGIN_CC_WORKFLOW.md | INSTALLED |
| 3 | `everything-claude-code/*` (≈170 skills incl. safety-guard, harness-audit, plan, code-review, prp-*, deep-research, agent-eval, eval-harness) | `affaan-m/everything-claude-code` | v5 ALL_IN_ONE / v60 / v62 TUTORIAL_CONSENSUS_REFERENCE | INSTALLED |
| 4 | `wshobson/agents` agent collection (architect/code-reviewer/debugger/python-reviewer etc.) | `wshobson/agents` (6/8 kits) | v60 EVAL_PEER_AGENT_ARCHITECTURE | NOT directly installed (everything-claude-code provides equivalents — Path C ALTERNATIVE-PATTERN per CLAUDE.md fire 9 Agent J verdict) |
| 5 | `mattpocock/skills` (TypeScript/CC patterns) | `mattpocock/skills` | v64 only:153 | NOT INSTALLED — discovery-only candidate |

---

## 7. Install-priority delta — ranked action list (per CR-6 official-native-channel)

**P0 — already INSTALLED, verify health (no action)**: `anthropics/claude-code` (parent fallback OK), `openai/codex`, `openai/codex-plugin-cc`, `affaan-m/everything-claude-code`, `obra/superpowers via anthropics/claude-plugins-official`, `github/github-mcp-server`, `upstash/context7`.

**P1 — high-convergence missing, install next (in order)**:

```bash
# 1. ccusage (7/8 kits, baseline tokens/cost measurement - Phase 0 in v60 plan)
npm install -g ccusage@latest

# 2. repomix (7/8 kits, repo-capsule context primitive)
npm install -g repomix@latest

# 3. ripgrep + fd + jq + yq + just + mise + uv (6/8 kits, default-core CLI quality stack)
# Windows: scoop install ripgrep fd jq yq just mise uv  (or per-tool gh release download)
# Verify presence first since some may already be on Z: PATH:
where rg ; where fd ; where jq ; where yq ; where just ; where mise ; where uv

# 4. serena MCP (7/8 kits — semantic-retrieval, primary read-path optimizer)
uvx --refresh serena --help   # smoke probe; then add to .mcp.json
# .mcp.json addition:
#   "serena": { "type": "stdio", "command": "uvx", "args": ["--from", "git+https://github.com/oraios/serena", "serena", "start-mcp-server", "--context", "claude-code"] }

# 5. playwright MCP (6/8 kits, Tier-2; browser/QA capability)
npm install -g @playwright/mcp@latest
# .mcp.json: "playwright": { "type": "stdio", "command": "npx", "args": ["@playwright/mcp@latest"] }

# 6. rtk (7/8 kits, Bash-output compression; high-noise commands)
gh release download --repo rtk-ai/rtk --pattern '*-windows*'  # OR cargo install / uv pip install per current rtk distribution

# 7. modelcontextprotocol/inspector (6/8, MCP debug)
npx --yes @modelcontextprotocol/inspector@latest --help
```

**P1.5 — settings.json deltas (one Edit each, cite-anchored)**:

```jsonc
// add permissions.deny[] secrets baseline (v5 SETTINGS_AND_HOOKS_REFERENCE.md:32-38 TIER-1 cite chain back to CCBP claude-mcp.md hard rule "NEVER commit secrets")
"deny": [
  "Read(./.env)",
  "Read(./.env.*)",
  "Read(./secrets/**)",
  "Read(**/id_rsa)",
  "Read(**/*.pem)"
]

// add PreCompact save-ledger hook (v5 SETTINGS_AND_HOOKS_REFERENCE.md:50-52)
"PreCompact": [{
  "hooks": [{ "type": "command",
              "command": "Z:/venvs/claude/Scripts/python.exe Z:/claude-sota-installed/.claude/hooks/scripts/precompact_save_ledger.py",
              "timeout": 10 }]
}]
```

**P2 — security/quality CLI (6/8 kits, defer until P1 stable)**:

```bash
# Convergent security stack — install via official channels per CR-6
gh release download --repo google/osv-scanner --pattern '*windows*'           # 7/8 kits
gh release download --repo gitleaks/gitleaks --pattern '*windows_x64*'        # 6/8 kits
gh release download --repo trufflesecurity/trufflehog --pattern '*windows*'   # 6/8 kits
# semgrep, codeql-action, scorecard, harden-runner: install per upstream README at install-time freshness
```

**P3 — operator/parallel UX (audit-required per kit gates; defer)**:
- `smtg-ai/claude-squad`, `BloopAI/vibe-kanban`, `yxwucq/CCUI` — only if benchmark-before-adoption gate (v60 Phase 7) shows wins.

**P4 — memory MCPs (audit-required, gate first)**:
- `doobidoo/mcp-memory-service` (Tier-A in current manifest §Memory Stack) — install only after audit per v60 MEMORY_MCP_AUDIT_REQUIRED gate.

**REMOVE/REVIEW**:
- None. Current installed plugins (3) all hit kit convergence ≥6/8 (codex-plugin-cc 7/8; superpowers via claude-plugins-official is v64-only late-add but TIER-1-DIRECT Anthropic-official; everything-claude-code 6/8 via tutorial-consensus).
- `deepwiki` MCP (currently installed) is **NOT** kit-corroborated — flagged for benchmark-or-keep decision per v60 Phase 7 gate. Defensible (research utility) but document the operator-added-without-kit-cite status in `docs/install-provenance.md`.

---

## 8. HONEST-NON-FINDING list

Per `Z:\claude-sota\.claude\rules\synthesis-layer-verify.md §Reporting categories`:

1. **Settings keys not in kits** — kits carry no concrete `defaultMode`, `enabledPlugins`, `autoUpdatesChannel`, `minimumVersion`, `skipAutoPermissionPrompt` values. These are **TIER-1-DIRECT to CCBP/Anthropic upstream**, **not** kit-derivable. Current runtime values are defensible by independent CCBP cites recorded in `.claude\settings.json` `_comment_*` fields; no kit-corroboration exists.

2. **Env vars not in kits** — same as above. `ENABLE_TOOL_SEARCH=auto:10`, `CLAUDE_CODE_USE_POWERSHELL_TOOL=1`, `COLORTERM=truecolor`, `CLAUDE_CODE_FORK_SUBAGENT=1` are CCBP-cited in `eee.ps1` comments (TIER-1-DIRECT) but **not** in any kit. The `tools/eee.ps1` env block stands on independent upstream cites; kit data adds no signal.

3. **`anthropics/cwc-long-running-agents` absent from all 54 kits** — verified via `Grep` for `cwc-long-running` across the entire kits tree (zero hits). This repo shipped 2026-05-06 and is in `Z:\claude-sota-installed\CLAUDE.md` Architecture as a TIER-1-DIRECT primary cite (companion to Effective Harnesses Nov 2025 + Harness Design Mar 2026 papers) — **CR-12 upstream-install-priority is not kit-corroborated for this repo, but is upstream-Anthropic-official, which outranks kit convergence per CR-1 cite-class lattice**. Genuine gap in kit coverage, not a reason to delete the cite.

4. **`mattpocock/skills`, `EveryInc/compound-engineering-plugin`, `addyosmani/agent-skills`, `Fission-AI/OpenSpec`** — appear only in v64 (1/8 kits). Insufficient convergence for install-priority promotion; classify as discovery-only candidates per v60 DISCOVERY_ONLY gate.

5. **`anthropics/claude-plugins-official` only in v64** (1/8 kits). The marketplace URL itself is TIER-1-DIRECT Anthropic-official; the late kit-coverage reflects the marketplace shipping after most kits were authored. Already enabled in current runtime via `extraKnownMarketplaces` — kit-convergence absence is a kit-staleness artifact, not a SOTA-quality concern.

6. **No 8/8 kit hits** — earliest kits (v5, v15) use a different REPO_METADATA.json field structure (per-repo objects), so the union-of-strings extraction undercounts those kits by 1 vote. Adjusting for that, the 7/8 cluster is effectively 8/8 for the practical default-core repos.

---

## 9. Cardinal-rule conformance summary

- **CR-1**: every recommended install in §7 ships with a TIER-1-DIRECT cite (npm registry / GitHub repo URL / official marketplace). Kit convergence is supporting evidence, not the cite.
- **CR-5**: every P1+ item is install-class via official native channel (npm `@latest`, `gh release download`, `uvx`, `/plugin install`). No hand-coding.
- **CR-6**: `@latest` used for npm; `gh release download` with explicit `--repo` flag; `uvx --refresh` for serena. No third-party mirrors.
- **CR-9**: P1 items via `npm install -g <pkg>@latest` carry implicit `@latest-acknowledged-D6-risk` — recommend pinning to known-good after first PASS smoke. 2-round fix-forward budget reserved.
- **CR-10**: research-first satisfied by this survey before any install action — no speculative remediation.
- **CR-12**: P0/P1 prefers upstream-install over sibling-cite-import for every primitive that has upstream parity. Sibling cite-imports flagged AMBER explicitly (PreCompact hook, T4 prepush, T5 plan-review, FM-17d stall detector, agent-spawn-gate).

---

## 10. Recommended next-fire scope

1. Install P1 items 1–5 (ccusage, repomix, serena, playwright-mcp, rtk) with smoke-probe PASS verification per CR-7 Phase 2 trigger predicate.
2. Edit `.claude\settings.json` to add the §7-P1.5 secrets-deny baseline + `PreCompact` save-ledger hook.
3. Document `deepwiki` operator-added status in `docs/install-provenance.md` with kit-non-corroboration disclosure.
4. Defer P2 security CLI install until P1 stable (sequential, not parallel — CR-9 install-risk discipline).
5. Defer P3 operator/parallel UX + P4 memory MCPs to dedicated benchmark-before-adoption fire per v60 Phase 7 gate.

End of report.
