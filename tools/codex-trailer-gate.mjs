#!/usr/bin/env node
// codex-trailer-gate.mjs — commit-msg stage hook enforcing Codex-Verdict trailer
//
// W335 P0 closure (codex GPT-5.5 e2e adversarial review 2026-05-20 BLOCK on Gate 3):
// "no `Codex-Verdict` commit-msg hook... commit lacks the required Codex-Verdict
//  trailer... Anthropic hook semantics are Stop/session lifecycle, not git commit-msg
//  enforcement."
//
// Per https://git-scm.com/docs/githooks#_commit_msg + .pre-commit-config.yaml
// commit-msg stage semantics: pre-commit passes COMMIT_EDITMSG path as $1.
//
// Enforcement rule: commit message MUST contain a line matching:
//   /^Codex-Verdict:\s*(APPROVE|BOOTSTRAP)\s*$/m
//
// Trailer values:
//   APPROVE   — codex GPT-5.5 reviewed this diff and returned APPROVE
//   BOOTSTRAP — initial commit of the gate itself (single one-time use; document why)
//
// W416 merge-commit filter (2026-05-24): SKIP for merge commits. Rationale: under the
// ruleset `allowed_merge_methods: ["squash"]` + `required_linear_history: true`, merge
// commits in the PR branch are FLATTENED on merge and never land on `main`. The PR-body
// trailer check in `codex-verdict-gate.yml` (which is the squash commit message that
// lands on `main`) remains the binding gate. Cite: T6 basic-memory note
// `main/learnings/w402-w403-strict-policy-update-branch-lesson-force-rebase-fix` +
// `docs/architecture/W416-MERGE-COMMIT-FILTER/DESIGN.md`.
//
// To bypass for emergency: set env CODEX_TRAILER_GATE_DISABLE=1 (operator-only,
// equivalent to CR-5 condition-(b) sanctioned escape hatch per CLAUDE.md L24).
//
// Exit code 0 = trailer found + valid OR merge commit skipped; exit 2 = blocking.
//
// Cite (3-org-distinct anchors):
// 1. Git Project — https://git-scm.com/docs/githooks#_commit_msg (commit-msg stage spec)
// 2. pre-commit.com — https://pre-commit.com/#commit-msg-stage-hooks (commit-msg stage)
// 3. Anthropic — https://docs.anthropic.com/en/docs/claude-code/sub-agents (codex cross-model gate)
//
// Adversarial review trail: tmp/W335-audit/W335-e2e-codex-review.txt (W335 codex BLOCK 2026-05-20).

import { readFileSync, existsSync } from 'node:fs';
import { execSync } from 'node:child_process';

const ESCAPE_HATCH = process.env.CODEX_TRAILER_GATE_DISABLE === '1';
if (ESCAPE_HATCH) {
  process.stderr.write('[codex-trailer-gate] BYPASS via CODEX_TRAILER_GATE_DISABLE=1 (operator escape hatch)\n');
  process.exit(0);
}

const msgPath = process.argv[2];
if (!msgPath) {
  process.stderr.write('[codex-trailer-gate] FATAL: commit-msg path not provided as argv[2]\n');
  process.exit(2);
}

let msg;
try {
  msg = readFileSync(msgPath, 'utf8');
} catch (err) {
  process.stderr.write(`[codex-trailer-gate] FATAL: cannot read commit-msg at ${msgPath}: ${err.message}\n`);
  process.exit(2);
}

