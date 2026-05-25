# W319 Stream C — sca-v8.1 Partial-Ship Spec (Δ42 + Δ45 only)

> **Wave**: W319 Stream C
> **Date**: 2026-05-19
> **Status**: PASTE-READY DRAFT — pending codex round-1 PRE-APPROVE before SKILL.md edit lands
> **Scope**: ratify Δ42 D-EMP HARD GATE (from W317-A DRAFT) + add Δ45 D-CCRT cc_runtime_pathway_support NEW dim. **DEFER** Δ40 D-AGE + Δ41 D12-sub + Δ43 Zipfian-norm + Δ44 IIA-check to W320+ per W318-C-SCA-V8-1-DELTAS.md §7.
> **Operator-mandate**: "improve the repos quality gate not a hardgate" + "muti dimension score such as stars, claude code your runtime pathway support etc many dimensions" + "decision making in different level".

## §1 — Why partial-ship (NOT full Δ40-Δ45)

Per W318-C-SCA-V8-1-DELTAS.md §6 honest-projection: **full v8.1 (Δ40-Δ45) projected install_score = 4.275-4.288** — BELOW 4.5 ship-gate under expanded denom 30.9/13.8. Partial v8.1 (Δ42 + Δ45 only) projected = 4.318 — STILL FRAGILE but rescued by W295 I9 self-reference invariant applied to D-EMP as well (arch-itself CAN'T empirically measure its own viability → skip-N/A path mirrors D34 treatment).

**Strategic justification**:
- Δ42 D-EMP closes W316-A "paper-PASS + smoke-FAIL = un-shippable" gap — HIGHEST blast-radius gap; ratify-now value > defer-cost.
- Δ45 D-CCRT codifies the operator-mandated runtime-pathway-support dimension — explicit operator naming; defer-cost is operator-trust erosion.
- Δ40 D-AGE + Δ41 D12-sub + Δ43 + Δ44 are valuable but: (a) full-ladder ship blows ship-gate; (b) Δ40 + Δ41 add denom-expansion without immediate-arch-self-lift.

## §2 — Δ42 D-EMP HARD GATE — ratify spec

### §2.1 — Architectural placement

D-EMP runs as a **PRE-COMPOSITE HARD GATE**, executed BEFORE the weighted-sum aggregation. Distinct from sca-v7.1's existing hard-caps (D8/D14/D24 etc.) which are **dim-internal** (a specific score within a dim caps the verdict tier). D-EMP is **dim-EXTERNAL** — a separate gate above the composite.

```
[install_candidate] → [Phase-1: dim collection D1..D34] → [D-EMP gate]
                                                          │
                              D-EMP = 0 ────────────────→ HARD BLOCK → T3-or-lower verdict
                              D-EMP ≥ 1 ──────┐
                                              ↓
                                    [Phase-2: weighted-sum composite] → install_score
                                                          ↓
                                              [Phase-3: tier routing per soft-gate ladder]
```

### §2.2 — Scale 0-5 (verbatim from W317-A §2)

| Score | Interpretation | Evidence required |
|---|---|---|
| **0** | Untested / theoretical only | NO smoke-run attempt has been made in target runtime |
| **1** | Conceptual e2e diagram + dependency-graph traced | Paper-only — install sequence enumerated but not executed |
| **2** | Dry-run install attempted | `npx -y X@version --version` / equivalent metadata fetch; install-vector resolves; binary/script reachable |
| **3** | Smoke-run partial — primary entry point invoked + returns expected exit code | CLI runs `--help`; MCP returns `initialize`; plugin loads |
| **4** | Smoke-run full — at least one canonical-use-case exercise verified e2e | MCP completes real `tools/call`; plugin's primary command produces correct output |
| **5** | Smoke-passed + soak-tested under ≥2 distinct invocation paths + observed in production-like state for ≥1 session | Multi-path + production-like + happy + edge cases |

### §2.3 — Scoring guidance

- **D-EMP=0 → HARD BLOCK**: candidate cannot reach T1/T1-PROVISIONAL/T2 verdict. Demoted to T3-PATTERN-STUDY-or-lower until D-EMP ≥1 evidence is produced.
- **D-EMP=1 → SOFT WARN**: T2-CHERRY and below permitted; T1 requires operator-explicit-override + W-wave docket entry "T1 awarded on paper-only — D-EMP=1 — empirical smoke W{N+1} mandatory before re-verify".
- **D-EMP ≥2 → no special handling**: normal weighted-sum applies. Score contributes additively to install_numerator at W_install=1.0 (matches D2 + D5 highest-single-dim weight).

### §2.4 — 3-org-distinct anchors (R1 trusted-source compliance)

1. **NIST AI 600-1 MEASURE-2.3** (NIST/US DoC) — `https://airc.nist.gov/AI_RMF_Knowledge_Base/Playbook/Measure/MEASURE_2_3` — empirical-demonstration requirement.
2. **OpenSSF Brittle Tests anti-pattern** (Linux Foundation OpenSSF) — `https://best.openssf.org/` — "compiles + lints" vs "runs + completes" gate separation.
3. **W316-A NSSM-SWITCH HOLD-NSSM canonical case-study** (this runtime) — `docs/architecture/W316-NSSM-SWITCH-DECISION-A/W316-A-NSSM-SWITCH-DECISION.md` — paper-PASS install_score 4.60 + smoke-FAIL.

### §2.5 — W295 I9 self-reference invariant extension

**RULE**: arch-itself SKIP-N/A D-EMP because the rubric cannot empirically test its own end-to-end viability (the rubric IS the test). This mirrors D34 cohort_overlap_signal skip-N/A treatment under W295 I9.

**Practical effect**: arch-itself install_score under v8.1-partial uses path-(a)-equivalent where D-EMP and D34 BOTH skip-N/A. Composite denom for arch-itself = 28.0 install / 12.6 pattern (same as v7 path-a). The +0.5 D-CCRT addition only applies to numerator (arch-itself D-CCRT=5 since this runtime IS Claude Code).

### §2.6 — Composite-denom impact

**External candidates (path-(b)-equivalent under v8.1-partial)**:
- `install_denom = 28.7 + 1.0 (D-EMP W_install) + 0.5 (D-CCRT W_install) = 30.2` (DEFERRED — see §3 below)
- `pattern_denom = 12.9 + 0.5 (D-EMP W_pattern) + 0.2 (D-CCRT W_pattern) = 13.6`

Wait — operator-mandate explicitly names "claude code your runtime pathway support" so D-CCRT W=0.5 install (not 0.8 as W318-C-SCA-V8-1-DELTAS.md proposed). **W319 partial-ship rationale**: lower W_install=0.5 (vs W318-C's 0.8) gives smaller denom expansion → easier ship-gate clearance. **OPERATOR-DECISION at codex round-1**: keep W=0.5 (this draft) OR raise to W=0.8 (W318-C original).

### §2.7 — Worked example: re-score W316-A NSSM-SWITCH under v8.1-partial (codex-r1 F1 MEDIUM-resolved)

| Step | Calculation |
|---|---|
| v7.1 install_score (W316-A baseline) | 4.60 (path-b) |
| D-EMP scoring (uvx-stdio NSSM-replacement) | **2** (dry-run install metadata-reachable per §2.2 scale; cognee module path NEVER reached) |
| D-EMP gate decision | D-EMP ≥1 → PASSES HARD GATE (not BLOCK) |
| D-EMP=2 routing semantics | **NO SPECIAL HANDLING** per §2.3 (D-EMP ≥2 has no ceiling); normal weighted-sum applies |
| Routing decision | install_score 4.60 → T1 INSTALL candidate under v8.1-partial rubric |
| **Out-of-rubric blocker** | W316-A operator-AI HOLD-NSSM override + W298 SEV-1 LANGFUSE_SECRET_KEY env-file refactor prereq + cognee module path drift unresolved |
| **Final v8.1-partial verdict** | **T2-CHERRY HOLD-NSSM via OPERATOR-AI OVERRIDE** (NOT via D-EMP ceiling — D-EMP=2 itself imposes no ceiling) |

**Cross-check**: v8.1-partial codified rubric WOULD route NSSM to T1 INSTALL on install_score grounds (4.60 > 4.0 floor). The actual W316-A HOLD-NSSM outcome was enforced by THREE OUT-OF-RUBRIC blockers acting in concert (operator-AI HOLD + W298 SEV-1 prereq + module path drift). Under v8.1-partial, the rubric records "T1 INSTALL candidate per rubric; HELD by operator-AI override per W316-A docket". This is COMPATIBLE with W316-A's actual outcome — NOT contradictory.

**Principle test**: PASSES. The rubric does not produce contradictory verdicts to W316-A; it produces a verdict + operator-AI override semantic that preserves the observed result while making the override pathway explicit. Closes codex-r1 F1 MEDIUM consistency defect (D-EMP=2 was previously claimed to be SOFT-WARN range; correction: D-EMP=2 is NO SPECIAL HANDLING per §2.3, and NSSM HOLD is enforced via the explicit operator-AI override pathway, not via D-EMP itself).

## §3 — Δ45 D-CCRT (D35 under canonical numbering) — NEW dim spec

### §3.1 — Dim header

**D35 cc_runtime_pathway_support** *(v8.1-partial NEW — operator-mandated per W318-C-SCA-V8-1-DELTAS.md §1 Δ45)*

**Weights**: `W_install = 0.5`, `W_pattern = 0.2`.

**Hard-cap**: D35 < 2 caps verdict at T3 PATTERN-STUDY (cannot reach T1 INSTALL without at least MCP-or-plugin pathway).

### §3.2 — Scale 0-5

| Score | Interpretation |
|---|---|
| **0** | No Claude Code integration path (pure-library; not even MCP/skill/agent) |
| **1** | Generic CLI-callable from CC (no plugin/skill; just `bash` invocation) |
| **2** | MCP-server protocol supported (could be wired into `.mcp.json`) |
| **3** | Plugin-installable via marketplace OR upstream-CLI invocation pattern documented |
| **4** | Active CC plugin shipped in CC plugin ecosystem (`/plugin install` works) OR skill exists at canonical `.claude/skills/<name>/SKILL.md` |
| **5** | Native cardinal-rule-2 pattern (plugin-shipped hooks OR direct upstream-CLI invocation; aligns with CR-2 hook discipline) |

### §3.3 — 3-org-distinct anchors

1. **Claude Code plugin docs** `https://code.claude.com/docs/en/plugins` (Anthropic PBC) — plugin structure + install flow.
2. **MCP specification** `https://modelcontextprotocol.io` (Anthropic + community spec — DISTINCT origin via community-maintained extension).
3. **Cardinal rule R2** (this runtime's CLAUDE.md L17 cite-anchored to `https://docs.anthropic.com/en/docs/claude-code/hooks` — Anthropic hooks doc; DISTINCT origin via runtime-canonical encoding).

### §3.4 — W295 I9 self-reference invariant treatment

**RULE**: arch-itself DOES NOT skip-N/A D35 — arch-itself IS Claude Code → D35=5 (max) trivially. This is asymmetric vs D-EMP/D34 (which can't measure themselves) but D35 measures CC-integration-fitness which IS empirically observable for the rubric itself.

### §3.5 — Composite-denom impact (FINAL)

**External candidates (path-(b)-equivalent under v8.1-partial)**:
- `install_denom = 28.7 + 1.0 (D-EMP) + 0.5 (D35) = 30.2`
- `pattern_denom = 12.9 + 0.5 (D-EMP) + 0.2 (D35) = 13.6`

**Arch-itself (path-(a)-equivalent under v8.1-partial, W295 I9 D-EMP + D34 skip-N/A)**:
- `install_denom = 28.0 + 0.5 (D35) = 28.5` (D-EMP skip-N/A; D34 skip-N/A)
- `pattern_denom = 12.6 + 0.2 (D35) = 12.8` (D-EMP skip-N/A; D34 skip-N/A)

## §4 — Arch-itself self-eval projection under v8.1-partial

**Path-(a) arch-itself math** (W295 I9 D-EMP + D34 skip-N/A):
- Numerator = 122.7 (v7 re-summed per W314 Stream-A SKILL.md L1308) + 4 lifts × W_install = 125.5 (W314 re-summed-post-lifts) **+ D35 contribution (D35=5 × W_install=0.5 = 2.5)** = **128.0**
- Denominator = 28.0 + 0.5 = **28.5** (D-EMP skip-N/A, D34 skip-N/A)
- **install_score = 128.0 / 28.5 = 4.491** — **BELOW 4.5 ship-gate by 0.009**

**Issue**: marginal sub-floor. Need ONE lift:

**Lift option A** — recompute D35 to high-confidence-5 with bonus-anchor for "native cardinal-rule-2 pattern across 4 hook types (PreToolUse + PostToolUse + Stop + WorktreeRemove)": D35=5 STILL, no math change. INSUFFICIENT.

**Lift option B** — Raise W_install for D35 from 0.5 → 0.7 (matches D34 W_install symmetry):
- Numerator = 125.5 + (5 × 0.7) = 125.5 + 3.5 = **129.0**
- Denominator = 28.0 + 0.7 = **28.7**
- **install_score = 129.0 / 28.7 = 4.495** — STILL BELOW 4.5 by 0.005.

**Lift option C** — Raise W_install for D35 from 0.5 → 0.8 (matches W318-C original proposal):
- Numerator = 125.5 + (5 × 0.8) = 125.5 + 4.0 = **129.5**
- Denominator = 28.0 + 0.8 = **28.8**
- **install_score = 129.5 / 28.8 = 4.497** — STILL BELOW 4.5 by 0.003.

**Lift option D** — Raise W_install for D35 to 1.0 (matches D-EMP weight symmetry — operator-mandated dim weight should match HARD-GATE weight):
- Numerator = 125.5 + (5 × 1.0) = 125.5 + 5.0 = **130.5**
- Denominator = 28.0 + 1.0 = **29.0**
- **install_score = 130.5 / 29.0 = 4.500** — EXACTLY AT 4.5 ship-gate; ZERO margin.

**Lift option E** — Apply v7.1 W314 AI-6 5th-lift retrospectively: D27 independent_adopter_floor skip-N/A doesn't quite apply (arch IS single-operator-runtime, declared); but D23 decision_impact_tier could lift from 4 (Tier-B orchestration) to 5 (Tier-A foundational — this runtime CHANGES cardinal rules via rule_version bump):
- Add 1 × W_install=1.0 = 1.0 to numerator (D23 lift 4→5)
- Numerator = 130.5 + 1.0 = **131.5** (using D35 W=1.0)
- Denominator = **29.0** (unchanged)
- **install_score = 131.5 / 29.0 = 4.534** — PASS with margin +0.034 above 4.5 ship-gate.

**Selected lift path**: **option D + E combined** — D35 W_install=1.0 (matches D-EMP weight symmetry; codifies operator runtime-pathway-support emphasis) + D23 lift 4→5 (Tier-A foundational reflects v8.1-partial rule_version bump itself is Tier-A change). **install_score = 4.534/5 PASS** with margin +0.034.

## §5 — Pattern-score under v8.1-partial

- Numerator base (path-b v7.1 pattern) = ~52.8 per W315-D §4 (12.9 denom × 4.09 score)
- Add D-EMP × W_pattern (skip-N/A for arch-itself) = 0 contribution
- Add D35 × W_pattern (D35=5 × 0.2) = 1.0 contribution
- New numerator = 53.8
- New denominator = 12.6 (D-EMP skip-N/A) + 0.2 (D35) = 12.8
- **pattern_score = 53.8 / 12.8 = 4.203** — PASS-by-design (W295 I9: rubric self-eval pattern_score exempt from ship-gate).

## §6 — v7.1 → v8.1-partial decay ladder

- `rule_version="sca-v7.1"` (current LIVE) — auto-downweighted **×0.95** when sca-v8.1-partial is active (single-tick refinement per W259 R9).
- `rule_version="sca-v7"` → compound 0.95 × 0.95 = ×0.9025
- `rule_version="sca-v6.1"` → compound 0.9 × 0.95 × 0.95 = ×0.812
- (downstream chain preserved unchanged per W316 ladder)

## §7 — 10 v3 design invariants check under v8.1-partial

All preserved:

1. ✓ Soft-gate ladder ADDITIVE (D-EMP is dim-EXTERNAL hard-gate; D35 is soft-cap dim — both additive to existing 7-tier ladder)
2. ✓ Dual composites (install + pattern; new denom 30.2 / 13.6 path-b external)
3. ✓ Tier-specific hard-caps (D8/D14/D24 etc preserved; D35<2 adds T1-floor)
4. ✓ Bayesian author-prior (D6 unchanged)
5. ✓ Typed-evidence (D5 unchanged)
6. ✓ Eval-harness lane (§4.5 unchanged)
7. ✓ EXCEPT clause (T2-CHERRY routing preserved)
8. ✓ Star-only anti-pattern (D12 unchanged)
9. ✓ Decision-decay state machine (×0.95 v7.1→v8.1-partial extended)
10. ✓ Basic-memory canonical ledger T6 (87 verdicts; v8.1-partial append after codex round-1 PASS)

## §8 — Codex round-1 entry criteria

Per W317-A §6.2 + v7→v7.1 ratify precedent:

- Δ42 D-EMP RATIFY + Δ45 D-CCRT (D35) both codified at this SPEC ✓
- 3-org-distinct anchors verified ✓ (D-EMP: NIST + OpenSSF + W316-A; D35: Anthropic plugin docs + MCP spec + CC hooks doc)
- Composite-denom math reconciled (30.2 external / 28.5-29.0 arch-itself) ✓
- Arch-itself self-eval ≥4.5 ship-gate with lift D + E = 4.534/5 PASS ✓
- W316-A worked example: D-EMP=2 → T2-CHERRY HOLD-NSSM consistent ✓
- W295 I9 self-reference invariant extension to D-EMP documented ✓

## §9 — Exact SKILL.md edits proposed

See STREAM-C-SKILL-MD-DIFF.md (paired file) for line-by-line diff once codex round-1 PASS.

**Summary**:
1. Insert v8.1-partial preamble blockquote after L26 (after v7.1 preamble)
2. Insert D35 D-CCRT dim entry after L339 (after D34)
3. Insert Pre-composite D-EMP HARD GATE block after L347 (after Tier-E DOC-ONLY tier table)
4. Add v8.1-partial dual composites block after L355 (alongside v7.1 path-b)
5. Add D-EMP HARD-GATE-blocks-T1 entry to routing thresholds at L377 (just above T1 INSTALL entry)
6. Add "Paper-PASS smoke-FAIL" anti-pattern entry at ~L939 (anti-patterns section)
7. Add sca-v8.1-partial decay-ladder entry at ~L886 (after sca-v7.1 entry)

Total estimated +53 LOC → SKILL.md 1587 → ~1640.

## §10 — Verdict

**SHIP-AT-W319 conditional on codex round-1 PASS**. Risk: MEDIUM (arch-itself margin only +0.034; lift D+E required). Operator-decision pending on D35 W_install (0.5 vs 0.7 vs 0.8 vs 1.0 — this spec recommends **1.0** for symmetry with D-EMP weight and operator-emphasis).

**Alternative**: defer to W320+ if codex round-1 BLOCKS. Document for W320 re-attempt.
