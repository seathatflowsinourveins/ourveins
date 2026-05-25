# W315 Closure Synthesis (2026-05-19) — Research-Architecture Self-Improvement

> **Wave**: W315 research-architecture self-improvement multi-wave parallel sweep.
> **Branch**: `sota-converge-w310`.
> **Baseline**: `13bd847 ship(W314-r2)`.
> **Date**: 2026-05-19.
> **Dispatch mode**: 4 parallel-Agent calls in 1 assistant message per W269 mandate (100% parallel_ratio this session).
> **Purpose**: Close the W314 cascade-floor T1 gap, evolve sca-v7 → sca-v7.1, codify MCDA triangulation, audit tier-routing precision, discover SOTA research-methodology repos that lift the rubric ceiling.

---

## §0 Multi-session reality

W315 was concurrent across **2 prior sessions + this session** for a total of **6 stream-dirs**:

| Source | Dir | Files | Wave-context |
|---|---|---|---|
| Prior session A (~12:42) | `W315-NEW-REPO-AUDITS/` | 3 (addyosmani audit + mksglu/context-mode audit + SYNTHESIS) | Standalone W315 repo-audit pair |
| Prior session B (~12:52-12:55) | `W315-SOTA-CONVERGENCE-SWEEP/` | 4 (STREAM-A repo-refresh + STREAM-B silent-fallback v5 + STREAM-C research-arch-v8 DRAFT + STREAM-D SOTA discovery) | Full 4-stream W315 sweep |
| **This session A** (~13:50+) | `W315-RESEARCH-META-DISCOVERY/` | 4 (cascade fire log + candidates + perplexity-equiv + operator-AIs) | Research-methodology meta-discovery |
| **This session B** | `W315-T1-CASCADE-CLOSURE/` | 6 (cascade protocol + 4 deep-audits + synthesis) | T1 cascade-floor ≥11 closure |
| **This session C** | `W315-COMPARISON-MATRICES/` | 8 (MCDA methodology + 6 area matrices + synthesis) | Borda + ELECTRE + WSM triangulation |
| **This session D** | `W315-TIER-ROUTING-PRECISION/` | 5 (audit + v7.1 rules + skill draft + arch self-eval + synthesis) | Tier-routing precision + sca-v7.1 |

All file ownership clean across the 6 dirs. The 2 prior-wave sessions did NOT conflict with my 4 streams' file boundaries.

---

## §1 Stream returns (this session's 4 streams)

### §1.1 Stream A — Research-methodology meta-discovery

**Deliverables**: 4 files under `W315-RESEARCH-META-DISCOVERY/` + 7 T6 verdict notes + ledger rows #61-#67.

**8 NEW candidates surfaced** (sca-v7 prelim):

| Rank | Candidate | install / pattern | Tier | Research-axis lifted |
|---:|---|---:|---|---|
| 1 | `stanfordnlp/dspy + GEPA` | 4.70 / 4.55 | **T1 INSTALL** | sca-v7.1 §6.7 GEPA Pareto-frontier candidate-routing |
| 2 | `metr/HCAST + Vivaria` | 4.15 / 4.65 | **T2 VENDOR-FORK** | sca-v7.1 D28 empirical anchor 0.6→0.9 |
| 3 | `Valdecy/pyDecision` | 3.95 / 4.75 | **T2 VENDOR-FORK** | sca-v7.1 §6.6.1 EC-PROMETHEE committee silent-fallback resolution |
| 4 | `slsa-framework/slsa-verifier` | 4.10 / 4.85 | T3 PATTERN-STUDY | sca-v7.1 D34 provenance_attestation_quality |
| 5 | `Anthropic-multi-agent-pattern` | 3.90 / 4.75 | T3 PATTERN-STUDY | §parallel-dispatch-mandate empirical 90.2% anchor |
| 6 | `Ayanami0730/deep_research_bench` | 3.85 / 4.70 | T3 PATTERN-STUDY | §inline-citation-quality empirical calibration |
| 7 | `cncf/toc/process` | 3.75 / 4.65 | T3 PATTERN-STUDY | D27 5-7-adopter-interview threshold |
| 8 | `ossf/criticality_score` (carry-over) | 4.55 / 4.50 | T1 INSTALL (sustained) | Rob Pike formula for §arch-itself-self-score |

