# W327 Stream C — Provenance Lint Design Specification

> **Wave**: W327 Stream C
> **Date**: 2026-05-19
> **HEAD baseline**: `569080a` (W326-codex-r1 closure)
> **Operator directive**: codify multi-session race detection via pre-commit "git provenance lint" (W327 P0 #11)
> **Precedent**: W317-A Δ34 supersession-chain lint at `PreToolUse[Edit|Write]` (cite-anchored; CR-2 compliant)

## 1. Problem Statement

W319+ multi-session reconcile work surfaced a recurring failure mode: when 2-3 Claude Code sessions run in parallel git worktrees (per CLAUDE.md "Parallel-session safety (W280d)" + Anthropic cli-reference `--fork-session`), the ship commit message in session N can claim "APPLIED THIS COMMIT" for changes that were actually landed by a parallel session between dispatch and ship.

**Observed occurrences** (from `git log --oneline` + W326-CODEX-R1-CLOSURE.md):

| Wave | Falsely-claimed APPLIED | Actual landing commit | Detection method |
|---|---|---|---|
| W320-codex-r1 | settings.json M6 PreCompact + PWF flip | W324 8e43c24 | Codex round-1 BLOCK |
| W326-codex-r1 | SKILL.md §7 math fix | W325 e1a7ec6 | Codex round-1 BLOCK |

Both occurrences required a codex round-2 closure commit to correct provenance. Lint moves detection BEFORE commit (fail-fast) instead of AFTER (codex round-1 review).

## 2. Lint Logic — High-Level Algorithm

For each `git commit -m "<message>"` invocation:

1. **Parse claim taxonomy** in commit message body (case-sensitive, line-anchored, multi-line allowed).
2. **Cross-check claims vs staged file set** = `git diff --staged --name-only`.
3. **For VERIFIED-ALREADY-APPLIED claims**: validate cited prior-commit SHA exists + touched the cited file.
4. **Exit 2 + diagnostic** on mismatch; **exit 0 + no-op** on match or no-claims.

## 3. Claim Taxonomy

Three claim forms detected (all line-anchored to commit-message body):

### 3.1 APPLIED claim (strong positive)

**Regex** (PCRE/POSIX-extended compatible):

```
^[[:space:]]*(?:-[[:space:]]+)?(?:APPLIED|APPLIED THIS COMMIT)[[:space:]]*:[[:space:]]*(.+?)$
```

**Capture group 1**: file path (relative to repo root).

**Semantics**: this commit MUST modify the captured file. If staged file set does not include the captured path → BLOCK.

**Examples from repo history**:

- `Stream A F1 APPLIED: settings.json:206 ccstatusline ...` (W326 670423d — VALID; settings.json staged)
- `APPLIED: SKILL.md §7 install denom math fix ...` (W326 670423d — INVALID; SKILL.md NOT staged; parallel session e1a7ec6 already landed it)

### 3.2 VERIFIED-ALREADY-APPLIED claim (deferred positive)

**Regex**:

```
^[[:space:]]*VERIFIED-ALREADY-APPLIED[[:space:]]*\(([0-9a-f]{7,40})\)[[:space:]]*:[[:space:]]*(.+?)$
```

**Capture group 1**: prior-commit SHA (short 7-char or full 40-char hex). **Capture group 2**: file path.

**Semantics**: this commit does NOT modify the captured file. Instead it cites a prior commit SHA that already touched it. Lint MUST verify:

1. SHA resolves via `git cat-file -t $sha 2>/dev/null = commit`.
2. SHA's diff touched the cited file: `git show --name-only --pretty=format: $sha | grep -Fx "$file"`.

If either check fails → BLOCK.

**Use case**: post-multi-session-race acknowledgments. W326-codex-r1 closure (this design's progenitor) should have written:

```
VERIFIED-ALREADY-APPLIED (e1a7ec6): .claude/skills/sota-convergence-audit/SKILL.md
```

### 3.3 No-claim (default)

Commit messages with no APPLIED / VERIFIED-ALREADY-APPLIED pattern → lint silently exits 0. Conventional Commits `fix:`, `feat:`, `chore:` messages without provenance claims pass through unaffected.

## 4. Parser Regex — Composed

Single ERE pattern combining 3.1 + 3.2 (for `grep -E` extraction):

```
^[[:space:]]*(-[[:space:]]+)?(APPLIED( THIS COMMIT)?|VERIFIED-ALREADY-APPLIED(\([0-9a-f]{7,40}\))?)[[:space:]]*:[[:space:]]*.+$
```

Multi-pass approach is simpler than monster-regex: 2 separate `grep -E` invocations, one per claim form, each capturing the path. See Implementation Options (W327-C-3).

## 5. False-Positive / False-Negative Analysis

### 5.1 False positives (lint BLOCKs valid commit)

- **Claim text inside a quoted code-block** (e.g., commit message embeds a code snippet that happens to contain "APPLIED:"). Mitigation: regex anchors to line-start with optional `-[ ]` bullet prefix; quoted prose with leading spaces beyond bullet-depth-2 is ignored. Operator escape: prefix with `>` quote marker or wrap in backticks-fence (lint skips fenced lines).
- **Reverting a prior APPLIED** (`git revert <sha>` of an APPLIED-claim commit). Mitigation: revert commits use default `Revert "<original subject>"` form; original APPLIED claim is in body and is now factually correct (the revert undoes the change). Conservative: lint can be skipped on revert commits via parsing `^Revert ".*"$` subject.

### 5.2 False negatives (lint MISSES invalid commit)

- **Implicit claim without keyword** (e.g., "fixed settings.json M6 block" without "APPLIED:"). Lint cannot detect; this is acceptable because the issue is operator discipline in writing explicit APPLIED claims.
- **Path mismatch via subdirectory** (claim says `SKILL.md` but staged is `.claude/skills/foo/SKILL.md`). Mitigation: claim path matching uses `grep -F -x` (exact-match) on full repo-relative path; partial paths must be specified exactly. Operator advisory documented in test plan.

## 6. Test Vectors (anchored to W327-C-4-TEST-PLAN.md)

5 test cases verify accurate-claim PASS / mismatch-claim BLOCK / prior-SHA verify PASS / invalid-SHA BLOCK / no-claim no-op. See W327-C-4.

## 7. Performance Budget

Hook runs at `PreToolUse:Bash` matcher for `git commit` commands. Expected runtime ≤ 200ms per commit (single `git diff --staged --name-only` + 2 `grep` passes over commit-msg body, ≤ 50 lines typical).

W317-A Δ34 lint timeout = 5s. New provenance lint MUST honor same envelope; hard-cap at 30s to allow `git show` SHA-verify on slow disks. Settings.json `timeout` field set to 10 (seconds; per `https://docs.anthropic.com/en/docs/claude-code/settings` hook-timeout semantics).

## 8. Cite-Reference Anchors (deferred to W327-C-2)

- Conventional Commits 1.0.0 (Linux Foundation OpenSSF + community)
- SLSA v1.0 build-provenance (Linux Foundation SLSA WG)
- GitHub commit-signature verification model (GitHub Inc.)

See W327-C-2-EXTERNAL-ANCHORS.md for full URLs + accessed dates.

## 9. Cardinal-Rule Compliance Summary

| Rule | Compliance path |
|---|---|
| R1 | No new plugin install; lint uses existing trusted-source bash + jq + git |
| R2 | Option A direct-CLI inline-bash (preferred); Option B sanctioned-exception ≤ 2KB shim only if A insufficient |
| R3 | No subagent invocation |
| R4 | No `.claude/rules/*` add |
| R5 | Safety via Claude Code permissions + exit-2 hook return; NO destructive ops |

Settings.json size impact estimated +400-600B for Option A. Pre-lint settings.json baseline = 15,998 bytes (per W326 Stream A F1 ship). Cap = 15,360B per W317-A → **EXCEEDS** by 638B. Resolution: trim cosmetic env var or restore W317-A cuts. See W327-C-3 for implementation choice + size-management strategy.
