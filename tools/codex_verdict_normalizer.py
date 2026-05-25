#!/usr/bin/env python3
"""codex_verdict_normalizer.py — unify codex review verdicts into JSONL summary stream.

W134-F22-C P1 ship — closes Fire 19 P1-1 gap (bifurcated verdict architecture):
- `.claude/state/codex_*_reviews.jsonl` = hook telemetry events (filter_rejected /
  main_entered / launched), NOT verdict records.
- `.claude/state/codex_review_HEAD_*.txt` = actual JSON verdicts (verdict/summary/findings/
  next_steps per `.claude/schemas/review-output.schema.json`).

Cross-querying requires joining 2 sources. This normalizer scans all .txt verdicts and
appends a normalized summary record per file to `.claude/state/codex_verdict_summary.jsonl`.

Cite trail:
- Fire 19 P1-1: docs/sota-architecture-audit/fire-19-dim6-eval-gpt55/01-dim6-eval-gpt55-verdict.md
- Fire 21 Tier 1 roadmap: docs/sota-architecture-audit/fire-21-ultimate-architecture-ecosystem/02-current-vs-ultimate-gap-matrix.md
- Schema: .claude/schemas/review-output.schema.json
- Sister tool: evals/evolve_pass_rate_gate.py (W134-F22-B; reads same source files)

Operator usage:
  # Full rescan (idempotent — re-walks all verdicts; deduplicates by SHA):
  python tools/codex_verdict_normalizer.py

  # Incremental (only files newer than last summary entry):
  python tools/codex_verdict_normalizer.py --incremental

  # Dry-run (print to stdout, no JSONL write):
  python tools/codex_verdict_normalizer.py --dry-run

Output JSONL record shape (one per verdict file):
  {
    "ts": "<file mtime ISO 8601>",
    "sha": "<sha8 from filename>",
    "verdict": "approve|needs-attention",
    "summary": "<1-line summary>",
    "findings_count": <int>,
    "severity_dist": {"critical": <int>, "high": <int>, "medium": <int>, "low": <int>},
    "max_severity": "critical|high|medium|low|null",
    "max_confidence": <float|null>,
    "source_file": "codex_review_HEAD_<sha8>.txt"
  }
"""

from __future__ import annotations

import argparse
import datetime as _dt
import json
import sys
from pathlib import Path
from typing import Any

REPO_ROOT = Path(__file__).resolve().parent.parent
CODEX_STATE = REPO_ROOT / ".claude" / "state"
NORMALIZED_PATH = CODEX_STATE / "codex_verdict_summary.jsonl"

SEVERITY_ORDER = {"critical": 4, "high": 3, "medium": 2, "low": 1}


def extract_record(path: Path) -> dict[str, Any] | None:
    """Parse a single codex_review_HEAD_*.txt file → normalized record dict.

    Returns None if file is empty or malformed.
    """
    try:
        content = path.read_text(encoding="utf-8").strip()
        if not content:
            return None
        data = json.loads(content)
    except (json.JSONDecodeError, OSError):
        return None

    findings = data.get("findings") or []
    if not isinstance(findings, list):
        findings = []

    severity_dist = {"critical": 0, "high": 0, "medium": 0, "low": 0}
    max_severity: str | None = None
    max_severity_rank = 0
    max_confidence: float | None = None

    for f in findings:
        if not isinstance(f, dict):
            continue
        sev = f.get("severity", "").lower()
        if sev in severity_dist:
            severity_dist[sev] += 1
            if SEVERITY_ORDER[sev] > max_severity_rank:
                max_severity_rank = SEVERITY_ORDER[sev]
                max_severity = sev
        conf = f.get("confidence")
        if isinstance(conf, (int, float)):
            if max_confidence is None or conf > max_confidence:
                max_confidence = float(conf)

    # Extract sha8 from filename pattern codex_review_HEAD_<sha8>.txt
    stem = path.stem  # codex_review_HEAD_a3d6f661
    sha = stem.split("_")[-1] if "_" in stem else stem

    ts = _dt.datetime.fromtimestamp(
        path.stat().st_mtime, tz=_dt.timezone.utc
    ).isoformat()

    return {
        "ts": ts,
        "sha": sha,
        "verdict": data.get("verdict", "unknown"),
        "summary": (data.get("summary") or "")[:200],  # cap at 200 chars
        "findings_count": len(findings),
        "severity_dist": severity_dist,
        "max_severity": max_severity,
        "max_confidence": max_confidence,
        "source_file": path.name,
    }


