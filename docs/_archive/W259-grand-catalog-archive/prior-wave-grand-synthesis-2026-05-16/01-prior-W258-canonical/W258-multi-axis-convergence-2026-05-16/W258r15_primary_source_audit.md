# W258r15 - Primary-Source SOTA-Claim Audit

> Auditor: sota-researcher (Claude Opus 4.7 [1m]) | Date: 2026-05-16 | Protocol: 5-phase primary-source verification + adversarial skepticism
> Output authority class: TIER-3-LOCAL-COMPOSITION per Z:/claude-sota/.claude/rules/citation-discipline.md rule #8
> Constituents: TIER-1 GitHub API + TIER-1 SWE-bench leaderboard JSON + TIER-1 stripe.dev official blog + TIER-1 linuxfoundation.org press + TIER-2 named-T2 podcast (Steve Kaliski, Stripe engineer)
> Skeptical posture: prior 7 rounds may have been credulous; this audit deliberately seeks REFUTING evidence.

---

## Verdict Matrix

| Claim | Verdict | Confidence |
|---|---|---|
| 1. OpenHands+CodeAct v3 on Opus 4.6 = 68.4% SWE-bench Verified | **REFUTED** | 0.95 |
| 2. MCP universal substrate at 8/10 production orgs | **REVISED** | 0.65 |
| 3. Goose donated to AAIF Linux Foundation Dec 2025 | **VERIFIED** | 0.99 |
| 4. Stripe Minions 1,300 PRs/week | **VERIFIED w/ caveat** | 0.92 |
| 5. opencode 161k stars (sst -> anomalyco) | **VERIFIED** | 0.99 |
| 6. Claude Code dominant production driver | **VERIFIED sentiment** | 0.78 |

---

## Claim 1: OpenHands 68.4% on Opus 4.6 - REFUTED (conf 0.95)

Primary source: swebench.com embedded script id=leaderboard-data JSON (4.2MB HTML, 180 entries in Verified leaderboard), retrieved 2026-05-16.

Top OpenHands-family entries by resolved score:

| resolved | name | date |
|---|---|---|
| 73.8 | Salesforce AI Research SAGE (OpenHands) | 2025-11-03 |
| 71.8 | OpenHands + GPT-5 | 2025-08-07 |
| 70.4 | OpenHands + Claude 4 Sonnet | 2025-05-24 |
| 69.6 | OpenHands + Qwen3-Coder-480B-A35B-Instruct | 2025-08-05 |
| 65.8 | OpenHands | 2025-04-15 |
| 53.0 | OpenHands + CodeAct v2.1 (claude-3-5-sonnet-20241022) | 2024-10-29 |

Top Augment-family entries:

| resolved | name | date |
|---|---|---|
| 70.4 | Augment Agent v1 | 2025-06-10 |
| 65.4 | Augment Agent v0 | 2025-03-16 |

Three independent disqualifications of the 68.4% claim:
1. No row matches OpenHands + Opus 4.6, and no row has resolved == 68.4.
2. String CodeAct v3 does NOT appear anywhere; only CodeAct v2.1 (resolved=53.0).
3. The only Opus 4.6 entry is mini-SWE-agent + Claude Opus 4.6 at 75.6 (2026-02-17) - a DIFFERENT agent harness.

Closest 68.x entries are non-OpenHands: Nemotron-CORTEXA 68.2 (2025-05-16) and GLM-4.6 68.2 (2025-09-30).

Re-anchored SOTA on SWE-bench Verified (top 5, 2026-05-16):
1. 79.2 - live-SWE-agent + Claude 4.5 Opus medium (2025-12-15)
2. 79.2 - Sonar Foundation Agent + Claude 4.5 Opus (2025-12-05)
3. 78.8 - TRAE + Doubao-Seed-Code (2025-09-28)
4. 77.4 - live-SWE-agent + Gemini 3 Pro Preview (2025-11-20)
5. 76.8 - mini-SWE-agent + Claude 4.5 Opus (high reasoning) (2026-02-17)

Implication: OpenHands is NOT SOTA scaffold on Verified. Top OpenHands entry (Salesforce SAGE) is rank ~25 of 180. SOTA-grade open scaffolds are live-SWE-agent and mini-SWE-agent.

---

## Claim 2: MCP at 8/10 production orgs - REVISED (conf 0.65)

Verifiable named orgs with MCP production deployment (primary-source-grade):

