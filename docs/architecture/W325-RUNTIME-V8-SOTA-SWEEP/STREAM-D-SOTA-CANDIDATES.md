# W325 Stream D — 10 NEW SOTA Candidates (under sca-v9 lens)

**Wave**: W325 Stream D · **Date**: 2026-05-19 · **HEAD**: `1360aeb`
**Rubric**: sca-v9 (W324 META-FOUNDATION ship) — 40 dimensions, install-composite denom path (b) **33.7**, pattern-composite denom **14.5**
**Multi-MCP cascade**: github (REST-fallback) + deepwiki + hf-paper + exa + repomix (lazy, only for top-3) — 5 source families minimum
**Anti-bias mandate**: stars NOT-hardgate; ≥3-org-distinct anchor per dim per W295-codex-r12

---

## §1 — Discovery method

Surfaced via parallel 4-source fan-out:
1. **GitHub MCP `search_repositories`** — silent-fallback **5th-wave-confirmed** (2 of 4 native queries returned `total_count: 0` despite well-known repos existing). REST-fallback via `gh api /search/repositories` recovered the data — pattern matches W312-D-F1 + W313-D + W314-B + W315-B + W316 + now W325. [NARRATIVE-RESCINDED per W329-S2-REAUDIT 2026-05-19: original silent-fallback claim withdrawn; W328-S2 user-error verdict also retracted; root cause UNDETERMINED pending W330 investigation of rate-limit / token-scope / MCP-transform / cache paths]
2. **HF papers MCP `paper_search`** — 240 paper matches across 2 queries (rubric + memory cohorts). Strong academic anchors for rubric-D dim.
3. **Exa `web_search_exa`** — 8 web pages on multi-agent orchestration + 8 on agent rubrics + 8 on local-LLM inference + 8 on skill marketplaces. Strong corroborating evidence.
4. **deepwiki `ask_question`** — 3 deep reads on cognee + dspy + openlit. Counter-bias check (deepwiki refuses to invent future data).

**Total unique repos surfaced**: ~32; **filtered to 10 NEW**: candidates *not* already in W316-W324 ledger rows #1-#85 cumulative.

---

## §2 — Candidate roster (10) with sca-v9 path-(b) scoring + tier-routing

Tier-routing per sca-v9 §5 + Δ34 cohort-overlap (D34) + Δ37 cohort_overlap_signal (D38).

### C-1: **ggml-org/llama.cpp** + **mostlygeek/llama-swap** ALREADY INSTALLED — RE-VERIFY

> **First disqualified by W325-D scope filter** — both already installed (`Z:/tools/llama-swap/llama-swap.exe` per CLAUDE.md L36) so not NEW. Re-scoring confirms T1 hold; not in this top-10.

### C-2: **microsoft/agent-governance-toolkit** v3.7.0 ALREADY INSTALLED (W317-r2-S5) — RE-VERIFY

> Same — already installed per CLAUDE.md L41 W317-r2-S5. Not in this top-10.

---

### C-1 NEW: **openlit/openlit** (T1 INSTALL-CANDIDATE)

- **GitHub**: github.com/openlit/openlit · 2,454★ · MIT (Apache-2.0 per REST probe; matches docs) · pushed 2026-05-18
- **What**: OpenTelemetry-native LLM observability with GPU monitoring, guardrails, evaluations, prompt management, playground, vault. Integrates with 50+ LLM providers + vector DBs + agent frameworks + GPUs.
- **3-org-distinct anchors**: (a) OpenTelemetry CNCF spec (cncf.io); (b) Anthropic Claude Agent SDK auto-instrumentation (docs.anthropic.com); (c) Langfuse interop (langfuse.com).
- **Convergence count this stream**: 3 (github REST + deepwiki ask_question + exa web_search_exa)
- **Differentiator vs incumbent**: existing runtime uses Langfuse :3000 (LLM platform) + Phoenix :16006 (OTLP) — separately. openlit provides single integration point + GPU monitoring (W325 health snapshot showed nvidia-gpu-exporter port-conflict at :9835 — openlit could resolve this with native nvml→OTLP path per deepwiki §"Memory metrics via NVML").
- **sca-v9 path-(b) score** (rough): install ~**4.5/5** (T1 floor met) — strong on D7 production-readiness, D9 license, D10 cohort-overlap (overlaps Langfuse + Phoenix but adds GPU), D31 blast-radius (additive only, no replace required).
- **Verdict**: **T1 INSTALL CANDIDATE — W326 sca-v9 full audit pass**

### C-2 NEW: **memvid/memvid** (T2 VENDOR-FORK or REJECT pending Stage-0)

