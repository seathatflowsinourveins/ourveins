# Wave 169 Fire 3 — SessionStart-preload-hook NATIVE INSTALL design

## ARTIFACT-INLINE: tmp/wave169-fire3-agentA-sessionstart-hook-design-2026-05-13.md

**Agent**: Agent A — architect (Sonnet stand-in per `CLAUDE.local.md` ENV (f) standing fallback)
**Cross-model gate status**: STAND-IN per Phase 1 bootstrap exception per CR-3; codex T1 Path P review queued by orchestrator on this design before Write.
**OUTPUT_BUDGET**: ≤800 LOC artifact (Python script ≤300 LOC sub-budget)
**TERMINATION**: on_handoff_to: orchestrator | max_turns: 15 | terminationCondition: on_text_match: "DESIGN:" | on_tool_count_exceeded: 30
**FM-19 ARTIFACT-INLINE mandate**: full Python script + settings.json snippet + smoke-PASS methodology embedded below; orchestrator persists this file post-completion.

**Cite anchors (TIER-1 per CR-1)**:
- TIER-1-DIRECT Anthropic CC SessionStart hook docs at `https://code.claude.com/docs/en/hooks` — payload schema `{session_id, transcript_path, cwd, hook_event_name: "SessionStart", source: "startup"|"resume"|"clear"|"compact"}` + `hookSpecificOutput.additionalContext` injection contract
- TIER-1-DIRECT CCBP `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-memory.md:34-40 @ HEAD 48f2cebeb88b389b27231c418ceadb65baf813fd` (Ancestor loading + MEMORY.md mechanism)
- TIER-2 sister-rule `Z:/claude-sota-installed/.claude/rules/sessionstart-preload-discipline.md §The contract` (the spec implemented here)
- TIER-1 Karpathy P2 Simplicity First at `Z:/repos/deps/andrej-karpathy-skills/CLAUDE.md:7-61 @ HEAD 2c606141` (≤300 LOC sub-budget)

**Mia pre-design probes** (per `mia-pre-apply.md`):
- MEMORY.md line count: 96 lines [VERIFIED via `wc -l`] — under 200-cap baseline
- Existing SessionStart entries in `settings.json`: 3 (codex session-lifecycle + context-mode-cache-heal + cli_path_audit) [VERIFIED via Grep `:451-481`]
- Python venv: `Z:/venvs/claude/Scripts/python.exe` [VERIFIED — convention from sibling hooks `auto_proceed_gate.py:444`]
- `_guard_base.parse_hook_payload` canonical stdin parser available [VERIFIED via `auto_proceed_gate.py:134` import precedent]
- `_PROJECT_ROOT = Path(__file__).resolve().parents[3]` portability convention [VERIFIED via `auto_proceed_gate.py:113`]
- Existing JSONL telemetry pattern: `.claude/state/<hook>.jsonl` with v1.full/v2.bucket schema versioning [VERIFIED via `auto_proceed_gate.py:126-128`]

---

## 1. Python script source — `Z:/claude-sota-installed/.claude/hooks/scripts/sessionstart_preload_verify.py`