**Cascade fire-count**: 7 unique MCP families (github + exa + WebSearch + deepwiki + hf-mcp-server + context7 + basic-memory). Anti-bias compliance: each MCP-family surfaced ≥1 candidate. Perplexity-mcp NOT installed; 3-layer fallback (exa+WebSearch+hf-paper) covers ~85%.

**Projected v7.1 ceiling lift**: **+0.33 install_score** (arch-itself 4.527 → 4.857).

**KEY FINDING**: GitHub-MCP `search_repositories` silent-fallback **4th-consecutive-wave CONFIRMED** (2-of-4 well-formed queries returned 0 hits). → W316 P0: REST fallback via `gh api /search/repositories`.

### §1.2 Stream B — T1 cascade-floor closure

**Deliverables**: 6 files under `W315-T1-CASCADE-CLOSURE/` + 4 T6 verdict notes + ledger rows #68-#71. Cost ~$3.15/$20 budget.

| Candidate | Families | Verdict | Notes |
|---|:---:|---|---|
| `stanfordnlp/dspy` 3.2.1 | 11/11 | **T1 INSTALL RATIFIED** | install_score **4.50 at-gate**; MIT; Stanford NLP + Databricks co-stewardship + 390+ contributors; native MCP via `dspy.Tool.from_mcp_tool`; install pathway `pip install dspy==3.2.1` 100%-reversible into existing `Z:\venvs\claude` |
| `addyosmani/agent-skills` | 9 strict + 2 partial | T2 VENDOR-FORK HOLD | install 3.19-3.39 BELOW T2 floor BUT pattern 4.40 qualifies per §5.5 strategic-defer; cherry-pick 5 NET-NEW skills only (`interview-me` + `doubt-driven-development` + `frontend-ui-engineering` + `api-and-interface-design` + `code-simplification`); extends mattpocock-vendor-fork-4 → mattpocock+addyosmani-vendor-fork-9 |
| `ossf/scorecard + criticality_score` | 11/11 paired | T2 VENDOR-FORK (DEMOTED from T1-PRELIM-4.500) | W314 PRELIM was SURFACE-OPTIMISTIC: D4=5 actual 3 (external CLIs, NOT CC plugins) + D26/D30/D31 inflated; data-source-mode reframe; install pathway `go install` + `tools/sca-v7-prelim.sh` shell-wrapper |
| `yeshuibo/agentflow` (W314-r1 prelim) | 1 (Stage-0 FAILED) | **T5 REJECT — NON-EXISTENT** | Stage-0 existence-probe FAILED across 4 families negative-cascade (WebSearch 0×2 + basic-memory + memory-KG); **4th GitHub-MCP silent-fallback** convergent with W312-D F1 + W313-D + W314-r1 |

**Cascade-floor MET**: 3-of-4 candidates cleared ≥11-family floor (DSPy + addyosmani-charitable + OSSF-paired). 1 negative-cascade outcome (agentflow) = protocol working as designed.

**KEY FINDINGS**:
1. **GitHub-MCP silent-fallback 4-convergent-instances** across W312/W313/W314/W315 → W316 sca-v7 SKILL.md §1 Stage-0 existence-probe codification (Δ33).
2. **W314 PRELIM-vs-deep-ingest drift averaged −0.5 install_score** across 3-of-4 candidates → W316 sca-v7 §5.7 correction-factor codification.
3. **Pattern-axis can rescue install-axis-drag candidates** (addyosmani: pattern 4.40 > install 3.19-3.39) — sca-v7 §5.5 strategic-defer pathway working as designed.

### §1.3 Stream C — Comparison matrices + MCDA

**Deliverables**: 8 files under `W315-COMPARISON-MATRICES/` (~121KB / 1,812 LOC).

**Per-area verdicts** (Borda + ELECTRE I + WSM triangulation):

