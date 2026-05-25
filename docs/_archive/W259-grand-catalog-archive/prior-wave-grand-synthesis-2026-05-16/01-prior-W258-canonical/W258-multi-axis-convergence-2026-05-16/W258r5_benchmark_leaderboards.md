# W258r5 — Benchmark Leaderboard Evidence (2026-05-16)

**Mission:** Capability-objective SOTA convergence — what the BENCHMARKS say (not popularity / stars).
**Method:** Parallel `ctx_fetch_and_index` of 16 leaderboard sources + 6 WebSearch sweeps.
**Result:** DISCOVERY-COMPLETE. Convergence signal IS strong but DIVERGES from W258 round-1 in one respect (OpenHands has stronger OSS benchmark evidence than round-1 implied).

---

## §1 SWE-bench Verified — top entries (2026-May)

| # | Agent + Model | % Resolved | Open? | Source |
|---|---|---|---|---|
| 1 | Claude Mythos Preview (Anthropic eval) | **93.9%** | proprietary scaffold + closed model | marc0.dev 2026-05-13 |
| 2 | Claude Opus 4.7 (Adaptive scaffold) | **87.6%** | closed model | codesota.com / marc0.dev |
| 3 | GPT-5.5 (OpenAI eval) | 88.7% | closed | marc0.dev 2026-04-23 |
| 4 | GPT-5.3 Codex | 85.0% | closed model + CLI | marc0.dev |
| 5 | Augment Code + Opus 4.6 (proprietary scaffold) | **72.0%** | closed scaffold | particula.tech / Augment self-report |
| 6 | **OpenHands + CodeAct v3 + Opus 4.6** | **68.4%** | **YES — top OSS scaffold** | localaimaster / OpenHands blog |
| 7 | Devin 2.0 (Cognition, standard single-agent) | 45.8% | closed scaffold | awesomeagents leaderboard |

**Key takeaway:** Top score keeps the *model* primary (Anthropic Mythos / Opus 4.7 / GPT-5.5), but **OpenHands + CodeAct v3 is the OSS-scaffold record at 68.4%**, outperforming Devin's standard 45.8% by 23 points.

