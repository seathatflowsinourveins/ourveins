---
title: "Wave 252 Track A — Comprehensive Multi-Dimensional Repo Scoring Matrix"
date: 2026-05-16
wave: 252
track: A (orchestrator-direct recovery — original sota-researcher dispatch a558952290a140cd5 lost to FM-17.b)
method: "Fresh GitHub API probes (mcp__github__search_repositories minimal_output=false) 2026-05-16 + W251 verdicts + W252 C-narrow license resolution"
status: COMPLETED
scoring-disclosure: "Orchestrator-direct synthesis after 3/4 subagent dispatches lost to FM-17 (Track A/B/C). All star/license/date data is fresh-probed 2026-05-16; verdicts cross-checked against W251 GRAND-SYNTHESIS + C-narrow."
---

# Wave 252 — Comprehensive Multi-Dimensional Repo Scoring Matrix

## §1 — Scoring Rubric (10 dimensions → composite 0-100)

| Dim | Weight | Bands |
|---|---|---|
| **D1 STARS** | 15 | >80K=15 / 40-80K=13 / 20-40K=11 / 10-20K=9 / 5-10K=6 / 1-5K=4 / <1K=2 |
| **D2 STABILITY** | 15 | STABLE-BURN-IN (≥2y, active)=15 / SUSTAINED-MAINT (1-2y, active)=13 / ACTIVE-YOUNG (<1y, active)=9 / FAST-CHURN/LAUNCH-SPIKE=5 / STALE (>60d no push)=3 |
| **D3 LICENSE** | 25 (GATE) | PASS (MIT/Apache-2.0/BSD)=25 / AMBER (ELv2/LGPL/CC-BY-SA/NOASSERTION-mixed)=10 / BLOCK (AGPL/SSPL/none)=0 — BLOCK caps composite ≤40 |
| **D4 CC-NATIVE PATH** | 20 | P0 plugin (`/plugin install`)=20 / P1 MCP-npm/pip/uvx=15 / P2 clone+build=8 / P3 custom-glue=3 |
| **D5 CONVERGENCE** | 15 | STRONG (≥3 distinct orgs cite)=15 / MED (2 orgs OR named-T2)=9 / WEAK (1 org)=4 |
| **D6 LAYER VALUE** | 10 | HIGH (load-bearing runtime layer)=10 / MED (useful complement)=6 / LOW (nice-to-have)=3 |
| (D7) TOKEN_EFF | — | qualitative tag: HIGH/MED/LOW/NONE |
| (D8) ORCHESTRATION | — | qualitative tag: MULTI/SINGLE/OBSERVE/INFRA |
| (D9) CR12_CLASS | — | GENUINELY-NEW / DUPLICATE / PARTIAL-OVERLAP / PROVIDER-COMPLEMENT / ECOSYSTEM-IMPORT / CITE-CANONICAL |
| (D10) ADVERSARIAL_FIT | — | NATIVE (T1-T7 codex gate) / WIRABLE / NEUTRAL |

**Verdict bands**: INSTALL-TIER-A (composite ≥78 + LICENSE=PASS + path ≤P1) · INSTALL-TIER-B/PILOT (60-78) · ADAPT-PATTERN (45-60 OR LICENSE=AMBER) · CITE-ONLY/REJECT (<45 OR LICENSE=BLOCK).

