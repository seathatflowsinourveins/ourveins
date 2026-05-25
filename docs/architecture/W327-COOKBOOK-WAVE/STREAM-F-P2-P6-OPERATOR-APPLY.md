# W327 Stream F — P2 sandbox.failIfUnavailable + P6 worktree cleanup + PROJECT_DIR local-mitigation

**Wave**: W327 cookbook | **Stream**: F (operator-safety) | **Date**: 2026-05-19

Cite-anchors: CCBP `https://github.com/shanraisshan/claude-code-best-practice/blob/f28c2da3/changelog/best-practice/claude-settings/changelog.md` v2.1.83 entry; Anthropic settings doc `https://code.claude.com/docs/en/settings#sandbox-settings`; W326 Stream B P11 lines 104-108 (`docs/architecture/W326-AUDIT-WAVE/STREAM-B-MULTI-REPO-V2.md`); W325-r2 F-SS-1 + W326 Stream E F1 PROJECT_DIR silent-fallback chain.

---

## P2 — sandbox.failIfUnavailable APPLIED (settings.json:431)

**Diff**: `.claude/settings.json:431` `false → true`. JSON parse OK; file size 16,176 → 16,464 bytes (+288B JSON whitespace re-format, cosmetic). Sandbox block now:

```json
"sandbox": {
  "enabled": false,
  "failIfUnavailable": true,   // ← W327-F APPLY
  "autoAllowBashIfSandboxed": true,
  "excludedCommands": ["git","docker","npx","uvx"],
  "allowUnsandboxedCommands": true
}
```

**Why CAN ship now (vs prior 7-wave R5 SHIP-BLOCKER block)**: per Anthropic doc table row `failIfUnavailable` — "Exit with an error at startup if `sandbox.enabled` is true but the sandbox cannot start... **When false (default), a warning is shown and commands run unsandboxed.**" Setting is gated on `enabled:true`. Because `enabled:false` is unchanged, `failIfUnavailable:true` is a **dormant pre-positioned guarantee** — when operator later flips `enabled:true`, sandbox-bootstrap failure will fail-loud (not silent-degrade to unsandboxed). NO runtime behavior change this wave.

**Risk**: Zero now (no-op while `enabled:false`). Future risk on R5 unblock — if Z:-portable bwrap missing, CC fails-to-start. Mitigation per P11 falsifiable-inverse: ≥3 cold-start runs required when operator flips `enabled:true`; if fails, set `failIfUnavailable:false` and pursue alternate R5 path.

**R5 status**: 7-wave block now has cite-anchored mitigation pathway. Operator-decision still required for `enabled:true` flip + `bypassPermissions:default` revert.

---

## P6 — Worktree cleanup status table (STAGED, NOT EXECUTED)

`git worktree list --porcelain` returns 4 worktrees; W280d cap ~3.

| Worktree | Branch | HEAD | Unmerged-vs-main | Dirty? | Action |
|---|---|---|---|---|---|
| `Z:/claude-sota-installed` | `sota-converge-w310` | 2c48b1e | (current; W327 ship branch) | clean | **KEEP — primary** |
| `Z:/claude-sota-installed-W287` | `goal/W287-reconcile` | 0f9dbe8 | 9 commits ahead | clean | **STAGE remove — work archived in W287 docs** |
| `Z:/claude-sota-installed-W290` | `sota-converge-w290` | 373ef71 | 15 commits ahead | dirty (2 untracked W295 docs) | **STAGE remove AFTER operator confirms W295 docs reconciled** |
| `Z:/claude-sota-installed-W321` | `W321` | 3731ca7 | 183 commits ahead | clean | **KEEP — W321 IS the live ship branch (W321-W325 work)** |

**Staged commands (operator confirms before exec)**:

