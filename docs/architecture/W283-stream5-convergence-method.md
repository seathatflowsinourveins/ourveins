# W283 Stream 5 — Audit of the CONVERGENCE-METHOD Itself

**Date**: 2026-05-17
**Stream**: 5 of W283 deep audit
**Premise**: Research-architecture quality bounds architecture-evolution quality. The runtime's adoption-decision gate determines what becomes harness DNA.
**Evidence base**: `langfuse_langfuse-docs.xml` (75 hits on rubric/Cohen/inter-rater); `Shubhamsaboo_awesome-llm-apps.xml` (52 hits); current skill SKILL.md files; W259/W272/W280 verdict logs.

---

## Current convergence rule (formal restatement)

Extracted verbatim from `Z:/claude-sota-installed/.claude/skills/sota-convergence-audit/SKILL.md` and `goal-prompt-synthesis/SKILL.md`:

> **Discover** ≥4 independent source families (official docs, GitHub, DeepWiki, web, awesome-list, Repomix pack) → **Verify** harness-fit (autonomous-loop compatible, Claude-Code-native, no duplicate of installed plugin, no self-invented hook, Windows-portable) → **Converge** ≥3 organizationally-distinct sources corroborate the claim AND stable ≥3 months OR strong-org provenance → **Decide** ADOPT / STUDY / REJECT, with a cross-model (codex) review pass before ship.

Encoded predicate:

```
ADOPT(X) ⟺
  |discover_families(X)| ≥ 4
  ∧ harness_fit(X) = true
  ∧ |distinct_orgs_corroborating(X)| ≥ 3
  ∧ (age_months(X) ≥ 3 ∨ official_org_maintained(X))
  ∧ codex_review(X).verdict ≠ BLOCK
```

**What the rule does well**: blocks single-source / single-org adoption; forces harness-fit (autonomous-loop, Windows, cardinal-rule-2); mandates a cross-model adversary; anti-patterns explicitly call out manufactured convergence and sibling-copy installs.

**What the rule omits** (the gaps Stream 5 audits): no rubric-anchored scoring; no source-tier weighting; no required-evidence-type diversification; no benchmark/numbers requirement; no decision-decay; no false-positive recovery mechanism.

---

## Weaknesses vs eval-org gold standards

Cross-referenced against langfuse-docs (gold standard for LLM-as-judge evaluation, lines 65801-76200) and Phoenix/openinference patterns.

### W1. No rubric — verdicts are categorical, not anchored

**Gold standard** (langfuse-docs:71596-71610): LLM-as-judge evaluation REQUIRES "a rubric defining what 'good' looks like (e.g., Score 1 if the answer is factually incorrect, 5 if fully accurate and well-sourced)" — fixed rubric is what makes scoring "repeatable" and "human-like". Strong judges achieve 80-90% human agreement *only with well-designed rubrics*.

**Current runtime**: convergence verdict is a 3-way categorical (ADOPT/STUDY/REJECT) with no anchored scale. Two auditors running the SAME candidate through the SAME 4-step process can reach different verdicts and there is no rubric to arbitrate. The W280h adoption verdict ("zero installs of 7 candidates") is a one-line categorical with no scored axes — defensible but unrepeatable.

**Severity**: HIGH. Without a rubric, "harness-fit" is subjective; without subjectivity-anchoring, convergence-quality varies wave-over-wave.

### W2. No inter-rater agreement check — single-judge convergence

**Gold standard** (langfuse-docs:65801, 76037-76200): Phoenix/langfuse explicitly statistically validate AI-judge agreement vs human annotators via **Cohen's Kappa (κ ≥ 0.8 = "Almost Perfect")**, Pearson correlation, F1. The eval pipeline treats single-judge output as un-validated until inter-rater agreement is measured.

**Current runtime**: the cross-model pass is ONE additional judge (codex GPT-5.x). Two judges are not statistically robust — Cohen's Kappa requires *consistent agreement on labeled corpus*, not one-shot consensus. The runtime has NO mechanism to compute κ between its own historical verdicts and ground-truth outcomes (which adoptions actually worked vs which were rejected later).

