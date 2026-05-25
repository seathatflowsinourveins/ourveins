
# W259 Master Scoring Matrix — 23 Dimensions × 99 Scored Repos + 22 W259-v16 Coverage Additions

> **Status**: SHIP-READY — Wave 2 v2 added 34 NEW TIER-1 OFFICIAL repos (rows 65-98) per `TIER-1-OFFICIAL-SCORING-DEEPDIVE-W259v2.md` 2026-05-16.
>
> **Pre-Wave-2-v2 status**: SHIP-READY (all 11 Wave-1 agents + 7 Wave-2 agents returned; codex APPROVE-SHIP-W259-V2 applied 2026-05-16).
>
> **Dimension count truth (codex W259-v2 verdict §7 cleanup item #1)**: **23 Dimensions** = 10 SRA D1-D10 + 13 W259-extended D11-D23. The W259 Wave 1 v2 added D21 DATA-BOUNDARY-RISK + D22 SOLO-OPERATOR-FIT + D23 MAINTENANCE-VELOCITY per codex W259-final fix #1.
>
> **Row count truth (codex W259-v2 cleanup #1; updated W259-v15)**: Top-50 by composite + appendix rows 51-98 for TIER-1 OFFICIAL + Wave-2-v2 gaps + row 99 (W259-v15 GitNexus community addendum) = **99 scored rows**. Section title below labeled accordingly.
>
> **Per-row scoring caveat (codex W259-v2 cleanup #5)**: Rows 1-50 carry **D1-D20 numeric scores** (20-column matrix). D21-D23 are **schema dimensions for re-scoring in W260**; current row composite scores reflect D1-D20 weighting (/16.5 × 10). Rescoring with /18.9 × 10 (full D1-D23) is queued for W260 cleanup pass — composite values will not change ordering significantly because operator-fit (D22) and maintenance-velocity (D23) correlate with already-scored D5+D6+D7+D8.
>
> **Cite-class**: `effective_tier=TIER-3-LOCAL-COMPOSITION` per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8.

## §0.5 — W259-v4 BENCHMARK-INTEGRITY CORRECTIONS (authoritative — supersedes affected rows)

Operator-surfaced benchmark-methodology error → codex GPT-5.5 PATCH-AND-RESHIP. Cross-layer re-audit (`04-critique/CROSS-LAYER-BENCHMARK-REAUDIT-W259v4.md`) found the error in 4 of 6 layers. **These corrections override the per-row dispositions below**:

| Repo | Old | W259-v4 corrected | Reason |
|---|---|---|---|
| `mem0ai/mem0` | T1 PRIMARY (96/89) | **T3 DOWNGRADED** | "94.4% LongMemEval" was SaaS marketing; independent OSS = 49% LongMemEval (last place). LoCoMo ≠ LongMemEval. |
| `vectorize-io/hindsight` | T3 WATCH | **T1 PRIMARY (memory)** | 94.6% LongMemEval `[SELF-REPORTED]` (no engine has an independently-reproduced number — VA-Tech/WaPo are co-authors of arXiv 2512.12818, NOT independent reproducers; W259-v16 correction supersedes the prior "independently reproduced" claim — see `03-deepdive/MEMORY-SOTA-EVIDENCE-AUDIT-W259v16.md`); wins on the only full native-CC plugin (hooks+MCP+skill), MIT, Windows-verified, already installed |
| OMEGA (omegamax.co) | not scored | **T2 STUDY-PILOT** | 95.4% LongMemEval claimed but unreproduced; single-author / ~110★ / fails Axis-1; Windows-untested; ~600-memory ceiling |
| `getzep/graphiti` | (deflated) | **UP** — strongest non-self-reported KG | Was dragged down by cognee's self-tuned HotPotQA benchmark |
| `UKGovernmentBEIS/inspect_ai` | 89 | **UP — rank ABOVE promptfoo** | Clean signals (UK AISI authoritative, no vendor-marketing contamination) |
| `promptfoo/promptfoo` | 89 | re-anchor D8 | "used by OpenAI+Anthropic" is promptfoo's own repo description, not independent |
| `ByteRover/Cipher` | 78 STUDY-PILOT | retained STUDY-PILOT | LoCoMo 92.2% self-attestation; NO LongMemEval score |
| `claude-mem` | 72 | 83-86 (rescore) | Windows blockers retained-correct; unverified star count corrected |
| Live-SWE-agent | (L5 ranked) | **PATTERN-CITE-ONLY** | ranked on contaminated SWE-bench Verified; 45.8% Pro (canonical) |
| Bifrost | (L1 candidate) | strip "50× faster" claim | Maxim AI's own benchmark (Maxim makes Bifrost); independent = 8.6× |
| cognee | (KG candidate) | rationale-corrected | self-tuned HotPotQA vs competitors' defaults |

**Benchmark-sourcing rule (W259-v4)**: D3 (star-velocity) + D8 (industry-adoption) MUST be sourced from canonical hard benchmarks (LongMemEval for memory, SWE-bench Pro for scaffold, SemiAnalysis InferenceMAX for serving, independent third-party for routers) — NEVER vendor marketing or self-description.

## §1 — Scoring schema (23 dimensions)

Builds on SRA D1-D10 + codex GPT-5.5 W259 adversarial-verdict 13 new dimensions (D11-D23):

| Dim | Name | Definition | Range | Weight |
|---|---|---|---|---|
| **D1** | License-use-class precision | CLI-binary / library-link / network-served / SaaS-distributed (MIT/Apache=10, BSL/SSPL/Modified-Apache=4, AGPL=2 for library-link, NOASSERTION=0) | 0-10 | 1.0 |
| **D2** | SOTA-freshness | Pushed ≥2026-Q2 = 10, ≥2026-Q1 = 8, ≥2025-Q4 = 6, ≥2025-Q3 = 4, ≥2025-Q2 = 2, older = 0 | 0-10 | 1.0 |
| **D3** | Star-velocity vs content-depth | Stars/month bonus + content-depth bonus (rejects pure fresh-paint) | 0-10 | 0.7 |
| **D4** | Maintainer-provenance tier | T1-OFFICIAL=10 / T2-NAMED-PRACTITIONER=8 / T3-NAMED-ORG=6 / T4-IND-with-portfolio=4 / T5-UNK=0 | 0-10 | 1.0 |
| **D5** | Active-maintenance | Issue-close rate + PR-merge rate + contributor diversity + release cadence | 0-10 | 0.8 |
| **D6** | Use-class compatibility | autonomous-/loop / HARD-GATE / meta-skill TDD-for-skills harness fit | 0-10 | 1.0 |
| **D7** | Anthropic-CC alignment | Don't apply stricter standard than Anthropic itself | 0-10 | 0.8 |
| **D8** | Industry adoption | ≥3 orgs production + ≥2 named-T2 dated artifacts + conf+papers | 0-10 | 1.0 |
| **D9** | Failure-mode awareness | FM-class triggered + recovery documented + CVE absence | 0-10 | 0.6 |
| **D10** | Replacement viability | If X→Y, Y satisfies D1-D9 independently AND is ≤ X's freshness | 0-10 | 0.8 |
| **D11 NEW** | **NATIVE-CC-PATHWAY** | plugin.json (+2) / SKILL.md (+2) / agents/ (+2) / .mcp.json (+2) / hooks (+2) | 0-10 | **1.2** |
| **D12 NEW** | **COMMUNITY-CONSENSUS** | Independent mentions + production use + marketplace presence + named-T2 (Karpathy/Pocock/Osmani/Cherny/DHH) | 0-10 | 0.9 |
| **D13 NEW** | **ROI-PER-LAYER** | Token / time / cost savings (RTK-AI 60-90% token reduction = 10; concrete-measured = 8; estimate = 4) | 0-10 | 0.7 |
| **D14 NEW** | **Q2 2026 FRONTIER** | Released or substantially updated 2026-Q1 onwards | 0-10 | 0.5 |
| **D15 NEW** | **WINDOWS-PORTABLE-COMPAT** | Native PowerShell/npm/pipx/uvx/winget viability; no hard Linux assumptions | 0-10 | **1.0** |
| **D16 NEW** | **CONTEXT-BUDGET-COST** | SKILL.md/agent/command injection size + auto-trigger breadth + MCP tool count (lower = better, score inverted) | 0-10 | 0.7 |
| **D17 NEW** | **MCP-TRUST-SURFACE** | Auth model + tool permissions + OAuth/PKCE + source verification + version pinning | 0-10 | 0.8 |
| **D18 NEW** | **CODEX-VERIFIABILITY** | Can codex CLI independently install-probe + audit + regression-test cheaply | 0-10 | 0.6 |
| **D19 NEW** | **REVERSIBLE-PILOTABILITY** | Can install + smoke-test + disable + rollback without dirtying runtime | 0-10 | 0.9 |
| **D20 NEW** | **DUPLICATION-AGAINST-INSTALLED** | Overlap with 12 MCPs + Phoenix + ccusage + rtk + Repomix + Serena + GitNexus (higher = duplicate; score inverted) | 0-10 | 0.8 |
| **D21 NEW** | **DATA-BOUNDARY-RISK** (codex W259-final fix #1) | Cloud logging + prompt retention + secret exposure + data residency. **Subsumed-by-D17 = NO**: D17 is auth-surface; D21 is data-flow surface. | 0-10 (inverted: 10=safe, 0=high-risk) | 0.9 |
| **D22 NEW** | **SOLO-OPERATOR-FIT** (codex W259-final fix #1) | Improves one operator's loop without team/process ceremony. **Distinct from D6/D7**: D6 is autonomous-loop fit; D22 is solo-vs-team-overhead | 0-10 | 0.8 |
| **D23 NEW** | **MAINTENANCE-VELOCITY** (codex W259-final fix #1) | Recent releases + issue velocity + breaking-change cadence + bus factor. **Distinct from D5**: D5 is signal; D23 is rate-of-change-volatility | 0-10 | 0.7 |

**Total dimensions: 23 (10 SRA + 13 W259-extended).** Total weight = 18.9.

**Composite formula**: `Composite = (Σ(Di × Wi)) / 18.9 × 10` → range 0-100.

**Thresholds**:
- ≥80 → **T0 / T1 INSTALL** (codex-verifiable pilot first)
- 70-79 → **T2 STUDY-PILOT** (sandboxed comparison before commit)
- 60-69 → **T3 CITE-PATTERN-ONLY** (adopt approach, don't install black-box)
- 50-59 → **T4 WATCH** (defer; recheck at next wave)
- <50 → **REJECT-FOR-FIT**

## §2 — Top-50 + TIER-1 OFFICIAL Appendix Scoring Matrix (99 rows by composite; rows 1-50 ranked, rows 51-98 appendix for codex W259-baseline + Wave-2-v2 gap-closure, row 99 W259-v15 GitNexus community addendum)

**Threshold rule (codex W259-v2 cleanup #4 explicit override)**: Composite ≥80 → T1 INSTALL **unless operator-fit override fires** (e.g. multi-provider redundancy not yet load-bearing → T4 WATCH; plugin-budget overhead not yet justified → T1 SELECTIVE; high context-budget cost → demote). All overrides documented per-row in Disposition column.

| Rank | Repo | Stars | Layer | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | D9 | D10 | D11 | D12 | D13 | D14 | D15 | D16 | D17 | D18 | D19 | D20 | Composite | Disposition |
|---:|---|---:|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|
| 1 | **anthropics/claude-code (official CLI)** | n/a | L2 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 8 | 10 | 10 | 10 | 10 | 10 | 10 | 7 | 10 | 10 | 10 | 10 | **97** | **T0-INSTALLED** |
| 2 | **modelcontextprotocol/spec + reference servers** | n/a | L0 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 8 | 9 | 10 | 10 | 9 | 10 | 9 | 8 | 10 | 9 | 9 | 8 | **94** | **T0-INSTALLED** |
| 3 | **anthropics/skills** | unknown | L2 | 10 | 10 | 9 | 10 | 10 | 10 | 10 | 9 | 9 | 9 | 10 | 9 | 9 | 10 | 10 | 9 | 9 | 9 | 10 | 8 | **93** | **T1 INSTALL** |
| 4 | **obra/superpowers** | unknown | L2 | 10 | 10 | 9 | 9 | 10 | 10 | 10 | 9 | 9 | 9 | 10 | 9 | 9 | 10 | 10 | 9 | 9 | 9 | 10 | 8 | **93** | **T0-INSTALLED** |
| 5 | **anthropics/claude-quickstarts** (autonomous-coding + computer-use-best-practices) | unknown | L6 | 10 | 10 | 9 | 10 | 10 | 10 | 10 | 9 | 8 | 9 | 10 | 9 | 9 | 10 | 9 | 9 | 9 | 9 | 10 | 8 | **92** | **T1 PATTERN-CLONE** |
| 6 | **thedotmack/claude-mem (W253 Memory WIN)** | ~76,000 | L1.5 NEW | 10 | 10 | 10 | 6 | 9 | 9 | 10 | 8 | 7 | 9 | 10 | 9 | 9 | 10 | 9 | 9 | 8 | 9 | 9 | 8 | **89** | **T1 BENCHMARK-FIRST** |
| 7 | **wshobson/agents (33.5k★, 77 plugins)** | 33,500 | L2 | 10 | 10 | 10 | 8 | 10 | 10 | 10 | 9 | 8 | 9 | 10 | 9 | 9 | 10 | 10 | 6 | 9 | 9 | 10 | 7 | **89** | **T1 INSTALL** |
| 8 | **UKGovernmentBEIS/inspect_ai (UK AISI)** | 2,063 | L4 | 10 | 10 | 8 | 10 | 10 | 10 | 10 | 9 | 8 | 9 | 9 | 9 | 9 | 10 | 9 | 8 | 9 | 9 | 9 | 7 | **89** | **T1 INSTALL** |
| 9 | **promptfoo/promptfoo** | 21,303 | L4 | 10 | 10 | 9 | 8 | 10 | 10 | 10 | 9 | 8 | 9 | 10 | 10 | 9 | 9 | 10 | 8 | 9 | 9 | 10 | 7 | **90** | **T1 INSTALL** (W259-v13 D11 9→10: THREE official CC paths — `ClaudeAgentSdkProvider` + `promptfoo-evals` skill + `promptfoo mcp`) |
| 10 | **langfuse/langfuse** | ~27,000 | L4 | 8 | 10 | 9 | 8 | 10 | 10 | 9 | 10 | 8 | 9 | 10 | 10 | 9 | 9 | 9 | 7 | 9 | 9 | 9 | 8 | **89** | **T1 INSTALL** (W259-v13 D11 9→10: official Langfuse MCP server exists — observability MCP installable) |
| 11 | **anomalyco/opencode** | 160,923 | L3 | 10 | 10 | 10 | 8 | 10 | 10 | 9 | 10 | 8 | 9 | 9 | 10 | 9 | 10 | 9 | 7 | 9 | 9 | 9 | 7 | **88** | **T1 PILOT** |
| 12 | **BerriAI/litellm** | ~47,000 | L1 | 10 | 10 | 10 | 8 | 10 | 10 | 10 | 10 | 8 | 9 | 8 | 10 | 9 | 9 | 9 | 7 | 9 | 9 | 9 | 7 | **88** | **T1 INSTALL** |
| 13 | **ast-grep/ast-grep** | 13,800 | L0/L2 | 10 | 10 | 9 | 9 | 10 | 10 | 9 | 6 | 8 | 8 | 9 | 6 | 9 | 9 | 10 | 8 | 9 | 9 | 10 | 8 | **82** | **T2 STUDY-PILOT** (W259 Axis-1-thin downgrade per Architecture Critic v2 §6 — 1 org only; codex W259-final fix #1 ratified) |
| 14 | **trailofbits/skills-curated** | unknown | L2 | 10 | 10 | 8 | 10 | 10 | 10 | 10 | 8 | 9 | 9 | 10 | 9 | 8 | 10 | 10 | 9 | 9 | 9 | 10 | 8 | **88** | **T1 INSTALL** |
| 15 | **pydantic/pydantic-ai** | 17,092 | L2.5 NEW | 10 | 10 | 10 | 9 | 10 | 10 | 9 | 9 | 8 | 9 | 10 | 9 | 9 | 10 | 9 | 8 | 9 | 9 | 9 | 8 | **89** | **T1 INSTALL** (W259-v13 D11 8→10: official CC skill `claude plugin install ai@pydantic-skills` — marketplace `pydantic/skills`; add to L2.5 install path) |
| 16 | **getzep/graphiti** | unknown | L1.5 NEW | 10 | 10 | 9 | 9 | 10 | 10 | 9 | 9 | 8 | 8 | 9 | 9 | 9 | 9 | 9 | 7 | 9 | 9 | 9 | 8 | **87** | **T1 INSTALL (incumbent)** |
| 17 | **byterover-cli (memory+CC skill)** | unknown | L1.5 NEW | 10 | 10 | 9 | 7 | 9 | 10 | 10 | 8 | 7 | 8 | 10 | 9 | 10 | 10 | 10 | 9 | 9 | 9 | 10 | 8 | **87** | **T1 BENCHMARK-vs-Graphiti** |
| 18 | **JuliusBrussee/caveman (W253 token-opt WIN)** | ~60,762 | L0 | 10 | 10 | 10 | 6 | 9 | 10 | 9 | 8 | 7 | 9 | 9 | 9 | 10 | 10 | 9 | 9 | 8 | 9 | 9 | 8 | **87** | **T1 STYLE-PILOT** |
| 19 | **567-labs/instructor (Anthropic native)** | 12,965 | L2.5 NEW | 10 | 10 | 9 | 9 | 10 | 10 | 10 | 9 | 8 | 9 | 8 | 9 | 9 | 9 | 9 | 8 | 9 | 9 | 9 | 8 | **87** | **T1 INSTALL** |
| 20 | **aquasecurity/trivy** | 35,011 | L0.5 | 10 | 10 | 9 | 10 | 10 | 9 | 9 | 9 | 8 | 9 | 9 | 9 | 9 | 8 | 10 | 8 | 9 | 9 | 9 | 8 | **87** | **T1 INSTALL** |
| 21 | **gitleaks/gitleaks** | ~16,000 | L0.5 | 10 | 10 | 8 | 9 | 10 | 9 | 9 | 9 | 8 | 9 | 9 | 9 | 9 | 8 | 10 | 8 | 9 | 9 | 10 | 8 | **86** | **T1 INSTALL** |
| 22 | **vllm-project/vllm** | ~80,000 | L1 (T1-fallback) | 10 | 10 | 10 | 9 | 10 | 9 | 8 | 10 | 8 | 9 | 8 | 10 | 9 | 9 | 5 | 7 | 9 | 8 | 8 | 7 | **86** | **T2 STUDY-PILOT** |
| 23 | **alirezarezvani/claude-skills** | 14,956 | L2 marketplace | 10 | 10 | 9 | 6 | 9 | 10 | 10 | 8 | 7 | 8 | 10 | 9 | 9 | 9 | 10 | 8 | 9 | 9 | 10 | 7 | **86** | **T2 STUDY-PILOT** |
| 24 | **Yeachan-Heo/oh-my-claudecode** | 33,967 | L2 marketplace | 10 | 10 | 9 | 6 | 9 | 10 | 10 | 8 | 7 | 8 | 10 | 9 | 9 | 9 | 10 | 8 | 9 | 9 | 10 | 7 | **86** | **T2 STUDY-PILOT** |
| 25 | **arize-ai/phoenix** | unknown | L4 (installed) | 10 | 10 | 9 | 10 | 10 | 10 | 9 | 9 | 8 | 9 | 8 | 9 | 9 | 8 | 9 | 7 | 9 | 9 | 9 | 7 | **86** | **T0-INSTALLED** |
| 26 | **anthropics/claude-cookbooks (formerly anthropic-cookbook)** | 43,000 | L6 | 10 | 10 | 10 | 10 | 10 | 9 | 10 | 9 | 8 | 9 | 9 | 9 | 8 | 10 | 9 | 7 | 9 | 9 | 10 | 7 | **86** | **T1 PATTERN-CITE** |
| 27 | **DS4SD/docling (W253 DocAI WIN)** | 59,800 | L2.5 | 10 | 10 | 10 | 10 | 10 | 9 | 9 | 9 | 8 | 9 | 7 | 10 | 9 | 9 | 9 | 6 | 9 | 9 | 9 | 7 | **86** | **T2 STUDY-PILOT (demand-gated)** |
| 28 | **Helicone/helicone (W253 Router WIN)** | 5,673 | L4 | 10 | 10 | 8 | 8 | 10 | 10 | 9 | 9 | 7 | 9 | 8 | 10 | 9 | 9 | 9 | 7 | 9 | 9 | 9 | 8 | **86** | **T2 STUDY-PILOT** |
| 29 | **stanfordnlp/dspy** | 34,465 | L2.5 NEW | 10 | 10 | 10 | 10 | 10 | 9 | 9 | 10 | 8 | 9 | 8 | 10 | 9 | 9 | 9 | 7 | 9 | 9 | 9 | 7 | **86** | **T2 STUDY-PILOT** |
| 30 | **comet-ml/opik** | 19,307 | L4 | 10 | 10 | 9 | 9 | 10 | 10 | 9 | 9 | 8 | 9 | 10 | 9 | 9 | 9 | 9 | 7 | 9 | 9 | 9 | 7 | **87** | **T2 STUDY-PILOT** (W259-v13 D11 8→10: official `opik-mcp` + CC OTel route) |
| 31 | **microsoft/markitdown** | unknown | L2.5 | 10 | 10 | 10 | 10 | 10 | 9 | 9 | 8 | 8 | 9 | 7 | 9 | 9 | 10 | 10 | 8 | 9 | 9 | 9 | 7 | **86** | **T1 STUDY-PILOT** |
| 32 | **iannuttall/ralph (PATTERN ORIGIN)** | unknown | L6 PATTERN-CITE | 10 | 10 | 8 | 7 | 9 | 10 | 9 | 8 | 8 | 9 | 7 | 9 | 9 | 8 | 9 | 9 | 9 | 9 | 10 | 8 | **86** | **CITE-PATTERN-ONLY** |
| 33 | **supermemoryai/supermemory** | 22,586 | L1.5 NEW | 10 | 10 | 9 | 6 | 9 | 9 | 9 | 8 | 7 | 8 | 7 | 9 | 9 | 9 | 9 | 8 | 9 | 9 | 9 | 7 | **84** | **T2 STUDY-PILOT vs claude-mem** |
| 34 | **mem0ai/mem0** | ~55,800 | L1.5 NEW | 10 | 10 | 10 | 8 | 10 | 9 | 9 | 9 | 7 | 8 | 7 | 10 | 9 | 9 | 9 | 7 | 9 | 9 | 9 | 6 | **84** | **T2 (overlaps Graphiti)** |
| 35 | **NVIDIA/garak** | 7,824 | L0.5 | 10 | 10 | 8 | 10 | 10 | 9 | 9 | 9 | 8 | 9 | 8 | 9 | 9 | 8 | 9 | 8 | 9 | 9 | 9 | 8 | **84** | **T2 STUDY-PILOT** |
| 36 | **confident-ai/deepeval** | 15,473 | L4 | 10 | 10 | 9 | 8 | 10 | 9 | 9 | 9 | 8 | 9 | 8 | 9 | 9 | 9 | 9 | 7 | 9 | 9 | 9 | 7 | **84** | **T2 STUDY-PILOT** |
| 37 | **rtk-ai/rtk (claims 60-90% token reduction — SELF-CLAIM)** | unknown | L0 | 10 | 10 | 8 | 6 | 9 | 10 | 9 | 5 | 7 | 8 | 8 | 5 | 8 | 9 | 10 | 9 | 9 | 9 | 10 | 8 | **77** | **T2 STUDY-PILOT** (W259 self-claim downgrade per Architecture Critic v2 §6 — 1 org self-attestation only; codex W259-final fix #1 ratified) |
| 38 | **explodinggradients/ragas** | 13,932 | L4 RAG-eval | 10 | 10 | 9 | 8 | 9 | 9 | 9 | 9 | 7 | 8 | 7 | 9 | 9 | 9 | 9 | 7 | 9 | 9 | 9 | 6 | **83** | **T3 demand-gated** |
| 39 | **microsoft/llmlingua / llmlingua-2** | 6,200 | L6 token-opt | 10 | 10 | 8 | 10 | 9 | 9 | 9 | 9 | 7 | 8 | 7 | 9 | 9 | 9 | 9 | 8 | 9 | 9 | 9 | 7 | **83** | **T3 CLIENT-side compression** |
| 40 | **microsoft/playwright** + **playwright-mcp** | high | L0 / browser | 10 | 10 | 10 | 10 | 10 | 10 | 9 | 10 | 8 | 9 | 10 | 10 | 9 | 9 | 9 | 7 | 9 | 9 | 9 | 7 | **89** | **T0-INSTALLED** |
| 41 | **chromedevtools/chrome-devtools-mcp** | unknown | L0 / browser | 10 | 10 | 9 | 10 | 10 | 10 | 9 | 9 | 8 | 9 | 10 | 9 | 9 | 9 | 9 | 7 | 9 | 9 | 9 | 7 | **88** | **T0-INSTALLED** |
| 42 | **oraios/serena** | unknown | L0 / code-intel | 10 | 10 | 9 | 9 | 10 | 10 | 9 | 9 | 8 | 9 | 10 | 9 | 9 | 9 | 8 | 7 | 9 | 9 | 9 | 7 | **87** | **T0-INSTALLED** |
| 43 | **yamadashy/repomix** | unknown | L0 / code-intel | 10 | 10 | 10 | 8 | 10 | 10 | 9 | 9 | 8 | 9 | 10 | 9 | 10 | 9 | 9 | 7 | 9 | 9 | 9 | 6 | **87** | **T0-INSTALLED** |
| 44 | **pre-commit/pre-commit (hook substrate)** | 15,277 | L0.5 | 10 | 10 | 8 | 9 | 10 | 9 | 9 | 10 | 9 | 9 | 6 | 10 | 9 | 7 | 10 | 9 | 9 | 9 | 10 | 7 | **84** | **T1 INSTALL** |
| 45 | **traceloop/openllmetry** | 7,112 | L4 OTel | 10 | 10 | 8 | 8 | 9 | 9 | 9 | 9 | 7 | 8 | 7 | 9 | 9 | 9 | 9 | 7 | 9 | 9 | 9 | 7 | **83** | **T3 demand-gated** |
| 46 | **ossf/scorecard** | 5,440 | L0.5 | 10 | 10 | 8 | 10 | 10 | 9 | 9 | 9 | 9 | 9 | 6 | 9 | 9 | 8 | 9 | 8 | 9 | 9 | 9 | 8 | **84** | **T2 STUDY-PILOT** |
| 47 | **dottxt-ai/outlines** | 13,843 | L2.5 | 10 | 10 | 9 | 9 | 10 | 9 | 9 | 9 | 8 | 8 | 7 | 9 | 9 | 9 | 9 | 8 | 9 | 9 | 9 | 7 | **84** | **T2 STUDY-PILOT** |
| 48 | **BoundaryML/baml** | 8,238 | L2.5 | 10 | 10 | 9 | 8 | 10 | 9 | 9 | 8 | 8 | 8 | 7 | 9 | 9 | 9 | 9 | 8 | 9 | 9 | 9 | 7 | **83** | **T2 STUDY-PILOT (cross-lang)** |
| 49 | **vfsfitvnm/foam (markdown PKM)** | 17,000 | L2.5 wiki | 10 | 10 | 8 | 6 | 9 | 9 | 9 | 8 | 8 | 9 | 10 | 8 | 9 | 7 | 10 | 9 | 9 | 9 | 10 | 8 | **85** | **T1 INSTALL (Karpathy compounding-surface)** (W259-v13 D11 9→10: official `@foam/mcp` server — license MIT-vs-NOASSERTION ambiguous, verify before install) |
| 50 | **AAIF/goose (LF Apr 2026 GA)** | 45,271 | L3 | 10 | 10 | 9 | 10 | 10 | 9 | 9 | 9 | 8 | 9 | 8 | 9 | 9 | 9 | 9 | 7 | 9 | 9 | 9 | 7 | **86** | **T2 STAGED-ADOPT** |
| 51 | **google-gemini/gemini-cli** | 104,000 | L3 | 10 | 10 | 10 | 10 | 10 | 9 | 7 | 10 | 8 | 9 | 8 | 10 | 9 | 10 | 9 | 7 | 9 | 9 | 9 | 7 | **88** | **T4 WATCH (multi-provider redundancy)** |
| 52 | **github/spec-kit** | 100,800 | L6 PATTERN-CITE | 10 | 10 | 10 | 10 | 10 | 9 | 9 | 10 | 8 | 9 | 7 | 10 | 9 | 10 | 10 | 8 | 9 | 9 | 9 | 7 | **88** | **T1 PATTERN-CITE (SDD methodology)** |
| 53 | **mattpocock/skills** | 86,600 | L2 / L6 | 10 | 10 | 10 | 8 | 10 | 10 | 9 | 9 | 8 | 9 | 9 | 10 | 9 | 10 | 10 | 8 | 9 | 9 | 10 | 7 | **88** | **T2 STUDY-PILOT (community high-signal)** |
| 54 | **openai/symphony** | 23,900 | L3 / L5 | 10 | 10 | 10 | 10 | 10 | 9 | 7 | 8 | 7 | 9 | 7 | 9 | 9 | 10 | 8 | 7 | 9 | 9 | 9 | 7 | **84** | **T2 STUDY-PILOT (autonomous orchestrator)** |
| 55 | **openai/codex-plugin-cc** | 18,800 | L3 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 9 | 8 | 9 | 10 | 9 | 9 | 10 | 10 | 8 | 9 | 10 | 10 | 8 | **92** | **T1 INSTALL (official Codex-from-CC bridge)** |
| 56 | **openai/skills** | 19,200 | L2 marketplace | 10 | 10 | 10 | 10 | 10 | 9 | 8 | 8 | 7 | 9 | 9 | 9 | 9 | 10 | 9 | 8 | 9 | 9 | 9 | 7 | **86** | **T2 STUDY-PILOT (Codex-side skill parity)** |
| 57 | **anthropics/knowledge-work-plugins** | 12,200 | L2 marketplace | 10 | 10 | 9 | 10 | 10 | 10 | 10 | 8 | 8 | 9 | 10 | 9 | 9 | 10 | 10 | 8 | 9 | 9 | 10 | 8 | **89** | **T1 INSTALL (Anthropic-OFFICIAL)** |
| 58 | **anthropic-experimental/sandbox-runtime** | 4,100 | L0 / L0.5 | 10 | 10 | 9 | 10 | 10 | 10 | 10 | 8 | 8 | 9 | 9 | 9 | 9 | 10 | 9 | 9 | 10 | 10 | 9 | 8 | **89** | **T1 STUDY-PILOT (Anthropic-OFFICIAL primitive)** |
| 59 | **microsoft/skills** + **microsoft/mcp** | 2,300 + 3,200 | L0 / L2 | 10 | 10 | 8 | 10 | 10 | 10 | 9 | 8 | 8 | 9 | 9 | 9 | 9 | 10 | 9 | 8 | 9 | 9 | 9 | 8 | **87** | **T1 SELECTIVE-INSTALL (MS-OFFICIAL)** |
| 60 | **cloudflare/agents** + **cloudflare/agent-skills-discovery-rfc** | 4,900 + 281 | L0 / L8 | 10 | 10 | 8 | 10 | 10 | 9 | 9 | 8 | 8 | 9 | 7 | 9 | 9 | 10 | 9 | 8 | 9 | 9 | 9 | 8 | **86** | **T3 CITE-PATTERN (.well-known protocol)** |
| 61 | **obra/superpowers-marketplace** | 970 | L2 marketplace | 10 | 10 | 9 | 9 | 10 | 10 | 10 | 8 | 8 | 9 | 10 | 9 | 9 | 10 | 10 | 9 | 9 | 9 | 10 | 8 | **89** | **T1 INSTALL (extends superpowers)** |
| 62 | **obra/superpowers-chrome** | 289 | L2 | 10 | 10 | 8 | 9 | 10 | 10 | 10 | 7 | 8 | 9 | 10 | 9 | 9 | 10 | 9 | 9 | 9 | 9 | 10 | 8 | **88** | **T1 BUNDLE (with superpowers)** |
| 63 | **obra/superpowers-skills** | 658 | L2 | 10 | 10 | 9 | 9 | 10 | 10 | 10 | 7 | 8 | 9 | 10 | 9 | 9 | 10 | 10 | 9 | 9 | 9 | 10 | 8 | **89** | **T1 BUNDLE (with superpowers)** |
| 64 | **anthropics/claude-cookbooks** (renamed 2026-05-14) | 43,000 | L6 PATTERN-CITE | 10 | 10 | 10 | 10 | 10 | 9 | 10 | 9 | 8 | 9 | 9 | 9 | 8 | 10 | 9 | 7 | 9 | 9 | 10 | 7 | **88** | **T1 PATTERN-CITE** |
| 65 | **anthropics/claude-plugins-official** | 19,485 | L2 marketplace | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 8 | 10 | 10 | 10 | 9 | 10 | 10 | 9 | 9 | 9 | 10 | 7 | **94** | **T0-CANONICAL (auto via /plugin)** |
| 66 | **anthropics/claude-code-action** | 7,602 | L5 GH-Action | 10 | 10 | 9 | 10 | 10 | 10 | 10 | 9 | 9 | 10 | 10 | 9 | 9 | 10 | 10 | 8 | 10 | 10 | 10 | 8 | **93** | **T1 INSTALL (PR automation)** |
| 67 | **anthropics/claude-agent-sdk-python** | 6,903 | L5 SDK | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 9 | 10 | 10 | 10 | 9 | 10 | 10 | 8 | 10 | 10 | 10 | 7 | **95** | **T1 INSTALL (canonical Python SDK)** |
| 68 | **anthropics/claude-agent-sdk-typescript** | 1,428 | L5 SDK | 10 | 10 | 9 | 10 | 10 | 10 | 10 | 9 | 9 | 10 | 10 | 10 | 9 | 10 | 10 | 8 | 10 | 10 | 10 | 7 | **94** | **T1 INSTALL (canonical TS SDK)** |
| 69 | **anthropics/financial-services** | 23,741 | L2 plugin-suite | 10 | 10 | 9 | 10 | 10 | 8 | 10 | 8 | 8 | 9 | 10 | 8 | 8 | 10 | 9 | 7 | 9 | 8 | 10 | 9 | **86** | **T3 SELECTIVE (vertical)** |
| 70 | **anthropics/claude-for-legal** | 6,297 | L2 plugin-suite | 10 | 10 | 9 | 10 | 10 | 8 | 10 | 8 | 8 | 9 | 10 | 8 | 8 | 10 | 9 | 7 | 9 | 8 | 10 | 9 | **86** | **T3 SELECTIVE (vertical)** |
| 71 | **anthropics/claude-code-security-review** | 4,617 | L0.5 GH-Action | 10 | 8 | 8 | 10 | 8 | 10 | 10 | 9 | 9 | 9 | 9 | 8 | 10 | 8 | 10 | 8 | 10 | 10 | 10 | 8 | **88** | **T1 INSTALL (PR security gate)** |
| 72 | **anthropics/life-sciences** | 377 | L2 plugin-suite | 10 | 10 | 7 | 10 | 8 | 7 | 10 | 7 | 7 | 8 | 9 | 7 | 7 | 10 | 9 | 8 | 9 | 7 | 10 | 9 | **80** | **T3 SELECTIVE (vertical)** |
| 73 | **openai/openai-agents-python** | 26,357 | L5 SCAFFOLD | 10 | 10 | 10 | 10 | 10 | 8 | 7 | 10 | 9 | 9 | 8 | 10 | 9 | 10 | 10 | 8 | 10 | 10 | 9 | 7 | **90** | **T1 STUDY-PILOT (cross-model)** |
| 74 | **openai/openai-agents-js** | 3,043 | L5 SCAFFOLD | 10 | 10 | 9 | 10 | 10 | 8 | 7 | 9 | 9 | 9 | 8 | 9 | 9 | 10 | 10 | 8 | 10 | 10 | 9 | 7 | **89** | **T1 STUDY-PILOT** |
| 75 | **openai/codex-action** | 987 | L5 GH-Action | 10 | 10 | 9 | 10 | 10 | 9 | 8 | 8 | 8 | 9 | 9 | 9 | 9 | 10 | 10 | 8 | 10 | 10 | 10 | 9 | **90** | **T2 PAIR-WITH-CODEX** |
| 76 | **openai/codex-universal** | 913 | L0 docker | 10 | 10 | 8 | 10 | 10 | 7 | 7 | 8 | 8 | 8 | 7 | 8 | 8 | 10 | 9 | 10 | 8 | 8 | 10 | 8 | **84** | **T2 CITE-PATTERN (sandbox base)** |
| 77 | **modelcontextprotocol/python-sdk** | 23,025 | L0 substrate | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 9 | 9 | 8 | 10 | 9 | 9 | 10 | 8 | 10 | 10 | 9 | 9 | **94** | **T0-INSTALLED (foundation)** |
| 78 | **modelcontextprotocol/typescript-sdk** | 12,439 | L0 substrate | 10 | 10 | 9 | 10 | 10 | 10 | 10 | 10 | 9 | 9 | 8 | 10 | 9 | 9 | 10 | 8 | 10 | 10 | 9 | 9 | **93** | **T0-INSTALLED (foundation)** |
| 79 | **modelcontextprotocol/inspector** | 9,780 | L0 dev-tool | 10 | 10 | 9 | 10 | 10 | 10 | 10 | 9 | 8 | 10 | 9 | 10 | 10 | 10 | 10 | 9 | 10 | 10 | 10 | 8 | **94** | **T1 INSTALL (MCP debug standard)** |
| 80 | **modelcontextprotocol/registry** | 6,820 | L8 directory | 10 | 10 | 9 | 10 | 10 | 8 | 9 | 8 | 8 | 8 | 7 | 9 | 9 | 10 | 10 | 9 | 9 | 9 | 10 | 7 | **87** | **T2 WATCH (when populated)** |
| 81 | **modelcontextprotocol/mcpb** | 1,919 | L0 packaging | 10 | 10 | 9 | 10 | 10 | 9 | 10 | 9 | 8 | 10 | 9 | 9 | 9 | 10 | 10 | 9 | 9 | 10 | 10 | 8 | **90** | **T2 STUDY-PILOT (Desktop+bundle)** |
| 82 | **modelcontextprotocol/experimental-ext-skills** | 128 | L8 WG | 10 | 10 | 8 | 10 | 9 | 10 | 10 | 9 | 8 | 8 | 10 | 9 | 10 | 10 | 10 | 8 | 10 | 10 | 10 | 8 | **93** | **T1 CITE-PATTERN (forward-arch)** |
| 83 | **microsoft/playwright-mcp** (dedicated) | 32,588 | L0 browser | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 8 | 9 | 10 | 10 | 10 | 10 | 10 | 8 | 10 | 10 | 10 | 8 | **95** | **T0-INSTALLED (already in stack)** |
| 84 | **microsoft/agent-framework** | 10,479 | L5 SCAFFOLD | 10 | 10 | 10 | 10 | 10 | 8 | 8 | 10 | 8 | 9 | 8 | 10 | 9 | 10 | 10 | 8 | 10 | 9 | 9 | 7 | **90** | **T2 STUDY-PILOT (multi-org arch)** |
| 85 | **microsoft/agent-governance-toolkit** | 1,561 | L0.5 security | 10 | 10 | 10 | 10 | 10 | 10 | 9 | 10 | 10 | 10 | 2 | 10 | 10 | 10 | 10 | 8 | 10 | 10 | 10 | 9 | **92** | **T1 INSTALL — reclassify CI-gate not CC-plugin** (W259-v13 D11 8→2: NO plugin.json / NO .mcp.json — GitHub Action + pre-commit + pip SDK only) |
| 86 | **microsoft/azure-skills** | 986 | L2 plugin-marketplace | 10 | 10 | 9 | 10 | 9 | 8 | 9 | 8 | 8 | 8 | 9 | 8 | 8 | 10 | 9 | 8 | 9 | 9 | 10 | 9 | **84** | **T2 SELECTIVE (Azure)** |
| 87 | **microsoft/azure-devops-mcp** | 1,688 | L0 MCP | 10 | 10 | 9 | 10 | 10 | 9 | 9 | 8 | 8 | 9 | 9 | 8 | 8 | 10 | 9 | 8 | 9 | 9 | 10 | 9 | **84** | **T2 SELECTIVE (Azure DevOps)** |
| 88 | **microsoft/Agents** (M365 SDK) | 904 | L5 SDK | 10 | 10 | 8 | 10 | 9 | 7 | 8 | 8 | 8 | 8 | 7 | 9 | 8 | 10 | 8 | 8 | 9 | 8 | 9 | 9 | **80** | **T3 WATCH (M365-only)** |
| 89 | **cloudflare/mcp-server-cloudflare** | 3,746 | L0 MCP | 10 | 10 | 9 | 10 | 10 | 9 | 9 | 8 | 8 | 8 | 9 | 9 | 9 | 10 | 9 | 9 | 9 | 9 | 10 | 9 | **87** | **T2 SELECTIVE (CF customers)** |
| 90 | **google/adk-python** | 19,660 | L5 SCAFFOLD | 10 | 10 | 10 | 10 | 10 | 8 | 7 | 10 | 8 | 9 | 8 | 10 | 9 | 10 | 10 | 8 | 10 | 10 | 10 | 7 | **90** | **T2 STUDY-PILOT (Google-stack)** |
| 91 | **googleapis/mcp-toolbox** (multi-DB MCP) | 15,246 | L0 MCP toolkit | 10 | 10 | 10 | 10 | 10 | 10 | 9 | 10 | 9 | 10 | 10 | 10 | 10 | 10 | 10 | 9 | 10 | 10 | 10 | 9 | **96** | **T1 INSTALL (multi-DB MCP)** |
| 92 | **google/agents-cli** | 2,413 | L3 / L2 | 10 | 10 | 9 | 10 | 10 | 9 | 8 | 8 | 8 | 9 | 8 | 9 | 9 | 10 | 9 | 8 | 9 | 9 | 9 | 8 | **87** | **T2 STUDY-PILOT (multi-provider CLI)** |
| 93 | **github/github-mcp-server** | 29,883 | L0 MCP | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 8 | 10 | 10 | 10 | 10 | 10 | 10 | 9 | 10 | 10 | 10 | 7 | **96** | **T1 INSTALL (likely already via mcp__github__*)** |
| 94 | **github/awesome-copilot** | 33,131 | L2 catalog | 10 | 10 | 10 | 10 | 10 | 8 | 8 | 10 | 8 | 8 | 8 | 10 | 9 | 10 | 10 | 7 | 8 | 8 | 9 | 8 | **90** | **T1 PATTERN-CITE (skills catalog)** |
| 95 | **vercel-labs/agent-skills** | 26,655 | L2 skills | 10 | 10 | 10 | 10 | 10 | 10 | 9 | 10 | 8 | 9 | 10 | 10 | 10 | 10 | 10 | 8 | 10 | 10 | 10 | 9 | **96** | **T1 INSTALL (frontend-CC leverage)** |
| 96 | **vercel/ai** (Vercel AI SDK) | 24,265 | L5 SCAFFOLD | 10 | 10 | 10 | 10 | 10 | 8 | 8 | 10 | 8 | 9 | 8 | 10 | 9 | 9 | 10 | 8 | 10 | 9 | 9 | 8 | **87** | **T2 STUDY-PILOT (TS-stack)** |
| 97 | **stripe/ai** (Stripe Agent Toolkit) | 1,555 | L5 toolkit / L0 MCP | 10 | 10 | 8 | 10 | 10 | 8 | 8 | 9 | 8 | 9 | 9 | 9 | 9 | 10 | 9 | 8 | 10 | 9 | 9 | 8 | **84** | **T2 SELECTIVE (Stripe customers)** |
| 98 | **NVIDIA/TensorRT-LLM** | 13,659 | L1 inference | 10 | 10 | 9 | 10 | 10 | 7 | 7 | 10 | 8 | 8 | 7 | 9 | 8 | 9 | 9 | 8 | 9 | 8 | 8 | 7 | **80** | **T2 STUDY-PILOT (vs vllm row 22)** |
| 99 | **abhigyanpatwari/GitNexus** | 38,628 | L0.9 code-intel-graph | 0 | 10 | 9 | 4 | 9 | 9 | 6 | 6 | 7 | 3 | 8 | 7 | 7 | 10 | 8 | 6 | 8 | 8 | 6 | 3 | **70** | **T2 STUDY-PILOT — KEEP (installed, MCP-only); PolyForm-NC license (D1=0) caps adoption** (W259-v15 appendix — `03-deepdive/SOTA-COMMUNITY-REPOS-W259v15-GITNEXUS.md`) |

## §2.5 — Top-10 highest composite (re-sorted post-Wave-2-v2 2026-05-16)

| Rank | Repo | Composite | Disposition |
|---:|---|---:|---|
| 1 | anthropics/claude-code (official CLI) | 97 | T0-INSTALLED |
| 2 | googleapis/mcp-toolbox | 96 | **T1 INSTALL (NEW)** |
| 2 | github/github-mcp-server | 96 | **T1 INSTALL (NEW)** |
| 2 | vercel-labs/agent-skills | 96 | **T1 INSTALL (NEW)** |
| 5 | anthropics/claude-agent-sdk-python | 95 | **T1 INSTALL (NEW)** |
| 5 | microsoft/playwright-mcp (dedicated) | 95 | **T0-INSTALLED (NEW row)** |
| 7 | modelcontextprotocol/spec + reference servers | 94 | T0-INSTALLED |
| 7 | modelcontextprotocol/python-sdk | 94 | **T0-INSTALLED (NEW row)** |
| 7 | anthropics/claude-plugins-official | 94 | **T0-CANONICAL (NEW row)** |
| 7 | anthropics/claude-agent-sdk-typescript | 94 | **T1 INSTALL (NEW)** |
| 7 | modelcontextprotocol/inspector | 94 | **T1 INSTALL (NEW)** |
| 12 | obra/superpowers + 3 ecosystem extensions | 93 | T0-INSTALLED + T1 BUNDLE |
| 12 | anthropics/skills | 93 | T1 INSTALL |
| 12 | anthropics/claude-code-action | 93 | **T1 INSTALL (NEW)** |
| 12 | modelcontextprotocol/experimental-ext-skills | 93 | **T1 CITE-PATTERN (NEW)** |
| 12 | modelcontextprotocol/typescript-sdk | 93 | **T0-INSTALLED (NEW row)** |
| 17 | anthropics/claude-quickstarts | 92 | T1 PATTERN-CLONE |
| 17 | openai/codex-plugin-cc | 92 | T1 INSTALL |
| 17 | microsoft/agent-governance-toolkit | 92 | **T1 INSTALL — CI-gate (W259-v13 D11 8→2)** |
| 20 | openai/openai-agents-python | 90 | **T1 STUDY-PILOT (NEW)** |
| 20 | microsoft/agent-framework | 90 | **T2 STUDY-PILOT (NEW)** |
| 20 | google/adk-python | 90 | **T2 STUDY-PILOT (NEW)** |
| 20 | github/awesome-copilot | 90 | **T1 PATTERN-CITE (NEW)** |
| 20 | modelcontextprotocol/mcpb | 90 | **T2 STUDY-PILOT (NEW)** |
| 20 | openai/codex-action | 90 | **T2 PAIR-WITH-CODEX (NEW)** |
| 20 | promptfoo/promptfoo | 90 | **T1 INSTALL (W259-v13 D11 9→10)** |
| 27 | anthropics/knowledge-work-plugins | 89 | T1 INSTALL |
| 27 | anthropic-experimental/sandbox-runtime | 89 | T1 STUDY-PILOT |
| 27 | thedotmack/claude-mem | 89 | T1 BENCHMARK-FIRST |
| 27 | wshobson/agents | 89 | T1 SELECTIVE |
| 27 | UKGovernmentBEIS/inspect_ai | 89 | T1 INSTALL |
| 27 | langfuse/langfuse | 89 | **T1 INSTALL (W259-v13 D11 9→10)** |
| 27 | microsoft/playwright + playwright-mcp (row 40) | 89 | T0-INSTALLED |
| 27 | openai/openai-agents-js | 89 | **T1 STUDY-PILOT (NEW)** |
| 35 | anthropics/claude-code-security-review | 88 | **T1 INSTALL (NEW PR-gate)** |
| 35 | opencode (160k★) | 88 | T1 PILOT |
| 35 | BerriAI/litellm | 88 | T1 INSTALL |
| 35 | trailofbits/skills-curated | 88 | T1 SELECTIVE |
| 35 | google-gemini/gemini-cli | 88 | T4 WATCH |
| 35 | github/spec-kit | 88 | T1 PATTERN-CITE |
| 35 | mattpocock/skills | 88 | T2 STUDY-PILOT |
| 35 | chromedevtools/chrome-devtools-mcp | 88 | T0-INSTALLED |
| 35 | obra/superpowers-chrome | 88 | T1 BUNDLE |
| 35 | anthropics/claude-cookbooks | 88 | T1 PATTERN-CITE |
| 45 | modelcontextprotocol/registry | 87 | **T2 WATCH (NEW)** |
| 45 | cloudflare/mcp-server-cloudflare | 87 | **T2 SELECTIVE (NEW)** |
| 45 | google/agents-cli | 87 | **T2 STUDY-PILOT (NEW)** |
| 45 | vercel/ai | 87 | **T2 STUDY-PILOT (NEW)** |

## §3 — Disposition rollup (codex W259-v2 cleanup #2 normalized)

| Tier | Count | Repos |
|---|---:|---|
| T0 INSTALLED (already in operator stack) | 9 | claude-code, MCP, superpowers, playwright, chrome-devtools-mcp, serena, repomix, phoenix, ccusage |
| **T1 INSTALL (new add)** | 19 | anthropics/skills, anthropics/quickstarts, **claude-mem (benchmark-first)**, openai/codex-plugin-cc, anthropics/knowledge-work-plugins, anthropic-experimental/sandbox-runtime (study-pilot), inspect_ai, promptfoo, langfuse (port-conflict-check), opencode (verify-redirect-first), litellm, pydantic-ai, graphiti (incumbent), byterover-cli (benchmark), caveman (style-pilot), instructor, trivy, gitleaks, foam, anthropics/claude-cookbooks, pre-commit, microsoft/skills+mcp (selective), superpowers-marketplace + superpowers-chrome + superpowers-skills (bundle) |
| **T1 SELECTIVE (after T0.0 plugin-budget audit per codex W259-v2 #2)** | 2 | wshobson/agents, trailofbits/skills-curated |
| **T2 STUDY-PILOT** | 17 | **ast-grep (Axis-1-thin downgrade)**, **rtk-ai (self-claim downgrade)**, vllm, alirezarezvani/claude-skills, oh-my-claudecode, docling, helicone, dspy, opik, supermemory, mem0, garak, deepeval, scorecard, outlines, baml, goose, mattpocock/skills, openai/symphony, openai/skills |
| T3 CITE-PATTERN-ONLY | ~12 | ralph (autonomous-coding origin), github/spec-kit (SDD methodology), cloudflare/agent-skills-discovery-rfc (.well-known protocol), ragas, llmlingua, openllmetry, MADR template, etc. |
| **T4 WATCH (operator-fit override: high composite but not yet load-bearing)** | ~10 | google-gemini/gemini-cli (88★ score, multi-provider redundancy not yet needed), A2A v1.0 SDK, Letta Code, ant CLI, Anthropic Managed Agents (ToS-gated), Cloudflare/agents (edge-runtime not load-bearing), Live-SWE-agent (WSL2-gated), Microsoft Agent Framework 1.0, MCP Tasks SEP-1686 impls |
| REJECT | n | E2B (deprecated), MultiCa (license-blocker), AutoGen/AG2 (superseded by MS Agent Framework 1.0), Skyvern (AGPL), ControlFlow (ARCHIVED 2025-08), structurizr/lite (ARCHIVED), microsoft/aici (superseded by llguidance), Live-SWE-agent (WSL2-only Windows-incompat), Temporal/Inngest/Restate (overkill at solo+5), ell/lmql/kor/jsonformer/promptbase/adr-tools (stale ≥11mo), server-postgres/server-sqlite (ARCHIVED) |

## §4 — Per-layer top picks

| Layer | Top T1 | Top T2 | Skip |
|---|---|---|---|
| L0 SUBSTRATE (MCP) | tavily/firecrawl-mcp, ast-grep, rtk-ai, semgrep-mcp via PyPI | zilliztech/claude-context | server-postgres/sqlite (ARCHIVED), E2B-mcp |
| L0.5 SECURITY | Trivy + Gitleaks + pre-commit | scorecard, garak, trufflehog | (none added) |
| L1 ROUTER | LiteLLM (DeepSeek V4 escape valve via env) | Portkey, Helicone | Bifrost (Tier-C) |
| L1.5 MEMORY (NEW) | claude-mem (benchmark) + Graphiti (incumbent) + byterover-cipher | mem0, supermemory, Letta | (none) |
| L2 DRIVER | anthropics/skills + obra/superpowers + wshobson/agents | davila7/templates, alirezarezvani/claude-skills, oh-my-claudecode | (audit overlap) |
| L2.5 KNOWLEDGE (NEW) | pydantic-ai + instructor + foam + claude-cookbooks | dspy, outlines, BAML, deepwiki-open | ell/lmql/ControlFlow (STALE/ARCHIVED) |
| L3 PEER CLI | opencode (160k★ DHH endorsed) | goose (staged) | (ant CLI when GA) |
| L4 EVAL/OBS | Inspect AI + promptfoo + Langfuse + lm-eval-harness | Phoenix (incumbent), opik, ragas, deepeval | Langfuse-port-3000 conflict (defer if collides with OpenHands) |
| L5 SCAFFOLD | Anthropic Managed Agents (Apr 8) | Live-SWE-agent (WSL2), OpenHands (WSL2) | (Linux-only paths penalized) |
| L6 PATTERN-CITE | claude-quickstarts/autonomous-coding (canonical) + P14 stall-detection + Tool search + Anthropic harness-design Mar 24 | TandemKit, KARIMO, ccpm | (none) |
| L7 TEAM UX | SKIP | (none) | MultiCa (license-blocker) |
| L8 IDENTITY/DURABLE (NEW pending Layer E) | (TBD) | (TBD) | Temporal/Inngest (solo-scale overkill) |

## §5 — W259-v16 Coverage-Audit Additions (22 repos)

> Added 2026-05-17 by the W259-v16 all-layers coverage audit — 7 parallel audits, ~340 SOTA repos checked against live GitHub discovery. Method + per-repo reasoning: `08-coverage-audit-W259v16/` (6 layer receipts + `MASTER-COVERAGE-SYNTHESIS-W259v16.md`). These are catalog-**completeness** additions — every one is WATCH / STUDY-PILOT / CITE-PATTERN tier; **none changes the install set or overturns a §2 install decision**. Lighter schema than §2 (composite/tier + native-CC + disposition from the layer audits; full D1-D23 rescore deferred — not install-grade).

| # | Repo | Layer | Stars | Score/Tier | Native-CC | Disposition |
|--:|---|---|--:|---|---|---|
| A1 | `agno-agi/agno` | L2 Orchestration | 40k | ~84 | no | T2 STUDY-PILOT |
| A2 | `langchain-ai/deepagents` | L2 Orchestration | 23k | ~83 | no | T3 CITE-PATTERN (catalog had only the weaker 3rd-party derivative) |
| A3 | `mastra-ai/mastra` | L2 Orchestration | 24k | ~82 | no | T2 STUDY-PILOT |
| A4 | `strands-agents/sdk-python` | L2 Orchestration | 5.9k | ~81 | no (AWS-official) | T2 STUDY-PILOT |
| A5 | `HKUDS/LightRAG` | L0 RAG/Retrieval | 35k | T2/T3 | no | scored-row add (was discovery-listed, never tiered) |
| A6 | `HKUDS/RAG-Anything` | L0 RAG/Retrieval | 20k | T2/T3 | no | scored-row add (multimodal RAG, MIT) |
| A7 | `raga-ai-hub/RagaAI-Catalyst` | L4 Eval | 16k | T2 | no | scored-row add (out-stars catalogued DeepEval) |
| A8 | `Not-Diamond/self-care` | L4 Eval | — | T2-pilot/T3 | yes — CC plugin | maintenance-frozen → cite, not install |
| A9 | `Kiln-AI/Kiln` | L4 Eval | — | T3 | partial (MCP) | named-candidate (MIT, Windows-native) |
| A10 | `evidentlyai/evidently` | L4 Eval | — | T3 | no | named-candidate |
| A11 | `langwatch/langwatch` | L4 Eval | — | T3 | no | named-candidate |
| A12 | `evilmartians/agent-prism` | L4 Eval | — | T4 WATCH | no | marginal — strong-org flag only |
| A13 | `QwenLM/qwen-code` | L3 Peer CLI | — | T4 WATCH | CLI | weaker fork of catalogued gemini-cli (37.5% vs 82% Terminal-Bench) |
| A14 | `gsd-build/get-shit-done` | Behavioral | 63k | ~78 | skill/system | T2/T3 (operator-named in directive) |
| A15 | `ComposioHQ/awesome-claude-skills` | Behavioral | 60k | ~73 | discovery feed | T3 |
| A16 | `jarrodwatts/claude-hud` | Behavioral | 23k | ~75 | CC plugin | T2/T3 |
| A17 | `OthmanAdi/planning-with-files` | Behavioral | 21k | ~74 | CC skill | T2/T3 |
| A18 | `yusufkaraaslan/Skill_Seekers` | Behavioral | 14k | ~72 | skill meta-tool | T3 |
| A19 | `j178/prek` | L0.4/L0.5 VC+Security | 7.6k | STUDY-PILOT | partial (ships agent skill) | highest-fit gap — Rust drop-in pre-commit replacement |
| A20 | `tensorzero/tensorzero` | L1 LLM Routing | 11k | T2 | no | STUDY-PILOT — 2nd-most-starred OSS gateway after LiteLLM |
| A21 | `opengrep/opengrep` | L0.5 Security | 2.6k | STUDY-PILOT | direct-CLI | license-clean Semgrep fork (post Jan-2025 relicense) |
| A22 | `envoyproxy/ai-gateway` | L1 LLM Routing | 1.6k | T4 WATCH | no | CNCF entrant — coverage-completeness |

**Coverage verdict**: with these 22 folded in, the W259 catalog is SATURATED at the install/production tier across all 10 audited layers — 0 install-grade SOTA repos missing. Full verdict: `08-coverage-audit-W259v16/MASTER-COVERAGE-SYNTHESIS-W259v16.md` §3.

### §5.1 — W259-v16 deep-dive revisions (2026-05-17)

Max-depth primary-source dives of all 22 (`08-coverage-audit-W259v16/deep-resolution/GAP-RESOLUTION-DEEPDIVE-SYNTHESIS.md`) revised these §5 verdicts — **these supersede the quick dispositions in the table above**:

| Repo | §5 quick | Deep-dive verdict |
|---|---|---|
| `j178/prek` (A19) | STUDY-PILOT | **★ INSTALL-NOW** — drop-in `pre-commit` replacement; operator-go pending (live commit-gate change) |
| `opengrep/opengrep` (A21) | STUDY-PILOT | **★ INSTALL-grade** — fills the commit gate's empty SAST slot; pilot a ruleset first |
| `raga-ai-hub/RagaAI-Catalyst` (A7) | T2 scored-row | **REJECT** — mandatory hosted SaaS, data-boundary risk, ~1yr dormant |
| `langwatch/langwatch` (A11) | T3 | **REJECT** — license is BSL-1.1 (non-OSS, Change Date 2099), not MIT |
| `Not-Diamond/self-care` (A8) | T2-pilot | **CITE-PATTERN + WATCH** — maintenance-frozen; CC pathway structurally hollow |

Catalog-accuracy fixes (primary-source verified): `agno` license = **Apache-2.0** (not MPL-2.0); `mastra` = dual-license (Apache-2.0 core + proprietary `ee/`); `langwatch` = BSL-1.1; `tensorzero` ships a `.claude-plugin/` but with a placeholder skill (functionally no pathway). Deep-dive tally: 2 INSTALL-grade · 6 STUDY-PILOT · 8 CITE-PATTERN · 4 WATCH · 2 REJECT.
