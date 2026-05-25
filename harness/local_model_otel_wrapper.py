#!/usr/bin/env python3
# W320 P1 / W319-3 REC-3 implementation — local-model cost tracking via OTel custom attributes.
#
# Why this exists:
#   Langfuse 3.170 attributes $0 to all IkLlama/Ollama spans because no LLM-cost convention
#   exists for local inference. This wrapper extends OpenInference semantic-conventions with
#   `.local` suffix attributes so Langfuse dashboards can surface per-trace local spend.
#
# References:
#   - OpenInference semantic-conventions v0.40+ (`gen_ai.cost.*` for cloud)
#   - OTel Python SDK https://opentelemetry-python.readthedocs.io/en/latest/sdk/
#   - W319-3 Stream report REC-3 (~30 min single-file implementation)
#
# Usage:
#   from harness.local_model_otel_wrapper import track_local_completion, wrap_openai_client
#
#   # Pattern A — context manager for a single call:
#   with track_local_completion(model="qwen3-coder:30b", endpoint="http://127.0.0.1:8080/v1") as span:
#       r = openai_client.chat.completions.create(...)
#       span.record_usage(input_tokens=r.usage.prompt_tokens,
#                         output_tokens=r.usage.completion_tokens)
#
#   # Pattern B — auto-wrap an openai.OpenAI client (call-site transparent):
#   client = wrap_openai_client(openai.OpenAI(base_url="http://127.0.0.1:8080/v1", api_key="local"))
#   # every .chat.completions.create() emits a span automatically.
#
# Environment (already set in .claude/settings.json):
#   OTEL_EXPORTER_OTLP_TRACES_ENDPOINT  http://127.0.0.1:3000/api/public/otel/v1/traces
#   OTEL_TRACES_EXPORTER                otlp
#   OTEL_EXPORTER_OTLP_TRACES_PROTOCOL  http/protobuf

from __future__ import annotations

import base64
import os
import time
from contextlib import contextmanager
from typing import Any, Iterator, Optional

from opentelemetry import trace
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter
from opentelemetry.sdk.resources import Resource
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor


def _langfuse_auth_header() -> Optional[str]:
    """Build the Basic-auth header Langfuse's OTLP receiver requires.

    Langfuse v3+ rejects unauthenticated OTLP traffic with HTTP 401 unless the
    request carries `Authorization: Basic base64(PUBLIC:SECRET)`. Keys live in
    CLAUDE.local.md (gitignored) and are exported into the CC process env.
    Returns None when keys are missing — caller may emit spans without auth for
    smoke-testing, but Langfuse will reject them.
    """
    pk = os.environ.get("LANGFUSE_PUBLIC_KEY")
    sk = os.environ.get("LANGFUSE_SECRET_KEY")
    if not pk or not sk:
        return None
    return "Basic " + base64.b64encode(f"{pk}:{sk}".encode("utf-8")).decode("ascii")


# Custom attribute names — extend OpenInference semantic-conventions with `.local` suffix.
ATTR_INPUT_TOKENS_LOCAL = "gen_ai.tokens.input.local"
ATTR_OUTPUT_TOKENS_LOCAL = "gen_ai.tokens.output.local"
ATTR_COST_GPU_SECONDS = "gen_ai.cost.gpu_seconds"
ATTR_MODEL = "gen_ai.request.model"
ATTR_PROVIDER = "gen_ai.system"
ATTR_ENDPOINT = "gen_ai.request.endpoint"
ATTR_OPERATION = "gen_ai.operation.name"

_tracer_provider_singleton: Optional[TracerProvider] = None


def _provider() -> TracerProvider:
    """Lazy-init a singleton TracerProvider so multiple wrappers share spans."""
    global _tracer_provider_singleton
    if _tracer_provider_singleton is not None:
        return _tracer_provider_singleton

    endpoint = os.environ.get(
        "OTEL_EXPORTER_OTLP_TRACES_ENDPOINT",
        "http://127.0.0.1:3000/api/public/otel/v1/traces",
    )
    service_name = os.environ.get(
        "OTEL_SERVICE_NAME", "claude-sota-installed-local-model-wrapper"
    )

    auth_header = _langfuse_auth_header()
    exporter_headers = {"Authorization": auth_header} if auth_header else None

    resource = Resource.create(
        {"service.name": service_name, "deployment.environment": "local"}
    )
    provider = TracerProvider(resource=resource)
    provider.add_span_processor(
        BatchSpanProcessor(
            OTLPSpanExporter(endpoint=endpoint, headers=exporter_headers)
        )
    )

    trace.set_tracer_provider(provider)
    _tracer_provider_singleton = provider
    return provider


