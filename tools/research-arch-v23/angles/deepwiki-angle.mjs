// tools/research-arch-v23/angles/deepwiki-angle.mjs
// A5 — Cognition deepwiki MCP wrapper for repo-deep-knowledge.
// MCP-client-injected via options.mcpClient; falls back to skipped:true if no MCP session.
// Cite-anchor: docs/architecture/SOTA-RESEARCH-ARCH-V23/DESIGN.md §2.1 A5.
// Per soul.md §6 fail-CLOSED: missing MCP session => skipped, NOT silent default.

const DEFAULT_QUESTION = 'What is the primary purpose and SOTA-fitness of this repository? Cite specific features that make it competitive in its category as of 2026-05.';

// GitHub-canonical owner/repo regex:
//   owner: 1-39 chars, starts+ends with alphanumeric, no consecutive hyphens (GitHub username rule)
//   repo:  1-100 chars, alphanumeric, dot, underscore, or hyphen
//   exactly ONE slash separator — disallows owner/repo/extra and other non-GitHub identifiers
// W441.3 codex r2 REVISE: tightened with `-(?=[a-zA-Z0-9])` lookahead — every hyphen in owner
// MUST be followed by alphanumeric → rejects trailing-hyphen AND consecutive hyphens.
const GH_OWNER_REPO_RE = /^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}\/[a-zA-Z0-9._-]{1,100}$/;

/**
 * Detect error-shaped payloads returned by MCP servers WITHOUT throwing.
 * MCP servers can return verbose error-shaped responses (e.g. {error: "..."}); without this
 * guard, error payloads would be counted as substantive content by length-based scoring.
 * W441.3 codex r2 REVISE: expanded keyword set covers {code:"NOT_FOUND", message:"Repo not found"}
 * shape — original keyword check excluded "not found", "404", "cannot", "forbidden", etc.
 * @param {*} result raw MCP callTool return value
 * @returns {boolean} true if result is null/undefined OR has an error-shape
 */
export function isErrorShapedPayload(result) {
  if (result === null || result === undefined) return true;
  if (typeof result === 'object') {
    // Explicit error fields
    if (result.error || result.errorCode || result.isError === true) return true;
    // Code-like field with error-keyword anywhere in JSON (covers {code:"NOT_FOUND", message:"..."})
    if (result.code || result.statusCode || result.status) {
      const json = JSON.stringify(result).toLowerCase();
      if (/error|fail|denied|invalid|not[\s_-]?found|404|500|503|cannot|forbidden|unauthorized|timeout|refused/i.test(json)) return true;
    }
    // Direct message field check (some MCPs return {message: "Error: ..."} with no code field)
    if (typeof result.message === 'string' && /^(error|failed|cannot|denied|invalid|not[\s_-]?found|404|500|forbidden)/i.test(result.message.trim())) return true;
  }
  if (typeof result === 'string') {
    if (/^(error|failed|cannot|denied|invalid|not[\s_-]?found|404|500|forbidden|unauthorized|timeout)/i.test(result.trim())) return true;
  }
  return false;
}

/**
 * Probe Cognition deepwiki for repo-deep-knowledge.
 * @param {Object} target {kind, identifier, version}
 * @param {Object} options {mcpClient?, dryRun?, question?}
 * @returns {Promise<Object>} A5 angle result conforming to sca-v23.
 */
export async function probeDeepwiki(target, options = {}) {
  if (!target || !target.identifier) {
    return {
      name: 'A5_cognition_deepwiki',
      skipped: true,
      reason: 'invalid target (missing identifier)',
      normalized_score: 0,
      weight: 0.15,
    };
  }

  if (options.dryRun) {
    return {
      name: 'A5_cognition_deepwiki',
      skipped: true,
      reason: 'dryRun mode',
      normalized_score: 0,
      weight: 0.15,
    };
  }

  if (!options.mcpClient || typeof options.mcpClient.callTool !== 'function') {
    return {
      name: 'A5_cognition_deepwiki',
      skipped: true,
      reason: 'no MCP session (mcpClient.callTool not available)',
      normalized_score: 0,
      weight: 0.15,
    };
  }

  // deepwiki MCP requires GitHub-canonical identifier (owner/repo)
  // Tightened W441.3 (codex r1 REVISE): prior /^[^@\s]+\/[^@\s]+$/ accepted owner/repo/extra
  if (!GH_OWNER_REPO_RE.test(target.identifier)) {
    return {
      name: 'A5_cognition_deepwiki',
      skipped: true,
      reason: `identifier ${target.identifier} not in owner/repo shape required by deepwiki`,
      normalized_score: 0,
      weight: 0.15,
    };
  }

  const question = options.question || DEFAULT_QUESTION;
  const probeErrors = [];
  let wikiContentsLength = 0;
  let qaResponse = '';

  // Probe 1: wiki contents (full-repo summary)
  try {
    const wikiContents = await options.mcpClient.callTool({
      server: 'deepwiki',
      name: 'read_wiki_contents',
      arguments: { repoName: target.identifier },
    });
    if (isErrorShapedPayload(wikiContents)) {
      probeErrors.push(`read_wiki_contents: returned error-shaped payload`);
    } else {
      wikiContentsLength = typeof wikiContents === 'string' ? wikiContents.length : JSON.stringify(wikiContents).length;
    }
  } catch (err) {
    probeErrors.push(`read_wiki_contents: ${err.message}`);
  }

  // Probe 2: targeted question
  try {
    const result = await options.mcpClient.callTool({
      server: 'deepwiki',
      name: 'ask_question',
      arguments: { repoName: target.identifier, question },
    });
    if (isErrorShapedPayload(result)) {
      probeErrors.push(`ask_question: returned error-shaped payload`);
    } else {
      qaResponse = typeof result === 'string' ? result : (result?.text || JSON.stringify(result));
    }
  } catch (err) {
    probeErrors.push(`ask_question: ${err.message}`);
  }

  // Fail-CLOSED: both probes failed (thrown OR error-shaped) => skipped
  if (probeErrors.length === 2) {
    return {
      name: 'A5_cognition_deepwiki',
      skipped: true,
      reason: `all probes failed: ${probeErrors.join('; ')}`,
      normalized_score: 0,
      weight: 0.15,
    };
  }

  // Score: 0.5 wiki-contents present (>1000 chars) + 0.5 substantive Q&A (>500 chars)
  const wikiScore = wikiContentsLength > 1000 ? 0.5 : (wikiContentsLength > 200 ? 0.25 : 0);
  const qaScore = qaResponse.length > 500 ? 0.5 : (qaResponse.length > 100 ? 0.25 : 0);
  const score = wikiScore + qaScore;

  return {
    name: 'A5_cognition_deepwiki',
    repo: target.identifier,
    questions_asked: 1,
    response_summary: qaResponse.slice(0, 500),
    wiki_contents_length: wikiContentsLength,
    probe_errors: probeErrors.length > 0 ? probeErrors : undefined,
    normalized_score: Number(score.toFixed(3)),
    weight: 0.15,
  };
}
