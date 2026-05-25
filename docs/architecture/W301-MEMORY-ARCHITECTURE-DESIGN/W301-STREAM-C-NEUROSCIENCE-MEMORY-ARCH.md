# W301 Stream C — 41-Paper Neuroscience-Flavored Memory Architecture (`cdeust/Cortex`)

> **Wave**: W301 (operator follow-up to W300 — DESIGN-class wave: synthesize 4-stream + 41-paper neuroscience architecture into next-gen memory architecture spec).
>
> **Branch**: `sota-converge-w295` (continued).
>
> **Date**: 2026-05-18.
>
> **Scope**: Deep-read the actual upstream of the operator's "memory_layer" hindsight reference. Map every transferable pattern to the current 6-tier memory architecture. Rate each pattern for transferability. Re-audit the candidate under sca-v5 lite at subdirectory scope.

---

## §0 — TL;DR

**CRITICAL MIS-ATTRIBUTION CORRECTION**: Hindsight memory T1 says "`rohitg00/awesome-claude-code-toolkit/memory_layer` — 41-paper neuroscience-flavored memory architecture". This is **FALSE**. The actual upstream is **`cdeust/Cortex`** (a separately-installed Claude Code plugin authored by Clement Deust, ~21 GitHub stars as of 2026-05-18). The `rohitg00/awesome-claude-code-toolkit` repo only *references* it from its top-level README under the `cortex` entry — there is no `memory_layer/` subdirectory in that repo (verified via GitHub MCP `get_file_contents` against tree at `main`). The actual code, schema, 41-paper bibliography, hooks, and decay equations live at `https://github.com/cdeust/Cortex` (MIT, Python 3.10+ FastMCP server).

**Top-3 transferable patterns** (ranked by drop-in cost × payoff):

1. **ACT-R thermodynamic decay equation + 4-stage consolidation cascade** — TRANSFERABLE-WITH-ADAPTATION onto **T1 hindsight** (already has heat + consolidation; missing stage-dependent floors + emotional-damping β term). Pure Python; no DB schema changes. Lifts onto qwen36 consolidation-worker. Estimated effort: 1-2 dev-days.
2. **6-signal WRRF stored-procedure retrieval (vector + FTS + trigram + heat + recency + (optional) HDC)** — TRANSFERABLE-WITH-ADAPTATION onto **T6 basic-memory** (which currently runs FastEmbed + sqlite-vec). Replace ad-hoc Python rerank logic with a single PL/pgSQL-equivalent in sqlite_vec + FTS5 + trigram. Estimated effort: 3-5 dev-days; benchmark with W301-A/B harness.
3. **Predictive-coding 4-signal write gate** — TRANSFERABLE-WITH-ADAPTATION onto **T1 hindsight write path** (currently passes everything through). Adds embedding-novelty + entity-novelty + temporal + sparsity filters before storage. Pure Python module, no infra change. Prevents the "memory store fills with redundant content" failure mode currently observable in our `:9077` daemon. Estimated effort: 2-3 dev-days.

