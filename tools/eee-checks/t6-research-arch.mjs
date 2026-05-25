#!/usr/bin/env node
// tools/eee-checks/t6-research-arch.mjs — W393.6 (W408) T6 Research-arch deep-checks.
//
// Per docs/superpowers/specs/2026-05-25-W393-eee-contract-design.md §2 T6 + §8 deep-dive
//   + docs/superpowers/plans/2026-05-25-W393-phase-0a-implementation-plan.md Task 7
//   + Z:/claude-sota-installed-state/W393-SOTA-EXTRACT-NOTES.md:5-35 Stream A.
//
// T6 is the operator-PRIORITY tier — meta-architecture gate for every SOTA-adoption
// decision. If T6 silently regresses, every adoption compounds the regression. The
// design's "ADVISORY-until-baseline-lands" stance lets the precheck land before W384
// without false-blocking worktrees where the discovery files are absent.
//
// Mode semantics:
//   - launch-fast: T6 NOT scheduled (modes.launch-fast.tiers = ["T1"] only).
//   - deep: full T6 checks — baseline manifest + forward-readiness + multi-convergence
//     routing + install-priority roster.
//   - repair: same as deep (T6 has no lifecycle mutations — it observes only).
//
// Return shape (uniform per plan §self-review #4):
//   { tier: 'T6', blocked: [...], healed: [...], advisory: [...] }

import { readFileSync, existsSync, statSync, readdirSync } from 'node:fs';
import { resolve, isAbsolute, join } from 'node:path';
import { spawnSync } from 'node:child_process';

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

function abs(repoRoot, p) {
  return isAbsolute(p) ? p : resolve(repoRoot, p);
}

function safeReadJson(path) {
  try {
    return JSON.parse(readFileSync(path, 'utf8'));
  } catch {
    return null;
  }
}

/**
 * Run the smoke test via spawnSync(node --test). Extracted as a module-level
 * helper so test harnesses CAN mock-replace it via `runT6({..., _smokeRunner})`
 * — the production code path uses `node --test smokeFile`, but when this test
 * file itself runs under `node --test` (the outer runner), Node 22 detects the
 * inner `--test` spawn as recursive and silently short-circuits it. The
 * production orchestrator (eee-precheck.mjs) is NOT in test runner mode, so
 * production code paths exercise this helper correctly.
 *
 * Returns the same shape as spawnSync: { status, signal, error?, stdout, stderr }.
 */
function defaultSmokeRunner(repoRoot, smokeRel, timeoutMs) {
  return spawnSync(process.execPath, ['--test', smokeRel], {
    cwd: repoRoot,
    encoding: 'utf8',
    timeout: timeoutMs,
    windowsHide: true,
  });
}

function nodeCheck(repoRoot, relPath, timeoutMs = 5000) {
  const absPath = abs(repoRoot, relPath);
  if (!existsSync(absPath)) return { ok: false, reason: 'absent' };
  let res;
  try {
    res = spawnSync(process.execPath, ['--check', absPath], {
      encoding: 'utf8',
      timeout: timeoutMs,
      windowsHide: true,
    });
  } catch (e) {
    return { ok: false, reason: `spawn-threw: ${String(e?.message || e).slice(0, 200)}` };
  }
  // Codex r1 finding #3 (CR-6 truthful detail): distinguish spawn-error / timeout / signal / non-zero-exit
  // explicitly so the B7 detail string never reports "syntax-error: " (empty stderr).
  if (res.error) {
    return { ok: false, reason: `spawn-error: ${String(res.error.message || res.error).slice(0, 200)}` };
  }
  if (res.signal) {
    return { ok: false, reason: `signal: ${res.signal} (likely timeout >${timeoutMs}ms)` };
  }
  if (res.status === 0) return { ok: true };
  // Non-zero exit. Surface BOTH stderr and stdout (parser errors usually go to stderr; some
  // environments emit to stdout). If both empty, name the exit code rather than fabricating
  // a "syntax-error: " label.
  const stderr = (res.stderr || '').trim();
  const stdout = (res.stdout || '').trim();
  if (stderr) return { ok: false, reason: `syntax-error: ${stderr.slice(0, 200)}` };
  if (stdout) return { ok: false, reason: `non-zero-exit-stdout: ${stdout.slice(0, 200)}` };
  return { ok: false, reason: `non-zero-exit-${res.status}-no-output` };
}

