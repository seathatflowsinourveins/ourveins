#!/usr/bin/env node
// parallel-ratio-telemetry.mjs — W325-A P0 ship
// Emits JSON telemetry from CC session JSONL transcripts.
// Computes parallel_ratio = N(turns with >=2 Agent tool_use blocks) / N(Agent-dispatching turns).
// Reads JSONLs from in-tree .claude/projects/Z--claude-sota-installed/ and state redirect dir.
// Exit 0 always (telemetry not gating). Node 22 native, no external deps.
//
// References:
// - https://docs.anthropic.com/en/docs/claude-code/sub-agents (Agent tool fan-out)
// - CLAUDE.md L19 W269/W312-D parallel-dispatch mandate
// - docs/architecture/W314-SILENT-FALLBACK-V5-AGENT-TEAM/W314-C-PARALLEL-RATIO-MEASUREMENT.md

import { readdir, readFile, stat } from 'node:fs/promises';
import { join } from 'node:path';

const DEFAULT_WINDOW = '30d';
const TARGET_RATIO = 0.30; // W325 target floor (W269 ideal 0.70; F1 measured 0.0034)

// --------------- argparse ---------------
function parseArgs(argv) {
  const args = { since: DEFAULT_WINDOW };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--since' && i + 1 < argv.length) {
      args.since = argv[++i];
    } else if (a.startsWith('--since=')) {
      args.since = a.slice('--since='.length);
    } else if (a === '--help' || a === '-h') {
      process.stdout.write('Usage: node parallel-ratio-telemetry.mjs [--since 30d|7d|24h|today]\n');
      process.exit(0);
    }
  }
  return args;
}

function windowToCutoffMs(spec, nowMs) {
  if (spec === 'today') {
    const d = new Date(nowMs);
    d.setUTCHours(0, 0, 0, 0);
    return d.getTime();
  }
  const m = /^(\d+)([dhm])$/.exec(spec);
  if (!m) throw new Error(`Invalid --since: ${spec}`);
  const n = parseInt(m[1], 10);
  const unit = m[2];
  const mult = unit === 'd' ? 86400e3 : unit === 'h' ? 3600e3 : 60e3;
  return nowMs - n * mult;
}

// --------------- jsonl scan ---------------
async function* listJsonlFiles(roots) {
  for (const root of roots) {
    let entries;
    try {
      entries = await readdir(root, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const e of entries) {
      if (e.isDirectory()) continue;
      if (!e.name.endsWith('.jsonl')) continue;
      // session JSONL filenames are UUIDs (8-4-4-4-12 hex)
      if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.jsonl$/i.test(e.name)) continue;
      const fp = join(root, e.name);
      let st;
      try { st = await stat(fp); } catch { continue; }
      yield { path: fp, mtimeMs: st.mtimeMs };
    }
  }
}

// Count Agent tool_use blocks in a single assistant message content array.
function countAgentBlocks(contentArr) {
  if (!Array.isArray(contentArr)) return 0;
  let n = 0;
  for (const b of contentArr) {
    if (b && b.type === 'tool_use' && (b.name === 'Agent' || b.name === 'Task')) n++;
  }
  return n;
}

async function processFile(fp, cutoffMs) {
  let raw;
  try {
    raw = await readFile(fp, 'utf8');
  } catch {
    return { denom: 0, parallel: 0, dist: { '1': 0, '2': 0, '3': 0, '4+': 0 } };
  }
  const dist = { '1': 0, '2': 0, '3': 0, '4+': 0 };
  let denom = 0;
  let parallel = 0;
  const lines = raw.split('\n');
  for (const line of lines) {
    if (!line || line[0] !== '{') continue;
    let obj;
    try { obj = JSON.parse(line); } catch { continue; }
    const msg = obj && obj.message;
    if (!msg || msg.role !== 'assistant') continue;
    // timestamp at top-level on the record
    const ts = obj.timestamp;
    if (ts) {
      const tms = Date.parse(ts);
      if (!Number.isNaN(tms) && tms < cutoffMs) continue;
    }
    const n = countAgentBlocks(msg.content);
    if (n === 0) continue;
    denom++;
    if (n >= 2) parallel++;
    if (n === 1) dist['1']++;
    else if (n === 2) dist['2']++;
    else if (n === 3) dist['3']++;
    else dist['4+']++;
  }
  return { denom, parallel, dist };
}

// --------------- main ---------------
async function main() {
  const args = parseArgs(process.argv);
  const nowMs = Date.now();
  const cutoffMs = windowToCutoffMs(args.since, nowMs);

  const roots = [
    join(process.cwd(), '.claude', 'projects', 'Z--claude-sota-installed'),
    'Z:/claude-sota-installed/.claude/projects/Z--claude-sota-installed',
    'Z:/claude-sota-installed-state/.claude/projects/Z--claude-sota-installed',
  ];

  const totals = { denom: 0, parallel: 0, dist: { '1': 0, '2': 0, '3': 0, '4+': 0 } };
  const seen = new Set();
  for await (const { path: fp, mtimeMs } of listJsonlFiles(roots)) {
    if (seen.has(fp)) continue;
    seen.add(fp);
    // Quick skip: if mtime < cutoff, the file's most recent activity predates window.
    // Sessions write incrementally so mtime reflects last assistant message.
    if (mtimeMs < cutoffMs) continue;
    const r = await processFile(fp, cutoffMs);
    totals.denom += r.denom;
    totals.parallel += r.parallel;
    for (const k of Object.keys(totals.dist)) totals.dist[k] += r.dist[k];
  }

  const ratio = totals.denom > 0 ? totals.parallel / totals.denom : 0;
  const out = {
    window: args.since,
    denom: totals.denom,
    parallel_ratio: Number(ratio.toFixed(4)),
    distribution: totals.dist,
    target: `>=${TARGET_RATIO}`,
    status: ratio >= TARGET_RATIO ? 'MET' : 'BELOW',
    timestamp: new Date(nowMs).toISOString(),
  };
  process.stdout.write(JSON.stringify(out) + '\n');
  process.exit(0);
}

main().catch((err) => {
  // Telemetry non-gating: emit best-effort error JSON and exit 0.
  process.stdout.write(JSON.stringify({
    error: String(err && err.message || err),
    window: 'unknown',
    denom: 0,
    parallel_ratio: 0,
    distribution: { '1': 0, '2': 0, '3': 0, '4+': 0 },
    target: `>=${TARGET_RATIO}`,
    status: 'ERROR',
    timestamp: new Date().toISOString(),
  }) + '\n');
  process.exit(0);
});
