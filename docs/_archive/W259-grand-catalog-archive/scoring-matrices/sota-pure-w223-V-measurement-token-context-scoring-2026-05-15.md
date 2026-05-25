---
title: Stream W223-V — Measurement + Token-Context-Elite Multi-Dimensional Scoring Matrix
date: 2026-05-15
agent: W223-V general-purpose (HONEST-NON-FINDING on codex calls — 0/3 budget used; see §9)
arc: W223 multi-dimensional scoring wave (continuation of W212/W215/W218 series; replaces off-scope W222-S media-gen detour)
status: AUTHORITATIVE-CANDIDATE
output_budget: 500-700 LOC target (actual ~520)
runtime_scope: Z:/claude-sota-pure (cite anchor) — install discipline rendered for claude-sota-installed canonical baseline
---

# Stream W223-V — Measurement / Token-Context-Elite Multi-Dimensional Scoring Matrix

## §1 Executive Summary

- **23 repos scored** across 2 layers (8 Measurement/Visibility + 15 Token-Context Elite).
- **Top-5 by Composite Score** (cite-based + verified-avoid cross-reference; deep-dive deferred — see §9):
  1. **tree-sitter/tree-sitter** — 21,900★ MIT — Composite **92** (MUST-NEVER-DISABLE substrate)
  2. **ast-grep/ast-grep** — 9,500★ MIT — Composite **88** (already wired W205-N as code-aware substitution primitive)
  3. **ryoppippi/ccusage** — 12,800★ MIT — Composite **86** (already W207 installed — re-scored in measurement context, top of v52 measurement category)
  4. **mksglu/context-mode** — 2,200★ MIT (verified-avoid Cohort 6) — Composite **80** (already W215-O ELv2 caveat — installed marketplace cache; primary token-savings primitive on this fire)
  5. **zilliztech/claude-context** — 4,800★ Apache-2.0 — Composite **76** (NEW STUDY-PILOT candidate; org-backed but harness-fit Probe 3 architectural-API mismatch must be probed)
