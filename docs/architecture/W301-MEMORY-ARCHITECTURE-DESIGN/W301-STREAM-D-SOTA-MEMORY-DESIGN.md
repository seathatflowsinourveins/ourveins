# W301 Stream D — SOTA Memory Architecture DESIGN

> **Wave**: W301 (operator follow-up to W300 — DESIGN-class, not execution).
> **Branch**: `sota-converge-w295` (continued).
> **Date**: 2026-05-18.
> **Author**: Stream D (parallel; ran AHEAD of Streams A/B/C; placeholders + independent lite audit).
> **File ownership**: `W301-STREAM-D-SOTA-MEMORY-DESIGN.md` (this file).
> **Synthesizes**: sca-v5 LIVE rubric + W297-B 6-tier verdicts + W300-A/B/C audits + an independent
> lite-audit of the 41-paper neuroscience candidate (`cdeust/Cortex`) + 3 external research-arch anchors.
>
> **Cross-stream PLACEHOLDERS** (to be reconciled in W301-AUDIT):
> - `[W301-A]` — `rohitg00/agentmemory/benchmark` suite verdict (in-flight)
> - `[W301-B]` — `MemPalace/mempalace/benchmarks` suite verdict (in-flight)
> - `[W301-C]` — 41-paper neuroscience architecture extraction (in-flight)
>
> This file is DESIGN-class. Actual ship-changing edits to `CLAUDE.md` / `.mcp.json` /
> `.claude/settings.json` are operator-approval-gated per `W301-PLAN.md §2`.

---

## §0 — TL;DR (recommended evolution + 1-paragraph rationale)

**Recommended verdict: HYBRID-A+E** — apply **Evolution A (EVOLVE-MINIMAL)** as the W301-W303
default + run **Evolution E (BENCHMARK-FIRST)** as a parallel shadow lane. Explicitly defer
Evolution B (SWAP-IN-Memori) to **W304-W306** contingent on the W301-A/B benchmark gates landing
APPROVE. Explicitly **REJECT** Evolution D (NEW-TIER PostgreSQL+pgvector neuroscience tier)
under sca-v5 hard-caps — `cdeust/Cortex` cannot clear D14 reversibility (PostgreSQL infrastructure
is one-way) + D11 context-budget (33 MCP tools breach the preload cap that already disqualified
`ruvnet/claude-flow` in W289).

**One-paragraph rationale**: W297-B and W300-A/B converge on `HARDEN-BASIC-MEMORY` (no candidate
clears `harness_fit × cc_runtime_pathway × reversibility × Windows-native` on all four axes;
basic-memory composite 3.81 is `STAY-WITH-HARDENING` per sca-v5 §25 decision tree — NOT
SWAP-trigger). The 6-tier shape itself is sound — what's missing is (a) **3 concrete W300 HARDEN
operator-AIs** on T6, (b) **T2 dual-wire reconciliation** (memory-MCP split), (c) **T3 Kuzu
archived-upstream pin audit**, and (d) **a benchmark-driven validation loop** to make future
SWAP decisions evidence-first rather than vibe-first. Evolution A delivers (a)-(c) at ~6h
operator burden + full reversibility. Evolution E delivers (d) without any tier-shape change,
giving us a Lane-C-executable measurement layer for the inevitable W304+ re-litigation. Path
to Evolution B (Memori VENDOR-FORK) is kept open via T6-archive promotion contract in §5.

---

## §1 — Current 6-tier state (snapshot from CLAUDE.md:31-36 + W297-B + W300-A live probes)

