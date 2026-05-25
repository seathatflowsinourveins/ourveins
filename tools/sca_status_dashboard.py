#!/usr/bin/env python3
"""W307 SCA Status Dashboard — aggregate VERDICT-LEDGER + T6 basic-memory + AGING queue.

Per operator's W307 "advanced automation" mandate: this tool aggregates the
3-target sca-v5 ledger artifacts into a single markdown dashboard so operator
can see at a glance which verdicts are ACTIVE / AGING / STALE / RE-LITIGATED /
RETIRED + which need re-litigation + which are missing from T6 basic-memory.

Inputs (all optional via CLI flags):
- VERDICT-LEDGER.md (canonical row table)
- basic-memory verdicts/*.md (T6 markdown storage)
- AGING-RELITIGATION-QUEUE.md (STALE work-list if exists)

Output:
- Markdown dashboard with §1 ACTIVE T1 / §2 AGING / §3 STALE / §4 T6 parity / §5 audit queue

Cardinal-rule conformance:
- CR-1 trusted source: stdlib-only, no new pip installs
- CR-2 hooks: this is a tools/ utility (sanctioned per tools/awesome_list_deltagrep.py
  + tools/eee.ps1 precedent); NOT a hook
- CR-3 subagents: pure stdlib aggregation; no agent invocation
- CR-5 safety: read-only (only emits dashboard file; no edits to ledger or T6)

Usage:
    python tools/sca_status_dashboard.py
    python tools/sca_status_dashboard.py --out-path docs/architecture/W307-.../W307-SCA-STATUS-DASHBOARD.md
    python tools/sca_status_dashboard.py --dry-run    # print summary without writing
"""

from __future__ import annotations

import argparse
import datetime as dt
import re
import sys
from pathlib import Path
from typing import Any

REPO_ROOT = Path(__file__).resolve().parent.parent

DEFAULT_LEDGER = (
    REPO_ROOT / "docs" / "architecture" / "W288-RESEARCH-ARCH-v2" / "VERDICT-LEDGER.md"
)
DEFAULT_T6_DIR = (
    REPO_ROOT.parent / "claude-sota-installed-state" / "basic-memory" / "verdicts"
)
DEFAULT_AGING_QUEUE = (
    REPO_ROOT / "docs" / "architecture" / "AGING-RELITIGATION-QUEUE.md"
)
DEFAULT_OUT = (
    REPO_ROOT
    / "docs"
    / "architecture"
    / "W307-TOP3-CHALLENGER-AUDITS-AND-AUTOMATION"
    / "W307-SCA-STATUS-DASHBOARD.md"
)

# sca-v5 decision-decay state machine (per SKILL.md):
# ACTIVE 0-5 since decided; AGING 6-11; STALE 12+; RE-LITIGATED + RETIRED operator-marked.
AGING_THRESHOLD = 6
STALE_THRESHOLD = 12


