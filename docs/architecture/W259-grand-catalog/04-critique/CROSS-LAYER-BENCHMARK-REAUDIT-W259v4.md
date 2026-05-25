# W259 v4 — Cross-Layer Benchmark-Integrity Re-Audit (Wave-4)

> **Mission**: A benchmark-methodology error was found in W259's memory layer (Wave-2 scored mem0 against its own favored **LoCoMo** metric — claimed-94% — instead of the harder canonical **LongMemEval**, where mem0 actually scores **49.0%**). Operator directive: *"it need to be full audit and researched with every layer, not only memory."* This document re-audits L0 (MCP substrate), L1 (cross-model proxy), L4 (eval/obs), L5 (scaffold), L1.5 (KG sublayer), and Layer C (serving) for the **same class of error**.
> **Date**: 2026-05-16 · **Authority**: W259 Wave-4 Cross-Layer Benchmark Re-Auditor
> **Method**: re-read MASTER-SCORING-MATRIX-W259.md + 4 layer deepdives (A/B/C/D) + W258-V13-CRITIQUE.md; independent cross-check via `mcp__deepwiki__ask_question` (Graphiti) + `mcp__plugin_everything-claude-code_exa__web_search_exa` (6 independent-leaderboard probes).
> **Cite-class**: `effective_tier=TIER-3-LOCAL-COMPOSITION` per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8. Independent-source constituents dated 2026-Q1/Q2 listed per §.

---

## §0 — The mem0 / LoCoMo-vs-LongMemEval Error Class (what to look for)

### 0.1 — The original error, precisely

W259 Wave-2 (memory layer) scored mem0 high partly on the strength of a **94%-class LoCoMo** number. That number is **vendor-favored**:

1. **The benchmark is too easy.** LoCoMo conversations average **16k-26k tokens** — *within* a modern LLM's native context window. Zep's own teardown (`blog.getzep.com/lies-damn-lies-statistics-is-mem0-really-sota-in-agent-memory/`, 2025-05-06) shows mem0's own paper has a **plain full-context baseline beating mem0** (~73% vs mem0's ~68%) — i.e. the "memory system" loses to "just paste the transcript."
2. **The publisher picked it.** mem0 published the LoCoMo result; the benchmark choice and the competitor-implementation were both controlled by the party being measured. Zep's correction shows mem0's paper under-scored Zep (65.99% reported vs 75.14% corrected) via a *sequential-search implementation bug* in the competitor harness.
3. **The canonical hard benchmark tells a different story.** On **LongMemEval** (ICLR 2025, Wang et al. — 500 questions, avg **115k tokens**, explicit temporal-reasoning + knowledge-update tasks), mem0 scores **49.0%** with GPT-4o (`agentmarketcap.ai` 2026-04-08, `vectorize.io` 2026-03-15). Zep scores 63.8% on the same test — a **15-point real architectural gap** that LoCoMo masks.

### 0.2 — The generalized error class — six diagnostic signatures

A layer's scoring is **benchmark-compromised** if any of these hold for a repo whose composite depends on a number:

| # | Signature | Why it inflates |
|---|---|---|
| **E1** | **Publisher-run benchmark** — the number comes from the repo/vendor's own blog/README/paper | Self-grading; competitor harnesses misconfigured |
| **E2** | **Soft-benchmark substitution** — an easy benchmark used where a harder canonical one exists (LoCoMo vs LongMemEval; SWE-bench Verified vs Pro) | Easy benchmark compresses real gaps |
| **E3** | **Tuned-self vs default-others** — the scoring repo runs its *optimized* config; competitors run *defaults* | Apples-to-oranges; the gap is config, not architecture |
| **E4** | **Star-count as quality proxy** — adoption inferred from GitHub stars rather than real install/dependent/maintenance signal | Stars measure launch-day virality, not production fitness |
| **E5** | **Marketing-claim as Axis-2** — a vendor "Nx faster" / "best-in-class" tagline counted as an independent endorsement | The claim and the measurement share an author |
| **E6** | **Single-publisher convergence** — "≥3 orgs" satisfied by 3 articles that all republish one vendor benchmark | Not independent corroboration |

### 0.3 — Master-matrix exposure

The W259 master matrix's **D8 (Industry adoption)**, **D3 (Star-velocity vs content-depth)**, and **D12 (Community-consensus)** are the dimensions most exposed: D8 explicitly rewards "≥3 orgs production + papers" — a paper with a soft benchmark satisfies it; D3/D12 fold star counts into score. The Wave-2 memory error was a **D8 mis-score**. The audit below asks, per layer: *did W259 reward a repo on D8/D3/D12 using an E1-E6-flawed signal?*

---

## §1 — L0 MCP Substrate — VERDICT: **SUSPECT (E4 — star-count proxy systemic)**

### 1.1 — Which repos' scores depend on a benchmark
L0 has no capability *benchmark* in the SWE-bench sense — MCP servers are graded on **adoption + maintenance + trust-surface**. The relevant W259 dimensions are **D3 (star-velocity)**, **D8 (industry adoption)**, **D12 (community-consensus)**, **D17 (MCP-trust-surface)**. Repos scored here: rows 2, 40-43, 77-83, 87, 89, 91, 93 (MCP servers/SDKs), plus L0 picks in §4 (`tavily/firecrawl-mcp`, `ast-grep`, `rtk-ai`, `zilliztech/claude-context`).

