# W330 MEGA-AUDIT Stream A — Cross-Session Race & SOTA Git/Hook Practice Audit

> Wave W330 · 2026-05-19 · Stream A · status: complete · author: agent (Claude Code subagent)

## §1 Current state (evidence-anchored)

### 1.1 Worktree inventory (5 declared, 3 live, 2 zombie)

`git worktree list --porcelain` (2026-05-19):

| Path | Branch | On-disk? | Notes |
|---|---|---|---|
| `Z:/claude-sota-installed` | `sota-converge-w310` | LIVE | primary worktree, HEAD `5cf5c90` |
| `Z:/claude-sota-installed/.claude/worktrees/agent-ad71af12fd0e1435c` | `worktree-agent-ad71af12fd0e1435c` | LIVE | claude-agent fork (pid 131060), locked |
| `Z:/claude-sota-installed-W287` | `goal/W287-reconcile` | **MISSING** | `git -C` → "No such file or directory" — ZOMBIE |
| `Z:/claude-sota-installed-W290` | `sota-converge-w290` | **MISSING** | ZOMBIE |
| `Z:/claude-sota-installed-W321` | `W321` | LIVE | HEAD `3731ca7` |

**Finding**: 2 of 5 worktrees are zombies — `git worktree prune` is NOT running on session-end. CLAUDE.md L34 W280d cites "remove worktree on merge (settings.json WorktreeRemove hook does git worktree prune automatically)". The hook is wired (`.claude/settings.json:186-194`) but only fires on the `WorktreeRemove` event (which is internal to `EnterWorktree`/`ExitWorktree` flow per W259-v8 U4 mode 3), NOT when an external session deletes the directory. Operator-deleted worktree dirs leak metadata in `.git/worktrees/`.

### 1.2 Session JSONL inventory — env-var drift (P0)

CLAUDE.local.md L41 sets `CLAUDE_CODE_PROJECT_DIR=Z:/claude-sota-installed-state/.claude/projects` (state-outside-repo). Actual state:

- `Z:/claude-sota-installed-state/.claude/projects/`: **EMPTY** (0 files, 0 bytes, ctime May 6)
- `Z:/claude-sota-installed/.claude/projects/`: **3264 JSONL files** (in-repo path!)

**Finding**: Either (a) the env var is not loaded for the active CC processes (eee.ps1 sets it but interactive launches may not source it), or (b) Anthropic CC ignores `CLAUDE_CODE_PROJECT_DIR` when the `.claude/projects/` dir already exists in the worktree. The state-redirect contract from CLAUDE.local.md L42 ("State-outside-repo redirects — credential-class artifacts written outside the worktree") is BROKEN for session JSONLs.

Mitigation in place: `.gitignore:30` excludes `.claude/projects/` so JSONLs are not version-controlled. But they ARE inside the worktree, meaning:
- Cross-worktree session lookup is impossible (each worktree has its own isolated `.claude/projects/` dir)
- Session resume across `EnterWorktree` boundaries loses history
- Worktree deletion deletes session JSONLs (no recovery)

### 1.3 Hook surface (`.claude/settings.json` L107-217)

| Event | Matcher | Hook | Cross-session role |
|---|---|---|---|
| `SessionStart` | (all) | `context-mode-cache-heal.mjs` | cache repair only — NO session-coordination |
| `PreToolUse` | `Bash` | gitleaks + trivy + adversarial-review gate | security only |
| `PreToolUse` | `Edit\|Write` | VERDICT-LEDGER lint | content lint only |
| `PreToolUse` | `Agent` | `preagent-parallel-guard` + `preagent-subagent-validator` | parallel-dispatch enforcement (W325-A SEV-1: advisory-only `exit 0`) |
| `PostToolUse` | `Edit\|Write\|MultiEdit` | ruff + shellcheck | format/lint only |
| `PreCompact` | `auto` | log to `tmp/precompact.log` | audit-trail only — does NOT flush in-flight state |
| `WorktreeRemove` | (all) | `git worktree prune` | reactive cleanup — fires AFTER removal |
| `Notification` | (all) | PowerShell beep | UX only |
| `PostToolUseFailure` | `Bash` | error-feedback parse | hook-feedback only |

**Finding (P0)**: ZERO hooks gate cross-session coordination:
- No `PreToolUse[Edit|Write]` lock-acquisition (no `.flock`, no `lsof`-equivalent, no advisory mtime check)
- No `SessionStart` worktree-affinity assertion (a session can launch on the same branch as another session)
- No `SessionEnd`/`Stop` hook to flush in-flight plan-files (planning-with-files PreCompact hook handles this BUT is skill-gated — only fires when `task_plan.md` exists)
- No `git fetch --prune` on `SessionStart` to surface remote-side branch advances from sibling sessions

