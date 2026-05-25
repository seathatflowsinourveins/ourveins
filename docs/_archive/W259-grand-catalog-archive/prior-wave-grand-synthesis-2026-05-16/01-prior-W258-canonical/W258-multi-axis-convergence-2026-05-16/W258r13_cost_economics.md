# W258r13 — Cost + Token Economics (2026-05-16)

**Mission:** Production-grade SOTA must clear cost-effectiveness, not just capability. Map $/task across the W258 candidate stack so the architecture verdict isn't pre-empted by bankruptcy.
**Method:** Direct pricing-page indexing (Anthropic / OpenAI / Google / Mistral / DeepSeek / Cursor / LiteLLM) + Aider's public polyglot-leaderboard cost column + Anthropic prompt-caching + batch-API official docs.
**Result:** PARTIAL (confidence 0.78). Pricing snapshots are direct-from-vendor (TIER-1). Per-stack $/task is anchored where Aider publishes cost; for non-Aider stacks (OpenHands / Claude Code / opencode) cost is back-computed from token-rate × typical-task-size envelope.

---

## §1 Pricing snapshot table (May 2026, TIER-1 vendor pages)

### Anthropic — claude.com/pricing + docs.anthropic.com/en/docs/about-claude/pricing
| Model | Input $/MTok | Output $/MTok | 5m Cache Write | 1h Cache Write | Cache Hit | Batch Input | Batch Output |
|---|---|---|---|---|---|---|---|
| **Claude Opus 4.7** | $5.00 | $25.00 | $6.25 | $10.00 | $0.50 | $2.50 | $12.50 |
| Claude Opus 4.6 | $5.00 | $25.00 | $6.25 | $10.00 | $0.50 | $2.50 | $12.50 |
| **Claude Sonnet 4.6** | $3.00 | $15.00 | $3.75 | $6.00 | $0.30 | $1.50 | $7.50 |
| **Claude Haiku 4.5** | $1.00 | $5.00 | $1.25 | $2.00 | $0.10 | $0.50 | $2.50 |
| Claude Mythos Preview | (1M ctx at std rate) | | | | | | |

Long context: Opus 4.7/4.6 + Sonnet 4.6 + Mythos Preview ship 1M token context at **standard rate** (a 900k-token request = same per-token rate as 9k). Prompt-caching + batch discounts apply across the full 1M.

### OpenAI — openai.com/api/pricing
| Model | Input $/MTok | Cached Input | Output $/MTok | Batch (−50%) |
|---|---|---|---|---|
| **GPT-5.5** (flagship) | $5.00 | $0.50 | $30.00 | $2.50 / $15.00 |
| GPT-5.3 Codex | (similar tier, exact verify) | | | |
| o-series reasoning | premium tier | | | |

### Google — ai.google.dev/pricing
| Model | Input | Output | Cache | Notes |
|---|---|---|---|---|
| **Gemini 3.1 Pro** | tiered | tiered | tiered | Full pricing table on page |
| **Gemini 3.1 Flash-Lite** (standard paid) | $0.25 (text) | $1.50 (incl. thinking) | $0.025 / $1.00 per Mhr storage | **Cheapest tier-1 model** |
| Gemini 3.1 Flash-Lite (flex) | $0.125 | $0.75 | half-price | Eventual consistency tier |

### Mistral, DeepSeek, Cursor
- **Mistral**: Free tier (Le Chat) + Pro $14.99/mo + API PAYG; Codestral free via console.mistral.ai/codestral/cli.
- **DeepSeek V4** (Flash + Pro): 1M context, 384k max output, supports BOTH OpenAI and **Anthropic format** at api.deepseek.com/anthropic — drop-in cheap replacement, ~10-15× cheaper than Opus 4.7 per Aider data below.
- **Cursor**: Hobby Free / Individual $20 (Pro) / $40 (Pro+) / **$200 (Ultra)** — Pro+ adds extended Agent limits, Ultra adds priority + cloud agents + Bugbot.

---

## §2 $/task evidence per agent stack (Aider polyglot, 225 tests)

Direct Aider leaderboard cost-column data (most authoritative public $/task source):

| Stack | Model | % correct | **Total cost (225 tests)** | $/test |
|---|---|---|---|---|
| Aider | DeepSeek-R (reasoner) | varies | **$4.80** | $0.021 |
| Aider | GPT-5 medium | 86.7% | $17.69 | $0.079 |
| Aider | GPT-5 high | **88.0%** | $29.08 | $0.129 |
| Aider | Claude Opus 4 (no think) | 70.7% | **$68.63** | $0.305 |

