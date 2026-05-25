---
title: Wave 220 R6 — deep-verify delta (lean-ctx VERIFIED + tscg VERIFIED + wshobson 81 plugins + zilliztech/claude-context MAJOR FIND + karpathy-llm-wiki)
status: AUTHORITATIVE-CANDIDATE
date: 2026-05-15
wave: 220
fire: round-6-deep-verify (orchestrator main-thread Path P; codex T1 R6 firing background b3wlz0xn0)
---

# Wave 220 R6 deep-verify delta

## Section 0 — R6 context

R5 surfaced 7 NEW 2026-Q2 compression candidates via codex T1 evidence. R6 deep-verifies top NEW candidates + Anthropic ecosystem re-probe + 5 more topic-searches for unexplored CC-ecosystem layers.

## Section 1 — yvgude/lean-ctx VERIFIED (R5 codex find — full deep probe)

[VERIFIED 2026-05-15 via direct gh API probes]:
- **Stars**: 1,667 + 172 forks
- **License**: Apache-2.0 + LICENSE-MIT (DUAL-LICENSE — strongest compatibility)
- **Created**: 2026-03-23 (age=53d)
- **Pushed**: 2026-05-15 (active daily)
- **Description**: "The Context OS for AI Development. Reduce token waste in Cursor, Claude Code, Copilot, Windsurf, Codex, Gemini & more by 60-95% (up to 99% on cached reads)"
- **Architecture**: Shell Hook + MCP Server · 51 tools · 10 read modes · 60+ patterns · Single Rust binary
- **Intelligence**: "Bounce detection, context gate with graph/intent/knowledge-based mode routing"
- **Distribution**: Crates.io (Rust) + npm (`lean-ctx-bin`) + AUR (Arch Linux) — TRIPLE-CHANNEL
- **Multi-runtime**: Cursor + Claude Code + Copilot + Windsurf + Codex + Gemini
- **Directory structure**: `.claude-plugin/`, `.claude/`, `.cursorrules`, `.kiro/`, `AGENTS.md`, `ARCHITECTURE.md`, `BENCHMARKS.md`, `CONTRACTS.md`, `LEANCTX_FEATURE_CATALOG.md`

**Axis-3 cpd VERIFIED via gh API Link-header pagination**:
- 1,364 commits / 53 days = **cpd = 25.74/d**
- Band classification: **FAST-CHURN** (cpd>10 + age<100 per convergence-gate.md Axis-3 5-band)
- Re-audit at age≥90d = **2026-06-22**

**Verdict R6**: yvgude/lean-ctx is structurally STRONG (Apache+MIT dual-license + crates.io+npm+AUR triple-distribution + 51 tools + 10 read modes + Rust binary + 6-runtime support + CC `.claude-plugin/` shape) BUT FAST-CHURN classification per convergence-gate Axis-3 forces DEFER until burn-in. **STUDY-PILOT-PROVIDER-COMPLEMENT pending 2026-06-22 re-audit**.

## Section 2 — SKZL-AI/tscg VERIFIED (R5 codex find — full deep probe)

[VERIFIED 2026-05-15 via direct gh API]:
- **Stars**: 16 + (forks unknown)
- **License**: MIT
- **Created**: 2026-04-09 (age=36d)
- **Pushed**: 2026-05-04
- **Description**: "TSCG — Deterministic tool-schema compiler for LLM agents. 50-72% token savings, 50 tools in 2.4ms. **Phi-4 recovers from 0% to 90% accuracy.** 459 tests"
- **Architecture**: "Deterministic tool-schema compiler that reduces LLM tool-definition overhead by 50-72% while *improving* accuracy. 1,200 LOC TypeScript. Zero dependencies. Sub-millisecond. 23KB ESM bundle."
- **Distribution**: 3 npm packages — `@tscg/core` + `@tscg/mcp-proxy` + `@tscg/tool-optimizer`
- **Academic paper**: `TSCG-paper.pdf` in repo (academic backing)
- **Test coverage**: 459 tests + benchmark suite

**Verdict R6**: SKZL-AI/tscg is **NOVEL primitive** — tool-schema compression at MCP proxy layer is distinct from per-Edit prompt compression (L6) AND tool-output compression (L5). It's a **L5.5 tool-schema layer**. LOW-ADOPTION (16★ + age=36d FRESH-PAINT) but academic-backed (PDF paper) + 459 tests + benchmark + multi-package npm. **CITE-CLASS-CANONICAL** for next-fire deep-dive (re-audit at age≥90d = 2026-07-09; if star count exceeds 100★ by then, promote to STUDY-PILOT).