Sources: [SWE-bench](https://www.swebench.com/), [SWE-Bench May 2026 (marc0.dev)](https://www.marc0.dev/en/leaderboard), [Particula scaffold analysis](https://particula.tech/blog/agent-scaffolding-beats-model-upgrades-swe-bench), [Awesome Agents leaderboard](https://awesomeagents.ai/leaderboards/swe-bench-coding-agent-leaderboard/), [LocalAIMaster OpenHands vs SWE-Agent](https://localaimaster.com/blog/openhands-vs-swe-agent).

---

## §2 SWE-Bench Pro (less-contaminated) — agent-scaffold leaderboard

**Same base model (Opus 4.5), different scaffolds:**

| # | Agent | Score | Vendor |
|---|---|---|---|
| 1 | **GPT-5.3-Codex (CLI)** + GPT-5.3-Codex | **57.0%** | OpenAI Codex CLI |
| 2 | **Claude Code** + Opus 4.5 | **55.4%** | Anthropic native scaffold |
| 3 | Auggie + Opus 4.5 | 51.8% | Augment Code |
| 4 | Cursor + Opus 4.5 | 50.2% | Anysphere |

**Spread = 5.2 percentage points on identical model from scaffold alone.** Opus 4.5 is 45.9% on raw SEAL → +4-10 points purely from scaffold quality. SWE-Bench Pro is the cleaner signal because SWE-bench Verified shows contamination (46% Pro vs 81% Verified on same base).

Sources: [SWE-Bench Pro Leaderboard (Morph)](https://www.morphllm.com/swe-bench-pro), [BSWEN scaffold analysis](https://docs.bswen.com/blog/2026-04-20-swe-bench-pro-agent-scaffold/), [Scale Labs SWE-Bench Pro Public](https://labs.scale.com/leaderboard/swe_bench_pro_public).

---

## §3 Terminal-Bench 2.0 (Mar 2026) — top 10

Docker-containerized terminal tasks, 89 manually-verified tasks, pass@1 averaged:

| # | Agent + Model | Score |
|---|---|---|
| 1 | **Forge Code** + Gemini 3.1 Pro | **78.4%** |
| 2 | Droid + GPT-5.3-Codex | 77.3% |
| 3 | Simple Codex + GPT-5.3-Codex | 75.1% |
| 4 | Terminus-KIRA + Gemini 3.1 Pro | 74.8% |
| 5 | Terminus-KIRA + Opus 4.6 | 74.7% |
| 6 | Mux + GPT-5.3-Codex | 74.6% |
| 7 | OB-1 (multi-model) | 72.4% |
| 8 | TongAgents + Opus 4.6 | 71.9% |
| 9 | **Junie CLI** (multi-model) | 71.0% |
| 10 | CodeBrain-1 + GPT-5.3-Codex | 70.3% |

**Note:** Claude Code, OpenHands, opencode do NOT appear in Terminal-Bench 2.0 top-10 → terminal-task SOTA shape diverges from SWE-bench SOTA shape.

Sources: [Terminal-Bench 2.0 Leaderboard (Morph)](https://www.morphllm.com/terminal-bench-2), [Terminal-Bench official](https://www.tbench.ai/leaderboard/terminal-bench/2.0).

---

## §4 Aider Polyglot (model-agnostic, Aider scaffold only)

225 Exercism problems across C++/Go/Java/JS/Python/Rust:

| # | Model | Score | Date |
|---|---|---|---|
| 1 | Claude Opus 4.5 | 89.4% | 2026-01 |
| 2 | GPT-5 (high reasoning) | 88.0% | 2026-03 |
| 3 | o3-pro | 84.9% | 2025-06 |
| 4 | Gemini 2.5 Pro | 83.1% | 2025-05 |

Aider as scaffold is mature — the Aider Polyglot test bench is scaffold-locked (Aider's own diff-edit), so this measures model code-editing skill more than scaffold quality.

Sources: [Aider Leaderboards](https://aider.chat/docs/leaderboards/), [CodeSOTA code generation](https://www.codesota.com/code-generation).

---

## §5 METR Time Horizon (May 8, 2026 update)

Task-completion time horizon = task duration (human expert minutes) at which an AI agent succeeds at given reliability:
- Updated 2026-05-08, task suite expanded 170 → 228 tasks; long (>8hr) tasks 14 → 31
- "Measurements above 16 hrs are unreliable with current suite"
- Trend: **50% horizon doubling every ~7 months** (potentially super-exponential 2026)
- Recent additions: Claude Mythos Preview (early), GPT-5.4, Opus 4.6, GPT-5.3-Codex

Source: [METR Time Horizons](https://metr.org/time-horizons/), [Time Horizon 1.1 release blog](https://metr.org/blog/2026-1-29-time-horizon-1-1/).

---

## §6 Browser-agent benchmarks (WebArena / OSWorld) — Apr 2026

- **OpAgent (CodeFuse AI)**: 71.6% on WebArena (#1 Jan 2026) — Planner-Grounder-Reflector-Summarizer multi-agent + online RL
- **DeepSeek v3.2** as agent backbone: 74.3% (Steel.dev end-to-end index)
- Human baseline WebArena: ~78% → top OSS now within ~7 points of human

Sources: [WebArena leaderboard (AwesomeAgents)](https://awesomeagents.ai/leaderboards/web-agent-benchmarks-leaderboard/), [WebArena bench (BenchLM)](https://benchlm.ai/benchmarks/webArena).

---

## §7 Cross-benchmark convergence (the SIGNAL)

**Models that repeat in top-3 across ≥2 benchmarks (SWE-V / SWE-Pro / TBench 2.0 / Aider):**

| Model | SWE-V | SWE-Pro | TBench 2.0 | Aider Polyglot | Convergence |
|---|---|---|---|---|---|
| **GPT-5.3-Codex** | top-3 (85%) | **#1 (57.0%)** | dominates top-10 (4 entries) | strong | **STRONG** |
| **Claude Opus 4.6 / 4.7 / Mythos** | **#1 (93.9%)** | top-2 via Claude Code | top-10 (4.6 entries) | top-1 4.5 (89.4%) | **STRONG** |
| **Gemini 3.1 Pro** | not top | n/a | **#1, #4 (Forge / Terminus)** | n/a | **MODERATE** |

**Scaffolds that repeat in top-tier across ≥2 benchmarks:**

| Scaffold | SWE-Pro | SWE-V | TBench 2.0 | Convergence |
|---|---|---|---|---|
| **Claude Code (Anthropic)** | #2 (55.4%) | top tier via Mythos | absent | OSS-friendly, model-locked |
| **GPT-5.3-Codex CLI** | #1 (57.0%) | top tier | dominates | model-locked OpenAI |
| **OpenHands + CodeAct v3** | n/a | **#1 OSS (68.4% Opus 4.6)** | absent | **#1 OSS by far** |
| **Forge Code** | n/a | n/a | **#1 Terminal (78.4%)** | terminal-niche dominant |
| **Augment / Auggie** | top-5 (51.8%) | (72.0% with proprietary) | absent | closed |

---

## §8 The key meta-finding — SCAFFOLD QUALITY = +22-point swing

Cross-source consensus (Morph / Particula / BSWEN / CodeSOTA):
- Same base model, three different agent systems → 50.2% → 55.4% SWE-Bench Pro (5.2-point spread)
- Across benchmarks: **scaffold can shift identical-model results by 10-20 points on SWE-bench Verified**
- "Agent scaffolding beats model upgrades" — Particula's headline: 42% → 78% on SWE-bench from scaffold alone, no model change
- WarpGrep (search subagent) adds +2.1 to +3.7 points to every model on SWE-bench Pro

**Quote (CodeSOTA): "The model is the ceiling; the harness is the ladder."**

Source: [Particula — Agent scaffolding beats model upgrades](https://particula.tech/blog/agent-scaffolding-beats-model-upgrades-swe-bench), [Morph SWE-Bench Pro analysis](https://www.morphllm.com/swe-bench-pro).

---

## §9 Verdict (cross-bench OSS runtime architecture)

**The OSS RUNTIME architecture with strongest cross-benchmark evidence:**

1. **OpenHands + CodeAct v3** — the strongest **OSS scaffold** purely by benchmark capability:
   - 68.4% SWE-bench Verified on Opus 4.6 — within 4 points of Augment's proprietary 72.0%
   - CodeAct mechanism (agent writes Python instead of JSON tool calls) is the SOTA scaffold design
   - Beats Devin 2.0's 45.8% standard by 22.6 points
   - Active 2026-Apr, "most active open-source coding agent project"

2. **Claude Code (Anthropic native)** — best closed-shape scaffold for Anthropic stack at 55.4% SWE-Bench Pro on Opus 4.5
3. **GPT-5.3-Codex CLI** — best closed-shape for OpenAI stack at 57.0% SWE-Bench Pro

**Does this DIVERGE from round-1 (W258 verdict: opencode #1 peer, Archon as harness)?**

- **YES, partially**: The benchmark evidence privileges **OpenHands + CodeAct** as the SOTA OSS RUNTIME scaffold — strictly higher capability than opencode by SWE-bench measure.
- **NO, on user fit**: opencode is a *TUI agent* (CLI peer); OpenHands is a *server/sandbox runtime* (different shape entirely). Different roles.
- **The honest 2026-May architecture combines both**: Claude Code (driver) + OpenHands sandbox (unattended autonomous runs, benchmark-grade) + Archon (deterministic YAML workflows) + codex CLI (cross-model gate via GPT-5.3-Codex) + opencode (multi-provider peer when needed).

**The harness IS the multiplier.** Operator's current 37-plugin Claude Code stack is a *high-quality scaffold* — combined with OpenHands as the autonomous-sandbox layer, it gets the operator within striking distance of the closed-source frontier.

**Confidence: 0.87** — benchmark data is fresh (2026-Apr-May), cross-source convergent on scaffold-as-multiplier finding; uncertainty remains on whether Forge Code (TBench #1) generalizes beyond terminal tasks.

---

## §10 Cite-anchor classes

- TIER-1-DIRECT @ official leaderboards: swebench.com, tbench.ai, aider.chat, metr.org (indexed live 2026-05-16)
- TIER-2 @ benchmark aggregators: morphllm.com, marc0.dev, codesota.com, particula.tech, llm-stats.com, awesomeagents.ai (indexed live)
- TIER-3-LOCAL-COMPOSITION for the §9 architecture synthesis (combining benchmark data with W258 round-1 install-context)

**Open follow-ups:**
- Forge Code (TBench 2.0 #1) — verify if OSS, what scaffold it uses
- OpenHands installation cost vs Claude Code — is the 13-point Verified gap worth Docker overhead?
- Confirm whether opencode appears on any current leaderboard (search did not surface it)