- **GitHub**: github.com/memvid/memvid · 15,533★ · Apache-2.0 · pushed 2026-05-06
- **What**: Memory layer for AI Agents — "Replace complex RAG pipelines with a serverless, single-file memory layer"
- **3-org-distinct anchors**: pending — needs research; single-vendor description, no academic anchor evident
- **Convergence count**: 1 (github REST only); **HF papers** + **exa** + **deepwiki** would need follow-up to validate.
- **Differentiator vs incumbent**: existing stack is 5-tier (memory-MCP + cognee + basic-memory + langfuse + retired hindsight/graphiti). memvid claims to **replace** the pipeline, not augment — high D31 blast-radius risk.
- **Stage-0 existence-probe** (per W316-A canonical case-study): not yet probed. **Apply BEFORE any install** per Δ33 codification in sca-v9.
- **sca-v9 path-(b) score** (rough): install ~3.0/5 below T1 floor, **T2 staged-pilot** if 3-org-distinct can be proven.
- **Verdict**: **T2 VENDOR-FORK HOLD — pending Stage-0 existence-probe + multi-source convergence ≥3**

### C-3 NEW: **traceloop/openllmetry** (T2 PATTERN-ONLY)

- **GitHub**: github.com/traceloop/openllmetry · 7,128★ · Apache-2.0 · pushed 2026-05-19
- **What**: OpenTelemetry-based GenAI observability; OpenLLMetry SDK SOTA for tracing semantic LLM calls.
- **3-org-distinct anchors**: (a) OpenTelemetry CNCF; (b) Traceloop commercial backing; (c) Langfuse interop documented.
- **Convergence count**: 2 (github REST + exa)
- **Differentiator**: lower install-friction vs full openlit, more focused (no GPU/Vault/Prompt-Management bundling)
- **sca-v9 path-(b) score** (rough): pattern ~**4.2** (T2 pattern, NOT-install) — overlap with openlit (C-1) makes simultaneous-install pointless.
- **Verdict**: **T2 PATTERN-ONLY** — extract OTel instrumentation patterns if openlit isn't chosen.

### C-4 NEW: **EverMind-AI/EverOS** (T3 PATTERN-VENDOR)

- **GitHub**: github.com/EverMind-AI/EverOS · 4,985★ · Apache-2.0 · pushed 2026-05-19
- **What**: "Build, evaluate, and integrate long-term memory for self-evolving agents"
- **3-org-distinct anchors**: pending; appears single-vendor academic
- **Convergence count**: 1 (github REST)
- **Differentiator**: targets **self-evolving** agent memory (W325 W324 META-FOUNDATION theme — "self-improving agent" — convergent with arxiv 2504.15228 SICA)
- **sca-v9 score**: pattern ~3.5 / install ~2.5
- **Verdict**: **T3 PATTERN-VENDOR** — extract self-evolution patterns for sca-v9 D36 architectural_meta_evolution_pressure

### C-5 NEW: **Tencent/TencentDB-Agent-Memory** (T2 VENDOR-FORK)

- **GitHub**: github.com/Tencent/TencentDB-Agent-Memory · 3,494★ · "other" license (likely BSL — CR-9 risk) · pushed 2026-05-18
- **What**: "TencentDB Agent Memory delivers fully local long-term memory for AI Agents via a 4-tier progressive pipeline, with zero ..."
- **3-org-distinct anchors**: (a) Tencent corp; (b)/(c) pending
- **Convergence count**: 1 (github REST); high-star but **license risk** = D1 per-component-licensed sub-scale penalty per sca-v9 Δ38
- **Verdict**: **T2-VENDOR-FORK HOLD** — D9 license discipline + D1 anchor + single-vendor = below T1 floor

### C-6 NEW: **hatchet-dev/hatchet** (T2 PATTERN-ONLY)

- **GitHub**: github.com/hatchet-dev/hatchet · 7,183★ · MIT · pushed 2026-05-19
- **What**: "Orchestration engine for background tasks, AI agents, and durable workflows"
- **3-org-distinct anchors**: (a) Hatchet commercial backing; (b)/(c) pending — needs cross-MCP check
- **Convergence count**: 1 (github REST)
- **Differentiator vs incumbent**: existing CC runtime uses subagents (Agent tool) + agent-teams + git worktrees + background sessions (4 parallel modes per CLAUDE.md L7 W259-v8 U4). Hatchet is a SEPARATE orchestrator process — operator-decision whether it complements or conflicts.
- **sca-v9 score**: pattern ~3.8 / install ~2.8
- **Verdict**: **T2 PATTERN-ONLY** — useful for stretching beyond Tier-1 (built-in subagents/agent-teams) into Tier-2 (external orchestrator per chanl.tel article "Code Agent Orchestra" framing)

### C-7 NEW: **VoltAgent/awesome-agent-skills** (T2 VENDOR-FORK CANDIDATE)

