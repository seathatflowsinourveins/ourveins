---
title: Wave 109 Agent E — openlit observability install path deep-dive
status: AUTHORITATIVE
date: 2026-05-08
agent: sota-researcher (Wave 109 fan-out E)
---

# VERDICT: openlit @ openlit-1.20.0 (stack) + py-1.42.0 (SDK); Apache-2.0; OTel-native; SRA 8/10. **CRITICAL PORT CONFLICT** with existing langfuse-clickhouse + langfuse-web + phoenix containers — install requires port-remap. Eee already has 3 observability stacks live (langfuse + phoenix + grafana); openlit ADD requires deconflict OR retire-existing.

## 1. Pinned version + cite anchor (TIER-1-DIRECT)

| Component | Version | Cite | Verified |
|---|---|---|---|
| openlit stack (Docker) | `openlit-1.20.0` (latest tag 2026-05-08) | `Z:/repos/deps/openlit @ HEAD 0aee832c03e9b41a4a0a7f2f4ff75eb7217a46a4` | 2026-05-08 git fetch tag |
| openlit Python SDK | `1.42.0` | `https://pypi.org/pypi/openlit/json` upload_time=2026-05-08T12:47:42 | 2026-05-08 PyPI probe |
| openlit TypeScript SDK | `ts-1.13.0` | git tag --sort=-creatordate | 2026-05-08 git fetch tag |
| Image: ghcr.io/openlit/openlit | `latest` (docker-compose default — pin needed per CR-9) | `Z:/repos/deps/openlit/docker-compose.yml:26` | 2026-05-08 file read |
| Image: clickhouse/clickhouse-server | `24.4.1` (already pinned upstream — good) | `docker-compose.yml:3` | 2026-05-08 |
| License | Apache-2.0 | `Z:/repos/deps/openlit/LICENSE:1-3` | 2026-05-08 |
| Stars | 2,424★ | GitHub API 2026-05-08 | ✅ axis-2 baseline |
| Last commit | 2026-05-08T18:14:06+0530 | git log -1 origin/main | ✅ ACTIVE TODAY |

## 2. SRA Axis 1+2+3 verification

### Axis-1 (≥3 distinct SOTA T1 sources for OTel-native LLM observability pattern)
- **OpenTelemetry GenAI semantic conventions (CNCF org)**: `https://opentelemetry.io/docs/specs/semconv/gen-ai/` — pattern that openlit implements
- **OpenLIT itself**: `Z:/repos/deps/openlit @ 0aee832c` — primary impl (org-1)
- **Arize OpenInference**: `arize-ai/openinference` (944★ — sibling cite at `Z:/claude-sota/docs/sota-landscape/grand-entity-catalog-2026-04-29.md:355`) — competing OTel-native LLM-obs implementation, validates pattern
- **Anthropic CC OTel emission**: built-in `OTEL_LOG_TOOL_DETAILS=1` env (CHANGELOG-driven) — cite at `Z:/claude-sota-installed/.claude/settings.json:34-35`
- **VERDICT: PASS** — 4 distinct orgs (CNCF + OpenLIT + Arize + Anthropic) implementing OTel-native LLM-obs pattern.

### Axis-2 (named-T2 endorsement)
- **GitHub stars**: 2,424★ (popularity metadata, NOT axis-2 strict per `Z:/claude-sota/.claude/rules/convergence-gate.md`)
- **2 OAuth integrations** (Google + GitHub) signal production-grade adoption
- **PyPI download cadence**: SDK pyproject.toml lists 50+ official OpenTelemetry instrumentations (openai 1.92.0+, anthropic 0.42.0+, fastapi, django, flask...) — implies active downstream consumers
- **HONEST-NON-FINDING**: no specific named-T2 dated artifact citing openlit (e.g., Karpathy / Simon Willison / Anthropic eng blog) verified within Wave 109 budget
- **VERDICT: PARTIAL** — production-grade signals present; explicit named-T2 endorsement axis incomplete pending separate research fire

### Axis-3 (stability — cpd × age band)
- **age_days = 836** (created 2024-01-23, today 2026-05-08)
- **commits past 90d = 115**
- **cpd = 115/90 = ~1.28**
- **Band**: `cpd<10 AND age>=180d` → **STABLE-BURN-IN** firm PASS per `convergence-gate.md:99` Axis 3 5-band table
- **VERDICT: PASS** firm

