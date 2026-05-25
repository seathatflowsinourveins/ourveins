# Phase 3 Expansion — v23 Scoring Summary

Wave: W443-SP1  
Scored: 2026-05-25  
Pipeline: sca-v23 (--min-angles 1 triage mode, 7 angles run)  
Angles executed per repo: A1_perplexity_sonar, A2_exa_neural_search, A3_firecrawl_structured_crawl, A4_tavily_curated_search, A5_cognition_deepwiki, A6_repomix_ingest, A7_authoritative_registry

## Results Table

| Repo | Stars | Forks | License | Last Push | CVS | Decision Tier |
|---|---|---|---|---|---|---|
| microsoft/autogen | 58,387 | 8,814 | CC-BY-4.0 | 2026-04-15 | 0.445 | HALT-REJECT |
| crewAIInc/crewAI | 52,171 | 7,236 | MIT | 2026-05-25 | 0.598 | PATTERN-STUDY |
| smtg-ai/claude-squad | 7,613 | 545 | AGPL-3.0 | 2026-05-18 | 0.450 | HALT-REJECT |
| automazeio/ccpm | 8,145 | 831 | MIT | 2026-03-18 | 0.545 | CITE-REFERENCE-ONLY |
| langchain-ai/langgraph | 32,918 | 5,567 | MIT | 2026-05-24 | 0.580 | PATTERN-STUDY |
| microsoft/semantic-kernel | 27,977 | 4,608 | MIT | 2026-05-19 | 0.594 | PATTERN-STUDY |

## Decision Tier Legend

| Tier | Meaning |
|---|---|
| HALT-REJECT | Score below adoption threshold; do not install or integrate |
| CITE-REFERENCE-ONLY | Reference for research only; do not install |
| PATTERN-STUDY | Study patterns and architecture; selective integration possible |

## Notable Findings

**microsoft/autogen (CVS 0.445 — HALT-REJECT)**  
License is CC-BY-4.0 (content license, not OSS software license) — atypical for a code library and a cardinal-rule-1 license-risk flag. Pushed 40 days ago; large community but license incompatibility blocks installation.

**crewAIInc/crewAI (CVS 0.598 — PATTERN-STUDY)**  
Highest scorer in this batch. Actively maintained (pushed same day as scoring), MIT license, 52k stars. Pattern-study tier — architecture review warranted before any integration decision.

**smtg-ai/claude-squad (CVS 0.450 — HALT-REJECT)**  
AGPL-3.0 license triggers cardinal-rule-1 case-by-case review; current verdict is halt. Claude-native orchestration use-case but license incompatibility with operator posture.

**automazeio/ccpm (CVS 0.545 — CITE-REFERENCE-ONLY)**  
MIT license, moderate stars. Last push 2026-03-18 (67 days stale at scoring time). Cite-reference appropriate — useful for pattern mining but maintenance velocity too low for adoption.

**langchain-ai/langgraph (CVS 0.580 — PATTERN-STUDY)**  
MIT, actively maintained, 33k stars. Strong graph-based agent orchestration patterns. Pattern-study: stateful multi-actor workflows relevant to W443 orchestration research.

**microsoft/semantic-kernel (CVS 0.594 — PATTERN-STUDY)**  
MIT, 28k stars, pushed 6 days before scoring. Microsoft-maintained semantic orchestration SDK. Near top of batch by CVS. Cross-language (C#/Python/Java) patterns worth extracting.

## Citations

- sca-v23 pipeline schema: `docs/architecture/SOTA-RESEARCH-ARCH-V23/DESIGN.md` + https://docs.anthropic.com/en/docs/claude-code/sub-agents (Anthropic)
- License risk assessment: cardinal-rule-1 per CLAUDE.md + https://slsa.dev/spec/v1.0/ (SLSA v1.0) + https://openssf.org/projects/scorecard/ (OpenSSF Scorecard)
- AGPL/proprietary license-risk criterion: CLAUDE.md cardinal-rule-1 §(b) + https://cyclonedx.org/specification/overview/ (CycloneDX SBOM) + https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-218.pdf (NIST SP 800-218 PW.7)
- Decision tier definitions: `docs/architecture/SOTA-RESEARCH-ARCH-V23/DESIGN.md` §verdict-tiers
- Maintenance staleness threshold (>30d): CLAUDE.md cardinal-rule-1 §(c) + https://slsa.dev/spec/v1.0/ malicious-update review criterion
- GitHub GraphQL data source: https://docs.github.com/en/graphql (GitHub GraphQL API, angle A7_authoritative_registry)
- OWASP license+dependency risk: https://owasp.org/Top10/A06_2021-Vulnerable_and_Outdated_Components/ (OWASP A06:2021)

## Verdict JSON Files

- `phase3-expansion/microsoft--autogen.json`
- `phase3-expansion/crewAIInc--crewAI.json`
- `phase3-expansion/smtg-ai--claude-squad.json`
- `phase3-expansion/automazeio--ccpm.json`
- `phase3-expansion/langchain-ai--langgraph.json`
- `phase3-expansion/microsoft--semantic-kernel.json`
