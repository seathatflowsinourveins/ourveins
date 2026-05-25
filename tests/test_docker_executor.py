import asyncio
import time
import pytest
from agents.docker_executor import DOCKER_EXECUTOR


def test_docker_executor_has_dedicated_worker_pool():
    assert DOCKER_EXECUTOR._max_workers >= 8
    # ThreadPoolExecutor spawns worker threads lazily on first submit — warm the pool
    # so the "docker-spawn" thread-name-prefix assertion is deterministic regardless of
    # test execution order (otherwise _threads is empty when this runs first).
    DOCKER_EXECUTOR.submit(lambda: None).result()
    assert any("docker-spawn" in t.name for t in DOCKER_EXECUTOR._threads or ())


@pytest.mark.asyncio
async def test_docker_executor_parallelism_independent_of_default_to_thread():
    """Blocking 12 work items on DOCKER_EXECUTOR MUST NOT block asyncio.to_thread coros."""
    loop = asyncio.get_event_loop()

    def block_1s():
        time.sleep(1.0)
        return "docker"

    async def via_default_to_thread():
        return await asyncio.to_thread(lambda: time.sleep(0.1) or "default")

    t0 = time.monotonic()
    docker_coros = [loop.run_in_executor(DOCKER_EXECUTOR, block_1s) for _ in range(12)]
    default_coros = [via_default_to_thread() for _ in range(4)]
    docker_results, default_results = await asyncio.gather(
        asyncio.gather(*docker_coros),
        asyncio.gather(*default_coros),
    )
    elapsed = time.monotonic() - t0
    # docker work runs in parallel (12 items × 1s on 12 threads ≈ 1s)
    # default to_thread runs concurrently on its own pool
    assert elapsed < 2.0, f"pools should be independent; got {elapsed:.2f}s"
    assert all(r == "docker" for r in docker_results)
    assert all(r == "default" for r in default_results)