def parse_ledger(path: Path) -> list[dict[str, Any]]:
    """Extract verdict rows from VERDICT-LEDGER.md.

    Returns list of dicts with at minimum: row_num, wave, candidate, verdict,
    install_score (or None), pattern_score (or None), status, raw_line.
    """
    if not path.exists():
        return []
    rows: list[dict[str, Any]] = []
    for line in path.read_text(encoding="utf-8").splitlines():
        if (
            not line.startswith("|")
            or "-" * 3 in line
            or "Wave" in line
            and "Decided" in line
        ):
            continue
        cells = [c.strip() for c in line.split("|")[1:-1]]
        if len(cells) < 5 or not cells[0].isdigit():
            continue
        # Extract candidate slug (between backticks if present).
        # Schema-aware (W307 codex-r1 HIGH-1 closure): main tables use [#, Wave,
        # Decided, Candidate, ...] so Candidate is at cells[3]; Stream-B top-10
        # uses [#, Wave, Candidate, Stars, ...] so Candidate is at cells[2].
        # Detect by checking if cells[3] looks like a pure stars-number
        # (commas + digits, optionally a 'k' suffix).
        stars_re = re.compile(r"^[\d,]+k?$")
        cand_idx = 3
        if len(cells) >= 4 and stars_re.match(cells[3]):
            cand_idx = 2
        cand_cell = cells[cand_idx] if len(cells) > cand_idx else ""
        cand_match = re.search(r"`([^`]+)`", cand_cell)
        candidate = (
            cand_match.group(1) if cand_match else cand_cell.split("(")[0].strip()
        )
        # Extract status (column ~8 in main tables; varies)
        status = "UNKNOWN"
        for c in cells:
            if c.upper() in (
                "ACTIVE",
                "AGING",
                "STALE",
                "RE-LITIGATED",
                "RETIRED",
                "PENDING",
                "INSTALLED-2026-05-18",
            ):
                status = c.upper()
                break
            if "AT-RISK" in c.upper():
                status = "AT-RISK"
                break
            if "INSTALLED" in c.upper():
                status = "INSTALLED"
                break
        # Wave + verdict
        wave = cells[1] if len(cells) >= 2 else "?"
        verdict_cell = cells[4] if len(cells) >= 5 else ""
        verdict = re.sub(r"[*_`]", "", verdict_cell).split("(")[0].strip()
        # W302-P0-codex-r1 P2 fix (2026-05-19): the W288 Stream B top-10 table has
        # schema `| # | Wave | Candidate | Stars | install_score | pattern_score |
        # Hard caps | v3 Tier | Awaiting |` where cells[4] is install_score (numeric)
        # NOT verdict. Skip preliminary rows by detecting numeric verdict_cell.
        if re.match(r"^\d+\.\d+$", verdict):
            continue

        # Scores
        def _num(cell: str) -> float | None:
            m = re.search(r"\d+\.\d+", cell)
            return float(m.group(0)) if m else None

        install_score = _num(cells[5]) if len(cells) >= 6 else None
        pattern_score = _num(cells[6]) if len(cells) >= 7 else None
        rows.append(
            {
                "row_num": int(cells[0]),
                "wave": wave,
                "candidate": candidate,
                "verdict": verdict,
                "install_score": install_score,
                "pattern_score": pattern_score,
                "status": status,
            }
        )
    return rows


def parse_t6_verdicts(t6_dir: Path) -> list[str]:
    """List basic-memory verdict markdown filenames at the T6 storage dir."""
    if not t6_dir.exists():
        return []
    return sorted(p.name for p in t6_dir.glob("W*.md"))


def detect_current_wave(repo: Path) -> int:
    """Detect the highest W<num> referenced in the latest 50 commits + wave dirs."""
    waves: set[int] = set()
    # From wave dirs
    arch_dir = repo / "docs" / "architecture"
    if arch_dir.exists():
        for p in arch_dir.iterdir():
            if p.is_dir():
                m = re.match(r"^W(\d{3,})", p.name)
                if m:
                    waves.add(int(m.group(1)))
    # From recent commits (via git log if available)
    try:
        import subprocess

        log = subprocess.run(
            ["git", "log", "--oneline", "-50"],
            cwd=str(repo),
            capture_output=True,
            text=True,
            timeout=10,
            check=False,
        )
        for line in log.stdout.splitlines():
            for m in re.finditer(r"W(\d{3,})", line):
                waves.add(int(m.group(1)))
    except (OSError, subprocess.SubprocessError):
        pass
    return max(waves) if waves else 0


def classify_status(decision_wave: str, current_wave: int) -> str:
    """Compute lifecycle status from wave-age per sca-v5 decision-decay machine."""
    m = re.search(r"\d+", decision_wave or "")
    if not m:
        return "UNKNOWN-WAVE"
    age = current_wave - int(m.group(0))
    if age >= STALE_THRESHOLD:
        return "STALE"
    if age >= AGING_THRESHOLD:
        return "AGING"
    return "ACTIVE"