### 1.2 — Is the signal canonical or vendor-favored?
**This is an E4 problem.** W259 row scores lean on **raw star counts** (the matrix prints a Stars column and D3 rewards star-velocity). Independent cross-check shows star-count is a *known-misleading* MCP signal:

- **AgentRank** (`agentrank-ai.com/blog/state-of-mcp-2026/`, 2026-03-16): of 25,632 indexed MCP repos, **77% have <10 stars, 97% are solo projects, avg score 29.7/100**. The two *most-starred* repos (`punkpeye/awesome-mcp-servers` 83k★, `modelcontextprotocol/servers` 81k★) are **aggregator lists, not tools**. `microsoft/playwright-mcp` (28.8k★, 1.77M installs) ranks **#7 not #1** on a real-quality composite — a 1,400-star solo project (`microsoft/azure-devops-mcp`, 97.17) outscores it.
- **MCPpedia** (`mcppedia.org/blog/2026-04-04-how-we-score-mcp-servers`): explicitly *rebuilt their score from scratch* because star-ranking "was measuring marketing, not quality" — a vendor "could publish on Monday, get a Product Hunt post, rack up 2,000 stars, hit 85/100 without a single security check."
- **MCP Marketplace Audit** (`awesomeagents.ai/news/mcp-marketplace-audit/`, 2026-04-20): **32.8% of MCP servers stale (180d+), 405 "zombies" with 50+ stars AND 6-month abandonment**, still showing green checkmarks on directories. Only **32.6% of top-100 complete a valid `list_tools` handshake**.

### 1.3 — Flag — repos whose composite is star-inflated
W259 master matrix prints **opencode at 160,923★** (row 11) and uses it to justify "T1 PILOT" — this exact number is **flagged as a probable fabrication in W258-V13-CRITIQUE §3.7** (unverified rename `sst/opencode`→`anomalyco/opencode`; would make opencode larger than most major OSS). The matrix carried the suspect number forward into a composite **without re-verification**. Similarly **claude-mem "~76,000★"** (row 6) and **caveman "~60,762★"** (row 18) are suspiciously precise for "unknown"-provenance repos and drive D3 = 10. These are **E4 + unverified-number** defects — not capability-benchmark errors, but the same *trust-the-vendor-number* root cause.

**Net L0 verdict**: no fake *capability* benchmark, but the layer is **SUSPECT** — D3/D8 scoring trusts star counts that independent MCP-quality indices (AgentRank, MCPpedia) have explicitly repudiated. Correction = re-score D3/D8 against maintenance-recency + dependents + handshake-validity, not stars.

---

## §2 — L1 Cross-Model Proxy — VERDICT: **ERROR-FOUND (E1 + E5 — Bifrost "50× faster" is unverified vendor marketing)**

### 2.1 — Which repos' scores depend on a benchmark
LiteLLM (row 12, composite 88, "T1 INSTALL"), vLLM (row 22 — see also §6), Portkey & Bifrost & Helicone (LAYER-C §4, scored T2/Tier-C). The throughput numbers in LAYER-C §4.1-§4.3 are load-bearing for the **router-class disposition**.

### 2.2 — Is the benchmark canonical or vendor-favored?
**ERROR-FOUND.** LAYER-C §4.1 states *"Bifrost ... Claims 50× faster than LiteLLM; <100µs overhead at 5k RPS"* and §4.3 calls Bifrost "the throughput challenger ... claims 50× LiteLLM throughput." It is correctly hedged as a *claim* — but the number's **provenance is 100% vendor**:

- The "40×/50× faster" figure traces to **`getmaxim.ai/blog/bifrost-...-40x-faster-than-litellm`** and `getmaxim.ai/bifrost/resources/benchmarks` — **Maxim AI is the company that makes Bifrost.** This is textbook **E1 (publisher-run) + E5 (marketing-claim-as-fact)**.
- An **independent** check (`zenn.dev/0h_n0/articles/468ad83d55dc17`, 2026-03-11) is explicit: *"11μs is Bifrost's own measurement; **no third-party verification like Kong's benchmark has been published**"* (translated). It tabulates: Bifrost = "self-test, third-party verification: none."
- The **only genuinely independent** gateway benchmark is **Kong's** (Kong Gateway 3.10 / Portkey OSS / LiteLLM 1.63.7, AWS EKS c5.4xlarge, 400 VU) — and Kong is *also* a vendor (measuring its own product as winner at 23,600 RPS). Even Kong's data only puts LiteLLM at 2,740 RPS vs Kong 23,600 — an **8.6×** gap, *not* 50×, and Portkey at 10,400 RPS.
- `relayplane.com` (2026-03-11, itself a vendor but candid): *"For most teams running a few thousand requests per day, you will not feel the difference, and Bifrost is closed-source on the hosted side."*

### 2.3 — Flag — inflated composite
LAYER-C correctly keeps Bifrost at **Tier-C / not-≥3-org-converged**, so the *disposition* is defensible. **But the framing "claims 50× LiteLLM throughput" presented in a comparison table next to LiteLLM's score is an E5 contamination** — a reader (or the master-matrix scorer) can absorb "Bifrost ≈ 50× better" as a quality signal. **There is no independent benchmark in which any gateway is 50× LiteLLM.** The real, methodology-disclosed independent number is **8.6× (Kong's own test)** and even that is vendor-run. Additionally: LiteLLM's *own* honest overhead is **10-20ms** (`pkgpulse.com` 2026-03-09) — "negligible vs 500ms-5s LLM latency" — so the throughput-gap is **operationally irrelevant at solo+5 scale**. **Correction**: strip the "50×" number from §4; replace with "vendor-claimed; no independent verification exists; LiteLLM's ~10-20ms overhead is negligible for this operator."