### 1.4 `tools/eee.ps1` session-binding contract

Lines 326-335 only **mkdir** the state dirs — no worktree binding, no branch lock, no `.claude/.session-lock` file. The script falls through to `claude.exe` with no per-session worktree assignment. Two simultaneous `eee` launches both land in `Z:/claude-sota-installed` on `sota-converge-w310` → exactly the race condition the operator reported.

**Finding**: `tools/eee.ps1` violates CLAUDE.md L34 W280d "one git worktree per session" by NOT enforcing it at launch time. The discipline is documented, NOT mechanized.

## §2 SOTA references

### 2.1 planning-with-files (installed @ `.claude/plugins/marketplaces/planning-with-files/skills/planning-with-files/SKILL.md` v2.38.1)

Capabilities directly relevant to cross-session pickup:
- **`task_plan.md` + `findings.md` + `progress.md`** as on-disk working memory (L86-99) — survives compaction AND session-restart
- **`session-catchup.py`** (L46-53) — reads OpenCode SQLite + git diff to reconcile a fresh session against prior progress (v2.38.0+)
- **PreCompact hook** (L250-258) — when `task_plan.md` exists, flushes in-context progress to disk BEFORE compaction
- **`/plan-attest`** (L302-321) — SHA-256 attestation prevents adversarial overwrite of plan files; W330 directly applicable to plan-file race conditions
- **Parallel-task isolation** (L223-244) — `.planning/YYYY-MM-DD-<slug>/` directories with `.planning/.active_plan` pointer — multiple terminals each pin a `PLAN_ID`, hooks resolve to the correct plan automatically

**Direct fit**: this skill is the canonical SOTA pattern for "sessions seamlessly pick up where prior sessions left off". Currently INSTALLED but NOT USED systematically — no `task_plan.md` at repo root.

### 2.2 gitnexus (installed @ `.claude/skills/gitnexus/SKILL.md` umbrella + 7 children)

Capabilities relevant to cross-session race-detection:
- **Knowledge graph** of code symbols + file mutations — could ingest session JSONL + git ref-log to surface "session A touched file X at T1; session B reading file X at T2; potential race"
- **Impact analysis** — "which files does session B intend to modify? cross-check against in-flight edits from session A"

**Direct fit (P2-partial)**: gitnexus is a *passive* read-only graph; it does not block writes. Useful for retrospective race-detection but not for prevention. Pair with file-lock hooks for prevention.

### 2.3 CCBP `claude-memory.md` and `claude-settings.md` (`Z:/repos/deps/claude-code-best-practice-shan/best-practice/`)

CLAUDE.md L1 already cite-anchors `claude-memory.md:34-40 @ HEAD f28c2da` (ancestor/descendant load discipline). Session-handoff discipline lives in `claude-memory.md:113` (per CLAUDE.local.md L3) — CLAUDE.local.md is per-machine, gitignored. **Gap**: CCBP does not yet codify cross-session JSONL coordination beyond "rebase-not-merge".

### 2.4 Anthropic `cli-reference` `--fork-session` + `/branch`

Per CLAUDE.md L34: `--fork-session` creates a NEW session-id from a parent; `/branch` is the conversation-branching primitive. The W280d discipline "NEVER bare-resume the same session-id in 2 terminals" relies on operator discipline — there is no harness-side enforcement that two `--resume <id>` invocations cannot race.

## §3 Gaps (P0 first)

| # | Gap | Severity | Evidence |
|---|---|---|---|
| G1 | `CLAUDE_CODE_PROJECT_DIR` env-var redirect is broken; 3264 JSONLs live in-repo at `.claude/projects/` | P0 | §1.2 |
| G2 | Two zombie worktrees (`W287`, `W290`) registered but missing from disk | P0 | §1.1 |
| G3 | `eee.ps1` does NOT enforce one-worktree-per-session at launch | P0 | §1.4 |
| G4 | No `PreToolUse[Edit\|Write]` file-lock hook; concurrent writes from 2 sessions to same file are not gated | P0 | §1.3 |
| G5 | No `SessionStart` `git fetch --prune` + branch-affinity check | P1 | §1.3 |
| G6 | `planning-with-files` skill installed but NOT in active use — no `task_plan.md` at repo root | P1 | §2.1 + §1 |
| G7 | `WorktreeRemove` hook fires only on internal `ExitWorktree` event; operator-deleted dirs leak metadata | P1 | §1.1 |
| G8 | gitnexus not wired to ingest session JSONL — no cross-session race-detection graph | P2 | §2.2 |
| G9 | `~/.claude/CLAUDE.md` (user-level shared memory) not configured — siblings `claude-sota`, `claude-sota-installed`, `claude` cannot share session-coordination state | P2 | new |

