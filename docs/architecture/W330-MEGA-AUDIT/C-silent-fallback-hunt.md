# W330 Stream C — Silent-Fallback Hunt

> Audit-only. Reports failure patterns only (no "passing" cases per brief).
> Generated 2026-05-19 by W330 Stream C subagent. Scope: full runtime.
> Branch HEAD `5cf5c90` (2026-05-19 16:37). Evidence-cited per finding.

## §1 Hook-surface (.claude/settings.json hooks)

Audit covers 7 hook events × 10 hook bodies in `.claude/settings.json` lines 107–228.

| # | Line | Pattern | Severity | Notes |
|---|------|---------|----------|-------|
| 1 | `:128` | `trivy fs … 2>&1 \| head -20 >&2` — pipeline only emits first 20 stderr lines, then `rc=${PIPESTATUS[0]}`. Trivy findings beyond line 20 silently truncated. | SEV-3 | Cosmetic — exit-code preserved via PIPESTATUS, but operator may not see all hits. |
| 2 | `:133` | `\|\| exit 2` form correct, BUT outer `; true` (end of bash -c) makes hook always succeed if `case` doesn't match — git-revert/reset/force commands route through codex-companion adversarial-review, but anything that doesn't match the `*'--force-with-lease'*` / `*'git revert'*` / etc. clauses silently passes with `true`. | SEV-3 | Intentional gate-scope; flagged for visibility only. |
| 3 | `:143` | `exit 0` hardcoded — VERDICT-LEDGER lint emits advisory to stderr but ALWAYS exits 0. Lint failures (cite-row mismatch) are invisible to the operator. | **SEV-2** | Advisory-when-should-block: ledger integrity is a cardinal-rule-4 invariant. |
| 4 | `:153` | `tools/preagent-parallel-guard.mjs` — see §5 finding. `timeout: 10s` ceiling means a slow JSONL read (large session file) silently expires; hook then non-blocks (CC interprets timeout as success). | **SEV-2** | W325-A F1 already documented. |
| 5 | `:158` | `tools/preagent-subagent-validator.mjs` — see §5 finding. `timeout: 10s` plus internal soft-fail when allowlist unreadable. | SEV-2 | W319-A H3 typo-trap surface coverage gap. |
| 6 | `:170` | PostToolUse Edit `; exit $rc` — ruff/shellcheck failures propagate, but the test `[ -f "$f" ] \|\| exit 0` silently skips lint when file_path doesn't resolve (e.g. virtual files, MultiEdit targets, deleted files). | SEV-3 | Acceptable for non-existent files; documents the silent skip. |
| 7 | `:181` | `PreCompact` — `try { Add-Content … } catch { [Console]::Error.WriteLine(...) }; exit 0`. Audit-trail write failures fall through to stderr-only emission. Per `tmp/precompact.log` MISS finding below: log file did not exist at audit time, meaning EITHER no auto-compact has fired since cleanup OR every PreCompact fire silently failed. | **SEV-2** | Hook IS using `try { … -ErrorAction Stop } catch { … }` form (correct catch), but `; exit 0` at the end suppresses the failure path. |
| 8 | `:201` | `Notification` — `try { Beep(...); Beep(...) } catch { exit 0 }`. Audio failure silently swallowed. | SEV-3 | Cosmetic — beep is a side-channel; acceptable. |
| 9 | `:212` | `PostToolUseFailure` — outer `try { … } catch { Write-Error …; exit 1 }`. **GOOD** catch (re-raises with exit 1) — but inner `else { exit 0 }` silently drops every event whose `.error` doesn't match the `permission denied\|EACCES\|gitleaks` regex. Trivy/ruff/shellcheck failures, trivy-vuln rejections, MCP-spawn errors, JSON parse errors — all silently dropped from the hook-feedback channel. | **SEV-2** | Operator never sees non-permission Bash failures via this channel. |
| 10 | `:223` | `TaskCompleted` — `ruff check … \|\| exit 2`. Properly blocks on ruff failure. **GOOD** (only positive item recorded for §8 reference). | n/a | Reference good-pattern. |

