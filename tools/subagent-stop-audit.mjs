#!/usr/bin/env node
// W344-P1 SubagentStop audit-shim — append-only JSONL per Δ-G49 7-day false-positive measurement
// Sister to subagent-stop-guard.mjs (W341-Q8 BLOCK contract); this one observes only, never blocks.
// CR-2 size cap: ≤2KB. Fail-silent (exit 0) on any error.
// Env override: SUBAGENT_STOP_AUDIT_DIR (default .claude/state/subagent-stop-audit)
// Cite: https://docs.anthropic.com/en/docs/claude-code/hooks SubagentStop schema.
import { appendFileSync, mkdirSync } from 'node:fs';
import { resolve, join, sep } from 'node:path';

const ROOT = process.env.AUDIT_ROOT || resolve(process.cwd());
const DEFAULT_DIR = join(ROOT, '.claude', 'state', 'subagent-stop-audit');
const RAW = process.env.SUBAGENT_STOP_AUDIT_DIR;
// Codex r1 fix: env-override resolved + rejected if escapes ROOT (no path-injection).
const DIR = (() => {
  if (!RAW) return DEFAULT_DIR;
  const abs = resolve(ROOT, RAW);
  return (abs === ROOT || abs.startsWith(ROOT + sep)) ? abs : DEFAULT_DIR;
})();

async function main() {
  let buf = '';
  process.stdin.setEncoding('utf8');
  for await (const c of process.stdin) buf += c;
  const ev = (() => { try { return JSON.parse(buf || '{}'); } catch { return {}; } })();
  const msg = typeof ev.last_assistant_message === 'string' ? ev.last_assistant_message : '';
  const rec = {
    ts: new Date().toISOString(),
    session_id: ev.session_id || null,
    transcript_path: ev.transcript_path || null,
    hook_event_name: ev.hook_event_name || null,
    agent_id: ev.agent_id || null,
    agent_type: ev.agent_type || ev.subagent_type || null,
    agent_transcript_path: ev.agent_transcript_path || null,
    stop_hook_active: !!ev.stop_hook_active,
    msg_len: msg.length,
    msg_empty: msg.trim().length === 0,
    has_no_findings_sentinel: msg.includes('NO-FINDINGS:'),
  };
  const day = rec.ts.slice(0, 10);
  mkdirSync(DIR, { recursive: true });
  appendFileSync(join(DIR, `${day}.jsonl`), JSON.stringify(rec) + '\n');
}

main().catch(() => {}).finally(() => process.exit(0));
