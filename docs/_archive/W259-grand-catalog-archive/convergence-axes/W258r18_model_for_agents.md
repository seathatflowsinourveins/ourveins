# W258r18 — Foundation Model Selection for Agentic Loops (2026-05-16)

## §1 Model leaderboard for agent loops — top 10 (composite)

Sourced from: SWE-Bench Verified (May 2026, marc0.dev/swebench), SWE-Bench Pro (Scale SEAL), Terminal-Bench 2.0 (tbench.ai via morphllm), Artificial Analysis Intelligence Index (live).

| # | Model | Provider | SWE-Bench Verified | SWE-Bench Pro (SEAL) | Term-Bench 2.0 best combo | AA Intel Idx | $/MTok in / out | Ctx |
|---|---|---|---|---|---|---|---|---|
| 1 | **GPT-5.5 (xhigh)** | OpenAI | **88.7%** (#1, Apr 23 2026) | n/a | **82.0% (Codex CLI + GPT-5.5)** | **60** (#1) | $5 / $30 | 400k |
| 2 | **Claude Opus 4.7** | Anthropic | 87.6% (#2, Apr 16 2026) | **64.3%** (#1, Anth-reported) | 69.4% (Anth-reported) | 57 | $5 / $25 | **1M** |
| 3 | **GPT-5.3-Codex** | OpenAI | 85.0% | 41% (SEAL) | **77.3%** (Droid scaffold #2) | n/a | $1.25 / $10 (est) | 400k |
| 4 | **Gemini 3.1 Pro** | Google | 80.6% | 43.3% (SEAL #3) | **78.4%** (Forge Code, Term-Bench #1) | 57 | $1.25 / $10 | 2M |
| 5 | **Claude Opus 4.5** | Anthropic | 80.9% | **45.9%** (SEAL #1) | 74.x% | 50 (est) | $5 / $25 | 1M |
| 6 | **Claude Opus 4.6** | Anthropic | 80.8% | 51.9% | 74.7% (Terminus-KIRA), **81.8% (ForgeCode)** | 51 (est) | $5 / $25 | 1M |
| 7 | **Claude Sonnet 4.5** | Anthropic | 77.2% (agentic-coding lead) | 43.6% (SEAL #2) | n/a | 49 | $3 / $15 | 1M |
| 8 | **DeepSeek V4 Pro Max** | DeepSeek | 80.6% (open-weight) | n/a | n/a | 52 | very-cheap-Anth-fmt | 1M |
| 9 | **Kimi K2.6** | Moonshot | 80.2% (open-weight) | n/a | n/a | 54 | open-weight | 256k |
| 10 | **MiniMax M2.5** | MiniMax | 80.2% (open-weight) | 36.8% (M2.1) | n/a | n/a | open-weight | 256k |

**Anthropic pricing (live 2026-05-16, docs.anthropic.com):** Opus 4.7/4.6/4.5 = $5/$25 with 5m cache write $6.25, 1h cache write $10, cache hit $0.50. Sonnet 4.6/4.5 = $3/$15 (batch $1.50/$7.50). Haiku 4.5 = $1/$5 (batch $0.50/$2.50). All Opus/Sonnet 4.6+ ship 1M context at standard pricing.

**OpenAI GPT-5.5 pricing:** $5 in / $0.50 cached / $30 out per MTok.

**DeepSeek V4 (Flash/Pro):** OpenAI-format AND **Anthropic-format endpoint** at `api.deepseek.com/anthropic` (drop-in CC replacement). Context 1M. Pricing: cache-hit cents-per-MTok range (~10-15× cheaper than Opus per r13 Aider polyglot $4.80 vs $68.63).

## §2 Cost-effectiveness frontier (Pareto)

Plotting Intel-Index vs price/MTok output (lower-left = better $/intel):

| Tier | Models | Intel | $ Out | $/Intel point |
|---|---|---|---|---|
| **Frontier-A** (intel ≥57, premium) | GPT-5.5 (60), Opus 4.7 (57), Gemini 3.1 Pro (57) | 57-60 | $25-30 | $0.42-0.53 |
| **Frontier-B** (intel 50-55, value) | Kimi K2.6 (54), MiMo-V2.5-Pro (54), Grok 4.3 (53), DeepSeek V4 Pro (52), GLM-5.1 (51) | 50-55 | open / $1-3 | $0.02-0.06 |
| **Tier-C** (intel 40-50, cheap) | Sonnet 4.6 (~49), Gemini 3 Flash, Haiku 4.5 (~42) | 40-50 | $5-15 | $0.10-0.30 |
| **Floor** (intel <40, lite) | Gemini Flash-Lite (~30), gpt-oss-120B (33) | <40 | $0.20-0.40 | $0.005-0.013 |

**Killer insight:** open-weight Frontier-B is **5-10× cheaper per intel-point** than Anthropic/OpenAI frontier-A but trails by 3-5 intel-index points. Cascade architecture (Frontier-B default → Frontier-A escalation) captures both — exactly the LiteLLM pattern r13/r10 converged on.

## §3 Per-provider strategic positioning

- **Anthropic** → strongest on **agentic coding + SWE-Bench Pro** (Opus 4.5/4.6/4.7 = SEAL #1+#2). 1M context standard on Opus/Sonnet 4.6+. Best at **multi-turn tool-use stability**. Cache discount aggressive ($0.50/MTok cache-hit = 10× discount).
- **OpenAI** → top raw intelligence (GPT-5.5 = AA Intel #1). Codex CLI + GPT-5.3-Codex/5.5 dominates **Terminal-Bench**. Reasoning escalation via o-series.
- **Google** → best **long-context (2M)** + multimodal/computer-use (Gemini 3.1 Pro 3rd at AA-Intel-57). Flash-Lite is **the cheapest tier-1** ($0.10/$0.40). Forge Code + Gemini 3.1 Pro = #1 Terminal-Bench.
- **DeepSeek** → cheapest serious frontier; Anthropic-format endpoint = drop-in for CC users. V4 Pro 1M ctx.
- **MiniMax / Kimi / GLM / MiMo** → open-weight escape valves at 76-80% SWE-Bench, ~$0.50-2/MTok.
- **Mistral / Cohere** → not on top-10 agent benches; cite-only.

## §4 Anthropic-stack-specific recommendation

Operator runs Claude Pro/Max subscription + CC.

- **Default driver:** Claude **Opus 4.7** for plan/orchestrate + critical edits. (87.6% SWE-Bench Verified + 64.3% SWE-Bench Pro #1 + 1M context — best on agentic-multi-turn-tool-stability.)
- **Cheap workhorse:** Claude **Sonnet 4.6** for routine codegen / read-and-summarize / non-critical edits ($3/$15 = 5× cheaper than Opus, intel ~49 vs Opus 57).
- **Status / micro-judge:** Claude **Haiku 4.5** for inline judges, hook outputs, statusline rendering ($1/$5 = 5× cheaper than Sonnet, fast).
- **Cross-model verification gate (codex Path P):** **GPT-5.5** for adversarial cross-model consensus (different family, higher intel-index — catches Opus-class blind spots).
- **Cost escape valve:** **DeepSeek V4 Pro** via Anthropic-format endpoint for non-critical loops / batch refactors. r13 verified ~14× spread on Aider polyglot ($4.80 vs $68.63 Opus 4).

**Optimal LiteLLM cascade for agent loops:**
```
Tier 0  Haiku 4.5         — hooks, inline-judge, status
Tier 1  Sonnet 4.6        — routine read/codegen (default)
Tier 2  Opus 4.7          — plan, critical edits, multi-turn
Tier 3  GPT-5.5 (verify)  — cross-model consensus gate
Tier 4  DeepSeek V4 Pro   — long batch loops, cost-bound
```
LiteLLM can route by token count, task type, or explicit escalate-on-fail.

## §5 Self-host crossover

- API wins below ~20-50M output-tokens/day sustained.
- Self-host **DeepSeek V4 Pro / Qwen 3 Coder / Kimi K2.6** on H100 cluster wins above that.
- Aider polyglot empirical data (r13): Opus-4 = $68.63 / 225 tests vs DeepSeek-R = $4.80 / 225 tests = **14.3× spread**.
- Claude Max $200/mo subscription wins vs API above ~40M Opus input/mo (per r13 crossover).
- For solo operator on Pro/Max: subscription already optimal; cross-model cascade via API only for non-Anthropic models (DeepSeek/GPT-5.5).

## §6 Verdict

**Best models for agent loops 2026-May (definitive):**

1. **GPT-5.5** — newly displaced Opus 4.7 on SWE-Bench Verified (88.7% vs 87.6%) and tops AA Intelligence Index (60). New leader for raw agentic capability.
2. **Claude Opus 4.7** — best on SWE-Bench **Pro** (64.3% — the harder, multi-language, scaffold-standardized benchmark). 1M context standard. Best multi-turn tool-use stability. The right default for sustained agentic loops.
3. **Gemini 3.1 Pro** — only model tied with Opus 4.7 at AA Intel 57; longest context (2M); tops Terminal-Bench 2.0 paired with Forge Code (78.4%).

**Does this change W258 architecture?**

YES — strengthens the **LiteLLM cross-model cascade** case beyond r10/r13:
- **GPT-5.5** is now objectively the highest-intel single model — operator should add it via LiteLLM as a Tier-3 cross-model verification gate (different family than codex CLI's GPT-5.3, which is now slipping behind).
- **DeepSeek V4 Anthropic-format endpoint** (`api.deepseek.com/anthropic`) is the single highest-leverage cost-optimization install — drop-in for CC, 1M context, ~14× cheaper than Opus on coding benchmarks. Add this BEFORE LiteLLM if just doing single-route cost optimization.
- **Gemini 3.1 Pro** earns a slot specifically for **long-context (2M) + Terminal-Bench tasks** (Forge Code + Gemini = Term-Bench #1).
- The cascade is now 5-tier (Haiku → Sonnet → Opus → GPT-5.5-verify → DeepSeek-escape) — concrete LiteLLM router config materially derisks 2-3× of token cost without intelligence regression.

**Confidence: 0.84** — SWE-Bench Verified numbers (marc0.dev/leaderboard) are second-party aggregations of vendor-reported numbers; primary swebench.com leaderboard navigation was JS-rendered and parser-blocked, so live verification is partial. Aider Polyglot 2026-Q1 top scores cite-anchored to W258r5 file (Opus 4.5 = 89.4%, GPT-5 high = 88.0%, o3-pro = 84.9%). AA Intelligence Index numbers are live-fetched 2026-05-16 from artificialanalysis.ai homepage.

**Cite-anchors:**
- SWE-Bench May 2026: https://www.marc0.dev/en/leaderboard
- SWE-Bench Pro SEAL Top-10: https://www.morphllm.com/swe-bench-pro
- Terminal-Bench 2.0 Top-10: https://www.morphllm.com/terminal-bench-2
- AA Intelligence Index: https://artificialanalysis.ai/ (live 2026-05-16)
- Anthropic pricing: https://docs.anthropic.com/en/docs/about-claude/pricing
- OpenAI pricing: https://openai.com/api/pricing/
- Google pricing: https://ai.google.dev/pricing
- DeepSeek V4 pricing + Anthropic-format endpoint: https://api-docs.deepseek.com/quick_start/pricing
- Aider polyglot 2026 (cite via W258r5): https://aider.chat/docs/leaderboards/
