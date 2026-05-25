---
name: transcript-marker-loop-guard
description: Use when authoring or reviewing a Stop / SubagentStop hook that could re-fire indefinitely. Enforces claudekit's transcript-marker loop-guard pattern — embed a unique marker (e.g. `📋 **Self-Review**`) in the hook's blocking output, then on next invocation parse `payload.transcript_path` JSONL backwards and skip if (a) `payload.stop_hook_active === true` OR (b) the marker appears with no file-changes after it. Stateless — no lockfile, no `.claude/state/*.json` flag — uses the transcript as the canonical idempotency ledger. Triggers on "Stop hook loop", "infinite loop", "re-fire", "deadlock", "loop guard", "stop_hook_active", "transcript_path", "Stop event", "SubagentStop", "hook idempotency", or any hook author whose hook returns `decision: 'block'`. Anchors: claudekit `cli/utils/transcript-parser.ts` + Anthropic hook-payload `stop_hook_active` + `transcript_path` fields + langchain-ai/langgraph cycle-detection / microsoft autogen termination-condition.
---

# transcript-marker-loop-guard (W344 P4)

> **W344 P4 closure** — operator-curated local skill per cardinal-rule-4 (Anthropic-sanctioned local-skills path). Extracted pattern from carlrannaberg/claudekit MIT. Per W344 /goal predicate: P3=Hook-Metadata+Zod, P4=transcript-marker.

## When to fire

Auto-fire on `description` triggers above. Concretely:
- Authoring a `Stop` or `SubagentStop` hook that may return `decision: 'block'`.
- Reviewer sees a hook write to `.claude/state/<hook>-fired.flag` or similar filesystem lockfile.
- Operator reports "the Stop hook fires every time" / "session can't end" / "stop-loop".

## The two-layer guard (cite-anchored)

### Layer 1 — Anthropic's `stop_hook_active` payload field

Source: `cli/hooks/base.ts:19-20, 74-78` + `cli/hooks/self-review.ts:156-164` @ claudekit MIT.

```typescript
// claudekit BaseHook.run — primary guard, every Stop hook MUST include this
async run(payload: ClaudePayload): Promise<HookResult> {
  if (payload.stop_hook_active === true) {
    return { exitCode: 0 };  // already inside a stop-hook execution — never re-block
  }
  // ... continue to hook body
}
```

Anthropic sets `stop_hook_active: true` on the payload when CC is already running Stop hooks — this is the first-line defense per the official hook-payload schema. Always check it.

### Layer 2 — Transcript-marker idempotency

`stop_hook_active` only catches the *current* re-entry. To catch "Stop hook fires every tick because nothing changed since last block", embed a marker in the blocking output and skip re-firing when the marker is the most-recent state AND no file changes follow it.

#### 2a. Define a unique marker

Source: `cli/hooks/self-review.ts:18-19` @ claudekit MIT.

```typescript
const SELF_REVIEW_MARKER = '📋 **Self-Review**';
```

Use an emoji + bold-text combo unlikely to collide with operator content. The marker must be present in the hook's `reason` field of the `decision: 'block'` JSON output.

#### 2b. Parse transcript backwards for the marker

Source: `cli/utils/transcript-parser.ts:238-287` @ claudekit MIT.

```typescript
findLastMessageWithMarker(marker: string): number {
  const entries = this.loadEntries();
  for (let i = entries.length - 1; i >= 0; i--) {
    const entry = entries[i];
    if (!entry) continue;

    // Codex r1 MAJOR fix (2026-05-20): scan ONLY the structured tool-result.reason
    // field where Stop hook JSON output lands. Generic user-message content
    // scanning (/compact summaries, copied hook text, operator quotes) can hijack
    // the marker and produce false-positive loop-guards. The reason field is
    // hook-emitted only — no operator/compaction surface can write into it.
    if (entry.type === 'user' && entry.toolUseResult) {
      const reason = entry.toolUseResult['reason'];
      if (typeof reason === 'string' && reason.includes(marker)) return i;
    }
    // SKIP: generic user-message content scanning is unsafe (Codex r1 finding).
    // If recovery from compaction is needed, the hook MUST emit a structured
    // hook-id + nonce marker; never scan free-text user-message content.
  }
  return -1;
}
```

#### 2c. Skip re-fire if marker exists AND no relevant file changes follow it

Source: `cli/utils/transcript-parser.ts:406-417` @ claudekit MIT.

```typescript
hasFileChangesSinceMarker(marker: string, targetPatterns?: string[]): boolean {
  const entries = this.loadEntries();
  const lastMarkerIndex = this.findLastMessageWithMarker(marker);
  if (lastMarkerIndex === -1) return false;  // no prior marker — caller decides default
  return this.hasFileChangesInRange(lastMarkerIndex + 1, entries.length, targetPatterns);
}
```

#### 2d. Wire into hook `execute()`

