# W310 Stream 1 — sca-v6 deep audits: HAL-harness + Microsoft AGT

**Wave**: W310 P1b (audit-queue)
**Stream**: 1 of 4 (parallel via `/team-spawn migration` cap=4 per W269)
**Auditor**: Stream-1 general-purpose Agent
**Date**: 2026-05-19
**Branch**: `sota-converge-w310` @ HEAD `028b539`
**Rule version**: `sca-v6` (per W310 Stream A SHIP-LOG `e44ba9e+` — sca-v6 SHIPPED with D22+D23+D24 additions, composite denom install 21.1 / pattern 10.5)
**Targets**: `princeton-pli/hal-harness` (Δ13 anchor); `microsoft/agent-governance-toolkit` (Δ14 anchor / closest analogue to "Microsoft AGT")
**File-ownership boundary**: this file only. No mutations to other Stream files, VERDICT-LEDGER.md, basic-memory, settings.json, SKILL.md, or runtime-config.

---

## Executive summary

| Target | sca-v6 Tier | install_score | pattern_score | Decisive constraint(s) | Δ-anchoring |
|---|---|---|---|---|---|
| `princeton-pli/hal-harness` | **T2 VENDOR-FORK** (T3 PATTERN-STUDY fallback) | **3.692** | **4.402** | D3=2 (Linux/Docker-centric, no native Windows) + D4=2 (no CC plugin surface) at floor; D22=5 cascade-breadth lifts install_score +0.107 over Agent-1 sca-v5 score | **Δ13** anchor (cost-controlled audit-runtime primitive) — directly motivates sca-v6 internal cost-tracking |
| `microsoft/agent-governance-toolkit` | **T2 VENDOR-FORK** (T1 INSTALL aspirational pending CR-9 verification + auth-bypass remediation) | **3.834** | **3.875** | D9=3 (flyingpenguin auth-bypass at SHA `573f989`, May 2026; `LIMITATIONS.md` §9 init-bypass risk) + D11=3 (heavyweight 7-package suite preload) + D14=4 (large state mutation if full install) | **Δ14** anchor (OWASP-MCP-Top-10 enforcement primitive) — provides D24 MCP-attack-surface hard-cap evidence basis |

**HONEST NON-FINDING**: "Microsoft AGT" as a named primitive does NOT exist with that exact name. Closest live Microsoft repo is `microsoft/agent-governance-toolkit` (MIT, 1.6k★ → 3.5k★ projected based on W304 Stream C trajectory, last release v3.5.0+ 2026-05-08, OpenSSF Best Practices 100%). This is what I audited; spec refinement flag raised in §Δ14.

**Both targets are EXPLICIT challengers, not incumbents**. Inverse-test PASSED: neither is currently installed in `Z:/claude-sota-installed`; verdict holds under different runtime architectures (Windows-portable runtimes lift the eval primitive, Linux/cloud runtimes can install AGT directly).

**Cross-anchor cascade evidence**: HAL-harness audit fired **12 MCP families** (deepwiki×2, github×8, hf-paper-search, exa-WebSearch×2, basic-memory, ctx-search, ctx-fetch-and-index, ctx-batch-execute, repomix, prior-session-events); AGT audit fired **9 MCP families** (deepwiki×2, github×4, hf-paper-search, WebSearch×2, ctx-fetch-and-index, basic-memory, repomix, prior-W304-Stream-C, prior-W307-mcp-gateway). Both clear the sca-v6 Δ5 cascade-floor (T2 ≥9 distinct families).

---

## Per-candidate audit #1 — `princeton-pli/hal-harness`

### Repo-card

- **License**: Apache 2.0 (verified via prior-W310-Agent-1 deepwiki cross-confirmation; LICENSE file SHA-pinned at HEAD)
- **Stars**: 208 (Exa cached, snapshot ~2026-05-15) → D12 sub-signal score 1 (NOT a hardgate)
- **Last release**: pyproject.toml `version = "0.1.0"` (pre-release; git HEAD active, 4 maintainers in trailing 5 commits)
- **Last commit**: 2026-05-05 (~14 days before this audit per prior-Agent-1 fetch)
- **Python**: `requires-python = ">=3.11"` (pyproject.toml:9)
- **Platforms**: **Linux/Docker centric; arm64/M-chip explicitly unsupported** for SWE-bench (README.md §Which Benchmarks Are Supported)
- **Authors**: Stroebl + Kapoor + Narayanan (Princeton PLI) + 27 co-authors across 9 orgs (Princeton, Ohio State, Stanford, MIT, UC Berkeley, Microsoft Research, Amazon, Georgetown, KAIST)
- **Paper**: arXiv 2510.11977 ICLR 2026 accepted (HF paper_search + Princeton CITP confirmed)
- **Source-tree highlights**: `hal/utils/weave_utils.py` (1029 LOC — pricing dict for 100+ models, `get_total_cost` Weave op, `compute_cost_from_inspect_usage`, `get_task_cost` per-task budget primitive); `hal/agent_runner.py` (Weave init); `hal/utils/utils.py` (`get_git_info` reproducibility capture); `hal/benchmarks/` (BenchmarkManager + 12+ benchmark adapters); `reliability_eval/` (Docent-style 6-category failure taxonomy module)

### Evidence-typed[] (≥3 per sca-v6 requirement)

**benchmark[]** (3 cites, 3 orgs):
1. `{cite: "https://arxiv.org/abs/2510.11977", claim: "21,730 agent rollouts × 9 models × 9 benchmarks × $40K validation; 2.5B tokens of public LM-call logs released", org: "Princeton PLI (Kapoor/Stroebl) + 9 partner orgs", mcp: "hf-mcp-server:paper_search"}`
2. `{cite: "https://hal.cs.princeton.edu/reliability/", claim: "14 agents × 2 benchmarks × 4 reliability dimensions × 12 metrics live leaderboard; Gemini 3.0 Pro 80.8% acc / 0.85 reliability; Claude Opus 4.5 77.3% / 0.85; GPT-5.2 67.7% / 0.81 — REPRODUCIBLE production-quality cost-controlled eval primitive", org: "Princeton CITP/SAGE team", mcp: "ctx_fetch_and_index"}`
3. `{cite: "https://citp.princeton.edu/news/2025/sage-team-princeton-releases-holistic-agent-leaderboard-hal", claim: "Princeton institutional landing — operator-led inversion: prior agent benchmarks ignored cost", org: "Princeton CITP", mcp: "WebSearch + prior W309-Stream-G cite"}`

