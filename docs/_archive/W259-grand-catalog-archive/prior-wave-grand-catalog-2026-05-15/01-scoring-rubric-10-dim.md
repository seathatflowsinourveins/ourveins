---
title: 10-Dimension Scoring Rubric
status: AUTHORITATIVE-CANDIDATE
date: 2026-05-15
wave: 251
cite-anchor: docs/sota-research-architecture-2026-05-11.md §Weighted Quality Rubric (S25/M20/C25/Co15/L10/P5)
---

# 10-Dimension Scoring Rubric

## Design rationale

Wave 250 baseline scored on ~9 axes (stars + license + Axis 1+2+3 + CR-12 + SRA D1/D6 + native-CC-tier + wired-difficulty + verdict). This 10-dim rubric harmonizes those axes into a quantitative composite formula, extending coverage with **token-efficiency + cite-impact + cross-platform-compat** to satisfy the operator's "score every dimension" mandate.

The 10 dims are ORTHOGONAL — each maps to a distinct measurable signal. Composite weights sum to 100; sensitivity-tested to ±5%.

## D1 — Stars + maintenance velocity (weight 5)

**Measurement**: live `gh api repos/<owner>/<repo>` returns `stargazers_count` + `pushed_at`. Compute `last_commit_age_days = today - pushed_at`. Drift tolerance: stars within ±50 of live count valid for 7 days.

**Score**:
| Score | Stars | Last commit |
|---|---|---|
| 10 | ≥50K | ≤30d |
| 8 | 10-50K | ≤60d |
| 6 | 1-10K | ≤90d |
| 4 | 100-1K | ≤180d |
| 2 | <100 | ≤365d |
| 0 | any | >365d OR archived |

**Hard rule**: stars are INPUT not VERDICT (per SRA invariant). Cap at 5% weight; D2/D3 dominate.

## D2 — Maintainer / org provenance (weight 15)

**Measurement**: GitHub org type (`anthropics` / `microsoft` / `openai` / `google` = TIER-1-OFFICIAL); named-author cross-ref via LinkedIn / blog / academic publication; bus-factor via `gh api repos/<owner>/<repo>/contributors?per_page=10`.

**Score**:
| Score | Provenance |
|---|---|
| 10 | Anthropic-OFFICIAL or named-T1 (Karpathy / Boris Cherny / Jesse Vincent / Heinrich Krupp class) |
| 8 | Microsoft / OpenAI / Google / LangChain-org / HuggingFace named-T1 |
| 6 | Named individual with verifiable LinkedIn + blog + ≥1 prior published work |
| 4 | Org-anon but ≥3 active contributors + ≥1 named-T2 endorsement (URL+date) |
| 2 | Solo maintainer + identifiable + last-commit ≤90d |
| 0 | Unknown-org + solo + no LinkedIn / blog cross-ref |

**Hard rule**: Bus-factor 1 + last-commit > 90d → halve D2.

## D3 — License compatibility (weight 15)

**Measurement**: Probe 6 LICENSE direct file read (`cat Z:/repos/deps/<repo>/LICENSE | head -5`); SPDX classification.

**Score**:
| Score | License |
|---|---|
| 10 | MIT / Apache-2.0 / BSD-3-Clause / BSD-2-Clause / ISC |
| 8 | MPL-2.0 / EPL-2.0 |
| 6 | LGPL-2.1 / LGPL-3.0 (compatible if dynamic-link only) |
| 4 | Elastic-2.0 / SSPL-1.0 (use-restrictions) |
| 2 | GPL-2.0 / GPL-3.0 (cite-OK install-CAUTIOUS) |
| 0 | AGPL-3.0 / SSPL / proprietary / NOASSERTION-no-clarification |

**Hard rule (BLOCKER)**: D3 = 0 → max composite 49 (F-band) regardless of other dims.

## D4 — Axis-3 stability (cpd × age band) (weight 10)

**Measurement**: `gh api repos/<owner>/<repo>/commits?per_page=100&sha=<default_branch>` count + `created_at` → `cpd = total_commits / age_days`. Map to convergence-gate 5-band table.

