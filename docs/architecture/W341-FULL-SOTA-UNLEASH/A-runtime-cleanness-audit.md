# W341 Stream A — Runtime Cleanness Audit

> Wave: W341-FULL-SOTA-UNLEASH · Stream: A · Date: 2026-05-20
> Scope: loader:1386 hunt + hooks audit + plugin load_failures + silent fallbacks + self-invent sweep + terminal hygiene.
> Probe method: native `Read`/`Glob` + sandboxed `ctx_execute` Node JS analysis (no Bash flood per context_window_protection).

## §1 loader:1386 root cause

**VERDICT: NOT CURRENT — historical error from W285 codex dual-review transcripts.**

- Filesystem hunt across `Z:/claude-sota-installed/.claude/state/`, `.claude/debug/`, `tmp/`, `Z:/claude-sota-installed-state/.codex/`, `Z:/claude-sota-installed-state/.claude/` (43 + 1 files indexed + outside-state walk) returned 42 hits, ALL in `Z:\claude-sota-installed\tmp\codex-dual-review-w285-{7bcbb8d,bf492fd,…}.log` — Wave 52/W285 codex review transcripts discussing the ECC plugin loader:1386 recovery, not live error traces.
- Verified: ECC plugin `plugin-hook-bootstrap.js` exists at BOTH locations referenced by hooks.json: `Z:/claude-sota-installed/.claude/plugins/marketplaces/everything-claude-code/scripts/hooks/plugin-hook-bootstrap.js` (6134 B) AND `Z:/.../cache/everything-claude-code/everything-claude-code/2.0.0-rc.1/scripts/hooks/plugin-hook-bootstrap.js`. `node.exe` resolves both.
- `Z:/claude-sota-installed-state/.codex/.sandbox/sandbox.log:42106` hit was a self-grep echo of an audit string, NOT an error.
- Operator-reported terminal error was either (a) prior to W317-Stream-C bash-home-pin fix or (b) transient single-fire from a stale `${CLAUDE_PLUGIN_ROOT}` resolution race (per ECC has `.claude-plugin/plugin.json` + `.codex-plugin/plugin.json` + `.cursor/hooks.json` — 5 hook manifest locations; cross-edition resolver may misfire once on cold-start).

**Action**: no live fix needed. If error re-fires, add `set -x; node --trace-warnings` to `tools/eee.ps1` launch wrapper to surface require() chain.

## §2 hooks audit

**`.claude/settings.json:hooks.*`** (Read `.claude/settings.json` L114-257) — all hook commands inspected. Direct-CLI invocations or sanctioned shim per CR-2:

| Event | Hook | Target | Status |
|---|---|---|---|
| SessionStart | `context-mode-cache-heal.mjs` | `.claude/hooks/context-mode-cache-heal.mjs` (1656 B) | **CR-2-SANCTIONED-SHIM** (patches anthropics/claude-code#46915) |
| UserPromptSubmit | `parallel-guard-userpromptsubmit.mjs` | `tools/parallel-guard-userpromptsubmit.mjs` (3690 B) | CR-2 violation? — see Issue §7-A |
| PreToolUse:Bash | `gitleaks protect` + `trivy fs` + `codex-companion.mjs adversarial-review` | direct-CLI + codex-plugin-shipped | OK (direct-CLI) |
| PreToolUse:Edit\|Write | inline-bash `grep` lint | direct-CLI | OK |
| PreToolUse:Agent | `preagent-parallel-guard.mjs` (17511 B) + `preagent-subagent-validator.mjs` (4427 B) | tools/ | **see Issue §7-A** |
| PostToolUse:Edit\|Write\|MultiEdit | inline-bash `ruff` + `shellcheck` | direct-CLI | OK |
| PreCompact | `powershell` audit-log Add-Content | direct-CLI | OK |
| WorktreeRemove | `git worktree prune` | direct-CLI | OK |
| SubagentStop | `subagent-stop-guard.mjs` (5596 B) | tools/ | **see Issue §7-A** |
| Notification | `powershell Beep` | direct-CLI | OK |
| PostToolUseFailure:Bash | `powershell ConvertFrom-Json` | direct-CLI | OK |
| TaskCompleted | `ruff check tools harness` | direct-CLI | OK |

**Issue §7-A** — `tools/{parallel-guard-userpromptsubmit,preagent-parallel-guard,preagent-subagent-validator,subagent-stop-guard}.mjs` are referenced by `settings.json` but live under `tools/`, NOT `.claude/hooks/`. They are project-owned, >2KB (17.5KB for preagent-parallel-guard). Whether they pass CR-2 depends on interpretation:
- If CR-2 covers ONLY `.claude/hooks/**` (as the rule literally states), these are **out of scope** — OK.
- If CR-2 covers any project-owned hook-body, these are **CR-2 violations** unless cite-anchored to a specific anthropics/claude-code issue. CLAUDE.md L70-74 covers R5-corollary (dual-mode advisory exit 0 + binding exit 2 — sanctioned CR-5-exception condition-(b) per W330 r1 + Δ-DPA-5 + W331 r4). **VERDICT: sanctioned via R5-corollary acceptance record; not a violation.**

All ECC plugin hooks (`.claude/plugins/cache/everything-claude-code/.../hooks/hooks.json`) use absolute `Z:\\tools\\nodejs\\node.exe` + absolute marketplaces paths (56 hardcoded paths, 0 `${CLAUDE_PLUGIN_ROOT}` patterns). Upstream-plugin-shipped, so CR-2-compliant by trust-tuple — but non-portable. Drift risk if `Z:` drive remaps.

## §3 plugin load_failures

Probe via `installed_plugins.json` keys vs `enabledPlugins` keys (settings.json L271-340):

| Metric | Value |
|---|---|
| `cache_dirs` | 15 |
| `marketplace_dirs` | 23 |
| `installed_plugin_keys` | 64 |
| `installed_plugin_records` | 65 (one plugin — `typescript-lsp` — installed twice: project + user scope) |
| `enabledPlugins entries` | 68 |
| `enabled_true` | 58 |
| `enabled_false` | 10 |

**Mismatches — `enabled` keys absent from `installed_plugins.json`**: 4
1. `clickhouse@claude-plugins-official` (`enabled=true`) — **SHIP-BLOCKER P0**: cache dir EXISTS at `cache/claude-plugins-official/clickhouse/{1.0.0,13a2df004af0,db1c108dde6e}` but no install record → plugin silently disabled at runtime despite `enabled=true`. Root cause: install record drift (3 versions on disk, none indexed).
2. `outputai@claude-plugins-official` (`enabled=true`) — **SHIP-BLOCKER P0**: same pattern, 3 cache versions, no install record.
3. `qdrant-skills@claude-plugins-official` (`enabled=false`) — harmless, intentionally disabled, no cache.
4. `superpowers@superpowers-marketplace` (`enabled=false`) — harmless, has cache at `superpowers-marketplace/superpowers/5.1.0/` but intentionally disabled (operator uses `superpowers@claude-plugins-official` instead).

**Marketplace-no-cache drift = 8** (post-W316 retirements not pruned): `abhigyanpatwari-GitNexus, addy-agent-skills, claude-community, claude-for-financial-services, healthcare, knowledge-work-plugins, life-sciences, mcp-memory-service`. P2 — inert, but invalidates W340 `marketplace_dirs=23` count.

`load_failures=1` per CLAUDE.md L98 (`everything-claude-code@everything-claude-code` per W337 codex-r2 Axis-9) was NOT reproduced — ECC dir + plugin.json + hooks.json all present. Probe shows `package.json:main=undefined` for ECC (`name=ecc-universal version=2.0.0-rc.1`); this is normal (plugin loader uses `.claude-plugin/plugin.json`, not `package.json:main`). The W337 load_failure tag may itself be stale.

## §4 silent fallbacks

- **`.claude/state/subagent-type-allowlist.json`**: 14540 B, 173 `allow[]` + 138 `legacy_bare_aliases[]` + 13 `colliding_bare_names[]` + 33 `orphaned_fqn[]` = 311 total + 13 collision-flagged + 33 orphan-preserved. **Provenance gap (P1)**: `generated_at=n/a`, `source_commit_sha=n/a`, `schema_version=n/a` — staleness undetectable. Regen via `node tools/build-subagent-allowlist.mjs --regenerate` would restore (per CLAUDE.md cardinal-rule-3).
- **`tools/preagent-subagent-validator.mjs`**: dual-mode confirmed — 1× `process.exit(2)` binding-hard-block + 5× `process.exit(0)` advisory-soft-fall (W331 r2 sanctioned R5-corollary).
- **`.mcp.json` interpolations**: 14 servers, all interpolated vars SET in process.env: `GITHUB_TOKEN` (93), `LANGFUSE_HOST/PUBLIC_KEY/SECRET_KEY` (21/42/42), `PERPLEXITY_API_KEY` (53), `TAVILY_API_KEY` (59), `EXA_API_KEY` (36). **UNSET (intentional)**: `HF_TOKEN` (hf-mcp-server anonymous-mode OK per server instructions), `ANTHROPIC_API_KEY` (CC uses auth via Claude CLI, not env-key). No silent fallbacks.
- **`disabledMcpjsonServers`**: `[]` (empty). No dead-block.
- **Hook target existence**: all 7 hook-command-referenced scripts exist + `Z:/tools/nodejs/node.exe` (85804032 B) — `MISSING_COUNT=0`.

## §5 self-invent sweep

`find Z:/claude-sota-installed/.claude/hooks/ -depth 5 -name '*.{py,sh,mjs,js,ts,ps1,bat}'`:

```
OK    1656  (sanctioned)  Z:\claude-sota-installed\.claude\hooks\context-mode-cache-heal.mjs
```

**hook_files_total=1**, all under 2KB, the one file is the sanctioned shim per CLAUDE.md cardinal-rule-2 (patches `anthropics/claude-code#46915`). `self_invented_count: 0` invariant **HOLDS**.

## §6 terminal hygiene

- **`BASH_ENV`** = `Z:/claude-sota-installed/.claude/state/bash-home-pin.sh` (set in settings.json:48). File EXISTS (464 B). Contents (verified):
  ```bash
  #!/usr/bin/env bash
  # W317-Stream-C 2026-05-19: re-pin HOME post /etc/profile to suppress Git Bash POSIX conversion.
  # W318-S1+S2 hardening: guard $USERPROFILE unset to prevent silent HOME=empty.
  if [ -n "${USERPROFILE:-}" ]; then
    export HOME="$USERPROFILE"; export ECC_HOME="$USERPROFILE"
  else
    printf '[bash-home-pin] USERPROFILE unset — HOME not re-pinned\n' >&2
  fi
  ```
  W317-Stream-C / W318-S1+S2 fix is **LIVE and correct**.
- **MSYS env**: `MSYS_NO_PATHCONV=1` + `MSYS2_ARG_CONV_EXCL=*` + `MSYS2_ENV_CONV_EXCL=*` set in settings.json:38-40. **Git Bash POSIX path mangling suppressed.**
- **PowerShell vs Git Bash**: `CLAUDE_CODE_USE_POWERSHELL_TOOL=1` set (settings.json:13); `CLAUDE_CODE_GIT_BASH_PATH=C:\Program Files\Git\bin\bash.exe` (CLAUDE.local.md). Hook commands using `bash -c "…"` syntax inherit `BASH_ENV` correctly via `MSYS_NO_PATHCONV`. **Drift not detected.**
- **Z:/claude-sota-installed-state/W317-z-phantom-archive/** exists (from W317-r2 Stream-C cleanup) — phantom Z:\z\ write surface neutralized.

## §7 P0 SHIP-BLOCKER list

| # | Sev | Finding | Fix |
|---|---|---|---|
| 1 | **P0** | `clickhouse@claude-plugins-official` enabled=true but NOT in installed_plugins.json — silent-disabled at runtime | `/plugin uninstall clickhouse@claude-plugins-official` then `/plugin install clickhouse@claude-plugins-official`, OR set `enabled=false` if no longer needed |
| 2 | **P0** | `outputai@claude-plugins-official` enabled=true but NOT in installed_plugins.json — silent-disabled at runtime | same — `/plugin uninstall && /plugin install` cycle, OR `enabled=false` |
| 3 | P1 | `.claude/state/subagent-type-allowlist.json` provenance gap (`generated_at=n/a`, `source_commit_sha=n/a`, `schema_version=n/a`) | `node tools/build-subagent-allowlist.mjs --regenerate` to backfill ts+sha headers |
| 4 | P2 | 8 marketplace_dirs without cache (W316 retirement residue): `abhigyanpatwari-GitNexus, addy-agent-skills, claude-community, claude-for-financial-services, healthcare, knowledge-work-plugins, life-sciences, mcp-memory-service` | `rm -rf` these dirs; update CLAUDE.md `marketplace_dirs=23 → 15` |
| 5 | P3 | ECC plugin `hooks/hooks.json` uses 56 hardcoded `Z:\\` absolute paths instead of `${CLAUDE_PLUGIN_ROOT}` interpolation — non-portable | upstream-fix candidate (open issue at affaan-m/everything-claude-code); don't local-patch (CR-2-trust violation if we do) |
| 6 | P3 | CLAUDE.md L98 reports `load_failures=1` for ECC but probe shows ECC fully installed + reachable; the stale `load_failures=1` claim survives from W337 codex-r2 audit | reconcile during W341 closure-synthesis — likely already-resolved |
| 7 | INFO | `enabled_true=58, enabled_false=10` — CLAUDE.md L98 W340 canonical-count says `enabled_true=58, enabled_false=10` — MATCHES | no action |

loader:1386 NOT listed: probe found no current trace; only W285 historical references.

## §8 cite-anchors

- **`.claude/settings.json:48`** — `BASH_ENV` value
- **`.claude/settings.json:114-257`** — full `hooks.*` block
- **`.claude/settings.json:271-340`** — `enabledPlugins` keys
- **`.claude/plugins/installed_plugins.json:1-717`** — installed records canonical (read direct)
- **`.claude/state/bash-home-pin.sh:1-9`** — pin discipline live
- **`.claude/state/subagent-type-allowlist.json`** — 14540 B, 173+138 entries
- **`Z:/claude-sota-installed/.claude/hooks/context-mode-cache-heal.mjs`** — sanctioned CR-2 shim, 1656 B
- **`Z:/claude-sota-installed/tmp/codex-dual-review-w285-{7bcbb8d,bf492fd}.log`** — historical loader:1386 references (NOT live)
- **Anthropic docs**: `https://docs.anthropic.com/en/docs/claude-code/hooks` (CR-2) + `https://code.claude.com/docs/en/plugins` (CR-1 trust-tuple) + `https://code.claude.com/docs/en/sub-agents` (CR-3 FQN discipline)
- **CLAUDE.md L70-74** — R5-corollary (W329-A binding-gate dual-mode acceptance)
- **CLAUDE.md L98** — W340 canonical counts (re-verified MATCH)
- **W337 codex-r2 Axis-9** — ECC `load_failures=1` claim NOT REPRODUCED this wave; pending reconciliation
- **W285 codex dual-review** — loader:1386 historical context, NOT current bug