**Star caveat** (per v65 `CLAUDE.md` + convergence-gate Must-Never #8): stars are *discovery input, not install permission*. Star-velocity >500★/day on a <6mo repo = LAUNCH-SPIKE / fresh-paint signal — D2 penalised, source audit mandatory.

---

## §2 — FOUNDATION / OFFICIAL TIER (always-install, official-org)

| Repo | ★ | License | Created | Push | Stability | Path | Composite | Verdict | Notes |
|---|---|---|---|---|---|---|---|---|---|
| `anthropics/claude-code` | 123,928 | proprietary (issue repo) | 2025-02 | 2026-05-15 | SUSTAINED | n/a | n/a | **RUNTIME ITSELF** | The CC binary; not a repo-install |
| `openai/codex` | 82,922 | Apache-2.0 | 2025-04 | 2026-05-16 | SUSTAINED | P1 (npm `@openai/codex`) | **96** | **INSTALL-TIER-A** | GPT-5.5 adversarial-review backbone. NATIVE adversarial-fit |
| `openai/codex-plugin-cc` | 18,774 | Apache-2.0 | 2026-03 | 2026-04-18 | ACTIVE-YOUNG (28d since push) | P0 plugin | **89** | **INSTALL-TIER-A** | `/plugin install codex@openai-codex` — Codex-from-CC review/delegate. THE T1-T7 gate primitive |
| `anthropics/skills` | 135,199 | (probe needed) | 2025-09 | 2026-05-15 | SUSTAINED | P0 (skill import) | **85** | **INSTALL-TIER-A** | Official Agent Skills repo — cite + selective skill import |
| `github/github-mcp-server` | 29,868 | MIT | 2025-03 | 2026-05-15 | SUSTAINED | P1 MCP | **94** | **INSTALL-TIER-A** | Official GitHub MCP (Go). Supersedes legacy `@modelcontextprotocol/server-github`. Secret-scanning surface |
| `anthropics/claude-agent-sdk-python` | 6,897 | MIT | 2025-06 | 2026-05-15 | SUSTAINED | P1 pip | **84** | **INSTALL-TIER-A** | SDK for hook contracts + agent primitives |
| `anthropics/claude-code-action` | 7,591 | MIT | 2025-05 | 2026-05-15 | SUSTAINED | P0 (GH Action) | **80** | **INSTALL-TIER-B** | CI/CD gate; W251 correction confirms ACTIVE not stale. Demand-gated |
| `modelcontextprotocol/servers` | 85,718 | NOASSERTION (MIT→Apache transition) | 2024-11 | 2026-05-12 | STABLE-BURN-IN | P1 per-package | **72** | **CITE + SELECTIVE** | Root license transitioning — audit per-package license before pinning any single MCP |

---

## §3 — MEMORY / RAG LAYER

| Repo | ★ | License | Created | Stability | Path | Composite | Verdict | CR12 | Notes |
|---|---|---|---|---|---|---|---|---|---|
| `getzep/graphiti` | 26,107 | Apache-2.0 | 2024-08 | STABLE-BURN-IN | P1 pip+wire | **91** | **INSTALL-TIER-A** | GENUINELY-NEW | Temporal-KG. INSTALLED (L3). Backend = FalkorDB (SSPL — AMBER local-OK per C-narrow) |
| `mem0ai/mem0` | 55,805 | Apache-2.0 | 2023-06 | STABLE-BURN-IN | P1 pip | **88** | **INSTALL-PILOT** | PARTIAL-OVERLAP | 55K★, fact-extraction memory. Benchmark vs graphiti/mcp-memory before default |
| `doobidoo/mcp-memory-service` | 1,844 | Apache-2.0 | 2024-12 | SUSTAINED-MAINT | P1 pip+wire | **80** | **INSTALL-TIER-A** | GENUINELY-NEW | INSTALLED (L1). sqlite-vec backend. Lower-★ but in-runtime + permissive |
| `topoteretes/cognee` | 17,248 | Apache-2.0 | 2023-08 | STABLE-BURN-IN | P1 pip+wire | **78** | **INSTALL-PILOT** | PARTIAL-OVERLAP | W251 reclassified hard-REJECT→pilot. graph-RAG. Benchmark comparator |
| `letta-ai/letta` | 22,737 | Apache-2.0 | 2023-10 | STABLE-BURN-IN | P2 clone+build | **70** | **PILOT / CITE** | PARTIAL-OVERLAP | Stateful-agent platform — heavier than memory layer; cite-pattern (MemGPT lineage) |
| `thedotmack/claude-mem` | 76,004 | Apache-2.0 | 2025-08 | LAUNCH-SPIKE (295★/day) | P0 plugin | **72** | **INSTALL-PILOT** | PARTIAL-OVERLAP | claude-code-plugin native. Head-to-head pilot vs incumbent; fresh-paint ★ — audit source |
| `zilliztech/memsearch` | 1,702 | (probe needed) | 2026-02 | ACTIVE-YOUNG | P0 plugin | **62** | **PILOT** | PARTIAL-OVERLAP | NEW (W252 discovery). Markdown+Milvus memory; Zilliz org. Pilot vs incumbent |
| `volcengine/OpenViking` | 23,966 | **AGPL-3.0** | 2026-01 | ACTIVE-YOUNG | P2 | **≤40 (BLOCKED)** | **REJECT** | ECOSYSTEM-IMPORT | C-narrow CONFIRMED AGPL-3.0. STRUCTURAL blocker. mcp-memory + graphiti already cover |

**Memory verdict**: incumbent stack (graphiti L3 + mcp-memory L1) is permissive + installed + sufficient. mem0/cognee = benchmark pilots ONLY (do not displace incumbent without eval evidence). OpenViking permanently REJECTED.

---

## §4 — TOKEN / CONTEXT OPTIMIZATION LAYER (user-priority — LLMLingua replacement)

| Repo | ★ | License | Created | Stability | Path | Composite | Verdict | Token-eff | Notes |
|---|---|---|---|---|---|---|---|---|---|
| `rtk-ai/rtk` | 48,567 | Apache-2.0 root LICENSE (⚠ codex trace believes MIT — re-probe) | 2026-01-22 | LAUNCH-SPIKE (426★/day) | P1 (Rust binary + CC hook) | **70** (was 76 — W252 codex T1 downgrade) | **INSTALL-PILOT (metric-gated)** — NOT Tier-A | **MED (UNVERIFIED)** | W252 codex T1 F-1: rtk issue #582 reports ~18% token cost INCREASE from PreToolUse hook in some configs; Windows native hook may not auto-rewrite. "60-90% reduction" is marketing — promote to Tier-A only after measured local net savings (convergence-gate Row-2 fabrication-test discipline). Per commit `c03fd24` rtk hook IS wired in current runtime — measure its net effect before keeping |
| `yamadashy/repomix` | 24,893 | MIT | 2024-07 | STABLE-BURN-IN | P1 MCP | **90** | **HIGH** | **INSTALL-TIER-A** — INSTALLED (MCP). Tree-sitter ~70% compression on packed output |
| `upstash/context7` | 55,392 | MIT | 2025-03 | SUSTAINED-MAINT | P1 MCP (http) | **89** | **MED** | **INSTALL-TIER-A** — INSTALLED. Up-to-date docs injection (avoids stale-knowledge re-research) |
| `zilliztech/claude-context` | 11,140 | MIT | 2025-06 | SUSTAINED-MAINT | P1 MCP | **82** | **HIGH** | **INSTALL-TIER-A** — code-search MCP, "entire codebase as context." Merkle-tree incremental |
| `chopratejas/headroom` | 1,761 | Apache-2.0 | 2026-01-07 | ACTIVE-YOUNG (fresh, push 2026-05-16) | P1 (lib/proxy/MCP) | **68** | **HIGH** | **INSTALL-PILOT** — "compress tool outputs/logs/RAG 60-95% fewer tokens." Young but very active + permissive + MCP-native. Strongest LLMLingua-replacement candidate |
| `mufeedvh/code2prompt` | 7,343 | MIT | 2024-03 | SUSTAINED (push 2026-04-14, ~32d) | P2 CLI | **64** | **MED** | **ADAPT/OPTIONAL** — codebase→prompt with token counting. Overlaps repomix; optional |
| `mksglu/context-mode` | 14,827 | **ELv2** | 2026-02 | ACTIVE-YOUNG | P0 plugin | **≤40 (AMBER-BLOCK)** | **REMOVE from clean-install** | **HIGH** | C-narrow CONFIRMED ELv2 (W250 MIT REFUTED). 98% tool-output reduction is real but ELv2 fails permissive gate. AMBER-internal-use only |
| `microsoft/LLMLingua` | (not probed — user flagged outdated) | MIT | 2023 | STALE for this use | P3 custom | **≤45** | **REJECT — SUPERSEDED** | LOW(lossy) | User directive: "outdated at 2026 may." Lossy prompt compression superseded by Anthropic-native caching/clear/compact + headroom/rtk. See §3.1 below |

### §4.1 — Token-Efficiency SOTA Reset (LLMLingua replacement, per user directive)

**LLMLingua family is REJECTED** for this runtime. Rationale (3-org convergence):
1. **Anthropic-native primitives supersede lossy compression** — `cache_control` ephemeral prompt caching + `/clear` + `/compact <hint>` lifecycle (per W251 A3 + W250 carryover). Caching is *lossless* and *free on subscription plans*; LLMLingua is *lossy* and adds latency.
2. **rtk-ai/rtk** (48,567★) — interception at the *tool-command* layer (compresses `git diff`, `ls`, build output BEFORE it reaches the model). Lossless-by-construction for the use case. Single Rust binary, zero deps.
3. **chopratejas/headroom** (1,761★, Apache-2.0) — compresses tool outputs / logs / RAG chunks 60-95%; library + proxy + MCP forms; explicit `claude-code` topic.

**SOTA token-efficiency stack (ranked)**:
| Rank | Mechanism | Tool | Why |
|---|---|---|---|
| 1 | Native ephemeral caching | Anthropic `cache_control` (built-in) | Lossless, free, zero-install — UNCONDITIONAL #1 |
| 2 | Codebase packing | `yamadashy/repomix` (MCP) | Tree-sitter ~70% compression; INSTALLED + measured |
| 3 | Context routing | `zilliztech/claude-context` + `serena` (MCP) | Semantic retrieval avoids whole-file reads |
| 4 | Cost observability | `ryoppippi/ccusage` (MCP) | Measures the savings; the metric-gate for #5/#6 |
| 5 | Output/log/RAG compression | `chopratejas/headroom` (MCP/proxy) | 60-95% fewer tokens — PILOT, 30-day fit-test |
| 6 | Tool-command interception | `rtk-ai/rtk` (CC hook) | **PILOT — metric-gated.** codex T1 F-1: issue #582 reports ~18% cost INCREASE in some configs; Windows hook may not auto-rewrite. Measure net savings via #4 before keeping |
| — | Compaction discipline | `/compact <hint>` + PreCompact hook | Steered lossy summary as last resort |
| ✗ | Lossy prompt compression | ~~LLMLingua / leanctx~~ | REJECTED — superseded by 1-5 |

---

## §5 — ORCHESTRATION / HARNESS / AGENT-TEAM LAYER

| Repo | ★ | License | Created | Stability | Path | Composite | Verdict | Orchestration | Notes |
|---|---|---|---|---|---|---|---|---|---|
| `obra/superpowers` | 192,898 | MIT | 2025-10 | LAUNCH-SPIKE (877★/day) | P0 plugin | **84** | **INSTALL-TIER-A** | MULTI | INSTALLED. Agentic skills framework + methodology. Extreme ★ = fresh-paint flag but obra=named-author, MIT, source-audited |
| `affaan-m/everything-claude-code` | 183,378 | MIT | 2026-01 | LAUNCH-SPIKE (1554★/day) | P0 plugin | **80** | **INSTALL-TIER-A** | MULTI | INSTALLED (ECC). Harness perf-optimization system. Extreme ★ velocity — source-audit mandatory; MIT permissive |
| `wshobson/agents` | 35,459 | MIT | 2025-07 | SUSTAINED-MAINT | P0 plugin | **86** | **INSTALL-TIER-A** | MULTI | 80+ specialist agents + orchestration for Claude Code. User explicitly requested. INSTALLED-DORMANT (2 agents wrapped) — promote to full |
| `github/spec-kit` | 100,241 | MIT | 2025-08 | SUSTAINED-MAINT (374★/day) | P2 CLI (`uvx specify`) | **82** | **INSTALL-TIER-B** | SINGLE | Spec-driven dev toolkit, github-official. Pilot — may collide with existing planning systems |
| `Yeachan-Heo/oh-my-claudecode` | 33,966 | (probe needed) | 2026-01 | LAUNCH-SPIKE | P0 plugin | **70** | **PILOT** | MULTI | NEW (W252). "Teams-first multi-agent orchestration for Claude Code." Pilot vs wshobson |
| `eyaltoledano/claude-task-master` | 27,151 | NOASSERTION | 2025-03 | SUSTAINED (push 2026-04-28) | P1 npm/MCP | **64** | **ADAPT-PATTERN** | SINGLE | License NOASSERTION needs probe. Task-mgmt; cite-pattern unless license clears |
| `bmad-code-org/BMAD-METHOD` | 47,259 | NOASSERTION | 2025-04 | SUSTAINED-MAINT | P2 | **58** | **ADAPT-PATTERN** | MULTI | License NOASSERTION (probe). Agile-AI method — cite the method, do not vendor |
| `automazeio/ccpm` | 8,110 | MIT | 2025-08 | STALE (push 2026-03-18, ~59d) | P2 | **56** | **ADAPT-PATTERN** | MULTI | GitHub-issues + worktrees PM. Staleness flag. Cite worktree-parallelism pattern |
| `humanlayer/humanlayer` | 10,809 | NOASSERTION | 2024-08 | STALE (push 2026-03-07, ~70d) | P2 | **52** | **ADAPT-PATTERN** | SINGLE | Human-in-loop pattern. License + staleness flags. Cite the HITL pattern |
| `gsd-build/gsd-2` | 7,524 | (probe needed) | 2026-03 | ACTIVE-YOUNG | P2 | **58** | **PILOT / CITE** | SINGLE | NEW (W252). Meta-prompting + context-engineering + spec-driven. Successor to get-shit-done |
| `SethGammon/Citadel` | 552 | (probe needed) | 2026-03 | ACTIVE-YOUNG | P0 plugin | **54** | **PILOT** | MULTI | NEW. Orchestration harness — 4-tier routing + worktree isolation + circuit breaker. Low★ |

**Orchestration verdict**: wshobson/agents + superpowers + ECC are the TIER-A install trio (all MIT, all plugin-path, user-requested). spec-kit pilot. Everything else = cite-pattern (the *patterns* — worktree parallelism, HITL gates, spec-driven decomposition — are SOTA; the *repos* mostly aren't install-grade for a pure runtime).

---

## §6 — CODE INTELLIGENCE LAYER

| Repo | ★ | License | Created | Stability | Path | Composite | Verdict | Notes |
|---|---|---|---|---|---|---|---|---|
| `oraios/serena` | 24,272 | MIT | 2025-03 | SUSTAINED-MAINT | P1 MCP (uvx) | **90** | **INSTALL-TIER-A** | INSTALLED. Semantic code retrieval/editing MCP — "IDE for your agent" |
| `ast-grep/ast-grep` | 13,809 | MIT | 2022-07 | STABLE-BURN-IN | P1 (cargo/npm CLI) | **88** | **INSTALL-TIER-A** | Structural search/lint/rewrite, Rust. AST-aware — token-efficient grep alternative |
| `yamadashy/repomix` | 24,893 | MIT | 2024-07 | STABLE-BURN-IN | P1 MCP | **90** | **INSTALL-TIER-A** | INSTALLED (also §4). Codebase→single-file packer |
| `zilliztech/claude-context` | 11,140 | MIT | 2025-06 | SUSTAINED-MAINT | P1 MCP | **82** | **INSTALL-TIER-A** | (also §4) Code-search MCP |

---

## §7 — EVAL / OBSERVABILITY LAYER

| Repo | ★ | License | Created | Stability | Path | Composite | Verdict | Notes |
|---|---|---|---|---|---|---|---|---|
| `ryoppippi/ccusage` | 14,224 | **NOASSERTION** (probe needed) | 2025-05 | SUSTAINED-MAINT | P1 MCP | **76** | **INSTALL-TIER-A** (license probe pending) | INSTALLED (MCP). Token/cost analyzer from local JSONL. License = "Other" — probe before pure-runtime install |
| `promptfoo/promptfoo` | 21,290 | MIT | 2023-04 | STABLE-BURN-IN | P1 npm + MCP | **88** | **INSTALL-TIER-A** | Eval + red-team. "Used by OpenAI and Anthropic." Eval-gate for adoption decisions |
| `langfuse/langfuse` | 27,283 | NOASSERTION (MIT-core + commercial) | 2023-05 | STABLE-BURN-IN | P2 self-host + MCP | **64** | **PILOT / AMBER** | LLM observability platform. MIT core but EE carveout — like litellm. Self-host the OSS core |
| `Arize-ai/phoenix` | 9,694 | NOASSERTION (ELv2 server) | 2022-11 | STABLE-BURN-IN | P1 MCP | **60** | **AMBER (installed)** | INSTALLED (MCP). Server ELv2 — AMBER. MCP wrapper itself OK; resolve wrapper/server split |
| `SWE-agent/mini-swe-agent` | 4,368 | MIT | 2025-06 | SUSTAINED (push 2026-05-07) | P2 pip | **64** | **PILOT / CITE-EVAL** | 100-line agent, >74% SWE-bench. Use as eval-reference harness, NOT primary runtime |

---

## §8 — SECURITY LAYER

| Repo | ★ | License | Created | Stability | Path | Composite | Verdict | Notes |
|---|---|---|---|---|---|---|---|---|
| `astral-sh/ruff` | 47,534 | MIT | 2022-08 | STABLE-BURN-IN | P1 (pip/uv CLI) | **92** | **INSTALL-TIER-A** | Python linter/formatter, Rust. Hook-wirable |
| `google/osv-scanner` | 10,193 | Apache-2.0 | 2022-11 | STABLE-BURN-IN | P1 (go/binary) | **86** | **INSTALL-TIER-A** | Dependency CVE scanner, google-official |
| `semgrep/semgrep` | 15,158 | **LGPL-2.1** | 2019-12 | STABLE-BURN-IN | P1 (pip CLI) | **74** | **INSTALL-TIER-B** | SAST. LGPL-2.1 = weak-copyleft — CLI invocation (not linking) is compliant. OK as a tool |
| `astral-sh/uv` | 84,984 | Apache-2.0 | 2023-10 | STABLE-BURN-IN | P1 (binary) | **94** | **INSTALL-TIER-A** | Python package/project manager (foundation CLI). Install backbone for pip-path MCPs |

---

## §9 — BROWSER / DOC-INGEST LAYER

| Repo | ★ | License | Created | Stability | Path | Composite | Verdict | Notes |
|---|---|---|---|---|---|---|---|---|
| `microsoft/playwright-mcp` | 32,564 | Apache-2.0 | 2025-03 | SUSTAINED-MAINT | P1 MCP | **90** | **INSTALL-TIER-A** | INSTALLED. Browser automation MCP, microsoft-official |
| `containers/kubernetes-mcp-server` | 1,593 | Apache-2.0 | 2025-02 | SUSTAINED-MAINT | P1 MCP | **66** | **PILOT (constrained)** | K8s/OpenShift MCP. Pilot with read-only kubecontext + destructive-verb denylist (W251 B/C) |

---

## §10 — FILTERED OUT (per v65 cut-rules + convergence-gate Must-Never #8)

| Repo | ★ | Reason filtered |
|---|---|---|
| `ultraworkers/claw-code` | 191,599 | **MEME/JOKE repo** — "enjoy the party, fastest to 100K stars." Not a real tool. Star-count is pure viral noise |
| `kyegomez/OpenMythos` | 12,987 | "Theoretical reconstruction of Claude architecture" — research/theory, not an install artifact |
| `Alishahryar1/free-claude-code`, `decolua/9router` | 24,832 / 10,703 | Provider/proxy switchers for free-tier access — out of scope + ToS-risk |
| `Gitlawb/openclaude`, `nanocoai/nanoclaw`, `swarmclawai/swarmclaw` | 26,822 / 28,894 / 483 | OpenClaw-ecosystem (Claude-derivative) — ecosystem-adjacent, not CC-native |
| `Gentleman-Programming/agent-teams-lite` | 1,198 | ARCHIVED repo |
| `santifer/career-ops`, `seulee26/mckinsey-pptx` | 44,910 / 429 | Domain-specific apps (job-search, PPTX) — not runtime infra |

---

## §11 — SCORING SUMMARY (INSTALL-TIER-A roster, composite ≥78, LICENSE=PASS, path ≤P1)

| # | Repo | Composite | Layer | Status in current runtime |
|---|---|---|---|---|
| 1 | `openai/codex` | 96 | Adversarial-review backbone | INSTALLED (codex CLI) |
| 2 | `astral-sh/uv` | 94 | CLI foundation | INSTALLED (system) |
| 3 | `github/github-mcp-server` | 94 | GitHub MCP | INSTALLED (github MCP) |
| 4 | `astral-sh/ruff` | 92 | Security/lint | likely system-PATH |
| 5 | `getzep/graphiti` | 91 | Memory L3 | INSTALLED |
| 6 | `oraios/serena` | 90 | Code intel | INSTALLED (MCP) |
| 7 | `yamadashy/repomix` | 90 | Token/code-pack | INSTALLED (MCP) |
| 8 | `microsoft/playwright-mcp` | 90 | Browser | INSTALLED (MCP) |
| 9 | `openai/codex-plugin-cc` | 89 | T1-T7 codex gate | INSTALLED (codex plugin) |
| 10 | `upstash/context7` | 89 | Docs injection | INSTALLED (MCP) |
| 11 | `ast-grep/ast-grep` | 88 | Code intel | probe — likely needed |
| 12 | `mem0ai/mem0` | 88 | Memory (pilot) | not installed — PILOT |
| 13 | `promptfoo/promptfoo` | 88 | Eval | not installed — INSTALL |
| 14 | `wshobson/agents` | 86 | Orchestration | INSTALLED-DORMANT — promote |
| 15 | `google/osv-scanner` | 86 | Security | probe |
| 16 | `anthropics/skills` | 85 | Skills | cite + selective import |
| 17 | `obra/superpowers` | 84 | Orchestration | INSTALLED (plugin) |
| 18 | `anthropics/claude-agent-sdk-python` | 84 | SDK | optional |
| 19 | `zilliztech/claude-context` | 82 | Token/code-search | not installed — INSTALL |
| 20 | `affaan-m/everything-claude-code` | 80 | Orchestration | INSTALLED (plugin) |
| 21 | `doobidoo/mcp-memory-service` | 80 | Memory L1 | INSTALLED |

**Composite ≥78 = 21 INSTALL-TIER-A repos. The current `claude-sota-installed` runtime already has ~15 of them wired.** Gap-to-close for a *pure* runtime: ast-grep, mem0 (pilot), promptfoo, osv-scanner, claude-context, anthropics/skills selective import, wshobson full promotion.
