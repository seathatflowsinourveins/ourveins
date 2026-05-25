# §3 — Coordination Hooks Design (agent-teams plugin gap)

> W331 Stream-AGENT P1-E | 2026-05-19 | Forward-as-PR to wshobson/agents

## 1. Current Gap

**Confirmed via inspection** (this session, 2026-05-19):
- agent-teams plugin path: `Z:/claude-sota-installed/.claude/plugins/cache/claude-code-workflows/agent-teams/1.0.2/`
- Contents: `README.md`, `agents/`, `commands/`, `skills/`, `.claude-plugin/plugin.json`
- **NO `hooks.json` file present**
- **NO `hooks/` directory present**

W330 Stream D #1 #2 #3 verdict confirmed: zero defensive coordination hooks at upstream `wshobson/agents @ ece811f2`.

## 2. Required Hook Events (per Anthropic CC sub-agents docs)

Per `https://docs.anthropic.com/en/docs/claude-code/sub-agents` + `https://docs.anthropic.com/en/docs/claude-code/hooks`, the runtime exposes 6 hook events relevant to agent-teams coordination:

| Event | Fires when | Coordination Use |
|---|---|---|
| `UserPromptSubmit` | User-input received pre-orchestrator | Multi-stream-pending flag injection |
| `PreToolUse[Agent]` | About to dispatch subagent | Allowlist validation (Δ-DPA-5) + file-lock check |
| `PostToolUse[Agent]` | Subagent returned | Empty-message check + state aggregation |
| `PreToolUse[Edit\|Write]` | About to edit/write file | Per-file lock-acquire |
| `PostToolUse[Edit\|Write]` | After edit/write | Per-file lock-release |
| `SubagentStop` | Subagent finished (independent of tool result) | Telemetry feedback loop closure |

## 3. Proposed `hooks.json` for upstream agent-teams plugin

```json
{
  "hooks": {
    "UserPromptSubmit": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "node ${CLAUDE_PLUGIN_ROOT}/hooks/multi-stream-detector.mjs"
          }
        ]
      }
    ],
    "PreToolUse": [
      {
        "matcher": "Agent",
        "hooks": [
          {
            "type": "command",
            "command": "node ${CLAUDE_PLUGIN_ROOT}/hooks/team-state-init.mjs"
          }
        ]
      },
      {
        "matcher": "Edit|Write|NotebookEdit",
        "hooks": [
          {
            "type": "command",
            "command": "node ${CLAUDE_PLUGIN_ROOT}/hooks/file-lock-acquire.mjs"
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Agent",
        "hooks": [
          {
            "type": "command",
            "command": "node ${CLAUDE_PLUGIN_ROOT}/hooks/team-state-aggregate.mjs"
          }
        ]
      },
      {
        "matcher": "Edit|Write|NotebookEdit",
        "hooks": [
          {
            "type": "command",
            "command": "node ${CLAUDE_PLUGIN_ROOT}/hooks/file-lock-release.mjs"
          }
        ]
      }
    ],
    "SubagentStop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "node ${CLAUDE_PLUGIN_ROOT}/hooks/team-telemetry-close.mjs"
          }
        ]
      }
    ]
  }
}
```

## 4. Hook Specifications

### 4.1 `multi-stream-detector.mjs` (UserPromptSubmit)

**Purpose**: Detect 2+ workstream language in user prompt; write a stream-flag file that subsequent PreToolUse hooks read.

**Detection patterns** (from `parallel-dispatch-mandate` skill F4):
- Regex: `(stream|workstream|axis|track|parallel|fan-out)\s*[A-Z0-9]`
- 2+ enumerated tasks via `^[-*]\s` bullets ≥2 consecutive lines
- Operator phrasing: "in parallel", "simultaneously", "concurrently", "investigate X and Y"

**Output**: writes `${CLAUDE_PROJECT_DIR}/.claude/state/team-state/multi_stream_pending.json` with `{detected: bool, ts: ISO8601, evidence: string[]}`. Read by `team-state-init.mjs`.

### 4.2 `team-state-init.mjs` (PreToolUse[Agent])

**Purpose**: On Agent dispatch in multi-stream context, verify subagent_type via allowlist (Δ-DPA-5 reuse) + record dispatch in team-state file.

**Behaviour**:
- Read `multi_stream_pending.json`; if false, exit 0 (single-stream pass-through)
- Read `tool_input.subagent_type`; validate via shared allowlist
- Append to `.claude/state/team-state/active_dispatches.jsonl` with timestamp + signature
- Exit 0 (advisory) — actual hard-block delegated to existing `preagent-subagent-validator.mjs`

### 4.3 `team-state-aggregate.mjs` (PostToolUse[Agent])

**Purpose**: On Agent return, mark dispatch as complete; aggregate state across team members.

**Behaviour**:
- Read `tool_response`, extract status marker if present
- Update `active_dispatches.jsonl` with completion-status
- If all team-members complete + status-markers parsed: write `.claude/state/team-state/team_summary.json` for next orchestrator turn to read