**Score**:
| Score | Band |
|---|---|
| 10 | STABLE-BURN-IN (cpd<10 AND age≥90d) OR SUSTAINED-ACTIVE (cpd>10 AND age>180d) |
| 8 | STRONG-PROVENANCE-EXPRESS (age≥30d + official-org + named-T2) |
| 6 | ACTIVE-ITERATION (10≤cpd≤20 AND 90d≤age≤180d) — borderline PASS-with-caveat |
| 4 | YOUNG-BUT-PROMISING (age 60-90d + cpd<5 + named-org) |
| 2 | FAST-CHURN (cpd>10 AND age<100d) — expect rewrites |
| 0 | LAUNCH-SPIKE (unknown-org + age<30d + cpd>50) — REJECT-UNTIL-CONVERGENCE |

## D5 — Native-CC tier (weight 15)

**Measurement**: classification per `claude-plugins-official` marketplace inventory + `.mcp.json` registry probe + plugin-cache + SDK / CLI fallback.

**Score**:
| Score | Tier |
|---|---|
| 10 | **A canonical** (`/plugin install` from claude-plugins-official OR Anthropic-curated marketplace) |
| 8 | **A** (third-party marketplace plugin via `/plugin install`) |
| 6 | **B native MCP** (registers in `.mcp.json` via `mcp add`) |
| 4 | **C SDK** (Python/TS SDK wrappable as hook) |
| 2 | **D CLI** (standalone CLI; not native /plugin or MCP) |
| 0 | **E meta-harness competing-framework** (daemon / global-state collision per CR-5 + verified-avoid Cohort 1) |

**Hard rule (BLOCKER)**: D5 = 0 → max composite 59 (D-band) per `verified-avoid.md` Cohort 1.

## D6 — Install difficulty / reversibility (weight 8)

**Measurement**: Probe DAG 1-7 result; install-step count; reversibility via `git revert` <1min vs Docker/k8s/auth wiring complexity.

**Score**:
| Score | Difficulty (1/5 = trivial; 5/5 = expert) |
|---|---|
| 10 | 1/5 — single `/plugin install` OR `npm install -g`; reversible <1min |
| 8 | 2/5 — single MCP add OR pip install; reversible <5min |
| 6 | 3/5 — Docker single-container OR multi-step config; reversible <15min |
| 4 | 4/5 — Docker compose multi-service OR auth wiring; reversible <30min |
| 2 | 5/5 — k8s deployment OR persistent volumes OR custom infra; reversibility >30min |
| 0 | NOT-INSTALLABLE in this runtime (Windows-broken / proprietary-OS / unsupported arch) |

## D7 — Token-efficiency impact (weight 8)

**Measurement**: token reduction % MEASURED via `tools/eee_token_audit.jsonl` empirical OR cited primary-source benchmark; cache_control / context-management / compaction primitives integration.

**Score**:
| Score | Token impact |
|---|---|
| 10 | ≥70% MEASURED reduction OR Anthropic-native LOSSLESS primitive (cache_control / clear_tool_uses / compact_20260112) |
| 8 | 50-70% MEASURED reduction OR codebase packer (repomix / context-mode / serena symbol-level edits) |
| 6 | 30-50% MEASURED reduction OR observability + cost tracking (ccusage / Splitrail / Phoenix) |
| 4 | 10-30% MEASURED reduction OR partial cache integration |
| 2 | <10% reduction OR neutral (passes through tokens) |
| 0 | INCREASES token consumption (heavy framework wrapping; meta-harness overhead) |

## D8 — Cite-impact (peer-review + endorsement) (weight 6)

**Measurement**: arxiv DOI count + named-author endorsements with URL+date + inclusion in 3+ awesome-catalogs + cite-count in claude-sota CLAUDE.md / rules.

