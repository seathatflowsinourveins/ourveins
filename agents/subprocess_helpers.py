# agents/subprocess_helpers.py
"""Cross-platform subprocess helpers per V8 + codex r1 env-allowlist + 3-stage cancel ladder."""

import sys
import signal
import subprocess

CREATE_NEW_PROCESS_GROUP = 0x00000200


def _spawn_kwargs() -> dict:
    """Cross-platform spawn flags (V8)."""
    if sys.platform == "win32":
        return {"creationflags": CREATE_NEW_PROCESS_GROUP}
    return {"start_new_session": True}


def _cancel_subprocess_blocking(
    proc: subprocess.Popen, soft_timeout_s: float = 5.0, hard_timeout_s: float = 5.0
) -> None:
    """3-stage Windows-portable subprocess cancel (V8 §E).

    Stage 1: graceful signal (CTRL_BREAK_EVENT/SIGINT) + wait
    Stage 2: terminate + wait
    Stage 3: kill (unconditional)

    Each branch that catches ProcessLookupError/OSError attempts a non-blocking
    wait(timeout=0) to reap the process if it has exited, preventing zombies on POSIX.
    """
    if proc.returncode is not None:
        return
    sig = signal.CTRL_BREAK_EVENT if sys.platform == "win32" else signal.SIGINT
    try:
        proc.send_signal(sig)
    except (ProcessLookupError, OSError):
        # Process already exited — reap to prevent zombie
        try:
            proc.wait(timeout=0)
        except (subprocess.TimeoutExpired, ProcessLookupError, OSError):
            pass
        return
    try:
        proc.wait(timeout=soft_timeout_s)
        return
    except subprocess.TimeoutExpired:
        pass
    try:
        proc.terminate()
        proc.wait(timeout=hard_timeout_s)
        return
    except (ProcessLookupError, OSError):
        try:
            proc.wait(timeout=0)
        except (subprocess.TimeoutExpired, ProcessLookupError, OSError):
            pass
        return
    except subprocess.TimeoutExpired:
        pass
    try:
        proc.kill()
        proc.wait()
    except (ProcessLookupError, OSError):
        try:
            proc.wait(timeout=0)
        except (subprocess.TimeoutExpired, ProcessLookupError, OSError):
            pass


def _force_kill_container(container_id: str, timeout: int = 10) -> None:
    """Fallback: external docker kill via captured container_id."""
    try:
        subprocess.run(
            ["docker", "kill", container_id],
            check=False,
            capture_output=True,
            timeout=timeout,
        )
    except (subprocess.TimeoutExpired, FileNotFoundError):
        pass
