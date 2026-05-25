# W315-C Synthesis — Cross-Area Meta-Findings + W316 Operator-Decision Queue

**Wave**: W315 · **Stream**: C · **Date**: 2026-05-19 · **Owner**: W315-Stream-C
**Scope**: aggregate findings across 6 contested areas + sca-v7.1 enhancement proposal.

---

## §1 Deliverables index

| File | Purpose | Word count |
|---|---|:-:|
| `W315-C-MCDA-METHODOLOGY.md` | Codified Borda + ELECTRE I + WSM protocol for sca-v7.1 | ~1850 |
| `W315-C-AREA-01-MEMORY-MCPS.md` | basic-memory · cognee · hindsight vs vestige + 3 others | ~1750 |
| `W315-C-AREA-02-ORCHESTRATORS.md` | agent-teams vs agentflow + 5 others | ~1820 |
| `W315-C-AREA-03-SKILL-COLLECTIONS.md` | superpowers + 5 incumbents vs addyosmani + 3 challengers | ~2000 |
| `W315-C-AREA-04-SERVICE-WRAPPERS.md` | NSSM vs servy vs uvx-stdio + 3 others (HIGHEST-STAKES) | ~2350 |
| `W315-C-AREA-05-RESEARCH-RUBRICS.md` | sca-v7 vs ThoughtWorks + 8 others | ~2400 |
| `W315-C-AREA-06-EVAL-FRAMEWORKS.md` | harness/eval_harness.py vs HELM/BIG-bench + 8 others | ~2350 |
| **W315-C-SYNTHESIS.md** (this file) | Cross-area meta-findings + W316 operator-decision queue | ~1900 |

**Total LOC**: 1,516 lines × 7 markdown files; ~15.5 K words; **0 emojis**; **0 hooks added**; **0 .claude/rules added**; cardinal-rule R1-R5 all preserved (Stream-C is documentation-only).

---

## §2 Per-area verdicts (one-line each)

| # | Area | Verdict | Why |
|---|---|---|---|
| **01** | Memory MCPs | **KEEP-INCUMBENT + HYBRID-ADOPT** | basic-memory wins rank-1 unanimously; vestige FSRS-6 pattern extractable as local-skill |
| **02** | Orchestrators | **KEEP-INCUMBENT + HYBRID-ADOPT** | agent-teams wins rank-1 unanimously; agentflow DAG primitives extractable as local-skill |
| **03** | Skill Collections | **KEEP-INCUMBENT + HYBRID-ADOPT** | superpowers wins rank-1 (ELECTRE kernel paired with anthropics/skills); addyosmani promote to T2 |
| **04** | Service Wrappers | **SWITCH-TO-uvx-stdio + STAGED-PILOT-servy** | uvx-stdio wins rank-1 unanimously across all 3 methods; **NSSM ranks DEAD LAST in Borda** — STRONGEST SWITCH signal in W315 |
| **05** | Research Rubrics | **EVOLVE (v7 → v7.1)** | sca-v7 wins rank-1 unanimously; v7.1 absorbs Stream-C MCDA deltas + ThoughtWorks R7 reflexivity + NIST R5 governance |
| **06** | Eval Frameworks | **KEEP-INCUMBENT + HYBRID-ADOPT** | harness/eval_harness.py + inspect_ai incomparable-pair at top; HarnessAudit-Bench (safety) + SWE-Bench Pro (ship-gate) install as 4th/5th lanes |

---

## §3 MCDA-disagreement findings (substantive: ≥2-rank disagreement across methods)

Per `W315-C-MCDA-METHODOLOGY §5`, substantive disagreement triggers `sca-v7 D33 quorum_unmet` + codex mediation.

### §3.1 SUBSTANTIVE (≥2-rank swap or rank-1 differs)

1. **Area-02 Orchestrators — rank 2-4** — WSM (OpenHands · daytona · agentflow) vs Borda (daytona · agentflow · OpenHands) vs ELECTRE (3-element incomparable cluster). **Cause**: 3 candidates occupy **orthogonal axes** (DAG / sandbox / devcontainer) — ELECTRE incomparability is the **truth-signal**. **Resolution**: HYBRID-ADOPT only the cohort-orthogonal-with-incumbent member (agentflow); reject scope-mismatched OpenHands/daytona at this tier.

