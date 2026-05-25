#!/usr/bin/env node
// build-subagent-allowlist.mjs — W340 F3/SB-3 closure
//
// Auto-builds .claude/state/subagent-type-allowlist.json from:
//   1. .claude/plugins/cache/<marketplace>/<plugin>/<version>/agents/*.md
//      (plugin-level agents, NOT skill-scoped <plugin>/<version>/skills/<skill>/agents/)
//   2. .claude/agents/*.md (operator-curated local agents)
//   3. Pre-existing allowlist entries (preserved as legacy_bare_aliases for backward compat
//      during W333-D5 FQN-discipline migration)
//
// Outputs FQN-prefixed allow[] (cardinal-rule-3 W333-D5 discipline):
//   - "<plugin>:<agent>" for plugin-shipped agents
//   - bare "<agent>" for .claude/agents/ local entries
//   - built-ins always present: Explore, Plan, Sonnet-only, general-purpose
//
// Modes:
//   (default)     lint — read both side, report drift, no write, exit 0
//   --check-only  same as default; explicit
//   --diff        show added/removed FQN entries
//   --write       overwrite allowlist file
//   --regenerate  alias of --write (W331 axis-1 #5 mechanization terminology)
//
// References:
//   https://docs.anthropic.com/en/docs/claude-code/sub-agents (subagent_type schema)
//   https://docs.anthropic.com/en/docs/claude-code/hooks (PreToolUse[Agent] gate)
//   CLAUDE.md cardinal-rule-3 + W333-D5 Finding #5 (FQN discipline)
//   docs/architecture/W340-FULL-SOTA-UNLEASH/stream-D-agent-orchestration.md F3
//
// Node 22 native (no deps). Cite-anchored to W340-F3 closure.

import { readdirSync, existsSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join, basename, sep } from 'node:path';
import { execSync } from 'node:child_process';

// W341 P1.4 — provenance fields per Stream A §4 + Stream E §3.
// generated_at (full ISO timestamp; supersedes date-only `_generated`),
// source_commit_sha (git HEAD at regen time — empty string if git unavailable),
// schema_version ("1.0.0" — bump on incompatible field changes).
const SCHEMA_VERSION = '1.0.0';

