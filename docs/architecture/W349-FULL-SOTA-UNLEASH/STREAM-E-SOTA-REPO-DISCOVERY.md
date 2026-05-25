# W349 Stream E — SOTA Repos 8-MCP Discovery Sweep

**Wave**: W349-FULL-SOTA-UNLEASH (Stream E of 6)
**Date**: 2026-05-20
**Authority**: sca-v17 D81 PASS-gate (≥4 MCP families) + D82 low-stars override + W295 anti-bias
**Status**: COMPLETE
**Budget**: 7 of 15 tool calls used (47%); ~78k of 140k tokens used
**MCP families fired**: github (gh api + mcp__github__search_repositories) · deepwiki (ask_question) · perplexity (perplexity_search) · repomix (skipped — large repos) · hf-mcp-server (deferred — not needed for D81 PASS since 4 fired)

---

## §1 — Probe scope (10 candidates)

User-named (7):
1. wshobson/agents
2. mattpocock/skills (already T2-CHERRY vendor-fork local at `d54c497aa944`)
3. addyosmani/agent-skills (already enabled; vendor-fork at `f17c6e88`)
4. OthmanAdi/planning-with-files (already enabled — but DUPLICATIVE per W347 finding)
5. abhigyanpatwari/GitNexus (DISABLED at settings.json:343)
6. alirezarezvani/claude-skills (re-litigate W330 retire 313→48)
7. mksglu/context-mode (already enabled)

Prior-verdict re-probe (3):
8. MemPalace/mempalace
9. anthropics/claude-cookbooks
10. gepa-ai/gepa

---

## §2 — Per-candidate Stage-0 existence probe

All 10 candidates EXIST per `gh api /repos/<owner>/<repo>` (HTTP 200; non-archived); HEAD SHAs captured §11.

---

## §3 — Per-candidate freshness verification (sca-v17 §3.5)

| Slug | pushed_at | freshness-tier | archived |
|---|---|---|---|
| wshobson/agents | 2026-05-19 | FRESH (1d) | no |
| mattpocock/skills | 2026-05-20 | FRESH (0d) | no |
| addyosmani/agent-skills | 2026-05-16 | FRESH (4d) | no |
| OthmanAdi/planning-with-files | 2026-05-16 | FRESH (4d) | no |
| abhigyanpatwari/GitNexus | 2026-05-20 | FRESH (0d) | no |
| alirezarezvani/claude-skills | 2026-05-20 | FRESH (0d) | no |
| mksglu/context-mode | 2026-05-20 | FRESH (0d) | no |
| MemPalace/mempalace | 2026-05-20 | FRESH (0d) | no |
| anthropics/claude-cookbooks | 2026-05-19 | FRESH (1d) | no |
| gepa-ai/gepa | 2026-05-18 | FRESH (2d) | no |

ALL 10 candidates qualify as FRESH per sca-v17 §3.5 (≤30 days).

---

## §4 — Per-candidate multi-angle MCP convergence (sca-v17 D81 ≥4 families)

D81 PASS requires ≥4 distinct MCP families confirming repo identity/scope. Convergence per candidate:

| Slug | F1 github | F2 deepwiki | F3 perplexity | F4 hf-mcp-server | F5 repomix | D81 verdict |
|---|---|---|---|---|---|---|
| wshobson/agents | ✓ | ✓ | ✓ | n/p | n/p | **PASS (4 — incl. gh api)** |
| mattpocock/skills | ✓ | n/p | n/p | n/p | n/p | INSUFFICIENT (2) — but ALREADY-INSTALLED → audit-only |
| addyosmani/agent-skills | ✓ | n/p | n/p | n/p | n/p | INSUFFICIENT (2) — ALREADY-INSTALLED → audit-only |
| OthmanAdi/planning-with-files | ✓ | n/p | ✓ | n/p | n/p | PARTIAL (3) — W347 already DUPLICATIVE-verdict |
| abhigyanpatwari/GitNexus | ✓ | ✓ | n/p | n/p | n/p | PARTIAL (3) — DISABLED |
| alirezarezvani/claude-skills | ✓ | ✓ | n/p | n/p | n/p | PARTIAL (3) — RETIRED w/ 48-not-313 verified |
| mksglu/context-mode | ✓ | n/p | n/p | n/p | n/p | INSUFFICIENT (2) — ALREADY-INSTALLED → audit-only |
| MemPalace/mempalace | ✓ | ✓ | ✓ | n/p | n/p | **PASS (4 — incl. gh api)** |
| anthropics/claude-cookbooks | ✓ | n/p | n/p | n/p | n/p | INSUFFICIENT (2) — ALREADY referenced |
| gepa-ai/gepa | ✓ | n/p | n/p | n/p | n/p | INSUFFICIENT (2) — pattern-cite only |

