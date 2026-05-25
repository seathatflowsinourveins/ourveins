"""Tests for agents/sandbox_semaphore.py — host CPU/RAM backpressure (W376 Task 21).

Cite: plan Task 21 Step 3 (capacity-bounce retry, codex r2 D3-r2-P0-1) + spec §5.9.

psutil is mocked throughout — these tests assert the budget arithmetic and the
retryable-exception contract, not real host capacity.
"""

from __future__ import annotations

from unittest.mock import MagicMock

import pytest

from agents.sandbox_semaphore import SandboxSlotSemaphore


@pytest.mark.asyncio
async def test_capacity_bounce_retries_until_slot_free(monkeypatch):
    """codex r2 D3-r2-P0-1: SandboxCapacityExceeded MUST be retryable, not terminal."""
    from agents.sandbox_semaphore import SandboxSlotSemaphore

    sem = SandboxSlotSemaphore(
        mem_per_container_gb=2.0, cpu_per_container=2.0, headroom_pct=0.20
    )
    # Mock psutil to first deny, then allow
    sequence = iter(
        [
            MagicMock(available=int(1e9)),  # 1 GB available — DENY
            MagicMock(available=int(50e9)),  # 50 GB available — ALLOW
        ]
    )
    monkeypatch.setattr("psutil.virtual_memory", lambda: next(sequence))
    monkeypatch.setattr("psutil.cpu_count", lambda logical=False: 16)
    # First acquire DENIES with retryable type
    with pytest.raises(Exception) as ei:
        await sem.acquire()
    assert "SandboxCapacityExceeded" in str(ei.value)
    assert getattr(ei.value, "non_retryable", False) is False
    # Second acquire ALLOWS
    await sem.acquire()
    assert sem._active == 1


@pytest.mark.asyncio
async def test_acquire_allows_when_capacity_available(monkeypatch):
    """Ample RAM + cores → acquire succeeds and increments _active."""
    sem = SandboxSlotSemaphore(
        mem_per_container_gb=2.0, cpu_per_container=2.0, headroom_pct=0.20
    )
    monkeypatch.setattr("psutil.virtual_memory", lambda: MagicMock(available=int(64e9)))
    monkeypatch.setattr("psutil.cpu_count", lambda logical=False: 16)
    await sem.acquire()
    assert sem._active == 1
    await sem.acquire()
    assert sem._active == 2


@pytest.mark.asyncio
async def test_acquire_denies_on_memory_budget(monkeypatch):
    """Low RAM trips the mem branch even when CPU is plentiful."""
    sem = SandboxSlotSemaphore(
        mem_per_container_gb=2.0, cpu_per_container=2.0, headroom_pct=0.20
    )
    # 1 GB avail → mem_budget = 0.8g < 2.0g for the first container.
    monkeypatch.setattr("psutil.virtual_memory", lambda: MagicMock(available=int(1e9)))
    monkeypatch.setattr("psutil.cpu_count", lambda logical=False: 64)
    with pytest.raises(Exception) as ei:
        await sem.acquire()
    assert "SandboxCapacityExceeded: mem" in str(ei.value)
    assert getattr(ei.value, "non_retryable", False) is False
    assert sem._active == 0  # denied acquire does NOT increment


@pytest.mark.asyncio
async def test_acquire_denies_on_cpu_budget(monkeypatch):
    """Plentiful RAM but too few cores trips the cpu branch (retryable)."""
    sem = SandboxSlotSemaphore(
        mem_per_container_gb=2.0, cpu_per_container=2.0, headroom_pct=0.20
    )
    # 64 GB avail → mem fine; 1 physical core → cpu_budget = 0.8 < 2.0.
    monkeypatch.setattr("psutil.virtual_memory", lambda: MagicMock(available=int(64e9)))
    monkeypatch.setattr("psutil.cpu_count", lambda logical=False: 1)
    with pytest.raises(Exception) as ei:
        await sem.acquire()
    assert "SandboxCapacityExceeded: cpu" in str(ei.value)
    assert getattr(ei.value, "non_retryable", False) is False
    assert sem._active == 0


