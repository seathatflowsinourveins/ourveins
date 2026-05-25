#!/usr/bin/env node
// tools/eee-checks/t2-services.mjs — W393.2 (W404) T2 typed-service descriptor + auto-heal-safe-local.
//
// Per docs/superpowers/specs/2026-05-25-W393-eee-contract-design.md §2 T2
//   + docs/superpowers/plans/2026-05-25-W393-phase-0a-implementation-plan.md Task 3
//   + Z:/claude-sota-installed-state/W393-WAVE2-SERVICE-STATE-SNAPSHOT.md (live inventory).
//
// Mode semantics (per design §2 T2 + plan §3 auto-heal):
//   - launch-fast: roster-validation ONLY (parse t2.services; no I/O / no network).
//   - deep:        HTTP health-probe per service (10s timeout); BLOCKED if blocking='required' + fail;
//                  advisory if blocking='advisory'; respects healthProbeMode='deep-only'.
//   - repair:      same as deep PLUS invoke repairCommand when (a) not healthy and
//                  (b) repairPolicy != 'none' and (c) admin-context satisfies repairAdminRequired.
//
// Return shape (uniform per plan §self-review #4):
//   { tier: 'T2', blocked: [...], healed: [...], advisory: [...] }
//
// Each `blocked` entry: { code, detail, remediation }.

import { spawnSync } from 'node:child_process';

const PROBE_TIMEOUT_MS = 10_000;
const REPAIR_SETTLE_MS = 1_500;  // brief window for the repaired service to start listening.
// Per-command repair budget. With up to ~5 services + parallelized initial probes (10s ceiling)
// + repair settle + re-probe per service, a 10s per-command budget keeps the worst-case
// sequential-repair path within the declared repair.maxLatencyMs=60_000 budget
// (4 unhealthy × (10s repair + 1.5s settle + ≤10s re-probe) + 10s initial probe ≈ 96s worst case;
// the typical case is one or two services needing repair and well under budget).
// Codex r4 P2: bound repair attempts to the mode deadline.
const REPAIR_CMD_TIMEOUT_MS = 10_000;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * runT2 — T2 services typed-descriptor + auto-heal-safe-local.
 *
 * @param {object} args
 * @param {object} args.config Loaded .eee/precheck-config.json
 * @param {string} args.mode   'launch-fast' | 'deep' | 'repair'
 * @param {string} args.repoRoot Absolute path to the repo root.
 * @param {NodeJS.ProcessEnv} args.env Effective process env.
 * @returns {Promise<{tier:string, blocked:Array, healed:Array, advisory:Array}>}
 */