**Score**:
| Score | Cite impact |
|---|---|
| 10 | arxiv-published (DOI verifiable) + named-T1 endorsement + ≥3 awesome-catalog inclusion |
| 8 | arxiv-published OR named-T1 endorsement + ≥3 awesome-catalog inclusion |
| 6 | named-T2 endorsement + ≥2 awesome-catalog inclusion |
| 4 | ≥1 awesome-catalog inclusion |
| 2 | discoverable via direct search but no curated cite |
| 0 | zero peer-review + zero named-endorsement + zero awesome-catalog inclusion |

## D9 — CR-12 disposition (weight 12)

**Measurement**: 6-class lattice classification per `cardinal-rule-12-upstream-install-priority.md §CR-12 disposition lattice` after Probe DAG passes.

**Score**:
| Score | Disposition |
|---|---|
| 10 | **CITE-CLASS-CANONICAL** (Anthropic-OFFICIAL educational/reference; ratify-as-cite) |
| 9 | **GENUINELY-NEW** (no incumbent parallel; INSTALL via CR-12 PRIMARY path) |
| 7 | **PROVIDER-COMPLEMENT** (parallel API surfaces + different scopes; install as ALTERNATIVE) |
| 5 | **PARTIAL-OVERLAP** (overlapping function via DIFFERENT MECHANISMS; CASE-BY-CASE) |
| 3 | **ECOSYSTEM-IMPORT** (core primitive novel BUT ecosystem footprint disproportionate) |
| 0 | **DUPLICATE-FUNCTIONALITY** (full incumbent parallel; REJECT per kiss-dry-yagni Must-Never #4) |

**Hard rule (BLOCKER)**: D9 = 0 (DUPLICATE) → max composite 49 (F-band).

## D10 — Cross-platform compat (weight 6)

**Measurement**: Windows + macOS + Linux PASS via direct issue probe + Z:-portable check; node/python/rust dep verification.

**Score**:
| Score | Compat |
|---|---|
| 10 | Windows + macOS + Linux all PASS (Z:-portable verified) |
| 8 | macOS + Linux PASS; Windows PASS-with-caveat (e.g., requires WSL2) |
| 6 | macOS + Linux PASS; Windows DEFER (no-test-evidence) |
| 4 | macOS + Linux PASS; Windows BROKEN (open issue documented) |
| 2 | Single-OS supported (e.g., macOS-only or Linux-only) |
| 0 | Proprietary-OS-only OR Windows-broken with open ticket >180d (e.g., smtg-ai/claude-squad #275) |

## Composite formula

```
composite_grade       = sum(d_i × w_i) for i in 1..10  →  range 0-1000
composite_normalized  = composite_grade / 10           →  range 0-100
letter_band           = lookup(composite_normalized) per A+/A/B/C/D/F threshold table
```

**Weights sum verification**: 5 + 15 + 15 + 10 + 15 + 8 + 8 + 6 + 12 + 6 = **100** ✅

## Sensitivity check

Per SRA L5 weighted-rubric discipline: re-run scoring with each weight ±5%. If letter band flips under perturbation → mark **BORDERLINE** (suffix `±`) + escalate to operator.

## Hard-rule blockers (override composite)

| Rule | Trigger | Effect |
|---|---|---|
| D3=0 | AGPL/SSPL/proprietary | max composite 49 (F-band) |
| D9=0 | DUPLICATE-FUNCTIONALITY | max composite 49 (F-band) |
| D5=0 | E meta-harness | max composite 59 (D-band) |
| Bus-factor 1 + last-commit > 90d | abandoned solo | halve D2 score |
| Last-commit > 180d AND issues_open > 50 | unmaintained | halve D1 score |

## Letter band thresholds

| Letter | Composite range | Δ recommendation |
|---|---|---|
| **A+** | 90-100 | INSTALL-NOW (Δ1 priority) |
| **A** | 80-89 | KEEP-INSTALLED / HIGH-CONFIDENCE STUDY-PILOT |
| **B** | 70-79 | STUDY-PILOT (Δ2) |
| **C** | 60-69 | DEFER (case-by-case) |
| **D** | 50-59 | REJECT-FOR-FIT (single-blocker) |
| **F** | 0-49 | REJECT (multiple-blocker) |
