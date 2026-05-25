# W259-v6 — Per-Layer Benchmark Scorecard (every layer ranked on its canonical hard benchmark)

> **Operator directive**: "EVERY LAYER NEED FULL COVERAGE OF SOTA REPOS AND BENCHMARK AND RANK WITH MULTI-DIMENSIONAL SCORES."
> **Method**: each layer ranked on its CANONICAL HARD benchmark (independent, reproducible) — NOT vendor-marketing metrics. Wave-6: 5 agents (4 benchmark + 1 cognee-verify). Consolidates `BENCHMARK-SCORECARD-{A,B,C,D}-W259v6.md` + `COGNEE-INTEGRATION-CLAUDE-W259v6.md`.
> **Cite-class**: `effective_tier=TIER-3-LOCAL-COMPOSITION`.

## §0 — The benchmark-integrity method (3 contamination classes)

W259-v4 found the mem0/LoCoMo error; Wave-6 generalized the fix to every layer. Three contamination classes were hunted:

1. **Vendor-self-published benchmark** (E1/E5) — repo's own benchmark or repo-description self-claim (mem0 LoCoMo / Bifrost "50×" / promptfoo "used by OpenAI+Anthropic").
2. **Layer/unit mismatch** (NEW Wave-6) — canonical agent benchmarks rank **models**, not frameworks/CLIs. Scoring a framework with a model-level number is the same error class. (BENCH-C finding.)
3. **Judge-uncontrolled benchmark** (NEW Wave-6) — LongMemEval's leaderboard swings 52 points from LLM-judge choice alone (Engram finding). Top-N can be a statistical tie.

**Rule**: D3 (star-velocity) + D8 (industry-adoption) must be sourced from INDEPENDENT data. Star counts are NOT a benchmark.

## §1 — Per-layer benchmark scorecards

### L0 — MCP Substrate
- **Canonical benchmark**: AgentRank 8-signal composite (`agentrank-ai.com` / OSS engine `superlowburn/agentrank`; 27,553+ MCP servers; **stars weighted lowest** — built to repudiate star-ranking).
- **Top-3 ranked**: ① microsoft/playwright-mcp (AR 94.5) · ② modelcontextprotocol/inspector (AR 88.1) · ③ github/github-mcp-server (AR 85.4) + MCP-SDK family (AR 85-92).
- **Flagged**: opencode "160,923★", claude-mem "~76,000★", caveman "~60,762★" — star-proxy contamination (E4); rtk-ai self-claim (E1+E5).
- **Disposition**: install decisions **SURVIVE** — AgentRank ratifies the MCP picks.

### L0.4 — Version-Control Substrate
- **Canonical benchmark**: independent VCS comparison + developer-adoption surveys (StackOverflow 90k / JetBrains 25k → Git 94-95% market share).
- **Top-3 ranked**: ① git (94-95% adoption) · ② git-worktree + CC `EnterWorktree` · ③ gh / git-cliff / lefthook (T1 tool tier).
- **Flagged**: `ruvnet/agentic-flow`'s "Git vs Jujutsu 2-100× faster" — E1+E5 vendor-marketing (agentic-flow ships an agentic-jujutsu package). jj re-confirmed **T2 PILOT sandbox-only**.
- **Disposition**: install decisions **SURVIVE**.

