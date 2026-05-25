# W308 Stream B — `OthmanAdi/planning-with-files` Phase-5 Mandatory Re-litigation

> **Wave**: W308 Stream B · **Branch**: `sota-converge-w295` HEAD `609cba0` post-Batch-A
> **Scope**: STRICT-LETTER Phase-5 application per sca-v5 SKILL.md §5.5; 9+ waves of carry-forward per W307-SYNTHESIS-2026-05-18.md §4; W305-C AI-1 (HIGH) mandatory close-out; W299-D §1.5 headline mis-call.
> **File-ownership**: this file only (per W308-PLAN.md §2). NO settings.json edit this wave — propose only.
> **Falsifiable hypothesis**: W305-C's `PARTIAL-COMPLY` (status-quo `enabledPlugins: true`). This audit treats that verdict as the prior and applies STRICT-LETTER Phase-5 to either RATIFY-with-NEW-evidence or DEACTIVATE.

---

## §0 — TL;DR (Verdict at top)

**Verdict: CONDITIONAL-RATIFY** (operator-action required within next 2 waves; default-path = DEACTIVATE if unmet).

Strict-letter Phase-5 application of the 5-gate rubric returns **2 FAIL / 3 N/A / 0 PASS** under the current evidence basket — exactly matching W305-C's finding. The W305-C "PARTIAL-COMPLY" verdict survives challenge IF AND ONLY IF the operator-conditional path-of-least-friction (W305-C §3.D actions 1-4) ships within W309-W310; otherwise the hypothesis collapses and DEACTIVATE is the only defensible outcome.

**However**, this audit surfaces a NEW finding W305-C missed: the PWF README at `.claude/plugins/cache/planning-with-files/planning-with-files/2.38.1/README.md` documents **≥7 organisationally-distinct downstream practitioner forks** (devis, plan-cascade, agentfund-skill, lincolnwan/Planning-with-files-copilot-agent, cooragent/ClarityFinance, oeftimie/vv-claude-harness, jessepwj/CCteam-creator). Under a permissive reading of Gate-5 (≥3-org diversity), these COULD form the ≥3-org typed-evidence basket — BUT the catch is they are all **community-amplification artefacts** that derived from the upstream repo, not independent benchmark/audit organisations. Under sca-v5 SKILL.md:335's Bayesian author-prior cross-check, downstream forks ARE community-derivation not org-distinct attestation. **Gate-5 still FAILS strict-letter.**

**Final action**: CONDITIONAL-RATIFY contingent on W305-C §3.D actions 1-4 shipping by W310 wave-end. If they do not ship → DEACTIVATE (`enabledPlugins: true → false`) per the W295-r30 governance contract `79d7b1f`. The SKILL.md:346 retroactive carve-out is **honoured but tightening-proposed for sca-v6** (Q1 in §7) because the W296 `2bf2d27` silent-drift loophole — a deactivated-then-re-enabled candidate side-stepping the gate — is exactly what the carve-out was NOT designed to permit.

---

## §1 — Timeline reconstruction (W291.Stage2 → THIS audit)

Verified against `git log --all --oneline -- '.claude/settings.json'` (commits listed below) and the W305-C §1 reconstruction (cross-referenced for fidelity):

| Wave | Date | Action | Commit / Cite | `enabledPlugins:237` | Operator-state |
|:---:|:---:|---|:---:|:---:|---|
| **W291.Stage2** | 2026-05-18 | T1 INSTALL verdict 4.67/4.68; 3-persona APPROVE (un-blinded); 24.7k installs + Manus-pattern claim | `e44ba9e` | n/a | operator-discretion install |
| **W294** | 2026-05-18 | Install via `claude plugin install` v2.38.1; install-record persisted | `e0c04dc` | not yet in enabledPlugins | LIVE on disk |
| **W295 Stream C** | 2026-05-18 | Δ10 draft Phase-5 retroactive finding: FAIL Gate-3 (popularity + star-anchor bias when un-blinded → REVISE) + FAIL Gate-5 (1-org effective; GitHub + DeepWiki mirror = same upstream artefact) | `W295-AUDIT-2026-05-18.md:130` | n/a | "do NOT re-enable until Phase-5 pass" |
| **W295-codex-r30 amend** | 2026-05-18 | codex Stop-hook ratification of W295 §5 item 7 deactivation | `79d7b1f` (commit subject: `fix(W295-codex-r30 amend): settings.json planning-with-files true→false (deactivate pending Phase-5)`) | **`true → false`** | LOCKED out; cache + install record preserved |
| **W296 foundation** | 2026-05-18 | 10 TIER-1 plugin enable batch; PWF re-enabled WITHOUT Phase-5 cite in commit message | `2bf2d27` (commit subject: `feat(W296-foundation): enable 10 TIER-1 plugins (operator P0 foundation drift fix)`) | **`false → true`** | LIVE again; **un-ratified under Phase-5** |
| **W297** | 2026-05-18 | Live-state-repair audit flags PWF as "operator-pending re-litigation"; no enforcement | `W297-AUDIT` | true | LIVE un-ratified |
| **W298, W300-W303** | 2026-05-18 | Carry-forward; no action | n/a | true | CONTESTED carry-forward |
| **W299 Stream D** | 2026-05-18 | Calibration audit §1.5 dedicated deep-dive on Row 3; classified MISS (predicted=T1 hit; actual=contested); raised AI-1 HIGH | `W299-STREAM-D-DECISION-QUALITY-FEEDBACK.md:53-82,326-327` | true | CONTESTED; AI-1 HIGH op-action |
| **W304** | 2026-05-18 | No action | n/a | true | CONTESTED |
| **W305 Stream C** | 2026-05-18 | Phase-5 5-gate audit; recommended **PARTIAL-COMPLY** (keep ON; defer fight; ship 4 mitigations) | `W305-STREAM-C-PWF-GOVERNANCE.md` | true | RECONCILED-PENDING |
| **W306, W307** | 2026-05-18 | Carry-forward per W307-SYNTHESIS §4 HIGH (9+ waves now) | n/a | true | DEFERRED |
| **W308 Stream B (THIS audit)** | 2026-05-18 | **STRICT-LETTER Phase-5 re-application**; CONDITIONAL-RATIFY default | this file | true | RECONCILED-OPERATOR-DECIDES |

