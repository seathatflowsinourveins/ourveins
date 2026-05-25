---
title: W170 F1 — Stack-B Langfuse MCP + Stack-C OTel→Phoenix FINAL INSTALL PLAN
status: AUTHORITATIVE
date: 2026-05-13
agent: Agent B (sota-researcher; orchestrator-direct Pattern A validator)
wave: 170
fire: 1
priority: P2
output_budget: 500 LOC
cite_class: |
  constituents=[
    TIER-1-DIRECT @ avivsinai/langfuse-mcp@0.9.1 README + PyPI info.version,
    TIER-1-DIRECT @ https://opentelemetry.io/docs/languages/python/getting-started/,
    TIER-2 @ Z:/claude-sota-installed/docs/observability-stack-audit-w164-f39-2026-05-13.md,
    TIER-3-LOCAL-COMPOSITION @ sss-novel OTel→Phoenix integration
  ]; effective_tier=TIER-3-LOCAL-COMPOSITION
---

# §1 FM-20 Refresh-Check Log (every anchor probed this fire)

| Anchor | Pre-fire claim | Runtime-probed state | Verdict |
|---|---|---|---|
| `avivsinai/langfuse-mcp` PyPI | `@0.9.1` | `0.9.1` [VERIFIED via PyPI JSON] | MATCH |
| `avivsinai/langfuse-mcp` HEAD | none | `a55d440988205c48633e157bddc72ce50dfafd19` on `main` 2026-05-06 [VERIFIED via gh API] | FRESH |
| license | MIT | `MIT` (PyPI + spdx_id) | MATCH |
| stars | n/a | 87★ | NOTED |
| tool count | none stated | **37 tools** across 9 categories | NEW DISCOVERY |
| `@arizeai/phoenix-mcp` | `4.0.11` | `4.0.11` local; `4.0.12` latest npm | 1-patch drift (DEFER per ONE-LOGICAL-UNIT) |
| Phoenix OTLP port | brief said `:4318` HTTP | **`:14317` gRPC** host→container:4317; HTTP 4318 NOT exposed [VERIFIED via docker inspect] | FM-20 CATCH (W169 fix holds) |
| OTel SDK | `1.40.0` pinned | **`1.41.1` latest** matched-set | Update to 1.41.1 |
| `langfuse-postgres` | UP assumed | UP 27h at `:15432` [VERIFIED docker ps] | MATCH |
| `LANGFUSE_PUBLIC_KEY` | extract | `pk-lf-humaneval` [VERIFIED via docker exec psql] | EXTRACTED |
| `LANGFUSE_SECRET_KEY` | pre-seeded | bcrypt hash matches `sk-lf-humaneval-Mxb-1m5CCAe_QWGUmDhxxLGp2A-0-OCg` | VERIFIED |
| `langfuse-web` | UP assumed | `{"status":"OK","version":"3.170.0"}` [VERIFIED `curl :3000/api/public/health`] | MATCH |
| `phoenix` | UP assumed | `OK` [VERIFIED `curl :16006/healthz`] | MATCH |
| `uvx` | assumed | `uvx 0.10.3` at `/c/Users/42/.local/bin/uvx` | MATCH |

# §2 CR-12 Disposition Lattice

| Candidate | Disposition | Rationale |
|---|---|---|
| `avivsinai/langfuse-mcp` | **GENUINELY-NEW** | No incumbent Langfuse MCP; 37 tools cover traces+observations+sessions+exceptions+prompts+datasets. Probe 4: NOT in plugin namespace. Probe 5: stdio MCP via uvx. Probe 6: MIT permissive. Probe 7.b 5-clause PASS (named use-case = LLM observability; source path = pre-seeded `:3000` instance; wiring = `.mcp.json` stdio; no incumbent; reversible `claude mcp remove`). |
| `@arizeai/phoenix-mcp` | **INCUMBENT-KEEP** | Already wired `.mcp.json` `4.0.11`; 1-patch drift DEFER per ONE-LOGICAL-UNIT. |
| OTel SDK `1.41.1` | **PROVIDER-COMPLEMENT** | Code-side span emission. Complements phoenix-mcp (query layer) by enabling emit layer. Sss hooks currently emit no OTel spans. |

# §3 Stack-B Langfuse MCP — INSTALL Recipe

## §3.1 `claude mcp add` command (CR-6 official native channel)

```bash
claude mcp add \
  -e LANGFUSE_PUBLIC_KEY=pk-lf-humaneval \
  -e LANGFUSE_SECRET_KEY=sk-lf-humaneval-Mxb-1m5CCAe_QWGUmDhxxLGp2A-0-OCg \
  -e LANGFUSE_HOST=http://127.0.0.1:3000 \
  -e LANGFUSE_MCP_DEFAULT_OUTPUT_MODE=full_json_file \
  --scope project \
  langfuse -- uvx --python 3.14 langfuse-mcp@0.9.1
```

CR-6 official native channel (uvx from PyPI); CR-9 version-pinned `@0.9.1`; `--python 3.14` per upstream README L143.

## §3.2 `.mcp.json` stdio block (alternative to §3.1)

