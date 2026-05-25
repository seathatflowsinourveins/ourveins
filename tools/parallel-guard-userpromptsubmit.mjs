#!/usr/bin/env node
// parallel-guard-userpromptsubmit.mjs — W331-r3 P0.1 UserPromptSubmit
// message-level detector. Closes codex r2 PRIMARY+SWAP CONVERGENT HIGH gap #1.
//
// Reads UserPromptSubmit event from stdin. Parses operator prompt text for
// multi-stream wording. Updates per-session state file:
//   - resets turnFireCount + turnFireLastTs to 0 (NEW TURN)
//   - sets multiStreamIntent boolean based on regex match
//   - sets intentSetTs to now
//
// preagent-parallel-guard.mjs (PreToolUse[Agent]) consults the intent flag —
// per-message-level intent gates enforcement, eliminating cross-turn
// false-coalescence under rapid serial dispatches.
//
// CR-5 classification: observability instrumentation (exit 0 only — never
// blocks user prompts). Cite-anchor: REMEDIATION-PLAN-V2:25-29 + codex r2
// PRIMARY (a05132584) + SWAP (a0d58937) CONVERGENT NEEDS-REVISION.

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
// W341 P0.1 round-3+4 architectural fix (codex round-3+4 REVISE) — share
// STRONG/WEAK_PAIR detector AND state-file path with PreToolUse[Agent].
// Old standalone regex matched stale audit/review/sweep/investigate (r3 gap);
// old counterPath wrote to a DIFFERENT file than PreToolUse read (r4 gap) so
// `multiStreamIntent` was dead-code in production. Both now fixed.
import { counterPath, detectMultiStream } from './parallel-guard-detector.mjs';

// W341 round-4: counterPath now imported from parallel-guard-detector.mjs
// (shared with PreToolUse[Agent] hook). Old W331-r7 path
// `.claude/state/parallel-guard-session-<sid>.json` was a SILENT-FALLBACK bug:
// preagent-parallel-guard.mjs:202 read `.parallel-guard-counter-<sid>.json` —
// different file. UserPromptSubmit work was dead-code in production. Closed.

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
    setTimeout(() => resolve({}), 200);
  });
}

async function readState(path) {
  try {
    const txt = await readFile(path, 'utf8');
    const obj = JSON.parse(txt);
    if (typeof obj?.count === 'number') {
      return {
        count: obj.count,
        lastViolationTs: typeof obj.lastViolationTs === 'number' ? obj.lastViolationTs : 0,
        turnFireCount: 0, // RESET on every new user prompt
        turnFireLastTs: 0,
        multiStreamIntent: false, // updated below
        intentSetTs: 0,
      };
    }
  } catch {
    /* missing or corrupt — treat as fresh */
  }
  return {
    count: 0,
    lastViolationTs: 0,
    turnFireCount: 0,
    turnFireLastTs: 0,
    multiStreamIntent: false,
    intentSetTs: 0,
  };
}

async function writeState(path, state) {
  try {
    const idx = Math.max(path.lastIndexOf('/'), path.lastIndexOf('\\'));
    if (idx > 0) {
      try {
        await mkdir(path.slice(0, idx), { recursive: true });
      } catch {
        /* */
      }
    }
    await writeFile(path, JSON.stringify(state), 'utf8');
  } catch {
    /* best-effort; don't break the hook */
  }
}

async function main() {
  if (process.env.CLAUDE_PARALLEL_GUARD_DISABLE === '1') process.exit(0);

  const ev = await readEvent();
  const sessionId = ev?.session_id || process.env.CLAUDE_SESSION_ID;
  const prompt = String(ev?.prompt || '');

  const intent = detectMultiStream(prompt);

  const cPath = counterPath(sessionId);
  const state = await readState(cPath);

  // Reset per-turn state on every new user prompt (message-level boundary)
  state.turnFireCount = 0;
  state.turnFireLastTs = 0;
  state.multiStreamIntent = intent;
  state.intentSetTs = Date.now();

  await writeState(cPath, state);
  process.exit(0);
}

main().catch(() => process.exit(0));
