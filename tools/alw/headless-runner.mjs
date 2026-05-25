// tools/alw/headless-runner.mjs
// ALW headless autonomous runner — executes researchTick on a configurable interval.
// Logs results to Langfuse (if available) or stdout.
// Graceful shutdown via SIGINT. Health endpoint on ALW_HEALTH_PORT (default 9090).
import { researchTick } from './layers/research-tick.mjs';
import { getMcpClient } from '../research-arch-v23/mcp-client-bridge.mjs';
import { createServer } from 'node:http';

const INTERVAL_MS = parseInt(process.env.ALW_TICK_INTERVAL_MS || '3600000', 10); // default 1 hour
const HEALTH_PORT = parseInt(process.env.ALW_HEALTH_PORT || '9090', 10);
let running = true;
let tickCount = 0;
let lastTickTime = null;
let mcpClient = null;
const stats = { totalCandidates: 0, totalInstallQueue: 0, errors: 0 };

const healthServer = createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'running',
      ticks: tickCount,
      lastTick: lastTickTime,
      uptime: process.uptime(),
      ...stats,
    }));
  } else {
    res.writeHead(404);
    res.end();
  }
});

process.on('SIGINT', async () => {
  running = false;
  console.log('[ALW] Graceful shutdown...');
  healthServer.close();
  try { if (mcpClient) await mcpClient.close(); } catch { /* ignore */ }
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
  mcpClient = getMcpClient({ callTimeoutMs: 60_000 });
  console.log(`[ALW] Headless runner started. Interval: ${INTERVAL_MS}ms`);

  healthServer.listen(HEALTH_PORT, '127.0.0.1', () => {
    console.log(`[ALW] Health endpoint: http://127.0.0.1:${HEALTH_PORT}/health`);
  });

  while (running) {
    tickCount++;
    console.log(`[ALW] Tick #${tickCount} starting...`);
    try {
      const result = await researchTick({ dryRun: false, mcpClient });
      stats.totalCandidates += result.candidates_found ?? 0;
      stats.totalInstallQueue += result.install_queue?.length ?? 0;
      lastTickTime = new Date().toISOString();
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
