# W337 P0-1 — sca-v14 codification detail

**Wave**: W337
**Date**: 2026-05-20
**Branch**: `goal/W337-continue` (worktree `Z:/claude-sota-installed-W337`)
**Predecessor**: sca-v13 W332 (`docs/architecture/W332-SOTA-DISCIPLINE-CLOSURE-V2/W332-A-SCA-V13-CODIFY.md`)
**Closes**: W336 P1-1 carry-forward + W335-extended P0-1 line item

---

## §1. Three new dims (D73-D75) + 1 sub-signal swap (D12)

| # | Dim | W_install | W_pattern | Skip-class | Score | Rationale |
|---|---|---|---|---|---|---|
| D73 | `multi_source_first_discovery_diversity_score` | 0.7 | 0.4 | M-skip if MCP-cascade not fired; measurable arch-itself | 1-5 | Counts DISTINCT MCP families that FIRST-DISCOVERED the candidate. ≥4 requires ≥2 non-github first-discoveries. Anti-bias: guards MCP-surface popularity. |
| D74 | `mcp_family_attribution_completeness` | 0.5 | 0.3 | T-skip arch-itself | 1-5 | Measures whether `mcp_family_attribution[]` ledger field is fully populated per claim. ≥4 requires per-claim attribution + ≥3 distinct families. |
| D75 | `codex_round_cost_efficiency_ratio` | 0.3 | 0.2 | E-skip arch-itself | 0-5 | Measures useful-verdict-insight per codex round cost. D75 caps at 2 when D44=1 (round-3+). ≥4 requires 1+ APPROVE per round-1. |
| D12 swap | `pattern_density_score` (REPLACES stars-only sub-signal) | (D12 weight unchanged) | (unchanged) | n/a | 1-5 (sub-signal) | Reusable patterns extracted ÷ repo LOC; D12 caps at 3 when neither pattern_density nor stars ≥2. |

## §2. 3-org-distinct anchor floor per dim

### D73
1. NIST AI 600-1 MEASURE-3.1 (US Department of Commerce) — measurement diversity mandate
2. OSSF Criticality Score (OpenSSF / Linux Foundation) — multi-signal scoring rubric
3. Anthropic claude-cookbooks @ 39a350b6 `patterns/agents/prompts/research_lead_agent.md:135-137` — `<use_parallel_tool_calls>` MUST-block (Anthropic PBC)

### D74
1. ISO 19011:2018 §5.5.5 (ISO Geneva) — audit trail attribution requirements
2. NIST 800-53 AU-2 (NIST / US DoC) — auditable-record system contract
3. OWASP A09:2021 (OWASP Foundation) — logging+monitoring discipline

### D75
1. haizelabs/verdict **v0.2.1 MIT** (Haize Labs Inc) — Unit/Layer/Block primitive (license corrected from sca-v13 Apache-2.0 mis-cite per gh API probe 2026-05-20)
2. Zheng+ 2023 MT-Bench arXiv 2306.05685 (UC Berkeley / Stanford / EPFL)
3. JudgeLM Wang+ 2023 arXiv 2310.17631 (Beihang University / Tencent)

### D12 swap (pattern_density)
1. Anthropic mcp-agent-patterns SKILL.md @ W336 ship (intra-runtime self-cite permitted per §4 strengthening allowance — Anthropic PBC)
2. OSSF Criticality Score (OpenSSF / Linux Foundation)
3. NIST AI 600-1 MEASURE-3.1 (NIST / US DoC)

## §3. Denominator shifts

| Denom | v13 W332 | Δ | v14 W337 |
|---|---|---|---|
| composite_denom_install | 42.5 | +1.5 (D73 0.7 + D74 0.5 + D75 0.3) | **44.0** |
| composite_denom_pattern | 18.9 | +0.9 (D73 0.4 + D74 0.3 + D75 0.2) | **19.8** |
| arch-itself denom_install | 34.3 | +0.7 (D73 measurable arch; D74 T-skip recursive; D75 E-skip recursive with D44) | **35.0** |

D12 sub-signal swap: NO denom shift (D12 weight unchanged; only cap-at-3 trigger moves from "stars-only" to "neither pattern_density nor stars ≥2").

## §4. verdict-llm Pipeline-primitive ratification

verdict-llm @ haizelabs/verdict — **v0.2.1 MIT** (verified via `gh api repos/haizelabs/verdict --jq .license.spdx_id` 2026-05-20).

**License correction**: sca-v13 §4 Δ50 mis-cited as Apache-2.0. Corrected to MIT in sca-v14 §4 Δ50 + this detail doc.

**Version note**: W337 predicate cited v0.2.7 — actual latest release is v0.2.1 per `gh api repos/haizelabs/verdict/releases/latest`. sca-v14 cites the verified v0.2.1.

