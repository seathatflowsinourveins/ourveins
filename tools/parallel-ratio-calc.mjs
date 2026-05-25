#!/usr/bin/env node
// parallel-ratio-calc.mjs — W370 P2.2 ship
//
// Lightweight helper that computes parallel_ratio for CI gating. Reads
// session JSONL transcripts from `.claude/projects/Z--claude-sota-installed/`
// (in-tree) OR a single newline-delimited "parallel-guard log" JSONL when
// supplied via `--log <path>`. Emits JSON to stdout suitable for the
// parallel-ratio-gate.yml workflow step.
//
// Output shape:
//   {
//     "parallel_ratio": 0.X,                     // parallel_turns / denom
//     "denom": N,                                // total Agent-dispatching turns
//     "parallel_turns": N,                       // turns with >=2 Agent blocks
//     "distribution": { "1": .., "2": .., "3": .., "4+": .. },
//     "events": [ { "ts": "...", "agent_blocks": N }, ... ],  // last N events
//     "baseline": 0.7,                           // target floor
//     "delta_abs": <ratio - baseline>,
//     "delta_pct": <((ratio / baseline) - 1) * 100>,
//     "status": "MET" | "BELOW",
//     "window": "30d",
//     "events_returned": <length of events array>,
//     "timestamp": "..."
//   }
//
// Usage:
//   node tools/parallel-ratio-calc.mjs                     # default 30d window, all sessions
//   node tools/parallel-ratio-calc.mjs --since 7d          # 7-day window
//   node tools/parallel-ratio-calc.mjs --events 50         # cap events array to last 50
//   node tools/parallel-ratio-calc.mjs --baseline 0.7      # override baseline (default 0.7)
//   node tools/parallel-ratio-calc.mjs --log <path.jsonl>  # parse a single JSONL (CI use)
//
// Exit 0 always (CI workflow decides gate pass/fail; helper is non-gating).
// Sibling of tools/parallel-ratio-telemetry.mjs (which targets a 0.30 stretch);
// this helper targets 0.70 (W269 ideal floor per CLAUDE.md L19) and emits an
// events[] tail for PR-comment context.
//
// References:
// - https://docs.anthropic.com/en/docs/claude-code/sub-agents  (Agent tool fan-out)
// - CLAUDE.md L19 W269/W312-D parallel-dispatch mandate (target ratio ≥0.7)
// - W325-A F1 baseline 0.0036 → W330 P0-A binding fix → W370 CI gate
// - tools/parallel-ratio-telemetry.mjs (companion analysis script, 0.30 stretch)

import { readdir, readFile, stat } from 'node:fs/promises';
import { join } from 'node:path';

const DEFAULT_WINDOW = '30d';
const DEFAULT_BASELINE = 0.7;
const DEFAULT_EVENTS_CAP = 25;

function parseArgs(argv) {
  const args = {
    since: DEFAULT_WINDOW,
    baseline: DEFAULT_BASELINE,
    eventsCap: DEFAULT_EVENTS_CAP,
    log: null,
  };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--since' && i + 1 < argv.length) args.since = argv[++i];
    else if (a.startsWith('--since=')) args.since = a.slice('--since='.length);
    else if (a === '--baseline' && i + 1 < argv.length) args.baseline = parseFloat(argv[++i]);
    else if (a.startsWith('--baseline=')) args.baseline = parseFloat(a.slice('--baseline='.length));
    else if (a === '--events' && i + 1 < argv.length) args.eventsCap = parseInt(argv[++i], 10);
    else if (a.startsWith('--events=')) args.eventsCap = parseInt(a.slice('--events='.length), 10);
    else if (a === '--log' && i + 1 < argv.length) args.log = argv[++i];
    else if (a.startsWith('--log=')) args.log = a.slice('--log='.length);
    else if (a === '--help' || a === '-h') {
      process.stdout.write(
        'Usage: node parallel-ratio-calc.mjs [--since 30d] [--baseline 0.7] [--events 25] [--log path.jsonl]\n',
      );
      process.exit(0);
    }
  }
  if (!Number.isFinite(args.baseline) || args.baseline <= 0 || args.baseline > 1) {
    args.baseline = DEFAULT_BASELINE;
  }
  if (!Number.isFinite(args.eventsCap) || args.eventsCap < 0) {
    args.eventsCap = DEFAULT_EVENTS_CAP;
  }
  return args;
}

function windowToCutoffMs(spec, nowMs) {
  if (spec === 'today') {
    const d = new Date(nowMs);
    d.setUTCHours(0, 0, 0, 0);
    return d.getTime();
  }
  if (spec === 'all') return 0;
  const m = /^(\d+)([dhm])$/.exec(spec);
  if (!m) throw new Error(`Invalid --since: ${spec}`);
  const n = parseInt(m[1], 10);
  const unit = m[2];
  const mult = unit === 'd' ? 86400e3 : unit === 'h' ? 3600e3 : 60e3;
  return nowMs - n * mult;
}

function countAgentBlocks(contentArr) {
  if (!Array.isArray(contentArr)) return 0;
  let n = 0;
  for (const b of contentArr) {
    if (b && b.type === 'tool_use' && (b.name === 'Agent' || b.name === 'Task')) n++;
  }
  return n;
}

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
      if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.jsonl$/i.test(e.name)) continue;
      const fp = join(root, e.name);
      let st;
      try {
        st = await stat(fp);
      } catch {
        continue;
      }
      yield { path: fp, mtimeMs: st.mtimeMs };
    }
  }
}