Source: `cli/hooks/self-review.ts:147-181` @ claudekit MIT (condensed).

```typescript
async execute(context: HookContext): Promise<HookResult> {
  const { payload } = context;
  const transcriptPath = payload.transcript_path as string | undefined;

  if (payload.stop_hook_active === true) return { exitCode: 0, suppressOutput: true };

  const parser = new TranscriptParser(transcriptPath!);
  if (!parser.exists()) return { exitCode: 0, suppressOutput: true };

  const lastMarkerIdx = parser.findLastMessageWithMarker(SELF_REVIEW_MARKER);
  const hasChanges = lastMarkerIdx === -1
    ? parser.hasRecentFileChanges(200, targetPatterns)        // first run: scan last 200
    : parser.hasFileChangesSinceMarker(SELF_REVIEW_MARKER, targetPatterns);  // skip if quiet

  if (!hasChanges) return { exitCode: 0, suppressOutput: true };  // LOOP-GUARDED EXIT

  this.jsonOutput({ decision: 'block', reason: `${SELF_REVIEW_MARKER}\n\n${reviewMessage}` });
  return { exitCode: 0 };
}
```

## Codex r1 race-condition note (parallel SubagentStop)

Under parallel SubagentStop fires from concurrent teammates, two readers of the same transcript can both observe "no marker yet" before either marker lands → both emit duplicate blocks. The stateless transcript-marker pattern is **idempotent-safe** when the downstream consumer tolerates duplicate blocks (the operator only sees one rendered message; the second is a no-op). For consumers that CANNOT tolerate duplicates, scope this pattern to single-Stop-hook workflows OR add a per-session atomic marker-write (lockfile, sqlite UPSERT, or transcript-line-number CAS).

## 3-org-distinct anchors

| Source | Loop-guard primitive |
|---|---|
| carlrannaberg/claudekit `cli/hooks/self-review.ts:18,156-164` + `cli/utils/transcript-parser.ts:238-287,406-417` MIT | Transcript-embedded marker + `hasFileChangesSinceMarker` |
| Anthropic `https://docs.anthropic.com/en/docs/claude-code/hooks` hook-payload schema | `stop_hook_active: boolean` and `transcript_path: string` payload fields (UNVERIFIED — exact section anchors not probed this session; field names verified present in claudekit's `ClaudePayload` interface @ `cli/hooks/base.ts:19-20`) |
| langchain-ai/langgraph `Pregel` cycle-detection / microsoft autogen `TerminationCondition` | Cycle/termination via in-graph state, not filesystem lock — same "ledger is the state" philosophy (UNVERIFIED — broad correspondence; specific commit/line not probed) |

3-org-distinct convergence per sca-v13. Verdict: filesystem-lockfile loop guards (`.claude/state/<hook>.flag`) are a SEV-2 anti-pattern — race-condition prone on parallel sessions, leak across worktrees, no audit trail. Transcript-marker is SOTA.

## Enforcement procedure (review-time)

When reviewing a Stop/SubagentStop hook PR or authoring a new one:

1. **Reject** any hook that does not check `payload.stop_hook_active === true` and early-return.
2. **Reject** any hook using `.claude/state/*.flag` / lockfile / mtime-based loop guards.
3. **Require** a unique marker constant embedded in every `decision: 'block'` `reason` field.
4. **Require** transcript-backwards parsing (`findLastMessageWithMarker`) before re-blocking.
5. **Require** "skip if marker present AND no in-scope changes follow it" branch.
6. **Verify** `transcript_path` extraction is null-safe (per `cli/hooks/self-review.ts:103-106`).

## Cite-anchors

- claudekit `cli/hooks/self-review.ts:18-19, 99-141, 147-196` + `cli/utils/transcript-parser.ts:49-89, 238-287, 371-417` + `cli/hooks/base.ts:19-20, 74-78` @ MIT.
- Anthropic hook payload: `https://docs.anthropic.com/en/docs/claude-code/hooks` (UNVERIFIED — line-level anchor not probed; field names cross-verified via claudekit type).
- LangGraph cycle-detection / Autogen termination: design correspondence noted, exact source UNVERIFIED.

## Adapt-for-local-runtime notes

This runtime is plugin-loaded primitive-only per cardinal-rule-1. Project-owned Stop-hook bodies are forbidden per cardinal-rule-2 EXCEPT sanctioned bug-patch shims. The pattern still applies to:
- Operator-curated skills that orchestrate Stop-like behavior (e.g. `task-close-discipline`, `ops-rhythm`).
- Reviewing third-party plugin hooks before install per cardinal-rule-1 trust-tuple.
- Authoring codex review-gate logic where the transcript is the only durable ledger.

Anthropic-canonical `transcript_path` lives in `payload.transcript_path` (JSONL session log). Markers survive `/compact` because compaction preserves tool-result content unless the operator explicitly truncates — verify with `mcp__basic-memory__search_notes` if marker durability matters post-compact.
