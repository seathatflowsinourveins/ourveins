import asyncio
import pytest
from agents.jury_quota_ledger import JuryQuotaLedger


@pytest.mark.asyncio
async def test_5h_rolling_cost_denies_after_cap(tmp_path):
    """codex r2 D4-P4: rolling-cost quota DENIES the 21st acquisition in 5h window."""
    led = JuryQuotaLedger(
        db_path=str(tmp_path / "q.db"), max_jury_per_5h=20, max_concurrent_jury=10
    )
    for i in range(20):
        await led.acquire(f"conv-{i}")
        led.release()
    with pytest.raises(RuntimeError, match="JuryQuotaExceeded"):
        await led.acquire("conv-21")


@pytest.mark.asyncio
async def test_concurrent_slot_blocks_at_cap(tmp_path):
    """codex r2 D4-P4: concurrent-slot quota BLOCKS additional acquires until release."""
    led = JuryQuotaLedger(
        db_path=str(tmp_path / "q.db"), max_jury_per_5h=1000, max_concurrent_jury=2
    )
    await led.acquire("c1")
    await led.acquire("c2")
    # 3rd acquire must block; assert via wait_for timeout
    with pytest.raises(asyncio.TimeoutError):
        await asyncio.wait_for(led.acquire("c3"), timeout=0.2)
    led.release()
    # Now the previously-blocked acquire can proceed
    await asyncio.wait_for(led.acquire("c3"), timeout=0.5)


@pytest.mark.asyncio
async def test_rolling_cost_counts_released_acquisitions(tmp_path):
    """codex r2 D4-P4: released slots still count toward 5h rolling spend (audit trail immutable)."""
    led = JuryQuotaLedger(
        db_path=str(tmp_path / "q.db"), max_jury_per_5h=5, max_concurrent_jury=100
    )
    for i in range(5):
        await led.acquire(f"conv-{i}")
        led.release()  # explicitly release — should NOT free 5h-budget slot
    with pytest.raises(RuntimeError, match="JuryQuotaExceeded"):
        await led.acquire("conv-6")
