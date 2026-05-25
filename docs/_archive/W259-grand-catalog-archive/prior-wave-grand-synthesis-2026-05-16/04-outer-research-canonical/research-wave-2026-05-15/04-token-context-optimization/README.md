# Layer 4: Token / Context Optimization Deep-Dive

> See `../05-grand-catalog/GRAND_CATALOG_2026-05-15.md` Section 7 for full per-primitive scoring.

## CRITICAL FINDING — microsoft/LLMLingua is STALE (2026)

**Last commit `e0e9d99` on 2025-10-28** (~7 months ago). README cites latest news 2024-12-13 (SCBench). Velocity declined; no Q1/Q2 2026 commits.

**Architectural insight**: per-Edit prompt rewriting via LLMLingua is **wrong layer** for Claude Code runtime. Anthropic prompt-cache + `/compact` + native primitives obsolete the LLMLingua approach. **DO NOT INSTALL LLMLingua** for CC runtime — replaced by 6-primitive composition stack below.

## The 2026 Token-Optimization Stack (6 primitives + 1 measurement)

### 1. Anthropic prompt caching (runtime substrate)
- **Score**: 96 / ADOPT-NOW
- **Wire**: 1 (implicit via Anthropic API)
- **Savings**: 60-90% on repeated context reuse
- **How**: `cache_control` field on messages; verify cache hit rate via `/context all`
- **TIER-1 OFFICIAL** Anthropic

### 2. Anthropic CC `/compact` + autocompact (runtime substrate)
- **Score**: 94 / ADOPT-NOW
- **Wire**: 1 (env-set `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=70`)
- **Savings**: summary-based context decay at 70% threshold (vs default 90%)
- **TIER-1 OFFICIAL** CC

### 3. rtk-ai/rtk (CLI proxy compression)
- **Score**: 92 / ADOPT-NOW
- **Stars**: **48,553**
- **Wire**: 2 (`cargo install rtk-cli`)
- **Savings**: **60-90% on common dev commands** (process-level proxy)
- **License**: (Rust binary; verify per Probe 6 — appears active maintenance May 2026)
- **Why it wins**: single Rust binary zero-deps + universal CLI coverage + named org rtk-ai

### 4. mksglu/context-mode (tool-output sandbox)
- **Score**: 88 / ADOPT-NOW
- **Stars**: 14,826
- **Wire**: 1 (`/plugin install context-mode`)
- **Savings**: **98% reduction on tool outputs**
- **License**: (active TS; verify Probe 6)
- **Why it wins**: 15-platform integration + multi-path native CC (plugin+MCP+hook+skill)

### 5. JuliusBrussee/caveman (skill-level prompt rewrite)
- **Score**: 86 / STUDY-PILOT-FAVORABLE (verify HARD-GATE first)
- **Stars**: **60,743**
- **Wire**: 1 (`/plugin install caveman`)
- **Savings**: **65% token cut** ("talk like caveman" skill)
- **Why it wins**: complementary to RTK at different layer (prompt-side vs output-side); composable for stacked savings

### 6. yamadashy/repomix `compress: true`
- **Score**: 94 / ADOPT-NOW
- **Wire**: 2 (already from MCP layer; enable compression flag)
- **Savings**: **~70% via tree-sitter compression** on `pack_codebase(compress=true)`
- **Why it wins**: 18M downloads/month + tree-sitter substrate + Warp endorsement + MIT

### 7. ryoppippi/ccusage (measurement substrate)
- **Score**: 86 / ADOPT-NOW
- **Wire**: 2 (`npm install -g ccusage`)
- **Savings**: n/a (telemetry)
- **Why it wins**: required measurement substrate to verify other primitives are working

## Stacked savings estimate

Per **diegosouzapw/OmniRoute** (4.6k★) observed:
- RTK (60-90% on dev commands)
- × caveman (65% skill rewrite)
- × repomix compress (~70% on code-pack)
- × Anthropic prompt-cache (60-90% reuse)
- × context-mode sandbox (98% on large outputs)
- ≈ **~95% cumulative savings on eligible context**

## STUDY-PILOT alternatives

### chopratejas/headroom (1.8k★)
- 60-95% on tool outputs / logs / RAG chunks
- Library + proxy + MCP server
- **Alternative to context-mode** at different shape

### yvgude/lean-ctx (1.7k★)
- 60-95% reduction; 99% on cached reads
- Rust binary + Shell Hook + MCP — 49 tools / 10 read modes / 90+ patterns
- "Context OS" framing
- **Cross-runtime** via shell hooks

### cytostack/openwolf (1.6k★)
- "Sharper context. Fewer tokens." middleware
- Newer (Mar 2026)

### alexgreensh/token-optimizer (982★)
- "Ghost tokens" detection + compaction survival
- Compaction-quality preservation focus

### Mibayy/token-savior (852★)
- 77% active tokens + 76% wall time + 100% on benchmark (96 tasks)
- **CAUTION**: Row-2 fabrication-test concern (claims need methodology verification)

### lucasrosati/claude-code-memory-setup (649★)
- 71.5x fewer tokens per session via Obsidian + Graphify
- Memory-offload pattern

### Anthropic structured outputs / batch API
- TIER-1 OFFICIAL Anthropic SHAPE-CLAIM pattern
- 3-org Axis-1 PASS: Anthropic + Effect Schema + Pydantic v2
- For SHAPE-verify-before-deploy pattern

### LangChain deepagents TruncateArgsSettings
- CITE-CLASS-CANONICAL (pattern reference)
- `langchain-ai/deepagents/middleware/summarization.py @ 54d85219`
- Pre-emptive arg truncation discipline for orchestrator-side

## DO NOT INSTALL (anti-patterns)

- **microsoft/LLMLingua** — STALE per direct probe; per-Edit prompt rewriting wrong-layer for CC
- **microsoft/LLMLingua-2 / LongLLMLingua** — same stale lineage
- **open-compress/claw-compactor** — maintenance-mode cpd=0.72 per W220 R5
- **jia-gao/leanctx** — LLMLingua-derivative; inherits anti-pattern

## Decision matrix

| Token-eff layer | Pick | Why |
|-----------------|------|-----|
| Runtime context reuse | Anthropic prompt-cache | TIER-1 OFFICIAL substrate |
| Runtime context decay | `/compact` + autocompact env | TIER-1 OFFICIAL CC |
| CLI command output | rtk-ai/rtk | 60-90% process-level proxy |
| Tool output sandbox | mksglu/context-mode | 98% on large outputs |
| Code-pack compression | yamadashy/repomix compress | ~70% tree-sitter |
| Prompt-side compression | JuliusBrussee/caveman | 65% skill rewrite |
| Measurement | ryoppippi/ccusage | telemetry substrate |
| Tool-output alt | chopratejas/headroom | alt shape (library + proxy) |
| Cross-runtime alt | yvgude/lean-ctx | shell-hook integration |

## Key insights

1. **2026 token-eff is multi-primitive composition**, not single tool. 6-primitive stack composes multiplicatively.

2. **LLMLingua era is over** for CC runtime. Anthropic prompt-cache + /compact are the runtime primitives.

3. **3-org Axis-1 PASS** for replacement stack: Anthropic + yamadashy + LangChain = 3 named-org cite trail.

4. **Stacked savings ~95%** per OmniRoute observed evidence (RTK + caveman + repomix-compress + Anthropic cache + context-mode).

5. **Row-2 fabrication-test discipline** applies — repos with strong numeric claims without methodology citation (token-savior 852★ "100% benchmark") need verification before adopt.

See Grand Catalog Section 7 for full per-primitive dimensional scoring.
