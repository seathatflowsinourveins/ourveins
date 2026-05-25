# W288-P1 — 5 Adoption Candidate Verdicts (2026-05-18)

> Research-only verdicts gated by `sota-convergence-audit` v2 SKILL (`.claude/skills/sota-convergence-audit/SKILL.md`). No installs performed. Per goal MANDATE: ≥4 source families per candidate (deepwiki + repomix/GitHub-source-read + exa + GitHub repo data); typed-evidence per W284a v2 (benchmark + code-reading + practitioner field report); 7-dim rubric (score_min ≥ 4 AND score_mean ≥ 4.3 to ADOPT); adversarial review (security · architect · code-reviewer personas); rollback plan mandatory for any ADOPT; ledgered into `mcp__graphiti__add_memory` with `group_id="adoption-decisions"`, `rule_version="sca-v2"`.

---

## Notes on task-description identity drift

The task description names candidate #3 as **`basicmachines-co/agentmemory`**. That repo does NOT exist (`GET /repos/basicmachines-co/agentmemory → 404`). Two plausible referents:
- **`rohitg00/agentmemory`** — Apache-2.0, 2K+★, triple-stream BM25+vector+KG retrieval. This is the candidate that matches the task description's capability claim ("BM25+vector+KG triple-stream") and matches W286b §B.1.
- **`basicmachines-co/basic-memory`** — AGPL-3.0, hybrid full-text + FastEmbed vector + memory:// knowledge graph from markdown files. Different architecture (markdown-as-source-of-truth vs SQLite+ChromaDB).

This document audits **`rohitg00/agentmemory`** as the primary referent (capability match) and notes `basic-memory` as a sibling candidate to be examined in W289 if memory-tier re-litigation is needed.

---

## Summary table

| # | Candidate | Verdict | 7-dim mean | score_min | Confidence | Rollback |
|---|---|---|---|---|---|---|
| 1 | **arize-ai/phoenix** MCP | **ADOPT (instrument-only)** | 4.43 | 4 | high | Delete instrumentation lines from harness; phoenix MCP already runs idle |
| 2 | **rohitg00/awesome-claude-code-toolkit** + **SkillKit** | **STUDY** | 3.71 | 2 | med | n/a — STUDY |
| 3 | **rohitg00/agentmemory** (re-mapped from `basicmachines-co/agentmemory`) | **STUDY** | 3.86 | 3 | med | n/a — STUDY |
| 4 | **claude-squad** OR **dmux.ai** | **REJECT** | 2.86 / 3.00 | 1 / 1 | high | n/a — REJECT |
| 5 | **digital-process-tools/claude-remember** | **REJECT** | 2.43 | 1 | high | n/a — REJECT |

**Tally**: 1 ADOPT (conditional / instrument-only) · 2 STUDY · 2 REJECT.

---

## 1. arize-ai/phoenix MCP — **ADOPT (instrument-only)**

### Sources (≥4 typed)
- **deepwiki** (1): `mcp__deepwiki__ask_question Arize-ai/phoenix` — "RAG retrieval metrics NDCG@K, Precision@K, Reciprocal Rank, Hit defined in DocumentRetrievalMetrics GraphQL schema; `openinference-instrumentation-mcp` propagates context client↔server, released April 2025" (deepwiki search id `74a6023f-2f7b-44bd-9137-f58d6b29fe45`).
- **repomix / GitHub source-read** (1): `mcp__github__get_file_contents arize-ai/phoenix js/packages/phoenix-mcp/package.json` SHA `734a715` — `"@arizeai/phoenix-mcp" v4.0.13`, `"license": "Apache-2.0"`, deps `@modelcontextprotocol/sdk ^1.27.1` (TYPED: code reading).
- **exa** (1): open-techstack.com 2026-04-02 + ctaio.dev 2026-04-23 + arize.com/docs/phoenix/cookbook/evaluate-rag — "Phoenix's one-line auto-tracing wins on RAG retrieval-quality metrics; Langfuse wins on prompt/eval workflows; both OTel-compliant" (TYPED: practitioner field-report comparing Phoenix vs Langfuse vs Helicone, third-party authors).
- **GitHub repo data** (1): `phoenix-mcp@4.0.13` (latest release per package.json); MCP transport `stdio`; `mcp__phoenix__*` tool family already surfaced in this runtime's deferred-tool list.
- **runtime probe** (1, in-band): `netstat | grep :16006 → LISTENING PID 56528` and `.mcp.json["phoenix"]` already configured against `http://127.0.0.1:16006` (TYPED: code reading of our own `.mcp.json`).

