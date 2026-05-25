// tools/research-arch-v23/trust-probe.mjs
// W442-T5: R1a trust-tuple probes via OSSF Scorecard + Google osv-scanner.
// Lifts HALT-REJECT default by populating real probe results.
//
// Cite: cardinal-rule-1 #3 trust-tuple extension (CLAUDE.md) +
// OSSF Scorecard CLI v5+ https://github.com/ossf/scorecard +
// Google osv-scanner https://github.com/google/osv-scanner +
// OWASP A06:2021 + soul.md §6 fail-CLOSED contract.

import { execa } from 'execa';

const LICENSE_ALLOWLIST = new Set([
  'MIT', 'Apache-2.0', 'BSD-2-Clause', 'BSD-3-Clause', 'ISC', 'MPL-2.0',
]);

const SCORECARD_BIN = process.env.SCORECARD_BIN ?? 'scorecard';
const OSV_BIN = process.env.OSV_SCANNER_BIN ?? 'osv-scanner';

/**
 * Probe trust-tuple for target via OSSF Scorecard + osv-scanner.
 *
 * Fail-CLOSED: missing binaries / JSON parse failure / network errors
 * default ALL fields to FALSE.
 *
 * @param {{owner:string, repo:string, version:string, license?:string}} target
 * @returns {Promise<{signed_releases:boolean, license_safe:boolean,
 *           malicious_update_review:boolean, transitive_deps_clean:boolean, evidence:object}>}
 */
export async function probeTrust(target) {
  const evidence = {};
  let signed_releases = false;
  let malicious_update_review = false;
  let transitive_deps_clean = false;
  let license_safe = false;

  // (b) license_safe — allowlist check
  if (target.license && LICENSE_ALLOWLIST.has(target.license)) {
    license_safe = true;
    evidence.license = { value: target.license, source: 'target.license' };
  } else {
    evidence.license = { value: target.license ?? 'unknown', allowlist: [...LICENSE_ALLOWLIST] };
  }

  // (a) + (c) OSSF Scorecard
  try {
    const repoArg = `github.com/${target.owner}/${target.repo}`;
    const { exitCode, stdout } = await execa(
      SCORECARD_BIN,
      ['--repo', repoArg, '--format=json',
        '--checks=Maintained,Signed-Releases,Code-Review,SAST,Vulnerabilities'],
      { reject: false, timeout: 60_000 }
    );
    if (exitCode === 0 && stdout) {
      const parsed = JSON.parse(stdout);
      const byName = Object.fromEntries(
        (parsed.checks ?? []).map((c) => [c.name, c.score])
      );
      signed_releases = (byName['Signed-Releases'] ?? 0) >= 8;
      malicious_update_review = (byName['Maintained'] ?? 0) >= 7
        && (byName['Code-Review'] ?? 0) >= 7
        && (byName['Vulnerabilities'] ?? 0) >= 7;
      evidence.scorecard = { aggregateScore: parsed.score, checks: byName };
    } else {
      evidence.scorecard = { error: `exit-${exitCode}`, stdoutTruncated: (stdout ?? '').slice(0, 200) };
    }
  } catch (err) {
    evidence.scorecard = { error: err.code ?? err.name ?? err.message };
  }

  // (d) osv-scanner — transitive_deps_clean
  // W442 codex r2: osv-scanner requires a LOCAL lockfile. Scanning process.cwd()
  // would give the local repo's results for any remote target — false positive.
  // Fail-CLOSED: remote targets without local clone default to false.
  // Only scan if target has a localPath (future: clone-then-scan in W443).
  if (target.localPath) {
    try {
      const { exitCode, stdout } = await execa(
        OSV_BIN,
        ['scan', '--format=json', '--recursive', '.'],
        { reject: false, timeout: 30_000, cwd: target.localPath }
      );
      if (exitCode === 0 && stdout) {
        try {
          const parsed = JSON.parse(stdout);
          const vulns = (parsed.results ?? [])
            .flatMap((r) => r.packages ?? [])
            .flatMap((p) => p.vulnerabilities ?? []);
          const highOrCritical = vulns.filter((v) => {
            const sev = v.database_specific?.severity ?? v.severity ?? '';
            return /^(HIGH|CRITICAL)$/i.test(String(sev));
          });
          transitive_deps_clean = highOrCritical.length === 0;
          evidence.osv = { totalVulns: vulns.length, highOrCriticalCount: highOrCritical.length };
        } catch (parseErr) {
          evidence.osv = { error: `parse-fail: ${parseErr.message}` };
        }
      } else if (exitCode === 0) {
        transitive_deps_clean = true;
        evidence.osv = { totalVulns: 0 };
      } else {
        evidence.osv = { error: `osv-exit-${exitCode}`, exitCode };
      }
    } catch (err) {
      evidence.osv = { error: err.code ?? err.name ?? err.message };
    }
  } else {
    // No local path — fail-CLOSED for remote targets
    evidence.osv = {
      error: 'remote-scan-not-supported',
      note: 'osv-scanner requires local checkout; target.localPath not provided',
    };
  }

  return { signed_releases, license_safe, malicious_update_review, transitive_deps_clean, evidence };
}