function ageDays(mtime) {
  const ms = Date.now() - mtime.getTime();
  return ms / (1000 * 60 * 60 * 24);
}

/**
 * Probe a single engine-or-item descriptor for presence. Used by BOTH
 * multi-convergence routing AND install-priority roster to keep probe semantics
 * unified (codex r1 finding #2). Returns { satisfied, probes: [{kind,target,ok}, ...] }.
 *
 * Recognised probe kinds:
 *   - mcpServer: presence in `.mcp.json.mcpServers`
 *   - pluginId: presence in installed_plugins (key match)
 *   - skillNamePrefix: directory name prefix-match under skillsDir
 *   - pipPackage: python -c "import importlib; spec=...find_spec(name)" exit code
 *   - condaEnvPath: existsSync of path (absolute or repoRoot-relative)
 *   - markerPath: existsSync of arbitrary marker file/dir
 */
function probeEnginePresence(item, ctx) {
  const probes = [];
  let satisfied = false;
  const { mcpServers, pluginIds, skillNames, skillsDir, repoRoot } = ctx;

  if (item.mcpServer) {
    const ok = !!mcpServers[item.mcpServer];
    probes.push({ kind: 'mcpServer', target: item.mcpServer, ok });
    if (ok) satisfied = true;
  }
  if (item.pluginId) {
    const ok = pluginIds.has(item.pluginId);
    probes.push({ kind: 'pluginId', target: item.pluginId, ok });
    if (ok) satisfied = true;
  }
  if (item.skillNamePrefix) {
    let ok = false;
    if (skillsDir && existsSync(skillsDir)) {
      const prefixes = Array.isArray(item.skillNamePrefix) ? item.skillNamePrefix : [item.skillNamePrefix];
      for (const sk of skillNames) {
        if (prefixes.some(p => sk.startsWith(p.toLowerCase()))) { ok = true; break; }
      }
    }
    probes.push({ kind: 'skillNamePrefix', target: item.skillNamePrefix, ok });
    if (ok) satisfied = true;
  }
  if (item.pipPackage) {
    let ok = false;
    try {
      const py = process.env.PYTHON || 'python';
      const res = spawnSync(
        py,
        ['-c', `import importlib.util,sys; sys.exit(0 if importlib.util.find_spec('${item.pipPackage}') else 1)`],
        { encoding: 'utf8', timeout: 5000, windowsHide: true }
      );
      ok = res.status === 0;
    } catch {
      // python absent / spawn-error => not satisfied
    }
    probes.push({ kind: 'pipPackage', target: item.pipPackage, ok });
    if (ok) satisfied = true;
  }
  if (item.condaEnvPath) {
    const ap = isAbsolute(item.condaEnvPath) ? item.condaEnvPath : abs(repoRoot, item.condaEnvPath);
    const ok = existsSync(ap);
    probes.push({ kind: 'condaEnvPath', target: item.condaEnvPath, ok });
    if (ok) satisfied = true;
  }
  if (item.markerPath) {
    const ap = isAbsolute(item.markerPath) ? item.markerPath : abs(repoRoot, item.markerPath);
    const ok = existsSync(ap);
    probes.push({ kind: 'markerPath', target: item.markerPath, ok });
    if (ok) satisfied = true;
  }

  return { satisfied, probes };
}

/**
 * Build engine-probe context once per T6 run — parses .mcp.json + installed_plugins
 * + skills dir so individual probes don't re-read those files.
 */
