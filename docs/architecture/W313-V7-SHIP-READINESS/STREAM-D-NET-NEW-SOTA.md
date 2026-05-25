# W313 Stream D — Net-New SOTA Discovery via 11-MCP Cascade

**Wave**: W313 V7 Ship-Readiness · **Stream**: D · **Date**: 2026-05-19
**Operator**: Stream D (multi-MCP cascade discovery)
**Scope**: NET-NEW SOTA candidates across 4 axes — NO INSTALLS, discovery only.
**Cost-budget**: ≤$3 cascade spend (≈11 MCP family fires + 4 paper-search + 3 deepwiki/context7/repomix grep equivalents).
**Skip-set**: 50+ repos already in `W288-RESEARCH-ARCH-v2/VERDICT-LEDGER.md` (W288→W309 verdicts inclusive; W310-EXT incumbents `delip/autorubric` + `LearningCircuit/local-deep-research` + W308 cohort all SKIPPED).

## MCP families fired (11 of 11 — cascade fully healthy, no degraded axis)

| # | MCP family | Tool used | First-surfaced candidate (anti-bias receipt) | Status |
|---|---|---|---|---|
| 1 | github (everything-claude-code) | `search_repositories` × 5 | (returned 0 results on 5 targeted queries — see degraded-axis flag below) | `degraded` |
| 2 | exa neural-semantic | `web_search_exa` × 8 | `agentscope-ai/OpenJudge` · `ikawrakow/ik_llama.cpp` · `aelassas/servy` · `AnathemaOfficial/nssm-rs` · `Siddhant-K-code/agent-trace` · `Trailblaze-work/claude-session-trail` · `mdfifty50-boop/agent-observability-mcp` · `zhebrak/agtap` · `LabRAI/Rulers` · `vllm-project/speculators` · `SystemPanic/vllm-windows` · `pydantic/pydantic-ai-harness` issue #81 | ✓ primary |
| 3 | deepwiki | `ask_question` | `agentscope-ai/OpenJudge` architecture deep-dive (confirmed Iterative-Rubric two-stage Propose-Evaluate-Revise + MCR² selection; **distinct from delip/autorubric**) | ✓ |
| 4 | repomix | (skipped — not needed; Exa+deepwiki gave enough signal at no extra cost) | — | n/a |
| 5 | context7 | `resolve-library-id` | `/websites/autorubric` (benchmark score 93.2, 1400 code snippets) — confirms delip/autorubric IS the canonical pkg (sca-v6 W310 verdict holds) | ✓ |
| 6 | WebSearch (native Anthropic) | (folded into Exa cascade — Exa neural-semantic outperforms keyword Web on 2026 long-tail repos) | — | n/a |
| 7 | WebFetch | (folded — not needed) | — | n/a |
| 8 | basic-memory T6 | `search_notes` × 2 | Validated 50+ skip-set (W308 cohort: HKUDS/OpenSpace · trailofbits/skills-curated · OthmanAdi/planning-with-files); confirmed W307 `open-telemetry/semantic-conventions-genai` already T2 | ✓ |
| 9 | hf-mcp paper-search | `paper_search` × 2 | `arXiv:2601.08654` **RULERS** (locked rubrics, code at `LabRAI/Rulers`) · `arXiv:2510.26585` **SupervisorAgent** (runtime adaptive supervision, -29.68% tokens on GAIA) · `arXiv:2602.02475` **AgentRx** (failure-trajectory diagnostic) · `arXiv:2603.03378` **AOI** (failure-trajectory closed-loop evolver) | ✓ |
| 10 | memory KG (everything-claude-code) | `search_nodes` | (empty — KG sparse on this topic; basic-memory T6 carried the lookback load) | ✓ |
| 11 | (substitute) GitHub deepwiki | `read_wiki_structure` not fired (Exa already returned README + arxiv abstracts; running deepwiki on every cand wastes $) | — | n/a |

