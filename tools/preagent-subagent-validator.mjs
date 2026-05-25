#!/usr/bin/env node
// preagent-subagent-validator.mjs — W326 P0-A2 ship
//
// PreToolUse[Agent] BLOCKING validator. Closes W319-A H3 typo trap.
// Reads `.tool_input.subagent_type` from the event; if present and unknown,
// emits diagnostic to stderr and exits 2 to BLOCK the tool call. Otherwise
// exits 0.
//
// Allowlist source: Z:/claude-sota-installed/.claude/state/subagent-type-allowlist.json
// (auto-built from .claude/plugins/cache/*/agents/*.md + .claude/agents/*.md +
// historical JSONL subagent_type extraction; refresh by re-running the bundled
// build script).
//
// Built-in subagent types (CC harness, always-allowed): Explore, Plan,
// Sonnet-only, general-purpose.
//
// Soft-failure: if allowlist file missing/unparsable, exits 0 (advisory absent
// is preferred over false-positive blocking). Time-budget <100ms typical.
// Node 22 native (no deps).
//
// References:
// - https://docs.anthropic.com/en/docs/claude-code/hooks (exit 2 blocks tool)
// - https://docs.anthropic.com/en/docs/claude-code/sub-agents (subagent_type schema)
// - W319-A H3 typo-trap (hyphen-vs-underscore subagent_type)

import { readFileSync, existsSync } from 'node:fs';

const ALLOWLIST_PATH =
  process.env.W326_SUBAGENT_ALLOWLIST ||
  'Z:/claude-sota-installed/.claude/state/subagent-type-allowlist.json';

const BUILTIN = new Set(['Explore', 'Plan', 'Sonnet-only', 'general-purpose']);

async function readEvent() {
  return await new Promise((resolve) => {
    let buf = '';
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (c) => (buf += c));
    process.stdin.on('end', () => {
      try {
        resolve(JSON.parse(buf || '{}'));
      } catch {
        resolve({});
      }
    });
    setTimeout(() => resolve({}), 400);
  });
}

function loadAllowlist() {
  if (!existsSync(ALLOWLIST_PATH)) return null;
  try {
    const txt = readFileSync(ALLOWLIST_PATH, 'utf8');
    const data = JSON.parse(txt);
    // W340 F3/F4 closure: union `allow[]` (FQN-prefixed per W333-D5) with
    // `legacy_bare_aliases[]` (backward-compat bare names during FQN migration).
    // Validator accepts both; build-subagent-allowlist.mjs splits them for
    // human review while preserving dispatch behavior.
    const merged = new Set();
    if (Array.isArray(data?.allow)) {
      for (const e of data.allow) merged.add(e);
    }
    if (Array.isArray(data?.legacy_bare_aliases)) {
      for (const e of data.legacy_bare_aliases) merged.add(e);
    }
    // W340 F5 closure: also load colliding_bare_names for ambiguity-warn.
    const colliding = new Map();
    if (Array.isArray(data?.colliding_bare_names)) {
      for (const c of data.colliding_bare_names) {
        if (c?.name && Array.isArray(c?.plugins)) {
          colliding.set(c.name, c.plugins);
        }
      }
    }
    if (merged.size > 0) {
      merged.colliding = colliding;
      return merged;
    }
  } catch {
    /* fall through */
  }
  return null;
}

function suggest(typed, allowSet) {
  if (!allowSet) return [];
  const t = typed.toLowerCase();
  // Cheap fuzzy: prefix match OR substring match
  const subs = [];
  for (const a of allowSet) {
    const al = a.toLowerCase();
    if (al === t) return [a];
    if (al.startsWith(t) || t.startsWith(al)) subs.push(a);
    else if (al.includes(t) || t.includes(al)) subs.push(a);
  }
  // De-prioritise large substring drift; cap 5
  return subs.slice(0, 5);
}

function block(reason, suggestions) {
  const lines = [`W326 subagent_type validator BLOCK: ${reason}`];
  if (suggestions.length > 0) {
    lines.push(`Did you mean: ${suggestions.join(', ')}`);
  }
  lines.push(
    'Per W319-A H3: hyphen/underscore/plugin-prefix typos in subagent_type silently route to general-purpose without surfacing the typo. Allowlist: Z:/claude-sota-installed/.claude/state/subagent-type-allowlist.json',
  );
  process.stderr.write(`${lines.join('\n')}\n`);
  process.exit(2);
}

async function main() {
  const ev = await readEvent();
  const sub = ev?.tool_input?.subagent_type;
  if (typeof sub !== 'string' || sub.length === 0) {
    process.exit(0); // no subagent_type specified, nothing to validate
  }
  if (BUILTIN.has(sub)) process.exit(0);
  const allow = loadAllowlist();
  if (!allow) {
    // Soft-fail: allowlist unavailable, do not block
    process.stderr.write(
      `W326 subagent_type validator: allowlist not loadable from ${ALLOWLIST_PATH}; advisory skipped (exit 0).\n`,
    );
    process.exit(0);
  }
  if (allow.has(sub)) {
    // W340 F5 ambiguity-WARN: if bare name resolves to multiple FQN candidates,
    // emit WARN to stderr (do NOT block — operator may have intentional reason).
    // The warn surfaces silent-fanout-to-wrong-plugin risk per W333-D5.
    if (allow.colliding && allow.colliding.has(sub) && !sub.includes(':')) {
      const plugins = allow.colliding.get(sub);
      const candidates = plugins.map((p) => `${p}:${sub}`).join(', ');
      process.stderr.write(
        `W340 F5 ambiguity-WARN: bare subagent_type "${sub}" resolves to ${plugins.length} FQN candidates: ${candidates}. Use FQN form per W333-D5 to disambiguate. Continuing with default plugin resolution.\n`,
      );
    }
    process.exit(0);
  }
  // Unknown
  block(`unknown subagent_type "${sub}"`, suggest(sub, allow));
}

main().catch((e) => {
  // W343-P0d: fail-CLOSED on validator crash UNLESS bypass-marker present OR
  // CLAUDE_SUBAGENT_VALIDATOR_FAILOPEN=1 env present. Per codex E7
  // single-most-important — unconditional exit(0) on crash creates complete
  // bypass surface. Preserves W331-r4 in-session-bypass-marker escape-hatch.
  const BYPASS_MARKER = 'Z:/claude-sota-installed/.claude/state/parallel-guard-bypass.marker';
  let markerPresent = false;
  try { markerPresent = existsSync(BYPASS_MARKER); } catch { /* fs probe failed */ }
  const failOpen = process.env.CLAUDE_SUBAGENT_VALIDATOR_FAILOPEN === '1';

  if (failOpen || markerPresent) {
    process.stderr.write(`W326 subagent_type validator soft-fail (W343-P0d bypass): ${e?.message || e}\n`);
    process.exit(0);
  }

  process.stderr.write(
    `W326 subagent_type validator FAIL-CLOSED (W343-P0d): ${e?.message || e}\n` +
    `OVERRIDE: set CLAUDE_SUBAGENT_VALIDATOR_FAILOPEN=1 OR create bypass-marker at ${BYPASS_MARKER}.\n`
  );
  process.exit(2);
});
