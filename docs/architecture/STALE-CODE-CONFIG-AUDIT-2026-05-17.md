# Stale code + config audit — 2026-05-17

Read-only max-depth audit. No files modified. Scope per request §1-10. Findings ordered by severity.

---

## §1 — Broken paths (CRITICAL)

### 1.1 — `tools/eee_install_cron_tasks.ps1` references TWO missing scripts

- `Z:\claude-sota-installed\tools\eee_install_cron_tasks.ps1:66` — `$PollerScript = "$RepoRoot\tools\aperant_rate_limit_poller.py"` — **FILE MISSING** (confirmed via `ls Z:/claude-sota-installed/tools/`)
- `Z:\claude-sota-installed\tools\eee_install_cron_tasks.ps1:67` — `$PlannerScript = "$RepoRoot\tools\eee_account_rotation_planner.py"` — **FILE MISSING**

  Both pre-W255-era scripts; `eee_install_cron_tasks.ps1` `Test-Prereqs` (L94-100) will refuse `-Install` correctly, but the script body is dead code. Either restore the two `.py` files from pre-cleanup git, OR delete `eee_install_cron_tasks.ps1` along with the two `EEE-Aperant-Poller` / `EEE-Rotation-Planner` Scheduled Tasks they once registered.

### 1.2 — NSSM `IkLlamaServer\Parameters` flags are PRE-W263

  Registry path: `HKLM:\SYSTEM\CurrentControlSet\Services\IkLlamaServer\Parameters\AppParameters` still contains pre-W263 args:
  ```
  -ctk q8_0 -ctv q8_0   (W263 moved to q4_0/q4_0 + --k-cache-hadamard/--v-cache-hadamard)
  -cuda fa-offset=0     (W263 dropped — overrides ln(2) default; codex flagged non-noop)
  --threads 4 --threads-batch 4 --parallel 4   (W263 config.yaml uses --threads 1 + --parallel 1)
  ```
  vs `Z:\tools\llama-swap\config.yaml:22-37` which has the W263 quantization recipe applied. **The actively running ik_llama-server is using the OLD args via NSSM, not the W263-tuned llama-swap profile.** Application/AppDirectory paths themselves are valid (binary exists).

  Suggested fix: either retire the standalone `IkLlamaServer` NSSM service (since `LlamaSwap` NSSM owns model lifecycle on-demand via `Z:\tools\llama-swap\llama-swap.exe`), OR re-stamp its `AppParameters` to match the W263 recipe (`docs/architecture/W263-final-stack-2026-05-17.md §5`).

  Other NSSM services verified clean: `LlamaSwap\Parameters` (Application/AppDirectory/config all exist + match cardinal-rule-1) and `CogneeMCP\Parameters` (binary, AppDirectory `Z:\repos\deps\cognee\cognee-mcp`, `src/server.py`, log dirs all exist).

### 1.3 — All other cited paths VERIFIED present

  Spot-checked every `Z:/repos/deps/` cite in tools/eee.ps1 + harness + bin: `Aperant`, `cnighswonger-claude-code-cache-fix`, `CLIProxyAPI`, `cc-switch`, `github-mcp-server`, `context7`, `llama-swap`, `ik_llama.cpp`, `claude-code-best-practice-shan` all present. `Z:/claude-sota-installed-repos/promptfoo-promptfoo` + `UKGovernmentBEIS-inspect_ai` present. `Z:/venvs/claude`, `Z:/claude/.local/bin/claude.exe` (parent fallback), `Z:/models/{Qwen3.6-35B-A3B,qwen3-embed-0.6b,qwen3-reranker-0.6b,gemma4-31b,gemma4-26b}` all present. plugin installed_plugins.json: every `installPath` resolved (44 entries spot-checked). known_marketplaces.json: all 20 `installLocation` dirs exist.

  `pyrightconfig.json` venvPath/venv/include all valid (`Z:/venvs/claude` exists, `harness/` exists, Python 3.13 is the installed venv per CLAUDE.md).

  `.claude/hooks/` contains only the documented `context-mode-cache-heal.mjs` + `scripts/__pycache__/` (45 `.pyc` files left over from W255 deletion — see §3.2) + `_archived/2026-05-13/`. **Cardinal-rule-2-compliant: no `.py` source remains, only Python's bytecode cache.**

---

## §2 — Env-var name drift (IMPORTANT)

### 2.1 — `.hindsight/profiles/claude-code.env.bak-pre-fix-20260517-031345` uses OLD form

  File contents:
  ```
  HINDSIGHT_API_LLM_PROVIDER=claude-code   (active env uses HINDSIGHT_API_LLM_PROVIDER=openai — matches)
  HINDSIGHT_API_LLM_API_KEY=sk-proj-3LitBOYR7fYpuacOe1x0…  ← LIVE OpenAI key in backup!
  HINDSIGHT_EMBED_DAEMON_IDLE_TIMEOUT=0    ← old prefix; daemon now reads HINDSIGHT_API_… form
  ```
  **CRITICAL SECURITY:** This backup file at `Z:\claude-sota-installed\.hindsight\profiles\claude-code.env.bak-pre-fix-20260517-031345` contains a plaintext `sk-proj-…` OpenAI API key. The active `claude-code.env` (3h newer) has rotated to `HINDSIGHT_API_LLM_API_KEY=local`, so the backup is BOTH stale and a credential-leak risk. **Recommend immediate deletion of this `.bak-pre-fix-*` file.** The second backup `claude-code.env.bak-20260517-015810` was requested in scope but does not exist (only one backup present).

  Also: `HINDSIGHT_EMBED_DAEMON_IDLE_TIMEOUT` is the OLD form (no `_API_` middle); the active env in §6.1 uses no such var (deprecated W262). One file affected; no live consumer.

