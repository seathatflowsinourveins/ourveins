#!/usr/bin/env python3
"""process_hygiene_audit.py — identify + (optionally) reap leaked subprocesses
spawned by hook scripts that didn't get cleaned up.

Per user directive 2026-05-03 ("monitor why the terminals keep spawning" +
"resolve all with sota practice"). Investigation revealed 635 git.exe + 211
node.exe + 19 codex.exe + 192 conhost.exe accumulated across 10 long-running
parallel claude.exe sessions (oldest 23h 50m).

Most subprocess accumulation is BENIGN (claude.exe-bound MCP node.exe servers,
git fsmonitor daemons that auto-cleanup). The reap targets are:

1. codex.exe processes orphaned by dead parent (hook fired, parent exited,
   codex.exe didn't reap) — idle for >REAP_AGE_HOURS hours
2. cmd.exe + conhost.exe with dead/unknown parents (zombie console wrappers)
3. NOT touching claude.exe (user may have unsaved work in any session)

Output: JSONL audit trail + advisory stderr summary. Default --dry-run mode for
safety per Ship 8.6 v1 F-001 race-safety pattern; operator must add --apply
to execute taskkill.

Windows-specific: uses tasklist + taskkill CLI (cross-Windows-version safe);
no PowerShell dependency.
"""

import argparse
import json
import re
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path

SCHEMA_VERSION = "process_hygiene_audit.v1"

# Reap criteria — conservative defaults
REAP_AGE_HOURS_DEFAULT = 1  # only reap subprocesses idle >1h
REAP_TARGET_NAMES = {"codex.exe"}  # explicit allowlist; NOT touching claude.exe

# Windows process spawning info via tasklist /v (verbose)
TASKLIST_CMD = ["tasklist", "/V", "/FO", "CSV", "/NH"]


def _windowless_kwargs():
    """Return subprocess kwargs for Windows-windowless invocation."""
    if sys.platform != "win32":
        return {}
    si = subprocess.STARTUPINFO()
    si.dwFlags |= subprocess.STARTF_USESHOWWINDOW
    si.wShowWindow = subprocess.SW_HIDE
    return {"creationflags": subprocess.CREATE_NO_WINDOW, "startupinfo": si}


def list_processes_with_parent():
    """Returns list of dicts with PID, name, parent_pid, age_seconds.

    Uses powershell Get-CimInstance for parent + creation date (tasklist alone
    lacks parent info on Windows).
    """
    if sys.platform != "win32":
        return []
    ps_cmd = (
        "Get-CimInstance Win32_Process | Select-Object "
        "Name, ProcessId, ParentProcessId, CreationDate, CommandLine | "
        "ConvertTo-Json -Compress"
    )
    try:
        result = subprocess.run(
            ["powershell", "-NoProfile", "-Command", ps_cmd],
            capture_output=True,
            text=True,
            timeout=30,
            **_windowless_kwargs(),
        )
        if result.returncode != 0:
            return []
        data = json.loads(result.stdout)
        if isinstance(data, dict):
            data = [data]
        now = datetime.now(timezone.utc)
        out = []
        for p in data:
            cd_raw = p.get("CreationDate", "")
            age_s = -1
            if cd_raw:
                # PowerShell ConvertTo-Json returns CIM dates as
                # "/Date(epoch_ms)/" OR ISO string depending on version
                m = re.search(r"\\?/Date\((\d+)\)\\?/", cd_raw)
                if m:
                    epoch_ms = int(m.group(1))
                    created = datetime.fromtimestamp(epoch_ms / 1000, tz=timezone.utc)
                    age_s = int((now - created).total_seconds())
                else:
                    try:
                        created = datetime.fromisoformat(cd_raw.replace("Z", "+00:00"))
                        age_s = int((now - created).total_seconds())
                    except ValueError:
                        pass
            out.append(
                {
                    "name": p.get("Name", "").lower(),
                    "pid": int(p.get("ProcessId", 0)),
                    "parent_pid": int(p.get("ParentProcessId", 0)),
                    "age_seconds": age_s,
                    "cmdline": p.get("CommandLine", "") or "",
                }
            )
        return out
    except (OSError, subprocess.TimeoutExpired, json.JSONDecodeError):
        return []