**Pipeline wiring (Δ50 from sca-v12 W328 absorb)**:
- `codex_round = Unit(model="gpt-5.5", prompt=verdict_evidence)` (verdict-llm v0.2.1 MIT primitive)
- `codex_ensemble = Layer([codex_round], repeat=N)` where N=1..3 adaptive
- `phase6_gate = Block(codex_ensemble >> MaxPoolUnit)` (majority-vote aggregation)
- Adaptive: `repeat=N` starts at 1; increments on NEEDS-REVISION; caps at operator-cap (default 3)

D75 codex_round_cost_efficiency_ratio scores against this contract: useful-verdict-insight per round cost ($). When D44=1 (round-3+), D75 caps at 2.

## §5. §5.2 skip-class table additions (3 new rows)

| Dim | Class | Justification |
|---|---|---|
| D73 multi_source_first_discovery_diversity_score | **M-skip if MCP-cascade not fired** | MCP-cascade Stage-1 fired → arch-itself measurable (count distinct MCPs first-surfacing the SKILL.md). Stage-1 not fired → M-skip + `methodology_skip_rationale: "mcp-cascade-not-fired-arch-self-eval-only"`. |
| D74 mcp_family_attribution_completeness | **T-skip** | Arch IS the attribution authority — recursive (rubric defines `mcp_family_attribution[]` schema). |
| D75 codex_round_cost_efficiency_ratio | **E-skip** | Recursive with D44 (codex IS the measurement); fallback M-skip + `methodology_skip_rationale: "codex-cost-telemetry-pending-W337-extend"` when telemetry unavailable. |

## §6. §10 ledger schema additions

```yaml
d73_multi_source_first_discovery_diversity: <1-5>
d74_mcp_family_attribution_completeness: <1-5>
d75_codex_round_cost_efficiency_ratio: <0-5>
d12_pattern_density_score: <1-5>  # sub-signal of D12 — v14 PRIMARY (stars LEGACY)
rule_version: sca-v14
```

`skip_class_per_dim` set extended with d73 + d74 + d75.

## §7. §8 Meta-Invariants — I10 added

> **I10**: D73 first-discovery diversity MUST cite WHICH MCP first-found each candidate (v14 W337 extension of I2 — `mcp_family_attribution[]` distinguishes `first_discovered_by:` vs `confirmed_by:` per claim; D73 ≥4 requires ≥2 non-github first-discoveries).

## §8. Decision-decay

- v13 → ×0.95 under v14
- v12.1 / v13 verdicts retained-as-written unless D73-D75 evidence becomes available (per W329-C §8.5 carry-forward semantics)
- ALL pre-v14 verdicts re-scored only if new dim evidence becomes available

## §9. LOC discipline (stop-gate 2)

| File | Baseline (sca-v13) | Post-codify (sca-v14) | Status |
|---|---|---|---|
| `.claude/skills/sota-convergence-audit/SKILL.md` | 488 | 485 | ✓ **HOLDS** (3 LOC headroom) |

Compression achieved via aggressive v13 → v12.1 → v12 lineage block consolidation (23 lines → 7 lines) + composite formula tightening (-4 lines).

## §10. Carry-forward discharge

- W336 P1-1 sca-v14 codify ✓ DISCHARGED by this ship
- W335-extended P0-1 sca-v14 codify ✓ DISCHARGED by this ship
- W331 P2-A sca-v13 codification (discharged in W332) — historical reference

## §11. Rollback

`git reset --hard pre-W337-sca-v14` reverts SKILL.md to sca-v13 state. Tag verified at HEAD prior to first sca-v14 Edit.

## §12. Codex round verdict

Codex r1 review pending per W335 P0 trailer gate. Verdict + trailer recorded in commit message.

---

## Cite-anchors (verdict-ledger CR-1 floor)

1. Haize Labs Inc — `https://github.com/haizelabs/verdict` v0.2.1 MIT (verified gh API 2026-05-20)
2. arXiv (Cornell OpenAccess) — MT-Bench `https://arxiv.org/abs/2306.05685` + JudgeLM `https://arxiv.org/abs/2310.17631`
3. OSSF / Linux Foundation — OSSF Criticality Score `https://github.com/ossf/criticality_score`
4. NIST / US DoC — AI 600-1 `https://www.nist.gov/itl/ai-risk-management-framework` + SP 800-53 AU-2 + SP 800-218 PW.7/RV.1
5. ISO Geneva — ISO 19011:2018 `https://www.iso.org/standard/70017.html`
6. OWASP Foundation — A09:2021 `https://owasp.org/Top10/A09_2021-Security_Logging_and_Monitoring_Failures/`
7. Anthropic PBC — claude-cookbooks @ 39a350b6 `patterns/agents/prompts/research_lead_agent.md:135-137`
8. CLAUDE.md cardinal-rule-6 verify-before-claim (this runtime)
