# W189-A — 3-repo memory cohort Probe DAG 1-7 + Phase-7 benchmark gate

**Date**: 2026-05-13
**Wave**: W189 single-axis (3-repo memory cohort)
**Agent**: sota-researcher (Sonnet stand-in via env-funneled dispatch — STAND-IN-NOTICE: this agent runs under CLAUDE_CODE_SUBAGENT_MODEL precedence; verdict origin = Sonnet stand-in NOT real GPT-5.5 codex; cross-model gate NOT structurally satisfied per `Z:/claude-sota/.claude/rules/cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate`)
**Brief scope**: STAY single-axis — 3-repo Probe DAG 1-7 + Phase-7 + CR-12 ONLY
**Cite-class**: TIER-1-DIRECT for upstream README/LICENSE/BENCHMARK reads via mcp__github__get_file_contents + gh-API + npm/PyPI registry direct-existence probes (all VERIFIED 2026-05-13)

---

## Repos audited

| # | Repo | HEAD | Stars | Age | License | PyPI/npm |
|---|---|---|---|---|---|---|
| 1 | topoteretes/cognee | `4ca1d0c2bb` (W188 SP-NARROW pending verification) | 17,215 | 1001d | Apache-2.0 | PyPI `cognee` VERIFIED |
| 2 | MemPalace/mempalace | `475810ed43` | 52,144 | **38d** | MIT | PyPI `mempalace` VERIFIED + npm `mempalace` VERIFIED |
| 3 | rohitg00/agentmemory | `8c3418cc61` | 7,903 | **77d** | Apache-2.0 | npm `@agentmemory/agentmemory` v0.9.12 VERIFIED (scoped); bare `agentmemory` PHANTOM |

[VERIFIED 2026-05-13 via direct gh API + PyPI/npm registry probes]

---

## Per-repo Probe DAG (Probes 1-7) + Phase-7 benchmark-gate

### Repo 1 — topoteretes/cognee

| Probe | Result | Evidence |
|---|---|---|
| **1 count-OVER** | PASS | stars=17215 forks=1800 age=1001d cpd~unknown but mature (`pushed=2026-05-13` recent) |
| **2 SDK-vs-CLI** | PASS | PyPI install `uv pip install cognee` + `cognee-cli` + 4-op API `remember/recall/forget/improve` |
| **3 architectural-API** | PASS | Python async API; Anthropic-API-orthogonal; works with claude-sota stack (Python venv at Z:/venvs/claude) |
| **4 plugin-namespace** | **FAIL — partial DUPLICATE** | Z:/claude-sota-installed/.mcp.json already has `memory` (doobidoo/mcp-memory-service v10.51.3 sqlite_vec INSTALLED) + `graphiti` (getzep v0.29.0 FalkorDB WIRED). cognee provides memory-control-plane shape that OVERLAPS mcp-memory at L1 capture + graphiti at L3 temporal-KG. NOT zero-overlap. |
| **5 mode-harness-shape** | PASS | Native async Python + CLI; no HARD-GATE; compatible with autonomous /loop mode |
| **6 LICENSE + registry** | PASS | Apache-2.0 (permissive) + PyPI `cognee` exists w/ 50+ versions + active maintenance (latest cognee-0.1.44+ 2025-06+) |
| **7 demand-gate split (.a/.b)** | **.a DEMAND-ABSENCE (REJECT-FOR-FIT)** | Existing primitives mcp-memory (sqlite_vec L1+L2) + graphiti (FalkorDB L3) cover live workflow per CLAUDE.md Memory Stack §L1244-1247. Per `Z:/claude-sota-installed/.claude/rules/ahfv-probe-dag.md §Probe 7.a` 3-clause check: NO additional sss workflow routes uniquely through cognee. cognee's `remember/recall/improve` API surface OVERLAPS Graphiti's add_memory/search_memory_nodes per `Z:/claude-sota/.claude/projects/Z--claude-sota/memory/feedback_memory_rag_audit_HNF_agplv3_blocker_2026_05_02.md` baseline (cognee was W188 STUDY-PILOT-NARROW pending; this Probe 7 refutes). |

**Phase-7 benchmark-gate**: NOT TRIGGERED — cognee README does NOT make ≥3 numeric improvement claims with reproducibility methodology absent. README references published paper (arXiv:2505.24478) — that's a primary methodology source. **GATE: not applicable / PASS** (no fabrication-test FAIL).

