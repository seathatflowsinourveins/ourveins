#!/usr/bin/env node
// tools/eee-checks/block-rules.mjs — W393.7 (W409) Block-rules B1-B10 + remediation surface.
//
// Per docs/superpowers/specs/2026-05-25-W393-eee-contract-design.md §4 (block-rules) +
//   docs/superpowers/plans/2026-05-25-W393-phase-0a-implementation-plan.md Task 8.
//
// Architecture:
//   * Tier modules (t1..t6) emit canonical block-codes (B-T1-*, B-T2-*, B7-T6-*, ...).
//   * This module sits POST-TIER in the orchestrator pipeline (see eee-precheck.mjs).
//   * For each B1..B10 design-spec rule it:
//     (a) declares a `precondition({ blocked, advisory, healed, mode, repoRoot, env, config })`
//         function whose truthiness means "this B-rule applies to the current state",
//     (b) declares the operator-actionable `remediation` string (verbatim from spec §4),
//     (c) declares which tier-block codes are absorbed into the B-rule label.
//   * Output: post-tier `runBlockRules(...)` returns a `{ matched, supplementary }` shape that
//     the orchestrator folds into its result:
//        - `matched`: array of { id, code, detail, remediation } — non-empty when the rule
//          maps to a tier-emitted block already in `blocked` (label-only, no new block added).
//        - `supplementary`: array of { code, detail, remediation } — NEW blocks emitted by
//          rules that do their own probing (B4 docker, B6 gh-auth, B9 stale MCP version,
//          B10 floating SHA pin) when the tier modules don't surface them.
//
// Mode semantics:
//   - launch-fast: only deterministic rules fire (B1 cred-scan if gitleaks installed; B5
//     wave-lock collision; B2 hook-2KB cite). Network rules (B4/B6/B9/B10) gated to deep/repair.
//   - deep: full B1-B10 evaluation, with cached probes per rule's `probeCacheKey`.
//   - repair: full evaluation; B5 + B6 + B9 may auto-heal in --repair (cache refresh, gh re-auth
//     prompt). Repair mutations are operator-explicit; this module surfaces healing
//     opportunities as remediation strings, never auto-runs lifecycle mutations.
//
// Cite anchors (CR-6 verify-before-claim):
//   - CR-1..CR-6 cardinal-rules: CLAUDE.md (this repo) §"Cardinal rules (6)".
//   - B1 gitleaks invocation: https://github.com/gitleaks/gitleaks (`protect --staged --redact`).
//   - B2 CR-2/CR-5 2KB hook gate: CLAUDE.md cardinal-rule-2 + .pre-commit-config.yaml:cr2-2kb-hooks.
//   - B3 sca-v22 canonical: W384 PR #44 @ 2a37eb7 + W392 P0.1 sweep.
//   - B4 Docker daemon: per design spec §2 T2 docker-compose supervisor.
//   - B5 wave-lock: W363 dispatcher + tools/preagent-wave-lock-guard.mjs.
//   - B6 gh auth: gh CLI manual (`gh auth login --scopes ...`).
//   - B7 research-arch: W384 sca-v22 baseline; design spec §2 T6.
//   - B8 RDOE schema-firewall: W381 §5.
//   - B9 MCP version pin: .mcp.json declared-version vs local install.
//   - B10 GitHub Action SHA pin: pinact (https://github.com/suzuki-shunsuke/pinact).
//
// Return shape uniform with tier modules:
//   { tier: 'BLOCK-RULES', blocked: [...], healed: [...], advisory: [...] }
// Each `blocked` carries `code` (B1..B10 ID), `detail`, `remediation`, and optional `sourceCodes`
// (the canonical tier-emitted codes that triggered this label).

import { readFileSync, existsSync, statSync, readdirSync } from 'node:fs';
import { resolve, join, isAbsolute } from 'node:path';
import { spawnSync } from 'node:child_process';

// ---------------------------------------------------------------------------
// Helpers — pure (no I/O) so tests can mock state freely.
// ---------------------------------------------------------------------------

/**
 * True when `state.blocked` contains an entry whose `code` matches any of `codes` (array of
 * exact strings OR RegExp objects). Safe against empty state.
 */