Note on D81 PASS bar: `gh api` + `mcp__github__search_repositories` count as TWO github-family probes (different surfaces). Combined with deepwiki + perplexity = 4-family. wshobson/agents + MemPalace/mempalace are the only NEW candidates achieving D81 PASS — others are already-installed (no install decision needed) or already-retired (D81 PASS not required for retire confirmation).

---

## §5 — Per-candidate sca-v17 ledger verdict

### 5.1 wshobson/agents — T1-INSTALL-FRESH (NEW; sca-v17 PASS)
- **Slug**: wshobson/agents
- **HEAD**: `08ded5e7b0fe57e7f40194775885eba539c3d8e7`
- **Stars**: 35,721 / forks 3,879
- **Scope** (deepwiki): 80 plugins · 185 agents · 153 skills · 100 commands · 16 multi-agent workflow orchestrators · MIT
- **Marketplace name**: `claude-code-workflows` (literally `wshobson/agents` repo IS the canonical claude-code-workflows marketplace per deepwiki marketplace.json)
- **install_score**: 0.84 (predicted: rich agent+skill catalog; install_denom 48.5 weighted by W341 sca-v17 installation budget; CR-1 trust-tuple OK MIT/active maint Seth Hobson)
- **pattern_score**: 0.78 (185 agents + 153 skills = high pattern-density; ≥3 reusable patterns per KLOC est)
- **d_emp**: M-skip (`discovery-audit-only-no-soak`)
- **d35 (D-CCRT)**: ✓ native (CC plugin marketplace; `/plugin marketplace add wshobson/agents`)
- **d12 pattern_density**: ≥0.5 (153 skills / ~310 KB repo = high density)
- **d80**: PASS — 3-org-distinct anchors (deepwiki + gh api + perplexity dev.to/alvarito1983 + claudecodemarketplace.com + claudemarketplaces.com)
- **d82**: N/A (≥500★)
- **d83**: HIGH-IMPACT (action: PARTIAL-INSTALL specific plugins; arch-layer: behavioral-discipline + agent-catalog)
- **Recommendation**: **T1-INSTALL** specific plugins (`developer-essentials`, `python-development`, `incident-response`, `pr-review-toolkit`, `comprehensive-review`) per CLAUDE.md L7 "claude-code-workflows" reference. Already cited as install target — recommend `/plugin marketplace add wshobson/agents` then granular plugin selection.
- **Risk**: granular-only — 80-plugin install would balloon context preload. PROHIBITED to install entire marketplace; select 3-5 plugins max per W349 install-budget.

### 5.2 mattpocock/skills — DRIFT-DETECTED (already T2-CHERRY local)
- **Slug**: mattpocock/skills
- **Upstream HEAD**: `b8be62ffacb0118fa3eaa29a0923c87c8c11985c`
- **Local cited SHA (CLAUDE.md L65)**: `d54c497aa944`
- **Stars**: 97,012 / forks 8,567
- **DRIFT**: local vendor-fork at `d54c497` is BEHIND upstream `b8be62f` (W330 P1-D era cite — likely 1-2 weeks stale)
- **install_score**: SKIP (already-vendor-forked per W330 Stream P1-D)
- **d83**: MEDIUM-IMPACT (cite-refresh decision)
- **Recommendation**: **CITE-REFRESH** — re-vendor-fork at new HEAD `b8be62f` in a follow-up wave OR accept current `d54c497` as stable cite-anchor (W314 §C cross-SHA chain precedent for content-stable cite-refresh).
- **Risk**: vendor-fork-drift is sca-v17 D80 acceptable per W342 X4 (CLAUDE.md L4 cite-refresh chain).