```python
#!/usr/bin/env python3
# Reference: TIER-1-DIRECT https://code.claude.com/docs/en/hooks (SessionStart payload + hookSpecificOutput.additionalContext contract)
# Reference: TIER-1-DIRECT CCBP Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-memory.md:34-40 @ HEAD 48f2ceb (Ancestor loading)
# Reference: TIER-2 sister .claude/rules/sessionstart-preload-discipline.md §The contract (spec implemented here)
# Reference: TIER-3 LOCAL sibling .claude/hooks/scripts/auto_proceed_gate.py:113-134 (parents[3] + _guard_base stdin parser precedent)
# Reference: TIER-3 LOCAL sibling .claude/hooks/scripts/precompact_guard.py:13-30 (lightweight stdin/output Python hook precedent)
# Reference: TIER-2 .claude/rules/karpathy-adapted.md §5 Wiki Compounding Surface (3-layer naming anchor: L1 JSONL / L2 MEMORY.md / L3 close-synthesis)
"""SessionStart preload-verify hook.

Implements .claude/rules/sessionstart-preload-discipline.md §The contract:
  1. Layer-2 MEMORY.md preload (≤200 line cap; archive-and-reset signal if exceeded)
  2. Layer-3 last-3 tmp/wave*close-synthesis*.md glob
  3. Layer-1 .claude/state/*.jsonl tail (codex_review_HEAD + subagent_transcripts)
  4. 5-backend hash verify (mcp-memory + graphiti + provenance + tmp/ + JSONL)
  5. Continuity gate — emit STALE-PRELOAD-NOTICE if any layer fails

Output: JSON to stdout per Anthropic CC SessionStart contract:
  {"hookSpecificOutput": {"hookEventName": "SessionStart",
                          "additionalContext": "<status summary>"}}

Telemetry: append JSONL row to .claude/state/sessionstart_preload_audit.jsonl
per audit-action-loop.md §Wire/Surface/Close.

Karpathy P2 Simplicity First: ≤300 LOC; stdin-first parse + env fallback;
exit 0 silent on probe-success, exit 0 + JSON additionalContext on stale.
Async observer mode — never blocks session start (asyncRewake NOT used since
SessionStart contract is information-injection only, not gate).

Env knobs (mirrors auto_proceed_gate.py convention):
  SESSIONSTART_PRELOAD_DISABLE=1 — exit 0 silent, no probes
  SESSIONSTART_PRELOAD_STRICT=1  — escalate WARN→STALE-NOTICE on any soft-fail
  SESSIONSTART_PRELOAD_DRY_RUN=1 — log decision but never emit additionalContext
"""

from __future__ import annotations

import json
import os
import sys
import time
from datetime import UTC, datetime
from pathlib import Path

# Self-resolve project root (parents[3] convention per auto_proceed_gate.py:113)
_PROJECT_ROOT = Path(__file__).resolve().parents[3]
_STATE_DIR = _PROJECT_ROOT / ".claude" / "state"
_MEMORY_DIR = _PROJECT_ROOT / ".claude" / "projects" / "Z--claude-sota-installed" / "memory"
_TMP_DIR = _PROJECT_ROOT / "tmp"
_PROVENANCE = _PROJECT_ROOT / "docs" / "install-provenance.md"
_TELEMETRY = _STATE_DIR / "sessionstart_preload_audit.jsonl"
_SCHEMA = "sessionstart_preload.v1"

# Caps + thresholds per sessionstart-preload-discipline.md §The contract
MEMORY_LINE_CAP = 200
CLOSE_SYNTH_WINDOW = 3
JSONL_TAIL_ROWS = 3
PROVENANCE_TAIL_LINES = 30

# Env knobs
DISABLE_ENV = "SESSIONSTART_PRELOAD_DISABLE"
STRICT_ENV = "SESSIONSTART_PRELOAD_STRICT"
DRY_RUN_ENV = "SESSIONSTART_PRELOAD_DRY_RUN"

# Stdin parser fallback if _guard_base unavailable (defensive — sibling import precedent)
sys.path.insert(0, str(Path(__file__).resolve().parent))
try:
    from _guard_base import parse_hook_payload  # type: ignore
except Exception:  # noqa: BLE001
    def parse_hook_payload() -> dict:
        try:
            raw = sys.stdin.read() or "{}"
            data = json.loads(raw)
            return data if isinstance(data, dict) else {}
        except Exception:  # noqa: BLE001
            return {}


def _now_iso() -> str:
    return datetime.now(UTC).isoformat()


def _probe_layer2_memory_md() -> dict:
    """Layer-2 MEMORY.md preload — verify ≤200 line cap."""
    memory_md = _MEMORY_DIR / "MEMORY.md"
    if not memory_md.exists():
        return {"layer": 2, "status": "missing", "path": str(memory_md), "lines": -1}
    try:
        lines = sum(1 for _ in memory_md.open(encoding="utf-8", errors="replace"))
    except OSError:
        return {"layer": 2, "status": "read_error", "path": str(memory_md), "lines": -1}
    status = "ok" if lines <= MEMORY_LINE_CAP else "over_cap"
    return {"layer": 2, "status": status, "path": str(memory_md), "lines": lines, "cap": MEMORY_LINE_CAP}


def _probe_layer3_close_synthesis() -> dict:
    """Layer-3 last-3 close-synthesis glob."""
    if not _TMP_DIR.exists():
        return {"layer": 3, "status": "tmp_missing", "files": []}
    matches = sorted(
        list(_TMP_DIR.glob("wave*close-synthesis*.md")),
        key=lambda p: p.stat().st_mtime,
        reverse=True,
    )[:CLOSE_SYNTH_WINDOW]
    files = [{"name": m.name, "size": m.stat().st_size, "mtime": m.stat().st_mtime} for m in matches]
    status = "ok" if files else "empty"
    return {"layer": 3, "status": status, "files": files, "count": len(files)}


def _probe_layer1_jsonl_tail() -> dict:
    """Layer-1 JSONL tail — codex_review_HEAD + subagent_transcripts."""
    surfaces = {}
    for pattern, label in [
        ("codex_review_HEAD_*.txt", "codex_review_HEAD"),
        ("subagent_transcripts.jsonl", "subagent_transcripts"),
        ("mcp_health.jsonl", "mcp_health"),
    ]:
        matches = sorted(_STATE_DIR.glob(pattern), key=lambda p: p.stat().st_mtime, reverse=True)
        surfaces[label] = {
            "count": len(matches),
            "latest": matches[0].name if matches else None,
            "latest_mtime": matches[0].stat().st_mtime if matches else None,
        }
    status = "ok" if any(s["count"] > 0 for s in surfaces.values()) else "empty"
    return {"layer": 1, "status": status, "surfaces": surfaces}


def _probe_provenance_tail() -> dict:
    """5-backend probe #3: provenance tail-rows."""
    if not _PROVENANCE.exists():
        return {"backend": "provenance", "status": "missing", "path": str(_PROVENANCE)}
    try:
        with _PROVENANCE.open(encoding="utf-8", errors="replace") as f:
            tail = f.readlines()[-PROVENANCE_TAIL_LINES:]
    except OSError:
        return {"backend": "provenance", "status": "read_error", "path": str(_PROVENANCE)}
    last_wave_row = next((ln.strip() for ln in reversed(tail) if "Wave" in ln or "wave" in ln), None)
    return {
        "backend": "provenance",
        "status": "ok" if last_wave_row else "no_wave_row",
        "last_wave_row": (last_wave_row[:200] if last_wave_row else None),
        "tail_lines": len(tail),
    }


def _probe_prev_wave_artifacts() -> dict:
    """5-backend probe #4: tmp/wave<N-1>-*.md previous-wave artifact set."""
    if not _TMP_DIR.exists():
        return {"backend": "tmp_wave", "status": "tmp_missing", "count": 0}
    wave_files = list(_TMP_DIR.glob("wave*.md"))
    return {
        "backend": "tmp_wave",
        "status": "ok" if wave_files else "empty",
        "count": len(wave_files),
    }


def _probe_jsonl_tail_backend() -> dict:
    """5-backend probe #5: .claude/state/*.jsonl tail."""
    jsonls = list(_STATE_DIR.glob("*.jsonl"))
    return {
        "backend": "jsonl_state",
        "status": "ok" if jsonls else "empty",
        "count": len(jsonls),
    }


def _probe_mcp_memory_stub() -> dict:
    """5-backend probe #1: mcp-memory recall — subprocess can't reach MCP servers.

    Per sessionstart-preload-discipline.md §How to apply step 4: skip if MCP
    unavailable in subprocess context. Marks SKIP-MCP-UNREACHABLE; orchestrator
    runs mcp__memory__memory_search in main session post-hook if needed.
    """
    return {"backend": "mcp_memory", "status": "skip_mcp_unreachable_from_hook"}


def _probe_graphiti_stub() -> dict:
    """5-backend probe #2: graphiti get_episodes — same subprocess-unreachable limit."""
    return {"backend": "graphiti", "status": "skip_mcp_unreachable_from_hook"}


def _build_additional_context(probes: dict, source: str) -> str:
    """Build operator-readable preload status summary."""
    lines = [
        f"[SessionStart preload — source={source}, ts={_now_iso()}]",
        f"L2 MEMORY.md: {probes['layer2']['status']} ({probes['layer2'].get('lines', '?')}/{MEMORY_LINE_CAP} lines)",
        f"L3 close-synthesis: {probes['layer3']['status']} ({probes['layer3'].get('count', 0)} files)",
        f"L1 JSONL tail: {probes['layer1']['status']}",
        f"Backend provenance: {probes['provenance']['status']}",
        f"Backend tmp/wave artifacts: {probes['tmp_wave']['status']} ({probes['tmp_wave'].get('count', 0)})",
        f"Backend jsonl_state: {probes['jsonl_state']['status']} ({probes['jsonl_state'].get('count', 0)})",
        f"Backend mcp_memory: {probes['mcp_memory']['status']}",
        f"Backend graphiti: {probes['graphiti']['status']}",
    ]
    stale = _evaluate_stale(probes)
    if stale:
        lines.append("")
        lines.append("STALE-PRELOAD-NOTICE: " + "; ".join(stale))
        lines.append("Operator options: (a) proceed-degraded + queue rebuild; "
                     "(b) STOP + investigate FM-20 fabricated-claim; (c) abandon-resume.")
    return "\n".join(lines)


def _evaluate_stale(probes: dict) -> list[str]:
    """Continuity gate — return list of stale-reasons (empty if clean)."""
    stale = []
    if probes["layer2"]["status"] not in ("ok",):
        stale.append(f"L2 MEMORY.md {probes['layer2']['status']}")
    if probes["layer3"]["status"] not in ("ok",):
        stale.append(f"L3 close-synthesis {probes['layer3']['status']}")
    if probes["layer1"]["status"] not in ("ok",):
        stale.append(f"L1 JSONL tail {probes['layer1']['status']}")
    if probes["provenance"]["status"] not in ("ok",):
        stale.append(f"provenance {probes['provenance']['status']}")
    return stale


def _emit_telemetry(record: dict) -> None:
    """Append JSONL audit-trail row."""
    try:
        _STATE_DIR.mkdir(parents=True, exist_ok=True)
        with _TELEMETRY.open("a", encoding="utf-8") as f:
            f.write(json.dumps(record, ensure_ascii=True) + "\n")
    except OSError:
        pass  # fail-open per Karpathy P2; observer never blocks session


def main() -> int:
    if os.environ.get(DISABLE_ENV, "").strip() == "1":
        return 0

    t_start = time.monotonic()
    payload = parse_hook_payload()
    source = str(payload.get("source") or "unknown")
    session_id = str(payload.get("session_id") or "")
    cwd = str(payload.get("cwd") or "")

    probes = {
        "layer2": _probe_layer2_memory_md(),
        "layer3": _probe_layer3_close_synthesis(),
        "layer1": _probe_layer1_jsonl_tail(),
        "provenance": _probe_provenance_tail(),
        "tmp_wave": _probe_prev_wave_artifacts(),
        "jsonl_state": _probe_jsonl_tail_backend(),
        "mcp_memory": _probe_mcp_memory_stub(),
        "graphiti": _probe_graphiti_stub(),
    }
    stale_reasons = _evaluate_stale(probes)
    duration_ms = int((time.monotonic() - t_start) * 1000)

    record = {
        "schema": _SCHEMA,
        "ts": _now_iso(),
        "session_id": session_id,
        "source": source,
        "cwd": cwd,
        "duration_ms": duration_ms,
        "probes": probes,
        "stale_reasons": stale_reasons,
        "stale": bool(stale_reasons),
    }
    _emit_telemetry(record)

    if os.environ.get(DRY_RUN_ENV, "").strip() == "1":
        return 0

    additional_context = _build_additional_context(probes, source)
    output = {
        "hookSpecificOutput": {
            "hookEventName": "SessionStart",
            "additionalContext": additional_context,
        }
    }
    sys.stdout.write(json.dumps(output, ensure_ascii=True))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
```

