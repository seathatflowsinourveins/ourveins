#!/usr/bin/env node
// catalog-diff.mjs — W352 S10 — wave-over-wave catalog delta
// Usage: node tools/catalog-diff.mjs <git-ref-A> <git-ref-B>
import { execSync } from 'node:child_process';

const [, , refA, refB] = process.argv;
if (!refA || !refB) {
  console.error('usage: catalog-diff.mjs <ref-A> <ref-B>');
  process.exit(2);
}
const PATH = 'docs/architecture/W259-grand-catalog/catalog.yaml';
let a, b;
try { a = execSync(`git show ${refA}:${PATH}`, { encoding: 'utf8' }); } catch { console.error(`ref ${refA} missing catalog.yaml`); process.exit(3); }
try { b = execSync(`git show ${refB}:${PATH}`, { encoding: 'utf8' }); } catch { console.error(`ref ${refB} missing catalog.yaml`); process.exit(3); }

if (a === b) {
  console.log(`NO DELTA between ${refA} and ${refB}`);
  process.exit(0);
}
console.log(`catalog.yaml changed between ${refA} and ${refB}:`);
console.log(execSync(`git diff ${refA} ${refB} -- ${PATH}`, { encoding: 'utf8' }));