| Org | Primary-source evidence | Verdict |
|---|---|---|
| Anthropic | Founded MCP; donated to AAIF 2025-12-09 | VERIFIED |
| OpenAI | Shipped MCP support; AGENTS.md AAIF co-donation | VERIFIED |
| Microsoft | AAIF platinum member; named in MCP support list | VERIFIED |
| Google | AAIF platinum; UCP at NRF with MCP transport | VERIFIED |
| AWS | AAIF platinum; Class-A MCP server provider | VERIFIED |
| Cloudflare | Official MCP docs at developers.cloudflare.com/agents | VERIFIED |
| Vercel | First-party MCP platform templates (18% of registry) | VERIFIED |
| Stripe | Class-A MCP server provider | VERIFIED |
| Shopify | UCP partner with MCP transport | PARTIAL |
| Bloomberg | AAIF platinum member only; no engineering disclosure | PARTIAL |

Verdict: 8/10 is DIRECTIONALLY CORRECT but UNVERIFIABLE as a precise count. >=8 verifiable; 10 is arbitrary denominator. Downgrade to: MCP has crossed production-adoption threshold at all top-tier AI-infrastructure orgs (n>=8 verifiable).

---

## Claim 3: Goose donated to AAIF Dec 2025 - VERIFIED (conf 0.99)

Primary source: linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation - dated 2025-12-09.

Verbatim quote: Developed and contributed by Block, the company behind Square, Cash App, Afterpay, TIDAL and a growing ecosystem of bitcoin projects, goose provides the practical infrastructure needed to advance agentic AI safely and consistently.

Verbatim quote from Manik Surtani (Block, Head of Open Source): goose was our first step; establishing the AAIF and contributing goose to it ensures that agent...

Live-runtime corroboration (2026-05-16):
- GitHub API api.github.com/repos/block/goose -> redirects to aaif-goose/goose (HTTP rename complete; 45,271 stars, 4,642 forks, pushed_at 2026-05-15T22:46:50Z)
- AAIF founding three: MCP (Anthropic) + goose (Block) + AGENTS.md (OpenAI)
- AAIF platinum: AWS, Anthropic, Block, Bloomberg, Cloudflare, Google, Microsoft, OpenAI

---

## Claim 4: Stripe Minions 1,300 PRs/week - VERIFIED w/ caveat (conf 0.92)

Stripe-official primary source: stripe.dev/blog/minions-stripes-one-shot-end-to-end-coding-agents (fetched 2026-05-16).

Stripe blog verbatim (from page metadata + body):
- Minions are Stripe homegrown coding agents, responsible for more than a thousand pull requests merged each week.
- The core agent loop runs on a fork of Block coding agent goose, one of the first widely used coding agents, which we forked early on.

Caveat: Stripe OWN blog says more than a thousand - NOT 1,300 specifically. The 1,300 figure comes from:
- Lenny Newsletter How I AI podcast with Steve Kaliski (named Stripe engineer) - primary-source-grade
- ByteByteGo blog How Stripe Minions Ship 1300 PRs a Week (2026-03-16) - secondary
- InfoQ 2026-03 - secondary

Critical implication: Stripe Minions is a FORK OF GOOSE (Stripe-confirmed in their own blog text). This makes goose AAIF/LF donation a production-validated agent harness with at-scale deployment evidence.

---

## Claim 5: opencode 161k stars, sst -> anomalyco - VERIFIED (conf 0.99)

Primary source: GitHub API api.github.com/repos/sst/opencode redirects (HTTP 200, final URL api.github.com/repositories/975734319), retrieved 2026-05-16.

Verbatim from live GitHub API response:
- full_name: anomalyco/opencode
- description: The open source coding agent.
- stargazers_count: 160923
- forks_count: 18885
- archived: false
- pushed_at: 2026-05-16T05:44:45Z

Cross-verification: HN id 46552218 thread (has opencode repo moved organisation from under sst to anomalyco?) confirms rename surfaced on Hacker News. Redirects work transparently.

Verdict: 161k matches 160,923 exactly (rounded). Owner = anomalyco (formerly sst).

---

## Claim 6: Claude Code dominant production driver - VERIFIED sentiment-grade (conf 0.78)

Named enterprise production deployments (engineering coverage):

| Org | Deployment scale | Date |
|---|---|---|
| Stripe | 1,370 engineers | 2026-03 |
| Ramp | 80% incident-investigation time cut | 2026-03 |
| Wiz | 50,000-line Python->Go migration in ~20h | 2026-03 |
| Rakuten | 24 -> 5 working days delivery time | 2026-03 |
| Unnamed team | 10,000-line Scala->Java migration in 4 days | 2026-03 |

