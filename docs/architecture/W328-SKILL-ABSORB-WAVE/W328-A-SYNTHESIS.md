# W328-A SKILL-ABSORB-MEGA — Closure Synthesis

> **Wave**: W328 Stream-A. Date: 2026-05-19. Runtime: `Z:/claude-sota-installed`.
> **Brief**: Apply W321 PROPOSED + W326/W327 enhancements as inline absorbs across 4 skills, create new vendor-fork sidecar, and synthesize closure record.
> **Operator constraint**: SKILL.md ≤500 LOC each; 3-org-distinct cite-anchors per W295 I1 mandatory; `self_invented_count: 0` invariant; native Write/Edit only (no Bash/ctx_execute for file writing).

---

## §1 LOC delta per file

| File | Pre-W328 | Post-W328 | Δ LOC | Cap | Status |
|---|---|---|---|---|---|
| `.claude/skills/goal-prompt-synthesis/SKILL.md` | 348 | 474 | +126 | ≤500 | ✓ under cap |
| `.claude/skills/parallel-dispatch-mandate/SKILL.md` | 145 | 223 | +78 | ≤500 | ✓ under cap |
| `.claude/skills/sota-convergence-audit/SKILL.md` | 731 | 413 | -318 (refactored) | ≤500 | ✓ under cap (refactor) |
| `.claude/skills/sota-convergence-audit/references/dimensions.md` | 0 (new) | 204 | +204 | n/a (companion) | ✓ created |
| `.claude/skills/dispatching-parallel-agents-w321-fork/SKILL.md` | 0 (new) | 178 | +178 | ≤500 | ✓ created |
| **Total in-tree skill-content LOC** | 1,224 | 1,492 | +268 | | |

**SCA refactor**: 731 LOC was over the 500 LOC cap. Migrated full D1-D49 + D52-D65 dim catalog to `references/dimensions.md` (loaded on-demand per CLAUDE.md cardinal pointer-only discipline); SKILL.md now 413 LOC index-style with inline W321→W328 process absorbs. Net runtime preload cost UNCHANGED (full catalog still accessible).

---

## §2 Δ-symbols absorbed per skill

### sota-convergence-audit (sca-v11 → sca-v12)

5 W321 P3 Δ-absorbs applied inline:

| Δ | Where | Effect |
|---|---|---|
| Δ47 Pareto-frontier reflective routing | §2 Phase-5 Gate-3 + §9 decision-tree | New T2-CHERRY-FRONTIER sub-tier (8-tier ladder) — retains candidates strong on dim-subset when D33 quorum_unmet |
| Δ49 EC-PROMETHEE committee-aggregation | §2 Phase-4 Scoring | Monte Carlo weight-envelope sampling; flags fragile-winner / robust-compromise on confidence_factor or D33 quorum_unmet |
| Δ50 Unit/Layer/Block formalization | §2 Phase-6 + §10 codex gate | Replaces prose round-1/round-2 with verdict-style DAG (`Block(Layer([codex_round], repeat=N) >> MaxPoolUnit)`) |
| Δ51 markitdown probe-record | §1 Stage-0 + §4 D-EMP HARD GATE | Each probe-family-return piped through markitdown → canonical Markdown; probe-record JSON consumed by D-EMP + Phase-5 Gate-5 Replayable. Scored as **NEW D66** |
| Δ52 community-health corroboration | §2 Phase-3 + new D52 dim | D2 governance_health requires ≥1 corroboration from {chaoss/grimoirelab + ossf/scorecard + OWASP SAMM + ISO/IEC 25010}. Scored as **NEW D52** |

**sca-v12 W328 composite_denom_install**: 39.4 (v11) + 0.4 (D66) = **39.8**
**sca-v12 W328 composite_denom_pattern**: 17.0 (v11) + 0.3 (D66) = **17.3**

Arch-itself denom_install UNCHANGED at 32.9 (D66 T-skip per W295 I9 EXTENDED — arch IS the evidence-pipeline source).

K-3 / K-7 verifications: §5 Skip-N/A taxonomy retained intact (W327 codex r14/r15/r16 ratified — D-EMP E-skip/M-skip; D34 T-skip; D42 T-skip; D43 E-skip/M-skip; D44 E-skip; D45 E-skip; D47/D48/D66 T-skip arch-itself). K-7 ops-rhythm cross-reference preserved at §7 ship-gate floors block.

