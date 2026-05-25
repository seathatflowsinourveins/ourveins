# W434-L5-COVERAGE — Landscape entry

> Companion to `ADR-L5-COVERAGE-VERDICT.md`. Records the L5-multi-agent-harness layer landscape as of 2026-05-24.

## L5 layer status: FULLY COVERED via in-runtime infrastructure

| Component | Source | Anchor |
|---|---|---|
| **Anthropic native sub-agents** | First-party CLI primitive | `https://docs.anthropic.com/en/docs/claude-code/sub-agents` + `https://code.claude.com/docs/en/sub-agents` |
| **`CLAUDE_CODE_FORK_SUBAGENT=1`** | First-party CLI env var | CLAUDE.local.md §(e) |
| **`agent-teams` plugin preset** | claude-plugins-official (installed) | `/team-spawn research\|security\|review\|debug\|feature\|fullstack\|migration` |
| **`superpowers:dispatching-parallel-agents`** | obra/superpowers (installed) | cite-anchor: Anthropic claude-cookbooks @39a350b6 `research_lead_agent.md:135-137` `<use_parallel_tool_calls>` MUST-block |
| **`dispatching-parallel-agents-w321-fork`** | local vendor-fork (installed) | adds skeleton-first-write + context-budget hard-cap + stream-error retry + subagent_type pre-flight validation |
| **`mcp-agent-patterns` local skill** | local skill | encodes 5 reusable agentic workflow patterns (Router, ParallelLLM, Orchestrator, Evaluator-Optimizer, MCPAggregator) extracted from lastmile-ai/mcp-agent (8.2k stars MIT) |
| **W433-INST-B OpenHands cite-ref-only** | external landscape anchor | PR #128 commit `be0912e`; SWE-bench Verified 72-77.6%; MLSys 2026 paper arXiv 2511.03690 |

## L5 candidates surveyed (NOT installed)

| Candidate | Stars (2026-05-24) | Verdict | Primary blocker |
|---|---|---|---|
| bytedance/deer-flow | 69,415 | REJECT | R1(a) signed-releases FAIL (no PyPI, unsigned git tags) + R1(c) ByteDance/PRC supply-chain premium |
| microsoft/agent-framework (MAF) | 10,700 | REJECT | R1(a) signed-releases FAIL (PyPI `has_provenance: False` on both `agent-framework` and `agent-framework-core` v1.6.0; no SLSA-L3 attestations) |
| crewAIInc/crewAI | 52,107 | REJECT | R1(a) signed-releases FAIL (PyPI `has_provenance: False`) + R1(c) single-Owner PyPI publish-key risk |
| microsoft/autogen | 58,361 | HARD-REJECT | upstream-declared maintenance-mode; successor = MAF |
| Significant-Gravitas/AutoGPT | 184,514 | HARD-REJECT | R1(b) PolyForm Shield 1.0.0 in `autogpt_platform/` (noncompete clause) — identical blocker to OpenHands W433-INST-B `enterprise/LICENSE` |
| FoundationAgents/OpenManus | 56,366 | REJECT | R1(c) staleness — last push 2026-02-11 (3+ months) |
| SWE-agent/SWE-agent | 19,290 | OUT-OF-SCOPE | SWE-research-tool, not general L5 harness |
| Aider-AI/aider | 45,246 | OUT-OF-SCOPE | CLI coding tool, not multi-agent harness |
| microsoft/UFO | 8,743 | OUT-OF-SCOPE | Windows-OS-agent specialty, not general L5 harness |

## Systemic finding

**Cryptographically signed L5 multi-agent harnesses do not yet exist in mainstream open-source as of 2026-05.** This is an industry-wide gap. The R1(a) signed-releases gate (per CLAUDE.md cardinal-rule-1 / W331 axis-1 #3) blocks all 9 surveyed candidates.

Re-probe triggers documented in ADR §9. Most likely first-to-ship-SLSA-L3: Microsoft Agent Framework (MAF), given Microsoft's enterprise SBOM/attestation tooling investment in 2025-2026.

## Distinct cite-anchor organizations (≥3 per sca-v18 / W352-S9 sca-v13 3-org floor)

1. **GitHub** — `https://github.com/bytedance/deer-flow` + `https://github.com/microsoft/agent-framework` + `https://github.com/crewAIInc/crewAI` + `https://github.com/microsoft/autogen` + `https://github.com/Significant-Gravitas/AutoGPT` + `https://github.com/FoundationAgents/OpenManus` + `https://github.com/SWE-agent/SWE-agent` + `https://github.com/Aider-AI/aider` + `https://github.com/microsoft/UFO` repo metadata + security-advisories endpoint probes
2. **PyPI** — `https://pypi.org/pypi/agent-framework-core/1.6.0/json` + `https://pypi.org/pypi/crewai/1.14.5/json` + `https://pypi.org/pypi/autogen-agentchat/json` PEP-740 attestation field `has_provenance` probes
3. **PolyForm Project** — `https://polyformproject.org/licenses/shield/1.0.0` (AutoGPT `autogpt_platform/` license carve-out)
4. **Microsoft Learn** — `https://learn.microsoft.com/en-us/agent-framework/migration-guide/from-autogen/` AutoGen → MAF migration guide
5. **ByteDance Volcengine** — `https://deerflow.tech` + `https://trendshift.io/repositories/14699` DeerFlow #1 GitHub Trending Feb 28 2026
6. **SLSA / OpenSSF** — `https://slsa.dev/spec/v1.0/` SLSA L3 spec + `https://peps.python.org/pep-0740/` PEP-740 PyPI digital attestations + `https://docs.github.com/en/actions/security-guides/using-artifact-attestations-to-establish-provenance-for-builds` GitHub artifact-attestation docs
7. **Anthropic** — `https://docs.anthropic.com/en/docs/claude-code/sub-agents` + `https://code.claude.com/docs/en/sub-agents` + `https://code.claude.com/docs/en/plugins` cardinal-rule-1 trust-tuple W331 axis-1 #3
8. **lastmile-ai** — `https://github.com/lastmile-ai/mcp-agent` 8.2k stars MIT, source for local `mcp-agent-patterns` skill

Total: **8 distinct orgs ≥ 3** ✓ (sca-v13 floor satisfied per W352-S9 + sca-v18 cite-floor satisfied per cardinal-rule-6)
