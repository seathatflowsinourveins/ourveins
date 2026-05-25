WARNING: proceeding, even though we could not update PATH: Refusing to create helper binaries under temporary dir "Z:\\claude-sota-installed\\tmp\\" (codex_home: AbsolutePathBuf("Z:\\claude-sota-installed\\tmp\\codex-wave190-home-1778736366323"))
Reading prompt from stdin...
2026-05-14T05:26:11.424641Z ERROR codex_models_manager::manager: failed to refresh available models: stream disconnected before completion: error sending request for url (https://chatgpt.com/backend-api/codex/models?client_version=0.130.0)
2026-05-14T05:26:11.457382Z ERROR rmcp::transport::worker: worker quit with fatal: Transport channel closed, when Client(HttpRequest(HttpRequest("http/request failed: error sending request for url (https://developers.openai.com/mcp)")))
2026-05-14T05:26:11.457876Z ERROR rmcp::transport::worker: worker quit with fatal: Transport channel closed, when Client(HttpRequest(HttpRequest("http/request failed: error sending request for url (https://chatgpt.com/backend-api/wham/apps)")))
OpenAI Codex v0.130.0
--------
workdir: Z:\claude-sota-installed
model: gpt-5.5
provider: openai
approval: never
sandbox: danger-full-access
reasoning effort: xhigh
reasoning summaries: detailed
session id: 019e24f3-16e0-71a1-a756-3afbdabe69e9
--------
user
ROLE: REAL GPT-5.5 deep-review-exec bridge reviewer. Review compact-remind hooks. Path D is confirmed live; do not claim config-validation blocked.

AXES:
1 cite resolution: classify each file's header/cites install-class / cite-adapted (resolves) / novel-with-rationale / novel-WITHOUT-rationale (CR-8 violation).
2 W187 calibration: WARN=600000 HIGH=650000 CRIT=700000 on 1M. Prior 250/300/350k. Autocompact assumed ~80%=800k. Is 100k buffer defensible? Invariant CRIT < autocompact_pct x ceiling.
3 damage claim: hard blocks too early, hint injection re-inflation, mirror drift. Prescribe fixes only if needed; HNF valid.

Official Anthropic hooks facts: UserPromptSubmit stdout/additionalContext is injected; decision:block blocks prompt processing and erases prompt. PostToolUse additionalContext injects context; decision:block provides feedback. SessionStart source compact fires after auto or manual compact. PreCompact auto fires due to full context window. continue=false stops processing and takes precedence.

userpromptsubmit:
   1: #!/usr/bin/env python3
   2: """UserPromptSubmit context-threshold gate (W173 P1(a) recompose).
   3: 
   4: Fires on every user prompt; estimates context-window usage; routes hints via
   5: Anthropic CC contract:
   6:   - WARN (>=600k): emit hookSpecificOutput.additionalContext (advisory)
   7:   - HIGH (>=700k): emit additionalContext + systemMessage (visible advisory)
   8:   - CRIT (>=780k): emit additionalContext + systemMessage (visible advisory)
   9: 
  10: Sidecar write: .claude/state/context_window_sidecar.json (via _atomic_jsonl_append.py
  11: if available; else direct write per atomic-rename pattern).
  12: 
  13: Sister-rule integration:
  14: - auto-compact-discipline.md Rank #3 (Pre-emptive /compact at 300k threshold)
  15: - team-orch-patterns.md "1M context calibration" — Thariq @ TIER-1-NAMED-AUTHOR-QUOTE
  16:   Z:/repos/deps/claude-code-best-practice-shan/tips/claude-thariq-tips-16-apr-26.md:28
  17:   verbatim "context rot happens around ~300-400k tokens" (the rot-zone NUMBER source)
  18: - karpathy-adapted.md section 5 (Wiki Compounding Surface) — Karpathy "outsource
  19:   thinking vs understanding" framing (the discipline WHY, NOT the number)
  20: - evidence-policy.md Stuck Detection (operator-discipline at threshold escalation)
  21: 
  22: CAVEAT (per CC team-orch-patterns.md section Context Budget): context-window estimate
  23: from transcript_path token counts; tokens-used may be unavailable in payload.
  24: Conservative threshold trips on estimate floor.
  25: """
  26: from __future__ import annotations
  27: 
  28: import datetime as _dt
  29: import json
  30: import os
  31: import sys
  32: from pathlib import Path
  33: from typing import Any
  34: 
  35: REPO_ROOT = Path("Z:/claude-sota-installed")
  36: STATE_DIR = REPO_ROOT / ".claude" / "state"
  37: SIDECAR_PATH = STATE_DIR / "context_window_sidecar.json"
  38: TELEMETRY_PATH = STATE_DIR / "userpromptsubmit_compact_threshold.jsonl"
  39: 
  40: # W175 P6 — env-var-overridable thresholds (mechanism parity with sibling
  41: # context_window_guard.py:28-29 pattern).
  42: #
  43: # Code defaults are CONSERVATIVE Thariq-MEASURED rot-zone values (300-400k on
  44: # Opus 4.7 per Z:/repos/deps/claude-code-best-practice-shan/tips/claude-thariq-tips-16-apr-26.md:28
  45: # TIER-1-NAMED-AUTHOR-QUOTE verbatim "context rot happens around ~300-400k tokens").
  46: # Karpathy §5 supplies the WHY for compaction discipline (Wiki Compounding Surface),
  47: # NOT the number. Pre-emptive /compact discipline at auto-compact-discipline.md:63,110-111.
  48: #
  49: # Operators on 1M-context Opus 4.7 raise these via .claude/settings.json env
  50: # block. The CRIT ceiling MUST fire before the project autocompact threshold.
  51: # Current Anthropic CC default autocompact = ~80% (800k on 1M); CLAUDE.local.md
  52: # ENV(i) CLAUDE_AUTOCOMPACT_PCT_OVERRIDE is currently COMMENTED-OUT per W183 F1
  53: # REVERT (operator directive 2026-05-13). Per auto-compact-discipline.md:117
  54: # ("fire /compact before blind autocompact").
  55: # Required invariant: CRIT_tokens < autocompact_pct * context_window_size,
  56: # with enough buffer (≥100k) for the operator to actually run /compact.
  57: # W187 round-2 codex T1 verdict: CRIT=700k (100k buffer below 800k autocompact ceiling).
  58: #
  59: # SOTA refs:
  60: # - https://code.claude.com/docs/en/hooks:725-792  (decision:block contract) [VERIFIED 2026-05-13]
  61: # - .claude/rules/auto-compact-discipline.md:22,63,110-111,117 @ HEAD 6e4a5f6
  62: # - Z:/repos/deps/claude-code-best-practice-shan/tips/claude-thariq-tips-16-apr-26.md:28,125 @ HEAD 48f2ceb (Thariq TIER-1-NAMED-AUTHOR-QUOTE — rot-zone NUMBER + "model least intelligent at compacting" framing)
  63: # - .claude/rules/karpathy-adapted.md:section-5 (Wiki Compounding Surface discipline — Karpathy "outsource thinking vs understanding" framing, NOT the number) @ HEAD 6e4a5f6
  64: # - Sibling env-var pattern: .claude/hooks/scripts/context_window_guard.py:28-29 @ HEAD 6e4a5f6
  65: def _int_env(name: str, default: int) -> int:
  66:     raw = os.getenv(name)
  67:     if raw is None or raw == "":
  68:         return default
  69:     try:
  70:         return int(raw)
  71:     except ValueError:
  72:         return default
  73: 
  74: 
  75: # W187 Pattern A FIX-FORWARD 2026-05-13 (codex T1 NEEDS-REVISION conf=0.9 round-2 prescription #1+#2):
  76: # defaults: WARN=600k / HIGH=650k / CRIT=700k for 1M-context Opus 4.7 calibration.
  77: # Round-1 W187 attempted CRIT=780k but codex T1 verdict caught buffer-invariant violation:
  78: # auto-compact-discipline.md Rank #3 invariant requires CRIT_tokens < autocompact_pct * context_window_size
  79: # with ≥100k buffer. Autocompact ~80% on 1M = ~800k; CRIT 780k leaves only ~20k buffer (violation).
  80: # Round-2: CRIT=700k preserves 100k buffer; HIGH=650k preserves rot-zone progression.
  81: # Prior 200k-era defaults (250/300/350) fired CRIT at 35% on 1M = premature hard-block (user-reported).
  82: # FM-20 row 18 defense: env-variable-codified-but-not-sourced sub-class — script defaults match
  83: # settings.json env L25-29 + CLAUDE.local.md ENV(j) (coordinated dual-declaration mirror per codex T1 AXIS 2 PASS).
  84: # Cite anchors:
  85: # - Thariq named-T2 rot zone ~300-400k @ Z:/repos/deps/claude-code-best-practice-shan/tips/claude-thariq-tips-16-apr-26.md:28
  86: # - Karpathy §5 Wiki Compounding Surface (1M context calibration)
  87: # - https://code.claude.com/docs/en/hooks (PreCompact + UserPromptSubmit decision:block contract)
  88: # - auto-compact-discipline.md Rank #3 pre-emptive /compact discipline + 100k buffer invariant
  89: # - REAL GPT-5.5 codex T1 verdict @ .claude/state/codex_consult_w187_hooks_OUT.txt (NEEDS-REVISION conf=0.9 round-2 prescription)
  90: THRESH_WARN = _int_env("CONTEXT_WINDOW_COMPACT_WARN_TOKENS", 600_000)   # 60% on 1M (just below rot zone)
  91: THRESH_HIGH = _int_env("CONTEXT_WINDOW_COMPACT_HIGH_TOKENS", 650_000)   # 65% on 1M (rot threshold visible nudge)
  92: THRESH_CRIT = _int_env("CONTEXT_WINDOW_COMPACT_CRIT_TOKENS", 700_000)   # 70% on 1M (100k buffer before 80% autocompact)
  93: 
  94: # Try to import atomic JSONL append per Round-3-7 invariants
  95: _ATOMIC_AVAILABLE = False
  96: try:
  97:     sys.path.insert(0, str(REPO_ROOT / "scripts"))
  98:     import _atomic_jsonl_append as _aja  # noqa: F401
  99:     _ATOMIC_AVAILABLE = True
 100: except Exception:
 101:     _ATOMIC_AVAILABLE = False
 102: 
 103: 
 104: def _now_iso() -> str:
 105:     return _dt.datetime.now(_dt.timezone.utc).isoformat()
 106: 
 107: 
 108: def _read_stdin_payload() -> dict[str, Any]:
 109:     try:
 110:         raw = sys.stdin.read() or ""
 111:         return json.loads(raw) if raw.strip() else {}
 112:     except Exception:
 113:         return {}
 114: 
 115: 
 116: def _estimate_tokens_used(payload: dict[str, Any]) -> int | None:
 117:     """Best-effort context-window estimate.
 118: 
 119:     W174 P0b FIX (follow-up to commit 02f72fd): session-keyed lookup.
 120: 
 121:     Prior Strategy 3 iterated `data.values()` and returned the first non-zero
 122:     `total_input_tokens` found — which for a multi-session sidecar leaked a
 123:     SIBLING session's reading into this session's gate. Telemetry confirmed
 124:     three distinct sessions (70bd13e6, b2a9dc5b, cd57ff20) all reported at
 125:     658,019 — the alphabetically-first key (1aeadaf1)'s real number.
 126: 
 127:     Canonical sidecar shape is session-keyed, NOT flat. Both writers and the
 128:     sibling reader agree on this:
 129:       - Writer: .claude/hooks/scripts/context_window_statusline.sh:54-65
 130:         does `data[session_id] = row` (session-keyed insert).
 131:       - Sibling reader: .claude/hooks/scripts/context_window_guard.py:48
 132:         does `data.get(session_id)` (session-keyed lookup).
 133:     The "flat shape" comment in commit 02f72fd reflected an incorrect premise
 134:     about the sidecar layout.
 135: 
 136:     Revised strategy:
 137:     1. Payload-provided usage if CC ever exposes it (ideal future).
 138:     2. Session-keyed sidecar lookup: data[session_id].total_input_tokens
 139:        (matches sibling context_window_guard.py:48 selection logic).
 140:     3. None -> severity UNKNOWN -> no emit, no block (fail-open per cardinal-rule 7).
 141: 
 142:     SOTA references:
 143:     - UserPromptSubmit payload includes session_id field:
 144:       https://code.claude.com/docs/en/hooks:743-757 [VERIFIED 2026-05-13]
 145:     - Sibling lookup pattern (in-repo authoritative):
 146:       .claude/hooks/scripts/context_window_guard.py:40-49 @ HEAD 02f72fd9
 147:     - Sidecar writer (session-keyed shape source-of-truth):
 148:       .claude/hooks/scripts/context_window_statusline.sh:54-65 @ HEAD 02f72fd9
 149:     """
 150:     # Strategy 1: payload-provided usage (ideal-future contract)
 151:     usage = payload.get("usage") or payload.get("context_usage") or {}
 152:     if isinstance(usage, dict):
 153:         tokens = usage.get("input_tokens") or usage.get("total_tokens")
 154:         if isinstance(tokens, (int, float)) and tokens > 0:
 155:             return int(tokens)
 156: 
 157:     # Strategy 2: session-keyed sidecar lookup. No cross-session leak possible —
 158:     # we only ever read the row for THIS session_id.
 159:     session_id = payload.get("session_id")
 160:     if not isinstance(session_id, str) or not session_id:
 161:         return None
 162:     try:
 163:         if SIDECAR_PATH.exists():
 164:             with SIDECAR_PATH.open(encoding="utf-8") as fh:
 165:                 data = json.load(fh)
 166:             if isinstance(data, dict):
 167:                 row = data.get(session_id)
 168:                 if isinstance(row, dict):
 169:                     tokens = row.get("total_input_tokens")
 170:                     if isinstance(tokens, (int, float)) and tokens > 0:
 171:                         return int(tokens)
 172:     except (OSError, json.JSONDecodeError):
 173:         pass
 174: 
 175:     # Strategy 3: fail-open per cardinal-rule 7 silent-fallback prohibition
 176:     return None
 177: 
 178: 
 179: def _emit_warn(tokens: int) -> None:
 180:     """>=WARN threshold: advisory additionalContext only."""
 181:     notice = (
 182:         f"CONTEXT-WINDOW WARN: estimated {tokens:,} tokens used (~{tokens/1000:.0f}k) "
 183:         f"crosses WARN threshold {THRESH_WARN:,}. Approaching Thariq rot zone "
 184:         "(300-400k on Opus 4.7 per claude-thariq-tips-16-apr-26.md:28). "
 185:         "Consider /compact <hint> per auto-compact-discipline.md Rank #3 to pre-empt "
 186:         "blind autocompact."
 187:     )
 188:     sys.stdout.write(json.dumps({
 189:         "hookSpecificOutput": {
 190:             "hookEventName": "UserPromptSubmit",
 191:             "additionalContext": notice,
 192:         }
 193:     }))
 194: 
 195: 
 196: def _emit_high(tokens: int) -> None:
 197:     """>=HIGH threshold: advisory + systemMessage visible advisory."""
 198:     notice = (
 199:         f"CONTEXT-WINDOW HIGH: estimated {tokens:,} tokens (~{tokens/1000:.0f}k) "
 200:         f"crosses HIGH threshold {THRESH_HIGH:,}. At/past Thariq rot threshold "
 201:         "(300-400k per claude-thariq-tips-16-apr-26.md:28). STRONGLY recommend "
 202:         "/compact <hint> NOW per auto-compact-discipline.md Rank #3."
 203:     )
 204:     sys.stdout.write(json.dumps({
 205:         "hookSpecificOutput": {
 206:             "hookEventName": "UserPromptSubmit",
 207:             "additionalContext": notice,
 208:         },
 209:         "systemMessage": (
 210:             f"[context-threshold] HIGH ({tokens:,} tokens). Run /compact <hint> "
 211:             "before autocompact fires blind (CLAUDE_AUTOCOMPACT_PCT_OVERRIDE)."
 212:         ),
 213:     }))
 214: 
 215: 
 216: def _emit_crit_advisory(tokens: int) -> None:
 217:     """>=CRIT threshold below 80%: advisory + systemMessage visible advisory."""
 218:     notice = (
 219:         f"CONTEXT-WINDOW CRITICAL: estimated {tokens:,} tokens (~{tokens/1000:.0f}k) "
 220:         f"exceeds CRIT threshold {THRESH_CRIT:,}. Run /compact <hint> with focused "
 221:         "goal/files/cites/commands/test-state/next-action per "
 222:         "auto-compact-discipline.md Rank #3 before blind autocompact "
 223:         "(CLAUDE_AUTOCOMPACT_PCT_OVERRIDE). "
 224:         "To re-tune for 1M-ctx, set CONTEXT_WINDOW_COMPACT_CRIT_TOKENS in "
 225:         ".claude/settings.json env block."
 226:     )
 227:     sys.stdout.write(json.dumps({
 228:         "hookSpecificOutput": {
 229:             "hookEventName": "UserPromptSubmit",
 230:             "additionalContext": notice,
 231:         },
 232:         "systemMessage": (
 233:             f"[context-threshold] CRIT ({tokens:,} tokens). Run /compact <hint> "
 234:             "before autocompact fires blind (CLAUDE_AUTOCOMPACT_PCT_OVERRIDE)."
 235:         ),
 236:     }))
 237: 
 238: 
 239: # NOTE (W174 P0a/P0b fix-forward): prior _write_sidecar() wrote from this
 240: # hook into context_window_sidecar.json and risked corrupting the canonical
 241: # statusline-owned layout. The canonical sidecar is session-keyed:
 242: # data[session_id] = {"session_id": session_id,
 243: #                     "total_input_tokens": N,
 244: #                     "updated_at": "...", ...}
 245: # This hook treats that shared file as READ-ONLY; the statusline pipeline owns
 246: # writes. Per-fire telemetry continues to land in
 247: # userpromptsubmit_compact_threshold.jsonl (separate file, no shared-shape
 248: # contract).
 249: 
 250: 
 251: def _append_telemetry(record: dict[str, Any]) -> None:
 252:     try:
 253:         STATE_DIR.mkdir(parents=True, exist_ok=True)
 254:         with TELEMETRY_PATH.open("a", encoding="utf-8") as fh:
 255:             fh.write(json.dumps(record) + "\n")
 256:     except Exception as exc:
 257:         sys.stderr.write(f"[userpromptsubmit_compact_threshold] telemetry failed: {exc!r}\n")
 258: 
 259: 
 260: def main() -> int:
 261:     payload = _read_stdin_payload()
 262:     tokens = _estimate_tokens_used(payload)
 263: 
 264:     severity = "UNKNOWN"
 265:     exit_code = 0
 266: 
 267:     if tokens is None:
 268:         severity = "UNKNOWN"
 269:     elif tokens >= THRESH_CRIT:
 270:         severity = "CRIT"
 271:         _emit_crit_advisory(tokens)
 272:     elif tokens >= THRESH_HIGH:
 273:         severity = "HIGH"
 274:         _emit_high(tokens)
 275:     elif tokens >= THRESH_WARN:
 276:         severity = "WARN"
 277:         _emit_warn(tokens)
 278:     else:
 279:         severity = "OK"
 280: 
 281:     _append_telemetry({
 282:         "schema": "userpromptsubmit_compact_threshold.v1",
 283:         "ts": _now_iso(),
 284:         "wire_event": "UserPromptSubmit",
 285:         "session_id": payload.get("session_id"),
 286:         "agent_id": payload.get("agent_id"),
 287:         "agent_type": payload.get("agent_type"),
 288:         "model": payload.get("model"),
 289:         "transcript_path": payload.get("transcript_path"),
 290:         "tokens_estimated": tokens,
 291:         "severity": severity,
 292:         "thresh_warn": THRESH_WARN,
 293:         "thresh_high": THRESH_HIGH,
 294:         "thresh_crit": THRESH_CRIT,
 295:         "atomic_available": _ATOMIC_AVAILABLE,
 296:     })
 297: 
 298:     return exit_code
 299: 
 300: 
 301: if __name__ == "__main__":
 302:     raise SystemExit(main())

context_window_guard:
   1: #!/usr/bin/env python3
   2: """PostToolUse context-window guard for Edit/Write/MultiEdit hooks.
   3: 
   4: SOTA:
   5: - PostToolUse matcher and command-hook shape:
   6:   https://code.claude.com/docs/en/hooks:356-370 [VERIFIED 2026-05-13]
   7: - asyncRewake stderr reminder semantics:
   8:   https://code.claude.com/docs/en/hooks:435-443 [VERIFIED 2026-05-13]
   9: - additionalContext JSON shape:
  10:   https://code.claude.com/docs/en/hooks:743-757 [VERIFIED 2026-05-13]
  11: - 250k proactive compact and 300k stop-work discipline:
  12:   .claude/rules/auto-compact-discipline.md:102-113 @ HEAD 02bfaedfdb27ce1d1855bdbc7e7c75df6f5d14f2
  13: - Autocompact-last-resort discipline:
  14:   Z:/claude-sota-installed/.claude/rules/coordination.md:182-190
  15: """
  16: 
  17: from __future__ import annotations
  18: 
  19: import json
  20: import os
  21: import sys
  22: from pathlib import Path
  23: 
  24: ROOT = Path("Z:/claude-sota-installed")
  25: SIDECAR = ROOT / ".claude/state/context_window_sidecar.json"
  26: HOOK_EVENT = "PostToolUse"
  27: TARGET_TOOLS = {"Edit", "Write", "MultiEdit", "Bash", "Read", "Glob", "Grep", "Agent"}
  28: # W189 P1: defaults realigned 25/30 -> 60/70 to match settings.json env CONTEXT_WINDOW_*_PERCENT
  29: # (1M-context-era; defense-in-depth — env override wins at runtime but stale 200k-era defaults
  30: # were a latent footgun if the env block is ever trimmed). Cite: auto-compact-discipline.md +
  31: # settings.json:28-29. Hook stays UNWIRED (superseded by posttooluse_context_monitor.js).
  32: WARN_PERCENT = float(os.getenv("CONTEXT_WINDOW_WARN_PERCENT", "60"))
  33: CRITICAL_PERCENT = float(os.getenv("CONTEXT_WINDOW_CRITICAL_PERCENT", "70"))
  34: 
  35: 
  36: def _load_stdin() -> dict:
  37:     try:
  38:         payload = json.loads(sys.stdin.read() or "{}")
  39:     except json.JSONDecodeError:
  40:         return {}
  41:     return payload if isinstance(payload, dict) else {}
  42: 
  43: 
  44: def _sidecar_row(session_id: str) -> dict:
  45:     try:
  46:         with SIDECAR.open(encoding="utf-8") as f:
  47:             data = json.load(f)
  48:     except (OSError, json.JSONDecodeError):
  49:         return {}
  50:     if not isinstance(data, dict):
  51:         return {}
  52:     row = data.get(session_id)
  53:     return row if isinstance(row, dict) else {}
  54: 
  55: 
  56: def _used_percent(row: dict) -> float | None:
  57:     try:
  58:         return float(row.get("used_percentage"))
  59:     except (TypeError, ValueError):
  60:         return None
  61: 
  62: 
  63: def _hint(used: float, row: dict) -> str:
  64:     size = row.get("context_window_size")
  65:     tokens = row.get("total_input_tokens")
  66:     return (
  67:         f"Context window is {used:.1f}% used"
  68:         f"{f' ({tokens}/{size} input tokens)' if tokens and size else ''}. "
  69:         "Before further broad edits, run `/compact <hint>` with a focused handoff: "
  70:         "current goal, files touched, design citations, commands run, test state, "
  71:         "and next action. Autocompact is the fallback, not the primary path."
  72:     )
  73: 
  74: 
  75: def _emit_additional_context(message: str) -> None:
  76:     payload = {
  77:         "hookSpecificOutput": {
  78:             "hookEventName": HOOK_EVENT,
  79:             "additionalContext": message,
  80:         },
  81:     }
  82:     sys.stdout.write(json.dumps(payload, ensure_ascii=True))
  83: 
  84: 
  85: def main() -> int:
  86:     event = _load_stdin()
  87:     if event.get("tool_name") not in TARGET_TOOLS:
  88:         return 0
  89:     session_id = event.get("session_id")
  90:     if not session_id:
  91:         return 0
  92:     row = _sidecar_row(str(session_id))
  93:     used = _used_percent(row)
  94:     if used is None:
  95:         return 0
  96:     message = _hint(used, row)
  97:     if used >= CRITICAL_PERCENT:
  98:         sys.stderr.write("CRITICAL context-window guard: " + message + "\n")
  99:         return 2
 100:     if used >= WARN_PERCENT:
 101:         _emit_additional_context("WARN context-window guard: " + message)
 102:     return 0
 103: 
 104: 
 105: if __name__ == "__main__":
 106:     raise SystemExit(main())

posttooluse_context_monitor:
   1: #!/usr/bin/env node
   2: // posttooluse_context_monitor.js — PostToolUse continuous context-monitor hook
   3: //
   4: // W189 P1 — cite-adapt of gsd-build/get-shit-done gsd-context-monitor.js. Fills the
   5: // runtime's documented gap: PreCompact + SessionStart + UserPromptSubmit compact hooks
   6: // exist, but there was NO PostToolUse continuous context-monitor (the existing 3
   7: // PostToolUse entries are codex-review / mcp-healthcheck / review-trace — none monitor
   8: // context). Reads the runtime's context_window_sidecar.json bridge file after each tool
   9: // use and injects an advisory (additionalContext) when context usage crosses thresholds.
  10: // Advisory-only, silent-fail — NEVER blocks tool execution.
  11: //
  12: // Cite-class lattice (per Z:/claude-sota/.claude/rules/citation-discipline.md rule #8 MIN_PRECEDENCE):
  13: // constituents=[
  14: //   TIER-1-DIRECT @ Z:/repos/deps/get-shit-done/hooks/gsd-context-monitor.js:1-193 @ HEAD 3aaed8f5d7c3492678b867e6687d42c88fe227e5
  15: //     (file-pin SHA 7be9affea289287396cd282f1563e0502deee783) — gsd-build/get-shit-done PostToolUse
  16: //     context-monitor; MIT License Copyright (c) 2025 Lex Christopherson (LICENSE:1-3 + package.json:38),
  17: //     author TACHES; the advisory-only / silent-fail / debounced / severity-escalation PostToolUse
  18: //     monitor pattern this hook adapts,
  19: //   TIER-1-DIRECT @ https://code.claude.com/docs/en/hooks — Anthropic CC PostToolUse hook contract
  20: //     (hookSpecificOutput.additionalContext injection; silent exit-0 = no-block),
  21: //   TIER-1-DIRECT @ .claude/hooks/scripts/context_window_guard.py:25 + context_window_statusline.sh
  22: //     — runtime bridge-file path/schema (.claude/state/context_window_sidecar.json keyed-dict),
  23: //   TIER-3-LOCAL-COMPOSITION @ W189 P1 claude-sota-installed adaptation — bridge-file remap
  24: //     (/tmp/claude-ctx-{session}.json single-file -> .claude/state/context_window_sidecar.json keyed-dict;
  25: //     unix timestamp -> updated_at ISO; threshold env-wiring CONTEXT_WINDOW_COMPACT_*_TOKENS ->
  26: //     derived remaining-% thresholds); gsd-specific drops (.planning/ sentinel + STATE.md breadcrumb
  27: //     + Gemini AfterTool branch)
  28: // ]; effective_tier=TIER-3-LOCAL-COMPOSITION per rule #8 MIN_PRECEDENCE.
  29: //
  30: // Sister-rule integration:
  31: // - auto-compact-discipline.md Rank #3.5 (PreCompact hook layer — this hook is the PostToolUse-event
  32: //   COMPLEMENT, not PreCompact-class; fills the documented "no PostToolUse continuous monitor" gap)
  33: // - userpromptsubmit_compact_threshold.py (UserPromptSubmit-event peer — SAME CONTEXT_WINDOW_COMPACT_*_TOKENS
  34: //   env source; this hook = per-tool-use coverage, that hook = per-prompt coverage)
  35: // - sessionstart_compact_hint_reader.py (SessionStart matcher=="compact" peer — post-compact rehydrate)
  36: // - team-orch-patterns.md "1M context calibration" (rot zone ~300-400k on Opus 4.7)
  37: //
  38: // How it works:
  39: // 1. context_window_statusline.sh writes per-session metrics into
  40: //    .claude/state/context_window_sidecar.json (a dict keyed by session_id).
  41: // 2. This hook reads that bridge file after each tool use.
  42: // 3. When remaining context crosses derived thresholds, it injects an advisory as
  43: //    additionalContext, which the agent sees in its conversation.
  44: //
  45: // Thresholds: derived from CONTEXT_WINDOW_COMPACT_{WARN,CRIT}_TOKENS env (defaults
  46: //   600000 / 700000) divided by the session's context_window_size — single source of
  47: //   truth with userpromptsubmit_compact_threshold.py. On a 1M window: WARNING fires at
  48: //   <=40% remaining (60% used), CRITICAL at <=30% remaining (70% used).
  49: // Debounce: DEBOUNCE_CALLS tool uses between warnings. Severity escalation bypasses debounce.
  50: // Opt-out: POSTTOOLUSE_CONTEXT_MONITOR_DISABLE=1.
  51: 
  52: const fs = require('fs');
  53: const path = require('path');
  54: 
  55: const STATE_DIR = path.join(__dirname, '..', '..', 'state');
  56: const SIDECAR_PATH = path.join(STATE_DIR, 'context_window_sidecar.json');
  57: 
  58: function intEnv(name, dflt) {
  59:   const v = process.env[name];
  60:   if (v === undefined || v === null || v === '') return dflt;
  61:   const n = parseInt(v, 10);
  62:   return Number.isFinite(n) && n > 0 ? n : dflt;
  63: }
  64: 
  65: const WARN_TOKENS = intEnv('CONTEXT_WINDOW_COMPACT_WARN_TOKENS', 600000);
  66: const CRIT_TOKENS = intEnv('CONTEXT_WINDOW_COMPACT_CRIT_TOKENS', 700000);
  67: const STALE_SECONDS = intEnv('POSTTOOLUSE_CONTEXT_MONITOR_STALE_SECONDS', 120);
  68: const DEBOUNCE_CALLS = intEnv('POSTTOOLUSE_CONTEXT_MONITOR_DEBOUNCE_CALLS', 5);
  69: 
  70: // Opt-out
  71: if (process.env.POSTTOOLUSE_CONTEXT_MONITOR_DISABLE === '1') process.exit(0);
  72: 
  73: let input = '';
  74: // Timeout guard: if stdin doesn't close within 10s (Windows/Git Bash pipe issues, or
  75: // slow piping during large outputs), exit silently instead of hanging. See gsd #775, #1162.
  76: const stdinTimeout = setTimeout(() => process.exit(0), 10000);
  77: process.stdin.setEncoding('utf8');
  78: process.stdin.on('data', chunk => input += chunk);
  79: process.stdin.on('end', () => {
  80:   clearTimeout(stdinTimeout);
  81:   try {
  82:     const data = JSON.parse(input);
  83:     const sessionId = data.session_id;
  84:     if (!sessionId) process.exit(0);
  85: 
  86:     // Reject session IDs with path traversal / separators — sessionId is used to build
  87:     // file paths; an unsanitized value could escape .claude/state/. (gsd security check.)
  88:     if (/[/\\]|\.\./.test(sessionId)) process.exit(0);
  89: 
  90:     // No sidecar bridge file -> subagent or fresh session -> exit silently
  91:     if (!fs.existsSync(SIDECAR_PATH)) process.exit(0);
  92: 
  93:     const sidecar = JSON.parse(fs.readFileSync(SIDECAR_PATH, 'utf8'));
  94:     const row = sidecar && sidecar[sessionId];
  95:     if (!row) process.exit(0);
  96: 
  97:     // Stale check — runtime sidecar uses updated_at (ISO-8601), not gsd's unix timestamp
  98:     if (row.updated_at) {
  99:       const parsed = Date.parse(row.updated_at);
 100:       if (Number.isFinite(parsed) && (Date.now() - parsed) > STALE_SECONDS * 1000) {
 101:         process.exit(0);
 102:       }
 103:     }
 104: 
 105:     const remaining = row.remaining_percentage;
 106:     if (remaining === undefined || remaining === null || !Number.isFinite(Number(remaining))) {
 107:       process.exit(0);
 108:     }
 109:     const remainingNum = Number(remaining);
 110:     // used_pct: prefer the sidecar field if present, else derive from remaining
 111:     const usedPct = (row.used_percentage !== undefined && row.used_percentage !== null
 112:       && Number.isFinite(Number(row.used_percentage)))
 113:       ? Math.round(Number(row.used_percentage))
 114:       : Math.round(100 - remainingNum);
 115: 
 116:     // Derive remaining-% thresholds from token thresholds / this session's context window
 117:     // (single source of truth with userpromptsubmit_compact_threshold.py CONTEXT_WINDOW_COMPACT_*_TOKENS)
 118:     const ctxSize = (Number.isFinite(Number(row.context_window_size)) && Number(row.context_window_size) > 0)
 119:       ? Number(row.context_window_size)
 120:       : 1000000;
 121:     const WARNING_REMAINING_PCT = 100 * (1 - WARN_TOKENS / ctxSize);
 122:     const CRITICAL_REMAINING_PCT = 100 * (1 - CRIT_TOKENS / ctxSize);
 123: 
 124:     // No warning needed
 125:     if (remainingNum > WARNING_REMAINING_PCT) process.exit(0);
 126: 
 127:     // Debounce — per-session warned-state file (parallel-session safe: each session owns
 128:     // its own file, no read-modify-write race on a shared keyed dict)
 129:     const warnPath = path.join(STATE_DIR, `posttooluse_context_monitor_warned_${sessionId}.json`);
 130:     let warnData = { callsSinceWarn: 0, lastLevel: null };
 131:     let firstWarn = true;
 132:     if (fs.existsSync(warnPath)) {
 133:       try { warnData = JSON.parse(fs.readFileSync(warnPath, 'utf8')); firstWarn = false; }
 134:       catch (e) { /* corrupted -> reset */ }
 135:     }
 136:     warnData.callsSinceWarn = (warnData.callsSinceWarn || 0) + 1;
 137: 
 138:     const isCritical = remainingNum <= CRITICAL_REMAINING_PCT;
 139:     const currentLevel = isCritical ? 'critical' : 'warning';
 140:     // Severity escalation (warning -> critical) bypasses debounce
 141:     const severityEscalated = currentLevel === 'critical' && warnData.lastLevel === 'warning';
 142:     if (!firstWarn && warnData.callsSinceWarn < DEBOUNCE_CALLS && !severityEscalated) {
 143:       try { fs.writeFileSync(warnPath, JSON.stringify(warnData)); } catch (e) { /* non-critical */ }
 144:       process.exit(0);
 145:     }
 146:     warnData.callsSinceWarn = 0;
 147:     warnData.lastLevel = currentLevel;
 148:     try { fs.writeFileSync(warnPath, JSON.stringify(warnData)); } catch (e) { /* non-critical */ }
 149: 
 150:     // Build advisory message — advisory only, never imperative (gsd #884 discipline).
 151:     // Points at the runtime's pre-emptive /compact discipline (auto-compact-discipline.md Rank #3).
 152:     let message;
 153:     if (isCritical) {
 154:       message = `CONTEXT CRITICAL: usage ~${usedPct}%, remaining ~${remainingNum}%. ` +
 155:         'Context is near the rot zone — consider wrapping up the current logical unit and ' +
 156:         'running /compact with a focused hint before new work (per auto-compact-discipline.md ' +
 157:         'Rank #3 pre-emptive compaction). Best to avoid starting new complex exploration.';
 158:     } else {
 159:       message = `CONTEXT WARNING: usage ~${usedPct}%, remaining ~${remainingNum}%. ` +
 160:         'Context is getting limited — consider avoiding unnecessary exploration and a ' +
 161:         'pre-emptive /compact <hint> at the next logical boundary.';
 162:     }
 163: 
 164:     process.stdout.write(JSON.stringify({
 165:       hookSpecificOutput: {
 166:         hookEventName: 'PostToolUse',
 167:         additionalContext: message
 168:       }
 169:     }));
 170:   } catch (e) {
 171:     // Silent fail — never block tool execution
 172:     process.exit(0);
 173:   }
 174: });

sessionstart_compact_hint_reader:
   1: #!/usr/bin/env python3
   2: """SessionStart compact-hint reader (W173 P1(a) recompose).
   3: 
   4: Fires ONLY on SessionStart matcher=="compact" (post-auto-compact rehydrate boundary
   5: per Anthropic CC hooks contract). Emits 4 sections to stdout via
   6: hookSpecificOutput.additionalContext per https://code.claude.com/docs/en/hooks
   7: SessionStart contract:
   8: 
   9:   (a) compact_hint.json (fresh <=300s) - pre-compact handoff content
  10:   (b) MEMORY.md head 3K chars - Karpathy section 5 Layer-2 index
  11:   (c) last-3 close-syntheses by mtime - Karpathy section 5 Layer-3 compiled wiki
  12:   (d) git log -5 --oneline - recent commit chronology (Layer-1 chronological proxy)
  13: 
  14: Bounded <=9500 chars total (Anthropic CC 10K stdout cap safety margin).
  15: 
  16: Distinct from existing SessionStart matcher=="*" entries (session-lifecycle-hook,
  17: context-mode-cache-heal, cli_path_audit) - this one ONLY fires on matcher=="compact"
  18: to avoid noise on startup/resume events.
  19: 
  20: Sister-rule integration:
  21: - sessionstart-preload-discipline.md section The contract (3-layer preload sequence)
  22: - auto-compact-discipline.md Rank #5 (Karpathy section 5 3-layer progressive disclosure)
  23: - karpathy-adapted.md section 5 Wiki Compounding Surface (Layer 1/2/3 mapping)
  24: - fm20-path-drift-cascade.md (stale-belief-propagation defense at session-resume)
  25: """
  26: from __future__ import annotations
  27: 
  28: import datetime as _dt
  29: import json
  30: import os
  31: import subprocess
  32: import sys
  33: from pathlib import Path
  34: from typing import Any
  35: 
  36: REPO_ROOT = Path("Z:/claude-sota-installed")
  37: STATE_DIR = REPO_ROOT / ".claude" / "state"
  38: HINT_PATH = STATE_DIR / "compact_hint.json"
  39: MEMORY_INDEX = REPO_ROOT / ".claude" / "projects" / "Z--claude-sota-installed" / "memory" / "MEMORY.md"
  40: TMP_DIR = REPO_ROOT / "tmp"
  41: TELEMETRY_PATH = STATE_DIR / "sessionstart_compact_hint_reader.jsonl"
  42: 
  43: HINT_FRESH_SEC = 300       # <=300s sidecar freshness window
  44: MEMORY_HEAD_CHARS = 3000   # Karpathy section 5 Layer-2 head portion
  45: STDOUT_CAP_CHARS = 9500    # Anthropic 10K cap safety margin
  46: GIT_LOG_LINES = 5          # recent-commit chronology
  47: 
  48: 
  49: def _now_iso() -> str:
  50:     # W187 round-2 codex T1 prescription #5: datetime.utcnow() deprecated in Python 3.12+
  51:     # emits DeprecationWarning to stderr; SessionStart stderr is user-visible — pollutes rehydrate.
  52:     # Replaced with timezone-aware datetime.now(timezone.utc); .isoformat() yields '+00:00' suffix,
  53:     # .replace('+00:00', 'Z') preserves prior 'Z' suffix convention for ISO 8601 UTC.
  54:     return _dt.datetime.now(_dt.timezone.utc).isoformat().replace("+00:00", "Z")
  55: 
  56: 
  57: def _read_stdin_payload() -> dict[str, Any]:
  58:     try:
  59:         raw = sys.stdin.read() or ""
  60:         return json.loads(raw) if raw.strip() else {}
  61:     except Exception:
  62:         return {}
  63: 
  64: 
  65: def _section_a_hint() -> str:
  66:     """Section A: compact_hint.json fresh <=300s."""
  67:     if not HINT_PATH.exists():
  68:         return "## (a) compact_hint.json - ABSENT (no pre-compact handoff written)"
  69:     try:
  70:         age_sec = _dt.datetime.now().timestamp() - HINT_PATH.stat().st_mtime
  71:         if age_sec > HINT_FRESH_SEC:
  72:             return f"## (a) compact_hint.json - STALE ({age_sec:.0f}s > {HINT_FRESH_SEC}s cap)"
  73:         with HINT_PATH.open(encoding="utf-8") as fh:
  74:             data = json.load(fh)
  75:         if not isinstance(data, dict) or data.get("version") != 1:
  76:             return "## (a) compact_hint.json - INVALID schema"
  77:         lines = [
  78:             "## (a) compact_hint.json (fresh, version=1)",
  79:             f"  ts: {data.get('ts')}",
  80:             f"  current_goal: {data.get('current_goal')}",
  81:             f"  test_state: {data.get('test_state')}",
  82:             f"  next_action: {data.get('next_action')}",
  83:             "  files_touched:",
  84:         ]
  85:         for f in (data.get("files_touched") or [])[:20]:
  86:             lines.append(f"    - {f}")
  87:         lines.append("  design_cites:")
  88:         for c in (data.get("design_cites") or [])[:10]:
  89:             lines.append(f"    - {c}")
  90:         return "\n".join(lines)
  91:     except (OSError, json.JSONDecodeError) as exc:
  92:         return f"## (a) compact_hint.json - READ-ERROR: {exc!r}"
  93: 
  94: 
  95: def _section_b_memory_head() -> str:
  96:     """Section B: MEMORY.md head 3K chars (Karpathy section 5 Layer-2 index)."""
  97:     if not MEMORY_INDEX.exists():
  98:         return "## (b) MEMORY.md - ABSENT"
  99:     try:
 100:         text = MEMORY_INDEX.read_text(encoding="utf-8", errors="replace")
 101:         head = text[:MEMORY_HEAD_CHARS]
 102:         return f"## (b) MEMORY.md head ({len(head)} chars):\n{head}"
 103:     except Exception as exc:
 104:         return f"## (b) MEMORY.md - READ-ERROR: {exc!r}"
 105: 
 106: 
 107: def _section_c_close_synthesis() -> str:
 108:     """Section C: last-3 close-syntheses by mtime (Karpathy section 5 Layer-3)."""
 109:     patterns = [
 110:         list(TMP_DIR.glob("wave*close-synthesis*.md")),
 111:         list(TMP_DIR.glob("wave*-fire*-close-synthesis-*.md")),
 112:     ]
 113:     files: list[Path] = []
 114:     seen: set[str] = set()
 115:     for grp in patterns:
 116:         for p in grp:
 117:             if p.name not in seen:
 118:                 files.append(p)
 119:                 seen.add(p.name)
 120:     files.sort(key=lambda p: p.stat().st_mtime if p.exists() else 0, reverse=True)
 121:     last3 = files[:3]
 122:     if not last3:
 123:         return "## (c) close-syntheses - NONE FOUND (empty Layer-3)"
 124:     lines = [f"## (c) last-3 close-syntheses (total {len(files)}):"]
 125:     for p in last3:
 126:         try:
 127:             mtime = _dt.datetime.fromtimestamp(p.stat().st_mtime, _dt.timezone.utc).isoformat().replace("+00:00", "Z")
 128:             size = p.stat().st_size
 129:             # Read first 400 chars summary
 130:             preview = p.read_text(encoding="utf-8", errors="replace")[:400]
 131:             lines.append(f"  - {p.name} ({size} B, mtime={mtime})")
 132:             lines.append(f"    preview: {preview[:300]}...")
 133:         except Exception as exc:
 134:             lines.append(f"  - {p.name} READ-ERROR: {exc!r}")
 135:     return "\n".join(lines)
 136: 
 137: 
 138: def _section_d_git_log() -> str:
 139:     """Section D: git log -5 --oneline (Layer-1 chronological proxy)."""
 140:     try:
 141:         result = subprocess.run(
 142:             ["git", "-C", str(REPO_ROOT), "log", f"-{GIT_LOG_LINES}", "--oneline"],
 143:             capture_output=True, text=True, timeout=3,
 144:         )
 145:         if result.returncode == 0:
 146:             return f"## (d) git log -{GIT_LOG_LINES} --oneline:\n{result.stdout.strip()}"
 147:         return f"## (d) git log - FAILED (rc={result.returncode}): {result.stderr.strip()[:200]}"
 148:     except (FileNotFoundError, subprocess.TimeoutExpired) as exc:
 149:         return f"## (d) git log - ERROR: {exc!r}"
 150: 
 151: 
 152: def _append_telemetry(record: dict[str, Any]) -> None:
 153:     try:
 154:         STATE_DIR.mkdir(parents=True, exist_ok=True)
 155:         with TELEMETRY_PATH.open("a", encoding="utf-8") as fh:
 156:             fh.write(json.dumps(record) + "\n")
 157:     except Exception as exc:
 158:         sys.stderr.write(f"[sessionstart_compact_hint_reader] telemetry failed: {exc!r}\n")
 159: 
 160: 
 161: def main() -> int:
 162:     payload = _read_stdin_payload()
 163:     source = payload.get("source", "unknown")
 164: 
 165:     # Fire ONLY on matcher=="compact" - verified via payload.source per Anthropic CC contract
 166:     # SessionStart payload.source in {startup, resume, clear, compact}
 167:     if source != "compact":
 168:         # No-op for non-compact SessionStart events
 169:         _append_telemetry({
 170:             "schema": "sessionstart_compact_hint_reader.v1",
 171:             "ts": _now_iso(),
 172:             "wire_event": "SessionStart",
 173:             "source": source,
 174:             "fired": False,
 175:             "reason": "source!=compact",
 176:         })
 177:         return 0
 178: 
 179:     # Build 4 sections
 180:     body_parts = [
 181:         "POST-AUTO-COMPACT REHYDRATE (W173 P1(a) compact-matcher reader)",
 182:         "",
 183:         _section_a_hint(),
 184:         "",
 185:         _section_b_memory_head(),
 186:         "",
 187:         _section_c_close_synthesis(),
 188:         "",
 189:         _section_d_git_log(),
 190:     ]
 191:     body = "\n".join(body_parts)
 192: 
 193:     # Cap to <=9500 chars
 194:     if len(body) > STDOUT_CAP_CHARS:
 195:         body = body[:STDOUT_CAP_CHARS - 30] + "\n... [TRUNCATED at 9500 chars]"
 196: 
 197:     # Emit via hookSpecificOutput.additionalContext per Anthropic CC contract
 198:     sys.stdout.write(json.dumps({
 199:         "hookSpecificOutput": {
 200:             "hookEventName": "SessionStart",
 201:             "additionalContext": body,
 202:         }
 203:     }))
 204: 
 205:     _append_telemetry({
 206:         "schema": "sessionstart_compact_hint_reader.v1",
 207:         "ts": _now_iso(),
 208:         "wire_event": "SessionStart",
 209:         "source": source,
 210:         "fired": True,
 211:         "session_id": payload.get("session_id"),
 212:         "agent_id": payload.get("agent_id"),
 213:         "agent_type": payload.get("agent_type"),
 214:         "model": payload.get("model"),
 215:         "transcript_path": payload.get("transcript_path"),
 216:         "body_chars": len(body),
 217:     })
 218: 
 219:     return 0
 220: 
 221: 
 222: if __name__ == "__main__":
 223:     raise SystemExit(main())

settings env:
   1: {
   2:   "$schema": "https://json.schemastore.org/claude-code-settings.json",
   3:   "cleanupPeriodDays": 60,
   4:   "env": {
   5:     "CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS": "1",
   6:     "CLAUDE_CODE_FORK_SUBAGENT": "1",
   7:     "CODEX_T2_GATE_TIMEOUT_SEC": "240",
   8:     "ECC_DISABLED_HOOKS": "pre:bash:gateguard-fact-force,pre:edit-write:gateguard-fact-force,pre:write:doc-file-warning,post:edit:design-quality-check,post:edit:console-warn,stop:format-typecheck,stop:check-console-log,pre:observe:continuous-learning,post:observe:continuous-learning,pre:edit-write:suggest-compact,post:session-activity-tracker,stop:evaluate-session,stop:cost-tracker,stop:desktop-notify",
   9:     "PYTHON_BIN": "Z:/venvs/claude/Scripts/python.exe",
  10:     "ECC_GOVERNANCE_CAPTURE": "0",
  11:     "ECC_HOOK_PROFILE": "standard",
  12:     "ANTHROPIC_SMALL_FAST_MODEL": "claude-haiku-4-5-20251001",
  13:     "ANTHROPIC_DEFAULT_HAIKU_MODEL": "claude-haiku-4-5-20251001",
  14:     "ANTHROPIC_DEFAULT_HAIKU_MODEL_NAME": "Haiku 4.5",
  15:     "ANTHROPIC_DEFAULT_HAIKU_MODEL_DESCRIPTION": "fast/cheap inline-judge",
  16:     "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1",
  17:     "CLAUDE_CODE_NO_FLICKER": "1",
  18:     "CLAUDE_CODE_ENABLE_AWAY_SUMMARY": "1",
  19:     "CLAUDE_CODE_ENABLE_FINE_GRAINED_TOOL_STREAMING": "1",
  20:     "CLAUDE_CODE_ATTRIBUTION_HEADER": "0",
  21:     "CLAUDE_CODE_USE_POWERSHELL_TOOL": "1",
  22:     "CLAUDE_CODE_SESSIONEND_HOOKS_TIMEOUT_MS": "60000",
  23:     "ENABLE_PROMPT_CACHING_1H": "1",
  24:     "ENABLE_TOOL_SEARCH": "auto:5",
  25:     "CONTEXT_WINDOW_COMPACT_WARN_TOKENS": "600000",
  26:     "CONTEXT_WINDOW_COMPACT_HIGH_TOKENS": "650000",
  27:     "CONTEXT_WINDOW_COMPACT_CRIT_TOKENS": "700000",
  28:     "CONTEXT_WINDOW_WARN_PERCENT": "60",
  29:     "CONTEXT_WINDOW_CRITICAL_PERCENT": "70",
  30:     "OTEL_LOG_TOOL_DETAILS": "1",
  31:     "OTEL_LOG_USER_PROMPTS": "1",
  32:     "CLAUDE_CODE_ENABLE_TELEMETRY": "1",
  33:     "CLAUDE_CODE_ENHANCED_TELEMETRY_BETA": "1",
  34:     "OTEL_TRACES_EXPORTER": "otlp",
  35:     "OTEL_EXPORTER_OTLP_TRACES_ENDPOINT": "http://127.0.0.1:14317",
  36:     "OTEL_EXPORTER_OTLP_TRACES_PROTOCOL": "grpc",
  37:     "OTEL_RESOURCE_ATTRIBUTES": "openinference.project.name=eee",
  38:     "CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY": "1",
  39:     "MAX_MCP_OUTPUT_TOKENS": "50000",
  40:     "BASH_MAX_OUTPUT_LENGTH": "100000",
  41:     "BASH_MAX_TIMEOUT_MS": "1800000",
  42:     "MCP_TOOL_TIMEOUT": "300000",
  43:     "CLAUDE_CODE_EFFORT_LEVEL": "max"
  44:   },
  45:   "permissions": {

CLAUDE.local excerpts:
  86: # (i) Auto-compact pre-emptive threshold override — fire native CC autocompact at ~70% instead of default ~80%
  87: # Cite-class: constituents=[TIER-2 cite-import-AMBER @ Z:/claude-sota/.claude/rules/coordination.md §12 "Rewind-first over correct-layered" (Thariq named-T2 2026-04-16 quote: "CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=80 → autocompact fires at ~800k"), TIER-2 @ Z:/claude-sota-installed/.claude/rules/auto-compact-discipline.md Rank #3 + Rank #3.5 PreCompact hook stack (intelligent-compact@claude-settings INSTALLED W164 F38a + ECC pre-compact + context-mode precompact.mjs preserve priority during compact), TIER-3-LOCAL-OPERATOR-DERIVED @ Wave 180 F3 codification at fm20-path-drift-cascade.md row 15 (compact-hook-chain-re-inflation sub-class — 13% reclaim measured this arc FAR below SOTA 50-60% target; firing earlier at 70% gives larger re-inflate-headroom budget), TIER-1 (inherited) @ Karpathy §5 Wiki Compounding Surface "model at its least intelligent point when compacting" (Thariq:123-125)]; effective_tier=TIER-3-LOCAL-COMPOSITION per Z:/claude-sota/.claude/rules/citation-discipline.md rule #8 MIN_PRECEDENCE.
  88: # HONEST-NON-FINDING: env var name `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` NOT directly verified at https://code.claude.com/docs/en/env-vars this fire (context >540k near hard-ceiling — research-first deferred per CR-10; cite-import-AMBER from sibling coordination.md §12 satisfies CR-12 TERTIARY path since coordination.md is sibling-novel discipline with TIER-2 named-T2-author cite-anchor). Operator verifies live-runtime acceptance via post-eee-restart probe.
  89: # Rationale: post-compact hook chain re-inflation per fm20 row 15 (~80-100KB inject vs ~50KB net summary = ~13% reclaim @ 540k); firing autocompact earlier at 70% (~700k of 1M ceiling) reserves ~300k re-inflate budget BEFORE rot zone consolidates. Combined with intelligent-compact PreCompact hook (priority_preservation A-F patches inject at compact time per auto-compact-discipline.md Rank #3.5) preserves ship-critical state during the compact.
  90: # Activation: uncomment + restart eee. Banner unchanged; effect visible only at autocompact trigger time.
  91: # Revert: comment out — falls back to Anthropic CC default (~80% per coordination.md §12 row).
  92: # W180 F4 codification 2026-05-13 user-trigger explicit "compact at around 70% — auto compact with SOTA references" + cardinal-rule-9 install-risk discipline applied (env var reversible <1min via comment-out).
  93: # W183 F1 REVERT 2026-05-13 — comment-out per operator directive "your runtime are extremely under performed" diagnosis: combined with auth fleet collapse (8/8 OAuth dead since 2026-05-08 + aperant_poller crashed 2026-05-12 09:35), aggressive 70% compaction compounded context loss when subagents couldn't regenerate context (89% zero-tool-use rate per subagent_metrics.jsonl). Falls back to Anthropic CC default ~80%. Re-enable when auth fleet restored + autocompact reclaim ≥SOTA 50-60% measured.
  94: # $env:CLAUDE_AUTOCOMPACT_PCT_OVERRIDE = '70'
  95: ```
  96: 
  97: ## Key Paths
  98: 
  99: | Path | Purpose | Status |
 100: |---|---|---|
 101: | `Z:\claude-sota-installed\` | This workspace | CREATED 2026-05-06 |
 102: | `Z:\claude-sota\` | **Sibling SOTA-evolving runtime** — active; cite source for inherited cardinal rules | ACTIVE |
 103: | `Z:\claude\` | **Parent CCC harness (backup)** — untouched | BACKUP |
 104: | `Z:\claude-sota-installed-state\` | State-outside-repo (CODEX_HOME + session JSONL) | TO BE CREATED post-codex-install |
 105: | `Z:\repos\deps\` | 673+ upstream repo directories — **DO NOT use for installs** (may be stale per cardinal-rule-6); use only for cite verification | CITE-REFERENCE-ONLY for this runtime |
 106: | `Z:\repos\deps\claude-code-best-practice-shan\` | CCBP HEAD `48f2ceb` — TIER-1 cite-anchor for cardinal rules | CITE-REFERENCE |
 107: | `Z:\venvs\claude\` | Python 3.13 venv (shared) | SHARED |
 108: 
 109: ## Services (planned for install — Tier-A install wave)
 110: 
 111: Currently EMPTY. Populated per `docs/sota-installed-manifest.md` install rows. Examples expected post-install:
 112: - Qdrant (vector DB) — `docker pull qdrant/qdrant:latest`
 113: - LiteLLM (LLM proxy) — `docker pull berriai/litellm:latest`
 114: - FalkorDB (graph DB for Graphiti) — `docker pull falkordb/falkordb:latest`
 115: - Ollama (local model runtime) — fresh install per `docs/install-from-github-discipline.md`
 116: 
 117: ## MCP Servers (planned for install — Tier-A install wave)
 118: 
 119: Currently EMPTY (`.mcp.json` initialized as `{"mcpServers": {}}`). Populated per `docs/sota-installed-manifest.md` Memory + Search + Code-intel + Web sections.
 120: 
 121: ## Hard Rules (LOCAL — not in CLAUDE.md)
 122: 
 123: - This file is gitignored per CCBP `claude-memory.md:113 @ 48f2ceb` — **NEVER** commit
 124: - This runtime is **install-only**: any non-bootstrap file is a cardinal-rule-5 violation
 125: - The sibling claude-sota and parent claude UNTOUCHED by this runtime's installs (state-outside-repo at `Z:\claude-sota-installed-state\`)
 126: - Native install at `Z:\claude-sota-installed\.local\bin\claude.exe` is OPTIONAL — until then, `eee` launcher uses parent's `Z:\claude\.local\bin\claude.exe` against this workspace's `CLAUDE_CONFIG_DIR`
 127: 
 128: ## Current versions (2026-05-06 — initial bootstrap)
 129: 
 130: - **Claude Code**: parent install at `Z:\claude\.local\bin\claude.exe` (auto-update versions in `Z:\claude\.local\share\claude\versions\`)
 131: - **CCBP HEAD**: `48f2cebeb88b389b27231c418ceadb65baf813fd` (TIER-1-DIRECT pinned per `git -C Z:/repos/deps/claude-code-best-practice-shan rev-parse HEAD` 2026-05-12 via W156 F64-narrowed CCBP cite-refresh per codex T1 `b32yaijur` SYSTEM-meta-review fallback; per cardinal-rule-6 freshness check on next session probe upstream for HEAD bumps. **Prior pin 2026-05-06 → refreshed 2026-05-12** per port-note-discipline.md §6 forward-only mandate at active cite-trail surface — NOT historical commit body)
 132: - **codex CLI**: TBD post-install (cardinal-rule-6: pull from newest @ install time)
 133: - **Tier-A installs**: 0 / N planned (see `docs/sota-installed-manifest.md`)
 134: 
 135: # (j) Compact threshold env vars — W184-orchestrator Pattern A FIX-FORWARD 2026-05-13
 136: # Cite-class: constituents=[
 137: #   TIER-1-DIRECT @ Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-settings.md:826,967 @ HEAD 48f2cebeb88b389b27231c418ceadb65baf813fd (W189 P1 CCBP re-source — Anthropic CC autocompact env MODEL authority: CLAUDE_AUTOCOMPACT_PCT_OVERRIDE is a percentage applied AS A PERCENTAGE OF CLAUDE_CODE_AUTO_COMPACT_WINDOW token-base; this is the upstream authority for the token-vs-% MODEL + 1M-ceiling semantics the runtime-novel CONTEXT_WINDOW_COMPACT_*_TOKENS values below are calibrated against — the buffer invariant CRIT_tokens < autocompact_pct*context_window_size derives directly from claude-settings.md:967),
 138: #   TIER-1-DIRECT @ .claude/hooks/scripts/userpromptsubmit_compact_threshold.py:27-29 W175 P6 codification (env-var-overridable thresholds — official sanctioned mechanism),
 139: #   TIER-1-DIRECT @ Agent B BRIDGE-MODE REAL GPT-5.5 verdict at tmp/w184-B-codex-rescue-bridgemode-2026-05-13.md (cross-model gate FULL — root-cause analysis),
 140: #   TIER-1-DIRECT @ https://code.claude.com/docs/en/hooks (decision:block contract L725-792),
 141: #   TIER-1-DIRECT @ Karpathy §5 Wiki Compounding Surface + Thariq named-T2 quote "context rot ~300-400k on Opus 4.7" (Z:/repos/deps/claude-code-best-practice-shan/tips/claude-thariq-tips-16-apr-26.md:28),
 142: #   TIER-3-LOCAL-OPERATOR-DERIVED @ W184-orchestrator threshold-miscalibration root-cause analysis + Mia pre-apply 4-clause verify 2026-05-13
 143: # ]; effective_tier=TIER-3-LOCAL-COMPOSITION per Z:/claude-sota/.claude/rules/citation-discipline.md rule #8.
 144: #
 145: # Mechanism: userpromptsubmit_compact_threshold.py defaults (250k/300k/350k) calibrated for 200k-context-era;
 146: # on 1M context Opus 4.7, 350k = 35% → operator-perceived "compact firing at 40%". Defaults trigger
 147: # CRIT decision:block hard-blocks at ~35% utilization, forcing premature /compact. Raised thresholds
 148: # below shift CRIT to 78% (just-below 80% autocompact), aligning with 1M context rot-zone awareness
 149: # while preserving safety rail. Required invariant CRIT_tokens < autocompact_pct * ceiling = 780k < 800k ✓.
 150: #
 151: # Reversibility: HIGH (single comment-out reverts to defaults; <1min). Per closed-loop-recursive-narrowing.md
 152: # Outcome A monotone-decline ACCEPT-WITH-DOC. W183 F1 REVERT precedent on ENV (i) — operator can REVERT
 153: # similarly if 1M context band changes OR new rot evidence surfaces.
 154: #
 155: # Cross-model gate (CR-3 strict reading): satisfied via Agent B BRIDGE-MODE REAL GPT-5.5 codex CLI
 156: # subprocess dispatch at this arc + main-thread Mia pre-apply 4-clause verify + W175 P6 codification
 157: # of env-var-overridable thresholds. T1-T7 hooks INSTALLED per W165 manifest §2 L84 — but per
 158: # /goal MANDATES section CR-3 satisfied at arc-level via 3 BRIDGE-MODE agent dispatches (B + A-redo + C+D-merged).
 159: $env:CONTEXT_WINDOW_COMPACT_WARN_TOKENS = '600000'   # 60% on 1M (W187 round-2 codex T1 conf=0.9; mirrors settings.json L25)
 160: $env:CONTEXT_WINDOW_COMPACT_HIGH_TOKENS = '650000'   # 65% on 1M (W187 round-2; rot-zone progression)
 161: $env:CONTEXT_WINDOW_COMPACT_CRIT_TOKENS = '700000'   # 70% on 1M (W187 round-2 codex T1 prescription #2; preserves 100k buffer before 80% autocompact per auto-compact-discipline.md Rank #3 invariant)

auto-compact-discipline:
  26: ## The rule
  27: 
  28: When working in long-arc /loop sessions (≥4h wall-clock OR multi-Bundle ship cycles OR cron-driven autonomous arcs), context bloat dominates token cost. The CC-runtime autocompact at ~80% threshold fires blind and produces lossy summaries (per `karpathy-adapted.md §5`). SOTA auto-compact discipline is **pre-emptive, ranked, and routes-around the autocompact mechanism entirely**.
  29: 
  30: ## Ranked recipe (codex T1 ranking from /goal P2[B] partial trace 2026-05-13)
  31: 
  32: ### Rank #1 — context-mode `ctx_batch_execute` (PRIMARY, ~98% savings)
  33: 
  34: **When**: any command/probe/script producing >20 lines of output. Multi-command batches with multiple search queries.
  35: 
  36: **How**:
  37: ```
  38: mcp__plugin_context-mode_context-mode__ctx_batch_execute(
  39:   commands: [{label, command}, ...],
  40:   queries: [<5-8 specific questions>],
  41:   concurrency: 4-8 for I/O-bound batches
  42: )
  43: ```
  44: 
  45: Raw stdout/output indexed into FTS5 in subprocess sandbox; only the search-result excerpts enter context. **Single batch_execute call replaces 30+ ctx_execute + 10+ ctx_search calls**.
  46: 
  47: **Sub-variants**:
  48: - `ctx_execute(language: shell|python|javascript, code, intent: "...")` — single command with intent → indexed if output >5KB, returns titled previews
  49: - `ctx_execute_file(path, language, code)` — read+process file content in sandbox; only printed result enters context
  50: - `ctx_fetch_and_index(requests: [{url, source}], concurrency: 4-8)` — replaces WebFetch; raw HTML stays in sandbox, ~3KB preview + searchable knowledge base
  51: 
  52: ### Rank #2 — repomix pack→grep workflow (~70% compression for repo-scope audits)
  53: 
  54: **When**: line-by-line auditing a `Z:/repos/deps/<repo>` subtree spanning ≥5 files. Replaces 10+ Read calls.
  55: 
  56: **How** (per `Z:/repos/deps/repomix/src/mcp/mcpServer.ts:20-23 @ HEAD 7dfd2b96`):
  57: 1. **Pack**: `mcp__repomix__pack_codebase(directory, compress=true)` → returns `outputId`. Tree-sitter compression ~70% per `Z:/repos/deps/repomix/README.md:1089 @ 7dfd2b96`.
  58: 2. **Grep**: `mcp__repomix__grep_repomix_output(outputId, pattern, contextLines=5)` for incremental retrieval — preferred over re-packing uncompressed per README:979.
  59: 3. **Skill persist** (if learning is durably reusable): **DO NOT** use `mcp__repomix__generate_skill(directory, skillName)` for routine auto-compact reuse — that primitive writes `.claude/skills/<name>/SKILL.md` outside the documented install/provenance path, violating cardinal-rule-5 install-priority + cardinal-rule-6 official-native-channel. Instead: (a) persist topic-scoped findings to `.claude/projects/*/memory/` per Karpathy §5 Layer-3 compiled wiki (no install-class artifact created), OR (b) escalate as install-class candidate via sota-researcher dispatch with convergence-gate Axis-1+2+3 verification + Section 14 marketplace install path + `docs/install-provenance.md` row. Local `generate_skill` invocations bypass T1+T2 audit and provenance log.
  60: 
  61: ### Rank #3 — Pre-emptive `/compact <hint>` (superpowers + Karpathy §5 layered)
  62: 
  63: **When**: context approaches 300k tokens (rot threshold on Opus 4.7 per Thariq 2026-04-16 at `coordination.md §12 Rewind-first` row Mid-task hint). **NEVER let CC autocompact fire blind at 80%**.
  64: 
  65: **How**: invoke `/compact` with a focused hint that steers the lossy summary toward retained-value content:
  66: ```
  67: /compact focus on Bundle ship cumulative state and active queue, drop verbose codex T1 verdict bodies
  68: ```
  69: 
  70: Per `coordination.md §12` row 2: hint steered summary BEFORE rot dominates. Karpathy §5 Layer-3 compiled wiki is the equivalent persistent-storage discipline.
  71: 
  72: ### Rank #3.5 — PreCompact hook layer (4-layer incumbent stack)
  73: 
  74: **When**: `/compact` manual OR auto triggers the PreCompact preservation stack; ECC suggest-compact is the adjacent PreToolUse Edit|Write threshold-suggestion layer (NOT PreCompact-class). Matching hooks run in parallel per Anthropic CC hooks contract.
  75: 
  76: | Layer | Plugin | Surface | Event | LOC |
  77: |---|---|---|---|---|
  78: | Prompt-augmentation | fcakyon/intelligent-compact | 6-section priority injection (A-F) | PreCompact | 71 |
  79: | State-save audit | ECC pre-compact | compaction-log.txt timestamp | PreCompact | 48 |
  80: | Session-event SQLite | context-mode precompact.mjs | <2KB XML resume-snapshot | PreCompact | 76 |
  81: | Tool-call threshold | ECC suggest-compact | `/compact` suggestion at N=50 + every 25 | PreToolUse Edit\|Write | 80 |
  82: 
  83: **CRITICAL**: per CC v2.1.105+, PreCompact `{"decision":"block"}` OR exit 2 BLOCKS compaction — reserve for hard-block scenarios. All 4 layers above currently exit 0 / emit no block decision = SAFE (advisory-only). suggest-compact is threshold-adjacent (different event surface), not part of the PreCompact 3-layer preservation stack.
  84: 
  85: Cite classes (per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8):
  86: - **TIER-1-DIRECT** installed hook sources at runtime HEAD `eec69e21ee37ae2f235016361494842a08013a9b`:
  87:   - `Z:/claude-sota-installed/.claude/plugins/cache/claude-settings/intelligent-compact/1.0.0/hooks/scripts/precompact_priorities.sh:1-71`
  88:   - `Z:/claude-sota-installed/.claude/plugins/cache/everything-claude-code/everything-claude-code/2.0.0-rc.1/scripts/hooks/pre-compact.js:24-31,41-47`
  89:   - `Z:/claude-sota-installed/.claude/plugins/cache/everything-claude-code/everything-claude-code/2.0.0-rc.1/scripts/hooks/suggest-compact.js:30-33,69-70`
  90:   - `Z:/claude-sota-installed/.claude/plugins/cache/context-mode/context-mode/1.0.111/hooks/precompact.mjs:1-76`
  91: - **TIER-1-DIRECT** Anthropic CC hooks contract: `https://code.claude.com/docs/en/hooks` (PreCompact event spec + exit 2 / `{"decision":"block"}` semantic).
  92: - **TIER-3-LOCAL-OPERATOR-DERIVED**: Agent C W177 F2 R1-R3 INCUMBENT-KEEP+PROVIDER-COMPLEMENT verdict (`tmp/wave177-fire2-agentC-autocompact-r1r2r3-2026-05-13.md`); Mia 4/4 file-existence probes 2026-05-13; codex T1 NEEDS-REVISION conf=0.91 Pattern A apply (verdict at `.claude/state/codex_consult_w177_rank35_addition_OUT.txt`). `effective_tier=TIER-3-LOCAL-COMPOSITION` per rule #8 MIN_PRECEDENCE.
  93: 
  94: ## Supporting disciplines (Rank #4-#7)
  95: 
  96: ### Rank #4 — Rewind-first on failure (coordination.md §12)
  97: 
  98: When an approach fails mid-iteration, prefer `/rewind` to last sound state over layering corrections. Drops failed-tail + retains good reads. Per Thariq table at `coordination.md §12`:
  99: 
 100: | Situation | Use | Why |
 101: |---|---|---|
 102: | Explored N files, tried approach A, failed | **Rewind** to after-reads, re-prompt with learning | Keep expensive reads, drop failed attempt |
 103: | Session bloated mid-task | `/compact <hint>` | Steered lossy summary |
 104: | Genuinely new task | `/clear` + brief | Zero rot, controlled carry-over |
 105: | High-volume exploration, only conclusion matters | Subagent fork | Tool noise GC'd on exit |
 106: 
 107: ### Rank #5 — Karpathy §5 3-layer progressive disclosure
 108: 
 109: Per `karpathy-adapted.md §5 Wiki Compounding Surface`:
 110: - **Layer 1 chronological log**: `.claude/state/*.jsonl` (codex_review_HEAD_*.jsonl / codex_consult_*_OUT.txt / mcp_health.jsonl / subagent_transcripts.jsonl)
 111: - **Layer 2 index**: `.claude/projects/*/memory/MEMORY.md` (≤200 lines / 150-char one-line topic pointers)
 112: - **Layer 3 compiled wiki**: `docs/karpathy-llm-wiki-practice.md` + `.claude/rules/*.md` + per-topic `memory/` files
 113: 
 114: **MEMORY.md discipline**: NEVER write content directly; always one-line pointer with `[Title](file.md) — hook` format. If a top entry exceeds ~3000 chars, archive immediately (this rule's codification trigger).
 115: 
 116: ### Rank #6 — Pre-emptive arg truncation (deepagents pattern, doc-only port)
 117: 
 118: Per `Z:/repos/deps/deepagents/.../summarization.py:122-149 @ 95f845d2`: TruncateArgsSettings TypedDict — for long-arc /loop fires touching Edit/Write/execute args with content >4KB, retain only first ~20-1000 chars of the arg with a `"[truncated — N chars; see file/commit for full content]"` placeholder. NOT active middleware in claude-sota-installed (no Python SDK runtime) — but discipline applies operationally: when args bloat, persist the full content to disk first (Write tool), then reference path in subsequent steps.
 119: 
 120: ### Rank #7 — Subagent forks for high-output exploration
 121: 
 122: Per `parallel-agent-wave.md §Fork-vs-fresh routing` + `team-orch-patterns.md §1M context calibration`: dispatch tool-noisy exploration into subagent fork (forked = inherits parent context, conversation-history-cached) OR fresh subagent (zero parent context, isolation). The subagent's tool output GC'd on exit — only the final return enters parent context.
 123: 
 124: ## How to apply (operational checklist)
 125: 
 126: For every long-arc /loop fire:
 127: 
 128: 1. **At session start**: check `[████░░░] N/1000k` context indicator. If >20% at start, immediately invoke `/compact <hint>` BEFORE any work
 129: 2. **For every >20-line probe**: route through `ctx_batch_execute` (multi-command + queries) OR `ctx_execute` (single command + intent)
 130: 3. **For every repo-scope audit ≥5 files**: pack with repomix BEFORE Reading individual files
 131: 4. **For every URL fetch**: prefer `ctx_fetch_and_index` over `WebFetch` (raw HTML stays in sandbox)
 132: 5. **At ~250k context**: invoke `/compact <hint>` pre-emptively (NOT wait for autocompact at 80%)
 133: 6. **At ~300k context**: STOP planning new work; ship current Bundle + commit + `/clear` between Bundle cycles
 134: 7. **On approach-failure**: rewind to last-sound-state with `/rewind`, NEVER layer corrections
 135: 8. **MEMORY.md hygiene**: if any entry exceeds ~300 chars or grows beyond a single line of pointer text, immediately archive + reset to proper one-line index format
 136: 
 137: ## Anti-patterns
 138: 
 139: - **Let autocompact fire blind at 80%** — refuted by `karpathy-adapted.md §5` + Thariq tip 2026-04-16. Autocompact at the model's "least intelligent point" produces lossy summaries with no operator steering. Pre-emptive `/compact <hint>` is the SOTA.
 140: - **Read large files into context for analysis** — refuted by file_writing_policy + ctx_execute discipline. Use `ctx_execute_file(path, code)` to process in sandbox; only printed answer enters context.

upstream gsd-context-monitor:
   1: #!/usr/bin/env node
   2: // gsd-hook-version: {{GSD_VERSION}}
   3: // Context Monitor - PostToolUse/AfterTool hook (Gemini uses AfterTool)
   4: // Reads context metrics from the statusline bridge file and injects
   5: // warnings when context usage is high. This makes the AGENT aware of
   6: // context limits (the statusline only shows the user).
   7: //
   8: // How it works:
   9: // 1. The statusline hook writes metrics to /tmp/claude-ctx-{session_id}.json
  10: // 2. This hook reads those metrics after each tool use
  11: // 3. When remaining context drops below thresholds, it injects a warning
  12: //    as additionalContext, which the agent sees in its conversation
  13: //
  14: // Thresholds:
  15: //   WARNING  (remaining <= 35%): Agent should wrap up current task
  16: //   CRITICAL (remaining <= 25%): Agent should stop immediately and save state
  17: //
  18: // Debounce: 5 tool uses between warnings to avoid spam
  19: // Severity escalation bypasses debounce (WARNING -> CRITICAL fires immediately)
  20: 
  21: const fs = require('fs');
  22: const os = require('os');
  23: const path = require('path');
  24: const { spawn } = require('child_process');
  25: 
  26: const WARNING_THRESHOLD = 35;  // remaining_percentage <= 35%
  27: const CRITICAL_THRESHOLD = 25; // remaining_percentage <= 25%
  28: const STALE_SECONDS = 60;      // ignore metrics older than 60s
  29: const DEBOUNCE_CALLS = 5;      // min tool uses between warnings
  30: 
  31: let input = '';
  32: // Timeout guard: if stdin doesn't close within 10s (e.g. pipe issues on
  33: // Windows/Git Bash, or slow Claude Code piping during large outputs),
  34: // exit silently instead of hanging until Claude Code kills the process
  35: // and reports "hook error". See #775, #1162.
  36: const stdinTimeout = setTimeout(() => process.exit(0), 10000);
  37: process.stdin.setEncoding('utf8');
  38: process.stdin.on('data', chunk => input += chunk);
  39: process.stdin.on('end', () => {
  40:   clearTimeout(stdinTimeout);
  41:   try {
  42:     const data = JSON.parse(input);
  43:     const sessionId = data.session_id;
  44: 
  45:     if (!sessionId) {
  46:       process.exit(0);
  47:     }
  48: 
  49:     // Reject session IDs that contain path traversal sequences or path separators.
  50:     // session_id is used to construct file paths in /tmp — an unsanitized value
  51:     // could escape the temp directory and read or write arbitrary files.
  52:     if (/[/\\]|\.\./.test(sessionId)) {
  53:       process.exit(0);
  54:     }
  55: 
  56:     // Check if context warnings are disabled via config.
  57:     // Quick sentinel check: skip config read entirely for non-GSD projects (#P2.5).
  58:     const cwd = data.cwd || process.cwd();
  59:     const planningDir = path.join(cwd, '.planning');
  60:     if (fs.existsSync(planningDir)) {
  61:       try {
  62:         const configPath = path.join(planningDir, 'config.json');
  63:         const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  64:         if (config.hooks?.context_warnings === false) {
  65:           process.exit(0);
  66:         }
  67:       } catch (e) {
  68:         // Ignore config read/parse errors (config may not exist in .planning/)
  69:       }
  70:     }
  71: 
  72:     const tmpDir = os.tmpdir();
  73:     const metricsPath = path.join(tmpDir, `claude-ctx-${sessionId}.json`);
  74: 
  75:     // If no metrics file, this is a subagent or fresh session -- exit silently
  76:     if (!fs.existsSync(metricsPath)) {
  77:       process.exit(0);
  78:     }
  79: 
  80:     const metrics = JSON.parse(fs.readFileSync(metricsPath, 'utf8'));
  81:     const now = Math.floor(Date.now() / 1000);
  82: 
  83:     // Ignore stale metrics
  84:     if (metrics.timestamp && (now - metrics.timestamp) > STALE_SECONDS) {
  85:       process.exit(0);
  86:     }
  87: 
  88:     const remaining = metrics.remaining_percentage;
  89:     const usedPct = metrics.used_pct;
  90: 
  91:     // No warning needed
  92:     if (remaining > WARNING_THRESHOLD) {
  93:       process.exit(0);
  94:     }
  95: 
  96:     // Debounce: check if we warned recently
  97:     const warnPath = path.join(tmpDir, `claude-ctx-${sessionId}-warned.json`);
  98:     let warnData = { callsSinceWarn: 0, lastLevel: null };
  99:     let firstWarn = true;
 100: 
 101:     if (fs.existsSync(warnPath)) {
 102:       try {
 103:         warnData = JSON.parse(fs.readFileSync(warnPath, 'utf8'));
 104:         firstWarn = false;
 105:       } catch (e) {
 106:         // Corrupted file, reset
 107:       }
 108:     }
 109: 
 110:     warnData.callsSinceWarn = (warnData.callsSinceWarn || 0) + 1;
 111: 
 112:     const isCritical = remaining <= CRITICAL_THRESHOLD;
 113:     const currentLevel = isCritical ? 'critical' : 'warning';
 114: 
 115:     // Emit immediately on first warning, then debounce subsequent ones
 116:     // Severity escalation (WARNING -> CRITICAL) bypasses debounce
 117:     const severityEscalated = currentLevel === 'critical' && warnData.lastLevel === 'warning';
 118:     if (!firstWarn && warnData.callsSinceWarn < DEBOUNCE_CALLS && !severityEscalated) {
 119:       // Update counter and exit without warning
 120:       fs.writeFileSync(warnPath, JSON.stringify(warnData));
 121:       process.exit(0);
 122:     }
 123: 
 124:     // Reset debounce counter
 125:     warnData.callsSinceWarn = 0;
 126:     warnData.lastLevel = currentLevel;
 127:     fs.writeFileSync(warnPath, JSON.stringify(warnData));
 128: 
 129:     // Detect if GSD is active (has .planning/STATE.md in working directory)
 130:     const isGsdActive = fs.existsSync(path.join(cwd, '.planning', 'STATE.md'));
 131: 
 132:     // On CRITICAL with active GSD project, auto-record session state as a
 133:     // breadcrumb for /gsd-resume-work (#1974). Fire-and-forget subprocess —
 134:     // doesn't block the hook or the agent. Fires ONCE per CRITICAL session,
 135:     // guarded by warnData.criticalRecorded to prevent repeated overwrites
 136:     // of the "crash moment" record on every debounce cycle.
 137:     if (isCritical && isGsdActive && !warnData.criticalRecorded) {
 138:       try {
 139:         // Runtime-agnostic path: this hook lives at <runtime-config>/hooks/
 140:         // and gsd-tools.cjs lives at <runtime-config>/get-shit-done/bin/.
 141:         // Using __dirname makes this work on Claude Code, OpenCode, Gemini,
 142:         // Kilo, etc. without hardcoding ~/.claude/.
 143:         const gsdTools = path.join(__dirname, '..', 'get-shit-done', 'bin', 'gsd-tools.cjs');
 144:         // Coerce usedPct to a safe number in case bridge file is malformed
 145:         const safeUsedPct = Number(usedPct) || 0;
 146:         const stoppedAt = `context exhaustion at ${safeUsedPct}% (${new Date().toISOString().split('T')[0]})`;
 147:         spawn(
 148:           process.execPath,
 149:           [gsdTools, 'state', 'record-session', '--stopped-at', stoppedAt],
 150:           { cwd, detached: true, stdio: 'ignore' }
 151:         ).unref();
 152:         warnData.criticalRecorded = true;
 153:         // Persist the sentinel so subsequent debounce cycles don't re-fire
 154:         fs.writeFileSync(warnPath, JSON.stringify(warnData));
 155:       } catch { /* non-critical — don't let state recording break the hook */ }
 156:     }
 157: 
 158:     // Build advisory warning message (never use imperative commands that
 159:     // override user preferences — see #884)
 160:     let message;
 161:     if (isCritical) {
 162:       message = isGsdActive
 163:         ? `CONTEXT CRITICAL: Usage at ${usedPct}%. Remaining: ${remaining}%. ` +
 164:           'Context is nearly exhausted. Do NOT start new complex work or write handoff files — ' +
 165:           'GSD state is already tracked in STATE.md. Inform the user so they can run ' +
 166:           '/gsd-pause-work at the next natural stopping point.'
 167:         : `CONTEXT CRITICAL: Usage at ${usedPct}%. Remaining: ${remaining}%. ` +
 168:           'Context is nearly exhausted. Inform the user that context is low and ask how they ' +
 169:           'want to proceed. Do NOT autonomously save state or write handoff files unless the user asks.';
 170:     } else {
 171:       message = isGsdActive
 172:         ? `CONTEXT WARNING: Usage at ${usedPct}%. Remaining: ${remaining}%. ` +
 173:           'Context is getting limited. Avoid starting new complex work. If not between ' +
 174:           'defined plan steps, inform the user so they can prepare to pause.'
 175:         : `CONTEXT WARNING: Usage at ${usedPct}%. Remaining: ${remaining}%. ` +
 176:           'Be aware that context is getting limited. Avoid unnecessary exploration or ' +
 177:           'starting new complex work.';
 178:     }
 179: 
 180:     const output = {
 181:       hookSpecificOutput: {
 182:         hookEventName: process.env.GEMINI_API_KEY ? "AfterTool" : "PostToolUse",
 183:         additionalContext: message
 184:       }
 185:     };
 186: 
 187:     process.stdout.write(JSON.stringify(output));
 188:   } catch (e) {
 189:     // Silent fail -- never block tool execution
 190:     process.exit(0);
 191:   }
 192: });

