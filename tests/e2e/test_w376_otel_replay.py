# tests/e2e/test_w376_otel_replay.py
"""codex r2 D5-O3 ESCALATED: real OTLP-protobuf serialization + replay primitive.

Verifies (1) spool writes wire-format OTLP bytes (not repr(span));
         (2) replay parses ExportTraceServiceRequest and recovers spans.

These run in-process (no live W376 services) — `tmp_path` spool + an in-process
TracerProvider + a FakeOTLPCollector bound to an ephemeral port — so they execute
DETERMINISTICALLY without `W376_E2E_LIVE` (matching the plan's contract).
"""

import pytest
from opentelemetry.proto.collector.trace.v1 import trace_service_pb2

from agents.otel_spool import write_span_to_spool, replay_spool_file


def test_spool_writes_otlp_protobuf_wire_format(tmp_path):
    """Spool file content MUST be a valid ExportTraceServiceRequest proto."""
    from opentelemetry.sdk.trace import TracerProvider

    spool_file = tmp_path / "spool.bin"
    provider = TracerProvider()
    tracer = provider.get_tracer("w376.test")
    with tracer.start_as_current_span("w376.span.test") as span:
        span.set_attribute("conversation_id", "conv-test")
    # Get the span as ReadableSpan; serialize via spool
    write_span_to_spool([span], spool_file)
    # Parse back via OTLP proto
    proto = trace_service_pb2.ExportTraceServiceRequest()
    proto.ParseFromString(spool_file.read_bytes())
    names = [
        s.name for rs in proto.resource_spans for ss in rs.scope_spans for s in ss.spans
    ]
    assert "w376.span.test" in names


def test_replay_loop_recovers_spans_after_endpoint_reconnect(tmp_path):
    """codex r7 D5-r7-P0-2 fix: real implementation (was: empty spool + assert len==3 stub
    that broke CI or magic-passed). Writes 3 spans to spool via real OTel protobuf, then
    verifies replay_spool_file() recovers them. Full e2e disconnect→reconnect→replay
    coverage is in test_langfuse_disconnect_spool_then_reconnect_replay_e2e below.
    """
    from opentelemetry.sdk.trace import TracerProvider
    from opentelemetry.sdk.trace.export import SimpleSpanProcessor

    from agents.otel_spool import OTelSpoolExporter

    spool_file = tmp_path / "spool.bin"
    # Use OTelSpoolExporter directly with no primary endpoint to force pure-spool mode.
    exporter = OTelSpoolExporter(primary_endpoint=None, spool_path=spool_file)
    provider = TracerProvider()
    provider.add_span_processor(SimpleSpanProcessor(exporter))
    tracer = provider.get_tracer("w376.replay.unit")
    for i in range(3):
        with tracer.start_as_current_span(f"w376.replay.unit.{i}") as sp:
            sp.set_attribute("idx", i)
    provider.shutdown()

    # Sanity: spool file populated with non-zero bytes.
    assert spool_file.exists()
    assert spool_file.stat().st_size > 0

    recovered = replay_spool_file(spool_file)
    assert len(recovered) == 3
    recovered_names = sorted(s.name for s in recovered)
    assert recovered_names == [f"w376.replay.unit.{i}" for i in range(3)]


# codex r3 D5-O3 fix (PARTIAL→FIXED): full Langfuse-disconnect spool replay e2e
# (was deferred to W377+; now in-wave per spec §7.3 requirement).
@pytest.mark.asyncio
async def test_langfuse_disconnect_spool_then_reconnect_replay_e2e(
    tmp_path, monkeypatch
):
    """codex r3 D5-O3 fix: end-to-end Langfuse-down → buffer-to-spool → bring-up → replay.

    Scenario:
      1. Boot OTel exporter pointing at fake Langfuse endpoint (start REFUSED).
      2. Run a short openhands_run_activity that emits 5 spans.
      3. Spans are written to spool because endpoint is down.
      4. Bring fake endpoint up.
      5. Invoke `agents.otel_spool.replay_loop()`.
      6. Assert all 5 spans land at the fake endpoint AND spool file is drained.
    """
    from opentelemetry.sdk.trace import TracerProvider
    from opentelemetry.sdk.trace.export import SimpleSpanProcessor

    from agents.fake_otlp_collector import FakeOTLPCollector
    from agents.otel_spool import OTelSpoolExporter, replay_loop

    spool_file = tmp_path / "spool.bin"
    # codex r6 D5-r6-P0-1 fix: start collector ONCE up-front so `collector.port` resolves to a
    # real bound port BEFORE we construct the URL (was: URL built while port==0 → invalid).
    # Then bring collector DOWN immediately so the exporter observes CONNECTION_REFUSED during
    # Step 2-3 (the disconnect-to-spool window). Collector is restarted at Step 4 for replay.
    collector = FakeOTLPCollector(port=0)
    collector.start()  # codex r6 D5-r6-P0-1: start() is SYNC (returns int port); no await.
    collector_url = f"http://127.0.0.1:{collector.port}/v1/traces"
    collector.stop()  # bring collector down so exporter sees CONNECTION_REFUSED in Step 2-3.
    try:
        # Step 1: exporter targets URL — collector down → exporter spools instead of forwarding.
        exporter = OTelSpoolExporter(
            primary_endpoint=collector_url,
            spool_path=spool_file,
        )

        # Step 2-3: emit 5 spans while collector is down.
        # codex r6 D5-r6-P0-1 fix: concrete SimpleSpanProcessor(exporter) wiring — was ellipsis
        # placeholder which never wired the exporter, so spool stayed empty and the test never
        # exercised the disconnect-to-spool path. SimpleSpanProcessor is sync-flush which
        # matches the deterministic-test contract for the assertion at L3699-L3700.
        provider = TracerProvider()
        provider.add_span_processor(SimpleSpanProcessor(exporter))
        tracer = provider.get_tracer("w376.e2e")
        for i in range(5):
            with tracer.start_as_current_span(f"w376.span.disconnect.{i}") as sp:
                sp.set_attribute("conversation_id", f"conv-disconnect-{i}")
        provider.shutdown()  # force flush

        assert spool_file.exists()
        assert spool_file.stat().st_size > 0, (
            "codex r3 D5-O3: spool MUST contain bytes after disconnect"
        )

        # Step 4: bring fake collector BACK up — replay loop will forward spooled bytes here.
        # codex r6 D5-r6-P0-1: start() returns the SAME port (FakeOTLPCollector reuses the
        # ephemeral port allocated at first .start() inside the test fixture so replay URL stays
        # valid; if OS re-allocates, collector_url is re-derived from collector.port).
        collector.start()
        collector_url = f"http://127.0.0.1:{collector.port}/v1/traces"

        # Step 5: invoke replay_loop.
        drained = await replay_loop(
            spool_path=spool_file,
            primary_endpoint=collector_url,
            max_iterations=10,
        )

        # Step 6: assertions.
        assert drained == 5, f"codex r3 D5-O3: expected 5 spans replayed, got {drained}"
        assert spool_file.stat().st_size == 0, "spool drained after successful replay"
        received_names = {s.name for s in collector.received_spans()}
        expected = {f"w376.span.disconnect.{i}" for i in range(5)}
        assert expected.issubset(received_names), (
            f"codex r3 D5-O3: collector missing spans {expected - received_names}"
        )
    finally:
        # codex r6 D5-r6-P0-1: stop() is SYNC — no await (was: `await collector.stop()` would
        # raise TypeError on sync function). Idempotent — safe to call even if start() never
        # ran or stop() already ran in the disconnect-window above.
        try:
            collector.stop()
        except Exception:
            pass
