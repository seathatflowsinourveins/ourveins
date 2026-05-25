# tests/test_oscillation_detector.py


def test_single_transition_not_oscillation(tmp_path):
    from agents.oscillation_detector import OscillationDetector

    od = OscillationDetector(
        db_path=str(tmp_path / "osc.db"), window_sec=60, max_flips=3
    )
    assert od.detect_and_block("task-001", "STATE_A", "STATE_B") is False


def test_two_transitions_no_pingpong_not_oscillation(tmp_path):
    from agents.oscillation_detector import OscillationDetector

    od = OscillationDetector(
        db_path=str(tmp_path / "osc.db"), window_sec=60, max_flips=2
    )
    # A→B then B→C is forward progress, not oscillation
    od.detect_and_block("task-001", "STATE_A", "STATE_B")
    assert od.detect_and_block("task-001", "STATE_B", "STATE_C") is False


def test_pingpong_above_max_flips_blocks(tmp_path):
    from agents.oscillation_detector import OscillationDetector

    od = OscillationDetector(
        db_path=str(tmp_path / "osc.db"), window_sec=60, max_flips=2
    )
    # A→B→A→B→A → 3 flips (>= max_flips=2) → BLOCK on the 3rd transition that closes the pattern
    od.detect_and_block("task-001", "STATE_A", "STATE_B")  # 0 flips so far
    od.detect_and_block("task-001", "STATE_B", "STATE_A")  # 1 flip (A→B→A)
    od.detect_and_block("task-001", "STATE_A", "STATE_B")  # 2 flips
    assert (
        od.detect_and_block("task-001", "STATE_B", "STATE_A") is True
    )  # 3 flips → BLOCK


def test_window_expires_old_transitions(tmp_path, monkeypatch):
    from agents.oscillation_detector import OscillationDetector

    od = OscillationDetector(
        db_path=str(tmp_path / "osc.db"), window_sec=1, max_flips=2
    )
    base_t = 1000.0
    monkeypatch.setattr(od, "_now", lambda: base_t)
    od.detect_and_block("task-001", "STATE_A", "STATE_B")
    od.detect_and_block("task-001", "STATE_B", "STATE_A")
    # Fast-forward beyond window (2s past)
    monkeypatch.setattr(od, "_now", lambda: base_t + 5.0)
    # Old transitions evicted → new flip doesn't count as oscillation
    assert od.detect_and_block("task-001", "STATE_A", "STATE_B") is False


def test_different_tasks_independent(tmp_path):
    from agents.oscillation_detector import OscillationDetector

    od = OscillationDetector(
        db_path=str(tmp_path / "osc.db"), window_sec=60, max_flips=2
    )
    # task-001 oscillates
    od.detect_and_block("task-001", "STATE_A", "STATE_B")
    od.detect_and_block("task-001", "STATE_B", "STATE_A")
    od.detect_and_block("task-001", "STATE_A", "STATE_B")
    od.detect_and_block("task-001", "STATE_B", "STATE_A")
    # task-002 only had one transition — should NOT be blocked
    assert od.detect_and_block("task-002", "STATE_A", "STATE_B") is False
