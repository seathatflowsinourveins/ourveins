#!/usr/bin/env node
// tools/eee-checks/t3-cli.mjs — W393.3 (W405) T3 CLI tools exact-probes.
//
// Per docs/superpowers/specs/2026-05-25-W393-eee-contract-design.md §2 T3
//   + docs/superpowers/plans/2026-05-25-W393-phase-0a-implementation-plan.md Task 4.
//
// Mode semantics:
//   - launch-fast: no T3 checks (T3 not in `modes.launch-fast.tiers`).
//   - deep / repair: probe every cliTools[] entry via `execSync(probeCommand)` with 5s timeout;
//       parse semver from stdout; compare to minVersion if declared.
//
// Return shape (uniform per plan §self-review #4):
//   { tier: 'T3', blocked: [...], healed: [...], advisory: [...] }
//
// CLI-tool entry shape (declared in .eee/precheck-config.json:t3.cliTools[]):
//   {
//     name: string,                  // human-readable tool name
//     probeCommand: string,          // exact shell command (e.g. "node --version")
//     minVersion?: string,           // semver string (e.g. "22.0.0"); compared if present
//     blocking: "required" | "advisory",
//     postWaveAdvisory?: boolean,    // true = tool absence advisory until cited wave PR lands
//     postWaveCite?: string          // human-readable note explaining the wave gate
//   }
//
// Block-rule semantics (per plan Task 4 step 2 + step 4):
//   - blocking:required + tool absent (ENOENT)               -> BLOCKED  (B-T3-CLI-MISSING)
//   - blocking:required + tool below minVersion              -> BLOCKED  (B-T3-CLI-VERSION-LOW)
//   - blocking:advisory OR postWaveAdvisory + tool absent    -> advisory (A-T3-CLI-ADVISORY)
//   - tool present + version OK (or no minVersion declared)  -> silent OK
//   - probe times out / non-zero exit + required             -> BLOCKED  (B-T3-CLI-PROBE-FAIL)
//   - probe times out / non-zero exit + advisory             -> advisory (A-T3-CLI-PROBE-FAIL)
//
// Semver parsing extracts the FIRST `MAJOR.MINOR[.PATCH]` substring from probe stdout.
// Examples handled:
//   "v22.22.0"                                  -> 22.22.0
//   "Python 3.14.3"                             -> 3.14.3
//   "gh version 2.92.0 (2026-04-28)"            -> 2.92.0
//   "codex-cli 0.130.0"                         -> 0.130.0
//   "2.1.150 (Claude Code)"                     -> 2.1.150
//   "8.30.1"                                    -> 8.30.1
//   "pinact version 3.0.0 (4ba07f3...)"         -> 3.0.0

import { execSync } from 'node:child_process';

const PROBE_TIMEOUT_MS = 5000;

/**
 * Extract MAJOR.MINOR[.PATCH] semver triple from probe stdout. Returns
 * { major, minor, patch, raw } numeric or null if no match.
 */
export function parseSemver(stdout) {
  if (typeof stdout !== 'string' || stdout.length === 0) return null;
  const m = stdout.match(/(\d+)\.(\d+)(?:\.(\d+))?/);
  if (!m) return null;
  return {
    major: Number(m[1]),
    minor: Number(m[2]),
    patch: m[3] !== undefined ? Number(m[3]) : 0,
    raw: `${m[1]}.${m[2]}.${m[3] ?? '0'}`,
  };
}

/**
 * Compare two semver triples (numeric, .raw ignored).
 * Returns 1 if a > b, -1 if a < b, 0 if equal.
 */
export function cmpSemver(a, b) {
  for (const k of ['major', 'minor', 'patch']) {
    if (a[k] > b[k]) return 1;
    if (a[k] < b[k]) return -1;
  }
  return 0;
}

/**
 * Probe a single CLI tool. Returns { found:bool, semver, stdout, error }.
 * Uses execSync (5s timeout) per plan Task 4 step 4.
 */
export function probeTool(tool, { execSyncImpl = execSync, envOverride } = {}) {
  try {
    const stdout = execSyncImpl(tool.probeCommand, {
      encoding: 'utf8',
      timeout: PROBE_TIMEOUT_MS,
      windowsHide: true,
      stdio: ['ignore', 'pipe', 'pipe'],
      env: envOverride ?? process.env,
    });
    return {
      found: true,
      semver: parseSemver(stdout),
      stdout,
      error: null,
    };
  } catch (e) {
    // execSync throws on non-zero exit, timeout, and ENOENT.
    // Distinguish ENOENT / spawn-failure (tool absent) from other failures.
    const code = e?.code;
    const errno = e?.errno;
    const status = e?.status;
    const signal = e?.signal;
    const absent =
      code === 'ENOENT' ||
      // Windows spawn failure for unresolved binaries: status=1 + stderr "is not recognized" / Error: Command failed: ...
      // gh.exe returning auth-fail still exits non-zero but produces stdout/stderr — those are PROBE_FAIL not absent.
      (errno === -4058) || // ENOENT on Windows libuv
      (errno === 'ENOENT') ||
      (typeof code === 'string' && /ENOENT/.test(code));
    return {
      found: !absent,
      semver: null,
      stdout: e?.stdout?.toString?.() ?? '',
      error: {
        code,
        errno,
        status,
        signal,
        message: String(e?.message || e).slice(0, 240),
      },
    };
  }
}

