// tools/alw/orchestrator.mjs
/**
 * ALW v1 Orchestrator — 8-layer lifecycle per spec §2.
 *
 * Spec: docs/superpowers/specs/2026-05-25-alw-v1-bespoke-on-cc-primitives-design.md
 *   (verify via: git show feat/alw-v1-bespoke-on-cc-primitives:docs/superpowers/specs/2026-05-25-alw-v1-bespoke-on-cc-primitives-design.md)
 *
 * The spec path lives on `feat/alw-v1-bespoke-on-cc-primitives` branch (PR #150);
 * this branch (`feat/alw-v1-core-spine`) chains from PR #149 and the spec branch
 * is parallel. To verify the spec from this branch, fetch + show the parallel branch.
 *
 * §2 8-layer architecture:
 *   L1 Discovery → L2 Planner → L3 Dispatcher → L4 Executor →
 *   L5 Reviewer → L6 Convergence → L7 Persistence → L8 Re-entry
 *
 * W441.7 scaffold: L1-L8 layer stubs imported from ./layers/index.mjs.
 * Dependency-injection contract: tick(options) accepts layer-function overrides
 * via options.{discovery, planner, dispatcher, executor, reviewer, convergence,
 * persistence, reentry}. Defaults bind to local stubs; W442 drops in real modules
 * (e.g. discovery-aggregator.mjs, dispatcher.mjs) by passing them through options —
 * NO orchestrator.mjs edit required.
 */

import { researchTick } from './layers/research-tick.mjs';
import * as defaultLayers from './layers/index.mjs';

/**
 * Execute a single ALW tick.
 * @param {Object} options {queue_override?, mode?, discovery?, planner?, dispatcher?, executor?, reviewer?, convergence?, persistence?, reentry?}
 * @returns {Promise<Object>} {status, work_item?, tick_ms, layers_executed}
 */
export async function tick(options = {}) {
  // Layer injection with defaults to local stubs (W441 scaffold).
  // W442 forward-compat: pass real modules via options.{layer} — no orchestrator edit.
  const layers = {
    discovery: options.discovery ?? defaultLayers.discovery,
    planner: options.planner ?? defaultLayers.planner,
    dispatcher: options.dispatcher ?? defaultLayers.dispatcher,
    executor: options.executor ?? defaultLayers.executor,
    reviewer: options.reviewer ?? defaultLayers.reviewer,
    convergence: options.convergence ?? defaultLayers.convergence,
    persistence: options.persistence ?? defaultLayers.persistence,
    reentry: options.reentry ?? defaultLayers.reentry,
  };

  const t0 = Date.now();
  const layersExecuted = [];

  // L1 — Discovery (W441 scaffold: stub returns empty queue OR options.queue_override)
  const queue = options.queue_override || await layers.discovery(options);
  layersExecuted.push('L1:discovery');

  if (queue.length === 0) {
    return {status: 'idle', tick_ms: Date.now() - t0, layers_executed: layersExecuted, reason: 'empty queue'};
  }

  const workItem = queue[0];

  // L2-L8 — stubs in W441.7; real implementations land in W442-W443
  const plan = await layers.planner(workItem, options);
  layersExecuted.push('L2:planner');

  const dispatch = await layers.dispatcher(plan, options);
  layersExecuted.push('L3:dispatcher');

  const result = await layers.executor(dispatch, options);
  layersExecuted.push('L4:executor');

  const review = await layers.reviewer(result, options);
  layersExecuted.push('L5:reviewer');

  const final = await layers.convergence(review, options);
  layersExecuted.push('L6:convergence');

  await layers.persistence(final, options);
  layersExecuted.push('L7:persistence');

  await layers.reentry(final, options);
  layersExecuted.push('L8:reentry');

  return {status: 'completed', work_item: workItem.id, tick_ms: Date.now() - t0, layers_executed: layersExecuted};
}

// Re-export default layer stubs so existing tests + downstream callers keep working.
export {
  discovery,
  planner,
  dispatcher,
  executor,
  reviewer,
  convergence,
  persistence,
  reentry,
} from './layers/index.mjs';
