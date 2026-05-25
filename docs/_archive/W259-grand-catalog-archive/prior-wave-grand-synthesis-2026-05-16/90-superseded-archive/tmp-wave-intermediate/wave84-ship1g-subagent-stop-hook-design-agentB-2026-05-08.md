# Wave 84 Agent B — Ship 1G SubagentStop transcript-mining hook (codex-rescue BRIDGE-MODE)

**Origin**: Wave 84 dispatch 11:38; codex-rescue BRIDGE-MODE → real GPT-5.5 (no STAND-IN-NOTICE; cross-model gate at agent layer satisfied)
**Tool count**: 3 / Duration: 202s

## Verdict: PRESCRIPTION: SHIP-NOW (telemetry-only, async, append-only)

## §1 Extraction targets ranked by signal-value

1. agent_id, agent_type, agent_transcript_path — highest join value (cross-correlation with orchestrator logs)
2. Token usage — mine transcript JSONL for usage.{input_tokens, output_tokens, cache_creation_input_tokens, cache_read_input_tokens}
3. Tool count + tool names — count assistant content blocks with tool_use; store counts not full inputs
4. Verdict shape — regex against last_assistant_message + transcript tail
5. Error hints — count records with is_error/error/exception/traceback/429/529/cooling
6. Last assistant message — redacted 512-1000 char summary only

## §2 Privacy + retention design

- Full-mine threshold: SUBAGENT_STOP_FULL_MAX_BYTES default 1 MiB
- Tail-sample: 256 KiB if larger (seek + discard partial first line)
- Redact patterns: API keys/tokens, emails, Windows user paths (C:\Users\...), SSH key markers, credential-like ≥32 chars
- Output: append-only JSONL at .claude/state/subagent_metrics.jsonl
- Rotation: rotate at 10 MiB → .1; keep 5 generations
- async: true (telemetry only; cite Anthropic hooks docs lines 434-441, 2243-2273)

## §3 Python hook skeleton (~80 LOC)

`.claude/hooks/scripts/subagent_stop_telemetry.py` — full implementation in Agent B return artifact (regex-based VERDICT_RE / ERR_RE / REDACT patterns + walk_usage recursion + tail_lines bounded read + JSONL append).

## §4 settings.json:218 SubagentStop entry

```json
"SubagentStop": [{
  "matcher": "*",
  "hooks": [{
    "type": "command",
    "command": "Z:/venvs/claude/Scripts/python.exe Z:/claude-sota-installed/.claude/hooks/scripts/subagent_stop_telemetry.py",
    "timeout": 5,
    "async": true
  }]
}]
```

## §5 Integration with cpa-usage-keeper

**Separate lanes** (recommended for ship-now): keep .claude/state/subagent_metrics.jsonl independent from cpa-usage-keeper SQLite/Redis. Zero corruption risk; no process dependency.

**Unified lane** (DEFERRED): later offline importer reading subagent_metrics.jsonl → cpa-usage-keeper enrichment. Do NOT write directly to cpa-usage-keeper DB from hook.

## §6 PRESCRIPTION: SHIP-NOW

Criteria met:
- SubagentStop array empty — no compatibility surface to preserve (Mia VERIFIED)
- Both observer scripts absent — clean slate (Mia VERIFIED)
- Hook is telemetry-only, async, append-only JSONL, redacts text, exits 0 always
- Full-mine vs tail-sample threshold prevents memory pressure on long agents

DEFER ONLY if requirement changes from telemetry to enforcement (any blocking/re-prompting hook must be sync + separately tested).

## Mia VERIFIED (4/4 orchestrator-side probes)
1. settings.json:200-218 SubagentStop=[] ✓
2. types.py:309-316 SubagentStopHookInput schema (agent_id/agent_transcript_path/agent_type) ✓
3. subagent_stop_telemetry.py + subagent_start_observer.py both absent ✓
4. Anthropic hooks docs accessible ✓

## HANDOFF
verdict_one_line: SHIP-NOW Ship 1G — 80-LOC Python hook skeleton ready; settings.json SubagentStop empty (clean slate); telemetry-only async append-only JSONL with redaction + rotation; separate lane from cpa-usage-keeper.