Output markdown artifact, end with JSON object exactly.

2026-05-14T05:26:11.482862Z ERROR codex_api::endpoint::responses_websocket: failed to connect to websocket: IO error: no native root CA certificates found (errors: [Error { context: "failed to open current user certificate store", kind: Os(Os { code: 5, kind: PermissionDenied, message: "Access is denied." }) }]), url: wss://chatgpt.com/backend-api/codex/responses
2026-05-14T05:26:11.505197Z ERROR codex_api::endpoint::responses_websocket: failed to connect to websocket: IO error: no native root CA certificates found (errors: [Error { context: "failed to open current user certificate store", kind: Os(Os { code: 5, kind: PermissionDenied, message: "Access is denied." }) }]), url: wss://chatgpt.com/backend-api/codex/responses
2026-05-14T05:26:11.710155Z ERROR codex_api::endpoint::responses_websocket: failed to connect to websocket: IO error: no native root CA certificates found (errors: [Error { context: "failed to open current user certificate store", kind: Os(Os { code: 5, kind: PermissionDenied, message: "Access is denied." }) }]), url: wss://chatgpt.com/backend-api/codex/responses
ERROR: Reconnecting... 2/5
2026-05-14T05:26:12.121050Z ERROR codex_api::endpoint::responses_websocket: failed to connect to websocket: IO error: no native root CA certificates found (errors: [Error { context: "failed to open current user certificate store", kind: Os(Os { code: 5, kind: PermissionDenied, message: "Access is denied." }) }]), url: wss://chatgpt.com/backend-api/codex/responses
ERROR: Reconnecting... 3/5
2026-05-14T05:26:12.879096Z ERROR codex_api::endpoint::responses_websocket: failed to connect to websocket: IO error: no native root CA certificates found (errors: [Error { context: "failed to open current user certificate store", kind: Os(Os { code: 5, kind: PermissionDenied, message: "Access is denied." }) }]), url: wss://chatgpt.com/backend-api/codex/responses
ERROR: Reconnecting... 4/5
2026-05-14T05:26:14.450550Z ERROR codex_api::endpoint::responses_websocket: failed to connect to websocket: IO error: no native root CA certificates found (errors: [Error { context: "failed to open current user certificate store", kind: Os(Os { code: 5, kind: PermissionDenied, message: "Access is denied." }) }]), url: wss://chatgpt.com/backend-api/codex/responses
ERROR: Reconnecting... 5/5
2026-05-14T05:26:17.645099Z ERROR codex_api::endpoint::responses_websocket: failed to connect to websocket: IO error: no native root CA certificates found (errors: [Error { context: "failed to open current user certificate store", kind: Os(Os { code: 5, kind: PermissionDenied, message: "Access is denied." }) }]), url: wss://chatgpt.com/backend-api/codex/responses
ERROR: Reconnecting... 1/5
ERROR: Reconnecting... 2/5
ERROR: Reconnecting... 3/5
ERROR: Reconnecting... 4/5
ERROR: Reconnecting... 5/5
ERROR: stream disconnected before completion: error sending request for url (https://chatgpt.com/backend-api/codex/responses)
ERROR: stream disconnected before completion: error sending request for url (https://chatgpt.com/backend-api/codex/responses)