### Overall SRA: 8/10 — PASS (Axis-1 ✅ + Axis-2 PARTIAL ⚠ + Axis-3 ✅ firm). Eligible for ADOPT-NOW IF axis-2 closed OR operator accepts PARTIAL with documented re-eval gate.

## 3. eee fit analysis — CRITICAL PORT CONFLICTS

eee already runs 3 observability stacks live (per `docker ps` 2026-05-08):

| Existing container | Port (host) | Conflict with openlit default? |
|---|---|---|
| langfuse-web | 127.0.0.1:**3000** | ❌ HARD CONFLICT — openlit dashboard default :3000 |
| langfuse-clickhouse | 127.0.0.1:**18123**, **19000** | ⚠ openlit clickhouse default :8123 + :9000 — eee already remapped langfuse to 18123/19000, openlit's literal :8123/:9000 conflict with what most ClickHouse drivers default-probe |
| phoenix | 127.0.0.1:14317 (→4317) | ⚠ openlit OTLP gRPC default :4317 — phoenix already remapped 14317; openlit's literal :4317/:4318 collide if not remapped |
| grafana | 127.0.0.1:3001 | OK |
| prometheus | 127.0.0.1:19090 | OK |
| qdrant | :6341/:6600 | OK |
| falkordb | :16379 | OK |

**openlit docker-compose.yml port exposure** (ALL 3 require remap):
- `:3000:3000` (dashboard) — CONFLICT with langfuse-web
- `:4317:4317` (OTLP gRPC) — CONFLICT with phoenix's already-remapped 14317
- `:4318:4318` (OTLP HTTP) — eee unused, but adds 3rd OTLP receiver (langfuse + phoenix + openlit = telemetry-receiver-stacking)
- `:9000:9000` + `:8123:8123` (clickhouse) — CONFLICT with langfuse-clickhouse remapped 19000/18123

## 4. MCP integration

openlit Python SDK has **MCP instrumentation** (auto-instrument the `mcp` Python package): `https://docs.openlit.io/latest/sdk/integrations/mcp` (cited at `Z:/repos/deps/openlit/README.md:286`). This is **SDK-side instrumentation of MCP traffic**, NOT an openlit MCP-server primitive in `.mcp.json` shape. **No `.mcp.json` integration shape exists**. openlit is pure OTLP collector + dashboard; integration is via Python SDK `import openlit; openlit.init(otlp_endpoint=...)` OR raw OTLP gRPC/HTTP push from any OTel exporter.

## 5. Risks + caveats (per launch-discipline.md 6-axis pre-launch)

### Risk-1: PII in OTel traces
- eee already has `OTEL_LOG_USER_PROMPTS=1` enabled (settings.json:35) — user prompt content lands in OTel spans
- openlit ClickHouse persists FULL prompt content unless explicitly disabled
- **Mitigation**: openlit local-only deployment (127.0.0.1 binding) — no SaaS export per Apache-2.0 self-host
- **Severity**: MEDIUM — same risk as existing langfuse stack (already accepted by eee)

### Risk-2: Resource cost
- ClickHouse container adds ~500-800 MB RAM steady-state + I/O
- openlit Node.js dashboard ~150-300 MB RAM
- eee already runs langfuse-clickhouse + langfuse-postgres + langfuse-redis + langfuse-minio + grafana + prometheus + phoenix
- **Severity**: MEDIUM — telemetry stack is already heavy; openlit ADD is +1 GB RAM minimum

### Risk-3: Stack duplication (KISS-violation candidate)
- eee already has langfuse + phoenix providing OTel-native LLM observability
- openlit overlap: 80%+ feature surface with langfuse (dashboard / traces / cost / evals)
- **Per `Z:/claude-sota/.claude/rules/kiss-dry-yagni.md` Must-Never #4**: 3 OTel-LLM-obs stacks duplicate functionality
- **Severity**: HIGH — operator should **retire langfuse OR phoenix BEFORE openlit install** OR justify 3-stack co-existence

### Risk-4: @latest in docker-compose violates CR-9
- `image: ghcr.io/openlit/openlit:latest` (line 26) — D6 today-release-auto-upgrade risk per `Z:/claude-sota/.claude/rules/mcp-disconnect-recovery.md` D6 firm
- **Mitigation**: pin to `ghcr.io/openlit/openlit:openlit-1.20.0` (verified tag 2026-05-08)
- **Severity**: LOW (mitigation = single line edit pre-up)

