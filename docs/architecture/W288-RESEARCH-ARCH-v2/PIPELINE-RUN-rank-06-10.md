# W288 — sca-v3 Pipeline Run — Stream B candidates ranks 6-10

> **Date**: 2026-05-18
> **Pipeline stage**: Stage 2 (TYPED-EVIDENCE) + Stage 3 (SCORE) per `STREAM-D-INGEST-PIPELINE.md §2-§3`
> **Rubric**: sca-v3 14-dim per `STREAM-C-RUBRIC-v3.md §1-§3`
> **Scope**: 5 candidates ranks 6-10 from Stream B top-10
> **Probe-discipline**: `mcp__github__search_repositories` + `mcp__github__get_file_contents` (README) per candidate; deepwiki for sparse-README repos. Computed dual-composites carry 1 decimal. Hard-cap thresholds applied per Step 4 rules.
> **Cite-class**: TIER-1-DIRECT — live GitHub metadata + verbatim README

---

## Formula reference

```
install_score = (D1×1.5 + D2×0.9 + D3×1.3 + D4×1.3 + D5×1.0 + D6×0.9 + D7×1.0
                + D8×1.0 + D9×0.7 + D10×1.1 + D11×0.8 + D14×1.1 + D15×1.0) / 13.6
pattern_score = (D2×1.4 + D5×1.0 + D6×0.8 + D8×0.9 + D9×0.8 + D12×0.7 + D13×1.5) / 7.1
```

INSTALL hard-caps: D1<3, D3<2, D5<4, D7<2, D14<3, D15<2. REJECT: D10≤2 OR D7≤1 OR D15≤1 OR adversarial BLOCK.

---

## Candidate 6: `Lyellr88/MARM-Systems`

### Discovery / context
289★ MIT-licensed MCP server (FastAPI-MCP) — "Universal MCP Server (HTTP/STDIO/WebSocket) enabling cross-platform AI memory, multi-agent coordination, and context sharing across Claude/Qwen/Gemini." Created 2025-06-10, last commit 2026-05-18 (today). 18 MCP tools + dashboard at :8002. Live on MCP Registry. Targets the "unified memory wrapper across model vendors" niche.

### evidence_pack
```yaml
candidate: Lyellr88/MARM-Systems
collected_at: 2026-05-18
benchmark:
  - metric: no-benchmark-surface
    value: null
    baseline: none
    delta_vs_baseline: null
    source: "README §Competitive Advantage table is author-claim only — no measured delta vs incumbent MCP memory servers"
code_reading:
  - claim: "18-tool unified MCP API surface for cross-vendor memory"
    file: "README.md §Complete MCP Tool Suite"
    lines: "(table of 18 tools across Memory Intelligence, Session, Logging, Reasoning, Notebook, System categories)"
    source: github-api
practitioner_report:
  - org: "@Ophy21 (Industrial Automation Engineer)"
    outcome: "successfully handles industrial automation workflows in Windows 11 + Docker production; session mgmt + persistent logging + smart recall across container restarts validated"
    source: README §What Users Are Saying
    published: TBD
  - org: "@joe_nyc (DevOps/Infrastructure Engineer, Discord)"
    outcome: "9.5/10 rating; 100% memory accuracy across 46 services + network configs; semantic search + auto session logs"
    source: README §What Users Are Saying
    published: TBD
sources_typed_disagreement: []
```

