#!/usr/bin/env node
// tools/alw/cli.mjs
// ALW CLI entry — `alw tick`, `alw status`, `alw start`, `alw stop`, `alw queue`, `alw research`
import {tick} from './orchestrator.mjs';
import {researchTick} from './layers/research-tick.mjs';
import {parseArgs} from 'node:util';

const {values, positionals} = parseArgs({
  options: {
    'dry-run': {type: 'boolean', default: false},
  },
  allowPositionals: true,
});
const cmd = positionals[0];
const dryRun = values['dry-run'];

if (cmd === 'tick') {
  const result = await tick({});
  console.log(JSON.stringify(result, null, 2));
} else if (cmd === 'status') {
  console.log(JSON.stringify({
    alw_version: 'v1-scaffold',
    wave: 'W441.7',
    status: 'scaffold-only',
    layers_implemented: 'L1-L8 stubs',
    next_wave: 'W442 (dispatcher + reviewer + persistence)',
  }, null, 2));
} else if (cmd === 'queue') {
  console.log(JSON.stringify({queue: [], reason: 'discovery stub returns empty queue in W441.7'}, null, 2));
} else if (cmd === 'research') {
  const result = await researchTick({dryRun});
  console.log(JSON.stringify(result, null, 2));
} else if (cmd === 'start' || cmd === 'stop') {
  console.log(JSON.stringify({cmd, status: 'NOT-IMPLEMENTED', reason: 'long-run daemon mode lands in W443'}, null, 2));
} else {
  console.error('Usage: alw tick|status|start|stop|queue|research');
  console.error('  tick      — execute one ALW lifecycle tick (L1-L8)');
  console.error('  status    — show ALW version + scaffold state');
  console.error('  queue     — list pending work-items');
  console.error('  research  — run discovery + scoring tick (supports --dry-run)');
  console.error('  start     — start daemon (NOT-IMPLEMENTED W441; lands W443)');
  console.error('  stop      — stop daemon (NOT-IMPLEMENTED W441; lands W443)');
  process.exit(2);
}
