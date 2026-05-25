#!/usr/bin/env node
// W388 Phase-0a — CI-closure manifest / minimal-core seed allowlist generator.
// Computes the minimal set of TRACKED files to ship in the public orphan-export seed:
//   allowlist = (design §2 CORE patterns) ∪ (local files referenced by CI workflows /
//   .pre-commit-config / package.json scripts), restricted to currently-tracked files.
// Also reports REFERENCED-BUT-MISSING files (the CI-closure gap codex W388 r1#6 — a
// referenced-but-absent file would break the seed's CI). Read-only; emits seed-allowlist.txt.
// Usage: node tools/sota-seed/build-seed-allowlist.mjs [--out <path>]
import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const OUT = (() => { const i = process.argv.indexOf('--out'); return i > -1 ? process.argv[i + 1] : 'docs/architecture/W388-MINIMAL-SHIP/seed-allowlist.txt'; })();

// design §2 CORE — anchored regexes over git-ls-files paths (forward-slash)
const CORE = [
  /^\.github\//,                                            // all workflows, CODEOWNERS, templates, dependabot, SECURITY
  /^CLAUDE\.md$/, /^\.mcp\.json$/, /^\.claude\/settings\.json$/,
  /^\.claude\/(state\/)?subagent-type-allowlist\.json$/,    // publishable allowlist (current OR target path)
  /^(\.claude\/)?schemas\//,
  /^\.claude\/skills\/(mem-recall|goal-prompt-synthesis|sota-convergence-audit|parallel-dispatch-mandate|dual-review|task-close-discipline)\//,
  /^\.pre-commit-config\.yaml$/, /^package(-lock)?\.json$/,
  /^(commitlint\.config\.(js|cjs|mjs)|\.commitlintrc(\..+)?|\.gitleaks\.toml|\.gitleaksignore|\.shellcheckrc|\.psscriptanalyzer\.psd1|\.release-please-config\.json|\.release-please-manifest\.json|\.markdownlint(\..+)?|\.vale\.ini|\.actionlint(\..+)?|tsconfig(\..+)?\.json|\.ruff\.toml|pyproject\.toml)$/,
  /^(README\.md|CHANGELOG\.md|AGENTS\.md|SECURITY\.md|CONTRIBUTING\.md|LICENSE([.-].+)?)$/,
  /^(\.gitignore|\.gitattributes|\.editorconfig|\.nvmrc|\.node-version)$/,
];
// EXCLUDE even if matched (high-risk / non-core roots)
const DENY = [/^\.claude\/state\/(?!subagent-type-allowlist\.json)/, /^tmp\//, /^docs\/architecture\/W\d/, /^docs\/outer research\//, /(^|\/)CLAUDE\.local/, /\.env(\.|$)/];

const tracked = execSync('git ls-files', { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }).split('\n').filter(Boolean);
const trackedSet = new Set(tracked);

// scan CI / pre-commit / package.json for referenced LOCAL scripts
const scanFiles = [
  ...tracked.filter((f) => f.startsWith('.github/workflows/')),
  '.pre-commit-config.yaml', 'package.json',
].filter((f) => existsSync(f));
const REF_RE = /(?:^|[^\w./-])((?:tools|harness|scripts|bin)\/[A-Za-z0-9._/-]+\.(?:mjs|cjs|js|ts|py|ps1|sh))/g;
const referenced = new Set();
for (const f of scanFiles) {
  const txt = readFileSync(f, 'utf8');
  let m; while ((m = REF_RE.exec(txt))) referenced.add(m[1]);
}

const isCore = (f) => CORE.some((re) => re.test(f)) && !DENY.some((re) => re.test(f));
const allow = new Set(tracked.filter(isCore));
const missing = [];
for (const r of referenced) { if (trackedSet.has(r) && !DENY.some((re) => re.test(r))) allow.add(r); else if (!trackedSet.has(r)) missing.push(r); }

const sorted = [...allow].sort();
writeFileSync(OUT, sorted.join('\n') + '\n');
console.log(`seed-allowlist: ${sorted.length} files -> ${OUT}`);
console.log(`  referenced local scripts found: ${referenced.size}`);
if (missing.length) { console.log(`  ⚠ REFERENCED-BUT-MISSING (closure gap — fix before seeding): ${missing.length}`); missing.slice(0, 20).forEach((f) => console.log(`    - ${f}`)); }
else console.log('  ✓ closure complete: every referenced local script is tracked');