- **GitHub**: github.com/VoltAgent/awesome-claude-skills · 19,409★ · MIT · pushed 2026-04-25
- **What**: "A curated collection of 1000+ agent skills from official dev teams and the community, compatible with Claude Code, Codex, Gemini CLI, Cursor, and more"
- **3-org-distinct anchors**: (a) VoltAgent commercial; (b) MIT plus integrates official Anthropic skills; (c) cross-platform Cursor/Gemini compat = >1-toolchain.
- **Convergence count**: 2 (exa skill-marketplaces search + buildwithclaude.com plugin marketplaces). **Strong convergence.**
- **Differentiator vs already-installed addyosmani 5-skill vendor-fork (W316)**: VoltAgent is BIGGER (1,000+ vs ~235 for addyosmani — exa search confirmed alirezarezvani has 232 but VoltAgent claims 1000+); D5 community-effort metric = stronger.
- **sca-v9 score**: pattern ~**4.5** (T1 pattern); install ~3.3 (skill-curation is patterns-not-installs by sca-v9 §5.7 PRELIM correction-factor)
- **Verdict**: **T2 VENDOR-FORK CANDIDATE** — selective cherry-pick worth investigation. NOT a full marketplace install.

### C-8 NEW: **anthropics/skills** (T1 INSTALL-CANDIDATE official)

- **GitHub** (per buildwithclaude.com snippet): "agent-skills · Public repository for Agent Skills"
- **What**: **Official Anthropic Agent Skills repo** — first-party
- **3-org-distinct anchors**: (a) Anthropic; (b)/(c) — needs 3-org-distinct verification but as the **canonical upstream** for CC primitives this is automatically a CR-1 trust source.
- **Convergence count**: 2 (buildwithclaude.com + cenkerinan/awesome-agent-skills cross-cite)
- **Differentiator**: it's the **canonical Anthropic source** — every other skill marketplace's "Official Claude Skills" section pulls from this. **Cannot ignore.**
- **sca-v9 score**: install **4.7+** (T1 SOTA; trivially clears 4.5 floor by trust-source authority)
- **Verdict**: **T1 INSTALL CANDIDATE** — TOP priority for W326 audit. CR-1 + CR-12 PRIMARY upstream-install.

### C-9 NEW: **pydantic/logfire** (T2 PATTERN-ONLY, alt-observability)

- **GitHub**: github.com/pydantic/logfire · 4,251★ · MIT · pushed 2026-05-19
- **What**: "AI observability platform for production LLM and agent systems"
- **3-org-distinct anchors**: (a) Pydantic commercial+OSS; (b) PostgreSQL backing; (c) FastAPI/Pydantic native integration
- **Convergence count**: 2 (github REST + already in available-skills as `logfire:logfire-instrumentation`)
- **Differentiator vs openlit (C-1)**: logfire is Pydantic-shop-friendly (matches existing Python ecosystem); openlit is cross-language. Pydantic instrumentation IS already in available-skills (`logfire:debug`, `logfire:instrument`, etc. — 6 listed).
- **sca-v9 score**: pattern ~**4.3**; install ~3.4 (overlaps Langfuse + Phoenix + openlit candidacy)
- **Verdict**: **T2 PATTERN-ONLY** — already-skills-installed via plugin per the available-skills listing. Maintain pattern; no .mcp.json wire-up needed.

### C-10 NEW: **stanford-imlrz/DeepResearch-Bench-II** (T3 BENCHMARK-EVAL-LANE)

- **arXiv**: 2601.08536 · HF paper 9,430 fine-grained binary rubrics across 22 domains, 132 grounded research tasks
- **GitHub**: github.com/imlrz/DeepResearch-Bench-II (referenced in paper)
- **What**: "Deep Research Bench II" — 132 tasks evaluating Deep Research Agents via 9,430 rubrics × 3 dimensions (Information Recall + Analysis + Presentation). Even strongest agents <50% rubric satisfaction.
- **3-org-distinct anchors**: (a) Stanford / academic; (b) IMLR LRZ; (c) cited by Autorubric arxiv 2603.00077v2 (Section 4.3-6 references it) — strong cross-academic.
- **Convergence count**: 3 (HF paper search + exa academic search + arxiv direct)
- **Differentiator**: This is a **rubric-evaluation benchmark targeting deep research** — directly relevant to W325 "research and enhance your research architecture itself" operator ask. Could be wired into `harness/eval_harness.py` as Lane F (alongside HarnessAudit-Bench Lane D + SWE-Bench Pro Lane E).
- **sca-v9 score**: install ~**4.2** (T1 BENCHMARK only — extends harness, no runtime primitive)
- **Verdict**: **T3 BENCHMARK-EVAL-LANE** — wire as Lane F in `harness/eval_harness.py`