## §4 Proposed remediation (priority-ordered, proposal-only)

### (a) Hook surface design — fix G1-G5

**P0.1 — Fix env-var redirect (G1)**: investigate why `CLAUDE_CODE_PROJECT_DIR` is not being honored. Two hypotheses:
- (i) Anthropic CC reads env at process-spawn but `.claude/projects/` was pre-created by an older `eee.ps1` invocation; CC then writes to whichever exists. Fix: rename `.claude/projects/` → `.claude/projects.legacy/`; relaunch; verify state-side dir fills.
- (ii) CC ignores `CLAUDE_CODE_PROJECT_DIR` in favor of `CLAUDE_CONFIG_DIR/projects`. Fix: file Anthropic issue, set `CLAUDE_CONFIG_DIR=Z:/claude-sota-installed-state/.claude` instead (changes the whole config root).

**P0.2 — Zombie cleanup (G2)**: run `git worktree prune` once; add the prune as a `SessionStart` hook:
```jsonc
"SessionStart": [{
  "hooks": [
    { "type": "command", "command": "\"Z:/tools/nodejs/node.exe\" \"...context-mode-cache-heal.mjs\"" },
    { "type": "command", "command": "git worktree prune 2>&1 | head -5" }
  ]
}]
```

**P0.3 — eee.ps1 worktree-binding (G3)**: add gate before `claude.exe` launch:
```powershell
# Read settings.json:enabledPlugins-style discovery; reject if 2+ eee.ps1 processes target same branch
$activeBranch = git rev-parse --abbrev-ref HEAD
$lockFile = ".claude/state/session-lock-$activeBranch.json"
if (Test-Path $lockFile) {
  $existing = Get-Content $lockFile | ConvertFrom-Json
  if (Get-Process -Id $existing.pid -ErrorAction SilentlyContinue) {
    Write-Error "Branch $activeBranch already owned by pid $($existing.pid); use git worktree add for parallel work"; exit 1
  }
}
@{ pid = $PID; branch = $activeBranch; ts = (Get-Date).ToString('o') } | ConvertTo-Json | Set-Content $lockFile
```
Pair with `Stop`-hook lock-release.

**P0.4 — File-lock PreToolUse hook (G4)**: add `PreToolUse[Edit|Write]` advisory-check (NOT block) that warns when target file's mtime advanced since `Read` tool last touched it:
```bash
# Pseudocode; full impl in tools/cross-session-file-lock.mjs
f=$(jq -r '.tool_input.file_path // empty')
[ -z "$f" ] && exit 0
last_read_ts=$(jq --arg f "$f" '.[$f].last_read // 0' .claude/state/read-cache.json 2>/dev/null)
file_mtime=$(stat -c %Y "$f" 2>/dev/null || stat -f %m "$f" 2>/dev/null)
if [ "$file_mtime" -gt "$last_read_ts" ]; then
  echo "[cross-session-lock] WARNING: $f modified externally since last Read; re-read recommended" >&2
fi
exit 0
```
Cardinal-rule-2 compliant only if classified as bug-patch shim cite-anchored to a specific anthropics/claude-code issue — file an upstream issue first; ship as documented exception.

**P1.1 — SessionStart fetch+prune (G5)**: add `git fetch --prune --quiet` to the SessionStart hook block (above).

### (b) Gitnexus cross-session graph (G8, P2)

Index `.claude/projects/<encoded-path>/*.jsonl` files into gitnexus weekly. Cypher query for race detection:
```cypher
MATCH (s1:Session)-[w1:WROTE]->(f:File)<-[w2:WROTE]-(s2:Session)
WHERE s1 <> s2 AND abs(w1.ts - w2.ts) < 300
RETURN f.path, s1.id, w1.ts, s2.id, w2.ts ORDER BY w1.ts DESC LIMIT 20
```
Proposal-only — requires GitNexus MCP server + ingestion script.

### (c) Planning-with-files durable artifacts (G6, P1)

