# W259 — Ultimate Decisions (Convergent Conclusions from 25 Agents + 4 Codex Verdicts)

> **Read order**: This document FIRST. Synthesis (`07-final-synthesis/W259-ULTIMATE-SYNTHESIS-FINAL.md` 1057 LOC) and scoring matrix (`05-scoring/MASTER-SCORING-MATRIX-W259.md` 144 rows) are supporting evidence.
>
> **Date**: 2026-05-16 | **Verdict**: APPROVE-SHIP-W259-V3-FINAL (codex GPT-5.5 Path P) + GOAL-MET 36/36 (4-level goal-backward) | **Saturation**: practical (literal full-GitHub impossible)

---

## Section 1 — The Convergent Decisions (what 30+ agents AGREE on)

### Decision 0-ter (W259-v7 — "EVERY DIMENSION UNLEASHED" — the acquisition-vs-exploitation reframe)

Per operator directive "EVERY DIMENSION FOR CLAUDE CODE UNLEASHED", Wave-7 audited all **30 native Claude Code capability dimensions** — see `07-final-synthesis/CC-DIMENSIONS-UNLEASHED-W259v7.md`.

**The reframe — the single most important W259 finding**: W259 (L0-L9, 144 repos, benchmark scorecards) is an **ACQUISITION architecture** — what OSS to *install*. But the audit shows the operator's runtime exploits its **native CC capability surface at only 4.3/10** (6 UNLEASHED · 14 PARTIAL · 10 DORMANT). **The highest-ROI moves are not installs — they are unleashing capabilities already shipping free in the `claude` binary.**

**Top-5 dormant dimensions by ROI**:
1. **D1 Hooks (ROI 9)** — 26 lifecycle events, zero project-layer wiring. Cardinal-rule-2 explicitly *permits* direct upstream-CLI hooks.
2. **D9 Background tasks (ROI 8)** — `claude --bg` + supervisor; multi-MAX accounts make parallel sessions nearly free.
3. **D8 Native memory tier (ROI 7)** — W259 declared native memory the "T0 preferred path" then the runtime set `CLAUDE_CODE_DISABLE_AUTO_MEMORY=1`. **Unreconciled contradiction** — fix it.
4. **D26 Permission sandboxing (ROI 7)** — `defaultMode:"bypassPermissions"` makes the L0.5 deny-list cosmetic; switch to `auto` mode.
5. **D14 Agent SDK (ROI 6)** — T1-ranked in W259, zero built artifacts. Force-multiplier: one harness clears D14+D16+D22 (5 dormant dimensions).

**Punch list**: 15 actions — **6 P0** (this wave: wire hooks, `auto` permission mode, reconcile memory opt-out, adopt `claude --bg` sessions, set Proactive output style, author `loop.md`) — all HIGH-reversibility, **zero new dependencies, pure native config**. The P0 set alone moves exploitation 6→~12 UNLEASHED at a cost below any single OSS install-layer.

**Cross-cutting**: 7 of 10 dormant dimensions need ZERO new OSS dependency; the other 3 (Agent SDK / programmatic tool calling / Advisor tool) need only ONE built harness. **"Unleashed" = exploit the binary first, install second.**

### Decision 0-bis (W259-v6 — per-layer benchmark scorecard, EVERY layer)

Per operator directive "EVERY LAYER NEEDS FULL COVERAGE + BENCHMARK + MULTI-DIM RANKING", Wave-6 (5 agents) produced a **canonical-benchmark-ranked scorecard for every layer** — see `05-scoring/PER-LAYER-BENCHMARK-SCORECARD-W259v6.md`. Each layer ranked on its independent hard benchmark:

| Layer | Canonical benchmark (independent) | #1 ranked |
|---|---|---|
| L0 MCP | AgentRank 8-signal (stars weighted lowest) | microsoft/playwright-mcp |
| L0.4 Git | VCS-adoption surveys (Git 94-95%) | git + CC EnterWorktree |
| L0.5 Security | academic detection-rate corpora (NSF/OWASP) | trivy (76.5%) + gitleaks (NSF #1) |
| L1 Router | ferro-labs + Kong gateway benchmarks | LiteLLM |
| L1.5 Memory | LongMemEval (ICLR 2025) | vectorize-io/hindsight (only full native-CC plugin; benchmark `[SELF-REPORTED]`) |
| L2 Orchestration | GAIA-via-HAL + Turing framework-eval | langgraph (Turing #1) |
| L2.5 Knowledge | BFCL (Berkeley) | pydantic-ai + instructor |
| L3 Peer CLI | Terminal-Bench 2.1 + SWE-bench Pro | **Codex CLI (#1, 82.0%)** |
| L4 Eval | independent feature-coverage matrices | Inspect AI (above promptfoo) |
| L4 Obs | OTel-GenAI conformance | Phoenix + Langfuse co-lead |
| L5 Scaffold | SWE-bench Pro (NOT Verified) | Anthropic Managed Agents |
| Layer-C Serving | SemiAnalysis InferenceMAX | vLLM |

**Result: architecture + most install picks SURVIVE the benchmark re-audit.** Net tier flips: opencode T1→T2 (Terminal-Bench #53, not its 160k★), Live-SWE-agent T1→T3 (79.2% was contaminated Verified; 45.8% Pro), outlines T2→T3 (cloud-API-incompatible), LangSmith→T3-REJECT, supermemory→DOWNGRADE-WATCH (independent rerun 15.8% vs claimed 81.6%), Bifrost claim stripped.

**cognee correction**: operator flagged `cognee-integration-claude` — **REJECT-FOR-FIT** (no LICENSE, no CC-native surface). Correct cold-tier bridge = `cognee-mcp` (Apache-2.0) via **HTTP transport** (`uvx cognee-mcp` stdio hangs on Windows → respawn-loop). cognee uses Kuzu, NOT FalkorDB (FalkorDB belongs with Graphiti). +6 memory repos added (MemOS, memsearch, MemMachine, EverOS, Acontext, neo4j-labs/agent-memory).

### Decision 0 (W259-v4 — operator-surfaced benchmark correction)

The operator's own researched memory catalog exposed a **benchmark-methodology error** that codex GPT-5.5 ratified as **PATCH-AND-RESHIP**:

- **Memory PRIMARY is `vectorize-io/hindsight`** — it wins on **INTEGRATION**, not benchmark: it is the only memory engine with a full native-CC plugin (hooks + MCP + skill), MIT-licensed, Windows-verified, zero-cloud, already installed. Its 94.6% LongMemEval is `[SELF-REPORTED]` like every memory engine's — **no engine has an independently-reproduced number**. *(CORRECTION: VA-Tech/WaPo are CO-AUTHORS of hindsight's own arXiv 2512.12818, NOT independent reproducers — the prior "independently reproduced" claim is FALSE; see `03-deepdive/MEMORY-SOTA-EVIDENCE-AUDIT-W259v16.md`.)* — **NOT mem0**.
- **mem0 RETRACTED from PRIMARY → T3**: its "94.4% LongMemEval" was mem0's SaaS marketing figure; independent OSS eval = **49% LongMemEval (last place)**. mem0 markets LoCoMo (easy ~9k-token benchmark), not LongMemEval (canonical hard 115k-1.5M-token ICLR-2025 benchmark).
- **OMEGA** (95.4% claimed) → T2 STUDY-PILOT only (unreproduced + single-author + Windows-untested + ~600-memory ceiling).
- **The error recurs in 4 of 6 layers** (L0 star-trust, L1 Bifrost vendor-benchmark, L4 promptfoo self-claim, L5 SWE-bench-Verified-not-Pro, L1.5 cognee self-tuned). The deepest finding: L4/L5 errors were *already caught* in W258-v13-critique but **never propagated** — W260 needs a propagation-verification gate.
- **Operator's trilayer (OpenViking 热 + Qdrant 暖 + Cognee/FalkorDB 冷) is the PRIMARY memory architecture**; `vectorize-io/hindsight` is the CC-side hook+MCP integration that closes the real gap.
- **Lesson**: the 23-dimension scoring is only as good as its benchmark sourcing. D3 (star-velocity) + D8 (industry-adoption) must be re-sourced against *canonical hard benchmarks*, never vendor marketing.

### Decision 1: The Architecture is 23 named slots / 19 conceptual layers

> **W259-v5 update**: L0.4 VERSION CONTROL SUBSTRATE added per operator directive "git is essential to the SOTA grand architecture". git is the agent-isolation primitive (`Agent(isolation:"worktree")`), the durable-state store (6,640-file catalog), the provenance substrate, and an active failure surface (#55435 worktree-leak). Stack: native git-worktree + CC `EnterWorktree` (keep) + git-branchless + lefthook + git-cliff + git-sizer (4 net-new single binaries) + lazygit (optional). jj/jujutsu = PILOT-sandbox-only (pre-1.0, no worktree support). Git tree swept this session: **48 worktrees → 1, 67 branches → 3** (~10GB reclaimed; #55435 fixed).

Convergent across Architecture Critic v2 + Architecture-Beyond critic + GIT/VCS-layer architect + 5 codex passes:

```
L9   FAILURE-MODE CATALOG ........... operator-AHEAD-of-OSS; codify + publish
L8   MULTI-MAX GOVERNANCE ........... CLIProxyAPI active; promote to T1
L7   TEAM UX ......................... SKIP (license-blocker + solo-fit)
L6.5 ADR/DECISION-LOG ............... MADR convention zero-install
L6   PATTERN-CITE .................... 18 patterns (12 W258 + 6 W259)
L5   SCAFFOLD ........................ 3-way (Managed Agents > Live-SWE > OpenHands)
L4.6 CONTINUOUS-CANARY .............. DEFER-pattern (no turnkey OSS)
L4.5 FINOPS ......................... ccusage installed; defer until >$5K/mo
L4   EVAL/OBS ........................ 4-way: Inspect AI + Promptfoo + Phoenix + Langfuse
L3   PEER CLI ........................ opencode + (gemini-cli + codex-plugin-cc + goose staged)
L2.5 KNOWLEDGE ...................... pydantic-ai + instructor + foam + cookbooks
L2   DRIVER .......................... CC + 37 plugins (audit FIRST per T0.0)
L1.7 ASYNC-MESSAGING ................ NATS-JetStream defer-skeleton
L1.6 DURABLE ........................ Hatchet+Postgres defer-skeleton
L1.5 MEMORY ......................... vectorize-io/hindsight PRIMARY (W259-v4 corrected;
                                       mem0 RETRACTED 49% LongMemEval; trilayer-aware)
L1   CROSS-MODEL PROXY ............... LiteLLM + codex CLI + Advisor + Helicone(study)
L0.9 META-RUNTIME-GRAPH ............. gitnexus installed; promote to layer
L0.8 WIKI/COMPOUNDING-SURFACE ...... foam + docs/wiki convention
L0.7 FINE-TUNE ...................... Unsloth defer-skeleton (Windows-native)
L0.6 IDENTITY/OAUTH ................. workers-oauth-provider T1 (was defer)
L0.5 SECURITY ....................... 5 core disciplines + Trivy + Gitleaks + pre-commit
L0.4 VERSION-CONTROL SUBSTRATE ..... git + worktree-GC + lefthook + git-branchless +
                                       git-cliff + git-sizer; jj PILOT-only (W259-v5 NEW)
L0   SUBSTRATE: MCP everywhere ...... 12 installed + 5 new ADDs (per §13.3)
```

### Decision 2: The T0 install queue (execute this week)

Convergent across Memory-forensic + Plugin-marketplace + Architecture-Critic + Codex W259-final + W259-v3 verdicts:

| # | Action | Layer | Why convergent | Rollback |
|---|---|---|---|---|
| **T0.0** | **Run `claude plugin details` audit** + classify 37 plugins into ACTIVE / DORMANT / DISCOVERY-ONLY budget | L2 | codex W259-final fix #2 + Plugin-marketplace W2 audit (62% dead-weight, ECC alone 50% preload) | Reverse plugin enable/disable |
| **T0.0.a** | UNINSTALL `outputai` (47 skills / 0 used) | L2 | Plugin-marketplace audit | re-install if needed |
| **T0.0.b** | UNINSTALL `qdrant-skills` (26 skills / 0 used) | L2 | Plugin-marketplace audit | re-install |
| **T0.0.c** | DEDUPE `superpowers` in `claude-plugins-official` (keep `superpowers-marketplace`) | L2 | Plugin-marketplace audit | restore |
| **T0.0.d** | FLIP `everything-claude-code` to DISCOVERY-ONLY w/ 12-skill ACTIVE allowlist | L2 | Plugin-marketplace audit (~50% preload saving) | flip back |
| **T0.1** | Deploy LiteLLM 5-tier cascade YAML + DeepSeek V4 env-swap | L1 | W258 v13 §8 + W259 unchanged | env unset = revert <1min |
| **T0.4** | Cache TTL: explicit `cache_control.ttl="1h"` everywhere | L1 | Architecture Critic v2 §5 (Mar 6 silent → 5m) | code-only revert |
| **T0.5** | Install `pre-commit` (.pre-commit-config.yaml with ruff/pyright/gitleaks) | L0.5 | Codex W259-baseline + Layer D + 3-org convergence | uninstall pre-commit |
| **T0.6** | Switch launcher to `--permission-mode auto` flag (replace broken `defaultMode: "auto"` config) | L0.5 | Architecture Critic v2 P0 fix #1 | launcher revert |
| **T0.7** | Audit `.claude/settings.json` against primary-source 20+ hook event catalog | L0/L2 | Primary-Source Verifier D3 (W258 v13 had ~8 events) | settings revert |
| **T0.8** | Codify MCP `taskSupport` for 12 installed MCPs in `.mcp.json` `_comments` | L0 | Primary-Source Verifier D1 + L1.6 architecture | comment-only |

**T0 expected outcomes**: ~50-70% preload reduction (plugin budget) + cost-router live + cache TTL fixed + security baseline tightened.

### Decision 3: The T1 install queue (next 2 weeks; codex-verifiable pilot per item)

| # | Action | Composite | Source convergence |
|---|---|---:|---|
| **T1.1** | **Install `vectorize-io/hindsight`** as memory PRIMARY (CR-3: codex Path P review before `.mcp.json` commit). Wire as the CC-side hook+MCP integration over operator's OpenViking+Qdrant+Cognee/FalkorDB trilayer. mem0 is NOT in the stack (W259-v4 retraction). | hindsight wins on full native-CC plugin (hooks+MCP+skill), MIT, Windows-verified; 94.6% LongMemEval `[SELF-REPORTED]` | W259-v16 evidence audit + codex PATCH-AND-RESHIP + operator catalog |
| **T1.2** | Install `UKGovernmentBEIS/inspect_ai` | 89 | Architecture Critic v2 + Layer C + Forensic-top-15 |
| **T1.3** | Decision: Langfuse vs Phoenix (port-conflict check) | Langfuse=88 | Layer C (5/7 comparisons winner) + Forensic-top-15 |
| **T1.4** | Install `Trivy` + `Gitleaks` (direct-CLI, no wrappers per W255 cleanup) | 87 + 86 | Layer D + Codex W259-baseline |
| **T1.5** | Install `pydantic-ai` + `567-labs/instructor` (L2.5) | 88 + 87 | Layer F + Forensic-top-15 |
| **T1.6** | Install `foam` markdown PKM (L0.8 wiki) | 84 | Layer F + Karpathy §5 |
| **T1.7** | **Install `googleapis/mcp-toolbox`** (multi-DB MCP, 18+ databases) | **96** | Wave-2 TIER-1-OFFICIAL #1 |
| **T1.8** | **Install `microsoft/agent-governance-toolkit`** (OWASP Agentic Top 10 + STRIDE + EU AI Act) | **96** | Wave-2 TIER-1-OFFICIAL + Forensic ratification (13k+ tests, sub-ms p99) |
| **T1.9** | **Install `anthropics/claude-agent-sdk-python`** (in-process MCP + hooks + session-forking) | **95** | Wave-2 TIER-1-OFFICIAL + Forensic-top-15 |
| **T1.10** | **Install `vercel-labs/agent-skills`** (file-copy NOT /plugin install — note from Forensic) | **96** | Wave-2 TIER-1-OFFICIAL + Forensic-top-15 caveat |
| **T1.11** | **Install `Crawl4AI MCP server`** (research-wave crawling, 65.5k★) | T1 | Wave-3 LAYER-G (only T1 across 10 verticals) |
| **T1.12** | **Install `cloudflare/workers-oauth-provider`** (fills L0.6 OAuth-agent gap) | 86 | Wave-3 Round-2 scoring + L0.6 promote-from-defer |
| **T1.13** | **Install `awslabs/mcp` canonical** (closes biggest org gap) | T1 | Wave-3 Big-org probe (AWS biggest gap) |
| **T1.14** | **Install `IBM/mcp-context-forge`** (production MCP gateway/registry) | T1 | Wave-3 Big-org probe (LARGEST infra gap) |
| **T1.15** | **Install `huggingface/skills`** (CC plugin marketplace via `.claude-plugin/marketplace.json`) | T1 | Wave-3 Big-org probe + deepwiki-verified |
| **T1.16** | Install `anthropics/skills` + `anthropics/knowledge-work-plugins` + `anthropics/claude-plugins-community` | 93 + 89 + 89 | Wave-1 Layer B + Wave-3 Round-2 |
| **T1.17** | Install `anthropics/claude-cookbooks` (renamed 2026-05-14 from anthropic-cookbook) | 88 | Layer F |
| **T1.18** | RATIFY `wshobson/agents` + `trailofbits/skills-curated` SELECTIVE-after-T0.0 (NOT install-now) | 89 + 88 | Layer B + Codex W259-final fix #2 |

**T1 expected outcomes**: 14 new high-composite installs + memory layer benchmark + OAuth-agent gap closed + AWS/IBM/HuggingFace official surfaces wired.

### Decision 4: The HARD CUTS (rejected with explicit rationale)

Convergent rejects across multiple agents:

| Repo | Reject reason | Source |
|---|---|---|
| `multica-ai/multica` (28.7k★) | License-blocker (modified Apache + SaaS+branding restrictions) | W258 v13 §4 L7 + W259 confirmed |
| `e2b-dev/mcp-server` | DEPRECATED per repo banner | W258 v13 §4 L0 |
| `server-postgres` + `server-sqlite` (MCP reference) | ARCHIVED | W258 v13 + Primary-Source Verifier |
| `multica` web-app harness | License + solo-fit | Multiple |
| `AutoGen` / `AG2` / `Microsoft Semantic Kernel` | Superseded by MS Agent Framework 1.0 (Apr 2026) | Layer B + Big-org probe |
| `Skyvern` | AGPL license-incompat | Layer D |
| `PrefectHQ/ControlFlow` | ARCHIVED 2025-08 (now prefect-archive/) | Layer F |
| `structurizr/lite` | ARCHIVED | Layer F |
| `microsoft/aici` | Superseded by llguidance | Layer F |
| `Live-SWE-agent` | WSL2-only (Windows-incompat for portable Z:) | Layer C |
| `Temporal` / `Inngest` / `Restate` / `Dagster` | Infra overkill at solo+5 scale | W258 v13 §4 L7 + Layer E |
| `ell` / `lmql` / `kor` / `jsonformer` / `promptbase` / `adr-tools` / `log4brains` | Stale ≥11 months | Layer F |
| `Coqui-TTS` / `bark` / `Voyager` (Minecraft) | Stale/archived/superseded | Layer G |
| `browser-use/browser-use` | Vendor-funnel risk + Playwright MCP covers | Layer D |
| `claude-mem` as PRIMARY | Windows-portability blockers (61MB macOS-only binary, Git Bash hook write-perm, v13.0.0 missing node_modules, stdin fstat EINVAL crash) | Wave-2 Memory-forensic + Wave-3 Forensic-top-15 |
| `ByteRover/Cipher` claim 92.2% LoCoMo | Single-publisher self-attestation; DeepWiki has no bench in cipher repo | Wave-2 Memory-forensic |

### Decision 5: The Convergent Architecture Patterns to ADOPT

16 patterns (12 W258 + 4 W259 new):

W258 v13 preserved patterns (1-12): autonomous-coding ralph-dag (anthropics/claude-quickstarts canonical) / Magentic-One P14 stall-detection / Tool search tool / Programmatic tool calling / Mar 24 3-agent (planner/generator/evaluator) / Stripe Minions fork-of-goose / incident.io 12-parallel-reviewer / Spotify Honk / ccpm Issues-as-state / TandemKit / KARIMO / DSPy compile-loop.

W259 added patterns (13-18):
13. **MADR template ADR convention** (zero-install)
14. **Codex-as-continuous-adversarial-evaluator** (codex per pilot)
15. **Plugin budget tiering** (ACTIVE/DORMANT/DISCOVERY-ONLY)
16. **Cache TTL discipline** (explicit 1h everywhere)
17. **AgentBridge SDK-patching** (Inspect AI pattern)
18. **`.well-known/agent-skills-discovery`** (Cloudflare RFC)

### Decision 6: Publish operator-novel work back to OSS

L9 FM-class catalog has 3 dimensions where operator is AHEAD of 6 emerging OSS competitors (`failuresmith/failure_atlas` is closest):
1. Sub-class granularity (FM-17.a-g)
2. Runtime-executable recovery primitives (Path P/D/X/S)
3. Cross-model-gate integration

Publication plan:
- `<operator-gh>/claude-code-fm-catalog` (MIT) — main catalog
- `<operator-gh>/cc-fm-catalog-plugin` — CC-plugin wrapper
- `<operator-gh>/multi-account-discipline` — CLIProxyAPI discipline companion
- Cross-pollinate PRs to `failuresmith/failure_atlas` + Anthropic Issue #33558

---

## Section 2 — The Convergent Architecture Pattern (visual)

```
                              ┌─────────────────────────────────────┐
                              │  L9 FM-CATALOG (publish back ↑)     │
                              ├─────────────────────────────────────┤
                              │  L8 Multi-MAX Gov (CLIProxyAPI T1)  │
                              ├─────────────────────────────────────┤
                              │  L7 Team UX (SKIP)                  │
                              ├─────────────────────────────────────┤
                              │  L6.5 ADR (MADR markdown)           │
                              │  L6 Patterns (18 cite-pattern)      │
                              ├─────────────────────────────────────┤
                              │  L5 Scaffold (Managed Agents T1)    │
                              │  L4.6 Canary (DEFER-pattern)        │
                              │  L4.5 FinOps (ccusage + Phoenix)    │
                              │  L4 Eval/Obs                        │
                              │     Inspect AI ─┬─ Promptfoo        │
                              │     Phoenix ────┴─ Langfuse(pilot)  │
                              ├─────────────────────────────────────┤
                              │  L3 Peer CLI (opencode primary)     │
                              ├─────────────────────────────────────┤
                              │  L2.5 Knowledge                     │
                              │     pydantic-ai + instructor +      │
                              │     foam + claude-cookbooks         │
                              │  L2 Driver: CC + plugins (BUDGET!)  │
                              ├─────────────────────────────────────┤
                              │  L1.7 Async (NATS defer)            │
                              │  L1.6 Durable (Hatchet defer +      │
                              │     MCP Tasks per-tool)             │
                              │  L1.5 MEMORY                        │
                              │     mem0 PRIMARY ─┬─ Anthropic      │
                              │                   │   Memory Tool   │
                              │                   └─ Graphiti KG    │
                              │  L1 Router: LiteLLM + Helicone-pilot│
                              ├─────────────────────────────────────┤
                              │  L0.9 Meta-Graph (gitnexus T0)      │
                              │  L0.8 Wiki (foam T1)                │
                              │  L0.7 Fine-Tune (Unsloth defer)     │
                              │  L0.6 Identity (workers-oauth T1)   │
                              │  L0.5 Security                      │
                              │     5 core + Trivy + Gitleaks +     │
                              │     pre-commit + auto-mode flag     │
                              │  L0 SUBSTRATE: MCP                  │
                              │     12 installed + awslabs/mcp +    │
                              │     IBM/mcp-context-forge +         │
                              │     googleapis/mcp-toolbox +        │
                              │     Crawl4AI MCP +                  │
                              │     smithery-ai/cli +               │
                              │     anthropics/claude-agent-sdk-py  │
                              └─────────────────────────────────────┘
```

---

## Section 3 — The Convergent Scoring Decisions (matrix-aware)

**144 repos scored × 23 dimensions**. Top-15 by composite (post-Wave-3 ratification):

| Rank | Repo | Composite | Decision |
|---:|---|---:|---|
| 1 | anthropics/claude-code | **97** | T0-INSTALLED |
| 2 | googleapis/mcp-toolbox | **96** | T1 INSTALL |
| 2 | microsoft/agent-governance-toolkit | **96** | T1 INSTALL |
| 2 | github/github-mcp-server | **96** | T1 RATIFY (likely wired) |
| 2 | vercel-labs/agent-skills | **96** | T1 INSTALL (file-copy) |
| 6 | anthropics/claude-agent-sdk-python | **95** | T1 INSTALL |
| 6 | microsoft/playwright-mcp | **95** | T0-INSTALLED (ratify pin) |
| 8 | modelcontextprotocol/spec + reference servers | **94** | T0-INSTALLED |
| 8 | anthropics/claude-plugins-official | **94** | T0-INSTALLED (audit) |
| 8 | modelcontextprotocol/inspector | **94** | T1 INSTALL |
| 11 | anthropics/skills | **93** | T1 INSTALL |
| 11 | obra/superpowers + ecosystem | **93** | T0-INSTALLED (bundle T1) |
| 11 | modelcontextprotocol/experimental-ext-skills (SEP-2640) | **93** | T4 WATCH-CRITICAL |
| 14 | anthropics/claude-quickstarts | **92** | T1 PATTERN-CLONE |
| 14 | openai/codex-plugin-cc | **92** | T1 INSTALL |

(Full 144 rows at `05-scoring/MASTER-SCORING-MATRIX-W259.md`.)

---

## Section 4 — Multi-Source Convergence Evidence Per Decision

Why these are CONVERGENT (not single-source) decisions:

| Decision | Sources converging |
|---|---|
| **vectorize-io/hindsight PRIMARY for memory** (W259-v16 corrected) | Only memory engine with a full native-CC plugin (hooks + MCP + skill) + MIT + Windows-verified + zero-cloud + already installed + codex PATCH-AND-RESHIP + operator-supplied catalog cross-check. Benchmark (94.6% LongMemEval) is `[SELF-REPORTED]` — no engine has an independently-reproduced number; VA-Tech/WaPo are co-authors of hindsight's arXiv 2512.12818, not independent reproducers (W259-v16 supersedes the prior false "independently reproduced" claim). |
| **mem0 RETRACTED from PRIMARY → T3** | Independent OSS LongMemEval = 49% (Vectorize.io / Pith blog 2026-04-02); mem0 maintainers admit SaaS-vs-OSS gap in issues #2800/#3943; Wave-2 mistook DeepWiki echoing mem0's README for verification + W259-v4 cross-layer re-audit + codex W259-v4 verdict |
| **claude-mem DOWNGRADED** | Wave-2 Memory-Forensic (Windows blockers) + Forensic-top-15 ratification (v12.3.3 critical context-injection failure) + bug-issue triangulation (#2439 + #2407 + stdin fstat EINVAL crash) — RETAINED-CORRECT |
| **inspect_ai T1** | Architecture Critic v2 (totally missing from W258) + Layer C (UK AISI authoritative) + Forensic-top-15 + 4 codex passes |
| **microsoft/agent-governance-toolkit T1** | Wave-2 TIER-1-OFFICIAL deepdive + Forensic-top-15 (13k+ tests, 9 adopters, sub-ms p99, OWASP/STRIDE/NIST/ISO coverage) |
| **wshobson SELECTIVE not install-now** | Codex W259-final fix #2 (plugin-budget gap) + Plugin-marketplace audit (62% dead-weight) + Forensic-top-15 |
| **opencode pilot** | Wave-1 Layer B (160k★ DHH endorsement) + Codex W259-baseline + Wave-3 Round-2 (verify-redirect-first) |
| **ast-grep + rtk-ai DOWNGRADE** | Architecture Critic v2 §6 (Axis-1-thin: 1 org each) + Wave-3 forensic |
| **L9 FM-catalog publish** | Architecture-Beyond critic (operator-ahead-of-OSS thesis) + Wave-3 Operator-Novel-Patterns codifier (refined: 3 specific dimensions, 6 OSS competitors exist) |
| **APPROVE-SHIP-W259-V3-FINAL** | Codex GPT-5.5 absolute-saturation verdict (REAL Path P) + Goal-backward 36/36 (4-level) + GraphQL/big-org/domain-gap diminishing returns confirmed |

---

## Section 5 — The W260 Validation Queue (what to execute AFTER T0/T1)

Carried forward as non-blocking follow-ups:

1. **Plugin budget execution** — Run T0.0 (`claude plugin details` actual command) and codify ACTIVE/DORMANT/DISCOVERY-ONLY in `.claude/settings.json`
2. **Memory benchmark execution** — Pilot mem0 vs Anthropic Memory Tool vs Graphiti on operator's actual recall workload
3. **opencode/goose org-redirect verification** — Confirm `anomalyco/opencode` 160k★ + `aaif-goose/goose` 45k★ redirects via GitHub API
4. **MCP `taskSupport` audit** — For each of 12 installed MCPs, determine `taskSupport: "forbidden" | "optional" | "required"`
5. **Hook event refresh** — Audit settings.json against primary-source 20+ hook event catalog
6. **CCBP-secondary date re-verification** — 8 dates flagged by Primary-Source Verifier (Feb 5 / Feb 17 / Mar 25 / Apr 8 / Apr 9 / May 7 / May 8 / May 12 2026)
7. **Disposition clarity** — `langgenius/dify` (141k★) + `bytedance/deer-flow` (68k★) + `ComposioHQ/awesome-claude-skills` (60k★) explicit T2/T4/REJECT (codex W259-v3 cleanup list)
8. **Operator-novel publication path** — codex T1 review FIRST → private dry-run → cross-pollinate PRs → public catalog
9. **Cache TTL telemetry** — Verify 1h TTL active via Phoenix telemetry post-T0.4
10. **Auto-mode flag verification** — Confirm `--permission-mode auto` active post-T0.6 launcher update

---

## Section 6 — Honest answer to "are you sure all final state, clean up, deep dived, all covered?"

**YES** for practical saturation per operator-defined CC/agent/MCP/skill/runtime-expansion scope.

**NO** for literal "all of GitHub" coverage — that's epistemically impossible (100M+ repos, weekly churn, deleted/renamed, topic spam, private repos, generated catalogs, volatile star counts).

**What W259 proves**:
- **25 of 25 agents complete** across 3 waves
- **4 codex GPT-5.5 verdicts** with final APPROVE-SHIP-W259-V3-FINAL
- **4,793 unique repos surfaced** across 25 source families
- **144 repos × 23 dimensions** scored
- **22 architecture slots** (vs W258's 9 — 2.4× expansion)
- **6,945 files organized** into 19 categorized buckets
- **0 residual tmp/*.md** outside catalog (was 800+ pre-cleanup)
- **Goal-backward 36/36** at all 4 verification levels (EXISTS / SUBSTANTIVE / WIRED / DATA-FLOWING)
- **3 W259-NEW layers** added in Wave 2 (L0.9 / L4.6 / L9) — including L9 where operator is AHEAD of OSS
- **L1.5 memory layer REVERSED** post-DeepWiki bench verification (mem0 PRIMARY, claude-mem DOWNGRADED)
- **Plugin-budget concrete actions** identified (62% dead-weight, ~50-70% preload reduction)

**What W259 cannot prove**: that ZERO high-quality SOTA repo exists in 100M+ GitHub repos that is operator-fit and unknown to all 25 agents. That's not a knowable bar.

**Codex GPT-5.5's verbatim answer**: *"The honest claim W259 can make is not 'we found everything.' The honest claim is: W259 reached practical saturation for the declared operator problem after broad multi-source discovery, layer deep-dives, primary-source verification, adversarial passes, and cluster-level handling of thousands of surfaced-but-not-individually-scored repos. That is a defensible engineering bar; literal totality is not."*

**The ultimate decision-making convergence is: SHIP W259-v3 NOW. Execute T0 this week. T1 next 2 weeks. W260 validation queue carries the residual cleanup.**

---

## Section 7 — One-line ship verdict

> **W259-V3 IS THE ULTIMATE DECISION-CONVERGED SYNTHESIS. SHIP THIS WEEK. NO WAVE 4 NEEDED.**
>
> *Convergent across 25 agents + 4 codex GPT-5.5 verdicts + 36/36 goal-backward verification + 23-dim scoring on 144 repos + multi-source convergence on every layer.*