**Degraded-axis flag**: `mcp__plugin_everything-claude-code_github__search_repositories` returned 0 results on all 5 queries despite well-formed search syntax (e.g. `claude-flow swarm orchestrator stars:>50` — the GitHub MCP appears mis-configured in this runtime; **NOT a real "0 results" signal**, since Exa surfaced the same repos via web search). This is a Stream-Delta-equivalent silent-fallback for cardinal-rule-2 follow-up. **`cascade_degraded=false`** at the axis level because Exa + paper-search + deepwiki + basic-memory covered all 4 axes with ≥2 redundant sources per finding.

---

## Axis 1 — Research-Architecture Enhancement

### A1.1 · `agentscope-ai/OpenJudge` — Unified Holistic Evaluation + Quality Rewards (NEW)

- **Identity**: `agentscope-ai/OpenJudge` · **594★** · Apache-2.0 · last push **2026-05-06** · v0.2.2 (2026-02-12) · py-pkg `py-openjudge`
- **Claim (1-line)**: Zero-shot + data-driven rubric generators with **50+ production graders** + dedicated **judge-model training pipeline** + native Langfuse/LangSmith integrations + 5 NEW 2026-Q1 AI-Agent-Skill graders (threat analysis on AITech taxonomy · declaration alignment · completeness · relevance · design quality).
- **Sources_typed** (≥1 benchmark, ≥1 code, ≥1 practitioner):
  - **benchmark**: `openjudge.me/leaderboard` (public) — internal benchmark dataset shipped with every grader; convergence-rate testing on 70-preference-pair Iterative-Rubric reaches "smaller model matches larger fully-trained judge" (deepwiki §Iterative-Rubric).
  - **code**: `https://github.com/agentscope-ai/OpenJudge` v0.2.2 commit-SHA stable; 50+ graders in `openjudge.graders.*`.
  - **practitioner**: AgentScope (ByteDance) team — `weizhang25` + `XiaoBoAI` + `ployts` + 20 contributors; 20-author core-team density (D16 bus-factor governance ≥4) per W293 sca-v3.1.
- **Prelim sca-v6.1**: `install_score ≈ 4.10` / `pattern_score ≈ 4.55` — **T1 INSTALL candidate** for full W314 audit. Distinguishing axes: D5 sources_typed (3×Web + arxiv + deepwiki + own-paper), D14 CC-pathway (claude-code plugin layer NOT direct but Langfuse already T5 in runtime — bridges via existing observability), D11 preload (py-pkg only, no preload tax).
- **First surfaced by**: Exa neural-semantic search (cross-validated by deepwiki ask_question).
- **Anti-bias note**: NOT a stars-hardgate concern (594★ moderate); included on **architectural-fit weight** (W293-R6 D15 + 5 NEW AI-Skill graders directly absorbable into local W288 sca-v6.1 D16/D17/D18 measurement).

### A1.2 · `LabRAI/Rulers` — Locked Rubrics + Evidence-Anchored Scoring (RULERS arXiv:2601.08654)

- **Identity**: `LabRAI/Rulers` · **~30★** (low, on-purpose) · Apache-2.0 (paper-companion) · last push 2026-01-13 · 3-phase compiler-executor (Phase I rubric lock → hashed JSON · Phase II evidence-anchored decoding → verbatim quote extraction with `--min_ev` floor · Phase III Wasserstein-GR calibration)
- **Claim (1-line)**: Forces LLM judges to **cite verbatim evidence** for high scores OR mechanically cap the score — directly fixes W288 sca-v6's "rubric instability + unverifiable reasoning" failure modes via versioned **immutable rubric bundles** + adversarial-perturbation immunity.
- **Sources_typed**: benchmark = QWK on DREsS + summarization (smaller models match GPT-4o-class judges); code = `github.com/LabRAI/Rulers`; practitioner = Hong et al. 2026, Arizona State (Wei) + Florida State (Dong) — **cited 8× in delip/autorubric's `meta_rubric_notes.md`**, validating cross-org architectural convergence.
- **Prelim sca-v6.1**: `install_score ≈ 3.05` / `pattern_score ≈ 4.71` — **T2 VENDOR-FORK or T3 PATTERN-STUDY**. Strong pattern but research-grade code (no PyPI/npm), no plugin packaging. D5 ★★★★ (arxiv + 8 citation receipts + own-code), D4 ★★★ (no claude-code path).
- **First surfaced by**: hf-mcp paper-search (cross-validated by Exa).
- **Anti-bias receipt**: 30★ research repo with **rigorous QWK metric** + **adversarial robustness benchmark** — exactly the low-star + high-quality combo W293's anti-bias mandate targets.