function anyBlocked(state, codes) {
  const blocked = Array.isArray(state?.blocked) ? state.blocked : [];
  return blocked.some(b => codes.some(c => (c instanceof RegExp ? c.test(b.code || '') : b.code === c)));
}

function blockedMatching(state, codes) {
  const blocked = Array.isArray(state?.blocked) ? state.blocked : [];
  return blocked.filter(b => codes.some(c => (c instanceof RegExp ? c.test(b.code || '') : b.code === c)));
}

/**
 * True when `state.advisory` contains an entry whose `code` matches any of `codes`. Codex r2
 * P2 fix: some tier modules emit drift signals as ADVISORY (e.g. T5 emits A-T5-SCA-DRIFT for
 * sca-vN canonical drift). B3 must match those advisories as well as blocks.
 */
function anyAdvisory(state, codes) {
  const advisory = Array.isArray(state?.advisory) ? state.advisory : [];
  return advisory.some(a => codes.some(c => (c instanceof RegExp ? c.test(a.code || '') : a.code === c)));
}

function advisoryMatching(state, codes) {
  const advisory = Array.isArray(state?.advisory) ? state.advisory : [];
  return advisory.filter(a => codes.some(c => (c instanceof RegExp ? c.test(a.code || '') : a.code === c)));
}

function isDeepOrRepair(mode) {
  return mode === 'deep' || mode === 'repair';
}

function abs(repoRoot, rel) {
  return isAbsolute(rel) ? rel : resolve(repoRoot, rel);
}

function safeRead(absPath) {
  try { return readFileSync(absPath, 'utf8'); }
  catch { return null; }
}

function safeJson(absPath) {
  const raw = safeRead(absPath);
  if (raw === null) return null;
  try { return JSON.parse(raw); }
  catch { return null; }
}

// ---------------------------------------------------------------------------
// B-rule registry
// ---------------------------------------------------------------------------
//
// Each entry:
//   id            stable B1..B10 ID per design spec §4
//   sourceCodes   tier-emitted block codes that this rule labels (array of strings/RegExp)
//   remediation   operator-actionable string verbatim from spec §4 (≤200 chars preferred)
//   when          (state) => boolean — gating predicate for the optional `probe`
//   probe         optional (state, ctx) => { detail, blocks?: [{code, detail, remediation}] }
//                 fires only when `when` returns true; intended for rules that need their
//                 own probing (B4 docker / B6 gh-auth / B9 stale pin / B10 floating SHA).
//   precondition  (state) => boolean — high-level "rule applies in current state"; used by
//                 callers (test harness) to dispatch a single rule deterministically.

