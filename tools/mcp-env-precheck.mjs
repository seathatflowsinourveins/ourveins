#!/usr/bin/env node
// tools/mcp-env-precheck.mjs
// W372 F14 — SessionStart hook that scans .mcp.json for ${VAR} env-interpolation references
// and WARNS (does not block) on unset vars. Audit-trail row written for forensics.
//
// Cite: W370 F14 carry-forward closure + .mcp.json ${LANGFUSE_*}/${TAVILY_*}/${EXA_*}/${HF_TOKEN}
// interpolation contract per W268 codex T3 P0-security + W324 ship-gate envblock pattern.
// Cardinal-rule-2-clean: this is under tools/ (not .claude/hooks/), so CR-2 ≤2KB doesn't apply.
// Cardinal-rule-5-clean: exit 0 always — advisory only, never blocks.

import { readFileSync, mkdirSync, appendFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');
const MCP_JSON_PATH = join(REPO_ROOT, '.mcp.json');
const STATE_DIR = join(REPO_ROOT, '.claude', 'state', 'mcp-env-precheck');
const LOG_FILE = join(STATE_DIR, new Date().toISOString().slice(0, 10) + '.jsonl');

// Match ${VAR_NAME} per Anthropic .mcp.json env-interpolation contract.
// Anchored at $\{ to avoid PowerShell-style $varName false positives.
const VAR_REGEX = /\$\{([A-Z_][A-Z0-9_]*)\}/g;

function main() {
  let content;
  try {
    content = readFileSync(MCP_JSON_PATH, 'utf8');
  } catch (err) {
    // .mcp.json missing or unreadable — advisory only, exit 0
    console.error(`mcp-env-precheck: .mcp.json read failed: ${err.message}`);
    return 0;
  }

  const refs = new Set();
  for (const match of content.matchAll(VAR_REGEX)) {
    refs.add(match[1]);
  }

  const unset = [];
  for (const name of refs) {
    const val = process.env[name];
    if (val === undefined || val === null || val.trim() === '') {
      unset.push(name);
    }
  }

  // Audit-trail row (best-effort)
  try {
    mkdirSync(STATE_DIR, { recursive: true });
    const row = {
      ts: new Date().toISOString(),
      session: process.env.CLAUDE_SESSION_ID || 'unknown',
      total_refs: refs.size,
      unset_count: unset.length,
      unset_vars: unset,
    };
    appendFileSync(LOG_FILE, JSON.stringify(row) + '\n');
  } catch (err) {
    // Audit-trail failure is not fatal
    console.error(`mcp-env-precheck: audit-log write failed: ${err.message}`);
  }

  if (unset.length > 0) {
    console.error(
      `mcp-env-precheck WARN: ${unset.length} env var(s) referenced in .mcp.json are unset: ${unset.join(', ')}`
    );
    console.error('Set them in CLAUDE.local.md ENV block (gitignored) before MCP servers spawn.');
  }

  return 0; // Advisory only — never block
}

process.exit(main());
