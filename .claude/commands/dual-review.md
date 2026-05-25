---
name: dual-review
description: "Use when the operator says 'dual-review', 'cross-model review', 'gpt5 review', 'santa-loop with gpt5', 'adversarial review' — runs adversarial cross-model code review via GPT-5.5 routed through the OpenAI Codex CLI plugin. Preserves the Codex-unavailable fail-closed BLOCK contract: if codex is plugin-missing / auth-expired / rate-limited / quota-exhausted / network-down / unknown-error, returns VERDICT: BLOCK rather than silently passing."
argument-hint: "[--wait] [--commit <SHA>] [--base <BRANCH>] [--uncommitted]"
license: MIT
---

# dual-review — santa-loop cross-model adversarial review

W285b replacement for the deleted `.claude/agents/gpt5-reviewer.md`. Wraps the
`/codex:review` + `/codex:adversarial-review` slash commands with an explicit
**fail-closed contract** that the bare codex commands don't enforce — when codex
is unavailable for any reason, the wrapper MUST emit `VERDICT: BLOCK` so a
session-end Stop gate never silently passes a turn that should have been
adversarially reviewed.

## When to use

- After non-trivial diffs (>50 LOC) ship.
- Before merging high-blast-radius changes.
- When the operator requests "dual-review", "cross-model review", "santa-loop",
  or "adversarial review".

## When to SKIP (frontmatter trigger explicitly excludes)

- Trivial typo / format / rename fixes.
- Pure doc-only edits.

**Codex unavailable is NEVER a SKIP condition.** If codex is missing, the
fail-closed contract below applies.

## Process

1. Determine the diff scope from CLI args:
   - `--commit <SHA>` → review that one commit
   - `--base <BRANCH>` → review HEAD vs BRANCH
   - `--uncommitted` → review staged + unstaged + untracked
   - default (no args) → review `HEAD~1..HEAD`

2. Run the codex review subprocess:
   ```
   codex exec review [--commit <SHA> | --base <BRANCH> | --uncommitted] \
     --dangerously-bypass-approvals-and-sandbox
   ```
   Capture stdout to `tmp/codex-dual-review-<SHA>.log`. Use `--wait` mode if the
   operator passed it (blocks until codex finishes); otherwise dispatch in
   background and emit the task ID for later attach.

3. Parse the codex output for a verdict marker:
   - `ALLOW:` — codex APPROVE; emit `VERDICT: ALLOW` + summary.
   - `BLOCK:` — codex BLOCK; emit `VERDICT: BLOCK severity=<level> confidence=<x>` + reason.
   - No verdict marker but exit 0 — emit `VERDICT: PASS-WITH-CAVEAT` and quote codex's last 30 lines (matches W284b/W285a observed pattern where codex exits cleanly after diff inspection without rendering the verdict line).
   - Non-zero exit OR codex-unavailable — fail-closed contract below.

## Codex unavailable — fail-closed contract (ported verbatim from gpt5-reviewer.md §"Codex unavailable")

When invoked under codex CLI unavailability (plugin-not-installed / auth-expired /
rate-limited / quota-exhausted / network-down / unknown-error), this wrapper
MUST return a blocking verdict — silently passing the turn defeats the purpose of
the cross-model gate.

Required behavior:

1. Return verdict `VERDICT: BLOCK — Codex unavailable: <cause>` where `<cause>`
   is one of `plugin-missing` / `auth-expired` / `rate-limited` /
   `quota-exhausted` / `network-down` / `unknown-error`.
2. Surface the cause-string to stderr so it is visible in the operator transcript.
3. Do NOT proceed to merge / ship.
4. The operator can re-run after resolving the codex availability issue
   (e.g. `claude plugin update codex@openai-codex`, refresh auth, wait for
   rate-limit reset, change network).

This fail-closed contract is the OPERATIONAL location for codex-unavailable
handling. The frontmatter `description` SKIP clause governs only whether to
invoke this command at all; once invoked, the fail-closed contract applies.

## Cross-references

- `openai-codex:commands/review.md` — bare review primitive (no fail-closed).
- `openai-codex:commands/adversarial-review.md` — adversarial-review primitive.
- `openai-codex:agents/codex-rescue.md` — codex subagent shape (alternative invocation path).
- `https://openai.com/index/introducing-gpt-5-5/` — GPT-5.5 official release (82.7% Terminal-Bench 2.0, 58.6% SWE-Bench Pro per release page 2026-04-23).
- W285 audit at `docs/architecture/W285-LOCAL-AGENTS-AUDIT-2026-05-18.md` — provenance for this wrapper (replaces deprecated `gpt5-reviewer.md`).
- W285 citations at `docs/architecture/W285-deprecated-agents-citations.md` — full TIER-1 cite trail preserved.