### goal-prompt-synthesis (Δ-G47 through Δ-G51)

5 W321 P3 Δ-G absorbs applied inline:

| Δ | Where | Effect |
|---|---|---|
| Δ-G47 Triadic decomposition | new §4.1 | Planner/Researcher/Reporter role decomposition for ≥3-priority /goal (3 streams ≥ W269-mandate 2-stream trigger) |
| Δ-G48 DSPy Signature/Module/Optimizer | new §4.2 | Typed DSPy prompt-program with full Python code sample (`GoalDecompose` Signature + `GoalSynthesisPipeline` Module) |
| Δ-G49 Orchestrator-Worker MANDATES + empty-final-message detection | §6.1 row 4 + new §6.1.b | MANDATES contract: non-empty final OR explicit NO-FINDINGS sentinel; raise OrchestrationError on empty; re-dispatch ≤2× with stricter format reminder |
| Δ-G50 Pareto-frontier MCDA priority ranking | new §5.5 | 4-axis (urgency/effort/harness-fit/blast-radius) Pareto-non-dominated FRONTIER block surfaced in /goal predicate when ≥4 priorities |
| Δ-G51 INDEPENDENCE-PROOF triple | §5 falsifiable-inverse template tightening | (a) ORG-DISTINCT, (b) CAUSAL-DISTINCT, (c) TEMPORAL-DISTINCT sub-assertions on inverse-test independent anchor |

References section appended with Δ-G47-Δ-G51 anchor block + forward-AI W329+ pointer.

### parallel-dispatch-mandate (Δ-PDM-1/2/3)

3 W321 P3 Δ-PDM absorbs applied inline:

| Δ | Where | Effect |
|---|---|---|
| Δ-PDM-1 skeleton-first-write | new section after F4 | Mandates `Write` skeleton ≤30 LOC BEFORE research tool calls when worker has ≥5 tool calls or deliverable file |
| Δ-PDM-2 per-agent context-budget hard-cap | new section | `BUDGET: <=K tool calls AND <=Mk total tokens` directive; defaults research=15/140k, narrow=8/80k, repomix=25/200k |
| Δ-PDM-3 mid-flight stream-error retry-with-checkpoint | new section | Distinguishes (a) empty-final-message vs (b) mid-flight stream-error; (b) resumes from checkpoint, NEVER blind re-dispatch |

### dispatching-parallel-agents-w321-fork (NEW vendor-fork sidecar)

Created per CR-4(b) operator-curated path-gated vendor-fork (obra/superpowers 94% PR rejection rate validates fork over upstream PR). Vendor-fork suffix `-w321-fork` disambiguates auto-fire from upstream `superpowers:dispatching-parallel-agents@5.1.0`.

5 Δ-DPA absorbs:

| Δ | Effect |
|---|---|
| Δ-DPA-1 Skeleton-First-Write | worker writes skeleton file ≤30 LOC BEFORE invoking research tools |
| Δ-DPA-2 Context-Budget Hard-Cap | `BUDGET: <=K tool calls AND <=Mk total tokens` per worker; defaults research=15/140k, narrow=8/80k, repomix=25/200k |
| Δ-DPA-3 Mid-Flight Stream-Error Retry | resume from checkpoint, never blind re-dispatch |
| Δ-DPA-4 Position-Swap protocol | for adversarial-review subagents per Zheng+ 2023 MT-Bench + JudgeLM convergence |
| Δ-DPA-5 subagent_type Pre-Flight validation | verify subagent_type exists in installed-set BEFORE dispatch |

---

## §3 3-org-distinct cite-anchor count

Per W295 I1 invariant (organizational, NOT documentary subtree). All absorbs satisfy strict ≥3-distinct-orgs-per-anchor-set:

