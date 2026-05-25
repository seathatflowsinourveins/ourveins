// tools/alw/layers/index.mjs
// ALW v1 — L1-L8 default layer stubs for W441.7 scaffold.
// Real implementations land in W442-W443 via dependency-injection through
// orchestrator.tick(options) — these defaults preserve current scaffold behavior
// when no override is supplied.
//
// Spec: docs/superpowers/specs/2026-05-25-alw-v1-bespoke-on-cc-primitives-design.md §2

// L1 — Discovery stub
// W442 will implement 5 work-sources: /goal + v23-engine + TaskList + open-PRs + stale-PRs
export async function discovery(options) {
  return [];
}

// L2 — Planner stub
export async function planner(workItem, options) {
  return {id: workItem.id, subtasks: [], topology: 'single-agent'};
}

// L3 — Dispatcher stub
export async function dispatcher(plan, options) {
  return {topology: plan.topology, action: 'noop-scaffold'};
}

// L4 — Executor stub
export async function executor(dispatch, options) {
  return {status: 'noop-scaffold', dispatch};
}

// L5 — Reviewer stub
export async function reviewer(result, options) {
  return {tiers: [], consensus: {verdict: 'NOOP-SCAFFOLD', reason: 'W441.7 scaffold'}};
}

// L6 — Convergence stub
export async function convergence(review, options) {
  return {...review, status: 'NOOP-SCAFFOLD', iterations: 0};
}

// L7 — Persistence stub
export async function persistence(final, options) {
  return null;
}

// L8 — Reentry stub
export async function reentry(final, options) {
  return null;
}