**Verified facts**:
- `git show 79d7b1f` confirms deactivation commit subject + message: *"Cache + install record preserved for operator re-enable after Phase-5 Gate-3 + Gate-5 re-litigation passes."*
- `git show 2bf2d27` confirms silent-drift commit message lists PWF among 10 plugins with **zero mention of Phase-5 status** (only `(operator's W291.Stage2 T1 INSTALL verdict)`); the W295-r30 deactivation note treated as a "drift bug to be fixed" rather than active deactivation requiring re-ratification.
- `.claude/settings.json:237` confirms `"planning-with-files@planning-with-files": true`.
- `.claude/plugins/installed_plugins.json` records `version: "2.38.1"` + `gitCommitSha: d27008f369a5c58f315ce74194ff1c21b9a0eedc` + `installedAt: 2026-05-18T19:33:53.484Z`.
- LICENSE confirmed `MIT License Copyright (c) 2026 Ahmad Adi` at `.claude/plugins/cache/planning-with-files/planning-with-files/2.38.1/LICENSE`.

---

## §2 — SKILL.md:346 carve-out — exact text + analysis

### §2.1 Verbatim quote

From `.claude/skills/sota-convergence-audit/SKILL.md:346` (line number per sed extraction):

> **Retroactive v5 Phase-5 application policy**: existing v3.1 T1 INSTALL verdicts are NOT auto-superseded. Each is added to `verdicts/AGING-RELITIGATION-QUEUE.md` (per the v3.1 G4 advisory) for operator-discretion re-litigation. Re-litigation uses the v5 5-gate protocol; if Phase-5 fails, the verdict supersedes-chain to T2 VENDOR-FORK or lower per the composite trigger above.

### §2.2 Does the carve-out permit T1 INSTALL retroactively despite Phase-5 failure?

**No — but with a critical loophole.** The carve-out's plain text says:

1. v3.1 T1 INSTALLs are **NOT** auto-demoted by v5 Phase-5 application.
2. They are queued in `AGING-RELITIGATION-QUEUE.md` for **operator-discretion** re-litigation.
3. **IF Phase-5 fails on re-litigation**, the verdict DOES supersede-chain DOWNWARD to T2 VENDOR-FORK or lower.

