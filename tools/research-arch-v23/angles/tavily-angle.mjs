// tools/research-arch-v23/angles/tavily-angle.mjs
// W442-T4: A4 tavily_curated_search angle — curated web search.
//
// Cite: tavily.com + W442 spec §2.

const ANGLE_ID = 'A4';

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
    const response = await options.mcpClient.callTool({
      server: 'gpt-researcher',
      name: 'quick_search',
      arguments: {
        query: `${owner}/${repo} ${version} GitHub repository maintenance security`,
      },
    });
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