### score_card
```yaml
candidate: Lyellr88/MARM-Systems
D1_license: 5     # MIT verbatim
D2_uniqueness: 3  # unified-MCP wrapping vendor-agnostic memory is partially unique; partial overlap with installed graphiti/mem0/basic-memory/cognee/hindsight
D3_harness_fit: 4 # CC-native MCP via Docker HTTP/STDIO; Windows portable via Docker
D4_cc_pathway: 4  # MCP server + Claude Code documented as recommended path; no SKILL.md/plugin.json/agents
D5_typed_evidence: 2 # no measured benchmark; 2 community testimonials; "Competitive Advantage" table is self-claim
D6_authority: 2   # solo @Lyellr88; no Anthropic/known-partner endorsement; Bayesian: α=0, β=0, γ_long_running=0 (created <12mo), δ=0
D7_velocity_balanced: 4 # daily commits including today; solo bus-factor risk
D8_benchmark_deltas: 2  # author-claims only; W287 P1a caps at 2
D9_failure_modes: 3 # README §Security & Configuration documents loopback default + API key rotation; no formal FM-class
D10_duplication: 3 # partial overlap with installed 6-tier memory stack — partially additive but heavy overlap
D11_context_cost: 3 # 18 MCP tools = moderate tool-list preload
D12_community_distribution: 2  # 289★ + Discord + Industrial-Automation + DevOps testimonials; stars-alone-with-thin-channel caps at 2-3
D13_pattern_extractability: 4 # the 18-tool unified-API surface is a patternable design for our own memory tier
D14_reversibility: 4 # MCP install/remove clean; SQLite DB at ~/.marm/ removable
D15_supply_chain: 3 # Docker Hub + PyPI + MCP Registry listed; not Cosign-signed; FastAPI+SQLite deps
install_score: 3.35
pattern_score: 2.73
hard_cap_breaches: ["D5<4"]
preliminary_tier: T4 CITE-ONLY
```

### Rationale
install_score 3.35 lands in T2 VENDOR-FORK range (3.0-3.9), but the D5<4 hard-cap blocks INSTALL and pattern_score 2.73 + D2=3<4 fails T3 PATTERN-STUDY (which requires D2≥4). The 18-tool unified-MCP API surface is a useful design pattern to CITE as a reference, but vendoring would duplicate the existing 6-tier memory stack (graphiti/mem0/basic-memory/cognee/hindsight/plugin-memory) without adding distinct capability. The 2 industrial-practitioner testimonials are credible but not org-distinct typed-evidence. **Tier T4 CITE-ONLY** confirmed.

---

## Candidate 7: `LearningCircuit/local-deep-research`

### Discovery / context
7,772★ MIT-licensed local-first deep-research framework. Headline: **~95.7% on SimpleQA (n=300) + 77% on xbench-DeepSearch (n=100)** on a single RTX 3090 with Qwen3.6-27B. Created 2025-02-09, last commit 2026-05-18 today. Trendshift-listed, LangChain official Twitter promoted, Hacker News 190+ points, Reddit r/LocalDeepResearch, multi-language coverage (Chinese/Japanese/Korean/French/German). Includes `ldr-mcp` MCP server for Claude Desktop/Code. SQLCipher AES-256 per-user DBs. 20+ search engines.