def build_dashboard(
    ledger_rows: list[dict[str, Any]],
    t6_files: list[str],
    aging_queue_exists: bool,
    current_wave: int,
) -> str:
    """Assemble the dashboard markdown."""
    now = dt.datetime.now(dt.timezone.utc).isoformat(timespec="seconds")
    lines: list[str] = []
    lines.append("# SCA Status Dashboard")
    lines.append("")
    lines.append(
        f"> Generated: {now} · Current wave: W{current_wave} · "
        f"Source: VERDICT-LEDGER ({len(ledger_rows)} rows) + T6 basic-memory ({len(t6_files)} files)"
    )
    lines.append(
        "> Tool: `tools/sca_status_dashboard.py` (W307 ship; CR-1/2/3/5 compliant)"
    )
    lines.append("")

    # Compute lifecycle classification for each row
    by_status: dict[str, list[dict[str, Any]]] = {
        "ACTIVE": [],
        "AGING": [],
        "STALE": [],
        "OTHER": [],
    }
    for row in ledger_rows:
        cls = classify_status(row["wave"], current_wave)
        if row["status"] in (
            "RE-LITIGATED",
            "RETIRED",
            "PENDING",
            "AT-RISK",
            "INSTALLED",
        ):
            by_status["OTHER"].append({**row, "lifecycle": row["status"]})
        else:
            by_status[cls].append({**row, "lifecycle": cls})

    # §1 Active T1 INSTALL
    lines.append("## §1 Active T1 INSTALL verdicts")
    lines.append("")
    lines.append(
        "| # | Wave | Candidate | Verdict | install_score | pattern_score | Lifecycle |"
    )
    lines.append("|---:|:---:|---|---|---:|---:|---|")
    t1_rows = [
        r for r in (by_status["ACTIVE"] + by_status["OTHER"]) if "T1" in r["verdict"]
    ]
    for r in sorted(t1_rows, key=lambda x: x["row_num"]):
        lines.append(
            f"| {r['row_num']} | {r['wave']} | `{r['candidate']}` | {r['verdict']} "
            f"| {r['install_score'] or '—'} | {r['pattern_score'] or '—'} | {r['lifecycle']} |"
        )
    lines.append("")
    lines.append(f"**T1 active count**: {len(t1_rows)}")
    lines.append("")

    # §2 AGING
    lines.append(
        f"## §2 AGING verdicts (decision_wave + {AGING_THRESHOLD}..{STALE_THRESHOLD - 1} ago)"
    )
    lines.append("")
    if by_status["AGING"]:
        lines.append("| # | Wave | Candidate | Verdict | Action recommended |")
        lines.append("|---:|:---:|---|---|---|")
        for r in by_status["AGING"]:
            lines.append(
                f"| {r['row_num']} | {r['wave']} | `{r['candidate']}` | {r['verdict']} "
                f"| Re-litigate at next wave |"
            )
    else:
        lines.append("(none)")
    lines.append("")

    # §3 STALE
    lines.append(f"## §3 STALE verdicts (decision_wave + {STALE_THRESHOLD}+ ago)")
    lines.append("")
    if by_status["STALE"]:
        lines.append("| # | Wave | Candidate | Verdict | Action required |")
        lines.append("|---:|:---:|---|---|---|")
        for r in by_status["STALE"]:
            lines.append(
                f"| {r['row_num']} | {r['wave']} | `{r['candidate']}` | {r['verdict']} "
                f"| Must be re-litigated before citing |"
            )
    else:
        lines.append("(none)")
    lines.append("")

    # §4 T6 parity check
    lines.append("## §4 T6 basic-memory parity check")
    lines.append("")
    # W302-P0-codex-r1 P2 fix (2026-05-19): compare on slug-normalized form,
    # NOT on reverse-engineered org/repo. `_file_slug()` flattens `/` to `-` so
    # `astral-sh/uv` and `astral/sh-uv` both yield slug `astral-sh-uv`. Trying to
    # reverse-engineer the original `org/repo` produced false parity warnings
    # (e.g. `W296-astral-sh-uv.md` → `astral/sh-uv` ≠ ledger `astral-sh/uv`).
    ledger_slugs = {r["candidate"].lower().replace("/", "-") for r in ledger_rows}
    t6_slugs = set()
    for fname in t6_files:
        m = re.match(r"^W\d+-(.+)\.md$", fname)
        if m:
            # Normalize: lowercase + collapse non-alnum-or-hyphen runs (matches
            # the `_file_slug()` derivation in sca-v5 SKILL.md §6 Step-6 ledger).
            slug = re.sub(r"[^a-z0-9-]+", "-", m.group(1).lower()).strip("-")
            slug = re.sub(r"-+", "-", slug)
            t6_slugs.add(slug)
    missing_in_t6 = ledger_slugs - t6_slugs
    orphan_in_t6 = t6_slugs - ledger_slugs
    # Display alias preserved (downstream lines reference ledger_candidates).
    ledger_candidates = ledger_slugs
    lines.append(f"- Ledger rows: {len(ledger_candidates)}")
    lines.append(f"- T6 verdict files: {len(t6_files)}")
    lines.append(f"- Missing T6 file for ledger entry (≈): {len(missing_in_t6)}")
    if missing_in_t6:
        lines.append(f"  - Examples: {', '.join(list(missing_in_t6)[:5])}")
    lines.append(f"- T6 file with no ledger row (orphan): {len(orphan_in_t6)}")
    if orphan_in_t6:
        lines.append(f"  - Examples: {', '.join(list(orphan_in_t6)[:5])}")
    lines.append("")

    # §5 OTHER / special status (PENDING, AT-RISK, INSTALLED, RE-LITIGATED, RETIRED)
    lines.append(
        "## §5 Special-status verdicts (PENDING / AT-RISK / INSTALLED / RE-LITIGATED / RETIRED)"
    )
    lines.append("")
    if by_status["OTHER"]:
        lines.append("| # | Wave | Candidate | Verdict | Special status |")
        lines.append("|---:|:---:|---|---|---|")
        for r in by_status["OTHER"]:
            lines.append(
                f"| {r['row_num']} | {r['wave']} | `{r['candidate']}` | {r['verdict']} | {r['status']} |"
            )
    else:
        lines.append("(none)")
    lines.append("")

    # §6 AGING queue exists?
    lines.append("## §6 AGING-RELITIGATION-QUEUE.md")
    lines.append("")
    lines.append(
        f"- Queue file: {'EXISTS' if aging_queue_exists else 'NOT-YET-CREATED'} "
        f"at `docs/architecture/AGING-RELITIGATION-QUEUE.md`"
    )
    lines.append("")
    lines.append("---")
    lines.append(
        "> Run `python tools/sca_status_dashboard.py --dry-run` for a CLI summary."
    )
    return "\n".join(lines) + "\n"


