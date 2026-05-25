"""codex r2 D4-P2 FIXED: dedicated ThreadPoolExecutor for docker-py blocking HTTP calls.

Worker-default asyncio.to_thread shares a pool with other async work — heavy docker-py
calls (containers.run/reload/kill/remove) starve other coroutines. Isolate onto a
dedicated pool sized for max_concurrent_activities.

Sizing: max_workers = max_concurrent_activities (8 default) × safety_factor (1.5)
         = 12 worker threads. Tunable via OH_DOCKER_EXECUTOR_WORKERS env.
"""

import concurrent.futures
import os

_DEFAULT_WORKERS = int(os.environ.get("OH_DOCKER_EXECUTOR_WORKERS", "12"))

DOCKER_EXECUTOR = concurrent.futures.ThreadPoolExecutor(
    max_workers=_DEFAULT_WORKERS,
    thread_name_prefix="docker-spawn",
)
"""Shared singleton — module-level so all agent activities share the pool."""


def shutdown(wait: bool = True) -> None:
    """Graceful shutdown — call from worker shutdown hook."""
    DOCKER_EXECUTOR.shutdown(wait=wait)