// W416 merge-commit detection (refined post-codex-r1+r2) — heuristic-only at this layer.
//
// THE LOCAL HOOK IS NOT A SECURITY BOUNDARY. It is a developer-experience optimization preventing
// operator-friction during legitimate update-branch merges. The BINDING gate is the CI workflow
// `codex-verdict-gate.yml`, which uses parent-aware classification + tree-identity verification
// against `git merge-tree --write-tree` (codex r1 + r2 closure).
//
// At commit-msg stage we cannot easily verify the merge tree (the commit object isn't written yet),
// so we use two heuristics:
//   PRIMARY: $GIT_DIR/MERGE_HEAD exists → topologically check if MERGE_HEAD is ancestor of origin/main.
//            If yes → SKIP. If no → fall through to trailer check (content-bearing merge).
//   FALLBACK: first-line subject regex matches `Merge ...` → SKIP (CI will topologically + tree-verify).
//
// Cite: W416 codex r1 P1#1 + r2 P1#1+P1#2 closure; W416 DESIGN.md §4.1.
function detectMergeCommit(rawMsg, msgFilePath) {
  let gitDir = '';
  try {
    gitDir = execSync('git rev-parse --git-dir', { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  } catch {
    // Best-effort
  }

  // Signal 2 PRIMARY: MERGE_HEAD presence + parent classification
  if (gitDir && existsSync(`${gitDir}/MERGE_HEAD`)) {
    let mergeHead = '';
    try {
      mergeHead = readFileSync(`${gitDir}/MERGE_HEAD`, 'utf8').trim().split('\n')[0] || '';
    } catch {
      // fall through to subject heuristic
    }
    if (mergeHead) {
      // Try to classify: noise-merge if MERGE_HEAD reachable from origin/main.
      try {
        execSync(`git merge-base --is-ancestor ${mergeHead} origin/main`, { stdio: ['ignore', 'ignore', 'ignore'] });
        return { isMerge: true, signal: `MERGE_HEAD=${mergeHead.slice(0, 8)} ancestor-of-origin/main (noise-merge)` };
      } catch {
        // Not an ancestor → content-bearing merge; do NOT skip
        return { isMerge: false, signal: `MERGE_HEAD=${mergeHead.slice(0, 8)} NOT ancestor-of-origin/main (content-bearing — trailer required)` };
      }
    }
    // Couldn't read MERGE_HEAD content but it exists → fall back to subject heuristic
    return { isMerge: true, signal: 'MERGE_HEAD (existence only)' };
  }

  // Signal 1 FALLBACK: subject-line match (heuristic; CI is the binding gate)
  // Git generates merge subjects with these prefixes (verified against git source builtin/merge.c):
  //   `Merge branch '...'`, `Merge remote-tracking branch '...'`, `Merge tag '...'`,
  //   `Merge pull request #...`, `Merge commit '...'`
  const firstLine = rawMsg
    .split('\n')
    .filter((l) => !l.startsWith('#') && l.trim().length > 0)
    .shift() || '';
  const subjectRe = /^Merge (branch|remote-tracking branch|tag|pull request|commit) /;
  if (subjectRe.test(firstLine)) {
    return { isMerge: true, signal: `subject-heuristic="${firstLine.slice(0, 80)}" (no MERGE_HEAD; CI will topologically verify)` };
  }

  return { isMerge: false };
}

// Strip comment-lines (git ignores them; we should too)
const stripped = msg.split('\n').filter((l) => !l.startsWith('#')).join('\n');

const mergeDetect = detectMergeCommit(msg, msgPath);
if (mergeDetect.isMerge) {
  process.stderr.write(`[codex-trailer-gate] SKIP: merge commit detected (signal=${mergeDetect.signal}) — gate handled by codex-verdict-gate.yml PR-body check on squash message. Cite: W416 DESIGN.md §3.\n`);
  process.exit(0);
}

// Match trailer (must appear in trailer section per https://git-scm.com/docs/git-interpret-trailers)
const trailerRe = /^Codex-Verdict:\s*(APPROVE|BOOTSTRAP)\s*$/m;
const match = stripped.match(trailerRe);

if (!match) {
  process.stderr.write(`
[codex-trailer-gate] BLOCK: commit-msg lacks required \`Codex-Verdict: <APPROVE|BOOTSTRAP>\` trailer

W335 mandate (closed via codex GPT-5.5 e2e review 2026-05-20):
  Every commit must carry a Codex-Verdict trailer. To add:

    1. Fire codex review BEFORE commit:
       node "<CLAUDE_PLUGIN_ROOT>/openai-codex/codex/<version>/scripts/codex-companion.mjs" task --effort high "<your-prompt>"

    2. If codex returns APPROVE, append trailer to commit message:
       Codex-Verdict: APPROVE

    3. For initial bootstrap commits (this gate itself + first uses):
       Codex-Verdict: BOOTSTRAP

  Emergency bypass (operator-only): set env CODEX_TRAILER_GATE_DISABLE=1

Anchors:
  https://git-scm.com/docs/githooks (commit-msg stage)
  https://git-scm.com/docs/git-interpret-trailers (trailer format)
  tmp/W335-audit/W335-e2e-codex-review.txt (this gate's adversarial-review provenance)
\n`);
  process.exit(2);
}

process.stderr.write(`[codex-trailer-gate] PASS: ${match[0]}\n`);
process.exit(0);