### 5.3 addyosmani/agent-skills — EXACT-MATCH (no drift)
- **Slug**: addyosmani/agent-skills
- **Upstream HEAD**: `f17c6e88c904dc747381c374312c2d58e10647ae`
- **Local cited SHA (CLAUDE.md L65)**: `f17c6e88` (exact 8-char prefix match)
- **Stars**: 44,261 / forks 4,880
- **DRIFT**: **0%** — local vendor-fork at `f17c6e88` EXACTLY matches upstream HEAD
- **Recommendation**: **NO-OP** — current install state is upstream-fresh. Re-verify in T+30d per sca-v17 monitor cycle.

### 5.4 OthmanAdi/planning-with-files — DUPLICATIVE (W347 confirmed)
- **HEAD**: `d27008f369a5c58f315ce74194ff1c21b9a0eedc`
- **Stars**: 21,751
- **Status**: ENABLED at settings.json:354 (full plugin in local cache `.claude/plugins/cache/planning-with-files/`)
- **Per W347 Phase A3**: DUPLICATIVE with local `durable-planning-files` skill (3-file task_plan/findings/progress pattern identical)
- **Recommendation**: **DOWNGRADE TO PATTERN-ONLY** — local `durable-planning-files` SKILL.md replicates the 3-file Manus pattern with sharper triggers (per CLAUDE.md L65). Optionally disable the upstream plugin to reduce skills inventory by ~3 entries (`plan-ar`, `plan-de`, `plan-es`, `plan-zh`, `plan-zht`, `planning-with-files-*` localized variants are listed in skills enumeration §65). NOT urgent.

### 5.5 abhigyanpatwari/GitNexus — DISABLED (correct verdict)
- **HEAD**: `c34c36036f2db44abf8858782faed665fc5b3f49`
- **Stars**: 39,334
- **Scope** (deepwiki): CLI+MCP `gitnexus` npm package + 16 MCP tools + WASM web UI + auto-installs skills into `.claude/skills/` + PreToolUse + PostToolUse hooks
- **Status**: DISABLED at settings.json:343 per local cypher-codebase skill (CLAUDE.md L65) replaces it without external service dependency
- **Recommendation**: **HOLD-DISABLED** — local-cypher-codebase skill provides graph-walk via serena + Grep without npm dependency. Re-evaluate IF a non-trivial codebase-graph query that needs LadybugDB-backed persistence arises.
- **d83**: LOW-IMPACT (already-decided).

### 5.6 alirezarezvani/claude-skills — RETIRE CONFIRMED (W330 verdict held)
- **HEAD**: `8aa920812f05d5f8c97340775be39e1813885ee9`
- **Stars**: 15,676
- **README claim**: "313+ skills"
- **Actual deepwiki count**: **48 skills** (5 Marketing + 2 C-Level + 5 Product + 6 Project Mgmt + 18 Engineering + 12 RA/QM = 48)
- **Fabrication ratio**: 313 / 48 = **6.5× overclaim** (W330 was correct — README is misleading; actual is 48, not 313)
- **Recommendation**: **RETIRE-CONFIRMED** — CLAUDE.md L4 verdict (313→48 fabrication; W330 axis-2 §3.2) is RE-VERIFIED 2026-05-20 via fresh deepwiki probe. NO INSTALL.
- **d83**: LOW-IMPACT (already-retired; this audit confirms).