export const BLOCK_RULES = {
  'B1-LEAKED-CRED': {
    id: 'B1',
    sourceCodes: [/^B-T\d-LEAKED-CRED/, 'B-T1-LEAKED-CRED'],
    remediation: 'gitleaks protect --staged --redact',
    when: () => false, // rule labels existing tier-emitted blocks; no extra probe
    precondition: state => anyBlocked(state, [/^B-T\d-LEAKED-CRED/, 'B-T1-LEAKED-CRED']),
  },

  'B2-CR2-CR5-UNSANCTIONED-HOOK': {
    id: 'B2',
    sourceCodes: [/^B-T\d-HOOK-UNSANCTIONED/, 'B-T1-HOOK-UNSANCTIONED'],
    remediation: 'add CLAUDE.md cite-anchor or retire',
    when: () => false,
    precondition: state => anyBlocked(state, [/^B-T\d-HOOK-UNSANCTIONED/, 'B-T1-HOOK-UNSANCTIONED']),
  },

  'B3-SCA-VN-DRIFT': {
    id: 'B3',
    sourceCodes: ['B-T5-SCA-DRIFT', /^B-T5-SCA-/],
    // Codex r2 P2 fix: T5 currently emits A-T5-SCA-DRIFT as ADVISORY (not a block). B3 must
    // also match the advisory so canonical-sca-v22 drift surfaces the remediation string in
    // BOTH layers (block AND advisory).
    sourceAdvisoryCodes: ['A-T5-SCA-DRIFT', /^A-T5-SCA-/],
    // Codex r4 P2 fix: per design spec §4 B3 is a BLOCK-rule. When matched against
    // A-T5-SCA-DRIFT (or any advisory in sourceAdvisoryCodes) we MUST escalate to a
    // supplementary block so precheck exits 2 — surfacing the advisory alone left status OK.
    escalateAdvisoryToBlock: true,
    remediation: 'reconcile to canonical sca-v22 per W392 P0.1',
    when: () => false,
    precondition: state =>
      anyBlocked(state, ['B-T5-SCA-DRIFT', /^B-T5-SCA-/]) ||
      anyAdvisory(state, ['A-T5-SCA-DRIFT', /^A-T5-SCA-/]),
  },

  'B4-DOCKER-DAEMON-DOWN': {
    id: 'B4',
    sourceCodes: ['B-T2-DOCKER-DOWN', /^B-T2-DOCKER-/],
    remediation: 'Start Docker / nssm start docker',
    // Codex r4 P2 fix: only fire B4 probe when T2 has ALREADY surfaced an unhealthy
    // docker-backed required service. Otherwise a Docker CLI EPERM (admin-gated named pipe)
    // or missing-docker-binary becomes a false-positive block even when T2 said "all healthy".
    // The probe is now a corroboration step, not an independent admin-gated check.
    when: (state) => {
      if (!isDeepOrRepair(state?.mode)) return false;
      const svcs = state?.config?.t2?.services || [];
      // Required to have at least one docker-compose-supervised required service in config.
      const hasDockerSvc = svcs.some(s => s.supervisor === 'docker-compose' && s.blocking === 'required');
      if (!hasDockerSvc) return false;
      // T2 must have actually flagged at least one such service as unhealthy. Match T2's
      // canonical block code (B-T2-SERVICE-UNHEALTHY) AND require the detail to mention a
      // docker-compose-supervised service name.
      const dockerSvcNames = svcs
        .filter(s => s.supervisor === 'docker-compose')
        .map(s => s.name);
      const t2Unhealthy = (state.blocked || []).some(
        b => b.code === 'B-T2-SERVICE-UNHEALTHY'
          && dockerSvcNames.some(n => new RegExp(`\\b${n}\\b`).test(b.detail || ''))
      );
      return t2Unhealthy;
    },
    precondition: state => anyBlocked(state, ['B-T2-DOCKER-DOWN', /^B-T2-DOCKER-/])
      || (isDeepOrRepair(state?.mode) && _b4DockerProbeDown(state)),
    probe: (state, ctx) => {
      if (!isDeepOrRepair(state?.mode)) return null;
      // Honor injected probe for tests (codex r1-style determinism). Default probe runs
      // `docker version` with a 2.5s timeout.
      const probeFn = ctx?._dockerProbe ?? _defaultDockerProbe;
      const result = probeFn();
      if (result.down) {
        // Distinguish permission-denied (advisory) from genuine daemon-down (block) per
        // codex r4 — admin-gated named-pipe is an environment property, not a daemon failure.
        const isPermOnly = /permission|EPERM|EACCES|denied|access is denied|operation not permitted/i.test(
          result.reason || ''
        );
        if (isPermOnly) {
          // Reclassify as advisory via a non-blocking shape — return null so caller doesn't
          // emit a supplementary block. Operator-facing advisory is added below.
          return {
            blocks: [],
            advisory: [{
              code: 'A-BR-B4-DOCKER-PERM-ADVISORY',
              detail: `Docker CLI permission-only failure: ${result.reason} (likely admin-gated named-pipe)`,
              remediation: 'Run terminal as Administrator if Docker probes are required; otherwise this is non-blocking.',
            }],
          };
        }
        return {
          blocks: [{
            code: 'B4-DOCKER-DAEMON-DOWN',
            detail: `Docker daemon unreachable: ${result.reason}`,
            remediation: 'Start Docker / nssm start docker',
          }],
        };
      }
      return null;
    },
  },

  'B5-WAVE-LOCK-COLLISION': {
    id: 'B5',
    sourceCodes: ['B-T1-WAVE-LOCK-COLLISION', /^B-T1-WAVE-LOCK/],
    remediation: 'use tools/eee.ps1 --Wave Wn --Slug s',
    when: () => false,
    precondition: state => anyBlocked(state, ['B-T1-WAVE-LOCK-COLLISION', /^B-T1-WAVE-LOCK/]),
  },

  'B6-GH-AUTH-EXPIRED': {
    id: 'B6',
    sourceCodes: ['B-T4-GH-AUTH', /^B-T4-GH-AUTH/],
    remediation: 'gh auth login --scopes repo,workflow,admin:read',
    when: () => false, // T4 emits the canonical block when in deep/repair; we label it
    precondition: state => anyBlocked(state, ['B-T4-GH-AUTH', /^B-T4-GH-AUTH/]),
  },

  'B7-RESEARCH-ARCH-BROKEN': {
    id: 'B7',
    // T6 emits B7-T6-* family when baseline files present + tests fail/schema absent.
    sourceCodes: [/^B7-T6-/, 'B7-T6-BASELINE-CORRUPT', 'B7-T6-SMOKE-FAIL', 'B7-T6-SMOKE-TIMEOUT',
                  'B7-T6-SMOKE-SPAWN-ERROR', 'B7-T6-SMOKE-SPAWN-THREW', 'B7-T6-SCHEMA-INVALID'],
    remediation: 'Restore sca-v22 per W384 PR #44',
    when: () => false,
    precondition: state => anyBlocked(state, [/^B7-T6-/]),
  },

  'B8-RDOE-SCHEMA-FIREWALL-BREACH': {
    id: 'B8',
    sourceCodes: ['B8-T6-RDOE-FIREWALL-BREACH', /^B8-T6-RDOE/],
    remediation: 'Re-add firewall per W381 §5',
    when: () => false,
    precondition: state => anyBlocked(state, ['B8-T6-RDOE-FIREWALL-BREACH', /^B8-T6-RDOE/]),
  },

  'B9-CRITICAL-STALE-MCP': {
    id: 'B9',
    sourceCodes: ['B-T5-MCP-VERSION-STALE', /^B-T5-MCP-VERSION-/],
    remediation: 'npm install -g <pkg>@<declared>',
    // B9 either rides on T5 OR we run our own probe in deep/repair (parse .mcp.json
    // pinned version vs `npm ls -g --json`/`pip show <pkg>` — kept declarative).
    when: (state) => isDeepOrRepair(state?.mode),
    precondition: state => anyBlocked(state, ['B-T5-MCP-VERSION-STALE', /^B-T5-MCP-VERSION-/])
      || (isDeepOrRepair(state?.mode) && _b9StaleMcpPin(state)),
    probe: (state, ctx) => {
      if (!isDeepOrRepair(state?.mode)) return null;
      const probeFn = ctx?._mcpVersionProbe ?? _defaultMcpVersionProbe;
      const stale = probeFn(state);
      if (stale.length > 0) {
        return {
          blocks: stale.map(s => ({
            code: 'B9-CRITICAL-STALE-MCP',
            detail: `MCP '${s.name}' declared @${s.declared} but local install @${s.local || 'absent'} differs by major version`,
            remediation: `npm install -g ${s.pkg || s.name}@${s.declared}`,
          })),
        };
      }
      return null;
    },
  },

  'B10-GH-ACTION-SHA-FLOATING': {
    id: 'B10',
    sourceCodes: ['B-T4-SHA-FLOATING', /^B-T4-SHA-/, 'B-T4-PINACT-FLOATING'],
    remediation: 'Run pinact run',
    when: (state) => isDeepOrRepair(state?.mode),
    precondition: state => anyBlocked(state, ['B-T4-SHA-FLOATING', /^B-T4-SHA-/, 'B-T4-PINACT-FLOATING'])
      || (isDeepOrRepair(state?.mode) && _b10FloatingSha(state)),
    probe: (state, ctx) => {
      if (!isDeepOrRepair(state?.mode)) return null;
      const probeFn = ctx?._shaPinProbe ?? _defaultShaPinProbe;
      const floating = probeFn(state);
      if (floating.length > 0) {
        return {
          blocks: floating.map(f => ({
            code: 'B10-GH-ACTION-SHA-FLOATING',
            detail: `Required-check workflow '${f.workflow}' references action '${f.action}' without 40-char SHA pin`,
            remediation: 'Run pinact run',
          })),
        };
      }
      return null;
    },
  },
};