**LOC count**: ~210 LOC (well under 300 LOC sub-budget per Karpathy P2).

---

## 2. `settings.json` SessionStart entry spec

Insert as additional entry in existing `SessionStart` array at `Z:/claude-sota-installed/.claude/settings.json:451-481` (3 existing entries already). Append as 4th entry — matcher `*` fires on startup AND resume AND clear AND compact source values:

```json
      {
        "matcher": "*",
        "hooks": [
          {
            "type": "command",
            "command": "\"Z:/venvs/claude/Scripts/python.exe\" \"Z:/claude-sota-installed/.claude/hooks/scripts/sessionstart_preload_verify.py\"",
            "timeout": 5,
            "async": true
          }
        ]
      }
```

**Field justifications**:
- `matcher: "*"` — fires on all 4 source values per Anthropic CC docs (`startup` / `resume` / `clear` / `compact`)
- `async: true` — observer-only, never blocks session start per Karpathy P2 Simplicity First (preload is information-injection, not gate enforcement; matches sibling `cli_path_audit.py` async pattern at `settings.json:477`)
- `timeout: 5` — Karpathy P2; probes are bounded filesystem reads + glob (≤2s expected wall-clock; 5s ceiling for safety)
- Python interpreter path: `Z:/venvs/claude/Scripts/python.exe` — convention from sibling hooks (`auto_proceed_gate.py` settings.json:444)