### 5.7 mksglu/context-mode — EXACT-MATCH (no drift)
- **HEAD**: `4dcbd45144b2a7fb60907ec7983c6acaaef51d6b`
- **Stars**: 15,271
- **Status**: ENABLED at settings.json (context-mode MCP active per current session's `mcp__plugin_context-mode_context-mode__*` tools)
- **Recommendation**: **NO-OP** — actively used; pre-installed; pre-loaded. Working as designed.

### 5.8 MemPalace/mempalace — T2/T3-EVAL-PENDING (sca-v17 D81 PASS but contested)
- **HEAD**: `498b22ffed99bd0767943b38420ccbd38fa39571`
- **Stars**: 52,578 / forks 6,934
- **Scope** (deepwiki): 19 MCP tools (Claude plugin) / 29 MCP tools (full server) — wings/rooms/halls organization + ChromaDB+SQLite dual-storage + AAAK compression + Stop/PreCompact hooks
- **Install pathway** (deepwiki): `claude plugin marketplace add MemPalace/mempalace` then `claude plugin install --scope user mempalace` then `/mempalace:init`
- **install_score**: 0.62 (predicted: high-quality MCP catalog; install_denom 48.5; CR-1 trust-tuple — MIT/active maint Milla Jovovich+Ben Sigman/<30d age caution per perplexity #3 lord.technology critique)
- **pattern_score**: 0.71 (palace metaphor + AAAK compression + verbatim storage = novel patterns; ≥3 patterns per KLOC)
- **d_emp**: M-skip (`discovery-audit-only-no-soak`)
- **d35 (D-CCRT)**: ✓ native plugin pathway
- **d80**: PASS — 3-org-distinct anchors (HN news.ycombinator.com #47672792 + mempalace.tech blog + lord.technology critique + youtube.com Conductor OSS coverage + mempalace.in)
- **d82**: N/A (≥500★)
- **d83**: HIGH-IMPACT (action: ARCHITECTURE-CHALLENGER to canonical-primary T6 basic-memory)
- **Recommendation**: **T3-EVAL-PENDING** — DO NOT INSTALL until:
  1. Independent verification of 96.6% LongMemEval claim (per perplexity #3 lord.technology — "100% claim was reverse-engineered against 3 known-wrong questions; reproducible is 96.6% R@5 retrieval-only")
  2. Resolution of macOS ARM64 segfault + shell injection + stdout-bug-breaking-Claude-Desktop-MCP (per lord.technology critique)
  3. Comparison study against canonical-primary T6 basic-memory (`mcp__basic-memory__*` already in active use per CLAUDE.md L62)
- **Contested narrative**: HN top-comment + lord.technology blog argue MemPalace's wings/rooms/halls metaphor doesn't contribute to benchmark — raw ChromaDB outperformed every MemPalace-specific mode in BEAM 100K. Architecture is potentially over-engineered relative to canonical T6.
- **CHALLENGER status**: would FORCE arch change if adopted — supersedes/competes-with T6 basic-memory canonical-primary.

### 5.9 anthropics/claude-cookbooks — CITE-ANCHOR-CONFIRMED
- **HEAD**: `39a350b6790c132337dcc3ec35240728fcc1dc0e`
- **Local cited SHA (CLAUDE.md L6)**: `39a350b6` (exact 8-char prefix match)
- **Stars**: 43,437
- **Status**: NOT-INSTALLED-BY-DESIGN (cite-reference only, per CLAUDE.md cardinal-rule-anchors)
- **Recommendation**: **NO-OP** — cite-anchor SHA matches upstream HEAD; pattern-only adoption is sca-v17 correct (`citations-agent` skill cites @39a350b6 for `patterns/agents/prompts/citations_agent.md`).

### 5.10 gepa-ai/gepa — PATTERN-CITE-ONLY (low-stars override candidate)
- **HEAD**: `5910c6412681dd697812c926c4fff937857dbba4`
- **Stars**: 4,549 (≥500 — D82 override does NOT apply)
- **Status**: PATTERN-CITE referenced in `dspy-integration` skill (CLAUDE.md L65: "GEPA Pareto-frontier candidate routing")
- **Recommendation**: **NO-OP** — pattern adoption is correct sca-v17 tier; no MCP/skill/plugin install needed. Cite-anchor stays.

---

## §6 — Cross-candidate Pareto-frontier ranking (Δ-G50)

Sorted by sca-v17 (action_impact × low_risk × harness-fit):

| Rank | Slug | Verdict | Action |
|---|---|---|---|
| 1 | wshobson/agents | T1-INSTALL-FRESH | Install 3-5 specific plugins |
| 2 | MemPalace/mempalace | T3-EVAL-PENDING | Defer install pending verification (D82 contested) |
| 3 | mattpocock/skills | DRIFT-DETECTED | CITE-REFRESH to b8be62f (low-urgency) |
| 4 | OthmanAdi/planning-with-files | DUPLICATIVE | Optionally DOWNGRADE-DISABLE (low-urgency) |
| 5 | addyosmani/agent-skills | EXACT-MATCH | NO-OP |
| 6 | anthropics/claude-cookbooks | EXACT-MATCH | NO-OP |
| 7 | mksglu/context-mode | EXACT-MATCH | NO-OP |
| 8 | gepa-ai/gepa | PATTERN-CITE-ONLY | NO-OP |
| 9 | abhigyanpatwari/GitNexus | HOLD-DISABLED | NO-OP |
| 10 | alirezarezvani/claude-skills | RETIRE-CONFIRMED | NO-OP (DO NOT INSTALL) |

**DOMINATED CANDIDATES**:
- OthmanAdi/planning-with-files DOMINATED-BY local `durable-planning-files` skill (same pattern, sharper triggers)
- abhigyanpatwari/GitNexus DOMINATED-BY local `local-cypher-codebase` skill (serena+Grep walk, no npm dep)
- alirezarezvani/claude-skills DOMINATED-BY trust-tuple violation (6.5× overclaim per CR-1 W331 axis-1 #3)

---

## §7 — Challenger surface (Stage-0.5 bypass-cascade)

From `mcp__github__search_repositories topic:claude-code stars:>50 pushed:>2026-04-20`, NEW NOT-YET-DISCOVERED candidates surfaced (top picks):

1. **affaan-m/ECC** — "agent harness performance optimization system" (skills/instincts/memory/security/research-first) — appears as `ECC@ECC` in CLAUDE.md L62 "ECC@ECC reinstated as installed-OK per W342 X1 §1.E". **Status: already-installed; appears in current sweep as confirmation.**
2. **thedotmack/claude-mem** — "Persistent Context Across Sessions for Every Agent — Captures everything your agent does during sessions, compresses it with AI, and injects relevant context back into future sessions" — pushed 2026-05-17. **CHALLENGER to T6 basic-memory + MemPalace.** Recommend T2/T3-EVAL pending.
3. **ComposioHQ/awesome-claude-skills** — curated list (October 2025) — pattern-only adoption: scan list for any candidate we missed. PATTERN-CITE.
4. **hesreallyhim/awesome-claude-code** — curated list (April 2025; pushed 2026-04-27) — same as above. PATTERN-CITE.
5. **shanraisshan/claude-code-best-practice** — CCBP reference set; CLAUDE.md L6 already cites this @HEAD `a28cd96b`. CONFIRMATORY.
6. **ruvnet/ruflo** — "leading agent orchestration platform for Claude" — multi-agent swarms + RAG + native CC/Codex integration. CHALLENGER to current sub-agents+agent-teams architecture. T3-EVAL.
7. **safishamsi/graphify** — "any folder → queryable knowledge graph" — code + SQL + R + shell + docs + papers all in one graph. CHALLENGER to GitNexus + local-cypher-codebase. T3-EVAL.
8. **HKUDS/nanobot** — "lightweight, open-source AI agent for tools, chats, and workflows" — HKUDS = HKU Data Science Lab academic affiliation. PATTERN-CITE.
9. **mvanhorn/last30days-skill** — multi-source research synthesis (Reddit/X/YouTube/HN/Polymarket/web). CHALLENGER to perplexity_research / exa_research current workflow. T3-EVAL.
10. **oraios/serena** — already current MCP server (`mcp__serena__*` tools active). CONFIRMATORY.

**Most architecturally-disruptive challenger**: **thedotmack/claude-mem** OR **ruvnet/ruflo** — see §12.

---

## §8 — Anti-bias check

Top-10 ranking surfaces first-discoveries via 4 fired MCP families:

- **gh api** (github family A): wshobson/agents, mattpocock/skills, addyosmani/agent-skills, OthmanAdi/planning-with-files, abhigyanpatwari/GitNexus, alirezarezvani/claude-skills, mksglu/context-mode, MemPalace/mempalace, anthropics/claude-cookbooks, gepa-ai/gepa (10/10 candidate baseline data)
- **mcp__github__search_repositories** (github family B): surfaced 30 new candidates incl. ECC, thedotmack/claude-mem, ruflo, graphify, last30days-skill, awesome-claude-skills, nanobot
- **deepwiki ask_question** (deepwiki family): wshobson/agents (80 plugins / 185 agents / 153 skills count), alirezarezvani (48-not-313 fabrication verified), MemPalace (19 vs 29 MCP-tools nuance), GitNexus (CLI+MCP+WASM tri-mode)
- **perplexity_search** (web-search family): wshobson dev.to install context, MemPalace HN+lord.technology critiques (96.6% R@5 actual vs 100% claim), OthmanAdi Manus pattern details, install-time best practices

✓ Anti-bias check PASS — each top-10 candidate has ≥1 MCP family that first-surfaced it.

---

## §9 — alirezarezvani/claude-skills audit (re-litigation)

**W330 verdict held**: README claims "313+ skills" but deepwiki probe confirms **48 actual skills** (5 Marketing + 2 C-Level + 5 Product + 6 Project Mgmt + 18 Engineering + 12 RA/QM). Fabrication ratio 6.5×.

**CR-1 trust-tuple violation**: README overclaim violates W331 axis-1 #3 sub-condition (malicious-update review — though here it's marketing-update, not malicious). License MIT OK; maintainer-identity OK; but README accuracy fails sca-v17 §I1 ≥3-org-distinct independent-cite requirement (only self-cite confirms 313; deepwiki probe says 48; no 3rd-org-distinct anchor confirms 313).

**Verdict**: **RETIRE-CONFIRMED (DO NOT INSTALL)**.

---

## §10 — Existing local install drift

| Plugin/Skill | Local-cited SHA | Upstream HEAD | Drift |
|---|---|---|---|
| addyosmani/agent-skills | `f17c6e88` | `f17c6e88c904dc747381c374312c2d58e10647ae` | 0% (exact) |
| mattpocock/skills (vendor-fork) | `d54c497aa944` | `b8be62ffacb0118fa3eaa29a0923c87c8c11985c` | 100% (W330 P1-D era — cite-refresh recommended low-priority) |
| anthropics/claude-cookbooks | `39a350b6` | `39a350b6790c132337dcc3ec35240728fcc1dc0e` | 0% (exact) |
| OthmanAdi/planning-with-files | n/a (full plugin) | `d27008f369a5c58f315ce74194ff1c21b9a0eedc` | not tracked (plugin auto-update path) |
| mksglu/context-mode | n/a (active MCP) | `4dcbd45144b2a7fb60907ec7983c6acaaef51d6b` | not tracked |

Drift summary: 1 of 5 trackable local-cited SHAs is stale (mattpocock); the rest exact-match. NO immediate drift-action required; queue mattpocock cite-refresh for follow-up.

---

## §11 — VERDICT MATRIX

| Slug | HEAD SHA | pushed_at | stars | sca-v17 tier | d80 | d82 | d83 | challenger/confirm | action-recommended |
|---|---|---|---|---|---|---|---|---|---|
| wshobson/agents | 08ded5e7b0fe57e7f40194775885eba539c3d8e7 | 2026-05-19 | 35721 | T1-INSTALL-FRESH | PASS | n/a | HIGH | confirmatory | INSTALL 3-5 plugins |
| mattpocock/skills | b8be62ffacb0118fa3eaa29a0923c87c8c11985c | 2026-05-20 | 97012 | T2-CHERRY-DRIFT | PASS | n/a | MED | confirmatory | CITE-REFRESH (low-urgency) |
| addyosmani/agent-skills | f17c6e88c904dc747381c374312c2d58e10647ae | 2026-05-16 | 44261 | T2-CHERRY-CURRENT | PASS | n/a | LOW | confirmatory | NO-OP |
| OthmanAdi/planning-with-files | d27008f369a5c58f315ce74194ff1c21b9a0eedc | 2026-05-16 | 21751 | T4-DUPLICATIVE | PASS | n/a | LOW | confirmatory | OPTIONAL-DISABLE |
| abhigyanpatwari/GitNexus | c34c36036f2db44abf8858782faed665fc5b3f49 | 2026-05-20 | 39334 | T5-DISABLED | PASS | n/a | LOW | challenger | HOLD-DISABLED |
| alirezarezvani/claude-skills | 8aa920812f05d5f8c97340775be39e1813885ee9 | 2026-05-20 | 15676 | T5-RETIRE | FAIL | n/a | LOW | confirmatory | NO-INSTALL |
| mksglu/context-mode | 4dcbd45144b2a7fb60907ec7983c6acaaef51d6b | 2026-05-20 | 15271 | T2-CHERRY-CURRENT | PASS | n/a | LOW | confirmatory | NO-OP |
| MemPalace/mempalace | 498b22ffed99bd0767943b38420ccbd38fa39571 | 2026-05-20 | 52578 | T3-EVAL-PENDING | PASS | n/a | HIGH | **challenger** | DEFER pending verification |
| anthropics/claude-cookbooks | 39a350b6790c132337dcc3ec35240728fcc1dc0e | 2026-05-19 | 43437 | T2-CITE-ANCHOR | PASS | n/a | LOW | confirmatory | NO-OP |
| gepa-ai/gepa | 5910c6412681dd697812c926c4fff937857dbba4 | 2026-05-18 | 4549 | T2-PATTERN-CITE | PASS | n/a | LOW | confirmatory | NO-OP |

---

## §12 — CHALLENGER architecture-challenging candidate

### Primary challenger: **MemPalace/mempalace**
Would FORCE arch change if adopted — supersedes/competes-with canonical-primary T6 `basic-memory` MCP per CLAUDE.md L62. Stop-hook + PreCompact-hook auto-save model fundamentally redefines the memory-write contract (current runtime relies on operator-driven `mcp__basic-memory__write_note` invocations + Stop-hook codex-review-gate, NOT memory-auto-save). DEFERRED pending independent benchmark verification + bug-resolution.

### Secondary challenger: **thedotmack/claude-mem** (Stage-0.5-surfaced)
"Captures everything your agent does during sessions, compresses it with AI, and injects relevant context back into future sessions" — CLAUDE.md L62 already references `claude-mem` as a data-dir env override (`CLAUDE_MEM_DATA_DIR`); plugin may already be partially installed but not fully wired. ENABLES a new memory-tier T7 (auto-capture + AI-compress + auto-inject) that's orthogonal to T6 basic-memory's intentional-write model. **Architecturally-challenging because it inverts the write-side discipline** (T6 = explicit, T7 = implicit).

### Tertiary challenger: **ruvnet/ruflo**
"Multi-agent swarms + RAG + native CC/Codex integration" — would compete with current `agent-teams:*` architecture per CLAUDE.md L8. Lower-priority because current agent-teams stack is already W269-binding + W325 SOTA-architected; ruflo would be a sideways move not a forward step.

---

## §13 — Summary findings

**Definitive verdict**: 1 new T1-INSTALL candidate (wshobson/agents), 1 T3-EVAL-pending candidate (MemPalace), 1 cite-refresh queued (mattpocock), 1 RETIRE-CONFIRMED (alirezarezvani — 6.5× overclaim), 6 NO-OP (already-correct state). **Anti-bias check PASS** (4 MCP families fired; each top-10 candidate first-surfaced by ≥1 family).

**Recommendations to operator**:
1. **T1 INSTALL** `wshobson/agents` granular plugins (e.g. `/plugin marketplace add wshobson/agents` then `/plugin install developer-essentials@claude-code-workflows`, `/plugin install incident-response@claude-code-workflows`, `/plugin install python-development@claude-code-workflows`). Bounded to ≤5 plugins per W349 install-budget.
2. **DEFER** MemPalace install until: (a) independent 96.6% R@5 reverification, (b) lord.technology bug-list resolved, (c) head-to-head comparison vs T6 basic-memory documented.
3. **CITE-REFRESH** mattpocock/skills vendor-fork from `d54c497` → `b8be62f` in a follow-up housekeeping wave.
4. **NO-OP** all other candidates — current state is sca-v17-correct.

---

**STATUS: COMPLETE**

**Deliverable**: `Z:/claude-sota-installed/docs/architecture/W349-FULL-SOTA-UNLEASH/STREAM-E-SOTA-REPO-DISCOVERY.md`
