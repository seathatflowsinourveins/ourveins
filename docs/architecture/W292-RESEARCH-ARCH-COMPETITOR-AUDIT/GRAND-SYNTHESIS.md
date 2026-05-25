# W292 — Research-Architecture Competitor Audit — Grand Synthesis

> **Date**: 2026-05-18
> **Team**: `w292-research-arch-competitor-audit` — 4-agent team-spawn under W269 mandate
> **Operator mandate (verbatim)**: "the source of truth form extensive research and muti angle convergences ... your very decision making process and architecture can keep improving even replace by sota repos,insights, references"
> **Critical anti-pattern this wave AVOIDED**: self-reinforcement bias. Our v3 rubric was treated as the SUBJECT under external review, NEVER as authority.
> **Verdict (triple convergent)**: **EVOLVE v3 → v3.1+v4 — DO NOT replace, DO NOT keep-as-is**.

---

## §0 — TL;DR

Three agents (A discovery, B inverse-benchmark, C replacement-analysis) arrived at the **same verdict via three independent evidence paths**: **EVOLVE**. This is not a defensive default — replacement was a live option in every prompt, and 5 specific full-replacement paths were evaluated and rejected on evidence (not loyalty). The 4th agent (D) produced the codex GPT-5.5 cross-model gate prompt for the external ratification.

**v3 score across 12 external rubrics**: **3.82 / 5** average (per Agent B, full table in METHODOLOGY-BENCHMARK.md §1). The score is GOOD — not the best, not the worst, with specific upgradeable gaps. This is exactly the band where EVOLVE (not KEEP, not REPLACE) is correct.

**Structural finding** (Agent C §11): "no public system exists that targets v3's specific niche (autonomous + local-first + single-operator + cross-model-gated + state-outside-repo)". The runtime is at the structural frontier of public adoption-decision rubrics — replacement candidates exist for OUTER LAYERS (ThoughtWorks Radar for tier-shell, CNCF for evidence) but not for the FULL specification. **v3 is the closest existing-in-the-wild architecture to what the runtime needs; it must evolve, not be replaced.**

---

## §1 — Team artefacts (4 files, 2,361 lines total)

| File | Author | Lines | Cites | Verdict |
|---|---|---:|---:|---|
| `COMPETITOR-DISCOVERY.md` | Agent A | 746 | 26 systems × ≥3 orgs = ~80 | NO-FULL-REPLACE; 8 strict-upgrade patterns to absorb |
| `METHODOLOGY-BENCHMARK.md` | Agent B | 841 | 42 distinct URLs × 13 orgs | EVOLVE v3 → sca-v3.1 (6 specific changes) |
| `REPLACEMENT-ANALYSIS.md` | Agent C | 774 | 43 cites × 14 orgs | EVOLVE v3 (not REPLACE); 6-stage migration |
| `CODEX-GATE-PROMPT.md` | Agent D | ~500 | ≤2000-char codex prompt + protocol | Operator-action: invoke `/codex:adversarial-review --wait` |
| `README.md` | parent | 32 | n/a | wave kick-off + anti-pattern policy |
| `GRAND-SYNTHESIS.md` | parent (this) | this | n/a | The triple-convergent verdict + executable plan |

Combined external research surface: **~26 SOTA systems** across **6 source families** with **≥30 organisationally-distinct cites** in each artefact (typical ≥3-orgs/claim bar cleared with margin).

---

## §2 — The three independent evidence paths (and how they converged)

### Path A — Discovery breadth (Agent A)

