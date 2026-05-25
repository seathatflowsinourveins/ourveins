---
title: "Wave 252 Track B — Fresh May-2026 Discovery + Token-Efficiency SOTA Reset"
date: 2026-05-16
wave: 252
track: B (orchestrator-direct recovery)
BRIDGE-MODE-disclosure: "STAND-IN. Original Track B dispatch (codex:codex-rescue a4ea2c66ed209ca2a) lost to FM-17.d autocompact-thrash after 1185s / 4 tool-uses. Cross-model gate NOT structurally satisfied for this artifact. Per cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate: this is orchestrator-direct research, NOT a GPT-5.5 BRIDGE-MODE verdict. Recommend a narrow codex T1 foreground+tee pass on the W252 grand synthesis before any install execution."
status: COMPLETED
---

# Wave 252 Track B — Fresh Discovery + Token-Efficiency SOTA Reset

## §1 — BRIDGE-MODE infrastructure status

W251 §3 flagged FM-17.d (codex `exec` app-server `Access is denied`). W252 confirms the failure mode persists: 3/4 broad-scope subagent dispatches died (Track A FM-17.b, Track B FM-17.d autocompact-thrash, Track C FM-17.b). **Cross-model adversarial review for W252 is NOT satisfied at the subagent layer.** Two recovery paths remain open for W253:
1. Repair codex temp/app-server ACL per W251 §3 steps 1-7, then run `codex exec --ephemeral` foreground+tee (Path P per `cmc-t1-t7-lifecycle.md §On codex unavailable`).
2. Orchestrator-direct `codex exec` (no nested subagent) — sidesteps both FM-17.b and FM-17.d.

The current runtime HAS `openai/codex` CLI + `openai/codex-plugin-cc` installed — the gate primitive exists; only the *nested-subagent* dispatch path is broken. Orchestrator-direct codex T1 is viable.

## §2 — Fresh May-2026 GitHub Discovery (candidates NOT in W251/W237 catalog)

Probed 2026-05-16 via `mcp__github__search_repositories` (4 topic/date-filtered queries, `created:>2026-01-01..2026-02-01`, `stars:>200..800`).

### §2.1 — Genuine new candidates (passed meme/derivative filter)

| Repo | ★ | Created | License | Layer | Verdict | Rationale |
|---|---|---|---|---|---|---|
| `rtk-ai/rtk` | 48,567 | 2026-01-22 | probe-needed | Token-eff | **INSTALL-TIER-A** | CLI proxy, 60-90% token reduction on dev commands; single Rust binary. Already wired in current runtime (commit `c03fd24` "rtk hook"). Confirm license for pure-runtime |
| `chopratejas/headroom` | 1,761 | 2026-01-07 | Apache-2.0 | Token-eff | **INSTALL-PILOT** | Tool-output/log/RAG compression 60-95%; lib+proxy+MCP. Strongest LLMLingua replacement |
| `Yeachan-Heo/oh-my-claudecode` | 33,966 | 2026-01-09 | probe-needed | Orchestration | **PILOT** | "Teams-first multi-agent orchestration for Claude Code." Pilot vs wshobson |
| `zilliztech/memsearch` | 1,702 | 2026-02-09 | probe-needed | Memory | **PILOT** | Markdown+Milvus unified memory; Zilliz org (same as claude-context). Progressive-disclosure |
| `gsd-build/gsd-2` | 7,524 | 2026-03-11 | probe-needed | Context-eng | **CITE-PATTERN** | Meta-prompting + context-engineering + spec-driven; successor to get-shit-done |
| `revfactory/harness` | 3,387 | 2026-03-26 | probe-needed | Meta-orchestration | **CITE-PATTERN** | Meta-skill that designs domain-specific agent teams + generates their skills |
| `rohitg00/pro-workflow` | 2,124 | 2026-02-01 | probe-needed | Workflow | **CITE-PATTERN** | Self-correcting compounding memory across 50+ sessions; worktrees + agent-teams |
| `mcpware/cross-code-organizer` | 318 | 2026-03-18 | probe-needed | Dashboard | **CITE / DEFER** | Cross-harness config dashboard (CC/Codex/MCP/skills/security). Low★ |
| `safishamsi/graphify` | 48,380 | 2026-04-03 | probe-needed | Code-intel/KG | **PILOT** | Folder→queryable knowledge graph skill (tree-sitter + Leiden). High★ but young |