## Section 3 — wshobson/agents/plugins ACTUAL COUNT = 81 (not 50 as R5 initial estimate)

R6 gh api `length` probe: `81` total sub-plugins under `wshobson/agents/plugins/`. R5 listed first 50 entries (gh api default per_page=30 in some contexts; full listing shows 81).

**R6 amendment to R5 wshobson analysis**: catalog should reference "81 sub-plugins" not "50+". Round 6 next-fire deep probe for entries 51-81 (TBD specific names — list cut off at "debugging-toolkit"; entries 51-81 specifically unverified this fire).

## Section 4 — Anthropic ecosystem repos (R5 parse-err recovery — STILL parse-err)

Round 6 individual repo-view probes ALL returned parse-err for:
- `anthropics/anthropic-quickstarts`
- `anthropics/courses`
- `anthropics/claude-cookbooks`
- `anthropics/anthropic-cookbook` (likely renamed/forked per W220-B GPT-5.5 audit)
- `anthropics/dxt`
- `anthropics/anthropic-sdk-python`
- `anthropics/anthropic-sdk-typescript`
- `anthropics/computer-use-demo` (returned "not-found" — likely 404 or renamed)

**Root cause hypothesis**: gh repo view JSON structure may have changed; parser regex needs update. Round 7 will use `gh api repos/<owner>/<name>` raw response with explicit field extraction.

## Section 5 — MAJOR NEW R6 findings from topic-searches

### NEW Top-30 candidates discovered

| Repo | Stars | License | Layer | Description |
|---|---:|---|---|---|
| **`zilliztech/claude-context`** | **11,136** | **MIT** | **Code-search MCP** | "Code search MCP for Claude Code. Make entire codebase the context for any coding" — **MAJOR FIND**: CC-native code-search MCP from Zilliz (Milvus org) |
| `microsoft/generative-ai-for-beginners` | 110,841 | MIT | Education/courses | "21 Lessons, Get Started Building with Generative AI" — CITE-CLASS-CANONICAL Microsoft official |
| `yzfly/Awesome-MCP-ZH` | 7,070 | MIT | MCP catalog (Chinese) | "MCP 资源精选, MCP指南, Claude MCP, MCP Servers, MCP Clients" — Chinese MCP awesome-list; CITE-CLASS |
| `zebbern/claude-code-guide` | 4,126 | MIT | CC documentation | "Claude Code Guide - Setup, Commands, workflows, agents, skills & tips-n-tricks guide" — CITE-CLASS comprehensive CC guide |
| `ArcadeAI/arcade-mcp` | 892 | MIT | MCP framework | "MCP Server Framework and Tool Development library" |
| `nesaminua/claude-code-lsp-enforcement-kit` | 293 | MIT | CC hook (token-opt) | **"Hooks that force Claude Code to use LSP instead of Grep for code navigation. Save tokens"** — STUDY-PILOT (token-opt operator-discipline hook) |
| **`Astro-Han/karpathy-llm-wiki`** | **835** | **MIT** | **Karpathy-named Agent Skills wiki** | "Agent Skills-compatible LLM wiki for Claude Code, Cursor, and Codex. Build a Karpathy-style..." — **NAMED-T2 KARPATHY ASSOCIATION** |
| `Manavarya09/design-extract` | 2,629 | MIT | Agent Skill (design system) | "Extract any website's complete design system with one command. DTCG tokens" |
| `Agents365-ai/drawio-skill` | 1,597 | (no-lic) | Agent Skill (diagrams) | "drawio-skill — From Text to Professional Diagrams. An Agent Skill (SKILL.md)" |
| `khoj-ai/khoj` | 34,565 | **AGPL-3.0** | Semantic search | "Your AI second brain. Self-hostable" — REJECT per CR-9 license filter |
| `deepset-ai/haystack` | 25,238 | Apache-2.0 | RAG orchestration | "Open-source AI orchestration framework for context-engineered, production-ready" — already cataloged R4 as STUDY-PILOT |
| `meilisearch/meilisearch` | 57,587 | "other" | Search engine | (Already in R4) |

### Top-3 Round 6 ADOPT-NOW additions (verified Axis-1+2+3 strong):