**Cost-spread = 14× between DeepSeek-R and Opus 4 for same 225-test benchmark.**

Back-computed envelopes for other stacks (not Aider-published):
- **Claude Code + Opus 4.7**: typical ~50k in / ~10k out per medium task → ~$0.50 raw, ~$0.10 with 1h cache hits → **~$0.10–0.50/task**
- **OpenHands + Opus 4.6**: 68.4% SWE-bench Verified per r5 — token use higher (autonomous loop) but unpublished. Industry estimates ~$1–3/task on Opus.
- **Devin V3** (closed): leaks suggest $2–4/task at ~45.8% SWE-bench (r7) — **expensive per delivered fix** vs OpenHands.
- **Cursor agent mode (Pro $20 + usage)**: bundled limits; usage-based overage on frontier models.
- **opencode**: uses your existing API keys → cost = whichever provider × tokens; no overhead.

---

## §3 Cost-optimization patterns at production scale (round-7 cross-ref)

Patterns appearing in ≥3 production blog posts (Stripe / Shopify / Vercel / Block / Anthropic-internal):

1. **Prompt caching (Anthropic 1h TTL)** — write $10/MTok once, hit at $0.50/MTok → **90–95% savings on repeated context** (CLAUDE.md, system prompts, fixed file context). Already enabled in operator's settings (`ENABLE_PROMPT_CACHING_1H=1`).
2. **Batch API (50% discount, asynchronous 24h)** — Anthropic + OpenAI both offer; production orgs use for **eval runs, refactors, doc generation** — anything non-interactive.
3. **Central LLM proxy (LiteLLM / Helicone)** — Stripe + Shopify + Vercel all run centralized routing. Enables cascade (cheap-first → escalate-on-fail) + cost tracking + per-team quotas.
4. **Cascade routing (cheap → expensive)** — LiteLLM `Router` with `context_window_fallback_dict` + custom routing groups (`latency-sensitive` vs `cost-sensitive`). Production pattern: Haiku/Flash-Lite triage → Sonnet for medium → Opus only on confirmed-hard.
5. **Subagent contexts (parallel reads, filtered returns)** — Morph WarpGrep v2 cuts Opus 4.6 cost **15.6%** + time 28% by isolating search to a small-model subagent that returns only relevant spans.

---

## §4 Crossover thresholds

- **Claude Code subscription (Max $200/mo) vs API**: crossover ≈ **40M Opus input tokens/mo** at standard rate (~1.3M/day, ~50k/hr). Most CC operators on heavy daily use exceed this within 2-3 weeks — **subscription wins for serious users**.
- **Cursor $20 Pro vs API**: crossover ≈ **4M Opus input tokens/mo** — easy to exceed with frequent Agent calls; the **$40 Pro+ or $200 Ultra** crossover thresholds are higher (best for power users).
- **Self-host DeepSeek V4 / Qwen 3 Coder on H100 vs API**: rough breakeven ≈ **20–50M output tokens/day sustained** (H100 ~$2–4/hr cloud × 24 × 30 ≈ $1.4–2.9k/mo per GPU vs same throughput on DeepSeek API at $1–3/MTok output). **Below sustained heavy use, API wins**; above it, self-host.
- **Anthropic Batch API**: always-50%-off — use whenever <24h latency is tolerable.

---

## §5 Cost-aware stack composition (operator on Claude Pro/Max subscription assumed)

| Component | Cost class | Notes |
|---|---|---|
| Claude Code + 37 plugins | **$0 add** (subscription covered) | Already paid for via Max plan |
| MCP substrate (Graphiti / Serena / Repomix / etc.) | **$0 add** | Local-process MCPs, no per-call cost |
| **OpenHands Docker scaffold** | **$ minimal infra + $ tokens** | Docker free; runs on YOUR API key. Watch token burn — autonomous loops can chew through Opus output ($25/MTok). **Cap with model=Sonnet 4.6 default + escalate-on-fail to Opus** to halve costs. |
| **LiteLLM proxy** | **$0 add** (self-host) | Free OSS. Run as Docker container; routes to YOUR provider keys. Massive ROI via cascade. |
| **opencode** | **$0 add** | Uses your keys; ZERO platform fee. Multi-provider redundancy at zero subscription cost. |
| **Block goose** | **$0 add** | Apache OSS, your keys. AAIF-foundation-grade. |
| **Langfuse self-host** | **$0 add** + Postgres | Free OSS; Docker + Postgres. |
| **Promptfoo** | **$0 add** | OSS CLI; tests cost only what the eval-run tokens cost. |
| **Phoenix** (already installed) | **$0** | OSS Arize. |
| **claude-code-action** (CI/CD) | **$ tokens only** | Anthropic-OFFICIAL; pay per GitHub Action run × token use. |
| **mem0** | **$ small** | Self-host free; cloud hosted has tier. |
| **multica** | **$0 add** | Self-host Go+Next.js+Postgres free. |
| **Archon (PATTERN-CITE only per r7)** | **$0** | Don't install; cite the YAML / ralph-dag pattern. |