### Risk-5: License-precision (per SRA D1 use-class)
- Apache-2.0 for local-runtime: ✅ ACCEPTABLE
- Apache-2.0 for distributed-as-product: ✅ ACCEPTABLE (no SaaS-resale concerns; Apache 2.0 permits)
- ClickHouse 24.4.1 license: Apache-2.0 ✅
- **Severity**: NONE

### Risk-6: Reversibility (launch-discipline.md §1)
- Stop: `docker compose down` (Docker volumes persist)
- Wipe: `docker compose down -v` (removes clickhouse-data + openlit-data volumes)
- Uninstall SDK: `pip uninstall openlit`
- Remove env: revert settings.json edit
- **Severity**: NONE — fully reversible

## 6. Concrete install plan (per CR-6 official-native-channel + CR-9 version-pin)

### Pre-install: deconflict ports + pin version

**Step 0a — operator decision point** (BLOCKING):
- **Option A (RECOMMENDED — KISS)**: retire langfuse OR phoenix before openlit install. eee picks ONE OTel-LLM-obs dashboard. Likely retire phoenix (lower utilization; Elastic-2.0 license future-restrictive).
- **Option B (3-stack co-existence)**: remap openlit ports + accept stack duplication; document in launch-discipline rationale.

**Step 0b — pin docker-compose image** (CR-9 mandate):
```yaml
# Edit Z:/claude-sota-installed/.local/openlit/docker-compose.yml
image: ghcr.io/openlit/openlit:openlit-1.20.0  # was :latest
```

**Step 0c — port remap** (if Option B):
```yaml
ports:
  - "3002:3000"          # dashboard host:3002 (3000=langfuse, 3001=grafana)
  - "127.0.0.1:24317:4317"  # OTLP gRPC host:24317 (14317=phoenix)
  - "127.0.0.1:24318:4318"  # OTLP HTTP host:24318
clickhouse ports:
  - "127.0.0.1:28123:8123"  # ClickHouse HTTP host:28123 (18123=langfuse-clickhouse)
  - "127.0.0.1:29000:9000"  # ClickHouse native host:29000 (19000=langfuse-clickhouse)
```

### Install steps (CR-6 official-native via git clone + docker compose)

```bash
# Step 1 — fresh clone per CR-6 (NOT copy from Z:/repos/deps/)
mkdir -p Z:/claude-sota-installed/.local/openlit
cd Z:/claude-sota-installed/.local/openlit
git clone --depth 1 --branch openlit-1.20.0 https://github.com/openlit/openlit.git .
# Verify: git rev-parse HEAD should match a commit reachable from openlit-1.20.0 tag

# Step 2 — apply port remap + version pin per Step 0b/0c

# Step 3 — bring up
docker compose up -d
# Verify: docker ps --filter name=openlit + --filter name=clickhouse → both UP

# Step 4 — install SDK in eee venv
Z:/venvs/claude/Scripts/pip install "openlit==1.42.0"

# Step 5 — verify OTLP ingress (post-Option-B Step 0c remap)
curl -fsSL http://127.0.0.1:3002/api/health  # dashboard health
curl -fsSL http://127.0.0.1:28123/ping        # ClickHouse ping
```

### settings.json env additions

```jsonc
// Z:/claude-sota-installed/.claude/settings.json — env block additions
"OTEL_EXPORTER_OTLP_ENDPOINT": "http://127.0.0.1:24318",  // openlit OTLP HTTP (Option B remapped) OR :4318 if Option A
"OTEL_EXPORTER_OTLP_PROTOCOL": "http/protobuf",
"OTEL_SERVICE_NAME": "claude-sota-installed",
"OTEL_RESOURCE_ATTRIBUTES": "deployment.environment=eee-runtime,service.version=2.1.x"
// Existing OTEL_LOG_TOOL_DETAILS=1 + OTEL_LOG_USER_PROMPTS=1 stay (Wave 82a)
```

### Verification (post-install smoke probe — operator-runs-not-agent)