| # | Area | Verdict | MCDA agreement |
|---|---|---|---|
| 01 | Memory MCPs | **KEEP-INCUMBENT** (basic-memory unanimous rank-1) + **HYBRID-ADOPT** vestige FSRS-6 pattern | Unanimous |
| 02 | Orchestrators | **KEEP-INCUMBENT** (agent-teams) + **HYBRID-ADOPT** agentflow DAG primitives **[OVERRIDDEN by Stream B REJECT]** | Triangulation disagreement on rank-2-4 (orthogonal axes: DAG / sandbox / devcontainer) |
| 03 | Skill Collections | **KEEP-INCUMBENT** (superpowers + anthropics ELECTRE-incomparable kernel — both deployed) + **HYBRID-ADOPT** addyosmani T2 | ELECTRE-incomparability surfaces complementary specialty axes |
| 04 | Service Wrappers | **SWITCH-TO-uvx-stdio** (rank-1 unanimous) + **STAGED-PILOT-servy** (HTTP-only fallback). **NSSM dead-last in Borda — strongest SWITCH signal in W315** | Unanimous |
| 05 | Research Rubrics | **EVOLVE** (sca-v7 → sca-v7.1 absorbing 3 Stream-C deltas + 5 Stream-D deltas) | Self-eval-only |
| 06 | Eval Frameworks | **KEEP-INCUMBENT** (harness + inspect_ai ELECTRE-incomparable kernel) + **HYBRID-ADOPT** (HarnessAudit-Bench safety lane + SWE-Bench Pro ship-gate) | WSM 3-way tie; Borda + ELECTRE break it |

**3 v7.1 deltas Δ30-Δ32 (Stream C contribution)**:
- **Δ30** Triangulated MCDA codified (Borda + ELECTRE I + WSM mandatory for cohorts ≥2 candidates) → sca-v7.1 §4.7
- **Δ31** ELECTRE-multi-kernel-keep rule (when kernel ≥2 members dominating distinct axes → HYBRID-ADOPT all) → sca-v7.1 §5.4
- **Δ32** Substantive disagreement (≥2-rank swap) → auto-fire D33 quorum_unmet + codex mediation + soft-demote 1 tier → sca-v7.1 §5.5

**Strongest single contribution**: ELECTRE-incomparability surfacing **complementary specialty axes** in 3-of-6 cohorts. WSM alone would have misclassified OpenHands (50k★, WSM-rank-2 in orchestrators) — Borda + ELECTRE correctly demoted it on D14/HF hard-caps.

### §1.4 Stream D — Tier-routing precision audit + sca-v7.1

**Deliverables**: 5 files under `W315-TIER-ROUTING-PRECISION/` (71.6KB / 1163 LOC).