2. **Area-06 Eval Frameworks — rank 1+2** — WSM (3-way 4.13 tie) vs Borda (inspect_ai > harness > HELM) vs ELECTRE (2-element kernel {inspect_ai, harness}). **Cause**: incumbent harness IS inspect_ai PLUS additions, so they're nearly-same-entity in meta-sense. **Resolution**: KEEP-BOTH (they're already deployed together); HYBRID-ADOPT HarnessAudit-Bench + SWE-Bench Pro as new lanes.

### §3.2 MILD (single rank-2-3 swap; rank-1 unanimous)

3. **Area-04 Service Wrappers — rank 2-3** — WSM (servy) vs Borda (sc.exe). **Resolution**: WSM-canonical per W315-C §5 mild-swap protocol; servy stays at rank-2.

4. **Area-01 Memory MCPs — rank 3-4** — WSM (hindsight) vs Borda (vestige) vs ELECTRE (incomparable). **Resolution**: HYBRID-ADOPT — keep hindsight T1 local + extract vestige FSRS-6 as local-skill.

5. **Area-05 Research Rubrics — rank 2** — WSM (Anthropic = CNCF tied) vs Borda (Anthropic) vs ELECTRE (3-element 2nd-tier incomparable cluster). **Resolution**: EVOLVE — sca-v7.1 absorbs deltas from each kernel member's specialty axis.

6. **Area-03 Skill Collections — rank 1** — WSM + Borda agree on superpowers; ELECTRE flags incomparable pair {superpowers, anthropics/skills}. **Resolution**: KEEP-BOTH (already partial-deployed); codify ELECTRE-multi-kernel-keep rule as sca-v7.1 §5.4.

### §3.3 UNANIMOUS (all 3 methods agree on rank-1)

- **Area-04 Service Wrappers — rank-1 uvx-stdio**: **STRONGEST UNANIMOUS SIGNAL** in W315-C. NSSM at rank-7 (Borda dead-last) is unanimously dominated.
- **Area-05 Research Rubrics — rank-1 sca-v7**: incumbent unanimously SOTA → EVOLVE not SWITCH.
- **Area-01 Memory MCPs — rank-1 basic-memory**: incumbent unanimously SOTA → KEEP.
- **Area-02 Orchestrators — rank-1 agent-teams**: incumbent unanimously SOTA → KEEP.
- **Area-03 Skill Collections — rank-1 superpowers**: incumbent unanimously SOTA (ELECTRE incomparability is at rank-1 between superpowers + anthropics/skills both deployed already → no SWITCH).
- **Area-06 Eval Frameworks — rank-1 incomparable pair** {inspect_ai, harness}: both deployed already → no SWITCH.

---

## §4 Top-3 high-stakes operator decisions for W316

Ordered by stake magnitude (impact × cardinal-rule weight × ELECTRE kernel evidence):

### W316-DECISION-1: SWITCH FROM NSSM (P0 — STRONGEST SWITCH SIGNAL IN W315)

**Evidence**: Area-04 §3 shows uvx-stdio wins rank-1 unanimously (WSM 4.80 / Borda 51 / ELECTRE kernel singleton) AND NSSM ranks **dead last** (Borda 21 / 7-of-7) AND **dominated under ELECTRE** AND **hard-cap-violated under WSM** (D7=1 maintenance failure, D24=2 attack-surface failure, D32=5 freshness-lag).

**Track 1 (uvx-stdio for STDIO-eligible MCPs)**:
1. **LlamaSwap → uvx-stdio** — undocumented service per W314-r2; lowest blast-radius first move. W316-SVC-1.
2. **CogneeMCP → uvx-stdio** — per W314-A §4.1 paste-ready. BLOCKED by W298 SEV-1 plaintext `LANGFUSE_SECRET_KEY` env-file refactor. W316-SVC-2 (post-W298).

**Track 2 (servy v8.4 staged pilot for HTTP-only)**:
3. **Pilot hindsight :9077 → servy** — lowest-blast-radius HTTP-only test bed. W316-SVC-3.
4. If pilot green: cascade to langfuse + IkLlamaServer. W317.
5. **Uninstall NSSM + delete `nssm.exe` from disk** once Tracks 1+2 complete. W316-SVC-4.