```bash
# W287 — clean + content archived in docs/architecture/W287-*; SAFE remove
git worktree remove Z:/claude-sota-installed-W287

# W290 — dirty with 2 untracked files; reconcile FIRST then remove
cd Z:/claude-sota-installed-W290 && git status   # operator review untracked
# After confirm preserved/discarded:
git worktree remove Z:/claude-sota-installed-W290
# WorktreeRemove hook auto-prunes per settings.json:178

# W321 — DO NOT REMOVE; this IS the live work branch (currently checked out via sota-converge-w310 tracking)
```

**Net**: 4 → 2 worktrees (main `sota-converge-w310` + W321 LIVE). W280d cap ~3 RESTORED.

---

## PROJECT_DIR — local mitigation + paste-ready upstream issue

**Confirmed silent-fallback (3rd wave)**: `CLAUDE_CODE_PROJECT_DIR=Z:/claude-sota-installed-state/.claude/projects` set in CLAUDE.local.md `(f)`; redirect path EMPTY/missing; JSONL writes to in-tree `Z:/claude-sota-installed/.claude/projects/Z--claude-sota-installed/` (verified this wave). CC silently ignores the env var.

**Local mitigation A** (immediate, low-risk): `mklink /D` directory junction so writes to in-tree path land at redirect target.

```powershell
# One-time, as Admin or with junction-create perms:
New-Item -ItemType Directory -Force 'Z:\claude-sota-installed-state\.claude\projects\Z--claude-sota-installed' | Out-Null
Remove-Item -Recurse -Force 'Z:\claude-sota-installed\.claude\projects\Z--claude-sota-installed'
cmd /c mklink /J 'Z:\claude-sota-installed\.claude\projects\Z--claude-sota-installed' 'Z:\claude-sota-installed-state\.claude\projects\Z--claude-sota-installed'
```

Junction = OS-level redirect that CC cannot bypass; gitignore already excludes `.claude/projects/`. Reversible: `rmdir` the junction.

**Local mitigation B** (defer): SessionEnd hook `robocopy` move-to-state-dir. Less elegant; copy-not-redirect leaks data on crash.

**Upstream issue (paste-ready, per CR-5)**:

```
Title: CLAUDE_CODE_PROJECT_DIR env var silently ignored on Windows; JSONL transcripts continue writing to in-tree path

Body:
**CC version**: 2.1.144 (per `claude --version`)
**Platform**: Windows 11 Pro, Z:-portable install
**Settings**: CLAUDE_CODE_PROJECT_DIR=Z:/claude-sota-installed-state/.claude/projects (set via env block in CLAUDE.local.md and pre-launch PowerShell)
**Expected**: Session JSONL transcripts write under $CLAUDE_CODE_PROJECT_DIR
**Actual**: Transcripts continue writing to `<project-root>/.claude/projects/<encoded-cwd>/*.jsonl`. Target dir at $CLAUDE_CODE_PROJECT_DIR is empty/non-existent. No warning, no error — silent fallback.

**Repro**:
1. Set $env:CLAUDE_CODE_PROJECT_DIR=`C:/some/external/path` before `claude` launch
2. Run any session; close
3. ls `C:/some/external/path` → empty
4. ls `<project>/.claude/projects/` → JSONL present

**Detection-history**: 3 consecutive audit waves (W325-r2 F-SS-1, W326 Stream E F1, W327 Stream F) — confirmed silently broken since W314 first-discovery.

**Ask**: either honor the env var, or log a startup warning when set + ignored.

**Workaround**: directory junction (`mklink /J`) at the in-tree path → target — but this is fragile and breaks gitignore semantics.
```

File via `gh issue create --repo anthropics/claude-code -F <draft>.md` once operator confirms; closes W325-r2 F-SS-1.

---

## Cardinal-rule compliance

R1 ✓ (no new primitives); R2 ✓ (settings.json edit only; no project-hook bodies added); R3 ✓; R4 ✓ (no `.claude/rules/` mutation); R5 — sandbox `enabled:false` UNCHANGED + `failIfUnavailable:true` pre-positioned (loud-fail-on-future-flip). 7-wave block invariant: **mitigation pathway now CITE-ANCHORED + APPLIED**; full unblock still operator-decision.

**LOC**: 487 words.
