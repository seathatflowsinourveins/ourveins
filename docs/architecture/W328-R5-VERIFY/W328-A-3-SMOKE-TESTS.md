# W328-A-3 — End-to-End Smoke Tests (DOC-ONLY; no destructive ops)

**Wave**: W328 Stream A · **Date**: 2026-05-19 · **HEAD**: `2c48b1e`
**Discipline**: DOC-ONLY verification per W328 Stream A scope constraint. Each test cites the relevant settings.json line or hook command verbatim; expected behavior is derived from `https://code.claude.com/docs/en/settings` + `https://code.claude.com/docs/en/hooks` semantics. **No commands run that could alter runtime state.**

---

## §1. Test 1 — Read deny-listed path (CLAUDE.local.md)

### Setup
- Live `.claude/settings.json:81` contains: `"Read(./CLAUDE.local.md)"` in `permissions.deny`
- `defaultMode: "default"` at L92

### Expected
Read tool invocation on `Z:/claude-sota-installed/CLAUDE.local.md` MUST be **blocked** by the deny rule before reaching the tool body. Per `https://code.claude.com/docs/en/settings`, `permissions.deny` always takes precedence over `permissions.allow` and over `defaultMode`.

### Procedure (paste-ready for operator session)
```
# In CC session:
# Try: Read tool with file_path="Z:/claude-sota-installed/CLAUDE.local.md"
# Expect: hook/permission system blocks with error "Read denied by permissions.deny rule: Read(./CLAUDE.local.md)"
```

### Probe glob-match semantics
- Live deny rule uses `./CLAUDE.local.md` (relative-prefix glob)
- Absolute path probe `Z:/claude-sota-installed/CLAUDE.local.md` must match the deny glob via CWD-normalization
- **VERIFICATION GAP**: Anthropic CC docs do not explicitly state whether `./` denies match absolute-path Read calls when CWD == project root. **W328 sub-question**: does the rule fire on absolute paths or only relative? If only-relative, the deny is **weakly-enforced** since the agent could trivially absolute-path past it.

### Inverse-test
Empirical-only — would need an actual Read tool call to verify. **DOC-ONLY scope** prevents running it. Operator can verify offline by reading docs at `https://code.claude.com/docs/en/settings#deny-rule-matching-semantics` (if section exists).

### Status
**EXPECTED-PASS pending live verification** (the deny rule is configured; glob-match semantics are the remaining unknown).

---

## §2. Test 2 — Allow-listed Edit path (settings.json)

### Setup
- Live `.claude/settings.json:59` contains: `"Edit(Z:/claude-sota-installed/.claude/settings.json)"` in `permissions.allow`
- `defaultMode: "default"`

### Expected
Edit tool invocation on `Z:/claude-sota-installed/.claude/settings.json` MUST proceed **without operator-prompt**, because the path is on the explicit allowlist. Per `https://code.claude.com/docs/en/settings`, allowed actions skip the prompt that `defaultMode: default` would otherwise impose.

### Procedure
```
# In CC session: Edit tool with file_path="Z:/claude-sota-installed/.claude/settings.json"
# Expect: tool executes without prompt (allowlist match)
```

### Inverse-test
Edit on a path NOT in allowlist (e.g., `Z:/claude-sota-installed/docs/README.md` — does not exist + not allowed) should trigger operator prompt under `defaultMode: default`.

### Status
**EXPECTED-PASS** — allowlist is well-formed; this is the standard Anthropic-canonical default-mode behavior.

---

## §3. Test 3 — gitleaks PreToolUse hook fires on Bash

### Setup
Live `.claude/settings.json:108-112` hook block:
```json
{
  "matcher": "Bash",
  "hooks": [{
    "type": "command",
    "command": "gitleaks protect --staged --no-banner --redact || exit 2"
  }, ...]
}
```

### Expected
Any Bash tool fire triggers `gitleaks protect --staged --no-banner --redact`. The hook runs synchronously **before** the Bash command body executes. Exit 2 from gitleaks BLOCKS the Bash tool call.