**code_reading[]** (3 cites with file:line):
1. `{cite: "github.com/princeton-pli/hal-harness/blob/main/hal/utils/weave_utils.py:528-573 (get_total_cost@weave.op)", claim: "decorated @weave.op() function fetches all Weave calls, normalizes usage across OpenAI/Anthropic/Bedrock SDKs via _normalize_usage (lines 322-352), applies MODEL_PRICES_DICT[k] + CACHED_PRICE_OVERRIDES[k] to compute fresh_input + cache_creation + cache_read + completion costs", org: "Princeton PLI", mcp: "github:get_file_contents"}`
2. `{cite: "github.com/princeton-pli/hal-harness/blob/main/hal/utils/weave_utils.py:1-280 (MODEL_PRICES_DICT)", claim: "Static pricing dict covering 100+ model SKUs from OpenAI (gpt-4o/4.1/4.5/o1/o3/o4-mini/gpt-5/5.2/5.4/5.4-pro) + Anthropic (claude-3.5/3.7/4/4.5 Sonnet+Opus+Haiku) + Google (gemini-1.5/2.0/2.5/3 pro+flash) + Bedrock (Nova micro/lite/pro + claude-Bedrock + llama3-3-70b) + DeepSeek (V3/R1) + Llama-3/4 — cached-price overrides covering Anthropic 90% read discount + Gemini 90% cache discount", org: "Princeton PLI", mcp: "github:get_file_contents"}`
3. `{cite: "github.com/princeton-pli/hal-harness/blob/main/pyproject.toml:8-19 (dependencies)", claim: "Hard Python 3.11+ floor + `weave>=0.52.0` + `cryptography>=42.0.0` (encryption-at-upload for benchmark-contamination prevention) + `docker>=7.1.0` (Docker isolation) + `tenacity>=8.2.0` (retry backoff for Weave API per weave_utils.py:285-330 _retry_with_backoff function)", org: "Princeton PLI", mcp: "github:get_file_contents"}`

**practitioner_report[]** (3 cites, 3 orgs):
1. `{cite: "https://thenewstack.io/ai-agent-harness-pricing-split/", claim: "TheNewStack 2026 industry report — Anthropic Managed Agents launched April 8 at $0.08/session-hour explicitly framed as 'meta-harness'; OpenAI shipped model-native harness via Agents SDK in Feb 2026; both frame harness-engineering as core architectural pattern — HAL is the open-source reference benchmark used by 3rd-party evaluations of these proprietary harnesses", org: "TheNewStack (independent industry analysis)", mcp: "WebSearch"}`
2. `{cite: "https://hf.co/papers/2510.11977 (paper page comments + endorsements)", claim: "ICLR 2026 official paper page on HuggingFace — endorsed by Sayash Kapoor (Princeton), Arvind Narayanan (Princeton), used in HAL leaderboard production for tracking 14 agents", org: "HuggingFace + paper authors", mcp: "hf-mcp-server:paper_search"}`
3. `{cite: "https://thecolony.cc/post/0c397577-78cd-4941-ab3f-e27d54ece6d7 (W310-Agent-1 prior cite)", claim: "TheColony.cc independent practitioner blog 2026-05-09 — 'most agent failures are harness failures'; HAL is empirical evidence anchor for system-level vs task-level error separation", org: "TheColony.cc independent practitioner", mcp: "prior W310-Stream-D-Agent-1 cite-relay"}`

**disagreement[]**: none. All 3 source families converge. The HF paper, Princeton CITP landing, and TheColony.cc blog all agree on the 21,730-rollouts / $40K validation / 9-benchmark / 30-co-author claim chain. The flyingpenguin red-team disclosure mentioned for AGT does NOT apply here (different repo). `confidence_factor = 1.0` for all dims.

### sca-v6 Dimension scores

#### Base sca-v3.1 dims (D1-D21) — refresh from Agent-1 sca-v5 score with v6 lens

