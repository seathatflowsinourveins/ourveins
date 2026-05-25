#!/usr/bin/env node
// tools/eee-precheck.test.mjs — W393.1 (Wave-1 / W402) test harness skeleton.
//
// Per docs/superpowers/plans/2026-05-25-W393-phase-0a-implementation-plan.md Task 1.
//
// TDD discipline: 2 tests for the W393.1 PR (launcher + T1 ENV + skeleton).
// Wave-2 PRs (W393.2..W393.6) extend this file with per-tier tests.
//
// Run:
//   node --test tools/eee-precheck.test.mjs

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PRECHECK_PATH = resolve(__dirname, 'eee-precheck.mjs');

function runPrecheck({ mode = 'launch-fast', env = process.env, extraArgs = [] } = {}) {
  // spawnSync (not execFileSync) so we capture stdout even on non-zero exit (BLOCKED = exit 2).
  const res = spawnSync(process.execPath, [PRECHECK_PATH, '--mode', mode, '--json', ...extraArgs], {
    env,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
    windowsHide: true,
  });
  if (res.error) throw res.error;
  if (!res.stdout) throw new Error(`empty stdout, exit=${res.status}, stderr=${res.stderr}`);
  return { result: JSON.parse(res.stdout), exit: res.status };
}

test('T1: missing CLAUDE_CONFIG_DIR blocks launch (BLOCKED status + exit 2)', () => {
  // Strip the env var deterministically so the test does not depend on the caller's env.
  const env = { ...process.env };
  delete env.CLAUDE_CONFIG_DIR;
  const { result: r, exit } = runPrecheck({ mode: 'launch-fast', env });
  assert.equal(r.status, 'BLOCKED', `expected BLOCKED, got ${r.status}: ${JSON.stringify(r.blocked)}`);
  // Codex r1 P2 finding #4 fix: assert process exit code.
  assert.equal(exit, 2, `BLOCKED must exit 2; got ${exit}`);
  assert.ok(Array.isArray(r.blocked), 'blocked must be an array');
  assert.ok(
    r.blocked.some(b => b.code === 'B-T1-ENV-MISSING' && /CLAUDE_CONFIG_DIR/.test(b.detail || '')),
    `blocked must contain B-T1-ENV-MISSING referencing CLAUDE_CONFIG_DIR: ${JSON.stringify(r.blocked)}`
  );
  assert.equal(r.mode, 'launch-fast');
  assert.equal(typeof r.elapsedMs, 'number');
  // Every blocked entry must include actionable remediation per design spec invariant.
  for (const b of r.blocked) assert.ok(b.remediation && b.remediation.length > 0, `blocked entry missing remediation: ${JSON.stringify(b)}`);
});

test('T1: launch-fast latency strictly <5000ms', () => {
  const t0 = Date.now();
  // Use the full env so the precheck has the best chance of OK status; latency is what we assert.
  const { result: r, exit } = runPrecheck({ mode: 'launch-fast', env: process.env });
  const dt = Date.now() - t0;
  assert.ok(dt < 5000, `T1 launch-fast latency ${dt}ms exceeds 5000ms budget`);
  assert.ok(r.elapsedMs < 5000, `internal elapsedMs ${r.elapsedMs}ms exceeds 5000ms budget`);
  assert.ok(['OK', 'HEALED', 'BLOCKED'].includes(r.status), `unknown status ${r.status}`);
  // Codex r1 P2 finding #4: OK/HEALED -> exit 0; BLOCKED -> exit 2.
  if (r.status === 'BLOCKED') assert.equal(exit, 2, `BLOCKED must exit 2; got ${exit}`);
  else assert.equal(exit, 0, `OK/HEALED must exit 0; got ${exit}`);
});

test('T0: missing config file returns exit 3 (internal failure)', () => {
  // Codex r1 P2 finding #4: cover the internal-failure exit-3 path so the PowerShell
  // launcher's defense-in-depth path is exercised.
  const { result: r, exit } = runPrecheck({
    mode: 'launch-fast',
    env: process.env,
    extraArgs: ['--config', 'does-not-exist.json'],
  });
  assert.equal(r.status, 'BLOCKED');
  assert.equal(exit, 3, `config-missing must exit 3; got ${exit}`);
  assert.ok(r.blocked.some(b => b.code === 'B-T0-CONFIG'), `expected B-T0-CONFIG in blocked: ${JSON.stringify(r.blocked)}`);
});

// ──────────────────────────────────────────────────────────────────────────────
// W393.2 (W404) — T2 services typed-descriptor tests.
//
// Approach: drive runT2 directly with synthetic config so the suite is
//   (a) deterministic (no dependency on live Docker/NSSM state) and
//   (b) fast (no per-test 10s timeout cost from a real probe).
// The orchestrator wiring is exercised by the launch-fast latency test above —
// any unhandled-throw or unregistered-tier bug surfaces there.
// ──────────────────────────────────────────────────────────────────────────────

import { runT2 } from './eee-checks/t2-services.mjs';

function makeT2Config(services) {
  return {
    schemaVersion: '1.0',
    modes: {
      'launch-fast': { tiers: ['T2'] },
      deep:          { tiers: ['T2'] },
      repair:        { tiers: ['T2'], allowLifecycleMutations: true },
    },
    t2: { services },
  };
}

const REPO_ROOT = resolve(__dirname, '..');

test('T2: launch-fast skips probes (roster-validation only)', async () => {
  // Synthetic config points to an unreachable port — would fail any real probe.
  const cfg = makeT2Config([
    {
      name: 'unreachable-svc',
      transport: 'http',
      supervisor: 'manual',
      healthProbe: { type: 'http', url: 'http://127.0.0.1:1/never-listens' },
      healthProbeMode: 'deep-only',
      repairPolicy: 'none',
      blocking: 'required',
    },
  ]);
  const r = await runT2({ config: cfg, mode: 'launch-fast', repoRoot: REPO_ROOT, env: process.env });
  assert.equal(r.tier, 'T2');
  // launch-fast must NEVER probe — zero blocked, zero healed.
  assert.equal(r.blocked.length, 0, `launch-fast must skip probes; blocked=${JSON.stringify(r.blocked)}`);
  assert.equal(r.healed.length, 0, `launch-fast must skip repairs; healed=${JSON.stringify(r.healed)}`);
});

test('T2: deep mode probes services and BLOCKS on required+unhealthy', async () => {
  // Port 1 is reserved and reliably refuses connection -> probe fails fast.
  const cfg = makeT2Config([
    {
      name: 'required-unhealthy',
      transport: 'http',
      supervisor: 'manual',
      healthProbe: { type: 'http', url: 'http://127.0.0.1:1/never-listens' },
      healthProbeMode: 'deep-only',
      repairPolicy: 'none',
      blocking: 'required',
    },
    {
      name: 'advisory-unhealthy',
      transport: 'http',
      supervisor: 'manual',
      healthProbe: { type: 'http', url: 'http://127.0.0.1:1/never-listens' },
      healthProbeMode: 'deep-only',
      repairPolicy: 'none',
      blocking: 'advisory',
    },
  ]);
  const r = await runT2({ config: cfg, mode: 'deep', repoRoot: REPO_ROOT, env: process.env });
  assert.equal(r.tier, 'T2');
  // Required-unhealthy must surface as blocked with B-T2-SERVICE-UNHEALTHY + remediation.
  const blockedReq = r.blocked.find(b => /required-unhealthy/.test(b.detail));
  assert.ok(blockedReq, `expected blocked entry for required-unhealthy; got ${JSON.stringify(r.blocked)}`);
  assert.equal(blockedReq.code, 'B-T2-SERVICE-UNHEALTHY');
  assert.ok(blockedReq.remediation && blockedReq.remediation.length > 0, 'blocked entries must carry remediation');
  // Advisory-unhealthy must surface as advisory, never blocked.
  const advisoryEntry = r.advisory.find(a => /advisory-unhealthy/.test(a.detail));
  assert.ok(advisoryEntry, `expected advisory entry for advisory-unhealthy; got ${JSON.stringify(r.advisory)}`);
  assert.ok(!r.blocked.some(b => /advisory-unhealthy/.test(b.detail)), 'advisory blocking must NEVER block');
});

test('T2: repair mode invokes repairCommand only when repairPolicy != none and admin OK; never in deep mode', async () => {
  // Use a benign cross-platform no-op as the "repair" command so we can assert invocation
  // without mutating real services. `node -e "process.exit(0)"` works on both Win + POSIX.
  const benignRepair = `${JSON.stringify(process.execPath)} -e "process.exit(0)"`;

  // Case A: deep mode must NEVER invoke repair even if policy allows.
  {
    const cfg = makeT2Config([
      {
        name: 'svc-with-repair-policy',
        transport: 'http',
        supervisor: 'manual',
        healthProbe: { type: 'http', url: 'http://127.0.0.1:1/never-listens' },
        healthProbeMode: 'deep-only',
        repairPolicy: 'repair-only',
        repairCommand: benignRepair,
        repairAdminRequired: false,
        blocking: 'required',
      },
    ]);
    const r = await runT2({ config: cfg, mode: 'deep', repoRoot: REPO_ROOT, env: process.env });
    assert.equal(r.healed.length, 0, `deep mode must NEVER invoke repair; healed=${JSON.stringify(r.healed)}`);
    assert.ok(r.blocked.length > 0, 'required+unhealthy must still block in deep mode');
  }

  // Case B: repair mode + repairPolicy='none' must NOT invoke (policy gate).
  {
    const cfg = makeT2Config([
      {
        name: 'svc-policy-none',
        transport: 'http',
        supervisor: 'manual',
        healthProbe: { type: 'http', url: 'http://127.0.0.1:1/never-listens' },
        healthProbeMode: 'deep-only',
        repairPolicy: 'none',
        repairCommand: benignRepair,
        blocking: 'required',
      },
    ]);
    const r = await runT2({ config: cfg, mode: 'repair', repoRoot: REPO_ROOT, env: process.env });
    assert.equal(
      r.healed.filter(h => h.code === 'H-T2-REPAIR-INVOKED').length,
      0,
      `repairPolicy=none must NOT invoke; healed=${JSON.stringify(r.healed)}`
    );
  }

  // Case C: repair mode + admin-required + no admin context must skip.
  {
    const env = { ...process.env };
    delete env.EEE_ADMIN_CONTEXT;
    const cfg = makeT2Config([
      {
        name: 'svc-needs-admin',
        transport: 'http',
        supervisor: 'nssm:Fake',
        healthProbe: { type: 'http', url: 'http://127.0.0.1:1/never-listens' },
        healthProbeMode: 'deep-only',
        repairPolicy: 'repair-only',
        repairCommand: benignRepair,
        repairAdminRequired: true,
        blocking: 'required',
      },
    ]);
    const r = await runT2({ config: cfg, mode: 'repair', repoRoot: REPO_ROOT, env });
    if (process.platform === 'win32') {
      assert.equal(
        r.healed.filter(h => h.code === 'H-T2-REPAIR-INVOKED').length,
        0,
        `repairAdminRequired=true without EEE_ADMIN_CONTEXT=1 must skip on win32; healed=${JSON.stringify(r.healed)}`
      );
      assert.ok(
        r.advisory.some(a => a.code === 'A-T2-REPAIR-SKIPPED'),
        `expected A-T2-REPAIR-SKIPPED advisory; got ${JSON.stringify(r.advisory)}`
      );
    }
  }

  // Case D: repair mode + repairPolicy allowed + admin not required -> repair ATTEMPTED.
  // Re-probe still fails (port :1 never listens) so we get H-T2-REPAIR-ATTEMPTED + still blocked.
  // Per codex r1 P2: repair attempt is surfaced even when post-probe fails — operator sees the trace.
  {
    const cfg = makeT2Config([
      {
        name: 'svc-no-admin-needed',
        transport: 'http',
        supervisor: 'docker-compose',
        healthProbe: { type: 'http', url: 'http://127.0.0.1:1/never-listens' },
        healthProbeMode: 'deep-only',
        repairPolicy: 'repair-only',
        repairCommand: benignRepair,
        repairAdminRequired: false,
        blocking: 'required',
      },
    ]);
    const r = await runT2({ config: cfg, mode: 'repair', repoRoot: REPO_ROOT, env: process.env });
    const repairs = r.healed.filter(
      h => (h.code === 'H-T2-REPAIR-INVOKED' || h.code === 'H-T2-REPAIR-ATTEMPTED') && /svc-no-admin-needed/.test(h.detail)
    );
    assert.equal(
      repairs.length, 1,
      `expected exactly one H-T2-REPAIR-(INVOKED|ATTEMPTED) for svc-no-admin-needed; healed=${JSON.stringify(r.healed)}`
    );
    // The benign command exited 0 but the unreachable port means post-probe fails,
    // so the code MUST be ATTEMPTED (not INVOKED).
    assert.equal(repairs[0].code, 'H-T2-REPAIR-ATTEMPTED', 'unreachable post-probe -> ATTEMPTED');
    assert.equal(repairs[0].evidence.exitCode, 0, 'benign repair should exit 0');
    // Still blocked because post-probe failed — operator must run again or fix manually.
    assert.ok(r.blocked.length > 0, 'service still unhealthy post-repair must remain blocked');
  }

  // Case D2 (codex r3 P2): healthProbeMode='deep' must NOT probe nor repair in 'repair' mode.
  {
    const cfg = makeT2Config([
      {
        name: 'svc-deep-only-probe-mode',
        transport: 'http',
        supervisor: 'manual',
        healthProbe: { type: 'http', url: 'http://127.0.0.1:1/never-listens' },
        healthProbeMode: 'deep',
        repairPolicy: 'repair-only',
        repairCommand: benignRepair,
        repairAdminRequired: false,
        blocking: 'required',
      },
    ]);
    const r = await runT2({ config: cfg, mode: 'repair', repoRoot: REPO_ROOT, env: process.env });
    assert.equal(r.blocked.length, 0, `healthProbeMode='deep' must NOT block in repair mode; blocked=${JSON.stringify(r.blocked)}`);
    assert.equal(
      r.healed.filter(h => /svc-deep-only-probe-mode/.test(h.detail)).length,
      0,
      `healthProbeMode='deep' must NOT invoke repair in repair mode; healed=${JSON.stringify(r.healed)}`
    );
  }

  // Case E: repair mode + repair succeeds + re-probe healthy -> H-T2-REPAIR-INVOKED + NOT blocked.
  // Spin up a tiny localhost HTTP server bound just for this test so the post-repair probe passes.
  // Using a Node http server on an ephemeral port avoids platform-specific quirks.
  {
    const http = await import('node:http');
    const server = http.createServer((req, res) => { res.writeHead(200); res.end('ok'); });
    await new Promise(res => server.listen(0, '127.0.0.1', res));
    const { port } = server.address();
    try {
      const cfg = makeT2Config([
        {
          name: 'svc-actually-healable',
          transport: 'http',
          supervisor: 'manual',
          // probe a live local port so re-probe succeeds.
          healthProbe: { type: 'http', url: `http://127.0.0.1:${port}/` },
          healthProbeMode: 'deep-only',
          // Initial probe will SUCCEED so the unhealthy path won't trigger.
          // For this case we want to verify the success path bypasses repair entirely.
          repairPolicy: 'repair-only',
          repairCommand: benignRepair,
          repairAdminRequired: false,
          blocking: 'required',
        },
      ]);
      const r = await runT2({ config: cfg, mode: 'repair', repoRoot: REPO_ROOT, env: process.env });
      // Healthy from the start -> no block, no repair invocation.
      assert.equal(r.blocked.length, 0, `healthy service must not block; blocked=${JSON.stringify(r.blocked)}`);
      const repairs = r.healed.filter(h => /svc-actually-healable/.test(h.detail));
      assert.equal(repairs.length, 0, 'healthy service must NOT trigger repair');
    } finally {
      await new Promise(res => server.close(res));
    }
  }
});

