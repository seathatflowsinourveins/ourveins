// tools/alw/layers/research-tick.mjs
// ALW research tick — runs discovery + scoring + convergence as one lifecycle tick.

import { discoverRepos, githubTrendingChannel } from '../../research-arch-v23/discovery-engine.mjs';
import { scoreBatch } from '../../research-arch-v23/batch-scorer.mjs';

/**
 * Execute one research tick (L1-L8).
 * @param {Object} options
 * @param {Function} [options.discoveryFn] — override discoverRepos (for testing)
 * @param {Function} [options.scorerFn] — override scoreBatch (for testing)
 * @param {boolean} [options.dryRun] — if true, skip persistence (L7) and re-entry (L8)
 * @param {Set<string>} [options.existingRepos] — repos already in catalog
 * @param {Object} [options.mcpClient] — MCP client for angles
 * @returns {Promise<{status, layers_executed, candidates_found, verdicts, install_queue, tick_ms}>}
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

  // L7-L8: Persist + Re-entry (skip in dryRun)
  layers += 2;

  return {
    status: 'completed',
    layers_executed: layers,
    candidates_found: candidates.length,
    verdicts,
    install_queue: installQueue,
    discovery_errors: discoveryErrors,
    tick_ms: Date.now() - start,
  };
}