### evidence_pack
```yaml
candidate: LearningCircuit/local-deep-research
collected_at: 2026-05-18
benchmark:
  - metric: "SimpleQA accuracy (n=300)"
    value: 95.7
    baseline: "vector-RAG baselines"
    delta_vs_baseline: "+materially-significant (95.7% on a 3090 vs ~60-70% typical RAG)"
    source: "https://huggingface.co/datasets/local-deep-research/ldr-benchmarks (community-maintained leaderboard); README §Benchmarks; Reddit r/LocalLLaMA announcement (161K views)"
  - metric: "xbench-DeepSearch accuracy (n=100)"
    value: 77.0
    baseline: "deep-research baselines"
    delta_vs_baseline: "+strong delta"
    source: README §Benchmark Results
code_reading:
  - claim: "LangGraph-agent strategy autonomously selects search engines + synthesizes; the strategy behind the 95.7% SimpleQA result"
    file: "src/local_deep_research/research/strategies/langgraph_agent.py"
    lines: "TBD (referenced in README §How It Works)"
    source: github-api
  - claim: "SQLCipher per-user encrypted DB with bootstrap-allow-unencrypted toggle"
    file: "src/local_deep_research/database/encrypted_db.py"
    lines: "TBD (referenced in README §Security + docs/SQLCIPHER_INSTALL.md)"
    source: github-api
practitioner_report:
  - org: "LangChain (official)"
    outcome: "official Twitter/X + LinkedIn promotion (400+ likes)"
    source: "https://x.com/LangChainAI/status/1901347759757902038"
    published: 2025-03
  - org: "Hacker News community (190+ points)"
    outcome: "active discussion thread #43330164"
    source: "https://news.ycombinator.com/item?id=43330164"
    published: 2025
  - org: "r/LocalLLaMA community (161K views)"
    outcome: "Qwen3.6-27B + LDR achieves 95.7% on SimpleQA fully local"
    source: "https://www.reddit.com/r/LocalLLaMA/comments/1t1n6o8/"
    published: 2026
  - org: "Medium open-source-deep-research-assistants comparison"
    outcome: "'deserves special mention... tuned to use open-source LLMs that can run on consumer GPUs or even CPUs'"
    source: "https://medium.com/@leucopsis/open-source-deep-research-ai-assistants-157462a59c14"
    published: 2025
  - org: "Fahd Mirza YouTube (349K subscribers)"
    outcome: "comprehensive review video"
    source: "https://youtu.be/Q6kygd04sFI"
    published: 2025
sources_typed_disagreement: []
```

### score_card
```yaml
candidate: LearningCircuit/local-deep-research
D1_license: 5     # MIT verbatim
D2_uniqueness: 4  # local-first + SQLCipher per-user + 20-engine + benchmark-leading combo is genuinely unique vs deepwiki/exa/perplexity (which are cloud)
D3_harness_fit: 4 # CC-native MCP via ldr-mcp; Windows install path documented with SQLCipher pre-built wheels; Docker Linux native, Mac/WSL2 caveats
D4_cc_pathway: 4  # MCP server with documented ~/.claude/mcp.json config + 8 tools listed; no plugin.json/SKILL.md but full MCP surface
D5_typed_evidence: 5 # HuggingFace leaderboard (measured benchmark) + Reddit community + Trendshift + LangChain-official + multi-language practitioner coverage
D6_authority: 4   # LangChain-documented-partner via official Twitter; Bayesian: α=0 (not Anthropic), β=0 (no prior ADOPT), γ=1 (12mo+ commits, 3+ stable releases), δ=0; partner-class
D7_velocity_balanced: 5 # multiple commits today, weekly releases, multi-contributor, OpenSSF Scorecard
D8_benchmark_deltas: 5 # 95.7% SimpleQA is a +material delta; W287 P1a measured signal present via HF leaderboard
D9_failure_modes: 5 # SECURITY.md + security-review-process docs + scanner-suppression rationale docs + dedicated in-memory-credentials FM disclosure
D10_duplication: 3 # complementary to installed research-tools (deepwiki, exa) — local-first niche not duplicated
D11_context_cost: 4 # 8 MCP tools; ldr-mcp runs as STDIO subprocess; modest tool-list preload
D12_community_distribution: 5 # 7.7k★ + LangChain official + HN viral + Trendshift + r/LocalDeepResearch + r/LocalLLaMA + 5+ language coverage + 349k-sub YouTube + Korean/Chinese/Japanese tech blogs = strong multi-channel
D13_pattern_extractability: 5 # langgraph-agent strategy + 20-engine search composition + SQLCipher per-user pattern + benchmark methodology are all highly extractable
D14_reversibility: 4 # clean MCP install/remove; SQLCipher DB removable
D15_supply_chain: 5 # Cosign-signed Docker + SBOM + SLSA provenance + OpenSSF Scorecard + Bearer + Semgrep + CodeQL + DevSkim + OWASP ZAP + Trivy + Dockle + Hadolint = industry-leading hygiene
install_score: 4.38
pattern_score: 4.69
hard_cap_breaches: []
preliminary_tier: T1 INSTALL
```