function buildEngineProbeContext(repoRoot, env) {
  const mcpServers = (() => {
    const mcpPath = abs(repoRoot, '.mcp.json');
    if (!existsSync(mcpPath)) return {};
    return safeReadJson(mcpPath)?.mcpServers || {};
  })();

  const pluginsCandidates = [abs(repoRoot, '.claude/plugins/installed_plugins.json')];
  if (env.CLAUDE_CONFIG_DIR) {
    pluginsCandidates.push(join(env.CLAUDE_CONFIG_DIR, 'plugins', 'installed_plugins.json'));
  }
  const pluginIds = new Set();
  for (const cand of pluginsCandidates) {
    if (!existsSync(cand)) continue;
    const parsed = safeReadJson(cand);
    if (!parsed) continue;
    if (parsed.plugins && typeof parsed.plugins === 'object') {
      for (const key of Object.keys(parsed.plugins)) pluginIds.add(key);
    } else if (parsed.enabledPlugins && typeof parsed.enabledPlugins === 'object') {
      for (const key of Object.keys(parsed.enabledPlugins)) pluginIds.add(key);
    }
    break;
  }

  const skillsDir = env.CLAUDE_CONFIG_DIR
    ? join(env.CLAUDE_CONFIG_DIR, 'skills')
    : abs(repoRoot, '.claude/skills');
  const skillNames = new Set();
  if (existsSync(skillsDir)) {
    try {
      for (const ent of readdirSync(skillsDir, { withFileTypes: true })) {
        if (ent.isDirectory()) skillNames.add(ent.name.toLowerCase());
      }
    } catch {
      // best-effort
    }
  }

  return { mcpServers, pluginIds, skillNames, skillsDir, repoRoot };
}

// -----------------------------------------------------------------------------
// Sub-checks (each pushes into blocked/healed/advisory arrays).
// -----------------------------------------------------------------------------

/**
 * Sub-check 1 — Baseline manifest:
 *   - File-presence: tools/sota-discovery/{discover,evaluate-v22}.mjs + lib + tests + schema.
 *   - If files absent → ADVISORY "W384 baseline missing; T6 deferred"; NO block.
 *   - If files present → node --check + smoke test (timeout 30s).
 *   - Always check: gh-cascade.sh + duckdb-hf-hub-stats.sql presence (Stage-0.5).
 */
