#!/usr/bin/env node
// tools/eee-precheck.mjs — W393.1 (W402) eee.ps1 clean-SOTA launch-contract orchestrator.
//
// Per docs/superpowers/specs/2026-05-25-W393-eee-contract-design.md §5
//   + docs/superpowers/plans/2026-05-25-W393-phase-0a-implementation-plan.md Task 1 step 5.
//
// This PR (W402) ships the orchestrator SKELETON + T1 ENV check only. Wave-2 PRs
// (W393.2..W393.6) register additional tiers (T2..T6) into the same tier-registry
// pattern below; W393.7 codifies block-rules B1..B10 + remediation surface.
//
// CLI:
//   node tools/eee-precheck.mjs --mode <launch-fast|deep|repair> [--json] [--config path]
//
// Output (JSON when --json):
//   {
//     status: 'OK' | 'HEALED' | 'BLOCKED',
//     mode: 'launch-fast' | 'deep' | 'repair',
//     elapsedMs: <int>,
//     tiers: [{ tier, blocked, healed, advisory }, ...],
//     blocked: [...],         // flattened across tiers
//     healed: [...],          // flattened across tiers
//     advisory: [...],        // flattened across tiers
//     remediation: '...'      // single human-readable summary string (BLOCKED only)
//   }
//
// Exit code:
//   0 on OK / HEALED.
//   2 on BLOCKED.
//   3 on internal error (config missing, unknown mode, etc.).

import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname, isAbsolute } from 'node:path';
import { fileURLToPath } from 'node:url';

import { runT1 } from './eee-checks/t1-env.mjs';
import { runT2 } from './eee-checks/t2-services.mjs';
import { runT3 } from './eee-checks/t3-cli.mjs';
import { runT4 } from './eee-checks/t4-github.mjs';
import { runT5 } from './eee-checks/t5-sota-drift.mjs';
import { runT6 } from './eee-checks/t6-research-arch.mjs';
import { runBlockRules } from './eee-checks/block-rules.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const REPO_ROOT = resolve(__dirname, '..');
const DEFAULT_CONFIG = resolve(REPO_ROOT, '.eee/precheck-config.json');

// Tier registry — W393.1 ships T1 only; Wave-2 PRs append entries here as they land.
const TIER_REGISTRY = {
  T1: { run: runT1 },
  T2: { run: runT2 },  // W393.2 (W404)
  T3: { run: runT3 },  // W393.3 (W405)
  T4: { run: runT4 },  // W393.4 (W406)
  T5: { run: runT5 },  // W393.5 (W407)
  T6: { run: runT6 },  // W393.6 (W408)
};

function parseArgs(argv) {
  const out = { mode: 'launch-fast', json: false, config: DEFAULT_CONFIG };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--mode') out.mode = argv[++i];
    else if (a === '--json') out.json = true;
    else if (a === '--config') out.config = isAbsolute(argv[i + 1]) ? argv[++i] : resolve(REPO_ROOT, argv[++i]);
    else if (a === '--help' || a === '-h') {
      console.log('Usage: node tools/eee-precheck.mjs --mode <launch-fast|deep|repair> [--json] [--config path]');
      process.exit(0);
    }
  }
  return out;
}

function loadConfig(configPath) {
  if (!existsSync(configPath)) {
    throw new Error(`eee-precheck: config not found at ${configPath}`);
  }
  let raw;
  try { raw = readFileSync(configPath, 'utf8'); }
  catch (e) { throw new Error(`eee-precheck: failed to read config ${configPath}: ${e.message}`); }
  try { return JSON.parse(raw); }
  catch (e) { throw new Error(`eee-precheck: failed to parse config ${configPath}: ${e.message}`); }
}

function buildRemediation(blocked) {
  if (!blocked.length) return '';
  const lines = ['eee-precheck BLOCKED — fix the following:'];
  for (const b of blocked) {
    lines.push(`  [${b.code}] ${b.detail}`);
    if (b.remediation) lines.push(`    → ${b.remediation}`);
  }
  return lines.join('\n');
}

function emit(result, opts) {
  if (opts.json) {
    process.stdout.write(JSON.stringify(result));
  } else {
    process.stdout.write(`[eee-precheck] mode=${result.mode} status=${result.status} elapsedMs=${result.elapsedMs}\n`);
    for (const t of result.tiers) {
      if (t.blocked.length) process.stdout.write(`  ${t.tier} BLOCKED: ${t.blocked.length} issue(s)\n`);
      if (t.healed.length) process.stdout.write(`  ${t.tier} HEALED:  ${t.healed.length} action(s)\n`);
      if (t.advisory.length) process.stdout.write(`  ${t.tier} advisory: ${t.advisory.length}\n`);
    }
    if (result.status === 'BLOCKED') process.stdout.write(`\n${result.remediation}\n`);
  }
}