def load_existing_summary() -> tuple[dict[tuple[str, str], dict[str, Any]], float]:
    """Load existing summary records keyed by (source_file, ts) composite.

    Composite key per W134-F22-C codex T1 NEEDS-REVISION conf=0.92 Pattern A fix-forward:
    dedup-by-sha-alone collapses re-reviews of the same HEAD. Composite (source_file, ts)
    correctly preserves each distinct verdict re-emission as its own record while still
    enabling per-sha aggregation queries downstream.

    Returns (records_by_composite, latest_mtime).
    """
    if not NORMALIZED_PATH.exists():
        return {}, 0.0
    records: dict[tuple[str, str], dict[str, Any]] = {}
    latest_mtime = 0.0
    try:
        for line in NORMALIZED_PATH.read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if not line:
                continue
            try:
                rec = json.loads(line)
                source_file = rec.get("source_file", "")
                ts = rec.get("ts", "")
                if source_file and ts:
                    records[(source_file, ts)] = rec
                # Parse ts back to mtime for incremental cutoff
                if ts:
                    try:
                        mtime = _dt.datetime.fromisoformat(ts).timestamp()
                        if mtime > latest_mtime:
                            latest_mtime = mtime
                    except ValueError:
                        pass
            except json.JSONDecodeError:
                continue
    except OSError:
        pass
    return records, latest_mtime


def normalize(incremental: bool = False, dry_run: bool = False) -> int:
    """Scan codex verdict files and write/print normalized JSONL.

    Returns exit code:
      0 — success (records written or up-to-date)
      1 — error (no source files; write failure)
    """
    candidates = sorted(
        CODEX_STATE.glob("codex_review_HEAD_*.txt"),
        key=lambda p: p.stat().st_mtime,
    )
    # Filter out .prompt.txt (raw prompts, not JSON verdicts)
    files = [p for p in candidates if not p.name.endswith(".prompt.txt")]

    if not files:
        print(
            "[normalizer] ERROR: no codex_review_HEAD_*.txt files found",
            file=sys.stderr,
        )
        return 1

    existing, latest_mtime = load_existing_summary()
    new_records: list[dict[str, Any]] = []
    skipped_existing = 0
    skipped_incremental = 0
    parse_errors = 0

    for f in files:
        # Incremental mode: skip files older than the latest record we already have
        if incremental and f.stat().st_mtime <= latest_mtime:
            skipped_incremental += 1
            continue

        rec = extract_record(f)
        if rec is None:
            parse_errors += 1
            continue

        # Deduplicate by (source_file, ts) composite key per codex T1 NEEDS-REVISION
        # conf=0.92 fix-forward: dedup-by-sha-alone collapses re-reviews of the same HEAD.
        # Re-reviewed verdict files have new mtime → new ts → distinct composite key.
        composite = (rec["source_file"], rec["ts"])
        if composite in existing and not incremental:
            skipped_existing += 1
            continue

        new_records.append(rec)

    print(
        f"[normalizer] scanned={len(files)} new={len(new_records)} "
        f"skip_existing={skipped_existing} skip_incremental={skipped_incremental} "
        f"parse_errors={parse_errors}"
    )

    if not new_records:
        print(f"[normalizer] ✓ up-to-date at {NORMALIZED_PATH}")
        return 0

    if dry_run:
        print("[normalizer] DRY-RUN — would append:")
        for rec in new_records[:5]:
            print(f"  {json.dumps(rec)}")
        if len(new_records) > 5:
            print(f"  ... +{len(new_records) - 5} more records")
        return 0

    try:
        NORMALIZED_PATH.parent.mkdir(parents=True, exist_ok=True)
        with NORMALIZED_PATH.open("a", encoding="utf-8") as fh:
            for rec in new_records:
                fh.write(json.dumps(rec) + "\n")
        print(f"[normalizer] ✓ wrote {len(new_records)} records to {NORMALIZED_PATH}")
        return 0
    except OSError as e:
        print(f"[normalizer] ERROR: write failed: {e}", file=sys.stderr)
        return 1


def main() -> int:
    p = argparse.ArgumentParser(
        description="Normalize codex review verdicts into JSONL summary stream "
        "(W134-F22-C P1; closes Fire 19 P1-1)",
    )
    p.add_argument(
        "--incremental",
        action="store_true",
        help="only process files newer than latest summary entry (faster on incremental runs)",
    )
    p.add_argument(
        "--dry-run",
        action="store_true",
        help="print new records to stdout without writing to JSONL",
    )
    args = p.parse_args()
    return normalize(incremental=args.incremental, dry_run=args.dry_run)


if __name__ == "__main__":
    sys.exit(main())