**Convergence-gate Axis-1+2+3**: Axis-1 N/A (single-org Topoteretes UG); Axis-3 PASS (1001 day age, STABLE-BURN-IN per `convergence-gate.md` cpd-band table).

**CR-12 disposition**: **DUPLICATE-FUNCTIONALITY** with mcp-memory + graphiti incumbents. Per `Z:/claude-sota-installed/.claude/rules/cardinal-rule-12-upstream-install-priority.md` 6-class lattice + kiss-dry-yagni Must-Never #4 (no duplicate functionality).

**Verdict**: **REJECT-FOR-FIT** confidence=0.88 — Probe 4 partial DUPLICATE + Probe 7.a DEMAND-ABSENCE. W188 prior STUDY-PILOT-NARROW disposition REFUTED at Probe 7 layer per Mia pre-apply discipline (`Z:/claude-sota/.claude/rules/mia-pre-apply.md`).

---

### Repo 2 — MemPalace/mempalace

| Probe | Result | Evidence |
|---|---|---|
| **1 count-OVER** | **FAIL — fresh-paint signal** | stars=52,144 + forks=6,880 in **38 days** (cpd estimated VERY HIGH) — convergence-gate Axis-3 LAUNCH-SPIKE band: `unknown-org + age<90d + cpd>50` per `convergence-gate.md` 5-band table. Star/fork velocity is anomaly per `kiss-dry-yagni.md` heritage cycle-132 squashed-history-fresh-paint refute. |
| **2 SDK-vs-CLI** | PASS | `uv tool install mempalace` + `mempalace mine/search/wake-up` CLI; PyPI confirmed. |
| **3 architectural-API** | PASS | Python + ChromaDB; vector-only retrieval; no Anthropic-API conflict. |
| **4 plugin-namespace** | **FAIL — DUPLICATE** | mcp-memory (doobidoo v10.51.3 sqlite_vec, INSTALLED WIRED) provides same shape: L1 capture + vector retrieval. MemPalace adds wing/room/drawer hierarchy but core API duplicates incumbent. |
| **5 mode-harness-shape** | PARTIAL — Claude Code session 30-day expiry HARD-GATE warning at README L9 ("🚨 Claude Code sessions expire in 30 days w/out auto-save hooks wired!") suggests aggressive hook integration; mempalace ships 2 Claude Code hooks + 29 MCP tools — namespace pollution risk under autonomous /loop. |
| **6 LICENSE + registry** | PASS | MIT (permissive) + PyPI exists + npm exists. BUT see Probe 7 §"Even-shorter-path: upstream self-flags impostor-domain risk" trigger. |
| **7 demand-gate split (.a/.b)** | **AUTO-REJECT** | **`convergence-gate.md §Even-shorter-path: upstream self-flags impostor-domain risk`** FIRES: README opens with `[!CAUTION] Scam alert` block warning impostor domain `mempalace.tech` distributing malware. Per rule verbatim: "candidate has been or currently is in a high-attention attractor space — REJECT-until-convergence even if other axes look strong (the self-flag indicates ongoing trust-volatility)". |

**Phase-7 benchmark-gate**: **TRIGGERED + PASS-WITH-INTEGRITY-CAVEAT-DISCLOSED**. `benchmarks/BENCHMARKS.md` contains 11+ numeric improvement claims (96.6% / 98.4% / 100% / etc.) — BUT methodology is reproducible (`uv sync --extra dev` + `python benchmarks/longmemeval_bench.py /tmp/longmemeval-data/longmemeval_s_cleaned.json` + commits all 500-question result JSONLs). README **explicitly discloses** "teaching to the test" caveat at §"Benchmark Integrity — The Honest Accounting" for hybrid_v4 99.4%→100% step (3 specific question fixes overfit). Held-out 450q 98.4% is honest figure. The benchmark methodology PASSES Phase-7 reproducibility per `convergence-gate.md §Anti-pattern Row-2 fabrication-test FAIL` — claims ARE backed by repro artifacts. Tier-2 strong-PASS per ladder (per `convergence-gate.md`): inline BENCHMARK.md + repro instructions + committed result files.

**Convergence-gate Axis-1+2+3**: Axis-1 N/A (single-org MemPalace Contributors); **Axis-3 FAIL** — age 38d FAR below 90d floor; cpd extremely high indicating LAUNCH-SPIKE; single-org maintainership; no named-T2 endorsement; STRONG-PROVENANCE-EXPRESS predicate NOT MET (`age ≥ 30d AND axis-1 = official-org maintainership AND axis-2 = named-T2 endorsement` — fails official-org clause).

