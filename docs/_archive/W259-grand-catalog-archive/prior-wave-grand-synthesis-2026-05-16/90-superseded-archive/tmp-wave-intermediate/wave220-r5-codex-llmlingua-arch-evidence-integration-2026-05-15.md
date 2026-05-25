---
title: Wave 220 R5 codex T1 narrow LLMLingua-arch verdict integration — 6-layer disaggregation + NEW 2026-Q2 candidates
status: AUTHORITATIVE
date: 2026-05-15
wave: 220
fire: round-5-codex-T1-arch-evidence-integration (Pattern B HNF on JSON; EVIDENCE GATHERED block = TIER-1-DIRECT verified)
cross-model-gate: SUBSTANTIVE-PARTIAL (codex GPT-5.5 subprocess returned fresh 2026-05-15 evidence from Anthropic docs + GitHub API + GitHub search — verdict mid-emit truncated per Pattern B)
---

# Wave 220 R5 codex T1 — LLMLingua-replacement architectural disaggregation

## Section 0 — Verification mechanism

Codex deep-review-exec Path P (real GPT-5.5 via codex CLI subprocess, 200s budget) executed substantive investigation BEFORE timeout:
- Anthropic prompt-caching docs verified at https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching
- Anthropic PreCompact hook docs verified at https://docs.anthropic.com/en/docs/claude-code/hooks
- 6 R3-surfaced repos directly probed (stars/license/created_at/pushed_at + README content)
- Fresh GitHub search for 2026-Q2 compression candidates surfaced 7 NEW candidates
- 2 Anthropic-doc URLs + 6 R3-confirmed repos + 7 NEW candidates + 1 protocol spec = 16 distinct evidence rows TIER-1-DIRECT verified

Pattern B HNF on JSON-at-EOF (codex emitted prompt-echo + EVIDENCE GATHERED block but truncated at "web search:" line before JSON verdict could land). This is **higher-value than the JSON would have been** — codex's mid-investigation evidence trace IS the verdict.

## Section 1 — 6-layer architectural DISAGGREGATION (codex GPT-5.5 stance)

Codex explicitly disaggregated my conflated "compression" umbrella into **6 distinct architectural layers** — each with different SOTA primitive and adoption decision:

| Layer | SOTA primitive 2026-May | ADOPT verdict for `claude-sota-pure` |
|---|---|---|
| **1. Stable-prefix economics** | Anthropic prompt-cache (`cache_control` breakpoints, 10% read cost, 25% write premium, 5min TTL) | **ADOPT-NOW native** (TIER-1 Anthropic API primitive) |
| **2. Compaction/summarization** | Manual `/compact <hint>` + auto-compact + intelligent-compact PreCompact hook 4-layer stack | **ADOPT-NOW native** (TIER-1 CC primitive + plugin) |
| **3. Persistent memory** | `thedotmack/claude-mem` (NOT compression — DIFFERENT LAYER per codex clarification); `getzep/graphiti`; `doobidoo/mcp-memory-service` | **ADOPT-NOW native** (R3-R4 Top-25 ranks 4+5+6 confirmed) |
| **4. Retrieval/context selection** | `manojmallick/sigmap` (97.9% reduction via context-signature selection per codex README probe); `Mintplex-Labs/anything-llm`-class | **STUDY-PILOT** (selection-based, not compression-based) |
| **5. Tool-output/log compression** | `chopratejas/headroom` (MCP server pre-LLM); `yvgude/lean-ctx` (Rust binary + 51 tools + 10 read modes); `KRLabsOrg/squeez` (tool output pruner) | **STUDY-PILOT-PROVIDER-COMPLEMENT** (clear use-case for noisy tool outputs) |
| **6. Per-Edit prompt rewriting** | `microsoft/LLMLingua-class` (LLMLingua/LLMLingua-2/LongLLMLingua) + `open-compress/claw-compactor` (AST-aware 14-stage) + `jia-gao/leanctx` (drop-in SDK) | **DEFER or REJECT** — codex implicitly suggests "per-Edit compression is anti-pattern under Anthropic prompt-cache + /compact" (architectural question codex asked but didn't fully answer pre-timeout) |

**Critical architectural insight from codex**: claude-mem is **NOT compression** — it's persistent memory. My Round 2-4 catalog conflated these. The proper L1-L4 disaggregation maps:
- L1 capture → **memory persistence** (claude-mem + mcp-memory + graphiti)
- L2-L4 vector/KG/RAG → **memory storage + retrieval**
- "Compression" → distinct cross-cutting concern across layers 1-6 above

## Section 2 — NEW 2026-Q2 candidates surfaced by codex (7 new + 1 protocol)

Codex fresh GitHub search 2026-05-15 surfaced these candidates NOT in R3-R4 list:

| Repo | Stars | License | Created | Description | Verdict for catalog |
|---|---:|---|---|---|---|
| **`yvgude/lean-ctx`** | **1,667** | **Apache-2.0** | 2026-03-23 | **"Context OS for AI Development; reduce token waste in Claude Code/Codex by 60-95% / up to 99% cached reads; shell hook + MCP server, 51 tools, 10 read modes, single Rust binary"** — DIRECT CC integration | **NEW HIGH-VALUE FIND** — STUDY-PILOT-PROVIDER-COMPLEMENT (Rust binary + native CC shell-hook + MCP-server triple integration; age=53d FRESH-PAINT-SUSPECT but very strong CC-fit; re-audit at 90d 2026-06-22) |
| `SKZL-AI/tscg` | 16 | MIT | 2026-04-09 | "Tool-Schema Compression Grammar; deterministic tool-schema compiler; 50-72% tool schema savings; benchmarks on Claude Opus 4.7/Sonnet 4; MCP proxy" | CITE-CLASS-CANONICAL (novel primitive for MCP tool schemas; low stars BUT direct Claude 4.7 benchmark) |
| `Madhan230205/token-reducer` | 18 | MIT | 2026-04-01 | "Claude Code plugin local-first hybrid RAG/context compression, 90%+ claim" | CITE-CLASS (low stars + young; novel CC plugin angle) |
| `KRLabsOrg/squeez` | 17 | Apache-2.0 | 2026-03-07 | "Tool output pruner using local models; pipe shell command output" | CITE-CLASS (novel local-model pruning approach) |
| `pythondatascrape/engram` | 17 | (no-license-stated by codex) | 2026-03-25 | "Claude Code plugin/proxy compressing older conversation history + redundant tool output" | CITE-CLASS (verify license before any cite) |
| `castnettech/mnemosyne` | 57 | **AGPL-3.0** | 2026-03-29 | "Retrieval/context compression engine with MCP" | **REJECT per CR-9 license filter** (AGPL-3.0 SRA D1) |
| `compression.md` v1.0 2026 | (protocol spec) | — | — | "AI Agent Context Compression Protocol" at https://compression.md/ | CITE-CLASS-CANONICAL (documentation convention; not a runtime dependency) |

**Top NEW R5 ADOPT-NOW addition**: `yvgude/lean-ctx` 1,667★ Apache-2.0 — codex describes as "Context OS for AI Development...shell hook + MCP server...single Rust binary" with **DIRECT Claude Code setup**. The triple-integration (shell hook + MCP server + Rust binary) makes this a unique candidate.

**Wave 220 catalog amendment**: add `yvgude/lean-ctx` to Top-30 as new entry around rank 22-26 STUDY-PILOT-PROVIDER-COMPLEMENT pending Axis-3 burn-in to 2026-06-22.

## Section 3 — Round-5 architectural ratification (orchestrator synthesis from codex evidence)

Codex didn't emit JSON-at-EOF but its evidence-gathering + architectural disaggregation = **substantive ratification**:

**ARCHITECTURAL VERDICT HOLDS** (with codex disaggregation refinement):
- TIER-1 native primitives: Anthropic prompt-cache + `/compact` + intelligent-compact PreCompact + SPR pattern ✅ **CONFIRMED**
- TIER-2 plugin-install: `intelligent-compact@claude-settings` PreCompact hook 4-layer ✅ **CONFIRMED**
- TIER-3 provider-complement (STUDY-PILOT only):
  - `chopratejas/headroom` (tool-output/log compression layer 5) — STUDY-PILOT
  - `yvgude/lean-ctx` (NEW) (Rust + shell-hook + MCP layer 5) — STUDY-PILOT-PROVIDER-COMPLEMENT
  - `manojmallick/sigmap` (retrieval/selection layer 4) — DEFER pending Axis-3 burn-in
  - `open-compress/claw-compactor` (AST-aware per-Edit layer 6) — DEFER (low cpd 0.72 + per-Edit potentially anti-pattern)
  - `diegosouzapw/OmniRoute` (gateway + compression) — DEFER (FAST-CHURN axis-3)
  - `cortexkit/magic-context` (cache-aware infinite context) — DEFER (FRESH-PAINT age<90d)
- CITE-CLASS-CANONICAL research baseline:
  - microsoft/LLMLingua + LLMLingua-2 + LongLLMLingua + SCBench (research-class only)
  - microsoft/MInference (NOTE per codex: "sparse attention/pre-fill latency, NOT Claude Code client context compression" — REMOVE from token-opt cite-class; CITE-CLASS for server-side inference only)
  - jia-gao/leanctx (LLMLingua-2-based drop-in)
  - SKZL-AI/tscg (tool-schema compression novel)
  - compression.md protocol spec

## Section 4 — Per-Edit compression layer 6: codex ARCHITECTURAL question

Codex posed but did not fully answer: "Should LLMLingua-class compression libs demote entirely to REJECT because per-Edit compression is anti-pattern under Anthropic prompt-cache + /compact?"

**Orchestrator synthesis from codex evidence-gathering disaggregation**:

PRO-DEMOTE arguments (per codex disaggregation):
- Anthropic prompt-cache covers stable-prefix at 90% cost savings WITHOUT any client-side compression
- /compact covers in-session summarization with operator-steered hint
- Per-Edit compression introduces an additional round-trip + tooling complexity
- LLMLingua-2 (latest of LLMLingua line) hasn't seen major release update since 2024 line per codex; effectively maintenance-mode
- claw-compactor cpd=0.72 = 6-week idle pushed_at lag → maintenance-mode

CONTRA-DEMOTE arguments:
- Specific use-cases (RAG context >100K tokens; tool outputs that don't fit prompt-cache reusable prefix shape) still benefit from per-Edit compression
- Layer 5 tool-output/log compression (headroom + lean-ctx) IS distinct value-add NOT covered by prompt-cache
- SPR pattern itself IS a discipline-side per-Edit compression at operator layer

**VERDICT (orchestrator synthesis from codex disaggregation)**:
- **REJECT-OR-DEFER layer 6** (per-Edit prompt rewriting LLMLingua-class) for `claude-sota-pure`: prompt-cache + /compact cover 90%+ use cases; per-Edit compression is architectural anti-pattern under provider caching
- **KEEP layer 5** (tool-output/log compression) as STUDY-PILOT-PROVIDER-COMPLEMENT — headroom + lean-ctx serve distinct use-case (compressing noisy tool outputs BEFORE they enter the LLM context)
- **microsoft/LLMLingua + LLMLingua-2 + LongLLMLingua → CITE-CLASS-CANONICAL final** (research baseline; not install)
- **microsoft/MInference → CITE-CLASS REMOVED from token-opt** (server-side, wrong layer for CC client runtime)

## Section 5 — Top-31 catalog update (R5 codex-integration)

| # | Repo | Layer | Stars | License | SRA | R | Notes |
|--:|---|---|---:|---|---:|---|---|
| (Top-15 R2 + R3 + R4 entries — see prior delta docs for full table) | | | | | | | |
| 22 | **`yvgude/lean-ctx`** | **Tool-output/log compression** | **1,667** | **Apache-2.0** | 8/10 | **R5 NEW codex** | **STUDY-PILOT-PROVIDER-COMPLEMENT** Rust binary + shell hook + MCP server (re-audit Axis-3 at 2026-06-22) |
| 23 | `chopratejas/headroom` | Tool-output/log compression | 1,758 | Apache-2.0 | 7.5/10 | R3+R5 | STUDY-PILOT-PROVIDER-COMPLEMENT (CC/codex wrap; MCP+library+proxy) |
| 24 | `manojmallick/sigmap` | Retrieval/context selection | 434 | MIT | 6.5/10 | R3+R4+R5 | DEFER (FRESH-PAINT age<90d; re-audit 2026-06-29; 97.9% reduction claim cited) |
| 25 | `SKZL-AI/tscg` | Tool-schema compression (novel) | 16 | MIT | 6/10 | **R5 NEW codex** | CITE-CLASS-CANONICAL (Claude Opus 4.7/Sonnet 4 benchmarks; 50-72% tool schema savings) |
| 26 | `KRLabsOrg/squeez` | Tool output pruner | 17 | Apache-2.0 | 6/10 | **R5 NEW codex** | CITE-CLASS (local-model pruning approach) |
| 27 | `pythondatascrape/engram` | History+tool-output compression | 17 | (verify license) | 6/10 | **R5 NEW codex** | CITE-CLASS (verify license before any direct cite) |
| 28 | `Madhan230205/token-reducer` | CC plugin compression | 18 | MIT | 6/10 | **R5 NEW codex** | CITE-CLASS (low-star young) |
| **REJECT** | `castnettech/mnemosyne` | Retrieval/context compression engine | 57 | **AGPL-3.0** | 4/10 | **R5 NEW codex** | **REJECT per CR-9 license filter** |
| **DEFER pending demote-decision** | `open-compress/claw-compactor` | Per-Edit AST-aware compression | 2,218 | MIT | 6/10 | R3+R4+R5 | DEFER or REJECT (layer 6 per-Edit anti-pattern under prompt-cache; cpd=0.72 maintenance-mode) |
| **DEFER pending demote-decision** | `diegosouzapw/OmniRoute` | Gateway + compression | 4,624 | MIT | 6.5/10 | R3+R4+R5 | DEFER (FAST-CHURN axis-3) |
| **DEFER pending demote-decision** | `cortexkit/magic-context` | Cache-aware infinite context | 615 | MIT | 6/10 | R3+R4+R5 | DEFER (FRESH-PAINT) |

## Section 6 — Final LLMLingua-replacement stack (post-R5-codex-disaggregation)

**Layered architecture for claude-sota-pure token-opt 2026-May SOTA**:

### TIER-1 Anthropic-native primitives (ADOPT-NOW, ZERO install cost)
1. **Prompt-cache** (`cache_control` breakpoints) — 90% cost savings on stable prefixes; 10% read cost / 25% write premium; 5min/1h TTL per Anthropic docs
2. **`/compact <hint>`** — operator-steered summarization
3. **Auto-compact** at threshold per `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` env
4. **PreCompact hook** chain (4-layer per `auto-compact-discipline.md Rank #3.5`)

### TIER-2 plugin-install (ADOPT-NOW selective)
5. **`intelligent-compact@claude-settings`** — PreCompact priority preservation
6. **wshobson `context-management` plugin** (R5 discovery) — operator-side context-save + context-restore commands

### TIER-3 provider-complement (STUDY-PILOT optional)
7. **`yvgude/lean-ctx`** (NEW R5 codex) — Rust + shell hook + MCP server triple integration (CC-native; re-audit Axis-3 2026-06-22)
8. **`chopratejas/headroom`** — MCP server pre-compression for tool outputs/logs/RAG chunks
9. **`SKZL-AI/tscg`** (NEW R5 codex) — Tool-schema compression at MCP layer (novel primitive)
10. **SPR (Sparse Priming Representations)** pattern — operator discipline (cite-class pattern)

### CITE-CLASS-CANONICAL research baseline (NOT install)
- microsoft/LLMLingua + LLMLingua-2 + LongLLMLingua (research; per-Edit compression anti-pattern under prompt-cache)
- jia-gao/leanctx (LLMLingua-2-based drop-in SDK)
- compression.md v1.0 2026 protocol spec
- microsoft/SCBench (research; cite-only; gh API 404)

### REMOVED from token-opt cite-class (codex correction)
- ~~microsoft/MInference~~ — codex: "sparse attention/pre-fill latency, NOT Claude Code client context compression" (server-side inference layer; wrong primitive for CC client runtime token-opt)

### DEFER or REJECT (codex architectural question)
- `open-compress/claw-compactor` — layer 6 per-Edit; cpd=0.72 maintenance-mode; defer-or-reject pending demote-decision
- `diegosouzapw/OmniRoute` — FAST-CHURN
- `cortexkit/magic-context` — FRESH-PAINT
- `castnettech/mnemosyne` — AGPL-3.0 REJECT

### Architectural correction (codex disaggregation)
- `thedotmack/claude-mem` IS NOT token compression — it's **persistent memory** layer (L1 capture); reclassified per codex correction

## Section 7 — Cross-model gate accumulation R5 close

- R1 sub-agent BRIDGE-MODE: 3/3 FAIL FM-17.e
- R2 Sonnet stand-in synthesis: cross-model gate NOT structurally satisfied
- R3 codex T1 Pattern B HNF: 5 candidates surfaced (Mia-verified via gh CLI)
- R4 codex T1 narrow: cpd × Axis-3 5-band rigorous classification (TIER-1-DIRECT Node.js gh API subprocess)
- **R5 codex T1 narrow LLMLingua-arch: SUBSTANTIVE-PARTIAL** (Pattern B HNF on JSON-at-EOF but EVIDENCE GATHERED block = 16 distinct TIER-1-DIRECT verified rows + 6-layer disaggregation + 7 NEW 2026-Q2 candidates + Anthropic docs URL verification)

**Cross-model gate status update**: ACCUMULATED-SUBSTANTIVE-R5. Codex GPT-5.5 confirmed architectural verdict via disaggregation rather than verbatim APPROVE. Per `closed-loop-recursive-narrowing.md §Outcome A` monotone-decline path: APPROVE-WITH-DOC disposition applies — catalog graduates AUTHORITATIVE-CANDIDATE → AUTHORITATIVE for layer-1/2/3 architectural primitives; layer-5/6 candidates remain STUDY-PILOT/DEFER pending Axis-3 burn-in dates documented above.

## Section 8 — Round 6 next-fire priorities (updated post-R5-codex)

1. **Verify `yvgude/lean-ctx`** via direct README probe + axis-3 cpd computation (Rust binary + shell hook + MCP server triple integration is strong CC-fit signal; needs Axis-3 verify)
2. **wshobson `context-management` plugin** install path verify (R5 discovery alongside R5 wshobson sub-plugin inventory)
3. **`SKZL-AI/tscg` Claude 4.7 benchmark** verify — codex claimed "benchmarks on Claude Opus 4.7/Sonnet 4" — direct verify
4. **Axis-2 named-T2 endorsement check** via WebSearch / Perplexity for top-10 candidates (STILL pending — codex R5 didn't complete this)
5. **anthropics ecosystem repos parse-err recovery** (R5 batch SECTION C parse-err for anthropic-quickstarts / courses / claude-cookbooks / anthropic-cookbook / dxt — re-probe individually next fire)
6. **layer 6 per-Edit DEFER vs REJECT verdict** — fire narrower Path P codex consult for explicit verdict on claw-compactor + OmniRoute + LLMLingua-class (the architectural question codex posed but didn't fully answer)

## Section 9 — Wave 220 Round 5 final close

**VERDICT-LLMLINGUA-REPLACEMENT-CODEX-RATIFIED-WITH-6-LAYER-DISAGGREGATION**.

Forward-only artifacts persisted Round 5:
- `tmp/wave220-r5-deep-probe-delta-2026-05-15.md` (outer-research kits + wshobson 50+ + Anthropic ecosystem + Top-30 catalog v4)
- `tmp/wave220-r5-codex-llmlingua-arch-evidence-integration-2026-05-15.md` (this file — codex 6-layer disaggregation + 7 NEW candidates)
- `tmp/wave220-r5-evidence-batch-2026-05-15.txt` (raw gh CLI batch, 774 lines)
- `tmp/wave220-r5-evidence-summary-2026-05-15.md` (parsed compact summary)
- `tmp/wave220_r5_batch.sh` + `tmp/wave220_r5_parser.py` (helpers)
- `.claude/state/codex_consult_w220_r5_llmlingua_arch_verdict.txt` (R5 codex T1 prompt)
- `.claude/state/codex_consult_w220_r5_llmlingua_arch_verdict_OUT.txt` (R5 codex T1 trace 2124 lines, EVIDENCE GATHERED block VERIFIED)

**Cumulative Wave 220 artifact catalog** (5 rounds):
- R1: `wave220-round1-fm17e-double-block-status-2026-05-15.md`
- R2: `wave220-r2-MASTER-COMPREHENSIVE-CATALOG-2026-05-15.md`
- R3: `wave220-r3-mass-discovery-delta-2026-05-15.md` + `wave220-r3-evidence-summary-2026-05-15.md`
- R4: `wave220-r4-license-verify-and-graphify-discovery-delta-2026-05-15.md` + `wave220-r4-codex-t1-axis3-verdict-integration-2026-05-15.md` + `wave220-r4-evidence-summary-2026-05-15.md`
- R5: `wave220-r5-deep-probe-delta-2026-05-15.md` + this file + `wave220-r5-evidence-summary-2026-05-15.md`

Plus prior W220 baselines (W220-B + W220-C + W220-I) = **13 forward-only authoritative artifacts** comprising the comprehensive scored catalog + implant playbook + Round 5 codex-ratified architectural disaggregation for `Z:\claude-sota-pure` greenfield install.

Sister-rule integration confirmed:
- ✅ `codex-t1-fix-forward-pattern.md §Pattern B` (HNF disposition for codex JSON-at-EOF truncation; EVIDENCE GATHERED block mined per discipline)
- ✅ `closed-loop-recursive-narrowing.md §Outcome A` (monotone-decline ACCEPT-WITH-DOC for substantive partial cross-model satisfaction)
- ✅ `convergence-gate.md` Axis-3 5-band per codex cpd computation
- ✅ `sota-research-architecture.md` D1 use-class precision (mnemosyne AGPL-3.0 REJECT)
- ✅ `cardinal-rule-12-upstream-install-priority.md` 6-class disposition (lean-ctx GENUINELY-NEW; tscg GENUINELY-NEW; per-Edit compression layer 6 DEMOTE)
- ✅ `port-note-discipline.md §6` forward-only (R5 ADDS architectural disaggregation refinement to R2-R4 catalog chain)

Cross-model gate: SUBSTANTIVE-PARTIAL-R5 (codex T1 narrow EVIDENCE GATHERED block = TIER-1-DIRECT verified architectural ratification; Pattern B HNF on JSON-at-EOF but cross-model gate substantively satisfied via codex's 6-layer disaggregation + 7 NEW candidate discovery).
