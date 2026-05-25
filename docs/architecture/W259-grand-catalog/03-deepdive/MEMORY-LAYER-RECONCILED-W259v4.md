# MEMORY LAYER — RECONCILED W259v4 (Wave 4 Memory Reconciliation Audit)

> **Mission:** Reconcile the operator's ~50-repo researched memory catalog against W259 Wave-1 Layer-A + Wave-2 Memory-Forensic. **Resolve the benchmark-methodology error** that made Wave-2 declare mem0 PRIMARY. Re-rank all memory engines by **LongMemEval (the canonical hard benchmark)**. Forensic the 3 W259-MISSED winners (OMEGA, Mastra OM, Hindsight). Produce CORRECTED L1.5 architecture.
>
> **Cite-class:** `effective_tier=TIER-3-LOCAL-COMPOSITION` per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8. Constituents (2026-05-16): DeepWiki Q&A (5 repos: hindsight, VILA-Lab/Dive-into-Claude-Code, cognee, doobidoo/mcp-memory-service, omega-via-PyPI) + exa.ai web_search (8 queries incl. LongMemEval ICLR 2025 primary arXiv 2410.10813, OMEGA omegamax.co primary leaderboard, Pith blog 2026-04-02 49%-to-95% analysis, dial481/locomo-audit independent audit, MemPalace issue #29/#314/#367 benchmark-methodology threads) + GitHub repo metadata + W259 Wave-1 Layer-A + Wave-2 Memory-Forensic inheritance.
>
> **Supersedes:** `MEMORY-LAYER-FORENSIC-W259v2.md` §2.3 + §5 + §6 (mem0-PRIMARY recommendation **RETRACTED** — see §6). Wave-1 `LAYER-A-memory-rag-vector-kg.md` §4 row `mem0 LongMemEval 49.0%` is **VINDICATED** (Wave-2 regressed it; this document restores it).

---

> ## ⚠️ CORRECTION BANNER (W259-v16, 2026-05-16) — READ BEFORE USING THIS DOCUMENT
>
> **This dated W259-v4 record contains a FALSE benchmark claim that has since been retracted.** This document repeatedly states hindsight's 91.4% LongMemEval was *"independently reproduced by Virginia Tech / The Washington Post"* and is *"the only independently-reproduced number."* **That claim is FALSE.** The arXiv paper 2512.12818 ("Hindsight is 20/20") is **CO-AUTHORED** by Virginia Tech (Srivastava/Wang/Ramakrishnan) and The Washington Post (Neeser) **alongside Vectorize.io** — those parties are on hindsight's OWN byline. Co-authorship ≠ independent reproduction. The W259-v4 source (the Pith blog) misread the author list. **No memory engine has an independently-reproduced LongMemEval number; no official LongMemEval leaderboard exists.**
>
> **Authoritative correction:** `03-deepdive/MEMORY-SOTA-EVIDENCE-AUDIT-W259v16.md` (§Q2 + §7 + §8). Corrections that apply throughout this document:
> - hindsight's LongMemEval is `[SELF-REPORTED]` like every memory engine's — strike all "independently reproduced" / "only reproduced number" language.
> - The top scores (OMEGA 95.4 / Mastra 94.87 / hindsight 94.6) are a **statistical tie** in the judge-noise band.
> - hindsight's current figure is **~94.6%** (engine v0.4.19); 91.4% is the stale v0.1.0 paper number. mem0's marketed number is **94.8%**, not 94.4%.
> - **The OUTCOME is UNCHANGED — hindsight remains memory PRIMARY.** It wins on the CORRECT decisive axis: it is the **only memory engine with a full native-CC plugin** (hooks + MCP + skill), MIT-licensed, Windows-verified, zero-cloud, already installed — **INTEGRATION, not benchmark.** Only the reasoning below is wrong; the verdict survives.

---

## §0 — The benchmark-methodology error: why Wave-2 was wrong

### §0.1 — What Wave-2 claimed

`MEMORY-LAYER-FORENSIC-W259v2.md` §2.3 + §5 + §6 declared **mem0 the T1 PRIMARY memory install**, citing:
> "DeepWiki-verified benchmarks: 92.5% LoCoMo + **94.4% LongMemEval** + 64.1% BEAM(1M) — beats every competitor with auditable open-source eval framework."

This is **wrong on two counts**, and the error is instructive.

### §0.2 — Error #1: The 94.4% LongMemEval number is mem0's own marketing, not an independent result

The 94.4% comes verbatim from **`mem0.ai/research`** (mem0's own research page) and `mem0.ai/blog/state-of-ai-agent-memory-2026`. Wave-2 attributed it to "DeepWiki §3.7" — but DeepWiki was simply *reading mem0's own README/docs back*. **DeepWiki is not an independent benchmark authority; it extracts what the repo says about itself.** Citing DeepWiki for a vendor's self-reported number does not launder it into an independent result.

**Independent evaluations tell a completely different story.** Per the **Pith blog 2026-04-02** (`pith.run/blog/every-benchmark-tests-the-same-thing`), which surveyed the March-2026 comparison wave (Vectorize.io 8-framework eval 2026-03-14, DEV.to "5 AI Agent Memory Systems" 2026-03-18, OMEGA comparison page 2026-03-17):

| System | LongMemEval Score | Provenance |
|---|---|---|
| OMEGA | 95.4% | Self-reported (single author) |
| Hindsight | 91.4% (v0.1.0 paper; current engine ~94.6%) | `[SELF-REPORTED]` — W259-v16 correction: NOT independently reproduced. VA-Tech/WaPo are CO-AUTHORS of hindsight's arXiv 2512.12818, not reproducers; the Pith blog misread the author list. |
| SuperMemory | 81.6% | GPT-4o |
| Zep | 63.8% | GPT-4o (Zep paper) |
| **mem0** | **49.0%** | **Independent evaluation** (Vectorize.io 2026-03-14) |

**mem0 scores 49% on LongMemEval under independent evaluation — near the BOTTOM of the field, not the top.** W259 Wave-1 Layer-A §4 actually had this number right (`mem0 ... LongMemEval 49.0% (vectorize.io)`). Wave-2 then **overwrote a correct independent number with a vendor marketing number** — a regression.

### §0.3 — Error #2: mem0's own SaaS-vs-OSS gap and unreproducibility

mem0's published benchmark numbers come from its **hosted SaaS platform (`MemoryClient`)**, NOT the open-source `Memory` class. mem0 maintainers acknowledge this directly in **mem0 issue #2800** and **#3943**:
> "The scores in the paper were from our SaaS platform (`MemoryClient`), not the OSS `Memory` class. These have different pipelines under the hood, so the numbers won't match up directly... we know the eval story for OSS isn't great right now."

Independent reproductions of the OSS version land at **30–50% on LoCoMo** (multiple users, mem0 #2800/#3943/#3945). Per the `dial481/locomo-audit` independent audit, mem0 has "multiple reproducibility issues open," and a Hacker News thread (item 44883133, "AI Startup Caught Cheating on Benchmark Papers") discusses mem0's "alleged misimplementation of competitor systems." So the install operator would adopt is the OSS one — which does **not** reproduce the marketed numbers.

### §0.4 — The root cause: LoCoMo vs LongMemEval are different benchmarks, and mem0 markets the easy one

This is the methodology lesson the operator flagged. There are **two dominant agent-memory benchmarks**, and they are NOT interchangeable:

| | **LoCoMo** (Maharana et al. 2024) | **LongMemEval** (Wu et al., ICLR 2025; arXiv 2410.10813) |
|---|---|---|
| Context depth | **~9–10k tokens** ("relatively short" per MemoryAgentBench paper) | **115k / 1.5M tokens** (~40+ sessions; structurally requires memory) |
| Sessions | 50 chat histories | 50k sessions; 500 curated questions |
| Memory abilities tested | single-hop, multi-hop, temporal, open-domain, adversarial | **5 core**: information extraction, multi-session reasoning, **knowledge updates**, temporal reasoning, **abstention** |
| Key gap it closes | (baseline) | LongMemEval explicitly adds **knowledge-update reasoning** + **assistant-side recall** that "all long-term memory benchmarks including recent ones such as LoCoMo fail to evaluate" (arXiv 2410.10813 §related work, verbatim) |
| Saturation risk (Jiang et al. 2026 "Anatomy of Agentic Memory") | **Moderate** — ~300k variant exceeds *some* context limits but fits modern windows | **Valid** — LongMemEval-M >1M tokens structurally requires a memory system |
| Difficulty | **Easier** — short contexts no longer challenge current models | **Harder** — the de-facto hard yardstick; commercial assistants show "30% accuracy drop" (arXiv abstract) |

**mem0 markets LoCoMo (92.5%), where it looks strong, and its LongMemEval number (94.4%) is SaaS-only + unreproducible.** Independent LongMemEval evaluation puts mem0 at **49%**. Wave-2 was misled because it took mem0's two self-reported numbers at face value and treated DeepWiki's echo of them as verification.

### §0.5 — Second-order caveat: even LongMemEval leaderboards mix two metrics

For full honesty: the LongMemEval leaderboard itself is partially contaminated by a **metric mismatch** the operator should know about (surfaced in `MemPalace/mempalace` issues #29, #314, #367, and `dial481/locomo-audit`):

- **End-to-end QA accuracy** = retrieve → generate answer → LLM-judge. This is the *real* LongMemEval metric (arXiv 2410.10813). OMEGA, Mastra OM, Emergence, Zep, Hindsight report this.
- **`recall_any@5` (retrieval recall)** = did the right chunk land in top-5; **no answer generated, no judge.** MemPalace's headline "96.6% / 100%" numbers and rohitg00/agentmemory's "95.2% R@5" are this metric. Independent E2E QA reruns of MemPalace land at **~66.8%** (MemPalace #39, `qa_bench_v2.py`).
- LoCoMo gold answers have **~99 documented errors in 1,540 questions (6.4%)** → theoretical scoring ceiling **93.57%** (`dial481/locomo-audit`). Any LoCoMo score above ~94% is mathematically suspect.

**Discipline for this document:** §2 ranks by **end-to-end QA LongMemEval** where available, and explicitly flags retrieval-recall-only numbers as **non-comparable** (marked `R@k`).

---

## §1 — Unified memory catalog (operator catalog ∪ W259)

Every memory repo from BOTH the operator's ~50-repo catalog AND W259 Wave-1/Wave-2, deduplicated. **Name-collision warnings flagged** — the catalog has three.

### §1.0 — Name-collision warnings (resolve before any install)

1. **"OpenMemory" is THREE different things**: (a) `mem0ai/claude-code-plugin` README *titles itself* "OpenMemory" (the mem0 CC plugin); (b) `CaviraOSS/OpenMemory` (independent cognitive memory engine, temporal KG, Rust+Python+Node); (c) `mem0`'s own `openmemory/` subdirectory. **These are unrelated.**
2. **"agentmemory" is TWO repos**: (a) `rohitg00/agentmemory` (operator's "memory_layer" / "rohitg00 toolkit" — iii-engine-based, 12 hooks, Ebbinghaus decay, claims 95.2% **R@5 retrieval recall**); (b) `JordanMcCann/agentmemory` (separate solo project, claims 96.2% **end-to-end QA** "world record", 16 days / $1,000). The operator's "memory_layer (rohitg00 toolkit; thermodynamic decay, 41 papers, pgvector, 6 hooks)" = `rohitg00/agentmemory` — note the repo says **SQLite + iii-engine, 12 hooks**, not pgvector/6-hooks (operator's description appears to be of an earlier version).
3. **"claude-mem" vs "claude-supermemory" vs "supermemory"**: `thedotmack/claude-mem` (the plugin), `supermemoryai/claude-supermemory` (the CC plugin for supermemory), `supermemoryai/supermemory` (the engine). All distinct.

### §1.1 — Tier 0: Native Claude Code memory primitives (zero install, Anthropic-OFFICIAL)

| # | Primitive | What it is | Source verification |
|---|---|---|---|
| T0.1 | **CLAUDE.md / AGENTS.md hierarchy (5 scopes)** | Managed `/etc/claude/CLAUDE.md` → User `~/.claude/CLAUDE.md` → Project `./CLAUDE.md` → Local `./CLAUDE.local.md` (git-ignored) → subdir/imported. Resolved most-specific→most-general; stricter higher-authority rules win. | VILA-Lab/Dive-into-Claude-Code §4.3 (DeepWiki-confirmed) + CCBP `claude-memory.md:34-40`. Already in operator runtime. |
| T0.2 | **Subagent `memory:` field** | Per-subagent memory scoping in `.claude/agents/*.md` frontmatter. | Operator catalog; consistent with VILA-Lab subagent isolation (worktree/remote/in-process). |
| T0.3 | **Auto Memory (file-history checkpoints + header-scan)** | CC runs an **LLM-based scan of memory-file headers**, selects up to **5 relevant files**, injects them as the "Auto-memory" source. **Explicitly rejects opaque vector DBs** for auditability. | VILA-Lab/Dive-into-Claude-Code §4.3 (DeepWiki verbatim: "rejecting opaque vector databases"). |
| T0.4 | **Channels (JSONL session transcripts)** | Per-session JSONL transcripts (operator redirects to `Z:/claude-sota-installed-state/.claude/projects` per CLAUDE.local.md ENV (f)). Replayable session history. | Operator catalog + CLAUDE.local.md. |
| T0.5 | **Context compaction pipeline (5 shapers)** | Before every model call: Budget Reduction → Snip → Microcompact → Context Collapse → Auto-Compact. Graduated, not single-pass truncation. | VILA-Lab/Dive-into-Claude-Code (DeepWiki). Directly relevant to operator's auto-compact ENV (i)/(j) tuning. |
| T0.6 | **VILA-Lab/Dive-into-Claude-Code** | **Reference/educational doc** — source-level architectural analysis of Claude Code v2.1.88 (~1,900 TS files, 512K LOC). NOT a memory system; a *required-reading map* of how CC's memory/hooks/subagents/MCP actually work. | §4 below. **VERIFIED as architectural reference.** |
| T0.7 | **Anthropic Memory Tool** (`/mnt/memory/`) | Container-mounted memory dir; read/write via bash+file tools. | Wave-2 §0 Class A (carried forward). |
| T0.8 | **Anthropic Managed Agents Memory** (beta, `managed-agents-2026-04-01`) | Workspace-scoped persistent state for managed agents. | Wave-2 §0 Class A; W258 v13 §4.2. |
| T0.9 | **Anthropic Auto Dream** | 4-phase consolidation pass over memory files (prune stale, resolve contradictions, reindex). | Wave-2 §0 Class A. |

### §1.2 — Tier 1: Claude Code plugins / skills (CC-native install path)

| # | Repo | Stars (2026-05) | License | CC pathway | Notes / verification |
|---|---|---|---|---|---|
| T1.1 | **thedotmack/claude-mem** | **~75.6k** | **Apache-2.0** (was NOASSERTION; relicensed — current `main` shows Apache-2.0; older snapshots show NOASSERTION — verify at install) | plugin marketplace + 5 lifecycle hooks + 4 MCP tools + mem-search skill | SQLite + ChromaDB + Bun worker (port 37777). **No LongMemEval bench published.** Windows failure-modes per Wave-2 §4.1 (issues #2407/#2439). Operator's "~89K" star figure is high — repo shows 63.8k–75.6k across 2026 snapshots. |
| T1.2 | **supermemoryai/claude-supermemory** | ~2.5k | MIT | plugin marketplace + auto-capture hooks + super-search/super-save skills | **Requires Supermemory Pro** (`SUPERMEMORY_CC_API_KEY`) — cloud-gated. Last push 2026-03-06 (slowing). Engine = `supermemoryai/supermemory` (81.6% LongMemEval GPT-4o). |
| T1.3 | **letta-ai/claude-subconscious** | ~3k (operator says ~2.4k) | (Letta) | plugin marketplace (`letta-ai/claude-subconscious`) | **Explicitly a DEMO, "not intended for production"** (repo README). Built on Letta Code SDK; background "whisper" agent; **never writes CLAUDE.md**. Real product = Letta Code. |
| T1.4 | **vectorize-io/hindsight** (`hindsight-integrations/claude-code`) | (Vectorize) | **MIT** | **plugin.json + UserPromptSubmit hook (auto-recall) + Stop hook (auto-retain) + MCP tools + `/hindsight-memory:create-agent` skill** | **#3-tier engine — see §3.3. STRONGEST native-CC integration of any high-LongMemEval engine.** Plugin v0.6.4; engine v0.4.19. |
| T1.5 | **AgriciDaniel/claude-obsidian** (+ fork `dxxx/claude-obsidian-memory`) | (community) | MIT | `claude plugin marketplace add AgriciDaniel/claude-obsidian` | Karpathy LLM-Wiki pattern; 11 skills; `/wiki /save /autoresearch`; DragonScale Memory extension. Knowledge-engine, not retrieval-bench-focused. |
| T1.6 | **basicmachines-co/basic-memory** | **~3k** | **AGPL-3.0** ⚠ | MCP server (`uvx basic-memory mcp`) | Markdown-file knowledge graph + SQLite index; `memory://` URLs; Obsidian-compatible. **AGPL → D1 license-use-class penalty for network-served use** — see §4 scoring. |
| T1.7 | **georgeantonopoulos/obsidian-cli-memory-bank-skill** | (community) | (community) | **SKILL.md + 5 lifecycle hooks** (SessionStart/UserPromptSubmit/Stop/PreCompact/PostToolUse) — installs `*.py` hooks into `~/.claude/hooks/` | Obsidian-vault structured memory; CLI-first. **⚠ Cardinal-rule-2 conflict**: copies self-authored `*.py` into `~/.claude/hooks/` — would be a `.claude/hooks/scripts/*.py` self-invent for THIS operator runtime. CITE-PATTERN only. |
| T1.8 | **russbeye/claude-memory-bank** | (community) | (community) | plugin/skill | Memory-bank pattern (Cline-lineage). Not independently bench-verified. |
| T1.9 | **napkin** | ~416 | (community) | plugin | Low-star; un-verified. WATCH. |
| T1.10 | **ensue-skill** | ~393 | (community) | skill | Low-star; un-verified. WATCH. |
| T1.11 | **homunculus** | ~216 | (community) | plugin | Low-star; un-verified. WATCH. |
| T1.12 | **cartographer** | ~420 | (community) | plugin | Low-star; un-verified. WATCH. |
| T1.13 | **iannuttall/claude-sessions** | ~1.1k | (community) | skill/commands | Session-management (not deep memory). Useful adjacent to T0.4 Channels. |
| T1.14 | **claude-canvas** | ~1.1k | (community) | plugin | Visual canvas companion (pairs with claude-obsidian). Not memory-core. |
| T1.15 | **musistudio/claude-code-router** | **~25.3k** | (open) | router (LLM proxy) | **NOT a memory system** — operator catalog mis-files it. It's an L1 model-router (peer of LiteLLM). Excluded from memory ranking; noted for L1 layer. |
| T1.16 | **MemU / NevaMind-AI/memU** | ~3.5k | Apache-2.0 | NO native CC | 3-layer memory; 92.09% **LoCoMo** (no LongMemEval). WATCHLIST (per Wave-2). |
| T1.17 | **rohitg00/agentmemory** ("memory_layer") | (community) | (community) | **MCP server + 12 hooks** (auto-capture); `@agentmemory/mcp` shim (7 tools local / 51 tools w/ server) | iii-engine-based; 4-tier consolidation + **Ebbinghaus decay**; BM25+Vector+Graph RRF. Claims **95.2% R@5 retrieval recall** (NOT E2E QA — non-comparable to leaderboard). Self-hosted SQLite, no external deps. `AGENTMEMORY_INJECT_CONTEXT=false` by default. |
| T1.18 | **mem0ai/claude-code-plugin** ("OpenMemory" — the mem0 CC plugin) | (mem0ai) | Apache-2.0 | plugin marketplace + SessionStart/PreCompact/Stop/TaskCompleted hooks + 7 MCP tools + memory-manager subagent | The actual mem0 CC integration. Pre-Compaction hook is genuinely useful. **But engine = mem0 OSS = 49% independent LongMemEval.** See §6. |

### §1.3 — Tier 2: MCP memory servers (transport-level install)

| # | Repo | License | CC pathway | LongMemEval | Notes |
|---|---|---|---|---|---|
| T2.1 | **@modelcontextprotocol/server-memory** | MIT | reference MCP server | n/a | Anthropic-reference knowledge-graph memory. Minimal; baseline. |
| T2.2 | **doobidoo/mcp-memory-service** | **Apache-2.0** | `claude mcp add memory -- memory server`; Streamable HTTP + **OAuth 2.1 + PKCE + DCR**; **8-tab web dashboard** | **80.4% R@5 (turn-level) / 86.0% R@5 (session-level)** — *retrieval recall, NOT E2E QA* (repo discloses this vs MemPalace) | **Sub-5ms retrieval** (local ONNX); **Windows-portable** (CHANGELOG has PowerShell fixes); semantic search + typed KG + autonomous consolidation. Strong, honest, self-hostable. |
| T2.3 | **CaviraOSS/OpenMemory** | (open) | `claude mcp add --transport http openmemory http://localhost:8080/mcp` | n/a | **Temporal KG with `valid_from`/`valid_to` (auto-close superseded facts)** — directly addresses the Pith "belief quality" critique. 5 cognitive sectors; decay engine; SQLite/Postgres; self-hosted. **Operator's "temporal auto-close" repo.** |
| T2.4 | **mem0-mcp-selfhosted** (`elvismdev/mem0-mcp-selfhosted`) | MIT | MCP server | mem0-engine → 49% independent | Self-hostable mem0; same engine ceiling as T1.18. |
| T2.5 | **WhenMoon-afk/claude-memory-mcp** | (community) | MCP server | n/a | Community MCP; un-verified. |
| T2.6 | **mem0ai/mem0-mcp** | Apache-2.0 | upstream mem0 MCP | 49% independent | Upstream mem0 MCP. |
| T2.7 | **Heirloom** | (proprietary?) | MCP server | n/a | **Rust; AES-encrypted SQLite.** Operator catalog flags it; no public bench. Encryption-at-rest is its differentiator. STUDY only — license/provenance unverified. |
| T2.8 | **mcp-obsidian** | MIT | MCP server | n/a | Obsidian-vault MCP bridge. Adjacent to claude-obsidian. |
| T2.9 | **@bitbonsai/mcpvault** | (community) | MCP server | n/a | Secrets/credential vault MCP — adjacent, not memory-core. |

### §1.4 — Tier 3: Memory engines (the actual ranking battleground — see §2)

| # | Repo | License | Local? | Engine type |
|---|---|---|---|---|
| T3.1 | **OMEGA** (`omega-memory/omega-memory`, omegamax.co) | **Apache-2.0** | **Fully local** (ONNX bge-small) | Vector + KG; 5 category-specific RAG prompts; BM25+vector hybrid |
| T3.2 | **Mastra OM** (`mastra-ai/mastra`, Observational Memory) | **Apache-2.0** (core; `ee/` dirs are enterprise-licensed) | Partial-local (needs pg/libsql/mongo + a model) | Observer+Reflector background agents; text-based observation log; **no vector/graph DB needed** |
| T3.3 | **Hindsight** (`vectorize-io/hindsight`) | **MIT** | Docker / pip / pg0-embedded | Entity graph + 4-way parallel retrieval + neural reranking |
| T3.4 | **Emergence AI** (EmergenceMem) | proprietary | No | Multi-stage retrieval + neural reranking |
| T3.5 | **letta-ai/letta** | Apache-2.0 | Optional self-host | MemGPT lineage; agent-OS (core/archival/recall blocks) |
| T3.6 | **supermemoryai/supermemory** | MIT (SDK) + hosted | Hybrid | Cross-LLM memory API; cloud embeddings |
| T3.7 | **Zep / getzep/graphiti** | Apache-2.0 | Self-host (Neo4j/FalkorDB) | Bi-temporal knowledge graph |
| T3.8 | **mem0ai/mem0** | Apache-2.0 | OSS local OR hosted SaaS | Two-phase extract+update; vector-first, optional graph |

### §1.5 — Tier 3B: Specialty / adjacent (memory is a feature or research-tier)

| Repo | License | Role |
|---|---|---|
| **cognee-ai/cognee** | **Apache-2.0** | GraphRAG / ECL pipeline; **Kuzu (default) / Neo4j / Neptune / Postgres** graph backends — **FalkorDB NOT supported** (DeepWiki-verified, correcting operator catalog); **Windows-portable** (pyproject classifier + `python-magic-bin` Windows dep); **CC plugin** (SessionStart/PostToolUse/UserPromptSubmit/PreCompact/SessionEnd hooks). 30+ connectors. **Operator's "冷/cold" tier.** |
| **langchain-ai/langmem** | MIT | LangChain memory SDK; framework-coupled. |
| **plastic-labs/honcho** | **AGPL** ⚠ | Hierarchical Workspaces→Peers→Sessions; "Dreaming" autonomous consolidation; ~92.6% LongMemEval-S (per Engram leaderboard). AGPL → license-use-class penalty. |
| **Memori / GibsonAI/memori** | Apache-2.0 | LLM-call interception (Python wrapper); NO CC primitive. |
| **MemoClaw / Eve Memory** | (community) | OpenClaw-ecosystem memory. |
| **MemPalace** (`MemPalace/mempalace`) | MIT | Verbatim memory; 19 MCP tools + Stop + PreCompact hooks. **Benchmark claims RETRACTED by maintainers** — see §0.5; honest E2E QA ~66.8%. Stars-purchase dispute. STUDY-with-due-diligence. |
| **MemU** | (see T1.16) | duplicate of NevaMind-AI/memU. |
| **Cloudflare Agent Memory** | managed | Durable Object + Vectorize; CF-side, not CC-native. |
| **Atlan / byterover (Cipher)** | NOASSERTION (cipher) | byterover-cli has CC skill; cipher upstream MCP-only. Bench = vendor self-claim (Wave-2 §4.5). |
| **memvid/memvid** | (open) | Single-file `.mv2` WAL-safe portable memory; no CC integration. |
| Research-tier: **A-MEM**, **MIRIX**, **MemoryOS**, **LiCoMemory**, **MemPalace-adjacent agentmemory V4 (JordanMcCann)** | mixed | Paper-implementations; not install-grade for operator. |

**Total distinct memory repos catalogued: 9 (Tier 0) + 18 (Tier 1) + 9 (Tier 2) + 8 (Tier 3) + ~14 (Tier 3B) = ~58 distinct entries** (Wave-2 covered 16; Wave-1 Layer-A §4 covered 10).

---

## §2 — LongMemEval re-ranking (CORRECTED)

### §2.1 — The corrected engine leaderboard (end-to-end QA accuracy)

Ranked by **LongMemEval end-to-end QA accuracy** (the real metric — retrieve+generate+judge). Sources: OMEGA primary leaderboard `omegamax.co/benchmarks` + Mastra `mastra.ai/research/observational-memory` (the two most-cited cross-system tables, 2026-02) + Pith independent survey 2026-04-02 + operator catalog April-2026 figures.

| Rank | System | LongMemEval (E2E QA) | Model | License | Local | Independent verification |
|---:|---|---:|---|---|---|---|
| 1 | **OMEGA** | **95.4%** | GPT-4.1 | Apache-2.0 | **Fully local** | Self-reported (single author); methodology disclosed; raw 466/500 |
| 2 | **Mastra OM** | **94.87%** | gpt-5-mini | Apache-2.0 (core) | Partial-local | Self-reported; reproducible config; **84.23% on gpt-4o** (the official benchmark model) |
| 3 | Mastra OM | 93.27% | gemini-3-pro | Apache-2.0 | Partial-local | Self-reported |
| 4 | **Hindsight** | **91.4%** (v0.1.0 paper; current ~94.6%) | gemini-3-pro | **MIT** | Docker/pip | `[SELF-REPORTED]` — W259-v16: NOT independently reproduced (VA-Tech/WaPo co-authored hindsight's arXiv 2512.12818); also 89.0% GPT-OSS-120B, 83.6% GPT-OSS-20B |
| 5 | Emergence AI | 86.0% | Internal | proprietary | No | **"Internal" config — not publicly reproducible** (Mastra footnote); public "Simple" config = 82.4% |
| 6 | supermemory | 81.6–85.2% | gpt-4o / gemini-3-pro | MIT (SDK) | Hybrid | Self-reported |
| — | *Oracle (gpt-4o)* | *82.4%* | gpt-4o | — | — | *Reference: given only the answer-containing conversations* |
| 7 | letta-ai/letta | 83.2% | — | Apache-2.0 | Optional | Operator catalog figure (LongMemEval); Letta's own LoCoMo = 74% |
| 8 | Zep / Graphiti | **71.2%** (Zep) / 63.8% temporal | gpt-4o | Apache-2.0 | Self-host | Zep paper; consistent across OMEGA + Mastra + Pith tables |
| — | *Full-context (gpt-4o)* | *60.2%* | gpt-4o | — | — | *Reference baseline: entire history in context* |
| 9 | **mem0** | **49.0%** | — | Apache-2.0 | OSS local / SaaS | **Independent evaluation** (Vectorize.io 2026-03-14; Pith). mem0's own 94.4% claim is SaaS-only + unreproducible (§0). |

### §2.2 — Retrieval-recall-only numbers (NON-COMPARABLE — do not rank against §2.1)

These systems publish `recall@k`, not E2E QA. **Listing them in the same table as §2.1 is the metric-mismatch error** (`dial481/locomo-audit`, MemPalace #367). Kept separate:

| System | Metric | Score | Honest E2E QA equivalent (where measured) |
|---|---|---:|---|
| MemPalace | recall_any@5 | 96.6% (raw) / 100% (3 hand-coded patches) | **~66.8%** (`qa_bench_v2.py`, MemPalace #39) — maintainers RETRACTED the headline numbers |
| rohitg00/agentmemory | R@5 (BM25+vector) | 95.2% | not measured E2E |
| doobidoo/mcp-memory-service | R@5 | 80.4% turn / 86.0% session | not measured E2E (repo honestly labels it retrieval-recall) |

### §2.3 — Community-leaderboard caveat

A *community* LongMemEval-S leaderboard (SIBYL blog 2026-04-15, Engram blog) lists even higher numbers — `agentmemory V4` (JordanMcCann) 96.2%, Chronos/PwC 95.6%, SIBYL 95.6%, Engram 95.8%. **No official leaderboard exists**; these are self-reported with varying judges/generator models and **not directly comparable**. The §2.1 table uses the two most-cited *cross-system* tables (OMEGA, Mastra) which at least apply a consistent task-averaged methodology. Treat anything >95% with skepticism given the 93.57% LoCoMo ceiling finding and the post-hoc-split contamination pattern.

### §2.4 — What the re-ranking means

- **mem0 is NOT the memory winner.** It is **last** among independently-evaluated engines on the canonical hard benchmark (49%). Wave-2's PRIMARY pick collapses.
- **The real top tier is OMEGA / Mastra OM / Hindsight** — all three **W259-MISSED**. W259 Wave-1 and Wave-2 never surfaced any of them.
- **Hindsight is the only top-tier engine with first-class native CC integration** (plugin.json + hooks + MCP + subagent skill) AND a permissive license (MIT) AND verified Windows support AND independent reproduction. This is decisive — see §3.3 and §5.

---

## §3 — Forensic: the 3 W259-MISSED winners

### §3.1 — OMEGA (`omega-memory/omega-memory` · omegamax.co) — 95.4% LongMemEval

| Attribute | Finding | Source |
|---|---|---|
| LongMemEval | **95.4% task-averaged E2E QA** (466/500 raw = 93.2%); GPT-4.1 generator+judge | omegamax.co/benchmarks + omegamax.co/blog/number-one-on-longmemeval (primary) |
| License | **Apache-2.0** | PyPI `omega-memory` v1.4.10 + GitHub; relicensed MIT→Apache-2.0 at v1.0.0 (CHANGELOG) |
| Local-deployability | **Fully local** — ONNX `bge-small-en-v1.5` embeddings (~90 MB), SQLite store, CPU-only inference (~337 MB RAM after first query). No cloud, no API key for retrieval. | OMEGA docs (omegamax.co/docs/getting-started/installation) |
| **Windows-portability** | ⚠ **"OS: macOS, Linux (Windows untested)"** — OMEGA's own installation docs. BUT: repo language breakdown includes **PowerShell (0.6%), Inno Setup (0.2%), Batchfile** → Windows installer scaffolding exists; `omega doctor --client` supports many clients. **Status: probably-works-but-officially-untested.** Operator must pilot-verify. |
| Native-CC pathway | **MCP server (stdio) + 7 hook processes / 11 handlers** (SessionStart, Stop, UserPromptSubmit auto-capture, PostToolUse surface-memories) + auto-injected `<!-- OMEGA:BEGIN -->` block in CLAUDE.md + `omega-skills` repo. `omega setup` auto-registers everything; `omega setup --uninstall` cleanly reverts. **25 core memory tools** (15 in lighter install). | GitHub README + PyPI |
| Benchmark provenance | **Single-author, self-reported.** Author iterated 76.8%→95.4% over ~8 runs / 6 months. Methodology *is* disclosed (task-averaged = unweighted mean of 6 category accuracies — same as Mastra). **No independent reproduction found** (unlike Hindsight). Honest self-caveats: "doesn't test auto-capture quality, retrieval latency under load, adversarial inputs"; "not stress-tested beyond ~600 memories." |
| Stars / maturity | **~104–112 stars**, 4–5 contributors, 41 releases, created 2026-02-13, last push 2026-05-01. **Very young, very low adoption** despite the #1 claim. | GitHub repo metadata |
| **OMEGA VERDICT** | **STUDY-PILOT, not INSTALL.** The 95.4% is real-as-reported and the architecture (category-specific RAG prompts + hybrid retrieval + query augmentation) is sound and fully local + Apache-2.0 + clean CC integration + clean uninstall. **But**: (1) Windows officially untested, (2) single-author / ~110-star / 3-month-old → fails W259 Axis-1 (≥3 orgs) and Axis-3 (≥3-month stability is *just* met), (3) benchmark not independently reproduced, (4) self-admittedly not stress-tested past 600 memories — the operator's long-arc `/loop` runtime would exceed that fast. **Pilot it head-to-head against Hindsight; do not make it primary on a single author's benchmark.** |

### §3.2 — Mastra OM (Observational Memory) — 94.87% LongMemEval

| Attribute | Finding | Source |
|---|---|---|
| LongMemEval | **94.87% E2E QA (gpt-5-mini)**; 93.27% gemini-3-pro; 89.2% gemini-3-flash; **84.23% gpt-4o** (the *official* benchmark model — and it beats the gpt-4o oracle by 2 pts) | mastra.ai/research/observational-memory + mastra.ai/blog/observational-memory (primary) |
| License | **Apache-2.0** for the core framework; directories named `ee/` are **source-available under the Mastra Enterprise License** (free for dev/test, paid for production). OM (`packages/memory/`) is **NOT in `ee/`** → OM itself is Apache-2.0. | github.com/mastra-ai/mastra/blob/main/LICENSE.md |
| Architecture | **Observer + Reflector background agents** maintain a dense observation log that *replaces* raw message history as it grows. **Text-based — no vector or graph DB required.** Produces a **stable, prompt-cacheable context window** (unique — other systems inject retrieved content each turn, breaking prompt caching). | mastra.ai/docs/memory/observational-memory |
| Local-deployability | **Partial.** OM needs (a) a storage adapter — **only `@mastra/pg`, `@mastra/libsql`, `@mastra/mongodb`** are supported (libsql = local SQLite-compatible → local path exists) and (b) a model for the background agents (default `google/gemini-2.5-flash`; tested with `anthropic/claude-haiku-4-5`, `deepseek-*`, local OpenAI-compatible endpoints, `qwen3`, `glm-4.7`). So: local *storage* yes (libsql), local *model* possible but the default is cloud. | Mastra docs |
| **Windows-portability** | TypeScript / Node — inherently cross-platform; no Windows-specific blockers found. `@mastra/core@1.33.0`; 23.9k★; 440 contributors; very active (last push 2026-05-15). |
| Native-CC pathway | ⚠ **NO native Claude Code plugin.** Mastra ships an **`@mastra/opencode` plugin** (PR #12925) that wires OM into **OpenCode** sessions (observe conversations, inject compressed observations, discard observed messages). For Claude Code there is **no first-party integration** — OM would have to be consumed via Mastra's `observe()` API from custom glue code, or via the OpenCode plugin if the operator ran OpenCode. **This is the critical gap for THIS operator** (Claude Code runtime, not OpenCode). |
| Benchmark provenance | Self-reported but **reproducible config** published; YC-backed, $13M-funded team. The gpt-4o number (84.23%) is the honest "official-model" figure. Mastra explicitly footnotes that Emergence's 86% is non-reproducible — relatively high benchmark integrity. |
| **MASTRA OM VERDICT** | **CITE-PATTERN + STUDY-PILOT (deferred).** OM is the **best-engineered** of the three (stable cacheable context, no vector DB, beats the oracle, scales with model quality). Apache-2.0 core, mature repo, huge contributor base. **But for THIS operator the blocker is integration**: OM is wired for **OpenCode, not Claude Code.** Adopting it natively means either (a) writing custom CC↔Mastra glue (cardinal-rule-1 risk — that's self-invent), or (b) running OpenCode as a peer harness. **The Observational-Memory *pattern* (Observer/Reflector compressing history into a stable cacheable log) is the single most valuable architectural idea in this whole catalog** and should inform the operator's compaction strategy regardless of whether Mastra-the-engine is installed. Re-evaluate as INSTALL if/when a native CC plugin ships. |

### §3.3 — Hindsight (`vectorize-io/hindsight`) — 91.4% LongMemEval

| Attribute | Finding | Source |
|---|---|---|
| LongMemEval | **91.4% E2E QA (gemini-3-pro)**; 89.0% GPT-OSS-120B; 83.6% GPT-OSS-20B. DeepWiki also reports a **94.6%** figure for engine v0.4.19 on a knowledge-update/belief-revision cut — treat the cross-system **91.4%** as the comparable headline. | Mastra leaderboard + OMEGA leaderboard + Pith (all agree 91.4%); DeepWiki `vectorize-io/hindsight` |
| License | **MIT** (engine AND the `hindsight-integrations/claude-code/.claude-plugin/plugin.json`) | DeepWiki-verified |
| Local-deployability | **Self-hostable** — Docker (`docker run` with LLM API key + persistent volume; ships API + optional admin UI), **bare-metal pip**, OR **`pg0` embedded database** (zero external Postgres). Production option: external PostgreSQL. | DeepWiki-verified |
| **Windows-portability** | **YES — fully supported.** DeepWiki verbatim: deployable on Windows via Docker, bare metal (pip), or embedded pg0. **This is the only one of the three winners with explicitly-verified Windows support.** |
| **Native-CC pathway** | **STRONGEST in the entire catalog.** The `hindsight-integrations/claude-code` plugin (v0.6.4) provides: **(1) Auto-recall** — `UserPromptSubmit` hook queries Hindsight and injects relevant memories before each prompt; **(2) Auto-retain** — `Stop` hook extracts + stores conversation every N turns; **(3) Knowledge tools** — MCP server exposes read/write/search of memory; **(4) Subagent skill** — `/hindsight-memory:create-agent` scaffolds subagents backed by isolated memory banks. The plugin can connect to an external Hindsight server OR auto-start/stop a local `hindsight-embed` daemon. | DeepWiki-verified |
| Benchmark provenance | **`[SELF-REPORTED]` — NOT independently reproduced** (W259-v16 correction; the prior "independently reproduced" line below is FALSE). arXiv 2512.12818 "Hindsight is 20/20" is CO-AUTHORED by Virginia Tech (Srivastava/Wang/Ramakrishnan) and The Washington Post (Neeser) alongside Vectorize.io — those parties are on hindsight's OWN byline, so the number is vendor first-party work, not independent reproduction. The W259-v4 Pith-blog source misread the author list. No memory engine has an independently-reproduced LongMemEval number; the top three (OMEGA 95.4 / Mastra 94.87 / hindsight 94.6) are a statistical tie in the judge-noise band. *(Stale prior claim, retracted: "per Pith pith.run 2026-04-02, Hindsight's 91.4% was reproduced by Virginia Tech and the Washington Post.")* |
| Maturity / org | Backed by **Vectorize.io** (a real company; the same org behind the Vectorize 8-framework eval) — satisfies provenance far better than OMEGA's single author. |
| **HINDSIGHT VERDICT** | **T1 INSTALL — the corrected memory winner for THIS operator.** It is the **only** system that simultaneously satisfies: top-tier LongMemEval (91.4%, **independently reproduced** — higher epistemic confidence than OMEGA's unreproduced 95.4%), **MIT license** (clean D1), **verified Windows support**, **self-hostable with zero cloud dependency** (pg0 embedded), and **the strongest native-CC integration of any memory engine in existence** (plugin + 2 hooks + MCP + subagent skill). It loses ~4 pts of headline LongMemEval to OMEGA but wins on every operational axis that matters for a Windows solo-operator runtime under cardinal-rule-1/2. |

---

## §4 — 23-dimension scoring of the unified catalog (memory repos)

Scored against the W259 Master-Scoring-Matrix 23-dimension schema (10 SRA D1-D10 + 13 W259-extended D11-D23; total weight 18.9; `Composite = Σ(Di×Wi)/18.9×10`). Scores reflect the **corrected LongMemEval ranking** + Windows + native-CC + cardinal-rule fit. Top memory candidates only (full 23-col matrices for non-memory layers remain in `MASTER-SCORING-MATRIX-W259.md`).

**Key dimension reminders:** D1 license-use-class (MIT/Apache=10, AGPL=2 for network-served, NOASSERTION=0); D8 industry adoption (≥3 orgs); D11 NATIVE-CC-PATHWAY (w=1.2); D15 WINDOWS-PORTABLE (w=1.0); D17 MCP-TRUST-SURFACE; D19 REVERSIBLE-PILOTABILITY; D21 DATA-BOUNDARY-RISK (inverted, 10=safe).

| Repo | D1 | D2 | D4 | D8 | D11 | D13 | D15 | D17 | D19 | D21 | LongMemEval input | **Composite** | Disposition |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|---:|---|
| **vectorize-io/hindsight** | 10 | 10 | 8 | 8 | **10** | 9 | **10** | 9 | 9 | 9 | **~94.6% `[SELF-REPORTED]`** (W259-v16: NOT independently reproduced) | **~90** | **T1 INSTALL — corrected winner (on integration, not benchmark)** |
| **OMEGA (omega-memory)** | 10 | 10 | 5 | 4 | 9 | 9 | **6** ⚠ | 8 | 9 | 9 | 95.4% (self-reported, unreproduced) | **~78** | **T2 STUDY-PILOT** (Windows-untested + Axis-1 fail) |
| **Mastra OM (mastra-ai/mastra)** | 9 | 10 | 9 | 9 | **4** ⚠ | 9 | 9 | 7 | 7 | 8 | 94.87% (OpenCode-wired, no CC plugin) | **~80** | **T2 CITE-PATTERN** (no native CC; pattern is gold) |
| **doobidoo/mcp-memory-service** | 10 | 10 | 6 | 7 | 9 | 8 | **9** | **9** | 9 | 9 | 86% R@5 (honest retrieval-recall) | **~84** | **T1 STUDY-PILOT** (honest, Windows-clean, OAuth) |
| **CaviraOSS/OpenMemory** | 9 | 9 | 6 | 6 | 8 | 8 | 8 | 8 | 9 | 9 | n/a (temporal-KG, belief-quality angle) | **~78** | **T2 STUDY-PILOT** (best belief-quality story) |
| **cognee-ai/cognee** | 10 | 10 | 8 | 8 | 9 | 8 | **8** (Win-classifier verified) | 8 | 8 | 8 | n/a (HotPotQA harness; GraphRAG) | **~84** | **T1 STUDY-PILOT** (operator 冷/cold tier) |
| **getzep/graphiti** | 10 | 10 | 9 | 9 | 9 | 8 | 8 | 9 | 8 | 8 | 71.2% / 63.8% temporal | **~85** | **T1 INSTALL (incumbent — temporal tier)** |
| **thedotmack/claude-mem** | 9 | 10 | 6 | 8 | **10** | 9 | **5** ⚠ | 8 | 8 | 8 | none published | **~80** | **T2 STUDY-PILOT-PENDING-FIXES** (Windows fails) |
| **mem0ai/mem0** + claude-code-plugin | 10 | 10 | 8 | 9 | 9 | 7 | 9 | 9 | 9 | 6 | **49% (independent)** ← CORRECTED | **~74** | **T3 — DOWNGRADED from Wave-2 PRIMARY** |
| **supermemoryai/supermemory** | 10 | 10 | 6 | 8 | 9 | 8 | 8 | 8 | 9 | 5 (cloud-gated) | 81.6–85.2% | **~80** | **T2 STUDY-PILOT** (Pro-gated) |
| **letta-ai/letta** | 10 | 10 | 8 | 8 | 4 (EXTERNAL_MCP) | 7 | 8 | 8 | 7 | 7 | 83.2% | **~76** | **T3 CITE-PATTERN** (harness-competitor) |
| **letta-ai/claude-subconscious** | 8 | 10 | 8 | 6 | 10 | 7 | 8 | 7 | 9 | 7 | n/a (demo) | **~74** | **T3** (explicitly a demo, not production) |
| **basicmachines-co/basic-memory** | **2** ⚠ AGPL | 10 | 6 | 7 | 8 | 7 | 8 | 8 | 9 | 9 | n/a | **~68** | **T3 CITE-PATTERN** (AGPL D1 penalty) |
| **rohitg00/agentmemory** | 6 | 10 | 5 | 5 | 9 | 8 | 7 | 7 | 8 | 8 | 95.2% **R@5 only** (non-comparable) | **~72** | **T2 STUDY-PILOT** (decay engine interesting) |
| **plastic-labs/honcho** | **2** ⚠ AGPL | 10 | 7 | 7 | 7 | 8 | 8 | 7 | 8 | 8 | ~92.6% LongMemEval-S | **~70** | **T3** (AGPL penalty; "Dreaming" interesting) |
| **MemPalace/mempalace** | 10 | 10 | 4 | 5 | 9 | 7 | 8 | 7 | 9 | 8 | retracted → ~66.8% E2E | **~72** | **T2 STUDY-PILOT-DUE-DILIGENCE** |

**Scoring notes:** Hindsight tops the memory layer at **~90** — it is the only candidate scoring 9-10 on D1+D11+D15 simultaneously while carrying an independently-reproduced top-tier LongMemEval. mem0 drops from Wave-2's "estimated 91" to **~74** purely from the D8/LongMemEval correction (49% independent + reproducibility-failure dispute → D21 data-boundary also dinged for SaaS-platform default). OMEGA's ~78 is gated by D15 (Windows untested) and D4/D8 (single author, ~110 stars). Mastra OM's ~80 is gated by D11 (no native CC plugin — the OpenCode plugin doesn't help a CC operator).

---

## §5 — CORRECTED L1.5 architecture recommendation (operator trilayer-aware)

### §5.1 — The operator's stated real architecture

The operator runs (or plans) a **trilayer** memory stack with Chinese thermal-tier naming:
- **热 (hot)** = **OpenViking** — the fast working-memory tier
- **暖 (warm)** = **Qdrant** — the vector-substrate mid-tier
- **冷 (cold)** = **Cognee / FalkorDB** — the GraphRAG cold-storage tier

The operator explicitly states: **"the gap is Claude-Code-side hook+MCP integration."** This is the correct diagnosis. The trilayer engines are storage/retrieval substrate; what is missing is the **CC-native lifecycle wiring** (SessionStart inject, PreCompact preserve, Stop retain, MCP query tools) that connects the operator's `/loop` runtime to that substrate.

### §5.2 — The corrected recommendation

```
L0   SUBSTRATE
     ├── Qdrant (暖/warm)              — operator's vector tier; W258 v13 + Layer-A confirmed
     └── Cognee + Kuzu/Neo4j (冷/cold) — operator's GraphRAG cold tier
         NOTE: Cognee supports Kuzu(default)/Neo4j/Neptune/Postgres — NOT FalkorDB.
         Operator catalog says "Cognee/FalkorDB" — if FalkorDB is load-bearing,
         pair it with getzep/graphiti (which DOES support FalkorDB) instead.

L1   ANTHROPIC-NATIVE BASELINE (zero install — keep, do not replace)
     ├── CLAUDE.md 5-scope hierarchy   — already in operator runtime
     ├── Auto Memory (header-scan, 5-file inject) — CC's own file-based memory
     ├── Channels (JSONL transcripts)  — redirected per ENV (f)
     └── Auto Dream / Memory Tool      — Anthropic-OFFICIAL consolidation
     VILA-Lab principle: CC deliberately uses TRANSPARENT FILE memory and
     REJECTS opaque vector DBs for auditability. Any L1.5 engine is ADJUNCT
     to this, never a replacement.

L1.5 THIRD-PARTY MEMORY ENGINE  ←── THE CORRECTED PICK
     ┌─────────────────────────────────────────────────────────────┐
     │ PRIMARY:  vectorize-io/hindsight                             │
     │   • ~94.6% LongMemEval [SELF-REPORTED] (not reproduced)      │
     │   • MIT license (clean cardinal-rule-1)                      │
     │   • Windows-verified; self-host via embedded pg0 (no cloud)  │
     │   • Native CC plugin = UserPromptSubmit + Stop hooks +       │
     │     MCP tools + /hindsight-memory:create-agent subagent skill│
     │   • Closes the operator's EXACT stated gap:                  │
     │     "Claude-Code-side hook+MCP integration"                  │
     └─────────────────────────────────────────────────────────────┘
     ┌─────────────────────────────────────────────────────────────┐
     │ TEMPORAL ADJUNCT (incumbent, keep): getzep/graphiti          │
     │   • bi-temporal KG; install ONLY when temporal queries       │
     │     ("what was true 3 weeks ago") become load-bearing        │
     │   • the only catalog engine that supports FalkorDB           │
     └─────────────────────────────────────────────────────────────┘

L1.5 PILOT-LANE (sandboxed comparison before any promotion)
     ├── OMEGA            — head-to-head vs Hindsight on operator's real
     │                      session data; verify Windows first (omega doctor)
     ├── doobidoo/mcp-memory-service — honest retrieval-recall numbers,
     │                      sub-5ms, OAuth dashboard; strong "暖" companion
     └── CaviraOSS/OpenMemory — pilot for the BELIEF-QUALITY dimension
                              (temporal valid_from/valid_to auto-close)

PATTERN-CITE (adopt the idea, do not necessarily install the engine)
     └── Mastra Observational Memory — Observer/Reflector compressing history
         into a STABLE, PROMPT-CACHEABLE observation log. This pattern
         should directly inform the operator's auto-compact strategy
         (ENV (i)/(j) + intelligent-compact PreCompact stack).
```

### §5.3 — Why Hindsight over OMEGA despite OMEGA's higher headline number

| Axis | OMEGA 95.4% | Hindsight 91.4% | Winner |
|---|---|---|---|
| LongMemEval headline | 95.4% | 91.4% | OMEGA (+4) |
| **Benchmark epistemics** | `[SELF-REPORTED]`, single author, unreproduced | `[SELF-REPORTED]` — NOT independently reproduced (W259-v16 correction: VA-Tech/WaPo are co-authors of arXiv 2512.12818, not reproducers) | **tie** (both self-reported; Hindsight wins on INTEGRATION, not epistemics) |
| License | Apache-2.0 | MIT | tie (both clean) |
| **Windows** | **"untested"** (own docs) | **verified** (Docker/pip/pg0) | **Hindsight** |
| **Native CC integration** | MCP + hooks (good) | MCP + hooks + **subagent skill** (best) | **Hindsight** |
| Org provenance (D4/D8) | single author, ~110★, 3 months | Vectorize.io (real company) | **Hindsight** |
| Stress-tested scale | self-admits **untested >600 memories** | production memory product | **Hindsight** |
| Cloud dependency | none (fully local) | none (pg0 embedded) | tie |

OMEGA wins one axis (raw score, unreproduced). Hindsight wins **five** of the operationally-decisive axes. For a Windows solo-operator long-arc `/loop` runtime governed by cardinal-rule-1 (trusted primitives) and cardinal-rule-2 (plugin hooks only), **independently-reproduced + Windows-verified + best-CC-integration beats a 4-point unreproduced headline.** OMEGA stays in the pilot lane precisely so the operator *can* verify whether its +4 holds up on real data and on Windows — if it does, promotion is a one-flag change.

### §5.4 — Install discipline (cardinal-rule alignment)

- **CR-1** (trusted plugins only): Hindsight `hindsight-integrations/claude-code` plugin (MIT, Vectorize.io) — ✅. Install via plugin marketplace, not hand-rolled.
- **CR-2** (hooks = plugin-hooks or direct-CLI only): Hindsight's UserPromptSubmit/Stop hooks are **self-registered by the plugin** — ✅ no `.claude/hooks/scripts/*.py` self-invent. **⚠ AVOID `georgeantonopoulos/obsidian-cli-memory-bank-skill`** for install — it copies self-authored `*.py` into `~/.claude/hooks/`, which would violate CR-2 for this runtime (CITE-PATTERN only).
- **CR-5** (safety via CC permissions): Hindsight MCP tools gated by `.claude/settings.json` permissions; pg0-embedded keeps data local (no data-boundary risk vs cloud memory).
- **Reversibility**: `/plugin uninstall` + delete the Hindsight data volume → clean revert (<2 min). OMEGA: `omega setup --uninstall` removes hooks/MCP/CLAUDE.md-block cleanly.
- **Cross-model gate (CR-3)**: this is a single-agent Wave-4 audit. Per cardinal-rule-3, **codex T1 Path P review required before committing Hindsight to `.mcp.json` + `.claude/settings.json`** — trigger `codex exec` against this artifact + W259 master scoring matrix.

---

## §6 — What W259 Wave-2 must RETRACT + what replaces it

### §6.1 — RETRACTIONS (Wave-2 Memory-Forensic `MEMORY-LAYER-FORENSIC-W259v2.md`)

| Wave-2 claim | Status | Replacement |
|---|---|---|
| **§2.3 / §5 / §6: mem0 = T1 PRIMARY, "94.4% LongMemEval ... beats every competitor"** | **RETRACTED** | mem0 = **49% LongMemEval (independent)** — last among independently-evaluated engines. The 94.4% is mem0's SaaS-platform self-report, unreproducible on the OSS version operators actually install (mem0 #2800/#3943). mem0 → **T3**, NOT primary. |
| §5: "mem0 ... auditable open-source eval framework" cited as verification | **RETRACTED as verification** | mem0's eval framework tests *LoCoMo* and the maintainers admit "the eval story for OSS isn't great." DeepWiki echoing mem0's README is not independent verification. |
| §6 Primary/Secondary/Tertiary = mem0 / MemPalace / Anthropic-native | **RETRACTED (Primary + Secondary)** | New L1.5 primary = **Hindsight**. MemPalace's benchmark headline was **retracted by its own maintainers** (issues #29/#39/#367; honest E2E QA ~66.8%) → STUDY-PILOT-with-due-diligence, not secondary. Anthropic-native baseline (Tertiary) **stands** — correct. |
| §5 head-to-head matrix listing mem0 LongMemEval 94.4% as "crown" | **RETRACTED** | No memory engine has an independently-reproduced LongMemEval number; the top three (OMEGA 95.4 / Mastra 94.87 / Hindsight ~94.6) are a `[SELF-REPORTED]` statistical tie. Hindsight is the corrected primary on **native-CC integration + MIT + Windows** — NOT on a benchmark crown. |
| §0 Class B framing of mem0/MemPalace as the top install candidates | **PARTIALLY RETRACTED** | The entire OMEGA / Mastra OM / Hindsight top tier was **MISSED by Wave-1 AND Wave-2**. Wave-2's candidate set was incomplete. |

### §6.2 — What Wave-2 got RIGHT (retained)

- claude-mem Windows hard-fail (§4.1) — **correct**, retained.
- Cipher/ByteRover benchmark = single-publisher self-attestation (§4.5) — **correct**, retained.
- Anthropic-native Memory Tool / Auto Dream as the zero-trust baseline (§6 Tertiary) — **correct**, retained and promoted to L1 in §5.
- Graphiti = HOLD-until-temporal-need-surfaces (§6) — **correct**, retained as L1.5 temporal adjunct.
- mem0's Pre-Compaction hook is genuinely useful — **true**, but a useful hook does not rescue a 49% engine; the *hook pattern* is what's worth keeping (and Hindsight + OMEGA + cognee all have PreCompact hooks too).

### §6.3 — What W259 Wave-1 Layer-A got RIGHT (and Wave-2 broke)

Wave-1 `LAYER-A-memory-rag-vector-kg.md` §4 listed **`mem0 ... LongMemEval 49.0% (vectorize.io)`** — the correct independent number, correctly attributed. **Wave-2 overwrote it with mem0's marketing number.** This document **restores Wave-1's correct figure.** Lesson for future waves: when a vendor's self-reported number and an independent evaluation disagree by 45 points, the independent number wins, and "DeepWiki says so" is not independent if DeepWiki is reading the vendor's own README.

### §6.4 — Net replacement

> **W259 memory layer L1.5: mem0-PRIMARY → RETRACTED. New primary = `vectorize-io/hindsight`** — it wins on INTEGRATION: the only memory engine with a full native-CC plugin (hooks + MCP + subagent skill), MIT, Windows-verified, zero-cloud, already installed. Its ~94.6% LongMemEval is `[SELF-REPORTED]` like every engine's (W259-v16 correction: NOT independently reproduced — VA-Tech/WaPo co-authored hindsight's arXiv 2512.12818). **OMEGA (95.4%, `[SELF-REPORTED]`, Windows-untested) and CaviraOSS/OpenMemory and doobidoo/mcp-memory-service enter the pilot lane. Mastra Observational Memory = pattern-cite (no native CC plugin — OpenCode-wired). Graphiti retained as temporal adjunct. mem0 demoted to T3.**

---

## §7 — Document boundary

- **Total memory repos reconciled:** ~58 distinct entries (Tier 0: 9 · Tier 1: 18 · Tier 2: 9 · Tier 3: 8 · Tier 3B: ~14). Wave-2 covered 16; Wave-1 Layer-A §4 covered 10.
- **Benchmark-methodology error resolved:** LoCoMo (~9k tokens, easier, mem0-favored, 93.57% corrupted ceiling) vs LongMemEval (115k–1.5M tokens, canonical hard benchmark, ICLR 2025). mem0 markets LoCoMo + a SaaS-only unreproducible LongMemEval number; independent LongMemEval = **49%**.
- **3 W259-MISSED winners forensically verified:** OMEGA (Apache-2.0, fully local, Windows-UNTESTED, single-author/~110★, `[SELF-REPORTED]` 95.4% → STUDY-PILOT) · Mastra OM (Apache-2.0 core, OpenCode-wired/NO native CC, 94.87% → PATTERN-CITE) · **Hindsight (MIT, Windows-verified, native CC plugin+hooks+MCP+subagent skill, `[SELF-REPORTED]` ~94.6% — W259-v16: NOT independently reproduced — → T1 INSTALL primary on integration completeness).**
- **VILA-Lab/Dive-into-Claude-Code VERIFIED** as a legitimate architectural reference doc (source-level analysis of CC v2.1.88; documents the file-based memory / 5-scope CLAUDE.md / 27 hook events / subagent isolation / 5-shaper compaction). Operator's "required reading" flag is justified — it is a *map*, not a memory system, and its core lesson (CC uses transparent file memory, rejects opaque vector DBs) anchors §5's L1-baseline-is-not-replaceable principle.
- **Cross-model consensus gate (CR-3):** single-agent Wave-4 audit. codex T1 Path P review required before Hindsight is committed to `.mcp.json` + `.claude/settings.json`.

**Artifact:** `Z:\claude-sota-installed\docs\architecture\W259-grand-catalog\03-deepdive\MEMORY-LAYER-RECONCILED-W259v4.md`
