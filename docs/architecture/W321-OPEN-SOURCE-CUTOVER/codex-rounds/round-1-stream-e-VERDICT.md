VERDICT: NEEDS-REVISION

position_swap_stable: true

## Per-Criterion Assessment

1. Capability-parity matrix vs commercial: PASS - Section 5 and Section 7 directly document the Perplexity Sonar reasoning-depth gap, Exa neural-rank gap, and Firecrawl Fire-engine anti-bot gap instead of burying them.

2. LearningCircuit/local-deep-research 95% SimpleQA claim: FAIL - Section 2.4.2 states "95% SimpleQA", but the artifact does not provide the required independent benchmark, arXiv, benchmarking-org, or practitioner field-report citation.

3. Cost analysis and maintenance realism: FAIL - commercial math is plausible, but "~$11/mo electricity only" and "$132/yr" are too low for an RTX 4090-class always-on stack, and maintenance estimates conflict between "~30 min/month", "2-4 hrs/mo", and "~36 hrs ops".

4. Stage-0 existence-probe applied per W316 Delta-33: WARN - Section 9.1 lists real GitHub URLs and "deepwiki verified" status for the six primary repos, but no explicit W316 Delta-33 Stage-0 probe table, timestamp, HEAD/release, or method is recorded.

5. Path-B HYBRID cutover sequencing: WARN - W321-W325 sequencing is directionally realistic with fallback, but "LOW" risk under-states the operational complexity of SearXNG + crawler(s) + Perplexica + gpt-researcher + local LLM + MCP shims.

6. Anti-newshiny-bias / commercial wins: PASS - Section 7 explicitly says "Open-source IS NOT a panacea" and documents cases where Perplexity, Exa, Firecrawl-cloud, and cloud frontier models still win.

7. License compatibility / AGPL-3 implications: FAIL - the artifact partially notes HTTP/MCP isolation, but Section 3.3 miscounts AGPL as only Firecrawl despite SearXNG also being AGPL-3 and lacks a formal no-vendoring/no-import/no-linking AGPL boundary policy.

## Key Findings

1. The local-deep-research 95% SimpleQA claim is treated as a quality signal but is not independently grounded; README/project-source evidence is insufficient for this extraordinary claim.

2. The self-hosted cost model undercounts electricity: the artifact models burst inference, while an RTX 4090-class 24/7 system at typical ~500W load is closer to 360 kWh/month, about $43/month at $0.12/kWh before other overhead.

3. AGPL-3 risk is under-weighted: Firecrawl and SearXNG are both AGPL-3, and the artifact needs an explicit service-boundary policy before recommending integration into CC plugin/MCP hook surfaces.

## Recommended Actions

1. Downgrade the LearningCircuit/local-deep-research 95% SimpleQA claim to UNVERIFIED unless an independent benchmark/practitioner source is added.

2. Recompute cost with whole-host idle/load electricity assumptions, separate burst inference from 24/7 baseline, and reconcile all setup/maintenance estimates into one conservative operating model.

3. Add a Stage-0/W316 Delta-33 probe table for the six primary repos with URL, probe method, timestamp, release/HEAD, license observed, and result.

4. Add an AGPL compliance section that permits only separate-process/container HTTP access, forbids vendoring/importing/linking AGPL code into CC hooks/plugins/shims, and tracks modified AGPL service source obligations.

5. Revise Path-B risk from LOW to MODERATE and choose one primary crawler for W323 unless an explicit A/B test requires running both Crawl4AI and Firecrawl-self-host.
