// tools/research-arch-v23/angles/tavily-angle.mjs
// W442-T4: A4 tavily_curated_search angle — curated web search.
// W443: exponential backoff retry (2 retries, 5s/10s delays) per task spec.
//
// Cite: tavily.com + W442 spec §2.

const ANGLE_ID = 'A4';
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

function scoreFromTavily(results) {
  if (!Array.isArray(results) || results.length === 0) return 0.0;
  let s = 0.3;
  const corpus = results.map((r) => `${r.title ?? ''} ${r.content ?? r.snippet ?? ''}`).join(' ').toLowerCase();
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
    // Tavily is not a standalone MCP server in this runtime. Route through
    // gpt-researcher's quick_search tool which uses Tavily internally.
    let response;
    try {
      response = await callWithRetry(options.mcpClient, {
        server: 'gpt-researcher',
        name: 'quick_search',
        arguments: {
          query: `${owner}/${repo} ${version} GitHub repository maintenance security`,
        },
      });
    } catch (retryErr) {
      return { angleId: ANGLE_ID, skipped: true, error: 'timeout after retries' };
    }
    const text = (response?.content ?? []).filter((c) => c.type === 'text').map((c) => c.text).join('\n');
    let results = [];
    try { results = JSON.parse(text).results ?? JSON.parse(text); } catch { results = [{ content: text }]; }
    const score = scoreFromTavily(results);
    // W442 codex r1 finding 1: fail-CLOSED — empty/malformed data degrades to skipped:true
    if (score === 0 && (!Array.isArray(results) || results.length === 0)) {
      return { angleId: ANGLE_ID, skipped: true, error: 'no-results' };
    }
    return {
      angleId: ANGLE_ID,
      score,
      evidence: { source: 'gpt-researcher.quick_search', resultCount: results.length },
      skipped: false,
    };
  } catch (err) {
    return { angleId: ANGLE_ID, skipped: true, error: err.message };
  }
}