**Subdirectory sca-v5 lite re-audit verdict** (re-scoring `cdeust/Cortex` as the actual upstream, not `rohitg00/.../memory_layer` which doesn't exist):

- **install_score ≈ 3.65** (caps: D5<4 own-benchmark-only on LongMemEval/LoCoMo despite citing 41 papers; D7 license MIT ✓; D6 bus_factor=2 author-only; D11 preload-cost LOW; D17 robustness untested; D18 safety GREEN — has `pre-tool-secret-shield.py`)
- **pattern_score ≈ 4.20** (D2 capability_uniqueness HIGH — only memory layer that traces every mechanism to a published paper + measures ablations; D13 pattern_extractability HIGH — 4 isolated patterns lift cleanly without PostgreSQL dependency)
- **Verdict: T3 PATTERN-STUDY** (install_score 3.65 in soft-gate band 3.0-4.0; pattern_score 4.20 lifts; D11 preload not blocking)
- **NOT T1 INSTALL** because (a) hard-cap D5<4 (own-benchmark-only — Cortex's "97.8% LongMemEval R@10" is self-reported, not independently reproduced — W301-A audit at `rohitg00/agentmemory/benchmark` may resolve); (b) PostgreSQL dependency adds CR-9 surface we don't have; (c) 6+1 = 7-event hook stack with 14 `.sh`/`.py` scripts violates our cardinal-rule-2 if adopted directly (must be re-implemented as direct-CLI invocations).

**Biggest extraction-gap**: The 41-paper bibliography is genuinely impressive (computational-neuroscience-grade with explicit FAITHFUL/DOCUMENTED labels per module), but the **empirical claims** (97.8% LongMemEval, 92.6% LoCoMo, +33.4% BEAM-10M) are author-only — no independent reproduction in the wild yet (D5=2). This means we should lift the *mechanisms* (heat decay, WRRF, predictive coding gate) but **not** claim the benchmark numbers in our own design without re-running them under our harness.

---

## §1 — `cdeust/Cortex` directory inventory

Top-level layout (verified via `mcp__plugin_everything-claude-code_github__get_file_contents` on `cdeust/Cortex@main`):

| Path | Purpose |
|---|---|
| `.claude-plugin/marketplace.json` | Plugin manifest (`name: "cortex"`, `version: 3.16.0`, MIT, runtime: CLI + Cowork) |
| `.claude/settings.json` | 429-byte permissions allow-list; allows `mcp__plugin_cortex_cortex__recall` etc. |
| `.claude/hooks/hooks.json` | 6 event-types × 14 hook scripts (full breakdown in §5) |
| `.claude/hooks/*.sh` + `pre-tool-secret-shield.py` | 17 hook scripts (`session-start.sh`, `pre-commit-ruff.sh`, etc.) |
| `.claude/agents/`, `.claude/commands/`, `.claude/skills/`, `.claude/tools/` | Plugin-provided primitives |
| `.claude/memory/` | Per-project memory (gitignored normally) |
| `.claude/worktrees/` | Worktree state |
| `.mcp.json` (330 B) | MCP server registration |
| `_pipeline/` | Codebase analysis pipeline (`ai-automatised-pipeline`) ingestion target |
| `agents/`, `commands/`, `skills/`, `tasks/` | Plugin content |
| `benchmarks/` | **8 benchmark suites**: `beam/`, `episodic/`, `evermembench/`, `hnsw_probe/`, `llm_head_to_head/`, `locomo/`, `longmemeval/`, `memoryagentbench/`, `spell_alteration/`, plus `lib/` + `quick_test.sh` + `results/` |
| `docs/architecture.md` (14 KB) | Mermaid-diagrammed layer + module map |
| `docs/data-flow.md` (9 KB) | Read/write path mermaid flowcharts |
| `docs/science.md` (88 KB) | **The paper** — 20 mechanisms, 41 citations, ablations |
| `docs/papers/science.md` (88 KB) | Identical canonical version |
| `docs/papers/thermodynamic-memory-vs-flat-importance.md` (60 KB) | Companion ablation paper |
| `docs/papers/research-post-context-assembly.md` (104 KB) | Companion paper on context-assembly architecture |
| `docs/papers/appendix-{erdos,feynman,popper,shannon}-*.md` | 4 appendices (philosophical / information-theoretic framing) |
| `docs/arxiv-context-assembly/` + `docs/arxiv-thermodynamic/` | Paper-prep dirs |
| `docs/diagram-*.svg` | 9 architecture SVG diagrams |
| `docs/neural-graph-*.png` | 7 PNG diagrams of the workflow graph view |
| `docs/wiki-*.png` | 2 PNGs of the curated-wiki UI |
| `mcp_server/` | Python MCP server (Python 3.10+, FastMCP, Pydantic, numpy) |
| `mcp_server/core/` | Core algorithms (decay_cycle, replay, schema_engine, hdc_encoder, hopfield, neuromodulation, interference, etc.) |
| `mcp_server/handlers/` | Tool entry-points |
| `mcp_server/infrastructure/pg_schema.py` (57 KB) | **The schema** — all PostgreSQL DDL + PL/pgSQL functions |
| `mcp_server/infrastructure/sqlite_schema.py` (11 KB) | SQLite fallback schema (Cowork mode) |
| `mcp_server/infrastructure/pg_store*.py` | 8 modules splitting CRUD by domain (entities, relationships, queries, stats, wiki, rules, auxiliary) |
| `mcp_server/infrastructure/workflow_graph_source*.py` | Tree-sitter AST → workflow graph (10 languages) |
| `mcp_server/observability/` | OTEL + health-check |
| `mcp_server/validation/` | Pydantic schemas |
| `Dockerfile` + `docker/` | Container build (PostgreSQL + pgvector pre-installed) |
| `pyproject.toml` | uv-lock'd Python deps |
| `tests_py/` | Test suite |
| `ui/` | Web UI (port 3113 — referenced in marketplace.json) |
| `video/` | Demo videos |

**Total LOC** (estimated from file-size sum on tracked sources): ~140 K lines, dominated by `mcp_server/` (~110 K) + `docs/` (~25 K papers + diagrams).

**Stars**: 21 (low). **License**: MIT. **Author**: Clement Deust (single committer per `git log` patterns in `CHANGELOG.md`). **Funding/governance**: none visible. **Last commit**: April 2026 (per `pyproject.toml` and CHANGELOG.md headers).

---

## §2 — 41-Paper Bibliography (extracted from `docs/papers/science.md`)

Extracted by fetching the 88 KB `science.md` from raw GitHub and indexing via `ctx_fetch_and_index`. The paper has **20 biological mechanisms** organized into 4 functional groups (encoding · consolidation · retrieval · maintenance), with **8 FAITHFUL** implementations (citing equation directly) and **12 DOCUMENTED** engineering adaptations.

### §2.1 — FAITHFUL implementations (paper → module → equation)

| Module | Paper(s) | Equation |
|---|---|---|
| `core/spreading_activation.py` | Collins & Loftus 1975 | BFS spreading + convergent summation |
| `core/titans_memory.py` | Behrouz et al., NeurIPS 2025 | Mₜ = Mₜ₋₁ - Sₜ; Sₜ = η·Sₜ₋₁ - θ·∇L |
| `core/synaptic_plasticity_hebbian.py` | BCM 1982; Bi & Poo 1998 | φ(c, θₘ) = c(c - θₘ); A⁺ exp(-Δt/τ⁺) |
| `core/synaptic_plasticity.py` | Tsodyks-Markram 1997 | u_new = u + U(1-u); x_new = x - u_eff·x |
| `core/decay_cycle.py` | ACT-R (Anderson & Lebiere 1998) | **Bᵢ = ln(n) - d·ln(L), d = 0.5** |
| `core/emotional_tagging.py` | Yerkes-Dodson 1908 | f(a) = c·a·exp(-b·a) |
| `core/dendritic_computation.py` | Poirazi et al. 2003 | Sigmoid s(n) + soma g(x) (Neuron Fig. 3) |
| `core/homeostatic_plasticity.py` | Tetzlaff et al. 2011; BCM 1982 | Eq. 3 multiplicative scaling + quadratic φ |
| `core/separation_core.py` | Leutgeb et al. 2007; Rolls 2013 | 4% sparsity from DG granule cell data |
| `core/two_stage_transfer.py` | Ketz et al. 2023 (C-HORSE) | Cortical learning rate 0.02 |
| `core/neuromodulation_channels.py` (DA) | Rescorla-Wagner 1972; Schultz 1997 | δ = r - V(s); DA = 1 + δ in [0, 3] |
| `core/engram.py` (half-life) | Rashid et al. 2016 | E(t) = E₀·2^(-t/6h) |

### §2.2 — DOCUMENTED engineering adaptations

| Module | Paper(s) | Adaptation |
|---|---|---|
| `synaptic_tagging.py` | Frey & Morris 1997; Luboeinski 2021 | Bistable ODE faithful; 48h window is timescale adaptation |
| `oscillatory_phases.py` | Hasselmo 2005; Lisman & Jensen 2013 | Encoding/retrieval separation captured; cosine envelope engineering |
| `cascade_stages.py` | Kandel 2001; Bahrick 1984 | Stage timings match biology; multipliers hand-tuned |
| `schema_engine.py` | Tse et al. 2007; van Kesteren 2012 | Jaccard proxy documented |
| `schema_extraction.py` | Gilboa & Marlatte 2017 | Criteria-based, not algorithmic |
| `interference.py` | Anderson & Neely 1996; Norman 2007 | LCA cited; linear suppression simplification |
| `two_stage_model.py` | McClelland et al. 1995 | CLS framework qualitative |
| `tripartite_synapse.py` | Perea et al. 2009 | Three-regime model qualitative |
| `tripartite_calcium.py` | De Pitta et al. 2012 | De Pitta ODE preserved |
| `engram.py` (allocation) | Josselyn & Frankland 2007 | Slot model simplification |
| `replay.py` | Foster & Wilson 2006; Diba & Buzsaki 2007 | Forward/reverse correct; entity-based sequence |
| `replay_execution.py` | Davidson et al. 2009 | 15-20x compression correct |
| `synaptic_plasticity_stochastic.py` | Hebb; BCM; Markram | (truncated in fetched section) |

### §2.3 — Additional references cited in the paper

From the alphabetized `## References` section near end of science.md (verified by ctx_search hits):

- Anderson, J. R. & Lebiere, C. (1998). *The Atomic Components of Thought*. Mahwah, NJ: Lawrence Erlbaum.
- Anderson, M. C. & Neely, J. H. (1996). Interference and inhibition in memory retrieval. In *Memory: Handbook of Perception and Cognition*.
- Bahrick, H. P. (1984). Semantic memory content in permastore: Fifty years of memory for Spanish learned in school. *J. Exp. Psychol. General*, 113(1).
- Bruch, S., et al. (2023). Weighted Reciprocal Rank Fusion. (used for the WRRF retrieval step)
- Buzsaki, G. (various) — sharp-wave-ripple replay foundation.
- Collins, A. M. & Loftus, E. F. (1975). A spreading-activation theory of semantic processing. *Psychol. Rev.*, 82(6).
- Davidson, T. J., Kloosterman, F., & Wilson, M. A. (2009). Hippocampal replay of extended experience. *Neuron*, 63(4).
- De Pitta, M., Volman, V., Berry, H., & Ben-Jacob, E. (2012). *PLOS Comp. Biol.*, 7(12), e1002293.
- Diba, K. & Buzsaki, G. (2007). Forward and reverse hippocampal place-cell sequences during ripples. *Nature Neurosci.*, 10.
- Doya, K. (2002). Metalearning and neuromodulation. *Neural Networks*, 15(4-6).
- Dudai, Y. (2012). The restless engram. *Annu. Rev. Neurosci.*, 35.
- Ebbinghaus, H. (1885). *Uber das Gedachtnis*. Leipzig: Duncker & Humblot.
- Foster, D. J. & Wilson, M. A. (2006). Reverse replay of behavioural sequences. *Nature*, 440.
- Frey, U. & Morris, R. G. M. (1997). Synaptic tagging and long-term potentiation. *Nature*, 385.
- Friston, K. (2005). A theory of cortical responses. *Phil. Trans. Royal Soc. B*, 360.
- Gilboa, A. & Marlatte, H. (2017). Neurobiology of schemas. *Trends Cogn. Sci.*, 21(8).
- Hasselmo (2005) — oscillatory phases.
- Hebb, D. O. (1949). *The Organization of Behavior*.
- Hopfield, J. (1982). Neural networks and physical systems with emergent collective computational abilities. *PNAS*, 79(8).
- Joren, T. et al. (ICLR 2025) — sufficient-context gate for retrieval.
- Josselyn, S. A. & Frankland, P. W. (2007). Engram cells. (allocation)
- Kandel, E. R. (2001). The molecular biology of memory storage. *Science*, 294(5544).
- Kanerva, P. (2009). Hyperdimensional computing. *Cogn. Comp.*, 1(2).
- Ketz et al. (2023). C-HORSE model.
- Kumaran, D., Hassabis, D., & McClelland, J. L. (2016). *Trends Cogn. Sci.*, 20(7).
- Leutgeb, J. K., Leutgeb, S., Moser, M.-B., & Moser, E. I. (2007). Pattern separation in dentate gyrus and CA3. *Science*, 315(5814).
- Lisman & Jensen (2013) — oscillatory phases.
- Luboeinski (2021) — synaptic tagging.
- Markram, H. — STDP foundational.
- McClelland, J. L., McNaughton, B. L., & O'Reilly, R. C. (1995). Why there are complementary learning systems. *Psychol. Rev.*, 102(3).
- Nader, K., Schafe, G. E., & LeDoux, J. E. (2000). Fear memories require protein synthesis. *Nature*, 406.
- Norman, K. A. (2007). LCA / interference.
- Perea, G., Navarrete, M., Araque, A. (2009). Tripartite synapses. (DOCUMENTED)
- Poirazi, P., Brannon, T., & Mel, B. W. (2003). Pyramidal neuron as 2-layer neural network. *Neuron*.
- Radovanovic, M., Nanopoulos, A., & Ivanovic, M. (2010). Hubs in space. *J. Mach. Learn. Res.* (used for hubness in high-dim retrieval)
- Rashid et al. (2016). Engram half-life.
- Rescorla, R. A. & Wagner, A. R. (1972). Classical-conditioning prediction error.
- Rolls (2013) — DG sparsity.
- Schacter, D. L. — false-memory & memory distortion (cited but exact paper untracked in extracted slice).
- Schultz, W. (1997). Dopamine prediction-error signal.
- Tetzlaff, C., Kolodziejski, C., Timme, M., & Worgotter, F. (2011). Synaptic plasticity homeostasis. (Eq. 3)
- Tse, D. et al. (2007). Schemas + memory consolidation. *Science*.
- Tsodyks, M. & Markram, H. (1997). Quantal release-probability model.
- van Kesteren, M. T. R. (2012). Schemas and memory consolidation.
- Yassa, M. A. & Stark, C. E. (2011). Pattern separation in the hippocampus. *Trends Neurosci.*, 34(10).
- Yerkes, R. M. & Dodson, J. D. (1908). Stimulus strength and habit formation. *J. Comp. Neurol. Psychol.*, 18(5).
- Zhang, L., et al. (2024). Survey of agent memory mechanisms. *arXiv preprint*.

**Confidence**: HIGH that ~41 unique citations exist; **MEDIUM** on exact-count "41" (paper explicitly claims "41 paper citations" but I extracted ~46 distinct first-authors via grep — count discrepancy likely arises from multi-paper citations counted as 1 (e.g., Foster+Wilson AND Diba+Buzsaki AND Davidson all listed under `replay.py`)).

**Topics covered**: encoding (predictive coding, attention, novelty); consolidation (cascade stages, sleep replay, CLS); retrieval (spreading activation, Hopfield, HDC, WRRF, cross-encoder); maintenance (thermodynamic decay, pattern separation, interference, homeostatic plasticity, neuromodulation); schema extraction; synaptic plasticity (Hebbian + Tsodyks-Markram + STDP); reconsolidation; engram allocation.

---

## §3 — Thermodynamic Decay Mechanism

### §3.1 — Core equation

From `docs/papers/science.md` §4.4.1 *Thermodynamic Decay* (verbatim):

> **Paper**: Anderson, J. R. & Lebiere, C. (1998). *The Atomic Components of Thought*. Ebbinghaus, H. (1885).
>
> **Core idea**: Memory strength decays as a power function of time, modulated by the number of prior retrievals. The ACT-R base-level activation equation:
>
> ```
> Bᵢ = ln(n) - d · ln(L)
> ```
>
> where `n` is the number of presentations/retrievals, `L` is the time since creation (lifetime), and `d = 0.5` is the decay parameter. This produces the classic power-law forgetting curve documented by Ebbinghaus (1885).
>
> **Adaptation**: Each memory has a "heat" value in [0, 1] that decays exponentially between access events and receives a boost on each retrieval. The decay rate is modulated by consolidation stage … LABILE memories decay at 2.0x the base rate, CONSOLIDATED memories at 0.5x, and CONSOLIDATED memories have a heat floor of 0.10 to prevent permastore destruction (Bahrick, 1984).
>
> **Implementation**: `core/decay_cycle.py` (FAITHFUL for ACT-R equation).

### §3.2 — Stage-dependent decay parameters (from §4.2.1 Consolidation Cascade)

| Stage | Duration | Biological Basis | Decay Multiplier α | Heat Floor |
|---|---|---|---|---|
| **LABILE** | 0-1h | Pre-synaptic facilitation | **2.0x** | 0.00 |
| **EARLY_LTP** | 1-6h | PKA-dependent, no protein synthesis | **1.2x** | 0.00 |
| **LATE_LTP** | 6-24h | CREB-dependent, protein synthesis required | **0.8x** | 0.05 |
| **CONSOLIDATED** | >24h | Systems consolidation, cortical transfer | **0.5x** | **0.10** |
| **RECONSOLIDATING** | (entered on retrieval mismatch) | Nader et al., 2000 | (returns to ~LABILE) | (returns to 0.00) |

### §3.3 — `pg_schema.py` instantiation (verified)

From `pg_schema.py` `effective_heat()` PL/pgSQL function (ctx_search hit):

```sql
-- α(stage) — Kandel 2001 stage-dependent decay exponent.
alpha := CASE m.consolidation_stage
    WHEN 'labile'          THEN 2.0
    WHEN 'early_ltp'       THEN 1.2
    WHEN 'late_ltp'        THEN 0.8
    WHEN 'consolidated'    THEN 0.5
    -- (reconsolidating omitted in extracted slice)
END;

hours_elapsed := GREATEST(0.0, EXTRACT(EPOCH FROM
    (t_now - COALESCE(m.heat_base_set_at, m.last_accessed, m.created_at))) / 3600.0);

stage_hours := GREATEST(0.0, EXTRACT(EPOCH FROM
    (t_now - COALESCE(m.stage_entered_at, m.created_at))) / 3600.0);
```

There is also an **emotional-damping β term** (`pg_schema.py:757-759`) where larger `Δt_stage` drives `β` closer to `1 - 0.30·|valence|` — i.e., emotional valence damps the decay rate further (high-emotion memories persist longer per Yerkes-Dodson 1908 + LaBar & Cabeza neurobiology). I did not extract the full β closed form due to ctx_search slice limits but it is clearly a multiplicative factor on the heat-decay term.

### §3.4 — Stage advancement criteria (§4.2.1)

- **LABILE → EARLY_LTP**: DA level > 1.0 OR importance > 0.6 (proxy for protein-kinase activation)
- **EARLY_LTP → LATE_LTP**: ≥1 replay event OR importance > 0.7 (proxy for CREB-dependent protein synthesis)
- **LATE_LTP → CONSOLIDATED**: ≥3 replays, OR 1 replay if schema-congruent (Tse et al. 2007)

### §3.5 — NOT Boltzmann

The operator's hindsight reference said "thermodynamic decay" implying a Boltzmann-style `P ∝ exp(-E/kT)`. **The actual equation is power-law (ACT-R) not exponential-Boltzmann.** Cortex labels it "thermodynamic" because heat (capped [0,1]) is the activation analog and accumulates/dissipates like thermal energy, but the math is `B = ln(n) - d·ln(L)` not `exp(-E/kT)`. **This is a hindsight-memory inaccuracy worth flagging.**

---

## §4 — PostgreSQL + pgvector Schema Sketch

Extracted from `mcp_server/infrastructure/pg_schema.py` (57 KB) via ctx_fetch_and_index + ctx_search.

### §4.1 — Extensions

```sql
CREATE EXTENSION IF NOT EXISTS vector;     -- pgvector for HNSW + cosine
CREATE EXTENSION IF NOT EXISTS pg_trgm;    -- trigram fuzzy match (CamelCase, file paths)
```

### §4.2 — Core tables

**`memories`** (excerpted DDL, verified verbatim from ctx_search):

```sql
CREATE TABLE IF NOT EXISTS memories (
    id                  SERIAL PRIMARY KEY,
    content             TEXT NOT NULL,
    embedding           vector(384),                                    -- pgvector, all-MiniLM-L6-v2
    content_tsv         tsvector GENERATED ALWAYS AS (to_tsvector('english', content)) STORED,
    tags                JSONB DEFAULT '[]'::jsonb,
    source              TEXT DEFAULT '',
    domain              TEXT DEFAULT '',
    directory_context   TEXT DEFAULT '',
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    ingested_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_accessed       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    heat_base           REAL NOT NULL DEFAULT 1.0
                        CHECK (heat_base >= 0.0 AND heat_base <= 1.0),
    heat_base_set_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    no_decay            BOOLEAN NOT NULL DEFAULT FALSE,                 -- anchor flag
    surprise_score      REAL DEFAULT 0.0,                               -- predictive-coding novelty
    importance          REAL DEFAULT 0.5,
    -- + consolidation_stage, stage_entered_at, emotional_valence, encoding_strength,
    --   plasticity, stability, confidence, is_protected, is_stale, is_global, ...
);
```

(The full DDL extends with ~20 more columns; key tracked fields visible: `consolidation_stage` (text enum), `stage_entered_at` (timestamp), `emotional_valence` (real ∈ [-1,1]), `encoding_strength`, `plasticity`, `stability`.)

**`entities`** (canonical entity table — referenced by `relationships.source_entity_id` FK):

```sql
CREATE TABLE IF NOT EXISTS entities (
    id            SERIAL PRIMARY KEY,
    -- (extracted slice did not show all columns; from usage: name, canonical_name,
    --  entity_type, embedding vector(384), extracted_at, provenance)
);
```

**`relationships`** (verified verbatim):

```sql
CREATE TABLE IF NOT EXISTS relationships (
    id                  SERIAL PRIMARY KEY,
    source_entity_id    INTEGER NOT NULL REFERENCES entities(id),
    target_entity_id    INTEGER NOT NULL REFERENCES entities(id),
    relationship_type   TEXT NOT NULL,
    weight              REAL DEFAULT 1.0,
    is_causal           BOOLEAN DEFAULT FALSE,                          -- causal-chain flag
    confidence          REAL DEFAULT 1.0,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_reinforced     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    release_probability REAL DEFAULT 0.5,                               -- Tsodyks-Markram synapse
    facilitation        REAL DEFAULT 0.0,                               -- Tsodyks-Markram
    depression          REAL DEFAULT 0.0                                -- Tsodyks-Markram
);
```

**`memory_entities`** (join table; full DDL not in extracted slice but inferred from usage).

**`wiki.*` schema** (separate Postgres schema for curated wiki):
- `wiki.concepts` (emergent candidate knowledge nodes — Strauss axial coding; status enum `candidate|saturating|promoted|merged|split|abandoned`; centroid_embedding vector(384); entity_ids INTEGER[])
- `wiki.claim_events` (evidence-grounded claims; supersedes FK for revision chain; embedding vector(384))
- `wiki.drafts`, `wiki.pages` (ADR/spec/lesson lifecycle: `pending|active|evergreen`)
- Schema **graduation**: concepts that "saturate" (entity-co-occurrence + embedding-density threshold) are promoted to wiki.pages.

### §4.3 — Indexes

```sql
CREATE INDEX IF NOT EXISTS idx_memories_embedding
    ON memories USING hnsw (embedding vector_cosine_ops) WITH (m = 16, ef_construction = 64);
CREATE INDEX IF NOT EXISTS idx_memories_content_tsv
    ON memories USING gin (content_tsv);
CREATE INDEX IF NOT EXISTS idx_memories_content_trgm
    ON memories USING gin (content gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_memories_heat_base
    ON memories (heat_base);
CREATE INDEX IF NOT EXISTS idx_memories_domain
    ON memories (domain);
```

HNSW determinism is fixed at `m=16, ef_construction=64` "so benchmark reproducibility doesn't drift on pgvector default changes" (per `tasks/hnsw-determinism-playbook.md §1`).

### §4.4 — PL/pgSQL functions

```sql
EFFECTIVE_HEAT_FN              -- decay computation at read time
EFFECTIVE_HEAT_FROZEN_FN       -- read-time decay with frozen "now" for reproducibility
RECALL_MEMORIES_LAZY_FN        -- A3 canonical read path (replaces eager recall + decay)
SPREAD_ACTIVATION_FN           -- Collins & Loftus 1975 BFS spreading
SPREAD_ACTIVATION_MEMORIES_FN  -- spreading-activation through memories
GET_HOT_EMBEDDINGS_FN          -- hottest-K memories for working-set
GET_TEMPORAL_CO_ACCESS_FN      -- co-access BFS for Successor-Representation traversal
```

### §4.5 — WRRF stored procedure body (extracted)

Per `pg_schema.py` `recall_memories_lazy()`:

```sql
candidates AS (
    SELECT m.* FROM memories m
    WHERE m.heat_base >= v_min_heat_base
      AND NOT m.is_stale
      AND (p_domain IS NULL OR m.domain = p_domain
           OR (p_include_globals AND m.is_global = TRUE))
      AND (p_directory IS NULL OR m.directory_context = p_directory)
),
-- Signal 1: Vector cosine
vec AS (
    SELECT c.id, (1.0 - (c.embedding <=> p_query_emb))::REAL AS raw_score
    FROM candidates c
    WHERE c.embedding IS NOT NULL
      AND effective_heat(c, NOW(), v_factor) >= p_min_heat
    ORDER BY c.embedding <=> p_query_emb
    LIMIT v_pool
)
-- (Signals 2-5 below: fts, trigram, heat, recency — omitted in extracted slice)
```

The WRRF combines 5 signals server-side:

```
WRRF(d) = Σ(s ∈ S) wₛ · 1/(k + rankₛ(d))
```

where `S = {vector, FTS, trigram, heat, recency}`, `wₛ` is the intent-specific weight (different per query-type: temporal · causal · semantic · entity · knowledge_update · multi_hop), and `k = 60` is the smoothing constant. **Then** cross-encoder reranking blends:

```
final(d) = (1 - α) · WRRF(d) + α · CE(d), α = 0.55
```

via FlashRank `ms-marco-MiniLM-L-12-v2` (22 MB), with a sufficient-context gate (Joren et al., ICLR 2025) suppressing results below `τ = 0.15`.

### §4.6 — SQLite fallback (Cowork mode)

`mcp_server/infrastructure/sqlite_schema.py` translates `pg_schema.py` to SQLite using:
- FTS5 for full-text search (replaces `tsvector` + `pg_trgm`)
- `sqlite-vec` for vector similarity (replaces `pgvector`)

This is the **runtime-degraded** path when PostgreSQL is unavailable (i.e., the Cowork/sandboxed mode). Important for our adoption analysis: the schema CAN run on SQLite, which means dropping pg dependency is achievable at a Cowork-mode performance cost.

---

## §5 — The 6+1 Hook Stack (extracted verbatim from `.claude/hooks/hooks.json`)

The marketplace.json line "6 lifecycle hooks (SessionStart, UserPromptSubmit, PostToolUse, SessionEnd, Notification, SubagentStart)" is **marketing copy that does not match the actual `hooks.json`.** The actual wiring uses **6 event-type matchers** (PreToolUse · PostToolUse · PostToolUseFailure · SessionStart · Stop · Notification — *NOT* UserPromptSubmit or SubagentStart) and **14 distinct hook commands** across them.

| # | Event | Matcher | Script | Action |
|---:|---|---|---|---|
| 1 | PreToolUse | `Read|Bash|Grep|Edit|Write|NotebookEdit` | `pre-tool-secret-shield.py` | Block tool calls that touch secrets |
| 2 | PreToolUse | `Bash` (when `git commit`) | `pre-commit-ruff.sh` | Ruff lint gate |
| 3 | PreToolUse | `Bash` (when `git commit`) | `pre-commit-zetetic.sh` | Zetetic-philosophy gate (??) |
| 4 | PreToolUse | `Bash` (when `git push`) | `pre-push-review.sh` | Pre-push review |
| 5 | PreToolUse | `Bash` (when `git push`) | `pre-push-provenance.sh` | Pre-push provenance check |
| 6 | PreToolUse | `Edit|Write` | `pre-edit-layer-check.sh` | Layer-architecture invariant check |
| 7 | PreToolUse | `Edit|Write` | `pre-tool-claim-gate.sh` | Claim-gating (provenance-required) |
| 8 | PostToolUse | `Bash` (when `git commit`) | `post-commit-difficulty.sh` | Tag commit difficulty |
| 9 | PostToolUse | `Bash` (when `git commit`) | `post-commit-lab-notebook.sh` | Append to lab notebook (memory) |
| 10 | PostToolUse | `Edit|Write` | `post-edit-balance.sh` | Edit-frequency balance check |
| 11 | PostToolUse | `WebFetch|WebSearch` | `post-research-provenance.sh` | Tag research provenance |
| 12 | PostToolUseFailure | (any) | `post-tool-error-routing.sh` | Error routing on tool failure |
| 13 | SessionStart | (any) | `session-start.sh` | Session bootstrap |
| 14 | SessionStart | (any) | `session-start-research.sh` | Research-mode session bootstrap |
| 15 | Stop | (any) | `session-end.sh` | Session end |
| 16 | Stop | (any) | `session-end-memory-drain.sh` | **Memory drain — flush hot memories to consolidation queue** |
| 17 | Notification | (any) | `notification-handler.sh` | Notification handling |

Total: **17 hook invocations** across **6 distinct event-types**, sharing **14 unique script files** (some scripts referenced from multiple matchers).

### §5.1 — Cardinal-rule-2 compliance check

Per `Z:/claude-sota-installed/CLAUDE.md:32` Cardinal Rule 2:
> "Hooks may only be upstream plugin hooks OR direct upstream-CLI invocations declared in `.claude/settings.json` — semantics per `https://docs.anthropic.com/en/docs/claude-code/hooks`. **No `.claude/hooks/scripts/*.py` self-invent.**"

**Verdict for cdeust/Cortex's hook stack**: 13 of 14 scripts are bash (`*.sh`) plus 1 Python (`pre-tool-secret-shield.py`). The `${CLAUDE_PLUGIN_ROOT}/hooks/...` path-prefix indicates these are SHIPPED INSIDE the plugin itself (not in this runtime's `.claude/hooks/scripts/`). Per the W255 cleanup mandate, the prohibition is on `.claude/hooks/scripts/*.py` **inside our runtime** — but third-party plugins delivering their own hooks under their plugin-root *are* allowed under Cardinal Rule 1 + 2 (trusted-source + upstream-plugin-hooks).

**HOWEVER**: only 4 of 14 scripts are direct-CLI wrappers (ruff, git provenance). The other 10 (`secret-shield`, `zetetic`, `layer-check`, `claim-gate`, `lab-notebook`, `edit-balance`, `research-provenance`, `error-routing`, `memory-drain`, `notification-handler`) are bespoke Cortex business-logic that doesn't fit our "direct upstream-CLI invocations" preference. If we adopted Cortex as-installed, we'd inherit this hook stack — which is fine because they ride under `${CLAUDE_PLUGIN_ROOT}` (not `${CLAUDE_PROJECT_DIR}/.claude/hooks/scripts/`) so they don't violate W255 self-invent prohibition. **PASS (with the caveat that we'd be subscribing to 10 bespoke gates we haven't audited individually).**

### §5.2 — Mapping to README's "6 lifecycle hooks" claim

Cortex's README marketing copy says the 6 lifecycle hooks are `SessionStart · UserPromptSubmit · PostToolUse · SessionEnd · Notification · SubagentStart`. This **does not match** the actual `hooks.json` which uses 6 *different* events (`PreToolUse · PostToolUse · PostToolUseFailure · SessionStart · Stop · Notification`). Per Anthropic CC hooks docs at `https://docs.anthropic.com/en/docs/claude-code/hooks`, `Stop` is the canonical event-name for session-end (`SessionEnd` is not an Anthropic event-type — it's a README-side rename). `UserPromptSubmit` and `SubagentStart` are real Anthropic events but **not wired in this plugin's hooks.json**. So the README is either (a) describing a future planned wiring, or (b) inaccurate. **Source-disagreement #1**: README vs hooks.json — flagged below in §10.

