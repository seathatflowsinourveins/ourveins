# tests/test_otel_spool.py
import time


def test_spool_dir_setting(tmp_path, monkeypatch):
    monkeypatch.setattr("agents.otel_spool.SPOOL_DIR", tmp_path)
    from agents.otel_spool import SPOOL_DIR

    assert SPOOL_DIR == tmp_path


def test_observable_gauge_callbacks_present():
    from agents.otel_spool import _observe_spool_bytes, _observe_spool_oldest_age_sec

    obs1 = list(_observe_spool_bytes(None))
    obs2 = list(_observe_spool_oldest_age_sec(None))
    assert len(obs1) >= 1
    assert len(obs2) >= 1
    # Each Observation should expose .value
    assert hasattr(obs1[0], "value") or isinstance(obs1[0].value, (int, float))


def test_observe_spool_bytes_sums_disk(tmp_path, monkeypatch):
    monkeypatch.setattr("agents.otel_spool.SPOOL_DIR", tmp_path)
    (tmp_path / "a.otlp").write_bytes(b"X" * 100)
    (tmp_path / "b.otlp").write_bytes(b"Y" * 200)
    from agents.otel_spool import _observe_spool_bytes

    obs = list(_observe_spool_bytes(None))
    assert obs[0].value == 300


def test_observe_spool_oldest_age_zero_when_empty(tmp_path, monkeypatch):
    monkeypatch.setattr("agents.otel_spool.SPOOL_DIR", tmp_path)
    from agents.otel_spool import _observe_spool_oldest_age_sec

    obs = list(_observe_spool_oldest_age_sec(None))
    assert obs[0].value == 0.0


def test_evict_oldest_drops_when_over_cap(tmp_path, monkeypatch):
    monkeypatch.setattr("agents.otel_spool.SPOOL_DIR", tmp_path)
    monkeypatch.setattr("agents.otel_spool.MAX_RING_BYTES", 500)  # tiny cap for test
    # Write 3 files of 250 bytes each = 750B total, exceeds 500B cap -> expect 1+ evicted
    for i, name in enumerate(["a.otlp", "b.otlp", "c.otlp"]):
        p = tmp_path / name
        p.write_bytes(b"x" * 250)
        # stagger mtimes so eviction is deterministic
        ts = time.time() - (10 - i)
        import os

        os.utime(p, (ts, ts))
    from agents.otel_spool import _evict_oldest_if_over_cap

    evicted = _evict_oldest_if_over_cap()
    remaining = list(tmp_path.glob("*.otlp"))
    assert evicted >= 1
    # Total remaining should be at or below cap
    total = sum(f.stat().st_size for f in remaining)
    assert total <= 500


def test_exporter_class_exists():
    from agents.otel_spool import SpoolingOTLPSpanExporter

    assert SpoolingOTLPSpanExporter is not None
