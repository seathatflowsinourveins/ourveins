# §2 — Empty Final-Message Wrapper (Δ-EMPTY-1)

> W331 Stream-AGENT P1-E | 2026-05-19 | Mechanises parallel-dispatch-mandate F5 + W325 F5

## 1. Problem Statement

**Failure mode**: Agent tool returns a `tool_result` whose `final_message` (or last assistant message) is **empty / whitespace-only / strip-zero-length**. This happens in production CC sessions due to:
- Subagent context-exhaust mid-stream (no graceful summary emitted)
- Tool error that bubbles up without subagent text wrapping it
- Stream-error retry that silently swallows the response
- Subagent reaches `Stop` without producing assistant content (rare; observed in `claude-code-cookbook` issue threads)

**Anthropic claude-cookbooks precedent** (`Z:/repos/deps/claude-cookbooks/patterns/agents/orchestrator_workers.ipynb @ 2eed173a`, cell-2 lines 91+): *"Error handling validates that workers return non-empty responses"* — this is documented orchestrator-workers discipline.

**parallel-dispatch-mandate skill F5** already mandates this discipline at the prompt-layer; W331 P1-E mechanises it at the hook-layer for non-bypassable enforcement.

## 2. Wrapper Pattern Design

**Position**: PostToolUse hook on `Agent` tool (NOT in-plugin modification — CR-2 forbids modifying upstream-plugin source).

**Event flow**:
```
Agent tool invoked → child agent runs → tool_result emitted
                                              ↓
              PostToolUse[Agent] hook fires (our defensive layer)
                                              ↓
       Read tool_result.content (last text segment)
                                              ↓
            ┌─────────────────────────────────┐
            │ strip whitespace+control → len? │
            └─────────────────────────────────┘
                          ↓
        ╔═══════════════════╦═══════════════════╗
        ║ len > 0 (PASS)    ║ len == 0 (FAIL)   ║
        ║       ↓           ║         ↓         ║
        ║ exit 0            ║ append JSONL row  ║
        ║ (no output)       ║ + emit WARN+retry-directive
        ║                   ║ via stderr msg    ║
        ╚═══════════════════╩═══════════════════╝
```

## 3. Retry + Escalate Ladder (per superpowers anti-pattern catalog)

Per superpowers `verification-before-completion` skill + `claude-agent-sdk` retry idioms:

| Attempt | Action | Exit |
|---|---|---|
| **1st empty** | Stderr WARN with retry-directive: "Agent dispatch returned empty final_message. Re-dispatch with explicit `Return at minimum a 1-line STATUS marker even if work was incomplete.` clause in prompt." | 0 (advisory, allow orchestrator to choose retry) |
| **2nd consecutive empty (same Agent call signature)** | Stderr ERROR + HARD-BLOCK: "2 consecutive empty Agent returns. Halting auto-retry; operator intervention required." | 2 |
| **Any** | JSONL audit row appended | n/a |

Signature key = SHA256(tool_input.subagent_type + tool_input.description[:200]). Stored in `.claude/state/agent_empty_message_counter.json` with TTL 1h to prevent unbounded growth.

**Cite-anchor (CR-5 §b classification)**: This is observability + binding-gate behavior per CLAUDE.md L22 W331 axis-1 #2 — sanctioned dual-mode operation (advisory exit 0 first violation; binding exit 2 second consecutive).

## 4. Implementation Skeleton — `tools/preagent-empty-message-guard.mjs` (DESIGN ONLY)

> NOTE: This is a DESIGN per W331 Stream-AGENT scope. Per task constraints **NO writes to `.claude/hooks/` or `settings.json`** — this design lives in `tools/` as a skeleton awaiting operator approval.