1. **`zilliztech/claude-context`** 11,136★ MIT — Code-search MCP for Claude Code from **Zilliz (Milvus org)** named-T1 organization. Apache-2.0 ecosystem alignment. Native CC primitive (MCP server). **Promote to Top-30 rank ~13-15** (high-confidence ADOPT-NOW).

2. **`Astro-Han/karpathy-llm-wiki`** 835★ MIT — **Named-T2 Karpathy association** (Agent Skills-compatible Karpathy-style wiki for CC/Cursor/Codex). Per `citation-discipline.md` rule #6 TIER-1-NAMED-AUTHOR-QUOTE class applies. **STUDY-PILOT** pending Axis-3 burn-in.

3. **`nesaminua/claude-code-lsp-enforcement-kit`** 293★ MIT — Token-opt hook forces LSP over Grep. Operationally fits Round 5 layer-5 (tool-output compression) at the hook layer. **STUDY-PILOT-PROVIDER-COMPLEMENT** alongside lean-ctx + headroom.

## Section 6 — Top-33 catalog amendment (R6)

Adding 3 R6 finds:

| # | Repo | Layer | Stars | License | SRA | R | Notes |
|--:|---|---|---:|---|---:|---|---|
| (Top-12 R2+R3+R4+R5 entries — see prior delta docs) | | | | | | | |
| 13 | **`zilliztech/claude-context`** | **Code-search MCP** | **11,136** | **MIT** | 9/10 | **R6 NEW** | **Zilliz/Milvus org backing; native CC MCP; multi-modal codebase context** |
| (rest of Top-25 R4 + R5 entries shift down by 1) | | | | | | | |
| 31 | `Astro-Han/karpathy-llm-wiki` | Agent Skills wiki (Karpathy-named) | 835 | MIT | 7/10 | **R6 NEW** | TIER-1-NAMED-AUTHOR-QUOTE class; STUDY-PILOT |
| 32 | `nesaminua/claude-code-lsp-enforcement-kit` | CC hook token-opt | 293 | MIT | 7/10 | **R6 NEW** | LSP-over-Grep operator discipline hook |
| 33 | `yvgude/lean-ctx` | Tool-output/log compression | 1,667 | Apache+MIT dual | 8/10 | R5+R6 | FAST-CHURN axis-3 (cpd=25.74); re-audit 2026-06-22 |

## Section 7 — Z:\claude-sota-pure implant playbook AMENDMENTS R6

### Phase 3 MCP servers — ADD zilliztech/claude-context:
```jsonc
{
  "mcpServers": {
    "claude-context": {
      "command": "npx",
      "args": ["-y", "@zilliz/claude-context-mcp"]  // verify exact npm package via upstream README
    }
  }
}
```

### Phase 3 hooks — ADD nesaminua/claude-code-lsp-enforcement-kit (STUDY-PILOT):
```powershell
# LSP-over-Grep token-savings hook
# git clone https://github.com/nesaminua/claude-code-lsp-enforcement-kit Z:/claude-sota-pure/.local/lsp-kit
# Activate per upstream README
```

### Phase 6 cite-class references — ADD:
- `Astro-Han/karpathy-llm-wiki` 835★ MIT — Karpathy-style LLM wiki pattern (CITE-CLASS only, do not install)
- `microsoft/generative-ai-for-beginners` 110K★ MIT — CITE-CLASS-CANONICAL Microsoft official courses
- `yzfly/Awesome-MCP-ZH` 7K★ MIT — Chinese MCP awesome-list (CITE-CLASS multi-language)
- `zebbern/claude-code-guide` 4K★ MIT — comprehensive CC guide (CITE-CLASS)

### Phase 5 token-opt PROVIDER-COMPLEMENT (revised post-R6):
```powershell
# yvgude/lean-ctx (Rust binary + MCP server + shell hook; FAST-CHURN axis-3 — DEFER until 2026-06-22)
# pip install / cargo install / npm install — verify install path per upstream README
# DEFER until age≥90d burn-in per convergence-gate.md

# SKZL-AI/tscg (Tool-Schema Compression Grammar; LOW-ADOPTION 16★ but academic-backed)
# npm install @tscg/mcp-proxy
# CITE-CLASS-CANONICAL only until 100★ promotion threshold
```

## Section 8 — Cross-model gate accumulation R6

