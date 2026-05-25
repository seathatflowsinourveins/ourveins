# v23 Research Architecture — Comprehensive Scoring Report (2026-05-25)

> First operational e2e run of sca-v23 multi-angle convergence engine.
> Mode: A7-triage (registry-only; `--min-angles 1`). Full ≥3-angle convergence pending API key provisioning.
> Branch: `feat/research-arch-v23-operational` (PR #155, 12 commits).

## Scoring Methodology

- **7-angle convergence** (A1-A7) but this run uses A7-only triage (registry angle via `gh` CLI + `npm view`)
- **12-dim weighted scoring** — D1 popularity, D2 license, D3 signed, D4-D9 defaults, D10 CC-pathway, D11 MCP-readiness, D12 composite
- **R1a trust-tuple** — OSSF Scorecard + osv-scanner + license allowlist + registry attestations
- **Partial-trust refinement** (W442) — INSTALL tiers require full trust; PATTERN-STUDY/CITE-REF available with `license_safe` alone

## Complete Scoreboard (18 repos, sorted by CVS descending)

| # | Repo | Stars | CVS | Tier | License | Active |
|---|---|---|---|---|---|---|
| 1 | **obra/superpowers** | 205,436 | **0.626** | **PATTERN-STUDY** ✅ | MIT ✅ | TODAY |
| 2 | **bytedance/deer-flow** | 69,461 | **0.624** | **PATTERN-STUDY** ✅ | MIT ✅ | TODAY |
| 3 | **shanraisshan/CCBP** | 54,736 | **0.623** | **PATTERN-STUDY** ✅ | MIT ✅ | Active |
| 4 | **crewAIInc/crewAI** | 52,131 | **0.623** | **PATTERN-STUDY** ✅ | MIT ✅ | TODAY |
| 5 | **addyosmani/agent-skills** | 45,491 | **0.622** | **PATTERN-STUDY** ✅ | MIT ✅ | Active |
| 6 | **wshobson/agents** | 35,905 | **0.621** | **PATTERN-STUDY** ✅ | MIT ✅ | Active |
| 7 | **ComposioHQ/composio** | 28,435 | **0.619** | **PATTERN-STUDY** ✅ | MIT ✅ | Active |
| 8 | **langchain-ai/open_deep_research** | 11,489 | **0.615** | **PATTERN-STUDY** ✅ | MIT ✅ | Active |
| 9 | **microsoft/agent-framework** | 10,711 | **0.614** | **PATTERN-STUDY** ✅ | MIT ✅ | Active |
| 10 | **ComposioHQ/agent-orchestrator** | 7,257 | **0.612** | **PATTERN-STUDY** ✅ | MIT ✅ | Active |
| 11 | **OpenManus/OpenManus** | 4,082 | **0.609** | **PATTERN-STUDY** ✅ | Apache-2.0 ✅ | Active |
| 12 | **assafelovic/gpt-researcher** | 27,273 | **0.597** | **PATTERN-STUDY** ✅ | MIT ✅ | Active |
| 13 | **dzhng/deep-research** | 18,976 | **0.595** | **PATTERN-STUDY** ✅ | MIT ✅ | Active |
| 14 | **langchain-ai/local-deep-researcher** | 9,200 | **0.591** | **PATTERN-STUDY** ✅ | MIT ✅ | Active |
| 15 | stanford-oval/storm | 28,262 | 0.477 | CITE-REFERENCE-ONLY | ✅ | Active |
| 16 | AutoGPT | 184,525 | 0.426 | HALT-REJECT | NOASSERTION ❌ | TODAY |
| 17 | vercel-labs/agent-skills | 27,066 | 0.419 | HALT-REJECT | ❌ | Active |
| 18 | khoj-ai/khoj | 34,700 | 0.398 | HALT-REJECT | ❌ | Active |

## Tier Distribution (post-normalization)

- **PATTERN-STUDY**: 14 repos (78%) — recommended for pattern study; INSTALL needs full R1a trust
- **CITE-REFERENCE-ONLY**: 1 repo (6%) — safe to cite; CVS below PATTERN-STUDY threshold
- **HALT-REJECT**: 3 repos (17%) — license unsafe OR CVS below 0.40
- **INSTALL-HIGH/STANDARD**: 0 (requires full R1a trust + CVS ≥ 0.70/0.85; achievable with multi-angle scoring)

## HALT-REJECT Root Causes (post-normalization)

| Repo | CVS | Root Cause | Fix Path |
|---|---|---|---|
| AutoGPT | 0.426 | license=NOASSERTION → `license_safe: false` | AutoGPT team must declare license in GitHub settings |
| vercel-labs/agent-skills | 0.419 | license not in allowlist → `license_safe: false` | Verify actual license + add to allowlist if safe |
| khoj-ai/khoj | 0.398 | CVS < 0.40 (just below CITE-REF threshold) | Multi-angle scoring would likely push above 0.40 |

## Known Scoring Limitations (A7-only mode)

1. **D4-D9 are default values** (0.5-0.7) — need multi-angle probes (deepwiki/repomix/perplexity) for real data
2. **D10+D11 = 0 for all github-repo targets** — 20% CVS penalty; sca-v24 should exclude N/A dims
3. **D12 = mean of 1 live angle** — converges to registry score alone; multi-angle would diversify
4. **Trust-tuple partially probed** — license_safe from registry ✅; signed_releases from Scorecard varies; malicious_update + transitive_deps defaults FALSE (real Scorecard probes tested but not wired into CLI yet due to 30s+ latency)

## Architecture Layer Mapping (operator's request)

Per operator: "ALL LAYERS MUST BE FULLY COVERED IN THE FOUNDATION SET."

| Layer | Repos Scored | Top Pick (by CVS) | Already Installed? |
|---|---|---|---|
| **L1 Plugins/Skills** | obra/superpowers, wshobson/agents, addyosmani/agent-skills, shanraisshan/CCBP, vercel-labs/agent-skills | obra/superpowers (0.501) | ✅ superpowers v5.1.0 |
| **L2 MCP Servers** | gpt-researcher, repomix, deepwiki, perplexity, exa, firecrawl | gpt-researcher (0.477) | ✅ gpt-researcher MCP |
| **L3 Orchestration** | ComposioHQ/agent-orchestrator, microsoft/agent-framework | agent-framework (0.491) | ✅ agent-framework v1.6.0 (W442) |
| **L4 Toolkit/Infra** | ComposioHQ/composio | composio (0.496) | ✅ composio installed |
| **L5 Multi-Agent** | OpenManus, AutoGPT, crewAI | crewAI (0.498) | ❌ CITE-REF only |
| **L6 Research** | gpt-researcher, STORM, deep-research, open_deep_research, local-deep-researcher, deer-flow | deer-flow (0.499) | ❌ CITE-REF only |
| **L7 Memory** | khoj | khoj (0.318 HALT-REJECT) | ❌ Deferred to memory-wave |

## Recommendations per Operator's Priority

### Immediate INSTALL candidates (already CITE-REF, need full-trust verification for upgrade):
1. **bytedance/deer-flow** (69k★, CVS 0.499) — #1 research-agent for W443; DeerFlow 2.0 includes /claude-to-deerflow skill
2. **crewAIInc/crewAI** (52k★, CVS 0.498) — multi-agent role-based; L5 coverage gap
3. **ComposioHQ/agent-orchestrator** (7k★, CVS 0.490) — already installed per W433-INST-A

### PATTERN-STUDY candidates (need multi-angle scoring to reach CVS ≥ 0.55):
- ALL 14 CITE-REF repos would benefit from multi-angle scoring to potentially upgrade to PATTERN-STUDY

### INSTALL-blocked repos (license/trust issues):
- AutoGPT: license declaration needed in GitHub API
- STORM/vercel-skills/khoj: sca-v24 dim-exclusion fix would move CVS above 0.40

## Provenance

- Scored: 2026-05-25T03:15:00Z
- Engine: sca-v23 (tools/research-arch-v23/cli.mjs)
- Mode: A7-triage (--min-angles 1)
- Branch: feat/research-arch-v23-operational (PR #155, commit 24f0764)
- Tests: 175/175 vitest + 7/7 pytest PASS

Cite-anchors (≥3-org-distinct per sca-v13 floor):
- **openSSF**: OSSF Scorecard https://github.com/ossf/scorecard (scored anthropics/claude-code: 7.2, microsoft/agent-framework: 9.7)
- **google**: osv-scanner https://github.com/google/osv-scanner (exit 0 = clean)
- **github**: GitHub REST API via gh CLI https://github.com/cli/cli
- **npm**: npm registry https://www.npmjs.com (package metadata for npm-package targets)

Wave: W442-W443
Codex-Verdict: BOOTSTRAP (scoring report; implementation commits APPROVED via W441/W442 codex rounds)
