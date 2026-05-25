#!/usr/bin/env node
// claude-analytics-fetch.mjs — Anthropic Admin Analytics API client for Claude Code usage
//
// W335 P2-1 closure (W335 INSIGHTS mandate per docs/architecture/W335-SOTA-CONVERGENCE-MAX/COMPREHENSIVE-PROMPT.md):
// Queries Anthropic Admin API `GET /v1/organizations/usage_report/claude_code` (launched
// 2025-09-10) for org-wide CC usage metrics: tokens, sessions, costs.
//
// W336 codex r3 NEEDS-REVISION fix:
//   - API contract corrected per https://platform.claude.com/docs/en/api/admin/usage_report/retrieve_claude_code
//     * `starting_at` is YYYY-MM-DD (single-day cursor), NOT an ISO datetime range
//     * pagination via `limit` + `page` query params
//     * records have nested shape: { date, actor:{type,email_address}, customer:{type,email_address},
//                                    organization:{id,name}, terminal_type, core_metrics:{...}, tool_actions:{...}, model_breakdown:[{model, tokens:{input,output,cache_read,cache_creation}, estimated_cost:{...}}] }
//   - 3-org-distinct cite block fixed (was 2-org: Anthropic+Anthropic+Node — became 3 distinct orgs).
//
// Usage:
//   node tools/claude-analytics-fetch.mjs [--start <YYYY-MM-DD>] [--limit N] [--page N] [--json]
//
// Env required:
//   ANTHROPIC_ADMIN_API_KEY — Admin API key (org-scoped, NOT a regular key)
//
// Output: pretty-printed summary by default; JSON with --json.
// Exit: 0 success, 1 missing key, 2 HTTP non-2xx, 3 parse error.
//
// Cite (3-org-distinct):
//   1. Anthropic PBC — https://platform.claude.com/docs/en/api/admin/usage_report/retrieve_claude_code
//      (canonical Admin API spec; launched 2025-09-10 per release notes 2025-09)
//   2. OpenJS Foundation — https://nodejs.org/docs/latest-v22.x/api/globals.html#fetch
//      (Node.js >=22 native fetch / Web standard; OpenJS Foundation is a Linux-Foundation-affiliated project)
//   3. NIST — https://csrc.nist.gov/pubs/sp/800/218/final NIST SP 800-218 PW.7 + RV.1
//      (admin-API consumption + verify-before-claim discipline; cite-anchor for the
//       defensive parsing this script applies to nested core_metrics / model_breakdown)

const KEY = process.env.ANTHROPIC_ADMIN_API_KEY;
if (!KEY) {
  process.stderr.write('[claude-analytics-fetch] FATAL: ANTHROPIC_ADMIN_API_KEY env var not set\n');
  process.exit(1);
}

const args = process.argv.slice(2);
const argMap = Object.fromEntries(args.flatMap((a, i, arr) => a.startsWith('--') ? [[a.slice(2), arr[i+1] && !arr[i+1].startsWith('--') ? arr[i+1] : true]] : []));

// `starting_at` is YYYY-MM-DD single-day cursor (per W336 codex r3+r4 fix).
// Default: today (UTC). Operator passes --start to query a different date.
// `page` is an OPAQUE STRING CURSOR returned in `next_page` — first request
// MUST omit it (W336 codex r4 #1).
const toYMD = (d) => d.toISOString().slice(0, 10);
const starting_at = argMap.start || toYMD(new Date());
const limit = Number(argMap.limit || 100);
const page = typeof argMap.page === 'string' ? argMap.page : null;
const json_out = argMap.json === true;

const url = new URL('https://api.anthropic.com/v1/organizations/usage_report/claude_code');
url.searchParams.set('starting_at', starting_at);
url.searchParams.set('limit', String(limit));
if (page) url.searchParams.set('page', page);

const resp = await fetch(url, {
  headers: {
    'x-api-key': KEY,
    'anthropic-version': '2023-06-01',
    'content-type': 'application/json',
  },
});
if (!resp.ok) {
  process.stderr.write(`[claude-analytics-fetch] HTTP ${resp.status} ${resp.statusText}\n${await resp.text()}\n`);
  process.exit(2);
}
let body;
try { body = await resp.json(); } catch (err) {
  process.stderr.write(`[claude-analytics-fetch] parse error: ${err.message}\n`);
  process.exit(3);
}

if (json_out) {
  process.stdout.write(JSON.stringify(body, null, 2) + '\n');
  process.exit(0);
}

// Defensive record-walk per NIST SP 800-218 RV.1 verify-before-claim:
// each `data[i]` carries nested `core_metrics` + `model_breakdown` per current API.
// W336 codex r4 #2: core_metrics field names are nested via lines_of_code +
// suffixed with _by_claude_code; #3: estimated_cost.amount is in CENTS USD.
const data = Array.isArray(body?.data) ? body.data : [];
const sum = data.reduce((a, r) => {
  const cm = r?.core_metrics || {};
  const loc = cm.lines_of_code || {};
  a.sessions += Number(cm.num_sessions || 0);
  a.lines_added += Number(loc.added || 0);
  a.lines_removed += Number(loc.removed || 0);
  a.commits += Number(cm.commits_by_claude_code || 0);
  a.pull_requests += Number(cm.pull_requests_by_claude_code || 0);
  const mb = Array.isArray(r?.model_breakdown) ? r.model_breakdown : [];
  for (const m of mb) {
    const t = m?.tokens || {};
    a.input_tokens += Number(t.input || 0);
    a.output_tokens += Number(t.output || 0);
    a.cache_read_tokens += Number(t.cache_read || 0);
    a.cache_creation_tokens += Number(t.cache_creation || 0);
    const cost = m?.estimated_cost || {};
    a.cost_cents += Number(cost.amount || 0);  // cents per W336 codex r4 #3
  }
  return a;
}, {
  sessions: 0, lines_added: 0, lines_removed: 0, commits: 0, pull_requests: 0,
  input_tokens: 0, output_tokens: 0, cache_read_tokens: 0, cache_creation_tokens: 0, cost_cents: 0,
});

const has_more = Boolean(body?.has_more);
const next_page = has_more ? (body?.next_page || null) : null;  // opaque string cursor

const fmt = (n) => n.toLocaleString();
const cost_usd = sum.cost_cents / 100;
process.stdout.write(`# Claude Code Usage — date ${starting_at} (limit ${limit}${page ? `, page-cursor ${page}` : ''})
Rows fetched:           ${data.length}
Sessions:               ${fmt(sum.sessions)}
Lines added:            ${fmt(sum.lines_added)}
Lines removed:          ${fmt(sum.lines_removed)}
Commits (by CC):        ${fmt(sum.commits)}
Pull requests (by CC):  ${fmt(sum.pull_requests)}
Input tokens:           ${fmt(sum.input_tokens)}
Output tokens:          ${fmt(sum.output_tokens)}
Cache-read tokens:      ${fmt(sum.cache_read_tokens)}
Cache-creation tokens:  ${fmt(sum.cache_creation_tokens)}
Estimated cost (USD):   $${cost_usd.toFixed(2)}  (raw cents: ${fmt(sum.cost_cents)})
Has more pages:         ${has_more}${has_more && next_page ? ` (next --page '${next_page}')` : ''}

Source: https://api.anthropic.com/v1/organizations/usage_report/claude_code
Cite: tools/claude-analytics-fetch.mjs (W335 P2-1 + W336 codex r3+r4 fixes; anthropic-version 2023-06-01)
`);
process.exit(0);
