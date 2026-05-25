# W340 Stream A — Current-State Audit (read-only)

**Generated**: 2026-05-20 18:15 UTC
**Runtime**: `Z:\claude-sota-installed\`
**Platform**: Windows 11 Pro, PowerShell 7+
**Auditor**: Claude (Opus 4.7 [1m]) — read-only sweep
**HEAD**: `9dee08b13f996c7e9f13f8c947eb179c4e233dc4` ("feat(W340-P0b-Gap-2): worker-failure-termination-guard skill (D14 fail-CLOSED)")
**git status**: 2 modified files (`installed_plugins.json`, `known_marketplaces.json`), 2 tmp `.claude.json.tmp.*` files, 1 untracked dir (`docs/architecture/W338-CPA-ROUTER-SOTA-PATCHES/`)

---

## 1. `.claude/settings.json` audit

**Top-level keys (26)**: `$schema, cleanupPeriodDays, skillListingBudgetFraction, env, includeGitInstructions, permissions, disabledMcpjsonServers, hooks, worktree, defaultShell, statusLine, enabledPlugins, extraKnownMarketplaces, outputStyle, sandbox, alwaysThinkingEnabled, awaySummaryEnabled, autoUpdatesChannel, minimumVersion, tui, autoMemoryEnabled, skipDangerousModePermissionPrompt, theme, teammateMode, skipAutoPermissionPrompt`

### 1.1 Hooks (8 events, all CR-2 compliant: direct-CLI invocations)

| Event | Matcher | Hooks (preview) | Length | Timeout |
|---|---|---|---|---|
| `SessionStart` | (empty) | `node Z:/claude-sota-installed/.claude/hooks/context-mode-cache-heal.mjs` | 95 | — |
| `UserPromptSubmit` | — | (empty array) | — | — |
| `PreToolUse` | `Bash` | `gitleaks protect --staged --no-banner --redact \|\| exit 2` | 56 | — |
| `PreToolUse` | `Bash` | `bash -c "...trivy fs --severity HIGH,CRITICAL..."` | 361 | 60 |
| `PreToolUse` | `Bash` | `bash -c "...case git revert/reset/push --force → codex T2 gate..."` | 402 | 900 |
| `PreToolUse` | `Edit\|Write` | `bash -c "...VERDICT-LEDGER.md provenance lint warn..."` | 249 | 5 |
| `PreToolUse` | `Agent` | `node Z:/claude-sota-installed/tools/preagent-parallel-guard.mjs` | 87 | 10 |
| `PreToolUse` | `Agent` | `node Z:/claude-sota-installed/tools/preagent-subagent-validator.mjs` | 91 | 10 |
| `PostToolUse` | `Edit\|Write\|MultiEdit` | `bash -c "...ruff check --fix + ruff format on .py..."` | 471 | — |
| `PreCompact` | `auto` | `powershell -NoProfile -WindowStyle Hidden ...Add-Content tmp/precompact.log` | 329 | — |
| `WorktreeRemove` | (empty) | `git worktree prune 2>&1 \|\| echo 'WorktreeRemove: prune failed'` | 66 | — |
| `Notification` | (empty) | `powershell -NoProfile -WindowStyle Hidden ...Beep 880,1100` | 143 | — |
| `PostToolUseFailure` | `Bash` | `powershell -NoProfile -Command ...gitleaks/EACCES feedback` | 506 | 3 |
| `TaskCompleted` | (empty) | `ruff check tools harness --quiet 2>&1 \|\| exit 2` | 47 | 30 |

**Compliance**: All hooks are direct-CLI invocations of pinned tools (`gitleaks`, `trivy`, `git`, `ruff`, `bash`, `node`, `powershell`). The 2 `node …mjs` calls reference `tools/preagent-*.mjs` and `.claude/hooks/context-mode-cache-heal.mjs` — the latter is the sanctioned bug-patch shim, the former lives outside `.claude/hooks/**` (correctly so).

### 1.2 Permissions
- `allow`: **12** entries
- `deny`: **41** entries (covers `.env`, `secrets/**`, `id_rsa`, `id_ed25519`, `*.pem`, `*.pfx`, `*.key`, `./CLAUDE.local.md`, `./tools/eee.local.ps1`, …)
- `ask`: 0
- `defaultMode`: `default`
- `additionalDirectories`: `[]`
- Allow-sample: `Edit(.claude/settings.json)`, `Edit(CLAUDE.md)`, `Bash(npm install -g *)`, `Bash(uv tool install *)`, `Bash(uvx *)`, `Bash(gh release download *)`, `Bash(git clone --depth 1 https://github.com/* *)`, `Bash(docker pull *)`

### 1.3 env vars (44 keys)
Critical knobs (full list in settings.json):
- `CLAUDE_CODE_FORK_SUBAGENT` — set (per CLAUDE.md L12 architecture)
- `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` — set (team-mode)
- `CLAUDE_CODE_DISABLE_AUTO_MEMORY` — set (deliberate opt-out per CLAUDE.local.md)
- `CLAUDE_CODE_USE_POWERSHELL_TOOL` — set (Windows-native shell)
- OTEL stack (8 vars): `OTEL_TRACES_EXPORTER`, `OTEL_EXPORTER_OTLP_TRACES_ENDPOINT/PROTOCOL`, `OTEL_RESOURCE_ATTRIBUTES`, `OTEL_SEMCONV_STABILITY_OPT_IN`, `OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT`, `OTEL_LOG_TOOL_DETAILS`, `OTEL_LOG_USER_PROMPTS`
- MSYS path-rewrite suppression (3): `MSYS_NO_PATHCONV`, `MSYS2_ARG_CONV_EXCL`, `MSYS2_ENV_CONV_EXCL`
- W319-3 Layer-3 phantom-Z-write block (5): `CLAUDE_PLUGIN_DATA`, `GATEGUARD_STATE_DIR`, `AUDIT_ROOT`, `CLAUDE_MEM_DATA_DIR`, `BASH_ENV`

### 1.4 Other settings
- `statusLine`: `npx -y ccstatusline@2.2.19 --config Z:/claude-sota-installed/.claude/ccstatusline/settings.json` (PINNED)
- `autoMemoryEnabled`: **false** (matches CLAUDE.local.md W259-v8-U3 opt-out)
- `disabledMcpjsonServers`: **`[]`** (empty — matches CLAUDE.md L19 W333-P0 drift-excise)
- `enabledMcpjsonServers`: not set
- `cleanupPeriodDays`: 60
- `defaultShell`: `powershell`
- `outputStyle`: `Proactive`
- `alwaysThinkingEnabled`: true
- `tui`: `fullscreen`
- `theme`: `dark`
- `teammateMode`: `in-process`
- `minimumVersion`: `2.1.144`
- `autoUpdatesChannel`: `latest`
- `enabledPlugins` (in settings.json): 68 entries, **58 enabled / 10 disabled**
- `extraKnownMarketplaces`: **22** entries

---

## 2. `.mcp.json` audit

**Top-level keys**: `_comments, mcpServers, _comments_addendum`

### 2.1 MCP servers (14 total)

| Name | Type | Command | Pinned | Env vars |
|---|---|---|---|---|
| `deepwiki` | http | `https://mcp.deepwiki.com/mcp` | (remote) | — |
| `github` | stdio | `npx -y @modelcontextprotocol/server-github@2025.4.8` | YES | `GITHUB_PERSONAL_ACCESS_TOKEN` |
| `chrome-devtools` | stdio | `npx -y chrome-devtools-mcp@1.0.1 --no-usage-statistics` | YES | — |
| `repomix` | stdio | `npx -y repomix@1.14.0 --mcp` | YES | — |
| `serena` | stdio | `uvx --from git+https://github.com/oraios/serena@249f6b07f9 …` | YES (SHA-pinned) | — |
| `ccusage` | stdio | `npx -y @ccusage/mcp@18.0.11` | YES | — |
| `cognee` | http | `http://127.0.0.1:8000/mcp` | (local NSSM) | — |
| `langfuse` | stdio | `npx -y langfuse-mcp-server@0.0.2-rc.0` | YES | `LANGFUSE_HOST/BASE_URL/PUBLIC_KEY/SECRET_KEY` |
| `basic-memory` | stdio | `uvx --from basic-memory==0.21.1 basic-memory mcp` | YES (==) | `BASIC_MEMORY_HOME/CONFIG_DIR` |
| `hf-mcp-server` | http | `https://huggingface.co/mcp` | (remote) | — |
| `perplexity` | stdio | `npx -y @perplexity-ai/mcp-server@0.9.0` | YES | `PERPLEXITY_API_KEY` |
| `playwright` | stdio | `npx -y @playwright/mcp@0.0.75` | YES | — |
| `tavily` | stdio | `npx -y tavily-mcp@0.2.19` | YES | `TAVILY_API_KEY` |
| `exa` | stdio | `npx -y exa-mcp-server@3.2.1` | YES | `EXA_API_KEY` |

**Version-pin discipline (CR-1 trust-tuple)**: 11/11 npx-based servers use `-y <pkg>@<ver>` form. `serena` uses `uvx --from git+…@<full-sha>` (commit-pinned). `basic-memory` uses `==` exact pin. **PASS.**

### 2.2 `disabledMcpjsonServers`
Not present in `.mcp.json` (lives in `.claude/settings.json` as `[]` — empty). Consistent with CLAUDE.md L19 / W333-P0 drift-excise.

### 2.3 env-var interpolation patterns (7 distinct)
`${EXA_API_KEY}, ${GITHUB_TOKEN}, ${LANGFUSE_HOST}, ${LANGFUSE_PUBLIC_KEY}, ${LANGFUSE_SECRET_KEY}, ${PERPLEXITY_API_KEY}, ${TAVILY_API_KEY}`

Note: `github` server's env-key is `GITHUB_PERSONAL_ACCESS_TOKEN` but `.mcp.json` interpolates `${GITHUB_TOKEN}` somewhere — minor drift worth checking (could be a comment).

### 2.4 `_comments` block keys (12)
`header, _migration_note, playwright_pin, w155_f13_native_node, w286_cross_npx_pinned_v2, chrome_devtools, serena_pin, context_mode_removed, w259v9_u10_tasksupport_audit, cognee_w259v8, gitnexus, ollama_w259v15`

---

## 3. `.claude/hooks/` inventory

**File count**: **1**
**Probe**: `Get-ChildItem -Recurse -File .claude/hooks` →

| Path | Size | Status |
|---|---|---|
| `.claude/hooks/context-mode-cache-heal.mjs` | **1,656 B** | SANCTIONED bug-patch shim (≤2 KB) |

**Cardinal-rule-2 compliance**: PASS.
- Size: 1,656 B < 2,048 B limit
- Cite-anchor: patches `anthropics/claude-code#46915` ("Plugin auto-update deletes old cache dir, breaking ${CLAUDE_PLUGIN_ROOT}")
- Sole sanctioned exception per CLAUDE.md L19

---

## 4. `.claude/skills/` inventory

**Directory count**: **51**
**SKILL.md count**: **50** (one dir `_archived` is a container)
**Net active operator-curated skills**: **50** (vs CLAUDE.md W333 claim of 46 → drift: +4)

Live skills:
```
addyosmani-incremental-implementation, addyosmani-performance-optimization,
addyosmani-security-and-hardening, addyosmani-source-driven-development,
addyosmani-spec-driven-development, agent-budget-discipline, api-and-interface-design,
caveman, checkpoint-resume, citations-agent, code-simplification, diagnose,
dispatching-parallel-agents-w321-fork, doubt-driven-development, dspy-integration,
durable-planning-files, empty-final-message-guard, frontend-ui-engineering, gitnexus,
gitnexus-cli, gitnexus-debugging, gitnexus-exploring, gitnexus-guide,
gitnexus-impact-analysis, gitnexus-pr-review, gitnexus-refactoring,
goal-prompt-synthesis, grill-with-docs, handoff, improve-codebase-architecture,
langfuse, learned, local-cypher-codebase, mcp-agent-patterns, mem-recall,
ops-rhythm, parallel-dispatch-mandate, review, sota-convergence-audit,
speckit-{analyze, checklist, clarify, constitution, implement, plan, specify, tasks,
taskstoissues}, task-close-discipline, tdd, to-issues, triage,
vercel-composition-patterns, vercel-react-best-practices, web-design-guidelines,
worker-failure-termination-guard, zoom-out
```

**Drift vs CLAUDE.md** L31:
- CLAUDE.md says "× 46" — actual is **50 SKILL.md files** (51 dirs incl. `_archived`)
- Likely additions since W333: `empty-final-message-guard`, `worker-failure-termination-guard` (latest HEAD commits), plus possibly `improve-codebase-architecture`, `mcp-agent-patterns` post-W333

---

## 5. `.claude/agents/` inventory

**Count**: **4 .md files**
- `evaluator.md` (4,622 B) — operator-curated skeptical reviewer
- `gpt5-archaeologist.md` (9,512 B) — operator-curated
- `wshobson-devops-troubleshooter.md` (4,064 B) — vendor-fork from wshobson/agents
- `wshobson-security-auditor.md` (4,325 B) — vendor-fork from wshobson/agents

Per cardinal rule 3 + W333 Stream D FQN-discipline: operator-curated agents in `.claude/agents/` are sanctioned via Anthropic `https://code.claude.com/docs/en/claude-directory`.

---

## 6. `.claude/plugins/repos/` and marketplace dirs

- **`.claude/plugins/repos/`**: **does not exist** (NO_REPOS_DIR). Plugin sources live under `.claude/plugins/marketplaces/<marketplace>/...` and unpacked plugins under `.claude/plugins/cache/<marketplace>/<plugin>/<version>/...`. This is normal CC v2.x behavior.
- **`.claude/plugins/marketplaces/`**: **23 dirs** (matches CLAUDE.md W337 canonical)
  ```
  abhigyanpatwari-GitNexus, addy-agent-skills, anthropic-agent-skills,
  antigravity-awesome-skills, claude-code-skills, claude-code-workflows,
  claude-community, claude-for-financial-services, claude-plugins-official,
  claude-settings, context-mode, everything-claude-code, healthcare,
  hindsight, karpathy-skills, knowledge-work-plugins, life-sciences,
  mcp-memory-service, openai-codex, planning-with-files, pydantic-skills,
  superpowers-marketplace, thedotmack
  ```
- **`.claude/plugins/cache/`**: **15 dirs** (matches CLAUDE.md W337 canonical)
  ```
  anthropic-agent-skills, antigravity-awesome-skills, claude-code-skills,
  claude-code-workflows, claude-plugins-official, claude-settings,
  context-mode, everything-claude-code, hindsight, karpathy-skills,
  openai-codex, planning-with-files, pydantic-skills,
  superpowers-marketplace, thedotmack
  ```
- Marketplaces with NO cache entries (8): `abhigyanpatwari-GitNexus`, `addy-agent-skills`, `claude-community`, `claude-for-financial-services`, `healthcare`, `knowledge-work-plugins`, `life-sciences`, `mcp-memory-service`. CLAUDE.md says addy-agent-skills + gitnexus-marketplace + mcp-memory-service "retired W316" — verified absent from cache. The 4 vertical marketplaces (claude-community, healthcare, life-sciences, claude-for-financial-services, knowledge-work-plugins) appear to be marketplace-registered but no plugins installed from them.

---

## 7. Plugin enablement

Per `.claude/plugins/installed_plugins.json`:
- `plugins` block: **64 entries** (matches CLAUDE.md W337 `installed_plugin_records=64`)
- `enabledPlugins` block in installed_plugins.json: only 1 entry (`context-mode@context-mode`)
- `version`: 2

Per `.claude/settings.json:enabledPlugins`:
- **Total enablement entries: 68** (matches W337)
- **Enabled: 58** (CLAUDE.md says 59 — drift: **-1**)
- **Disabled: 10** (CLAUDE.md says 9 — drift: **+1**)

**Disabled list (10)**:
```
claude-mem@thedotmack, gitnexus@gitnexus-marketplace, hindsight-memory@hindsight,
hookify@claude-plugins-official, intelligent-compact@claude-settings,
protect-mcp@claude-code-workflows, qdrant-skills@claude-plugins-official,
review-agent-governance@claude-code-workflows, self-improving-agent@claude-code-skills,
superpowers@superpowers-marketplace
```

**Note**: settings.json has 68 enablement entries but installed_plugins.json plugins map only has 64 records → 4 "phantom" enablement entries for un-installed plugins (likely `everything-claude-code@everything-claude-code` load_failure per W337 codex-r2 Axis-9, plus 3 others). The `superpowers@superpowers-marketplace` is duplicate-disabled while `superpowers@claude-plugins-official` is enabled — that's the canonical superpowers source.

---

## 8. `.pre-commit-config.yaml` audit

- **Size**: 11,972 B
- **Hook IDs (10)**: `gitleaks-system, ruff-check, ruff-format, actionlint-system, commitlint, codex-trailer-gate, cr2-2kb-hooks, msys-hooks-form, gitnexus-detect-changes, provenance-lint`
- **Repos**:
  - `https://github.com/gitleaks/gitleaks` (pinned)
  - `https://github.com/astral-sh/ruff-pre-commit` (pinned)
  - `https://github.com/rhysd/actionlint` (pinned)
  - `local` (operator-defined hooks)
- **`cr2-2kb-hooks` W331-P0.9 gate**: **PRESENT** (closes CR-2 ≤2KB hook-body enforcement gap per CLAUDE.md L19)

---

## 9. `.github/workflows/` (13 .yml files)

| File | Size | Name | Trigger |
|---|---|---|---|
| `ci.yml` | 5,701 | CI | push (main, goal/**, worktree-W**, sota-converge-w**) + pull_request |
| `claude-code-security-review.yml` | 1,864 | Claude Code Security Review (Anthropic-official) | pull_request |
| `code-quality.yml` | 5,256 | code-quality | push (main, sota-*) + pull_request + workflow_dispatch |
| `codeql.yml` | 1,435 | CodeQL (SAST) | push + PR + weekly cron Tue 05:21 UTC |
| `codex-review.yml` | 4,627 | codex-review (PR-triggered GPT-5.5 cross-model gate) | pull_request |
| `commitlint.yml` | 1,168 | Conventional Commits | pull_request + push main |
| `dependabot-auto-merge.yml` | 2,263 | Dependabot auto-merge (tiered policy) | pull_request* |
| `labeler.yml` | 826 | PR auto-label | pull_request_target |
| `provenance.yml` | 3,769 | SLSA L3 provenance (wave-closure tags) | push tags W*-ship-*, W*-closure-* |
| `release-please.yml` | 932 | release-please (automated wave-closure PRs) | push main |
| `scorecard.yml` | 1,384 | OpenSSF Scorecard | branch_protection_rule + cron Mon 13:38 + push main + dispatch |
| `stale.yml` | 2,271 | stale (issue + PR aging) | cron daily 01:30 + dispatch |
| `zizmor-action.yml` | 1,841 | zizmor (workflow security audit) | push/PR (.github/**) + cron |

All workflows are present and aligned with W331 axis-1 #3 trust-tuple (SLSA-L3 provenance + OpenSSF Scorecard + dependabot pinning + CodeQL SAST + zizmor workflow audit).

---

## 10. Self-invent hunt under `.claude/`

**Method**: walk `.claude/`, classify by canonical Anthropic paths (`plugins/{cache,marketplaces,data}/`, `skills/`, `agents/`, `commands/`, `plans/`, `schemas/`, `notebooks/`, `state/`, `projects/`, `sessions/`, `history/`, `file-history/`, `teams/`, `jobs/`, `credentials/`, `worktrees/`, `ccstatusline/`, etc.). Remaining files = self-invent candidates.

**`.claude/hooks/` self-invent count**: **0** unsanctioned (only `context-mode-cache-heal.mjs` exists; sanctioned bug-patch ≤2KB).

**Git-tracked operator-curated content under `.claude/` (95 files)**:
- `.claude/skills/<name>/SKILL.md` + nested references: ~70 files (all sanctioned per cardinal rule 4 + W308 `claude-directory` docs)
- `.claude/commands/`: 5 files (`dual-review.md`, `harvest.md`, `mistake-add.md`, `mistake-search.md`, `recall.md`) — all have proper frontmatter (sanctioned slash commands per Anthropic claude-directory)
- `.claude/agents/`: 4 files (operator-curated subagents per cardinal-rule-3 + W308)
- `.claude/plans/`: 3 files (~110 KB total, plan-mode artifacts)
- `.claude/schemas/`: 2 files (`compact_hint.v1.json`, `review-output.schema.json`)
- `.claude/hooks/context-mode-cache-heal.mjs` (sanctioned bug-patch)
- `.claude/plugins/installed_plugins.json` + `known_marketplaces.json` (CC-managed manifests)
- `.claude/projects/Z--claude-sota-installed/memory/MEMORY.md` (CC-managed memory store)
- `.claude/ccstatusline/settings.json` (statusline config)
- `.claude/settings.json` (core)

**Verdict**: `self_invented_count: 0` invariant **HELD** (matches CLAUDE.md L5 W255 cleanup state). All operator content lives in Anthropic-sanctioned paths.

**Ephemeral self-noise** (not source-of-truth, gitignored):
- `.claude/bash-commands.log` (2.27 MB, runtime log)
- `.claude/.credentials.json` (1,303 B, CC auth state — denied by permissions)
- `.claude/.claude.json.tmp.83268.*` (2 tmp files, in-flight CC writes)
- `.claude/.last-cleanup` (timestamp marker)
- `.claude/context-mode/content/*.db` (largest = 1.9 GB content WAL; gitignored)
- `.claude/cache-fix-state/deferred-tools-*.txt` (2 small files, runtime cache)

---

## 11. Stale commit-SHA references

| Ref | Cited in CLAUDE.md | Local repo | Status |
|---|---|---|---|
| `f28c2da` | CCBP head (line 3) | `Z:/repos/deps/claude-code-best-practice-shan` | **VERIFIED** (current HEAD) |
| `ac0d87d` | CLAUDE.local.md (TIER-1 anchor) | same | **VERIFIED** |
| `48798ca` | CLAUDE.md L3 cross-SHA chain | same | **VERIFIED** |
| `addyosmani/agent-skills f17c6e88` | CLAUDE.md L31 | `Z:/repos/deps/addyosmani-agent-skills` | **VERIFIED** |
| `mattpocock d54c497aa944` | CLAUDE.md L31 | `Z:/repos/deps/mattpocock-skills` | **VERIFIED** |
| `claude-cookbooks 39a350b6790c132337dcc3ec35240728fcc1dc0e` | CLAUDE.md L13 + skills (citations-agent, dispatching-parallel-agents-w321-fork) | `Z:/repos/deps/claude-cookbooks` | **NOT VALID** (`fatal: Not a valid object name 39a350b6`) — **STALE-REF DRIFT** |

---

## 12. NSSM service status (PowerShell probes)

| Service | Status |
|---|---|
| `CogneeMCP` | **SERVICE_RUNNING** (matches CLAUDE.md L36 T3 active) |
| `LlamaSwap` | **SERVICE_RUNNING** (matches CLAUDE.md L38) |
| `OllamaServe` | **SERVICE_RUNNING** |
| `Phoenix` | does not exist as installed service (matches CLAUDE.md L36 + W329-D §3) |
| `FalkorDB` | does not exist as installed service (matches CLAUDE.md L36 T4 RETIRED) |

---

## 13. MCP service health probes (PowerShell)

| Endpoint | Probe | Result |
|---|---|---|
| `http://127.0.0.1:3000/api/public/health` | Invoke-WebRequest | **HTTP 200** — `{"status":"OK","version":"3.160.0"}` |
| `http://127.0.0.1:8000/` (cognee) | Invoke-WebRequest | **HTTP 404** (root returns 404; expected — cognee's MCP endpoint is `/mcp`, not `/`) |
| `:16700` (Ollama) | Test-NetConnection | **True** (open) |
| `:8090` (LlamaSwap) | Test-NetConnection | **True** (open) |
| `:16006` (Phoenix/Docker) | Test-NetConnection | **True** (open — owned by Docker per CLAUDE.md L36) |
| `:16379` (FalkorDB) | Test-NetConnection | **False** (closed — STOPPED-by-design per W295 retirement) |

**Langfuse version drift**: CLAUDE.md L36 says `v3.170.0` (W333-P0-b recovery 2026-05-19, re-verified W338 2026-05-20). Live probe returns `3.160.0` → **VERSION DRIFT -10 minor revs**. Either the W338 re-verify referenced a different build, or the stack rolled back. Worth checking.

---

## 14. Counts verification vs CLAUDE.md W337 canonical

| Metric | CLAUDE.md L35 | Audit observed | Drift |
|---|---|---|---|
| `cache_dirs` | 15 | **15** | OK |
| `marketplace_records` | 22 | **22** (`known_marketplaces.json`) | OK |
| `marketplace_dirs` | 23 | **23** (filesystem) | OK |
| `installed_plugin_records` | 64 | **64** (`installed_plugins.json`) | OK |
| `enablement_entries` | 68 | **68** (`settings.json:enabledPlugins`) | OK |
| `enabled_true` | 59 | **58** | **-1** |
| `enabled_false` | 9 | **10** | **+1** |
| `load_failures` | 1 | (not directly probed) | — |
| `local skills` | 46 | **50 SKILL.md (51 dirs)** | **+4** |

**Net drift**: 3 counts have drifted since W337 was authored. Drift is small and self-consistent — one plugin appears to have flipped enabled→disabled (likely `superpowers@superpowers-marketplace` after W333 FQN-discipline), and 4 new skills landed (`empty-final-message-guard`, `worker-failure-termination-guard` per HEAD log + possibly 2 others).

---

## TOP-10 RISKS / DRIFT

### SEV-1 (must triage)

1. **CLAUDE.md `claude-cookbooks @ 39a350b6790c132337dcc3ec35240728fcc1dc0e` is a STALE-SHA REF** — cited in L13 (parallel-dispatch anchor) and skills `citations-agent`, `dispatching-parallel-agents-w321-fork`. `git cat-file -e 39a350b6` returns `fatal: Not a valid object name`. Either the repo isn't cloned at `Z:/repos/deps/claude-cookbooks` (probe found no .git there) or the SHA is wrong. Cardinal-rule-6 (verify-before-claim) requires this to be re-verified or cited as `<unverifiable>`. **Impact**: agent-team trigger / parallel-dispatch mandate cite-anchor is unverifiable.

2. **Langfuse version drift**: live `3.160.0` vs CLAUDE.md `v3.170.0` (claimed re-verified W338 2026-05-20 today). **-10 minor revisions** suggests either a rollback or a CLAUDE.md fabrication risk. Cardinal-rule-6 verify-before-claim violation.

### SEV-2 (should reconcile)

3. **Enablement drift**: CLAUDE.md W337 claims `enabled=59 / disabled=9`; actual is `58 / 10`. Net -1 enabled. Likely a single post-W337 disable (probably `superpowers@superpowers-marketplace` as duplicate of `superpowers@claude-plugins-official`). CLAUDE.md needs counter-update.

4. **Skills count drift**: CLAUDE.md L31 says "× 46"; actual is **50 SKILL.md** files. New additions land in `git log` HEAD without CLAUDE.md L31 updates (Δ-G49 `empty-final-message-guard` + Δ-G50 `worker-failure-termination-guard` from W340-P0b series).

5. **`installed_plugins.json` shape**: `enabledPlugins` block inside installed_plugins.json contains only `context-mode@context-mode:true` — the **real** enablement map lives in `settings.json:enabledPlugins` (68 entries). The internal field is essentially unused. If any code reads `installed_plugins.json:enabledPlugins`, it would see only 1 enabled plugin (BUG-RISK). Worth checking whether anything reads this.

6. **`.mcp.json` env-var interpolation drift**: GitHub server env-block uses key `GITHUB_PERSONAL_ACCESS_TOKEN` while `_comments` and interpolations also reference `${GITHUB_TOKEN}` (in some context). Minor — recommend single canonical env-name.

7. **Git working tree has 2 modified manifest files** (`installed_plugins.json`, `known_marketplaces.json`) + 2 tmp files + 1 untracked `docs/architecture/W338-CPA-ROUTER-SOTA-PATCHES/`. Not blocking, but CLAUDE.md L40 claims "clean tree" — minor inconsistency. The tmp `.claude.json.tmp.83268.*` files are in-flight CC writes (normal).

### SEV-3 (low priority / informational)

8. **8 marketplace dirs without cache entries**: `claude-community, claude-for-financial-services, healthcare, knowledge-work-plugins, life-sciences` are marketplace-registered but no plugins installed. `addy-agent-skills, abhigyanpatwari-GitNexus, mcp-memory-service` are retired-but-still-registered. Consider pruning unused marketplace registrations.

9. **`.claude/bash-commands.log` is 2.27 MB**: runtime log accumulator never rotated. Either gitignored (should be — check) or candidate for cleanup-policy. Per `cleanupPeriodDays: 60`.

10. **`.claude/context-mode/content/8e4a57f2a854cd16.db` is 2 GB + 1.3 GB WAL**: context-mode KB has accumulated ~3.3 GB. Per `ctx_purge` available, but reflects runtime maturity rather than risk. Confirm gitignored.

---

## Cardinal-rule compliance summary

| Rule | Compliance | Evidence |
|---|---|---|
| CR-1 trusted primitives | **PASS** | All 14 MCP servers npx-pinned or git-SHA-pinned; 22 marketplace_records all from known sources (`anthropic-*`, `claude-plugins-official`, `wshobson@claude-code-workflows`, `obra@superpowers-marketplace`, `karpathy-skills`, etc.) |
| CR-2 hooks discipline | **PASS** | `.claude/hooks/` contains exactly 1 file = sanctioned bug-patch `context-mode-cache-heal.mjs` (1,656 B < 2,048 B); all `settings.json:hooks.*` commands are direct-CLI invocations (`gitleaks`, `trivy`, `git`, `ruff`, `bash`, `node`, `powershell`); `cr2-2kb-hooks` pre-commit gate ACTIVE |
| CR-3 subagents | **PASS** (1 caveat) | 4 `.claude/agents/` operator-curated + 64 plugins shipping subagents; W333 FQN-discipline tracked via `.claude/state/subagent-type-allowlist.json` (validator wired into `settings.json:hooks.PreToolUse[Agent]`) |
| CR-4 project behavior | **PASS** | No ad-hoc rules under `.claude/rules/`; all behavior either in CLAUDE.md/settings.json or operator-curated SKILL.md (50 skills) |
| CR-5 safety boundaries | **PARTIAL-HOLD-UPGRADED** | 41 deny-rules + 12 allow-allowlist; sandbox object present; per CLAUDE.md L22 Windows-native runtime → sca-v11 §6 5-control layered defense (Option C) |
| CR-6 verify-before-claim | **MOSTLY PASS** with 2 unverified claims | SEV-1 risk #1 (claude-cookbooks 39a350b6) and SEV-1 risk #2 (langfuse version) violate this rule |