---

## §3 — L4 Eval / Observability — VERDICT: **ERROR-FOUND (E1 — promptfoo "used by OpenAI and Anthropic" self-claim drives D8)**

### 3.1 — Which repos' scores depend on a benchmark
Inspect AI (row 8, composite 89), promptfoo (row 9, composite 89), Langfuse (row 10, composite 88), Phoenix (row 25, composite 86), opik/deepeval/ragas. L4 has **no head-to-head capability benchmark** — eval frameworks are graded on adoption + native-CC fit. The exposed dimension is **D8 (industry adoption)** and **D12 (community-consensus)**.

### 3.2 — Is the signal canonical or vendor-favored?
**ERROR-FOUND, and W258-V13-CRITIQUE §6.2/§6.10 already flagged it but the master matrix did not act.** LAYER-C §1.1 and §7.2 score promptfoo's Axis-1 on the line *"Used by OpenAI + Anthropic per repo description."* This is **E1**: the phrase is **promptfoo's own repo description** — a project self-claim. W258-V13-CRITIQUE §6.10 says verbatim: *"v13 EXPLICITLY flags this as project self-claim, not independent endorsement ... the self-claim shouldn't enter the convergence calculation. Downgrade."* Yet promptfoo sits at **composite 89** in the master matrix with D8 = 9.

Independent cross-check actually **partially rehabilitates** promptfoo on *different* grounds: `agentsindex.ai/compare/inspect-ai-vs-promptfoo` reports promptfoo is *"used by 127 of the Fortune 500 ... and is now part of OpenAI"* — that is a real adoption signal **and an acquisition**, which is far stronger than the repo tagline. So the *conclusion* (promptfoo is high-adoption) survives, but **W259 reached it via an E1-flawed cite**. The matrix should re-anchor D8 to the Fortune-500/acquisition evidence, not the self-description.

### 3.3 — Phoenix / Langfuse — CLEAN on benchmark integrity
The Langfuse-vs-Phoenix comparison (LAYER-C §2.2) is sourced from **7 genuinely independent** comparison articles (futureagi, open-techstack, turion.ai, examcert, firecrawl, pkgpulse, apiscout) and the independent cross-check (`open-techstack.com` 2026-04-02, `respan.ai` 2026-05-10, `awesomeagents.ai` 2026-04-19) **corroborates** the W259 verdict (Langfuse = default OSS, Phoenix = OTel-purist). No E1-E6 defect in the observability sub-layer. **The OBS sub-layer is CLEAN; the EVAL sub-layer is ERROR-FOUND on promptfoo's D8 provenance only.**

### 3.4 — Inspect AI — CLEAN
Inspect AI's score rests on **UK AISI authorship** (a government body, not the repo's commercial vendor) + native Claude Code `agent_bridge()` support — verifiable architecture, not a benchmark claim. No defect.

---

## §4 — L5 Scaffold — VERDICT: **ERROR-FOUND (E2 — SWE-bench Verified used where Pro is canonical; W259 v13 flagged it, master matrix did NOT propagate the fix)**

### 4.1 — Which repos' scores depend on a benchmark
LAYER-B §5 S5 table scores peer-CLIs/scaffolds with a **"SWE-bench Verified (best score)" column**: OpenHands 68.4%, Aider 52%, Codex ~77%, Cline 56%, **Live-SWE-agent 79.2% ("best OSS SWE-bench")**, SWE-agent 43.2%. Master-matrix scaffold rows: openai/openai-agents-python (73, comp 90), microsoft/agent-framework (84, comp 90), google/adk-python (90, comp 90), vercel/ai (96, comp 87).

### 4.2 — Is the benchmark canonical or vendor-favored?
**ERROR-FOUND — this is the cleanest analogue to the mem0 error.** SWE-bench **Verified** is the **soft/contaminated** benchmark; SWE-bench **Pro** is the canonical hard one. W258-V13-CRITIQUE §3.5 *already established this*:

- OpenAI: *"At least 59.4% of audited [SWE-bench Verified] problems have flawed test cases ... Every frontier model showed contamination"* (`openai.com/index/why-we-no-longer-evaluate-swe-bench-verified/`).
- The Verified-vs-Pro gap is **enormous**: Live-SWE-agent + Opus 4.5 = **79.2% Verified but 45.8% Pro** (`live-swe-agent.github.io`; `agentmarketcap.ai` 2026-04-11). GPT-5 drops **23.1%→14.9%** moving from Pro-public to Pro-private partition. SWE-bench Verified contains **161/500 trivial 1-2-line problems** (`arxiv.org/html/2509.16941`, SWE-Bench Pro paper).
- SWE-bench-Live (`openreview.net/pdf?id=OGWkr7gXka`): OpenHands+Claude-3.7 scores **43.2% on Verified but 24.67% on the contamination-resistant Live set** — *the same agent, twice the score on the static benchmark.*