Adopt the W330+ pattern: every wave creates `docs/architecture/W<N>/task_plan.md` + `findings.md` + `progress.md`. The `PreCompact` hook in `planning-with-files` (SKILL.md L29) already flushes — just need to actually use the skill. Add a soft policy in CLAUDE.md L37 (cardinal-rule-4 append):
> Multi-wave work MUST create a `task_plan.md` at `docs/architecture/W<N>/` per the `planning-with-files` skill; cross-session resume reads this file FIRST per its v2.2.0 catchup protocol.

### (d) `~/.claude/CLAUDE.md` user-level shared memory (G9, P2)

Per Anthropic memory docs (https://code.claude.com/docs/en/memory) + CCBP `claude-memory.md`, `~/.claude/CLAUDE.md` loads at all sessions across all projects. Use it to declare cross-runtime conventions:
- "Session-lock file path: `.claude/state/session-lock-<branch>.json`"
- "Default worktree-per-session: enforce via eee.ps1 P0.3"
- "Planning files live at `docs/architecture/W<N>/`"

But: with state-outside-repo via `CLAUDE_CODE_PROJECT_DIR`, `~/.claude/` is `$env:USERPROFILE/.claude` = `Z:/claude-sota-installed/.claude/` (per CLAUDE.local.md L8 USERPROFILE override). So **user-level and project-level CLAUDE.md collapse to the same file** in the Z:-portable model. Recommendation: defer this remediation; doc-only in CLAUDE.md until the env-var override is reconsidered.

## §5 Cite-anchors

Per W295 I1 — ≥3-org-distinct external + local citations:

### Local (file:line)
- `Z:/claude-sota-installed/.claude/settings.json:107-217` — hook surface
- `Z:/claude-sota-installed/.gitignore:30` — `.claude/projects/` excluded
- `Z:/claude-sota-installed/tools/eee.ps1:175,326-335` — env-var set + mkdir-only
- `Z:/claude-sota-installed/CLAUDE.md:34` — W280d parallel-session-safety discipline
- `Z:/claude-sota-installed/CLAUDE.local.md:40-42` — state-outside-repo env vars
- `Z:/claude-sota-installed/.claude/plugins/marketplaces/planning-with-files/skills/planning-with-files/SKILL.md:7-29,46-53,223-244,250-258,302-321` — PreCompact + session-catchup + parallel-task + attestation
- `Z:/claude-sota-installed/.claude/skills/gitnexus/SKILL.md:12-27` — child-skill routing
- Live runtime: `git worktree list --porcelain` 2026-05-19 (W287, W290 zombie)

### External (3 org-distinct anchors)
- **Anthropic**: `https://code.claude.com/docs/en/cli-reference` — `--fork-session` + `/branch` semantics (cited via CLAUDE.md L34); `https://code.claude.com/docs/en/memory` — `~/.claude/CLAUDE.md` discipline (cited via CLAUDE.md L40)
- **CCBP (shan)**: `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-memory.md:34-40 @ f28c2da` — ancestor/descendant load order (W329 Stream E cite-refresh); `claude-memory.md:113` — CLAUDE.local.md gitignore discipline; `claude-settings.md:826` — auto-compact ~95% default
- **OthmanAdi (planning-with-files)**: `https://github.com/OthmanAdi/planning-with-files` — Manus-style file-based planning; SKILL.md v2.38.1 in local plugin cache
- **abhigyanpatwari (GitNexus)**: upstream `gitnexus-claude-plugin` @ `98addbd6c4e7aff77b5c33242d08155afe94ed35` — knowledge-graph MCP

## §6 Summary

**3 top recommendations (priority order)**:

1. **P0 — Fix `CLAUDE_CODE_PROJECT_DIR` redirect** (G1): rename in-repo `.claude/projects/` → `.claude/projects.legacy/`, relaunch CC, verify session JSONLs now write to state-outside-repo. This is the root of the cross-session race — JSONLs in-worktree mean each `git worktree` has isolated session history; resume fails across worktrees.

2. **P0 — Mechanize one-worktree-per-session in `eee.ps1`** (G3): add session-lock file at `.claude/state/session-lock-<branch>.json`; refuse launch if another live `pid` already owns the branch. This converts CLAUDE.md L34 W280d from documented discipline into enforced contract.

3. **P1 — Adopt `planning-with-files` for all multi-session waves** (G6): every wave creates `docs/architecture/W<N>/task_plan.md` + `findings.md` + `progress.md`; the skill's v2.2.0 `session-catchup.py` + PreCompact hook then handle seamless cross-session pickup automatically. Zero code to write — just enforce policy in CLAUDE.md.

**Secondary**: prune zombie worktrees now (G2, one-liner); plan gitnexus session-ingestion for W331+ (G8).
