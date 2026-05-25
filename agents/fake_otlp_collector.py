# agents/fake_otlp_collector.py — codex r4 D5-finding-2 + codex r5 D5-O3 fix.
"""In-process OTLP receiver used by `tests/e2e/test_w376_otel_replay.py` to verify
that `agents/otel_spool.py` writes wire-format `ExportTraceServiceRequest` protobuf
bytes that can be replayed and re-parsed.

codex r5 D5-O3: previously exposed only `__init__/export/all_spans`. The actual e2e
test calls `FakeOTLPCollector(port=0).start() / received_spans() / stop()` — a lifecycle
HTTP server. Aligned the class to match the test's contract: ephemeral-port HTTP server
that accepts POST /v1/traces with OTLP protobuf body, decodes the bytes, retains spans.
"""

from __future__ import annotations

import threading
from http.server import BaseHTTPRequestHandler, HTTPServer

from opentelemetry.proto.collector.trace.v1 import trace_service_pb2


class _OTLPHandler(BaseHTTPRequestHandler):
    """HTTP handler for POST /v1/traces — parses OTLP protobuf, hands off to collector."""

    def do_POST(self):  # noqa: N802 — BaseHTTPRequestHandler contract
        if self.path != "/v1/traces":
            self.send_response(404)
            self.end_headers()
            return
        length = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(length) if length else b""
        try:
            req = trace_service_pb2.ExportTraceServiceRequest()
            req.ParseFromString(body)
            self.server.collector.raw_bytes.append(body)  # type: ignore[attr-defined]
            self.server.collector.requests.append(req)  # type: ignore[attr-defined]
            self.send_response(200)
            self.end_headers()
        except Exception as e:
            self.send_response(400)
            self.end_headers()
            self.wfile.write(str(e).encode())

    def log_message(self, fmt, *args):  # noqa: ARG002 — silence default request logging
        pass


class FakeOTLPCollector:
    """OTLP HTTP receiver with full lifecycle (start/stop) + span access.

    Usage in e2e test (per spec §7.3 + codex r5 D5-O3):
        collector = FakeOTLPCollector(port=0)
        collector.start()
        # ...trigger spool replay against http://localhost:{collector.port}/v1/traces...
        spans = collector.received_spans()
        collector.stop()
    """

    def __init__(self, port: int = 0) -> None:
        self.raw_bytes: list[bytes] = []
        self.requests: list[trace_service_pb2.ExportTraceServiceRequest] = []
        self._port_requested = port
        self._server: HTTPServer | None = None
        self._thread: threading.Thread | None = None
        self.port: int = 0  # populated by start() once bound

    def start(self) -> int:
        """Bind to requested port (0 = ephemeral) and serve in a background thread."""
        self._server = HTTPServer(("127.0.0.1", self._port_requested), _OTLPHandler)
        self._server.collector = self  # type: ignore[attr-defined] — hand-off via attribute
        self.port = self._server.server_address[1]
        self._thread = threading.Thread(target=self._server.serve_forever, daemon=True)
        self._thread.start()
        return self.port

    def stop(self) -> None:
        """Stop the server + join the thread (idempotent)."""
        if self._server is not None:
            self._server.shutdown()
            self._server.server_close()
            self._server = None
        if self._thread is not None:
            self._thread.join(timeout=5)
            self._thread = None

    def received_spans(self) -> list:
        """Flatten ResourceSpans → ScopeSpans → Span list across all received requests."""
        out = []
        for req in self.requests:
            for rs in req.resource_spans:
                for ss in rs.scope_spans:
                    out.extend(ss.spans)
        return out

    # Backward-compat for prior `export(data)` direct-injection callers:
    def export(self, data: bytes) -> None:
        """Programmatic export bypassing HTTP (kept for unit tests that don't need network)."""
        req = trace_service_pb2.ExportTraceServiceRequest()
        req.ParseFromString(data)
        self.raw_bytes.append(data)
        self.requests.append(req)

    def all_spans(self):
        """Alias of received_spans() returning generator (legacy callers)."""
        for span in self.received_spans():
            yield span
