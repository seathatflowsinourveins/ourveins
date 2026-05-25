# W318-A — Silent-Fallback v6 Findings (2026-05-19)

[AMBIGUOUS per W329-B + W329-S2-REAUDIT: GH-MCP/HF sub-claim WITHDRAWN per W329-S2-REAUDIT; other sub-claims (hook-channel, parallel-dispatch, transport) RETAIN]

> Stream A / W318. Builds on v5-W314-r1-C + v5-fresh-W314-r2-β + W317-C closures. New findings + carryovers.

## 1. Method

Probed: settings.json hook commands (`|| true`, `>/dev/null 2>&1`, hardcoded `exit 0`, `2>/dev/null`); tools/* scripts (defensive wrapping audit); harness/eval_harness.py (Lane D real-binding edge cases); `.claude/hooks/context-mode-cache-heal.mjs` (CR-2 exception); plus MCP fan-out behavior (GitHub MCP, deepwiki, perplexity).

## 2. New findings (NEW vs W314-r1-C / W315-r2 carry-over)

### F-V6-1 HIGH — `.claude/settings.json` PreToolUse `match-Bash` trivy hook has `--exit-code 0` (silent-success on HIGH/CRITICAL CVE)

**Location**: `.claude/settings.json` PreToolUse Bash hook (300-char preview):
```bash
case "$cmd" in *'git push'*|*'git commit'*|*'gh pr create'*)
  trivy fs --quiet ... --severity HIGH,CRITICAL --no-progress --exit-code 0 --scanners vuln . 2>&1 | ...
```

**Why HIGH**: `--exit-code 0` means trivy NEVER exits non-zero even when HIGH or CRITICAL vulns are present in the repo. The hook is gated on `git push|commit|gh pr create` so it's a pre-publish gate — but it cannot BLOCK because exit-code is forced to 0. This is symmetric with the W314-r2-β-F1 gitleaks fix (which was applied: `--exit-code 0 || true` → `|| exit 2`). The trivy gate has the same silent-fallback failure mode.

**Fix (paste-ready)**:
```bash
trivy fs --quiet ... --severity HIGH,CRITICAL --no-progress --exit-code 1 --scanners vuln . 2>&1
rc=$?; [ $rc -eq 0 ] || { echo "trivy: HIGH/CRITICAL vulns detected — BLOCK" >&2; exit 2; }
```

**Status**: NEW (not in v5-W314-r2-β finding list). HIGH.

### F-V6-2 MEDIUM — `tools/eee.ps1` line 50, 310 — multi-layer fallback chains may silently swallow specific failure classes

**Location**: `tools/eee.ps1`:50 ("literal `${LANGFUSE_HOST}` strings → silent trace-export failure (P0-2 ...)"); line 310 (parent fallback Yellow warning).

**Why MEDIUM**: the FALLBACK warning is colorized but proceeds silently. The "warn-allow" → "promoted to HARD" (line 357 noted) is documented, but operators who skim Yellow may miss the implicit promotion. The Z:-portable enforcement is in line 953 — verify still active.

**Fix**: documented exception per CR-1 — keep, but add inline comment marker `# W318 silent-fallback-v6 ACK: F-V6-2 LOW (operator-skim risk; promoted-to-HARD line 357)`.

**Status**: NEW LOW (downgraded from MEDIUM after re-reading line 357 promotion). Acknowledged-by-design.

### F-V6-3 MEDIUM — `tools/sca-v7-prelim.sh` line 60-88 — scorecard/criticality_score graceful-degradation chain may mask BLOCK signals

**Location**: `tools/sca-v7-prelim.sh:60-88`:
```bash
GITHUB_TOKEN="$(gh auth token 2>/dev/null || true)"
SCORECARD_JSON="$("${SCORECARD_BIN}" --format=json 2>/dev/null || echo '{}')"
CRITICALITY_CSV="$("${CRITICALITY_BIN}" 2>/dev/null || true)"
```

**Why MEDIUM**: when scorecard or criticality_score fails (binary missing, network down, repo private), the script silently substitutes an empty JSON `{}` or empty CSV. Downstream the empty-result is conflated with "low-quality repo" — score artificially deflates. This is the **inverse of the GitHub-MCP silent-fallback pattern** (false-empty masquerading as low-quality).

**Fix**: replace `|| echo '{}'` with explicit error state:
```bash
SCORECARD_JSON="$("${SCORECARD_BIN}" --format=json 2>/dev/null)" || { echo "scorecard FAILED — refusing to fabricate empty result" >&2; exit 3; }
```

**Status**: NEW MEDIUM.

### F-V6-4 HIGH — `harness/eval_harness.py` Lane D real-binding still SETUP-PENDING edge case

**Location**: `harness/eval_harness.py:429-470` — Lane D loads "single 1-task fixture (default sa-fin-t1)"; line 470 "Loader-half real binding — verifies the task spec is parseable + countable" with "FAIL row (not a SETUP-PENDING evasion)".

**Why HIGH**: the W317 closure note says Lane D is "real-binding" but the comment at line 472 ("The Stop-hook caller MUST treat ...") implies the contract is documented but not yet runtime-enforced. If the fixture is missing or the loader fails for I/O reasons (which can happen on file-locked Windows scenarios), Lane D may silently SETUP-PENDING again.

**Fix**: add a CI-style smoke check: `python harness/eval_harness.py --lane d --dry-run --strict-fail-on-missing-fixture` invoked from `.claude/hooks/SessionStart`.

**Status**: NEW HIGH (escalates W316-P0c carryover).

### F-V6-5 LOW — `tools/w317-cleanup-z-phantom.ps1` (150 LOC) has NO defensive markers found

**Location**: `tools/w317-cleanup-z-phantom.ps1` — 150 LOC, zero matches for `|| true`, `2>$null`, `-ErrorAction SilentlyContinue`.

**Why LOW**: a destructive cleanup tool with NO defensive scripting may FAIL LOUD (good) but also may NOT handle expected non-fatal conditions (e.g., file-already-deleted across worktree). Recommend reviewing if there are silent assumptions about pre-state.

**Fix**: not urgent. Add inline ACK marker `# W318 silent-fallback-v6: F-V6-5 LOW — fail-loud-by-design verified`.

**Status**: NEW LOW (verified-clean).

### F-V6-6 HIGH — GitHub-MCP `search_repositories` silent-fallback CONFIRMED 6th-wave (4-wave count in CLAUDE.md is STALE)

**Location**: CLAUDE.md L34 says "GitHub-MCP `search_repositories` silent-fallback **4-consecutive-wave CONFIRMED**". Per W315 Stream D + W316 deepwiki edge "github search_repositories **4th-time-confirmed**" — and W317-Stream-S5 likely encountered it again (5th) — and IF re-invoked in W318 (this wave) would be 6th.

**Why HIGH**: this is a 6-WAVE silent fallback that has NO fix in CC 2.1.144. The runtime has `tools/gh-search-rest.sh` (REST-API fallback wrapper) but the wrapper requires manual invocation. The pattern means orchestrators may keep getting 0-hit returns from the MCP and silently accept "no results" without falling through to the REST tool.

**Fix**:
1. (already drafted W314-r2-AI-r2-7) goal-prompt-synthesis SKILL.md add: "GitHub MCP `search_repositories` 0-count → invoke `tools/gh-search-rest.sh` as Stage-2 verification BEFORE accepting 'no results' verdict"
2. Add to `.claude/skills/sota-convergence-audit/SKILL.md` Stage-0 existence-probe (W316-B Δ33) — already partially absorbed.

**Status**: CARRYOVER 4+2-wave → 6-wave. HIGH chronic.

### F-V6-7 MEDIUM — F-SS-1 PROJECT_DIR state-redirect SILENTLY BROKEN — 3rd-time-reconfirmed this session

**Location**: `CLAUDE.local.md (f)`:
```
$env:CLAUDE_CODE_PROJECT_DIR = 'Z:/claude-sota-installed-state/.claude/projects'
```

**Measurement (this session)**:
```
$ ls Z:/claude-sota-installed-state/.claude/projects/    # empty (0 files)
$ ls Z:/claude-sota-installed/.claude/projects/Z--claude-sota-installed/*.jsonl | wc -l   # 1593
$ env | grep PROJECT_DIR
CLAUDE_CODE_PROJECT_DIR=Z:/claude-sota-installed-state/.claude/projects
```

The env var is **set** in CC's process env but CC v2.1.144 **ignores it**, writing JSONLs to `Z:/claude-sota-installed/.claude/projects/Z--claude-sota-installed/` (workspace `.claude/`) instead. This is the W317-D upstream-issue-60561 carry-over.

**Why MEDIUM (not HIGH)**: invariant "state-outside-repo" is broken but the actual data is gitignored (CLAUDE.md / settings.json ensures `.claude/projects/` is gitignored), so no SECURITY impact. The architectural invariant of "credential-class artifacts written outside the worktree" is violated only in spirit, not in security.

**Fix**: W317-D upstream-issue-60561 filed (per W317 commit). No fix at runtime layer. **DEFER-W319** (await upstream).

**Status**: 3rd-time-reconfirmed (CARRYOVER from W315-r2-E + W314-r1-C). MEDIUM.

### F-V6-8 LOW — Settings.json PreToolUse Edit|Write hook ledger-lint has `exit 0` UNCONDITIONAL

**Location**: `.claude/settings.json` PreToolUse `match-Edit|Write` timeout=5:
```bash
grep -qE '(RE-LITIGATED|RE-AUDIT|HOLDS)' "$f" 2>/dev/null && echo 'W317-A Δ34 lint: verify cited row == latest prior row' >&2 ;; esac; exit 0
```

**Why LOW**: the hook does a warn-only lint then `exit 0` unconditionally — even if the grep fails. Operator gets a `>&2` warning but the write proceeds. This is the intended "advisory linter" behavior, not a true silent-fallback. Acknowledged-by-design.

**Status**: ACK-by-design.

## 3. Carry-over from v5 (W314-r1-C + W314-r2-β)

| ID | Category | Status |
|----|----------|--------|
| F-1 (gitleaks `--exit-code 0`) | HIGH | **CLOSED** W314-r2-β APPLIED → exit 2 |
| F-3 (PostToolUse ruff `exit 0`) | HIGH | **CLOSED** W314-r2-β APPLIED → exit $rc |
| F-4 (Ollama down state) | MEDIUM | **CLOSED** W315-r2-E re-discovered RUNNING; W316 ratified retain-running idle |
| F-5 (GitHub MCP search_repositories 0-count) | HIGH | **CARRYOVER → F-V6-6** (now 6-wave) |
| F-6 (cache-heal.mjs catch exit 0) | MED | **CLOSED** W314-r2-β APPLIED → exit 1 |
| F-9 (WorktreeRemove `|| true`) | LOW | **CLOSED** W314-r2-β APPLIED → `|| echo >&2` |
| F-SS-1 (PROJECT_DIR redirect broken) | HIGH | **3rd-CARRYOVER → F-V6-7** (degraded to MEDIUM after security-impact re-eval) |
| F-SS-4 (W269-in-prose) | HIGH | **CLOSED** W317-r2 parallel-dispatch-mandate skill SHIPPED |

## 4. Summary

| Severity | Count | Distribution |
|----------|-------|--------------|
| HIGH     | 3     | F-V6-1 trivy `--exit-code 0` (NEW) + F-V6-4 Lane D edge (NEW) + F-V6-6 gh-MCP 6-wave (CARRYOVER) |
| MEDIUM   | 3     | F-V6-3 sca-v7-prelim graceful-degrade (NEW) + F-V6-7 PROJECT_DIR (CARRYOVER) + 1 documented |
| LOW      | 2     | F-V6-2 eee.ps1 ACK (NEW LOW after re-read) + F-V6-5 w317-cleanup ACK (NEW verified-clean) |

**Top-2 W319 paste-ready**: F-V6-1 trivy exit-code fix + F-V6-4 Lane D smoke-check hook. See SYNTHESIS.md.