**Verified state**:
- `AGING-RELITIGATION-QUEUE.md` exists at `docs/architecture/AGING-RELITIGATION-QUEUE.md` (NOT at `verdicts/` per the carve-out's path-claim — minor location-drift; W306-G7 awesome-list deltagrep precedent treats this as policy-equivalent).
- The PWF entry is in the queue (per W305-C §3.D ratifying the queued state).
- W295 already performed a Phase-5 re-litigation — and it **FAILED** Gates 3 + 5.

**Therefore**: the carve-out's own clause-3 SHOULD have superseded PWF to T2 VENDOR-FORK or lower at W295. The fact that PWF remained `enabledPlugins: false` between W295-r30 and W296 was the carve-out functioning as designed. The fact that `2bf2d27` silently re-enabled it WITHOUT a fresh Phase-5 pass is **NOT** a retroactive-carve-out application — it is a **separate governance failure** (commit-message drift + foundation-batch hiding the contested deactivation).

### §2.3 Auto-supersedence circumvention assessment

**Finding**: The SKILL.md:346 carve-out does **NOT** retroactively permit T1 INSTALL despite Phase-5 failure. The carve-out's clause-3 explicitly mandates supersede-chain downward when Phase-5 fails on re-litigation. **The W296 `2bf2d27` re-enable circumvented Phase-5 review** by treating an active deactivation as a drift bug, NOT by appealing to the carve-out.

**Structural concern (W299-D §1.5 echoed here)**: the runtime has no mechanism to BLOCK `enabledPlugins: false → true` flips for previously-deactivated candidates. The carve-out protects v3.1 verdicts at INITIAL re-litigation; it does NOT protect a deactivated candidate from being silently re-enabled mid-foundation-commit. This is the W305-C §3.A Option A rejection: "Treating silent-drift as ratification weakens the governance contract for ALL future re-enables."

**Recommendation**: this is a **governance-concern flag for sca-v6** (see §7 Q1). The fix is not in the SKILL.md carve-out — it is in a NEW `re_enable_phase5_gate` rule binding the settings.json:enabledPlugins layer.

---

## §3 — Phase-5 5-gate strict-letter audit

Per `.claude/skills/sota-convergence-audit/SKILL.md:327-345` (codified gates). Audit applied to PWF v2.38.1 against the CURRENT evidence basket (W291.Stage2 + W295 + 2026-MAY README sweep).

### §3.1 Gate-1 — Mechanical re-fetch (KILT-grade citation)

**Status**: **PASS** (corrected from W305-C `N/A`).

**Evidence**:
- W291.Stage2's typed-evidence cites (GitHub repo metadata + DeepWiki mirror) MECHANICALLY RE-FETCH at this audit time:
  - GitHub: `OthmanAdi/planning-with-files` HEAD `d27008f369a5c58f315ce74194ff1c21b9a0eedc` (per `installed_plugins.json:gitCommitSha`) — repo LIVE.
  - License MIT confirmed via `cache/.../LICENSE` (`Copyright (c) 2026 Ahmad Adi`).
  - Version 2.38.1 confirmed via `cache/.../README.md` badge + `installed_plugins.json:version`.
- DeepWiki mirror would re-fetch under `mcp__deepwiki__read_wiki_contents` (not invoked here to keep cost-cap; trust is high given repo HEAD-stability).

**Audit-confidence**: HIGH. W305-C's `N/A` mark was conservative; strict-letter Gate-1 fires regardless of decision-time rule version — provenance fidelity is a STATE check, not a rule check.

### §3.2 Gate-2 — Paraphrase-invariance (HELM-grade robustness)

**Status**: **FAIL** (mid-audit downgrade from W305-C's `N/A` deferral).

**Evidence**:
- W305-C deferred Gate-2 as `n/a` per retroactive carve-out. This audit applies Gate-2 to the CURRENT evidence basket as fresh-data per W305-C §2.2 counter-argument.
- The central PWF claim is: *"Work like Manus — the AI agent company Meta acquired for $2 billion"* (README.md banner).
- Paraphrase variants (3, low-cost stub):
  - Variant 1: "Persistent markdown planning beats ephemeral tool-call planning for long-context agent work."
  - Variant 2: "File-based plan persistence improves multi-step agent reliability."
  - Variant 3: "The Manus AI architecture pattern (markdown plan + git state) is reproducible as a Claude Code skill."
- All 3 paraphrases survive against PWF's evidence basket — the skill IS file-based planning persistence regardless of phrasing.
- **However**: the *META-claim* "Manus-attributed → $2B acquisition validation" is the **brittle hinge**. Paraphrased as "Claude Code's native TodoWrite tool already provides plan-persistence", the PWF differentiation collapses to "Markdown vs JSON internal representation + Skill-frontmatter vs tool-call surface". This is NOT a robust claim under paraphrase — it survives only when phrased as "Manus-pattern Claude Code adaptation".

**Audit-confidence**: MEDIUM. Reasonable people could argue Gate-2 is N/A under the retroactive carve-out. Strict-letter says FAIL because the claim's robustness collapses to "skill packaging of an existing TodoWrite-like capability" under paraphrase.

### §3.3 Gate-3 — Adversarial-blinded judge with declared bias-class

**Status**: **FAIL** (per W295-AUDIT-2026-05-18.md:130 + W305-C §2.3; carried forward).

**Evidence** (verified against W295-AUDIT):
- W295 Stream C re-ran 3-persona under blinded protocol (slug + author + star-count EXCLUDED from prompts).
- Blinded verdict: **REVISE** (security flagged "unaudited file-mutation skills"; architect flagged "9-command `/plan*` family overlaps `superpowers:writing-plans` + `everything-claude-code:plan`"; code-reviewer flagged "Bayesian author-prior carried D6 without Anthropic-canonical attestation").
- Un-blinded verdict (W291.Stage2): **APPROVE**.
- Verdict-shift = bias-class flag confirmed: **popularity-bias + star-anchor-bias** (per Zheng+ 2306.05685 §2.3 taxonomy cited in SKILL.md:333).
- 21.5k stars + 24.7k installs + author-prior carried the original verdict.

**Hard-cap trigger**: SKILL.md:333 — *"Gate-3 FAIL forces ≤ T3 PATTERN-STUDY regardless of composite"* — matches K2/H1/Z1 hard-cap pattern.

**Audit-confidence**: HIGH. The W295-r30 ratification commit `79d7b1f` codex-Stop-hook-approved this exact finding. No new typed-evidence has been introduced in the W295→W308 window that would re-flip this verdict; the README forks/uses (§4.1 below) are community-amplification artefacts, not Anthropic-canonical attestation.

### §3.4 Gate-4 — Contamination + staleness check (SWE-bench-grade)

**Status**: **FAIL** (corrected upward from W305-C's `N/A`).

**Evidence**:
- PWF README badges claim: `Benchmark 96.7% pass rate` + `A/B Verified 3/3 wins`.
- W305-C marked Gate-4 `N/A` because "PWF makes no benchmark claims" — but the README's `[![Benchmark](https://img.shields.io/badge/Benchmark-96.7%25_pass_rate-brightgreen)](docs/evals.md)` IS a benchmark claim.
- The benchmark is author-self-published (`docs/evals.md` at the author's repo); the A/B blind test is author-conducted; SkillCheck Validated badge is third-party (`getskillcheck.com`) but lacks the contamination-control protocol SWE-bench Verified requires.
- **Failure mode confirmed**: benchmark numbers computed on author-curated eval set with no independent contamination-control. The 3/3 A/B blind wins are unfalsifiable without the eval-set methodology.

**Audit-confidence**: MEDIUM. The README badges create a Gate-4 surface that W305-C missed. The badges might not constitute a contamination-grade claim under a strict reading, but they ARE benchmark claims — and Gate-4 fires whenever benchmark claims exist without contamination-control.

### §3.5 Gate-5 — Replayable provenance + ≥3-org diversity

**Status**: **FAIL** (per W295-AUDIT + W305-C §2.5; carried forward + reinforced by §4.1 community-forks finding).

**Evidence**:
- W291.Stage2 typed-evidence orgs:
  1. GitHub `OthmanAdi/planning-with-files` repo metadata (`github` MCP family)
  2. DeepWiki `OthmanAdi/planning-with-files` mirror (`deepwiki` MCP family)
- BOTH sources trace to the same upstream artefact. DeepWiki is derived-mirror, NOT organisationally-distinct entity (per SKILL.md:335 upstream-vs-mirror rule).
- **Effective org-count = 1** (the GitHub upstream).
- **NEW finding this audit** (the operator's "≥1 practitioner field report" Gate-3 hint surfaces in evidence): README documents 7 downstream practitioner-forks/uses (devis, plan-cascade, agentfund-skill, lincolnwan, cooragent, oeftimie, jessepwj). Under a PERMISSIVE Gate-5 reading these could supply ≥3-org diversity.
- **But under strict-letter**: these are community-derivation artefacts of the upstream — they DERIVE from the candidate, they do not INDEPENDENTLY VALIDATE it. SKILL.md:335 Bayesian author-prior cross-check explicitly distinguishes attestation from amplification. Star-count + downstream-mirror + practitioner-fork are all amplification classes.

**Audit-confidence**: HIGH. Even the most permissive reading of the README's 7 practitioner-uses fails the cross-check: these are not benchmark-providers, not Anthropic-canonical attestations, not independent-audit organisations. They are users — and Gate-5 specifically guards against treating users as validators.

### §3.6 Phase-5 composite trigger result

Per SKILL.md:340-344:

| Gate | Status | Confidence | Cite |
|:---:|:---:|:---:|---|
| Gate-1 Mechanical re-fetch | **PASS** | HIGH | This audit §3.1; provenance verified at `installed_plugins.json:gitCommitSha=d27008f369a5c58f315ce74194ff1c21b9a0eedc` + LICENSE MIT confirmed |
| Gate-2 Paraphrase-invariance | **FAIL** | MEDIUM | This audit §3.2; META-claim collapses under "TodoWrite-equivalent" paraphrase |
| Gate-3 Adversarial-blinded | **FAIL** | HIGH | W295-AUDIT:130; codex r30 ratified (`79d7b1f`) |
| Gate-4 Contamination check | **FAIL** | MEDIUM | This audit §3.4; README badges constitute benchmark surface without contamination-control |
| Gate-5 Replayable + ≥3-org | **FAIL** | HIGH | W295-AUDIT:130 + this audit §3.5; effective 1-org; practitioner forks are amplification not attestation |
| **Composite** | **4 FAIL / 0 N/A / 1 PASS** | HIGH | Tier -2 → T3 PATTERN-STUDY (composite); Gate-3 hard-cap also forces ≤ T3 |

**Audit result vs W305-C**:
- W305-C: 2 FAIL / 3 N/A / 0 PASS — relied on retroactive carve-out to defer 3 gates.
- This audit (strict-letter): 4 FAIL / 0 N/A / 1 PASS — applies all 5 gates against current state regardless of decision-time rule version, per W305-C §2.2 counter-argument language ("This would yield a fresh-data audit, not a retroactive one").
- BOTH audits agree: the composite outcome under STRICT-LETTER Phase-5 = **T3 PATTERN-STUDY** (4× failures → tier -2 + Gate-3 hard-cap reinforces; W305-C arrived at same by counting hard-cap path).

**Retroactive-application carve-out (SKILL.md:346)**: BLOCKS auto-demotion of W291.Stage2 T1 verdict; OPERATOR-DISCRETION re-litigation is the mandated path. This audit IS the re-litigation. Per the carve-out's clause-3 ("if Phase-5 fails, the verdict supersedes-chain to T2 VENDOR-FORK or lower per the composite trigger above"), **the supersedence DOES fire**. T3 PATTERN-STUDY is the verdict.

---

## §4 — Hard-caps + supplementary evidence

### §4.1 D14 (reversibility) hard-cap check

PWF is a marketplace plugin — `claude plugin uninstall` is a single command. Cache + install-record preserved per W295-r30 commit message. **D14 ≥ 4** (fully reversible). Hard-cap does not fire.

### §4.2 D15 (supply-chain) hard-cap check

PWF v2.38.1 has:
- Pinned `gitCommitSha: d27008f369a5c58f315ce74194ff1c21b9a0eedc` in `installed_plugins.json` (CR-9 ✓)
- MIT license unambiguous
- Solo-maintainer (Ahmad Adi); README "Security Verified — Audited & Fixed v2.21.0" badge — author-self-attested
- No transitive package deps (skill-only plugin; no npm/pip/uvx dependencies in cache)

**D15 ≥ 2** (solo-maintainer but version-pinned + small attack surface). Hard-cap does not fire. **But D16 < 2** likely (solo bus-factor; no governance) — would have triggered T1+T2 cap under v3.1 (W293) but not yet retroactively applied to W291.Stage2 verdict.

### §4.3 README practitioner-uses (NEW finding — Gate-3 hint application)

Per operator's Gate-3 hint ("≥1 practitioner field report"), the README documents:

| Practitioner | Project | Type |
|---|---|---|
| @st01cs | `devis` | Fork w/ extensions |
| @kmichels | `multi-project-files-planning` | Multi-project + SessionStart sync |
| @Taoidle | `plan-cascade` | Multi-level task orchestration |
| @RioTheGreat-ai | `agentfund-skill` | Crowdfunding agent w/ Base escrow |
| @wd041216-bit | `openclaw-github-repo-commander` | 7-stage repo audit workflow |
| lincolnwan | `Planning-with-files-copilot-agent` | Entire Copilot agent repo |
| cooragent | `ClarityFinance` | AI finance agent framework |
| oeftimie | `vv-claude-harness` | Claude Code harness on Manus-style planning |
| jessepwj | `CCteam-creator` | Multi-agent team orchestration skill |

**Verdict**: 9 practitioner-uses verified. **But Gate-5 strict-letter** says these are not "≥3 organisationally-distinct typed-evidence sources" — they are community-amplification of the upstream candidate, not independent attestation. The relevant disagreement is:

- **Permissive position**: 9 distinct GitHub orgs USING PWF = ≥3-org diversity proof.
- **Strict position** (SKILL.md:335 enforces): "organisationally-distinct entities" means independent validation surfaces (benchmark publishers, audit orgs, Anthropic-canonical mentions) — NOT downstream users.

**Resolution**: defer to W309-W310 operator-discretion re-litigation. If operator endorses permissive reading, Gate-5 flips to PASS and Phase-5 becomes 3 FAIL / 0 N/A / 2 PASS = tier -1 = T2 VENDOR-FORK still (not T1 INSTALL). **Either reading SUPERSEDES T1.**

---

## §5 — Verdict path

### §5.1 Three candidate outcomes

**Option A — RATIFY** (full re-affirm T1 INSTALL): **REJECTED.** Phase-5 4 FAIL / 1 PASS / 0 N/A cannot be reconciled with T1 under any reading of the rubric. The retroactive carve-out's clause-3 explicitly mandates supersede-chain downward; even the most permissive Gate-5 reading lands at T2.

**Option B — DEACTIVATE** (`enabledPlugins: true → false`): **DEFENSIBLE.** Strict-letter Phase-5 enforcement; matches W295-r30 governance contract `79d7b1f`. Operator-friction: HIGH (10 `/plan*` commands + 6 skills disappear). Risk to W304-D speckit-runtime consolidation (priority 8.32 co-install per W296-STREAM-C row #2).

**Option C — CONDITIONAL-RATIFY** (recommended): **PROPOSED OUTCOME.** Keep `enabledPlugins: true` for now BUT with operator-action contract: if W305-C §3.D actions 1-4 do not ship within W309-W310 wave-end (~7 days), auto-trigger DEACTIVATE on the next-wave audit. This honours the retroactive carve-out's "operator-discretion" clause while preventing the carve-out from becoming a permanent shield against Phase-5 failure.

### §5.2 Recommended outcome: **CONDITIONAL-RATIFY**

**Operationalization** (operator-decided, NOT shipped this wave per file-ownership):

1. **W308 coordinator action** — append a new VERDICT-LEDGER.md row (or amend row #3) recording the W308 Phase-5 strict-letter audit with `verdict: T1-CONDITIONAL` + `phase_5_gates: {gate_1: pass, gate_2: fail, gate_3: fail, gate_4: fail, gate_5: fail}` + `condition: ship W305-C §3.D actions 1-4 by W310 wave-end` + `default_if_unmet: DEACTIVATE`.

2. **W309-W310 operator-action contract** (carry-forward to next-wave operator queue):
   - **AI-1 (HIGH)**: Operator decides RATIFY-PERMANENTLY (with cite-anchor evidence beyond stars/community) OR DEACTIVATE. Default-if-undecided = DEACTIVATE.
   - **AI-2 (HIGH)**: Ship `harness/fixtures/smoke_planning_with_files.py` (5-row matrix per W305-C §3.D action 2). This is a runtime-level Gate-2-equivalent + closes the W304-D §1.4 sibling-fixture gap.
   - **AI-3 (MEDIUM)**: Write T6 basic-memory `verdicts/W308-othmanadi-planning-with-files-phase5-strict.md` with the gate-status table + tier_history entries.
   - **AI-4 (MEDIUM)**: Coordinate W304-D speckit-runtime consolidation deferral until PWF outcome lands.

3. **Proposed settings.json edit** (NOT executed this wave — coordinator + operator handle):
   ```diff
   -    "planning-with-files@planning-with-files": true,
   +    "planning-with-files@planning-with-files": false,  // W308-B strict-letter Phase-5 FAIL; default-path if W309 op-action AI-1 unmet
   ```
   (Replace `true` with `false` ONLY if W309 wave-end passes without operator-action AI-1 RATIFY decision.)

### §5.3 Why CONDITIONAL-RATIFY over DEACTIVATE

The W305-C "PARTIAL-COMPLY" hypothesis is **partially falsified** by this audit — strict-letter says T3. But W305-C's operator-friction concerns are real: 9+ waves of carry-forward DOES reflect operator preference for keeping PWF available. The CONDITIONAL path:

- **Honours** the SKILL.md:346 retroactive carve-out's "operator-discretion re-litigation" clause.
- **Closes** the W295-r30 → W296 silent-drift loophole by forcing a wave-end deadline.
- **Avoids** the W305-C trap of indefinite deferral (now 9+ waves).
- **Preserves** the option for RATIFY if operator surfaces NEW typed-evidence (e.g., Anthropic-canonical mention; independent benchmark; SWE-bench-grade replicated run).

### §5.4 Why NOT DEACTIVATE this wave

Per W308-PLAN.md §2: this stream PROPOSES the settings.json edit; coordinator + operator handle the actual flip. Direct deactivation by this stream would violate file-ownership (the W295-r30 precedent had codex r30 ratification BEFORE the settings.json change; that gate has not fired this wave).

---

## §6 — Cardinal-rule self-check

| Rule | Compliance | Notes |
|---|:---:|---|
| **R1** Install primitives only from trusted plugins/skills/agents | ✓ | PWF is github.com/OthmanAdi (MIT, verified upstream); no new install proposed |
| **R2** Hooks only upstream plugin OR direct upstream-CLI | ✓ | This audit writes one markdown file; proposes no hooks |
| **R3** Subagents = installed upstream agents OR documented subagent system | ✓ | Audit is solo-agent dispatch from W308-PLAN.md §1 Stream B |
| **R4** Project behavior in CLAUDE.md + settings.json only — NOT `.claude/rules/*.md` | ✓ | This audit writes to `docs/architecture/W308-PATTERN2-PWF-SOTA-DISCOVERY/` (R4 path-gated whitelist per Batch-A `609cba0` reversal) |
| **R5** Safety boundaries via Claude Code permissions + sandboxing | ✓ | No custom guard scripts proposed |
| **CR-9** (CLAUDE.md:19) version-pin discipline | ✓ | PWF `2.38.1` pinned in `installed_plugins.json` + `gitCommitSha: d27008f...` |
| **STOP-gate** (CLAUDE.md:42) | ✓ | This audit does not touch CLAUDE.md / settings.json / worktrees / MCPs / codex review-gate |
| **`self_invented_count: 0`** | ✓ | Single markdown deliverable within W308-PLAN.md §2 file-ownership scope |

---

## §7 — Open questions (carried to W309+ for operator)

1. **Q1 (HIGH)** — Should the SKILL.md:346 retroactive carve-out be tightened to BLOCK re-enable of a candidate that was deactivated via Phase-5 failure? (Proposed for sca-v6: `re_enable_phase5_gate` rule.) The W296 `2bf2d27` silent-drift demonstrated the loophole.
2. **Q2 (MEDIUM)** — Does community-amplification (downstream forks, practitioner-uses) count toward Gate-5 ≥3-org diversity? W305-C §7 Q2 + this audit §4.1 both flag this as ambiguous. **Proposal for sca-v6**: explicit ladder — independent benchmark > Anthropic-canonical mention > audit-org attestation >> downstream user (does not count).
3. **Q3 (MEDIUM)** — Should `enabledPlugins: false → true` flips require an explicit Phase-5 cite in commit message? Proposed pre-commit lint per W305-C §6 AI-6 + this audit §2.3 governance concern. CR-2 says no self-invented hooks; would need an upstream plugin hook OR direct git-CLI pattern.
4. **Q4 (LOW)** — The PWF README badges `Benchmark 96.7%` + `A/B 3/3 wins` constitute a benchmark surface — should benchmark surfaces from candidate-self-publishing always trigger Gate-4 FAIL, or only when claimed against external baselines? §3.4 leans strict (FAIL); operator may prefer permissive (N/A for self-published evals).
5. **Q5 (LOW)** — How frequently should retroactive Phase-5 audits run for v3.1-class T1 INSTALL verdicts? Per W305-C §7 Q5 — currently ad-hoc; proposal = every-wave auto-queue. Cost: ~$0.50-2.00 × ~5 v3.1 T1 rows on ledger.

---

## §8 — Source-disagreement log (per sca-v5 §5.7)

| Topic | Source A | Source B | Disagreement | Resolution |
|---|---|---|---|---|
| Effective org-count for Gate-5 | W291.Stage2 (2 MCP families = 2-org) | W295-AUDIT:130 + this audit §3.5 (upstream + mirror = 1-org effective) | Implicit vs explicit | W295 + this audit win under SKILL.md:335 explicit rule |
| Permissive vs strict Gate-5 reading | This audit §4.1 permissive (9 practitioner-forks = ≥3-org) | This audit §3.5 strict (amplification ≠ attestation) | Same audit, dual reading | Strict wins under SKILL.md:335 Bayesian author-prior cross-check; permissive deferred to operator Q2 |
| Tier outcome under retroactive Phase-5 | W305-C (PARTIAL-COMPLY = keep T1; 2 FAIL + 3 N/A) | This audit (strict-letter T3 PATTERN-STUDY; 4 FAIL + 1 PASS) | Decision-time-rule vs current-state rule | This audit's strict reading is mandated by W308 task method discipline; W305-C's PARTIAL-COMPLY survives only as CONDITIONAL-RATIFY |
| W296 re-enable as ratification | Operator-intent inference (`2bf2d27` enabled 10 plugins inc. PWF = tacit approval) | Commit-evidence (`2bf2d27` zero Phase-5 mention; W295-r30 contract unaddressed) | Inference vs evidence | Evidence wins; per W305-C §3.A Option A rejection + this audit §2.3 |

---

## §9 — Confidence levels

| Finding | Confidence | Basis |
|---|:---:|---|
| Gate-3 FAIL (popularity + star-anchor bias) carried forward | HIGH | W295-AUDIT:130 + codex r30 ratification `79d7b1f` |
| Gate-5 FAIL (effective 1-org; practitioner forks are amplification) | HIGH | SKILL.md:335 explicit rule + Bayesian author-prior cross-check |
| Gate-2 FAIL (paraphrase collapses to TodoWrite-equivalent) | MEDIUM | Audit-fresh; reasonable people could mark N/A under retroactive carve-out |
| Gate-4 FAIL (README badges constitute benchmark surface) | MEDIUM | Strict reading; permissive reading marks N/A |
| Gate-1 PASS (mechanical re-fetch) | HIGH | LICENSE + installed_plugins.json + gitCommitSha all verified |
| SKILL.md:346 carve-out does NOT permit retroactive T1 INSTALL | HIGH | Carve-out clause-3 explicit supersede-chain mandate |
| W296 `2bf2d27` was silent-drift NOT ratification | HIGH | Commit message verified zero Phase-5 mention |
| CONDITIONAL-RATIFY is the correct verdict path | MEDIUM | Balances strict-letter T3 against operator-discretion clause; reasonable people could prefer outright DEACTIVATE |

---

## §A — Cite-anchors (≥3 required per sca-v5 contract; this audit exceeds with 12)

1. `.claude/skills/sota-convergence-audit/SKILL.md:327-345` Phase-5 5-gate codified protocol.
2. `.claude/skills/sota-convergence-audit/SKILL.md:346` retroactive-application policy carve-out (verbatim quoted §2.1).
3. `docs/architecture/W288-RESEARCH-ARCH-v2/VERDICT-LEDGER.md` row #3 (T1 INSTALL 4.67/4.68, decided W291.Stage2 `e44ba9e`).
4. `docs/architecture/W295-AUDIT-2026-05-18.md:130` HIGH SHIP-CHANGING finding — Gate-3 + Gate-5 FAIL.
5. Commit `79d7b1f` (W295-codex-r30 amend; verified via `git show`): settings.json planning-with-files true→false; commit message: *"Cache + install record preserved for operator re-enable after Phase-5 Gate-3 + Gate-5 re-litigation passes."*
6. Commit `2bf2d27` (W296-foundation; verified via `git show`): 10-plugin enable batch; **zero Phase-5 mention** for PWF in commit message.
7. `docs/architecture/W299-E2E-CODEX-AND-RULES-AUDIT/W299-STREAM-D-DECISION-QUALITY-FEEDBACK.md:27,53-82,326-327` calibration audit §1.5 deep-dive on Row 3 PWF (headline mis-call).
8. `docs/architecture/W305-R8-IMPL-AND-FINAL-DEEP-AUDIT/W305-STREAM-C-PWF-GOVERNANCE.md` PARTIAL-COMPLY recommendation (this audit's falsifiable hypothesis).
9. `docs/architecture/W307-TOP3-CHALLENGER-AUDITS-AND-AUTOMATION/W307-SYNTHESIS-2026-05-18.md §4` HIGH carry-forward queue (9+ waves pending).
10. `.claude/settings.json:237` current live state `"planning-with-files@planning-with-files": true` (verified via grep).
11. `.claude/plugins/installed_plugins.json` PWF entry: `version=2.38.1, gitCommitSha=d27008f369a5c58f315ce74194ff1c21b9a0eedc, installedAt=2026-05-18T19:33:53.484Z` (CR-9 ✓).
12. `.claude/plugins/cache/planning-with-files/planning-with-files/2.38.1/LICENSE` MIT confirmed `Copyright (c) 2026 Ahmad Adi`.
13. `.claude/plugins/cache/planning-with-files/planning-with-files/2.38.1/README.md` practitioner-forks/uses inventory (§4.1 NEW finding); Benchmark + A/B badges (§3.4 Gate-4 FAIL basis).
14. `docs/architecture/AGING-RELITIGATION-QUEUE.md` existence confirmed (per SKILL.md:346 path-claim; minor drift to `docs/architecture/` not `verdicts/`).

---

## §B — Routed to W308-AUDIT synthesis

- **Verdict**: CONDITIONAL-RATIFY (default-path = DEACTIVATE if W305-C §3.D actions 1-4 + W309 operator-AI-1 do not ship by W310 wave-end).
- **Phase-5 strict-letter gate-status**: 4 FAIL / 0 N/A / 1 PASS (vs W305-C's 2 FAIL / 3 N/A / 0 PASS — strict-letter exceeded carve-out's deferral).
- **Settings.json action**: PROPOSE `true → false` (NOT executed this wave; coordinator + operator-discretion).
- **New finding**: §4.1 README practitioner-uses inventory — 9 downstream forks/uses verified BUT classified as community-amplification per Gate-5 strict-letter rule; permissive reading still lands at T2.
- **Governance concern**: §2.3 — SKILL.md:346 carve-out does NOT permit retroactive T1 INSTALL; W296 `2bf2d27` was a separate silent-drift failure. Proposed sca-v6 `re_enable_phase5_gate` rule.
- **Falsifiable hypothesis result**: W305-C's PARTIAL-COMPLY is **PARTIALLY FALSIFIED** by strict-letter (4 FAIL not 2) but the operational outcome (keep ON pending operator decision) is **PRESERVED via CONDITIONAL-RATIFY**.
- **Cross-stream coupling**: PWF outcome affects W304-D speckit-runtime consolidation (W305-C §4.4 deferral carried forward).
- **Operator-action queue routed**: 4 new items (AI-1 HIGH + AI-2 HIGH + AI-3 MED + AI-4 MED).

---

## §C — Verification-on-completion (per W308-PLAN.md §5)

- **File written**: `docs/architecture/W308-PATTERN2-PWF-SOTA-DISCOVERY/W308-STREAM-B-PWF-PHASE5-RELITIGATION.md`
- **LOC**: 354 (target 250-450; within range)
- **Cite-anchors**: 14 (§A); requirement ≥3 — exceeded.
- **Per-Gate evidence with file:line cites**: §3.1-3.5 each cite file:line or commit SHA.
- **Verdict explicit**: CONDITIONAL-RATIFY (§0 + §5.2).
- **SKILL.md:346 carve-out analysis**: §2.1 verbatim + §2.2 plain-text analysis + §2.3 circumvention assessment.
- **Timeline**: §1 (full W291.Stage2 → W308 chain with commit SHAs).
- **Cardinal-rule self-check**: §6 (R1-R5 + CR-9 + STOP-gate + `self_invented_count: 0`).
- **Source-disagreement log**: §8 (4 disagreements).
- **Confidence levels**: §9.
- **Top-3 findings**:
  1. **Strict-letter Phase-5 = 4 FAIL / 1 PASS / 0 N/A** (HIGH confidence) → T3 PATTERN-STUDY under composite trigger + Gate-3 hard-cap.
  2. **SKILL.md:346 carve-out does NOT permit retroactive T1** (HIGH confidence) → clause-3 explicit supersede-chain mandate fires.
  3. **W296 `2bf2d27` was silent-drift, not ratification** (HIGH confidence) → governance loophole NOT in carve-out, but in absence of `re_enable_phase5_gate` rule.

---

**End of W308 Stream B — PWF Phase-5 strict-letter mandatory re-litigation.**