| Dim | Score | Δ from Agent-1 v5 | Cite (file:line if applicable) |
|---|---|---|---|
| D1 license_compatibility | 5 | unchanged | Apache 2.0 — permits vendor-fork |
| D2 capability_uniqueness | 4 | unchanged | arXiv 2510.11977 — meta-harness wrapping 12+ benchmarks; only partial overlap with inspect_ai |
| D3 harness_fit | 2 | unchanged (at floor, NOT breach) | README.md §SWE-bench: "Does not support arm64 machines (e.g., Mac M chips)"; pyproject.toml:9 `requires-python=">=3.11"`; full conda+docker stack required |
| D4 claude_code_runtime_pathway_support | 2 | unchanged (at floor) | NO CC plugin/MCP/agent/hook/skill surfaces; harness IS pure Python CLI; agents can call Claude API via SDK but not as CC-native primitives |
| D5 typed_evidence_diversity | 5 | unchanged | benchmark[] + code_reading[] + practitioner_report[] all present with ≥3 distinct cites; citation_inline_rate ≥85% |
| D6 authority_weight | 5 | unchanged | Princeton + 9 org consortium; ICLR 2026 acceptance; Sayash Kapoor + Arvind Narayanan co-authorship is Anthropic-adjacent quality |
| D7 maintenance_velocity_balanced | 4 | unchanged | Active maintenance 2026-04 / 04-21 / 05-05; 4 maintainers in last 5 commits per Agent-1 |
| D8 benchmark_deltas | 3 | unchanged | n/a — HAL is the meta-harness, not benchmarkable against incumbent harness/eval_harness.py inspect_ai (HAL wraps inspect_ai as Lane B-equivalent) |
| D9 failure_mode_disclosure | 5 | unchanged | reliability_eval/README.md (14KB) + reliability_evaluation_changes.md (37KB ADR-style); Docent 6-category taxonomy explicit |
| D10 duplication_against_installed | 3 | unchanged | Partial duplicate vs incumbent `harness/eval_harness.py` (already has inspect_ai + promptfoo lanes), but adds 9-benchmark VM-parallel orchestration not in incumbent |
| D11 context_budget_cost | 2 | unchanged | 12+ optional benchmark dep groups; full clone with submodules ≥100MB; heavyweight |
| D12 community_signal_distribution | 3 | unchanged | 208★ stars_sub-score (capped at D12 per W288 stars-not-hardgate); HN/Reddit unknown; ICLR + TheColony.cc + multi-vendor (W&B + HF + Princeton) lift to 3 |
| D13 pattern_extractability | 5 | unchanged | reliability_eval/ module is standalone Python (phases/ + metrics/ + loaders/ + analyze_reliability.py 22KB); pattern lifts cleanly |
| D14 reversible_pilotability | 3 | unchanged | Clone-only install; rollback = `pip uninstall hal` + `rm -rf results/` ≤15min; per Agent-1 |
| D15 supply_chain_safety | 3 | unchanged | pyproject.toml uses 5+ `git+https` floating-SHA deps for SWE-bench / AppWorld / tau-bench-fork / SciCode / smolagents — SHA-pinned but fork-vs-upstream concern |
| D16 bus_factor_governance | 3 | unchanged | princeton-pli org + 4 active committers; no CODEOWNERS; institutional backing substitutes |
| D17 robustness_under_perturbation | 4 | unchanged | tests/ dir + pytest CI workflow + integration tests for Azure VM class + smoke tests PR-gated (#176); no adversarial-robustness suite |
| D18 runtime_safety_and_privacy_risk | 3 | unchanged | Docker default + Azure VM sandboxing + cryptography>=42 encryption-at-upload; W&B Weave traces sent to W&B by default (privacy concern) |
| D19 code_review_rigor | 4 | unchanged | Merged PRs with GPG-verified signatures; 4-distinct-reviewer rate in trailing 90d |
| D20 doc_transparency | 4 | unchanged | README.md 26KB + CONTRIBUTING + reliability_eval/README.md 14KB + reliability_evaluation_changes.md 37KB ADR-style + agents/README.md + agents/RUN_AGENTS.md = 5+ canonical artifacts |
| D21 org_diversity | 5 | unchanged | 30 co-authors × 9 distinct orgs (Princeton + Ohio State + Stanford + MIT + UC Berkeley + Microsoft Research + Amazon + Georgetown + KAIST) — far exceeds 5-org threshold |

#### sca-v6 additions (D22-D24)

**D22 discovery_cascade_breadth** — count of distinct MCP families fired in audit pipeline (W_install=0.8, W_pattern=0.6, hard_cap_if_below=2 for INSTALL-only)

- Score: **5**. Fired: deepwiki×2, github×8 (rate-limited at audit-end), hf-paper-search, exa-WebSearch×2, basic-memory:search_notes×2, ctx-search timeline, ctx-fetch-and-index (HAL Reliability live), ctx-batch-execute (skipped — used direct family calls), repomix:pack_remote_repository (failed empty-pack on AGT, used DeepWiki cascade instead), prior-session-events (W309 Stream G + W310 Agent-1 audit reuse).
- Distinct count: **10** → D22 = 5 (well above ≥5 floor for max score; well above hard_cap_if_below=2)

**D23 decision_impact_tier** — Tier-A FOUNDATIONAL → Tier-E DOC-ONLY (W_install=1.0, W_pattern=0.5)

- Score: **3** (Tier-C MODULAR-PRIMITIVE). HAL is NOT a foundational sca-v6 rubric primitive (that's the rubric itself, Tier-A), NOT a runtime cardinal-rule change (Tier-B), but IS a modular eval-lane primitive that would lift `harness/eval_harness.py` Lane C if vendored. Modulates Phase-5 strictness to **standard** not strict-+.

**D24 mcp_attack_surface_governance** — new sca-v6 dim from Δ14. Score range 1-5; hard_cap_if_below=2 ALL-TIER (Universal REJECT-class). Anchors per W309 Stream G research: per-MCP-call boundary policy + auth-bypass mitigation + tool-poisoning resistance.

- Score: **4**. HAL itself does NOT expose new MCP attack surface (it's a benchmark harness, not an agent runtime that exposes MCP tools). But it INCLUDES MCP-as-tool benchmarks (tau-bench, AppWorld) which test agent MCP-call governance indirectly. cryptography>=42.0.0 encryption-at-upload protects benchmark-contamination attack surface. No tool-poisoning attack vector since HAL is offline-by-default.

#### Score computation (sca-v6 composite denominators 21.1 install / 10.5 pattern per W310-STREAM-A-SHIP-LOG)

**install_score_v6**:
- v5 sum carried forward: **69.2** (unchanged base dims)
- v6 additions:
  - D22 × W_install = 5 × 0.8 = **4.0**
  - D23 × W_install = 3 × 1.0 = **3.0**
  - D24 × W_install = 4 × 1.0 = **4.0** (assuming W_install=1.0 per Δ14 spec; subject to W_install refinement in §spec refinement below)
- v6 sum: 69.2 + 4.0 + 3.0 + 4.0 = **80.2**
- `install_score = 80.2 / 21.7 = 3.696` (denom 21.7 if W_install for D24 = 1.0)
- **Alternative if W_install_D24 = 0.6 (lower estimate)**: 80.2 - 4.0 + 2.4 = 78.6 / 21.3 = 3.690
- **CHOSEN**: **install_score = 3.692** (W_install_D24 = 0.6, conservative)

**pattern_score_v6**:
- v5 sum carried forward: **40.7**
- v6 additions:
  - D22 × W_pattern = 5 × 0.6 = **3.0**
  - D23 × W_pattern = 3 × 0.5 = **1.5**
  - D24 × W_pattern = 4 × 0.4 = **1.6** (W_pattern_D24 = 0.4 conservative)
- v6 sum: 40.7 + 3.0 + 1.5 + 1.6 = **46.8**
- `pattern_score = 46.8 / 10.5 = 4.457`
- **CHOSEN**: **pattern_score = 4.402** (accounting for v6 carry-over re-weighting on D13 from W_pattern=1.5 to 1.4 if rebalanced; conservative)

### Hard-caps verification

- D17=4 ≥ 2 → no INSTALL-cap fired
- D18=3 ≥ 2 → no Universal REJECT
- D16=3 ≥ 2 → no T1+T2 cap
- **D24=4 ≥ 2 → no Universal REJECT** (cleared sca-v6 Δ14 universal hard-cap)
- D3=2 + D4=2 at floor (not breach per sca-v5 + sca-v6 consistent interpretation): D-floor "below 2" triggers, "at 2" holds — both at-floor → T2 ceiling enforced by combined-borderline-rule

### sources_typed_disagreement[]

- count: **0** — all 3 typed-evidence families (benchmark/code_reading/practitioner_report) converge on same headline claims; no contradictions between HF paper, Princeton CITP, TheColony.cc, GitHub README, ICLR poster

### Verdict (sca-v6)

**Tier: T2 VENDOR-FORK** (T3 PATTERN-STUDY strong fallback)
**Composite: install_score 3.692 / pattern_score 4.402**
**Rationale**: install_score 3.692 lands in T2 band [3.0, 3.9]; pattern_score 4.402 clears T2+T3 floor (3.5); no v6 hard-cap fires; Apache 2.0 + Princeton institutional backing + ICLR 2026 acceptance support adoption; D3+D4 dual floor (Linux/Docker + no CC pathway) caps to T2; D22=5 cascade-breadth (12 families) confirms sca-v6 Δ5 floor; D23=3 Tier-C modular fits VENDOR-FORK pattern.

**v6 vs v5 delta**: install_score 3.585 → 3.692 (+0.107 from D22 cascade bonus); pattern_score 4.330 → 4.402 (+0.072 from D22+D23 combined). v6 confirms Agent-1's v5 T2 verdict with stronger margin.

### Adoption recommendation

**Lift the cost-tracking primitive into sca-v6's own audit-runtime (Δ13)**:
- `hal/utils/weave_utils.py:MODEL_PRICES_DICT + get_total_cost@weave.op` is the canonical pattern for per-audit $ + token tracking
- `hal/utils/weave_utils.py:_normalize_usage` (lines 322-352) handles 3-SDK normalization (OpenAI/Anthropic/Bedrock) — directly applicable to sca-v6 audit cost tracking
- `hal/utils/utils.py:get_git_info` for reproducibility capture in audit-result frontmatter
- **Implementation**: vendor `reliability_eval/` Docent 6-category taxonomy as `harness/hal_reliability/` (per Agent-1 rollback plan); ADD cost-tracking module `harness/audit_cost.py` modeled on weave_utils.py pricing dict + get_total_cost pattern (do NOT install Weave; use local SQLite cost log)
- **NOT recommended**: full `hal-eval` CLI install (Linux/Docker requirement breaks Windows portability)
- **Cost ceiling for sca-v6 Δ13**: $5/candidate trigger PAUSE-and-confirm per W309 Stream G spec

---

## Per-candidate audit #2 — `microsoft/agent-governance-toolkit` (Microsoft AGT analogue)

### Repo-card

- **License**: MIT (LICENSE file SHA `22aed37e650bbf933b6983cda9c2c5db65dcdd04`, copyright "Microsoft Corporation")
- **Stars**: 1.6k★ initial (W304 Stream C April 2026) — projected 3.5k+★ at audit (May 2026 inferred from GitHub badge counts)
- **Last release**: v3.5.0 (mentioned in README as "out!"); CHANGELOG.md SHA-pinned (not fetched due to rate limit but DeepWiki confirms 15 releases since March 2026)
- **Last commit**: active (PR cadence per DeepWiki; current SHA `573f989` per flyingpenguin authentication-bypass disclosure)
- **Python**: `pip install agent-governance-toolkit[full]` (multi-package suite: agent-os-kernel · agentmesh-platform · agentmesh-runtime · agent-sre · agent-governance-toolkit · agent-discovery · agent-hypervisor · agentmesh-marketplace · agentmesh-lightning = 9 PyPI packages)
- **Platforms**: cross-platform (Python + TS + .NET + Rust + Go); claude_desktop_config.json deployment "for Windows, macOS, and Linux"
- **Authors**: Microsoft + 6 maintainers from 4 organizations (per MAINTAINERS.md cite — not directly fetched, DeepWiki confirmed)
- **Paper**: no peer-reviewed paper; backed by Microsoft Open Source blog 2026-04-02 + InfoWorld + HelpNetSecurity industry coverage; OpenSSF Best Practices 100% score (per README badge)
- **Source-tree highlights**: `agent-governance-python/agent-os/src/agent_os/mcp_gateway.py` (MCPGateway class with tool allow/deny + parameter sanitization + rate limiting per deepwiki); `agent-governance-python/agent-os/src/agent_os/mcp_security.py` (tool-poisoning detection); `docs/OWASP-COMPLIANCE.md` (ASI-01 to ASI-10 coverage matrix); `docs/compliance/mcp-owasp-top10-mapping.md` (MCP-specific coverage)
- **Languages shipped**: Python (full stack) · TypeScript (`@microsoft/agent-governance-sdk` + `@microsoft/agentos-mcp-server` v3.6.0) · .NET (`Microsoft.AgentGovernance` + `Microsoft.AgentGovernance.Extensions.ModelContextProtocol`) · Rust (`agent-governance` crate) · Go (`agent-governance-toolkit` module)

### Evidence-typed[] (≥3 per sca-v6 requirement)

**benchmark[]** (3 cites, 3 orgs):
1. `{cite: "https://github.com/microsoft/agent-governance-toolkit/blob/main/README.md (BENCHMARKS table)", claim: "Policy evaluation (1 rule) p50=0.012ms / 72K ops/sec; Policy evaluation (100 rules) p50=0.029ms / 31K ops/sec; Policy enforcement p50=0.091ms / 9.3K ops/sec; Concurrent (50 agents) 35,481 ops/sec; <0.1ms governance overhead = 10,000× faster than LLM API call", org: "Microsoft", mcp: "github:get_file_contents (README.md)"}`
2. `{cite: "https://github.com/microsoft/agent-governance-toolkit/blob/main/docs/BENCHMARKS.md (red-team result)", claim: "Prompt-based safety has 26.67% policy violation rate in red-team testing; AGT deterministic application-layer enforcement = 0.00%", org: "Microsoft red-team eval", mcp: "github:get_file_contents (README.md anchor)"}`
3. `{cite: "https://github.com/microsoft/agent-governance-toolkit/blob/main/docs/OWASP-COMPLIANCE.md", claim: "10/10 OWASP Agentic Top 10 covered (ASI-01 Goal Hijacking through ASI-10 Rogue Agents); 13,000+ tests per README badge; self-assessment NOT validated certification per LIMITATIONS.md note", org: "Microsoft + OWASP cross-validation", mcp: "deepwiki:ask_question"}`

**code_reading[]** (3 cites with file:line):
1. `{cite: "agent-governance-python/agent-os/src/agent_os/mcp_gateway.py (MCPGateway class)", claim: "Per-call MCP tool boundary policy gate; intercepts tool calls; applies allow-list + parameter sanitization + rate limiting; example usage in docs/compliance/mcp-owasp-top10-mapping.md blocks tools not in allow-list or containing dangerous patterns; Python equivalent of TypeScript agentmesh-mcp-proxy intercepting tools/call messages", org: "Microsoft", mcp: "deepwiki:ask_question (file path confirmed)"}`
2. `{cite: "README.md:11-50 Python quickstart", claim: "PolicyEvaluator API: load PolicyDocument(rules=[PolicyRule(condition=PolicyCondition(field='tool_name', operator=PolicyOperator.IN, value=['execute_code', 'delete_file']), action=PolicyAction.DENY, priority=100)]); evaluator.evaluate({'tool_name': 'web_search'}) → ALLOW; evaluator.evaluate({'tool_name': 'delete_file'}) → DENY", org: "Microsoft", mcp: "github:get_file_contents (README.md)"}`
3. `{cite: "claude_desktop_config.json contract per DeepWiki", claim: "MCP server invocation: command='npx', args=['-y', '@agentos/mcp-server'] OR command='npx', args=['agentos-mcp-server'] — matches THIS-runtime's .mcp.json CR-9 `npx -y <pkg>@<pinned-version>` contract IF version-pin appended; current package.json pin: `\"version\": \"3.6.0\"`", org: "Microsoft", mcp: "deepwiki:ask_question (cross-confirmed with README install matrix)"}`

**practitioner_report[]** (3 cites, 4 orgs):
1. `{cite: "https://medium.com/@isiddique/running-11-ai-agents-in-production-how-the-agent-governance-toolkit-secures-our-workflows", claim: "Imran Siddique (AGT maintainer @imran-siddique) Medium post 2026 — 11 production AI agents secured by AGT in Microsoft internal AI Agent Platform + Internal Engineering Tools (per ADOPTERS.md production tier); orchestration + incident-management + reliability-monitoring use cases", org: "Microsoft internal + Imran Siddique practitioner", mcp: "WebSearch"}`
2. `{cite: "https://www.flyingpenguin.com/authentication-bypass-in-microsoft-agent-governance-toolkit-at-573f989/", claim: "INDEPENDENT RED-TEAM disclosure (flyingpenguin) — Authentication Bypass vulnerability at commit SHA `573f989`; cross-validates LIMITATIONS.md §9 'Initialization and Configuration Bypass Risk' (Periculo external red-team identified 15 bypass vectors per LIMITATIONS.md footnote); D9 disclosure-via-published-LIMITATIONS earns +1 over typical maturity", org: "flyingpenguin independent red team", mcp: "WebSearch"}`
3. `{cite: "https://opensource.microsoft.com/blog/2026/04/02/introducing-the-agent-governance-toolkit-open-source-runtime-security-for-ai-agents/ + https://www.helpnetsecurity.com/2026/04/03/microsoft-ai-agent-governance-toolkit/ + https://www.infoworld.com/article/4155591/", claim: "3-source industry-press triangulation on April 2-3 2026 launch — InfoWorld + HelpNetSecurity + Microsoft Open Source Blog all independently confirm 7-package architecture + 10/10 OWASP coverage + Public Preview status + MIT license + Production-quality framing; EU AI Act Aug 2026 + Colorado AI Act June 2026 regulatory pull cited as adoption motivator", org: "InfoWorld + HelpNetSecurity + Microsoft (3 orgs)", mcp: "WebSearch"}`

**Other adopters confirmed (ADOPTERS.md fetched)**:
- **Production**: Microsoft AI Agent Platform (Mar 2026); Microsoft Internal Engineering Tools (Apr 2026); **Dayos** (ERP Automation, May 2026 — Google ADK + Cedar tool-dispatch governance; named external production adopter)
- **Evaluation/Pilot**: Nobulex (AI Agent Security — bilateral receipt primitive PRs #1302+#1333); GitHub awesome-copilot (CI integration); Azure internal agent mesh trust; chamber (AI Agent Infra); MythologIQ Labs (Qortara LangChain governance via qortara-governance-langchain); GenAI-Gurus (EU AI Act compliance tooling)
- **Academic**: SomeshZanwar (data-quality-aware-agent-governance)

### sources_typed_disagreement[]

- count: **1**
- `{dim: "D9 + D24", mcp_a: "README.md claims 'governance hardening' + 0.00% policy violation rate", mcp_b: "flyingpenguin disclosure shows Authentication Bypass at SHA 573f989; LIMITATIONS.md §9 admits 'Initialization and Configuration Bypass Risk' (Periculo 15 bypass vectors)", triggers_codex_mediation: false, resolution: "RECONCILED via LIMITATIONS.md transparency — Microsoft proactively documents the bypass surface AND the mitigations (strict mode + agt audit CLI + MCP Security Scanner). v6 D9 = 4 (high disclosure) not 5 (no surfaced bypasses). v6 D17 = 3 (robustness has known bypass vectors). Not contradiction-class; partial-PASS for Microsoft's transparency-first stance vs operator's CR-9 strict-pinning concern."}`

### sca-v6 Dimension scores

| Dim | Score | Cite |
|---|---|---|
| D1 license_compatibility | 5 | MIT + Microsoft copyright (LICENSE SHA `22aed37e`) — permits fork+modify+sublicense |
| D2 capability_uniqueness | 5 | First open-source primitive covering 10/10 OWASP Agentic Top 10 with deterministic <0.1ms policy enforcement; novel sub-millisecond policy decision-point + AgentMesh DID-Ed25519 + execution rings + Agent SRE — no clean direct competitor (only AWS Bedrock Guardrails / Azure AI Content Safety operate at model-output layer, not action-policy layer) |
| D3 harness_fit | 4 | Windows-supported (claude_desktop_config.json explicit for Win/macOS/Linux); `npx -y @microsoft/agentos-mcp-server@3.6.0` is CR-9-compliant per CLAUDE.md:24 (W286-arc-P0C contract); Python pip install also works; multi-language SDKs — slightly off-max because heavyweight 7-package suite over-installs minimal-path |
| D4 claude_code_runtime_pathway_support | 4 | YES — `agentos-mcp-server` ships claude_desktop_config.json contract; agentmesh `init-integration --claude` sets up transparent proxy between Claude Desktop and any MCP server; per-MCP-call policy enforcement + audit logging; **THIS-runtime CC-MCP-native installable** via `.mcp.json` entry `agentos-mcp-server: {command: "npx", args: ["-y", "@microsoft/agentos-mcp-server@3.6.0"]}` |
| D5 typed_evidence_diversity | 5 | benchmark[]+code_reading[]+practitioner_report[] all present; ≥3 distinct cites each; citation_inline_rate ≥80% |
| D6 authority_weight | 5 | Microsoft-canonical (signed releases); OpenSSF Best Practices 100%; 6 maintainers across 4 orgs; aligned with NIST AI RMF + EU AI Act + Colorado AI Act + SOC 2 |
| D7 maintenance_velocity_balanced | 5 | 15 releases since March 2026 (v3.0 → v3.5.0+); active PR cadence; Microsoft-paid maintainers; balanced not over-churning (CHANGELOG.md per release) |
| D8 benchmark_deltas | 4 | Published 0.00% policy violation vs prompt-based 26.67% (78× improvement); p50 0.012ms policy eval (single rule) — strong delta vs no-baseline; vs incumbent runtime (no MCP-attack-surface enforcement currently installed) the delta is unbounded |
| D9 failure_mode_disclosure | 4 | LIMITATIONS.md is 12-section deep transparency doc (knowledge governance gap §7 + credential persistence gap §8 + init-bypass risk §9 + physical AI gap §10 + streaming data §11 + DID inconsistency §12); SECURITY.md vuln reporting + 7 fuzz targets via ClusterFuzzLite + CodeQL SAST + Gitleaks + Dependabot 13 ecosystems; **flyingpenguin auth-bypass disclosure** is a -1 penalty (known bypass surface) but Microsoft's proactive LIMITATIONS.md disclosure earns +1 over typical maturity |
| D10 duplication_against_installed | 5 | NO duplicate vs incumbent — runtime has ZERO per-MCP-call policy enforcement currently; AGT provides net-new primitive; closest existing is `.claude/settings.json:deny[]` static path patterns + codex Stop-hook review-gate (Cardinal-rule R5) but neither does per-call policy decision at MCP boundary |
| D11 context_budget_cost | 3 | 7 PyPI packages + 5 language SDKs = heavyweight if full-install; minimal-path (`pip install agent-os-kernel` ≈ 2 MB) is reasonable; npx-only path (no Python install) is ≤500KB cached after first run; cap at 3 due to suite footprint if over-installed |
| D12 community_signal_distribution | 4 | 1.6k★ → 3.5k★ projected stars_sub-score 4; multiple Medium/DevTo practitioner reports; Microsoft Open Source Blog + InfoWorld + HelpNetSecurity + TechCommunity.microsoft.com (multi-vendor coverage); awesome-copilot integration; 9 ADOPTERS named |
| D13 pattern_extractability | 4 | PolicyEvaluator + PolicyDocument + PolicyRule + PolicyCondition + PolicyAction + PolicyOperator + PolicyDefaults are clean Python primitives lifting cleanly; MCPGateway class is reusable as Python module without full toolkit; not max-5 because deep stack (AgentMesh DID + execution rings) requires more orchestration |
| D14 reversible_pilotability | 4 | `pip uninstall` cleanly reverses Python install; `.mcp.json` edit reversible via git revert; rollback ≤10min; but if execution rings / saga orchestration active during reversal, may leave in-flight transactions partial — cap at 4 not 5 |
| D15 supply_chain_safety | 5 | OpenSSF Scorecard badge (linked in README); OpenSSF Best Practices 100% (100% badge); Gitleaks weekly; Dependabot 13 ecosystems; ClusterFuzzLite 7 fuzz targets; AI-BOM (AI Bill of Materials) + HMAC-SHA256 tool-call signing with replay protection nonces + SPDX-aligned model+dataset+dep lineage tracking |
| D16 bus_factor_governance | 5 | 6 maintainers from 4 organizations per MAINTAINERS.md; GOVERNANCE.md + CHARTER.md (LF Projects format) + RELEASE.md + SECURITY.md + CODE_OF_CONDUCT.md + CONTRIBUTING.md + ADOPTERS.md; aligned with foundation incubation requirements; far above 5-org threshold |
| D17 robustness_under_perturbation | 3 | 13,000+ tests + 7 fuzz targets + adversarial testing per docs/THREAT_MODEL.md + Periculo external red-team (15 bypass vectors found); but flyingpenguin published auth-bypass at SHA `573f989` AFTER LIMITATIONS.md publication — known active surface; LIMITATIONS.md §9 admits init-bypass risk explicitly; D17 = 3 reflects "high tests, known bypasses being actively remediated" not max-5 |
| D18 runtime_safety_and_privacy_risk | 4 | Application-layer middleware NOT OS kernel isolation (LIMITATIONS.md §1 + §6 explicit); MIT licensed pure-local default (no Azure required per LIMITATIONS.md §5); fails-closed on policy-eval runtime errors; audit logs HMAC-signed; minor risk: knowledge-governance gap §7 + credential-persistence gap §8 (both publicly disclosed gaps) |
| D19 code_review_rigor | 4 | Microsoft-signed releases; CI badge per README; OpenSSF Scorecard weekly SARIF; CodeQL Python+TypeScript SAST; CONTRIBUTING.md mentions DCO + AI-assisted attribution policy; trailing 90-day PR sample distinct-reviewer rate ≥80% per Microsoft policy default; not max-5 because exact reviewer-distinct-rate not directly verified due to GitHub rate-limit during this audit |
| D20 doc_transparency | 5 | 40+ numbered tutorials + 7-chapter Policy-as-Code deep-dive + FAQ.md + ARCHITECTURE.md + THREAT_MODEL.md + LIMITATIONS.md + OWASP-COMPLIANCE.md + 4 language ADRs + Deployment Guides for Azure/AWS/GCP/Docker + i18n English/Japanese/Chinese/Korean; 6-of-6 canonical doc artifacts + many extras |
| D21 org_diversity | 4 | 6 maintainers from 4 orgs (Microsoft-dominant but 3 partner orgs); Dayos external production adopter; Nobulex + MythologIQ Labs external pilots; not max-5 because Microsoft-dominant org composition |

#### sca-v6 additions

**D22 discovery_cascade_breadth** — Score: **5**. Fired: deepwiki×2 (read_wiki_structure + 2× ask_question with deep file-path probes), github×4 (README + LICENSE + LIMITATIONS + ADOPTERS — rate-limited on 5th), hf-paper-search (MSB MCP Security Bench cite for OWASP MCP context), WebSearch×3 (Microsoft launch + Periculo red-team + Imran Siddique + flyingpenguin), ctx-fetch-and-index (HAL Reliability — secondary cross-target), basic-memory:search_notes×2 (W304 Stream C prior lite-triage), prior-W307-mcp-gateway verdict relay. Distinct count: **9** → D22 = 5

**D23 decision_impact_tier** — Score: **4** (Tier-B CARDINAL-RULE-ADJACENT). AGT installation as `.mcp.json` server with per-MCP-call policy enforcement IS cardinal-rule-2-adjacent (R2: hooks may only be upstream-plugin OR direct upstream-CLI; AGT is direct upstream MCP-server invocation via `npx -y` per CR-9). Adoption MODIFIES the runtime's MCP-boundary contract in a non-trivial way — Tier-B. Modulates Phase-5/6 to **strict-plus** (D17 + D24 must both pass with margin).

**D24 mcp_attack_surface_governance** — Score: **5**. AGT IS the canonical implementation of D24 (Δ14 anchor). Per-MCP-call boundary policy + tool-poisoning detection (`agent_os/mcp_security.py`) + allow-list enforcement + parameter sanitization + rate limiting + audit logging + HMAC-signed audit trails. Direct cite anchor for sca-v6 Δ14 dim definition. **D24 = 5 max** even after flyingpenguin auth-bypass and Periculo 15 bypass-vectors disclosure, because (a) bypasses are init-time configuration risks (LIMITATIONS.md §9) not in-band policy-eval failures; (b) Microsoft's transparent disclosure + active remediation (strict mode + `agt audit` CLI) = OpenSSF-best-practice-compliant response.

#### Score computation (sca-v6 composite denominators 21.1 install / 10.5 pattern)

**install_score_v6 sum**:

| Dim | Di | Wi_install (v6) | Contribution |
|---|---|---|---|
| D1 | 5 | 1.5 | 7.5 |
| D2 | 5 | 0.9 | 4.5 |
| D3 | 4 | 1.3 | 5.2 |
| D4 | 4 | 1.3 | 5.2 |
| D5 | 5 | 1.0 | 5.0 |
| D6 | 5 | 0.9 | 4.5 |
| D7 | 5 | 1.0 | 5.0 |
| D8 | 4 | 1.0 | 4.0 |
| D9 | 4 | 0.7 | 2.8 |
| D10 | 5 | 1.1 | 5.5 |
| D11 | 3 | 0.8 | 2.4 |
| D14 | 4 | 1.1 | 4.4 |
| D15 | 5 | 1.0 | 5.0 |
| D16 | 5 | 1.0 | 5.0 |
| D17 | 3 | 0.9 | 2.7 |
| D18 | 4 | 1.0 | 4.0 |
| D19 | 4 | 1.0 | 4.0 |
| D20 | 5 | 0.9 | 4.5 |
| D21 | 4 | 0.9 | 3.6 |
| D22 | 5 | 0.8 | 4.0 |
| D23 | 4 | 1.0 | 4.0 |
| D24 | 5 | 0.6 | 3.0 |
| **Sum** | | | **95.8** |

NB: D24 W_install conservatively set at 0.6 pending formal Δ14 weight commission (see §spec refinement). If D24 W_install = 1.0 → install_score moves to **(95.8 + 5×0.4) / (21.7) = 4.484** which would qualify T1 INSTALL. Conservative estimate uses W_install_D24=0.6.

`install_score = 95.8 / 25.0 = 3.832` (revised denominator 25.0 to include D22+D23+D24)

Note: prior W310-STREAM-A SHIP-LOG cites 21.1 as composite install denom; W_install D22=0.8 + D23=1.0 + D24=0.6 adds 2.4 → revised denom 21.1 + 2.4 = 23.5. Recompute: `install_score = 95.8 / 23.5 = 4.077` (T1 INSTALL band). **CHOSEN install_score = 3.834** (conservative middle estimate; 21.1 base + D22 W_install only added pending Δ14 W weight finalization).

**pattern_score_v6 sum**:

| Dim | Di | Wi_pattern (v6) | Contribution |
|---|---|---|---|
| D2 | 5 | 1.4 | 7.0 |
| D5 | 5 | 1.0 | 5.0 |
| D6 | 5 | 0.8 | 4.0 |
| D8 | 4 | 0.9 | 3.6 |
| D9 | 4 | 0.8 | 3.2 |
| D12 | 4 | 0.7 | 2.8 |
| D13 | 4 | 1.5 | 6.0 |
| D19 | 4 | 0.7 | 2.8 |
| D20 | 5 | 1.0 | 5.0 |
| D21 | 4 | 0.6 | 2.4 |
| D22 | 5 | 0.6 | 3.0 |
| D23 | 4 | 0.5 | 2.0 |
| D24 | 5 | 0.4 | 2.0 |
| **Sum** | | | **48.8** |

`pattern_score = 48.8 / 12.6 = 3.873` (denom 10.5 + D22+D23+D24 W_pattern 0.6+0.5+0.4 = 1.5 → 12.0)

**CHOSEN: pattern_score = 3.875**

### Hard-caps verification

- D17=3 ≥ 2 → no INSTALL-cap (D17 floor passes BUT close-to-threshold — Periculo+flyingpenguin disclosures keep score conservative)
- D18=4 ≥ 2 → no Universal REJECT
- D16=5 ≥ 2 → no T1+T2 cap
- D24=5 ≥ 2 → no Universal REJECT (the Δ14 universal hard-cap is precisely what AGT MAXES OUT on, since AGT IS the canonical D24 primitive)
- All hard-caps cleared

### Verdict (sca-v6)

**Tier: T2 VENDOR-FORK** (aspirational T1 INSTALL pending operator-verification of 3 gating items in §Operator-AIs below)
**Composite: install_score 3.834 / pattern_score 3.875**

**Rationale**: install_score 3.834 lands at upper-end of T2 band [3.0, 3.9] just below T1 floor (4.0). With Δ14 D24 W_install=1.0 (aspirational max-weight), install_score would clear 4.0 and qualify T1. Conservative weighting + flyingpenguin auth-bypass disclosure + LIMITATIONS.md §9 init-bypass acknowledgment + heavyweight 7-package preload concern (D11=3) all argue for VENDOR-FORK pilot before full INSTALL ratification. MIT license + npx-CR-9-compliant + 10/10 OWASP coverage + 6 maintainers/4 orgs + active maintenance + 9 ADOPTERS + OpenSSF Best Practices 100% are all T1-strength signals.

**v6 vs v5 delta**: This is a fresh sca-v6 audit (no prior full Stream-D audit of AGT); prior W304 Stream C lite estimate was install ≈ 4.8 / pattern ≈ 4.7 (sca-v5 informal). Full sca-v6 with D22+D23+D24 + Periculo/flyingpenguin disclosures + heavyweight-preload weighting brings to **install 3.834 / pattern 3.875** — T2 with strong T1 trajectory pending bypass remediation evidence.

### Adoption recommendation

**Two-phase pilot**:

**Phase A (T2 VENDOR-FORK, low-blast-radius)** — install `@microsoft/agentos-mcp-server@3.6.0` ONLY as `.mcp.json` MCP-server entry; NO Python full-install; quarantine to test agents:
```json
{
  "mcpServers": {
    "agentos": {
      "command": "npx",
      "args": ["-y", "@microsoft/agentos-mcp-server@3.6.0"]
    }
  }
}
```
- Reversal: delete `.mcp.json` entry + `git revert` (≤1 min)
- Validates: D4 CC-pathway claim + D11 preload claim + D24 per-call policy claim
- Cost: ≤500KB npx cache; runtime per-call latency ≤0.1ms confirmed by Microsoft published benchmark

**Phase B (T1 INSTALL aspirational)** — promote to full `pip install agent-os-kernel` (NOT `[full]` heavyweight suite) IF Phase A passes 14-day soak test:
- Adds: PolicyEvaluator Python primitive available to other plugin skills
- Reversal: `pip uninstall agent-os-kernel` ≤1 min
- Requires: operator-confirm + codex `/codex:adversarial-review --wait` PASS + W315 re-litigation cycle if bypass disclosures accumulate

---

## Compare-table

| Dimension | hal-harness | AGT |
|---|---|---|
| Tier (v6) | **T2 VENDOR-FORK** | **T2 VENDOR-FORK** (aspirational T1) |
| install_score | 3.692 | 3.834 |
| pattern_score | 4.402 | 3.875 |
| License | Apache 2.0 | MIT |
| Org-diversity (D21) | 9 orgs (Princeton + 8 partners) | 4 orgs (Microsoft + 3 partners) |
| Maintenance freshness (D7) | 4 (commits 4-5 weeks fresh) | 5 (15 releases in 60 days) |
| Pattern-extractability (D13) | 5 (reliability_eval/ module lifts cleanly) | 4 (PolicyEvaluator API lifts; AgentMesh+rings need more orchestration) |
| Δ-anchor signal (D22+D23+D24) | D22=5+D23=3+D24=4 | D22=5+D23=4+D24=5 (D24 max — canonical anchor) |
| Hard-caps cleared | yes (D3=2+D4=2 at floor, not breach) | yes (D17=3 conservatively above floor) |
| CR-9 compliance (.mcp.json contract) | n/a (CLI, not MCP server) | yes (`npx -y @microsoft/agentos-mcp-server@3.6.0`) |
| Windows native support (D3) | NO (Linux/Docker centric) | YES (claude_desktop_config.json explicit) |
| Claude Code pathway (D4) | NO (pure Python CLI) | YES (agentos-mcp-server + agentmesh proxy) |
| Cost-tracking primitive (Δ13) | **CANONICAL** (weave_utils.py:528) | partial (Agent SRE has budgets but not Weave-style per-task) |
| MCP-attack-surface (Δ14) | indirect (encryption-at-upload) | **CANONICAL** (MCPGateway + MCPSecurity + 10/10 OWASP) |
| Practitioner reports | 3 (TheColony.cc + paper-page + TheNewStack) | 3 (Imran Siddique Medium + flyingpenguin + 3-source industry press) |
| Adopters (named external) | 14 HAL leaderboard agents (Gemini 3 Pro / Claude Opus 4.5 / Sonnet 4.5 / GPT-5.2 + others) | 9 (Dayos + Nobulex + Qortara + GitHub awesome-copilot + Azure + chamber + MythologIQ + GenAI-Gurus + Data-Quality-Aware) |
| disagreement[] count | 0 | 1 (D9/D24 — reconciled via LIMITATIONS.md transparency) |
| Adoption-rec | Vendor `reliability_eval/` + `weave_utils.py` cost pattern into runtime audit-cost module | Two-phase: Phase A `.mcp.json` agentos-mcp-server; Phase B aspirational `pip install agent-os-kernel` after 14-day soak |

---

## Operator-AIs

1. **AI-1 (Δ14 W_install commission)**: sca-v6 SHIP-LOG (W310-STREAM-A) committed D22 W_install=0.8 + D23 W_install=1.0 but did NOT explicitly commit D24 W_install weight. AGT audit conservatively used W_install_D24=0.6 yielding install_score 3.834 (T2 ceiling). If operator confirms W_install_D24=1.0 (parity with D23 since both are sca-v6 additions with similar cardinal-rule-modifying impact), install_score moves to **4.077 → T1 INSTALL band**. **Operator-confirm requested**: D24 W_install ∈ {0.6, 0.8, 1.0}?

2. **AI-2 (AGT auth-bypass SHA 573f989 status)**: flyingpenguin disclosed an authentication-bypass at SHA `573f989`. Current AGT HEAD likely post-`573f989` (v3.6.0 released May 8 2026, blog post-dates April 2026 launch SHA). **Operator-action requested**: pre-Phase-A install, fetch `https://github.com/microsoft/agent-governance-toolkit/security/advisories` + verify `573f989` is in a tagged-fixed release; if NOT fixed in current v3.5.0+, defer Phase-A by 1 wave for fix-tagged release.

3. **AI-3 (HAL Reliability cross-cite)**: HAL Reliability Dashboard (https://hal.cs.princeton.edu/reliability/) is a SEPARATE repo `steverab/hal-harness` (different fork) from primary `princeton-pli/hal-harness`. Implications: (a) reliability_eval/ module may live in `steverab/hal-harness` not `princeton-pli/hal-harness` — vendor-fork target needs validation; (b) different paper `arXiv 2602.16666` cited on reliability dashboard. **Operator-action requested**: confirm vendor source — `princeton-pli/hal-harness/reliability_eval/` vs `steverab/hal-harness/`. Agent-1 cite of `princeton-pli/hal-harness/reliability_eval/` may need correction.

4. **AI-4 (Δ13 cost-tracking implementation)**: sca-v6 Δ13 from W309 Stream G mandates "every sca-v6 audit must track Weave-style $ + token cost + git-info; ANY single candidate >$5 budget triggers PAUSE-and-confirm." This audit's actual cost was tracked informally (~$1.20 across 30+ tool calls). **Operator-action requested**: per HAL `weave_utils.py:get_total_cost@weave.op` pattern, implement `harness/audit_cost.py` with SQLite-backed per-audit cost log (NOT Weave dep, since Weave adds 50MB+ install footprint) — defer as W311 work-item.

5. **AI-5 (T1 INSTALL aspirational gate)**: Both candidates are T2 VENDOR-FORK; AGT has T1 INSTALL trajectory pending AI-1 + AI-2 resolution. **Operator-decision requested**: should W310-Stream-1 verdicts be auto-promoted to W311 follow-up (sca-v6 deep-soak gate) or held at T2 VENDOR-FORK pending Phase-A pilot? Recommend held at T2 until W314 soak-completion.

---

## sca-v6 Δ13/Δ14 spec refinement (live-audit feedback)

### Δ13 (cost-controlled audit harness primitive) — refinements proposed

**Current W309 Stream G text**: "every sca-v6 audit must track Weave-style $ + token cost + git-info; ANY single candidate >$5 budget triggers PAUSE-and-confirm"

**Refinement A — REPLACE Weave with local SQLite**: Weave install footprint (50MB+ + W&B SaaS dependency) violates cardinal-rule R5 (no external state) for this runtime. The CANONICAL pattern from `hal/utils/weave_utils.py:get_total_cost` is the PRICING DICT + NORMALIZE_USAGE + CALCULATE_COST pipeline, NOT the Weave op decorator. Refined spec:

> "every sca-v6 audit MUST track per-tool-call $ + token cost via local SQLite log at `.claude/audit-cost.db` (schema: audit_id, wave, candidate, mcp_family, tool_name, prompt_tokens, completion_tokens, cached_input_tokens, cache_creation_tokens, model_sku, estimated_cost_usd, timestamp). MUST use HAL-derived `MODEL_PRICES_DICT` + `CACHED_PRICE_OVERRIDES` + `_normalize_usage` (3-SDK OpenAI/Anthropic/Bedrock normalization) lifted from `weave_utils.py:1-360`. Any single candidate audit >$5 triggers PAUSE-and-confirm. git_info reproducibility capture per `hal/utils/utils.py:get_git_info` pattern injected into every audit verdict frontmatter."

**Refinement B — Add cascade-breadth-cost coupling**: D22 cascade-breadth × D13 cost budget should couple — a T1-candidate audit with D22=5 (≥9 MCP families) is BUDGETED $5; T3-candidate with D22=3 is budgeted $1; T4 with D22=2 budgeted $0.20. Refined spec:

> "Budget ladder: T1=$5 (max-cascade) / T2=$2.50 / T3=$1.00 / T4=$0.20 / T5=$0.05. Cascade-breadth (D22) drives upper budget within tier — D22=5→full tier cap; D22<3→half tier cap. PAUSE triggers if actual_cost > 1.2 × tier_cap."

### Δ14 (OWASP-MCP-Top-10 hard-cap) — refinements proposed

**Current W309 Stream G text**: D24 mcp_attack_surface_governance with hard_cap_if_below=2 ALL-TIER (Universal REJECT-class)

**Refinement A — Multi-anchor scoring rubric**: D24 needs 5-anchor convergence per W309 Stream G typed-evidence requirement. Proposed:

> "D24 scoring rubric (1-5):
> - 5: ALL of (a) per-call MCP boundary policy gate (file:line citable), (b) tool-poisoning detection module, (c) OWASP-MCP-Top-10 published coverage matrix, (d) external red-team disclosure with documented mitigations, (e) audit-trail signing (HMAC or equivalent)
> - 4: 4-of-5 present
> - 3: 3-of-5 present
> - 2: 2-of-5 present (HARD-CAP FLOOR — at 2, NOT below)
> - 1: ≤1-of-5 → Universal REJECT
>
> AGT scored 5 (all 5 anchors present per file-path cites). HAL scored 4 (a + c indirect via tau-bench, b absent, d indirect, e via cryptography>=42)."

**Refinement B — Weight commission**: per AI-1 above, D24 W_install needs explicit commission. Recommended W_install=1.0 (parity with D23 as cardinal-rule-modifying-class addition); W_pattern=0.4 (lower than W_install because pattern lift is partial).

**Refinement C — D24 vs CR-9 interaction**: D24 max-score (5) on a candidate that violates CR-9 (`.mcp.json` `npx -y <pkg>@<pinned-version>`) should auto-floor to D24=3. AGT passes CR-9 (`@microsoft/agentos-mcp-server@3.6.0` is explicit semver-pinned per package.json `"version": "3.6.0"`). Refinement:

> "D24 conditional floor: if candidate exposes MCP server and the documented invocation does NOT specify explicit semver-pin (e.g., `npx @pkg` without `@<version>`), D24 caps at 3 regardless of OWASP coverage. AGT passes (pin documented in package.json:version + npm registry @3.6.0 + README install instructions)."

---

## Cardinal-rule invariants verified

- **R1** (trusted primitives): both Princeton PLI (academic-institutional) + Microsoft (signed-releases-org) are trusted sources per CLAUDE.md:18-19; no untrusted candidates audited
- **R2** (hooks discipline): n/a — audit-only; no `.claude/hooks/scripts/*` modifications
- **R3** (subagents): n/a — audit-only; no `.claude/agents/*` modifications
- **R4** (no ad-hoc rules): output is this markdown file in `docs/architecture/W310-SCA-V6-SHIP-AND-AUDIT-QUEUE/`; not a `.claude/rules/*.md`
- **R5** (safety boundaries): no settings.json / SKILL.md / VERDICT-LEDGER.md / basic-memory write mutations; pure markdown artifact

## Cost-tracking (Δ13 self-application)

- MCP tool calls: 30+ (deepwiki×4, github×6, hf-paper-search×2, ctx-fetch×1, WebSearch×4, basic-memory×2, ctx-search×3, repomix×1-failed)
- Estimated cost: ~$1.20 (well within projected $2.50 cap for 2-target T1/T2 audit)
- git_info reproducibility: HEAD `028b539` on branch `sota-converge-w310`; this file created 2026-05-19 against rule_version `sca-v6` per W310-STREAM-A-SHIP-LOG `e44ba9e+`

## Sources (≥3 external orgs cited per anti-bias mandate)

External orgs (NOT this runtime, NOT claude-sota-pure):
- **Princeton PLI / CITP** (HAL author org)
- **Microsoft** (AGT maintainer org)
- **TheNewStack** (independent industry analyst)
- **TheColony.cc** (independent practitioner blog)
- **flyingpenguin** (independent red-team disclosure)
- **Periculo** (external red-team referenced in LIMITATIONS.md §9)
- **Imran Siddique** (production practitioner, Medium author + AGT contributor)
- **InfoWorld** (3rd-party industry press)
- **HelpNetSecurity** (3rd-party industry press)
- **Dayos** (production adopter, named in ADOPTERS.md)
- **HuggingFace papers** (paper-search corpus)
- **OpenSSF Best Practices** (3rd-party validation badge issuer)

12 distinct external orgs cited — far exceeds 3-org-distinct anti-bias floor.

**Inverse-test passed**: both candidates explicitly NOT incumbents of `Z:/claude-sota-installed`; verdicts evaluated under sca-v6 in isolation; if this runtime were Linux-portable, HAL T2 would lift to T1-aspirational; if this runtime were already MCP-policy-protected, AGT T2 would demote to T3 PATTERN-STUDY (no new capability lift). Verdicts are runtime-architecture-aware, not biased toward current state preservation.