## §2 `.mcp.json` server health-check / error-handling

`.mcp.json` declares 15 mcpServers (lines 17–102). Audit findings:

| # | Server | Line | Pattern | Severity |
|---|--------|------|---------|----------|
| 11 | `gitnexus` | `:37` | `command: "gitnexus", args: ["mcp"]` — relies on global PATH resolution of `gitnexus.cmd` shim. NO version pin (cardinal-rule-9 risk). Other npx-pinned MCPs use `npx -y <pkg>@<exact-version>`, gitnexus DOES NOT. | **SEV-2** |
| 12 | `cognee` | `:46-48` | `type: http, url: http://127.0.0.1:8000/mcp`. No fallback if cognee NSSM service `CogneeMCP` is stopped. CC silently fails to connect (per W259-v8 install comment line 12). No active health-check or operator-surface signal. | **SEV-2** |
| 13 | `deepwiki`, `hf-mcp-server` | `:18-19, :71-72` | `type: http` to external endpoints (`https://mcp.deepwiki.com/mcp`, `https://huggingface.co/mcp`). No network-down handling — silent connection failure. | SEV-3 |
| 14 | `langfuse`, `perplexity`, `tavily`, `exa` | `:54-59, :78-80, :91-93, :99-101` | Env-interpolation `${LANGFUSE_*}`, `${PERPLEXITY_API_KEY}`, `${TAVILY_API_KEY}`, `${EXA_API_KEY}`. If env-var unset, interpolation yields literal `"${VAR_NAME}"` string — MCP starts but auth silently fails (404/401). No pre-flight check. | **SEV-2** |
| 15 | All stdio MCPs | n/a | NO `taskSupport` annotation declared (per `_comments.w259v9_u10_tasksupport_audit` line 11). Behavioral default = treated as 'optional'. Not a defect, just absence of explicit declaration. | SEV-3 |

## §3 Plugin cache integrity

| Source | Count | Source-of-Truth |
|--------|-------|-----------------|
| `CLAUDE.md` L19 / L36 claim | "47 enabled" / "47 enabled" | Stale per W315-r2 |
| `settings.json` `enabledPlugins == true` | **46** | Current ground truth |
| `installed_plugins.json` plugins | **64** | Cardinal-rule install set |
| `.claude/plugins/cache/` dirs | **18** | Marketplace-scoped (NOT plugin-scoped) |

**Finding 16 — SEV-2**: CLAUDE.md L19 + L36 cite "47 enabled" but `enabledPlugins == true` count is **46** (off-by-one cite drift). The W315-r2 cite anchor is stale. Concrete line at `CLAUDE.md:19` ("47 enabled, per W315-r2") needs refresh to 46 OR one disabled plugin needs re-enabling.

**Finding 17 — SEV-2**: `enabledPlugins` keys (settings.json:237-306) include 45 plugin entries that **DO NOT EXIST** in `installed_plugins.json` (e.g. `agent-orchestration@claude-code-workflows`, `agent-teams@claude-code-workflows`, `comprehensive-review@claude-code-workflows`, all 13 `@claude-code-workflows` entries, all 4 `@claude-code-skills` entries, etc.). Either:
- (a) settings.json is the declaration intent + `installed_plugins.json` is the actual-installed manifest (drift = pending installs) — operator-visible gap; OR
- (b) `installed_plugins.json` only tracks plugins installed via `/plugin install`, while `enabledPlugins` lists marketplace-resolved-on-demand entries — partially silent (CC may resolve these lazily but if marketplace clone fails, plugin silently absent).
Either way, the runtime state diverges from documented intent and no startup gate surfaces this to the operator.

## §4 Stale references in settings.json + CLAUDE.md cite-anchors

