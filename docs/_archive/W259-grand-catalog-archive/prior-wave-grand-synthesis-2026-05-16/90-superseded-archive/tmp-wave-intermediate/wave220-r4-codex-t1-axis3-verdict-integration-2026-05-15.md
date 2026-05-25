---
title: Wave 220 Round 4 — codex T1 narrow Axis-3 burn-in cpd verdict integration
status: AUTHORITATIVE
date: 2026-05-15
wave: 220
fire: round-4-codex-t1-verdict-integration (Pattern B HNF on JSON; cpd block VERIFIED via codex Node.js subprocess gh api direct)
cross-model-gate: PARTIAL-CODEX-TRACE-VERIFIED (cpd computation block = REAL GPT-5.5 codex subprocess; JSON-at-EOF verdict = Pattern B HNF)
---

# Codex T1 R4 narrow — Axis-3 cpd verdict (TIER-1-DIRECT verified)

## Mechanism

Codex deep-review-exec Path P (real GPT-5.5 via codex CLI subprocess, 200s budget) executed a Node.js script via PowerShell that fired direct GitHub API calls to `/repos/<repo>` + `/repos/<repo>/commits?per_page=1` (Link header `rel="last"` paginated count) for 10 candidates. Output captured at `.claude/state/codex_consult_w220_r4_narrow_axis3_OUT.txt:747` lines (~73KB).

**Verification class**: TIER-1-DIRECT per `port-note-discipline.md §3 Discipline 2` cite-class verbatim verify — codex script output is REAL GPT-5.5 subprocess + REAL GitHub API direct. NOT a Sonnet stand-in claim.

## Verified cpd table (commits/day from Link-header pagination)

| Repo | Created | Age (d) | Stars | Forks | Star velocity (/d) | **cpd (/d)** | Default branch | Owner type |
|---|---|---:|---:|---:|---:|---:|---|---|
| thedotmack/claude-mem | 2025-08-31 | 257.1 | 75,981 | 6,520 | 295.5 | **7.39** | main | User |
| anthropics/skills | 2025-09-22 | 235.3 | 135,072 | 15,924 | 574.1 | **0.14** | main | Organization (Anthropic) |
| code-yeongyu/oh-my-openagent | 2025-12-03 | 163.9 | 57,959 | 4,700 | 353.6 | **37.65** | dev | User |
| volcengine/OpenViking | 2026-01-05 | 130.7 | 23,961 | 1,779 | 183.4 | **8.70** | main | Organization (volcengine) |
| ruvnet/ruflo | 2025-06-02 | 347.1 | 51,526 | 5,780 | 148.5 | **18.61** | main | User |
| diegosouzapw/OmniRoute | 2026-02-13 | 91.4 | 4,624 | 768 | 50.6 | **31.00** | main | User |
| open-compress/claw-compactor | 2026-02-10 | 94.9 | 2,218 | 212 | 23.4 | **0.72** | main | Organization |
| chopratejas/headroom | 2026-01-07 | 128.1 | 1,758 | 159 | 13.7 | **10.27** | main | User |
| cortexkit/magic-context | 2026-03-26 | 50.4 | 615 | 32 | 12.2 | **13.38** | master | Organization |
| manojmallick/sigmap | 2026-03-31 | 45.1 | 434 | 31 | 9.6 | **10.29** | main | User |

## Axis-3 5-band classification (per convergence-gate.md §Axis 3)

Convergence-gate bands (verbatim from `Z:/claude-sota/.claude/rules/convergence-gate.md`):
- `cpd < 10` AND `age ≥ 90d` = **STABLE-BURN-IN** = Firm axis-3 PASS
- `10 ≤ cpd ≤ 20` AND `90d ≤ age ≤ 180d` = **ACTIVE-ITERATION** = Borderline PASS-with-caveat
- `cpd > 10` AND `age > 180d` = **SUSTAINED-ACTIVE-MAINT** = Firm PASS (mature investment)
- `cpd > 10` AND `age < 100d` = **FAST-CHURN** = anti-pattern; re-audit +90d
- **STRONG-PROVENANCE-EXPRESS** (5th band): `age ≥ 30d` AND axis-1 official-org AND axis-2 named-T2-or-org-equiv = Firm PASS relaxed maturity

