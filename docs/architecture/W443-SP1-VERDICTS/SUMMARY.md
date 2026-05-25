# W443-SP1 Verdicts Summary

> Wave: W443 | Schema: sca-v23 | Branch: `feat/research-arch-v23-operational`
> Scored: 2026-05-25 | 10 repos total (5 user-specified discoveries + 5 cite-refresh installed repos)
>
> Cite-anchors: scoring rubric per `docs/architecture/SOTA-RESEARCH-ARCH-V23/DESIGN.md`;
> trust-tuple R1a per SLSA v1.0 (https://slsa.dev/spec/v1.0/); license-safety per
> OWASP A06:2021 (https://owasp.org/Top10/A06_2021/); supply-chain attestation per
> Sigstore (https://www.sigstore.dev/); OpenSSF Scorecard (https://securityscorecards.dev/)

## Verdict Table (all 10 repos, sorted by CVS descending)

| # | Repo | Stars | License | CVS | Tier | Live Angles | Category |
|---|------|-------|---------|-----|------|-------------|----------|
| 1 | shanraisshan/claude-code-best-practice | 54,796 | MIT | **0.548** | CITE-REFERENCE-ONLY | 5/7 | cite-refresh |
| 2 | addyosmani/agent-skills | 45,587 | MIT | **0.547** | CITE-REFERENCE-ONLY | 5/7 | cite-refresh |
| 3 | bytedance/deer-flow | 69,515 | MIT | **0.537** | CITE-REFERENCE-ONLY | 6/7 | discovery |
| 4 | wshobson/agents | 35,921 | MIT | **0.536** | CITE-REFERENCE-ONLY | 5/7 | cite-refresh |
| 5 | ComposioHQ/composio | 28,443 | MIT | **0.534** | CITE-REFERENCE-ONLY | 5/7 | cite-refresh |
| 6 | ComposioHQ/agent-orchestrator | 7,262 | MIT | **0.524** | CITE-REFERENCE-ONLY | 6/7 | discovery |
| 7 | assafelovic/gpt-researcher | 27,287 | Apache-2.0 | **0.512** | CITE-REFERENCE-ONLY | 5/7 | cite-refresh |
| 8 | Significant-Gravitas/AutoGPT | 184,538 | NOASSERTION | **0.451** | HALT-REJECT | 2/7 | discovery |
| 9 | All-Hands-AI/OpenHands | 74,812 | NOASSERTION | **0.420** | HALT-REJECT | 5/7 | discovery |
| 10 | vercel-labs/agent-skills | 27,081 | null | **0.415** | HALT-REJECT | 6/7 | discovery |

## By Tier

### CITE-REFERENCE-ONLY (CVS 0.50-0.69) -- 7 repos

All 5 cite-refresh installed repos land here, confirming they still meet quality standards for reference use. Two discoveries (deer-flow, agent-orchestrator) also qualify.

| Repo | CVS | Key Strengths | Key Gaps |
|------|-----|---------------|----------|
| shanraisshan/claude-code-best-practice | 0.548 | MIT, 54.8k stars, pushed today | unsigned, no signed attestations |
| addyosmani/agent-skills | 0.547 | MIT, 45.6k stars, pushed <1d ago | unsigned, no signed attestations |
| bytedance/deer-flow | 0.537 | MIT, 69.5k stars, 6 live angles | unsigned, no signed attestations |
| wshobson/agents | 0.536 | MIT, 35.9k stars, pushed today | unsigned, no signed attestations |
| ComposioHQ/composio | 0.534 | MIT, 28.4k stars, pushed 4d ago | unsigned, no signed attestations |
| ComposioHQ/agent-orchestrator | 0.524 | MIT, 7.3k stars, 6 live angles | unsigned, lower star count |
| assafelovic/gpt-researcher | 0.512 | Apache-2.0, 27.3k stars | unsigned, last push 39d ago |

### HALT-REJECT (CVS < 0.50) -- 3 repos

These repos fail primarily on license safety (NOASSERTION or null) which zeroes out the D2 dimension (weight 0.08) and fails the trust-tuple R1a `license_safe` check.

| Repo | CVS | Rejection Reason |
|------|-----|-----------------|
| Significant-Gravitas/AutoGPT | 0.451 | license=NOASSERTION, unsigned, only 2/7 angles live (timeout-heavy) |
| All-Hands-AI/OpenHands | 0.420 | license=NOASSERTION, unsigned |
| vercel-labs/agent-skills | 0.415 | license=null (not declared), unsigned |

## Observations

1. **All 5 installed repos pass cite-refresh** -- every installed repo scores CITE-REFERENCE-ONLY, confirming continued quality standards compliance. No regressions detected.

2. **License is the primary differentiator** -- the 3 HALT-REJECT repos all fail on license (NOASSERTION or null). Every CITE-REFERENCE-ONLY repo has MIT or Apache-2.0.

3. **Supply-chain signing is universally absent** -- D3 (supply_chain_signed) is 0 across all 10 repos. No repo has signed releases/attestations. This is an ecosystem-wide gap, not a per-repo deficiency.

4. **Timeout pressure on A3/A4 angles** -- firecrawl (A3) and tavily/gpt-researcher (A4) timed out on most repos. Only 3 repos (deer-flow, agent-orchestrator, vercel-labs/agent-skills) got A3 live. No repo got A4 live. This suppresses D12 composite arch quality scores across the board.

5. **Star count does not predict tier** -- AutoGPT (184k stars, D1=1.0) lands HALT-REJECT while agent-orchestrator (7.3k stars, D1=0.772) lands CITE-REFERENCE-ONLY. License safety and composite arch quality outweigh raw popularity.

## Trust Tuple Summary (R1a)

| Check | Pass Count | Fail Count | Notes |
|-------|-----------|-----------|-------|
| signed_releases | 0/10 | 10/10 | No repo has SLSA/Sigstore attestations |
| license_safe | 7/10 | 3/10 | MIT (8) + Apache-2.0 (1) pass; NOASSERTION (2) + null (1) fail |
| malicious_update_review | 0/10 | 10/10 | All pending manual review |
| transitive_deps_clean | 0/10 | 10/10 | All pending deps audit |