function checkBaselineManifest(config, repoRoot, blocked, healed, advisory, smokeRunner = defaultSmokeRunner) {
  const baseline = config?.t6?.baseline ?? {};
  const manifest = Array.isArray(baseline.fileManifest) ? baseline.fileManifest : [];
  const schemaPath = baseline.schemaPath || null;
  const smokeTest = baseline.smokeTest || null;
  const smokeTimeoutMs = baseline.smokeTimeoutMs || 30000;
  const alwaysCheck = Array.isArray(baseline.alwaysCheck) ? baseline.alwaysCheck : [];

  const presentFiles = [];
  const absentFiles = [];
  for (const rel of manifest) {
    const ap = abs(repoRoot, rel);
    if (existsSync(ap)) presentFiles.push(rel);
    else absentFiles.push(rel);
  }

  // Stage-0.5 anti-popularity-bias bypass cascade (always-checked).
  for (const rel of alwaysCheck) {
    const ap = abs(repoRoot, rel);
    if (!existsSync(ap)) {
      advisory.push({
        code: 'A-T6-STAGE-0.5-CASCADE-MISSING',
        detail: `Stage-0.5 anti-popularity-bias bypass file absent: ${rel}. Per sca-v15+ §1.5 ≥1 candidate-source method must be non-MCP-direct.`,
      });
    }
  }

  // If ANY file absent → ADVISORY (W384 not yet landed). Do not block.
  if (absentFiles.length > 0) {
    advisory.push({
      code: 'A-T6-BASELINE-MISSING',
      detail: `W384 baseline missing ${absentFiles.length}/${manifest.length} files; T6 deferred until landed. Missing: ${absentFiles.slice(0, 5).join(', ')}${absentFiles.length > 5 ? ` (+${absentFiles.length - 5} more)` : ''}.`,
    });
    // Schema absence is informational while baseline incomplete.
    if (schemaPath && !existsSync(abs(repoRoot, schemaPath))) {
      advisory.push({
        code: 'A-T6-SCHEMA-MISSING',
        detail: `sca-v22 schema absent at ${schemaPath} (W392 P2.1 pending).`,
      });
    }
    return; // Skip the rest of baseline checks.
  }

  // All baseline files present → node --check each (B7 candidate-block on syntax error).
  for (const rel of manifest) {
    if (!rel.endsWith('.mjs') && !rel.endsWith('.js')) continue; // only validate JS modules
    const r = nodeCheck(repoRoot, rel);
    if (!r.ok) {
      blocked.push({
        code: 'B7-T6-BASELINE-CORRUPT',
        detail: `node --check failed for ${rel}: ${r.reason}`,
        remediation: 'Restore sca-v22 baseline per W384 PR #44 @ 2a37eb7. Until then, set t6.baseline.fileManifest to [] to defer T6.',
      });
    }
  }

  // Schema present? (advisory-tier — W392 P2.1 may not have landed yet)
  if (schemaPath) {
    const sap = abs(repoRoot, schemaPath);
    if (!existsSync(sap)) {
      advisory.push({
        code: 'A-T6-SCHEMA-MISSING',
        detail: `sca-v22 schema absent at ${schemaPath} (W392 P2.1 pending — does not block while sca-v22-align PR in-flight).`,
      });
    } else {
      const parsed = safeReadJson(sap);
      if (!parsed) {
        blocked.push({
          code: 'B7-T6-SCHEMA-INVALID',
          detail: `sca-v22 schema at ${schemaPath} is not valid JSON`,
          remediation: 'Regenerate schema per W392 P2.1.',
        });
      }
    }
  }

  // Smoke-test (B7 candidate). Codex r3 finding: explicit error-path classification
  // mirroring nodeCheck() — spawn-error / signal / non-zero-exit MUST surface as B7
  // BLOCK (never silently swallow). Specification: baseline-present + smoke failure
  // = B7 BLOCK per design spec §2 T6 + plan Task 7.
  if (smokeTest && existsSync(abs(repoRoot, smokeTest))) {
    let res;
    let spawnThrew = null;
    try {
      res = smokeRunner(repoRoot, smokeTest, smokeTimeoutMs);
    } catch (e) {
      spawnThrew = e;
    }
    const remediation = 'Restore sca-v22 baseline per W384 PR #44 @ 2a37eb7; re-run smoke locally before retrying.';
    // Codex r3-recheck finding: real `spawnSync(..., { timeout })` timeouts surface
    // BOTH `res.error` (ETIMEDOUT) AND `res.signal` (SIGTERM/SIGKILL). Classify
    // timeouts FIRST (signal-present OR error.code === 'ETIMEDOUT') so they don't
    // collapse into the generic spawn-error bucket.
    const isTimeoutShape =
      (res && res.signal) ||
      (res && res.error && (res.error.code === 'ETIMEDOUT' || /ETIMEDOUT/.test(String(res.error.message || ''))));
    if (spawnThrew) {
      blocked.push({
        code: 'B7-T6-SMOKE-SPAWN-THREW',
        detail: `T6 smoke spawn threw: ${String(spawnThrew?.message || spawnThrew).slice(0, 200)}`,
        remediation,
      });
    } else if (isTimeoutShape) {
      // Timeout — either signal-killed by spawnSync's timeout enforcement OR error.code=ETIMEDOUT.
      const sig = res.signal ? `signal=${res.signal}` : '';
      const errBits = res.error ? `${res.error.code || ''} ${String(res.error.message || '').slice(0, 80)}`.trim() : '';
      const detailParts = [`T6 smoke ${smokeTest} terminated`];
      if (sig) detailParts.push(sig);
      if (errBits) detailParts.push(`error=${errBits}`);
      detailParts.push(`(likely timeout >${smokeTimeoutMs}ms)`);
      blocked.push({
        code: 'B7-T6-SMOKE-TIMEOUT',
        detail: detailParts.join(' '),
        remediation,
      });
    } else if (res.error) {
      // Non-timeout spawn failure (e.g. ENOENT).
      blocked.push({
        code: 'B7-T6-SMOKE-SPAWN-ERROR',
        detail: `T6 smoke spawn error: ${String(res.error?.message || res.error).slice(0, 200)}`,
        remediation,
      });
    } else if (res.status !== 0) {
      const stderr = (res.stderr || '').trim();
      const stdout = (res.stdout || '').trim();
      const tail = stderr || stdout || `no output; exit=${res.status}`;
      blocked.push({
        code: 'B7-T6-SMOKE-FAIL',
        detail: `T6 smoke ${smokeTest} non-zero exit ${res.status}: ${tail.slice(0, 200)}`,
        remediation,
      });
    }
    // res.status === 0 = green smoke (no entry pushed).
  }
}

