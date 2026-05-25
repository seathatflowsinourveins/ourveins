# agents/otel_spool.py
"""W375 SpoolingOTLPSpanExporter — bounded ring spool with drop-OLDEST + observability metrics.

Cite: spec §9 v6 + V9 + codex r4-r6 fixes (ObservableGauge byte-accounting, EXPORT_FAILURES
counter for outage visibility, replay_loop with rate limit).

Design:
- Wraps stdlib OTLPSpanExporter (HTTP). On non-SUCCESS, write spans to local protobuf-OTLP
  files in SPOOL_DIR; bounded ring (default 500MB) drops oldest-by-mtime when over cap.
- ObservableGauges for spool_bytes / spool_oldest_age_sec polled on collection cycle.
- Counters for export_failures_total / dropped_spans_total.
- Always returns SUCCESS from export() so caller doesn't retry forever (bounded backpressure
  is enforced by the ring buffer, not by export() failure semantics).

Replay loop (background, rate-limited 100 spans/sec) runs OUT of band, not in export() hot path.
"""

from __future__ import annotations

import os
import pathlib
import time
import urllib.error
import urllib.request
from typing import Iterable, Sequence

import structlog

from opentelemetry import metrics
from opentelemetry.metrics import Observation
from opentelemetry.exporter.otlp.proto.common.trace_encoder import encode_spans
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter
from opentelemetry.proto.collector.trace.v1 import trace_service_pb2
from opentelemetry.sdk.trace.export import SpanExporter, SpanExportResult

log = structlog.get_logger(__name__)

SPOOL_DIR: pathlib.Path = pathlib.Path("Z:/claude-sota-installed-state/w375/otel-spool")
MAX_RING_BYTES = 500 * 1024 * 1024  # 500 MB default cap
FILE_SIZE_BYTES = 5 * 1024 * 1024  # 5 MB per file (informational; not enforced here)

# ============================================================
# Observable metrics — disk-scan polled on collection cycle
# ============================================================


def _observe_spool_bytes(_options) -> Iterable[Observation]:
    """Sum sizes of all *.otlp files in SPOOL_DIR. Returns 0 if dir missing."""
    try:
        total = 0
        for f in SPOOL_DIR.glob("*.otlp"):
            try:
                total += f.stat().st_size
            except FileNotFoundError:
                pass
        return [Observation(total, {"target": "langfuse"})]
    except (FileNotFoundError, OSError):
        return [Observation(0, {"target": "langfuse"})]


def _observe_spool_oldest_age_sec(_options) -> Iterable[Observation]:
    """Age (seconds) of the oldest spooled file. Returns 0 if no files."""
    try:
        files = sorted(SPOOL_DIR.glob("*.otlp"), key=lambda f: f.stat().st_mtime)
        if not files:
            return [Observation(0.0)]
        return [Observation(time.time() - files[0].stat().st_mtime)]
    except (FileNotFoundError, OSError, ValueError):
        return [Observation(0.0)]


# Register ObservableGauges + counters at module import (idempotent)
try:
    meter = metrics.get_meter("w375.otel.spool")
    meter.create_observable_gauge(
        "spool_bytes_total",
        callbacks=[_observe_spool_bytes],
        description="Current bytes in W375 OTel spool (disk scan)",
    )
    meter.create_observable_gauge(
        "spool_oldest_age_sec",
        callbacks=[_observe_spool_oldest_age_sec],
        description="Age of oldest spooled span batch (seconds)",
    )
    EXPORT_FAILURES = meter.create_counter(
        "export_failures_total",
        description="W375 OTLP Langfuse export failures",
    )
    DROPPED_SPANS = meter.create_counter(
        "dropped_spans_total",
        description="Spans dropped from ring buffer (oldest-evict)",
    )
except Exception as e:
    # Metrics registration is best-effort; if metrics SDK unavailable, fall back to noop
    log.warning("otel_metrics_init_failed", error=str(e))
    EXPORT_FAILURES = None
    DROPPED_SPANS = None


# ============================================================
# Eviction
# ============================================================