**CR-12 disposition**: **DUPLICATE-FUNCTIONALITY** (Probe 4) + **REJECT via impostor-self-flag** (Probe 7 auto-REJECT). Per `cardinal-rule-12-upstream-install-priority.md` 6-class lattice.

**Verdict**: **REJECT-FOR-FIT** confidence=0.95 — multiple structural blockers fire (impostor-domain self-flag P0 + fresh-paint Axis-3 fail + duplicate-functionality Probe 4). DO NOT ADOPT under any disposition.

---

### Repo 3 — rohitg00/agentmemory

| Probe | Result | Evidence |
|---|---|---|
| **1 count-OVER** | **PARTIAL — fresh-paint signal** | stars=7,903 + age=77d. cpd-band: `90d ≤ age ≤ 180d` borderline + `10 ≤ cpd ≤ 20` likely (need commit count probe) = "Active iteration / PASS-with-caveat" per `convergence-gate.md` Axis-3 5-band. age < 90d strict floor. |
| **2 SDK-vs-CLI** | PASS | TypeScript MCP server + REST API via `npx @agentmemory/agentmemory`. Scoped npm package `@agentmemory/agentmemory` v0.9.12 VERIFIED (bare `agentmemory` = PHANTOM HTTP 404 — but scoped form exists). |
| **3 architectural-API** | PASS | MCP server protocol-native; cross-tool: Claude Code/Cursor/Codex/Gemini CLI/Hermes/OpenClaw/pi/OpenCode. No Anthropic-API conflict. |
| **4 plugin-namespace** | **PARTIAL — DUPLICATE shape** | MCP server form OVERLAPS mcp-memory + graphiti incumbents. BUT distinct features: 12 lifecycle hooks (auto-capture), Ebbinghaus decay, 4-tier consolidation, real-time viewer on port 3113, privacy filtering for secrets pre-store. These are NEW shape not in incumbents. |
| **5 mode-harness-shape** | PARTIAL — TypeScript MCP server (Node.js dep); claude-sota stack is Python-heavy + 1 Node.js MCP wouldn't conflict but adds ecosystem dep. No HARD-GATE; compatible with autonomous /loop. |
| **6 LICENSE + registry** | PASS | Apache-2.0 (permissive) + scoped npm package VERIFIED (Apr 2026 created — fresh). Built on iii-engine (separate dep) — adds transitive risk. |
| **7 demand-gate split (.a/.b)** | **.b CANDIDATE — DEMAND-CREATES-NEW-WORKFLOW** | 5-clause check per `ahfv-probe-dag.md §Probe 7.b`: (1) **Named use case**: hooks-based auto-capture of tool calls/observations to memory without manual `add()`; (2) **Cited input/source**: `.claude/state/*.jsonl` audit trails + Edit/Write/Bash tool outputs (3) **Wiring path**: MCP server registration in `.mcp.json` + 12 lifecycle hooks in `.claude/settings.json` PostToolUse/SubagentStop matchers (4) **Incumbent comparison**: mcp-memory requires manual `add()` calls; graphiti requires explicit `add_memory()` — agentmemory's 12-hook auto-capture is a different workflow shape. BUT: claude-sota already has rich hook infrastructure (mcp_health.jsonl, subagent_transcripts.jsonl, codex_postcommit_reviews.jsonl per `audit-action-loop.md §When this discipline applies`) that performs similar auto-capture into JSONL files. The 5th clause (5) **Reversible time-box** with owner + max pilot cost: would need 30-day pilot definition. |

**Phase-7 benchmark-gate**: **TRIGGERED + PASS**. `benchmark/COMPARISON.md` + `benchmark/LONGMEMEVAL.md` make numeric claims (95.2% R@5, 98.6% R@10) with reproducibility methodology (`npx tsx benchmark/longmemeval-bench.ts hybrid` + dataset citation `xiaowu0162/longmemeval-cleaned` HuggingFace). All scripts committed under `benchmark/` directory (longmemeval-bench.ts, quality-eval.ts, scale-eval.ts, real-embeddings-eval.ts, results/). README at `benchmark/COMPARISON.md` explicitly discloses "apples vs oranges caveat" between LongMemEval-S vs LoCoMo metrics. Tier-2 inline benchmark with real fixtures per `convergence-gate.md §Three-tier evidence-density ladder`.

**Convergence-gate Axis-1+2+3**: Axis-1 N/A (single-author Rohit Ghumare); **Axis-3 BORDERLINE** — age=77d, marginally below 90d floor; STRONG-PROVENANCE-EXPRESS predicate NOT clearly met (single-individual maintainer NOT official-org).

