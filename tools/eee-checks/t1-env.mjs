#!/usr/bin/env node
// tools/eee-checks/t1-env.mjs — W393.1 (W402) T1 ENV / paths / wave-locks check.
//
// Per docs/superpowers/specs/2026-05-25-W393-eee-contract-design.md §2 T1
//   + docs/superpowers/plans/2026-05-25-W393-phase-0a-implementation-plan.md Task 1 step 4.
//
// Mode semantics (per plan modes block):
//   - launch-fast: local-deterministic only; no network. <5000ms budget.
//   - deep / repair: same T1 checks (T1 is always local; mode affects later tiers).
//
// Return shape (uniform per plan §self-review #4):
//   { tier: 'T1', blocked: [...], healed: [...], advisory: [...] }
//
// Each `blocked` entry: { code, detail, remediation }.

import { existsSync, statSync } from 'node:fs';
import { resolve, isAbsolute } from 'node:path';
import { spawnSync } from 'node:child_process';

/**
 * runT1 — T1 ENV / paths / wave-locks check.
 *
 * @param {object} args
 * @param {object} args.config Loaded .eee/precheck-config.json
 * @param {string} args.mode   'launch-fast' | 'deep' | 'repair'
 * @param {string} args.repoRoot Absolute path to the repo root.
 * @param {NodeJS.ProcessEnv} args.env Effective process env (caller may strip vars to simulate state).
 * @returns {{tier:string, blocked:Array, healed:Array, advisory:Array}}
 */
