#!/usr/bin/env node
// precommit-cite-floor.mjs — W352 S9 — 3-org-distinct CI gate
// On staged docs/architecture/W*/*.md or VERDICT-LEDGER.md, extract
// citation tokens (github.com/<org>, arXiv:, https://<eTLD+1>);
// BLOCK if distinct_orgs < 3.
// Per citations-agent SKILL.md:42-66 + sca-v13 >=3-org floor (W332).

import { readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

const PATTERN = /docs\/architecture\/W\d+.*\.md$|VERDICT-LEDGER\.md$/;
const ORG_RE = /github\.com\/([\w-]+)/g;
const HTTPS_RE = /https?:\/\/([\w.-]+(?:\.[\w-]+)+)/g;
const ARXIV_RE = /arXiv:\s*(\d{4}\.\d{4,5})/g;

const staged = execSync('git diff --staged --name-only --diff-filter=AM', { encoding: 'utf8' })
  .split('\n').filter(f => PATTERN.test(f));

if (staged.length === 0) process.exit(0);

let bad = false;
for (const f of staged) {
  let body = '';
  try { body = readFileSync(f, 'utf8'); } catch { continue; }
  const orgs = new Set();
  let m;
  ORG_RE.lastIndex = 0;
  while ((m = ORG_RE.exec(body))) orgs.add(m[1].toLowerCase());
  HTTPS_RE.lastIndex = 0;
  while ((m = HTTPS_RE.exec(body))) {
    const host = m[1].toLowerCase();
    const parts = host.split('.');
    if (parts.length >= 2) orgs.add(parts.slice(-2)[0]);
  }
  ARXIV_RE.lastIndex = 0;
  if (ARXIV_RE.test(body)) orgs.add('arxiv');

  const count = orgs.size;
  if (count < 3) {
    process.stderr.write(`W352-S9 BLOCK: ${f} has ${count} distinct citation orgs (>=3 required per sca-v13 floor)\n`);
    process.stderr.write(`  orgs found: ${[...orgs].join(', ') || '<none>'}\n`);
    bad = true;
  }
}

process.exit(bad ? 2 : 0);
