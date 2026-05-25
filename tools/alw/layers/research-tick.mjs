// tools/alw/layers/research-tick.mjs
// ALW research tick — runs discovery + scoring + convergence as one lifecycle tick.

import { discoverRepos, githubTrendingChannel } from '../../research-arch-v23/discovery-engine.mjs';
import { scoreBatch } from '../../research-arch-v23/batch-scorer.mjs';
import { persistence, reentry } from './index.mjs';

/**
 * Route a task description through ruflo hooks_route to get a model recommendation.
 * Falls back gracefully when ruflo is unavailable (not installed, network error, etc.).
 *
 * @param {string} task — short description of the work item being scored
 * @returns {Promise<{primaryAgent: {type: string, confidence: number}, [key: string]: unknown}>}
 */
export async function getModelRoute(task) {
  try {
    const { execSync } = await import('node:child_process');
    const escaped = String(task).replace(/"/g, '\\"');
    const result = execSync(
      `npx -y ruflo@3.10.1 hooks route --task "${escaped}" --json`,
      { encoding: 'utf8', timeout: 10_000 },
    );
    return JSON.parse(result);
  } catch {
    return { primaryAgent: { type: 'researcher', confidence: 0.5 } };
  }
}

/**
 * Persist a key/value pair to ruflo memory under the "patterns" namespace.
 * Falls back gracefully when ruflo is unavailable.
 *
 * @param {string} key — storage key
 * @param {unknown} value — serialisable value
 * @returns {Promise<boolean>} true on success, false on any failure
 */
export async function persistToRuflo(key, value) {
  try {
    const { execSync } = await import('node:child_process');
    const serialised = JSON.stringify(value).replace(/'/g, "\\'");
    execSync(
      `npx -y ruflo@3.10.1 memory store --key "${key}" --namespace patterns --value '${serialised}'`,
      { encoding: 'utf8', timeout: 10_000 },
    );
    return true;
  } catch {
    return false;
  }
}

/**
 * Execute one research tick (L1-L8).
 * @param {Object} options
 * @param {Function} [options.discoveryFn] — override discoverRepos (for testing)
 * @param {Function} [options.scorerFn] — override scoreBatch (for testing)
 * @param {boolean} [options.dryRun] — if true, skip persistence (L7), re-entry (L8), ruflo store
 * @param {Set<string>} [options.existingRepos] — repos already in catalog
 * @param {Object} [options.mcpClient] — MCP client for angles
 * @param {Function} [options.modelRouteFn] — override getModelRoute (for testing)
 * @param {Function} [options.rufloStoreFn] — override persistToRuflo (for testing)
 * @returns {Promise<{status, layers_executed, candidates_found, verdicts, install_queue, model_route, ruflo_stored, tick_ms}>}
 */
export async function researchTick(options = {}) {
  const start = Date.now();
  let layers = 0;

  // L1: Discovery
  const discover = options.discoveryFn || (() => discoverRepos({
    channels: { github: githubTrendingChannel },
    existingRepos: options.existingRepos || new Set(),
  }));
  const discovered = await discover();
  // Support both old flat-array and new { candidates, errors } shapes
  const candidates = Array.isArray(discovered) ? discovered : (discovered.candidates || []);
  const discoveryErrors = Array.isArray(discovered) ? [] : (discovered.errors || []);
  layers++;

  if (candidates.length === 0) {
    return { status: 'completed', layers_executed: layers, candidates_found: 0, verdicts: [], install_queue: [], discovery_errors: discoveryErrors, tick_ms: Date.now() - start };
  }

  // L2: Route through ruflo before scoring — get model recommendation for this batch
  const taskDescription = `score ${candidates.length} candidate repo(s): ${candidates.map((c) => c.identifier).join(', ')}`;
  const modelRouteFn = options.modelRouteFn || getModelRoute;
  const modelRoute = await modelRouteFn(taskDescription);

  // L2-L3: Plan + Score
  const targets = candidates.map((c) => ({ kind: 'github-repo', identifier: c.identifier }));
  const scorer = options.scorerFn || ((t) => scoreBatch(t, { mcpClient: options.mcpClient, concurrency: 3 }));
  const verdicts = await scorer(targets);
  layers += 2;

  // L4-L6: Review + Converge
  const installQueue = verdicts
    .filter((v) => v.verdict?.decision_tier?.startsWith('INSTALL'))
    .map((v) => v.target?.identifier);
  layers += 3;

  // Build the final object passed to L7 + L8
  const final = {
    verdicts,
    install_queue: installQueue,
  };

  // L7-L8: Persist + Re-entry (skip in dryRun)
  let persistResult = { saved: 0 };
  let reentryResult = { queued: 0, queue: [] };
  if (!options.dryRun) {
    const persistFn = options.persistenceFn || persistence;
    const reentryFn = options.reentryFn || reentry;
    persistResult = await persistFn(final, options);
    reentryResult = await reentryFn(final, options);
  }
  layers += 2;

  // L7 (post-persist): store verdict pattern to ruflo memory for learning loop
  const rufloStoreFn = options.rufloStoreFn || persistToRuflo;
  const rufloKey = `alw-tick-${new Date().toISOString().slice(0, 10)}`;
  const rufloPayload = {
    ts: new Date().toISOString(),
    candidates: candidates.length,
    verdicts_count: verdicts.length,
    install_count: installQueue.length,
    model_route: modelRoute,
  };
  const rufloStored = options.dryRun ? false : await rufloStoreFn(rufloKey, rufloPayload);

  return {
    status: 'completed',
    layers_executed: layers,
    candidates_found: candidates.length,
    verdicts,
    install_queue: installQueue,
    model_route: modelRoute,
    ruflo_stored: rufloStored,
    persist_result: persistResult,
    reentry_result: reentryResult,
    discovery_errors: discoveryErrors,
    tick_ms: Date.now() - start,
  };
}