### L0.5 — Security
- **Canonical benchmark**: academic detection-rate corpora — arXiv 2503.14388 (7-scanner VEX-consistency), NSF/arXiv 2307.00714 (9-tool secret-detection precision/recall), OWASP Benchmark, RealVuln SAST.
- **Top-3 ranked**: ① aquasecurity/trivy (76.5% detection — MCPAmpel 16-engine/2,900-repo study) · ② gitleaks (F1 60%, recall 86-88% — NSF #1 secret scanner) · ③ microsoft/agent-governance-toolkit (OWASP Agentic Top-10 10/10).
- **Flagged**: Snyk (proprietary-unverifiable E1), Puaro "99.8%" self-blog (E1), DevSecOps-MCP "80+ vulns" self-count (E1) — all non-installed.
- **Disposition**: install decisions **SURVIVE** — Trivy + gitleaks independently validated #1. Cleanest layer.

### L1 — Cross-Model Router / Gateway
- **Canonical benchmark**: `ferro-labs/ai-gateway-performance-benchmarks` + Kong `kong_ai_gateway-portkey-litellm-benchmark` (vendor-run but harness-open + reproducible; **no peer-reviewed neutral gateway benchmark exists** — confirmed gap).
- **Top-3 ranked**: ① **LiteLLM (86)** · ② Portkey (82) · ③ Bifrost (72 — **WATCH, not install**).
- **Flagged**: L1 is **the most-contaminated layer**. Maxim's "Bifrost 50×/54× faster" = Maxim's own marketing (38-second LiteLLM P50 = crippled-competitor config). Kong's "859% faster" = Kong-favored. Independent Ferro Labs load-test: **Bifrost collapses to 0 RPS at ≥300 concurrent VU** — fragile, not fast.
- **Disposition**: LiteLLM **stays T1 INSTALL** — its win rests on ecosystem/license/native-CC, not RPS. Bifrost claim STRIPPED.

### L1.5 — Memory Substrate
- **Canonical benchmark**: LongMemEval (ICLR 2025) — **judge-uncontrolled** (52-pt swing per Engram); top-3 is a statistical tie.
- **Top-3 ranked (by composite)**: ① **Hindsight / vectorize-io (90, T1 PRIMARY)** — 94.6% LongMemEval `[SELF-REPORTED]`, wins on the **only full native-CC plugin** (hooks+MCP+skill), MIT, Windows-verified, already installed · ② Mastra OM (80) · ③ OMEGA (78). *(CORRECTION: no memory engine has an independently-reproduced LongMemEval number — VA-Tech/WaPo are CO-AUTHORS of hindsight's arXiv 2512.12818, not independent reproducers; the prior "only independently-reproduced number" claim is FALSE — see `03-deepdive/MEMORY-SOTA-EVIDENCE-AUDIT-W259v16.md`.)*
- **Flagged**: mem0 49% (vendor cited 94% LoCoMo marketing) → **T3**; **supermemory 81.6% CONTRADICTED** — independent TrueMemory rerun = 15.8% (65-pt gap) → **DOWNGRADE-WATCH** (NEW Wave-6); claude-mem star-proxy + Windows blockers → T3; Cipher LoCoMo self-attestation → T3.
- **Disposition**: W259-v4 reversal **RATIFIED** — Hindsight-over-OMEGA vindicated on **integration** (only full native-CC plugin), MIT, Windows-verified — NOT on benchmark epistemics (all LongMemEval numbers are `[SELF-REPORTED]`; the top-3 are a statistical tie in the judge-noise band).

### L2 — Agent Orchestration / Multi-Agent
- **Canonical benchmark**: GAIA via Princeton HAL (scaffold-isolated — same model, varied framework: 7.3-pt swing) + Turing 2000-run framework eval. (τ²-bench / AgentBench rank **models**, not frameworks — layer/unit mismatch.)
- **Top-3 ranked**: ① anthropics/skills · ② obra/superpowers (both benchmark-exempt skill-kits — no agent benchmark applies) · ③ langgraph (Turing #1, 89% task-completion).
- **Flagged**: "CrewAI 2B executions" / "LangGraph 34.5M downloads" = vanity-volume (E4); skill-kits have NO agent benchmark — wshobson/agents D8 9→7.
- **Disposition**: install decisions survive; D8 honesty-deflated.

### L2.5 — Knowledge / Structured-Output
- **Canonical benchmark**: BFCL (Berkeley Function-Calling Leaderboard, AST-verified) + aastroza/structured-generation-benchmark (library-isolated) + SOB (arXiv 2604.25359).
- **Top-3 ranked**: ① pydantic-ai · ② instructor (both cloud-API-capable) · ③ BAML.
- **Flagged**: outlines "zero validation failures" = true-but-scoped (local models only — unusable on Claude/GPT cloud APIs) → **T2→T3** use-class mismatch. SOB: schema-compliance ≥96% but value-accuracy only 69-83%.
- **Disposition**: pydantic-ai + instructor survive T1.

### L3 — Peer CLI
- **Canonical benchmark**: Terminal-Bench 2.0/2.1 (Laude Institute, agent-isolated) + SWE-bench **Pro** (Scale AI — NOT Verified).
- **Top-3 ranked**: ① **Codex CLI (Terminal-Bench #1, 82.0%)** · ② goose (54.3%) · ③ opencode (51.7%).
- **Flagged**: opencode "160k★" + gemini-cli "104k★" mis-credited as capability — canonical Terminal-Bench places them #53 / #57. **opencode DEMOTED T1→T2**; both D8 corrected 10→8.
- **Disposition**: **opencode T1→T2** (the one tier flip); Codex CLI is the actual #1.

### L4 — Eval Frameworks
- **Canonical benchmark**: independent feature-coverage matrices (5 neutral sources; no capability leaderboard — eval frameworks ARE the measuring instrument).
- **Top-3 ranked**: ① **Inspect AI (90)** — UK AISI government authorship, MIT, 100+ benchmarks, zero vendor-marketing · ② promptfoo (88, down from 89) · ③ DeepEval (86).
- **Flagged**: promptfoo "used by OpenAI+Anthropic" = E1 repo self-description → D8 stripped + re-anchored to independent Fortune-500 evidence; DeepEval "everything Ragas offers but more" = E5 own blog.
- **Disposition**: **Inspect AI confirmed #1, above promptfoo** (W259-v4 ratified).

### L4 — Observability
- **Canonical benchmark**: OTel-GenAI semantic-convention conformance + 6 independent comparison matrices. Sub-layer is benchmark-CLEAN.
- **Top-3 ranked**: ① Phoenix (87, incumbent, OTel-native) · ② Langfuse (87, strongest OTel-GenAI conformance — native `gen_ai.*`; D1 corrected 8, MIT-core ≠ fully-MIT) · ③ opik (86).
- **Flagged**: LangSmith → **T3 REJECT-FOR-FIT** (proprietary, no self-host, LangChain-locked, data-boundary risk).
- **Disposition**: Phoenix + Langfuse co-lead; survive.

### L5 — Scaffold
- **Canonical benchmark**: **SWE-bench Pro** (Scale AI/SEAL — NOT Verified, which is 59.4%-contaminated per OpenAI).
- **Top-3 ranked**: ① Anthropic Managed Agents (90, ~49.5% Pro) · ② mini-SWE-agent (88, the 100-line scaffold Scale AI adopted as Pro's harness) · ③ SWE-agent (83, 43.7% Pro).
- **Flagged**: **Live-SWE-agent DOWNGRADED T3 PATTERN-CITE-ONLY** (75) — its "79.2% best OSS" is contaminated SWE-bench Verified; on canonical Pro it scores 45.8% and Kimi K2-Thinking beats it. OpenHands Index = Verified-based.
- **Disposition**: **Live-SWE-agent T1→T3** (executes W258-V13-CRITIQUE §3.5 + W259-v4 §9.2).

### Layer-C — LLM Serving (T1 fallback)
- **Canonical benchmark**: SemiAnalysis InferenceMAX/InferenceX (`github.com/InferenceMAX/InferenceMAX` — public GitHub Actions, weekly auditable; genuinely independent).
- **Top-3 ranked**: ① vLLM (86) · ② SGLang (85) · ③ TensorRT-LLM (80).
- **Disposition**: **RATIFIED CLEAN** — the one layer with a genuinely independent benchmark from the start.

## §2 — Systematic findings

1. **Install decisions mostly SURVIVE** the benchmark re-audit. L0 / L0.4 / L0.5 / Layer-C / L1(LiteLLM) / L1.5(Hindsight) / L4(Inspect AI) all hold. The benchmark correction changed **honesty of scores**, not (mostly) the picks.
2. **Tier flips** (the real changes): opencode T1→T2 · Live-SWE-agent T1→T3 · outlines T2→T3 · LangSmith →T3-REJECT · mem0 →T3 · supermemory →DOWNGRADE-WATCH · Bifrost claim stripped (stays WATCH).
3. **Layer/unit mismatch** is a permanent hazard: agent benchmarks rank models; never score a framework/CLI/skill-kit with a model-level number.
4. **Judge-uncontrolled benchmarks**: LongMemEval top-3 is a statistical tie — Hindsight wins on *integration completeness* (the only full native-CC plugin: hooks+MCP+skill, MIT, Windows-verified), NOT raw rank or reproducibility (every memory engine's LongMemEval number is `[SELF-REPORTED]`; none independently reproduced — see `03-deepdive/MEMORY-SOTA-EVIDENCE-AUDIT-W259v16.md`).
5. **No peer-reviewed neutral benchmark exists** for L1 routers — a genuine ecosystem gap; LiteLLM's T1 rests on ecosystem/license/native-CC, correctly.

## §3 — cognee correction (operator-flagged repo)

The operator flagged `topoteretes/cognee-integration-claude`. Verdict: **REJECT-FOR-FIT** (composite ~48) — it is a thin Claude Agent-SDK Python library (4 files, no CC-native surface, NO LICENSE file = cardinal-rule-1 blocker, 5 months stale). The operator flagged the wrong repo.

**Three cognee↔Claude pathways**:
- (A) `cognee-integration-claude` (Agent-SDK lib) — **REJECT**
- (B) `topoteretes/cognee-integrations/integrations/claude-code` — the REAL CC plugin (plugin.json v0.2.0, 6 lifecycle hooks, 3 skills, 1 subagent) — architecturally best BUT **license-blocked** (no root LICENSE)
- (C) **`cognee-mcp`** in the Apache-2.0 `cognee` monorepo — **the installable bridge → WINS**

**Corrected L1.5 cold-tier bridge**: operator's quickstart `claude mcp add cognee uvx cognee-mcp` is directionally right but **mechanically broken on Windows** (uvx stdio hangs the MCP handshake → CC respawn-loop, 75 orphan processes). Use `cognee-mcp --transport http --port 8000` under a supervisor + `"type":"http"` `.mcp.json`. **cognee uses Kuzu by default — does NOT support FalkorDB**; FalkorDB belongs with Graphiti.

**6 missing memory repos** (never reconciled into MEMORY-LAYER-RECONCILED-W259v4 §1): `topoteretes/cognee-integrations` (CC plugin as distinct row), `MemTensor/MemOS` (8.4k★ CC plugin), `zilliztech/memsearch`, `MemMachine/MemMachine`, `EverMind-AI/EverOS`, `memodb-io/Acontext`, `neo4j-labs/agent-memory`.

## §4 — Net disposition changes (W259-v6)

| Repo | Layer | Change | Reason |
|---|---|---|---|
| opencode | L3 | T1 → **T2** | Terminal-Bench #53; "160k★" ≠ capability |
| Live-SWE-agent | L5 | T1 → **T3 PATTERN-CITE** | 79.2% was contaminated Verified; 45.8% Pro |
| outlines | L2.5 | T2 → **T3** | local-models-only; unusable on cloud APIs |
| LangSmith | L4-obs | → **T3 REJECT-FOR-FIT** | proprietary, no self-host, data-boundary risk |
| supermemory | L1.5 | → **DOWNGRADE-WATCH** | independent rerun 15.8% vs claimed 81.6% |
| cognee-integration-claude | L1.5 | → **REJECT-FOR-FIT** | no LICENSE, no CC-native surface, stale |
| Bifrost | L1 | claim stripped, stays WATCH | "50×" is vendor marketing; 0 RPS at 300 VU |
| Codex CLI | L3 | confirmed **#1** | Terminal-Bench 82.0% |
| cognee-mcp | L1.5 | corrected install path | HTTP transport, not uvx stdio (Windows) |

## §5 — Verdict

Every layer now has a **canonical-benchmark-ranked scorecard** with vendor-marketing flagged. The benchmark re-audit **confirms W259's architecture and most install picks** — the corrections are honesty-deflations + 6 tier flips, not a structural failure. The operator's repeated push for benchmark rigor was correct: it surfaced opencode/Live-SWE-agent/supermemory contamination + the cognee-mcp Windows break that a single-pass audit missed.

**Per-layer benchmark coverage: COMPLETE.** Artifacts: `BENCHMARK-SCORECARD-{A,B,C,D}-W259v6.md` + `COGNEE-INTEGRATION-CLAUDE-W259v6.md` + this consolidation.