**Severity**: HIGH. Two-judge consensus is the minimum, but the runtime never re-measures whether the two judges actually agree statistically over time. Pairs of judges from the same family (Claude + Codex are both transformer-LM auto-regressive) may be correlated more than they look.

### W3. Sources are organizationally distinct but evidentially homogeneous

**Gold standard** (langfuse-docs:44063, 102362): production eval pipelines require **dataset of inputs + expected outputs (gold standard)** AND **benchmark experiments** AND **production traces** — three different *evidence types*, not three different orgs publishing the same blog-post pattern.

**Current runtime**: "≥3 organizationally-distinct sources" can be satisfied by `official docs + named practitioner blog + awesome-list inclusion` — all three are **secondary text claims**. None of them is a **benchmark with numbers**, a **code reading** of the candidate's source for actual capability, or a **practitioner field report** of running the candidate in production. Three orgs echoing the same README-claim is "three sources" but is evidentially singular.

**Severity**: HIGH. Three text-claim sources don't beat ONE benchmark with measured deltas. The W259 catalog (99 repos × 23 dims) is a perfect example: dimension scoring drew from doc-claims, not from benchmark replays.

### W4. No source-tier weighting (Bayesian / authority prior)

**Gold standard implicit**: openinference, OpenTelemetry, langfuse author tier matters — a claim in Anthropic's official docs has higher prior probability of truth than a claim in a 7-day-old GitHub repo. Bayesian convergence weights sources by author-prior × evidence-strength.

**Current runtime**: "≥3 organizationally-distinct" treats Anthropic-official-docs and "anonymous-author awesome-list inclusion" as equal. They are not equal. A single Anthropic-canonical doc citation should outweigh five random GitHub awesome-list inclusions.

**Severity**: MEDIUM. Weighting fixes the "noise floor" problem — without it, popular-but-wrong patterns can collect 3 organizationally-distinct popular-amplifications and qualify for ADOPT.

### W5. No benchmark-or-numbers requirement

**Gold standard** (langfuse-docs:102362): "gold standard dataset of inputs and their expected outputs ... This benchmark allows you to run experiments, prevent regressions, and confidently iterate". Published benchmarks ARE the convergence evidence for serious SOTA claims (HumanEval, SWE-bench, etc.).

**Current runtime**: SOTA convergence does NOT require a published benchmark number. The W259 99-repo catalog scores dimensions on doc-claim basis, not benchmark basis. "X is SOTA at retrieval" can pass current convergence without ever showing a Recall@10 or MRR number.

**Severity**: HIGH. This is the difference between "people say X is SOTA" and "X has measurable SOTA numbers vs prior art".

### W6. No decision-decay / re-litigation policy — false positives are permanent

**Gold standard implicit** (langfuse experiments, Phoenix datasets): production eval pipelines re-run benchmarks against new model versions and new candidates regularly — decisions are **time-bounded**. Phoenix datasets explicitly version expected outputs so old gold-standards can be retired.

**Current runtime**: the W259 catalog stores `decision = ADOPT X` permanently. The 6-tier memory (hindsight + memory-MCP + graphiti + cognee) PRESERVES the ADOPT verdict as a fact-edge with no expiry. When X turns out wrong (the candidate stagnates, the SOTA shifts, a successor lands), the stale ADOPT verdict still flows into future convergence as a corroborating source — *self-reinforcing false positive*.

**Severity**: CRITICAL. This is the single most dangerous failure mode in the current rule. A wrong-ADOPT decision laundered through 6-tier memory becomes harness DNA, indistinguishable from a correct decision.

### W7. No false-positive recovery (post-hoc audit loop)

**Gold standard** (langfuse-docs:76079-76200): inter-rater agreement is computed *after* both AI and human have scored, and disagreements trigger rubric refinement. The eval system improves itself via *measured disagreement*.

**Current runtime**: there is no `audit-post-adoption(X, wave_n)` step that re-checks whether the original convergence held up. W280h rejected 7 candidates but never re-litigated the ~42 plugins ALREADY installed via prior-wave ADOPT decisions. We don't know how many of the 42 would survive today's gate.

**Severity**: HIGH.

