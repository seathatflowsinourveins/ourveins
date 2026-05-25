# agents/l0_validate.py
"""L0 input-validate per spec §8 v3 — runs ALWAYS as the first stage.

Validates TaskSpec for shape + safety BEFORE expensive execution starts.
Raises TaskSpecError (subclass of ValueError) on bad input — Temporal workflow's
non_retryable_error_types catches this so a bad spec doesn't waste retry budget.
"""

import re

from agents.models import TaskSpec, TaskSpecError

# Shell-injection / command-substitution markers
_SHELL_INJECTION_PATTERNS = [
    re.compile(r"\$\(.*?\)"),  # $(...)
    re.compile(r"`[^`]*`"),  # `...`
    re.compile(r"\$\{[^}]*:-[^}]*\}"),  # ${VAR:-default}
    re.compile(r"\$\{[^}]*\}"),  # ${VAR} general
]

# Path traversal / absolute-path blocklist
_PATH_TRAVERSAL_PATTERNS = [
    re.compile(r"\.\."),  # parent-directory traversal
    re.compile(r"^/etc/"),
    re.compile(r"^/proc/"),
    re.compile(r"^/sys/"),
    re.compile(r"^/root/"),
    re.compile(r"^[A-Za-z]:\\Windows", re.IGNORECASE),
    re.compile(r"^[A-Za-z]:/Windows", re.IGNORECASE),
    re.compile(r"^\\\\"),  # UNC \\server\share
]

MAX_TASK_LEN = 10000
MAX_ITERATIONS = 500
MAX_TIMEOUT_SEC = 7200


def validate_task_spec(spec: TaskSpec) -> dict:
    """Validate spec; raise TaskSpecError if invalid; return PASS dict if ok."""
    # 1. Task content
    if not spec.task or not spec.task.strip():
        raise TaskSpecError("spec.task is empty or whitespace-only")
    if len(spec.task) > MAX_TASK_LEN:
        raise TaskSpecError(
            f"spec.task exceeds {MAX_TASK_LEN} chars (got {len(spec.task)})"
        )
    for pat in _SHELL_INJECTION_PATTERNS:
        if pat.search(spec.task):
            raise TaskSpecError(
                f"spec.task contains shell-injection marker (pattern={pat.pattern})"
            )

    # 2. Repo path safety
    if spec.repo:
        if "\x00" in spec.repo:
            raise TaskSpecError("spec.repo contains null byte")
        for pat in _PATH_TRAVERSAL_PATTERNS:
            if pat.search(spec.repo):
                raise TaskSpecError(
                    f"spec.repo contains path-traversal/blocklist pattern"
                    f" (matched={pat.pattern})"
                )

    # 3. Budget ranges
    if spec.budget.iterations <= 0 or spec.budget.iterations > MAX_ITERATIONS:
        raise TaskSpecError(
            f"spec.budget.iterations out of range (got {spec.budget.iterations},"
            f" allowed 1..{MAX_ITERATIONS})"
        )
    if (
        spec.budget.timeout_seconds <= 0
        or spec.budget.timeout_seconds > MAX_TIMEOUT_SEC
    ):
        raise TaskSpecError(
            f"spec.budget.timeout_seconds out of range"
            f" (got {spec.budget.timeout_seconds}, allowed 1..{MAX_TIMEOUT_SEC})"
        )

    return {
        "verdict": "PASS",
        "validator": "l0",
        "task_id": spec.conversation_id,
        "checks_run": ["task_content", "repo_safety", "budget_range"],
    }