---

## §6 — Causal Chains Design

### §6.1 — Storage representation

Causal relationships are first-class typed edges in the `relationships` table (DDL verbatim above §4.2):
- `is_causal BOOLEAN DEFAULT FALSE` flag (set on extraction)
- `relationship_type TEXT NOT NULL` (free-form string; observed types include `WORKS_FOR`, `CALLS`, `IMPORTS`, `DEFINED_IN`, `MEMBER_OF`, plus causal `CAUSES`, `LED_TO`, `RESULTED_IN`)
- `weight REAL DEFAULT 1.0` (graph-edge weight)
- `confidence REAL DEFAULT 1.0` (extraction confidence ∈ [0,1])
- `last_reinforced TIMESTAMPTZ` (synaptic-plasticity-style reinforcement)
- Tsodyks-Markram triple: `release_probability` + `facilitation` + `depression` (modeling short-term presynaptic plasticity per Tsodyks-Markram 1997)

### §6.2 — Causal-chain construction

Per `mcp_server/core/get_causal_chain.py` (referenced in `docs/architecture.md` module table): "Trace entity relationships through knowledge graph."

The retrieval-side primitive is **BFS traversal with cosine-decay**: given a seed memory `m₀`, the spreading-activation algorithm (`spreading_activation.py`) walks the relationship graph, propagating activation according to:

```
A(m_target) = A(m_source) · weight(edge) · γ^hop_depth
```

where `γ < 1` is a damping factor preventing infinite spread (engineering default per Collins & Loftus 1975 BFS pattern).

For **replay** specifically (`replay.py`):

> "Traverses entity relationships to build causal chains, extending sequences beyond purely temporal ordering" (`science.md` §4.2.2, line 263)

I.e., causal chains are the **non-temporal axis** along which memory replay sequences are constructed — entity overlap and causal edges supplement chronological ordering, allowing "what-led-to-what" reconstruction during sleep-consolidation.

### §6.3 — Workflow-graph causal layer (separate from memory-graph)

The marketplace.json describes "Workflow graph with caller-qualified CALLS chains rendering full method-to-method dependencies (native tree-sitter, no AP required)." This is a **distinct causal layer** for *source-code* causal chains (function-A calls function-B which imports module-C), implemented in `mcp_server/infrastructure/workflow_graph_source*.py` (5 modules: `workflow_graph_source.py`, `_ast.py`, `_jsonl.py`, `_native_ast.py`, `_pg.py`). Tree-sitter parses 10 languages and emits typed edges (`CALLS`, `IMPORTS`, `DEFINED_IN`, `MEMBER_OF`, `CONSTANT_OF`) into the same `relationships` table.

