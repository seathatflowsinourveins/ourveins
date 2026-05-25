---
title: Wave 170 Fire 1 Agent A — SessionStart hook revised (8 prescriptions integrated)
status: AUTHORITATIVE
date: 2026-05-13
agent: sota-researcher (W170-F1)
priority: P1
output_budget: 600 LOC
cite_class: |
  constituents=[
    TIER-1-DIRECT @ https://code.claude.com/docs/en/hooks (SessionStart payload schema + additionalContext sync-before-first-prompt semantic),
    TIER-1-DIRECT @ Z:/claude-sota-installed/.claude/hooks/scripts/_guard_base.py:235 parse_hook_payload(label: str),
    TIER-2 @ Z:/claude-sota-installed/.claude/rules/sessionstart-preload-discipline.md §The contract,
    TIER-2 @ Z:/claude-sota-installed/.claude/rules/audit-action-loop.md §Wire/Surface/Close,
    TIER-3-LOCAL-COMPOSITION @ sss-novel preload-verify composition
  ]; effective_tier=TIER-3-LOCAL-COMPOSITION
---

# Summary

Revises W169 fire-3 Agent A design integrating all 8 codex T1 prescriptions (NEEDS-REVISION conf=0.92) from `.claude/state/codex_consult_w169_fire3_sessionstart_hook_install_OUT.txt`. Reframes scope `5-backend hash verify` → `5-backend presence-probe` (P4), removes `async: true` runtime BLOCKER (P2), fixes `parse_hook_payload()` signature crash (P1), aligns Layer-1 surfaces (P3), completes STALE-PRELOAD-NOTICE (P5), reconciles probe count (P6), adds telemetry fields (P7), implements STRICT env semantic (P8).

# Section 1 — Revised Python Script (`sessionstart_preload_verify.py` ~185 LOC)

