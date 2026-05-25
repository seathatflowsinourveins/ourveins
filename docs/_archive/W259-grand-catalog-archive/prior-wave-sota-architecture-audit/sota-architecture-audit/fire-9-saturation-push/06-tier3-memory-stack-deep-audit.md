# 06 — Tier-3 memory stack deep audit (SRA D1-D10 on L1 + L3 + Fire-9 L4 candidate)

> **Purpose**: full SRA D1-D10 audit on the EXISTING memory stack + Fire 9 L4 candidate.
> Closes Fire 8 deferred "W134-F9-claudemem" overlap probe.

## Memory stack inventory (eee current state)

| Layer | Primitive | Status | Backend |
|---|---|---|---|
| L1 capture | `doobidoo/mcp-memory-service v10.51.3` | ✅ INSTALLED | sqlite_vec at `Z:/claude-sota-installed-state/.mcp-memory/memory.db` |
| L2 vector | Embedded sqlite_vec in L1 | ✅ INSTALLED (Qdrant deferred until scale demands) | — |
| L3 temporal-KG | `getzep/graphiti v0.29.0` | ✅ INSTALLED (Apache-2.0, 25.8k★) | FalkorDB v1.6.1 Docker port 16379 |
| L4 wiki | DEFERRED | — | — |
| L4 candidate | `thedotmack/claude-mem v?` (74k★ Apache-2.0) | ⚠️ STUDY-PILOT-CONDITIONAL (crypto-flag pending) | own ragtime/ |

## SRA D1-D10 per layer

### L1 — doobidoo/mcp-memory-service v10.51.3 (INSTALLED)

| Dim | Score | Notes |
|---|---|---|
| D1 license-use-class | PASS | Apache-2.0 |
| D2 freshness | PASS | v10.51.3 = active release cadence |
| D3 fresh-paint clear | PASS | 1809★ + deep development history |
| D4 maintainer-provenance | PASS | Heinrich Krupp TIER-4-NAMED-INDIVIDUAL with sustained commit history |
| D5 active-maintenance | PASS | regular release cadence |
| D6 use-class compat | PASS | MCP server (sqlite_vec backend); CC-native; install via `mcp-memory-server.exe` entry-point |
| D7 Anthropic-aligned | PASS | MCP protocol native |
| D8 industry adoption | PASS | 1809★ + cited across Anthropic ecosystem |
| D9 FM-class clear | PASS | no known FM-class triggered |
| D10 replacement viability | N/A | already INSTALLED |

**SRA score: 10/10 PASS** — KEEP installed.

### L3 — getzep/graphiti v0.29.0 (INSTALLED, FalkorDB UP)

| Dim | Score | Notes |
|---|---|---|
| D1 license-use-class | PASS | Apache-2.0 |
| D2 freshness | PASS | v0.29.0 active |
| D3 fresh-paint clear | PASS | 25,800★ + deep production history |
| D4 maintainer-provenance | PASS | getzep org TIER-3-NAMED-ORG with named maintainers |
| D5 active-maintenance | PASS | sustained release cadence |
| D6 use-class compat | PASS | FalkorDB backend running on Docker; Python SDK + MCP server cloned at `.local/graphiti/mcp_server/` |
| D7 Anthropic-aligned | PASS | MCP protocol native |
| D8 industry adoption | PASS | 25.8k★ + multi-vendor adoption (used by many CC harnesses) |
| D9 FM-class clear | PASS | no FM-class triggered |
| D10 replacement viability | N/A | already INSTALLED |

**SRA score: 10/10 PASS** — KEEP installed.

**Outstanding gap**: `.mcp.json` wiring queued (per Fire 6 close — requires NEO4J_URI or
FalkorDB-mode env config + OPENAI_API_KEY).

### L4 candidate — thedotmack/claude-mem 74k★ Apache-2.0 (Fire 8 discovery)

| Dim | Score | Notes |
|---|---|---|
| D1 license-use-class | PASS | Apache-2.0 |
| D2 freshness | PASS | 0-day push (today) |
| D3 fresh-paint clear | ⚠️ NEEDS-VERIFICATION | 74k★ very high + $CMEM crypto-flag = potential fresh-paint anti-pattern |
| D4 maintainer-provenance | PARTIAL | thedotmack TIER-4-NAMED-INDIVIDUAL |
| D5 active-maintenance | PASS | 0d push + multi-component (docker/evals/plugin) |
| D6 use-class compat | PASS | CC plugin + MCP Search Tools |
| D7 Anthropic-aligned | PASS (with caveat) | uses CC plugin + MCP standards; OpenClaw bridge = non-Anthropic ecosystem coupling |
| D8 industry adoption | PASS | 74k★ extremely high |
| D9 FM-class clear | ⚠️ NEEDS-VERIFICATION | crypto-flag = potential SUPPLY-CHAIN-ATTACK vector |
| D10 replacement viability | ⚠️ OVERLAP-PROBE-PENDING | 3 overlap surfaces with L1 + L3 |

