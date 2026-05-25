// tools/research-arch-v23/angles/firecrawl-angle.mjs
// W442-T4: A3 firecrawl_structured_crawl angle — structured web crawl.
// W443: exponential backoff retry (2 retries, 5s/10s delays) per task spec.
//
// Cite: firecrawl.dev + W442 spec §2.

const ANGLE_ID = 'A3';
const RETRY_DELAYS_MS = [5000, 10000]; // 5s first retry, 10s second retry

/**
 * Sleep for the given number of milliseconds.
 * @param {number} ms
 * @returns {Promise<void>}
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Call mcpClient.callTool with exponential backoff retry.
 * @param {Object} mcpClient
 * @param {Object} callArgs
 * @returns {Promise<Object>} response
 * @throws {Error} After all retries exhausted.
 */
async function callWithRetry(mcpClient, callArgs) {
  let lastErr;
  for (let attempt = 0; attempt <= RETRY_DELAYS_MS.length; attempt++) {
    try {
      return await mcpClient.callTool(callArgs);
    } catch (err) {
      lastErr = err;
      if (attempt < RETRY_DELAYS_MS.length) {
        await sleep(RETRY_DELAYS_MS[attempt]);
      }
    }
  }
  throw lastErr;
}

function scoreFromCrawl(data) {
  if (!Array.isArray(data) || data.length === 0) return 0.0;
  let s = 0.3;
  const corpus = data.map((d) => d.markdown ?? d.text ?? '').join(' ').toLowerCase();
  if (/actively?\s+maintained|regularly\s+updated/.test(corpus)) s += 0.20;
  if (/widely[\s-]used|popular|\d{2,3}k\+?\s*stars?/.test(corpus)) s += 0.20;
  if (/stable|production[\s-]ready/.test(corpus)) s += 0.15;
  if (/security|signed\s+releases?/.test(corpus)) s += 0.15;
  if (/deprecated|abandoned|stale/.test(corpus)) s -= 0.50;
  if (/vulnerable|cve-\d/.test(corpus)) s -= 0.30;
  return Math.max(0, Math.min(1, s));
}

export async function runAngle(target, options = {}) {
  try {
    if (!options.mcpClient || typeof options.mcpClient.callTool !== 'function') {
      return { angleId: ANGLE_ID, skipped: true, error: 'mcpClient not provided' };
    }
    // W442 codex r1 finding 2: target shape alignment — convergeAudit passes {kind, identifier, version}
    const identifier = target.identifier || `${target.owner}/${target.repo}`;
    const [owner, repo] = identifier.includes('/') ? identifier.split('/') : [identifier, ''];
    const version = target.version || 'HEAD';
    let response;
    try {
      response = await callWithRetry(options.mcpClient, {
        server: 'firecrawl',
        name: 'firecrawl_search',
        arguments: {
          query: `${owner}/${repo} ${version} maintenance status security`,
          limit: 5,
          scrapeOptions: { formats: ['markdown'] },
        },
      });
    } catch (retryErr) {
      return { angleId: ANGLE_ID, skipped: true, error: 'timeout after retries' };
    }
    const text = (response?.content ?? []).filter((c) => c.type === 'text').map((c) => c.text).join('\n');
    let data = [];
    try { data = JSON.parse(text).data ?? JSON.parse(text); } catch { data = [{ markdown: text }]; }
    const score = scoreFromCrawl(data);
    // W442 codex r2: fail-CLOSED on zero-score — no signal words = no usable data
    if (score === 0) {
      return { angleId: ANGLE_ID, skipped: true, error: 'no-results' };
    }
    return {
      angleId: ANGLE_ID,
      score,
      evidence: { source: 'firecrawl.firecrawl_search', resultCount: data.length },
      skipped: false,
    };
  } catch (err) {
    return { angleId: ANGLE_ID, skipped: true, error: err.message };
  }
}