### W8. Same-tier source collapse risk

**Gold standard** (langfuse-docs:65838, 71991): "Human-AI Annotation Agreement: Check if your AI evaluations match human annotations" — eval rigor requires *diverse evidence types*, not just diverse-source-but-same-type evidence.

**Current runtime**: 3 "organizationally-distinct" sources can ALL be README-style text claims from 3 different GitHub orgs, all echoing one initial author. Without a typed-evidence requirement (≥1 benchmark + ≥1 code reading + ≥1 practitioner report), 3-source convergence can collapse to 3-text-claim convergence.

**Severity**: HIGH. Subsumed by W3 but worth naming separately because the FIX is different: W3's fix is "require benchmark"; W8's fix is "require evidence-type-diversification".

---

## Concrete evolution — tighter rule (rubric + dimensions + min counts)

### Proposed v2 convergence rule

```
ADOPT(X) ⟺
  -- Tier 1: discovery breadth (unchanged)
  |discover_families(X)| ≥ 4

  -- Tier 2: harness-fit (unchanged)
  ∧ harness_fit_score(X) ≥ 4/5  -- scored, not boolean (see rubric)

  -- Tier 3: typed evidence diversification (NEW)
  ∧ |evidence(X) ∩ type=BENCHMARK_WITH_NUMBERS| ≥ 1
  ∧ |evidence(X) ∩ type=CODE_READING| ≥ 1
  ∧ |evidence(X) ∩ type=PRACTITIONER_FIELD_REPORT| ≥ 1
  -- the three above MUST be from organizationally-distinct authors

  -- Tier 4: weighted source authority (NEW)
  ∧ weighted_convergence_score(X) ≥ 0.7
     where weight(source) = author_tier_prior × recency_decay × evidence_type_multiplier
     -- official_org=1.0, named_practitioner=0.6, anonymous_awesome_list=0.2
     -- recency_decay = 0.5^(months_since_publish/12)
     -- evidence_type_multiplier: benchmark=1.5, code_reading=1.2, blog=0.8, README=0.5

  -- Tier 5: cross-model inter-rater agreement (NEW — strengthens existing codex pass)
  ∧ codex_review(X).verdict ≠ BLOCK
  ∧ inter_rater_kappa(claude_verdict, codex_verdict, last_N_decisions) ≥ 0.7
     -- κ computed over rolling window of prior ADOPT/STUDY/REJECT decisions
     -- if κ drops below 0.7, BOTH judges are suspect — escalate to human

  -- Tier 6: decision-decay + re-litigation (NEW)
  ∧ decision_age_waves(X) ≤ 6  -- ADOPT auto-re-litigates after 6 waves (~6 weeks at current cadence)
     -- and stale ADOPT verdicts are demoted from "corroborating source" to "historical context"
     -- when re-evaluating new candidates

  -- Tier 7: rubric-anchored verdict (NEW — replaces 3-way categorical)
  ∧ rubric_score(X) ≥ 4/5  -- anchored scale (see Rubric R1 below)
```

### Rubric R1 — anchored scoring (5-point scale per dimension)

Each dimension scored 1-5 with an anchor; "ADOPT" requires ≥4 on EVERY dimension:

| Dimension | 1 (REJECT) | 3 (STUDY) | 5 (ADOPT) |
|---|---|---|---|
| **D1. Capability uniqueness** | Duplicates installed primitive | Partial overlap, marginal lift | Net-new capability not exposed by any installed plugin |
| **D2. Harness-fit** | Requires self-invented hook OR breaks autonomous-loop | Works in autonomous-loop but assumes interactive operator in some flows | Native autonomous-loop primitive, no self-invent, Windows-portable, Anthropic-canonical |
| **D3. Source diversity (typed)** | Only README/blog claims | ≥2 typed-distinct sources but no benchmark | ≥1 benchmark with numbers + ≥1 code reading + ≥1 field report, all distinct orgs |
| **D4. Authority weighted** | Anonymous / single-author | Named practitioner + awesome-list | Anthropic-official OR ≥2 named-practitioner-with-track-record + benchmark |
| **D5. Recency** | Last commit >12 months | 3-12 months, no recent releases | <3 months OR active release cadence (≥1 release/quarter) |
| **D6. Benchmark deltas** | No published numbers | Numbers exist but not vs incumbent | Published numbers showing measurable lift over current SOTA / incumbent |
| **D7. Failure-mode disclosure** | Candidate hides failure modes | Some limitations documented | Explicit failure-mode catalog + recovery patterns documented |