function gitHeadSha() {
  try {
    return execSync('git rev-parse HEAD', {
      cwd: 'Z:/claude-sota-installed',
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
  } catch {
    return '';
  }
}

const INSTALLED_PLUGINS_PATH =
  process.env.CLAUDE_INSTALLED_PLUGINS ||
  'Z:/claude-sota-installed/.claude/plugins/installed_plugins.json';
const LOCAL_AGENTS_DIR =
  process.env.CLAUDE_LOCAL_AGENTS_DIR ||
  'Z:/claude-sota-installed/.claude/agents';
const OUTPUT_PATH =
  process.env.W326_SUBAGENT_ALLOWLIST ||
  'Z:/claude-sota-installed/.claude/state/subagent-type-allowlist.json';

const BUILTIN = ['Explore', 'Plan', 'Sonnet-only', 'general-purpose'];

function safeReadDir(dir) {
  try {
    return readdirSync(dir, { withFileTypes: true });
  } catch {
    return [];
  }
}

function isAgentMdAtPluginRoot(absPath, pluginVersionRoot) {
  const agentsDir = join(pluginVersionRoot, 'agents');
  return absPath.startsWith(agentsDir + sep) ||
         absPath.startsWith(agentsDir + '/') ||
         absPath.startsWith(agentsDir + '\\');
}

// W340-FIXUP r3 codex-correction: read installed_plugins.json for ACTIVE
// installPath per plugin (CR-3 "installed upstream agents" gate). Walking
// every cache version would allow stale/uninstalled-version agents (codex
// r3 finding). This honors the operator's actual install set.
function discoverPluginAgents() {
  const found = [];
  if (!existsSync(INSTALLED_PLUGINS_PATH)) return found;
  let registry;
  try {
    registry = JSON.parse(readFileSync(INSTALLED_PLUGINS_PATH, 'utf8'));
  } catch {
    return found;
  }
  const plugins = registry?.plugins || {};
  for (const [pluginKey, installRecords] of Object.entries(plugins)) {
    // pluginKey is "<plugin>@<marketplace>" — extract plugin name
    const atIdx = pluginKey.indexOf('@');
    const pluginName = atIdx >= 0 ? pluginKey.slice(0, atIdx) : pluginKey;
    const marketplace = atIdx >= 0 ? pluginKey.slice(atIdx + 1) : null;
    if (!Array.isArray(installRecords)) continue;
    for (const rec of installRecords) {
      const installPath = rec?.installPath;
      if (typeof installPath !== 'string' || !existsSync(installPath)) continue;
      const agentsDir = join(installPath, 'agents');
      if (!existsSync(agentsDir)) continue;
      const files = safeReadDir(agentsDir).filter(
        (e) => e.isFile() && e.name.endsWith('.md')
      );
      for (const f of files) {
        const name = f.name.replace(/\.md$/, '');
        found.push({
          plugin: pluginName,
          marketplace,
          version: rec?.version || null,
          name,
          fqn: `${pluginName}:${name}`,
          absPath: join(agentsDir, f.name),
        });
      }
    }
  }
  return found;
}

function discoverLocalAgents() {
  const found = [];
  if (!existsSync(LOCAL_AGENTS_DIR)) return found;
  const files = safeReadDir(LOCAL_AGENTS_DIR).filter(
    (e) => e.isFile() && e.name.endsWith('.md')
  );
  for (const f of files) {
    const name = f.name.replace(/\.md$/, '');
    found.push({
      plugin: null,
      marketplace: null,
      version: null,
      name,
      fqn: name,
      absPath: join(LOCAL_AGENTS_DIR, f.name),
    });
  }
  return found;
}

function readExistingAllowlist() {
  try {
    const txt = readFileSync(OUTPUT_PATH, 'utf8');
    const j = JSON.parse(txt);
    return {
      allow: Array.isArray(j.allow) ? j.allow : [],
      legacy_bare_aliases: Array.isArray(j.legacy_bare_aliases)
        ? j.legacy_bare_aliases
        : [],
      _doc: j._doc,
      _count: j._count,
      _generated: j._generated,
    };
  } catch {
    return { allow: [], legacy_bare_aliases: [], _doc: null, _count: 0, _generated: null };
  }
}

function buildAllowlist() {
  const pluginAgents = discoverPluginAgents();
  const localAgents = discoverLocalAgents();
  const existing = readExistingAllowlist();

  // FQN set
  const allowFqn = new Set(BUILTIN);
  for (const a of pluginAgents) allowFqn.add(a.fqn);
  for (const a of localAgents) allowFqn.add(a.fqn);

  // Track bare-name collisions for diagnostics + legacy aliases
  const bareNameToPlugins = new Map();
  for (const a of pluginAgents) {
    if (!bareNameToPlugins.has(a.name)) bareNameToPlugins.set(a.name, new Set());
    bareNameToPlugins.get(a.name).add(a.plugin);
  }
  const collidingBareNames = [];
  const uniqueBareCandidates = [];
  for (const [name, plugins] of bareNameToPlugins.entries()) {
    if (plugins.size > 1) {
      collidingBareNames.push({ name, plugins: [...plugins].sort() });
    } else {
      uniqueBareCandidates.push(name);
    }
  }

  // Legacy bare aliases: preserve ALL existing allowlist's non-FQN entries +
  // ALL pre-existing legacy_bare_aliases for backward compat during W333-D5
  // migration. The validator currently allows these — dropping them would
  // regress dispatches. NEW bare names from cache scan are NOT auto-added.
  const isFqnLike = (s) => s.includes(':') || BUILTIN.includes(s);
  const legacyBare = new Set();
  for (const entry of existing.allow) {
    if (!isFqnLike(entry)) legacyBare.add(entry);
  }
  for (const entry of existing.legacy_bare_aliases) {
    legacyBare.add(entry);
  }
  // Also preserve any existing FQN entries that the cache scan didn't find
  // (plugin uninstalled but allowlist entry still referenced by JSONL history).
  const orphanedFqn = [];
  for (const entry of existing.allow) {
    if (isFqnLike(entry) && !allowFqn.has(entry)) {
      orphanedFqn.push(entry);
      allowFqn.add(entry); // keep — flagged as orphaned for operator review
    }
  }

  return {
    allow: [...allowFqn].sort((a, b) => a.localeCompare(b)),
    legacy_bare_aliases: [...legacyBare].sort((a, b) => a.localeCompare(b)),
    colliding_bare_names: collidingBareNames.sort((a, b) =>
      a.name.localeCompare(b.name)
    ),
    orphaned_fqn: orphanedFqn.sort((a, b) => a.localeCompare(b)),
    pluginAgentCount: pluginAgents.length,
    localAgentCount: localAgents.length,
    existing,
  };
}

function diffAllowlists(currentAllow, newAllow) {
  const curr = new Set(currentAllow);
  const next = new Set(newAllow);
  const added = [...next].filter((x) => !curr.has(x)).sort();
  const removed = [...curr].filter((x) => !next.has(x)).sort();
  return { added, removed };
}

function emit(out, prevAllow) {
  const diff = diffAllowlists(prevAllow, out.allow);
  console.log(
    `[build-allowlist] plugin-agents=${out.pluginAgentCount} local-agents=${out.localAgentCount} allow=${out.allow.length} legacy_bare=${out.legacy_bare_aliases.length} colliding_bare=${out.colliding_bare_names.length} orphaned_fqn=${out.orphaned_fqn.length} diff_vs_existing=+${diff.added.length}/-${diff.removed.length}`
  );
  if (out.orphaned_fqn.length)
    console.log(
      `[build-allowlist] orphaned-fqn (plugin uninstalled but allowlist retained): ${out.orphaned_fqn.slice(0, 8).join(', ')}${
        out.orphaned_fqn.length > 8 ? ` ... (${out.orphaned_fqn.length - 8} more)` : ''
      }`
    );
  if (diff.added.length)
    console.log(
      `[build-allowlist] +added: ${diff.added.slice(0, 12).join(', ')}${
        diff.added.length > 12 ? ` ... (${diff.added.length - 12} more)` : ''
      }`
    );
  if (diff.removed.length)
    console.log(
      `[build-allowlist] -removed: ${diff.removed.slice(0, 12).join(', ')}${
        diff.removed.length > 12 ? ` ... (${diff.removed.length - 12} more)` : ''
      }`
    );
  if (out.colliding_bare_names.length)
    console.log(
      `[build-allowlist] colliding-bare-names (must use FQN per W333-D5): ${out.colliding_bare_names
        .slice(0, 8)
        .map((c) => `${c.name}(${c.plugins.length})`)
        .join(', ')}${
        out.colliding_bare_names.length > 8
          ? ` ... (${out.colliding_bare_names.length - 8} more)`
          : ''
      }`
    );
}

function main() {
  const args = process.argv.slice(2);
  const checkOnly = args.includes('--check-only') || (args.length === 0);
  const diffMode = args.includes('--diff');
  const writeMode = args.includes('--write') || args.includes('--regenerate');

  const out = buildAllowlist();
  emit(out, out.existing.allow || []);

  if (writeMode) {
    const nowIso = new Date().toISOString();
    const headSha = gitHeadSha();
    const json = {
      _doc:
        'W340 F3/SB-3 + W341 P1.4 — auto-built by tools/build-subagent-allowlist.mjs from .claude/plugins/cache/<marketplace>/<plugin>/<version>/agents/*.md + .claude/agents/*.md. allow[] is FQN-prefixed per cardinal-rule-3 W333-D5 discipline. legacy_bare_aliases[] is backward-compat for the W333-D5 migration window. colliding_bare_names[] is diagnostic (MUST use FQN when dispatching). Regenerate: node tools/build-subagent-allowlist.mjs --regenerate. Lint: node tools/build-subagent-allowlist.mjs --check-only.',
      schema_version: SCHEMA_VERSION,
      generated_at: nowIso,
      source_commit_sha: headSha,
      _count: out.allow.length,
      _legacy_bare_count: out.legacy_bare_aliases.length,
      _colliding_bare_count: out.colliding_bare_names.length,
      _generated: nowIso.slice(0, 10),
      _generator: 'tools/build-subagent-allowlist.mjs',
      _orphaned_fqn_count: out.orphaned_fqn.length,
      allow: out.allow,
      legacy_bare_aliases: out.legacy_bare_aliases,
      colliding_bare_names: out.colliding_bare_names,
      orphaned_fqn: out.orphaned_fqn,
    };
    writeFileSync(OUTPUT_PATH, JSON.stringify(json, null, 2) + '\n');
    console.log(`[build-allowlist] WROTE ${OUTPUT_PATH}`);
    process.exit(0);
  }

  if (diffMode || checkOnly) {
    process.exit(0);
  }
}

main();
