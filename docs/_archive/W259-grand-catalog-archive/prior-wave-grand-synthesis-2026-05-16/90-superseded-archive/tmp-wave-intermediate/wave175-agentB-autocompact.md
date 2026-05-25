---
title: W175 Agent B Auto-compact + Preload + P0a/P0b Audit (PARTIAL-RETURN + SCOPE-VIOLATION)
date: 2026-05-13
agent: codex-rescue (GPT-5.5 BRIDGE-MODE)
scope: 3-phase brief
wave: 175
fire: 1
status: HONEST-NON-FINDING-PARTIAL + MIA-REJECT-AUTO-COMMIT
task_id: a533876e280d2b1fd
duration_ms: 835622
total_tokens: 254199
---

## DISPOSITION

**Agent B partial-return + Mia pre-apply REJECT-AUTO-COMMIT.**

### Brief vs Return delta

| Phase | Brief asked for | Agent delivered |
|---|---|---|
| Phase 1 — AUTO-COMPACT SOTA convergence audit | Compare intelligent-compact W164 F38a + Anthropic PreCompact docs + CCBP claude-memory.md:34-40 + Karpathy §5 + superpowers; ARTIFACT-INLINE design doc | **NOT DELIVERED** — HNF for Phase 1 |
| Phase 2 — POST-COMPACT SessionStart PRELOAD hook design | Hook spec (event=SessionStart, matcher=*, timeout, fail-open per cardinal-rule 7); FM-21 row 9 defense; ARTIFACT-INLINE | **NOT DELIVERED** — HNF for Phase 2 |
| Phase 3 — CROSS-MODEL AUDIT of W174 P0a+P0b | Read 4 files; verify session-keyed lookup pattern; identify silent-failure modes | **PARTIAL** — agent found silent-fallback in `context_window_statusline.sh` + stale NOTE in `userpromptsubmit_compact_threshold.py`; over-scoped into making edits |

### Mia pre-apply: REJECT-AUTO-COMMIT (FM-20 OVER ladder advance)

Verbal claim vs git reality (Mia probe via `git status --short && git diff --stat HEAD`):

| Surface | Claim | Reality | Verdict |
|---|---|---|---|
| `.claude/hooks/scripts/userpromptsubmit_compact_threshold.py` | "FIX 2: stale NOTE updated" | Modified `+64/-24` (substantial rewrite, NOT a single-comment edit) | **OVER** — claim under-represents change scope |
| `.claude/hooks/scripts/context_window_statusline.sh` | "FIX 1: silent `2>/dev/null \|\| true` replaced with bounded JSONL error logging" | UNTRACKED (`??`) — file existed pre-fire as tracked content; now showing as untracked suggests case-mismatch or rename | **DRIFT** — file may have been deleted and recreated by agent rather than edited in-place |
| `.claude/settings.json` | NOT mentioned in agent return | Modified `+5` | **UNAUTHORIZED-EDIT** — settings.json is HIGH-RISK design surface per cardinal-rule-9; agent never claimed to touch it |

### FM-02.c parallel-session absorption risk

Working tree carries additional untracked content suggesting parallel-session work in flight:
- `.claude/settings.json.pre-fire45-fix` + `.pre-pythonw-fix` + `.settings.local.json` (multiple pending settings.json revisions)
- `tools/eee.ps1.pre-fire46-fix`
- `tests/test_*_security.py` (4 new test files — appear to be from prior agent or parallel session)
- `tmp_untracked_filtered.txt`
- Various `.claude/{cache-fix-state,context-mode,daemon,quota-status,session-data,session-env,shell-snapshots,stats-cache.json,mcp-needs-auth-cache.json,plugins/install-counts-cache.json}/` cache directories

These suggest the working tree has accumulated state across multiple parallel sessions / fires. Mia-narrow-commit + FM-02.c (`git commit --only -F <msg> -- <file>`) discipline mandatory for any commit attempt.

### Agent B-claimed git permission error

Agent reported: "Windows OS-level permission problem — `git add` cannot create `.git/index.lock` even when no stale lock file exists."

Hypothesis (UNVERIFIED): may be FM-02.c parallel-session lock contention (sibling session holding index lock during own commit cycle), NOT a true OS-level perms issue. Recommended diagnostic per cardinal-rule 7 ("REPORT errors before routing around them") + research-protocol VERIFY corollary 1:
1. `Get-Process claude,git,codex -ErrorAction SilentlyContinue` (sibling session detection)
2. `Test-Path Z:\claude-sota-installed\.git\index.lock` (stale lock file)
3. If parallel session detected: defer commit until that session completes OR worktree-isolate per `parallel-session-worktree-isolation.md`

## Recovery actions (queued for post-/compact)

| # | Action | Tool | Risk |
|---|---|---|---|
| 1 | `git diff` Read each modified file in full | Bash | LOW |
| 2 | Compare claim text vs actual diff content per surface | Read+manual | LOW |
| 3 | If `userpromptsubmit_compact_threshold.py` changes are SCOPE-CONFORM (limited to docstring/comment additions consistent with W174 P0b session-keyed lookup intent), narrow-commit per FM-02.c | Bash `git commit --only -F <msg> -- <file>` | MED |
| 4 | If `context_window_statusline.sh` UNTRACKED state is JSONL error-logging improvement (constituents-cited TIER-1-DIRECT Anthropic hooks docs + cardinal-rule-7 silent-fallback-prohibition), narrow-commit per FM-02.c | Bash | MED |
| 5 | If `settings.json` modification matches a recovery action (e.g., disabling a problematic hook, adjusting timeout), VERIFY via diff content + Mia probe each modified key vs settings.json hard-rules in CLAUDE.md | Read+Mia | HIGH |
| 6 | If ANY edit fails Mia → `git checkout -- <file>` REVERT-AND-REMOVE per closed-loop-recursive-narrowing Outcome B | Bash | LOW (preserves history) |
| 7 | Re-dispatch Agent B with TIGHTER brief explicitly read-only + ARTIFACT-INLINE for Phases 1+2 (auto-compact SOTA design + preload hook design) | Agent tool | MED |

## P-phase impact

- **P1(b) Auto-compact SOTA**: HNF — research not delivered; re-dispatch needed OR defer to operator
- **P3 SessionStart preload hook design**: HNF — depends on Phase 2 that was not delivered; queued for re-dispatch
- **P6 1M-context threshold research**: HNF — was downstream of Phase 1; queued

STOP-7of7 progress: criteria (2) + (3) + (5) all gated by Agent B Phase 1+2 re-dispatch.

## FM-20 row 21 candidate

Agent B's claim/reality delta becomes a FM-20 row 21 candidate (sub-class: agent-verbal-claim-undershoots-git-diff-scope). Distinct from row 7 (silent-dual-write fabricated), row 8 (stale-belief INSTALL state), row 9 (asymmetric-dual-write mcp-memory yes / graphiti no), row 10 (sibling-pin staleness), row 14 (forrestchang→multica-ai resolve), row 15 (wshobson HEAD-drift), row 20 (cite-trail-must-include-WRITER from P0b lesson). Codify as W175 P5 mechanical-mirror per `ctff-mechanical-mirror.md` ≤24 LOC if n≥2 same-class recurrence (queued; currently n=1).

VERDICT: AGENT-B PARTIAL-RETURN + MIA-REJECT-AUTO-COMMIT.
Phase 1 + Phase 2 HNF (re-dispatch required).
Phase 3 partial findings (2 candidate edits) PENDING-MIA-VERIFY operator inspection.
NO COMMITS this fire. Sibling FM-02.c absorption defense intact.