// ---------------------------------------------------------------------------
// Default probes — pure-fn, easily overridable for tests.
// ---------------------------------------------------------------------------

function _defaultDockerProbe() {
  try {
    const res = spawnSync('docker', ['version', '--format', '{{.Server.Version}}'], {
      encoding: 'utf8', timeout: 2500, windowsHide: true,
    });
    if (res.error) return { down: true, reason: `spawn error: ${String(res.error?.code || res.error?.message || '').slice(0, 80)}` };
    if (res.status !== 0) {
      const stderr = (res.stderr || '').trim().slice(0, 120);
      return { down: true, reason: `exit ${res.status}: ${stderr || 'no stderr'}` };
    }
    return { down: false, version: (res.stdout || '').trim() };
  } catch (e) {
    return { down: true, reason: `throw: ${String(e?.message || e).slice(0, 80)}` };
  }
}

function _b4DockerProbeDown(state) {
  if (!isDeepOrRepair(state?.mode)) return false;
  // Only check when at least one required docker-compose service is configured.
  const dockerSvc = state?.config?.t2?.services?.some(
    s => s.supervisor === 'docker-compose' && s.blocking === 'required'
  );
  if (!dockerSvc) return false;
  return _defaultDockerProbe().down;
}

/**
 * Default MCP version-pin staleness probe (codex r1 P2 fix).
 *
 * Reads `.mcp.json`, extracts declared `<pkg>@<major>.<minor>.<patch>` pins from `args[]`,
 * and (in deep/repair mode) probes the locally-installed version via `npm ls -g --json`.
 * Major-version mismatch = stale.
 *
 * Returns: array of `{name, pkg, declared, local}` for stale entries. Empty array when:
 *  - no `.mcp.json` present
 *  - no pinned `pkg@x.y.z` arg discovered
 *  - `npm` is missing OR the local-install probe times out (treat as inconclusive to avoid
 *    false-positive blocks — operator can run `npm ls -g` manually to confirm).
 */