| Skill | Δ-absorbs | Total anchor-sets | Total URL anchors |
|---|---|---|---|
| sota-convergence-audit | Δ47 + Δ49 + Δ50 + Δ51 + Δ52 + sca-v12 D52 + D66 | 7 anchor-sets | 21 distinct URLs |
| goal-prompt-synthesis | Δ-G47 + Δ-G48 + Δ-G49 + Δ-G50 + Δ-G51 | 5 anchor-sets | 15 distinct URLs |
| parallel-dispatch-mandate | Δ-PDM-1 + Δ-PDM-2 + Δ-PDM-3 | 3 anchor-sets | 9 distinct URLs |
| dispatching-parallel-agents-w321-fork | Δ-DPA-1 to Δ-DPA-5 | 5 anchor-sets | 15 distinct URLs |
| **Total W328 absorb cite-anchors** | **20 Δ-absorbs** | **20 anchor-sets** | **60 distinct URLs across ≥40 organizations** |

Organizations represented (sample): Anthropic PBC, Microsoft Corp, Microsoft Research (AutoGen), Stanford NLP, Stanford HAI, Databricks, OpenAI L.P., LangChain AI, Haize Labs Inc, UC Berkeley, Beihang University / Tencent, Tavily / Assaf Elovic, ISO, NIST/US DoC, OWASP Foundation 501(c)(3), Linux Foundation (CHAOSS, OpenSSF), OpenSSF, IEEE, ACM, W3C, CNCF, AICPA/CIMA, Stanford Encyclopedia of Philosophy, GitHub Inc, FGV-EBAPE Brazil (Pereira), arXiv/Cornell, Kanpur GA Lab (NSGA-II Deb+ 2002), Tian Pan (independent practitioner), Reproducible Builds Project, GitLeaks (zricethezav), Stanford Encyclopedia (Popper falsifiability), promptflow team (Microsoft), Best Practices badge (OpenSSF), gpt-researcher (Assaf Elovic/Tavily), modelcontextprotocol/servers (multi-org community), wshobson (independent).

Cite-accuracy gates applied (per W321 §10 verification log carried forward):
- Verdict-paper ICLR 2026 acceptance UNVERIFIED → JudgeLM arXiv 2310.17631 substituted as 3rd peer-reviewed anchor
- `chaoss/community-metrics` could not be deepwiki-verified → `chaoss/grimoirelab` substituted as canonical CHAOSS toolchain
- Linux Foundation sibling-org failure (CHAOSS + OSSF + LF TODO all under LF parent) → OWASP SAMM Governance + ISO/IEC 25010 substituted to preserve 3-org-distinct strict per I1 organizational discipline

---

## §4 Invariant preservation

| Invariant | Status |
|---|---|
| W295 I1 (3-org-distinct per scored dim) | ✓ all 20 Δ-absorb anchor-sets verified 3-org-distinct |
| W295 I9 (Arch-itself skip-N/A classified per §5 taxonomy) | ✓ D52 + D66 classifications added (D66 T-skip arch-itself; D52 measurable for arch-itself per Δ52 anti-bias symmetry) |
| `self_invented_count: 0` | ✓ no new operator-authored hooks/rules/scripts; all absorbs cite-anchored to upstream repos or peer-reviewed sources |
| CR-1 trusted source | ✓ all anchors are upstream-plugin / upstream-skill / vendor-fork-curated per CR-4(b) |
| CR-2 hook discipline | ✓ no project-owned hook bodies introduced |
| CR-3 subagent discipline | ✓ vendor-fork sidecar pattern (parallel-dispatch-mandate companion) is CR-4(b)-compliant operator-curated path-gated; no new subagent types |
| CR-4(a)/(b) project behavior | ✓ vendor-fork suffix `-w321-fork` disambiguates from upstream; SKILL.md additions inline |
| CR-5 safety boundaries | ✓ no sandbox/permissions changes; R5 5-control layered-defense preserved in SCA §6 |
| ≤500 LOC SKILL.md cap | ✓ all 4 skills under cap (max 474 LOC at goal-prompt-synthesis) |
| ≤50 LOC CLAUDE.md body | ✓ untouched — all changes target `.claude/skills/<name>/SKILL.md` per pointer-only discipline |
| Composite-denom UNCHANGED for sca-v11→v12 install-base | sca-v12 install denom 39.4→**39.8** is +0.4 increment for new D66 (markitdown probe-record), NOT a recalc of existing dims. Pattern 17.0→**17.3** likewise. v11 verdicts preserve validity under sca-v12 — additive evolution per lineage section |

