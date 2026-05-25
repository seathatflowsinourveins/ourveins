# SOTA Token-Optimization Cross-Runtime Synthesis — 2026-05-15

**Wave**: W215 4-agent research + install-plan
**Agents**: A (Explore local-installed) + B (sota-researcher GitHub mainstream) + D (Explore Z:\claude-sota-pure) + E (sota-researcher 2026 frontier); C (codex-rescue BRIDGE-MODE) WEDGE per FM-17.d
**Runtimes**: Z:\claude-sota-installed (mature, Wave 200+) + Z:\claude-sota-pure (fresh-from-zero, Wave 14)
**Cross-model gate**: PARTIAL — both Sonnet stand-ins disclosed STAND-IN-NOTICE per cross-model-consensus.md §Env-funneled mandate; Path D codex orchestrator-direct recommended before install commit

---

## 1. Current state scorecard

| Runtime | Artifacts | D-TE avg | Strongest dims | Weakest dims |
|---|---|---|---|---|
| Z:\claude-sota-installed | 27 | **6.5-7.6/10** | D-TE1 (10/10 auto-compact-discipline), D-TE4 (compact_hint.json), D-TE6 (cross-fire continuity) | D-TE7 (cite-only deepagents), D-TE8 (manual fork), **D-TE9 (3/10 ZERO compression telemetry)**, **D-TE10 (2/10 NO ccusage)** |
| Z:\claude-sota-pure | 120 effective | **8.55/10** | **D-TE9 (95% ccusage MCP + 3 sources)**, **D-TE10 (90% ccusage transparency)**, D-TE2 (90% explicit per-source) | D-TE1 (75% — missing auto-compact-discipline.md), D-TE6 (missing research-protocol.md) |

**Critical finding**: Pure runtime LEADS Installed by **+2.05 D-TE delta** because of ccusage MCP + gsd-context-monitor.js. Installed leads on rules-layer discipline (auto-compact-discipline.md 10/10, sessionstart-preload-discipline.md 8/10).

---

## 2. Cross-runtime gap matrix (bidirectional install opportunities)

### Pure → Installed (close D-TE9 + D-TE10 critical gaps)

| Primitive | Source | Closes Dim | Install verdict | Cite |
|---|---|---|---|---|
| **ccusage MCP** | Pure `.mcp.json` | D-TE9 + D-TE10 (CRITICAL — 6.5pp + 7pp gain) | **ADOPT-NOW Installed** | Pure .mcp.json ccusage row |
| **gsd-context-monitor.js** | Pure `.claude/hooks/PostToolUse/` | D-TE1 + D-TE9 + D-TE10 (advisory threshold injection @ 35%/25%) | **ADOPT-NOW Installed** | get-shit-done hook stack |
| **context-mode v1.0.134** | Pure `.claude/plugins/cache/` | D-TE1 + D-TE3 + D-TE9 | **REVIEW** (Elastic-2.0 AMBER per Agent D; verify license-blocker per cardinal-rule-1 permissive whitelist) | mksglu/context-mode HEAD `e73a6cd5` |
| gitnexus MCP | Pure `.mcp.json` | D-TE3 (semantic symbol graph) | MAYBE — Installed already has gitnexus | — |
| serena MCP | Pure `.mcp.json` | D-TE3 (IDE symbol nav) | MAYBE — nice-to-have | — |
| cwc 5 primitives | Pure `.local/cwc/` | D-TE1 + D-TE4 + D-TE7 (track-read + verify-gate + kill-switch + steer + commit-on-stop) | **STUDY-PILOT Installed** — Apache-2.0 PBC; not-maintained caveat | cwc-long-running-agents HEAD `ffd563d6` |

### Installed → Pure (close D-TE1 + D-TE6 rule-layer gaps)