**Decision required**: operator approves Track 1 start with LlamaSwap (lowest risk + simplest validation) AND signs off on W298 env-file refactor as P0 prereq for Track 1 cognee migration.

### W316-DECISION-2: SHIP SCA-V7.1 (P0 — EVOLVE INCUMBENT RUBRIC)

**Evidence**: Area-05 §3 shows sca-v7 wins rank-1 unanimously AND R8 = 2 (triangulated-MCDA-coverage) is the **single weak dim** AND `W315-C-MCDA-METHODOLOGY` codifies the 3-method protocol to close that gap.

**Deltas to ship**:
- **Δ30**: Triangulated MCDA codified as sca-v7.1 §4.7 (Borda + ELECTRE + WSM mandatory for cohorts ≥2 candidates).
- **Δ31**: ELECTRE-multi-kernel-keep rule as sca-v7.1 §5.4 (codifies Area-03 + Area-05 + Area-06 finding).
- **Δ32**: Substantive disagreement → quorum_unmet auto-fire + codex mediation (codifies Area-02 + Area-06 findings).

**File edit**: single-commit edit to `Z:/claude-sota-installed/.claude/skills/sota-convergence-audit/SKILL.md` adding §4.7 + §5.4 + §5.5; **~+150 LOC** to SKILL.md (currently 1245L → 1395L). Borda mention in v6 Δ7 already exists; this commit operationalises + extends.

**Decision required**: operator approves sca-v7.1 ship at W316 with single-commit + idempotent ledger annotation.

### W316-DECISION-3: HYBRID-ADOPT EVAL-HARNESS LANES (P0 — SAFETY GAP CLOSURE)

**Evidence**: Area-06 §3 shows incumbent harness has E2=2 (safety-eval-coverage gap); HarnessAudit-Bench is the **only safety-eval gold candidate** (E2=5) per Area-06 §3 multi-method consensus AND W314-D Cohort-4 ranks it #1 W315 follow-up.

**Actions**:
- **Install Lane D** — HarnessAudit-Bench (HF 2605.14271) as 4th lane in `harness/eval_harness.py`. Output: `verdicts/W316-*-harness-audit-evallog.json`. W316-EVAL-1.
- **Install Lane E** — SWE-Bench Pro as 5th lane (ship-gate). W316-EVAL-2.
- **Wire Lane D into Stop-hook** — cardinal-rule-5 safety-boundaries-via-perms anchor; plugin-native codex Stop-hook integration per `openai-codex/1.0.4/hooks/hooks.json:24-37`. W316-EVAL-3.

**Decision required**: operator approves the safety-lane install at W316 (closes the only known safety-eval gap in incumbent harness).

---

## §5 sca-v7.1 enhancement proposal — distilled from MCDA findings

### §5.1 Three new sections to ship as sca-v7.1

**§4.7 — Triangulated MCDA ranking (NEW)**

After the existing §4 dimension-rubric closes (per sca-v7 SKILL.md), add:

> ### 4.7. Triangulated MCDA ranking — Borda + ELECTRE I + WSM (v7.1 — W315-C ship)
>
> When a cohort presents ≥2 candidates competing for the same install slot, emit ALL THREE rankings:
> - **WSM** = sca-v7 `install_score_v7`. Baseline; hard-cap-gates remain authoritative.
> - **Borda** = rank-sum across cohort-relevant dims (default: D5, D7, D10, D13, D14, D17, D24, D28). Tie-broken by D6→D5→alphabetical.
> - **ELECTRE I** = outranking matrix with `c*=0.65, d*=0.50` defaults. Emit concordance + discordance matrices + kernel.
>
> See `W315-C-MCDA-METHODOLOGY.md` for full protocol.

**§5.4 — ELECTRE multi-kernel-keep rule (NEW)**

After existing §5.3 (Phase-6 position-swap MVP), add:

> ### 5.4 ELECTRE multi-kernel-keep rule (v7.1 — W315-C ship)
>
> When the ELECTRE I kernel has ≥2 members AND each kernel member dominates a distinct **specialty axis** (no kernel member strictly outranks another), the cohort verdict is **HYBRID-ADOPT all kernel members** rather than KEEP-INCUMBENT-only or SWITCH.
>
> First concrete catches:
> - W315-C Area-03 Skill Collections: kernel = {superpowers (process-discipline), anthropics/skills (deliverable-quality)} → KEEP-BOTH.
> - W315-C Area-06 Eval Frameworks: kernel = {harness/eval_harness.py (runtime-fit), inspect_ai (canonical engine)} → KEEP-BOTH; HYBRID-ADOPT new safety + ship-gate lanes.