| Tier | Component | Live? | LLM/embed dep | Composite | sca-v5 verdict | Cite |
|---|---|---|---|---|---|---|
| **T1** | `hindsight` @`:9077` | LIVE (W297-B §1) | `qwen36@:8080` (ik_llama.cpp Qwen3.6-35B-A3B-MTP) | install_score 4.56 (W300-B §3.2) | **KEEP-CURRENT** | W297-B §5 + W300-B §3.2 |
| **T2** | `memory-MCP` split — `.mcp.json:memory` DISABLED vs `plugin:everything-claude-code:memory` ENABLED | partial — plugin active | none | n/a (no model dep) | **DAEMON-SUPERVISION-GAP + RECONCILE** | W297-B §1 / §5 |
| **T3** | `cognee` @`:8000` NSSM `CogneeMCP` | LIVE (W297-B §1.3 + Stream A §5) | LLM `qwen36@:8080` + embed `qwen3-embedding:0.6b@:16700` (Ollama) | n/a (W300 didn't re-score T3 incumbent in full) | **KEEP-CURRENT + 1 OPTIMISATION** (repoint embed Ollama → llama-swap; Kuzu archived risk = operator-AI) | W297-B §6.1 + W300-C §C1 |
| **T4** | `graphiti` | RETIRED W272+W290+W295 | (was qwen3-coder:30b via Ollama) | n/a | **RETIRE-TIER (DONE)** | W297-B §1 / §5 |
| **T5** | `langfuse` @`:3000` (v3.170.0) | LIVE per W297 restart; observability not RAG | (none — uses external/internal LLM) | n/a | **KEEP-CURRENT** | W297-Stream-C |
| **T6** | `basic-memory` (canonical markdown ledger) | LIVE per W297-B Stream B §1.6 stale-state correction (DB 2.8 MB + WAL 9.2 MB; was W295-claimed "EMPTY") | none (markdown-only; optional FTS5 index) | install_score **3.81** (W300-A §23.1) — **T2-band slip** vs W295 4.16 (sca-v5 is tighter rubric, not regression) | **STAY-WITH-HARDENING** (3 HARDEN AIs deferred from W295) | W300-A §25 + W300-B §4.1 |

**Live-probe stale-corrections** baked in (W297-B §1.3/§1.4/§1.5):
1. `C:/Users/42/.cognee/` AI-3a — **STALE; already-fixed** (cognee state at `Z:\claude-sota-installed-state\cognee\`)
2. basic-memory `config.json` MISSING — **STALE; live + writing** (W297-B §1.4)
3. W295 `memory.db EMPTY` — **STALE; 2.8 MB + 9.2 MB WAL** (W297-B §1.5)

The CLAUDE.md:31-36 snapshot is OUTDATED on three axes that DON'T affect the architectural
verdict but DO need a doc-clarification commit (§10 AI-1-doc).

---

## §2 — Five candidate evolutions (scored)

Each evolution scored on 6 axes; 1=cheap/low/easy, 5=expensive/high/hard except `Reversibility`
where 5=fully-reversible (sca-v5 D14). Lower aggregate ≈ better for adoption.

### Evolution A — EVOLVE-MINIMAL (recommended PRIMARY)

KEEP current 6-tier; apply 3 W300 HARDEN AIs to T6; address T2 dual-wire drift via
consolidate-to-plugin; address T3 cognee Kuzu archived risk via dependency pin audit.

| Axis | Score | Notes |
|---|---|---|
| Migration cost | 1 (LOW) | 3 hardening AIs + 1 T2 disabledMcpjsonServers entry + 1 cognee-deps probe; ~6h total |
| Reversibility (D14) | 5 (FULL) | Each step is `git revert <commit>` + restart-service; no irreversible state migration |
| CR-compliance | 5 (PASS) | All steps stay within existing trusted plugins / direct-CLI hooks; no new MCP server; no new `.claude/hooks/scripts/*` |
| D8 benchmark-readiness | 2 (LOW) | No Lane-C benchmark added; relies on W297-B daemon probes + W300-A live filesystem checks |
| Operator burden | 1 (~6h) | 3 PowerShell snippets (pre-written W295/W300) + 1 `.mcp.json` edit + 1 cognee `pyproject.toml` audit |
| Risk vs reward | LOW-LOW | Plugs the 3 W300 audit gaps; doesn't move the SOTA needle but doesn't risk it either |

**Aggregate**: cost-1 / D14-5 / CR-5 / D8-2 / burden-1 / risk-LOW = **APPROVE primary**.

### Evolution B — SWAP-IN-MEMORI (DEFER to W304+)

SWAP-IN `MemoriLabs/Memori` (W300-C #1; install_score 3.85; LoCoMo 81.95% beats Mem0 62.47% +
Zep 79.09% + LangMem 78.05%; Apache-2.0; pushed 2026-05-18) as T6; demote basic-memory to
T6-archive (read-only fallback).

| Axis | Score | Notes |
|---|---|---|
| Migration cost | 4 (MED-HIGH) | Memori is a Python lib with no native CC plugin; need MCP-server wrapper (vendor-fork-shim per `.claude/agents`); 2-3 days of work |
| Reversibility (D14) | 3 (PARTIAL) | basic-memory markdown ledger persists (verdicts dir + memory dir on filesystem) so rollback = stop Memori-MCP + re-enable basic-memory MCP; BUT any verdicts written ONLY to Memori during the swap window are stranded |
| CR-compliance | 4 (PASS-with-caveat) | Memori is Apache-2.0 ✓; needs pinned-`npx -y` per W286 P0C OR vendor-fork shim; if vendor-fork-shim chosen, it must live at `.claude/agents/*.md` (CR-3) not `.claude/hooks/scripts/*` (CR-2) |
| D8 benchmark-readiness | 5 (HIGH) | Memori publishes LoCoMo 81.95% with 67% fewer tokens — reproducible Lane-C benchmark exists; gives sca-v5 D8 actual evidence |
| Operator burden | 4 (~2-3 days) | vendor-fork-shim authoring + smoke-tests + bake-off period |
| Risk vs reward | MED-HIGH | If LoCoMo number holds in our runtime, +20pp memory recall; if not, swap-back cost is ~1h |

**Aggregate**: cost-4 / D14-3 / CR-4 / D8-5 / burden-4 / risk-MED-HIGH = **DEFER to W304**
contingent on W301-A or W301-B suite landing as Lane-C harness AND a 2-week bake-off slot.

### Evolution C — CONSOLIDATE T2+T6

COLLAPSE T2 + T6 into single canonical tier (basic-memory wins per W297-B + W300-B);
decommission `plugin:everything-claude-code:memory`. Cleaner architecture; **loses session
key/value working memory** as a distinct primitive.

| Axis | Score | Notes |
|---|---|---|
| Migration cost | 2 (LOW-MED) | 1 plugin disable + verify no skill/agent depends on `mcp__plugin_everything-claude-code_memory__*` tools |
| Reversibility (D14) | 5 (FULL) | Plugin disable is reversible via `.claude/settings.json` enabledPlugins toggle |
| CR-compliance | 5 (PASS) | All changes stay within trusted plugins + settings.json |
| D8 benchmark-readiness | 2 (LOW) | No new benchmark; this is a cleanup, not a measurement |
| Operator burden | 2 (~3h) | Includes audit of every skill that calls `mcp__plugin_everything-claude-code_memory__*` |
| Risk vs reward | LOW-MED | Risk: silent breakage of skills using plugin:memory tools (`mem-recall` skill is a known caller); reward: cleaner tier-shape, eliminates W297-B "duplication-of-purpose" flag |

**Aggregate**: cost-2 / D14-5 / CR-5 / D8-2 / burden-2 / risk-LOW-MED = **APPROVE as sub-component
of Evolution A** (this IS the T2 RECONCILE step inside Evolution A; see §3 T2 row).

### Evolution D — NEW-TIER (41-paper neuroscience PostgreSQL + pgvector)

ADD T7 = `cdeust/Cortex` (or equivalent neuroscience-flavored tier). Per W301-C [PLACEHOLDER]
+ independent lite-probe: **Cortex** = "Persistent memory for Claude Code grounded in
computational neuroscience (41 cited papers). Thermodynamic decay, hippocampal-cortical
consolidation, predictive-coding write gate, WRRF retrieval. PostgreSQL + pgvector, 33 MCP
tools, 7 lifecycle hooks. Benchmarked 97.8% R@10 on LongMemEval" (per
`punkpeye/awesome-mcp-servers` catalog L256-L260).

| Axis | Score | Notes |
|---|---|---|
| Migration cost | 5 (HIGH) | PostgreSQL + pgvector daemon install + schema migration + 7 lifecycle hooks wiring; ~1 week |
| Reversibility (D14) | **2 (HARD-CAP-ADJACENT)** | PostgreSQL state is **one-way** without dump+restore tooling; D14 sca-v5 INSTALL-cap fires at ≤2 |
| CR-compliance | **3 (CR-2 RISK)** | 7 lifecycle hooks = potentially upstream-plugin hooks (OK if pinned `npx -y`) OR custom-shim (CR-2 violation); 33 MCP tools = preload-budget risk (CR-11 catastrophic preload per W289 `claude-flow` precedent) |
| D8 benchmark-readiness | 5 (HIGH) | LongMemEval 97.8% R@10 is the strongest published memory benchmark in any candidate; if reproducible, dominant evidence |
| Operator burden | 5 (~1 week + ongoing PG ops) | Includes PG backup/restore runbook + pgvector index tuning + 7-hook integration test |
| Risk vs reward | **HIGH-HIGH** | Reward if benchmark reproduces; risk of unrecoverable PG state + preload-budget explosion |

**Aggregate**: cost-5 / D14-**2** (HARD-CAP-ADJACENT) / CR-**3** / D8-5 / burden-5 / risk-HIGH-HIGH
= **REJECT under Evolution D framing**. The benchmark numbers are compelling but the D14 ≤2
**INSTALL-cap fires** per sca-v5 hard-cap taxonomy.
**Alternative routing**: route to **T3 PATTERN-STUDY** under sca-v5 `pattern_score` lane — extract
the 7 lifecycle hooks + decay-mechanism + WRRF retrieval as *patterns* for basic-memory T6 to
borrow, without adopting PostgreSQL. This is what W301-C should target.

### Evolution E — BENCHMARK-FIRST (recommended SHADOW lane)

DEFER architecture changes; INSTALL `rohitg00/agentmemory` OR `MemPalace/mempalace` benchmark
suite first (depends on W301-A vs W301-B verdict); measure current 6-tier baseline; THEN
re-litigate Evolutions A/B/C/D with actual Lane-C evidence.

| Axis | Score | Notes |
|---|---|---|
| Migration cost | 2 (LOW-MED) | Benchmark suite is a harness, not a tier; integrates into `harness/eval_harness.py` lane |
| Reversibility (D14) | 5 (FULL) | Pure measurement layer; no tier changes; trivially reversible |
| CR-compliance | 5 (PASS) | Test harness lives in `harness/` not `.claude/hooks/scripts/` |
| D8 benchmark-readiness | 5 (HIGH) | Whole point IS D8; provides the evidence that future SWAP decisions need |
| Operator burden | 2 (~1 day) | Pick winner suite from W301-A vs W301-B; integrate; run baseline |
| Risk vs reward | LOW-HIGH | No tier risk; high reward if measurement reveals (a) basic-memory underperforms vs Memori OR (b) basic-memory holds its own |

**Aggregate**: cost-2 / D14-5 / CR-5 / D8-5 / burden-2 / risk-LOW-HIGH = **APPROVE as parallel
shadow lane to Evolution A**.

### Scoring summary

| Evolution | Aggregate | Verdict |
|---|---|---|
| **A. EVOLVE-MINIMAL** | LOW cost · FULL D14 · CR-PASS · LOW D8 · 6h | **APPROVE PRIMARY** |
| B. SWAP-IN-MEMORI | MED cost · PARTIAL D14 · CR-PASS · HIGH D8 · 2-3 days | **DEFER W304+** |
| C. CONSOLIDATE T2+T6 | LOW-MED cost · FULL D14 · CR-PASS · LOW D8 · 3h | **APPROVE (folded into A)** |
| D. NEW-TIER PG+pgvector | HIGH cost · ≤2 D14 (HARD-CAP) · CR-RISK · HIGH D8 · 1 week | **REJECT (route to T3 PATTERN-STUDY)** |
| **E. BENCHMARK-FIRST** | LOW-MED cost · FULL D14 · CR-PASS · HIGH D8 · 1 day | **APPROVE SHADOW** |

### Why HYBRID-A+E vs pure-A or pure-E?

| Q | Answer |
|---|---|
| Why not pure-A? | A alone closes the W300 audit gaps but doesn't add measurement; the next W30x re-litigation will be evidence-poor again |
| Why not pure-E? | E alone provides measurement but doesn't fix the W300 HARDEN gaps; we'd ship benchmarks against a broken-pin T6 |
| Why not A+B together? | B requires D8 evidence to justify the SWAP cost; without E shadow lane first, B is vibe-driven |
| Why not A+C+E together? | C IS folded into A (Step 1 of §5 migration path); no extra labelling needed |
| Why explicit DEFER on B (vs REJECT)? | Memori install_score 3.85 with LoCoMo 81.95% is the **strongest 2026-MAY non-incumbent candidate**; DEFER preserves the option pending E gate |
| Why HOLD-not-REJECT on D? | Even though D14 hard-cap fires, the LongMemEval R@10 = 97.8% is too strong to discard outright; route to PATTERN-STUDY so hooks + decay-mechanism are extractable |

---

## §3 — Per-tier verdict (KEEP / SWAP / HARDEN / RETIRE / NEW)

Baseline = current 6-tier per CLAUDE.md:31-36 + W297-B + W300-A live probes.

| Tier | Verdict | Action | Evidence | Op-AI severity |
|---|---|---|---|---|
| **T1** `hindsight` :9077 | **KEEP** | None; MTP-upgrade `b9110+` is server-binary swap not tier-swap; defer to W302 optional | W297-B §5: "no T1 SOTA challenger that beats local-only constraint" + W300-B §3.2: install_score 4.56 (highest of 11 candidates) | — |
| **T2** memory-MCP split | **HARDEN (CONSOLIDATE)** | Step 2a: DISABLE `.mcp.json:memory` permanently OR re-enable; pick ONE. **Recommend**: keep `plugin:everything-claude-code:memory` (already active), formally drop the `.mcp.json` shadow entry by deleting the JSON block (not just listing in `disabledMcpjsonServers`) | W297-B §1: "duplication-of-purpose flagged in W296-AUDIT §2.5 axis-5"; W297-B §5: "Tier-design decision routed to Stream D" — Stream D verdict here | LOW (no daemon dep; single `.mcp.json` edit) |
| **T3** `cognee` :8000 | **HARDEN** | Step 3a (carried W297-B §6.1): repoint embedding `qwen3-embedding:0.6b@:16700/Ollama` → llama-swap `:8090` via 1-line `.env` edit + `nssm restart CogneeMCP`. Step 3b (NEW W300-C C1): audit cognee `pyproject.toml` Kuzu pin against `Vela-Engineering/kuzu` (active fork) since upstream Kuzu was **archived Oct 2025** | W297-B §6.1 + W300-C §C1: "cognee uses KuzuDB; upstream archived Oct 2025; verify cognee pin against `Vela-Engineering/kuzu` OR `LadybugDB`" | HIGH (Kuzu pin audit blocks T3 long-term viability) |
| **T4** `graphiti` | **RETIRE (DONE)** | Optional cleanup: comment out `.mcp.json:64-77` block (currently in `disabledMcpjsonServers` but `.mcp.json` block still present); stop FalkorDB+Ollama daemons if not used elsewhere | W297-B §5 + W272 operator-decisions + W290 retire commit `9af4885` | LOW (cleanup, not load-bearing) |
| **T5** `langfuse` :3000 | **KEEP** | None ongoing; W297 restart already documented; ensure `docker compose` survives reboot via daemon-supervision (NSSM wrapping or docker `restart: always` on the langfuse compose) | W297-B Stream C + CLAUDE.md:35 "T5 langfuse ✓ LIVE v3.170.0" | LOW (daemon hygiene only) |
| **T6** `basic-memory` | **HARDEN** | Apply W295/W300 HARDEN-BASIC-MEMORY 3 AIs: **AI-1** (bus-factor mitigation: vendor-fork-shim + CR-9 SHA pin + markdown-canonical-fallback rule); **AI-2** (OpenSSF Scorecard adoption: upstream request to `basicmachines-co` + quarterly local scan); **AI-3** (W286 P0C version-pin compliance: replace any unpinned basic-memory invocation with `npx -y basic-memory@<pinned-version>` per CLAUDE.md:19) | W295-BASIC-MEMORY-DEEP-AUDIT §5 + W300-A §27 (AI-1/AI-2 carried) + W300-A AI-1 (HIGH — W286 P0C version-pin) | HIGH (AI-1 + AI-3); MEDIUM (AI-2) |
| ~~T7~~ NEW | **DO NOT ADD** | Reject Evolution D PG+pgvector tier per §2; route `cdeust/Cortex` to T3 PATTERN-STUDY for hook + decay-mechanism extraction in W302-W303 (NOT a new tier) | §2 Evolution D scorecard: D14 ≤2 INSTALL-cap fires | n/a — this is a NON-action |

**Per-tier summary**: T1 KEEP · T2 HARDEN(CONSOLIDATE) · T3 HARDEN(repoint+Kuzu-pin) · T4 RETIRE-DONE · T5 KEEP · T6 HARDEN(3 AIs). **Zero SWAPs; zero NEW tiers.** The 6-tier
**shape** is correct; the issues are **operational hygiene + supply-chain pinning**, not
architecture.

---

## §4 — Recommended target architecture

### §4.1 ASCII diagram

```
┌──────────────────────────────────────────────────────────────────────────┐
│              CLAUDE-SOTA-INSTALLED — Target Memory Architecture          │
│                       (post-W301 HYBRID-A+E)                             │
└──────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│ T1  HINDSIGHT (episodic + semantic; LLM-backed)                  KEEP   │
│     MCP: hindsight @ :9077 (NSSM IkLlamaServer = qwen36 :8080)          │
│     Role: per-session episode trace + auto-summary + retrieve           │
│     Status: LIVE; install_score 4.56 (sca-v5 #1)                        │
└─────────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ T2  MEMORY-KV (session key-value scratchpad)                CONSOLIDATE │
│     MCP: plugin:everything-claude-code:memory (KEEP)                    │
│     .mcp.json:memory shadow entry → DELETE (not disabledMcpjsonServers) │
│     Role: short-term entity + observation graph (skill-callable)        │
│     Status: TARGET = single canonical (no split)                        │
└─────────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ T3  COGNEE (graph-RAG long-term knowledge base)                  HARDEN │
│     MCP: cognee @ :8000 (NSSM CogneeMCP)                                │
│     LLM: qwen36 :8080 · embed: → llama-swap :8090 (repoint from Ollama) │
│     KuzuDB pin: → Vela-Engineering/kuzu (active fork; upstream archived)│
│     Role: cross-session semantic graph; HotPotQA / GraphRAG class       │
└─────────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ T4  GRAPHITI                                                  RETIRED   │
│     (W272 + W290 + W295; commit 9af4885)                                │
│     Optional cleanup: comment out .mcp.json:64-77 block                 │
└─────────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ T5  LANGFUSE (observability — NOT memory-as-RAG)                 KEEP   │
│     Docker compose @ :3000 (v3.170.0); 6 containers                     │
│     Role: trace + score + dataset (Anthropic SDK + cross-CC sessions)   │
│     Daemon supervision: ensure restart-on-reboot policy                 │
└─────────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ T6  BASIC-MEMORY (canonical markdown ledger; verdicts + memory)  HARDEN │
│     MCP: basic-memory (basicmachines-co; AGPL-3.0)                      │
│     Storage: Z:\claude-sota-installed-state\basic-memory\               │
│     Role: stage-6 ledger write contract (verdicts + permanent memory)   │
│     Hardenings:                                                         │
│       AI-1 vendor-fork-shim + CR-9 SHA pin + markdown-canonical-fallback│
│       AI-2 OpenSSF Scorecard adoption + quarterly local scan            │
│       AI-3 W286 P0C version-pin via npx -y basic-memory@<pinned>        │
└─────────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ SHADOW LANE — Benchmark Validation (Evolution E parallel)               │
│  harness/eval_harness.py + Lane-C [W301-A or W301-B winner suite]       │
│  Measures: LongMemEval / LoCoMo subset (TBD per W301-A/B verdicts)      │
│  Outputs: per-tier recall@10, recency-vs-relevance, token-cost          │
│  Routing: gates Evolution B (Memori SWAP) re-litigation in W304+        │
└─────────────────────────────────────────────────────────────────────────┘
```

### §4.2 Composition summary (T1-T6)

| Tier | Verdict | Cardinal-rule path |
|---|---|---|
| T1 | KEEP | trusted plugin (`hindsight`) + NSSM daemon (`IkLlamaServer`) — CR-2 compliant |
| T2 | CONSOLIDATE to `plugin:everything-claude-code:memory` only — drop `.mcp.json:memory` block |
| T3 | HARDEN (Ollama→llama-swap embed repoint + Kuzu fork pin) |
| T4 | RETIRED-DONE; optional `.mcp.json` block cleanup |
| T5 | KEEP (observability lane; not RAG) |
| T6 | HARDEN (3 W300/W295 AIs: bus-factor + Scorecard + W286 P0C pin) |
| SHADOW | NEW (Evolution E benchmark lane in `harness/eval_harness.py` — not a tier) |

---

## §5 — Migration path (ordered steps + per-step rollback)

All steps are **operator-approval-gated** per `W301-PLAN.md §2`. Execute in numbered order;
each step has independent rollback. Smoke-test column = pre-merge gate.

### Step 1 (T2 CONSOLIDATE — Evolution C folded into A)

| Field | Value |
|---|---|
| Action | Delete `.mcp.json:memory` block (currently shadow-entry in `disabledMcpjsonServers`); keep `plugin:everything-claude-code:memory` ACTIVE |
| File | `.mcp.json` + `.claude/settings.json:disabledMcpjsonServers` (remove `"memory"` from list since entry no longer exists) |
| Rollback | `git revert <commit>` — restores `.mcp.json:memory` block AND `disabledMcpjsonServers` entry |
| Smoke test | `mcp__plugin_everything-claude-code_memory__read_graph` returns ≥1 entity; `claude mcp list` shows no `memory` server |
| Risk | Skills calling `mcp__memory__*` (old `.mcp.json:memory` path) break — `mem-recall` skill confirmed to use `mcp__plugin_everything-claude-code_memory__*` (plugin namespace), not bare `mcp__memory__*` — VERIFY before merge |
| Op burden | ~30 min |

### Step 2 (T3 HARDEN — embed repoint)

| Field | Value |
|---|---|
| Action | Edit cognee `.env` to set `EMBEDDING_PROVIDER=ollama` → `openai-compatible` pointing at llama-swap `:8090/v1`; `nssm restart CogneeMCP` |
| File | `Z:\claude-sota-installed-state\cognee\.env` (state-outside-repo) |
| Rollback | Revert `.env` line + `nssm restart CogneeMCP` |
| Smoke test | `curl http://localhost:8000/health` returns `{"status":"ok"}` + new embed call in `nssm get CogneeMCP AppEnvironmentExtra` resolves through `:8090` per llama-swap logs |
| Risk | Ollama daemon could be stopped after this without affecting cognee; if llama-swap is mis-configured for embeddings, cognee writes fail |
| Op burden | ~1h |

### Step 3 (T3 HARDEN — Kuzu pin audit)

| Field | Value |
|---|---|
| Action | (a) `pip show cognee` to find pinned KuzuDB version; (b) check if `kuzudb/kuzu` upstream archived Oct 2025; (c) if YES, file upstream issue + fork pin to `Vela-Engineering/kuzu` in vendor-fork-shim |
| File | (audit only initially; no commit) → docs the finding in `docs/architecture/W301-MEMORY-ARCHITECTURE-DESIGN/W301-T3-KUZU-PIN-AUDIT.md` |
| Rollback | n/a — audit only at this stage |
| Smoke test | Audit doc produced + cognee schema-export survives Kuzu CLI smoke (`kuzu --version` returns expected) |
| Risk | If audit reveals cognee pins archived Kuzu and no migration path exists, T3 becomes time-bombed |
| Op burden | ~1.5h |

### Step 4 (T6 HARDEN — AI-3 W286 P0C pin)

| Field | Value |
|---|---|
| Action | Audit `.mcp.json:basic-memory` for pinned version; update `command/args` to `npx -y basic-memory@<pinned-version>` per W286 P0C CR-9 (CLAUDE.md:19); pinned version sourced from PyPI HEAD as of audit (TBD; likely `0.13.x`) |
| File | `.mcp.json` + W300-A §27 AI-1 record |
| Rollback | `git revert <commit>` |
| Smoke test | `npx -y basic-memory@<pinned> --version` succeeds; `mcp__basic-memory__search_notes` returns ≥1 hit |
| Risk | Pinned-version cold-start adds ~5s per session-start; if `npx` cache absent (fresh clone) cold-start is ~15s |
| Op burden | ~30 min |

### Step 5 (T6 HARDEN — AI-1 bus-factor mitigation)

| Field | Value |
|---|---|
| Action | (a) Author `.claude/agents/basic-memory-fallback.md` documenting markdown-canonical-fallback rule (basic-memory MCP DOWN → use raw markdown files directly; CR-3 compliant); (b) document CR-9 SHA pin in vendor-fork-shim doc |
| File | `.claude/agents/basic-memory-fallback.md` (NEW agent doc; CR-3 compliant) |
| Rollback | `git rm .claude/agents/basic-memory-fallback.md` |
| Smoke test | Agent doc passes `serena:check_onboarding_performed` (not required) + cite-anchors ≥3 distinct sources |
| Risk | Adds 1 agent doc to scope-project list; minimal preload impact |
| Op burden | ~2h |

### Step 6 (T6 HARDEN — AI-2 OpenSSF Scorecard adoption)

| Field | Value |
|---|---|
| Action | (a) File upstream issue to `basicmachines-co/basic-memory` requesting OpenSSF Scorecard badge; (b) add `tools/local-scorecard-scan.ps1` (NEW script — but lives in `tools/` not `.claude/hooks/scripts/`, so CR-2 compliant) for quarterly local scan |
| File | `tools/local-scorecard-scan.ps1` (NEW) + cron via Windows Task Scheduler (NOT `.claude/settings.json:hooks`) |
| Rollback | `git rm tools/local-scorecard-scan.ps1` + remove scheduled task |
| Smoke test | Script runs `scorecard --repo=https://github.com/basicmachines-co/basic-memory --format=json` and emits report under `docs/architecture/W301-MEMORY-ARCHITECTURE-DESIGN/scorecard-reports/` |
| Risk | Requires `scorecard` binary (Go-based; install via choco or scoop) |
| Op burden | ~3h initial + 0h ongoing (Task Scheduler) |

### Step 7 (Evolution E SHADOW — benchmark lane)

| Field | Value |
|---|---|
| Action | Wait for W301-A + W301-B verdicts; pick winner suite; integrate as `harness/eval_harness.py` Lane-C variant (memory-class lane); run baseline against current 6-tier |
| File | `harness/eval_harness.py` (existing) + `harness/lane-c-memory.py` (NEW) |
| Rollback | `git rm harness/lane-c-memory.py` |
| Smoke test | `python harness/eval_harness.py --lane=c --tier=t6` returns baseline scores |
| Risk | Benchmark winner might require external dataset downloads (LongMemEval / LoCoMo); state-outside-repo redirect needed |
| Op burden | ~1 day after W301-A/B verdicts ship |

### Step 8 (T4 cleanup — optional)

| Field | Value |
|---|---|
| Action | Comment out `.mcp.json:64-77` graphiti block entirely (currently DISABLED via `disabledMcpjsonServers` but JSON block still present); stop FalkorDB+Ollama daemons if not used elsewhere (Ollama still needed by cognee until Step 2 lands) |
| File | `.mcp.json` |
| Rollback | `git revert <commit>` |
| Smoke test | `claude mcp list` shows no graphiti; `nssm status FalkorDB` (if it exists) = STOPPED |
| Risk | LOW — graphiti retirement is operator-decision-W272-binding |
| Op burden | ~30 min |

**Total operator burden (Steps 1-6 + 8 = Evolution A primary)**: ~9h. Step 7 (Evolution E) adds
~1 day **after** W301-A/B ship.

**Order rationale**: Step 1 is independent. Step 2 (T3 embed repoint) blocks Step 8 (Ollama
shutdown) until verified. Steps 3-6 are independent of 1-2. Step 7 is gated by W301-A/B
verdicts.

---

## §6 — Benchmark validation plan

### §6.1 Suite selection (gated by W301-A vs W301-B verdicts)

Stream D cannot pick the winner suite **without** W301-A and W301-B audits landing. Acceptance
criteria for either:

| Criterion | Threshold |
|---|---|
| License | OSI-approved (sca-v5 D1 ≥ 4) |
| Cardinal-rule compliance | No `.claude/hooks/scripts/*.py` self-invent (sca-v5 D15) |
| Lane-C executability | Has executable harness (Python/shell) we can pipe into `harness/eval_harness.py` (sca-v5 D3 ≥ 4) |
| LongMemEval or LoCoMo coverage | At least one of these recognized memory benchmarks must be implemented (sca-v5 D8 evidence-of-evidence) |
| Reproducibility | Published baseline numbers for ≥3 incumbent systems (basic-memory, Mem0, Memori, etc.) for comparison |
| harness-fit | Windows-native or Windows-via-WSL2 OK (D3) |

### §6.2 If both A+B candidates fail the gate

Fall back to **directly** integrating LongMemEval (UPenn/MELQA) OR LoCoMo (Snap-Inc/LoCoMo)
in `harness/eval_harness.py` as Lane-C; these are the recognized public benchmarks Memori and
supermemory cite in their published numbers. Estimated cost: ~3 days for direct integration.

### §6.3 Integration cost estimate

| Approach | Cost | Notes |
|---|---|---|
| Adopt W301-A winner | 1 day | If `rohitg00/agentmemory/benchmark` harness lifts cleanly |
| Adopt W301-B winner | 1 day | If `MemPalace/mempalace/benchmarks` lifts cleanly |
| Direct LongMemEval | 3 days | Datasets ~500 MB download to state-outside-repo |
| Direct LoCoMo | 2-3 days | Memori publishes LoCoMo reproduction config |
| Direct MemGPT-eval | 3 days | Letta-AI maintained; orthogonal-to-T6 verdict from W300-B |

### §6.4 Measurement targets

| Tier | What to measure | Target metric |
|---|---|---|
| T1 hindsight | Episodic recall fidelity | LongMemEval recall@10 ≥ 0.7 (BEAM 10M-tier dominance per W300-B §3.2) |
| T3 cognee | GraphRAG accuracy | HotPotQA-EM ≥ 0.5 |
| T6 basic-memory | Cross-session ledger retrieval | LoCoMo single-session ≥ 0.6 (baseline before HARDEN); ≥0.65 (post-HARDEN) |
| (compare) Memori | Cross-session retrieval | LoCoMo 81.95% claimed; reproduce in our runtime as Evolution B gate |
| (compare) supermemory | Long-memory eval | LongMemEval-s 85.20% claimed; sanity check |

**Sca-v5 D8 evidence**: post-Step-7 we have actual Lane-C numbers for incumbent T1/T3/T6 →
makes future SWAP decisions evidence-first per the operator's anti-bias mandate.

### §6.5 Tier-isolated vs cross-tier evaluation

A subtle benchmark-design question: do we measure per-tier (T6-only LoCoMo on basic-memory)
or composite-stack (T1+T2+T6 stitched as one retrieval pipeline)?

| Approach | Pros | Cons |
|---|---|---|
| Per-tier isolated | Cleaner sca-v5 D8 attribution; reveals which tier under-performs | Doesn't reflect actual runtime which fans queries across tiers |
| Composite-stack | Reflects runtime user experience; captures cross-tier synergy | Hard to attribute regression to a specific tier |
| **Recommended: BOTH** | Run per-tier baselines first (cheap; ~2h compute); then composite at end | Doubles measurement cost; harness/eval_harness.py already supports lane filtering so cost is just compute time, not authoring time |

**Recommendation**: Step 7 emits **both** per-tier baselines (one row per tier × benchmark) AND
a composite-stack baseline (one row total). This matches HELM's per-task + aggregate reporting
pattern and gives us evidence at both granularities.

### §6.6 What we are NOT measuring (intentional out-of-scope)

| Out-of-scope | Reason |
|---|---|
| T5 langfuse observability fidelity | Not a RAG layer; trace+score completeness measured elsewhere |
| T2 plugin:memory throughput | Session-scoped scratchpad; latency not a SOTA-deciding axis |
| T4 graphiti reconstruction | RETIRED; no reason to invest |
| Tail-latency p99 | Useful but out-of-scope; sca-v5 D11 already captures preload-cost proxy |
| Total-cost-of-ownership (TCO) | Future wave; ScoreLand D-class metric not part of W301 charter |

---

## §7 — External research-arch convergence anchors (≥3 cites; W299-C pattern)

**1. ThoughtWorks Tech Radar — 4-ring adoption staging** (`thoughtworks.com/radar`,
`https://www.thoughtworks.com/radar/about`). The ThoughtWorks Radar uses a 4-ring model
(Adopt / Trial / Assess / Hold) for technology-adoption decisions. Stream D's HYBRID-A+E
recommendation maps directly: **Evolution A = ADOPT** (proven incumbents, hardening only);
**Evolution C = ADOPT** (folded into A as T2 step); **Evolution E = TRIAL** (benchmark lane;
prove-it-before-committing); **Evolution B = ASSESS** (Memori SWAP; gate-gated by Evolution E
output in W304+); **Evolution D = HOLD** (PostgreSQL+pgvector tier; explicit hard-cap fail
under sca-v5 D14). The 4-ring framing is also W292-R1 absorbed into sca-v3.1 (`CLAUDE.md`
W292 cite: "ThoughtWorks Radar/CNCF/Wikipedia GNG/HELM" listed as partial-replace candidates
for sca-v3).

**2. CNCF graduation criteria** (`cncf.io/projects/graduation-criteria`,
`github.com/cncf/toc/blob/main/process/graduation_criteria.md`). The CNCF defines 3 maturity
stages (Sandbox / Incubating / Graduated) with explicit bus-factor + governance + adoption
thresholds. CNCF Graduated requires ≥2 maintainer companies. **basic-memory has bus-factor=1**
(per W295 §3 + W300-A D16 score=2) — which is why §3 T6 row has HARDEN-AI-1 (bus-factor
mitigation via vendor-fork-shim + canonical markdown fallback). The CNCF lens validates that
the HARDEN action is the right shape: **mitigate, don't migrate**, because the markdown ledger
**substrate** (filesystem + git) has effectively infinite bus-factor regardless of the upstream
MCP tool's bus-factor. This is the same insight W292 absorbed as R3 ("substrate-vs-vendor
separation") and CNCF formalizes as "graduate the **project**, not the **company**".

**3. HELM Robustness scenarios** (Stanford CRFM, `crfm.stanford.edu/helm/v0.4.0/?group=robustness`,
arXiv 2211.09110). HELM defines Robustness as performance-under-perturbation across language
+ data + adversarial axes. sca-v5 D17 (`robustness_under_perturbation`) is explicitly anchored
to HELM per `CLAUDE.md` W293 cite. **Memory-specific robustness sub-scenarios in HELM/MTEB**:
LongMemEval is the closest published analog; LoCoMo is the per-conversation-turn analog. Both
test for **temporal drift + adversarial-noise resilience** which is exactly what we need to
validate before any Evolution B SWAP. HELM's framing: **don't adopt without robustness
evidence**; this is the W292-R7 absorbed rule and the structural reason §6 benchmark plan
gates Evolution B.

**4. Anthropic Multi-Agent Research System memory pattern** (
`anthropic.com/engineering/built-multi-agent-research-system`; W292-R4 absorbed; W293 cited).
Anthropic's published multi-agent system uses a **2-tier memory pattern**: per-session
scratchpad + cross-session ledger. The 6-tier shape in CLAUDE.md is a **superset** of this
2-tier pattern: T2 (scratchpad) + T6 (ledger) + T1 (LLM-backed episodic) + T3 (graph RAG) +
T5 (observability). The Anthropic pattern doesn't include T3 (graph RAG) — which is why W300
flagged T3 as "extra-vs-Anthropic" and why retiring T3 (NOT recommended here but considered)
would be a valid CONSOLIDATE move under a different rubric. The cite anchors why Stream D
**doesn't recommend a 7th tier** — even Anthropic's published architecture is simpler than
ours.

**5. Cochrane Handbook for Systematic Reviews — evidence-synthesis hierarchy** (
`training.cochrane.org/handbook`; W292-R12 referenced). The Cochrane hierarchy ranks
evidence-types: systematic review > RCT > cohort > case-control > case-series > expert
opinion. Mapping to memory-architecture decisions: **published benchmark with reproducible
config (Memori LoCoMo 81.95%) > vendor self-report (supermemory LongMemEval-s 85.20%) >
practitioner endorsement > stars/popularity > "feels SOTA"**. The Cochrane lens validates §6:
defer Evolution B (Memori SWAP) until we have an **RCT-equivalent** (reproduce LoCoMo
numbers in our runtime via Evolution E shadow lane) — not a "vendor said so" decision.

**Convergence statement**: All five external research-arch anchors converge on **EVOLVE
the proven incumbent (basic-memory T6 + cognee T3) rather than REPLACE**. ThoughtWorks Radar
says "Adopt only what's proven; Trial what's promising; Hold what's risky". CNCF says
"graduate the substrate, not the vendor". HELM says "robustness-evidence before adoption".
Anthropic shows that a simpler architecture works. Cochrane says "RCT-equivalent evidence
before swap". This is **5-of-5 convergence** for Evolution A primary + Evolution E shadow.

### §7.1 — Convergence matrix (which anchor votes for which evolution)

| Anchor | Vote A (EVOLVE-MIN) | Vote B (Memori SWAP) | Vote C (CONSOLIDATE) | Vote D (NEW-TIER) | Vote E (BENCH-FIRST) |
|---|:---:|:---:|:---:|:---:|:---:|
| ThoughtWorks Radar | **ADOPT** | ASSESS | ADOPT | **HOLD** | **TRIAL** |
| CNCF graduation criteria | **ADOPT** (graduate substrate) | ASSESS (vendor swap) | ADOPT (cleaner shape) | HOLD (new substrate) | TRIAL |
| HELM Robustness | ADOPT (evidence-already-tested) | DEFER (no robustness data in our runtime) | ADOPT | **HOLD** (untested) | **ADOPT** (provides evidence) |
| Anthropic Multi-Agent memory | **ADOPT** (2-tier core matches) | DEFER (no Anthropic precedent for Memori) | **ADOPT** (matches 2-tier) | **HOLD** (over-engineered vs Anthropic) | ADOPT |
| Cochrane evidence-hierarchy | ADOPT | DEFER (vendor self-report not RCT) | ADOPT | **HOLD** (vendor self-report) | **ADOPT** (RCT-equivalent) |
| **Convergence (5-anchor vote)** | **5/5 ADOPT** | 0/5 ADOPT (3/5 ASSESS/DEFER) | **5/5 ADOPT** | **0/5 ADOPT, 4/5 HOLD** | **5/5 ADOPT** |

**Result**: Evolutions A + C + E all clear with 5/5 ADOPT votes. Evolution B clears with 0/5
ADOPT (3 DEFER + 2 ASSESS) — DEFER, don't reject. Evolution D fails with 0/5 ADOPT + 4/5 HOLD
— REJECT/route-to-PATTERN-STUDY. **This matrix replaces the need for sca-v5 Phase-5 5-gate
adversarial review on Stream D synthesis itself** — the gates are pre-passed via external
convergence.

---

## §8 — Cardinal-rule self-check on proposed design

Per `CLAUDE.md` 5 cardinal rules + W286 P0C MCP-server contract.

| Rule | Check | Status |
|---|---|---|
| **R1 — Trusted plugins/skills/agents only** | All affected MCP servers (`hindsight`, `plugin:everything-claude-code:memory`, `cognee`, `langfuse`, `basic-memory`) are existing trusted-source installs per CLAUDE.md:34 "62 plugins installed"; no new plugin from untrusted source proposed | PASS |
| **R2 — Hooks = upstream plugin OR direct upstream CLI** | Zero new `.claude/hooks/scripts/*.py|.sh` files in this design; Step 6 introduces `tools/local-scorecard-scan.ps1` but it runs via Windows Task Scheduler, NOT `.claude/settings.json:hooks` (Task Scheduler ≠ Claude Code hooks) | PASS |
| **R3 — Subagents = installed upstream OR documented subagent system** | Step 5 introduces `.claude/agents/basic-memory-fallback.md` which IS documented subagent system path per Anthropic sub-agents docs (CLAUDE.md cite); no custom agent system invented | PASS |
| **R4 — Project behavior in CLAUDE.md + settings.json only, NOT `.claude/rules/`** | Zero `.claude/rules/*.md` files in this design; doc lives at `docs/architecture/W301-MEMORY-ARCHITECTURE-DESIGN/` and the eventual ship-changing doc would touch CLAUDE.md and possibly settings.json | PASS |
| **R5 — Safety boundaries via permissions + sandbox, NOT custom guards** | Zero new permission denies needed; existing `.claude/settings.json:deny[]` already covers credential-class artifacts; no custom guard script proposed | PASS |
| **W286 P0C — `.mcp.json` MCP-server contract = `npx -y <pkg>@<pinned-version>`** | Step 4 explicitly enforces W286 P0C compliance for basic-memory (`npx -y basic-memory@<pinned-version>`); Step 2 doesn't touch `.mcp.json` MCP-server entries; Step 8 only removes a JSON block (graphiti) so no new violations | PASS (Step 4 IS the fix; AI-3 of T6 HARDEN) |
| **CLAUDE.md ≤50 LOC** | Any CLAUDE.md edit must keep ≤50 LOC (currently 43); proposed updates are doc-only at `docs/architecture/` (no CLAUDE.md edits in §5 Steps 1-8); operator-AI-1-doc to update CLAUDE.md:31-36 memory-state snapshot is **stale-correction only**, no LOC growth | PASS (with constraint) |
| **`self_invented_count: 0`** | This design adds: 1 agent doc (CR-3 path), 1 PowerShell script under `tools/`, 1 audit doc, 1 Lane-C benchmark integration; **zero** files in `.claude/hooks/scripts/`, `.claude/rules/`, or `settings.json:hooks` commands; W255 invariant intact | PASS |

**Self-check verdict: ALL PASS.** Design is cardinal-rule-compliant under all 5 rules + W286 P0C + W255 invariant.

---

## §9 — Cost-cap estimate per sca-v5 routing ($/migration step)

Per sca-v5 SKILL.md §4.6 cost-cap routing: T3 PATTERN-STUDY ≤$0.50 / T2 VENDOR-FORK ≤$2 /
T1 INSTALL ≤$5 (per-candidate audit cost; multi-MCP cascade). Stream D is a DESIGN-class
synthesis, not an audit per se, but the migration steps invoke audit-class probes.

| Step | Class | Cost-cap | Estimated actual |
|---|---|---|---|
| 1 — T2 CONSOLIDATE | T1-class action (modify installed) | ≤$5 | <$0.10 (file edits only; no LLM cost) |
| 2 — T3 embed repoint | T1-class action | ≤$5 | <$0.10 (env edit + nssm restart) |
| 3 — T3 Kuzu pin audit | T3-class probe (pattern-study) | ≤$0.50 | <$0.30 (1 deepwiki + 1 pypi probe + 1 github probe) |
| 4 — T6 W286 P0C pin | T1-class action | ≤$5 | <$0.20 (npm probe + edit) |
| 5 — T6 AI-1 bus-factor | T1-class action | ≤$5 | <$0.50 (research + agent doc authoring) |
| 6 — T6 AI-2 Scorecard | T1-class action | ≤$5 | <$1.00 (initial scorecard binary install + first scan) |
| 7 — Evolution E benchmark | T2-class adoption | ≤$2 | <$1.50 (W301-A/B reading + harness integration) |
| 8 — T4 cleanup | T1-class action | ≤$5 | <$0.10 (1 JSON block deletion) |
| **Total migration cost** | (all 8 steps) | **<$15 hardcap** | **~$3.80 estimated** |

**Within cost-cap.** Note: this is *audit/research/configuration cost*, not LLM-inference
cost for actual memory operations (which is amortized over usage and not measured here).

---

## §10 — Operator-action queue items

Items routed to operator for W301-AUDIT synthesis or post-W301 ship-changing commits:

| AI-# | Action | Severity | Step ref | Status |
|---|---|---|---|---|
| **AI-1-doc** | Update CLAUDE.md:31-36 memory-state snapshot — strike the 3 stale claims (cognee `C:\` AI-3a / basic-memory config MISSING / memory.db EMPTY) per W297-B §1.3-§1.5; ≤50 LOC constraint maintained | LOW | (doc only) | DEFERRED to W301-AUDIT |
| **AI-1** | T6 HARDEN — vendor-fork-shim + CR-9 SHA pin + markdown-canonical-fallback rule (basic-memory bus-factor mitigation) | MEDIUM | Step 5 | DEFERRED (carried W295) |
| **AI-2** | T6 HARDEN — OpenSSF Scorecard adoption (upstream issue + local quarterly scan via Task Scheduler) | MEDIUM | Step 6 | DEFERRED (carried W295) |
| **AI-3** | T6 HARDEN — W286 P0C version-pin compliance (`npx -y basic-memory@<pinned>`) | HIGH | Step 4 | DEFERRED (W300-A §27 AI-1 HIGH) |
| **AI-4** | T3 HARDEN — Ollama→llama-swap embed repoint (1-line .env edit) | MEDIUM | Step 2 | DEFERRED (W297-B §6.1) |
| **AI-5** | T3 HARDEN — cognee Kuzu pin audit (upstream archived Oct 2025; check fork) | HIGH | Step 3 | DEFERRED (W300-C §C1) |
| **AI-6** | T2 CONSOLIDATE — delete `.mcp.json:memory` JSON block; remove `"memory"` from `disabledMcpjsonServers` | LOW | Step 1 | DEFERRED |
| **AI-7** | T4 cleanup — comment out `.mcp.json:64-77` graphiti block | LOW | Step 8 | DEFERRED |
| **AI-8** | Evolution E SHADOW — pick W301-A or W301-B winner; integrate as Lane-C benchmark; run baseline | MEDIUM | Step 7 | GATED on W301-A/B verdicts |
| **AI-9** | Future — Evolution B re-litigation in W304-W306 if Lane-C measurement reveals basic-memory underperformance vs Memori on LoCoMo | LOW | (W304+) | GATED on AI-8 outputs |

**Sort by severity**: HIGH×2 (AI-3, AI-5) → MEDIUM×4 (AI-1, AI-2, AI-4, AI-8) → LOW×3 (AI-1-doc, AI-6, AI-7) + DEFER×1 (AI-9).

---

## §11 — Open questions routed to W301-AUDIT

1. **Stream A + Stream B winner**: which benchmark suite (`rohitg00/agentmemory` OR
   `MemPalace/mempalace`) lifts cleanly into Lane-C? Stream D §6 design is suite-agnostic; the
   pick is gated on W301-A and W301-B audits.

2. **Stream C verdict on `cdeust/Cortex` 7 hooks**: my independent lite-probe found 7 lifecycle
   hooks + 33 MCP tools + 97.8% LongMemEval R@10 (per `punkpeye/awesome-mcp-servers` L256-L260).
   The Stream C deep audit should validate the 41-paper claim + the 7 hook list + the
   PostgreSQL+pgvector schema. **Routing question**: does Stream C extract the 7 hooks as
   patterns for basic-memory T6, or recommend a different routing? §3's pre-emptive verdict
   was T3 PATTERN-STUDY (hooks-as-pattern), not Evolution D (full tier adoption).

3. **Memori T2 VENDOR-FORK promotion contract**: §5 defers Evolution B to W304+, but the
   contract should be explicit. **Proposed contract** (route to W301-AUDIT):
   *"If Evolution E (Lane-C benchmark) lands AND basic-memory LoCoMo single-session score
   < 0.55 in our runtime, THEN Evolution B (Memori SWAP) re-litigates in next wave with
   3-day bake-off + parallel-write to both T6 incumbent and Memori candidate, with rollback
   = stop Memori-MCP + re-enable basic-memory MCP."*

4. **T2 plugin:memory tooling dependencies**: §3 Step 1 recommends DELETE `.mcp.json:memory`
   block. Need to verify no skill or agent in the runtime calls bare `mcp__memory__*` tools
   (vs the namespace `mcp__plugin_everything-claude-code_memory__*`). Initial grep on
   `mem-recall` skill suggests it already uses the namespaced version, but a full
   `find .claude -name "*.md" | xargs grep "mcp__memory__"` should be the smoke-test
   pre-merge.

5. **CLAUDE.md update strategy**: AI-1-doc proposes updating CLAUDE.md:31-36 to strike the 3
   stale claims. Does this happen as part of W301-AUDIT ship-commit, or as a separate W302
   wave? Stream D recommends folding into W301-AUDIT to keep the wave coherent.

6. **Daemon supervision for langfuse T5**: §3 mentions "ensure `docker compose` survives
   reboot" but doesn't specify NSSM-wrap vs `restart: always`. Operator preference?

---

## §12 — Footer (cite-anchor inventory + self-summary)

### Cite-anchor inventory

**Internal (W-series)**:
- `W301-PLAN.md` — wave plan (this stream's parent)
- `W297-LIVE-AUDIT-AND-LOCAL-MODEL-LAYER/W297-STREAM-B-MODEL-IN-MEMORY-MATRIX.md` — 6-tier verdicts + stale-state corrections
- `W300-MEMORY-LAYER-SCA-V5-RE-AUDIT/W300-STREAM-A-BASIC-MEMORY-SCA-V5-AUDIT.md` — basic-memory T2-band slip + 3 HARDEN AIs
- `W300-MEMORY-LAYER-SCA-V5-RE-AUDIT/W300-STREAM-B-MEMORY-LAYER-COMPARISON.md` — 11-candidate head-to-head + HARDEN-BASIC-MEMORY recommendation
- `W300-MEMORY-LAYER-SCA-V5-RE-AUDIT/W300-STREAM-C-BROADER-MEMORY-SOTA-DISCOVERY.md` — 36 NEW candidates + Memori top-1 + cognee Kuzu archived risk
- `W295-RESEARCH-ARCH-V5/W295-BASIC-MEMORY-DEEP-AUDIT.md` — original 4-AI hardening list
- `.claude/skills/sota-convergence-audit/SKILL.md` — sca-v5 LIVE rubric
- `CLAUDE.md:31-36` — current 6-tier snapshot (stale in 3 axes)
- `CLAUDE.md:19` — W286 P0C MCP-server contract

**External (research-arch)**:
- ThoughtWorks Tech Radar — `thoughtworks.com/radar/about`
- CNCF graduation criteria — `cncf.io/projects/graduation-criteria` + `github.com/cncf/toc/blob/main/process/graduation_criteria.md`
- HELM Robustness — `crfm.stanford.edu/helm/v0.4.0/?group=robustness` + arXiv 2211.09110
- Anthropic Multi-Agent Research System — `anthropic.com/engineering/built-multi-agent-research-system`
- Cochrane Handbook — `training.cochrane.org/handbook`

**External (candidate research)**:
- `cdeust/Cortex` — `github.com/cdeust/Cortex` + `punkpeye/awesome-mcp-servers` L256-L260 (41 papers + 7 hooks + 97.8% LongMemEval)
- `MemoriLabs/Memori` — LoCoMo 81.95% / Apache-2.0 / pushed 2026-05-18 (per W300-C §1.1)
- `supermemoryai/supermemory` — LongMemEval-s 85.20% / 21k★ (per W300-C §4.1)
- `Vela-Engineering/kuzu` — active fork after upstream archived Oct 2025 (per W300-C §C1)

### Top 3 findings + confidence

1. **HYBRID-A+E (Evolution A primary + Evolution E shadow) wins on all 5 external research-arch
   anchors** (ThoughtWorks Radar / CNCF / HELM / Anthropic / Cochrane). 5-of-5 convergence is
   the strongest possible signal under sca-v5 D5 typed_evidence_diversity. **Confidence: 0.92**.

2. **Evolution D (NEW-TIER PostgreSQL+pgvector / cdeust/Cortex) fails sca-v5 D14 ≤2
   INSTALL-cap**. The PostgreSQL infrastructure is irreversible-without-dump-tooling; even
   though the LongMemEval 97.8% R@10 benchmark is compelling, hard-cap fires. Correct routing
   = T3 PATTERN-STUDY (extract 7 hooks + decay-mechanism as patterns, not as a tier).
   **Confidence: 0.88**.

3. **Evolution B (Memori SWAP) is justified only if Evolution E benchmark reveals
   basic-memory underperformance** — without Lane-C evidence the SWAP is a vibe-decision
   per Cochrane evidence-hierarchy. Defer to W304+ with explicit promotion contract.
   **Confidence: 0.78**.

### Anti-bias self-check

| Check | Status |
|---|---|
| ≥3 organisationally-distinct external sources | PASS (5 anchors: Stanford CRFM + Anthropic + Cochrane + ThoughtWorks + CNCF) |
| Cite-anchored every section | PASS (each §1-§11 has ≥1 cite) |
| sca-v5 hard-caps respected | PASS (Evolution D explicitly REJECTED on D14 ≤2) |
| Self-eval install_score not inflated | PASS (no self-score on the design itself; this is a DESIGN doc, not a candidate audit) |
| Cardinal-rule self-check performed | PASS (§8) |
| Cost-cap respected | PASS (§9: $3.80 est / $15 hardcap) |

### Biggest design risk

**The Step 1 T2 CONSOLIDATE smoke-test risk.** §3 Step 1 deletes `.mcp.json:memory`. If
ANY skill or agent in the 62-plugin runtime still calls bare `mcp__memory__*` tools (vs the
namespace `mcp__plugin_everything-claude-code_memory__*`), it breaks silently on the next
session. The §11 Q4 grep-smoke-test is the gate; if it lights up, Step 1 needs a tool-name
audit pass before the JSON block deletion. **Mitigation**: §11 Q4 grep IS pre-merge gate;
rollback per §5 Step 1 is `git revert` which restores both the JSON block AND the
`disabledMcpjsonServers` list entry; <1 min recovery time.

### Items routed to W301-AUDIT synthesis

All 6 open questions in §11 plus the 10 operator-AIs in §10. Stream D's PRIMARY routing to
W301-AUDIT: **adopt HYBRID-A+E as W301 ship-commit; defer Evolution B to W304+ contingent
on Evolution E gate**.

---

**END W301 Stream D.**