| Primitive | Source | Closes Dim | Install verdict | Cite |
|---|---|---|---|---|
| **auto-compact-discipline.md** | Installed `.claude/rules/` | D-TE1 (10/10 comprehensive 7-rank recipe) | **ADOPT-NOW Pure** (cite-class TIER-3-LOCAL-COMPOSITION per CR-12 §14.5 cite-import-AMBER) | Installed rule @ current HEAD |
| **sessionstart-preload-discipline.md** | Installed `.claude/rules/` | D-TE1 + D-TE2 + D-TE4 (5-backend hash verify, 3-layer preload) | **ADOPT-NOW Pure** | Installed rule |
| **research-protocol.md** | Installed `.claude/rules/` | D-TE6 + D-TE10 (RECALL→INVESTIGATE→VERIFY 3 gates) | **ADOPT-NOW Pure** | Installed rule |
| **fm20-path-drift-cascade.md** | Installed `.claude/rules/` | D-TE10 (cross-fire claim Mia probe) | **STUDY-PILOT Pure** | Installed rule |
| team-orch-patterns.md + coordination.md §12 | Installed `.claude/rules/` | D-TE8 + Thariq named-T2 rewind-first | STUDY-PILOT Pure | Installed rules |
| karpathy-adapted.md §5 | Installed `.claude/rules/` | D-TE4 (Wiki Compounding Surface 3-layer naming) | STUDY-PILOT Pure | Installed rule |

---

## 3. NEW universal ADOPT-NOW candidates (both runtimes — from Agent B + Agent E)

### Top-7 critical installs (close D-TE9 / D-TE7 / D-TE3 gaps)

| # | Repo | License | HEAD SHA | Closes dim | Install command | Token-savings |
|---|---|---|---|---|---|---|
| 1 | **openai/tiktoken** | MIT | `83ed1036` | D-TE9 measurement foundation | `pip install tiktoken` | enables D-TE9 telemetry across all probes |
| 2 | **microsoft/LLMLingua** | MIT | `9e841e7a` | D-TE7 + D-TE3 (20× compression) | `pip install llmlingua` | EMNLP'23/ACL'24 peer-reviewed; 20× compression minimal-loss |
| 3 | **langchain-ai/deepagents** | MIT | (TruncateArgsSettings cite-anchor 95f845d2) | D-TE1 + D-TE7 + D-TE8 (arg truncation + fork routing) | `pip install deepagents` | closes cite-only→operational gap |
| 4 | **BerriAI/litellm** | MIT | `3bfef5ba` | D-TE5 (cache-aware routing + cost tracking) | `pip install litellm` | already Tier-A queued in CLAUDE.local.md |
| 5 | **567-labs/instructor** | MIT | `f3325f8d` | D-TE9 SHAPE-CLAIM Python (reduces re-prompt cycles) | `pip install instructor` | fewer re-runs on structured output |
| 6 | **gepa-ai/gepa** | MIT | `ff60b615` | D-TE5 + D-TE7 (genetic-Pareto prompt evolution) | `pip install gepa` | 30-60% prompt LOC reduction post-evolution |
| 7 | **pydantic/pydantic-ai** | MIT | `1bf1f55e` | D-TE9 agent framework SHAPE-CLAIM | `pip install pydantic-ai` | Pydantic-org T1 |

### CC v2.1.x native features (zero install — wire into hooks)

| Feature | CC Version | Closes dim | Wire action |
|---|---|---|---|
| **PostToolUse `hookSpecificOutput.updatedToolOutput`** | v2.1.121 | D-TE4 (BOUNDED-TOOL-OUTPUT canonical primitive) | Refactor `.claude/hooks/PostToolUse/` to leverage |
| **Hook `type: "mcp_tool"`** | v2.1.118 | D-TE9 (skip Bash wrapper overhead) | Refactor MCP-bound hooks |
| **`/usage` command** | v2.1.118 | D-TE8 (native cost+stats observability) | Replace Tokdash/quota-tracker external deps |
| **`/goal` command** | v2.1.139 | D-TE10 (native model-evaluated loop) | Already-listed in SOTA Feature Activation |
| **Prompt cache 1h TTL** | API 2026-02-05 | D-TE1 (cache reads 0.1× base price) | ENABLE_PROMPT_CACHING_1H=1 already wired Installed; verify Pure |
| **`alwaysLoad` MCP setting** | v2.1.121 | trade-off: D-TE5 vs base surface | Per-server review in .mcp.json |

