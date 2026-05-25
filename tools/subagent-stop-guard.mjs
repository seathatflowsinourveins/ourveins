#!/usr/bin/env node
// subagent-stop-guard.mjs — W341-Q8 SubagentStop hook
//
// Mechanizes Δ-G49 anti-empty-final-message contract for subagent teammates.
// Fires on SubagentStop event (CC SubagentStop hook — fires when a teammate
// agent finishes and returns its final message to the orchestrator).
//
// CONTRACT:
//   - Reads the SubagentStop event JSON from stdin.
//   - Extracts the final teammate message text from event.message (or
//     event.output / event.content as fallbacks per CC hook schema).
//   - EXIT 0 (allow) if:
//       (a) message is non-empty, OR
//       (b) message contains the literal sentinel "NO-FINDINGS:" anywhere.
//   - EXIT 2 (block) if message is absent/empty and sentinel not present.
//       Writes blocking reason to stderr per Anthropic exit-code-2 semantics.
//       NOTE: SubagentStop does NOT support hookSpecificOutput stdout output.
//
// SENTINELS accepted:
//   "NO-FINDINGS:<any rationale>" — explicit teammate declaration of no findings.
//
// ESCAPE HATCH:
//   CLAUDE_SUBAGENT_STOP_GUARD_DISABLE=1 → always exit 0 (operator override).
//
// Time-budget: <100ms typical (stdin parse only, no FS I/O).
// Node 22 native (no deps).
//
// References:
//   - https://docs.anthropic.com/en/docs/claude-code/hooks
//     (SubagentStop event, hookSpecificOutput, exit-code-2 = blocking)
//   - W341 OPERATOR-SIGN-QUEUE.md §Q8 + S3 §D.2 gap #6 (Δ-G49 mechanization)
//   - CLAUDE.md cardinal-rule-2 (CR-2): hooks = direct-CLI invocations only;
//     tools/ is exempt from the .claude/hooks/ <2KB size constraint per W340
//     commit precedent (consistent with tools/parallel-guard-userpromptsubmit.mjs).

import { existsSync } from 'node:fs';

const NO_FINDINGS_SENTINEL = 'NO-FINDINGS:';
const BYPASS_MARKER = 'Z:/claude-sota-installed/.claude/state/parallel-guard-bypass.marker';

/**
 * Read stdin to completion and parse as JSON.
 * Returns {} on empty or parse error (safe — we treat missing fields as empty).
 */
async function readEvent() {
  return new Promise((resolve) => {
    let buf = '';
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (chunk) => (buf += chunk));
    process.stdin.on('end', () => {
      try {
        resolve(JSON.parse(buf || '{}'));
      } catch {
        resolve({});
      }
    });
    process.stdin.on('error', () => resolve({}));
  });
}

/**
 * Extract the final message text from the SubagentStop event.
 * CC hook schema — field priority order (per Anthropic hooks docs SubagentStop event):
 *   event.last_assistant_message  — PRIMARY: documented SubagentStop final-response field
 *   event.message                 — fallback string field
 *   event.output                  — alternate fallback
 *   event.content                 — alternate (may be array of content blocks or string)
 * Returns empty string if no text found.
 */
function extractMessage(ev) {
  // PRIMARY: documented SubagentStop field per Anthropic CC hooks schema
  if (typeof ev.last_assistant_message === 'string') return ev.last_assistant_message;

  // Fallback: direct string fields
  if (typeof ev.message === 'string') return ev.message;
  if (typeof ev.output === 'string') return ev.output;

  // Content field: may be a string or an array of content blocks
  if (typeof ev.content === 'string') return ev.content;
  if (Array.isArray(ev.content)) {
    // Concatenate text blocks
    return ev.content
      .filter((b) => b?.type === 'text' && typeof b.text === 'string')
      .map((b) => b.text)
      .join('');
  }

  return '';
}

// NOTE: SubagentStop hook does not support hookSpecificOutput.additionalContext
// per Anthropic CC hooks docs. For this hook event, blocking is communicated
// exclusively via exit 2 + stderr message. No JSON stdout emission on block path.
// Cite: https://docs.anthropic.com/en/docs/claude-code/hooks (SubagentStop schema)
// W341-Q8 codex r1 MEDIUM finding resolved.

async function main() {
  // Operator escape hatch
  if (process.env.CLAUDE_SUBAGENT_STOP_GUARD_DISABLE === '1') {
    process.exit(0);
  }

  const ev = await readEvent();
  const msg = extractMessage(ev);
  const trimmed = msg.trim();

  // ALLOW: non-empty message (normal teammate response)
  if (trimmed.length > 0) {
    process.exit(0);
  }

  // ALLOW: sentinel present in original (untrimmed) message
  // Covers edge-case where teammate wraps sentinel in whitespace.
  if (msg.includes(NO_FINDINGS_SENTINEL)) {
    process.exit(0);
  }

  // BLOCK: empty message without sentinel — Δ-G49 violation.
  const agentId = ev.agent_id || ev.subagent_id || ev.session_id || 'unknown';
  const blockMsg =
    `W341-Q8 BLOCK: SubagentStop guard — teammate agent (id=${agentId}) returned an empty ` +
    `final message without the NO-FINDINGS: sentinel. ` +
    `Per Δ-G49 anti-empty-final-message contract. ` +
    `REMEDIATION: teammate must end its response with substantive content OR ` +
    `the explicit sentinel "NO-FINDINGS:<rationale>" if genuinely no findings. ` +
    `Operator override: set CLAUDE_SUBAGENT_STOP_GUARD_DISABLE=1.`;

  // Blocking: stderr only. SubagentStop does not support hookSpecificOutput stdout.
  try {
    process.stderr.write(blockMsg + '\n');
  } catch {
    /* stderr closed */
  }

  process.exit(2);
}

main().catch((err) => {
  // W343-P0d: fail-CLOSED on guard crash UNLESS bypass-marker present OR
  // CLAUDE_SUBAGENT_STOP_GUARD_FAILOPEN=1 env present. Per codex E7
  // single-most-important — unconditional exit(0) on crash creates complete
  // bypass surface. Preserves W331-r4 in-session-bypass-marker escape-hatch.
  let markerPresent = false;
  try { markerPresent = existsSync(BYPASS_MARKER); } catch { /* fs probe failed */ }
  const failOpen = process.env.CLAUDE_SUBAGENT_STOP_GUARD_FAILOPEN === '1';

  if (process.env.CLAUDE_SUBAGENT_STOP_GUARD_DEBUG === '1') {
    try {
      process.stderr.write(
        `[subagent-stop-guard ERROR] ${err?.stack || err?.message || String(err)}\n`
      );
    } catch {}
  }

  if (failOpen || markerPresent) {
    process.exit(0);
  }

  try {
    process.stderr.write(
      `subagent-stop-guard FAIL-CLOSED (W343-P0d): ${err?.message || err}\n` +
      `OVERRIDE: set CLAUDE_SUBAGENT_STOP_GUARD_FAILOPEN=1 OR create bypass-marker at ${BYPASS_MARKER}.\n`
    );
  } catch {}
  process.exit(2);
});