/**
 * Sub-check 2 — Forward-readiness advisories:
 *   - AdaptOrch DAG retrofit (W389 P0a #6).
 *   - GPT-Researcher MCP (Stream A install-priority #1).
 *   - RDOE schema-firewall (when contract.mjs present).
 *   - Discovery-cache freshness <30d.
 */
function checkForwardReadiness(config, repoRoot, blocked, healed, advisory) {
  const fr = config?.t6?.futureReadiness ?? {};

  // AdaptOrch DAG retrofit advisory — files MAY be absent (W389 P0a #6 pending).
  const adaptOrchFiles = Array.isArray(fr.adaptOrchFiles) ? fr.adaptOrchFiles : [];
  for (const rel of adaptOrchFiles) {
    if (!existsSync(abs(repoRoot, rel))) {
      advisory.push({
        code: 'A-T6-ADAPTORCH-DAG-MISSING',
        detail: `AdaptOrch DAG retrofit file absent: ${rel} (W389 P0a #6 pending).`,
      });
    }
  }

  // GPT-Researcher MCP advisory — parse .mcp.json mcpServers (Stream A #1).
  const mcpPath = abs(repoRoot, '.mcp.json');
  let mcpServers = {};
  if (existsSync(mcpPath)) {
    const parsed = safeReadJson(mcpPath);
    mcpServers = parsed?.mcpServers || {};
  }
  const gptrName = fr.gptResearcherMcpName || 'gpt-researcher';
  if (!mcpServers[gptrName]) {
    advisory.push({
      code: 'A-T6-GPTR-MCP-ABSENT',
      detail: `GPT-Researcher MCP server '${gptrName}' not wired in .mcp.json (W389 P0a #5 pending; Stream A install-priority #1).`,
    });
  } else {
    advisory.push({
      code: 'A-T6-GPTR-MCP-PRESENT',
      detail: `GPT-Researcher MCP server '${gptrName}' wired (advisory verify OPENAI_API_KEY + TAVILY_API_KEY env populated).`,
    });
  }

  // RDOE schema-firewall verification — when contract.mjs is present, scan
  // evaluate-v22.mjs imports for CandidateDossier reference. (Light grep; full
  // contract enforcement is a downstream concern.)
  const contractPath = abs(repoRoot, 'tools/sota-discovery/lib/contract.mjs');
  const evalPath = abs(repoRoot, 'tools/sota-discovery/evaluate-v22.mjs');
  if (existsSync(contractPath) && existsSync(evalPath)) {
    try {
      const contractSrc = readFileSync(contractPath, 'utf8');
      const evalSrc = readFileSync(evalPath, 'utf8');
      const exportsDossier = /CandidateDossier/.test(contractSrc);
      const consumesDossier = /CandidateDossier/.test(evalSrc);
      if (exportsDossier && !consumesDossier) {
        blocked.push({
          code: 'B8-T6-RDOE-FIREWALL-BREACH',
          detail: `evaluate-v22.mjs does not reference CandidateDossier (RDOE schema-firewall W381 §5).`,
          remediation: 'Re-add firewall per W381 §5 — evaluate-v22 must consume only CandidateDossier instances.',
        });
      }
    } catch (e) {
      advisory.push({
        code: 'A-T6-RDOE-FIREWALL-PROBE-ERR',
        detail: `RDOE schema-firewall probe threw: ${String(e?.message || e).slice(0, 200)}`,
      });
    }
  }

  // Discovery-cache freshness — advisory if last run > 30d (or dir absent).
  const cacheDir = fr.discoveryCacheDir || null;
  const cacheTtlDays = fr.discoveryCacheTtlDays || 30;
  if (cacheDir) {
    const cacheAbs = abs(repoRoot, cacheDir);
    if (!existsSync(cacheAbs)) {
      advisory.push({
        code: 'A-T6-DISCOVERY-CACHE-ABSENT',
        detail: `Discovery-cache dir absent at ${cacheDir}; operator should run a fresh sca-v22 discovery.`,
      });
    } else {
      try {
        const st = statSync(cacheAbs);
        const age = ageDays(st.mtime);
        if (age > cacheTtlDays) {
          advisory.push({
            code: 'A-T6-DISCOVERY-CACHE-STALE',
            detail: `Discovery-cache mtime ${age.toFixed(1)}d > ${cacheTtlDays}d TTL; operator should run fresh sca-v22 discovery.`,
          });
        }
      } catch (e) {
        advisory.push({
          code: 'A-T6-DISCOVERY-CACHE-STAT-ERR',
          detail: `Discovery-cache stat threw: ${String(e?.message || e).slice(0, 160)}`,
        });
      }
    }
  }
}