### 4.3 — Flag — the propagation failure
W258-V13-CRITIQUE §3.5 explicitly recommended: *"DOWNGRADE Live-SWE-agent from WATCHLIST to PATTERN-CITE-ONLY until measured on Pro."* **LAYER-B §5 S5 — produced AFTER that critique — still prints "79.2% (Opus 4.5) — best OSS SWE-bench" with no Pro column and ranks Live-SWE-agent as STUDY-PILOT on that basis.** The master matrix S5 ranking inherits a **Verified-only ladder**: it lists OpenHands 68.4%, Cline 56%, Aider 52% as if comparable, when these are Verified numbers whose *real ordering can flip on Pro* (Kimi K2-Thinking *leads* Live-SWE-agent on Pro 51.8% vs 45.8%, but trails or is absent in the Verified-framed discussion). **Correction**: LAYER-B §5 S5 must add a SWE-bench **Pro** column and re-rank; every "best OSS SWE-bench" claim citing Verified is an **E2 error** identical in class to mem0/LoCoMo. Note: the *scaffold-bearing master-matrix rows themselves* (agent-framework, adk-python, vercel/ai) are **not** scored on SWE-bench numbers — their composites rest on D4/D5/D8 maintainer+adoption — so those composites are **not inflated**; the error is confined to the **LAYER-B §5 narrative ranking** and any downstream "Live-SWE-agent is the OSS SOTA scaffold" claim.

---

## §5 — L1.5 KG Sublayer — VERDICT: **ERROR-FOUND (E1 + E3 — every KG benchmark in LAYER-A is vendor-run with tuned-self vs default-others)**

### 5.1 — Which repos' scores depend on a benchmark
Graphiti (row 16, composite 87, "T1 INSTALL incumbent"), mem0 (row 34, comp 84), supermemory (row 33, comp 84), Cognee (LAYER-A §3, "STUDY-PILOT vs Graphiti"), claude-mem (row 6, comp 89). LAYER-A §3-§4 are **saturated with benchmark numbers** that drive disposition.

### 5.2 — Is the benchmark canonical or vendor-favored?
**ERROR-FOUND — multiple E1 and a textbook E3.** LAYER-A §3 cites two head-to-head KG benchmarks; **both are publisher-run**:

1. **cognee's HotPotQA head-to-head** (`cognee.ai/blog/...knowledge-graph-memory-benchmarks`): LAYER-A §3 quotes *"cognee's GRAPH_COMPLETION_COT scored 0.85 DeepEval correctness vs Graphiti 0.74 vs LightRAG 0.67 vs Mem0 0.54."* LAYER-A even appends the disclosure *"(cognee was tuned, others default — disclosure)."* **This is the exact mem0/LoCoMo error class — E3 (tuned-self vs default-others) + E1 (cognee ran it).** The independent read of cognee's own post confirms: cognee ran *its Exercise-1-winning tuned config* (GRAPH_COMPLETION_COT on tuned chunking/prompts); competitors ran *published defaults*. cognee's own paper shows untuned cognee scores **0.476** on the same HotPotQA — i.e. **~73% of cognee's "win margin" is configuration, not architecture.** Worse: cognee's post admits *"Graphiti — we were not able to run their system, so we are including numbers they shared with us previously, on a smaller-scale study"* and *"Graphiti sent us another set of scores ... assume Graphiti numbers will be higher in the next iteration."* The Graphiti number in the table is **stale and acknowledged-wrong by the publisher itself.**
2. **kiyeonjeon21/graphrag-lab 9-framework benchmark** (LAYER-A §3, §5): *"nano-graphrag 3.95 avg, Cognee 3.75 ... Microsoft GraphRAG 3.10, Graphiti 2.30."* This is an independent third-party (not a vendor) — **the one genuinely clean KG benchmark in LAYER-A** — but LAYER-A itself notes *"Graphiti optimized for query-speed 0.3s not quality,"* meaning the 2.30 is a *latency-tuned* config scored on a *quality* axis (a milder E3).

3. **Graphiti's own benchmark provenance** — independent `mcp__deepwiki__ask_question` on `getzep/graphiti` confirms: **Graphiti's repo only contains a `LongMemEval`-based internal eval framework** (`tests/evals/`, `longmemeval_oracle.json`) that compares a candidate graph to a baseline graph with **GPT-4o-mini as self-judge**. Graphiti does **not** itself publish HotPotQA/LoCoMo/DMR numbers — those are **Zep's** (the commercial parent). So every Graphiti benchmark number in LAYER-A is **second-hand from a competitor (cognee) or the commercial parent (Zep)** — never an independent measurement of Graphiti-the-OSS-repo.

### 5.3 — The §4 LongMemEval/LoCoMo table — partially the original error, partially correct
LAYER-A §4's table prints both **LongMemEval and LoCoMo columns** — good practice. But it carries the **LoCoMo crown to ByteRover/Cipher at 92.2%** flagged in-line as *"ByteRover 2.0 self-reported"* (**E1**) and **Letta 74.0%** / **Zep 75.14% "Zep self-reported"** (**E1**). LAYER-A §9 then makes **Cipher a PRIMARY install** ("92.2% LoCoMo benchmark leader") — **this is the mem0 error repeated**: a self-reported soft-benchmark (LoCoMo) number promoted to install-decision weight. Independent cross-check: on **LongMemEval** (the hard benchmark), Cipher has **no published score at all** ("—" in LAYER-A's own table), mem0 = 49.0%, Zep = 63.8%, Supermemory = 85.4% (`agentmarketcap.ai` 2026-04-08). **A repo cannot be a "benchmark leader" on the strength of the easy benchmark while having no score on the hard one.**