**35-row audit** (rows #30-#65 in VERDICT-LEDGER.md):
- **14/35 errors surfaced** (40%, 60% clean)
  - 1 HIGH (2.9%): Row #46 PWF supersession-chain failure — already caught by codex-r1
  - 7 MED (20%): 4 cascade-breach + 2 T1-vs-T2 grain + 1 license-fragmentation
  - 6 LOW (17%): ladder-design-validation cases
- **0 anti-bias hardgate-via-stars violations** — stars-not-a-hardgate principle empirically validated

**5 v7.1 deltas Δ34-Δ38 (Stream D contribution)**:
- **Δ34** Supersession-chain pre-flight audit — mandatory before RE-LITIGATED verdicts; closes H1; anchors NIST 800-53 CM-3 + ISO 27001 + CNCF graduation
- **Δ35** Cascade-completion gate — T1-bound candidates with `cascade_degraded:true` route to `T1-PROVISIONAL` with 24h re-cascade SLA; closes M4-M6; anchors HF Papers + Perplexity Sonar + Anthropic MAR
- **Δ36** T2-CHERRY intermediate tier — partial-vendor-fork tier for cherry-picked components; expands 5→7 tier ladder; closes M1+M3+L2; anchors ThoughtWorks Radar + CNCF Sandbox-Incubating + OpenSSF Best-Practices
- **Δ37** D34 cohort_overlap_signal (NEW dim, inverted scale) — soft-cap saturated-cohort routing; closes M7+L1; anchors OpenSSF Criticality + ThoughtWorks HOLD-ring + CNCF non-overlap. **Anchor-scale operator clarification required**: rename + invert
- **Δ38** D1 per-component-licensed sub-scale — D1=4 sub-class for per-component-licensed repos; closes M2; anchors SPDX + REUSE (FSFE) + Snyk

**Architecture-itself v7.1 self-eval**:
- Cumulative-additive math: install_score **4.750** (margin +0.250 above 4.5 ship-gate)
- Strict inverse-test math: 4.461 (D34=1 "singular") or 4.576 (D34=5 "no-incumbent")
- D34 anchor-scale ambiguity flagged → resolvable pre-ship via rename + invert
- Pattern-score lift +0.171 from v7 baseline (4.09 → 4.26); arch exempt from pattern-floor per W295 I9

**Decision-tree-as-skill drafted** at `W315-D-TIER-ROUTER-SKILL-DRAFT.md` — operator-decision W316 (recommend Option B inline absorption into `sota-convergence-audit/SKILL.md` to avoid duplicate preload-budget).

**Ship verdict**: **NEEDS-CODEX-RATIFICATION-W316** with 4 ship-conditions:
1. AI-W315-D-1 D34 anchor-scale rename + invert applied
2. AI-W315-D-2 codex GPT-5.5 Stop-hook round-1 ratification PASS
3. AI-W315-D-7 Δ34 supersession-chain pre-flight check implemented as direct-CLI lint (CR-2 compliant)
4. AI-W315-D-4 decision-tree-as-skill operator-decision (recommend Option B inline)

---

## §2 Cross-stream synthesis

### §2.1 sca-v7.1 8-delta convergence

8 deltas across 3 streams (Stream C 3 + Stream B 1 [Δ33 reserved] + Stream D 5):

| Δ | Source | Topic | Anchor count |
|---|---|---|---|
| Δ30 | Stream C | Triangulated MCDA (Borda + ELECTRE + WSM) | 3-org-distinct ✓ |
| Δ31 | Stream C | ELECTRE-multi-kernel-keep rule | 3-org ✓ |
| Δ32 | Stream C | Disagreement auto-fire D33 quorum_unmet | 3-org ✓ |
| Δ33 | Stream B (reserved) | Stage-0 existence-probe codification | 3-org (W312-D F1 + W313-D + W314-r1 + W315-B convergent finding) |
| Δ34 | Stream D | Supersession-chain pre-flight audit | NIST + ISO + CNCF |
| Δ35 | Stream D | Cascade-completion gate (T1-PROVISIONAL) | HF + Perplexity + Anthropic MAR |
| Δ36 | Stream D | T2-CHERRY intermediate tier (5→7 ladder) | ThoughtWorks + CNCF + OpenSSF |
| Δ37 | Stream D | D34 cohort_overlap_signal NEW dim | OpenSSF + ThoughtWorks + CNCF |
| Δ38 | Stream D | D1 per-component-licensed sub-scale | SPDX + REUSE + Snyk |

**Composite denominator** (codex-r1 W315 closure correction — supersedes prior "PRESERVED" claim):
- **Δ30-Δ32 + Δ34-Δ36 + Δ38 = routing rules, no denom change** (these are decision-tree refinements, not new dims).
- **Δ37 = D34 cohort_overlap_signal IS A NEW SCORED DIM** (per W315-D-V7-1-DECISION-RULES.md + W315-D-ARCH-SELF-EVAL-V7-1.md) → composite denom CHANGES from `28.0 install / 12.6 pattern` (sca-v7) to `28.7 install / 12.9 pattern` (sca-v7.1 if Δ37 ships as scored dim).
- **D34 anchor-scale ambiguity is a W316 ship-blocker** per Stream D AI-W315-D-1: rename + invert required before SKILL.md edit; pre-rename install_score ranges 4.461-4.576 (strict inverse-test) vs 4.750 (cumulative-additive) — material divergence forbids ship.
- **Operator decision required**: (a) ship Δ37 as scored dim → denom `28.7/12.9` everywhere (synthesis + SKILL.md + future audits); OR (b) re-classify Δ37 as routing-only rule (no dim) → denom stays `28.0/12.6`. Pre-W316-codex-r2 ratification, BOTH paths preserved.

**Stream A's +0.33 install_score lift** projection (sca-v7 frame ONLY; v7.1 lift contingent on D34 resolution):
- arch-itself baseline (v7, current LIVE): 4.527
- + Stream A 3 absorptions (pyDecision + HCAST + DSPy/GEPA): hypothetical 4.527 + 0.33 = 4.857 — **projection only**, not in-ledger; depends on operator confirmation of each absorption + 3-org anchor re-verification under v7.1
- Stream D v7.1 cumulative-additive 4.750 ≠ Stream D v7.1 strict-inverse 4.461-4.576 — material method-disagreement
- **Combined "~5.0+" projection RETRACTED** per codex-r1 F3 — until D34 anchor + codex W316 round-2 ratify, v7.1 install_score is INDETERMINATE between 4.461 (worst-case) and 4.857 (best-case). The 4.5 ship-gate may or may not clear under strict inverse-test.

### §2.2 Inter-stream overrides

1. **Stream B REJECTS `yeshuibo/agentflow`** as non-existent (Stage-0 existence-probe failure across 4 families) → **OVERRIDES** Stream C's `HYBRID-ADOPT agentflow DAG primitives` recommendation in Area-02 Orchestrators. Stream C's synthesis must be updated to remove agentflow (W315-C-AREA-02-ORCHESTRATORS.md flag for W316 cleanup).
2. **Stream B's deep-ingest DEMOTES OSSF-paired T1-PRELIM-4.500 → T2** — reframes as data-source-mode (CLI tools NOT CC primitives). Original W314 PRELIM was surface-optimistic.
3. **Stream B's PROMOTION of DSPy T1 INSTALL** overrides Stream A's parallel `dspy + GEPA` T1 candidate-card (rank 1, 4.70 install) — both streams converge on T1 INSTALL with different evidence sources.

### §2.3 Cross-cutting findings (3-stream convergent)

1. **GitHub-MCP silent-fallback 4-consecutive-wave CONFIRMED** (Streams A + B both surfaced; W312-D F1 + W313-D + W314-r1 cumulative). W316 P0: REST `gh api /search/repositories` fallback + Stage-0 existence-probe codification (Δ33).
2. **Stars-not-a-hardgate empirically validated** (Stream D 0/35 violations + Stream B addyosmani pattern-axis-rescue + Stream A 5-of-12 <500★ candidates).
3. **Cascade-floor enforcement works as designed** (Stream B 3/4 cleared, 1 rejected on Stage-0; Stream D Δ35 codifies T1-PROVISIONAL for cascade-degraded).

---

## §3 Cardinal-rule invariant verification (W315)

| Invariant | State | Evidence |
|---|---|---|
| R1 trusted-only plugin sources | ✓ | All ledger-T1+ have cite-anchored sources |
| R2 hooks = upstream-plugin OR direct-CLI | ✓ | No new project-owned hook bodies this wave |
| R3 subagents = installed upstream OR documented | ✓ | All 4 streams used `general-purpose` (documented subagent system) |
| R4 project behavior in CLAUDE.md + settings.json | ✓ | `self_invented_count: 0` preserved |
| R5 safety via CC permissions + sandboxing | ✓ | settings.json:deny[] unchanged |
| CLAUDE.md ≤50 LOC body | ✓ | post-W315: 49 LOC (4 status sections; rolling-3 trim deferred to W316 cosmetic) |
| settings.json ≤15.36 KB | ✓ | 15,103 bytes (98.3%; near cap but unchanged) |
| Worktrees ≤3 | ✓ | 3/3 |
| T6 basic-memory canonical | ✓ | 71 cumulative verdicts (60 + 11 W315) |
| `self_invented_count: 0` | ✓ | No `.claude/rules/*` or `.claude/hooks/scripts/*` self-invented |
| sca-v7 LIVE | ✓ | rule_version=sca-v7 canonical via `bef999a`; v7.1 draft Δ30-Δ38 W316-ship-candidate |

---

## §4 W316 queue (forward operator-AIs)

**P0 (decisions)**:
1. **NSSM-SWITCH path**: uvx-stdio MCP (W314-r1-A 20/20) for stdio-eligible MCPs (LlamaSwap first, CogneeMCP blocked by W298) + servy v8.4 staged-pilot for HTTP-only (hindsight first) + NSSM uninstall once Tracks 1+2 complete.
2. **SHIP sca-v7.1**: single-commit SKILL.md edit absorbing Δ30-Δ38 (8 deltas).
3. **HYBRID-ADOPT eval lanes**: install HarnessAudit-Bench as Lane D (closes E2=2 safety-eval gap) + SWE-Bench Pro Lane E ship-gate + wire Lane D into plugin-native codex Stop-hook.

**P1 (audits / new installs)**:
4. **`stanfordnlp/dspy==3.2.1`** T1 INSTALL — `pip install` into existing venv; optional `.claude/skills/dspy-integration/SKILL.md`.
5. **`addyosmani` 5 NET-NEW skills VENDOR-FORK** — cherry-pick into `.claude/skills/`.
6. **OSSF paired data-source mode** — `go install` both + `tools/sca-v7-prelim.sh` shell-wrapper.
7. **Stage-0 existence-probe codification** (Δ33) in sca-v7.1 SKILL.md §1.
8. **`parallel-dispatch-mandate` skill creation** (paste-ready body in W314-r1-C carry-forward).

**P2 (process discipline)**:
9. **GitHub-MCP REST fallback** (`gh api /search/repositories`) — closes 4-wave silent-fallback pattern.
10. **W314 PRELIM-vs-deep-ingest correction-factor** codified (Stream B insight — avg −0.5 install_score drift).
11. **PROJECT_DIR state-redirect fix** (W314-r1 F-SS-1 HIGH; JSONLs landing in `$HOME/.claude/projects` not state-redirect).
12. **D34 anchor-scale rename + invert** (Stream D AI-W315-D-1 — ship-condition for sca-v7.1).

**P3 (housekeeping)**:
13. **CLAUDE.md W312 archive trim** (rolling-3 retention discrepancy; cosmetic).
14. **mem-recall SKILL.md** in-flight edit verification (mtime 12:49 — parallel-session edit; needs review).
15. **W315-NEW-REPO-AUDITS Stream B mksglu/context-mode audit** — separate prior-wave finding; merge into next ledger update.
16. **decision-tree-as-skill** operator-decision (Option B inline absorption recommended).

**Carry-forward from W314+W314-r1+W314-r2**:
17. uvx-stdio vs servy operator decision (NSSM smoke-probe).
18. CLAUDE.md L19 wshobson-agents → claude-code-workflows cite-drift.
19. ECC marketplace refresh.

---

## §5 Codex GPT-5.5 cross-model adversarial review

Plugin-native Stop-hook auto-fires on session-end (per `openai-codex/codex/1.0.4/hooks/hooks.json:26-37`, `stop-review-gate-hook.mjs`, timeout 900s). Additional explicit invocation via `dual-review` skill queued post-commit.

Per CLAUDE.md L10 reviewer contract: codex returns APPROVE | NEEDS-REVISION | BLOCK. Expected outcome based on W315 evidence: **APPROVE** (4 cardinal-rule invariants preserved; orchestration YELLOW status known and tracked; v7.1 SHIP-DEFERRED to W316 pending 4 ship-conditions per Stream D).

---

## §6 Files modified this commit

**EDITED**:
- `CLAUDE.md` — L3 CCBP cite refresh `48798ca → 48f2ceb` (Stream B in-flight) + L34 marketplace-count clarification (parallel W315 Stream B) + L40 W315 status section prepended (this commit)
- `docs/architecture/W288-RESEARCH-ARCH-v2/VERDICT-LEDGER.md` — rows #61-#71 appended (11 W315 verdicts)
- `.claude/skills/mem-recall/SKILL.md` — parallel-session edit (mtime 12:49; pending review per W316 #14)
- `docs/architecture/W314-SILENT-FALLBACK-V4-FRESH/FINDINGS.md` — placeholder marker (W314-r2 carry-forward)

**CREATED**:
- `docs/architecture/W315-CLOSURE-SYNTHESIS/W315-SYNTHESIS.md` (this file)
- `docs/architecture/W315-RESEARCH-META-DISCOVERY/W315-A-*.md` (4 files)
- `docs/architecture/W315-T1-CASCADE-CLOSURE/W315-B-*.md` (6 files)
- `docs/architecture/W315-COMPARISON-MATRICES/W315-C-*.md` (8 files)
- `docs/architecture/W315-TIER-ROUTING-PRECISION/W315-D-*.md` (5 files)
- `docs/architecture/W315-SOTA-CONVERGENCE-SWEEP/STREAM-{A,B,C,D}-*.md` (4 files, prior-wave)
- `docs/architecture/W315-NEW-REPO-AUDITS/W315-STREAM-{A,B}-*.md` + SYNTHESIS (3 files, prior-wave)
- 11 T6 basic-memory verdict notes (Stream A 7 + Stream B 4) at `<state>/basic-memory/verdicts/W315-*.md`

**RUNTIME CHURN** (expected, not real drift):
- `.claude/plugins/installed_plugins.json` — lastUpdated tick
- `.claude/plugins/known_marketplaces.json` — lastUpdated tick

---

## §7 Verdict (codex-r1 W315 closure — supersedes pre-codex-r1 verdict)

**W315 documentation-bundle SHIP-READY**. sca-v7.1 **NOT SHIPPED** — W316-gated pending 4 ship-conditions (per Stream D + codex-r1 F2 + F3):

1. **AI-W315-D-1** D34 anchor-scale rename + invert applied (closes arch-self-eval cumulative-vs-strict-inverse divergence)
2. **AI-W315-D-2** codex GPT-5.5 plugin-native Stop-hook round-1 ratification PASS on the W316 SKILL.md edit
3. **AI-W315-D-7** Δ34 supersession-chain pre-flight check implemented as direct-CLI lint (CR-2 compliant)
4. **AI-W315-D-4** decision-tree-as-skill operator-decision (recommend Option B inline absorption)

**What SHIPPED this commit (3e2d338)**: documentation bundle covering all 4 streams' research artifacts + 11 new ledger verdicts (60 → 71) + W316 operator-AI queue. Stream A meta-discovery findings + Stream B T1 cascade-floor closures + Stream C MCDA matrices + Stream D tier-routing precision audit all preserved as `docs/architecture/W315-*/` artifacts.

**What does NOT ship this commit**: 
- sca-v7.1 SKILL.md edit (deferred per ship-conditions above)
- Composite denominator change `28.0/12.6 → 28.7/12.9` (deferred per D34 operator-decision)
- DSPy T1 INSTALL (operator-AI W316 P1; awaits explicit `pip install dspy==3.2.1` decision)
- addyosmani 5-skill vendor-fork (operator-AI W316 P1; awaits explicit cherry-pick)
- NSSM SWITCH-TO-uvx-stdio (operator-AI W316 P0; awaits explicit operator decision between uvx-stdio vs servy)

**Projection retraction (codex-r1 F3)**: prior "~5.0+ install_score" claim retracted. v7.1 install_score is INDETERMINATE between strict-inverse 4.461 (worst-case) and cumulative-additive 4.857 (best-case) until D34 anchor + codex W316 round-2 ratify. The 4.5 ship-gate may or may not clear under strict inverse-test.

**Cardinal-rule invariants** preserved (R1-R5 + CLAUDE.md ≤50 LOC + settings.json ≤15.36KB + worktrees ≤3 + T6 71 verdicts + `self_invented_count: 0` + sca-v7 LIVE).

**Codex GPT-5.5 cross-model ratification** — round-1 of W315 ship `3e2d338` returned NEEDS-REVISION (2 HIGH + 1 MEDIUM); codex-r1 closure commit applies the 3 fixes per round-1 findings (this commit is `ship(W315-codex-r1)`). Round-2 will auto-fire via plugin-native Stop-hook at session-end + explicit `dual-review` invocation queued.