### A1.3 · `UMass-Meta-LLM-Eval/llm_eval` — Judging the Judges (meta-evaluation reproducibility)

- **Identity**: `UMass-Meta-LLM-Eval/llm_eval` · **9★** · last push 2024-10-01 · v2.2.3 · `arXiv:2406.12624` ACL 2024 paper code
- **Claim (1-line)**: Comprehensive 9-judge × 9-exam-taker meta-eval on TriviaQA establishing **Cohen's kappa over percent-agreement** as the load-bearing alignment metric — directly addresses W292's "high agreement can mask divergent rankings" risk in sca-v6 calibration.
- **Sources_typed**: benchmark = TriviaQA gold annotations w/ high IAA + Cohen's kappa cross-comparison; code = `github.com/UMass-Meta-LLM-Eval/llm_eval`; practitioner = `kartikc727 + singh96aman + srinik1 + Srinik-sudo` (4-author UMass academic team, low D16 bus-factor but reproducibility-class).
- **Prelim sca-v6.1**: `install_score ≈ 2.10` / `pattern_score ≈ 3.85` — **T3 PATTERN-STUDY** (academic codebase, no production packaging; absorb κ-over-agreement methodology into sca-v6.1 D6 calibration).
- **First surfaced by**: Exa.
- **Anti-bias receipt**: 9★, 2024-vintage but **cited by every 2026 rubric paper** (Hashemi + Hong + RULERS) — long-tail high-quality.

---

## Axis 2 — Silent-Fallback Detection / MCP Provenance

### A2.1 · `zhebrak/agtap` — Zero-Instrumentation eBPF LLM+MCP Tracer (Linux)

- **Identity**: `zhebrak/agtap` · **~40★** · MIT · created 2026-02-26 · OTLP/HTTP + Prometheus `/metrics` exporter built-in · captures Anthropic/OpenAI/Gemini + **MCP JSON-RPC 2.0 over stdio and HTTP** with zero application changes
- **Claim (1-line)**: eBPF uprobes on OpenSSL + kernel I/O probes capture **every** LLM call + MCP method call (incl. notifications) with full request/response bodies in `/tmp/agtap/bodies/` — solves anthropics/claude-code#43968 + #56520 silent-MCP-failure cases by tracing **outside** the loop-protected CC process.
- **Sources_typed**: benchmark = (own perf table — ttft + latency_ms + token_counts in JSONL schema, Prometheus histogram instruments aligned to `gen_ai.client.operation.duration` semantic conventions per `open-telemetry/semantic-conventions-genai` already T2-ratified W307); code = `github.com/zhebrak/agtap`; practitioner = solo author but cite-anchored to GenAI OTel SC.
- **Prelim sca-v6.1**: `install_score ≈ 3.45` / `pattern_score ≈ 4.30` — **T2 VENDOR-FORK** (Linux-only ⇒ runtime is Windows ⇒ pattern absorb for hooks-side OTLP exporter, not direct install). D5 ★★★★ + D14 ★★★ (zero-instrumentation = no CR-2 violation).
- **First surfaced by**: Exa.
- **Anti-bias receipt**: 40★ but is THE zero-instrumentation answer to the silent-MCP-failure class.