def listening_pids():
    """Return set of PIDs that own at least one LISTENING TCP port.

    Wave 121 fire-3 enrichment per FALSE-POSITIVE catch on cnighswonger v3.5.4
    daemon (PID 103408 dead-parent BUT serves :19801 + ESTABLISHED connections).
    Detached daemons spawned via Start-Process -WindowStyle Hidden outlive
    parent shells by Win32 design — NOT zombies if they still serve traffic.

    SOTA pattern: port-listening detection per Microsoft NetTCPIP PowerShell cmdlet
    Get-NetTCPConnection (TIER-1-DIRECT https://learn.microsoft.com/powershell/module/nettcpip/get-nettcpconnection).
    Sibling parity: gap codified Wave 121 fire-3 (sibling has same blind-spot;
    Path C cite-export candidate per CR-12 reverse-direction).
    """
    if sys.platform != "win32":
        return set()
    try:
        result = subprocess.run(
            [
                "powershell",
                "-NoProfile",
                "-Command",
                "Get-NetTCPConnection -State Listen -ErrorAction SilentlyContinue | "
                "Select-Object -ExpandProperty OwningProcess | Sort-Object -Unique",
            ],
            capture_output=True,
            text=True,
            timeout=15,
            **_windowless_kwargs(),
        )
        if result.returncode != 0:
            return set()
        return {
            int(line.strip())
            for line in result.stdout.splitlines()
            if line.strip().isdigit()
        }
    except (OSError, subprocess.TimeoutExpired, ValueError):
        return set()


def is_pidfile_daemon(pid, cmdline):
    """Detect daemon-by-PID-file convention via argv marker + on-disk PID-file PID match.

    Wave 121 fire-4 EXEMPTION (n=2 FALSE-POSITIVE class): daemons spawned via
    --pid-file <path> argv where the file content == this PID are intentionally
    detached (Win32 detached-process convention) — NOT zombies. Caught on
    codex-plugin-cc app-server-broker.mjs PID 70384 (Z:/claude-sota-installed/.claude/
    plugins/cache/openai-codex/codex/1.0.4/scripts/app-server-broker.mjs).

    Per codex T1 W121 SHIP A0-FP-FIX AXIS-2 guidance: "should be handled by
    explicit allowlist" — argv-marker + content-match is precise allowlist
    (rejects any process that happens to mention --pid-file in unrelated context).
    """
    if not cmdline or "--pid-file" not in cmdline:
        return False
    # Extract --pid-file <path> argv pattern (whitespace OR =)
    m = re.search(r"--pid-file[=\s]+([^\s]+)", cmdline)
    if not m:
        return False
    pidfile = m.group(1).strip("\"'")
    try:
        content = Path(pidfile).read_text(encoding="utf-8", errors="ignore").strip()
        # PID-file content == this PID OR a stringified PID; literal match
        return content == str(pid)
    except (OSError, ValueError):
        return False


def is_namedpipe_daemon(cmdline):
    r"""Detect daemon-by-named-pipe convention via argv marker.

    Wave 121 fire-4 EXEMPTION sub-class: Win32 named-pipe IPC servers
    (pattern ``pipe:\\.\pipe\<name>`` or ``\\.\pipe\<name>`` in argv) are
    daemon-by-design — they listen on named-pipe endpoint instead of TCP
    so port-LISTEN exemption misses them. Empirical case: codex-plugin-cc
    app-server-broker.mjs uses ``pipe:\\.\pipe\cxc-FiuO6B-codex-app-server``.

    Per codex T1 W121 AXIS-2: "UNIX socket/named pipe daemon: not covered
    (acceptable for this TCP HTTP daemon)" — fire-4 closes that gap with
    explicit named-pipe argv-marker allowlist.
    """
    if not cmdline:
        return False
    # Match Win32 named-pipe argv patterns: pipe:\\.\pipe\<name> or \\.\pipe\<name>
    return bool(re.search(r"(pipe:)?\\\\\.\\pipe\\", cmdline))