class _LocalCompletionSpan:
    """Wraps an OTel span with a `record_usage()` method that emits the custom attributes."""

    def __init__(self, otel_span):
        self._span = otel_span
        self._start = time.monotonic()

    def record_usage(self, *, input_tokens: int = 0, output_tokens: int = 0) -> None:
        gpu_seconds = time.monotonic() - self._start
        self._span.set_attribute(ATTR_INPUT_TOKENS_LOCAL, int(input_tokens))
        self._span.set_attribute(ATTR_OUTPUT_TOKENS_LOCAL, int(output_tokens))
        self._span.set_attribute(ATTR_COST_GPU_SECONDS, round(gpu_seconds, 4))


@contextmanager
def track_local_completion(
    *,
    model: str,
    endpoint: str,
    provider: str = "local",
    operation: str = "chat.completion",
) -> Iterator[_LocalCompletionSpan]:
    """Open an OTel span tagged for local-model cost tracking.

    The caller MUST invoke `span.record_usage(...)` before exiting the context
    to emit the token + gpu-seconds attributes; otherwise only the start/duration
    are recorded (still useful for trace-graph but $-attribution will read 0).
    """
    _provider()
    tracer = trace.get_tracer("harness.local_model_otel_wrapper")
    span_name = f"local_model.{operation}"
    with tracer.start_as_current_span(span_name) as otel_span:
        otel_span.set_attribute(ATTR_MODEL, model)
        otel_span.set_attribute(ATTR_PROVIDER, provider)
        otel_span.set_attribute(ATTR_ENDPOINT, endpoint)
        otel_span.set_attribute(ATTR_OPERATION, operation)
        yield _LocalCompletionSpan(otel_span)


def wrap_openai_client(client: Any, *, provider: str = "local") -> Any:
    """Monkey-patch chat.completions.create() to emit OTel spans automatically.

    Returns the same client (mutated in place) — callers can use it identically.
    Safe to call multiple times; subsequent calls no-op via a marker attribute.
    """
    marker = "_otel_local_wrapped"
    if getattr(client, marker, False):
        return client

    completions = getattr(getattr(client, "chat", None), "completions", None)
    if completions is None:
        raise ValueError(
            "client has no chat.completions surface — only OpenAI-compatible clients are supported"
        )

    inner = completions.create

    def wrapped(*args: Any, **kwargs: Any) -> Any:
        model = kwargs.get("model", "unknown")
        endpoint = (
            getattr(getattr(client, "_client", None), "base_url", None) or "unknown"
        )
        with track_local_completion(
            model=str(model), endpoint=str(endpoint), provider=provider
        ) as span:
            result = inner(*args, **kwargs)
            usage = getattr(result, "usage", None)
            if usage is not None:
                span.record_usage(
                    input_tokens=getattr(usage, "prompt_tokens", 0) or 0,
                    output_tokens=getattr(usage, "completion_tokens", 0) or 0,
                )
            return result

    completions.create = wrapped
    setattr(client, marker, True)
    return client


__all__ = [
    "ATTR_COST_GPU_SECONDS",
    "ATTR_INPUT_TOKENS_LOCAL",
    "ATTR_OUTPUT_TOKENS_LOCAL",
    "track_local_completion",
    "wrap_openai_client",
]


if __name__ == "__main__":
    # Smoke probe — emits a synthetic span so operators can verify the OTel→Langfuse pipe.
    with track_local_completion(
        model="smoke-test", endpoint="http://127.0.0.1:8080/v1", operation="smoke"
    ) as span:
        time.sleep(0.05)
        span.record_usage(input_tokens=42, output_tokens=128)
    _provider().force_flush(timeout_millis=5000)
    print(
        "local-model OTel span emitted to:",
        os.environ.get("OTEL_EXPORTER_OTLP_TRACES_ENDPOINT", "<default>"),
    )