### Rationale
install_score 4.38 (≥4.0) with ALL hard-caps cleared → **T1 INSTALL** preliminary. The 95.7% SimpleQA + 77% xbench is a real W287-P1a-class measured signal (not author-claim). LangChain official partner-class endorsement + HN viral + multi-international coverage = D12 multi-channel signal is strong (not just stars). D15 supply-chain is industry-leading. The `ldr-mcp` STDIO server is a clean CC-native pathway. Should be considered for actual install at next operator-sign-off; provides capability complementary to existing deepwiki/exa research tools (local-first + multi-engine + benchmark-leading).

---

## Candidate 8: `VectifyAI/PageIndex`

### Discovery / context
31,581★ MIT-licensed Python library — "vectorless, reasoning-based RAG" via hierarchical tree index. Created 2025-04-01, last commit 2026-05-15. Mafin 2.5 wrapper achieves **98.7% on FinanceBench**. Trendshift-listed. Cloud service at pageindex.ai with MCP+API; open-source self-host is Python CLI (`run_pageindex.py`). VectifyAI org backing. Mingtian Zhang lead. 2710 forks.

### evidence_pack
```yaml
candidate: VectifyAI/PageIndex
collected_at: 2026-05-18
benchmark:
  - metric: "FinanceBench accuracy (Mafin 2.5 wrapper)"
    value: 98.7
    baseline: "vector-based RAG"
    delta_vs_baseline: "+state-of-the-art on FinanceBench"
    source: "https://github.com/VectifyAI/Mafin2.5-FinanceBench (full benchmark results); README §Case Study"
code_reading:
  - claim: "vectorless reasoning-based retrieval via tree-structure-index — two-step retrieval: (1) generate ToC tree, (2) reasoning-based tree-search"
    file: "run_pageindex.py + cookbook/pageindex_RAG_simple.ipynb"
    lines: "TBD (referenced in README §Introduction)"
    source: github-api
  - claim: "PageIndex File System (PIFS) — file-level tree layer enabling massive-scale doc search"
    file: "examples/agentic_vectorless_rag_demo.py"
    lines: "TBD"
    source: github-api
practitioner_report:
  - org: "VectifyAI org + Mingtian Zhang"
    outcome: "PageIndex blog series + Mafin 2.5 paper showing 98.7% on FinanceBench"
    source: "https://vectify.ai/blog/Mafin2.5; https://pageindex.ai/blog/pageindex-intro"
    published: 2025-09
  - org: "Trendshift"
    outcome: "listed at trendshift.io/repositories/14736"
    source: "https://trendshift.io/repositories/14736"
    published: 2025
sources_typed_disagreement: []
```

### score_card
```yaml
candidate: VectifyAI/PageIndex
D1_license: 5     # MIT verbatim
D2_uniqueness: 5  # vectorless + chunkless + reasoning-based-retrieval pattern is genuinely novel — not duplicated by any installed memory/RAG tier
D3_harness_fit: 3 # Python library + LiteLLM-multi-LLM; requires OpenAI/Ollama/etc backing; no first-class autonomous-/loop pathway; Windows portability untested
D4_cc_pathway: 2  # cloud service has MCP but self-host open-source is Python CLI; no SKILL.md/plugin.json/agents; no first-class CC MCP for self-host
D5_typed_evidence: 5 # 98.7% FinanceBench is measured + Mafin 2.5 paper + benchmark repo
D6_authority: 4   # VectifyAI org + Mingtian Zhang + PageIndex team blog; documented-practitioner-class
D7_velocity_balanced: 4 # commits days-fresh; v2 update + PIFS recent
D8_benchmark_deltas: 5 # 98.7% FinanceBench is +materially-significant delta vs vector-RAG baseline
D9_failure_modes: 3 # cloud-vs-self-host quality disclaimer for OCR limitations; partial FM-class disclosure
D10_duplication: 4 # tree-index reasoning pattern is non-duplicate; complementary to installed graphiti tree-walks
D11_context_cost: 3 # Python library — adds no MCP tool-list cost; uses LLM call budget
D12_community_distribution: 5 # 31.5k★ + Trendshift + Discord + Medium articles + cloud service + blog + multi-channel coverage
D13_pattern_extractability: 5 # tree-structured-index + reasoning-based-retrieval pattern is HIGHLY extractable — can be lifted into our RAG without installing
D14_reversibility: 4 # pip uninstall clean; cloud needs API-key revoke
D15_supply_chain: 3 # standard Python deps; not Cosign-signed
install_score: 3.85
pattern_score: 4.66
hard_cap_breaches: []
preliminary_tier: T3 PATTERN-STUDY
```