Verdict: VERIFIED at sentiment-grade. >=5 named deployments. Confidence 0.78 - downgrade applied: secondary engineering blogs (devops.dev, truefoundry.com) are NOT first-party engineering blogs from deploying orgs. Recommend re-verifying each named deployment against the deploying-org own engineering blog before treating any single number as load-bearing.

---

## 4-Axis Harness-Fit Verification

| Pick | Axis 1 SOTA-anchored | Axis 2 Production-validated | Axis 3 Substrate-level | Axis 4 Cardinal-rules-aligned |
|---|---|---|---|---|
| Claude Code CLI + plugins | YES (Stripe + Ramp + Wiz + Rakuten) | YES | YES (plugins ecosystem) | YES |
| MCP | YES (78% enterprise adoption) | YES (n>=8 orgs) | YES (substrate primitive, AAIF/LF) | YES |
| OpenHands + CodeAct | **NO** (top 73.8 = rank ~25 of 180) | PARTIAL (SAGE = research fork) | NO (scaffold, not substrate) | YES |
| LiteLLM | UNVERIFIED (flag for r16) | UNVERIFIED | YES (proxy) | YES |
| opencode | YES (161k stars) | PARTIAL (no Stripe/Ramp-class case) | NO (CLI peer) | YES |
| Block goose | YES (AAIF/LF co-donation) | YES (Stripe Minions fork -> 1,300 PRs/wk) | PARTIAL (scaffold + foundation governance) | YES |

Revised top 5 for W258 architecture (post-audit):
1. Claude Code CLI + plugins - driver/orchestrator (VERIFIED 4/4 axes)
2. MCP - universal substrate (VERIFIED 4/4 axes; AAIF/LF governed)
3. Block goose - production-validated scaffold (Stripe Minions = primary validation; AAIF/LF governed)
4. opencode - peer alternative CLI (community popularity validated; not substrate)
5. LiteLLM - flag for re-verification round 16

Demoted: OpenHands + CodeAct v3 - from best-open-scaffold to research-grade-scaffold, not Verified-leaderboard top-tier. If user needs an open SOTA scaffold, recommend live-SWE-agent (#1-tied 79.2 on Verified) or mini-SWE-agent + Claude Opus 4.5/4.6 (75.6-76.8).

---

## Retractions / Required Corrections to Prior W258 Rounds

1. DROP the OpenHands + CodeAct v3 = 68.4 on Opus 4.6 load-bearing fact. Replace with: OpenHands top Verified entry: 73.8 (Salesforce SAGE fork, 2025-11-03). SOTA scaffolds on Verified are live-SWE-agent + Claude 4.5 Opus (79.2) and mini-SWE-agent + Claude Opus 4.6 (75.6).
2. DROP the Augment 72.0 comparison. Actual: 70.4 (Augment Agent v1, 2025-06-10).
3. REVISE 8/10 production orgs -> n>=8 verifiable top-tier orgs with documented MCP-in-production deployment.
4. CONFIRM goose donation date as 2025-12-09 (not Dec 2025 alone).
5. CONFIRM Stripe Minions blog says more than a thousand; 1,300 figure is from named Stripe engineer podcast.
6. CONFIRM opencode owner is anomalyco, not sst. 160,923 stars on 2026-05-16.

---

## Honest Conclusion

The W258 convergence summary was 5/6 directionally correct but contained one critical fabrication (Claim 1 OpenHands 68.4%) and one inflated specificity (Claim 2 8/10). The other 4 claims are VERIFIED with high confidence. Architecture recommendation should be revised to drop OpenHands as the SOTA scaffold reference and use live-SWE-agent or mini-SWE-agent instead. Goose production validation via Stripe Minions fork is now a STRONGER load-bearing argument than previously credited.

## Cite ledger

- TIER-1-DIRECT: swebench.com leaderboard JSON (script id=leaderboard-data, retrieved 2026-05-16), GitHub API live (sst/opencode -> anomalyco; block/goose -> aaif-goose; OpenHands/OpenHands), stripe.dev/blog/minions-*, linuxfoundation.org/press/* (dated 2025-12-09), Anthropic news/donating-the-model-context-protocol
- TIER-2 named-T2: Lenny Newsletter How I AI podcast with Steve Kaliski (named Stripe engineer)
- TIER-2 secondary: blog.devops.dev (Claude Code enterprise deployments naming Stripe/Ramp/Wiz/Rakuten), digitalapplied.com (MCP stats), zuplo.com/mcp-report
- TIER-3 (flagged as origin-of-error for 68.4%): awesomeagents.ai, codeant.ai, marc0.dev