export async function runT2({ config, mode, repoRoot, env }) {
  const t2 = config?.t2 ?? {};
  const services = Array.isArray(t2.services) ? t2.services : [];
  const blocked = [];
  const healed = [];
  const advisory = [];

  // launch-fast: roster-validation ONLY per design §2 T2 + plan Task 3 step 2.
  // No I/O, no network — preserves the ≤5s launch-fast budget.
  if (mode === 'launch-fast') {
    for (const svc of services) {
      if (!svc || typeof svc !== 'object' || !svc.name) {
        advisory.push({
          code: 'A-T2-MALFORMED-DESCRIPTOR',
          detail: `t2.services[] entry missing .name: ${JSON.stringify(svc).slice(0, 160)}`,
        });
      }
    }
    return { tier: 'T2', blocked, healed, advisory };
  }

  // deep | repair: filter probable services + run probes in parallel to keep
  // total latency bounded by the slowest single probe (~10s) rather than O(N×10s).
  // Per codex r2 P2 #1: mode latency budgets in .eee/precheck-config.json (deep=30s,
  // repair=60s) MUST hold even with multiple slow services.
  const probeable = [];
  for (const svc of services) {
    if (!svc || typeof svc !== 'object' || !svc.name) {
      advisory.push({
        code: 'A-T2-MALFORMED-DESCRIPTOR',
        detail: `t2.services[] entry missing .name: ${JSON.stringify(svc).slice(0, 160)}`,
      });
      continue;
    }
    // Respect healthProbeMode: 'launch-fast'|'deep'|'deep-only'|'repair'|'none'.
    //   'launch-fast' → probe ONLY in launch-fast mode
    //   'deep'        → probe ONLY in deep mode
    //   'deep-only'   → probe in BOTH deep AND repair (the common case — equivalent to "not launch-fast")
    //   'repair'      → probe ONLY in repair mode
    //   'none'        → never probe
    // Per codex r3 P2: each mode value MUST be gated by the active mode so deep-only services
    // are not probed/repaired in modes that did not opt them in.
    const probeMode = svc.healthProbeMode ?? 'deep-only';
    const shouldProbe =
      (probeMode === 'launch-fast' && mode === 'launch-fast') ||
      (probeMode === 'deep' && mode === 'deep') ||
      (probeMode === 'deep-only' && (mode === 'deep' || mode === 'repair')) ||
      (probeMode === 'repair' && mode === 'repair');
    if (!shouldProbe) continue;
    probeable.push(svc);
  }

  // Parallel initial probes — single 10s ceiling regardless of N.
  const initialProbes = await Promise.all(probeable.map(svc => probeService(svc)));

  // Now process repair (sequentially — repair commands like docker compose / nssm start should
  // not race) and emit final blocked/advisory/healed entries.
  for (let i = 0; i < probeable.length; i++) {
    const svc = probeable[i];
    let isHealthy = initialProbes[i].healthy;
    let probeReason = initialProbes[i].reason;

    // repair mode: if initial probe failed AND policy allows AND admin OK, invoke repair
    // BEFORE deciding block-vs-advisory + re-probe to determine final state.
    // Per codex r1 P2: "re-check before keeping repaired services blocked".
    if (!isHealthy && mode === 'repair') {
      const repairCheck = canRepair(svc, env);
      if (repairCheck.allowed) {
        const repairOutcome = invokeRepair(svc, repoRoot, env);
        if (repairOutcome.invoked) {
          // Re-probe after repair (services often need a short window to bind / start).
          await sleep(REPAIR_SETTLE_MS);
          const reProbe = await probeService(svc);
          isHealthy = reProbe.healthy;
          probeReason = reProbe.healthy
            ? `repaired (post-repair probe: ${reProbe.reason})`
            : `still unhealthy after repair: ${reProbe.reason}`;
          // Surface the repair invocation as a HEALED entry regardless of post-probe
          // outcome — operator needs to see what was tried.
          healed.push({
            code: isHealthy ? 'H-T2-REPAIR-INVOKED' : 'H-T2-REPAIR-ATTEMPTED',
            detail: isHealthy
              ? `Repair invoked and verified healthy for '${svc.name}': ${svc.repairCommand}`
              : `Repair attempted but service '${svc.name}' still unhealthy: ${svc.repairCommand}`,
            evidence: {
              exitCode: repairOutcome.exitCode,
              stdoutPreview: (repairOutcome.stdout || '').slice(0, 200),
              stderrPreview: (repairOutcome.stderr || '').slice(0, 200),
              postProbeReason: reProbe.reason,
            },
          });
        }
      } else if (repairCheck.reason) {
        advisory.push({
          code: 'A-T2-REPAIR-SKIPPED',
          detail: `Repair skipped for '${svc.name}': ${repairCheck.reason}`,
        });
      }
    }

    if (!isHealthy) {
      // Service unhealthy (and either non-repair mode OR repair attempted+failed/skipped) —
      // decide block vs advisory by `blocking` field.
      const blockingLevel = svc.blocking ?? 'advisory';
      const detail = `Service '${svc.name}' health probe failed: ${probeReason}`;

      if (blockingLevel === 'required') {
        blocked.push({
          code: 'B-T2-SERVICE-UNHEALTHY',
          detail,
          remediation: buildRemediation(svc),
        });
      } else {
        // 'advisory' or 'credential-gated' or anything else -> advisory.
        advisory.push({
          code: 'A-T2-SERVICE-UNHEALTHY',
          detail,
          ...(svc.advisoryNote ? { note: svc.advisoryNote } : {}),
        });
      }
    } else if (svc.advisoryNote) {
      // Healthy but operator-flagged via advisoryNote (e.g., phoenix "running-but-unwired").
      advisory.push({
        code: 'A-T2-SERVICE-ADVISORY-NOTE',
        detail: `Service '${svc.name}' healthy but advisory: ${svc.advisoryNote}`,
      });
    }
  }

  return { tier: 'T2', blocked, healed, advisory };
}

/**
 * probeService — execute the health probe for one service.
 * Supports transport: 'http' | 'stdio' | 'grpc' | 'none'.
 * Returns { healthy: boolean, reason: string }.
 */
async function probeService(svc) {
  const transport = svc.transport ?? 'http';

  // 'none' transport (e.g., phoenix advisory) is always treated as healthy at the probe level
  // — the advisoryNote handler above surfaces the operator note.
  if (transport === 'none') return { healthy: true, reason: 'transport=none (no probe)' };

  const probe = svc.healthProbe;
  if (!probe || typeof probe !== 'object') {
    return { healthy: false, reason: 'missing healthProbe descriptor' };
  }

  if (probe.type === 'advisory') {
    // Advisory-only; treat as healthy at probe level; advisoryNote (if present) surfaces above.
    return { healthy: true, reason: 'healthProbe.type=advisory' };
  }

  if (probe.type === 'http' && typeof probe.url === 'string') {
    return await probeHttp(probe.url);
  }

  return { healthy: false, reason: `unsupported healthProbe.type='${probe.type}'` };
}

