#!/usr/bin/env node
// preagent-d73-gate.mjs — W342-X2 P0.4 SHIP-BLOCK gate
//
// PreToolUse[Agent] BLOCKING gate per sca-v22 SKILL.md §I10 + D73 ≥4 mandate.
//
// CONTRACT (codified-not-fired SEV-1 per W341 Stream C §7 P0-C4):
//   T1/T1-PROV/T2 verdicts MUST cite ≥2 non-github first-discoveries in the
//   `mcp_family_attribution[]` ledger field (per W340 D80 independence-proof
//   multi-org-anchor + W337 D73 anti-MCP-popularity-bias). When the active
//   verdict-ledger row violates the contract, this hook BLOCKS the Agent
//   dispatch that would write/extend the row, surfacing the gap before the
//   commit-gate has to.
//
// HEURISTIC:
//   1. Determine "active verdict" intent via tool_input (subagent_type contains
//      codex/review keyword OR description contains "verdict ledger"/"T1
//      INSTALL"/"T2 VENDOR"/"sca-v22" markers).
//   2. Newest `docs/architecture/W*/VERDICT-LEDGER.md` = active ledger.
//   3. Parse ledger blocks. For each row with verdict ∈ {T1, T1-PROV, T2},
//      check `mcp_family_attribution[]` block. Count entries with
//      `first_discovered_by:` value NOT in {github, github-api, gh, gh-mcp}.
//   4. If <2 non-github first-discoveries on the NEWEST T1/T1-PROV/T2 row:
//      exit 2 with explicit reason.
//   5. Else: exit 0.
//
// SOFT-FAIL: ledger file missing, parse error, no T1/T1-PROV/T2 rows present,
//            or no active-verdict-write intent → exit 0 (advisory absent
//            preferred over false-block).
//
// Escape hatch: CLAUDE_D73_GATE_DISABLE=1 → exit 0 (operator override).
// In-session bypass marker: .claude/state/d73-gate-bypass.marker
//
// Time-budget <200ms typical. Node 22 native (no deps).
//
// CITES:
// - https://docs.anthropic.com/en/docs/claude-code/hooks (exit-code-2 = blocking)
// - .claude/skills/sota-convergence-audit/SKILL.md:363,406,454 (sca-v22 §I10 + D73 + position-swap)
// - tools/preagent-parallel-guard.mjs (style mirror; W330 P0-A)
// - tools/preagent-subagent-validator.mjs (allowlist-loader pattern; W326 P0-A2)
// - W341 VERDICT-LEDGER.md Stream C §7 P0-C4 SEV-1 (codified-not-fired)

import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ARCH_ROOT =
  process.env.W342_D73_ARCH_ROOT ||
  'Z:/claude-sota-installed/docs/architecture';
const BYPASS_MARKER =
  'Z:/claude-sota-installed/.claude/state/d73-gate-bypass.marker';

const GITHUB_FAMILY = new Set([
  'github', 'github-api', 'gh', 'gh-mcp', 'gh-graphql',
  'github_api', 'github-mcp', 'gitHub',
]);

const T1_VERDICTS = new Set(['T1', 'T1-PROV', 'T2', 'T0']);

async function readEvent() {
  return await new Promise((resolve) => {
    let buf = '';
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (c) => (buf += c));
    process.stdin.on('end', () => {
      try { resolve(JSON.parse(buf || '{}')); } catch { resolve({}); }
    });
    setTimeout(() => resolve({}), 400);
  });
}

function findNewestWaveLedger() {
  if (!existsSync(ARCH_ROOT)) return null;
  let entries;
  try { entries = readdirSync(ARCH_ROOT, { withFileTypes: true }); }
  catch { return null; }
  const candidates = [];
  for (const e of entries) {
    if (!e.isDirectory()) continue;
    // Match W<NNN> prefix
    if (!/^W\d{3}/.test(e.name)) continue;
    const ledger = join(ARCH_ROOT, e.name, 'VERDICT-LEDGER.md');
    if (!existsSync(ledger)) continue;
    try {
      const s = statSync(ledger);
      candidates.push({ path: ledger, mtimeMs: s.mtimeMs, name: e.name });
    } catch { /* */ }
  }
  candidates.sort((a, b) => b.mtimeMs - a.mtimeMs);
  return candidates[0] || null;
}

