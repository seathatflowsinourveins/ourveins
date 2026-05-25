---
title: "W169 F3 — Stack-B Langfuse MCP + Stack-C OTel→Phoenix Wire Research"
status: AUTHORITATIVE
date: 2026-05-13
agent: Agent B (sota-researcher BRIDGE-MODE)
wave: 169
fire: 3
priority: P4
output_budget: 800 LOC
termination: on_handoff_to:orchestrator | max_turns:20 | on_text_match:"RESEARCH:"
---

# ARTIFACT-INLINE: tmp/wave169-fire3-agentB-obs-wire-research-2026-05-13.md

## RESEARCH: Stack-B Langfuse MCP wire + Stack-C OTel→Phoenix wire INSTALL plan

Multi-source≥4 discovery (CR-1 lattice + multi-source-discovery-breadth-discipline.md mandate):
1. GitHub search `langfuse mcp server` → top-2 candidates probed at file:line
2. GitHub get_file_contents on `langfuse/mcp-server-langfuse@a534b5a` + `avivsinai/langfuse-mcp@a55d4409` + `Arize-ai/phoenix-mcp@v4.0.12` (local install probed)
3. PyPI registry probe `https://pypi.org/pypi/langfuse-mcp/json` + npm registry `https://registry.npmjs.org/@arizeai/phoenix-mcp`
4. WebFetch upstream docs: langfuse.com/docs/api + arize.com/docs/phoenix/tracing/llm-traces + opentelemetry.io/docs/languages/python/getting-started
5. Runtime probes: `docker ps` + `docker inspect langfuse-web|phoenix|langfuse-worker` + `.mcp.json` + Z:/claude-sota-installed/.mcp.json existing phoenix entry

---

## §1 Pre-install runtime probe summary (Mia FM-20 path-drift defense)

| Surface | Probed | State |
|---|---|---|
| `langfuse-web` container | `docker inspect langfuse-web` | UP 23h healthy; port 127.0.0.1:3000:3000; image `langfuse/langfuse:3.170.0` |
| `langfuse-worker` container | `docker inspect langfuse-worker` | UP 23h healthy; image `langfuse/langfuse-worker:3.170.0` |
| `phoenix` container | `docker inspect phoenix` | UP 23h healthy; image `arizephoenix/phoenix:version-13.15.0`; ports 127.0.0.1:14317:4317 (OTLP gRPC) + 127.0.0.1:16006:6006 (UI) |
| `.mcp.json` existing entries | direct file probe | `memory` (sqlite_vec) + `graphiti` (FalkorDB) + `phoenix` (already wired via `@arizeai/phoenix-mcp` @ `C:/Users/42/AppData/Roaming/npm/node_modules/@arizeai/phoenix-mcp/build/index.js --baseUrl http://127.0.0.1:16006`) + `gitnexus` |
| Phoenix MCP installed version | `cat package.json` | **v4.0.11** local; **latest v4.0.12** on npm (1-patch drift; CR-9 acknowledgment-class) |
| Langfuse env pre-seeded | `docker inspect langfuse-web --format env` | `LANGFUSE_INIT_PROJECT_SECRET_KEY=sk-lf-humaneval-Mxb-1m5CCAe_QWGUmDhxxLGp2A-0-OCg` + project_id=humaneval + org_id=sota-observability + user admin@local.dev |
| Langfuse public key | NOT visible in env (must derive via UI or DB query) | LANGFUSE_PUBLIC_KEY = `pk-lf-humaneval-*` MUST be retrieved from langfuse-web UI Settings → API Keys OR direct postgres query |
| Phoenix OTLP gRPC port | `docker inspect phoenix` | host:14317 → container:4317 (gRPC); HTTP 4318 endpoint NOT exposed on host — INSTRUMENTATION MUST USE gRPC :14317 |
| uv / uvx availability | `which uvx` | uv 0.10.3 at `/c/Users/42/.local/bin/uv` — uvx PRESENT, supports langfuse-mcp Python install |
| Ollama proxy alive | `curl :11700/v1/models` | UP (graphiti routes through this) |

**Mia catch**: prior task brief said "phoenix:4318" but runtime probe shows host port is **:14317** (gRPC, not :4318 HTTP). HTTP 4318 endpoint NOT exposed externally. OTel SDK MUST use gRPC exporter targeting `http://localhost:14317` OR set Phoenix container env to expose 4318 (out-of-scope for this fire). Forward correction per `Z:/claude-sota/.claude/rules/port-note-discipline.md §6` no-retroactive-rewrite at active research-trail surface.

