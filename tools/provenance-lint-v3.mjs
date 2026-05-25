#!/usr/bin/env node
// tools/provenance-lint-v3.mjs — SKELETON ONLY (W331 Stream-GIT Item-E)
//
// v3 enhancements vs v2 (inline in .pre-commit-config.yaml L102-112):
//   - Subject-line APPLIED: <path> + git-trailer footer-only (NEVER body prose)
//   - --safe-edit doc-only flow (docs/**/*.md + tmp/** bypass)
//   - Out-of-line (this file) instead of YAML-embedded bash one-liner
//
// Cite anchors:
//   - Conventional Commits 1.0.0 §11 footer/trailer spec
//     https://www.conventionalcommits.org/en/v1.0.0/
//   - RFC-2822 trailer format (Key: Value)
//     https://datatracker.ietf.org/doc/html/rfc2822
//   - git interpret-trailers canonical parser
//     https://git-scm.com/docs/git-interpret-trailers
//   - W329 race-4 retrospective (content-loss class)
//   - CLAUDE.md L19 operator-mandate quote
//
// USAGE
//   node tools/provenance-lint-v3.mjs [--safe-edit] [--commit-msg-path <path>] [--advisory]
//
// EXIT CODES
//   0 — PASS (no violations OR advisory mode)
//   2 — BLOCK (violations + non-advisory mode)
//
// NOT-YET-IMPLEMENTED — Phase-0 skeleton; do NOT swap v2 in .pre-commit-config.yaml.
// Migration plan in docs/architecture/W331-SOTA-GIT-PRACTICE/ITEM-E-PROVENANCE-LINT-V3.md.

import { readFileSync, existsSync } from 'node:fs';
import { execSync } from 'node:child_process';

// ----- argv parse (no external deps) -----
const argv = process.argv.slice(2);
const opts = {
  safeEdit: argv.includes('--safe-edit'),
  advisory: argv.includes('--advisory'),
  commitMsgPath: '.git/COMMIT_EDITMSG',
};
const idx = argv.indexOf('--commit-msg-path');
if (idx >= 0 && argv[idx + 1]) opts.commitMsgPath = argv[idx + 1];

// ----- read commit message + staged files -----
function readMsg() {
  if (!existsSync(opts.commitMsgPath)) {
    console.error(`provenance-lint-v3: commit-msg file not found: ${opts.commitMsgPath}`);
    process.exit(opts.advisory ? 0 : 2);
  }
  return readFileSync(opts.commitMsgPath, 'utf8');
}

function readStaged() {
  try {
    const out = execSync('git diff --staged --name-only', { encoding: 'utf8' });
    return out.split('\n').filter(Boolean);
  } catch {
    return [];
  }
}

// ----- doc-only fast-path predicate (W329 race-4 prevention) -----
function isDocOnlyStaged(stagedFiles) {
  if (stagedFiles.length === 0) return false;
  return stagedFiles.every(f => {
    if (f.startsWith('docs/') && f.endsWith('.md')) return true;
    if (f.startsWith('tmp/')) return true;
    return false;
  });
}

// ----- claim extraction: subject + git-trailers ONLY -----
function extractClaims(msg) {
  const lines = msg.split('\n');
  const claims = []; // { kind, path, line }

  // Subject line (first non-empty line)
  const subject = lines.find(l => l.trim().length > 0) || '';
  const subjMatch = subject.match(/^[^:]*APPLIED:\s+(\S+)/);
  if (subjMatch) claims.push({ kind: 'subject', path: subjMatch[1], line: subject });

  // Find trailer block: contiguous trailing lines matching Key: Value (RFC-2822-style)
  // Walk from end backwards until empty line; only that block counts as trailers.
  let i = lines.length - 1;
  while (i >= 0 && lines[i].trim() === '') i--; // skip trailing blanks
  const trailers = [];
  while (i >= 0 && lines[i].trim() !== '') {
    const trailerMatch = lines[i].match(/^([A-Za-z][A-Za-z0-9-]*)\s*:\s*(.+)$/);
    if (trailerMatch) trailers.unshift({ key: trailerMatch[1], value: trailerMatch[2].trim(), raw: lines[i] });
    else break; // trailer block must be contiguous Key: Value
    i--;
  }

  for (const t of trailers) {
    if (t.key === 'APPLIED' || t.key === 'Applied') {
      claims.push({ kind: 'trailer-applied', path: t.value, line: t.raw });
    } else if (t.key === 'Verified-By-SHA') {
      // form: <sha>:<path>
      const m = t.value.match(/^([0-9a-f]{7,40}):(.+)$/);
      if (m) claims.push({ kind: 'verified-sha', sha: m[1], path: m[2], line: t.raw });
      else claims.push({ kind: 'invalid-verified-sha', raw: t.value, line: t.raw });
    }
  }

  return claims;
}

// ----- verify claims against staged + git history -----
function verifyClaim(claim, stagedFiles) {
  if (claim.kind === 'subject' || claim.kind === 'trailer-applied') {
    if (stagedFiles.includes(claim.path)) return { ok: true };
    // endsWith fallback (v2 compat)
    if (stagedFiles.some(f => f.endsWith('/' + claim.path) || f.endsWith(claim.path))) {
      return { ok: true, note: 'endsWith-match' };
    }
    return { ok: false, reason: `path not in staged set: ${claim.path}` };
  }
  if (claim.kind === 'verified-sha') {
    try {
      const t = execSync(`git cat-file -t ${claim.sha}`, { encoding: 'utf8' }).trim();
      if (t !== 'commit') return { ok: false, reason: `SHA ${claim.sha} not a commit` };
      const files = execSync(`git show --name-only --pretty=format: ${claim.sha}`, { encoding: 'utf8' })
        .split('\n').filter(Boolean);
      if (!files.includes(claim.path)) return { ok: false, reason: `SHA ${claim.sha} did not touch ${claim.path}` };
      return { ok: true };
    } catch (e) {
      return { ok: false, reason: `SHA ${claim.sha} invalid: ${e.message}` };
    }
  }
  if (claim.kind === 'invalid-verified-sha') {
    return { ok: false, reason: `malformed Verified-By-SHA value: ${claim.raw}` };
  }
  return { ok: true };
}

// ----- main -----
function main() {
  const msg = readMsg();
  const staged = readStaged();
  const fastPath = opts.safeEdit && isDocOnlyStaged(staged);
  const claims = extractClaims(msg);

  if (claims.length === 0) {
    // No claims = nothing to verify
    process.exit(0);
  }

  const violations = [];
  for (const c of claims) {
    const v = verifyClaim(c, staged);
    if (!v.ok) violations.push({ claim: c, reason: v.reason });
  }

  if (violations.length === 0) {
    if (fastPath) console.error('provenance-lint-v3: fast-path doc-only mode — PASS');
    process.exit(0);
  }

  console.error('W331-Item-E provenance-lint-v3: BLOCK');
  for (const v of violations) {
    console.error(`  ${v.reason} [${v.claim.line}]`);
  }
  process.exit(opts.advisory ? 0 : 2);
}

main();
