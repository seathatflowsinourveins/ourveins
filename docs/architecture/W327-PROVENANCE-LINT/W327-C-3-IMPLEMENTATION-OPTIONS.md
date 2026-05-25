# W327 Stream C — Implementation Options (A / B / C Trade-Offs)

> **Wave**: W327 Stream C
> **Date**: 2026-05-19
> **Selection task**: choose between settings.json PreToolUse:Bash inline (A), `.claude/hooks/*.mjs` shim (B), and `.pre-commit-config.yaml` framework (C).

## Option A — settings.json `PreToolUse:Bash` inline-bash hook (cardinal-rule-2-preferred)

**Form**: append to existing `PreToolUse[matcher: "Bash"]` block in `.claude/settings.json`.

**Trigger surface**: every `Bash` tool invocation; hook inspects `tool_input.command` (via `jq -r`) and matches `git commit` patterns case-statement.

**Sketch** (inline-bash, ≤ 500B target):

```bash
bash -c "cmd=\$(jq -r '.tool_input.command // empty'); \
case \"\$cmd\" in \
  *'git commit'*) \
    msg=\$(echo \"\$cmd\" | grep -oE -- '-m[[:space:]]+[\"'\\''][^\"'\\'']*[\"'\\'']' | sed -E 's/^-m[[:space:]]+[\"'\\'']//;s/[\"'\\'']$//'); \
    staged=\$(git diff --staged --name-only); \
    bad=0; while IFS= read -r line; do \
      p=\$(echo \"\$line\" | grep -oE -- '(APPLIED|APPLIED THIS COMMIT)[[:space:]]*:[[:space:]]*[^[:space:]]+' | sed -E 's/^[^:]+:[[:space:]]*//'); \
      [ -z \"\$p\" ] && continue; \
      echo \"\$staged\" | grep -Fxq \"\$p\" || { echo \"W327-C provenance-lint: APPLIED claim for '\$p' but file not staged\" >&2; bad=1; }; \
    done <<< \"\$msg\"; \
    [ \$bad -eq 0 ] || exit 2; \
  ;; \
esac; \
exit 0"
```

**Pros**:
- **CR-2 canonical compliance** — direct-CLI invocation (`bash`, `jq`, `grep`, `git`), no project-owned script body.
- Reuses existing PreToolUse:Bash block (already has gitleaks + trivy + revert-guard chain).
- No new file artifact; settings.json is single source of truth.
- Sub-500B if compressed.
- Mirrors W317-A Δ34 lint pattern (proven CR-2-compliant precedent).

**Cons**:
- Inline-bash multiline escape-quoting is fragile (every `"` and `'` needs escaping in JSON-string + bash here-doc).
- **settings.json size cap** — pre-W327 = 15,998 bytes (W326 Stream A F1 final). +~500B inline = 16,498B → exceeds W317-A 15,360B cap by ~1,138B. Requires trim-or-restore strategy.
- VERIFIED-ALREADY-APPLIED branch with SHA-validation (`git cat-file -t` + `git show --name-only`) doubles the inline-bash size budget; cannot fit under 500B if both branches included.
- Limited to APPLIED-only check if size budget = 500B (no SHA-verify); both checks if budget = 800-900B (cap-blown).

**Verdict A**: **VIABLE for APPLIED-only single-branch lint @ ≤ 500B**. Settings.json size MUST be re-trimmed pre-add OR W317-A cap relaxed to 16,500B with cite to body-size growth in W326-D-3 anti-bias mitigation pattern.

---

## Option B — `.claude/hooks/<name>.mjs` shim ≤ 2KB (sanctioned-exception path)

**Form**: new file at `.claude/hooks/git-provenance-lint.mjs`; settings.json PreToolUse:Bash invokes `node Z:/.../git-provenance-lint.mjs`.

**Cardinal-rule-2 exception path**: per CLAUDE.md R2 — "documented bug-patch shims cite-anchored to a specific `anthropics/claude-code` GitHub issue and ≤2 KB". 

**Pros**:
- Pure Node.js — robust parsing of commit-message body via JS regex (no bash escape hell).
- Full APPLIED + VERIFIED-ALREADY-APPLIED + SHA-verify in clean code under 2KB.
- Reusable testable surface (can be unit-tested with mock git diff output).
- Self-documenting via comments.

**Cons**:
- **CR-2 exception path requires a cite-anchored GitHub issue** — current sanctioned shim cites `anthropics/claude-code#46915` for `context-mode-cache-heal.mjs`. **There is no equivalent open GitHub issue for provenance-lint specifically**. The cardinal rule does not allow a shim added without a cited GitHub issue.
- **The "documented bug-patch shim" exception is for bugs in upstream Claude Code, NOT for project-specific workflow gates**. Provenance-lint is workflow-discipline, not a Claude Code bug fix → does NOT qualify for R2 exception.
- Adds a project-owned file outside the sanctioned-exception envelope → cardinal-rule-2 violation if shipped.

**Verdict B**: **DOES NOT QUALIFY for CR-2 exception**. Provenance-lint is not a bug-patch for an Anthropic-published bug; it is a project-workflow gate. Skip.

---