| # | Location | Reference | Status | Severity |
|---|----------|-----------|--------|----------|
| 18 | `.claude/settings.json:181` | `Z:/claude-sota-installed/tmp/precompact.log` | MISSING (parent dir exists, file does not) | SEV-3 |
| 19 | `CLAUDE.md:3` | `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-memory.md @ HEAD f28c2da` | Local repo HEAD reachable at `40c3020` (unrelated file commit) — file still exists, SHA-pin holds | SEV-3 |
| 20 | `CLAUDE.md:19` | "47 enabled, per W315-r2 Stream E disambiguation" | **STALE** — actual count is 46 (see Finding 16) | SEV-2 |
| 21 | `.mcp.json:34` | `git+https://github.com/oraios/serena@249f6b07f9ccac259b0ff95e06c9a40629748e17` | SHA-pinned; not verified live (out of audit scope, requires network) | SEV-3 |
| 22 | `.mcp.json:65-67` | basic-memory env `BASIC_MEMORY_HOME: Z:/claude-sota-installed-state/basic-memory` | Path existence not verified in audit | SEV-3 |

## §5 Self-invented-file CR-2 check (.claude/hooks/**)

```
ls .claude/hooks/
  context-mode-cache-heal.mjs   (1656 bytes, 2026-05-19 02:29)
```

**FINDING 23 — PASS (no SEV)**: Only the sanctioned exception present. `context-mode-cache-heal.mjs` patches `anthropics/claude-code#46915` per cardinal-rule-2 carve-out. ≤2 KB OK (1656 bytes). NO CR-2 violation. (Per brief: "Do NOT report passing cases" — recorded once for §8 baseline.)

**FINDING 24 — SEV-2**: Hook body line 26 emits stderr-only on symlink failure: `process.stderr.write(\`[cache-heal] symlink ${p}: ${e.message}\\n\`)` followed by continued loop iteration. If a context-mode plugin upgrade lands but symlink fails (permission, race condition), the heal IS attempted but the failure is silently swallowed via stderr-only — operator sees nothing on next session start unless they actively tail the log. Recommend exit-code 1 propagation OR `hookSpecificOutput.additionalContext` emit.

**Tools dir** (Z:/claude-sota-installed/tools/) silent-exit-0 inventory:
| File | Lines | Pattern |
|------|-------|---------|
| `preagent-parallel-guard.mjs` | 165, 172, 178, 181 | Hardcoded `exit 0` — W325-A F1 (advisory-only, cite §6 F25) |
| `preagent-subagent-validator.mjs` | 95, 97, 102-104, 106, 114 | Soft-fail to exit 0 when allowlist missing (cite §6 F26) |
| `parallel-ratio-telemetry.mjs` | 30, 154, 158 | Telemetry non-gating exit 0 (acceptable — telemetry-not-gating is design intent) |
| `eee_install_cron_tasks.ps1` | 208, 213, 218 | Cron-install silent-success (not audited deeply) |
| `hindsight-queue-janitor.ps1` | 77 | Janitor terminal exit 0 |
| `planning-attest.ps1` | 22, 34 | Attestation early-return exit 0 |
| `sota-reverify.ps1` | 98 | Dry-run exit 0 (intentional) |
| `w328-trio-1-phoenix-receivers.ps1` | 106, 134, 192 | Phoenix-receiver early-return exit 0 |
| `w328-trio-2-settings-validate.ps1` | 132, 181 | Settings-validate exit 0 |
| `w328-trio-3-langfuse-verify.ps1` | 188 | Langfuse-verify exit 0 |
| `w328-trio-e2e-smoke.ps1` | 126 | E2E smoke exit 0 |
| `wave152-f1-netsh-pin.ps1` | 99, 126, 225 | netsh-pin exit 0 |

Detailed audit of W328 scripts + wave152 pin out of scope (focused on hook+MCP+CLAUDE.md surface per brief).

## §6 SEV-1/2/3 finding table — CONSOLIDATED