### 5.4 — Flag — inflated composites
- **claude-mem (row 6, composite 89, "T1 BENCHMARK-FIRST")** — disposition literally says "benchmark-first" but **LAYER-A surfaces no LongMemEval/LoCoMo number for claude-mem at all.** Its 89 rests on D-scores + a "~76,000★" of unverified provenance (§1.3). The "BENCHMARK-FIRST" label is **unbacked**.
- **mem0 (row 34, composite 84)** — the composite itself is *not* obviously LoCoMo-inflated (D8 = 9 is defensible on 55k★ + genuine multi-org adoption), but any W259 prose calling mem0 a retrieval-quality leader inherits the original error.
- **Cognee** — correctly only "STUDY-PILOT," so disposition is safe, but the *rationale* ("won kiyeonjeon21 + cognee.ai HotPotQA exercise") leans on an E3-tuned self-benchmark.

**Net L1.5 verdict**: **ERROR-FOUND.** The KG sublayer's benchmark evidence is almost entirely vendor-run; the one independent source (kiyeonjeon21) is mildly E3-confounded. **Canonical hard benchmark = LongMemEval** (and SWE-bench-class contamination-resistant multi-hop sets). **Correction**: every KG/memory repo's benchmark claim must be re-stated as LongMemEval-or-nothing; LoCoMo numbers demoted to "vendor-favored, do not score."

---

## §6 — Layer C Serving — VERDICT: **CLEAN (independent third-party benchmark exists and W259 used it correctly)**

### 6.1 — Which repos' scores depend on a benchmark
vLLM (row 22, composite 86), SGLang & TGI & TensorRT-LLM (LAYER-C §3 — TGI explicitly SKIP, TensorRT Tier-C). LAYER-C §3.2 prints a throughput table that drives the "vLLM = production primary, SGLang = agent-tilt, TGI = mindshare-decline" verdict.

### 6.2 — Is the benchmark canonical or vendor-favored?
**CLEAN.** LAYER-C §3.2's throughput table is aggregated from **6 sources** and crucially **does not rely on a vendor's self-benchmark for the winner**:

- The independent cross-check confirms a genuine **third-party continuously-running benchmark exists**: **SemiAnalysis InferenceMAX / InferenceXv2** (`mubibai.com` 2026-04-15 — *"SGLang publishes results through SemiAnalysis InferenceX (a continuously running third-party benchmark); vLLM publishes internal benchmarks on their blog"*). There is also an **independent arXiv paper** (`arxiv.org/pdf/2603.10031`, 8×MI325X multi-run reproducibility protocol).
- Multiple independent comparison articles (`deploybase.ai` 2026-02-23, `explore.n1n.ai` 2026-03-13, `wiki.charleschen.ai`) **converge** on the same ordering W259 reports: vLLM ≈ TensorRT-LLM at the top for throughput, SGLang best TTFT / disaggregated-prefill, TGI trailing. The numbers differ across articles (throughput is hardware/version/batch-dependent) but the **ranking is stable across non-vendor sources** — that is real Axis-1 convergence, not E6.
- **One caveat (minor E2-adjacent)**: LAYER-C §3.2's headline "**3.67× vLLM speedup over TGI**" cites `arxiv 2511.17593` (a "vllm-tgi arxiv"). The 3.67× is real but is **one specific config** (LLaMA-2-7B @ 100 concurrent); `explore.n1n.ai` shows TGI within ~15-25% of vLLM at batch=32. The W259 verdict ("TGI mindshare-decline, SKIP") is **correct on the freshness/maintenance axis** (TGI last push 2026-03-21 vs vLLM daily) **independent of the throughput number** — so even if 3.67× is cherry-picked, the disposition does not depend on it. No inflation.