def main() -> int:
    ap = argparse.ArgumentParser(description="W307 SCA Status Dashboard")
    ap.add_argument(
        "--ledger", default=str(DEFAULT_LEDGER), help="Path to VERDICT-LEDGER.md"
    )
    ap.add_argument(
        "--t6-dir",
        default=str(DEFAULT_T6_DIR),
        help="Path to basic-memory verdicts/ dir",
    )
    ap.add_argument(
        "--aging-queue",
        default=str(DEFAULT_AGING_QUEUE),
        help="Path to AGING-RELITIGATION-QUEUE.md",
    )
    ap.add_argument(
        "--out-path", default=str(DEFAULT_OUT), help="Output dashboard markdown path"
    )
    ap.add_argument(
        "--current-wave",
        type=int,
        default=0,
        help="Override current-wave detection (0=auto)",
    )
    ap.add_argument(
        "--dry-run",
        action="store_true",
        help="Print summary; do not write dashboard file",
    )
    args = ap.parse_args()

    ledger_path = Path(args.ledger)
    t6_dir = Path(args.t6_dir)
    aging_queue = Path(args.aging_queue)
    out_path = Path(args.out_path)

    ledger_rows = parse_ledger(ledger_path)
    t6_files = parse_t6_verdicts(t6_dir)
    aging_exists = aging_queue.exists()
    current_wave = args.current_wave or detect_current_wave(REPO_ROOT)

    dashboard = build_dashboard(ledger_rows, t6_files, aging_exists, current_wave)

    print(f"[sca_status_dashboard] current wave: W{current_wave}")
    print(f"[sca_status_dashboard] ledger rows parsed: {len(ledger_rows)}")
    print(f"[sca_status_dashboard] T6 files: {len(t6_files)}")
    print(
        f"[sca_status_dashboard] aging queue: {'EXISTS' if aging_exists else 'NOT-YET-CREATED'}"
    )

    if args.dry_run:
        print("[sca_status_dashboard] --dry-run: not writing dashboard.")
        print(f"[sca_status_dashboard] would have written to: {out_path}")
        return 0

    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(dashboard, encoding="utf-8")
    print(
        f"[sca_status_dashboard] dashboard written: {out_path} ({out_path.stat().st_size} bytes)"
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