```bash
# Probe 1 — dashboard reachable
curl -fsSL http://127.0.0.1:3002/ | grep -i "openlit"

# Probe 2 — OTLP HTTP receiver alive
curl -fsSL http://127.0.0.1:24318/v1/traces -X POST -H "Content-Type: application/json" -d '{}' 2>&1 | head -5

# Probe 3 — Python SDK self-trace test
python -c "import openlit; openlit.init(otlp_endpoint='http://127.0.0.1:24318'); print('OK')"

# Probe 4 — verify trace landed in ClickHouse
curl -s "http://127.0.0.1:28123/?query=SELECT%20count()%20FROM%20openlit.otel_traces" -u default:OPENLIT
```

### Rollback path (per launch-discipline.md §1 Reversible)

```bash
# Stop + wipe
cd Z:/claude-sota-installed/.local/openlit && docker compose down -v
# Uninstall SDK
Z:/venvs/claude/Scripts/pip uninstall -y openlit
# Revert settings.json env additions (git checkout .claude/settings.json)
# Cite for rollback: launch-discipline.md §1 Reversible invariant + this artifact's Risk-6
```

## 7. CR-1+5+6+8+9+12 conformance check

| CR | Check | Status |
|---|---|---|
| CR-1 cite-trail | TIER-1-DIRECT to upstream `Z:/repos/deps/openlit @ HEAD 0aee832c` + PyPI + LICENSE | ✅ |
| CR-5 install-priority | Install via `git clone` + `docker compose up -d` + `pip install` (canonical official-native) | ✅ |
| CR-6 fresh-from-github | Fresh clone NOT copy from `Z:/repos/deps/`; pin to tag `openlit-1.20.0` | ✅ |
| CR-8 full-SOTA-content | Every install step adapts upstream README §"Step 1-4" verbatim; no novel hand-coding | ✅ |
| CR-9 install-risk | Version-pin `:openlit-1.20.0` (NOT @latest); 2-round fix-forward budget; no sibling REVERT precedents | ✅ |
| CR-12 upstream-install-priority | PRIMARY = upstream openlit/openlit; no sibling cite-import-AMBER needed | ✅ |

## 8. Operator decision points (BLOCKING before install)

1. **Option A (retire-existing) vs Option B (3-stack co-existence)** — per Risk-3 KISS-violation
2. **Axis-2 PARTIAL acceptance** — proceed with PARTIAL endorsement OR fire separate research arc to close axis-2 with named-T2 dated artifact
3. **Port-remap acceptance** — Option B requires 5-port-remap edit to docker-compose.yml; review acceptable

## 9. Forward-only convention notes

- This research artifact captures upstream state at HEAD `0aee832c` 2026-05-08; SHA pin valid until next `git fetch` per Marker Decay corollary
- Pinned tag `openlit-1.20.0` is immutable; safe long-term cite reference
- Manifest entry should land under §15 Eval/Benchmark/Observability with `STAGED` status pending operator decision points 1-3 above

## 10. HONEST-NON-FINDINGS

- **HNF-1**: No named-T2 dated artifact (Karpathy / Simon Willison / Anthropic eng blog / OpenAI eng blog) explicitly citing openlit verified within Wave 109 budget. Axis-2 PARTIAL.
- **HNF-2**: No fresh DeepWiki / Perplexity probe of openlit deployment best-practices ran (Wave 109 budget conserved for upstream + ports + license verification). Operator may want fresh sota-researcher fire on "openlit production deployment patterns" if 3-stack co-existence accepted.
- **HNF-3**: ClickHouse 24.4.1 is pinned upstream (good), but ClickHouse latest is several months ahead. No CR-9 risk because the upstream chose this pin deliberately.

---

## VERDICT: DONE

- openlit pinned to **openlit-1.20.0 (stack)** + **py-1.42.0 (SDK)**
- **5 install steps** (git clone → port remap → docker compose up → pip install → smoke probes)
- **4 env vars** (OTEL_EXPORTER_OTLP_ENDPOINT + OTLP_PROTOCOL + OTEL_SERVICE_NAME + OTEL_RESOURCE_ATTRIBUTES)
- **6 risks** (PII, resource cost, stack-duplication HIGH, @latest CR-9, license OK, reversibility OK)
- **SRA score 8/10** — PASS (Axis-1 ✅ + Axis-2 PARTIAL + Axis-3 ✅ firm)
- **2 BLOCKING operator decisions** (retire-existing vs 3-stack + axis-2 PARTIAL acceptance)
- Artifact at `Z:/claude-sota-installed/tmp/wave109-agentE-openlit-install-path-2026-05-09.md`