## Option C — `.pre-commit-config.yaml` local hook (commit-msg stage)

**Form**: append a new `local` hook to existing `.pre-commit-config.yaml`, stage `commit-msg`, similar to existing W317-D commitlint entry (L53-66).

**Cardinal-rule context**: pre-commit framework hooks live in `.pre-commit-config.yaml` (a tracked, conventional, framework-canonical file). NOT under `.claude/hooks/**`. NOT a project-owned hook body subject to CR-2.

**Sketch** (added to existing `repos: - repo: local` section):

```yaml
  - repo: local
    hooks:
      # W317-D commitlint (already present, do not modify)
      - id: commitlint
        ...
      # W327-C provenance-lint (new)
      - id: provenance-lint
        name: provenance-lint (W327-C)
        entry: bash -c '
          msg=$(cat .git/COMMIT_EDITMSG);
          staged=$(git diff --staged --name-only);
          bad=0;
          while IFS= read -r line; do
            p=$(echo "$line" | grep -oE -- "APPLIED( THIS COMMIT)?:[[:space:]]*[^[:space:]]+" | sed -E "s/^[^:]+:[[:space:]]*//");
            [ -z "$p" ] && continue;
            echo "$staged" | grep -Fxq "$p" || { echo "W327-C: APPLIED claim for $p but file not staged" >&2; bad=1; };
          done <<< "$msg";
          sha_lines=$(echo "$msg" | grep -oE "VERIFIED-ALREADY-APPLIED \\([0-9a-f]{7,40}\\):[[:space:]]*[^[:space:]]+");
          while IFS= read -r line; do
            [ -z "$line" ] && continue;
            sha=$(echo "$line" | grep -oE "[0-9a-f]{7,40}");
            file=$(echo "$line" | sed -E "s/.*:[[:space:]]*//");
            [ "$(git cat-file -t $sha 2>/dev/null)" = "commit" ] || { echo "W327-C: VERIFIED SHA $sha invalid" >&2; bad=1; continue; };
            git show --name-only --pretty=format: $sha | grep -Fxq "$file" || { echo "W327-C: SHA $sha did not touch $file" >&2; bad=1; };
          done <<< "$sha_lines";
          [ $bad -eq 0 ] || exit 2;
          exit 0
        '
        language: system
        stages: [commit-msg]
        always_run: true
        pass_filenames: false
```

**Pros**:
- **Lives in conventional pre-commit framework** — standard tooling; no CR-2 violation (not under `.claude/hooks/**`).
- Full APPLIED + VERIFIED-ALREADY-APPLIED + SHA-verify in one bash heredoc, ~900B.
- Mirrors existing W317-D commitlint pattern (cite-anchored to `@commitlint/cli@20.5.3`).
- Triggers on `git commit` directly via pre-commit framework (not via Claude Code PreToolUse — works for ANY git commit, including operator-direct CLI usage in same worktree, not just CC-driven commits).
- Does NOT bloat settings.json (no cap pressure).
- Easier to test in isolation via `pre-commit run --hook-stage commit-msg provenance-lint --all-files`.

**Cons**:
- Pre-commit framework gate is **bypassable** via `git commit --no-verify` — but block-no-verify plugin (enabled at L257 of settings.json) addresses this via PreToolUse hook.
- Slightly slower than inline (forks bash subshell + reads `.git/COMMIT_EDITMSG`).
- Operator-direct CLI commits (rare in this workflow) ARE checked — but Claude Code-driven commits via Bash tool are checked TWICE if a redundant PreToolUse:Bash hook is also added. Choose one path.

**Verdict C**: **PREFERRED**. CR-2-compliant via framework idiom; full APPLIED + VERIFIED-ALREADY-APPLIED branches without size pressure; tested-pattern parity with W317-D commitlint.

---

## Decision Matrix

| Criterion | Option A | Option B | Option C |
|---|---|---|---|
| CR-2 compliance | direct-CLI inline ✓ | sanctioned-exception path ✗ (no anthropics/claude-code issue) | framework-canonical ✓ (not under `.claude/hooks/**`) |
| Both branches supported | partial (size-budget binds) | full | full |
| settings.json size impact | +400-700B (cap-blown) | +~100B (just node invocation) | 0 |
| Reuses existing pattern | W317-A Δ34 ✓ | context-mode-cache-heal-only | W317-D commitlint ✓ |
| Testable in isolation | hard | medium | easy (`pre-commit run`) |
| Bypass-safety | via Bash PreToolUse only | via Bash PreToolUse only | via pre-commit framework + block-no-verify plugin (defense-in-depth) |

## Recommendation

**Option C (`.pre-commit-config.yaml` local hook, commit-msg stage)**.

Rationale:
1. CR-2-compliant via framework idiom (NOT a `.claude/hooks/**` body).
2. No settings.json cap pressure.
3. Full APPLIED + VERIFIED-ALREADY-APPLIED + SHA-verify supported in ~900B heredoc.
4. Defense-in-depth with block-no-verify plugin.
5. Pattern parity with existing W317-D commitlint commit-msg-stage hook.

Final apply decision deferred to W327-C-5-APPLIED-OR-DOC-ONLY.md after test-plan dry-run (W327-C-4).