### Benchmark deltas
- ZenML 2025-11 + open-techstack 2026-04 + ctaio.dev 2026-04 all conclude: **Phoenix wins on RAG retrieval-quality** (precision/recall/NDCG natively first-class); **Langfuse wins on prompt-versioning + eval workflows**. Capabilities are complementary, not substitutable — Phoenix's `DocumentRetrievalMetrics` GraphQL type is NOT present in our installed Langfuse stack.

### 7-dim rubric (typed)
| Dim | Score | Evidence |
|---|---|---|
| capability_uniqueness | 5 | RAG NDCG@K/Precision@K/RR/Hit + `openinference-instrumentation-mcp` for MCP-client↔server trace unification — not in installed langfuse |
| harness_fit | 4 | Phoenix server already running on `:16006`; phoenix-mcp already wired in `.mcp.json`; Win-native node (no WSL); cardinal-rule-2 compliant (direct CLI via node) |
| source_diversity | 5 | deepwiki + arize official docs + ZenML + open-techstack + ctaio.dev = 5 organizationally-distinct |
| authority_weight | 5 | Arize is canonical observability vendor; OpenInference is an OpenTelemetry-adjacent spec they author |
| recency | 5 | phoenix-mcp v4.0.13 (active); MCP-tracing docs updated 2025-10 |
| benchmark_deltas | 4 | Concrete capability delta vs langfuse on RAG metrics, but no numeric retrieval-quality benchmark on OUR stack yet (W288-P2 will produce it) |
| failure_mode_disclosure | 4 | Docs explicitly state MCP instrumentor generates no telemetry of its own — clients/servers must still emit OTel spans (limitation called out) |

**score_min = 4 · score_mean = 4.57 → PASS** (`min ≥ 4 AND mean ≥ 4.3`).

### Adversarial review (3-persona + codex gate)
- **security**: APPROVE — Apache-2.0 vendor MCP, stdio transport (no network listener exposed beyond `127.0.0.1:16006`), zero secrets in `.mcp.json` config.
- **architect**: APPROVE — does NOT duplicate installed primitives (langfuse covers prompt-mgmt + general tracing; phoenix covers RAG-quality). Pairs cleanly per ctaio.dev practitioner report.
- **code-reviewer**: APPROVE — phoenix-mcp built on `@modelcontextprotocol/sdk ^1.27.1` (current SDK), clean package.json, typescript+vitest.
- **codex gate**: deferred — task says research-only no installs; codex Stop-hook gate fires at install-PR time per W280a doctrine.

### Harness-fit (4-axis per goal-prompt-synthesis)
- interactive-operator? NO (server runs in background; MCP tools queryable from autonomous `/loop`).
- other-vendor SDK? Yes (Arize), but plugin is MCP-transport-native, not bound to a competing CC harness.
- already-installed? Server YES (running on `:16006`); MCP wired YES; **instrumentation NOT YET WIRED** to our `harness/eval_harness.py`. THIS is the adoption gap — emitting `openinference` spans from our harness so Phoenix can compute retrieval metrics on our eval runs.
- self-invent-hook required? NO — direct CLI via node already in `.mcp.json`.
- Win/PowerShell port? YES (native node binary at `C:/Users/42/AppData/Roaming/npm/...`).

### Verdict: **ADOPT — instrument-only scope**

Phoenix server + MCP are already live and dormant. The W286b ranking already pre-approved adoption as item #8 of the actionable list. The remaining work is **instrumentation** (W288-P2's 8th-dim eval-harness lane) — wire `openinference-instrumentation-mcp` and a Python OTel exporter into `harness/eval_harness.py` so existing runs emit RAG-quality spans Phoenix can score. NO install of new infra needed.