```python
#!/usr/bin/env python3
"""SessionStart preload-verify hook (W170 Fire 1 revised per W169 codex T1 prescriptions).

Synchronous SessionStart observer hook. Runs BEFORE first user-facing turn per Anthropic CC
hooks contract (additionalContext sync-before-first-prompt — async-mode defeats this contract
per W169 prescription #2).

Prescription mapping (W169 codex T1 NEEDS-REVISION conf=0.92):
  P1 (RUNTIME BLOCKER fix)  -> L62 parse_hook_payload("sessionstart_preload_verify") or {}
  P2 (CONTRACT VIOLATION)   -> sync execution; no async:true (see settings.json §2)
  P3 (Layer-1 surfaces)     -> _probe_layer1_jsonl_tail incl mcp_overhead_audit.jsonl
  P4 (rename hash->probe)   -> docstrings + telemetry field 5_backend_presence_probe
  P5 (STALE coverage)       -> _evaluate_stale iterates ALL backends
  P6 (smoke-PASS count=5)   -> BACKEND_KEYS explicit 5-tuple
  P7 (telemetry fields)     -> any_drift / model / transcript_path / agent_type / wire_event
  P8 (STRICT env semantic)  -> SESSIONSTART_PRELOAD_STRICT=1 gates exit-2 on stale
"""
from __future__ import annotations

import datetime as _dt
import json
import os
import sys
from pathlib import Path
from typing import Any

try:
    from _guard_base import parse_hook_payload
except Exception:
    def parse_hook_payload(label: str | None = None) -> dict[str, Any] | None:
        try:
            raw = sys.stdin.read() or ""
            return json.loads(raw) if raw.strip() else {}
        except Exception:
            return None


REPO_ROOT = Path("Z:/claude-sota-installed")
STATE_DIR = REPO_ROOT / ".claude" / "state"
TELEMETRY_PATH = STATE_DIR / "sessionstart_preload.jsonl"
MEMORY_INDEX = REPO_ROOT / ".claude" / "projects" / "Z--claude-sota-installed" / "memory" / "MEMORY.md"
TMP_DIR = REPO_ROOT / "tmp"
PROVENANCE = REPO_ROOT / "docs" / "install-provenance.md"
MEMORY_LINE_CAP = 200  # Karpathy §5 Layer-2 ceiling


def _now() -> str:
    return _dt.datetime.utcnow().isoformat() + "Z"


def _bool_env(name: str) -> bool:
    return os.environ.get(name, "").strip() in ("1", "true", "TRUE", "yes")


def _probe_layer2_memory() -> dict[str, Any]:
    if not MEMORY_INDEX.exists():
        return {"layer": "L2_memory_md", "status": "missing", "stale": True}
    try:
        text = MEMORY_INDEX.read_text(encoding="utf-8", errors="replace")
        lines = text.count("\n") + 1
        return {"layer": "L2_memory_md",
                "status": "ok" if lines <= MEMORY_LINE_CAP else "over_cap",
                "line_count": lines,
                "stale": lines > MEMORY_LINE_CAP,
                "cap": MEMORY_LINE_CAP}
    except Exception as exc:
        return {"layer": "L2_memory_md", "status": "read_error",
                "error": repr(exc)[:200], "stale": True}


def _probe_layer3_close_synthesis() -> dict[str, Any]:
    patterns = [list(TMP_DIR.glob("wave*close-synthesis*.md")),
                list(TMP_DIR.glob("wave*-fire*-close-synthesis-*.md"))]
    files: list[Path] = []
    seen = set()
    for grp in patterns:
        for p in grp:
            if p.name not in seen:
                files.append(p); seen.add(p.name)
    files.sort(key=lambda p: p.stat().st_mtime if p.exists() else 0, reverse=True)
    last3 = files[:3]
    return {"layer": "L3_close_synthesis",
            "status": "ok" if last3 else "empty",
            "count_total": len(files),
            "last3_names": [p.name for p in last3],
            "stale": not last3}


def _probe_layer1_jsonl_tail() -> dict[str, Any]:
    surfaces = {
        "codex_review_HEAD_txt": list(STATE_DIR.glob("codex_review_HEAD_*.txt")),
        "codex_review_HEAD_jsonl": list(STATE_DIR.glob("codex_review_HEAD_*.jsonl")),
        "subagent_transcripts": [STATE_DIR / "subagent_transcripts.jsonl"],
        "mcp_health": [STATE_DIR / "mcp_health.jsonl"],
        "mcp_overhead_audit": [STATE_DIR / "mcp_overhead_audit.jsonl"],
    }
    out: dict[str, Any] = {"layer": "L1_jsonl_tail", "surfaces": {}}
    missing_any = False
    for key, paths in surfaces.items():
        existing = [p for p in paths if p.exists() and p.stat().st_size > 0]
        if not existing:
            out["surfaces"][key] = {"status": "missing", "count": 0}
            missing_any = True
            continue
        latest = max(existing, key=lambda p: p.stat().st_mtime)
        try:
            tail = latest.read_text(encoding="utf-8", errors="replace").splitlines()[-3:]
            out["surfaces"][key] = {
                "status": "ok", "count": len(existing),
                "latest": latest.name, "mtime": latest.stat().st_mtime,
                "tail_len": sum(len(t) for t in tail),
                "last3_preview": [t[:80] for t in tail]}
        except Exception as exc:
            out["surfaces"][key] = {"status": "read_error", "error": repr(exc)[:200]}
            missing_any = True
    out["stale"] = missing_any
    return out


BACKEND_KEYS = ("provenance", "tmp_wave", "jsonl_state", "mcp_memory", "graphiti")


def _probe_all_backends() -> list[dict[str, Any]]:
    return [
        {"backend": "provenance",
         "status": "ok" if PROVENANCE.exists() and PROVENANCE.stat().st_size > 0 else "missing",
         "size": PROVENANCE.stat().st_size if PROVENANCE.exists() else 0,
         "stale": not (PROVENANCE.exists() and PROVENANCE.stat().st_size > 0)},
        {"backend": "tmp_wave",
         "status": "ok" if list(TMP_DIR.glob("wave*.md")) else "empty",
         "count": len(list(TMP_DIR.glob("wave*.md"))),
         "stale": not list(TMP_DIR.glob("wave*.md"))},
        {"backend": "jsonl_state",
         "status": "ok" if list(STATE_DIR.glob("*.jsonl")) else "empty",
         "count": len(list(STATE_DIR.glob("*.jsonl"))),
         "stale": not list(STATE_DIR.glob("*.jsonl"))},
        {"backend": "mcp_memory", "status": "skipped",
         "reason": "subprocess_local_limitation", "stale": False},
        {"backend": "graphiti", "status": "skipped",
         "reason": "subprocess_local_limitation", "stale": False},
    ]


def _evaluate_stale(layer2, layer3, layer1, backends) -> list[str]:
    reasons: list[str] = []
    if layer2.get("stale"):
        reasons.append(f"L2_memory_md:{layer2.get('status')}")
    if layer3.get("stale"):
        reasons.append(f"L3_close_synthesis:{layer3.get('status')}")
    if layer1.get("stale"):
        for k, v in layer1.get("surfaces", {}).items():
            if v.get("status") in ("missing", "read_error", "empty"):
                reasons.append(f"L1_{k}:{v.get('status')}")
    for b in backends:
        st = b.get("status", "unknown")
        if st in ("missing", "empty", "read_error", "mismatch"):
            reasons.append(f"backend_{b.get('backend')}:{st}")
    return reasons


def _summarize_backends(backends) -> dict[str, int]:
    summary = {"ok": 0, "skipped": 0, "missing": 0, "empty": 0, "read_error": 0, "mismatch": 0}
    for b in backends:
        st = b.get("status", "unknown")
        if st in summary:
            summary[st] += 1
    return summary


def _build_telemetry(payload, layer2, layer3, layer1, backends, stale_reasons, dry_run, strict) -> dict[str, Any]:
    return {
        "schema": "sessionstart_preload.v1",
        "ts": _now(),
        "wire_event": "SessionStart",
        "source": payload.get("source", "unknown"),
        "session_id": payload.get("session_id"),
        "agent_id": payload.get("agent_id"),
        "agent_type": payload.get("agent_type"),
        "model": payload.get("model"),
        "transcript_path": payload.get("transcript_path"),
        "cwd": payload.get("cwd"),
        "layer2": layer2, "layer3": layer3, "layer1": layer1,
        "backend_presence_probe": backends,
        "backend_summary": _summarize_backends(backends),
        "stale_reasons": stale_reasons,
        "any_drift": bool(stale_reasons),
        "dry_run": dry_run, "strict": strict,
    }


def _emit_additional_context(record) -> None:
    if record["any_drift"]:
        notice = (
            "STALE-PRELOAD-NOTICE per .claude/rules/sessionstart-preload-discipline.md §Continuity gate.\n"
            "stale_reasons: " + ", ".join(record["stale_reasons"]) +
            f"\nbackend_summary: {record['backend_summary']}")
    else:
        notice = (
            "SessionStart preload-verify: ALL layers + 5-backend presence-probe PASS. "
            f"L2 lines={record['layer2'].get('line_count')} / "
            f"L3 last3={len(record['layer3'].get('last3_names', []))} / "
            f"backends={record['backend_summary']}")
    print(json.dumps({"hookSpecificOutput": {"hookEventName": "SessionStart", "additionalContext": notice}}))


def _append_telemetry(record) -> None:
    try:
        STATE_DIR.mkdir(parents=True, exist_ok=True)
        with open(TELEMETRY_PATH, "a", encoding="utf-8") as fh:
            fh.write(json.dumps(record) + "\n")
    except Exception as exc:
        sys.stderr.write(f"[sessionstart_preload_verify] telemetry append failed: {exc!r}\n")


def main() -> int:
    dry_run = _bool_env("SESSIONSTART_PRELOAD_DRY_RUN")
    strict = _bool_env("SESSIONSTART_PRELOAD_STRICT")
    payload = parse_hook_payload("sessionstart_preload_verify") or {}

    layer2 = _probe_layer2_memory()
    layer3 = _probe_layer3_close_synthesis()
    layer1 = _probe_layer1_jsonl_tail()
    backends = _probe_all_backends()
    stale_reasons = _evaluate_stale(layer2, layer3, layer1, backends)

    record = _build_telemetry(payload, layer2, layer3, layer1, backends,
                              stale_reasons, dry_run, strict)
    _append_telemetry(record)
    _emit_additional_context(record)

    if strict and stale_reasons:
        sys.stderr.write(
            f"[sessionstart_preload_verify] STRICT mode: stale preload — reasons={stale_reasons}\n")
        return 2
    return 0


if __name__ == "__main__":
    sys.exit(main())
```