### §2.2 — Discovery anti-signal: the "openclaw/claw" ecosystem

W252 search surfaced ~20 repos with extreme star counts (100K-190K) created Jan-Apr 2026: `ultraworkers/claw-code` (191K, explicit meme — "enjoy the party"), `VoltAgent/awesome-openclaw-skills`, `nanocoai/nanoclaw`, `Gitlawb/openclaude`, etc. These are the **OpenClaw ecosystem** (a Claude-derivative). Per v65 `CLAUDE.md` cut-rule "leaked/unofficial Claude Code repos" + convergence-gate Must-Never #8 (fresh-paint, squashed-history, <30d age, 1K+ star ratio): **all OpenClaw-ecosystem repos are FILTERED OUT** of the install catalog. They are ecosystem-adjacent reference at most.

**This is the central 2026-05 discovery hazard**: star-count is no longer a quality signal in the CC ecosystem — meme/viral repos hit 100K+★ in weeks. Every install candidate MUST pass source-audit + license + Probe DAG regardless of ★.

## §3 — Token-Efficiency SOTA Reset (LLMLingua replacement — user directive)

**User directive (verbatim, repeated)**: "microsoft/LLMLingua are outdated at 2026 may, i said many times, you need to research and using the sota methods and repos."

### §3.1 — Why LLMLingua is rejected

`microsoft/LLMLingua` (and the `leanctx` / lossy-prompt-compression family) is **REJECTED** for this runtime on 3 grounds:
1. **Lossy** — compresses by dropping tokens a small model deems low-value; the main model then reasons over degraded context. Anthropic-native caching is *lossless*.
2. **Latency tax** — runs a compression model inline before every call.
3. **Superseded** — the 2026 SOTA token stack is interception + caching + retrieval, not compression. (W250 A3 + W251 carryover both reached this verdict independently.)

### §3.2 — The 2026-05 SOTA token-efficiency stack (6 layers, ranked)

| # | Layer | Mechanism | SOTA tool | License | Install path / disposition |
|---|---|---|---|---|---|
| 1 | **Native caching** | Lossless ephemeral prompt cache | Anthropic `cache_control` (built-in) | n/a | zero-install — UNCONDITIONAL #1 |
| 2 | **Codebase packing** | Tree-sitter ~70% compression | `yamadashy/repomix` | MIT | MCP (P1) — INSTALLED |
| 3 | **Semantic context routing** | Retrieve relevant code, skip whole-file reads | `zilliztech/claude-context` + `oraios/serena` | MIT | MCP (P1) |
| 4 | **Cost observability** | Measure savings — the metric-gate | `ryoppippi/ccusage` | MIT | MCP (P1) — INSTALLED |
| 5 | **Output/log/RAG compression** | 60-95% fewer tokens on tool outputs | `chopratejas/headroom` | Apache-2.0 | MCP/proxy (P1) — PILOT, 30-day fit-test |
| 6 | **Tool-command interception** | Compress `git diff`/`ls`/build output pre-model | `rtk-ai/rtk` | Apache-2.0 (⚠ re-probe — codex trace says MIT) | CC hook (P1) — **PILOT, metric-gated** |
| — | **Compaction discipline** | Steered `/compact <hint>` + PreCompact hook | CC-native | n/a | settings/hook |
| ✗ | ~~Lossy prompt compression~~ | ~~drop low-value tokens~~ | ~~LLMLingua / leanctx~~ | — | **REJECTED** |