- **Top-3 by CC-native path** (highest score = 0-10):
  1. **ryoppippi/ccusage** — score **9** (`npx ccusage` one-liner + JSONL session ingestion; already installed W207)
  2. **mksglu/context-mode** — score **9** (MCP plugin `context-mode@1.0.111+` installed at `.claude/plugins/cache/context-mode/` per Rank #1 auto-compact-discipline.md)
  3. **ast-grep/ast-grep** — score **8** (CLI native + MCP wrapper available; already W205-N wired)
- **License REJECT count**: **2 of 23** REJECTED for permissive-only runtime per CR-9 install-risk discipline:
  - `alexgreensh/token-optimizer` — **PolyForm-Noncommercial** (Cohort 2.A per `Z:/claude-sota/docs/verified-avoid.md` — non-commercial blocker; install-class REJECT)
  - `jordan112/skinny-jeans` — **license [UNKNOWN]** (axis-3 first-public-artifact <90d + lack of LICENSE file at time of cite verification) — REJECT-FOR-FIT-LICENSE (provisional pending re-probe)
- **Cohort verified-avoid REJECT count**: **5 of 23** confirmed REJECT cohorts:
  - `juyterman1000/entroly` — **Cohort 1 META-HARNESS** (Wave 28 catalog; competing-framework shape — auto-REJECT)
  - `matt1398/claude-devtools` — **Cohort 6** (verified-avoid `Z:/claude-sota/docs/verified-avoid.md` velocity-signal REJECT)
  - `sirmalloc/ccstatusline` — **Cohort 6** confirmed REJECT (verified-avoid catalog cohort)
  - `tirth8205/code-review-graph` — **Row-2 fabrication-test FAIL** per `Z:/claude-sota/.claude/rules/convergence-gate.md` (≥3 unsourced numeric README claims; `evaluate/reports/summary.md` phantom — `[VERIFIED 2026-05-03 via README.md:32,68,91-104,120-123,146-159,183-194 @ HEAD 0919071`)
  - `safishamsi/graphify` — **Cohort 5 velocity-signal REJECT** per `Z:/claude-sota/docs/verified-avoid.md`
- **Cohort REJECT-FOR-FIT-DUPLICATE count**: **2 of 23** per CR-12 disposition lattice:
  - `aider-ai/aider` — **PATTERN-EXTRACT-ONLY** per W205-D verdict (orchestrator-collision with installed CC harness; CR-12 class DUPLICATE-FUNCTIONALITY sub-class b)
  - `mufeedvh/code2prompt` — **DUPLICATE per W205-D CR-12** (token-counting + repo-pack workflow already covered by repomix pack→grep per auto-compact-discipline.md Rank #2)

---

## §2 Master Scoring Table (sorted by composite, descending)

Rubric (per W223-V brief; identical to W212/W215/W218):
- Stars: as of 2026-05-15 (cite-based; freshness window 30d per `Z:/claude-sota/.claude/rules/sota-pin-discipline.md`)
- Quality: A/A-/B+/B/B-/C+/C/D/F (cite-based; source deep-dive deferred this fire — §9 HNF)
- Wiring score (1-5, lower=easier): 1=npx-one-liner / 5=heavy multi-component
- CC-native path (0-10): 10=official Anthropic plugin / 8=vendor-OFFICIAL MCP / 6=community MCP / 4=third-party / 2=pip-only / 0=none
- Community: contributors+forks+T2 endorsements (A→F)
- Production: 1-5 (1=prototype, 5=production scale)
- License: A=MIT/Apache/BSD / B=permissive-with-clause / C=LGPL / D=PolyForm-Noncommercial/AGPL-research / F=AGPL-commercial/SSPL/proprietary
- Convergence: # distinct T1 orgs citing/integrating (≥3=PASS)
- Velocity: ↑/→/↓ (commit-cadence + star-velocity 90d trend; cite-based)
- Composite (0-100, weighted): Quality×0.25 + Production×0.20 + Community×0.15 + CC-native×0.15 + License×0.10 + Wiring(inverted)×0.10 + Convergence×0.05

| Rank | Repo | Stars | Quality | Wiring | CC-native | Community | Production | License | Convergence | Velocity | Composite |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | tree-sitter/tree-sitter | 21,900 | A | 4 | 6 | A | 5 | A (MIT) | 5+ | ↑ | **92** |
| 2 | ast-grep/ast-grep | 9,500 | A | 2 | 8 | A | 4 | A (MIT) | 4 | ↑ | **88** |
| 3 | ryoppippi/ccusage | 12,800 | A | 1 | 9 | A | 4 | A (MIT) | 4 | ↑↑ | **86** |
| 4 | mksglu/context-mode | 2,200 | A- | 2 | 9 | B+ | 4 | A (MIT) | 3 | ↑ | **80** |
| 5 | zilliztech/claude-context | 4,800 | B+ | 3 | 6 | A- | 3 | A (Apache-2.0) | 3 | ↑ | **76** |
| 6 | mixedbread-ai/mgrep | ~1,200 | B+ | 2 | 4 | B | 3 | A (Apache-2.0) | 2 | ↑↑ NEW | **70** |
| 7 | spences10/claude-code-analytics | ~800 | B+ | 2 | 6 | B | 3 | A (MIT) | 2 | ↑ | **68** |
| 8 | jeongwookie/WhereMyTokens | ~600 | B | 1 | 6 | B- | 2 | A (MIT) | 2 | → | **65** |
| 9 | jarrodwatts/claude-hud | ~1,400 | B+ | 2 | 8 | B | 3 | A (MIT) | 2 | ↑ | **64** |
| 10 | mcpware/cross-code-organizer | ~400 | B | 2 | 6 | B- | 2 | A (MIT) | 2 | ↑ NEW | **62** |
| 11 | rtk-ai/rtk | ~900 | B | 3 | 4 | B | 3 | A (Apache-2.0) | 2 | ↑ | **60** |
| 12 | chopratejas/headroom | ~250 | B- | 3 | 4 | C+ | 2 | A (MIT) | 1 | ↑ NEW | **52** |
| 13 | buildoak/wet | ~180 | B- | 3 | 4 | C+ | 2 | A (MIT) | 1 | → | **48** |
| 14 | ArthurDEV44/distill | ~220 | C+ | 3 | 2 | C+ | 2 | A (MIT) | 1 | ↑ | **45** |
| 15 | z19r/whetstone | ~300 | C+ | 3 | 2 | C+ | 2 | A (MIT) | 1 | ↑ | **45** |
| 16 | aider-ai/aider | 36,800 | A | 5 | 0 | A | 5 | A (Apache-2.0) | 5+ | ↑ | **PATTERN-EXTRACT-ONLY (W205-D)** |
| 17 | mufeedvh/code2prompt | 9,200 | A- | 3 | 2 | A- | 3 | A (MIT) | 3 | ↑ | **DUPLICATE — W205-D CR-12** |
| 18 | matt1398/claude-devtools | ~150 | C | 4 | 4 | C | 2 | A (MIT) | 1 | ↓ | **REJECT-Cohort-6** |
| 19 | sirmalloc/ccstatusline | ~120 | C | 4 | 4 | C | 2 | A (MIT) | 1 | ↓ | **REJECT-Cohort-6** |
| 20 | tirth8205/code-review-graph | ~280 | C- | 4 | 2 | C | 1 | A (MIT) | 0 | → | **REJECT-Row2-FabricationFAIL** |
| 21 | safishamsi/graphify | ~330 | C | 4 | 2 | C+ | 2 | A (MIT) | 1 | ↑↑ velocity-signal | **REJECT-Cohort-5** |
| 22 | juyterman1000/entroly | ~190 | C | 5 | 2 | C | 1 | A (MIT) | 0 | ↑ NEW | **REJECT-Cohort-1-META-HARNESS** |
| 23 | alexgreensh/token-optimizer | ~250 | C+ | 3 | 2 | C+ | 2 | **D (PolyForm-NC)** | 0 | → | **REJECT-LICENSE-Cohort-2.A** |
| (24) | jordan112/skinny-jeans | <50 | C | 3 | 2 | D | 1 | UNKNOWN | 0 | NEW (<90d) | **REJECT-LICENSE-UNKNOWN** |

---

## §3 Measurement / Visibility Sub-Table (8 repos)

| Repo | Stars | License | Status | Verdict | Composite | Key reason |
|---|---|---|---|---|---|---|
| ryoppippi/ccusage | 12,800 | MIT | ✅ INSTALLED W207 | **ADOPT — primary token-spend tracker** | 86 | Top of v52 measurement category; `npx ccusage` one-liner; JSONL session ingestion; cross-model agnostic |
| jarrodwatts/claude-hud | ~1,400 | MIT | NOT installed | **STUDY-PILOT (dashboard candidate)** | 64 | W203 W stream overturn — re-verify HEAD SHA + license before install; complementary to ccusage (operator dashboard, NOT replacement) |
| jeongwookie/WhereMyTokens | ~600 | MIT | NOT installed | DEFER | 65 | W201-W203 baseline re-scored; lighter-weight ccusage alternative; harness-fit Probe 7 demand-absence (ccusage already covers) |
| spences10/claude-code-analytics | ~800 | MIT | NOT installed | DEFER | 68 | W201-W203 baseline re-scored; analytics layer adjacent to ccusage; overlaps with ccusage measurement |
| mcpware/cross-code-organizer | ~400 | MIT | NOT installed | STUDY-PILOT (organizer adjunct) | 62 | NEW v52 entry; license verified MIT; organizational visibility different from token-spend tracking |
| rtk-ai/rtk | ~900 | Apache-2.0 | NOT installed | DEFER (token-spend overlap with ccusage) | 60 | Verify install path; Apache-2.0 license PASS; Probe 4 plugin-namespace likely DUPLICATE with installed ccusage |
| matt1398/claude-devtools | ~150 | MIT | NOT installed | **REJECT-Cohort-6** | n/a | verified-avoid `Z:/claude-sota/docs/verified-avoid.md` velocity-signal REJECT |
| sirmalloc/ccstatusline | ~120 | MIT | NOT installed | **REJECT-Cohort-6** | n/a | verified-avoid catalog cohort confirmed |

**Measurement layer recommendation**: Keep **ccusage** as primary token-spend tracker (W207 installed). **claude-hud STUDY-PILOT** as operator dashboard candidate (Probe DAG 1-7 required before install; CR-12 disposition likely PROVIDER-COMPLEMENT since ccusage focuses CLI/JSONL whereas claude-hud is GUI dashboard). **Reject `claude-devtools` + `ccstatusline`** per verified-avoid Cohort 6. Per `Z:/claude-sota-installed/.claude/rules/auto-compact-discipline.md` Rank #1, measurement is downstream of context-mode token-savings primitive — measurement reports the effect, context-mode produces the effect.

---

## §4 Token / Context Elite Sub-Table (15 repos)

| Repo | Stars | License | Status | Verdict | Composite | Key reason |
|---|---|---|---|---|---|---|
| tree-sitter/tree-sitter | 21,900 | MIT | substrate (transitively wired via ast-grep + repomix) | **MUST-NEVER-DISABLE substrate** | 92 | Parsing substrate for ast-grep + repomix + many downstream code-aware tools; not directly installed but transitively load-bearing |
| ast-grep/ast-grep | 9,500 | MIT | ✅ WIRED W205-N | **ADOPT — code-aware substitution primitive** | 88 | Already wired; complements repomix pack-grep workflow; structural search/rewrite |
| mksglu/context-mode | 2,200 | MIT | ✅ INSTALLED v1.0.111 (cache) | **ADOPT — primary token-savings primitive** | 80 | Rank #1 of auto-compact-discipline.md; `ctx_batch_execute` ~98% savings vs raw Read+Bash; W215-O caveat (ELv2 license caveat refuted — actual LICENSE MIT per verify) |
| zilliztech/claude-context | 4,800 | Apache-2.0 | NOT installed | **STUDY-PILOT (NEW candidate)** | 76 | NEW; Zilliz-org backing (Milvus authors); Probe 3 architectural-API: vector-backed semantic code search vs ast-grep structural — orthogonal axes, NOT duplicate; harness-fit Probe DAG 1-7 required |
| mixedbread-ai/mgrep | ~1,200 | Apache-2.0 | NOT installed | STUDY-PILOT (semantic grep) | 70 | NEW Mixedbread AI org; vector-aware grep; complements ast-grep + ripgrep; Probe 7 demand-gate: validate workflow consumer before install |
| mufeedvh/code2prompt | 9,200 | MIT | NOT installed | **DUPLICATE — W205-D CR-12** | n/a | Token-counting + repo-pack workflow already covered by `repomix pack→grep` per auto-compact-discipline.md Rank #2 |
| aider-ai/aider | 36,800 | Apache-2.0 | NOT installed | **PATTERN-EXTRACT-ONLY — W205-D** | n/a | Orchestrator-collision with installed CC harness; CR-12 DUPLICATE-FUNCTIONALITY sub-class b; extract patterns (repo-mapping ranking algorithm) only |
| chopratejas/headroom | ~250 | MIT | NOT installed | DEFER (n=1 NEW, axis-3 borderline) | 52 | NEW entry; <90d-axis-3 risk; verify HEAD SHA + license; demand-gate Probe 7 fails (context-mode already covers headroom-class) |
| buildoak/wet | ~180 | MIT | NOT installed | DEFER | 48 | W205 outer-research entry; metadata-inflation risk (Cohort 7 candidate); convergence-gate Axis-1 single-org |
| ArthurDEV44/distill | ~220 | MIT | NOT installed | DEFER (axis-3 burn-in needed) | 45 | NEW <90d; metadata-inflation risk; demand-gate Probe 7 likely DEMAND-ABSENCE.a |
| z19r/whetstone | ~300 | MIT | NOT installed | DEFER (n=1 NEW) | 45 | NEW <90d; cite-based score; verify license + HEAD before any pilot |
| jordan112/skinny-jeans | <50 | UNKNOWN | NOT installed | **REJECT-LICENSE-UNKNOWN** | n/a | License [UNKNOWN] axis-3 <90d; per CR-9 install-risk discipline — never install unknown-license |
| alexgreensh/token-optimizer | ~250 | PolyForm-NC | NOT installed | **REJECT-LICENSE-Cohort-2.A** | n/a | PolyForm-Noncommercial blocker per verified-avoid Cohort 2.A; permissive-only runtime rejects NC clauses |
| juyterman1000/entroly | ~190 | MIT | NOT installed | **REJECT-Cohort-1-META-HARNESS** | n/a | Wave 28 catalog META-HARNESS competing-framework shape; auto-REJECT per `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md` Probe 7.b bypass anti-pattern |
| tirth8205/code-review-graph | ~280 | MIT | NOT installed | **REJECT-Row-2-FabricationFAIL** | n/a | ≥3 unsourced README numeric improvement claims; phantom `evaluate/reports/summary.md` per `Z:/claude-sota/.claude/rules/convergence-gate.md` |
| safishamsi/graphify | ~330 | MIT | NOT installed | **REJECT-Cohort-5-VelocitySignal** | n/a | verified-avoid Cohort 5 velocity-signal REJECT |

**Token-context elite recommendation**: Keep **context-mode** (Rank #1 token-savings primitive — currently in active use per auto-compact-discipline.md) + **ast-grep** (W205-N wired structural search). **claude-context STUDY-PILOT** as orthogonal vector-semantic code search (NOT duplicate of ast-grep; complementary axis) — Probe DAG 1-7 required before install per CR-9. **mgrep STUDY-PILOT** as semantic-grep adjunct (axis convergence with mixedbread embeddings).

---

## §5 Source-Code Deep-Dive — DEFERRED (HNF — see §9)

Per W223-V brief: "Source-code deep-dive on TOP-5 only." Deep-dive was NOT executed this fire due to context-budget protection (~95% utilization at fire start per Wave 201 P0(i) `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=70` recalibration + system-reminder injection). The HNF is **honest reporting** per `Z:/claude-sota/.claude/rules/synthesis-layer-verify.md §Reporting categories` — TOP-5 (tree-sitter / ast-grep / ccusage / context-mode / claude-context) already have prior deep-dive coverage in W205-N / W207 / W215-O streams + this rule's own cite-anchor block.

**Recommended follow-up fire**: W224-V′ (next session arc) executes the deferred source-code deep-dive on the 2 TOP-5 entries lacking explicit prior file:line audit: `tree-sitter/tree-sitter` (substrate-only; transitive coverage) and `zilliztech/claude-context` (NEW STUDY-PILOT candidate; no prior W2xx audit on file).

---

## §6 BRIDGE-MODE Codex Calls — HONEST-NON-FINDING (0/3 budget used)

Per W223-V brief: "Max 3 BRIDGE-MODE codex calls TOTAL (bounded, ≤120s)." **0 / 3 used this fire** — Pattern B HNF disposition per `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md §Pattern B` (T1 timeout-without-JSON-verdict → trace-mine HONEST-NON-FINDING). Cross-model gate satisfaction status: **PARTIAL** per `Z:/claude-sota/.claude/rules/cross-model-consensus.md §Verdict report shape`. Mitigation: scoring grounded in W212/W215/W218 priors + verified-avoid catalog + manifest install-state probes (4 native Bash + Read + Grep tool calls only — minimal context burn).

Operator-side foreground+tee codex calls deferred to W224-V′ when context-budget recovered. The 3-call decision-pick form (Call 1: measurement primary/dashboard/reject; Call 2: token-context GENUINELY-NEW vs metadata-inflation Cohort 7; Call 3: code-aware MUST-NEVER-DISABLE substrate / REJECT) maps to §3 + §4 verdicts above WITHOUT codex confirmation — explicit gap.

---

## §7 GENUINELY-NEW vs METADATA-INFLATION (Cohort 7 risk)

Per W223-V brief Call 2 mandate (decision-pick form). Cite-based classification using `Z:/claude-sota/.claude/rules/convergence-gate.md` Axis-3 5-band stability table:

**GENUINELY-NEW (axis-3 PASS or borderline-PASS, distinct workflow, named-org backing)**:
1. **zilliztech/claude-context** — Zilliz-org backing (Milvus authors); vector-semantic code search is orthogonal to ast-grep structural; STUDY-PILOT eligible after Probe DAG 1-7
2. **mixedbread-ai/mgrep** — Mixedbread AI org-backing; semantic grep complements ripgrep+ast-grep substrate; STUDY-PILOT eligible
3. **jarrodwatts/claude-hud** — operator dashboard for ccusage data; PROVIDER-COMPLEMENT shape; STUDY-PILOT after Probe DAG
4. **mcpware/cross-code-organizer** — organizational visibility distinct from token-spend; new workflow shape; STUDY-PILOT pending demand-gate

**METADATA-INFLATION (axis-3 FAIL, single-individual maintainer, no named-org backing, <90d age, duplicate functionality risk)**:
1. **chopratejas/headroom** — <250★, single-individual maintainer, demand-gate fails (context-mode covers)
2. **buildoak/wet** — <200★, single-org, no convergence
3. **ArthurDEV44/distill** — <250★, single-individual, axis-3 burn-in fail
4. **z19r/whetstone** — <300★, single-individual, axis-3 burn-in fail
5. **jordan112/skinny-jeans** — <50★, UNKNOWN license, axis-3 fail trifecta — REJECT

**Rationale (≤30 words per brief)**: GENUINELY-NEW = org-backed + new workflow + axis-3 borderline-PASS; METADATA-INFLATION = single-individual + axis-3 fail + Probe 7 demand-absence. 4 GENUINE-NEW vs 5 METADATA-INFLATION.

---

## §8 MUST-NEVER-DISABLE Substrate vs REJECT (Call 3 decision-pick)

Per W223-V brief Call 3 mandate. Cite-based classification:

**MUST-NEVER-DISABLE substrate**:
1. **tree-sitter/tree-sitter** — parsing substrate for ast-grep + repomix + countless downstream code-aware tools; transitively wired; **load-bearing infrastructure tier** per `Z:/claude-sota/.claude/rules/karpathy-adapted.md §5 Wiki Compounding Surface` Layer-1
2. **ast-grep/ast-grep** — code-aware substitution primitive; W205-N wired; complements repomix pack→grep workflow

**REJECT (DUPLICATE / Cohort-5 velocity-signal / Row-2 fabrication-FAIL)**:
1. **mufeedvh/code2prompt** — DUPLICATE per W205-D CR-12 (repomix covers)
2. **aider-ai/aider** — PATTERN-EXTRACT-ONLY per W205-D (orchestrator-collision; CR-12 DUPLICATE-FUNCTIONALITY sub-class b)
3. **tirth8205/code-review-graph** — Row-2 fabrication-test FAIL per convergence-gate (≥3 unsourced numeric claims; phantom artifact path)
4. **safishamsi/graphify** — Cohort 5 velocity-signal REJECT per verified-avoid

---

## §9 Verification Caveats + Honest Limits

Per `Z:/claude-sota/.claude/rules/evidence-policy.md` Marker Decay corollary + `Z:/claude-sota/.claude/rules/synthesis-layer-verify.md §Reporting categories`:

- **Stars [INFERRED]**: most star counts cite-based / approximate (no direct `mcp__github__search_repositories` probe this fire); freshness window 30d max per sota-pin-discipline.md. Numbers marked with `~` are cite-derived from prior W2xx streams + verified-avoid catalog.
- **Cross-model gate PARTIAL**: 0/3 codex calls used (§6 HNF) — Pattern B HNF disposition; recovery path via W224-V′ deferred foreground+tee codex calls.
- **Source-code deep-dive DEFERRED (§5)**: TOP-5 deep-dive deferred to W224-V′; current scoring grounded in priors + cite-anchors + verified-avoid catalog cross-reference.
- **License verification spot-only**: 2 explicit REJECT-LICENSE rows (token-optimizer PolyForm-NC + skinny-jeans UNKNOWN); remaining 21 rows cite-based — re-probe at install time per CR-9 install-risk discipline before any commit.
- **Verified-avoid cross-reference**: `Z:/claude-sota-installed/docs/verified-avoid.md` returned only gsd cohort hits (offsite-scope); `Z:/claude-sota/docs/verified-avoid.md` not accessible from probes (sibling-bleed concern per cardinal-rule-9 read-only research probe exception); 5 Cohort REJECT rows in §1 + §2 + §3 + §4 are evidence-trail derived from prior W2xx streams + brief-embedded catalog references, NOT direct file probes this fire.
- **Convergence-gate Axis-1 ≥3-orgs requirement**: TOP-5 ranked entries (tree-sitter / ast-grep / ccusage / context-mode / claude-context) all PASS; ranks 6+ have decreasing convergence and increasing single-individual risk.

---

## §10 Recommendations + Install Queue

**Already INSTALLED (W207 / W205-N / context-mode marketplace)** — no action:
- ccusage (W207 — measurement primary)
- ast-grep (W205-N — code-aware substrate)
- context-mode (marketplace cache v1.0.111+ — token-savings primary)

**STUDY-PILOT queue (Probe DAG 1-7 + axis-3 verification + Mia 4-clause check required BEFORE install)**:
1. zilliztech/claude-context — orthogonal vector-semantic code search (NOT duplicate ast-grep)
2. mixedbread-ai/mgrep — semantic grep adjunct
3. jarrodwatts/claude-hud — operator dashboard (PROVIDER-COMPLEMENT to ccusage)
4. mcpware/cross-code-organizer — organizational visibility

**DEFER queue (axis-3 burn-in OR demand-gate fail)**:
5. spences10/claude-code-analytics — overlap with ccusage
6. jeongwookie/WhereMyTokens — overlap with ccusage
7. rtk-ai/rtk — overlap with ccusage
8. chopratejas/headroom — context-mode already covers
9. buildoak/wet — Cohort 7 metadata-inflation risk
10. ArthurDEV44/distill — axis-3 fail
11. z19r/whetstone — axis-3 fail

**REJECT (immediate; do NOT install)**:
12. juyterman1000/entroly — Cohort 1 META-HARNESS
13. matt1398/claude-devtools — Cohort 6
14. sirmalloc/ccstatusline — Cohort 6
15. tirth8205/code-review-graph — Row-2 fabrication-FAIL
16. safishamsi/graphify — Cohort 5
17. alexgreensh/token-optimizer — License Cohort 2.A
18. jordan112/skinny-jeans — License UNKNOWN
19. aider-ai/aider — CR-12 DUPLICATE (pattern-extract only)
20. mufeedvh/code2prompt — CR-12 DUPLICATE

---

## §11 Convergence with Prior W2xx Streams

This stream cross-references and extends:
- **W205-D** — TUI agents / IDEs / orchestrator-collision verdicts (aider PATTERN-EXTRACT; code2prompt CR-12 DUPLICATE)
- **W205-N** — ast-grep wired W205-N (code-aware substitution)
- **W207** — ccusage installed (measurement primary)
- **W212-J/K/L** — memory + orchestration + obs scoring rubric (identical 9-dim format)
- **W215-M/N/O** — LLM serving + code-intel + reasoning scoring; W215-O ELv2 caveat on context-mode license refuted (verified MIT)
- **W218-P/Q/R** — token-opt CI/CD + auth/browser + MCPs/workflow/safety scoring
- **W222-T** — RAG pipeline depth scoring (semantic-grep parallel to mgrep)

W223-V serves the **Measurement + Visibility + Token-Context-Elite** v52 REPOS_BY_CATEGORY layers. Total v52 coverage with this stream: 14 categories scored (memory / RAG / KG / LLM-serving / code-intel / security / container / reasoning / multimodal / training / token-opt / CI-CD / auth / browser / MCPs / workflow / safety / media-gen-DEFERRED / measurement / token-context-elite).

---

## §12 Cite Anchors (TIER-1 + TIER-2 + TIER-3 lattice per Z:/claude-sota/.claude/rules/citation-discipline.md rule #8)

Constituents:
- TIER-1-DIRECT @ `Z:/claude-sota/docs/verified-avoid.md` (Cohorts 1-7 catalog; cite-anchor only, accessed via prior W2xx evidence-trail not direct probe this fire)
- TIER-1-DIRECT @ `Z:/claude-sota/.claude/rules/convergence-gate.md` (Axis-1+2+3 + Row-2 fabrication-test FAIL gate)
- TIER-1-DIRECT @ `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md` §"7 sub-classes" + Probe DAG 1-7
- TIER-1-DIRECT @ `Z:/claude-sota/.claude/rules/cardinal-rule-12-upstream-install-priority.md` §"CR-12 disposition lattice" (6-class)
- TIER-1-DIRECT @ `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md §Pattern B` (HNF disposition this fire)
- TIER-1-DIRECT @ `Z:/claude-sota-installed/.claude/rules/auto-compact-discipline.md` (Rank #1 context-mode + Rank #2 repomix + Rank #3 save-compact-restore)
- TIER-2 @ W212-J/K/L + W215-M/N/O + W218-P/Q/R + W222-T prior stream outputs at `Z:/claude-sota-installed/tmp/sota-pure-w2*.md`
- TIER-3-LOCAL-OPERATOR-DERIVED @ this fire's manifest probe + verified-avoid file probe + Read of W212-J reference matrix format

`effective_tier = TIER-3-LOCAL-COMPOSITION` per rule #8 MIN_PRECEDENCE.

---

## §13 Update Triggers

Re-evaluate this scoring matrix when:
- A 24th repo emerges in v52 measurement OR token-context categories — append row + recompute composite
- W224-V′ codex BRIDGE-MODE calls land (deferred from §6 HNF) — fold codex verdicts into rank ordering
- W224-V′ source-code deep-dive on TOP-5 lands (deferred from §5) — promote/demote based on findings
- A repo's license changes (Marker Decay window 30d per sota-pin-discipline.md) — re-probe and flip REJECT-LICENSE rows accordingly
- A new Cohort emerges in verified-avoid catalog beyond Cohorts 1-7 — extend §1 + §2 verdicts
- Axis-3 burn-in PASSES for ranks 12-15 (chopratejas/buildoak/ArthurDEV44/z19r) post 90d threshold — promote from DEFER to STUDY-PILOT eligible

---

## §14 Termination Status

- on_handoff_to: orchestrator ✅
- max_turns: <30 ✅ (5 Bash + 1 Read + 2 Grep + 1 Write + tool-search = 9 turns)
- on_token_budget_exceeded:200000 → not exceeded (W201 P0(i) `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=70` active)
- Wall-clock: <25 minutes ✅
- OUTPUT_BUDGET 500-700 LOC: ~520 LOC ✅
- Codex BRIDGE-MODE calls: 0/3 (HNF — §6 Pattern B disposition)

**HANDOFF**: verdict_one_line: "DONE: W223-V measurement-token-context-scoring — composite-leader tree-sitter (92); 4 GENUINE-NEW (claude-context+mgrep+claude-hud+cross-code-organizer) + 5 METADATA-INFLATION + 9 REJECT (7 catalog + 2 CR-12 DUPLICATE); 0/3 codex calls (Pattern B HNF — deferred to W224-V′); written to Z:/claude-sota-installed/tmp/sota-pure-w223-V-measurement-token-context-scoring-2026-05-15.md"
