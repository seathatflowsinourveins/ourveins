# W327-S7 Runtime-Wide Silent-Fallback Hunt

> Sister fork to W327-S3 (agent-teams). This fork covers ALL OTHER runtime components:
> hooks, tool scripts, settings.json hook commands, MCP servers, skills, memory tiers, codex.
>
> Wave: W327-S7 · Date: 2026-05-19 · Status: COMPLETE
>
> Cite-anchored Anthropic docs:
> - hooks: https://docs.anthropic.com/en/docs/claude-code/hooks
> - settings: https://docs.anthropic.com/en/docs/claude-code/settings
> - skills: https://code.claude.com/docs/en/skills
> - sub-agents: https://docs.anthropic.com/en/docs/claude-code/sub-agents
> - MCP: https://code.claude.com/docs/en/mcp
>
> Audit lens: project CLAUDE.md Cardinal Rule 2 + project standard "never silently fail in
> production code; always log via logForDebugging / logError / logEvent; use errorIds from
> constants/errorIds.ts; broad catch is forbidden; empty catch is forbidden".
>
> Severity classes used:
> - CRITICAL: silent failure that masks real production fault, debugging nightmare
> - HIGH: poor / generic error message, unjustified fallback, swallowed propagation
> - MEDIUM: missing context, could be more specific, expected-but-untested error path
> - LOW: comment-only suppression with rationale, low-impact

---

## §1 Hook-script silent-fallback audit

### 1.1 `.claude/hooks/context-mode-cache-heal.mjs` (CR-2 sanctioned exception)

| Loc | Severity | Pattern | Hidden errors | User impact |
|---|---|---|---|---|
| `:21` `catch(e){process.stderr.write(...)}` per-symlink unlink | MEDIUM | Logs to stderr but continues loop without aggregating failures | EBUSY (file locked by another CC), EACCES (NTFS permission denied), EPERM | If unlink fails silently, the subsequent `symlinkSync` at `:25` overwrites a stale lstat target, potentially leaving a broken junction the user sees as "context-mode disappears mid-session" |
| `:25` `catch(e){process.stderr.write(...)}` per-symlink create | MEDIUM | Same; logs but continues without surfacing fatal cache-heal failure | EACCES on `symlinkSync`, ENOENT on stale parent, EEXIST race with another CC session | Plugin remains broken; user sees `${CLAUDE_PLUGIN_ROOT}` errors with no actionable telemetry beyond a stderr line that scrolls past |
| `:28` `catch(e){...process.exit(1)}` top-level | LOW | Correct fail-loud; stderr + non-zero exit | n/a | OK pattern |
| `:10` `if(!existsSync(f))process.exit(0)` | LOW | Silent OK on missing manifest | n/a | First-run / no-plugin scenario; correct |

