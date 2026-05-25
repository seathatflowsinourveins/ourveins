# W314 Silent-Fallback V4 Audit - FINDINGS

Date: 2026-05-19
Auditor: W314-silent-fallback-v4 agent (Sonnet 4.6)
Scope: settings.json hooks, context-mode-cache-heal.mjs, .mcp.json 10 active servers, codex Stop-gate, eval_harness.py, .claude/skills/**, Windows services

---

## F-1 [HIGH] gitleaks PreToolUse exits 0 unconditionally - swallows real secrets detections

Location: Z:/claude-sota-installed/.claude/settings.json line 106
Severity: HIGH
Issue: Command is: gitleaks protect --staged --no-banner --redact --exit-code 0 || true
  The --exit-code 0 flag instructs gitleaks to exit 0 even when secrets ARE detected.
  The trailing || true provides a second layer of exit-code suppression.
  Result: gitleaks finds a real secret, exits 0, hook passes, Claude commits it.
Impact: W290-F2 found commit 52881fde41 with a real key; this hook would not have blocked it.
  Credential committed to git history.
Fix recommendation:
  Remove --exit-code 0.
  Warn-not-block: gitleaks protect --staged --no-banner --redact || true
  Hard-block:     gitleaks protect --staged --no-banner --redact

---

## F-2 [HIGH] PreCompact -ErrorAction SilentlyContinue silently loses log-write failures

Location: Z:/claude-sota-installed/.claude/settings.json line 133
Severity: HIGH
Issue: Add-Content ... -ErrorAction SilentlyContinue; exit 0
  SilentlyContinue suppresses all filesystem errors (disk full, path missing, permission denied).
  Unconditional exit 0 hides both Add-Content failure and any prior error.
  precompact.log is the only record that auto-compact fired.
Impact: Auto-compact events go unlogged. Operators diagnosing context-loss have no log trail.
Fix recommendation:
  OLD: Add-Content ... -ErrorAction SilentlyContinue; exit 0
  NEW: try { Add-Content ... -ErrorAction Stop } catch { Write-Error ('precompact-log-fail: '+$_.Exception.Message) }; exit 0

---

## F-3 [HIGH] PostToolUse ruff/shellcheck exits 0 unconditionally - errors never block

Location: Z:/claude-sota-installed/.claude/settings.json line 122
Severity: HIGH
Issue: Bash hook ends with exit 0 regardless of ruff/shellcheck exit codes.
  W312-A.3 fixed the >/dev/null suppression so errors print to stderr, but exit 0 means
  PostToolUse is advisory only. The hook PRINTS errors but does not BLOCK.
Impact: Python/shell files with lint errors written silently.
  TaskCompleted hook (line 175) is first real gate but only covers tools/ and harness/.
  Files outside those directories never get a hard gate.
Fix recommendation:
  Change trailing exit 0 to exit $rc after setting rc=$? from both ruff and shellcheck.
  rc=0; case in py) ruff ...; rc=$?;; sh|bash) shellcheck ...; rc=$?;; esac; exit $rc

---
## F-4 [HIGH] OllamaServe Stopped/Automatic - W312-A.6 operator-AI never resolved

Location: Windows service OllamaServe
Severity: HIGH
Issue: OllamaServe Status=Stopped, StartType=Automatic.
  Deliberately retired services have StartType=Disabled (FalkorDB/Langfuse absent entirely).
  Stopped+Automatic is ambiguous: crashed and failed to restart, or manually stopped
  without updating StartType. W312-A.6 was deferred, never confirmed intentional.
  graphiti MCP retired. No active MCP server uses :16700.
Impact: On next boot, Automatic-start triggers restart. If Ollama fails (GPU contention
  with IkLlamaServer), silently stays stopped with no health alert.
Fix recommendation:
  If retiring: Set-Service OllamaServe -StartupType Disabled + annotate CLAUDE.md
  If keeping: Start-Service OllamaServe + close W312-A.6 as RESOLVED-INTENTIONAL

---

## F-5 [HIGH] GitHub MCP search_repositories silent zero-result (W313 re-verified OPEN)

[NARRATIVE-RESCINDED per W329-S2-REAUDIT 2026-05-19: original silent-fallback claim withdrawn; W328-S2 user-error verdict also retracted; root cause UNDETERMINED pending W330 investigation of rate-limit / token-scope / MCP-transform / cache paths. Source-deep-dive evidence: github/docs `searching-for-repositories.md` lists `repo:owner/name` as a valid /search/repositories qualifier; live api.github.com probes return HTTP 200 + valid items for `repo:facebook/react`, `owner:facebook`, `user:facebook`, `org:facebook`; github.com runtime API + perplexity.ai aggregated 5-source review (Org 1: github/docs+REST+MCP+Enterprise; Org 2: api.github.com runtime; Org 3: perplexity/LFE) confirm qualifier validity. Workaround patterns (Stage-0 get_repository probe) REMAIN SOTA for rate-limit-budget reasons.]

Location: .mcp.json plugin-supplied HTTP MCP at https://api.githubcopilot.com/mcp/readonly
Severity: HIGH
Issue: mcp__plugin_everything-claude-code_github__search_repositories returns total_count: 0
  on well-formed queries (e.g., stars:>500 language:python topic:llm-eval pushed:>2026-01-01).
  No error, no warning. Root cause: Copilot MCP readonly endpoint does not support
  topic:/pushed: query syntax. Returns HTTP 200 + total_count: 0 rather than an error.
Impact: SOTA discovery silently produces empty candidate lists. W313 measured 5/5
  well-formed queries returning zero. Entire GitHub discovery stream is dark.
  This is the canonical silent-fallback example cited in the W314 audit brief.
Fix recommendation (no MCP code change possible - plugin-supplied):
  Add to goal-prompt-synthesis SKILL.md: after calling search_repositories, check total_count.
  If total_count==0, do NOT treat as genuine no-results. Fall back to REST API:
  Bash(gh api /search/repositories -X GET -F q='<query>' --jq '.items[]|{name,...}')
  and surface: WARNING: GitHub MCP returned 0; using REST API fallback.

---

## F-6 [MEDIUM] context-mode-cache-heal.mjs top-level catch exits 0 on fatal errors

Location: Z:/claude-sota-installed/.claude/hooks/context-mode-cache-heal.mjs line 28
Severity: MEDIUM
Issue: catch(e) { process.stderr.write('[cache-heal] top-level: '+e.message); process.exit(0) }
  Any unhandled exception is caught, written to stderr, and exits 0.
  CC hook runners treat exit-0 as success. stderr not surfaced on hook success.
Impact: If installed_plugins.json is corrupted - the exact scenario this hook heals -
  the catch silently exits 0 and context-mode continues to fail without a visible gate.
Fix recommendation:
  OLD: } catch(e) { process.stderr.write('[cache-heal] top-level: '+e.message+'
'); process.exit(0) }
  NEW: } catch(e) { process.stderr.write('[cache-heal] FATAL: '+e.message+'
'); process.exit(1) }

---

## F-7 [MEDIUM] eval_harness.py _resolve_promptfoo_cmd bare pass on SubprocessError

Location: Z:/claude-sota-installed/harness/eval_harness.py lines 115-116
Severity: MEDIUM
Issue: except (subprocess.SubprocessError, OSError): pass
  When npm root -g fails, exception is silently swallowed and None returned.
  Caller reports promptfoo CLI not found; actual npm error is lost.
Impact: Misleading FAIL reason. Operator installs promptfoo when npm itself is broken.
Fix recommendation:
  OLD: except (subprocess.SubprocessError, OSError): pass
  NEW: except (subprocess.SubprocessError, OSError) as _npm_err:
           import sys; sys.stderr.write(f'[eval_harness] npm root -g failed: {_npm_err}
')

---

## F-8 [MEDIUM] eval_harness.py run_inspect_lane broad except Exception loses traceback

Location: Z:/claude-sota-installed/harness/eval_harness.py lines 239-248
Severity: MEDIUM
Issue: except Exception as exc:  # noqa: BLE001
  FAIL row returned with exc message but full stack trace lost.
  Sub-dependency version conflicts produce cryptic messages without the traceback.
Impact: Difficult to diagnose why inspect_ai is unavailable after a dependency update.
Fix recommendation: Add before the return statement:
  import traceback as _tb, sys as _sys; _sys.stderr.write(f'[eval_harness] import failed:
{_tb.format_exc()}
')
  Keep the FAIL-row return so the cadence continues.

---
## F-9 [MEDIUM] WorktreeRemove hook git worktree prune swallowed by || true

Location: Z:/claude-sota-installed/.claude/settings.json line 143
Severity: MEDIUM
Issue: git worktree prune || true
  Any error from git worktree prune is silently swallowed. Hook exits 0.
Impact: Stale worktrees accumulate silently. 3-worktree cap gets hit unexpectedly.
Fix recommendation:
  OLD: git worktree prune || true
  NEW: git worktree prune 2>&1 || echo "git worktree prune failed - stale worktrees may remain" >&2

---

## F-10 [MEDIUM] PostToolUseFailure else-branch silent pass on unexpected Bash failures

Location: Z:/claude-sota-installed/.claude/settings.json lines 158-168
Severity: MEDIUM
Issue: Hook only surfaces feedback for errors matching permission denied|EACCES|gitleaks.
  All other Bash failures hit else { exit 0 } - no additionalContext returned.
Impact: Model gets no context about unexpected Bash failures (network error, missing binary,
  disk full), leading to retry loops without diagnosis.
Fix recommendation: Replace else { exit 0 } with a generic additionalContext path:
  else {
    $truncated = $ev.error.Substring(0, [Math]::Min($ev.error.Length, 200))
    $out = @{ hookSpecificOutput = @{ hookEventName = "PostToolUseFailure"; additionalContext = "hook-feedback: bash-failure: $truncated" } } | ConvertTo-Json -Compress
    Write-Output $out
  }

---

## F-11 [MEDIUM] mem-recall SKILL.md: T6 service-down indistinguishable from genuine zero-results

Location: Z:/claude-sota-installed/.claude/skills/mem-recall/SKILL.md line 44
Severity: MEDIUM
Issue: If T6 returns 0 matches AND query is semantic in nature, fall back to T2-split.
  The condition is 0 matches. A service failure returning empty is indistinguishable
  from genuine no-result query. Both trigger the fallback silently.
Impact: When basic-memory is DOWN, skill silently degrades to T2-split without operator
  knowing T6 failed. Memory recall completeness drops without signal.
Fix recommendation:
  Add to SKILL.md: If search_notes returns a tool error (is_error: true or exception),
  do NOT treat as 0 matches. Log '[mem-recall] T6 ERROR: <error>' and surface it
  BEFORE falling back. Zero-result fallback applies only when call succeeds and
  results array is empty.

---

## F-12 [LOW] HindsightEmbed/FalkorDB/Langfuse NOT_FOUND - health-check runbook unreliable

Location: Windows services health-check
Severity: LOW
Issue: Get-Service returns NOT_FOUND for HindsightEmbed, FalkorDB, Langfuse.
  They run under different NSSM-registered names or as user-process daemons.
  A service that is DOWN shows NOT_FOUND identically to one never registered.
  The monitoring layer itself has a silent-fallback.
Impact: Operator health-check command in CLAUDE.md/runbooks is silently unreliable.
Fix recommendation:
  Discover actual names:
  Get-Service | Where-Object { $_.DisplayName -match 'hindsight|langfuse|falkor|ollama|cognee|llama' }
  | Select Name,DisplayName,Status
  Update runbook with canonical Name values.

---

## F-13 [LOW] ccusage MCP absolute Z:-baked path not fixed by W286-cross

Location: Z:/claude-sota-installed/.mcp.json lines 41-45
Severity: LOW
Issue: command: node, args: [Z:/claude-sota-installed/.local/npm/node_modules/@ccusage/mcp/dist/index.js]
  W286-cross fixed playwright/chrome-devtools/repomix/phoenix to npx -y pinned forms.
  ccusage was omitted from that fix.
Impact: ccusage MCP silently fails to start on npm cache rebuild or drive relocation.
Fix recommendation:
  command: npx, args: [-y, @ccusage/mcp@pinned-version]
  Operator must verify: npm view @ccusage/mcp version

---

## Codex Stop-gate: VERIFIED FUNCTIONAL (no finding)

File: Z:/claude-sota-installed/.claude/plugins/cache/openai-codex/codex/1.0.4/hooks/hooks.json
The Stop hook reads earlyConfig.stopReviewGate before blocking on stdin (fast-exit when disabled).
runStopReview() uses spawnSync with 15-min timeout. All error paths (ETIMEDOUT, non-zero exit,
invalid JSON) return { ok: false, reason: <descriptive> } which emits { decision: block }
- a hard block, not a silent pass. Top-level try/catch sets process.exitCode=1 on uncaught errors.
W312-A.1 RESOLVED classification is correct.

---

## Summary Table

| ID   | Severity | Area                               | Title |
|------|----------|------------------------------------|-------|
| F-1  | HIGH     | settings.json:106                  | gitleaks --exit-code 0 swallows secret detections |
| F-2  | HIGH     | settings.json:133                  | PreCompact SilentlyContinue loses log failures |
| F-3  | HIGH     | settings.json:122                  | PostToolUse ruff/shellcheck exits 0 unconditionally |
| F-4  | HIGH     | Windows OllamaServe                | Stopped/Automatic - W312-A.6 never resolved |
| F-5  | HIGH     | .mcp.json GitHub MCP               | search_repositories silent zero-result W313 OPEN |
| F-6  | MEDIUM   | hooks/context-mode-cache-heal.mjs  | Top-level catch exits 0 on fatal errors |
| F-7  | MEDIUM   | harness/eval_harness.py:115        | _resolve_promptfoo_cmd bare pass on SubprocessError |
| F-8  | MEDIUM   | harness/eval_harness.py:239        | Broad except Exception loses traceback |
| F-9  | MEDIUM   | settings.json:143                  | WorktreeRemove prune swallowed by true |
| F-10 | MEDIUM   | settings.json:164                  | PostToolUseFailure else-branch silent pass |
| F-11 | MEDIUM   | skills/mem-recall/SKILL.md:44      | T6 service-down vs genuine zero-results indistinguishable |
| F-12 | LOW      | Windows services health-check      | HindsightEmbed/FalkorDB/Langfuse NOT_FOUND |
| F-13 | LOW      | .mcp.json:44                       | ccusage absolute Z:-path not in W286-cross fix |

Total: 5 HIGH, 6 MEDIUM, 2 LOW = 13 findings. 0 CRITICAL.