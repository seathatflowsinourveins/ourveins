# W327-S13 — Memory-Stack SOTA Review + Hindsight T1 Re-introduction

**Wave**: W327 FULL-SOTA-UNLEASHED · **Stream**: S13 · **Date**: 2026-05-19
**Budget**: K=20 tool calls / M=200k tokens · **Status**: SHIPPED
**Cite-anchors**: W295-BASIC-MEMORY-DEEP-AUDIT (`docs/architecture/W295-RESEARCH-ARCH-V5/W295-BASIC-MEMORY-DEEP-AUDIT.md`), W314-A-NSSM-REPLACEMENT (`docs/architecture/W314-RUNTIME-CONFORMANCE-AND-NSSM/W314-A-NSSM-REPLACEMENT.md`), W326 §3.1 / §9 Target Architecture (`docs/architecture/W326-RESEARCH-ARCHITECTURE-OVERHAUL/09-TARGET-ARCHITECTURE-DESIGN.md`), CLAUDE.md L60 "Memory live" line.

---

## TL;DR

- **T1 hindsight verdict**: **REJECT re-introduction at W327**. Restore-cost is high (Ollama+:9077 daemon+NSSM tax+OTEL pipe) for marginal benefit; T6 basic-memory canonical-primary already covers governance-record duty, and §5 citation-graph (Δ55) extends T6 to absorb the "session-replay" niche hindsight previously owned. Reconsider only if W327+ surfaces a duty hindsight uniquely fills.
- **AI-3 path-drift status**: **LIVE FIX ALREADY EFFECTIVE** — `.mcp.json:66-67` `BASIC_MEMORY_HOME` + `BASIC_MEMORY_CONFIG_DIR` env-vars route MCP at the correct state-side dir; legacy `Z:/claude-sota-installed/.basic-memory/config.json` (wrong-path) is a dead artifact and can be deleted in W328 housekeeping.
- **Top-3 actions**: (1) **Δ55 citation-graph schema commit** to T6 basic-memory in W327 (cross-cut for sca-v13). (2) **Cognee T3 NSSM→uvx-stdio migration** per W314-A Candidate (d) 20/20 score (closes operator's "NSSM not SOTA" objection + removes `:8000` always-on listener). (3) **Delete legacy `.basic-memory/config.json`** + record AI-3 CLOSED in CLAUDE.md L60.

---

## §1 Current 5-tier memory state (probe-verified 2026-05-19)

| Tier | Component | State | Probe evidence | Notes |
|---|---|---|---|---|
| **T1** | **hindsight** | ✗ RETIRED W317-S1 | `sc query Hindsight` → service does not exist; no LISTEN :9077; `.hindsight/profiles/claude-code.env` lingers as dead-relic config; no `Z:/claude-sota-installed-state/hindsight/` dir | Daemon offline, no NSSM service, OTEL pipe ($16006 Phoenix) was the only live consumer |
| **T2a** | `.mcp.json:memory` (sqlite_vec) | ✗ disabled | Sits in `disabledMcpjsonServers` per W295 ledger (W286-cross CR-9 dormant exception — `Z:/venvs/claude/Scripts/memory.exe`) | Inert; retain-as-dormant per W300-AI-1 corollary |
| **T2b** | `plugin:everything-claude-code:memory` | ✓ LIVE | Surfaces as `mcp__plugin_everything-claude-code_memory__*` tools | Plugin-supplied per cardinal-rule-3 |
| **T3** | **cognee** GraphRAG | ✓ ACTIVE | `sc query CogneeMCP` → STATE: 4 RUNNING; `curl :8000/mcp` → HTTP 406 (MCP requires POST; 406 confirms live endpoint); ladybug 0.16.0 backing per W308-comments | NSSM-supervised; W314-A flagged Candidate (d) uvx-stdio replacement (20/20) |
| **T4** | graphiti temporal-KG | ✗ RETIRED W272+W290+W295 | Block excised `.mcp.json` W313-A `5a350d1`; FalkorDB :16379 STOPPED-by-design; Ollama :16700 idle/0-models | NSSM `OllamaServe` + `Phoenix-W251` present but unused-by-design |
| **T5** | **langfuse** observability | ✓ LIVE | `curl :3000` → HTTP 200; v3.170.0 [CORRECTED W340→v3.160.0 per W347 P2a]; project 5.17.2026 (id `cmpa0h6ux0003o6067jlf4jgd`) | Self-hosted; LANGFUSE_* env-block in CLAUDE.local.md (gitignored) |
| **T6** | **basic-memory** canonical | ✓ LIVE | `mcp__basic-memory__list_directory("/")` returns 5 dirs (config / learnings / main / verdicts / w288-p4-smoke); uvx-pin `basic-memory==0.21.1` per W308 CR-9 | Canonical-primary per W295; FTS5 + sqlite-vec; markdown-canonical |

**Live config (state-side, authoritative)**: `Z:/claude-sota-installed-state/basic-memory/config/config.json` → `projects.main.path = "Z:/claude-sota-installed-state/basic-memory/markdown"` (semantic_search_enabled: true; bge-small-en-v1.5 via fastembed). FTS5 + semantic-vec hybrid active.

**Live verdicts ledger**: 10+ files in `verdicts/` (W288 + W295 + W296 + W301 series). Reachable via `mcp__basic-memory__search_notes`.

**NSSM services present**: BasicMemoryHTTP · CogneeMCP · IkEmbedServer · IkLlamaServer · LlamaSwap · OllamaServe · CCC-Exporter · CCC-Proxy · CLIProxyAccountExporter · EEE-CacheFixProxy · EEE-CLIProxyAPI · NvidiaGpuExporter. Memory-relevant: CogneeMCP (T3) + BasicMemoryHTTP (T6 secondary HTTP, if running).

---

## §2 T1 hindsight re-introduction decision — **REJECT at W327**

### 2.1 What hindsight gave

Per `.hindsight/profiles/claude-code.env` (dead-relic): the W264-era T1 hindsight was an obra/hindsight-style **session-replay + consolidation worker** with:
- LLM backend: `qwen36` (local Ollama at :8080/v1)
- Embeddings: BAAI/bge-small-en-v1.5 (CPU-forced, local)
- OTEL traces → :16006 Phoenix (now retired)
- Workers: 3 max slots, 1 consolidation slot
- Duty: "what happened across recent sessions"

### 2.2 Why it died (W317-S1)

- Daemon offline (no LISTEN :9077)
- No NSSM service registered (`Hindsight` does not enumerate)
- No replacement plan staged
- T6 basic-memory canonical-primary already absorbed the governance-record duty
- Phoenix retired (no OTEL sink for hindsight traces anyway)

### 2.3 Alternatives evaluated

| Candidate | License | Duty fit | Verdict |
|---|---|---|---|
| **mem0ai/mem0** | Apache-2.0 | LongMemEval 49.0% (vs Zep 63.8%); auto-extracted vector memory; needs DB infra | **REJECT** — duplicates basic-memory semantic-search niche; adds infra cost; LongMemEval result middling |
| **letta-ai/letta** (formerly MemGPT) | Apache-2.0 | Stateful agent OS; needs server; agent-side state machine | **REJECT** — too heavyweight for W327 duty; reconsider for "multi-agent shared state" if needed |
| **getzep/zep** | Apache-2.0 | LongMemEval 63.8% (best); needs Postgres+OpenAI key; SaaS-leaning | **REJECT** — best raw score but adds SaaS-leaning infra; SaaS Postgres dep |
| **agiresearch/A-mem** | Research-grade | A-MEM agentic memory paper; <1k★ | **DELAY** — academic; not production-grade yet |
| **getmotorhead/motorhead** | Apache-2.0 | Lightweight chat-memory + Redis; HN-popular | **REJECT** — chat-memory niche, not session-replay |
| **run-llama llama-cloud memory** | Proprietary | LlamaCloud-hosted only | **REJECT** — proprietary; cardinal-rule-1 violation |
| **basic-memory T6 + Δ55 citation-graph** | AGPL | Already canonical; adds claim→source DAG per W326 §3.1 | **ADOPT** — extends T6 to cover session-replay niche via citation-graph topology |

### 2.4 Re-introduction cost-benefit

**Cost to re-introduce hindsight**:
- Stand up :9077 daemon (Python service)
- Re-register NSSM service `Hindsight` (or migrate to uvx-stdio per W314-A)
- Wire Ollama :8080/v1 backend (currently idle but configured)
- Re-establish OTEL sink (Phoenix retired; would need re-spin)
- Coordinate with T6 basic-memory + T3 cognee to avoid duty overlap
- **Estimated**: ≥3 hours operator + 1 NSSM service + 1 always-on listener (-D24 attack surface)

**Benefit**:
- "Session-replay" recall — but T6 basic-memory's `mcp__basic-memory__recent_activity` already provides this at 7d default window
- Vector consolidation — but T6 sqlite-vec + bge-small-en-v1.5 already provides this
- OTEL traces — but T5 langfuse covers LLM-call observability

**Net**: Cost > Benefit. **REJECT re-introduction at W327**.

### 2.5 Conditions to revisit

Per `W295-BASIC-MEMORY-DEEP-AUDIT.md §5 hard-cap dissent` mechanism:
- If a duty surfaces that ONLY hindsight-class session-replay fills (e.g. cross-session causal-trace requiring sub-second replay) → reconsider in W328+.
- If T6 basic-memory + Δ55 citation-graph proves insufficient for citation-trail provenance after 4-wave soak → revisit.
- If operator decides multi-agent shared-state duty must come live (currently solo) → letta becomes the candidate, not hindsight.

---

## §3 T6 basic-memory operator-AI-3 path-drift fix status — **LIVE FIX EFFECTIVE**

### 3.1 W295 deep-audit AI-3 spec (recap)

Per `W295-BASIC-MEMORY-DEEP-AUDIT.md §5 AI-3`:

> §1.6 found: `Z:\claude-sota-installed\.basic-memory\memory.db` is empty; markdown lives at `Z:\claude-sota-installed-state\basic-memory\` per the W260 state-outside-repo convention; but `config.json` points to `Z:\claude-sota-installed\basic-memory\`.

### 3.2 Current live state (2026-05-19 probe)

Two `config.json` files exist:

| File | Path config | Used? |
|---|---|---|
| `Z:/claude-sota-installed/.basic-memory/config.json` (worktree, legacy) | `Z:\claude-sota-installed\basic-memory` (WRONG, the W295 problem) | **NO — superseded by env** |
| `Z:/claude-sota-installed-state/basic-memory/config/config.json` (state-side) | `Z:/claude-sota-installed-state/basic-memory/markdown` (CORRECT) | **YES — active** |

**Why the state-side one wins**: `.mcp.json:64-67` for `basic-memory`:
```json
"env": {
  "BASIC_MEMORY_HOME": "Z:/claude-sota-installed-state/basic-memory",
  "BASIC_MEMORY_CONFIG_DIR": "Z:/claude-sota-installed-state/basic-memory/config"
}
```

`BASIC_MEMORY_CONFIG_DIR` overrides the default `~/.basic-memory/config.json` search path → MCP loads the correct state-side config, which has the correct markdown path.

### 3.3 Live verification

`mcp__basic-memory__list_directory("/")` returns 5 dirs (config / learnings / main / verdicts / w288-p4-smoke) — index is populated, FTS5 + semantic-vec both enabled. Verdicts ledger reachable (10+ files visible).

### 3.4 W327 action

**AI-3 → CLOSED**. The W295 documented fix was implemented via env-block redirection rather than the snippet PowerShell rewrite, and is verified live.

**W327 housekeeping (optional, W328 candidate)**:
- Delete legacy `Z:/claude-sota-installed/.basic-memory/config.json` (dead artifact; could confuse a future operator running `basic-memory` CLI outside of MCP env-block).
- Update CLAUDE.md L60 status: `operator-AI-3 basic-memory config.json path-drift fix pending` → `CLOSED W327`.
- The empty `Z:/claude-sota-installed/.basic-memory/memory.db` (241 KB stub from W281e) can also be removed.

### 3.5 Upstream pin

Runtime pin: `uvx --from basic-memory==0.21.1 basic-memory mcp` per `.mcp.json:62-63` + W308 comment.

Upstream HEAD (per W295-BASIC-MEMORY-DEEP-AUDIT §1.3 + deepwiki): `basicmachines-co/basic-memory` v0.21.1 released 2026-05-16; FastMCP 3.3.1 floor as of 2026-05-15 commit `14ff77d`. No CVE filed against basic-memory itself. No drift detected at audit.

**Pin policy**: STAY at 0.21.1 (W295 STAY-WITH-HARDENING conf=0.86); bump to 0.22.x only after W328+ release-cadence verification.

---

## §4 SOTA memory references comparison

Anchor sources: W295-BASIC-MEMORY-DEEP-AUDIT §2 + §3 (24 EXTERNAL cites, all dated 2026-05-18). DeepWiki indexes verified for top candidates.

### 4.1 Comparison matrix (W327 duty: governance-ledger + session-replay + citation-graph)

| Candidate | Star | D1 fs-survive | D2 search | D3 bus-factor | D4 OSSF | Duty fit | Verdict |
|---|---|---|---|---|---|---|---|
| **basic-memory (incumbent T6)** | 2.8K | 5 | 4 (FTS5+sqlite-vec) | 1 (Paul Hernandez) | absent | governance-ledger | **STAY-WITH-HARDENING** (W295 verdict) |
| **mem0ai/mem0** | 38K+ | 1 (DB-canonical) | 4 (vec) | 4 (org) | partial | auto-extracted chat-memory | **REJECT** (D1 fails) |
| **letta-ai/letta** | 18K+ | 2 (DB) | 4 | 4 | yes | stateful agent OS | **DELAY** (overkill for W327) |
| **topoteretes/cognee (T3 incumbent)** | 4K+ | 2 (graph DB) | 5 (GraphRAG) | 3 | partial | KG-RAG cold-tier | **STAY** (T3 active; uvx-stdio migration pending) |
| **getzep/zep** | 3K+ | 1 (Postgres) | 5 (LongMemEval 63.8%) | 4 | yes | LongMemEval best | **REJECT** (Postgres dep + SaaS-leaning) |
| **agiresearch/A-mem** | <1K | 2 | 3 | 1 | absent | research-grade agentic memory | **DELAY** |
| **getmotorhead/motorhead** | 2K+ | 1 (Redis) | 3 | 3 | absent | lightweight chat-memory | **REJECT** (Redis dep) |
| **obra/hindsight** (prior T1) | <1K | 3 | 3 (vec) | 1 | absent | session-replay | **REJECT** (§2 verdict) |
| **run-llama llama-cloud memory** | proprietary | 0 | 5 | enterprise | yes | SaaS-only | **REJECT** (CR-1 violation) |
| **doobidoo/mcp-memory-service** | 1K+ | 1 (sqlite_vec) | 3 | 1 | absent | sqlite_vec MCP | **REJECT** (overlaps memory-MCP) |

**Architectural convergence** (per W295 §3): Anthropic CLAUDE.md + LangChain MemorySaver checkpointer + LlamaIndex VectorStoreIndex + SemanticKernel KernelMemory all point at **filesystem-canonical + index-secondary**. basic-memory is on the right side of this convergence.

### 4.2 Upstream HEAD freshness (2026-05-19 spot-check)

- **basic-memory**: pinned 0.21.1; upstream activity steady (CHANGELOG referenced 2026-05-15 → `14ff77d`).
- **cognee**: pinned 1.1.0 (cognee-mcp 0.5.4) per W263b; HEAD progressing; ladybug==0.16.0 (Kùzu fork after Apple acquisition).
- **mem0**: HEAD progressing rapidly (38K★); not adopted.
- **letta**: HEAD progressing (rebranded from MemGPT); not adopted.

---

## §5 Citation-graph topology design (Δ55 implementation spec)

### 5.1 Context (per W326)

Per `W326-RESEARCH-ARCHITECTURE-OVERHAUL/09-TARGET-ARCHITECTURE-DESIGN.md §3.1` + `03-MULTI-ANGLE-CONVERGENCE-PATTERNS.md P4`:

> sca-v12 has `sources_typed[]` + `mcp_family_attribution[]` (flat) but no graph topology between claim-and-evidence-and-source. **Gap**: no claim-graph. **Adopt**: pattern-only T3 — store verdict citation-graph as basic-memory T6 entity-relations.

> **sca-v13 Δ55 extension**: extend Δ51 markitdown probe-record schema with `graph_edges: [{from: <slug>, to: <claim-id>, type: <citation|contradiction|corroboration>}]`. Persist to T6 via `mcp__basic-memory__write_note` tag `citation-graph-W<NNN>`.

### 5.2 Topology decision: T6 basic-memory tags (PRIMARY) — NOT T3 cognee KG

**Rationale**:
- **T6 already canonical** — fewest moving parts, no infra cost.
- **Markdown-survivable** — graph edges live in YAML frontmatter `relations:` blocks (basic-memory's native entity-relation primitive); readable with `cat` if MCP dies.
- **T3 cognee duplicate-niche** — would force dual-write or migration cost without ROI; T3 cognee's GraphRAG strength is multi-doc semantic-search, NOT discrete claim→source edges.
- **Search-fit** — basic-memory `search_notes` already indexes relations; can query "all sources for claim X" via tag-search.

### 5.3 Schema design

**Frontmatter additions** (per markdown verdict file):

```yaml
---
title: "W<NNN> <slug> — adoption verdict"
note_type: "verdict"
tags:
  - "verdict"
  - "W<NNN>"
  - "citation-graph-W<NNN>"
graph_edges:
  - from: "evidence://<source-slug>"          # markitdown probe-record slug
    to: "claim://W<NNN>-claim-<id>"           # in-verdict claim id
    type: "citation"                          # citation | contradiction | corroboration
    weight: 1.0
    cite_anchor: "https://<external-url> @ <access-date>"
  - from: "claim://W<NNN>-claim-2"
    to: "claim://W<NNN>-claim-1"
    type: "corroboration"
    weight: 0.8
relations:
  - relation_type: "cites"
    target: "evidence://anthropic-claude-cookbooks-research-lead-agent-md"
  - relation_type: "contradicts"
    target: "verdict://W<PREV>-<slug>"
---
```

**Probe-record extension** (`verdicts/W<N>-<slug>-probe-record.json` Δ51 extension):

```json
{
  "wave": "W<NNN>",
  "slug": "<slug>",
  "markitdown_canonical": "<filename>.md",
  "claims": [
    {"id": "W<NNN>-claim-1", "text": "<claim>", "score": 4}
  ],
  "graph_edges": [
    {"from": "evidence://<source>", "to": "claim://W<NNN>-claim-1", "type": "citation", "cite_anchor": "<URL @ date>"}
  ]
}
```

### 5.4 Write contract

Tag the verdict note with `citation-graph-W<NNN>` so `mcp__basic-memory__search_notes` retrieves the graph by wave-id. Use `mcp__basic-memory__write_note` with `directory="verdicts"`, `note_type="verdict"`, `tags=["verdict","citation-graph-W<NNN>","W<NNN>"]`.

### 5.5 Read contract (provenance traversal)

To answer "which sources back D5 score 4 for verdict X":
1. `mcp__basic-memory__read_note(permalink="verdicts/W<NNN>-<slug>")` → returns frontmatter `graph_edges`
2. Filter `graph_edges where to == "claim://D5-score-4"` → returns `from` evidence URIs
3. Resolve `evidence://` URIs via `mcp__basic-memory__build_context(url="evidence://...")` (basic-memory supports memory:// scheme)

### 5.6 Convergence-detection (Graphlit pattern absorption)

Per W326 P4 §3 reference: Graphlit "writes every conclusion back into the graph as a new node with provenance trails connecting it to source papers". The Δ55 schema replicates this in T6 — every adoption-decision verdict becomes a node with explicit edges to source-evidence and prior-verdict corroborations/contradictions.

### 5.7 Migration cost

Existing verdicts in `verdicts/` (W288 + W295 + W296 + W301 series, 10+ files) require ONE-TIME backfill to add `graph_edges` frontmatter. New verdicts from W327 forward MUST write Δ55 schema. Backfill is opt-in (operator-discretion) — old verdicts remain functional without graph_edges.

### 5.8 W326 gap-closure

**G12** (Citation-graph topology NOT persisted to T6 basic-memory — provenance trail rebuilt every wave) → **CLOSED** by Δ55 schema commit in W327.

---

## §6 Consolidation recommendations

### 6.1 T2 split — KEEP

- **T2a** `.mcp.json:memory` (disabled, sqlite_vec via .exe) — keep as W286-cross dormant exception per W300-AI-1 corollary. Cost: 1 entry in `disabledMcpjsonServers`. Benefit: revertible if plugin T2b breaks. **W327 verdict: STAY**.
- **T2b** `plugin:everything-claude-code:memory` — keep as live primary T2. **W327 verdict: STAY**.

**No consolidation needed** — T2 split is intentional defense-in-depth.

### 6.2 T3 + T6 consolidation evaluation — REJECT

**Question**: Should T3 cognee be folded into T6 basic-memory?

**Analysis**:
- **T3 cognee niche**: GraphRAG cold-tier — multi-document semantic queries over ingested-corpus.
- **T6 basic-memory niche**: governance-ledger + verdict-graph (Δ55) — discrete claim→source edges in markdown frontmatter.
- **Overlap**: zero. T3 ingests external docs; T6 writes runtime decisions. Different write directions, different read patterns.

**Verdict**: **KEEP SPLIT**. T3 cognee + T6 basic-memory occupy distinct duty niches. Consolidation would force one duty to compromise.

### 6.3 T3 cognee NSSM → uvx-stdio migration — RECOMMEND W327/W328

Per W314-A NSSM-REPLACEMENT decision matrix:

| Candidate | Score / 20 | Verdict |
|---|---|---|
| (a) winsw | 13 | T2 — lateral move |
| (b) sc.exe + Scheduled Task | 15 | T1 ceremonial — over-engineering |
| (c) Docker Desktop | 14 (D24=1 hard-cap) | T2 — DISQUALIFIED by attack-surface |
| **(d) Direct uvx stdio MCP** | **20** | **T1 INSTALL — RECOMMENDED** |

**Wins**: (1) eliminates NSSM (operator concern resolved), (2) mirrors basic-memory wiring pattern, (3) closes always-on `:8000` listener (D24 attack-surface -3 long-running items: listener + NSSM service + nssm.exe binary).

**W327 action item** (P3): smoke-probe `uvx --from cognee==1.1.0 cognee-mcp` invocation works on Windows + Z:-portable env; if PASS, apply transition per W314-A §4 (5-minute operator window).

### 6.4 T4 graphiti — STAY RETIRED

W272 + W290 + W295 all converged on RETIRED. No reason to reopen at W327.

**Housekeeping**: confirm `OllamaServe` + `Phoenix` NSSM services are intentional-running (per W315-r2 Stream E discovery 2026-05-19) — operator-decision per CLAUDE.md L60 ("Phoenix started today 12:29:12Z; OllamaServe idle/0-models"). If retained-running for LlamaSwap, document; if not, stop both.

### 6.5 T1 hindsight — STAY RETIRED (§2 verdict)

---

## §7 W327 action items

| # | Action | Priority | Owner | Cite |
|---|---|---|---|---|
| **A1** | Commit Δ55 citation-graph schema (§5.3) — write `frontmatter` + probe-record contract to `docs/architecture/W327-FULL-SOTA-UNLEASHED/` and `docs/architecture/W326-RESEARCH-ARCHITECTURE-OVERHAUL/09-TARGET-ARCHITECTURE-DESIGN.md` | P0 | W327-S13 | §5 |
| **A2** | Cognee T3 NSSM → uvx-stdio smoke-probe (Windows Z:-portable env); if PASS, apply W314-A §4 transition | P1 | operator | W314-A §6 |
| **A3** | Delete legacy `Z:/claude-sota-installed/.basic-memory/config.json` + empty `memory.db` (dead artifacts post-AI-3-closure) | P2 | operator | §3.4 |
| **A4** | Update CLAUDE.md L60 status row — change `operator-AI-3 basic-memory config.json path-drift fix pending per W295-BASIC-MEMORY-DEEP-AUDIT §5` → `operator-AI-3 CLOSED W327 (env-block override per .mcp.json:66-67)` | P1 | W327 closure | §3.4 |
| **A5** | Backfill graph_edges frontmatter into existing W288/W295/W296/W301 verdict markdown — operator discretion, opt-in | P3 | operator | §5.7 |
| **A6** | Decide retain-running vs re-stop `OllamaServe` + `Phoenix-W251` NSSM services per CLAUDE.md L60 W316 operator-AI | P2 | operator | §6.4 |
| **A7** | basic-memory upstream HEAD watch — re-check at W328 for v0.22.x bump candidate | P3 | W328 | §3.5 |
| **A8** | Re-evaluate T1 hindsight ONLY if a duty surfaces that ONLY session-replay fills | P-defer | future-wave | §2.5 |

---

## §8 References

- W295-BASIC-MEMORY-DEEP-AUDIT: `docs/architecture/W295-RESEARCH-ARCH-V5/W295-BASIC-MEMORY-DEEP-AUDIT.md`
- W295-AUDIT: `docs/architecture/W295-AUDIT-2026-05-18.md`
- W314-A-NSSM-REPLACEMENT: `docs/architecture/W314-RUNTIME-CONFORMANCE-AND-NSSM/W314-A-NSSM-REPLACEMENT.md`
- W326 §3.1 Target Architecture: `docs/architecture/W326-RESEARCH-ARCHITECTURE-OVERHAUL/09-TARGET-ARCHITECTURE-DESIGN.md`
- W326 P4 Citation-graph pattern: `docs/architecture/W326-RESEARCH-ARCHITECTURE-OVERHAUL/03-MULTI-ANGLE-CONVERGENCE-PATTERNS.md`
- W326 G12 gap: `docs/architecture/W326-RESEARCH-ARCHITECTURE-OVERHAUL/06-GAPS-IDENTIFIED.md`
- W326 Δ55 roadmap: `docs/architecture/W326-RESEARCH-ARCHITECTURE-OVERHAUL/08-W326-ROADMAP.md`
- CLAUDE.md L60 (Memory live status)
- `.mcp.json:60-68` basic-memory entry
- `.mcp.json:_comments.cognee_w259v8 + w308_basic_memory_uvx_pin_2026_05_19`

---

**STATUS**: SHIPPED
**Author**: W327-S13 agent (Claude Opus 4.7 [1m])
**Date**: 2026-05-19