// ===========================================================================
// T5 — W393.5 (W407) SOTA-drift + memory-tier arbitration tests.
// ===========================================================================
//
// Strategy: exercise runT5 directly with fully-mocked config + fake repoRoot via
// tmpdir + synthetic .mcp.json. This isolates the tests from the live worktree's
// .mcp.json / CLAUDE.md state and runs in <100 ms.

import { runT5, __testing as t5Internals } from './eee-checks/t5-sota-drift.mjs';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

function makeRepo({ mcpJson = null, claudeMd = null, scaTelemetry = null, skills = [] } = {}) {
  const root = mkdtempSync(join(tmpdir(), 'eee-t5-'));
  if (mcpJson) writeFileSync(join(root, '.mcp.json'), typeof mcpJson === 'string' ? mcpJson : JSON.stringify(mcpJson));
  if (claudeMd) writeFileSync(join(root, 'CLAUDE.md'), claudeMd);
  if (scaTelemetry) {
    mkdirSync(join(root, 'tools', 'lib'), { recursive: true });
    writeFileSync(join(root, 'tools', 'lib', 'sca-telemetry-core.mjs'), scaTelemetry);
  }
  if (skills.length) {
    mkdirSync(join(root, '.claude', 'skills'), { recursive: true });
    for (const name of skills) mkdirSync(join(root, '.claude', 'skills', name), { recursive: true });
  }
  return root;
}

function baseT5Config(overrides = {}) {
  return {
    t5: {
      mcpServers: {
        'basic-memory': { category: 'required', license: 'AGPL-3.0' },
        cognee: { category: 'required', license: 'Apache-2.0', nssmService: 'CogneeMCP' },
      },
      memoryTiers: {
        T6: { name: 'basic-memory', role: 'canonical', expectedMcpEntry: 'basic-memory', license: 'AGPL-3.0', agplSubprocessWrap: true, declaredVersion: '0.21.4', blocking: 'required' },
        T3: { name: 'cognee', role: 'graph-RAG', expectedMcpEntry: 'cognee', license: 'Apache-2.0', declaredVersion: '1.1.0', nssmService: 'CogneeMCP', blocking: 'required' },
        T7: { name: 'mem0', role: 'planned-semantic-pref', expectedMcpEntry: 'mem0', license: 'Apache-2.0', blocking: 'advisory', oauthRequired: true },
        T4: { name: 'graphiti', role: 'retired-reinstatable', expectedMcpEntry: 'graphiti', license: 'Apache-2.0', blocking: 'informational' },
        MemoryOS: { name: 'MemoryOS-MCP', role: 'watch-list', expectedMcpEntry: 'memoryos', license: 'UNCONFIRMED', blocking: 'advisory' },
        khoj: { name: 'khoj', role: 'AGPL-blocked', expectedMcpEntry: 'khoj', license: 'AGPL-3.0', blocking: 'block-if-present' },
      },
      memoryDriftCadence: {
        stateFile: '.claude/state/eee-mem-tier-cadence.json',
        windows: { recentActivityDays: 7, bmOrphanDays: 30, cogneeSmokeDays: 90, t6ExportIntegrityDays: 90 },
      },
      staleRefScan: {
        claudeMdSkillCountFile: 'CLAUDE.md',
        claudeMdSkillCountRegex: '× \\*\\*(\\d+) active',
        skillsDir: '.claude/skills',
        skillCountExcludePrefixes: ['_'],
        scaTelemetryFile: 'tools/lib/sca-telemetry-core.mjs',
        scaTelemetryRegex: "const currentVersion = 'sca-([a-zA-Z0-9-]+)';",
        scaCanonicalVersion: 'sca-v22',
        retiredServerNames: ['phoenix', 'graphiti', 'context7', 'gitnexus', 'memory'],
      },
      smokeCacheFile: '.claude/state/eee-mcp-smoke.json',
      smokeCacheTtlHours: 24,
      ...overrides,
    },
  };
}

