# W258r31 — 2026-Q2 Frontier Scan (post-2026-05-16 cutoff)

**Cutoff date = today (2026-05-16).** Delta is hours, not weeks. Yet a few material items emerged that revise W258 v2.

## §1 Model releases (April–May 2026)

| Date | Provider | Release | Significance vs W258 v2 |
|---|---|---|---|
| 2026-04-23 | OpenAI | **GPT-5.5** (smartest+most intuitive) | Already in v2 r18 — confirmed |
| 2026-05-05 | OpenAI | **GPT-5.5 Instant** (replaces 5.3 Instant as ChatGPT default) | Tier shift — v2 cascade should note 5.5 Instant tier |
| 2026-05-07 | OpenAI | **GPT-5.5-Cyber** (limited cybersecurity variant) | Niche; watchlist only |
| 2026-05-16 | OpenAI | ChatGPT for personal finance (bank-account connect) | Out of W258 scope |
| (status) | OpenAI | **GPT-6 NOT released**; Polymarket 10% by Jun / 55% Sep / 82% Dec 2026 | v2 still-current on model frontier |

## §2 Agent runtime releases (Claude Code May 2026)

CC May 2026 updates ALL operator-relevant:
- **Plugin dependency enforcement** in `claude plugin disable/enable` (operator has 37 plugins)
- **`worktree.bgIsolation: "none"`** setting for repos where worktrees impractical
- **Projected context cost** added to /plugin marketplace browse pane
- **PowerShell tool default-enabled on Windows** (Bedrock/Vertex/Foundry) — operator runs PowerShell on Z:-portable
- **Fast mode now Opus 4.7 default** (was 4.6) — affects operator's `/fast` workflow

## §3 Conference signal — biggest 2026-Q2 announcement

**Code with Claude 2026 (May 6) — Anthropic's annual developer keynote** — **5 NEW Anthropic-OFFICIAL primitives W258 did NOT cover:**

1. **Remote Agents** — competes with OpenHands sandbox role (L5)
2. **Claude Code Routines** — competes with Archon pattern-cite role (L6)
3. **Managed-agent multi-agent orchestration** — Anthropic-native version of claude-flow attempted role
4. **Advisor tool** (new)
5. **CI auto-fix** capabilities

These deserve **v3 addendum** — W258 v2 missed an Anthropic-OFFICIAL primitive set released 10 days before cutoff.

## §4 Benchmark deltas — anything beats Live-SWE-agent 79.2%?

**CRITICAL — VALIDATES codex audit's benchmark-contamination caveat:**
> "OpenAI has stopped reporting Verified scores due to confirmed contamination — 59.4% of hard tasks have flawed tests. OpenAI + Anthropic now recommend **SWE-Bench Pro** instead."

Top SWE-bench Verified scores (now contaminated): GPT-5.5 88.7% / Opus 4.7 87.6% / GPT-5.3-Codex 85.0%. **These are model+harness pairings** — Live-SWE-agent 79.2% from W258r8/r15 is the highest-cited *OSS scaffold*, not directly displaced. SWE-Bench Pro is the new SOTA bench.

## §5 Funding / M&A signal (architecture-irrelevant but ecosystem)

- Salesforce acquired **Convergence.ai** May 15 (Agentforce integration) — closed-source consolidation
- Gumloop $50M Series B (no-code agent platform); Wonderful $150M ($2B val); Sett $30M
- Validates r11 market signal: agent infra continues to attract major capital

## §6 Verdict — **NEEDS-MINOR-REFRESH**

**W258 v2 is mostly-current** but should land a **v2.1 addendum** covering:

1. **Anthropic's Code with Claude 2026 announcements** — add Remote Agents / Claude Code Routines / Managed-agent orchestration / Advisor tool / CI auto-fix to L3-L6 layers (could displace or complement W258 picks)
2. **GPT-5.5 Instant** as new tier in the LiteLLM cascade
3. **SWE-Bench Pro as the new canonical benchmark** — validates codex audit's contamination caveat; v2 should de-emphasize Verified
4. **Claude Code May 2026 update notes** — operator-relevant (PowerShell default-on Windows, Opus 4.7 fast-mode, worktree bg isolation, plugin dep enforcement)

No architectural overhaul needed; v2.1 addendum is the right scope.

## Sources

- [Code with Claude 2026 May 6 readiness field guide](https://www.contextstudios.ai/blog/code-with-claude-the-may-6-readiness-field-guide)
- [Why Anthropic skipped a new model at Code with Claude 2026](https://www.pravinkumar.co/blog/code-with-claude-2026-no-new-model)
- [Claude Code Updates by Anthropic — May 2026](https://releasebot.io/updates/anthropic/claude-code)
- [Anthropic news (May 2026)](https://www.anthropic.com/news)
- [OpenAI GPT-5.5 Instant May 5 2026](https://openai.com/index/gpt-5-5-instant/)
- [TechCrunch GPT-5.5 Instant default rollout](https://techcrunch.com/2026/05/05/openai-releases-gpt-5-5-instant-a-new-default-model-for-chatgpt/)
- [TechCrunch GPT-5.5 launch April 23](https://techcrunch.com/2026/04/23/openai-chatgpt-gpt-5-5-ai-model-superapp/)
- [SWE-Bench leaderboard May 2026 marc0.dev](https://www.marc0.dev/en/leaderboard)
- [SWE-Bench Pro Morph (contamination context)](https://www.morphllm.com/swe-bench-pro)
- [SWE-Bench Verified contamination explanation BenchLM](https://benchlm.ai/benchmarks/sweVerified)
- [Wonderful Series B $150M $2B val](https://techcrunch.com/2026/03/12/wonderful-raises-150m-series-b-at-2b-valuation/)
- [Gumloop $50M Series B](https://www.indexbox.io/blog/gumloop-secures-50m-series-b-funding-led-by-benchmark-to-expand-ai-agent-platform/)
- [Salesforce acquires Convergence.ai May 15](https://www.digitalcommerce360.com/2025/05/16/salesforce-to-acquire-convergence-ai-agentforce/)
- [Anthropic Gates Foundation partnership](https://www.anthropic.com/news/gates-foundation-partnership)
- [Aider vs OpenCode vs Claude Code 2026 comparison](https://sanj.dev/post/comparing-ai-cli-coding-assistants)