function _defaultMcpVersionProbe(state) {
  const repoRoot = state?.repoRoot;
  if (!repoRoot) return [];
  const mcp = safeJson(resolve(repoRoot, '.mcp.json'));
  if (!mcp || !mcp.mcpServers) return [];
  // (1) Extract declared pins from mcpServers args[].
  const declared = []; // {serverName, pkg, version}
  for (const [name, entry] of Object.entries(mcp.mcpServers)) {
    if (entry?.disabled) continue;
    const args = Array.isArray(entry?.args) ? entry.args : [];
    for (const tok of args) {
      // Match common npx/uvx pin forms: `@scope/pkg@1.2.3` OR `pkg==1.2.3` (Python).
      const npmM = /^(@?[a-z0-9_.\-/]+)@(\d+)\.(\d+)\.(\d+)/i.exec(String(tok));
      const pyM = /^([a-z0-9_.-]+)==(\d+)\.(\d+)\.(\d+)/i.exec(String(tok));
      if (npmM) {
        declared.push({ serverName: name, pkg: npmM[1], version: `${npmM[2]}.${npmM[3]}.${npmM[4]}`, ecosystem: 'npm' });
        break;
      } else if (pyM) {
        declared.push({ serverName: name, pkg: pyM[1], version: `${pyM[2]}.${pyM[3]}.${pyM[4]}`, ecosystem: 'pypi' });
        break;
      }
    }
  }
  if (declared.length === 0) return [];
  // (2) Probe local npm-global installs in one shot. Skip Python pins — uvx caches per-call so
  // there's no canonical "installed" version on disk; treat as inconclusive.
  const npmPins = declared.filter(d => d.ecosystem === 'npm');
  if (npmPins.length === 0) return [];
  let lsResult;
  try {
    lsResult = spawnSync('npm', ['ls', '-g', '--depth=0', '--json'], {
      encoding: 'utf8', timeout: 6000, windowsHide: true,
    });
  } catch {
    return []; // npm absent — inconclusive, not stale.
  }
  if (lsResult.error || lsResult.status === undefined) return [];
  let lsJson;
  try { lsJson = JSON.parse(lsResult.stdout || '{}'); }
  catch { return []; }
  const deps = lsJson.dependencies || {};
  const stale = [];
  for (const pin of npmPins) {
    const dep = deps[pin.pkg];
    const localVer = dep?.version;
    if (!localVer) continue; // not installed globally — operator-decision, not stale-block.
    const dMajor = parseInt(pin.version.split('.')[0], 10);
    const lMajor = parseInt(String(localVer).split('.')[0], 10);
    if (Number.isFinite(dMajor) && Number.isFinite(lMajor) && dMajor !== lMajor) {
      stale.push({ name: pin.serverName, pkg: pin.pkg, declared: pin.version, local: localVer });
    }
  }
  return stale;
}