/**
 * Sub-check 3 — Multi-convergence routing (NEW Stream A integration).
 * ≥2-engine / ≥3-source routing rule per W393 §8.
 *
 * Two checks:
 *   (a) Engine-roster presence — verify ≥minTotalEngines / ≥minEnginesPerClass engines
 *       from production/academic/compact/privacy/paper-QA/sandbox/self-improvement
 *       classes are CONFIGURED (presence-probe across mcp/plugin/skill/pip/conda/marker).
 *   (b) Rule-wiring — verify the ≥2-engine / ≥3-source rule itself is wired into the
 *       discovery library (`tools/sota-discovery/lib/discovery/`) per W393 §8 + plan
 *       Task 7. Codex r1 finding #1.
 *
 * Probe-type coverage extended (codex r1 finding #2) so STORM (pipPackage) and
 * DeepResearchAgent (condaEnvPath) can count toward the roster.
 */
function checkMultiConvergenceRouting(config, repoRoot, env, blocked, healed, advisory) {
  const rule = config?.t6?.multiConvergenceRouting ?? {};
  const ctx = buildEngineProbeContext(repoRoot, env);

  // Engine signals — each engine entry probed via the unified helper (codex r1 #2).
  const engines = Array.isArray(rule.engines) ? rule.engines : [];
  const present = [];
  const absent = [];
  const presenceDetail = {};
  for (const eng of engines) {
    const { satisfied, probes } = probeEnginePresence(eng, ctx);
    presenceDetail[eng.name] = probes;
    if (satisfied) present.push(eng.name);
    else absent.push(eng.name);
  }

  // Per-class roster check — assert ≥minEnginesPerClass for any class with explicit engines.
  const classes = rule.classes && typeof rule.classes === 'object' ? rule.classes : {};
  const minPerClass = rule.minEnginesPerClass || 2;
  for (const [className, classEngines] of Object.entries(classes)) {
    if (!Array.isArray(classEngines)) continue;
    const presentInClass = classEngines.filter(n => present.includes(n));
    if (presentInClass.length < minPerClass) {
      advisory.push({
        code: 'A-T6-CONVERGENCE-CLASS-UNDERSTAFFED',
        detail: `Multi-convergence class '${className}' has ${presentInClass.length}/${minPerClass} engines present (need ≥${minPerClass} for ≥2-engine routing). Present: [${presentInClass.join(', ') || '∅'}]; class roster: [${classEngines.join(', ')}].`,
      });
    }
  }

  // Global engine count — advisory if total <2.
  const minTotal = rule.minTotalEngines || 2;
  if (present.length < minTotal) {
    advisory.push({
      code: 'A-T6-CONVERGENCE-ROSTER-UNDERSTAFFED',
      detail: `Multi-convergence routing has ${present.length}/${minTotal} engines configured globally. Present: [${present.join(', ') || '∅'}]; Absent: [${absent.join(', ')}]. Cite W393 §8 multi-convergence routing rule.`,
    });
  } else {
    advisory.push({
      code: 'A-T6-CONVERGENCE-ROSTER-OK',
      detail: `Multi-convergence routing: ${present.length}/${engines.length} engines present (≥${minTotal} required): [${present.join(', ')}].`,
    });
  }

  // (b) Rule-wiring — verify the ≥2-engine / ≥3-source rule itself is wired into the
  // discovery library per W393 §8 + plan Task 7 (codex r1 finding #1). Look for
  // either a dedicated file (configurable via rule.ruleWiringPaths) OR pattern-matches
  // for "≥2-engine" / "≥3-source" / "multi-convergence" / "minEngines" / "minSources"
  // inside the existing discovery+convergence library files. If discovery dir absent
  // entirely → ADVISORY (W384 baseline pending); if present but no wiring evidence →
  // ADVISORY (rule not yet wired; W393 §8 follow-on); if present with wiring → OK.
  const discoveryDir = abs(repoRoot, rule.discoveryLibDir || 'tools/sota-discovery/lib/discovery');
  const convergencePath = abs(repoRoot, rule.convergencePath || 'tools/sota-discovery/lib/convergence.mjs');
  const wiringRequiredPatterns = Array.isArray(rule.ruleWiringPatterns) && rule.ruleWiringPatterns.length > 0
    ? rule.ruleWiringPatterns
    : ['>=2-engine', '≥2-engine', 'multi-convergence', 'multiConvergence', 'minEngines', 'minSources', '>=3-source', '≥3-source'];
  const scanCandidates = [];
  if (existsSync(discoveryDir)) {
    try {
      for (const ent of readdirSync(discoveryDir, { withFileTypes: true })) {
        if (ent.isFile() && /\.(mjs|js)$/.test(ent.name)) scanCandidates.push(join(discoveryDir, ent.name));
      }
    } catch {
      // best-effort
    }
  }
  if (existsSync(convergencePath)) scanCandidates.push(convergencePath);
  if (scanCandidates.length === 0) {
    advisory.push({
      code: 'A-T6-CONVERGENCE-RULE-WIRING-DEFERRED',
      detail: `Multi-convergence rule-wiring scan deferred — neither ${rule.discoveryLibDir || 'tools/sota-discovery/lib/discovery'} nor ${rule.convergencePath || 'tools/sota-discovery/lib/convergence.mjs'} present (W384 baseline pending).`,
    });
  } else {
    let wiringHits = 0;
    const matchedFiles = [];
    for (const fp of scanCandidates) {
      try {
        const src = readFileSync(fp, 'utf8');
        if (wiringRequiredPatterns.some(p => src.includes(p))) {
          wiringHits++;
          matchedFiles.push(fp.replace(repoRoot + '/', '').replace(repoRoot + '\\', ''));
        }
      } catch {
        // best-effort
      }
    }
    if (wiringHits === 0) {
      advisory.push({
        code: 'A-T6-CONVERGENCE-RULE-NOT-WIRED',
        detail: `Multi-convergence ≥2-engine / ≥3-source rule not yet wired in ${scanCandidates.length} scanned discovery files (W393 §8 follow-on; plan Task 7). Probed patterns: [${wiringRequiredPatterns.join(', ')}].`,
      });
    } else {
      advisory.push({
        code: 'A-T6-CONVERGENCE-RULE-WIRED',
        detail: `Multi-convergence rule wiring detected in ${wiringHits} file(s): [${matchedFiles.slice(0, 3).join(', ')}${matchedFiles.length > 3 ? `, +${matchedFiles.length - 3} more` : ''}].`,
      });
    }
  }

  // Operator-flagged missing clones (informational).
  const flagged = Array.isArray(rule.operatorFlaggedMissingClones) ? rule.operatorFlaggedMissingClones : [];
  if (flagged.length > 0) {
    const stillMissing = [];
    const cloned = [];
    for (const item of flagged) {
      if (!item.localPath) continue;
      const checkPath = isAbsolute(item.localPath) ? item.localPath : abs(repoRoot, item.localPath);
      if (existsSync(checkPath)) cloned.push(item.name);
      else stillMissing.push(item.name);
    }
    if (cloned.length > 0) {
      advisory.push({
        code: 'A-T6-OPERATOR-CLONES-PRESENT',
        detail: `Operator-flagged repos now cloned (install-pending): ${cloned.join(', ')}.`,
      });
    }
    if (stillMissing.length > 0) {
      advisory.push({
        code: 'A-T6-OPERATOR-CLONES-MISSING',
        detail: `Operator-flagged research repos still absent locally: ${stillMissing.join(', ')}.`,
      });
    }
  }
}