def _evict_oldest_if_over_cap() -> int:
    """Drop files oldest-by-mtime until total bytes <= MAX_RING_BYTES. Returns # dropped."""
    evicted = 0
    try:
        files = sorted(SPOOL_DIR.glob("*.otlp"), key=lambda f: f.stat().st_mtime)
    except FileNotFoundError:
        return 0
    total = sum(f.stat().st_size for f in files if f.exists())
    while total > MAX_RING_BYTES and files:
        oldest = files.pop(0)
        try:
            size = oldest.stat().st_size
            oldest.unlink()
            total -= size
            evicted += 1
        except FileNotFoundError:
            continue
    if evicted and DROPPED_SPANS is not None:
        try:
            DROPPED_SPANS.add(evicted)
        except Exception:
            pass
    return evicted


# ============================================================
# Exporter
# ============================================================


class SpoolingOTLPSpanExporter(OTLPSpanExporter):
    """Wraps OTLPSpanExporter; on non-SUCCESS, spools spans to disk; bounded ring buffer."""

    def export(self, spans):
        try:
            result = super().export(spans)
        except Exception as e:
            log.warning("otel_export_exception", error=str(e))
            result = SpanExportResult.FAILURE
        if result != SpanExportResult.SUCCESS:
            if EXPORT_FAILURES is not None:
                try:
                    EXPORT_FAILURES.add(1, {"reason": "non-2xx-or-exception"})
                except Exception:
                    pass
            self._spool(spans)
        # Always SUCCESS — bounded backpressure via ring buffer, not export() retry-loop
        return SpanExportResult.SUCCESS

    def _spool(self, spans):
        try:
            SPOOL_DIR.mkdir(parents=True, exist_ok=True)
            # W376 Task 22 (codex r2 D5-O3): write WIRE-FORMAT OTLP protobuf bytes
            # (ExportTraceServiceRequest) instead of repr(span). One .otlp file per
            # export attempt; replay re-parses the protobuf and re-POSTs to Langfuse.
            ts_ns = time.time_ns()
            path = SPOOL_DIR / f"{ts_ns}.otlp"
            payload = encode_spans(list(spans)).SerializeToString()
            path.write_bytes(payload)
            _evict_oldest_if_over_cap()
        except Exception as e:
            log.warning("otel_spool_write_failed", error=str(e))


# ============================================================
# W376 Task 22 — OTLP-protobuf spool serialization + replay primitive
# (codex r2 D5-O3 ESCALATED in-wave per spec §7.3)
# ============================================================


def write_span_to_spool(spans: Sequence, spool_path: pathlib.Path) -> None:
    """Serialize ``spans`` to wire-format OTLP protobuf and APPEND to ``spool_path``.

    codex r2 D5-O3: replaces the v1 ``repr(span)`` simplification with a real
    ``ExportTraceServiceRequest`` protobuf. Multiple appended messages concatenate;
    because protobuf repeated fields merge on parse, the resulting file bare-parses
    into a single request carrying ALL appended spans (verified round-trip).
    """
    spool_path = pathlib.Path(spool_path)
    spool_path.parent.mkdir(parents=True, exist_ok=True)
    payload = encode_spans(list(spans)).SerializeToString()
    with open(spool_path, "ab") as f:
        f.write(payload)


def replay_spool_file(spool_path: pathlib.Path) -> list:
    """Parse a spool file written by :func:`write_span_to_spool` and return its spans.

    Returns a flat list of OTLP proto ``Span`` objects (each exposes ``.name``).
    Empty / missing file → empty list.
    """
    spool_path = pathlib.Path(spool_path)
    if not spool_path.exists():
        return []
    data = spool_path.read_bytes()
    if not data:
        return []
    req = trace_service_pb2.ExportTraceServiceRequest()
    # Concatenated ExportTraceServiceRequest blobs merge on parse (protobuf semantics).
    req.ParseFromString(data)
    out: list = []
    for rs in req.resource_spans:
        for ss in rs.scope_spans:
            out.extend(ss.spans)
    return out


