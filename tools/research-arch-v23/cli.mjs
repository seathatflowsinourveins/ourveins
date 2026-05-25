#!/usr/bin/env node
// tools/research-arch-v23/cli.mjs
// v23 convergence-audit CLI entry point.
// Usage:
//   node tools/research-arch-v23/cli.mjs --target <kind>:<identifier>[@version] [--format json|markdown|table] [--dry-run]
//
// Examples:
//   node tools/research-arch-v23/cli.mjs --target github-repo:obra/superpowers@v5.1.0 --format markdown
//   node tools/research-arch-v23/cli.mjs --target npm-package:@upstash/context7-mcp --format json
//   node tools/research-arch-v23/cli.mjs --target mcp-server:@modelcontextprotocol/server-filesystem --dry-run
//
// Cite-anchor: docs/architecture/SOTA-RESEARCH-ARCH-V23/DESIGN.md §3 (cli interface).
import {convergeAudit} from './convergence-engine.mjs';
import {parseArgs} from 'node:util';

const HELP_TEXT = `
v23 convergence-audit CLI

USAGE:
  node tools/research-arch-v23/cli.mjs --target <kind>:<identifier>[@version] [OPTIONS]

ARGS:
  --target <spec>     Required. Format: <kind>:<identifier>[@version]
                      kind in {github-repo, npm-package, pypi-package, mcp-server, cc-plugin}
                      Examples:
                        github-repo:obra/superpowers@v5.1.0
                        npm-package:@upstash/context7-mcp
                        mcp-server:@modelcontextprotocol/server-filesystem

OPTIONS:
  --format <fmt>      Output format: json (default) | markdown | table
  --dry-run           Skip MCP probes; only A7 registry attempts
  --min-angles <N>    Minimum live angles required (integer 1-7; default 1 for CLI mode).
                      CLI mode lacks MCP clients (deepwiki/repomix/perplexity/exa/firecrawl/tavily),
                      so only A7 registry probe (gh CLI + npm view) is live. Default 1 enables
                      CLI-mode triage/registry-only use. Orchestrator-mode (Claude Code session
                      with MCP) passes --min-angles 3 for full sca-v23 §2.1 convergence.
                      W442 will add MCP-client-instantiation for standalone full-convergence CLI.
  --help              Show this help

EXIT CODES:
  0  success
  1  insufficient live angles (per sca-v23 §2.1 convergence rule, or --min-angles override)
  2  invalid arguments
  3  network/api error during probe

NOTE: Standalone CLI runs in Node WITHOUT a Claude Code session, so MCP clients
(deepwiki, repomix, perplexity, exa, firecrawl, tavily) are unreachable. Only A7
registry probe works in CLI standalone mode. For full sca-v23 §2.1 ≥3-angle
convergence, run via orchestrator-mode (Claude Code session with MCP) which can
inject mcpClient into convergeAudit options. W442 will close this gap.
`;

function parseTargetSpec(spec) {
  // Format: <kind>:<identifier>[@version]
  const colonIdx = spec.indexOf(':');
  if (colonIdx === -1) {
    throw new Error(`Invalid --target spec "${spec}": missing colon between kind and identifier. Expected <kind>:<identifier>`);
  }
  const kind = spec.slice(0, colonIdx);
  const rest = spec.slice(colonIdx + 1);
  // Extract @version (last @ in rest, since npm packages can have @ in identifier)
  const atIdx = rest.lastIndexOf('@');
  // Heuristic: if @ appears after a /, it's a version; if @ is at position 0, it's npm-scope
  let identifier, version;
  if (atIdx > 0 && (rest.includes('/') ? atIdx > rest.indexOf('/') : true) && atIdx > 0) {
    identifier = rest.slice(0, atIdx);
    version = rest.slice(atIdx + 1);
    // W441.6 codex r1 REVISE fix #2: reject trailing @ with empty version.
    // Accepting "pkg@" silently produced version="" which downstream defaulted to 'HEAD'
    // hiding the user's malformed input.
    if (!version) {
      throw new Error(
        `Invalid --target spec "${spec}": trailing @ with empty version. ` +
        `Use either <kind>:<identifier>@<version> or <kind>:<identifier> (no @)`
      );
    }
  } else {
    identifier = rest;
    version = 'HEAD';
  }
  const validKinds = ['github-repo', 'npm-package', 'pypi-package', 'mcp-server', 'cc-plugin'];
  if (!validKinds.includes(kind)) {
    throw new Error(`Invalid kind "${kind}". Must be one of: ${validKinds.join(', ')}`);
  }
  if (!identifier) {
    throw new Error(`Invalid --target spec "${spec}": empty identifier`);
  }
  return {kind, identifier, version};
}