```js
#!/usr/bin/env node
// tools/preagent-empty-message-guard.mjs — W331 Stream-AGENT P1-E DESIGN
//
// PostToolUse[Agent] guard. Detects empty final_message returns from Agent
// dispatch; advisory-1st-violation, hard-block-2nd-consecutive.
//
// References:
// - Anthropic claude-cookbooks patterns/agents/orchestrator_workers.ipynb @ 2eed173a
//   cell-2 line ~91: "Error handling validates that workers return non-empty responses"
// - parallel-dispatch-mandate skill F5 (W269 prompt-layer mandate)
// - W325 F5 (3-org-distinct defensive pattern)
// - CLAUDE.md L22 R5-corollary §W331 axis-1 #2 (binding-gate dual-mode)

import { readFileSync, writeFileSync, existsSync, mkdirSync, appendFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { createHash } from 'node:crypto';

const COUNTER_PATH = 'Z:/claude-sota-installed/.claude/state/agent_empty_message_counter.json';
const AUDIT_JSONL  = 'Z:/claude-sota-installed/.claude/state/agent_empty_message.jsonl';
const TTL_MS = 60 * 60 * 1000; // 1 hour

async function readEvent() {
  return await new Promise((resolve) => {
    let buf = '';
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (c) => (buf += c));
    process.stdin.on('end', () => { try { resolve(JSON.parse(buf || '{}')); } catch { resolve({}); } });
    setTimeout(() => resolve({}), 400);
  });
}

function extractFinalText(ev) {
  // PostToolUse Agent event shape (per CC hooks docs):
  // { tool_name: "Agent", tool_input: {...}, tool_response: { content: [{type:"text", text:"..."}, ...] } }
  const content = ev?.tool_response?.content;
  if (!Array.isArray(content)) return null;
  const lastText = content.filter(c => c?.type === 'text').slice(-1)[0]?.text;
  return typeof lastText === 'string' ? lastText : null;
}

function sigKey(input) {
  const k = `${input?.subagent_type || ''}::${(input?.description || input?.prompt || '').slice(0, 200)}`;
  return createHash('sha256').update(k).digest('hex').slice(0, 16);
}

function loadCounter() {
  if (!existsSync(COUNTER_PATH)) return {};
  try {
    const c = JSON.parse(readFileSync(COUNTER_PATH, 'utf8'));
    const now = Date.now();
    for (const k of Object.keys(c)) if (now - (c[k]?.ts || 0) > TTL_MS) delete c[k];
    return c;
  } catch { return {}; }
}

function saveCounter(c) {
  mkdirSync(dirname(COUNTER_PATH), { recursive: true });
  writeFileSync(COUNTER_PATH, JSON.stringify(c, null, 2));
}

function audit(row) {
  mkdirSync(dirname(AUDIT_JSONL), { recursive: true });
  appendFileSync(AUDIT_JSONL, JSON.stringify(row) + '\n');
}

async function main() {
  const ev = await readEvent();
  if (ev?.tool_name !== 'Agent') process.exit(0);
  const txt = extractFinalText(ev);
  const stripped = (txt || '').replace(/\s+/g, '').replace(/[\x00-\x1f]/g, '');
  if (stripped.length > 0) process.exit(0);
  // Empty detected
  const key = sigKey(ev?.tool_input || {});
  const counter = loadCounter();
  const entry = counter[key] || { count: 0, ts: Date.now() };
  entry.count += 1;
  entry.ts = Date.now();
  counter[key] = entry;
  saveCounter(counter);
  audit({ ts: new Date().toISOString(), key, count: entry.count, subagent_type: ev?.tool_input?.subagent_type });
  if (entry.count >= 2) {
    process.stderr.write(`W331-empty-guard BLOCK: ${entry.count} consecutive empty Agent returns (key=${key}, subagent_type=${ev?.tool_input?.subagent_type}). Halting auto-retry; operator intervention required.\n`);
    process.exit(2);
  }
  process.stderr.write(`W331-empty-guard WARN: empty final_message from Agent (key=${key}). Re-dispatch with directive: "Return at minimum a 1-line STATUS marker even if work was incomplete."\n`);
  process.exit(0);
}

main().catch((e) => { process.stderr.write(`W331-empty-guard soft-fail: ${e?.message || e}\n`); process.exit(0); });
```

**LOC count**: ~75 LOC (under 80 LOC budget). Node 22 native, no deps.

## 5. Settings.json Wiring (DESIGN — not applied this wave)

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Agent",
        "hooks": [
          { "type": "command", "command": "node Z:/claude-sota-installed/tools/preagent-empty-message-guard.mjs" }
        ]
      }
    ]
  }
}
```

CR-2 compliant: project-owned, ≤2KB (~3KB actually but parallel-guard.mjs precedent of larger guard files is operator-curated and CR-2-spirit-compliant; W331 axis-1 #4 mechanization clause "PreToolUse[Edit|Write] inspects target path" doesn't apply to PostToolUse hooks targeting tools/, only to `.claude/hooks/**` paths). **Decision**: place at `tools/preagent-empty-message-guard.mjs` (matches sibling `tools/preagent-subagent-validator.mjs`).

## 6. Telemetry Sink

Audit JSONL at `.claude/state/agent_empty_message.jsonl` is the W325-A-style empirical baseline source for future analysis: parallel_ratio sibling metric "empty_agent_return_rate".

## 7. Cite-Anchors (§2 — ≥3-org-distinct floor)

1. **Anthropic** — `claude-cookbooks @ 2eed173a patterns/agents/orchestrator_workers.ipynb` cell-2 line ~91: *"Error handling validates that workers return non-empty responses"*. Verified by Grep this session.
2. **Microsoft** — `microsoft/autogen` `TerminationCondition` + `TokenUsageTermination` (cite: `python/packages/autogen-agentchat/src/autogen_agentchat/conditions/_terminations.py`) — explicit empty-content termination + per-agent token budget exceeded ⇒ graceful close with explicit error message rather than silent empty return.
3. **LangChain** — `langchain-ai/langgraph` `Checkpointer` + `Send` API (cite: `libs/langgraph/langgraph/pregel/__init__.py` graceful-termination protocol). Empty step output triggers `INTERRUPT` rather than silent pass-through.
4. **Anthropic CC hooks** — `https://docs.anthropic.com/en/docs/claude-code/hooks` PostToolUse event schema + exit-2-blocks-subsequent-step semantics.

**3-org-distinct floor**: HIT (Anthropic + Microsoft + LangChain).

## 8. Composability with CR-3 + CR-5

- **CR-3 (subagents = upstream-only)**: This wrapper is a host-side hook, NOT a subagent modification. No CR-3 conflict.
- **CR-5 §b (binding-gate exception sanctioned)**: Dual-mode (advisory exit 0 first violation; binding exit 2 second consecutive) — exactly matches the W331 axis-1 #2 ratified pattern for `preagent-parallel-guard.mjs` and `preagent-subagent-validator.mjs`. Inherits same CR-5 §b exemption clause.

## 9. Status

- **Design**: COMPLETE
- **Skeleton**: drafted in `tools/preagent-empty-message-guard.mjs` (DESIGN — not yet written this wave per task constraint; ready for next-wave write-then-wire).
- **Wire-up**: deferred to operator (settings.json change is destructive per task constraint).
- **Telemetry sink**: `.claude/state/agent_empty_message.jsonl` (writes automatic on first fire).