// Parse a single session-JSONL OR a flat "parallel-guard log" JSONL.
// Auto-detects: session JSONL records have {message:{role,content[]}};
// guard log records have {ts, agent_blocks} directly.
async function processFile(fp, cutoffMs) {
  let raw;
  try {
    raw = await readFile(fp, 'utf8');
  } catch {
    return { denom: 0, parallel: 0, dist: { '1': 0, '2': 0, '3': 0, '4+': 0 }, events: [] };
  }
  const dist = { '1': 0, '2': 0, '3': 0, '4+': 0 };
  let denom = 0;
  let parallel = 0;
  const events = [];
  const lines = raw.split('\n');
  for (const line of lines) {
    if (!line || line[0] !== '{') continue;
    let obj;
    try {
      obj = JSON.parse(line);
    } catch {
      continue;
    }
    // Path A: session-JSONL assistant message.
    const msg = obj && obj.message;
    if (msg && msg.role === 'assistant') {
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
      events.push({ ts: ts || null, agent_blocks: n });
      continue;
    }
    // Path B: flat guard-log row { ts, agent_blocks } or { ts, n }.
    if (Object.prototype.hasOwnProperty.call(obj, 'agent_blocks') || Object.prototype.hasOwnProperty.call(obj, 'n')) {
      const ts = obj.ts || obj.timestamp || null;
      if (ts) {
        const tms = Date.parse(ts);
        if (!Number.isNaN(tms) && tms < cutoffMs) continue;
      }
      const n = typeof obj.agent_blocks === 'number' ? obj.agent_blocks : (typeof obj.n === 'number' ? obj.n : 0);
      if (n === 0) continue;
      denom++;
      if (n >= 2) parallel++;
      if (n === 1) dist['1']++;
      else if (n === 2) dist['2']++;
      else if (n === 3) dist['3']++;
      else dist['4+']++;
      events.push({ ts, agent_blocks: n });
    }
  }
  return { denom, parallel, dist, events };
}

async function main() {
  const args = parseArgs(process.argv);
  const nowMs = Date.now();
  const cutoffMs = windowToCutoffMs(args.since, nowMs);

  const totals = { denom: 0, parallel: 0, dist: { '1': 0, '2': 0, '3': 0, '4+': 0 }, events: [] };

  if (args.log) {
    const r = await processFile(args.log, cutoffMs);
    totals.denom = r.denom;
    totals.parallel = r.parallel;
    totals.dist = r.dist;
    totals.events = r.events;
  } else {
    const roots = [
      join(process.cwd(), '.claude', 'projects', 'Z--claude-sota-installed'),
      'Z:/claude-sota-installed/.claude/projects/Z--claude-sota-installed',
      'Z:/claude-sota-installed-state/.claude/projects/Z--claude-sota-installed',
    ];
    const seen = new Set();
    for await (const { path: fp, mtimeMs } of listJsonlFiles(roots)) {
      if (seen.has(fp)) continue;
      seen.add(fp);
      if (mtimeMs < cutoffMs) continue;
      const r = await processFile(fp, cutoffMs);
      totals.denom += r.denom;
      totals.parallel += r.parallel;
      for (const k of Object.keys(totals.dist)) totals.dist[k] += r.dist[k];
      for (const ev of r.events) totals.events.push(ev);
    }
  }

  const ratio = totals.denom > 0 ? totals.parallel / totals.denom : 0;
  const ratioRounded = Number(ratio.toFixed(4));
  const baseline = args.baseline;
  const deltaAbs = Number((ratio - baseline).toFixed(4));
  const deltaPct = baseline > 0 ? Number((((ratio / baseline) - 1) * 100).toFixed(2)) : null;

  // Sort events newest-first by ts, then cap.
  const sortedEvents = totals.events
    .filter((ev) => ev.ts)
    .sort((a, b) => Date.parse(b.ts) - Date.parse(a.ts));
  const cappedEvents = args.eventsCap > 0 ? sortedEvents.slice(0, args.eventsCap) : sortedEvents;

  const out = {
    parallel_ratio: ratioRounded,
    denom: totals.denom,
    parallel_turns: totals.parallel,
    distribution: totals.dist,
    events: cappedEvents,
    baseline,
    delta_abs: deltaAbs,
    delta_pct: deltaPct,
    status: ratio >= baseline ? 'MET' : 'BELOW',
    window: args.since,
    events_returned: cappedEvents.length,
    timestamp: new Date(nowMs).toISOString(),
    source: args.log ? `log:${args.log}` : 'session-jsonl-scan',
  };
  process.stdout.write(JSON.stringify(out) + '\n');
  process.exit(0);
}

main().catch((err) => {
  // Non-gating: emit error JSON, exit 0 (CI workflow decides if absence of data = fail).
  process.stdout.write(JSON.stringify({
    error: String((err && err.message) || err),
    parallel_ratio: 0,
    denom: 0,
    parallel_turns: 0,
    distribution: { '1': 0, '2': 0, '3': 0, '4+': 0 },
    events: [],
    baseline: DEFAULT_BASELINE,
    delta_abs: -DEFAULT_BASELINE,
    delta_pct: -100,
    status: 'ERROR',
    window: 'unknown',
    events_returned: 0,
    timestamp: new Date().toISOString(),
    source: 'error',
  }) + '\n');
  process.exit(0);
});