/**
 * runT3 — CLI tools exact-probes.
 *
 * @param {object} args
 * @param {object} args.config   Loaded .eee/precheck-config.json
 * @param {string} args.mode     'launch-fast' | 'deep' | 'repair'
 * @param {string} args.repoRoot Absolute path to repo root.
 * @param {object} [args.env]    Optional env override (testing).
 * @param {function} [args._probe] Optional probe-fn override (testing).
 * @returns {{tier:string, blocked:Array, healed:Array, advisory:Array}}
 */
export function runT3({ config, mode, repoRoot, env, _probe } = {}) {
  const t3 = config?.t3 ?? {};
  const blocked = [];
  const healed = [];
  const advisory = [];

  const cliTools = Array.isArray(t3.cliTools) ? t3.cliTools : [];
  if (cliTools.length === 0) {
    return { tier: 'T3', blocked, healed, advisory };
  }

  const probe = _probe ?? probeTool;

  for (const tool of cliTools) {
    if (!tool || typeof tool !== 'object' || !tool.name || !tool.probeCommand) continue;

    const required = tool.blocking === 'required' && !tool.postWaveAdvisory;
    // (advisoryTagged kept for readability; not used directly.)

    let res;
    try {
      res = probe(tool, { envOverride: env });
    } catch (e) {
      // Defensive — probeTool already wraps; but in case a test-injected probe throws.
      res = {
        found: false,
        semver: null,
        stdout: '',
        error: { code: 'PROBE_THREW', message: String(e?.message || e).slice(0, 240) },
      };
    }

    // Tool absent (ENOENT / not found in PATH).
    if (!res.found) {
      const cite = tool.postWaveCite ? ` (${tool.postWaveCite})` : '';
      if (required) {
        blocked.push({
          code: 'B-T3-CLI-MISSING',
          detail: `Required CLI '${tool.name}' not found on PATH (probe: \`${tool.probeCommand}\`)`,
          remediation: `Install '${tool.name}' per design spec §2 T3. Confirm via \`${tool.probeCommand}\` returns version string.`,
        });
      } else {
        advisory.push({
          code: 'A-T3-CLI-ADVISORY',
          detail: `Optional CLI '${tool.name}' absent${cite}; install when needed (probe: \`${tool.probeCommand}\`).`,
        });
      }
      continue;
    }

    // Tool present but probe failed (non-zero exit / timeout / parsable error).
    if (res.error) {
      const summary = res.error.signal === 'SIGTERM'
        ? `probe timed out after ${PROBE_TIMEOUT_MS}ms`
        : `probe exit=${res.error.status ?? '?'}: ${res.error.message}`;
      if (required) {
        blocked.push({
          code: 'B-T3-CLI-PROBE-FAIL',
          detail: `Required CLI '${tool.name}' probe failed: ${summary}`,
          remediation: `Verify '${tool.name}' is functional; re-run \`${tool.probeCommand}\` manually.`,
        });
      } else {
        advisory.push({
          code: 'A-T3-CLI-PROBE-FAIL',
          detail: `Optional CLI '${tool.name}' probe failed: ${summary}`,
        });
      }
      continue;
    }

    // Tool present + probe OK. If minVersion declared, compare.
    if (tool.minVersion) {
      const min = parseSemver(tool.minVersion);
      const got = res.semver;
      if (!min) {
        advisory.push({
          code: 'A-T3-CLI-MINVER-INVALID',
          detail: `Config error: '${tool.name}'.minVersion='${tool.minVersion}' is not a parseable semver; skipping comparison.`,
        });
      } else if (!got) {
        // Codex r2 P1 fix: required + minVersion declared + unparseable semver MUST block.
        // Exact-probe gate cannot fail-open: an empty/missing version token bypasses the
        // minVersion contract otherwise.
        if (required) {
          blocked.push({
            code: 'B-T3-CLI-VERSION-UNPARSED',
            detail: `Required CLI '${tool.name}' probe succeeded but version could not be parsed (minVersion=${tool.minVersion}; got '${String(res.stdout).slice(0, 100).replace(/\n/g, ' ')}')`,
            remediation: `Adjust 'probeCommand' for '${tool.name}' to emit a MAJOR.MINOR[.PATCH] token (per design spec §2 T3), or open an issue if the tool's version output format changed.`,
          });
        } else {
          advisory.push({
            code: 'A-T3-CLI-VERSION-UNPARSED',
            detail: `'${tool.name}' probe produced output without parseable semver: ${String(res.stdout).slice(0, 100).replace(/\n/g, ' ')}`,
          });
        }
      } else if (cmpSemver(got, min) < 0) {
        if (required) {
          blocked.push({
            code: 'B-T3-CLI-VERSION-LOW',
            detail: `Required CLI '${tool.name}' version ${got.raw} below minimum ${min.raw}`,
            remediation: `Upgrade '${tool.name}' to >=${tool.minVersion}; e.g. \`npm install -g ${tool.name}@latest\` or system package manager per CLAUDE.local.md.`,
          });
        } else {
          advisory.push({
            code: 'A-T3-CLI-VERSION-LOW-ADVISORY',
            detail: `Optional CLI '${tool.name}' version ${got.raw} below ${min.raw}; upgrade recommended.`,
          });
        }
      }
      // else: version OK — silent.
    }
    // else: no minVersion declared — presence-only check passed.
  }

  return { tier: 'T3', blocked, healed, advisory };
}

export default { runT3, parseSemver, cmpSemver, probeTool };