### Rubric R2 — verdict-from-scores

```
score_min   = min(D1..D7)
score_mean  = mean(D1..D7)

ADOPT  if score_min ≥ 4 AND score_mean ≥ 4.3
STUDY  if score_min ≥ 3 AND score_mean ≥ 3.5  -- extract pattern, do not install
REJECT otherwise
```

### Inter-rater agreement loop (operational)

Every wave, compute Cohen's Kappa between Claude-orchestrator verdicts and codex-reviewer verdicts over the last N=20 decisions:

```
κ ≥ 0.8 → "Almost Perfect" — judges aligned, current rubric working
κ 0.6-0.8 → "Substantial" — acceptable but flag for rubric refinement
κ < 0.6 → BLOCK adoptions until disagreement audited
```

Store κ alongside each verdict; treat sustained κ-drop as a signal that the rubric needs revision, not that the candidate failed.

### Decision-decay schedule

```
ADOPT(X, wave=N) status:
  wave N..N+6:   ACTIVE — counts as corroborating source for new ADOPT decisions
  wave N+6..N+12: AGING — flagged for re-litigation, downweighted to 0.5 as corroborator
  wave N+12+:    STALE — does NOT corroborate new ADOPTs until re-litigated and refreshed
```

Re-litigation = run X through the full v2 rule again with current evidence; if it fails, demote installed plugins to "tolerated until replaced" and start an active replacement search.

### Stronger gate proposals — adopted from the prompt

1. **A/B replay** — accepted as part of W7 fix. Replay last N=10 ADOPT decisions through the v2 rule; any that fail v2 are flagged for re-litigation. Implementation: a `tools/replay-convergence.ps1` script that re-runs the audit on existing installed plugins.

2. **Adversarial diversification** — accepted as Tier 3. Three sources MUST span three evidence types (benchmark / code / field report). Implementation: convergence-audit skill template adds an evidence-type-checklist that an audit cannot ship without ticking all three boxes.

3. **Decision-decay** — accepted as Tier 6. 6-wave half-life, 12-wave staleness.

---

## Migration risk — re-litigating past decisions

### What changes if v2 lands

The runtime has ~42 installed plugins (W259-v15 state) + numerous skill/pattern adoption decisions in `docs/architecture/W259-grand-catalog/`. Migration risk has two faces:

### R1. False-positive purge — installed plugins that fail v2

**Risk**: re-running v2 against the 42 installed plugins likely flags a non-trivial subset as STUDY-not-ADOPT (most likely failures: D3 typed-evidence, D6 benchmark deltas). Demoting them to "tolerated until replaced" is the right call but creates a backlog.

**Mitigation**: phased re-litigation. Run v2 in *audit-only* mode for 2 waves before letting it gate installs. Flag failures, don't uninstall. Operator chooses uninstall pace.

**Severity**: MEDIUM. The 42 plugins are already living in the runtime; demoting them doesn't break anything immediately, just changes how they corroborate future ADOPTs.

### R2. Memory-tier contamination

**Risk**: the 6-tier memory (hindsight + memory-MCP + graphiti + cognee) has indexed the W259 catalog and W272/W280 verdicts as facts. v2 rule needs to differentiate "ADOPT verdict from old rule" vs "ADOPT verdict from v2 rule" — otherwise old verdicts continue corroborating new decisions at full weight.

**Mitigation**: tag every stored verdict with `rule_version: v1` or `v2`; v2-convergence calculations only count v2-verdict edges at full weight. v1 verdicts downweighted to 0.5 until re-litigated. graphiti's temporal-KG model already supports this via fact-edge invalidation — use it.

**Severity**: HIGH. Without this, v2 inherits all of v1's false positives.

### R3. Backward-compatibility break for `goal-prompt-synthesis`