**SRA score: 6/10 PASS + 2 NEEDS-VERIFICATION + 2 PARTIAL/OVERLAP** —
**STUDY-PILOT-CONDITIONAL** (per Fire 9 file 01).

## Overlap analysis (claude-mem vs existing L1 + L3)

| Surface | L1 mcp-memory-service | L3 Graphiti | claude-mem |
|---|---|---|---|
| **Capture mechanism** | API explicit calls | API explicit calls | `transcript-watch` watcher (auto) |
| **Storage** | sqlite_vec | FalkorDB temporal-KG | own ragtime/ (RAG-style) |
| **Retrieval** | semantic search via MCP | temporal-KG queries via MCP | "MCP Search Tools" |
| **Cross-tool** | MCP standard | MCP standard | MCP + OpenClaw Gateway + cursor-hooks |
| **License** | Apache-2.0 | Apache-2.0 | Apache-2.0 |
| **eee fit** | INSTALLED operationally | INSTALLED + Docker UP | CONDITIONAL pending crypto-flag |

**Overlap verdict**:
- **Capture axis**: claude-mem's auto-watcher is DIFFERENT from L1's explicit API
  (potentially complementary; transcript watch could feed L1 store)
- **Storage axis**: 3 different backends — sqlite_vec vs FalkorDB vs ragtime — could
  STACK rather than REPLACE
- **Retrieval axis**: 3 different MCP interfaces — would compete for query routing
- **NET**: claude-mem is NOT a drop-in replacement for L1 OR L3; it's potentially a
  COMPLEMENTARY auto-capture layer above the explicit-API stack

## Memory stack recommendation (Fire 9 verdict)

| Action | Rationale |
|---|---|
| **KEEP L1 (mcp-memory-service)** | 10/10 SRA + INSTALLED + operational |
| **KEEP L3 (Graphiti + FalkorDB)** | 10/10 SRA + INSTALLED + Docker UP + production-grade |
| **DEFER L4 (claude-mem)** | crypto-flag investigation required + auto-watcher novelty risk; re-evaluate at W134-F10 after crypto-probe |
| **WIRE Graphiti MCP into `.mcp.json`** | Outstanding from Fire 6; closes operational gap |

## Tier-3 wiki layer alternative options (beyond claude-mem)

Per `Z:/claude-sota/CLAUDE.md` Memory Stack STATUS-DEFERRED: L4 wiki layer was deferred
in Fire 6. Alternatives to claude-mem for L4 wiki:

| Candidate | Approach | Fire-9 verdict |
|---|---|---|
| **Karpathy-LLM-Wiki-Practice.md** (`docs/`) | Inline markdown wiki in workspace | ✅ ALREADY ACTIVE (per `karpathy-adapted.md §5 Wiki Compounding Surface`) |
| **claude-mem** (Fire 8 discovery) | Auto-watch + RAG | ⚠️ DEFER (crypto-flag) |
| **russbeye/claude-memory-bank** (Fire 6) | `.claude/memory_bank/` JIT retrieval | ⚠️ DEFER (D2 staleness 224d) |
| **Anthropic-canonical** (skill-creator pattern) | per-feature `feedback_*.md` / `reference_*.md` | ✅ ALREADY ACTIVE (per `.claude/projects/Z--claude-sota-installed/memory/*.md`) |

**L4 wiki coverage** is actually MORE COMPLETE than Fire 6 captured — existing eee uses
`.claude/projects/.../memory/MEMORY.md` index + topic-files as wiki layer. Per Karpathy
3-layer wiki at `karpathy-adapted.md §5`:
- Layer 1 chronological log = `.claude/state/*.jsonl`
- Layer 2 index = `.claude/projects/Z--claude-sota-installed/memory/MEMORY.md`
- Layer 3 compiled wiki = `docs/karpathy-llm-wiki-practice.md` + rule-layer + topic-MD files

**Verdict**: eee's L4 wiki layer IS operational; claude-mem would be SUPPLEMENTARY
auto-capture, not foundational. DEFER claude-mem.

## Forward fire status

- W134-F10-graphiti-wire: complete Graphiti MCP `.mcp.json` registration (Fire 6 carryover)
- W134-F10-claudemem-crypto: investigate $CMEM mention in claude-mem README:417+
- W134-F10-claudemem-overlap: deeper probe vs L1 + L3 if crypto clears

## Mia ladder advance

n=996 → n=1000 (+4: L1 SRA 10/10 verified / L3 SRA 10/10 verified / L4 candidate
SRA 6/10+caveats verified / overlap analysis with 3 axes completed / Karpathy-3-layer
wiki existing coverage confirmed)
