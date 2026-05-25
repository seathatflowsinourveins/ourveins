// tools/research-arch-v23/angles/firecrawl-angle.mjs
// W442-T4: A3 firecrawl_structured_crawl angle — structured web crawl.
//
// Cite: firecrawl.dev + W442 spec §2.

const ANGLE_ID = 'A3';

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
    const response = await options.mcpClient.callTool({
      server: 'firecrawl',
      name: 'firecrawl_search',
      arguments: {
        query: `${owner}/${repo} ${version} maintenance status security`,
        limit: 5,
        scrapeOptions: { formats: ['markdown'] },
      },
    });
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
