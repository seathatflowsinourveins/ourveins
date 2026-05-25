# W301 Wave — SOTA Memory Architecture DESIGN + Benchmark Suite Audits + 41-Paper Neuroscience Architecture

> **Wave**: W301 (operator follow-up to W300 — DESIGN-class wave: synthesize sca-v5 + W297-B per-tier + W300 alternatives + benchmark suites + 41-paper neuroscience architecture into next-generation memory architecture spec).
>
> **Branch**: `sota-converge-w295` (continued).
>
> **Operator dimensions (W301 verbatim)**:
> 1. Audit `https://github.com/rohitg00/agentmemory/tree/main/benchmark` — memory benchmark suite
> 2. Audit `https://github.com/MemPalace/mempalace/tree/develop/benchmarks` — memory benchmark suite
> 3. Implicit (per hindsight memory): `rohitg00/awesome-claude-code-toolkit/memory_layer` — 41-paper neuroscience-flavored memory architecture (thermodynamic decay + PostgreSQL + pgvector + 6 hooks + causal chains)
> 4. "research all sota memory architecture with advanced muti angle research convergence"
> 5. "design the sota memory architecture" — DESIGN OUTCOME (not just discovery)

## §0 — Pre-flight state

| Component | State |
|---|---|
| HEAD | post-W300-codex-r1 fix-iterate (`/log --oneline` confirms) |
| sca-v5 LIVE | applied to basic-memory in W300 Stream A (install_score 3.81 T2) |
| Current 6-tier memory | T1 hindsight (qwen36 LLM) · T2 memory-MCP (split) · T3 cognee (Kuzu archived risk) · T4 graphiti (RETIRED) · T5 langfuse · T6 basic-memory (T2 HARDEN) |
| W300 alternatives surfaced | Memori 3.85 · memsearch 3.75 · supermemory 3.73 · ShinkaEvolve 3.60 · honcho 3.55 (Top-5 from 36 NEW) |
| W300 NEW operator-AIs | basic-memory NOT pinned per W286 P0C; cognee Kuzu archived upstream Oct 2025; OpenSSF Scorecard not run |
| 41-paper neuroscience arch | per hindsight memory: `rohitg00/awesome-claude-code-toolkit/memory_layer` — thermodynamic decay + PostgreSQL + pgvector + 6 hooks + causal chains (UNAUDITED) |

## §1 — Streams (4 parallel; file-ownership disjoint)

| Stream | Type | Scope | File ownership | Done criteria |
|---|---|---|---|---|
| **A** | benchmark-suite audit | **`rohitg00/agentmemory/benchmark`** — multi-MCP cascade audit; what benchmark tasks? what metrics (LongMemEval/LoCoMo/MemGPT/custom)? can we integrate as Lane-C executable rubric for memory candidates? license + harness-fit + cardinal-rule-2 compliance for any hook-integration? | `W301-STREAM-A-AGENTMEMORY-BENCHMARK-AUDIT.md` | Per-benchmark metric inventory + harness-fit verdict + integration cost-estimate + sca-v5 lite-score |
| **B** | benchmark-suite audit | **`MemPalace/mempalace/benchmarks`** — same scope as A; cross-compare with rohitg00; surface disagreements | `W301-STREAM-B-MEMPALACE-BENCHMARK-AUDIT.md` | Per-benchmark inventory + cross-compare matrix vs A + harness-fit verdict |
| **C** | architecture deep-read | **`rohitg00/awesome-claude-code-toolkit/memory_layer`** — 41-paper neuroscience-flavored architecture; extract: thermodynamic-decay mechanism + PostgreSQL+pgvector schema + 6 hooks list + causal-chains design + 41-paper bibliography ; map each pattern to current 6-tier or NEW tier | `W301-STREAM-C-NEUROSCIENCE-MEMORY-ARCH.md` | 6-hook inventory + decay-mechanism + schema sketch + 41-paper bibliography + per-pattern transfer-to-current-runtime verdict |
| **D** | DESIGN synthesis | **Next-generation SOTA memory architecture DESIGN** — synthesize all of: W297-B per-tier verdicts + W300 alternatives + W301-A/B benchmark suites + W301-C 41-paper architecture + sca-v5 evidence. Produce: target-state memory architecture (6-tier evolution OR 8-tier OR collapse-and-rebuild); migration path from current state; per-tier decision (KEEP/SWAP/HARDEN/RETIRE/NEW); benchmark-driven validation plan | `W301-STREAM-D-SOTA-MEMORY-DESIGN.md` | Target architecture diagram + per-tier verdict + migration path + benchmark validation plan + cardinal-rule self-check |