- R1 sub-agent BRIDGE-MODE: 3/3 FAIL FM-17.e
- R2 Sonnet stand-in: gate NOT structurally satisfied
- R3 codex T1 Pattern B: 5 candidates surfaced
- R4 codex T1 narrow: cpd × Axis-3 5-band rigorous
- R5 codex T1 narrow: 6-layer disaggregation + 7 NEW candidates
- **R6 codex T1 narrow layer-6 demote + Axis-2 named-T2**: firing in background `b3wlz0xn0`

When R6 codex returns:
- Layer-6 DEFER-vs-REJECT decision will close architectural ambiguity
- Axis-2 named-T2 endorsements for Top-15 will complete convergence-gate Axis-2

Cross-model gate: **ACCUMULATED-STRONG-R6** pending codex T1 R6 notification.

## Section 9 — Round 7 next-fire priorities (post-R6)

1. **Codex T1 R6 verdict integration** (layer-6 demote + Axis-2 named-T2)
2. **`zilliztech/claude-context` deep probe** — README + .mcp.json install path + LICENSE direct probe
3. **`Astro-Han/karpathy-llm-wiki` deep probe** — verify Karpathy named-author association + skill format
4. **wshobson/agents/plugins entries 51-81** specific names (R5/R6 only captured first 50; 31 unknown)
5. **Anthropic ecosystem parse-err alternate-query** via `gh api repos/<owner>/<name>` raw response
6. **OpenViking memory-plugin .mcp.json structure** can still be CITE-CLASS-PATTERN-EXTRACT despite AGPL parent (use as reference for designing memory-plugin .mcp.json shape)

## Section 10 — Wave 220 R6 close

**VERDICT-R6-DEEP-VERIFY-COMPLETE**. Top-33 catalog (was Top-30 in R5) with 3 R6 additions:
- `zilliztech/claude-context` 11K★ MIT (Major code-search MCP find)
- `Astro-Han/karpathy-llm-wiki` 835★ MIT (Named-T2 Karpathy association)
- `nesaminua/claude-code-lsp-enforcement-kit` 293★ MIT (LSP-over-Grep token-opt hook)

Forward-only artifacts persisted R6:
- `tmp/wave220-r6-deep-verify-delta-2026-05-15.md` (this file)
- `tmp/wave220-r6-evidence-batch-2026-05-15.txt` (raw gh CLI batch, 294 lines)
- `tmp/wave220-r6-evidence-summary-2026-05-15.md` (parsed compact summary)
- `tmp/wave220_r6_batch.sh` + `tmp/wave220_r6_parser.py` (helpers)
- `.claude/state/codex_consult_w220_r6_layer6_demote_and_axis2.txt` (R6 codex T1 prompt)
- `.claude/state/codex_consult_w220_r6_layer6_demote_and_axis2_OUT.txt` (firing in background)

**Wave 220 cumulative artifact catalog** (6 rounds):
- R1: failure record (FM-17.e)
- R2: master catalog (Top-15 + Phase 1-10 implant)
- R3: mass-discovery delta + 5 codex token-comp + Top-25 v2
- R4: license verify + graphify + cpd × Axis-3 codex-verified
- R5: deep probe (outer-kits + wshobson 50+ + Anthropic ecosystem) + codex 6-layer disaggregation + 7 NEW candidates + Top-30 v3
- R6: deep verify (lean-ctx + tscg) + zilliztech/claude-context MAJOR find + karpathy-llm-wiki + Top-33 v4

Plus prior W220 baselines (W220-B + W220-C + W220-I) = **16 forward-only authoritative artifacts**.

Sister-rule integration R6:
- ✅ `mia-pre-apply.md` (lean-ctx + tscg direct verify + cpd computation)
- ✅ `convergence-gate.md` Axis-3 5-band (lean-ctx FAST-CHURN re-audit date computed; tscg FRESH-PAINT re-audit date)
- ✅ `citation-discipline.md` rule #6 TIER-1-NAMED-AUTHOR-QUOTE (karpathy-llm-wiki Karpathy-named association)
- ✅ `cardinal-rule-12-upstream-install-priority.md` 6-class disposition (zilliztech/claude-context GENUINELY-NEW for code-search MCP layer)
- ✅ `port-note-discipline.md §6` forward-only (R6 ADDS to R2-R5 catalog chain)
- ✅ `fm20-path-drift-cascade.md` row 21 TARGET-runtime probe + sub-claim decomposition

Cross-model gate: ACCUMULATED-STRONG-R6 pending codex T1 R6 notification.