// Extract T1/T1-PROV/T2 rows from ledger text. Two-strategy parser:
//   Strategy A — YAML fenced blocks (sca-v22 §10 canonical schema); STRICT mode
//   Strategy B — markdown-table tier markers (W341+ wave-closure format); ADVISORY mode
// Returns rows with `{ verdict, attribs, schemaFormat, offset }`.
// W342-X2 codex round-1+2 REVISE closure:
//   - r1: parser was YAML-only; markdown-table ledgers returned 0 rows → gate inert.
//   - r2: YAML+markdown coexistence — markdown marker downstream could downgrade
//     strict YAML to advisory. FIX: YAML PRECEDENCE — if ≥1 YAML row found,
//     return YAML-only (markdown markers ignored). Markdown is fallback ONLY
//     when zero YAML rows present. Each row carries `offset` for true file-order
//     sort within its schema.
function parseLedgerRows(text) {
  const yamlRows = [];
  const mdRows = [];

  // Strategy A: YAML fenced blocks (strict schema) — offset-tracked via regex.exec
  const yamlRe = /```ya?ml\s*([\s\S]*?)```/g;
  let ym;
  while ((ym = yamlRe.exec(text)) !== null) {
    const inner = ym[1];
    const offset = ym.index;
    const verdictMatch = inner.match(/verdict\s*:\s*([A-Z0-9-]+)/);
    if (!verdictMatch) continue;
    const verdict = verdictMatch[1].trim();
    if (!T1_VERDICTS.has(verdict)) continue;
    const attribs = [];
    // Inline form: mcp_family_attribution: [{first_discovered_by: x, ...}, ...]
    const inlineMatch = inner.match(/mcp_family_attribution\s*:\s*\[([\s\S]*?)\]/);
    if (inlineMatch) {
      const inlineRaw = inlineMatch[1];
      const firstDiscoveredMatches = inlineRaw.match(/first_discovered_by\s*:\s*[^\s,}\]]+/g) || [];
      for (const fm of firstDiscoveredMatches) {
        const val = fm.split(':')[1].trim().replace(/['"]/g, '');
        attribs.push(val);
      }
    } else {
      // Block form: lines under mcp_family_attribution: with `- first_discovered_by: <name>`
      const blockStart = inner.search(/^mcp_family_attribution\s*:/m);
      if (blockStart >= 0) {
        const sub = inner.slice(blockStart);
        const lines = sub.split('\n');
        for (let i = 1; i < lines.length; i++) {
          const ln = lines[i];
          if (/^\S/.test(ln) && !/^\s/.test(ln)) break;
          const fm = ln.match(/first_discovered_by\s*:\s*([^\s,]+)/);
          if (fm) attribs.push(fm[1].trim().replace(/['"]/g, ''));
        }
      }
    }
    yamlRows.push({ verdict, attribs, schemaFormat: 'yaml', offset });
  }

  // YAML PRECEDENCE (codex r2 closure): if any YAML rows exist, that is the
  // canonical schema for this ledger. Markdown tier markers (likely roll-up
  // summary tables, not canonical per-candidate rows) MUST NOT downgrade
  // strict YAML enforcement to advisory. Return YAML-only when present.
  if (yamlRows.length > 0) {
    yamlRows.sort((a, b) => a.offset - b.offset);
    return yamlRows;
  }

  // Strategy B (fallback): markdown-table tier markers. Only consulted when
  // ledger has ZERO YAML rows (W341-style ledgers).
  const mdMarkerRe = /\b(T0|T1|T1-PROV|T1-PROVISIONAL|T1-CONDITIONAL|T2|T2-CHERRY|T2-CHERRY-FRONTIER)\b\s*(?:INSTALLED|installed|PROV|CONDITIONAL|CHERRY|FRONTIER)?\s*[:|]/g;
  let mm;
  while ((mm = mdMarkerRe.exec(text)) !== null) {
    const tier = mm[1].toUpperCase();
    const verdict = tier === 'T1-PROVISIONAL' ? 'T1-PROV' : tier;
    if (!T1_VERDICTS.has(verdict)) continue;
    mdRows.push({ verdict, attribs: [], schemaFormat: 'markdown', offset: mm.index });
  }
  mdRows.sort((a, b) => a.offset - b.offset);
  return mdRows;
}

function countNonGithubFirstDiscoveries(attribs) {
  let n = 0;
  for (const a of attribs) {
    const norm = String(a).toLowerCase().replace(/[_-]/g, '-');
    if (!GITHUB_FAMILY.has(a) && !GITHUB_FAMILY.has(norm)) n++;
  }
  return n;
}

function looksLikeVerdictWriteIntent(ev) {
  const ti = ev?.tool_input;
  if (!ti) return false;
  // Heuristics: description/prompt mentions verdict-ledger / T1 / sca-v22
  const text = [
    ti.description, ti.prompt, ti.subagent_type, ti.message,
  ].filter((x) => typeof x === 'string').join(' ').toLowerCase();
  if (!text) return false;
  const markers = [
    'verdict ledger', 'verdict-ledger', 't1 install', 't1-prov', 't1 prov',
    'sca-v22', 'mcp_family_attribution',
    'first_discovered_by', 'd73', 'codex review', 'codex verdict',
    'sota-convergence-audit', 'install_score', 'pattern_score',
  ];
  return markers.some((m) => text.includes(m));
}

function emitBlockMsg(violation) {
  const lines = [
    `W342-X2 P0.4 D73 SHIP-BLOCK: ${violation.reason}`,
    `Ledger: ${violation.ledgerPath}`,
    `Newest T1/T1-PROV/T2 row verdict=${violation.verdict}`,
    `Non-github first-discoveries: ${violation.nonGithubCount} (require ≥2)`,
    `Attributions found: ${violation.attribs.join(', ') || '<none>'}`,
    '',
    'REMEDIATION: per sca-v22 §I10 + D73 ≥4 mandate, before writing T1/T1-PROV/T2',
    'verdict, run MCP-cascade Stage-1 with ≥2 non-github MCP families AND record',
    '`first_discovered_by:` per claim in `mcp_family_attribution[]`.',
    'Escape hatch: CLAUDE_D73_GATE_DISABLE=1 OR `touch .claude/state/d73-gate-bypass.marker`.',
  ];
  try { process.stderr.write(`${lines.join('\n')}\n`); } catch {}
}

async function main() {
  // Escape hatches
  if (process.env.CLAUDE_D73_GATE_DISABLE === '1') process.exit(0);
  try {
    statSync(BYPASS_MARKER);
    process.exit(0);
  } catch { /* no marker, continue */ }

  const ev = await readEvent();
  if (!looksLikeVerdictWriteIntent(ev)) process.exit(0);

  const ledger = findNewestWaveLedger();
  if (!ledger) process.exit(0); // soft-fail: no ledger to validate

  let text;
  try { text = readFileSync(ledger.path, 'utf8'); }
  catch { process.exit(0); } // soft-fail: unreadable

  const rows = parseLedgerRows(text);
  if (rows.length === 0) process.exit(0); // soft-fail: no T1/T1-PROV/T2 rows yet

  // Newest T1/T1-PROV/T2 row is last in file order (ledgers are append-only)
  const newest = rows[rows.length - 1];

  // Dual-schema enforcement (W342 codex round-1 REVISE closure):
  //   - schemaFormat='yaml' → STRICT (block exit 2 on <2 non-github first-discoveries)
  //   - schemaFormat='markdown' → ADVISORY (emit warning via hookSpecificOutput, exit 0)
  //     because markdown-table format cannot carry mcp_family_attribution[] structurally
  if (newest.schemaFormat === 'yaml') {
    const nonGithub = countNonGithubFirstDiscoveries(newest.attribs);
    if (nonGithub < 2) {
      emitBlockMsg({
        reason: `T1-class verdict with <2 non-github first-discoveries violates sca-v22 §I10`,
        ledgerPath: ledger.path,
        verdict: newest.verdict,
        nonGithubCount: nonGithub,
        attribs: newest.attribs,
      });
      process.exit(2);
    }
  } else if (newest.schemaFormat === 'markdown') {
    // ADVISORY only — emit hookSpecificOutput.additionalContext
    const advisory = {
      hookSpecificOutput: {
        hookEventName: 'PreToolUse',
        additionalContext:
          `W342-X2 D73 gate ADVISORY: ledger ${ledger.path} contains T1-class verdict ` +
          `marker (${newest.verdict}) in markdown-table format. Structured attribution ` +
          `(mcp_family_attribution[]) is structurally absent; strict enforcement requires ` +
          `YAML-block schema per sca-v22 §10. Recommend emitting per-row YAML blocks in future ` +
          `wave VERDICT-LEDGER.md files to enable strict ≥2-non-github-first-discovery check.`,
      },
    };
    try { process.stdout.write(`${JSON.stringify(advisory)}\n`); } catch {}
  }
  process.exit(0);
}

main().catch((e) => {
  // Never throw on hook error; soft-fail to exit 0 (advisory-absent preferred)
  try { process.stderr.write(`W342-X2 D73 gate soft-fail: ${e?.message || e}\n`); } catch {}
  process.exit(0);
});
