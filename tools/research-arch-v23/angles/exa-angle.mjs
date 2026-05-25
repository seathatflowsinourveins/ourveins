// tools/research-arch-v23/angles/exa-angle.mjs
// W442-T4: A2 exa_neural_search angle — neural web search via exa MCP.
//
// Cite: exa.ai + W442 spec §2.

const ANGLE_ID = 'A2';

function scoreFromResults(results) {
  if (!Array.isArray(results) || results.length === 0) return 0.0;
  let s = 0.3;
  const corpus = results.map((r) => `${r.title ?? ''} ${r.snippet ?? r.text ?? ''}`).join(' ').toLowerCase();
  if (/actively?\s+maintained|regularly\s+updated/.test(corpus)) s += 0.20;
  if (/widely[\s-]used|popular|\d{2,3}k\+?\s*stars?/.test(corpus)) s += 0.20;
  if (/stable|production[\s-]ready/.test(corpus)) s += 0.15;
  if (/well[\s-]documented|comprehensive\s+docs?/.test(corpus)) s += 0.10;
  if (/security|signed\s+releases?|slsa/.test(corpus)) s += 0.15;
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
    const response = await options.mcpClient.callTool({
      server: 'exa',
      name: 'web_search_exa',
      arguments: { query: `${owner}/${repo} npm package maintenance status quality ${version}`, num_results: 5 },
    });
    const text = (response?.content ?? []).filter((c) => c.type === 'text').map((c) => c.text).join('\n');
    let results = [];
    try { results = JSON.parse(text).results ?? JSON.parse(text); } catch { results = [{ snippet: text }]; }
    const score = scoreFromResults(results);
    // W442 codex r2: fail-CLOSED on zero-score regardless of results array shape.
    // score===0 means no signal words found — treat as no usable data.
    if (score === 0) {
      return { angleId: ANGLE_ID, skipped: true, error: 'no-results' };
    }
    return {
      angleId: ANGLE_ID,
      score,
      evidence: { source: 'exa.web_search_exa', resultCount: results.length },
      skipped: false,
    };
  } catch (err) {
    return { angleId: ANGLE_ID, skipped: true, error: err.message };
  }
}
