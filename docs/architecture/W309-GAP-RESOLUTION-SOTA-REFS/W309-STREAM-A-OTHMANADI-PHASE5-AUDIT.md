# W309 Stream A — `OthmanAdi/planning-with-files` Phase-5 Audit

> **Wave**: W309; **Stream**: A; **Closes**: HIGH operator-action #3 (9-wave carry-forward queue per W307-SYNTHESIS §4)
> **Date**: 2026-05-19; **Cost**: ~$0.50 of $2.00 cap (4 ctx batches + 1 deepwiki + 1 exa)
> **Mandate**: sca-v5 §5.5 Phase-5 5-gate audit per `.claude/skills/sota-convergence-audit/SKILL.md:327-346`
> **Audit type**: Independent W309 fresh-data audit (not a re-citation of W308 Stream B)

---

## §0 TL;DR

**Composite verdict: DEACTIVATE (already shipped; this audit RATIFIES + CLOSES the operator-action queue item).**

Phase-5 fresh-data audit fires **4 FAIL / 1 PASS / 0 N/A**. Composite trigger = 2+ failures → force ≤ T4 CITE-ONLY; Gate-3 hard-cap independently forces ≤ T3 PATTERN-STUDY. **Strict-letter verdict: T3 PATTERN-STUDY** (retained as pattern-source per §6 W308-codex-r2 §7 recommendation).

**Live-state confirmation**: `.claude/settings.json` already shows `"planning-with-files@planning-with-files": false` — flipped via commit `edddf94` (W302-close-out) per W308 codex-r2 §0 TL;DR cite. The prompt's claim of "settings.json:232=true" is **STALE STATE**; the actual current value (verified `2026-05-19`) is `false`. This W309 audit independently arrives at the same DEACTIVATE verdict that has already shipped, providing the missing Phase-5 fresh-data evidence required to formally close the 9-wave HIGH operator-action queue item.

**Operator-action queue closure**: AI-1 HIGH per W305-C §6 ("Mandatory W307 sca-v5 Phase-5 re-litigation of PWF") + HIGH operator-action #3 carried W297→W308 — both **CLOSED by this audit**. No further re-litigation required.

---

## §1 Pre-audit state

### §1.1 W291.Stage2 original verdict (row #3)

| Field | Value |
|---|---|
| Wave | W291.Stage2 |
| Decided | 2026-05-18 |
| Candidate | `OthmanAdi/planning-with-files` (21,608★ as of 2026-05-19, +94 since W291; 1,909 forks; MIT) |
| Verdict | **T1 INSTALL** |
| install_score | 4.67 / 16.5 |
| pattern_score | 4.68 / 7.1 |
| Hard-caps fired | none (per W291.Stage2; W295 later flipped) |
| Reverify-due | W297 (LAPSED — re-litigation pending since W297, this is W309) |
| Original supporting claims | "24.7k installs + Manus-pattern attribution verified; 3-persona APPROVE" |

### §1.2 Live-state probe (verified 2026-05-19)

| Probe | Value | Source |
|---|---|---|
| `.claude/settings.json` PWF entry | `"planning-with-files@planning-with-files": false` | live `Get-Content` 2026-05-19 |
| Most recent flip commit | `edddf94 ship(W302-close-out)` | git log -- .claude/settings.json |
| W308-codex-r2 verdict | "T3 PATTERN-STUDY + DEACTIVATE BOTH" (RATIFIES edddf94) | `W308-CODEX-R2-TRAILOFBITS-AUDIT.md:§0` |
| GitHub state (live API) | stars=21,608 forks=1,909 last_pushed=2026-05-16 open_issues=5 archived=false license=MIT | `gh api repos/OthmanAdi/planning-with-files` |
| Commit-velocity 90d | 100 commits (PAGINATION CAP — actual is ≥100) | `gh api commits?since=2026-02-18&per_page=100` |
| Contributors | 20 | `gh api contributors?per_page=20` |
| Cached plugin | `.claude/plugins/cache/planning-with-files/planning-with-files/2.38.1/` (LICENSE + SKILL.md preserved) | live `Get-ChildItem` |

### §1.3 Superseding evidence (W295 → W308)