### Anthropic prompt-cache architecture

- Cache reads charged 0.1× base input price (90% savings on cache hits)
- 4 explicit `cache_control` breakpoints / 20-block lookback
- Minimum: 4096 tokens (Opus), 1024 tokens (Sonnet)
- 1h TTL closes the 5min gap for long autonomous arcs

---

## 4. STUDY-PILOT candidates (reversible, time-boxed)

| Repo | Pilot scope | Time-box | Success criterion | License | Org-T1 |
|---|---|---|---|---|---|
| **langfuse/langfuse** | LLM cost telemetry across `.claude/state/*.jsonl` | 30 days | ≥80% cost attribution → ADOPT | MIT | langfuse org |
| **traceloop/openllmetry** | OTEL-native LLM observability | 30 days OR REJECT-as-DUPLICATE-of-Langfuse | OTEL standard compliance | Apache-2.0 | traceloop org |
| **Helicone/helicone** | OSS observability (REPLACES Phoenix Elastic License blocker per Agent E) | 30 days | one-line code integration; YC W23 backed | Apache-2.0 | Helicone YC W23 |
| **chonkie-inc/chonkie** | Token-aware chunking post-repomix | 14 days | ≥30% token reduction benchmark | MIT | chonkie-inc |
| **zilliztech/GPTCache** | Semantic cache for T1 verdicts | 14 days | ≥40% cache-hit on repeat T1 prompts | (verify) | Zilliz |
| **stanfordnlp/dspy** | GEPA-style prompt optimization | 30 days — CAVEAT META-HARNESS risk per ahfv Probe 5 | ≥20% quality-per-token improvement | MIT | Stanford NLP |
| **BoundaryML/baml** | Cross-language SHAPE-CLAIM (overlap w/ instructor) | 30 days | only if non-Python language needed | Apache-2.0 (verify) | BoundaryML |
| **andrewyng/aisuite** | Vendor-neutral routing (vs litellm) | 30 days | only if simplicity-first paths matter | MIT (verify) | Andrew Ng named-T1 |

---

## 5. REJECT-FOR-FIT (don't install)

| Repo | Sub-class | Reason |
|---|---|---|
| **alexgreensh/token-optimizer** | Probe 6 LICENSE blocker | PolyForm Noncommercial — violates CR-1 permissive whitelist |
| **Arize-ai/phoenix** | Probe 6 LICENSE blocker | Elastic License 2.0 — same blocker class |
| **dottxt-ai/outlines** | Probe 4 plugin-namespace DUPLICATE | instructor + pydantic-ai already cover |
| **vllm-project/vllm** | Probe 5 mode-harness | Server-side; sss is client |
| **jia-gao/leanctx** | Probe 1 + Axis-3 fail | 27d age + single-individual maintainer |
| **agentforce314/clawcodex** | Probe 5 mode-harness | Competing-framework violates CR-5 + CR-12 |
| **OnlyTerp/openclaw-optimization-guide** | Probe 5 + DEMAND-ABSENCE | OpenClaw ≠ Anthropic CC |
| **PostHog/llm-analytics-apps** | DEMAND-ABSENCE | Product analytics not LLM observability primary |
| **gocenalper/agent-optimization** | Axis-3 fail | 14d age, single-individual |
| Various `awesome-*` | DEMAND-ABSENCE | Catalogs not primitives |

---

## 6. Install priority order (cardinal-rule-6 + 9 + 12 compliant)

### Bidirectional Phase A — Cross-runtime parity (HIGHEST priority — closes mutual gaps)