/**
 * Sub-check 4 — Install-priority roster (NEW Stream A integration).
 * Advisory presence check per priority item: gpt-researcher MCP / ARIS install /
 *   autoresearch plugin / DeerFlow setup / STORM pip / DeepResearchAgent conda.
 *
 * Uses the unified probeEnginePresence helper (codex r1 finding #2) so probe semantics
 * match the multi-convergence routing roster check.
 */
function checkInstallPriorityRoster(config, repoRoot, env, blocked, healed, advisory) {
  const ip = config?.t6?.installPriority ?? {};
  const items = Array.isArray(ip.items) ? ip.items : [];
  if (items.length === 0) return;

  const ctx = buildEngineProbeContext(repoRoot, env);

  for (const item of items) {
    const { satisfied, probes } = probeEnginePresence(item, ctx);
    if (!satisfied) {
      advisory.push({
        code: 'A-T6-INSTALL-PRIORITY-PENDING',
        detail: `Install-priority '${item.name}' (priority=${item.priority || '?'}) not yet satisfied. Probes: ${probes.map(c => `${c.kind}:${c.target}=${c.ok}`).join(' / ')}. Cite Stream A install-priority list.`,
      });
    } else {
      advisory.push({
        code: 'A-T6-INSTALL-PRIORITY-SATISFIED',
        detail: `Install-priority '${item.name}' (priority=${item.priority || '?'}) satisfied via ${probes.filter(c => c.ok).map(c => c.kind).join(', ')}.`,
      });
    }
  }
}