**Risk**: `goal-prompt-synthesis/SKILL.md` references the same convergence rule. Upgrading sota-convergence-audit to v2 without upgrading goal-prompt-synthesis creates a mismatched gate — `/goal` prompts surface candidates that pass the old rule, audit rejects them under v2, operator wastes cycles.

**Mitigation**: ship the v2 rule simultaneously in BOTH skills. The skill update should be a single PR that touches:
- `Z:/claude-sota-installed/.claude/skills/sota-convergence-audit/SKILL.md`
- `Z:/claude-sota-installed/.claude/skills/goal-prompt-synthesis/SKILL.md`
- Add a `Z:/claude-sota-installed/.claude/skills/sota-convergence-audit/references/rubric-v2.md` with the full anchored rubric

**Severity**: MEDIUM.

### R4. codex review-gate load

**Risk**: the new inter-rater-κ Tier 5 requires storing every adopt-decision verdict pair (Claude + codex) over a rolling window and computing κ. Implementation needs state-storage (a JSONL log of verdict-pairs) and a small computation function.

**Mitigation**: store in `Z:/claude-sota-installed-state/convergence-history.jsonl` (state-outside-repo per W272 convention). κ-computation is ~15 lines of Python; can run in a hook or on-demand. Don't over-engineer.

**Severity**: LOW.

### R5. Operator-facing UX

**Risk**: v2 rule is heavier — `/team-spawn convergence-audit` will take longer to return a verdict because it has to gather typed evidence and run more checks.

**Mitigation**: the additional work is mostly gathering benchmark numbers + reading code, which are valuable regardless. Cost is justified by lower false-positive rate. Cap audit duration at ~15 min wall-clock; if it can't gather typed evidence in 15 min, return STUDY-not-ADOPT (failure-to-find-evidence is itself evidence the candidate isn't ready).

**Severity**: LOW.

### Migration recommendation

Ship v2 in 3 waves:
1. **Wave A (audit-only)**: implement v2 rubric in skill files; run against installed-plugin set; produce a flagged-list report. No uninstalls, no gating changes.
2. **Wave B (gate new ADOPTs)**: v2 rule gates NEW adoption decisions only. Old verdicts continue at v1 weight in memory. New verdicts tagged `rule_version=v2`.
3. **Wave C (purge stale)**: enable decision-decay; old verdicts begin aging out; flagged-list from Wave A drives proactive replacement searches.

---

## Summary table — eval-org gold standard vs runtime current

| Eval-org primitive | Runtime current | v2 proposal |
|---|---|---|
| Anchored rubric (langfuse-docs:71596) | Categorical 3-way | 7-dimension 5-point rubric (R1) |
| Cohen's Kappa (langfuse-docs:76200) | Two judges, no κ | Rolling κ over last 20 decisions, BLOCK if κ<0.6 |
| Gold-standard dataset (langfuse-docs:102362) | No labeled corpus | A/B replay corpus of prior ADOPT decisions |
| Typed evidence diversity | "Organizationally distinct" | Benchmark + code-reading + field-report (Tier 3) |
| Authority weighting | Equal weight per source | Bayesian author-tier × recency × evidence-type (Tier 4) |
| Decision versioning | Permanent fact-edges | 6-wave half-life, 12-wave staleness (Tier 6) |
| Post-hoc disagreement audit | None | κ-drop triggers rubric revision |

---

## Open questions for future audits

- **Q1**: What's the actual κ between Claude and codex on the W272/W280 decisions? Run a retro-audit and compute. If κ is already ≥0.8, Tier 5 is cheap. If κ is ≤0.5, the cross-model pass has been theatrical and v2 is overdue.
- **Q2**: Of the 42 installed plugins, how many have published benchmark numbers showing lift over prior art? If <50%, D6 in R1 is too strict and needs softening to "benchmark OR demonstrated production-scale usage report".
- **Q3**: Does the runtime have a labeled corpus of "ADOPTs that worked vs didn't"? Without that ground truth, κ becomes "two-judge agreement on opinion", not "agreement-with-truth". Recommend manually labeling W259-era verdicts as the v1 ground-truth corpus.