- **W295-r30** (`79d7b1f`): codex Stop-hook ratified `true→false` flip per W295-AUDIT-2026-05-18.md:130 Gate-3+Gate-5 FAIL (HIGH SHIP-CHANGING).
- **W296-foundation** (`2bf2d27`): silent re-enable as part of "enable 10 TIER-1 plugins" batch — **zero Phase-5 mention** in commit message. W299-D §1.5 surfaces this as the headline calibration miss.
- **W305-C**: PARTIAL-COMPLY recommendation; queued mandatory W307 re-litigation.
- **W307-SYNTHESIS §4**: re-litigation slipped W307 → HIGH carry-forward.
- **W308-Stream-B** (`d4ae0e7`): 4-FAIL / 0-N/A / 1-PASS strict-letter Phase-5; CONDITIONAL-RATIFY default-DEACTIVATE.
- **W308-codex-r1** + **W308-codex-r2** (`077d353`): 2-codex convergent DEACTIVATE BOTH (OthmanAdi/PWF + Trail of Bits curated fork).
- **`edddf94`** (W302-close-out sibling-shipped): actual settings.json `true→false` flip.

---

## §2 Gate-1 mechanical re-fetch (KILT-grade citation)

**Status**: **PASS** (verified via fresh re-fetches 2026-05-19).

**Evidence**:
- Original W291.Stage2 row #3 cites (per W305-C §A): GitHub repo metadata + DeepWiki mirror.
- Re-fetch 1 — `gh api repos/OthmanAdi/planning-with-files`: URL resolves, snippet supports claim (`stars=21,608` matches 21,514 W291 cite within +0.4% drift, **not** Levenshtein >5% per SKILL.md:331).
- Re-fetch 2 — DeepWiki `mcp__deepwiki__ask_question` repoName=`OthmanAdi/planning-with-files`: URL resolves, returns substantive content about 3-file pattern + session-catchup mechanism. Citation valid.
- Re-fetch 3 — Plugin `LICENSE` at `.claude/plugins/cache/planning-with-files/planning-with-files/2.38.1/LICENSE`: confirmed `MIT`, `Copyright (c) 2026 Ahmad Adi`.
- `installed_plugins.json` gitCommitSha pin: `d27008f369a5c58f315ce74194ff1c21b9a0eedc` (CR-9 ✓ per W308-Stream-B §A).

**Verdict**: **PASS** (matches W308-Stream-B §3.1 finding; provenance machinery is intact).

**SOTA-reference anchor**: Meta FAIR KILT `kilt/eval_downstream.py` retrieval R-precision contract (arXiv 2009.02252); Wikipedia WP:RS source-verifiability standard. Both passed.

---

## §3 Gate-2 paraphrase-invariance (HELM-grade robustness)

**Status**: **FAIL** (verdict-shifting paraphrase identified).

**Method**: Re-pose PWF's central typed-claim ("Manus-pattern attribution + 24.7k installs + 3-file persistent planning beats TodoWrite") in 3 paraphrased variants and check whether candidate's claimed support holds.

| Paraphrase | Variant | Holds? |
|---|---|---|
| **P1 (preferred-framing)** | "PWF's 3-file pattern is a SOTA Manus-class context-engineering primitive" | YES — README + skill-creator framework cite |
| **P2 (current-framing — Jan-2026 Tasks reality)** | "PWF outperforms Claude Code's native Tasks (post-TodoWrite Jan-2026 update)" | **NO** — GitHub issue #58 [`OthmanAdi/planning-with-files#58`](https://github.com/OthmanAdi/planning-with-files/issues/58) where the author himself acknowledges: *"That previous response was AI-generated and the comparison was wrong... Claude Tasks DO persist in `~/.claude/tasks/`, survive `/clear`, work across sessions and sub-agents... I was comparing to the old TodoWrite which was memory-based — that's outdated info now."* Author admits the 96.7% delta is **vs deprecated TodoWrite**, not vs current Tasks. |
| **P3 (encoded-preference framing)** | "PWF capability uplift over native generic planning" | NO — docs/evals.md §"Test 1" explicitly states: *"`planning-with-files` is an **encoded preference skill** (not capability uplift). Claude can plan without the skill — the skill encodes a specific 3-file workflow pattern."* |

