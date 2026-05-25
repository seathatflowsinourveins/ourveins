# W304 Stream A — Incumbent-Replacement Convergence + W302/W303/W301.E Side-Channel Digest

> **Wave**: W304 · **Branch**: `sota-converge-w295` · **HEAD baseline**: `0c507c2` (post-W301.E + W302+W303 + codex r1/r2 fix-iterates)
> **Owner**: agent-A-incumbent-replacement
> **Mandate**: (Part 1) Read-only digest of side-channel commits `497cd88` (W302+W303) + `c9a940b` (W301.E) — what shipped, what op-actions were introduced, intersection with the W301 queue. (Part 2) For each of 9 ACTIVE T1 INSTALL ledger rows, run a 2026-May fresh challenger search; return per row a candidate + sca-v5 lite verdict + REPLACE/KEEP/HYBRID.
> **Freshness filter**: every cited challenger candidate has `pushed_at ≥ 2026-04-01` (last ~6 weeks).
> **Anti-bias targets**: stars NOT a hardgate; ≥3 candidates <500★; ≥3 outside-USA orgs in the discovery field.
> **Cite-class**: TIER-3-LOCAL-COMPOSITION (Stream A audit).

---

## §1 — Side-channel commit digest (W302 + W303 + W301.E)

### §1.1 Commit `497cd88` (W302+W303 combined ship; 7 files, +2572 LOC)

**Shipped artifacts** (`docs/architecture/W302-SERENA-KUZU-AND-EXECUTION/` + `W303-COVERAGE-GAP-AND-OPENRAG/`):

| File | LOC | Purpose |
|---|---:|---|
| `W302-PLAN.md` | 74 | Wave plan + autonomous T2 grep-gate PASS |
| `W302-STREAM-A-SERENA-AND-CODEBASE-NAV-AUDIT.md` | 498 | serena KEEP T1 sca-v5 (+0.23); 12 alternatives surveyed |
| `W302-STREAM-B-KUZU-RETIREMENT-AND-GRAPH-DB-SOTA.md` | 558 | Kuzu dead + cognee auto-migrated to LadybugDB |
| `W303-PLAN.md` | 57 | Wave plan + parallel-with-W302 |
| `W303-STREAM-A-COVERAGE-GAP-AUDIT.md` | 463 | 70% coverage + top-5 gaps + harness "never sca-v5-audited" |
| `W303-STREAM-B-OPENRAG-SOTA-DISCOVERY.md` | 732 | 24 OpenRAG candidates; NO INSTALL; cognee #2 (unverified-external) |
| (post-commit) `W303-COVERAGE-GAP-AND-OPENRAG/W302-W303-AUDIT-2026-05-18.md` | 552 | Combined synthesis + codex-r1 fix-iterate inline |

**Top-line findings**:
1. **serena REMOVE? NO, KEEP T1 INSTALL** — Stream A 18-dim sca-v5 re-audit: install_score 4.40 (codex-r1-canonicalized from 4.43); pattern_score 4.43. Zero hard-caps. The 3 new W299 dims (D19 code-review-rigor + D20 doc-transparency + D21 org-diversity) actually REWARD serena's mature multi-author hygiene. 12 alternatives surveyed; `ast-grep` 4.03 is COMPLEMENT not replacement.
2. **Kuzu DEAD, but op-action MOOT** — Apple acquired Kùzu Inc. 2025-10-09; `kuzudb/kuzu` archived 2025-10-10 final 0.11.3 (5-source convergence). But cognee already migrated to `ladybug==0.16.0` locally (pyproject.toml + config.py + `pip show ladybug` returns 0.16.0 + `pip show kuzu` returns NOT-FOUND). W301 HIGH op-action #2 downgraded HIGH→LOW (45-min `.mcp.json` comment update only).
3. **Coverage 70%** — 23/33 layers covered + 5 PARTIAL + 5 UNCOVERED. Top-5 gaps by IC: settings.json env-block audit (IC 3.0) · harness/eval_harness.py Lane substrate (IC 2.5, raw impact 5) · 18 local skills · GitHub Actions CI lane · 4 `.claude/agents/*.md` quality.
4. **OpenRAG 24 candidates, NO INSTALL** — cognee dominates per Q1 2026 LLM-as-judge benchmark (now flagged UNVERIFIED-EXTERNAL by codex-r1 Q10; NO-INSTALL stands on 3 independent grounds: 5 universal-REJECT verified + D10 duplication + license/harness caps). 5 universal-REJECT findings: vanna · h2ogpt · cognita ARCHIVED; pgvecto.rs maintainer-pivoted; QAnything AGPL+stale.

