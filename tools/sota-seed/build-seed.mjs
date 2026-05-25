#!/usr/bin/env node
// W388 Phase-1 — clean-seed DRY-RUN builder + scrub + pre-publish secret gate.
// Copies the seed-allowlist files into a seed dir, SCRUBS operator-private filesystem paths
// into portable placeholders (the design §5 scrub step; these are non-secret but non-portable
// + expose the operator's layout), then runs the AUTONOMOUS gate: gitleaks (using the repo's
// .gitleaks.toml so the sourcegraph-token-vs-SHA-pin false-positive class is allowlisted —
// W381 Stream A) + deterministic DENY rules for REAL secrets. Localhost endpoints are ADVISORY
// (generic local-dev, not a leak). DRY-RUN ONLY: no orphan git, no push. Real publish + the
// 3rd tool (ggshield) + operator eyeball = operator-gated Phase 2.
// Usage: node tools/sota-seed/build-seed.mjs
import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, rmSync, existsSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';

const ALLOWLIST = 'docs/architecture/W388-MINIMAL-SHIP/seed-allowlist.txt';
const SEED = process.env.SEED_DIR || 'Z:/claude-sota-installed-state/W388-seed-dryrun';
const REPORT = 'Z:/claude-sota-installed-state/W388-seed-gitleaks.json';

// SCRUB — operator-private paths -> portable placeholders (longest-match first). Non-secret hygiene.
const SCRUB = [
  [/Z:[\\/]claude-sota-installed-state/gi, '${STATE_ROOT}'],
  [/Z:[\\/]claude-sota-installed/gi, '${REPO_ROOT}'],
  [/Z:[\\/]claude-sota-pure/gi, '${SIBLING_ROOT}'],
  [/Z:[\\/]claude-sota/gi, '${SIBLING_ROOT}'],
  [/Z:[\\/]claude/gi, '${LOCAL_ROOT}'],
];
// BLOCKING deny — REAL secrets only.
const DENY = [
  { re: /\b(?:sk-ant-|sk-proj-|ghp_|github_pat_|pk-lf-|sk-lf-|AKIA|xox[baprs]-)[A-Za-z0-9_\-]{10,}/, what: 'known API/PAT/OAuth key' },
  { re: /-----BEGIN [A-Z ]*PRIVATE KEY-----/, what: 'private key block' },
  { re: /\b[A-Z][A-Z0-9_]*(?:TOKEN|SECRET|PASSWORD|APIKEY|API_KEY)\b\s*[=:]\s*["'][A-Za-z0-9_\-./+]{16,}["']/, what: 'literal quoted secret assignment' },
];
// ADVISORY (report, don't block).
const ADVISORY = [
  { re: /(?:127\.0\.0\.1|localhost):\d{2,5}/, what: 'localhost endpoint (generic; ok for public template)' },
  { re: /\$\{(?:REPO|STATE|SIBLING|LOCAL)_ROOT\}/, what: 'templated path placeholder (scrubbed — informational)' },
];

if (existsSync(SEED)) rmSync(SEED, { recursive: true, force: true });
const files = readFileSync(ALLOWLIST, 'utf8').split('\n').filter(Boolean);
let copied = 0, scrubbed = 0;
for (const f of files) {
  if (!existsSync(f)) continue;
  const dst = join(SEED, f); mkdirSync(dirname(dst), { recursive: true });
  let bin = false; try { const buf = readFileSync(f); bin = buf.includes(0); } catch {}
  if (bin) { copyFileSync(f, dst); copied++; continue; }
  let t = readFileSync(f, 'utf8'); const orig = t;
  for (const [re, rep] of SCRUB) t = t.replace(re, rep);
  writeFileSync(dst, t); copied++; if (t !== orig) scrubbed++;
}
console.log(`seed: ${copied}/${files.length} files -> ${SEED} (scrubbed private paths in ${scrubbed})`);

let gl = '?', glFP = 0;
const cfg = join(SEED, '.gitleaks.toml');
const cfgArg = existsSync(cfg) ? `--config "${cfg}"` : '';
try {
  execSync(`gitleaks dir "${SEED}" ${cfgArg} --no-banner --report-format json --report-path "${REPORT}" --exit-code 0`, { stdio: 'pipe' });
  const r = JSON.parse(readFileSync(REPORT, 'utf8') || '[]');
  // Suppress the DOCUMENTED W381 false-positive class: the `sourcegraph-access-token` rule
  // matching bare 40-hex git-SHA action pins in workflow files. The repo has NO Sourcegraph
  // integration; .gitleaks.toml records this FP (it is suppressed in the seed's real CI via
  // gitleaks-action's allowlist). Suppressing here so the dry-run VERDICT reflects reality.
  const all = Array.isArray(r) ? r : [];
  const real = all.filter((x) => !(x.RuleID === 'sourcegraph-access-token' && /\.github[\\/]workflows[\\/]/.test(String(x.File || ''))));
  gl = real.length; glFP = all.length - gl;
} catch (e) { gl = 'ERROR:' + String(e.message || '').slice(0, 60); }
console.log(`gitleaks: ${gl} real finding(s)${glFP ? ` (+${glFP} known W381 SHA-pin FP suppressed)` : ''}`);

const denyHits = {}, advHits = {};
for (const f of files) { const p = join(SEED, f); if (!existsSync(p) || statSync(p).isDirectory()) continue; let t; try { t = readFileSync(p, 'utf8'); } catch { continue; }
  for (const d of DENY) if (d.re.test(t)) (denyHits[f] ||= new Set()).add(d.what);
  for (const a of ADVISORY) if (a.re.test(t)) (advHits[f] ||= new Set()).add(a.what); }
const denyN = Object.values(denyHits).reduce((s, x) => s + x.size, 0);
console.log(`deny-rules (BLOCKING real-secret): ${denyN} hit(s)`); for (const [f, w] of Object.entries(denyHits)) console.log(`  ✗ ${f}: ${[...w].join('; ')}`);
console.log(`advisory (non-blocking): ${Object.keys(advHits).length} file(s) w/ localhost/placeholders`);

const ready = (gl === 0) && denyN === 0;
console.log(ready
  ? '\nVERDICT: dry-run CLEAN — minimal core is secret-clean + path-scrubbed. Phase-2 operator still adds trufflehog + ggshield + manual eyeball before the real orphan push.'
  : `\nVERDICT: NOT-clean — ${gl} gitleaks + ${denyN} real-secret deny hits remain; resolve before publish.`);
process.exit(0);