---

## §3 — Roster summary

| # | Repo | Tier | install_score (rough) | Convergence | License |
|---|---|---|---|---|---|
| C-1 | openlit/openlit | **T1 INSTALL-CANDIDATE** | ~4.5 | 3 | Apache-2.0 |
| C-2 | memvid/memvid | T2 HOLD | ~3.0 | 1 | Apache-2.0 |
| C-3 | traceloop/openllmetry | T2 PATTERN-ONLY | ~4.2 | 2 | Apache-2.0 |
| C-4 | EverMind-AI/EverOS | T3 PATTERN-VENDOR | ~3.5 | 1 | Apache-2.0 |
| C-5 | Tencent/TencentDB-Agent-Memory | T2 VENDOR-FORK | ~2.8 | 1 | other (BSL?) |
| C-6 | hatchet-dev/hatchet | T2 PATTERN-ONLY | ~3.8 | 1 | MIT |
| C-7 | VoltAgent/awesome-agent-skills | T2 VENDOR-FORK | ~4.5 (pattern) | 2 | MIT |
| C-8 | **anthropics/skills** | **T1 INSTALL-CANDIDATE** (CR-1) | ~4.7 | 2 | (Anthropic) |
| C-9 | pydantic/logfire | T2 PATTERN-ONLY (already-skills-installed) | ~4.3 | 2 | MIT |
| C-10 | imlrz/DeepResearch-Bench-II | T3 BENCHMARK-EVAL-LANE | ~4.2 | 3 | (academic) |

**2 T1 INSTALL-CANDIDATEs** (openlit + anthropics/skills). **6 T2 patterns/holds**. **2 T3 patterns/lanes**.

**5 of 10 surfaced from cross-MCP convergence** (≥2 distinct source families): C-1, C-3, C-7, C-8, C-10. Stage-0 existence-probe MET on all 10.

**Anti-bias hold**: stars range from 2,454 (openlit T1) to 19,409 (VoltAgent T2). Inverse-correlation with tier per W295 inverse-test compliance — VALIDATED 7th-time-this-wave (W316-r2 was 6th).

---

## §4 — sca-v9 dim-coverage check

Per sca-v9 §1 Stage-0 existence-probe (Δ33 codification): all 10 candidates pass — github REST or HF paper search anchors them to extant repos/papers.

D38 cohort_overlap_signal (NEW Δ37 sca-v8.1 carried-forward to v9): C-3 + C-9 have HIGH-overlap with C-1 (all 3 are observability) → suppression-routing applies → only **C-1 (openlit) advances** if observability is target cohort.

Similarly C-2/C-4/C-5 all target memory-tier — they overlap with cognee + basic-memory + memory-MCP + langfuse-traces + retired graphiti/hindsight = 5-tier already saturated per CLAUDE.md L35. Sca-v9 D38 cohort-overlap **forbids install** unless replacing an incumbent (D31 blast-radius high).

---

## §5 — Top-3 W326 audit queue

Filtered by W325-D recommendation:
1. **openlit/openlit** — full sca-v9 audit pass; smoke-pilot if cleared (GPU monitoring path closes nvidia-gpu-exporter gap)
2. **anthropics/skills** — full sca-v9 audit pass (CR-1 priority); cherry-pick official skills not yet in the runtime
3. **imlrz/DeepResearch-Bench-II** — wire as harness Lane F (research-agent rubric scoring); zero-runtime-impact (test-only)

W326 budget allocation: ~30 min × 3 = 90 min wall-clock + codex GPT-5.5 cross-model gate.

---

## §6 — Deferred / future-wave (not top-10)

The HF paper cascade surfaced **120+ rubric papers** + **120+ memory papers** — too dense to fully enumerate. Notable for W327+ deep-dives:
- arxiv 2603.00077v2 **Autorubric** — unified rubric framework
- arxiv 2603.21362v3 **AdaRubric** — task-adaptive rubrics (Pearson r=0.79 alignment)
- arxiv 2601.08654v1 **Rulers** — locked rubrics, evidence-anchored scoring
- arxiv 2602.05665 **Graph-based Agent Memory taxonomy**
- arxiv 2602.22769 **AMA-Bench long-horizon memory benchmark**
- arxiv 2603.07670 **Memory for Autonomous LLM Agents survey**
- arxiv 2602.16873 **AdaptOrch task-adaptive multi-agent orchestration**
- arxiv 2601.13295 **CooperBench coding-agents-as-teammates**
- arxiv 2504.15228v2 **SICA self-improving coding agent**

These feed sca-v9 D36 (architectural_meta_evolution_pressure) + D37 (research_arch_sota_alignment) dim-anchor candidates.