```json
"langfuse": {
  "type": "stdio",
  "command": "uvx",
  "args": ["--python", "3.14", "langfuse-mcp@0.9.1"],
  "env": {
    "LANGFUSE_PUBLIC_KEY": "pk-lf-humaneval",
    "LANGFUSE_SECRET_KEY": "sk-lf-humaneval-Mxb-1m5CCAe_QWGUmDhxxLGp2A-0-OCg",
    "LANGFUSE_HOST": "http://127.0.0.1:3000",
    "LANGFUSE_MCP_DEFAULT_OUTPUT_MODE": "full_json_file"
  }
},
```

Use §3.1 OR §3.2 (not both). Recommend §3.1 first (CLI atomicity).

# §4 Stack-C OTel SDK → Phoenix — INSTALL Recipe

## §4.1 Pip Install (CR-6 PyPI channel)

```bash
Z:/venvs/claude/Scripts/pip.exe install \
  opentelemetry-api==1.41.1 \
  opentelemetry-sdk==1.41.1 \
  opentelemetry-exporter-otlp-proto-grpc==1.41.1
```

CR-9 matched-set pinning (gRPC exporter must match SDK+API).

## §4.2 `scripts/_otel_init.py` Source (~55 LOC)

```python
"""Shared OTel init — Stack-C span emission to Phoenix (W170 F1)."""

import os
from opentelemetry import trace
from opentelemetry.sdk.resources import Resource
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter

_INITIALIZED = False
_DEFAULT_ENDPOINT = "http://127.0.0.1:14317"  # phoenix host:14317 gRPC per W164 F39
_DEFAULT_SERVICE = "claude-sota-installed"


def _setup_provider() -> None:
    global _INITIALIZED
    if _INITIALIZED:
        return
    endpoint = os.environ.get("OTEL_EXPORTER_OTLP_ENDPOINT", _DEFAULT_ENDPOINT)
    service_name = os.environ.get("OTEL_SERVICE_NAME", _DEFAULT_SERVICE)
    resource = Resource.create({
        "service.name": service_name,
        "service.namespace": "eee",
        "deployment.environment": os.environ.get("EEE_ENV", "local"),
    })
    provider = TracerProvider(resource=resource)
    exporter = OTLPSpanExporter(endpoint=endpoint, insecure=True)
    provider.add_span_processor(BatchSpanProcessor(exporter))
    trace.set_tracer_provider(provider)
    _INITIALIZED = True


def get_tracer(name: str):
    _setup_provider()
    return trace.get_tracer(name)
```

# §5 Smoke-PASS Recipe (Iron Law 2-step verify)

## §5.1 Stack-B Langfuse

```bash
claude mcp list 2>&1 | grep -i langfuse  # expect "✓ Connected"
curl -sS -u "pk-lf-humaneval:sk-lf-humaneval-Mxb-1m5CCAe_QWGUmDhxxLGp2A-0-OCg" \
  "http://127.0.0.1:3000/api/public/traces?limit=5" | head -c 500
# expect {"data":[...],"meta":{...}} 200 OK
```

## §5.2 Stack-C OTel→Phoenix

```bash
Z:/venvs/claude/Scripts/python.exe -c "
import sys; sys.path.insert(0, 'Z:/claude-sota-installed')
from scripts._otel_init import get_tracer
tracer = get_tracer('eee.w170.smoke')
with tracer.start_as_current_span('w170-f1-smoke-test') as span:
    span.set_attribute('test.purpose', 'stack-c-wire-verify')
print('span emitted; sleeping 3s for flush...')
import time; time.sleep(3)
print('OK')
"
# Then verify in Phoenix UI :16006 → Traces → service "claude-sota-installed"
```

## §5.3 Failure-Recovery Contracts

- Langfuse MCP fails register: probe `claude mcp list 2>&1 | grep -i error`; retry `--python 3.10` if 3.14 unavailable; rollback `claude mcp remove langfuse`
- OTel gRPC connection refused: `docker ps | grep phoenix` UP check; HTTP fallback at 4318 requires container port expose (DEFER)
- NO completion claim until BOTH §5.1 JSON 200 OK AND §5.2 span in Phoenix UI per `superpowers:verification-before-completion` Iron Law

# §6 Pattern A Apply Sequence

1. `docker ps` verify (DONE this fire — 10 containers UP 27h)
2. `claude mcp add ... langfuse` per §3.1
3. `claude mcp list` verify
4. `curl` langfuse API per §5.1 Step 2
5. `pip install` OTel triplet per §4.1
6. `Write` `scripts/_otel_init.py` per §4.2
7. `python -c "..."` smoke per §5.2 Step 1
8. Phoenix UI verify per §5.2 Step 2
9. Commit citing this artifact + smoke evidence + CR-12 disposition + Mia probe log

# §7 Cross-Model Gate (CR-3 Phase 1 bootstrap exception)

Orchestrator-direct fire (no subagent BRIDGE-MODE). T1+T2+T3 mechanically enforce at Pattern A apply step 9 commit per manifest §2 L84 T1-T7 INSTALLED-AND-WIRED status.

## ARTIFACT-INLINE: tmp/wave170-fire1-agentB-obs-wire-install-plan-2026-05-13.md