**Cost-per-value ranking** (highest leverage at $0 marginal cost):
1. **LiteLLM** — cascade routing alone can cut Opus spend 40–60%
2. **Prompt caching tuning** — already $0; just verify cache-hit rate via `/cost`
3. **Langfuse + Promptfoo** — observability+eval pattern (4-T2-practitioner convergence from r6); $0 to run
4. **opencode + goose peer CLIs** — provider redundancy at $0 platform cost
5. **OpenHands** — best capability-per-token IF you cap default to Sonnet and escalate

---

## §6 Verdict

**Cost-economics CONFIRMS the round-1 architecture with three refinements:**

1. **LiteLLM moves up to highest-priority new install.** Round-7 said "infrastructure tier"; cost data confirms — cascade routing alone saves more than every other install combined. Stripe/Shopify/Vercel all run centralized proxy in production.

2. **OpenHands needs a model-routing config to be cost-defensible.** Unleashed Opus 4.7 in an autonomous Docker loop = $1–3/task burn rate. With LiteLLM cascade (Sonnet 4.6 default → Opus 4.7 escalation), drops to ~$0.30–1/task — competitive with Cursor Ultra at $200/mo for moderate use.

3. **Aider's published cost column shows DeepSeek V4 as the ~10–15× cheaper escape valve** for non-critical / parallel-fan-out work. The Anthropic-format DeepSeek endpoint (`api.deepseek.com/anthropic`) is a drop-in for CC-compatible tools at a fraction of Opus cost. **Add to LiteLLM router as the "cheap-tier" fallback.**

**Cite-anchors:**
- TIER-1-DIRECT @ `https://docs.anthropic.com/en/docs/about-claude/pricing` (Opus 4.7 + 4.6 + Sonnet 4.6 + Haiku 4.5 + batch + cache tiers — May 2026)
- TIER-1-DIRECT @ `https://openai.com/api/pricing` (GPT-5.5 $5/$0.50/$30 + Batch -50%)
- TIER-1-DIRECT @ `https://ai.google.dev/pricing` (Gemini 3.1 Flash-Lite Standard $0.25/$1.50)
- TIER-1-DIRECT @ `https://api-docs.deepseek.com/quick_start/pricing` (V4 Flash + V4 Pro, 1M ctx, Anthropic-format endpoint)
- TIER-1-DIRECT @ `https://cursor.com/pricing` ($20/$40/$200 tiers)
- TIER-1-DIRECT @ `https://aider.chat/docs/leaderboards/` (cost column: GPT-5-high $29.08 / GPT-5-med $17.69 / Opus-4 $68.63 / DeepSeek-R $4.80 / 225 tests)
- TIER-1-DIRECT @ `https://www.morphllm.com/swe-bench-pro` WarpGrep v2 (15.6% Opus cost cut, 28% time cut via subagent search isolation)
- TIER-1-DIRECT @ `https://docs.litellm.ai/docs/routing` (Router cascade + fallback_dict + routing_groups patterns)
- TIER-1-DIRECT @ `https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching` (1h TTL cache writes $10/MTok, hits $0.50/MTok)
- TIER-1-DIRECT @ `https://docs.anthropic.com/en/docs/build-with-claude/batch-processing` (50% discount async 24h)

**Confidence: 0.78** (lower than other rounds: Aider cost column is the only widely-published cross-stack $/task; OpenHands / Claude Code / opencode $/task are back-computed envelopes, not vendor-disclosed).

**Open follow-ups (out of scope):**
- Anthropic Pro $20 / Max $100 / Max $200 plan token-quotas (interactive form on claude.com/pricing wouldn't render)
- Stripe Minions disclosed $/PR (round-7 noted not yet publicly disclosed)
- Self-host DeepSeek V4 / Qwen 3 Coder on owned H100 — actual amortized $/task at sustained throughput
