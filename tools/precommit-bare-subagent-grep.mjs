#!/usr/bin/env node
// precommit-bare-subagent-grep.mjs — W342-X2 P1.5 bare-name CI grep
//
// Pre-commit hook (stage: pre-commit) that scans staged files for any of the
// 13 colliding bare `subagent_type` names per W340 F4 + W333-D5 FQN-discipline.
//
// CONTRACT (closes W340 F4 13-name surface):
//   Bare `subagent_type: "<name>"` where <name> is one of:
//     architect, code-architect, code-explorer, code-reviewer, code-simplifier,
//     comment-analyzer, context-manager, conversation-analyzer, debugger,
//     pr-test-analyzer, security-auditor, silent-failure-hunter,
//     type-design-analyzer
//   silently fan-out to the wrong plugin's agent. MUST use FQN form
//   `<plugin>:<name>` per W333-D5 + W340 F5.
//
// HEURISTIC:
//   1. Load 13 names from `.claude/state/subagent-type-allowlist.json:colliding_bare_names[]`.
//   2. List staged add/modify files (git diff --staged --name-only --diff-filter=AM).
//   3. For each file (limit: ≤256KB scan; skip binary), grep for patterns:
//        subagent_type[: =]"<bare-name>"
//        subagent_type=['<bare-name>']
//        "subagent_type": "<bare-name>"
//      where <bare-name> is one of the 13 AND does NOT contain `:` (FQN delimiter).
//   4. Emit file:line:bare-name + FQN suggestions to stderr.
//   5. Exit 2 on any hit; else exit 0.
//
// SOFT-FAIL: allowlist file missing/unparseable → exit 0 (advisory absent).
//
// Escape hatch: CLAUDE_BARE_SUBAGENT_GREP_DISABLE=1 OR
//               `touch .claude/state/bare-subagent-grep-bypass.marker`.
//
// Time-budget <2s for ~100 staged files. Node 22 native (uses child_process for git).
//
// CITES:
// - https://docs.anthropic.com/en/docs/claude-code/sub-agents (FQN form)
// - .claude/state/subagent-type-allowlist.json:colliding_bare_names[]
// - docs/architecture/W336-CONTINUE/W336-FQN-SUBAGENT-TYPE.md (W333-D5 codify)
// - tools/preagent-subagent-validator.mjs (W340 F5 ambiguity-warn pattern)
// - W341 VERDICT-LEDGER.md Stream E §4 (P1.5 closure)