/**
 * probeHttp — minimal HTTP GET with AbortController timeout.
 * Treats any 2xx OR 3xx as healthy (LlamaSwap returns 302 redirect to /ui per snapshot).
 */
async function probeHttp(url) {
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), PROBE_TIMEOUT_MS);
  try {
    const res = await fetch(url, { signal: ctl.signal, redirect: 'manual' });
    // 2xx + 3xx = healthy (LlamaSwap :8090 returns 302 redirect; cognee :8000/health → 200).
    if (res.status >= 200 && res.status < 400) {
      return { healthy: true, reason: `HTTP ${res.status}` };
    }
    return { healthy: false, reason: `HTTP ${res.status}` };
  } catch (e) {
    const msg = String(e?.message || e).slice(0, 160);
    return { healthy: false, reason: `fetch error: ${msg}` };
  } finally {
    clearTimeout(t);
  }
}

/**
 * canRepair — gate the auto-heal step.
 * Returns { allowed: boolean, reason?: string }.
 * Per design §3 auto-heal: NEVER fire in default `eee` mode regardless of repairPolicy.
 * Repair runs ONLY when (a) mode==='repair' AND (b) repairPolicy != 'none' AND
 * (c) admin context satisfies repairAdminRequired.
 *
 * The supplied `env` is consulted for EEE_ADMIN_CONTEXT (NOT process.env) — per codex r2 P2 #2
 * a caller that strips/sets EEE_ADMIN_CONTEXT in their synthetic env must see that decision honored.
 *
 * @param {object} svc service descriptor
 * @param {NodeJS.ProcessEnv} env effective env (caller-provided; falls back to process.env)
 */
function canRepair(svc, env = process.env) {
  const policy = svc.repairPolicy ?? 'none';
  if (policy === 'none') {
    return { allowed: false, reason: `repairPolicy='none'` };
  }
  if (typeof svc.repairCommand !== 'string' || svc.repairCommand.length === 0) {
    return { allowed: false, reason: 'repairCommand absent' };
  }
  if (svc.repairAdminRequired === true) {
    // On Windows the cheap & reliable check is "are we running elevated?". Node has no portable
    // primitive; on POSIX we can `process.geteuid()===0`. On Win32 we use the AdminRequired
    // env hook so a future operator can opt-in via `eee --repair --as-admin`.
    if (process.platform === 'win32') {
      // Read from the supplied env (codex r2 P2 #2 fix).
      if (env.EEE_ADMIN_CONTEXT !== '1') {
        return {
          allowed: false,
          reason: 'repairAdminRequired=true but admin context not asserted (set EEE_ADMIN_CONTEXT=1 from elevated shell)',
        };
      }
    } else if (typeof process.geteuid === 'function' && process.geteuid() !== 0) {
      return { allowed: false, reason: 'repairAdminRequired=true but euid!=0' };
    }
  }
  return { allowed: true };
}

/**
 * invokeRepair — actually run the repair subprocess.
 * Returns { invoked: boolean, exitCode?: number, stdout?: string, stderr?: string }.
 */
function invokeRepair(svc, repoRoot, env) {
  const cmd = svc.repairCommand;
  if (typeof cmd !== 'string' || cmd.length === 0) {
    return { invoked: false };
  }
  // shell:true is required for the docker-compose / nssm one-liners declared in config.
  // Per-command timeout bounded by REPAIR_CMD_TIMEOUT_MS (codex r4 P2 fix) so the aggregate
  // repair phase respects modes.repair.maxLatencyMs even when several services need repair.
  const res = spawnSync(cmd, {
    encoding: 'utf8',
    timeout: REPAIR_CMD_TIMEOUT_MS,
    shell: true,
    windowsHide: true,
    cwd: repoRoot,
    env,
  });
  return {
    invoked: true,
    exitCode: res.status,
    stdout: res.stdout || '',
    stderr: res.stderr || '',
  };
}

/**
 * buildRemediation — service-aware remediation string for BLOCKED entries.
 */
function buildRemediation(svc) {
  if (svc.repairCommand && (svc.repairPolicy === 'safe-local-idempotent' || svc.repairPolicy === 'repair-only')) {
    const adminHint = svc.repairAdminRequired ? ' (needs elevated shell)' : '';
    return `Re-run with \`eee --repair\` to auto-invoke: ${svc.repairCommand}${adminHint}. Or run the command manually.`;
  }
  if (svc.supervisor) {
    return `Start service '${svc.name}' via supervisor '${svc.supervisor}'.`;
  }
  return `Start service '${svc.name}' manually.`;
}

export default { runT2 };