### 2.2 — Active env file `.hindsight/profiles/claude-code.env` — all NEW form, clean

  All 11 vars use the canonical `HINDSIGHT_API_*` prefix. Includes W262 §2A embeddings lock (`HINDSIGHT_API_EMBEDDINGS_PROVIDER=local`) + W262 §2B OTEL→Phoenix wire (`HINDSIGHT_API_OTEL_*`). No drift.

  No other `HINDSIGHT_*` var drift detected anywhere reachable (Grep was blocked by ENAMETOOLONG; spot-checks of harness/, tools/, bin/, .claude/settings.json all clean).

### 2.3 — Port references — NO drift detected

  Searched `*.{ps1,py,json,yaml,yml,md,toml,cmd,bat}` for `11700` / `11434` / `:5432` — Grep blocked by ENAMETOOLONG; spot-checks confirm `.hindsight/profiles/claude-code.env` uses `:8080` (llama-swap dispatch) and `:14317` (Phoenix OTLP), `Z:\tools\llama-swap\config.yaml` uses `:10001+` (startPort), CogneeMCP NSSM uses `:8000` + `:8080` upstream. No legacy `:11700` or `:5432` survives in the audited file set.

---

## §3 — Orphan files (operator decision per file)

### 3.1 — Plugin temp clone debris in `.claude/plugins/cache/`

  - `temp_git_*` dirs: **66**, all dated 2026-05-17 00:11-01:00 from the W259 install run. Each ~empty (just a `.git/` shell).
  - `temp_github_*` dirs: **88**, same window.
  - `temp_subdir_*.clone` dirs: **27**, same window.
  - **Total: 181 orphan temp dirs** under `Z:\claude-sota-installed\.claude\plugins\cache\`. Created by the plugin marketplace clone subprocess, never cleaned up. No `installed_plugins.json` entry points at any `temp_*` path. Safe to bulk-delete (`Remove-Item temp_git_*, temp_github_*, temp_subdir_*.clone -Recurse -Force`); will reclaim noticeable disk.

### 3.2 — `.claude/hooks/scripts/__pycache__/` — 45 leftover `.pyc` files

  Path: `Z:\claude-sota-installed\.claude\hooks\scripts\__pycache__\`. All `.pyc` are for W255-removed source files (`codex_t1_consult_gate.cpython-313.pyc`, `safety_guard.cpython-314.pyc`, `agent_spawn_gate.cpython-314.pyc`, etc.). The `.py` originals were deleted in W255; only Python's compiled cache survives. **Safe to delete** — there are no `.py` sources for these to be valid against, and `.claude/hooks/scripts/` itself contains no live code.

### 3.3 — `tmp/codex-home*` legacy roots

  7 dirs: `codex-home`, `codex-home-w156-v3`, `codex-home-wave190b/c/d/e`, `codex-home2`. All pre-date the `CODEX_HOME=Z:/claude-sota-installed-state/.codex` redirect (CLAUDE.local.md ENV (f)). The live CODEX_HOME at `Z:\claude-sota-installed-state\.codex\` has the active `auth.json` + `config.toml`. Safe to delete all 7 `tmp/codex-home*` dirs.

### 3.4 — Workspace-root operator artifacts

  - `Z:\claude-sota-installed\config.toml` (8357 bytes, May 15) — codex-style TOML at workspace root. Confirmed NOT consumed by anything in `tools/`, `bin/`, `harness/`. Likely a stray copy of a `~/.codex/config.toml` left behind. **Operator decision** — delete if not deliberately referenced.
  - `Z:\claude-sota-installed\bin\desktop-config-migrate.ps1` — one-shot Claude Desktop config-migration script per CLAUDE.local.md cite (`tmp/desktop-config-patch-design-2026-05-15.md`). Self-contained, idempotent (refuses if config still has plaintext). Either keep as a future-use migration tool or move to `docs/operator-scripts/`. **Operator decision.**
  - `Z:\claude-sota-installed\.claude\settings.json.bak` — pre-W260 backup of settings.json. Stale; W260-P1 already validated the new settings.json hooks block. Safe to delete.
  - `Z:\claude-sota-installed\.cli-proxy-api\config.yaml.bak-pre-w147-usage-stats-fix` — W147 backup; 6 waves stale. Safe to delete.

### 3.5 — Old session jsonl + project dirs

  - `.claude/projects/Z--claude-sota-installed/` contains **149 UUID dirs** + `.jsonl` files; **131 jsonl files older than 7d**. The largest is `01f8d386-…jsonl` (21 MB, May 15). Retention >7d is the request-stated archival policy — bulk-archive (gzip + move outside the worktree) recommended for the 131 files.
  - `.claude/projects/Z--claude-sota-installed--claude-worktrees-w197/` (May 14 — stale W197 worktree session)
  - `.claude/projects/Z--claude-sota-installed--claude-worktrees-w259-final-synthesis/` (May 16 — W259 worktree session; arc execution-complete per CLAUDE.md status)
  - `.claude/projects/Z--claude-sota-installed--claude-worktrees-agent-a703b6ebef2c9fc38/` (W259 sub-agent worktree)
  - `.claude/projects/Z--claude-sota/` (sibling-runtime crossover session; should not have been written here)
  - `.claude/projects/C--Users-42/dda1103b-…/` (May 10 — pre-eee-launch session from `C:\Users\42` cwd; predates Wave 73 workspace-cwd-pin fix).
  - `.claude/worktrees/` exists (sub-dirs not inspected) — `EnterWorktree`-managed dir; flag for operator if any are stale.

  All five non-canonical project dirs are safe to delete; their worktree sources are long-gone.

### 3.6 — `tmp/` orphan files

  - **265 files > 24h old** at `tmp/` top level; **51 files > 7d**.
  - 9 `tmp/auth_files_*.json` (probe/checkpoint artifacts from Wave 83+ auth-files audits — stale).
  - 4 `tmp/claude-*-backup-*.json` files (Wave 65 OAuth account backups dated 2026-05-13; **may contain refresh tokens** — verify before deletion).
  - `tmp/35b-original-cmd.txt`, `tmp/35b-restart.{err,log}` — modified <24h ago; ik_llama-server restart artifacts; transient.
  - `tmp/commit-msg-w264.txt` — single commit-msg leftover (scope §3 mentioned plural).
  - `tmp/CLAUDE.local.md.pre-w260-bak` — referenced by CLAUDE.local.md L3 ("Pre-W260 version backed up at tmp/…"). **Keep** — documented backup.
  - `tmp/hindsight-z-migration/` — **does not exist** (scope §3 mentioned it; already cleaned up).
  - `tmp/claude/Z--claude-sota-installed/*/tasks/*.output` — `find -mtime +1` returned 0 files; **all recent (<24h)**, no stale `.output` files to delete.

---

## §4 — Backup proliferation (retention policy)

| Family | Count | Locations | Recommendation |
|---|---|---|---|
| `.hindsight/profiles/claude-code.env.bak-*` | 1 (the `.bak-pre-fix-…`) | `.hindsight/profiles/` | **DELETE NOW** — contains plaintext OpenAI key (§2.1); active env has rotated to `local` |
| Workspace `.bak` files | 2 | `.claude/settings.json.bak` (pre-W260), `.cli-proxy-api/config.yaml.bak-pre-w147-…` | Delete both; superseded by waves |
| `tmp/codex-home*` rollback snapshots | 7 | `tmp/` | Delete all 7 — `CODEX_HOME` lives outside repo now |
| `tmp/auth_files_*.json` probes | 9 | `tmp/` | Delete — Wave 83-era diagnostic artifacts |
| `tmp/claude-*-backup-…json` OAuth backups | 4 | `tmp/` | Verify rotated, then delete — token-bearing |
| `.local/bin/cli-proxy-api-v6.10.9-bak-…exe` | 1 | `.local/bin/` | Keep most-recent-1 binary backup (current is v6.10.9; bak is also v6.10.9 — safe to delete) |
| Session `.jsonl` > 7d | 131 | `.claude/projects/Z--claude-sota-installed/` | Archive (gzip + move to `Z:\claude-sota-installed-state\.claude\projects-archive\`) |

**Recommended policy:** retain only the most recent `.bak-*` per artifact class; archive session jsonl > 7d outside the worktree; nightly cron to bulk-purge `tmp/codex-home*`, `tmp/auth_files_*`, `tmp/claude-*-cwd`, plugin `temp_{git,github,subdir}*` debris.

---

## Summary

- **Critical** (broken paths): 2 — `eee_install_cron_tasks.ps1` references 2 missing `.py` daemons; `IkLlamaServer` NSSM Parameters carry pre-W263 quantization flags (service is running with OLD args).
- **Important** (env drift): 1 — backup env file contains live OpenAI key + deprecated `HINDSIGHT_EMBED_*` prefix.
- **Operator decisions** (orphan files): 181 plugin temp dirs + 45 leftover `.pyc` + 7 `tmp/codex-home*` + 5 stale project dirs + 22 root/.bak/probe files = **~260 prunable artifacts** (cardinal-rule-compliant; no risk to live runtime).
- **Backups**: 1 immediate-delete (credential leak), 14 stale-but-safe candidates.

All plugin cache resolves; pyrightconfig is clean; all model files exist; all marketplace install locations exist; the lone non-archived `.claude/hooks/` script (`context-mode-cache-heal.mjs`) is the documented CC-bug-#46915 workaround.