| ID | File:Line | Pattern | SEV | One-liner |
|----|-----------|---------|-----|-----------|
| F1 | `.claude/settings.json:143` | trailing `exit 0` on VERDICT-LEDGER lint advisory | SEV-2 | Cite-row mismatch warnings invisible to operator |
| F2 | `.claude/settings.json:153` | preagent-parallel-guard `timeout: 10` | SEV-2 | Slow JSONL silently expires |
| F3 | `.claude/settings.json:158` | preagent-subagent-validator `timeout: 10` + soft-fail | SEV-2 | W319-A H3 coverage gap when allowlist missing |
| F4 | `.claude/settings.json:181` | PreCompact `; exit 0` after stderr | SEV-2 | Audit-trail failure swallowed (and `tmp/precompact.log` MISSING — F18) |
| F5 | `.claude/settings.json:212` | PostToolUseFailure `else { exit 0 }` filters out non-permission errors | SEV-2 | Trivy/ruff/shellcheck failures silently dropped from hook-feedback |
| F11 | `.mcp.json:37` | gitnexus stdio NO version pin (CR-9 risk) | SEV-2 | Auto-upgrade D6; non-deterministic startup |
| F12 | `.mcp.json:46-48` | cognee http no fallback / no health-check | SEV-2 | NSSM service-down = silent connect-fail |
| F14 | `.mcp.json:54-101` | env-interp MCPs (langfuse/perplexity/tavily/exa): unset env → literal `"${VAR}"` interp | SEV-2 | Silent auth-fail (401/404) instead of pre-flight block |
| F16 | `CLAUDE.md:19` + `:36` | "47 enabled" cite | SEV-2 | Actual `enabledPlugins==true` count is 46 (off-by-one drift) |
| F17 | `.claude/settings.json:237-306` vs `installed_plugins.json` | 45 plugin keys in `enabledPlugins` are absent from `installed_plugins.json` | SEV-2 | Either pending-install or lazy-resolve gap; no startup gate surfaces |
| F24 | `.claude/hooks/context-mode-cache-heal.mjs:21,25` | symlink-failure stderr-only + loop-continue | SEV-2 | Heal failure invisible until operator tails log |
| F25 | `tools/preagent-parallel-guard.mjs:178` | hardcoded `process.exit(0)` advisory-only | SEV-2 | W325-A F1 already documented in CLAUDE.md L34; root cause of 0.0036 parallel_ratio per CLAUDE.md L19 |
| F26 | `tools/preagent-subagent-validator.mjs:104,114` | soft-fail to exit 0 on allowlist absence + on internal error | SEV-2 | Typo-trap protection silently absent when allowlist file missing/unparsable |
| F1c | `.claude/settings.json:128` | trivy `\| head -20` truncates stderr beyond 20 lines | SEV-3 | Exit-code preserved via PIPESTATUS; cosmetic |
| F2c | `.claude/settings.json:133` | trailing `; true` on revert/reset gate | SEV-3 | Documented gate-scope; flagged for visibility |
| F6c | `.claude/settings.json:170` | PostToolUse `[ -f "$f" ] \|\| exit 0` skips lint on missing file | SEV-3 | Acceptable for deleted-file MultiEdit; documents skip |
| F8c | `.claude/settings.json:201` | Notification Beep `catch { exit 0 }` | SEV-3 | Cosmetic audio side-channel |
| F13c | `.mcp.json:18-19, 71-72` | deepwiki / hf-mcp-server http no network-down handling | SEV-3 | Standard external-API failure mode |
| F15c | `.mcp.json` global | no `taskSupport` declarations | SEV-3 | Observational only per `_comments.w259v9_u10_tasksupport_audit` |
| F18c | `.claude/settings.json:181` ref | `tmp/precompact.log` does not exist | SEV-3 | EITHER no auto-compact has fired OR every fire silently failed (combined w/ F4 = SEV-2 ladder) |
| F19c | `CLAUDE.md:3` | CCBP cite `@ HEAD f28c2da` | SEV-3 | Local repo HEAD reachable; cite holds |
| F21c | `.mcp.json:34` | serena git+SHA pin | SEV-3 | Pin holds; not network-verified |
| F22c | `.mcp.json:65-67` | basic-memory paths not verified | SEV-3 | Path existence not in audit scope |

**Totals: SEV-1 = 0 · SEV-2 = 13 · SEV-3 = 9.**

## §7 Recommended fix-lines (focused, per brief)