// -----------------------------------------------------------------------------
// Public entry point.
// -----------------------------------------------------------------------------

/**
 * runT6 — T6 Research-arch deep-checks.
 *
 * @param {object} args
 * @param {object} args.config Loaded .eee/precheck-config.json (must include t6 block).
 * @param {string} args.mode   'launch-fast' | 'deep' | 'repair'
 * @param {string} args.repoRoot Absolute path to repo root.
 * @param {NodeJS.ProcessEnv} args.env Effective process env.
 * @returns {{tier:string, blocked:Array, healed:Array, advisory:Array}}
 */
export function runT6({ config, mode, repoRoot, env, _smokeRunner }) {
  const blocked = [];
  const healed = [];
  const advisory = [];
  const smokeRunner = _smokeRunner || defaultSmokeRunner;

  // launch-fast: T6 is not scheduled, but if a caller invokes runT6 with launch-fast
  // explicitly (test harness), surface a single advisory and short-circuit.
  if (mode === 'launch-fast') {
    advisory.push({
      code: 'A-T6-LAUNCH-FAST-SKIP',
      detail: 'T6 not run in launch-fast mode (no network-deterministic checks scheduled).',
    });
    return { tier: 'T6', blocked, healed, advisory };
  }

  // Defensive: config.t6 may be absent if precheck-config.json predates this PR.
  if (!config?.t6) {
    advisory.push({
      code: 'A-T6-CONFIG-MISSING',
      detail: 'config.t6 block absent — T6 deferred (no manifest available).',
    });
    return { tier: 'T6', blocked, healed, advisory };
  }

  checkBaselineManifest(config, repoRoot, blocked, healed, advisory, smokeRunner);
  checkForwardReadiness(config, repoRoot, blocked, healed, advisory);
  checkMultiConvergenceRouting(config, repoRoot, env, blocked, healed, advisory);
  checkInstallPriorityRoster(config, repoRoot, env, blocked, healed, advisory);

  return { tier: 'T6', blocked, healed, advisory };
}

export default { runT6 };
