# W225 W222+W223-scoring-delta install report

**Date**: 2026-05-15
**Operator**: W225 install-delta agent
**Pre-flight**: HEAD = `d1cf48e` (post-W220); Python 3.14.3 + pip 26.0.1 at `C:\Python314\Scripts\pip.exe`
**Wall-clock cap**: 15 min
**Cross-model gate**: SATISFIED via 45+ prior W211/W214/W217/W220 verdicts (NO BRIDGE-MODE this fire per spec)

## §1 Probe-first results (CR-9 mandate)

| Package | pip show probe | Pre-W225 status |
|---|---|---|
| qdrant-client | 1.17.0 present | ALREADY-PRESENT |
| chonkie | 1.5.4 present | ALREADY-PRESENT |
| hnswlib | not found | MISSING — install needed |
| lancedb | 0.26.1 present | ALREADY-PRESENT |
| docling | 2.70.0 present | ALREADY-PRESENT |
| markitdown | 0.0.2 present | ALREADY-PRESENT |
| letta (canonical server) | not found | MISSING — install attempted |
| letta-client (Python SDK) | 1.7.7 present | ALREADY-PRESENT |

**Probe insight**: 6/8 W225 candidates already installed pre-W225 (likely transitive deps from W214/W217/W220 RAG-pipeline installs). Only `hnswlib` + `letta` (canonical server) required net-new install action.

## §2 Install actions executed

### Phase 1 — RAG pipeline depth (W222-T composite leaders)

| Package | Action | Result | Wheel |
|---|---|---|---|
| qdrant-client 1.17.0 | SKIP — present | N/A | cp314 (pre-W225) |
| chonkie 1.5.4 | SKIP — present | N/A | cp314 (pre-W225) |
| hnswlib 0.8.0 | `pip install hnswlib` | **PASS** | `hnswlib-0.8.0-cp314-cp314-win_amd64.whl` (cached) |
| lancedb 0.26.1 | SKIP — present | N/A | cp314 (pre-W225) |

### Phase 2 — Document AI for RAG ingestion (W222-S salvage)

| Package | Action | Result |
|---|---|---|
| docling 2.70.0 | SKIP — present | N/A |
| markitdown 0.0.2 | SKIP — present | N/A |

### Phase 3 — Memory framework new (W223-X codex Call 2 ADOPT-NOW)

| Package | Action | Result |
|---|---|---|
| letta-client 1.7.7 (Python SDK) | SKIP — present | N/A |
| letta (canonical server, 0.6.3+) | Round-1 `pip install letta` | **FAILED** — pydantic-core 2.27.2 source build hit PyO3 0.22.2 vs Py 3.14 ABI gap (cargo exit 101) |
| letta (canonical server, 0.6.3+) | Round-2 `pip install --only-binary=:all: letta` | **DEGRADED** — pip resolver fell back to `letta-0.1.0` placeholder stub (1.0 KB wheel from 2024-Sep); canonical server installed wheels only exist as source-build artifacts for newer versions |

**letta classification**: PARTIAL — the operator-usable surface (`letta-client 1.7.7` Python SDK for talking to a Letta server) was ALREADY-PRESENT pre-W225 and smoke PASS. The canonical server package itself (`letta-0.6.3+`) is **BLOCKED per CR-9** on Py 3.14 due to pydantic-core PyO3 ABI gap. The `letta-0.1.0` stub now installed is a no-op placeholder. Operator decision required: deploy Letta server as Docker container per upstream README rather than pip (canonical install path for the server runtime per upstream docs).

### Phase 4 — Optional npm/cargo CLI

DEFERRED per spec (operator-decision required):
- `@musistudio/claude-code-router` (npm global, MIT 34k★)
- `zilliztech/claude-context` MCP server (STUDY-PILOT per W223-V)

## §3 Smoke probes

```python
'/c/Python314/python.exe' -c "for mod in ['qdrant_client', 'chonkie', 'hnswlib', 'lancedb', 'docling', 'markitdown', 'letta_client']: __import__(mod)"
```

| Module | Smoke result |
|---|---|
| qdrant_client | PASS |
| chonkie | PASS |
| hnswlib | PASS (newly installed) |
| lancedb | PASS |
| docling | PASS |
| markitdown | PASS |
| letta_client | PASS |
| letta (0.1.0 stub) | imports but empty (no `__version__`, dunder-only) — non-functional |

**Smoke summary**: **7/8 PASS**, 1 DEGRADED (letta stub installed but operator-usable surface via letta_client already PASS).

**Pre-existing noise** (non-blocking, NOT W225-caused): pydantic plugin `logfire-plugin` import warning re `ReadableLogRecord` from `opentelemetry.sdk._logs` — pre-existing pydantic plugin metadata vs OTEL version skew, observed in all W214+ smoke runs.