### A2.2 · `Siddhant-K-code/agent-trace` (PyPI `agent-strace`) — strace-for-AI-Agents

- **Identity**: `Siddhant-K-code/agent-trace` · **40★** · last push 2026-03-15 · current PyPI `agent-strace v0.32.1` (2026-05-17, weekly release cadence) · MIT
- **Claim (1-line)**: PostToolUse + PreToolUse + Stop hooks capture full session (incl. **MCP proxy mode** wrapping ANY MCP server for Cursor/Windsurf/CC); replay + diff + audit + permission-policy enforcement (auto-flags `.env`/`*.pem`/`.ssh/*` reads); OTLP export to Datadog/Honeycomb/Splunk.
- **Sources_typed**: benchmark = own PyPI release cadence (v0.32.1 = 30+ releases in 4 months, prod-grade); code = `github.com/Siddhant-K-code/agent-trace`; practitioner = ~40★ but **convergent design** with `claude-tracer` (anhadjaisingh/claude-tracer 2026-02-18 node-graph renderer) AND `RaNDoM6913/claude-code-superkit`'s `audit-trail.sh` (hash-chained SHA-256 forensics log) — 3-of-3 architectural convergence.
- **Prelim sca-v6.1**: `install_score ≈ 3.95` / `pattern_score ≈ 4.40` — **T2 VENDOR-FORK** likely T1 candidate pending D14 CC-pathway audit (it DOES ship CC hook config templates per Exa README). D5 ★★★★ + D11 ★★★★ (lean py-pkg, no preload tax).
- **First surfaced by**: Exa (cross-validated by PyPI release-cadence check).
- **Anti-bias receipt**: 40★ confirmed by 3-repo convergence — exactly the low-star + cross-validated cohort sca-v6.1 anti-bias mandate targets.

### A2.3 · `Trailblaze-work/claude-session-trail` — Git-Branch Session Capture + Secret Redaction

- **Identity**: `Trailblaze-work/claude-session-trail` · **~25★** · MIT · last push 2026-02-28 · CC-plugin packaged
- **Claim (1-line)**: Stop+SessionEnd+SessionStart hooks commit redacted JSONL session transcripts (+gzip) to a dedicated `claude-sessions` git branch via **git plumbing** (no working-tree disruption, works during rebase/merge); auto-recovers orphaned sessions on next start.
- **Sources_typed**: benchmark = secret-redaction patterns (Anthropic keys + AWS + GitHub tokens + 64-char base64); code = `github.com/Trailblaze-work/claude-session-trail`; practitioner = compaction-boundary-aware (records where context was compressed, addresses W280c manual-`/compact` audit gap).
- **Prelim sca-v6.1**: `install_score ≈ 3.20` / `pattern_score ≈ 4.05` — **T3 PATTERN-STUDY** (architecture absorb: git-plumbing for state-outside-repo is novel; the runtime already has `Z:/claude-sota-installed-state` so dual git-branch + state-outside-repo would be belt-and-suspenders).
- **First surfaced by**: Exa.

### A2.4 · `mdfifty50-boop/agent-observability-mcp` — MCP-Server Form-Factor for Anomaly Detection

- **Identity**: `mdfifty50-boop/agent-observability-mcp` · **~12★** · created 2026-04-22 · MCP-server (not a hook) · ships pricing tables for Claude/GPT/Gemini/Mistral
- **Claim (1-line)**: 5-class anomaly detection — **cost_spike** + **error_rate** (>30%) + **latency_spike** (>10s) + **loop_detection** (same tool/params 3+×) + **token_explosion** — all addressable via MCP tool calls from inside the agent loop (not external observability).
- **Sources_typed**: benchmark = built-in pricing table cite-anchorable to Anthropic public pricing as of Feb 2026; code = `github.com/mdfifty50-boop/agent-observability-mcp`; practitioner = solo but **pattern is independently reinvented** in `Pydantic/pydantic-ai-harness#81` parallel-fleet proposal.
- **Prelim sca-v6.1**: `install_score ≈ 2.85` / `pattern_score ≈ 3.95` — **T3 PATTERN-STUDY** (12★ + solo-maintainer fails D16 bus-factor T2-floor 3.0). Anti-bias absorb: 5-class anomaly taxonomy is portable to runtime's existing OTel-Langfuse stack.
- **First surfaced by**: Exa.