import { readFileSync, existsSync, statSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const ALLOWLIST_PATH =
  process.env.W342_BARE_GREP_ALLOWLIST ||
  'Z:/claude-sota-installed/.claude/state/subagent-type-allowlist.json';
const BYPASS_MARKER =
  'Z:/claude-sota-installed/.claude/state/bare-subagent-grep-bypass.marker';
const MAX_FILE_BYTES = 256 * 1024;

function loadCollidingNames() {
  if (!existsSync(ALLOWLIST_PATH)) return null;
  try {
    const data = JSON.parse(readFileSync(ALLOWLIST_PATH, 'utf8'));
    if (!Array.isArray(data?.colliding_bare_names)) return null;
    const m = new Map();
    for (const c of data.colliding_bare_names) {
      if (c?.name && Array.isArray(c?.plugins)) {
        m.set(c.name, c.plugins);
      }
    }
    return m.size > 0 ? m : null;
  } catch {
    return null;
  }
}

function listStagedFiles() {
  try {
    const out = execFileSync(
      'git',
      ['diff', '--staged', '--name-only', '--diff-filter=AM'],
      { encoding: 'utf8', timeout: 5000 }
    );
    return out.split('\n').map((s) => s.trim()).filter(Boolean);
  } catch {
    return [];
  }
}

function isBinaryByExtension(path) {
  return /\.(png|jpe?g|gif|webp|ico|pdf|zip|gz|tar|tgz|7z|exe|dll|so|dylib|o|a|jar|war|woff2?|ttf|otf|wasm|bin|class|pyc|node)$/i.test(path);
}

// Build regex that matches:
//   subagent_type<sep>"<name>"   (yaml + js + json + py)
//   "subagent_type":<sep>"<name>"
//   subagent_type=<sep>'<name>'
// where <sep> is `:`, `=`, or `: ` and <name> is one of colliding bare.
// The match MUST require the value to be bare (no `:` inside the quoted value).
function buildScanRegex(names) {
  const alt = names.map((n) => n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
  // Quoted form: subagent_type[: =]['"]<bare>['"]
  // Unquoted yaml form: subagent_type: <bare>
  // Capture group 1 = bare name
  return new RegExp(
    `subagent_type\\s*[:=]\\s*['"]?(` + alt + `)['"]?(?![\\w:-])`,
    'g'
  );
}

function scanFile(path, rx, names) {
  let content;
  try {
    const st = statSync(path);
    if (!st.isFile()) return [];
    if (st.size > MAX_FILE_BYTES) return [];
    content = readFileSync(path, 'utf8');
  } catch { return []; }
  // Skip files that look binary (NUL byte)
  if (content.includes('\0')) return [];
  const hits = [];
  const lines = content.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    rx.lastIndex = 0;
    const line = lines[i];
    let m;
    while ((m = rx.exec(line)) !== null) {
      const bare = m[1];
      // Final guard: only flag if name truly is bare (no FQN prefix)
      // Look at chars right before the match for `:` indicating FQN
      const startIdx = m.index;
      // Walk back through quote/whitespace
      let j = startIdx - 1;
      while (j >= 0 && /['"\s]/.test(line[j])) j--;
      // If the char right before is the assignment sep (`:` or `=`), it's bare
      // If we see `:` followed by the name with a plugin-prefix-like word, skip
      // Practical: check whether `pluginword:<bare>` appears in surrounding text
      const fullValueWindow = line.slice(Math.max(0, startIdx - 40), startIdx + bare.length + 10);
      if (/[\w-]+:\s*['"]?$/.test(line.slice(0, startIdx))) {
        // The match position is preceded by `pluginword:` → FQN, skip
        continue;
      }
      // Also ensure we don't double-report a key-named "subagent_type" elsewhere
      if (!names.has(bare)) continue;
      hits.push({ line: i + 1, lineText: line.trim(), bare });
    }
  }
  return hits;
}

function suggestFqn(bare, names) {
  const plugins = names.get(bare) || [];
  return plugins.map((p) => `${p}:${bare}`);
}

function main() {
  if (process.env.CLAUDE_BARE_SUBAGENT_GREP_DISABLE === '1') process.exit(0);
  try {
    statSync(BYPASS_MARKER);
    process.exit(0);
  } catch { /* */ }

  const collidingMap = loadCollidingNames();
  if (!collidingMap) {
    // Soft-fail: allowlist absent → advisory cannot be authored
    process.stderr.write(
      `W342-X2 P1.5 bare-subagent-grep: allowlist colliding_bare_names not loadable from ${ALLOWLIST_PATH}; advisory skipped.\n`
    );
    process.exit(0);
  }

  const staged = listStagedFiles();
  if (staged.length === 0) process.exit(0);

  const names = Array.from(collidingMap.keys());
  const rx = buildScanRegex(names);
  const namesSet = new Set(names);

  const violations = [];
  for (const f of staged) {
    if (isBinaryByExtension(f)) continue;
    // Skip files that obviously are not source: lockfiles, large generated
    if (/(^|\/)(package-lock\.json|yarn\.lock|pnpm-lock\.yaml|node_modules\/)/.test(f)) continue;
    // Skip the allowlist itself (the colliding-bare-names list contains these literals)
    if (/subagent-type-allowlist\.json$/.test(f)) continue;
    const hits = scanFile(f, rx, namesSet);
    for (const h of hits) {
      violations.push({ file: f, ...h });
    }
  }

  if (violations.length === 0) process.exit(0);

  const lines = [
    'W342-X2 P1.5 bare-name CI grep BLOCK: 1+ colliding bare subagent_type used as dispatched value',
    'Per W340 F4 + W333-D5 + W336-FQN-SUBAGENT-TYPE.md: bare names collide across plugins.',
    '',
  ];
  for (const v of violations) {
    const fqn = suggestFqn(v.bare, collidingMap);
    lines.push(`  ${v.file}:${v.line} — bare "${v.bare}" used`);
    lines.push(`    line: ${v.lineText.slice(0, 200)}`);
    lines.push(`    Use FQN form: ${fqn.join(' | ')}`);
  }
  lines.push('');
  lines.push('Escape hatch: CLAUDE_BARE_SUBAGENT_GREP_DISABLE=1 OR `touch .claude/state/bare-subagent-grep-bypass.marker`');
  process.stderr.write(`${lines.join('\n')}\n`);
  process.exit(2);
}

try { main(); } catch (e) {
  process.stderr.write(`W342-X2 P1.5 bare-subagent-grep soft-fail: ${e?.message || e}\n`);
  process.exit(0);
}