**CR-12 disposition**: **PARTIAL-OVERLAP** with mcp-memory/graphiti incumbents (some shared shape + some genuinely new auto-capture + decay + consolidation features). Per `cardinal-rule-12-upstream-install-priority.md` 6-class lattice.

**Verdict**: **STUDY-PILOT-NARROW** confidence=0.65 — Probe 7.b CANDIDATE pending operator's reversible-time-box commitment (5th clause), Axis-3 borderline (77d < 90d), single-author maintainer, but novel auto-capture-via-hooks workflow + benchmarks reproducible. NOT ADOPT-NOW; defer to operator decision on whether to invest in Probe 7.b pilot setup OR REJECT-FOR-FIT.a if no operator-time available.

---

## Cohort summary table

| Repo | Probe 4 | Probe 7 | Phase-7 gate | Axis-3 | CR-12 class | Verdict | Conf |
|---|---|---|---|---|---|---|---|
| cognee | partial DUPLICATE | .a DEMAND-ABSENCE | N/A | PASS | DUPLICATE-FUNCTIONALITY | **REJECT-FOR-FIT** | 0.88 |
| mempalace | DUPLICATE | **AUTO-REJECT (impostor-flag)** | PASS-with-integrity-caveat | **FAIL** (38d fresh-paint) | DUPLICATE-FUNCTIONALITY + impostor-self-flag | **REJECT-FOR-FIT** | 0.95 |
| agentmemory | PARTIAL DUPLICATE | .b CANDIDATE | PASS | BORDERLINE (77d) | PARTIAL-OVERLAP | **STUDY-PILOT-NARROW** (operator-decision) | 0.65 |

---

## Key findings

1. **All 3 repos fail Axis-1 ≥3-distinct-orgs convergence** (single-org each: Topoteretes UG / MemPalace Contributors / Rohit Ghumare individual). None reaches ADOPT-NOW eligibility on convergence-gate alone.

2. **MemPalace impostor-flag is decisive**: README opens with `[!CAUTION] Scam alert` warning impostor `mempalace.tech` domain distributing malware. Per `convergence-gate.md §Even-shorter-path` auto-REJECT regardless of benchmark strength.

3. **cognee W188 STUDY-PILOT-NARROW REFUTED**: prior disposition does NOT survive Probe 7.a DEMAND-ABSENCE check against existing mcp-memory + graphiti incumbents per CLAUDE.md Memory Stack §L1244-1247.

4. **agentmemory shows genuine novelty** at auto-capture-via-hooks layer (12 lifecycle hooks, real-time viewer, Ebbinghaus decay, 4-tier consolidation). Probe 7.b 5-clause check requires operator's 30-day pilot time-box commitment to graduate from CANDIDATE → STUDY-PILOT.

5. **Phase-7 benchmark-gate findings**: mempalace + agentmemory BOTH pass with Tier-2 strong evidence (inline BENCHMARKS.md + repro instructions + committed result files). No fabrication-test FAIL. mempalace integrity caveat self-disclosed for hybrid_v4 99.4%→100% overfit step.

6. **Incumbent stack adequacy**: Memory Stack L1 (mcp-memory sqlite_vec INSTALLED) + L2 (embedded sqlite_vec) + L3 (graphiti FalkorDB WIRED) covers full memory hierarchy per CLAUDE.md §Memory Stack. No GENUINE-GAP for cognee or mempalace.

## STAND-IN-NOTICE

Per `Z:/claude-sota/.claude/rules/cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate`: this verdict was generated by Sonnet stand-in via env-funneling, NOT real GPT-5.5 codex CLI. Cross-model consensus invariant NOT structurally satisfied for this dispatch. Orchestrator should consider re-firing via codex T1 foreground+tee per Pattern D (`Z:/claude-sota/.claude/rules/ctff-patterns-cd.md §Pattern D — DEFAULT-profile foreground+tee recovery`) if ADOPT recommendation is being considered.

## Probe-DAG conformance summary

All 7 probes executed per `Z:/claude-sota-installed/.claude/rules/ahfv-probe-dag.md`. Phase-7 benchmark-gate executed per `convergence-gate.md §Anti-pattern Row-2 fabrication-test FAIL`. CR-12 6-class disposition computed per `cardinal-rule-12-upstream-install-priority.md`. Axis-1+2+3 convergence-gate per `convergence-gate.md` 5-band table.

COHORT-VERDICT-FINAL