def find_reap_candidates(processes, target_names, min_age_hours):
    """Find processes matching target_names with dead parent + age > min_age_hours.

    "Dead parent" = parent_pid does not appear in current process list.
    EXEMPTION (Wave 121 fire-3): processes owning a LISTENING TCP port are
    intentionally-detached daemons, NOT zombies — exempt from reap.
    EXEMPTION (Wave 121 fire-4): processes with --pid-file argv + matching
    on-disk PID-file content OR named-pipe argv marker are daemon-by-design
    via non-TCP IPC mechanism — exempt from reap.
    """
    pids = {p["pid"] for p in processes}
    listening = listening_pids()
    min_age_seconds = min_age_hours * 3600
    candidates = []
    for p in processes:
        if p["name"] not in target_names:
            continue
        if p["age_seconds"] < min_age_seconds:
            continue
        # Dead-parent check: parent PID not in current process list
        # (excluding the standard System Idle Process pid=0)
        parent_alive = p["parent_pid"] in pids and p["parent_pid"] != 0
        if parent_alive:
            continue
        # Wave 121 fire-3 EXEMPTION: detached-daemon port-listening check.
        # Process owning LISTENING TCP port is daemon-by-design (Win32 detached
        # process convention) — NOT zombie. False-positive caught on cnighswonger
        # v3.5.4 :19801 PID 103408 (parent shell exited but daemon still serves
        # /health HTTP 200 + ESTABLISHED connections to claude.exe).
        if p["pid"] in listening:
            continue
        # Wave 121 fire-4 EXEMPTION: named-pipe + PID-file daemon detection.
        # Closes 2nd FALSE-POSITIVE class caught on codex-plugin-cc app-server-broker.mjs
        # PID 70384 — uses named-pipe IPC NOT TCP, so port-LISTEN exemption missed it.
        # Per codex T1 W121 SHIP A0-FP-FIX AXIS-2 guidance: explicit argv-marker
        # allowlist (NOT broadened ESTABLISHED-connection match per codex caution).
        cmdline = p.get("cmdline", "")
        if is_pidfile_daemon(p["pid"], cmdline):
            continue
        if is_namedpipe_daemon(cmdline):
            continue
        candidates.append(p)
    return candidates


def reap_process(pid):
    """Execute taskkill /PID <pid> /F. Returns (success_bool, stderr_str)."""
    if sys.platform != "win32":
        return False, "non-windows-platform"
    try:
        result = subprocess.run(
            ["taskkill", "/PID", str(pid), "/F"],
            capture_output=True,
            text=True,
            timeout=10,
            **_windowless_kwargs(),
        )
        return result.returncode == 0, result.stderr.strip()
    except (OSError, subprocess.TimeoutExpired) as e:
        return False, f"reap_failed: {e}"


def main(argv=None):
    parser = argparse.ArgumentParser(
        description="Audit + optionally reap leaked subprocesses (default: dry-run).",
    )
    parser.add_argument(
        "--target-names",
        type=str,
        default=",".join(sorted(REAP_TARGET_NAMES)),
        help=f"Comma-separated process names to consider for reap (default: {','.join(sorted(REAP_TARGET_NAMES))})",
    )
    parser.add_argument(
        "--min-age-hours",
        type=int,
        default=REAP_AGE_HOURS_DEFAULT,
        help=f"Minimum process age in hours to reap (default: {REAP_AGE_HOURS_DEFAULT})",
    )
    parser.add_argument(
        "--apply",
        action="store_true",
        help="Execute taskkill (default: dry-run advisory only)",
    )
    parser.add_argument(
        "--jsonl-out",
        type=Path,
        default=None,
        help="JSONL output path (default: stderr summary only)",
    )
    parser.add_argument(
        "--check",
        action="store_true",
        help="Exit 1 if reap candidates found (CI-gate mode)",
    )
    args = parser.parse_args(argv)

    target_names = {
        n.strip().lower() for n in args.target_names.split(",") if n.strip()
    }

    processes = list_processes_with_parent()
    if not processes:
        print(
            "# process_hygiene_audit: no process list available (non-Windows or probe failure)",
            file=sys.stderr,
        )
        return 0

    candidates = find_reap_candidates(processes, target_names, args.min_age_hours)

    records = []
    for c in candidates:
        record = {
            "schema_version": SCHEMA_VERSION,
            "name": c["name"],
            "pid": c["pid"],
            "parent_pid": c["parent_pid"],
            "age_hours": round(c["age_seconds"] / 3600, 2),
            "action": "reap",
            "applied": False,
            "error": "",
        }
        if args.apply:
            ok, stderr = reap_process(c["pid"])
            record["applied"] = ok
            if not ok:
                record["error"] = stderr
        records.append(record)

    if args.jsonl_out:
        args.jsonl_out.parent.mkdir(parents=True, exist_ok=True)
        with args.jsonl_out.open("w", encoding="utf-8") as f:
            for r in records:
                f.write(json.dumps(r) + "\n")

    mode = "APPLY" if args.apply else "DRY-RUN"
    print(
        f"# process_hygiene_audit [{mode}]: {len(candidates)} reap candidates "
        f"(targets={sorted(target_names)} min_age_hours={args.min_age_hours})",
        file=sys.stderr,
    )
    for c in candidates:
        print(
            f"  {c['name']} PID {c['pid']} parent {c['parent_pid']} (dead) age {c['age_seconds'] / 3600:.1f}h",
            file=sys.stderr,
        )
    if not args.apply and candidates:
        print(
            "# Operator step: re-run with --apply to execute taskkill /PID <pid> /F",
            file=sys.stderr,
        )

    if args.check and candidates:
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
