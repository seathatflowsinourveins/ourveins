// tools/research-arch-v23/discovery-engine.mjs
export async function discoverRepos(options = {}) {
  const { channels = {}, existingRepos = new Set() } = options;
  const settled = await Promise.allSettled(
    Object.entries(channels).map(([name, fn]) => fn().then((r) => ({ name, results: r })))
  );
  const map = new Map();
  for (const res of settled) {
    if (res.status !== 'fulfilled') continue;
    for (const item of res.value.results) {
      const id = item.identifier.toLowerCase();
      if (existingRepos.has(id)) continue;
      if (map.has(id)) {
        const existing = map.get(id);
        existing.sources.push(item.source || res.value.name);
        // Merge any additional metadata from later occurrences
        if (item.stars && !existing.stars) existing.stars = item.stars;
        if (item.description && !existing.description) existing.description = item.description;
      } else {
        map.set(id, {
          identifier: item.identifier,
          sources: [item.source || res.value.name],
          firstSeen: new Date().toISOString(),
          stars: item.stars || null,
          description: item.description || null,
        });
      }
    }
  }
  const errors = settled
    .filter((r) => r.status === 'rejected')
    .map((r) => ({ channel: 'unknown', error: r.reason?.message || String(r.reason) }));

  return { candidates: Array.from(map.values()).sort((a, b) => b.sources.length - a.sources.length), errors };
}

export async function githubTrendingChannel(options = {}) {
  const {
    topics = [
      'claude-code', 'ai-agent', 'mcp-server', 'agentic',
      'claude', 'anthropic', 'model-context-protocol', 'llm-agent', 'ai-tools', 'ai-sdk',
    ],
    daysBack = 90,
    minStars = 50,
    limit = 20,
  } = options;
  const { execSync } = await import('node:child_process');
  const cutoffDate = new Date(Date.now() - daysBack * 86400000).toISOString().slice(0, 10);
  const results = [];
  for (const topic of topics) {
    try {
      const out = execSync(
        `gh api "/search/repositories?q=topic:${topic}+pushed:>${cutoffDate}+stars:>${minStars}&sort=stars&per_page=${limit}" --jq ".items[].full_name"`,
        { encoding: 'utf8', timeout: 30_000 }
      );
      results.push(...out.trim().split('\n').filter(Boolean).map((r) => ({ identifier: r, source: `github:${topic}` })));
    } catch { /* skip failed topics */ }
  }
  return results;
}