### 4.4 `file-lock-acquire.mjs` + `file-lock-release.mjs` (PreToolUse[Edit|Write|NotebookEdit] / PostToolUse[same])

**Purpose**: Prevent parallel-edit corruption when multiple Agent dispatches edit the same file.

**Lock model**:
- Lock dir: `.claude/state/locks/`
- Per-file lock filename: `${sha256(absolute_file_path).slice(0,12)}.lock`
- Lock contents: `{owner_pid: int, agent_dispatch_id: string, ts: ISO8601, file: string}`
- Acquire: if lock file exists AND owner_pid alive AND ts<30s old → exit 2 (BLOCK with diagnostic + suggest re-dispatch after lock release); else write own lock + exit 0
- Release: if lock file exists AND owner == current → delete; else log mismatch + exit 0
- Stale-lock GC: ts >30s OR owner_pid dead → treat as released (acquire proceeds)

**CR-5 §b classification**: This is a sanctioned BLOCK exception per CLAUDE.md L22 W331 axis-1 #2 — parallel-edit corruption is a data-integrity hazard equivalent to silent-fallback FM.

### 4.5 `team-telemetry-close.mjs` (SubagentStop)

**Purpose**: Append per-subagent-completion telemetry row to `.claude/state/team-state/telemetry.jsonl`. Powers future W325-A-style parallel_ratio + empty_message_rate measurement.

**Row schema**:
```json
{
  "ts": "2026-05-19T...",
  "subagent_type": "...",
  "duration_ms": 1234,
  "had_status_marker": true,
  "tokens_in": 5000,
  "tokens_out": 1200,
  "stop_reason": "end_turn|max_tokens|stop_sequence|tool_use"
}
```

## 5. State Directory Layout

```
.claude/state/team-state/
├── multi_stream_pending.json        (single-shot flag, mtime <5min)
├── active_dispatches.jsonl           (per-Agent-dispatch lifecycle)
├── team_summary.json                 (aggregated post-all-completion)
├── telemetry.jsonl                   (SubagentStop append-only)
└── locks/
    ├── a1b2c3d4e5f6.lock              (per-file lock)
    └── ...
```

## 6. Forwarding as Upstream PR (cooperative-improvement)

**Target**: `wshobson/agents` repo (the publishing upstream for agent-teams plugin).

**PR shape** (cite-anchored):
1. **Title**: "Add defensive coordination hooks (file-lock + empty-message + multi-stream telemetry)"
2. **Body**: Reference Anthropic claude-cookbooks orchestrator_workers.ipynb @ 2eed173a (non-empty validation precedent); reference our W331 P1-E synthesis docs; reference the FM class TASK-CLOSE-DRIFT (L329-1) avoidance pattern.
3. **Files added**:
   - `hooks.json` (the manifest above)
   - `hooks/multi-stream-detector.mjs`
   - `hooks/team-state-init.mjs`
   - `hooks/team-state-aggregate.mjs`
   - `hooks/file-lock-acquire.mjs`
   - `hooks/file-lock-release.mjs`
   - `hooks/team-telemetry-close.mjs`
4. **Tests**: bats-based hook event-fixture tests per `shell-scripting:bats-testing-patterns` skill.

**Per CR-1 W331 axis-1 #3** trust-tuple, PR signing via Sigstore (operator-side).

## 7. Composability Notes

- **Composes with `preagent-parallel-guard.mjs`**: existing parallel-guard fires at `PreToolUse` chain BEFORE plugin's `team-state-init.mjs` (matchers fire ALL in order per docs). Both can co-exist; parallel-guard owns 2nd-violation hard-block, team-state-init owns telemetry.
- **Composes with `preagent-subagent-validator.mjs`**: validator owns subagent_type hard-block; team-state-init wraps it as advisory record-keeping (no duplicate enforcement).
- **Composes with proposed `preagent-empty-message-guard.mjs` (§2)**: empty-guard fires at PostToolUse; team-state-aggregate fires AFTER it (same chain) and reads its audit trail.

## 8. Cite-Anchors (§3)

- Anthropic CC sub-agents docs: `https://docs.anthropic.com/en/docs/claude-code/sub-agents` (subagent lifecycle + SubagentStop event)
- Anthropic CC hooks docs: `https://docs.anthropic.com/en/docs/claude-code/hooks` (6-event schema + matcher syntax + `${CLAUDE_PLUGIN_ROOT}` interpolation per CR-2)
- wshobson/agents @ ece811f23310a37ceb43496dbac0e244fe6845b6 (W330 Stream D verified zero-hooks baseline)
- W325-A telemetry-baseline measurement framework (parallel_ratio sibling metric)
- LangChain langgraph `Send` API as semantic parallel-dispatch primitive
- `parallel-dispatch-mandate` skill F4 (multi-stream detection patterns)

## 9. Status

- **Design**: COMPLETE
- **In-runtime application**: deferred — task scope forbids settings.json writes; plugin-hosted hooks.json change is upstream PR territory.
- **Forward-as-PR**: queued for W332+ as cooperative-improvement track.