**Verdict**: §1.1 acceptable (sanctioned exception per CR-2 + cite-anchored to anthropics/claude-code#46915). Recommend aggregating per-entry failures into a single stderr summary line so the operator sees `cache-heal: 0 healed, 2 failed (EACCES, EBUSY)` instead of scrolling logs.

### 1.2 `.claude/settings.json` hook commands (CR-2 direct-CLI compliance)

| Loc | Severity | Pattern | Hidden errors | Recommendation |
|---|---|---|---|---|
| `settings.json:124` PreToolUse[Bash] `gitleaks protect --staged --no-banner --redact \|\| exit 2` | LOW | Explicit exit-2 propagation; correct fail-loud | n/a | OK |
| `settings.json:128` trivy scan with `\| head -20 >&2 ; rc=\${PIPESTATUS[0]}` | MEDIUM | `\$(jq ...)` could return empty on malformed event JSON → falls through to `*) ;;` arm and never scans. No surfaced telemetry that the bash extractor failed. | jq parse failure on malformed event, empty `.tool_input.command`, missing trivy binary (exit 127 silently swallowed by case-arm-not-matching) | Add explicit `jq -e` to fail-loud on no-match + log via `>&2` when extractor returns empty |
| `settings.json:133` codex adversarial-review hook | HIGH | `'Z:/tools/nodejs/node.exe' '...codex-companion.mjs' adversarial-review --wait \|\| exit 2` then `; true` at end | Per-shell-arm fallthrough silently emits exit 0 if no matcher hits, but ALSO if jq fails (returns empty cmd) the whole thing falls into the catch-all `;; esac; true` — silent OK on jq parse failure | Refactor: separate jq-extract step with `set -e` + explicit fail-loud on jq error |
| `settings.json:143` Edit\|Write VERDICT-LEDGER linter | LOW | `grep -qE ... \|\| exit 0` always returns 0 | n/a | OK; advisory only |
| `settings.json:181` PreCompact powershell `try { Add-Content ... } catch { [Console]::Error.WriteLine(...) }; exit 0` | MEDIUM | Always exits 0 even when audit-trail write fails — the operator never sees that compact events stopped logging | NTFS lock (precompact.log open by tail), disk full, path-not-found post-W317 ENV move | Should `exit 1` so CC surfaces the hook failure in `/doctor` |
| `settings.json:191` WorktreeRemove `git worktree prune 2>&1 \|\| echo '...' >&2` | MEDIUM | `\|\| echo` swallows the actual git error code | git index lock, missing worktree dir, permission denied on `.git/worktrees/` | Should `\|\| { echo ... >&2; exit 2; }` so failed prunes don't pile up silently |
| `settings.json:201` Notification beep `catch { exit 0 }` | LOW | Best-effort sound cue | n/a | OK |
| `settings.json:212` PostToolUseFailure parse with `Write-Error ... ; exit 1` on inner catch | MEDIUM | Outer `else { exit 0 }` silently skips the hook when `$ev.error` doesn't match the pattern — operator never knows that "the failure-feedback channel isn't firing for X% of failures" | Pattern miss for any non-gitleaks/EACCES error class (e.g. trivy CRITICAL, codex BLOCK output) | Either widen the regex OR log filtered events at DEBUG level so the audit can tell "ignored 47 events" vs "channel broken" |
| `settings.json:223` TaskCompleted `ruff check tools harness --quiet 2>&1 \|\| exit 2` | LOW | Correct fail-loud | n/a | OK |

### 1.3 `tools/preagent-parallel-guard.mjs` (registered as PreToolUse[Agent])

| Loc | Severity | Pattern | Hidden errors |
|---|---|---|---|
| `:46-50` stdin parse `try{...}catch{resolve({})}` + 400ms timeout fallback | HIGH | Silent fallback to `{}` on JSON parse failure OR stdin not piped — guard never fires + never logs the parse error | Malformed CC event payload, schema drift from upstream hooks API, very large event JSON > 400ms | Should stderr-log + still emit advisory ("guard could not parse event — multi-stream detection disabled") |
| `:62` `catch { /* not here */ }` on `stat(path)` | MEDIUM | Per-candidate stat failure swallowed; loop continues | EACCES, ENOENT race, network drive offline | If ALL candidates fail, hook exits 0 silently — operator gets no parallel-dispatch advisory ever and never knows why |
| `:77` `catch { /* ignore */ }` per-file stat | MEDIUM | Same as :62 | Same | Aggregate-and-log: "scanned N sessions, M unreadable" |
| `:82` `catch { /* ignore */ }` readdir | HIGH | Silent on session-dir read failure — the whole hook becomes a no-op without telling anyone | EACCES on Z:/claude-sota-installed-state/ post-W317 ENV move, drive offline, ECONNRESET on UNC paths | Should stderr-log "guard disabled: session-dir unreadable: <err>"; the parallel-dispatch mandate becomes invisible-OFF instead of visible-OFF |
| `:113` `catch { /* file unreadable */ }` last-assistant scan | MEDIUM | Same class | Partial JSON parse failures, EBUSY on actively-written JSONL | Log "skipped session-file: <err>" |
| `:141` `catch { /* */ }` user-prompt scan | MEDIUM | Same | Same | Same |
| `:156` `catch { /* stdout closed */ }` advisory emit | LOW | Best-effort | EPIPE on parent-closed | OK |
| `:181` `main().catch(() => process.exit(0))` | CRITICAL | **EMPTY top-level catch that silently exits 0**. Any uncaught exception in main (e.g. fs API change, Node version mismatch, regex perf catastrophic backtracking) makes the advisory disappear without trace. Per Cardinal Rule 2 sanctioned-exception scope, this hook lives outside the sanctioned exception list and per project standard "never silently fail in production code". | Schema drift in event payload, regex DoS on adversarial multi-stream wording, Node API breaking change | Should at minimum stderr-log the error before exit-0; ideally exit 2 if the operator wants the mandate enforced |

### 1.4 `tools/preagent-subagent-validator.mjs`

| Loc | Severity | Pattern | Hidden errors |
|---|---|---|---|
| `:46-48` stdin parse `try{...}catch{resolve({})}` + 400ms timeout | HIGH | Same class as 1.3:46 — silent fallback to empty event, validator never fires | Same | Should stderr-log |
| `:58` `catch { /* fall through */ }` allowlist JSON parse | MEDIUM | Returns null silently → soft-fail at :101 stderr-logs the soft-fail (OK) but no distinction between "file missing" and "file corrupted" | JSON corruption from concurrent allowlist rebuild | Add distinct stderr messages for the two cases |
| `:101-104` soft-fail to exit 0 on allowlist-not-loadable | HIGH | Self-documented as "soft-fail: advisory absent is preferred over false-positive blocking" — BUT this defeats the W319-A H3 typo trap when the allowlist is missing. Silent disabling of a CR-2/CR-4 mandate gate. | Allowlist rebuild script crashed, state-dir not writable, schema drift | Should treat allowlist-missing as a P1 operator-fix-needed event (stderr WARN + maybe SessionStart hook check) |
| `:111-114` top-level `main().catch((e) => { stderr-write soft-fail; exit 0; })` | HIGH | Top-level catch silently soft-fails — any subagent_type typo escapes blocking when the validator itself errors | Allowlist file format change, Node-22 fs API drift, ENOENT race | Should at minimum surface to operator via `/doctor`-visible failure mode |

---

## §2 Tool-script silent-fallback audit

### 2.1 `tools/parallel-ratio-telemetry.mjs`

| Loc | Severity | Pattern | Hidden errors |
|---|---|---|---|
| `:57` `catch { continue; }` per-root readdir | MEDIUM | Per-root failures silently skipped — telemetry computes ratio over only the reachable roots without flagging that 2 of 3 roots were unreachable | EACCES, network drive offline, post-W317 ENV redirect drift | Should emit "scanned X of Y roots" in output JSON |
| `:66` `catch { continue; }` per-file stat | MEDIUM | Same class | EBUSY on actively-written JSONL | Per-file warning in output |
| `:87` `catch { return {...zero...}; }` on readFile fail | HIGH | **Silent zero-fallback** — when a session JSONL is unreadable, telemetry treats it as "0 Agent dispatches" rather than "could not measure". The ratio number becomes false but looks valid. | EBUSY race, file truncation mid-read | Should mark file as ERROR and exclude from denom; emit explicit `unreadable_files: N` field |
| `:96` `catch { continue; }` per-line JSON parse | MEDIUM | Silent skip on malformed JSONL line | Truncated final line of actively-written JSONL | Track + emit `malformed_lines: N` |
| `:157-170` top-level `main().catch((err) => { ... status:'ERROR', exit 0 })` | MEDIUM | Telemetry-non-gating exit 0 with error JSON. **At least surfaces the error in the output blob** — better than most. Still: target audience for this tool is humans reading the JSON, so silent-pass-with-error-field is acceptable. | n/a | OK pattern; consider non-zero exit when called from cron so missing telemetry pages an operator |

### 2.2 `tools/codex_verdict_normalizer.py`

| Loc | Severity | Pattern | Hidden errors |
|---|---|---|---|
| `:64-70` `except (json.JSONDecodeError, OSError): return None` | MEDIUM | Per-file silent skip — incremented in `parse_errors` counter (good) but the counter is printed to stdout (not to a real log) — operator might miss it | Corrupted verdict file, file-locked-by-codex | OK because counter is emitted; consider promoting to logError equivalent (stderr if count > 0) |
| `:131-152` `except OSError: pass` on summary read | HIGH | **Silent failure on summary-load** — if the summary file is corrupted or perms-denied, `existing` falls back to `{}` and the entire dedup logic silently disables, leading to duplicate records on next run | EACCES on summary file, corruption from interrupted previous run | Should stderr-warn + maybe refuse to write until operator fixes |
| `:149` `except json.JSONDecodeError: continue` per-line | MEDIUM | Silent per-line skip during summary load | Truncated line | Track + warn |
| `:228-231` `except OSError as e: print err to stderr; return 1` | LOW | Correct fail-loud on write failure | n/a | OK |

### 2.3 `tools/sca-mcda-rank.py`

| Loc | Severity | Pattern | Hidden errors |
|---|---|---|---|
| `:42-52` load_cohort raises ValueError on shape mismatch | LOW | Correct fail-loud | n/a | OK pattern |
| All paths | LOW | No silent fallbacks in this script | n/a | Reference example of correct error handling |

### 2.4 `tools/sota-reverify.ps1`

| Loc | Severity | Pattern | Hidden errors |
|---|---|---|---|
| `:66` `$ErrorActionPreference = 'Stop'` then prints instructions | LOW | Correct fail-loud setup; this script intentionally only prints instructions for CC to follow (no MCP call from PS) | n/a | OK by design |

### 2.5 `tools/eee*.ps1` and friends — `-ErrorAction SilentlyContinue` audit

Found 30+ `-ErrorAction SilentlyContinue` uses across `tools/eee*.ps1`, `tools/bootstrap-runtime.ps1`, `tools/install-cli-extras.ps1`, etc. Most are appropriate (cleanup of env vars that may not exist, optional binary detection). Notable problem cases:

| Loc | Severity | Pattern | Hidden errors |
|---|---|---|---|
| `tools/eee.ps1:583` `} catch { }` | CRITICAL | **EMPTY catch block** — per project standard "Empty catch blocks are absolutely forbidden". Read surrounding context to confirm scope. | Any error inside the try | MUST replace with explicit stderr-log + handling |
| `tools/eee.ps1:611` `} catch { }` | CRITICAL | **EMPTY catch block** — same | Same | Same |
| `tools/eee-status.ps1:105` `} catch {}` | CRITICAL | **EMPTY catch block** — same | Same | Same |
| `tools/eee-backup.ps1:219,249,301` (`-ErrorAction SilentlyContinue` chained without follow-up check) | HIGH | If `Get-ChildItem` returns null silently, downstream code uses the null as if empty-array. Common Powershell anti-pattern. | Permission denied on plugin cache dir | Add explicit `if ($null -eq $X)` branch with stderr log |
| `tools/bootstrap-runtime.ps1:287` `& $PipExe show mcp 2>$null` | MEDIUM | Silent pip-show; if pip itself missing, the entire detection silently reports "no mcp" | Missing pip, broken venv | Should check pip exists first + log "pip unavailable" |
| `tools/eee-status.ps1:161` `& ccusage daily --json 2>$null` | MEDIUM | Silent ccusage failure → empty `$ccJson` → downstream parser sees malformed JSON | Missing ccusage binary, network failure to backend | Should check `$LASTEXITCODE` after, log if non-zero |
| `tools/sca-v7-prelim.sh:64,73,89` `2>/dev/null || true` | MEDIUM | Bash-style silent-OK on scorecard/criticality probes | Network failure, GitHub rate limit, binary missing | These are research-discovery probes; acceptable as a best-effort layer, BUT the downstream script does not validate the empty JSON `{}` is distinguishable from `{"score": 0}` |

---

## §3 MCP-server start-up silent-fallback (per server)

CC's MCP start-up handshake silently disables a server on `initialize` failure — there is no project-level wrapper that surfaces failed handshakes. Per `https://code.claude.com/docs/en/mcp`, a stdio server that fails to spawn or never responds to `initialize` is dropped from the deferred-tool surface without operator notification.

| Server | `.mcp.json` line | Failure mode | Surface |
|---|---|---|---|
| `deepwiki` (http) | `:17-19` | Silent fallback if `https://mcp.deepwiki.com/mcp` unreachable (corp firewall, DNS) | No tools list change is announced; operator finds out when `mcp__deepwiki__*` calls fail with "tool not found" |
| `chrome-devtools` (stdio npx) | `:21-25` | Silent if `npx -y chrome-devtools-mcp@1.0.1` fails to resolve from cache + offline → MCP marked unavailable | npx cache miss + offline = silent drop |
| `repomix` (stdio npx) | `:26-30` | Same | Same |
| `serena` (stdio uvx git+sha) | `:31-35` | Silent if `uvx --from git+...@SHA` fails (git fetch fail, sha gone) | Higher risk: pinned SHA could go missing |
| `gitnexus` (stdio) | `:36-40` | Silent if `gitnexus` not on PATH (W155 F13/W286-cross pivot context) | Disabled per `enabledPlugins.gitnexus-marketplace = false` so this is moot for the current runtime |
| `ccusage` (stdio npx) | `:41-45` | Silent npx failure | Same as repomix |
| `cognee` (http :8000) | `:46-49` | **Silent if cognee NSSM service stopped** — per `_comments.cognee_w259v8` "until the server is running this entry is INERT" but CC does NOT surface that the user's memory writes silently disappear. Per W317-S1, T3 is critical primary. | HIGH risk: silent T3 disable on service stop |
| `langfuse` (stdio node) | `:50-60` | Silent if `LANGFUSE_HOST` env-interp fails to resolve OR `:3000` port closed. Per operator wave-status "0-span ingestion" — this IS the failure being silently masked. | HIGH risk: confirmed silent fail-mode already happening |
| `basic-memory` (stdio uvx) | `:61-69` | Silent if `uvx --from basic-memory==0.21.1` fails. Per W317-S1 T6 is **canonical primary** memory; silent fail = silent memory loss. | CRITICAL risk |
| `hf-mcp-server` (http) | `:70-73` | Silent if `https://huggingface.co/mcp` unreachable OR rate-limited (per MCP-instructions in the message stream: "Hugging Face tools are being used anonymously and rate limits apply") | Rate-limit silent-disable is observable in the runtime |
| `perplexity` (stdio npx) | `:74-81` | Silent if `${PERPLEXITY_API_KEY}` env-interp unresolved (key not exported from CLAUDE.local.md) OR npm pkg fails | HIGH risk: per W317-S7 comment "Operator unleash this wave: PERPLEXITY_API_KEY env var confirmed-present in CC process env" — if operator forgets to export, silent disable |
| `playwright` (stdio npx) | `:82-86` | Silent npx failure | LOW risk |
| `tavily` (stdio npx) | `:87-94` | Silent if `${TAVILY_API_KEY}` unresolved (per W324 SHIP note "populate operator-side") + npm fail | HIGH risk: per CLAUDE.local.md TAVILY+EXA env block "populate operator-side" — almost certainly currently unresolved |
| `exa` (stdio npx) | `:95-102` | Same as tavily | Same |

**Pattern**: every `${ENV_VAR}` interpolation that fails to resolve silently passes empty string to the MCP server, which then either crashes on `initialize` (silent CC-side disable) or starts in a broken auth state where every tool call fails with provider-side 401. No project hook surfaces the env-resolution failure.

---

## §4 Skill auto-fire silent-skip patterns

Per `https://code.claude.com/docs/en/skills`, skills auto-fire when the user's prompt matches the skill `description:` field. The harness silently skips a skill when:

1. **Description regex doesn't match the user prompt** — by design, but the operator has no telemetry to detect "this skill should have fired but didn't" cases. Example: `incident-response:smart-fix` requires "intelligent issue resolution" phrasing; if the operator says "fix this bug" the skill silently doesn't fire and the response is generic.
2. **Skill is disabled in `enabledPlugins:`** — settings.json shows ~12 plugins disabled (e.g. `claude-mem@thedotmack: false`, `hindsight-memory@hindsight: false`). No operator-visible nudge that "X plugin is installed-but-disabled — did you mean to enable it?"
3. **Skill file path-broken after plugin cache update** — per W255 cache-heal context, plugin auto-update can break `${CLAUDE_PLUGIN_ROOT}` references; the skill silently doesn't auto-fire even when the description matches.
4. **Plugin marketplace `enabledPlugins` mismatch** — per the settings.json audit, `gitnexus@gitnexus-marketplace: false` AND `claude-mem@thedotmack: false` indicate operator-curated disables, but the runtime gives no surface to distinguish "intentionally off" from "broken / never installed".

**Recommendation**: a `SessionStart` hook that emits a "skills available: N, enabled: M, top 5 by recent invocation: ..." status line would convert silent-skip into visible state. Per W319-A H3 typo-trap precedent (which W326 P0-A2 closed for subagent_type), a sibling "skill_description_mismatch_warning" hook could analyze the operator's prompt vs skill descriptions and emit advisory text when a near-match misses.

---

## §5 Memory-tier (T2/T3/T5/T6) write-failure silent handling

Per CLAUDE.md `Runtime state` section, the 5-tier memory stack lives behind MCP servers; failure modes are entirely MCP-layer:

| Tier | Server | Failure surface |
|---|---|---|
| T1 hindsight | RETIRED per W317-S1 | n/a (already retired) |
| T2 memory split | `plugin:everything-claude-code:memory` | Plugin-loaded MCP — silent if plugin disabled or cache-heal failed. **No write-confirmation in the MCP response**: a successful write returns `{ "status": "OK" }` but a partial failure (e.g. sqlite_vec corruption) might also return success while the durable write was rolled back. No way to verify post-hoc. |
| T3 cognee | `.mcp.json:46-49` http :8000 | Per §3 above, **silent if NSSM service stopped**. The operator-facing MCP tool calls return error envelopes when used, but **passive memory writes** (those issued by other skills auto-firing) silently disappear without surfacing to the operator. |
| T4 graphiti | RETIRED per W295 | n/a |
| T5 langfuse | `.mcp.json:50-60` stdio node | Per operator wave-status "0-span ingestion" — **CONFIRMED silent silent-mode currently active**. OTEL exports configured in settings.json:23-28 point at `:3000/api/public/otel/v1/traces` but Langfuse silently drops them per the wave-status. No project hook surfaces the missing-span condition. |
| T6 basic-memory | `.mcp.json:61-69` uvx stdio | Per W317-S1 **canonical primary** — silent fail = silent memory loss. Common failure: `BASIC_MEMORY_HOME` redirect to `Z:/claude-sota-installed-state/basic-memory` may break if state-volume not mounted. Operator-AI-3 config.json path-drift fix is pending per `W295-BASIC-MEMORY-DEEP-AUDIT §5`. |

**Critical gap**: there is no end-to-end "memory write happened and was confirmed durable" telemetry. The runtime treats memory writes as fire-and-forget, even for T6 which is the canonical primary. A `mcp__basic-memory__write_note` returning OK does NOT guarantee the markdown file landed on disk + indexed, only that the MCP server acknowledged.

**Recommendation**: a `PostToolUse` hook on `mcp__basic-memory__write_note` (and sibling tools for other tiers) that issues a follow-up `read_note` to verify the write, exit 2 on mismatch. Cost: ~50ms per memory write; benefit: closes the silent-memory-loss class entirely for T6.

---

## §6 Codex Stop-hook silent-OK patterns

`stop-review-gate-hook.mjs` (read at `Z:/claude-sota-installed/.claude/plugins/cache/openai-codex/codex/1.0.4/scripts/stop-review-gate-hook.mjs`):

| Loc | Severity | Pattern |
|---|---|---|
| `:9` import `getCodexAvailability` + `:60-67` `buildSetupNote` | HIGH | If codex is NOT set up, hook returns `Codex is not set up for the review gate. Run /codex:setup.` as a **logNote** (stderr) and **returns without blocking**. This means: **codex-unavailable silently passes the Stop gate**. The review-gate IS the cross-model consensus mechanism per CLAUDE.md L11 (`codex CLI subprocess (codex exec foreground+tee, Path P) — cross-model consensus`). Silent skip of the gate when codex unavailable defeats the entire CR-3 enforcement. |
| `:150-152` `if (!earlyConfig.stopReviewGate) { return; }` | LOW | Explicit opt-out; correct |
| `:112-118` `if (result.error?.code === 'ETIMEDOUT') return { ok: false, reason: '...timed out after 15 minutes...' }` | LOW | Correct fail-loud on timeout with actionable next step "Run /codex:review --wait manually or bypass the gate" |
| `:130-140` `catch { return { ok: false, reason: '...invalid JSON...' } }` | LOW | Correct fail-loud on parse error |
| `:189-195` top-level `catch (error) { stderr-write; exitCode = 1 }` | LOW | Correct fail-loud |

**Critical finding**: §6 row 1 (`:60-67`) — when codex is unavailable, the gate **silently disables itself**. Per the project standard "Fallback behavior must be explicit and justified", this fallback is justified (you can't run codex if codex isn't installed) but it's NOT explicit — the operator gets a stderr line but the Stop hook does NOT block. The dual-review SKILL.md explicitly mandates "fail-closed BLOCK contract" for codex-unavailable; the current Stop-hook implements fail-OPEN.

**Recommendation**: when `stopReviewGate=true` AND codex is unavailable, the hook MUST emit `decision: "block"` with reason "codex review gate enabled but codex unavailable — run /codex:setup or set stopReviewGate=false". This matches the dual-review SKILL.md fail-closed contract. The current fail-open behavior is the same anti-pattern as the W319-A H3 typo-trap that was closed in W326 P0-A2.

Sister hook `session-lifecycle-hook.mjs:`:64-68 `} catch { /* Ignore teardown failures during session shutdown. */ }` is a comment-justified empty catch — acceptable per project standard exception ("documented bug-patch shim" framing).

---

## §7 Recommended fix patterns

For every silent-fallback class found, the project standard suggests one of three explicit patterns:

### 7.1 Explicit-surface

Replace silent `catch {}` with `catch (e) { logForDebugging(...); /* continue */ }`. Use when the error is **expected and tolerable** (e.g. one file in a batch unreadable) but the operator must be able to count occurrences post-hoc.

```js
// BEFORE
try { await stat(fp); } catch { continue; }

// AFTER
try { await stat(fp); } catch (e) {
  unreadableCount++;
  if (process.env.W327_DEBUG) process.stderr.write(`stat-fail ${fp}: ${e.code}\n`);
  continue;
}
// emit unreadableCount in summary output
```

### 7.2 Explicit-retry

For transient failures (EBUSY, network blip, rate limit) — retry with exponential backoff before falling through.

```js
async function readFileWithRetry(fp, max=3) {
  for (let i=0; i<max; i++) {
    try { return await readFile(fp, 'utf8'); }
    catch (e) {
      if (e.code !== 'EBUSY' || i === max-1) throw e;
      await new Promise(r => setTimeout(r, 100 * (i+1)));
    }
  }
}
```

### 7.3 Explicit-fail-loud

For errors that mean "the feature is broken; do NOT pretend it works" — exit with non-zero and log to stderr.

```js
// BEFORE
main().catch(() => process.exit(0));

// AFTER
main().catch((e) => {
  process.stderr.write(`W327 hook fail-loud: ${e.message}\n${e.stack}\n`);
  process.exit(2);
});
```

**Decision matrix**:
- Hook is **advisory only** (parallel-guard, subagent-validator): 7.1 surface + count
- Hook is **gating** (codex-stop-review-gate, gitleaks): 7.3 fail-loud
- Memory writes (T6 basic-memory): 7.2 retry + 7.3 final-fail-loud
- MCP env-interp failures: SessionStart hook that 7.3-fails when required env vars are missing

---

## §8 P0/P1/P2 priority list

### P0 (silent disable of mandated enforcement gate — fix immediately)

1. **`stop-review-gate-hook.mjs:60-67`** — codex-unavailable silently disables the cross-model review gate. **Fix**: emit `decision: "block"` instead of `logNote + return`. Per dual-review SKILL.md fail-closed contract.
2. **`tools/preagent-parallel-guard.mjs:181`** — empty top-level catch + exit 0 on any error. **Fix**: stderr-log + non-zero exit (or at minimum, structured advisory emission).
3. **`tools/preagent-subagent-validator.mjs:101-104` + `:111-114`** — silent soft-fail when allowlist missing OR validator errors. **Fix**: at minimum, surface to `/doctor` via a SessionStart probe; consider hard-block on missing allowlist when CC's mandate-enforcement mode is enabled.
4. **`tools/eee.ps1:583`, `:611`** + **`tools/eee-status.ps1:105`** — three empty `catch { }` blocks. **Fix**: per project standard "Empty catch blocks are absolutely forbidden" — replace with explicit handlers.
5. **MCP env-interp silent-disable** (`.mcp.json:55-58, :79, :92, :100`) — `${LANGFUSE_*}`, `${PERPLEXITY_API_KEY}`, `${TAVILY_API_KEY}`, `${EXA_API_KEY}` silently expand to empty string when unset. **Fix**: SessionStart hook that probes required env vars + fail-loud OR explicitly disables the server in `disabledMcpjsonServers` with operator-visible diagnostic.

P0 count: **5**.

### P1 (silent fallback that masks a real production failure mode currently happening)

6. **T5 langfuse 0-span ingestion** (per operator wave-status) — `.mcp.json:50-60` + OTEL config at `settings.json:23-28` silently drop spans. **Fix**: a smoke-test in the SessionStart hook that issues one OTEL span and verifies arrival before declaring T5 live.
7. **T3 cognee silent-INERT on service stop** (`.mcp.json:46-49`) — per CLAUDE.md W317-S1, T3 was DOWN-per-S6 then RUNNING-per-S5; service flapping is silent. **Fix**: SessionStart probe of `127.0.0.1:8000/mcp` `initialize` handshake; fail-loud if unreachable.
8. **T6 basic-memory write-without-verify** — canonical primary memory has no write-confirmation. **Fix**: PostToolUse hook on `mcp__basic-memory__write_note` that issues follow-up `read_note` verification.
9. **`tools/parallel-ratio-telemetry.mjs:87`** — silent zero-fallback on unreadable session file produces false-low ratio. **Fix**: mark unreadable + exclude from denom.
10. **`tools/codex_verdict_normalizer.py:131-152`** — silent failure on summary-load corruption causes duplicate-write loop. **Fix**: stderr-warn + refuse to write.
11. **`settings.json:181` PreCompact powershell `exit 0` regardless of write failure** — compact-event audit trail silently stops. **Fix**: `exit 1` on catch.
12. **`settings.json:191` WorktreeRemove `|| echo ... >&2`** — prune failures pile up silently. **Fix**: `|| { echo ... >&2; exit 2; }`.
13. **`settings.json:128` trivy hook jq-empty silent fallthrough** — silent no-scan when extractor fails. **Fix**: `jq -e` + explicit fail-loud.

P1 count: **8**.

### P2 (medium-severity: poor context, expected-but-untested error path)

14. `.claude/hooks/context-mode-cache-heal.mjs:21,25` — aggregate per-entry failures into single summary line
15. `tools/preagent-parallel-guard.mjs:62,77,82,113,141` — log skipped/unreadable counts in advisory
16. `tools/codex_verdict_normalizer.py:149` — track + warn malformed-line count
17. `tools/eee-backup.ps1:219,249,301` — add null-check after `-ErrorAction SilentlyContinue`
18. `tools/bootstrap-runtime.ps1:287` — check pip-existence before silent show
19. `tools/eee-status.ps1:161` — check `$LASTEXITCODE` after silent ccusage call
20. `settings.json:212` — widen PostToolUseFailure regex OR log filtered events
21. Skill auto-fire telemetry — SessionStart hook listing N-available / M-enabled / recent-invocation top-5

P2 count: **8**.

### Aggregate

- **P0**: 5 (mandate-enforcement gates silently disabled)
- **P1**: 8 (currently-active production failures silently masked)
- **P2**: 8 (debuggability + telemetry improvements)
- **Total findings**: 21

---

## Appendix A: Cite trail

| Section | Cite |
|---|---|
| §1.2 settings.json hooks | `Z:/claude-sota-installed/.claude/settings.json:108-228` |
| §1.3 parallel-guard | `Z:/claude-sota-installed/tools/preagent-parallel-guard.mjs:1-182` |
| §1.4 subagent-validator | `Z:/claude-sota-installed/tools/preagent-subagent-validator.mjs:1-116` |
| §2.1 parallel-ratio | `Z:/claude-sota-installed/tools/parallel-ratio-telemetry.mjs:1-171` |
| §2.2 codex-normalizer | `Z:/claude-sota-installed/tools/codex_verdict_normalizer.py:1-255` |
| §2.5 eee-tools | `Z:/claude-sota-installed/tools/eee.ps1:583,611` + `tools/eee-status.ps1:105` |
| §3 MCP servers | `Z:/claude-sota-installed/.mcp.json:16-103` |
| §6 codex stop-review | `Z:/claude-sota-installed/.claude/plugins/cache/openai-codex/codex/1.0.4/scripts/stop-review-gate-hook.mjs:1-196` |
| §6 codex session-lifecycle | `Z:/claude-sota-installed/.claude/plugins/cache/openai-codex/codex/1.0.4/scripts/session-lifecycle-hook.mjs:64` |

## Appendix B: Anthropic doc anchors

- Hooks event schema + hookSpecificOutput: `https://docs.anthropic.com/en/docs/claude-code/hooks`
- Settings + permissions + `disabledMcpjsonServers`: `https://docs.anthropic.com/en/docs/claude-code/settings`
- Skills auto-fire: `https://code.claude.com/docs/en/skills`
- Sub-agents + subagent_type: `https://docs.anthropic.com/en/docs/claude-code/sub-agents`
- MCP transport + env-interp: `https://code.claude.com/docs/en/mcp`

---

END OF W327-S7 DELIVERABLE.
