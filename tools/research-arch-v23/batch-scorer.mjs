// tools/research-arch-v23/batch-scorer.mjs
import { convergeAudit } from './convergence-engine.mjs';

export async function scoreBatch(targets, options = {}) {
  const auditFn = options.convergeAuditFn || convergeAudit;
  const concurrency = options.concurrency || 3;
  const results = [];

  for (let i = 0; i < targets.length; i += concurrency) {
    const chunk = targets.slice(i, i + concurrency);
    const settled = await Promise.allSettled(
      chunk.map((t) => auditFn(
        { ...t, version: t.version || 'HEAD' },
        { mcpClient: options.mcpClient, minLiveAngles: options.minLiveAngles }
      ))
    );
    for (let j = 0; j < settled.length; j++) {
      results.push({
        target: chunk[j],
        verdict: settled[j].status === 'fulfilled' ? settled[j].value : null,
        error: settled[j].status === 'rejected' ? settled[j].reason.message : null,
      });
      if (options.onProgress) {
        try { await options.onProgress(i + j, targets.length, results[results.length - 1]); } catch {}
      }
    }
  }
  return results;
}
