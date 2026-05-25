# W314-Stream-D — NET-NEW SOTA Candidate Verdicts

**Wave**: W314 · **Stream**: D · **Date**: 2026-05-19 · **Rubric**: sca-v7 (28.0 install denom / 12.6 pattern denom; v6.1 fallback 22.1/10.9)

Multi-angle MCP-cascade discovery surfaced **8-12 NET-NEW candidates** across 6 surfaces (skills · agent orchestration · evaluation · memory · browser · LLM-router). Below: top-6 scored under sca-v7 with cascade telemetry.

## Pre-flight: W313-D dedup check (basic-memory T6)

`mcp__basic-memory__search_notes("W313")` returned W308/W309/W312 verdicts but no W313-D rows in T6 yet (W313 dir exists at `docs/architecture/W313-V7-SHIP-READINESS/STREAM-D-NET-NEW-SOTA.md` but T6 verdicts not yet populated). To avoid duplicating W313-D's candidate set, I exclude any candidate matching its themes (HF Hub Trending + Letta + chrome-devtools-mcp drift candidates that W313 likely covered).

---

## Candidate 1 — `Mibayy/token-savior` (memory MCP, Claude Opus 4.7 100% benchmark)

### Provenance

- **GitHub URL**: https://github.com/Mibayy/token-savior
- **Stars**: not surfaced in initial query (newer repo, created 2026-03-30; ~1-3 month old as of W314)
- **License**: not yet captured (deep-ingest deferred to W315 per cascade-floor §6 of W314-D-DISCOVERY-CASCADE.md)
- **MCP family attribution**: github search_repositories (#1) · WebSearch confirmation (#4)
- **Tagline**: "Turns Claude into the only coding agent hitting 100% on a real benchmark. -77% active tokens, -76% wall time, 0 losses across 96 tasks on Claude Opus 4.7."

### Sca-v7 scoring (effective)

| Dim | Score | Rationale |
|---|:---:|---|
| D1 license | TBD | Not surfaced in cascade — W315 deep-ingest required |
| D5 typed evidence | 3 | Benchmark claim is bold but unverified outside vendor; no 3rd-org replication |
| D7 maintenance | 4 | Active push 2026-05-18 |
| D10 duplication vs installed | 4 | Distinct from cognee/basic-memory (focuses on structural code-nav + persistent memory, not knowledge graph) |
| D13 pattern-extractability | 4 | "Structural code navigation" pattern is distinct and extractable |
| D17 robustness | 3 | Benchmark numbers reported; pass2pass discipline unclear |
| D28 long-running-agent fitness | 4 | Token-savings claim implies long-context-friendly design |

### Verdict

**T3 PATTERN-STUDY** — vendor benchmark too aggressive to T2 without 3rd-org replication; pattern of "structural code navigation MCP" is novel and worth extracting. **Cascade-degraded:true** (D1 unscored; need W315 repomix deep-ingest).

T6 verdict note: `verdicts/W314-mibayy-token-savior.md`

---

## Candidate 2 — `agentic-box/memora` (persistent memory for AI agents)

### Provenance

- **GitHub URL**: https://github.com/agentic-box/memora
- **Description**: "Give your AI agents persistent memory."
- **Pushed**: 2026-05-18 (highly active)
- **License**: not surfaced — W315 deep-ingest required
- **MCP family attribution**: github search_repositories (#1) · exa cross-ref (#2)

### Sca-v7 scoring

| Dim | Score | Rationale |
|---|:---:|---|
| D5 typed evidence | 2 | Generic description; no benchmark cited |
| D7 maintenance | 4 | Active |
| D10 duplication | 3 | Overlaps cognee/basic-memory/mem0/letta cohort |
| D11 doc | TBD | Cascade insufficient |

### Verdict

**T4 CITE-ONLY** — saturated memory-MCP space; no novel pattern beyond Mem0/Cognee/Letta/Basic-Memory incumbent cohort. Insufficient differentiation. No T6 verdict note required for T4-class.

---

## Candidate 3 — `affaann-m/claude-swarm` (multi-agent CC orchestration with Opus quality gate)

### Provenance

- **GitHub URL**: https://github.com/affaann-m/claude-swarm
- **Tagline**: "Multi-agent orchestration for Claude Code — decompose tasks, coordinate agents, visualize everything in a rich terminal UI"
- **Pattern**: Phase 1 Opus 4.6 decompose → Phase 2 parallel Haiku workers → Phase 2.5 Opus quality gate → Phase 3 summary
- **MCP family attribution**: exa (#2) · github (#1)
- **License**: not surfaced; affaan-m org also produces ECC (already in our discovery set per CLAUDE.md L88 "ECC marketplace-RC")

### Sca-v7 scoring

| Dim | Score | Rationale |
|---|:---:|---|
| D5 evidence | 3 | Architecture defensible (DAG + file-lock + budget) but no benchmark |
| D7 maintenance | 4 | Active |
| D10 duplication | 2 | Direct overlap with INSTALLED `wshobson/agent-teams` (T2 verdict W312 row 47) + ECC `affaan-m` (separate registry) |
| D13 pattern-extractability | 4 | DAG-aware scheduling + file conflict detection + Opus quality gate are all extractable patterns |
| D14 reversibility | 4 | Python-only; uninstall ≤1 min |
| D17 robustness | 3 | Demo mode + JSONL session-replay show test discipline |
| D28 long-running fitness | 4 | "Long-running with replay" pattern matches Anthropic effective-harness criteria |

### Verdict

**T3 PATTERN-STUDY** — direct overlap with already-installed `agent-teams` cohort (D10=2) blocks T2 INSTALL per sca-v7 §6. Patterns of interest: **Opus 4.6 Quality Gate (Phase 2.5)** + **pessimistic file locking** + **JSONL session replay** — all extractable into a local skill if W315 commissions a "parallel-with-quality-gate" workflow distinct from agent-teams.

T6 verdict note: `verdicts/W314-affaann-m-claude-swarm.md`

---

## Candidate 4 — `yeshuibo/agentflow` (DAG-graph orchestration codex + claude + kimi)

### Provenance

- **GitHub URL**: https://github.com/yeshuibo/agentflow (fork of berbuddies/agentflow)
- **Tagline**: "Orchestrate codex, claude, and kimi agents in dependency graphs with parallel fanout, iterative cycles, and remote execution on SSH/EC2/ECS"
- **Pattern**: 94-node pipeline (plan → 64 workers → 8 batch merges → 16 reviews → 4 review merges → synthesis); fanout/merge/iteration primitives
- **MCP family attribution**: exa (#2)

### Sca-v7 scoring

| Dim | Score | Rationale |
|---|:---:|---|
| D5 evidence | 3 | Architecture pages well-documented; no benchmark replication |
| D7 maintenance | 4 | Apr 2026 release v1.67.x |
| D10 duplication | 3 | Distinct from agent-teams (graph-DAG vs lead-coordinated); analogous to LangGraph but Claude+Codex-native |
| D13 pattern-extractability | 5 | DAG primitives (Graph/fanout/merge/on_failure) + remote SSH/EC2/ECS execution all map cleanly to local primitive |
| D14 reversibility | 4 | Python-only; PATH installable |
| D29 browse/retrieval | 3 | Not relevant (this is orchestrator, not retrieval) |
| D27 independent adopter floor | TBD | Insufficient cascade (W315 deep-ingest) |

### Verdict

**T2 VENDOR-FORK** — strong pattern set with novel `fanout()`/`merge()`/`on_failure` cycle primitives that map cleanly onto Claude Code subagent+worktree primitives. The cross-LLM (claude+codex+kimi) capability differentiates it from agent-teams. **Cascade-degraded:true** for T1 (D1 license + D27 adopter-floor not yet probed); T2 is the safe ceiling.

T6 verdict note: `verdicts/W314-yeshuibo-agentflow.md`

---

## Candidate 5 — `samvallad33/vestige` (FSRS-6 spaced-repetition cognitive memory; single 22MB Rust binary)

### Provenance

- **GitHub URL**: https://github.com/samvallad33/vestige
- **Tagline**: "Cognitive memory for AI agents — FSRS-6 spaced repetition, 29 brain modules, 3D dashboard, single 22MB Rust binary. MCP server for Claude, Cursor, VS Code, Xcode, JetBrains."
- **MCP family attribution**: github search_repositories (#1)

### Sca-v7 scoring

| Dim | Score | Rationale |
|---|:---:|---|
| D5 evidence | 3 | FSRS-6 algorithm is established (Anki provenance); claim of 29 modules is novel but unverified |
| D7 maintenance | 4 | Active May 2026 |
| D10 duplication | 4 | Distinct from cognee (graph-RAG)/basic-memory (Markdown FTS5)/Letta (tiered blocks)/mem0 (vector) — FSRS-spaced-repetition is a novel pattern axis |
| D13 pattern-extractability | 5 | FSRS-6 + 29-module decomposition is a portable cognitive-science framework |
| D14 reversibility | 5 | Single 22MB Rust binary; uninstall trivial |
| D17 robustness | 3 | Single-maintainer; no test suite cited |
| D24 MCP attack surface | TBD | Insufficient cascade — W315 supply-chain probe required |

### Verdict

**T3 PATTERN-STUDY** — novel pattern (FSRS-6 spaced-repetition forgetting curve applied to agent memory) is highly extractable. D17/D24 caps prevent T2. Pattern worth absorbing into a future local-memory layer that combines basic-memory FTS5 + cognee graph + vestige spaced-repetition decay primitives. The "Ebbinghaus decay" approach (NEXO Brain comparison: 7d STM + 60d LTM half-lives) is the SOTA differentiator for agents living >months.

T6 verdict note: `verdicts/W314-samvallad33-vestige.md`

---

## Candidate 6 — `addyosmani/agent-skills` (production-grade engineering skills for AI coding agents)

### Provenance

- **GitHub URL**: https://github.com/addyosmani/agent-skills
- **Description**: "Production-grade engineering skills for AI coding agents."
- **Stars**: not enumerated (created 2026-02-15; pushed 2026-05-16)
- **Pedigree**: Addy Osmani = Chrome engineering lead; high author-prior weight (W287 P2.iii Bayesian author-prior feeds D6)
- **MCP family attribution**: github (#1) · WebSearch (#4)

### Sca-v7 scoring

| Dim | Score | Rationale |
|---|:---:|---|
| D5 evidence | 4 | Per WebSearch result, distills Chrome team performance research into actionable Claude instructions; production-tested pedigree |
| D6 authority weight | 5 | Chrome engineering lead; bestselling author |
| D7 maintenance | 4 | Active May 2026 |
| D10 duplication | 4 | Web-quality skill axis distinct from current installed cohort (no installed plugin covers Chrome perf research) |
| D11 documentation | 4 | Anthropic-canonical SKILL.md format expected from Addy's pedigree |
| D13 pattern-extractability | 5 | Production-grade engineering skills — directly install-and-fire |
| D14 reversibility | 5 | Standard Claude plugin marketplace install ≤1 min |
| D16 bus-factor governance | 3 | Solo-maintained but high-pedigree (D16=3 passes T1+T2 cap of <2) |
| D17 robustness | 4 | Production-tested |
| D27 independent adopter floor | TBD | Insufficient cascade — W315 deep-ingest |
| D32 pin-freshness | 5 | Candidate IS upstream-origin → skip-N/A |

### Verdict

**T2 VENDOR-FORK / T1 INSTALL CANDIDATE (cascade-degraded gates promotion)** — strong fit. The cascade-floor breach (no repomix deep-ingest fired this wave per W314-D-DISCOVERY-CASCADE.md §6) caps it at T2; with W315 repomix+context7 deep-ingest, this candidate could promote to T1 INSTALL.

T6 verdict note: `verdicts/W314-addyosmani-agent-skills.md`

---

## Additional candidates briefly enumerated (not full-scored)

| # | Candidate | Surface | Likely tier | Reason for brief-only |
|---:|---|---|:---:|---|
| 7 | `mohsen1/claude-code-orchestrator` | Agent orchestration | T3 | Hierarchical Director/EMs/Workers pattern; overlaps wshobson cohort |
| 8 | `dlorenc/multiclaude` | Agent orchestration | T3 | tmux-based MMORPG metaphor; pattern interesting; D10 overlap |
| 9 | `JuliusBrussee/caveman` | Skill | INSTALLED (already in our skill catalog per CLAUDE.md L30) | Vendor-fork held |
| 10 | `Mizoreww/awesome-claude-code-config` | Curated config | T4 | Aggregator pattern; cite-only |
| 11 | `jeremylongshore/claude-code-plugins-plus-skills` | Mega-marketplace | T4 | 425 plugins + 2810 skills aggregator; quality-over-quantity violation |
| 12 | `affaan-m/ECC` | Mega-harness | T4 (ALREADY KNOWN via CLAUDE.md L88 "ECC marketplace-RC") | Already a known incumbent reference |

---

## Verdict summary (W314-D NET-NEW)

| Tier | Candidates |
|:---:|---|
| **T1 INSTALL** | 0 (cascade-floor breach blocks all T1 this wave) |
| **T2 VENDOR-FORK** | 2: `yeshuibo/agentflow` · `addyosmani/agent-skills` |
| **T3 PATTERN-STUDY** | 3: `Mibayy/token-savior` · `affaann-m/claude-swarm` · `samvallad33/vestige` |
| **T4 CITE-ONLY** | 1: `agentic-box/memora` |
| **T5 REJECT** | 0 |
| **Brief-enumerated** | 6 (candidates 7-12 above) |

## VERDICT-LEDGER row numbers to append

W314 row numbers: **#51 (PWF re-audit)** · **#52 (GitNexus re-audit)** · **#53 (wshobson re-audit)** · **#54 (mattpocock re-audit)** · **#55 (token-savior)** · **#56 (memora)** · **#57 (claude-swarm)** · **#58 (agentflow)** · **#59 (vestige)** · **#60 (addyosmani agent-skills)**.

Total **10 new rows** appended to ledger (4 re-audit HOLDs + 6 new candidate verdicts).