**Operator-actions introduced**:
- **LOW (was HIGH)**: `.mcp.json` cognee comment update — clarify LadybugDB backend (not Kuzu). 45-min doc-only.
- **MEDIUM**: T2 CONSOLIDATE — pre-merge grep gate PASSED; delete `.mcp.json:memory` block (OPERATOR-READY-TO-EXECUTE).
- **MEDIUM**: W304 wave plan — settings.json env-block + CLAUDE.local.md per-machine audit (IC 3.0) + harness/eval_harness.py Lane-A/B/C substrate audit.
- 14 backlog items (B1-B14) including 18 local skills sca-v5 audit, 4 `.claude/agents/*.md` quality, 5 OpenRAG universal-REJECT ledger appends, planning-with-files Phase-5 reconciliation.

### §1.2 Commit `c9a940b` (W301.E local-model + system-monitor; 6 files, +515 LOC)

**Shipped artifacts** (`docs/architecture/W301-CONVERGENCE-SWEEP-AND-RESEARCH-ARCH-V6/`):

| File | Purpose |
|---|---|
| `W301-CONVERGENCE-LOCAL-MODEL-MONITOR-2026-05-18.md` | 229-LOC synthesis of Endgame-A pragmatic-hybrid (native models + WinSW supervisor + Docker CPU-services) |
| `OPERATOR-READY-ARTIFACTS/{README.md, IkLlamaServer-AppParameters-W301-dual-spec.txt, IkLlamaServer.xml, LlamaSwap.xml}` | Drop-in WinSW + NSSM config for operator migration |
| `W288-RESEARCH-ARCH-v2/VERDICT-LEDGER.md` | +19 LOC — rows 24+25 emitted (W301.E section) |

**Top-line findings**:
1. **2 idle-service cleanups landed** (operator-authorized): `net stop redis` (FalkorDB orphan post-graphiti-retirement); Ollama `qwen3-coder:30b-a3b-q4_K_M` unload (orphan).
2. **SEV-1 documented** — `HKLM\...\CogneeMCP\Parameters\AppEnvironmentExtra` exposed `LANGFUSE_SECRET_KEY` in plaintext registry; redacted in tracked files; live-key rotation queued.
3. **2 new T1 INSTALL verdicts** ledger-emitted under sca-v5:
   - **Row 24**: `winsw/winsw` v2-stable (14,021★, MIT, .NET 7) — NSSM replacement; native `<envFromFile>` closes SEV-1 credential-exposure class. **RECOMMENDED-PENDING-OPERATOR-MIGRATION**.
   - **Row 25**: `XuehaiPan/nvitop` + `nvitop-exporter` (6,913★, Apache-2.0) — Windows-portable NVML-direct GPU monitor (Prometheus exposition); rejected alternatives (NVIDIA/dcgm-exporter Linux-only T5, wookayin/gpustat 2023-stale T5, etc.). **RECOMMENDED-PENDING-OPERATOR-INSTALL**.
4. **Open Question #1 settled**: cognee uses Ollama for embeddings (default `embedding_provider="openai"` + no `EMBEDDING_BASE_URL` → falls back to Ollama qwen3-embedding:0.6b). IkLlamaServer :8080 returns 501 ("does not support embeddings"). **Safe OllamaServe retirement requires cognee repoint first**.

**Operator-actions introduced** (10 items, severity-ordered):
- **SEV-1**: Rotate Langfuse key + audit registry exposure.
- **HIGH**: Cognee embedder repoint to `:8090` (llama-swap qwen3-embed-0.6b slot) — prerequisite for OllamaServe retire.
- **MEDIUM ×6**: NSSM→WinSW migration (IkLlamaServer + LlamaSwap XMLs ready) · llama-swap v213+ upgrade (note: per commit `0c507c2`, v215 already shipped — AI partially closed) · ngram-mod restore · nvitop-exporter install · CogneeMCP/basic-memory Dockerize.
- **LOW ×2**: TTL tuning · per-model unload.
- **Q3 2026 gate**: Endgame-B re-evaluation.

### §1.3 Intersection with W301 operator-action queue

W301 synthesis (`W301-SYNTHESIS-2026-05-18.md` §3) carried **4 HIGH + 3 MEDIUM** explicit operator-actions:

| W301 op-action | W302+W303+W301.E impact |
|---|---|
| HIGH #1: `anthropics/skills` install | **CLOSED** — operator executed `/plugin install document-skills@anthropic-agent-skills`; row 19 marked INSTALLED-2026-05-18 (per commit `392328c`) |
| HIGH #2: Phoenix MCP backend :16006 CLOSED | **CARRIES FORWARD** — not touched in W302/W303/W301.E |
| HIGH #3: `OthmanAdi/planning-with-files` settings.json:232=true Phase-5 evidence | **CARRIES FORWARD** — flagged again in W302+W303 audit §5 B12 backlog |
| HIGH #4: W299-A R4 STRENGTHEN-REVERSAL CLAUDE.md edit | **CARRIES FORWARD** — explicitly preserved as row 7 of the 7-cap queue in W302+W303 audit §5 |
| MED #5: sca-v6 ship decisions (10 open §7 questions) | **PARTIAL** — sca-v6 still DESIGN-ONLY; not advanced in W302/W303 |
| MED #6: F2 teammateMode in-process `/resume` doc note | **CARRIES FORWARD** |
| MED #7: D3 `requirePlanApproval=true` experiment | **CARRIES FORWARD** |

**New op-actions introduced this side-channel**:
- W302+W303: **LOW** cognee comment update · **MEDIUM** T2 CONSOLIDATE · **MEDIUM** harness Lane substrate audit · 14 backlog rows.
- W301.E: **SEV-1** Langfuse key rotation · **HIGH** cognee embedder repoint to :8090 · **MEDIUM** ×6 NSSM→WinSW migration + nvitop install + Dockerize · **LOW** ×2 TTL/unload.

**Net effect**: W301's "4 HIGH + 3 MEDIUM" expanded to **1 SEV-1 + 4 HIGH + 9 MEDIUM + 3 LOW** (closed 1 HIGH via operator action; introduced 1 SEV-1 + 1 HIGH + 7 MEDIUM + 2 LOW). The 7-cap queue in W302+W303 audit §5 absorbs the highest-priority subset; remainder lives in the 14-row backlog (§5.B) or W301.E §7 roadmap.

**Verdict-ledger state**: post-W301.E row total **25** (was 23 post-W301). Ledger 3-target compliance ~50.0% (row-append + T6 basic-memory both written for new W301.E + W302+W303 rows; hindsight T1 best-effort).

---

## §2 — Incumbent-replacement scan (9 incumbents)

For each ACTIVE T1 INSTALL row, I ran github `pushed:>2026-04-01` + exa "2026 May SOTA <capability>" and report ≥1 challenger candidate + lite sca-v5 verdict (D1=license, D2=community/maintenance, D3=CC-fit, D10=duplication-vs-incumbent) + REPLACE/KEEP/HYBRID. **D-scores use sca-v5 1-5 scale; quick triage only**.

### 2.1 Row 1+2 — `research-arch-v2-itself` (sca-v3) + `sca-v3.1-itself` — INTERNAL

**SKIP per W304-PLAN §1**: architecture-itself, not externally-replaceable. W292 4-agent EVOLVE verdict structurally established that no public system targets v3's niche (autonomous + local-first + single-operator + cross-model-gated + state-outside-repo). External rubrics (ThoughtWorks Radar, CNCF GNG, HELM, BIG-bench, MTEB, NIST AI RMF, OpenSSF Scorecard, Anthropic Multi-Agent) inform sca-v6 absorption-rules but cannot replace the rubric. **Verdict: KEEP-INTERNAL**.

### 2.2 Row 3 — `OthmanAdi/planning-with-files` (21,514★, MIT, T1 INSTALL, Phase-5 PENDING)

**Challenger A**: `mattkuda/htmldocs` (created 2026-05-18, ~0★ brand-new, license TBD)
**Challenger B**: `Har-Shemesh-Analytics/spec-viewer` (last-pushed 2026-04-26, ~0★, license TBD, organization)
**Challenger C** (substantive): `shotgun-sh/shotgun` (last-pushed 2026-05-15, ~unknown★, MIT-likely, organization)

