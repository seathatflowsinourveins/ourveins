# W290 — F4 — Convergence-Method Evolution: sca-v3 → sca-v4 Proposal

> **Wave**: W290 — Architecture-Quality + Next-Wave SOTA Discovery
> **Fork**: F4 (sca-v3 → v4 evolution)
> **Date**: 2026-05-18
> **Status**: PROPOSAL — not a ship. Companion to F1 (code-quality audit), F2 (gitleaks/security), F3 (W290 SOTA discovery).
> **Operator mandate** (2026-05-18 14:19 hindsight): "evolve the convergence-method".
> **Cite-class**: TIER-3-LOCAL-COMPOSITION over W288 stream artefacts + W289 fix-arc + W272 operator decisions.

---

## §0 — Position statement

**Recommendation: DEFER v4 ship to W295 (≈5 waves out). Author the v4 design NOW; do not apply NOW.**

The v3 rubric shipped 2026-05-18 (W288) and stabilised across 8 codex-BLOCK remediation rounds (`W289-fix1..fix8`). Per `STREAM-C-RUBRIC-v3.md §7.1` decision-decay, v3 is in the ACTIVE band (wave 0-5 since decision) and carries full weight. Shipping v4 inside the ACTIVE band would:

- Burn a fresh rubric before its real-world failure modes have been observed (only 2 weeks of in-flight use; 10 candidates scored; 5 validation-pilot re-scores — too small a sample to claim v3 is saturated).
- Force a second `rule_version="sca-v3"` → `sca-v4` decay-downweight on the entire `verdicts/` ledger before the ledger has reached >10 entries (the threshold at which the Bayesian author-prior's `β_known_partner` becomes load-bearing per SKILL.md note).
- Pre-commit a v4 design without measured telemetry from real audits (G6 — cost-class boundaries are unverified estimates).

**Counter-argument** (the case for sooner ship): the W288 adversarial review surfaced 4 HIGH-class findings (R1 math, R3 soft-gate EXCEPT, R4 dim-numbering, R5 hard-cap taxonomy) plus 2 NOTEs (N1, N2) that were "forwarded to future waves". If those NOTEs accumulate alongside live operational gaps (G1-G10 below), v4 will become a heavy migration. Iterative v4 ship (one or two gaps at a time) is cheaper than a big-bang.

**Reconciliation**: the v4 design lives in this file. Individual gaps with high signal-to-effort ratio (G4 re-litigation cron · G7 awesome-list deltagrep · G10 ledger 4-target → 2-target) may ship as v3.x point-revisions BEFORE the v4 cutover. Big-shape changes (G2 behavioural-equivalence lane · G6 cost telemetry · G8 perplexity Stage-1) wait for W295.

---

## §1 — What v3 gets RIGHT (don't break these)

| Rule | v3 cite | Worked example fired correctly |
|---|---|---|
| **Soft-gate 5-tier ladder** — low score routes DOWN, not REJECT | `STREAM-C-RUBRIC-v3.md §3.6` + `SKILL.md:165 EXCEPT clause` | `frankenterm`@80★: D1<3 + D5<4 + D8=1 → T4 CITE-ONLY (NOT T5 REJECT). PIPELINE-RUN-rank-06-10.md exec-summary bullet 4 explicitly validates the low-star ≠ auto-reject mandate. |
| **Dual composites** (install_score + pattern_score) | `STREAM-C-RUBRIC-v3.md §2` + SKILL.md Step 4 formulas | `PageIndex`@31k★: install_score=3.85 (below T1 floor 4.0) BUT pattern_score=4.66 → T3 PATTERN-STUDY. Single-composite would have lost the pattern signal. VERDICT-LEDGER.md row 8. |
| **14-dim rubric, tier-specific hard-caps** | `SKILL.md:159-179 hard-cap taxonomy table` (R5) | `Acontext`@3.4k★: D10=2 + D14<3 + D5<4 → INSTALL-only caps fired, T3 still open via pattern_score 3.63 + carve-out per W289-fix7. |
| **Bayesian author-prior feeds D6 (not raw stars)** | `SKILL.md:230-256 Bayesian author-prior section` | `LearningCircuit/local-deep-research`@7.7k★ vs `deer-flow`@68k★: former scored install 4.38 (T1), latter 3.24 (T2) — D6 correctly weighted LangChain-partner γ over raw stars. |
| **Typed-evidence (benchmark + code + practitioner)** | `SKILL.md:54-66 (carried from v2)` + W287 P1a eval-harness Lane A/B | `local-deep-research` D8=5 backed by 95.7% SimpleQA + 77% xbench measured. `planning-with-files` D8=5 backed by 96.7% vs 6.7% baseline. |
| **Eval-harness lane for D8 (no-vibes)** | `SKILL.md:113-141 §4.5` | Lane C (W288-P2 C.1) added a kind-aware smoke-fixture requirement: executable candidates without a smoke module get D8=0. Forced honest scoring. |
| **5-target ledger (basic-memory HARD-FAIL canonical)** | `VERDICT-LEDGER.md operational note` + W272 graphiti retirement decision | All 11 W288 verdicts (architecture-itself + 10 Stream B candidates) persisted to basic-memory T6 successfully. Hindsight T1 best-effort + VERDICT-LEDGER.md human-facing both populated. |
| **EXCEPT clause** (R3 — universal REJECT triggers preempt soft-gate) | `STREAM-C-RUBRIC-v3.md §3.6` + `SKILL.md:165` | claude-code-router (W280h) re-scored under v3 in VALIDATION-PILOT.md: T5 REJECT confirmed with **affirmative** D3=1 + arch-conflict (not a low-score default). The qualifier matters. |
| **Star-only gate anti-pattern** (D12 caps at 3 if no other channel) | `SKILL.md:264-273 anti-patterns` | Hypothetical ralph-tight @47★ with Karpathy endorsement: D12 stays at 3 (raw stars cap), but γ_long_running_repo + practitioner-blog signal lift D6 to ≥4, routing to T3 PATTERN-STUDY. |
| **Decision-decay state machine** (ACTIVE / AGING / STALE / RE-LITIGATED / RETIRED) | `SKILL.md:217-228` + extended sca-v2 downweight 0.7× | Pre-W288 sca-v2 verdicts (eg W280h claude-code-router REJECT) still corroborate at 0.7× weight; ledger doesn't lose them but doesn't over-weight stale rubrics. |

**Don't-break rule**: any v4 change MUST preserve all 10 of these. v4 is ADDITIVE; the regression test is the full VALIDATION-PILOT.md 5-candidate re-score run under v4 must produce the same 5 verdicts as v3 (modulo the 1-2 gaps v4 explicitly fixes).

---

## §2 — What v3 STILL MISSES — the v4 backlog (10 gaps, each argued)

### G1 — Source-disagreement as a first-class composite input (not just a flag)

**Status**: v3 surfaces `sources_typed.<dim>.disagreement[]` (per `STREAM-A-METHODOLOGY.md §4` + `SKILL.md:280` anti-pattern). But the composites `install_score` / `pattern_score` average across dim scores WITHOUT down-weighting dims with active disagreement.

**Failure mode**: Candidate X has `benchmark` saying "+18% MRR@10" but `practitioner_field_report` saying "regression in production". v3 still scores D8 from the BEST delta and lets it flow into install_score at full weight. The disagreement is logged but doesn't bite.

**v4 proposal**: introduce a `confidence_factor` per dim, computed from `disagreement[]` size + variance. A dim with `len(disagreement) ≥ 2` gets `confidence_factor=0.7`; else 1.0. Re-define composites:
```
install_score_v4 = Σ (Di × Wi × confidence_factor_i) / 13.6
```
Soft-gate effect: high-disagreement candidates demote one tier (T1 → T2 → T3).

**For**: matches Stream A §4 mandate to "not silently average contradictory signals".
**Against**: adds a second scalar per dim to the ledger schema; downstream tools (basic-memory MD frontmatter, VERDICT-LEDGER.md table) need column expansion.
**Verdict**: SHIP-v4 (high signal, modest effort, no operator-action required at runtime).

---

### G2 — D8 benchmark_deltas: no behavioural-equivalence lane

**Status**: eval-harness Lane A (inspect_ai), Lane B (promptfoo), Lane C (sota-rubric kind-aware) all measure CAPABILITY against a fixed task. None measure whether candidate X produces THE SAME OUTPUT as installed primitive Y given the same input (the "behavioural-equivalence" question — does it actually replace the incumbent or merely approach it?).

**Failure mode**: `local-deep-research`@7.7k★ scores D8=5 on SimpleQA, BUT its actual research output may be qualitatively different from the installed `exa` + `deepwiki` combo. A T1 INSTALL based on D8 alone risks replacing one capability with a similarly-benchmarked-but-behaviourally-different one.

**v4 proposal**: add Lane D — `behavioural-equivalence`. Run candidate and incumbent on a shared task corpus (10-50 prompts); score output similarity via:
1. Embedding cosine (sentence-transformers or graphiti's qwen3-embedding:0.6b)
2. Structural shape (same JSON keys? same markdown sections?)
3. Cost+latency profile delta

Pipe similarity to a new dim D16 `behavioural_equivalence_to_incumbent` — 1-5 — only fires if D10 (duplication) ≥ 3 (meaningful overlap with installed). Decouples capability-quality (D8) from "is this a real replacement" (D16).

**For**: Lane D answers the question D8 implicitly tried to answer (does this thing fit IN PLACE of the incumbent?).
**Against**: adds a 16th dim + 16 → 15 D-id problem (audit-trail compatibility issue). New lane = harness/eval_harness.py code change.
**Verdict**: SHIP-W295 (significant effort; effort-best-when-batched).

---

### G3 — D12 community_signal_distribution: scoring rule is fuzzy

**Status**: SKILL.md Step 4 D12 description says "multi-channel: stars + HN + Reddit + practitioner-blog + multi-vendor-mention" but provides no deterministic formula. Each fork's scorer applies the rule subjectively.

**Failure mode**: Two forks scoring the same candidate disagree on D12 — e.g., `bytedance/deer-flow`@68k★ might score D12=3 (stars-cap per rule) by one fork and D12=4 by another (counting bytedance's blog mentions). Non-determinism corrodes the ledger.

**v4 proposal**: publish the canonical formula in `STREAM-C-RUBRIC-v3.md §1` D12 anchor text:
```
D12_raw =
   stars_score             (0..2, capped via log10(stars+1)/3 maxed at 2)
 + hn_score                (0..1, count HN front-page hits / 5, max 1)
 + reddit_score            (0..1, count r/ClaudeAI, r/LocalLLaMA mentions / 3, max 1)
 + practitioner_blog_score (0..1, named-T2-or-better blog hit = 1, else 0)
 + multi_vendor_score      (0..1, ≥3 distinct vendor docs mention = 1, else 0)

D12 = min(5, round(D12_raw))
```

Then `D12 ≤ 3 if all other channels return 0` is automatic (stars alone can't exceed 2 → cap at round(2)=2, never 3 — actually need to revisit the cap).

**For**: removes a non-determinism source in the rubric. Falsifiability gained.
**Against**: rigid formula may miss niche signals (eg discord+twitter aren't in the formula). The "log10(stars+1)/3" exact form is somewhat arbitrary.
**Verdict**: SHIP-v4 (the v4 ship vehicle for "deterministic D12").

---

### G4 — No re-litigation cron — AGING verdicts don't auto-trigger re-collection

**Status**: SKILL.md decision-decay state machine says AGING (wave 6-11) "flags reverification_due for revisit". But "flags" how? Where? No cron, no Stop-hook trigger, no automatic re-run.

**Failure mode**: at wave 12 a verdict silently becomes STALE without anyone having looked at it. The runtime trusts a 12-wave-old verdict that may have been falsified by upstream commits.

**v4 proposal**: add a `verdicts/AGING.md` checklist + a Stop-hook (cardinal-rule-2-compliant — direct CLI invocation) that compares verdicts' `reverification_due` against current wave once per session. If AGING verdicts found: post a notification (PowerShell beep per W280g) listing them.

OR — simpler — add it to the `/codex:setup` skill that already exists; codex setup checks the AGING list and prompts for re-litigation.

**For**: closes the most obvious decay-machine hole. Single-line addition to setup.
**Against**: yet another notification source; needs an opt-out mechanism.
**Verdict**: SHIP-v3.1 (point-revision; no v4 wait).

---

### G5 — High-revision verdicts don't decay faster

**Status**: A verdict that took 5 R-class adversarial revisions to land (eg the W288 architecture-itself verdict — R1 CRITICAL math + R3-R5 HIGH + R6 MEDIUM + R7-R8 LOW = 8 R-revisions before APPROVE) decays at the same rate as a verdict that passed adversarial review on round 1. That's wrong: high-revision verdicts are more brittle and should reverify sooner.

**Failure mode**: an audit that produced 8 R-revisions might also have produced 8 latent bugs the reviewers didn't catch. The reverification_due should reflect that.

**v4 proposal**: track `revision_density = R_revision_count / waves_to_ship` per verdict. If `revision_density ≥ 0.5` (eg ≥3 revisions inside the ship wave), set `reverification_due = decided_at + 3 waves` (instead of the default 6). Heavy-revision verdicts get an earlier checkup.

**For**: matches the engineering intuition that bug-prone first-cuts deserve closer monitoring.
**Against**: revision-count is somewhat arbitrary — some R-revisions are stylistic (eg R8 heading renames), not substantive. Could penalise cosmetic-fix verdicts unfairly.
**Mitigation**: weight by severity (CRITICAL=3, HIGH=2, MEDIUM=1, LOW=0.5 — revisions sum). Threshold `weighted_revision_score ≥ 5` → 3-wave reverify-due.
**Verdict**: SHIP-W295 (needs more data on what threshold actually predicts brittleness).

---

### G6 — Cost-aware funnel boundaries are estimates, not telemetry

**Status**: `STREAM-D-INGEST-PIPELINE.md §0` claims "Stage 1 DISCOVER cost ≤ $0.02/cand" and "Stage 2.5 DEEP-DIVE 5-30k tokens". No telemetry confirms these.

**Failure mode**: real audits may cost 2x-10x more than estimated, blowing through the wave's token budget mid-run. Or the estimates may be too high, leading operators to skip audits unnecessarily.

**v4 proposal**: instrument actual cost per stage via langfuse traces (already live at v3.170.0 per CLAUDE.md:35). Every fork that runs the v3 pipeline logs a trace with `wave`, `candidate`, `stage`, `token_count`, `wall_clock_seconds`. After 20-50 audits, compute actual p50/p90 cost-class boundaries. Update Stream D §0 with measured numbers.

**For**: replaces estimates with truth. Future cost budgeting becomes deterministic.
**Against**: requires telemetry plumbing in every fork; W272 retirement of graphiti reminds that "every fork emits N writes" is a fragility we just fixed.
**Mitigation**: piggy-back on existing langfuse instrumentation (no new write target).
**Verdict**: SHIP-v4 (Lane D already adds harness code — bundle the telemetry in).

---

### G7 — No mechanism for awesome-list deltagrep (prior-art-not-audited)

**Status**: `hesreallyhim/awesome-claude-code`, `addyosmani/agent-skills`, `mattpocock/skills`, `ComposioHQ/awesome-claude-skills`, etc., cite hundreds of repos. The runtime cites SOME of them (W288 incumbent list excludes ~80 already-cloned) but no automated check confirms there's nothing in the awesome-list that wasn't audited.

**Failure mode**: an SOTA-grade repo lives in `awesome-claude-code` but never enters our adoption-decisions ledger because no operator-event named it. Discovery has a blind spot.

**v4 proposal**: write `tools/awesome-list-deltagrep.py` — given a curated set of upstream awesome-list READMEs (pin specific HEADs), extract repo URLs, diff against `verdicts/` (basic-memory entries) + `Z:/claude-sota-installed-repos/` directory. Output: list of repo-URLs cited in the awesome-list but never scored. Operator gets a pure DELTA for triage.

Run weekly via `loop` skill or operator-on-demand. The output is itself a Stage 1 DISCOVER input.

**For**: closes a real discovery gap. Cheap to write (1 file, ~80 lines Python).
**Against**: awesome-list pinning becomes another carry — when does the pin update?
**Mitigation**: pin awesome-lists at last commit checked, update on each W-wave open.
**Verdict**: SHIP-v3.1 (point-revision; doesn't change rubric, only adds a new Stage 1 source).

---

### G8 — Perplexity MCP + sonar API not integrated as Stage 1 source

**Status**: SKILL.md Step 1 says "≥4 source families" but neither perplexity-MCP nor sonar API are in the source-family inventory. (operator explicitly named these as gaps in the original W288 directive prompt + 2026-05-18 14:19 hindsight.)

**Failure mode**: a candidate's WHY-not-just-WHAT gets lost if perplexity-style multi-source synthesis isn't probed. Static github-search + deepwiki cover what a candidate IS; perplexity covers what the COMMUNITY says about it.

**v4 proposal**: add a TIER-1-DIRECT source family for perplexity. Per Stream A §3 MCP-tool inventory expansion: when `mcp__perplexity__*` is available, use it for Stage 1 community-signal queries ("what do practitioners say about X"). Fallback: `mcp__plugin_context-mode_context-mode__ctx_fetch_and_index` against sonar.perplexity.ai/search?q=... — no key needed for the web-search variant.

**For**: matches operator's named source-of-truth mandate.
**Against**: external dependency on perplexity-MCP availability (not in current `.mcp.json`); sonar API rate limits; cost-class shifts.
**Mitigation**: SOFT-FAIL — if perplexity is unavailable, fall back to existing WebSearch. Don't HARD-FAIL the pipeline.
**Verdict**: SHIP-W295 (depends on MCP-install decision — operator-discretionary; package with v4 ship).

---

### G9 — VENDOR-FORK tier has no drift-tracking automation

**Status**: T2 VENDOR-FORK candidates (currently 1: `bytedance/deer-flow`; hypothetical: `hindsight-shim`) require manually re-pulling upstream to compare against the vendored subset. No automation surfaces drift.

**Failure mode**: a vendored shim from upstream@v1.0.0 silently goes stale as upstream advances to v2.x. The runtime ships a version of the fork that may have known bugs upstream has already fixed.

**v4 proposal**: per VENDOR-FORK verdict, add a `divergence_files: [...]` array + a `last_synced_with_upstream: <ISO>` field in the ledger schema. A weekly cron compares the vendored files' SHA against upstream HEAD for those file paths; if drift detected, post a notification.

**For**: closes a real fork-rot risk.
**Against**: needs git LFS-style upstream-HEAD tracking; another cron job.
**Mitigation**: piggy-back on the existing `.cache/pre-commit/` git-update infrastructure — pre-commit already pulls upstream regularly for hook refresh.
**Verdict**: SHIP-W295 (less urgent — only 1 VENDOR-FORK in flight, deferring is cheap).

---

### G10 — 4-target ledger has heterogeneous durability — collapse to 2

**Status**: per `VERDICT-LEDGER.md operational note` + W272 decision, graphiti is retiring. Hindsight is best-effort. Basic-memory is HARD-FAIL canonical. VERDICT-LEDGER.md is human-facing manual append.

**Failure mode**: 4 writes per verdict is 4× the failure surface. graphiti's retirement already reduces it to 3, but hindsight's best-effort + manual-append nature means the canonical path is just basic-memory + VERDICT-LEDGER.md.

**v4 proposal**: formalise: T6 basic-memory CANONICAL HARD-FAIL + VERDICT-LEDGER.md HUMAN-FACING auto-appended via a post-write hook. Hindsight T1 BECOMES purely a read-side cache (warm look-back, fed from basic-memory exports). Graphiti REMOVED entirely (per W272 ship).

**For**: aligns with W272 already-shipped direction; reduces failure surface 4×→2×.
**Against**: hindsight T1 removal removes the fast-lookup warm cache; basic-memory queries are slower.
**Mitigation**: hindsight stays as read-only cache fed from basic-memory; don't remove, just stop dual-writing.
**Verdict**: SHIP-v3.1 (point-revision; W272 already mandates direction).

---

### Gap-by-gap ship-priority summary

| # | Gap | Ship target | Effort | Operator action needed |
|---|---|---|---|---|
| G1 | Disagreement → confidence_factor | **v4 (W295)** | M (rubric formula change) | none |
| G2 | Behavioural-equivalence Lane D | **W295** | L (new lane code) | review Lane D output schema |
| G3 | D12 deterministic formula | **v4 (W295)** | S (anchor text) | none |
| G4 | AGING re-litigation cron | **v3.1 (W291)** | S (Stop-hook) | confirm notification channel |
| G5 | revision_density penalty | **W295+** | M (decay rule) | review threshold |
| G6 | Cost telemetry | **v4 (W295)** | M (langfuse plumbing) | langfuse must stay up |
| G7 | awesome-list deltagrep | **v3.1 (W291)** | S (one script) | confirm awesome-list pin list |
| G8 | Perplexity Stage-1 | **v4 (W295)** | M (MCP install + fallback) | install mcp__perplexity__ |
| G9 | VENDOR-FORK drift watch | **W295+** | M (cron + diff) | confirm cron channel |
| G10 | 4-target → 2-target ledger | **v3.1 (W291)** | S (remove writes) | confirm W272 ship |

3 ship-v3.1 (G4, G7, G10) — small, decoupled, no rubric change.
4 ship-v4 (G1, G3, G6, G8 via v4 cutover wave W295) — formula + telemetry + source-family additions.
3 ship-W295+ (G2, G5, G9) — larger; bundle with v4 or stage after.

---

## §3 — Proposed v4 rubric changes (diff against v3)

Each diff is **proposal-only** — do NOT apply to live SKILL.md or STREAM-C-RUBRIC-v3.md until the v4 ship wave.

### Change 1 — G1 disagreement → confidence_factor

```diff
--- STREAM-C-RUBRIC-v3.md §2 (composite formula)
+++ STREAM-C-RUBRIC-v4.md §2 (composite formula with confidence)
@@ -1,8 +1,16 @@
- install_score = Σ (Di × Wi_install) / 13.6
+ # v4: confidence-weighted dual composites
+ # confidence_factor_i = 1.0 if no disagreement on Di; 0.7 if 2+ disagreement entries.
+ install_score = Σ (Di × Wi_install × confidence_factor_i) / 13.6

- pattern_score = Σ (Di × Wi_pattern) / 7.1
+ pattern_score = Σ (Di × Wi_pattern × confidence_factor_i) / 7.1

+ # Tier-routing thresholds remain unchanged; the confidence factor demotes
+ # high-disagreement candidates one tier organically.
```

**Justification**: Stream A §4 mandate that "source-disagreement is first-class" remains only a flag in v3. Multiplying by `confidence_factor` makes it operational.

### Change 2 — G3 D12 deterministic formula

```diff
--- STREAM-C-RUBRIC-v3.md §1 D12 anchor (lines ~165-180)
+++ STREAM-C-RUBRIC-v4.md §1 D12 anchor (deterministic formula)
@@ -1,8 +1,28 @@
- D12 community_signal_distribution — multi-channel: stars + HN + Reddit + practitioner-blog + multi-vendor-mention. Distribution matters more than absolute stars. Stars-alone caps D12 at 3.
+ D12 community_signal_distribution (v4 — deterministic) — multi-channel scoring formula:
+
+ ```
+ D12_raw =
+    stars_score             # 0..2, formula: min(2, log10(stars+1)/3)
+  + hn_score                # 0..1, count HN front-page hits / 5 (clamped 1)
+  + reddit_score            # 0..1, count distinct subreddit mentions / 3 (clamped 1)
+  + practitioner_blog_score # 0..1, named-T2-or-better blog hit = 1
+  + multi_vendor_score      # 0..1, ≥3 distinct vendor-docs mention = 1
+
+ D12 = min(5, round(D12_raw))
+ ```
+
+ Stars-alone cap: log10(MAX_STARS+1)/3 maxes around 2.0 even at 1M stars, so stars-alone naturally caps D12 at 2 — strictly stronger than v3's "caps at 3" anti-pattern carry. To preserve audit-trail compatibility with v3-scored verdicts: when re-litigating a v3 verdict under v4, recompute D12 with the new formula and record `D12_v3 → D12_v4` in the ledger episode body.
```

**Justification**: deterministic = falsifiable = adversarial-reviewable.

### Change 3 — G10 ledger 4-target → 2-target

```diff
--- SKILL.md Step 6 (ledger write contract, lines ~205-215)
+++ SKILL.md Step 6 v4 (2-target canonical)
@@ -1,15 +1,12 @@
- The v3 ledger writes are FOUR-target: graphiti T4 (SOFT-FAIL, retiring per W272), basic-memory T6 at `verdicts/W<wave>-<slug>.md` (HARD-FAIL — blocks pipeline), hindsight T1 fast-lookback summary (SOFT-FAIL), and human-readable `docs/architecture/W288-RESEARCH-ARCH-v2/VERDICT-LEDGER.md` row append.
+ The v4 ledger writes are TWO-target canonical:
+   1. **basic-memory T6** at `verdicts/W<wave>-<slug>.md` (HARD-FAIL — blocks pipeline if T6 unavailable).
+   2. **VERDICT-LEDGER.md** row append (HUMAN-FACING; auto-emitted by a v4 post-write hook that watches basic-memory `verdicts/` and appends rows on new-file events).
+
+ Hindsight T1 is RETIRED from the WRITE path as of v4 (was SOFT-FAIL in v3). It remains AS A READ-side warm cache — fed from a nightly basic-memory export job. Graphiti T4 is REMOVED per W272 retirement.
+
+ See W288 retirement timeline + W272 operator-decisions cite trail for the rationale.
```

**Justification**: W272 already ratified the retirement direction. v4 makes it canonical.

### Change 4 — G4 AGING re-litigation cron

```diff
--- SKILL.md Decision-decay state machine (lines ~220-240)
+++ SKILL.md Decision-decay state machine v4 (with auto-flag)
@@ -1,5 +1,13 @@
 - **AGING** (wave 6-11) — counts at 0.5 weight; flags reverification_due for revisit.
+
+   **v4 auto-flag mechanism** — at session-start (via the `codex:setup` skill), the runtime scans
+   `verdicts/` basic-memory entries and identifies those with `reverification_due < current_wave`. The
+   list is emitted to a `verdicts/AGING-W<current_wave>.md` checklist file. PowerShell beep notifies
+   the operator (cardinal-rule-2-compliant; same pattern as W280g notification hook).
+
+   When the operator re-litigates an AGING verdict, the new verdict's `supersedes` field points to
+   the AGING one; the old one's status becomes RE-LITIGATED.
```

**Justification**: closes the most obvious decay-machine hole. Low-risk.

### Change 5 — G6 cost telemetry

```diff
--- STREAM-D-INGEST-PIPELINE.md §0 (cost-class boundaries)
+++ STREAM-D-INGEST-PIPELINE.md §0 v4 (telemetry-backed)
@@ -1,6 +1,17 @@
- Stage 1 DISCOVER: cost ≤ $0.02/candidate (estimate)
- Stage 2 TYPED-EVIDENCE: 1-5k tokens (estimate)
- Stage 2.5 DEEP-DIVE: 5-30k tokens (estimate)
+ Stage 1 DISCOVER: cost <p50> / <p90> tokens (langfuse telemetry; updated weekly)
+ Stage 2 TYPED-EVIDENCE: <p50> / <p90> tokens
+ Stage 2.5 DEEP-DIVE: <p50> / <p90> tokens
+
+ # langfuse instrumentation contract (v4):
+ # Every fork running sca-v4 emits a trace with metadata:
+ #   { wave, candidate, stage, tier_at_end, token_count_in, token_count_out, wall_clock_seconds }
+ # The /codex:setup skill aggregates these traces weekly and updates this file with measured boundaries.
+
+ # Until ≥20 audits have logged: estimates (v3 carry) are in effect.
+ # After ≥20 audits: switch to measured numbers + flag any candidate exceeding p90 as cost-outlier.
```

**Justification**: replaces vibes with telemetry. Cheap to instrument (one trace per fork).

---

## §4 — Migration path v3 → v4

### Backward-compatibility

| v3 artefact | v4 treatment |
|---|---|
| Existing sca-v3 verdicts in `verdicts/` | Auto-downweight 0.8× (matches sca-v2's 0.7× downweight; v3-to-v4 is closer than v2-to-v3 was, so 0.8×). |
| Existing VERDICT-LEDGER.md rows | Re-emit only on operator-explicit migrate-w4 command. Do NOT auto-migrate. |
| Existing graphiti episodes (already retiring) | Mark RETIRED in graphiti read-side; do not re-emit under v4. |
| Existing hindsight T1 entries | Convert hindsight from write-path to read-side cache; existing entries become stale-but-readable. |

### Ledger schema delta (v3 → v4)

```yaml
# NEW v4 fields per verdict episode:
confidence_factor: {D1: 1.0, D2: 1.0, ..., D15: 1.0}  # 1.0 default; 0.7 if dim has disagreement[].length ≥ 2
revision_density: 0.0                                  # G5: weighted_revision_count / waves_to_ship
divergence_files: null                                 # G9: list of vendored files (T2 VENDOR-FORK only)
last_synced_with_upstream: null                        # G9: ISO date of last drift check
cost_telemetry:                                        # G6
  stage_1_tokens: <int>
  stage_2_tokens: <int>
  stage_2_5_tokens: <int>
  stage_4_tokens: <int>
  total_wall_clock_s: <int>
rule_version: "sca-v4"                                 # incremented from sca-v3
```

### SKILL.md edit plan (v4 ship commit)

| Line range (v3) | Change |
|---|---|
| 6-12 (header) | "v3" → "v4"; add changelog block citing G1/G3/G4/G6/G10. |
| 71-100 (Step 4 dims) | D12 anchor text expand with deterministic formula (Change 2). |
| 154-180 (Step 4 dual composites) | Add `confidence_factor_i` multiplier (Change 1). |
| 205-220 (Step 6 ledger) | Replace 4-target with 2-target contract (Change 3). |
| 220-240 (decision-decay) | Add v4 auto-flag mechanism (Change 4). |
| 264-285 (anti-patterns) | Add: "**Vibes cost estimates** (v4) — every Stage's cost MUST be backed by langfuse telemetry once N≥20 audits have logged". |

### Validation: 5-candidate pilot lane (v4)

Pick the SAME 5 historical candidates from VALIDATION-PILOT.md §0:
1. `anthropics/skills` → expected v4: T1 INSTALL (unchanged); regression-test PASS.
2. `abhigyanpatwari/GitNexus` → expected v4: T3 PATTERN-STUDY (carries v3 verdict); confirms D1 hard-cap behaviour unchanged.
3. `musistudio/claude-code-router` → expected v4: T5 REJECT (carries v3); D10≤2 + adversarial-BLOCK universal-trigger preserved.
4. `hindsight-shim` → expected v4: T2 VENDOR-FORK (carries v3); but NOW divergence_files + last_synced_with_upstream populated.
5. `hypothetical ralph-tight 47★` → expected v4: T3 PATTERN-STUDY (carries v3); but D12 now computed via deterministic formula (lower numeric score, same tier).

PASS criterion: all 5 verdicts UNCHANGED in TIER. Numeric scores may shift due to confidence_factor and deterministic D12 — that's expected and desired (more honest scores). If ANY tier flips, v4 has a regression and must be re-litigated before ship.

---

## §5 — Ship decision

| Question | Answer |
|---|---|
| Cost to ship v4 NOW | ~10-15 days of operator-attention (instrumentation + harness Lane D + perplexity MCP install + pilot lane re-run + 3-persona adversarial + codex final gate). |
| Cost to delay v4 to W295 | ~0 — v3 is healthy. The 3 v3.1 point-revisions (G4, G7, G10) can ship in W291 independently and feed back into the v4 design. |
| Cost to delay v4 indefinitely | ~5-10 verdict-drift incidents over the next 12 waves as AGING/STALE verdicts accumulate without auto-flag. Manageable but accumulating. |
| Risk of v4 ship NOW | HIGH — burning a fresh rubric without observed-failure data. v3 ACTIVE band only 2 weeks old. |
| Risk of v4 ship W295 | LOW — by W295, the v3 ledger will have ≥10 entries (β_known_partner becomes load-bearing) + the 3 v3.1 point-revisions will have measured what v4 actually needs. |

**RECOMMENDATION**: **SHIP-W295**. Author this proposal NOW (this file). Ship v3.1 point-revisions G4 + G7 + G10 in W291. Apply v4 in W295 as a single coordinated commit after the v3.1 revisions have produced operational data.

### Codex GPT-5.5 cross-model handoff prompt

```
You are GPT-5.5 in adversarial-review mode. Independent cross-model review of
W290-F4-CONVERGENCE-METHOD-V4.md (sca-v3 → sca-v4 evolution proposal).

The v3 rubric shipped W288 (2026-05-18); the F4 proposal recommends SHIP-W295
with 3 v3.1 point-revisions (G4 AGING cron, G7 awesome-list deltagrep, G10
ledger 4-target → 2-target collapse) in W291.

Verify:
1. The dual-composite confidence-factor multiplication (G1) doesn't violate
   the established install_score / pattern_score range bounds [1.0, 5.0].
2. The deterministic D12 formula (G3) doesn't conflict with the Bayesian
   author-prior (which already encodes a stars-tie-breaker rule).
3. The 4-target → 2-target ledger collapse (G10) doesn't lose information
   that future audits rely on (graphiti's queryability vs basic-memory's
   filesystem-of-MD-files latency).
4. The W295 ship target is correct — would SHIP-NOW or DEFER-INDEFINITELY be
   better given v3's 2-week ACTIVE band and 10 in-flight pipeline scores?
5. Any v4 changes that should be downgraded to v3.x point-revisions, or any
   v3.x revisions that should escalate to v4?

Return: APPROVE / REQUEST-CHANGES / BLOCK, with file:line cites for each finding.
```

---

## §6 — Open questions forward to W291+

- **Q1**: When `mcp__perplexity__*` lands in `.mcp.json` (G8), should it be MANDATORY Stage 1 or OPTIONAL with WebSearch fallback? Argument for mandatory: removes operator-discretion variance. Argument for optional: external-MCP availability is fragile.
- **Q2**: G2 Lane D behavioural-equivalence — what's the right similarity threshold? Embedding cosine 0.85? Token-level Jaccard 0.7? Operator-tunable per audit?
- **Q3**: G5 revision_density — should `revision_density` itself be a dim (D16), or just a meta-field that influences `reverification_due`?
- **Q4**: G10 hindsight read-side cache — should it be a nightly basic-memory export, or a real-time subscription to basic-memory write events (if the API supports it)?
- **Q5**: When does sca-v5 happen? Speculate on the v5 backlog given current v3-to-v4 patterns: probably "fully-automated re-litigation" (no operator-prompt required for AGING flips) + "cross-runtime verdict portability" (export-import ledger between sibling runtimes like `claude-sota-installed` and `claude-sota-pure`).

---

## §7 — Cite trail

- `Z:/claude-sota-installed/.claude/skills/sota-convergence-audit/SKILL.md` (in-tree v3 — Bayesian prior, decay machine, anti-patterns, EXCEPT clause)
- `Z:/claude-sota-installed/docs/architecture/W288-RESEARCH-ARCH-v2/STREAM-C-RUBRIC-v3.md` (v3 canonical source-of-truth, dim definitions, ladder, weights)
- `Z:/claude-sota-installed/docs/architecture/W288-RESEARCH-ARCH-v2/STREAM-A-METHODOLOGY.md` (source-disagreement first-class § + open questions)
- `Z:/claude-sota-installed/docs/architecture/W288-RESEARCH-ARCH-v2/STREAM-D-INGEST-PIPELINE.md` (6-stage funnel cost-class boundaries)
- `Z:/claude-sota-installed/docs/architecture/W288-RESEARCH-ARCH-v2/ADVERSARIAL-REVIEW.md` §4 (R1-R8 + N1-N2)
- `Z:/claude-sota-installed/docs/architecture/W288-RESEARCH-ARCH-v2/VALIDATION-PILOT.md` (5 historical re-scored, mandate validation)
- `Z:/claude-sota-installed/docs/architecture/W288-RESEARCH-ARCH-v2/PIPELINE-RUN-rank-01-05.md` + `PIPELINE-RUN-rank-06-10.md` (10 candidate verdicts)
- `Z:/claude-sota-installed/docs/architecture/W288-RESEARCH-ARCH-v2/VERDICT-LEDGER.md` (operational note + distribution + W272 retirement reconciliation)
- `Z:/claude-sota-installed/docs/architecture/W272-operator-decisions-2026-05-17.md` (graphiti retirement decision; codex APPROVE severity=low)
- W287 P1a — eval-harness Lane A/B/C (already in SKILL.md §4.5)
- W289-fix1..fix8 commit chain — codex round-1..5 BLOCK remediations resolved

---

## §8 — One-paragraph executive summary

The v3 rubric shipped W288 and is healthy (2 T1 INSTALLs, 1 T2 VENDOR-FORK, 4 T3 PATTERN-STUDY, 3 T4 CITE-ONLY, 0 T5 REJECT across 10 in-flight pipeline candidates; all 3 operator-mandates validated in the 5-candidate VALIDATION-PILOT). The v4 proposal here identifies 10 gaps in v3 — 3 ship in v3.1 (W291: AGING cron G4, awesome-list deltagrep G7, ledger 4-target → 2-target G10), 4 ship in v4 (W295: confidence-factor G1, deterministic D12 G3, cost telemetry G6, perplexity Stage-1 G8), and 3 ship in W295+ (Lane D behavioural-equivalence G2, revision_density G5, VENDOR-FORK drift watch G9). Default null hypothesis (v3 is fresh; don't ship v4 prematurely) holds — SHIP-W295. The codex GPT-5.5 handoff prompt at §5 invites independent cross-model verdict on the W295 ship target before any v4 work begins.