## §4 CR-9 install-risk discipline notes

| Risk axis | Observation |
|---|---|
| Version-pin mandate | All `pip install <pkg>` were unpinned; pip resolver picked highest-compatible. `letta` resolver fallback to 0.1.0 stub IS the documented "@latest-acknowledged-D6-risk" failure mode |
| 2-round fix-forward | hnswlib needed only Round-1 (cp314 wheel cached). letta hit Round-2 binary-only fallback → degraded but BLOCKED for canonical server (PyO3 ABI gap is structural, not version-fix-forward addressable) |
| Sibling-bleed defense | No `Z:/claude-sota/` paths touched; install env stayed in `Z:/claude-sota-pure/` working dir |
| Pre-cite-import REVERT check | No cite-imports performed (W225 is install-class only); no REVERT precedents to check |

## §5 Py 3.14 ecosystem-gap class (BLOCKED)

**Letta canonical server (0.6.3+)** joins the documented Py 3.14 source-build-blocked cohort per W214/W217 archaeology. Root cause:
- letta 0.6.3+ depends on `pydantic-core==2.27.2` (transitive via letta-core)
- `pydantic-core 2.27.2` Rust extension uses PyO3 0.22.2
- PyO3 0.22.2 does NOT support Python 3.14 stable ABI (cp314)
- maturin tries source build → cargo exits 101 with `pyo3 ABI compatibility check failed`

**Operator-decision queue (4 paths)**:
1. **Docker deploy** — Letta upstream's canonical server runtime is Docker per https://github.com/letta-ai/letta README; operator can `docker pull letta/letta:latest` (DEFER per W211/W214/W217/W220 "NEVER docker run long-lived services" mandate — operator-decision required)
2. **Py 3.13 venv segregation** — create `Z:/venvs/claude-py313` and install canonical letta server there; this runtime continues using letta-client 1.7.7 from Py 3.14 venv to talk to it
3. **Wait for upstream** — pydantic-core needs PyO3 ≥ 0.23 for cp314 stable ABI; upstream pydantic-core 2.30+ may carry this (not yet verified per CR-10 research-first; deferred)
4. **Skip canonical server entirely** — letta-client 1.7.7 (Python SDK) already PASS smoke; if Letta server is not load-bearing for this runtime (no agent currently invokes it), the gap is non-blocking. Per W223-X classification "ADOPT-NOW" was for the framework concept, NOT mandatory server-runtime install.

## §6 Operator-action queue delta (W225 closures)

Closed by W225 install action:
- **hnswlib** (W222-T composite-90) — was on operator queue as "vector index in-memory candidate"; now INSTALLED
- **qdrant-client / chonkie / lancedb / docling / markitdown** — discovered ALREADY-PRESENT pre-W225 (no install needed; these were transitive deps from prior RAG installs); queue items implicitly closed

Remaining on operator-action queue post-W225 (W222+W223 items NOT closed by W225):
- **letta canonical server (0.6.3+)** — BLOCKED on Py 3.14 ecosystem-gap; 4 paths above
- **claude-agent-sdk-typescript** — Commercial-ToS verify (operator-only per spec SKIP list)
- **musistudio/claude-code-router** (npm global) — operator workflow-decision
- **zilliztech/claude-context** MCP server — STUDY-PILOT per W223-V
- **claude-hud / mgrep / cross-code-organizer** — STUDY-PILOT (operator-decision)
- **mattpocock/skills** — cite-class only, NOT install-class (no W225 action)
- **claude-code-base-action** — GitHub Actions workflow doc-only (no W225 action)

Estimated W225 net queue impact: 5 items closed by install action / 1 item DEGRADED (letta — partial via SDK) / 7 items remain operator-decision

## §7 Summary

- **W225 net install action**: +1 package newly installed (`hnswlib 0.8.0`)
- **Pre-existing discovery**: 6/8 W225 candidates already-present pre-W225 (transitive deps from W214/W217/W220 RAG installs)
- **Blocked**: 1 (letta canonical server — Py 3.14 ecosystem-gap; operator-decision required for Docker / Py 3.13 venv / wait / skip)
- **Smoke probes**: 7/8 PASS, 1 DEGRADED (letta stub non-functional but operator-usable surface via letta-client PASS)
- **Wall-clock**: ~5 min (under 15 min cap)
- **CR-9 compliance**: PASS (probe-first, 2-round fix-forward attempted, blocked items documented)

**HANDOFF**: verdict_one_line: "DONE: W225 W222+W223-scoring-delta — 1 installed (hnswlib) + 6 already-present + 1 blocked (letta server Py3.14 gap; SDK letta-client present); smoke 7/8 PASS"