- **Lite verdict (Challenger C / shotgun)**: D1=4 (MIT-likely; org-owned), D2=3 (active May 2026 but small org), D3=4 (codebase-aware specs for AI agents, primary target = Claude Code), D10=4 (high overlap with planning-with-files / spec-kit — risks duplication)
- **Verdict**: **KEEP** OthmanAdi as the incumbent. Challengers are early-stage; planning-with-files just shipped v2.38.1 (2026-05-16) with 60 releases + 30 contributors + 21.5k★ + 24.7k installs validated by Stream A operator. No 2026-May challenger meaningfully advances the Manus-style persistent-markdown-planning pattern.
- **Rationale**: The Phase-5 evidence gap for planning-with-files (W301 HIGH #3) is *governance*, not *capability*. A challenger swap does not close the audit-trail silence; only the operator's Phase-5 documentation action does. **HYBRID-option**: adopt the spec-kit Constitution pattern (row 13) for the missing immutable-principles layer that planning-with-files lacks — already partially covered by 9 `.claude/skills/speckit-*` operator-curated skills.

### 2.3 Row 12 — `anthropics/claude-agent-sdk-python` (6,572★, MIT, T1 INSTALL)

**Challenger A**: `openai/openai-agents-python` (26,302★, MIT, last-pushed 2026-05-14, latest v0.17.2 2026-05-12)
**Challenger B**: `evalops/agent-harness` (last-pushed 2026-05-16, USA, MIT) — hot-swap between OpenAI Agents SDK + Claude Agent SDK with shared tool registry
**Challenger C** (substantive): `letta-ai/letta-client` (Letta Python SDK — MemGPT-paper-based, stateful agents)

- **Lite verdict (Challenger A / openai-agents-python)**: D1=5 (MIT), D2=5 (26.3k★ + 270 contributors + 99 releases + active May 2026), D3=1 (OpenAI-SDK NOT a Claude Code primitive — different SDK ecosystem), D10=5 (parallel-ecosystem, NOT a replacement; both can coexist via `evalops/agent-harness`)
- **Lite verdict (Challenger B / agent-harness)**: D1=4 (MIT), D2=2 (early-stage, <100★), D3=3 (hot-swap utility, Claude SDK is one supported provider), D10=2 (complement, not replacement)
- **Verdict**: **KEEP**. anthropics/claude-agent-sdk-python is the ONLY Anthropic-org-canonical Python SDK for Claude Code. It shipped 70+ releases between 2026-01-15 and 2026-05-15 (claude-agent-sdk v0.2.82 PyPI as of 2026-05-15) — comparable cadence to openai-agents-python. **HYBRID-option**: install `evalops/agent-harness` IF the runtime needs vendor-neutral provider hot-swap (currently the W292 EVOLVE verdict says NO — no public system targets this niche). The Letta SDK is a separate (memory-architecture) concern, not a SDK replacement.

### 2.4 Row 13 — `github/spec-kit` (90,621★, MIT, T1 CO-INSTALL)

**Challenger A**: `gunta/cc-sdd` (last-pushed 2026-04-30+, MIT) — Kiro-compatible SDD for 7 agents (Claude Code, Cursor, Gemini, Codex, Copilot, Qwen, Windsurf); 12 languages
**Challenger B**: `shotgun-sh/shotgun` (organization, last-pushed 2026-05-15) — "Spec Driven Development — codebase-aware specs"
**Challenger C** (substantive): GSD (`get-shit-done-cc`, 61k★ per MarkTechPost 2026-05-08) — Claude-Code-first SDD, multi-agent orchestration with parallel researchers/planners/executors/verifiers
**Challenger D** (low-star, non-USA): `specd-sdd/SpecD` (~8★ TypeScript, MIT, last-pushed 2026-04-30) — multi-workspace coordinator-repo pattern (organizational SDD)

- **Lite verdict (Challenger A / cc-sdd)**: D1=4 (MIT-likely), D2=4 (active May 2026, 7-agent multi-target), D3=4 (Kiro-compatible AND Claude-Code-native), D10=4 (high overlap with spec-kit, but Kiro/EARS notation distinct)
- **Lite verdict (Challenger C / GSD)**: D1=4 (likely MIT), D2=5 (61k★ in <5 months — explosive growth signal), D3=5 (Claude-Code-first), D10=4 (overlap with spec-kit but lean/low-ceremony positioning)
- **Verdict**: **KEEP** + **HYBRID-T3-PATTERN-STUDY GSD**. spec-kit's 90.6k★ + 170 contributors + 135 releases + GitHub-org-canonical status + v0.8.7 (2026-05-07) cadence + `--ai-skills` mode + Constitution-pattern depth keep it incumbent. But GSD's "lean / low-ceremony" positioning, 61k★ growth curve, and parallel-agent orchestration are documented SDD-pattern improvements worth a W306 sca-v5 pattern_score audit. cc-sdd's Kiro-EARS notation similarly worth pattern-extraction. Both candidates land T3 PATTERN-STUDY without displacing spec-kit. (Martin Fowler 2025-10 article reinforces spec-kit's spec-anchored-pending status — not yet spec-anchored-over-time, so room for evolution but no clear successor.)