**Coordinator (self)**: synthesis → `W301-AUDIT-2026-05-18.md` → codex r1 e2e → ship-chain commit.

## §2 — File ownership

- `W301-PLAN.md` — coordinator
- `W301-STREAM-A-AGENTMEMORY-BENCHMARK-AUDIT.md` — Stream A
- `W301-STREAM-B-MEMPALACE-BENCHMARK-AUDIT.md` — Stream B
- `W301-STREAM-C-NEUROSCIENCE-MEMORY-ARCH.md` — Stream C
- `W301-STREAM-D-SOTA-MEMORY-DESIGN.md` — Stream D
- `W301-AUDIT-2026-05-18.md` — coordinator
- `W301-CODEX-R1.md` — coordinator

NO stream edits: `CLAUDE.md`, `.claude/settings.json`, `.mcp.json`, `.claude/skills/sota-convergence-audit/SKILL.md`, `VERDICT-LEDGER.md` — operator-approval-gated.

**Stream D is DESIGN-class** (not execution). It produces a target-state spec + migration path. Actual implementation (e.g. shipping the 41-paper memory tier) requires operator approval downstream.

## §3 — Anti-bias mandates (carried + W301-specific)

- sca-v5 18-dim cascade per W297-D + W299-B + W300-C pattern (≥6 MCP families per audit; cost-cap $0.50 T3 / $2 T2 / $5 T1)
- Stars NOT a hardgate (named candidates `rohitg00/agentmemory` + `MemPalace/mempalace` likely <1k★; D12 caps at 3 if only stars)
- ≥3 organisationally-distinct sources per candidate
- 2026-MAY freshness MANDATE (41-paper bibliography acceptable as PATTERN-STUDY tier evidence even if some papers pre-2026)
- Source disagreements MUST surface in `sources_typed.<dim>.disagreement[]`
- **W301-specific**: Stream D MUST cite ≥3 EXTERNAL research-arch convergence points for the proposed design (per W299-C research-the-researchers pattern). E.g. Cochrane evidence-synthesis · ThoughtWorks Radar · CNCF graduation criteria.

## §4 — Cite-anchors

- `W297-STREAM-B-MODEL-IN-MEMORY-MATRIX.md` — 6-tier verdicts
- `W300-STREAM-A-BASIC-MEMORY-SCA-V5-AUDIT.md` — basic-memory T2 HARDEN
- `W300-STREAM-B-MEMORY-LAYER-COMPARISON.md` — 11-candidate head-to-head
- `W300-STREAM-C-BROADER-MEMORY-SOTA-DISCOVERY.md` — 36 NEW candidates incl Memori/memsearch/supermemory
- `.claude/skills/sota-convergence-audit/SKILL.md` — sca-v5 LIVE rubric (18-dim cascade + 3-target ledger)
- `docs/architecture/W288-RESEARCH-ARCH-v2/VERDICT-LEDGER.md` — 18 historical verdicts incl. mem0 + planning-with-files
- Hindsight memory T1 episode on `rohitg00/awesome-claude-code-toolkit/memory_layer` 41-paper architecture
- External: `github.com/rohitg00/agentmemory` (W301-A target) · `github.com/MemPalace/mempalace` (W301-B target) · `github.com/rohitg00/awesome-claude-code-toolkit/tree/main/memory_layer` (W301-C target)

## §5 — Verification-on-completion

Each stream MUST end with:
- File written + LOC
- ≥3 cite-anchors
- Top 3 findings + confidence levels
- Source-disagreement log
- Cardinal-rule self-check
- Items routed to W301-AUDIT synthesis

Stream D's target-architecture proposal MUST include:
- Per-tier KEEP/SWAP/HARDEN/RETIRE/NEW verdict (using current 6-tier as baseline)
- Migration path (per-tier; reversible; smoke test per sca-v5 rollback contract)
- Benchmark validation plan (cite W301-A or W301-B suite if integration warranted)
- ≥3 external research-arch convergence anchors (W299-C pattern)
- Cardinal-rule self-check on proposed design (no new self-invent hooks; CR-2 compliant; W286 P0C compliant for any NEW MCP servers introduced)