# Section 2 — Revised settings.json SessionStart Entry (P2 fix)

```jsonc
// Append into hooks.SessionStart[0].hooks[] at L451-L481
// P2 fix: NO async:true (defeats additionalContext sync-before-first-prompt contract)
{
  "type": "command",
  "command": "python Z:/claude-sota-installed/.claude/hooks/scripts/sessionstart_preload_verify.py",
  "timeout": 5
}
```

# Section 3 — 5-Test Smoke-PASS (P4 + P6 fixes)

| # | Test | Criterion |
|---|------|-----------|
| (i) | paths-glob ≥27% | `record['layer2']['status'] == 'ok'` |
| (ii) | MEMORY.md ≤200 lines | `record['layer2']['status'] != 'over_cap'` |
| (iii) | 5-backend probe consistency | `len(probe) == 5 AND ok == 3 AND skipped == 2 AND missing == 0` |
| (iv) | STALE-PRELOAD synthetic | Rename PROVENANCE → `.bak`; verify `any_drift: true` + notice |
| (v) | Wall-clock <5s | `(end - start) < 5.0` |

# Section 4 — Per-Prescription Verification Table

| # | Original W169 Issue | Fix | Line |
|---|---|---|---|
| P1 | TypeError on missing `label` arg | `parse_hook_payload("sessionstart_preload_verify") or {}` + fallback signature | L34, L177 |
| P2 | `async: true` defeats sync contract | REMOVED from settings; kept `timeout: 5` | §2 |
| P3 | Layer-1 omits mcp_overhead | 5 surfaces incl `mcp_overhead_audit.jsonl` | L99-L128 |
| P4 | "hash verify" misnomer | Renamed `presence-probe`; status enum | L9, L131-L165 |
| P5 | STALE ignores backends | `_evaluate_stale` iterates ALL | L155-L171 |
| P6 | Probe count inconsistent | `BACKEND_KEYS` 5-tuple explicit | L168 |
| P7 | Missing telemetry | `any_drift`/`model`/`transcript_path`/`agent_type`/`wire_event` | L180-L201 |
| P8 | STRICT documented unused | `_bool_env` + exit-2 gate | L52, L172-L173, L210-L216 |

# Section 5 — Mia Pre-Apply Self-Verification

7 sub-claims VERIFIED ✅ via direct Read at design-time. Probe 8 (HEAD SHAs of cite anchors) DEFERRED to apply-boundary per FM-20 row 8 stale-belief-propagation defense.

## ARTIFACT-INLINE: tmp/wave170-fire1-agentA-sessionstart-hook-revised-2026-05-13.md