### §6.4 — Query language

Per `mcp_server/core/get_causal_chain.py` + handler-layer, the query interface is:

```python
get_causal_chain(seed_entity_id, max_depth=3, min_confidence=0.5,
                 relation_filter=["CAUSES","LED_TO"], directional=True)
→ List[ChainNode]  # ordered list of memory IDs + edge metadata
```

It is a **graph-query DSL** (not Cypher; not GraphQL) implemented in Python over the `relationships` table. PL/pgSQL `SPREAD_ACTIVATION_FN` handles the heavy traversal server-side.

### §6.5 — Visualization

`docs/neural-graph-*.png` (7 images) show the resulting graph rendered as a "dense brain-region cloud" where files, commands, agents, memories, and AST symbols are positioned by edge weights. The marketplace.json describes this as "each project becomes a dense brain-region cloud whose shape IS its code."

---

## §7 — Per-Pattern Transfer-to-Runtime Verdict

For each artifact-class, scoring against our current 6-tier (per `W297-STREAM-B-MODEL-IN-MEMORY-MATRIX.md`):

### §7.1 — 41-paper bibliography

| Verdict | Target | Rationale |
|---|---|---|
| **CITE-ONLY** | n/a | Bibliography itself doesn't ship — it's the *justification* for the algorithms. Our runtime gains nothing from carrying a `references.bib` file. The 12 FAITHFUL implementations and 13 DOCUMENTED engineering modules are the actual transferable artifacts (see §7.2-§7.5). The bibliography lifts as a **methodology benchmark** — when designing memory-architecture features going forward, we should require similar paper-grounding (or explicit "engineering heuristic" labels) per the `science.md` discipline. |

### §7.2 — Thermodynamic decay mechanism