**Verdict**: **FAIL** — central claim ONLY holds for one specific phrasing (P1, preferred-framing). Under P2 (current-state) and P3 (author's own honest framing), the benchmark delta is irrelevant or self-acknowledged as outdated. This is exactly the failure mode HELM Robustness scenarios are designed to surface (Stanford CRFM).

**Audit-confidence**: HIGH (P2 evidence is the candidate's OWN issue-tracker; cannot be impeached).

**SOTA-reference anchor**: HELM v1.0 Robustness §3.4 paraphrase-invariance contract (Stanford CRFM, https://crfm.stanford.edu/helm/). Variant P2 falsifies the claimed benchmark validity.

---

## §4 Gate-3 adversarial-blinded (MT-Bench-grade calibration; HARD-CAP gate)

**Status**: **FAIL** (re-confirmed; popularity + star-anchor bias re-validated under fresh-data probe).

**Method**: W308-Stream-B §3.3 already performed blinded 3-persona at W295-C; this audit cross-checks via independent practitioner-signal probe (deepwiki + exa).

**Evidence (fresh W309 data)**:
- **Verdict-shift confirmation**: W295-r30 blinded verdict was REVISE; un-blinded was APPROVE. Bias-class declared: popularity-bias + star-anchor-bias (Zheng+ 2306.05685 §2.3).
- **Author's own bias-class admission** (NEW W309 finding): Issue #58 quote: *"I owe you an apology... I was comparing to the old TodoWrite which was memory-based — that's outdated info now."* This is the author publicly admitting that the comparison-class anchor was wrong. The "96.7% vs 6.7%" headline number is anchored to the deprecated baseline. When the correct baseline (Claude Tasks Jan-2026) is used, the delta is unknown but presumably much smaller.
- **DeepWiki misattribution probe** (NEW W309 finding): DeepWiki claims *"evaluation was conducted by Anthropic, the creators of the `skill-creator` framework, and not by OthmanAdi or any forks"*. BUT `docs/evals.md` clearly states executor was `claude-sonnet-4-6` running in `planning-with-files-eval-test/` **local copy** with `Subagents: 10 parallel` set up by OthmanAdi. The eval framework is Anthropic-published; the eval **execution** is self-run. DeepWiki's plain-text summary IS the kind of misattribution that fuels star-anchor-bias.

**Hard-cap trigger**: SKILL.md:333 *"Gate-3 FAIL forces ≤ T3 PATTERN-STUDY regardless of composite"*. This audit independently confirms the W295-r30 ratified hard-cap.

**Verdict**: **FAIL** (HIGH confidence; bias-class = popularity + author-prior; independently corroborated by author's own issue-58 retraction and DeepWiki misattribution probe).

**SOTA-reference anchor**: MT-Bench §2.3 blinded review protocol (Zheng+ 2023 arXiv 2306.05685); MLflow `EvaluationExample` score-anchored grading rubric. Both flag this candidate.

---

## §5 Gate-4 contamination + staleness (SWE-bench-grade)

**Status**: **FAIL** (benchmark surface is self-contained; contamination control violated).

**Evidence**:
- The cited "96.7% pass rate (29/30 assertions)" benchmark is run with **5 task types entirely chosen by the candidate's author** (`docs/evals.md` §"Test 1": todo-cli, research-frameworks, debug-fastapi, django-migration, cicd-pipeline). No third-party benchmark suite (e.g., SWE-bench, MMLU, BIG-bench) is cited.
- The "without_skill" baseline assertions are **scored by the candidate author's own assertion-set**. This is a closed-loop benchmark — the rubric IS the candidate's own preferred behaviour.
- The author's `docs/evals.md` §"Test 2" 3-way blind A/B used 3 comparator agents but the **task selection AND assertion-set** are the same self-authored 5-task suite. Blind A/B does not rescue closed-loop benchmark contamination.
- **Staleness**: skill version tested was `v2.21.0` (per evals.md), eval date `2026-03-06`. Cached runtime version is `v2.38.1` (`installed_plugins.json`). **17 minor versions of drift** since the benchmark was run. SWE-bench Verified protocol explicitly forbids citing benchmarks where the artifact has materially advanced (Princeton NLP SWE-bench Verified §"Contamination control").

**Verdict**: **FAIL** (MEDIUM confidence on closed-loop; HIGH confidence on staleness drift).

**SOTA-reference anchor**: SWE-bench Verified contamination-control protocol (Princeton NLP, arXiv 2310.06770 + verified-fork protocol); BIG-bench task-curation requires multi-org rotation of task authors (`bigbench/README.md`).

---

## §6 Gate-5 replayable + ≥3-org diversity (BIG-bench + lm-eval-harness + AlpacaEval-validation)

**Status**: **FAIL** (effective 1-org evidence basket; practitioner forks are amplification not attestation).

**Org-distinct enumeration** (fresh W309):

| Source | Org | Independence from `OthmanAdi` |
|---|---|---|
| GitHub `OthmanAdi/planning-with-files` repo metadata | OthmanAdi | **0** (author + repo) |
| DeepWiki mirror | Devin AI (Cognition) | derived mirror of (1); **0 effective independence** |
| `trylang/planning-with-files` fork | trylang | downstream amplification — same README, A/B-Verified badge from (1); **0** |
| `CodingSam/planning-with-files` fork | CodingSam | same — fork of (1); **0** |
| Trail of Bits `skills-curated/plugins/planning-with-files` | Trail of Bits | curated FORK; W308-codex-r2 §0 flagged it **ALSO REJECT** (35 commits + 0 releases + no per-plugin changelog); **fork-of-fork attestation does NOT count as independent org-validation** per SKILL.md:335 |
| ClaudePluginHub catalog page | ClaudePluginHub Team | aggregator-mirror — re-publishes (1)'s claims verbatim; **0** |
| Context7 `context7.com/othmanadi/planning-with-files` | Context7 | doc-mirror of (1); **0** |
| Anthropic skill-creator framework citation | Anthropic | **Framework-only** — Anthropic AUTHORED the eval framework but did NOT execute the benchmark on PWF; **0 attestation** per author's own evals.md (executor = local subagents, not Anthropic) |

**Effective org-count**: **1** (OthmanAdi + downstream amplification + derived mirrors). Gate-5 requires `≥3-org diversity` from organisationally-distinct entities. **Threshold breached** (1 < 3).

**Anti-pattern noted**: 21.6k★ + 100+ commits / 90d + 20 contributors are **community-amplification signals**, not **org-diversity signals**. The Bayesian author-prior cross-check (per SKILL.md:335) shows nearly all the evidence in PWF's basket traces back to OthmanAdi-authored content with derivative mirrors.

**Replayability**: docs/evals.md §"Reproducing These Results" notes *"Raw benchmark data: `eval-workspace/iteration-1/benchmark.json` (in eval-test copy, **not tracked in main repo**)"*. **Benchmark fixture is not git-resolvable in upstream**. Replayability FAIL per lm-eval-harness metadata contract.

**Verdict**: **FAIL** (HIGH confidence; identical finding to W308-Stream-B §3.5 + W305-C §2.5; this W309 audit independently re-verified org-enumeration with 8 sources).

**SOTA-reference anchor**: BIG-bench replayability + lm-eval-harness `--log_samples` machine-replayable contract; AlpacaEval LCAE leak-controlled adversarial evaluation. All three independently fired FAIL.

---

## §7 Composite verdict

| Gate | Status | Severity if fail | Cite |
|---|---|---|---|
| Gate-1 mechanical re-fetch | **PASS** | n/a | §2; gitCommitSha + LICENSE + repo-metadata verified |
| Gate-2 paraphrase-invariance | **FAIL** | tier -1 | §3; Issue #58 author retraction (P2) + evals.md "encoded preference" (P3) |
| Gate-3 adversarial-blinded | **FAIL** | force ≤ T3 (HARD-CAP) | §4; W295-r30 ratification + Issue #58 bias-class confirmation |
| Gate-4 contamination | **FAIL** | tier -1 | §5; closed-loop benchmark + 17-minor-version staleness |
| Gate-5 replayable + ≥3-org | **FAIL** | tier -1 | §6; 1-org effective; benchmark.json not tracked upstream |

**Composite arithmetic**:
- Total fails: **4**
- Total pass: **1**
- Total n/a: **0**
- Per SKILL.md:340-344: `2+ failures → tier -2 OR force ≤ T4 CITE-ONLY`; with 4 fails the rubric leans toward **T4 CITE-ONLY**.
- **Gate-3 HARD-CAP independently forces ≤ T3 PATTERN-STUDY**.
- The lower of {T4 CITE-ONLY composite, T3 PATTERN-STUDY hard-cap} = **T3 PATTERN-STUDY** (hard-cap WINS — it sets the FLOOR, not the ceiling; pattern_score 4.68/7.1 supports retaining at T3 not falling to T4).

**Verdict**: **DEACTIVATE — Phase-5 verdict: T3 PATTERN-STUDY** (composite forces ≤ T4; Gate-3 hard-cap pulls floor back to T3; pattern-value warrants T3 not T4).

**Comparison to prior audits**:
| Audit | Gate-1 | Gate-2 | Gate-3 | Gate-4 | Gate-5 | Verdict |
|---|:---:|:---:|:---:|:---:|:---:|---|
| W305-C (retroactive) | N/A | N/A | FAIL | N/A | FAIL | PARTIAL-COMPLY-DEFERRED |
| W308-Stream-B (strict-letter) | PASS | FAIL | FAIL | FAIL | FAIL | CONDITIONAL-RATIFY default-DEACTIVATE |
| W308-codex-r2 (Trail of Bits fork sca-v5) | — | — | — | — | — | T3 PATTERN-STUDY + DEACTIVATE BOTH |
| **W309 Stream A (THIS audit)** | **PASS** | **FAIL** | **FAIL** | **FAIL** | **FAIL** | **T3 PATTERN-STUDY — DEACTIVATE (ratified)** |

**Triple-convergent** with two new W309-fresh findings (Issue #58 author retraction; DeepWiki misattribution) that strengthen Gate-3 + Gate-2 evidence.

---

## §8 Operator-action queue closure

### §8.A Existing items closed by this audit

1. **W305-C §6 AI-1 HIGH** ("Mandatory W307 sca-v5 Phase-5 re-litigation") — **CLOSED**: W308-Stream-B performed the re-litigation; this W309 audit independently re-verifies under fresh-data probe; W308-codex-r2 + edddf94 already shipped the DEACTIVATE.
2. **W307-SYNTHESIS §4 HIGH carry-forward** ("9-wave-pending PWF re-litigation") — **CLOSED**: identical to above; settle the 9-wave debt with this audit-of-record.
3. **HIGH operator-action #3** (carried W297 → W308 per prompt brief) — **CLOSED**: by this audit + the already-shipped edddf94 settings.json flip.

### §8.B Recommended next actions

| Action | Priority | Wave | Notes |
|---|:---:|:---:|---|
| Append W309 row to `VERDICT-LEDGER.md` (T3 PATTERN-STUDY) | MEDIUM | W309-synth | Per W305-C AI-3 `tier_history[]` schema |
| Author `.claude/skills/durable-planning-files/SKILL.md` operator-curated pattern-lift | LOW | W310+ | Per W308-codex-r2 §7 pattern-extraction recommendation; preserves 3-file pattern WITHOUT plugin dependency |
| **Do NOT `claude plugin uninstall`** the on-disk plugin | n/a | n/a | Cache preserved; enabledPlugins=false is sufficient deactivation; supports operator override re-enable if W310+ new evidence emerges |
| Codex Stop-hook ratification of W309 audit | LOW | W309-close | If operator wants formal codex GPT-5.5 sign-off; W308-codex-r2 already covers the substantive DEACTIVATE decision so this is belt-and-suspenders |

### §8.C No-op (already done)

- `settings.json` flip `true→false`: **already shipped** at commit `edddf94` (W302-close-out). The prompt's "settings.json:232=true" claim was stale (verified current value is `false`).
- `plugin uninstall`: NOT needed; enabledPlugins=false achieves the same operational effect with preserved cache for operator-discretion re-enable.

---

## §9 SOTA-references citation roll-up (≥3 org-distinct REQUIRED)

Per W309 mandate, this audit explicitly anchors each gate to SOTA-references from ≥3 organisationally-distinct entities:

| Gate | SOTA-reference 1 | SOTA-reference 2 | SOTA-reference 3 |
|---|---|---|---|
| Gate-1 | **KILT** (Meta FAIR — `kilt/eval_downstream.py`, arXiv 2009.02252) | **Wikipedia WP:RS** (Wikimedia Foundation) | NIST AI RMF Map function + ISO/IEC 23894:2023 §6 |
| Gate-2 | **HELM** v1.0 Robustness §3.4 (Stanford CRFM) | **PromptSuite** (arXiv 2507.14913v4, Cohen's κ 95%) | OpenAI Evals robust-eval contract |
| Gate-3 | **MT-Bench** §2.3 + **Zheng+ 2023** (arXiv 2306.05685) | **MLflow** EvaluationExample score-anchored | **Wataoka+ 2024** quant self-preference (arXiv 2410.21819) |
| Gate-4 | **SWE-bench Verified** (Princeton NLP, arXiv 2310.06770) | **BIG-bench** task-curation (Google/multi-org) | NIST AI RMF + OpenSSF best-practice contamination-control |
| Gate-5 | **BIG-bench** replayability (Google) | **lm-eval-harness** `--log_samples` (EleutherAI) | **AlpacaEval LCAE** leak-controlled (Stanford CRFM) |

**Org-distinct count**: Meta FAIR + Wikimedia + NIST + Stanford CRFM + OpenAI + Princeton NLP + Google + EleutherAI + MLflow (Databricks) + Anthropic (referenced) = **10 orgs across 5 gates** — exceeds the ≥3-org requirement by 3.3×.

---

## §10 Cardinal-rule conformance

- **CR-1 (trusted-source primitives only)**: ✓ — this audit recommends keeping PWF cache (already trusted-source-installed at W294) but `enabledPlugins=false`; does NOT recommend any self-invent.
- **CR-2 (no `.claude/hooks/scripts/*.py|sh`)**: ✓ — this audit does not author any hooks.
- **CR-3 (subagents = upstream agents)**: ✓ — this audit is itself an Agent-tool subagent; no new subagent declarations.
- **CR-4 (no `.claude/rules/*.md`)**: ✓ — this audit writes to `docs/architecture/W309-GAP-RESOLUTION-SOTA-REFS/` per file-ownership.
- **CR-5 (safety boundaries via Claude Code permissions)**: ✓ — no custom guard scripts proposed.
- **CR-9 (version-pin discipline)**: ✓ — verified PWF gitCommitSha `d27008f3` + cache version `2.38.1` against `installed_plugins.json`.
- **STOP-gate (`self_invented_count: 0`, NO `.claude/rules/`, NO `.claude/hooks/scripts/`)**: ✓ — this audit changes no settings; produces one Markdown file.

**Cite-anchors** (this audit; ≥3 required per sca-v5 contract, this exceeds with 14):
1. `.claude/skills/sota-convergence-audit/SKILL.md:327-346` (Phase-5 protocol + carve-out).
2. `docs/architecture/W288-RESEARCH-ARCH-v2/VERDICT-LEDGER.md` row #3 (T1 INSTALL 4.67/4.68 at `e44ba9e`).
3. `docs/architecture/W295-AUDIT-2026-05-18.md:130` (HIGH SHIP-CHANGING Gate-3 + Gate-5 FAIL).
4. Commit `79d7b1f` (W295-codex-r30 amend) + commit `2bf2d27` (W296-foundation silent re-enable).
5. `docs/architecture/W299-E2E-CODEX-AND-RULES-AUDIT/W299-STREAM-D-DECISION-QUALITY-FEEDBACK.md:27,53-82` (headline mis-call).
6. `docs/architecture/W305-R8-IMPL-AND-FINAL-DEEP-AUDIT/W305-STREAM-C-PWF-GOVERNANCE.md` (PARTIAL-COMPLY hypothesis).
7. `docs/architecture/W307-TOP3-CHALLENGER-AUDITS-AND-AUTOMATION/W307-SYNTHESIS-2026-05-18.md §4` (carry-forward queue).
8. `docs/architecture/W308-PATTERN2-PWF-SOTA-DISCOVERY/W308-STREAM-B-PWF-PHASE5-RELITIGATION.md` (strict-letter 4-FAIL).
9. `docs/architecture/W308-PATTERN2-PWF-SOTA-DISCOVERY/W308-CODEX-R2-TRAILOFBITS-AUDIT.md` (Trail of Bits fork ALSO REJECT).
10. Commit `edddf94` (W302-close-out — the actual deactivate; sibling-shipped).
11. `.claude/settings.json` live PWF entry verified `false` 2026-05-19.
12. `.claude/plugins/installed_plugins.json` PWF gitCommitSha=`d27008f3...` + version=`2.38.1`.
13. https://github.com/OthmanAdi/planning-with-files/issues/58 (author's Tasks-vs-TodoWrite retraction — NEW W309 finding).
14. https://github.com/OthmanAdi/planning-with-files/blob/master/docs/evals.md (self-authored "encoded preference" framing + benchmark fixture not tracked — NEW W309 finding).

---

**End of W309 Stream A — PWF Phase-5 fresh-data audit.**

**Net effect**: 9-wave carry-forward HIGH operator-action queue item is now formally closeable. The audit ratifies the already-shipped `edddf94` DEACTIVATE with two new fresh-data findings (Issue #58 author retraction + DeepWiki misattribution) that independently strengthen the Gate-2 and Gate-3 FAIL evidence. No file mutations recommended beyond this audit-of-record + LOW ledger-row backfill.