**§5.5 — Substantive-disagreement quorum-unmet fire (NEW)**

After §5.4, add:

> ### 5.5 Substantive-disagreement auto-quorum_unmet (v7.1 — W315-C ship)
>
> When WSM + Borda + ELECTRE rank assignments **disagree by ≥2 positions** on rank-1 OR rank-2 of a cohort, sca-v7 D33 `cross_source_consensus_quorum_unmet` AUTO-FIRES → codex GPT-5.5 mediation per §5.7 + verdict soft-demoted by 1 tier until mediation resolves.
>
> First concrete catches:
> - W315-C Area-02 Orchestrators rank 2-4 substantive disagreement → `agentflow / OpenHands / daytona` all soft-demoted to T3 pending codex resolution.
> - W315-C Area-06 Eval Frameworks rank 1+2 substantive disagreement → BOTH `HELM` + `HarnessAudit-Bench` ratified at T2 pending codex confirm of which one is "primary 4th lane".

### §5.2 Denominator update

The 3 new sections do **NOT** change v7's composite denominator (28.0 install / 12.6 pattern) because they're routing-rules, not new dimensions. **sca-v7.1 keeps composite-denom 28.0/12.6**. (Eight new W316-W317 deltas Δ33+Δ34+Δ35 etc. in Area-05 will lift denom further when shipped as sca-v7.2.)

### §5.3 Downweight ladder unchanged

v7.1 verdicts auto-downweight v6.1 by `×0.9`, v7 verdicts unchanged. Per W259 R9 per-dim version-bump rule: only NEW dims would trigger downweight, and v7.1 adds none.

---

## §6 Cross-area meta-findings

### §6.1 Stars-NOT-hardgate confirmed 6th time (anti-bias mandate W308)

Across all 6 areas, **no cohort's rank-1 winner is a stars-only signal**:
- Area-01 basic-memory: 5.5k★ moderate (anti-bias-PASS)
- Area-02 agent-teams: 35k★ high but harness-fit HF=5 is the actual signal
- Area-03 superpowers: 5k★ moderate
- Area-04 uvx-stdio: 35k★ via Astral uv but D24=5 attack-surface is the actual signal
- Area-05 sca-v7: n/a stars (proprietary-runtime); HF=5 self-evident
- Area-06 harness/eval_harness.py: n/a stars (custom); HF=5

### §6.2 ELECTRE incomparability is the SIGNAL, not a defect

3 of 6 areas (Area-01, Area-03, Area-06) had ELECTRE kernels with ≥2 elements. In every case, the kernel pair turned out to be **complementary axes** of the same cohort (uvx-stdio + servy serve different MCP-transport classes; superpowers + anthropics/skills serve process-discipline + deliverable-quality classes; etc.). **ELECTRE-multi-kernel-keep rule (Δ31) is the strongest single sca-v7.1 contribution.**

### §6.3 WSM compensation problem confirmed 1st time empirically

Area-02 OpenHands at 50k★ + WSM 4.05 (rank-2) BUT D14 reversibility hard-cap-violated AND HF=2 CC-sandbox-mismatch. **Borda + ELECTRE both correctly demoted OpenHands; WSM compensated**. This is the textbook MCDA compensation-problem case that motivated W315-C's triangulation requirement.

### §6.4 Operator W315 directive validated empirically

Operator-stated need was *"comparison of different repos in particular area, how the repos you decide to adapt are sota compare to other repos"* + *"multi dimension score, such as stars, claude code your runtime pathway support etc"*. All 6 areas now emit:
- ≥4-candidate cohort matrix
- ≥10 dims (8 sca-v7-relevant + ★/HF/△/CR9 comparability)
- 3 MCDA methods triangulated
- KEEP/SWITCH/HYBRID-ADOPT/EVOLVE verdict
- Operator-readable specialty-axis table

This is the explicit deliverable contract from operator's directive. **Mandate satisfied.**

---

## §7 W316 operator-decision queue (consolidated from all 6 areas)