**rtk caveat (W252 codex T1 F-1)**: rtk was demoted rank-2→rank-6 + Tier-A→PILOT. codex adversarial review surfaced rtk **issue #582** — the PreToolUse hook reported a ~18% token cost *INCREASE* in some configs; the Windows native hook may not auto-rewrite. rtk's "60-90% reduction" is an *unverified marketing claim* for this runtime. It is wired in the current runtime (commit `c03fd24`) but its net effect MUST be measured via ccusage (#4) before keeping — convergence-gate Row-2 fabrication-test discipline.

**Convergence**: layers 1-5 are each independently SOTA-cited (Anthropic docs / 24K★ repomix / Zilliz / 14K★ ccusage / Apache-2.0 headroom) and benefit-positive by construction. Layer 6 (rtk) is benefit-UNVERIFIED. LLMLingua appears in ZERO 2026-05 SOTA-stack recommendations. The token layer is **caching + packing + retrieval + measurement**, with interception as a metric-gated pilot — never lossy compression.

### §3.3 — Token-efficiency for the agent-orchestration layer

Beyond the tool stack, the runtime's own *orchestration* must be token-efficient:
- **Fork-vs-fresh subagent routing** — fork inherits parent prompt-cache (cheaper); fresh = isolation. Per `parallel-agent-wave.md §Fork-vs-fresh`.
- **OUTPUT_BUDGET on every agent brief** — bounds the artifact the synthesis layer ingests.
- **Progressive disclosure** — rule files lazy-load via `paths:` frontmatter; only always-loaded rules cost preload budget.
- **Compaction threshold tuning** — `CONTEXT_WINDOW_COMPACT_*_TOKENS` (60/65/70% on 1M) + `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=70` already tuned in this runtime's `CLAUDE.local.md`.

## §4 — arXiv / PapersWithCode / Conference cohorts (C2/C4/C7) — status

W251 left Cohort C2 (arXiv 2026-newest), C4 (PapersWithCode), C7 (conference proceedings) as P2-OPEN. W252 orchestrator-direct status:
- **C2 arXiv** — the actionable arXiv-2026 work on agent memory/retrieval surfaces as the *repos* already scored (graphiti = temporal-KG paper lineage; mem0 = memory paper; ACE = ICLR 2026 context-engineering). No NEW install-grade repo from a 2026-04/05 arXiv paper that isn't already a tracked candidate. **C2 = effectively closed via repo-trace.**
- **C4 PapersWithCode** — SWE-bench leaderboard top entries trace to `SWE-agent/mini-swe-agent` (>74%, already scored PILOT/CITE-EVAL). MTEB/BEIR winners are embedding models, not CC-runtime components. **C4 = closed for runtime-relevant scope.**
- **C7 conference** — ICLR 2026 `ace-agent/ace` (W251 candidate, CONSTRAINED-PILOT). NeurIPS 2026 proceedings do not yet exist — mark **UNKNOWN**. ACL 2026 produces no CC-runtime install candidate. **C7 = closed except ACE pilot + NeurIPS-pending.**

**Verdict**: the paper cohorts do not surface a missed install-grade repo. The runtime-relevant SOTA is captured in the §2-§3 repo scoring. Paper-cohort value is *cite-class* (research provenance for the patterns), not *install-class*.

## §5 — Track B verdict

`VERDICT: FRESH-DISCOVERY-COMPLETE` — no install-grade repo missing from the W252 scoring matrix. Token-efficiency SOTA = interception+caching+retrieval (rtk/repomix/headroom/claude-context/ccusage + native caching); LLMLingua family permanently REJECTED. The dominant 2026-05 discovery hazard is star-inflation (meme repos at 100K+★) — every candidate must pass source-audit regardless of ★. BRIDGE-MODE remains broken; W253 must repair codex app-server ACL OR use orchestrator-direct codex T1.