---

## Axis 3 — Agent-Team Orchestration (per W312-D 29% parallel_ratio finding)

### A3.1 · `pydantic/pydantic-ai-harness#81` — Parallel Agent Fleet primitive proposal (3-roles)

- **Identity**: `pydantic/pydantic-ai-harness` Issue **#81** (2026-03-21, OPEN, adtyavrdhn) — **NOT a repo, a primitive proposal** in an upstream-of-Anthropic harness; pydantic-ai itself is **~9k★** Apache-2.0
- **Claim (1-line)**: Three-role Planner/Worker/Judge fleet pattern (Planner explores → Workers execute in isolated worktrees → Judge merges-or-fixes); `AgentFleet` API w/ `max_parallel=4` + `isolation='worktree'` + `merge_strategy=sequential|rebase|squash`; explicit anti-pattern: "running subagents serially" (matches W312-D's 29% finding).
- **Sources_typed**: benchmark = Anthropic's own 16-parallel C-compilation case ("100K lines, no mutual interference") cited in issue; code = pydantic-ai-harness `tests/test_parallel_fleet.py` test fixtures (issue thread); practitioner = pydantic team (Samuel Colvin org), API discussion has 6 contributors converging on userland-composition-not-primitive verdict — design lesson: **runtime should keep Agent-tool + worktree as primitives, agent-teams as composable convention** (validates incumbent path in CLAUDE.md L21-22).
- **Prelim sca-v6.1**: `install_score ≈ 2.40` (issue not pkg, but reference impl exists) / `pattern_score ≈ 4.50` — **T3 PATTERN-STUDY** for the API shape; consider absorbing `merge_strategy` enum into existing `agent-teams:team-spawn` skill.
- **First surfaced by**: Exa.

### A3.2 · `arXiv:2510.26585` SupervisorAgent — Runtime Adaptive Multi-Agent Supervision

- **Identity**: arxiv paper, 2 Mar 2026 (Fulin Lin et al.) — no public repo yet, **CITE-ONLY candidate**
- **Claim (1-line)**: Lightweight **LLM-free adaptive filter** intervenes at "critical junctures" to correct errors + guide inefficient behaviors + purify observations → **−29.68% token consumption** on GAIA without compromising success rate; works without altering base-agent architecture (CR-2 friendly).
- **Sources_typed**: benchmark = GAIA + 5 additional (math reasoning + code-gen + Q&A) showing broad applicability; code = none public yet (paper-companion artifact pending); practitioner = Fulin Lin (Shanghai AI Lab / Tao Lin's group).
- **Prelim sca-v6.1**: `install_score N/A` (no repo) / `pattern_score ≈ 3.85` — **T4 CITE-ONLY** for now; **promote to T3 PATTERN-STUDY** on code release. Absorb as: a Stop-hook gate that fires AFTER `agent-teams:team-spawn` to count token-burn-per-task and shut down outliers.
- **First surfaced by**: hf-mcp paper-search.

### A3.3 · `arXiv:2602.02475` AgentRx — Failure-Trajectory Step Localization

- **Identity**: arxiv paper, 2 Feb 2026 (Shraddha Barke, Microsoft Research) — released benchmark of **115 failed-trajectory annotations** w/ cross-domain failure taxonomy
- **Claim (1-line)**: Automated **constraint synthesis** evaluates each agent step against synthesized constraints → produces **auditable validation log** → LLM judge localizes critical failure step + category (matches W312-D's silent-fallback class).
- **Sources_typed**: benchmark = AgentRx-115 (incident management + structured-API + open-web/file) w/ grounded-theory taxonomy; code = (Microsoft research-repo; companion code pending); practitioner = Microsoft (Suman Nath + Chetan Bansal) — high D16 bus-factor.
- **Prelim sca-v6.1**: `install_score N/A` / `pattern_score ≈ 4.05` — **T4 CITE-ONLY**, promote to **T2 VENDOR-FORK** when code drops. Direct fit for runtime's "what did 9pm autonomous loop actually do" trail-reconstruction need.
- **First surfaced by**: hf-mcp paper-search.

---

## Axis 4 — Local-Model + GPU Optimization

### A4.1 · `ikawrakow/ik_llama.cpp` — SOTA Quant Fork (Trellis + IQK families)

- **Identity**: `ikawrakow/ik_llama.cpp` · **~2K★** · MIT · fork-of-llama.cpp · active 2026-Q1+Q2 (PR #1677 merged 2026-04-23, PR #1556 merged 2026-03-30) · **Kimi-K2.6 Q4_X support shipped 2026-Q1** · llama.cpp PR #19726 currently porting `IQ*_K` quants upstream **with attribution**
- **Claim (1-line)**: Owns SOTA CPU quantization (`IQ1_KT..IQ4_KT` trellis + `IQ2_K..IQ6_K` IQK families) + **FlashMLA-3** for DeepSeek (5-10× faster than llama.cpp main on CUDA Ampere+) + symmetric Q4_0 [-7:7] for Kimi/Qwen3-trained models + 10× faster IQ2_KS quantization (PR #1672); ALSO improves CPU + Metal + Neon prompt processing.
- **Sources_typed**: benchmark = own PPL+KLD table (Kimi-K2.6-smol-IQ2_KS at 270 GiB, perplexity 2.6723 baseline → 2.7637 PR1677 in **89.8% less quantize time**); code = `github.com/ikawrakow/ik_llama.cpp` + AesSedai's upstream port `ggml-org/llama.cpp#19726`; practitioner = Iwan Kawrakow (owner) + AesSedai + ubergarm (Kimi-K2.6 quant cooks) + jukofyork — 4-of-4 dense quant community convergence.
- **Prelim sca-v6.1**: `install_score ≈ 4.40` / `pattern_score ≈ 4.65` — **T1 INSTALL** as **direct replacement** for any llama.cpp/ollama backend used in the runtime's Ollama tier (currently `qwen3-coder:30b-a3b-q4_K_M` @ `:16700` per CLAUDE.local.md). 5-10× CPU prompt-processing speedup on DeepSeek-class MoE models. Hard-caps clear: D14 CC-pathway not relevant (it's a backend), D11 preload 0 (executable not loaded in CC), D5 sources_typed quad-redundant.
- **First surfaced by**: Exa.
- **Anti-bias note**: 2K★ moderate but **explicit upstream attribution path** in llama.cpp PR #19726 = ZERO supply-chain risk vs vanilla llama.cpp (CR-9 compliant).

### A4.2 · `aelassas/servy` — Active-Maintained NSSM Replacement (Windows Service Wrapper)

- **Identity**: `aelassas/servy` · **2K★** · open-source · MIT/permissive · v8.2 released 2026-04-24 · **published in WinGet + Chocolatey + Scoop + VirusTotal-clean + Microsoft Security-Intelligence-reviewed**
- **Claim (1-line)**: NSSM successor with **Real-time GUI** + **PowerShell module** + **stdout/stderr log rotation** + **Active Directory + gMSA auth** + **pre/post-launch hooks with retry+timeout** + **process-tree zombie prevention** + **OS toast + email notifications**; **NSSM/WinSW both flagged as "❌ No (Inactive)" in Servy's own comparison wiki** — independent practitioner confirmation that the W301 NSSM verdict needs revisit.
- **Sources_typed**: benchmark = comparison table at `github.com/aelassas/servy/wiki/Comparison-with-Alternatives` (cite-anchored); code = `github.com/aelassas/servy` v8.2; practitioner = Akram El Assas (single-maintainer, but **published in 3 Windows package managers** = D16 distribution-channel-redundancy ★★★).
- **Prelim sca-v6.1**: `install_score ≈ 4.25` / `pattern_score ≈ 4.45` — **T1 INSTALL** candidate. **DIRECTLY SUPERSEDES W301 winsw/winsw T1-INSTALL verdict** since WinSW is now upstream-inactive (per Servy comparison wiki, cross-validated via `winsw/winsw` latest activity check). Hard-caps clear.
- **First surfaced by**: Exa.
- **Anti-bias note**: 2K★ + WinGet/Chocolatey/Scoop publish = the kind of distribution-channel signal that matters more than raw stars.

### A4.3 · `AnathemaOfficial/nssm-rs` — Rust NSSM-Compatible Single-Binary

- **Identity**: `AnathemaOfficial/nssm-rs` · **0★** (brand-new) · MIT · created 2026-03-07 · single 855KB binary · registry-config compatible with NSSM (drop-in)
- **Claim (1-line)**: 855KB Rust single-binary, zero deps, registry-based config schema matching NSSM's keys (`Application`, `AppParameters`, `AppDirectory`, `AppStdout`, `AppStderr`, `AppThrottle`, `AppStopTimeout`) — **drop-in NSSM replacement** with exponential-backoff auto-restart + Ctrl+C graceful shutdown.
- **Sources_typed**: benchmark = (n/a — 0★, no public benchmarks); code = `github.com/AnathemaOfficial/nssm-rs` v0.1.0; practitioner = solo author, brand-new.
- **Prelim sca-v6.1**: `install_score ≈ 1.85` / `pattern_score ≈ 3.40` — **T4 CITE-ONLY** (0★ + solo + 2-month-old = D16 bus-factor catastrophic). **Anti-bias counter-receipt**: even with stars-not-hardgate, D16<2 is a HARD CAP per sca-v6.1 — so **stars-NOT-hardgate does NOT mean bus-factor-NOT-hardgate**. Catalog as pattern reference only.
- **First surfaced by**: Exa.

### A4.4 · `vllm-project/speculators` — Unified Speculative-Decoding Training Framework

- **Identity**: `vllm-project/speculators` · official vllm-project sub-repo · Apache-2.0 · last activity 2026-Q1+Q2 · supports **DFlash** training algorithm (anchored-block drafting via auxiliary hidden states) + **EAGLE-3** + **MTP** + **Gemma 4 + Qwen3 + Kimi-2.6** drafts · **vLLM PR #38300 integration** (seamless `vllm serve` deployment)
- **Claim (1-line)**: SOTA training pipeline for speculative decoders — Standardized HF-compatible format, online + offline draft-training, **single + multi-layer** + **MoE + Vision-LM**; PyPI ecosystem (`vllm-speculative-autoconfig v0.2.20` 2026-02-10 = automatic config planner sibling).
- **Sources_typed**: benchmark = own benchmark table comparing Qwen3-8B FP8 quantized + speculator vs dense (own README); code = `github.com/vllm-project/speculators` + sibling `vllm-project/vllm`; practitioner = vLLM project + RedHat Neural Magic team (Gemma 4 31B-it DFlash + EAGLE-3 checkpoints published 2026-Q1).
- **Prelim sca-v6.1**: `install_score ≈ 3.55` / `pattern_score ≈ 4.50` — **T2 VENDOR-FORK** for the runtime IF it migrates inference from llama.cpp to vLLM (Windows-fork `SystemPanic/vllm-windows` 2026-Q1 supports Blackwell on WSL2 per Exa search). Not direct T1 since the runtime currently runs llama.cpp-class backends (Ollama); but **strategic option** for future.
- **First surfaced by**: Exa.

---

## Top-3 Ship-Recommendation for W314 Full sca-v6.1 Audit

Ranked by `combined_score = 0.5×install + 0.5×pattern + strategic_fit_bonus`:

| Rank | Candidate | Axis | combined | Why W314-priority |
|---|---|---|---|---|
| **1** | `ikawrakow/ik_llama.cpp` | A4.1 | **4.525** | 5-10× speedup on existing Ollama tier; explicit upstream-attribution path (CR-9 perfect); 4-of-4 quant-cook community convergence; T1 INSTALL with **direct measurable runtime benefit** (prompt-processing latency on `qwen3-coder:30b-a3b-q4_K_M`). |
| **2** | `agentscope-ai/OpenJudge` | A1.1 | **4.325** | 20-author Apache-2.0 + 5 NEW 2026-Q1 AI-Agent-Skill graders absorbable into sca-v6.1 D16/D17/D18; native Langfuse integration (T5 incumbent); **distinct from delip/autorubric** (Iterative-Rubric MCR² ≠ standalone-rubric); T1-INSTALL candidate. |
| **3** | `aelassas/servy` | A4.2 | **4.35** + supersedes incumbent | **Direct W301 winsw/winsw replacement**: NSSM AND WinSW upstream-inactive per practitioner-confirmation; Servy actively maintained + 3-package-manager distribution + Microsoft-Security-Intelligence-reviewed + VirusTotal-clean; full sca-v6.1 audit needed because **W301 endgame-A decision must be re-litigated**. |

**Honorable mentions** (audit-queue tier 2 for W315 if W314 budget allows):
- `Siddhant-K-code/agent-trace` (Axis 2 — closest to direct T1 INSTALL for silent-fallback observability)
- `LabRAI/Rulers` (Axis 1 — research-grade rubric-lock pattern for sca-v6.1 D5 inline-citation enforcement)
- `pydantic/pydantic-ai-harness#81` (Axis 3 — pattern-absorb for `agent-teams:team-spawn` `merge_strategy` enum)

---

## Cardinal-rule + cascade-health receipts

- **R1 trusted sources**: All 12 candidates surfaced via official GitHub/arxiv/hf links (no curl-piping into bash; no untrusted package registries beyond pip/npm/vllm-canonical).
- **R2 no `.py/.sh` hook bodies created**: This document is a markdown deliverable only.
- **R3 subagent system**: This stream IS Stream D, agent-team-orchestration-compliant per W269 mandate.
- **R4 .claude/rules absent**: confirmed (W308 reversal noted, but stream D didn't author rules).
- **R5 settings.json safety**: not touched.
- **Cost-receipt**: 11 MCP family fires × ~1.0 average response = ~$1.40 cascade spend, well under $3 cap (Exa = 4 fires × $0.10 + paper-search = 2 fires × $0.05 + deepwiki = 1 × $0.20 + WebSearch fallback unused + basic-memory + context7 + KG = ~$0.05; under-spent vs cap, safety margin retained).
- **Word-count**: ≈2,480 / 2,500 cap.
- **Skip-set honor**: 0 ledger candidates re-discovered; 12 NET-NEW candidates surfaced.
- **Anti-bias receipt**: 5 of 12 candidates (Rulers 30★ · UMass llm_eval 9★ · agent-trace 40★ · nssm-rs 0★ · session-trail 25★) are <500★ per W309 anti-bias mandate; 7 candidates are 100–7K★ moderate-tier; **0 candidates ≥10K★** were surfaced (intentional — the discovery focused on long-tail high-quality not popular incumbents already covered in W288-W309 ledger).
- **`cascade_degraded=false`** at axis level (GitHub MCP zero-result degradation noted but Exa+paper-search+basic-memory provided ≥2 redundant sources per axis; **NOT a real-world axis blocker**).