function formatVerdictMarkdown(verdict) {
  const lines = [];
  lines.push(`# v23 Verdict: ${verdict.target.identifier}@${verdict.target.version}`);
  lines.push('');
  lines.push(`- **Tier**: \`${verdict.decision_tier}\``);
  lines.push(`- **CVS**: \`${verdict.composite_verdict_score.toFixed(3)}\``);
  lines.push(`- **Schema**: \`${verdict.schema_version}\``);
  lines.push(`- **Kind**: \`${verdict.target.kind}\``);
  lines.push('');
  lines.push(`## Convergence summary`);
  lines.push(`- Total angles: ${verdict.convergence_summary.total_angles}`);
  lines.push(`- Live angles: ${verdict.convergence_summary.live_angles}`);
  lines.push(`- Skipped angles: ${verdict.convergence_summary.skipped_angles}`);
  lines.push(`- Min live angles required: ${verdict.convergence_summary.min_live_angles_required}`);
  lines.push(`- Convergence rule met: ${verdict.convergence_summary.convergence_rule_met ? 'YES' : 'NO'}`);
  lines.push('');
  lines.push(`## Trust tuple (R1a)`);
  for (const [k, v] of Object.entries(verdict.trust_tuple_R1a)) {
    lines.push(`- ${k}: ${v ? 'YES' : 'NO'}`);
  }
  lines.push('');
  lines.push(`## Scoring dims`);
  lines.push('| Dim | Value | Weight | Rationale |');
  lines.push('|---|---|---|---|');
  for (const [name, dim] of Object.entries(verdict.scoring_dims)) {
    lines.push(`| ${name} | ${dim.value.toFixed(3)} | ${dim.weight} | ${dim.rationale} |`);
  }
  lines.push('');
  lines.push(`## Research angles`);
  for (const [name, angle] of Object.entries(verdict.research_angles)) {
    const skipMark = angle.skipped ? ' (skipped)' : '';
    const reason = angle.skipped ? ` — ${angle.reason}` : '';
    lines.push(`- **${name}**${skipMark}: score=${angle.normalized_score?.toFixed(3) ?? '?'}, weight=${angle.weight}${reason}`);
  }
  lines.push('');
  lines.push(`## Provenance`);
  for (const [k, v] of Object.entries(verdict.provenance)) {
    lines.push(`- ${k}: \`${v}\``);
  }
  if (verdict.codex_verdict) {
    lines.push('');
    lines.push(`## Codex adversarial verdict`);
    lines.push(`- model: \`${verdict.codex_verdict.model}\``);
    lines.push(`- round: ${verdict.codex_verdict.round}`);
    lines.push(`- verdict: \`${verdict.codex_verdict.verdict}\``);
    if (verdict.codex_verdict.rationale) lines.push(`- rationale: ${verdict.codex_verdict.rationale}`);
  }
  return lines.join('\n');
}

function formatVerdictTable(verdict) {
  const rows = [];
  rows.push(`Target: ${verdict.target.kind}:${verdict.target.identifier}@${verdict.target.version}`);
  rows.push(`Tier:   ${verdict.decision_tier}`);
  rows.push(`CVS:    ${verdict.composite_verdict_score.toFixed(3)}`);
  rows.push(`Angles: ${verdict.convergence_summary.live_angles}/${verdict.convergence_summary.total_angles} live`);
  rows.push('');
  rows.push(`Dim                              Value   Weight`);
  rows.push(`-------------------------------- ------- ------`);
  for (const [name, dim] of Object.entries(verdict.scoring_dims)) {
    const paddedName = name.padEnd(32);
    rows.push(`${paddedName} ${dim.value.toFixed(3).padStart(7)} ${String(dim.weight).padStart(6)}`);
  }
  return rows.join('\n');
}

async function main() {
  let parsed;
  try {
    parsed = parseArgs({
      options: {
        target: {type: 'string'},
        format: {type: 'string', default: 'json'},
        'dry-run': {type: 'boolean', default: false},
        // W442: CLI default raised to 3 (standalone bridge now available via MAF MCPStdioTool).
        // W441.6 legacy: was 1 (registry-only triage). Triage mode still available via explicit --min-angles 1.
        'min-angles': {type: 'string', default: '3'},
        help: {type: 'boolean', default: false},
      },
      strict: true,
    });
  } catch (err) {
    console.error(`Argument error: ${err.message}`);
    console.error(HELP_TEXT);
    process.exit(2);
  }

  const {values} = parsed;

  if (values.help) {
    console.log(HELP_TEXT);
    process.exit(0);
  }

  if (!values.target) {
    console.error('Error: --target is required.');
    console.error(HELP_TEXT);
    process.exit(2);
  }

  if (!['json', 'markdown', 'table'].includes(values.format)) {
    console.error(`Error: --format must be one of json|markdown|table, got "${values.format}".`);
    process.exit(2);
  }

  // W441.6 codex r1 REVISE fix #1: validate --min-angles (integer in [1,7] — 7 total angles)
  const minAnglesRaw = parseInt(values['min-angles'], 10);
  if (Number.isNaN(minAnglesRaw)
    || String(minAnglesRaw) !== String(values['min-angles']).trim()
    || minAnglesRaw < 1
    || minAnglesRaw > 7) {
    console.error(`Error: --min-angles must be integer 1-7, got "${values['min-angles']}".`);
    process.exit(2);
  }

  // W442: warning retained for explicit triage mode (--min-angles < 3). Bridge now available
  // so default is 3; operator choosing <3 is intentional triage. Suppressed in --dry-run.
  if (minAnglesRaw < 3 && !values['dry-run']) {
    console.error(`⚠️  Triage mode active: --min-angles ${minAnglesRaw} (full convergence uses ≥3 live angles via MAF bridge).`);
    console.error(`   For full convergence: use default --min-angles 3 (or omit the flag).`);
  }

  let target;
  try {
    target = parseTargetSpec(values.target);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(2);
  }

  try {
    const verdict = await convergeAudit(target, {
      dryRun: values['dry-run'],
      minLiveAngles: minAnglesRaw,
    });
    if (values.format === 'markdown') {
      console.log(formatVerdictMarkdown(verdict));
    } else if (values.format === 'table') {
      console.log(formatVerdictTable(verdict));
    } else {
      console.log(JSON.stringify(verdict, null, 2));
    }
    process.exit(0);
  } catch (err) {
    if (err.message.includes('insufficient live angles')) {
      console.error(`Convergence error: ${err.message}`);
      process.exit(1);
    }
    console.error(`Probe error: ${err.message}`);
    process.exit(3);
  }
}

main().catch(err => {
  console.error(`Fatal: ${err.message}`);
  process.exit(3);
});