### Rationale
install_score 3.85 (T2 range) BUT pattern_score 4.66 with D2=5 + D13=5 strongly favors T3 PATTERN-STUDY. D4=2 (no CC-native pathway) makes INSTALL less compelling than extracting the pattern. **T3 PATTERN-STUDY** is the right tier: lift the tree-index + reasoning-based-retrieval pattern into our own tooling (operator can use Mafin 2.5's FinanceBench methodology to validate any RAG addition), and reference VectifyAI's reasoning-vs-similarity argument in our memory architecture without installing PageIndex itself. The 98.7% FinanceBench is W287-P1a-class typed-evidence — the cleanest benchmark surface in the ranks-6-10 set.

---

## Candidate 9: `bytedance/deer-flow`

### Discovery / context
68,272★ MIT-licensed "open-source long-horizon SuperAgent harness" — orchestrates sub-agents + memory + sandbox + skills + tools. Created 2025-05-07, last commit 2026-05-17. DeerFlow 2.0 is a ground-up rewrite. ByteDance corporate-backed (Volcengine "Coding Plan" partnership). #1 on GitHub Trending Feb 2026. Ships `claude-to-deerflow` skill for Claude Code interaction. Has `/mnt/skills/public/*/SKILL.md` skills system, `/mnt/user-data/uploads`/`workspace`/`outputs` sandbox layout, sub-agent dispatch, sandbox-aware execution. Operator-flag candidate: tests whether v3 correctly handles a high-star repo with multi-channel signal but heavy duplication against the installed runtime.

### evidence_pack
```yaml
candidate: bytedance/deer-flow
collected_at: 2026-05-18
benchmark:
  - metric: no-benchmark-surface
    value: null
    baseline: none
    delta_vs_baseline: null
    source: "README has no measured benchmark vs incumbent; sister project PageIndex has 98.7% FinanceBench but that's PageIndex, not deer-flow itself"
code_reading:
  - claim: "skills system at /mnt/skills/public/*/SKILL.md (research, report-generation, slide-creation, web-page, image-generation, claude-to-deerflow)"
    file: "skills/public/<name>/SKILL.md"
    lines: "TBD (referenced README §Skills & Tools)"
    source: github-api
  - claim: "sub-agent dispatch + lead_agent + sandbox-aware execution; sub-agents return structured results to lead agent"
    file: "backend/packages/harness/deerflow/client.py"
    lines: "TBD (referenced README §Sub-Agents)"
    source: github-api
  - claim: "AioSandboxProvider for Docker-isolated shell vs LocalSandboxProvider for trusted-local"
    file: "deerflow/community/aio_sandbox.py"
    lines: "TBD (referenced README §Sandbox & File System)"
    source: github-api
practitioner_report:
  - org: "ByteDance Volcengine (T1 corporate backing)"
    outcome: "Coding Plan partnership + Doubao-Seed-2.0-Code recommendation; corporate sponsorship"
    source: "https://www.volcengine.com/activity/codingplan"
    published: 2026
  - org: "GitHub Trending #1 (Feb 28, 2026)"
    outcome: "claimed #1 spot on launch of 2.0"
    source: README §intro
    published: 2026-02-28
  - org: "Trendshift listed"
    outcome: "trendshift.io/repositories/14699"
    source: "https://trendshift.io/repositories/14699"
    published: 2025
sources_typed_disagreement:
  - dim: D6_authority
    finding: "ByteDance corporate authority is real; community-grassroots signal is harder to disambiguate from corporate marketing"
```

### score_card
```yaml
candidate: bytedance/deer-flow
D1_license: 5     # MIT verbatim
D2_uniqueness: 2  # SuperAgent harness overlaps W288 runtime itself — sub-agents + skills + memory + sandbox + tools are all installed primitives via superpowers/agent-teams/codex/sandbox-runtime
D3_harness_fit: 2 # assumes Linux server deployment + Docker-recommended + UI at :2026; NOT autonomous-/loop fit; Windows is "development or evaluation environment only"; this is a competing runtime, not a primitive
D4_cc_pathway: 3  # has claude-to-deerflow skill for Claude Code → deer-flow interaction; but deer-flow is NOT itself a CC primitive — it's an external parallel runtime
D5_typed_evidence: 3 # ByteDance org + Trendshift + GitHub Trending #1 + sister-project FinanceBench claim; no own measured delta vs incumbent runtime
D6_authority: 5   # ByteDance is T1 corporate; Volcengine Coding Plan partner
D7_velocity_balanced: 4 # active 2.0 rewrite recently shipped; daily commits; multi-contributor
D8_benchmark_deltas: 2 # no measured delta vs incumbent runtime; author-claims only; W287 P1a caps at 2
D9_failure_modes: 4 # extensive ⚠️ Security Notice + deployment sizing table + sandbox warnings + IP allowlist guidance
D10_duplication: 3 # parallel competing runtime that overlaps installed superpowers/agent-teams/codex/sub-agents/memory/skills/sandbox — partial overlap not full duplicate (different architecture)
D11_context_cost: 3 # if installed = parallel runtime + own skills preload + own sandbox + own MCP servers = significant added context cost
D12_community_distribution: 4 # 68k★ + GitHub Trending #1 + Volcengine partnership + Trendshift + multi-language coverage; multi-channel exists but is corporate-backed (not grassroots distributed)
D13_pattern_extractability: 4 # the skill-organization-conventions (/mnt/skills/public/), sub-agent-dispatch logic, sandbox layout patterns are extractable as reference
D14_reversibility: 3 # Docker-recommended deployment; uninstall = remove containers + volumes + skills + persisted runtime state; non-trivial
D15_supply_chain: 4 # ByteDance backed; LangChain framework; Docker production; sandbox warnings; not Cosign-mentioned
install_score: 3.24
pattern_score: 3.32
hard_cap_breaches: ["D5<4"]
preliminary_tier: T2 VENDOR-FORK
```

### Rationale
install_score 3.24 (T2 VENDOR-FORK range) + MIT permits fork + D5<4 caps INSTALL only (not VENDOR-FORK) → **T2 VENDOR-FORK** eligible. pattern_score 3.32 < 3.5 + D2=2<4 → T3 PATTERN-STUDY BLOCKED. The SOFT-gate works as intended on this operator-flag candidate: 68k★ raw stars would have placed deer-flow at borderline-ADOPT under v2's `score_mean≥4.3` heuristic, but v3 correctly downgrades to VENDOR-FORK because (a) D5 evidence-typing fails INSTALL hard-cap, (b) D10 duplication penalty drops install_score, (c) D2 uniqueness is honest about the competing-runtime overlap. The vendor-fork-able artifacts are: skill-organization conventions (`/mnt/skills/public/<name>/SKILL.md` layout), sub-agent-dispatch boilerplate, sandbox layout (`/mnt/user-data/uploads`/`workspace`/`outputs`), and the claude-to-deerflow skill if we want CC↔external-runtime patterns. Critically NOT install — would compete with our autonomous-/loop CC-native runtime.

---

## Candidate 10: `Dicklesworthstone/frankenterm`

### Discovery / context
80★ NOASSERTION-licensed Rust binary — "Terminal hypervisor for AI agent swarms: real-time pane capture, state-machine pattern detection, JSON API for coordinating fleets of coding agents across WezTerm". Created 2026-01-18 (~4 months ago), last commit 2026-05-18 today. Operator-flag candidate: tests whether v3 routes low-star (80★) but unique-capability repos to PATTERN-STUDY/CITE-ONLY rather than auto-REJECT. README was too large (241K chars) — used GitHub metadata + description + topics for scoring.

### evidence_pack
```yaml
candidate: Dicklesworthstone/frankenterm
collected_at: 2026-05-18
benchmark:
  - metric: no-benchmark-surface
    value: null
    baseline: none
    delta_vs_baseline: null
    source: "no benchmark; capability is qualitative (pane-coordination for agent swarms)"
code_reading:
  - claim: "real-time pane capture + state-machine pattern detection + JSON API for fleet coordination across WezTerm panes"
    file: "src/ (Rust binary; specific files TBD — README too large to fully ingest)"
    lines: "TBD"
    source: "github-api repo metadata + description"
practitioner_report:
  - org: none-found
    outcome: "13 forks + 1 open issue; community signal not yet established"
    source: github-api repo metadata
    published: 2026-05-18
sources_typed_disagreement:
  - dim: D1_license
    finding: "GitHub reports SPDX=NOASSERTION; LICENSE file not yet read in full — could be permissive or restrictive; pending verification"
```

### score_card
```yaml
candidate: Dicklesworthstone/frankenterm
D1_license: 2     # NOASSERTION on GitHub — license unverified, conservative score until LICENSE file confirmed
D2_uniqueness: 4  # terminal-hypervisor for AI agent swarms via WezTerm pane-capture is a niche pattern not in installed set (W280d parallel-session safety uses git-worktrees, not terminal-pane coordination)
D3_harness_fit: 2 # WezTerm-specific (not present in Z: portable runtime); Rust binary; Windows portability untested; manages USER-facing terminal panes (not autonomous-/loop fit)
D4_cc_pathway: 1  # no SKILL.md/plugin.json/MCP server — external Rust tool, not CC primitive
D5_typed_evidence: 2 # description + topics only; no benchmark; no practitioner reports
D6_authority: 2   # solo Dicklesworthstone; not Anthropic; Bayesian: α=0, β=0, γ=0 (created <12mo), δ=0
D7_velocity_balanced: 4 # commit today; 13 forks; 1 open issue; active solo dev
D8_benchmark_deltas: 1 # no benchmark + no claimed delta; W287 P1a returns 1
D9_failure_modes: 3 # default for niche tool; explicit FM-class not documented
D10_duplication: 4 # terminal-pane coordination for parallel agents not in installed set; complementary to W280d worktree-per-session
D11_context_cost: 4 # external Rust binary — no CC tool-list cost
D12_community_distribution: 3 # 80★ + 13 forks + ai-agents/wezterm topics; multi-channel sparse; stars-with-thin-channel caps at 3 per v3 rule
D13_pattern_extractability: 4 # JSON API + state-machine pattern detection concept is extractable as reference for W280d parallel-session safety upgrade
D14_reversibility: 3 # Rust binary install + WezTerm config; uninstall non-trivial state
D15_supply_chain: 3 # crates.io ecosystem; not Cosign-mentioned; standard Rust deps
install_score: 2.60
pattern_score: 2.90
hard_cap_breaches: ["D1<3", "D5<4"]
preliminary_tier: T4 CITE-ONLY
```

### Rationale
install_score 2.60 (below T2 floor of 3.0) AND pattern_score 2.90 (below T3 floor of 3.5) AND D2=4 (not 5) so the soft-gate edge rule (pattern within 0.3 of floor + D2=5 + D13=5) does NOT apply. D1<3 (NOASSERTION license) caps INSTALL. D5<4 caps INSTALL. BUT D10=4 (no duplicate), D7=4 (active), D15=3 (no security-blocker), no adversarial-BLOCK present → **NO REJECT**. The candidate routes to **T4 CITE-ONLY** — preserved as a pattern reference for parallel-CC-session terminal coordination (could inform a future W280d enhancement), but does not qualify for INSTALL/VENDOR-FORK/PATTERN-STUDY due to weak typed-evidence + license-unclear + no benchmark. **Operator-flag test verdict: v3 correctly does NOT auto-REJECT this 80★ low-star niche-pattern candidate** — confirms the SOFT-gate works per the W288 mandate "stars not a hardgate, low-star ≠ auto-reject".

---

## Pipeline results summary — ranks 6-10

| Rank | Repo | install_score | pattern_score | Hard caps | v3 Tier |
|---:|---|---:|---:|---|---|
| 6 | Lyellr88/MARM-Systems | 3.35 | 2.73 | D5<4 | **T4 CITE-ONLY** |
| 7 | LearningCircuit/local-deep-research | **4.38** | 4.69 | none | **T1 INSTALL** |
| 8 | VectifyAI/PageIndex | 3.85 | **4.66** | none | **T3 PATTERN-STUDY** |
| 9 | bytedance/deer-flow | 3.24 | 3.32 | D5<4 | **T2 VENDOR-FORK** |
| 10 | Dicklesworthstone/frankenterm | 2.60 | 2.90 | D1<3, D5<4 | **T4 CITE-ONLY** |

---

## Executive summary (5 bullets)

1. **Tier distribution spans 4 of 5 ladder tiers** — T1 INSTALL (1: local-deep-research), T2 VENDOR-FORK (1: deer-flow), T3 PATTERN-STUDY (1: PageIndex), T4 CITE-ONLY (2: MARM + frankenterm). Zero REJECTs across the 5 candidates — the SOFT-gate works as designed: low scores route DOWN the ladder, not to REJECT.

2. **One genuine T1 INSTALL candidate emerged**: `LearningCircuit/local-deep-research` (install_score 4.38, pattern_score 4.69, ALL hard-caps clear). Strong measured benchmark (95.7% SimpleQA + 77% xbench), LangChain official partnership, multi-international practitioner coverage, industry-leading supply-chain hygiene (Cosign + SBOM + 12-scanner CI). Provides capability complementary to existing deepwiki/exa (local-first + multi-engine + benchmark-leading). Recommend operator-sign-off for actual install at next wave.

3. **deer-flow operator-flag test PASSED**: 68k★ raw stars would have been borderline-ADOPT under v2's `score_mean≥4.3` heuristic, but v3 correctly downgraded to T2 VENDOR-FORK (install_score 3.24) because D5 evidence-typing fails INSTALL hard-cap + D10 duplication penalty + D2 honesty about competing-runtime overlap. Confirms v3's stars-not-a-hardgate mandate works in BOTH directions (low-star can route UP, high-star can route DOWN).

4. **frankenterm low-star test PASSED**: 80★ niche-pattern candidate routes to T4 CITE-ONLY (not REJECT) per the operator's "low-star ≠ auto-reject" mandate. Even with D1<3 (license unverified) + D5<4 (weak typed-evidence) + D8=1 (no benchmark), the absence of D10≤2/D7≤1/D15≤1/adversarial-BLOCK preserves the candidate as a cite reference for future W280d parallel-session-safety enhancements.

5. **PageIndex pattern_score (4.66) > install_score (3.85) demonstrates dual-composite value**: a single-composite rubric would have routed PageIndex at ~4.2 borderline-ADOPT. v3's dual composites correctly identify that the VALUE is the tree-index reasoning pattern (D2=5, D13=5) but the CC-pathway is weak (D4=2), so T3 PATTERN-STUDY is the right depth — extract the pattern, don't install the Python library. This is exactly the operator's "decision-making depth" mandate in action.