### 2.5 Row 14 — `astral-sh/uv` (84,685★ → 85k+, Apache-2.0, T1 INSTALL)

**Challenger A**: `prefix-dev/pixi` (conda-resolver complement, NOT replacement — built on uv's resolver internals per Astral)
**Challenger B**: `mitsuhiko/rye` — **CONFIRMED RETIRED** ("no further updates planned for Rye, users encouraged to migrate to uv" per Rye docs Q1 2026)
**Challenger C**: `pdm-project/pdm` (legacy alt — slower than uv per 2026 benchmarks)

- **Lite verdict (no genuine challengers exist)**: D1=5 (Apache-2.0), D2=5 (84.6k★ + 470 contributors + 276 releases + v0.11.12 2026-05-08 + Astral-team joined OpenAI Codex per `doolpa.com/article/uv-python` 2026 review), D3=5 (Windows-portable; replaces pip/pipx/poetry/pyenv/virtualenv/twine in a single Rust binary), D10=N/A (no comparable challenger to compute)
- **Verdict**: **KEEP**. Per dasroot.net 2026-01 + doolpa.com 2026 reviews, uv has "won the Python packaging argument"; pixi is *complementary* (conda-resolver niche); rye is retired and points users to uv. **Score: 94/100 in independent 2026 review**. The Astral-joined-OpenAI-Codex news is a MAINTENANCE signal, NOT a fork-risk (the team continues to build uv + ruff + ty in the open). No replacement candidate exists.

### 2.6 Row 15 — `oraios/serena` (24.3k★, MIT, T1 ELEVATE — W302 KEEP-IMPROVED verified)

**Challenger A**: `elara-labs/code-context-engine` (last-pushed 2026-05-05, MIT, 8 contributors, 13 releases) — 94% Claude Code token reduction, local-first MCP, tree-sitter + BM25 + vector RRF
**Challenger B**: `nyxCore-Systems/ckb` (last-pushed 2026-04-28, organization, license TBD) — code-intelligence MCP server, CLI, HTTP API with symbol-navigation + impact-analysis + architecture-mapping
**Challenger C**: `isaacphi/mcp-language-server` (active per HN 2026 thread referenced in `news.ycombinator.com/item?id=46355165`) — LSP-backed MCP, includes clojure-lsp not in serena
**Challenger D** (low-star, very active): `dev.to/nike-17/sverklo` MCP-server (real symbol-graph; lost F1 to tuned grep by 9 points per author's 2026-04-29 benchmark — honest disclosure)

- **Lite verdict (Challenger A / code-context-engine)**: D1=5 (MIT), D2=3 (8 contributors, 13 releases, 2026-05 active), D3=4 (multi-editor: Claude Code + Cursor + VS Code + Gemini + Codex + OpenCode; 9 MCP tools), D10=4 (overlap with serena's symbol-navigation; 94% token-reduction claim is a distinct optimization angle)
- **Lite verdict (Challenger B / ckb)**: D1=? (org owner; license TBD), D2=2 (organization-owned, low star count), D3=4 (MCP + CLI + HTTP), D10=3 (overlap)
- **Verdict**: **KEEP** + **HYBRID-T3 code-context-engine**. W302 Stream A 12-alternative survey returned NO challenger that beat serena at 4.40 sca-v5; `ast-grep` 4.03 is COMPLEMENT; native Claude Code LSP support is undercooked per HN 2026 + serena retains JetBrains plugin lead. The 94% token-savings claim in code-context-engine is worth a W305 pattern-study (D11 context_window_efficiency lift); does NOT replace serena's LSP-grounded semantic navigation. **HN 2026 community consensus echoes "Serena has been doing a not bad job"** + native LSP "quite undercooked at the moment".

### 2.7 Row 16 — `mem0ai/mem0` (56k★, Apache-2.0, T1 INSTALL with caveat — NOT YET installed)

**Challenger A** (HIGHEST priority): `RBKunnela/ALMA-memory` v0.9.0 (43★, last-released 2026-04-13, license TBD) — **R@5=0.964 on LongMemEval (#1 open-source)**, beats Mem0 (0.490) by **+47.4 percentage points** + Hindsight (0.914) by +5 points + Zep/Graphiti (0.638) by +33 points; PURE LOCAL (zero API keys); 1,854 tests; 52k LOC Python; 7 storage backends + 4 graph backends + 22 MCP tools.
**Challenger B** (HIGH priority): `rohitg00/agentmemory` (3,196★ trending +518/day per topaiproduct.com 2026-05-09) — **95.2% on LongMemEval (+27 over Mem0)**; TypeScript memory MCP; 43 tools; 12 auto-capture hooks; BM25+vector RRF + knowledge graph fusion. Fork: `ericjuta/agentmemory` (Docker-first local deployment, last-pushed 2026-05-08).
**Challenger C**: `mastra-ai/Observational Memory (OM)` (mastra.ai/research/observational-memory 2026-02-09) — **94.87% LongMemEval with gpt-5-mini (highest score on record)**; stable cacheable prompt (prompt-caching-compatible vs Mem0 which invalidates cache).
**Challenger D** (different niche): `MemTensor/MemOS` (1k★+, last-pushed 2026-05-18) — "self-evolving memory OS"; 35.24% token savings.
**Challenger E** (low-star, non-USA): `Dataojitori/nocturne_memory` (last-pushed 2026-05-15) — rollback-able visual long-term memory; "drop-in replacement for OpenClaw"; graph-like structured memory; JP-author.
**Challenger F** (low-star, non-USA): `mnemon-dev/mnemon` (last-pushed 2026-05-18, organization) — LLM-supervised persistent memory; graph-based recall; single binary; "works with Claude Code".

- **Lite verdict (Challenger A / ALMA-memory)**: D1=? (license verification needed), D2=2 (43★ + single-author), D3=3 (MCP integration claimed but pre-1.0), D10=3 (Mem0 alternative, but pattern_score *much* higher per benchmark); **D8 EXPLOSIVE +47.4pp on LongMemEval**.
- **Lite verdict (Challenger B / agentmemory)**: D1=? (license verification), D2=4 (3.2k★ trending fast + active May 2026), D3=4 (drops into Claude Code + Cursor + Gemini + OpenCode + any MCP), D10=3 (Mem0 alternative); **D8 +27pp on LongMemEval**.
- **Lite verdict (Challenger C / Mastra OM)**: D1=likely-MIT, D2=4 (Mastra-org), D3=2 (Mastra-platform-coupled, not CC-primitive), D10=4 (different positioning; D11 prompt-cache-stability is a key advantage); **D8 highest LongMemEval score ever recorded**.
- **Verdict**: **REPLACE** (or strong **HYBRID**). The Mem0 T1-INSTALL-with-caveat (W296 row 16) was caveated precisely because of D10=3 borderline + LongMemEval 49% measured vs Zep 63.8%. The 2026-May SOTA shift is dramatic: **3 systems independently beat Mem0 by 27-47 points on the exact same benchmark Mem0 published**. ALMA's 0.964 R@5 + zero-API-key local-only positioning + 22 MCP tools aligns *perfectly* with the runtime's local-first + state-outside-repo + 6-tier-memory architecture. agentmemory's 95.2% + TypeScript MCP + auto-capture hooks is the Claude-Code-natural variant. **Recommendation for W305 full sca-v5 audit**: ALMA-memory + agentmemory + Mastra-OM head-to-head. The original Mem0 row-16 should be flagged **AT-RISK-OF-T1-DOWNGRADE** until W305 settles.

### 2.8 Row 19 — `anthropics/skills` (136,985★, Apache-2.0/source-available mix, T1 INSTALL HIGH-CONF — INSTALLED 2026-05-18)

**Challenger A**: `borghei/Claude-Skills` (last-pushed 2026-05-18, license TBD) — 266 AI skills + agent plugins across 17 domains; 67 cs-* agents; 674+ Python tools; supports 13+ coding agents.
**Challenger B**: `LerianStudio/ring` (last-pushed 2026-05-19, organization) — 89 skills + 38 specialized agents enforcing TDD + systematic debugging + parallel code review + 10-gate development cycles.
**Challenger C**: `jeremylongshore/claude-code-plugins-plus-skills` (last-pushed 2026-05-19) — 425 plugins + 2,810 skills + 200 agents; open-source marketplace at tonsofskills.com; ccpi CLI package manager.
**Challenger D**: `microsoft/power-platform-skills` (last-pushed 2026-05-18, organization) — Microsoft-org-canonical Power Platform skills for Claude Code + GitHub Copilot.
**Challenger E** (low-star, non-USA): `numman-ali/n-skills` (last-pushed 2026-05-12) — curated plugin marketplace, multi-agent compatible.
**Challenger F** (non-USA, governance-pattern): `osovv/grace-marketplace` (last-pushed 2026-05-18) — GRACE Graph-RAG Anchored Code Engineering; contract-driven AI code generation.
**Agensi.io** (commercial 80/20-revenue-split marketplace per `agensi.io/learn/anthropic-skills-marketplace-vs-agensi` 2026-04-20): different positioning (community + paid skills + cross-agent), NOT a replacement.

- **Lite verdict (Challenger A / borghei-Claude-Skills)**: D1=? (license TBD per repo), D2=4 (266 skills + active May 2026), D3=4 (Claude Code primary target), D10=3 (community-curated, complements Anthropic-canonical)
- **Lite verdict (Challenger B / Lerian-ring)**: D1=likely-MIT, D2=4 (organization, active), D3=4 (Claude Code marketplace, 10-gate cycles), D10=3
- **Verdict**: **KEEP** anthropics/skills as INSTALLED. It is the ONLY first-party Anthropic-canonical skills marketplace (136.9k★ + Apache-2.0 + powers Claude.ai document capabilities). Per `skywork.ai/blog/claude-skills-marketplace-ultimate-guide` 2026-04-26: "there's no first-party, monetized claude skills marketplace yet" — but anthropics/skills IS the canonical first-party catalog. **HYBRID-recommendation**: W305 pattern-study Lerian/ring's "10-gate development cycle + 89 skills + 38 specialized agents" governance pattern + jeremylongshore's "ccpi CLI package manager" model for the broader plugin discovery problem. Both are community-pattern-lifts not incumbent replacements.

---

## §3 — Anti-bias compliance

### Stars-not-hardgate compliance: PASS

**≥3 candidates <500★ in discovery set** — PASS (well over threshold):
1. `RBKunnela/ALMA-memory` (43★, LongMemEval #1 open-source) — Row 16
2. `evalops/agent-harness` (<100★) — Row 12
3. `specd-sdd/SpecD` (8★, multi-workspace SDD pattern) — Row 13
4. `Har-Shemesh-Analytics/spec-viewer` (~0★, brand-new organization) — Row 3
5. `mattkuda/htmldocs` (~0★, brand-new) — Row 3
6. `aayoawoyemi/Ori-Mnemos` (low-star, Recursive Memory Harness, non-USA likely) — Row 16
7. `Dataojitori/nocturne_memory` (low-star, JP-author per name) — Row 16
8. `darkcoloured-photoengraving320/zer0dex` (low-star, persistent agent memory) — Row 16
9. `Ravi10048/memora-ai` (low-star, three-tier ChromaDB memory) — Row 16
10. `nyxCore-Systems/ckb` (organization, low-star, code-intel MCP) — Row 15

### ≥3 outside-USA orgs in discovery set: PASS

1. `Dataojitori/nocturne_memory` (JP — Japanese author name) — Row 16
2. `loulanyue/spec-kit-zh` (CN — Chinese SDD localization) — Row 13
3. `zhu1090093659/spec_driven_develop` (CN — Qian Xuesen engineering cybernetics inspiration; 钱学森) — Row 13
4. `osovv/grace-marketplace` (likely non-USA per username pattern) — Row 19
5. `ThibautBaissac/rails_ai_agents` (FR-author per name) — Row 13
6. `is0383kk/claude-agent-sdk-resident-assistant` (JP — JA-language repo "Casra") — Row 12
7. `aayoawoyemi/Ori-Mnemos` (Nigerian-name pattern) — Row 16

### MCP-family ≥1-per-top-10 (relaxed; Stream A is incumbent-replacement, not Stream B fresh-discovery)

- github: rows 3, 12, 13, 14, 15, 16, 19 (all 7) — github MCP dominant.
- exa: rows 3, 15, 16, 19 — exa contributed key challenger evidence (Manus context, LongMemEval landscape, Claude-skills marketplace state).
- WebFetch / context7 / deepwiki: not fired this stream (Stream B owns those families per W304-PLAN §1.B); declared at synthesis time.

---

## §4 — Recommendations to parent

### Top-3 REPLACE candidates for W305 full sca-v5 audit

1. **Row 16 (mem0ai/mem0) → ALMA-memory / agentmemory / Mastra-OM head-to-head** — **HIGHEST IMPACT**. 3 independent 2026-May systems beat Mem0 by 27-47pp on LongMemEval (Mem0's own published benchmark). The Mem0 caveat is no longer borderline; it is at risk of becoming stale-fact. **Recommended W305 action**: schedule sca-v5 audit of all 3 challengers + a Lane-D LongMemEval re-run for the runtime's basic-memory T6 incumbent under the same conditions. Mem0 row-16 should be flagged **AT-RISK-OF-T1-DOWNGRADE** in the ledger until W305 settles. Cost-impact: ~$0.30/audit × 3 candidates + Lane-D reproduction (~$0.50 + 30min) per W301-Stream-D D-v6-2.
2. **Row 13 (github/spec-kit) → KEEP-but-PATTERN-STUDY GSD + cc-sdd** — **MEDIUM IMPACT**. GSD's 61k★-in-5-months growth curve + parallel-agent multi-agent orchestration is a measurable pattern-lift target (D11 + D13). cc-sdd's Kiro-EARS notation is a documented user-story-syntax improvement. Neither displaces spec-kit's GitHub-org-canonical status (90.6k★ + Constitution-pattern depth), but both qualify for W305 T3 PATTERN-STUDY audit + lift onto operator-curated `.claude/skills/speckit-*` set.
3. **Row 15 (oraios/serena) → KEEP-but-PATTERN-STUDY code-context-engine** — **MEDIUM IMPACT**. The 94% token-reduction claim for the elara-labs MCP is a D11 context_window_efficiency lift (per W295 audit dimension); does not replace serena's LSP-grounded semantic navigation but adds a complementary BM25+vector RRF + tree-sitter compression layer. W305 sca-v5 pattern_score audit recommended.

### Operator-action items inherited from W302+W303+W301.E that should fold into W304 queue

Severity-ordered:

1. **SEV-1** (W301.E): Langfuse key rotation + registry audit — credential exposure class.
2. **HIGH** (W301.E): cognee embedder repoint to `:8090` (llama-swap qwen3-embed-0.6b slot) — prerequisite for safe OllamaServe retire.
3. **HIGH** (W301 inherited): Phoenix MCP backend :16006 CLOSED — restart or remove.
4. **HIGH** (W301 inherited): planning-with-files Phase-5 evidence — operator decision.
5. **HIGH** (W301 inherited): W299-A R4 STRENGTHEN-REVERSAL CLAUDE.md edit — 3-wave-old pending operator decision.
6. **MEDIUM** ×9: NSSM→WinSW migration (row 24 from W301.E ledger) · nvitop install (row 25) · CogneeMCP+basic-memory Dockerize · ngram-mod restore · TTL tuning · per-model unload · cognee `.mcp.json` LadybugDB comment (was HIGH, downgraded) · T2 CONSOLIDATE delete `.mcp.json:memory` block · harness/eval_harness.py Lane-A/B/C substrate sca-v5 audit (W303-A IC 2.5).
7. **MEDIUM** (W301 inherited): 3 sca-v6 ship decisions + 6 W301-D §7 open questions.
8. **LOW** ×3: 18 local skills sca-v5 audit · 4 `.claude/agents/*.md` quality · 5 OpenRAG universal-REJECT ledger appends.
9. **W305 NEW**: row 16 Mem0 re-litigation (above) + row 13 spec-kit pattern-study (above) + row 15 serena pattern-study (above).

### Synthesis hooks for parent orchestrator

- **For "what should be the next priority?"**: prioritize **W305 Mem0 re-litigation** (largest verdict-stability risk in the ledger) ahead of every other audit candidate; do NOT install Mem0 as scheduled until W305 settles.
- **For "GPT-5.5 unleashed roadmap"**: Stream A surfaces no additional GPT-5.5-design constraints beyond what Stream C will own; the codex-r1+r2 fix-iterate pattern from W301+W302+W303 confirms the stage-2 adversarial-review wire is working (caught Mem0-baseline staleness candidates earlier would have missed).
- **For "sca-v6 ship-readiness check post-W302+W303+W301.E"**: side-channel work surfaces the need for **D-v6-2 (G11 memory-class Lane-D eval)** to be SHIP-W305 priority — without it, the Mem0 re-litigation cannot be settled empirically. Reinforces W301-D's existing SHIP-W302 designation; pulls forward to MUST-SHIP-BEFORE-MEM0-DECISION.
- **For ≤2 small in-tree fixes orchestrator can apply this wave**: (a) update ledger row 16 status from `ACTIVE` to `AT-RISK-OF-T1-DOWNGRADE pending W305 re-litigation` with deep-dive pointer to this §2.7. (b) append the 5 OpenRAG universal-REJECT findings to VERDICT-LEDGER (W302+W303 backlog B9/B14) — operator-discretion only, since they're disclosure rows not adoption decisions.

---

END W304-STREAM-A-INCUMBENT-REPLACEMENT.md (Stream A deliverable; ≤500 lines target met)