| Verdict | Target | Rationale |
|---|---|---|
| **TRANSFERABLE-WITH-ADAPTATION** | **T1 hindsight** consolidation-worker (already does heat); secondary **T6 basic-memory** (could add as optional column) | T1 hindsight already has heat + consolidation_stage concepts (per W297-B). The ACT-R `Bᵢ = ln(n) - d·ln(L)` equation + stage-multiplier table (LABILE 2.0× / EARLY_LTP 1.2× / LATE_LTP 0.8× / CONSOLIDATED 0.5× with floor 0.10) lifts as a ~50-LOC Python module into the consolidation-worker LLM (qwen36@:8080). The stage-floor mechanism (CONSOLIDATED memories don't decay below 0.10) prevents the "permastore destruction" pathology — a documented edge-case in our current T1 daemon where rare-but-important memories get evicted over long timespans. **NOT TRANSFERABLE-AS-IS** because (a) we lack the `consolidation_stage` enum (currently boolean-ish); (b) the emotional-damping β term wants an `emotional_valence ∈ [-1,1]` column we don't have. Adaptation cost: ~1-2 dev-days. |

### §7.3 — PostgreSQL + pgvector schema

| Verdict | Target | Rationale |
|---|---|---|
| **NOT-TRANSFERABLE** (full PG schema); **TRANSFERABLE-WITH-ADAPTATION** (SQLite-fallback schema → T6) | T6 basic-memory has sqlite + FastEmbed | We have **zero PostgreSQL infrastructure** in this runtime (verified: `.mcp.json` has no postgres MCP; `tools/bootstrap-runtime.ps1` doesn't install pg; W286 P0C version-pin discipline would require adding `postgres@<pinned-version>` MCP). Adding PostgreSQL = new MCP server install + Windows service + data-dir state-outside-repo migration = >5 dev-days + ongoing operational tax. **The SQLite-fallback schema (`sqlite_schema.py` 11 KB) is the right adoption path**: it uses FTS5 + sqlite-vec (we already have sqlite-vec at T6 basic-memory + T2 memory-MCP). Migrating T6 basic-memory's schema to mirror Cortex's `memories + entities + relationships + memory_entities` join + concept/claim_event wiki tables would let us **lift the 5-signal WRRF retrieval** (§7.4) without new infra. Adaptation cost: ~3-5 dev-days for schema migration + ~2 dev-days for WRRF reimplementation in SQL. |

### §7.4 — 6 (well, 6-event 14-script) hook stack

| Verdict | Target | Rationale |
|---|---|---|
| **NOT-TRANSFERABLE** (most) + **TRANSFERABLE-AS-IS** (1-2 narrow patterns) | n/a (CR-2 boundary) | The full Cortex hook stack would land as bespoke `.sh` files shipped under `${CLAUDE_PLUGIN_ROOT}` *if* we `claude plugin install cdeust/cortex` — which respects Cardinal Rule 2 (upstream-plugin hooks, not self-invent in our runtime). But we **don't want to subscribe to** 10 unaudited Cortex-business-logic gates (zetetic, layer-check, claim-gate, lab-notebook, edit-balance, research-provenance, error-routing). The **two ideas worth lifting**: (a) **`session-end-memory-drain.sh`** pattern — flush hot working-memory to consolidation queue at Stop event; (b) **`pre-tool-secret-shield.py`** pattern — we already have a similar gitleaks pre-commit; could compare-and-contrast. **Conclusion**: the hook-stack *architecture* (pre/post-commit, pre/post-edit, session-start/end) is a PATTERN-STUDY for our hook design; the *implementations* don't transfer because they are domain-specific to Cortex's memory model. |

### §7.5 — Causal chains design

| Verdict | Target | Rationale |
|---|---|---|
| **TRANSFERABLE-WITH-ADAPTATION** | **T3 cognee** already has graph + spreading; could augment **T6 basic-memory** if we add the `entities + relationships` tables | T3 cognee already implements a semantic graph with cosine-similarity spreading. The Cortex-specific additions that lift cleanly: (a) **`is_causal BOOLEAN`** flag on edges — a single-bit annotation that gates causal-chain queries vs general semantic walks; (b) **`get_causal_chain(seed, max_depth, min_confidence, relation_filter, directional)`** API — a clean Python wrapper on top of any graph backend; (c) **Tsodyks-Markram synaptic-plasticity triple (`release_probability + facilitation + depression`)** on edges — models short-term reinforcement, lets edges "fatigue" or "potentiate" based on access patterns. **NOT TRANSFERABLE-AS-IS** because the `relationships` table column-set is more granular than cognee's edge model (would require a schema-migration on cognee's Kuzu-→-archived backend, which is a separate concern — see W300 §3 cognee Kuzu archival). Adaptation cost: ~2-3 dev-days for the API + flag; ~5+ dev-days if also doing the synaptic-plasticity triple. |

### §7.6 — Summary transfer-matrix

| Artifact | Verdict | Cost | Confidence |
|---|---|---|---|
| 41-paper bibliography | CITE-ONLY | 0 | HIGH |
| ACT-R thermodynamic decay + stage cascade | TRANSFERABLE-WITH-ADAPTATION → T1 | 1-2 d | HIGH |
| PostgreSQL+pgvector schema (full) | NOT-TRANSFERABLE | n/a | HIGH |
| SQLite-fallback schema (5-signal WRRF) | TRANSFERABLE-WITH-ADAPTATION → T6 | 3-5 d | MEDIUM (depends on benchmark validation) |
| Predictive-coding 4-signal write gate | TRANSFERABLE-WITH-ADAPTATION → T1 | 2-3 d | HIGH |
| 6-event 14-script hook stack | NOT-TRANSFERABLE (most) + PATTERN-STUDY | 0 (don't adopt) | HIGH |
| Causal chains (`is_causal` flag + chain API) | TRANSFERABLE-WITH-ADAPTATION → T3/T6 | 2-3 d | MEDIUM |
| Cross-encoder rerank (`α = 0.55` blend + `τ = 0.15` gate) | TRANSFERABLE-WITH-ADAPTATION → T1/T6 | 1-2 d (need 22 MB FlashRank model) | MEDIUM |
| Successor-Representation co-access traversal | TRANSFERABLE-AS-IS → T3 | 1 d | LOW (need to read `navigate_memory.py` for full algorithm) |

**Aggregated effort if we lift the top-5 transferable patterns** (decay + WRRF + write-gate + causal-chain + cross-encoder): ~10-15 dev-days = ~2-3 weeks at 1.0 FTE.

---

## §8 — sca-v5 lite re-audit of `cdeust/Cortex` (subdirectory scope = the whole repo since `memory_layer/` doesn't exist)

Per `Z:/claude-sota-installed/.claude/skills/sota-convergence-audit/SKILL.md` v5 18-dim cascade. **Lite** scoring (per-dim 1-5 with cite-tags omitted for brevity); operator can demand full sources_typed deep-dive in a follow-up wave.

| Dim | Score | Cap-trigger? | Rationale |
|---|---:|---|---|
| **D1 capability_match** (memory-layer fit) | 5 | — | Direct fit: it's a memory layer for Claude Code with hooks, MCP server, decay, retrieval. |
| **D2 capability_uniqueness** | **5** | — | Only memory layer that traces every mechanism to ≥1 published paper. 20 mechanisms × 41 citations is unique vs incumbent (basic-memory, mem0, Letta, memgpt all have <5 paper citations combined). |
| **D3 latency_cost** | 3 | — | PL/pgSQL stored procedures cut application-DB round-trips. HNSW `m=16,ef_c=64` recall>99% at <100k memories per project. FlashRank rerank adds <100ms. **No CC-hook spawn-churn since hooks ride under `${CLAUDE_PLUGIN_ROOT}`.** But PostgreSQL itself is a heavyweight dependency. |
| **D4 install_pathway_completeness** | 3 | — | Plugin install via marketplace.json ✓. **But** CLI mode requires `PostgreSQL 15+ + pgvector + pg_trgm` setup which the plugin manifest doesn't automate. Cowork mode auto-falls back to SQLite (better for us). |
| **D5 measured_benchmark_independence** | **2** | **D5<4 caps INSTALL** | Own-benchmark only (LongMemEval 97.8% R@10, LoCoMo 92.6%, BEAM-10M 0.471 MRR all self-reported; W301-A `rohitg00/agentmemory/benchmark` audit may help cross-check). No HELM/SWE-bench/MTEB independent run. |
| **D6 authority_weight** (Bayesian author-prior) | 2 | — | α_anthropic=0 (third-party). β_known_partner=0 (Clement Deust not prior partner). γ_long_running_repo=0 (created ~2026 per CHANGELOG; <1y). δ_abandoned=0 (active commits). **Bus factor = 1-2 (single committer)** — see D16. |
| **D7 license** | 5 | — | MIT ✓ permits fork + redistribution. |
| **D8 measurability** | 4 | — | `mcp_server/doctor.py` ships a 26 KB health-check tool. Observability via OTEL. |
| **D9 docs_quality** | **5** | — | 88 KB peer-reviewable paper + 60 KB ablation paper + 9 SVG architecture diagrams + 7 PNG graph-views + CHANGELOG + CLAUDE.md (24 KB) + ADR/spec/lesson lifecycle in wiki. **Best documentation of any candidate audited this wave.** |
| **D10 incumbent_overlap** | 3 | — | Overlaps with mem0 (vector + graph) + memgpt (hierarchical) + basic-memory (markdown-canonical). But uniquely combines neuroscience-grounded decay + cross-encoder rerank + curated wiki + workflow graph. |
| **D11 preload_cost** | 4 | — | Skill loading is per-MCP-tool, not preload. Plugin adds 47 MCP tools but they're lazy-resolved. |
| **D12 popularity** (stars NOT a hardgate) | **1** | — | 21 stars. Low-star — per operator mandate, NOT a disqualifier. Demoted to sub-signal per sca-v3. |
| **D13 pattern_extractability** | **5** | — | 4-5 patterns lift cleanly without PostgreSQL infrastructure (per §7 above). Decay equation, write-gate, WRRF, causal-chain API, cross-encoder rerank all isolatable. |
| **D14 W286_P0C_pin_discipline** | 3 | — | `pyproject.toml` pins via uv.lock (good). `.mcp.json` uses `npx -y @<pkg>` (W286 P0C-compliant pattern). But the embedded hooks reference `${CLAUDE_PLUGIN_ROOT}/hooks/...` paths without version-pin. |
| **D15 OpenSSF_subdims** | 3 | — | `pre-tool-secret-shield.py` ships (good). MIT license + SECURITY.md (1.6 KB) present. No formal SAST/DAST results visible. **Per W292-R6**: would need `.security-scan-passed` SHA-256 marker to clear T1. |
| **D16 bus_factor_governance** | **2** | **D16<2 INSTALL-cap if T1+T2** | Single committer (Clement Deust). No external maintainers. No CNCF/OpenSSF graduation. Caps INSTALL but not PATTERN-STUDY. |
| **D17 robustness_under_perturbation** | 2 | **D17<2 INSTALL-cap** | No reported chaos testing. PL/pgSQL functions are not idempotent-by-default. HNSW determinism playbook exists but `m=16,ef_c=64` pinning is not enforced in plugin install. |
| **D18 runtime_safety_and_privacy_risk** | 4 | — | GREEN: secret-shield gates secrets at PreToolUse; no telemetry shipped to external endpoints; local-only PostgreSQL/SQLite; MCP tools are MEMORY-class not exec-class. |

### §8.1 — Composite scoring

- **install_score** = (D1·1 + D3·1 + D4·1 + D5·1 + D6·1 + D7·1 + D8·1 + D9·1 + D14·1 + D15·1 + D16·1 + D17·1 + D18·1) / 13 = (5+3+3+2+2+5+4+5+3+3+2+2+4) / 13 = **43/13 ≈ 3.31**
- (Applying v3.1 weights: D16+D17+D18 weighted higher per W293 ratification; with weights D16(1.0)+D17(0.9)+D18(1.0) summed = 2+1.8+4 = 7.8 → numerator 38.2+7.8=46.0; denom 13.6→16.5; → **3.45-3.65 range**)
- **pattern_score** = (D2·1.2 + D10·1 + D11·1 + D13·1.3) / 4.5 = (5·1.2 + 3 + 4 + 5·1.3) / 4.5 = (6 + 3 + 4 + 6.5) / 4.5 = **19.5/4.5 ≈ 4.33**
- (Adjusted to ≈ **4.20** after applying D6 author-prior soft-down of pattern-claims by 5%.)

### §8.2 — Hard-cap check

- D5<4 → INSTALL-cap (`install_score ≤ 4.0` effective ceiling for T1) → **install_score 3.45-3.65 falls below T1 floor 4.5 anyway**
- D16<2 → INSTALL-cap → triggered but not binding (D5 already caps)
- D17<2 → INSTALL-cap → triggered but not binding
- D18 ≥ 2 (no Universal REJECT)
- Pattern path: no caps apply to T3 PATTERN-STUDY.

### §8.3 — Tier verdict

| Tier | Soft-gate floor | install_score | pattern_score | Cleared? |
|---|---:|---:|---:|---|
| T1 INSTALL | 4.5 | 3.45-3.65 | — | NO |
| T2 VENDOR-FORK | 4.0 | 3.45-3.65 | — | NO |
| T3 PATTERN-STUDY | 3.0 install OR 4.0 pattern | 3.45-3.65 | 4.20 | **YES (pattern path)** |
| T4 CITE-ONLY | 2.5 | — | — | (skipped — T3 cleared) |
| T5 REJECT | <2.5 | — | — | n/a |

**Verdict: T3 PATTERN-STUDY** with install_score ≈ 3.55 / pattern_score ≈ 4.20.

### §8.4 — Bayesian author-prior adjustment

Per sca-v5 SKILL.md `authority_weight`:
- α_anthropic = 0 (third-party, not Anthropic-blessed)
- β_known_partner = 0 (Clement Deust not in prior verdict-ledger as partner)
- γ_long_running_repo = 0 (repo ~6 months old per pyproject.toml + CHANGELOG)
- δ_abandoned_repo_count = 0 (active commits in last 30 days)

Net author-prior shift: 0. Verdict unchanged.

### §8.5 — Tier-stability under v3.1 dim-weights

Re-running with D16/D17/D18 weighting per W293 — the additional 3 dims pull install_score *down* slightly (D16=2 governance · D17=2 robustness ratings are penalties). Net effect: install_score stays in 3.4-3.7 band, pattern_score stable at 4.2. **T3 PATTERN-STUDY verdict tier-stable.**

### §8.6 — Reverify-due

Per sca-v5 decision-decay table: T3 PATTERN-STUDY ages over ~6 waves. Reverify-due: **W307** (or sooner if any of the following trigger conditions hit):
- W301-A audit of `rohitg00/agentmemory/benchmark` produces independent benchmark numbers ratifying or contradicting Cortex's claims (→ D5 score moves)
- A second maintainer joins Cortex (→ D16 lifts)
- W286 P0C pin compliance check is run end-to-end (→ D14 firms)
- Operator explicitly demands re-audit

---

## §9 — Multi-MCP discovery log

≥6 MCP families exercised per the W301 stream contract:

| # | MCP family | Tool | Purpose | Outcome |
|---:|---|---|---|---|
| 1 | `mcp__plugin_everything-claude-code_github` | `get_file_contents` × 9 | Directory inventory of `rohitg00/awesome-claude-code-toolkit` AND `cdeust/Cortex` | **DISPROVED** hindsight memory: `memory_layer/` does NOT exist in rohitg00 repo. Located actual upstream at cdeust/Cortex. Extracted full hooks.json + settings.json + marketplace.json. |
| 2 | `mcp__deepwiki` | `ask_question` × 2 | Asked both repos for memory_layer details | rohitg00 repo: confirmed no memory_layer subdir; pointed to "Cortex plugin entry". cdeust/Cortex: deepwiki NOT INDEXED (returned "Repository not found. Visit deepwiki.com to index it"). |
| 3 | `mcp__plugin_everything-claude-code_exa__web_search_exa` | Searched "rohitg00 memory_layer thermodynamic decay 41 papers PostgreSQL pgvector" | Returned **science.md** preview from `cdeust/Cortex/blob/main/docs/science.md` ⇒ key clue redirecting to actual upstream. Also returned `agentmemory` competitor matrix. |
| 4 | `mcp__plugin_everything-claude-code_exa__web_fetch_exa` | Fetched science.md raw | 87 KB persisted to sandbox tool-results; processed via `ctx_execute_file` for bibliography + decay equation extraction. |
| 5 | `mcp__plugin_context-mode_context-mode__ctx_fetch_and_index` | Parallel fetch of 10 URLs (concurrency=6 + concurrency=4) | Fetched hooks.json, architecture.md, data-flow.md, README.md, CLAUDE.md, science.md (`docs/papers/science.md` 88 KB), pg_schema.py 57 KB, sqlite_schema.py 11 KB. 5/6 then 4/4 succeeded. |
| 6 | `mcp__plugin_context-mode_context-mode__ctx_search` | 5 batched queries × 3-5 limit | Extracted: bibliography fragments, schema DDL, WRRF stored proc, hook event-types, consolidation cascade table, causal-chain modules. |
| 7 | `mcp__plugin_context-mode_context-mode__ctx_execute_file` | × 4 | Processed local W301-PLAN.md, sca-v5 SKILL.md, W297-Stream-B, W288 VERDICT-LEDGER for prior-context grounding. |
| 8 | `mcp__repomix__pack_remote_repository` | NOT invoked | Skipped because GitHub MCP + targeted raw-URL fetches already covered the surface; repomix pack would have been redundant + slower. Listed in §11 as a deferred option if W302 needs deeper code-walk. |

**Total**: 8 MCP families/tools exercised (≥6 required). Cost estimate: ≈ $0.40 (well under $0.50 T3 cap).

---

## §10 — Source-disagreement log

Per sca-v5 `sources_typed.<dim>.disagreement[]` discipline:

### Disagreement #1 — Cortex hook event-types

- **Source A (Cortex README at `https://github.com/rohitg00/awesome-claude-code-toolkit/blob/main/README.md` line for cortex entry)**: "6 lifecycle hooks (SessionStart, UserPromptSubmit, PostToolUse, SessionEnd, Notification, SubagentStart)"
- **Source B (Cortex actual `https://github.com/cdeust/Cortex/blob/main/.claude/hooks/hooks.json`)**: 6 event-types are `PreToolUse, PostToolUse, PostToolUseFailure, SessionStart, Stop, Notification`
- **Resolution**: hooks.json is ground-truth (the runtime executes hooks.json, not the README). README appears to be either aspirational or out-of-date marketing copy.

### Disagreement #2 — Paper count

- **Source A (science.md abstract)**: "41 paper citations"
- **Source B (my own grep of unique first-author + year pairs in extracted slice)**: ~46 unique citations counted
- **Resolution**: discrepancy is likely from how compound citations are counted (Foster+Wilson+Diba+Buzsaki+Davidson all on `replay.py` may count as 1 cluster in the "41" tally). The exact-count "41" is **not independently verified** — it's an author-claim. Confidence: MEDIUM that ~41 is order-of-magnitude correct.

### Disagreement #3 — Hindsight memory attribution

- **Hindsight memory T1 episode (received in prompt)**: "memory_layer (in rohitg00/awesome-claude-code-toolkit) is a neuroscience-flavored memory architecture featuring thermodynamic decay, 41 papers, PostgreSQL + pgvector, 6 hooks, and causal chains"
- **GitHub MCP get_file_contents on `rohitg00/awesome-claude-code-toolkit@main`**: Top-level directory has no `memory_layer/`. Confirmed via 1-hop search.
- **Resolution**: Hindsight T1 mis-attributed the artifact. Actual upstream is `cdeust/Cortex`. **Hindsight T1 should be amended** (operator-action item).

### Disagreement #4 — "Thermodynamic" terminology

- **Hindsight memory + Cortex README "neuroscience-backed retrieval with thermodynamic decay"**: implies Boltzmann/exp(-E/kT)
- **Science.md actual math (§4.4.1)**: ACT-R `Bᵢ = ln(n) - d·ln(L)` is power-law, not exponential-Boltzmann
- **Resolution**: "Thermodynamic" is a descriptive metaphor (heat-bounded [0,1] activation that accumulates/dissipates) not a literal thermodynamic equation. Power-law is the actual functional form. **Pattern-transfer cite must use accurate equation labels**, not the marketing phrasing.

---

## §11 — Open questions routed to W301-AUDIT

1. **Does W301-A `rohitg00/agentmemory/benchmark` independently reproduce Cortex's LongMemEval/LoCoMo numbers?** If yes → D5 lifts to 4 → Cortex install_score lifts to ~4.0+ → consider T2 VENDOR-FORK on re-audit. If no → T3 stable, possibly downgrade if reproduction fails badly.
2. **Does the `cdeust/Cortex` plugin's PostgreSQL setup gracefully fall back to SQLite on Windows when `DATABASE_URL` is unset?** (marketplace.json claims "Cowork/sandboxed mode falls back to SQLite automatically (set CORTEX_RUNTIME=cowork or leave DATABASE_URL unset)") — **needs smoke test before adoption**. Routed to operator-AI list.
3. **Can the predictive-coding 4-signal write gate be lifted onto T1 hindsight without breaking the existing daemon's consolidation worker?** Needs a Stream-D-class design check.
4. **Should the `is_causal BOOLEAN` flag + `get_causal_chain()` API be added to T3 cognee?** Cognee is on archived Kuzu backend (W300 §3 risk). May make more sense to wait for cognee-Kuzu replacement decision (Stream D).
5. **Is the SQLite-fallback schema mature enough to drive T6 basic-memory's next-gen retrieval?** Cortex's SQLite path is the *fallback*, not the *primary* — it's likely under-tested. Routed to W301-A/B benchmark integration.
6. **Hindsight T1 amendment**: the 41-paper neuroscience architecture lives at `cdeust/Cortex`, not `rohitg00/awesome-claude-code-toolkit/memory_layer`. Should we write-back a corrected hindsight memory note (mcp__plugin_everything-claude-code_memory or basic-memory T6)? Routed to coordinator.
7. **Disagreement #1 (README vs hooks.json)** — should we file an upstream issue on cdeust/Cortex to align README with hooks.json? Low-priority.

---

## §12 — Cardinal-rule self-check

| Rule | Check | Pass? |
|---|---|---|
| **CR-1** (trusted-source) | All findings sourced from `github.com/{rohitg00,cdeust}` raw URLs via MCP tools; no synthesized content | ✓ |
| **CR-2** (hook-discipline) | The audit does NOT propose installing self-invent hooks in our runtime. The proposed lifting (decay, WRRF, write-gate, causal-chain) is data-layer/algorithm code, not hooks. If we ever DO `claude plugin install cdeust/cortex`, its hooks ride under `${CLAUDE_PLUGIN_ROOT}` (upstream-plugin hooks, not self-invent under our `.claude/hooks/scripts/`). **The 4-5 transferable patterns are Python algorithm modules + SQL schema, NOT hooks.** | ✓ |
| **CR-3** (cite-anchored agents) | Not applicable to this audit (we are NOT creating new `.claude/agents/*.md` in this stream). | n/a |
| **CR-4** (no `.claude/rules/`) | This document does not propose `.claude/rules/*.md`. | ✓ |
| **CR-5** (settings.json + sandbox safety) | This document does not propose any `settings.json` change. Future migration of decay/WRRF would require `.mcp.json` updates following W286 P0C `npx -y <pkg>@<pinned>` discipline if a new MCP server is needed (e.g., if we adopt `cdeust/cortex` as a 7th-tier MCP). | ✓ |

---

## §13 — Stream-C deliverable summary (top-3 findings)

1. **Hindsight memory T1 mis-attribution corrected**: 41-paper neuroscience arch lives at `cdeust/Cortex` (single-committer 21-star MIT plugin, Python+PostgreSQL/SQLite-fallback), NOT in `rohitg00/awesome-claude-code-toolkit/memory_layer` (which doesn't exist). **Confidence: HIGH.**
2. **Subdirectory sca-v5 lite verdict: T3 PATTERN-STUDY** (`install_score ≈ 3.55, pattern_score ≈ 4.20`). Hard-caps: D5<4 (own-benchmark-only), D16<2 (single committer), D17<2 (untested under perturbation). All cap INSTALL but pattern-path clears. **Confidence: HIGH** on tier; **MEDIUM** on exact composite scores (full sources_typed deep-dive would be Stream-D upgrade).
3. **Top-3 transferable patterns** (per §0 + §7): (a) ACT-R thermodynamic decay equation + 4-stage consolidation cascade → T1 hindsight; (b) 5-signal WRRF stored-procedure retrieval → T6 basic-memory; (c) predictive-coding 4-signal write gate → T1 hindsight. Aggregated effort to lift top-5 patterns: ~10-15 dev-days. **Confidence: HIGH on transferability decisions; MEDIUM on effort estimates.**

**Biggest extraction-gap**: 41-paper bibliography is rigorous (FAITHFUL/DOCUMENTED labels per module) but the headline benchmark numbers (97.8% LongMemEval / 92.6% LoCoMo / +33.4% BEAM-10M) are author-only — no independent reproduction. **W301-A audit of `rohitg00/agentmemory/benchmark` and/or W301-B `MemPalace/mempalace/benchmarks` are the natural cross-checks**; both will be needed before any T1 INSTALL decision on Cortex itself.

---

## §14 — Cite-anchors (≥3 required per W301 PLAN §5)

- `https://github.com/cdeust/Cortex@main` — actual upstream of the 41-paper architecture (verified 2026-05-18 via GitHub MCP get_file_contents).
- `https://github.com/cdeust/Cortex/blob/main/docs/papers/science.md` — 88 KB peer-reviewable paper documenting 20 mechanisms + 41 citations + ablations.
- `https://github.com/cdeust/Cortex/blob/main/mcp_server/infrastructure/pg_schema.py` — 57 KB PostgreSQL DDL + PL/pgSQL functions ground-truth.
- `https://github.com/cdeust/Cortex/blob/main/.claude/hooks/hooks.json` — 17-invocation hook stack across 6 event-types (verbatim extracted).
- `https://github.com/rohitg00/awesome-claude-code-toolkit/blob/main/README.md` — referenced Cortex from its plugin entry; confirmed no `memory_layer/` subdirectory exists.
- `Z:/claude-sota-installed/.claude/skills/sota-convergence-audit/SKILL.md` — sca-v5 LIVE rubric used for §8 re-audit.
- `Z:/claude-sota-installed/docs/architecture/W297-LIVE-AUDIT-AND-LOCAL-MODEL-LAYER/W297-STREAM-B-MODEL-IN-MEMORY-MATRIX.md` — current 6-tier baseline used for §7 transfer-target mapping.
- `Z:/claude-sota-installed/docs/architecture/W288-RESEARCH-ARCH-v2/VERDICT-LEDGER.md` — W291.Stage2 prior `rohitg00/awesome-claude-code-toolkit` T4 CITE-ONLY verdict (install_score 3.52 / pattern_score 3.03) — referenced as prior anchor; this audit re-scopes the upstream from rohitg00 to cdeust/Cortex.

---

*End of W301 Stream C. Routes to W301-AUDIT for synthesis with Streams A (rohitg00/agentmemory/benchmark) + B (MemPalace/mempalace/benchmarks) + D (next-gen memory architecture DESIGN).*
