#!/usr/bin/env node
// catalog-rebuild.mjs — W352 S10 — emit derived MASTER-SCORING-MATRIX
// Reads docs/architecture/W259-grand-catalog/catalog.yaml + emits
// MASTER-SCORING-MATRIX-derived.md sorted by slug.
import { readFileSync, writeFileSync } from 'node:fs';

const CAT = 'docs/architecture/W259-grand-catalog/catalog.yaml';
const OUT = 'docs/architecture/W259-grand-catalog/MASTER-SCORING-MATRIX-derived.md';

const txt = readFileSync(CAT, 'utf8');
const entries = [];
let cur = null;
for (const line of txt.split('\n')) {
  if (line.startsWith('  - slug:')) {
    if (cur) entries.push(cur);
    cur = { slug: line.split('slug:')[1].trim() };
  } else if (cur && /^\s{4}\w/.test(line)) {
    const idx = line.indexOf(':');
    if (idx > 0) cur[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
  }
}
if (cur) entries.push(cur);
entries.sort((a, b) => a.slug.localeCompare(b.slug));

let md = '# MASTER-SCORING-MATRIX-W259 (derived from catalog.yaml — W352 S10)\n\n';
md += 'Auto-generated. Source of truth: `catalog.yaml`. Do not edit by hand.\n\n';
md += '| slug | layer | role | scores | wave | cite |\n|---|---|---|---|---|---|\n';
for (const e of entries) {
  md += `| ${e.slug} | ${e.layer || ''} | ${e.role || ''} | ${e.scores || ''} | ${e.last_scored_wave || ''} | ${e.cite || ''} |\n`;
}
writeFileSync(OUT, md);
console.log(`OK: emitted ${OUT} with ${entries.length} rows`);
