/**
 * readme-parse.mjs — Pure text-parsing core for README-based repo discovery.
 *
 * Cite: DESIGN.md §1 (awesome-list mining + named-anchor alternatives facets)
 *
 * No network, no external deps, no project imports.
 * ESM; pure + deterministic.
 */

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** GitHub owner names that are reserved paths, not user/org names. */
const RESERVED_OWNERS = new Set([
  'sponsors', 'topics', 'orgs', 'marketplace', 'features', 'about',
  'settings', 'notifications', 'explore', 'login', 'join', 'pricing',
  'site', 'contact', 'security', 'apps', 'collections', 'events',
  'readme', 'search', 'trending', 'stars', 'watching', 'new',
  'organizations', 'users', 'dashboard',
]);

/**
 * Regex to find github.com/<owner>/<repo> references.
 * Matches http(s)://(www.)github.com/<owner>/<repo>
 * as well as bare github.com/<owner>/<repo> (no scheme).
 * Capture group 1 = owner, group 2 = repo (raw, before stripping).
 */
const GITHUB_URL_RE =
  /(?:https?:\/\/)?(?:www\.)?github\.com\/([A-Za-z0-9_.-]+)\/([A-Za-z0-9_.-]+)(?=[\/\s#?),;:.!?"'>]|$)/g;

/**
 * Trailing punctuation / path junk to strip from the repo segment.
 * We strip `.git`, then trailing `/?`, then trailing punctuation chars.
 */
const TRAILING_JUNK_RE = /(?:\.git)?\/?[).,;:!?"'>]*$/;

/**
 * Headings that indicate an "alternatives / comparison" section.
 */
const ALT_HEADING_RE = /altern|compar(?:e|ed|ison)|similar|\bvs\.?\b|see also|related projects?/i;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Clean a raw repo path string: strip anchor/query, trailing .git, trailing
 * slash and punctuation, then lowercase.
 * Returns null if result is empty.
 *
 * @param {string} raw
 * @returns {string|null}
 */
function cleanRepo(raw) {
  // Strip from '#' or '?' onwards
  const anchorIdx = raw.search(/[#?]/);
  const stripped = anchorIdx !== -1 ? raw.slice(0, anchorIdx) : raw;
  // Strip trailing .git, slashes, punctuation
  const clean = stripped.replace(TRAILING_JUNK_RE, '').toLowerCase();
  return clean.length > 0 ? clean : null;
}

/**
 * Parse all github.com/<owner>/<repo> pairs from a text string.
 * Returns a Set of lowercased "owner/repo" strings.
 *
 * @param {string} text
 * @returns {Set<string>}
 */
function parseRepoSet(text) {
  const seen = new Set();
  let m;
  // Reset lastIndex before use (global regex)
  GITHUB_URL_RE.lastIndex = 0;
  while ((m = GITHUB_URL_RE.exec(text)) !== null) {
    const owner = m[1].toLowerCase();
    if (RESERVED_OWNERS.has(owner) || owner === '') continue;
    const rawRepo = m[2];
    const repo = cleanRepo(rawRepo);
    if (!repo || repo === '') continue;
    seen.add(`${owner}/${repo}`);
  }
  return seen;
}

// ---------------------------------------------------------------------------
// Public exports
// ---------------------------------------------------------------------------

/**
 * Extract all GitHub `owner/repo` references from a README text.
 *
 * Finds every `github.com/<owner>/<repo>` reference (http/https, optional
 * `www.`, plain text or inside markdown links). Strips `.git`, trailing
 * slashes, trailing punctuation, and anchor/query fragments. Lowercases and
 * deduplicates results.
 *
 * @param {*} text - README content (must be string; anything else → []).
 * @returns {string[]} Deduped, lowercased "owner/repo" strings.
 */
export function extractRepoLinks(text) {
  if (typeof text !== 'string') return [];
  return Array.from(parseRepoSet(text)).sort();
}

/**
 * Extract GitHub `owner/repo` references that appear **only** under
 * "Alternatives"-like sections of a README.
 *
 * Sections are delimited by ATX headings (`# … ` to `###### … `). A section
 * whose heading text matches the alternatives pattern (alternative, compare,
 * similar, vs., see also, related projects) is scanned with `extractRepoLinks`.
 *
 * @param {*} text - README content (must be string; anything else → []).
 * @returns {string[]} Deduped, lowercased "owner/repo" strings from matching sections.
 */
export function extractAlternatives(text) {
  if (typeof text !== 'string') return [];

  // Split into sections: each element is [ headingText, bodyText ]
  const lines = text.split('\n');
  const sections = [];
  let currentHeading = null;
  let bodyLines = [];

  for (const line of lines) {
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      if (currentHeading !== null) {
        sections.push([currentHeading, bodyLines.join('\n')]);
      }
      currentHeading = headingMatch[2].trim();
      bodyLines = [];
    } else {
      bodyLines.push(line);
    }
  }
  // Flush last section
  if (currentHeading !== null) {
    sections.push([currentHeading, bodyLines.join('\n')]);
  }

  // Collect repos from matching sections
  const collected = new Set();
  for (const [heading, body] of sections) {
    if (ALT_HEADING_RE.test(heading)) {
      for (const repo of parseRepoSet(body)) {
        collected.add(repo);
      }
    }
  }

  return Array.from(collected).sort();
}