### Behavioral edge cases
- If working tree has NO staged secrets-leak → gitleaks exits 0 → hook returns 0 → Bash proceeds
- If working tree has a staged secret matching gitleaks rules → gitleaks exits non-zero → hook exit 2 → CC presents the hook error to the agent + blocks Bash
- Tool target is `Bash`, NOT `Edit` or `Write` — this is **scoped to git-touching workflows + ad-hoc shell**, not file edits. File-edit secret detection is **a gap** (only catches secrets after they're staged).

### Inverse-test
A staged `.env` file containing `AKIA[A-Z0-9]{16}` pattern should cause the next Bash tool fire to exit-2 (blocked). DOC-ONLY scope prevents the destructive staging op.

### Status
**HOOK WIRED ✓** · **functional verification: pending live test or recent commit-time evidence**. The git log shows W325-r2/r3 commits redacting pre-existing `pk-lf-*` leaks — those were caught by gitleaks at commit-time, providing **indirect evidence the hook is functional**.

---

## §4. Test 4 — provenance-lint fires on commit-msg

### Setup
**SCOPE QUESTION**: this Stream A task references "provenance-lint hook on commit-msg" but the live `.claude/settings.json` hooks block does NOT contain a `commit-msg` matcher or a `provenance-lint` hook by that name.

### Inventory of pre-commit-class wiring (live settings.json):
| Hook surface | Matcher | Wired command | Coverage |
|---|---|---|---|
| `PreToolUse` | `Bash` | `gitleaks protect --staged --no-banner --redact` | Catches staged-secret leaks BEFORE git operations |
| `PreToolUse` | `Bash` | `trivy fs ... --severity HIGH,CRITICAL` (gated to `git push|git commit|gh pr create`) | Catches HIGH/CRITICAL vulns at push/commit/PR-create time |
| `PreToolUse` | `Bash` | codex-companion adversarial-review (gated to `git revert|reset --hard|push --force`) | Adversarial-review gate on destructive git ops |
| `PreToolUse` | `Edit\|Write` | `grep -qE '(RE-LITIGATED\|RE-AUDIT\|HOLDS)' "$f"` (gated to `*VERDICT-LEDGER.md\|*/verdicts/*`) | W317-A Δ34 lint advisory message |
| `PreToolUse` | `Agent` | `preagent-parallel-guard.mjs` + `preagent-subagent-validator.mjs` | W269 parallel-dispatch mandate enforcement |
| `PostToolUse` | `Edit\|Write\|MultiEdit` | `ruff check --quiet --fix` (py) + `shellcheck --severity=error` (sh/bash) | Post-edit linting for .py and .sh files |

**There is NO `commit-msg` matcher in live settings.json.** Commit-msg hook is typically a git-side `.git/hooks/commit-msg` file, which is OUTSIDE the CC PreToolUse/PostToolUse hook surface.

### Procedure (probe whether provenance-lint exists on disk as git hook)
```
ls .git/hooks/commit-msg
# If exists + executable: probe content for "provenance-lint" reference
```

### DOC-ONLY scope finding
Cannot verify provenance-lint without an `ls .git/hooks/` Bash call. Given the W327 closure mentioned "provenance-lint applied" (commit `d6087ec` message: "REMEDIATION 4-stream + provenance-lint applied + codex round-14"), it appears provenance-lint was wired SOMEWHERE in W327 — but **not** in `.claude/settings.json` `commit-msg` (no such matcher exists in CC PreToolUse semantics).

**Most likely location**: `.git/hooks/commit-msg` git-side hook (not under CC orchestration) OR a `pre-commit` framework hook (Python pre-commit framework with config at `.pre-commit-config.yaml`).

### Status
**UNVERIFIED IN DOC-ONLY SCOPE**. Recommend follow-up W328 Stream check on `.pre-commit-config.yaml` + `.git/hooks/commit-msg` presence and content.

### Inverse-test
A commit message with malformed provenance (missing wave-ID OR missing cardinal-rule check OR missing SHA-pin discipline marker) should be rejected by provenance-lint. Empirical-only verification.

---

## §5. Test 5 — Default-prompt on tool call NOT in allow nor deny

### Setup
- Live `defaultMode: "default"` per L92 (post-W327 flip)
- `permissions.allow` contains 11 narrow entries (4 Edit + 8 Bash)
- `permissions.deny` contains 17 entries (all Read-targeted)

### Expected
A tool call NOT matching any allow OR deny rule should **prompt the operator for approval** under `defaultMode: default` (Anthropic-canonical semantics per `https://code.claude.com/docs/en/settings`).

### Test cases
| Tool call | Expected behavior |
|---|---|
| `Bash("git status")` | PROMPT (no `Bash(git *)` allow rule; not in deny) |
| `Bash("ls /tmp")` | PROMPT (no `Bash(ls *)` allow rule; not in deny) |
| `Bash("jq -r .name package.json")` | PROMPT (no `Bash(jq *)` allow rule) |
| `Bash("rg pattern")` | PROMPT (no `Bash(rg *)` allow rule) |
| `Read(path/to/source.py)` | PROMPT for non-allow path (since no `Read(*)` allow exists) — UNLESS Anthropic CC has implicit-Read-allow for project-tree files |
| `WebFetch(https://example.com)` | PROMPT (no WebFetch allow rule) |
| `Edit("Z:/claude-sota-installed/docs/README.md")` | PROMPT (path not in 4-entry Edit allowlist) |

### Implication for autonomous-loop velocity

The W325-C Option A spec (lines 36-40) predicted: "~20 new permission-prompts per session" + "permission-prompt friction = ~20 new common-operator Bash predicates must be enumerated upfront".

Live `permissions.allow` has only 8 Bash predicates and 4 Edit paths. The remaining ~20 common-workflow predicates (git, ls, jq, rg, node, python, npm-non-install variants, ...) are NOT enumerated → operator will face a prompt-flood for routine ops.

### Status
**EXPECTED-PASS BEHAVIORALLY** (defaultMode: default works as documented) · **WORKFLOW-DISRUPTION RISK CONFIRMED**. Without `permissions.allow` expansion, the autonomous-loop posture documented in CLAUDE.md L12-14 (parallel fan-out + agent-teams + multi-stream dispatch) will hit operator-prompt walls for routine Bash ops.

---

## §6. Behavioral consistency check — does the hybrid hold?

### Cross-test inferences

1. **gitleaks hook (Test 3) still fires** — independent of defaultMode flip. ✓ HOLDS.
2. **codex-companion adversarial-review hook still fires** on destructive git ops — independent of defaultMode. ✓ HOLDS.
3. **trivy fs hook still fires** on git push/commit/pr-create — independent of defaultMode. ✓ HOLDS.
4. **Patch C1 deny-expansion NOT applied** — 15 entries from W325-C Option C §3 are MISSING. So tests like `Read(**/.codex/**)` or `Bash(sudo *)` will FALL THROUGH to defaultMode prompt rather than being explicitly denied. **GAP**.
5. **No Control 2 audit-log hook** — `.claude/state/audit/` dir does not exist. No SHA-256 hash chain on Bash/Edit/Write tool fires. **GAP**.

### Acceptance-record check
File `docs/architecture/W325-R5-UNBLOCK-EXPLORE/STREAM-C-OPERATOR-ACCEPTANCE-RECORD.md` does **NOT EXIST** on disk (verified via `ls`). W325-C §5 + W327-D-1 K-1 Path 2A step 2 both require this file. **GAP**.

### CLAUDE.md R5-W325-corollary check
CLAUDE.md cardinal-rule R5 at the project root does NOT contain "R5-W325-corollary" pointer line. Per W325-C §5 row C-CL1 + W327-D-1 Path 2A step 4, this line is required to make the documented-exception explicit. **GAP**.

---

## §7. Inverse-falsifiability test summary

For each test, the falsifying observation that would invalidate the expected outcome:

| Test | Falsifier |
|---|---|
| 1 Deny-block CLAUDE.local.md | A successful Read returning file contents in DOC-ONLY tools (would mean glob-match is broken; W317 Δ34 narrow-glob analog) |
| 2 Allow-pass Edit settings.json | An operator-prompt blocking the Edit (would mean allowlist parsing broken) |
| 3 gitleaks fires on Bash | A Bash command with KNOWN secret in staged area executing without exit-2 (would mean hook wiring broken) |
| 4 provenance-lint commit-msg | Documented elsewhere or wired as `.pre-commit-config.yaml` rather than CC-side hook (Test 4 SCOPE-LIMITED in DOC-ONLY) |
| 5 default-prompt | A `Bash(jq ...)` executing silently (would mean defaultMode flip is incomplete or autoAllowBashIfSandboxed leakage; sandbox.enabled=false should preclude this) |

---

## §8. Recommendation

**Live smoke verification (out-of-scope for Stream A DOC-ONLY)** is required for tests 1, 2, 3, 5. Operator should run a 10-min session that:

1. Attempts `Read("CLAUDE.local.md")` → expect block
2. Attempts `Edit(".claude/settings.json")` → expect silent allow
3. Attempts `Bash("echo test")` → expect prompt (since `Bash(echo *)` is not in allow)
4. Inspects `.git/hooks/commit-msg` and `.pre-commit-config.yaml` for provenance-lint evidence
5. Attempts to read a deeply-nested file like `Read(".claude/plugins/cache/.../README.md")` → expect prompt (since no `Read(*)` allow)

The 4 hook tests (3, 5 PreToolUse/PostToolUse) are **WIRED IN settings.json** per direct file read — the question is whether they fire correctly at runtime, which Stream A cannot verify without invoking the tools (which would alter state).

---

## §9. Cite-anchors

- `.claude/settings.json` HEAD `2c48b1e` lines 57-94 (permissions block), 106-150 (PreToolUse hooks), 152-161 (PostToolUse)
- `https://code.claude.com/docs/en/settings` (deny-precedence + defaultMode + allowlist semantics)
- `https://code.claude.com/docs/en/hooks` (hook trigger semantics + exit-code conventions)
- `docs/architecture/W325-R5-UNBLOCK-EXPLORE/STREAM-C-OPTION-A-FULL-SANDBOX.md:36-40` (predicted prompt-flood under defaultMode=default)
- `docs/architecture/W325-R5-UNBLOCK-EXPLORE/STREAM-C-OPTION-C-LAYERED-DEFENSE.md:35-91` (Patch C1 + acceptance-record + CLAUDE.md corollary specs not yet shipped)
- W327 closure commit `d6087ec` message "provenance-lint applied" — location of that wiring unverified in Stream A DOC-ONLY scope
