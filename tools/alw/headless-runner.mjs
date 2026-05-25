// tools/alw/headless-runner.mjs
// ALW headless autonomous runner — executes researchTick on a configurable interval.
// Logs results to Langfuse (if available) or stdout.
// Graceful shutdown via SIGINT.
import { researchTick } from './layers/research-tick.mjs';

const INTERVAL_MS = parseInt(process.env.ALW_TICK_INTERVAL_MS || '3600000', 10); // default 1 hour
let running = true;
let tickCount = 0;
const stats = { totalCandidates: 0, totalInstallQueue: 0, errors: 0 };

process.on('SIGINT', () => {
  running = false;
  console.log('[ALW] Graceful shutdown...');
});

/**
 * Attempt to log a tick result to Langfuse if env vars are set.
 * Falls back silently — Langfuse is optional.
 */
async function logToLangfuse(tickNum, result) {
  const host = process.env.LANGFUSE_HOST || process.env.LANGFUSE_BASE_URL;
  const publicKey = process.env.LANGFUSE_PUBLIC_KEY;
  const secretKey = process.env.LANGFUSE_SECRET_KEY;
  if (!host || !publicKey || !secretKey) return;

  try {
    const body = JSON.stringify({
      batch: [
        {
          id: `alw-headless-tick-${tickNum}-${Date.now()}`,
          type: 'event',
          timestamp: new Date().toISOString(),
          body: {
            id: `alw-tick-${tickNum}`,
            name: 'alw.headless.tick',
            metadata: {
              tick: tickNum,
              interval_ms: INTERVAL_MS,
              ...result,
            },
          },
        },
      ],
    });

    const credentials = Buffer.from(`${publicKey}:${secretKey}`).toString('base64');
    const res = await fetch(`${host}/api/public/ingestion`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${credentials}`,
      },
      body,
    });

    if (!res.ok) {
      console.warn(`[ALW] Langfuse ingest HTTP ${res.status} (tick #${tickNum}) — continuing`);
    }
  } catch (err) {
    console.warn(`[ALW] Langfuse log failed (tick #${tickNum}): ${err.message} — continuing`);
  }
}

async function main() {
  console.log(`[ALW] Headless runner started. Interval: ${INTERVAL_MS}ms`);
  while (running) {
    tickCount++;
    console.log(`[ALW] Tick #${tickCount} starting...`);
    try {
      const result = await researchTick({ dryRun: false });
      stats.totalCandidates += result.candidates_found ?? 0;
      stats.totalInstallQueue += result.install_queue?.length ?? 0;
      console.log(
        `[ALW] Tick #${tickCount} complete: ${result.candidates_found} candidates, ` +
        `${result.install_queue.length} install-queue, ${result.tick_ms}ms`
      );
      await logToLangfuse(tickCount, result);
    } catch (err) {
      stats.errors++;
      console.error(`[ALW] Tick #${tickCount} error: ${err.message}`);
    }
    if (running) await new Promise((r) => setTimeout(r, INTERVAL_MS));
  }
  console.log(
    `[ALW] Shutdown after ${tickCount} ticks. ` +
    `Cumulative: candidates=${stats.totalCandidates} install-queue=${stats.totalInstallQueue} errors=${stats.errors}`
  );
}

main();