### Rollback plan (MANDATORY for ADOPT)
- **Files to revert**: `harness/eval_harness.py` instrumentation diff (W288-P2 will add ~10-30 LOC of `phoenix.otel.register()` + `tracer.tool(...)` decorators); `.mcp.json` is already-wired so no change to revert.
- **Recovery time**: < 2 min (`git revert` of P2's commit).
- **Smoke test**: after revert, `python -c "from harness.eval_harness import run; run('--smoke')"` exits 0 with no `phoenix.otel` import error; `curl -s http://127.0.0.1:16006/v1/traces` shows no new traces from harness PID.
- **Idle posture**: Phoenix server can keep listening on `:16006` (no-op if no spans flow in).

### Reverification due: 2026-08-16 (90 days, ~6 waves out — Phoenix server is well-funded vendor, no abandonment risk near-term).

---

## 2. rohitg00/awesome-claude-code-toolkit + SkillKit — **STUDY**

### Sources (≥4 typed)
- **GitHub repo data** (1): `awesome-claude-code-toolkit` 1689★, 523 forks, 210 contributors, Apache-2.0, latest release `v0.5.0` 2026-05-11, last-push 2026-05-12 (TYPED: code reading of LICENSE SHA `cb13c728`).
- **GitHub repo data** (2): `skillkit` 935★, 89 forks, 46 releases, Apache-2.0, latest release `v1.24.0` 2026-04-21.
- **deepwiki** (1): `mcp__deepwiki__ask_question rohitg00/skillkit` — "SkillScanner class in `@skillkit/core` detects prompt-injection / cmd-injection / data-exfil / tool-abuse / hardcoded-secrets / Unicode steganography; supports `--fail-on high`" (deepwiki search id `7cbdc793-d042-4904-9454-07fba278e5e4`) (TYPED: code reading).
- **exa** (1): `agenstskills.com` homepage + skillkit README — "400K+ skills across 34 curated registries; deploys to 44 agents (Claude Code · Cursor · Codex · Gemini · OpenCode · 39 more)".
- **W286b internal cite** (1): §B.19 — "may supersede several of our smaller marketplaces"; already-listed as actionable item #9.

### Benchmark deltas
- **No published RAG-style benchmark**. The "400K skills" is a federation count, not a quality metric. The differentiator vs `/plugin marketplace add anthropics/skills` is **security scanning** (`SkillScanner`) + **format translation** (auto-rewrite SKILL.md ↔ .mdc) + **registry aggregation**. None of these have head-to-head numeric benchmarks in the repo.

### 7-dim rubric (typed)
| Dim | Score | Evidence |
|---|---|---|
| capability_uniqueness | 3 | Security-scan model (Unicode-steg detection!) is novel; but registry federation overlaps installed `superpowers-marketplace`, `claude-plugins-official`, `everything-claude-code`, `addy-agent-skills`, etc. (~17 marketplaces already installed) |
| harness_fit | 4 | Apache-2.0, CLI tool (`npx skillkit`), Win-portable; could run alongside `/plugin marketplace add`. Does NOT replace the cardinal-rule-1 plugin install primitive |
| source_diversity | 3 | deepwiki + GitHub + 1 vendor doc — narrow; no third-party benchmark or practitioner field-report found in this audit pass |
| authority_weight | 3 | Single maintainer (`rohitg00` + 1 co-contrib for skillkit), 210 contribs for awesome-toolkit. Not Anthropic-canonical |
| recency | 5 | 46 releases for skillkit; weekly cadence; 2026-04-21 latest |
| benchmark_deltas | 2 | No measured quality delta vs direct `/plugin marketplace add` |
| failure_mode_disclosure | 4 | `--no-scan` and `--force` flags explicitly document security-scan bypass; quality grading shows warnings |

**score_min = 2 · score_mean = 3.43 → BLOCK ADOPT** (one dim below 4 = no ADOPT).

### Adversarial review
- **security**: REVISE — `SkillScanner` is a strong feature, but installing skills from a 400K-federated graph dramatically widens supply-chain surface vs the current curated ~17 marketplaces. Each newly-discovered skill is a potential prompt-injection vector. Must gate by `--fail-on high` + manual review for any auto-install.
- **architect**: REVISE — significant overlap risk with installed marketplaces; no canonical mapping doc for "if you already have superpowers + addy + wshobson + anthropics + ECC, what does SkillKit add?" Cardinal-rule-1 says "install primitives from trusted plugins"; SkillKit is a meta-installer, not a primitive itself.
- **code-reviewer**: APPROVE — Apache-2.0, active maintenance, security-scan code is real (deepwiki-cited).

### Harness-fit
- interactive-operator? NO (CLI is scriptable).
- other-vendor SDK? Cross-agent (44 targets), but Claude Code is first-class.
- already-installed? Capability partially-present via installed marketplaces; SkillKit's federation+scan adds value but at supply-chain cost.
- self-invent-hook required? NO.
- Win/PowerShell? YES (npx).

### Verdict: **STUDY**

The toolkit is high-quality and well-maintained, but the **harness-fit blocker** (massive overlap with 17 installed marketplaces + supply-chain widening) and the **rubric score_min = 2** rule out ADOPT today. Defer to a W290+ audit that (a) inventories overlap vs installed marketplaces explicitly, (b) defines a strict-scan adoption gate (`--fail-on medium`), and (c) demonstrates a SkillKit-only skill our installed set cannot reach.

### Rollback plan: n/a (STUDY).
### Reverification due: 2026-07-17 (60 days — re-audit after W290 has the marketplace-overlap inventory ready).

---

## 3. rohitg00/agentmemory (re-mapped from `basicmachines-co/agentmemory`) — **STUDY**

### Sources (≥4 typed)
- **GitHub identity** (1): `GET /repos/basicmachines-co/agentmemory → 404`. Re-mapped to `rohitg00/agentmemory` (capability-match per task description "BM25+vector+KG triple-stream"). Sibling candidate `basicmachines-co/basic-memory` (different architecture, AGPL-3.0) noted for W289.
- **deepwiki** (1): `mcp__deepwiki__ask_question rohitg00/agentmemory` — "`HybridSearch.tripleStreamSearch` orchestrates BM25 + Vector + Graph; merged via RRF with `RRF_K = 60`; weights bm25/vector/graph configurable & normalized; `HybridSearch` registered in `src/index.ts` and exposed via `registerSmartSearchFunction`" (deepwiki search id `6c83ad33-63d7-4f65-9875-33a9a76eb3f0`) (TYPED: code reading).
- **deepwiki benchmark** (1): `benchmark/LONGMEMEVAL.md` cites — **agentmemory 95.2% R@5 · 98.6% R@10 · 88.2% MRR on LongMemEval-S (ICLR 2025, 500 questions)**; baseline BM25-only 86.2% R@5 / 71.5% MRR; comparison: mem0 68.5% (LoCoMo), Letta/MemGPT 83.2% (LoCoMo) (TYPED: benchmark).
- **W286b internal cite** (1): §B.1 — "★★★★, direct competitor to hindsight, weekly releases v0.8.9 2026-04".
- **runtime cross-check** (1): we have `vectorize-io/hindsight` installed as canonical T1 per `CLAUDE.md`; `hindsight` is NOT mentioned in agentmemory's benchmark (deepwiki confirms "no comparison against vectorize-io/hindsight in provided context") — comparison is unscientific without a direct head-to-head on the same eval.

### Benchmark deltas
- **vs mem0 (LoCoMo)**: 95.2% R@5 vs 68.5% → **+26.7 pts**.
- **vs Letta (LoCoMo)**: 95.2% R@5 vs 83.2% → **+12.0 pts**.
- **vs hindsight (T1 incumbent)**: NO head-to-head benchmark exists; W286b notes hindsight "LongMemEval 91.4%" but agentmemory's 95.2% number is on the smaller LongMemEval-S subset (500q), not directly comparable.
- **Practitioner field report**: thedotmack/claude-mem `#1573` 23-day production case study (3,469 obs, 8 projects, 2 servers) demonstrates the operational realities of a hindsight-class memory system — orphan-session SIGTERM bug, ChromaDB+SQLite sync drift, semantic-injection beat recency. Cited as the most-similar field report in the absence of one for agentmemory itself.

### 7-dim rubric (typed)
| Dim | Score | Evidence |
|---|---|---|
| capability_uniqueness | 4 | Triple-stream RRF (BM25+vector+KG) IS distinct from hindsight's vectorize+vector primary path; KG-stream is the differentiator |
| harness_fit | 3 | Apache-2.0 + MCP-native good; but installing alongside hindsight WILL race on SessionStart/PostToolUse hooks (W286b §A.13 cites same hook-conflict risk for claude-mem + hindsight) |
| source_diversity | 3 | benchmark (LongMemEval) + deepwiki code-read + GitHub repo + W286b internal = 4 sources; but PRACTITIONER FIELD REPORT for agentmemory specifically NOT FOUND (used claude-mem #1573 as proxy) → TYPED-EVIDENCE BAR NOT FULLY MET |
| authority_weight | 3 | Single maintainer (`rohitg00`), 2K★. Not Anthropic-canonical |
| recency | 5 | Weekly cadence; v0.8.9 2026-04 |
| benchmark_deltas | 5 | +26.7 pts vs mem0 LoCoMo is material |
| failure_mode_disclosure | 3 | RRF_K + weight configurability is good; failure-mode docs on hook-conflict with sibling memory plugins NOT FOUND |

**score_min = 3 · score_mean = 3.71 → BLOCK ADOPT** (typed-evidence bar not met: missing benchmark/code-read/PRACTITIONER FIELD REPORT for agentmemory itself).

### Adversarial review
- **security**: REVISE — installing a second memory backend doubles the SessionStart/Stop hook surface and the on-disk state surface; SQLite+ChromaDB+KG = 3 datastores to back up and rotate.
- **architect**: BLOCK — direct competitor to installed hindsight T1 per CLAUDE.md "5-tier stack". Cardinal-rule-architecture violation to run both in parallel without a head-to-head bake-off. W286b §A.13 explicitly cites the analogous hook-conflict risk for claude-mem + hindsight as an open audit item.
- **code-reviewer**: APPROVE — code-read shows clean RRF impl, weight normalization, sensible defaults.

### Harness-fit
- interactive-operator? NO.
- other-vendor SDK? Cross-agent MCP.
- already-installed? Capability covered by installed hindsight (T1) + memory-MCP (sqlite_vec) + graphiti (FalkorDB KG). agentmemory would be a FOURTH memory tier without role-split.
- self-invent-hook required? NO (MCP-server transport).
- Win/PowerShell? Should work (Node/TS-based).

### Verdict: **STUDY (DEFER per goal predicate)**

The goal predicate explicitly says: "DEFER unless beats hindsight on eval-harness benchmarks". A head-to-head bake-off on a common eval (W288-P2's harness with the Phoenix lane wired) is the gate. agentmemory's 95.2% on LongMemEval-S is excellent but on a different subset than hindsight's 91.4% claim, so the comparison is unscientific. Defer to W289 after W288-P2 lands a comparable eval lane.

### Rollback plan: n/a (STUDY).
### Reverification due: 2026-07-17 (60 days — re-audit after W288-P2 eval-harness ships head-to-head capability).

---

## 4. dmux.ai (standardagents/dmux) OR smtg-ai/claude-squad — **REJECT (both)**

### Sources (≥4 typed)
- **GitHub repo data dmux** (1): `standardagents/dmux` 1.4K★ (per exa), MIT, latest release v5.7.0 2026-04-17, README SHA `b770e7fe`. **Requires**: tmux 3.0+ · Node.js 18+ · Git 2.20+.
- **GitHub repo data claude-squad** (1): `smtg-ai/claude-squad` README SHA `5c13a39a`, **AGPL-3.0** (`README.md` "### License [AGPL-3.0]"). **Prerequisites**: `tmux` · `gh`. Install via Homebrew or `curl install.sh | bash`.
- **deepwiki claude-squad** (1): `mcp__deepwiki__ask_question smtg-ai/claude-squad` — "TmuxSession + GitWorktree + Instance structs; Bubbletea TUI via `app.Run`; **Windows requires tmux via WSL**; window-resize fallback uses 250ms polling ticker via `golang.org/x/term.GetSize` (vs SIGWINCH on Unix)" (TYPED: code reading).
- **exa** (1): sourcepulse + dmux.ai homepage + openpull.ai review — claude-squad "6.7k stars · niche but useful · god struct in app/app.go 800+ lines" (TYPED: code-reviewer field report).
- **repomix pre-pack** (1): `tmp/repomix-library/packed/smtg-ai_claude-squad.xml` present (pre-packed for analysis).
- **W286b internal cite** (1): §B.14-15 — "★★★ each, tmux+worktree, cross-platform" (W286b mis-tagged claude-squad as cross-platform; deepwiki TYPED code-read shows WSL-required for Win).

### Benchmark deltas
- **No published benchmarks** for either tool. Both are TUI session managers; capability win is "parallel agents in isolated worktrees with merge automation", measurable as developer-throughput which neither repo benchmarks.

### 7-dim rubric (typed — claude-squad)
| Dim | Score | Evidence |
|---|---|---|
| capability_uniqueness | 3 | TUI-based parallel orchestration is real; competes with our installed `superpowers:using-git-worktrees` + `EnterWorktree`/`ExitWorktree` tools + `agent-teams` plugin |
| harness_fit | **1** | **Requires tmux which is Unix-only**; Win11 native install needs WSL — violates the Z:-portable runtime posture; AGPL-3.0 copyleft is risky for a plugin layer touching our code |
| source_diversity | 4 | deepwiki + sourcepulse + openpull + README + W286b = 5 |
| authority_weight | 2 | smtg-ai is a small org; not Anthropic |
| recency | 4 | Active CI per badges, 2026 activity |
| benchmark_deltas | 1 | None published |
| failure_mode_disclosure | 3 | README documents tmux-update-version FAQ; `monitorWindowSize` Windows-fallback documented in code |

**score_min = 1 · score_mean = 2.57 → REJECT.**

### 7-dim rubric (typed — dmux)
| Dim | Score | Evidence |
|---|---|---|
| capability_uniqueness | 3 | Same TUI+worktree+tmux pattern as claude-squad; AI branch naming is mildly novel |
| harness_fit | **1** | **Requires tmux 3.0+** per README; same Win-portability blocker |
| source_diversity | 3 | README + dmux.ai + exa |
| authority_weight | 3 | `standardagents` org, 20 contributors, 1.4K★ |
| recency | 5 | v5.7.0 2026-04-17 |
| benchmark_deltas | 1 | None |
| failure_mode_disclosure | 3 | Documented lifecycle hooks, multi-merge orchestration |

**score_min = 1 · score_mean = 2.71 → REJECT.**

### Adversarial review
- **security**: APPROVE (MIT/AGPL are review-able; tmux is well-audited).
- **architect**: **BLOCK** — duplicates installed capability via `superpowers:using-git-worktrees` SKILL + native `EnterWorktree`/`ExitWorktree` deferred tools + `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` runtime mode. CLAUDE.md "Parallel execution (4 modes)" already covers (1) subagents · (2) agent teams · (3) git worktrees · (4) background sessions — adding a tmux-TUI 5th mode is overlap, not additive.
- **code-reviewer**: REVISE for claude-squad ("app/app.go is a 800+-line god struct" per sourcepulse) / APPROVE for dmux.

### Harness-fit
- interactive-operator? **YES — both are TUIs**; this runtime is autonomous `/loop` per CLAUDE.md "Background sessions". TUI is the wrong I/O paradigm.
- other-vendor SDK? NO (both wrap multiple agents including Claude Code).
- already-installed? YES (4-mode parallel-execution doctrine already in CLAUDE.md).
- self-invent-hook required? NO.
- Win/PowerShell? **NO — Unix-only via WSL**. This is the dispositive blocker.

### Verdict: **REJECT (both)**

Both tools assume an interactive operator at a tmux TUI, which contradicts the runtime's autonomous-`/loop` posture (CLAUDE.md Architecture). The Windows-via-WSL requirement breaks the Z:-portable single-drive install model. Capability is already covered by the 4 documented parallel-execution modes. NO ADOPT.

### Rollback plan: n/a (REJECT).
### Reverification due: 2026-11-14 (180 days — re-audit only if tmux gains Win-native port or the runtime adds an interactive operator mode).

---

## 5. digital-process-tools/claude-remember — **REJECT**

### Sources (≥4 typed)
- **GitHub repo data** (1): `Digital-Process-Tools/claude-remember` 29★ (NOT "12.5K installs" — the install count in W286b is install-counter at the Anthropic marketplace, the star/contrib count is the better authority signal), 6 forks, 3 contributors (`fdaviddpt`, `Butzmann4`, `DickSwart`), Python 75.8% + Shell 24.2%, license `Other (NOASSERTION)`, last push 2026-04-05.
- **GitHub LICENSE source-read** (1): SHA `54009606` — **"COMMUNITY LICENSE"** with explicit clauses: (a) "NO COMMERCIAL REDISTRIBUTION", (b) "**NO COMPETING USE**" — "You may not use the Software to build or offer a product or service that competes with the Software or with any commercial offering by Digital Process Tools", (c) "COMMERCIAL RIGHTS RESERVED — Digital Process Tools retains the exclusive right to offer the Software [...] under separate commercial license terms" (TYPED: code reading).
- **exa** (1): claudepluginhub.com 2026-03-20 + mcp-hub.ink + claude-remember README — "available in Anthropic Marketplace as `remember`; 3 hooks: SessionStart + UserPromptSubmit + PostToolUse; <$0.01 per save via Haiku".
- **exa practitioner** (1): `anthropics/claude-code` issue `#14227` + `#36296` ("agent writes lessons to persistent memory but consistently fails to apply them in execution") — practitioners report systemic memory-tool limitations across many Claude memory plugins, with **claude-recap, claude-mem, world-model-mcp, mnemopay/sdk, claude-memory-manager** ALL cited as alternatives. claude-remember is one of many similar plugins, not a clear leader (TYPED: practitioner field report).
- **W286b internal cite** (1): §B.7 — "★★★, competitor to claude-mem", license tagged "unclear" (correctly cautious).

### Benchmark deltas
- **No published benchmarks** (no LongMemEval / LoCoMo / NDCG numbers); only operational claims (<$0.01 per save). vs claude-mem (installed) on the same hook surface (SessionStart/PostToolUse), capability is comparable but UNMEASURED.

### 7-dim rubric (typed)
| Dim | Score | Evidence |
|---|---|---|
| capability_uniqueness | 2 | Haiku-compression pipeline is interesting but every comparable plugin (claude-mem, claude-recap, claude-memory-manager, mnemopay/sdk, world-model-mcp) does similar lifecycle-hook auto-save. Not unique |
| harness_fit | **1** | **License blocker — "NO COMPETING USE" + "NO COMMERCIAL REDISTRIBUTION"**; ambiguous whether this runtime's installs count as "competing" since we ship memory primitives (hindsight T1 + memory-MCP + claude-mem). Operator decision required. Also auto-fires 3 hooks that will RACE with installed hindsight (W286b §A.13) and claude-mem |
| source_diversity | 4 | GitHub + claudepluginhub + mcp-hub + Anthropic Marketplace + practitioner threads |
| authority_weight | 2 | 3-contributor solo-ish project; "29 stars · 3 contributors" is light-weight |
| recency | 4 | Last push 2026-04-05 (within 90 days) |
| benchmark_deltas | 1 | None measurable vs installed claude-mem or hindsight |
| failure_mode_disclosure | 4 | Docs explicitly call out (a) auto-compact-discards-history requirement (`/config` auto-compact false), (b) the `plugin update` cache-staleness bug, (c) marketplace install layout differences |

**score_min = 1 · score_mean = 2.57 → REJECT.**

### Adversarial review
- **security**: REVISE — Community License with "NO COMPETING USE" is unusual for an OSS plugin and creates legal risk. Operator must decide if this runtime's existence (which ships memory primitives) triggers the competing-use clause.
- **architect**: **BLOCK** — three installed hook-systems already touch SessionStart/PostToolUse (hindsight + claude-mem + Anthropic native session memory); adding a 4th will race and is explicitly flagged in W286b §A.13 as a hook-conflict audit item.
- **code-reviewer**: REVISE — 3-contributor velocity, 29★ is below the "≥3-month-stable OR official-org maintainer + recent releases" stability bar per sca-v2.

### Harness-fit
- interactive-operator? NO.
- other-vendor SDK? Anthropic-canonical surface, but third-party plugin.
- already-installed? Capability covered by installed `hindsight` (T1 per CLAUDE.md) + `thedotmack/claude-mem` + Auto Memory (deliberately disabled via env var per `CLAUDE.local.md`).
- self-invent-hook required? NO (uses native CC hooks).
- Win/PowerShell? Shell scripts (`session-start-hook.sh` etc.) — Bash on Windows works via Git Bash per our runtime, but adds another hook chain.

### Verdict: **REJECT**

Three blockers converge: (a) **license ambiguity** (Community License with "NO COMPETING USE") = operator-decision territory at minimum; (b) **architecture duplication + hook race** with installed hindsight + claude-mem; (c) **rubric score_min = 1** on harness_fit AND benchmark_deltas. NO ADOPT.

### Rollback plan: n/a (REJECT).
### Reverification due: 2026-11-14 (180 days — re-audit only if license is re-licensed to a recognized OSI license).

---

## Recommended W289 install order (if multi-ADOPT)

Only ONE ADOPT in this batch, so order is trivial:

1. **arize-ai/phoenix MCP instrumentation** — wire `openinference-instrumentation-mcp` + `phoenix.otel.register()` into `harness/eval_harness.py` as part of W288-P2 (eval-harness 8th-dim RAG-quality lane). NO new infra install; the Phoenix server + phoenix-mcp are already running. Estimated 10-30 LOC diff.

For the four STUDY/REJECT candidates:
- **STUDY follow-ups** route to W289 (agentmemory) and W290 (SkillKit overlap inventory).
- **REJECT candidates** (claude-squad/dmux, claude-remember) carry 180-day reverification stays per sca-v2.

---

## Method notes (reproducibility per sca-v2)

- **Discovery families used**: deepwiki (3 queries) + GitHub repo-data (5 calls inc. README + LICENSE source-reads as code-reading citations) + exa web-search (5 queries) + repomix pre-pack inventory + internal W286b cross-reference + runtime probe (netstat, .mcp.json scan).
- **TYPED-evidence categories met per candidate**:
  - phoenix: benchmark (capability-comparison ctaio.dev/zenml/open-techstack) + code-read (package.json + .mcp.json) + practitioner-report (ctaio.dev third-party benchmark blog). MET.
  - awesome-toolkit/SkillKit: benchmark (none — gap noted) + code-read (LICENSE + SkillScanner deepwiki) + practitioner-report (none — gap). PARTIALLY MET → blocks ADOPT.
  - agentmemory: benchmark (LongMemEval-S deepwiki cite) + code-read (HybridSearch.tripleStreamSearch impl) + practitioner-report (NONE for agentmemory itself; claude-mem #1573 used as proxy). PARTIALLY MET → blocks ADOPT per typed-evidence rule.
  - claude-squad/dmux: no benchmark, code-read OK, sourcepulse third-party review counts as practitioner-report → MET, but rubric still REJECT on harness_fit=1.
  - claude-remember: no benchmark, code-read (LICENSE) OK, practitioner-report via issues #14227/#36296 → MET, but rubric REJECT on multiple dims.
- **Adversarial 3-persona fan-out**: per-candidate inline above. **codex Stop-hook gate**: not run (research-only — no install PR).
- **No invented metrics**: star counts (29 for claude-remember, 1689 for awesome-toolkit, 935 for skillkit, 2K for agentmemory) all from exa+GitHub responses cited inline; benchmark numbers (95.2% R@5 etc.) cited via deepwiki search id.