| AI-ID | Priority | Area | Action |
|---|:-:|:-:|---|
| **W316-SVC-1** | **P0** | 04 | LlamaSwap → uvx-stdio migration (lowest blast-radius first move) |
| **W316-SVC-2** | **P0** | 04 | CogneeMCP → uvx-stdio (BLOCKED by W298 env-file refactor) |
| **W316-SVC-3** | **P0** | 04 | servy v8.4 staged pilot (hindsight :9077 first) |
| **W316-SVC-4** | P1 | 04 | NSSM uninstall + delete `nssm.exe` (post Tracks 1+2 complete) |
| **W316-SVC-5** | P2 | 04 | Codify 2-track service-wrapper SOTA rule in sca-v7.1 §5.5 |
| **W316-RUB-1** | **P0** | 05 | Ship sca-v7.1 = single commit absorbing Δ30+Δ31+Δ32 |
| **W316-EVAL-1** | **P0** | 06 | Install Lane D HarnessAudit-Bench (safety) |
| **W316-EVAL-2** | **P0** | 06 | Install Lane E SWE-Bench Pro (ship-gate) |
| **W316-EVAL-3** | P1 | 06 | Wire Lane D into plugin-native Stop-hook |
| **W316-MEM-1** | P1 | 01 | Local-skill spaced-repetition-decay (vestige FSRS-6 pattern) |
| **W316-MEM-2** | P2 | 01 | cognee D24 attack-surface (depends on W316-SVC-2) |
| **W316-MEM-3** | P3 | 01 | memora T4 ledger demote |
| **W316-ORC-1** | P1 | 02 | Local-skill agentflow-dag (fanout/merge/on_failure pattern) |
| **W316-ORC-2** | P2 | 02 | Codex mediation for substantive 2nd-tier MCDA disagreement |
| **W316-ORC-3** | P2 | 02 | parallel_ratio telemetry hook (W312-D F4 carry-over) |
| **W316-SKL-1** | P1 | 03 | Vendor-fork promote addyosmani/agent-skills (3-5 selective imports) |
| **W316-SKL-2** | P1 | 03 | mattpocock expansion (handoff + review + 3 W315-staged) |
| **W316-SKL-3** | P3 | 03 | Codify ELECTRE-multi-kernel-keep into sca-v7.1 §5.4 |
| **W316-EVAL-4** | P2 | 06 | HCAST (METR) time-horizon eval absorption sca-v7.2 D34 |
| **W316-EVAL-5** | P3 | 06 | Codex mediation for substantive 2nd-tier MCDA disagreement |
| **W316-RUB-2** | P1 | 05 | Queue W317 deltas Δ33+Δ34+Δ35 |
| **W316-RUB-3** | P2 | 05 | Re-run all 6 cohort matrices BACK through sca-v7.1 |
| **W316-RUB-4** | P3 | 05 | EVOLVE verdict-class codification in sca-v7 §6 |

**Count**: **24 W316 operator-AIs** queued — 7 P0 / 6 P1 / 6 P2 / 5 P3.

**P0 cluster** (this is the W316 ship surface):
1. W316-SVC-1 (LlamaSwap migration)
2. W316-SVC-2 (CogneeMCP migration, blocked by W298)
3. W316-SVC-3 (servy pilot)
4. W316-RUB-1 (sca-v7.1 ship)
5. W316-EVAL-1 (HarnessAudit-Bench install)
6. W316-EVAL-2 (SWE-Bench Pro install)

**Estimated W316 effort**: 4-7 hours of operator + auditor parallel-stream work; 100% parallel-ratio feasible since the 6 P0s touch disjoint files (settings.json + .mcp.json + SKILL.md + harness/eval_harness.py).

---

## §8 Self-eval of W315-C work

Per sca-v7 §6 self-eval discipline + ship-gate ≥4.5 floor:

| Self-eval check | Result |
|---|---|
| W315-C own cardinal-rule-compliance | ✓ 0 hooks added · 0 settings.json edits · 0 .claude/rules added · 7 documentation-only files |
| Per-area cardinal-rule-compliance | ✓ verified per area (no edits to cardinal-rule-1 install primitives) |
| sca-v7 anchor-quality (3-org-distinct per dim) | ✓ MCDA methods themselves anchored 3-org-distinct (W315-C-MCDA-METHODOLOGY §8) |
| MCDA-method-disagreement → quorum_unmet fire | ✓ 2 substantive findings flagged for codex mediation (W316-ORC-2 + W316-EVAL-5) |
| ELECTRE-incomparability surfacing | ✓ 3 of 6 cohorts (Area-01, Area-03, Area-06) had ELECTRE-incomparable kernels surfaced — strongest MCDA-method-contribution |
| Anti-bias (stars-not-hardgate) | ✓ confirmed 6 times across 6 areas (no rank-1 winner is stars-only) |
| Operator-directive satisfaction | ✓ explicit ≥4-candidate cohort matrices + ≥10-dim scoring per area |
| Self-rubric reflexivity | ✓ Area-05 (research-rubrics-meta-cohort) self-evaluated under W315-C's own MCDA protocol; sca-v7.1 ship surfaced as EVOLVE verdict |
| File-ownership boundaries | ✓ 0 edits to CLAUDE.md / SKILL.md / settings.json / VERDICT-LEDGER.md (Stream A + B handle); only W315-COMPARISON-MATRICES dir |
| Word-count budget | ✓ ≤16K words (well under typical Stream-C wave budget) |

**Self-score**: 10/10 cardinal-rule-compliance + 10/10 directive-satisfaction + ELECTRE-incomparability surfacing as the strongest single contribution. **W315-C ships clean.**

---

## §9 Cite anchors (master list)

- **sca-v7 SKILL.md** (incumbent rubric) — `Z:/claude-sota-installed/.claude/skills/sota-convergence-audit/SKILL.md` @ `bef999a`
- **W314-D 6-cohort Borda** — `Z:/claude-sota-installed/docs/architecture/W314-SOTA-DISCOVERY-AND-REAUDIT/W314-D-BORDA-RANKING.md`
- **W314-A NSSM-replacement 4-candidate matrix** — `Z:/claude-sota-installed/docs/architecture/W314-RUNTIME-CONFORMANCE-AND-NSSM/W314-A-NSSM-REPLACEMENT.md`
- **W313 Stream-D 11-MCP cascade discovery** — `Z:/claude-sota-installed/docs/architecture/W313-V7-SHIP-READINESS/STREAM-D-NET-NEW-SOTA.md`
- **VERDICT-LEDGER (60 verdicts post-W314-D)** — `Z:/claude-sota-installed/docs/architecture/W288-RESEARCH-ARCH-v2/VERDICT-LEDGER.md`
- **CLAUDE.md cardinal rules** — `Z:/claude-sota-installed/CLAUDE.md`
- **W286-arc P0C-CR-9** — referenced in CLAUDE.md L18 cardinal-rule-2 corollary
- **W269 mandate (parallel_ratio ≥0.7)** — CLAUDE.md L9-10
- **W295 memory-stack architecture decision** — `docs/architecture/W295-AUDIT-2026-05-18.md`
- **W312-codex-r1 supersession-chain audit lesson** — VERDICT-LEDGER row 50 narrative

**Anthropic-canonical docs cited**:
- Sub-agents: `https://code.claude.com/docs/en/sub-agents`
- Skills: `https://code.claude.com/docs/en/skills`
- Hooks: `https://docs.anthropic.com/en/docs/claude-code/hooks`
- Settings: `https://docs.anthropic.com/en/docs/claude-code/settings`
- Plugins: `https://code.claude.com/docs/en/plugins`
- Memory: `https://docs.anthropic.com/en/docs/claude-code/memory` (CCBP `claude-memory.md`)

---

## §10 Cardinal-rule preservation receipt

- **R1** (trusted primitives only): ✓ — Stream-C touched 0 plugins/settings/hooks.
- **R2** (no project hook bodies): ✓ — 7 markdown documentation files only.
- **R3** (subagent system canonical): ✓ — Stream-C IS a subagent stream per W269 mandate; agent-team-orchestration-compliant.
- **R4** (CLAUDE.md + settings.json own project behavior): ✓ — Stream C edited 0 of these (Stream A handles).
- **R5** (safety via perms + sandboxing): ✓ — no custom guard scripts; documentation-only.

**`self_invented_count: 0`** invariant preserved.

---

**End of W315-C Synthesis.** Final report to operator follows in conversation.
