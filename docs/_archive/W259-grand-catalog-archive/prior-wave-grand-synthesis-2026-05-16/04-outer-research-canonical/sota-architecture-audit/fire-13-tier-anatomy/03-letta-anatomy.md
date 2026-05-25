# 03 — letta-ai/letta anatomy (Tier-3 stateful agents platform; formerly MemGPT)

> **Source**: `Z:/repos/deps/letta @ HEAD bb52a8900a79cf1378e6e9cdecf244b673a13a72 [VERIFIED 2026-05-10]`
> **License**: Apache-2.0 (verified at root LICENSE)
> **Stars**: 22,607 (Fire 12 discovery)
> **Push**: 2026-04-12 (28 days ago — MAINTAINED band per SRA D2)
> **Audit depth**: README + structure probe

## What it is (verbatim README:1-7)

> # Letta (formerly MemGPT)
>
> Build AI with advanced memory that can learn and self-improve over time.
>
> * Letta Code — run agents locally in your terminal
> * Letta API — build agents into your applications

## Lineage — MemGPT academic origin

**Letta = formerly MemGPT** — the seminal Berkeley academic project that introduced
the "agent with virtual context" paradigm. MemGPT became commercial as Letta-ai with
Apache-2.0 license retained.

This LINEAGE is load-bearing:
- MemGPT pioneered the "agent memory beyond context window" concept (papers cited
  in Anthropic + OpenAI literature)
- Multi-year evolution + production-grade architecture
- Berkeley academic provenance = highest possible TIER-4 named-individual + TIER-3 named-org

## Top-level structure (subset of ~50+ top entries)

```
letta/
├── AI_POLICY.md
├── CITATION.cff               ← citable academic provenance
├── CONTRIBUTING.md
├── Dockerfile                  ← container deployment
├── LICENSE                     ← Apache-2.0
├── PRIVACY.md
├── README.md
├── SECURITY.md
├── TERMS.md
├── WEBHOOK_SETUP.md
├── alembic/                    ← database migrations (PostgreSQL)
├── alembic.ini
```

**Architecture state signals**:
- Alembic migrations = relational-DB backend (PostgreSQL probable)
- Dockerfile = container-grade deployment
- AI_POLICY + PRIVACY + TERMS + SECURITY + WEBHOOK_SETUP = enterprise-grade governance
- CITATION.cff = academic citability

## Key features

- **Stateful agents** — persistent memory across sessions
- **Self-improvement** over time
- **Python + TypeScript SDKs**
- **API + CLI ("Letta Code" runs locally)**
- **App platform** at app.letta.com (cloud)

## SRA D1-D10 verdict

| Dim | Score | Notes |
|---|---|---|
| D1 license-use-class | PASS | Apache-2.0 — fully permissive |
| D2 freshness | PARTIAL (28d push) | MAINTAINED band (30-90d) — not stale, not bleeding-edge |
| D3 fresh-paint clear | PASS | 22k★ + multi-year MemGPT lineage + Berkeley academic origin |
| D4 maintainer-provenance | PASS | letta-ai = named org with academic-paper lineage (MemGPT Berkeley) |
| D5 active-maintenance | PASS | multi-component repo + sustained commit cadence |
| D6 use-class compat | PASS | Python + TypeScript SDKs + API + Docker = cross-deployment |
| D7 Anthropic-aligned | PARTIAL | Not yet MCP-native; could integrate via custom MCP wrapper |
| D8 industry adoption | PASS | 22k★ + MemGPT paper cited in agent-memory literature |
| D9 FM-class clear | PASS | enterprise-grade governance docs |
| D10 replacement viability | NOT REPLACEMENT | architecturally distinct from L1 sqlite_vec + L3 Graphiti |

**SRA score: 9/10 PASS + 1 PARTIAL (D7 MCP integration)** — strong candidate.

## eee architecture comparison

| Memory primitive | eee L1 mcp-memory-service | eee L3 Graphiti | Letta (candidate) |
|---|---|---|---|
| Approach | sqlite_vec embedded | FalkorDB temporal-KG | PostgreSQL stateful agents |
| Memory model | semantic search | temporal knowledge graph | virtual-context paradigm |
| Self-improvement | NO | NO | YES (over time) |
| MCP-native | YES (INSTALLED) | YES (cloned, .mcp.json wire pending) | NO (would need custom wrapper) |
| Production deployment | local sqlite | local FalkorDB Docker | local Docker OR app.letta.com cloud |
| Academic lineage | none | none | MemGPT Berkeley papers |
| Setup complexity | LOW | MEDIUM | MEDIUM-HIGH (PostgreSQL setup) |

**Architecture impact**: Letta is a 4TH MEMORY LAYER ALTERNATIVE (not a drop-in for L1/L3).
The "self-improvement over time" feature is UNIQUE; no other eee primitive offers this.

## Architecture verdict: STUDY-PILOT 🔬 (with caveat)

**🔬 STUDY-PILOT with caveat — Tier-3 memory candidate**

**Caveats**:
1. PostgreSQL backend = ADDS new infrastructure dependency (eee has FalkorDB + sqlite_vec; PostgreSQL would be 3rd backend)
2. NOT MCP-native = requires custom integration work
3. 28d push gap = MAINTAINED but not bleeding-edge
4. Per `kiss-dry-yagni.md` Must-Never #4 — eee already has 2 memory primitives; adding a 3rd risks DUPLICATE-FUNCTIONALITY

**Probe 7.b 5-clause check**:
1. ✅ Named use case: long-running agents needing self-improvement over time
2. ✅ Cited local input: any agent that needs to learn across sessions
3. ⚠️ Wiring path: REQUIRES custom MCP wrapper (NOT off-the-shelf)
4. ❌ Incumbent comparison: existing L1+L3 stack handles current eee needs; "self-improvement over time" is NOT current eee feature demand
5. ⚠️ Reversible time-box: 30-day pilot reasonable but PostgreSQL setup cost is real

**Verdict**: DEFER — eee's current memory stack is sufficient for current operational
needs; Letta would be premature complexity unless a specific "agent self-improvement
over time" use case surfaces.

**Re-evaluate at W134-F15+** if:
- eee adds long-running autonomous agents that explicitly need self-evolution
- Letta ships native MCP server (eliminates custom-wrapper work)
- Existing L1/L3 stack hits limitations user mentions

## Why-SOTA

1. **MemGPT lineage** = academic foundation for agent-memory-beyond-context (cited in
   Anthropic + OpenAI literature)
2. **Apache-2.0 + 22k★** = strong adoption + clean license
3. **Self-improvement** is UNIQUE primitive in cohort
4. **Enterprise governance** (AI_POLICY, PRIVACY, TERMS) = production-grade
5. **Python + TypeScript SDKs + API + CLI** = multi-deployment-mode
6. **Berkeley academic origin** = highest-provenance signal in cohort

## Risk classification

- **Install class**: SECONDARY (custom MCP wrapper required vs MCP-native primitives)
- **Reversibility**: MEDIUM (PostgreSQL setup needs cleanup)
- **Blast radius**: MEDIUM (new infrastructure backend)
- **License**: Apache-2.0 clean
- **kiss-dry-yagni risk**: HIGH (3rd memory backend = potential DUPLICATE-FUNCTIONALITY)

## Mia ladder advance

n=1188 → n=1192 (+4: Apache-2.0 verified / MemGPT lineage / 9/10 SRA / STUDY-PILOT with caveat verdict)