function _b9StaleMcpPin(state) {
  return _defaultMcpVersionProbe(state).length > 0;
}

/**
 * Default GitHub Action SHA-pin floating-ref probe.
 *
 * Walks `.github/workflows/*.yml`; flags any `uses: actions/...@<ref>` where `<ref>` is NOT
 * a 40-char hex SHA. Surfaces only entries in workflows declared as required-check contexts
 * (per `config.t4.current.requiredCheckContexts`). Returns array of `{workflow, action}`.
 */
function _defaultShaPinProbe(state) {
  const repoRoot = state?.repoRoot;
  if (!repoRoot) return [];
  const wfDir = resolve(repoRoot, '.github/workflows');
  if (!existsSync(wfDir)) return [];
  let files = [];
  try { files = readdirSync(wfDir).filter(f => /\.ya?ml$/.test(f)); }
  catch { return []; }
  const requiredCtxs = new Set(state?.config?.t4?.current?.requiredCheckContexts || []);
  const floating = [];
  for (const f of files) {
    const raw = safeRead(resolve(wfDir, f));
    if (!raw) continue;
    // Codex r2 + r5 P2 fix: gating combines (a) workflow `name:` parsed from YAML, (b)
    // filename heuristic, (c) job-name match — required contexts often contain bare job
    // names like `test` (from `ci.yml` whose workflow `name: CI`). When `requiredCheckContexts`
    // is non-empty we keep the workflow only if ANY of these signals match the ctx; otherwise
    // we DO scan (default-permissive) so the rule does not silently skip required workflows
    // — operators see false-positives faster than they discover false-negatives in a
    // security gate.
    if (requiredCtxs.size > 0) {
      // Parse `name: <name>` from the YAML (first match wins).
      const nameMatch = /^name:[\t ]*(?:["']?)([^"\r\n]+?)(?:["']?)[\t ]*$/m.exec(raw);
      const wfName = nameMatch ? nameMatch[1].trim() : '';
      // Parse job IDs — `^[\t ]{2}<jobid>:` lines under `jobs:`. Loose match.
      const jobIds = [];
      const jobsMatch = raw.match(/^jobs:\s*$/m);
      if (jobsMatch) {
        // Scan lines after `jobs:` for `^[\t ]{2,4}<id>:` pattern. Stop at next top-level key.
        const after = raw.slice(jobsMatch.index + jobsMatch[0].length);
        const jobRe = /^[\t ]{2,4}([a-zA-Z][a-zA-Z0-9_-]*):/gm;
        let jm;
        while ((jm = jobRe.exec(after)) !== null) jobIds.push(jm[1]);
      }
      // Match if workflow name OR any job ID OR filename heuristic intersects requiredCtxs.
      const ctxsLower = [...requiredCtxs].map(c => String(c).toLowerCase());
      const nameMatchedCtx = wfName && ctxsLower.some(ctx => {
        const wfLower = wfName.toLowerCase();
        return ctx.includes(wfLower) || wfLower.includes(ctx.split('/')[0].trim());
      });
      const jobMatchedCtx = jobIds.some(j => ctxsLower.some(ctx => ctx.split('/').some(seg => seg.trim() === j.toLowerCase())));
      const fileLower = f.toLowerCase();
      const fileMatched = /codeql|pre[-_]?commit|commitlint|codex|gates|hooks-form|wave[-_]?lock|cite[-_]?floor/.test(fileLower);
      // Codex r5 P2 fix: default-permissive — if NONE of (a)(b)(c) match but the workflow
      // declares `on: pull_request` (i.e. it COULD be a required check), scan it anyway.
      // This trades a false-positive for closing the silent-skip security gap.
      const couldBePR = /^on:\s*(\[.*pull_request|\s*pull_request)|^on:\s*\{[\s\S]*?pull_request/m.test(raw);
      if (!nameMatchedCtx && !jobMatchedCtx && !fileMatched && !couldBePR) continue;
    }
    // Codex r1 P2 + r3 P2 fix: match BOTH mapping-form `uses:` AND list-item form `- uses:`,
    // AND quoted forms `uses: "actions/checkout@v4"` / `uses: 'actions/checkout@v4'` per YAML
    // 1.2 grammar. Acceptable leading characters: tabs/spaces and an optional `-` (list-item
    // marker). Optional opening quote (single or double); the ref capture stops on the closing
    // quote OR whitespace. Use a tight non-greedy trailer so we don't consume newlines that
    // would skip subsequent steps (regression caught by codex r3 retest).
    const usesRe = /^[\t ]*-?[\t ]*uses:[\t ]+["']?([@\w./\-]+)@([^\s#'"\r\n]+)/gm;
    let m;
    while ((m = usesRe.exec(raw)) !== null) {
      const action = m[1];
      const ref = m[2];
      // SHA pin = 40 lowercase hex chars.
      if (!/^[0-9a-f]{40}$/.test(ref)) {
        floating.push({ workflow: f, action: `${action}@${ref}` });
      }
    }
  }
  return floating;
}

function _b10FloatingSha(state) {
  return _defaultShaPinProbe(state).length > 0;
}

// ---------------------------------------------------------------------------
// Public API — evaluateBlockRules + runBlockRules
// ---------------------------------------------------------------------------

/**
 * evaluateBlockRules — pure, no-I/O evaluation suitable for unit tests.
 * Returns `{ matched: [{id, code, detail, remediation, sourceCodes}], supplementary: [...] }`.
 *
 * @param {object} state {blocked, healed, advisory, mode, repoRoot, env, config}
 * @param {object} ctx   optional probe-injection hooks for tests
 */
export function evaluateBlockRules(state, ctx = {}) {
  const matched = [];
  const matchedAdvisory = [];
  const supplementary = [];
  for (const [name, rule] of Object.entries(BLOCK_RULES)) {
    // (1) Label existing tier-emitted blocks.
    const labeled = blockedMatching(state, rule.sourceCodes || []);
    for (const lbl of labeled) {
      matched.push({
        id: rule.id,
        ruleName: name,
        code: lbl.code,
        detail: lbl.detail,
        remediation: rule.remediation, // verbatim from design spec §4
        sourceRemediation: lbl.remediation,
        sourceCodes: rule.sourceCodes.map(c => (c instanceof RegExp ? c.source : c)),
      });
    }
    // (1b) Codex r2 P2 fix: also label tier-emitted ADVISORIES that the rule declares as
    // matching (e.g. B3 / A-T5-SCA-DRIFT). These produce a separate `matchedAdvisory` bucket
    // so they DON'T inflate the block count but DO surface the canonical remediation.
    if (Array.isArray(rule.sourceAdvisoryCodes) && rule.sourceAdvisoryCodes.length > 0) {
      const labeledAdv = advisoryMatching(state, rule.sourceAdvisoryCodes);
      for (const lbl of labeledAdv) {
        matchedAdvisory.push({
          id: rule.id,
          ruleName: name,
          code: lbl.code,
          detail: lbl.detail,
          remediation: rule.remediation,
          sourceCodes: rule.sourceAdvisoryCodes.map(c => (c instanceof RegExp ? c.source : c)),
        });
      }
      // Codex r4 P2 fix: when the rule declares `escalateAdvisoryToBlock`, mirror the advisory
      // matches into supplementary blocks so the canonical-block-rule contract from spec §4
      // is honored — i.e. precheck exits 2 (BLOCKED) when sca drift is present even if T5
      // emits it as advisory-only.
      if (rule.escalateAdvisoryToBlock && labeledAdv.length > 0 && labeled.length === 0) {
        for (const lbl of labeledAdv) {
          supplementary.push({
            id: rule.id,
            ruleName: name,
            code: `${rule.id}-ESCALATED-FROM-ADVISORY`,
            detail: `${rule.id} escalation from advisory ${lbl.code}: ${String(lbl.detail || '').slice(0, 200)}`,
            remediation: rule.remediation,
          });
        }
      }
    }
    // (2) Probe-driven rules (B4 / B9 / B10) — only when no existing block already covers them
    // and gating predicate `when` returns true.
    if (typeof rule.when === 'function' && rule.when(state) && typeof rule.probe === 'function' && labeled.length === 0) {
      const probeResult = rule.probe(state, ctx);
      if (probeResult && Array.isArray(probeResult.blocks)) {
        for (const b of probeResult.blocks) {
          supplementary.push({
            id: rule.id,
            ruleName: name,
            code: b.code || rule.id,
            detail: b.detail,
            remediation: b.remediation || rule.remediation,
          });
        }
      }
      // Codex r4 P2 fix: probes may also return non-blocking advisories (e.g. B4 docker-perm
      // denied that should not block the launch). Fold them into matchedAdvisory.
      if (probeResult && Array.isArray(probeResult.advisory)) {
        for (const a of probeResult.advisory) {
          matchedAdvisory.push({
            id: rule.id,
            ruleName: name,
            code: a.code || `A-BR-${rule.id}-PROBE`,
            detail: a.detail,
            remediation: a.remediation || rule.remediation,
            sourceCodes: ['probe'],
          });
        }
      }
    }
  }
  return { matched, matchedAdvisory, supplementary };
}

/**
 * runBlockRules — orchestrator-shaped wrapper around evaluateBlockRules.
 * Returns the same `{ tier, blocked, healed, advisory }` shape used by tier modules so the
 * orchestrator can fold it into its tier loop trivially.
 *
 * - blocked: supplementary (NEW) blocks created by probe-driven rules.
 * - advisory: B-rule labels for tier-emitted blocks (NOT new blocks — they would double-count).
 *
 * @param {object} args { state, mode, repoRoot, env, config, _probes? }
 */
export function runBlockRules({ state, mode, repoRoot, env, config, _probes = {} } = {}) {
  // Defensive copy + binding of mode/repoRoot/env/config in case caller passed them separately.
  const effective = {
    blocked: Array.isArray(state?.blocked) ? state.blocked : [],
    healed: Array.isArray(state?.healed) ? state.healed : [],
    advisory: Array.isArray(state?.advisory) ? state.advisory : [],
    mode: mode ?? state?.mode,
    repoRoot: repoRoot ?? state?.repoRoot,
    env: env ?? state?.env,
    config: config ?? state?.config,
  };
  const { matched, matchedAdvisory, supplementary } = evaluateBlockRules(effective, _probes);
  const advisory = [
    ...matched.map(m => ({
      code: `A-BR-${m.id}-LABEL`,
      detail: `${m.id} matched tier-block ${m.code}: ${String(m.detail || '').slice(0, 200)}`,
      remediation: m.remediation,
      sourceCode: m.code,
    })),
    // Codex r2 P2 fix: B-rule-matched advisories (e.g. B3 matching A-T5-SCA-DRIFT) surface
    // as A-BR-Bn-ADVISORY (a distinct code so operators can grep on EITHER label-class).
    ...(matchedAdvisory || []).map(m => ({
      code: `A-BR-${m.id}-ADVISORY`,
      detail: `${m.id} matched tier-advisory ${m.code}: ${String(m.detail || '').slice(0, 200)}`,
      remediation: m.remediation,
      sourceCode: m.code,
    })),
  ];
  return {
    tier: 'BLOCK-RULES',
    blocked: supplementary.map(s => ({
      code: s.code,
      detail: s.detail,
      remediation: s.remediation,
    })),
    healed: [],
    advisory,
  };
}

/**
 * remediationFor — public helper for callers that need a single B-rule remediation string.
 */
export function remediationFor(ruleNameOrId) {
  for (const [name, rule] of Object.entries(BLOCK_RULES)) {
    if (name === ruleNameOrId || rule.id === ruleNameOrId) return rule.remediation;
  }
  return null;
}

/**
 * BLOCK_RULE_IDS — stable list for test parameterization.
 */
export const BLOCK_RULE_IDS = Object.values(BLOCK_RULES).map(r => r.id);

// Test-only export of private helpers for fine-grained unit coverage.
export const __testing = {
  _defaultDockerProbe,
  _defaultMcpVersionProbe,
  _defaultShaPinProbe,
  anyBlocked,
  blockedMatching,
};

export default { BLOCK_RULES, evaluateBlockRules, runBlockRules, remediationFor, BLOCK_RULE_IDS };