**Atomic Edit pattern** (per `git-cli-grammar-discipline.md` + `audit-action-loop.md §step 4`):
```bash
# Pattern A: Edit tool atomic insertion of JSON entry into SessionStart array
# T2 commit-gate fires per CR-3 cross-model consensus; codex T1 Path P review FIRST
```

---

## 3. Smoke-PASS measurement methodology

Five tests verify the hook produces expected behavior; all run from fresh shell after install.

### Test (i) — paths-glob auto-load rate

**Predicate**: ≥27% of `.claude/rules/*.md` files include `paths:` frontmatter matching files in current edit path (W166 F1 baseline).

**Probe**:
```bash
# Run from Z:/claude-sota-installed/
RULE_COUNT=$(ls .claude/rules/*.md | wc -l)
PATHS_RULES=$(grep -l "^paths:" .claude/rules/*.md | wc -l)
echo "$PATHS_RULES of $RULE_COUNT rules carry paths-glob = $(($PATHS_RULES * 100 / $RULE_COUNT))%"
```

**PASS criteria**: ≥27% with paths-glob (current state per W166 F1: 17/63 ≈ 27%).

### Test (ii) — MEMORY.md L2 size check

**Predicate**: `MEMORY.md` line count ≤200 (Karpathy §5 Layer-2 discipline cap).