async function main() {
  const t0 = Date.now();
  const args = parseArgs(process.argv);

  let config;
  try { config = loadConfig(args.config); }
  catch (e) {
    const result = {
      status: 'BLOCKED',
      mode: args.mode,
      elapsedMs: Date.now() - t0,
      tiers: [],
      blocked: [{ code: 'B-T0-CONFIG', detail: e.message, remediation: 'Ensure .eee/precheck-config.json exists and is valid JSON.' }],
      healed: [],
      advisory: [],
    };
    result.remediation = buildRemediation(result.blocked);
    emit(result, args);
    process.exit(3);
  }

  const modeSpec = config.modes?.[args.mode];
  if (!modeSpec) {
    const result = {
      status: 'BLOCKED',
      mode: args.mode,
      elapsedMs: Date.now() - t0,
      tiers: [],
      blocked: [{ code: 'B-T0-MODE', detail: `Unknown mode '${args.mode}'`, remediation: `Use one of: ${Object.keys(config.modes || {}).join(', ')}.` }],
      healed: [],
      advisory: [],
    };
    result.remediation = buildRemediation(result.blocked);
    emit(result, args);
    process.exit(3);
  }

  const tiers = [];
  const flatBlocked = [];
  const flatHealed = [];
  const flatAdvisory = [];

  for (const tierName of modeSpec.tiers || []) {
    const reg = TIER_REGISTRY[tierName];
    if (!reg) {
      // Codex r1 P2 finding #3: surface not-yet-implemented tiers as advisory instead of
      // silent skip. After Wave-2 PRs land, Wave-3 will flip this to internal-error.
      const noopResult = {
        tier: tierName,
        blocked: [],
        healed: [],
        advisory: [{
          code: `A-${tierName}-NOT-IMPLEMENTED`,
          detail: `Tier ${tierName} listed in modes.${args.mode}.tiers but not yet registered (Wave-2 PR pending). Skipped without checks.`,
        }],
      };
      tiers.push(noopResult);
      flatAdvisory.push(...noopResult.advisory);
      continue;
    }
    let tierResult;
    try {
      tierResult = await reg.run({ config, mode: args.mode, repoRoot: REPO_ROOT, env: process.env });
    } catch (e) {
      tierResult = {
        tier: tierName,
        blocked: [{ code: `B-${tierName}-INTERNAL`, detail: `Tier check threw: ${String(e?.message || e).slice(0, 240)}`, remediation: 'Re-run with --mode launch-fast; report to operator.' }],
        healed: [],
        advisory: [],
      };
    }
    tiers.push(tierResult);
    flatBlocked.push(...(tierResult.blocked || []));
    flatHealed.push(...(tierResult.healed || []));
    flatAdvisory.push(...(tierResult.advisory || []));
  }

  // W393.7 (W409) — Post-tier block-rules evaluation. Folds B1-B10 design-spec rules
  //   over the aggregated tier state: labels tier-emitted blocks with B-IDs (advisory) and
  //   surfaces probe-driven supplementary blocks (B4 docker / B9 stale MCP / B10 floating SHA)
  //   that the tier modules don't currently cover.
  let blockRulesResult;
  try {
    blockRulesResult = runBlockRules({
      state: { blocked: flatBlocked, healed: flatHealed, advisory: flatAdvisory },
      mode: args.mode,
      repoRoot: REPO_ROOT,
      env: process.env,
      config,
    });
  } catch (e) {
    blockRulesResult = {
      tier: 'BLOCK-RULES',
      blocked: [],
      healed: [],
      advisory: [{
        code: 'A-BR-INTERNAL',
        detail: `block-rules evaluation threw: ${String(e?.message || e).slice(0, 240)}`,
      }],
    };
  }
  tiers.push(blockRulesResult);
  flatBlocked.push(...(blockRulesResult.blocked || []));
  flatHealed.push(...(blockRulesResult.healed || []));
  flatAdvisory.push(...(blockRulesResult.advisory || []));

  const status = flatBlocked.length > 0 ? 'BLOCKED' : flatHealed.length > 0 ? 'HEALED' : 'OK';
  const result = {
    status,
    mode: args.mode,
    elapsedMs: Date.now() - t0,
    tiers,
    blocked: flatBlocked,
    healed: flatHealed,
    advisory: flatAdvisory,
  };
  if (status === 'BLOCKED') result.remediation = buildRemediation(flatBlocked);

  emit(result, args);
  process.exit(status === 'BLOCKED' ? 2 : 0);
}

main().catch(e => {
  process.stderr.write(`eee-precheck: fatal: ${String(e?.stack || e)}\n`);
  process.exit(3);
});