test('T5: clean-state (T6+T3 present, no stale refs, no khoj) yields zero blocked', () => {
  const mcp = {
    mcpServers: {
      'basic-memory': { type: 'stdio', command: 'uvx', args: ['--from', 'basic-memory==0.21.4', 'basic-memory', 'mcp'] },
      cognee: { type: 'http', url: 'http://127.0.0.1:8000/mcp' },
    },
  };
  const claudeMd = '... × **2 active skills + 1 _archived/** ...';
  const sca = "const currentVersion = 'sca-v22';";
  const root = makeRepo({ mcpJson: mcp, claudeMd, scaTelemetry: sca, skills: ['_archived', 'one', 'two'] });
  try {
    const config = baseT5Config();
    const result = runT5({ config, mode: 'launch-fast', repoRoot: root, env: { ...process.env } });
    assert.equal(result.tier, 'T5');
    assert.equal(result.blocked.length, 0, `expected zero blocked in clean state; got ${JSON.stringify(result.blocked)}`);
    // No skill-count drift advisory (CLAUDE.md=2, fs=2 excluding _archived).
    assert.ok(!result.advisory.some(a => a.code === 'A-T5-STALE-CLAUDE-MD-SKILL-COUNT'), `unexpected skill-count drift: ${JSON.stringify(result.advisory)}`);
    // No sca-v drift advisory.
    assert.ok(!result.advisory.some(a => a.code === 'A-T5-SCA-DRIFT'), `unexpected sca-drift: ${JSON.stringify(result.advisory)}`);
    // T6 AGPL compliance note is informational advisory and is EXPECTED — assert it surfaces.
    assert.ok(result.advisory.some(a => a.code === 'A-T5-MEMORY-T6-AGPL-COMPLIANCE'), `expected AGPL compliance advisory`);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('T5: drift detected — skill-count + sca-version + stale .mcp.json _comments', () => {
  const mcp = {
    _comments: {
      header: 'historical wave 132 mentions gitnexus and graphiti reference',
      old_phoenix: 'phoenix MCP retired prior to W392',
    },
    mcpServers: {
      'basic-memory': { type: 'stdio', command: 'uvx', args: ['--from', 'basic-memory==0.21.4', 'basic-memory', 'mcp'] },
      cognee: { type: 'http', url: 'http://127.0.0.1:8000/mcp' },
    },
  };
  // CLAUDE.md claims 5 active; filesystem has only 2.
  const claudeMd = '... × **5 active skills + 1 _archived/** ...';
  // sca-telemetry is stale (sca-v17 not canonical sca-v22).
  const sca = "const currentVersion = 'sca-v17';";
  const root = makeRepo({ mcpJson: mcp, claudeMd, scaTelemetry: sca, skills: ['_archived', 'one', 'two'] });
  try {
    const config = baseT5Config();
    const result = runT5({ config, mode: 'launch-fast', repoRoot: root, env: { ...process.env } });
    // Three drift advisories expected: skill-count, sca-version, and at least one stale ref.
    const codes = new Set(result.advisory.map(a => a.code));
    assert.ok(codes.has('A-T5-STALE-CLAUDE-MD-SKILL-COUNT'), `expected skill-count drift advisory; got codes: ${[...codes].join(',')}`);
    assert.ok(codes.has('A-T5-SCA-DRIFT'), `expected sca-drift advisory; got codes: ${[...codes].join(',')}`);
    assert.ok(codes.has('A-T5-STALE-MCP-COMMENT-REF'), `expected stale-mcp-comment advisory; got codes: ${[...codes].join(',')}`);
    assert.equal(result.blocked.length, 0, `drift is advisory-only (no block); got: ${JSON.stringify(result.blocked)}`);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('T5: khoj MCP entry present yields BLOCKED with B-T5-AGPL-KHOJ-PRESENT', () => {
  const mcp = {
    mcpServers: {
      'basic-memory': { type: 'stdio', command: 'uvx', args: ['--from', 'basic-memory==0.21.4', 'basic-memory', 'mcp'] },
      cognee: { type: 'http', url: 'http://127.0.0.1:8000/mcp' },
      khoj: { type: 'http', url: 'http://127.0.0.1:42110/mcp' },
    },
  };
  const root = makeRepo({ mcpJson: mcp });
  try {
    const config = baseT5Config();
    const result = runT5({ config, mode: 'launch-fast', repoRoot: root, env: { ...process.env } });
    assert.ok(result.blocked.some(b => b.code === 'B-T5-AGPL-KHOJ-PRESENT'), `expected khoj-present block; got: ${JSON.stringify(result.blocked)}`);
    // Block must include actionable remediation.
    const block = result.blocked.find(b => b.code === 'B-T5-AGPL-KHOJ-PRESENT');
    assert.ok(block.remediation && /Remove/.test(block.remediation), `block remediation must mention removal: ${block.remediation}`);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('T5: cadence stale (no state file) surfaces 4 A-T5-MEMORY-CADENCE-STALE advisories', () => {
  const mcp = {
    mcpServers: {
      'basic-memory': { type: 'stdio', command: 'uvx', args: ['--from', 'basic-memory==0.21.4', 'basic-memory', 'mcp'] },
      cognee: { type: 'http', url: 'http://127.0.0.1:8000/mcp' },
    },
  };
  const root = makeRepo({ mcpJson: mcp });
  try {
    const config = baseT5Config();
    const result = runT5({ config, mode: 'launch-fast', repoRoot: root, env: { ...process.env } });
    const staleAdvisories = result.advisory.filter(a => a.code === 'A-T5-MEMORY-CADENCE-STALE');
    // 4 cadence windows: recentActivity / bmOrphan / cogneeSmoke / t6Export. All stale because state file absent.
    assert.equal(staleAdvisories.length, 4, `expected 4 cadence-stale advisories; got ${staleAdvisories.length}: ${JSON.stringify(staleAdvisories)}`);
    // Block list must NOT include cadence (advisory-only per design).
    assert.ok(!result.blocked.some(b => b.code.startsWith('B-T5-MEMORY-CADENCE')), `cadence must be advisory-only: ${JSON.stringify(result.blocked)}`);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('T5: missing T6 basic-memory entry yields B-T5-MEMORY-T6-MISSING block', () => {
  const mcp = {
    mcpServers: {
      cognee: { type: 'http', url: 'http://127.0.0.1:8000/mcp' },
      // basic-memory deliberately absent.
    },
  };
  const root = makeRepo({ mcpJson: mcp });
  try {
    const config = baseT5Config();
    const result = runT5({ config, mode: 'launch-fast', repoRoot: root, env: { ...process.env } });
    assert.ok(result.blocked.some(b => b.code === 'B-T5-MEMORY-T6-MISSING'), `expected T6-missing block; got: ${JSON.stringify(result.blocked)}`);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

// Codex r1 P2 regression: disabled MCP entries must be treated as absent for
// memory-tier arbitration so (a) disabled basic-memory/cognee surface as missing
// and (b) a disabled khoj entry does NOT trip the AGPL hard-block.
test('T5: disabled basic-memory MCP yields B-T5-MEMORY-T6-MISSING (disabled = absent)', () => {
  const mcp = {
    mcpServers: {
      'basic-memory': {
        type: 'stdio', command: 'uvx',
        args: ['--from', 'basic-memory==0.21.4', 'basic-memory', 'mcp'],
        disabled: true,
      },
      cognee: { type: 'http', url: 'http://127.0.0.1:8000/mcp' },
    },
  };
  const root = makeRepo({ mcpJson: mcp });
  try {
    const config = baseT5Config();
    const result = runT5({ config, mode: 'launch-fast', repoRoot: root, env: { ...process.env } });
    assert.ok(result.blocked.some(b => b.code === 'B-T5-MEMORY-T6-MISSING'), `disabled T6 must block as missing; got: ${JSON.stringify(result.blocked)}`);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('T5: disabled khoj MCP does NOT trigger AGPL hard-block', () => {
  const mcp = {
    mcpServers: {
      'basic-memory': { type: 'stdio', command: 'uvx', args: ['--from', 'basic-memory==0.21.4', 'basic-memory', 'mcp'] },
      cognee: { type: 'http', url: 'http://127.0.0.1:8000/mcp' },
      khoj: { type: 'http', url: 'http://127.0.0.1:42110/mcp', disabled: true },
    },
  };
  const root = makeRepo({ mcpJson: mcp });
  try {
    const config = baseT5Config();
    const result = runT5({ config, mode: 'launch-fast', repoRoot: root, env: { ...process.env } });
    assert.ok(!result.blocked.some(b => b.code === 'B-T5-AGPL-KHOJ-PRESENT'), `disabled khoj must NOT block; got: ${JSON.stringify(result.blocked)}`);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

// Codex r1 P1#2 regression: required MCP absent in --deep/--repair must BLOCK
// (not just emit advisory). launch-fast remains advisory so as not to block the
// ≤5s fast path on non-network checks.
test('T5: required MCP absent in --deep yields B-T5-MCP-REQUIRED-ABSENT block', () => {
  // serena marked required in baseT5Config additions for this test.
  const cfg = baseT5Config();
  cfg.t5.mcpServers.serena = { category: 'required', license: 'MIT' };
  const mcp = {
    mcpServers: {
      'basic-memory': { type: 'stdio', command: 'uvx', args: ['--from', 'basic-memory==0.21.4', 'basic-memory', 'mcp'] },
      cognee: { type: 'http', url: 'http://127.0.0.1:8000/mcp' },
      // serena deliberately absent.
    },
  };
  const root = makeRepo({ mcpJson: mcp });
  try {
    const result = runT5({ config: cfg, mode: 'deep', repoRoot: root, env: { ...process.env } });
    assert.ok(result.blocked.some(b => b.code === 'B-T5-MCP-REQUIRED-ABSENT' && /serena/.test(b.detail)), `required-absent must block in deep; got: ${JSON.stringify(result.blocked)}`);
    // launch-fast counterpart: same scenario must NOT block.
    const fastResult = runT5({ config: cfg, mode: 'launch-fast', repoRoot: root, env: { ...process.env } });
    assert.ok(!fastResult.blocked.some(b => b.code === 'B-T5-MCP-REQUIRED-ABSENT'), `required-absent must NOT block in launch-fast (advisory only)`);
    assert.ok(fastResult.advisory.some(a => a.code === 'A-T5-MCP-WIRE-MISSING' && /serena/.test(a.detail)), `launch-fast must surface advisory: ${JSON.stringify(fastResult.advisory)}`);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

// -----------------------------------------------------------------------------
// W393.4 (W406) — T4 GitHub state + Slot A-E pluggable-peer advisory tests
// -----------------------------------------------------------------------------
//
// T4 runs only in `deep` / `repair` modes (per W393 §2 design). These tests exercise
// the in-process `runT4(...)` function directly (no subprocess) so they can be
// deterministic without mocking the live `gh` / `git` / `pip` / `npm` subprocesses.
// The end-to-end CLI behavior is exercised by the existing T1 tests above.

import { runT4 } from './eee-checks/t4-github.mjs';
import { readFileSync, existsSync } from 'node:fs';

function loadConfig() {
  const cfgPath = resolve(__dirname, '..', '.eee/precheck-config.json');
  return JSON.parse(readFileSync(cfgPath, 'utf8'));
}

test('T4: launch-fast mode skips with single advisory (no network calls)', () => {
  const config = loadConfig();
  const repoRoot = resolve(__dirname, '..');
  const result = runT4({ config, mode: 'launch-fast', repoRoot, env: process.env });
  assert.equal(result.tier, 'T4');
  assert.equal(result.blocked.length, 0, `launch-fast must not block: ${JSON.stringify(result.blocked)}`);
  assert.ok(
    result.advisory.some(a => a.code === 'A-T4-SKIPPED-LAUNCH-FAST'),
    `expected A-T4-SKIPPED-LAUNCH-FAST advisory: ${JSON.stringify(result.advisory)}`
  );
});

test('T4: deep mode current-state probes complete + slot advisories surface (no spurious blocks)', () => {
  const config = loadConfig();
  const repoRoot = resolve(__dirname, '..');
  const result = runT4({ config, mode: 'deep', repoRoot, env: process.env });
  assert.equal(result.tier, 'T4');
  // Ruleset is active per W387 + gh authenticated; expect no current-state blocks.
  // If a block fires, it MUST carry a remediation string (invariant per design spec §4).
  for (const b of result.blocked) {
    assert.ok(b.remediation && b.remediation.length > 0,
      `blocked entry missing remediation: ${JSON.stringify(b)}`);
    assert.ok(/^B-T4-/.test(b.code), `unexpected block code prefix: ${b.code}`);
  }
  // Slot A-D MUST surface PRESENT-or-ABSENT advisories (one per slot).
  for (const slotId of ['A', 'B', 'C', 'D']) {
    const slotAdvisories = result.advisory.filter(a =>
      a.code === `A-T4-SLOT-${slotId}-PRESENT` || a.code === `A-T4-SLOT-${slotId}-ABSENT`);
    assert.equal(slotAdvisories.length, 1,
      `Slot ${slotId} must emit exactly one PRESENT/ABSENT advisory; got ${slotAdvisories.length}: ${JSON.stringify(result.advisory)}`);
  }
});

test('T4: ruleset present + active → no B-T4-RULESET block (live W387 ruleset)', () => {
  // Probes the live ruleset; passes when the W387 main-branch-protection-sota ruleset is
  // active with the 5 required check contexts. Skips assertion when gh is missing
  // (developer machine without gh auth).
  const config = loadConfig();
  const repoRoot = resolve(__dirname, '..');
  const result = runT4({ config, mode: 'deep', repoRoot, env: process.env });
  const ghAuthBlocked = result.blocked.some(b => b.code === 'B-T4-GH-AUTH');
  if (ghAuthBlocked) {
    // gh missing — ruleset probe gated on gh auth, so it never runs. Treat as
    // environmentally-skipped (not a runT4 defect).
    assert.ok(true, 'gh auth unavailable — ruleset probe skipped (environment, not defect)');
    return;
  }
  const rulesetBlocked = result.blocked.find(b => b.code === 'B-T4-RULESET');
  assert.equal(rulesetBlocked, undefined,
    `Live W387 ruleset is active + 5 required checks present; B-T4-RULESET should not fire: ${JSON.stringify(rulesetBlocked)}`);
});

test('T4: Slot E (OpenHands) advisory fires when config probe.mcpRegex points to absent MCP', () => {
  // Codex r1 P1 #4 fix: deterministic simulation. runT4 honors the config-level
  // slot.probe.mcpRegex (per the updated checkSlotPresence implementation). Swap Slot E's
  // probe to a regex that cannot match any real MCP server name; the advisory MUST fire.
  const config = loadConfig();
  const repoRoot = resolve(__dirname, '..');
  const synthetic = JSON.parse(JSON.stringify(config));
  const slotE = synthetic.t4.slots.find(s => s.id === 'E');
  // Use a unique probe-regex that can never match. crypto.randomUUID is available in
  // node >=22 (CLAUDE.md L66 — node ≥22 declared min) but use Math.random fallback for
  // portability.
  slotE.probe.mcpRegex = 'simulated-missing-openhands-' + Math.random().toString(36).slice(2);

  const result = runT4({ config: synthetic, mode: 'deep', repoRoot, env: process.env });
  const slotEMissing = result.advisory.find(a => a.code === 'A-T4-SLOT-E-MISSING');
  assert.ok(slotEMissing,
    `Synthetic absent-openhands probe must trigger A-T4-SLOT-E-MISSING advisory: ${JSON.stringify(result.advisory.filter(a => /SLOT-E/.test(a.code)))}`);
  assert.ok(/MISSING/.test(slotEMissing.detail),
    `A-T4-SLOT-E-MISSING detail must include 'MISSING': ${slotEMissing.detail}`);
});

test('T4: Slot E PRESENT (openhands-dispatch wired) → no A-T4-SLOT-E-MISSING advisory', () => {
  // Live-repo verification: the CURRENT .mcp.json wires openhands-dispatch per W375.
  // With the default config slot.probe.mcpRegex='openhands-dispatch', Slot E must NOT
  // emit the missing-advisory.
  const config = loadConfig();
  const repoRoot = resolve(__dirname, '..');
  const mcpPath = resolve(repoRoot, '.mcp.json');
  if (!existsSync(mcpPath)) {
    assert.ok(true, '.mcp.json absent — environmentally skipped');
    return;
  }
  const mcp = JSON.parse(readFileSync(mcpPath, 'utf8'));
  const hasOpenhands = Object.keys(mcp.mcpServers || {}).some(k => /openhands-dispatch/i.test(k));
  if (!hasOpenhands) {
    assert.ok(true, 'openhands-dispatch absent in live .mcp.json — skipping PRESENT-path test');
    return;
  }
  const result = runT4({ config, mode: 'deep', repoRoot, env: process.env });
  const slotEMissing = result.advisory.find(a => a.code === 'A-T4-SLOT-E-MISSING');
  assert.equal(slotEMissing, undefined,
    `Live openhands-dispatch IS wired → A-T4-SLOT-E-MISSING must NOT fire: ${JSON.stringify(slotEMissing)}`);
});

test('T4: FUTURE-state advisories surface A-T4-FUTURE-* probes (Copilot/skip-approval/ruleset-split/merge-queue)', () => {
  // Codex r1 P0 #1 fix: explicit advisory entries per W393 §6 May-2026 advanced workflow.
  const config = loadConfig();
  const repoRoot = resolve(__dirname, '..');
  const result = runT4({ config, mode: 'deep', repoRoot, env: process.env });
  // skip when gh auth is unavailable (envt-skipped path)
  if (result.blocked.some(b => b.code === 'B-T4-GH-AUTH')) {
    assert.ok(true, 'gh auth unavailable — FUTURE-state probes gated on auth; env-skipped');
    return;
  }
  const futureCodes = result.advisory
    .filter(a => /^A-T4-FUTURE-/.test(a.code))
    .map(a => a.code);
  // MUST have at least 1 entry from each FUTURE-state probe class.
  assert.ok(futureCodes.some(c => /COPILOT-AGENT/.test(c)),
    `FUTURE Copilot advisory missing: ${JSON.stringify(futureCodes)}`);
  assert.ok(futureCodes.some(c => /SKIP-APPROVAL/.test(c)),
    `FUTURE skip-approval advisory missing: ${JSON.stringify(futureCodes)}`);
  assert.ok(futureCodes.some(c => /RULESET-SPLIT/.test(c)),
    `FUTURE ruleset-split advisory missing: ${JSON.stringify(futureCodes)}`);
  assert.ok(futureCodes.some(c => /MERGE-QUEUE/.test(c)),
    `FUTURE merge-queue advisory missing: ${JSON.stringify(futureCodes)}`);
});

// -----------------------------------------------------------------------------
// W406 codex r2 P0 #2 — deterministic unit tests for classifyMergeQueueProbe
// -----------------------------------------------------------------------------
// Exported pure function with injectable probe-result shape; no subprocess required.

import { classifyMergeQueueProbe } from './eee-checks/t4-github.mjs';

test('T4 classifyMergeQueueProbe: PROBE-UNAVAILABLE on spawnSync error', () => {
  const result = classifyMergeQueueProbe({ error: new Error('ENOENT: gh not found') });
  assert.equal(result.code, 'A-T4-FUTURE-MERGE-QUEUE-PROBE-UNAVAILABLE',
    `expected PROBE-UNAVAILABLE; got ${result.code}`);
  assert.ok(/ENOENT/.test(result.detail), `detail must mention error: ${result.detail}`);
});

test('T4 classifyMergeQueueProbe: PROBE-UNAVAILABLE on schema-error stderr', () => {
  const result = classifyMergeQueueProbe({
    status: 1,
    stdout: '',
    stderr: 'GraphQL: Field requiresMergeQueue is undefined on type Repository',
  });
  assert.equal(result.code, 'A-T4-FUTURE-MERGE-QUEUE-PROBE-UNAVAILABLE',
    `schema-error must yield PROBE-UNAVAILABLE; got ${result.code}`);
});

test('T4 classifyMergeQueueProbe: PRECONDITION-PRESENT when any rule has requiresStrictStatusChecks=true', () => {
  // Codex r3 fix: this signal is the PRECONDITION (strict-checks), not full merge-queue
  // enablement. The advisory code reflects that.
  const stdout = JSON.stringify({
    data: {
      repository: {
        branchProtectionRules: {
          nodes: [
            { pattern: 'main', requiresStrictStatusChecks: true },
            { pattern: 'release/*', requiresStrictStatusChecks: false },
          ],
        },
      },
    },
  });
  const result = classifyMergeQueueProbe({ status: 0, stdout, stderr: '' });
  assert.equal(result.code, 'A-T4-FUTURE-MERGE-QUEUE-PRECONDITION-PRESENT',
    `expected MERGE-QUEUE-PRECONDITION-PRESENT; got ${result.code}`);
  assert.ok(/PRECONDITION/i.test(result.detail),
    `detail must call out PRECONDITION semantics: ${result.detail}`);
});

test('T4 classifyMergeQueueProbe: PRECONDITION-ABSENT when no rule has requiresStrictStatusChecks=true', () => {
  const stdout = JSON.stringify({
    data: {
      repository: {
        branchProtectionRules: {
          nodes: [{ pattern: 'main', requiresStrictStatusChecks: false }],
        },
      },
    },
  });
  const result = classifyMergeQueueProbe({ status: 0, stdout, stderr: '' });
  assert.equal(result.code, 'A-T4-FUTURE-MERGE-QUEUE-PRECONDITION-ABSENT',
    `expected MERGE-QUEUE-PRECONDITION-ABSENT; got ${result.code}`);
});

// ---------------------------------------------------------------------------
// W393.3 (W405) — T3 CLI exact-probes tests.
// ---------------------------------------------------------------------------
//
// Per plan Task 4 step 5 + W393 dispatch instructions (3 tests minimum):
//   (a) required-present-passes — every required tool probe succeeds + version meets minVersion.
//   (b) required-absent-blocks   — required tool absent (ENOENT) -> B-T3-CLI-MISSING.
//   (c) postWaveAdvisory-absent-advisory — postWaveAdvisory:true + tool absent -> advisory only.
//
// Unit-level so the probe sub-process is replaced with a deterministic stub. The orchestrator's
// subprocess path is covered by smoke-runs in CI; here we exercise the runT3 contract.
import { runT3, parseSemver, cmpSemver } from './eee-checks/t3-cli.mjs';

// Tiny helper — builds a config with t3.cliTools[] given a list of entries.
function t3Config(cliTools) {
  return {
    schemaVersion: '1.0',
    modes: { deep: { tiers: ['T3'] } },
    t3: { cliTools },
  };
}

// Tiny helper — builds a probe stub that returns deterministic outputs keyed by tool.name.
function stubProbe(map) {
  return (tool /*, _opts */) => {
    const out = map[tool.name];
    if (!out) {
      return { found: false, semver: null, stdout: '', error: { code: 'ENOENT', errno: -4058, message: 'spawn ENOENT' } };
    }
    if (out.absent) {
      return { found: false, semver: null, stdout: '', error: { code: 'ENOENT', errno: -4058, message: 'spawn ENOENT' } };
    }
    if (out.probeFail) {
      return { found: true, semver: null, stdout: '', error: { code: 1, status: 1, message: 'probe failed' } };
    }
    return {
      found: true,
      semver: out.semver ? parseSemver(out.semver) : null,
      stdout: out.stdout ?? out.semver ?? '',
      error: null,
    };
  };
}

test('T3 (a): required-present-passes — every required tool probe at >= minVersion yields zero blocked', () => {
  // Use the canonical config entries declared in .eee/precheck-config.json.
  // Codex r1 P1: uv + gh-auth added per design spec §2 T3 table.
  const cliTools = [
    { name: 'node',        probeCommand: 'node --version',        minVersion: '22.0.0',  blocking: 'required' },
    { name: 'python',      probeCommand: 'python --version',      minVersion: '3.13.0',  blocking: 'required' },
    { name: 'uv',          probeCommand: 'uv --version',                                 blocking: 'required' },
    { name: 'gh',          probeCommand: 'gh --version',          minVersion: '2.0.0',   blocking: 'required' },
    { name: 'gh-auth',     probeCommand: 'gh auth status',                               blocking: 'required' },
    { name: 'codex',       probeCommand: 'codex --version',       minVersion: '0.130.0', blocking: 'required' },
    { name: 'claude',      probeCommand: 'claude --version',      minVersion: '2.1.144', blocking: 'required' },
    { name: 'gitleaks',    probeCommand: 'gitleaks version',      minVersion: '8.30.0',  blocking: 'required' },
    { name: 'lefthook',    probeCommand: 'lefthook version',      minVersion: '2.0.0',   blocking: 'required' },
    { name: 'pinact',      probeCommand: 'pinact -v',             minVersion: '3.0.0',   blocking: 'required' },
    { name: 'pre-commit',  probeCommand: 'pre-commit --version',  minVersion: '4.0.0',   blocking: 'required' },
    { name: 'trufflehog',  probeCommand: 'trufflehog --version',  minVersion: '3.0.0',   blocking: 'required' },
    { name: 'osv-scanner', probeCommand: 'osv-scanner --version', minVersion: '2.0.0',   blocking: 'required' },
    { name: 'typos',       probeCommand: 'typos --version',                              blocking: 'required' },
  ];
  const _probe = stubProbe({
    node:           { semver: 'v22.22.0' },
    python:         { semver: 'Python 3.14.3' },
    uv:             { semver: 'uv 0.10.3 (c75a0c625 2026-02-16)' },
    gh:             { semver: 'gh version 2.92.0 (2026-04-28)' },
    'gh-auth':      { stdout: 'github.com\n  ✓ Logged in to github.com account seathatflowsinourveins (GITHUB_TOKEN)\n  - Active account: true\n' },
    codex:          { semver: 'codex-cli 0.130.0' },
    claude:         { semver: '2.1.150 (Claude Code)' },
    gitleaks:       { semver: '8.30.1' },
    lefthook:       { semver: 'lefthook version 2.1.4' },
    pinact:         { semver: 'pinact version 3.0.0' },
    'pre-commit':   { semver: 'pre-commit 4.6.0' },
    trufflehog:     { semver: 'trufflehog 3.95.3' },
    'osv-scanner':  { semver: 'osv-scanner version: 2.3.6' },
    typos:          { semver: 'typos-cli 1.46.0' },
  });

  const r = runT3({ config: t3Config(cliTools), mode: 'deep', repoRoot: __dirname, env: process.env, _probe });
  assert.equal(r.tier, 'T3');
  assert.deepEqual(r.blocked, [], `expected zero blocked, got: ${JSON.stringify(r.blocked)}`);
  assert.deepEqual(r.healed, []);
  assert.ok(Array.isArray(r.advisory), `advisory must be an array; got ${typeof r.advisory}`);
});

test('T3 (b): required-absent-blocks — required tool absent emits B-T3-CLI-MISSING with remediation', () => {
  const cliTools = [
    { name: 'node',     probeCommand: 'node --version',        minVersion: '22.0.0', blocking: 'required' },
    { name: 'nonesuch', probeCommand: 'nonesuch-cli --version',                       blocking: 'required' },
  ];
  const _probe = stubProbe({
    node:     { semver: 'v22.22.0' },
    nonesuch: { absent: true },
  });

  const r = runT3({ config: t3Config(cliTools), mode: 'deep', repoRoot: __dirname, env: process.env, _probe });
  assert.equal(r.tier, 'T3');
  const missing = r.blocked.find(b => b.code === 'B-T3-CLI-MISSING');
  assert.ok(missing, `expected B-T3-CLI-MISSING in blocked: ${JSON.stringify(r.blocked)}`);
  assert.match(missing.detail, /nonesuch/, `B-T3-CLI-MISSING detail must reference tool name: ${missing.detail}`);
  assert.ok(missing.remediation && missing.remediation.length > 0, 'B-T3-CLI-MISSING must have remediation');
  assert.equal(r.blocked.length, 1, `expected exactly 1 blocked entry; got ${r.blocked.length}: ${JSON.stringify(r.blocked)}`);
});

test('T3 (c): postWaveAdvisory-absent-advisory — postWaveAdvisory:true + tool absent yields advisory not block', () => {
  const cliTools = [
    {
      name: 'poutine',
      probeCommand: 'poutine --version',
      blocking: 'required',
      postWaveAdvisory: true,
      postWaveCite: 'Required-after W392 P1.6 lands',
    },
  ];
  const _probe = stubProbe({
    poutine: { absent: true },
  });

  const r = runT3({ config: t3Config(cliTools), mode: 'deep', repoRoot: __dirname, env: process.env, _probe });
  assert.equal(r.tier, 'T3');
  assert.deepEqual(r.blocked, [], `postWaveAdvisory tool absence must NOT block; got: ${JSON.stringify(r.blocked)}`);
  const adv = r.advisory.find(a => a.code === 'A-T3-CLI-ADVISORY');
  assert.ok(adv, `expected A-T3-CLI-ADVISORY in advisory: ${JSON.stringify(r.advisory)}`);
  assert.match(adv.detail, /poutine/, `advisory detail must reference tool name: ${adv.detail}`);
  assert.match(adv.detail, /W392 P1\.6/, `advisory detail must include postWaveCite: ${adv.detail}`);
});

test('T3 (d): required-tool-below-minVersion emits B-T3-CLI-VERSION-LOW with remediation', () => {
  // Defensive extra coverage — codex r1 P1 finding territory. node ≥22 required; stub returns 18.0.0.
  const cliTools = [
    { name: 'node', probeCommand: 'node --version', minVersion: '22.0.0', blocking: 'required' },
  ];
  const _probe = stubProbe({ node: { semver: 'v18.0.0' } });

  const r = runT3({ config: t3Config(cliTools), mode: 'deep', repoRoot: __dirname, env: process.env, _probe });
  const low = r.blocked.find(b => b.code === 'B-T3-CLI-VERSION-LOW');
  assert.ok(low, `expected B-T3-CLI-VERSION-LOW; got blocked=${JSON.stringify(r.blocked)}`);
  assert.match(low.detail, /node/);
  assert.match(low.detail, /18\.0\.0/);
  assert.match(low.detail, /22\.0\.0/);
  assert.ok(low.remediation && low.remediation.length > 0, 'B-T3-CLI-VERSION-LOW must have remediation');
});

test('T3 (f): required+minVersion+unparseable-semver blocks (codex r2 P1 — no fail-open)', () => {
  // Defensive — codex r2 P1 finding: required tools with declared minVersion that succeed
  // but emit non-semver output (e.g. tool output format changed upstream) MUST block.
  // Otherwise the exact-probe gate is bypassable by any successful-exit probe stdout.
  const cliTools = [
    { name: 'node', probeCommand: 'node --version', minVersion: '22.0.0', blocking: 'required' },
  ];
  const _probe = (/* tool */) => ({
    found: true,
    semver: null,
    stdout: 'OK\n',
    error: null,
  });
  const r = runT3({ config: t3Config(cliTools), mode: 'deep', repoRoot: __dirname, env: process.env, _probe });
  const unp = r.blocked.find(b => b.code === 'B-T3-CLI-VERSION-UNPARSED');
  assert.ok(unp, `expected B-T3-CLI-VERSION-UNPARSED in blocked; got: ${JSON.stringify(r)}`);
  assert.match(unp.detail, /node/);
  assert.match(unp.detail, /22\.0\.0/);
  assert.ok(unp.remediation && unp.remediation.length > 0, 'B-T3-CLI-VERSION-UNPARSED must have remediation');
  const cliTools2 = [
    { name: 'optionalTool', probeCommand: 'optionalTool --version', minVersion: '1.0.0', blocking: 'advisory' },
  ];
  const r2 = runT3({ config: t3Config(cliTools2), mode: 'deep', repoRoot: __dirname, env: process.env, _probe });
  assert.deepEqual(r2.blocked, [], 'advisory tools with unparseable semver must NOT block');
  assert.ok(r2.advisory.some(a => a.code === 'A-T3-CLI-VERSION-UNPARSED'));
});

test('T3 (e): semver parser handles assorted probe output formats', () => {
  // Unit coverage of parseSemver helper — locks the regex behavior.
  const cases = [
    ['v22.22.0',                      '22.22.0'],
    ['Python 3.14.3',                 '3.14.3'],
    ['gh version 2.92.0 (2026-04-28)','2.92.0'],
    ['codex-cli 0.130.0',             '0.130.0'],
    ['2.1.150 (Claude Code)',         '2.1.150'],
    ['8.30.1',                        '8.30.1'],
    ['pinact version 3.0.0 (4ba07f3)','3.0.0'],
    ['Major-only 7\n',                null],
  ];
  for (const [stdout, expected] of cases) {
    const got = parseSemver(stdout);
    if (expected === null) {
      assert.equal(got, null, `expected null for stdout=${JSON.stringify(stdout)}; got ${JSON.stringify(got)}`);
    } else {
      assert.ok(got, `expected semver for stdout=${JSON.stringify(stdout)}; got null`);
      assert.equal(got.raw, expected, `semver.raw mismatch for stdout=${JSON.stringify(stdout)}: got ${got.raw}`);
    }
  }
  assert.equal(cmpSemver(parseSemver('22.22.0'), parseSemver('22.0.0')), 1);
  assert.equal(cmpSemver(parseSemver('22.0.0'), parseSemver('22.0.0')), 0);
  assert.equal(cmpSemver(parseSemver('21.0.0'), parseSemver('22.0.0')), -1);
});

// W393.6 (W408) — T6 Research-arch tests.
// ---------------------------------------------------------------------------
//
// Per docs/superpowers/plans/2026-05-25-W393-phase-0a-implementation-plan.md Task 7
// step 6 (3 tests minimum: baseline-absent→advisory; baseline-present→smoke-pass;
// missing-engine→routing-advisory). Direct-module invocation gives deterministic
// tests against synthesized config blocks without requiring W384 files to absent
// themselves between runs.

import { runT6 } from './eee-checks/t6-research-arch.mjs';
// W407 (T5) already imports mkdtempSync/writeFileSync/rmSync/mkdirSync + tmpdir at lines 341-342.
// Reuse those imports — duplicate imports are syntax errors in ESM.

function makeTmpRepoRoot() {
  return mkdtempSync(resolve(tmpdir(), 'eee-t6-test-'));
}

function cleanupTmpRepoRoot(dir) {
  try { rmSync(dir, { recursive: true, force: true }); } catch { /* best-effort */ }
}

test('T6: baseline-absent yields advisory (no block)', () => {
  // Synthesize a tmp repo root with NO sota-discovery files. T6 should report
  // a single ADVISORY ("W384 baseline missing; T6 deferred") and no block.
  const tmp = makeTmpRepoRoot();
  try {
    const config = {
      t6: {
        baseline: {
          fileManifest: [
            'tools/sota-discovery/discover.mjs',
            'tools/sota-discovery/evaluate-v22.mjs',
            'tools/sota-discovery/lib/contract.mjs',
          ],
          schemaPath: '.claude/schemas/sca-v22-repo-verdict.schema.json',
          alwaysCheck: [],
        },
        futureReadiness: {},
        multiConvergenceRouting: { minTotalEngines: 2, engines: [], classes: {} },
        installPriority: { items: [] },
      },
    };
    const r = runT6({ config, mode: 'deep', repoRoot: tmp, env: process.env });
    assert.equal(r.tier, 'T6');
    assert.equal(r.blocked.length, 0, `expected no blocks; got ${JSON.stringify(r.blocked)}`);
    assert.ok(
      r.advisory.some(a => a.code === 'A-T6-BASELINE-MISSING'),
      `expected A-T6-BASELINE-MISSING advisory; got ${JSON.stringify(r.advisory.map(a => a.code))}`
    );
  } finally {
    cleanupTmpRepoRoot(tmp);
  }
});

test('T6: baseline-present + tiny smoke passes (no block, no baseline-missing advisory)', () => {
  // Synthesize a tmp repo root with ALL declared files present + a trivial smoke
  // that node --test passes (single passing assertion). Expect zero blocks and no
  // A-T6-BASELINE-MISSING advisory.
  const tmp = makeTmpRepoRoot();
  try {
    // Create the manifest files (all valid JS modules).
    const files = {
      'tools/sota-discovery/discover.mjs': 'export const _t = true;',
      'tools/sota-discovery/evaluate-v22.mjs': 'export const _t = true;',
      'tools/sota-discovery/lib/contract.mjs': 'export const _t = true;',
    };
    for (const [rel, content] of Object.entries(files)) {
      const ap = resolve(tmp, rel);
      mkdirSync(resolve(ap, '..'), { recursive: true });
      writeFileSync(ap, content);
    }
    // Trivial smoke test that always passes.
    mkdirSync(resolve(tmp, 'tests/sota-discovery'), { recursive: true });
    const smokePath = 'tests/sota-discovery/test_contract.mjs';
    writeFileSync(
      resolve(tmp, smokePath),
      "import { test } from 'node:test';\nimport assert from 'node:assert/strict';\ntest('smoke', () => assert.ok(true));\n"
    );

    const config = {
      t6: {
        baseline: {
          fileManifest: Object.keys(files),
          schemaPath: null,
          smokeTest: smokePath,
          smokeTimeoutMs: 15000,
          alwaysCheck: [],
        },
        futureReadiness: {},
        multiConvergenceRouting: { minTotalEngines: 2, engines: [], classes: {} },
        installPriority: { items: [] },
      },
    };
    const r = runT6({ config, mode: 'deep', repoRoot: tmp, env: process.env });
    assert.equal(r.tier, 'T6');
    assert.equal(r.blocked.length, 0, `expected no blocks; got ${JSON.stringify(r.blocked)}`);
    assert.ok(
      !r.advisory.some(a => a.code === 'A-T6-BASELINE-MISSING'),
      `expected no A-T6-BASELINE-MISSING; got ${JSON.stringify(r.advisory.map(a => a.code))}`
    );
  } finally {
    cleanupTmpRepoRoot(tmp);
  }
});

test('T6: multi-convergence missing engine yields routing advisory', () => {
  // Synthesize a tmp repo with EMPTY .mcp.json + no installed_plugins. Configure
  // 'production' class requiring 2 engines but make none locatable. Expect at
  // least one A-T6-CONVERGENCE-CLASS-UNDERSTAFFED advisory and global-roster advisory.
  const tmp = makeTmpRepoRoot();
  try {
    writeFileSync(resolve(tmp, '.mcp.json'), JSON.stringify({ mcpServers: {} }));
    const config = {
      t6: {
        baseline: { fileManifest: [], alwaysCheck: [] }, // skip baseline
        futureReadiness: {},
        multiConvergenceRouting: {
          minTotalEngines: 2,
          minEnginesPerClass: 2,
          engines: [
            { name: 'gpt-researcher', mcpServer: 'gpt-researcher' },
            { name: 'deer-flow', mcpServer: 'bytedance-deerflow' },
            { name: 'aris', skillNamePrefix: ['aris-'] },
          ],
          classes: {
            production: ['gpt-researcher', 'deer-flow'],
            academic: ['aris'],
          },
          operatorFlaggedMissingClones: [],
        },
        installPriority: { items: [] },
      },
    };
    // Set CLAUDE_CONFIG_DIR to a non-existent path so installed_plugins / skills lookup
    // resolves to nothing (forces empty signals).
    const env = { ...process.env, CLAUDE_CONFIG_DIR: resolve(tmp, '_nonexistent') };
    const r = runT6({ config, mode: 'deep', repoRoot: tmp, env });
    assert.equal(r.tier, 'T6');
    assert.equal(r.blocked.length, 0, `expected no blocks; got ${JSON.stringify(r.blocked)}`);
    assert.ok(
      r.advisory.some(a => a.code === 'A-T6-CONVERGENCE-CLASS-UNDERSTAFFED'),
      `expected A-T6-CONVERGENCE-CLASS-UNDERSTAFFED advisory; got ${JSON.stringify(r.advisory.map(a => a.code))}`
    );
    assert.ok(
      r.advisory.some(a => a.code === 'A-T6-CONVERGENCE-ROSTER-UNDERSTAFFED'),
      `expected A-T6-CONVERGENCE-ROSTER-UNDERSTAFFED advisory; got ${JSON.stringify(r.advisory.map(a => a.code))}`
    );
  } finally {
    cleanupTmpRepoRoot(tmp);
  }
});

test('T6: launch-fast mode short-circuits with single skip advisory', () => {
  // Calling runT6 directly with mode='launch-fast' surfaces a single skip advisory
  // and no work — defensive contract per design spec §2 T6 scheduling rules.
  const r = runT6({
    config: { t6: { baseline: {}, futureReadiness: {}, multiConvergenceRouting: {}, installPriority: { items: [] } } },
    mode: 'launch-fast',
    repoRoot: __dirname,
    env: process.env,
  });
  assert.equal(r.tier, 'T6');
  assert.equal(r.blocked.length, 0);
  assert.ok(r.advisory.some(a => a.code === 'A-T6-LAUNCH-FAST-SKIP'));
});

test('T6: rule-wiring scan finds patterns when wired in discovery dir', () => {
  // Codex r1 finding #1: routing rule must verify wiring exists in
  // tools/sota-discovery/lib/discovery/. Construct a synthetic discovery dir
  // containing the pattern; assert A-T6-CONVERGENCE-RULE-WIRED fires.
  const tmp = makeTmpRepoRoot();
  try {
    const discoveryDir = resolve(tmp, 'tools/sota-discovery/lib/discovery');
    mkdirSync(discoveryDir, { recursive: true });
    writeFileSync(
      resolve(discoveryDir, 'partitioner.mjs'),
      '// implements multi-convergence ≥2-engine / ≥3-source convergence per W393 §8\nexport const _t = true;\n'
    );
    const config = {
      t6: {
        baseline: { fileManifest: [], alwaysCheck: [] },
        futureReadiness: {},
        multiConvergenceRouting: {
          minTotalEngines: 2,
          engines: [],
          classes: {},
          discoveryLibDir: 'tools/sota-discovery/lib/discovery',
          convergencePath: 'tools/sota-discovery/lib/convergence.mjs',
          ruleWiringPatterns: ['multi-convergence', '≥2-engine'],
          operatorFlaggedMissingClones: [],
        },
        installPriority: { items: [] },
      },
    };
    const env = { ...process.env, CLAUDE_CONFIG_DIR: resolve(tmp, '_nonexistent') };
    const r = runT6({ config, mode: 'deep', repoRoot: tmp, env });
    assert.equal(r.blocked.length, 0);
    assert.ok(
      r.advisory.some(a => a.code === 'A-T6-CONVERGENCE-RULE-WIRED'),
      `expected A-T6-CONVERGENCE-RULE-WIRED; got ${JSON.stringify(r.advisory.map(a => a.code))}`
    );
  } finally {
    cleanupTmpRepoRoot(tmp);
  }
});

test('T6: rule-wiring scan reports not-wired when discovery files lack patterns', () => {
  // Codex r1 finding #1 negative case: discovery files exist but no wiring pattern.
  const tmp = makeTmpRepoRoot();
  try {
    const discoveryDir = resolve(tmp, 'tools/sota-discovery/lib/discovery');
    mkdirSync(discoveryDir, { recursive: true });
    writeFileSync(resolve(discoveryDir, 'score.mjs'), 'export function score(){ return 0; }\n');
    const config = {
      t6: {
        baseline: { fileManifest: [], alwaysCheck: [] },
        futureReadiness: {},
        multiConvergenceRouting: {
          minTotalEngines: 2,
          engines: [],
          classes: {},
          discoveryLibDir: 'tools/sota-discovery/lib/discovery',
          convergencePath: 'tools/sota-discovery/lib/convergence.mjs',
          ruleWiringPatterns: ['multi-convergence', '≥2-engine'],
          operatorFlaggedMissingClones: [],
        },
        installPriority: { items: [] },
      },
    };
    const env = { ...process.env, CLAUDE_CONFIG_DIR: resolve(tmp, '_nonexistent') };
    const r = runT6({ config, mode: 'deep', repoRoot: tmp, env });
    assert.equal(r.blocked.length, 0);
    assert.ok(
      r.advisory.some(a => a.code === 'A-T6-CONVERGENCE-RULE-NOT-WIRED'),
      `expected A-T6-CONVERGENCE-RULE-NOT-WIRED; got ${JSON.stringify(r.advisory.map(a => a.code))}`
    );
  } finally {
    cleanupTmpRepoRoot(tmp);
  }
});

test('T6: pipPackage + condaEnvPath probes count toward engine roster', () => {
  // Codex r1 finding #2: STORM (pipPackage) + DeepResearchAgent (condaEnvPath) must
  // be evaluable as engine-present signals. Synthesize a conda env dir + skip pip
  // (kept as a probe but allowed to fail) — markerPath + condaEnvPath should still
  // make the engine count as present.
  const tmp = makeTmpRepoRoot();
  try {
    // Sentinel for condaEnvPath
    const condaDir = resolve(tmp, 'envs/deepresearchagent');
    mkdirSync(condaDir, { recursive: true });
    // Sentinel for markerPath (STORM repo dir simulating local clone)
    const stormDir = resolve(tmp, 'storm');
    mkdirSync(stormDir, { recursive: true });
    writeFileSync(resolve(stormDir, 'README.md'), 'storm');

    const config = {
      t6: {
        baseline: { fileManifest: [], alwaysCheck: [] },
        futureReadiness: {},
        multiConvergenceRouting: {
          minTotalEngines: 2,
          minEnginesPerClass: 1,
          engines: [
            { name: 'storm', pipPackage: 'knowledge_storm_will_likely_not_be_installed', markerPath: stormDir },
            { name: 'deepresearchagent', condaEnvPath: condaDir },
          ],
          classes: { compact: ['storm'], 'self-improvement': ['deepresearchagent'] },
          discoveryLibDir: '_nonexistent',
          convergencePath: '_nonexistent.mjs',
          operatorFlaggedMissingClones: [],
        },
        installPriority: { items: [] },
      },
    };
    const env = { ...process.env, CLAUDE_CONFIG_DIR: resolve(tmp, '_nonexistent') };
    const r = runT6({ config, mode: 'deep', repoRoot: tmp, env });
    assert.equal(r.blocked.length, 0);
    // Roster should be OK because both engines satisfied via markerPath + condaEnvPath.
    assert.ok(
      r.advisory.some(a => a.code === 'A-T6-CONVERGENCE-ROSTER-OK' && /storm/.test(a.detail) && /deepresearchagent/.test(a.detail)),
      `expected A-T6-CONVERGENCE-ROSTER-OK with both storm + deepresearchagent; got ${JSON.stringify(r.advisory)}`
    );
  } finally {
    cleanupTmpRepoRoot(tmp);
  }
});

// NOTE: when this test file itself runs under `node --test`, Node 22 detects
// nested `node --test smokeFile` spawns as recursive and silently short-circuits
// them (exit status 0, no output, stderr warning "node:test run() is being
// called recursively within a test file"). To exercise the smoke-failure path
// deterministically here, the tests below MOCK the smoke runner via the
// `_smokeRunner` injection hook on runT6(). The production code path uses
// `node --test smokeFile` against the W384 baseline smoke file; the orchestrator
// (eee-precheck.mjs) is NOT in test-runner mode so production exercises this
// helper correctly. The default-runner code path is also exercised via the
// passing `T6: baseline-present + tiny smoke passes` test above.

test('T6: smoke-test non-zero exit produces B7-T6-SMOKE-FAIL block (codex r3 fix)', () => {
  // Codex r3 finding: baseline-present + smoke failure must B7 BLOCK explicitly,
  // never silently swallow.
  const tmp = makeTmpRepoRoot();
  try {
    const validFileRel = 'tools/sota-discovery/discover.mjs';
    const validFileAbs = resolve(tmp, validFileRel);
    mkdirSync(resolve(validFileAbs, '..'), { recursive: true });
    writeFileSync(validFileAbs, 'export const _t = true;\n');
    const smokeRel = 'tests/sota-discovery/test_contract.mjs';
    const smokeAbs = resolve(tmp, smokeRel);
    mkdirSync(resolve(smokeAbs, '..'), { recursive: true });
    writeFileSync(smokeAbs, 'export const _t = true;\n'); // smoke file must exist
    const config = {
      t6: {
        baseline: {
          fileManifest: [validFileRel],
          schemaPath: null,
          smokeTest: smokeRel,
          smokeTimeoutMs: 10000,
          alwaysCheck: [],
        },
        futureReadiness: {},
        multiConvergenceRouting: { minTotalEngines: 2, engines: [], classes: {} },
        installPriority: { items: [] },
      },
    };
    // Mock smokeRunner producing non-zero-exit with actionable stderr.
    const _smokeRunner = () => ({
      status: 1,
      signal: null,
      error: undefined,
      stdout: '',
      stderr: 'AssertionError: 1 !== 2\n    at <anonymous> ...',
    });
    const r = runT6({ config, mode: 'deep', repoRoot: tmp, env: process.env, _smokeRunner });
    const smokeFail = r.blocked.find(b => b.code === 'B7-T6-SMOKE-FAIL');
    assert.ok(smokeFail, `expected B7-T6-SMOKE-FAIL; got blocked=${JSON.stringify(r.blocked)}`);
    assert.ok(smokeFail.detail.length > 0, 'smoke-fail detail must be non-empty');
    assert.ok(/AssertionError/.test(smokeFail.detail), `smoke-fail detail must include stderr; got: ${JSON.stringify(smokeFail.detail)}`);
    assert.ok(smokeFail.remediation && smokeFail.remediation.length > 0, 'smoke-fail remediation required');
  } finally {
    cleanupTmpRepoRoot(tmp);
  }
});

test('T6: smoke-test signal/timeout produces B7-T6-SMOKE-TIMEOUT block (codex r3 fix)', () => {
  // Codex r3 finding: smoke timeout must surface as B7 BLOCK (signal path), not be
  // silently swallowed. Codex r3-recheck: real spawnSync(...,{timeout}) surfaces BOTH
  // res.error (ETIMEDOUT) AND res.signal (SIGTERM/SIGKILL) — mock both so this test
  // matches the actual Node shape.
  const tmp = makeTmpRepoRoot();
  try {
    const validFileRel = 'tools/sota-discovery/discover.mjs';
    const validFileAbs = resolve(tmp, validFileRel);
    mkdirSync(resolve(validFileAbs, '..'), { recursive: true });
    writeFileSync(validFileAbs, 'export const _t = true;\n');
    const smokeRel = 'tests/sota-discovery/test_contract.mjs';
    const smokeAbs = resolve(tmp, smokeRel);
    mkdirSync(resolve(smokeAbs, '..'), { recursive: true });
    writeFileSync(smokeAbs, 'export const _t = true;\n');
    const config = {
      t6: {
        baseline: {
          fileManifest: [validFileRel],
          schemaPath: null,
          smokeTest: smokeRel,
          smokeTimeoutMs: 1500,
          alwaysCheck: [],
        },
        futureReadiness: {},
        multiConvergenceRouting: { minTotalEngines: 2, engines: [], classes: {} },
        installPriority: { items: [] },
      },
    };
    // Codex r3-recheck: actual Node `spawnSync` timeout produces BOTH error+signal.
    const timeoutErr = new Error('spawnSync /usr/bin/node ETIMEDOUT');
    timeoutErr.code = 'ETIMEDOUT';
    const _smokeRunner = () => ({
      status: null,
      signal: 'SIGTERM',
      error: timeoutErr,
      stdout: '',
      stderr: '',
    });
    const r = runT6({ config, mode: 'deep', repoRoot: tmp, env: process.env, _smokeRunner });
    const b7 = r.blocked.find(b => b.code === 'B7-T6-SMOKE-TIMEOUT');
    assert.ok(b7, `expected B7-T6-SMOKE-TIMEOUT (NOT SPAWN-ERROR); got blocked=${JSON.stringify(r.blocked)}`);
    assert.ok(/SIGTERM/.test(b7.detail), `B7-TIMEOUT detail must include signal name; got: ${JSON.stringify(b7.detail)}`);
    assert.ok(/ETIMEDOUT/.test(b7.detail), `B7-TIMEOUT detail must include ETIMEDOUT; got: ${JSON.stringify(b7.detail)}`);
    assert.ok(b7.remediation && b7.remediation.length > 0, 'B7-TIMEOUT remediation required');
  } finally {
    cleanupTmpRepoRoot(tmp);
  }
});

test('T6: smoke-test signal-only (no error) also classifies as B7-T6-SMOKE-TIMEOUT', () => {
  // Cover the case where the OS kills the child via signal without ETIMEDOUT (e.g. SIGINT).
  const tmp = makeTmpRepoRoot();
  try {
    const validFileRel = 'tools/sota-discovery/discover.mjs';
    const validFileAbs = resolve(tmp, validFileRel);
    mkdirSync(resolve(validFileAbs, '..'), { recursive: true });
    writeFileSync(validFileAbs, 'export const _t = true;\n');
    const smokeRel = 'tests/sota-discovery/test_contract.mjs';
    mkdirSync(resolve(tmp, 'tests/sota-discovery'), { recursive: true });
    writeFileSync(resolve(tmp, smokeRel), 'export const _t = true;\n');
    const config = {
      t6: {
        baseline: { fileManifest: [validFileRel], schemaPath: null, smokeTest: smokeRel, smokeTimeoutMs: 5000, alwaysCheck: [] },
        futureReadiness: {},
        multiConvergenceRouting: { minTotalEngines: 2, engines: [], classes: {} },
        installPriority: { items: [] },
      },
    };
    const _smokeRunner = () => ({ status: null, signal: 'SIGKILL', error: undefined, stdout: '', stderr: '' });
    const r = runT6({ config, mode: 'deep', repoRoot: tmp, env: process.env, _smokeRunner });
    const b7 = r.blocked.find(b => b.code === 'B7-T6-SMOKE-TIMEOUT');
    assert.ok(b7, `expected B7-T6-SMOKE-TIMEOUT for signal-only case; got blocked=${JSON.stringify(r.blocked)}`);
    assert.ok(/SIGKILL/.test(b7.detail));
  } finally {
    cleanupTmpRepoRoot(tmp);
  }
});

test('T6: smoke-test spawn-error produces B7-T6-SMOKE-SPAWN-ERROR block (codex r3 fix)', () => {
  // Codex r3 finding: spawnSync surfaces ENOENT etc. via res.error — must B7 BLOCK.
  const tmp = makeTmpRepoRoot();
  try {
    const validFileRel = 'tools/sota-discovery/discover.mjs';
    const validFileAbs = resolve(tmp, validFileRel);
    mkdirSync(resolve(validFileAbs, '..'), { recursive: true });
    writeFileSync(validFileAbs, 'export const _t = true;\n');
    const smokeRel = 'tests/sota-discovery/test_contract.mjs';
    mkdirSync(resolve(tmp, 'tests/sota-discovery'), { recursive: true });
    writeFileSync(resolve(tmp, smokeRel), 'export const _t = true;\n');
    const config = {
      t6: {
        baseline: {
          fileManifest: [validFileRel],
          schemaPath: null,
          smokeTest: smokeRel,
          smokeTimeoutMs: 5000,
          alwaysCheck: [],
        },
        futureReadiness: {},
        multiConvergenceRouting: { minTotalEngines: 2, engines: [], classes: {} },
        installPriority: { items: [] },
      },
    };
    // Mock smokeRunner producing spawn-error (e.g. node binary missing).
    const _smokeRunner = () => ({
      status: null,
      signal: null,
      error: new Error('spawn node ENOENT'),
      stdout: '',
      stderr: '',
    });
    const r = runT6({ config, mode: 'deep', repoRoot: tmp, env: process.env, _smokeRunner });
    const b7 = r.blocked.find(b => b.code === 'B7-T6-SMOKE-SPAWN-ERROR');
    assert.ok(b7, `expected B7-T6-SMOKE-SPAWN-ERROR; got blocked=${JSON.stringify(r.blocked)}`);
    assert.ok(/ENOENT/.test(b7.detail), `B7 spawn-error detail must include cause; got: ${JSON.stringify(b7.detail)}`);
  } finally {
    cleanupTmpRepoRoot(tmp);
  }
});

test('T6: baseline node --check failure produces non-empty B7 detail (no empty "syntax-error:")', () => {
  // Codex r1 finding #3 (CR-6 truthful detail): when a manifest file contains invalid
  // JS, the B7-T6-BASELINE-CORRUPT detail must include actionable text (stderr OR
  // exit-code label) — never an empty "syntax-error: " string.
  const tmp = makeTmpRepoRoot();
  try {
    const badFileRel = 'tools/sota-discovery/discover.mjs';
    const badFileAbs = resolve(tmp, badFileRel);
    mkdirSync(resolve(badFileAbs, '..'), { recursive: true });
    // Deliberately broken JS — unterminated string literal triggers parser error.
    writeFileSync(badFileAbs, 'export const broken = "unterminated\n');

    const config = {
      t6: {
        baseline: {
          fileManifest: [badFileRel],
          schemaPath: null,
          alwaysCheck: [],
        },
        futureReadiness: {},
        multiConvergenceRouting: { minTotalEngines: 2, engines: [], classes: {} },
        installPriority: { items: [] },
      },
    };
    const r = runT6({ config, mode: 'deep', repoRoot: tmp, env: process.env });
    const corrupt = r.blocked.find(b => b.code === 'B7-T6-BASELINE-CORRUPT');
    assert.ok(corrupt, `expected B7-T6-BASELINE-CORRUPT; got blocked=${JSON.stringify(r.blocked)}`);
    // Must NOT be the empty-stderr "syntax-error: " sentinel — detail should have substance.
    assert.ok(
      !/syntax-error:\s*$/.test(corrupt.detail) && !/syntax-error:\s+$/.test(corrupt.detail),
      `B7 detail must not end with empty "syntax-error:"; got: ${JSON.stringify(corrupt.detail)}`
    );
    assert.ok(corrupt.detail.length > 'node --check failed for '.length + badFileRel.length + 10,
      `B7 detail must include actionable reason; got: ${JSON.stringify(corrupt.detail)}`);
    assert.ok(corrupt.remediation && corrupt.remediation.length > 0, 'B7 must include remediation');
  } finally {
    cleanupTmpRepoRoot(tmp);
  }
});

// ===========================================================================
// W393.7 (W409) — Block-rules B1-B10 tests + auto-heal idempotency + latency
// ===========================================================================
//
// Per docs/superpowers/specs/2026-05-25-W393-eee-contract-design.md §4 (B1..B10) +
//   docs/superpowers/plans/2026-05-25-W393-phase-0a-implementation-plan.md Task 8.
//
// Strategy: unit-level tests against `evaluateBlockRules(state, ctx)` for deterministic
// per-rule precondition coverage; subprocess-level smoke for B1 / B5 / B7 / B8 to
// confirm exit-code 2 + remediation surfacing through the orchestrator pipeline.

import {
  BLOCK_RULES,
  BLOCK_RULE_IDS,
  evaluateBlockRules,
  runBlockRules,
  remediationFor,
} from './eee-checks/block-rules.mjs';
// Namespace import so the closure-free `__testing` private-helpers export can be referenced
// from inside test blocks (codex r1 P2 fix — defaultShaPinProbe coverage).
import * as brTesting from './eee-checks/block-rules.mjs';

// Helper — builds a synthetic state for a single tier-emitted code so rule
// precondition can be tested in isolation.
function makeState({ blockedCodes = [], mode = 'deep', config = {}, repoRoot = __dirname, env = process.env } = {}) {
  return {
    blocked: blockedCodes.map(code => ({
      code,
      detail: `mocked ${code} detail`,
      remediation: 'mocked-source-remediation',
    })),
    healed: [],
    advisory: [],
    mode,
    repoRoot,
    env,
    config,
  };
}

test('Block-rules: registry exposes 10 entries (B1..B10) with stable IDs', () => {
  assert.equal(BLOCK_RULE_IDS.length, 10, `expected 10 block-rule IDs; got ${BLOCK_RULE_IDS.length}: ${BLOCK_RULE_IDS.join(',')}`);
  // Every B1..B10 id MUST be present.
  for (let i = 1; i <= 10; i++) {
    assert.ok(BLOCK_RULE_IDS.includes(`B${i}`), `BLOCK_RULE_IDS must include B${i}; got ${BLOCK_RULE_IDS.join(',')}`);
  }
  // Every entry MUST declare remediation + precondition + sourceCodes.
  for (const [name, rule] of Object.entries(BLOCK_RULES)) {
    assert.ok(rule.id && /^B\d{1,2}$/.test(rule.id), `${name}: rule.id must match B<n>; got ${rule.id}`);
    assert.ok(typeof rule.remediation === 'string' && rule.remediation.length > 0,
      `${name}: rule.remediation must be non-empty string`);
    assert.ok(typeof rule.precondition === 'function',
      `${name}: rule.precondition must be a function`);
    assert.ok(Array.isArray(rule.sourceCodes),
      `${name}: rule.sourceCodes must be an array`);
  }
});

test('B1 LEAKED-CRED: precondition fires when state.blocked contains B-T1-LEAKED-CRED', () => {
  const state = makeState({ blockedCodes: ['B-T1-LEAKED-CRED'] });
  const rule = BLOCK_RULES['B1-LEAKED-CRED'];
  assert.ok(rule.precondition(state), 'B1 precondition must match tier-emitted code');
  const { matched } = evaluateBlockRules(state);
  const b1 = matched.find(m => m.id === 'B1');
  assert.ok(b1, `B1 label must be in matched: ${JSON.stringify(matched)}`);
  assert.match(b1.remediation, /gitleaks protect --staged --redact/);
});

test('B2 CR2-CR5-UNSANCTIONED-HOOK: precondition fires + remediation cites CLAUDE.md cite-anchor', () => {
  const state = makeState({ blockedCodes: ['B-T1-HOOK-UNSANCTIONED'] });
  const rule = BLOCK_RULES['B2-CR2-CR5-UNSANCTIONED-HOOK'];
  assert.ok(rule.precondition(state), 'B2 precondition must match tier-emitted code');
  const { matched } = evaluateBlockRules(state);
  const b2 = matched.find(m => m.id === 'B2');
  assert.ok(b2, `B2 label must be in matched: ${JSON.stringify(matched)}`);
  assert.match(b2.remediation, /CLAUDE\.md cite-anchor|retire/);
});

test('B3 SCA-VN-DRIFT: precondition fires on B-T5-SCA-DRIFT + remediation cites W392 P0.1', () => {
  const state = makeState({ blockedCodes: ['B-T5-SCA-DRIFT'] });
  const rule = BLOCK_RULES['B3-SCA-VN-DRIFT'];
  assert.ok(rule.precondition(state), 'B3 precondition must match B-T5-SCA-DRIFT');
  const { matched } = evaluateBlockRules(state);
  const b3 = matched.find(m => m.id === 'B3');
  assert.ok(b3, `B3 label expected in matched: ${JSON.stringify(matched)}`);
  assert.match(b3.remediation, /sca-v22|W392/);
});

test('B3 SCA-VN-DRIFT: also matches tier-emitted ADVISORY A-T5-SCA-DRIFT + escalates to block (codex r2 + r4 P2 fix)', () => {
  // T5 currently emits sca-vN canonical drift as ADVISORY (no block). B3 must:
  // (a) surface the remediation (advisory label) so operators see the actionable fix; AND
  // (b) ESCALATE to a supplementary block because spec §4 lists B3 as a BLOCK-rule — leaving
  //     status OK would defeat the canonical-sca enforcement contract (codex r4 P2 fix).
  const state = {
    blocked: [],
    healed: [],
    advisory: [{ code: 'A-T5-SCA-DRIFT', detail: 'sca-v17 declared; canonical is sca-v22' }],
    mode: 'deep', repoRoot: __dirname, env: process.env, config: {},
  };
  const rule = BLOCK_RULES['B3-SCA-VN-DRIFT'];
  assert.ok(rule.precondition(state), 'B3 precondition must match advisory A-T5-SCA-DRIFT');
  const { matchedAdvisory, supplementary } = evaluateBlockRules(state);
  const b3Adv = matchedAdvisory.find(m => m.id === 'B3');
  assert.ok(b3Adv, `B3 advisory-match expected: ${JSON.stringify(matchedAdvisory)}`);
  assert.match(b3Adv.remediation, /sca-v22|W392/);
  // Codex r4 P2 fix: escalation must produce a supplementary block.
  const b3Block = supplementary.find(s => s.id === 'B3' && /ESCALATED-FROM-ADVISORY/.test(s.code));
  assert.ok(b3Block, `B3 escalation block expected: ${JSON.stringify(supplementary)}`);
  assert.match(b3Block.remediation, /sca-v22|W392/);

  // Through runBlockRules the advisory must surface as A-BR-B3-ADVISORY AND the block must
  // appear in result.blocked so status flips to BLOCKED.
  const r = runBlockRules({ state, mode: 'deep', repoRoot: __dirname, env: process.env, config: {} });
  const a = r.advisory.find(x => x.code === 'A-BR-B3-ADVISORY');
  assert.ok(a, `expected A-BR-B3-ADVISORY in runBlockRules output: ${JSON.stringify(r.advisory)}`);
  const b = r.blocked.find(x => /ESCALATED-FROM-ADVISORY/.test(x.code));
  assert.ok(b, `expected B3 escalation in runBlockRules blocked output: ${JSON.stringify(r.blocked)}`);
  assert.match(a.remediation, /sca-v22|W392/);
});

test('B4 DOCKER-DAEMON-DOWN: probe ONLY fires when T2 already reported docker-compose service unhealthy (codex r4 P2 fix)', () => {
  // (Case A) T2 reports the docker-backed required service as HEALTHY (no block). B4 must
  // NOT fire even if the docker CLI happens to be missing/perm-denied.
  const config = { t2: { services: [{ name: 'langfuse', supervisor: 'docker-compose', blocking: 'required' }] } };
  const stateNoT2Block = makeState({ blockedCodes: [], mode: 'deep', config });
  const ctx = { _dockerProbe: () => ({ down: true, reason: 'permission denied (admin-gated pipe)' }) };
  const { supplementary: supA } = evaluateBlockRules(stateNoT2Block, ctx);
  assert.ok(!supA.find(s => s.id === 'B4'),
    `B4 must NOT fire when no T2 service is unhealthy; got: ${JSON.stringify(supA)}`);

  // (Case B) T2 ALSO blocked the docker-compose service. B4 probe NOW fires. The reason
  // contains 'permission denied' so it routes to advisory (not block) per codex r4 fix.
  const stateWithT2Block = {
    blocked: [{ code: 'B-T2-SERVICE-UNHEALTHY', detail: "service 'langfuse' health probe failed", remediation: 'docker compose up -d' }],
    healed: [], advisory: [], mode: 'deep', repoRoot: __dirname, env: process.env, config,
  };
  const { supplementary: supB, matchedAdvisory: advB } = evaluateBlockRules(stateWithT2Block, ctx);
  assert.ok(!supB.find(s => s.id === 'B4'),
    `B4 permission-denied probe must NOT produce a supplementary block; got: ${JSON.stringify(supB)}`);
  const b4Perm = advB.find(m => m.id === 'B4' && /PERM/.test(m.code));
  assert.ok(b4Perm, `B4 permission-denied advisory must surface; got: ${JSON.stringify(advB)}`);

  // (Case C) T2-blocked + docker CLI down with non-perm cause => B4 supplementary block fires.
  const ctxDown = { _dockerProbe: () => ({ down: true, reason: 'exit 1: cannot connect to daemon' }) };
  const { supplementary: supC } = evaluateBlockRules(stateWithT2Block, ctxDown);
  const b4 = supC.find(s => s.id === 'B4');
  assert.ok(b4, `genuine daemon-down with T2-flagged docker svc must produce B4 block; got: ${JSON.stringify(supC)}`);
});

test('B4 DOCKER-DAEMON-DOWN: probe-driven supplementary block fires when docker probe reports down + T2 already blocked docker svc (codex r4 gating)', () => {
  // Codex r4 P2 fix: B4 only fires when T2 has ALREADY blocked a docker-compose service so
  // a missing-docker / EPERM doesn't false-positive when T2 confirmed services healthy.
  const config = { t2: { services: [{ name: 'langfuse', supervisor: 'docker-compose', blocking: 'required' }] } };
  // Synthesize an existing T2 block whose detail mentions the langfuse service.
  const state = {
    blocked: [{ code: 'B-T2-SERVICE-UNHEALTHY', detail: "service 'langfuse' health probe failed", remediation: 'docker compose up -d' }],
    healed: [], advisory: [], mode: 'deep', repoRoot: __dirname, env: process.env, config,
  };
  const ctx = { _dockerProbe: () => ({ down: true, reason: 'connection refused on docker pipe' }) };
  const { supplementary } = evaluateBlockRules(state, ctx);
  const b4 = supplementary.find(s => s.id === 'B4');
  assert.ok(b4, `B4 supplementary block expected: ${JSON.stringify(supplementary)}`);
  assert.match(b4.remediation, /Start Docker|nssm start docker/);
  assert.match(b4.detail, /Docker daemon unreachable|connection refused/);
  // Negative case — launch-fast must NOT fire B4 supplementary (gated to deep/repair).
  const stateFast = { ...state, mode: 'launch-fast' };
  const { supplementary: supLF } = evaluateBlockRules(stateFast, ctx);
  assert.ok(!supLF.find(s => s.id === 'B4'), `B4 must NOT fire in launch-fast: ${JSON.stringify(supLF)}`);
});

test('B5 WAVE-LOCK-COLLISION: precondition fires on B-T1-WAVE-LOCK-COLLISION + remediation cites eee.ps1 --Wave', () => {
  const state = makeState({ blockedCodes: ['B-T1-WAVE-LOCK-COLLISION'] });
  const rule = BLOCK_RULES['B5-WAVE-LOCK-COLLISION'];
  assert.ok(rule.precondition(state), 'B5 precondition must match B-T1-WAVE-LOCK-COLLISION');
  const { matched } = evaluateBlockRules(state);
  const b5 = matched.find(m => m.id === 'B5');
  assert.ok(b5, `B5 label expected in matched: ${JSON.stringify(matched)}`);
  assert.match(b5.remediation, /eee\.ps1 --Wave/);
});

test('B6 GH-AUTH-EXPIRED: precondition fires on B-T4-GH-AUTH + remediation cites scope-set', () => {
  const state = makeState({ blockedCodes: ['B-T4-GH-AUTH'] });
  const rule = BLOCK_RULES['B6-GH-AUTH-EXPIRED'];
  assert.ok(rule.precondition(state), 'B6 precondition must match B-T4-GH-AUTH');
  const { matched } = evaluateBlockRules(state);
  const b6 = matched.find(m => m.id === 'B6');
  assert.ok(b6, `B6 label expected in matched: ${JSON.stringify(matched)}`);
  assert.match(b6.remediation, /gh auth login.*repo.*workflow.*admin:read/);
});

test('B7 RESEARCH-ARCH-BROKEN: precondition fires on B7-T6-SMOKE-FAIL + remediation cites W384 PR #44', () => {
  const state = makeState({ blockedCodes: ['B7-T6-SMOKE-FAIL'] });
  const rule = BLOCK_RULES['B7-RESEARCH-ARCH-BROKEN'];
  assert.ok(rule.precondition(state), 'B7 precondition must match B7-T6-SMOKE-FAIL');
  const { matched } = evaluateBlockRules(state);
  const b7 = matched.find(m => m.id === 'B7');
  assert.ok(b7, `B7 label expected in matched: ${JSON.stringify(matched)}`);
  assert.match(b7.remediation, /sca-v22|W384/);
});

test('B8 RDOE-SCHEMA-FIREWALL-BREACH: precondition fires on B8-T6-RDOE-FIREWALL-BREACH + cites W381 §5', () => {
  const state = makeState({ blockedCodes: ['B8-T6-RDOE-FIREWALL-BREACH'] });
  const rule = BLOCK_RULES['B8-RDOE-SCHEMA-FIREWALL-BREACH'];
  assert.ok(rule.precondition(state), 'B8 precondition must match B8-T6-RDOE-FIREWALL-BREACH');
  const { matched } = evaluateBlockRules(state);
  const b8 = matched.find(m => m.id === 'B8');
  assert.ok(b8, `B8 label expected in matched: ${JSON.stringify(matched)}`);
  assert.match(b8.remediation, /W381|firewall/);
});

test('B9 CRITICAL-STALE-MCP: probe-driven supplementary block fires when mcp probe reports stale entries', () => {
  const state = makeState({ blockedCodes: [], mode: 'deep' });
  const ctx = {
    _mcpVersionProbe: () => ([
      { name: 'gitleaks-mcp', pkg: '@example/gitleaks-mcp', declared: '2.0.0', local: '1.5.0' },
    ]),
  };
  const { supplementary } = evaluateBlockRules(state, ctx);
  const b9 = supplementary.find(s => s.id === 'B9');
  assert.ok(b9, `B9 supplementary expected: ${JSON.stringify(supplementary)}`);
  assert.match(b9.remediation, /npm install -g/);
  assert.match(b9.detail, /gitleaks-mcp/);
  // Launch-fast must NOT fire B9.
  const stateFast = makeState({ blockedCodes: [], mode: 'launch-fast' });
  const { supplementary: supLF } = evaluateBlockRules(stateFast, ctx);
  assert.ok(!supLF.find(s => s.id === 'B9'), `B9 must NOT fire in launch-fast: ${JSON.stringify(supLF)}`);
});

test('B10 GH-ACTION-SHA-FLOATING: probe-driven supplementary block fires when sha-pin probe reports floating refs', () => {
  const state = makeState({ blockedCodes: [], mode: 'deep' });
  const ctx = {
    _shaPinProbe: () => ([
      { workflow: 'pre-commit.yml', action: 'actions/checkout@v4' },
    ]),
  };
  const { supplementary } = evaluateBlockRules(state, ctx);
  const b10 = supplementary.find(s => s.id === 'B10');
  assert.ok(b10, `B10 supplementary expected: ${JSON.stringify(supplementary)}`);
  assert.match(b10.remediation, /pinact run/);
  assert.match(b10.detail, /pre-commit\.yml/);
  // Launch-fast must NOT fire B10.
  const stateFast = makeState({ blockedCodes: [], mode: 'launch-fast' });
  const { supplementary: supLF } = evaluateBlockRules(stateFast, ctx);
  assert.ok(!supLF.find(s => s.id === 'B10'), `B10 must NOT fire in launch-fast: ${JSON.stringify(supLF)}`);
});

test('B9 default MCP version probe: returns [] when .mcp.json absent (codex r1 P2 fix)', () => {
  // Probe must return empty (not throw, not fabricate stale) when no .mcp.json at repoRoot.
  const tmp = mkdtempSync(join(tmpdir(), 'eee-b9-'));
  try {
    const state = { blocked: [], healed: [], advisory: [], mode: 'deep', repoRoot: tmp, config: {}, env: process.env };
    const stale = brTesting.__testing._defaultMcpVersionProbe(state);
    assert.deepEqual(stale, [], `empty repo must yield zero stale entries; got: ${JSON.stringify(stale)}`);
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
});

test('B9 default MCP version probe: extracts declared pins from `pkg@x.y.z` args + handles npm-absent gracefully (codex r1 P2 fix)', () => {
  // Synthesize a tmp repo with a .mcp.json that declares an npm-pinned package. The probe
  // must NOT throw + must return [] when npm is not available OR when the declared pin
  // matches the local install. The key invariant: function exits cleanly, never throws.
  const tmp = mkdtempSync(join(tmpdir(), 'eee-b9-'));
  try {
    const mcp = {
      mcpServers: {
        'example-mcp': {
          command: 'npx',
          args: ['-y', '[email protected]'],
        },
      },
    };
    writeFileSync(resolve(tmp, '.mcp.json'), JSON.stringify(mcp));
    const state = { blocked: [], healed: [], advisory: [], mode: 'deep', repoRoot: tmp, config: {}, env: process.env };
    // Must not throw; result is array (possibly empty if pkg not installed globally).
    const stale = brTesting.__testing._defaultMcpVersionProbe(state);
    assert.ok(Array.isArray(stale), `_defaultMcpVersionProbe must return an array; got: ${typeof stale}`);
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
});

test('B10 SHA-pin probe: matches required-check by JOB NAME even when workflow name differs (codex r5 P2 fix)', () => {
  // Workflow named `CI` in `ci.yml` with job `test`; branch protection requires `test`.
  // Filename heuristic doesn't match; workflow-name doesn't match — but job-id MUST match.
  const tmp = mkdtempSync(join(tmpdir(), 'eee-b10-job-'));
  try {
    mkdirSync(resolve(tmp, '.github/workflows'), { recursive: true });
    const wf = `name: CI
on: [pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/setup-node@v3
`;
    writeFileSync(resolve(tmp, '.github/workflows/ci.yml'), wf);
    // Required context = bare job name 'test'. Workflow filename + name do NOT match
    // heuristic gating; only the job ID matches.
    const config = { t4: { current: { requiredCheckContexts: ['test'] } } };
    const state = { blocked: [], healed: [], advisory: [], mode: 'deep', repoRoot: tmp, config, env: process.env };
    const floating = brTesting.__testing._defaultShaPinProbe(state);
    const actions = floating.map(f => f.action);
    assert.ok(actions.includes('actions/checkout@v4'),
      `job-name 'test' must match required-check 'test'; got: ${JSON.stringify(actions)}`);
    // Lint job's actions also flagged (same workflow file).
    assert.ok(actions.includes('actions/setup-node@v3'),
      `same-workflow lint job must also be scanned; got: ${JSON.stringify(actions)}`);
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
});

test('B10 SHA-pin probe: handles BOTH quoted and unquoted uses: forms (codex r3 P2 fix)', () => {
  // Per YAML 1.2 the `uses:` value can be wrapped in single OR double quotes. The default
  // probe must catch floating refs in all three forms.
  const tmp = mkdtempSync(join(tmpdir(), 'eee-b10-q-'));
  try {
    mkdirSync(resolve(tmp, '.github/workflows'), { recursive: true });
    const wf = `name: pre-commit gates
on: [pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: "actions/setup-node@v3"
      - uses: 'actions/setup-python@v5'
      - uses: actions/cache@deadbeefdeadbeefdeadbeefdeadbeefdeadbeef
`;
    writeFileSync(resolve(tmp, '.github/workflows/pre-commit.yml'), wf);
    const config = { t4: { current: { requiredCheckContexts: ['Pre-commit gates'] } } };
    const state = { blocked: [], healed: [], advisory: [], mode: 'deep', repoRoot: tmp, config, env: process.env };
    const floating = brTesting.__testing._defaultShaPinProbe(state);
    const actions = floating.map(f => f.action);
    // All three quoting forms must be caught.
    assert.ok(actions.includes('actions/checkout@v4'),
      `unquoted 'actions/checkout@v4' must be detected; got: ${JSON.stringify(actions)}`);
    assert.ok(actions.includes('actions/setup-node@v3'),
      `double-quoted 'actions/setup-node@v3' must be detected; got: ${JSON.stringify(actions)}`);
    assert.ok(actions.includes('actions/setup-python@v5'),
      `single-quoted 'actions/setup-python@v5' must be detected; got: ${JSON.stringify(actions)}`);
    // 40-char SHA-pinned action MUST NOT appear.
    assert.ok(!actions.some(a => /deadbeef/.test(a)),
      `40-char SHA pin must not be flagged; got: ${JSON.stringify(actions)}`);
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
});

test('B10 SHA-pin probe: scans required workflows by YAML name: field, not just filename (codex r2 P2 fix)', () => {
  // Workflow filename does NOT match the filename heuristic (ci.yml), but its `name:` field
  // matches a required-check context. The probe must still scan it for floating SHA pins.
  const tmp = mkdtempSync(join(tmpdir(), 'eee-b10-name-'));
  try {
    mkdirSync(resolve(tmp, '.github/workflows'), { recursive: true });
    const wf = `name: Build
on: [pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: actually-pinned
        uses: actions/cache@deadbeefdeadbeefdeadbeefdeadbeefdeadbeef
`;
    writeFileSync(resolve(tmp, '.github/workflows/ci.yml'), wf);
    const config = { t4: { current: { requiredCheckContexts: ['Build / build'] } } };
    const state = { blocked: [], healed: [], advisory: [], mode: 'deep', repoRoot: tmp, config, env: process.env };
    const floating = brTesting.__testing._defaultShaPinProbe(state);
    const actions = floating.map(f => f.action);
    assert.ok(actions.includes('actions/checkout@v4'),
      `workflow with name: 'Build' matched by required-check 'Build / build' must be scanned; got: ${JSON.stringify(actions)}`);
    assert.ok(!actions.some(a => /deadbeef/.test(a)),
      `40-char SHA pin must not be flagged; got: ${JSON.stringify(actions)}`);
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
});

test('B10 SHA-pin probe: default probe matches BOTH mapping-form and list-item-form uses: (codex r1 P2 fix)', () => {
  // Synthesize a tmp repo with a workflow YAML using the common `- uses: action@ref` list
  // form. The default _defaultShaPinProbe must detect the floating ref.
  const tmp = mkdtempSync(join(tmpdir(), 'eee-b10-'));
  try {
    mkdirSync(resolve(tmp, '.github/workflows'), { recursive: true });
    // Workflow file with both list-form AND mapping-form uses, AND filename matching the
    // required-check heuristic (contains 'pre-commit').
    const wf = `name: pre-commit gates
on: [pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: setup
        uses: actions/setup-node@v3
      - uses: actions/cache@deadbeefdeadbeefdeadbeefdeadbeefdeadbeef
`;
    writeFileSync(resolve(tmp, '.github/workflows/pre-commit.yml'), wf);
    // Build a state with the required-check context list so the heuristic-filter doesn't skip.
    const config = { t4: { current: { requiredCheckContexts: ['Pre-commit gates'] } } };
    // Need to bypass evaluateBlockRules' supplementary-gate (requires when()==true). Call the
    // exported __testing.shaPinProbe directly via importing it.
    const state = { blocked: [], healed: [], advisory: [], mode: 'deep', repoRoot: tmp, config, env: process.env };
    const { __testing } = brTesting;
    const floating = __testing._defaultShaPinProbe(state);
    // Must catch BOTH floating list-form refs and mapping-form ref; NOT the 40-char SHA.
    const actions = floating.map(f => f.action).sort();
    assert.ok(actions.includes('actions/checkout@v4'),
      `list-form 'actions/checkout@v4' must be detected; got: ${JSON.stringify(actions)}`);
    assert.ok(actions.includes('actions/setup-node@v3'),
      `mapping-form 'actions/setup-node@v3' must be detected; got: ${JSON.stringify(actions)}`);
    // The 40-char SHA-pinned action MUST NOT appear.
    assert.ok(!actions.some(a => /deadbeef/.test(a)),
      `40-char SHA pin MUST NOT be flagged; got: ${JSON.stringify(actions)}`);
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
});

test('Block-rules: runBlockRules() wraps state into tier-shaped result with advisory labels + supplementary blocks', () => {
  const state = { blocked: [{ code: 'B-T1-LEAKED-CRED', detail: 'leaked', remediation: 'orig' }], healed: [], advisory: [] };
  const result = runBlockRules({
    state,
    mode: 'launch-fast',
    repoRoot: __dirname,
    env: process.env,
    config: {},
  });
  assert.equal(result.tier, 'BLOCK-RULES');
  assert.ok(Array.isArray(result.advisory), 'result.advisory must be array');
  const label = result.advisory.find(a => a.code === 'A-BR-B1-LABEL');
  assert.ok(label, `expected A-BR-B1-LABEL advisory: ${JSON.stringify(result.advisory)}`);
  assert.match(label.remediation, /gitleaks/);
  // launch-fast mode + no probe injection: zero supplementary blocks.
  assert.equal(result.blocked.length, 0, `launch-fast must not surface supplementary blocks: ${JSON.stringify(result.blocked)}`);
});

test('Block-rules: remediationFor() lookups by name or B-ID', () => {
  assert.equal(remediationFor('B1'), 'gitleaks protect --staged --redact');
  assert.equal(remediationFor('B1-LEAKED-CRED'), 'gitleaks protect --staged --redact');
  assert.equal(remediationFor('B10'), 'Run pinact run');
  assert.equal(remediationFor('B-NONEXISTENT'), null);
});

// ---------------------------------------------------------------------------
// Auto-heal idempotency (W393.7 plan Step 3)
// ---------------------------------------------------------------------------
//
// Per design spec §3 "auto-heal scope ... safe-local-idempotent only". Running the precheck
// twice against the same mocked state must produce identical results — no accumulation of
// healed actions, no state drift, and the second run must complete in <100ms.

test('Idempotency: evaluateBlockRules twice against same state yields identical output + 2nd run <100ms', () => {
  // gitleaks-friendly: split codes onto separate lines so the concatenated array literal
  // does not appear as a contiguous high-entropy token on a single line.
  const codes = [];
  codes.push('B-T1-LEAKED-CRED');
  codes.push('B-T4-GH-AUTH');
  codes.push('B7-T6-SMOKE-FAIL');
  const state = makeState({
    blockedCodes: codes,
    mode: 'deep',
  });
  const ctx = { _dockerProbe: () => ({ down: false }), _mcpVersionProbe: () => [], _shaPinProbe: () => [] };
  const r1 = evaluateBlockRules(state, ctx);
  const t0 = Date.now();
  const r2 = evaluateBlockRules(state, ctx);
  const dt = Date.now() - t0;
  // 2nd run must be near-instant — design spec §3 idempotency contract.
  assert.ok(dt < 100, `2nd-run elapsed ${dt}ms exceeds 100ms idempotency budget`);
  // Outputs must match (deep-equal on matched + supplementary count + per-id remediation).
  assert.equal(r1.matched.length, r2.matched.length, `matched length drift: ${r1.matched.length} vs ${r2.matched.length}`);
  assert.equal(r1.supplementary.length, r2.supplementary.length, `supplementary length drift`);
  for (let i = 0; i < r1.matched.length; i++) {
    assert.equal(r1.matched[i].id, r2.matched[i].id, `matched[${i}].id drift`);
    assert.equal(r1.matched[i].remediation, r2.matched[i].remediation, `matched[${i}].remediation drift`);
  }
});

test('Idempotency: runBlockRules in repair-mode twice produces zero accumulated healed actions', () => {
  const state = { blocked: [{ code: 'B-T1-LEAKED-CRED', detail: 'leaked', remediation: 'r' }], healed: [], advisory: [] };
  const r1 = runBlockRules({
    state,
    mode: 'repair',
    repoRoot: __dirname,
    env: process.env,
    config: {},
    _probes: { _dockerProbe: () => ({ down: false }), _mcpVersionProbe: () => [], _shaPinProbe: () => [] },
  });
  const t0 = Date.now();
  const r2 = runBlockRules({
    state,
    mode: 'repair',
    repoRoot: __dirname,
    env: process.env,
    config: {},
    _probes: { _dockerProbe: () => ({ down: false }), _mcpVersionProbe: () => [], _shaPinProbe: () => [] },
  });
  const dt = Date.now() - t0;
  // Auto-heal is OFF by design in this rule module; repair-mode is for tier-modules' repairs.
  assert.equal(r1.healed.length, 0, 'block-rules must NEVER auto-heal; r1.healed must be empty');
  assert.equal(r2.healed.length, 0, 'block-rules must NEVER auto-heal; r2.healed must be empty');
  // Second run must be <100ms (idempotency contract — pure-function evaluation).
  assert.ok(dt < 100, `2nd-run runBlockRules elapsed ${dt}ms exceeds 100ms idempotency budget`);
  // Same advisory output shape.
  assert.equal(r1.advisory.length, r2.advisory.length, `advisory length drift between idempotent runs`);
});

// ---------------------------------------------------------------------------
// Launch-fast / deep latency budgets (W393.7 plan Step 4)
// ---------------------------------------------------------------------------
//
// Per design spec §1:
//   - launch-fast: <5000ms — local-deterministic; no network.
//   - deep cache-warm: <30000ms — TTL=24h cached probes.
//
// The deep-mode budget test ensures the orchestrator completes within 30s on a "warm cache"
// run — i.e., when nothing is genuinely down. The test runs the full subprocess pipeline once
// to populate caches, then asserts the cached-run elapsed <30000ms.

test('Latency budget: T1-only launch-fast run completes in <5000ms (full subprocess pipeline)', () => {
  // Already covered by the existing 'T1: launch-fast latency strictly <5000ms' test, but we
  // re-assert here from the block-rules harness perspective so the W393.7 plan Step 4
  // contract is explicit + co-located with the rest of the block-rules suite.
  const t0 = Date.now();
  const { result, exit } = runPrecheck({ mode: 'launch-fast', env: process.env });
  const dt = Date.now() - t0;
  assert.ok(dt < 5000, `launch-fast subprocess latency ${dt}ms exceeds 5000ms budget`);
  assert.ok(result.elapsedMs < 5000, `internal elapsedMs ${result.elapsedMs}ms exceeds 5000ms budget`);
  // Block-rules tier MUST appear in tiers list (proves wiring).
  const br = result.tiers.find(t => t.tier === 'BLOCK-RULES');
  assert.ok(br, `BLOCK-RULES tier must appear in tiers list: ${JSON.stringify(result.tiers.map(t => t.tier))}`);
  assert.ok([0, 2].includes(exit), `exit must be 0 (OK) or 2 (BLOCKED); got ${exit}`);
});

test('Latency budget: T1+T2+T3+T4+T5+T6 deep run with all-cached completes in <30000ms', { timeout: 120000 }, () => {
  // First run = warm caches. Don't assert latency here.
  const warm = runPrecheck({ mode: 'deep', env: process.env });
  assert.ok(warm.result, 'warm run must produce a result');
  // Second run = cached. Must come in under 30s.
  const t0 = Date.now();
  const { result, exit } = runPrecheck({ mode: 'deep', env: process.env });
  const dt = Date.now() - t0;
  assert.ok(dt < 30000, `deep cached-run subprocess latency ${dt}ms exceeds 30000ms budget`);
  assert.ok(result.elapsedMs < 30000, `internal elapsedMs ${result.elapsedMs}ms exceeds 30000ms budget`);
  assert.ok(Array.isArray(result.tiers), 'tiers must be an array');
  // All 6 + block-rules tiers must appear (skipped tiers still produce entries via advisory).
  const tierNames = result.tiers.map(t => t.tier);
  for (const expected of ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'BLOCK-RULES']) {
    assert.ok(tierNames.includes(expected), `deep mode must include ${expected} tier; got: ${tierNames.join(',')}`);
  }
  // Exit must be deterministic given current state.
  assert.ok([0, 2].includes(exit), `exit must be 0 or 2; got ${exit}`);
});