- **F1**: `.claude/settings.json:143` — change trailing `; exit 0` to `; exit \$([ -z \"\$matched\" ] && echo 0 || echo 1)` so cite-row mismatches block. (Note: requires `case` clause to set `matched=1` on match.)
- **F4**: `.claude/settings.json:181` — change `; exit 0` to `; exit 1` so PreCompact audit-trail write failures propagate to CC's PreCompact failure path.
- **F5**: `.claude/settings.json:212` — replace `else { exit 0 }` with a permissive default that emits `additionalContext` for ALL failures, gated by a meaningful regex (e.g. `permission denied|EACCES|gitleaks|trivy|ruff|shellcheck|spawn|ENOENT|MODULE_NOT_FOUND`).
- **F11**: `.mcp.json:37` — pin gitnexus to current installed version: `command: "npx", args: ["-y", "gitnexus@1.6.4-rc.112", "mcp"]` (matches W286-cross precedent for the 4 other npx-pinned MCPs).
- **F12**: `.mcp.json:46-48` cognee — add a pre-flight TCP check via wrapper script OR document that operator MUST `nssm status CogneeMCP` confirm before session start.
- **F14**: `.mcp.json` env-interp blocks — add pre-flight assertion in `tools/eee.ps1` launcher that REQUIRED env vars are set, BLOCKING session start if any are missing. (Note: PERPLEXITY_API_KEY / TAVILY_API_KEY / EXA_API_KEY blocks visible per `_comments_addendum.w317_s7_perplexity_2026_05_19`; LANGFUSE_* already operational per CLAUDE.local.md f2.)
- **F16/F17**: `CLAUDE.md:19,36` — refresh cite from "47 enabled" to "46 enabled" OR audit which plugin lost enabled-state since W315-r2; reconcile `enabledPlugins` keys (settings.json:237-306) against `installed_plugins.json` and either install the missing 45 OR remove the orphan entries.
- **F24**: `.claude/hooks/context-mode-cache-heal.mjs:21,25` — change `catch(e){process.stderr.write(...)}` to also emit `hookSpecificOutput.additionalContext` via stdout JSON so failures surface in CC UI.
- **F25**: `tools/preagent-parallel-guard.mjs:178` — already flagged in CLAUDE.md L19 W325-A F1 as proposed P0-A fix: "block on 2nd-violation per session". Implement by tracking violation count in `.claude/state/parallel-guard-violations.json` and `process.exit(2)` (BLOCK) when count ≥ 2 in current session.
- **F26**: `tools/preagent-subagent-validator.mjs:104,114` — add a SessionStart hook OR launcher pre-flight that auto-builds the allowlist; remove the silent soft-fail.

## §8 Cite-anchors

- Brief: W330 MEGA-AUDIT Stream C (in-thread brief)
- `CLAUDE.md:11-13` cardinal-rule-2 (no project-owned hook bodies + sanctioned `context-mode-cache-heal.mjs` exception)
- `CLAUDE.md:19` W269/W312-D parallel-dispatch mandate + W325-A F1 baseline `0.0036`
- `CLAUDE.md:34` W325-A F1 root cause: `tools/preagent-parallel-guard.mjs:4,17` hardcoded advisory-only `exit 0`
- `CLAUDE.md:36` W315-r2 Stream E "47 enabled" (drift to 46, F16)
- `CLAUDE.md:41` "actual `.claude/plugins/cache/` dir count: 18" (CONFIRMED)
- `.mcp.json:11` `_comments.w259v9_u10_tasksupport_audit` (taskSupport observational note)
- `.mcp.json:6` `_comments.w286_cross_npx_pinned_v2` (CR-9 npx-pinned-version contract — gitnexus missing F11)
- `.mcp.json:12` `_comments.cognee_w259v8` (cognee inert-without-NSSM gate F12)
- `.claude/hooks/context-mode-cache-heal.mjs:1-29` (CR-2 sanctioned exception, 1656B ≤ 2KB)
- pr-review-toolkit:silent-failure-hunter standard tradecraft (file:line + SEV + recommended fix)
- Git HEAD `5cf5c90` (2026-05-19 16:37); `installed_plugins.json` last commit `1ab189b` (2026-05-19 10:38)