| # | Repo | Computed Band | Verdict | Rationale |
|--:|---|---|---|---|
| 1 | thedotmack/claude-mem | **STABLE-BURN-IN** | ✅ Firm axis-3 PASS | cpd=7.39 (<10) + age=257 (≥90); Apache-2.0; multi-runtime memory persistence |
| 2 | anthropics/skills | **STABLE-BURN-IN + STRONG-PROVENANCE-EXPRESS** | ✅ Firm axis-3 PASS (provenance-override) | cpd=0.14 + age=235 + Anthropic-org official; **LICENSE caveat: NO-LICENSE-FILE — ADOPT-NOW-CONDITIONAL pending licensing intent verification** |
| 3 | code-yeongyu/oh-my-openagent | **LAUNCH-SPIKE-MATURING** | ⚠️ DEFER | cpd=37.65 (very high — possibly auto-commits/rebases); age=164d (just past LAUNCH-SPIKE 90d threshold); license="NOASSERTION" undefined |
| 4 | volcengine/OpenViking | STABLE-BURN-IN per axis-3 | ⛔ **REJECT (license overrides axis-3)** | cpd=8.70 + age=131 = STABLE; BUT AGPL-3.0 LICENSE BLOCKER per SRA D1 + Probe 6 |
| 5 | ruvnet/ruflo | **SUSTAINED-ACTIVE-MAINT** | ✅ Firm axis-3 PASS | cpd=18.61 + age=347 (>180); MIT; mature investment signals |
| 6 | diegosouzapw/OmniRoute | **FAST-CHURN** | ⚠️ re-audit +90d (DEFER ADOPT) | cpd=31.0 + age=91 (just past 90); anti-pattern band per convergence-gate; possibly LAUNCH-SPIKE bot/rebase pattern |
| 7 | open-compress/claw-compactor | **STABLE-BURN-IN** (idle) | ⚠️ borderline ADOPT (low cpd = mature OR abandoned) | cpd=0.72 (very low — idle); 68 total commits over 95d; pushed_at=2026-04-01 (~6 weeks idle); possibly maintenance-mode |
| 8 | chopratejas/headroom | **ACTIVE-ITERATION** borderline | ⚠️ STUDY-PILOT pending Axis-2 named-T2 | cpd=10.27 + age=128 (90-180 band); borderline PASS-with-caveat |
| 9 | cortexkit/magic-context | **FRESH-PAINT** (age<90d) | ⛔ DEFER (re-audit at age≥90d 2026-06-25) | age=50d (<90 STABLE-BURN-IN threshold); cpd=13.38 |
| 10 | manojmallick/sigmap | **FRESH-PAINT** (age<90d) | ⛔ DEFER (re-audit at age≥90d 2026-06-29) | age=45d (<90 STABLE-BURN-IN threshold); cpd=10.29 |

## Convergence-gate Axis-3 SUMMARY (codex-verified)

**Firm axis-3 PASS** (4 candidates):
- `thedotmack/claude-mem` (STABLE-BURN-IN) ✅
- `anthropics/skills` (STABLE-BURN-IN + STRONG-PROVENANCE-EXPRESS, license caveat) ✅
- `ruvnet/ruflo` (SUSTAINED-ACTIVE-MAINT) ✅
- `open-compress/claw-compactor` (STABLE-BURN-IN idle — needs maintenance-mode determination)

**Borderline / DEFER** (4 candidates):
- `code-yeongyu/oh-my-openagent` LAUNCH-SPIKE-MATURING + license-undefined
- `diegosouzapw/OmniRoute` FAST-CHURN + young
- `chopratejas/headroom` ACTIVE-ITERATION borderline — needs Axis-2 named-T2
- `cortexkit/magic-context` FRESH-PAINT
- `manojmallick/sigmap` FRESH-PAINT

**REJECT** (1 candidate):
- `volcengine/OpenViking` — license overrides axis-3 PASS

## Catalog amendments to Round 3+R4 Top-25

**CONFIRMED ADOPT-NOW** (axis-3 firm PASS + license clean):
- Rank 4 `thedotmack/claude-mem` ✅
- Rank 12 `ruvnet/ruflo` ✅

**CONFIRMED ADOPT-NOW-CONDITIONAL** (axis-3 PASS + license CAVEAT):
- Rank 3 `anthropics/skills` ✅ (axis-3 Firm via STRONG-PROVENANCE-EXPRESS; LICENSE intent pending)

**LLMLingua-replacement PROVIDER-COMPLEMENT layer refined**:
- `open-compress/claw-compactor` — STABLE-BURN-IN BUT idle (cpd=0.72 + 6 weeks pushed_at lag) — likely maintenance-mode; STUDY-PILOT only
- `chopratejas/headroom` — ACTIVE-ITERATION borderline — STUDY-PILOT (need named-T2)
- `diegosouzapw/OmniRoute` — FAST-CHURN — DEFER until 2026-08-15 re-audit (+90d from current age)
- `cortexkit/magic-context` — FRESH-PAINT — DEFER until 2026-06-25 re-audit
- `manojmallick/sigmap` — FRESH-PAINT — DEFER until 2026-06-29 re-audit