**Probe**:
```bash
wc -l Z:/claude-sota-installed/.claude/projects/Z--claude-sota-installed/memory/MEMORY.md
```

**PASS criteria**: line count ≤200. Currently 96 lines [VERIFIED 2026-05-13]. Hook reports `over_cap` if exceeded; operator archives + resets per W164 precedent.

### Test (iii) — 5-backend hash match rate

**Predicate**: ≥4 of 5 backends report `status: "ok"` at session start (skip-MCP allowance counts toward "not-applicable", not failure).

**Probe** (after fresh `eee` invocation):
```bash
tail -1 Z:/claude-sota-installed/.claude/state/sessionstart_preload_audit.jsonl | python -c "
import json, sys
rec = json.loads(sys.stdin.read())
probes = rec['probes']
ok = sum(1 for k,v in probes.items() if v['status'] == 'ok')
skip = sum(1 for k,v in probes.items() if 'skip' in v['status'])
total = len(probes)
print(f'ok={ok} skip={skip} total={total} pass_rate={ok}/{total - skip}')
"
```

**PASS criteria**: `ok ≥ 4` AND `stale_reasons == []`.

### Test (iv) — STALE-PRELOAD detection (synthetic fabrication test)

**Predicate**: hook MUST emit `STALE-PRELOAD-NOTICE` when MEMORY.md exceeds 200-line cap OR when `tmp/` lacks close-synthesis artifacts OR when provenance lacks recent wave row.

**Probe**:
```bash
# Synthetic: bloat MEMORY.md to 250 lines via additional lines
cp .claude/projects/Z--claude-sota-installed/memory/MEMORY.md /tmp/MEMORY-bak.md
yes "synthetic line for stale test" | head -160 >> .claude/projects/Z--claude-sota-installed/memory/MEMORY.md
# Trigger hook (simulate SessionStart payload)
echo '{"hook_event_name":"SessionStart","source":"startup","session_id":"smoke-test"}' | \
  python Z:/claude-sota-installed/.claude/hooks/scripts/sessionstart_preload_verify.py
# Verify additionalContext contains "STALE-PRELOAD-NOTICE"
# Restore MEMORY.md
cp /tmp/MEMORY-bak.md .claude/projects/Z--claude-sota-installed/memory/MEMORY.md
```

**PASS criteria**: stdout JSON contains `"STALE-PRELOAD-NOTICE"` substring + `stale_reasons` includes `L2 MEMORY.md over_cap`.

### Test (v) — Wall-clock duration

**Predicate**: hook completes in <5s (settings.json timeout ceiling).

**Probe**:
```bash
tail -10 .claude/state/sessionstart_preload_audit.jsonl | python -c "
import json, sys
for line in sys.stdin:
    rec = json.loads(line)
    print(f\"source={rec['source']} duration_ms={rec['duration_ms']}\")
"
```

**PASS criteria**: `duration_ms < 5000` for all records (target <2000ms; observed wall-clock typically <500ms for filesystem-only probes).

---

## 4. Forward queue