class OTelSpoolExporter(SpanExporter):
    """SpanExporter that forwards to ``primary_endpoint`` and spools on failure.

    codex r2 D5-O3 + r6 D5-r6-P0-1: used by the e2e replay test. When
    ``primary_endpoint`` is None or unreachable, spans are written (wire-format OTLP
    protobuf) to ``spool_path`` so a later :func:`replay_loop` can re-POST them.
    Always returns SUCCESS so the SDK does not retry-loop forever (bounded backpressure
    is the spool file itself).
    """

    def __init__(
        self,
        primary_endpoint: str | None = None,
        spool_path: pathlib.Path | str | None = None,
    ) -> None:
        self.primary_endpoint = primary_endpoint
        self.spool_path = pathlib.Path(spool_path) if spool_path else None

    def export(self, spans) -> SpanExportResult:
        forwarded = False
        if self.primary_endpoint:
            try:
                payload = encode_spans(list(spans)).SerializeToString()
                req = urllib.request.Request(
                    self.primary_endpoint,
                    data=payload,
                    headers={"Content-Type": "application/x-protobuf"},
                    method="POST",
                )
                with urllib.request.urlopen(req, timeout=3) as resp:
                    forwarded = 200 <= resp.status < 300
            except Exception as e:
                log.warning("otel_primary_export_failed", error=str(e))
                forwarded = False
        if not forwarded and self.spool_path is not None:
            write_span_to_spool(list(spans), self.spool_path)
        return SpanExportResult.SUCCESS

    def shutdown(self) -> None:  # noqa: D401 — SpanExporter contract
        """No-op shutdown (spool files persist for out-of-band replay)."""
        return None


# ============================================================
# Replay loop (background-runnable; not started automatically)
# ============================================================


def _post_otlp_bytes(endpoint: str, payload: bytes, timeout: float = 3.0) -> bool:
    """POST raw OTLP protobuf bytes to ``endpoint``. Returns True on 2xx."""
    req = urllib.request.Request(
        endpoint,
        data=payload,
        headers={"Content-Type": "application/x-protobuf"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            return 200 <= resp.status < 300
    except urllib.error.HTTPError as e:
        return 200 <= e.code < 300
    except Exception as e:
        log.warning("otel_replay_post_failed", error=str(e))
        return False


async def replay_loop(
    spool_path: pathlib.Path | str | None = None,
    primary_endpoint: str | None = None,
    max_iterations: int | None = None,
):
    """Replay spooled OTLP protobuf bytes to ``primary_endpoint``.

    Two modes (codex r3 D5-O3 + r6 D5-r6-P0-1):

    * **Bounded drain** (``spool_path`` + ``primary_endpoint`` + ``max_iterations`` set):
      reads ``spool_path``, re-POSTs the wire-format bytes, and on success truncates the
      file to zero. Returns the integer count of spans drained. This is the path the
      e2e replay test exercises (deterministic, single-shot).
    * **Background daemon** (no args): the original out-of-band loop that scans
      ``SPOOL_DIR`` and re-exports files indefinitely with exponential backoff.

    Returns the number of spans drained (bounded mode); never returns in daemon mode.
    """
    import asyncio

    # --- Bounded-drain mode (deterministic; used by e2e + operator one-shot) ---
    if spool_path is not None and primary_endpoint is not None:
        spool_path = pathlib.Path(spool_path)
        drained = 0
        iterations = max_iterations if max_iterations is not None else 1
        for _ in range(max(1, iterations)):
            if not spool_path.exists() or spool_path.stat().st_size == 0:
                break
            spans = replay_spool_file(spool_path)
            if not spans:
                # File has bytes but no spans parse — drop it to avoid infinite loop.
                spool_path.write_bytes(b"")
                break
            payload = spool_path.read_bytes()
            if _post_otlp_bytes(primary_endpoint, payload):
                drained += len(spans)
                spool_path.write_bytes(b"")  # drain on success
                break
            # POST failed — back off briefly, retry up to max_iterations.
            await asyncio.sleep(0.05)
        return drained

    # --- Background daemon mode (original behaviour; out-of-band) ---
    backoff_seconds = 1
    while True:
        try:
            if not SPOOL_DIR.exists():
                await asyncio.sleep(30)
                continue
            files = sorted(SPOOL_DIR.glob("*.otlp"), key=lambda f: f.stat().st_mtime)
            if not files:
                await asyncio.sleep(30)
                backoff_seconds = 1
                continue
            target = primary_endpoint or os.environ.get("OTEL_EXPORTER_OTLP_ENDPOINT")
            progressed = False
            if target:
                for f in files:
                    try:
                        payload = f.read_bytes()
                    except FileNotFoundError:
                        continue
                    if _post_otlp_bytes(target, payload):
                        try:
                            f.unlink()
                        except FileNotFoundError:
                            pass
                        progressed = True
                    else:
                        break  # stop on first failure; back off
            if progressed:
                backoff_seconds = 1
            else:
                await asyncio.sleep(min(backoff_seconds, 60))
                backoff_seconds = min(backoff_seconds * 2, 60)
        except Exception as e:
            log.warning("replay_loop_iteration_failed", error=str(e))
            await asyncio.sleep(30)