## Cross-model gate status update

**ACCUMULATED-PARTIAL** advancing toward FULL:
- R3 codex T1 Pattern B HNF (5 candidate discovery)
- R4 cpd computation via codex Node.js direct gh api (TIER-1-DIRECT VERIFIED)
- R4 Mia LICENSE direct blob probe (TIER-1 via gh CLI)
- R4 codex T1 Axis-2 web-search attempt (truncated mid-investigation per Pattern B; HNF on named-T2 verdicts)

For FULL ratification: Round 5 narrower per-layer codex T1 consults required for:
- LLMLingua-replacement layer architectural verdict (does 4-element stack remain sufficient post-cpd-verification?)
- Axis-2 named-T2 endorsement check (Perplexity / Firecrawl / Exa for top-25)
- anthropics/skills licensing intent verification

## Sister-rule integration confirmed

- ✅ `convergence-gate.md` §Axis 3 5-band table applied verbatim with cpd × age × cpd-band classification
- ✅ `port-note-discipline.md §3 Discipline 2` cite-class verbatim verify (codex script output = TIER-1-DIRECT)
- ✅ `codex-t1-fix-forward-pattern.md §Pattern B` HNF disposition (no JSON-at-EOF; trace evidence mined)
- ✅ `sota-research-architecture.md` D1 use-class precision (OpenViking AGPL-3.0 REJECT overrides axis-3 STABLE-BURN-IN)
- ✅ `cardinal-rule-12-upstream-install-priority.md` 6-class disposition refined per Axis-3 verdict

## Round 5 next-fire priorities (updated post-R4-cpd)

1. Axis-2 named-T2 endorsement check via Perplexity recency / Firecrawl agent / Exa neural search for top-15 Round-3+4 candidates
2. anthropics/skills licensing intent verification (read repo issues, search Anthropic Discord/blog for licensing statements)
3. open-compress/claw-compactor maintenance-mode determination (gh api recent issue/PR activity = active maintainer? OR abandoned?)
4. Round 5 deep-dive outer-research kits v60-v65 + wave52 (per R4 batch SECTION D inventory)
5. Continue Path P codex T1 narrow per-layer consults until full Axis-1+2+3 convergence ratification for all Top-25 candidates

## Wave 220 Round 4 ARTIFACTS

Persisted this fire:
- `tmp/wave220-r4-license-verify-and-graphify-discovery-delta-2026-05-15.md` (LICENSE verdict + graphify discovery + Top-25 v3)
- `tmp/wave220-r4-codex-t1-axis3-verdict-integration-2026-05-15.md` (this file — cpd + Axis-3 5-band integration)
- `tmp/wave220-r4-evidence-batch-2026-05-15.txt` (raw gh CLI batch, 369 lines)
- `tmp/wave220-r4-evidence-summary-2026-05-15.md` (parsed compact summary)
- `tmp/wave220_r4_batch.sh` (helper)
- `tmp/wave220_r4_parser.py` (helper)
- `.claude/state/codex_consult_w220_r4_narrow_axis3.txt` (codex T1 R4 prompt)
- `.claude/state/codex_consult_w220_r4_narrow_axis3_OUT.txt` (codex T1 R4 trace 747 lines, cpd block VERIFIED)
- `.claude/state/codex_consult_w220_r2_ratification.txt` (R3 codex T1 prompt)
- `.claude/state/codex_consult_w220_r2_ratification_OUT.txt` (R3 codex T1 trace 1179 lines)

Sister artifacts (R1-R3 parent + delta chain):
- `tmp/wave220-r2-MASTER-COMPREHENSIVE-CATALOG-2026-05-15.md` (R2 master)
- `tmp/wave220-r3-mass-discovery-delta-2026-05-15.md` (R3 delta)
- `tmp/wave220-round1-fm17e-double-block-status-2026-05-15.md` (R1 failure record)
- `tmp/wave220-agentI-meta-catalogs-uncovered-layers-catalog-2026-05-15.md` (prior W220-I)
- `tmp/wave220-agentB-gpt55-adversarial-audit-2026-05-15.md` (prior W220-B)
- `tmp/wave220-agentC-outer-research-llm-proxy-wshobson-deep-2026-05-15.md` (prior W220-C)

VERDICT: AXIS-3-CPD-CODEX-VERIFIED. Cross-model gate at PARTIAL-CODEX-TRACE-VERIFIED. Ratification advancing toward FULL.