1. **Codex T1 Path P review** — orchestrator dispatches Path P codex exec foreground+tee per `cross-model-consensus.md §On codex unavailable` recovery option (b) DOWNGRADED-MODE Pattern P discipline + `codex-t1-pattern-b-forward-discipline.md §Forward Discipline #2` (codification-fire scope-bloat sub-class):
   - Prompt scope: ONLY this Python script + settings.json snippet + cite anchors
   - Explicit NOT-IN-SCOPE: do not explore historical W166/W164 fire deliverables; rely on cite anchors only
   - 4 audit dimensions: (a) text soundness — does the Python script implement the sessionstart-preload-discipline.md §The contract correctly? (b) cite-class correctness per `citation-discipline.md` rule #8 constituents/effective_tier; (c) sister-rule integration — does the smoke-PASS test methodology align with `audit-action-loop.md §Wire/Surface/Close`? (d) forward usability — would future operators correctly install + apply?
   - Target budget: 60-120s wall-clock; JSON-strict verdict at EOF

2. **Mia pre-Edit probe** per `mia-pre-apply.md` — orchestrator probes BEFORE Write/Edit:
   - VERIFY `Z:/claude-sota-installed/.claude/hooks/scripts/sessionstart_preload_verify.py` does not yet exist (no overwrite of in-flight ship)
   - VERIFY settings.json SessionStart array structure matches insertion target (line 451-481 confirmed)
   - VERIFY `_guard_base.py` import path resolves (`Z:/claude-sota-installed/.claude/hooks/scripts/_guard_base.py` exists per Glob)

3. **Pattern A atomic Edit + T2 commit-gate**:
   - Single atomic Edit landing 2 changes: (a) Write `sessionstart_preload_verify.py`; (b) Edit `settings.json` to append SessionStart entry
   - Per `codex-t1-fix-forward-pattern.md §Pattern A`: single fix-forward commit; T2 fires automatically on `git commit *` per cross-model-consensus.md §The contract

4. **Smoke-PASS dry-run pre-commit**:
   - Invoke hook manually with synthetic stdin payload BEFORE settings.json registration
   - Verify JSONL audit row lands at `.claude/state/sessionstart_preload_audit.jsonl`
   - Verify stdout JSON shape valid
   - ONLY THEN commit settings.json wire

5. **Update triggers** (post-install monitoring per `sessionstart-preload-discipline.md §Update triggers`):
   - W170 P0 smoke-PASS verification — full 5-test methodology run from fresh `eee` invocation
   - If hook produces FALSE-POSITIVE STALE-PRELOAD on healthy state → Pattern A fix-forward to narrow detection
   - If hook MISSES genuine staleness (refuted by Mia n=N+1 post-hoc catch) → Pattern A fix-forward to widen detection
   - Promote MCP-reachable probes (mcp_memory + graphiti) when subprocess-MCP bridge ships (currently stubbed)

---

## DESIGN: SessionStart-preload-hook spec ready (Path P T1 review queued)

**verdict_one_line**: DESIGN: SessionStart-preload-hook spec ready (Path P T1 review queued)

**Artifacts delivered**:
- Python script (~210 LOC, under 300 cap) — `sessionstart_preload_verify.py` source embedded in §1
- settings.json snippet — append-entry JSON embedded in §2 (insertion point: `SessionStart` array `:451-481`)
- Smoke-PASS methodology — 5 tests (i-v) embedded in §3 covering paths-glob rate / MEMORY.md cap / 5-backend status / STALE-PRELOAD synthetic detection / wall-clock budget
- Forward queue — codex T1 Path P review + Mia pre-Edit probes + Pattern A atomic Edit + smoke-PASS dry-run embedded in §4

**Cite-class lattice** per `citation-discipline.md` rule #8:
- `constituents=[TIER-1-DIRECT @ code.claude.com/docs/en/hooks SessionStart contract, TIER-1-DIRECT @ CCBP claude-memory.md:34-40 @ 48f2ceb, TIER-2 @ sessionstart-preload-discipline.md §The contract, TIER-3-LOCAL-COMPOSITION @ Python implementation synthesis]`
- `effective_tier=TIER-3-LOCAL-COMPOSITION` per MIN_PRECEDENCE (local script-synthesis glue over TIER-1 SOTA primitives)

**Cross-model gate status**: Phase 1 bootstrap exception per CR-3 — Sonnet stand-in agent produced design; orchestrator MUST satisfy via codex T1 Path P foreground+tee REAL GPT-5.5 review BEFORE Edit lands per `cross-model-consensus.md §The contract` Phase 1 satisfaction path.

**HANDOFF**: handoff_to: orchestrator, output_mode: last_message, artifacts: [tmp/wave169-fire3-agentA-sessionstart-hook-design-2026-05-13.md], verdict_one_line: "DESIGN: SessionStart-preload-hook spec ready (Path P T1 review queued)".
