// tools/research-arch-v23/angles/perplexity-angle.mjs
// W442-T4: A1 perplexity_sonar angle — web-grounded research probe via
// perplexity MCP server. Returns CVS-compatible angle result.
//
// Cite: perplexity.ai + W442 spec §2 + §3 T4.

const ANGLE_ID = 'A1';

function scoreFromText(text) {
  const t = String(text).toLowerCase();
  let s = 0.3;
  if (/actively?\s+maintained|regularly\s+updated|active\s+maintenance/.test(t)) s += 0.20;
  if (/widely[\s-]used|popular|\d{2,3}k\+?\s*stars?|tens of thousands of stars/.test(t)) s += 0.20;
  if (/stable|production[\s-]ready|battle[\s-]tested/.test(t)) s += 0.20;
  if (/well[\s-]documented|comprehensive\s+docs?/.test(t)) s += 0.15;
  if (/security\s+audit|sast|dependabot|sigstore|slsa|signed\s+releases?/.test(t)) s += 0.15;
  if (/deprecated|abandoned|stale|unmaintained|no longer maintained/.test(t)) s -= 0.50;
  if (/vulnerable|cve-\d|exploit/.test(t)) s -= 0.30;
  return Math.max(0, Math.min(1, s));
}

/**
 * Extract usable text from an MCP callTool response, handling all known
 * response shapes:
 *   1. string → use directly
 *   2. { content: [{ type:'text', text:'...' }, ...] } → join text blocks
 *   3. { content: string } → use the string
 *   4. { text: '...' } → use text field
 *   5. JSON-stringified object with results[]/snippets → parse + join
 *   6. other object → JSON.stringify fallback
 * @param {*} response raw callTool return value
 * @returns {string}
 */
function extractText(response) {
  if (response == null) return '';
  // Case 1: plain string
  if (typeof response === 'string') {
    return tryUnwrapJsonText(response);
  }
  // Case 2a: content array with typed blocks (standard MCP)
  if (Array.isArray(response.content)) {
    const joined = response.content
      .filter((c) => c && c.type === 'text')
      .map((c) => c.text)
      .join('\n');
    if (joined.length > 0) return tryUnwrapJsonText(joined);
  }
  // Case 2b: content is a plain string
  if (typeof response.content === 'string') {
    return tryUnwrapJsonText(response.content);
  }
  // Case 3: top-level text field
  if (typeof response.text === 'string') {
    return tryUnwrapJsonText(response.text);
  }
  // Case 4: response is an array of content blocks at top level
  if (Array.isArray(response)) {
    const joined = response
      .filter((c) => c && c.type === 'text')
      .map((c) => c.text)
      .join('\n');
    if (joined.length > 0) return tryUnwrapJsonText(joined);
    // Array of result objects with snippet/text fields
    const snippets = response.map((r) => r.snippet ?? r.text ?? '').join('\n');
    if (snippets.length > 0) return snippets;
  }
  // Case 5: fallback — stringify the whole thing
  return JSON.stringify(response);
}

/**
 * If text is a JSON string wrapping results/snippets, extract and join them.
 * Otherwise return the text as-is.
 */
function tryUnwrapJsonText(text) {
  const trimmed = text.trim();
  if (!trimmed.startsWith('{') && !trimmed.startsWith('[')) return text;
  try {
    const parsed = JSON.parse(trimmed);
    if (Array.isArray(parsed)) {
      return parsed.map((r) => r.snippet ?? r.text ?? r.title ?? '').join('\n') || text;
    }
    if (parsed.results && Array.isArray(parsed.results)) {
      return parsed.results.map((r) => r.snippet ?? r.text ?? r.title ?? '').join('\n') || text;
    }
    // Parsed but no results array — return as-is (the JSON might be the content itself)
    return text;
  } catch {
    return text;
  }
}

/**
 * @param {{kind?:string, identifier?:string, owner?:string, repo?:string, version?:string}} target
 * @param {{mcpClient?: {callTool:Function}}} options
 */
export async function runAngle(target, options = {}) {
  try {
    if (!options.mcpClient || typeof options.mcpClient.callTool !== 'function') {
      return { angleId: ANGLE_ID, skipped: true, error: 'mcpClient not provided' };
    }
    // W442 codex r1 finding 2: target shape alignment — convergeAudit passes {kind, identifier, version}
    const identifier = target.identifier || `${target.owner}/${target.repo}`;
    const [owner, repo] = identifier.includes('/') ? identifier.split('/') : [identifier, ''];
    const version = target.version || 'HEAD';
    // Use perplexity_search (takes {query}, fast) not perplexity_research (takes {messages}, slow 30s+)
    const query = `${owner}/${repo} GitHub repository maintenance status security quality ${version}`;
    const response = await options.mcpClient.callTool({
      server: 'perplexity',
      name: 'perplexity_search',
      arguments: { query, max_results: 5 },
    });
    const text = extractText(response);
    if (!text || text.length < 50) {
      return { angleId: ANGLE_ID, skipped: true, error: 'empty-response' };
    }
    return {
      angleId: ANGLE_ID,
      score: scoreFromText(text),
      evidence: { source: 'perplexity_search', textPreview: text.slice(0, 500) },
      skipped: false,
    };
  } catch (err) {
    return { angleId: ANGLE_ID, skipped: true, error: err.message };
  }
}
