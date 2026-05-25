// tools/alw/layers/index.mjs
// ALW v1 — L1-L8 default layer stubs for W441.7 scaffold.
// Real implementations land in W442-W443 via dependency-injection through
// orchestrator.tick(options) — these defaults preserve current scaffold behavior
// when no override is supplied.
//
// Spec: docs/superpowers/specs/2026-05-25-alw-v1-bespoke-on-cc-primitives-design.md §2

import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { saveVerdict } from '../../research-arch-v23/verdict-store.mjs';

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

// L7 — Persistence (real — W443)
// Saves each verdict from the tick results to the JSON verdict store.
// Returns the count of saved verdicts.
export async function persistence(final, options) {
  const verdicts = final?.verdicts;
  if (!Array.isArray(verdicts) || verdicts.length === 0) {
    return { saved: 0 };
  }
  let saved = 0;
  for (const verdict of verdicts) {
    try {
      saveVerdict(verdict);
      saved++;
    } catch (err) {
      // Log but don't abort: partial saves are better than none.
      console.warn('[ALW L7] saveVerdict failed for', verdict?.target?.identifier, err?.message);
    }
  }
  return { saved };
}

// L8 — Re-entry (real — W443)
// Checks if any INSTALL-tier repos were found; writes them to the install queue file.
// Returns the queue contents.
const INSTALL_QUEUE_DIR = join(import.meta.dirname, '../../../docs/architecture/W443-SP1-VERDICTS');
const INSTALL_QUEUE_PATH = join(INSTALL_QUEUE_DIR, 'install-queue.json');

export async function reentry(final, options) {
  const installQueue = final?.install_queue;
  if (!Array.isArray(installQueue) || installQueue.length === 0) {
    return { queued: 0, queue: [] };
  }

  if (!existsSync(INSTALL_QUEUE_DIR)) {
    mkdirSync(INSTALL_QUEUE_DIR, { recursive: true });
  }

  const queueEntry = {
    ts: new Date().toISOString(),
    repos: installQueue,
  };
  writeFileSync(INSTALL_QUEUE_PATH, JSON.stringify(queueEntry, null, 2), 'utf8');

  return { queued: installQueue.length, queue: installQueue };
}