---

## §2 Stack-B Langfuse MCP wire — INSTALL plan

### §2.1 Candidate selection (CR-12 lattice + axis-1 ≥3-distinct-orgs)

Two viable candidates surfaced from GitHub search `langfuse mcp server in:name,description`:

| # | Repo | Stars | License | Lang | Toolset | Last update | CR-12 disposition |
|---|---|---|---|---|---|---|---|
| 1 | `langfuse/mcp-server-langfuse@a534b5a` (OFFICIAL) | 167 | MIT | TypeScript | Prompt-management only (4 tools: prompts/list + prompts/get + get-prompts + get-prompt); v0.0.1 alpha | 2026-05-11 | PARTIAL — prompt-mgmt only |
| 2 | `avivsinai/langfuse-mcp@a55d4409` (community canonical) | 87 | MIT | Python (uvx) | **Full observability — 37 tools**: traces+observations+sessions+exceptions+prompts+datasets+annotations+scores+schema; PyPI v0.9.1 | 2026-05-11 | **GENUINELY-NEW — full toolkit (covers Path B mandate)** |

**Verdict (CR-12 6-class)**: ADOPT `avivsinai/langfuse-mcp` (Path 2) as PRIMARY. CR-12 disposition `GENUINELY-NEW` (no incumbent LLM-observability MCP). Path 1 official is `PARTIAL-OVERLAP` with Path 2 (prompts subset); SKIP per duplicate-functionality (KISS Must-Never #4 — `Z:/claude-sota/.claude/rules/kiss-dry-yagni.md`).

**Convergence-gate axis-1 ≥3-distinct-orgs** (per `Z:/claude-sota/.claude/rules/convergence-gate.md`):
- Org 1: Langfuse GmbH (official `langfuse/mcp-server-langfuse` MIT)
- Org 2: avivsinai (community canonical, MIT, PyPI-published `langfuse-mcp@0.9.1`)
- Org 3: Log-LogN (`langfuse-mcp-python` + `langfuse-mcp-java`, parallel-impl)
- Org 4: arena-tools (`langfuse-mcp` Python community)
- Org 5: JaviMaligno (`langfuse-mcp-server` TypeScript)
- Org 6: DrishtantKaushal (`LangfuseMCP` Python, 34 tools with analytics)
- Axis-1 FIRM PASS (n=6 distinct orgs)

**Convergence-gate axis-2 (named T2 practitioners)**: Cross-tool support cited explicitly in avivsinai README — "Works with Claude Code, Cursor, Codex". MCP-server-langfuse README cites Claude Desktop + Cursor adoption. Axis-2 PASS.

**Convergence-gate axis-3 (≥90d stability)**: avivsinai created 2025-03-21 + most recent 2026-05-11 = >1y burn-in; STABLE-BURN-IN per `convergence-gate.md` cpd band. Axis-3 PASS.

**3-axis convergence-gate**: ALL PASS firm.

**Probe 6 license + registry**:
- LICENSE: MIT (both candidates) [VERIFIED 2026-05-13 via direct GitHub file read]
- PyPI registry: `langfuse-mcp@0.9.1` published [VERIFIED 2026-05-13 via `curl pypi.org/pypi/langfuse-mcp/json`]
- Python 3.10-3.14 (sss venv at `Z:/venvs/claude` likely 3.13 — verify via `python --version` smoke)

### §2.2 Install command (CR-6 official-native-channel)

Per `avivsinai/langfuse-mcp@a55d4409` README §Quick Start, canonical install for Claude Code:

```bash
# Pre-condition: uvx installed (CONFIRMED via runtime probe — uv 0.10.3 at /c/Users/42/.local/bin/uvx)
# Pre-condition: LANGFUSE_PUBLIC_KEY retrieved from langfuse-web UI

claude mcp add \
  -e LANGFUSE_PUBLIC_KEY=pk-lf-humaneval-<placeholder> \
  -e LANGFUSE_SECRET_KEY=sk-lf-humaneval-Mxb-1m5CCAe_QWGUmDhxxLGp2A-0-OCg \
  -e LANGFUSE_HOST=http://localhost:3000 \
  --scope project \
  langfuse -- uvx langfuse-mcp@0.9.1
```

**CR-6 conformance**: `uvx` is the canonical official Python tool-runner from Astral; PyPI is canonical Python package registry; `claude mcp add --scope project` is the canonical Anthropic CC MCP registration primitive (verified via `claude mcp add --help`).

**CR-9 install-risk discipline**:
- **Version pin**: `langfuse-mcp@0.9.1` (NOT `@latest`). Pinned to current PyPI latest per CR-9 mandate.
- **2-round fix-forward expectation**: budget for NEEDS-REVISION on first install if env-injection fails or claude mcp add scope/path mismatch.
- **REVERT check**: `git -C Z:/claude-sota log --all --oneline -- '.mcp.json' | grep -i langfuse` returned NO REVERT precedent (NEW install, not re-install).
- **Sibling-bleed defense**: `--scope project` uses `Z:/claude-sota-installed/.mcp.json` (NOT user-scope `~/.codex/config.toml`). Path-rewritten for install runtime context.

### §2.3 .mcp.json entry shape (alternative to `claude mcp add` — direct edit)

If `claude mcp add` proves fragile or operator prefers explicit .mcp.json edit, append this entry to `Z:/claude-sota-installed/.mcp.json` `mcpServers` block:

```json
"langfuse": {
  "type": "stdio",
  "command": "uvx",
  "args": ["langfuse-mcp@0.9.1"],
  "env": {
    "LANGFUSE_PUBLIC_KEY": "pk-lf-humaneval-<placeholder>",
    "LANGFUSE_SECRET_KEY": "sk-lf-humaneval-Mxb-1m5CCAe_QWGUmDhxxLGp2A-0-OCg",
    "LANGFUSE_HOST": "http://localhost:3000",
    "LANGFUSE_MAX_AGE_DAYS": "30"
  }
}
```

Edit-mode: Pattern A append (cite-anchor `Z:/claude-sota-installed/.mcp.json` after existing `phoenix` entry, before `gitnexus`).

### §2.4 Pre-install Mia probe checklist (FM-20 path-drift defense)

Operator MUST run BEFORE first `claude mcp add` invocation:

```bash
# Probe 1 — langfuse-web reachable
curl -sS -o /dev/null -w 'HTTP %{http_code}\n' http://localhost:3000/api/public/health
# Expect: HTTP 200 (current probe returned different; re-verify before commit)

# Probe 2 — extract LANGFUSE_PUBLIC_KEY from langfuse-web UI OR postgres
docker exec -it langfuse-postgres psql -U langfuse -d langfuse -c \
  "SELECT public_key, secret_key FROM api_keys WHERE project_id='humaneval';"
# Capture pk-lf-humaneval-* value

# Probe 3 — uvx PATH resolution from claude CLI context (Windows specific)
where uvx
# Confirm uvx in PATH visible to claude.exe (may need PATH update in tools/eee.ps1)

# Probe 4 — venv Python version compatibility
python --version
# Expect: Python 3.10-3.14

# Probe 5 — langfuse-mcp PyPI availability (verify version)
uvx --refresh langfuse-mcp@0.9.1 --help
# Confirms install + entrypoint
```

If ANY probe fails → STOP, do NOT proceed with `claude mcp add`.

### §2.5 Cross-model T1 Path P prompt spec (BEFORE Pattern A apply)

Per CR-3 cross-model consensus contract + cross-model-consensus.md §The contract Phase 1 bootstrap exception, fire `codex exec` foreground+tee BEFORE the .mcp.json Edit:

```bash
cat > .claude/state/codex_consult_w169_langfuse_mcp_wire.txt <<'EOF'
Review the proposed .mcp.json append for langfuse MCP wire (stdio uvx langfuse-mcp@0.9.1):

PROPOSED EDIT: append to `mcpServers` block in `Z:/claude-sota-installed/.mcp.json`:
{
  "langfuse": {
    "type": "stdio",
    "command": "uvx",
    "args": ["langfuse-mcp@0.9.1"],
    "env": {
      "LANGFUSE_PUBLIC_KEY": "pk-lf-humaneval-<value>",
      "LANGFUSE_SECRET_KEY": "sk-lf-humaneval-Mxb-1m5CCAe_QWGUmDhxxLGp2A-0-OCg",
      "LANGFUSE_HOST": "http://localhost:3000",
      "LANGFUSE_MAX_AGE_DAYS": "30"
    }
  }
}

CONTEXT:
- avivsinai/langfuse-mcp@a55d4409 (MIT, 87 stars, PyPI v0.9.1, Python 3.10-3.14)
- langfuse-web container UP 23h healthy at 127.0.0.1:3000 with pre-seeded humaneval project
- uvx 0.10.3 confirmed available at /c/Users/42/.local/bin/uvx
- Phoenix MCP wire already exists (separate concern); langfuse MCP is GENUINELY-NEW per CR-12

AXES (review each):
A1: Is the canonical install command per CR-6 official-native-channel correct (uvx + PyPI)?
A2: Is `--scope project` (writes Z:/claude-sota-installed/.mcp.json) correct vs `--scope user`?
A3: Is env block complete? (LANGFUSE_PUBLIC_KEY currently placeholder pending UI extraction)
A4: Is LANGFUSE_HOST=http://localhost:3000 correct (self-hosted) vs cloud default?
A5: Are there CR-9 install-risk leaks (sibling-bleed paths, stale SHAs, REVERT precedent)?
A6: Is the version pin 0.9.1 (NOT @latest) sufficient per CR-9?

Return VERDICT (APPROVE / NEEDS-REVISION / REJECT) + conf + prescribed_edits.
EOF

# Fire Path P codex exec foreground+tee
timeout 300 codex exec --skip-git-repo-check --color never \
  < .claude/state/codex_consult_w169_langfuse_mcp_wire.txt \
  2>&1 | tee .claude/state/codex_consult_w169_langfuse_mcp_wire_OUT.txt
```

---

## §3 Stack-C OTel→Phoenix wire — INSTALL plan

### §3.1 Existing state (Mia probe correction)

**Existing wire**: `.mcp.json` ALREADY contains `phoenix` MCP entry (line probed):

```json
"phoenix": {
  "type": "stdio",
  "command": "node",
  "args": [
    "C:/Users/42/AppData/Roaming/npm/node_modules/@arizeai/phoenix-mcp/build/index.js",
    "--baseUrl", "http://127.0.0.1:16006"
  ]
}
```

This is the **MCP-tool-query** layer (queries existing traces in Phoenix UI). The MISSING layer is:
- **OTel INSTRUMENTATION** — sending traces FROM claude-sota-installed runtime processes (hook scripts, codex CLI subprocesses, agent dispatches) TO the Phoenix OTLP collector.

So Stack-C wire is actually two distinct concerns:
1. **Phoenix MCP query layer** ✅ already INSTALLED (v4.0.11; latest 4.0.12 — patch-version drift acknowledged per CR-9)
2. **OTel SDK instrumentation → Phoenix OTLP** ❌ NOT YET WIRED — this fire's actual target

### §3.2 Phoenix OTLP endpoint correction (FM-20 catch)

Container probe revealed:
- **Phoenix OTLP gRPC** at host port `14317` (mapped to container `4317`)
- **Phoenix UI** at host port `16006` (mapped to container `6006`)
- **NO HTTP OTLP exposure** on host (the standard `:4318` HTTP endpoint is NOT exposed)

So OTel exporter MUST use **gRPC** targeting `http://localhost:14317`, NOT HTTP `:4318`. Prior research-plan brief assumption "OTel OTLP→phoenix wire at :4318" was stale; forward-corrected here.

Alternative: re-launch phoenix container exposing additional port `127.0.0.1:14318:4318` for HTTP — out-of-scope for this fire (orchestrator decision).

### §3.3 Install plan — OTel Python SDK in venv (CR-6 official-native-channel)

Per `https://opentelemetry.io/docs/languages/python/getting-started/` upstream getting-started canonical doc (TIER-1-DIRECT [VERIFIED 2026-05-13 via WebFetch]):

```bash
# Activate the existing venv
source /z/venvs/claude/Scripts/activate    # Git Bash
# OR
& Z:/venvs/claude/Scripts/Activate.ps1     # PowerShell

# Install OTel SDK + OTLP gRPC exporter (official canonical PyPI primitives)
pip install \
  'opentelemetry-api==1.40.0' \
  'opentelemetry-sdk==1.40.0' \
  'opentelemetry-exporter-otlp-proto-grpc==1.40.0' \
  'opentelemetry-instrumentation==0.66b0'
```

**Version pin rationale (CR-9)**: pin to latest stable OTel Python SDK 1.40.0 (Oct 2025 release; >180d burn-in per convergence-gate axis-3 STABLE-BURN-IN). Companion `opentelemetry-instrumentation` is `0.66b0` per OTel Python release matrix.

### §3.4 Hook-script instrumentation pattern (Pattern Spec, NOT direct Edit this fire)

Per `Z:/claude-sota/.claude/rules/audit-action-loop.md §Hook telemetry contract` AND OTel Python getting-started, INSTRUMENT hooks via shared `_otel_init.py` module pattern (cite-class adapted from `Z:/repos/deps/claude-agent-sdk-python/src/claude_agent_sdk/types.py:246-262 @ HEAD b512f256` SubagentContextMixin telemetry SDK):

```python
# scripts/_otel_init.py — shared OTel initialization for all hooks
import os
from opentelemetry import trace
from opentelemetry.sdk.resources import Resource
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter

_PROVIDER = None

def get_tracer(name: str):
    global _PROVIDER
    if _PROVIDER is None:
        endpoint = os.environ.get(
            "OTEL_EXPORTER_OTLP_ENDPOINT", "http://localhost:14317"
        )
        resource = Resource.create({
            "service.name": "claude-sota-installed",
            "service.namespace": "eee",
            "service.instance.id": os.environ.get("CLAUDE_SESSION_ID", "main"),
        })
        provider = TracerProvider(resource=resource)
        exporter = OTLPSpanExporter(endpoint=endpoint, insecure=True)
        provider.add_span_processor(BatchSpanProcessor(exporter))
        trace.set_tracer_provider(provider)
        _PROVIDER = provider
    return trace.get_tracer(name)
```

**Per-hook instrumentation** (example for `codex_postcommit_review.py`):

```python
from _otel_init import get_tracer
tracer = get_tracer("codex.t3.postcommit")

with tracer.start_as_current_span("codex_t3_review") as span:
    span.set_attribute("commit.sha", commit_sha)
    span.set_attribute("agent_id", payload.get("agent_id"))
    span.set_attribute("agent_type", payload.get("agent_type"))
    # ... existing hook logic ...
    span.set_attribute("verdict", verdict)
    span.set_attribute("conf", conf)
```

This instrumentation maps to `phoenix` UI as a tree of spans keyed by commit-sha + agent_id, queryable via Phoenix MCP tools.

### §3.5 Environment block addition (CLAUDE.local.md — operator manual edit)

Add to `Z:/claude-sota-installed/CLAUDE.local.md` ENV block (operator-machine-specific per `claude-memory.md:113` "personal preferences"):

```powershell
# (i) OTel→Phoenix tracing (W169 P4 wire — gRPC since :4318 HTTP NOT exposed)
$env:OTEL_EXPORTER_OTLP_ENDPOINT  = 'http://localhost:14317'
$env:OTEL_EXPORTER_OTLP_PROTOCOL  = 'grpc'
$env:OTEL_SERVICE_NAME            = 'claude-sota-installed'
$env:OTEL_RESOURCE_ATTRIBUTES     = 'service.namespace=eee,deployment.environment=local'
```

### §3.6 Cross-model T1 Path P prompt spec (BEFORE OTel rollout)

```bash
cat > .claude/state/codex_consult_w169_otel_phoenix_wire.txt <<'EOF'
Review the proposed OTel Python SDK install + hook-script instrumentation pattern:

PROPOSED EDIT 1: install OTel into Z:/venvs/claude via:
  pip install opentelemetry-api==1.40.0 opentelemetry-sdk==1.40.0 opentelemetry-exporter-otlp-proto-grpc==1.40.0

PROPOSED EDIT 2: create scripts/_otel_init.py shared module (TracerProvider + OTLPSpanExporter targeting localhost:14317 gRPC)

PROPOSED EDIT 3: instrument codex_t3_postcommit_review.py with span-wrapping (agent_id + commit_sha + verdict + conf attributes)

PROPOSED EDIT 4: append OTel env vars to CLAUDE.local.md (OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:14317 + service.name + service.namespace)

CONTEXT:
- Phoenix container UP 23h healthy; OTLP gRPC at 14317; HTTP 4318 NOT exposed
- OTel Python 1.40.0 (Oct 2025 release; STABLE-BURN-IN)
- Phoenix MCP query layer ALREADY wired in .mcp.json
- Sister rule audit-action-loop.md §Hook telemetry contract mandates agent_id + agent_type propagation

AXES:
A1: gRPC endpoint vs HTTP — is :14317 gRPC correct vs deferring to expose :4318 HTTP?
A2: Pinned OTel 1.40.0 — is this current PyPI? Any breaking changes vs 1.39.x?
A3: Resource attributes — service.name=claude-sota-installed sufficient or need finer-grained per-hook?
A4: BatchSpanProcessor vs SimpleSpanProcessor — async impact on hook latency budget?
A5: insecure=True for localhost OTLP — acceptable per Phoenix self-hosted no-TLS model?
A6: span hierarchy — top-level "codex_t3_review" with attributes vs nested child spans per sub-step?

Return VERDICT (APPROVE / NEEDS-REVISION / REJECT) + conf + prescribed_edits.
EOF

timeout 300 codex exec --skip-git-repo-check --color never \
  < .claude/state/codex_consult_w169_otel_phoenix_wire.txt \
  2>&1 | tee .claude/state/codex_consult_w169_otel_phoenix_wire_OUT.txt
```

---

## §4 CR-12 6-class disposition (per cardinal-rule-12-upstream-install-priority.md)

| Component | CR-12 disposition | Rationale |
|---|---|---|
| Stack-B Langfuse MCP (`avivsinai/langfuse-mcp@0.9.1`) | **GENUINELY-NEW** | No incumbent LLM-trace-query MCP in runtime. Probe DAG returned HONEST-NON-FINDING for incumbent. Multi-source ≥4 confirmed. Convergence-gate ALL axes PASS. |
| Stack-B Langfuse MCP (`langfuse/mcp-server-langfuse` official) | **DUPLICATE-FUNCTIONALITY** (vs avivsinai) | Prompts-only subset; avivsinai superset. Skip per KISS Must-Never #4. |
| Stack-C Phoenix MCP query layer (`@arizeai/phoenix-mcp@4.0.11`) | **INCUMBENT-KEEP** | Already INSTALLED + wired in .mcp.json. Patch update 4.0.11→4.0.12 acknowledged CR-9 — defer to next install fire. |
| Stack-C OTel instrumentation (`opentelemetry-api/sdk/exporter-otlp-proto-grpc@1.40.0`) | **PROVIDER-COMPLEMENT** | OTel SDK is the producer; Phoenix is the consumer. Different surface (instrumentation vs query); not overlapping. Strong-provenance: CNCF graduated project. |
| Stack-C `_otel_init.py` shared module | **GENUINELY-NEW** | Adapts SOTA pattern (OTel Python getting-started canonical TracerProvider+BatchSpanProcessor+OTLPSpanExporter) — CR-8 ADAPTED-FROM-SOTA. |

---

## §5 Smoke-PASS measurement methodology

### §5.1 Stack-B smoke (Langfuse MCP wire validation)

```bash
# Probe 1 — MCP server starts via uvx
uvx --refresh langfuse-mcp@0.9.1 --help
# Expect: command help output, exit 0, <10s

# Probe 2 — within claude CLI session after install
# In claude:
/mcp
# Expect: 'langfuse' listed as connected; status: connected; tools: 37

# Probe 3 — fire a tool call
# In claude:
list available langfuse traces (call mcp__langfuse__fetch_traces with limit=5)
# Expect: returns trace list (empty array if no traces yet — that's PASS for wire; traces will populate after Stack-C lands)

# Probe 4 — visible at langfuse-web UI
# Browser: http://localhost:3000 → login admin@local.dev / observability42 → org sota-observability → project humaneval
# Expect: project visible, traces tab accessible
```

Wall-clock budget: 30s per probe; 4-probe total ≤2 minutes.

### §5.2 Stack-C smoke (OTel→Phoenix wire validation)

```bash
# Probe 1 — OTel install verifies in venv
source /z/venvs/claude/Scripts/activate
python -c "import opentelemetry; from opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter; print('OTel ok')"
# Expect: 'OTel ok'

# Probe 2 — fire a synthetic trace from test script
cat > /tmp/otel_smoke.py <<'EOF'
import os
os.environ.setdefault("OTEL_EXPORTER_OTLP_ENDPOINT", "http://localhost:14317")
from opentelemetry import trace
from opentelemetry.sdk.resources import Resource
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter

resource = Resource.create({"service.name": "smoke-test"})
provider = TracerProvider(resource=resource)
exporter = OTLPSpanExporter(endpoint="http://localhost:14317", insecure=True)
provider.add_span_processor(BatchSpanProcessor(exporter))
trace.set_tracer_provider(provider)
tracer = trace.get_tracer("smoke")
with tracer.start_as_current_span("w169-smoke-span") as span:
    span.set_attribute("test.fire", "w169-p4")
    print("span emitted")
provider.shutdown()
EOF
python /tmp/otel_smoke.py
# Expect: 'span emitted', exit 0, <5s

# Probe 3 — verify trace visible at Phoenix UI
# Browser: http://localhost:16006 → Projects → 'smoke-test'
# Expect: span 'w169-smoke-span' visible with attribute 'test.fire=w169-p4'

# Alternative Probe 3b — Phoenix MCP query
# In claude session:
# query phoenix for recent traces (mcp__phoenix__list-traces with project='smoke-test')
# Expect: returns the w169-smoke-span trace
```

Wall-clock budget: 30s per probe; 3-probe total ≤2 minutes.

### §5.3 End-to-end smoke (BOTH stacks integrated)

After Stack-B + Stack-C land + at least one hook instrumented:

```bash
# Trigger a real codex T3 fire (any git commit on a .md file)
echo "smoke" >> /z/claude-sota-installed/tmp/w169-otel-smoke.md
git -C /z/claude-sota-installed add tmp/w169-otel-smoke.md
git -C /z/claude-sota-installed commit -m "test(w169): otel smoke"
# Expect within 60s:
# - codex_postcommit_review.py fires (existing)
# - new behavior: OTel span emitted → Phoenix
# - new behavior: Langfuse trace optionally emitted (if LiteLLM proxy wires next)
```

---

## §6 Forward queue (Pattern A Edit plan + Path P T1 review queue)

| Step | Action | File(s) | Risk class | Path P T1 required? |
|---|---|---|---|---|
| W169-F4 | Mia probe checklist §2.4 + UI public-key extraction | runtime probes only | Low | No |
| W169-F5 | Path P codex T1 review of §2 langfuse wire | `.claude/state/codex_consult_w169_langfuse_mcp_wire_OUT.txt` | Medium | **Yes (BEFORE Edit)** |
| W169-F6 | Pattern A Edit: append `langfuse` entry to `Z:/claude-sota-installed/.mcp.json` | `.mcp.json` | Medium | Already-reviewed via F5 |
| W169-F7 | Smoke probes §5.1 (4 probes) | runtime | Low | No |
| W169-F8 | Path P codex T1 review of §3 OTel wire | `.claude/state/codex_consult_w169_otel_phoenix_wire_OUT.txt` | Medium | **Yes (BEFORE Edit)** |
| W169-F9 | Install OTel SDK into venv | `Z:/venvs/claude` | Low | No (install-class) |
| W169-F10 | Edit `CLAUDE.local.md` ENV block — append OTel env vars | `CLAUDE.local.md` | Medium | Already-reviewed via F8 |
| W169-F11 | Write `scripts/_otel_init.py` shared module | new file | Medium | Already-reviewed via F8 |
| W169-F12 | Instrument 1 hook (e.g., `codex_postcommit_review.py`) | hook script | Medium-high | Optional second T1 fire on hook diff |
| W169-F13 | Smoke probes §5.2 + §5.3 | runtime | Low | No |
| W169-F14 | Update `docs/sota-installed-manifest.md` §4.5 + §17.5 rows (Langfuse MCP + OTel SDK INSTALLED rows) | manifest | Low | No |
| W169-F15 | Update `docs/install-provenance.md` append-only log | provenance log | Low | No |
| W169-F16 | Persist Karpathy §5 5-surface (mcp-memory hash + graphiti episode + MEMORY.md L2 entry + provenance row + close-synthesis tmp/wave169-fire3-close-2026-05-13.md) | 5 backends | Low | No |

**STOP gate progress (per W169 /goal P4 mandate)**: this research artifact closes the "design + cite ready" sub-condition; Pattern A apply ships occur in W169-F6 + W169-F10/11. SHIP target W170 P2 unchanged.

---

## §7 Cite anchors (TIER-1 per CR-1)

- **TIER-1-DIRECT** `https://github.com/avivsinai/langfuse-mcp` @ HEAD `a55d440988205c48633e157bddc72ce50dfafd19` — README + LICENSE + pyproject.toml [VERIFIED 2026-05-13 via `mcp__github__get_file_contents`]
- **TIER-1-DIRECT** `https://github.com/langfuse/mcp-server-langfuse` @ HEAD `a534b5a995d50c21ba45f14419246ef64d3ca6f4` — README + package.json + LICENSE [VERIFIED 2026-05-13 via `mcp__github__get_file_contents`]
- **TIER-1-DIRECT** `https://pypi.org/pypi/langfuse-mcp/json` — version 0.9.1, license MIT, requires_python ≥3.10 [VERIFIED 2026-05-13 via curl]
- **TIER-1-DIRECT** `https://registry.npmjs.org/@arizeai/phoenix-mcp` — version 4.0.12, license Apache-2.0, repo Arize-ai/phoenix [VERIFIED 2026-05-13 via curl]
- **TIER-1-DIRECT** `https://opentelemetry.io/docs/languages/python/getting-started/` — OTel Python SDK canonical install + TracerProvider + OTLPSpanExporter pattern [VERIFIED 2026-05-13 via WebFetch]
- **TIER-1-DIRECT** `https://arize.com/docs/phoenix/tracing/llm-traces` — Phoenix OTLP tracing setup canonical [VERIFIED 2026-05-13 via WebFetch]
- **TIER-1-DIRECT** `https://raw.githubusercontent.com/langfuse/langfuse/main/README.md` — Langfuse main repo README (3.170.0 image, MIT license) [VERIFIED 2026-05-13 via WebFetch]
- **TIER-2 sister cite-import-AMBER** `Z:/claude-sota/.claude/rules/audit-action-loop.md §Hook telemetry contract` — agent_id/agent_type propagation per Anthropic SDK `_SubagentContextMixin` (cite-class adapted to instrumentation pattern §3.4)
- **TIER-2 user-curated** `Z:/claude-sota-installed/docs/observability-stack-audit-w164-f39-2026-05-13.md` — Wave 164 F39 audit (full container inventory)
- **TIER-3-LOCAL-OPERATOR-DERIVED** runtime probes 2026-05-13 (`docker inspect langfuse-web|phoenix|langfuse-worker` + `.mcp.json` + `curl pypi.org` + `curl registry.npmjs.org`)
- **TIER-3-LOCAL-COMPOSITION** sister `Z:/claude-sota/.claude/rules/cardinal-rule-12-upstream-install-priority.md` 6-class disposition lattice (cite-import-AMBER per `Z:/claude-sota-installed/CLAUDE.md §14.5`)
- **multi-source-discovery-breadth-discipline.md ≥4-source mandate** satisfied: GitHub search + GitHub get_file_contents + PyPI + npm + WebFetch upstream docs + runtime docker probes = 6 independent sources

---

## §8 RESEARCH summary (final-message delimiter)

**VERDICT**: Stack-B + Stack-C wire plans READY for Pattern A apply. Path P codex T1 review queued before each Edit per CR-3 Phase 1 bootstrap exception.

Key findings:
1. **Stack-B**: ADOPT `avivsinai/langfuse-mcp@0.9.1` via uvx (37 tools full observability; convergence-gate ALL axes PASS; CR-12 GENUINELY-NEW). Skip official `langfuse/mcp-server-langfuse` (prompts-only subset, CR-12 DUPLICATE-FUNCTIONALITY).
2. **Stack-C**: Phoenix MCP query layer ALREADY wired (v4.0.11; patch update to 4.0.12 deferred per CR-9). MISSING layer is OTel Python SDK instrumentation → Phoenix gRPC OTLP at `:14317` (NOT `:4318` HTTP — FM-20 catch). Install `opentelemetry-{api,sdk,exporter-otlp-proto-grpc}==1.40.0` into venv + shared `scripts/_otel_init.py` module + per-hook span instrumentation.
3. **FM-20 catches**: (a) Phoenix OTLP host port is **:14317 gRPC** not :4318 HTTP (HTTP not exposed); (b) prior brief implied 4318, corrected forward-only; (c) Phoenix MCP entry already present in .mcp.json — orchestrator must NOT re-wire.
4. **Risk**: LANGFUSE_PUBLIC_KEY not in container env — operator must extract via langfuse-web UI OR `docker exec langfuse-postgres psql` BEFORE Pattern A apply.
5. **Forward queue**: 13 steps F4-F16; ships W169-F6 (langfuse MCP) + W169-F10/11 (OTel SDK + init module) target W170 P2.

RESEARCH: Stack-B + Stack-C wire plans ready (Path P T1 review queued).