export function runT1({ config, mode, repoRoot, env }) {
  const t1 = config?.t1 ?? {};
  const blocked = [];
  const healed = [];
  const advisory = [];

  // 1. Required env vars — block on absent.
  const requiredEnv = Array.isArray(t1.requiredEnv) ? t1.requiredEnv : [];
  const missingRequired = requiredEnv.filter(name => !env[name] || env[name].length === 0);
  if (missingRequired.length > 0) {
    blocked.push({
      code: 'B-T1-ENV-MISSING',
      detail: `Required env vars missing: ${missingRequired.join(', ')}`,
      remediation: `Set the following env vars in CLAUDE.local.md ENV block (or tools/eee.local.ps1 sidecar) before launching: ${missingRequired.join(', ')}. See docs/superpowers/specs/2026-05-25-W393-eee-contract-design.md §2 T1.`,
    });
  }

  // 2. Advisory env — surface missing as advisory (do NOT block).
  const advisoryEnv = Array.isArray(t1.advisoryEnv) ? t1.advisoryEnv : [];
  const missingAdvisory = advisoryEnv.filter(name => !env[name] || env[name].length === 0);
  if (missingAdvisory.length > 0) {
    advisory.push({
      code: 'A-T1-ENV-ADVISORY-MISSING',
      detail: `Optional env vars missing (gates downstream smokes): ${missingAdvisory.join(', ')}`,
    });
  }

  // 3. Z:-portable invariant — block on mismatch.
  const inv = t1.zPortableInvariant ?? {};
  for (const [k, expected] of Object.entries(inv)) {
    if (env[k] && env[k] !== expected) {
      blocked.push({
        code: 'B-T1-Z-PORTABLE-VIOLATION',
        detail: `${k}='${env[k]}' but expected '${expected}' for Z:-portable invariant.`,
        remediation: `Set ${k}=${expected} per CLAUDE.local.md ENV block; this runtime is Z:-drive portable per CCBP claude-settings.md.`,
      });
    }
  }

  // 3a. HOME-derived no-C: leak — block per design spec §2 T1 "no C:-leak in HOME-derived paths".
  // Codex r1 P1 finding #2 fix.
  const homeDerivedVars = Array.isArray(t1.homeDerivedEnvVars) ? t1.homeDerivedEnvVars : [];
  const forbiddenPrefix = t1.homeDerivedForbiddenPrefix;
  if (forbiddenPrefix) {
    const cLeaks = homeDerivedVars
      .filter(name => env[name])
      .filter(name => env[name].toUpperCase().startsWith(forbiddenPrefix.toUpperCase()));
    if (cLeaks.length > 0) {
      blocked.push({
        code: 'B-T1-HOME-DERIVED-C-LEAK',
        detail: `HOME-derived env vars must NOT start with '${forbiddenPrefix}' (Z:-portable runtime): ${cLeaks.map(n => `${n}='${env[n]}'`).join(', ')}`,
        remediation: `Repoint each listed env var under Z:\\claude-sota-installed (per CLAUDE.local.md ENV block).`,
      });
    }
  }

  // 4. BASH_ENV target readable — block when BASH_ENV env var is set but the target file is
  //    absent (subprocess bash will silently lose HOME-pin shim and leak MSYS-mangled paths
  //    per W317 Stream-B root-cause analysis). When BASH_ENV is set, use THAT absolute path
  //    (not repoRoot-relative) so worktree-local .claude/state dirs don't false-positive a
  //    shared main-repo HOME-pin shim. Skip when env unset (requiredEnv guard catches that).
  //    Codex r1 P1 finding #2 fix.
  const bashEnvTarget = t1.bashEnvTarget;
  if (env.BASH_ENV) {
    // Normalize POSIX slashes -> native; Node existsSync handles either on Win32, but the
    // detail string reads better with the env-var's verbatim value.
    if (!existsSync(env.BASH_ENV)) {
      blocked.push({
        code: 'B-T1-BASH-ENV-TARGET-MISSING',
        detail: `BASH_ENV='${env.BASH_ENV}' is set but target file is not readable`,
        remediation: `Create ${env.BASH_ENV} (HOME-pin shim per W317 Stream-C) or unset BASH_ENV in CLAUDE.local.md.`,
      });
    }
  } else if (bashEnvTarget) {
    // BASH_ENV unset — fall back to repoRoot-relative probe (advisory only).
    const abs = isAbsolute(bashEnvTarget) ? bashEnvTarget : resolve(repoRoot, bashEnvTarget);
    if (!existsSync(abs)) {
      advisory.push({
        code: 'A-T1-BASH-ENV-TARGET-MISSING',
        detail: `BASH_ENV env unset and repoRoot-relative target absent at ${abs}`,
      });
    }
  }

  // 5. Wave-lock validate — advisory on failure (do NOT block at launch-fast; B5 collision
  //    is detected by the wave-lock-validate pre-commit hook + W363 dispatcher in eee.ps1).
  //    We surface a non-blocking signal so operator sees stale-lock noise.
  const guardRel = t1.waveLockTool;
  if (guardRel) {
    const guardAbs = isAbsolute(guardRel) ? guardRel : resolve(repoRoot, guardRel);
    if (existsSync(guardAbs)) {
      try {
        // Short timeout so the launch-fast budget is preserved.
        // --from-branch derives the wave from `git rev-parse --abbrev-ref HEAD` (e.g.
        // 'goal/W402-…' -> wave 'W402'); matches the .pre-commit-config.yaml invocation.
        const res = spawnSync(process.execPath, [guardAbs, '--validate', '--from-branch'], {
          encoding: 'utf8',
          timeout: 3000,
          windowsHide: true,
          env,
          cwd: repoRoot,
        });
        if (res.status !== 0 && !res.error) {
          advisory.push({
            code: 'A-T1-WAVE-LOCK-VALIDATE',
            detail: `wave-lock validate non-zero exit ${res.status}: ${(res.stderr || res.stdout || '').slice(0, 240)}`,
          });
        }
      } catch (e) {
        advisory.push({
          code: 'A-T1-WAVE-LOCK-VALIDATE-ERR',
          detail: `wave-lock validate threw: ${String(e?.message || e).slice(0, 240)}`,
        });
      }
    }
  }

  return { tier: 'T1', blocked, healed, advisory };
}

export default { runT1 };