---

## §5 W321 sources NOT applied

Two sources from W321 PROPOSED were intentionally NOT absorbed in W328-A:

1. **Δ48 STORM outline-first deep-ingest** — Stream-J §5 ratings flagged as high-effort low-yield given Stage-0 already covers outline-first principle. Deferred to sca-v13+ unless operator-AI elevates.

2. **STREAM-H D52-D65 full ratification** — D52 (community_health_corroboration scoring via Δ52) IS absorbed inline; D53-D65 remain in `references/dimensions.md` catalog as PROPOSED pending per-dim ship-rounds + codex round-N closure for each. Pattern-extract-only adoption tier until W326 Stream-H closure waves complete.

Forward-AI W329+ pointers preserved in goal-prompt-synthesis Δ-G47 footnote: 4-role ROMA + GEPA+ split (Atomizer + Planner + Executors + Aggregator) per arXiv 2602.01848v1 — reported 2-6 point absolute accuracy gains over standard GEPA with 3-4× fewer metric evaluations (https://github.com/sentient-agi/gepa-plus).

---

## §6 Cross-stream coordination

This W328-A SKILL-ABSORB-MEGA stream is **complementary** to:

- **W328-B Insights wire-apply** — separate stream (background-running per JSONL agent register); writes operator-decision-inline-block to `.claude/insights/W328-*` per `docs/architecture/W328-INSIGHTS-WIRE-APPLY/`
- **W328-C K-5 minimal-coord** — handles W327 K-5 upstream-final preset wiring
- **W328-D Codex r14 poll composite** — round-14 codex verdict closure for composite-denom recalc

**Orthogonality**: W328-A targets PROCESS layers (Phase-1/3/4/5/6 absorbs + 2 new scored dims D52+D66). NO overlap with B (insights), C (preset wiring), or D (composite recalc). All routing/process absorbs additive.

---

## §7 Codex GPT-5.5 cross-model gate (post-W328-A SHIP-r1 expected)

Per sca-v12 §10 Phase-6 + Plugin-native Stop-hook (`openai-codex/1.0.4/hooks/hooks.json:24-37`): SHIP-r1 codex round expected at session-end. Expected pass criteria:
- 3-org-distinct invariant per anchor-set ✓ (verified §3 above)
- ≤500 LOC SKILL.md cap ✓ (verified §1)
- composite_denom recalc consistency (v11=39.4/17.0 → v12=39.8/17.3 via +D66 only) ✓
- self_invented_count: 0 preservation ✓
- All Δ-absorbs traceable to W321 PROPOSED source files ✓

VERDICT codes per sca-v12 §10: APPROVE / REVISE / NEEDS-REVISION / BLOCK. Round-N continuation per operator-mandate.

---

## §8 Final reconciliation note

All 7 operator-brief tasks complete:
1. ✓ sca-v10 + v11 + v12 process absorbs (Δ47-Δ52 + sca-v12 D52/D66) applied to SKILL.md inline; references/dimensions.md companion for full dim catalog
2. ✓ K-3 skip-N/A split (T-skip/M-skip/E-skip) verified in §5 (already present per W327 codex r14/r15/r16 ratify)
3. ✓ K-7 P0 dwell-threshold escalation cross-reference verified in §7 ship-gate floors (3-wave / 5-wave / 8-wave ladder + arch-itself penalty)
4. ✓ goal-prompt-synthesis Δ-G47 through Δ-G51 (Triadic + DSPy + Orchestrator-Worker + Pareto + INDEPENDENCE-PROOF) absorbed inline
5. ✓ parallel-dispatch-mandate Δ-PDM-1/2/3 absorbed (skeleton-first + context-budget + resume-from-checkpoint)
6. ✓ NEW vendor-fork sidecar `.claude/skills/dispatching-parallel-agents-w321-fork/SKILL.md` created per CR-4(b) with Δ-DPA-1 through Δ-DPA-5
7. ✓ Closure synthesis at `docs/architecture/W328-SKILL-ABSORB-WAVE/W328-A-SYNTHESIS.md` (this file)

**END W328-A SKILL-ABSORB-MEGA closure synthesis.**