### 6.3 — Flag
**No repo's Layer-C composite is benchmark-inflated.** vLLM's composite 86 rests on ≥5-org adoption (UC Berkeley, Anyscale, NVIDIA NeMo-RL, llm-d, Ray) — independently verifiable architecture-adoption, not a self-benchmark. **Layer C is the one layer that passes clean.** (Note: the *Bifrost* contamination is a **L1 router** issue, §2 — not Layer-C serving. LAYER-C's *file* covers both, but the serving §3 is clean.)

---

## §7 — Repos with INFLATED Composite (need rescoring)

"Inflated" = the W259 composite or disposition is propped up by an E1-E6-flawed benchmark/adoption signal. Severity: HIGH = disposition would change; MED = composite drops but tier holds; LOW = prose/rationale defect only.

| Repo | Layer | W259 score / disposition | Flawed signal | Class | Severity | Corrected expectation |
|---|---|---|---|---|---|---|
| **campfirein/byterover-cli (Cipher)** | L1.5 | LAYER-A §9 **PRIMARY install**, "92.2% LoCoMo leader" | LoCoMo 92.2% is **self-reported** + LoCoMo is the soft benchmark; **no LongMemEval score exists** | E1+E2 | **HIGH** | Demote to STUDY-PILOT vs Graphiti; cannot claim "benchmark leader" without a LongMemEval number |
| **thedotmack/claude-mem** | L1.5 | Row 6, **composite 89**, "T1 BENCHMARK-FIRST" | "BENCHMARK-FIRST" label with **no surfaced LongMemEval/LoCoMo number**; "~76,000★" unverified | E4 + unbacked-label | **MED** | Re-score D3/D8 on verified stars; relabel "T1 INSTALL" (drop "BENCHMARK-FIRST") or supply a real benchmark |
| **opencode (anomalyco)** | L3 | Row 11, **composite 88**, "T1 PILOT", **160,923★** | Star count flagged as probable fabrication (W258-V13-CRITIQUE §3.7); D3=10 rests on it | E4 + unverified | **MED** | Re-probe stars via GitHub API; if real ≪160k, D3 drops; tier likely holds at T1/T2 |
| **promptfoo/promptfoo** | L4 | Row 9, **composite 89**, D8=9 | D8 anchored to **"used by OpenAI+Anthropic" = repo's own self-description** | E1 | **LOW** | Re-anchor D8 to Fortune-500/OpenAI-acquisition evidence (independent); composite ≈ unchanged but cite-clean |
| **Bifrost (maximhq)** | L1 | LAYER-C §4 Tier-C; "claims 50× LiteLLM" in comparison table | "50× faster" is **Maxim AI's own benchmark**; no independent verification | E1+E5 | **LOW** (disposition already Tier-C) | Strip "50×" number; note vendor-claimed-only; tier stays Tier-C |
| **Live-SWE-agent** | L5 | LAYER-B §5 STUDY-PILOT, "79.2% — best OSS SWE-bench" | SWE-bench **Verified** (contaminated/soft); Pro score is **45.8%**, and Kimi K2 *beats* it on Pro | E2 | **MED** | Re-rank on SWE-bench **Pro**; "best OSS scaffold" claim fails — Kimi K2-Thinking leads Pro |
| **cognee (topoteretes)** | L1.5 | LAYER-A "STUDY-PILOT"; rationale = "0.85 vs Graphiti 0.74 HotPotQA" | cognee ran **its tuned config vs competitors' defaults**; cognee admits Graphiti number is stale/wrong | E1+E3 | **LOW** (disposition already STUDY-PILOT) | Keep STUDY-PILOT; delete the tuned-vs-default benchmark from the rationale |

---

## §8 — Repos with DEFLATED Composite (under-scored)

"Deflated" = a repo is *correctly* dispositioned or under-rated *because* a rival's benchmark was inflated, OR the repo loses on a soft-benchmark axis where the hard benchmark would favor it.

| Repo | Layer | W259 score / disposition | Why under-scored | Corrected expectation |
|---|---|---|---|---|
| **getzep/graphiti** | L1.5 | Row 16, composite 87, "T1 INSTALL incumbent"; D8=9 | Graphiti is **dragged down in LAYER-A §3 prose** by cognee's tuned-vs-default benchmark (0.74 "vs" cognee 0.85) and the kiyeonjeon21 2.30 (a *latency*-tuned config scored on quality). On the **canonical LongMemEval**, Zep/Graphiti = **63.8%** — 2nd only to Supermemory, far above mem0's 49.0% | Composite/D8 defensible; **the §3 narrative should stop citing cognee's self-benchmark against it**. Graphiti is the strongest *non-self-reported* KG on LongMemEval — arguably under-ranked vs row-34 mem0 |
| **mem0ai/mem0** | L1.5 | Row 34, composite 84, "T2 (overlaps Graphiti)" | Honest case — mem0's LongMemEval 49.0% is the **weakest** of the named memory systems; W259 ranking it *below* Graphiti is **correct**. Listed here only to confirm: **no upward correction** — the original error was over-crediting mem0's LoCoMo, and W259's master matrix at 84 already does **not** over-credit it | No change — flagged to confirm the audit checked it |
| **UKGovernmentBEIS/inspect_ai** | L4 | Row 8, composite 89, "T1 INSTALL" | Scored *equal* to promptfoo (89). promptfoo's 89 is partly E1-inflated (§3.2); Inspect AI's 89 rests on **clean** signals (UK AISI government authorship, verifiable native-CC `agent_bridge()`). On a benchmark-integrity-adjusted basis Inspect AI should rank **above** promptfoo | Hold Inspect AI at 89; promptfoo's re-anchored composite should land at or just below it — Inspect AI becomes the unambiguous L4 agent-eval pick |
| **vLLM / SGLang** | Layer C | Rows 22 (86) / LAYER-C §3 | Not deflated — confirming Layer C is clean: vLLM's 86 and SGLang's verdict rest on **SemiAnalysis third-party** + multi-source independent convergence. No correction | No change — flagged to confirm |
| **Kimi K2-Thinking** | L5 | Not a scored master-matrix row | Independent SWE-bench **Pro** data (`agentmarketcap.ai` 2026-04-11) shows Kimi K2-Thinking **51.8% Pro — leads Live-SWE-agent's 45.8%**. W259's Verified-framed L5 ranking under-represents it | If L5 is re-ranked on Pro, Kimi K2-Thinking is the OSS scaffold/model leader, not Live-SWE-agent |

---

## §9 — Recommended Master-Matrix Score Corrections

Ordered by severity. Each correction names the dimension(s) to re-score and the propagation sites.

### 9.1 — P0 — L1.5: purge LoCoMo from install-decision weight (the direct mem0-error fix)
- **Action**: In **LAYER-A §4 and §9**, demote **all LoCoMo numbers** to a "vendor-favored — DO NOT SCORE" footnote; require **LongMemEval** for any retrieval-quality claim. A repo with no LongMemEval score (Cipher, claude-mem) **cannot carry a "benchmark leader/first" label**.
- **Matrix impact**: **Cipher** — remove "PRIMARY install" status, set to **STUDY-PILOT** (no LongMemEval evidence). **claude-mem row 6** — strip "BENCHMARK-FIRST" from disposition; re-evaluate D8 (composite 89 → expect **83-86** once the unbacked benchmark label and unverified "~76,000★" D3=10 are corrected).
- **Propagation**: master matrix rows 6, 33, 34; §4 "Per-layer top picks" L1.5 row.

### 9.2 — P0 — L5: re-rank scaffolds on SWE-bench Pro (the direct SWE-bench-Verified-error fix)
- **Action**: **LAYER-B §5 S5 table** — add a **"SWE-bench Pro"** column; mark every Verified number as **"soft / contamination-flagged."** Recompute the OSS-scaffold ranking on Pro. W258-V13-CRITIQUE §3.5's instruction to **downgrade Live-SWE-agent to PATTERN-CITE-ONLY** must finally propagate.
- **Matrix impact**: scaffold-bearing rows (agent-framework 90, adk-python 90, openai-agents-python 90, vercel/ai 87) are **not** SWE-bench-scored — **composites unchanged**. The correction is **narrative-only** (LAYER-B §5) but load-bearing for any "OSS SOTA scaffold" recommendation: **Live-SWE-agent loses the crown to Kimi K2-Thinking on Pro.**

### 9.3 — P1 — L4: re-anchor promptfoo D8 off the self-claim
- **Action**: Replace the **"used by OpenAI + Anthropic per repo description"** Axis-1 cite with the independent evidence (**Fortune-500 adoption + OpenAI acquisition**, `agentsindex.ai`). D8 stays ≈9 but is now cite-clean.
- **Matrix impact**: promptfoo **row 9 composite ≈ unchanged (89→88-89)**; the *ordering* vs Inspect AI tightens — **Inspect AI (89, clean) should be listed first** in the L4 agent-eval pick.

### 9.4 — P1 — L1: strip the Bifrost "50×" marketing number
- **Action**: **LAYER-C §4.1/§4.3** — delete "claims 50× faster than LiteLLM"; replace with: *"Maxim AI (Bifrost's vendor) self-benchmarks 9.5-40×; no independent verification exists. The only methodology-disclosed independent gateway benchmark (Kong's, itself vendor-run) shows LiteLLM 2,740 RPS vs Kong 23,600 — an 8.6× spread, not 50×. LiteLLM's own overhead is 10-20ms — negligible at solo+5 scale."*
- **Matrix impact**: Bifrost is **not a scored master-matrix row** — **no composite changes**; LiteLLM **row 12 (88)** is **unaffected and correct** (the audit confirms LiteLLM's disposition needs no change).

### 9.5 — P2 — L0: re-score D3/D8 off raw star counts
- **Action**: For MCP-server rows, supplement/replace the **Stars** column with a **maintenance-recency + dependents + handshake-validity** signal per the AgentRank/MCPpedia methodology. Re-verify the **opencode 160,923★, claude-mem ~76,000★, caveman ~60,762★** numbers via GitHub API before they feed any D3 score.
- **Matrix impact**: rows 6, 11, 18 D3 may drop from 10; expect **−1 to −3 composite** on those rows; tiers (T1/T2) likely hold. Aggregator-list repos (`punkpeye/awesome-mcp-servers`-class) must never be scored as tools.

### 9.6 — Summary correction table

| Row | Repo | Current composite | Corrected expectation | Driver |
|---:|---|---:|---|---|
| 6 | thedotmack/claude-mem | 89 | **83-86** | strip unbacked "BENCHMARK-FIRST"; D3 off unverified stars |
| 9 | promptfoo/promptfoo | 89 | **88-89** (cite-clean) | re-anchor D8 off self-claim |
| 11 | opencode (anomalyco) | 88 | **85-88** | re-verify 160,923★; D3 risk |
| 18 | JuliusBrussee/caveman | 87 | **85-87** | re-verify ~60,762★; D3 risk |
| 33 | supermemoryai/supermemory | 84 | **84** (hold) | LongMemEval 85.4% is *self-reported* but **on the hard benchmark** — better-grounded than Cipher |
| 34 | mem0ai/mem0 | 84 | **84** (hold — correctly not over-credited) | confirms matrix did not inherit the LoCoMo error at row level |
| 8 | UKGovernmentBEIS/inspect_ai | 89 | **89** (hold; rank #1 in L4) | clean signals — promote above promptfoo in prose |
| — | Cipher (byterover-cli) | LAYER-A PRIMARY | **STUDY-PILOT** | no LongMemEval score; LoCoMo self-report insufficient |
| — | Live-SWE-agent | LAYER-B STUDY-PILOT | **PATTERN-CITE-ONLY** | SWE-bench Pro 45.8%, beaten by Kimi K2 |

---

## §10 — Per-layer verdict summary

| Layer | Verdict | Error class found | Repos needing rescore |
|---|---|---|---|
| **L0 MCP substrate** | **SUSPECT** | E4 (star-count proxy; D3/D8 trust unverified star numbers repudiated by AgentRank/MCPpedia) | claude-mem, opencode, caveman (D3 re-verify) |
| **L1 Cross-model proxy** | **ERROR-FOUND** | E1+E5 (Bifrost "50× faster" = vendor's own benchmark, no independent verification) | Bifrost (strip claim — not matrix-scored; LiteLLM row 12 is correct) |
| **L4 Eval/Obs** | **ERROR-FOUND** (EVAL sub-layer) / **CLEAN** (OBS sub-layer) | E1 (promptfoo "used by OpenAI+Anthropic" = repo self-description, drives D8) | promptfoo (re-anchor D8) |
| **L5 Scaffold** | **ERROR-FOUND** | E2 (SWE-bench **Verified** used where **Pro** is canonical; v13 flagged it, master matrix never propagated) | Live-SWE-agent → PATTERN-CITE-ONLY; LAYER-B §5 re-rank on Pro |
| **L1.5 KG sublayer** | **ERROR-FOUND** | E1+E3 (every KG benchmark vendor-run; cognee HotPotQA = tuned-self vs default-others — the exact mem0/LoCoMo pattern) | Cipher → STUDY-PILOT; cognee rationale; claude-mem label |
| **Layer C serving** | **CLEAN** | none (SemiAnalysis InferenceMAX = genuine third-party; multi-source independent convergence on vLLM/SGLang/TGI ordering) | none |

**Bottom line**: the mem0/LoCoMo error is **not isolated to memory**. It recurs in **L1.5 (KG — cognee's tuned-vs-default HotPotQA), L5 (SWE-bench Verified vs Pro), L4 (promptfoo self-claim), L1 (Bifrost vendor benchmark)**. Only **Layer C (serving)** has a genuine independent benchmark and used it correctly. **L0** has no fake capability-benchmark but systematically trusts star counts. The deepest finding: **W258-V13-CRITIQUE already caught the SWE-bench Verified contamination (§3.5) and the promptfoo self-claim (§6.10) — but those fixes were never propagated into the Wave-2 layer deepdives or the master matrix.** The corrective action is as much **propagation discipline** as new research.

---

## Appendix — Independent sources consulted (all 2026-Q1/Q2 unless noted)

- **L0**: `agentrank-ai.com/blog/state-of-mcp-2026/` (2026-03-16); `mcppedia.org/blog/2026-04-04-how-we-score-mcp-servers`; `awesomeagents.ai/news/mcp-marketplace-audit/` (2026-04-20); `skillful.sh/blog/why-mcp-server-discovery-is-harder-than-it-looks`; `dev.to/.../the-mcp-reliability-problem` (2026-03-09).
- **L1**: `getmaxim.ai/bifrost/resources/benchmarks` (vendor — flagged); `zenn.dev/0h_n0/articles/468ad83d55dc17` (2026-03-11, independent, Kong-benchmark cite); `pkgpulse.com/guides/portkey-vs-litellm-vs-openrouter-llm-gateway-2026` (2026-03-09); `relayplane.com/blog/...` (2026-03-11); `duragraph.ai/blog/llm-gateway-wars`.
- **L4**: `agentsindex.ai/compare/inspect-ai-vs-promptfoo`; `open-techstack.com/blog/langfuse-vs-phoenix-vs-helicone-...` (2026-04-02); `respan.ai/articles/best-llm-evaluation-tools` (2026-05-10); `awesomeagents.ai/tools/best-ai-observability-tools-2026/` (2026-04-19); `davidpp.com/ai/llm-observability-tools`.
- **L5**: `openai.com/index/why-we-no-longer-evaluate-swe-bench-verified/`; `live-swe-agent.github.io/`; `agentmarketcap.ai/blog/2026/04/11/live-swe-agent-...` (2026-04-11); `arxiv.org/html/2509.16941` (SWE-Bench Pro paper); `openreview.net/pdf?id=OGWkr7gXka` (SWE-bench-Live); `arxiv.org/html/2505.20411v2` (SWE-rebench).
- **L1.5**: `mcp__deepwiki__ask_question` on `getzep/graphiti` (Graphiti uses LongMemEval-only internal eval, GPT-4o-mini self-judge); `cognee.ai/blog/.../knowledge-graph-memory-benchmarks` (vendor — flagged E1+E3); `agentmarketcap.ai/blog/2026/04/08/ai-agent-memory-shootout-2026-...`; `vectorize.io` (via deepdive); `blog.getzep.com/lies-damn-lies-statistics-is-mem0-really-sota...` (2025-05-06 — the original LoCoMo critique); `arxiv.org/pdf/2505.24478` (cognee paper); HuggingFace `papers/2605.12493` (LongMemEval-V2).
- **Layer C**: `mubibai.com/sglang-vs-vllm-...-april-2026/` (2026-04-15, SemiAnalysis InferenceXv2 cite); `deploybase.ai/articles/best-llm-inference-engine` (2026-02-23); `explore.n1n.ai/blog/llm-inference-engine-comparison-...` (2026-03-13); `wiki.charleschen.ai`; `arxiv.org/pdf/2603.10031` (independent multi-run protocol).
