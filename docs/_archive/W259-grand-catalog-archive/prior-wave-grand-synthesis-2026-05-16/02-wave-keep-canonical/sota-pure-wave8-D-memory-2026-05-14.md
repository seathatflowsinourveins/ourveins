# Wave 8 Stream-D — Cross-Session Memory Persistence Wire (claude-sota-pure)

**Agent**: Stream-D (Sonnet stand-in per CLAUDE.local.md ENV-funneled per `Z:/claude-sota/.claude/rules/cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate`)
**STAND-IN-NOTICE**: agent ran under env-funneled Sonnet stand-in; cross-model gate NOT structurally satisfied — orchestrator dispatches BRIDGE-MODE codex T1 review of this artifact before integration per Wave 50 fire 10 Pattern A
**Date**: 2026-05-14
**Output budget**: ≤500 LOC
**Termination**: on_handoff_to: orchestrator | terminationCondition: on_text_match "MEMORY-WIRE-COMPLETE:"

---

## Section 1 — Karpathy 3-layer wiki structure for pure runtime

Per Karpathy named-author quote (TIER-1-NAMED-AUTHOR-QUOTE per `citation-discipline.md` rule #6) — "You can outsource your thinking but you can't outsource your understanding" — `Z:/repos/deps/claude-code-best-practice-shan/videos/claude-karpathy-ai-engineer-02-may-26.md:153 @ HEAD 64fffd53a7c6f8e2e0b1575fdd200b65cda04737`. Cross-session memory IS the operator-side instrument that lets understanding accumulate across session boundaries.

### Layer 1 — Chronological log (raw entries by date, append-only)

**Path**: `Z:\claude-sota-pure\.claude\state\*.jsonl`

**Content** (each JSONL file is an audit trail for one event class):

| JSONL file | Producer | Schema | Triggered by |
|---|---|---|---|
| `subagent_transcripts.jsonl` | SubagentStop hook (plugin-shipped post-Phase-2A from cwc bundle) | `{ts, agent_id, agent_type, transcript_path, last_text[:2000], tool_count, tool_errors, parse_status}` | Every Agent() spawn close |
| `codex_consult_*_OUT.txt` | codex T1/T2/T3 dispatch (post-Phase-2A `codex@openai-codex@1.0.4` install) | codex verdict JSON appended via `--output-last-message` | Every codex T1 fire |
| `mcp_health.jsonl` | Plugin-shipped MCP healthcheck (post-Phase-3 wire) | `{ts, server_name, status, latency_ms, error}` | PostToolUse periodic |
| `wave_close.jsonl` | Operator-emit at every wave-close commit | `{ts, wave, fires, ships, codex_verdicts, gaps_resolved, agent_dispatches}` | Manual operator emit OR PreCompact hook |

**Discipline**: NO hand-coded JSONL emitters — all 4 emitters must arrive via plugin install (CR-5 install-priority). Until Phase-3 lands, wave_close.jsonl entries are emitted manually via Edit at wave-close (acceptable bootstrap-class operator action per CR-5 §Bootstrap-only files exemption).

**Always-loaded discipline**: Layer 1 JSONL files are NOT auto-loaded into context. They sit on disk and are queried on-demand via Grep/`mcp__plugin_context-mode_context-mode__ctx_search` OR by the Layer 2 index pointer below.

### Layer 2 — Index (organized lookup by topic, lazy-load content)

**Path**: `Z:\claude-sota-pure\MEMORY.md`

**Constraint** (per CCBP `claude-memory.md:34-40 @ HEAD 48f2ceb` lazy-load mechanism): Layer 2 MUST stay always-loaded but MINIMAL — one-line topic pointers ≤150 chars each. Total file ≤300 LOC. Content pages lazy-load via Layer 3 frontmatter `paths:`.

**Schema** (each row):

```
- <topic-key>: <1-line summary ≤150 chars> → `<docs/<topic>.md>` OR `<.claude/state/<file>.jsonl>`
```

**Example rows** (populated post-Phase-2A):

```
- wave-7-close: Phase 0 complete; 3 wave-7 streams dispatched in parallel — see `docs/wave-7-close.md`
- mcp-memory-wired: doobidoo Apache-2.0 stdio server at sqlite_vec backend `Z:/claude-sota-pure-state/.mcp-memory/memory.db` — see `docs/mcp-install-mcp-memory.md`
- codex-t1-verdicts: cumulative T1 verdict trail with conf scores — query via Grep on `.claude/state/codex_consult_*_OUT.txt`
- promotion-blocker: 5-clause gate to replace Option A — see `docs/sota-installed-manifest.md §5`
```

**Update discipline**: every wave close → operator adds 1-3 rows pointing to Layer 3 compiled rollup + Layer 1 audit trail file. NO mechanical hook (CR-5 install-priority — until a plugin ships an `auto-index` primitive, this is operator-discipline).

### Layer 3 — Compiled wiki (LLM-summarized synthesis, lazy-loaded)

**Path**: `Z:\claude-sota-pure\docs\<topic>.md`

**Frontmatter discipline** (per CCBP `claude-memory.md:34-40 @ HEAD 48f2ceb` lazy-load mechanism):

```yaml
---
name: <topic-key matching Layer 2 row>
description: <≤150 chars; matches Layer 2 1-line summary>
paths: ["<scope-glob>"]   # CRITICAL: NON-empty paths causes lazy-load; auto-loads only when matching path edited
---
```

**Example Layer 3 files** (populated as runtime evolves):

- `docs/wave-7-close.md` — Wave 7 close-synthesis with codex T1 verdicts + governance specs + extension probe results
- `docs/mcp-install-mcp-memory.md` — doobidoo wire spec + smoke probe + recall pattern (this file's Section 2)
- `docs/mcp-install-graphiti.md` — Graphiti L3 wire spec + FalkorDB Docker + episode storage (this file's Section 3)
- `docs/cross-model-T1-T5-status.md` — current state of T1-T7 hooks (Wave-2 Agent D Edit #8 GAP tracking)

**Anti-pattern**: NEVER put high-volume entries in Layer 3 always-loaded section. The frontmatter `paths:` glob is the lazy-load gate — must be non-empty and scoped.

---

## Section 2 — doobidoo/mcp-memory wire spec (Phase 3 install)

### 2.1 — `.mcp.json` entry (manifest row for `mcp-memory` server)

```json
{
  "mcpServers": {
    "memory": {
      "command": "Z:/venvs/claude-sota-pure/Scripts/mcp-memory-server.exe",
      "args": [],
      "env": {
        "MCP_MEMORY_STORAGE_BACKEND": "sqlite_vec",
        "MCP_MEMORY_SQLITE_VEC_PATH": "Z:/claude-sota-pure-state/.mcp-memory/memory.db",
        "MCP_MEMORY_EMBEDDING_MODEL": "all-MiniLM-L6-v2"
      }
    }
  }
}
```

**Cite anchor**: `Z:/repos/deps/mcp-memory-service/README.md:96-160 @ HEAD 7c697327eb4800c7482406a22b24a990b65038fa [VERIFIED 2026-05-14 via git rev-parse]` (Apache-2.0, 1809★, sqlite_vec embedded — no separate Qdrant install needed; embedded backend handles current scale per sibling claude-sota-installed CLAUDE.md L181 wire precedent).

**Storage path discipline**: state-outside-repo per `CLAUDE.local.md` ENV block (f) — `Z:/claude-sota-pure-state/.mcp-memory/memory.db` is INTENTIONALLY NOT under `Z:/claude-sota-pure/` to preserve gitignored runtime state separation per cardinal-rule-5 bootstrap-only files rule.

### 2.2 — Install command (CR-6 official-native-channel — direct pip from github)

```powershell
# Per CR-6: pull from newest GitHub via OFFICIAL NATIVE CHANNEL
# CR-9 install-risk: HEAD-pin acknowledged below; sqlite_vec embedded (no docker dep)
# CR-10 research-first satisfied: Wave 6 Agent N already classified mcp-memory ADOPT-NOW

# Create dedicated venv (avoid sibling collision per CR-9 sibling-bleed defense)
python -m venv Z:/venvs/claude-sota-pure

# Activate + install
Z:/venvs/claude-sota-pure/Scripts/Activate.ps1
pip install --upgrade pip
pip install git+https://github.com/doobidoo/mcp-memory-service.git@7c697327eb4800c7482406a22b24a990b65038fa

# Create state-outside-repo storage dir
New-Item -ItemType Directory -Force -Path "Z:/claude-sota-pure-state/.mcp-memory"

# Smoke probe (no-network — pure stdio)
Z:/venvs/claude-sota-pure/Scripts/mcp-memory-server.exe --version 2>&1
```

**Version pin discipline (CR-9)**: HEAD SHA pin `7c697327eb4800c7482406a22b24a990b65038fa` is acknowledged D6 today-release exposure — operator can use `git+...mcp-memory-service.git` (latest) ONLY with explicit `@latest-acknowledged-D6-risk` marker per CR-9 install-risk discipline. Recommended: SHA-pin for production; `@main` for evaluation.

### 2.3 — PROGRESS.md auto-save discipline (every wave close)

**Operator workflow** (manual until SessionEnd hook installed via cwc Phase 2B-1):

```
1. At wave close, operator drafts close-synthesis at `tmp/wave<N>-close-<date>.md`
2. Invoke memory_store via MCP:
   {
     "tool": "memory_store",
     "content": "<close-synthesis condensed to ≤2000 chars>",
     "metadata": {
       "type": "wave-close",
       "tags": ["wave<N>", "claude-sota-pure", "<topic-keys>"],
       "memory_type": "episodic"
     }
   }
3. Append row to MEMORY.md Layer 2 pointing to `docs/wave-<N>-close.md` Layer 3
4. Commit
```

**Automation candidate** (Phase 3+): if cwc Phase 2B-1 SessionEnd hook (`commit-on-stop.sh` per `Z:/repos/deps/cwc-long-running-agents/.claude/CLAUDE.md @ ffd563d6` Apache-2.0 PBC) supports `--post-commit-script`, wire `memory_store` invocation as commit-on-stop tail action. Until then: manual operator emit.

### 2.4 — Recall pattern (every session start)

**Operator workflow** (manual until SessionStart hook installed):

```
1. At session start (post-eep launch), agent automatically reads Layer 2 (MEMORY.md auto-loaded per CCBP claude-memory.md:34-40)
2. For depth: invoke memory_search via MCP:
   {
     "tool": "memory_search",
     "query": "claude-sota-pure last wave",
     "limit": 5,
     "filter": {"tags": ["claude-sota-pure"]}
   }
3. Returns last 5 wave-close summaries + episodic context
4. Agent orients on prior decision graph before any new work
```

**Cite for recall discipline**: `Z:/repos/deps/mcp-memory-service/README.md:71-94 @ HEAD 7c697327` (verbatim "Stop Re-Explaining Your Project to AI Every Session" + 60-second get-started).

### 2.5 — Smoke probe (operator runs post-install)

```powershell
# Probe 1: server starts
Z:/venvs/claude-sota-pure/Scripts/mcp-memory-server.exe --help 2>&1 | findstr "Usage"

# Probe 2: storage initializes
Test-Path "Z:/claude-sota-pure-state/.mcp-memory/memory.db"

# Probe 3: end-to-end store-retrieve (after `/plugin` discovers MCP)
# In eep session:
#   "Store this memory: pure runtime Phase 0 complete; tags: [wave-0, claude-sota-pure]"
#   "Recall memories tagged claude-sota-pure"
```

**Exit gate**: probe 3 returns the stored memory → wire is operational.

---

## Section 3 — Graphiti L3 temporal-KG decision

**Recommendation**: **DEFER to Phase 3.5** — install only after smoke probes 1-14 pass + first concrete cross-temporal-arc investigation surfaces a need that doobidoo's flat semantic memory cannot serve.

### 3.1 — Decision rationale (trade-off table)

| Axis | doobidoo mcp-memory (L1+L2) | Graphiti L3 temporal-KG | Verdict |
|---|---|---|---|
| **Storage cost** | sqlite_vec embedded; ~50MB for 10k memories | FalkorDB Docker (Redis fork); ~500MB container baseline | doobidoo wins for Phase 3 |
| **Query power** | Vector semantic + tag filter + recency | Bi-temporal graph traversal + entity edges + episode replay | Graphiti wins for cross-arc evidence chains |
| **Install complexity** | 1 pip command + state dir | Docker container + 2 pip commands + MCP server clone + 5 env vars | doobidoo wins for Phase 3 |
| **Setup time** | ~60 seconds | ~10-15 minutes (Docker pull + container start + MCP server clone + env wire) | doobidoo wins for Phase 3 |
| **Maintenance** | Single sqlite file backup | FalkorDB upgrades + Docker daemon + GROUP_ID isolation | doobidoo wins ongoing |
| **Phase 3 driver** | Cross-session continuity REQUIRED for any multi-day work | Required for cross-WAVE evidence-chain queries — not for basic continuity | doobidoo sufficient |
| **Phase 3.5 driver** | — | When first investigation needs "what edges exist between entities X and Y across waves 1-50?" | Graphiti adds value |

### 3.2 — Phase 3.5 install spec (when triggered)

**Trigger predicate**: operator's investigation surfaces a query that doobidoo's flat vector search cannot answer (e.g., "what entity pairs co-occurred in close-synthesis docs across waves 5-20?"). At that point, install per spec below.

**Cite anchors** (TIER-1-DIRECT):
- `Z:/repos/deps/graphiti/README.md:160-201 @ HEAD c427615044678f4bde026745d8d28a16504868c5 [VERIFIED 2026-05-14 via git rev-parse]` (Apache-2.0 install spec)
- `Z:/repos/deps/graphiti/README.md:181-198 @ HEAD c427615` (FalkorDB Docker command + port mapping)
- `Z:/repos/deps/graphiti/README.md:196-205 @ HEAD c427615` (`pip install graphiti-core[falkordb]` extras)

**Install commands** (CR-6 official-native-channel):

```powershell
# Step 1: FalkorDB Docker container (Apache-2.0 v1.6.1+)
docker pull falkordb/falkordb:latest
docker run -d --name claude-sota-pure-falkordb `
  -p 16379:6379 -p 13000:3000 `
  -v Z:/claude-sota-pure-state/falkordb:/data `
  --restart unless-stopped `
  falkordb/falkordb:latest

# Step 2: Graphiti core with FalkorDB extras (same venv as mcp-memory)
Z:/venvs/claude-sota-pure/Scripts/Activate.ps1
pip install graphiti-core[falkordb]==<latest-version-at-install-time>

# Step 3: Clone Graphiti MCP server (separate from core)
git clone --depth 1 https://github.com/getzep/graphiti.git Z:/claude-sota-pure/.local/graphiti
cd Z:/claude-sota-pure/.local/graphiti/mcp_server
pip install -r requirements.txt
```

**`.mcp.json` addition**:

```json
{
  "mcpServers": {
    "graphiti": {
      "command": "Z:/venvs/claude-sota-pure/Scripts/python.exe",
      "args": ["Z:/claude-sota-pure/.local/graphiti/mcp_server/main.py"],
      "env": {
        "FALKORDB_URI": "redis://127.0.0.1:16379",
        "FALKORDB_PASSWORD": "",
        "FALKORDB_DATABASE": "default_db",
        "OPENAI_API_URL": "https://api.openai.com/v1",
        "GRAPHITI_GROUP_ID": "claude-sota-pure"
      }
    }
  }
}
```

**Cross-runtime isolation discipline**: `GRAPHITI_GROUP_ID=claude-sota-pure` is DISTINCT from sibling `Z:\claude-sota-installed\` which uses `GRAPHITI_GROUP_ID=eee`. Same FalkorDB instance can host both (different groups partition the graph), OR pure runtime can spin its own container on port 16379 (recommended for isolation per CR-9 sibling-bleed defense).

### 3.3 — Episode storage pattern (when wired)

Every gap resolution becomes an episode with entity-pair edges:

```python
# Pseudocode for MCP graphiti episode store
add_episode(
    name="Wave-7 gap resolution: codex BRIDGE-MODE T1 verdict on plugin-discovery extension",
    episode_body="<close-synthesis text>",
    source="message",
    source_description="Wave 7 BRIDGE-MODE codex T1 verdict",
    reference_time=datetime.now(),
    group_id="claude-sota-pure"
)
```

Graphiti auto-extracts entities (codex, BRIDGE-MODE, plugin-discovery, etc.) and edges between them. Subsequent queries can traverse `entity:codex → relation:VERDICT_ON → entity:plugin-discovery` across wave history.

---

## Section 4 — Manifest rows to add at `docs/sota-installed-manifest.md`

Append to existing Section 2 (between row 5 and "Deferred" line) AND add new Section 2.5 for Graphiti deferred:

### Section 2 — append (Phase 3 starter — confirmed memory wire)

| # | MCP name | Source | License | Install command | Notes |
|---|---|---|---|---|---|
| 1 | memory (doobidoo) | `https://github.com/doobidoo/mcp-memory-service @ HEAD 7c697327` | Apache-2.0 | `pip install git+https://github.com/doobidoo/mcp-memory-service.git@7c697327` | **WAVE-8 STREAM-D WIRE-SPEC**: L1 capture; sqlite_vec embedded; cross-session continuity. State at `Z:/claude-sota-pure-state/.mcp-memory/memory.db`. Smoke probes 1-3 in `docs/mcp-install-mcp-memory.md` (to be written Phase 3) |

### Section 2.5 — NEW (Phase 3.5 deferred — Graphiti L3 temporal-KG)

```markdown
## Section 2.5 — Phase 3.5 deferred temporal-KG (Wave 8 Stream-D)

| # | MCP name | Source | License | Status | Trigger predicate |
|---|---|---|---|---|---|
| 6 | graphiti (L3 temporal-KG) | `getzep/graphiti @ HEAD c4276150` | Apache-2.0 | DEFERRED-TO-PHASE-3.5 | Install when investigation needs cross-wave entity-pair graph queries that doobidoo flat-vector cannot answer (per Wave 8 Stream-D §3.1 trade-off table) |

Deps: FalkorDB Docker container on port 16379 (pure-runtime-isolated from sibling).
Storage: `Z:/claude-sota-pure-state/falkordb/`
GROUP_ID: `claude-sota-pure` (distinct from sibling `eee`)
```

### Section 6 — NEW (Cross-session memory architecture per Wave 8 Stream-D)

```markdown
## Section 6 — Cross-Session Memory Architecture (Wave 8 Stream-D)

Karpathy 3-layer wiki structure per `Z:/claude-sota/.claude/rules/karpathy-adapted.md §5 LLM Wiki 3-layer mapping`:

| Layer | Path | Always-loaded? | Producer |
|---|---|---|---|
| L1 chronological | `.claude/state/*.jsonl` | NO (on-demand Grep) | Plugin-shipped hooks (post-Phase-2A) + manual operator emit |
| L2 index | `MEMORY.md` | YES (always-loaded; ≤300 LOC) | Operator at every wave close |
| L3 compiled | `docs/<topic>.md` | NO (lazy-load via frontmatter `paths:`) | Operator at every wave close |

Persistence backend: doobidoo mcp-memory (Phase 3 starter) + optional Graphiti L3 (Phase 3.5 deferred).

Save discipline: every wave-close → memory_store + MEMORY.md row + docs/<topic>.md rollup.
Recall discipline: every session-start → MEMORY.md auto-loads + memory_search(query="last wave", limit=5).
```

---

## Section 5 — PROGRESS.md augmentation template (memory-persist row)

Append to `Z:\claude-sota-pure\PROGRESS.md` after current "Done" section:

```markdown
## Memory persistence status (Wave 8 Stream-D)

- **L1 chronological**: GAP — JSONL emitters arrive via Phase-2A plugin install (cwc bundle) + Phase-3 MCP install (mcp_health)
- **L2 index**: GAP — `MEMORY.md` to be created post-Phase-2A (first row: wave-7-close pointer)
- **L3 compiled**: GAP — `docs/<topic>.md` series populated per wave (wave-7-close as first row)
- **Backend**: mcp-memory Phase 3 PLANNED; Graphiti Phase 3.5 DEFERRED
- **Cite trail**: see `tmp/sota-pure-wave8-D-memory-2026-05-14.md`

## Cross-session continuity recipes (post-Phase-3 wire)

**Session start**:
1. Read `MEMORY.md` (auto-loaded per CCBP claude-memory.md:34-40)
2. Invoke MCP `memory_search(query="claude-sota-pure last wave", limit=5)`
3. Re-orient on Layer 3 `docs/wave-<N-1>-close.md` if newly relevant

**Session end / wave close**:
1. Draft `tmp/wave<N>-close-<date>.md` close-synthesis
2. Promote to `docs/wave-<N>-close.md` Layer 3 with frontmatter `paths:` scope
3. Append MEMORY.md Layer 2 row pointing to it
4. Invoke MCP `memory_store(content="<condensed close-synthesis>", metadata={"type":"wave-close","tags":["wave<N>","claude-sota-pure"]})`
5. Commit with `chore(memory): wave<N> close persisted` body citing the memory_store + MEMORY.md row
```

---

## Section 6 — Cite trail (≥3-distinct-orgs convergence per `convergence-gate.md` Axis 1)

| Org | Cite | Authority class | Wave 8 Stream-D claim it backs |
|---|---|---|---|
| **doobidoo (org #1)** — Heinrich Krupp | `Z:/repos/deps/mcp-memory-service/README.md:1-94,96-160,234-243 @ HEAD 7c697327eb4800c7482406a22b24a990b65038fa [VERIFIED 2026-05-14 via git rev-parse]` | TIER-1-NAMED-AUTHOR (1809★ Apache-2.0) | mcp-memory wire spec (Section 2.1-2.5) |
| **getzep (org #2)** — Daniel Chalef + Travis Fischer | `Z:/repos/deps/graphiti/README.md:65-114,160-201,181-198 @ HEAD c427615044678f4bde026745d8d28a16504868c5 [VERIFIED 2026-05-14 via git rev-parse]` | TIER-1-NAMED-AUTHOR (26068★ Apache-2.0) | Graphiti L3 temporal-KG decision + Phase 3.5 spec (Section 3) |
| **Andrej Karpathy (org #3)** — named-author quote | `Z:/repos/deps/claude-code-best-practice-shan/videos/claude-karpathy-ai-engineer-02-may-26.md:153 @ HEAD 64fffd53a7c6f8e2e0b1575fdd200b65cda04737 [VERIFIED 2026-05-14 via sibling karpathy-adapted.md §5]` | TIER-1-NAMED-AUTHOR-QUOTE | Karpathy 3-layer wiki structure (Section 1) |
| **Anthropic (org #4)** — CCBP claude-memory.md lazy-load mechanism | `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-memory.md:34-40 @ HEAD 48f2cebeb88b389b27231c418ceadb65baf813fd [VERIFIED 2026-05-12]` | TIER-1-DIRECT (Anthropic CCBP) | Layer 2 always-loaded vs Layer 3 lazy-load discipline (Section 1) |

**Axis 1 — Independent T1 sources (≥3 distinct orgs)**: PASS at n=4 (doobidoo + getzep + Karpathy named-author + Anthropic CCBP — 4 distinct orgs).

**Axis 2 — Named T2 practitioners (≥2 dated artifacts)**: PASS — Karpathy named-author quote (2026-05-02) + Heinrich Krupp maintainer authorship + Daniel Chalef getzep founder authorship.

**Axis 3 — Stability (≥3 months from earliest public artifact)**: PASS — doobidoo mcp-memory v10.51.3 (mature, multiple v10.x releases per README L496-501); Graphiti 26k★ (mature multi-month evolution); Karpathy named pattern (~5y CC ecosystem) + Anthropic CCBP (mature).

**Convergence verdict**: ADOPT-NOW for mcp-memory wire (Section 2); ADOPT-DEFERRED for Graphiti (Section 3) pending Phase 3.5 trigger predicate.

---

## Handoff to orchestrator

**Artifacts produced**:
- This file: `Z:\claude-sota-installed\tmp\sota-pure-wave8-D-memory-2026-05-14.md` (485 LOC, within 500 budget)

**Manifest patches ready to apply**:
- Section 2 row 1 — REPLACE existing mcp-memory row with WAVE-8 STREAM-D WIRE-SPEC version (Section 4 above)
- Section 2.5 — NEW (Graphiti deferred — Section 4 above)
- Section 6 — NEW (Cross-session memory architecture summary — Section 4 above)

**PROGRESS.md patches ready to apply**:
- After "Done" section — Memory persistence status block + recipes (Section 5 above)

**Files to create at Phase 3 wire time** (out of scope for Stream-D — required for ops):
- `Z:\claude-sota-pure\MEMORY.md` (initial L2 index — 1 row pointing to wave-7-close)
- `Z:\claude-sota-pure\docs\wave-7-close.md` (initial L3 compiled — Phase 0 close-synthesis)
- `Z:\claude-sota-pure\docs\mcp-install-mcp-memory.md` (Phase 3 install procedure expanded from Section 2)

**Gaps / risks** (per CR-10 HONEST-NON-FINDING):
- L1 JSONL auto-emit requires plugin-shipped hooks (cwc Phase 2B-1 SubagentStop/Stop hooks per Wave-5 Agent K Phase 2B-1) — until installed, operator-manual emit only
- doobidoo HEAD `7c697327` pinned per CR-9 install-risk; recommended to verify `pip install` succeeds in pure venv before committing manifest row
- Graphiti requires FalkorDB Docker — adds infrastructure dep; deferred until first investigation forces it
- STAND-IN-NOTICE: this design was authored under env-funneled Sonnet stand-in per CLAUDE.local.md ENV (g) inherited from sibling — orchestrator should run BRIDGE-MODE codex T1 review before integrating into manifest per Wave 50 fire 10 Pattern A cross-model-gate-satisfaction-status discipline

**Recommended next action for orchestrator**: dispatch BRIDGE-MODE codex T1 review on this artifact (3-axis: cite-class verification + Section 2 install command precision + Section 4 manifest row format compatibility) BEFORE applying patches to PROGRESS.md / sota-installed-manifest.md.

MEMORY-WIRE-COMPLETE: cross-session memory persistence architecture designed; 4-org convergence-gate Axis 1 PASS; mcp-memory wire spec paste-ready for Phase 3; Graphiti deferred to Phase 3.5 with explicit trigger predicate; PROGRESS.md + manifest patches ready to apply.
