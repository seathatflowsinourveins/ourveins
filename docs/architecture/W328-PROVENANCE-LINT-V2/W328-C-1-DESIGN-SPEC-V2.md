# W328-C-1 — provenance-lint v2 design spec

**Wave**: W328 Stream C
**Date**: 2026-05-19
**Status**: SHIPPED (smoke 5/5 + neg-control 1/1 PASS)
**Supersedes**: `docs/architecture/W327-PROVENANCE-LINT/W327-C-1-DESIGN-SPEC.md` (v1, colon-prefix-only)
**Trigger**: codex round-1-r2-r3 carry-over on `d6087ec` — narrow-regex finding (see `tmp/w328-c/msg-6ee7ea4.txt` lines 3-12, also commit `6ee7ea4` body)

---

## 1. Problem (v1 narrow-regex carry-over)

v1 hook (commit `d6087ec`, `.pre-commit-config.yaml:79-88`) matched only the colon-prefix claim form:

```
APPLIED( THIS COMMIT)?:\s+\S+
```

and used `grep -Fxq` (exact-fixed-string match) against `git diff --staged --name-only`. This narrow surface failed against two historical races:

- **W320 race** (commit `5cac3ec` line 37): `APPLIED settings.json:154` (NO colon after `APPLIED`).
- **W326 race** (commit `670423d` line 10): `APPLIED: settings.json:206` while the staged path was `.claude/settings.json` (path-prefix mismatch + line-number suffix `:206`).

Both would have evaded v1; codex round-1-r2 measured `replay coverage = 0/2 historical races caught`.

W327-codex-r1 closure (commit `6ee7ea4` lines 47-50) additionally surfaced a **prose-mode self-trigger** failure: the v1 hook regex literally matched the token `APPLIED:` inside body prose discussing the hook itself, blocking the W327 closure commit until prose was reworded.

## 2. v2 fix surface (claim shapes)

| ID | Shape | Example | Source wave |
|----|-------|---------|-------------|
| F1 | `APPLIED: <path>` | `APPLIED: settings.json:206` | W326 + W327 (current canonical) |
| F2 | `APPLIED THIS COMMIT: <path>` | `APPLIED THIS COMMIT: foo.md` | W327 (current canonical) |
| F3 | `APPLIED <path>` (no-colon) | `APPLIED settings.json:154` | W320 |
| F4 | `APPLIED to <path>` | `APPLIED to .claude/settings.json` | speculative, defense-in-depth |
| F5 | `apply <verb> to <path>` | `apply fix to docs/x.md` | speculative descriptive |
| F6 | `VERIFIED-ALREADY-APPLIED (<sha>): <path>` | `VERIFIED-ALREADY-APPLIED (5cac3ec): foo.md` | W327 codex r1 recovery form (kept unchanged from v1) |

## 3. v2 fix surface (path normalization)

For every captured path token `P`:

1. **Strip trailing line-number suffix** — repeatable `(:\d+)+$` (handles `:206`, `:206:5`, etc.).
2. **Strip trailing punctuation** `[.,;:)]+$` (catches sentence-end punctuation after claim).
3. **Strip leading paren** `^\(` (handles `(docs/foo/)` claim wrappers).
4. **Reject pseudo-paths**: empty, section-anchors `§...`, or tokens with neither `.` nor `/` (e.g. paragraph-only references).
5. **Match strategy**:
   - (a) exact-line match against staged set (`grep -Fxq`), THEN
   - (b) endsWith fallback — any staged path matching `(^|/)<P>$` (regex; `P` escaped). Closes the `settings.json` vs `.claude/settings.json` mismatch surface.

## 4. v2 fix surface (prose-mode exclusion)

A line is treated as a **claim line** only if:
- (a) it is the commit subject (line 1), OR
- (b) it begins with a list-marker: `^[[:space:]]*([-*]|[0-9]+\.)[[:space:]]+`.

All other lines are **prose** and are not scanned for claim tokens. This closes the W327-self-trigger surface (prose paragraph discussing the hook regex). Rationale: structured commit-body claims by convention use bullet lists (Conventional Commits 1.0.0 + Linux kernel + Anthropic claude-code-best-practice). Subject + bullet lines cover 100% of historical claim instances inspected in W320/W326/W327 (`tmp/w328-c/msg-*.txt`).

## 5. v2 hook bash skeleton

The hook runs as a single inline `bash -c '...'` in `.pre-commit-config.yaml` at the `commit-msg` stage. Reference prototype: `tmp/w328-c/hook-v2-prototype.sh` (multi-line readable form; YAML-embedded copy is single-line equivalent).

Pseudocode:

```
msg  = cat .git/COMMIT_EDITMSG
stgd = git diff --staged --name-only

bad = 0
violations = []

# VERIFIED-ALREADY-APPLIED handler (unchanged from v1; whole-message scan)
for line in match_all(msg, /VERIFIED-ALREADY-APPLIED \(<sha>\):\s*\S+/):
  sha, file = parse(line)
  if not git_commit_exists(sha) or not git_show_touched(sha, file):
    bad = 1; record violation

# Per-line APPLIED claim scan (claim-line filter)
for n, line in enumerate(msg.lines, start=1):
  if n != 1 and not is_bullet(line): continue   # prose-mode exclusion
  for form in [F1, F2, F3, F4, F5]:
    p = extract(line, form)
    if p is None: continue
    p = normalize(p)              # strip :NN, punctuation, parens
    if not path_like(p): continue # reject §-anchors etc.
    if not staged_match(p, stgd): # exact OR endsWith
      bad = 1; record violation
    break

exit 2 if bad else 0
```

## 6. Cite anchors

- **Conventional Commits 1.0.0** — bullet-line claim surface convention (CC spec §6 trailers).
- **SLSA v1.0 build-provenance** — Linux Foundation OpenSSF; attestation-pre-merge pattern (`https://slsa.dev/spec/v1.0/provenance`).
- **GitHub commit-signature verification** — structural + identity binding (`https://docs.github.com/en/authentication/managing-commit-signature-verification`).
- **pre-commit `commit-msg` stage** — entry-point semantics + stage discipline (`https://pre-commit.com/#commit-msg`).
- Internal precedent: W327-C-1-DESIGN-SPEC.md (v1, this file supersedes).
- Internal carry-over: `tmp/w328-c/msg-6ee7ea4.txt` lines 3-12 (codex round-1 narrowing finding) + lines 47-50 (self-trigger note).

## 7. Cardinal-rule compliance

- **R1 trusted-source primitives**: pre-commit framework (community canonical) + git CLI + grep/sed (POSIX). All non-self-invented.
- **R2 hooks-discipline**: `.pre-commit-config.yaml` is the canonical pre-commit framework declaration file. Hook BODY is inline bash invoking direct CLIs (`cat`, `git`, `grep`, `sed`). **NO** new file under `.claude/hooks/**`. Compliant.
- **R3 subagents**: N/A.
- **R4 project-behavior surface**: `.pre-commit-config.yaml` is documented project surface; settings.json untouched.
- **R5 safety boundaries**: pre-commit framework enforcement, not custom guard scripts.

## 8. Out-of-scope (deferred to W329 if needed)

- HTML-tagged claim forms (e.g. `<applied path="x"/>`) — none observed in historical corpus.
- Multi-path claims on single line (e.g. `APPLIED: a.md, b.md`) — split-on-comma support could be added in v3.
- I18n claim tokens — current corpus is en-US only.
- GPG-signed claim attestation — orthogonal to text-grep regex; would require separate hook.
