---
title: W174 Fire 1 P0a close — estimator unblock
status: AUTHORITATIVE
date: 2026-05-13
agent: orchestrator
wave: 174
fire: 1
---

# W174 Fire 1 — P0a UNBLOCK-ESTIMATOR close-synthesis

## Disposition: SHIPPED (commit 02f72fd)

W173 P0b 4-file fork was untracked when W174 fired; integrated W173 P0b ship + W174 P0a fix-forward as ONE atomic commit per goal Pattern A discipline.

## Bug

`.claude/hooks/scripts/userpromptsubmit_compact_threshold.py:85` (pre-fix) used `Path(transcript_path).stat().st_size // 4` as a ~4-chars-per-token estimator. The transcript JSONL accumulates the FULL session history (system reminders, tool outputs, agent transcripts), easily 36 MB → 9M "tokens" estimate. Operator observed `8,969,314 tokens (~897%)` BLOCK while real context (per `context_window_guard.py` reading same canonical sidecar) was 525k / 53%.

## Fix (commit 02f72fd `fix(hooks): userpromptsubmit_compact_threshold estimator no longer over-counts ~17x`)

`_estimate_tokens_used()` replaced:

1. Strategy 1: payload.usage.input_tokens (if CC ever exposes; ideal future)
2. Strategy 2: canonical sidecar `total_input_tokens` (flat shape; same field `context_window_guard.py:60-61` + `context_window_statusline.sh:41` read)
3. Strategy 3: nested-session legacy fallback
4. Strategy 4: None → severity UNKNOWN → no emit, no block (fail-open per cardinal-rule 7)

Removed `_write_sidecar()` — was overwriting canonical flat-shape sidecar with broken nested-session shape, corrupting the shared state that `context_window_guard.py` + statusline depend on. Sidecar is now READ-ONLY from this hook.

Linter cleanups: removed unused `import os` (only used by removed `_write_sidecar`); `utcnow` → `datetime.now(timezone.utc).isoformat()` (Python 3.12+ deprecation).

## Smoke probes (3/3 PASS)

| Probe | Payload | Strategy hit | Result |
|---|---|---|---|
| 1 | `{}` empty | Strategy 2 (sidecar) | 658,019 tokens → correct CRIT block (was: 8.9M block; ratio fixed) |
| 2 | `{session_id, transcript_path}` no usage | Strategy 2 (sidecar) | 658,019 tokens → CRIT block |
| 3 | `{usage: {input_tokens: 100000}}` | Strategy 1 (payload-provided) | no emit (below 250k WARN) ✓ |

Strategy 1 correctly preempts Strategy 2 when payload-provided. Strategy 4 fail-open path exercised when no source available.

## Files in commit (W173 P0b + W174 P0a integrated)

- `.claude/hooks/scripts/userpromptsubmit_compact_threshold.py` (NEW + fix integrated)
- `.claude/hooks/scripts/precompact_hint_emitter.py` (W173 P0b NEW)
- `.claude/hooks/scripts/sessionstart_compact_hint_reader.py` (W173 P0b NEW)
- `.claude/schemas/compact_hint.v1.json` (W173 P0b NEW)
- `.claude/rules/sessionstart-preload-discipline.md` (W173 P0b NEW)
- `.claude/settings.json` (modified — wires PreCompact + UserPromptSubmit + SessionStart matcher=compact)

802 insertions across 6 files.

## Cross-model gate status (per CR-3 Phase 1 bootstrap exception)

- **T1 codex pre-edit**: WARN-only (codex-t1-gate emitted `no_path_match` 3 pairs examined; my consult prompt was authored at goal-predicate layer NOT as .claude/state/codex_consult_<topic>.txt pair — known SYSTEM-meta-review fallback per `codex-t1-system-meta-review-fallback.md`). Cross-model gate satisfaction: PARTIAL.
- **T3 codex postcommit**: FIRED — `.claude/state/codex_review_HEAD_02f72fd9.prompt.txt` exists 12.0K; verdict file `_OUT.txt` pending (codex CLI completion async). When verdict lands, gate satisfaction: FULL.

## Queued for next fire

- **P0a-followup**: threshold tuning. CRIT 350k may be too tight for Opus 4.7 1M routine sessions where autocompact fires at 80% / 800k. Possible re-tune to 250k/500k/700k WARN/HIGH/CRIT. Separate ship per ONE-LOGICAL-UNIT-PER-FIRE.
- **P1(a) sota-researcher**: dispatched (agent acc1ba86a056169ba; 4-repo line-by-line); awaiting completion.
- **P1(b) codex-rescue BRIDGE-MODE**: dispatched THIS fire; 3-axis (estimator-fix review + 14-repo blind-spot + auto-compact SOTA).
- **P1(c) silent-failure-hunter**: dispatched THIS fire; 3-axis (silent-failure hotspots in hooks + stale rule files + bus-factor concentration).
- **P5 5-surface persist**: 3/5 done THIS fire (MEMORY.md + tmp/wave174 + commit body). Backend persist (mcp-memory + graphiti episode group=eee) + docs/install-provenance.md Wave-174 row queued for next turn after agents return (avoid context burn this turn at 52% utilization).

## FM-20 path-drift defense applied

Mia pre-apply: verified `total_input_tokens` field exists in canonical sidecar via `cat .claude/state/context_window_sidecar.json` BEFORE replacing estimator strategy 2. Refuted hypothetical "field doesn't exist; needs invention" path.

## Final disposition

W174 P0a SHIPPED. UNBLOCK-ESTIMATOR satisfied. Hook will still block at >350k (correct behavior per design), but no longer at false 8.9M. Operator can /compact when at real-CRIT to clear; the prior runaway-block-loop is closed.