@pytest.mark.asyncio
async def test_release_is_idempotent_and_floored(monkeypatch):
    """release() never drives _active below 0 and is safe to over-call."""
    sem = SandboxSlotSemaphore(
        mem_per_container_gb=2.0, cpu_per_container=2.0, headroom_pct=0.20
    )
    monkeypatch.setattr("psutil.virtual_memory", lambda: MagicMock(available=int(64e9)))
    monkeypatch.setattr("psutil.cpu_count", lambda logical=False: 16)
    await sem.acquire()
    assert sem._active == 1
    await sem.release()
    assert sem._active == 0
    # Over-release stays floored at 0.
    await sem.release()
    await sem.release()
    assert sem._active == 0


@pytest.mark.asyncio
async def test_acquire_release_roundtrip_frees_slot(monkeypatch):
    """A released slot is available for re-acquire at the same capacity."""
    sem = SandboxSlotSemaphore(
        mem_per_container_gb=2.0, cpu_per_container=2.0, headroom_pct=0.20
    )
    monkeypatch.setattr("psutil.virtual_memory", lambda: MagicMock(available=int(8e9)))
    # 8 GB → mem_budget 6.4g → exactly 3 containers (3*2=6 ≤ 6.4, 4*2=8 > 6.4).
    monkeypatch.setattr("psutil.cpu_count", lambda logical=False: 16)
    await sem.acquire()
    await sem.acquire()
    await sem.acquire()
    assert sem._active == 3
    # 4th would exceed mem budget.
    with pytest.raises(Exception):
        await sem.acquire()
    assert sem._active == 3
    # Free one, then the next acquire succeeds.
    await sem.release()
    assert sem._active == 2
    await sem.acquire()
    assert sem._active == 3


# --- Capacity-worksheet validation: assert the budget formula matches the doc table ---


@pytest.mark.asyncio
@pytest.mark.parametrize(
    "host_ram_gb,host_cores,target_n,expect_allow",
    [
        # (mirrors docs/architecture/W376-RESEARCH/CAPACITY-WORKSHEET.md rows)
        (32, 8, 8, False),  # cpu 16 > 6.4
        (64, 24, 8, True),  # mem 16 ≤ 51.2; cpu 16 ≤ 19.2
        (32, 8, 3, True),  # mem 6; cpu 6 ≤ 6.4
        (32, 8, 4, False),  # cpu 8 > 6.4
        (32, 8, 32, False),  # cpu 64 > 6.4
        (128, 32, 100, False),  # cpu 200 > 25.6
        (128, 32, 12, True),  # mem 24; cpu 24 ≤ 25.6
    ],
)
async def test_worksheet_rows_match_formula(
    monkeypatch, host_ram_gb, host_cores, target_n, expect_allow
):
    """The acquire() admit/deny boundary reproduces the capacity-worksheet verdicts.

    We hold _active at (target_n - 1) and probe whether the target_n-th acquire is
    admitted, so a single acquire() call settles the worksheet row.
    """
    sem = SandboxSlotSemaphore(
        mem_per_container_gb=2.0, cpu_per_container=2.0, headroom_pct=0.20
    )
    # `available` reflects the worksheet's "Host RAM" column (full host, idle).
    monkeypatch.setattr(
        "psutil.virtual_memory",
        lambda: MagicMock(available=int(host_ram_gb * 1e9)),
    )
    monkeypatch.setattr("psutil.cpu_count", lambda logical=False: host_cores)
    sem._active = target_n - 1
    if expect_allow:
        await sem.acquire()
        assert sem._active == target_n
    else:
        with pytest.raises(Exception) as ei:
            await sem.acquire()
        assert "SandboxCapacityExceeded" in str(ei.value)
        assert sem._active == target_n - 1