**To Installed (Z:\claude-sota-installed)**:
1. ccusage MCP install (closes D-TE9+10 critical 13pp gap)
2. gsd-context-monitor.js + statusline (D-TE1+9+10)

**To Pure (Z:\claude-sota-pure)**:
3. auto-compact-discipline.md (cite-import-AMBER from Installed)
4. sessionstart-preload-discipline.md (cite-import-AMBER from Installed)
5. research-protocol.md (cite-import-AMBER from Installed)

### Universal Phase B — Top-7 new installs (both runtimes; pip-installable)

6. tiktoken
7. LLMLingua
8. deepagents
9. litellm
10. instructor
11. gepa
12. pydantic-ai

### Universal Phase C — CC native feature wiring (both runtimes; zero install — refactor hooks)

13. PostToolUse `updatedToolOutput` hook stub for bounded-tool-output
14. Hook `type: "mcp_tool"` refactor for MCP-bound hooks
15. `alwaysLoad` MCP per-server audit

### Universal Phase D — STUDY-PILOT (reversible time-boxed)

16. Helicone Docker deploy (30-day, replaces Phoenix)
17. Langfuse Docker deploy (30-day)
18. Chonkie (14-day)
19. GPTCache (14-day)
20. DSPy (30-day with META-HARNESS caveat)

---

## 7. Cross-model-consensus gate status

| Stage | Status |
|---|---|
| Cardinal-rule-3 cross-model orchestration | ⚠️ PARTIAL — both Agent B and Agent E disclosed STAND-IN-NOTICE per env-funneled mandate |
| Agent C codex-rescue BRIDGE-MODE | ❌ WEDGED per FM-17.d wrapper autocompact-thrash (793s, 4 tool uses) |
| Path D orchestrator-direct codex exec | OPTIONAL — fire before install commit to satisfy strict cross-model gate |
| Mia pre-apply at each install Edit | MANDATORY per mia-pre-apply.md (apply-boundary) |
| FM-20 synthesis-vs-Edit boundary | MANDATORY per fm20-path-drift-cascade.md (cross-fire propagation) |

---

## 8. Token efficiency this research wave

| Metric | Value |
|---|---|
| 4 successful agents | 78s + 445s + 159s + 546s = ~21 min wall-clock parallel |
| Agent token usage | 144k + 386k + 112k + 426k = ~1.07M tokens (subagent context) |
| Orchestrator stdout tokens | ~4k for synthesis (this file ~15k tokens written to disk) |
| Equivalent serial-Read research | ~3-5M tokens raw context |
| **Compression via subagent fork** | **~3-5× orchestrator-context savings** + parallelism |

---

## 9. Forward-only install discipline (cardinal-rule-9)

For each install row:
- Version-pin OR explicit `@latest-acknowledged-D6-risk` marker
- Budget 2-round fix-forward (NEEDS-REVISION → fix → APPROVE per CR-T1-T7 lifecycle)
- Pre-cite-import REVERT check: `git -C Z:/claude-sota log --grep=<symbol> --oneline` for sibling REVERT precedents
- Path-rewrite for sibling-bleed defense (replace `Z:/claude-sota/` paths with `Z:/claude-sota-installed/` or `Z:/claude-sota-pure/` per target runtime)

---

## 10. STAND-IN-NOTICE disclosure

Per `Z:/claude-sota/.claude/rules/cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate`:
- Agents B + D + E ran as Sonnet stand-ins (env-funneled per CLAUDE.local.md ENV (f) heritage — even though commented out, Wave 119 disclosure heritage applies)
- Cross-model gate NOT structurally satisfied for adoption verdicts
- Install commits MUST cite `[STAND-IN per cross-model-consensus.md §Env-funneled mandate; 4-agent research evidence; 2nd-stage validation via Path D codex recommended]`
- Per Outcome A monotone-decline path of closed-loop-recursive-narrowing.md, downgraded prose-only acknowledgment closes the disclosure gap pending Path D firing