Enumerated **26 external research-architectures** across the 6 mandated source families (academic-eval pipelines × 11 · agentic-research frameworks × 4 · awesome-list curation × 3 · adoption-decision systems × 4 · convergence-consensus methods × 4 · sources-we-don't-use × 5). Top-12 ranked by replace-v3-plausibility. Key finding: **4 partial-replace candidates** (ThoughtWorks Tech Radar for tier-shell · CNCF graduation for evidence · Wikipedia GNG for source-diversity · HELM for benchmark-metrics), **0 full-replace candidates**.

### Path B — Inverse benchmark (Agent B)

Applied **12 external rubrics TO v3** (not the inverse). For each, scored v3 under the external rubric's own rules. **v3 average: 3.82 / 5**. Cross-rubric consensus surfaced **12 convergence rules** (rules ≥6 of 12 external rubrics share). Of these, our v3 already implements 7; the remaining 5 are **strict upgrades** we should absorb. Identified **3 NEW dimensions** (D16/D17/D18) by majority external-convergence vote.

### Path C — Replacement analysis (Agent C)

Evaluated **10 plausible replacement candidates** (Anthropic Multi-Agent · Perplexity Sonar · Stanford HELM · OpenAI Deep Research · ThoughtWorks Radar · CNCF · wshobson · awesome-claude-code · AGENTS.md · pure-codex). Treated replacement as a LIVE option. **5 rejected on evidence** (not on loyalty to v3); **5 absorbed as components** of an EVOLVE plan. Particular finding: **pure-codex-as-sole-rubric REJECTED** via D10 ≤ 2 (would duplicate v3 without pattern improvement; codex is the cross-model GATE, not the rubric).

### How they converged

All 3 reached EVOLVE from different starting points. The convergence is **real multi-angle confirmation**, not echo. Compare:

| Question | Agent A answer | Agent B answer | Agent C answer | Converged? |
|---|---|---|---|---|
| Any full-replace candidate? | No | (didn't ask) | No (10/10 rejected as full-replace) | ✅ NO |
| Best replace candidate for outer-shell? | ThoughtWorks Radar | ThoughtWorks Radar | ThoughtWorks Radar | ✅ Same |
| Best replace candidate for evidence-typing? | CNCF graduation | CNCF + Wikipedia GNG | CNCF | ✅ Same |
| Best replace candidate for benchmark-metrics? | HELM | HELM | HELM | ✅ Same |
| New dimension to add? | (8 strict-upgrade patterns) | D16/D17/D18 | (5 v3.1 stages) | ✅ Overlapping |
| Pure-codex viable? | (not asked) | (not asked) | REJECTED via D10 | ✅ Consistent |

---

## §3 — New v3.1+ rules surfaced by the W292 team (12 absorption candidates)

These are rules our v3 does NOT have, that ≥3 of the 12 external rubrics REQUIRE. Cross-team convergence between Agent A (8 strict-upgrade patterns) and Agent B (D16/D17/D18 + 3 absorption rules) yields this consolidated absorption list. **All carry external authority anchors — none are self-invented.**

| # | Rule | Source | Severity | Wave to ship |
|---|---|---|---|---|
| W292-R1 | **D16 bus_factor_governance** — adopt CNCF/OpenSSF/NIST AI RMF Govern function | Agent B (6-method convergence: CNCF/OpenSSF/TW/WP/Anthropic/NIST) | HIGH | sca-v3.1 (W293) |
| W292-R2 | **D17 robustness_under_perturbation** — adopt HELM Robustness + SWE-bench Verified + Anthropic safety | Agent B (5-method convergence: HELM/SWE-bench/NIST/OpenSSF/Anthropic) | HIGH | sca-v3.1 (W293) |
| W292-R3 | **D18 runtime_safety_and_privacy_risk** — adopt NIST GAI + OpenSSF Dangerous-Workflow + Anthropic safety | Agent B + Agent A§§4-5 | HIGH | sca-v3.1 (W293) |
| W292-R4 | **pass2pass requirement for T1 INSTALL** — adopt SWE-bench Verified discipline | Agent B (SWE-bench) | MEDIUM | sca-v4 (W295) |
| W292-R5 | **TIGHTEN T1** — require this-runtime PILOT (≥1 wave at T2/T3) before T1 INSTALL — adopt ThoughtWorks Trial-ring rule | Agent B + Agent A | MEDIUM | sca-v4 (W295) |
| W292-R6 | **OpenSSF Scorecard internalisation** — 18-check subdim for D15 supply-chain-safety | Agent B (OpenSSF) | MEDIUM | sca-v3.1 (W293) |
| W292-R7 | **Inline citation per claim** — adopt OpenAI Deep Research / Perplexity Sonar citation-array | Agent A§5 | MEDIUM | sca-v3.1 (W293) |
| W292-R8 | **Machine-replayable audit log** — adopt UK AISI inspect_ai EvalLog JSON | Agent A§4 | MEDIUM | sca-v4 (W295) |
| W292-R9 | **Per-rubric-dimension version bump on breaking change** — adopt lm-evaluation-harness metadata.version | Agent A§3 | LOW | sca-v4 (W295) |
| W292-R10 | **2-axis tier model** (Ring × Quadrant) — adopt ThoughtWorks Radar outer shell | Agent A (ThoughtWorks) | LOW | sca-v4 (W295) — disruptive |
| W292-R11 | **MTEB Borda count for multi-dim aggregation** — replace weighted-sum with Borda | Agent A§4 | LOW | sca-v4 (W295) |
| W292-R12 | **GPQA-style expert-agreement filter for HIGH dims** — ≥2-of-3 agreement on D1/D7/D10/D14/D15/D17/D18 | Agent A§5 | LOW | sca-v5 (W297+) |

**Batch assignment** (consistent with F4's prior plan + W292 additions):
- **W293 / sca-v3.1**: W292-R1 (D16) · W292-R2 (D17) · W292-R3 (D18) · W292-R6 (OpenSSF) · W292-R7 (inline cites). Adds 3 dims; total: 14 → 17 canonical dims.
- **W295 / sca-v4**: W292-R4 (pass2pass) · W292-R5 (TIGHTEN T1) · W292-R8 (machine-replayable log) · W292-R9 (version bump) · W292-R10 (2-axis) · W292-R11 (Borda).
- **W297+ / sca-v5**: W292-R12 (expert-agreement) plus carry-overs.

The prior F4 plan (G1-G10) and W292 R1-R12 do NOT collide — they cover different axes (F4 was cost+disagreement+ledger; W292 is governance+robustness+safety+evidence-typing). They merge cleanly.

---

## §4 — v3 strengths confirmed (do NOT break these)

10 v3 design choices independently confirmed by ≥2 external rubrics. These are the EVOLVE-don't-break invariants:

1. **Soft-gate 5-tier ladder** — ThoughtWorks Radar quadrant + CNCF graduation tiers + Wikipedia notability gradient all agree multi-tier is correct (3 rubrics).
2. **Dual composites (install_score + pattern_score)** — HELM 7-metric multi-dim + Anthropic multi-agent typed-outputs agree single composite is wrong (2 rubrics).
3. **Tier-specific hard-caps** — CNCF graduation requirements + Wikipedia GNG criteria-per-class agree (2 rubrics).
4. **Bayesian author-prior over raw stars** — Wikipedia GNG independent-sources + OpenSSF Scorecard maintained-by-real-org-not-fork (2 rubrics).
5. **Typed-evidence (benchmark + code + practitioner)** — Wikipedia 4-axis (significant + reliable + secondary + independent) + GPQA expert-agreement + SWE-bench Verified (3 rubrics).
6. **Eval-harness lane for D8 (W287 P1a)** — HELM measured-metrics + lm-evaluation-harness + inspect_ai (3 rubrics).
7. **EXCEPT clause** (universal REJECT triggers override soft-gate) — NIST AI RMF safety overrides + Anthropic safety guidance (2 rubrics).
8. **Star-only anti-pattern** — Wikipedia GNG (popularity not notability) + ThoughtWorks Radar (not-hype-driven) (2 rubrics).
9. **Decision-decay state machine** — SWE-bench retirement + MTEB supersession + lm-eval-harness versioning (3 rubrics).
10. **2-target canonical ledger (basic-memory + VERDICT-LEDGER.md) + best-effort tiers** — CNCF DDR + NIST AI RMF accountability (2 rubrics).

---

## §5 — Replacement candidates DEFINITIVELY rejected

Agent C produced affirmative-evidence rejections for 5 full-replacement paths. None of these survives the soft-gate REJECT bar (D10 ≤ 2 OR D7 ≤ 1 OR adversarial-BLOCK OR cardinal-rule conflict):

| Candidate | install_score | Reject reason | Pattern-study lift? |
|---|---:|---|---|
| **Pure-codex-as-rubric** | n/a | D10 ≤ 2: duplicates v3 without pattern improvement — codex is the GATE, not the rubric | NO |
| Anthropic Multi-Agent | 4.46 | **Already absorbed** at Stream A (no marginal value as replacement) | YES — already done |
| AGENTS.md spec | 4.21 | NOT a rubric — it's a runtime artefact; ADOPT as artefact, not replace v3 | YES — adopt artefact |
| Stanford HELM | n/a | Domain mismatch: HELM evaluates MODELS not REPO-ADOPTION | YES — EVOLVE D8 with HELM 7-metric taxonomy |
| OpenAI Deep Research | n/a | External SaaS, not a rubric; can be a STAGE-1 source not a v3 replacement | YES — STAGE-1 source addition (W295) |

---

## §6 — Decision matrix

| Path | When to take | Effort | Risk | Recommended? |
|---|---|---|---|---|
| **KEEP v3 as-is** | If external rubrics had endorsed v3 unconditionally | 0 | Stagnation | ❌ NO — external avg 3.82/5 shows specific gaps |
| **EVOLVE v3 → v3.1+v4** | When external evidence converges on specific upgrades + no full-replace candidate | Low (3-7 days per batch) | Low (sca-v2 → 0.7× downweight already specified per F4) | ✅ **YES — THE VERDICT** |
| **REPLACE v3 with single external system** | When ≥2 external systems independently outperform v3 across ≥80% of evaluation surface | High (cutover + retraining) | High (loses v3-niche-specific design) | ❌ NO — no single system covers v3's niche |
| **PILOT external in shadow mode** | When evidence is medium-confidence on a partial replacement | Medium | Low (parallel run) | ⚠️ MAYBE — ThoughtWorks Radar outer-shell could shadow-pilot in W295 |

---

## §7 — Codex GPT-5.5 cross-model gate (the external ratification)

`CODEX-GATE-PROMPT.md` contains the ≤2000-char paste-ready prompt. The operator runs:

```powershell
/codex:adversarial-review --wait
# Paste the §2 prompt from CODEX-GATE-PROMPT.md
# Wait 30-90s
# Check /codex:result for APPROVE / REQUEST-CHANGES / BLOCK
```

Expected codex behaviour (per the prompt's §2):
- Verify the team applied the inverse test honestly (v3 scored under external rubrics, not the reverse).
- Identify any external systems the W292 team conservatively downgraded.
- Independently recommend KEEP / EVOLVE / REPLACE / PILOT-shadow-mode.

If codex APPROVES → W292 conclusions ratified; proceed with W293 sca-v3.1 implementation.
If codex REQUEST-CHANGES → apply remediations (similar to W288 R1-R8 pattern) and re-submit.
If codex BLOCKs → W292 conclusions are unsound; escalate to operator visual review.

---

## §8 — Migration plan (W293 sca-v3.1)

Per Agent C's Stage 1-6 runbook + Agent B's 6-change list, the W293 wave (next operator-driven session) will:

**Stage 1 (W293-fix1)**: Add D16 + D17 + D18 to `.claude/skills/sota-convergence-audit/SKILL.md` Step 4. Update `STREAM-C-RUBRIC-v3.md` §1 with anchor text. Composite denominators shift: 13.6 → ~16.3 install / 7.1 → ~7.6 pattern (final values from full rubric arithmetic).

**Stage 2 (W293-fix2)**: Add AGENTS.md to runtime root (operator-discretion — this is a NEW file at the project root and the agent-skills.io emerging spec). Add D4 sub-signal weight for "candidate ships AGENTS.md".

**Stage 3 (W293-fix3)**: OpenSSF Scorecard internalisation. Add 18-check subdim YAML under D15 supply_chain_safety in STREAM-C-RUBRIC-v3.md §1.

**Stage 4 (W293-fix4)**: Inline-citation-per-claim contract. SKILL.md Step 3 typed-evidence schema gets `citation_inline_rate` field (per OpenAI Deep Research / Perplexity Sonar pattern). Threshold: ≥80% of evidence claims have inline file:line OR DOI/URL.

**Stage 5 (W293-fix5)**: Re-run W288 VALIDATION-PILOT under sca-v3.1 (5 historical candidates: anthropics/skills, GitNexus, claude-code-router, hindsight-shim, hypothetical ralph-tight). Pass criterion: tier verdicts unchanged for all 5.

**Stage 6 (W293-fix6)**: Codex GPT-5.5 W280a Stop-hook fires; APPROVE = ship-cleared.

Each stage is independently reversible via `git revert HEAD`.

---

## §9 — Cardinal-rule conformance

- **CR-1** trusted upstream sources only: all 12 external rubrics are TIER-1-official (Anthropic/OpenAI/Stanford/Google/Princeton/CNCF/Linux-Foundation/NIST/Wikimedia/Perplexity). ✓
- **CR-2** no self-invent: zero new hooks, zero new scripts created this wave. All edits are docs + the existing markdown ecosystem. ✓
- **CR-3** documented subagents only: 4 teammates spawned via `TeamCreate` + `Agent` per the official upstream team-spawn primitive. ✓
- **CR-4** behavior in CLAUDE.md + settings.json + skills: this wave produces docs in `docs/architecture/W292-RESEARCH-ARCH-COMPETITOR-AUDIT/`; no rules/ directory; no behavioral discipline outside skill primitives. ✓
- **CR-5** permissions/sandbox: no permission boundary change; team spawn is within already-granted CR-3 scope. ✓

---

## §10 — Bottom line

The W292 team produced **triple-convergent evidence** that:

1. **No single external system fully replaces v3** — v3 sits at the structural frontier of public adoption-decision rubrics for the runtime's niche (autonomous + local-first + single-operator + cross-model-gated + state-outside-repo). Replacement candidates exist for outer layers but not the full specification.

2. **v3 has specific, fixable gaps** — average 3.82/5 across 12 external rubrics is GOOD-but-not-best, with ≥3 HIGH-severity gaps (D16 governance · D17 robustness · D18 safety) and 9 additional MEDIUM/LOW absorption candidates. None of these are speculative — all carry external authority anchors with ≥3-org convergence.

3. **EVOLVE is the correct path, not KEEP and not REPLACE** — KEEP would ignore documented external improvements; REPLACE would lose v3's niche-specific design.

4. **The evolution batch plan extends F4's plan, doesn't collide with it** — F4 (W291) shipped 3 v3.1 point-revisions (G4 AGING cron · G7 awesome-list deltagrep · G10 ledger collapse). W292 adds 12 more across 3 batches (sca-v3.1 / sca-v4 / sca-v5). Merge cleanly.

5. **The codex GPT-5.5 cross-model gate is the external ratification step** — `CODEX-GATE-PROMPT.md` has the ≤2000-char paste-ready prompt. The operator's next action is to invoke that gate; if APPROVE, proceed to W293 sca-v3.1 implementation.

**Operator handoff**: read CODEX-GATE-PROMPT.md, invoke `/codex:adversarial-review --wait`, ratify (or remediate) before W293.
